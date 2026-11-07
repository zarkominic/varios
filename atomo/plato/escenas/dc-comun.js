// Fontanería y decorados del episodio 24 (Los archivos desclasificados que parecen mentira) en el estilo canónico pixel
// chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A la carrera espacial (un patio de 1957, el despacho de
// la Fuerza Aérea, el laboratorio de Chicago de 1958, un observatorio, una redacción de 2000), B los animales espías (el
// taller de la CIA de los sesenta, un parque europeo con su furgoneta, el laboratorio de Skinner, el campo alemán nevado
// con la mina, los Archivos Nacionales británicos en 2004), C los espías psíquicos (el laboratorio de Stanford de los
// setenta, la oficina de Fort Meade, la revisión de 1995), D la guerra de mentira (el campo de Francia de 1944 con tanques
// de goma, la orilla del Rin en 1945, la ceremonia de 2024) y el hielo (el despacho de Londres de 1942, el taller del
// pykrete, la bañera, el lago Patricia), y E hoy (el archivo de Atom).
// Los personajes son los de ELENCO_DC y PIEZAS_DC (pixel-chibi.js): dibujados por nosotros, sin logos ni letras.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bancos de trabajo, el
// escritorio, la barandilla) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de
// los actores». La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
// Tono: nada morboso. Ninguna bomba estalla en pantalla, ningún animal sufre, nadie dispara contra nadie.
//
//   import * as T from '/atomo/plato/escenas/dc-comun.js';
//   const { E, R, M } = await T.preparar('dc-gancho');
//   T.rodar(E, R, [[0, (t) => T.hoy(R, t, { encuadre: 'archivo' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_DC: el gato espía, la mina, el tanque de goma, el bloque de hielo…), las crea el reparto
export const PIEZAS_DC = KIT.PIEZAS_DC || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la Guerra Fría: azul noche, verde de pizarra, tiza, gris de archivo, beige de carpeta, rojo de sello
    noche: '#141a3a', pizarra: '#2a4a3a', pizarraS: '#1a3226', tiza: '#e8ece4', luna: '#e8e4d0', lunaS: '#a8a490',
    carpeta: '#d8c8a0', carpetaS: '#a8946a', selloR: '#c8282a', archivo: '#6a6e78', archivoS: '#464a54',
    // la guerra de mentira: verde oliva, goma, lona; el hielo: azul hielo y pykrete gris
    oliva: '#5a6a3a', olivaS: '#3a4626', goma: '#4a5a3a', lona: '#a89a70', hielo: '#c8e4f0', hieloS: '#7aa8c0', pykrete: '#9aa4a8',
    // los setenta: naranja, mostaza y moqueta
    naranja70: '#d8742a', mostaza: '#c8a03a', moqueta: '#6a5034',
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
  const E = await escena(id, 'ep24');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1942 (la guerra: el hielo y el Ejército Fantasma), 1957 (la carrera espacial y la CIA), 1972 (los
  // psíquicos), 2000 (los secretos que salen a la luz) y 2026
  Object.assign(R.ICONOS, {
    estrella: ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##', '.......'],
    luna: ['..###..', '.##....', '##.....', '##.....', '##.....', '.##....', '..###..'],
    ojo: ['.......', '..###..', '.#...#.', '#..#..#', '.#...#.', '..###..', '.......'],
    carpeta: ['###....', '#######', '#.....#', '#.....#', '#.....#', '#######', '.......'],
  });
  R.tramosTiempo([[1942, 1957, R.PALA.VERDE ?? R.PALA.ORO, 'estrella'], [1957, 1972, R.PALA.AZUL ?? R.PALA.ROJO, 'luna'], [1972, 2000, R.PALA.ROJO, 'ojo'], [2000, 2026, R.PALA.ORO, 'carpeta']]);
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





// ── A · La carrera espacial ─────────────────────────────────────────────────────────────────────────────────
// carrera(R, t, o): el decorado del acto 1. o.encuadre y o.camara ('general' por omisión o la segunda de cada uno).
// Devuelve { suelo, ... } con la geometría del encuadre (ver cada uno). LO QUE VA DELANTE DE LOS PERSONAJES va en
// carreraDelante(R, t, o), con las mismas opciones: llámala después de los actores.
//   'patio57': el patio trasero de una casa de suburbio en octubre de 1957, de noche: cielo tramado con la Vía Láctea,
//     estrellas que titilan, nubes nocturnas a tres velocidades y alguna estrella fugaz; casas vecinas con ventanas
//     encendidas (una con el azul de la tele que parpadea), el poste del teléfono con sus cables, el arce de otoño que
//     suelta hojas, la casa de tablas con porche (la luz del porche con sus polillas, la puerta mosquitera, la mecedora,
//     la ventana de la cocina con cortinas por la que a ratos pasa una sombra), el humo de la chimenea, la antena de tele,
//     la valla blanca, el columpio que se mece, el triciclo y el césped con hojas caídas. Suelo 158 (pies entre x 140 y
//     230; la mesa de jardín de carreraDelante está en x 168–206). o.sputnik 0–1: el puntito brillante que cruza el cielo
//     de izquierda a derecha (con su estela; sin o.sputnik no sale). o.radio (true por omisión): la radio de onda corta
//     sobre la mesa (encendida: o.pitido true hace latir su luz y salir ondas de sonido).
//     Cámara 'cielo': mirando hacia arriba: el cielo grande con la Vía Láctea, la Osa Mayor, las copas del arce y de los
//     pinos y el tejado con la antena en silueta abajo, murciélagos que revolotean; o.sputnik igual (cruza más alto).
//   'despachoAF': un despacho de la Fuerza Aérea en 1957, de noche: paneles de nogal con vetas, dos banderas sin letras,
//     el mapamundi con chinchetas e hilo, el apliques que dan luz cálida, el reloj, la foto de un avión, el aparador con la
//     maqueta de la Luna que gira despacio, el globo terráqueo que gira, la ventana a Washington (el Capitolio iluminado,
//     el obelisco con su luz roja, coches que pasan, un avión) con persianas y cortinas, los archivadores y la alfombra.
//     Suelo 160 delante de la mesa; detrás de la mesa los pies van en 133 (asoman cabeza y hombros). La mesa grande con el
//     teléfono negro, la lámpara verde y el cenicero que humea va en carreraDelante (x 92–228, tablero en y 126).
//     Cámara 'mesa': la mesa de cerca (inserto): la maqueta de la Luna grande que gira en su pie de latón, un cohete de
//     juguete, la carpeta con el sello rojo (PIEZAS_DC.carpeta), las gafas, el cenicero con el puro que humea, el teléfono
//     negro, el café que humea y el cartapacio verde; detrás, el despacho desenfocado.
//   'laboratorio': el laboratorio de la Armour Research Foundation en Chicago, 1958, de día: dos pizarras verdes llenas de
//     cálculos de tiza (cifras, flechas, la trayectoria Tierra–Luna, la Luna con la línea del día y la noche), lámparas
//     colgantes, la ventana de fábrica con el tren elevado que pasa, ladrillo, depósito de agua, nubes y palomas, el
//     banco del fondo con el osciloscopio, el contador Geiger, el café y el ventilador, y el suelo de linóleo. Suelo 158;
//     el banco de delante (carreraDelante, x 186–319, tablero en y 140) con la calculadora mecánica y la regla de cálculo:
//     quien está detrás pisa en 147. o.nube 0–1: la nube de polvo que crece en la Luna de tiza de la pizarra pequeña.
//     Cámara 'pizarra': la pizarra de cerca: la Luna grande de tiza con mares, cráteres y la línea del día y la noche, la
//     Tierra, la trayectoria punteada y un cohete de tiza que avanza (o.cohete 0–1), la nube de polvo con su brillo al
//     Sol (o.nube 0–1), el Sol de tiza, cifras, un ojo y un «?», el polvo de tiza que flota y la repisa con tizas.
//   'observatorio': un observatorio de noche: la cúpula con sus costillas y remaches, la ranura abierta con la Luna
//     enorme y detallada y nubes finas que la cruzan, el haz de luz de luna con motas, el telescopio blanco en su montura
//     (boca en x 168–182, y 66–80; ocular abajo en x 214–222, y 132–140), la escalera rodante con su plataforma (y 86, x
//     144–172: ahí se sube el gato), la consola con luces y el registrador, mapas lunares, luces rojas. Suelo 158. La
//     barandilla del hueco de la escalera (x 0–86) va en carreraDelante.
//     Cámara 'luna': lo que se ve por el telescopio: la Luna grande con mares, cráteres, rayos y la línea del día y la
//     noche, en el círculo del ocular (centro 156, 92; radio 76), con el retículo rojo, el temblor del aire y una mota.
//   'redaccion': una redacción de periódico en Londres en el año 2000, de noche: techo con fluorescentes (uno parpadea),
//     corchos con recortes (rayas) e hilo rojo, la tele con las noticias, mesas del fondo con monitores y gente pequeña,
//     la impresora que escupe hojas, la ventana al Támesis con el Big Ben, el Parlamento, el London Eye que gira y un
//     autobús rojo, la fuente de agua con burbujas, estanterías. Suelo 160; el escritorio de delante (carreraDelante, x
//     36–196, tablero en y 134) con el monitor de tubo, el teclado, el teléfono y los papeles: quien está detrás pisa en 141.
//     Cámara 'cajon': un archivo polvoriento: estanterías de cajas numeradas, el ventanuco con su haz de luz y motas, la
//     bombilla que se mece, el archivador metálico (x 112–190) cuyo cajón de arriba se abre (o.abre 0–1) con la carpeta del
//     informe que asoma, con candado (o.candado true por omisión), el polvo que cae, telarañas, una araña y un ratón. Suelo 170.
export function carrera(R, t, o = {}) {
  const enc = o.encuadre || 'patio57', cam = o.camara || 'general';
  if (enc === 'patio57') return cam === 'cielo' ? a_patioCielo(R, t, o) : a_patio(R, t, o);
  if (enc === 'despachoAF') return cam === 'mesa' ? a_despachoMesa(R, t, o) : a_despacho(R, t, o);
  if (enc === 'laboratorio') return cam === 'pizarra' ? a_labPizarra(R, t, o) : a_lab(R, t, o);
  if (enc === 'observatorio') return cam === 'luna' ? a_obsLuna(R, t, o) : a_obs(R, t, o);
  if (enc === 'redaccion') return cam === 'cajon' ? a_cajon(R, t, o) : a_redac(R, t, o);
  return a_patio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de carrera(); se llama después de los actores, con las mismas opciones:
// patio57: la mesa de jardín con la radio de onda corta; despachoAF: la mesa grande; laboratorio: el banco con la
// calculadora; observatorio: la barandilla del hueco de la escalera; redaccion: el escritorio con el monitor; las demás
// cámaras no tienen nada delante. Devuelve { tablero } (la y del tablero de la mesa, si la hay).
export function carreraDelante(R, t, o = {}) {
  const enc = o.encuadre || 'patio57', cam = o.camara || 'general';
  if (cam !== 'general') return {};
  if (enc === 'patio57') return a_patioDelante(R, t, o);
  if (enc === 'despachoAF') return a_despachoDelante(R, t, o);
  if (enc === 'laboratorio') return a_labDelante(R, t, o);
  if (enc === 'observatorio') return a_obsDelante(R, t, o);
  if (enc === 'redaccion') return a_redacDelante(R, t, o);
  return {};
}
// ── B · Los animales espías ─────────────────────────────────────────────────────────────────────────────────
// Cada encuadre devuelve su geometría ({ suelo, … }: las y de los pies y los sitios de las cosas, ver cada caso) y lo que va
// delante de los personajes está en animalesDelante(R, t, o), que se llama DESPUÉS de los actores con las mismas opciones.
// o.encuadre (y o.camara):
//   'tallerCIA': el taller técnico de la CIA en los años sesenta: techo con el fluorescente que parpadea a ratos, pared
//     verde institucional con zócalo de tablas, el panel perforado con las herramientas y su silueta pintada, la ventana con
//     la persiana veneciana (detrás, el cielo con nubes, los árboles de Langley y un pájaro, solo por las rendijas) y la
//     luz rayada que cae al suelo con motas de polvo, la estantería metálica con el cajonero de componentes, dos
//     osciloscopios con ondas verdes vivas, el magnetofón de bobinas que giran (con su aguja y su piloto), cables colgando,
//     el radiador de hierro bajo la ventana,
//     el extintor, el perchero con la gabardina y el sombrero, cajas con cables y la cesta de mimbre con el cojín rojo para
//     el gato (con su cuenco y un ovillo); suelo de linóleo a cuadros en perspectiva. En animalesDelante: el banco de
//     trabajo (tablero de madera, frente cerrado con cajones) con el tornillo de banco, la lupa con su brillo, el soldador
//     que humea, la pila, el microfonito, el carrete y el flexo que alumbra la mesa.
//     Devuelve { suelo: 158, detrasBanco: 142, banco: [66, 136, 234], cesta: [267, 146], ventana: [114, 14, 180, 72] }.
//     Cámara 'mesa': el banco de cerca (inserto): tablero de vetas con la luz del flexo, el panel perforado y el magnetofón
//     (bobinas que giran) desenfocados al fondo, el esquema técnico azul (sin letras: pila, resistencia, bobina, antena,
//     micrófono), la taza que humea, el micrófono diminuto sobre su fieltro, el cable fino que va a la pila y sigue hacia
//     la cola, la lupa articulada con su brillo que pasa, el soldador en su muelle con la punta al rojo y el humo, el
//     carrete de estaño, las pinzas y tornillos. Devuelve { suelo: 172, microfono, pila, lupa, soldador, mano }.
//   'parque': un parque europeo en los sesenta, de mañana: cielo tramado con nubes de tres tonos a tres velocidades y
//     pájaros, la fila de fachadas clásicas (ventanas con contraventanas, buhardillas, chimeneas, toldos de rayas y la
//     cúpula verde), la calle adoquinada por la que pasan coches, la furgoneta gris de chapa ondulada aparcada a la
//     izquierda con su antena de látigo que se mece (o.furgoneta false la quita), la verja, paseantes diminutos (uno con
//     cochecito, otro con perro), dos castaños en flor que se mecen, la fuente con su chorro y el agua que se riza, dos
//     farolas, un banco del fondo con un señor que lee, el césped con matas y la plaza de grava; siete palomas que andan,
//     picotean y alzan el vuelo por turnos (o.palomas false las quita; o.espanta 0–1: todas salen volando). El respaldo del
//     banco grande está aquí; el asiento y las patas, con el parterre del primer plano, en animalesDelante.
//     Devuelve { suelo: 160, banco: [206, 154, 256] (los que se sientan, pies en 154), fuente: [182, 134],
//     furgoneta: [8, 110, 74], palomas: [[x, y], …] (donde están este fotograma) }.
//     Cámara 'furgoneta': dentro de la furgoneta: chapa con nervios y remaches, el plafón, las dos puertas traseras con
//     sus ventanitas por las que se ve el parque (recortado a su hueco: cielo, fachadas, el castaño, el chorro de la fuente
//     y palomas que pasan; una cortinilla), el receptor con el dial ámbar, dos magnetofones con bobinas que giran y vúmetros,
//     el panel de clavijas con pilotos, auriculares colgados que se balancean, el osciloscopio, el termo y las tazas, el
//     plano de la ciudad con chinchetas; suelo de chapa estriada. Los dos mostradores de los lados van en
//     animalesDelante. Devuelve { suelo: 168, detrasMesa: 149, mesas: [[0, 140, 108], [212, 140, 319]], ventanas }.
//   'labSkinner': el laboratorio de Skinner en los cuarenta: yeso con manchas y friso de madera, la lámpara esmaltada que
//     se mece con su cono de luz, la pizarra con dibujos de tiza (el barco en la mira, la cabeza de paloma, la trayectoria,
//     flechas), la bata colgada, la ventana de guillotina con Minneapolis en invierno (tejados nevados, silos y humo que
//     sube, nubes que pasan), la estantería con seis jaulas de alambre y palomas vivas (picotean, aletean; la malla va por
//     delante), el proyector en su carrito, la punta de la bomba de maqueta abierta en su caballete (dentro, la pantallita
//     verde con el barco que se mueve), suelo de tablas. La mesa (cuaderno, cronómetro, tarro de grano) va en
//     animalesDelante. Devuelve { suelo: 160, detrasMesa: 153, mesa: [26, 146, 128], punta: [244, 112], jaulas, pizarra }.
//     Cámara 'punta': dentro de la punta de la bomba (inserto): la chapa en anillos con remaches que se va a oscuras, la
//     pantalla redonda con el mar y el barco que se mueve (o.rumbo −1–1: dónde está el barco; por omisión deriva solo),
//     la retícula, el arnés de lona con hebillas y la percha, pilotos y un manómetro. La paloma la pone la escena.
//     Devuelve { suelo: 152, pantalla: [160, 74, 40], paloma: [160, 152] }.
//   'campoNieve': un campo alemán nevado en los cincuenta: cielo gris tramado con nubes de nieve a varias velocidades y
//     cuervos, colinas con bosque, pinos con nieve, el camión militar oliva con la lona nevada, la caseta de madera con la
//     ventana encendida y el humo, huellas y rodadas, el hoyo con la mina enorme de acero (PIEZAS_DC.minaPeacock a escala 2,
//     escarchada, medio enterrada; o.mina false la quita), el termómetro de los técnicos en su poste (o.frio 0–1 baja el
//     mercurio), palas, una caja y un farol, y la nieve que cae en tres capas. La valla, los montones de nieve del primer
//     plano y unos copos grandes van en animalesDelante.
//     Devuelve { suelo: 160, mina: [165, 150] (centro abajo de la pieza), lomoMina: [132, 112, 198] (donde se posa la
//     gallina), termometro: [232, 104], camion: [20, 122, 98], caseta: [236, 112, 282] }.
//     Cámara 'plano': el plano técnico azul sobre la mesa (sin letras): la cuadrícula, el corte de la mina con tres gallinas,
//     su comedero y su bebedero y la caja de la electrónica, cotas con flechas y un «7», el cajetín de rayas, la regla, el
//     compás que gira despacio, el lápiz, la goma, la taza que humea y la luz de la lámpara; o.trazo 0–1 (1 por omisión)
//     dibuja las gallinas poco a poco. Devuelve { suelo: 172, mina: [148, 96], gallinas: [[x, y], …] }.
//   'archivos2004': la sala de lectura de los Archivos Nacionales británicos en 2004: estanterías altas con cajas grises
//     numeradas con rayas (sin letras), la escalera de biblioteca, el calendario de pared con el día grande (o.dia, 1 por
//     omisión) y la fila de doce meses con el suyo marcado (o.mes, 4), el reloj, un grabado enmarcado, la mesa del fondo con
//     lámparas verdes y lectores diminutos, un archivero que empuja su carrito, moqueta con dibujo; o.flash 0–1: el
//     fogonazo de las cámaras de los periodistas (en o.flashes [[x, y], …], por omisión a los dos lados). La mesa larga
//     con sus lámparas va en animalesDelante.
//     Devuelve { suelo: 166, detrasMesa: 154, mesa: [96, 147, 228], calendario: [118, 26, 160, 80] }.
//     Cámara 'caja': una caja de archivo que se abre (inserto): la tapa que se levanta (o.abre 0–1), los expedientes
//     atados con cinta y lazo, el sello rojo, las hojas que salen y se abren en abanico, los guantes de algodón, el lápiz,
//     la lupa y motas en la luz. Devuelve { suelo: 172, caja: [160, 118] }.
export function animales(R, t, o = {}) {
  const e = o.encuadre ?? 'tallerCIA', cam = o.camara ?? 'general';
  if (e === 'parque') return cam === 'furgoneta' ? b_furgoneta(R, t, o) : b_parque(R, t, o);
  if (e === 'labSkinner') return cam === 'punta' ? b_punta(R, t, o) : b_skinner(R, t, o);
  if (e === 'campoNieve') return cam === 'plano' ? b_plano(R, t, o) : b_nieve(R, t, o);
  if (e === 'archivos2004') return cam === 'caja' ? b_caja(R, t, o) : b_archivo(R, t, o);
  return cam === 'mesa' ? b_tallerMesa(R, t, o) : b_taller(R, t, o);
}
// lo de delante de los personajes en cada encuadre de animales(); se llama después de los actores, con las mismas opciones:
// el banco de trabajo del taller, el asiento del banco y el parterre del parque, los mostradores de la furgoneta, la mesa de
// Skinner, la valla y la nieve del campo y la mesa larga del archivo (los insertos no llevan nada delante)
export function animalesDelante(R, t, o = {}) {
  const e = o.encuadre ?? 'tallerCIA', cam = o.camara ?? 'general';
  if (cam !== 'general') { if (e === 'parque' && cam === 'furgoneta') b_furgonetaDelante(R, t, o); return {}; }
  if (e === 'parque') b_parqueDelante(R, t, o);
  else if (e === 'labSkinner') b_skinnerDelante(R, t, o);
  else if (e === 'campoNieve') b_nieveDelante(R, t, o);
  else if (e === 'archivos2004') b_archivoDelante(R, t, o);
  else b_tallerDelante(R, t, o);
  return {};
}
// ── C · Los espías psíquicos ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre ({ suelo, … }).
//   'sri': el laboratorio del Instituto de Investigación de Stanford en los setenta, cálido: techo de placas acústicas con
//     su fluorescente, papel pintado mostaza y naranja con círculos, panelado de nogal, moqueta naranja de pelo largo. A la
//     izquierda el cuarto aislado (x 22–180, y 30–148): paredes de malla de cobre con costuras y remaches, la puerta
//     (x 26–52) con su palanca, el piloto rojo encima (parpadea si o.sesion, true por omisión) y la gran ventana de
//     observación (hueco x 58–158, y 58–118) por la que se ve el interior: malla, la lámpara de jaula, el altavoz, el
//     micrófono que cuelga y se mece, la silla naranja del vidente. A la derecha el rack de aparatos (x 186–232) con el
//     osciloscopio, los indicadores de aguja, los pilotos y el registrador de papel que corre con sus tres plumillas; el
//     magnetofono de bobinas en su carrito (x 238–274), el reloj de pared, la planta colgante de macramé que se mece y la
//     ventana a California (x 246–312, y 50–100) con palmeras al viento, colinas, nubes de tres tonos, coches y un ciclista.
//     Los cables van del cuarto al rack por el techo y por la moqueta. La mesa del cuarto con el papel y el flexo, y los
//     reflejos del cristal van en psiquicosDelante. También: el pictograma de peligro en la puerta, la tablilla colgada
//     (x 164–176) y el rollo de cable. Suelo del laboratorio 162; dentro del cuarto el vidente se planta en 124 con x
//     (borde izquierdo del sprite) 96–112, detrás de la mesa (tablero en y 113): asoma cabeza y hombros por la ventana.
//     Cámara 'dibujo': el papel de cerca (inserto): la mesa de nogal con la luz del flexo, la tablilla con la pinza y el
//     papel, un boceto a lápiz (una isla con una torre, el mar, una nube, el círculo alrededor) que se va dibujando solo
//     (o.trazo 0–1) con el lápiz en la punta (o.lapiz false lo quita: devuelve .punta para poner ahí la mano), el mapa del
//     mundo pegado con cinta con el «?» que late en un punto lejano (o.pregunta false lo quita), el cronómetro que corre,
//     la taza con vapor, la goma y sus virutas, lápices.
//   'fortmeade': la oficina de Fort Meade en los ochenta: techo de placas con fluorescentes (uno parpadea), pared de bloque
//     pintado con zócalo verde caqui, moqueta marrón en losetas. El corcho grande (x 18–118, y 34–96) con bocetos a lápiz
//     de bases, barcos, aviones y un submarino, chinchetas e hilos rojos (las hojas se agitan con el ventilador); el mapa del
//     mundo con chinchetas (x 126–196, y 30–84); el perchero con la guerrera y la gorra; la ventana con persianas a medio
//     bajar (x 208–262, y 34–92) que da a la base: barracones, depósito de agua, la bandera de barras que ondea, soldaditos
//     que pasan y un jeep; los archivadores verde oliva (x 272–316, y 86–138) con la cafetera que humea y el ventilador que
//     gira. Las dos mesas con flexo, bocetos, cajones y tazas van en psiquicosDelante. Suelo 150; mesa A x 30–124 y mesa
//     B x 150–244, tablero en y 141 (el que se sienta detrás asoma cabeza y hombros).
//     Cámara 'pared': el corcho de cerca: bocetos a lápiz de una base con radar, un barco, un avión, un submarino y una
//     montaña con túnel, dos fotos de paisaje (sin caras), fichas con rayas y una con cifras, chinchetas de colores, hilos
//     rojos que se mecen y papeles que levanta el aire del ventilador; o.gato true añade el boceto del gato espía (gag 5)
//     en el centro (x 132–188, y 62–120).
//   'revision': la sala de reuniones de 1995: techo con downlights, papel pintado beige y zócalo malva con moldura, moqueta
//     azul gris; la ventana con persianas (x 14–76, y 30–104) que deja rayas de luz de la tarde en la pared y el suelo, con
//     árboles y nubes fuera; la pantalla de proyección (x 100–196, y 26–90) con la gráfica que baja y la gran cruz, y el
//     haz del retroproyector; el reloj, el ficus, la puerta (x 236–266, y 62–146; o.puerta 0 abierta al pasillo encendido,
//     1 cerrada) y el ordenador beige de 1995 con su salvapantallas de estrellas (x 274–316). o.luz 0–1 (1 por omisión):
//     a 0 la sala se apaga (la oscuridad la aplica psiquicosDelante, al final, sobre todo). La mesa larga con carpetas,
//     el retroproyector y la jarra va en psiquicosDelante; o.cruces (0–4, 4 por omisión): cuántas carpetas llevan la cruz
//     roja. Suelo 150; tablero de la mesa en y 141 (x 36–284): detrás asoman cabeza y hombros.
//     Cámara 'pantalla2017': un ordenador de 2017 de cerca: el monitor plano (pantalla x 70–250, y 32–124) con el visor de
//     documentos y miles de páginas (rayas, sin letras) que pasan solas (o.velocidad, páginas por segundo; 6 por omisión),
//     las miniaturas, la barra de desplazamiento y el contador de páginas que sube (o.paginas0, por omisión 1); notas
//     adhesivas, el teclado, el ratón, la taza con vapor, el móvil que se ilumina, la oficina desenfocada detrás.
export function psiquicos(R, t, o = {}) {
  const enc = o.encuadre ?? 'sri', cam = o.camara ?? 'general';
  if (enc === 'fortmeade') return cam === 'pared' ? c_fmPared(R, t, o) : c_fm(R, t, o);
  if (enc === 'revision') return cam === 'pantalla2017' ? c_pantalla17(R, t, o) : c_revision(R, t, o);
  return cam === 'dibujo' ? c_sriDibujo(R, t, o) : c_sri(R, t, o);
}
// lo de delante de los personajes en cada encuadre de psiquicos(); se llama después de los actores, con las mismas
// opciones: 'sri' la mesa del cuarto (dentro de la ventana) y los reflejos del cristal; 'fortmeade' las dos mesas;
// 'revision' la mesa larga y, si o.luz < 1, la oscuridad. Los insertos no llevan nada delante.
export function psiquicosDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'sri', cam = o.camara ?? 'general';
  if (cam !== 'general') return {};
  if (enc === 'fortmeade') return c_fmDelante(R, t, o);
  if (enc === 'revision') return c_revisionDelante(R, t, o);
  return c_sriDelante(R, t, o);
}
// ── D · La guerra de mentira ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'campo44': un campo de Normandía en 1944 al atardecer (o.noche 0–1: 0 el sol que se pone entre los setos, cielo
//     violeta y naranja tramado con nubes de tres tonos encendidas por debajo a tres velocidades, golondrinas; 1 de noche,
//     con la luna, estrellas, murciélagos y luciérnagas; entre medias, la mezcla). Al fondo, colinas con setos (bocage), el
//     campanario de un pueblo, campos de trigo y de pasto, una fila de chopos y un roble; a la izquierda, la granja de
//     piedra con las ventanas encendidas, la chimenea que humea, el pajar y el almiar; en medio, la tienda de lona con la
//     luz dentro y la antena que se mece; detrás, dos tanques de goma pequeños (uno bajo una red de camuflaje) y un
//     soldadito que pasa cargando un tanque enrollado; a la izquierda, el camión con el altavoz enorme de cuatro bocinas
//     (o.altavoz 0–1, 1 por omisión: las membranas vibran y salen ondas de sonido hacia arriba); a la derecha, el tanque de
//     goma grande (o.inflado 0–1, 1 por omisión: se aplasta, se ensancha, se arruga y se le dobla el cañón; o.tanque
//     false: no lo pinta, para que la escena lo pinte con guerraTanque); o.bomba (true: animada; 0–1: el pedal) pone el
//     fuelle de pie con la manguera hasta la válvula del tanque. Rodadas del camión, amapolas, hierba que se mueve.
//     Lo de delante (el seto de la izquierda, las cajas de madera y el bidón de la derecha) va en guerraDelante.
//     Cámara 'tienda': dentro de la tienda de radio, de noche: la lona con sus costuras, el palo y la cumbrera, el farol
//     que cuelga y se mece con su halo, el mapa clavado, el portapapeles, la radio grande sobre cajas de munición (diales
//     que giran, la aguja del medidor, lucecitas que parpadean), los auriculares colgados, el teléfono de campaña, la
//     puerta abierta a la noche (estrellas, la silueta de un tanque de goma y un soldadito con linterna, recortado al
//     hueco). La mesa de cajas (con el manipulador Morse, la libreta, la taza que humea) va en guerraDelante.
//   'rin': la orilla del Rin en marzo de 1945, de noche: cielo tramado con la luna, estrellas y nubes con canto de plata;
//     al otro lado, colinas y pueblos a oscuras con su campanario; el río ancho con ondas que corren, el reflejo de la luna
//     que tiembla y el de las hogueras; muy a lo lejos, a la izquierda, tres botes pequeños que cruzan con su estela; en
//     esta orilla, el campamento de mentira: tiendas, tres tanques de goma, un camión de goma, tres hogueras que crepitan
//     (resplandor, chispas, humo) con soldaditos sentados y uno que va y viene, y una bandera que ondea. Lo de delante (los
//     juncos y las espadañas, los bidones) va en guerraDelante.
//     Cámara 'mapa': la mesa de mapas (inserto): el mapa del río sobre la mesa de madera, con bosques, curvas de nivel,
//     pueblos, carreteras y la cuadrícula con números; la flecha falsa (roja, a trazos, hacia el norte, con fichas
//     fantasma; o.falsa 0–1, la flecha que crece) y la real (azul, gruesa, cruzando el río más al sur; o.real 0–1), fichas
//     de madera, el compás de puntas, el lápiz, la lupa, la taza que humea, el halo de la lámpara y una polilla.
//   'capitolio': una sala del Capitolio en 2024: techo artesonado, columnas de mármol con capiteles, un cuadro de paisaje
//     con marco dorado, el telón azul con su emblema de estrella, dos banderas de barras y estrellas en sus mástiles que se
//     mecen, la cortina granate a la derecha, la estatua en su pedestal, la tarima con faldón azul y ribete dorado, el
//     puente de focos con sus conos de luz y motas, la cámara de televisión y los fotógrafos con sus flashes. El público
//     sentado (de espaldas), el atril y la medalla (o.medalla true: la medalla de oro con su cinta y su brillo, en
//     o.medallaEn [x, y], [206, 100] por omisión) van en guerraDelante.
//     Cámara 'taller': el taller de un artista de día: pared de ladrillo y de yeso con salpicaduras, el ventanal de
//     hierro con la ciudad y las nubes (y una paloma, recortadas al hueco) y la cortina que mueve la brisa, el haz de luz
//     con motas, el caballete con un cuadro de grandes campos de color (la gota de pintura que cae), bocetos de vestidos
//     clavados con muestras de tela, el maniquí con un vestido de noche, la cinta métrica que cuelga, la estantería con
//     botes y pinceles, rollos de tela, la lámpara industrial y el suelo de tablas con manchas. La mesa de trabajo de
//     delante (paletas, pinceles, tubos, tijeras, telas) va en guerraDelante.
// Devuelve la geometría: { suelo, … } (lo que cada encuadre tiene a mano para la escena).
export function guerra(R, t, o = {}) {
  const enc = o.encuadre ?? 'campo44', cam = o.camara ?? 'general';
  if (enc === 'rin') return cam === 'mapa' ? d_guMapa(R, t, o) : d_guRin(R, t, o);
  if (enc === 'capitolio') return cam === 'taller' ? d_guTaller(R, t, o) : d_guCapitolio(R, t, o);
  return cam === 'tienda' ? d_guTienda(R, t, o) : d_guCampo(R, t, o);
}
// lo de delante de los personajes en cada encuadre de guerra(); se llama después de los actores, con las mismas
// opciones: campo44 el seto y las cajas; tienda la mesa de cajas con el Morse; rin los juncos y los bidones; capitolio el
// público, el atril y la medalla; taller la mesa de trabajo (mapa no tiene nada delante)
export function guerraDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'campo44', cam = o.camara ?? 'general';
  if (enc === 'rin') return cam === 'mapa' ? {} : d_guRinDelante(R, t, o);
  if (enc === 'capitolio') return cam === 'taller' ? d_guTallerDelante(R, t, o) : d_guCapitolioDelante(R, t, o);
  return cam === 'tienda' ? d_guTiendaDelante(R, t, o) : d_guCampoDelante(R, t, o);
}
// ── D2 · El hielo ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Todos pintan los 320 × 180 px; lo fijo va en
// un búfer por encuadre (e_fijo) y encima la vida animada. Devuelven la geometría ({ suelo, … }) para las escenas.
//   'londres42': un despacho de Londres en 1942: papel pintado verde de damasco, riel y zócalo de caoba con paneles,
//     parqué en espiga y alfombra persa; la ventana de guillotina con cinta antimetralla en cruz, cortinas de terciopelo,
//     la lluvia que cae y resbala por el cristal, los tejados de Londres con chimeneas que humean, la cúpula de San Pablo
//     y dos globos de barrera que se mecen; el mapa grande del Atlántico (convoyes que avanzan, submarinos que se mueven y
//     dan su «ping», los círculos de cobertura aérea y la zona sin aviones rayada en rojo), apliques, la librería, la
//     chimenea con el fuego que chisporrotea, el reloj de la repisa, un cuadro de un velero, el sillón chester, el
//     perchero con el paraguas que gotea y el radiador. La mesa (lámpara de banquero, teléfono, papeles, té que humea,
//     pipa con humo) va en hieloDelante. Suelo: los pies en y 150–176 (162 delante del mapa).
//     Cámara 'mapa': el mapa de cerca a pantalla completa: el Atlántico con su costa, la cuadrícula, la rosa de los
//     vientos, chinchetas, notas clavadas (solo rayas), los convoyes y los submarinos más grandes; o.dibuja 0–1: a lápiz
//     se dibuja un iceberg en mitad de la zona sin aviones (0–0,45), se rellena (0,45–0,55) y encima se traza el
//     portaaviones con su cubierta, su isla y tres avioncitos (0,55–1), mientras el iceberg se queda en punteado.
//   'tallerHielo': un taller frío: paredes de ladrillo encalado con escarcha, dos ventanales altos con nieve que cae y
//     haces de luz, la puerta del pasillo (por la que pasa un operario con su carretilla), la estantería con moldes de
//     madera, los sacos de serrín, el tablero de herramientas (martillo, sierra, tenazas, piolet), pilas de bloques de
//     hielo y de pykrete grises, cubos de agua, el termómetro bajo cero, la cámara frigorífica con su puerta de acero
//     escarchada que echa vaho, la tubería con carámbanos que gotean, el compresor con el volante que gira y los
//     manómetros, el suelo de cemento con charcos. El banco (el molde con la mezcla gris, el bloque de hielo normal y el
//     de pykrete; quien trabaja detrás del banco, con los pies en y 158 en x ≈ 254) va en hieloDelante; o.rompe 0–1: el bloque de hielo normal se raja (hasta 0,6) y se parte en dos con
//     esquirlas (0,6–1); o.molde 0–1 (1 por omisión): lo lleno que está el molde; o.bloques false: sin los dos bloques.
//     Cámara 'reunion': la sala de reuniones de 1943 (Quebec): paneles de roble, dos ventanales con cortinas doradas al
//     río San Lorenzo (un barco que pasa, gaviotas, nubes), el plano azul del portaaviones colgado (sin letras), dos
//     banderas, la lámpara de araña que destella, la alfombra, la palmera, los respaldos de cuero de los altos mandos.
//     La mesa larga con mantel verde (jarras, vasos, carpetas, puros con humo y, si o.bloque !== false, el bloque de
//     pykrete) va en hieloDelante.
//   'banera': un cuarto de baño elegante de los cuarenta: yeso verde agua, cenefa art déco, azulejos crema, suelo
//     ajedrezado verde y crema, el grabado del faro, la repisa con frascos de sales, la bata colgada, la ventana de
//     cristal esmerilado (ramas que se mecen detrás) con visillo y helecho, el
//     radiador, la bañera con patas de garra llena de agua que humea (vapor que sube), el grifo que gotea, el patito que
//     se mece, la rejilla con esponja y jabón, el lavabo de pie con el espejo empañado (una gota que resbala), la
//     repisa con la brocha y la navaja, el toallero, la lámpara de globo, el cesto y el taburete con toallas; nadie
//     dentro. o.bloque 0–1: un bloque cae en la bañera (0–0,3), salpica (0,3–0,6) y flota meciéndose; o.bloqueX (178);
//     o.tipo 'pykrete' (por omisión) o 'hielo'.
//     Cámara 'cerca': la bañera de cerca: azulejos, el grifo grande que gotea, el borde de esmalte delante, el agua con
//     reflejos y ondas, el patito, el vapor y el bloque (o.bloque igual: cae desde arriba y salpica; luego flota con
//     sus anillos); en el borde de delante, la toalla de rayas y el cepillo de mango largo.
//   'patricia': el lago Patricia en las Rocosas de Canadá (1943): cielo tramado con nubes de tres tonos a tres
//     velocidades, el monte Pirámide de cuarcita rojiza y la sierra nevada, bosques de pinos en tres términos, el lago
//     azul verdoso con el reflejo que ondula y destellos, el embarcadero con la barca que se mece, la cabaña de la otra
//     orilla con humo, una canoa que cruza, gente pequeña en la otra orilla, pájaros, y el prototipo (casco de hielo con
//     su caseta de madera, la chimenea y el motor del frío) flotando con su reflejo; o.estacion 'verano' (por omisión) |
//     'otono' (alerces amarillos, álamos naranjas, hojas que caen, gansos) | 'invierno' (nieve, el lago helado con
//     grietas y ventisca, cuervos); o.hundido 0–1 (se hunde: baja, se inclina y el hielo se va comiendo).
//     La orilla de delante (juncos, matas, piedras y dos pinos de primer plano en los bordes) va en hieloDelante.
//     Cámara 'fondo': bajo el agua: la superficie que tiembla vista desde abajo con la barca en silueta, las laderas de
//     roca a los lados, el fondo de cieno con piedras y troncos, los restos (vigas, el trozo del tejado, los serpentines
//     del frío oxidados, el motor), algas que se mecen, cáusticas de luz que bailan en el fondo, rayos de luz, motas,
//     burbujas que suben del motor y peces (una trucha, una perca que ronda y un banco de pececillos).
// Lo que va delante de los personajes: hieloDelante(R, t, o), con las mismas opciones, después de los actores.
export function hielo(R, t, o = {}) {
  const enc = o.encuadre ?? 'londres42', cam = o.camara ?? 'general';
  if (enc === 'tallerHielo') return cam === 'reunion' ? e_reunion(R, t, o) : e_taller(R, t, o);
  if (enc === 'banera') return cam === 'cerca' ? e_baneraCerca(R, t, o) : e_banera(R, t, o);
  if (enc === 'patricia') return cam === 'fondo' ? e_fondoLago(R, t, o) : e_patricia(R, t, o);
  return cam === 'mapa' ? e_mapaCerca(R, t, o) : e_londres(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hielo(); se llama después de los actores, con las mismas opciones:
// la mesa de Londres, el banco del taller, la mesa larga de la reunión y la orilla del lago (en el resto, nada)
export function hieloDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'londres42', cam = o.camara ?? 'general';
  if (enc === 'londres42' && cam === 'general') return e_mesaLondres(R, t, o);
  if (enc === 'tallerHielo') return cam === 'reunion' ? e_mesaReunion(R, t, o) : e_banco(R, t, o);
  if (enc === 'patricia' && cam === 'general') return e_orilla(R, t, o);
  return {};
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o 'mesa'). Devuelve la geometría del encuadre ({ suelo, … }).
//   'archivo': el archivo de Atom de noche, cálido: vigas oscuras en el techo, tres cuerpos de estantería de madera
//     (x 4–170, y 18–150) llenos de carpetas beige, kraft y grises con su sello rojo (sin letras), cajas de archivo con
//     asidero y etiqueta en blanco, montones tumbados y cajas encima; la escalera de biblioteca con su barra de latón
//     (x 120–152); el ficus; la ventana (x 186–254, y 24–102) con cortinas granates y, fuera, la Luna llena con mares y
//     cráteres, estrellas que titilan, nubes iluminadas que pasan a dos velocidades, tejados con ventanas que se encienden
//     y un avión que parpadea; el haz de luna en el suelo con motas de polvo; la lámpara de pie (x 256–278) con su halo
//     cálido, el reloj de pared, el archivador metálico (x 282–318, y 92–150) con un cajón entreabierto; parqué y alfombra
//     granate. El escritorio (x 92–232, tablero en y 141) con las carpetas, el sello, el flexo verde y el micrófono de
//     Atom (o.microfono, true por omisión; x 226) va en hoyDelante; o.carpetaLuna (true por omisión) deja la carpeta de la
//     Luna en el escritorio (x 190, apoyada en y 142: ahí se sienta el gato, que la escena pinta después de hoyDelante).
//     El hueco x 142–178 del escritorio queda libre para quien se siente detrás. o.luz 0–1 (1 encendido por omisión, 0 a
//     oscuras): la oscuridad la aplica hoyDelante al final, sobre todo lo pintado, con la ventana y el haz de luna aún
//     claros y el círculo de la linterna en o.linterna [x, y] (o.radio, 24 por omisión); lo que la escena pinte después
//     de hoyDelante queda sin oscurecer. Suelo de delante 170 (libre en x 8–90 y x 236–280); detrás del escritorio se
//     planta en 150 (asoma cabeza y hombros).
//     Cámara 'mesa': el escritorio de cerca: tablero de caoba con vetas, el cartapacio de piel verde con su filete dorado,
//     la lámpara de banquero verde con su charco de luz y motas, la taza de té con vapor, la lupa, los clips; detrás, las
//     estanterías desenfocadas y la ventana con la Luna. o.carpetas: lista de 'luna', 'gato', 'gallina', 'ojo', 'tanque',
//     'hielo' (o de objetos { dibujo, abierta, sello } como PIEZAS_DC.carpeta), en fila a escala 2 (por omisión las seis;
//     [] para ninguna); o.sello (true por omisión): el sello de goma delante; o.microfono (true por omisión) el micrófono
//     de Atom a la izquierda, encendido (o.microfonoLuz false lo apaga). Devuelve .carpetas con la [x, y] de cada una
//     (centro y apoyo, como las piezas) para que la escena las abra o las selle.
export function hoy(R, t, o = {}) {
  return (o.camara ?? 'general') === 'mesa' ? c_hoyMesa(R, t, o) : c_archivo(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones:
// 'archivo' el escritorio con sus cosas; en las dos cámaras, si o.luz < 1, la oscuridad con la linterna (al final)
export function hoyDelante(R, t, o = {}) {
  const mesa = (o.camara ?? 'general') === 'mesa';
  const geo = mesa ? {} : c_escritorio(R, t, o);
  const luz = c_lim(o.luz ?? 1);
  if (luz < 1) c_oscuro(R, luz, mesa ? [[208, 16, 266, 82, 0.85]] : [[188, 26, 252, 100, 0.85]], { linterna: o.linterna, radio: o.radio ?? 24, haz: mesa ? null : [152, 179, 192, 236, -0.9] });
  return geo;
}
export function gatoEspia(R, x, y, t, o = {}) { if (PIEZAS_DC.gatoEspia) PIEZAS_DC.gatoEspia(R, x, y, { t, ...o }); }

// los búferes de los fondos fijos de la carrera espacial (se pintan una vez y se copian en cada fotograma)
const a_capas = new Map(), a_VACIO = 0x01020304;

// a_capa: un fondo fijo pintado una sola vez en su búfer (vacio: lo que no se pinta queda transparente, para a_pegar)
function a_capa(R, clave, dibuja, vacio = false) {
  let b = a_capas.get(clave);
  if (!b) { b = R.nuevo(); if (vacio) b.fill(a_VACIO); const prev = R.usar(b); R.recorte(null); dibuja(); R.recorte(null); R.usar(prev); a_capas.set(clave, b); }
  return b;
}

// a_poner: copia un búfer opaco entero en el destino de ahora (la pantalla o el búfer de un fundido)
function a_poner(R, b) { const d = R.usar(b); R.usar(d); d.set(b); }

// a_pegar: pega encima lo pintado de un búfer con huecos (un recorrido de la pantalla)
function a_pegar(R, b) { const d = R.usar(b); R.usar(d); for (let i = 0; i < b.length; i++) { const c = b[i]; if (c !== a_VACIO) d[i] = c; } }

// la trama ordenada 4 × 4 y el ruido suave (para cielos tramados, vetas y manchas)
const a_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const a_bay = (x, y) => a_B4[(y & 3) * 4 + (x & 3)];

// a_tono: el tono de una rampa (oscuro → claro) para v en 0–1, tramado
const a_tono = (pal, v, x, y) => pal[Math.max(0, Math.min(pal.length - 1, Math.floor(v * (pal.length - 1) + a_bay(x, y))))];

// a_vr: ruido de valor suave
function a_vr(x, y, k = 0) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

// a_mez: mezcla de dos colores (k = 0 → a, 1 → b)
function a_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// a_luz: aclara (o tiñe) una zona ya pintada hacia el color c con un halo redondo de radio r (para lámparas y focos)
function a_luz(R, cx, cy, r, c, f = 0.35, ry = r) {
  for (let y = Math.round(cy - ry); y <= cy + ry; y++) for (let x = Math.round(cx - r); x <= cx + r; x++) {
    const d = Math.hypot((x - cx) / r, (y - cy) / ry); if (d >= 1) continue; const k = f * (1 - d) * (1 - d);
    if (k > 0.02 + a_bay(x, y) * 0.04) R.pset(x, y, a_mez(R.pget(x, y), c, k));
  }
}

// a_rc: un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function a_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// a_elipse: una elipse rellena (respeta R.recorte)
function a_elipse(R, cx, cy, rx, ry, c) { for (let j = -Math.ceil(ry); j <= ry; j++) { const w = rx * Math.sqrt(Math.max(0, 1 - (j / ry) ** 2)); for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) R.pset(x, Math.round(cy + j), c); } }

// a_nube: una nube de tres tonos (cols: [sombra, medio, luz]) de ancho w
function a_nube(R, cx, cy, w, cols, k = 0) {
  const B = [[-0.42, 0.15, 0.3], [-0.12, -0.15, 0.38], [0.2, -0.05, 0.34], [0.45, 0.2, 0.22]].map(([dx, dy, r], i) => [dx * w + (h(i, k, 5) - 0.5) * w * 0.1, dy * w * 0.5, r * w * (0.85 + h(i, k, 6) * 0.3)]);
  for (const [dx, dy, rr] of B) a_elipse(R, cx + dx, cy + dy + 1, rr, rr * 0.5, cols[0]);
  for (const [dx, dy, rr] of B) a_elipse(R, cx + dx, cy + dy, rr * 0.92, rr * 0.42, cols[1]);
  for (const [dx, dy, rr] of B) a_elipse(R, cx + dx - rr * 0.2, cy + dy - rr * 0.16, rr * 0.55, rr * 0.2, cols[2]);
}

// las cifras de tiza y de pantalla (3 × 5), sin letras: 0–9 y + - = x . / ? ^
const a_DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001011001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111', '+': '000010111010000', '-': '000000111000000', '=': '000111000111000', x: '000101010101000', '.': '000000000000010', '/': '001001010100100', '?': '111001011000010', '^': '010101000000000' };

// a_dig: escribe cifras pequeñas en (x, y) (arriba a la izquierda); roto (0–1): la tiza que falla a trozos
function a_dig(R, s, x, y, c, esc = 1, roto = 0) {
  let cx = x; for (const ch of String(s)) { const f = a_DIG[ch]; if (f) for (let k = 0; k < 15; k++) if (f[k] === '1' && h(cx + (k % 3), y + ((k / 3) | 0), 77) >= roto) for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) R.pset(cx + (k % 3) * esc + a, y + ((k / 3) | 0) * esc + b, c); cx += (ch === '.' ? 2 : 4) * esc; }
}

// el cielo de noche tramado (o.via: [[x0, y0], [x1, y1], ancho] de la Vía Láctea con su grieta oscura; o.fin: la y del
// horizonte, donde el cielo se aclara), con estrellas de tres brillos; en la esquina de Atom y la barra del año, solo
// estrellas tenues
const a_NOCHE = () => [a_P.n0, a_P.n1, a_P.n2, a_P.n3, a_P.n4, a_P.n5];

function a_cieloNoche(R, x0, y0, x1, y1, k, o = {}) {
  const P = a_P, T = o.tonos || a_NOCHE(), fin = o.fin ?? y1, ini = o.ini ?? y0, V = o.via;
  let ax = 0, ay = 0, vx = 1, vy = 0, vl = 1, vw = 1;
  if (V) { [ax, ay] = V[0]; vx = V[1][0] - ax; vy = V[1][1] - ay; vl = Math.hypot(vx, vy); vx /= vl; vy /= vl; vw = V[2]; }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const f = Math.max(0, Math.min(1, (y - ini) / Math.max(1, fin - ini)));
    let v = f * f * 0.8 + (a_vr(x / 23, y / 11, k) - 0.5) * 0.14;
    if (V) { const d = Math.abs((x - ax) * vy - (y - ay) * vx), g = Math.exp(-((d / vw) ** 2)), n = a_vr(x / 7, y / 7, k + 1) * 0.6 + a_vr(x / 3, y / 3, k + 2) * 0.4;
      const grieta = Math.exp(-(((d - vw * 0.1) / (vw * 0.2)) ** 2)) * (a_vr(x / 9, y / 9, k + 4) > 0.42 ? 1 : 0.25);
      v += g * (n * 0.5 + 0.12) - grieta * g * 0.3; }
    R.pset(x, y, T[Math.max(0, Math.min(T.length - 1, Math.floor(v * (T.length - 1) + a_bay(x, y))))]);
  }
  const quieta = (x, y) => (x >= 272 && y <= 48) || (x >= 14 && x <= 176 && y <= 16);
  if (V) for (let i = 0; i < vl * vw / 5; i++) { const s = h(i, 1, k) * vl, off = (h(i, 2, k) + h(i, 5, k) - 1) * vw * 1.1, x = Math.round(ax + vx * s - vy * off), y = Math.round(ay + vy * s + vx * off);
    if (x >= x0 && x <= x1 && y >= y0 && y <= Math.min(y1, fin - 3) && !quieta(x, y)) R.pset(x, y, h(i, 3, k) > 0.7 ? P.viaB : P.viaL); }
  const n = Math.round((x1 - x0) * (Math.min(y1, fin) - y0) / 60);
  for (let i = 0; i < n; i++) {
    const x = x0 + Math.floor(h(i, 6, k) * (x1 - x0 + 1)), y = y0 + Math.floor(h(i, 7, k) * (Math.min(y1, fin - 4) - y0 + 1)), b = h(i, 8, k), q = quieta(x, y);
    const c = h(i, 9, k) < 0.12 ? P.estC : h(i, 9, k) < 0.18 ? P.estR : P.est;
    if (b > 0.965 && !q) { R.pset(x - 1, y, P.estA); R.pset(x + 1, y, P.estA); R.pset(x, y - 1, P.estA); R.pset(x, y + 1, P.estA); R.pset(x, y, c); }
    else if (b > 0.8 && !q) R.pset(x, y, c); else R.pset(x, y, b > 0.4 ? P.estA : P.via);
  }
}

// a_titila: estrellas que se encienden y apagan (n, en la caja dada; las de la esquina de Atom no)
function a_titila(R, t, x0, y0, x1, y1, k, n = 26) {
  for (let i = 0; i < n; i++) {
    const x = x0 + Math.floor(h(i, 1, k + 50) * (x1 - x0)), y = y0 + Math.floor(h(i, 2, k + 50) * (y1 - y0)); if ((x >= 272 && y <= 48) || (x >= 14 && x <= 176 && y <= 16)) continue;
    const s = Math.sin(t * (1.6 + h(i, 3, k) * 2.4) + i * 2.3); if (s < 0.2) continue;
    R.pset(x, y, s > 0.8 ? a_P.est : a_P.estA); if (s > 0.93) { R.pset(x - 1, y, a_P.via); R.pset(x + 1, y, a_P.via); R.pset(x, y - 1, a_P.via); R.pset(x, y + 1, a_P.via); }
  }
}

// a_fugaz: una estrella fugaz cada «cada» segundos (dura 0,7 s), de p0 a p1
function a_fugaz(R, t, cada, fase, p0, p1) {
  const u = ((t + fase) % cada) / 0.7; if (u > 1) return;
  for (let i = 0; i < 12; i++) { const v = u - i * 0.025; if (v < 0) break; const x = Math.round(lerp(p0[0], p1[0], v)), y = Math.round(lerp(p0[1], p1[1], v)); R.pset(x, y, i === 0 ? a_P.est : i < 4 ? a_P.viaB : a_P.viaL); }
}

// a_sputnik: el satélite, un puntito que destella (gira al sol) sobre una curva de p0 a p2 por p1, con su estela
function a_sputnik(R, u, t, p0, p1, p2) {
  const en = (v) => { const a = (1 - v) * (1 - v), b = 2 * (1 - v) * v, c = v * v; return [a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]]; };
  for (let i = 1; i < 18; i++) { const v = u - i * 0.008; if (v < 0) break; const [x, y] = en(v); if (i % 2 || i < 6) R.pset(Math.round(x), Math.round(y), i < 6 ? a_P.viaB : a_P.via); }
  const [x, y] = en(Math.max(0, Math.min(1, u))), X = Math.round(x), Y = Math.round(y), br = Math.sin(t * 9) > -0.3;
  R.pset(X - 1, Y, a_P.estA); R.pset(X + 1, Y, a_P.estA); R.pset(X, Y - 1, a_P.estA); R.pset(X, Y + 1, a_P.estA);
  for (let a = 0; a < 6.283; a += 0.4) R.pset(Math.round(X + Math.cos(a) * 3), Math.round(Y + Math.sin(a) * 3), a_P.via);
  R.pset(X, Y, br ? a_P.est : a_P.estC); R.pset(X + 1, Y, br ? a_P.est : a_P.viaB); if (br) { for (const d of [2, 3]) { R.pset(X - d, Y, a_P.viaL); R.pset(X + 1 + d, Y, a_P.viaL); R.pset(X, Y - d, a_P.viaL); R.pset(X, Y + d, a_P.viaL); } }
  return [X, Y];
}

// la Luna de verdad (mares, cráteres con su luz y su sombra, los rayos de Tycho, la línea del día y la noche y la luz
// cenicienta): o.fase 0 llena … 1 media, o.lado 1 iluminada por la derecha (-1 por la izquierda), o.rot (gira la
// maqueta), o.tonos y o.oscuros (rampas de tonos)
const a_MARES = [[-0.36, -0.42, 0.27, 0.22], [0.18, -0.36, 0.17, 0.15], [0.33, -0.06, 0.2, 0.17], [0.7, -0.28, 0.11, 0.13], [0.56, 0.14, 0.13, 0.17], [0.35, 0.32, 0.1, 0.09], [-0.18, 0.34, 0.17, 0.13], [-0.62, -0.02, 0.28, 0.42], [-0.45, 0.42, 0.1, 0.09], [-0.05, -0.72, 0.32, 0.06], [0.05, 0.05, 0.09, 0.08]];

const a_CRATERES = [[-0.1, 0.7, 0.065, 1], [-0.31, -0.12, 0.06, 1], [-0.55, -0.08, 0.035, 1], [-0.1, -0.78, 0.05, 0], [-0.7, -0.33, 0.03, 1], [-0.13, 0.88, 0.09, 0], [0.37, 0.22, 0.05, 0], [0.5, -0.55, 0.045, 0], [0.15, 0.55, 0.07, 0], [-0.35, 0.62, 0.05, 0], [0.6, 0.45, 0.06, 0], [0.25, 0.75, 0.05, 0],
  ...Array.from({ length: 52 }, (_, k) => [h(k, 1, 901) * 1.9 - 0.95, h(k, 2, 901) * 1.9 - 0.95, 0.016 + h(k, 3, 901) * 0.036, 0]).filter(([x, y]) => x * x + y * y < 0.9)];

function a_luna(R, cx, cy, r, o = {}) {
  const P = o.tonos || [a_P.l0, a_P.l1, a_P.l2, a_P.l3, a_P.l4, a_P.l5, a_P.l6, a_P.l7], Q = o.oscuros || [a_P.lo0, a_P.lo1, a_P.lo2];
  const th = (o.fase ?? 0.5) * Math.PI / 2, lado = o.lado ?? 1;
  let sx = Math.sin(th) * lado, sy = -0.12, sz = Math.cos(th); const sl = Math.hypot(sx, sy, sz); sx /= sl; sy /= sl; sz /= sl;
  const s2 = Math.hypot(sx, sy) || 1, ex = sx / s2, ey = sy / s2, rot = o.rot ?? 0, cr = Math.cos(rot), sr = Math.sin(rot);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const u = (i + 0.5) / (r + 0.5), v = (j + 0.5) / (r + 0.5), d2 = u * u + v * v; if (d2 > 1) continue;
    const z = Math.sqrt(1 - d2), tu = u * cr + z * sr, tz = -u * sr + z * cr;
    let alb = 0.8 - 0.04 * v + (a_vr(tu * 9 + 20, v * 9, 7) - 0.5) * 0.16 + (a_vr(tu * 30, v * 30, 8) - 0.5) * 0.06, sh = 0;
    if (tz > -0.3) {
      for (const [mx, my, rx, ry] of a_MARES) { const e = ((tu - mx) / rx) ** 2 + ((v - my) / ry) ** 2 + (a_vr(tu * 12, v * 12, 3) - 0.5) * 0.7; if (e < 1) alb -= 0.3 * Math.min(1, (1 - e) * 3); }
      for (const [kx, ky, rr, rayos] of a_CRATERES) {
        const dx = tu - kx, dy = v - ky, dd = Math.hypot(dx, dy);
        if (rayos && dd < rr * 7 && dd > rr) { const an = Math.atan2(dy, dx); if (a_vr(an * 5 + 40, 0, 9) > 0.62) alb += 0.16 * (1 - dd / (rr * 7)); }
        if (dd > rr * 1.15) continue; const q = dd / rr, al = (dx * ex + dy * ey) / (dd + 1e-6);
        if (q < 0.85) sh += al > 0 ? -0.42 * al : 0.14 * -al; else sh += 0.2 * al;
        if (rayos && q < 0.5) alb += 0.1;
      }
    } else alb += (a_vr(tu * 20, v * 20, 11) - 0.5) * 0.2;
    const L = u * sx + v * sy + z * sz;
    let c;
    if (L <= 0.0) c = a_tono(Q, Math.max(0, Math.min(1, alb - 0.25 + sh * 0.3)), i, j);
    else { const baja = 1 - Math.min(1, L * 2.2), b = alb * (0.3 + 0.7 * Math.pow(L, 0.55)) + sh * (0.45 + baja * 0.9) - (1 - z) * 0.06; c = L < 0.05 ? P[a_bay(i, j) < 0.5 ? 0 : 1] : a_tono(P, Math.max(0, Math.min(1, b)), i, j); }
    R.pset(cx + i, cy + j, c);
  }
}

// los colores de la carrera espacial
const a_P = { ...C, ...pal({
  // la noche: el cielo tramado, la Vía Láctea, las estrellas, las nubes nocturnas y las siluetas
  n0: '#070a20', n1: '#0c1230', n2: '#131a3e', n3: '#1b244c', n4: '#252f5a', n5: '#333d68',
  via: '#3c4678', viaL: '#6a74a4', viaB: '#a8b0d4', est: '#f6f2ea', estA: '#98a2cc', estC: '#ffe0a0', estR: '#ffb4a0',
  nub0: '#141a36', nub1: '#1e2646', nub2: '#38426c', sil0: '#080b1c', sil1: '#0e142a', sil2: '#161e38', sil3: '#20294a',
  // la Luna (de oscuro a claro) y su cara de noche con la luz cenicienta
  l0: '#4a4a58', l1: '#605f6c', l2: '#777582', l3: '#908d96', l4: '#aaa6a8', l5: '#c4beb4', l6: '#dad4c4', l7: '#eeeadc', lo0: '#121628', lo1: '#191e34', lo2: '#222840',
  // la casa del 57 de noche: tablas, tejas, ladrillo, luz cálida, cortinas y la tele azul de los vecinos
  casa: '#6e7894', casaL: '#8e98b2', casaS: '#525a78', casaD: '#383e5a', teja: '#2a2638', tejaL: '#443e56', tejaS: '#1c1828',
  ladr: '#62302e', ladrL: '#82443c', ladrS: '#42201e', blancoN: '#c4ccde', blancoNS: '#8890aa',
  luz: '#ffd474', luzL: '#fff0bc', luzS: '#e09a44', luzD: '#9a622c', cortina: '#d06850', cortinaS: '#9a4636',
  teleA: '#7aa4ff', teleB: '#b4ccff', teleC: '#4a6ad0',
  ces0: '#0f1e16', ces1: '#16281c', ces2: '#1e3624', ces3: '#28462c', cesL: '#3e5e36', cesC: '#5e6e3a',
  hoja0: '#3e1a18', hoja1: '#5e2a1c', hoja2: '#843e1e', hoja3: '#a85a28', hoja4: '#cc8436',
  hierro: '#7e3830', hierroL: '#a8564a', hierroS: '#4e221e', tri: '#b83a30', triS: '#7a2420',
  // el despacho: nogal, latón, alfombra, banderas, verde de lámpara
  nog0: '#3e2414', nog1: '#56321c', nog2: '#6c4024', nog3: '#82502c', nog4: '#9a6436', nog5: '#b47c46',
  laton: '#c8a040', latonL: '#f0d478', latonS: '#8a6a24', alf: '#5a1c22', alfS: '#3e1218', alfL: '#7a2a2e', alfB: '#b8923a',
  band: '#c43038', bandS: '#8a2028', bandA: '#2a3a7a', bandAS: '#1a2654', bandB: '#e8e4dc', bandBS: '#aaa6a0', faf: '#3a5aa8', fafS: '#26407a',
  drap: '#6e1e26', drapL: '#8e2e34', drapS: '#4a1218', persiana: '#d8ccb0', persianaS: '#a89a7c',
  mapaM: '#86b4cc', mapaMS: '#6a98b4', mapaT: '#d8c898', mapaTS: '#b4a474', archivo: '#5e6a4e', archivoL: '#7a8866', archivoS: '#3e4834',
  // el laboratorio de 1958: pizarra, tiza, yeso, linóleo, ladrillo de Chicago, el tren elevado
  piz0: '#1c3428', piz1: '#24402f', piz2: '#2c4c38', piz3: '#365a42', tiza: '#e6ece2', tizaS: '#a8bcac', tizaA: '#f0d878', tizaR: '#f0a0a0', tizaZ: '#a8d0f0',
  yeso: '#d8d0b4', yesoS: '#b8b096', yesoL: '#ece6d0', verdeP: '#6e8e78', verdePS: '#56746a', lin0: '#9a9282', lin1: '#b4ac9a', lin2: '#ccc4b0', linL: '#e4dccc',
  ladC: '#a85a44', ladCS: '#7e3e30', ladCL: '#c47458', acero: '#4e5866', aceroL: '#7a8696', aceroS: '#323a46', tren: '#4e7050', trenL: '#6a8e68', trenC: '#d8ccaa',
  cielo1: '#5aa2dc', cielo2: '#7cb8e6', cielo3: '#a6d0ee', cielo4: '#cfe4f2', nubeL: '#ffffff', nubeM: '#e4ecf4', nubeS: '#b4c4d8',
  oscilo: '#0e2a1a', osciloL: '#7af0a0', geiger: '#d8b030', geigerS: '#a07e1c', esmalte: '#3e6e5a', esmalteL: '#5e9078',
  // el observatorio: la cúpula de acero, la luz roja, la madera del suelo, el telescopio blanco
  cup0: '#14182a', cup1: '#1e2438', cup2: '#2a3248', cup3: '#3a445c', cupL: '#56627e', rojoN: '#e8483a', rojoNS: '#8a2a26', rojoNL: '#ffa088',
  sue0: '#2a1e1c', sue1: '#3a2a24', sue2: '#4a3830', tel: '#d8d8d0', telS: '#a4a49e', telL: '#f4f2ea', telD: '#6a6a66',
  // la redacción del 2000 y el archivo
  red0: '#8a96a8', red1: '#a2acbc', red2: '#bcc4d0', redS: '#6a7488', moq0: '#3a4458', moq1: '#465268', moq2: '#525e74',
  beige: '#d8d0b8', beigeS: '#aaa290', beigeL: '#ece6d4', panta: '#1e3a6a', pantaL: '#8ab0e8', corcho: '#b4824a', corchoS: '#8a5e32',
  tam0: '#0c1428', tam1: '#16223c', tam2: '#2a3a5a', farol: '#ffc870', bus: '#c4282a', busS: '#841a1c', ojo: '#c8e0ff',
  arch0: '#2a2e36', arch1: '#363b44', arch2: '#444a54', arch3: '#565c66', metal: '#7a8478', metalL: '#a0aa9c', metalS: '#4e5650', metalD: '#363c38',
  carton: '#a88a5e', cartonS: '#7a6240', cartonL: '#c8a874', polvo: '#c8c0b0', haz: '#e8dcb8',
}) };

// ═══ patio57: el patio trasero de 1957, de noche ═══
function a_patio(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  a_poner(R, a_capa(R, 'a-patio-cielo', () => a_cieloNoche(R, 0, 0, 319, 179, 11, { via: [[-10, 150], [250, -24], 15], fin: 112 })));
  // lo que pasa por el cielo, detrás de todo: titileo, nubes nocturnas a tres velocidades, la fugaz y el Sputnik
  a_titila(R, t, 0, 0, 319, 100, 11, 30);
  [[0.9, 58, 70, 0], [1.6, 50, 52, 1], [2.6, 66, 44, 2]].forEach(([v, y, w, k]) => { const x = ((t * v + k * 140 + 30) % 420) - 60; a_nube(R, x, y, w, [P.nub0, P.nub1, P.nub2], k + 30); });
  a_fugaz(R, t, 9, 3, [150, 30], [196, 50]);
  let sp = null; if (o.sputnik != null) sp = a_sputnik(R, o.sputnik, t, [8, 84], [140, 6], [268, 56]);
  a_pegar(R, a_capa(R, 'a-patio-medio', () => a_patioMedio(R), true));
  // las ventanas encendidas: la cocina con su sombra que pasa, la tele azul de los vecinos
  { const cl = [18, 80, 26, 101]; R.recorte(cl); const u = (t % 7) / 7; if (u < 0.45) { const sx = Math.round(lerp(4, 40, u / 0.45)); a_elipse(R, sx, 86, 4, 4, P.luzD); a_elipse(R, sx, 96, 7, 6, P.luzD); } R.recorte(null); rect(21, 80, 22, 101, P.blancoN); rect(18, 89, 26, 89, P.blancoN);
    for (let y = 78; y < 101; y += 3) if (Math.sin(t * 1.3 + y) > 0.85) pset(13 + ((y * 7) % 18), y, P.luzL); }
  { const tv = [P.teleA, P.teleB, P.teleC][Math.floor(t * 5 + Math.sin(t * 13) * 2) % 3 | 0]; rect(171, 96, 175, 100, tv); pset(171, 96, P.teleB); }
  // el humo de la chimenea (tenue, del tono del cielo)
  for (let p = 0; p < 7; p++) { const u = (t * 0.22 + p / 7) % 1; disco(Math.round(89 + u * 24 + Math.sin(t + p) * 2), Math.round(18 - u * 7), 1 + u * 3, u < 0.5 ? P.n5 : P.n4); }
  // la luz del porche con sus polillas
  for (let m = 0; m < 3; m++) { const a = t * (3 + m) + m * 2; pset(Math.round(97 + Math.cos(a) * (4 + m * 2)), Math.round(76 + Math.sin(a * 1.3) * (3 + m)), P.luzL); }
  // las hojas que caen del arce
  for (let k = 0; k < 6; k++) { const u = ((t * 0.12 + h(k, 1, 31)) % 1), x = Math.round(186 + h(k, 2, 31) * 56 + Math.sin(t * 2 + k) * 4 + u * 10), y = Math.round(84 + u * 72); pset(x, y, [P.hoja2, P.hoja3, P.hoja4][k % 3]); pset(x + (Math.sin(t * 4 + k) > 0 ? 1 : -1), y, P.hoja1); }
  // el columpio que se mece y la hierba que mueve el viento
  for (const [x0, f] of [[262, 0], [286, 1.7]]) { const a = Math.sin(t * 1.5 + f) * 0.16, x1 = x0 + Math.sin(a) * 38, y1 = 100 + Math.cos(a) * 38;
    linea(x0 - 5, 100, x1 - 5, y1, P.blancoNS); linea(x0 + 5, 100, x1 + 5, y1, P.blancoNS); rect(Math.round(x1) - 7, Math.round(y1), Math.round(x1) + 7, Math.round(y1) + 2, P.hierroS); rect(Math.round(x1) - 7, Math.round(y1), Math.round(x1) + 7, Math.round(y1), P.hierroL); }
  for (let k = 0; k < 46; k++) { const x = Math.floor(h(k, 1, 33) * 320), y = 166 + Math.floor(h(k, 2, 33) * 14), m = Math.round(Math.sin(t * 2.2 + x * 0.07) * 1.5); linea(x, y, x + m, y - 3, k % 3 ? P.ces3 : P.cesL); }
  return { suelo: 158, cielo: [0, 0, 319, 104], sputnik: sp, mesa: [168, 206, 138], porche: [58, 124, 136], escalones: [124, 142], valla: [140, 319, 112, 132], columpio: [262, 286] };
}

// el decorado fijo del patio (encima del cielo)
function a_patioMedio(R) {
  const P = a_P, { rect, pset, linea, disco, poligono } = R;
  // el bosque y las lomas a lo lejos, el poste del teléfono y sus cables
  for (let x = 0; x < 320; x++) { const top = Math.round(98 - a_vr(x / 9, 0, 21) * 9 - a_vr(x / 3, 0, 22) * 3); for (let y = top; y < 116; y++) pset(x, y, y < top + 2 ? P.sil2 : P.sil1); }
  // las casas vecinas, en silueta con sus ventanas
  for (const [x, w, al, k] of [[146, 40, 22, 0], [196, 30, 18, 1], [292, 34, 20, 2]]) {
    const base = 112, top = base - al; rect(x, top, x + w, base, P.sil2); poligono([[x - 3, top + 1], [x + w / 2, top - 11], [x + w + 3, top + 1]], P.sil1);
    linea(x - 3, top + 1, x + w / 2, top - 11, P.sil3); rect(x + w - 8, top - 12, x + w - 5, top - 4, P.sil1);
    for (let i = 0; i < 3; i++) { const vx = x + 4 + i * Math.floor((w - 8) / 3); if (k === 0 && i === 2) { rect(vx - 1, top + 5, vx + 5, top + 11, P.sil0); continue; } if (h(i, k, 23) < 0.6) { rect(vx, top + 6, vx + 3, top + 10, P.luzS); pset(vx, top + 6, P.luz); } else rect(vx, top + 6, vx + 3, top + 10, P.sil0); }
  }
  rect(139, 52, 141, 114, P.sil1); rect(132, 56, 148, 57, P.sil1); for (const x of [133, 147]) pset(x, 55, P.estA);
  for (const [x1, y1] of [[319, 64], [319, 70]]) for (let x = 141; x <= x1; x++) pset(x, Math.round(lerp(57, y1, (x - 141) / (x1 - 141)) + Math.sin((x - 141) / (x1 - 141) * Math.PI) * 6), P.sil3);
  // el arce de otoño (copa de cuatro tonos con hojas sueltas) detrás de la valla
  rect(208, 92, 213, 130, P.sil2); linea(210, 100, 196, 86, P.sil2); linea(211, 98, 228, 84, P.sil2);
  const COPA = [[212, 76, 26], [190, 84, 17], [234, 84, 17], [200, 64, 16], [224, 64, 16], [212, 54, 14], [184, 96, 11], [242, 98, 11]];
  for (const [x, y, r] of COPA) disco(x, y + 2, r, P.hoja0);
  for (const [x, y, r] of COPA) disco(x - 1, y, r * 0.86, P.hoja1);
  for (const [x, y, r] of COPA) disco(x - 3, y - 3, r * 0.55, P.hoja2);
  for (let k = 0; k < 500; k++) { const [x, y, r] = COPA[k % COPA.length], a = h(k, 4, 24) * 6.283, d = r * (0.95 + h(k, 5, 24) * 0.25), px = Math.round(x + Math.cos(a) * d), py = Math.round(y + Math.sin(a) * d); if (R.pget(px, py) === a_VACIO && h(k, 6, 24) < 0.6) { pset(px, py, Math.sin(a) < 0 ? P.hoja3 : P.hoja1); pset(px + 1, py + 1, P.hoja0); } }
  for (let k = 0; k < 900; k++) { const [x, y, r] = COPA[k % COPA.length], a = h(k, 1, 24) * 6.283, d = h(k, 2, 24) * r; const px = Math.round(x + Math.cos(a) * d), py = Math.round(y + Math.sin(a) * d); if (R.pget(px, py) === a_VACIO) continue; pset(px, py, d < r * 0.6 && Math.sin(a) < 0 ? P.hoja4 : h(k, 3, 24) < 0.5 ? P.hoja3 : P.hoja0); }
  // la valla blanca de estacas (luz de luna a la izquierda), con los arbustos al pie
  rect(140, 116, 319, 117, P.blancoNS); rect(140, 126, 319, 127, P.blancoNS);
  for (let x = 141; x < 320; x += 7) { const top = 110 + (h(x, 1, 25) < 0.15 ? 1 : 0); rect(x, top + 1, x + 3, 132, P.blancoN); rect(x + 3, top + 1, x + 3, 132, P.blancoNS); pset(x + 1, top, P.blancoN); pset(x + 2, top, P.blancoN); rect(x, 131, x + 3, 132, P.casaS); if (h(x, 2, 25) < 0.3) pset(x + 1, 118 + Math.floor(h(x, 3, 25) * 10), P.casaS); }
  for (let x = 140; x < 320; x++) { const top = Math.round(126 - a_vr(x / 6, 0, 26) * 7); for (let y = top; y < 134; y++) pset(x, y, y < top + 1 ? P.ces3 : (h(x, y, 26) < 0.2 ? P.ces3 : P.ces1)); }
  // el césped: rayas de cortacésped, briznas, hojas caídas, la luz de la ventana y del porche, las losas del camino
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const raya = Math.floor((x + y * 0.6) / 22) % 2, v = 0.38 + raya * 0.1 + (y - 132) / 48 * 0.12 + (a_vr(x / 5, y / 3, 27) - 0.5) * 0.3; pset(x, y, a_tono([P.ces0, P.ces1, P.ces2, P.ces3, P.cesL], v, x, y)); }
  for (let k = 0; k < 340; k++) { const x = Math.floor(h(k, 1, 28) * 320), y = 133 + Math.floor(h(k, 2, 28) * 46); pset(x, y, P.cesL); pset(x, y - 1, P.ces3); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 3, 28) * 320), y = 136 + Math.floor(h(k, 4, 28) * 42), c = [P.hoja2, P.hoja3, P.hoja4, P.hoja1][k % 4]; pset(x, y, c); pset(x + 1, y, c); if (k % 2) pset(x, y - 1, P.hoja1); }
  a_luz(R, 24, 150, 30, P.luzS, 0.35, 12); a_luz(R, 120, 146, 40, P.luzS, 0.4, 14);
  for (const [x, y] of [[150, 160], [172, 166], [196, 170], [224, 168], [252, 164]]) { a_elipse(R, x, y + 1, 8, 2.6, P.ces0); a_elipse(R, x, y, 8, 2.4, P.casaS); a_elipse(R, x - 1, y - 1, 5, 1.2, P.casa); }
  // el columpio (el armazón; los asientos se mecen en a_patio)
  for (const [xa, xb, xc] of [[232, 244, 256], [296, 304, 316]]) { linea(xa, 160, xb, 98, P.hierroS); linea(xa + 1, 160, xb + 1, 98, P.hierro); linea(xc, 160, xb, 98, P.hierroS); linea(xc - 1, 160, xb, 99, P.hierro); }
  rect(242, 97, 306, 99, P.hierro); rect(242, 97, 306, 97, P.hierroL); rect(242, 99, 306, 99, P.hierroS); for (const x of [257, 267, 281, 291]) { pset(x, 100, P.blancoNS); }
  // el triciclo rojo junto al porche
  disco(47, 156, 5, P.k); disco(47, 156, 3, P.tri); disco(47, 156, 1, P.blancoN); for (const x of [36, 58]) { disco(x, 158, 2.5, P.k); pset(x, 158, P.blancoNS); }
  linea(36, 156, 58, 156, P.triS); linea(47, 156, 47, 146, P.tri); rect(44, 145, 50, 146, P.k); linea(54, 156, 52, 150, P.tri); rect(50, 149, 55, 150, P.k);
  // LA CASA: el tejado de tejas, la chimenea de ladrillo y la antena de tele
  poligono([[-6, 60], [12, 30], [106, 30], [128, 60]], P.teja);
  for (let y = 31; y < 60; y++) { const x0 = Math.round(lerp(12, -6, (y - 30) / 30)), x1 = Math.round(lerp(106, 128, (y - 30) / 30)); for (let x = Math.max(0, x0); x <= x1; x++) { const fila = Math.floor((y - 30) / 4), j = (y - 30) % 4; let c = j === 0 ? P.tejaS : ((x + fila * 5) % 9 === 0 ? P.tejaS : P.teja); if (j === 1 && h(x, fila, 29) < 0.35) c = P.tejaL; pset(x, y, c); } }
  linea(12, 30, 106, 30, P.tejaL); linea(106, 30, 128, 60, P.tejaL);
  rect(84, 16, 95, 36, P.ladr); for (let y = 16; y < 36; y += 3) { rect(84, y, 95, y, P.ladrS); for (let x = 84 + ((y / 3) % 2) * 3; x < 96; x += 6) pset(x, y + 1, P.ladrS); } rect(84, 16, 84, 36, P.ladrL); rect(82, 15, 97, 16, P.casaD); rect(82, 15, 97, 15, P.casaS);
  rect(27, 17, 28, 31, P.sil3); for (const [y, w] of [[17, 8], [21, 6], [25, 4]]) { rect(28 - w, y, 28 + w, y, P.sil3); pset(28 - w, y + 1, P.sil3); pset(28 + w, y + 1, P.sil3); } linea(28, 22, 40, 30, P.sil2);
  // las paredes de tablas (luz arriba, sombra abajo) con la sombra del alero
  for (let y = 60; y < 138; y++) for (let x = 0; x < 124; x++) { const j = (y - 60) % 5; pset(x, y, j === 0 ? P.casaL : j === 4 ? P.casaS : (h(x >> 2, y, 30) < 0.08 ? P.casaS : P.casa)); }
  rect(0, 60, 124, 63, P.casaD); rect(0, 60, 128, 60, P.blancoNS); rect(0, 138, 124, 146, P.ladrS); for (let x = 2; x < 124; x += 8) rect(x, 139, x + 5, 145, P.ladr); rect(30, 141, 38, 144, P.k); for (let x = 31; x < 38; x += 2) rect(x, 141, x, 144, P.casaS);
  // la ventana de la cocina: marco blanco, contraventanas, cortinas de cuadros, el alféizar con una maceta
  rect(4, 74, 8, 104, P.casaD); rect(36, 74, 40, 104, P.casaD); for (let y = 75; y < 104; y += 3) { rect(4, y, 8, y, P.casaS); rect(36, y, 40, y, P.casaS); }
  rect(9, 74, 35, 104, P.blancoN); rect(11, 77, 33, 101, P.luz); for (let y = 77; y < 102; y++) for (let x = 11; x < 34; x++) if ((x + y) % 2 && y > 92) pset(x, y, P.luzS);
  for (const [x0, x1] of [[11, 17], [27, 33]]) for (let y = 77; y < 102; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x >> 1) + (y >> 1)) % 2 ? P.cortina : P.cortinaS);
  rect(11, 77, 33, 79, P.cortinaS); rect(21, 77, 22, 101, P.blancoN); rect(11, 89, 33, 89, P.blancoN); rect(7, 104, 37, 106, P.blancoN); rect(7, 106, 37, 106, P.blancoNS);
  rect(16, 100, 20, 103, P.ladrL); disco(18, 98, 2, P.ces3);
  // el porche: el techo, los postes blancos, la barandilla, la puerta mosquitera encendida, la mecedora y la bombilla
  rect(56, 64, 128, 69, P.blancoN); rect(56, 69, 128, 70, P.blancoNS); rect(56, 70, 124, 76, P.casaD);
  for (let y = 71; y < 138; y++) for (let x = 58; x < 124; x++) if (h(x, y, 31) < 0.5) pset(x, y, a_mez(R.pget(x, y), P.casaD, 0.35));
  rect(68, 86, 85, 134, P.blancoNS); rect(70, 88, 83, 134, P.luzD); rect(71, 90, 82, 108, P.luz); for (let y = 90; y < 134; y += 2) for (let x = 70; x < 84; x += 2) pset(x, y, P.luzS); rect(76, 88, 77, 134, P.blancoNS); pset(81, 112, P.latonL);
  a_luz(R, 96, 77, 22, P.luz, 0.55); disco(96, 76, 2, P.luzL); pset(96, 73, P.casaD);
  rect(100, 112, 101, 134, P.sil1); rect(112, 112, 113, 134, P.sil1); rect(100, 112, 113, 113, P.sil1); rect(99, 124, 114, 126, P.sil1); linea(98, 135, 115, 133, P.sil1);
  for (const x of [58, 90, 121]) { rect(x, 70, x + 3, 136, P.blancoN); rect(x + 3, 70, x + 3, 136, P.blancoNS); }
  rect(58, 117, 124, 118, P.blancoN); rect(58, 130, 124, 131, P.blancoNS); for (let x = 62; x < 121; x += 4) if (x < 90 || x > 93) rect(x, 119, x + 1, 129, x > 92 && x < 121 ? P.blancoNS : P.blancoN);
  rect(56, 134, 126, 138, P.casaS); for (let x = 56; x < 126; x += 6) pset(x, 135, P.casaD); rect(56, 134, 126, 134, P.casaL);
  // los escalones del porche y los arbustos al pie de la casa
  for (let s = 0; s < 4; s++) { const y = 138 + s * 5, x1 = 128 + s * 4; rect(124, y, x1, y + 4, P.casaS); rect(124, y, x1, y, P.casaL); }
  for (let x = 0; x < 56; x++) { const top = Math.round(140 - a_vr(x / 5, 2, 32) * 9); for (let y = top; y < 150; y++) pset(x, y, y === top ? P.ces3 : (h(x, y, 32) < 0.25 ? P.ces2 : P.ces1)); }
  // los botellines de leche junto a la puerta
  for (const x of [87, 90]) { rect(x, 128, x + 1, 133, P.blancoN); pset(x, 127, P.blancoNS); }
}

// la cámara 'cielo': mirando hacia arriba desde el patio
function a_patioCielo(R, t, o) {
  const P = a_P, { pset, disco, linea } = R;
  a_poner(R, a_capa(R, 'a-cielo-cielo', () => {
    a_cieloNoche(R, 0, 0, 319, 179, 13, { via: [[-20, 200], [250, -30], 26], fin: 260 });
    // la Osa Mayor, arriba a la izquierda
    for (const [x, y] of [[42, 42], [62, 38], [80, 44], [96, 52], [100, 70], [124, 72], [126, 56]]) { pset(x, y, P.est); pset(x - 1, y, P.estA); pset(x + 1, y, P.estA); pset(x, y - 1, P.estA); pset(x, y + 1, P.estA); }
  }));
  a_titila(R, t, 0, 0, 319, 150, 13, 44);
  [[1.2, 96, 90, 0], [2.4, 74, 60, 1], [3.6, 120, 50, 2]].forEach(([v, y, w, k]) => { const x = ((t * v + k * 150) % 440) - 60; a_nube(R, x, y, w, [P.nub0, P.nub1, P.nub2], k + 40); });
  a_fugaz(R, t, 7, 1, [210, 60], [250, 92]);
  let sp = null; if (o.sputnik != null) sp = a_sputnik(R, o.sputnik, t, [12, 150], [130, 30], [268, 62]);
  a_pegar(R, a_capa(R, 'a-cielo-medio', () => {
    // los cables del teléfono, el arce y los pinos en silueta, el tejado con la chimenea y la antena
    for (const [y0, y1, s] of [[150, 138, 9], [156, 146, 8]]) for (let x = 0; x < 320; x++) pset(x, Math.round(lerp(y0, y1, x / 319) + Math.sin(x / 319 * Math.PI) * s), P.sil3);
    const ARCE = [[10, 168, 34], [44, 150, 26], [74, 168, 24], [-6, 136, 22], [26, 128, 18], [56, 132, 16]];
    for (const [x, y, r] of ARCE) disco(x, y, r, P.sil1);
    for (let k = 0; k < 420; k++) { const [x, y, r] = ARCE[k % ARCE.length], a = h(k, 1, 41) * 6.283, d = r * (0.85 + h(k, 2, 41) * 0.2); const px = Math.round(x + Math.cos(a) * d), py = Math.round(y + Math.sin(a) * d); pset(px, py, P.sil1); if (Math.sin(a) < -0.3 && h(k, 3, 41) < 0.5) pset(px, py + 1, P.hoja1); }
    for (const [x, base, w, al] of [[262, 180, 34, 96], [300, 180, 28, 74], [236, 180, 22, 50]]) for (let j = 0; j < al; j++) { const y = base - j, piso = (j % 14) / 14, ww = w * (1 - j / al) * (0.6 + piso * 0.5); for (let i = -ww; i <= ww; i++) pset(Math.round(x + i), y, j % 14 === 0 ? P.sil2 : P.sil0); }
    R.poligono([[96, 180], [150, 158], [214, 180]], P.sil1); linea(96, 180, 150, 158, P.sil3); linea(150, 158, 214, 180, P.sil2);
    for (let y = 150; y < 168; y++) for (let x = 176; x < 186; x++) pset(x, y, (y % 3 === 0) ? P.sil1 : P.sil2);
    R.rect(150, 112, 151, 160, P.sil2); for (const [y, w] of [[112, 18], [118, 14], [124, 10], [130, 7]]) { R.rect(150 - w, y, 151 + w, y, P.sil2); pset(150 - w, y + 1, P.sil2); pset(151 + w, y + 1, P.sil2); }
    // el filo de las siluetas: la luz de las estrellas arriba y la del porche, cálida, en el arce
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); if (c === a_VACIO || R.pget(x, y - 1) !== a_VACIO) continue; pset(x, y, x < 110 ? P.hoja2 : P.sil3); if (x < 110 && h(x, y, 43) < 0.5) pset(x, y + 1, P.hoja1); }
    for (let k = 0; k < 160; k++) { const x = Math.floor(h(k, 1, 44) * 100), y = 150 + Math.floor(h(k, 2, 44) * 30); if (R.pget(x, y) !== a_VACIO) pset(x, y, h(k, 3, 44) < 0.5 ? P.hoja1 : P.hoja0); }
  }, true));
  // el humo de la chimenea, los murciélagos y las hojas que tiemblan en el borde de la copa
  for (let p = 0; p < 8; p++) { const u = (t * 0.2 + p / 8) % 1; disco(Math.round(181 + u * 16 + Math.sin(t + p) * 2), Math.round(148 - u * 30), 1.5 + u * 4, u < 0.5 ? P.n5 : P.n4); }
  for (let b = 0; b < 3; b++) { const u = ((t * 0.09 + b * 0.37) % 1), x = Math.round(lerp(-10, 330, u)), y = Math.round(118 + Math.sin(t * 2.3 + b * 2) * 10 + b * 6), al = Math.sin(t * 18 + b) > 0 ? -1 : 1; pset(x, y, P.sil0); pset(x - 1, y + al, P.sil0); pset(x + 1, y + al, P.sil0); pset(x - 2, y + al * 2, P.sil0); pset(x + 2, y + al * 2, P.sil0); }
  for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 1, 42) * 90), y = Math.round(118 + h(k, 2, 42) * 14 + Math.sin(t * 2 + k) * 1.2); if (Math.sin(t * 3 + k * 1.7) > 0) pset(x, y, P.hoja2); }
  return { suelo: null, cielo: [0, 0, 319, 140], sputnik: sp };
}

// la mesa de jardín de madera con la radio de onda corta (su dial brilla); o.pitido: la luz late y salen ondas
function a_patioDelante(R, t, o) {
  const P = a_P, { rect, pset, linea } = R;
  rect(166, 138, 208, 141, P.casaS); rect(166, 138, 208, 138, P.casaL); for (let x = 170; x < 208; x += 7) pset(x, 139, P.casaD);
  for (const x of [170, 203]) { rect(x, 142, x + 2, 160, P.casaD); rect(x, 142, x, 160, P.casaS); } linea(172, 150, 203, 150, P.casaD);
  R.rect(164, 160, 210, 161, P.ces0);
  if (o.radio !== false) {
    const rad = PIEZAS_DC.radioOnda; if (rad) rad(R, 186, 138, { t, encendida: !!o.pitido, s: 1 });
    a_luz(R, 186, 130, 16, P.luz, o.pitido ? 0.3 + 0.15 * Math.sin(t * 6) : 0.18);
    if (o.pitido) for (let w = 0; w < 3; w++) { const u = ((t * 1.3 + w / 3) % 1), r = 6 + u * 16; for (let a = -0.9; a <= 0.9; a += 0.12) if (u < 0.85) pset(Math.round(196 + Math.cos(a) * r), Math.round(128 + Math.sin(a) * r * 0.8), u < 0.4 ? P.luzL : P.luzS); }
  }
  return { tablero: 138 };
}

// ═══ despachoAF: el despacho de la Fuerza Aérea, 1957, de noche ═══
// los paneles de nogal con vetas verticales (de x0 a x1, tablas de w)
function a_nogal(R, x0, y0, x1, y1, w, k = 0, base = 0.5) {
  const P = a_P, T = [P.nog0, P.nog1, P.nog2, P.nog3, P.nog4, P.nog5];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = (x - x0) % w, tb = Math.floor((x - x0) / w);
    if (i === 0) { R.pset(x, y, P.nog0); continue; } if (i === 1) { R.pset(x, y, P.nog4); continue; }
    const veta = a_vr((x - x0) * 0.55 + tb * 17, y * 0.045 + Math.sin(x * 0.4 + tb) * 0.5, k + tb) * 0.7 + a_vr(x * 1.3, y * 0.2, k + 9) * 0.3;
    R.pset(x, y, a_tono(T, base + (veta - 0.5) * 0.55 + (i > w - 3 ? -0.15 : 0), x, y));
  }
}

function a_despacho(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  a_poner(R, a_capa(R, 'a-desp', () => a_despachoFijo(R)));
  // por la ventana: estrellas, la luz roja del obelisco, un avión y los coches que pasan
  const cl = [205, 47, 263, 105]; R.recorte(cl);
  a_titila(R, t, 205, 47, 263, 70, 61, 8);
  if (Math.floor(t * 1.1) % 2) { pset(216, 50, P.rojoN); pset(216, 49, P.rojoNL); }
  { const u = (t % 14) / 9; if (u < 1) { const x = Math.round(lerp(266, 200, u)), y = 54 + Math.round(u * 4); pset(x, y, P.estA); pset(x + 1, y, P.estA); if (Math.floor(t * 3) % 2) pset(x, y + 1, P.rojoN); else pset(x + 2, y, P.est); } }
  for (let c = 0; c < 3; c++) { const v = 10 + c * 6, u = ((t * v + c * 70) % 110) - 20, dir = c % 2 ? -1 : 1, x = dir > 0 ? 200 + u : 268 - u, y = 101 + (c % 2);
    a_rc(R, cl, x - 3, y - 1, x + 3, y, P.sil2); pset(x + 3 * dir, y, P.luzL); pset(x + 3 * dir, y - 1, P.luz); pset(x - 3 * dir, y, P.rojoN); }
  R.recorte(null);
  // el cordón de la persiana que se mece
  { const m = Math.round(Math.sin(t * 0.9) * 1.5); linea(262, 47, 262 + m, 72, P.persianaS); rect(261 + m, 72, 263 + m, 75, P.persiana); }
  // el reloj de pared con su segundero
  { const s = (Math.floor(t) / 60) * Math.PI * 2 - Math.PI / 2; linea(148, 32, Math.round(148 + Math.cos(s) * 6), Math.round(32 + Math.sin(s) * 6), P.rojoN); pset(148, 32, C.k); }
  // la maqueta de la Luna que gira en su pie y el globo terráqueo
  a_luna(R, 154, 79, 11, { fase: 0.35, lado: -1, rot: t * 0.25 }); for (let a = 0; a < 6.3; a += 0.05) pset(Math.round(154 + Math.cos(a) * 12), Math.round(79 + Math.sin(a) * 12), a > 3.4 && a < 5.2 ? P.latonL : P.latonS);
  a_globo(R, 188, 102, 9, t * 0.3);
  return { suelo: 160, sueloDetras: 133, mesa: [92, 228, 126], ventana: [200, 266, 22, 108], puerta: null, luna: [154, 79, 11], globo: [188, 102] };
}

// el globo terráqueo: océano con continentes que giran (rot), el meridiano de latón y su pie de tres patas
function a_globo(R, cx, cy, r, rot) {
  const P = a_P;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = (i * i + j * j) / (r * r); if (d2 > 1) continue; const z = Math.sqrt(1 - d2), lon = Math.atan2(i / r, z) + rot, lat = j / r;
    const tierra = a_vr(lon * 2.2 + 10, lat * 3, 51) > 0.55 && Math.abs(lat) < 0.85, luz = (-i - j) / r * 0.3 + z * 0.6;
    R.pset(cx + i, cy + j, tierra ? (luz > 0.45 ? P.mapaT : P.mapaTS) : (luz > 0.45 ? P.mapaM : P.mapaMS)); }
  for (let a = 0; a < 6.3; a += 0.04) R.pset(Math.round(cx + Math.cos(a) * (r + 2)), Math.round(cy + Math.sin(a) * (r + 2)), a > 3.6 && a < 5 ? P.latonL : P.laton);
}

function a_despachoFijo(R) {
  const P = a_P, { rect, pset, linea, disco, poligono } = R;
  // el techo de yeso y la moldura
  for (let y = 0; y < 8; y++) for (let x = 0; x < 320; x++) pset(x, y, a_tono([P.yesoS, P.yeso], 0.45 + y * 0.04, x, y));
  rect(0, 8, 319, 11, P.nog1); rect(0, 8, 319, 8, P.nog4); rect(0, 11, 319, 11, P.nog0);
  // los paneles de nogal, el zócalo de cuarterones, el rodapié y el suelo de parqué
  a_nogal(R, 0, 12, 319, 111, 20, 3);
  rect(0, 112, 319, 115, P.nog4); rect(0, 112, 319, 112, P.nog5); rect(0, 115, 319, 115, P.nog0);
  for (let x = 0; x < 320; x += 40) { a_nogal(R, x, 116, x + 39, 135, 40, 7, 0.38); rect(x + 4, 119, x + 35, 132, P.nog1); rect(x + 5, 120, x + 34, 131, P.nog2); rect(x + 4, 119, x + 35, 119, P.nog4); rect(x + 4, 119, x + 4, 132, P.nog4); rect(x + 35, 119, x + 35, 132, P.nog0); rect(x + 4, 132, x + 35, 132, P.nog0); }
  rect(0, 136, 319, 140, P.nog0); rect(0, 136, 319, 136, P.nog3);
  for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const b = Math.floor((x + (Math.floor(y / 6) % 2) * 12) / 24); pset(x, y, (x + (Math.floor(y / 6) % 2) * 12) % 24 === 0 || y % 6 === 0 ? P.nog0 : a_tono([P.nog1, P.nog2, P.nog3], 0.45 + (h(b, y >> 3, 8) - 0.5) * 0.5 + (a_vr(x * 0.4, y, 9) - 0.5) * 0.3, x, y)); }
  // la alfombra granate con su cenefa dorada y rombos
  for (let y = 148; y < 180; y++) for (let x = 14; x < 306; x++) {
    const bx = Math.min(x - 14, 305 - x), by = y - 148, borde = Math.min(bx, by);
    let c; if (borde < 2) c = P.alfS; else if (borde < 5) c = (x + y) % 4 === 0 ? P.alfB : P.latonS; else if (borde < 6) c = P.alfS;
    else { const dx = Math.abs(((x - 160) % 24 + 24) % 24 - 12), dy = Math.abs(((y - 148) % 16) - 8); c = Math.abs(dx / 12 + dy / 8 - 0.7) < 0.08 ? P.alfB : a_tono([P.alfS, P.alf, P.alfL], 0.5 + (a_vr(x / 4, y / 2, 10) - 0.5) * 0.4, x, y); }
    pset(x, y, c);
  }
  // los apliques de pared con su luz cálida
  for (const x of [54, 128]) { rect(x - 1, 40, x + 1, 46, P.latonS); rect(x - 3, 34, x + 3, 40, P.luzS); rect(x - 2, 35, x + 2, 39, P.luzL); rect(x - 3, 34, x + 3, 34, P.laton); a_luz(R, x, 38, 30, P.luz, 0.32, 36); }
  // las dos banderas sin letras en sus astas con remate dorado
  for (const x of [14, 40]) { rect(x, 26, x + 1, 138, P.latonS); rect(x, 26, x, 138, P.latonL); poligono([[x - 2, 25], [x + 0.5, 18], [x + 3, 25]], P.laton); pset(x, 20, P.latonL); disco(x + 0.5, 137, 3, P.latonS); }
  for (let y = 28; y < 92; y++) for (let x = 16; x < 33; x++) { const pl = Math.sin((x - 16) * 0.9) * 0.5 + 0.5, raya = Math.floor((y - 28) / 4) % 2; let c = raya ? P.bandB : P.band; if (x < 25 && y < 46) c = h(x, y, 11) < 0.12 && (x + y) % 2 ? P.bandB : P.bandA; if (pl < 0.3) c = c === P.band ? P.bandS : c === P.bandB ? P.bandBS : P.bandAS; pset(x, y + Math.round(Math.sin((y - 28) * 0.05) * 0) , c); }
  for (let y = 28; y < 92; y++) for (let x = 42; x < 58; x++) { const pl = Math.sin((x - 42) * 0.9 + 1) * 0.5 + 0.5; pset(x, y, pl < 0.3 ? P.fafS : P.faf); }
  poligono([[45, 54], [50, 50], [55, 54], [50, 62]], P.laton); rect(49, 50, 51, 60, P.latonL); linea(43, 52, 49, 56, P.laton); linea(57, 52, 51, 56, P.laton);
  for (let x = 16; x < 58; x++) if (x < 33 || x > 41) pset(x, 92 + (x % 2), P.laton);
  // el mapamundi con su marco, las chinchetas y el hilo rojo
  rect(64, 18, 126, 72, P.nog0); rect(65, 19, 125, 71, P.laton); rect(67, 21, 123, 69, P.mapaM);
  for (let y = 21; y <= 69; y++) for (let x = 67; x <= 123; x++) { if ((x - 67) % 8 === 0 || (y - 21) % 8 === 0) pset(x, y, P.mapaMS); }
  for (const pts of [[[70, 26], [86, 24], [90, 34], [80, 42], [74, 36]], [[80, 44], [86, 46], [84, 62], [80, 58]], [[96, 26], [104, 24], [102, 34], [96, 32]], [[97, 36], [106, 36], [104, 56], [98, 50]], [[104, 24], [122, 24], [122, 40], [110, 42], [104, 32]], [[114, 54], [121, 54], [120, 60], [114, 59]]]) { poligono(pts, P.mapaT); for (let i = 0; i < pts.length; i++) linea(pts[i][0], pts[i][1], pts[(i + 1) % pts.length][0], pts[(i + 1) % pts.length][1], P.mapaTS); }
  const PIN = [[80, 32, P.faf], [112, 30, P.rojoN], [102, 28, P.faf], [116, 36, P.rojoN], [86, 50, P.faf]];
  linea(80, 32, 112, 30, P.rojoN); linea(102, 28, 116, 36, P.rojoN); for (const [x, y, c] of PIN) { pset(x, y, c); pset(x, y - 1, C.blanco); pset(x + 1, y + 1, P.mapaMS); }
  // la foto enmarcada de un avión
  rect(84, 80, 120, 104, P.nog0); rect(85, 81, 119, 103, P.laton); rect(87, 83, 117, 101, P.cielo2); rect(87, 94, 117, 101, P.cielo3);
  a_nube(R, 96, 96, 14, [P.nubeS, P.nubeM, P.nubeL], 3); rect(94, 89, 112, 90, P.aceroS); poligono([[100, 89], [104, 84], [106, 84], [104, 89]], P.aceroS); poligono([[100, 90], [104, 95], [106, 95], [104, 90]], P.aceroS); rect(110, 86, 112, 89, P.aceroS);
  // el reloj de pared (el segundero va en a_despacho)
  disco(148, 32, 9, P.nog0); disco(148, 32, 8, P.laton); disco(148, 32, 7, P.bandB); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(148 + Math.cos(a) * 6), Math.round(32 + Math.sin(a) * 6), C.k); }
  linea(148, 32, 148, 27, C.k); linea(148, 32, 152, 33, C.k);
  // el aparador con la maqueta de la Luna (la esfera gira en a_despacho) y unas carpetas
  rect(130, 98, 180, 136, P.nog1); rect(130, 98, 180, 100, P.nog4); rect(130, 98, 180, 98, P.nog5);
  for (const x of [133, 156]) { rect(x, 103, x + 21, 132, P.nog2); rect(x, 103, x + 21, 103, P.nog4); rect(x, 103, x, 132, P.nog4); rect(x + 21, 103, x + 21, 132, P.nog0); rect(x + 2, 105, x + 19, 130, P.nog1); rect(x + (x < 150 ? 19 : 2), 116, x + (x < 150 ? 19 : 2), 120, P.latonL); }
  rect(146, 94, 162, 97, P.latonS); rect(147, 94, 161, 94, P.latonL); rect(153, 88, 155, 94, P.laton); rect(153, 88, 153, 94, P.latonL);
  rect(166, 90, 178, 97, P.carpeta); rect(167, 88, 177, 90, P.carpetaS); rect(166, 93, 178, 93, P.carpetaS); disco(174, 95, 1, P.band);
  // el globo terráqueo en su pie (la esfera gira en a_despacho)
  for (const [x1, y1] of [[180, 138], [196, 138], [188, 140]]) linea(188, 112, x1, y1, P.nog0); rect(187, 110, 189, 116, P.nog2);
  // LA VENTANA a Washington: el cielo, el obelisco, el Capitolio iluminado, los árboles, la calle con farolas
  a_cieloNoche(R, 205, 22, 263, 105, 61, { fin: 100 });
  for (let x = 205; x <= 263; x++) { const top = Math.round(86 - a_vr(x / 4, 0, 62) * 5); for (let y = top; y < 100; y++) pset(x, y, y < top + 1 ? P.sil3 : P.sil1); }
  rect(214, 52, 218, 90, P.blancoNS); rect(214, 52, 215, 90, P.blancoN); poligono([[214, 52], [216, 48], [218, 52]], P.blancoN); a_luz(R, 216, 70, 8, P.luz, 0.25, 22);
  // el Capitolio: alas bajas con ventanas, el tambor con columnas, la cúpula con nervios y la estatua
  rect(224, 82, 262, 96, P.blancoNS); rect(224, 82, 262, 83, P.blancoN); for (let x = 226; x < 262; x += 3) rect(x, 86, x, 93, P.luzS);
  rect(234, 72, 252, 82, P.blancoN); for (let x = 235; x < 252; x += 2) rect(x, 74, x, 81, P.blancoNS);
  for (let j = 0; j <= 12; j++) { const w = Math.round(9 * Math.sqrt(1 - (j / 12.5) ** 2)); rect(243 - w, 72 - j, 243 + w, 72 - j, j > 8 ? P.blancoNS : P.blancoN); }
  for (const dx of [-6, -3, 0, 3, 6]) linea(243 + dx, 72, 243 + Math.round(dx * 0.4), 62, P.blancoNS);
  rect(242, 56, 244, 60, P.blancoN); pset(243, 55, P.blancoN); a_luz(R, 243, 72, 26, P.luzL, 0.3, 18);
  rect(205, 100, 263, 105, P.sil2); for (const x of [210, 230, 250]) { rect(x, 92, x, 100, P.sil0); pset(x, 91, P.farol); a_luz(R, x, 92, 4, P.farol, 0.5); }
  // la persiana veneciana medio bajada, el marco de madera con su cruz, el alféizar y las cortinas con su galería
  for (let y = 22; y < 47; y++) for (let x = 205; x <= 263; x++) pset(x, y, (y - 22) % 3 === 2 ? P.persianaS : (y - 22) % 3 === 0 ? C.blanco : P.persiana);
  for (const x of [216, 252]) rect(x, 22, x, 46, P.persianaS); rect(205, 46, 263, 47, P.persianaS);
  rect(200, 20, 204, 108, P.nog1); rect(264, 20, 268, 108, P.nog1); rect(200, 20, 268, 21, P.nog1); rect(232, 22, 235, 106, P.nog1); rect(205, 72, 263, 74, P.nog1); rect(232, 22, 232, 106, P.nog4);
  rect(198, 106, 270, 110, P.nog3); rect(198, 106, 270, 106, P.nog5); rect(198, 110, 270, 110, P.nog0);
  for (const [x0, x1] of [[190, 202], [266, 276]]) for (let y = 18; y < 128; y++) for (let x = x0; x <= x1; x++) { const pl = Math.sin((x - x0) * 1.1) * 0.5 + 0.5; pset(x, y, pl > 0.75 ? P.drapL : pl < 0.25 ? P.drapS : P.drap); }
  rect(188, 14, 278, 22, P.drap); for (let x = 188; x <= 278; x++) { pset(x, 22 + Math.round(Math.abs(Math.sin((x - 188) / 15 * Math.PI)) * 2), P.drap); pset(x, 14, P.drapL); } rect(186, 13, 278, 13, P.laton);
  // los archivadores verdes de cuatro cajones con su bandeja de papeles
  rect(278, 54, 318, 138, P.archivoS); rect(279, 55, 317, 137, P.archivo); rect(279, 55, 317, 56, P.archivoL);
  for (let d = 0; d < 4; d++) { const y = 58 + d * 20; rect(281, y, 315, y + 17, P.archivoL); rect(282, y + 1, 315, y + 17, P.archivo); rect(281, y + 17, 315, y + 17, P.archivoS); rect(292, y + 4, 304, y + 7, P.bandB); rect(293, y + 10, 303, y + 11, P.metalL); rect(293, y + 12, 303, y + 12, P.metalS); }
  rect(282, 50, 314, 53, P.metalS); rect(284, 47, 312, 50, P.bandB); rect(284, 49, 312, 49, P.bandBS);
  // la sombra del aparador y el archivador en el suelo
  for (let x = 130; x < 182; x++) pset(x, 141, P.nog0); for (let x = 278; x < 320; x++) pset(x, 141, P.nog0);
}

// la mesa grande del despacho (delante de los personajes): tablero en y 126, frente de cuarterones, el teléfono negro, la
// lámpara verde de banquero, el cenicero que humea, la bandeja, la carpeta y las banderitas
function a_despachoDelante(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  rect(90, 125, 230, 133, P.nog3); rect(90, 125, 230, 125, P.nog5); rect(90, 133, 230, 133, P.nog0);
  for (let x = 92; x < 229; x++) if (h(x, 1, 71) < 0.3) pset(x, 128 + Math.floor(h(x, 2, 71) * 4), P.nog2);
  a_nogal(R, 94, 134, 226, 172, 44, 72, 0.42);
  for (let x = 98; x < 226; x += 44) { rect(x, 138, x + 36, 168, P.nog1); rect(x + 1, 139, x + 35, 167, P.nog2); rect(x, 138, x + 36, 138, P.nog4); rect(x, 138, x, 168, P.nog4); rect(x + 36, 138, x + 36, 168, P.nog0); rect(x, 168, x + 36, 168, P.nog0); }
  rect(94, 172, 226, 175, P.nog0); rect(176, 154, 182, 155, P.latonL);
  // encima: la bandeja de papeles, la carpeta con el sello, el teléfono, el cenicero y la lámpara
  rect(112, 120, 132, 124, P.nog1); rect(113, 119, 131, 121, P.bandB); rect(113, 121, 131, 121, P.bandBS);
  rect(140, 122, 160, 124, P.carpeta); rect(140, 124, 160, 124, P.carpetaS); disco(154, 123, 1.5, P.selloR);
  rect(98, 118, 110, 124, C.k); rect(99, 117, 109, 118, P.arch2); rect(96, 114, 112, 116, C.k); rect(97, 113, 111, 113, P.arch2); disco(104, 121, 2, P.arch2); pset(104, 121, P.bandB);
  rect(176, 122, 186, 124, P.metalS); rect(177, 121, 185, 121, P.metalL); rect(183, 120, 190, 121, P.cartonS); pset(190, 120, P.rojoN);
  for (let p = 0; p < 6; p++) { const u = (t * 0.35 + p / 6) % 1, x = Math.round(190 + Math.sin(t * 1.5 + p * 1.3) * 2 + u * 6), y = Math.round(118 - u * 22); pset(x, y, u < 0.5 ? P.polvo : P.red1); if (u < 0.6) pset(x + 1, y, P.red1); }
  rect(212, 118, 214, 124, P.latonS); rect(206, 124, 220, 124, P.laton); for (let j = 0; j < 6; j++) rect(205 + j, 108 + j, 221 - j, 108 + j, j < 1 ? P.esmalteL : P.esmalte); rect(204, 114, 222, 115, P.esmalteL); rect(207, 116, 219, 116, P.luz);
  a_luz(R, 213, 122, 22, P.luz, 0.3, 6);
  rect(162, 114, 162, 124, P.latonS); rect(163, 114, 168, 117, P.band); rect(163, 116, 168, 116, P.bandB);
  return { tablero: 126 };
}

// la cámara 'mesa': el inserto de la mesa del despacho
function a_despachoMesa(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  a_poner(R, a_capa(R, 'a-despMesa', () => {
    // detrás, desenfocado: los paneles, la ventana con la persiana y el Capitolio, la bandera y la luz de un aplique
    a_nogal(R, 0, 0, 319, 94, 26, 81, 0.36);
    for (let y = 8; y < 80; y++) for (let x = 196; x < 262; x++) pset(x, y, y < 30 ? ((y % 3) ? P.persiana : P.persianaS) : a_tono([P.n2, P.n3, P.n4], (y - 30) / 60, x, y));
    for (let j = 0; j < 10; j++) { const w = Math.round(12 * Math.sqrt(1 - (j / 10.5) ** 2)); rect(232 - w, 72 - j, 232 + w, 72 - j, P.blancoNS); } rect(214, 72, 250, 79, P.blancoNS); a_luz(R, 232, 70, 24, P.luz, 0.35, 14);
    rect(192, 6, 196, 94, P.nog1); rect(262, 6, 266, 94, P.nog1); rect(196, 44, 262, 46, P.nog1);
    for (let y = 0; y < 94; y++) for (let x = 0; x < 22; x++) pset(x, y, Math.floor(y / 6) % 2 ? P.bandB : P.band);
    a_luz(R, 150, 20, 60, P.luz, 0.28, 40);
    // el tablero de nogal pulido, con el reflejo de la lámpara y el cartapacio verde con cantos dorados
    for (let y = 95; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, a_tono([P.nog1, P.nog2, P.nog3, P.nog4], 0.42 + (a_vr(x * 0.03, y * 0.6, 82) - 0.5) * 0.6 + (a_vr(x * 0.1, y * 1.5, 83) - 0.5) * 0.2, x, y));
    rect(0, 94, 319, 95, P.nog5); rect(0, 96, 319, 96, P.nog0);
    for (let y = 100; y < 108; y++) for (let x = 0; x < 320; x++) if ((x + y * 3) % 7 === 0) pset(x, y, P.nog5);
    for (let y = 122; y < 180; y++) for (let x = 92; x < 300; x++) pset(x, y, (x === 92 || x === 299 || y === 122) ? P.laton : (x < 96 || x > 295 || y < 126) ? a_mez(P.esmalte, C.k, 0.4) : a_tono([P.esmalte, P.esmalteL], 0.3 + (a_vr(x / 8, y / 8, 84) - 0.5) * 0.5, x, y));
    a_luz(R, 230, 150, 70, P.luz, 0.25, 34);
    // el pie de latón de la maqueta, el cohete de juguete y el teléfono negro de disco
    a_elipse(R, 64, 118, 20, 5, P.latonS); a_elipse(R, 64, 117, 19, 4, P.laton); a_elipse(R, 60, 116, 10, 2, P.latonL); rect(62, 92, 66, 116, P.latonS); rect(62, 92, 63, 116, P.latonL);
    for (let a = 0; a < 6.3; a += 0.02) { const x = Math.round(64 + Math.cos(a) * 33), y = Math.round(60 + Math.sin(a) * 33); if (Math.cos(a) < 0.2) { pset(x, y, P.latonS); pset(x + 1, y, a > 2.4 && a < 3.6 ? P.latonL : P.laton); } }
    // el cohete de juguete en su soporte (blanco con cuadros negros, aletas rojas)
    const cx = 128; for (let y = 64; y < 112; y++) { const w = y < 76 ? Math.round((y - 64) * 0.45) : 6; rect(cx - w, y, cx + w, y, y < 70 ? P.band : (Math.floor((y - 76) / 8) + (y > 76 ? 0 : 1)) % 2 ? P.telL : P.tel); rect(cx + Math.max(0, w - 2), y, cx + w, y, P.telS); }
    for (let y = 80; y < 92; y += 1) { rect(cx - 6, y, cx - 1, y, ((Math.floor((y - 76) / 8)) % 2) ? C.k : P.telL); }
    for (const s of [-1, 1]) R.poligono([[cx + 6 * s, 98], [cx + 13 * s, 112], [cx + 6 * s, 112]], P.band); rect(cx - 2, 104, cx + 2, 114, P.bandS);
    rect(cx - 12, 114, cx + 12, 117, P.nog0); rect(cx - 12, 114, cx + 12, 114, P.nog4);
    // el teléfono negro: el aparato, el disco con sus agujeros y el auricular
    a_elipse(R, 290, 128, 24, 9, C.k); rect(268, 112, 312, 128, C.k); rect(270, 113, 310, 114, P.arch2);
    disco(290, 122, 8, P.arch1); disco(290, 122, 7, C.k); for (let k = 0; k < 10; k++) { const a = -2.2 + k * 0.48; disco(Math.round(290 + Math.cos(a) * 5), Math.round(122 + Math.sin(a) * 5), 1, P.arch2); } disco(290, 122, 2, P.bandB);
    rect(266, 104, 314, 108, C.k); rect(268, 103, 312, 103, P.arch2); for (const x of [264, 310]) { rect(x, 102, x + 6, 110, C.k); rect(x + 1, 102, x + 5, 102, P.arch2); }
    // las gafas de pasta plegadas y el lápiz
    for (const x of [214, 232]) { for (let a = 0; a < 6.3; a += 0.1) pset(Math.round(x + Math.cos(a) * 8), Math.round(160 + Math.sin(a) * 5), C.k); a_elipse(R, x, 160, 6, 3, a_mez(P.esmalte, P.ojo, 0.35)); pset(x - 3, 158, C.blanco); pset(x - 2, 158, C.blanco); }
    rect(222, 157, 224, 158, C.k); linea(206, 156, 196, 150, C.k); linea(240, 156, 252, 150, C.k);
    linea(102, 168, 140, 160, P.amarillo); linea(102, 169, 140, 161, P.amarilloS); pset(101, 169, C.k);
    // el cenicero de cristal y la taza de café
    a_elipse(R, 270, 160, 18, 7, P.metalS); a_elipse(R, 270, 159, 17, 6, P.ojo); a_elipse(R, 270, 159, 12, 4, P.redS); rect(256, 152, 280, 156, P.cartonS); rect(256, 152, 280, 152, P.cartonL); rect(280, 152, 283, 156, P.polvo);
    a_elipse(R, 30, 160, 14, 5, C.blanco); rect(16, 140, 44, 160, C.blanco); rect(40, 140, 44, 160, P.bandBS); a_elipse(R, 30, 140, 14, 4, P.bandBS); a_elipse(R, 30, 141, 12, 3, P.maderaD); for (let y = 146; y < 156; y++) { pset(46, y, C.blanco); pset(50, y, P.bandBS); } rect(46, 145, 50, 146, C.blanco); rect(46, 156, 50, 157, P.bandBS);
  }));
  // la maqueta de la Luna que gira, la carpeta con el sello, el humo del puro y del café
  a_luna(R, 64, 60, 30, { fase: 0.45, lado: -1, rot: t * 0.2 });
  const carp = PIEZAS_DC.carpeta; if (carp) carp(R, 176, 160, { s: 3, dibujo: 'luna' });
  for (let p = 0; p < 8; p++) { const u = (t * 0.28 + p / 8) % 1, x = Math.round(284 + Math.sin(t * 1.2 + p * 1.7) * 3 * u + u * 8), y = Math.round(150 - u * 64); disco(x, y, 1 + u * 2, u < 0.5 ? P.polvo : P.red1); }
  for (let p = 0; p < 5; p++) { const u = (t * 0.4 + p / 5) % 1, x = Math.round(30 + Math.sin(t * 2 + p) * 3), y = Math.round(134 - u * 34); if (u < 0.8) { pset(x, y, P.red2); pset(x + 1, y - 1, P.red1); } }
  return { suelo: null, mesa: [0, 319, 96], carpeta: [176, 160], luna: [64, 60, 30], telefono: [290, 120], cohete: [128, 64, 116] };
}

// ═══ laboratorio: la Armour Research Foundation, Chicago, 1958, de día ═══
// la superficie de una pizarra con sus borrones de tiza (tramada en cuatro verdes)
function a_pizarra(R, x0, y0, x1, y1, k) {
  const P = a_P, T = [P.piz0, P.piz1, P.piz2, P.piz3];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const b = a_vr(x / 14, y / 6, k), r = Math.abs(Math.sin((x * 0.09 + y * 0.05) + a_vr(x / 30, y / 30, k + 1) * 6)); R.pset(x, y, a_tono(T, 0.3 + (b - 0.5) * 0.5 + (r > 0.92 ? 0.25 : 0), x, y)); }
}

// la Luna dibujada con tiza: el contorno a trazos, los mares rayados, los cráteres en círculo, la línea del día y la
// noche (x del terminador: cx + r * term) y la cara de noche rayada en diagonal; lo pinta todo con la tiza «c»
function a_lunaTiza(R, cx, cy, r, term, c = a_P.tiza, cs = a_P.tizaS) {
  const { pset } = R;
  for (let a = 0; a < 6.283; a += 0.6 / r) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r); if (h(Math.round(a * 40), 1, 91) > 0.08) { pset(x, y, c); if (h(Math.round(a * 40), 2, 91) > 0.5) pset(x + (Math.cos(a) > 0 ? -1 : 1), y, cs); } }
  for (let j = -r + 1; j < r; j++) { const w = Math.sqrt(r * r - j * j), xt = cx + term * w; for (let x = Math.round(xt); x < cx + w - 1; x++) if ((x + j * 1 + 400) % 4 === 0 && h(x, j, 92) > 0.15) pset(x, cy + j, cs); pset(Math.round(xt), cy + j, h(j, 3, 92) > 0.2 ? c : cs); }
  for (const [mx, my, rx, ry] of a_MARES.slice(0, 9)) for (let j = -ry * r; j <= ry * r; j++) for (let i = -rx * r; i <= rx * r; i++) { const x = Math.round(cx + mx * r + i), y = Math.round(cy + my * r * 0.9 + j); if ((i / rx) ** 2 + (j / ry) ** 2 > r * r * 0.8 || (x - y + 400) % 3) continue; if (Math.hypot(x - cx, y - cy) < r - 2 && x < cx + Math.sqrt(Math.max(0, r * r - (y - cy) ** 2)) * term) pset(x, y, cs); }
  for (const [kx, ky, rr] of a_CRATERES.slice(0, 18)) { const R0 = Math.max(1.5, rr * r * 1.3); for (let a = 0; a < 6.283; a += 0.9 / R0) { const x = Math.round(cx + kx * r + Math.cos(a) * R0), y = Math.round(cy + ky * r + Math.sin(a) * R0); if (Math.hypot(x - cx, y - cy) < r - 1) pset(x, y, Math.sin(a) > 0 ? cs : c); } }
}

// la nube de polvo de tiza que sube en el terminador hasta la luz del Sol y brilla (u 0–1); nada de explosión: tiza y brillo
function a_nubeTiza(R, x, y, r, u, t, lado = -1) {
  const P = a_P, { pset } = R; if (u <= 0) return; const rr = r * Math.min(1, u * 1.1);
  for (let a = Math.PI; a <= Math.PI * 2; a += 0.5 / Math.max(2, rr)) for (let s = 0; s < 3; s++) { const q = rr * (0.55 + s * 0.22) * (0.85 + a_vr(a * 3, s, 93) * 0.3), px = Math.round(x + Math.cos(a) * q), py = Math.round(y + Math.sin(a) * q * 0.9); const alSol = Math.cos(a) * lado > 0.1; if (h(px, py, 94) < 0.7) pset(px, py, alSol ? (s === 2 ? P.tizaA : P.tiza) : P.tizaS); }
  for (let j = -rr; j <= 0; j++) for (let i = -rr; i <= rr; i++) { const d = Math.hypot(i, j / 0.9); if (d > rr * 0.95) continue; const alSol = i * lado > -rr * 0.2; if ((i + j * 2 + 200) % (alSol ? 3 : 5) === 0 && h(x + i, y + j, 95) < 0.8) pset(x + i, y + j, alSol ? (d < rr * 0.5 ? P.tizaA : P.tiza) : P.tizaS); }
  if (u > 0.3) for (let k = 0; k < 7; k++) { const a = Math.PI + 0.3 + k * 0.4, q = rr * 1.25, ph = Math.sin(t * 5 + k * 2); if (ph > 0.2 && Math.cos(a) * lado > 0) { const px = Math.round(x + Math.cos(a) * q), py = Math.round(y + Math.sin(a) * q); pset(px, py, P.tizaA); if (ph > 0.75) { pset(px - 1, py, P.tizaA); pset(px + 1, py, P.tizaA); pset(px, py - 1, P.tizaA); pset(px, py + 1, P.tizaA); } } }
}

function a_lab(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  a_poner(R, a_capa(R, 'a-lab', () => a_labFijo(R)));
  // por la ventana: las nubes a tres velocidades, el tren elevado que pasa y las palomas en el alféizar
  const cl = [214, 30, 268, 98]; R.recorte([214, 30, 268, 43]);
  [[2, 37, 16, 0], [3.4, 40, 11, 1], [5, 34, 9, 2]].forEach(([v, y, w, k]) => a_nube(R, 200 + ((t * v + k * 30) % 110), y, w, [P.nubeS, P.nubeM, P.nubeL], k + 50));
  R.recorte(cl); if (Math.floor(t * 0.9) % 2) pset(262, 28 + 0, P.rojoN);
  { const u = ((t * 0.08) % 1), x = Math.round(lerp(214, 270, u)), y = Math.round(36 + Math.sin(t * 2) * 2), al = Math.sin(t * 14) > 0 ? -1 : 1; pset(x, y, P.arch1); pset(x - 1, y + al, P.arch1); pset(x + 1, y + al, P.arch1); }
  { const u = ((t + 3) % 12) / 4; if (u < 1) { const x0 = Math.round(lerp(274, 150, u)); for (let c = 0; c < 3; c++) { const x = x0 + c * 22; a_rc(R, cl, x, 63, x + 20, 74, P.tren); a_rc(R, cl, x, 63, x + 20, 63, P.trenL); a_rc(R, cl, x, 69, x + 20, 70, P.trenC); for (let w = x + 2; w < x + 19; w += 5) a_rc(R, cl, w, 65, w + 2, 67, P.cielo4); a_rc(R, cl, x + 20, 66, x + 21, 72, C.k); } }
    for (let x = 214; x <= 268; x += 4) { pset(x, 75, P.aceroS); pset(x + 2, 75, P.aceroL); } }
  R.recorte(null);
  for (const [x, f] of [[230, 0], [244, 2.1]]) { const pas = Math.round(Math.sin(t * 0.7 + f) * 3), pic = Math.sin(t * 3 + f) > 0.7 ? 1 : 0; const X = x + pas; rect(X, 99, X + 4, 101, P.red1); rect(X + 4, 98 + pic, X + 5, 99 + pic, P.red0); pset(X + 5, 98 + pic, C.k); pset(X + 6, 99 + pic, P.naranja); rect(X - 1, 100, X, 100, P.redS); pset(X + 2, 102, P.naranja); }
  // el osciloscopio con su onda verde, la aguja del Geiger, el vapor del café, el ventilador y el reloj
  for (let i = -6; i <= 6; i++) { const y = Math.round(96 + Math.sin(i * 0.9 + t * 6) * 3 * Math.cos(t * 0.7)); pset(224 + i, y, P.osciloL); }
  { const a = -2.4 + 0.8 + Math.sin(t * 2.3) * 0.3 + (h(Math.floor(t * 8), 1, 95) - 0.5) * 0.4; linea(248, 104, Math.round(248 + Math.cos(a) * 5), Math.round(104 + Math.sin(a) * 5), C.k); if (h(Math.floor(t * 6), 2, 95) > 0.7) pset(253, 99, P.rojoN); }
  for (let p = 0; p < 5; p++) { const u = (t * 0.45 + p / 5) % 1, x = Math.round(287 + Math.sin(t * 2 + p) * 2), y = Math.round(92 - u * 22); if (u < 0.8) pset(x, y, P.yesoL); }
  { const a = t * 18; for (let k = 0; k < 3; k++) { const b = a + k * 2.094; linea(305, 96, Math.round(305 + Math.cos(b) * 6), Math.round(96 + Math.sin(b) * 6), P.aceroL); } pset(305, 96, C.k); }
  { const s = (Math.floor(t) / 60) * Math.PI * 2 - Math.PI / 2; linea(196, 22, Math.round(196 + Math.cos(s) * 5), Math.round(22 + Math.sin(s) * 5), P.rojoN); }
  // la nube de polvo de tiza que crece en la Luna de la pizarra pequeña
  if (o.nube) a_nubeTiza(R, 182, 53, 12, o.nube, t, -1);
  // el polvo que flota en el haz de la ventana
  for (let k = 0; k < 10; k++) { const u = (t * 0.05 + h(k, 1, 96)) % 1, x = Math.round(150 + h(k, 2, 96) * 80 - u * 30), y = Math.round(100 + u * 50 + Math.sin(t + k) * 3); if (h(x >> 2, y >> 2, 97) < 0.8) pset(x, y, P.linL); }
  return { suelo: 158, sueloDetras: 147, pizarras: [[6, 146, 32, 128], [150, 204, 32, 128]], lunaPizarra: [180, 64, 18], ventana: [210, 272, 26, 102], banco: [186, 319, 140], bancoFondo: [206, 319, 106] };
}

function a_labFijo(R) {
  const P = a_P, { rect, pset, linea, disco, poligono } = R;
  // el techo de placas acústicas, la viga y las tres lámparas colgantes de esmalte con su luz
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 20 === 0 || y === 6) ? P.yesoS : ((x * 3 + y * 7) % 11 === 0 ? P.yesoS : a_tono([P.yesoS, P.yeso, P.yesoL], 0.55 - y * 0.01, x, y)));
  rect(0, 14, 319, 17, P.aceroS); rect(0, 14, 319, 14, P.aceroL);
  // la pared de yeso con manchas, y abajo el zócalo de azulejo verde
  for (let y = 18; y < 132; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 118 ? a_tono([P.yesoS, P.yeso, P.yesoL], 0.5 + (a_vr(x / 18, y / 12, 98) - 0.5) * 0.35, x, y) : ((y - 118) % 5 === 0 || x % 8 === 0) ? P.verdePS : P.verdeP);
  // la pizarra grande: la trayectoria Tierra–Luna, flechas y cuentas
  rect(4, 30, 148, 128, P.maderaS); rect(5, 31, 147, 127, P.madera); a_pizarra(R, 8, 34, 144, 124, 99);
  const tz = [P.tiza, P.tizaS];
  disco(24, 104, 9, P.piz2); for (let a = 0; a < 6.3; a += 0.12) pset(Math.round(24 + Math.cos(a) * 9), Math.round(104 + Math.sin(a) * 9), P.tiza); for (let k = 0; k < 14; k++) pset(19 + Math.floor(h(k, 1, 99) * 10), 100 + Math.floor(h(k, 2, 99) * 8), P.tizaZ);
  for (let i = 0; i <= 40; i++) { const u = i / 40, x = Math.round(lerp(32, 118, u)), y = Math.round(lerp(98, 52, u) - Math.sin(u * Math.PI) * 26); if (i % 2 === 0) pset(x, y, P.tiza); }
  a_lunaTiza(R, 124, 48, 9, 0.1);
  linea(112, 64, 120, 58, P.tiza); pset(119, 58, P.tiza); pset(120, 59, P.tiza);
  a_dig(R, '384000', 46, 112, P.tiza); a_dig(R, '=', 72, 112, P.tizaS); a_dig(R, '2.5', 78, 112, P.tizaA);
  a_dig(R, '1958', 12, 38, P.tiza); a_dig(R, 'x', 30, 38, P.tizaS); a_dig(R, '3', 36, 38, P.tiza);
  for (let r = 0; r < 4; r++) { const y = 48 + r * 9; a_dig(R, ['2x3=6', '9.8/2', '17+4', '-1.6'][r], 44 + (r % 2) * 6, y, r === 2 ? P.tizaA : P.tiza, 1, 0.12); }
  linea(80, 84, 98, 84, P.tiza); linea(80, 86, 98, 86, P.tiza); a_dig(R, '?', 100, 82, P.tizaR);
  for (let k = 0; k < 18; k++) { const x = 10 + Math.floor(h(k, 3, 99) * 130), y = 36 + Math.floor(h(k, 4, 99) * 86); pset(x, y, P.piz3); pset(x + 1, y, P.piz3); }
  // la pizarra pequeña: la Luna con la línea del día y la noche (la nube la añade a_lab)
  rect(148, 30, 206, 128, P.maderaS); rect(149, 31, 205, 127, P.madera); a_pizarra(R, 152, 34, 202, 124, 100);
  a_lunaTiza(R, 180, 64, 18, 0.15);
  a_dig(R, '0.5', 158, 96, P.tiza); a_dig(R, '+', 172, 96, P.tizaS); a_dig(R, '9', 178, 96, P.tizaA); linea(158, 104, 198, 104, P.tiza); a_dig(R, '10^3', 162, 108, P.tiza, 1, 0.1);
  // las repisas con sus tizas y borradores
  for (const [x0, x1] of [[4, 148], [148, 206]]) { rect(x0, 128, x1, 131, P.maderaL); rect(x0, 131, x1, 131, P.maderaS); }
  for (const [x, c] of [[30, P.tiza], [36, P.tizaA], [170, P.tiza], [190, P.tizaR]]) rect(x, 126, x + 4, 127, c);
  for (const x of [60, 176]) { rect(x, 124, x + 10, 127, P.maderaL); rect(x, 126, x + 10, 127, P.alfS); }
  // la ventana de fábrica: el cielo, los edificios de ladrillo, el depósito de agua, la vía del tren elevado
  a_cieloDia(R, 214, 30, 268, 98, 101);
  for (const [x, w, top, c] of [[214, 18, 50, P.ladC], [234, 16, 56, P.ladCS], [252, 18, 44, P.ladC]]) { rect(x, top, x + w, 98, c); for (let y = top + 3; y < 96; y += 5) for (let i = 2; i < w - 2; i += 4) rect(x + i, y, x + i + 1, y + 2, h(i, y, 102) < 0.3 ? P.cielo4 : P.aceroS); rect(x, top, x + w, top, P.ladCL); }
  rect(258, 34, 266, 42, P.maderaS); poligono([[257, 34], [262, 29], [267, 34]], P.maderaD); for (let x = 258; x < 267; x += 2) rect(x, 34, x, 42, P.madera); for (const x of [259, 265]) rect(x, 42, x, 44, C.k);
  rect(214, 75, 268, 78, P.acero); rect(214, 75, 268, 75, P.aceroL); for (let x = 216; x <= 268; x += 12) { rect(x, 78, x + 1, 98, P.aceroS); linea(x + 1, 79, x + 7, 85, P.aceroS); }
  // el marco de acero de muchos cristales, con uno abatible abierto
  rect(210, 26, 272, 102, P.aceroS); for (let x = 214; x <= 268; x += 14) rect(x - 1, 26, x, 102, P.aceroS); for (let y = 30; y <= 98; y += 17) rect(210, y - 1, 272, y, P.aceroS);
  rect(210, 26, 272, 29, P.acero); rect(210, 99, 272, 102, P.acero); rect(210, 26, 213, 102, P.acero); rect(269, 26, 272, 102, P.acero);
  for (let y = 47; y < 63; y++) for (let x = 242; x < 254; x++) if ((x + y) % 3 === 0) pset(x, y, P.cielo4);
  for (let y = 30; y < 98; y++) for (let x = 214; x < 268; x++) if ((x - y + 300) % 23 === 0 && R.pget(x, y) !== P.aceroS) pset(x, y, P.cielo4);
  rect(206, 102, 276, 106, P.yesoL); rect(206, 106, 276, 106, P.yesoS);
  // el banco del fondo: encimera negra, armarios, el osciloscopio, el Geiger, matraces, la cafetera y el ventilador
  rect(206, 106, 319, 110, C.k); rect(206, 106, 319, 106, P.arch3);
  for (let x = 208; x < 318; x += 22) { rect(x, 111, x + 20, 132, P.esmalte); rect(x, 111, x + 20, 111, P.esmalteL); rect(x, 111, x, 132, P.esmalteL); rect(x + 9, 116, x + 11, 117, P.metalL); }
  rect(212, 86, 236, 105, P.aceroS); rect(213, 87, 235, 104, P.acero); disco(224, 96, 7, C.k); disco(224, 96, 6, P.oscilo); for (let i = -5; i <= 5; i += 2) { pset(224 + i, 96, a_mez(P.oscilo, P.osciloL, 0.3)); pset(224, 96 + i, a_mez(P.oscilo, P.osciloL, 0.3)); } for (const y of [90, 95, 100]) disco(233, y, 1, P.metalL);
  rect(240, 96, 256, 105, P.geigerS); rect(241, 97, 255, 104, P.geiger); rect(243, 98, 253, 103, C.blanco); linea(256, 100, 262, 104, C.k); rect(260, 103, 266, 105, P.metalS);
  for (const [x, c] of [[268, P.tizaZ], [276, P.tizaA]]) { rect(x, 98, x + 4, 105, P.ojo); rect(x + 1, 101, x + 3, 104, c); rect(x + 1, 94, x + 3, 98, P.ojo); }
  rect(282, 92, 292, 105, P.metalL); rect(283, 92, 284, 105, C.blanco); rect(282, 90, 292, 92, P.metalS); rect(286, 88, 288, 90, C.k); linea(292, 96, 295, 100, C.k);
  disco(305, 96, 8, P.aceroS); disco(305, 96, 7, P.aceroL); for (let a = 0; a < 6.3; a += 0.4) pset(Math.round(305 + Math.cos(a) * 7), Math.round(96 + Math.sin(a) * 7), C.k); rect(304, 104, 306, 105, P.aceroS);
  // la estantería sobre el banco con libros sin letras y una caja de diapositivas
  rect(276, 60, 318, 62, P.maderaL); rect(276, 62, 318, 62, P.maderaS); for (let x = 278; x < 316; x += 3) { const c = [P.band, P.faf, P.esmalte, P.geiger, P.carpetaS][Math.floor(h(x, 1, 103) * 5)]; rect(x, 48 + Math.floor(h(x, 2, 103) * 4), x + 2, 59, c); pset(x, 52, P.yesoL); }
  // el reloj de pared (el segundero lo mueve a_lab)
  disco(196, 22, 7, C.k); disco(196, 22, 6, C.blanco); for (let k = 0; k < 4; k++) pset(196 + [0, 5, 0, -5][k], 22 + [-5, 0, 5, 0][k], C.k); linea(196, 22, 196, 18, C.k); linea(196, 22, 199, 22, C.k);
  // las lámparas colgantes de esmalte verde, con su luz sobre la pared y el suelo
  for (const x of [56, 128, 240]) { rect(x, 18, x, 23, C.k); for (let j = 0; j < 6; j++) rect(x - 3 - j, 24 + j, x + 3 + j, 24 + j, j < 2 ? P.esmalteL : P.esmalte); rect(x - 8, 29, x + 8, 29, P.yesoL); disco(x, 30, 2, P.luzL); a_luz(R, x, 46, 30, P.luzL, 0.22, 26); }
  // el suelo de linóleo a cuadros, con su brillo de cera, la luz de la ventana y alguna rozadura
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 132) / 48, xx = 160 + (x - 160) / (0.7 + p * 0.6), cu = (Math.floor(xx / 16) + Math.floor((y - 132) / (5 + p * 6))) % 2; let v = cu ? 0.35 : 0.68; v += (a_vr(x / 6, y / 3, 104) - 0.5) * 0.18; pset(x, y, a_tono([P.lin0, P.lin1, P.lin2, P.linL], v, x, y)); }
  rect(0, 132, 319, 133, P.verdePS);
  for (let y = 136; y < 180; y++) { const x0 = Math.round(170 + (y - 136) * 0.9), x1 = x0 + 46; for (let x = x0; x < x1; x++) if ((x + y) % 2 === 0) pset(x, y, a_mez(R.pget(x, y), P.linL, 0.5)); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 5, 104) * 300), y = 140 + Math.floor(h(k, 6, 104) * 38); linea(x, y, x + 3, y, P.lin0); }
  // el carrito de aparatos (dos baldas: un magnetófono de bobinas y cajas de válvulas) y el taburete de madera
  rect(14, 138, 16, 168, P.aceroS); rect(60, 138, 62, 168, P.aceroS); rect(12, 136, 64, 139, P.acero); rect(12, 136, 64, 136, P.aceroL); rect(12, 154, 64, 156, P.acero); rect(12, 154, 64, 154, P.aceroL);
  for (const x of [15, 61]) { disco(x, 170, 2, C.k); pset(x, 170, P.aceroL); }
  rect(18, 122, 48, 135, P.beigeS); rect(19, 123, 47, 134, P.beige); for (const x of [26, 40]) { disco(x, 128, 5, C.k); disco(x, 128, 4, P.carton); disco(x, 128, 1, C.k); } rect(50, 128, 60, 135, P.carton); rect(50, 128, 60, 128, P.cartonL);
  for (let x = 18; x < 60; x += 9) { rect(x, 145, x + 7, 153, P.cartonS); rect(x, 145, x + 7, 145, P.cartonL); }
  rect(98, 146, 112, 148, P.maderaL); rect(98, 148, 112, 148, P.maderaS); for (const x of [99, 110]) linea(x, 149, x + (x < 105 ? -2 : 2), 160, P.maderaS); linea(100, 155, 110, 155, P.maderaS);
  // la papelera con bolas de papel y el taburete
  rect(150, 142, 160, 156, P.metalS); rect(151, 142, 159, 155, P.metal); rect(150, 141, 160, 141, P.metalL); for (const [x, y] of [[152, 139], [156, 138], [154, 136], [161, 154]]) { disco(x, y, 2, C.blanco); pset(x, y, P.bandBS); }
}

// el cielo de día tramado (cuatro azules, más claro abajo)
function a_cieloDia(R, x0, y0, x1, y1, k) {
  const P = a_P, T = [P.cielo1, P.cielo2, P.cielo3, P.cielo4];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, a_tono(T, (y - y0) / (y1 - y0 + 1) * 0.9 + (a_vr(x / 20, y / 8, k) - 0.5) * 0.12, x, y));
}

// el banco de delante del laboratorio: encimera negra, armario de madera, la calculadora mecánica Friden con sus teclas,
// la regla de cálculo, los papeles con cuentas, la taza con vapor y el flexo
function a_labDelante(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  rect(186, 140, 319, 144, C.k); rect(186, 140, 319, 140, P.arch3); rect(186, 144, 319, 144, P.arch1);
  for (let x = 188; x < 318; x += 33) { rect(x, 145, x + 31, 179, P.madera); rect(x, 145, x + 31, 145, P.maderaL); rect(x, 145, x, 179, P.maderaL); rect(x + 31, 145, x + 31, 179, P.maderaS); for (let y = 148; y < 179; y += 4) pset(x + 5 + Math.floor(h(x, y, 105) * 22), y, P.maderaS); rect(x + 14, 156, x + 17, 157, P.metalL); }
  // la calculadora mecánica: cuerpo gris, el teclado de columnas, el carro con las ruedas de cifras
  rect(194, 128, 224, 139, P.aceroS); rect(195, 129, 223, 138, P.metal); rect(196, 124, 222, 128, P.metalS); rect(197, 125, 221, 126, P.metalL);
  for (let c = 0; c < 8; c++) for (let f = 0; f < 3; f++) pset(197 + c * 3, 131 + f * 2, f === 0 && c === Math.floor(t * 2) % 8 ? P.rojoN : C.blanco);
  for (let c = 0; c < 6; c++) pset(200 + c * 3, 125, (Math.floor(t * 3) + c) % 3 ? C.k : P.blanco);
  // la regla de cálculo, los papeles con cuentas, la taza y el flexo
  rect(230, 137, 266, 139, P.bandB); rect(230, 138, 266, 138, P.beigeS); for (let x = 232; x < 266; x += 3) pset(x, 137, C.k); rect(240 + Math.round(Math.sin(t * 0.8) * 8), 136, 243 + Math.round(Math.sin(t * 0.8) * 8), 139, P.ojo);
  rect(268, 136, 288, 139, C.blanco); rect(270, 135, 290, 137, P.bandB); for (let x = 272; x < 288; x += 2) pset(x, 136, P.redS);
  rect(296, 132, 302, 139, C.blanco); rect(302, 134, 304, 137, C.blanco); rect(297, 132, 301, 133, P.maderaD);
  for (let p = 0; p < 4; p++) { const u = (t * 0.5 + p / 4) % 1; if (u < 0.8) pset(Math.round(299 + Math.sin(t * 2 + p) * 2), Math.round(130 - u * 14), P.yesoL); }
  linea(312, 139, 314, 120, P.aceroS); linea(314, 120, 306, 114, P.aceroS); for (let j = 0; j < 4; j++) rect(302 - j, 114 + j, 308 + j, 114 + j, P.esmalte); rect(302, 118, 310, 118, P.luzL); rect(310, 138, 316, 140, P.aceroS);
  a_luz(R, 292, 136, 20, P.luz, 0.25, 5);
  return { tablero: 140 };
}

// la cámara 'pizarra': la pizarra de cerca
function a_labPizarra(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  a_poner(R, a_capa(R, 'a-pizarra', () => {
    a_pizarra(R, 0, 0, 319, 165, 110);
    rect(0, 166, 319, 179, P.madera); rect(0, 166, 319, 167, P.maderaL); rect(0, 172, 319, 173, P.maderaS); for (let x = 0; x < 320; x += 3) if (h(x, 1, 111) < 0.4) pset(x, 170 + Math.floor(h(x, 2, 111) * 2), P.maderaS);
    // la Luna grande de tiza (Sol por la izquierda), el Sol, la Tierra, cifras, el ojo y la «?»
    a_lunaTiza(R, 206, 84, 50, 0.22);
    for (let a = 0; a < 6.283; a += 0.12) pset(Math.round(30 + Math.cos(a) * 8), Math.round(36 + Math.sin(a) * 8), P.tizaA);
    for (let k = 0; k < 8; k++) { const a = k * 0.785; linea(Math.round(30 + Math.cos(a) * 11), Math.round(36 + Math.sin(a) * 11), Math.round(30 + Math.cos(a) * 15), Math.round(36 + Math.sin(a) * 15), P.tizaA); }
    for (let k = 0; k < 6; k++) { const y = 56 + k * 6; for (let x = 48 + k * 4; x < 140 - k * 2; x += 3) pset(x, y, P.tizaS); }
    disco(40, 140, 12, P.piz2); for (let a = 0; a < 6.3; a += 0.08) pset(Math.round(40 + Math.cos(a) * 12), Math.round(140 + Math.sin(a) * 12), P.tiza); for (let k = 0; k < 26; k++) { const a = h(k, 1, 112) * 6.3, d = h(k, 2, 112) * 10; pset(Math.round(40 + Math.cos(a) * d), Math.round(140 + Math.sin(a) * d), k % 3 ? P.tizaZ : P.tiza); }
    a_dig(R, '1958', 14, 20, P.tiza, 2); a_dig(R, '384000', 70, 140, P.tiza, 1); a_dig(R, '=', 96, 140, P.tizaS); a_dig(R, '3', 102, 140, P.tizaA, 2);
    a_dig(R, '2.5x10^3', 64, 22, P.tiza, 1, 0.08); a_dig(R, '9.8', 98, 22, P.tizaA, 1); a_dig(R, '+', 64, 32, P.tizaS); a_dig(R, '16/2', 70, 32, P.tiza);
    // el ojo de la Tierra que mira (dibujo de tiza)
    for (let a = 0; a < 6.3; a += 0.15) { const x = Math.round(64 + Math.cos(a) * 9), y = Math.round(110 + Math.sin(a) * 4); pset(x, y, P.tiza); } disco(64, 110, 2, P.tiza); pset(64, 110, P.piz1);
    for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 3, 112) * 310), y = Math.floor(h(k, 4, 112) * 160); if (Math.hypot(x - 206, y - 84) > 54) pset(x, y, P.piz3); }
    for (const [x, c] of [[40, P.tiza], [52, P.tizaA], [210, P.tizaR], [228, P.tiza]]) { rect(x, 162, x + 8, 165, c); rect(x, 165, x + 8, 165, P.tizaS); }
    rect(120, 158, 142, 165, P.maderaL); rect(120, 162, 142, 165, P.alfS); rect(120, 158, 142, 158, P.yesoL);
  }));
  // la trayectoria punteada de la Tierra al terminador y el cohete de tiza que avanza (o.cohete)
  const p0 = [52, 132], p1 = [140, 30], p2 = [215, 52], en = (v) => { const a = (1 - v) * (1 - v), b = 2 * (1 - v) * v, c = v * v; return [a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]]; };
  for (let i = 0; i <= 60; i++) { const [x, y] = en(i / 60); if (i % 3 === 0) pset(Math.round(x), Math.round(y), P.tiza); }
  const cu = o.cohete ?? 0; if (cu > 0) { const [x, y] = en(Math.min(1, cu)), [x2, y2] = en(Math.min(1, cu + 0.02)), a = Math.atan2(y2 - y, x2 - x), ca = Math.cos(a), sa = Math.sin(a);
    const P2 = (i, j) => [Math.round(x + ca * i - sa * j), Math.round(y + sa * i + ca * j)];
    for (let i = -7; i <= 6; i++) for (const j of [-2, 2]) { const [px, py] = P2(i, j * Math.min(1, (7 - i) / 4)); pset(px, py, P.tiza); }
    for (const [i, j] of [[-7, -4], [-6, -3], [-7, 4], [-6, 3], [7, 0], [6, 1], [6, -1]]) { const [px, py] = P2(i, j); pset(px, py, P.tiza); }
    for (let k = 0; k < 4; k++) { const [px, py] = P2(-9 - k * 2 - (Math.floor(t * 8) % 2), (k % 2) * 2 - 1); pset(px, py, P.tizaA); } }
  // la nube de polvo con su brillo al Sol, en el terminador
  a_nubeTiza(R, 215, 54, 26, o.nube ?? 0, t, -1);
  // la «?» y el polvo de tiza que flota
  if ((o.nube ?? 0) > 0.6) R.icono('?', 262, 18, P.tizaR, P.piz0, 2);
  for (let k = 0; k < 14; k++) { const u = (t * 0.06 + h(k, 1, 113)) % 1, x = Math.round(h(k, 2, 113) * 300 + Math.sin(t * 0.8 + k) * 4), y = Math.round(160 - u * 140); if (!(x >= 272 && y <= 48)) pset(x, y, u < 0.5 ? P.tizaS : P.piz3); }
  return { suelo: null, luna: [206, 84, 50], tierra: [40, 140, 12], terminador: [215, 54], repisa: 166, cohete: cu > 0 ? en(Math.min(1, cu)) : null };
}

// ═══ observatorio: la cúpula de noche con la Luna enorme ═══
// el telescopio: el tubo de E (ocular, abajo a la derecha) a O (boca, arriba a la izquierda)
const a_TEL = { E: [216, 130], O: [175, 72], r: 8 };

function a_obs(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  a_poner(R, a_capa(R, 'a-obs-fondo', () => {
    // la ranura: el cielo tramado y la Luna enorme y detallada
    a_cieloNoche(R, 0, 0, 319, 179, 121, { fin: 160 });
    a_luna(R, 160, 48, 34, { fase: 0.55, lado: 1 });
    for (let a = 0; a < 6.283; a += 0.02) for (const d of [36, 38]) { const x = Math.round(160 + Math.cos(a) * d), y = Math.round(48 + Math.sin(a) * d); if ((x + y) % (d === 36 ? 2 : 3) === 0) pset(x, y, P.n5); }
  }));
  // las nubes finas que cruzan la Luna y el titileo, en la ranura
  R.recorte([124, 0, 196, 104]);
  a_titila(R, t, 124, 0, 196, 100, 121, 12);
  [[1.4, 70, 30, 0], [2.3, 26, 20, 1], [3.1, 88, 18, 2]].forEach(([v, y, w, k]) => a_nube(R, 100 + ((t * v + k * 40) % 130), y, w, [P.nub2, P.via, P.viaL], k + 60));
  R.recorte(null);
  a_pegar(R, a_capa(R, 'a-obs-medio', () => a_obsFijo(R), true));
  // las motas en el haz de luz de luna, las luces de la consola, el registrador y las luces rojas
  for (let k = 0; k < 16; k++) { const u = (t * 0.04 + h(k, 1, 122)) % 1, y = Math.round(100 + u * 60), x = Math.round(140 + (y - 100) * 0.25 + h(k, 2, 122) * 40 + Math.sin(t + k) * 2); if (Math.sin(t * 2 + k) > -0.3) pset(x, y, P.viaB); }
  for (let i = 0; i < 12; i++) { const x = 246 + (i % 6) * 5, y = 104 + Math.floor(i / 6) * 5, on = Math.sin(t * (1 + h(i, 1, 123) * 3) + i * 2) > 0; pset(x, y, on ? [P.rojoN, P.osciloL, P.geiger][i % 3] : P.cup1); }
  { const y0 = 128; for (let k = 0; k < 10; k++) { const x = 276 + k * 2, y = y0 + Math.round(Math.sin((k - t * 4) * 0.8) * 2); pset(x, y, P.cup2); } pset(296, y0 + Math.round(Math.sin(-t * 3.2) * 2), P.rojoN); }
  for (const [x, f] of [[30, 0], [96, 1.3], [232, 2.2], [300, 0.7]]) if (Math.sin(t * 1.7 + f) > -0.85) { pset(x, 100, P.rojoNL); pset(x, 101, P.rojoN); }
  return { suelo: 158, ranura: [124, 196, 0, 104], luna: [160, 48, 34], boca: a_TEL.O, ocular: [220, 136], plataforma: [144, 172, 86], escalera: [[100, 158], [146, 88]], consola: [240, 312, 136], barandilla: [0, 86, 140] };
}

function a_obsFijo(R) {
  const P = a_P, { rect, pset, linea, disco, poligono } = R;
  // la cúpula por dentro: paneles de acero curvos, costillas que convergen, anillos y remaches (fuera de la ranura)
  for (let y = 0; y < 106; y++) for (let x = 0; x < 320; x++) {
    if (x >= 124 && x <= 196 && y <= 104) continue;
    const ang = Math.atan2(x - 160, y + 70), cost = Math.abs(((ang * 9) % 1 + 1) % 1 - 0.5), anillo = Math.abs(((Math.hypot(x - 160, y + 70) / 26) % 1) - 0.5);
    let v = 0.35 + (y / 106) * 0.25 + (a_vr(x / 10, y / 10, 124) - 0.5) * 0.12 - Math.abs(x - 160) / 600;
    if (cost < 0.04) v += 0.3; else if (cost < 0.07) v -= 0.12; if (anillo > 0.47) v -= 0.18;
    pset(x, y, a_tono([P.cup0, P.cup1, P.cup2, P.cup3, P.cupL], v, x, y));
    if (cost < 0.04 && (y % 7 === 3)) pset(x, y, P.cupL);
  }
  // los bordes de la ranura y sus raíles con remaches
  for (const x0 of [118, 196]) { rect(x0, 0, x0 + 5, 106, P.cup1); rect(x0 + (x0 < 160 ? 5 : 0), 0, x0 + (x0 < 160 ? 5 : 0), 106, P.cupL); for (let y = 3; y < 106; y += 8) pset(x0 + 2, y, P.cup3); }
  // el anillo de la base con sus ruedas, las luces rojas y la pared cilíndrica con mapas lunares
  rect(0, 104, 319, 108, P.cup1); rect(0, 104, 319, 104, P.cupL); for (let x = 6; x < 320; x += 22) { disco(x, 108, 2, P.cup0); pset(x, 107, P.cup3); }
  for (let y = 109; y < 142; y++) for (let x = 0; x < 320; x++) { const tb = (x % 14 === 0), v = 0.4 + (a_vr(x / 8, y / 20, 125) - 0.5) * 0.25 - Math.abs(x - 160) / 700; pset(x, y, tb ? P.sue0 : a_tono([P.sue0, P.sue1, P.sue2], v, x, y)); }
  for (const [x, y, w, hh] of [[16, 112, 40, 26], [272, 70, 44, 30]]) { rect(x, y, x + w, y + hh, P.bandBS); rect(x + 1, y + 1, x + w - 1, y + hh - 1, P.beigeL); const cx = x + w / 2, cy = y + hh / 2, r = hh / 2 - 3; disco(cx, cy, r, P.l3); for (const [mx, my, rx, ry] of a_MARES.slice(0, 8)) a_elipse(R, cx + mx * r, cy + my * r, rx * r, ry * r, P.l1); for (let k = -2; k <= 2; k++) { linea(cx - r, cy + k * r / 2.5, cx + r, cy + k * r / 2.5, P.beigeS); } pset(x + 2, y + 1, P.rojoN); pset(x + w - 2, y + 1, P.rojoN); }
  rect(206, 112, 234, 132, P.bandBS); rect(207, 113, 233, 131, P.beigeL); for (let k = 0; k < 5; k++) a_dig(R, ['14', '27', '3.5', '9', '61'][k], 209, 114 + k * 3.4 | 0, P.redS);
  // las luces rojas de noche con su resplandor sobre la cúpula
  for (const x of [30, 96, 232, 300]) a_luz(R, x, 100, 22, P.rojoN, 0.3, 14);
  // el suelo de tablas con la luz roja y el haz de la Luna que entra por la ranura
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const t0 = Math.floor((x + (Math.floor((y - 142) / 7) % 2) * 11) / 22); pset(x, y, (y - 142) % 7 === 0 ? P.sue0 : a_tono([P.sue0, P.sue1, P.sue2], 0.5 + (h(t0, y >> 3, 126) - 0.5) * 0.4 + (a_vr(x / 3, y, 127) - 0.5) * 0.25, x, y)); }
  for (let y = 104; y < 180; y++) { const x0 = 128 + (y - 104) * 0.3, x1 = 194 + (y - 104) * 0.55; for (let x = Math.round(x0); x < x1; x++) if ((x + y) % 3 === 0 && R.pget(x, y) !== a_VACIO) pset(x, y, a_mez(R.pget(x, y), P.viaL, y > 142 ? 0.35 : 0.2)); }
  // el hueco de la escalera de bajada (la barandilla va en carreraDelante)
  rect(4, 148, 82, 179, P.cup0); for (let s = 0; s < 5; s++) { const y = 152 + s * 6; rect(8 + s * 10, y, 82, y + 1, P.sue1); rect(8 + s * 10, y, 82, y, P.sue2); }
  // la escalera rodante hasta la plataforma (el gato se sube a ella)
  linea(98, 158, 144, 88, P.aceroS); linea(99, 158, 145, 88, P.acero); linea(110, 158, 152, 92, P.aceroS);
  for (let s = 0; s < 8; s++) { const y = 150 - s * 8.6, x = 104 + s * 5.6; rect(Math.round(x) - 4, Math.round(y), Math.round(x) + 8, Math.round(y) + 1, P.aceroL); rect(Math.round(x) - 4, Math.round(y) + 1, Math.round(x) + 8, Math.round(y) + 1, P.aceroS); }
  rect(142, 86, 172, 89, P.acero); rect(142, 86, 172, 86, P.aceroL); rect(168, 89, 170, 158, P.aceroS); rect(144, 89, 146, 120, P.aceroS);
  linea(96, 140, 140, 74, P.aceroL); linea(140, 74, 170, 74, P.aceroL); rect(170, 74, 170, 86, P.aceroL); rect(142, 74, 142, 86, P.aceroL);
  for (const x of [97, 112, 170]) { disco(x, 160, 2, C.k); pset(x, 160, P.aceroL); }
  // el telescopio: el pilar, la montura con el contrapeso y el tubo blanco con sus anillos, el buscador y el ocular
  rect(184, 118, 198, 158, P.cup2); rect(184, 118, 186, 158, P.cup3); rect(180, 156, 202, 160, P.cup1); rect(180, 156, 202, 156, P.cupL);
  rect(184, 108, 202, 120, P.telD); rect(185, 109, 201, 110, P.telS); linea(190, 114, 172, 128, P.telD); linea(191, 114, 173, 128, P.telS); rect(166, 126, 176, 136, P.cup1); rect(166, 126, 176, 127, P.cup3);
  { const [ex, ey] = a_TEL.E, [ox, oy] = a_TEL.O, L = Math.hypot(ox - ex, oy - ey), ux = (ox - ex) / L, uy = (oy - ey) / L, nx = -uy, ny = ux;
    for (let s = 0; s <= L; s += 0.5) for (let w = -a_TEL.r; w <= a_TEL.r; w += 0.5) { const x = Math.round(ex + ux * s + nx * w), y = Math.round(ey + uy * s + ny * w), q = w / a_TEL.r;
      let c = q > 0.55 ? P.telS : q < -0.45 ? P.telL : P.tel; if (Math.abs(q) > 0.92) c = P.telD; if ((s > 12 && s < 15) || (s > 44 && s < 47)) c = q > 0.3 ? P.telD : P.telS; if (s > L - 10) c = q > 0.3 ? P.cup1 : P.cup2; pset(x, y, c); }
    for (let w = -a_TEL.r; w <= a_TEL.r; w++) pset(Math.round(ox + nx * w), Math.round(oy + ny * w), C.k);
    for (let s = 14; s < 40; s++) for (let w = 0; w < 3; w++) pset(Math.round(ex + ux * s + nx * (a_TEL.r + 2 + w)), Math.round(ey + uy * s + ny * (a_TEL.r + 2 + w)), w === 1 ? P.tel : P.telD); }
  rect(214, 130, 222, 136, P.telD); rect(216, 136, 220, 141, C.k); rect(216, 136, 217, 141, P.cup3); disco(224, 132, 2, P.cup3);
  // la consola de mandos: el bastidor de luces, el panel inclinado con diales y el registrador de papel
  rect(240, 96, 312, 136, P.cup1); rect(241, 97, 311, 98, P.cupL); rect(243, 101, 275, 112, C.k);
  rect(278, 101, 310, 112, P.beigeL); for (let x = 280; x < 310; x += 4) rect(x, 101, x, 112, P.bandBS);
  poligono([[238, 136], [244, 118], [312, 118], [316, 136]], P.cup2); linea(244, 118, 312, 118, P.cupL);
  for (const x of [252, 266, 296]) { disco(x, 127, 4, C.k); disco(x, 127, 3, P.beigeL); linea(x, 127, x + 2, 125, P.rojoN); }
  for (let x = 274; x < 290; x += 3) { rect(x, 124, x + 1, 130, C.k); pset(x, 124, P.blancoN); }
  rect(238, 136, 316, 140, P.cup1); rect(238, 136, 316, 136, P.cupL); rect(242, 140, 312, 158, P.cup0); for (let x = 246; x < 310; x += 16) { rect(x, 143, x + 12, 155, P.cup1); rect(x + 5, 148, x + 7, 149, P.cupL); }
  a_luz(R, 276, 126, 30, P.rojoN, 0.15, 14);
}

// la barandilla del hueco de la escalera (delante de los personajes): pasamanos de latón, barrotes y su sombra
function a_obsDelante(R, t, o) {
  const P = a_P, { rect, pset } = R;
  rect(0, 140, 86, 142, P.latonS); rect(0, 140, 86, 140, P.latonL);
  for (let x = 2; x < 86; x += 7) { rect(x, 143, x + 1, 176, P.aceroS); pset(x, 143, P.aceroL); }
  rect(84, 140, 87, 178, P.acero); rect(84, 140, 84, 178, P.aceroL); rect(0, 158, 86, 159, P.aceroS);
  return { tablero: 140 };
}

// la cámara 'luna': por el ocular del telescopio
function a_obsLuna(R, t, o) {
  const P = a_P, { pset, linea } = R, cx = 156, cy = 92, rc = 76;
  a_poner(R, a_capa(R, 'a-ocular', () => {
    // el tubo del ocular: anillos tramados, el aro de metal con su brillo
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - cx, y - cy); if (d < rc) continue; const v = Math.max(0, 0.6 - (d - rc) / 220) + (Math.sin(d * 0.5) > 0.9 ? 0.1 : 0); pset(x, y, a_tono([P.sil0, P.cup0, P.cup1, P.cup2], v, x, y)); }
    for (let a = 0; a < 6.283; a += 0.004) for (let w = 0; w < 4; w++) { const x = Math.round(cx + Math.cos(a) * (rc + w)), y = Math.round(cy + Math.sin(a) * (rc + w)), luz = Math.cos(a + 2.4); pset(x, y, w === 0 ? C.k : luz > 0.6 ? P.aceroL : luz > -0.2 ? P.acero : P.aceroS); }
    // el cielo del campo y la Luna grande con la línea del día y la noche
    R.recorte([cx - rc, cy - rc, cx + rc, cy + rc]);
    for (let y = cy - rc; y <= cy + rc; y++) for (let x = cx - rc; x <= cx + rc; x++) if (Math.hypot(x - cx, y - cy) < rc) pset(x, y, a_tono([P.n0, P.n1], 0.3 + (a_vr(x / 20, y / 20, 131) - 0.5) * 0.3, x, y));
    for (let k = 0; k < 30; k++) { const x = cx - rc + Math.floor(h(k, 1, 132) * rc * 2), y = cy - rc + Math.floor(h(k, 2, 132) * rc * 2); if (Math.hypot(x - cx, y - cy) < rc - 2) pset(x, y, h(k, 3, 132) > 0.7 ? P.est : P.estA); }
    a_luna(R, cx + 6, cy + 4, 62, { fase: 0.62, lado: -1 });
    R.recorte(null);
  }));
  // el temblor del aire en el borde, el retículo rojo que late, una mota que cruza y el reflejo que gira en el aro
  for (let k = 0; k < 60; k++) { const a = k / 60 * 6.283, d = 62 + (Math.sin(t * 9 + k * 3.1) > 0.6 ? 1 : 0), x = Math.round(cx + 6 + Math.cos(a) * d), y = Math.round(cy + 4 + Math.sin(a) * d); if (Math.cos(a) > -0.2 && Math.sin(t * 7 + k) > 0.3) pset(x, y, P.l5); }
  const ret = Math.sin(t * 2) > -0.5 ? P.rojoN : P.rojoNS;
  for (let x = cx - rc + 4; x <= cx + rc - 4; x++) if (Math.abs(x - cx) > 3) pset(x, cy, ret);
  for (let y = cy - rc + 4; y <= cy + rc - 4; y++) if (Math.abs(y - cy) > 3) pset(cx, y, ret);
  for (let k = -6; k <= 6; k++) if (k) { pset(cx + k * 10, cy - 2, ret); pset(cx + k * 10, cy + 2, ret); pset(cx - 2, cy + k * 10, ret); pset(cx + 2, cy + k * 10, ret); }
  for (let a = 0; a < 6.283; a += 0.05) if (Math.floor(a * 10) % 3) pset(Math.round(cx + Math.cos(a) * 20), Math.round(cy + Math.sin(a) * 20), ret);
  { const u = (t * 0.07) % 1, x = Math.round(cx - 60 + u * 120), y = Math.round(cy + 30 - u * 40 + Math.sin(t) * 3); R.disco(x, y, 2, P.sil2); pset(x, y, P.sil0); }
  for (let k = 0; k < 14; k++) { const a = t * 0.3 + k * 0.03 + 3.6; pset(Math.round(cx + Math.cos(a) * (rc + 1)), Math.round(cy + Math.sin(a) * (rc + 1)), k < 4 || k > 10 ? P.aceroL : C.blanco); }
  return { suelo: null, circulo: [cx, cy, rc], luna: [cx + 6, cy + 4, 62] };
}

// ═══ redaccion: un periódico de Londres en el año 2000, de noche ═══
function a_redac(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R;
  a_poner(R, a_capa(R, 'a-redac', () => a_redacFijo(R)));
  // por la ventana: nubes, el agua del Támesis, el London Eye que gira, el autobús rojo en el puente y el Big Ben
  const cl = [192, 24, 270, 100]; R.recorte(cl);
  [[1.2, 34, 30, 0], [2.1, 46, 22, 1]].forEach(([v, y, w, k]) => a_nube(R, 180 + ((t * v + k * 50) % 110), y, w, [P.nub0, P.nub1, P.tam2], k + 70));
  { const ex = 210, ey = 58, r = 17; for (let a = 0; a < 6.283; a += 0.05) pset(Math.round(ex + Math.cos(a) * r), Math.round(ey + Math.sin(a) * r), P.tam2);
    for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283 + t * 0.08; linea(ex, ey, Math.round(ex + Math.cos(a) * r), Math.round(ey + Math.sin(a) * r), k % 2 ? P.tam1 : P.tam2); R.disco(Math.round(ex + Math.cos(a) * r), Math.round(ey + Math.sin(a) * r), 1, P.ojo); }
    linea(ex, ey, ex - 8, 84, P.tam2); linea(ex, ey, ex + 8, 84, P.tam2); pset(ex, ey, P.ojo); }
  for (let y = 90; y < 100; y++) for (let x = 192; x <= 270; x++) { const s = Math.sin(x * 0.5 + t * 3 + y * 1.7); pset(x, y, s > 0.75 ? (Math.abs(x - 244) < 4 ? P.farol : P.tam2) : y % 2 ? P.tam0 : P.tam1); }
  { const u = ((t * 9) % 150) / 150, x = Math.round(lerp(176, 286, u)); a_rc(R, cl, x, 79, x + 11, 86, P.bus); a_rc(R, cl, x, 79, x + 11, 79, P.busS); a_rc(R, cl, x + 1, 80, x + 10, 81, P.farol); a_rc(R, cl, x + 1, 83, x + 10, 83, P.farol); pset(x + 2, 87, C.k); pset(x + 9, 87, C.k); }
  { const a = (t / 3600 + 0.2) * 6.283 - 1.57, b = (t / 43200 + 0.85) * 6.283 - 1.57; linea(244, 40, Math.round(244 + Math.cos(a) * 3), Math.round(40 + Math.sin(a) * 3), C.k); linea(244, 40, Math.round(244 + Math.cos(b) * 2), Math.round(40 + Math.sin(b) * 2), C.k); }
  R.recorte(null);
  // el fluorescente que parpadea, la tele de las noticias, la impresora que escupe hojas, la gente del fondo y la fuente
  if (h(Math.floor(t * 12), 1, 141) < 0.12) rect(236, 3, 266, 6, P.red1);
  { const k = Math.floor(t / 2.5) % 3; rect(100, 30, 138, 50, [P.panta, P.tam2, P.redS][k]); rect(100, 42, 138, 50, [P.bus, P.faf, P.esmalte][k]); rect(104, 33, 118, 40, P.pantaL); rect(121, 34, 134, 35, P.ojo); rect(121, 37, 130, 38, P.ojo);
    R.recorte([100, 46, 138, 50]); for (let i = 0; i < 6; i++) { const x = Math.round(((i * 14 - t * 12) % 84 + 84) % 84) + 96; linea(x, 48, x + 8, 48, C.blanco); } R.recorte(null); }
  { const u = (t % 2.4) / 1.2; if (u < 1) { const y = Math.round(118 + u * 3); rect(156, 116, 176, y, C.blanco); for (let yy = 117; yy < y; yy += 2) rect(158, yy, 170, yy, P.red1); } }
  for (const [x, f] of [[24, 0], [62, 1.3], [118, 2.1]]) { const b = Math.round(Math.sin(t * 6 + f) * 0.6); rect(x + 7, 102 + b, x + 9, 103 + b, P.k); pset(x + 8, 101 + b, P.maderaD); }
  { const u = ((t * 0.07) % 1), x = Math.round(lerp(150, -12, u)), st = Math.floor(t * 5) % 2; rect(x, 97, x + 3, 104, P.faf); R.disco(x + 1.5, 95, 2, P.piel || P.luzS); rect(x - 1, 94, x + 4, 94, P.maderaD); rect(x + (st ? 0 : 2), 105, x + (st ? 1 : 3), 108, P.arch1); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; pset(289 + (k % 2), Math.round(104 - u * 14), P.ojo); }
  return { suelo: 160, sueloDetras: 141, ventana: [188, 274, 22, 104], escritorio: [36, 196, 134], impresora: [150, 182, 112], tele: [100, 138, 30, 50] };
}

function a_redacFijo(R) {
  const P = a_P, { rect, pset, linea, disco, poligono } = R;
  // el techo de placas con los fluorescentes (lejos de la barra del año)
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 24 === 0 || y === 7) ? P.red1 : a_tono([P.red1, P.red2], 0.55, x, y));
  for (const x0 of [180, 236]) { rect(x0, 2, x0 + 30, 7, P.red0); rect(x0 + 1, 3, x0 + 29, 6, C.blanco); for (let x = x0 + 3; x < x0 + 29; x += 3) pset(x, 4, P.red2); }
  rect(0, 14, 319, 15, P.redS);
  // la pared gris azulada con tramado, el zócalo
  for (let y = 16; y < 118; y++) for (let x = 0; x < 320; x++) pset(x, y, a_tono([P.red0, P.red1, P.red2], 0.5 + (a_vr(x / 25, y / 18, 142) - 0.5) * 0.25, x, y));
  // los dos corchos con recortes (rayas), fotos, notas amarillas, chinchetas y el hilo rojo
  for (const [x0, y0, x1, y1] of [[6, 26, 46, 70], [50, 30, 92, 70]]) { rect(x0, y0, x1, y1, P.maderaS); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.corcho); for (let k = 0; k < 40; k++) pset(x0 + 2 + Math.floor(h(k, x0, 143) * (x1 - x0 - 4)), y0 + 2 + Math.floor(h(k, y0, 143) * (y1 - y0 - 4)), P.corchoS); }
  const NOT = [[9, 29, 0], [22, 31, 1], [34, 29, 0], [10, 48, 2], [26, 50, 0], [54, 33, 1], [67, 32, 0], [79, 35, 0], [56, 52, 0], [72, 54, 2]];
  for (const [x, y, k] of NOT) { rect(x, y, x + 10, y + 13, k === 2 ? P.amarillo : C.blanco); rect(x + 10, y + 1, x + 10, y + 13, P.bandBS); if (k === 1) { rect(x + 1, y + 1, x + 9, y + 7, P.redS); disco(x + 5, y + 4, 2, P.luzS); } for (let j = k === 1 ? 9 : 3; j < 13; j += 2) rect(x + 1, y + j, x + 8 - (j % 4 ? 2 : 0), y + j, k === 2 ? P.amarilloS : P.red0); pset(x + 5, y, P.rojoN); }
  linea(14, 29, 39, 29, P.rojoN); linea(39, 29, 59, 33, P.rojoN); linea(59, 33, 77, 54, P.rojoN);
  // la tele en su soporte de pared (las noticias van en a_redac) y el reloj
  rect(96, 26, 142, 54, P.arch1); rect(97, 27, 141, 53, P.arch2); rect(116, 54, 122, 60, P.arch1);
  disco(160, 40, 7, C.k); disco(160, 40, 6, C.blanco); for (let k = 0; k < 4; k++) pset(160 + [0, 5, 0, -5][k], 40 + [-5, 0, 5, 0][k], C.k); linea(160, 40, 160, 36, C.k); linea(160, 40, 163, 41, C.k);
  // LA VENTANA a Londres: el cielo naranja abajo, el Parlamento, la torre del Big Ben con su esfera encendida, el puente
  a_cieloNoche(R, 192, 24, 270, 100, 144, { tonos: [P.n1, P.n2, P.n3, P.n5, a_mez(P.n5, P.farol, 0.3)], fin: 90 });
  for (let x = 192; x <= 270; x++) { const top = Math.round(80 - a_vr(x / 5, 0, 145) * 8); for (let y = top; y < 90; y++) pset(x, y, P.tam1); }
  rect(222, 66, 270, 90, P.sil3); for (let x = 224; x < 270; x += 4) { poligono([[x, 66], [x + 1, 60], [x + 2, 66]], P.sil3); for (let y = 70; y < 88; y += 5) pset(x + 1, y, P.farol); }
  rect(238, 34, 250, 90, P.sil3); rect(238, 34, 239, 90, a_mez(P.sil3, P.farol, 0.3)); poligono([[237, 34], [244, 18], [251, 34]], P.sil3); rect(243, 14, 245, 20, P.sil3);
  disco(244, 40, 5, P.farol); disco(244, 40, 4, P.luzL); a_luz(R, 244, 40, 12, P.farol, 0.3);
  for (let y = 50; y < 88; y += 6) { pset(241, y, P.farol); pset(247, y, P.farol); }
  rect(192, 86, 270, 89, P.tam2); for (let x = 194; x < 270; x += 8) { pset(x, 85, P.farol); pset(x, 84, P.farol); }
  // el marco de la ventana, el alféizar, el reflejo del cristal
  rect(188, 20, 274, 23, P.arch3); rect(188, 100, 274, 104, P.arch3); rect(188, 20, 191, 104, P.arch3); rect(271, 20, 274, 104, P.arch3); rect(230, 23, 232, 100, P.arch3); rect(188, 100, 274, 100, P.red2);
  for (let i = 0; i < 20; i += 2) for (const d of [8, 12]) { const x = 194 + d + i, y = 96 - i * 3; if (y > 24) pset(x, y, P.tam2); }
  // la estantería con archivadores y periódicos atados, y la fuente de agua
  rect(296, 50, 318, 130, P.maderaS); for (let s = 0; s < 4; s++) { const y = 54 + s * 19; rect(297, y + 16, 317, y + 17, P.madera); for (let x = 298; x < 316; x += 4) rect(x, y + 2 + Math.floor(h(x, s, 146) * 4), x + 3, y + 15, [P.faf, P.band, P.esmalte, P.beige][Math.floor(h(x, s + 4, 146) * 4)]); }
  rect(282, 96, 294, 128, P.beigeL); rect(282, 96, 284, 128, C.blanco); rect(283, 84, 293, 96, P.ojo); rect(284, 84, 286, 96, C.blanco); rect(285, 82, 291, 84, P.faf); rect(286, 104, 290, 106, P.faf);
  // las portadas enmarcadas (sin letras: la cabecera es una barra, el titular rayas gruesas y una foto)
  for (const [x, k] of [[100, 0], [126, 1], [152, 2]]) { rect(x, 62, x + 20, 90, P.arch1); rect(x + 1, 63, x + 19, 89, P.beigeL); rect(x + 3, 65, x + 17, 67, C.k); rect(x + 3, 70, x + 17, 71, P.arch2); rect(x + 3, 73, x + 12, 74, P.arch2);
    rect(x + 3, 77, x + 11, 85, [P.panta, P.redS, P.tam2][k]); if (k === 0) R.disco(x + 7, 81, 2, P.l5); if (k === 1) rect(x + 5, 80, x + 9, 85, P.faf); if (k === 2) { for (let i = 0; i < 9; i++) pset(x + 3 + i, 84 - Math.round(Math.abs(Math.sin(i * 0.7)) * 5), P.osciloL); }
    for (let y = 77; y < 87; y += 2) rect(x + 13, y, x + 17, y, P.red0); rect(x + 20, 63, x + 20, 90, P.redS); }
  // la fila de mesas del fondo con sus monitores, la gente pequeña que teclea y la impresora
  rect(0, 106, 150, 108, P.beige); rect(0, 108, 150, 118, P.beigeS);
  for (const x of [8, 46, 84, 122]) { rect(x, 92, x + 14, 105, P.beige); rect(x + 2, 94, x + 12, 102, P.panta); for (let y = 95; y < 102; y += 2) rect(x + 3, y, x + 4 + Math.floor(h(x, y, 147) * 7), y, P.pantaL); rect(x + 5, 105, x + 9, 106, P.beigeS); }
  for (const x of [24, 62, 118]) { R.disco(x + 8, 98, 3, P.luzS); rect(x + 5, 95, x + 11, 96, P.maderaD); rect(x + 4, 101, x + 12, 106, [P.faf, P.band, P.esmalte][x % 3]); }
  rect(150, 112, 184, 128, P.beigeL); rect(150, 112, 184, 113, C.blanco); rect(154, 118, 180, 120, P.k); rect(176, 114, 180, 116, P.osciloL); rect(150, 128, 184, 134, P.arch2); rect(153, 134, 155, 140, P.arch1); rect(180, 134, 182, 140, P.arch1);
  // la moqueta de losetas con sus manchas, el cable que cruza y la sombra de las mesas
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const lo = (Math.floor(x / 20) + Math.floor((y - 118) / 12)) % 2; pset(x, y, a_tono([P.moq0, P.moq1, P.moq2], 0.45 + lo * 0.15 + (a_vr(x / 3, y / 2, 148) - 0.5) * 0.3, x, y)); }
  rect(0, 118, 319, 119, P.redS); for (let x = 20; x < 300; x++) pset(x, Math.round(150 + Math.sin(x / 30) * 4), P.arch0);
  for (const [x, y] of [[70, 170], [240, 140], [180, 165]]) a_elipse(R, x, y, 6, 2, P.moq0);
  // la papelera que rebosa y la silla de oficina
  rect(260, 140, 272, 156, P.arch1); rect(260, 140, 272, 140, P.arch3); for (const [x, y] of [[262, 138], [267, 137], [270, 139]]) { R.disco(x, y, 2, C.blanco); pset(x, y, P.red1); }
  rect(222, 126, 238, 140, P.arch1); rect(221, 140, 240, 144, P.arch2); rect(229, 144, 231, 152, P.arch0); for (const dx of [-8, 0, 8]) { linea(230, 152, 230 + dx, 156, P.arch0); pset(230 + dx, 157, C.k); }
}

// el escritorio de delante de la redacción: tablero gris en y 134, cajoneras, el monitor de tubo beige con el cursor
// que parpadea y el texto que corre (rayas), el teclado, el teléfono con su cable rizado, los papeles y la taza
function a_redacDelante(R, t, o) {
  const P = a_P, { rect, pset, linea } = R;
  rect(34, 134, 198, 138, P.red0); rect(34, 134, 198, 134, P.red2); rect(34, 138, 198, 138, P.redS);
  rect(38, 139, 80, 178, P.red1); rect(156, 139, 194, 178, P.red1); for (const x0 of [38, 156]) for (let d = 0; d < 3; d++) { const y = 141 + d * 12; rect(x0 + 2, y, x0 + 36, y + 10, P.red2); rect(x0 + 2, y + 10, x0 + 36, y + 10, P.redS); rect(x0 + 15, y + 4, x0 + 23, y + 5, P.redS); }
  rect(82, 139, 154, 141, P.redS);
  // el monitor de tubo con el texto que corre
  rect(44, 100, 80, 132, P.beigeS); rect(45, 101, 79, 131, P.beige); rect(46, 101, 78, 102, P.beigeL); rect(50, 104, 74, 124, P.arch1); rect(51, 105, 73, 123, P.panta);
  for (let r = 0; r < 8; r++) { const y = 107 + r * 2, w = Math.floor(h(r + Math.floor(t * 1.5), 1, 149) * 16) + 4; rect(53, y, 53 + w, y, P.pantaL); }
  if (Math.floor(t * 2.5) % 2) rect(53 + Math.floor(h(Math.floor(t * 1.5) + 7, 1, 149) * 16) + 5, 121, 55 + Math.floor(h(Math.floor(t * 1.5) + 7, 1, 149) * 16) + 5, 121, C.blanco);
  rect(56, 126, 68, 128, P.beigeS); pset(74, 128, P.osciloL); rect(54, 132, 70, 133, P.beigeS);
  // el teclado, el teléfono gris, los papeles con notas amarillas y la taza que humea
  rect(86, 129, 116, 133, P.beigeS); rect(87, 129, 115, 131, P.beige); for (let x = 88; x < 115; x += 2) { pset(x, 129, P.beigeL); pset(x, 131, P.beigeL); }
  rect(122, 126, 136, 133, P.arch2); rect(121, 124, 137, 126, P.arch1); rect(125, 128, 133, 131, P.arch3); for (let i = 0; i < 8; i++) pset(119 - (i % 2), 126 + i, P.arch1);
  for (let k = 0; k < 4; k++) { rect(160 + k, 132 - k * 2, 188 + k, 133 - k * 2, k % 2 ? P.bandBS : C.blanco); } rect(176, 124, 182, 129, P.amarillo); rect(176, 129, 182, 129, P.amarilloS);
  rect(142, 126, 149, 133, P.band); rect(149, 128, 151, 131, P.band); rect(143, 126, 148, 127, P.maderaD);
  for (let p = 0; p < 4; p++) { const u = (t * 0.5 + p / 4) % 1; if (u < 0.8) pset(Math.round(145 + Math.sin(t * 2 + p) * 2), Math.round(124 - u * 14), P.red2); }
  return { tablero: 134 };
}

// la cámara 'cajon': el archivo polvoriento con el cajón que se abre
function a_cajon(R, t, o) {
  const P = a_P, { rect, pset, linea, disco } = R, ab = Math.max(0, Math.min(1, o.abre ?? 0)), cand = o.candado !== false;
  a_poner(R, a_capa(R, 'a-cajon', () => a_cajonFijo(R)));
  // la bombilla que se mece con su luz
  { const a = Math.sin(t * 0.8) * 0.08, bx = Math.round(186 + Math.sin(a) * 26), by = Math.round(26 + Math.cos(a) * 2); linea(186, 0, bx, by - 3, C.k); rect(bx - 1, by - 3, bx + 1, by - 2, P.arch3); R.disco(bx, by, 2, P.luzL); pset(bx - 1, by - 1, C.blanco); }
  // las motas en el haz del ventanuco
  for (let k = 0; k < 22; k++) { const u = (t * 0.03 + h(k, 1, 151)) % 1, y = Math.round(20 + u * 140), x = Math.round(50 + (y - 20) * 0.7 + (h(k, 2, 151) - 0.5) * 30 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 1.5 + k * 2) > -0.4) pset(x, y, P.haz); }
  // el cajón de arriba que se abre: el hueco, las carpetas colgadas, el informe (con candado) que asoma
  const yF = 76 + Math.round(ab * 14), sale = Math.round(ab * 16);
  if (ab > 0) {
    rect(116, 76, 186, yF, C.k); for (let x = 120; x < 184; x += 6) { const y = Math.max(76, yF - 6 - Math.floor(h(x, 1, 152) * 3)); rect(x, y, x + 4, yF, P.carton); rect(x, y, x + 4, y, P.cartonL); }
    rect(114, 76, 115, yF + 2, P.metalS); rect(187, 76, 188, yF + 2, P.metalS);
    const carp = PIEZAS_DC.carpeta, cy = yF - Math.round(ab * 26); if (carp) carp(R, 150, cy + 30, { s: 3, dibujo: 'luna' });
    if (cand) { const y0 = cy + 2; rect(122, y0, 178, y0 + 2, P.maderaD); rect(122, y0, 178, y0, P.cartonS); rect(147, y0 - 2, 153, y0 + 6, P.laton); rect(147, y0 - 2, 153, y0 - 2, P.latonL); for (let i = 0; i < 4; i++) { pset(148 + i * 0 , y0 - 3 - i, P.metalL); pset(152, y0 - 3 - i, P.metalL); } rect(148, y0 - 6, 152, y0 - 6, P.metalL); pset(150, y0 + 2, C.k); pset(150, y0 + 3, C.k); }
  }
  rect(112 - sale / 4, yF, 190 + sale / 4, yF + 24, P.metalS); rect(113 - sale / 4, yF + 1, 189 + sale / 4, yF + 23, P.metal); rect(113 - sale / 4, yF + 1, 189 + sale / 4, yF + 2, P.metalL);
  rect(140, yF + 6, 160, yF + 11, P.bandB); a_dig(R, '1959', 143, yF + 7, P.k); rect(142, yF + 15, 158, yF + 16, P.metalL); rect(142, yF + 17, 158, yF + 17, P.metalD);
  for (let k = 0; k < 10; k++) pset(116 + Math.floor(h(k, 3, 152) * 70), yF + 3 + Math.floor(h(k, 4, 152) * 18), P.metalD);
  // el polvo que cae del cajón (más cuanto más se mueve)
  const n = 6 + Math.round(ab * (1 - ab) * 40); for (let k = 0; k < n; k++) { const u = (t * 0.4 + h(k, 5, 153)) % 1, x = Math.round(114 + h(k, 6, 153) * 76 + Math.sin(t * 2 + k) * 2), y = Math.round(yF + 24 + u * (170 - yF - 24)); pset(x, y, u < 0.5 ? P.polvo : P.arch3); }
  // la araña que baja y sube de su hilo y el ratón que se asoma
  { const y = Math.round(30 + (Math.sin(t * 0.6) + 1) * 14); linea(24, 0, 24, y - 2, P.arch3); R.disco(24, y, 1.5, C.k); for (const s of [-1, 1]) { pset(24 + s * 2, y - 1, C.k); pset(24 + s * 2, y + 1, C.k); } }
  { const u = (t % 9) / 9, s = u < 0.15 ? u / 0.15 : u < 0.5 ? 1 : u < 0.6 ? 1 - (u - 0.5) / 0.1 : 0; if (s > 0) { const x = 192 + Math.round(s * 7); R.disco(x, 166, 2.5, P.arch3); pset(x + 3, 166, P.arch3); pset(x + 4, 167, P.rojoN); pset(x + 2, 164, P.arch3); pset(x + 3, 165, C.k); } }
  return { suelo: 170, archivador: [112, 190, 64, 170], cajon: [112, 190, yF, yF + 24], carpeta: [150, yF - Math.round(ab * 26) + 30], ventanuco: [30, 70, 18, 36] };
}

function a_cajonFijo(R) {
  const P = a_P, { rect, pset, linea, disco, poligono } = R;
  // la pared de bloques de hormigón con manchas de humedad
  for (let y = 0; y < 160; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 10), junta = y % 10 === 0 || (x + (fila % 2) * 15) % 30 === 0; pset(x, y, junta ? P.arch0 : a_tono([P.arch0, P.arch1, P.arch2], 0.55 + (a_vr(x / 12, y / 9, 154) - 0.5) * 0.4 - y / 900, x, y)); }
  a_luz(R, 186, 28, 60, P.luz, 0.22, 50);
  // el ventanuco con rejas y el haz de luz que baja en diagonal
  rect(28, 16, 72, 38, P.arch0); a_cieloDia(R, 30, 18, 70, 36, 155); for (let x = 36; x < 70; x += 7) rect(x, 18, x + 1, 36, P.arch0); rect(28, 36, 72, 38, P.arch3);
  for (let y = 38; y < 175; y++) { const x0 = 30 + (y - 38) * 0.7, x1 = 70 + (y - 38) * 0.95; for (let x = Math.round(x0); x < x1; x++) if ((x + y) % 2 === 0) pset(x, y, a_mez(R.pget(x, y), P.haz, 0.18 + 0.1 * (1 - (y - 38) / 140))); }
  // las estanterías metálicas con cajas de cartón numeradas
  for (const [x0, x1, y0] of [[0, 100, 44], [200, 276, 40], [278, 319, 50]]) {
    rect(x0, y0, x0 + 2, 172, P.metalS); rect(x1 - 2, y0, x1, 172, P.metalS);
    for (let y = y0 + 4; y < 168; y += 32) { rect(x0, y + 28, x1, y + 30, P.metal); rect(x0, y + 28, x1, y + 28, P.metalL);
      for (let x = x0 + 4; x < x1 - 18; x += 22) { const bh = 18 + Math.floor(h(x, y, 156) * 8); rect(x, y + 28 - bh, x + 18, y + 27, P.carton); rect(x, y + 28 - bh, x + 18, y + 28 - bh, P.cartonL); rect(x + 18, y + 28 - bh, x + 18, y + 27, P.cartonS); rect(x + 4, y + 31 - bh, x + 14, y + 37 - bh, P.bandB); a_dig(R, String(1940 + Math.floor(h(x, y, 157) * 60)), x + 2, y + 32 - bh, P.k);
        for (let k = 0; k < 4; k++) pset(x + Math.floor(h(k, x, y) * 18), y + 28 - bh, P.polvo); } }
  }
  // las cajas grises de archivo entre las de cartón, y la pila de cajas en el suelo con una tapa caída
  for (const [x, y] of [[26, 52], [70, 116], [226, 80], [292, 112]]) { rect(x, y, x + 18, y + 18, P.arch3); rect(x, y, x + 18, y, P.metalL); rect(x + 18, y, x + 18, y + 18, P.arch1); rect(x + 6, y + 6, x + 12, y + 8, P.metalL); }
  for (const [x, y, w, hh] of [[272, 150, 30, 22], [278, 132, 24, 18], [300, 156, 19, 16]]) { rect(x, y, x + w, y + hh, P.carton); rect(x, y, x + w, y + 1, P.cartonL); rect(x + w, y, x + w, y + hh, P.cartonS); rect(x + 6, y + 5, x + w - 6, y + 9, P.bandB); for (let k = 0; k < 6; k++) pset(x + Math.floor(h(k, x, 160) * w), y, P.polvo); }
  R.poligono([[250, 172], [266, 166], [270, 170], [254, 176]], P.cartonL);
  // la telaraña en la esquina de arriba a la izquierda
  for (let k = 0; k < 6; k++) { const a = k / 5 * 1.57; linea(0, 0, Math.round(Math.cos(a) * 26), Math.round(Math.sin(a) * 26), P.arch3); } for (const r of [8, 15, 22]) for (let a = 0; a <= 1.57; a += 0.08) pset(Math.round(Math.cos(a) * r), Math.round(Math.sin(a) * r), P.arch3);
  // el suelo de hormigón polvoriento con huellas
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, a_tono([P.arch1, P.arch2, P.arch3], 0.45 + (a_vr(x / 8, y / 3, 158) - 0.5) * 0.4, x, y));
  rect(0, 160, 319, 160, P.arch0); for (let k = 0; k < 6; k++) { const x = 220 + k * 12, y = 172 - (k % 2) * 4; a_elipse(R, x, y, 2, 1, P.arch1); }
  a_elipse(R, 151, 172, 46, 3, P.arch0);
  // el archivador metálico (los cajones de abajo y el hueco del de arriba), con polvo y una telaraña encima
  rect(110, 62, 192, 172, P.metalD); rect(112, 64, 190, 170, P.metalS);
  for (let d = 1; d < 4; d++) { const y = 76 + d * 24; rect(113, y, 189, y + 22, P.metal); rect(113, y, 189, y + 1, P.metalL); rect(140, y + 6, 160, y + 11, P.bandB); a_dig(R, String(1955 + d * 2), 143, y + 7, P.k); rect(142, y + 15, 158, y + 16, P.metalL); rect(142, y + 17, 158, y + 17, P.metalD); }
  rect(110, 60, 192, 63, P.metalL); for (let x = 112; x < 190; x++) if (h(x, 1, 159) < 0.7) pset(x, 59, P.polvo); for (let a = 0; a <= 1.57; a += 0.15) linea(190, 64, Math.round(190 - Math.cos(a) * 14), Math.round(64 - Math.sin(a) * 0 + Math.sin(a) * 14), P.arch3);
  rect(116, 76, 186, 99, C.k);
}

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const b_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_umbral = (x, y) => b_B4[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function b_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// tiñe el píxel (x, y) hacia el color c en la proporción a (respeta el recorte)
function b_tine(R, x, y, c, a) { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, b_mezcla(R.pget(x, y), c, a)); }

// tiñe una elipse (cx, cy, rx, ry) hacia c, más fuerte en el centro, tramado (para luces, halos y sombras)
function b_halo(R, cx, cy, rx, ry, c, a) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d >= 1) continue; const k = (1 - d) * a; if (b_umbral(x, y) < k * 2.2) R.pset(x, y, b_mezcla(R.pget(x, y), c, Math.min(0.6, k + 0.12)));
  }
}

// lo que no se mueve se pinta una sola vez en un búfer propio (por R y por clave) y se copia en cada fotograma; devuelve el
// búfer (para saber qué había debajo)
const b_FIJOS = new WeakMap();

function b_fijo(R, clave, pintar) {
  let m = b_FIJOS.get(R); if (!m) b_FIJOS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(); R.recorte(null); R.usar(prev); m.set(clave, b); }
  R.copiar(b); return b;
}

// calma la esquina de Atom (x 262–319, y 0–52): acerca cada píxel al color c para quitarle contraste a vetas y tramas
function b_calma(R, c, a = 0.6) { const B = R.buf; for (let y = 0; y < 53; y++) for (let x = 262; x < 320; x++) { const k = a * Math.min(1, (x - 262) / 14, (52 - y) / 10); if (k > 0) B[y * 320 + x] = b_mezcla(B[y * 320 + x], c, k); } }

// un disco que solo pinta donde ok(x, y) (las nubes que van por detrás de los tejados)
function b_disco(R, cx, cy, r, c, ok) { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r * 0.6) { const x = cx + i, y = cy + j; if (x >= 0 && x < 320 && y >= 0 && y < 180 && (!ok || ok(x, y))) R.pset(x, y, c); } }

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; c = [sombra, cuerpo, luz]
function b_nube(R, cx, cy, w, sem, c, ok) {
  const n = 3 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 911)); bolas.push([Math.round(cx + u * w * 0.86), Math.round(cy - r * 0.45 + (h(i, sem, 912) - 0.5) * w * 0.06), Math.max(1, Math.round(r))]); }
  for (const [x, y, r] of bolas) b_disco(R, x, y + 1, r, c[0], ok);
  for (const [x, y, r] of bolas) b_disco(R, x, y, r, c[1], ok);
  for (const [x, y, r] of bolas) b_disco(R, x - 1, y - 2, Math.max(1, Math.round(r * 0.6)), c[2], ok);
  const y0 = Math.round(cy + w * 0.08); for (let x = Math.round(cx - w * 0.45); x <= cx + w * 0.45; x++) { if (!ok || ok(x, y0)) R.pset(x, y0, c[0]); if (!ok || ok(x, y0 + 1)) R.pset(x, y0 + 1, c[0]); }
}

// las nubes de un cielo en tres capas (lejos pequeñas y lentas, cerca grandes y más rápidas) entre y0 e y1; ok(x, y) dice
// dónde se ve el cielo; la esquina de Atom queda libre
function b_nubes(R, t, ok, y0, y1, cols, v = 1, sem = 0, n = 7) {
  for (let k = 0; k < n; k++) { const capa = k % 3, w = [12, 18, 28][capa] + Math.round(h(k, sem, 913) * 8), vel = [1, 2.2, 4][capa] * v, span = 360 + w, y = Math.round(y0 + (capa === 2 ? 0.25 : capa === 1 ? 0.5 : 0.8) * (y1 - y0) + (h(k, sem, 914) - 0.5) * 8);
    const x = ((((h(k, sem, 915) * span - t * vel) % span) + span) % span) - w / 2 - 10;
    if (x > 256 && y < 52) continue;
    const cc = capa === 0 ? [cols[3] ?? cols[0], cols[0], cols[1]] : cols; b_nube(R, Math.round(x), y, w, k + sem, cc, ok); }
}

// pájaros lejanos (una «v» que bate) entre las x y las y dadas
function b_pajaros(R, t, n, y0, y1, c, v = 14, sem = 0, ok) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, sem, 916) * 400 + t * (v + k * 3)) % 400) - 40), y = Math.round(y0 + h(k, sem, 917) * (y1 - y0) + Math.sin(t * 1.3 + k) * 2), a = Math.sin(t * 9 + k * 2) > 0 ? -1 : 0;
    if (x > 268 && y < 50) continue;
    for (const [i, j] of [[-2, a], [-1, 0], [0, 1], [1, 0], [2, a]]) if (!ok || ok(x + i, y + j)) R.pset(x + i, y + j, c); }
}

// degradado vertical tramado entre paradas [[fracción, color], …] en el rectángulo dado
function b_degradado(R, x0, y0, x1, y1, P) {
  const B = R.buf, H = y1 - y0 + 1, tr = 3, lim = P.map(([f]) => y0 + Math.round(f * H));
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = a, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[y * 320 + x] = b_umbral(x, y) < p ? b : a; }
}

// tablas de madera horizontales con vetas, juntas y testas (c: base, cS: sombra, cL: luz, cD: junta)
function b_tablas(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, alto = 8) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const p = ((y - y0) / alto) | 0, j = (y - y0) % alto;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let col = c;
      if (j === alto - 1) col = cD; else if (j === 0) col = cL;
      else { const g = h(((x + p * 37) / 5) | 0, y, k); if (g < 0.13) col = cS; else if (g > 0.95) col = cL; else if (Math.sin((x + p * 29) * 0.21 + j * 0.9 + h(p, 0, k) * 6) > 0.93) col = cS; }
      if ((x + p * 53 + (h(p, 1, k) * 40 | 0)) % 71 === 0) col = cD;
      B[y * 320 + x] = col; } }
}

// pared enlucida con manchas suaves (c: base, cS, cL)
function b_enlucido(R, x0, y0, x1, y1, c, cS, cL, k = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const q = h(x >> 1, y >> 1, k), m = h(x >> 4, y >> 3, k + 1); B[y * 320 + x] = q < 0.06 || (m < 0.18 && b_umbral(x, y) < 0.3) ? cS : q > 0.965 ? cL : c; }
}

// un paseante diminuto (10 px): piernas que alternan, abrigo, cabeza, pelo o sombrero; o.ropa, o.sombrero, o.quieto,
// o.dir; pinta con pset (respeta el recorte)
const b_ROPA = ['#6a4a3a', '#3a4a6a', '#8a3a3a', '#4a5a3a', '#7a6a5a', '#2a2a3a', '#9a7a4a'].map(hex), b_PIEL = ['#f0c098', '#d8a070', '#a8704a'].map(hex), b_PELO = ['#3a2a1a', '#8a5a2a', '#1a1a1a', '#c8a050', '#9a9aa0'].map(hex);

function b_paseante(R, x, s, t, k, o = {}) {
  const P = R.pset, f = o.quieto ? 0 : Math.floor(t * 5 + k * 1.7) % 2, ropa = o.ropa ?? b_ROPA[k % b_ROPA.length], rs = b_mezcla(ropa, hex('#10101a'), 0.35), piel = b_PIEL[k % 3], pelo = b_PELO[k % 5], d = o.dir ?? 1, pant = hex('#2a2a34');
  x = Math.round(x); s = Math.round(s);
  P(x + f, s, C.k); P(x + f, s - 1, pant); P(x + 2 - f, s, C.k); P(x + 2 - f, s - 1, pant); P(x + 1, s - 2, pant);
  for (let j = 3; j <= 7; j++) for (let i = 0; i < 3; i++) P(x + i, s - j, i === (d > 0 ? 0 : 2) ? rs : ropa);
  P(x + (d > 0 ? 3 : -1), s - 5 + f, piel);
  P(x + 1, s - 8, piel); P(x + (d > 0 ? 2 : 0), s - 8, piel); P(x + (d > 0 ? 0 : 2), s - 8, pelo);
  if (o.sombrero) { P(x - 1, s - 9, C.k); P(x, s - 9, rs); P(x + 1, s - 9, rs); P(x + 2, s - 9, rs); P(x + 3, s - 9, C.k); P(x + 1, s - 10, rs); }
  else { P(x, s - 9, pelo); P(x + 1, s - 9, pelo); P(x + 2, s - 9, pelo); }
}

// bobina de magnetofón (radio r) que gira con el ángulo a: cubo, tres radios y la cinta enrollada
function b_bobina(R, cx, cy, r, a, cinta = hex('#5a3a2a')) {
  R.disco(cx, cy, r + 1, C.k); R.disco(cx, cy, r, hex('#b8bcc4')); R.disco(cx, cy, Math.max(2, r - 2), cinta);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d < r - 2 && d > 2 && Math.round(d) % 2 === 0) R.pset(cx + i, cy + j, b_mezcla(cinta, hex('#000000'), 0.25)); }
  for (let k = 0; k < 3; k++) { const an = a + k * 2.094; for (let q = 2; q < r - 1; q++) { const x = Math.round(cx + Math.cos(an) * q), y = Math.round(cy + Math.sin(an) * q); R.pset(x, y, hex('#d8dce4')); } }
  R.disco(cx, cy, 1, C.k); R.pset(cx, cy, hex('#e8ecf4'));
}

// una voluta de humo o vapor que sube desde (x, y) hasta alto px, ondulando
function b_humo(R, x, y, t, alto, c, cL, n = 5, sem = 0) {
  for (let k = 0; k < n; k++) { const u = ((t * 0.35 + k / n + h(k, sem, 918) * 0.1) % 1), yy = Math.round(y - u * alto), xx = Math.round(x + Math.sin(u * 7 + t * 1.5 + k) * (1 + u * 4)), r = u < 0.3 ? 0 : u < 0.7 ? 1 : 2;
    if (r === 0) R.pset(xx, yy, cL); else if (u < 0.92) { b_disco(R, xx, yy, r, u > 0.75 ? c : cL); } }
}

const b_P = pal({
  // el taller
  techo: '#4a524c', techoS: '#3a403c', pared: '#8fa08e', paredS: '#7a8b7a', paredL: '#a2b2a0', liston: '#7a5a3a', listonL: '#9a7a52',
  zocalo: '#5e7262', zocaloS: '#4a5c4e', zocaloL: '#728676', rodapie: '#3a4440', perf: '#c8a878', perfS: '#a08458', perfH: '#5a4630', silu: '#8a7050',
  lino0: '#8a8c7c', lino1: '#6a7266', linoS: '#5a6058', linoL: '#a8aa98', sol: '#fff2c8', estante: '#8a929a', estanteS: '#5a6068', estanteL: '#b4bcc4',
  beige: '#c8bc9c', beigeS: '#988c6c', beigeL: '#e0d6b8', fosforo: '#0e2a1a', onda: '#7aff9a', ondaS: '#2a9a4a', carton: '#b08a5a', cartonS: '#86643c', cartonL: '#c8a472',
  mimbre: '#b88a4a', mimbreS: '#8a5e2a', mimbreL: '#d8aa66', cojin: '#c83a3a', cojinS: '#8e2424', cojinL: '#e86a5a', gabardina: '#c8b080', gabardinaS: '#9a8458',
  banco: '#9a6a3a', bancoS: '#6a4422', bancoL: '#bc8a52', bancoD: '#4a2c16', frente: '#5e6a5a', frenteS: '#46504a', frenteL: '#76826e', azulP: '#2a5a9a', azulPL: '#4a7ab8', lineaP: '#e4eef8',
  // el parque
  fachada1: '#e4d4b4', fachada2: '#d8c09a', fachada3: '#c8ccc4', fachadaS: '#a89878', pizarraT: '#5a6478', pizarraTL: '#7a849a', pizarraTS: '#424a5a', cobre: '#5aa08a', cobreS: '#3a7a6a', cobreL: '#8ac8b0',
  vidrioV: '#3a4a5e', vidrioVL: '#8aa4bc', persiana: '#4a6a4a', toldo1: '#c84a3a', toldo2: '#f0e8d8', adoquin: '#6a6670', adoquinL: '#86828c', adoquinS: '#4e4a54',
  cesped: '#5a9a3a', cespedS: '#3e7a2a', cespedL: '#7ab84e', grava: '#cbb994', gravaS: '#a8966e', gravaL: '#e0d2b0', piedraF: '#b8b0a4', piedraFS: '#8a8278', piedraFL: '#d8d2c6',
  agua: '#4a8ab8', aguaS: '#3a6a98', aguaL: '#a8d8f0', hoja: '#3e7a34', hojaS: '#2a5a26', hojaL: '#5e9a44', flor: '#f4ecd8', tronco: '#5a4232', troncoS: '#3e2c20', hierro: '#2a2e34', hierroL: '#4a525c',
  furgo: '#8a9098', furgoS: '#646a74', furgoL: '#aab0b8', furgoD: '#4a5058', banquito: '#3e6a3a', banquitoL: '#5a8a4a',
  // la furgoneta por dentro
  chapa: '#6a7468', chapaS: '#525a52', chapaL: '#828c80', chapaD: '#3e443e', ambar: '#f0b040', ambarS: '#a86a1a', piloto: '#e83a2a', pilotoV: '#4ae86a',
  // Skinner
  yeso: '#e0d4b4', yesoS: '#c8b894', yesoL: '#eee4c8', friso: '#7a4e2c', frisoS: '#5a361c', frisoL: '#9a6a3e', tiza: '#e8ece4', tizaS: '#a8b4a8', verdeP: '#2e4a3a', verdePS: '#22382c',
  ladrillo: '#8a4a3a', ladrilloS: '#6a3428', jaula: '#c8c8c0', jaulaS: '#7a7a74', punta: '#7a8a6a', puntaS: '#5a6a4e', puntaL: '#9aaa86', pantV: '#9ac8a0', pantVS: '#5a8a64', pantVL: '#c8f0cc',
  // la nieve
  nieve: '#eef2f8', nieveS: '#c4d0e2', nieveSS: '#9eacc4', nieveL: '#ffffff', cieloG1: '#8a94a8', cieloG2: '#a2aabb', cieloG3: '#bcc2ce', cieloG4: '#d2d6de', nubeG0: '#7a8296', nubeG1: '#9aa2b4', nubeG2: '#c4cad6',
  pinoN: '#2e4a3e', pinoNS: '#1e3428', oliva: '#5a6a3a', olivaS: '#3e4a28', olivaL: '#7a8a52', tierraN: '#4a3a2e', tierraNS: '#2e241c', azulB: '#1e4a8a', azulBL: '#3a6aaa', azulBG: '#2e5a9a',
  // el archivo
  cajaA: '#9a9ea6', cajaAS: '#72767e', cajaAL: '#b8bcc4', etiqueta: '#ece8dc', baldaA: '#5a5e66', moqueta: '#3e4a6a', moquetaS: '#2e3854', moquetaL: '#56628a', crema: '#e8e0cc', cremaS: '#ccc2aa',
  verdeL: '#2e7a4a', verdeLS: '#1e5432', verdeLL: '#7ad89a', laton: '#c8a040', latonS: '#8a6a20', cinta: '#d87a8a', cintaS: '#a84a5a', papel: '#f2ecdc', papelS: '#cfc6b0',
});

function b_taller(R, t, o) {
  const { rect, pset, linea, disco } = R;
  b_fijo(R, 'taller', () => {
    const B = R.buf;
    // el techo, la pared verde (más oscura arriba), el listón y el zócalo de tablas
    for (let y = 0; y < 113; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 9) c = y === 8 ? C.k : y === 7 ? b_P.techoS : h(x >> 2, y, 401) < 0.06 ? b_P.techoS : b_P.techo;
      else if (y < 78) { const q = h(x >> 1, y >> 1, 402); c = (y < 17 && b_umbral(x, y) < (17 - y) / 16) || q < 0.06 ? b_P.paredS : q > 0.965 ? b_P.paredL : b_P.pared; }
      else if (y < 81) c = y === 78 ? b_P.listonL : y === 79 ? b_P.liston : C.maderaS;
      else if (y >= 109) c = y === 109 ? C.k : b_P.rodapie;
      else { const tb = x % 7; c = tb === 0 ? b_P.zocaloS : tb === 1 ? b_P.zocaloL : h(x, y >> 2, 403) < 0.05 ? b_P.zocaloS : b_P.zocalo; }
      B[y * 320 + x] = c; }
    // la conducción eléctrica por el techo y el fluorescente (se enciende en cada fotograma)
    rect(0, 10, 319, 10, b_P.paredS); for (let x = 6; x < 320; x += 40) rect(x, 9, x + 1, 11, b_P.techoS);
    rect(182, 1, 254, 3, C.k); rect(184, 2, 252, 2, b_P.estante);
    // el suelo de linóleo a cuadros en perspectiva, con rozaduras
    for (let y = 113; y < 180; y++) { const d = y - 100, v = Math.floor(300 / d);
      for (let x = 0; x < 320; x++) { const uu = (x - 160) / d * 3.6, u = Math.floor(uu); let c = ((u + v) & 1) ? b_P.lino1 : b_P.lino0;
        if (uu - u < 0.06 * (3.6 / d) * 6) c = b_P.linoS; const q = h(x, y, 404); if (q < 0.03) c = b_P.linoS; else if (q > 0.988) c = b_P.linoL;
        B[y * 320 + x] = c; } }
    rect(0, 112, 319, 112, b_P.linoS);
    // la luz rayada de la persiana en el suelo
    for (let y = 114; y < 180; y++) { const xl = 112 + (y - 113) * 0.9, xr = xl + 64 + (y - 113) * 0.5; if (Math.floor((y - 113) / 3.2) % 2) continue;
      for (let x = Math.round(xl); x <= xr && x < 320; x++) if (b_umbral(x, y) < 0.7) B[y * 320 + x] = b_mezcla(B[y * 320 + x], b_P.sol, 0.2); }
    // el panel perforado con las herramientas y su silueta pintada
    rect(12, 20, 106, 76, C.k); rect(13, 21, 105, 75, C.maderaS); rect(15, 23, 103, 73, b_P.perf); rect(15, 73, 103, 73, b_P.perfS); rect(103, 23, 103, 73, b_P.perfS);
    for (let y = 25; y < 73; y += 4) for (let x = 17; x < 103; x += 4) pset(x, y, b_P.perfH);
    const her = (fn) => { fn(1, b_P.silu); fn(0, null); };
    her((d, s) => { rect(21 + d, 29 + d, 23 + d, 52 + d, s ?? C.madera); if (!s) rect(21, 29, 21, 52, C.maderaL); rect(17 + d, 26 + d, 28 + d, 30 + d, s ?? C.metalD); if (!s) rect(18, 26, 27, 26, C.metalL); });   // martillo
    her((d, s) => { linea(32 + d, 28 + d, 38 + d, 48 + d, s ?? C.rojo); linea(38 + d, 28 + d, 32 + d, 48 + d, s ?? C.rojo); linea(33 + d, 28 + d, 39 + d, 48 + d, s ?? C.rojoS); rect(34 + d, 26 + d, 36 + d, 33 + d, s ?? C.metal); });   // alicates
    [[44, C.rojo], [49, C.amarillo], [54, hex('#3a6ac8')]].forEach(([x, c]) => her((d, s) => { rect(x + d, 28 + d, x + 2 + d, 35 + d, s ?? c); if (!s) rect(x, 28, x, 35, b_mezcla(c, C.blanco, 0.4)); rect(x + 1 + d, 36 + d, x + 1 + d, 46 + d, s ?? C.metalL); }));
    [10, 13, 16, 19, 22].forEach((l, i) => her((d, s) => { const x = 62 + i * 5; rect(x + d, 28 + d, x + 1 + d, 28 + l + d, s ?? C.metal); disco(x + d, 27 + d, 2, s ?? C.metal); if (!s) { pset(x, 27, b_P.perf); rect(x, 28, x, 28 + l, C.metalL); } }));
    her((d, s) => { R.poligono([[86 + d, 30 + d], [102 + d, 28 + d], [102 + d, 34 + d], [86 + d, 44 + d]], s ?? C.metalL); if (!s) { for (let x = 87; x < 102; x += 2) pset(x, 44 - Math.round((x - 86) * 0.62), C.metalD); rect(80, 28, 86, 36, C.madera); rect(82, 30, 84, 33, b_P.perf); } });   // serrucho
    R.anillo(29, 62, 6, hex('#c87a3a')); R.anillo(29, 62, 5, hex('#a85a2a')); R.anillo(29, 62, 4, hex('#c87a3a')); rect(28, 55, 30, 56, C.k);   // rollo de cable
    rect(48, 54, 66, 70, C.k); rect(49, 55, 65, 69, hex('#d8b030')); rect(51, 57, 63, 62, hex('#e8e4d0')); linea(52, 62, 58, 58, C.k); for (const dx of [52, 57, 62]) pset(dx, 66, C.k); rect(49, 69, 65, 69, hex('#a88010'));   // polímetro
    rect(74, 52, 100, 70, C.k); rect(75, 53, 99, 69, hex('#3a4a5a')); for (let k = 0; k < 4; k++) { const cc = [C.rojo, C.amarillo, hex('#3ac86a'), hex('#5a8ae8')][k]; rect(77 + k * 6, 55, 80 + k * 6, 67, cc); rect(77 + k * 6, 55, 80 + k * 6, 55, C.blanco); }   // carretes de colores
    // la ventana con persiana (marco y alféizar; el exterior y las lamas en cada fotograma)
    rect(112, 13, 182, 74, C.k); rect(113, 14, 181, 73, hex('#d8d4c4')); rect(110, 72, 184, 75, C.k); rect(111, 72, 183, 73, hex('#e8e4d4'));
    b_degradado(R, 116, 17, 178, 70, [[0, hex('#5a92d0')], [0.4, hex('#7cacde')], [0.75, hex('#a8cae6')], [1, hex('#cfe0e8')]]);
    for (let k = 0; k < 9; k++) { const cx = 112 + k * 9 + (k % 2) * 3, cy = 56 + (k % 3) * 3, r = 6 + (k % 3); R.recorte([116, 17, 178, 70]); disco(cx, cy, r + 1, hex('#2e5a34')); disco(cx, cy, r, hex('#4a7a3e')); disco(cx - 1, cy - 2, Math.max(1, r - 3), hex('#6a9a4e')); R.recorte(null); }
    rect(132, 46, 162, 70, hex('#d4ccbc')); rect(132, 46, 162, 47, C.k); for (let x = 135; x < 162; x += 5) rect(x, 50, x + 2, 66, hex('#8a9ab0'));
    R.recorte([116, 17, 178, 70]); for (let k = 0; k < 5; k++) disco(122 + k * 15, 66, 5, hex('#3a6a34')); R.recorte(null);
    // la estantería metálica
    for (const x of [188, 270]) { rect(x, 22, x + 2, 112, C.k); rect(x, 22, x, 112, b_P.estanteL); }
    for (const y of [46, 76, 104]) { rect(188, y, 272, y + 2, C.k); rect(189, y, 271, y, b_P.estanteL); rect(189, y + 1, 271, y + 1, b_P.estante); }
    rect(191, 22, 269, 45, b_P.paredS); rect(191, 49, 269, 75, b_P.paredS); rect(191, 79, 269, 103, b_P.zocaloS);
    // el cajonero de componentes
    rect(194, 26, 228, 45, C.k); rect(195, 27, 227, 45, hex('#6a7a8a')); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const x = 196 + i * 8, y = 28 + j * 6; rect(x, y, x + 6, y + 4, hex('#d8dce4')); rect(x + 2, y + 3, x + 4, y + 3, [C.rojo, C.amarillo, hex('#3a8ae8'), hex('#3ac86a')][(i + j) % 4]); pset(x + 3, y + 1, C.k); }
    // cajas de cartón y válvulas
    rect(232, 32, 252, 45, C.k); rect(233, 33, 251, 45, b_P.carton); rect(233, 33, 251, 34, b_P.cartonL); rect(240, 33, 244, 45, b_P.cartonS); rect(254, 36, 268, 45, C.k); rect(255, 37, 267, 45, hex('#e8e0c8')); rect(255, 40, 267, 41, C.rojo);
    for (const x of [236, 241, 246]) { rect(x, 27, x + 2, 32, hex('#c8d8e4')); pset(x + 1, 28, C.blanco); rect(x, 31, x + 2, 31, C.k); }
    // los dos osciloscopios (las ondas en cada fotograma)
    for (const x of [194, 232]) { rect(x, 50, x + 34, 75, C.k); rect(x + 1, 51, x + 33, 75, b_P.beige); rect(x + 1, 51, x + 33, 51, b_P.beigeL); rect(x + 33, 51, x + 33, 75, b_P.beigeS);
      disco(x + 12, 63, 10, C.k); disco(x + 12, 63, 9, b_P.fosforo); for (let j = -8; j <= 8; j += 4) for (let i = -8; i <= 8; i++) if (i * i + j * j < 72) pset(x + 12 + i, 63 + j, hex('#16402a')); for (let i = -8; i <= 8; i += 4) for (let j = -8; j <= 8; j++) if (i * i + j * j < 72) pset(x + 12 + i, 63 + j, hex('#16402a'));
      for (const [dx, dy] of [[27, 55], [27, 62], [27, 69]]) { disco(x + dx, dy, 2, C.k); pset(x + dx, dy - 1, C.metalL); } }
    // el magnetofón de bobinas
    rect(194, 80, 248, 103, C.k); rect(195, 81, 247, 103, hex('#5a5e66')); rect(195, 81, 247, 81, hex('#7a7e86')); rect(198, 98, 244, 102, hex('#3a3e46')); for (const x of [202, 210, 218, 226, 234]) rect(x, 99, x + 5, 101, hex('#d8dce4'));
    rect(214, 84, 228, 90, C.k); rect(215, 85, 227, 89, hex('#e8dca0'));
    rect(252, 86, 268, 103, C.k); rect(253, 87, 267, 103, b_P.carton); for (let k = 0; k < 3; k++) { disco(257 + k * 4, 84, 2, hex('#d8d4c8')); pset(257 + k * 4, 84, C.k); }
    // cables que cuelgan de los estantes
    for (const [x0, x1, y, c, cae] of [[200, 222, 77, C.k, 9], [212, 246, 47, C.rojoS, 7], [246, 266, 77, hex('#3a3a8a'), 12]]) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0); pset(x, Math.round(y + Math.sin(u * Math.PI) * cae), c); }
    // el perchero con la gabardina y el sombrero
    rect(284, 50, 306, 52, C.k); rect(285, 50, 305, 50, C.maderaL); for (const x of [288, 302]) rect(x, 52, x + 1, 55, C.metalD);
    R.poligono([[285, 56], [298, 54], [304, 60], [306, 100], [282, 100], [283, 62]], b_P.gabardinaS); R.poligono([[286, 57], [297, 55], [302, 61], [303, 98], [285, 98], [285, 63]], b_P.gabardina);
    linea(294, 58, 293, 98, b_P.gabardinaS); for (const y of [70, 80, 90]) pset(296, y, C.k); rect(284, 78, 304, 79, b_P.gabardinaS);
    // el radiador de hierro bajo la ventana, con sus elementos y la llave
    rect(122, 86, 172, 107, C.k); for (let x = 123; x < 172; x++) { const e = (x - 123) % 5; for (let y = 87; y < 107; y++) pset(x, y, e === 0 ? hex('#6a7270') : e === 1 ? hex('#b4bcb8') : y === 87 || y === 106 ? hex('#6a7270') : hex('#949c98')); } rect(122, 104, 172, 105, hex('#5a6260')); rect(172, 100, 178, 102, C.k); disco(176, 99, 2, C.rojo); for (const x of [126, 166]) rect(x, 107, x + 2, 110, C.k);
    // el extintor
    rect(106, 88, 112, 108, C.k); rect(107, 89, 111, 107, C.rojo); rect(107, 89, 107, 107, hex('#e86a5a')); rect(108, 85, 110, 88, C.k); linea(111, 86, 114, 92, C.k); rect(107, 96, 111, 99, hex('#e8e4d0'));
    // cajas de cartón con cables en el suelo
    rect(2, 124, 34, 152, C.k); rect(3, 125, 33, 152, b_P.carton); rect(3, 125, 33, 126, b_P.cartonL); rect(16, 125, 19, 152, b_P.cartonS); rect(5, 112, 28, 124, C.k); rect(6, 113, 27, 124, b_P.cartonL); rect(6, 113, 27, 114, hex('#d8bc8a'));
    for (let x = 4; x < 34; x++) pset(x, 118 + Math.round(Math.sin(x * 0.5) * 2), C.k);
    // la cesta de mimbre con el cojín, el cuenco y el ovillo
    { const cx = 267, cy = 146; for (let j = -8; j <= 7; j++) for (let i = -20; i <= 20; i++) { const d = (i / 20) ** 2 + (j / 8) ** 2; if (d > 1) continue; pset(cx + i, cy + j, d > 0.82 ? C.k : (j < -1 && (i / 16) ** 2 + ((j + 3) / 4.5) ** 2 < 1) ? (j < -4 ? b_P.cojinL : b_P.cojin) : ((i + (j >> 1) * 2) & 3) === 0 ? b_P.mimbreS : (j & 1) ? b_P.mimbre : b_P.mimbreL); }
      R.poligono([[cx - 15, cy - 3], [cx + 15, cy - 3], [cx + 13, cy], [cx - 13, cy]], b_P.cojinS); rect(cx - 17, cy + 7, cx + 17, cy + 8, b_P.linoS); }
    disco(296, 152, 4, C.k); rect(292, 149, 300, 152, hex('#3a6ac8')); rect(293, 149, 299, 149, hex('#e8d8b0'));
    disco(240, 156, 3, hex('#c83a7a')); R.anillo(240, 156, 2, hex('#e86aa8')); linea(242, 157, 248, 160, hex('#c83a7a'));
  });
  // el fluorescente (a ratos parpadea) y su luz
  const parp = Math.sin(t * 23) > 0.6 && (t % 7) < 0.6;
  rect(186, 3, 250, 5, parp ? hex('#9aa4a0') : hex('#f4fbf6')); rect(186, 5, 250, 5, parp ? b_P.techoS : hex('#c8e4d8'));
  // el exterior por las rendijas de la persiana: nubes y un pájaro
  R.recorte([116, 17, 178, 44]); b_nubes(R, t, null, 20, 38, [hex('#b4c8de'), hex('#e6eef6'), hex('#ffffff'), hex('#9ab4d0')], 0.6, 3, 4); b_pajaros(R, t, 2, 22, 36, hex('#2a2e3a'), 10, 4); R.recorte(null);
  // las lamas (inclinadas: se ve el exterior entre ellas) y el cordón
  for (let y = 18; y < 70; y += 4) { rect(116, y, 178, y, hex('#f2eee2')); rect(116, y + 1, 178, y + 1, hex('#c8c2b0')); }
  rect(116, 15, 178, 17, hex('#b8b2a0')); linea(176, 16, 176, 60 + Math.round(Math.sin(t * 0.8) * 1), hex('#e8e4d4')); disco(176, 61, 1, hex('#c8c2b0'));
  // los osciloscopios: la onda de cada uno
  for (const [x, k] of [[194, 0], [232, 1]]) { R.recorte([x + 3, 54, x + 21, 72]);
    for (let i = -9; i <= 9; i++) { const yy = 63 + Math.round(k ? Math.sin(i * 0.7 + t * 6) * 5 * Math.cos(t * 0.7) : (((i + Math.floor(t * 12)) % 6 + 6) % 6 < 3 ? -3 : 3) + Math.sin(t * 9 + i) * 0.6), y2 = 63 + Math.round(k ? Math.sin((i + 1) * 0.7 + t * 6) * 5 * Math.cos(t * 0.7) : ((((i + 1) + Math.floor(t * 12)) % 6 + 6) % 6 < 3 ? -3 : 3));
      if (i * i + (yy - 63) ** 2 < 82) { linea(x + 12 + i, yy, x + 13 + i, y2, b_P.onda); pset(x + 12 + i, yy + 1, b_P.ondaS); } }
    R.recorte(null); pset(x + 5, 57, hex('#3a7a4a')); }
  // el magnetofón: bobinas que giran, la aguja del vúmetro y el piloto
  b_bobina(R, 204, 89, 7, t * 3.1); b_bobina(R, 238, 89, 7, t * 3.1 + 1); linea(204, 96, 238, 96, hex('#5a3a2a'));
  { const a = -0.8 + Math.abs(Math.sin(t * 5.3) * Math.sin(t * 2.1)) * 1.4; linea(221, 89, 221 + Math.round(Math.sin(a) * 5), 89 - Math.round(Math.cos(a) * 4), C.k); }
  pset(244, 84, Math.floor(t * 2) % 2 ? C.rojo : hex('#5a1a1a'));
  // motas de polvo que flotan en la luz
  for (let k = 0; k < 10; k++) { const u = ((t * 0.04 + h(k, 0, 405)) % 1), x = Math.round(130 + h(k, 1, 405) * 70 + Math.sin(t * 0.7 + k) * 4), y = Math.round(150 - u * 60); if (h(x, y, 406) < 0.8) b_tine(R, x, y, b_P.sol, 0.55); }
  return { suelo: 158, detrasBanco: 142, banco: [66, 136, 234], cesta: [267, 146], ventana: [114, 14, 180, 72] };
}

// el banco de trabajo del taller, por delante de los personajes: tablero, frente con cajones, tornillo, lupa, soldador
// que humea, la pila, el microfonito, el carrete y el flexo con su luz
function b_tallerDelante(R, t, o) {
  const { rect, pset, linea, disco } = R;
  // el tablero
  rect(64, 133, 236, 138, C.k); for (let x = 65; x <= 235; x++) { pset(x, 134, b_P.bancoL); pset(x, 135, h(x >> 2, 1, 407) < 0.2 ? b_P.bancoS : b_P.banco); pset(x, 136, h(x >> 3, 2, 407) < 0.25 ? b_P.bancoS : b_P.banco); pset(x, 137, b_P.bancoS); }
  // el frente cerrado: tablas pintadas, dos cajoneras y las patas
  rect(66, 139, 234, 170, C.k); for (let y = 140; y <= 169; y++) for (let x = 67; x <= 233; x++) pset(x, y, (x - 67) % 14 === 0 ? b_P.frenteS : (x - 67) % 14 === 1 ? b_P.frenteL : h(x, y >> 2, 408) < 0.05 ? b_P.frenteS : b_P.frente);
  rect(67, 140, 233, 141, b_P.frenteS);
  for (const x0 of [74, 182]) { rect(x0, 144, x0 + 44, 166, C.k); for (let k = 0; k < 3; k++) { const y = 145 + k * 7; rect(x0 + 1, y, x0 + 43, y + 5, b_P.frenteL); rect(x0 + 1, y + 5, x0 + 43, y + 5, b_P.frenteS); rect(x0 + 18, y + 2, x0 + 26, y + 3, C.k); rect(x0 + 19, y + 2, x0 + 25, y + 2, C.metalL); } }
  for (const x of [66, 230]) { rect(x, 168, x + 4, 176, C.k); rect(x + 1, 168, x + 3, 175, b_P.frenteS); }
  // el tornillo de banco
  rect(68, 124, 84, 133, C.k); rect(69, 125, 83, 132, hex('#3a5a8a')); rect(69, 125, 83, 125, hex('#5a7aaa')); rect(73, 121, 79, 124, C.metalD); linea(64, 128, 90, 128, C.metalL); disco(64, 128, 1, C.k); disco(90, 128, 1, C.k);
  // la lupa en su brazo, con el brillo que pasa
  linea(96, 133, 96, 122, C.k); linea(97, 133, 97, 122, C.metalD); rect(92, 132, 101, 133, C.k); disco(100, 116, 6, C.k); disco(100, 116, 5, C.metalL); disco(100, 116, 4, hex('#bfe0ee'));
  { const g = Math.round(((t * 0.6) % 2) * 6) - 4; if (g > -4 && g < 4) { pset(100 + g, 113, C.blanco); pset(99 + g, 114, C.blanco); } pset(98, 114, C.blanco); }
  // el soldador en su muelle, con la punta al rojo y el humo
  for (let k = 0; k < 6; k++) R.anillo(124 + k * 2, 129, 2, k % 2 ? C.metal : C.metalD); rect(120, 131, 138, 133, C.k);
  linea(114, 126, 140, 128, hex('#2a2a2a')); linea(130, 127, 140, 128, C.rojo); linea(130, 126, 140, 127, hex('#e86a5a')); pset(113, 126, Math.floor(t * 3) % 2 ? hex('#ff8a3a') : hex('#ffb84a'));
  b_humo(R, 113, 124, t, 22, hex('#b8bcc4'), hex('#e8ecf0'), 6, 7);
  // la pila, el microfonito con su cable y el carrete de estaño
  rect(150, 128, 162, 133, C.k); rect(151, 129, 161, 132, hex('#3a3a44')); rect(151, 129, 155, 132, hex('#c87a3a')); rect(151, 129, 161, 129, hex('#6a6a7a'));
  disco(172, 131, 2, C.k); pset(172, 130, C.metalL); linea(162, 131, 170, 131, hex('#c8303a'));
  for (let x = 174; x < 196; x++) pset(x, 132 + Math.round(Math.sin(x * 0.6) * 0.8), hex('#c8303a'));
  disco(196, 130, 3, C.k); disco(196, 130, 2, hex('#d8d8e0')); pset(196, 130, C.k);
  // el flexo con su luz sobre el tablero
  rect(224, 131, 234, 133, C.k); linea(229, 131, 222, 112, C.k); linea(230, 131, 223, 112, C.metalD); linea(222, 112, 210, 104, C.k); linea(222, 113, 210, 105, C.metalD); disco(222, 112, 1, C.metalL);
  R.poligono([[204, 101], [214, 100], [218, 108], [202, 110]], C.k); R.poligono([[205, 102], [213, 101], [216, 107], [204, 108]], hex('#3a6a4a')); rect(205, 108, 214, 109, hex('#fff2c8'));
  for (let y = 110; y <= 133; y++) { const w = (y - 110) * 0.7; for (let x = Math.round(209 - w); x <= 209 + w; x++) if (y >= 134 || y > 131 || b_umbral(x, y) < 0.18) b_tine(R, x, y, b_P.sol, 0.3); }
  for (let x = 186; x < 232; x++) b_tine(R, x, 134, b_P.sol, 0.4);
}

// el banco del taller de cerca (inserto)
function b_tallerMesa(R, t, o) {
  const { rect, pset, linea, disco } = R;
  b_fijo(R, 'tallerMesa', () => {
    const B = R.buf;
    // el panel perforado desenfocado al fondo, con siluetas de herramientas
    for (let y = 0; y < 58; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x % 8 < 2 && y % 8 < 2) ? b_P.perfS : (y < 6 && b_umbral(x, y) < (6 - y) / 6) ? b_P.perfS : b_P.perf;
    for (const [x, w, hh, c] of [[12, 8, 40, C.madera], [30, 4, 30, C.rojo], [42, 4, 34, C.amarillo], [56, 6, 44, C.metal], [70, 6, 36, C.metal], [140, 12, 24, hex('#c87a3a')], [164, 4, 30, hex('#3a6ac8')]]) { rect(x + 2, 12, x + w + 2, 12 + hh + 2, b_P.silu); rect(x, 10, x + w, 10 + hh, c); rect(x, 10, x, 10 + hh, b_mezcla(c, C.blanco, 0.3)); }
    rect(92, 14, 126, 44, b_P.silu); rect(90, 12, 124, 42, hex('#3a4a5a')); for (let k = 0; k < 4; k++) rect(93 + k * 8, 15, 98 + k * 8, 39, [C.rojo, C.amarillo, hex('#3ac86a'), hex('#5a8ae8')][k]);
    // el magnetofón al fondo (las bobinas giran en cada fotograma)
    rect(196, 14, 264, 56, C.k); rect(197, 15, 263, 56, hex('#5a5e66')); rect(197, 15, 263, 16, hex('#7a7e86')); rect(222, 22, 238, 30, C.k); rect(223, 23, 237, 29, hex('#e8dca0')); rect(200, 48, 260, 54, hex('#3a3e46')); for (let k = 0; k < 6; k++) rect(203 + k * 10, 49, 209 + k * 10, 53, hex('#d8dce4'));
    // el tablero: tablas con vetas, la luz del flexo y el canto de delante
    rect(0, 57, 319, 59, C.k); b_tablas(R, 0, 60, 319, 171, b_P.banco, b_P.bancoS, b_P.bancoL, b_P.bancoD, 409, 14);
    for (let y = 60; y < 172; y++) for (let x = 0; x < 320; x++) { const d = ((x - 190) / 150) ** 2 + ((y - 112) / 70) ** 2; if (d < 1 && b_umbral(x, y) < (1 - d) * 0.8) B[y * 320 + x] = b_mezcla(B[y * 320 + x], b_P.sol, 0.22); else if (d > 1.6 && b_umbral(x, y) < 0.5) B[y * 320 + x] = b_mezcla(B[y * 320 + x], C.k, 0.18); }
    rect(0, 172, 319, 179, b_P.bancoD); rect(0, 172, 319, 172, b_P.bancoL); for (let x = 0; x < 320; x += 23) rect(x, 175, x + 9, 175, b_P.bancoS);
    // el esquema técnico azul (sin letras): pila, resistencia, bobina, antena y micrófono
    R.poligono([[22, 86], [132, 82], [136, 150], [26, 154]], C.k); R.poligono([[23, 87], [131, 83], [135, 149], [27, 153]], b_P.azulP);
    for (let k = 0; k < 18; k++) { linea(28 + k * 6, 85, 31 + k * 6, 151, b_P.azulPL); } for (let k = 0; k < 11; k++) linea(23, 92 + k * 6, 133, 88 + k * 6, b_P.azulPL);
    const L = b_P.lineaP; linea(36, 104, 120, 101, L); linea(36, 104, 38, 140, L); linea(38, 140, 124, 137, L); linea(120, 101, 122, 118, L);
    rect(34, 112, 41, 112, L); rect(36, 115, 39, 115, L);   // la pila
    for (let k = 0; k < 6; k++) linea(60 + k * 4, 103 + (k % 2 ? 4 : -2), 62 + k * 4, 103 + (k % 2 ? -2 : 4), L);   // la resistencia
    for (let k = 0; k < 4; k++) R.anillo(88 + k * 5, 102, 2, L);   // la bobina
    linea(122, 118, 122, 108, L); linea(118, 108, 126, 108, L); linea(119, 105, 125, 105, L); linea(120, 102, 124, 102, L);   // la antena
    R.anillo(80, 138, 5, L); linea(76, 138, 84, 138, L);   // el micrófono
    rect(100, 140, 128, 148, L); rect(101, 141, 127, 147, b_P.azulP); for (const y of [143, 145]) linea(103, y, 124, y, L);   // el cajetín
    R.poligono([[22, 86], [32, 86], [24, 96]], hex('#e8eef4'));   // la esquina doblada
    // la taza
    disco(118, 82, 9, C.k); disco(118, 82, 8, hex('#e8e4d8')); disco(118, 82, 6, hex('#5a3a22')); disco(117, 81, 3, hex('#7a5232')); R.anillo(129, 84, 3, C.k);
    // el fieltro con el micrófono diminuto (agrandado), el cable fino y la pila
    R.poligono([[158, 106], [202, 104], [204, 132], [160, 134]], hex('#2a5a3a')); R.poligono([[160, 107], [200, 105], [202, 130], [162, 132]], hex('#3a7a4a'));
    disco(181, 115, 6, C.k); disco(181, 115, 5, hex('#c8ccd4')); for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) if ((i + j) % 2 === 0 && i * i + j * j < 16) pset(181 + i, 115 + j, hex('#8a909a')); pset(179, 113, C.blanco); pset(180, 112, C.blanco);
    rect(178, 121, 184, 126, C.k); rect(179, 121, 183, 125, hex('#5a5e66')); rect(179, 121, 179, 125, hex('#8a8e96'));
    for (let x = 184; x < 214; x++) { const u = (x - 184) / 30; pset(x, Math.round(124 + Math.sin(u * Math.PI) * 9), hex('#c8303a')); }
    rect(214, 129, 242, 141, C.k); rect(215, 130, 241, 140, hex('#3a3a44')); rect(215, 130, 222, 140, hex('#c87a3a')); rect(215, 130, 241, 131, hex('#6a6a7a')); rect(223, 133, 241, 134, hex('#e8c040')); rect(242, 133, 244, 137, C.metalL);
    for (let x = 244; x < 320; x++) { const u = (x - 244) / 76; pset(x, Math.round(135 + u * 26 + Math.sin(u * 9) * 3), hex('#c8303a')); }
    // el carrete de estaño, pinzas, tornillos y un destornillador
    disco(278, 150, 9, C.k); disco(278, 150, 8, hex('#b8bcc4')); disco(278, 150, 5, hex('#8a8e96')); disco(278, 150, 2, C.k); for (let k = 0; k < 8; k++) pset(278 + Math.round(Math.cos(k) * 7), 150 + Math.round(Math.sin(k) * 7), C.blanco);
    linea(150, 150, 190, 160, C.metalD); linea(150, 151, 190, 158, C.metalL); for (const [x, y] of [[200, 150], [208, 156], [196, 162], [250, 116]]) { disco(x, y, 1, C.metalD); pset(x, y, C.metalL); }
    rect(40, 160, 96, 162, C.k); rect(40, 160, 62, 161, hex('#e8c040')); rect(63, 161, 96, 161, C.metalL);
    // el muelle del soldador
    for (let k = 0; k < 10; k++) R.anillo(262 + k * 3, 112, 4, k % 2 ? C.metal : C.metalD); rect(256, 116, 298, 120, C.k); rect(257, 117, 297, 119, hex('#3a3e46'));
  });
  // las bobinas del fondo
  b_bobina(R, 212, 34, 10, t * 2.6); b_bobina(R, 250, 34, 10, t * 2.6 + 1.2); linea(212, 45, 250, 45, hex('#5a3a2a'));
  // la lupa articulada (el cristal agranda y aclara lo de debajo) con el brillo que pasa
  linea(150, 60, 156, 80, C.k); linea(151, 60, 157, 80, C.metalD); linea(156, 80, 162, 90, C.metalD); disco(156, 80, 2, C.k);
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) if (i * i + j * j <= 144) b_tine(R, 170 + i, 98 + j, hex('#d8f0ff'), 0.25);
  R.anillo(170, 98, 13, C.k); R.anillo(170, 98, 12, C.metalL); R.anillo(170, 98, 14, C.metalD);
  { const g = ((t * 0.5) % 2.2) - 1.1; for (let k = -8; k <= 8; k++) { const x = Math.round(170 + g * 12 + k * 0.4), y = 98 + k; if ((x - 170) ** 2 + (y - 98) ** 2 < 120) pset(x, y, C.blanco); } }
  // el soldador: punta al rojo y su humo; la taza humea
  linea(254, 108, 300, 110, hex('#2a2a2a')); linea(254, 107, 300, 109, hex('#4a4a4a')); rect(286, 106, 312, 112, C.k); rect(287, 107, 311, 111, C.rojo); rect(287, 107, 311, 107, hex('#e86a5a'));
  pset(252, 108, Math.floor(t * 3) % 2 ? hex('#ff8a3a') : hex('#ffd04a')); pset(253, 108, hex('#e85a2a'));
  b_humo(R, 251, 105, t, 40, hex('#9aa0a8'), hex('#dfe4ea'), 7, 3); b_humo(R, 118, 76, t + 2, 26, hex('#c8c8cc'), hex('#f0f0f2'), 5, 9);
  return { suelo: 172, microfono: [181, 118], pila: [228, 135], lupa: [170, 98], soldador: [252, 108], mano: [200, 150] };
}

const b_CIELO_P = [[0, hex('#4a86c8')], [0.25, hex('#5e98d4')], [0.5, hex('#7aaede')], [0.72, hex('#9cc4e6')], [0.88, hex('#c2d8e6')], [1, hex('#e2e4d8')]];

function b_fachadas(R, y1, k = 0) {
  const { rect, pset, poligono, disco } = R;
  let x = -6, n = 0;
  while (x < 330) { const w = 40 + Math.round(h(n, 1, 420 + k) * 22), cerca = x > 258, top = Math.round((cerca ? 52 : 34) + h(n, 2, 420 + k) * 10), col = [b_P.fachada1, b_P.fachada2, b_P.fachada3][n % 3], colS = b_mezcla(col, hex('#5a4a3a'), 0.25), colL = b_mezcla(col, C.blanco, 0.3);
    const x0 = x, x1 = x + w;
    // el tejado de pizarra (mansarda) con buhardillas y chimeneas
    poligono([[x0 - 1, top], [x0 + 4, top - 9], [x1 - 4, top - 9], [x1 + 1, top]], b_P.pizarraTS); poligono([[x0 + 1, top], [x0 + 5, top - 8], [x1 - 5, top - 8], [x1 - 1, top]], b_P.pizarraT);
    for (let yy = top - 7; yy < top; yy += 2) rect(x0 + 4, yy, x1 - 4, yy, b_P.pizarraTL);
    for (let dx = x0 + 8; dx < x1 - 8; dx += 12) { rect(dx, top - 7, dx + 5, top - 1, C.k); rect(dx + 1, top - 6, dx + 4, top - 1, colL); rect(dx + 2, top - 4, dx + 3, top - 1, b_P.vidrioV); poligono([[dx - 1, top - 7], [dx + 2.5, top - 10], [dx + 6, top - 7]], b_P.pizarraTS); }
    for (const cx of [x0 + 6, x1 - 10]) { rect(cx, top - 15, cx + 4, top - 8, C.k); rect(cx + 1, top - 14, cx + 3, top - 8, b_P.ladrillo ?? col); rect(cx, top - 15, cx + 4, top - 15, colS); pset(cx + 1, top - 16, hex('#a85a3a')); pset(cx + 3, top - 16, hex('#a85a3a')); }
    // la fachada: cornisa, pisos, ventanas con contraventanas, balcones y el bajo con toldos
    rect(x0, top, x1, y1, col); rect(x0, top, x1, top + 1, colL); rect(x0, top + 2, x1, top + 2, colS); rect(x1, top, x1, y1, colS); rect(x0, top, x0, y1, C.k);
    for (let yy = top + 4; yy < y1; yy++) for (let xx = x0 + 1; xx < x1; xx++) if (h(xx >> 1, yy >> 1, 421) < 0.05) pset(xx, yy, colS);
    const filas = []; for (let yy = top + 5; yy < y1 - 16; yy += 11) filas.push(yy);
    filas.forEach((yy, f) => { rect(x0 + 1, yy + 9, x1 - 1, yy + 9, colS);
      for (let dx = x0 + 5; dx < x1 - 5; dx += 9) { rect(dx - 2, yy, dx - 2, yy + 7, b_P.persiana); rect(dx + 4, yy, dx + 4, yy + 7, b_P.persiana); rect(dx - 1, yy, dx + 3, yy + 7, C.k); rect(dx, yy + 1, dx + 2, yy + 7, h(dx, yy, 422) < 0.25 ? hex('#e8d8a8') : b_P.vidrioV); pset(dx, yy + 1, b_P.vidrioVL); rect(dx - 1, yy - 1, dx + 3, yy - 1, colL);
        if (f === 0 && (dx - x0) % 18 < 9) { rect(dx - 2, yy + 8, dx + 4, yy + 8, C.k); for (let q = dx - 2; q <= dx + 4; q += 2) pset(q, yy + 7, C.k); }
        if (f === 1 && h(dx, f, 423) < 0.3) { rect(dx - 1, yy + 8, dx + 3, yy + 8, hex('#8a5a3a')); pset(dx, yy + 7, C.rojo); pset(dx + 2, yy + 7, hex('#e8a0c0')); pset(dx + 1, yy + 7, C.hierba); } } });
    const yb = y1 - 13; rect(x0 + 1, yb, x1 - 1, y1, colS); for (let dx = x0 + 4; dx < x1 - 6; dx += 12) { rect(dx, yb + 3, dx + 7, y1, C.k); rect(dx + 1, yb + 4, dx + 6, y1, (n + dx) % 3 ? b_P.vidrioV : hex('#e8c878')); pset(dx + 1, yb + 4, b_P.vidrioVL); }
    if (n % 2 === 0) for (let dx = x0 + 3; dx < x1 - 3; dx++) { const ty = yb + ((dx - x0) % 4 < 2 ? 0 : 0); pset(dx, ty, C.k); pset(dx, ty + 1, ((dx - x0) >> 1) % 2 ? b_P.toldo1 : b_P.toldo2); pset(dx, ty + 2, ((dx - x0) >> 1) % 2 ? b_P.toldo1 : b_P.toldo2); if ((dx - x0) % 4 === 0) pset(dx, ty + 3, b_P.toldo1); }
    x = x1 + 1; n++; }
}

function b_parque(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, HOR = 98;
  const cieloS = new Set(b_CIELO_P.map(([, c]) => c));
  const fb = b_fijo(R, 'parque', () => {
    b_degradado(R, 0, 0, 319, 60, b_CIELO_P);
    // la cúpula verde de cobre con su linterna, detrás de las fachadas
    { const cx = 214; rect(cx - 15, 28, cx + 15, 42, C.k); rect(cx - 14, 29, cx + 14, 42, b_P.fachada1); for (let dx = -12; dx <= 12; dx += 4) rect(cx + dx, 30, cx + dx + 1, 41, b_P.fachadaS); rect(cx - 14, 29, cx + 14, 29, C.blanco);
      for (let j = 0; j <= 12; j++) { const w = Math.round(Math.sqrt(1 - (j / 13) ** 2) * 14); rect(cx - w, 28 - j, cx + w, 28 - j, j > 9 ? b_P.cobreL : b_P.cobre); pset(cx - w, 28 - j, C.k); pset(cx + w, 28 - j, C.k); for (let q = -w + 3; q < w; q += 5) pset(cx + q, 28 - j, b_P.cobreS); pset(cx - w + 2, 28 - j, b_P.cobreL); }
      rect(cx - 2, 11, cx + 2, 16, C.k); rect(cx - 1, 12, cx + 1, 16, b_P.fachada1); rect(cx, 7, cx, 11, C.k); disco(cx, 7, 1, C.laton ?? hex('#c8a040')); }
    b_fachadas(R, 92, 0);
    // la acera de enfrente, la calle adoquinada y el bordillo
    rect(0, 92, 319, 95, hex('#b8b4ac')); rect(0, 92, 319, 92, hex('#d8d4cc')); rect(0, 95, 319, 95, hex('#8a8680'));
    for (let y = 96; y < 112; y++) for (let x = 0; x < 320; x++) { const f = (y - 96) >> 1, xx = x + (f % 2) * 2; R.buf[y * 320 + x] = ((y - 96) % 2 === 1 || xx % 4 === 0) ? b_P.adoquinS : h(xx >> 2, f, 424) < 0.25 ? b_P.adoquinL : b_P.adoquin; }
    rect(0, 111, 319, 113, b_P.piedraFS); rect(0, 111, 319, 111, b_P.piedraFL);
    // el parque: césped con matas, el paseo del fondo y la plaza de grava en torno a la fuente
    for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) {
      const pl = ((x - 182) / 132) ** 2 + ((y - 146) / 30) ** 2, paseo = y >= 118 && y <= 127, camino = y > 150 && Math.abs(x - 120 + (y - 150) * 1.2) < 18 + (y - 150) * 0.4; let c;
      if (paseo || pl < 1 || camino) { const q = h(x, y, 425); c = q < 0.12 ? b_P.gravaS : q > 0.9 ? b_P.gravaL : b_P.grava; if (paseo && (y === 118 || y === 127)) c = b_P.gravaS; if (pl > 0.94 && pl < 1) c = b_P.cespedS; }
      else { const q = h(x, y, 426), m = h(x >> 3, y >> 2, 427); c = m < 0.3 ? b_P.cespedS : b_P.cesped; if (q < 0.08) c = b_P.cespedL; else if (q > 0.94) c = b_P.cespedS; if ((x + (y >> 1)) % 7 === 0 && q < 0.4) c = b_P.cespedL; }
      R.buf[y * 320 + x] = c; }
    for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 3, 428) * 320), y = Math.round(130 + h(k, 4, 428) * 46); if (((x - 182) / 132) ** 2 + ((y - 146) / 30) ** 2 < 1.1) continue; disco(x, y, 2, b_P.cespedS); pset(x - 1, y - 1, b_P.cespedL); if (k % 3 === 0) pset(x + 1, y - 2, [C.amarillo, C.blanco, hex('#e86aa8')][k % 3]); }
    // la fuente: el pilón de piedra (el agua y el chorro en cada fotograma)
    for (let j = -10; j <= 10; j++) for (let i = -38; i <= 38; i++) { const d = (i / 38) ** 2 + (j / 10) ** 2; if (d > 1) continue; pset(182 + i, 134 + j, d > 0.86 ? (j < 0 ? b_P.piedraFL : b_P.piedraFS) : d > 0.72 ? b_P.piedraF : b_P.agua); }
    rect(144, 134, 220, 138, b_P.piedraFS); for (let j = 0; j <= 4; j++) { const w = Math.round(Math.sqrt(1 - ((j + 6) / 10) ** 2) * 38); rect(182 - w, 138 + j, 182 + w, 138 + j, j === 4 ? C.k : b_P.piedraFS); } for (let x = 146; x < 220; x += 9) rect(x, 136, x, 140, b_P.piedraF);
    rect(179, 112, 185, 130, C.k); rect(180, 112, 184, 130, b_P.piedraF); rect(180, 112, 180, 130, b_P.piedraFL); for (let j = -2; j <= 2; j++) { const w = Math.round(Math.sqrt(1 - (j / 3) ** 2) * 11); rect(182 - w, 112 + j, 182 + w, 112 + j, j < 0 ? b_P.piedraFL : b_P.piedraFS); }
    // las farolas
    for (const lx of [86, 244]) { rect(lx, 86, lx + 1, 128, b_P.hierro); rect(lx - 2, 124, lx + 3, 128, b_P.hierro); rect(lx - 1, 108, lx + 2, 109, b_P.hierroL); rect(lx - 3, 78, lx + 4, 86, C.k); rect(lx - 2, 79, lx + 3, 85, hex('#e8e4d0')); rect(lx - 4, 77, lx + 5, 78, b_P.hierro); pset(lx, 75, b_P.hierro); pset(lx + 1, 76, b_P.hierro); }
    // el banco del fondo y el respaldo del banco grande (el asiento, en animalesDelante)
    rect(22, 118, 52, 120, C.k); rect(23, 118, 51, 119, b_P.banquitoL); rect(22, 122, 52, 123, b_P.banquito); for (const x of [24, 50]) rect(x, 120, x, 127, b_P.hierro);
    for (let k = 0; k < 3; k++) { const y = 136 + k * 4; rect(206, y, 256, y + 2, C.k); rect(207, y, 255, y + 1, k === 0 ? b_P.banquitoL : b_P.banquito); }
    for (const x of [208, 254]) { rect(x, 134, x + 1, 148, b_P.hierro); pset(x, 133, b_P.hierroL); }
    // los dos castaños: el de la izquierda, más cerca (copa en tres tonos con las velas blancas de las flores)
    for (const [cx, cy, rx, ry, sem] of [[118, 72, 32, 24, 1], [270, 76, 30, 22, 2]]) {
      for (let k = 0; k < 14; k++) { const a = h(k, sem, 429) * Math.PI * 2, rr = Math.sqrt(h(k, sem, 430)), bx = Math.round(cx + Math.cos(a) * rx * 0.65 * rr), by = Math.round(cy + Math.sin(a) * ry * 0.6 * rr), r = 9 + Math.round(h(k, sem, 431) * 6); disco(bx, by + 1, r + 1, b_P.hojaS); }
      for (let k = 0; k < 14; k++) { const a = h(k, sem, 429) * Math.PI * 2, rr = Math.sqrt(h(k, sem, 430)), bx = Math.round(cx + Math.cos(a) * rx * 0.65 * rr), by = Math.round(cy + Math.sin(a) * ry * 0.6 * rr), r = 9 + Math.round(h(k, sem, 431) * 6); disco(bx - 1, by - 1, r - 1, b_P.hoja); disco(bx - 3, by - 4, Math.max(2, r - 6), b_P.hojaL); }
      for (let k = 0; k < 40; k++) { const x = Math.round(cx + (h(k, sem, 432) - 0.5) * rx * 1.7), y = Math.round(cy + (h(k, sem, 433) - 0.5) * ry * 1.5); if (R.pget(x, y) === b_P.hoja || R.pget(x, y) === b_P.hojaL) { pset(x, y, b_P.flor); pset(x, y - 1, b_P.flor); pset(x, y + 1, hex('#e8c8b8')); } }
      for (let k = 0; k < 60; k++) { const x = Math.round(cx + (h(k, sem, 434) - 0.5) * rx * 1.8), y = Math.round(cy + (h(k, sem, 435) - 0.5) * ry * 1.6); if (R.pget(x, y) === b_P.hoja) pset(x, y, b_P.hojaS); } }
  });
  // las nubes (solo donde se ve el cielo) y los pájaros
  const ok = (x, y) => cieloS.has(fb[y * 320 + x]);
  b_nubes(R, t, ok, 6, 34, [hex('#b8cce2'), hex('#e8f0f8'), hex('#ffffff'), hex('#a8bcd6')], 1, 11, 7); b_pajaros(R, t, 3, 12, 30, hex('#3a3e4a'), 13, 12, ok);
  // los paseantes de la acera de enfrente
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, x = d > 0 ? ((t * (5 + k) + k * 120) % 360) - 20 : 340 - ((t * (4 + k) + k * 90) % 360); b_paseante(R, x, 94, t, k + 3, { dir: d, sombrero: k === 1 }); }
  // coches de los sesenta que pasan por la calle (por el carril de detrás de la furgoneta)
  for (let k = 0; k < 2; k++) { const d = k ? -1 : 1, u = ((t * 0.05 + k * 0.55) % 1), x = Math.round(d > 0 ? lerp(-40, 360, u) : lerp(360, -40, u)), y = k ? 104 : 101, c = [hex('#c8a040'), hex('#7a3a5a')][k], cS = b_mezcla(c, C.k, 0.35);
    for (let j = -9; j <= 0; j++) { const w = j < -5 ? 8 : 13; rect(x - w, y + j, x + w, y + j, j === -9 ? C.k : c); pset(x - w, y + j, C.k); pset(x + w, y + j, C.k); }
    rect(x - 6, y - 8, x + 6, y - 6, b_P.vidrioVL); rect(x - 1, y - 8, x, y - 6, c); rect(x - 13, y - 2, x + 13, y - 1, cS); rect(x - 12, y - 4, x + 12, y - 4, b_mezcla(c, C.blanco, 0.35));
    for (const dx of [-8, 8]) { disco(x + dx, y + 1, 3, C.k); disco(x + dx, y + 1, 1, C.metal); } pset(x + 13 * d, y - 3, hex('#f8f0c0')); }
  // la furgoneta gris de chapa ondulada, aparcada, con la antena de látigo que se mece
  if (o.furgoneta !== false) { const x0 = 8, x1 = 74, y1 = 110;
    rect(x0, y1 - 26, x1, y1 - 4, C.k); rect(x0 + 1, y1 - 25, x1 - 1, y1 - 5, b_P.furgo); rect(x0 + 1, y1 - 25, x1 - 1, y1 - 24, b_P.furgoL);
    for (let x = x0 + 16; x < x1 - 2; x += 3) rect(x, y1 - 20, x, y1 - 7, (x / 3) % 2 ? b_P.furgoS : b_P.furgoL);
    poligono([[x0 - 3, y1 - 4], [x0 - 3, y1 - 16], [x0 + 3, y1 - 24], [x0 + 14, y1 - 24], [x0 + 14, y1 - 4]], C.k); poligono([[x0 - 2, y1 - 5], [x0 - 2, y1 - 15], [x0 + 3, y1 - 23], [x0 + 13, y1 - 23], [x0 + 13, y1 - 5]], b_P.furgo);
    poligono([[x0 - 1, y1 - 15], [x0 + 3, y1 - 21], [x0 + 12, y1 - 21], [x0 + 12, y1 - 15]], b_P.vidrioV); pset(x0 + 4, y1 - 20, b_P.vidrioVL); pset(x0 + 5, y1 - 19, b_P.vidrioVL);
    for (let y = y1 - 13; y < y1 - 6; y += 2) rect(x0 - 2, y, x0 + 4, y, b_P.furgoS); disco(x0, y1 - 10, 1, hex('#f8f0c0')); rect(x0 - 3, y1 - 5, x1 + 1, y1 - 3, b_P.furgoD);
    rect(x1 - 18, y1 - 22, x1 - 4, y1 - 15, b_P.vidrioV); if (Math.floor(t * 0.4) % 4 === 0) rect(x1 - 17, y1 - 21, x1 - 13, y1 - 16, hex('#3a3a34'));   // la cortinilla de atrás se mueve: alguien mira
    for (const dx of [x0 + 7, x1 - 12]) { disco(dx, y1 - 2, 4, C.k); disco(dx, y1 - 2, 2, C.metal); pset(dx, y1 - 2, C.k); }
    const sw = Math.sin(t * 1.7) * 3; rect(x1 - 10, y1 - 28, x1 - 7, y1 - 26, C.k); linea(x1 - 9, y1 - 28, x1 - 9 + Math.round(sw), y1 - 52, hex('#3a3e46')); pset(x1 - 9 + Math.round(sw), y1 - 53, C.rojo); }
  // la verja de hierro (por delante de la calle)
  rect(0, 106, 319, 106, b_P.hierro); rect(0, 112, 319, 112, b_P.hierro); for (let x = 1; x < 320; x += 4) { if (x > 136 && x < 152) continue; rect(x, 105, x, 113, b_P.hierro); pset(x, 104, b_P.hierroL); }
  // los troncos de los castaños (por delante de la calle) y las copas que se mecen
  for (const [tx, ty, sem] of [[116, 120, 1], [268, 122, 2]]) { rect(tx, 90, tx + 5, ty, b_P.troncoS); rect(tx + 1, 90, tx + 3, ty, b_P.tronco); pset(tx + 2, 100, b_P.troncoS); linea(tx + 3, 96, tx + 10, 88, b_P.tronco); rect(tx - 2, ty - 1, tx + 7, ty, b_P.cespedS); }
  for (let k = 0; k < 26; k++) { const sem = k % 2 + 1, cx = sem === 1 ? 118 : 270, cy = sem === 1 ? 72 : 76, x = Math.round(cx + (h(k, 7, 436) - 0.5) * 56), y = Math.round(cy + (h(k, 8, 436) - 0.5) * 38), s = Math.round(Math.sin(t * 2.2 + k * 1.3) * 1.2); const c = fb[y * 320 + x]; if (c === b_P.hoja || c === b_P.hojaL) { pset(x + s, y, b_P.hojaL); pset(x + s + 1, y, c === b_P.hojaL ? b_P.hoja : b_P.hojaL); } }
  // el paseo del fondo: el señor que lee el periódico en el banco, una señora con cochecito y un paseante con perro
  { const x = 36, f = Math.floor(t * 0.5) % 4 === 0; b_paseante(R, x - 1, 123, t, 1, { quieto: true, ropa: hex('#4a4a5a'), sombrero: true }); rect(x - 5, 114, x + 1, 120, hex('#e8e4d8')); rect(x - 4, 116, x, 116, hex('#9a9aa0')); rect(x - 4, 118, x, 118, hex('#9a9aa0')); if (f) rect(x + 1, 114, x + 4, 120, hex('#d8d4c8')); }
  { const u = (t * 0.028) % 1, x = Math.round(lerp(330, -30, u)); b_paseante(R, x, 125, t, 2, { dir: -1, ropa: hex('#8a3a5a') }); rect(x - 9, 118, x - 3, 122, C.k); rect(x - 8, 119, x - 4, 121, hex('#3a4a6a')); linea(x - 3, 119, x - 1, 120, C.k); disco(x - 8, 124, 1, C.k); disco(x - 4, 124, 1, C.k); }
  { const u = (t * 0.035 + 0.4) % 1, x = Math.round(lerp(-30, 330, u)), p = Math.floor(t * 8) % 2; b_paseante(R, x, 125, t, 4, { ropa: hex('#5a6a3a') }); const px = x + 9; rect(px, 121, px + 4, 123, hex('#c8a060')); pset(px + 5, 120, hex('#c8a060')); pset(px + 5, 119, hex('#8a6a3a')); pset(px + p, 124, hex('#8a6a3a')); pset(px + 4 - p, 124, hex('#8a6a3a')); pset(px - 1, 121 - p, hex('#c8a060')); linea(x + 3, 121, px, 122, C.k); }
  // la fuente: el chorro, la taza que rebosa y el agua del pilón que se riza
  { for (let k = 0; k < 14; k++) { const u = ((t * 1.6 + k / 14) % 1), y = Math.round(111 - Math.sin(u * Math.PI) * 22 - (u < 0.5 ? 0 : 0)), x = 182 + Math.round((u - 0.5) * (k % 2 ? 14 : -14) * (u > 0.5 ? 1 : 0.2)); pset(x, y, k % 3 ? b_P.aguaL : C.blanco); }
    rect(181, 90, 183, 111, b_P.aguaL); pset(182, 89 + Math.round(Math.sin(t * 9)), C.blanco); rect(182, 92, 182, 110, C.blanco);
    for (let k = 0; k < 6; k++) { const u = ((t * 2 + k / 6) % 1); pset(170 + (k % 2) * 24, 113 + Math.round(u * 16), b_P.aguaL); }
    for (let j = -6; j <= 5; j++) for (let i = -30; i <= 30; i++) { if ((i / 30) ** 2 + (j / 6.5) ** 2 > 1) continue; const w = Math.sin(i * 0.5 + j * 1.3 - t * 3) + Math.sin(Math.hypot(i, j * 4) * 0.4 - t * 4); if (w > 1.3) pset(182 + i, 134 + j, b_P.aguaL); else if (w < -1.4) pset(182 + i, 134 + j, b_P.aguaS); } }
  // las palomas: andan, picotean y alzan el vuelo por turnos (o.espanta: todas a la vez)
  const palomas = [];
  if (o.palomas !== false) {
    const esp = Math.max(0, Math.min(1, o.espanta ?? 0)), pz = PIEZAS_DC.paloma;
    for (let k = 0; k < 7; k++) { const bx = 96 + k * 13 + Math.round(h(k, 1, 437) * 8), by = 146 + Math.round(h(k, 2, 437) * 22), per = 9 + k, fase = ((t + k * 2.7) % per) / per, vuelo = fase > 0.82 ? (fase - 0.82) / 0.18 : 0, d = Math.sin(t * 0.3 + k) > 0 ? 1 : -1;
      let x = bx + Math.round(Math.sin(t * 0.4 + k) * 6), y = by, vu = vuelo > 0;
      if (vuelo > 0) { y = by - Math.round(Math.sin(vuelo * Math.PI) * 24); x += Math.round(vuelo * 18 * d); }
      if (esp > 0) { const e = Math.min(1, esp * 1.3 - k * 0.04); if (e > 0) { vu = true; x = Math.round(bx + e * (k % 2 ? 160 : -120)); y = Math.round(by - e * 120 - Math.sin(e * 3) * 6); } }
      if (y < -12 || x < -12 || x > 332) continue;
      if (!vu) { rect(x - 4, y, x + 4, y, b_mezcla(b_P.grava, C.k, 0.25)); }
      if (pz) pz(R, x, y, { t: t + k, picotea: !vu, vuela: vu, dir: d }); else { disco(x, y - 3, 3, hex('#9aa4b8')); }
      palomas.push([x, y]); }
  }
  return { suelo: 160, banco: [206, 154, 256], fuente: [182, 134], furgoneta: [8, 110, 74], palomas };
}

// el asiento del banco grande y sus patas, y el parterre del primer plano (por delante de los personajes)
function b_parqueDelante(R, t, o) {
  const { rect, pset, disco } = R;
  rect(203, 150, 259, 153, C.k); rect(204, 150, 258, 151, b_P.banquitoL); rect(204, 152, 258, 152, b_P.banquito); for (let x = 210; x < 258; x += 9) pset(x, 151, b_P.banquito);
  for (const x of [206, 254]) { rect(x, 153, x + 2, 160, b_P.hierro); rect(x - 1, 159, x + 3, 160, b_P.hierro); pset(x + 1, 154, b_P.hierroL); }
  // el parterre del primer plano, abajo a la izquierda: seto bajo y flores que se mecen
  for (let y = 166; y < 180; y++) for (let x = 0; x < 64 - (179 - y) * 2; x++) { const q = h(x, y, 438); pset(x, y, y === 166 || x === 63 - (179 - y) * 2 - 1 ? C.k : q < 0.2 ? b_P.hojaS : q > 0.85 ? b_P.hojaL : b_P.hoja); }
  for (let k = 0; k < 9; k++) { const x = 4 + k * 6, y = 170 + (k % 3) * 3, s = Math.round(Math.sin(t * 2 + k) * 1); pset(x + s, y, [C.rojo, C.amarillo, hex('#e86aa8')][k % 3]); pset(x + s + 1, y, [C.rojo, C.amarillo, hex('#e86aa8')][k % 3]); pset(x + s, y - 1, C.blanco); }
}

function b_furgoneta(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const V = [[122, 34, 154, 64], [166, 34, 198, 64]];
  const fb = b_fijo(R, 'furgoneta', () => {
    const B = R.buf;
    // la chapa: paneles con nervios y remaches; el techo curvo y oscuro
    for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 16) c = y > 13 ? b_P.chapaD : b_umbral(x, y) < (16 - y) / 22 ? b_P.chapaD : b_P.chapaS;
      else { const n = x % 20; c = n === 0 ? b_P.chapaD : n === 1 ? b_P.chapaL : n === 10 ? b_P.chapaS : h(x >> 1, y >> 2, 440) < 0.05 ? b_P.chapaS : b_P.chapa; if ((y - 20) % 30 === 0 && n > 2 && x % 5 === 0) c = b_P.chapaL; }
      B[y * 320 + x] = c; }
    rect(0, 16, 319, 16, C.k); for (let x = 30; x < 320; x += 60) rect(x, 4, x + 2, 15, b_P.chapaD);
    // el suelo de chapa estriada
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = ((x + y * 2) % 8 < 2 && (y % 4) < 2) ? b_P.chapaL : h(x >> 2, y >> 2, 441) < 0.1 ? b_P.chapaD : b_P.chapaS;
    rect(0, 140, 319, 140, C.k);
    // las puertas traseras con las ventanitas, bisagras y tiradores
    rect(108, 18, 212, 139, C.k); rect(109, 19, 159, 139, b_P.chapa); rect(161, 19, 211, 139, b_P.chapa); rect(160, 19, 160, 139, b_P.chapaD); rect(109, 19, 211, 20, b_P.chapaL);
    for (const x of [112, 207]) for (const y of [30, 100]) { rect(x, y, x + 2, y + 8, C.k); pset(x + 1, y + 1, b_P.chapaL); }
    rect(150, 86, 156, 89, C.k); rect(151, 87, 155, 88, C.metalL); rect(164, 86, 170, 89, C.k); rect(165, 87, 169, 88, C.metalL);
    for (let y = 72; y < 136; y += 8) { rect(116, y, 152, y, b_P.chapaS); rect(168, y, 204, y, b_P.chapaS); }
    // el parque por las ventanitas: cielo, fachadas, el castaño y la fuente
    for (const [x0, y0, x1, y1] of V) { rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, C.k); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#2a2e2a'));
      R.recorte([x0, y0, x1, y1]); b_degradado(R, x0, y0, x1, y1, [[0, hex('#5e98d4')], [0.5, hex('#8cbae2')], [1, hex('#c4dae6')]]);
      for (let x = x0; x <= x1; x++) { const top = 44 + Math.round(h(x >> 3, 0, 442) * 6); for (let y = top; y <= y1; y++) pset(x, y, (x % 4 === 0 && y % 5 < 3 && y > top + 2) ? b_P.vidrioV : y === top ? b_P.pizarraT : b_P.fachada1); }
      disco(x0 + 8, 52, 9, b_P.hojaS); disco(x0 + 7, 50, 8, b_P.hoja); disco(x0 + 5, 47, 4, b_P.hojaL); for (let k = 0; k < 6; k++) pset(x0 + 3 + k * 2, 46 + (k % 3) * 3, b_P.flor);
      for (let y = 58; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, h(x, y, 443) < 0.2 ? b_P.cespedS : b_P.cesped); R.recorte(null);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 11 === 0 && x - x0 < 10) b_tine(R, x, y, C.blanco, 0.3); }
    rect(166, 33, 175, 65, hex('#5a5040')); for (let y = 34; y < 65; y += 3) rect(166, y, 175, y, hex('#4a4232')); rect(165, 33, 177, 33, C.metalD);   // la cortinilla
    // la estantería de la izquierda: el receptor, dos magnetofones y el panel de clavijas
    rect(4, 18, 106, 138, C.k); rect(5, 19, 105, 137, hex('#3a3e3a'));
    rect(8, 20, 102, 44, hex('#4a4a52')); rect(8, 20, 102, 20, hex('#6a6a72')); rect(14, 24, 70, 36, C.k); rect(15, 25, 69, 35, b_P.ambarS); for (let x = 17; x < 68; x += 4) pset(x, 33, C.k);
    for (const x of [80, 92]) { disco(x, 32, 4, C.k); disco(x, 32, 3, hex('#8a8a92')); pset(x - 1, 30, C.metalL); }
    for (const x0 of [8, 56]) { rect(x0, 48, x0 + 44, 90, hex('#5a5e66')); rect(x0, 48, x0 + 44, 48, hex('#7a7e86')); rect(x0, 90, x0 + 44, 90, C.k); rect(x0 + 14, 76, x0 + 30, 84, C.k); rect(x0 + 15, 77, x0 + 29, 83, hex('#e8dca0')); for (let k = 0; k < 4; k++) rect(x0 + 4 + k * 10, 86, x0 + 9 + k * 10, 88, hex('#d8dce4')); }
    rect(8, 94, 102, 122, hex('#2e3236')); for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) { disco(13 + i * 8, 99 + j * 7, 1, C.k); }
    for (const [a, b, c] of [[13, 37, C.rojo], [29, 69, hex('#e8c040')], [45, 85, hex('#3a8ae8')], [61, 21, C.rojo]]) for (let x = Math.min(a, b); x <= Math.max(a, b); x++) { const u = (x - Math.min(a, b)) / Math.max(1, Math.abs(b - a)); pset(x, Math.round(100 + Math.sin(u * Math.PI) * 12 + (a % 3) * 4), c); }
    rect(8, 124, 102, 136, hex('#4a4a52')); for (let x = 12; x < 100; x += 8) rect(x, 128, x + 4, 132, hex('#2a2a2e'));
    // la pared de la derecha: el osciloscopio, el termo y las tazas, el plano de la ciudad con chinchetas
    rect(216, 92, 318, 94, C.k); rect(217, 92, 317, 92, C.metalL);
    rect(222, 52, 262, 82, C.k); rect(223, 53, 261, 82, b_P.beige); rect(223, 53, 261, 53, b_P.beigeL); disco(238, 67, 11, C.k); disco(238, 67, 10, b_P.fosforo); for (const y of [58, 66, 74]) { disco(255, y, 2, C.k); pset(255, y - 1, C.metalL); }
    rect(226, 76, 236, 91, C.k); rect(227, 77, 235, 91, hex('#3a6a4a')); rect(227, 77, 227, 91, hex('#5a8a6a')); rect(228, 74, 234, 76, C.metal);
    for (const x of [244, 256]) { rect(x, 84, x + 7, 91, C.k); rect(x + 1, 85, x + 6, 91, hex('#e8e4d8')); R.anillo(x + 9, 87, 2, C.k); }
    rect(266, 82, 284, 91, C.k); rect(267, 83, 283, 91, hex('#e8d8b0')); rect(267, 86, 283, 86, hex('#c8a060'));   // el bocadillo envuelto
    rect(266, 50, 316, 88, C.k); rect(267, 51, 315, 87, hex('#ece4cc')); for (let k = 0; k < 7; k++) linea(267, 54 + k * 5, 315, 52 + k * 5 + (k % 2) * 3, hex('#c8bc98')); linea(280, 51, 290, 87, hex('#7aa8d8')); linea(281, 51, 291, 87, hex('#7aa8d8')); for (const [x, y] of [[276, 62], [298, 70], [288, 80]]) rect(x - 2, y - 1, x + 2, y + 1, hex('#8ac06a'));
    rect(222, 100, 316, 138, C.k); rect(223, 101, 315, 137, hex('#3a3e3a')); for (let k = 0; k < 5; k++) { rect(226 + k * 18, 104, 240 + k * 18, 124, hex('#4a4e56')); rect(226 + k * 18, 104, 240 + k * 18, 104, hex('#6a6e76')); }
    // el plafón del techo
    rect(196, 6, 222, 11, C.k); rect(197, 7, 221, 10, hex('#f0ead0'));
  });
  // la luz del plafón
  for (let x = 197; x <= 221; x++) b_tine(R, x, 12, hex('#fff4c8'), 0.3);
  // el parque por las ventanitas: nubes que pasan, palomas que cruzan, el chorro de la fuente
  for (const [x0, y0, x1, y1] of V) { R.recorte([x0, y0, x1, x1 > 160 ? y1 : y1]); if (x0 > 160) R.recorte([176, y0, x1, y1]);
    b_nubes(R, t, (x, y) => fb[y * 320 + x] !== b_P.fachada1 && y < 46, 36, 44, [hex('#b8cce2'), hex('#e8f0f8'), hex('#ffffff'), hex('#a8bcd6')], 0.8, 21, 4);
    for (let k = 0; k < 2; k++) { const u = ((t * 0.12 + k * 0.5) % 1), x = Math.round(lerp(110, 210, u)), y = Math.round(42 + k * 6 + Math.sin(t * 2 + k) * 2), a = Math.floor(t * 10 + k) % 2; pset(x, y, hex('#6a7488')); pset(x + 1, y, hex('#6a7488')); pset(x - 1, y - a, hex('#4a5266')); pset(x + 2, y - a, hex('#4a5266')); }
    R.recorte(null); }
  for (let y = 50; y < 58; y++) if (Math.sin(t * 8 + y) > -0.6) pset(190, y, b_P.aguaL); pset(190, 49 + Math.round(Math.sin(t * 7)), C.blanco);
  // el dial del receptor: la aguja que barre y su luz ámbar
  { const a = 18 + Math.round((Math.sin(t * 0.4) * 0.5 + 0.5) * 48); rect(15, 25, 69, 35, b_P.ambarS); for (let x = 16; x < 69; x++) if (b_umbral(x, 26) < 0.5) pset(x, 26 + (x % 3), b_P.ambar); for (let x = 17; x < 68; x += 4) rect(x, 32, x, 34, C.k); rect(a, 25, a, 35, C.rojo); }
  // los magnetofones: bobinas y vúmetros; los pilotos del panel que parpadean
  for (const [x0, k] of [[8, 0], [56, 1]]) { b_bobina(R, x0 + 11, 61, 9, t * (2.4 + k * 0.3)); b_bobina(R, x0 + 33, 61, 9, t * (2.4 + k * 0.3) + 1); linea(x0 + 11, 71, x0 + 33, 71, hex('#5a3a2a'));
    const a = -0.9 + Math.abs(Math.sin(t * (4 + k) + k) * Math.sin(t * 1.7)) * 1.6; linea(x0 + 22, 83, x0 + 22 + Math.round(Math.sin(a) * 6), 83 - Math.round(Math.cos(a) * 5), C.k); }
  for (let k = 0; k < 11; k++) { const on = h(k, Math.floor(t * 3 + k * 0.3), 444) > 0.45; pset(14 + k * 8, 126, on ? (k % 3 ? b_P.pilotoV : b_P.piloto) : hex('#2a2a2a')); if (on) b_tine(R, 14 + k * 8, 125, b_P.pilotoV, 0.2); }
  // el osciloscopio
  R.recorte([229, 58, 247, 76]); for (let i = -10; i < 10; i++) linea(238 + i, 67 + Math.round(Math.sin(i * 0.8 + t * 7) * 4 * Math.sin(t * 1.3)), 239 + i, 67 + Math.round(Math.sin((i + 1) * 0.8 + t * 7) * 4 * Math.sin(t * 1.3)), b_P.onda); R.recorte(null);
  // los auriculares colgados que se balancean
  for (const [x, k] of [[104, 0], [216, 1]]) { const s = Math.sin(t * 1.4 + k * 2) * 2.5, ex = Math.round(x + s), ey = 78; rect(x - 1, 60, x + 1, 62, C.metalD); linea(x, 62, ex, ey - 8, C.k);
    R.anillo(ex, ey - 4, 5, C.k); rect(ex - 7, ey - 3, ex - 4, ey + 3, C.k); rect(ex + 4, ey - 3, ex + 7, ey + 3, C.k); rect(ex - 6, ey - 2, ex - 5, ey + 2, hex('#5a5a62')); rect(ex + 5, ey - 2, ex + 6, ey + 2, hex('#5a5a62'));
    for (let y = ey + 3; y < ey + 26; y++) pset(Math.round(ex + 6 + Math.sin(y * 0.4 + t) * 1.5), y, C.k); }
  return { suelo: 168, detrasMesa: 149, mesas: [[0, 140, 108], [212, 140, 319]], ventanas: V };
}

// los dos mostradores de la furgoneta, por delante de los ingenieros: la chapa, interruptores, un micrófono de mesa, la
// libreta y pilotos
function b_furgonetaDelante(R, t, o) {
  const { rect, pset, linea, disco } = R;
  for (const [x0, x1] of [[0, 108], [212, 319]]) { rect(x0, 140, x1, 144, C.k); rect(x0, 141, x1, 142, b_P.chapaL); rect(x0, 143, x1, 143, b_P.chapa);
    for (let y = 145; y < 180; y++) for (let x = x0; x <= x1; x++) pset(x, y, x === x0 || x === x1 ? C.k : (x - x0) % 18 === 0 ? b_P.chapaD : (y - 145) % 14 === 0 ? b_P.chapaS : b_P.chapa);
    for (let k = 0; k < 5; k++) { const x = x0 + 8 + k * 18; rect(x, 150, x + 4, 156, C.k); rect(x + 1, 151, x + 3, 153, C.metalL); pset(x + 2, 160, Math.floor(t * 2 + k) % 3 ? b_P.pilotoV : hex('#2a3a2a')); } }
  rect(20, 134, 40, 140, C.k); rect(21, 135, 39, 139, hex('#ece4cc')); for (const y of [136, 138]) linea(23, y, 37, y, hex('#9aa0b0'));
  rect(286, 132, 292, 140, C.k); linea(289, 132, 289, 124, C.k); disco(289, 122, 3, C.k); disco(289, 122, 2, C.metalL); pset(288, 121, C.blanco);
  rect(240, 136, 252, 140, C.k); rect(241, 137, 251, 139, hex('#3a3e46')); disco(246, 135, 2, C.metal);
}

function b_skinner(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  const fb = b_fijo(R, 'skinner', () => {
    const B = R.buf;
    // el techo, el yeso con manchas, el friso de madera y el suelo de tablas
    rect(0, 0, 319, 7, hex('#6a5e4a')); for (let x = 0; x < 320; x++) { pset(x, 7, C.k); if (h(x >> 2, 0, 450) < 0.2) pset(x, 3, hex('#5a4e3c')); }
    b_enlucido(R, 0, 8, 319, 83, b_P.yeso, b_P.yesoS, b_P.yesoL, 451);
    for (let y = 8; y < 18; y++) for (let x = 0; x < 320; x++) if (b_umbral(x, y) < (18 - y) / 18) B[y * 320 + x] = b_P.yesoS;
    for (const [x0, y0, l] of [[70, 12, 9], [262, 78, 6]]) for (let k = 0; k < l; k++) pset(x0 + k + (k % 3 === 0 ? 1 : 0), y0 + Math.round(k * 0.6), b_P.yesoS);   // grietas
    rect(0, 84, 319, 86, C.k); rect(0, 84, 319, 84, b_P.frisoL);
    for (let y = 87; y < 116; y++) for (let x = 0; x < 320; x++) { const p = x % 32; B[y * 320 + x] = p === 0 ? C.k : p === 1 || y === 87 ? b_P.frisoL : (p > 4 && p < 28 && y > 91 && y < 111 && (p === 5 || y === 92)) ? b_P.frisoS : (p > 4 && p < 28 && y > 91 && y < 111 && (p === 27 || y === 110)) ? b_P.frisoL : h(x >> 2, y, 452) < 0.1 ? b_P.frisoS : b_P.friso; }
    rect(0, 115, 319, 117, C.k);
    for (let y = 118; y < 180; y++) { const d = y - 104, fila = Math.floor(Math.log(d) * 9);
      for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 2.2, tabla = Math.floor(u), jt = u - tabla < 0.08 * 20 / d; let c = jt ? b_P.frisoS : h(tabla, fila, 453) < 0.3 ? b_P.frisoL : b_P.friso; if (h(x >> 2, y, 454) < 0.07) c = b_P.frisoS; if (!jt && (Math.floor(u * 0.5 + fila * 0.37) % 4 === 0) && Math.floor(fila) % 3 === 0 && (u - tabla) > 0.9) c = C.k; B[y * 320 + x] = c; } }
    // el cono de luz de la lámpara en el suelo
    b_halo(R, 190, 150, 70, 18, b_P.yesoL, 0.35);
    // la pizarra con su marco, el canal de la tiza y los dibujos (sin letras)
    rect(98, 20, 188, 76, C.k); rect(99, 21, 187, 75, b_P.friso); rect(102, 24, 184, 72, b_P.verdeP); for (let y = 24; y <= 72; y++) for (let x = 102; x <= 184; x++) if (h(x >> 1, y, 455) < 0.08) pset(x, y, b_P.verdePS); else if (h(x, y >> 2, 456) < 0.03) pset(x, y, hex('#3e5a48'));
    rect(98, 76, 188, 78, C.k); rect(99, 76, 187, 77, b_P.frisoL); rect(110, 75, 114, 75, b_P.tiza); rect(150, 75, 152, 75, hex('#e8a0a0'));
    const T_ = b_P.tiza; linea(108, 58, 140, 58, T_); poligono([[110, 58], [138, 58], [134, 62], [114, 62]], T_); rect(122, 52, 126, 57, T_); rect(123, 49, 124, 51, T_);   // el barco
    R.anillo(124, 56, 11, b_P.tizaS); linea(124, 42, 124, 70, b_P.tizaS); linea(110, 56, 138, 56, b_P.tizaS);   // la mira
    R.anillo(162, 36, 6, T_); pset(165, 34, T_); linea(168, 36, 172, 37, T_); linea(157, 41, 154, 50, T_); linea(167, 41, 172, 50, T_);   // la cabeza de la paloma
    for (let k = 0; k < 14; k++) pset(146 + k * 2, 66 - Math.round(Math.sin(k / 13 * Math.PI) * 12), T_); linea(172, 64, 174, 68, T_); linea(172, 64, 176, 64, T_);   // la trayectoria
    linea(104, 30, 116, 30, T_); linea(113, 27, 116, 30, T_); linea(113, 33, 116, 30, T_); R.icono && R.numero('3', 180, 34, { color: b_P.tiza, sombra: false });
    // la bata colgada
    rect(196, 30, 200, 32, C.k); poligono([[192, 34], [204, 33], [208, 40], [208, 82], [190, 82], [190, 40]], b_P.yesoS); poligono([[193, 35], [203, 34], [206, 40], [206, 80], [192, 80], [192, 40]], hex('#f4f2ea')); linea(199, 36, 199, 80, hex('#c8c8c0')); rect(201, 56, 205, 60, hex('#d8d8d0'));
    // la ventana de guillotina con Minneapolis en invierno (las nubes y el humo, en cada fotograma)
    rect(214, 20, 270, 78, C.k); rect(215, 21, 269, 77, hex('#e8e4d8')); rect(212, 77, 272, 80, C.k); rect(213, 77, 271, 78, hex('#f2eee4'));
    b_degradado(R, 218, 24, 266, 74, [[0, hex('#9aa4b4')], [0.5, hex('#b4bcc8')], [1, hex('#d0d4da')]]);
    R.recorte([218, 24, 266, 74]);
    for (const [x0, x1, top] of [[216, 230, 50], [230, 244, 56], [244, 262, 46], [262, 270, 54]]) { rect(x0, top, x1, 74, b_P.ladrillo); rect(x0, top - 2, x1, top - 1, b_P.nieve); for (let y = top + 3; y < 74; y += 4) for (let x = x0 + 2; x < x1 - 1; x += 4) rect(x, y, x + 1, y + 1, h(x, y, 457) < 0.3 ? hex('#e8c878') : b_P.ladrilloS); }
    rect(236, 30, 252, 56, hex('#a8a8a4')); for (let x = 237; x < 252; x += 4) rect(x, 31, x + 2, 56, hex('#c8c8c4')); poligono([[234, 30], [244, 25], [254, 30]], b_P.nieve); rect(250, 34, 254, 46, hex('#8a8a86'));   // los silos
    R.recorte(null);
    rect(215, 48, 269, 50, C.k); rect(216, 48, 268, 48, hex('#f2eee4')); for (const x of [232, 250]) { rect(x, 21, x + 1, 77, hex('#e8e4d8')); } rect(215, 36, 269, 36, hex('#e8e4d8')); rect(215, 62, 269, 62, hex('#e8e4d8'));
    // la estantería con las seis jaulas (las palomas y la malla, en cada fotograma)
    rect(6, 24, 98, 126, C.k); rect(7, 25, 97, 125, b_P.frisoS);
    for (let j = 0; j < 2; j++) { rect(7, 58 + j * 40, 97, 61 + j * 40, b_P.friso); rect(7, 58 + j * 40, 97, 58 + j * 40, b_P.frisoL);
      for (let i = 0; i < 3; i++) { const x0 = 10 + i * 29, y0 = 28 + j * 40; rect(x0, y0, x0 + 26, y0 + 28, hex('#d8d0b8')); rect(x0, y0 + 26, x0 + 26, y0 + 28, hex('#c8b890')); for (let x = x0; x <= x0 + 26; x++) if (h(x, j * 3 + i, 458) < 0.4) pset(x, y0 + 25, hex('#d8a040')); rect(x0 + 20, y0 + 22, x0 + 25, y0 + 25, hex('#6a8ab8')); rect(x0 + 21, y0 + 22, x0 + 24, y0 + 22, hex('#a8c8e8')); } }
    rect(7, 102 + 22, 97, 125, b_P.friso);
    // el proyector en su carrito
    rect(116, 112, 150, 114, C.k); rect(117, 112, 149, 113, C.metal); for (const x of [118, 146]) rect(x, 114, x + 1, 134, C.metalD); rect(116, 128, 150, 129, C.metalD); for (const x of [119, 147]) { disco(x, 136, 2, C.k); }
    rect(122, 98, 144, 111, C.k); rect(123, 99, 143, 111, hex('#3a3e46')); rect(123, 99, 143, 99, hex('#5a5e66')); rect(144, 102, 150, 107, C.k); disco(150, 104, 2, hex('#a8c8e8'));
    // la punta de la bomba de maqueta en su caballete, abierta: la chapa y el hueco (la pantallita, en cada fotograma)
    for (const x of [214, 270]) { linea(x - 6, 142, x, 124, C.maderaS); linea(x + 6, 142, x, 124, C.maderaS); linea(x - 5, 142, x + 1, 124, C.madera); }
    rect(206, 122, 278, 124, C.madera);
    poligono([[200, 112], [226, 96], [286, 96], [286, 124], [226, 124]], C.k); poligono([[202, 112], [227, 97], [285, 97], [285, 123], [227, 123]], b_P.punta);
    for (let x = 228; x < 285; x++) { pset(x, 98, b_P.puntaL); pset(x, 99, b_P.puntaL); pset(x, 121, b_P.puntaS); pset(x, 122, b_P.puntaS); } for (const x of [240, 262]) for (let y = 97; y < 124; y += 3) pset(x, y, b_P.puntaS);
    rect(244, 102, 280, 120, C.k); rect(245, 103, 279, 119, hex('#2a2e2a'));   // el hueco abierto
    rect(272, 103, 279, 119, hex('#3a3e3a')); rect(250, 116, 270, 119, hex('#8a7a5a')); rect(252, 117, 268, 117, hex('#c8a870'));
    poligono([[246, 100], [280, 100], [284, 90], [250, 90]], b_P.puntaS); linea(246, 100, 280, 100, C.k);   // la tapa levantada
  });
  // la lámpara esmaltada que se mece y su cono de luz
  { const s = Math.sin(t * 0.9) * 2, lx = Math.round(190 + s); linea(190, 8, lx, 22, C.k); poligono([[lx - 9, 28], [lx - 4, 22], [lx + 4, 22], [lx + 9, 28]], C.k); poligono([[lx - 8, 27], [lx - 3, 23], [lx + 3, 23], [lx + 8, 27]], hex('#3a6a5a')); rect(lx - 3, 28, lx + 3, 29, hex('#fff2c8')); }
  // por la ventana: nubes, el humo de las chimeneas y copos
  R.recorte([218, 24, 266, 74]); b_nubes(R, t, (x, y) => fb[y * 320 + x] !== b_P.ladrillo && y < 46, 26, 36, [hex('#8a92a2'), hex('#c4c8d0'), hex('#e0e2e6'), hex('#a4aab6')], 0.5, 31, 4);
  b_humo(R, 225, 46, t, 20, hex('#8a8e96'), hex('#c8ccd2'), 6, 4); b_humo(R, 252, 34, t + 1.3, 12, hex('#9a9ea6'), hex('#d8dce0'), 4, 5);
  for (let k = 0; k < 10; k++) { const x = 218 + Math.round((h(k, 1, 459) * 48 + Math.sin(t + k) * 2 + 480) % 48), y = 24 + Math.round((h(k, 2, 459) * 50 + t * 6) % 50); if (y < 74) pset(x, y, C.blanco); }
  R.recorte(null); rect(215, 48, 269, 50, C.k); rect(216, 48, 268, 48, hex('#f2eee4'));
  // las palomas de las jaulas y la malla por delante
  const pz = PIEZAS_DC.paloma;
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const k = j * 3 + i, x0 = 10 + i * 29, y0 = 28 + j * 40, vu = ((t + k * 1.7) % 7) < 0.6;
    if (pz) pz(R, x0 + 12 + Math.round(Math.sin(t * 0.5 + k) * 3), y0 + 25 - (vu ? 3 : 0), { t: t + k, picotea: !vu, vuela: vu, dir: (k + Math.floor(t * 0.2 + k)) % 2 ? 1 : -1 });
    for (let x = x0; x <= x0 + 26; x += 3) linea(x, y0, x, y0 + 26, b_P.jaulaS); rect(x0, y0, x0 + 26, y0, b_P.jaula); rect(x0, y0 + 26, x0 + 26, y0 + 26, b_P.jaula); rect(x0, y0, x0, y0 + 26, b_P.jaula); rect(x0 + 26, y0, x0 + 26, y0 + 26, b_P.jaula); rect(x0 + 24, y0 + 10, x0 + 25, y0 + 14, C.metalD); }
  // la pantallita de la punta: el barco que se mueve
  R.recorte([248, 104, 268, 115]); rect(248, 104, 268, 115, b_P.pantVS); for (let x = 248; x <= 268; x++) { pset(x, 110 + Math.round(Math.sin(x * 0.7 + t * 3) * 0.5), b_P.pantV); }
  { const bx = 258 + Math.round(Math.sin(t * 0.8) * 4); rect(bx - 4, 108, bx + 4, 109, hex('#2a3a2a')); rect(bx - 1, 106, bx + 1, 107, hex('#2a3a2a')); } pset(258, 104 + Math.floor(t * 8) % 12, b_P.pantVL); R.recorte(null);
  for (let x = 248; x <= 268; x++) for (const y of [104, 115]) pset(x, y, C.k);
  return { suelo: 160, detrasMesa: 153, mesa: [26, 146, 128], punta: [244, 112], jaulas: [6, 24, 98, 126], pizarra: [98, 20, 188, 78] };
}

// la mesa del laboratorio de Skinner (por delante): el tablero, las patas con travesaño, el cuaderno, el cronómetro y el
// tarro de grano
function b_skinnerDelante(R, t, o) {
  const { rect, pset, linea, disco } = R;
  rect(24, 144, 130, 149, C.k); for (let x = 25; x <= 129; x++) { pset(x, 145, b_P.frisoL); pset(x, 146, h(x >> 2, 0, 460) < 0.2 ? b_P.frisoS : b_P.friso); pset(x, 147, b_P.friso); pset(x, 148, b_P.frisoS); }
  rect(26, 150, 128, 156, C.k); rect(27, 150, 127, 155, b_P.frisoS); rect(60, 151, 94, 154, b_P.friso); rect(75, 152, 79, 152, b_P.laton);
  for (const x of [28, 122]) { rect(x, 156, x + 4, 178, C.k); rect(x + 1, 156, x + 3, 177, b_P.friso); } rect(32, 170, 122, 172, b_P.frisoS);
  rect(40, 138, 60, 144, C.k); rect(41, 139, 59, 143, hex('#f2ecdc')); for (const y of [140, 142]) linea(43, y, 57, y, hex('#9aa0b0')); rect(50, 139, 50, 143, hex('#c8bca0'));
  disco(72, 140, 4, C.k); disco(72, 140, 3, hex('#e8e4d8')); rect(71, 135, 73, 136, C.k); { const a = t * 2; linea(72, 140, 72 + Math.round(Math.sin(a) * 2), 140 - Math.round(Math.cos(a) * 2), C.rojo); }
  rect(100, 128, 112, 144, C.k); rect(101, 130, 111, 144, hex('#c8e4ec')); rect(101, 135, 111, 144, hex('#d8a040')); for (let k = 0; k < 6; k++) pset(102 + k * 2, 136 + (k % 2), hex('#a87420')); rect(100, 127, 112, 129, b_P.laton);
  for (let k = 0; k < 6; k++) pset(84 + k * 3, 143, hex('#d8a040'));
}

// dentro de la punta de la bomba (inserto)
function b_punta(R, t, o) {
  const { rect, pset, linea, disco } = R, cx = 160, cy = 74, r = 40;
  b_fijo(R, 'punta', () => {
    const B = R.buf;
    // la chapa en anillos que se cierran hacia el fondo, con remaches, y la sombra de los bordes
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - cx, (y - cy) * 1.25), a = Math.atan2(y - cy, x - cx), anillo = Math.log(Math.max(1, d)) * 6.5, f = anillo % 1;
      let c = f < 0.1 ? b_P.puntaS : f > 0.9 ? b_P.puntaL : b_P.punta; if (f > 0.4 && f < 0.48 && Math.round(a * 18) % 3 === 0 && (Math.abs(a * 18 - Math.round(a * 18)) < 0.12)) c = b_P.puntaL;
      if (Math.abs(((a / (Math.PI / 6)) % 1 + 1) % 1 - 0.5) < 0.02 * (d / 60)) c = b_P.puntaS;
      const osc = Math.max(0, (d - 70) / 130); if (b_umbral(x, y) < osc) c = b_mezcla(c, hex('#141810'), 0.55); if (d < 70 && b_umbral(x, y) < (70 - d) / 120) c = b_mezcla(c, b_P.pantV, 0.25);
      B[y * 320 + x] = c; }
    // cables y un manómetro a los lados
    for (const [x0, y0, x1, y1, c] of [[6, 30, 90, 120, C.rojoS], [10, 40, 96, 130, C.k], [314, 30, 236, 128, hex('#3a3a8a')]]) for (let k = 0; k <= 40; k++) { const u = k / 40; pset(Math.round(lerp(x0, x1, u)), Math.round(lerp(y0, y1, u) + Math.sin(u * Math.PI) * 14), c); pset(Math.round(lerp(x0, x1, u)), Math.round(lerp(y0, y1, u) + Math.sin(u * Math.PI) * 14) + 1, c); }
    disco(262, 132, 12, C.k); disco(262, 132, 11, hex('#d8d4c4')); R.anillo(262, 132, 11, C.metalL); for (let k = 0; k < 9; k++) { const a = Math.PI * 0.8 + k * 0.17; pset(262 + Math.round(Math.cos(a) * 8), 132 + Math.round(Math.sin(a) * 8), C.k); }
    // el marco de la pantalla con sus tornillos
    disco(cx, cy, r + 5, C.k); disco(cx, cy, r + 4, hex('#3a3e36')); R.anillo(cx, cy, r + 3, hex('#5a5e56')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; disco(cx + Math.round(Math.cos(a) * (r + 3)), cy + Math.round(Math.sin(a) * (r + 3)), 1, C.metalL); }
    // la percha y el arnés de lona con hebillas (la paloma la pone la escena encima)
    rect(118, 152, 202, 156, C.k); rect(119, 152, 201, 154, C.madera); rect(119, 152, 201, 152, C.maderaL); for (const x of [126, 194]) { rect(x, 156, x + 3, 179, C.k); rect(x + 1, 156, x + 2, 179, C.metalD); }
    for (const [x0, x1] of [[132, 146], [174, 188]]) { linea(x0, 120, x1, 152, C.k); linea(x0 + 1, 120, x1 + 1, 152, hex('#b8a070')); linea(x0 + 2, 120, x1 + 2, 152, hex('#9a8458')); }
    for (const [x, y] of [[138, 134], [182, 134]]) { rect(x - 2, y - 2, x + 2, y + 2, C.k); rect(x - 1, y - 1, x + 1, y + 1, b_P.laton); pset(x, y, C.k); }
    rect(120, 156, 200, 160, hex('#5a4a32')); for (let x = 122; x < 200; x += 3) pset(x, 158, hex('#d8a040'));   // el comedero con grano
  });
  // la pantalla: el mar con olas, el barco que se mueve, la retícula y el parpadeo de las líneas
  const rumbo = o.rumbo ?? Math.sin(t * 0.45) * 0.7, bx = Math.round(cx + rumbo * 24), fl = Math.sin(t * 31) > 0.85 ? 1 : 0;
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const dd = (x - cx) ** 2 + (y - cy) ** 2; if (dd > r * r) continue;
    let c = y < cy - 6 ? b_P.pantVL : b_P.pantV; if (y >= cy - 6 && Math.sin(x * 0.45 + y * 1.3 + t * 2) > 0.7) c = b_P.pantVL; if (y >= cy - 6 && Math.sin(x * 0.3 - y * 0.9 - t * 1.4) > 0.86) c = b_P.pantVS;
    if ((y + Math.floor(t * 20)) % 6 === 0) c = b_mezcla(c, C.k, 0.12 + fl * 0.1); if (dd > (r - 5) ** 2 && b_umbral(x, y) < (Math.sqrt(dd) - r + 5) / 6) c = b_mezcla(c, C.k, 0.4); pset(x, y, c); }
  R.recorte([cx - r, cy - r, cx + r, cy + r]);
  const sh = hex('#22302a'); rect(bx - 14, cy - 5, bx + 14, cy - 3, sh); R.poligono([[bx - 14, cy - 3], [bx + 14, cy - 3], [bx + 10, cy + 1], [bx - 11, cy + 1]], sh); rect(bx - 4, cy - 11, bx + 4, cy - 6, sh); rect(bx - 1, cy - 17, bx, cy - 12, sh); rect(bx + 6, cy - 9, bx + 8, cy - 6, sh); for (let x = bx - 16; x < bx + 16; x += 3) pset(x, cy + 2, b_P.pantVL);
  R.recorte(null);
  for (let y = cy - r + 4; y <= cy + r - 4; y++) if (y % 2) pset(cx, y, hex('#1a2a1e')); for (let x = cx - r + 4; x <= cx + r - 4; x++) if (x % 2) pset(x, cy, hex('#1a2a1e')); R.anillo(cx, cy, 10, hex('#1a2a1e'), 4);
  pset(cx - 22, cy - 26, C.blanco); pset(cx - 21, cy - 27, C.blanco); pset(cx - 23, cy - 25, C.blanco);
  // los pilotos y la aguja del manómetro (tiembla con la vibración del vuelo)
  for (let k = 0; k < 3; k++) { const on = Math.floor(t * 2 + k * 0.7) % 3 === k; disco(40 + k * 12, 150, 2, C.k); pset(40 + k * 12, 150, on ? [b_P.piloto, b_P.ambar, b_P.pilotoV][k] : hex('#2a2a2a')); if (on) b_tine(R, 40 + k * 12, 149, C.blanco, 0.3); }
  { const a = Math.PI * 1.3 + Math.sin(t * 13) * 0.08 + Math.sin(t * 0.7) * 0.3; linea(262, 132, 262 + Math.round(Math.cos(a) * 8), 132 + Math.round(Math.sin(a) * 8), C.rojo); disco(262, 132, 1, C.k); }
  return { suelo: 152, pantalla: [cx, cy, r], paloma: [160, 152] };
}

const b_CIELO_N = [[0, b_P.cieloG1], [0.3, b_P.cieloG2], [0.65, b_P.cieloG3], [1, b_P.cieloG4]];

function b_pinoNieve(R, x, suelo, alto, k) {
  const { rect, pset } = R; rect(x - 1, suelo - 5, x + 1, suelo, b_P.troncoS);
  for (let j = 0; j < alto; j++) { const w = Math.round((j / alto) * alto * 0.38) + 1, y = suelo - alto - 3 + j; for (let i = -w; i <= w; i++) { const nev = (j % 6 < 2 && i > -w + 1) || (h(x + i, y, 461 + k) < 0.15 && i < 0); pset(x + i, y, Math.abs(i) === w ? b_P.pinoNS : nev ? (i < 1 ? b_P.nieve : b_P.nieveS) : i > w * 0.3 ? b_P.pinoNS : b_P.pinoN); } }
  pset(x, suelo - alto - 4, b_P.nieve);
}

function b_nieve(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  const cieloS = new Set(b_CIELO_N.map(([, c]) => c));
  const fb = b_fijo(R, 'nieve' + (o.mina === false ? '0' : '1'), () => {
    const B = R.buf;
    b_degradado(R, 0, 0, 319, 74, b_CIELO_N);
    // las colinas lejanas con su bosque y las cercanas, nevadas
    for (const [base, amp, c, cS, k] of [[62, 10, hex('#9aa4b8'), hex('#8a94aa'), 0], [74, 8, hex('#c4ccda'), hex('#aab4c6'), 1]]) for (let x = 0; x < 320; x++) { const top = Math.round(base - amp * (0.5 + 0.3 * Math.sin(x * 0.021 + k * 2) + 0.2 * Math.sin(x * 0.067 + k))); for (let y = top; y < 90; y++) B[y * 320 + x] = y === top ? b_mezcla(c, C.blanco, 0.4) : (k === 0 && y < top + 6 && h(x, y, 462) < 0.5) ? cS : c; if (k === 0) for (let j = 0; j < 4; j++) if (h(x >> 1, j, 463) < 0.45) pset(x, top - j, cS); }
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 0, 464) * 320), y = 80 + Math.round(h(k, 1, 464) * 6); for (let j = 0; j < 8; j++) { const w = j >> 2; rect(x - w, y - 8 + j, x + w, y - 8 + j, hex('#6a7a84')); } }
    // la nieve del campo: tramada con sombras azules y destellos
    for (let y = 84; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 465), m = Math.sin(x * 0.04 + y * 0.11) + Math.sin(x * 0.013 - y * 0.05); let c = m > 1.1 && b_umbral(x, y) < 0.5 ? b_P.nieveS : b_P.nieve; if (q < 0.03) c = b_P.nieveS; else if (q > 0.993) c = b_P.nieveL; B[y * 320 + x] = c; }
    // rodadas del camión y huellas de botas
    for (let y = 122; y < 180; y++) { const xc = 60 + (y - 122) * 1.6 + Math.sin(y * 0.06) * 8; for (const dx of [-9, 9]) for (let w = 0; w < 3; w++) pset(Math.round(xc + dx * (1 + (y - 122) / 80) + w), y, (y + w) % 3 ? b_P.nieveS : b_P.nieveSS); }
    for (let k = 0; k < 14; k++) { const x = Math.round(204 + k * 3 + Math.sin(k) * 2), y = Math.round(160 - k * 3.2), d = k % 2 ? 2 : -2; rect(x + d, y, x + d + 1, y + 1, b_P.nieveSS); }
    for (let k = 0; k < 10; k++) { const x = Math.round(118 - k * 4), y = Math.round(150 + k * 2.6); rect(x + (k % 2 ? 2 : 0), y, x + 1 + (k % 2 ? 2 : 0), y + 1, b_P.nieveSS); }
    // los pinos con nieve de los lados
    for (const [x, s, a, k] of [[12, 104, 44, 0], [34, 100, 36, 1], [292, 102, 40, 2], [312, 108, 48, 3], [218, 92, 22, 4], [200, 90, 18, 5]]) b_pinoNieve(R, x, s, a, k);
    // la caseta de madera con el tejado nevado, la ventana encendida y la chimenea
    { const x0 = 238, x1 = 280, y1 = 112; rect(x0, 88, x1, y1, C.k); for (let y = 89; y < y1; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, (y - 89) % 4 === 3 ? C.maderaS : h(x >> 2, y >> 2, 466) < 0.15 ? C.maderaS : C.madera);
      poligono([[x0 - 4, 89], [(x0 + x1) / 2, 74], [x1 + 4, 89]], C.k); poligono([[x0 - 2, 88], [(x0 + x1) / 2, 76], [x1 + 2, 88]], b_P.nieve); linea((x0 + x1) / 2, 76, x1 + 2, 88, b_P.nieveS); for (let x = x0 - 2; x < x1 + 3; x += 3) pset(x, 89 + (x % 2), b_P.nieveL);
      rect(x0 + 6, 94, x0 + 16, 103, C.k); rect(x0 + 7, 95, x0 + 15, 102, hex('#f0c060')); rect(x0 + 11, 95, x0 + 11, 102, C.k); rect(x0 + 7, 98, x0 + 15, 98, C.k); rect(x0 + 6, 103, x0 + 16, 104, b_P.nieve);
      rect(x0 + 24, 94, x0 + 34, y1, C.k); rect(x0 + 25, 95, x0 + 33, y1, C.maderaS); pset(x0 + 31, 103, b_P.laton); rect(x1 - 8, 72, x1 - 4, 82, C.k); rect(x1 - 7, 73, x1 - 5, 82, hex('#6a6a70')); rect(x1 - 8, 71, x1 - 4, 72, b_P.nieve);
      for (let x = x0 - 6; x < x1 + 6; x++) pset(x, y1 + 1, b_P.nieveS); rect(x0 + 2, 108, x0 + 5, 112, C.maderaS); }
    // el camión militar oliva con la lona nevada
    { const x0 = 20, y1 = 122; rect(x0, y1 - 28, x0 + 52, y1 - 8, C.k); rect(x0 + 1, y1 - 27, x0 + 51, y1 - 9, b_P.olivaS); for (let x = x0 + 2; x < x0 + 51; x += 8) rect(x, y1 - 27, x, y1 - 9, b_P.oliva); rect(x0 - 1, y1 - 30, x0 + 53, y1 - 27, b_P.nieve); rect(x0, y1 - 27, x0 + 52, y1 - 27, b_P.nieveS);
      rect(x0 + 54, y1 - 22, x0 + 76, y1 - 6, C.k); rect(x0 + 55, y1 - 21, x0 + 75, y1 - 7, b_P.oliva); rect(x0 + 60, y1 - 19, x0 + 72, y1 - 13, b_P.vidrioV); pset(x0 + 61, y1 - 18, b_P.vidrioVL); rect(x0 + 54, y1 - 24, x0 + 76, y1 - 22, b_P.nieve);
      rect(x0 + 74, y1 - 12, x0 + 80, y1 - 6, C.k); rect(x0 + 75, y1 - 11, x0 + 79, y1 - 7, b_P.olivaS); for (let y = y1 - 11; y < y1 - 6; y += 2) rect(x0 + 75, y, x0 + 79, y, C.k); disco(x0 + 78, y1 - 13, 1, hex('#f8f0c0'));
      rect(x0, y1 - 8, x0 + 80, y1 - 5, C.k); rect(x0 + 1, y1 - 7, x0 + 79, y1 - 6, b_P.olivaL); rect(x0 + 6, y1 - 20, x0 + 14, y1 - 14, hex('#e8e4d0')); disco(x0 + 10, y1 - 17, 2, C.rojo);
      for (const dx of [10, 26, 64]) { disco(x0 + dx, y1 - 2, 5, C.k); disco(x0 + dx, y1 - 2, 3, hex('#3a3a32')); pset(x0 + dx, y1 - 2, C.metal); rect(x0 + dx - 6, y1 + 2, x0 + dx + 6, y1 + 3, b_P.nieveS); } }
    // el hoyo con la mina: el fondo de tierra, la pieza a escala 2, escarchada, y el labio de nieve de delante
    for (let j = -16; j <= 14; j++) for (let i = -66; i <= 66; i++) { const d = (i / 66) ** 2 + (j / 16) ** 2; if (d > 1) continue; pset(165 + i, 138 + j, d > 0.82 ? (j < 0 ? b_P.nieveSS : b_P.tierraN) : (h(i + 200, j + 50, 467) < 0.2 ? b_P.tierraNS : j < -4 ? b_P.tierraNS : b_P.tierraN)); }
    if (o.mina !== false && PIEZAS_DC.minaPeacock) { PIEZAS_DC.minaPeacock(R, 165, 150, { s: 2, escarcha: true }); for (let x = 128; x < 202; x++) { const y = 112 + (x < 134 || x > 196 ? 2 : 0); if (h(x, 0, 468) < 0.6) pset(x, y - 1, b_P.nieve); pset(x, y, b_P.nieve); } }
    for (let j = 0; j <= 10; j++) { const w = Math.round(Math.sqrt(1 - (j / 11) ** 2) * 70); for (let i = -w; i <= w; i++) { const y = 140 + j - Math.round(Math.abs(Math.sin(i * 0.15)) * 2); if (y < 140 + 3 * Math.cos(i / 70 * Math.PI / 2)) continue; pset(165 + i, y, j < 2 ? b_P.nieveL : h(i, j, 469) < 0.2 ? b_P.nieveS : b_P.nieve); } }
    for (let i = -70; i <= 70; i++) { const y = Math.round(140 + 3 * Math.cos(i / 70 * Math.PI / 2)); pset(165 + i, y, b_P.nieveL); pset(165 + i, y - 1, b_P.nieve); }
    for (let x = 96; x < 236; x++) pset(x, 152 + Math.round(Math.sin(x * 0.2)), b_P.nieveS);
    // las palas clavadas, la caja y el farol
    for (const [x, d] of [[104, -1], [110, 1]]) { linea(x, 146, x + d * 4, 124, C.maderaS); rect(x - 2, 144, x + 2, 150, C.metalD); pset(x - 1, 145, C.metalL); }
    rect(206, 136, 224, 148, C.k); rect(207, 137, 223, 148, C.madera); rect(207, 137, 223, 138, b_P.nieve); rect(207, 142, 223, 142, C.maderaS); rect(205, 148, 225, 149, b_P.nieveS);
    // el poste del termómetro
    rect(230, 104, 236, 150, C.k); rect(231, 105, 235, 150, C.madera); rect(228, 108, 238, 136, C.k); rect(229, 109, 237, 135, hex('#e8e4d8')); for (let y = 111; y < 134; y += 3) rect(229, y, 230, y, C.k); disco(233, 133, 2, C.rojo);
  });
  // las nubes de nieve (solo sobre el cielo) y los cuervos
  const ok = (x, y) => cieloS.has(fb[y * 320 + x]);
  b_nubes(R, t, ok, 6, 44, [b_P.nubeG0, b_P.nubeG1, b_P.nubeG2, hex('#8a92a4')], 0.7, 41, 8); b_pajaros(R, t, 3, 18, 40, hex('#1e1e26'), 9, 42, ok);
  // el humo de la caseta, la luz de la ventana que tiembla y el mercurio (o.frio lo baja)
  b_humo(R, 274, 70, t, 30, hex('#9aa0aa'), hex('#d4d8de'), 7, 6); if (Math.sin(t * 7) > 0.6) for (let y = 95; y <= 102; y++) for (let x = 245; x <= 253; x++) if (x !== 249 && y !== 98) pset(x, y, hex('#f8d078'));
  { const fr = Math.max(0, Math.min(1, o.frio ?? 0.3)), top = Math.round(lerp(112, 130, fr) + Math.sin(t * 0.8) * 0.5); rect(233, top, 233, 132, C.rojo); pset(233, top - 1, hex('#e86a5a')); }
  // el farol de la caja (la llama que tiembla)
  rect(214, 128, 218, 135, C.k); pset(216, 131, Math.sin(t * 9) > 0 ? hex('#ffd04a') : hex('#ff9a3a')); pset(216, 130, hex('#fff0a0')); rect(214, 127, 218, 127, C.metalD); b_halo(R, 216, 131, 6, 5, hex('#ffd890'), 0.4);
  // la nieve que cae en tres capas (pocas en la esquina de Atom)
  for (let k = 0; k < 90; k++) { const capa = k % 3, v = [7, 12, 20][capa], x = Math.round((h(k, 1, 470) * 340 + Math.sin(t * 0.9 + k) * (2 + capa) - t * (2 + capa * 2) + 3400) % 340) - 10, y = Math.round((h(k, 2, 470) * 190 + t * v) % 190) - 5;
    if (x > 274 && y < 48 && k % 4) continue; if (capa === 2) { pset(x, y, b_P.nieveL); pset(x + 1, y, b_P.nieveL); pset(x, y + 1, b_P.nieve); } else pset(x, y, capa ? b_P.nieveL : b_P.nieve); }
  return { suelo: 160, mina: [165, 150], lomoMina: [132, 112, 198], termometro: [232, 104], camion: [20, 122, 98], caseta: [236, 112, 282] };
}

// la valla y los montones de nieve del primer plano, con copos grandes que pasan (por delante de los personajes)
function b_nieveDelante(R, t, o) {
  const { rect, pset, linea } = R;
  for (const [x0, x1] of [[-4, 84], [246, 324]]) { for (let x = x0; x <= x1; x += 22) { rect(x, 152, x + 3, 178, C.k); rect(x + 1, 153, x + 2, 178, C.madera); rect(x, 150, x + 3, 152, b_P.nieve); }
    for (const y of [158, 166]) for (let x = x0; x <= x1; x++) { const yy = y + Math.round(Math.sin((x - x0) / 22 * Math.PI) * 1.5); pset(x, yy, hex('#4a4a52')); if ((x - x0) % 7 === 3) { pset(x, yy - 1, hex('#4a4a52')); pset(x, yy + 1, hex('#4a4a52')); } } }
  for (let x = 0; x < 320; x++) { const top = Math.round(171 + 3 * Math.sin(x * 0.05) + 2 * Math.sin(x * 0.13)) + (x > 90 && x < 240 ? 4 : 0); for (let y = top; y < 180; y++) pset(x, y, y === top ? b_P.nieveL : y < top + 3 ? b_P.nieve : h(x, y, 471) < 0.15 ? b_P.nieveS : b_P.nieve); }
  for (let k = 0; k < 6; k++) { const x = Math.round((h(k, 3, 472) * 340 - t * 6 + 3400) % 340) - 10, y = Math.round((h(k, 4, 472) * 200 + t * 30) % 200) - 10; if (x > 274 && y < 48) continue; rect(x, y, x + 1, y + 1, b_P.nieveL); pset(x - 1, y, b_P.nieve); }
}

// el plano técnico azul de la mina sobre la mesa (inserto)
function b_plano(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, tr = Math.max(0, Math.min(1, o.trazo ?? 1));
  b_fijo(R, 'plano', () => {
    const B = R.buf;
    b_tablas(R, 0, 0, 319, 179, hex('#6a4a2e'), hex('#4e3420'), hex('#82603e'), hex('#3a2616'), 473, 18);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = ((x - 150) / 190) ** 2 + ((y - 96) / 120) ** 2; if (d > 0.7 && b_umbral(x, y) < (d - 0.7) * 1.2) B[y * 320 + x] = b_mezcla(B[y * 320 + x], C.k, 0.35); }
    b_calma(R, hex('#4e3622'));
    // la hoja azul con la cuadrícula
    rect(22, 18, 266, 160, hex('#14305a')); rect(20, 16, 264, 158, b_P.azulB);
    for (let y = 16; y <= 158; y++) for (let x = 20; x <= 264; x++) { if ((x - 20) % 8 === 0 || (y - 16) % 8 === 0) pset(x, y, b_P.azulBG); else if (h(x, y, 474) < 0.04) pset(x, y, b_P.azulBL); }
    rect(24, 20, 260, 20, b_P.lineaP); rect(24, 154, 260, 154, b_P.lineaP); rect(24, 20, 24, 154, b_P.lineaP); rect(260, 20, 260, 154, b_P.lineaP);
    // el corte de la mina: el cilindro de extremos redondos, las costillas, la escotilla y la caja de la electrónica
    const L = b_P.lineaP, mx0 = 70, mx1 = 226, my0 = 66, my1 = 126, ry = (my1 - my0) / 2, cy = (my0 + my1) / 2;
    linea(mx0, my0, mx1, my0, L); linea(mx0, my1, mx1, my1, L); for (let a = 0; a <= 40; a++) { const an = Math.PI / 2 + a / 40 * Math.PI; pset(Math.round(mx0 + Math.cos(an) * 22), Math.round(cy + Math.sin(an) * ry), L); pset(Math.round(mx1 - Math.cos(an) * 22), Math.round(cy + Math.sin(an) * ry), L); }
    for (const x of [104, 148, 192]) linea(x, my0, x, my1, b_P.azulBL); rect(140, 56, 156, 66, b_P.azulB); linea(140, 56, 156, 56, L); linea(140, 56, 140, 66, L); linea(156, 56, 156, 66, L);
    rect(196, 74, 222, 96, b_P.azulB); linea(196, 74, 222, 74, L); linea(196, 96, 222, 96, L); linea(196, 74, 196, 96, L); linea(222, 74, 222, 96, L); for (let k = 0; k < 4; k++) linea(200, 79 + k * 5, 218, 79 + k * 5, b_P.azulBL);
    for (let k = 0; k < 5; k++) { const x = 199 + k * 5; linea(x, 96, x, 104, b_P.azulBL); }
    // el comedero (canal largo) y el bebedero (botella boca abajo)
    linea(84, 118, 186, 118, L); linea(84, 122, 186, 122, L); linea(84, 118, 84, 122, L); linea(186, 118, 186, 122, L); for (let x = 88; x < 184; x += 4) pset(x, 120, b_P.azulBL);
    poligono([[94, 78], [104, 78], [104, 96], [101, 100], [97, 100], [94, 96]], b_P.azulBG); for (const [a, b, c, d] of [[94, 78, 104, 78], [94, 78, 94, 96], [104, 78, 104, 96], [94, 96, 97, 100], [104, 96, 101, 100]]) linea(a, b, c, d, L); linea(95, 88, 103, 88, b_P.azulBL); rect(96, 101, 102, 104, b_P.azulBL);
    // las cotas con flechas y el «7» (las toneladas)
    linea(48, my0, 48, my1, L); linea(46, my0 + 2, 48, my0, L); linea(50, my0 + 2, 48, my0, L); linea(46, my1 - 2, 48, my1, L); linea(50, my1 - 2, 48, my1, L); linea(44, my0, 52, my0, L); linea(44, my1, 52, my1, L);
    linea(mx0 - 22, 140, mx1 + 22, 140, L); linea(mx0 - 20, 138, mx0 - 22, 140, L); linea(mx0 - 20, 142, mx0 - 22, 140, L); linea(mx1 + 20, 138, mx1 + 22, 140, L); linea(mx1 + 20, 142, mx1 + 22, 140, L);
    R.numero('7', 148, 50, { color: L, sombra: false });
    // el cajetín de rayas abajo a la derecha (sin letras)
    linea(196, 140, 258, 140, L); linea(196, 140, 196, 152, L); for (const y of [144, 148]) linea(198, y, 254, y, b_P.azulBL); linea(226, 140, 226, 152, L);
    // la regla, la goma, el lápiz y la taza
    poligono([[180, 166], [312, 136], [316, 146], [184, 176]], C.k); poligono([[181, 166], [311, 137], [314, 145], [184, 174]], hex('#e8c860')); for (let k = 0; k < 26; k++) { const x = 186 + k * 5, y = Math.round(166 - k * 1.13); linea(x, y, x, y + (k % 2 ? 2 : 4), hex('#6a5420')); }
    rect(30, 164, 44, 170, C.k); rect(31, 165, 43, 169, hex('#e88a9a')); rect(31, 165, 43, 165, hex('#f8b8c0'));
    linea(274, 30, 300, 80, C.k); linea(275, 30, 301, 80, hex('#e8c040')); linea(276, 30, 302, 80, hex('#b8901c')); linea(300, 80, 303, 86, hex('#f0c8a0')); pset(303, 87, C.k);
    disco(290, 120, 13, C.k); disco(290, 120, 12, hex('#e8e4d8')); disco(290, 120, 9, hex('#5a3a22')); disco(288, 118, 4, hex('#7a5232')); R.anillo(304, 122, 4, C.k);
    R.anillo(292, 150, 11, hex('#5a3e28')); R.anillo(292, 150, 12, hex('#5a3e28'), 3);   // un cerco de taza en la mesa
  });
  // las gallinas del corte, que se dibujan poco a poco (o.trazo)
  const L = b_P.lineaP, gs = [[118, 104], [150, 106], [176, 104]];
  gs.forEach(([x, y], k) => { const u = Math.max(0, Math.min(1, tr * 3 - k)); if (u <= 0) return; const n = Math.round(u * 24);
    const pts = []; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; pts.push([Math.round(x + Math.cos(a) * 8), Math.round(y + Math.sin(a) * 5)]); }
    for (let i = 0; i < n; i++) pset(pts[i][0], pts[i][1], L);
    if (u > 0.6) { R.anillo(x + 8, y - 7, 3, L); pset(x + 12, y - 7, L); pset(x + 13, y - 7, L); pset(x + 8, y - 11, L); pset(x + 9, y - 11, L); linea(x - 2, y + 5, x - 2, y + 9, L); linea(x + 3, y + 5, x + 3, y + 9, L); linea(x - 8, y - 2, x - 12, y - 6, L); } });
  // el compás que gira despacio sobre su punta: la cabeza con el mango, la pata de la aguja y la del lápiz, y el arco
  { const a = Math.sin(t * 0.6) * 0.25, hx = 236 + Math.round(Math.sin(a) * 6), hy = 38, p1 = [222, 86], p2 = [Math.round(236 + 16 + Math.sin(a) * 18), 86 - Math.round(Math.abs(Math.sin(a)) * 4)];
    R.anillo(p1[0], p1[1], 30, b_P.azulBL, 5);
    for (const [px, py, c] of [[p1[0], p1[1], C.metalL], [p2[0], p2[1], C.metal]]) { linea(hx + 1, hy + 1, px + 1, py + 1, hex('#14305a')); linea(hx - 1, hy, px - 1, py, C.k); linea(hx + 1, hy, px + 1, py, C.k); linea(hx, hy, px, py, c); }
    pset(p1[0], p1[1] + 1, C.k); rect(p2[0] - 1, p2[1] - 4, p2[0] + 1, p2[1], hex('#e8c040')); pset(p2[0], p2[1] + 1, hex('#3a3a3a'));
    disco(hx, hy, 3, C.k); disco(hx, hy, 2, C.metalL); pset(hx - 1, hy - 1, C.blanco); rect(hx - 1, hy - 8, hx + 1, hy - 3, C.k); rect(hx, hy - 7, hx, hy - 3, C.metalL); }
  // la taza humea y la luz de la lámpara tiembla un poco
  b_humo(R, 290, 110, t, 34, hex('#c8c8cc'), hex('#f0f0f2'), 6, 2);
  b_halo(R, 150 + Math.round(Math.sin(t * 0.5) * 2), 90, 120, 70, hex('#fff2c8'), 0.08 + Math.sin(t * 5) * 0.01);
  return { suelo: 172, mina: [148, 96], gallinas: gs };
}

function b_archivo(R, t, o) {
  const { rect, pset, linea, disco } = R, dia = String(o.dia ?? 1), mes = o.mes ?? 4;
  b_fijo(R, 'archivo|' + dia + '|' + mes, () => {
    const B = R.buf;
    // el techo con sus plafones y la pared crema
    rect(0, 0, 319, 9, hex('#d8d2c2')); rect(0, 9, 319, 10, hex('#b8b0a0')); for (const x of [190, 250]) { rect(x, 3, x + 30, 6, hex('#c8c2b2')); rect(x + 1, 4, x + 29, 5, hex('#fffbe8')); }
    b_enlucido(R, 0, 11, 319, 109, b_P.crema, b_P.cremaS, hex('#f4eedc'), 480);
    // las estanterías con las cajas grises numeradas (rayas por letras)
    for (const [x0, x1] of [[0, 92], [204, 270]]) { rect(x0, 18, x1, 110, C.k); rect(x0 + 1, 19, x1 - 1, 109, b_P.baldaA);
      for (let s = 0; s < 4; s++) { const y0 = 22 + s * 22; rect(x0 + 1, y0 + 19, x1 - 1, y0 + 20, b_P.cajaAS); rect(x0 + 1, y0 + 19, x1 - 1, y0 + 19, C.metalL);
        for (let x = x0 + 3; x < x1 - 6; ) { const w = 7 + Math.round(h(x, s, 481) * 4), alto = 15 + Math.round(h(x, s, 482) * 3), inc = h(x, s, 483) < 0.06; if (inc) { x += w; continue; }
          rect(x, y0 + 19 - alto, x + w - 1, y0 + 18, b_P.cajaA); rect(x, y0 + 19 - alto, x + w - 1, y0 + 19 - alto, b_P.cajaAL); rect(x + w - 1, y0 + 19 - alto, x + w - 1, y0 + 18, b_P.cajaAS); rect(x + 1, y0 + 22 - alto, x + w - 3, y0 + 25 - alto, b_P.etiqueta); pset(x + 2, y0 + 23 - alto, C.k); pset(x + 3, y0 + 23 - alto, C.k); rect(x + 2, y0 + 14, x + w - 3, y0 + 14, b_P.cajaAS); x += w + 1; } } }
    // la escalera de biblioteca apoyada en la estantería de la izquierda
    linea(70, 22, 82, 112, C.k); linea(80, 22, 92, 112, C.k); linea(71, 22, 83, 112, C.madera); linea(81, 22, 93, 112, C.madera); for (let k = 0; k < 9; k++) { const y = 28 + k * 10; linea(71 + Math.round((y - 16) / 8), y, 81 + Math.round((y - 16) / 8), y, C.maderaL); } rect(68, 20, 84, 21, C.metalD);
    // el calendario de pared: la hoja con el día grande y la fila de los doce meses con el suyo marcado
    rect(118, 26, 160, 80, C.k); rect(119, 27, 159, 79, b_P.papel); rect(119, 27, 159, 36, C.rojo); rect(119, 27, 159, 27, hex('#e86a5a')); for (const x of [126, 152]) { rect(x, 24, x + 1, 29, C.metalD); }
    R.numero(dia, 139, 64, { tam: 16, centro: true });
    for (let k = 0; k < 12; k++) { const x = 122 + (k % 6) * 6, y = 68 + Math.floor(k / 6) * 5; rect(x, y, x + 3, y + 2, k + 1 === mes ? C.rojo : b_P.papelS); }
    rect(159, 30, 160, 79, b_P.papelS); rect(121, 79, 159, 80, b_P.papelS);
    // el reloj y el grabado enmarcado
    disco(184, 40, 9, C.k); disco(184, 40, 8, b_P.papel); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(184 + Math.round(Math.cos(a) * 7), 40 + Math.round(Math.sin(a) * 7), C.k); }
    rect(166, 56, 198, 82, C.k); rect(167, 57, 197, 81, b_P.laton); rect(170, 60, 194, 78, b_P.papel); linea(171, 74, 182, 64, hex('#8a8a8a')); linea(182, 64, 193, 76, hex('#8a8a8a')); disco(188, 65, 2, hex('#c8c8c8')); for (let x = 171; x < 194; x += 2) pset(x, 76, hex('#a8a8a8'));
    // el pilar de la derecha, tranquilo, con su aplique
    rect(274, 11, 319, 109, hex('#ddd4be')); rect(274, 11, 275, 109, b_P.cremaS); for (let y = 20; y < 109; y += 18) rect(276, y, 319, y, hex('#d2c8b0'));
    rect(292, 60, 300, 64, b_P.laton); rect(290, 54, 302, 60, hex('#f4ecd0'));
    // el zócalo y la moqueta con su dibujo, en perspectiva
    rect(0, 108, 319, 112, hex('#5a4a3a')); rect(0, 108, 319, 108, hex('#7a6a5a'));
    for (let y = 113; y < 180; y++) { const d = y - 100; for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 3, v = 260 / d, iu = Math.floor(u), iv = Math.floor(v), fu = u - iu, fv = v - iv; let c = b_P.moqueta;
      if (Math.abs(fu - 0.5) + Math.abs(fv - 0.5) < 0.18) c = b_P.moquetaL; else if (fu < 0.05 || fv < 0.05) c = b_P.moquetaS; if (h(x, y, 484) < 0.05) c = b_P.moquetaS; B[y * 320 + x] = c; } }
    // la mesa del fondo con dos lámparas verdes y sus sillas
    rect(150, 112, 270, 115, C.k); rect(151, 112, 269, 113, C.maderaL); rect(151, 114, 269, 114, C.madera); for (const x of [154, 264]) rect(x, 116, x + 2, 128, C.maderaS);
    for (const x of [176, 236]) { rect(x - 1, 106, x + 1, 111, b_P.latonS); R.poligono([[x - 6, 106], [x - 4, 102], [x + 4, 102], [x + 6, 106]], C.k); R.poligono([[x - 5, 105], [x - 3, 103], [x + 3, 103], [x + 5, 105]], b_P.verdeL); rect(x - 4, 102, x + 4, 102, b_P.verdeLL); rect(x - 3, 106, x + 3, 106, hex('#fff2c8')); b_halo(R, x, 112, 14, 4, hex('#fff2c8'), 0.4); }
  });
  // los lectores diminutos de la mesa del fondo (pasan página, levantan la cabeza)
  for (const [x, k] of [[196, 0], [214, 1], [252, 2]]) { const s = Math.floor(t * 0.7 + k * 1.3) % 5 === 0 ? 1 : 0; b_paseante(R, x, 111 + s, t, k + 1, { quieto: true, ropa: [hex('#3a4a6a'), hex('#7a3a3a'), hex('#4a5a3a')][k] }); rect(x - 2, 111, x + 4, 111, b_P.papel); if (Math.floor(t * 0.5 + k) % 4 === 0) pset(x + 4, 110, b_P.papel); }
  // el archivero que empuja el carrito por el pasillo del fondo
  { const u = (t * 0.03) % 1, x = Math.round(lerp(-30, 340, u)); if (x < 140 || x > 280) { b_paseante(R, x, 116, t, 5, { ropa: hex('#6a4a7a') }); rect(x + 5, 108, x + 15, 113, C.k); rect(x + 6, 108, x + 14, 112, b_P.cajaA); rect(x + 6, 108, x + 14, 108, b_P.cajaAL); disco(x + 7, 115, 1, C.k); disco(x + 13, 115, 1, C.k); } }
  // las agujas del reloj
  { const m = t * 0.5, hh = t * 0.04 + 2; linea(184, 40, 184 + Math.round(Math.sin(m) * 6), 40 - Math.round(Math.cos(m) * 6), C.k); linea(184, 40, 184 + Math.round(Math.sin(hh) * 4), 40 - Math.round(Math.cos(hh) * 4), C.k); pset(184, 40, C.rojo); }
  // el fogonazo de las cámaras (o.flash): la luz que lo baña todo y la estrella del flash
  const fl = Math.max(0, Math.min(1, o.flash ?? 0));
  if (fl > 0) { const pos = o.flashes ?? [[44, 126], [280, 122]];
    for (const [fx, fy] of pos) { b_halo(R, fx, fy, 90 * fl + 12, 60 * fl + 10, C.blanco, 1.3 * fl); b_halo(R, fx, fy, 24, 16, C.blanco, 1.6 * fl); for (let k = -Math.round(4 + 6 * fl); k <= 4 + 6 * fl; k++) { pset(fx + k, fy, C.blanco); pset(fx, fy + k, C.blanco); } for (let k = -3; k <= 3; k++) { pset(fx + k, fy + k, C.blanco); pset(fx + k, fy - k, C.blanco); } disco(fx, fy, 2, C.blanco); } }
  return { suelo: 166, detrasMesa: 154, mesa: [96, 147, 228], calendario: [118, 26, 160, 80] };
}

// la mesa larga del archivo (por delante): tablero de madera con su canto, faldón, dos lámparas verdes encendidas,
// papeles, un lápiz y la caja de archivo cerrada
function b_archivoDelante(R, t, o) {
  const { rect, pset, linea, disco } = R;
  rect(94, 145, 230, 150, C.k); for (let x = 95; x <= 229; x++) { pset(x, 146, C.maderaL); pset(x, 147, h(x >> 2, 3, 485) < 0.2 ? C.maderaS : C.madera); pset(x, 148, C.madera); pset(x, 149, C.maderaS); }
  rect(98, 151, 226, 164, C.k); for (let y = 152; y <= 163; y++) for (let x = 99; x <= 225; x++) pset(x, y, (x - 99) % 32 === 0 ? C.maderaD : h(x >> 2, y, 486) < 0.08 ? C.maderaS : C.madera);
  for (const x of [100, 220]) { rect(x, 164, x + 4, 176, C.k); rect(x + 1, 164, x + 3, 175, C.madera); }
  for (const x of [112, 212]) { rect(x - 3, 143, x + 3, 145, b_P.latonS); rect(x - 1, 134, x + 1, 143, b_P.laton); R.poligono([[x - 8, 134], [x - 5, 129], [x + 5, 129], [x + 8, 134]], C.k); R.poligono([[x - 7, 133], [x - 4, 130], [x + 4, 130], [x + 7, 133]], b_P.verdeL); rect(x - 4, 130, x + 4, 130, b_P.verdeLL); rect(x - 6, 134, x + 6, 134, hex('#fff2c8')); b_halo(R, x, 145, 18, 4, hex('#fff2c8'), 0.45); }
  rect(130, 140, 150, 145, C.k); rect(131, 141, 149, 144, b_P.papel); linea(133, 142, 147, 142, b_P.papelS); rect(156, 141, 172, 145, b_P.papelS); rect(155, 140, 171, 144, b_P.papel);
  linea(176, 144, 190, 142, C.k); linea(176, 143, 188, 141, hex('#e8c040'));
  rect(194, 134, 208, 145, C.k); rect(195, 135, 207, 145, b_P.cajaA); rect(195, 135, 207, 136, b_P.cajaAL); rect(197, 138, 203, 140, b_P.etiqueta);
}

// la caja de archivo que se abre (inserto)
function b_caja(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, ab = Math.max(0, Math.min(1, o.abre ?? 0.7));
  b_fijo(R, 'caja', () => {
    b_tablas(R, 0, 0, 319, 179, hex('#7a5232'), hex('#5a3a22'), hex('#946a42'), hex('#3e2614'), 487, 20);
    b_halo(R, 170, 80, 170, 110, hex('#fff2c8'), 0.25);
    b_calma(R, hex('#6a4a2c'));
    // los guantes de algodón, el lápiz, la lupa y una hoja suelta
    for (const [x, y] of [[38, 128], [56, 140]]) { R.poligono([[x, y], [x + 16, y - 4], [x + 20, y + 8], [x + 4, y + 12]], hex('#c8c4b8')); R.poligono([[x + 1, y + 1], [x + 15, y - 3], [x + 18, y + 7], [x + 4, y + 10]], hex('#f4f2ec')); for (let k = 0; k < 3; k++) linea(x + 16 + k, y - 3 + k * 3, x + 22 + k, y - 5 + k * 3, hex('#f4f2ec')); }
    linea(36, 166, 92, 156, C.k); linea(36, 165, 90, 155, hex('#e8c040')); pset(92, 156, hex('#f0c8a0'));
    disco(276, 150, 12, C.k); disco(276, 150, 11, C.metalL); disco(276, 150, 9, hex('#c8e4ee')); linea(284, 158, 300, 174, C.k); linea(285, 158, 301, 174, C.maderaS); pset(272, 146, C.blanco); pset(273, 145, C.blanco);
    R.poligono([[236, 40], [278, 34], [284, 70], [242, 76]], b_P.papelS); R.poligono([[237, 41], [277, 35], [282, 69], [243, 75]], b_P.papel); for (let k = 0; k < 6; k++) linea(242, 46 + k * 5, 274, 41 + k * 5, b_P.papelS);
    // el cuerpo de la caja: gris, con su asa troquelada, la etiqueta de rayas y el canto en sombra
    poligono([[96, 92], [232, 92], [244, 82], [244, 150], [232, 162], [96, 162]], C.k); rect(97, 93, 231, 161, b_P.cajaA); poligono([[232, 93], [243, 84], [243, 150], [232, 160]], b_P.cajaAS);
    for (let y = 93; y < 162; y++) for (let x = 97; x < 232; x++) if (h(x >> 1, y, 488) < 0.05) pset(x, y, b_P.cajaAS);
    rect(150, 140, 178, 146, C.k); rect(151, 141, 177, 145, hex('#4a4e56')); rect(110, 102, 150, 120, b_P.etiqueta); for (const y of [106, 110, 114]) linea(113, y, 146, y, hex('#9aa0b0')); R.numero('4', 168, 116, { color: C.k, sombra: false });
    // el hueco de dentro, en sombra
    poligono([[98, 92], [232, 92], [243, 83], [110, 83]], hex('#3a3e46'));
  });
  const pintaTapa = () => {
  // la tapa que se levanta sobre su bisagra de atrás
  { const a = ab * Math.PI * 0.62, top = 83 - Math.round(Math.sin(a) * 52), dx = Math.round(Math.cos(a) * 9);
    poligono([[96, 92 - Math.round(Math.sin(a) * 2)], [232, 92 - Math.round(Math.sin(a) * 2)], [244 + dx - 9, top], [108 + dx - 9, top]], C.k);
    poligono([[98, 91 - Math.round(Math.sin(a) * 2)], [231, 91 - Math.round(Math.sin(a) * 2)], [242 + dx - 9, top + 1], [110 + dx - 9, top + 1]], ab > 0.5 ? b_P.cajaAS : b_P.cajaAL);
    if (ab < 0.15) rect(97, 92, 231, 96, b_P.cajaAL); }
  };
  if (ab >= 0.5) pintaTapa();
  // los expedientes atados que asoman, con la cinta, el lazo y el sello rojo
  const sube = Math.round(ab * 16);
  for (let k = 0; k < 4; k++) { const x0 = 104 + k * 30, y0 = 86 - Math.round(sube * (k === 1 ? 1 : 0.5)) - (k % 2) * 2; rect(x0, y0, x0 + 28, 92, C.k); rect(x0 + 1, y0 + 1, x0 + 27, 92, [b_P.carpeta ?? hex('#d8c8a0'), hex('#c8b890'), hex('#d8c8a0'), hex('#bca880')][k]); rect(x0 + 1, y0 + 1, x0 + 27, y0 + 1, b_P.papel); rect(x0 + 12, y0 + 1, x0 + 14, 92, b_P.cinta); }
  { const x = 150, y = 86 - sube; for (const [dx, dy] of [[-4, -2], [-3, -3], [-2, -2], [2, -2], [3, -3], [4, -2], [-1, 0], [0, 0], [1, 0], [-2, 2], [2, 2]]) pset(x + dx - 13 + 13, y + dy, b_P.cinta); pset(x, y, b_P.cintaS); disco(139, y + 8, 4, C.k); disco(139, y + 8, 3, C.rojo); linea(137, y + 8, 141, y + 8, hex('#8e2424')); pset(138, y + 6, hex('#e86a5a')); }
  if (ab < 0.5) pintaTapa();
  // las hojas que salen y se abren en abanico (con ab > 0.6), y motas en la luz
  if (ab > 0.6) { const u = (ab - 0.6) / 0.4; for (let k = 0; k < 3; k++) { const v = Math.max(0, Math.min(1, u * 1.6 - k * 0.3)); if (v <= 0) continue; const cx = Math.round(170 + (k - 1) * 30 * v + Math.sin(t * 1.5 + k) * 2), cy = Math.round(80 - v * 34 - k * 3 + Math.sin(t * 2 + k) * 1.5), r = (k - 1) * 0.25 * v;
      const pts = [[-12, -15], [12, -15], [12, 15], [-12, 15]].map(([x, y]) => [Math.round(cx + x * Math.cos(r) - y * Math.sin(r)), Math.round(cy + x * Math.sin(r) + y * Math.cos(r))]);
      poligono(pts, C.k); poligono(pts.map(([x, y], i) => [x + (i === 0 || i === 3 ? 1 : -1), y + (i < 2 ? 1 : -1)]), b_P.papel); for (let j = 0; j < 5; j++) linea(cx - 8, cy - 9 + j * 4, cx + 8, cy - 9 + j * 4 + Math.round(r * 16), j === 0 ? C.rojo : b_P.papelS); } }
  for (let k = 0; k < 12; k++) { const x = Math.round(120 + h(k, 1, 489) * 110 + Math.sin(t * 0.6 + k) * 5), y = Math.round(150 - ((t * 5 + h(k, 2, 489) * 130) % 130)); if (y > 20) b_tine(R, x, y, hex('#fff2c8'), 0.6); }
  return { suelo: 172, caja: [160, 118] };
}

// la paleta de los setenta, los ochenta, 1995 y el archivo de noche
const c_P = pal({
  techo: '#e2d8c2', techoS: '#bcb098', techoL: '#f4ecda', tubo: '#fffbe8', tuboS: '#d8d2bc',
  most: '#c8a03a', mostS: '#a07c2a', mostL: '#dcb858', nar: '#d8742a', narS: '#a8521c', narL: '#ec9248', crema: '#f2e4c0', cafe: '#6a4026',
  yeso: '#e6d6b4', yesoS: '#cfbd98', yesoL: '#f2e6c8',
  pan: '#7a4c2c', panS: '#5a341c', panL: '#9a6a40', panD: '#341c0e',
  moq0: '#7a3414', moq1: '#a4481a', moq2: '#c4622a', moq3: '#e08a48',
  cob: '#b8784a', cobS: '#8a5434', cobL: '#e2a874', cobD: '#4e2e1a', cobI: '#6a4430', cobIS: '#4a2c1e',
  ace: '#5e6a64', aceS: '#3e4844', aceL: '#8a968e', aceD: '#262e2c',
  bei: '#cfc6aa', beiS: '#9c937a', beiL: '#ebe4cc', beiD: '#5c5646',
  scope: '#0c2418', scopeL: '#4af08a', scopeM: '#1e6a3a', papel: '#f6f0e0', papelS: '#d8ceb4', tinta: '#2a3a8a', tintaR: '#c8302a',
  lapiz: '#5a5a66', lapizS: '#8a8a94', amar: '#f0c030', amarS: '#b88a18', rosa: '#e88a9a',
  cielo1: '#5aa6e6', cielo2: '#84c0f0', cielo3: '#b6dcf4', colina: '#b8a46a', colinaS: '#8e8a52', palma: '#3a7a3a', palmaS: '#24562a', tronco: '#8a6a4a',
  bloq: '#c6be9a', bloqS: '#a69e7c', bloqL: '#dad2b0', bloqJ: '#8c8466', caqui: '#66704e', caquiS: '#4a5238', caquiL: '#808a66',
  mar0: '#2e2218', mar1: '#43321f', mar2: '#58422a', mar3: '#6e5636',
  cor: '#b88a52', corS: '#94683a', corL: '#d2a46c', corD: '#6a4624', oliva: '#5e6a46', olivaS: '#434c32', olivaL: '#7e8a62',
  p95: '#d8ccb2', p95S: '#bfb196', p95L: '#ebe1ca', malva: '#7a5a6c', malvaS: '#5a4050', malvaL: '#94748a',
  az0: '#323c52', az1: '#465670', az2: '#5a6c8a', az3: '#7888a6',
  luna: '#ece6cc', lunaL: '#fffbe6', lunaM: '#c4be9e', lunaS: '#9a9478', noche0: '#0e1430', noche1: '#18204a', noche2: '#24305e',
});

// la caché de los fondos fijos del grupo: cada uno se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma
const c_CACHE = new WeakMap();

function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla dos colores (a = 0 el primero, 1 el segundo)
const c_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

const c_lim = (u) => Math.max(0, Math.min(1, u));

// oscurece (f < 1) o aclara hacia col (a) lo que ya hay pintado en un punto
function c_tono(R, x, y, a, col) { const c = R.pget(x, y); if (c) R.pset(x, y, c_mez(c, col, a)); }

// la sombra blanda de un objeto: oscurece lo de debajo en una elipse
function c_sombra(R, cx, cy, rx, ry, a = 0.3) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) c_tono(R, x, cy + j, a, C.k); }
}

// luz tramada sobre un rectángulo (un pixel de cada dos), hacia col
function c_luzRect(R, x0, y0, x1, y1, a, col = C.blanco) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0) c_tono(R, x, y, a, col); }

// techo de placas acústicas: la rejilla de perfiles, el canto de luz y el punteado de las placas
function c_techo(R, y0, y1, c, cS, cL, k = 0) {
  R.rect(0, y0, 319, y1, c);
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const u = x % 26, v = (y - y0) % 9;
    if (u === 0 || v === 8) R.pset(x, y, cS); else if (u === 1 || v === 0) R.pset(x, y, cL); else if (h(x, y, 530 + k) < 0.1) R.pset(x, y, cS);
  }
}

// papel pintado de los setenta: columnas de círculos concéntricos naranja y café sobre mostaza, a tresbolillo, con la
// pared más oscura junto al techo
function c_papel70(R, x0, y0, x1, y1) {
  const P = c_P;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const col = Math.floor((x - x0) / 22), u = (x - x0) % 22 - 11, v = ((y - y0 + (col & 1) * 11) % 22) - 11, d = Math.hypot(u, v);
    let c = d < 2.2 ? P.crema : d < 4.2 ? P.cafe : d < 5.2 ? P.most : d < 8.2 ? P.nar : d < 9.2 ? P.narS : P.most;
    if (d >= 9.2 && (u === -11 || u === 10)) c = P.mostS;
    if (d >= 4.2 && d < 8.2 && u + v < -4) c = P.narL;
    const sombra = 1 - (y - y0) / 10; if (sombra > 0 && h(x, y, 531) < sombra) c = c_mez(c, C.k, 0.25);
    R.pset(x, y, c);
  }
}

// yeso pintado con grano fino (pared tranquila)
function c_yeso(R, x0, y0, x1, y1, c, cS, cL, k = 0) { R.rect(x0, y0, x1, y1, c); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x, y, 532 + k); if (n < 0.07) R.pset(x, y, cS); else if (n > 0.95) R.pset(x, y, cL); } }

// panelado de madera vertical: tablas de ancho w con la ranura oscura, el canto de luz y vetas onduladas
function c_panelado(R, x0, y0, x1, y1, c, cS, cL, cD, w = 11, k = 0) {
  R.rect(x0, y0, x1, y1, c);
  for (let bx = x0; bx <= x1; bx += w) {
    R.rect(bx, y0, bx, y1, cD); R.rect(bx + 1, y0, bx + 1, y1, cL);
    if (h(bx, 1, 533 + k) < 0.4) R.rect(bx + 2, y0, Math.min(x1, bx + w - 1), y1, c_mez(c, cS, 0.35));
    for (let g = 0; g < 3; g++) { const gx = bx + 3 + g * 3 + Math.round(h(bx, g, 534 + k) * 2), f = h(bx, g, 535 + k) * 6;
      for (let y = y0; y <= y1; y++) { const x = gx + Math.round(Math.sin(y * 0.07 + f) * 1.3 + Math.sin(y * 0.21 + f * 2) * 0.5); if (x < bx + w && x <= x1 && h(x, y >> 2, 536 + k) > 0.2) R.pset(x, y, g === 1 ? cL : cS); } }
    if (h(bx, 7, 537 + k) < 0.5) { const ny = y0 + 6 + Math.round(h(bx, 8, 537 + k) * (y1 - y0 - 12)), nx = bx + 5; R.disco(nx, ny, 1.6, cS); R.pset(nx, ny, cD); }
  }
}

// moqueta de pelo: cuatro tonos de ruido fino, más clara hacia delante (cols: de oscuro a claro)
function c_moqueta(R, x0, y0, x1, y1, cols, k = 0, grano = 1) {
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0); for (let x = x0; x <= x1; x++) {
    const n = h(x, y, 520 + k) * 0.8 + h(x >> grano, y >> grano, 521 + k) * 0.6 - 0.75 + p * 0.45;
    R.pset(x, y, cols[n < -0.2 ? 0 : n < 0.25 ? 1 : n < 0.5 ? 2 : 3]); } }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba); respeta R.recorte
function c_nube(R, cx, cy, w, tonos = [hex('#c4d6ea'), hex('#e6f0f8'), C.blanco]) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), tonos[0]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), tonos[1]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.65), tonos[2]);
}

// cielo de día tramado en tres bandas para una ventana, con nubes a tres velocidades y pájaros; todo dentro del hueco
function c_cieloDia(R, t, x0, y0, x1, y1, k = 0, tonos) {
  const P = c_P, cs = tonos || [P.cielo1, P.cielo2, P.cielo3];
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0); for (let x = x0; x <= x1; x++) { const d = p + (((x + y) & 1) ? 0.07 : -0.07); R.pset(x, y, d < 0.36 ? cs[0] : d < 0.7 ? cs[1] : cs[2]); } }
  R.recorte([x0, y0, x1, y1]);
  const W = x1 - x0 + 50;
  for (let i = 0; i < 4; i++) { const v = 0.8 + (i % 3) * 1.3, cx = x0 - 25 + ((h(i, 1, 540 + k) * W + t * v) % W), cy = y0 + 5 + Math.round(h(i, 2, 540 + k) * (y1 - y0) * 0.35); c_nube(R, cx, cy, 8 + (i % 3) * 4); }
  for (let i = 0; i < 2; i++) { const bx = x0 + ((h(i, 3, 541 + k) * W + t * (6 + i * 3)) % W) - 10, by = y0 + 6 + i * 5 + Math.round(Math.sin(t * 1.5 + i) * 1.5), a = Math.sin(t * 9 + i * 2) > 0 ? 1 : 0;
    R.pset(bx - 2, by - a, C.k); R.pset(bx - 1, by - 1 + a, C.k); R.pset(bx, by, C.k); R.pset(bx + 1, by - 1 + a, C.k); R.pset(bx + 2, by - a, C.k); }
  R.recorte(null);
}

// una palmera que se mece (x, suelo: pie; alto en px); respeta R.recorte
function c_palmera(R, x, suelo, alto, t, k = 0) {
  const P = c_P, top = suelo - alto, s = Math.sin(t * 1.6 + k) * 1.5;
  for (let y = suelo; y >= top; y--) { const u = (suelo - y) / alto, xx = Math.round(x + u * u * (3 + s)); R.pset(xx, y, (y & 1) ? P.tronco : c_mez(P.tronco, C.k, 0.3)); R.pset(xx + 1, y, c_mez(P.tronco, C.k, 0.35)); }
  const cx = Math.round(x + 3 + s), cy = top;
  for (let i = 0; i < 7; i++) { const a = -Math.PI + i * Math.PI / 6 + Math.sin(t * 2 + i + k) * 0.08, L = 9 + (i % 2) * 3;
    for (let r = 1; r <= L; r++) { const xx = Math.round(cx + Math.cos(a) * r), yy = Math.round(cy + Math.sin(a) * r * 0.55 + (r * r) / (L * 2.2)); R.pset(xx, yy, r > L * 0.6 ? P.palma : P.palmaS); if (r % 2 === 0) R.pset(xx, yy + 1, P.palmaS); } }
  R.disco(cx, cy + 1, 1.5, c_mez(P.tronco, C.k, 0.4));
}

// un reloj de pared redondo: aro, esfera con marcas, horas y minutos (h0: la hora al empezar) y el segundero rojo a saltos
function c_reloj(R, cx, cy, r, t, h0, aro) {
  const { disco, pset, linea } = R;
  disco(cx + 1, cy + 1, r + 1, c_mez(aro, C.k, 0.6)); disco(cx, cy, r + 1, C.k); disco(cx, cy, r, aro); disco(cx, cy, r - 1.5, hex('#f6f0e2'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, q = r - 2.5; pset(Math.round(cx + Math.cos(a) * q), Math.round(cy + Math.sin(a) * q), k % 3 ? C.grisL : C.k); }
  const hora = h0 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(ah) * r * 0.45), Math.round(cy + Math.sin(ah) * r * 0.45), C.k);
  linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 2)), Math.round(cy + Math.sin(am) * (r - 2)), C.k);
  linea(cx, cy, Math.round(cx + Math.cos(as) * (r - 2)), Math.round(cy + Math.sin(as) * (r - 2)), C.rojo); pset(cx, cy, C.oro);
  pset(cx - Math.round(r * 0.5), cy - Math.round(r * 0.5), C.blanco);
}

// cifras de 3 × 5 (solo números: contadores, coordenadas)
const c_CIF = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'], '.': ['...', '...', '...', '...', '.#.'], ',': ['...', '...', '...', '.#.', '#..'] };

function c_cifras(R, s, x, y, c, esc = 1) { for (const ch of String(s)) { const g = c_CIF[ch]; if (g) g.forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') R.rect(x + i * esc, y + j * esc, x + i * esc + esc - 1, y + j * esc + esc - 1, c); }); x += 4 * esc; } }

// malla de cobre de la jaula de Faraday: la trama de hilos cada 3 px, los nudos, un brillo diagonal y la sombra de abajo
function c_malla(R, x0, y0, x1, y1, interior = false) {
  const P = c_P, [c, cS, cL, cD] = interior ? [P.cobI, P.cobIS, P.cob, P.cobD] : [P.cob, P.cobS, P.cobL, P.cobD];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const gx = x % 3 === 0, gy = y % 3 === 0, brillo = ((x - y * 0.6) % 70 + 70) % 70 < 9;
    let col = gx && gy ? cD : gx || gy ? cS : brillo ? cL : c;
    if (y > y1 - 10 && h(x, y, 538) < (y - (y1 - 10)) / 14) col = c_mez(col, C.k, 0.3);
    R.pset(x, y, col);
  }
}

// ─ 'sri' general ─
function c_sri(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  c_fijo(R, 'sri', () => {
    c_techo(R, 0, 16, P.techo, P.techoS, P.techoL);
    rect(186, 3, 242, 10, P.tuboS); rect(187, 4, 241, 9, P.tubo); for (let x = 190; x < 240; x += 4) linea(x, 4, x, 9, P.techo);
    rect(0, 17, 319, 18, P.panD); rect(0, 17, 319, 17, P.pan);
    c_papel70(R, 0, 19, 243, 93);
    c_yeso(R, 244, 19, 319, 93, P.yeso, P.yesoS, P.yesoL);
    for (let x = 244; x <= 319; x++) for (let y = 19; y < 26; y++) if (h(x, y, 539) < 1 - (y - 19) / 7) pset(x, y, P.yesoS);
    rect(0, 94, 319, 97, P.pan); rect(0, 94, 319, 94, P.panL); rect(0, 97, 319, 97, P.panD);
    c_panelado(R, 0, 98, 319, 143, P.pan, P.panS, P.panL, P.panD, 11, 1);
    rect(0, 144, 319, 147, P.panS); rect(0, 144, 319, 144, P.panL); rect(0, 147, 319, 147, P.panD);
    c_moqueta(R, 0, 148, 319, 179, [P.moq0, P.moq1, P.moq2, P.moq3], 1);
    // las sombras en la moqueta (cuarto, rack, carrito)
    for (let y = 148; y < 156; y++) for (let x = 20; x < 186; x++) if (h(x, y, 542) < 0.9 - (y - 148) * 0.1) c_tono(R, x, y, 0.35, C.k);
    c_sombra(R, 210, 150, 26, 3, 0.35); c_sombra(R, 256, 150, 22, 3, 0.3);
    // el cable gordo que va por la moqueta del cuarto al rack
    for (let x = 150; x <= 196; x++) { const y = Math.round(152 + Math.sin((x - 150) / 46 * Math.PI) * 6); pset(x, y, C.k); pset(x, y + 1, hex('#2a2a32')); if (x % 9 === 0) pset(x, y, hex('#5a5a66')); }
    // el cuarto aislado: sombra en la pared, estructura de acero, malla de cobre, costuras con remaches
    for (let y = 34; y <= 147; y++) for (let x = 181; x <= 185; x++) c_tono(R, x, y, 0.3, C.k);
    rect(22, 30, 180, 148, P.aceD); c_malla(R, 24, 36, 178, 146);
    for (let x = 48; x < 178; x += 26) { rect(x, 36, x + 1, 146, P.ace); rect(x, 36, x, 146, P.aceL); for (let y = 40; y < 146; y += 8) { pset(x, y, P.aceL); pset(x + 1, y + 1, P.aceD); } }
    rect(20, 30, 182, 35, P.ace); rect(20, 30, 182, 30, P.aceL); rect(20, 35, 182, 35, P.aceD); for (let x = 24; x < 180; x += 12) pset(x, 32, P.aceD);
    rect(22, 141, 180, 148, P.aceS); rect(22, 141, 180, 141, P.aceL);
    // la puerta con su marco, bisagras y palanca
    rect(26, 52, 52, 141, P.aceD); c_malla(R, 28, 54, 50, 140); rect(26, 52, 52, 53, P.ace); rect(26, 52, 27, 141, P.ace); rect(51, 52, 52, 141, P.aceS);
    for (const y of [60, 128]) { rect(25, y, 28, y + 5, P.aceL); pset(26, y + 2, P.aceD); }
    rect(45, 94, 49, 99, P.aceD); rect(46, 95, 48, 98, P.aceL); rect(41, 96, 47, 97, P.aceL); rect(41, 98, 47, 98, P.aceD);
    // la ventana de observación: el interior (malla, paredes en perspectiva, suelo, techo con la lámpara de jaula)
    rect(55, 55, 161, 121, P.aceD); rect(56, 56, 160, 120, P.aceL); rect(57, 57, 159, 119, C.k);
    c_malla(R, 58, 58, 158, 106, true);
    R.poligono([[58, 58], [70, 64], [70, 104], [58, 112]], (x, y) => ((x + y) % 3 ? P.cobIS : P.cobD));
    R.poligono([[158, 58], [146, 64], [146, 104], [158, 112]], (x, y) => ((x * 2 + y) % 3 ? P.cobI : P.cobIS));
    rect(58, 58, 158, 62, P.cobIS); for (let x = 60; x < 158; x += 6) pset(x, 60, P.cobD);
    for (let y = 106; y <= 118; y++) for (let x = 58; x <= 158; x++) pset(x, y, ((Math.floor(x / 8) + Math.floor(y / 4)) & 1) ? hex('#8a8476') : hex('#9a9484'));
    rect(58, 106, 158, 106, hex('#4a4438'));
    // el altavoz de pared y la silla naranja del vidente
    rect(74, 70, 86, 82, P.aceS); rect(75, 71, 85, 81, P.ace); for (let y = 73; y < 80; y += 2) linea(77, y, 83, y, P.aceD); pset(80, 84, C.k); linea(80, 82, 80, 106, C.k);
    rect(100, 92, 122, 108, P.narS); rect(101, 93, 121, 106, P.nar); rect(102, 93, 120, 94, P.narL); rect(104, 108, 105, 118, P.aceL); rect(118, 108, 119, 118, P.aceL);
    // debajo de la ventana: la placa sin letras y la rejilla de ventilación
    rect(90, 126, 126, 136, P.aceD); rect(91, 127, 125, 135, P.bei); for (const y of [129, 132]) linea(94, y, 122, y, P.beiS); rect(91, 127, 125, 127, P.beiL);
    rect(134, 125, 160, 139, P.aceD); for (let y = 127; y < 139; y += 2) { linea(136, y, 158, y, P.aceS); linea(136, y + 1, 158, y + 1, P.aceL); }
    // en la puerta, el pictograma amarillo de peligro eléctrico; en la pared del cuarto, la tablilla colgada; a la
    // izquierda, el rollo de cable en su gancho y el interruptor
    R.poligono([[39, 62], [47, 76], [31, 76]], C.k); R.poligono([[39, 64], [45, 75], [33, 75]], P.amar); linea(40, 66, 38, 70, C.k); linea(38, 70, 41, 70, C.k); linea(41, 70, 39, 74, C.k);
    linea(170, 58, 166, 64, C.k); linea(170, 58, 174, 64, C.k); rect(164, 64, 176, 82, hex('#7a5a3a')); rect(165, 66, 175, 81, P.papel); rect(167, 63, 173, 66, hex('#a8acb8')); for (let y = 69; y < 80; y += 2) linea(167, y, 173 - (y % 4 === 1 ? 2 : 0), y, P.lapizS);
    rect(10, 40, 12, 44, hex('#5a5a62')); for (let r = 0; r < 4; r++) R.anillo(11, 52, 7 - r * 0.6, r % 2 ? hex('#2a2a32') : hex('#4a4a56')); linea(6, 58, 4, 92, hex('#2a2a32'));
    rect(10, 66, 15, 74, hex('#e8e0c8')); rect(10, 66, 15, 66, C.blanco); rect(12, 68, 13, 71, hex('#b8ae94'));
    // el piloto rojo (base) encima del cuarto
    rect(160, 25, 172, 29, P.aceS); rect(161, 25, 171, 25, P.aceL);
    // el haz de cables que va por el techo del cuarto al rack
    for (let x = 176; x <= 212; x++) { const y = Math.round(30 - Math.sin((x - 176) / 36 * Math.PI) * -6); pset(x, y, C.k); pset(x, y + 1, hex('#3a3a46')); pset(x, y + 2, hex('#6a2a2a')); }
    linea(212, 30, 212, 52, C.k); linea(213, 32, 213, 52, hex('#6a2a2a'));
    // el rack de aparatos (x 186–232): chapa beige, el bisel del osciloscopio, indicadores, registrador, rejilla, ruedas
    rect(186, 52, 232, 146, P.beiD); rect(187, 53, 231, 143, P.bei); rect(187, 53, 189, 143, P.beiL); rect(229, 53, 231, 143, P.beiS); rect(186, 52, 232, 54, P.beiS);
    for (const [y0, y1] of [[56, 82], [85, 101], [104, 129], [131, 141]]) { rect(190, y0, 228, y1, P.beiS); rect(191, y0 + 1, 227, y1 - 1, P.bei); rect(191, y0 + 1, 227, y0 + 1, P.beiL); for (const [xx, yy] of [[192, y0 + 2], [226, y0 + 2], [192, y1 - 2], [226, y1 - 2]]) pset(xx, yy, P.beiD); }
    rect(193, 59, 217, 80, C.k); rect(194, 60, 216, 79, P.scope);
    for (const yy of [64, 73]) { disco(222, yy, 3, P.beiD); disco(222, yy, 2, hex('#3a3a40')); pset(221, yy - 1, P.beiL); }
    for (const xx of [194, 211]) { rect(xx, 87, xx + 14, 96, C.k); rect(xx + 1, 88, xx + 13, 95, hex('#f4eedc')); for (let i = 0; i < 5; i++) pset(xx + 3 + i * 2, 89, C.k); }
    for (let i = 0; i < 6; i++) { rect(194 + i * 6, 98, 195 + i * 6, 99, C.k); pset(194 + i * 6, 98, P.beiL); }
    rect(193, 107, 225, 125, C.k); rect(196, 126, 222, 127, P.beiD);
    for (let y = 133; y < 141; y += 2) linea(193, y, 225, y, P.beiS);
    for (const xx of [190, 228]) { disco(xx, 146, 2, C.k); pset(xx, 145, P.aceL); }
    // el carrito del magnetofono: estante, patas, cajas de cinta abajo
    rect(238, 118, 274, 121, P.aceS); rect(238, 118, 274, 118, P.aceL); rect(240, 121, 241, 146, P.ace); rect(271, 121, 272, 146, P.ace);
    rect(240, 135, 272, 136, P.ace); for (let i = 0; i < 4; i++) { rect(243 + i * 7, 127, 248 + i * 7, 134, i % 2 ? hex('#3a4a7a') : hex('#c8b890')); rect(243 + i * 7, 127, 248 + i * 7, 127, C.blanco); }
    for (const xx of [241, 271]) { disco(xx, 147, 1.5, C.k); }
    rect(239, 92, 274, 118, P.panD); rect(240, 93, 273, 117, P.pan); rect(243, 94, 270, 116, hex('#b8b8c0')); rect(243, 94, 270, 94, hex('#e0e0e8')); rect(243, 116, 270, 116, hex('#7a7a84'));
    for (const xx of [246, 252, 258, 264]) { rect(xx, 112, xx + 3, 114, C.k); pset(xx, 112, hex('#7a7a84')); }
    // la ventana a California: marco de madera, persiana recogida arriba, alféizar
    rect(243, 47, 315, 104, P.panD); rect(244, 48, 314, 103, P.panL); rect(246, 50, 312, 101, P.panD);
    for (let y = 51; y <= 57; y += 2) { rect(247, y, 311, y, hex('#ece4cc')); rect(247, y + 1, 311, y + 1, hex('#bcb294')); }
    rect(243, 101, 316, 105, P.panL); rect(243, 101, 316, 101, P.crema); rect(243, 105, 316, 105, P.panD);
    // la planta de suelo (maceta) y el taburete con la bobina de cable en primer término, a la izquierda
    rect(296, 138, 314, 152, hex('#b85a2a')); rect(295, 136, 315, 139, hex('#d8743a')); rect(298, 142, 312, 142, hex('#e8a060')); c_sombra(R, 305, 153, 11, 2, 0.35);
    rect(2, 164, 18, 179, P.panS); rect(2, 164, 18, 166, P.panL); disco(10, 160, 7, C.k); disco(10, 160, 6, hex('#3a3a44')); disco(10, 160, 2, P.cobL); R.anillo(10, 160, 4, hex('#5a5a66'));
  });
  // ── la vida: el piloto, la lámpara del cuarto, el micrófono que se mece, los aparatos, las bobinas, la ventana, las plantas
  const ses = o.sesion !== false;
  const roja = ses && Math.sin(t * 5) > -0.2; disco(166, 23, 4, roja ? hex('#ff4a3a') : hex('#7a2a24')); disco(165, 22, 1.5, roja ? hex('#ffc0a8') : hex('#a84a40'));
  if (roja) for (let a = 0; a < 12; a++) { const r = 7 + (a & 1); c_tono(R, Math.round(166 + Math.cos(a * 0.52) * r), Math.round(23 + Math.sin(a * 0.52) * r * 0.7), 0.35, hex('#ff8a6a')); }
  if (h(Math.floor(t * 8), 1, 543) > 0.97) rect(187, 4, 241, 9, P.tuboS);
  // dentro del cuarto: la lámpara de jaula y el micrófono colgante que se mece
  R.recorte([58, 58, 158, 118]);
  linea(108, 58, 108, 62, C.k); R.poligono([[105, 62], [111, 62], [114, 67], [102, 67]], P.aceS); linea(105, 62, 110, 62, P.aceL); rect(103, 67, 113, 67, hex('#fff2c0')); pset(108, 68, hex('#fffbe0'));
  for (let r = 5; r < 22; r += 2) for (let a = 0; a < 18; a++) { const xx = Math.round(108 + Math.cos(a * 0.35 + 0.2) * r * 1.6), yy = Math.round(66 + Math.sin(a * 0.35 + 0.2) * r * 0.8); if (yy > 66 && ((xx + yy) & 1)) c_tono(R, xx, yy, 0.08, hex('#fff0c0')); }
  const sw = Math.sin(t * 1.3) * 3, mx = Math.round(136 + sw); linea(136, 62, mx, 84, C.k); rect(mx - 2, 84, mx + 2, 90, hex('#3a3a46')); rect(mx - 1, 85, mx + 1, 89, hex('#8a8a96')); pset(mx - 1, 85, C.blanco);
  R.recorte(null);
  // el osciloscopio: la cuadrícula y la onda que corre (más nerviosa durante la sesión)
  for (let x = 194; x <= 216; x++) for (let y = 60; y <= 79; y++) if ((x - 194) % 5 === 0 && (y - 60) % 4 === 0) pset(x, y, P.scopeM);
  let py = null; for (let x = 194; x <= 216; x++) { const y = Math.round(70 + Math.sin(x * 0.55 - t * 7) * 4 + (ses ? Math.sin(x * 1.7 + t * 13) * 2 : 0)); if (py != null) linea(x - 1, py, x, y, P.scopeL); py = y; }
  for (const yy of [64, 73]) { const a = t * 0.4 + yy; pset(222 + Math.round(Math.cos(a) * 2), yy + Math.round(Math.sin(a) * 2), P.beiL); }
  // las agujas de los indicadores y los pilotos
  for (const [xx, f] of [[194, 0], [211, 2]]) { const a = Math.PI * (0.8 - 0.6 * (0.5 + 0.4 * Math.sin(t * (2.3 + f) + f) * (ses ? 1 : 0.3))); linea(xx + 7, 95, Math.round(xx + 7 + Math.cos(a) * 6), Math.round(95 - Math.sin(a) * 6), C.rojo); pset(xx + 7, 95, C.k); }
  for (let i = 0; i < 6; i++) { const on = h(i, Math.floor(t * 2 + i * 0.3), 544) > 0.4; pset(194 + i * 6, 92 + (i & 1), on ? [hex('#ff4a3a'), hex('#4af08a'), hex('#ffd040')][i % 3] : hex('#4a4038')); }
  for (let i = 0; i < 6; i++) { const on = h(i, Math.floor(t * 3), 545) > 0.5; rect(194 + i * 6, 98, 195 + i * 6, 99, C.k); pset(194 + i * 6, on ? 98 : 99, P.beiL); }
  // el registrador: papel cuadriculado que corre hacia abajo y tres plumillas que escriben
  rect(194, 108, 224, 124, P.papel); const des = Math.floor(t * 6);
  for (let y = 108; y <= 124; y++) { if ((y + des) % 4 === 0) linea(194, y, 224, y, P.papelS); } for (let x = 196; x <= 224; x += 5) linea(x, 108, x, 124, P.papelS);
  for (let p = 0; p < 3; p++) { const cx = 199 + p * 9, col = [P.tinta, P.tintaR, hex('#2a7a3a')][p];
    for (let y = 124; y >= 108; y--) { const tt = t - (y - 108) / 6, ox = Math.round(Math.sin(tt * (3 + p) + p * 2) * 2 + (ses ? Math.sin(tt * 11 + p) * 1.5 : 0)); pset(cx + ox, y, col); }
    const ox = Math.round(Math.sin(t * (3 + p) + p * 2) * 2 + (ses ? Math.sin(t * 11 + p) * 1.5 : 0)); linea(cx + ox, 108, cx + ox + 2, 105, C.k); }
  // las bobinas del magnetofono, que giran, y la cinta que las une; el vúmetro
  for (const [cx, v] of [[250, 1], [264, 1.3]]) { disco(cx, 102, 7, C.k); disco(cx, 102, 6, hex('#5a5a66')); disco(cx, 102, 4.5, hex('#3a2a20')); disco(cx, 102, 1.5, hex('#d8d8e0'));
    for (let k = 0; k < 3; k++) { const a = -t * 4 * v + k * 2.094; linea(cx, 102, Math.round(cx + Math.cos(a) * 5), Math.round(102 + Math.sin(a) * 5), hex('#a8a8b4')); } }
  linea(250, 109, 264, 109, hex('#3a2a20'));
  // fuera: el cielo, las colinas secas, edificios bajos de tejado rojo, palmeras al viento, un coche y un ciclista
  c_cieloDia(R, t, 247, 58, 311, 100, 1);
  R.recorte([247, 58, 311, 100]);
  R.poligono([[247, 84], [262, 78], [278, 81], [296, 75], [311, 79], [311, 100], [247, 100]], (x, y) => (h(x, y, 546) < 0.25 ? P.colinaS : P.colina));
  rect(256, 86, 290, 93, hex('#e8dcc0')); rect(254, 84, 292, 86, hex('#b8482a')); for (let x = 258; x < 290; x += 5) rect(x, 88, x + 2, 90, hex('#4a6a8a'));
  rect(247, 94, 311, 100, hex('#6a8a3a')); for (let x = 247; x <= 311; x++) if (h(x, 1, 547) < 0.4) pset(x, 94 + Math.round(Math.sin(t * 3 + x * 0.4)), hex('#8aaa4a'));
  { const cx = 247 + ((t * 18) % 90) - 12; rect(cx, 95, cx + 9, 98, hex('#c84a2a')); rect(cx + 2, 93, cx + 7, 95, hex('#c84a2a')); rect(cx + 3, 94, cx + 6, 94, P.cielo3); disco(cx + 2, 99, 1, C.k); disco(cx + 8, 99, 1, C.k); }
  { const bx = 311 - ((t * 7 + 40) % 80); pset(bx, 92, C.k); pset(bx + 3, 92, C.k); linea(bx, 92, bx + 3, 92, hex('#3a3a6a')); pset(bx + 1, 90, hex('#e8b890')); pset(bx + 1, 91, hex('#3a6ac8')); }
  c_palmera(R, 262, 99, 30, t, 0); c_palmera(R, 300, 99, 36, t, 2);
  R.recorte(null);
  rect(278, 50, 280, 101, P.panL); rect(279, 50, 279, 101, P.panD);
  // la planta colgante de macramé que se mece
  { const s = Math.sin(t * 1.1) * 2, px = Math.round(236 + s); linea(236, 18, px - 4, 40, P.crema); linea(236, 18, px + 4, 40, P.crema); linea(236, 18, px, 40, hex('#d8c8a0'));
    for (let y = 24; y < 40; y += 4) { pset(Math.round(236 + (px - 4 - 236) * (y - 18) / 22), y, P.cafe); pset(Math.round(236 + (px + 4 - 236) * (y - 18) / 22), y, P.cafe); }
    rect(px - 5, 40, px + 5, 47, hex('#c86a3a')); rect(px - 5, 40, px + 5, 40, hex('#e8904a')); rect(px + 3, 41, px + 5, 47, hex('#9a4a22'));
    for (let i = 0; i < 7; i++) { const a = Math.PI * (0.15 + i * 0.12), L = 8 + (i % 3) * 3; for (let r = 0; r < L; r++) pset(Math.round(px - 6 + i * 2 + Math.cos(a) * r * 0.3 + Math.sin(t * 2 + i) * r * 0.08), Math.round(41 + r), r % 3 ? P.palma : P.palmaS); } }
  c_reloj(R, 210, 36, 7, t, 10.3, P.pan);
  // el helecho de suelo que tiembla con el aire acondicionado
  for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.12 + i * 0.095), L = 18 + (i % 3) * 5, s = Math.sin(t * 1.4 + i) * 0.05;
    for (let r = 0; r < L; r++) { const x = Math.round(305 + Math.cos(a + s) * r), y = Math.round(137 + Math.sin(a + s) * r + (r * r) / 60); pset(x, y, P.palma); if (r % 2 === 0 && r > 3) { pset(x - 1, y + 1, P.palmaS); pset(x + 1, y + 1, hex('#5aa04a')); } } }
  return { suelo: 162, sueloCuarto: 124, tablilla: [170, 72], ventana: [58, 58, 158, 118], puerta: [26, 52, 52, 141], rack: [186, 52, 232, 146], magnetofono: [238, 92, 274, 146], ventanaCalle: [247, 58, 311, 100] };
}

// lo de delante en 'sri': la mesa del cuarto (recortada a la ventana) con el papel, el lápiz y el flexo, y los reflejos
function c_sriDelante(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  R.recorte([58, 58, 158, 118]);
  // la mesa del cuarto: tablero de formica crema con el canto de aluminio y las patas cromadas (el vidente asoma por
  // encima de la cintura)
  R.poligono([[74, 113], [144, 113], [147, 115], [71, 115]], (x, y) => (y === 113 ? P.techoL : h(x, y, 548) < 0.08 ? P.techoS : P.techo));
  rect(71, 116, 147, 117, hex('#a8a8b0')); rect(71, 116, 147, 116, hex('#e0e0e8')); rect(75, 118, 76, 118, hex('#c8c8d0')); rect(142, 118, 143, 118, hex('#c8c8d0'));
  R.poligono([[98, 113], [120, 113], [121, 115], [97, 115]], P.papel); for (let k = 0; k < 4; k++) linea(100 + k * 5, 114, 103 + k * 5, 114 - (k & 1), P.lapiz);
  linea(124, 115, 130, 113, P.amar); pset(124, 115, C.k);
  rect(137, 100, 138, 114, P.aceS); linea(137, 100, 131, 96, P.aceS); R.poligono([[126, 95], [134, 92], [137, 97], [129, 100]], P.nar); pset(129, 99, P.crema); rect(133, 113, 141, 115, P.aceD);
  for (let y = 100; y < 113; y++) for (let x = 120; x < 136; x++) if ((x + y) % 3 === 0 && y - 100 > (136 - x) * 0.4) c_tono(R, x, y, 0.12, hex('#fff2c0'));
  // los reflejos del cristal: dos bandas diagonales en las esquinas, lejos de la cara
  for (let y = 58; y <= 118; y++) for (let x = 58; x <= 158; x++) { const d1 = x + y - 128, d2 = x + y - 262; if ((d1 >= 0 && d1 < 9 && (d1 < 5 || ((x + y) & 1))) || (d2 >= 0 && d2 < 7 && (d2 < 3 || ((x ^ y) & 1)))) c_tono(R, x, y, 0.28, hex('#e8f4ff')); }
  R.recorte(null);
  rect(56, 118, 160, 120, P.aceL); rect(56, 118, 160, 118, C.blanco); rect(55, 121, 161, 121, P.aceD);
  return { mesa: [71, 113, 147, 118], papel: [97, 113, 121, 115] };
}

// ─ 'sri' cámara 'dibujo' ─
const c_TRAZOS = [
  [[100, 124], [112, 123], [124, 125], [138, 123], [152, 124], [168, 123], [182, 125], [198, 124]],
  [[110, 124], [118, 116], [126, 110], [134, 100], [142, 90], [148, 86], [154, 90], [160, 98], [170, 106], [182, 114], [194, 124]],
  [[147, 87], [147, 66], [154, 66], [154, 88]], [[146, 66], [150, 60], [155, 66]], [[149, 72], [152, 72]], [[149, 78], [152, 78]],
  [[128, 108], [134, 112]], [[132, 102], [139, 108]], [[136, 96], [143, 102]], [[140, 92], [146, 98]],
  [[106, 134], [109, 131], [112, 134], [115, 131], [118, 134]], [[138, 140], [141, 137], [144, 140], [147, 137], [150, 140]], [[170, 133], [173, 130], [176, 133], [179, 130], [182, 133]],
  [[112, 58], [114, 53], [119, 51], [123, 53], [127, 50], [133, 52], [135, 57], [130, 59], [112, 59]],
  [[150, 46], [168, 52], [176, 70], [172, 92], [160, 104], [140, 104], [124, 96], [120, 76], [128, 56], [144, 47], [154, 47]],
];

function c_sriDibujo(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  c_fijo(R, 'sriDibujo', () => {
    // la mesa de nogal (tablas horizontales con vetas) y la luz del flexo que entra desde arriba a la izquierda
    rect(0, 0, 319, 179, P.pan);
    for (let y = 0; y < 180; y++) { if (y % 22 === 21) { R.linea(0, y, 319, y, P.panD); continue; } for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.4 + Math.floor(y / 22) * 2) * 1.5 + y * 0.9); if (v > 0.9) pset(x, y, P.panS); else if (v < -0.95) pset(x, y, P.panL); } }
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 120) / 1.4, y - 70) / 170; if (d < 1 && h(x, y, 549) > d * 1.1 + 0.25) c_tono(R, x, y, 0.16, hex('#ffe8b0')); else if (d > 1.05 && h(x, y, 550) < 0.5) c_tono(R, x, y, 0.2, C.k); }
    // la tablilla (masonita) con su sombra, el papel y la pinza
    for (let y = 26; y < 174; y++) for (let x = 80; x < 234; x++) if (x > 224 || y > 166) c_tono(R, x, y, 0.4, C.k);
    rect(74, 20, 228, 168, hex('#7a5a3a')); rect(75, 21, 227, 167, hex('#9a7448')); for (let y = 22; y < 167; y++) for (let x = 76; x < 227; x++) if (h(x, y, 551) < 0.1) pset(x, y, hex('#8a6640'));
    rect(84, 34, 218, 162, P.papelS); rect(84, 34, 216, 160, P.papel); for (let y = 34; y < 160; y++) for (let x = 84; x < 216; x++) if (h(x, y, 552) < 0.035) pset(x, y, P.papelS);
    rect(126, 16, 174, 34, hex('#5a5a66')); rect(127, 17, 173, 32, hex('#a8acb8')); rect(127, 17, 173, 18, hex('#e0e4ec')); rect(132, 22, 168, 27, hex('#8a8e9a')); rect(132, 22, 168, 22, hex('#5a5e6a'));
    disco(150, 30, 3, hex('#5a5a66')); disco(150, 30, 2, hex('#c8ccd6'));
    // el mapa del mundo, pegado con cinta: océano, continentes, meridianos
    for (let y = 66; y < 132; y++) for (let x = 236; x < 318; x++) if (x > 314 || y > 128) c_tono(R, x, y, 0.35, C.k);
    rect(232, 62, 314, 128, hex('#e8dcb8')); rect(235, 65, 311, 125, hex('#9ac4d8'));
    for (let x = 245; x < 311; x += 12) for (let y = 65; y < 125; y += 2) pset(x, y, hex('#b4d4e4')); for (let y = 75; y < 125; y += 12) for (let x = 235; x < 311; x += 2) pset(x, y, hex('#b4d4e4'));
    const tierra = (pts) => { R.poligono(pts, (x, y) => (h(x, y, 553) < 0.2 ? hex('#a8b46a') : hex('#c8c88a'))); for (let i = 0; i < pts.length; i++) linea(pts[i][0], pts[i][1], pts[(i + 1) % pts.length][0], pts[(i + 1) % pts.length][1], hex('#7a8a4a')); };
    tierra([[240, 74], [256, 70], [262, 78], [254, 88], [258, 92], [252, 96], [246, 88], [240, 84]]); tierra([[256, 98], [264, 100], [262, 116], [258, 120], [254, 106]]);
    tierra([[272, 72], [300, 68], [310, 74], [306, 88], [296, 92], [286, 88], [278, 90], [272, 82]]); tierra([[276, 92], [288, 94], [286, 112], [280, 114], [274, 100]]); tierra([[298, 106], [308, 104], [310, 112], [300, 114]]);
    for (const [x, y] of [[230, 60], [310, 60], [230, 124], [310, 124]]) { rect(x, y, x + 8, y + 5, hex('#f0ecd8')); rect(x, y, x + 8, y, C.blanco); }
    // la taza de café (vista desde arriba en escorzo), el cronómetro, la goma, virutas y lápices
    c_sombra(R, 42, 150, 18, 6, 0.4); rect(28, 120, 52, 146, hex('#d8742a')); rect(28, 120, 32, 146, hex('#ec9248')); rect(48, 120, 52, 146, hex('#a8521c'));
    R.disco(40, 120, 12, hex('#e0e0d0')); R.disco(40, 120, 10, hex('#3a2010')); R.disco(37, 118, 3, hex('#5a3420')); for (let y = 126; y < 140; y++) { pset(54, y, hex('#a8521c')); pset(55, y, hex('#a8521c')); pset(56, y, hex('#d8742a')); } pset(55, 125, hex('#d8742a')); pset(55, 140, hex('#d8742a'));
    c_sombra(R, 46, 72, 13, 13, 0.4); disco(44, 66, 13, hex('#5a5a66')); disco(44, 66, 12, hex('#c8ccd6')); disco(43, 65, 10, C.blanco); rect(41, 49, 47, 53, hex('#a8acb8')); rect(42, 47, 46, 49, hex('#c8ccd6'));
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(44 + Math.cos(a) * 8), Math.round(66 + Math.sin(a) * 8), k % 3 ? C.grisL : C.k); }
    disco(48, 70, 3, hex('#e8e8ee')); R.anillo(48, 70, 3, C.grisL);
    rect(48, 156, 62, 163, hex('#e88a9a')); rect(48, 156, 62, 157, hex('#f8b8c0')); rect(48, 163, 62, 164, hex('#b85a6a'));
    for (let i = 0; i < 14; i++) pset(64 + Math.round(h(i, 1, 554) * 14), 158 + Math.round(h(i, 2, 554) * 10), i % 2 ? hex('#e88a9a') : hex('#c8b890'));
    for (const [x0, y0, c] of [[238, 150, P.amar], [244, 160, hex('#3a7a3a')]]) { for (let k = 0; k < 3; k++) linea(x0, y0 + k, x0 + 54, y0 - 12 + k, k === 0 ? c_mez(c, C.blanco, 0.3) : k === 2 ? c_mez(c, C.k, 0.3) : c); linea(x0 - 4, y0 + 2, x0, y0 + 1, hex('#e8c89a')); pset(x0 - 5, y0 + 2, C.k); rect(x0 + 52, y0 - 13, x0 + 57, y0 - 10, hex('#c8ccd6')); }
  });
  // el boceto que se dibuja solo: los trazos hasta la fracción o.trazo de su longitud total
  const tr = c_lim(o.trazo ?? 1);
  let tot = 0; for (const s of c_TRAZOS) for (let i = 1; i < s.length; i++) tot += Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]);
  let falta = tot * tr, punta = c_TRAZOS[0][0];
  for (const s of c_TRAZOS) { if (falta <= 0) break; for (let i = 1; i < s.length && falta > 0; i++) { const [ax, ay] = s[i - 1], [bx, by] = s[i], L = Math.hypot(bx - ax, by - ay), u = Math.min(1, falta / L);
    const ex = ax + (bx - ax) * u, ey = ay + (by - ay) * u; linea(ax, ay, ex, ey, (x, y, k) => (h(x, y, 555) < 0.15 ? P.lapizS : P.lapiz)); punta = [Math.round(ex), Math.round(ey)]; falta -= L; } }
  // el lápiz en la punta (amarillo, la virola y la goma), con su sombra en el papel
  if (o.lapiz !== false) { const [px, py] = punta, mov = tr < 1 ? Math.sin(t * 20) * 0.6 : 0, ux = 0.55, uy = -0.83, L = 40;
    for (let k = 0; k < L; k++) c_tono(R, Math.round(px + 4 + ux * k), Math.round(py + 3 + uy * k), 0.25, C.k);
    for (let k = 0; k < L; k++) { const x = px + ux * k + mov, y = py + uy * k; const c = k < 3 ? hex('#3a3a44') : k < 8 ? hex('#e8c89a') : k < 33 ? P.amar : k < 36 ? hex('#c8ccd6') : P.rosa;
      pset(Math.round(x - 1), Math.round(y), k < 3 ? c : k < 8 ? hex('#c8a06a') : k < 33 ? P.amarS : k < 36 ? hex('#8a8e9a') : hex('#c86a7a')); pset(Math.round(x), Math.round(y), c); if (k > 3) pset(Math.round(x + 1), Math.round(y), k < 8 ? c : k < 33 ? hex('#f8e070') : k < 36 ? C.blanco : hex('#f8a8b8')); } }
  // el «?» que late sobre el punto lejano del mapa, con su círculo de lápiz rojo
  if (o.pregunta !== false) { const s = Math.sin(t * 3); R.anillo(292, 84, 5 + s * 0.5, P.tintaR); R.anillo(292, 84, 4 + s * 0.5, c_mez(P.tintaR, C.blanco, 0.4)); disco(292, 84, 1, P.tintaR); R.icono('?', 285, 58 + Math.round(s * 1.5), P.tintaR, C.k, 2); }
  // el cronómetro que corre, el vapor de la taza
  { const a = (t % 60) / 60 * Math.PI * 2 - Math.PI / 2; linea(44, 66, Math.round(44 + Math.cos(a) * 8), Math.round(66 + Math.sin(a) * 8), C.rojo); const b = (t % 6) / 6 * Math.PI * 2 - Math.PI / 2; linea(48, 70, Math.round(48 + Math.cos(b) * 2), Math.round(70 + Math.sin(b) * 2), C.k); pset(44, 66, C.k); }
  for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1); for (let k = 0; k < 6; k++) { const y = Math.round(112 - u * 40 - k * 2), x = Math.round(38 + i * 3 + Math.sin(u * 7 + k * 0.6 + i) * 3); if (y > 60 && h(x, y, 556) < 0.8 - u * 0.6) c_tono(R, x, y, 0.4 * (1 - u), C.blanco); } }
  return { punta, mapa: [292, 84], papel: [84, 34, 216, 160] };
}

// ─ 'fortmeade' general ─
function c_fm(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  c_fijo(R, 'fm', () => {
    c_techo(R, 0, 15, hex('#dcdad0'), hex('#b4b2a6'), hex('#f0eee4'), 2);
    for (const x0 of [186, 248]) { rect(x0, 3, x0 + 46, 10, hex('#b4b2a6')); rect(x0 + 1, 4, x0 + 45, 9, hex('#f8f8ee')); for (let x = x0 + 3; x < x0 + 45; x += 3) linea(x, 4, x, 9, hex('#e0e0d6')); }
    rect(0, 16, 319, 17, hex('#8c8466'));
    // la pared de bloque pintado: bloques de 16 × 8 a matajunta con su junta, el canto de luz y un moteado
    for (let y = 18; y <= 103; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 18) / 8), u = (x + (f & 1) * 8) % 16, v = (y - 18) % 8;
      let c = u === 0 || v === 7 ? P.bloqJ : v === 0 || u === 1 ? P.bloqL : h(x, y, 557) < 0.08 ? P.bloqS : P.bloq;
      const sb = (y - 18) / 85 * 0.18 + Math.max(0, (x - 262) / 58) * 0.12; if (sb > 0 && h(x, y, 558) < sb * 2.5 && u > 1 && v > 0 && v < 7) c = c_mez(c, C.k, 0.12); pset(x, y, c); }
    rect(0, 104, 319, 106, P.panS); rect(0, 104, 319, 104, P.panL);
    for (let y = 107; y <= 137; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 107) / 8), u = (x + (f & 1) * 8) % 16, v = (y - 107) % 8; pset(x, y, u === 0 || v === 7 ? P.caquiS : v === 0 ? P.caquiL : h(x, y, 559) < 0.08 ? P.caquiS : P.caqui); }
    rect(0, 136, 319, 139, hex('#2a2620')); rect(0, 136, 319, 136, hex('#4a443a'));
    // la moqueta marrón en losetas de 24 px con el pelo cruzado y la perspectiva
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 140) / 40, xx = Math.round((x - 160) / (0.7 + p * 0.6) + 160), tile = (Math.floor(xx / 24) + Math.floor((y - 140) / (7 + p * 8))) & 1;
      const n = h(x, y, 560) * 0.7 + (tile ? 0.15 : 0) + p * 0.35; pset(x, y, n < 0.3 ? P.mar0 : n < 0.6 ? P.mar1 : n < 0.85 ? P.mar2 : P.mar3); }
    c_sombra(R, 294, 141, 26, 3, 0.35);
    // el corcho: marco de madera, corcho moteado, bocetos, fichas, chinchetas e hilos rojos
    rect(16, 32, 120, 98, P.panD); rect(17, 33, 119, 97, P.panL); rect(18, 34, 118, 96, P.panS);
    for (let y = 35; y <= 95; y++) for (let x = 19; x <= 117; x++) { const n = h(x, y, 561); pset(x, y, n < 0.15 ? P.corS : n > 0.9 ? P.corL : n < 0.2 ? P.corD : P.cor); }
    for (let y = 99; y < 102; y++) for (let x = 18; x < 122; x++) c_tono(R, x, y, 0.3, C.k);
    const hoja = (x0, y0, x1, y1, dib, pin) => { for (let y = y0 + 1; y <= y1 + 1; y++) c_tono(R, x1 + 1, y, 0.35, C.k); for (let x = x0 + 1; x <= x1 + 1; x++) c_tono(R, x, y1 + 1, 0.35, C.k);
      rect(x0, y0, x1, y1, P.papel); rect(x0, y1, x1, y1, P.papelS); dib(x0, y0); disco(Math.round((x0 + x1) / 2), y0 + 1, 1.5, pin); pset(Math.round((x0 + x1) / 2) - 1, y0, C.blanco); };
    const L = (pts, c = P.lapiz) => { for (let i = 1; i < pts.length; i++) linea(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], c); };
    hoja(22, 38, 46, 58, (x, y) => { rect(x + 3, y + 12, x + 9, y + 17, P.lapizS); rect(x + 12, y + 10, x + 20, y + 17, P.lapizS); L([[x + 3, y + 12], [x + 6, y + 9], [x + 9, y + 12]]); L([[x + 16, y + 10], [x + 16, y + 4]]); L([[x + 13, y + 4], [x + 19, y + 4]]); L([[x + 2, y + 18], [x + 22, y + 18]]); }, C.rojo);
    hoja(52, 40, 80, 56, (x, y) => { L([[x + 2, y + 10], [x + 26, y + 10], [x + 22, y + 13], [x + 5, y + 13], [x + 2, y + 10]]); L([[x + 10, y + 10], [x + 10, y + 6], [x + 16, y + 6], [x + 16, y + 10]]); L([[x + 13, y + 6], [x + 13, y + 2]]); L([[x + 3, y + 15], [x + 6, y + 14], [x + 9, y + 15], [x + 12, y + 14]], P.lapizS); }, hex('#3a6ad8'));
    hoja(86, 38, 114, 60, (x, y) => { L([[x + 4, y + 11], [x + 24, y + 11]]); L([[x + 14, y + 4], [x + 10, y + 18]]); L([[x + 14, y + 4], [x + 17, y + 18]]); L([[x + 21, y + 8], [x + 23, y + 14]]); }, P.amar);
    hoja(26, 64, 54, 92, (x, y) => { L([[x + 3, y + 20], [x + 10, y + 8], [x + 14, y + 13], [x + 19, y + 5], [x + 26, y + 20]]); L([[x + 3, y + 20], [x + 26, y + 20]]); L([[x + 16, y + 20], [x + 16, y + 16], [x + 19, y + 16], [x + 19, y + 20]]); }, C.rojo);
    hoja(62, 66, 84, 84, (x, y) => { L([[x + 3, y + 10], [x + 19, y + 10], [x + 17, y + 13], [x + 5, y + 13], [x + 3, y + 10]]); L([[x + 9, y + 10], [x + 9, y + 7], [x + 12, y + 7]]); }, hex('#3aa84a'));
    rect(90, 66, 114, 82, C.blanco); for (let j = 0; j < 4; j++) linea(92, 70 + j * 3, 112 - (j % 2) * 6, 70 + j * 3, hex('#8aa8d8')); linea(90, 68, 114, 68, hex('#d84a4a')); disco(102, 67, 1.5, hex('#3a6ad8'));
    rect(92, 86, 112, 94, hex('#f0e8c8')); c_cifras(R, '38', 94, 88, P.lapiz); c_cifras(R, '77', 104, 88, P.lapiz);
    for (const [a, b] of [[[34, 39], [66, 41]], [[66, 41], [100, 39]], [[40, 65], [73, 67]], [[73, 67], [102, 67]]]) { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + 4; L([a, [mx, my], b], hex('#c82a2a')); }
    // el mapa del mundo con chinchetas
    rect(124, 28, 198, 86, P.panD); rect(125, 29, 197, 85, hex('#e8dcb8')); rect(127, 31, 195, 83, hex('#8ab8d0'));
    for (let x = 135; x < 195; x += 10) for (let y = 31; y < 83; y += 2) pset(x, y, hex('#a4cce0'));
    const tie = (pts) => R.poligono(pts, (x, y) => (h(x, y, 562) < 0.25 ? hex('#a8b06a') : hex('#c8c48a')));
    tie([[130, 38], [148, 34], [154, 44], [146, 52], [148, 58], [140, 60], [132, 50]]); tie([[146, 62], [154, 64], [152, 80], [146, 82], [144, 70]]);
    tie([[160, 36], [190, 34], [194, 44], [188, 54], [176, 56], [166, 52], [160, 44]]); tie([[164, 56], [174, 58], [172, 76], [166, 78], [162, 66]]); tie([[182, 66], [192, 64], [194, 74], [184, 76]]);
    for (const [x, y, c] of [[140, 44, C.rojo], [178, 42, C.rojo], [170, 48, hex('#3a6ad8')], [150, 70, P.amar], [186, 70, C.rojo]]) { disco(x, y, 1.5, c); pset(x - 1, y - 1, C.blanco); c_tono(R, x + 2, y + 2, 0.3, C.k); }
    for (let y = 87; y < 90; y++) for (let x = 124; x < 200; x++) c_tono(R, x, y, 0.25, C.k);
    // el perchero con la guerrera y la gorra
    rect(200, 46, 202, 136, P.panS); rect(200, 46, 200, 136, P.panL); for (const d of [-1, 1]) linea(201, 136, 201 + d * 7, 138, P.panS);
    linea(195, 48, 207, 48, P.panS); R.poligono([[193, 52], [209, 52], [211, 84], [191, 84]], (x, y) => (x < 197 ? hex('#4e5a3a') : x > 205 ? hex('#3e4a2c') : hex('#5e6a46')));
    for (let y = 56; y < 82; y += 6) pset(201, y, P.oro); rect(195, 50, 207, 53, hex('#5e6a46')); rect(193, 42, 209, 47, hex('#4e5a3a')); rect(191, 46, 211, 47, hex('#3e4a2c')); pset(201, 44, P.oro);
    // el marco de la ventana y la repisa
    rect(205, 31, 265, 95, hex('#a49c84')); rect(206, 32, 264, 94, hex('#e4e0d4')); rect(208, 34, 262, 92, hex('#7a7466'));
    rect(203, 93, 267, 97, hex('#e4e0d4')); rect(203, 97, 267, 97, hex('#8a8472')); for (let y = 98; y < 101; y++) for (let x = 204; x < 268; x++) c_tono(R, x, y, 0.25, C.k);
    // los archivadores verde oliva de cuatro cajones
    for (const x0 of [272, 295]) { rect(x0, 86, x0 + 22, 138, P.olivaS); rect(x0 + 1, 87, x0 + 21, 137, P.oliva); rect(x0 + 1, 87, x0 + 2, 137, P.olivaL);
      for (let k = 0; k < 4; k++) { const y = 90 + k * 12; rect(x0 + 3, y, x0 + 19, y + 10, P.olivaS); rect(x0 + 4, y + 1, x0 + 18, y + 9, P.oliva); rect(x0 + 4, y + 1, x0 + 18, y + 1, P.olivaL);
        rect(x0 + 8, y + 3, x0 + 14, y + 5, hex('#c8c8b8')); rect(x0 + 8, y + 3, x0 + 14, y + 3, hex('#8a8a7a')); rect(x0 + 9, y + 7, x0 + 13, y + 8, hex('#9aa0a8')); pset(x0 + 9, y + 7, C.blanco); } }
    rect(270, 84, 318, 86, P.olivaS); rect(270, 84, 318, 84, P.olivaL);
    // la cafetera de goteo con la jarra (el café y el vapor se mueven) y las tazas
    rect(276, 64, 292, 84, hex('#2a2a30')); rect(277, 65, 291, 70, hex('#4a4a54')); rect(277, 65, 291, 65, hex('#6a6a74')); rect(278, 72, 290, 83, hex('#3a3a44'));
    R.poligono([[279, 74], [289, 74], [290, 83], [278, 83]], hex('#c8dce8')); R.poligono([[279, 78], [289, 78], [290, 83], [278, 83]], hex('#4a2a14')); linea(279, 74, 279, 82, C.blanco); rect(274, 83, 294, 84, hex('#1a1a20'));
    for (const [x, c] of [[300, C.blanco], [308, hex('#c83a3a')]]) { rect(x, 77, x + 5, 84, c_mez(c, C.k, 0.25)); rect(x, 77, x + 4, 83, c); rect(x + 6, 79, x + 6, 81, c); }
  });
  // ── la vida: el fluorescente que falla, la ventana, las hojas del corcho, la cafetera, el ventilador ──
  if (h(Math.floor(t * 9), 2, 563) > 0.93) rect(249, 4, 293, 9, hex('#c8c8bc'));
  // fuera: cielo, la base con barracones, el depósito de agua, la bandera que ondea, soldaditos y el jeep
  c_cieloDia(R, t, 208, 34, 262, 92, 2);
  R.recorte([208, 34, 262, 92]);
  for (let x = 208; x <= 262; x++) { const y = 70 + Math.round(Math.sin(x * 0.13) * 2 + h(x >> 2, 1, 564) * 2); linea(x, y, x, 78, (x & 3) ? hex('#3e6a3a') : hex('#2e5a2e')); }
  for (const [x0, w] of [[210, 22], [236, 26]]) { rect(x0, 72, x0 + w, 80, hex('#c8bc9a')); R.poligono([[x0 - 2, 72], [x0 + w / 2, 67], [x0 + w + 2, 72]], hex('#6a5a4a')); for (let x = x0 + 2; x < x0 + w - 1; x += 4) rect(x, 75, x + 1, 77, hex('#4a5a6a')); rect(x0, 80, x0 + w, 80, hex('#8a7e64')); }
  { const tx = 252; linea(tx - 4, 72, tx - 2, 52, hex('#5a5a62')); linea(tx + 4, 72, tx + 2, 52, hex('#5a5a62')); linea(tx - 3, 64, tx + 3, 60, hex('#5a5a62')); R.disco(tx, 48, 5, hex('#b8bcc4')); rect(tx - 5, 48, tx + 5, 52, hex('#9aa0a8')); rect(tx - 4, 46, tx - 2, 50, hex('#e0e4ec')); }
  rect(208, 80, 262, 92, hex('#7a8a5a')); for (let x = 208; x <= 262; x++) if (h(x, 2, 565) < 0.3) pset(x, 81 + Math.round(h(x, 3, 565) * 9), hex('#5e6e44')); rect(208, 84, 262, 86, hex('#8a8478'));
  { linea(222, 50, 222, 80, hex('#d8d8e0')); for (let j = 0; j < 9; j++) for (let i = 0; i < 14; i++) { const y = 50 + j + Math.round(Math.sin(t * 5 - i * 0.6) * (i / 14) * 1.6); pset(223 + i, y, i < 6 && j < 5 ? ((i + j) & 1 ? hex('#3a4a9a') : C.blanco) : (j & 1) ? C.blanco : C.rojo); } }
  for (let k = 0; k < 4; k++) { const x = Math.round(262 - ((t * 5 + k * 6) % 70)), p = Math.floor(t * 4 + k) & 1; rect(x, 79, x + 2, 82, hex('#4e5a3a')); rect(x, 77, x + 2, 78, hex('#e0b890')); pset(x + 1, 76, hex('#3e4a2c')); pset(x + p * 2, 83, C.k); }
  { const jx = Math.round(200 + ((t * 14) % 90)); rect(jx, 85, jx + 11, 89, hex('#5e6a46')); rect(jx + 2, 82, jx + 6, 85, hex('#5e6a46')); linea(jx + 7, 82, jx + 8, 85, hex('#9aa0a8')); disco(jx + 2, 90, 1.5, C.k); disco(jx + 9, 90, 1.5, C.k); }
  R.recorte(null);
  // la persiana a medio bajar: lamas inclinadas con su luz, el cordón que se mece
  for (let y = 34; y <= 56; y += 3) { rect(208, y, 262, y, hex('#f0ece0')); rect(208, y + 1, 262, y + 1, hex('#c8c2b0')); }
  rect(208, 57, 262, 58, hex('#a8a290')); { const s = Math.round(Math.sin(t * 1.3) * 1.5); linea(258, 58, 258 + s, 72, hex('#e8e4d8')); rect(257 + s, 72, 259 + s, 74, hex('#c8c2b0')); }
  rect(234, 34, 235, 92, hex('#e4e0d4'));
  // las hojas del corcho que levanta el aire del ventilador: una esquina que sube y baja
  const aire = (Math.sin(t * 1.9) + 1) / 2;
  for (const [x, y] of [[46, 58], [114, 60], [84, 84]]) { const a = Math.round(aire * 3); for (let k = 0; k <= a; k++) { linea(x - k, y - k, x - a, y - k, P.papelS); pset(x - a - 1, y - k, C.blanco); } }
  // el café que gotea, el vapor de la jarra
  if (Math.floor(t * 3) % 2 === 0) pset(284, 72 + Math.floor(t * 9) % 4, hex('#4a2a14'));
  for (let i = 0; i < 3; i++) { const u = (t * 0.45 + i / 3) % 1; for (let k = 0; k < 4; k++) { const y = Math.round(64 - u * 14 - k * 2), x = Math.round(284 + Math.sin(u * 6 + k + i * 2) * 2); if (y > 48 && h(x, y, 566) < 0.85 - u * 0.5) c_tono(R, x, y, 0.45 * (1 - u), C.blanco); } }
  // el ventilador oscilante en el archivador: rejilla, aspas que giran, la cabeza que va y viene
  { const fx = 306 + Math.round(Math.sin(t * 0.6) * 2), fy = 66; rect(305, 74, 307, 83, hex('#3a3a44')); rect(300, 82, 312, 84, hex('#2a2a32'));
    disco(fx, fy, 8, hex('#5a5a66')); disco(fx, fy, 7, hex('#8a8e9a'));
    for (let k = 0; k < 3; k++) { const a = t * 14 + k * 2.094; R.poligono([[fx, fy], [fx + Math.cos(a) * 6, fy + Math.sin(a) * 6], [fx + Math.cos(a + 0.6) * 6, fy + Math.sin(a + 0.6) * 6]], hex('#c8ccd6')); }
    R.anillo(fx, fy, 7, hex('#3a3a44')); for (let k = 0; k < 8; k++) linea(fx, fy, Math.round(fx + Math.cos(k * 0.785) * 7), Math.round(fy + Math.sin(k * 0.785) * 7), (x, y, i) => (i % 2 ? null : hex('#4a4a54'))); disco(fx, fy, 1.5, hex('#3a3a44')); }
  return { suelo: 150, mesaA: [30, 141, 124], mesaB: [150, 141, 244], corcho: [18, 34, 118, 96], mapa: [127, 31, 195, 83], ventana: [208, 34, 262, 92], archivadores: [272, 86, 316, 138], cafetera: [284, 74], perchero: [201, 46] };
}

// una mesa de oficina de los ochenta (tablero de formica color madera, faldón de chapa) con sus cosas encima; lado 1 el
// flexo a la izquierda, -1 a la derecha
function c_mesaFM(R, t, x0, x1, y, lado, k) {
  const P = c_P, { rect, pset, linea, disco } = R;
  // el faldón de chapa gris verdosa con los cajones (tiradores cromados, tarjetero) y el hueco de las piernas en sombra
  rect(x0, y + 4, x1, y + 21, hex('#5a5c4c')); rect(x0 + 1, y + 5, x1 - 1, y + 21, hex('#8a8c76')); rect(x0 + 1, y + 5, x1 - 1, y + 5, hex('#b0b298'));
  const xc = lado > 0 ? x1 - 30 : x0 + 2;
  for (let k = 0; k < 2; k++) { const yy = y + 7 + k * 7; rect(xc, yy, xc + 27, yy + 5, hex('#6a6c5a')); rect(xc + 1, yy + 1, xc + 26, yy + 5, hex('#9a9c84')); rect(xc + 1, yy + 1, xc + 26, yy + 1, hex('#bcbea4')); rect(xc + 10, yy + 3, xc + 17, yy + 4, hex('#d8dce0')); pset(xc + 10, yy + 3, C.blanco); rect(xc + 3, yy + 2, xc + 6, yy + 3, hex('#e8e4d0')); }
  const xh = lado > 0 ? x0 + 4 : x0 + 32; rect(xh, y + 7, xh + 56, y + 21, hex('#3e4034')); for (let yy = y + 7; yy <= y + 21; yy++) for (let x = xh; x <= xh + 56; x++) if (h(x, yy, 590) < 0.12) pset(x, yy, hex('#4a4c3e'));
  for (let x = x0 + 1; x < x1; x++) if (h(x, 3, 591 + k) < 0.2) pset(x, y + 6 + Math.round(h(x, 4, 591) * 14), hex('#7a7c68'));
  rect(x0 - 2, y, x1 + 2, y + 4, P.panS); rect(x0 - 2, y, x1 + 2, y + 1, P.panL); for (let x = x0; x < x1; x++) if (h(x, y, 567 + k) < 0.3) pset(x, y + 2, P.pan); rect(x0 - 2, y + 4, x1 + 2, y + 4, P.panD);
  // la libreta de dibujo, un boceto a medias, papeles, el lápiz
  const cx = Math.round((x0 + x1) / 2);
  R.poligono([[cx - 14, y - 3], [cx + 12, y - 3], [cx + 14, y], [cx - 16, y]], P.papel); linea(cx - 10, y - 2, cx - 4, y - 2, P.lapiz); linea(cx - 3, y - 1, cx + 6, y - 2, P.lapiz); linea(cx + 8, y - 1, cx + 12, y - 1, P.amar);
  R.poligono([[cx + 18 * lado - 8, y - 2], [cx + 18 * lado + 8, y - 2], [cx + 18 * lado + 9, y], [cx + 18 * lado - 9, y]], hex('#e8e0c8'));
  // el flexo de brazo articulado con la pantalla verde y su charco de luz
  const lx = lado > 0 ? x0 + 8 : x1 - 8, d = lado;
  rect(lx - 4, y - 2, lx + 4, y, hex('#2e3a2a')); linea(lx, y - 2, lx + 4 * d, y - 14, hex('#2e3a2a')); linea(lx + 4 * d, y - 14, lx + 12 * d, y - 18, hex('#2e3a2a'));
  R.poligono([[lx + 10 * d, y - 21], [lx + 16 * d, y - 19], [lx + 18 * d, y - 13], [lx + 8 * d, y - 15]], hex('#3a6a3a')); pset(lx + 11 * d, y - 20, hex('#6a9a5a'));
  for (let j = 0; j < 4; j++) for (let i = -10; i <= 10; i++) if (((i + j) & 1) === 0) c_tono(R, lx + 16 * d + i, y + j - 3 + 3, 0.15, hex('#fff4c0'));
  disco(lx + 14 * d, y - 13, 1.5, hex('#fff4c0'));
  // la taza, el bote de lápices o el teléfono
  if (k === 0) { rect(x1 - 22, y - 6, x1 - 8, y - 1, hex('#d8d0b8')); rect(x1 - 22, y - 6, x1 - 8, y - 6, hex('#f0ecd8')); rect(x1 - 20, y - 8, x1 - 10, y - 7, hex('#2a2a30')); rect(x1 - 18, y - 4, x1 - 12, y - 2, hex('#8a8a7a')); }
  else { rect(x0 + 18, y - 7, x0 + 23, y - 1, hex('#3a4a7a')); for (const [dx, c] of [[0, P.amar], [2, C.rojo], [4, hex('#3aa84a')]]) linea(x0 + 19 + dx, y - 12 + (dx & 2), x0 + 19 + dx, y - 7, c); }
  const mx = lado > 0 ? x1 - 30 : x0 + 30; rect(mx, y - 5, mx + 4, y - 1, C.blanco); rect(mx + 5, y - 4, mx + 5, y - 2, C.blanco);
  for (let i = 0; i < 2; i++) { const u = (t * 0.5 + i / 2) % 1; const yy = Math.round(y - 7 - u * 8), xx = Math.round(mx + 2 + Math.sin(u * 6 + i) * 1.5); if (h(xx, yy, 568) < 0.8) c_tono(R, xx, yy, 0.4 * (1 - u), C.blanco); }
}

function c_fmDelante(R, t, o) {
  c_mesaFM(R, t, 30, 124, 141, 1, 0); c_mesaFM(R, t, 150, 244, 141, -1, 1);
  return { mesaA: [30, 141, 124], mesaB: [150, 141, 244] };
}

// ─ 'fortmeade' cámara 'pared': el corcho de cerca ─
function c_fmPared(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  const Lp = (pts, c = P.lapiz) => { for (let i = 1; i < pts.length; i++) linea(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], c); };
  const hoja = (x0, y0, x1, y1, pin, fondo = P.papel) => { for (let y = y0 + 2; y <= y1 + 3; y++) for (let x = x1 + 1; x <= x1 + 3; x++) c_tono(R, x, y, 0.35, C.k); for (let x = x0 + 2; x <= x1 + 3; x++) for (let y = y1 + 1; y <= y1 + 3; y++) c_tono(R, x, y, 0.35, C.k);
    rect(x0, y0, x1, y1, fondo); rect(x0, y1, x1, y1, c_mez(fondo, C.k, 0.15)); rect(x1, y0, x1, y1, c_mez(fondo, C.k, 0.1)); for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (h(x, y, 569) < 0.03) pset(x, y, c_mez(fondo, C.k, 0.08)); };
  const chin = (x, y, c) => { c_tono(R, x + 2, y + 2, 0.4, C.k); c_tono(R, x + 3, y + 3, 0.3, C.k); disco(x, y, 2.5, c_mez(c, C.k, 0.35)); disco(x - 0.5, y - 0.5, 2, c); pset(x - 1, y - 1, C.blanco); };
  c_fijo(R, 'fmPared', () => {
    // el corcho a pantalla completa: granos de tres tonos, alguna marca de chincheta vieja, el marco arriba y abajo
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 570), m = h(x >> 1, y >> 1, 571); pset(x, y, n < 0.12 ? P.corD : n < 0.35 ? P.corS : n > 0.9 ? P.corL : m < 0.3 ? c_mez(P.cor, P.corS, 0.4) : P.cor); }
    for (let i = 0; i < 40; i++) { const x = Math.round(h(i, 1, 572) * 318), y = Math.round(h(i, 2, 572) * 178); pset(x, y, C.k); pset(x + 1, y, P.corD); }
    rect(0, 170, 319, 179, P.panS); rect(0, 170, 319, 171, P.panL); for (let x = 0; x < 320; x++) if (h(x, 1, 573) < 0.25) pset(x, 174 + Math.round(h(x, 2, 573) * 4), P.panD);
    rect(0, 0, 6, 169, P.panS); rect(5, 0, 6, 169, P.panL);
    // la base con su antena de radar
    hoja(14, 18, 92, 76, C.rojo);
    Lp([[20, 66], [86, 66]]); for (const [x, w, hh] of [[22, 16, 12], [42, 22, 16], [68, 14, 10]]) { Lp([[x, 66], [x, 66 - hh], [x + w, 66 - hh], [x + w, 66]]); for (let i = x + 3; i < x + w - 2; i += 4) Lp([[i, 66 - hh + 4], [i + 1, 66 - hh + 4]]); }
    Lp([[53, 50], [53, 36]]); Lp([[45, 30], [53, 36], [61, 30]]); R.anillo(53, 30, 6, P.lapizS); Lp([[20, 70], [30, 70], [34, 72]], P.lapizS); for (let x = 18; x < 88; x += 6) Lp([[x, 62], [x + 3, 58]], P.lapizS);
    // el barco
    hoja(104, 14, 176, 56, hex('#3a6ad8'));
    Lp([[110, 40], [170, 40], [162, 48], [116, 48], [110, 40]]); Lp([[126, 40], [126, 32], [146, 32], [146, 40]]); Lp([[134, 32], [134, 22]]); Lp([[130, 26], [138, 26]]); Lp([[150, 40], [150, 34], [158, 34]]);
    for (let x = 108; x < 174; x += 6) Lp([[x, 52], [x + 3, 50], [x + 6, 52]], P.lapizS);
    // el avión
    hoja(196, 52, 262, 100, P.amar);
    Lp([[204, 76], [254, 76]]); Lp([[254, 76], [258, 73]]); Lp([[226, 76], [218, 60], [222, 60], [234, 76]]); Lp([[226, 77], [218, 92], [222, 92], [234, 77]]); Lp([[208, 76], [204, 70], [207, 70], [212, 76]]);
    R.anillo(229, 76, 18, P.lapizS);
    // el submarino y una ficha con coordenadas
    hoja(18, 100, 86, 138, hex('#3aa84a'));
    Lp([[24, 122], [78, 122]]); Lp([[28, 122], [32, 116], [72, 116], [78, 122], [72, 126], [32, 126], [28, 122]]); Lp([[46, 116], [46, 110], [56, 110], [56, 116]]); Lp([[51, 110], [51, 104]]);
    for (let x = 22; x < 84; x += 5) Lp([[x, 132], [x + 2, 131]], P.lapizS);
    hoja(96, 132, 138, 160, C.rojo, hex('#f4ecd0')); c_cifras(R, '39', 100, 138, P.lapiz); c_cifras(R, '76', 116, 138, P.lapiz); c_cifras(R, '1984', 100, 148, P.tintaR);
    // la montaña con el túnel
    hoja(216, 112, 300, 160, hex('#3a6ad8'));
    Lp([[222, 152], [240, 126], [252, 138], [266, 120], [292, 152]]); Lp([[222, 152], [294, 152]]); R.disco(262, 148, 4, P.lapiz); rect(258, 149, 266, 152, P.papel); R.anillo(262, 148, 4, P.lapiz);
    for (let i = 0; i < 6; i++) Lp([[244 + i * 3, 136 + i], [240 + i * 3, 142 + i]], P.lapizS);
    // dos fotos de paisaje (sin caras) y una ficha con rayas
    hoja(186, 8, 230, 46, hex('#3aa84a'), C.blanco); for (let y = 11; y < 40; y++) for (let x = 189; x < 228; x++) pset(x, y, y < 28 ? c_mez(hex('#7ab4e0'), C.blanco, (y - 11) / 30) : y < 32 ? hex('#3a6aa8') : hex('#d8c08a'));
    rect(206, 22, 212, 28, hex('#4a4a54')); rect(208, 18, 210, 22, hex('#4a4a54'));
    hoja(140, 70, 184, 108, C.rojo, C.blanco); for (let y = 73; y < 102; y++) for (let x = 143; x < 182; x++) pset(x, y, y < 88 ? hex('#e8c890') : h(x, y, 574) < 0.2 ? hex('#b89060') : hex('#d0a870'));
    R.poligono([[150, 88], [162, 80], [176, 88]], hex('#a87a4a'));
    hoja(96, 70, 132, 98, P.amar, hex('#f8f4e4')); for (let j = 0; j < 5; j++) linea(100, 76 + j * 4, 128 - (j % 3) * 5, 76 + j * 4, hex('#9ab0d8')); linea(96, 73, 132, 73, hex('#d84a4a'));
    hoja(146, 122, 200, 164, P.amar);
    Lp([[152, 128], [194, 128], [194, 158], [152, 158], [152, 128]]); Lp([[170, 128], [170, 146]]); Lp([[152, 142], [166, 142]]); Lp([[176, 146], [194, 146]]); Lp([[182, 128], [182, 140]]);
    R.anillo(186, 152, 3, P.lapiz); Lp([[158, 152], [164, 152]], P.lapizS); Lp([[158, 134], [164, 136]], P.lapizS); R.anillo(160, 134, 2, P.tintaR);
  });
  // el boceto del gato espía (gag 5), si la escena lo pide
  if (o.gato) { hoja(132, 60, 188, 120, C.rojo);
    Lp([[146, 110], [146, 92], [150, 84], [148, 74], [154, 80], [166, 80], [172, 74], [170, 84], [174, 92], [174, 110], [146, 110]]);
    Lp([[154, 88], [156, 88]]); Lp([[164, 88], [166, 88]]); Lp([[158, 94], [160, 96], [162, 94]]); Lp([[150, 96], [144, 95]], P.lapizS); Lp([[170, 96], [176, 95]], P.lapizS);
    Lp([[174, 106], [182, 100], [184, 92]]); Lp([[168, 80], [172, 64]]); R.anillo(172, 64, 2, P.lapiz); Lp([[150, 102], [170, 102]], P.tintaR); }
  // los hilos rojos entre chinchetas, que se mecen con el aire
  const aire = Math.sin(t * 1.7);
  for (const [a, b, f] of [[[53, 20], [140, 16], 0], [[140, 16], [229, 54], 1], [[53, 20], [52, 102], 2], [[229, 54], [258, 114], 3], [[160, 72], [229, 54], 4]]) {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + 6 + Math.sin(t * 1.7 + f) * 2; let px = a[0], py = a[1];
    for (let s = 1; s <= 24; s++) { const u = s / 24, x = (1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * mx + u * u * b[0], y = (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * my + u * u * b[1]; linea(px, py, x, y, hex('#c82a2a')); px = x; py = y; } }
  // los papeles que levanta el ventilador: la esquina de abajo de tres hojas sube y baja
  for (const [x, y, f] of [[92, 76, 0], [176, 56, 1], [300, 160, 2]]) { const a = Math.max(0, Math.round((Math.sin(t * 1.9 + f * 1.3) + 0.3) * 3)); for (let k = 0; k <= a; k++) { linea(x - a + k, y - k, x, y - k, P.papelS); pset(x - a - 1 + k, y - k, C.blanco); } for (let k = 0; k < a; k++) c_tono(R, x - k, y + 1, 0.3, C.k); }
  // la sombra de las aspas del ventilador que barre despacio y el brillo del flexo
  { const sx = Math.round(240 + Math.sin(t * 0.6) * 40); for (let y = 0; y < 170; y += 1) for (let x = sx - 30; x < sx + 30; x++) if (((x + y) & 3) === 0 && Math.abs(Math.sin(Math.atan2(y - 90, x - sx) * 3 + t * 9)) > 0.92) c_tono(R, x, y, 0.08, C.k); }
  for (const [x, y, c] of [[53, 20, C.rojo], [140, 16, hex('#3a6ad8')], [229, 54, P.amar], [52, 102, hex('#3aa84a')], [117, 134, C.rojo], [258, 114, hex('#3a6ad8')], [208, 10, hex('#3aa84a')], [162, 72, C.rojo], [114, 72, P.amar], [171, 122, hex('#3aa84a')]]) chin(x, y, c);
  if (o.gato) chin(160, 62, C.rojo);
  return { gato: [132, 60, 188, 120], hojas: { base: [14, 18, 92, 76], barco: [104, 14, 176, 56], avion: [196, 52, 262, 100], submarino: [18, 100, 86, 138], montana: [216, 112, 300, 160] } };
}

// ─ 'revision' general (1995) ─
function c_revision(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  const pu = c_lim(o.puerta ?? 0), luz = c_lim(o.luz ?? 1);
  c_fijo(R, 'rev', () => {
    c_techo(R, 0, 15, hex('#e8e4da'), hex('#c4c0b4'), hex('#f6f4ee'), 3);
    for (const x of [60, 214]) { disco(x, 8, 4, hex('#b4b0a4')); disco(x, 8, 3, hex('#fffbe8')); }
    rect(0, 16, 319, 18, hex('#f2ece0')); rect(0, 18, 319, 18, hex('#b8ae98'));
    // papel pintado beige con rayas finas de textura y la moldura sobre el zócalo malva
    for (let y = 19; y <= 109; y++) for (let x = 0; x < 320; x++) { const u = x % 7, n = h(x, y >> 1, 575); pset(x, y, u === 0 ? P.p95S : u === 3 && n < 0.5 ? P.p95L : n < 0.05 ? P.p95S : P.p95); }
    rect(0, 110, 319, 113, hex('#8a6a4a')); rect(0, 110, 319, 110, hex('#b08a62')); rect(0, 113, 319, 113, hex('#5a3a22'));
    for (let y = 114; y <= 143; y++) for (let x = 0; x < 320; x++) { const u = x % 32, n = h(x, y, 576); pset(x, y, u === 0 ? P.malvaS : u === 1 ? P.malvaL : n < 0.06 ? P.malvaS : P.malva); }
    rect(0, 144, 319, 146, hex('#5a3a22')); rect(0, 144, 319, 144, hex('#8a6a4a'));
    c_moqueta(R, 0, 147, 319, 179, [P.az0, P.az1, P.az2, P.az3], 3);
    // la ventana con su marco (las lamas se pintan encima en cada fotograma)
    rect(11, 27, 79, 107, hex('#f2ece0')); rect(12, 28, 78, 106, hex('#c8c0ac')); rect(14, 30, 76, 104, hex('#4a4a54'));
    rect(9, 105, 81, 108, hex('#f2ece0')); rect(9, 108, 81, 108, hex('#a89a80'));
    // la pantalla de proyección enrollable con su caja, la varilla y el cordón
    rect(96, 22, 200, 26, hex('#3a3a44')); rect(96, 22, 200, 22, hex('#6a6a74')); rect(100, 27, 196, 90, hex('#f4f2ec')); rect(100, 27, 101, 90, hex('#d8d6d0')); rect(195, 27, 196, 90, hex('#d0cec8'));
    rect(98, 90, 198, 92, hex('#2a2a32')); linea(148, 92, 148, 98, hex('#5a5a62')); disco(148, 99, 1.5, hex('#2a2a32'));
    for (let y = 93; y < 97; y++) for (let x = 100; x < 198; x++) c_tono(R, x, y, 0.15, C.k);
    // el ficus en su macetero
    rect(82, 128, 96, 146, hex('#a8743c')); rect(81, 126, 97, 129, hex('#c8945a')); rect(82, 140, 96, 140, hex('#8a5a2a')); linea(89, 126, 89, 92, hex('#6a4a2a')); linea(89, 110, 84, 100, hex('#6a4a2a'));
    c_sombra(R, 89, 147, 10, 2, 0.35);
    // el marco de la puerta, el pasillo de detrás
    rect(232, 58, 270, 146, hex('#8a6a4a')); rect(233, 59, 269, 146, hex('#b08a62')); rect(236, 62, 266, 146, hex('#2a2a34'));
    for (let y = 62; y <= 146; y++) for (let x = 236; x <= 266; x++) { const u = (y - 62) / 84; pset(x, y, y > 128 ? (h(x, y, 577) < 0.3 ? hex('#8a8a80') : hex('#a8a89a')) : c_mez(hex('#e8e4d4'), hex('#b8b4a4'), u)); }
    for (let x = 240; x < 264; x += 10) { rect(x, 66, x + 6, 68, hex('#fffbe8')); } rect(244, 96, 258, 128, hex('#c8c0a8')); rect(246, 98, 256, 126, hex('#d8d0b8'));
    // la mesita con el ordenador beige: monitor de tubo, torre, teclado
    rect(272, 120, 318, 123, hex('#6a4a2a')); rect(272, 120, 318, 120, hex('#8a6a42')); rect(274, 123, 276, 146, hex('#5a3a22')); rect(314, 123, 316, 146, hex('#5a3a22')); rect(276, 136, 314, 137, hex('#5a3a22'));
    rect(280, 92, 306, 116, hex('#a8a08a')); rect(281, 93, 305, 115, hex('#d8d0b8')); rect(281, 93, 305, 93, hex('#ece6d4')); rect(284, 96, 302, 110, C.k); rect(288, 116, 298, 119, hex('#b8b09a'));
    rect(308, 98, 318, 119, hex('#c8c0a8')); rect(309, 99, 317, 99, hex('#ece6d4')); rect(310, 102, 316, 103, hex('#7a7466')); pset(311, 108, hex('#3aa84a'));
    rect(280, 126, 312, 131, hex('#c8c0a8')); for (let x = 282; x < 310; x += 3) for (const y of [127, 129]) pset(x, y, hex('#8a8474'));
    c_sombra(R, 296, 147, 24, 2, 0.35);
  });
  // la luz de la tarde: las lamas de la persiana, lo de fuera entre ellas y las rayas de luz en la pared y el suelo
  c_cieloDia(R, t, 14, 30, 76, 104, 3, [hex('#e8a46a'), hex('#f0c48a'), hex('#f8e0b0')]);
  R.recorte([14, 30, 76, 104]);
  for (let i = 0; i < 4; i++) { const x = 16 + i * 17, s = Math.sin(t * 1.2 + i) * 1.5; disco(x + s, 86, 9, hex('#4a6a3a')); disco(x + s - 2, 84, 6, hex('#5e7e44')); } rect(14, 94, 76, 104, hex('#5a6a3a'));
  R.recorte(null);
  for (let y = 30; y <= 104; y += 4) { rect(14, y, 76, y + 1, hex('#ece4d0')); rect(14, y + 2, 76, y + 2, hex('#b8ac94')); }
  linea(72, 30, 72 + Math.round(Math.sin(t) * 1), 70, hex('#e8e0cc'));
  if (luz > 0.3) { for (let y = 112; y < 146; y++) { const d = Math.round((y - 112) * 0.6); for (let x = 84 + d; x < 120 + d; x++) if ((y >> 1) % 3 !== 0 && ((x + y) & 1) === 0) c_tono(R, x, y, 0.18, hex('#ffd8a0')); } for (let y = 150; y < 178; y++) { const d = Math.round((y - 150) * 1.2); for (let x = 100 + d; x < 150 + d; x++) if ((y >> 1) % 3 !== 0 && ((x + y) & 1) === 0) c_tono(R, x, y, 0.15, hex('#ffd8a0')); } }
  // la diapositiva: una gráfica de barras que baja y la gran cruz roja; el haz del retroproyector (por detrás de la gente)
  if (luz > 0.2) {
    for (let y = 30; y < 88; y++) for (let x = 104; x < 193; x++) if (((x + y) & 1) === 0) c_tono(R, x, y, 0.15, hex('#fffbe0'));
    linea(108, 84, 188, 84, hex('#3a3a44')); linea(108, 36, 108, 84, hex('#3a3a44'));
    for (let i = 0; i < 6; i++) { const hgt = Math.round(40 - i * 6.5 + Math.sin(t * 2 + i) * 0.6); rect(114 + i * 12, 84 - hgt, 121 + i * 12, 83, i < 2 ? hex('#3a6ad8') : hex('#8a9ab8')); rect(114 + i * 12, 84 - hgt, 121 + i * 12, 84 - hgt, hex('#c8d8f0')); }
    const xs = 0.5 + 0.5 * Math.sin(t * 2.4); for (let k = -2; k <= 2; k++) { linea(126 + k, 40, 176 + k, 80, xs > 0.2 ? C.rojo : hex('#e85a5a')); linea(176 + k, 40, 126 + k, 80, xs > 0.2 ? C.rojo : hex('#e85a5a')); }
    for (let y = 92; y < 118; y++) { const u = (y - 92) / 26, xa = Math.round(100 + u * 50), xb = Math.round(196 - u * 44); for (let x = xa; x <= xb; x++) if (((x * 3 + y) % 5) === 0) c_tono(R, x, y, 0.12, hex('#fffbe0')); }
    for (let i = 0; i < 6; i++) { const x = Math.round(110 + h(i, 1, 578) * 80 + Math.sin(t * 0.7 + i) * 6), y = Math.round(95 + ((t * 2 + i * 5) % 20)); c_tono(R, x, y, 0.4, C.blanco); }
  }
  // el reloj de pared, el ficus que se mece con el aire acondicionado
  c_reloj(R, 214, 44, 8, t, 16.8, hex('#3a3a44'));
  for (let i = 0; i < 16; i++) { const lx = Math.round(80 + h(i, 1, 579) * 18 + Math.sin(t * 1.3 + i) * 1), ly = Math.round(88 + h(i, 2, 579) * 30); R.poligono([[lx, ly], [lx + 3, ly - 2], [lx + 5, ly + 1], [lx + 2, ly + 2]], i % 3 ? hex('#3a7a3a') : hex('#5aa04a')); }
  // la puerta, que se cierra con o.puerta (0 abierta, 1 cerrada): la hoja gira sobre la bisagra de la izquierda
  { const w = Math.round(30 * (pu < 1 ? Math.max(0.12, pu) : 1)); { const x1 = 236 + w;
      if (pu >= 1) { rect(236, 62, 266, 146, hex('#9a7048')); for (let x = 238; x < 266; x += 5) for (let y = 62; y < 146; y++) if (h(x, y >> 2, 580) < 0.4) pset(x, y, hex('#8a6038')); rect(240, 68, 262, 98, hex('#8a6038')); rect(241, 69, 261, 97, hex('#a87a50')); rect(240, 104, 262, 140, hex('#8a6038')); rect(241, 105, 261, 139, hex('#a87a50')); rect(259, 104, 262, 107, hex('#e8c860')); pset(259, 104, C.blanco); }
      else { R.poligono([[236, 62], [x1, 58], [x1, 150], [236, 146]], hex('#8a6038')); R.poligono([[236, 62], [x1 - 1, 59], [x1 - 1, 149], [236, 146]], hex('#a87a50')); if (w > 6) rect(x1 - 4, 102, x1 - 2, 105, hex('#e8c860')); } } }
  // el salvapantallas de estrellas del ordenador
  for (let i = 0; i < 12; i++) { const u = ((t * 0.6 + h(i, 1, 581)) % 1), a = h(i, 2, 581) * Math.PI * 2, r = u * 10; pset(Math.round(293 + Math.cos(a) * r * 1.2), Math.round(103 + Math.sin(a) * r * 0.7), u > 0.6 ? C.blanco : hex('#6a7aa8')); }
  return { suelo: 150, mesa: [36, 141, 284], pantalla: [100, 27, 196, 90], ventana: [14, 30, 76, 104], puerta: [236, 62, 266, 146], ordenador: [280, 92, 318, 131], reloj: [214, 44] };
}

// lo de delante en 'revision': la mesa larga con carpetas (o.cruces con la cruz roja), el retroproyector, la jarra y
// los vasos; y, si o.luz < 1, la oscuridad sobre todo lo pintado
function c_revisionDelante(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R, y = 141;
  rect(36, y + 6, 284, 166, hex('#5a3a22')); rect(38, y + 6, 282, 164, hex('#7a5232')); for (let x = 40; x < 282; x++) if (h(x, 1, 582) < 0.3) linea(x, y + 8, x, y + 9 + Math.round(h(x, 2, 582) * 10), hex('#6a4428'));
  R.poligono([[44, y], [276, y], [288, y + 6], [32, y + 6]], (x, yy) => (yy === y ? hex('#c89a6a') : h(x, yy, 583) < 0.25 ? hex('#8a5a34') : hex('#a87244')));
  rect(32, y + 6, 288, y + 7, hex('#4a2a14'));
  // las carpetas con la cruz roja (o.cruces de 4) y los blocs
  const n = Math.round(c_lim((o.cruces ?? 4) / 4) * 4);
  [[60, 0], [104, 1], [196, 2], [240, 3]].forEach(([x, i]) => { R.poligono([[x, y + 1], [x + 20, y + 1], [x + 22, y + 5], [x - 2, y + 5]], i % 2 ? hex('#d8c8a0') : hex('#c8b890')); linea(x + 2, y + 1, x + 20, y + 1, hex('#e8dcb8'));
    if (i < n) { linea(x + 6, y + 1, x + 14, y + 5, C.rojo); linea(x + 14, y + 1, x + 6, y + 5, C.rojo); linea(x + 7, y + 1, x + 15, y + 5, C.rojo); } });
  for (const x of [84, 220]) { R.poligono([[x, y + 2], [x + 10, y + 2], [x + 11, y + 5], [x - 1, y + 5]], hex('#f4f0a8')); linea(x + 2, y + 3, x + 8, y + 3, hex('#9ab0d8')); }
  // el retroproyector: caja gris con la lámpara, el brazo y la cabeza con el espejo
  rect(138, y - 6, 160, y + 2, hex('#5a5a62')); rect(139, y - 5, 159, y + 1, hex('#8a8a94')); rect(139, y - 5, 159, y - 5, hex('#b8b8c0')); rect(142, y - 3, 156, y - 2, hex('#c8e0f0'));
  rect(158, y - 22, 159, y - 6, hex('#3a3a44')); rect(150, y - 26, 160, y - 21, hex('#3a3a44')); rect(151, y - 25, 157, y - 23, hex('#6a6a74')); disco(151, y - 21, 1.5, hex('#c8e0f0'));
  // la jarra de agua y los vasos, un vaso de café
  rect(118, y - 10, 126, y + 1, hex('#a8c8d8')); rect(119, y - 6, 125, y, hex('#7aa8c8')); rect(118, y - 10, 126, y - 10, C.blanco); rect(127, y - 8, 128, y - 3, hex('#a8c8d8')); pset(119, y - 9, C.blanco);
  for (const x of [176, 262]) { rect(x, y - 5, x + 3, y + 1, hex('#c8dce8')); rect(x, y - 2, x + 3, y, hex('#9ac0d8')); pset(x, y - 5, C.blanco); }
  rect(74, y - 4, 78, y + 1, C.blanco); rect(74, y - 4, 78, y - 4, hex('#d8d0c0'));
  // la oscuridad: la sala se apaga (deja un poco de luz de la ventana)
  const luz = c_lim(o.luz ?? 1); if (luz < 1) c_oscuro(R, luz, [[14, 30, 76, 104, 0.55]]);
  return { mesa: [36, 141, 284], carpetas: [[70, 141], [114, 141], [206, 141], [250, 141]], retroproyector: [149, 135] };
}

// ─ 'revision' cámara 'pantalla2017' ─
// un rectángulo recortado a [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function c_rectC(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(x0, cl[0]), Math.max(y0, cl[1]), Math.min(x1, cl[2]), Math.min(y1, cl[3]), c); }

function c_pantalla17(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R, vel = o.velocidad ?? 6;
  c_fijo(R, 'p17', () => {
    // la oficina de detrás desenfocada: pared gris azulada, la ventana de noche con luces de la ciudad en bokeh, una planta
    for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) pset(x, y, c_mez(hex('#3a4458'), hex('#2a3244'), y / 132 + (h(x >> 2, y >> 2, 584) - 0.5) * 0.15));
    rect(0, 10, 60, 100, hex('#141c34')); for (let i = 0; i < 14; i++) { const x = Math.round(h(i, 1, 585) * 56) + 2, y = Math.round(h(i, 2, 585) * 80) + 14; for (let j = -3; j <= 3; j++) for (let k = -3; k <= 3; k++) if (j * j + k * k <= 9 && ((x + k + y + j) & 1 || j * j + k * k < 5)) pset(x + k, y + j, [hex('#e8c060'), hex('#f0e0a0'), hex('#c87a4a')][i % 3]); }
    rect(60, 10, 62, 100, hex('#4a5468'));
    for (let i = 0; i < 10; i++) { const x = 262 + Math.round(h(i, 3, 585) * 50), y = 70 + Math.round(h(i, 4, 585) * 50); for (let j = -5; j <= 5; j++) for (let k = -5; k <= 5; k++) if (j * j + k * k <= 25 && ((x + k + y + j) & 1)) pset(x + k, y + j, i % 2 ? hex('#2e5a3a') : hex('#3e6a44')); }
    // el escritorio claro de 2017 (melamina blanca con veta tenue) y su canto
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.04 + y * 0.6 + Math.sin(y * 0.3) * 2); pset(x, y, v > 0.92 ? hex('#cfc8bc') : h(x, y, 586) < 0.04 ? hex('#d8d2c6') : hex('#e6e0d4')); }
    rect(0, 132, 319, 133, hex('#f4f0e8'));
    // el monitor plano: marco negro fino, el pie de aluminio
    c_sombra(R, 160, 140, 40, 3, 0.35);
    rect(150, 124, 170, 138, hex('#9aa0a8')); rect(152, 124, 168, 136, hex('#c8ccd4')); rect(130, 136, 190, 140, hex('#a8aeb6')); rect(130, 136, 190, 136, hex('#e0e4ea'));
    rect(64, 26, 256, 128, hex('#16161c')); rect(66, 28, 254, 126, hex('#22222a')); rect(158, 126, 162, 127, hex('#3a3a44'));
    // notas adhesivas en el marco (sin letras: dos rayas), el teclado y el ratón, el móvil
    for (const [x, y, c, r] of [[56, 34, hex('#f8e870'), 0], [246, 40, hex('#f8a8c8'), 1], [246, 92, hex('#a8e8f0'), 2]]) { rect(x, y, x + 13, y + 13, c); rect(x, y + 12, x + 13, y + 13, c_mez(c, C.k, 0.15)); linea(x + 2, y + 4, x + 10, y + 4, c_mez(c, C.k, 0.4)); linea(x + 2, y + 7, x + 8 - r, y + 7, c_mez(c, C.k, 0.4)); }
    c_sombra(R, 160, 168, 92, 4, 0.3); rect(68, 148, 252, 168, hex('#b8bcc4')); rect(69, 149, 251, 166, hex('#dce0e6'));
    for (let j = 0; j < 4; j++) for (let i = 0; i < 18 - (j === 3 ? 6 : 0); i++) { const x = 72 + i * 10 + (j & 1) * 3, w = j === 3 && i === 5 ? 50 : 8; rect(x, 151 + j * 4, x + w - 1, 153 + j * 4, hex('#f6f6f8')); rect(x, 154 + j * 4, x + w - 1, 154 + j * 4, hex('#a8acb4')); if (j === 3 && i === 5) i += 5; }
    c_sombra(R, 278, 162, 9, 3, 0.3); disco(276, 156, 7, hex('#c8ccd4')); disco(276, 155, 6, hex('#eef0f4')); linea(276, 150, 276, 155, hex('#a8acb4'));
    rect(22, 150, 42, 176, hex('#1a1a20')); rect(23, 151, 41, 175, hex('#2a2a34'));
    // la taza con su asa
    c_sombra(R, 30, 144, 12, 3, 0.3); rect(18, 116, 40, 142, hex('#e8e4dc')); rect(18, 116, 22, 142, C.blanco); rect(36, 116, 40, 142, hex('#c8c4bc')); R.disco(29, 116, 11, hex('#d8d4cc')); R.disco(29, 116, 9, hex('#4a2a14'));
    for (let y = 122; y < 136; y++) { pset(41, y, hex('#c8c4bc')); pset(43, y, hex('#c8c4bc')); } rect(41, 121, 43, 122, hex('#c8c4bc')); rect(41, 136, 43, 137, hex('#c8c4bc'));
  });
  // la pantalla: el visor de documentos con la columna de miniaturas y las páginas que pasan solas
  const S = [68, 30, 252, 124]; rect(S[0], S[1], S[2], S[3], hex('#4a4e58')); rect(S[0], S[1], S[2], S[1] + 6, hex('#2e3a5a')); for (let i = 0; i < 5; i++) rect(S[0] + 4 + i * 9, S[1] + 2, S[0] + 9 + i * 9, S[1] + 4, hex('#8a9ab8'));
  const fl = t * vel, CL = [S[0], S[1] + 7, S[2], S[3]]; R.recorte(CL); const rc = (a, b, c2, d, col) => c_rectC(R, CL, a, b, c2, d, col);
  // miniaturas a la izquierda
  for (let k = -1; k < 6; k++) { const yy = Math.round(S[1] + 10 + k * 18 - ((fl * 18) % 18)), sel = k === 1; rc(S[0] + 3, yy, S[0] + 20, yy + 15, sel ? hex('#6aa8f0') : hex('#3a3e48')); rc(S[0] + 5, yy + 1, S[0] + 18, yy + 14, C.blanco); for (let j = 0; j < 5; j++) linea(S[0] + 7, yy + 3 + j * 2, S[0] + 16 - (j % 2) * 3, yy + 3 + j * 2, hex('#a8a8b0')); }
  // las páginas grandes que suben: rayas de texto (sin letras), un sello, un párrafo tachado de negro
  const pg = 96, off = (fl * pg) % pg;
  for (let k = -1; k < 2; k++) { const y0 = Math.round(S[1] + 9 + k * pg - off), x0 = S[0] + 34, x1 = S[2] - 18, n = Math.floor(fl) + k;
    rc(x0 + 2, y0 + 2, x1 + 2, y0 + pg - 6, hex('#2a2e36')); rc(x0, y0, x1, y0 + pg - 8, hex('#fbfaf6'));
    for (let j = 0; j < 14; j++) { const yy = y0 + 8 + j * 5, L = 20 + Math.round(h(n, j, 587) * (x1 - x0 - 30)); if (h(n, j, 588) < 0.15) rc(x0 + 8, yy - 1, x0 + 8 + L, yy + 1, C.k); else linea(x0 + 8, yy, x0 + 8 + L, yy, hex('#7a7a84')); }
    R.anillo(x1 - 16, y0 + 14, 6, C.rojo); linea(x1 - 22, y0 + 14, x1 - 10, y0 + 14, C.rojo); }
  R.recorte(null);
  // la barra de desplazamiento y el contador de páginas
  rect(S[2] - 6, S[1] + 8, S[2] - 2, S[3] - 2, hex('#3a3e48')); const sb = S[1] + 8 + Math.round(((fl / 400) % 1) * (S[3] - S[1] - 22)); rect(S[2] - 5, sb, S[2] - 3, sb + 10, hex('#8a9ab8'));
  rect(S[2] - 46, S[1] + 1, S[2] - 2, S[1] + 6, hex('#1e2840')); c_cifras(R, String(Math.floor((o.paginas0 ?? 1) + fl)), S[2] - 44, S[1] + 1, hex('#e8eef8'));
  // el reflejo de la pantalla, el móvil que se ilumina, el vapor de la taza
  for (let y = 30; y < 124; y++) for (let x = 200; x < 252; x++) if (x - 200 + (y - 30) * 0.4 < 24 && x - 200 + (y - 30) * 0.4 > 14 && ((x + y) & 1)) c_tono(R, x, y, 0.1, C.blanco);
  const mov = (t % 5) < 1.5; rect(24, 152, 40, 174, mov ? hex('#4a7ac8') : hex('#14141a')); if (mov) { rect(26, 156, 38, 160, hex('#e8eef8')); rect(26, 156, 28, 160, hex('#3aa84a')); }
  for (let i = 0; i < 3; i++) { const u = (t * 0.45 + i / 3) % 1; for (let k = 0; k < 6; k++) { const y = Math.round(108 - u * 40 - k * 2), x = Math.round(27 + i * 3 + Math.sin(u * 7 + k * 0.6 + i) * 3); if (y > 50 && h(x, y, 589) < 0.8 - u * 0.6) c_tono(R, x, y, 0.35 * (1 - u), C.blanco); } }
  return { pantalla: S, teclado: [68, 148, 252, 168], raton: [276, 156], taza: [29, 116] };
}

// la oscuridad: oscurece toda la pantalla hacia el azul noche (luz 0–1), salvo las zonas de luz [x0, y0, x1, y1, f] (f
// cuánta luz conservan), el haz de una linterna ({ linterna: [x, y], radio }) y el haz de luna (poligono)
function c_oscuro(R, luz, zonas = [], o = {}) {
  const B = R.buf, [lx, ly] = o.linterna || [-999, -999], rr = o.radio ?? 24, haz = o.haz;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let f = luz;
    for (const [x0, y0, x1, y1, g] of zonas) if (x >= x0 && x <= x1 && y >= y0 && y <= y1) f = Math.max(f, g);
    if (haz && y >= haz[0] && y <= haz[1]) { const d = (y - haz[0]) * haz[4]; if (x >= haz[2] + d && x <= haz[3] + d && ((x + y) & 1)) f = Math.max(f, 0.35); }
    let lin = 0; const dl = Math.hypot(x - lx, (y - ly) * 1.15) / rr; if (dl < 1) { lin = dl < 0.75 ? 1 : (((x + y) & 1) ? 0.85 : 0.5); f = Math.max(f, lin); }
    if (f >= 1 && !lin) continue;
    const i = y * 320 + x, c = B[i], r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
    let nr = r * 0.16 + 8, ng = g * 0.18 + 12, nb = b * 0.26 + 30;
    nr += (r - nr) * f; ng += (g - ng) * f; nb += (b - nb) * f;
    if (lin) { nr = Math.min(255, nr + 22 * lin); ng = Math.min(255, ng + 16 * lin); }
    B[i] = (0xff000000 | (Math.round(nb) << 16) | (Math.round(ng) << 8) | Math.round(nr)) >>> 0;
  }
}

// la Luna llena grande: mares de ruido suave, cráteres con su sombra, el limbo claro arriba a la izquierda y el halo
function c_luna(R, cx, cy, r) {
  const P = c_P;
  R.halo(cx, cy, r * 2.3, [P.noche2, hex('#3a4678'), hex('#5a6492')], 0.9);
  R.disco(cx, cy, r, (x, y, d) => { const u = (x - cx) / r, v = (y - cy) / r, m = Math.sin(u * 3.1 + 1.3) * Math.cos(v * 2.7 - 0.4) + h(x >> 1, y >> 1, 600) * 0.5;
    let c = m > 0.6 ? P.lunaM : P.luna; if (m > 0.95) c = P.lunaS; if (d > 0.82 && u + v < -0.2) c = P.lunaL; if (d > 0.85 && u + v > 0.5) c = c_mez(c, P.lunaS, 0.6); return c; });
  for (const [dx, dy, rr] of [[-0.35, 0.3, 0.16], [0.3, -0.2, 0.12], [0.1, 0.5, 0.1], [-0.5, -0.3, 0.08], [0.45, 0.35, 0.1]]) { const x = cx + dx * r, y = cy + dy * r, q = Math.max(1, rr * r); R.disco(x, y, q, P.lunaM); R.disco(x + 0.6, y + 0.6, q * 0.7, P.lunaS); R.pset(Math.round(x - q * 0.6), Math.round(y - q * 0.6), P.lunaL); }
}

// el cielo de noche en un hueco: degradado tramado, estrellas que titilan, la Luna, nubes de luna a dos velocidades, los
// tejados con ventanas encendidas y el avión que parpadea
function c_nocheVentana(R, t, x0, y0, x1, y1, luna) {
  const P = c_P, { pset, rect } = R;
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0); for (let x = x0; x <= x1; x++) { const d = p + (((x + y) & 1) ? 0.06 : -0.06); pset(x, y, d < 0.4 ? P.noche0 : d < 0.75 ? P.noche1 : P.noche2); } }
  R.recorte([x0, y0, x1, y1]);
  for (let i = 0; i < 26; i++) { const x = x0 + Math.round(h(i, 1, 601) * (x1 - x0)), y = y0 + Math.round(h(i, 2, 601) * (y1 - y0) * 0.7), b = Math.sin(t * (1.5 + h(i, 3, 601) * 3) + i * 2); pset(x, y, b > 0.3 ? C.blanco : b > -0.4 ? hex('#a8b0d8') : P.noche2); if (i % 7 === 0 && b > 0.6) { pset(x - 1, y, hex('#6a76a8')); pset(x + 1, y, hex('#6a76a8')); } }
  c_luna(R, luna[0], luna[1], luna[2]);
  const W = x1 - x0 + 60, tonos = [hex('#2a3460'), hex('#46527e'), hex('#8a94b8')];
  for (let i = 0; i < 3; i++) { const v = 1.2 + i * 1.6, cx = x0 - 30 + ((h(i, 4, 601) * W + t * v) % W), cy = y0 + 8 + Math.round(h(i, 5, 601) * (y1 - y0) * 0.45); c_nube(R, cx, cy, 11 + i * 3, tonos); }
  { const ax = x1 - ((t * 9) % (x1 - x0 + 20)), ay = y0 + 10; pset(ax, ay, hex('#3a3a50')); if (Math.sin(t * 6) > 0.5) pset(ax, ay, C.rojo); if (Math.sin(t * 6 + 2) > 0.7) pset(ax + 2, ay, C.blanco); }
  // los tejados de enfrente con chimeneas y ventanas que se encienden y apagan
  const tej = y1 - 16;
  for (let x = x0; x <= x1; x++) { const b = Math.floor((x - x0) / 14), top = tej + Math.round(h(b, 1, 602) * 8) - ((x - x0) % 14 < 7 ? (x - x0) % 14 : 14 - (x - x0) % 14) * (h(b, 2, 602) < 0.5 ? 1 : 0) * 0.6; for (let y = Math.round(top); y <= y1; y++) pset(x, y, (y === Math.round(top)) ? hex('#2a2a44') : hex('#14142a')); }
  for (let b = 0; b < 6; b++) { const cx = x0 + b * 14 + 4; if (h(b, 3, 602) < 0.5) rect(cx, tej - 4, cx + 2, tej + 2, hex('#14142a'));
    for (let w = 0; w < 2; w++) { const on = h(b, w + Math.floor(t / 3 + b), 603) < 0.55; if (on) { rect(cx + w * 5, tej + 9, cx + w * 5 + 2, tej + 11, hex('#f0c060')); pset(cx + w * 5, tej + 9, hex('#fff0b0')); } } }
  R.recorte(null);
}

// estanterías de archivo: un cuerpo de x0 a x1 con baldas cada 22 px (de y0 a y1), lleno de carpetas, cajas y montones
function c_estante(R, x0, x1, y0, y1, k) {
  const P = c_P, { rect, pset } = R;
  rect(x0, y0, x1, y1, hex('#2a180e')); for (let y = y0; y <= y1; y++) for (let x = x0 + 3; x <= x1 - 3; x++) if (h(x, y, 604) < 0.12) pset(x, y, hex('#3a2416'));
  rect(x0, y0, x0 + 2, y1, hex('#6a4228')); rect(x0, y0, x0, y1, hex('#8a5a36')); rect(x1 - 2, y0, x1, y1, hex('#5a3620')); rect(x1, y0, x1, y1, hex('#3a2010'));
  for (let y = y0 + 22; y <= y1; y += 22) {
    // lo que hay en la balda (de y − 21 a y − 1)
    let x = x0 + 4;
    while (x < x1 - 5) { const n = h(x, y, 605 + k), w = x1 - 4 - x;
      if (n < 0.28 && w >= 16) { const bw = 14 + Math.round(h(x, y, 606) * 4), bh = 13 + Math.round(h(x, y, 607) * 4), gris = h(x, y, 608) < 0.5, c = gris ? hex('#8a8e98') : hex('#b08a5a'), cS = gris ? hex('#5e626c') : hex('#7a5a36');
        rect(x, y - bh, x + bw, y - 1, cS); rect(x, y - bh, x + bw - 1, y - 2, c); rect(x, y - bh, x + bw - 1, y - bh, c_mez(c, C.blanco, 0.3)); rect(x + 3, y - bh + 3, x + bw - 4, y - bh + 6, hex('#ece4cc')); rect(x + Math.round(bw / 2) - 2, y - 5, x + Math.round(bw / 2) + 2, y - 4, cS); x += bw + 2; }
      else if (n < 0.4 && w >= 14) { for (let j = 0; j < 5; j++) { const c = [hex('#d8c8a0'), hex('#b08a5a'), hex('#c8b890'), hex('#a8a4a0'), hex('#d8c8a0')][j]; rect(x, y - 3 - j * 3, x + 13 - (j & 1), y - 1 - j * 3, c); rect(x, y - 1 - j * 3, x + 13, y - 1 - j * 3, c_mez(c, C.k, 0.3)); if (j === 2) pset(x + 10, y - 2 - j * 3, P.tintaR); } x += 16; }
      else { const fw = 3 + Math.round(h(x, y, 609) * 2), fh = 14 + Math.round(h(x, y, 610) * 5), c = [hex('#d8c8a0'), hex('#c8b890'), hex('#b08a5a'), hex('#a8acb4'), hex('#8a5a4a')][Math.floor(h(x, y, 611) * 5)], inc = h(x, y, 612) < 0.1 ? 1 : 0;
        for (let yy = y - fh; yy < y; yy++) { const dx = inc ? Math.round((y - yy) / 6) : 0; rect(x + dx, yy, x + fw - 1 + dx, yy, c); pset(x + fw - 1 + dx, yy, c_mez(c, C.k, 0.3)); }
        pset(x + 1, y - fh, c_mez(c, C.blanco, 0.4)); if (h(x, y, 613) < 0.45) { pset(x + 1, y - fh + 5, hex('#c8303a')); pset(x + 2, y - fh + 5, hex('#c8303a')); }
        if (fw > 3) rect(x + 1, y - fh + 9, x + fw - 2, y - fh + 10, c_mez(c, C.blanco, 0.35)); x += fw + (h(x, y, 614) < 0.15 ? 2 : 0); } }
    // la balda con su canto de luz y la sombra que deja debajo
    rect(x0 + 3, y, x1 - 3, y + 2, hex('#7a4c2c')); rect(x0 + 3, y, x1 - 3, y, hex('#a8743c')); rect(x0 + 3, y + 2, x1 - 3, y + 2, hex('#4a2a14'));
    for (let yy = y + 3; yy < y + 6 && yy < y1; yy++) for (let xx = x0 + 3; xx <= x1 - 3; xx++) if (h(xx, yy, 615) < 0.7 - (yy - y - 3) * 0.25) c_tono(R, xx, yy, 0.4, C.k);
  }
}

// ─ 'archivo' general ─
function c_archivo(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  c_fijo(R, 'archivo', () => {
    // el techo con vigas y la pared de paneles de madera oscura
    rect(0, 0, 319, 15, hex('#24160e')); for (let x = 0; x < 320; x += 40) { rect(x, 0, x + 12, 15, hex('#3a2416')); rect(x, 13, x + 12, 15, hex('#2a180e')); rect(x, 0, x, 15, hex('#4a2e1c')); }
    rect(0, 15, 319, 17, hex('#5a3820')); rect(0, 15, 319, 15, hex('#7a5030'));
    c_panelado(R, 0, 18, 319, 147, hex('#4a2e1e'), hex('#3a2216'), hex('#5e3c26'), hex('#22140c'), 13, 7);
    for (let y = 18; y < 148; y++) for (let x = 278; x < 320; x++) if (y < 50 && h(x, y, 616) < 0.6) c_tono(R, x, y, 0.15, hex('#22140c'));
    rect(0, 146, 319, 150, hex('#2a180e')); rect(0, 146, 319, 146, hex('#6a4228'));
    // el parqué en perspectiva y la alfombra granate con su cenefa
    for (let y = 151; y < 180; y++) { const p = (y - 151) / 29, fila = Math.floor((y - 151) / (3 + p * 3)); for (let x = 0; x < 320; x++) { const xx = Math.round((x - 160) / (0.8 + p * 0.5)), tabla = Math.floor((xx + fila * 17) / 34);
      const b = h(tabla, fila, 617); let c = b < 0.33 ? hex('#6a4024') : b < 0.66 ? hex('#7a4c2c') : hex('#5e381e'); if ((xx + fila * 17) % 34 === 0) c = hex('#3a2010'); if (h(x, y, 618) < 0.08) c = c_mez(c, C.blanco, 0.12); pset(x, y, c); } }
    for (let y = 158; y < 180; y++) { const p = (y - 158) / 22, xa = Math.round(46 - p * 14), xb = Math.round(236 + p * 14); for (let x = xa; x <= xb; x++) { const bx = Math.min(x - xa, xb - x), by = y - 158;
      let c = bx < 3 || by < 2 ? hex('#4a1418') : bx < 7 || by < 5 ? (((x + y) >> 1) & 1 ? hex('#c89a4a') : hex('#7a2228')) : (h(x >> 1, y, 619) < 0.15 ? hex('#5a1a20') : hex('#7a2228')); if (bx >= 7 && by >= 5 && Math.abs(((x - 141) * 0.5) % 12) < 1 && ((x + y) & 1)) c = hex('#9a3a34'); pset(x, y, c); } }
    // las tres estanterías, la corona de arriba y las cajas encima
    for (const [x0, x1, k] of [[4, 58, 0], [60, 114, 1], [116, 170, 2]]) c_estante(R, x0, x1, 22, 150, k);
    rect(2, 18, 172, 22, hex('#6a4228')); rect(2, 18, 172, 18, hex('#9a6a40')); rect(2, 22, 172, 22, hex('#3a2010'));
    for (const [x, w, c] of [[8, 16, hex('#8a8e98')], [28, 14, hex('#b08a5a')], [86, 18, hex('#8a8e98')], [132, 14, hex('#b08a5a')], [148, 16, hex('#8a8e98')]]) { rect(x, 18 - 9, x + w, 17, c_mez(c, C.k, 0.3)); rect(x, 9, x + w - 1, 16, c_mez(c, C.k, 0.15)); rect(x, 9, x + w - 1, 9, c); }
    for (let y = 22; y < 150; y++) for (let x = 171; x < 176; x++) c_tono(R, x, y, 0.35, C.k);
    // la barra de latón y la escalera de biblioteca apoyada, con sus ruedas
    rect(4, 24, 170, 25, hex('#c89a3a')); rect(4, 24, 170, 24, hex('#f0d080'));
    for (const dx of [0, 14]) { linea(124 + dx, 25, 132 + dx, 152, hex('#5a3418')); linea(125 + dx, 25, 133 + dx, 152, hex('#8a5a30')); linea(126 + dx, 25, 134 + dx, 152, hex('#6a4022')); }
    for (let y = 36; y < 150; y += 12) { const dx = Math.round((y - 25) / 127 * 8); rect(126 + dx, y, 139 + dx, y + 1, hex('#8a5a30')); rect(126 + dx, y, 139 + dx, y, hex('#b07a44')); }
    for (const dx of [0, 14]) { R.anillo(124 + dx, 26, 2, hex('#c89a3a')); disco(133 + dx, 152, 2, C.k); pset(133 + dx, 151, hex('#c89a3a')); }
    // la ventana: el hueco, el marco con el parteluz y el travesaño, el alféizar
    rect(184, 22, 256, 104, hex('#3a2010')); rect(186, 24, 254, 102, hex('#14142a'));
    rect(182, 102, 258, 106, hex('#7a4c2c')); rect(182, 102, 258, 102, hex('#a8743c')); rect(182, 106, 258, 106, hex('#3a2010'));
    // la lámpara de pie (pie, base) y el archivador metálico con un cajón entreabierto
    disco(267, 149, 6, hex('#2a2018')); rect(261, 147, 273, 149, hex('#3a2a1a')); rect(266, 66, 267, 147, hex('#b08a3a')); rect(266, 66, 266, 147, hex('#e0c060'));
    rect(282, 92, 318, 150, hex('#5a5e68')); rect(283, 93, 317, 149, hex('#7a7e88')); rect(283, 93, 284, 149, hex('#9aa0a8'));
    for (let k = 0; k < 4; k++) { const y = 96 + k * 13, ab = k === 1 ? 3 : 0; rect(285 - ab, y - ab, 315, y + 10, hex('#5a5e68')); rect(286 - ab, y + 1 - ab, 314, y + 9, hex('#8a8e98')); rect(286 - ab, y + 1 - ab, 314, y + 1 - ab, hex('#b8bcc4'));
      rect(296 - ab, y + 3, 304 - ab, y + 5, hex('#d8d8e0')); rect(297 - ab, y + 6, 303 - ab, y + 7, hex('#4a4e58')); rect(297 - ab, y + 6, 303 - ab, y + 6, hex('#c8ccd4')); }
    for (let i = 0; i < 5; i++) rect(285 + i * 6, 92 - (i % 2) * 2, 289 + i * 6, 95, i % 2 ? hex('#d8c8a0') : hex('#b08a5a'));
    c_sombra(R, 300, 151, 20, 2, 0.4);
    // el ficus en su maceta
    rect(174, 134, 188, 150, hex('#7a4a2a')); rect(173, 132, 189, 135, hex('#9a6036')); rect(175, 140, 187, 140, hex('#5a3418')); linea(181, 132, 181, 104, hex('#4a3020')); c_sombra(R, 181, 151, 9, 2, 0.4);
  });
  // ── la vida: la ventana de noche, las cortinas, el haz de luna con motas, la lámpara, el reloj, el ficus ──
  c_nocheVentana(R, t, 186, 24, 254, 102, [226, 48, 13]);
  rect(219, 24, 221, 102, hex('#3a2010')); rect(219, 24, 219, 102, hex('#6a4228')); rect(186, 62, 254, 64, hex('#3a2010')); rect(186, 62, 254, 62, hex('#6a4228'));
  for (const [xa, d] of [[176, 1], [246, -1]]) for (let x = 0; x < 13; x++) { const s = Math.round(Math.sin(t * 0.8 + x * 0.4) * 0.6), c = (x + (d < 0 ? 1 : 0)) % 4 < 2 ? hex('#6a1a22') : hex('#8a2a2e'); for (let y = 18; y < 112 + (x % 3); y++) pset(xa + x + (y > 90 ? s : 0), y, x % 4 === 3 ? hex('#4a1016') : c); }
  rect(174, 16, 262, 19, hex('#b08a3a')); rect(174, 16, 262, 16, hex('#f0d080')); disco(174, 17, 2.5, hex('#c89a3a')); disco(262, 17, 2.5, hex('#c89a3a'));
  // el haz de luna sobre el suelo y las motas que flotan en él
  for (let y = 152; y < 180; y++) { const d = Math.round((y - 152) * -0.9); for (let x = 192 + d; x <= 236 + d; x++) if ((x + y) & 1) c_tono(R, x, y, 0.16, hex('#c8d4ff')); }
  for (let i = 0; i < 10; i++) { const u = (t * 0.05 + h(i, 1, 620)) % 1, x = Math.round(200 + h(i, 2, 620) * 40 - u * 20 + Math.sin(t + i) * 2), y = Math.round(110 + u * 60); c_tono(R, x, y, 0.5, hex('#e8eeff')); }
  // la lámpara de pie: pantalla de tela encendida, el halo cálido que respira y una polilla que da vueltas
  const fl = 0.92 + 0.08 * Math.sin(t * 7) * Math.sin(t * 2.3);
  for (let y = 40; y < 120; y++) for (let x = 236; x < 300; x++) { const d = Math.hypot(x - 267, (y - 64) * 1.2) / 40; if (d < 1 && h(x, y, 621) < (1 - d) * fl * 0.9) c_tono(R, x, y, 0.16, hex('#ffcf80')); }
  R.poligono([[258, 52], [276, 52], [280, 68], [254, 68]], (x, y) => (y === 52 ? hex('#fff0c0') : x < 262 ? hex('#e8b870') : x > 273 ? hex('#c8904a') : hex('#f4d090')));
  for (let x = 256; x < 280; x += 4) linea(x + 1, 54, x, 67, hex('#d8a860')); rect(254, 68, 280, 69, hex('#a86a3a'));
  { const a = t * 3.1, mx = Math.round(267 + Math.cos(a) * 14), my = Math.round(62 + Math.sin(a * 1.3) * 7), al = Math.sin(t * 30) > 0 ? 1 : 0; pset(mx, my, hex('#5a4a3a')); pset(mx - 1, my - al, hex('#a8987a')); pset(mx + 1, my - al, hex('#a8987a')); }
  c_reloj(R, 300, 66, 8, t, 23.2, hex('#b08a3a'));
  for (let i = 0; i < 12; i++) { const lx = Math.round(172 + h(i, 1, 622) * 18 + Math.sin(t * 0.9 + i) * 0.8), ly = Math.round(102 + h(i, 2, 622) * 30); R.poligono([[lx, ly], [lx + 4, ly - 3], [lx + 7, ly + 1], [lx + 3, ly + 3]], i % 3 ? hex('#2e5a2e') : hex('#4a7a3a')); pset(lx + 4, ly - 1, hex('#6a9a4a')); }
  return { suelo: 170, sueloDetras: 150, mesa: [92, 141, 232], ventana: [186, 24, 254, 102], luna: [226, 48, 13], escalera: [124, 25, 148, 152], lampara: [267, 60], archivador: [282, 92, 318, 150], estanterias: [4, 18, 170, 150], carpetaLuna: [190, 142], microfono: [226, 142] };
}

// el escritorio de 'archivo' (lo de delante): tablero de caoba, faldón con cajones y tiradores de latón, el flexo verde con
// su luz, montones de carpetas, el sello, la carpeta de la Luna y el micrófono de Atom
function c_escritorio(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R, y = 141;
  rect(92, y + 5, 232, 172, hex('#3a1e10')); rect(94, y + 6, 230, 170, hex('#5a3018'));
  for (const [xa, xb] of [[98, 140], [184, 226]]) for (let k = 0; k < 2; k++) { const yy = y + 9 + k * 9; rect(xa, yy, xb, yy + 7, hex('#3a1e10')); rect(xa + 1, yy + 1, xb - 1, yy + 6, hex('#6a3a1e')); rect(xa + 1, yy + 1, xb - 1, yy + 1, hex('#8a5030')); rect(Math.round((xa + xb) / 2) - 3, yy + 3, Math.round((xa + xb) / 2) + 3, yy + 4, hex('#c89a3a')); pset(Math.round((xa + xb) / 2) - 3, yy + 3, hex('#f0d080')); }
  for (let yy = y + 8; yy < 170; yy++) for (let x = 144; x < 180; x++) pset(x, yy, h(x, yy >> 1, 623) < 0.15 ? hex('#4a2614') : hex('#52301a'));
  rect(90, y, 234, y + 5, hex('#6a3a1e')); rect(90, y, 234, y, hex('#a8683a')); rect(90, y + 1, 234, y + 1, hex('#8a5030')); rect(90, y + 5, 234, y + 5, hex('#2a140a'));
  for (let x = 92; x < 232; x++) if (h(x, 1, 624) < 0.3) pset(x, y + 3, hex('#7a4426'));
  // el flexo de banquero: pie de latón, la pantalla de cristal verde y la luz en el tablero
  rect(100, y - 2, 114, y, hex('#a8782a')); rect(100, y - 2, 114, y - 2, hex('#e8c060')); rect(106, y - 13, 107, y - 2, hex('#c89a3a'));
  R.poligono([[98, y - 18], [116, y - 18], [118, y - 12], [96, y - 12]], (x, yy) => (yy === y - 18 ? hex('#6aa86a') : x < 102 ? hex('#3a7a3a') : hex('#2e6a32'))); rect(96, y - 12, 118, y - 12, hex('#1e4a22'));
  for (let x = 92; x < 130; x++) if (((x + y) & 1) === 0) { c_tono(R, x, y + 1, 0.25, hex('#fff0b0')); c_tono(R, x, y + 2, 0.15, hex('#fff0b0')); }
  // montones de carpetas y papeles, el sello y el tampón
  for (let j = 0; j < 4; j++) { const c = [hex('#d8c8a0'), hex('#b08a5a'), hex('#c8b890'), hex('#d8c8a0')][j]; rect(124 + (j & 1), y - 3 - j * 2, 146 + (j & 1), y - 1 - j * 2, c); rect(124 + (j & 1), y - 1 - j * 2, 146 + (j & 1), y - 1 - j * 2, c_mez(c, C.k, 0.3)); }
  pset(140, y - 8, P.tintaR); pset(141, y - 8, P.tintaR);
  rect(200, y - 3, 210, y, hex('#3a3a44')); rect(201, y - 3, 209, y - 2, hex('#c8303a')); if (PIEZAS_DC.sello) PIEZAS_DC.sello(R, 215, y + 1, {});
  for (let j = 0; j < 2; j++) R.poligono([[146 + j, y - 1 - j], [174 + j, y - 1 - j], [176 + j, y + 1 - j], [144 + j, y + 1 - j]], j ? hex('#f0ecd8') : hex('#d8d0b8'));
  if (o.carpetaLuna !== false && PIEZAS_DC.carpeta) PIEZAS_DC.carpeta(R, 190, y + 1, { dibujo: 'luna' });
  if (o.microfono !== false && PIEZAS_DC.microfono) PIEZAS_DC.microfono(R, 226, y + 1, { encendido: Math.sin(t * 3) > -0.5 });
  return { mesa: [92, 141, 232], carpetaLuna: [190, 142], microfono: [226, 142], sello: [215, 142] };
}

// ─ 'archivo' cámara 'mesa': el escritorio de cerca ─
function c_hoyMesa(R, t, o) {
  const P = c_P, { rect, pset, linea, disco } = R;
  c_fijo(R, 'hoyMesa', () => {
    // detrás: la pared y las estanterías desenfocadas (lomos gruesos en tonos apagados), la ventana
    for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) pset(x, y, c_mez(hex('#3a2418'), hex('#24160e'), (h(x >> 3, y >> 3, 625) - 0.5) * 0.3 + y / 200));
    for (let s = 0; s < 4; s++) { const yb = 22 + s * 24; for (let x = 0; x < 198; x += 4) { const hh = 12 + Math.round(h(x, s, 626) * 8), c = [hex('#8a7a5a'), hex('#7a5a3a'), hex('#6a6a6e'), hex('#9a8a62'), hex('#5a3a2a')][Math.floor(h(x, s, 627) * 5)];
        for (let y = yb - hh; y < yb; y++) for (let i = 0; i < 4; i++) if (h(x + i, y, 628) < 0.85) pset(x + i, y, c_mez(c, hex('#2a180e'), 0.25 + (i === 3 ? 0.2 : 0))); if (h(x, s, 629) < 0.4) rect(x + 1, yb - hh + 4, x + 2, yb - hh + 5, hex('#8a3a3a')); }
      rect(0, yb, 198, yb + 2, hex('#5a3820')); rect(0, yb, 198, yb, hex('#7a5030')); }
    rect(198, 0, 202, 96, hex('#2a180e'));
    for (let y = 0; y < 18; y++) for (let x = 0; x < 198; x++) c_tono(R, x, y, 0.45 - y * 0.015, hex('#24160e'));
    rect(206, 14, 268, 86, hex('#3a2010')); rect(208, 16, 266, 84, hex('#14142a'));
    // el tablero de caoba en perspectiva con vetas, el canto de delante
    for (let y = 96; y < 180; y++) { const p = (y - 96) / 84; for (let x = 0; x < 320; x++) { const xx = (x - 160) / (0.6 + p * 0.7), v = Math.sin(xx * 0.08 + Math.sin(y * 0.13) * 1.8 + y * 0.04); pset(x, y, v > 0.9 ? hex('#4a2010') : v < -0.93 ? hex('#8a4a28') : h(x, y, 630) < 0.06 ? hex('#5a2a14') : hex('#6a3418')); } }
    rect(0, 96, 319, 97, hex('#8a4a28'));
    // el cartapacio de piel verde con su filete dorado y las esquinas de cuero
    R.poligono([[44, 104], [276, 104], [300, 176], [20, 176]], (x, y) => (h(x, y, 631) < 0.1 ? hex('#1e4a2a') : hex('#2a5a34')));
    for (let y = 104; y <= 176; y++) { const u = (y - 104) / 72, xa = Math.round(44 - u * 24), xb = Math.round(276 + u * 24); pset(xa + 3, y, hex('#c8a040')); pset(xb - 3, y, hex('#c8a040')); }
    linea(47, 107, 273, 107, hex('#c8a040')); linea(24, 173, 296, 173, hex('#c8a040'));
    for (const [a, b, c, d] of [[[44, 104], [60, 104], [40, 116], [38, 104]], [[276, 104], [260, 104], [280, 116], [282, 104]]]) R.poligono([a, b, c], hex('#5a2a14'));
    // la lámpara de banquero (pie de latón) a la derecha, la taza de té, la lupa, los clips
    c_sombra(R, 296, 158, 22, 4, 0.4); rect(282, 148, 310, 156, hex('#a8782a')); rect(282, 148, 310, 149, hex('#e8c060')); rect(282, 155, 310, 156, hex('#6a4a1a')); rect(295, 108, 297, 148, hex('#c89a3a')); rect(295, 108, 295, 148, hex('#f0d080'));
    c_sombra(R, 262, 172, 12, 3, 0.4); rect(252, 152, 270, 170, hex('#f0ece0')); rect(252, 152, 255, 170, C.blanco); rect(266, 152, 270, 170, hex('#c8c4b8')); R.disco(261, 152, 9, hex('#d8d4c8')); R.disco(261, 152, 7, hex('#a8582a')); for (let y = 156; y < 166; y++) { pset(272, y, hex('#c8c4b8')); pset(273, y, hex('#c8c4b8')); }
    rect(230, 172, 246, 174, hex('#3a2010')); disco(224, 166, 8, hex('#b08a3a')); disco(224, 166, 6.5, hex('#a8c8d8')); pset(221, 163, C.blanco); pset(222, 163, C.blanco);
    for (const [x, y] of [[60, 168], [70, 172], [190, 174]]) { R.anillo(x, y, 2.5, hex('#c8ccd4')); pset(x + 2, y, hex('#c8ccd4')); }
  });
  // la ventana con la Luna (y lo de fuera), el parteluz
  c_nocheVentana(R, t, 208, 16, 266, 84, [240, 40, 12]);
  rect(236, 16, 237, 84, hex('#3a2010')); rect(208, 49, 266, 50, hex('#3a2010'));
  // la pantalla verde de la lámpara con su luz que respira sobre el cartapacio, y las motas
  const fl = 0.92 + 0.08 * Math.sin(t * 6) * Math.sin(t * 1.7);
  for (let y = 112; y < 180; y++) for (let x = 120; x < 320; x++) { const d = Math.hypot((x - 250) / 1.6, y - 140) / 50; if (d < 1 && h(x, y, 632) < (1 - d) * fl) c_tono(R, x, y, 0.13, hex('#fff0b0')); }
  R.poligono([[274, 92], [316, 92], [320, 108], [270, 108]], (x, y) => (y === 92 ? hex('#7ab87a') : x < 280 ? hex('#3a7a3a') : x > 308 ? hex('#1e4a22') : hex('#2e6a32'))); rect(270, 108, 319, 109, hex('#1e4a22')); for (let x = 276; x < 314; x += 6) linea(x, 94, x - 1, 106, hex('#4a8a4a'));
  for (let i = 0; i < 8; i++) { const u = (t * 0.06 + h(i, 1, 633)) % 1, x = Math.round(220 + h(i, 2, 633) * 70 + Math.sin(t * 0.8 + i) * 3), y = Math.round(112 + u * 50); c_tono(R, x, y, 0.5, hex('#fff6d0')); }
  // el vapor del té
  for (let i = 0; i < 3; i++) { const u = (t * 0.45 + i / 3) % 1; for (let k = 0; k < 5; k++) { const y = Math.round(146 - u * 34 - k * 2), x = Math.round(258 + i * 3 + Math.sin(u * 7 + k * 0.6 + i) * 3); if (y > 100 && h(x, y, 634) < 0.8 - u * 0.6) c_tono(R, x, y, 0.35 * (1 - u), C.blanco); } }
  // las carpetas en fila (escala 2), el sello y el micrófono de Atom
  const lista = o.carpetas ?? ['luna', 'gato', 'gallina', 'ojo', 'tanque', 'hielo'], n = lista.length, pos = [];
  for (let i = 0; i < n; i++) { const x = Math.round(n > 1 ? 70 + i * (174 / Math.max(1, n - 1)) : 160), yb = 150, it = typeof lista[i] === 'string' ? { dibujo: lista[i] } : lista[i];
    for (let k = 0; k < 19; k++) c_tono(R, x - 17 + k, yb + 1, 0.4, C.k); if (PIEZAS_DC.carpeta) PIEZAS_DC.carpeta(R, x, yb, { s: 2, ...it }); pos.push([x, yb]); }
  if (o.sello !== false && PIEZAS_DC.sello) { c_sombra(R, 160, 177, 12, 2, 0.4); PIEZAS_DC.sello(R, 160, 176, { s: 2 }); }
  if (o.microfono !== false && PIEZAS_DC.microfono) { c_sombra(R, 26, 168, 12, 3, 0.4); PIEZAS_DC.microfono(R, 26, 168, { s: 2, encendido: o.microfonoLuz !== false && Math.sin(t * 3) > -0.5 }); }
  return { carpetas: pos, sello: [160, 176], microfono: [26, 168], lampara: [295, 100], ventana: [208, 16, 266, 84], luna: [240, 40, 12], mesa: 96 };
}

// un tanque de goma suelto, para que la escena lo pinte donde quiera (lo levantan dos soldados, lo inflan): el de
// PIEZAS_DC.tanqueGoma, con sus colores, a la escala que se pida. (x, base): esquina izquierda y suelo; o.escala (2 por
// omisión: 76 × 40), o.inflado 0–1, o.dir 1 | -1 (hacia dónde apunta el cañón), o.alza (px que se levanta del suelo),
// o.noche 0–1 (lo oscurece como al decorado), o.sombra (largo de la sombra del atardecer hacia la derecha)
export function guerraTanque(R, x, base, t, o = {}) { return d_guTanque(R, x, base, t, { ...o, tn: o.tn ?? d_guTn(o.noche ?? 0) }); }

// tramado ordenado 4 × 4: el umbral (0–1) de cada píxel
const d_guBAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_guU = (x, y) => d_guBAYER[((y & 3) << 2) | (x & 3)];

const d_guLim = (u) => Math.max(0, Math.min(1, u));

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function d_guMez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el color de noche de un color del atardecer: azulado y oscuro
function d_guNoct(c) {
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, l = (r + g + b) / 3;
  return (0xff000000 | (Math.min(255, Math.round(b * 0.34 + l * 0.12 + 30)) << 16) | (Math.min(255, Math.round(g * 0.3 + l * 0.08 + 16)) << 8) | Math.min(255, Math.round(r * 0.22 + l * 0.08 + 12))) >>> 0;
}

// el tinte de noche (n 0–1) para lo que se pinta: guarda los colores ya calculados
function d_guTn(n) {
  if (n <= 0) return (c) => c;
  const cache = new Map();
  return (c) => { let v = cache.get(c); if (v === undefined) { v = n >= 1 ? d_guNoct(c) : d_guMez(c, d_guNoct(c), n); cache.set(c, v); } return v; };
}

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma; dibuja(marca)
// llama a marca() después del cielo, y la capa guarda la máscara del cielo (para las nubes, las estrellas y los pájaros)
const d_guCapas = new WeakMap();

function d_guCapa(R, clave, dibuja) {
  let mapa = d_guCapas.get(R); if (!mapa) d_guCapas.set(R, (mapa = new Map()));
  let c = mapa.get(clave);
  if (!c) {
    const b = R.nuevo(), prev = R.usar(b), m = new Uint8Array(57600); let foto = null;
    const info = dibuja(() => { foto = b.slice(); }) || {};
    if (foto) for (let i = 0; i < 57600; i++) m[i] = b[i] === foto[i] ? 1 : 0;
    R.usar(prev); c = { b, m, info }; mapa.set(clave, c);
  }
  return c;
}

// copia el fondo: el del atardecer (n 0), el de noche (n 1) o, entre medias, la mezcla de los dos (un recorrido)
function d_guFondo(R, clave, n, dibuja) {
  if (n <= 0.02 || n >= 0.98) { const k = n >= 0.98 ? 1 : 0, c = d_guCapa(R, clave + '|' + k, (marca) => dibuja(k, marca)); R.copiar(c.b); return c; }
  const a = d_guCapa(R, clave + '|0', (marca) => dibuja(0, marca)), b = d_guCapa(R, clave + '|1', (marca) => dibuja(1, marca)), B = R.buf;
  for (let i = 0; i < 57600; i++) B[i] = a.b[i] === b.b[i] ? a.b[i] : d_guMez(a.b[i], b.b[i], n);
  return n < 0.5 ? a : b;
}

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, '#color'], …]
function d_guDeg(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, tr = 3, cs = P.map(([, c]) => hex(c)), lim = P.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = cs[i], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = cs[i + 1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = cs[i - 1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = d_guU(x, y) < p ? b : a;
  }
}

// un píxel solo donde la máscara dice cielo
const d_guPsM = (B, m, x, y, c) => { x |= 0; y |= 0; if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) B[y * 320 + x] = c; };

function d_guDiscoM(B, m, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x]) B[f + x] = c; } }
}

// una nube de tres tonos solo en el cielo (c = [sombra, cuerpo, luz]); abajo: la luz le viene de abajo (el sol puesto)
function d_guNube(B, m, cx, cy, w, sem, c, ap = 1, abajo = false) {
  const n = 4 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 711)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 712) - 0.5) * w * 0.06 * ap, r]); }
  if (abajo) {
    for (const [x, y, r] of bolas) d_guDiscoM(B, m, x, y, r, c[0]);
    for (const [x, y, r] of bolas) d_guDiscoM(B, m, x - 1, y + r * 0.35, r * 0.75, c[1]);
    for (const [x, y, r] of bolas) d_guDiscoM(B, m, x - 2, y + r * 0.62, r * 0.45, c[2]);
    const y0 = Math.round(cy + w * 0.07 * ap); for (let x = Math.round(cx - w * 0.44); x <= Math.round(cx + w * 0.44); x++) { d_guPsM(B, m, x, y0, c[2]); if (Math.abs(x - cx) < w * 0.3) d_guPsM(B, m, x, y0 + 1, c[1]); }
  } else {
    for (const [x, y, r] of bolas) d_guDiscoM(B, m, x, y + 1, r, c[0]);
    for (const [x, y, r] of bolas) d_guDiscoM(B, m, x, y, r * 0.92, c[1]);
    for (const [x, y, r] of bolas) d_guDiscoM(B, m, x - 1, y - 2, r * 0.6, c[2]);
    const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.45); x <= Math.round(cx + w * 0.45); x++) { d_guPsM(B, m, x, y0, c[0]); d_guPsM(B, m, x, y0 + 1, c[0]); }
  }
}

// las nubes en tres alturas a distinta velocidad: lejos (junto al horizonte, pequeñas y lentas), en medio y arriba (las
// grandes, más deprisa); y unas hebras largas de estrato. hor: el horizonte; ap: aplastadas
function d_guNubes(R, t, m, hor, c, o = {}) {
  const B = R.buf, ab = !!o.abajo, v = o.v ?? 1;
  for (let k = 0; k < 4; k++) { const w = 70 + Math.round(h(k, 1, 720) * 50), y = Math.round(hor * (0.22 + k * 0.13)), x0 = ((h(k, 2, 720) * 460 + t * v * (0.5 + k * 0.25)) % 520) - 100;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = Math.sin(i / w * Math.PI); if (h(i >> 2, k, 721) < 0.25 || (x > 272 && y < 48)) continue; d_guPsM(B, m, x, y, e > 0.5 ? c[1] : c[0]); if (e > 0.7 && i % 3 === 0) d_guPsM(B, m, x + 1, y + (ab ? 1 : -1), c[2]); } }
  for (let k = 0; k < 4; k++) { const w = 14 + Math.round(h(k, 3, 722) * 10), y = hor - 12 - k * 4, x = ((h(k, 4, 722) * 420 + t * v * (0.9 + k * 0.2)) % 460) - 70; d_guNube(B, m, x, y, w, k + 30, c, 0.7, ab); }
  for (let k = 0; k < 3; k++) { const w = 38 + k * 10, y = Math.round(hor * (0.34 + k * 0.12)), x = ((h(k, 5, 722) * 470 + t * v * (2.6 + k * 0.9)) % 540) - 110; if (x > 250 && y < 50) continue; d_guNube(B, m, x, y, w, k + 40, c, 0.85, ab); }
}

// estrellas que titilan (solo en el cielo; nada en la esquina de Atom ni en la barra del año)
function d_guEstrellas(R, t, m, n, yMax, brillo = 1) {
  const B = R.buf, c0 = d_guMez(hex('#5a6290'), hex('#c8d0f0'), brillo), c1 = d_guMez(hex('#8890b8'), hex('#ffffff'), brillo);
  for (let k = 0; k < n; k++) { const x = Math.round(h(k, 1, 730) * 319), y = Math.round(h(k, 2, 730) ** 1.4 * yMax); if ((x > 270 && y < 50) || (y < 16 && x > 16 && x < 174)) continue;
    const tw = Math.sin(t * (1.2 + h(k, 3, 730) * 2.2) + k * 1.9); if (tw < -0.5) continue; d_guPsM(B, m, x, y, tw > 0.55 ? c1 : c0);
    if (k % 11 === 0 && tw > 0.85) { d_guPsM(B, m, x + 1, y, c0); d_guPsM(B, m, x - 1, y, c0); d_guPsM(B, m, x, y - 1, c0); d_guPsM(B, m, x, y + 1, c0); } }
}

// pájaros (o murciélagos) que cruzan aleteando: n, y (altura media), col; nada en la esquina de Atom
function d_guAves(R, t, n, y, col, o = {}) {
  const { pset } = R, mur = !!o.murcielago, v = o.v ?? 14;
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, 1, 740) * 400 + t * (v + k * 3)) % 440) - 60), yy = Math.round(y + h(k, 2, 740) * 22 + Math.sin(t * 0.9 + k * 2) * 4 + (mur ? Math.sin(t * 7 + k) * 2 : 0));
    if (x > 268 && yy < 50) continue; const a = Math.floor(t * (mur ? 14 : 8) + k * 1.3) % 3;
    pset(x, yy, col); pset(x - 1, yy - (a === 0 ? 1 : a === 1 ? 0 : -1), col); pset(x + 1, yy - (a === 0 ? 1 : a === 1 ? 0 : -1), col);
    if (a === 0) { pset(x - 2, yy - 2, col); pset(x + 2, yy - 2, col); } else if (a === 2) { pset(x - 2, yy + 1, col); pset(x + 2, yy + 1, col); } else { pset(x - 2, yy, col); pset(x + 2, yy, col); } }
}

// humo que sube y se deshace (bocanadas tramadas): de (x, y), deriva hacia la derecha
function d_guHumo(R, t, x, y, o = {}) {
  const { pset } = R, n = o.n ?? 7, alto = o.alto ?? 40, deriva = o.deriva ?? 22, c = o.c ?? hex('#9a8a9a'), c2 = o.c2 ?? hex('#b8a8b0');
  for (let k = 0; k < n; k++) { const u = ((t * (o.v ?? 0.18) + k / n) % 1), cx = x + u * deriva + Math.sin(t * 0.8 + k * 2.3) * 2 * u, cy = y - u * alto, r = 1.2 + u * (o.r ?? 5);
    for (let j = -Math.ceil(r); j <= Math.ceil(r); j++) for (let i = -Math.ceil(r); i <= Math.ceil(r); i++) { const d = Math.hypot(i, j) / r; if (d > 1) continue; const xx = Math.round(cx + i), yy = Math.round(cy + j);
      if (xx > 272 && yy < 48) continue; if (d_guU(xx, yy) < (1 - u) * (1 - d * 0.6) * 0.85) pset(xx, yy, j < 0 && i < 0 ? c2 : c); } }
}

// aclara (o tiñe) con un color c alrededor de (x, y), radio r, fuerza a: un halo tramado
function d_guHalo(R, x, y, r, c, a = 0.5) {
  const B = R.buf, x0 = Math.max(0, Math.round(x - r)), x1 = Math.min(319, Math.round(x + r)), y0 = Math.max(0, Math.round(y - r)), y1 = Math.min(179, Math.round(y + r));
  for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) { const d = Math.hypot(xx - x, yy - y) / r; if (d >= 1) continue; const k = (1 - d) * (1 - d) * a; if (k > 0.04) B[yy * 320 + xx] = d_guMez(B[yy * 320 + xx], c, k > 0.6 ? 0.6 : k); }
}

// una hoguera: lenguas de fuego que bailan, brasas y chispas que suben; (x, y): la base; s: tamaño
function d_guFuego(R, t, x, y, s = 1, o = {}) {
  const { pset, rect } = R, f = Math.floor(t * 12), C1 = hex('#fff0a0'), C2 = hex('#f8b030'), C3 = hex('#e0601e'), C4 = hex('#a8301a');
  d_guHalo(R, x, y - 3 * s, 20 * s, hex('#f89838'), 0.42 * (0.9 + 0.1 * Math.sin(t * 17)));
  // los leños cruzados y las brasas
  R.linea(x - 5 * s, y, x + 4 * s, y - 2, hex('#3a2418')); R.linea(x + 5 * s, y, x - 4 * s, y - 2, hex('#4a2c1a')); for (let i = -4 * s; i <= 4 * s; i += 2) pset(x + i, y - 1, (f + i) % 3 ? C4 : C2);
  for (let l = 0; l < 5; l++) { const lx = x + (l - 2) * 1.6 * s, al = (5 + 4 * h(l, f, 750) + (l === 2 ? 4 : 0)) * s;
    for (let j = 0; j < al; j++) { const u = j / al, w = Math.max(0, (1 - u) * 1.6 * s), sx = Math.sin(t * 9 + l * 2 + j * 0.5) * u * 1.5; for (let i = -Math.floor(w); i <= Math.floor(w); i++) pset(Math.round(lx + sx + i), y - 2 - j, u < 0.3 ? (Math.abs(i) < w * 0.5 ? C1 : C2) : u < 0.65 ? C2 : u < 0.85 ? C3 : C4); } }
  for (let k = 0; k < 5; k++) { const u = ((t * 0.7 + k / 5) % 1), sx = Math.round(x + Math.sin(t * 3 + k * 2.1) * 3 * s + (h(k, 1, 751) - 0.5) * 6 * s), sy = Math.round(y - 8 * s - u * 26 * s); if (u < 0.8) pset(sx, sy, u < 0.4 ? C2 : C3); }
}

// un soldadito de fondo (unos 10 px): casco, cara, guerrera, piernas que andan; o.dir, o.anda, o.tn (tinte), o.luz
// (color del lado que ilumina la hoguera), o.sentado, o.carga 'rollo' (un tanque de goma enrollado al hombro)
function d_guFigura(R, x, suelo, t, o = {}) {
  const { pset, rect } = R, tn = o.tn ?? ((c) => c), dir = o.dir ?? 1, cu = tn(hex(o.ropa ?? '#5a6236')), cs = tn(hex('#3a4026')), pi = tn(hex('#d8a07a')), ca = tn(hex('#4a5230')), bo = tn(hex('#2a2218'));
  const paso = o.anda ? Math.floor(t * 6 + x * 0.3) % 2 : 0, y = suelo;
  if (o.sentado) { rect(x - 2, y - 2, x + 2, y - 1, cs); pset(x + 2 * dir, y, bo); rect(x - 1, y - 6, x + 1, y - 3, cu); pset(x - dir, y - 5, cs); }
  else { pset(x - 1, y - 1, bo); pset(x + 1, y - 1, bo); pset(x - 1 + (paso ? dir : 0), y - 2, cs); pset(x + 1 - (paso ? dir : 0), y - 2, cs); pset(x - 1, y - 3, cs); pset(x + 1, y - 3, cs); rect(x - 1, y - 7, x + 1, y - 4, cu); pset(x - dir, y - 6, cs); pset(x + dir * 2, y - 5 - (o.anda ? paso : 0), cu); }
  const yh = o.sentado ? y - 6 : y - 7;
  pset(x, yh - 1, pi); pset(x + dir, yh - 1, pi); rect(x - 1, yh - 3, x + 1, yh - 2, ca); pset(x - 2, yh - 2, ca); pset(x + 2, yh - 2, ca); pset(x - dir, yh - 1, ca);
  if (o.luz) { pset(x + dir, yh - 2, o.luz); pset(x + dir, yh - 1, d_guMez(pi, o.luz, 0.5)); pset(x + dir, y - (o.sentado ? 5 : 6), o.luz); pset(x + dir, y - (o.sentado ? 4 : 5), o.luz); }
  if (o.carga === 'rollo') { const c1 = tn(hex('#6a6e44')), c2 = tn(hex('#4c5030')); rect(x - 5, yh - 2, x + 5, yh, c1); rect(x - 5, yh + 1, x + 5, yh + 1, c2); pset(x - 6, yh - 1, c2); pset(x + 6, yh - 1, c2); pset(x - 3, yh - 1, c2); pset(x + 2, yh - 1, c2); }
  if (o.linterna) { const lx = x + dir * 3, ly = y - 5; pset(lx, ly, hex('#f8f0b0')); for (let i = 1; i < 10; i++) for (let j = -Math.floor(i / 3); j <= Math.floor(i / 3); j++) if (d_guU(lx + i * dir, ly + j + i / 3) < 0.35 - i * 0.02) pset(lx + i * dir, ly + j + Math.round(i / 3), hex('#e8e0a8')); }
}

// un polígono relleno con su contorno
function d_guPoli(R, pts, c, borde) {
  R.poligono(pts, c);
  if (borde != null) for (let i = 0; i < pts.length; i++) { const [a, b] = pts[i], [p, q] = pts[(i + 1) % pts.length]; R.linea(a, b, p, q, borde); }
}

// ruido suave (0–1) en una rejilla de s px, interpolado: manchas orgánicas (bosques del mapa)
function d_guRuido(x, y, s, k) { const gx = x / s, gy = y / s, ix = Math.floor(gx), iy = Math.floor(gy), fx = gx - ix, fy = gy - iy, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy); return (h(ix, iy, k) * (1 - u) + h(ix + 1, iy, k) * u) * (1 - v) + (h(ix, iy + 1, k) * (1 - u) + h(ix + 1, iy + 1, k) * u) * v; }

// cifras de 3 × 5 (para la cuadrícula del mapa)
const d_guDIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function d_guCifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = d_guDIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// la estrella blanca de cinco puntas (la de los vehículos aliados), de 7 × 7, centrada en (x, y)
const d_guESTRELLA = ['...#...', '...#...', '#######', '.#####.', '..###..', '.##.##.', '##...##'];

function d_guEstrella(R, x, y, c) { d_guESTRELLA.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') R.pset(x - 3 + i, y - 3 + j, c); }); }

// EL TANQUE DE GOMA a cualquier escala (los colores de PIEZAS_DC.tanqueGoma): las cadenas con sus ruedas y su banda, el
// casco con las costuras, la válvula, la torreta con la escotilla, el cañón y el brillo de la goma. o.escala, o.inflado
// 0–1 (se aplasta, se ensancha, se arruga y el cañón se cae), o.dir, o.alza, o.tn, o.sombra (largo hacia la derecha).
// Devuelve la caja y la válvula: { x0, x1, y0, base, valvula: [x, y] }
function d_guTanque(R, x, base, t, o = {}) {
  const { pset, linea, disco } = R, s = o.escala ?? 2, f = d_guLim(o.inflado ?? 1), dir = o.dir ?? 1, tn = o.tn ?? ((c) => c), alza = Math.round(o.alza ?? 0);
  const fh = 0.3 + 0.7 * f, W = 38 * s * (1 + 0.12 * (1 - f)), x0 = x - (W - 38 * s) / 2, by = base - alza;
  const V = tn(hex('#6a6e44')), v = tn(hex('#4c5030')), l = tn(hex('#90946a')), g = tn(hex('#3e4228')), b = tn(hex('#bcc090')), k = tn(hex('#22261a'));
  const P = (u, w) => [dir > 0 ? x0 + u * W / 38 : x0 + W - u * W / 38, by - w * s * fh];
  // la sombra en el suelo (y la larga del atardecer)
  { const B = R.buf, cx = x0 + W / 2, rx = W / 2 + 3, ry = 1.5 * s, sl = o.sombra ?? 0, osc = hex('#1e2418');
    for (let yy = Math.round(base - ry); yy <= Math.round(base + ry + 1); yy++) for (let xx = Math.round(cx - rx); xx <= Math.round(cx + rx + sl); xx++) {
      if (xx < 0 || xx > 319 || yy < 0 || yy > 179) continue; const e = ((xx - cx) / rx) ** 2 + ((yy - base - 0.5) / ry) ** 2, larga = sl > 0 && xx > cx && xx < cx + rx + sl * (1 - Math.abs(yy - base) / (ry + 1)) && Math.abs(yy - base - 0.5) < ry * (alza ? 0.6 : 1);
      if (e < 1 || larga) B[yy * 320 + xx] = d_guMez(B[yy * 320 + xx], osc, alza ? 0.25 : 0.42); } }
  // las cadenas: la banda, las ruedas y los dientes
  d_guPoli(R, [P(2, 0), P(36, 0), P(37.6, 2.6), P(36.4, 7), P(1.6, 7), P(0.4, 2.6)], g, k);
  for (let i = 0; i < 6; i++) { const [cx, cy] = P(5 + i * 5.6, 3.1), r = Math.max(1, 2.1 * s * Math.min(1, fh + 0.2)); disco(cx, cy, r, v); disco(cx - 0.5, cy - 0.5, Math.max(0.6, r * 0.55), l); pset(Math.round(cx), Math.round(cy), k); }
  for (let u = 2; u < 36; u += 1.6) { const [cx, cy] = P(u, 0); pset(Math.round(cx), Math.round(cy), v); }
  { const [a, c1] = P(1.6, 7), [p] = P(36.4, 7); linea(a, c1, p, c1, l); }
  // el casco con su luz de arriba, la sombra de abajo, las costuras y la válvula
  d_guPoli(R, [P(3, 7), P(35, 7), P(33, 12.4), P(6, 12.4)], V, k);
  { const [a, y1] = P(6.4, 12), [p] = P(32.6, 12); linea(a, y1, p, y1, l); const [a2, y2] = P(4, 7.6), [p2] = P(34, 7.6); linea(a2, y2, p2, y2, v); }
  for (const u of [12, 20, 28]) { const [sx, sy0] = P(u, 7.8), [, sy1] = P(u + 0.5, 11.6); for (let yy = Math.round(sy1); yy <= Math.round(sy0); yy += 2) pset(Math.round(sx), yy, v); }
  const valv = P(8, 9.6); pset(Math.round(valv[0]), Math.round(valv[1]), k); pset(Math.round(valv[0]) - dir, Math.round(valv[1]), k); pset(Math.round(valv[0]), Math.round(valv[1]) - 1, b);
  { const [a, y1] = P(9, 11), [p] = P(15, 11); linea(a, y1, p, y1, b); }
  // la torreta, la escotilla y el brillo de la goma
  d_guPoli(R, [P(12, 12.2), P(25, 12.2), P(24.4, 16.6), P(20, 18.4), P(14.4, 18), P(12.4, 15.4)], V, k);
  { const [a, y1] = P(13.6, 16.8), [p] = P(19.6, 17.6); linea(a, y1, p, y1, l); const [cx, cy] = P(17.5, 18.8); disco(cx, cy, Math.max(0.8, 1.6 * s * fh * 0.6), v); pset(Math.round(cx), Math.round(cy) - 1, l);
    const [bx, byy] = P(15.2, 15.6); pset(Math.round(bx), Math.round(byy), b); pset(Math.round(bx) + dir, Math.round(byy), b); if (s >= 2) pset(Math.round(bx), Math.round(byy) + 1, b); }
  // el cañón: inflado, recto; desinflado, se cae (y se mece un poco con el aire)
  { const [cx, cy] = P(24.6, 15.2), a = -(1 - f) * 0.75 + Math.sin(t * 1.4 + x) * 0.025, L = 14 * s * (0.75 + 0.25 * f), dx = Math.cos(a) * L * dir, dy = -Math.sin(a) * L, g2 = Math.max(2, Math.round(1.4 * s * (0.6 + 0.4 * f)));
    for (let j = -1; j <= g2; j++) linea(cx, cy + j, cx + dx, cy + dy + j, j === -1 || j === g2 ? k : j === 0 ? l : j === g2 - 1 ? v : V);
    const ex = Math.round(cx + dx), ey = Math.round(cy + dy); for (let j = -1; j <= g2; j++) { pset(ex, ey + j, k); pset(ex + dir, ey + j, k); } }
  // las arrugas de la goma floja
  if (f < 0.95) { const n = Math.round((1 - f) * 12); for (let i = 0; i < n; i++) { const [ax, ay] = P(5 + h(i, 1, 760) * 28, 8 + h(i, 2, 760) * 4 + (i % 3 === 0 ? 6 : 0)); linea(ax, ay, ax + (2 + s) * dir, ay + 1, v); pset(Math.round(ax) + dir, Math.round(ay) - 1, l); } }
  const [vx, vy] = valv, [ax0] = P(0, 0), [ax1] = P(38, 0), [, ty] = P(17, 20);
  return { x0: Math.round(Math.min(ax0, ax1)), x1: Math.round(Math.max(ax0, ax1)), y0: Math.round(ty), base, valvula: [Math.round(vx), Math.round(vy)] };
}

function d_guCampoFijo(R, n, marca) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, tn = d_guTn(n), X = (s) => tn(hex(s));
  // el cielo: violeta arriba, naranja y oro junto al horizonte (de noche, azul marino)
  d_guDeg(R, 0, 100, n ? [[0, '#0a0e26'], [0.35, '#121a3c'], [0.7, '#1e2650'], [1, '#2e3462']] : [[0, '#2a2858'], [0.22, '#463870'], [0.42, '#844a7a'], [0.6, '#c85e6c'], [0.76, '#ec8a58'], [0.9, '#f8b464'], [1, '#fcd88c']]);
  if (!n) {   // el sol que se pone entre las colinas, con su halo
    for (let y = 40; y < 100; y++) for (let x = 0; x < 140; x++) { const d = Math.hypot(x - 62, (y - 88) * 1.25); if (d < 8.5) B[y * 320 + x] = d < 6 ? hex('#fff8d8') : hex('#ffe490'); else if (d < 52 && d_guU(x, y) < ((1 - d / 52) ** 1.6) * 0.8) B[y * 320 + x] = d_guMez(B[y * 320 + x], hex('#ffe8a8'), 0.45); }
  } else {   // la luna con sus mares y su halo
    for (let y = 8; y < 46; y++) for (let x = 206; x < 248; x++) { const d = Math.hypot(x - 226, y - 26); if (d < 7.5) B[y * 320 + x] = h(x >> 1, y >> 1, 770) < 0.25 || Math.hypot(x - 224, y - 24) < 2.2 ? hex('#c8c4ac') : hex('#ece8d4'); else if (d < 20 && d_guU(x, y) < (1 - d / 20) * 0.5) B[y * 320 + x] = d_guMez(B[y * 320 + x], hex('#6a76a8'), 0.5); }
  }
  marca();
  // las colinas lejanas con sus setos y el pueblo con el campanario
  const yA = (x) => Math.round(84 + 3 * Math.sin(x * 0.021 + 1.3) + 2 * Math.sin(x * 0.057 + 0.4)), haz = X('#7a5a86'), hazS = X('#5e4a72'), rim = X('#d08a84');
  for (let x = 0; x < 320; x++) { const y0 = yA(x); for (let y = y0; y < 104; y++) { let c = y === y0 ? rim : haz; const r = (y - y0) % 5; if ((r === 2 && h(x >> 1, y, 21) > 0.25) || (r === 1 && h(x >> 2, y, 22) > 0.6)) c = hazS; B[y * 320 + x] = c; } }
  { const pu = X('#5a466e'), puL = X('#9a6a80');
    for (const [hx, hw, ha] of [[132, 8, 5], [141, 6, 4], [156, 9, 5], [166, 6, 3]]) { rect(hx, yA(hx) - ha, hx + hw, yA(hx) + 2, pu); poligono([[hx - 1, yA(hx) - ha], [hx + hw / 2, yA(hx) - ha - 3], [hx + hw + 1, yA(hx) - ha]], pu); pset(hx, yA(hx) - ha, puL); }
    rect(149, 70, 152, 84, pu); poligono([[148, 70], [150.5, 61], [153, 70]], pu); pset(149, 70, puL); pset(150, 66, puL); pset(150, 74, X('#3a2c4a')); }
  // los campos en franjas con sus setos y sus árboles (la luz rasante en el filo)
  const yB = (x) => Math.round(93 + 2.5 * Math.sin(x * 0.033 + 2.1) + 1.5 * Math.sin(x * 0.09)), CAMP = ['#b8964a', '#6e7c3c', '#5a6a34', '#9a8048', '#7a8a44'].map(X), seto = X('#34422a'), setoL = X('#c8a060'), trigoL = X('#d0ae62');
  for (let x = 0; x < 320; x++) { const y0 = yB(x); for (let y = y0; y < 120; y++) { const band = Math.floor((y - 93) / 6), q = x + (y - 93) * 1.8 + band * 37, fid = Math.floor(q / 52); let c = CAMP[Math.floor(h(fid, band, 23) * 5)];
      if (c === CAMP[0] && (x + y) % 3 === 0) c = trigoL; if ((y - y0) % 6 === 0 || (q % 52) < 1.2) c = seto; else if ((y - y0) % 6 === 5 && h(x >> 2, band, 24) > 0.5) c = seto; else if ((y - y0) % 6 === 4 && h(x >> 2, band, 24) > 0.75) c = n ? seto : setoL; B[y * 320 + x] = c; } }
  // la fila de chopos (la luz por la izquierda)
  { const cL = X('#a88c4a'), cB = X('#3a4a2c'), cM = X('#4a5a34'), cS = X('#26301c');
    for (let i = 0; i < 8; i++) { const px = 184 + i * 11 + Math.round(h(i, 1, 25) * 4), base = yB(px) + 2, alto = 20 + Math.round(h(i, 2, 25) * 10);
      rect(px, base - 3, px, base, X('#3a2c20'));
      for (let j = 0; j < alto; j++) { const w = 3.4 * Math.sin(Math.PI * (j + 1) / (alto + 2)) ** 0.7, y = base - 3 - j; for (let xx = Math.round(px - w); xx <= Math.round(px + w); xx++) pset(xx, y, xx <= px - w + 1.2 ? cL : xx >= px + w - 1 ? cS : h(xx, y, 26) < 0.3 ? cM : cB); } } }
  // el roble detrás del almiar
  { const cx = 120, cy = 94, cS = X('#2a3820'), cB = X('#3e522c'), cM = X('#566a34'), cL = X('#b8a050');
    rect(118, 100, 122, 118, X('#4a3a2a')); pset(119, 104, X('#6a5440'));
    for (const [dx, dy, r] of [[0, 0, 13], [-9, 4, 8], [9, 3, 9], [-4, -8, 8], [6, -7, 7]]) disco(cx + dx, cy + dy, r, cS);
    for (const [dx, dy, r] of [[-1, -1, 11], [-9, 3, 6], [8, 2, 7], [-4, -9, 6], [5, -8, 5]]) disco(cx + dx, cy + dy, r, cB);
    for (const [dx, dy, r] of [[-5, -5, 5], [-11, 1, 3], [2, -11, 3], [-7, -12, 2]]) disco(cx + dx, cy + dy, r, cM);
    for (let k = 0; k < 40; k++) { const a = h(k, 1, 27) * Math.PI * 2, d = h(k, 2, 27) * 14, xx = Math.round(cx + Math.cos(a) * d), yy = Math.round(cy + Math.sin(a) * d * 0.9); if (R.pget(xx, yy) !== B[0]) pset(xx, yy, xx < cx - 3 && yy < cy ? (n ? cM : cL) : k % 2 ? cS : cM); } }
  // el prado: franjas de siega en perspectiva, hierba con textura y briznas cerca
  const G0 = X('#6a8a3a'), G1 = X('#5e7e34'), GS = X('#46682c'), GL = X('#90a448'), GT = X('#c8b058'), GD = X('#36561f');
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const s = Math.floor((x - 160) / (y - 70) * 3) & 1; let c = s ? G1 : G0; const q = h(x, y >> 1, 41);
    if (q < 0.1) c = GS; else if (q > 0.94) c = GL; if (y > 132) { const b = h(x, (y / 3) | 0, 42); if (b < 0.13) c = (y % 3 === 0) ? GT : GD; else if (b > 0.9 && y % 3 === 1) c = GL; } B[y * 320 + x] = c; }
  // las rodadas del camión, que cruzan el prado
  { const ro = X('#5a4a30'), roL = X('#8a7448'), roS = X('#3e3220');
    for (let x = 90; x < 320; x++) { const y1 = Math.round(146 + (x - 90) * 0.1 + 3 * Math.sin((x - 90) * 0.02)); for (const [yy, g] of [[y1, 2], [y1 + 8, 3]]) { for (let j = 0; j < g; j++) pset(x, yy + j, j === 0 ? roS : (x >> 1) % 3 === 0 ? roL : ro); if ((x % 4) === 0) pset(x, yy - 1, GD); } } }
  // amapolas y margaritas
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 43) * 319), y = Math.round(116 + h(k, 2, 43) ** 0.8 * 62), r = h(k, 3, 43) < 0.6, c = r ? X('#d0342a') : X('#ece4cc'); pset(x, y, c); if (y > 150) { pset(x + 1, y, c); pset(x, y + 1, r ? X('#2a1c18') : X('#e8c040')); pset(x, y + 2, GD); } }
  // la sombra larga del camión y de los tanques lejanos (el sol, a la izquierda)
  const osc = X('#2a361e'), sombra = (pts) => poligono(pts, (x, y) => d_guMez(B[y * 320 + x], osc, 0.45));
  sombra([[8, 143], [92, 143], [178, 150], [74, 150]]);
  // la granja de piedra: tejado de pizarra, chimeneas, muros con sillares, ventanas encendidas con contraventanas, la puerta
  { const P0 = X('#b8a488'), P1 = X('#a89478'), P2 = X('#c4b094'), PJ = X('#6e5e4c'), PL = X('#d8bc98'), PH = X('#8a7a62');
    for (let y = 86; y < 117; y++) for (let x = 12; x < 73; x++) { const row = Math.floor((y - 86) / 4), off = (row * 5) % 9, bx = Math.floor((x + off) / 8), mort = (y - 86) % 4 === 3 || (x + off) % 8 === 0;
      let c = mort ? PJ : [P0, P1, P2][Math.floor(h(bx, row, 31) * 3)]; if (!mort && x < 16 && !n) c = PL; if (!mort && y > 111) c = PH; B[y * 320 + x] = c; }
    rect(12, 86, 12, 116, X('#5a4a3a')); rect(72, 86, 72, 116, X('#5a4a3a'));
    const T0 = X('#4a4a5a'), T1 = X('#545466'), T2 = X('#3e3e4e'), TJ = X('#2e2e3a');
    for (let y = 70; y < 87; y++) { const xl = Math.round(18 - (y - 70) * 10 / 16), xr = Math.round(66 + (y - 70) * 10 / 16), row = Math.floor((y - 70) / 3);
      for (let x = xl; x <= xr; x++) B[y * 320 + x] = (y - 70) % 3 === 2 ? TJ : [T0, T1, T2][Math.floor(h(Math.floor((x + (row % 2) * 3) / 6), row, 32) * 3)]; }
    rect(18, 70, 66, 70, n ? X('#3a3a4a') : X('#b07a6a')); rect(8, 86, 76, 87, TJ);
    for (const [cx0, cy0] of [[22, 60], [58, 63]]) { rect(cx0, cy0, cx0 + 5, 72, P1); rect(cx0, cy0, cx0, 72, PL); rect(cx0 + 5, cy0, cx0 + 5, 72, PH); for (let y = cy0 + 2; y < 72; y += 3) rect(cx0, y, cx0 + 5, y, PJ); rect(cx0 - 1, cy0 - 1, cx0 + 6, cy0, TJ); }
    rect(39, 74, 46, 81, TJ); rect(40, 75, 45, 80, hex('#e8a848')); rect(42, 75, 43, 80, TJ); poligono([[38, 74], [42.5, 70], [47, 74]], T1);
    for (const wx of [20, 52]) { rect(wx - 4, 93, wx + 11, 103, PJ); rect(wx - 3, 94, wx - 1, 102, X('#5a6a7a')); rect(wx + 8, 94, wx + 10, 102, X('#5a6a7a')); for (let y = 95; y < 102; y += 2) { pset(wx - 2, y, X('#3e4a58')); pset(wx + 9, y, X('#3e4a58')); }
      rect(wx, 94, wx + 7, 102, hex('#2a1c14')); rect(wx + 1, 95, wx + 6, 101, hex('#f0b450')); rect(wx + 1, 99, wx + 6, 101, hex('#f8d27c')); rect(wx + 3, 95, wx + 4, 101, hex('#5a3a20')); rect(wx + 1, 98, wx + 6, 98, hex('#5a3a20')); pset(wx + 1, 95, hex('#fff0b8'));
      for (let y = 103; y < 112; y++) for (let x = wx - 2; x < wx + 10; x++) if (d_guU(x, y) < (1 - (y - 103) / 9) * 0.5) B[y * 320 + x] = d_guMez(B[y * 320 + x], hex('#f0b050'), 0.35); }
    rect(35, 99, 45, 116, PJ); rect(36, 100, 44, 116, X('#4a3020')); for (let x = 37; x < 44; x += 2) rect(x, 100, x, 116, X('#6a4a2a')); rect(36, 106, 44, 106, X('#3a2418')); pset(42, 108, X('#d8b048')); rect(33, 115, 47, 116, PH);
    // el pajar de tablas con el tejado de teja vieja y el heno dentro
    for (let y = 92; y < 117; y++) for (let x = 73; x < 106; x++) B[y * 320 + x] = (x % 4 === 0) ? X('#3e2c1c') : h(x >> 2, y >> 3, 33) < 0.5 ? X('#7a5a38') : X('#6a4c30');
    rect(81, 100, 95, 116, X('#2a2018')); for (let x = 82; x < 95; x++) { const hh = 4 + Math.round(h(x, 1, 34) * 4); rect(x, 116 - hh, x, 116, h(x, 2, 34) < 0.5 ? X('#c8a858') : X('#a88a40')); } rect(80, 100, 80, 116, X('#4a3420')); rect(96, 100, 96, 116, X('#4a3420'));
    d_guPoli(R, [[70, 87], [108, 95], [108, 98], [70, 91]], X('#7a4a3a'), X('#4a2a20')); for (let x = 72; x < 108; x += 3) linea(x, 88 + (x - 70) * 8 / 38, x, 91 + (x - 70) * 7 / 38, X('#5a3428'));
    // el almiar
    for (let y = 104; y < 118; y++) for (let x = 100; x < 124; x++) { const d = ((x - 112) / 11) ** 2 + ((y - 117) / 12) ** 2; if (d < 1) B[y * 320 + x] = x < 106 && !n ? X('#f0d888') : (x + (y >> 1)) % 4 === 0 ? X('#a88840') : h(x, y, 35) < 0.3 ? X('#c8a850') : X('#d8b860'); } }
  // la tienda de lona del medio, con los vientos y las estacas
  { const L0 = X('#a89a70'), LL = X('#c8b888'), LS = X('#7a6e50'), LK = X('#4a4232');
    linea(126, 125, 134, 106, LK); linea(178, 125, 170, 106, LK); pset(126, 125, LK); pset(178, 125, LK);
    rect(136, 106, 168, 123, L0); rect(136, 106, 138, 123, LL); rect(160, 106, 168, 123, LS); for (const sx of [144, 152, 160]) rect(sx, 107, sx, 123, LS);
    d_guPoli(R, [[133, 107], [171, 107], [163, 95], [141, 95]], LL, LK); rect(142, 96, 162, 96, X('#e0d0a0')); for (let y = 99; y < 107; y += 3) linea(136 + (107 - y) * 0.7, y, 168 - (107 - y) * 0.7, y, L0);
    rect(147, 108, 157, 123, X('#3a2a18')); poligono([[147, 108], [152, 108], [147, 118]], LS); poligono([[157, 108], [152, 108], [157, 118]], LS); rect(136, 123, 168, 123, LK); }
  // los dos tanques de goma lejanos (uno con su red de camuflaje) y su sombra
  sombra([[188, 125], [232, 125], [262, 128], [214, 128]]);
  d_guTanque(R, 190, 126, 0, { escala: 1, tn });
  d_guTanque(R, 236, 127, 0, { escala: 1, tn });
  { const red = X('#3e4a2c'), hoja = X('#6a7a3a'); for (let y = 108; y < 127; y++) for (let x = 234; x < 276; x++) { const p = R.pget(x, y); if (p === B[0]) continue; const d = ((x - 255) / 21) ** 2 + ((y - 127) / 19) ** 2; if (d < 1 && ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0)) pset(x, y, red); if (d < 1 && h(x, y, 36) < 0.08) pset(x, y, hoja); } }
  // el camión con el altavoz: caja con tablas, cabina, morro con rejilla, ruedas; la estrella en la puerta; las bocinas
  { const O = X('#5a6236'), OL = X('#7a8448'), OS = X('#40482a'), K = X('#1e2214');
    rect(6, 133, 92, 137, K);
    rect(8, 120, 58, 134, O); for (let y = 123; y < 134; y += 4) rect(9, y, 57, y, OS); rect(8, 120, 58, 120, OL); rect(8, 120, 8, 134, K); rect(58, 120, 58, 134, K); for (let x = 12; x < 58; x += 9) { pset(x, 122, OL); pset(x, 131, OS); }
    rect(58, 106, 77, 134, K); rect(59, 107, 76, 133, O); rect(59, 107, 76, 107, OL); rect(62, 109, 75, 118, K); rect(63, 110, 74, 117, n ? X('#2a3050') : hex('#e89a68')); for (let i = 0; i < 4; i++) pset(64 + i, 111 + i, n ? X('#5a6488') : hex('#f8d0a0')); rect(68, 110, 68, 117, K);
    rect(60, 120, 60, 132, OS); d_guEstrella(R, 68, 126, X('#e8e4d4')); rect(56, 103, 78, 106, X('#4a4a2e')); rect(57, 103, 77, 103, OL);
    rect(76, 118, 92, 134, K); rect(77, 119, 91, 133, O); rect(77, 119, 91, 119, OL); for (let x = 88; x < 92; x++) if (x % 2 === 0) rect(x, 121, x, 131, OS); disco(86, 122, 2, K); pset(85, 121, X('#c8c8a0'));
    for (const [wx, ww] of [[20, 7], [36, 7], [80, 7]]) { disco(wx, 137, ww, K); disco(wx, 137, ww - 2, X('#2a2c20')); disco(wx, 137, 3, OS); disco(wx - 0.5, 136.5, 2, OL); pset(wx, 137, K); for (let a = 0; a < 8; a++) pset(Math.round(wx + Math.cos(a * 0.785) * (ww - 1)), Math.round(137 + Math.sin(a * 0.785) * (ww - 1)), X('#3a3c2c')); }
    linea(70, 128, 92, 128, OS);
    // el armazón y el altavoz de cuatro bocinas
    for (const px of [16, 50]) rect(px, 104, px + 1, 120, K); rect(12, 90, 54, 121, K); rect(13, 91, 53, 120, X('#3e4428')); rect(13, 91, 53, 91, OL); rect(13, 91, 13, 120, OL);
    for (let y = 93; y < 120; y += 2) pset(52, y, OS);
    for (const [cx, cy] of [[23, 99], [43, 99], [23, 113], [43, 113]]) { disco(cx, cy, 8, K); disco(cx, cy, 7, X('#4a5032')); disco(cx, cy, 5, X('#2e3220')); disco(cx - 1, cy - 1, 4, X('#5a6038')); }
    rect(54, 96, 58, 98, K); linea(56, 98, 62, 106, K); }
  return {};
}

function d_guCampo(R, t, o) {
  const n = d_guLim(o.noche ?? 0), tn = d_guTn(n), X = (s) => tn(hex(s)), { pset, disco, linea, rect } = R, suelo = 152;
  const capa = d_guFondo(R, 'campo44', n, (nn, marca) => d_guCampoFijo(R, nn, marca)), m = capa.m;
  d_guEstrellas(R, t, m, Math.round(14 + 70 * n), n > 0.5 ? 80 : 36, 0.25 + 0.75 * n);
  d_guNubes(R, t, m, 96, (n < 0.5 ? ['#5a3a6c', '#c86274', '#ffc080'] : ['#2a3058', '#3e4878', '#8a96c0']).map((c) => tn(hex(c))), { abajo: n < 0.5, v: 1.2 });
  d_guAves(R, t, n > 0.5 ? 4 : 5, n > 0.5 ? 40 : 34, n > 0.5 ? hex('#141826') : hex('#2a1e2a'), { murcielago: n > 0.5, v: n > 0.5 ? 18 : 12 });
  // el humo de la chimenea y la luz de la tienda que tiembla
  d_guHumo(R, t, 24, 58, { c: X('#8a7a8e'), c2: X('#b8a0a8'), alto: 46, deriva: 30 });
  { const fl = 0.75 + 0.25 * Math.sin(t * 13) * Math.sin(t * 5.3); rect(149, 112, 155, 123, d_guMez(hex('#7a4a20'), hex('#f0b050'), fl)); rect(150, 115, 154, 123, d_guMez(hex('#a86a28'), hex('#f8d070'), fl));
    if (Math.floor(t * 0.5) % 3 === 1) { rect(151, 114, 153, 123, hex('#4a2c14')); pset(152, 113, hex('#4a2c14')); } }
  // la antena de la tienda, que se mece con el aire
  { const sw = Math.sin(t * 1.6) * 2.2, tx = 178 + sw, ty = 60; linea(178, 124, tx, ty, X('#2e2e24')); linea(179, 124, tx + 1, ty + 18, X('#4a4a3a')); linea(tx, ty + 6, 160, 95, X('#3a3a2e'), 3); pset(Math.round(tx), ty - 1, X('#c83a2a')); linea(tx - 3, ty + 4, tx + 3, ty + 4, X('#2e2e24')); }
  // el altavoz: las membranas vibran y las ondas suben
  const alt = d_guLim(o.altavoz ?? 1);
  for (const [k, [cx, cy]] of [[23, 99], [43, 99], [23, 113], [43, 113]].entries()) { const vb = alt > 0 && Math.sin(t * 47 + k * 1.7) > 0 ? 1 : 0; disco(cx - 1 + vb * 0.5, cy - 1, 3, X('#6a7040')); disco(cx + vb * 0.5, cy, 1.5, X('#8a9058')); pset(cx - 2, cy - 2, X('#a8ac78')); }
  if (alt > 0) for (let w = 0; w < 4; w++) { const u = (t * 0.9 + w / 4) % 1, r = 16 + u * 64, cl = X('#f8e8c0');
    for (let a = -1.45; a < -0.15; a += 0.7 / r) { const x = Math.round(33 + Math.cos(a) * r * 1.15), y = Math.round(104 + Math.sin(a) * r); if (x > 268 && y < 50) continue; if (d_guU(x, y) < (1 - u) * 1.1 * alt) { pset(x, y, cl); if (u < 0.45) pset(x, y + 1, cl); } } }
  // el soldadito que pasa con un tanque enrollado al hombro, y el que vigila junto a la tienda
  { const u = (t % 22) / 22, x = Math.round(300 - u * 140); d_guFigura(R, x, 129, t, { anda: true, dir: -1, tn, carga: 'rollo' }); }
  d_guFigura(R, 132, 124, t, { tn, dir: 1 });
  // mosquitos dorados al atardecer, luciérnagas de noche
  for (let k = 0; k < 14; k++) { const x = Math.round(100 + h(k, 1, 780) * 200 + Math.sin(t * 1.3 + k) * 6), y = Math.round(118 + h(k, 2, 780) * 30 + Math.cos(t * 1.7 + k * 2) * 4);
    if (n > 0.5) { if (Math.sin(t * 2.2 + k * 1.9) > 0.3) { pset(x, y, hex('#e8f070')); if (Math.sin(t * 2.2 + k * 1.9) > 0.8) d_guHalo(R, x, y, 3, hex('#c8e060'), 0.4); } } else if ((k + Math.floor(t * 6)) % 3) pset(x, y, hex('#f8d890')); }
  // el tanque de goma grande, el fuelle y la manguera
  let tq = null;
  if (o.tanque !== false) tq = d_guTanque(R, 192, 158, t, { escala: 2.4, inflado: o.inflado ?? 1, tn, sombra: n < 0.5 ? 26 : 0 });
  if (o.bomba != null && o.bomba !== false) { const bx = o.bombaX ?? 180, p = o.bomba === true ? 0.5 + 0.5 * Math.sin(t * 6) : d_guLim(o.bomba), by = 156, al = Math.round(3 + 4 * (1 - p)), K = X('#22261a');
    rect(bx - 5, by - 1, bx + 5, by, K); rect(bx - 4, by - 1, bx + 4, by - 1, X('#5a5a50'));
    for (let j = 0; j < al; j++) rect(bx - 4 + (j % 2), by - 2 - j, bx + 3 - (j % 2), by - 2 - j, j % 2 ? X('#3a3a30') : X('#6a6a5a')); rect(bx - 5, by - 2 - al, bx + 4, by - 2 - al, X('#7a5a3a')); pset(bx + 4, by - 2 - al, K);
    const [vx, vy] = tq ? tq.valvula : [211, 135]; for (let i = 0; i <= 20; i++) { const u = i / 20, x = (1 - u) ** 2 * (bx + 5) + 2 * u * (1 - u) * ((bx + vx) / 2) + u * u * vx, y = (1 - u) ** 2 * (by - 1) + 2 * u * (1 - u) * (by + 4) + u * u * vy; pset(Math.round(x), Math.round(y), K); } }
  // la hierba alta del primer plano, que se mece
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 790) * 320), yb = Math.round(162 + h(k, 2, 790) * 16), sw = Math.sin(t * 2.1 + k * 0.9) * 1.6;
    for (let i = 0; i < 4; i++) { const al = 4 + ((i * 3 + k) % 4); linea(x + i - 1, yb, x + i - 1 + sw * (al / 7), yb - al, i % 2 ? X('#46682c') : X('#36561f')); pset(Math.round(x + i - 1 + sw * (al / 7)), yb - al, X('#b8b050')); } }
  return { suelo, tanque: tq ?? { x0: 192, x1: 283, y0: 110, base: 158, valvula: [211, 135] }, camion: [6, 90, 92, 144], altavoz: [33, 104], tienda: [134, 95, 172, 123], granja: [12, 70, 108, 117], libre: [94, 188], bomba: [o.bombaX ?? 180, 156] };
}

function d_guCampoDelante(R, t, o) {
  const n = d_guLim(o.noche ?? 0), tn = d_guTn(n), X = (s) => tn(hex(s)), { rect, pset, disco, linea } = R;
  // el seto de la izquierda: matas de tres tonos con el canto encendido por el sol y hojas que se mueven
  const S = X('#24341c'), B0 = X('#34482a'), M = X('#4a6234'), L = n > 0.5 ? X('#5a7040') : X('#c8a050');
  for (const [cx, cy, r] of [[6, 168, 16], [24, 164, 13], [42, 170, 12], [58, 176, 9], [-4, 152, 10]]) disco(cx, cy, r, S);
  for (const [cx, cy, r] of [[5, 166, 13], [23, 163, 10], [41, 169, 9], [57, 175, 6], [-5, 151, 8]]) disco(cx, cy, r, B0);
  for (let k = 0; k < 70; k++) { const a = h(k, 1, 800) * Math.PI * 2, d = h(k, 2, 800), cx = [5, 23, 41, -5][k % 4], cy = [166, 163, 169, 151][k % 4], rr = [13, 10, 9, 8][k % 4], sw = Math.round(Math.sin(t * 2 + k) * 0.7);
    const x = Math.round(cx + Math.cos(a) * d * rr) + sw, y = Math.round(cy + Math.sin(a) * d * rr); const top = Math.sin(a) < -0.3 && d > 0.6; pset(x, y, top && Math.cos(a) < 0.3 ? L : k % 3 ? M : S); if (top) pset(x + 1, y, M); }
  for (let k = 0; k < 5; k++) { const x = Math.round(8 + k * 11 + Math.sin(t * 1.5 + k) * 1), y = 150 + (k % 3) * 3; pset(x, y, X('#d0342a')); pset(x, y + 1, S); }
  // las cajas de madera apiladas y el bidón, a la derecha
  const W0 = X('#8a6a40'), WL = X('#b08a54'), WS = X('#5a4428'), K = X('#2a1e12');
  for (const [x0, y0, x1, y1] of [[286, 160, 319, 180], [292, 142, 319, 160]]) { rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1, y1, W0); for (let y = y0 + 4; y < y1; y += 5) rect(x0 + 1, y, x1, y, WS); rect(x0 + 1, y0 + 1, x1, y0 + 1, WL); rect(x0 + 1, y0 + 1, x0 + 2, y1, WS); linea(x0 + 2, y0 + 2, x1 - 1, y1 - 1, WS); for (let y = y0 + 2; y < y1; y += 5) pset(x0 + 4, y + 1, X('#3a2a1a')); }
  d_guEstrella(R, 304, 170, X('#e0dcc8')); rect(296, 150, 314, 151, X('#e0dcc8')); rect(296, 153, 308, 153, X('#e0dcc8'));
  { const bx = 274, O = X('#5a6236'); rect(bx, 158, bx + 10, 180, K); rect(bx + 1, 159, bx + 9, 180, O); rect(bx + 1, 159, bx + 2, 180, X('#7a8448')); linea(bx + 2, 162, bx + 8, 172, X('#40482a')); linea(bx + 8, 162, bx + 2, 172, X('#40482a')); rect(bx + 3, 155, bx + 6, 158, K); rect(bx + 4, 156, bx + 5, 157, X('#7a8448')); }
  return {};
}

function d_guTiendaFijo(R, marca) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, LX = 160, LY = 40;
  // la puerta abierta a la noche (lo de fuera va recortado al hueco)
  d_guDeg(R, 0, 180, [[0, '#0c1028'], [0.5, '#182044'], [1, '#22285a']]);
  marca();
  // la lona: el fondo, la cumbrera, los lados en perspectiva; luz del farol que cae con la distancia
  const luz = (x, y) => { const d = Math.hypot(x - LX, (y - LY) * 0.9); return Math.max(0, 1 - d / 190); };
  const L0 = [0x30, 0x2a, 0x1c], L1 = [0xe8, 0xc4, 0x84], tono = (x, y, k = 1) => { const a = luz(x, y) ** 1.2 * k, p = d_guU(x, y) * 0.12; const c = (i) => Math.round(L0[i] + (L1[i] - L0[i]) * Math.min(1, a + p)); return (0xff000000 | (c(2) << 16) | (c(1) << 8) | c(0)) >>> 0; };
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const enHueco = x >= 226 && x <= 262 && y >= 74 && y < 150 && y >= 74 + Math.abs(x - 244) * 0.15; if (enHueco) continue;
    let k = 1; const gable = y < 52 && (y < 52 - (52 - 10) * (1 - Math.abs(x - 160) / 120));
    if (x < 40 || x > 280 || gable) k = 0.62;   // los paños del techo y los lados, más en sombra
    let c = tono(x, y, k);
    const sx = (x - 40) % 40; if (!gable && x >= 40 && x <= 280 && (sx === 0 || sx === 2)) c = d_guMez(c, hex('#1e180e'), 0.35);   // costuras dobles
    if (h(x >> 3, y >> 3, 51) < 0.08 && h(x, y, 52) < 0.5) c = d_guMez(c, hex('#4a3a20'), 0.25);   // manchas y lamparones
    if (((x + y) & 3) === 0) c = d_guMez(c, hex('#000000'), 0.06);   // la trama de la lona
    B[y * 320 + x] = c; }
  // el suelo de tablones sobre la hierba
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 150) / 5), j = (y - 150) % 5 === 4; let c = j ? hex('#2a3a1c') : d_guMez(hex('#4a3a24'), hex('#a8804a'), luz(x, y) * 0.9); if (!j && h((x + tab * 13) >> 4, tab, 53) < 0.2) c = d_guMez(c, hex('#000000'), 0.15); if (!j && (x + tab * 7) % 23 === 0) c = d_guMez(c, hex('#000000'), 0.3); B[y * 320 + x] = c; }
  // las aristas de la tienda, la cumbrera y el palo
  linea(40, 52, 160, 10, hex('#3a2c18')); linea(280, 52, 160, 10, hex('#3a2c18')); rect(40, 52, 40, 150, hex('#3a2c18')); rect(280, 52, 280, 150, hex('#3a2c18'));
  linea(0, 0, 40, 52, hex('#2a2010')); linea(320, 0, 280, 52, hex('#2a2010'));
  rect(158, 10, 162, 150, hex('#5a3c20')); rect(158, 10, 158, 150, hex('#8a6a40')); rect(162, 10, 162, 150, hex('#3a2410'));
  // el hueco de la puerta con las solapas recogidas
  for (let y = 70; y < 152; y++) { const xl = 226 - (y < 80 ? 0 : 0), w = y < 74 ? 0 : 1; if (w) { pset(225, y, hex('#3a2c18')); pset(263, y, hex('#3a2c18')); } }
  for (const s of [-1, 1]) { const x0 = s < 0 ? 214 : 263; for (let y = 72; y < 150; y++) { const w = Math.round(8 + Math.sin(y * 0.08) * 2 + (y > 110 ? (y - 110) * 0.1 : 0)); for (let i = 0; i < w; i++) { const xx = s < 0 ? x0 + 12 - i : x0 + i; B[y * 320 + xx] = d_guMez(hex('#5a4a2a'), hex('#c8a464'), luz(xx, y) * (i === 0 ? 0.6 : 1) * (0.7 + 0.3 * Math.sin(i * 0.9 + y * 0.05))); } } rect(s < 0 ? 214 : 266, 104, s < 0 ? 226 : 278, 106, hex('#3a2c18')); }
  // el mapa de Normandía clavado con chinchetas, el portapapeles y el farolillo de repuesto
  { const x0 = 56, y0 = 58, x1 = 138, y1 = 100;
    rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#2a2010')); rect(x0, y0, x1, y1, hex('#d8c898'));
    for (let y = y0 + 2; y < y1 - 1; y++) for (let x = x0 + 2; x < x1 - 1; x++) { const costa = y0 + 14 + Math.sin(x * 0.08) * 5 + Math.sin(x * 0.21) * 2; let c = y < costa ? hex('#8ab0c0') : h(x >> 2, y >> 2, 54) < 0.3 ? hex('#a8b878') : hex('#d8c898'); if (Math.abs(y - costa) < 0.7) c = hex('#4a6a7a'); B[y * 320 + x] = c; }
    linea(x0 + 10, y1 - 6, x0 + 50, y0 + 26, hex('#2a4a8a')); linea(x0 + 50, y0 + 26, x0 + 70, y0 + 32, hex('#2a4a8a')); for (let i = 0; i < 4; i++) disco(x0 + 18 + i * 14, y0 + 30 + (i % 2) * 6, 1.4, hex('#c83a2a'));
    linea(x0 + 30, y1 - 4, x0 + 64, y1 - 14, hex('#c83a2a'), 4); for (const [px, py] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1], [x0 + 1, y1 - 1], [x1 - 1, y1 - 1]]) { pset(px, py, hex('#c8282a')); pset(px - 1, py - 1, hex('#f08080')); }
    rect(146, 62, 156, 78, hex('#3a2a18')); rect(147, 64, 155, 78, hex('#e8e0c8')); for (let y = 66; y < 77; y += 2) rect(148, y, 148 + 2 + (y * 7) % 5, y, hex('#6a6a7a')); rect(149, 62, 153, 64, hex('#b0b0b8')); }
  // las cajas de munición apiladas con la radio grande encima
  { const O = hex('#4e5a30'), OL = hex('#7a8448'), OS = hex('#323a1e'), K = hex('#1a1c10');
    for (const [x0, y0, x1, y1] of [[14, 128, 58, 150], [60, 128, 104, 150], [22, 112, 96, 128]]) { rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, O); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, OL); for (let y = y0 + 5; y < y1; y += 5) rect(x0 + 1, y, x1 - 1, y, OS); rect(x0 + 6, y0 + 4, x0 + 12, y0 + 5, hex('#d8d0b0')); rect(x0 + 6, y0 + 7, x0 + 16, y0 + 7, hex('#d8d0b0')); rect(x1 - 6, y0 + 8, x1 - 3, y0 + 10, K); }
    rect(24, 76, 98, 112, K); rect(25, 77, 97, 111, hex('#5a6048')); rect(25, 77, 97, 77, hex('#8a9070')); rect(25, 77, 25, 111, hex('#8a9070')); rect(97, 77, 97, 111, hex('#3a3e2c'));
    rect(28, 80, 94, 108, hex('#484c38')); for (const [sx, sy] of [[27, 79], [95, 79], [27, 109], [95, 109]]) pset(sx, sy, hex('#b0b490'));
    rect(68, 82, 90, 92, K); rect(69, 83, 89, 91, hex('#e8dcb0'));   // el medidor
    for (let x = 30; x < 64; x += 6) { rect(x, 100, x + 3, 104, K); pset(x + 1, 101, hex('#9a9a8a')); }   // los interruptores
    rect(74, 96, 92, 106, hex('#2a2c20')); for (let y = 98; y < 105; y += 2) rect(75, y, 91, y, hex('#3a3c2c'));   // la rejilla del altavocito
    // cables que bajan de la radio a la mesa y del teléfono
    for (let i = 0; i <= 30; i++) { const u = i / 30, x = 98 + u * 52, y = 100 + Math.sin(u * Math.PI) * 24 + u * 56; pset(Math.round(x), Math.round(y), K); }
    // el teléfono de campaña en su bolsa de cuero, sobre la caja de abajo
    rect(108, 132, 124, 150, K); rect(109, 133, 123, 150, hex('#6a4a2a')); rect(109, 133, 123, 134, hex('#9a7044')); rect(112, 128, 120, 132, K); rect(113, 129, 119, 131, hex('#2a2a24')); disco(116, 140, 3, hex('#3a2a18')); disco(116, 140, 1.5, hex('#c8a048'));
    // los auriculares colgados de un gancho
    rect(103, 66, 106, 67, hex('#3a2c18')); linea(104, 68, 98, 80, K); linea(104, 68, 110, 80, K); for (const ex of [98, 110]) { rect(ex - 2, 80, ex + 2, 85, K); rect(ex - 1, 81, ex + 1, 84, hex('#3a3a30')); } }
  // bidones y un petate en el suelo, junto a la puerta
  { const K = hex('#1a1c10'); for (const bx of [270, 282]) { rect(bx, 128, bx + 10, 150, K); rect(bx + 1, 129, bx + 9, 150, hex('#4e5a30')); rect(bx + 1, 129, bx + 2, 150, hex('#7a8448')); linea(bx + 2, 132, bx + 8, 142, hex('#323a1e')); linea(bx + 8, 132, bx + 2, 142, hex('#323a1e')); rect(bx + 3, 125, bx + 6, 128, K); }
    for (let y = 134; y < 151; y++) for (let x = 292; x < 318; x++) { const d = ((x - 305) / 13) ** 2 + ((y - 145) / 10) ** 2; if (d < 1) B[y * 320 + x] = d > 0.75 ? hex('#3a3220') : (x + y) % 5 === 0 ? hex('#6a5a38') : hex('#8a7a50'); } linea(296, 140, 314, 140, hex('#3a3220')); }
  return {};
}

function d_guTienda(R, t, o) {
  const { rect, pset, linea, disco } = R, capa = d_guCapa(R, 'tienda', (marca) => d_guTiendaFijo(R, marca)), m = capa.m, B = R.buf;
  R.copiar(capa.b);
  // fuera, por la puerta: estrellas, el prado, la silueta de un tanque de goma y un soldadito con linterna (todo recortado)
  R.recorte([226, 74, 262, 149]);
  d_guEstrellas(R, t, m, 40, 110, 0.9);
  for (let x = 226; x <= 262; x++) { const y0 = 126 + Math.round(Math.sin(x * 0.1) * 2); for (let y = y0; y < 150; y++) if (m[y * 320 + x]) pset(x, y, (x + y) % 5 === 0 ? hex('#1e2a1c') : hex('#141e14')); }
  d_guTanque(R, 232, 132, t, { escala: 1, tn: (c) => d_guMez(d_guNoct(c), hex('#0c1020'), 0.35) });
  { const u = (t % 9) / 9, x = Math.round(270 - u * 52); d_guFigura(R, x, 138, t, { anda: true, dir: -1, tn: d_guNoct, linterna: true }); }
  R.recorte(null);
  // el farol que cuelga y se mece, con su halo que tiembla
  const sw = Math.sin(t * 1.1) * 3, lx = 160 + sw, ly = 40, fl = 0.85 + 0.15 * Math.sin(t * 11) * Math.sin(t * 4.3);
  linea(160, 14, lx, ly - 7, hex('#2a2010')); d_guHalo(R, lx, ly, 26, hex('#ffd890'), 0.5 * fl);
  rect(lx - 3, ly - 7, lx + 3, ly - 6, hex('#2a2a24')); rect(lx - 4, ly - 5, lx + 4, ly + 5, hex('#2a2a24')); rect(lx - 3, ly - 4, lx + 3, ly + 4, d_guMez(hex('#f0b050'), hex('#fff0b0'), fl)); rect(lx - 1, ly - 2, lx + 1, ly + 2, hex('#fffbe0'));
  linea(lx - 4, ly - 4, lx - 4, ly + 4, hex('#4a4a40')); rect(lx - 5, ly + 5, lx + 5, ly + 6, hex('#2a2a24'));
  // la radio: los diales que giran, la aguja del medidor y las lucecitas
  for (const [k, [cx, cy]] of [[40, 88], [56, 88]].entries()) { disco(cx, cy, 6, hex('#1a1c10')); disco(cx, cy, 5, hex('#2a2c20')); disco(cx, cy, 4, hex('#d8d0a8')); const a = t * (0.4 + k * 0.3) + k; linea(cx, cy, cx + Math.cos(a) * 3.5, cy + Math.sin(a) * 3.5, hex('#c8282a')); pset(cx, cy, hex('#1a1c10')); for (let i = 0; i < 8; i++) pset(Math.round(cx + Math.cos(i * 0.785) * 5), Math.round(cy + Math.sin(i * 0.785) * 5), hex('#8a8a70')); }
  { const a = -2.4 + 0.8 + Math.sin(t * 3) * 0.35 + Math.sin(t * 11) * 0.12; linea(79, 91, 79 + Math.cos(a) * 8, 91 + Math.sin(a) * 8, hex('#1a1c10')); for (let i = 0; i < 6; i++) pset(71 + i * 3, 85, hex('#6a6a5a')); pset(87, 85, hex('#c8282a')); }
  [[32, 96, '#f8b030', 1.3], [38, 96, '#58d058', 2.1], [44, 96, '#e83a2a', 0.7], [50, 96, '#58d058', 3.3]].forEach(([x, y, c, f], i) => { const on = Math.sin(t * f * 3 + i) > -0.2; rect(x, y, x + 1, y + 1, on ? hex(c) : hex('#2a2c20')); if (on) pset(x, y, hex('#ffffe0')); });
  // motas de polvo en la luz del farol
  for (let k = 0; k < 16; k++) { const a = h(k, 1, 810) * 6.28 + t * 0.15, d = 10 + h(k, 2, 810) * 34, x = Math.round(lx + Math.cos(a) * d), y = Math.round(ly + 10 + Math.sin(a) * d * 0.7 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 1.3 + k * 2) > -0.2) pset(x, y, hex('#fff0c0')); }
  return { suelo: 160, mesa: [94, 156, 236], morse: [171, 150], radio: [24, 76, 98, 112], puerta: [226, 74, 262, 150], farol: [Math.round(lx), ly], mapa: [56, 58, 138, 100] };
}

function d_guTiendaDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, K = hex('#1a1c10'), O = hex('#4e5a30'), OL = hex('#7a8448'), OS = hex('#323a1e'), Y = 8;
  // la mesa: dos cajas de munición de patas y el tablón encima, con la luz del farol
  for (const [x0, x1] of [[100, 138], [192, 230]]) { rect(x0, 156 + Y, x1, 180, K); rect(x0 + 1, 157 + Y, x1 - 1, 180, O); rect(x0 + 1, 157 + Y, x1 - 1, 157 + Y, OL); for (let y = 162 + Y; y < 180; y += 5) rect(x0 + 1, y, x1 - 1, y, OS); rect(x0 + 6, 164 + Y, x0 + 14, 165 + Y, hex('#d8d0b0')); rect(x0 + 6, 168 + Y, x0 + 20, 168 + Y, hex('#d8d0b0')); rect(x1 - 7, 170 + Y, x1 - 3, 173 + Y, K); pset(x1 - 5, 171 + Y, OL); }
  rect(94, 148 + Y, 236, 156 + Y, K); for (let y = 149 + Y; y < 156 + Y; y++) for (let x = 95; x < 236; x++) R.pset(x, y, y === 149 + Y ? hex('#c8a060') : y > 153 + Y ? hex('#5a3c20') : (h(x >> 3, y, 820) < 0.2 ? hex('#7a5430') : hex('#9a6c3c')));
  for (let x = 96; x < 236; x += 29) pset(x, 151 + Y, hex('#3a2410'));
  rect(96, 156 + Y, 234, 157 + Y, hex('#2a1c10'));
  // la libreta con renglones (rayas, sin letras), el lápiz y la taza que humea
  rect(112, 144 + Y, 136, 149 + Y, hex('#3a2a18')); rect(113, 144 + Y, 135, 148 + Y, hex('#f0e8d0')); for (let x = 115; x < 133; x += 3) pset(x, 146 + Y, hex('#5a5a7a')); rect(116, 147 + Y, 128, 147 + Y, hex('#8a8aa0')); linea(138, 148 + Y, 146, 145 + Y, hex('#d8a030')); pset(146, 145 + Y, hex('#3a3a3a'));
  rect(206, 141 + Y, 213, 149 + Y, K); rect(207, 142 + Y, 212, 148 + Y, hex('#d8d8d0')); rect(207, 142 + Y, 212, 143 + Y, hex('#6a4a2a')); rect(213, 143 + Y, 215, 146 + Y, K); pset(208, 144 + Y, hex('#ffffff'));
  d_guHumo(R, t, 209, 140 + Y, { n: 4, alto: 14, deriva: 3, r: 2, v: 0.4, c: hex('#c8b8a0'), c2: hex('#e8dcc8') });
  // el manipulador Morse: la base de madera, la palanca de latón que sube y baja (o.morse: true o sin poner teclea solo;
  // 0–1: apretado o no)
  { const p = o.morse === true || o.morse == null ? (Math.sin(t * 22) * Math.sin(t * 3.1) > 0.2 ? 1 : 0) : d_guLim(o.morse) > 0.5 ? 1 : 0, kx = 158, y0 = 145 + Y;
    rect(kx, y0, kx + 16, y0 + 4, K); rect(kx + 1, y0 + 1, kx + 15, y0 + 3, hex('#6a4024')); rect(kx + 1, y0 + 1, kx + 15, y0 + 1, hex('#9a6034'));
    linea(kx + 3, y0 - 2, kx + 13, y0 - 2 + p, hex('#d8b048')); linea(kx + 3, y0 - 3, kx + 13, y0 - 3 + p, hex('#f0d878')); disco(kx + 13, y0 - 4 + p, 1.6, K); pset(kx + 13, y0 - 5 + p, hex('#5a5a5a')); rect(kx + 4, y0 - 2, kx + 5, y0, hex('#a88a38'));
    if (p) { pset(kx + 18, y0 - 4, hex('#fff0a0')); pset(kx + 19, y0 - 5, hex('#fff0a0')); } }
  // el cable que sale de la radio y llega al manipulador, por encima del tablón
  linea(150, 148 + Y, 158, 147 + Y, K);
  return { mesa: [94, 156, 236], morse: [171, 150] };
}

function d_guRinFijo(R, marca) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  d_guDeg(R, 0, 70, [[0, '#080c22'], [0.4, '#10183a'], [0.8, '#1c2450'], [1, '#283060']]);
  // la luna con su halo (las nubes pasan por delante)
  for (let y = 4; y < 44; y++) for (let x = 180; x < 224; x++) { const d = Math.hypot(x - 202, y - 22); if (d < 8) B[y * 320 + x] = h(x >> 1, y >> 1, 830) < 0.22 || Math.hypot(x - 200, y - 20) < 2.4 || Math.hypot(x - 205, y - 25) < 1.5 ? hex('#c8c4ac') : hex('#f0ecd8'); else if (d < 22 && d_guU(x, y) < (1 - d / 22) * 0.55) B[y * 320 + x] = d_guMez(B[y * 320 + x], hex('#7080b0'), 0.5); }
  marca();
  // la otra orilla: colinas con bosques, pueblos a oscuras con su campanario
  const yC = (x) => Math.round(56 + 5 * Math.sin(x * 0.018 + 0.6) + 3 * Math.sin(x * 0.05 + 2)), yD = (x) => Math.round(66 + 2 * Math.sin(x * 0.04 + 1));
  for (let x = 0; x < 320; x++) { const y0 = yC(x); for (let y = y0; y < 80; y++) { let c = y === y0 ? hex('#4a5480') : hex('#1c2242'); if (h(x >> 1, y >> 1, 831) < 0.25) c = hex('#161c38'); B[y * 320 + x] = c; } }
  for (let x = 0; x < 320; x++) { const y0 = yD(x) - (h(x >> 2, 1, 832) < 0.5 ? 1 : 0); for (let y = y0; y < 80; y++) B[y * 320 + x] = y === y0 ? hex('#2e3660') : (h(x, y, 833) < 0.15 ? hex('#0e1228') : hex('#141a34')); }
  for (let x = 0; x < 320; x++) if (h(x >> 2, 3, 837) < 0.55) { const ta = 2 + Math.round(h(x >> 1, 4, 837) * 3); for (let j = 0; j < ta; j++) pset(x, 77 - j, j === ta - 1 ? hex('#26305a') : hex('#10142c')); }
  for (const [vx, nn] of [[96, 6], [232, 5], [290, 3]]) { for (let i = 0; i < nn; i++) { const hx = vx + i * 7 - (i % 2) * 2, hw = 5 + (i % 3), ha = 4 + (i % 2) * 2, by = yD(hx) + 1; rect(hx, by - ha, hx + hw, by, hex('#0c1024')); poligono([[hx - 1, by - ha], [hx + hw / 2, by - ha - 3], [hx + hw + 1, by - ha]], hex('#0c1024')); pset(hx + 1, by - ha - 1, hex('#3a4470')); }
    if (vx === 96) { rect(104, yD(104) - 3, 104, yD(104) - 2, hex('#c8a050')); rect(110, yD(110) - 16, 112, yD(110), hex('#0c1024')); poligono([[109, yD(110) - 16], [111, yD(110) - 25], [113, yD(110) - 16]], hex('#0c1024')); pset(111, yD(110) - 20, hex('#3a4470')); } }
  // el río: agua oscura con bandas tramadas, más clara lejos
  for (let y = 78; y < 128; y++) { const u = (y - 78) / 50; for (let x = 0; x < 320; x++) { let c = d_guU(x, y) < u ? hex('#141c3c') : hex('#1e2a50'); if (y === 78 || y === 79) c = hex('#38446e'); B[y * 320 + x] = c; } }
  // esta orilla: barro con piedras, la hierba de la ribera que sube al campamento
  const orilla = (x) => Math.round(124 + 3 * Math.sin(x * 0.03 + 1) + 2 * Math.sin(x * 0.11));
  for (let x = 0; x < 320; x++) { const y0 = orilla(x); for (let y = y0; y < 180; y++) { let c;
      if (y < y0 + 3) c = y === y0 ? hex('#4a4a4a') : hex('#2a2620');
      else { const s = h(x, y >> 1, 834); c = s < 0.12 ? hex('#1a2a1c') : s > 0.9 ? hex('#3e5236') : (x + (y >> 1)) % 7 === 0 ? hex('#2a3c26') : hex('#24341f'); if (y > 150 && h(x, (y / 3) | 0, 835) < 0.12) c = hex('#46603c'); }
      B[y * 320 + x] = c; } }
  for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 1, 836) * 319), y = orilla(x) + 1; disco(x, y, 1 + (k % 2), hex('#4a4a52')); pset(x - 1, y - 1, hex('#7a7a88')); }
  // el campamento de mentira: tiendas cónicas y tiendas de dos aguas, tanques de goma y un camión de goma
  const tienda = (x, by, w, ha) => { const L = hex('#4e5a36'), LL = hex('#8a9a68'), LS = hex('#2e3620'); poligono([[x, by], [x + w / 2, by - ha], [x + w, by]], L); poligono([[x + w / 2, by - ha], [x + w, by], [x + w * 0.62, by]], LS); linea(x, by, x + w / 2, by - ha, LL); rect(Math.round(x + w * 0.42), by - Math.round(ha * 0.4), Math.round(x + w * 0.56), by, hex('#121410')); pset(Math.round(x + w / 2), by - ha - 1, hex('#1a1c10')); };
  for (const [x, by, w, ha] of [[14, 136, 16, 12], [34, 134, 14, 10], [150, 132, 14, 10], [244, 134, 18, 13], [268, 138, 16, 12], [296, 136, 14, 11]]) tienda(x, by, w, ha);
  const tn = (c) => d_guMez(c, d_guNoct(c), 0.6);
  d_guTanque(R, 54, 140, 0, { escala: 1.4, tn }); d_guTanque(R, 168, 138, 0, { escala: 1.2, tn, dir: -1 }); d_guTanque(R, 200, 146, 0, { escala: 1.5, tn });
  { const O = tn(hex('#5a6236')), OS = tn(hex('#40482a')), K = hex('#0e1008'); rect(108, 124, 138, 138, K); rect(109, 125, 128, 137, O); rect(129, 128, 137, 137, OS); rect(130, 129, 135, 132, hex('#1a2038')); for (const wx of [114, 132]) { disco(wx, 138, 3, K); disco(wx, 138, 1.5, OS); } rect(109, 125, 128, 125, tn(hex('#7a8448'))); }
  // la máscara del agua que se ve (para las ondas y los reflejos: nunca encima de un tanque)
  const agua = new Uint8Array(57600), A1 = hex('#141c3c'), A2 = hex('#1e2a50'); for (let i = 78 * 320; i < 130 * 320; i++) if (B[i] === A1 || B[i] === A2) agua[i] = 1;
  return { orilla, agua };
}

function d_guRin(R, t, o) {
  const { rect, pset, linea, disco } = R, capa = d_guCapa(R, 'rin', (marca) => d_guRinFijo(R, marca)), m = capa.m, B = R.buf, orilla = capa.info.orilla, ag = capa.info.agua, pa = (x, y, c) => { x |= 0; y |= 0; if (x >= 0 && x < 320 && ag[y * 320 + x]) B[y * 320 + x] = c; };
  R.copiar(capa.b);
  d_guEstrellas(R, t, m, 90, 64, 1);
  d_guNubes(R, t, m, 66, [hex('#1a2040'), hex('#2a3260'), hex('#7a86b0')], { v: 0.8 });
  // el río: las ondas que corren y el reflejo de la luna que tiembla (solo sobre el agua que se ve)
  for (let k = 0; k < 120; k++) { const y = 80 + Math.round(h(k, 1, 840) ** 0.8 * 44), u = (y - 78) / 50, w = 3 + Math.round(u * 8), x = Math.round(((h(k, 2, 840) * 340 + t * (3 + u * 5)) % 360) - 20); if (y >= orilla(x) - 1) continue; for (let i = 0; i < w; i++) pa(x + i, y, u > 0.5 ? hex('#2e3c68') : hex('#2a3660')); }
  for (let y = 80; y < 124; y++) { const u = (y - 78) / 46, w = 2 + u * 9, j = Math.sin(t * 3 + y * 1.7) * (1 + u * 2); for (let i = -w; i <= w; i++) { const x = Math.round(202 + j + i); if ((y + Math.floor(t * 4)) % 3 === 0 && Math.abs(i) < w * (0.5 + 0.5 * Math.sin(y * 2.3 + t * 2)) ) pa(x, y, Math.abs(i) < w * 0.35 ? hex('#e8e4c8') : hex('#8a90a8')); } }
  // a lo lejos, los botes de verdad que cruzan tranquilos, con su estela
  for (let k = 0; k < 3; k++) { const u = ((t * 0.035 + k * 0.33) % 1), x = Math.round(18 + k * 22 + u * 10), y = Math.round(100 - u * 20 + k * 2); if (y < 80) continue;
    linea(x - 7, y + 1, x - 2, y + 1, hex('#3a4876')); rect(x - 2, y, x + 4, y, hex('#0a0c14')); rect(x - 1, y + 1, x + 3, y + 1, hex('#0a0c14')); pset(x, y - 1, hex('#0a0c14')); pset(x + 2, y - 1, hex('#0a0c14')); if (k === 1) pset(x + 3, y - 1, hex('#0a0c14')); const r = Math.floor(t * 3 + k) % 2; pset(x - 1 + r, y + 2, hex('#4a5888')); }
  // las hogueras, las figuritas alrededor, el centinela que va y viene y la bandera que ondea
  const luzF = hex('#f0a050');
  d_guFuego(R, t, 90, 148, 1.2); d_guFuego(R, t + 0.4, 226, 150, 1.2); d_guFuego(R, t + 0.9, 276, 142, 0.8);
  d_guHumo(R, t, 90, 134, { n: 5, alto: 36, deriva: 14, r: 4, c: hex('#2a3048'), c2: hex('#3a4060') }); d_guHumo(R, t + 2, 226, 136, { n: 5, alto: 34, deriva: 14, r: 4, c: hex('#2a3048'), c2: hex('#3a4060') });
  for (const [x, s, d, f] of [[80, 151, 1, 90], [100, 150, -1, 90], [216, 153, 1, 226], [238, 152, -1, 226], [284, 144, -1, 276]]) d_guFigura(R, x, s, t, { sentado: true, dir: d, tn: d_guNoct, luz: luzF });
  { const u = (t % 14) / 14, ida = u < 0.5, x = Math.round(ida ? 112 + u * 2 * 90 : 202 - (u - 0.5) * 2 * 90); d_guFigura(R, x, 142, t, { anda: true, dir: ida ? 1 : -1, tn: d_guNoct }); }
  { const bx = 140, by = 120; rect(bx, by, bx, by + 18, hex('#1a1c10')); const fase = t * 4; for (let i = 0; i < 8; i++) { const dy = Math.round(Math.sin(fase - i * 0.6) * 1.2); for (let j = 0; j < 5; j++) pset(bx + 1 + i, by + 1 + j + dy, j < 2 && i < 4 ? hex('#2a3460') : (j % 2 ? hex('#7a2a2a') : hex('#8a8478'))); } }
  return { suelo: 160, orilla: orilla(160), rio: [78, 124], luna: [202, 22], hogueras: [[90, 148], [226, 150], [276, 142]], botes: [18, 80, 70, 100], libre: [60, 260] };
}

function d_guRinDelante(R, t, o) {
  const { rect, pset, linea } = R;
  // los juncos y las espadañas de la orilla, que se mecen, con el canto de la luna
  for (let k = 0; k < 40; k++) { const izq = k < 22, x = izq ? Math.round(h(k, 1, 850) * 46) : Math.round(270 + h(k, 1, 850) * 50), yb = 180, al = 16 + Math.round(h(k, 2, 850) * 24), sw = Math.sin(t * 1.5 + k * 0.7) * (al / 12);
    linea(x, yb, x + sw, yb - al, k % 3 ? hex('#141e12') : hex('#1e2a1a')); pset(Math.round(x + sw) + 1, yb - al + 2, hex('#4a5a70'));
    if (k % 4 === 0) { const cx = Math.round(x + sw * 0.85), cy = yb - Math.round(al * 0.85); rect(cx - 1, cy, cx + 1, cy + 5, hex('#3a2416')); pset(cx + 1, cy, hex('#6a4a30')); } }
  // los bidones y la caja de raciones
  for (const bx of [50, 62]) { rect(bx, 164, bx + 10, 180, hex('#0e1008')); rect(bx + 1, 165, bx + 9, 180, hex('#2a3220')); rect(bx + 1, 165, bx + 1, 180, hex('#4a5878')); linea(bx + 2, 168, bx + 8, 176, hex('#1a2014')); rect(bx + 3, 161, bx + 6, 164, hex('#0e1008')); }
  rect(244, 166, 268, 180, hex('#0e0c08')); rect(245, 167, 267, 180, hex('#3a2c1c')); rect(245, 167, 267, 167, hex('#5a4a40')); for (let y = 171; y < 180; y += 4) rect(245, y, 267, y, hex('#2a1e12')); rect(250, 172, 262, 173, hex('#8a8478'));
  return {};
}

function d_guMapaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // la mesa de madera con vetas y el halo de la lámpara
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor(y / 30), v = Math.sin((x + tab * 50) * 0.06 + Math.sin(y * 0.2 + tab) * 1.5 + h(tab, 1, 860) * 9), d = Math.hypot(x - 140, (y - 90) * 1.2) / 200, l = Math.max(0, 1 - d) ** 1.3;
    let c = d_guMez(hex('#2a160c'), hex('#8a5a32'), l * (0.8 + 0.2 * v)); if (y % 30 === 29) c = hex('#140a06'); else if (v > 0.85) c = d_guMez(c, hex('#1a0e08'), 0.3); if (d_guU(x, y) < 0.1 * l) c = d_guMez(c, hex('#c8905a'), 0.3); B[y * 320 + x] = c; }
  // la sombra del mapa y el papel con las esquinas que se levantan
  const x0 = 24, y0 = 20, x1 = 262, y1 = 166;
  for (let y = y0 + 3; y <= y1 + 4; y++) for (let x = x0 + 4; x <= x1 + 5; x++) B[y * 320 + x] = d_guMez(B[y * 320 + x], hex('#000000'), 0.45);
  R.recorte([x0, y0, x1, y1]);
  const rioX = (y) => 168 + 22 * Math.sin(y * 0.028 + 0.4) + 8 * Math.sin(y * 0.07);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const rx = rioX(y), d = Math.abs(x - rx), ancho = 7 + (y - y0) * 0.02; let c = h(x >> 3, y >> 3, 861) < 0.35 ? hex('#d8cc9c') : hex('#e6dab0');
      const bos = d_guRuido(x, y, 14, 862) > 0.6 && d > 14; if (bos && ((x + y) % 3 === 0 || h(x, y, 863) < 0.3)) c = hex('#8aa868');
      const cota = Math.sin(x * 0.05 + Math.sin(y * 0.04) * 2 + y * 0.03); if (Math.abs(cota) < 0.04 && d > 12) c = hex('#c0a072');
      if (d < ancho) c = d > ancho - 1.2 ? hex('#3a6a9a') : (x + y) % 5 === 0 ? hex('#8ab8d8') : hex('#6a9ac8'); else if (d < ancho + 1.5) c = hex('#b8c8b0');
      if ((x - x0) % 40 === 0 || (y - y0) % 36 === 0) c = d_guMez(c, hex('#7a6a4a'), 0.35);
      B[y * 320 + x] = c; }
  // un afluente, carreteras a trazos y pueblos
  for (let i = 0; i < 60; i++) { const u = i / 60; pset(Math.round(lerp(60, rioX(120) - 6, u) + Math.sin(u * 6) * 4), Math.round(lerp(150, 120, u)), hex('#3a6a9a')); }
  linea(30, 60, 150, 70, hex('#6a3a2a'), 3); linea(150, 70, 250, 50, hex('#6a3a2a'), 3); linea(60, 160, 120, 100, hex('#6a3a2a'), 3); linea(120, 100, 230, 130, hex('#6a3a2a'), 3);
  for (const [tx, ty, nn] of [[70, 58, 5], [116, 98, 4], [210, 56, 6], [228, 134, 4], [92, 140, 3]]) for (let i = 0; i < nn; i++) { const px = tx + (i % 3) * 3, py = ty + Math.floor(i / 3) * 3; rect(px, py, px + 1, py + 1, hex('#8a3a2a')); }
  R.recorte(null);
  // el borde del papel y las esquinas levantadas, las chinchetas
  rect(x0, y0, x1, y0, hex('#f4ecd0')); rect(x0, y1, x1, y1, hex('#b8a880')); rect(x0, y0, x0, y1, hex('#f4ecd0')); rect(x1, y0, x1, y1, hex('#b8a880'));
  poligono([[x1 - 10, y1 + 1], [x1 + 1, y1 + 1], [x1 + 1, y1 - 10]], d_guMez(hex('#2a160c'), hex('#8a5a32'), 0.3)); poligono([[x1 - 10, y1], [x1, y1 - 10], [x1 - 7, y1 - 3]], hex('#c8b890')); linea(x1 - 10, y1, x1, y1 - 10, hex('#8a7a5a'));
  for (const [px, py] of [[x0 + 3, y0 + 3], [x1 - 3, y0 + 3], [x0 + 3, y1 - 3]]) { disco(px, py, 1.5, hex('#c8282a')); pset(px - 1, py - 1, hex('#f8a0a0')); }
  // los números de la cuadrícula en el margen
  for (let i = 1; i < 6; i++) d_guCifras(R, i, x0 + i * 40 - 5, y0 + 3, hex('#5a4a30')); for (let j = 1; j < 4; j++) d_guCifras(R, j + 5, x0 + 3, y0 + j * 36 - 7, hex('#5a4a30'));
  // la lupa, el lápiz, el compás de puntas y la escuadra sobre la mesa
  { disco(286, 70, 10, hex('#1a1410')); disco(286, 70, 9, hex('#b8a060')); disco(286, 70, 7, d_guMez(hex('#8a5a32'), hex('#d8e8f0'), 0.35)); pset(283, 66, hex('#ffffff')); pset(284, 66, hex('#ffffff')); linea(292, 77, 304, 92, hex('#1a1410')); linea(293, 77, 305, 92, hex('#4a2c1a')); linea(294, 77, 306, 91, hex('#6a3c22')); }
  { linea(272, 110, 306, 128, hex('#1a1410')); linea(272, 109, 306, 127, hex('#e8b830')); linea(272, 108, 305, 126, hex('#f8d050')); pset(306, 128, hex('#f0c8a0')); pset(271, 109, hex('#2a2a2a')); pset(272, 110, hex('#2a2a2a')); }
  return {};
}

function d_guMapa(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, capa = d_guCapa(R, 'mapa', () => d_guMapaFijo(R));
  R.copiar(capa.b);
  R.recorte([24, 20, 262, 166]);
  // la flecha falsa: roja, a trazos, hacia el cruce del norte, con fichas fantasma (punteadas)
  const flecha = (pts, u, c, cS, grueso, trazo) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; } let q = u * tot, fin = pts[0], ang = 0;
    for (let i = 1; i < pts.length && q > 0; i++) { const f = Math.min(1, q / L[i - 1]), [ax, ay] = pts[i - 1], bx = ax + (pts[i][0] - ax) * f, by = ay + (pts[i][1] - ay) * f; for (let g = -grueso; g <= grueso; g++) { linea(ax, ay + g, bx, by + g, g === grueso ? cS : c, trazo); linea(ax + g, ay, bx + g, by, g === grueso ? cS : c, trazo); } fin = [bx, by]; ang = Math.atan2(pts[i][1] - ay, pts[i][0] - ax); q -= L[i - 1]; }
    if (u > 0.05) { const s = 6 + grueso * 2, [fx, fy] = fin; poligono([[fx + Math.cos(ang) * s, fy + Math.sin(ang) * s], [fx + Math.cos(ang + 2.4) * s, fy + Math.sin(ang + 2.4) * s], [fx + Math.cos(ang - 2.4) * s, fy + Math.sin(ang - 2.4) * s]], c); } };
  const fal = d_guLim(o.falsa ?? 1), rea = d_guLim(o.real ?? 1), pal = 0.6 + 0.4 * Math.sin(t * 4);
  // las fichas fantasma del norte: contornos punteados que parpadean un poco (las divisiones de mentira)
  for (const [fx, fy] of [[118, 42], [132, 48], [120, 56]]) { const c = d_guMez(hex('#c83a2a'), hex('#f08a6a'), pal); for (let i = 0; i <= 10; i++) { if (i % 2 === 0) { pset(fx + i, fy, c); pset(fx + i, fy + 7, c); } } for (let j = 0; j <= 7; j++) if (j % 2 === 0) { pset(fx, fy + j, c); pset(fx + 10, fy + j, c); } linea(fx + 2, fy + 2, fx + 8, fy + 5, c, 2); linea(fx + 8, fy + 2, fx + 2, fy + 5, c, 2); }
  if (fal > 0) flecha([[64, 34], [110, 46], [150, 40], [172, 46]], fal, hex('#d8322a'), hex('#7a1a14'), 1, 6);
  if (rea > 0) flecha([[60, 150], [110, 128], [150, 118], [196, 112]], rea, hex('#1a3a8a'), hex('#0a1a4a'), 2, 0);
  R.recorte(null);
  // las fichas de madera de verdad (con su símbolo de infantería) junto al cruce del sur
  for (const [fx, fy] of [[64, 120], [78, 132], [52, 136]]) { rect(fx + 1, fy + 1, fx + 12, fy + 9, hex('#3a2a1a')); rect(fx, fy, fx + 11, fy + 8, hex('#d8b878')); rect(fx, fy, fx + 11, fy, hex('#f0d8a0')); rect(fx + 2, fy + 2, fx + 9, fy + 6, hex('#1a3a8a')); linea(fx + 3, fy + 3, fx + 8, fy + 5, hex('#e8e4d0')); linea(fx + 8, fy + 3, fx + 3, fy + 5, hex('#e8e4d0')); }
  // el compás de puntas, que se abre y se cierra midiendo
  { const cx = 226, cy = 86, a = 0.32 + Math.sin(t * 0.9) * 0.1, L = 30; disco(cx, cy, 2.5, hex('#2a2a2a')); disco(cx, cy, 1.5, hex('#d8d8d8'));
    for (const s of [-1, 1]) { const ex = cx + Math.sin(a * s) * L, ey = cy + Math.cos(a) * L; linea(cx, cy, ex, ey, hex('#2a2a30')); linea(cx + 1, cy, ex + 1, ey, hex('#c8ccd4')); pset(Math.round(ex), Math.round(ey) + 1, hex('#1a1a1a')); } }
  // la taza de café que humea, en la mesa de la derecha
  { const cx = 292, cy = 150; disco(cx + 1, cy + 2, 10, hex('#140a06')); disco(cx, cy, 9, hex('#e8e4d8')); disco(cx, cy, 7, hex('#5a3418')); disco(cx - 1, cy - 1, 5, hex('#3a200e')); pset(cx - 3, cy - 3, hex('#8a6040')); rect(cx + 9, cy - 2, cx + 12, cy + 2, hex('#e8e4d8')); rect(cx + 10, cy - 1, cx + 11, cy + 1, hex('#5a3418'));
    d_guHumo(R, t, cx, cy - 4, { n: 5, alto: 22, deriva: 4, r: 3, v: 0.3, c: hex('#a89070'), c2: hex('#c8b090') }); }
  // la polilla que da vueltas a la luz, y las motas
  { const a = t * 2.3, x = Math.round(150 + Math.cos(a) * 60 + Math.sin(t * 5) * 4), y = Math.round(78 + Math.sin(a * 1.3) * 34), al = Math.floor(t * 18) % 2; pset(x, y, hex('#d8c8a0')); pset(x - 1, y - al, hex('#b8a880')); pset(x + 1, y - al, hex('#b8a880')); R.pset(x + 2, y + 6, hex('#3a2a1a')); }
  for (let k = 0; k < 10; k++) { const x = Math.round(80 + h(k, 1, 870) * 140 + Math.sin(t * 0.4 + k) * 8), y = Math.round(30 + ((h(k, 2, 870) * 120 + t * 2) % 120)); if (Math.sin(t + k * 2) > 0) pset(x, y, hex('#fff4d0')); }
  return { suelo: 180, mapa: [24, 20, 262, 166], falsa: [172, 46], real: [196, 112], rio: (y) => Math.round(168 + 22 * Math.sin(y * 0.028 + 0.4) + 8 * Math.sin(y * 0.07)), taza: [292, 150], compas: [226, 86] };
}

function d_guCapitolioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  const M0 = hex('#e6dccb'), M1 = hex('#d8ccb8'), MV = hex('#bfb19a'), ML = hex('#f4ecdc'), MS = hex('#a8987e');
  // el techo artesonado y la cornisa (tranquilos en la esquina de Atom y bajo el año)
  for (let y = 0; y < 24; y++) for (let x = 0; x < 320; x++) { const cx = x % 32, cy = y % 12, borde = cx < 2 || cy < 2; let c = y > 19 ? (y === 20 ? hex('#c8b896') : y === 23 ? hex('#8a7a62') : (x % 4 < 2 ? hex('#d8c8a8') : hex('#c4b494'))) : borde ? hex('#cfc2a8') : cx > 26 || cy > 9 ? hex('#b8aa8e') : hex('#c4b69a'); if (!borde && y < 20 && cx === 15 && cy === 6 && x < 270) c = hex('#d8b048'); B[y * 320 + x] = c; }
  // la pared de mármol con vetas y zócalo
  for (let y = 24; y < 132; y++) for (let x = 0; x < 320; x++) { const panel = Math.floor(x / 40), v = Math.sin(x * 0.11 + y * 0.07 + Math.sin(y * 0.05 + panel) * 3 + panel * 2); let c = (y - 24) % 36 === 35 || x % 40 === 0 ? MS : v > 0.93 ? MV : h(x >> 2, y >> 2, 880) < 0.2 ? M1 : M0; if (y > 118) c = y === 119 ? ML : (x % 20 === 0 ? MS : hex('#c4b49c')); B[y * 320 + x] = c; }
  // el cuadro grande de paisaje con marco dorado (entre las columnas de la izquierda)
  { const x0 = 34, y0 = 36, x1 = 88, y1 = 82; rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, hex('#7a5a1e')); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#d8b048')); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#a8842a'));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const hor = y0 + 26 + Math.round(Math.sin(x * 0.12) * 2); let c = y < hor ? d_guMez(hex('#8ab0d0'), hex('#f0d8a8'), (y - y0) / 26) : y < hor + 4 ? hex('#5a7a4a') : h(x >> 1, y, 881) < 0.4 ? hex('#7a8a4a') : hex('#8a7a48'); if (y < hor && h(x >> 2, y >> 1, 882) < 0.1) c = hex('#f8f0e0'); B[y * 320 + x] = c; }
    for (let i = 0; i < 6; i++) { const fx = x0 + 8 + i * 8, fy = y0 + 30 + (i % 2); rect(fx, fy - 2, fx + 1, fy, hex('#3a4a2a')); disco(fx, fy - 4, 2, hex('#4a5a30')); } }
  // las columnas con fuste estriado, capitel y basa
  const columna = (cx) => { const w = 9; rect(cx - w - 2, 24, cx + w + 2, 30, hex('#c8b896')); rect(cx - w - 3, 24, cx + w + 3, 25, ML); for (let i = -w - 1; i <= w + 1; i += 3) pset(cx + i, 28, MS); disco(cx - w + 1, 30, 2, MS); disco(cx + w - 1, 30, 2, MS);
    for (let y = 31; y < 124; y++) for (let x = cx - w; x <= cx + w; x++) { const u = (x - cx + w) / (2 * w); let c = u < 0.2 ? ML : u > 0.78 ? MS : M0; if ((x - cx + w) % 4 === 3) c = d_guMez(c, MS, 0.5); B[y * 320 + x] = c; } rect(cx - w - 3, 124, cx + w + 3, 131, hex('#c8b896')); rect(cx - w - 3, 124, cx + w + 3, 124, ML); rect(cx - w - 3, 128, cx + w + 3, 128, MS); };
  for (const cx of [18, 104, 226]) columna(cx);
  // el telón azul del fondo con flecos dorados y su emblema de estrella (sin escudos ni letras)
  { const x0 = 118, x1 = 212, y0 = 30, y1 = 122; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const pl = Math.sin((x - x0) * 0.32), c = pl > 0.6 ? hex('#3a5294') : pl < -0.5 ? hex('#1a2a5a') : hex('#2a3c78'); B[y * 320 + x] = c; }
    rect(x0, y0, x1, y0 + 3, hex('#d8b048')); for (let x = x0; x <= x1; x += 2) pset(x, y0 + 4, hex('#a8842a')); rect(x0, y0, x0, y1, hex('#1a2244')); rect(x1, y0, x1, y1, hex('#1a2244'));
    const cx = 165, cy = 66; disco(cx, cy, 17, hex('#a8842a')); disco(cx, cy, 16, hex('#d8b048')); disco(cx, cy, 14, hex('#1e3068')); disco(cx, cy, 13, hex('#2a3c78'));
    for (let a = 0; a < 5; a++) { const an = -Math.PI / 2 + a * Math.PI * 2 / 5; poligono([[cx + Math.cos(an) * 10, cy + Math.sin(an) * 10], [cx + Math.cos(an + 0.63) * 4, cy + Math.sin(an + 0.63) * 4], [cx, cy], [cx + Math.cos(an - 0.63) * 4, cy + Math.sin(an - 0.63) * 4]], hex('#f0d878')); }
    for (let a = 0; a < 13; a++) { const an = a * Math.PI * 2 / 13; pset(Math.round(cx + Math.cos(an) * 15), Math.round(cy + Math.sin(an) * 15), hex('#f8e8a0')); } }
  // la cortina granate de la derecha, con pliegues suaves y alzapaño dorado
  for (let y = 24; y < 132; y++) for (let x = 240; x < 320; x++) { const pl = Math.sin((x - 240) * 0.28 + (y > 80 ? (y - 80) * 0.04 * (x < 270 ? 1 : 0) : 0)), c = pl > 0.55 ? hex('#8a2a36') : pl < -0.55 ? hex('#4a1220') : hex('#6a1c2a'); B[y * 320 + x] = y < 44 && x > 276 ? d_guMez(c, hex('#6a1c2a'), 0.6) : c; }
  rect(240, 24, 319, 27, hex('#a8842a')); for (let x = 240; x < 320; x += 3) pset(x, 28, hex('#d8b048')); rect(240, 24, 241, 131, hex('#3a0e18')); disco(250, 92, 3, hex('#d8b048')); pset(249, 91, hex('#f8e8a0'));
  // la estatua blanca en su pedestal
  { const sx = 254; rect(sx - 8, 92, sx + 8, 124, hex('#b8aa92')); rect(sx - 9, 92, sx + 9, 94, ML); rect(sx - 8, 120, sx + 8, 124, MS); rect(sx - 6, 98, sx + 6, 100, MS);
    const pie = hex('#ece6da'), pS = hex('#c8beae'); rect(sx - 3, 68, sx + 3, 91, pie); rect(sx + 1, 68, sx + 3, 91, pS); rect(sx - 4, 60, sx + 4, 70, pie); rect(sx + 2, 60, sx + 4, 70, pS); disco(sx, 55, 4, pie); pset(sx + 2, 56, pS); pset(sx + 3, 54, pS); linea(sx - 4, 62, sx - 8, 50, pie); linea(sx - 5, 62, sx - 9, 50, pS); rect(sx - 10, 46, sx - 7, 49, pie); poligono([[sx - 4, 70], [sx + 5, 70], [sx + 7, 91], [sx - 6, 91]], pie); linea(sx + 4, 72, sx + 6, 90, pS); linea(sx, 74, sx - 1, 90, pS); }
  // la tarima con faldón azul y ribete dorado
  rect(56, 130, 264, 131, hex('#8a6a40')); rect(56, 132, 264, 144, hex('#1e2c5e')); for (let x = 56; x <= 264; x += 6) rect(x, 133, x + 1, 144, hex('#2a3c78')); rect(56, 131, 264, 132, hex('#d8b048')); rect(56, 144, 264, 145, hex('#a8842a'));
  // el suelo de mármol en damero con brillos
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 56 && x <= 264 && y < 146) continue; const u = (x - 160) / (y - 96) * 4, fila = Math.floor((y - 132) / (2 + (y - 132) * 0.12)), cas = (Math.floor(u) + fila) & 1; let c = cas ? hex('#d8cfc0') : hex('#5a4a44'); if (Math.abs(u - Math.round(u)) < 0.04) c = hex('#8a7a6a'); if (h(x >> 2, y >> 1, 883) < 0.06) c = d_guMez(c, hex('#ffffff'), 0.25); B[y * 320 + x] = c; }
  // el puente de focos (sin pasar por la esquina de Atom) con los conos de luz hacia la tarima
  rect(30, 31, 268, 33, hex('#1a1a20')); for (let x = 30; x < 268; x += 6) linea(x, 31, x + 3, 33, hex('#3a3a44'));
  for (const fx of [84, 140, 190, 236]) { rect(fx - 3, 34, fx + 3, 40, hex('#202028')); rect(fx - 2, 40, fx + 2, 41, hex('#fff4c8')); for (let y = 42; y < 131; y++) { const w = (y - 42) * 0.3 + 2; for (let x = Math.round(fx - w); x <= Math.round(fx + w); x++) if (x >= 0 && x < 320 && d_guU(x, y) < 0.22 * (1 - (y - 42) / 120)) B[y * 320 + x] = d_guMez(B[y * 320 + x], hex('#fff4d0'), 0.35); } }
  // las banderas de barras y estrellas en sus mástiles con remate dorado
  for (const bx of [116, 212]) { rect(bx, 34, bx + 1, 130, hex('#a8842a')); rect(bx, 34, bx, 130, hex('#f0d878')); disco(bx + 0.5, 33, 2, hex('#d8b048')); rect(bx - 2, 128, bx + 3, 130, hex('#7a5a1e')); }
  return {};
}

// la bandera que cuelga de su mástil y se mece un poco: barras rojas y blancas, el cantón azul con estrellitas
function d_guBandera(R, x, y, t, dir) {
  const { pset } = R; for (let i = 0; i < 18; i++) { const dy = Math.round(Math.sin(t * 1.4 - i * 0.35) * 0.8 * (i / 18)), sh = Math.sin(i * 0.9 - t * 1.4) > 0.5;
    for (let j = 0; j < 30; j++) { const yy = y + j + dy + Math.round(j > 13 ? (j - 13) * 0 : 0); let c = Math.floor(j / 2.3) % 2 ? hex('#f0ece4') : hex('#b8283a'); if (i < 8 && j < 14) c = (i + j) % 3 === 0 && i > 0 && j > 0 ? hex('#f0ece4') : hex('#24306a'); if (sh) c = d_guMez(c, hex('#000000'), 0.22); pset(x + i * dir, yy, c); }
    pset(x + i * dir, y + 30 + dy, hex('#d8b048')); }
}

function d_guCapitolio(R, t, o) {
  const { rect, pset, linea, disco } = R, capa = d_guCapa(R, 'capitolio', () => d_guCapitolioFijo(R));
  R.copiar(capa.b);
  d_guBandera(R, 118, 36, t, 1); d_guBandera(R, 211, 36, t + 1, -1);
  // las motas en los conos de luz
  for (let k = 0; k < 24; k++) { const fx = [84, 140, 190, 236][k % 4], u = ((h(k, 1, 890) + t * 0.03) % 1), y = Math.round(44 + u * 84), x = Math.round(fx + (h(k, 2, 890) - 0.5) * (y - 42) * 0.5 + Math.sin(t + k) * 2); if (Math.sin(t * 1.7 + k) > -0.3) pset(x, y, hex('#fffbe8')); }
  return { suelo: 131, tarima: [56, 131, 264], atril: [152, 174], telon: [118, 30, 212, 122], banderas: [116, 212], camara: [296, 124], libre: [60, 150, 178, 236] };
}

function d_guCapitolioDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  // el atril de madera con su emblema dorado (una estrella en un círculo) y los dos micrófonos
  { const x0 = 152, x1 = 174; rect(x0 - 2, 108, x1 + 2, 111, hex('#3a2010')); rect(x0 - 1, 108, x1 + 1, 109, hex('#a8703a')); poligono([[x0, 111], [x1, 111], [x1 - 1, 131], [x0 + 1, 131]], hex('#6a3c1e')); for (let y = 113; y < 131; y += 3) linea(x0 + 2, y, x1 - 2, y, hex('#5a3018')); rect(x0, 111, x0 + 1, 131, hex('#8a5028')); rect(x1 - 2, 111, x1 - 1, 131, hex('#4a2410'));
    disco(163, 119, 5, hex('#a8842a')); disco(163, 119, 4, hex('#d8b048')); d_guEstrella(R, 163, 119, hex('#f8e8a0'));
    for (const mx of [158, 168]) { linea(mx, 108, mx + (mx < 163 ? -1 : 1), 100, hex('#1a1a1a')); disco(mx + (mx < 163 ? -1 : 1), 99, 1.5, hex('#2a2a2a')); pset(mx + (mx < 163 ? -1 : 1), 98, hex('#8a8a8a')); } }
  // la medalla de oro con su cinta, su brillo y sus destellos
  let med = null;
  if (o.medalla) { const [mx, my] = o.medallaEn ?? [206, 100], p = 0.75 + 0.25 * Math.sin(t * 3);
    d_guHalo(R, mx, my, 22, hex('#ffe890'), 0.55 * p);
    for (let a = 0; a < 8; a++) { const an = a * Math.PI / 4 + t * 0.4, L = 10 + 5 * Math.sin(t * 3 + a); for (let r = 7; r < L + 7; r++) if ((r + Math.floor(t * 8)) % 3) pset(Math.round(mx + Math.cos(an) * r), Math.round(my + Math.sin(an) * r), hex('#fff0a8')); }
    linea(mx - 4, my - 12, mx - 1, my - 5, hex('#2a3c8a')); linea(mx + 4, my - 12, mx + 1, my - 5, hex('#2a3c8a')); linea(mx - 3, my - 12, mx, my - 5, hex('#c83a3a')); linea(mx + 3, my - 12, mx, my - 5, hex('#f0ece4'));
    disco(mx, my, 6, hex('#7a5a1e')); disco(mx, my, 5, hex('#d8b048')); disco(mx - 1, my - 1, 3, hex('#f0d878')); d_guEstrella(R, mx, my, hex('#a8842a')); pset(mx - 3, my - 3, hex('#ffffff'));
    if (Math.sin(t * 5) > 0.6) { pset(mx + 5, my - 6, hex('#ffffff')); pset(mx + 4, my - 6, hex('#fff0a8')); pset(mx + 6, my - 6, hex('#fff0a8')); pset(mx + 5, my - 7, hex('#fff0a8')); pset(mx + 5, my - 5, hex('#fff0a8')); }
    med = [mx, my]; }
  // la cámara de televisión en su trípode, con el piloto rojo
  { const cx = 296; linea(cx, 140, cx - 7, 160, hex('#1a1a20')); linea(cx, 140, cx + 7, 160, hex('#1a1a20')); linea(cx, 140, cx, 160, hex('#2a2a30')); rect(cx - 9, 124, cx + 7, 139, hex('#1a1a20')); rect(cx - 8, 125, cx + 6, 138, hex('#3a3a44')); rect(cx - 14, 128, cx - 9, 135, hex('#1a1a20')); disco(cx - 14, 131, 3, hex('#2a3a5a')); pset(cx - 15, 130, hex('#8ab0e0')); rect(cx - 6, 126, cx + 4, 127, hex('#5a5a66')); if (Math.floor(t * 1.5) % 2) pset(cx + 4, 129, hex('#f83a2a')); }
  // los fotógrafos de la izquierda con sus flashes
  for (const [k, fx] of [[0, 16], [1, 38]]) { const fl = (t * 0.7 + k * 0.37) % 1.7 < 0.06; const fy = 166 + k * 10, ro = hex(k ? '#2a2a3a' : '#4a3a3a'), pa = hex('#1e1e28'), mv = Math.sin(t * 2 + k * 3) > 0.7 ? 1 : 0;   // el fotógrafo de pie (a la escala del público), con la cámara en la cara
      rect(fx - 3, fy - 7, fx - 1, fy, pa); rect(fx + 1, fy - 7, fx + 3, fy, pa); rect(fx - 4, fy - 16, fx + 4, fy - 8, ro); rect(fx - 4, fy - 16, fx - 3, fy - 8, d_guMez(ro, hex('#ffffff'), 0.2)); disco(fx, fy - 20, 4, hex('#e0aa80')); rect(fx - 4, fy - 24, fx + 3, fy - 22, hex(k ? '#c8c8c8' : '#3a2a1a'));
      rect(fx + 2, fy - 22 + mv, fx + 8, fy - 18 + mv, hex('#1a1a1a')); rect(fx + 8, fy - 21 + mv, fx + 9, fy - 19 + mv, hex('#3a3a44')); rect(fx + 3, fy - 24 + mv, fx + 5, fy - 23 + mv, hex('#2a2a2a')); rect(fx + 3, fy - 17, fx + 5, fy - 14, ro);
      if (fl) { pset(fx + 4, fy - 24, hex('#ffffff')); d_guHalo(R, fx + 4, fy - 24, 12, hex('#ffffff'), 0.75); } }
  // el público sentado, de espaldas: filas de sillas doradas, cabezas y hombros que se mueven un poco
  const PELO = ['#2a1c14', '#c8c8c8', '#6a4a2a', '#e8d8a0', '#1a1a1a', '#a0a0a8', '#8a5a3a'], ROPA = ['#2a2a3a', '#3a4a6a', '#5a2a2a', '#2a3a2a', '#4a4a4a', '#6a5a3a', '#1e2a4a'];
  for (let fila = 0; fila < 2; fila++) { const y = 166 + fila * 10, paso = 14 + fila * 2;
    for (let x = 60 + fila * 7; x < 266; x += paso) { const k = Math.floor(x / paso) + fila * 7, mov = Math.sin(t * 0.8 + k * 1.7) > 0.85 ? 1 : 0, ropa = hex(ROPA[k % 7]), pelo = hex(PELO[(k * 3) % 7]);
      rect(x - 6, y - 2, x + 6, y + 8, hex('#7a5a1e')); rect(x - 6, y - 2, x + 6, y - 2, hex('#d8b048'));
      rect(x - 5, y - 8, x + 5, y + 8, ropa); rect(x - 5, y - 8, x - 4, y + 8, d_guMez(ropa, hex('#ffffff'), 0.15));
      disco(x + mov, y - 12, 4, pelo); pset(x - 4 + mov, y - 12, hex('#e0aa80')); pset(x + 4 + mov, y - 12, hex('#e0aa80')); if (k % 4 === 1) { rect(x - 3 + mov, y - 16, x + 3 + mov, y - 15, pelo); } } }
  return { atril: [152, 108, 174, 131], medalla: med };
}

function d_guTallerFijo(R, marca) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // por el ventanal: el cielo de la ciudad
  d_guDeg(R, 0, 120, [[0, '#4a8ad0'], [0.4, '#78aee0'], [0.8, '#b8d4ec'], [1, '#e0ecf0']]);
  marca();
  // la pared: ladrillo a la izquierda (alrededor del ventanal) y yeso blanco a la derecha, con salpicaduras de pintura
  for (let y = 0; y < 142; y++) for (let x = 0; x < 320; x++) { const enV = x >= 16 && x <= 100 && y >= 22 && y <= 112; if (enV) continue; let c;
    if (x < 118) { const fila = y >> 2, off = (fila & 1) * 5, junta = (y & 3) === 3 || ((x + off) % 10) === 0; c = junta ? hex('#c8b8a8') : [hex('#a85a42'), hex('#9a4e3a'), hex('#b8664a')][Math.floor(h((x + off) / 10 | 0, fila, 900) * 3)]; }
    else { c = h(x >> 3, y >> 3, 901) < 0.3 ? hex('#e4ddd0') : hex('#ece6da'); if (x < 122) c = hex('#d4ccbe'); }
    if (y > 130) c = y === 131 ? hex('#8a7a6a') : hex('#c8beae');
    if (y < 16) c = y === 15 ? hex('#a8988a') : y === 14 ? hex('#cfc6b8') : (x % 48 === 0 ? hex('#d0c8ba') : hex('#e2dccf'));   // el techo de yeso (tranquilo bajo el año)
    B[y * 320 + x] = c; }
  for (let k = 0; k < 40; k++) { const x = 122 + Math.round(h(k, 1, 902) * 150), y = 50 + Math.round(h(k, 2, 902) * 80); if (x > 270 && y < 50) continue; pset(x, y, hex(['#d83a2a', '#2a5ab8', '#f0c030', '#1a1a1a'][k % 4])); if (k % 3 === 0) pset(x, y + 1, hex(['#d83a2a', '#2a5ab8', '#f0c030', '#1a1a1a'][k % 4])); }
  // la ciudad por el ventanal: azoteas, depósitos de agua de madera, chimeneas
  R.recorte([16, 22, 100, 112]);
  for (const [bx, bw, bh, c] of [[14, 22, 50, '#8a7a7a'], [36, 18, 64, '#7a6a68'], [54, 26, 40, '#9a8a80'], [80, 22, 58, '#6a6a78']]) { rect(bx, 112 - bh, bx + bw, 112, hex(c)); for (let y = 112 - bh + 4; y < 112; y += 6) for (let x = bx + 2; x < bx + bw - 1; x += 4) rect(x, y, x + 1, y + 2, h(x, y, 903) < 0.3 ? hex('#f0e0a0') : hex('#3a4458')); rect(bx, 112 - bh, bx + bw, 112 - bh, hex('#5a4a4a')); }
  { const wx = 62; rect(wx - 6, 52, wx + 6, 62, hex('#6a4a2a')); for (let x = wx - 5; x < wx + 6; x += 2) rect(x, 53, x, 62, hex('#4a3018')); poligono([[wx - 7, 52], [wx, 45], [wx + 7, 52]], hex('#4a3a2a')); linea(wx - 5, 62, wx - 6, 72, hex('#2a2a2a')); linea(wx + 5, 62, wx + 6, 72, hex('#2a2a2a')); }
  R.recorte(null);
  // el ventanal de hierro: marco, montantes y travesaños
  rect(14, 20, 102, 21, hex('#2a2a30')); rect(14, 113, 102, 116, hex('#2a2a30')); rect(14, 20, 15, 116, hex('#2a2a30')); rect(101, 20, 102, 116, hex('#2a2a30'));
  for (const x of [36, 58, 80]) rect(x, 22, x, 112, hex('#3a3a44')); for (const y of [44, 66, 90]) rect(16, y, 100, y, hex('#3a3a44'));
  rect(12, 114, 104, 118, hex('#8a8a90')); rect(12, 114, 104, 114, hex('#c8c8d0'));
  // el haz de luz que entra por el ventanal y cae en diagonal al suelo
  poligono([[16, 112], [100, 112], [190, 180], [60, 180]], (x, y) => d_guU(x, y) < 0.3 ? d_guMez(B[y * 320 + x], hex('#fff4d8'), 0.35) : B[y * 320 + x]);
  // la estantería bajo el ventanal: botes de pintura, tarros con pinceles, trapos
  { rect(4, 124, 112, 126, hex('#5a3c20')); rect(4, 124, 112, 124, hex('#8a6038'));
    for (const [px, c, a] of [[8, '#d83a2a', 8], [20, '#2a5ab8', 10], [34, '#f0c030', 7], [46, '#e8e4dc', 9], [60, '#1a1a1a', 6], [86, '#3a8a4a', 8]]) { rect(px, 124 - a, px + 9, 123, hex('#8a8a90')); rect(px, 124 - a, px + 9, 124 - a + 1, hex(c)); rect(px + 1, 124 - a + 3, px + 8, 124 - a + 5, hex('#e8e4dc')); rect(px, 124 - a + 2, px, 123, hex('#c8c8d0')); pset(px + 2, 124 - a + 2, hex(c)); pset(px + 2, 124 - a + 3, hex(c)); }
    rect(72, 116, 80, 123, hex('#a8c8d0')); for (let i = 0; i < 4; i++) { linea(74 + i * 2, 116, 72 + i * 3, 104 + i, hex('#8a5a2a')); pset(72 + i * 3, 103 + i, hex(['#d83a2a', '#2a5ab8', '#f0c030', '#1a1a1a'][i])); } }
  // el suelo de tablas con manchas de pintura
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((x + (y - 142) * 0.6) / 22), j = Math.floor(x + (y - 142) * 0.6) % 22 === 0; let c = j ? hex('#5a3c24') : h(tab, (y + tab * 7) >> 4, 904) < 0.4 ? hex('#a8784a') : hex('#b8885a'); if (!j && h(x, y, 905) < 0.04) c = hex('#8a6038'); B[y * 320 + x] = c; }
  for (let k = 0; k < 14; k++) { const x = Math.round(110 + h(k, 1, 906) * 200), y = Math.round(146 + h(k, 2, 906) * 32), c = hex(['#d83a2a', '#2a5ab8', '#f0c030', '#e8e4dc'][k % 4]); disco(x, y, 1 + (k % 2), c); pset(x + 2, y + 1, c); }
  rect(0, 140, 319, 142, hex('#6a5a4a')); rect(0, 140, 319, 140, hex('#e8e0d4'));
  // los bocetos de vestidos clavados, con muestras de tela
  for (const [k, [bx, by]] of [[226, 56], [246, 50], [266, 60]].entries()) { rect(bx + 1, by + 1, bx + 17, by + 25, hex('#a89a88')); rect(bx, by, bx + 16, by + 24, hex('#f8f4ea')); pset(bx + 8, by + 1, hex('#c8282a'));
    const c = hex(['#1e2a6a', '#a82a3a', '#2a6a5a'][k]); disco(bx + 8, by + 5, 1.5, hex('#3a3a3a')); linea(bx + 8, by + 7, bx + 8, by + 10, hex('#3a3a3a')); poligono([[bx + 6, by + 8], [bx + 10, by + 8], [bx + 9, by + 12], [bx + 7, by + 12]], c); poligono([[bx + 7, by + 12], [bx + 9, by + 12], [bx + 13 + k, by + 22], [bx + 3 - k, by + 22]], c); linea(bx + 7, by + 13, bx + 5 - k, by + 21, d_guMez(c, hex('#ffffff'), 0.3)); rect(bx + 12, by + 2, bx + 15, by + 5, hex(['#d8b048', '#e8a0b0', '#8ab0d0'][k])); }
  // la mesa de costura (la máquina va encima, en cada fotograma)
  { const K = hex('#3a2410'); rect(270, 122, 316, 126, K); rect(271, 122, 315, 123, hex('#c8986a')); rect(271, 124, 315, 125, hex('#8a5a30')); rect(273, 127, 275, 150, K); rect(311, 127, 313, 150, K); rect(273, 127, 274, 150, hex('#6a4420')); rect(274, 140, 312, 141, K); }
  // los rollos de tela apoyados en la pared
  for (const [k, rx] of [290, 298, 306].entries()) { const c = hex(['#7a2a5a', '#d8b048', '#2a4a8a'][k]), cS = d_guMez(c, hex('#000000'), 0.35); rect(rx, 80 + k * 6, rx + 6, 140, c); rect(rx + 4, 80 + k * 6, rx + 6, 140, cS); rect(rx, 80 + k * 6, rx + 6, 81 + k * 6, d_guMez(c, hex('#ffffff'), 0.3)); for (let y = 86 + k * 6; y < 140; y += 7) linea(rx, y, rx + 6, y + 2, cS); }
  return {};
}

function d_guTaller(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, capa = d_guCapa(R, 'taller', (marca) => d_guTallerFijo(R, marca)), m = capa.m, B = R.buf;
  R.copiar(capa.b);
  // las nubes y una paloma por el ventanal (solo en el cielo)
  for (let k = 0; k < 3; k++) { const x = ((h(k, 1, 910) * 160 + t * (2 + k * 1.3)) % 160) - 30, y = 30 + k * 12; d_guNube(B, m, x, y, 16 + k * 5, k + 50, [hex('#c8d8e8'), hex('#eef4fa'), hex('#ffffff')]); }
  { const u = (t % 8) / 8, x = Math.round(10 + u * 100), y = Math.round(40 + Math.sin(u * 6) * 6), a = Math.floor(t * 8) % 2; R.recorte([16, 22, 100, 112]); pset(x, y, hex('#5a5a6a')); pset(x + 1, y, hex('#5a5a6a')); pset(x - 1, y - a, hex('#7a7a8a')); pset(x + 2, y - a, hex('#7a7a8a')); pset(x + 2, y + 1, hex('#e8a040')); R.recorte(null); }
  // la cortina del ventanal que mueve la brisa
  for (let y = 20; y < 112; y++) { const w = 6 + Math.round(Math.sin(t * 1.2 + y * 0.06) * 2 * (y / 112)); for (let i = 0; i < w; i++) pset(103 + i, y, (i + Math.floor(y * 0.1 + t)) % 3 === 0 ? hex('#d8d0c0') : hex('#f0ece0')); }
  rect(98, 18, 114, 19, hex('#2a2a30'));
  // la lámpara industrial que cuelga
  linea(200, 0, 200, 14, hex('#2a2a30')); poligono([[192, 22], [208, 22], [204, 14], [196, 14]], hex('#3a5a4a')); rect(192, 22, 208, 22, hex('#2a3a30')); rect(197, 23, 203, 24, hex('#fff4c8'));
  // el maniquí con el vestido de noche (brilla un poco) y la cinta métrica que cuelga y se mece
  { const mx = 252; rect(mx - 1, 120, mx + 1, 140, hex('#3a2a1a')); rect(mx - 6, 139, mx + 6, 140, hex('#3a2a1a')); disco(mx, 74, 4, hex('#d8c8a8')); rect(mx - 1, 78, mx + 1, 80, hex('#d8c8a8'));
    poligono([[mx - 7, 82], [mx + 7, 82], [mx + 4, 96], [mx - 4, 96]], hex('#1e2a6a')); poligono([[mx - 4, 96], [mx + 4, 96], [mx + 12, 124], [mx - 12, 124]], hex('#24327a')); linea(mx - 3, 98, mx - 9, 122, hex('#3a4a9a')); linea(mx + 2, 98, mx + 6, 122, hex('#141c4a')); rect(mx - 5, 95, mx + 5, 96, hex('#d8b048'));
    const sh = Math.floor(t * 0.7) % 4; pset(mx - 4 + sh, 86 + sh * 3, hex('#8a9ae0')); pset(mx - 6 + sh, 104 + sh * 4, hex('#8a9ae0'));
    const sw = Math.sin(t * 1.5) * 1.5; linea(mx - 7, 82, mx - 9 + sw, 104, hex('#f0d040')); linea(mx + 7, 82, mx + 9 + sw, 100, hex('#f0d040')); for (let i = 0; i < 6; i++) { pset(Math.round(mx - 7.4 - i * 0.35 + sw * i / 6), 84 + i * 3, hex('#3a3a3a')); } }
  // el caballete con el cuadro de grandes campos de color, y la gota que resbala y cae
  { const K = hex('#3a2410'); linea(150, 150, 168, 30, K); linea(151, 150, 169, 30, hex('#8a5a2a')); linea(206, 150, 186, 30, K); linea(205, 150, 185, 30, hex('#8a5a2a')); linea(177, 30, 177, 152, hex('#6a4220')); rect(140, 114, 214, 117, hex('#8a5a2a')); rect(140, 117, 214, 117, K);
    const x0 = 142, y0 = 44, x1 = 212, y1 = 113; rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#2a2a2a'));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c = hex('#f4f0e6'); if (x < x0 + 30 && Math.hypot(x - (x0 + 30), y - (y0 + 36)) < 30) c = hex('#d8302a'); if (x > x0 + 40 && y < y0 + 34) c = hex('#1e4aa8'); if (x > x0 + 40 && y > y0 + 44 && y < y0 + 50) c = hex('#f0c020'); if (x > x0 + 56 && y > y0 + 54) c = hex('#1a1a1a'); if (h(x, y, 911) < 0.04) c = d_guMez(c, hex('#ffffff'), 0.2); B[y * 320 + x] = c; }
    const u = (t % 6) / 6, gy = u < 0.6 ? Math.round(y1 - 2 + u * 4) : Math.round(y1 + 2 + (u - 0.6) * 90); if (gy < 140) { pset(x0 + 12, gy, hex('#d8302a')); if (u < 0.6) pset(x0 + 12, gy - 1, hex('#d8302a')); } rect(x0 + 12, y1, x0 + 12, y1 + 1, hex('#d8302a')); }
  // motas de polvo en el haz de luz
  for (let k = 0; k < 18; k++) { const u = ((h(k, 1, 912) + t * 0.025) % 1), x = Math.round(30 + u * 110 + h(k, 2, 912) * 50 + Math.sin(t * 0.6 + k) * 3), y = Math.round(112 + u * 64 - h(k, 3, 912) * 20); if (Math.sin(t * 1.4 + k * 1.3) > -0.2 && y < 180) pset(x, y, hex('#fffbe8')); }
  // la máquina de coser negra con filetes dorados: el volante gira y la aguja sube y baja
  { const mx = 278, my = 122, K = hex('#141418'); rect(mx, my - 9, mx + 22, my, K); rect(mx + 1, my - 8, mx + 21, my - 1, hex('#24242c')); rect(mx + 1, my - 8, mx + 21, my - 8, hex('#5a5a66')); rect(mx, my - 14, mx + 5, my - 9, K); rect(mx + 1, my - 13, mx + 4, my - 9, hex('#24242c'));
    rect(mx + 3, my - 6, mx + 18, my - 6, hex('#d8b048')); pset(mx + 8, my - 4, hex('#d8b048')); pset(mx + 12, my - 4, hex('#d8b048'));
    const ag = Math.round(Math.sin(t * 14)); rect(mx + 2, my - 1 + ag, mx + 2, my + 2 + ag, hex('#c8c8d0'));
    const vx = mx + 21, vy = my - 6; R.disco(vx, vy, 4, K); R.disco(vx, vy, 3, hex('#8a8a90')); const a = t * 6; R.linea(vx, vy, vx + Math.cos(a) * 3, vy + Math.sin(a) * 3, K); R.linea(vx, vy, vx - Math.cos(a) * 3, vy - Math.sin(a) * 3, K);
    rect(mx - 6, my + 1, mx + 4, my + 2, hex('#2a5a9a')); pset(mx - 4, my + 3, hex('#2a5a9a')); pset(mx - 3, my + 4, hex('#2a5a9a')); }
  // el taburete con un cuaderno de bocetos
  { const K = hex('#3a2410'); rect(214, 134, 232, 136, K); rect(215, 134, 231, 134, hex('#b8885a')); linea(216, 137, 213, 150, K); linea(230, 137, 233, 150, K); linea(223, 137, 223, 150, K); rect(216, 142, 230, 142, K); rect(217, 131, 229, 133, hex('#f0ead8')); rect(217, 133, 229, 133, hex('#3a3a4a')); linea(219, 132, 226, 132, hex('#8a8aa0')); }
  return { suelo: 150, caballete: [142, 44, 212, 113], maniqui: [252, 140], ventana: [16, 22, 100, 112], bocetos: [226, 50, 284, 86], libre: [108, 240] };
}

function d_guTallerDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  // la mesa de trabajo: tablero con manchas, la paleta, tubos de pintura, pinceles en un bote, tijeras y retales
  rect(0, 154, 104, 159, hex('#3a2410')); for (let x = 0; x < 104; x++) for (let y = 155; y < 158; y++) pset(x, y, y === 155 ? hex('#c8986a') : h(x >> 3, y, 920) < 0.25 ? hex('#8a5a30') : hex('#a8703c'));
  rect(4, 159, 10, 180, hex('#4a2c14')); rect(92, 159, 98, 180, hex('#4a2c14')); rect(4, 159, 5, 180, hex('#7a4a24'));
  { const px = 20, py = 150; poligono([[px, py + 4], [px + 6, py], [px + 22, py], [px + 26, py + 4], [px + 20, py + 6], [px + 4, py + 6]], hex('#c8985a')); disco(px + 8, py + 3, 1, hex('#5a3a1a')); for (const [i, c] of [[11, '#d8302a'], [15, '#1e4aa8'], [19, '#f0c020'], [22, '#e8e4dc']]) { pset(px + i, py + 2, hex(c)); pset(px + i + 1, py + 2, hex(c)); pset(px + i, py + 3, hex(c)); } }
  for (const [i, c] of [[52, '#d8302a'], [57, '#1e4aa8'], [62, '#f0c020']]) { rect(i, 151, i + 3, 154, hex('#c8c8d0')); rect(i, 151, i + 3, 152, hex(c)); pset(i + 4, 152, hex('#2a2a2a')); }
  { rect(72, 142, 80, 154, hex('#2a2a30')); rect(73, 143, 79, 154, hex('#8ab0c8')); for (let i = 0; i < 4; i++) { const sw = Math.round(Math.sin(t * 0.8 + i) * 0.5); linea(74 + i * 2, 143, 72 + i * 3 + sw, 132 + (i % 2) * 2, hex('#8a5a2a')); pset(72 + i * 3 + sw, 131 + (i % 2) * 2, hex(['#d8302a', '#1e4aa8', '#f0c020', '#1a1a1a'][i])); } }
  linea(84, 152, 94, 148, hex('#8a8a90')); linea(84, 148, 94, 152, hex('#8a8a90')); disco(83, 152, 1.5, hex('#c8282a')); disco(83, 148, 1.5, hex('#c8282a'));
  rect(36, 152, 48, 154, hex('#7a2a5a')); rect(40, 150, 50, 152, hex('#d8b048'));
  return { mesa: [0, 154, 104] };
}

// la paleta del hielo: Londres, el taller, la sala, el baño y el lago
const e_C = pal({
  techo: '#2a2420', techoS: '#1a1612', yeso: '#d8ccb0', yesoS: '#a89878', yesoL: '#f0e6cc',
  pap: '#2e4a3a', papL: '#3f5f49', papS: '#21372b', papM: '#345240',
  caoba: '#6a3424', caobaS: '#4a2218', caobaL: '#8e4e32', caobaD: '#2a120a',
  parq: '#8a5a32', parqL: '#a8743e', parqS: '#6a4224', parqD: '#3e2414',
  alfR: '#8a2a2a', alfRS: '#5e1a1e', alfO: '#c8a050', alfA: '#2a3456', alfC: '#d8c8a0',
  terc: '#7a1e24', tercL: '#a0303a', tercS: '#4a1018',
  ll0: '#6e7a84', ll1: '#84909a', ll2: '#9aa6ae', ll3: '#b0babf',
  piz: '#4a525e', pizL: '#5e6874', pizS: '#363c46', lad: '#7a4a3a', ladS: '#563226', olla: '#a0603a', lejos: '#7e8a94', lejosS: '#6e7984',
  globo: '#c4c8cc', globoS: '#8a9096', globoL: '#e8ecf0',
  mar: '#86b2c6', marL: '#a6cad8', marS: '#6a98b0', marD: '#3e6a88', papel: '#e8dcb8', papelS: '#cfbf96', papelL: '#f6eed6', costa: '#6a4a2a', banquisa: '#f0f6f8', banquisaS: '#c8dce4',
  rojoM: '#c83a32', azulM: '#24365a',
  latonL: '#f4d888', laton: '#c8a040', latonS: '#8a6a24',
  fuego: '#f08a2a', fuegoL: '#ffe070', fuegoS: '#c03a1a', brasa: '#5a1a10', hierro: '#26262c', hierroL: '#4a4a54', marmol: '#2a4436', marmolL: '#4a6a56',
  cuero: '#6a2a1e', cueroL: '#8e4430', cueroS: '#44180f',
  verdeL: '#2e7a4a', verdeLL: '#6ab47a', luzC: '#ffe8a8',
  // el taller frío
  vigas: '#3a302a', vigasS: '#241e1a', ladB: '#b8c4cc', ladBS: '#94a2ac', ladBL: '#d4dee4', junta: '#7a8892', ladR: '#9a6a5a',
  escarcha: '#eef6fa', acero: '#8a96a0', aceroL: '#b8c4cc', aceroS: '#5a646e', aceroD: '#363e46',
  hie: '#bfe2f0', hieL: '#eaf8fe', hieS: '#86bcd4', hieD: '#5a90aa', pyk: '#959fa4', pykL: '#b4bcc0', pykS: '#6a7276', pykF: '#8a6a44',
  saco: '#b89a64', sacoS: '#8a7044', sacoL: '#d4b880', serrin: '#d8b878', cem: '#8a9094', cemL: '#a2a8ac', cemS: '#6c7276', cemD: '#50565a', charco: '#a8bcc8',
  mad: '#a8783e', madL: '#c8945a', madS: '#7a5228', madD: '#4a3018', vaho: '#e4eef4',
  // la sala de Quebec
  roble: '#8a6234', robleL: '#aa7e46', robleS: '#644222', robleD: '#3e2812', crema: '#e2d4b0', cremaS: '#c4b48e', cremaL: '#f2e8cc',
  oroT: '#d4a83a', oroTS: '#9a7424', alfQ: '#7a2230', alfQS: '#561622', alfQL: '#9a3240', azulP: '#2a5a9a', azulPS: '#1e4478', azulPL: '#d8e8f8',
  pano: '#2e6a3a', panoL: '#3e8248', panoS: '#1e4a28', rio: '#5a8ab0', rioL: '#86b0d0', colina: '#6a8a5a', colinaS: '#4e6a46',
  // el baño
  menta: '#cfe2d4', mentaS: '#b4ccbc', mentaL: '#e2f0e6', azu: '#ece2c8', azuS: '#d4c8a8', azuJ: '#b8ac8c', azuL: '#faf4e2', azuV: '#9cc8b0',
  negro: '#1e1e24', negroL: '#3a3a44', blancoS: '#d8d8dc', esmalte: '#f4f4f0', esmalteS: '#c8ccd0', esmalteD: '#9aa0a8', cromo: '#d8e0e8', cromoS: '#8a96a4',
  agua: '#7ac8d0', aguaL: '#b4e6ea', aguaS: '#4e9aa8', vapor: '#f4f8f8', pato: '#f8d030', patoS: '#d09a18', picoN: '#f07a20', esmeril: '#dce8e2', esmerilS: '#c4d4cc',
  // el lago
  roca: '#8a7a74', rocaL: '#a89890', rocaS: '#5e5250', piram: '#a8644a', piramL: '#c8845a', piramS: '#6e3e30', lejano: '#8a9ab4', lejanoS: '#6e7e9a',
  nieve: '#f4f8fc', nieveS: '#c4d4e4', nieveM: '#dce6f0',
  pino0: '#2a4a3a', pino1: '#1e3a2e', pino2: '#14281f', pinoL: '#3e6a4a', alerce: '#d8b030', alerceS: '#a8801e', alamo: '#e0782a', alamoS: '#a8501a',
  lago: '#3a8a8a', lagoL: '#5aaaa8', lagoS: '#286a6e', lagoD: '#1a4e54', hieloL: '#d4e8f0', hieloLS: '#a8c8d8', hieloLL: '#eef8fc',
  hierba: '#5a8a3a', hierbaL: '#7aaa4a', hierbaS: '#3a6a2a', hierbaO: '#a89a4a', hierbaOS: '#7a6a30', guija: '#9a948a', guijaL: '#bab4a8', guijaS: '#6a6660',
  hondo0: '#4a9a9a', hondo1: '#2e7a80', hondo2: '#1e5a64', hondo3: '#123e48', hondo4: '#0a2a34', cieno: '#5a5a40', cienoL: '#7a7a54', cienoS: '#3a3c2c',
  alga: '#3a7a3a', algaL: '#5aa04a', algaS: '#24502a', oxido: '#9a4a24', oxidoL: '#c06a34', oxidoS: '#5e2a14', trucha: '#9aa088', truchaL: '#d8d0b0', truchaS: '#5e6650', pez: '#c8b878',
});
// las listas de colores (libros y cielos de cada estación)
Object.assign(e_C, {
  libro: ['#7a2228', '#283e6a', '#2e5a3a', '#6a4a2a', '#a07a2a', '#3a2a3a', '#8a5a3a', '#2a4a5a'].map(hex),
  cieloV: ['#4a8ad0', '#6aa4dc', '#8cbce6', '#b4d4ee', '#d4e6f2'].map(hex),
  cieloO: ['#6a8ab8', '#8aa4c8', '#b0bcd0', '#d8c8b8', '#ecd4b0'].map(hex),
  suelo1: hex('#2e5a52'), suelo1L: hex('#467a6c'), suelo1S: hex('#1e3c36'), bata: hex('#7a2a3a'), bataL: hex('#9a3e4e'), bataS: hex('#4e1824'),
  cieloI: ['#8a98a8', '#a0acb8', '#b8c2cc', '#ccd4dc', '#dce2e8'].map(hex),
});

const e_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en un búfer de R.nuevo() (uno por R y por clave) y se copia en cada fotograma
function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]); return m[clave];
}

// mezcla de dos colores (k = 0 el primero, 1 el segundo)
function e_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// la trama ordenada de Bayer 4 × 4 (0–1)
const e_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_bay = (x, y) => (e_BAY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// degradado vertical tramado entre una lista de colores en (x0, y0)–(x1, y1), con algo de ruido para que no haga bandas
function e_degradado(R, x0, y0, x1, y1, cols, k = 0, ruido = 0.3) {
  const n = cols.length - 1, B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const v = (y - y0) / Math.max(1, y1 - y0) * n;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const w = v + (h(x >> 3, y >> 1, k) - 0.5) * ruido; let i = Math.floor(w); if (w - i > e_bay(x, y)) i++; B[y * 320 + x] = cols[Math.max(0, Math.min(n, i))]; } }
}

// tiñe una zona hacia un color (a: cuánto); con trama, solo uno de cada dos píxeles
function e_tinte(R, x0, y0, x1, y1, col, a, trama = false) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (!trama || ((x + y) & 1) === 0) { const i = y * 320 + x; B[i] = e_mezcla(B[i], col, a); }
}

// luz o sombra redonda que se apaga hacia fuera (tiñe hacia col; a: fuerza en el centro)
function e_foco(R, cx, cy, rx, ry, col, a) {
  const B = R.buf;
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d >= 1) continue; const k = a * (1 - d) * (1 - d); if (k < 0.04) continue; const i = y * 320 + x; B[i] = e_mezcla(B[i], col, k);
  }
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba a la izquierda); c = [luz, cuerpo, sombra]
function e_nube(R, cx, cy, w, c) {
  const L = [[-0.36, 0.08, 0.18], [-0.15, -0.06, 0.25], [0.1, -0.13, 0.25], [0.33, 0.04, 0.2], [0.02, 0.1, 0.22]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of L) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), c[2]);
  for (const [dx, dy, f] of L) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w - 1), r(f * 0.88), c[1]);
  for (const [dx, dy, f] of L) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), r(f * 0.5), c[0]);
}

// nubes que cruzan a su velocidad, dando la vuelta: lista de [x0, y, ancho, px/s]
function e_nubes(R, t, lista, c) { for (const [x0, y, w, v] of lista) { const L = 320 + w * 2; e_nube(R, ((x0 + t * v) % L + L) % L - w, y, w, c); } }

// un pájaro lejano que bate las alas (2 tonos de gris)
function e_pajaro(R, x, y, t, c, k = 0) { x = Math.round(x); y = Math.round(y); if (x > 270 && y < 50) return; const a = Math.sin(t * 10 + k) > 0; R.pset(x, y, c); if (a) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 2, y - 1, c); R.pset(x + 2, y - 1, c); } else { R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x - 2, y + 1, c); R.pset(x + 2, y + 1, c); } }

// un bloque con su cara de delante, la de arriba y el costado en sombra; tipo 'hielo' (translúcido, con burbujas y
// brillo) o 'pykrete' (gris con fibras de madera); (x, yb): centro de abajo; w × a de cara
function e_bloque(R, x, yb, w, a, tipo, k = 0) {
  const P = e_C, hie = tipo === 'hielo', c = hie ? [P.hieL, P.hie, P.hieS, P.hieD] : [P.pykL, P.pyk, P.pykS, P.aceroD];
  const x0 = Math.round(x - w / 2), x1 = x0 + w - 1, y1 = Math.round(yb), y0 = y1 - a + 1, p = Math.max(2, Math.round(a * 0.3));
  R.poligono([[x0, y0], [x0 + p, y0 - p], [x1 + p, y0 - p], [x1, y0]], c[0]);   // la cara de arriba
  R.poligono([[x1, y0], [x1 + p, y0 - p], [x1 + p, y1 - p], [x1, y1]], c[2]);   // el costado
  R.rect(x0, y0, x1, y1, c[1]);
  for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) { const q = h(xx, yy, 640 + k);
    if (hie) { if (((xx - x0) + (y1 - yy)) % 9 === 0 && q < 0.6) R.pset(xx, yy, P.hieL); else if (q < 0.05) R.pset(xx, yy, C.blanco); else if (yy > y1 - 2) R.pset(xx, yy, P.hieS); }
    else { if (q < 0.1) R.pset(xx, yy, P.pykF); else if (q < 0.16) R.pset(xx, yy, P.pykS); else if (q > 0.94) R.pset(xx, yy, P.pykL); } }
  for (let i = 0; i < 4; i++) if (!hie) R.linea(x0 + 2 + Math.round(h(i, 1, 641 + k) * (w - 6)), y0 - 1 - Math.round(h(i, 2, 641 + k) * (p - 1)), x0 + 4 + Math.round(h(i, 1, 641 + k) * (w - 6)), y0 - 1 - Math.round(h(i, 2, 641 + k) * (p - 1)), P.pykF);
  R.linea(x0, y0, x1, y0, hie ? C.blanco : P.pykL); R.linea(x0, y0, x0, y1, hie ? P.hieL : P.pykL);
  R.linea(x0 - 1, y0, x0 - 1, y1, C.k); R.linea(x0, y1 + 1, x1, y1 + 1, C.k); R.linea(x0 - 1, y0, x0 + p - 1, y0 - p, C.k); R.linea(x0 + p, y0 - p - 1, x1 + p, y0 - p - 1, C.k); R.linea(x1 + p + 1, y0 - p, x1 + p + 1, y1 - p, C.k); R.linea(x1 + 1, y1, x1 + p, y1 - p + 1, C.k);
  if (hie) { R.pset(x0 + 2, y0 + 2, C.blanco); R.pset(x0 + 3, y0 + 2, C.blanco); R.pset(x0 + 2, y0 + 3, C.blanco); }
}

// el Atlántico Norte en (lon, lat): costas de América, Groenlandia, Islandia, Gran Bretaña, Irlanda, Europa y África
const e_TIERRA = [
  [[-82, 72], [-68, 72], [-66, 67], [-62, 66], [-64, 62], [-61, 57], [-56, 53], [-59, 48], [-53, 49.5], [-52.6, 47], [-55, 46.6], [-60, 46], [-61, 45.2], [-66, 44], [-70, 43.5], [-70, 41.6], [-74, 40.5], [-76, 37], [-75.5, 35.2], [-78, 34], [-81, 31.5], [-80.5, 28], [-80, 24], [-82, 24]],
  [[-58, 72], [-54, 69], [-53, 66], [-51, 64], [-48, 61], [-44, 59.8], [-42, 61], [-40, 64], [-35, 66], [-25, 69], [-21, 72]],
  [[-24, 65.5], [-22, 66.4], [-16, 66.5], [-13.5, 65], [-15, 64.3], [-18, 63.4], [-22, 63.8], [-24, 64.8]],
  [[-5, 58.6], [-3, 58.6], [-2, 57.6], [-1.8, 55.6], [0, 53.5], [1.7, 52.6], [1.4, 51.2], [-1, 50.7], [-5.7, 50], [-4.2, 51.5], [-5, 51.8], [-4.5, 53.3], [-3, 54], [-3.4, 54.9], [-5, 55], [-5.6, 56.5], [-6.5, 57.5]],
  [[-10, 52], [-6, 52.2], [-6, 54], [-7.5, 55.3], [-10, 54.2], [-10.2, 53]],
  [[16, 66], [12, 65], [8, 63.2], [5, 62], [5, 59], [6.5, 58], [8, 58.1], [10, 59], [10.5, 57.5], [8.4, 55], [8.7, 54], [7, 53.5], [4.5, 52.5], [3, 51.3], [1.6, 50.9], [1.5, 50], [-1.5, 49.7], [-1.8, 48.6], [-4.7, 48.4], [-2, 47], [-1.3, 44.5], [-1.6, 43.4], [-8, 43.7], [-9.3, 43], [-8.9, 41], [-9.5, 38.7], [-8.9, 37], [-6, 36.2], [-5.6, 36], [-2, 36.7], [3, 39.5], [16, 40]],
  [[-5.6, 35.9], [16, 37], [16, 22], [-17, 22], [-16, 24], [-14.5, 26], [-13, 27.5], [-10, 29], [-9.6, 30.4], [-6.8, 34]],
];

const e_ISLAS = [[-28, 38.6], [-25.6, 37.8], [-64.8, 32.3], [-16, 28.3], [-7, 62]];

const e_BASES = [[-53, 48], [-20, 64.5], [-6.5, 54.6]], e_ALCANCE = 9.5;

const e_RUTA = [[-63.6, 44.6], [-52, 46.5], [-40, 52], [-28, 56], [-14, 57], [-3, 53.6]];

const e_SUBS = [[-38, 55, 0], [-31, 51.5, 1], [-43, 50, 2], [-26, 58, 3], [-34, 48, 4]];

// la proyección de una vista [lon0, lon1, lat arriba, lat abajo] sobre el rectángulo (X0, Y0)–(X1, Y1)
function e_proy(X0, Y0, X1, Y1, V) {
  const ax = (X1 - X0) / (V[1] - V[0]), ay = (Y1 - Y0) / (V[2] - V[3]);
  return { ax, ay, x: (lon) => X0 + (lon - V[0]) * ax, y: (lat) => Y0 + (V[2] - lat) * ay, lon: (x) => V[0] + (x - X0) / ax, lat: (y) => V[2] - (y - Y0) / ay };
}

// la parte fija del mapa del Atlántico en (X0, Y0)–(X1, Y1): el mar tramado con olas y cuadrícula, la zona sin aviones
// rayada en rojo, los círculos punteados de cobertura, la tierra de papel con su costa doble, Groenlandia helada, las
// islas, las bases (un avioncito), la ruta del convoy punteada y rótulos de rayas (sin letras); o.grande: más detalle
function e_atlantico(R, X0, Y0, X1, Y1, V, o = {}) {
  const P = e_C, B = R.buf, G = e_proy(X0, Y0, X1, Y1, V), g = o.grande ? 1 : 0;
  for (let y = Y0; y <= Y1; y++) { const lat = G.lat(y), cl = Math.cos(lat * Math.PI / 180);
    for (let x = X0; x <= X1; x++) { const lon = G.lon(x);
      let c = (y - Y0) / (Y1 - Y0) + (h(x >> 3, y >> 2, 620) - 0.5) * 0.3 > 0.55 + e_bay(x, y) * 0.3 ? P.marS : P.mar;
      if (((x * 3 + y * 7) % (g ? 17 : 13)) === 0 && h(x >> 2, y, 621) < 0.6) c = P.marL;
      if (Math.abs(lon / 10 - Math.round(lon / 10)) * 10 * G.ax < 0.5 && (y & 1)) c = P.marS;
      if (Math.abs(lat / 10 - Math.round(lat / 10)) * 10 * G.ay < 0.5 && (x & 1)) c = P.marS;
      let fuera = true;
      for (const [bl, bb] of e_BASES) { const d = Math.hypot((lon - bl) * cl, lat - bb); if (d < e_ALCANCE) fuera = false; if (Math.abs(d - e_ALCANCE) * G.ay < 0.6 && (x + y) % 3) c = P.marD; }
      if (fuera && lat > 42 && lat < 63 && lon > -52 && lon < -14) c = ((x - y) & 3) === 0 ? P.rojoM : ((x + y) & 1) ? e_mezcla(c, P.rojoM, 0.22) : c;
      B[y * 320 + x] = c; } }
  R.recorte([X0, Y0, X1, Y1]);
  const tierra = (x, y) => { const q = h(x >> 1, y >> 1, 622); return q < 0.12 ? P.papelS : q > 0.93 ? P.papelL : P.papel; };
  e_TIERRA.forEach((pol, k) => R.poligono(pol.map(([lo, la]) => [G.x(lo), G.y(la)]), k === 1 ? (x, y) => (h(x, y >> 1, 623) < 0.15 ? P.banquisaS : P.banquisa) : tierra));
  for (const [lo, la] of e_ISLAS) R.disco(Math.round(G.x(lo)), Math.round(G.y(la)), g ? 1 : 0, P.papel);
  // la costa: una raya oscura por dentro y una doble raya de agua clara por fuera (como en las cartas viejas)
  const esT = (c) => c === P.papel || c === P.papelS || c === P.papelL || c === P.banquisa || c === P.banquisaS;
  const M = new Uint8Array(320 * 180); for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) M[y * 320 + x] = esT(B[y * 320 + x]) ? 1 : 0;
  const vec = (x, y, r) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const xx = x + i, yy = y + j; if (xx >= X0 && xx <= X1 && yy >= Y0 && yy <= Y1 && M[yy * 320 + xx]) return true; } return false; };
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const i = y * 320 + x;
    if (M[i]) { if ((x > X0 && !M[i - 1]) || (x < X1 && !M[i + 1]) || (y > Y0 && !M[i - 320]) || (y < Y1 && !M[i + 320])) B[i] = P.costa; else if (g && h(x >> 2, y >> 2, 624) < 0.1 && ((x + y) & 1)) B[i] = P.papelS; }
    else if (vec(x, y, 1)) B[i] = P.marL; else if (g && vec(x, y, 3) && !vec(x, y, 2) && ((x + y) & 1)) B[i] = P.marL; }
  // rótulos de rayas sobre la tierra y el mar (sin letras)
  for (const [lo, la, n] of [[-72, 52, 3], [-42, 66.5, 2], [-3, 46, 2], [-10, 27, 2], [-45, 38, 3], [-62, 36, 2]]) for (let k = 0; k < n; k++) { const x = Math.round(G.x(lo)), y = Math.round(G.y(la)) + k * (g ? 3 : 2); R.linea(x, y, x + (g ? 14 : 7) - k * 3, y, k ? P.costa : P.azulM); }
  // la ruta del convoy, punteada
  for (let k = 0; k < e_RUTA.length - 1; k++) { const [a0, b0] = e_RUTA[k], [a1, b1] = e_RUTA[k + 1], x0 = G.x(a0), y0 = G.y(b0), x1 = G.x(a1), y1 = G.y(b1), n = Math.ceil(Math.hypot(x1 - x0, y1 - y0));
    for (let i = 0; i < n; i++) if ((i % 4) < 2) R.pset(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), P.azulM); }
  // las bases: un avioncito en su círculo
  for (const [lo, la] of e_BASES) { const x = Math.round(G.x(lo)), y = Math.round(G.y(la)), s = g ? 2 : 1;
    R.disco(x, y, 2 * s, P.azulM); R.disco(x, y, 2 * s - 1, P.papelL); R.linea(x - s - 1, y, x + s + 1, y, P.azulM); R.linea(x, y - s, x, y + s + 1, P.azulM); R.pset(x - 1, y + s + 1, P.azulM); R.pset(x + 1, y + s + 1, P.azulM); }
  R.recorte(null);
  return G;
}

// la vida del mapa: los barcos del convoy que avanzan por la ruta, los submarinos que rondan la zona sin aviones y, de
// vez en cuando, el anillo rojo de un «ping»; s: tamaño (1 en la pared, 2 de cerca)
function e_atlanticoVivo(R, t, X0, Y0, X1, Y1, V, s = 1) {
  const P = e_C, G = e_proy(X0, Y0, X1, Y1, V), pts = e_RUTA.map(([a, b]) => [G.x(a), G.y(b)]), L = [];
  let tot = 0; for (let k = 0; k < pts.length - 1; k++) { const l = Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]); L.push(l); tot += l; }
  const en = (u) => { let d = u * tot; for (let k = 0; k < L.length; k++) { if (d <= L[k]) { const f = d / L[k]; return [pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f, pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f]; } d -= L[k]; } return pts[pts.length - 1]; };
  R.recorte([X0, Y0, X1, Y1]);
  for (let k = 0; k < 6; k++) { const u = ((t * 0.012 + Math.floor(k / 3) * 0.5 + (k % 3) * 0.018) % 1), [x, y] = en(u), xi = Math.round(x), yi = Math.round(y) + (k % 3 === 1 ? s : k % 3 === 2 ? -s : 0);
    R.rect(xi - s, yi, xi + s, yi, P.negro); if (s > 1) { R.rect(xi - s - 1, yi + 1, xi + s, yi + 1, P.aceroD); R.pset(xi, yi - 1, P.negro); } R.pset(xi - s - 1, yi, P.marL); R.pset(xi - s - 2, yi + (s > 1 ? 1 : 0), P.marL); }
  for (const [lo, la, k] of e_SUBS) { const x = Math.round(G.x(lo + Math.sin(t * 0.15 + k * 2) * 2.2)), y = Math.round(G.y(la + Math.cos(t * 0.11 + k) * 0.8)), d = Math.cos(t * 0.15 + k * 2) > 0 ? 1 : -1;
    if (s > 1) { R.rect(x - 4, y, x + 4, y + 1, P.hierro); R.pset(x - 5 * d, y + 1, P.hierro); R.rect(x - 1, y - 2, x + 1, y - 1, P.hierro); R.pset(x + d, y - 3, P.hierro); R.rect(x - 3, y, x + 2, y, P.hierroL); }
    else { R.rect(x - 2, y, x + 2, y, P.hierro); R.pset(x, y - 1, P.hierro); }
    const u = ((t + k * 1.7) % 6) / 1.2; if (u < 1) { const r = 2 + u * (s > 1 ? 9 : 4); for (let a = 0; a < 6.28; a += 0.9 / r) if (Math.sin(a * 3 + t) > -0.5) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.8), P.rojoM); } }
  R.recorte(null);
}

// cifras diminutas de 3 × 5 (solo números) en (x, y), esquina de arriba a la izquierda
const e_CIF = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111', '-': '000000111000000' };

function e_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const f = e_CIF[ch]; if (f) for (let i = 0; i < 15; i++) if (f[i] === '1') R.pset(x + (i % 3), y + Math.floor(i / 3), c); x += 4; } }

const e_VGEN = [-80, 12, 70, 25], e_VCER = [-76, 4, 67, 27];

// tablero de paneles en relieve (zócalo): el marco, el panel con su luz arriba a la izquierda y su sombra, y vetas
function e_paneles(R, x0, y0, x1, y1, ancho, c) {
  const P = e_C, [m, mS, mL, mD] = c ?? [P.caoba, P.caobaS, P.caobaL, P.caobaD];
  R.rect(x0, y0, x1, y1, m); R.rect(x0, y0, x1, y0, mL); R.rect(x0, y0 + 1, x1, y0 + 1, mD);
  for (let x = x0; x < x1; x += ancho) { const a = x + 4, b = Math.min(x1 - 3, x + ancho - 4), ya = y0 + 5, yb = y1 - 4; if (b - a < 6) continue;
    R.rect(a - 1, ya - 1, b + 1, ya - 1, mD); R.rect(a - 1, ya - 1, a - 1, yb + 1, mD); R.rect(a, yb + 1, b + 1, yb + 1, mL); R.rect(b + 1, ya, b + 1, yb + 1, mL);
    R.rect(a + 1, ya + 1, b - 1, yb - 1, mS); R.rect(a + 2, ya + 2, b - 2, yb - 2, m);
    for (let y = ya + 3; y < yb - 2; y++) for (let xx = a + 3; xx < b - 2; xx++) if (h(xx >> 3, y, 630 + x) < 0.08 || ((xx + Math.round(Math.sin(y * 0.4 + x) * 2)) % 7 === 0 && h(xx, y >> 2, 631) < 0.4)) R.pset(xx, y, mS);
    R.rect(a + 2, ya + 2, b - 2, ya + 2, mL); R.rect(a + 2, ya + 2, a + 2, yb - 2, mL); }
}

// parqué en espiga (tablillas de 4 en columnas de 8 que cambian de sentido), con vetas y tablillas de tono distinto
function e_espiga(R, x0, y0, x1, y1, [c, cL, cS, cD], k = 0) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const col = x >> 3, off = col & 1 ? (x & 7) : 7 - (x & 7), v = y + off, pl = v >> 2, q = h(col, pl, 632 + k);
    let cc = (v & 3) === 0 || (x & 7) === 0 ? cD : q < 0.25 ? cS : q > 0.8 ? cL : c; if (cc !== cD && h(x, y, 633 + k) < 0.06) cc = cS; B[y * 320 + x] = cc; }
}

// alfombra persa: cenefa con dientes, campo rojo con medallón de rombos y flecos en los extremos
function e_alfombra(R, x0, y0, x1, y1) {
  const P = e_C, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const bx = Math.min(x - x0, x1 - x), by = Math.min(y - y0, y1 - y), b = Math.min(bx, by * 2);
    let c = P.alfR;
    if (b < 1) c = P.alfRS; else if (b < 3) c = P.alfA; else if (b < 4) c = ((x + y) & 1) ? P.alfO : P.alfA; else if (b < 6) c = P.alfRS;
    else { const d = Math.abs(x - cx) / 2.4 + Math.abs(y - cy); if (d < 3) c = P.alfO; else if (d < 4) c = P.alfA; else if (d < 7 && ((x + y) & 1)) c = P.alfC; else if (d < 8) c = P.alfA;
      else if (((x - x0) % 12 === 6 && (y - y0) % 6 === 3) || ((x - x0) % 12 === 0 && (y - y0) % 6 === 0)) c = P.alfO; else if (h(x, y, 634) < 0.08) c = P.alfRS; }
    R.pset(x, y, c); }
  for (let y = y0; y <= y1; y += 2) { R.pset(x0 - 1, y, P.alfC); R.pset(x0 - 2, y, P.alfC); R.pset(x1 + 1, y, P.alfC); R.pset(x1 + 2, y, P.alfC); }
}

// las cortinas de terciopelo con pliegues y su alzapaño (x0–x1, y0–y1); lado: hacia dónde se recogen
function e_cortina(R, x0, x1, y0, y1, cols, lado = 1) {
  const [c, cL, cS] = cols, w = x1 - x0, ya = Math.round(y0 + (y1 - y0) * 0.6);
  for (let y = y0; y <= y1; y++) { const cin = y < ya ? 0 : 1 - Math.abs(y - ya - 4) / 18, enc = Math.max(0, Math.min(0.45, 0.45 - (y - ya) * 0)) * (y > ya - 6 && y < ya + 6 ? 1 : 0);
    const a = lado > 0 ? x0 : Math.round(x0 + w * enc * 0.6), b = lado > 0 ? Math.round(x1 - w * enc * 0.6) : x1;
    for (let x = a; x <= b; x++) { const f = Math.sin((x - x0) * 1.3 + (y > ya ? (y - ya) * 0.08 * lado : 0)); R.pset(x, y, f > 0.55 ? cL : f < -0.45 ? cS : c); } void cin; }
  R.rect(x0, ya - 1, x1, ya + 1, e_C.laton); R.rect(x0, ya - 1, x1, ya - 1, e_C.latonL); R.pset(lado > 0 ? x1 : x0, ya + 2, e_C.laton); R.pset(lado > 0 ? x1 : x0, ya + 3, e_C.latonS);
}

// el despacho de Londres en 1942 (ver la cabecera de hielo)
function e_londres(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C;
  e_fijo(R, 'lon', () => {
    const B = R.buf;
    // el techo y la cornisa de escayola con dentículos
    e_degradado(R, 0, 0, 319, 8, [P.techoS, P.techo], 640);
    rect(0, 9, 319, 12, P.yeso); for (let x = 0; x < 320; x += 4) rect(x, 11, x + 1, 12, P.yesoS); rect(0, 9, 319, 9, P.yesoL); rect(0, 13, 319, 13, P.yesoS);
    // el papel pintado verde de damasco (rombos, florones y rayas finas), más suave en la esquina de Atom
    for (let y = 14; y < 112; y++) for (let x = 0; x < 320; x++) {
      const u = x % 18, v = (y - 14) % 22, suave = x > 270 && y < 50, d = Math.abs(u - 9) + Math.abs(v - 11), d2 = Math.abs(u - 9) + Math.min(v, 22 - v);
      let c = P.pap;
      if (u === 0) c = suave ? P.papM : P.papS;
      else if (!suave && (d === 7 || d === 0 || d === 2)) c = P.papL;
      else if (d < 2 || d2 === 2 || (!suave && (u === 9 && Math.abs(v - 11) < 5))) c = P.papM;
      if (h(x >> 2, y >> 2, 641) < 0.07) c = e_mezcla(c, P.papS, 0.45);
      if (y < 20 && ((x + y) & 1)) c = P.papS;
      B[y * 320 + x] = c; }
    rect(0, 26, 319, 27, P.caoba); rect(0, 26, 319, 26, P.caobaL); rect(0, 28, 319, 28, P.papS);   // el riel de cuadros
    e_paneles(R, 0, 112, 319, 140, 34);
    rect(0, 140, 319, 144, P.caobaD); rect(0, 141, 319, 141, P.caobaS); rect(0, 140, 319, 140, P.caobaL);   // el rodapié
    e_espiga(R, 0, 145, 319, 179, [P.parq, P.parqL, P.parqS, P.parqD]);
    for (let x = 0; x < 320; x++) { pset(x, 145, P.parqD); if (x & 1) pset(x, 146, P.parqD); }
    e_alfombra(R, 30, 154, 192, 176);
    // ── la ventana de guillotina: el cielo de lluvia, San Pablo, los tejados y las chimeneas (lo animado va encima)
    rect(10, 30, 66, 114, P.caobaD); rect(12, 32, 64, 112, P.yeso);
    e_degradado(R, 16, 34, 60, 108, [P.ll0, P.ll1, P.ll2, P.ll3], 642, 0.4);
    R.recorte([16, 34, 60, 108]);
    { const cx = 46, by = 76; poligono([[cx - 10, by], [cx - 10, by - 4], [cx + 10, by - 4], [cx + 10, by]], P.lejos); for (let j = 0; j <= 9; j++) { const w = Math.round(Math.sqrt(1 - (j / 10) ** 2) * 9); rect(cx - w, by - 4 - j, cx + w, by - 4 - j, j > 6 ? P.lejos : P.lejosS); }
      rect(cx - 1, by - 18, cx + 1, by - 14, P.lejosS); pset(cx, by - 19, P.lejosS); rect(cx - 14, by - 8, cx - 12, by, P.lejos); rect(cx + 12, by - 8, cx + 14, by, P.lejos); }
    for (let x = 16; x <= 60; x++) { const y = 80 + Math.round(Math.sin(x * 0.7) * 1.5 + h(x >> 2, 1, 643) * 4); rect(x, y, x, 108, P.lejosS); }
    for (const [x0, w, y0] of [[14, 18, 88], [30, 16, 92], [44, 20, 86]]) { poligono([[x0, y0 + 6], [x0 + w / 2, y0], [x0 + w, y0 + 6]], P.piz); for (let y = y0 + 1; y < y0 + 6; y += 2) linea(x0 + 1, y, x0 + w - 1, y, P.pizS); rect(x0, y0 + 6, x0 + w, 108, P.lad); for (let y = y0 + 8; y < 108; y += 3) for (let x = x0 + ((y >> 1) & 1) * 2; x < x0 + w; x += 4) pset(x, y, P.ladS); for (let wy = y0 + 10; wy < 106; wy += 8) for (let wx = x0 + 3; wx < x0 + w - 2; wx += 6) { rect(wx, wy, wx + 2, wy + 3, P.pizS); pset(wx, wy, P.ll1); } }
    for (const [x, y] of [[22, 86], [36, 90], [54, 84]]) { rect(x - 3, y - 6, x + 3, y, P.lad); rect(x - 3, y - 6, x - 3, y, P.ladS); rect(x - 4, y - 7, x + 4, y - 7, P.ladS); for (let k = -2; k <= 2; k += 2) { rect(x + k, y - 10, x + k, y - 8, P.olla); } }
    R.recorte(null);
    // los marcos de la ventana (el de en medio va con la vida, por encima de la lluvia), el alféizar y el radiador
    rect(10, 112, 68, 116, P.yeso); rect(10, 112, 68, 112, P.yesoL); rect(10, 116, 68, 116, P.yesoS);
    for (let x = 20; x < 58; x += 3) { rect(x, 120, x + 1, 138, P.aceroL); pset(x, 120, C.blanco); rect(x + 2, 120, x + 2, 138, P.aceroS); } rect(18, 122, 59, 123, P.acero); rect(18, 134, 59, 135, P.acero); rect(18, 138, 59, 139, P.aceroD);
    // las cortinas de terciopelo y la galería de arriba
    e_cortina(R, 4, 17, 30, 120, [P.terc, P.tercL, P.tercS], 1); e_cortina(R, 59, 72, 30, 120, [P.terc, P.tercL, P.tercS], -1);
    rect(2, 24, 74, 31, P.caobaS); rect(2, 24, 74, 24, P.caobaL); for (let x = 4; x < 74; x += 6) { rect(x, 31, x + 2, 33, P.terc); pset(x + 1, 34, P.laton); }
    // ── el mapa del Atlántico en su marco
    rect(78, 28, 220, 116, P.caobaD); rect(80, 30, 218, 114, P.caoba); rect(80, 30, 218, 30, P.caobaL); rect(82, 32, 216, 112, P.laton); rect(82, 32, 216, 32, P.latonL);
    e_atlantico(R, 83, 33, 215, 111, e_VGEN);
    for (const [x, y, c] of [[96, 50, P.rojoM], [190, 62, P.azulM], [150, 98, P.rojoM], [118, 88, P.laton]]) { disco(x, y, 1, c); pset(x - 1, y - 1, C.blanco); pset(x + 1, y + 2, P.caobaD); }
    for (let x = 80; x <= 218; x++) pset(x, 117, ((x & 1) ? P.papS : P.pap));   // la sombra del marco
    // los apliques de latón con la tulipa y su luz cálida en la pared
    for (const x of [72, 226]) { e_foco(R, x, 48, 22, 26, P.luzC, 0.3); rect(x - 1, 54, x + 1, 62, P.latonS); rect(x - 2, 60, x + 2, 62, P.laton); linea(x, 54, x, 50, P.laton);
      poligono([[x - 4, 42], [x + 4, 42], [x + 2, 50], [x - 2, 50]], P.yesoL); rect(x - 4, 42, x + 4, 42, C.blanco); pset(x - 2, 46, C.blanco); }
    // ── la librería: estantes de caoba con libros de lomos de colores (bandas doradas, sin letras), un globo encima
    rect(224, 38, 266, 142, P.caobaD); rect(226, 40, 264, 140, P.caobaS);
    for (let s = 0; s < 5; s++) { const yb = 58 + s * 20; rect(225, yb, 265, yb + 2, P.caoba); rect(225, yb, 265, yb, P.caobaL);
      let x = 227; while (x < 262) { const w = 2 + Math.floor(h(x, s, 650) * 3), a = 11 + Math.floor(h(x, s, 651) * 6), c = P.libro[Math.floor(h(x, s, 652) * 8)];
        if (h(x, s, 653) < 0.08) { x += 3; continue; }
        if (h(x, s, 654) < 0.07 && x < 254) { for (let j = 0; j < 3; j++) rect(x, yb - 2 - j * 3, x + 9, yb - 1 - j * 3, P.libro[(s + j) % 8]); x += 11; continue; }
        rect(x, yb - a, Math.min(262, x + w - 1), yb - 1, c); pset(x, yb - a, e_mezcla(c, C.blanco, 0.3)); rect(x, yb - a + 2, Math.min(262, x + w - 1), yb - a + 2, P.laton); rect(x, yb - 4, Math.min(262, x + w - 1), yb - 4, P.latonS); if (w > 2) rect(x + w - 1, yb - a, x + w - 1, yb - 1, e_mezcla(c, C.k, 0.4)); x += w; } }
    { const gx = 245, gy = 31; rect(gx - 1, 35, gx + 1, 38, P.laton); rect(gx - 4, 37, gx + 4, 38, P.caoba); disco(gx, gy, 5, P.marS); disco(gx, gy, 4, P.mar); poligono([[gx - 3, gy - 2], [gx, gy - 4], [gx + 1, gy], [gx - 2, gy + 2]], P.papelS); pset(gx - 2, gy - 3, C.blanco); linea(gx - 6, gy + 4, gx + 5, gy - 6, P.laton); }
    // ── la chimenea: el cuadro del velero, la repisa con el reloj y los candeleros, el mármol y la boca del fuego
    rect(282, 50, 316, 78, P.laton); rect(283, 51, 315, 77, P.latonS); e_degradado(R, 285, 53, 313, 66, [P.ll2, P.ll3, P.yeso], 655, 0.4); e_degradado(R, 285, 67, 313, 75, [P.marS, P.marD], 656, 0.5);
    poligono([[294, 70], [306, 70], [304, 73], [296, 73]], P.caobaD); linea(299, 57, 299, 70, P.caobaD); poligono([[300, 58], [306, 68], [300, 68]], P.yesoL); poligono([[298, 59], [293, 68], [298, 68]], P.yesoL);
    rect(266, 92, 319, 96, P.caoba); rect(266, 92, 319, 92, P.caobaL); rect(266, 96, 319, 96, P.caobaD);
    { const x = 296; rect(x - 7, 80, x + 7, 91, P.caobaD); poligono([[x - 7, 80], [x, 75], [x + 7, 80]], P.caobaD); disco(x, 84, 5, P.laton); disco(x, 84, 4, P.papelL); rect(x - 7, 91, x + 7, 91, P.laton); }
    for (const x of [272, 314]) { rect(x - 2, 90, x + 2, 91, P.laton); rect(x - 1, 84, x + 1, 89, P.latonS); rect(x - 1, 78, x + 1, 83, P.papelL); pset(x, 77, P.caobaD); }
    rect(268, 97, 319, 140, P.marmol); for (let y = 97; y < 140; y++) for (let x = 268; x < 320; x++) if (Math.abs(Math.sin(x * 0.15 + y * 0.31) + Math.sin(y * 0.07 - x * 0.05)) < 0.06 || h(x, y, 657) < 0.04) pset(x, y, P.marmolL);
    rect(268, 97, 319, 98, P.marmolL); rect(278, 106, 312, 140, P.hierro); rect(280, 108, 310, 140, C.k); rect(278, 106, 312, 106, P.hierroL);
    poligono([[280, 108], [310, 108], [306, 116], [284, 116]], P.hierro);
    for (let x = 284; x < 308; x += 3) rect(x, 128, x, 138, P.hierroL); rect(283, 128, 307, 129, P.hierroL); rect(283, 137, 307, 138, P.hierroL);
    rect(274, 138, 316, 141, P.laton); rect(274, 138, 316, 138, P.latonL); for (const x of [275, 315]) disco(x, 138, 2, P.latonL);
    // el cubo del carbón y el atizador
    rect(262, 128, 268, 142, P.hierro); rect(262, 128, 268, 128, P.hierroL); for (let x = 263; x < 268; x += 2) pset(x, 127, P.hierroL); linea(270, 112, 273, 140, P.latonS);
    // ── el sillón chester de cuero con sus botones
    { const x0 = 226, x1 = 266; rect(x0 + 4, 112, x1 - 4, 132, P.cuero); rect(x0 + 4, 112, x1 - 4, 113, P.cueroL);
      for (let y = 116; y < 132; y += 5) for (let x = x0 + 7 + ((y >> 2) & 1) * 3; x < x1 - 5; x += 6) { pset(x, y, P.cueroS); pset(x + 1, y + 1, P.cueroL); }
      for (const ax of [x0, x1 - 8]) { rect(ax, 122, ax + 8, 144, P.cuero); disco(ax + 4, 123, 4, P.cueroL); disco(ax + 4, 123, 2, P.cuero); rect(ax + 7, 126, ax + 8, 144, P.cueroS); for (let y = 128; y < 144; y += 4) pset(ax + 4, y, P.cueroS); }
      rect(x0 + 8, 132, x1 - 8, 136, P.cueroL); rect(x0 + 8, 137, x1 - 8, 144, P.cueroS); for (const ax of [x0 + 2, x1 - 3]) rect(ax, 144, ax + 1, 146, P.caobaD); }
    // ── el perchero con el gabán, el sombrero y el paraguas que gotea
    { const x = 8; rect(x, 92, x + 1, 150, P.caobaD); rect(x - 5, 149, x + 6, 151, P.caobaD); linea(x - 3, 94, x + 4, 94, P.caobaD);
      poligono([[x - 6, 96], [x + 7, 96], [x + 9, 132], [x - 7, 132]], P.ll0); linea(x, 96, x, 132, P.pizS); rect(x - 7, 131, x + 9, 132, P.pizS); for (let y = 102; y < 128; y += 7) pset(x + 2, y, P.laton);
      rect(x - 5, 88, x + 6, 92, P.hierro); rect(x - 7, 92, x + 8, 93, P.hierro); rect(x - 5, 90, x + 6, 90, P.terc);
      linea(x + 12, 112, x + 18, 148, P.hierro); poligono([[x + 13, 120], [x + 9, 144], [x + 16, 146], [x + 18, 124]], P.hierro); linea(x + 13, 122, x + 12, 142, P.hierroL); disco(x + 12, 111, 1, P.caobaL);
      for (let k = 0; k < 9; k++) pset(x + 10 + k, 150 + (k & 1), P.charco); }
  });
  // ── la vida: lluvia, gotas en el cristal, globos de barrera, humo, el fuego, el reloj, el mapa y la gota del paraguas
  R.recorte([16, 34, 60, 108]);
  for (const [bx, by, k] of [[26, 46, 0], [52, 40, 1]]) { const x = Math.round(bx + Math.sin(t * 0.3 + k * 2) * 2), y = Math.round(by + Math.sin(t * 0.5 + k) * 1.5);
    linea(x, y + 3, x - 2, 96, P.ll0); for (let j = -3; j <= 3; j++) { const w = Math.round(Math.sqrt(1 - (j / 3.6) ** 2) * 7); rect(x - w, y + j, x + w, y + j, j < -1 ? P.globoL : j > 1 ? P.globoS : P.globo); }
    poligono([[x + 5, y - 1], [x + 10, y - 4], [x + 10, y], [x + 6, y + 1]], P.globoS); poligono([[x + 5, y + 1], [x + 9, y + 4], [x + 6, y + 2]], P.globoS); pset(x - 3, y - 2, C.blanco); }
  for (const [cx, cy, k] of [[22, 78, 0], [36, 82, 1], [54, 76, 2]]) for (let i = 0; i < 6; i++) { const u = ((t * 0.35 + i / 6 + k * 0.3) % 1), x = Math.round(cx - u * 14 + Math.sin(u * 6 + k) * 1.5), y = Math.round(cy - u * 16), r = Math.round(1 + u * 2.5);
    for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) if (ii * ii + j * j <= r * r && ((x + ii + y + j + i) & 1) && u < 0.95) pset(x + ii, y + j, u < 0.5 ? P.ll2 : P.ll3); }
  for (let k = 0; k < 46; k++) { const x = 14 + ((k * 37 + Math.floor(t * 24) * 0 + t * 22) % 52), y = 30 + ((k * 23 + t * 150) % 84); linea(Math.round(x), Math.round(y), Math.round(x - 1), Math.round(y + 3), k % 3 ? P.ll3 : C.blanco); }
  for (let k = 0; k < 9; k++) { const x = 18 + Math.round(h(k, 1, 660) * 40), v = 4 + h(k, 2, 660) * 8, y0 = 34 + ((h(k, 3, 660) * 74 + t * v) % 74), y = Math.round(y0); for (let j = 1; j < 6; j++) if (((y + j) & 1) === 0) pset(x, y - j, P.ll3); rect(x, y, x + 1, y + 1, C.blanco); pset(x + 1, y + 1, P.ll1); }
  R.recorte(null);
  rect(37, 34, 39, 108, P.yeso); rect(37, 34, 37, 108, P.yesoL); rect(16, 69, 60, 72, P.yeso); rect(16, 69, 60, 69, P.yesoL); rect(16, 72, 60, 72, P.yesoS); rect(16, 50, 60, 51, P.yeso); rect(16, 90, 60, 91, P.yeso);
  for (const [a, b, c, d] of [[16, 34, 37, 50], [39, 34, 60, 50], [16, 52, 37, 69], [39, 52, 60, 69], [16, 73, 37, 90], [39, 73, 60, 90], [16, 92, 37, 108], [39, 92, 60, 108]]) { linea(a + 1, b + 1, c - 1, d - 1, P.papelS); linea(c - 1, b + 1, a + 1, d - 1, P.papelS); }
  // el fuego: llamas que bailan, brasas, chispas y su luz en el guardafuegos y el suelo
  for (let x = 282; x < 309; x++) { const a = 6 + Math.round(3 * Math.sin(x * 0.9 + t * 9) + 3 * Math.sin(x * 0.37 - t * 6.3) + h(x, Math.floor(t * 12), 661) * 3 - Math.abs(x - 295) * 0.25);
    for (let y = 127; y > 127 - a; y--) { const f = (127 - y) / a; pset(x, y, f > 0.8 ? P.fuegoS : f > 0.45 ? P.fuego : P.fuegoL); } }
  for (let x = 283; x < 308; x += 2) { rect(x, 126, x + 1, 127, P.brasa); if (Math.sin(t * 7 + x) > 0.4) pset(x, 126, P.fuego); }
  for (let k = 0; k < 4; k++) { const u = ((t * 0.9 + k * 0.27) % 1), x = Math.round(290 + k * 5 + Math.sin(t * 5 + k) * 2), y = Math.round(124 - u * 18); if (y > 110) pset(x, y, P.fuegoL); }
  if (Math.sin(t * 8) > -0.3) for (let x = 276; x < 316; x += 2) pset(x, 139, P.latonL);
  for (let x = 274; x < 318; x += 3) if (Math.sin(t * 9 + x) > 0) pset(x, 142 + ((x >> 1) & 1), P.fuego);
  // las agujas del reloj de la repisa
  { const a = t * 0.5, b = t * 0.04; linea(296, 84, Math.round(296 + Math.sin(a) * 3), Math.round(84 - Math.cos(a) * 3), C.k); linea(296, 84, Math.round(296 + Math.sin(b) * 2), Math.round(84 - Math.cos(b) * 2), C.k); }
  e_atlanticoVivo(R, t, 83, 33, 215, 111, e_VGEN, 1);
  // la gota del paraguas y su onda en el charco
  { const u = (t % 1.3) / 1.3, x = 20; if (u < 0.6) pset(x, Math.round(146 + u * 6), P.charco); else { const r = Math.round((u - 0.6) * 8); pset(x - r, 151, C.blanco); pset(x + r, 151, C.blanco); } }
  return { suelo: 162, libre: [70, 196], mapa: [83, 33, 215, 111], ventana: [16, 34, 60, 108], chimenea: [280, 108, 310, 140], mesa: [196, 144, 304, 178] };
}

// la mesa del despacho de Londres (va delante de los personajes): caoba con cajones y tiradores de latón, la lámpara
// de banquero de tulipa verde con su luz, el teléfono negro, los papeles, el tintero, la taza de té que humea y la pipa
// en el cenicero con su hilo de humo
function e_mesaLondres(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C, x0 = 196, x1 = 304;
  rect(x0 - 2, 144, x1 + 2, 149, P.caobaD); rect(x0 - 1, 144, x1 + 1, 147, P.caoba); rect(x0 - 1, 144, x1 + 1, 144, P.caobaL); rect(x0 + 2, 145, x1 - 2, 145, P.verdeL);
  for (const [a, b] of [[x0, x0 + 38], [x1 - 38, x1]]) { rect(a, 149, b, 178, P.caoba); rect(a, 149, a, 178, P.caobaL); rect(b, 149, b, 178, P.caobaD);
    for (let k = 0; k < 3; k++) { const ya = 152 + k * 9; rect(a + 3, ya, b - 3, ya + 7, P.caobaS); rect(a + 4, ya + 1, b - 4, ya + 6, P.caoba); rect(a + 4, ya + 1, b - 4, ya + 1, P.caobaL); rect((a + b) / 2 - 3, ya + 3, (a + b) / 2 + 3, ya + 4, P.laton); pset((a + b) / 2 - 3, ya + 3, P.latonL);
      for (let x = a + 6; x < b - 6; x++) if (h(x >> 2, ya, 670) < 0.2) pset(x, ya + 5, P.caobaS); } }
  rect(x0 + 39, 149, x1 - 39, 160, P.caobaS); rect(x0 + 39, 160, x1 - 39, 178, P.caobaD); rect(x0 + 39, 149, x1 - 39, 150, P.caoba); rect(x0 + 44, 153, x1 - 44, 154, P.laton);
  rect(x0 - 2, 178, x1 + 2, 179, P.caobaD);
  // el teléfono de baquelita negra
  { const x = 210; rect(x - 6, 138, x + 6, 144, P.negro); rect(x - 5, 138, x + 5, 138, P.negroL); disco(x, 141, 2, P.negroL); pset(x, 141, C.blanco); rect(x - 7, 134, x + 7, 136, P.negro); rect(x - 8, 133, x - 6, 137, P.negro); rect(x + 6, 133, x + 8, 137, P.negro); rect(x - 6, 134, x + 6, 134, P.negroL); }
  // los papeles (rayas, sin letras) y el tintero con la pluma
  for (let k = 0; k < 4; k++) rect(224 + k, 142 - k, 244 + k, 143 - k, k % 2 ? P.papelS : P.papelL); for (let x = 228; x < 244; x += 3) pset(x, 139, P.costa);
  rect(248, 139, 254, 143, P.negroL); rect(249, 138, 253, 138, P.laton); linea(252, 137, 258, 130, P.caobaD); pset(258, 130, P.latonL);
  // la taza de té con su platito y el vapor
  { const x = 266; rect(x - 5, 143, x + 5, 143, C.blanco); rect(x - 3, 138, x + 3, 142, C.blanco); rect(x - 3, 138, x + 3, 138, P.laton); pset(x + 4, 139, C.blanco); pset(x + 5, 140, C.blanco); pset(x + 4, 141, C.blanco); rect(x + 3, 139, x + 3, 142, P.blancoS);
    for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; for (let j = 0; j < 3; j++) { const y = Math.round(136 - u * 14 - j), xx = Math.round(x - 1 + k + Math.sin(u * 7 + k + j * 0.6) * 2); if (u < 0.85 && ((y + k) & 1)) pset(xx, y, P.vapor); } } }
  // el cenicero con la pipa y su humo que se enrosca
  { const x = 238; rect(x - 4, 143, x + 4, 144, P.aceroS); rect(x - 3, 142, x + 3, 142, P.acero); rect(x - 6, 140, x - 2, 142, P.caobaD); linea(x - 2, 141, x + 4, 141, P.caobaD); pset(x - 4, 140, P.fuego);
    for (let i = 0; i < 14; i++) { const u = ((t * 0.25 + i / 14) % 1), y = Math.round(138 - u * 34), xx = Math.round(x - 4 + Math.sin(u * 9 + t) * (2 + u * 4)); if ((i + Math.floor(t * 4)) % 5) pset(xx, y, u < 0.5 ? P.ll3 : P.ll2); } }
  // la lámpara de banquero: pie de latón, tulipa verde y su luz sobre la mesa
  { const x = 288; e_foco(R, x, 145, 26, 5, P.luzC, 0.5); rect(x - 5, 142, x + 5, 144, P.laton); rect(x - 5, 142, x + 5, 142, P.latonL); rect(x, 130, x, 141, P.latonS);
    poligono([[x - 9, 134], [x - 7, 127], [x + 7, 127], [x + 9, 134]], P.verdeL); rect(x - 7, 128, x + 6, 128, P.verdeLL); rect(x - 9, 134, x + 9, 134, P.latonS); linea(x - 6, 129, x - 7, 132, P.verdeLL);
    for (let i = -8; i <= 8; i++) pset(x + i, 135, P.luzC); }
  return { mesa: [x0, 144, x1, 178], telefono: [210, 136], taza: [266, 138], lampara: [288, 130] };
}

// el mapa de cerca (cámara 'mapa'): el Atlántico grande con la cuadrícula, la rosa de los vientos, chinchetas, notas
// clavadas, una regla y el cerco de una taza; los convoyes y los submarinos más grandes; o.dibuja: el iceberg que pasa
// a portaaviones, trazado a lápiz
function e_mapaCerca(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C, V = e_VCER;
  e_fijo(R, 'lonMapa', () => {
    e_atlantico(R, 0, 0, 319, 179, V, { grande: true });
    const G = e_proy(0, 0, 319, 179, V);
    // la rosa de los vientos (sin letras: la punta norte en rojo)
    { const cx = Math.round(G.x(-58)), cy = Math.round(G.y(31)); disco(cx, cy, 13, P.marS); disco(cx, cy, 12, P.marL); disco(cx, cy, 10, P.mar);
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, L = k % 2 ? 8 : 15, c = k === 0 ? P.rojoM : k % 2 ? P.marD : P.azulM; poligono([[cx + Math.sin(a) * L, cy - Math.cos(a) * L], [cx + Math.sin(a + 0.4) * 3, cy - Math.cos(a + 0.4) * 3], [cx, cy], [cx + Math.sin(a - 0.4) * 3, cy - Math.cos(a - 0.4) * 3]], c); }
      disco(cx, cy, 2, P.laton); pset(cx, cy, P.latonL); }
    // una regla de latón con sus marcas y cifras
    { const y = 168; rect(150, y, 292, y + 7, P.laton); rect(150, y, 292, y, P.latonL); rect(150, y + 7, 292, y + 7, P.latonS); for (let x = 152; x < 292; x += 4) rect(x, y + 1, x, y + ((x - 152) % 20 === 0 ? 4 : 2), P.latonS);
      e_cifras(R, '0', 151, y + 2, P.caobaD); e_cifras(R, '500', 226, y + 2, P.caobaD); }
    // el cerco de una taza de té
    for (let a = 0; a < 6.28; a += 0.03) { const r = 13 + Math.sin(a * 3) * 0.6; if (Math.sin(a * 2 + 1) > -0.6) pset(Math.round(G.x(-12) + Math.cos(a) * r), Math.round(G.y(38) + Math.sin(a) * r * 0.9), e_mezcla(P.mar, P.costa, 0.5)); }
    // notas clavadas con rayas
    for (const [x, y, w, a, r] of [[14, 96, 30, 22, -1], [236, 120, 34, 26, 1]]) { for (let j = 0; j < a; j++) rect(x + Math.round(j * r * 0.1), y + j, x + w + Math.round(j * r * 0.1), y + j, j === 0 ? P.papelL : P.papel); rect(x + 2, y + a, x + w + 2, y + a + 1, e_mezcla(P.mar, C.k, 0.3));
      for (let j = 6; j < a - 2; j += 4) linea(x + 4 + Math.round(j * r * 0.1), y + j, x + w - 6 - (j % 8) + Math.round(j * r * 0.1), y + j, j === 6 ? P.rojoM : P.azulM); disco(x + w / 2, y + 2, 2, P.rojoM); pset(x + w / 2 - 1, y + 1, C.blanco); }
    // las chinchetas de colores con su sombra y el hilo rojo entre Halifax y Liverpool
    const ch = [[-63.6, 44.6, P.azulM], [-3, 53.6, P.rojoM], [-20, 64.5, P.laton], [-53, 48, P.laton], [-35, 46, P.rojoM]];
    linea(Math.round(G.x(-63.6)), Math.round(G.y(44.6)), Math.round(G.x(-3)), Math.round(G.y(53.6)) - 1, e_mezcla(P.rojoM, P.mar, 0.3), 3);
    for (const [lo, la, c] of ch) { const x = Math.round(G.x(lo)), y = Math.round(G.y(la)); pset(x + 2, y + 3, P.marD); pset(x + 3, y + 3, P.marD); disco(x, y, 3, C.k); disco(x, y, 2, c); pset(x - 1, y - 1, C.blanco); }
    // el borde: el marco de caoba abajo y a la izquierda (el mapa está en la pared) y la sombra
    rect(0, 174, 319, 179, P.caobaD); rect(0, 174, 319, 174, P.caobaL); rect(0, 0, 4, 179, P.caobaD); rect(4, 0, 4, 173, P.caobaL);
    for (let x = 5; x < 320; x++) pset(x, 173, e_mezcla(R.pget(x, 173), C.k, 0.3));
  });
  e_atlanticoVivo(R, t, 0, 0, 319, 179, V, 2);
  // el iceberg que se convierte en portaaviones, dibujado a lápiz en mitad de la zona sin aviones
  const d = o.dibuja ?? 0, G = e_proy(0, 0, 319, 179, V), cx = Math.round(G.x(-34)), cy = Math.round(G.y(53));
  const ICE = [[-30, 8], [-24, -2], [-16, -6], [-12, -18], [-5, -12], [1, -24], [8, -10], [16, -13], [22, -3], [30, 8]], NAV = [[-40, -6], [40, -6], [36, 8], [-32, 8], [-40, -6]], ISLA = [[12, -6], [12, -15], [15, -19], [20, -19], [20, -6]];
  const traza = (pts, u, c, punteado = 0) => { let tot = 0; const L = []; for (let k = 0; k < pts.length - 1; k++) { const l = Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]); L.push(l); tot += l; }
    let q = u * tot, fin = null; for (let k = 0; k < L.length && q > 0; k++) { const f = Math.min(1, q / L[k]), [a, b] = pts[k], x1 = a + (pts[k + 1][0] - a) * f, y1 = b + (pts[k + 1][1] - b) * f;
      linea(cx + a, cy + b, Math.round(cx + x1), Math.round(cy + y1), c, punteado); linea(cx + a, cy + b + 1, Math.round(cx + x1), Math.round(cy + y1 + 1), c, punteado); q -= L[k]; fin = [cx + x1, cy + y1]; } return fin; };
  if (d > 0) {
    const ui = Math.min(1, d / 0.45), rel = Math.max(0, Math.min(1, (d - 0.45) / 0.1)), un = Math.max(0, (d - 0.55) / 0.45);
    if (rel > 0) { R.recorte([0, 0, 319, 179]); poligono(ICE.map(([a, b]) => [cx + a, cy + b]), (x, y) => (un > 0 && ((x + y) & 1)) ? R.pget(x, y) : ((x + y) % 5 < rel * 5 ? P.banquisa : P.banquisaS)); R.recorte(null); }
    const p1 = traza(ICE, ui, un > 0 ? P.marD : P.azulM, un > 0 ? 2 : 0);
    for (let x = -36; x <= 36; x += 3) if (ui > 0.2) pset(cx + x, cy + 9, P.marD);   // la línea del agua
    let p2 = null; if (un > 0) { poligono(NAV.map(([a, b]) => [cx + a, cy + b]), (x, y) => (y - cy) % 4 === 0 || un < 0.5 ? R.pget(x, y) : P.aceroL); p2 = traza(NAV, Math.min(1, un * 1.6), P.azulM); if (un > 0.55) { traza(ISLA, Math.min(1, (un - 0.55) * 3), P.azulM); }
      if (un > 0.8) { for (let x = -36; x < 36; x += 5) pset(cx + x, cy - 7, C.blanco); for (let k = 0; k < 3; k++) { const ax = cx - 30 + k * 12 + Math.round(Math.max(0, un - 0.9) * 40 * (k === 0 ? 1 : 0)), ay = cy - 9 - (k === 0 ? Math.round(Math.max(0, un - 0.9) * 30) : 0); linea(ax - 3, ay, ax + 3, ay, P.azulM); linea(ax, ay - 1, ax, ay + 2, P.azulM); pset(ax - 1, ay + 2, P.azulM); pset(ax + 1, ay + 2, P.azulM); } } }
    const p = p2 ?? p1; if (p && d < 0.999 && Math.sin(t * 20) > -0.3) { pset(Math.round(p[0]), Math.round(p[1]) - 1, C.blanco); pset(Math.round(p[0]) + 1, Math.round(p[1]), C.blanco); pset(Math.round(p[0]) - 1, Math.round(p[1]), C.blanco); }
  }
  return { iceberg: [cx, cy], zona: [Math.round(G.x(-52)), Math.round(G.y(63)), Math.round(G.x(-14)), Math.round(G.y(42))], halifax: [Math.round(G.x(-63.6)), Math.round(G.y(44.6))], liverpool: [Math.round(G.x(-3)), Math.round(G.y(53.6))] };
}

// ladrillo visto (encalado o no) en (x0, y0)–(x1, y1): hiladas a matajunta, ladrillos de tono distinto, desconchones
// por los que asoma el rojo y la escarcha que baja desde arriba; suave: sin contraste (la esquina de Atom)
function e_ladrillo(R, x0, y0, x1, y1, k = 0) {
  const P = e_C, B = R.buf;
  for (let y = y0; y <= y1; y++) { const f = Math.floor(y / 5), off = (f & 1) * 6;
    for (let x = x0; x <= x1; x++) { const suave = x > 270 && y < 50, jx = (x + off) % 12 === 0, jy = y % 5 === 0, q = h(Math.floor((x + off) / 12), f, 680 + k);
      let c = (jx || jy) ? (suave ? P.ladBS : P.junta) : q < 0.18 ? P.ladBS : q > 0.85 ? P.ladBL : P.ladB;
      if (!suave && !jx && !jy && h(x >> 2, y >> 1, 681 + k) < 0.05) c = P.ladR;
      if (!jx && !jy && (x + off) % 12 === 1) c = suave ? c : P.ladBL;
      const fr = (y - y0) / 26 + (h(x >> 1, y >> 1, 682) - 0.5) * 0.6; if (fr < 0.7 && ((x + y) & 1)) c = P.escarcha;
      B[y * 320 + x] = c; } }
}

// el taller frío (ver la cabecera de hielo)
function e_taller(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C;
  e_fijo(R, 'tal', () => {
    // el techo de tablas con las vigas
    e_degradado(R, 0, 0, 319, 19, [P.vigasS, P.vigas], 683);
    for (let x = 0; x < 320; x += 7) linea(x, 0, x, 13, P.vigasS);
    rect(0, 14, 319, 19, P.vigas); rect(0, 14, 319, 14, e_mezcla(P.vigas, C.blanco, 0.2)); rect(0, 19, 319, 19, P.vigasS);
    for (let x = 4; x < 320; x += 11) if (h(x, 1, 684) < 0.5) { const l = 2 + Math.floor(h(x, 2, 684) * 4); linea(x, 20, x, 20 + l, P.escarcha); }   // carámbanos de la viga
    e_ladrillo(R, 0, 20, 319, 141);
    // los dos ventanales altos de hierro: el cielo de nieve y la escarcha en las esquinas de cada vidrio
    for (const wx of [38, 138]) { rect(wx - 2, 24, wx + 58, 64, P.aceroD); e_degradado(R, wx, 26, wx + 56, 62, [P.cieloI[2], P.cieloI[3], P.cieloI[4], P.nieve], 685 + wx, 0.4);
      R.recorte([wx, 26, wx + 56, 62]); for (let x = wx; x <= wx + 56; x++) { const y = 54 + Math.round(Math.sin(x * 0.2 + wx) * 2 + h(x >> 3, wx, 686) * 3); rect(x, y, x, 62, P.nieveS); pset(x, y, P.nieve); }
      for (const [px, a] of [[wx + 8, 10], [wx + 30, 14], [wx + 46, 8]]) { poligono([[px - 4, 58], [px, 58 - a], [px + 4, 58]], P.pino0); poligono([[px - 3, 56], [px, 58 - a], [px - 1, 56]], P.nieveM); } R.recorte(null);
      rect(wx + 1, 63, wx + 57, 66, P.ladBL); rect(wx + 1, 66, wx + 57, 66, P.ladBS); }
    // la puerta del pasillo: el marco de madera, el pasillo oscuro con la bombilla al fondo
    rect(4, 76, 32, 141, P.madD); rect(6, 78, 30, 141, P.vigasS); e_degradado(R, 7, 79, 29, 141, [P.vigasS, P.vigas, P.aceroD], 687, 0.3); disco(18, 86, 3, P.luzC); e_foco(R, 18, 90, 12, 16, P.luzC, 0.3); rect(7, 128, 29, 141, P.cemS); rect(4, 76, 32, 77, P.mad); rect(4, 76, 5, 141, P.madL); rect(31, 76, 32, 141, P.madS);
    // la estantería con los moldes de madera y, debajo, los sacos de serrín
    rect(36, 90, 100, 92, P.mad); rect(36, 90, 100, 90, P.madL); rect(36, 93, 100, 93, P.madD); for (const x of [40, 96]) { linea(x, 93, x - 3, 98, P.madS); }
    for (const [x, w] of [[38, 18], [58, 20], [80, 18]]) { rect(x, 80, x + w, 89, P.madS); rect(x + 1, 81, x + w - 1, 88, P.mad); rect(x + 1, 81, x + w - 1, 81, P.madL); for (let xx = x + 3; xx < x + w; xx += 5) rect(xx, 82, xx, 88, P.madS); rect(x + 2, 80, x + w - 2, 80, P.madD); }
    for (const [x, y, w] of [[36, 120, 22], [58, 122, 20], [76, 120, 22], [46, 104, 22], [68, 106, 22]]) { const a = 22 - (y - 104) * 0.5;
      poligono([[x + 2, y], [x + w - 2, y], [x + w, y + a], [x, y + a]], P.saco); for (let yy = y + 1; yy < y + a; yy++) for (let xx = x + 1; xx < x + w; xx++) if (R.pget(xx, yy) === P.saco && ((xx + yy * 2) % 4 === 0 || h(xx, yy, 688) < 0.06)) pset(xx, yy, P.sacoS);
      rect(x + 3, y + 3, x + w - 3, y + 3, P.sacoL); rect(x + w / 2 - 2, y - 3, x + w / 2 + 2, y, P.sacoS); pset(x + w / 2, y - 4, P.sacoL); rect(x + 4, y + a - 6, x + 9, y + a - 5, P.sacoS); rect(x + 12, y + a - 6, x + 14, y + a - 5, P.sacoS); }
    for (let k = 0; k < 40; k++) pset(40 + Math.round(h(k, 1, 689) * 60), 140 + Math.round(h(k, 2, 689) * 4), h(k, 3, 689) < 0.5 ? P.serrin : P.sacoL);
    // el tablero de herramientas: martillo, sierra, tenazas, piolet y formón con su silueta pintada
    { const x0 = 104, y0 = 66; rect(x0, y0, x0 + 32, y0 + 36, P.madS); rect(x0 + 1, y0 + 1, x0 + 31, y0 + 35, P.mad); for (let y = y0 + 3; y < y0 + 35; y += 4) for (let x = x0 + 3; x < x0 + 31; x += 4) pset(x, y, P.madD);
      rect(x0 + 4, y0 + 4, x0 + 5, y0 + 20, P.madD); rect(x0 + 2, y0 + 4, x0 + 9, y0 + 7, P.aceroD); rect(x0 + 2, y0 + 4, x0 + 9, y0 + 4, P.aceroL);   // martillo
      poligono([[x0 + 12, y0 + 4], [x0 + 18, y0 + 4], [x0 + 18, y0 + 26], [x0 + 12, y0 + 22]], P.acero); for (let y = y0 + 6; y < y0 + 25; y += 2) pset(x0 + 12, y, P.aceroD); rect(x0 + 12, y0 + 2, x0 + 18, y0 + 5, P.madD); rect(x0 + 14, y0 + 3, x0 + 16, y0 + 4, P.madL);   // sierra
      linea(x0 + 22, y0 + 4, x0 + 26, y0 + 22, P.aceroD); linea(x0 + 27, y0 + 4, x0 + 23, y0 + 22, P.aceroD); disco(x0 + 24, y0 + 13, 1, P.aceroL);   // tenazas
      rect(x0 + 4, y0 + 26, x0 + 24, y0 + 27, P.madD); poligono([[x0 + 24, y0 + 24], [x0 + 30, y0 + 26], [x0 + 24, y0 + 29]], P.aceroL); rect(x0 + 2, y0 + 30, x0 + 16, y0 + 31, P.madL); rect(x0 + 16, y0 + 30, x0 + 22, y0 + 31, P.aceroL); }
    // las pilas de bloques: de hielo (translúcidos) y de pykrete (grises)
    for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) e_bloque(R, 112 + i * 20 + (j & 1) * 3, 141 - j * 12, 17, 10, 'hielo', i + j * 2);
    for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) e_bloque(R, 158 + i * 18 + (j & 1) * 2, 141 - j * 12, 15, 10, 'pykrete', i + j * 2);
    for (let k = 0; k < 14; k++) pset(104 + k * 3, 142, P.charco);
    // la manguera enrollada y el termómetro de esfera bajo cero
    for (let r = 4; r <= 8; r += 2) { for (let a = 0; a < 6.28; a += 0.12) pset(Math.round(192 + Math.cos(a) * r), Math.round(90 + Math.sin(a) * r * 0.8), r === 8 ? P.negroL : P.negro); } rect(190, 80, 193, 82, P.aceroD); linea(186, 97, 184, 140, P.negro);
    { const x = 204, y = 74; disco(x, y, 7, P.aceroD); disco(x, y, 6, P.esmalte); for (let k = 0; k < 9; k++) { const a = -2.3 + k * 0.575; pset(Math.round(x + Math.cos(a) * 5), Math.round(y + Math.sin(a) * 5), k < 4 ? P.azulM : P.rojoM); } }
    // la cámara frigorífica: la puerta de acero con remaches, bisagras, el pestillo grande, el ojo de buey y la escarcha
    { const x0 = 214, x1 = 262, y0 = 58; rect(x0 - 4, y0 - 4, x1 + 4, 141, P.aceroD); rect(x0 - 3, y0 - 3, x1 + 3, 141, P.aceroS);
      for (let y = y0; y <= 140; y++) for (let x = x0; x <= x1; x++) { const q = h(x >> 1, y >> 1, 690); let c = (x - x0) < 3 ? P.aceroL : (x1 - x) < 3 ? P.aceroS : q < 0.1 ? P.aceroS : P.acero; if ((y - y0) % 27 === 0) c = P.aceroS; if ((y - y0) % 27 === 1) c = P.aceroL;
        const fr = Math.min(x - x0, x1 - x, y - y0, 140 - y) + (h(x, y, 691) - 0.5) * 4; if (fr < 3 && ((x + y) & 1)) c = P.escarcha; pset(x, y, c); }
      for (let y = y0 + 4; y < 140; y += 6) { pset(x0 + 2, y, P.aceroD); pset(x1 - 2, y, P.aceroD); }
      for (const y of [y0 + 10, 124]) { rect(x0 - 6, y, x0 + 6, y + 6, P.aceroD); rect(x0 - 5, y + 1, x0 + 5, y + 2, P.aceroL); disco(x0 - 4, y + 3, 1, P.aceroS); }
      rect(x1 - 6, 92, x1 + 4, 100, P.aceroD); rect(x1 - 18, 95, x1 + 2, 97, P.aceroL); rect(x1 - 18, 97, x1 + 2, 97, P.aceroS); disco(x1 - 18, 96, 2, P.rojoM);
      disco((x0 + x1) / 2, 72, 6, P.aceroD); disco((x0 + x1) / 2, 72, 5, P.hieS); for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) if (i * i + j * j < 22 && h(i, j, 692) < 0.6) pset((x0 + x1) / 2 + i, 72 + j, P.escarcha); }
    // la tubería del frío por la pared, con sus abrazaderas y carámbanos
    rect(196, 48, 319, 51, P.aceroS); rect(196, 48, 319, 48, P.aceroL); for (let x = 196; x < 320; x++) if (((x + 48) & 1) && h(x, 1, 693) < 0.5) pset(x, 49, P.escarcha);
    for (let x = 206; x < 320; x += 22) rect(x, 46, x + 2, 53, P.aceroD);
    for (let x = 198; x < 320; x += 5) { const l = Math.round(h(x, 3, 694) * 6); if (l > 1 && !(x > 274 && x < 320 && false)) { linea(x, 52, x, 52 + l, P.hieL); pset(x, 52, P.blancoS); } }
    rect(296, 51, 299, 96, P.aceroS); rect(296, 51, 296, 96, P.aceroL);
    // el compresor: el motor, el volante (gira con la vida), los manómetros, las tuberías escarchadas
    { rect(266, 104, 316, 141, P.aceroD); rect(268, 106, 314, 139, P.azulM); rect(268, 106, 314, 106, e_mezcla(P.azulM, C.blanco, 0.3)); for (let y = 110; y < 138; y += 4) rect(270, y, 288, y, e_mezcla(P.azulM, C.k, 0.3));
      for (const x of [298, 310]) { disco(x, 98, 5, P.aceroD); disco(x, 98, 4, P.esmalte); rect(x - 1, 103, x + 1, 106, P.aceroS); }
      rect(264, 139, 318, 141, P.negro); for (const x of [270, 312]) rect(x - 2, 136, x + 2, 141, P.negroL); }
    // el suelo de cemento: losas con juntas, manchas, charcos que reflejan y serrín
    for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 2, y >> 1, 695); let c = q < 0.15 ? P.cemS : q > 0.88 ? P.cemL : P.cem;
      if (x % 64 === (y - 142) % 2 || y === 158 || y === 142) c = P.cemD; if (h(x, y, 696) < 0.03) c = P.cemD; pset(x, y, c); }
    for (const [cx, cy, rx, ry] of [[60, 160, 22, 4], [176, 170, 18, 3], [262, 152, 14, 3]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 < 1) pset(cx + i, cy + j, j < 0 && Math.abs(i) < rx * 0.5 ? P.ladBL : P.charco);
    { const x = 150, y = 166; rect(x - 6, y - 2, x + 6, y + 2, P.cemD); for (let i = -5; i <= 5; i += 2) rect(x + i, y - 1, x + i, y + 1, C.k); }
    for (let k = 0; k < 60; k++) pset(Math.round(h(k, 4, 697) * 319), 146 + Math.round(h(k, 5, 697) * 33), k % 3 ? P.serrin : P.hieL);
    // los cubos galvanizados con agua
    for (const [x, w] of [[16, 12], [-1, 0]]) if (w) { rect(x, 128, x + w, 141, P.aceroS); rect(x + 1, 129, x + w - 1, 141, P.acero); rect(x, 128, x + w, 128, P.aceroL); rect(x + 1, 129, x + w - 1, 130, P.aguaS); for (let y = 132; y < 141; y += 4) rect(x + 1, y, x + w - 1, y, P.aceroS); }
    // los haces de luz de los ventanales hasta el suelo
    for (const wx of [38, 138]) for (let y = 66; y < 176; y++) { const d = Math.round((y - 66) * 0.35); for (let x = wx + d; x < wx + 56 + d; x++) if (((x + y) & 1) === 0 && x < 320) pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.13)); }
  });
  // ── la vida: la nieve, el volante, los manómetros, el vaho de la cámara, las gotas, la lucecita y el operario
  for (const wx of [38, 138]) { R.recorte([wx, 26, wx + 56, 62]); for (let k = 0; k < 18; k++) { const x = wx + ((k * 19 + Math.sin(t + k) * 4 + t * 5) % 58), y = 26 + ((k * 13 + t * (10 + k % 4 * 3)) % 38); pset(Math.round(x), Math.round(y), C.blanco); } R.recorte(null);
    for (let x = wx; x <= wx + 56; x += 14) rect(x, 26, x, 62, P.aceroD); rect(wx, 44, wx + 56, 44, P.aceroD);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const a = wx + i * 14, b = 26 + j * 18; for (let k = 0; k < 4; k++) { pset(a + 1 + k, b + 1, P.escarcha); pset(a + 1, b + 1 + k, P.escarcha); } pset(a + 2, b + 2, P.escarcha); } }
  // el operario que cruza el pasillo con su carretilla de bloques (recortado a la puerta)
  { const u = (t % 9) / 9, x = Math.round(-8 + u * 50), y = 140; R.recorte([7, 79, 29, 141]);
    if (u < 0.9) { rect(x - 2, y - 11, x + 2, y - 4, P.aceroD); disco(x, y - 13, 2, hex('#e0b090')); rect(x - 2, y - 16, x + 2, y - 15, P.vigas); rect(x - 2, y - 4, x - 1, y, P.negro); rect(x + 1, y - 4, x + 2, y - (Math.floor(t * 6) % 2), P.negro);
      rect(x + 4, y - 7, x + 12, y - 3, P.madS); rect(x + 5, y - 9, x + 11, y - 7, P.hie); disco(x + 10, y - 1, 1, P.negro); linea(x + 2, y - 8, x + 4, y - 6, P.madD); } R.recorte(null); }
  // el vaho que sale por debajo de la puerta frigorífica y se arrastra por el suelo
  for (let i = 0; i < 16; i++) { const u = ((t * 0.18 + i / 16) % 1), x = Math.round(216 + h(i, 1, 700) * 44 - u * 26 + Math.sin(u * 5 + i) * 3), y = Math.round(141 + u * 10 - Math.sin(u * 3) * 6), r = 1 + Math.round(u * 3);
    for (let j = -r; j <= r; j++) for (let k = -r * 2; k <= r * 2; k++) if ((k * k) / 4 + j * j <= r * r && ((x + k + y + j + i) % 3 === 0) && u < 0.92) pset(x + k, y + j, P.vaho); }
  // las gotas que caen de los carámbanos
  for (let k = 0; k < 5; k++) { const x = 203 + k * 25, u = ((t * 0.7 + k * 0.37) % 1); if (u < 0.7) pset(x, Math.round(58 + u * 80), P.hieL); else pset(x, 138, P.hieL); }
  // el volante del compresor que gira y su correa, las agujas de los manómetros y la lucecita
  { const cx = 282, cy = 122, a = t * 7; disco(cx, cy, 10, P.aceroD); disco(cx, cy, 9, P.acero); disco(cx, cy, 7, P.aceroD); for (let k = 0; k < 4; k++) { const b = a + k * Math.PI / 2; linea(cx, cy, Math.round(cx + Math.cos(b) * 8), Math.round(cy + Math.sin(b) * 8), P.aceroL); } disco(cx, cy, 2, P.aceroL);
    linea(cx + 9, cy - 4, 306, 116, P.negro); linea(cx + 9, cy + 4, 306, 128, P.negro); disco(306, 122, 6, P.aceroS); disco(306, 122, 3, P.aceroL); pset(306 + Math.round(Math.cos(a * 1.6) * 4), 122 + Math.round(Math.sin(a * 1.6) * 4), P.negro); }
  for (const [x, k] of [[298, 0], [310, 1]]) { const a = -1.9 + Math.sin(t * 3 + k) * 0.15 + k * 0.7; linea(x, 98, Math.round(x + Math.cos(a) * 3), Math.round(98 + Math.sin(a) * 3), P.rojoM); }
  { const a = 2.6 + Math.sin(t * 1.3) * 0.08; linea(204, 74, Math.round(204 + Math.cos(a) * 5), Math.round(74 + Math.sin(a) * 5), P.negro); }
  if (Math.floor(t * 2) % 2) { disco(274, 110, 1, P.rojoM); pset(274, 109, P.fuegoL); }
  // las bombillas colgantes con su pantalla esmaltada (parpadea un poco)
  for (const [x, l] of [[112, 26], [250, 22]]) { linea(x, 20, x, 20 + l, P.negro); poligono([[x - 7, 26 + l], [x - 3, 20 + l], [x + 3, 20 + l], [x + 7, 26 + l]], P.verdeL); rect(x - 7, 26 + l, x + 7, 26 + l, P.verdeLL); const enc = Math.sin(t * 23) > -0.95; disco(x, 27 + l, 2, enc ? P.luzC : P.papelS); if (enc) pset(x, 28 + l, C.blanco); }
  // las ondas en los cubos y en los charcos
  if (Math.sin(t * 2) > 0.3) rect(18, 129, 24, 129, P.aguaL);
  { const r = Math.round((t * 6) % 10); for (let a = 0; a < 6.28; a += 0.4) pset(Math.round(60 + Math.cos(a) * r * 1.8), Math.round(160 + Math.sin(a) * r * 0.35), P.blancoS); }
  return { suelo: 162, libre: [36, 168], banco: [172, 146, 306, 178], detrasBanco: 158, sitioDetras: 254, puerta: [6, 78, 30, 141], frigorifica: [214, 58, 262, 141], bloque: [226, 146], pykrete: [286, 146] };
}

// el banco de trabajo del taller (delante de los personajes): tablones con nudos, el molde con la mezcla gris y su
// pala, el bloque de hielo normal (o.rompe) y el de pykrete, serrín, un formón y el estante de abajo con un cubo
function e_banco(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C, x0 = 172, x1 = 306, y = 148;
  // la mezcla en el molde: agua con serrín (o.molde 0–1)
  { const m = o.molde ?? 1, a = 178, b = 202; rect(a, 136, b, 148, P.madD); rect(a + 1, 137, b - 1, 147, P.madS); const top = Math.round(147 - m * 9); if (m > 0) { rect(a + 2, top, b - 2, 147, P.pyk); for (let xx = a + 2; xx < b - 2; xx++) { if (h(xx, 1, 701) < 0.3) pset(xx, top, P.pykF); if (Math.sin(xx * 0.8 + t * 2) > 0.7) pset(xx, top, P.pykL); } }
    for (let xx = a + 2; xx < b; xx += 5) rect(xx, 137, xx, 147, P.mad); rect(a, 136, b, 136, P.madL); linea(196, top - 1, 204, 128, P.madL); linea(197, top - 1, 205, 128, P.madS); }
  // el tablero
  rect(x0, y - 2, x1, y + 3, P.mad); rect(x0, y - 2, x1, y - 2, P.madL); rect(x0, y + 3, x1, y + 3, P.madD);
  for (let x = x0; x <= x1; x++) { if (h(x >> 3, 1, 702) < 0.3) pset(x, y, P.madS); if (x % 34 === 0) rect(x, y - 2, x, y + 3, P.madD); }
  for (const nx of [196, 262]) { disco(nx, y + 1, 1, P.madS); pset(nx, y + 1, P.madD); }
  for (const lx of [x0 + 3, 238, x1 - 6]) { rect(lx, y + 4, lx + 3, 179, P.madS); rect(lx, y + 4, lx, 179, P.mad); }
  rect(x0 + 3, 168, x1 - 3, 170, P.mad); rect(x0 + 3, 168, x1 - 3, 168, P.madL);
  { const x = 192; rect(x, 158, x + 12, 167, P.aceroS); rect(x + 1, 159, x + 11, 167, P.acero); rect(x, 158, x + 12, 158, P.aceroL); rect(x + 1, 159, x + 11, 160, P.aguaS); }
  poligono([[250, 160], [270, 160], [272, 167], [248, 167]], P.saco); rect(256, 158, 262, 160, P.sacoS);
  for (let k = 0; k < 18; k++) pset(x0 + 4 + Math.round(h(k, 1, 703) * 120), y - 3 + Math.round(h(k, 2, 703) * 1), P.serrin);
  rect(206, 144, 212, 145, P.madL); rect(212, 144, 218, 145, P.aceroL);
  // los dos bloques: el de hielo normal (que se raja y se parte) y el de pykrete, que aguanta
  if (o.bloques !== false) {
    const r = o.rompe ?? 0, bx = 226, by = y - 2;
    if (r < 0.6) {
      e_bloque(R, bx, by, 22, 14, 'hielo', 9);
      const g = r / 0.6; if (g > 0) { const pts = [[0, -14], [-1, -11], [2, -8], [-2, -5], [1, -2], [-1, 0]], n = Math.ceil(g * (pts.length - 1));
        for (let k = 0; k < n; k++) { linea(bx + pts[k][0], by + pts[k][1], bx + pts[k + 1][0], by + pts[k + 1][1], P.hieD); pset(bx + pts[k][0] + 1, by + pts[k][1], C.blanco); }
        if (g > 0.4) { linea(bx + 2, by - 8, bx + 7, by - 11, P.hieD); linea(bx - 2, by - 5, bx - 8, by - 3, P.hieD); } if (g > 0.75) { linea(bx + 1, by - 2, bx + 9, by - 1, P.hieS); linea(bx - 1, by - 11, bx - 7, by - 13, P.hieS); } }
    } else {
      const g = (r - 0.6) / 0.4, s = Math.round(g * 5), cae = Math.round(g * g * 3);
      R.recorte([0, 0, bx, 179]); e_bloque(R, bx - s, by + 0, 22, 14 - cae, 'hielo', 9); R.recorte(null);
      R.recorte([bx + 1, 0, 319, 179]); e_bloque(R, bx + s, by, 22, 14 - cae, 'hielo', 10); R.recorte(null);
      for (let k = 0; k < 7; k++) { const a = -2.8 + k * 0.45, d = g * (10 + h(k, 1, 704) * 14), x = Math.round(bx + Math.cos(a) * d), yy = Math.round(by - 10 + Math.sin(a) * d * 0.7 + g * g * 18); if (yy < by + 1) { pset(x, yy, C.blanco); pset(x + 1, yy, P.hie); } else pset(x, by - 1, P.hieL); }
    }
    e_bloque(R, 286, by, 20, 14, 'pykrete', 11);
  }
  return { banco: [x0, y - 2, x1, 179], detrasBanco: 158, sitioDetras: 254, bloque: [226, 146], pykrete: [286, 146], molde: [190, 140] };
}

// la sala de reuniones de Quebec en 1943 (cámara 'reunion' del taller; ver la cabecera de hielo)
function e_reunion(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C;
  e_fijo(R, 'reu', () => {
    const B = R.buf;
    // la pared de yeso crema con su moldura y su papel de rayas finas, el zócalo de roble con paneles
    rect(0, 0, 319, 5, P.cremaS); rect(0, 4, 319, 5, P.robleS); rect(0, 6, 319, 7, P.crema); rect(0, 6, 319, 6, P.cremaL);
    for (let y = 8; y < 86; y++) for (let x = 0; x < 320; x++) { const suave = x > 270 && y < 48; let c = (x % 10 === 0 && !suave) ? P.cremaS : (x % 10 === 5 && ((y >> 1) & 1) && !suave) ? P.cremaL : P.crema; if (h(x >> 3, y >> 2, 710) < 0.06) c = P.cremaS; if (y < 12 && ((x + y) & 1)) c = P.cremaS; B[y * 320 + x] = c; }
    e_paneles(R, 0, 86, 319, 128, 40, [P.roble, P.robleS, P.robleL, P.robleD]);
    rect(0, 126, 319, 129, P.robleD); rect(0, 126, 319, 126, P.robleL);
    // la alfombra granate con su trama de rombos
    for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x + (y >> 1)) % 16, v = (x - (y >> 1) + 640) % 16; let c = (u === 0 || v === 0) ? P.alfQS : ((u === 8 && v === 8) ? P.oroT : P.alfQ); if (h(x >> 1, y, 711) < 0.07) c = P.alfQL; B[y * 320 + x] = c; }
    for (let x = 0; x < 320; x++) { pset(x, 130, P.robleD); if (x & 1) pset(x, 131, P.alfQS); }
    // los dos ventanales al río (el paisaje va fijo; las nubes, las gaviotas y el barco van con la vida)
    for (const wx of [14, 70]) { rect(wx - 3, 18, wx + 41, 104, P.robleD); rect(wx - 2, 19, wx + 40, 103, P.cremaL);
      e_degradado(R, wx, 21, wx + 38, 66, [P.cieloV[1], P.cieloV[2], P.cieloV[3], P.cieloV[4]], 712 + wx);
      R.recorte([wx, 21, wx + 38, 101]); for (let x = wx; x <= wx + 38; x++) { const y = 60 + Math.round(Math.sin(x * 0.12) * 3 + Math.sin(x * 0.31) * 1.5); rect(x, y, x, 72, P.colina); pset(x, y, P.colinaS); for (let yy = y + 2; yy < 72; yy += 2) if (h(x, yy, 713) < 0.3) pset(x, yy, P.colinaS); }
        e_degradado(R, wx, 72, wx + 38, 92, [P.rioL, P.rio, P.lagoS], 714 + wx, 0.5); for (let k = 0; k < 10; k++) rect(wx + Math.round(h(k, wx, 715) * 34), 74 + k * 2, wx + Math.round(h(k, wx, 715) * 34) + 3, 74 + k * 2, P.azulPL);
        for (let x = wx; x <= wx + 38; x++) { const y = 92 + Math.round(h(x >> 2, wx, 716) * 3); rect(x, y, x, 101, P.robleS); pset(x, y, P.tercS); } R.recorte(null);
      rect(wx + 18, 21, wx + 20, 101, P.cremaL); rect(wx, 50, wx + 38, 51, P.cremaL); rect(wx, 76, wx + 38, 77, P.cremaL); rect(wx - 3, 102, wx + 41, 105, P.roble); rect(wx - 3, 102, wx + 41, 102, P.robleL);
      for (const [a, b] of [[wx - 8, wx + 2], [wx + 36, wx + 46]]) { for (let y = 16; y < 110; y++) for (let x = a; x <= b; x++) { const f = Math.sin((x - a) * 1.4 + y * 0.03); pset(x, y, f > 0.5 ? P.oroT : f < -0.5 ? P.oroTS : e_mezcla(P.oroT, P.oroTS, 0.4)); } rect(a, 70, b, 72, P.oroTS); }
      rect(wx - 10, 12, wx + 48, 18, P.oroTS); for (let x = wx - 10; x < wx + 48; x += 4) { rect(x, 18, x + 2, 20, P.oroT); pset(x + 1, 21, P.oroTS); } rect(wx - 10, 12, wx + 48, 12, P.oroT); }
    // el plano azul del portaaviones de hielo, colgado de su varilla (sin letras: el casco, la cubierta y las cotas)
    { const x0 = 140, x1 = 254, y0 = 28, y1 = 86; rect(x0 - 3, y0 - 3, x1 + 3, y0 - 1, P.robleD); disco(x0 - 4, y0 - 2, 2, P.laton); disco(x1 + 4, y0 - 2, 2, P.laton); linea(x0 + 10, y0 - 3, (x0 + x1) / 2, y0 - 12, P.robleD); linea(x1 - 10, y0 - 3, (x0 + x1) / 2, y0 - 12, P.robleD);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x - x0) % 8 === 0 || (y - y0) % 8 === 0) ? P.azulPS : (h(x >> 2, y >> 2, 717) < 0.1 ? P.azulPS : P.azulP));
      rect(x0, y1 + 1, x1, y1 + 3, P.robleD); rect(x0, y1 + 1, x1, y1 + 1, P.robleL);
      const c = P.azulPL; linea(x0 + 10, 58, x1 - 10, 58, c); linea(x0 + 10, 58, x0 + 16, 70, c); linea(x1 - 10, 58, x1 - 18, 70, c); linea(x0 + 16, 70, x1 - 18, 70, c); linea(x0 + 14, 64, x1 - 13, 64, c, 4);
      rect(x0 + 70, 50, x0 + 82, 57, c); rect(x0 + 71, 51, x0 + 81, 56, P.azulP); rect(x0 + 74, 46, x0 + 78, 49, c); linea(x0 + 76, 42, x0 + 76, 45, c);
      for (let k = 0; k < 4; k++) linea(x0 + 24 + k * 12, 57, x0 + 28 + k * 12, 57, P.azulP);
      linea(x0 + 10, 76, x1 - 10, 76, c); linea(x0 + 10, 74, x0 + 10, 78, c); linea(x1 - 10, 74, x1 - 10, 78, c); e_cifras(R, '600', (x0 + x1) / 2 - 6, 78, c);
      for (let k = 0; k < 4; k++) { const x = x0 + 18 + k * 16; rect(x, 36, x + 8, 38, c); linea(x + 4, 39, x + 4, 42, c); }
      rect(x1 - 26, 34, x1 - 8, 44, c); rect(x1 - 25, 35, x1 - 9, 43, P.azulP); for (let y = 37; y < 43; y += 2) linea(x1 - 23, y, x1 - 11, y, c); }
    // las dos banderas en su mástil (dibujos de bandera, sin letras)
    { const x = 124; rect(x, 22, x + 1, 126, P.oroTS); disco(x, 21, 2, P.oroT); rect(x - 3, 124, x + 4, 126, P.robleD);
      for (let y = 26; y < 70; y++) for (let i = 0; i < 12; i++) { const yy = y + Math.round(i * 0.15); const cruz = Math.abs(i - 6) < 2 || Math.abs(y - 40) < 2, diag = Math.abs((i - 6) - (y - 40) * 0.3) < 1 || Math.abs((i - 6) + (y - 40) * 0.3) < 1;
        pset(x + 2 + i, yy, cruz ? P.rojoM : (Math.abs(i - 6) < 3 || Math.abs(y - 40) < 3) ? C.blanco : diag ? P.rojoM : P.azulM); }
      for (let y = 26; y < 70; y++) pset(x + 14, y + 2, P.robleD); }
    { const x = 262; rect(x, 22, x + 1, 126, P.oroTS); disco(x, 21, 2, P.oroT); rect(x - 3, 124, x + 4, 126, P.robleD);
      for (let y = 26; y < 70; y++) for (let i = 0; i < 12; i++) { const yy = y + Math.round(i * 0.15); pset(x - 2 - i, yy, (i > 5 && y < 42) ? (((i + y) % 3 === 0) ? C.blanco : P.azulM) : (((y - 26) >> 2) & 1) ? C.blanco : P.rojoM); } }
    // la palmera en su macetero de latón
    { const x = 54; rect(x - 6, 112, x + 6, 126, P.laton); rect(x - 6, 112, x + 6, 112, P.latonL); rect(x + 3, 113, x + 5, 126, P.latonS); rect(x, 92, x + 1, 112, P.madS);
      for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.62; for (let i = 0; i < 14; i++) { const xx = Math.round(x + Math.cos(a) * i), yy = Math.round(92 + Math.sin(a) * i * 0.7 + i * i * 0.04); pset(xx, yy, P.hierbaS); if (i % 2) { pset(xx, yy + 1, P.hierba); pset(xx, yy - 1, P.hierbaL); } } } }
    // los respaldos de cuero de los sillones de los altos mandos, con tachuelas
    for (const x of [140, 178, 216, 254, 292]) { rect(x - 9, 112, x + 9, 144, P.cueroS); rect(x - 8, 113, x + 8, 144, P.cuero); rect(x - 8, 113, x + 8, 114, P.cueroL); disco(x, 113, 8, P.cuero); disco(x, 112, 6, P.cueroL); disco(x, 113, 5, P.cuero);
      for (let y = 117; y < 140; y += 5) { pset(x - 4, y, P.cueroS); pset(x + 4, y, P.cueroS); pset(x, y + 2, P.cueroS); } for (let y = 106; y < 144; y += 3) { pset(x - 8, y + (y < 113 ? 3 : 0), P.laton); pset(x + 8, y + (y < 113 ? 3 : 0), P.laton); } }
  });
  // ── la vida: nubes y gaviotas en los ventanales, el barco que remonta el río, la lámpara de araña que destella
  for (const wx of [14, 70]) { R.recorte([wx, 21, wx + 38, 101]);
    e_nubes(R, t, [[wx * 3, 30, 16, 2.4], [wx * 5 + 90, 40, 12, 3.6], [wx + 200, 26, 20, 1.5]], [C.blanco, P.cieloV[4], P.cieloV[2]]);
    for (let x = wx; x <= wx + 38; x++) { const y = 60 + Math.round(Math.sin(x * 0.12) * 3 + Math.sin(x * 0.31) * 1.5); if (R.pget(x, y + 1) !== P.colina) { /* nube encima */ } }
    { const u = ((t * 6 + wx) % 140) - 30 + 14, x = Math.round(u), y = 80; rect(x - 6, y, x + 6, y + 2, P.negroL); rect(x - 5, y + 2, x + 5, y + 2, P.negro); rect(x - 2, y - 3, x + 2, y - 1, C.blanco); rect(x + 1, y - 6, x + 2, y - 4, P.rojoM); for (let k = 1; k < 8; k++) if ((k + Math.floor(t * 4)) % 2) pset(x - 6 - k, y + 2, P.azulPL); }
    for (let k = 0; k < 2; k++) e_pajaro(R, wx + ((t * 7 + k * 17 + wx) % 46) - 4, 34 + k * 6 + Math.sin(t + k) * 2, t, C.blanco, k);
    R.recorte(null);
    rect(wx + 18, 21, wx + 20, 101, P.cremaL); rect(wx, 50, wx + 38, 51, P.cremaL); rect(wx, 76, wx + 38, 77, P.cremaL); }
  { const x = 200; linea(x, 0, x, 12, P.oroTS); for (let k = -3; k <= 3; k++) { const xx = x + k * 5; linea(x, 14, xx, 22 - Math.abs(k), P.oroT); rect(xx - 1, 20 - Math.abs(k), xx + 1, 22 - Math.abs(k), P.oroT); pset(xx, 18 - Math.abs(k), P.luzC); for (let j = 1; j < 4; j++) pset(xx, 22 - Math.abs(k) + j, Math.sin(t * 5 + k * 1.7 + j) > 0.6 ? C.blanco : P.azulPL); }
    disco(x, 14, 3, P.oroT); disco(x, 13, 2, P.luzC); }
  return { suelo: 168, libre: [8, 108], detrasMesa: 150, mesa: [112, 140, 319, 170], bloque: [150, 147], plano: [140, 28, 254, 86], ventanas: [[14, 21, 52, 101], [70, 21, 108, 101]], sillones: [140, 178, 216, 254, 292] };
}

// la mesa larga de la reunión (delante de los personajes): el tapete verde con su luz, el mantel que cae con pliegues,
// carpetas (rayas), libretas, lápices, jarras de agua, vasos, ceniceros con puro humeante y el bloque de pykrete
function e_mesaReunion(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C, x0 = 112, y0 = 140, y1 = 152;
  for (let y = y0; y <= y1; y++) for (let x = x0 + Math.round((y1 - y) * 0.6); x < 320; x++) { const q = h(x >> 1, y, 720); pset(x, y, y === y0 ? P.panoL : q < 0.15 ? P.panoS : q > 0.9 ? P.panoL : P.pano); }
  for (let y = y1 + 1; y < 172; y++) { const ini = x0 + Math.round(Math.max(0, y - y1) * 0.1); for (let x = ini; x < 320; x++) { const f = Math.sin((x - x0) * 0.5 + (y - y1) * 0.05); pset(x, y, f > 0.6 ? P.panoL : f < -0.5 ? P.panoS : P.pano); } pset(ini, y, P.panoS); }
  rect(x0, y1, 319, y1 + 1, P.oroTS); for (let x = x0 + 2; x < 320; x += 5) { pset(x, 172, P.oroT); pset(x + 1, 173, P.oroTS); } rect(x0 + 2, 171, 319, 171, P.oroTS);
  for (let x = x0 + 2; x < 320; x++) if ((x & 1)) pset(x, 173 + (x % 3 === 0 ? 1 : 0), P.alfQS);
  // lo que hay encima: libretas, lápices, carpetas, jarras, vasos y ceniceros
  for (const x of [168, 206, 244, 282]) { rect(x - 6, 146, x + 6, 150, P.papelL); for (let k = 0; k < 3; k++) linea(x - 4, 147 + k, x + 2 - k, 147 + k, P.azulM); linea(x + 7, 149, x + 12, 146, P.amarillo ?? P.laton); }
  for (const x of [188, 264]) { rect(x - 3, 138, x + 3, 147, P.azulPL); rect(x - 2, 136, x + 2, 137, P.azulPL); rect(x - 2, 141, x + 2, 147, P.agua); pset(x - 2, 139, C.blanco); pset(x - 2, 142, C.blanco); rect(x + 3, 140, x + 4, 143, P.azulPL); rect(x - 4, 147, x + 4, 148, P.aceroS);
    for (const dx of [10, -10]) { rect(x + dx - 1, 144, x + dx + 1, 148, P.azulPL); pset(x + dx - 1, 145, C.blanco); rect(x + dx, 146, x + dx, 148, P.agua); } }
  for (const x of [226, 302]) { rect(x - 4, 148, x + 4, 149, P.aceroS); rect(x - 3, 147, x + 3, 147, P.acero); rect(x - 1, 146, x + 5, 146, P.madS); pset(x + 5, 146, Math.sin(t * 4 + x) > 0 ? P.fuego : P.fuegoS);
    for (let i = 0; i < 10; i++) { const u = ((t * 0.3 + i / 10 + x * 0.01) % 1), y = Math.round(144 - u * 30), xx = Math.round(x + 5 + Math.sin(u * 8 + t + x) * (1 + u * 4)); if ((i + Math.floor(t * 3)) % 4) pset(xx, y, u < 0.5 ? P.blancoS : P.cremaS); } }
  rect(124, 145, 140, 150, P.carpeta ?? P.papel); rect(124, 145, 140, 145, P.papelL); disco(136, 148, 1, P.rojoM);
  if (o.bloque !== false) e_bloque(R, 152, 148, 16, 11, 'pykrete', 12);
  return { mesa: [x0, y0, 319, 172], detrasMesa: 150, bloque: [152, 148] };
}

// azulejos de w × a con junta, canto de luz y alguna pieza de otro tono (cada k-ésima fila, del color de acento)
function e_azulejos(R, x0, y0, x1, y1, w, a, [c, cS, cJ, cL, cA], k = 0) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = x % w, j = (y - y0) % a, f = Math.floor((y - y0) / a), q = h(Math.floor(x / w), f, 730 + k);
    let col = (i === 0 || j === 0) ? cJ : (j === 1 || i === 1) ? cL : (i === w - 1 || j === a - 1) ? cS : (cA && f % 4 === 3) ? cA : q < 0.12 ? cS : c;
    if (col === c && h(x, y, 731 + k) < 0.02) col = cL; B[y * 320 + x] = col; }
}

// la bañera de patas de garra vista de frente y un poco desde arriba: (cx, suelo) el centro de los pies, w el largo;
// devuelve la línea del agua; agua: el color del agua y sus ondas con t
function e_banera(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C;
  e_fijo(R, 'ban', () => {
    const B = R.buf;
    // el techo con su moldura, el yeso verde agua moteado y la cenefa art déco (negro, oro y verde)
    rect(0, 0, 319, 3, P.mentaL); rect(0, 4, 319, 4, P.mentaS);
    // el papel pintado de rayas verde agua con una ramita cada tanto (más suave en la esquina de Atom)
    for (let y = 5; y < 50; y++) for (let x = 0; x < 320; x++) { const suave = x > 270 && y < 48, u = x % 12, v = (y + (Math.floor(x / 12) & 1) * 9) % 18, q = h(x >> 2, y >> 2, 732);
      let c = u < 2 ? (suave ? P.menta : P.mentaS) : q > 0.92 ? P.mentaL : P.menta;
      if (!suave && u >= 5 && u <= 7 && v >= 6 && v <= 9 && (u === 6 || v === 7)) c = v === 6 ? P.azuV : P.mentaS;
      if (y < 10 && ((x + y) & 1)) c = P.mentaS; B[y * 320 + x] = c; }
    rect(0, 50, 319, 55, P.negro); rect(0, 50, 319, 50, P.negroL); for (let x = 0; x < 320; x += 8) { poligono([[x, 54], [x + 4, 51], [x + 8, 54]], P.oroT); pset(x + 4, 53, P.azuV); } rect(0, 55, 319, 55, P.oroTS);
    e_azulejos(R, 0, 56, 319, 125, 8, 7, [P.azu, P.azuS, P.azuJ, P.azuL, P.azuV]);
    rect(0, 126, 319, 128, P.negro); rect(0, 126, 319, 126, P.negroL);
    // el suelo ajedrezado: filas que se abren hacia delante, con brillo en cada losa y el reflejo de la bañera
    { let y = 129, f = 0; while (y < 180) { const a = 4 + Math.floor(f * 0.9); for (let yy = y; yy < Math.min(180, y + a); yy++) for (let x = 0; x < 320; x++) { const w = 12 + f * 1.5, xx = x - 160, col = Math.floor(xx / w + 100), neg = (col + f) & 1;
          let c = neg ? P.suelo1 : P.azu; if (yy === y) c = neg ? P.suelo1L : P.azuL; else if (yy === y + a - 1 || Math.abs(xx - Math.floor(xx / w) * w) < 0.6) c = neg ? P.suelo1S : P.azuS; if (h(x, yy, 733) < 0.04) c = neg ? P.suelo1S : P.azuS; B[yy * 320 + x] = c; } y += a; f++; } }
    // la alfombrilla de rayas delante de la bañera
    for (let y = 162; y <= 171; y++) for (let x = 126; x <= 184; x++) pset(x, y, ((y - 162) >> 1) % 3 === 0 ? P.azuV : (x + y) % 7 === 0 ? P.mentaS : P.mentaL);
    for (let y = 162; y <= 171; y += 2) { pset(125, y, P.mentaL); pset(185, y, P.mentaL); }
    // la ventana de cristal esmerilado con el visillo de encaje, el alféizar con el helecho y el bote de sales
    rect(22, 16, 74, 78, P.esmalte); rect(22, 16, 74, 16, C.blanco); rect(24, 18, 72, 76, P.esmerilS);
    e_degradado(R, 25, 19, 71, 75, [P.esmeril, P.esmerilS, P.esmeril], 734, 0.6);
    rect(47, 18, 49, 76, P.esmalte); rect(24, 46, 72, 47, P.esmalte);
    for (let y = 50; y < 76; y++) for (let x = 25; x < 72; x++) if (x !== 47 && x !== 48 && ((x + y * 3) % 6 === 0 || (y === 50) || ((x - 25) % 6 === 3 && y % 4 === 0))) pset(x, y, C.blanco);
    for (let x = 25; x < 72; x += 3) { pset(x, 76, C.blanco); }
    rect(20, 78, 76, 81, P.esmalte); rect(20, 78, 76, 78, C.blanco); rect(20, 81, 76, 81, P.esmalteS);
    { const x = 34; rect(x - 4, 71, x + 4, 77, P.lad); rect(x - 4, 71, x + 4, 71, P.olla); for (let k = 0; k < 9; k++) { const a = -2.9 + k * 0.33; for (let i = 0; i < 9; i++) { const xx = Math.round(x + Math.cos(a) * i), yy = Math.round(71 + Math.sin(a) * i + i * i * 0.07); pset(xx, yy, i % 2 ? P.hierba : P.hierbaS); if (i % 3 === 1) pset(xx, yy - 1, P.hierbaL); } } }
    { const x = 62; rect(x - 3, 70, x + 3, 77, P.azuV); rect(x - 2, 68, x + 2, 69, P.cromoS); rect(x - 2, 73, x + 2, 76, P.esmalte); pset(x - 2, 71, C.blanco); }
    // el radiador de columnas con su llave
    for (let x = 26; x < 70; x += 4) { rect(x, 98, x + 2, 124, P.esmalte); pset(x, 98, C.blanco); rect(x + 2, 98, x + 2, 124, P.esmalteS); } rect(25, 102, 70, 103, P.esmalteS); rect(25, 120, 70, 121, P.esmalteS); rect(70, 116, 74, 118, P.cromoS); disco(74, 115, 2, P.cromo);
    // el lavabo de pie, el espejo art déco empañado y la repisa de cristal con la brocha, la navaja y el vaso
    { const x0 = 236, x1 = 270; rect(x0 - 2, 48, x1 + 2, 86, P.cromoS); rect(x0 - 1, 49, x1 + 1, 85, P.cromo); poligono([[x0, 56], [x0 + 6, 50], [x1 - 6, 50], [x1, 56], [x1, 84], [x0, 84]], P.esmerilS);
      for (let y = 51; y < 84; y++) for (let x = x0 + 1; x < x1; x++) if (R.pget(x, y) === P.esmerilS) { const ref = y < 70 ? P.menta : P.azu, q = h(x >> 1, y >> 1, 735); pset(x, y, q < 0.45 ? e_mezcla(ref, C.blanco, 0.55) : q < 0.8 ? e_mezcla(ref, C.blanco, 0.75) : C.blanco); }
      for (let k = 0; k < 4; k++) linea(x0 + 4 + k * 3, 54 - k, x0 + 8 + k * 3, 58 - k, C.blanco);
      rect(x0, 89, x1, 90, P.azuL); rect(x0, 91, x1, 91, P.cromoS); pset(x0 + 2, 92, P.cromoS); pset(x1 - 2, 92, P.cromoS);
      rect(x0 + 3, 83, x0 + 7, 88, P.azuV); pset(x0 + 4, 84, C.blanco); linea(x0 + 5, 79, x0 + 4, 84, P.azuL); linea(x0 + 6, 79, x0 + 7, 84, P.rojoM);
      rect(x0 + 13, 84, x0 + 15, 88, P.madL); rect(x0 + 12, 81, x0 + 16, 83, P.esmalte); rect(x1 - 10, 87, x1 - 3, 88, P.cromoS); rect(x1 - 6, 85, x1 - 5, 86, P.cromo);
      rect(x0 + 1, 98, x1 - 1, 104, P.esmalte); rect(x0, 98, x1, 98, C.blanco); rect(x0 + 3, 99, x1 - 3, 99, P.esmalteS); rect(x0 + 1, 104, x1 - 1, 104, P.esmalteS); rect(x0 + 10, 104, x1 - 10, 127, P.esmalte); rect(x1 - 12, 104, x1 - 10, 127, P.esmalteS); rect(x0 + 8, 126, x1 - 8, 128, P.esmalteS);
      for (const dx of [8, 26]) { rect(x0 + dx - 1, 93, x0 + dx + 1, 97, P.cromo); rect(x0 + dx - 2, 93, x0 + dx + 2, 93, C.blanco); } rect(x0 + 16, 92, x0 + 18, 97, P.cromo); rect(x0 + 17, 97, x0 + 19, 98, P.cromoS);
      rect(x1 - 7, 96, x1 - 3, 97, P.mentaL); }
    // el toallero con dos toallas de rayas y el albornoz
    { rect(282, 96, 316, 97, P.cromo); rect(282, 96, 316, 96, C.blanco); for (const x of [281, 317]) rect(x, 94, x, 99, P.cromoS);
      for (const [a, b, c] of [[284, 298, P.azuV], [300, 314, P.rojoM]]) { for (let y = 98; y < 124; y++) for (let x = a; x <= b; x++) { const f = Math.sin((x - a) * 0.9); pset(x, y, (y === 116 || y === 118) ? c : f > 0.6 ? C.blanco : f < -0.5 ? P.blancoS : P.esmalte); } for (let x = a; x <= b; x += 2) pset(x, 124, P.blancoS); } }
    // el cesto de mimbre y el taburete con toallas
    { for (let y = 108; y < 128; y++) for (let x = 4; x < 20; x++) pset(x, y, ((x + (y >> 1)) % 3 === 0) ? P.madS : ((y & 1) ? P.madL : P.mad)); rect(3, 106, 20, 108, P.madS); rect(3, 106, 20, 106, P.madL); }
    { const x = 92; rect(x - 8, 114, x + 8, 116, P.madS); rect(x - 8, 114, x + 8, 114, P.madL); for (const dx of [-7, 6]) rect(x + dx, 117, x + dx + 1, 128, P.madS); rect(x - 7, 108, x + 7, 113, C.blanco); rect(x - 6, 104, x + 6, 107, P.azuV); rect(x - 7, 113, x + 7, 113, P.blancoS); rect(x - 6, 107, x + 6, 107, e_mezcla(P.azuV, C.k, 0.2)); }
    // el grabado del faro en su marco, la repisa de cristal sobre la bañera con los frascos de sales y la bata colgada
    { const x0 = 102, x1 = 136, y0 = 14, y1 = 42; rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, P.madS); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, P.oroT); e_degradado(R, x0, y0, x1, y0 + 18, [P.cieloV[2], P.cieloV[4]], 736); e_degradado(R, x0, y0 + 19, x1, y1, [P.marL, P.marS], 737, 0.5);
      rect(x0 + 6, y0 + 16, x0 + 14, y0 + 20, P.rocaS); rect(x0 + 9, y0 + 5, x0 + 11, y0 + 16, C.blanco); for (let y = y0 + 7; y < y0 + 16; y += 4) rect(x0 + 9, y, x0 + 11, y + 1, P.rojoM); rect(x0 + 8, y0 + 3, x0 + 12, y0 + 4, P.negroL); pset(x0 + 10, y0 + 2, P.luzC);
      linea(x0 + 12, y0 + 3, x0 + 24, y0 + 1, P.luzC); linea(x0 + 12, y0 + 4, x0 + 24, y0 + 6, P.luzC); poligono([[x0 + 22, y0 + 23], [x0 + 30, y0 + 23], [x0 + 28, y0 + 25], [x0 + 23, y0 + 25]], P.madD); linea(x0 + 26, y0 + 16, x0 + 26, y0 + 23, P.madD); poligono([[x0 + 27, y0 + 16], [x0 + 30, y0 + 22], [x0 + 27, y0 + 22]], C.blanco);
      for (let x = x0; x <= x1; x += 3) pset(x, y0 + 19, P.marL); linea(x0 + 17, y1 + 3, (x0 + x1) / 2, y0 - 8, P.madS); linea(x1 - 17, y1 + 3, (x0 + x1) / 2, y0 - 8, P.madS); disco((x0 + x1) / 2, y0 - 8, 1, P.oroT); }
    { const y = 104; rect(132, y, 182, y + 1, P.azuL); rect(132, y + 2, 182, y + 2, P.cromoS); for (const x of [134, 180]) rect(x, y + 3, x, y + 5, P.cromoS);
      for (const [x, w, a, c] of [[138, 5, 9, P.azuV], [146, 4, 12, P.rojoM], [153, 6, 7, P.azulM], [162, 4, 10, P.laton], [170, 6, 6, P.mentaL]]) { rect(x, y - a, x + w, y - 1, c); rect(x + 1, y - a - 2, x + w - 1, y - a - 1, P.cromoS); pset(x + 1, y - a + 2, C.blanco); rect(x, y - 3, x + w, y - 3, e_mezcla(c, C.k, 0.25)); } }
    { const x = 210; disco(x, 60, 1, P.cromo); poligono([[x - 3, 62], [x + 3, 62], [x + 9, 108], [x - 9, 108]], P.bata); poligono([[x + 1, 62], [x + 3, 62], [x + 9, 108], [x + 3, 108]], P.bataS); linea(x - 2, 64, x - 6, 106, P.bataL);
      rect(x - 6, 82, x + 6, 83, P.bataL); linea(x + 2, 84, x + 4, 96, P.bataL); linea(x + 3, 84, x + 6, 95, P.bataS); rect(x - 9, 106, x + 9, 108, P.bataS); for (let k = 0; k < 4; k++) pset(x - 7 + k * 4, 109, P.bataS); }
    // la sombra de la bañera en el suelo
    e_foco(R, 154, 158, 46, 4, C.k, 0.6);
  });
  // ── la vida: las ramas tras el esmerilado, el vapor, la gota del grifo, el patito, la gota del espejo
  R.recorte([25, 19, 71, 75]); for (let k = 0; k < 3; k++) { const s = Math.sin(t * 0.9 + k) * 2; for (let i = 0; i < 24; i++) { const x = Math.round(70 - i * 1.4 + s * i / 24), y = Math.round(24 + k * 14 + i * 0.5 + Math.sin(i * 0.5) * 1.5); if (((x + y) & 1)) pset(x, y, e_mezcla(P.esmerilS, P.hierbaS, 0.35)); if (i % 5 === 2) pset(x, y + 1, e_mezcla(P.esmerilS, P.hierba, 0.3)); } } R.recorte(null);
  rect(47, 18, 49, 46, P.esmalte);
  { const u = (t * 0.25) % 1, x = 252, y = Math.round(58 + u * 24); for (let j = 0; j < Math.round(u * 24); j += 2) pset(x, 58 + j, P.menta); disco(x, y, 1, P.mentaS); pset(x, y - 1, C.blanco); }
  const bx = o.bloqueX ?? 178, g = e_tina(R, t, 154, 158, 78, o);
  void bx;
  // el vapor que sube de la bañera, en volutas que se deshacen
  for (let i = 0; i < 26; i++) { const u = ((t * 0.12 + i / 26) % 1), x = Math.round(126 + h(i, 1, 740) * 56 + Math.sin(u * 6 + i) * 6 + u * 10), y = Math.round(138 - u * 70), r = 1 + Math.round(u * 4);
    for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) if (k * k + j * j <= r * r && ((x + k + y + j + i) % (u < 0.5 ? 2 : 3)) === 0 && u < 0.93) { const c = R.pget(x + k, y + j); pset(x + k, y + j, e_mezcla(c, P.vapor, 0.55)); } }
  // la lámpara de globo
  { linea(168, 0, 168, 10, P.cromoS); rect(166, 10, 170, 12, P.cromo); disco(168, 18, 6, P.esmeril); disco(168, 18, 5, C.blanco); disco(166, 16, 2, P.luzC); }
  return { suelo: 160, libre: [[8, 112], [204, 316]], banera: [116, 136, 192, 158], agua: g.agua, grifo: [119, 126], lavabo: [236, 98, 270, 128], espejo: [236, 50, 270, 84], ventana: [24, 18, 72, 76] };
}

// la bañera con patas de garra, el agua con sus ondas, el grifo que gotea, el patito, la rejilla y el bloque
// (o.bloque, o.bloqueX, o.tipo); (cx, suelo): el centro de las patas, w el largo
function e_tina(R, t, cx, suelo, w, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C, rx = w / 2, yr = suelo - 18, ry = 5;
  // el cuerpo esmaltado: costados que se redondean abajo, luz a la izquierda y sombra a la derecha
  for (let y = yr; y <= suelo - 5; y++) { const f = (y - yr) / (suelo - 5 - yr), hw = Math.round(rx - f * f * 7); for (let x = cx - hw; x <= cx + hw; x++) { const s = (x - cx) / hw; pset(x, y, s < -0.75 ? C.blanco : s > 0.7 ? P.esmalteD : s > 0.35 ? P.esmalteS : P.esmalte); } pset(cx - hw, y, P.esmalteD); pset(cx + hw, y, C.k); }
  rect(cx - rx + 8, suelo - 5, cx + rx - 8, suelo - 5, P.esmalteD);
  for (const dx of [-rx + 7, rx - 7]) { const x = Math.round(cx + dx); rect(x - 2, suelo - 6, x + 2, suelo - 2, P.oroT); rect(x - 3, suelo - 2, x + 3, suelo, P.oroTS); for (let i = -3; i <= 3; i += 2) pset(x + i, suelo, P.oroT); pset(x - 1, suelo - 5, P.latonL); }
  // el borde de arriba (un anillo esmaltado) y el agua dentro
  const ya = yr - 1;
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue; const ei = (i / (rx - 3)) ** 2 + (j / (ry - 1.6)) ** 2, x = cx + i, y = ya + j;
    if (ei < 1) { const q = Math.sin(i * 0.5 + t * 3 + j) + Math.sin(i * 0.23 - t * 2); pset(x, y, q > 1.3 ? P.aguaL : j < -1 ? P.aguaS : P.agua); } else pset(x, y, j < 0 ? P.esmalteS : (i < -rx * 0.6 ? C.blanco : P.esmalte)); }
  for (let i = -rx; i <= rx; i++) { const j = Math.round(Math.sqrt(Math.max(0, 1 - (i / rx) ** 2)) * ry); pset(cx + i, ya + j, P.esmalteS); pset(cx + i, ya - j - 1, P.esmalteD); }
  // el grifo de columna con sus dos llaves y la gota que cae
  { const x = Math.round(cx - rx + 5); rect(x - 1, ya - 12, x + 1, ya - 2, P.cromo); rect(x - 1, ya - 12, x - 1, ya - 2, C.blanco); rect(x, ya - 12, x + 6, ya - 10, P.cromo); rect(x + 6, ya - 10, x + 6, ya - 8, P.cromoS); for (const [dx, c] of [[-3, P.rojoM], [3, P.azulM]]) { rect(x + dx - 1, ya - 9, x + dx + 1, ya - 9, P.cromo); pset(x + dx, ya - 10, c); }
    const u = (t % 1.6) / 1.6; if (u < 0.5) pset(x + 6, Math.round(ya - 7 + u * 12), P.aguaL); else { const r = Math.round((u - 0.5) * 8); pset(x + 6 - r, ya + 1, C.blanco); pset(x + 6 + r, ya + 1, C.blanco); } }
  // la rejilla de bañera con la esponja y la pastilla de jabón
  { const a = cx - 22, b = cx - 6; rect(a, ya - 2, b, ya - 1, P.cromoS); rect(a, ya - 2, b, ya - 2, P.cromo); for (let x = a + 1; x < b; x += 3) pset(x, ya - 1, P.agua); rect(a + 2, ya - 5, a + 6, ya - 3, P.pato); pset(a + 3, ya - 4, P.patoS); rect(b - 5, ya - 4, b - 2, ya - 3, P.mentaL); }
  // el patito que se mece por el agua
  { const x = Math.round(cx + 8 + Math.sin(t * 0.5) * 6), y = ya + 1 + Math.round(Math.sin(t * 2) * 0.6); rect(x - 2, y - 2, x + 2, y, P.pato); rect(x - 2, y, x + 2, y, P.patoS); disco(x + 2, y - 4, 1, P.pato); pset(x + 4, y - 4, P.picoN); pset(x + 2, y - 5, C.k); pset(x - 3, y - 2, P.pato); }
  // el bloque: cae, salpica y flota
  const b = o.bloque ?? 0;
  if (b > 0) { const x = o.bloqueX ?? (cx + 24), y0 = o.bloqueY0 ?? (ya - 14), tipo = o.tipo ?? 'pykrete';
    if (b < 0.3) { const u = b / 0.3; e_bloque(R, x, Math.round(y0 + (ya - 1 - y0) * u * u), 10, 6, tipo, 13); }
    else { const u = (b - 0.3) / 0.7, bob = Math.round(Math.sin(t * 2.2) * 0.7), yb = ya + 1 + bob;
      for (let k = 0; k < 2; k++) { const r = Math.round(((t * 4 + k * 4) % 8) + 6); for (let i = -r; i <= r; i++) if (((i + k) & 1) && Math.abs(x + i - cx) < rx - 4) pset(x + i, ya + Math.round(Math.sqrt(Math.max(0, 1 - (i / r) ** 2)) * 2), P.aguaL); }
      R.recorte([0, 0, 319, ya]); e_bloque(R, x, yb + 2, 10, 6, tipo, 13); R.recorte(null);
      if (u < 0.43) { const s = u / 0.43; for (let k = 0; k < 8; k++) { const a = -Math.PI * (0.15 + 0.7 * (k / 7)), d = s * (6 + (k % 3) * 3), xx = Math.round(x + Math.cos(a) * d * 1.4), yy = Math.round(ya - Math.sin(-a) * d * 1.6 + s * s * 14); if (yy < ya + 2) { pset(xx, yy, C.blanco); pset(xx, yy + 1, P.aguaL); } } } } }
  return { agua: [cx - rx + 3, ya - 3, cx + rx - 3, ya + 3] };
}

// la bañera de cerca (cámara 'cerca'): azulejos grandes, el grifo, el agua con ondas y reflejos, el borde de esmalte
function e_baneraCerca(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C;
  e_fijo(R, 'banCerca', () => {
    const B = R.buf;
    e_azulejos(R, 0, 0, 319, 61, 20, 15, [P.azu, P.azuS, P.azuJ, P.azuL, null], 1);
    for (let y = 0; y < 48; y++) for (let x = 272; x < 320; x++) { const i = y * 320 + x; if (B[i] === P.azuJ) B[i] = P.azuS; }
    rect(0, 62, 319, 67, P.negro); rect(0, 62, 319, 62, P.negroL); for (let x = 0; x < 320; x += 12) { poligono([[x, 66], [x + 6, 63], [x + 12, 66]], P.oroT); pset(x + 6, 65, P.azuV); }
    // el borde de atrás de la bañera, grueso y redondeado
    for (let y = 68; y < 80; y++) { const f = (y - 68) / 12; rect(0, y, 319, y, f < 0.25 ? C.blanco : f < 0.6 ? P.esmalte : f < 0.85 ? P.esmalteS : P.esmalteD); }
    // el agua: más clara al fondo, con el fondo esmaltado que se adivina, reflejos fijos de la ventana
    e_degradado(R, 0, 80, 319, 151, [P.aguaS, P.agua, P.agua, P.aguaL], 741, 0.5);
    for (let y = 84; y < 151; y++) for (let x = 0; x < 320; x++) if (h(x >> 3, y >> 1, 742) < 0.08) pset(x, y, P.aguaS);
    // el borde de delante: el esmalte grueso con su luz, la sombra hacia dentro, una mella y una gota
    for (let y = 150; y < 180; y++) { const f = (y - 150) / 30; for (let x = 0; x < 320; x++) { const c = f < 0.08 ? P.esmalteD : f < 0.3 ? C.blanco : f < 0.55 ? P.esmalte : f < 0.85 ? P.esmalteS : P.esmalteD; B[y * 320 + x] = (f > 0.3 && f < 0.55 && h(x >> 2, y, 743) < 0.05) ? P.blancoS : c; } }
    disco(252, 156, 2, P.negroL); pset(253, 157, P.aceroS);
    for (let k = 0; k < 9; k++) { const x = 30 + Math.round(h(k, 1, 745) * 180), y = 160 + Math.round(h(k, 2, 745) * 12); pset(x, y, P.aguaL); pset(x, y + 1, P.esmalteS); pset(x - 1, y, C.blanco); }
    // la toalla de rayas echada sobre el borde y el cepillo de mango largo
    for (let y = 146; y < 180; y++) { const a = 212 - Math.round((y - 146) * 0.15), b = 278 + Math.round((y - 146) * 0.2); for (let x = a; x <= b; x++) { const f = Math.sin((x - a) * 0.5 + y * 0.05); pset(x, y, ((y - 150) % 14 < 3 && y > 150) ? P.azuV : y < 151 ? (f > 0 ? C.blanco : P.esmalte) : f > 0.6 ? C.blanco : f < -0.5 ? P.blancoS : P.esmalte); } pset(a, y, P.esmalteD); pset(b, y, P.esmalteD); }
    for (let x = 212; x < 278; x += 2) pset(x, 146, P.esmalteS);
    { for (let i = 0; i < 90; i++) { const x = 60 + i, y = Math.round(162 - i * 0.07); rect(x, y, x, y + 2, i % 9 === 0 ? P.madS : P.madL); pset(x, y + 3, P.madD); } for (let j = -4; j <= 4; j++) { const w = Math.round(Math.sqrt(1 - (j / 4.6) ** 2) * 12); rect(48 - w, 163 + j, 48 + w, 163 + j, P.mad); } for (let x = 38; x <= 58; x += 2) { linea(x, 168, x, 171, P.sacoS); } rect(37, 167, 59, 167, P.madD); }
    // el grifo grande de latón cromado a la izquierda, con sus dos llaves de cruz
    { rect(14, 22, 22, 74, P.cromoS); rect(15, 22, 21, 74, P.cromo); rect(15, 22, 16, 74, C.blanco); rect(14, 22, 52, 30, P.cromoS); rect(14, 23, 52, 28, P.cromo); rect(14, 23, 52, 24, C.blanco); rect(48, 28, 54, 36, P.cromoS); rect(49, 28, 53, 35, P.cromo); rect(49, 36, 53, 37, P.cromoS);
      for (const [x, c] of [[8, P.rojoM], [30, P.azulM]]) { rect(x - 6, 38, x + 6, 40, P.cromo); rect(x - 1, 33, x + 1, 45, P.cromo); disco(x, 39, 3, P.cromoS); disco(x, 39, 2, c); pset(x - 5, 38, C.blanco); } }
    // la jabonera de pared con la pastilla y la esponja
    { rect(214, 44, 250, 48, P.cromoS); rect(214, 44, 250, 44, P.cromo); rect(218, 36, 230, 43, P.mentaL); rect(218, 36, 230, 36, C.blanco); rect(234, 34, 246, 43, P.pato); for (let k = 0; k < 10; k++) pset(235 + (k * 3) % 11, 35 + (k * 7) % 8, P.patoS); }
  });
  // ── la vida: los destellos y las ondas del agua, el patito, la gota del grifo, el vapor y el bloque
  for (let y = 82; y < 150; y += 2) for (let x = (y >> 1) & 1; x < 320; x += 2) { const q = Math.sin(x * 0.11 + t * 2.1 + y * 0.3) + Math.sin(x * 0.047 - t * 1.3 + y * 0.17) + Math.sin(y * 0.5 + t * 3); if (q > 2.1) pset(x, y, C.blanco); else if (q > 1.6) pset(x, y, P.aguaL); else if (q < -2.2) pset(x, y, P.aguaS); }
  for (let y = 82; y < 150; y += 7) { const off = Math.round(Math.sin(t * 1.5 + y) * 6); for (let x = 0; x < 320; x += 23) linea(x + off, y, x + off + 8, y, P.aguaL); }
  { const u = (t % 1.4) / 1.4; if (u < 0.45) { const y = Math.round(37 + u * 110); disco(51, y, 1, P.aguaL); pset(51, y - 1, C.blanco); } else { const r = (u - 0.45) * 30; for (let a = 0; a < 6.28; a += 0.25) pset(Math.round(51 + Math.cos(a) * r * 1.6), Math.round(88 + Math.sin(a) * r * 0.4), P.aguaL); } }
  { const x = Math.round(78 + Math.sin(t * 0.4) * 10), y = 104 + Math.round(Math.sin(t * 1.8) * 1.5); for (let a = 0; a < 6.28; a += 0.2) pset(Math.round(x + Math.cos(a) * 14), Math.round(y + 4 + Math.sin(a) * 3), P.aguaS);
    disco(x, y, 7, P.pato); rect(x - 7, y, x + 7, y + 3, P.pato); rect(x - 6, y + 3, x + 6, y + 4, P.patoS); disco(x + 5, y - 8, 5, P.pato); poligono([[x + 9, y - 9], [x + 15, y - 8], [x + 9, y - 6]], P.picoN); disco(x + 6, y - 10, 1, C.k); pset(x + 4, y - 11, C.blanco); poligono([[x - 4, y - 2], [x + 2, y - 3], [x - 1, y + 2]], P.patoS); pset(x - 8, y - 3, P.pato); pset(x - 9, y - 4, P.pato); pset(x + 3, y - 10, C.blanco); }
  const b = o.bloque ?? 0, bx = o.bloqueX ?? 182, tipo = o.tipo ?? 'pykrete';
  if (b > 0) {
    if (b < 0.3) { const u = b / 0.3; e_bloque(R, bx, Math.round(-10 + 132 * u * u), 46, 26, tipo, 14); }
    else { const u = (b - 0.3) / 0.7, bob = Math.round(Math.sin(t * 2.2) * 1.5), wl = 116 + bob;
      for (let k = 0; k < 3; k++) { const r = ((t * 10 + k * 14) % 42) + 32; for (let a = 0; a < 6.28; a += 0.6 / Math.sqrt(r)) { const y = Math.round(wl + 6 + Math.sin(a) * r * 0.22); if (y > 80 && y < 150) pset(Math.round(bx + Math.cos(a) * r), y, (k + Math.floor(a * 3)) % 2 ? P.aguaL : C.blanco); } }
      for (let j = 0; j < 14; j++) for (let i = -22; i <= 26; i++) if (((i + j) & 1) === 0) { const x = bx + i, y = wl + 2 + j; if (y < 150) pset(x, y, e_mezcla(R.pget(x, y), tipo === 'hielo' ? P.hieS : P.pykS, 0.45)); }
      R.recorte([0, 0, 319, wl + 1]); e_bloque(R, bx, wl + 12, 46, 26, tipo, 14); R.recorte(null);
      for (let i = -24; i <= 28; i++) if (Math.sin(i * 0.7 + t * 6) > -0.3) pset(bx + i, wl + 1, C.blanco);
      if (u < 0.43) { const s = u / 0.43; for (let k = 0; k < 16; k++) { const a = -Math.PI * (0.08 + 0.84 * (k / 15)), d = s * (16 + (k % 4) * 9), x = Math.round(bx + Math.cos(a) * d * 1.6), y = Math.round(wl - Math.sin(-a) * d * 1.7 + s * s * 50); if (y < wl + 4) { disco(x, y, 1, P.aguaL); pset(x, y - 1, C.blanco); } } } }
  }
  for (let i = 0; i < 18; i++) { const u = ((t * 0.1 + i / 18) % 1), x = Math.round(h(i, 1, 744) * 320 + Math.sin(u * 5 + i) * 10 + u * 20), y = Math.round(150 - u * 140), r = 2 + Math.round(u * 6);
    for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) if (k * k + j * j <= r * r && ((x + k + y + j + i) % 3) === 0 && u < 0.92 && !(x + k > 272 && y + j < 48)) { const c = R.pget(x + k, y + j); pset(x + k, y + j, e_mezcla(c, P.vapor, 0.5)); } }
  return { agua: [0, 80, 319, 150], linea: 116, bloque: [bx, 116], pato: [78, 104], grifo: [51, 37] };
}

// los colores de cada estación: cielo, hierba, nieve en el monte y lo que trae (hojas, nieve, lago helado)
function e_estacion(o) { const e = o.estacion ?? 'verano', P = e_C;
  return e === 'invierno' ? { e, cielo: P.cieloI, hierba: [P.nieveM, P.nieve, P.nieveS], nieve: 1, helado: true, nube: [C.blanco, P.cieloI[4], P.cieloI[1]] }
    : e === 'otono' ? { e, cielo: P.cieloO, hierba: [P.hierbaO, P.alerce, P.hierbaOS], nieve: 0.45, helado: false, nube: [C.blanco, hex('#f0e0d0'), hex('#b8a8b0')] }
    : { e: 'verano', cielo: P.cieloV, hierba: [P.hierba, P.hierbaL, P.hierbaS], nieve: 0.25, helado: false, nube: [C.blanco, P.cieloV[4], hex('#a8c4dc')] }; }

const e_HOR = 101;

// un pino de tres pisos con luz a la izquierda (y nieve en los pisos en invierno)
function e_pinoL(R, x, yb, a, cols, nieve) {
  const w = a * 0.36;
  for (let k = 0; k < 3; k++) { const yt = yb - a + k * a * 0.26, ww = w * (0.55 + k * 0.25), y2 = yt + a * 0.42;
    R.poligono([[x, yt], [x - ww, y2], [x + ww, y2]], cols[k === 2 ? 1 : 0]); R.poligono([[x, yt], [x - ww, y2], [x - ww * 0.3, y2]], cols[2]);
    if (nieve) R.poligono([[x, yt], [x - ww * 0.6, yt + a * 0.22], [x + ww * 0.4, yt + a * 0.2]], e_C.nieve); }
  R.rect(x, yb - a * 0.12, x, yb, e_C.madD);
}

// el lago Patricia (ver la cabecera de hielo)
function e_patricia(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C, S = e_estacion(o), H = e_HOR;
  let mascara;
  const base = e_fijo(R, 'pat:' + S.e, () => {
    const B = R.buf;
    e_degradado(R, 0, 0, 319, 80, S.cielo, 750, 0.35);
    if (S.e === 'verano') { e_foco(R, 64, 28, 26, 26, hex('#fff4d0'), 0.5); disco(64, 28, 7, hex('#fff8e0')); disco(64, 28, 6, C.blanco); }
    else if (S.e === 'otono') { e_foco(R, 60, 40, 30, 26, hex('#ffd8a0'), 0.55); disco(60, 40, 7, hex('#ffe8b8')); disco(60, 40, 6, hex('#fff4d8')); }
    else { e_foco(R, 80, 34, 22, 18, C.blanco, 0.4); disco(80, 34, 6, P.cieloI[4]); }
    // la sierra lejana, azulada, con nieve en las cumbres
    const sierra = [[-10, 72], [14, 52], [30, 60], [52, 40], [70, 34], [92, 46], [112, 42], [130, 56], [150, 50], [176, 62], [230, 54], [252, 48], [276, 54], [300, 50], [330, 60], [330, 92], [-10, 92]];
    poligono(sierra, P.lejano);
    for (let y = 30; y < 92; y++) for (let x = 0; x < 320; x++) if (B[y * 320 + x] === P.lejano) { const q = h(x >> 1, y >> 2, 751); if (x > 70 && x < 112 && (x - 70) > (y - 34) * 0.9) B[y * 320 + x] = P.lejanoS; else if (q < 0.1) B[y * 320 + x] = P.lejanoS; }
    for (let i = 1; i < sierra.length - 3; i++) { const [x, y] = sierra[i], d = 6 + S.nieve * 14; poligono([[x, y], [x - d, y + d * 0.8], [x - d * 0.4, y + d * 0.6], [x, y + d], [x + d * 0.5, y + d * 0.55], [x + d * 0.9, y + d * 0.75]], P.nieve);
      for (let k = 0; k < 4; k++) linea(x + 1 + k, y + 3 + k * 2, x + 2 + k * 2, y + d * 0.7, P.nieveS); }
    // el monte Pirámide: cuarcita rojiza en estratos, la cara de luz a la izquierda, la sombra a la derecha, la nieve en las canales
    { const px = 196, py = 22, L = [[px, py], [px - 70, 92], [px + 74, 92]];
      poligono(L, P.piram); poligono([[px, py], [px + 74, 92], [px + 14, 92]], P.piramS);
      for (let y = py; y < 92; y++) for (let x = px - 70; x <= px + 74; x++) { const c = B[y * 320 + x]; if (c !== P.piram && c !== P.piramS) continue;
        const s = (y + Math.round((x - px) * 0.35)) % 7, q = h(x >> 1, y, 752); let cc = c;
        if (s === 0) cc = c === P.piram ? P.piramS : P.rocaS; else if (s === 1 && c === P.piram) cc = P.piramL; if (q < 0.06) cc = P.rocaS;
        if (y - py < 6 + S.nieve * 20 && h(x >> 2, y >> 2, 753) < 0.5 + S.nieve * 0.5) cc = c === P.piramS ? P.nieveS : P.nieve;
        const can = Math.abs(((x - px) * 0.9 + (y - py) * 0.4) % 14 - 7) < 1 + S.nieve * 2 && y > py + 10 && h(x >> 2, y >> 3, 754) < 0.7; if (can) cc = c === P.piramS ? P.nieveS : P.nieveM;
        B[y * 320 + x] = cc; } }
    // los montes de la izquierda: roca gris con nieve y la cresta de la derecha (baja, lejos de Atom)
    poligono([[-10, 92], [-10, 60], [20, 48], [44, 38], [62, 50], [84, 44], [120, 70], [140, 92]], P.roca);
    poligono([[44, 38], [62, 50], [84, 44], [120, 70], [140, 92], [70, 92]], P.rocaS);
    for (let y = 38; y < 92; y++) for (let x = 0; x < 140; x++) { const c = B[y * 320 + x]; if (c !== P.roca && c !== P.rocaS) continue; let cc = c; if (((y + (x >> 1)) % 6) === 0 && h(x >> 2, y, 755) < 0.5) cc = c === P.roca ? P.rocaL : C.k; if (y < 44 + S.nieve * 20 + h(x >> 2, 1, 756) * 6) cc = c === P.rocaS ? P.nieveS : P.nieve; if (h(x >> 2, y >> 2, 757) < 0.02 + S.nieve * 0.06 && ((x + y) & 1)) cc = P.nieveM; B[y * 320 + x] = cc; }
    poligono([[250, 92], [272, 58], [292, 62], [320, 56], [330, 92]], P.roca); poligono([[272, 58], [292, 62], [320, 56], [320, 92], [282, 92]], P.rocaS);
    for (let y = 56; y < 92; y++) for (let x = 250; x < 320; x++) { const c = B[y * 320 + x]; if ((c === P.roca || c === P.rocaS) && (y < 62 + S.nieve * 16 || h(x >> 1, y >> 1, 758) < 0.06 + S.nieve * 0.2)) B[y * 320 + x] = c === P.rocaS ? P.nieveS : P.nieve; }
    // los bosques en tres términos (con alerces amarillos en otoño), la orilla de enfrente y la cabaña
    const nv = S.e === 'invierno';
    for (let i = 0; i < 90; i++) { const x = Math.round(i * 3.6 + h(i, 1, 759) * 3), yb = 92 + Math.round(h(i, 2, 759) * 4); e_pinoL(R, x, yb, 8 + Math.round(h(i, 3, 759) * 5), S.e === 'otono' && h(i, 4, 759) < 0.25 ? [P.alerce, P.alerceS, P.alerceS] : [P.pino0, P.pino1, P.pinoL], nv); }
    for (let i = 0; i < 60; i++) { const x = Math.round(i * 5.6 + h(i, 5, 759) * 4), yb = 99 + Math.round(h(i, 6, 759) * 2); if (x > 22 && x < 54) continue; e_pinoL(R, x, yb, 10 + Math.round(h(i, 7, 759) * 7), S.e === 'otono' && h(i, 8, 759) < 0.3 ? [P.alamo, P.alamoS, P.alerce] : [P.pino1, P.pino2, P.pino0], nv); }
    for (let x = 0; x < 320; x++) { rect(x, 99, x, H - 1, h(x, 1, 760) < 0.5 ? P.guijaS : P.pino2); if (h(x, 2, 760) < 0.3) pset(x, H - 1, P.guija); }
    { const x0 = 28; rect(x0, 92, x0 + 20, 100, P.madS); for (let x = x0 + 1; x < x0 + 20; x += 2) rect(x, 92, x, 100, P.mad); poligono([[x0 - 2, 92], [x0 + 10, 85], [x0 + 22, 92]], nv ? P.nieve : P.madD); rect(x0 + 4, 95, x0 + 7, 97, P.luzC); rect(x0 + 13, 94, x0 + 16, 100, P.madD); rect(x0 + 16, 84, x0 + 17, 88, P.rocaS); }
    // el lago: el reflejo de todo lo de arriba, oscurecido y teñido de verde azulado; o helado, con nieve y grietas
    for (let y = H; y < 148; y++) { const sy = H - 1 - Math.round((y - H) * 1.5); for (let x = 0; x < 320; x++) {
      let c; if (S.helado) { const q = h(x >> 2, y >> 1, 761); c = q < 0.3 ? P.hieloLS : q > 0.85 ? P.hieloLL : P.hieloL; if (Math.abs(Math.sin(x * 0.05 + y * 0.4) + Math.sin(x * 0.13 - y * 0.2)) < 0.05) c = P.hieS; if (h(x >> 4, y >> 2, 762) < 0.2 && ((x + y) & 1)) c = P.nieve; }
      else { const s = sy >= 0 ? B[sy * 320 + x] : S.cielo[0]; c = e_mezcla(s, P.lagoS, 0.35 + (y - H) / 140); if (y - H < 2) c = P.lagoD; }
      B[y * 320 + x] = c; } }
    // la orilla de cerca: la franja de guijarros con su luz y la hierba de la estación (o la nieve)
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = 146 + Math.round(Math.sin(x * 0.07) * 2 + Math.sin(x * 0.19) * 1); if (y < borde) continue;
      const pasto = 156 + Math.round(Math.sin(x * 0.05 + 1) * 3 + h(x >> 3, 1, 763) * 3); let c;
      if (y < pasto) { const q = h(x >> 1, y >> 1, 764); c = q < 0.25 ? P.guijaS : q > 0.75 ? P.guijaL : P.guija; if (S.helado && q > 0.4) c = P.nieveM; if (y === borde) c = S.helado ? P.nieveS : P.lagoL; }
      else { const q = h(x, y >> 1, 765); c = q < 0.3 ? S.hierba[2] : q > 0.8 ? S.hierba[1] : S.hierba[0]; if (!S.helado && (x * 7 + y * 3) % 11 === 0) c = S.hierba[2]; }
      B[y * 320 + x] = c; }
    for (const [x, y, r] of [[160, 150, 4], [214, 152, 3], [118, 149, 2], [272, 154, 5]]) { disco(x, y, r, P.rocaS); disco(x - 1, y - 1, r - 1, P.roca); pset(x - r + 1, y - r + 1, P.rocaL); if (S.helado) rect(x - r + 1, y - r, x + r - 2, y - r + 1, P.nieve); }
    // el embarcadero: tablones con sus juntas y los pilotes que entran en el agua
    { for (const x of [8, 34, 60, 86]) { rect(x, 141, x + 2, 152, P.madD); rect(x, 141, x, 152, P.madS); for (let y = 153; y < 158; y++) if ((y & 1)) pset(x + 1, y, P.lagoD); }
      rect(0, 138, 96, 143, P.mad); for (let x = 0; x < 96; x += 6) rect(x, 138, x, 143, P.madS); rect(0, 138, 96, 138, nv ? P.nieve : P.madL); rect(0, 143, 96, 144, P.madD); for (let x = 2; x < 96; x += 6) pset(x + 2, 140, P.madD);
      rect(92, 132, 93, 138, P.madD); disco(92, 132, 1, P.madS); }
  });
  // la máscara del cielo (lo que no es montaña): para que las nubes queden detrás de los montes
  { let m = e_CACHE.get(R); mascara = m['patM:' + S.e]; if (!mascara) { mascara = m['patM:' + S.e] = new Uint8Array(320 * 82); const cs = new Set(S.cielo); for (let i = 0; i < 320 * 82; i++) mascara[i] = cs.has(base[i]) ? 1 : 0; } }
  // ── la vida: las nubes de tres tonos a tres velocidades (detrás de los montes) y los pájaros
  e_nubes(R, t, [[20, 14, 34, 1.2], [150, 24, 26, 2.1], [240, 10, 40, 0.8], [90, 38, 20, 3.2], [300, 32, 18, 2.6]], S.nube);
  if (S.e === 'verano') for (let k = 0; k < 3; k++) e_pajaro(R, (t * (9 + k * 3) + k * 90) % 360 - 20, 30 + k * 7 + Math.sin(t + k) * 3, t, P.pino2, k);
  if (S.e === 'otono') { const u = (t * 14) % 420 - 50; for (let k = 0; k < 7; k++) { const n = Math.ceil(k / 2), lado = k % 2 ? 1 : -1; e_pajaro(R, 330 - u + n * 6, 26 + lado * n * 3, t, P.rocaS, k); } }
  if (S.e === 'invierno') for (let k = 0; k < 2; k++) e_pajaro(R, (t * 6 + k * 140) % 360 - 20, 40 + k * 9 + Math.sin(t * 0.7 + k) * 4, t * 0.6, C.k, k);
  { const B = R.buf; for (let i = 0; i < 320 * 82; i++) if (!mascara[i]) B[i] = base[i]; }
  // el humo de la cabaña
  for (let i = 0; i < 8; i++) { const u = ((t * 0.2 + i / 8) % 1), x = Math.round(45 + u * 12 + Math.sin(u * 6 + t) * 2), y = Math.round(83 - u * 22), r = Math.round(u * 2.5); for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) if (k * k + j * j <= r * r && ((x + k + y + j) & 1)) pset(x + k, y + j, S.helado ? P.cieloI[1] : P.nieveM); }
  // el agua que ondula: cada fila del reflejo se corre un poco, y destellos donde da el sol
  if (!S.helado) { const B = R.buf; for (let y = e_HOR + 2; y < 146; y++) { const amp = 0.6 + (y - e_HOR) * 0.04, dx = Math.round(Math.sin(y * 0.9 + t * 2.2) * amp + Math.sin(y * 0.31 - t * 1.3) * amp * 0.6), f = y * 320;
      for (let x = y >= 137 ? 98 : 0; x < 320; x++) { const sx = Math.min(319, Math.max(y >= 137 ? 98 : 0, x + dx)); B[f + x] = base[f + sx]; } if (y % 3 === 0) for (let x = (y * 7) % 13; x < 320; x += 13) if (Math.sin(x * 0.3 + t * 3 + y) > 0.6) B[f + x] = P.lagoL; }
    for (let k = 0; k < 14; k++) { const x = Math.round(30 + h(k, 1, 770) * 140 + Math.sin(t + k) * 3), y = 104 + Math.round(h(k, 2, 770) * 30); if (Math.sin(t * 4 + k * 2.3) > 0.55) { pset(x, y, C.blanco); pset(x - 1, y, P.lagoL); pset(x + 1, y, P.lagoL); } } }
  else for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 1, 771) * 320), y = 104 + Math.round(h(k, 2, 771) * 40); if (Math.sin(t * 3 + k * 1.7) > 0.7) pset(x, y, C.blanco); }
  // la canoa que cruza lejos (o en invierno, alguien que camina por el hielo) y gente pequeña en la otra orilla
  { const u = ((t * 4) % 380) - 30, x = Math.round(330 - u), y = 108;
    if (!S.helado) { rect(x - 5, y, x + 5, y, P.madS); pset(x - 6, y - 1, P.madS); pset(x + 6, y - 1, P.madS); rect(x - 2, y - 3, x - 1, y - 1, P.rojoM); pset(x - 2, y - 4, hex('#e0b090')); rect(x + 2, y - 3, x + 3, y - 1, P.azulM); pset(x + 2, y - 4, hex('#e0b090')); const r = Math.sin(t * 4) > 0; linea(x + (r ? 0 : 4), y - 4, x + (r ? 3 : 1), y + 1, P.madD); for (let k = 2; k < 10; k += 2) pset(x + 6 + k, y + 1, P.lagoL); }
    else { rect(x, y - 4, x + 1, y - 1, P.rojoM); pset(x, y - 5, hex('#e0b090')); pset(x + (Math.floor(t * 4) % 2), y, C.k); } }
  for (const [x0, k] of [[60, 0], [250, 1]]) { const x = Math.round(x0 + Math.sin(t * 0.3 + k * 2) * 8), y = 100; rect(x, y - 4, x + 1, y - 2, k ? P.rojoM : P.aceroD); pset(x, y - 5, hex('#e0b090')); pset(x + (Math.floor(t * 3 + k) % 2), y - 1, C.k); }
  // la barca amarrada que se mece con su reflejo
  { const x = 106, y = 147 + Math.round(Math.sin(t * 1.6) * 0.8); if (!S.helado) for (let k = -10; k <= 10; k += 2) pset(x + k, y + 3, P.lagoD); poligono([[x - 12, y - 4], [x + 12, y - 4], [x + 9, y + 1], [x - 9, y + 1]], P.madS); rect(x - 11, y - 4, x + 11, y - 4, P.madL); rect(x - 9, y - 3, x + 9, y - 2, P.rojoM); rect(x - 2, y - 5, x + 2, y - 5, P.madD); linea(x - 12, y - 4, 93, 133, P.sacoS); }
  const g = e_prototipo(R, t, 172, 124, o.hundido ?? 0, S);
  // la nieve que cae o las hojas de otoño
  if (S.e === 'invierno') for (let k = 0; k < 70; k++) { const x = Math.round(((k * 47 + t * 8 + Math.sin(t + k) * 6) % 330) - 5), y = Math.round((k * 29 + t * (14 + k % 5 * 4)) % 182); if (!(x > 276 && y < 46)) pset(x, y, k % 4 ? C.blanco : P.nieveS); }
  if (S.e === 'otono') for (let k = 0; k < 14; k++) { const x = Math.round(((k * 71 + t * 10) % 340) - 10 + Math.sin(t * 2 + k) * 5), y = Math.round(60 + (k * 37 + t * 9) % 120), c = [P.alerce, P.alamo, P.alerceS][k % 3]; if (!(x > 276 && y < 46)) { pset(x, y, c); pset(x + (Math.floor(t * 4 + k) % 2), y + 1, c); } }
  if (S.e === 'verano') { const x = Math.round(150 + Math.sin(t * 1.3) * 40), y = Math.round(140 + Math.sin(t * 3.1) * 4); pset(x, y, P.azulM); pset(x + 1, y, P.azulM); if (Math.sin(t * 40) > 0) { pset(x, y - 1, C.blanco); pset(x + 1, y - 1, C.blanco); } }
  // de vez en cuando salta un pez y deja su anillo
  if (!S.helado) { const u = (t % 7) / 7; if (u < 0.25) { const r = Math.round(u * 40); for (let a = 0; a < 6.28; a += 0.3) pset(Math.round(250 + Math.cos(a) * r), Math.round(132 + Math.sin(a) * r * 0.25), P.lagoL); } }
  return { suelo: 166, orilla: [150, 179], embarcadero: [0, 138, 96, 143], pieEmbarcadero: 142, barca: [106, 147], horizonte: e_HOR, prototipo: g, sol: S.e === 'verano' ? [64, 28] : S.e === 'otono' ? [60, 40] : [80, 34] };
}

// el prototipo: el casco de bloques de hielo, la caseta de tablas con su tejado a dos aguas, la puerta, el ventanuco, la
// chimenea del motor del frío con su vaho y su reflejo; u = o.hundido (baja, se inclina y el hielo se va comiendo)
function e_prototipo(R, t, cx, wl, u, S) {
  const { rect, pset, linea, poligono } = R, P = e_C, s = Math.round(u * 26), k = u * 0.09, bob = Math.sin(t * 1.1) * 0.6 * (1 - u);
  const Y = (x, y) => Math.round(y + s + bob + (x - cx) * k);
  const pol = (pts, c) => poligono(pts.map(([x, y]) => [x, Y(x, y)]), c);
  const melt = Math.round(u * 8);
  // el reflejo oscuro y tembloroso de lo que queda fuera del agua
  if (!S.helado) for (let y = wl + 1; y < wl + 22 - s * 0.7; y++) { const dx = Math.round(Math.sin(y * 0.9 + t * 2.2) * 1.5); for (let x = cx - 30 + melt; x <= cx + 30 - melt; x++) if (((x + y) & 1) === 0) pset(x + dx, y, y < wl + 8 ? P.lagoD : e_mezcla(P.lagoD, P.mad, 0.3)); }
  R.recorte([0, 0, 319, wl]);
  // el casco: bloques de hielo apilados con sus juntas y gotas que escurren
  pol([[cx - 32 + melt, wl - 8], [cx + 32 - melt, wl - 8], [cx + 30 - melt, wl + 4], [cx - 30 + melt, wl + 4]], P.hie);
  for (let x = cx - 31 + melt; x < cx + 31 - melt; x++) { pset(x, Y(x, wl - 8), P.hieL); if ((x - cx) % 8 === 0) for (let y = wl - 7; y < wl + 4; y++) pset(x, Y(x, y), P.hieS); pset(x, Y(x, wl - 3), P.hieS); if (h(x, 1, 772) < 0.2) pset(x, Y(x, wl - 5), C.blanco); }
  for (let j = 0; j < 4; j++) { const x = cx - 26 + j * 15, l = 1 + ((Math.floor(t * 2) + j) % 4); linea(x, Y(x, wl - 7), x, Y(x, wl - 7) + l, P.hieL); }
  // la caseta de tablas
  pol([[cx - 26, wl - 22], [cx + 26, wl - 22], [cx + 26, wl - 8], [cx - 26, wl - 8]], P.mad);
  for (let x = cx - 25; x < cx + 26; x++) { if ((x - cx) % 4 === 0) linea(x, Y(x, wl - 22), x, Y(x, wl - 9), P.madS); else if (h(x, 2, 773) < 0.15) pset(x, Y(x, wl - 15), P.madL); }
  pol([[cx - 6, wl - 19], [cx + 2, wl - 19], [cx + 2, wl - 8], [cx - 6, wl - 8]], P.madD); pset(cx, Y(cx, wl - 13), P.laton);
  pol([[cx + 10, wl - 19], [cx + 18, wl - 19], [cx + 18, wl - 14], [cx + 10, wl - 14]], P.luzC); linea(cx + 14, Y(cx + 14, wl - 19), cx + 14, Y(cx + 14, wl - 14), P.madD);
  for (const dx of [-20, -14]) pol([[cx + dx, wl - 18], [cx + dx + 4, wl - 18], [cx + dx + 4, wl - 10], [cx + dx, wl - 10]], P.acero);
  // el tejado a dos aguas con la tela asfáltica, su alero y la nieve en invierno
  pol([[cx - 30, wl - 21], [cx, wl - 33], [cx + 30, wl - 21]], P.negroL); pol([[cx, wl - 33], [cx + 30, wl - 21], [cx + 4, wl - 21]], P.negro);
  for (let x = cx - 28; x < cx + 29; x += 3) pset(x, Y(x, wl - 22), P.madL);
  if (S.e === 'invierno') pol([[cx - 30, wl - 22], [cx, wl - 34], [cx + 30, wl - 22], [cx + 28, wl - 24], [cx, wl - 32], [cx - 28, wl - 24]], P.nieve);
  // la chimenea del motor del frío y su vaho
  pol([[cx + 14, wl - 36], [cx + 17, wl - 36], [cx + 17, wl - 26], [cx + 14, wl - 26]], P.aceroD);
  R.recorte(null);
  if (u < 0.85) for (let i = 0; i < 6; i++) { const q = ((t * 0.5 + i / 6) % 1), x = Math.round(cx + 15 + q * 8 + Math.sin(q * 6) * 1.5), y = Y(cx + 15, wl - 38) - Math.round(q * 14), r = Math.round(q * 2); for (let j = -r; j <= r; j++) for (let kk = -r; kk <= r; kk++) if ((x + kk + y + j) & 1) pset(x + kk, y + j, P.vaho); }
  // el agua que lame el casco
  for (let x = cx - 33 + melt; x <= cx + 33 - melt; x++) if (Math.sin(x * 0.8 + t * 4) > 0) pset(x, wl + (x & 1), S.helado ? P.nieve : C.blanco);
  return { x: cx, linea: wl, techo: Y(cx, wl - 33), casco: [cx - 32, wl - 8, cx + 32, wl + 4] };
}

// la orilla de delante del lago (delante de los personajes): matas, juncos que se mecen, piedras y
// dos pinos de primer plano en los bordes (x 0–38 desde y 30 y x 290–320 desde y 76); según la estación, hierba verde, seca o nevada, y hojas en el suelo
function e_orilla(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C, S = e_estacion(o), nv = S.e === 'invierno';
  // dos pinos de primer plano en los bordes, que enmarcan y se mecen (el de la derecha, más bajo, lejos de Atom)
  for (const [x, top, s] of [[9, 30, 1], [312, 76, 0.8]]) { rect(x - 1, top + 8, x + 2, 179, P.madD); rect(x - 1, top + 8, x - 1, 179, P.madS);
    for (let k = 0; k < 9; k++) { const m = Math.sin(t * 0.8 + x + k * 0.3) * (1.6 - k * 0.15), yt = Math.round(top + k * 14 * s), yb = Math.round(yt + 17 * s), w = (4 + k * 3) * s, xt = x + m;
      poligono([[xt, yt], [x - w + m, yb], [x + w + m, yb]], P.pino2); poligono([[xt, yt], [x - w + m, yb], [x - w * 0.25 + m, yb]], P.pino1);
      for (let i = -Math.floor(w); i <= w; i += 2) { pset(Math.round(x + i + m), yb + ((i >> 1) & 1), P.pino2); if (i < 0 && h(i, k, 783) < 0.5) pset(Math.round(x + i + m), yb - 2, P.pinoL); }
      if (nv) poligono([[xt, yt], [x - w * 0.8 + m, yb - 4 * s], [x - w * 0.2 + m, yb - 6 * s], [x + w * 0.4 + m, yb - 3 * s]], P.nieve); } }
  // las matas, los juncos y las piedras del borde de abajo
  for (let k = 0; k < 40; k++) { const x = Math.round(k * 8.2 + h(k, 1, 780) * 6), a = 4 + Math.round(h(k, 2, 780) * 8) + (x < 40 || x > 280 ? 8 : 0), m = Math.sin(t * 1.5 + k) * (a > 10 ? 1.5 : 0.8);
    for (let j = -2; j <= 2; j++) { const xb = x + j * 2; linea(xb, 179, Math.round(xb + j + m), 179 - a + Math.abs(j) * 2, nv ? (j % 2 ? P.nieveS : P.hierbaOS) : (j % 2 ? S.hierba[2] : S.hierba[0])); }
    if (a > 12 && !nv) { rect(Math.round(x + m), 179 - a - 3, Math.round(x + m) + 1, 179 - a, P.madS); } }
  for (const [x, r] of [[10, 7], [304, 8], [150, 3]]) { disco(x, 182, r, P.rocaS); disco(x - 1, 181, r - 1, P.roca); pset(x - r + 2, 182 - r + 1, P.rocaL); if (nv) rect(x - r + 1, 182 - r, x + r - 2, 183 - r, P.nieve); }
  if (S.e === 'otono') for (let k = 0; k < 20; k++) pset(Math.round(h(k, 3, 781) * 320), 174 + Math.round(h(k, 4, 781) * 6), [P.alerce, P.alamo, P.alamoS][k % 3]);
  if (nv) for (let x = 0; x < 320; x++) { const y = 176 + Math.round(Math.sin(x * 0.1) * 1.5 + h(x >> 2, 1, 782) * 2); rect(x, y, x, 179, (x + y) & 1 ? P.nieve : P.nieveM); }
  return { suelo: 166 };
}

// el fondo del lago (cámara 'fondo': ver la cabecera de hielo)
function e_fondoLago(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_C;
  const base = e_fijo(R, 'fondo', () => {
    const B = R.buf;
    e_degradado(R, 0, 0, 319, 179, [P.hondo0, P.hondo1, P.hondo2, P.hondo3, P.hondo4], 790, 0.5);
    // a lo lejos, en la bruma: rocas y troncos hundidos
    for (const [x, y, w, a] of [[30, 118, 40, 10], [210, 114, 50, 12], [120, 120, 30, 6]]) for (let j = 0; j < a; j++) { const ww = Math.round(w * Math.sqrt(1 - (j / a) ** 2) / 2); rect(x - ww, y - j, x + ww, y - j, e_mezcla(P.hondo2, P.hondo3, 0.5)); }
    linea(250, 110, 300, 124, P.hondo3); linea(250, 111, 300, 125, P.hondo3);
    // las laderas de roca del lago que bajan a los lados, con estratos y manchas de alga (dan la profundidad)
    for (const [pts, k] of [[[[-2, 34], [20, 46], [38, 62], [52, 84], [74, 104], [100, 130], [-2, 130]], 0], [[[322, 66], [300, 74], [284, 92], [266, 108], [244, 130], [322, 130]], 1]]) {
      poligono(pts, (x, y) => { const q = h(x >> 1, y >> 1, 801 + k), est = (y + Math.round(Math.sin(x * 0.2) * 2)) % 6 === 0; return est ? P.hondo4 : q < 0.2 ? P.hondo4 : q > 0.85 ? P.hondo2 : (y < 80 ? P.hondo2 : P.hondo3); });
      for (let i = 0; i < pts.length - 2; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; for (let s = 0; s <= 1; s += 0.05) { const x = Math.round(x0 + (x1 - x0) * s), y = Math.round(y0 + (y1 - y0) * s); pset(x, y, P.hondo1); pset(x, y + 1, P.alga); if (h(x, y, 802) < 0.3) pset(x, y - 1, P.algaS); } } }
    // el fondo de cieno con ondulaciones, piedras y su luz de arriba
    for (let x = 0; x < 320; x++) { const y0 = 128 + Math.round(Math.sin(x * 0.04) * 4 + Math.sin(x * 0.13 + 1) * 2); for (let y = y0; y < 180; y++) { const q = h(x >> 1, y >> 1, 791); let c = q < 0.2 ? P.cienoS : q > 0.85 ? P.cienoL : P.cieno; if (y === y0) c = P.cienoL; else if ((y - y0) % 7 === 3 && h(x >> 3, y, 792) < 0.5) c = P.cienoS; if (y > 166 && ((x + y) & 1)) c = P.cienoS; B[y * 320 + x] = c; } }
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 793) * 320), y = 136 + Math.round(h(k, 2, 793) * 40), r = 1 + Math.round(h(k, 3, 793) * 3); disco(x, y, r, P.guijaS); disco(x - 1, y - 1, Math.max(0, r - 1), P.guija); pset(x - r + 1, y - r + 1, P.guijaL); }
    // los restos: dos vigas grandes cruzadas, el trozo de tejado de tablas, los serpentines oxidados y el motor
    const viga = (x0, y0, x1, y1, g) => { for (let j = 0; j < g; j++) linea(x0, y0 + j, x1, y1 + j, j === 0 ? P.madL : j === g - 1 ? P.madD : (j % 2 ? P.madS : P.mad)); for (let i = 0; i < 8; i++) { const f = h(i, x0, 794), x = Math.round(x0 + (x1 - x0) * f), y = Math.round(y0 + (y1 - y0) * f); pset(x, y + 1, P.madD); pset(x + 1, y + 2, P.madD); } for (let i = 0; i < 14; i++) { const f = h(i, x0, 795), x = Math.round(x0 + (x1 - x0) * f), y = Math.round(y0 + (y1 - y0) * f); pset(x, y - 1, P.cienoL); pset(x + 1, y - 1, P.cieno); } };
    viga(40, 146, 150, 132, 6); viga(70, 160, 170, 150, 5);
    { const x0 = 176, y0 = 112; poligono([[x0, y0 + 30], [x0 + 30, y0], [x0 + 74, y0 + 26], [x0 + 46, y0 + 52]], P.madS);
      for (let k = 0; k < 9; k++) linea(x0 + 3 + k * 5, y0 + 30 - k * 3, x0 + 49 + k * 3, y0 + 52 - k * 3 - 0 + k * 0, k % 2 ? P.mad : P.madD);
      linea(x0, y0 + 30, x0 + 30, y0, P.madL); linea(x0 + 30, y0, x0 + 74, y0 + 26, P.madD); for (let k = 0; k < 30; k++) pset(x0 + 14 + Math.round(h(k, 1, 796) * 46), y0 + 12 + Math.round(h(k, 2, 796) * 30), P.algaS);
      for (let x = x0 + 26; x < x0 + 40; x++) pset(x, y0 + 3 + Math.round((x - x0 - 26) * 0.6), P.negroL); }
    for (let k = 0; k < 4; k++) { const y = 156 + k * 4; linea(96, y, 196, y - 3, P.oxidoS); linea(96, y - 1, 196, y - 4, k % 2 ? P.oxido : P.oxidoL); for (let x = 98; x < 196; x += 9) pset(x, y - 2 - Math.round((x - 96) * 0.03), P.oxidoS); }
    for (let k = 0; k < 3; k++) { const x = 196 + (k % 2) * 3, y = 154 + k * 4; disco(x, y, 2, P.oxidoS); pset(x + 1, y - 1, P.oxido); }
    { const x0 = 238, y0 = 140; rect(x0, y0, x0 + 26, y0 + 16, P.oxidoS); rect(x0 + 1, y0 + 1, x0 + 25, y0 + 15, P.oxido); rect(x0 + 1, y0 + 1, x0 + 25, y0 + 2, P.oxidoL); for (let x = x0 + 3; x < x0 + 24; x += 4) rect(x, y0 + 4, x + 1, y0 + 13, P.oxidoS);
      disco(x0 + 32, y0 + 8, 8, P.oxidoS); disco(x0 + 32, y0 + 8, 6, P.oxido); disco(x0 + 32, y0 + 8, 2, P.oxidoS); for (let a = 0; a < 6.28; a += 1.05) linea(x0 + 32, y0 + 8, Math.round(x0 + 32 + Math.cos(a) * 6), Math.round(y0 + 8 + Math.sin(a) * 6), P.oxidoS);
      for (let k = 0; k < 40; k++) pset(x0 + Math.round(h(k, 1, 797) * 40), y0 + Math.round(h(k, 2, 797) * 16), k % 3 ? P.cienoS : P.algaS); rect(x0 - 2, y0 + 16, x0 + 42, y0 + 17, P.cienoS); }
    // pernos, una cuña de hielo que ya no está (solo su hueco en el cieno) y conchas
    for (let k = 0; k < 10; k++) { const x = 20 + Math.round(h(k, 4, 798) * 280), y = 150 + Math.round(h(k, 5, 798) * 26); pset(x, y, P.oxidoL); pset(x + 1, y, P.oxidoS); }
  });
  void base;
  // ── la vida: los rayos de luz, las cáusticas en el fondo, las algas, las motas, las burbujas y los peces
  for (let k = 0; k < 4; k++) { const x0 = 30 + k * 60 + Math.round(Math.sin(t * 0.3 + k) * 8), w = 10 + (k % 2) * 6; for (let y = 0; y < 128; y++) { const d = Math.round(y * 0.35); for (let x = x0 + d; x < x0 + d + w - y * 0.04; x++) if (((x + y) & 1) === 0 && x < 268 && x >= 0) { const i = y * 320 + x; R.buf[i] = e_mezcla(R.buf[i], hex('#a8e0d8'), 0.42 * (1 - y / 150)); } } }
  // la superficie vista desde abajo: la lámina de luz que tiembla (no en la esquina de Atom) y la barca en silueta
  for (let x = 0; x < 268; x++) { const y = 3 + Math.round(Math.sin(x * 0.15 + t * 2) * 1.2 + Math.sin(x * 0.05 - t) * 1); for (let j = 0; j <= y; j++) pset(x, j, j === y ? hex('#c8f0e8') : ((x + j) & 1) ? hex('#8ad0c8') : P.hondo0); if (Math.sin(x * 0.4 + t * 3) > 0.8) pset(x, y + 1, C.blanco); }
  { const bx = 222 + Math.round(Math.sin(t * 0.4) * 2); for (let j = 0; j < 5; j++) { const w = 22 - j * 3; rect(bx - w, 4 + j, bx + w, 4 + j, j === 0 ? P.hondo3 : P.hondo4); } linea(bx + 14, 8, bx + 30, 40, P.hondo3, 3); for (let k = -18; k <= 18; k += 6) pset(bx + k + Math.round(Math.sin(t * 2 + k) * 1), 3, C.blanco); }
  for (let y = 130; y < 180; y += 2) for (let x = (y >> 1) & 1; x < 320; x += 2) { const q = Math.sin(x * 0.21 + t * 1.7 + Math.sin(y * 0.3 + t)) + Math.sin(y * 0.4 - x * 0.07 + t * 1.2); if (q > 1.55) pset(x, y, P.cienoL); }
  for (let k = 0; k < 16; k++) { const x0 = Math.round(8 + h(k, 1, 799) * 300), yb = 132 + Math.round(h(k, 2, 799) * 40), a = 14 + Math.round(h(k, 3, 799) * 22);
    for (let j = 0; j < a; j++) { const x = Math.round(x0 + Math.sin(t * 1.3 + j * 0.25 + k) * j * 0.18), y = yb - j; pset(x, y, j % 4 === 0 ? P.algaL : P.alga); if (j % 5 === 2) pset(x + 1, y, P.algaS); } }
  for (let k = 0; k < 40; k++) { const x = Math.round((h(k, 1, 800) * 320 + t * (2 + k % 3)) % 320), y = Math.round((h(k, 2, 800) * 170 + Math.sin(t * 0.5 + k) * 4)); if (!(x > 276 && y < 46)) pset(x, y, P.hondo0); }
  for (let k = 0; k < 6; k++) { const u = ((t * 0.3 + k / 6) % 1), x = Math.round(270 + Math.sin(u * 12 + k) * 2), y = Math.round(140 - u * 110); if (y > 48) { pset(x, y, P.hondo0); pset(x + 1, y, C.blanco); pset(x, y - 1, C.blanco); } }
  // la trucha que cruza y el banco de pececillos
  { const u = ((t * 13 + 120) % 400) - 40, x = Math.round(u), y = 92 + Math.round(Math.sin(t * 0.9) * 6), c = Math.sin(t * 8) > 0 ? 1 : 0;
    for (let j = -3; j <= 3; j++) { const w = Math.round(Math.sqrt(1 - (j / 3.6) ** 2) * 10); rect(x - w, y + j, x + w, y + j, j < 0 ? P.trucha : j > 1 ? P.truchaL : P.truchaS); }
    poligono([[x - 9, y], [x - 15, y - 4 + c], [x - 15, y + 4 - c]], P.truchaS); for (let i = -6; i < 6; i += 3) pset(x + i, y - 1, P.rojoM); pset(x + 7, y - 1, C.k); pset(x + 6, y - 2, C.blanco); rect(x - 2, y - 5, x + 3, y - 4, P.truchaS); }
  // una perca grande que ronda despacio junto al motor, con sus rayas
  { const x = Math.round(210 + Math.sin(t * 0.35) * 22), y = 124 + Math.round(Math.sin(t * 0.7) * 3), d = Math.cos(t * 0.35) > 0 ? 1 : -1, c = Math.sin(t * 6) > 0 ? 1 : 0;
    for (let j = -4; j <= 4; j++) { const w = Math.round(Math.sqrt(1 - (j / 4.6) ** 2) * 9); rect(x - w, y + j, x + w, y + j, j < -1 ? hex('#6a7a3a') : j > 2 ? hex('#c8c890') : hex('#8a9a4a')); }
    for (let i = -6; i <= 5; i += 3) linea(x + i, y - 4, x + i + 1, y + 2, hex('#3e4a24')); poligono([[x - 8 * d, y], [x - 14 * d, y - 4 + c], [x - 14 * d, y + 4 - c]], hex('#c86a3a')); pset(x + 6 * d, y - 1, C.k); pset(x + 5 * d, y - 2, C.blanco); poligono([[x - 3, y - 4], [x + 3, y - 4], [x, y - 8]], hex('#4e5a2a')); }
  for (let k = 0; k < 9; k++) { const x = Math.round(300 - ((t * 11 + k * 6) % 380) + Math.sin(t + k) * 3), y = Math.round(58 + (k % 3) * 5 + Math.sin(t * 2 + k) * 2); rect(x - 2, y, x + 1, y, P.pez); pset(x + 2, y - 1, P.pez); pset(x + 2, y + 1, P.pez); pset(x - 2, y, C.k); }
  return { fondo: 132, restos: { vigas: [40, 132, 170, 165], tejado: [176, 112, 250, 164], serpentin: [96, 150, 200, 168], motor: [238, 140, 272, 158] } };
}
