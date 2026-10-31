// Fontanería y decorados del episodio 16 (homenaje a las aventuras de LucasArts, 1987–1998 y hoy) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Ocho decorados (guion.md): A la mansión del científico loco, B el estudio
// de los ochenta, C la isla de los piratas, D tres épocas en una casa, E la carretera, F la Tierra de los Muertos, G el
// espacio, H hoy; más las piezas que no son humanas (los dos tentáculos, el perro y el conejo detectives, el esqueleto
// agente de viajes, el demonio mecánico, el mono de tres cabezas, el hámster, el retrete del tiempo) y la línea de verbos
// del homenaje. Homenaje dibujado por nosotros: reconocible por la silueta, sin copiar sprites ni logotipos, sin letras.
// Desde el 16, CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y 'cerca' u otra que diga su cabecera),
// con el mismo detalle: dentro de una escena un encuadre no se repite.
//
//   import * as T from '/atomo/plato/escenas/la-comun.js';
//   const { E, R, M } = await T.preparar('la-gancho');
//   T.rodar(E, R, [[0, (t) => T.mansion(R, t, { encuadre: 'rio', luz: 'noche' })]], { año: 1993 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el lodo tóxico y los dos tentáculos
    lodo: '#6ac83a', lodoS: '#3e8a2a', lodoL: '#b8f070', morado: '#8a3ac8', moradoS: '#5e2490', moradoL: '#b87ae8',
    verde: '#3ab84a', verdeS: '#2a8434', verdeL: '#8ae87a', ventosa: '#f0d8a8',
    // los piratas (noche de luna, niebla verde del fantasma), la Tierra de los Muertos (cempasúchil, art déco)
    marNoche: '#1e3a5a', marNocheL: '#3a6a8a', niebla: '#8ae8a8', cempasuchil: '#f0a020', calaca: '#f2eee2', deco: '#c8a84a',
    // las pantallas de los ochenta (fósforo verde y ámbar) y la línea de verbos
    fosforo: '#5af08a', ambar: '#f0b03a', verbos: '#2a2a4a', verbosL: '#8a8ab8', cursor: '#f2eee2',
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
  const E = await escena(id, 'ep16');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: el disquete (1987–1990), el CD (1991–1995) y el mando (1996–2026)
  Object.assign(R.ICONOS, {
    disquete: ['#######', '#.###.#', '#.###.#', '#######', '#.....#', '#.###.#', '#######'],
    cd: ['..###..', '.#...#.', '#..#..#', '#.#.#.#', '#..#..#', '.#...#.', '..###..'],
    mando: ['.......', '.#####.', '#.#..##', '###.#.#', '#.#..##', '.#####.', '.......'],
  });
  R.tramosTiempo([[1987, 1990, R.PALA.ORO, 'disquete'], [1991, 1995, R.PALA.AZUL, 'cd'], [1996, 2026, R.PALA.ROJO, 'mando']]);
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

// ── A · La mansión del científico loco ──────────────────────────────────────────────────────────────────────────────
// La mansión de un científico loco, torcida y colorida como un dibujo animado clásico (homenaje propio, sin copiar la
// del juego): cuerpo de tablas salmón con cornisa de dentículos, torre del laboratorio de piedra azulada que se inclina
// (cúpula de cobre verde con telescopio y la antena de dos varillas con su arco eléctrico), torrecilla verde menta con
// sombrero de bruja rizado, tejado de escamas moradas con hastial puntiagudo, buhardillas, chimenea torcida que humea,
// veleta-murciélago que gira y ventanas en las que, encendidas, pasa alguna silueta. o.encuadre:
//   'rio' (por omisión): detrás de la mansión, el río de lodo tóxico verde que burbujea, hace espuma, echa vapores y
//     brilla (reflejo de la luna y de las ventanas); o.luz 'noche' (por omisión), 'dia', 'atardecer'. o.camara:
//     'general': cielo con nubes de tres tonos a tres velocidades y murciélagos (o pájaros), la mansión al fondo, a la
//       izquierda la máquina (depósito de cobre, tanque de cristal con lodo, manómetros, rueda que gira, chimenea) cuyo
//       tubo vierte el chorro de lodo; la orilla de acá con barro, hierba seca, piedras, un bidón que gotea, juncos, el
//       cartel de peligro con calavera en pictograma (x 242) y un árbol retorcido a la derecha.
//     'cerca': a ras de suelo: la pared de piedra del laboratorio con su ventana de sótano verde con barrotes, el tubo
//       grande que baja y vierte un reguero de lodo, la orilla (y 147) con el cartel y juncos, y el lodo en primer
//       término (y 150–180) con burbujas grandes; sitio para los dos tentáculos a o.s 2.
//   'fachada': la mansión de frente en su colina, con escalinata, porche de columnas salomónicas y frontón, puerta de dos
//     hojas con montante; o.anyo 1987 (más apagada; de noche por omisión) o 1993 (colores de dibujo animado; de día por
//     omisión); o.hd (2016: repintada, más viva y limpia); o.luz manda sobre lo anterior; o.rebote (0–1) la estira y la
//     hace rebotar como en los dibujos clásicos (o.ritmo: botes por segundo, 1,1). o.camara: 'general' (jardín con la
//     fuente de lodo y su rana, reja con cancela abierta, gárgola, buzón, seto con forma de tentáculo, luciérnagas o
//     mariposas) o 'puerta' (el porche de cerca: faroles con polillas, mirilla con un ojo que se asoma cada 7 s, aldaba,
//     felpudo, planta carnívora que abre la boca, botellas de leche, hortensias; o.puerta 0–1 abre las dos hojas hacia
//     dentro: el vestíbulo con la luz verde que late y el charco de luz por la escalinata; la rama baja de un árbol en
//     primer término cuelga por arriba y su copa asoma por la derecha por debajo de y 48; detrás de Atom y de la barra
//     del año el tejado queda en sombra, tranquilo).
//   'cuarto': el cuarto del ordenador: un ordenador beige de los ochenta con teclado, disquetera con piloto, caja de
//     disquetes, joystick y flexo encendido sobre una mesa con cajones; ventana con cortinas de terciopelo y la noche (o
//     el día, según o.luz) fuera; póster de un cohete sin letras, reloj de pared con péndulo, estantería con libros,
//     lámpara de lava y la jaula del hámster con la rueda que gira; silla giratoria, alfombra ovalada. o.pantalla:
//     función (R, t, [x0, y0, x1, y1]) que pinta dentro de la pantalla (ya recortada); sin ella, el juego de 1987 en
//     píxeles gordos (la mansión de noche, un chaval que anda, el cursor en cruz y la línea de verbos sin letras).
//     o.camara 'general' o 'pantalla' (el monitor de cerca: carcasa beige, nota pegada, rejilla, piloto; cristal con
//     barrido, viñeta y brillo).
//   'pasillo': de lado, como en el juego de 1987: tres puertas (una entreabierta con luz verde, la del centro cerrada para
//     siempre con tablas en aspa, cadenas y candado, otra normal), retrato con ojos que siguen, cuadros torcidos, reloj de
//     pie con péndulo, consola con jarrón y candelabro, apliques con velas, la lámpara del techo que oscila con su charco
//     de luz, alfombra larga y un ratón que cruza; o.camara 'general' o 'puerta' (la puerta cerrada de cerca, con luz
//     verde que late por debajo).
// Todos admiten o.anyo y o.hd (cambian los colores). Devuelve { suelo, pies: [x0, x1] … } y lo propio de cada encuadre
// (puerta, rellano, pantalla, mesa, rio, orilla(x), tubo, cartel…): ver las coordenadas en cada a_ de abajo.
export function mansion(R, t, o = {}) {
  const enc = o.encuadre ?? 'rio', anyo = o.anyo ?? 1993, luz = o.luz ?? (enc === 'fachada' ? (anyo < 1990 ? 'noche' : 'dia') : 'noche');
  const P = a_paleta(luz, anyo, !!o.hd), clave = [enc, o.camara ?? 'general', luz, anyo, o.hd ? 1 : 0].join('|');
  if (enc === 'fachada') return a_fachada(R, t, o, P, luz, clave);
  if (enc === 'cuarto') return a_cuarto(R, t, o, P, clave);
  if (enc === 'pasillo') return a_pasillo(R, t, o, P, clave);
  return a_orilla(R, t, o, P, clave);
}
// ── B · El estudio de los ochenta ────────────────────────────────────────────────────────────────────────────────────
// Un estudio de videojuegos de California entre 1987 y 1990: techo de placas con fluorescentes que parpadean, pared de
// yeso tramado con friso de tablas, moqueta de rombos, ventana con persiana, palmeras, colinas doradas, nubes y un coche
// que pasa; mesas de madera con monitores de tubo beige de fósforo verde y ámbar (y uno de color en 1989–1990), CPU con
// disquetera y piloto, teclados, cajas de disquetes, tazas que humean, un ventilador que gira, papeles con bocetos; el
// corcho con dibujos (barco pirata, mono, mansión, tentáculo, fantasma) sin letras, el reloj que anda y la puerta de
// cristal esmerilado por la que pasa alguien. Cada encuadre con dos cámaras (o.camara), con el mismo detalle:
//   'oficina': la sala con tres puestos (suelo y 152; ventana x 12–78; puertas y mesas en la geometría que devuelve);
//     o.camara 'general' o 'mesa' (la mesa del puesto central de cerca: el monitor grande con la pantalla (o.pantalla:
//     función (R, x0, y0, x1, y1, t) que pinta dentro; por omisión una aventura en fósforo verde con su puerta, o.puerta
//     0–1, y la línea de verbos, o.activo, o.cursor), el teclado, la disquetera con un disquete, el ratón, la taza, la
//     libreta con bocetos; o.modo 'aventura' (por omisión), 'tachado' (un teclado tachado en la pantalla) o 'codigo').
//   'pizarra': la pared con la pizarra blanca grande (x 86–230, y 22–131: el borde de abajo, a la altura de la mano de un
//     chibi de pie en el suelo 152; la «palabra» hecha de pictogramas y flechas arriba, o.trazo 0–1 la va dibujando,
//     y un «?» que se vuelve sonrisa con o.sonrisa 0–1), el corcho y, a la derecha, la mesita con la máquina de escribir
//     (o.hoja 0–1: los renglones sin letras que salen y el pulgar abajo dibujado al final); o.camara 'general' o
//     'corcho' (el corcho de cerca con todos los bocetos, chistes en bocadillos y cordeles, y la mesa de reuniones por
//     delante: los que estén detrás quedan tapados de cintura para abajo, lo pinta solo con R.delante).
//   'dibujo': la mesa de dibujo inclinada con un fondo pintado en papel (o.papel 'fondo' o 'comic', con el perro y el
//     conejo escondidos), botes, pinceles y el flexo; al lado el escáner de sobremesa con su luz que pasa y el monitor de
//     color donde aparece el dibujo en píxeles (o.escaneo 0–1; sin él, en bucle); o.camara 'general' o 'escaner' (el
//     escáner y el monitor de cerca, inserto para T.mano).
//   'musica': el rincón de la música: el sintetizador en su soporte, dos altavoces que laten, el rack con pilotos y
//     vúmetros, el ordenador de ámbar con pentagramas, cables y auriculares; o.camara 'general' o 'teclado' (el teclado
//     de cerca, las teclas que se hunden con o.toca, los altavoces y la pantalla).
//   'disquetes': una fila de disquetes de juegos distintos sobre la mesa, cada etiqueta con su dibujo y la misma línea de
//     verbos; o.sello (0–1): el sello de la casa (un círculo dorado con estrella) cae sobre cada uno; o.camara 'general'
//     (siete disquetes) o 'cerca' (tres, grandes).
// o.anyo (1987–1990): en 1987 el tercer puesto tiene una máquina de escribir; desde 1989, un monitor de color.
// Devuelve { suelo, pies, pantalla?, mesa?, mesas?, puerta?, ventana?, pizarra?, maquina?… } (la geometría).
export function estudio(R, t, o = {}) {
  const enc = o.encuadre ?? 'oficina', cam = o.camara ?? 'general', anyo = o.anyo ?? 1987;
  if (enc === 'oficina') return cam === 'general' ? b_estOficina(R, t, o, anyo) : b_estMesa(R, t, o);
  if (enc === 'pizarra') return cam === 'general' ? b_estPizarra(R, t, o) : b_estCorcho(R, t, o);
  if (enc === 'dibujo') return cam === 'general' ? b_estDibujo(R, t, o) : b_estEscaner(R, t, o);
  if (enc === 'musica') return cam === 'general' ? b_estMusica(R, t, o) : b_estTeclado(R, t, o);
  if (enc === 'disquetes') return b_estDisquetes(R, t, o, cam !== 'general');
  return b_estOficina(R, t, o, anyo);
}
// ── C · La isla de los piratas ───────────────────────────────────────────────────────────────────────────────────────
// Un puerto pirata del Caribe de noche, homenaje propio (no copia los fondos del juego): luna grande con cráteres, cielo
// tramado con estrellas que titilan, nubes de cuatro tonos a tres velocidades, murciélagos, agua con olas, el camino de la
// luna y reflejos de los barcos. Cada encuadre trae dos cámaras con el mismo detalle (o.camara):
//   'muelle': 'general' — el muelle de tablas con sus pilotes y cabos, la taberna iluminada a la derecha (ventanas con
//     piratas en sombra que brindan, puerta abierta con luz que cae en las tablas, letrero de jarra colgante que se mece,
//     chimenea con humo, barriles con un gato), un galeón fondeado y una balandra con sus reflejos, un bote de remos que
//     cruza, la isla lejana con la mansión de la gobernadora encendida; o.barco (x): un barco que llega al puerto, con
//     cubierta para dos personajes (después de pintarlos, islaBorda(R, t, x) pinta su borda por delante).
//     'taberna' — la fachada de cerca: dos plantas, dos ventanas grandes con piratas dentro, la puerta con luz, letrero
//     de jarra, faroles, banco, tablón de avisos con pictogramas, barriles con un loro; a la derecha, el mar y un farol.
//   'bosque': 'general' — la selva de noche: el claro del duelo iluminado por la luna con rayos entre los árboles, el
//     camino, el mapa del tesoro clavado en un árbol, un poste con flechas, luciérnagas, un búho, setas que brillan,
//     neblina baja. 'claro' — el claro de cerca: el tronco gigante con el mapa clavado con una daga, la pala hincada en un
//     montón de tierra con un cofre que asoma, el tronco caído con setas y una rana, lianas y helechos que se mecen; las copas de la derecha bajan para dejar cielo
//     tramado con nubes detrás de Atom.
//   'mansion': 'general' — la mansión de la gobernadora en la colina (pórtico, tejas, balcón, chimeneas, palmeras), el
//     ídolo dorado tras una ventana del piso alto, el jardín con la fuente y faroles, la verja abierta abajo y el mar lejos.
//     'ventana' — la ventana de cerca: estuco con grietas, contraventanas, la buganvilla, y dentro el ídolo dorado en su
//     pedestal que brilla, cortinas, un cuadro y velas; una caja bajo la ventana para asomarse.
//   'fondo': el fondo del mar con rayos de luz que se mueven, cáusticas en la arena, algas, corales, peces, burbujas, un
//     cangrejo, un ancla con su cadena y un pecio al fondo; 'general' o 'cerca' (el ancla grande, la roca con corales).
//   'barcoFantasma': 'general' — el barco fantasma translúcido en la niebla verde, velas rotas que brillan, tripulación de
//     fantasmas pequeños, faroles verdes; la orilla de rocas delante. 'cerca' (o 'cubierta') — su cubierta: la borda, el
//     timón que gira solo, cañones, el mástil con la vela rota, fantasmas en las vergas y la niebla que corre.
// o.luz 'noche' (por omisión) o 'dia' (cielo azul con sol, sin luces encendidas). Devuelve { suelo, pies, … } con lo que
// cada encuadre tiene (puerta, ventanas, agua, claro, ancla, timón…): ver la geometría al pie de cada encuadre.
export function isla(R, t, o = {}) {
  const P = c_pal(o.luz), enc = o.encuadre ?? 'muelle', cerca = (o.camara ?? 'general') !== 'general';
  if (enc === 'bosque') return cerca ? c_claro(R, t, P, o) : c_bosque(R, t, P, o);
  if (enc === 'mansion') return cerca ? c_ventanaIdolo(R, t, P, o) : c_colina(R, t, P, o);
  if (enc === 'fondo') return c_fondoMar(R, t, P, o, cerca);
  if (enc === 'barcoFantasma') return cerca ? c_cubierta(R, t, P, o) : c_fantasmal(R, t, P, o);
  return cerca ? c_taberna(R, t, P, o) : c_muelle(R, t, P, o);
}
// ── D · Tres épocas en una casa ──────────────────────────────────────────────────────────────────────────────────────
// La misma casa (la mansión, en una versión propia) en tres épocas, con la MISMA arquitectura en las tres (la ventana de
// la izquierda, la puerta, la chimenea con su cuadro, el reloj de pie y la escalera al rellano) vestida de cada época.
// o.encuadre:
//   'pasado' (1793): la casa como posada colonial: yeso encalado con entramado de roble, suelo de tablones, alfombra
//     trenzada; dos caballeros con peluca escriben con pluma en la mesa larga (mojan la pluma en el tintero), velas que
//     tiemblan, el fuego del hogar con la olla, el cuadro de un barco; por la ventana, la tormenta (lluvia, nubes de tres
//     tonos a tres velocidades, el pueblo con su campanario y, a lo lejos, una cometa); cada relámpago ilumina el cuarto.
//     o.camara 'general', 'cerca' (el escritorio junto al ventanal en la tormenta: candelabro, tintero con la pluma que
//     escribe sola, el pergamino con rayas, libros, globo terráqueo, la librería y el gato en la alfombra) o 'cometa' (el
//     tejado en la tormenta: la azotea con barandilla, chimeneas que humean, la veleta; la cometa con su cola y la llave
//     colgada del hilo; el rayo cae en la cometa y baja chispeando por el hilo). o.rayo: el instante del rayo grande
//     (por omisión, uno cada 5,3 s); o.mano [x, y]: dónde acaba el hilo de la cometa (la mano del que la vuela).
//   'presente' (1993): el vestíbulo de dibujo animado: papel pintado verde azulado, zócalo granate de cuarterones, suelo
//     de baldosas a cuadros con su brillo, el sofá, el hámster en su rueda, la máquina de chicles, la escalera con
//     alfombra roja; por la ventana, el jardín al sol con los tres retretes portátiles. o.camara 'general' o 'cerca' (el
//     jardín: la fachada de la mansión, setos, el aspersor, la pila con un pájaro, y la losa con los tres retretes; lomas,
//     depósito de agua y poste del teléfono con gorriones, nubes de tres tonos en tres capas, bandada, un gato en la valla,
//     baldosas del camino, macizo de tulipanes, gnomo, manguera en su carrete, triciclo, matas y mariposas;
//     o.retretes: true (por omisión, cerrados), false (los pinta la escena) o una lista de opciones de T.retrete).
//   'futuro' (2193): el palacio de los tentáculos: paneles de metal morado con remaches y emblemas de tentáculo,
//     estandartes morados que ondean, el hogar convertido en un reactor de lodo que burbujea, el retrato de un tentáculo
//     coronado, el mismo reloj de pie con tubos, jaulas cómicas con humanos pequeños sobre almohadas y con caramelos
//     (saludan, comen, balancean los pies), un tentáculo guardián que patrulla el rellano; por la ventana, la ciudad
//     del futuro con torres de tentáculo y platillos. o.camara 'general' o 'cerca' (la sala de las jaulas: la jaula
//     grande del centro, a escala de los protagonistas, con su almohada, su cuenco de caramelos y la puerta (o.jaula
//     0–1, abierta); el dispensador de caramelos que deja caer uno de vez en cuando, la galería del fondo con jaulas
//     pequeñas y los guardianes).
//   'triple': la pantalla partida en tres franjas (1793, 1993 y 2193, de izquierda a derecha), cada una con su época
//     viva y su año abajo; un retrete diminuto salta de franja en franja por el hilo que las une. Con o.camara 'general'
//     las tres franjas enseñan el mismo trozo de la casa (la ventana y la puerta); con 'cerca', el rincón cercano de cada
//     época (el escritorio, los retretes del jardín, la jaula grande).
// Devuelve { suelo, pies, … } (ver cada encuadre: ventana, puerta, mesa, retretes, jaula, cometa, franjas).
export function epocas(R, t, o = {}) {
  const enc = o.encuadre ?? 'presente', cam = o.camara ?? 'general';
  if (enc === 'triple') return d_triple(R, t, o);
  const era = enc === 'pasado' ? 1793 : enc === 'futuro' ? 2193 : 1993;
  if (cam === 'general') return d_salon(R, t, era, o);
  if (enc === 'pasado') return cam === 'cometa' ? d_tejado(R, t, o) : d_escritorio(R, t, o);
  if (enc === 'presente') return d_jardin(R, t, o);
  return d_jaulas(R, t, o);
}
// ── E · La carretera ─────────────────────────────────────────────────────────────────────────────────────────────────
// La América de las carreteras de 1993 (homenaje propio, sin copiar ni letras). Cada encuadre trae dos cámaras con el
// mismo detalle (o.camara). o.encuadre:
//   'carretera': una carretera recta por el desierto: cielo tramado con cúmulos de tres tonos a tres velocidades, la
//     estela de un avión y un halcón que planea; dos filas de mesetas (las lejanas malvas, las cercanas de arenisca con
//     estratos, regueros y talud de derrubios), la llanura con matas, una cerca y un remolino de polvo que avanza; postes
//     de teléfono con sus cables (un pájaro se posa y salta), un cartel con la huella gigante en pictograma, el asfalto
//     con áridos, grietas, parches de alquitrán, la línea discontinua y el espejismo; en primer término arena con rizos,
//     piedras con su sombra, un saguaro con un pájaro, nopales con tunas, matas que se mecen, la señal de la ruta 66 y
//     una planta rodadora que cruza. El coche de los sesenta pasa por el carril de delante (pieza coche60).
//     o.camara 'general' (todo eso) o 'coche' (el coche de cerca, de lado, en marcha, a escala 1,6: las mesetas lejanas
//     corren despacio, los postes y las matas deprisa, las rayas del asfalto vuelan, el polvo y el humo salen detrás y
//     las ruedas giran). o.luz 'dia' (por omisión) o 'tarde' (el sol bajo tras la meseta y el cielo de atardecer).
//     o.coche (false: sin coche), o.cocheX (fija el centro del coche; si no, cruza en bucle), o.cocheDir (1 o −1),
//     o.ocupantes(asientos): función que pinta a quien va dentro (se recorta a las ventanillas y la puerta lo tapa),
//     o.sirena (la luz roja del techo gira).
//   'feria': una feria al atardecer: la noria que gira con sus barquillas y bombillas, la carpa grande de rayas rojas y
//     blancas con su faldón de picos, su bandera al viento y la entrada; casetas con toldo a rayas, premios colgados,
//     el algodón de azúcar; guirnaldas de bombillas que titilan, el letrero de la huella gigante (pictograma) con el
//     marco de bombillas que corren, gente pequeña que pasea con globos, el suelo de tierra con serrín, paja, entradas y
//     palomitas. o.camara 'general' o 'carpa' (la entrada de la carpa de cerca: la lona con pliegues, la taquilla con su
//     taquillero, el foco que barre dentro, y la jaula del Bigfoot vacía con los barrotes doblados, la puerta que se
//     mece y las huellas gigantes que se van).
//   'atraccion': una atracción de borde de carretera absurda en las praderas: el ovillo de cordel más grande del mundo
//     bajo su pabellón de madera y un dinosaurio gigante de fibra de vidrio; el aparcamiento con plazas pintadas, dos
//     coches aparcados, la tienda de recuerdos con toldo, un cartel de flecha con bombillas, una granja con molino que
//     gira y trigo que ondula, turistas pequeños que hacen fotos. o.camara 'general' o 'cerca' (el ovillo enorme de
//     cerca, con su cordón de terciopelo, la placa, los cabos sueltos que se mueven y los flashes de las fotos).
//   'moteros': el bar de moteros de noche en la carretera: cielo de estrellas con luna, mesetas en silueta, el bar de
//     tablas con porche, ventanas cálidas con siluetas que se mueven, neones de pictograma (calavera con alas, jarra,
//     rueda, flecha) que zumban y parpadean, el poste con su letrero, motos aparcadas con cromados, farola con polillas,
//     charcos que reflejan el neón y la carretera con un camión que pasa a lo lejos. o.camara 'general' o 'cerca' (la
//     puerta del bar de cerca: la calavera de neón grande, dos motos en primer término, la gramola por la ventana).
// Devuelve { suelo, pies: [xMin, xMax], horizonte, coche?, puerta?, … } (las coordenadas: ver la geometría de cada encuadre).
export function carretera(R, t, o = {}) {
  const enc = o.encuadre ?? 'carretera', cam = o.camara ?? 'general';
  if (enc === 'feria') return cam === 'carpa' || cam === 'cerca' ? e_feriaCarpa(R, t, o) : e_feriaGeneral(R, t, o);
  if (enc === 'atraccion') return cam === 'cerca' ? e_atraccionCerca(R, t, o) : e_atraccionGeneral(R, t, o);
  if (enc === 'moteros') return cam === 'cerca' || cam === 'puerta' ? e_moterosCerca(R, t, o) : e_moterosGeneral(R, t, o);
  return cam === 'coche' || cam === 'cerca' ? e_carreteraCoche(R, t, o) : e_carreteraGeneral(R, t, o);
}
// ── F · La Tierra de los Muertos ─────────────────────────────────────────────────────────────────────────────────────
// Una ciudad de esqueletos con el Día de Muertos de México, el art déco y el cine negro (homenaje, sin copiar). o.encuadre:
//   'ciudad' (por omisión): o.camara 'general': la calle de noche. Al fondo, el cielo tramado con nubes de tres tonos a
//     tres velocidades, la luna, dos focos que barren el cielo, murciélagos y la ciudad lejana; el viaducto por el que pasa
//     el tren dorado; el rascacielos art déco (retranqueos, pilastras, abanico de oro, aguja con luz roja, ventanas que se
//     encienden) con su portal dorado; la casa rosa de la panadería (pan de muerto, calaveritas), la cantina con su tira de
//     bombillas y el hotel con su letrero de neón en pictogramas; esqueletos pequeños que pasean por la acera de enfrente
//     y un coche negro que pasa; delante, el altar de la esquina (velas, arco de cempasúchil, retrato, calaveritas,
//     copal), el carro de flores, las macetas del bordillo, dos farolas y el papel picado al viento; pétalos que caen.
//     o.petalos (0–1): el rastro de pétalos de cempasúchil por la acera hasta el portal (se dibuja hasta esa fracción).
//     o.camara 'altar': el altar de muertos de cerca (ver f_altar).
//   'agencia': la oficina art déco de la agencia de viajes (ver f_agencia); o.camara 'general' o 'ventanilla'.
//   'taller': el taller de coches con el coche antiguo y el capó abierto (ver f_taller); o.camara 'general' o 'capo'.
//   'calendario': el muro con el calendario de cuatro hojas de Día de Muertos (ver f_calendario); o.camara 'general' o
//     'cerca'; o.hoja (0–3, con decimales mientras pasa la hoja).
// o.luz 'noche' (por omisión, con velas) o 'dia'. Lo que va por delante de los personajes (mostrador, cristal de la
// ventanilla, aleta del coche) lo pinta muertosDelante(R, t, o) con las mismas opciones, después de los personajes.
// Devuelve { suelo, pies: [x mín, x máx], … } con las piezas de cada encuadre (puerta, ventanilla, capo, hojas…).
export function muertos(R, t, o = {}) {
  const P = o.luz === 'dia' ? f_DIA : f_NOCHE, enc = o.encuadre ?? 'ciudad', cam = o.camara ?? 'general';
  if (enc === 'ciudad' && cam === 'altar') return f_altar(R, t, o, P);
  if (enc === 'agencia') return f_agencia(R, t, o, P, cam);
  if (enc === 'taller') return f_taller(R, t, o, P, cam);
  if (enc === 'calendario') return f_calendario(R, t, o, P, cam);
  f_ciudad(R, t, o, P);
  return { suelo: 160, pies: [70, 250], lejos: 135, puerta: [116, 108, 130, 131], altar: [6, 106, 58, 160], carro: [262, 101, 319, 162], farolas: [66, 256], tren: 92 };
}
// ── G · El espacio ───────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'combate' (por omisión): o.camara 'general': el espacio profundo con nebulosa tramada (morado y turquesa), una
//     galaxia, el planeta anillado abajo a la izquierda, estrellas en tres capas que corren a distinta velocidad; arriba,
//     el crucero grande (casco largo de placas, puente, hileras de ventanas, motores azules, luces que parpadean,
//     torretas que disparan) que deriva despacio; drones enemigos pequeños que zigzaguean lejos y estallan; y en el
//     centro el caza de alas en X propio, de perfil hacia la derecha, sin marcas: morro largo, cabina con sitio para el
//     piloto (hueco del cristal x 150–178, y 92–106; el piloto con los pies en y 118, recortado al hueco), cuatro alas
//     abiertas en X con cañones en las puntas que disparan rayos rojos, cuatro motores con la tobera que brilla; se mece
//     arriba y abajo (la posición viva va en .cabina). espacioDelante pinta el marco y el brillo del cristal.
//     o.camara 'cabina': la cabina de cerca, de lado: el fuselaje con placas, remaches y desgaste, el ala de arriba y su
//     motor con la llama, el cristal con sus montantes, el reposacabezas, la consola con luces y el radar que barre;
//     detrás, las estrellas estiradas por la velocidad, el crucero y los drones con sus rayos. El piloto, pies en y 124
//     recortado a .hueco; espacioDelante pinta los montantes, el borde y los reflejos.
//   'asteroide': o.camara 'general': el asteroide con cráteres, polvo y piedras sueltas que flotan; al fondo la Tierra
//     (nubes que se mueven, el terminador) y la Luna, el Sol pequeño con su destello, rocas que pasan; la nave de
//     exploración posada con sus patas, la rampa y luces; en la loma de la derecha, la puerta extraña tallada en la roca
//     (arco apuntado, anillos de glifos sin letras que laten) que se abre con o.abre (0–1): las dos hojas se apartan y sale
//     la luz con motas. Suelo 150 (el astronauta junto a la puerta, x 140–176).
//     o.camara 'puerta': la puerta de cerca, enorme (x 104–216, y 26–158), con sus anillos de glifos que giran, las hojas,
//     la roca con estratos a los lados, el suelo con huellas y piedras; con o.abre la luz cae sobre el suelo. Suelo 172.
// Devuelve { suelo, pies, cabina?, hueco?, puerta?, … }. espacioDelante(R, t, o) va después de los personajes.
export function espacio(R, t, o = {}) {
  const enc = o.encuadre ?? 'combate', cam = o.camara ?? 'general';
  if (enc === 'asteroide') return f_asteroide(R, t, o, cam);
  if (cam === 'cabina') return f_cabina(R, t, o);
  return f_combate(R, t, o);
}
// ── H · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// Del cuarto de un chico de los noventa a un estudio de hoy, con las cajas de juegos de entonces (inventadas, sin logos
// ni letras: el barco pirata con la luna, el retrete con reloj, el esqueleto con sombrero, el tentáculo, la mansión, el
// perro detective). Cada encuadre con dos cámaras (o.camara), con el mismo detalle. o.encuadre:
//   'cuarto90': el cuarto de un chico de los noventa al atardecer: papel pintado de rayas con estrellas, la ventana con
//     el barrio (tejados, un árbol, nubes, un chico en bici), pósters sin letras (el transbordador, un dinosaurio), la
//     estantería de cajas de juegos, la pecera con su pez, la cama con su manta de cuadros, la mesa con el ordenador de
//     tubo (la mansión en píxeles en la pantalla, con su línea de verbos y el cursor), altavoces, la torre con su CD,
//     la lámpara de lava que burbujea, el monopatín y cómics en el suelo; o.camara 'general', 'pantalla' (el monitor de
//     tubo de cerca: la mansión, la línea de verbos y el cursor; o.pantalla: función que pinta dentro, o.activo,
//     o.cursor) o 'estanteria' (la estantería de cerca: cinco cajas grandes; o.abre 0–1 las va abriendo una a una:
//     la tapa gira sobre la bisagra de atrás y queda de pie contra el fondo, y asoman los disquetes y el mapa; al fondo,
//     el tablero de tablas con vetas, la sombra de las cajas y cosas pequeñas en los huecos; o.cajas abre cajas sueltas, sin orden:
//     [2] (la tercera, del todo), [[2, 0.5]] o { 2: 0.5 } (a medias); se suma a o.abre).
//   'cuartoHoy': el cuarto de hoy de noche: paneles hexagonales, la tira de luz que cambia de color, la ventana con el
//     barrio iluminado, el monitor ancho con la mansión, el portátil, la tableta y el teléfono, la misma estantería de
//     cajas viejas, una planta y el sillón; o.camara 'general', 'pantalla' (el monitor ancho de cerca: o.hd 0–1 pasa de
//     píxeles a dibujo nuevo con una barrida de luz; el teclado de colores abajo para T.mano) o 'aparatos' (el teléfono,
//     la tableta y el portátil con la misma mansión en píxeles, sobre la mesa).
//   'estudioHoy': un estudio de hoy con pared de ladrillo, ventanales, lámparas colgantes que se mecen, el letrero de
//     neón del cursor en cruz, notas de colores, figuras y plantas, y la mesa larga (por delante, con R.delante) con
//     portátiles y monitores con aventuras nuevas y su línea de verbos; o.camara 'general' o 'mesa' (tres portátiles de
//     cerca, cada uno con su aventura distinta y su línea de verbos).
//   'foro': un cuarto oscuro con una pared de nueve pantallas con avatares de aficionados (pirata, tentáculo, calavera,
//     perro…) y bocadillos de pictogramas que aparecen; o.camara 'general' o 'cerca' (una pantalla del foro: columnas de
//     mensajes con avatar, pictogramas y corazones que suben, sin letras; el aviso de la barra va en x 250, fuera de Atom).
// Devuelve { suelo, pies, pantalla?, mesa?… } (la geometría).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'cuarto90', cam = o.camara ?? 'general';
  if (enc === 'cuarto90') return cam === 'pantalla' ? b_c90Pantalla(R, t, o) : cam === 'estanteria' ? b_c90Estanteria(R, t, o) : b_cuarto90(R, t, o);
  if (enc === 'cuartoHoy') return cam === 'pantalla' ? b_choyPantalla(R, t, o) : cam === 'aparatos' ? b_choyAparatos(R, t, o) : b_cuartoHoy(R, t, o);
  if (enc === 'estudioHoy') return cam === 'mesa' ? b_ehoyMesa(R, t, o) : b_estudioHoy(R, t, o);
  if (enc === 'foro') return b_foro(R, t, o, cam !== 'general');
  return b_cuarto90(R, t, o);
}
// ── Las piezas que no son humanas ────────────────────────────────────────────────────────────────────────────────────
// Los dos tentáculos (homenaje propio): un tentáculo erguido (27 px de alto a o.s 1, como un chibi) con la base de
// ventosa, ventositas por la tripa del lado al que mira, dos ojos grandes con brillo y boca expresiva; sombreado de
// cilindro con filo oscuro y brillo, y su sombra en el suelo. Quieto se mece como un fideo y parpadea; con o.anda va a
// saltitos (se estira en el aire y se aplasta al caer). o.color 'morado' (por omisión) o 'verde'; o.expresion 'normal',
// 'feliz', 'malvado', 'preocupado', 'sorpresa', 'harto' (ojos en blanco) o 'antojo' (ojos brillantes y babea);
// o.brazos (0–1: le salen dos bracitos con manitas de tres dedos) y o.pose 'normal', 'arriba' (de conquistador) o
// 'saluda'; o.brillo (0–1: el halo tras beber, con chispas); o.accesorio 'peluca' (de padre fundador), 'calavera' (de
// azúcar, de sombrero), 'casco' (de piloto), 'pirata' (tricornio robado) o 'disfraz' (de pie grande); o.dir, o.s
// (escala), o.habla, o.mira [dx, dy] (las pupilas, −1–1), o.inclina, o.salto (px), o.aplasta (0–1: hasta 0,5 un poco;
// en 1 queda al 35 % de alto, ancho como un acordeón y con los ojos aún a la vista; para el yunque), o.quieto.
// (x, y): el centro de la base en el suelo. Devuelve { x, y, cima, ojos, boca, manos, mano (la de delante), salto }.
export function tentaculo(R, x, y, t, o = {}) {
  const s = o.s ?? 1, dir = o.dir ?? 1, verde = o.color === 'verde', ex = o.expresion ?? 'normal', fase = x * 0.13 + (verde ? 1.7 : 0);
  const K = verde ? { r: [hex('#123e1a'), hex('#22702e'), hex('#38a846'), hex('#7ad86c')], l: hex('#c8f8b0'), o: hex('#0a2410'), b: hex('#5a1018') }
    : { r: [hex('#2e0e4a'), hex('#562088'), hex('#8636c4'), hex('#b67ae6')], l: hex('#e6c8ff'), o: hex('#16062a'), b: hex('#5a0a28') };
  const V = [hex('#a8784a'), hex('#d0a878'), hex('#f0d8a8'), hex('#fff4d8')];   // la ventosa
  // el salto: arriba estirado, al caer se aplasta; quieto, se mece como un fideo
  let lift = o.salto ?? 0, kv = 1, kw = 1, incl = 0;
  if (o.anda) { const p = ((t + fase * 0.1) / 0.56) % 1;
    if (p < 0.72) { const q = p / 0.72; lift += Math.sin(q * Math.PI) * 6; kv = 1 + 0.12 * Math.sin(q * Math.PI); kw = 1 - 0.07 * Math.sin(q * Math.PI); incl = dir * 0.9 * Math.sin(q * Math.PI); }
    else { const q = (p - 0.72) / 0.28, a = Math.sin(q * Math.PI); kv = 1 - 0.16 * a; kw = 1 + 0.14 * a; } }
  else if (lift > 0) { kv = 1.08; kw = 0.95; }
  // o.aplasta: hasta 0,5 como siempre (un 12 %); de ahí a 1 sigue hasta el 65 % (el yunque), ensanchándose como un acordeón
  const apl = Math.max(0, o.aplasta ?? 0), apX = Math.max(0, Math.min(1, (apl - 0.5) / 0.5));
  if (apl) { kv *= 1 - (apl <= 0.5 ? 0.25 * apl : 0.125 + 0.525 * apX); kw *= 1 + 0.2 * Math.min(apl, 1) + 0.45 * apX; }
  const ea = Math.max(0, Math.min(1, (0.75 - kv) / 0.4));   // cuánto pasa del aplastado de siempre: la cara se recoloca
  const lean = (o.inclina ?? 0) + incl, sway = o.anda || o.quieto ? 0 : Math.sin(t * 2.1 + fase) * 1.1;
  const H = 27, yb = y - lift * s;
  const prof = (v) => { if (v < 1.6) return 8.6; if (v < 4.5) { const f = (v - 1.6) / 2.9, e = f * f * (3 - 2 * f); return 8.6 + (6 - 8.6) * e; } if (v < 21) return 6 - (v - 4.5) * 0.045; const c = (v - 21) / 6; return c >= 1 ? 0 : 5.26 * Math.sqrt(1 - c * c); };
  const off = (v) => (lean * v * 0.16 + sway * (v / H) ** 2) * s;
  const P = (u, v) => [x + (off(v) + u * kw) * s, yb - v * kv * s];   // de unidades (u lateral, v altura) a pantalla
  // la sombra en el suelo (más pequeña cuanto más alto salta)
  { const f = Math.max(0.35, 1 - lift / 12); a_elipse(R, x + 1 * s, y + 0.5, 9.5 * s * f * kw, Math.max(1.2, 2.1 * s * f), (px, py) => { const c = R.pget(px, py); return a_mezcla(c, hex('#0a0618'), 0.38); }); }
  // el brillo tras beber: un halo tramado alrededor y chispas
  const brillo = o.brillo ?? 0;
  if (brillo > 0) { const gc = verde ? hex('#d8ffb0') : hex('#f0c8ff');
    for (let v = -1; v < H + 3; v += 1 / (kv * s)) { const w = prof(Math.max(0, Math.min(26.9, v))) + 2.6, yy = Math.round(yb - v * kv * s); for (const sd of [-1, 1]) for (let d = 0; d < 3 * s; d++) { const xx = Math.round(x + off(v) + sd * (w * kw * s + d)); if (a_bay(xx, yy) < brillo * (1 - d / (3 * s)) * 0.9) R.pset(xx, yy, gc); } }
    for (let k = 0; k < 5; k++) { const a = t * 2 + k * 1.26, rr = (12 + Math.sin(t * 3 + k) * 3) * s, px = Math.round(x + Math.cos(a) * rr), py = Math.round(yb - 14 * s + Math.sin(a) * rr * 1.1); if (Math.sin(t * 6 + k * 2) > 1 - brillo) { R.pset(px, py, gc); R.pset(px + 1, py, gc); R.pset(px - 1, py, gc); R.pset(px, py + 1, gc); R.pset(px, py - 1, gc); } } }
  // los bracitos que le salen tras beber (detrás, los dos; el de delante se pinta después del cuerpo)
  const brz = Math.max(0, Math.min(1, o.brazos ?? 0)), manos = [];
  const brazo = (sd, delante) => { if (brz <= 0) return; const v0 = 12, [bx, by] = P(sd * 5.4, v0), pose = o.pose ?? 'normal';
    let ang = sd > 0 ? -0.5 : Math.PI + 0.5; if (pose === 'arriba') ang = sd > 0 ? -1.15 : Math.PI + 1.15; else if (pose === 'saluda' && sd === dir) ang = (sd > 0 ? -1.25 : Math.PI + 1.25) + Math.sin(t * 9) * 0.35; else ang += Math.sin(t * 3 + sd) * 0.15;
    const L = 7.5 * brz * s, ex2 = bx + Math.cos(ang) * L, ey = by + Math.sin(ang) * L, mx = (bx + ex2) / 2 + sd * 0.8 * s, my = (by + ey) / 2 + 1.2 * s, gr = Math.max(1, 1.5 * s);
    for (let k = 0; k <= 12; k++) { const f = k / 12, qx = (1 - f) ** 2 * bx + 2 * (1 - f) * f * mx + f * f * ex2, qy = (1 - f) ** 2 * by + 2 * (1 - f) * f * my + f * f * ey; R.disco(qx, qy, gr + 0.6, K.o); }
    for (let k = 0; k <= 12; k++) { const f = k / 12, qx = (1 - f) ** 2 * bx + 2 * (1 - f) * f * mx + f * f * ex2, qy = (1 - f) ** 2 * by + 2 * (1 - f) * f * my + f * f * ey; R.disco(qx, qy, gr, delante ? K.r[2] : K.r[1]); if (s >= 1.5) R.pset(Math.round(qx - 0.5), Math.round(qy - gr * 0.6), K.r[3]); }
    // la manita: una bolita con tres deditos
    R.disco(ex2, ey, gr * 1.35 + 0.6, K.o); R.disco(ex2, ey, gr * 1.35, delante ? K.r[2] : K.r[1]); R.pset(Math.round(ex2 - gr * 0.4), Math.round(ey - gr * 0.5), K.r[3]);
    if (s >= 1.5) for (let d = -1; d <= 1; d++) { const a = ang + d * 0.6, fx = ex2 + Math.cos(a) * gr * 2, fy = ey + Math.sin(a) * gr * 2; R.disco(fx, fy, Math.max(0.7, gr * 0.55) + 0.5, K.o); R.disco(fx, fy, Math.max(0.7, gr * 0.55), delante ? K.r[2] : K.r[1]); }
    manos.push([Math.round(ex2), Math.round(ey)]); };
  brazo(-dir, false);
  // el cuerpo: tubo con la base de ventosa, sombreado de cilindro (la luz de arriba a la izquierda), filo oscuro y brillo
  const top = Math.floor(yb - H * kv * s) - 1;
  for (let py = top; py <= Math.ceil(yb); py++) {
    const v = (yb - py) / (kv * s); if (v < 0 || v > H) continue; const w = prof(v) * kw * s; if (w <= 0.3) continue;
    const xc = x + off(v), xa = Math.round(xc - w), xb = Math.round(xc + w), vArr = (yb - py + 1) / (kv * s);
    for (let px = xa; px <= xb; px++) {
      const n = (px + 0.5 - xc) / w, borde = px === xa || px === xb || vArr > H || prof(Math.min(H, vArr)) * kw * s < Math.abs(px + 0.5 - xc) - 0.2;
      if (borde) { R.pset(px, py, K.o); continue; }
      if (v < 1.6) { R.pset(px, py, a_rampa(V, 2 - n * 0.6 - (v < 0.8 ? 0.9 : 0), px, py)); continue; }   // el labio de la ventosa
      let i = 2.05 - n * 0.75 - n * n * 0.95 + (v > 21 ? 0.25 : 0) - (v < 4.5 ? 0.35 : 0);
      if (n > -0.62 && n < -0.36 && v > 7 && v < 22) i += 0.85;
      if (v > 22.5 && n > -0.55 && n < -0.15 && v < 25) { R.pset(px, py, K.l); continue; }
      R.pset(px, py, a_rampa(K.r, i, px, py));
    }
  }
  // las ventosas pequeñas por la tripa, del lado al que mira
  for (const [v, r] of (ea > 0.3 ? [[6.2, 1.1]] : [[5.6, 1.15], [8.6, 0.95], [11.2, 0.8]])) { const [cx, cy] = P(dir * 3.3, v); a_elipse(R, cx, cy, r * s + 0.3, r * s * 0.8 + 0.3, K.r[0]); a_elipse(R, cx, cy, r * s * 0.85, r * s * 0.65, (px, py) => a_rampa(V, 2.3 - (px - cx) / s * 0.6, px, py)); if (s >= 2) R.pset(Math.round(cx), Math.round(cy), V[0]); }
  brazo(dir, true);
  // la cara: ojos grandes, párpados y cejas según la expresión, la boca
  const parp = ex === 'normal' && ((t + fase) % 3.7) < 0.13, mira = o.mira ?? [dir * 0.6, 0];
  const ojos = [], [fx, fy] = P(dir * 1.3, 18.6 + 2.2 * ea), er = 2.15 * s * (1 + 0.12 * ea), eh = (ex === 'sorpresa' ? 3.3 : 2.75) * s * (1 - 0.42 * ea);
  for (const sd of [-1, 1]) { const cx = fx + sd * 2.55 * s * kw, cy = fy; ojos.push([Math.round(cx), Math.round(cy)]);
    if (ex === 'feliz' || parp) { for (let i = -er; i <= er; i += 0.5) { const yy = cy + (ex === 'feliz' ? -Math.sqrt(Math.max(0, 1 - (i / er) ** 2)) * eh * 0.5 + eh * 0.15 : 0); R.pset(Math.round(cx + i), Math.round(yy), K.o); if (s >= 2) R.pset(Math.round(cx + i), Math.round(yy) + 1, K.o); } continue; }
    a_elipse(R, cx, cy, er + 0.7, eh + 0.7, K.o); a_elipse(R, cx, cy, er, eh, (px, py) => py > cy + eh * 0.45 ? hex('#d8d4e8') : hex('#ffffff'));
    let pdx = mira[0] * er * 0.45, pdy = mira[1] * eh * 0.4, pr = ex === 'sorpresa' || ex === 'preocupado' ? 0.75 : ex === 'antojo' ? 1.3 : 1.05;
    if (ex === 'harto') { pdx = 0; pdy = -eh * 0.62; }
    a_elipse(R, cx + pdx, cy + pdy + 0.3 * s, er * 0.55 * pr, eh * 0.55 * pr, (px, py) => { const dx = px + 0.5 - cx, dy = py + 0.5 - cy; return (dx / er) ** 2 + (dy / eh) ** 2 <= 1 ? hex('#140c1e') : R.pget(px, py); });
    const gx = Math.round(cx + pdx - er * 0.25), gy = Math.round(cy + pdy - eh * 0.2); R.pset(gx, gy, hex('#ffffff')); if (s >= 2) { R.pset(gx + 1, gy, hex('#ffffff')); R.pset(gx, gy + 1, hex('#ffffff')); }
    if (ex === 'antojo') { R.pset(gx + Math.round(er * 0.5), gy + Math.round(eh * 0.5), hex('#ffffff')); }
    // párpados
    if (ex === 'malvado' || ex === 'harto') { const caida = ex === 'malvado' ? 0.55 : 0.45; for (let i = -er - 0.5; i <= er + 0.5; i += 0.5) { const inner = sd * i < 0 ? 1 : 0, lim = cy - eh + eh * 2 * (caida + (ex === 'malvado' ? (inner ? 0.25 : -0.12) * (Math.abs(i) / er) : 0)); for (let yy = Math.floor(cy - eh - 1); yy <= lim; yy++) { const dx = (Math.round(cx + i) + 0.5 - cx) / er, dy = (yy + 0.5 - cy) / eh; if (dx * dx + dy * dy <= 1.15) R.pset(Math.round(cx + i), yy, a_rampa(K.r, 2.2, Math.round(cx + i), yy)); } R.pset(Math.round(cx + i), Math.round(lim) + 1, K.o); } }
    // cejas
    if (ex === 'malvado' || ex === 'preocupado' || ex === 'sorpresa') { const up = ex === 'sorpresa' ? 1.6 : 0.9, sl = ex === 'malvado' ? 1 : ex === 'preocupado' ? -1 : 0;
      for (let i = -er; i <= er; i += 0.5) { const inner = (sd * i < 0) ? Math.abs(i) / er : -Math.abs(i) / er * 0.3, yy = cy - eh - up * s + sl * inner * 1.4 * s; R.pset(Math.round(cx + i), Math.round(yy), K.o); if (s >= 1.5) R.pset(Math.round(cx + i), Math.round(yy) - 1, K.o); } }
  }
  const [mx, my] = P(dir * 1.6, 13.3 - 2.6 * ea), habla = o.habla && Math.floor(t * 8 + fase) % 2 === 0, mw = 2.6 * s;
  const boca = (fn) => { for (let i = -mw; i <= mw; i += 0.5) { const yy = my + fn(i / mw); R.pset(Math.round(mx + i), Math.round(yy), K.o); if (s >= 2) R.pset(Math.round(mx + i), Math.round(yy) + 1, K.o); } };
  if (habla || ex === 'feliz' || ex === 'sorpresa') { const ab = ex === 'sorpresa' ? 2.2 * s : habla ? 1.8 * s : 2.3 * s, ancho = ex === 'sorpresa' ? 0.55 : 1;
    a_elipse(R, mx, my + ab * 0.4, mw * ancho + 0.6, ab + 0.6, K.o); a_elipse(R, mx, my + ab * 0.4, mw * ancho, ab, (px, py) => py > my + ab * 0.6 ? hex('#e8607a') : K.b);
    if (ex === 'feliz' && !habla) R.rect(Math.round(mx - mw * 0.7), Math.round(my - ab * 0.5), Math.round(mx + mw * 0.7), Math.round(my - ab * 0.5), K.r[2]); }
  else if (ex === 'malvado') { boca((f) => -f * dir * 0.9 * s - (1 - f * f) * 0.6 * s); for (let i = -mw * 0.5; i <= mw * 0.4; i += 1) R.pset(Math.round(mx + i), Math.round(my - (i / mw) * dir * 0.9 * s), hex('#ffffff')); }
  else if (ex === 'preocupado') boca((f) => Math.sin(f * Math.PI * 2) * 0.6 * s);
  else if (ex === 'harto') boca(() => 0);
  else if (ex === 'antojo') { boca((f) => (1 - f * f) * 1.2 * s); const u = (t * 0.8) % 1, dx = Math.round(mx + mw * 0.6 * dir), dy = Math.round(my + 1 + u * 4 * s); R.pset(dx, dy, hex('#c8f0ff')); R.pset(dx, dy - 1, hex('#e8faff')); }
  else boca((f) => (1 - f * f) * 0.9 * s);
  // los accesorios
  const acc = o.accesorio, [tx, ty] = P(0, H);
  if (acc === 'peluca') {   // peluca blanca de padre fundador: casquete, rizos a los lados y la coleta con lazo negro
    const W = [hex('#9a9aa8'), hex('#c8c8d4'), hex('#ecebf2'), hex('#ffffff')];
    a_elipse(R, tx, ty + 1 * s, 6.6 * s, 3.4 * s, (px, py, d) => a_rampa(W, 2.6 - d - (px - tx) / s * 0.1 + (((px + py) % 3) === 0 ? -0.5 : 0), px, py));
    for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { const [cx, cy] = P(sd * 6.6, 21.5 - k * 2.6); R.disco(cx, cy, 1.9 * s + 0.4, W[0]); R.disco(cx - 0.3, cy - 0.3, 1.6 * s, W[2]); R.pset(Math.round(cx - 0.5 * s), Math.round(cy - 0.6 * s), W[3]); }
    const [qx, qy] = P(-dir * 6, 19); R.linea(qx, qy, qx - dir * 3 * s, qy + 4 * s, W[1]); R.disco(qx - dir * 3 * s, qy + 5 * s, 1.4 * s, W[2]); R.disco(qx, qy, 1.3 * s, hex('#1a1a22')); R.pset(Math.round(qx - 1.5 * s), Math.round(qy - 1), hex('#1a1a22')); R.pset(Math.round(qx + 1.5 * s), Math.round(qy - 1), hex('#1a1a22'));
  } else if (acc === 'calavera') {   // una calavera de azúcar de sombrero: blanca, con flores de colores
    const cx = tx, cy = ty - 3.2 * s; a_elipse(R, cx, cy, 5.2 * s + 0.6, 4.4 * s + 0.6, hex('#2a1a2a')); a_elipse(R, cx, cy, 5.2 * s, 4.4 * s, (px, py, d) => a_rampa([hex('#b8b0b8'), hex('#dcd6dc'), hex('#f6f2f0'), hex('#ffffff')], 2.8 - d - (px - cx) / s * 0.12, px, py));
    R.rect(Math.round(cx - 3 * s), Math.round(cy + 3.4 * s), Math.round(cx + 3 * s), Math.round(cy + 4.6 * s), hex('#f2eee8'));
    for (const sd of [-1, 1]) { R.disco(cx + sd * 2.1 * s, cy + 0.5 * s, 1.5 * s + 0.4, hex('#3a8ae8')); R.disco(cx + sd * 2.1 * s, cy + 0.5 * s, 1.1 * s, hex('#1a1020')); }
    R.pset(Math.round(cx), Math.round(cy + 2.2 * s), hex('#1a1020')); for (let i = -2; i <= 2; i++) R.pset(Math.round(cx + i * s), Math.round(cy + 4 * s), hex('#3a2a3a'));
    R.disco(cx, cy - 2.6 * s, 1.2 * s, hex('#f0a020')); R.pset(Math.round(cx), Math.round(cy - 2.6 * s), hex('#e83a5a'));
    for (const sd of [-1, 1]) R.pset(Math.round(cx + sd * 3.6 * s), Math.round(cy - 1.4 * s), hex('#e83a8a'));
  } else if (acc === 'casco') {   // casco de piloto: blanco con franja naranja, visera levantada y la correa
    const cx = tx, cy = ty + 1.2 * s; a_elipse(R, cx, cy, 6.6 * s + 0.6, 5 * s + 0.6, hex('#1a1a24'));
    a_elipse(R, cx, cy, 6.6 * s, 5 * s, (px, py, d) => { if (py > cy + 1.2 * s) return R.pget(px, py); const st = Math.abs(px - cx - 0) < 1.2 * s; return st ? a_rampa([hex('#a83a10'), hex('#d85a20'), hex('#f08a3a'), hex('#ffc070')], 2.6 - d, px, py) : a_rampa([hex('#8a8e9a'), hex('#c4c8d2'), hex('#eceef2'), hex('#ffffff')], 2.7 - d - (px - cx) / s * 0.12, px, py); });
    R.rect(Math.round(cx - 6.6 * s), Math.round(cy + 1.2 * s), Math.round(cx + 6.6 * s), Math.round(cy + 1.2 * s + Math.max(1, 0.8 * s)), hex('#2a2a34'));
    a_elipse(R, cx, cy - 2.4 * s, 4.6 * s, 1.6 * s, (px, py) => (((px + py) % 4) === 0 ? hex('#8ab8e8') : hex('#2a3a6a')));
    for (const sd of [-1, 1]) { const [ax, ay] = P(sd * 5.8, 17); R.linea(ax, cy + 1.2 * s, ax - sd * 0.5 * s, ay + 3 * s, hex('#3a3a44')); }
  } else if (acc === 'pirata') {   // el sombrero de tres picos robado, con una calavera pintada en pictograma
    const cx = tx, cy = ty + 0.6 * s; R.poligono([[cx - 8.5 * s, cy + 1.2 * s], [cx + 8.5 * s, cy + 1.2 * s], [cx + 5 * s, cy - 2.4 * s], [cx, cy - 5.6 * s], [cx - 5 * s, cy - 2.4 * s]], hex('#1a1418'));
    R.poligono([[cx - 7.6 * s, cy + 0.4 * s], [cx + 7.6 * s, cy + 0.4 * s], [cx + 4.4 * s, cy - 2 * s], [cx, cy - 4.8 * s], [cx - 4.4 * s, cy - 2 * s]], (px, py) => a_rampa([hex('#1a1418'), hex('#2e2630'), hex('#4a3e4a'), hex('#6a5a68')], 2 - (px - cx) / s * 0.12, px, py));
    R.rect(Math.round(cx - 7.6 * s), Math.round(cy + 0.4 * s), Math.round(cx + 7.6 * s), Math.round(cy + 0.4 * s), hex('#c8a040'));
    R.disco(cx, cy - 1.8 * s, 1.2 * s, hex('#f2eee2')); R.pset(Math.round(cx - 0.5 * s), Math.round(cy - 1.9 * s), hex('#1a1418')); R.pset(Math.round(cx + 0.5 * s), Math.round(cy - 1.9 * s), hex('#1a1418'));
  } else if (acc === 'disfraz') {   // disfraz de pie grande: pelo marrón desgreñado por todo el cuerpo, los ojos asoman, dos pies enormes
    const F = [hex('#2a160c'), hex('#4a2a16'), hex('#6e4424'), hex('#9a6a3a')];
    for (let v = 1; v < 24; v += 0.5) { const w = prof(v) * kw * s + 1.4 * s, [cx, cy] = P(0, v);
      for (let px = Math.round(cx - w); px <= Math.round(cx + w); px++) { const yy = Math.round(cy), n = (px - cx) / w; if (v > 15.5 && v < 21.5 && Math.abs(n) < 0.86) continue; const m = h(px, Math.round(v * 2), 290); R.pset(px, yy + (Math.abs(n) > 0.85 && m < 0.5 ? 1 : 0), a_rampa(F, 2.1 - n * 0.6 - n * n * 0.6 + (m - 0.5) * 1.3 + (((px * 3 + yy) % 5) === 0 ? -0.8 : 0), px, yy)); } }
    for (let px = Math.round(tx - 6 * s); px <= Math.round(tx + 6 * s); px += Math.max(1, Math.round(s))) R.linea(px, Math.round(ty + 4 * s), px + Math.round(Math.sin(px) * s), Math.round(ty + 1 * s), F[1]);
    for (const sd of [-1, 1]) { const [px, py] = P(sd * 5, 0); a_elipse(R, px + dir * 2 * s, py - 1 * s, 5 * s + 0.5, 2.2 * s + 0.5, F[0]); a_elipse(R, px + dir * 2 * s, py - 1 * s, 5 * s, 2.2 * s, (qx, qy, d) => a_rampa(F, 2.6 - d, qx, qy)); }
  }
  const [hx, hy] = P(0, H);
  return { x, y, cima: [Math.round(hx), Math.round(hy)], ojos, boca: [Math.round(mx), Math.round(my)], manos: manos.length ? manos : null, mano: manos.length ? manos[manos.length - 1] : null, salto: lift * s };
}
// El perro detective y el conejo blanco hiperactivo (homenaje propio, a escala chibi, ~26 px con el sombrero o las
// orejas). (x, y): el centro y la línea de los pies. o.quien 'perro' (por omisión: traje gris azulado, corbata roja,
// sombrero de fieltro con cinta, orejas caídas, hocico grande con su sonrisa, la cola que menea) o 'conejo' (blanco, ojos
// enormes, sonrisa de oreja a oreja con los dientes, orejas largas que se mueven solas; no para quieto: tiembla y da
// saltitos aunque esté parado). o.dir (1 mira a la derecha, −1 a la izquierda), o.anda (camina: piernas alternas y
// rebote), o.habla (abre y cierra la boca), o.salta (el conejo da saltos grandes; un número = la altura en px),
// o.sorpresa (ojos como platos; al perro se le levanta el sombrero), o.brazos (los dos brazos arriba, de alegría),
// o.quieto (sin la vida de reposo: el conejo deja de temblar). Devuelve { x, y, cabeza: [x, y], mano: [x, y] }.
export function detective(R, x, y, t, o = {}) {
  const conejo = o.quien === 'conejo', dir = o.dir ?? 1, D = conejo ? e_CONEJO : e_PERRO, w = D.ancho;
  let dx = 0, dy = 0;
  if (conejo && !o.quieto) { const k = Math.floor(t * 9 + x); dx = h(k, 1, 91) < 0.3 ? (h(k, 2, 91) < 0.5 ? -1 : 1) : 0; dy = -Math.round(Math.abs(Math.sin(t * 7.5 + x)) * 2.2); }
  if (o.salta) { const alto = typeof o.salta === 'number' ? o.salta : 12; dy = -Math.round(Math.abs(Math.sin(t * 4.2)) * alto); }
  if (o.anda) dy = Math.min(dy, -(Math.floor(t * 6 + x) % 2));
  const x0 = Math.round(x - w / 2) + dx, y0 = Math.round(y) - D.filas.length + 1 + dy, paso = o.anda ? Math.floor(t * 6 + x) % 2 : -1;
  const parp = (t * 0.83 + x * 0.13) % 3.1 < 0.12, abre = (o.habla && Math.floor(t * 7.5 + x) % 2 === 0) || o.sorpresa;
  // la sombra en el suelo (se encoge cuando salta)
  { const r = Math.max(2, 6 + Math.round(dy / 3)); for (let i = -r; i <= r; i++) { const c = R.pget(Math.round(x) + i, Math.round(y) + 1); if (c) R.pset(Math.round(x) + i, Math.round(y) + 1, e_mezcla(c, e_P.k, 0.35)); } }
  const filas = D.filas.map((f, j) => {
    let s = f;
    if (paso >= 0 && D.piernas[paso] && j >= D.filas.length - D.piernas[paso].length) s = D.piernas[paso][j - (D.filas.length - D.piernas[paso].length)];
    if (D.ojos.includes(j) && parp && !o.sorpresa) s = s.replace(/[eo]/g, D.parpado);
    if (abre && D.boca[j]) s = D.boca[j];
    if (o.brazos && D.sinBrazos[j]) s = D.sinBrazos[j];
    return s;
  });
  const pon = (i, j, c) => R.pset(dir > 0 ? x0 + i : x0 + w - 1 - i, y0 + j, c);
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch !== '.') pon(i, j, D.pal[ch]); } });
  if (o.sorpresa) for (const [i, j, ch] of D.sorpresa) pon(i, j, D.pal[ch]);   // los ojos como platos y las cejas arriba
  if (conejo) {
    // las orejas: largas, con el interior rosa, que se mueven solas (una se dobla de vez en cuando)
    for (const [bi, fase] of [[5, 0], [10, 1.7]]) { const tw = Math.sin(t * (o.quieto ? 1.2 : 5.3) + fase + x) * 0.22 + (fase && (t + x) % 2.4 < 0.5 ? 0.6 : 0) + (o.sorpresa ? -0.15 : 0), L = 9;
      const pts = []; for (let k = 0; k <= L; k++) { const a = -Math.PI / 2 + (bi < 8 ? -0.18 : 0.12) + tw * (k / L) ** 1.5; pts.push([bi + Math.cos(a) * k * (dir > 0 ? 1 : 1), D.orejaY - Math.abs(Math.sin(a)) * k + (k > 6 && tw > 0.5 ? (k - 6) : 0)]); }
      for (const [px, py] of pts) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) pon(Math.round(px) + a, Math.round(py) + b, e_P.k);
      pts.forEach(([px, py], k) => { pon(Math.round(px), Math.round(py), k > 0 && k < L - 1 ? D.pal.p : D.pal.W); pon(Math.round(px) - 1, Math.round(py), D.pal.W); if (k < L) pon(Math.round(px) + 1, Math.round(py), D.pal.w); }); }
  } else {
    // el sombrero de fieltro: salta cuando se sorprende
    const sy = o.sorpresa ? -3 - Math.round(Math.abs(Math.sin(t * 9)) * 2) : 0;
    D.sombrero.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch !== '.') pon(i, j - D.sombrero.length + D.sombreroY + sy, D.pal[ch]); } });
    // la cola que menea, asomando por detrás de la chaqueta
    const m = Math.round(Math.sin(t * 11) * 1.5); pon(1, 17 + m, D.pal.F); pon(0, 16 + m, D.pal.F); pon(1, 16 + m, D.pal.k); pon(-1, 15 + m * 2, D.pal.f);
  }
  if (o.brazos) for (const s of [-1, 1]) { const bx = s < 0 ? 3 : w - 4, by = D.hombro; for (let k = 0; k < 5; k++) { pon(bx + s * Math.round(k * 0.4), by - k, D.pal.k); pon(bx + s * Math.round(k * 0.4) - s, by - k, k > 3 ? D.pal.mano : D.pal.manga); } pon(bx + s * 2, by - 6, D.pal.k); pon(bx + s * 2 - s, by - 6, D.pal.k); }
  const cy = y0 + (conejo ? 7 : 0);
  return { x: Math.round(x), y: Math.round(y), cabeza: [Math.round(x), cy], mano: [Math.round(x + dir * (w / 2 + 1)), y0 + D.hombro + 4] };
}
// Los esqueletos de la Tierra de los Muertos y el demonio mecánico (homenaje propio a escala chibi; x es el centro, y los
// pies). o.quien:
//   'agente' (por omisión): el esqueleto alegre con traje cruzado azul marino, camisa blanca, corbata roja, flor de
//     cempasúchil en la solapa y sombrero de fieltro con cinta; calavera de calaca (cuencas grandes con un brillo, nariz,
//     dientes), huesos en las manos y los tobillos, zapatos de dos colores. o.ropa 'traje' (por omisión), 'chaqueta'
//     (otros esqueletos: chaqueta de color o.color y sin sombrero) o 'vestido' (vestido de o.color con flores en la
//     cabeza); o.sombrero (false: sin sombrero).
//   'demonio': el demonio mecánico, enorme (≈ 42 px de alto y 30 de ancho), naranja y bonachón: cuerpo de pera con luz y
//     sombra, cuernecillos, ojillos alegres, sonrisa enorme con dientes cuadrados, mono de trabajo azul con tirantes,
//     botones y bolsillo con un trapo, botazas; brazos largos con manos de tres dedos. o.llave: lleva una llave inglesa
//     en la mano de delante; o.mete: los brazos hacia delante, metidos en el motor; o.brazos: los dos arriba de alegría.
// Comunes: o.dir (1 mira a la derecha, −1 a la izquierda), o.anda (camina: piernas alternas y rebote), o.habla (la
// mandíbula sube y baja), o.salto (px), o.s (escala entera, 1 por omisión). Quieto, respira. Los esqueletos (no el
// demonio): o.pose 'senala' (el brazo de delante estirado, el índice de hueso que apunta y da golpecitos) o 'sombrero'
// (se ha quitado el sombrero y lo sostiene delante por el ala; la calavera queda al aire); o.sostiene (true o [x, y]):
// como el chibi, el brazo de delante va hacia ese punto (como mucho 8 px a o.s 1) con la manga, el antebrazo de hueso y
// una mano redonda donde la escena pinta lo que sostiene.
//   'mano': la mano de esqueleto de 14 px para los insertos (la silueta de la mano canónica, en huesos): (x, y) y o.dir
//     como T.mano; o.hombro [x0, y0] (y o.codo, o.manga, o.puno): con el brazo canónico T.brazo hasta la muñeca; sin él,
//     la manga recta (o.sinManga: solo la mano). o.manga: el color de la manga ('#rrggbb', azul del traje por omisión).
// Devuelve { x, y, cabeza: [x, y], mano: [x, y] } (la mano de delante, para pintar ahí lo que sostiene).
export function calaca(R, x, y, t, o = {}) {
  if (o.quien === 'demonio') return f_demonio(R, x, y, t, o);
  if (o.quien === 'mano') return a_manoHueso(R, x, y, o);
  const dir = o.dir ?? 1, s = Math.max(1, Math.round(o.s ?? 1)), ropa = o.ropa ?? 'traje', sombrero = o.sombrero ?? ropa === 'traje';
  const paso = o.anda ? Math.floor(t * 5 + x * 0.1) % 2 : -1, rebote = o.anda && paso === 1 ? 1 : 0, resp = !o.anda && Math.sin(t * 2.6 + x * 0.37) > 0.75 ? 1 : 0;
  const boca = o.habla ? (Math.floor(t * 9 + x) % 3 === 0 ? 0 : 1) : 0;
  const ropaC = ropa === 'traje' ? [hex('#2a3458'), hex('#1c2240'), hex('#3e4a78')] : [o.color ?? hex('#a83a5a'), f_mez(o.color ?? hex('#a83a5a'), f_K, 0.35), f_mez(o.color ?? hex('#a83a5a'), hex('#ffffff'), 0.25)];
  const COL = { k: f_K, W: hex('#f2ece0'), w: hex('#c8bea8'), g: hex('#7ae8ff'), S: ropaC[0], s: ropaC[1], L: ropaC[2], C: hex('#f6f2ea'), R: hex('#c83a3a'), H: hex('#3a3a4a'), h: hex('#5a5a6e'), B: hex('#c8a040'), Z: hex('#2a1e1a'), z: hex('#e8e0d0'), O: hex('#f0a020'), F: hex('#e8488a') };
  const CAB = [
    '...............', '...............', '...............', '...............',
    '....kkkkkkk....', '..kkWWWWWWWkk..', '.kWWWWWWWWWWWk.', '.kWWWWWWWWWWWwk', '.kWWkkkWWkkkWwk', 'kWWkkgkWWkgkkWk', 'kWWkkkkWWkkkkWk', '.kWWWWWkkWWWWwk', '.kwWWWWWWWWWWwk',
    boca ? '..kkkkkkkkkkk..' : '..kWkWkWkWkWk..', boca ? '..kWkWkWkWkWk..' : '...kwWWWWWwk...', boca ? '...kkkkkkkkk...' : '....kkkkkkk....',
  ];
  const SOM = ['....kkkkkkk....', '...kHHHHHHHk...', '...kHhHHHHHk...', '..kkBBBBBBBkk..', 'kkHHHHHHHHHHHkk', '.kkkkkkkkkkkkk.'];
  const FLORES = ['...............', '...............', '...............', '..kOk.kFk.kOk..', '.kOOOkFFFkOOOk.', '..kOk.kFk.kOk..'];
  const CUERPO = ropa === 'vestido' ? [
    '......kwk......', '....kkSSSkk....', '...kSSLSSSSk...', '..kSSLSSSSSSk..', '..kSLSSSSSSSk..', '.kWkSSSSSSSkWk.', '.kWkSSSSSSSkWk.', '..kkSSSSSSSkk..', '..kSSSsSsSSSk..', '.kSSSsSSSsSSSk.', '.kSsSSsSsSSsSk.', 'kkkkkkkkkkkkkkk', '....kWk.kWk....', '...kZZk.kZZk...',
  ] : [
    '......kwk......', '...kkSSkSSkk...', '..kSLsCRCsSSk..', '..kSLsCRCsSSk..', '.kSSLSsRsSSSSk.', '.kSkSSSRSOSkSk.', '.kSkSSSSSSSkSk.', '.kWkSSSSSSSkWk.', '..k.kSSSSSk.k..', '....kSSkSSk....', '....kSSkSSk....', '....kssksSk....', '....kWWkWWk....', '...kZzZkZzZk...',
  ];
  if (ropa === 'chaqueta') CUERPO.forEach((f, j) => { CUERPO[j] = f.replace(/R/g, 'C'); });
  // o.pose 'senala' o 'sombrero', u o.sostiene: el brazo de delante (columnas 12–13) se borra y se pinta aparte
  const pose = o.sostiene ? 'sostiene' : o.pose === 'senala' || o.pose === 'sombrero' ? o.pose : null;
  if (pose) for (let j = 5; j <= 8; j++) CUERPO[j] = CUERPO[j].slice(0, 12) + '..' + CUERPO[j].slice(14);
  const yH = y - 26 * s - (o.salto ?? 0) - rebote + resp, yC = yH + 15 * s - resp;
  const px = (i, j, c, y0) => { const X = dir > 0 ? x - 7 * s + i * s : x + 7 * s - i * s - (s - 1); for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(X + a, y0 + j * s + b, c); };
  const pinta = (rows, y0, piernas = false) => rows.forEach((f, j) => {
    let fila = f;
    if (piernas && paso >= 0 && j >= rows.length - 3) { const izq = paso === 0; fila = f.split('').map((ch, i) => ((i < 7) === izq ? (rows[j + 1] ?? '...............')[i] : ch)).join(''); }
    for (let i = 0; i < 15; i++) { const ch = fila[i]; if (ch === '.' || ch === undefined) continue; px(i, j, COL[ch] ?? COL.k, y0); } });
  pinta(CUERPO, yC, true);
  pinta(CAB, yH);
  if (sombrero && pose !== 'sombrero') pinta(SOM, yH);
  else if (ropa === 'vestido') pinta(FLORES, yH);
  const ojo = (t + x * 0.13) % 3.1 < 0.1; if (ojo) { px(5, 9, COL.k, yH); px(10, 9, COL.k, yH); }
  const X = (i) => (dir > 0 ? x - 7 * s + i * s : x + 7 * s - i * s - (s - 1));   // columna del sprite → pantalla
  const pintaEn = (filas, i0, y0) => filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch !== '.') px(i0 + i, j, COL[ch] ?? COL.k, y0); } });
  const mg = ropa === 'vestido' ? 'W' : 'S', pu = ropa === 'vestido' ? 'W' : 'C';
  let mano = [x + dir * 6 * s, yC + 7 * s];
  if (pose === 'senala') { // el brazo estirado hacia delante a la altura del hombro, con el índice de hueso que apunta
    const b = Math.sin(t * 3.1 + x) > 0.6 ? 1 : 0, sh = mg === 'W' ? 'w' : 's';   // el dedo da golpecitos, como quien insiste
    pintaEn(['.kkkkkkkkk' + (b ? 'k' : ''), mg.repeat(5) + pu + 'WwW' + (b ? 'WW' : 'W') + 'k', sh.repeat(5) + pu + 'wWkk', 'kkkkkkkk'], 12, yC + 3 * s);
    mano = [X(21 + b) + (dir > 0 ? s - 1 : 0), yC + 4 * s];
  } else if (pose === 'sombrero') { // se ha quitado el sombrero y lo sostiene delante por el ala, la copa hacia arriba
    const b = Math.round(Math.sin(t * 2.2 + x) * 0.6);
    pintaEn(['kkkkk.', mg + mg + mg + pu + 'k.', 'kkkkk.'], 12, yC + 4 * s);
    pintaEn(SOM, 13, yC - 1 * s + b * s);
    pintaEn(['kWWk', '.kk.'], 15, yC + 3 * s + b * s);   // los huesos de la mano sobre el ala
    mano = [X(16) + (dir > 0 ? 0 : -(s - 1)), yC + 4 * s + b * s];
  } else if (pose === 'sostiene') { // como el chibi: del hombro hacia el punto (como mucho 8 px a o.s 1), manga y antebrazo de hueso
    const sx = X(12) + (dir > 0 ? 0 : -(s - 1)), sy = yC + 5 * s, [tx, ty] = Array.isArray(o.sostiene) ? o.sostiene : [sx + 7 * s * dir, yC + 8 * s];
    const dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy) || 1, L = Math.min(8 * s, d), hx = Math.round(sx + dx / d * L), hy = Math.round(sy + dy / d * L), n = Math.max(1, Math.round(L));
    for (const borde of [1, 0]) for (let i = 0; i <= n; i++) { const cx = Math.round(sx + (hx - sx) * i / n), cy = Math.round(sy + (hy - sy) * i / n), c = borde ? COL.k : i < n * 0.5 ? COL[mg] : i < n * 0.6 ? COL[pu] : (i % 3 ? COL.W : COL.w);
      for (let a = -borde; a <= s + borde - 1; a++) for (let q = -borde; q <= s + borde - 1; q++) if (!borde || a < 0 || q < 0 || a > s - 1 || q > s - 1) R.pset(cx + a, cy + q, c); }
    for (let a = -2 * s; a <= 2 * s; a++) for (let q = -2 * s; q <= 2 * s; q++) { const r = Math.hypot(a, q) / s; if (r <= 2.3) R.pset(hx + a, hy + q, r > 1.5 ? COL.k : (a + q) % 2 ? COL.w : COL.W); }
    R.pset(hx + dir * s, hy - s, COL.k); mano = [hx, hy];
  }
  return { x, y, cabeza: [x, yH + 9 * s], mano };
}
// Animalillos de los gags (x: centro, y: suelo donde pisan), homenaje propio:
//   o.quien 'mono3': el mono de tres cabezas (~26 px a o.s 1): un cuerpo y tres cabezas que cabecean cada una a su ritmo
//     y con su cara (la de la izquierda come un plátano, la del centro sonríe enseñando los dientes, la de la derecha
//     parpadea y mira a los lados); la cola se enrosca y se mueve; o.saluda: la mano derecha saluda; o.habla: las tres
//     bocas parlotean a la vez.
//   'mono': un mono pequeño (~18 px) que se rasca la cabeza a ratos; o.platano: lo pela y se lo come; o.anda (camina
//     balanceándose), o.salta (bota sin parar).
//   'hamster': un hámster (~11 px) mareado con o.mareo (0–1): se tambalea, los ojos en espiral y tres estrellitas que
//     giran sobre su cabeza (con o.mareo 0 está tan tranquilo, mueve el hocico); o.anda: corretea.
// Comunes: o.dir (1 mira a la derecha, −1 a la izquierda), o.s (escala entera: 1 o 2), o.quieto (sin vaivén).
// Devuelve { x, y, cabeza: [x, y], mano: [x, y] }.
export function bicho(R, x, y, t, o = {}) {
  const q = o.quien ?? 'mono', d = o.dir ?? 1, s = Math.max(1, Math.round(o.s ?? 1));
  if (q === 'mono3') return c_mono3(R, x, y, t, d, s, o);
  if (q === 'hamster') return c_hamster(R, x, y, t, d, s, o);
  return c_mono(R, x, y, t, d, s, o);
}
// El retrete portátil del tiempo (homenaje propio): una caseta de plástico (o.color 'azul' por omisión, 'verde' o
// 'rojo') de 21 × 30 px a o.s 1 (pie en (x, y)), con el tejadillo blanco abombado, estrías verticales con luz y sombra,
// las rejillas de ventilación, la luna recortada en la puerta, el tirador y el pestillo de libre/ocupado (verde o rojo);
// encima, un despertador de dos campanas con sus agujas y, a un lado, la antena con su bola que parpadea (todo mide
// unos 48 px de alto). o.puerta (0–1): la puerta se abre hacia la izquierda (bisagra a la izquierda) y deja ver el
// interior oscuro con la taza, la cisterna, el rollo de papel y la bombilla. o.viaje (0–1): tiembla y las agujas se
// disparan (0–0,35), se carga de chispas y anillos de luz y se aclara (0,35–0,62), destello blanco y desaparece
// (0,62–0,78), y quedan la marca chamuscada, humo y chispas que se apagan (hasta 1). o.llega (0–1): lo contrario, aparece
// con el destello (sin marca). o.capa: 'todo' (por omisión), 'fondo' (solo el interior: se pinta antes que el que se
// mete dentro) o 'frente' (la caseta y la puerta, después). o.s: escala entera (1 o 2).
// Devuelve { x, y, puerta: [x0, y0, x1, y1] (el hueco de la puerta), dentro (el suelo de dentro), techo, visible }.
export function retrete(R, x, y, t, o = {}) {
  const s = Math.max(1, Math.round(o.s ?? 1)), K = C.k, capa = o.capa ?? 'todo', BL = C.blanco;
  const v = o.viaje != null ? o.viaje : o.llega != null ? 1 - o.llega : 0, llega = o.viaje == null && o.llega != null;
  const tinte = v < 0.35 ? 0 : Math.min(1, (v - 0.35) / 0.27) * 0.75, visible = v < 0.66;
  const temb = v > 0.02 && v < 0.62 ? Math.round(Math.sin(t * 57) * (v < 0.35 ? Math.min(1, v / 0.1) : 1.5)) : 0, xc = x + temb * s;
  const [c0, cS, cL, cD] = o.color === 'verde' ? [hex('#3aa86a'), hex('#28804e'), hex('#6ad09a'), hex('#1a5434')] : o.color === 'rojo' ? [hex('#c84a3a'), hex('#94322a'), hex('#e87a6a'), hex('#5e1e18')] : [d_C.plas, d_C.plasS, d_C.plasL, d_C.plasD];
  const col = (c) => (tinte > 0 ? d_mezcla(c, hex('#f4fbff'), tinte) : c);
  const rr = (i0, j0, i1, j1, c) => R.rect(xc + i0 * s, y + j0 * s, xc + i1 * s + s - 1, y + j1 * s + s - 1, c);
  const px = (i, j, c) => rr(i, j, i, j, c);
  const p = Math.max(0, Math.min(1, o.puerta ?? 0)), hueco = [xc - 7 * s, y - 27 * s, xc + 7 * s + s - 1, y - 1 * s + s - 1];
  if (visible) {
    if (capa !== 'frente') {
      // la caseta: el contorno, las paredes con estrías, el zócalo y el tejadillo abombado
      rr(-11, -31, 11, 0, K); rr(-10, -30, 10, -1, col(c0));
      for (let i = -10; i <= 10; i += 3) { rr(i, -29, i, -2, col(cS)); rr(i + 1, -29, i + 1, -2, col(cL)); }
      rr(-10, -30, -9, -1, col(cL)); rr(9, -30, 10, -1, col(cD)); rr(-10, -3, 10, -1, col(cD)); rr(-11, 0, 11, 0, K);
      rr(-12, -34, 12, -31, K); rr(-11, -33, 11, -31, col(BL)); rr(-9, -35, 9, -34, K); rr(-8, -34, 8, -34, col(BL)); rr(-11, -31, 11, -31, col(hex('#c8ccd4'))); px(-7, -33, col(hex('#ffffff')));
      // las rejillas de arriba, a los lados de la puerta
      for (const i of [-10, 9]) for (let j = -28; j <= -24; j += 2) rr(i, j, i + 1, j, K);
      // el interior (solo se ve con la puerta abierta): la pared del fondo, la cisterna, la taza, el rollo y la bombilla
      if (p > 0) {
        rr(-7, -27, 7, -1, col(hex('#1e2436'))); rr(-7, -27, 7, -25, col(hex('#2a3248'))); rr(-7, -2, 7, -1, col(hex('#2a3044'))); for (let j = -22; j < -2; j += 4) rr(-7, j, -6, j, col(hex('#2a3248')));
        rr(-3, -14, 3, -9, K); rr(-2, -13, 2, -10, col(hex('#d8dce4'))); rr(-4, -8, 4, -6, K); rr(-3, -8, 3, -7, col(BL)); rr(-2, -5, 2, -1, K); rr(-1, -5, 1, -1, col(hex('#c8ccd4')));
        rr(5, -14, 6, -11, col(BL)); px(5, -15, col(hex('#a8a8b0'))); px(0, -24, col(hex('#fff0b0'))); px(0, -25, K);
        if (Math.sin(t * 9) > 0.7) px(1, -23, col(hex('#fff0b0')));
      }
      // el despertador de encima: esfera redonda con su aro de latón, las dos campanas, las patitas y las agujas (corren cuando viaja)
      const cx = xc, cy = y - 41 * s, rC = 5 * s;
      for (const d of [-1, 1]) { R.disco(cx + d * 4 * s, cy - 4 * s, 2.6 * s, K); R.disco(cx + d * 4 * s, cy - 4 * s, 1.8 * s, col(d_C.laton)); R.pset(cx + d * 4 * s - 1, cy - 5 * s, col(d_C.latonL)); }
      rr(-1, -48, 1, -47, K); rr(-3, -36, -2, -35, K); rr(2, -36, 3, -35, K);
      R.disco(cx, cy, rC + 1, K); R.disco(cx, cy, rC, col(d_C.laton)); R.disco(cx, cy, rC - 1.2 * s, col(hex('#f6f0e0')));
      for (let k = 0; k < 4; k++) R.pset(Math.round(cx + Math.cos(k * Math.PI / 2) * (rC - 2 * s)), Math.round(cy + Math.sin(k * Math.PI / 2) * (rC - 2 * s)), K);
      const vel = v > 0.02 ? 9 + v * 30 : 0.05, am = t * vel, ah = t * vel / 12;
      R.linea(cx, cy, Math.round(cx + Math.cos(am) * (rC - 1.6 * s)), Math.round(cy + Math.sin(am) * (rC - 1.6 * s)), K); R.linea(cx, cy, Math.round(cx + Math.cos(ah + 1) * (rC - 2.6 * s)), Math.round(cy + Math.sin(ah + 1) * (rC - 2.6 * s)), C.rojo);
      // la antena con su bola que parpadea
      rr(8, -46, 8, -34, K); rr(7, -35, 9, -34, K); const bola = Math.floor(t * (v > 0.02 ? 12 : 2)) % 2 === 0; rr(7, -48, 9, -46, K); px(8, -47, bola ? C.rojo : hex('#6a2020'));
      if (bola && v > 0.02) { px(6, -49, C.amarillo); px(10, -49, C.amarillo); px(8, -50, BL); }
    }
    if (capa !== 'fondo') {
      // la puerta: de frente cuando está cerrada; al abrirse, se estrecha hacia la bisagra de la izquierda y luego asoma su cara de dentro
      if (p < 1) {
        const w = Math.round(14 * Math.cos(p * Math.PI / 2));
        if (w > 0) { rr(-7, -27, -7 + w, -1, K); rr(-7, -26, -7 + w - 1, -2, col(cS)); rr(-7, -26, -7 + w - 1, -26, col(cL));
          for (let j = -24; j <= -4; j += 5) if (w > 3) rr(-6, j, -7 + w - 2, j, col(cD));
          if (w > 9) { // la luna recortada, el tirador y el pestillo (rojo: ocupado; verde: libre)
            const lx = -7 + Math.round(w / 2); px(lx - 1, -22, K); px(lx, -23, K); px(lx, -21, K); px(lx - 1, -21, K); px(lx, -22, K); px(lx + 1, -23, col(cS));
            rr(-7 + w - 3, -15, -7 + w - 2, -12, K); px(-7 + w - 3, -14, col(hex('#c8ccd4'))); rr(-7 + w - 4, -19, -7 + w - 2, -18, K); px(-7 + w - 3, -19, o.ocupado ?? p === 0 ? C.rojo : hex('#5ad85a')); } }
      }
      if (p > 0.35) { const a = Math.round(8 * Math.sin(p * Math.PI / 2)); for (let i = 0; i <= a; i++) { const j0 = -27 + Math.round(i * 0.4), j1 = -1 - Math.round(i * 0.15); rr(-8 - i, j0, -8 - i, j1, i === a ? K : col(i === 0 ? cD : cL)); } rr(-8 - a, -27, -8, -27, K); }
      rr(-8, -28, -8, 0, K); rr(8, -28, 8, 0, K); rr(-8, -28, 8, -28, K);
    }
  }
  // el viaje: chispas, anillos de luz, el destello y la marca
  if (v > 0.02 && capa !== 'fondo') {
    const cyy = y - 20 * s;
    if (v < 0.62) for (let k = 0; k < 6 + Math.round(v * 14); k++) { const a = k * 2.4 + t * 7, r = (12 + h(k, Math.floor(t * 12), 590) * 10) * s, sx = Math.round(xc + Math.cos(a) * r), sy = Math.round(cyy + Math.sin(a) * r * 1.3); R.pset(sx, sy, k % 2 ? C.amarillo : BL); if (k % 3 === 0) R.pset(sx + 1, sy, hex('#8ad8ff')); }
    if (v > 0.35 && v < 0.7) for (let q = 0; q < 3; q++) { const u = ((v - 0.35) * 6 + q / 3) % 1, r = (6 + u * 26) * s; for (let a = 0; a < 6.28; a += 0.12) if (Math.floor(a * 8) % 2) R.pset(Math.round(xc + Math.cos(a) * r), Math.round(cyy + Math.sin(a) * r * 1.4), u < 0.5 ? BL : hex('#8ad8ff')); }
    if (v >= 0.6 && v < 0.8) { const u = (v - 0.6) / 0.2, r = Math.round(Math.sin(u * Math.PI) * 24 * s); R.disco(xc, cyy, r + 2, hex('#8ad8ff')); R.disco(xc, cyy, r, BL); for (let k = 0; k < 8; k++) { const a = k * 0.785; R.linea(xc, cyy, Math.round(xc + Math.cos(a) * (r + 12 * s)), Math.round(cyy + Math.sin(a) * (r + 12 * s) * 1.3), k % 2 ? BL : hex('#fff0a0')); } }
    if (v >= 0.72 && !llega) { const u = Math.min(1, (v - 0.72) / 0.28);
      for (let i = -11 * s; i <= 11 * s; i++) for (let j = -2 * s; j <= 1 * s; j++) if ((i / (11 * s)) ** 2 + (j / (2.5 * s)) ** 2 <= 1 && (i + j) % 2 === 0) { const c = R.pget(x + i, y + j); if (c) R.pset(x + i, y + j, d_mezcla(c, K, 0.55)); }
      for (let k = 0; k < 5; k++) { const w = (u * 1.3 + k / 5) % 1; R.disco(Math.round(x + (k - 2) * 4 * s + Math.sin(w * 5 + k) * 2), Math.round(y - 4 * s - w * 24 * s), (1 + w * 2.5) * s, w < 0.5 ? hex('#8a8a96') : hex('#b8b8c4')); }
      if (u < 0.7) for (let k = 0; k < 5; k++) if (Math.sin(t * 13 + k * 2) > 0) R.pset(Math.round(x + (h(k, 1, 591) - 0.5) * 24 * s), Math.round(y - 2 - h(k, 2, 591) * 8 * s), C.amarillo); }
  }
  return { x: xc, y, puerta: hueco, dentro: y - 1 * s, techo: y - 34 * s, visible };
}
export function verbos(R, t, o = {}) {
  const { rect, pset } = R;
  const cj = o.caja ?? [0, 150, 319, 179], ap = o.aparece ?? 1;
  const dy = Math.round((1 - Math.max(0, Math.min(1, ap))) * (cj[3] - cj[1] + 2));
  const [x0, y0, x1, y1] = [cj[0], cj[1] + dy, cj[2], cj[3] + dy], W = x1 - x0 + 1, H = cj[3] - cj[1] + 1;
  const P = b_VPAL[o.paleta ?? 'color'] ?? b_VPAL.color, mono = (o.paleta ?? 'color') !== 'color';
  const act = typeof o.activo === 'string' ? VERBOS.indexOf(o.activo) : o.activo ?? -1, pulsa = o.pulsa ?? 0;
  const res = { botones: [], casillas: [], frase: null, cursor: o.cursor ?? null };
  if (o.barra !== false && ap > 0) {
    const cl = [Math.max(0, x0), Math.max(0, y0), Math.min(319, x1), Math.min(179, cj[3])];
    // el panel: fondo tramado con un dibujo de rejilla muy tenue, canto de luz arriba y sombra abajo
    for (let y = cl[1]; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) { const u = y - y0;
      R.pset(x, y, u === 0 ? P.canto : u === 1 ? P.k : ((x + y) % 4 === 0 && ((x >> 2) + (y >> 2)) & 1) ? P.fondoL : P.fondo); }
    if (H < 16) {   // en miniatura: nueve botones con un punto de pictograma y el inventario como casillas
      const bw = Math.max(3, Math.floor(W * 0.62 / 5)), bh = Math.max(2, Math.floor((H - 3) / 2));
      for (let i = 0; i < 9; i++) { const f = i < 5 ? 0 : 1, c = f ? i - 5 : i, w = f ? Math.floor(bw * 5 / 4) : bw, bx = x0 + 1 + c * w, by = y0 + 2 + f * (bh + 1);
        b_rc(R, cl, bx, by, bx + w - 2, by + bh - 1, i === act ? P.activo : P.boton); pset(bx + (w >> 1) - 1, by + (bh >> 1), i === act ? P.k : P.icono); pset(bx + (w >> 1), by + (bh >> 1), i === act ? P.k : P.icono); res.botones.push([bx, by, bx + w - 2, by + bh - 1]); }
      const ix = x0 + 2 + bw * 5, iw = Math.max(2, Math.floor((x1 - ix - 1) / 4));
      for (let f = 0; f < 2; f++) for (let c = 0; c < 4; c++) { const bx = ix + c * iw, by = y0 + 2 + f * (bh + 1); b_rc(R, cl, bx, by, bx + iw - 2, by + bh - 1, P.casilla); if ((c + f * 3) % 3 === 0) pset(bx + (iw >> 1), by + (bh >> 1), mono ? P.icono : [hex('#e8c040'), hex('#c84a3a'), hex('#5ab8e8')][(c + f) % 3]); }
    } else {
      const tira = H >= 26 ? 7 : 0, rh = Math.floor((H - 2 - tira - (tira ? 1 : 0)) / 2), ry = [y0 + 2 + tira + (tira ? 1 : 0), 0]; ry[1] = ry[0] + rh;
      const vw = Math.round(W * 0.655), bw = [Math.floor(vw / 5), Math.floor(vw / 4)];
      // la tira de la frase: el verbo, la flecha y el objeto, centrados sobre los botones
      if (tira && o.frase) { const [v, ob] = o.frase, iv = typeof v === 'string' ? VERBOS.indexOf(v) : v, cx = x0 + Math.round(vw / 2), yf = y0 + 2;
        b_picto(R, b_VICON[iv] ?? b_VICON[0], cx - 20, yf, P.frase, P.k); for (let i = 0; i < 7; i++) pset(cx - 4 + i, yf + 3, P.frase); pset(cx + 1, yf + 2, P.frase); pset(cx + 1, yf + 4, P.frase); pset(cx, yf + 1, P.frase); pset(cx, yf + 5, P.frase);
        if (ob) b_icono(R, ob, cx + 8, yf, mono ? P.frase : null, P.k); res.frase = [cx - 20, yf, cx + 19, yf + 6]; }
      for (let i = 0; i < 9; i++) { const f = i < 5 ? 0 : 1, c = f ? i - 5 : i, w = bw[f], bx = x0 + 2 + c * w, by = ry[f], bx1 = bx + w - 2, by1 = by + rh - 2, on = i === act, hundido = on && pulsa > 0 && pulsa < 1;
        b_rc(R, cl, bx, by, bx1, by1, P.k); b_rc(R, cl, bx + 1, by + 1, bx1 - 1, by1 - 1, on ? P.botonOn : P.boton);
        b_rc(R, cl, bx + 1, by + 1, bx1 - 1, by + 1, hundido ? P.k : P.botonL); b_rc(R, cl, bx + 1, by1 - 1, bx1 - 1, by1 - 1, hundido ? P.botonL : P.botonS);
        if (on) { const late = Math.sin(t * 6) > 0; b_rc(R, cl, bx, by, bx1, by, late ? P.activo : P.activoS); b_rc(R, cl, bx, by1, bx1, by1, late ? P.activo : P.activoS); b_rc(R, cl, bx, by, bx, by1, late ? P.activo : P.activoS); b_rc(R, cl, bx1, by, bx1, by1, late ? P.activo : P.activoS); }
        const ix = bx + Math.round((w - 1 - 11) / 2), iy = by + Math.round((rh - 1 - 7) / 2) + (hundido ? 1 : 0);
        if (rh >= 9) b_picto(R, b_VICON[i], ix, iy, on ? P.iconoOn : P.icono, on ? P.activoS : P.k);
        else { pset(bx + (w >> 1) - 1, by + (rh >> 1) - 1, P.icono); pset(bx + (w >> 1), by + (rh >> 1) - 1, P.icono); }
        if (hundido && pulsa < 0.5) for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; pset(Math.round(bx + w / 2 + Math.cos(a) * (w / 2 + 1)), Math.round(by + rh / 2 + Math.sin(a) * (rh / 2 + 1)), P.activo); }
        res.botones.push([bx, by, bx1, by1]); }
      // el inventario: las dos flechas de desplazar y las ocho casillas con lo que se lleva
      const ix0 = x0 + 4 + vw, aw = 7;
      for (let f = 0; f < 2; f++) { const by = ry[f], cx = ix0 + 3, cy = by + Math.round(rh / 2) - 1; b_rc(R, cl, ix0, by, ix0 + aw - 1, by + rh - 2, P.k); b_rc(R, cl, ix0 + 1, by + 1, ix0 + aw - 2, by + rh - 3, P.boton);
        for (let j = 0; j < 3; j++) R.linea(cx - j, cy + (f ? -1 + j : 1 - j), cx + j, cy + (f ? -1 + j : 1 - j), P.icono); }
      const cw = Math.floor((x1 - ix0 - aw - 2) / 4), inv = o.inventario === true ? ['llave', 'pollo', 'moneda', 'mapa', 'hamster'] : o.inventario ?? [];
      for (let f = 0; f < 2; f++) for (let c = 0; c < 4; c++) { const bx = ix0 + aw + 2 + c * cw, by = ry[f], bx1 = bx + cw - 2, by1 = by + rh - 2;
        b_rc(R, cl, bx, by, bx1, by1, P.k); b_rc(R, cl, bx + 1, by + 1, bx1 - 1, by1 - 1, P.casilla); b_rc(R, cl, bx + 1, by + 1, bx1 - 1, by + 1, P.k); b_rc(R, cl, bx + 1, by + 2, bx + 1, by1 - 1, P.k);
        const it = inv[f * 4 + c]; if (it && rh >= 9) b_icono(R, it, bx + Math.round((cw - 1 - 11) / 2), by + Math.round((rh - 1 - 7) / 2), mono ? P.icono : null, P.k);
        res.casillas.push([bx, by, bx1, by1]); }
    }
  }
  // el cursor en cruz (cuatro brazos con el centro libre), con borde oscuro para que se lea sobre cualquier fondo, que
  // cambia de color; u otra forma (ojo, mano, boca, calavera) para el cursor único de los años noventa
  if (o.cursor) { const [cx, cy] = o.cursor.map(Math.round), fase = Math.floor(t * 8) % 4, col = mono ? [P.icono, P.iconoOn, P.icono, P.frase][fase] : [hex('#ffffff'), hex('#c8c8d8'), hex('#8a8aa8'), hex('#c8c8d8')][fase];
    if (!o.cursorForma || o.cursorForma === 'cruz') {
      for (const [dx, dy2] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let d = 2; d <= 6; d++) for (const e of [-1, 1]) pset(cx + dx * d + dy2 * e, cy + dy2 * d + dx * e, C.k);
      for (const [dx, dy2] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { pset(cx + dx * 7, cy + dy2 * 7, C.k); for (let d = 2; d <= 6; d++) pset(cx + dx * d, cy + dy2 * d, col); }
      pset(cx, cy, col);
    } else { const ic = b_VICON[{ ojo: 0, mano: 1, boca: 2 }[o.cursorForma]] ?? b_CALAVERA;
      for (let j = -1; j <= 7; j++) for (let i = -1; i <= 11; i++) { let v = false; for (let a = -1; a <= 1 && !v; a++) for (let b = -1; b <= 1 && !v; b++) v = ic[j + b]?.[i + a] === '#'; if (v && ic[j]?.[i] !== '#') pset(cx - 5 + i, cy - 3 + j, C.k); }
      b_picto(R, ic, cx - 5, cy - 3, col, null); }
  }
  return res;
}
// capas fijas: se pintan una vez por clave y se copian en cada fotograma (transp: fondo vacío, se pegan encima)
const A_VACIO = 0x01020304;

const a_capas = new Map();

function a_capa(R, clave, transp, dibuja) {
  let b = a_capas.get(clave);
  if (!b) { b = R.nuevo(); if (transp) b.fill(A_VACIO); const prev = R.usar(b); R.recorte(null); dibuja(); R.recorte(null); R.usar(prev); a_capas.set(clave, b); }
  return b;
}

// pega una capa transparente en el búfer en uso, solo las filas y0–y1
function a_pegar(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== A_VACIO) B[i] = c; } }

// pega una capa transparente estirada desde su base (cx, base): sx, sy, la escala; dy, cuánto sube (el rebote)
function a_pegarEstirado(R, b, cx, base, sx, sy, dy, [x0, y0, x1, y1]) {
  const B = R.buf, X0 = Math.max(0, Math.floor(cx + (x0 - cx) * sx) - 1), X1 = Math.min(319, Math.ceil(cx + (x1 - cx) * sx) + 1);
  const Y0 = Math.max(0, Math.floor(base - dy - (base - y0) * sy) - 1), Y1 = Math.min(179, Math.ceil(base - dy - (base - y1) * sy) + 1);
  for (let Y = Y0; Y <= Y1; Y++) { const ys = Math.round(base - (base - dy - Y) / sy); if (ys < 0 || ys > 179) continue;
    for (let X = X0; X <= X1; X++) { const xs = Math.round(cx + (X - cx) / sx); if (xs < 0 || xs > 319) continue; const c = b[ys * 320 + xs]; if (c !== A_VACIO) B[Y * 320 + X] = c; } }
}

// mezcla dos colores (a = 0: c; a = 1: d) y satura (k > 1 aviva)
const a_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

const a_satura = (c, k) => { const r = (c >>> 16) & 255, g = (c >>> 8) & 255, b = c & 255, m = (r + g + b) / 3, f = (v) => Math.max(0, Math.min(255, Math.round(m + (v - m) * k))); return ((255 << 24) | (f(r) << 16) | (f(g) << 8) | f(b)) >>> 0; };

// trama de Bayer 2 × 2 y una rampa de tonos: i (0 = el más oscuro) elige el tono, con trama entre dos
const a_bay = (x, y) => [0, 0.5, 0.75, 0.25][(y & 1) * 2 + (x & 1)];

const a_rampa = (cs, i, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(i + a_bay(x, y))))];

// oscurece (o aclara, con col claro) lo ya pintado dentro de un polígono: sombras arrojadas y charcos de luz
function a_tinte(R, pts, col, a) { R.poligono(pts, (x, y) => { const c = R.pget(x, y); return c === A_VACIO || !c ? c : a_mezcla(c, col, a); }); }

function a_elipse(R, cx, cy, rx, ry, c) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, d = dx * dx + dy * dy; if (d <= 1) R.pset(x, y, typeof c === 'function' ? c(x, y, d) : c); }
}

// sombra blanda en el suelo (elipse que oscurece lo de debajo)
function a_sombra(R, cx, cy, rx, ry, a = 0.35) { a_elipse(R, cx, cy, rx, ry, (x, y, d) => { const c = R.pget(x, y); return c === A_VACIO ? c : a_mezcla(c, hex('#0a0820'), a * (d < 0.55 ? 1 : 0.6)); }); }

// la paleta de la mansión según la luz ('noche', 'dia', 'atardecer'), el año (1987, más apagada) y o.hd (más viva):
// rampas de cuatro tonos (oscuro, sombra, medio, luz); lo que da luz (ventanas encendidas, lodo) no se tiñe
function a_paleta(luz, anyo, hd) {
  const noche = luz === 'noche', tarde = luz === 'atardecer';
  const tono = (c, k) => { let r = hex(c); if (anyo < 1990) r = a_mezcla(r, hex('#3a3050'), 0.32); if (hd) r = a_satura(a_mezcla(r, hex('#ffffff'), 0.06), 1.3);
    if (noche) r = a_mezcla(r, hex('#121640'), [0.62, 0.56, 0.5, 0.4][k]); else if (tarde) r = a_mezcla(r, hex('#b8487a'), [0.3, 0.26, 0.2, 0.12][k]); return r; };
  const rp = (a) => a.map((c, k) => tono(c, k));
  return {
    noche, tarde, hd, anyo,
    pared: rp(['#7a3446', '#b85a5e', '#e8846e', '#fbb28e']), piedra: rp(['#2e3260', '#4e5690', '#7280b8', '#a4b0dc']),
    torreta: rp(['#1e5a58', '#2e8a7c', '#4cbc98', '#94e4be']), tejado: rp(['#24163e', '#3e2a72', '#60449e', '#8e72c8']),
    cono: rp(['#3e1030', '#6e1e48', '#a03462', '#d8628a']), moldura: rp(['#6a5a4a', '#b8a07c', '#ecdcae', '#fff8de']),
    contra: rp(['#143c4e', '#226474', '#36909c', '#6cc4c8']), puerta: rp(['#2e1210', '#52221a', '#80402c', '#b06a46']),
    cupula: rp(['#163e3c', '#26705e', '#46a488', '#8edcb4']), ladrillo: rp(['#3e1618', '#6e2a26', '#a24638', '#d06e56']),
    cimiento: rp(['#24202c', '#3e3848', '#5e566a', '#867e90']), metal: rp(['#2a2e3a', '#4e5466', '#8a92a6', '#d0d6e2']),
    cristal: rp(['#1e3460', '#33589a', '#5e8ccc', '#bce0f8']), cortina: rp(['#3e0e1e', '#6e1a30', '#9c2a42', '#c84a5a']),
    cesped: rp(['#1e3a1e', '#2e5a26', '#4a8a32', '#86c24a']), seco: rp(['#4a3e1e', '#7a6a2e', '#b09a46', '#dccc78']),
    tierra: rp(['#2a1a14', '#4a2e20', '#6e4630', '#9a6c48']), corteza: rp(['#1e1418', '#3a2828', '#5a4038', '#806050']),
    musgo: tono('#5a8a3a', 2),
    luzV: [hex('#b05a1a'), hex('#e89a30'), hex('#f8d258'), hex('#fff4b8')], luzLab: [hex('#1a6a3a'), hex('#3aa84a'), hex('#8ae86a'), hex('#e0ffb0')],
  };
}

// La mansión torcida (homenaje propio, como un dibujo animado clásico): el cuerpo de tablas color salmón con su cornisa,
// la torre del laboratorio de piedra azulada que se inclina a la izquierda, con su cúpula de cobre verde y la antena de
// dos varillas; la torrecilla de tablas verde menta con su sombrero de bruja rizado; el tejado de escamas moradas con un
// hastial puntiagudo, las buhardillas y la chimenea torcida; el porche con columnas, la puerta y la escalinata. Todo en
// unidades (u a la derecha, v hacia arriba desde la base) que se escalan con s: las texturas (tablas, piedra, escamas,
// vetas) se calculan en píxeles de pantalla, así el detalle es el mismo a cualquier tamaño. o.detras: sin porche (la
// fachada de atrás, con una puerta pequeña y el tubo que baja hacia el río). Devuelve los puntos de anclaje en pantalla.
function a_casa(R, P, cx, base, s, o = {}) {
  const cr = (v) => 2.6 * Math.sin(v * 0.055) - v * 0.02;   // toda la casa se tuerce un poco, como si respirara
  const X = (u, v) => cx + (u + cr(v)) * s, Y = (v) => base - v * s;
  const pol = (pts, fn, lean = 0) => { const out = [];
    for (let i = 0; i < pts.length; i++) { const [u0, v0] = pts[i], [u1, v1] = pts[(i + 1) % pts.length], n = Math.max(1, Math.ceil(Math.hypot(u1 - u0, v1 - v0) / 4));
      for (let k = 0; k < n; k++) { const f = k / n, u = u0 + (u1 - u0) * f, v = v0 + (v1 - v0) * f; out.push([X(u + lean * v, v), Y(v)]); } }
    R.poligono(out, fn); return out; };
  const caja = (u0, v0, u1, v1) => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
  const hd = P.hd, noche = P.noche;
  // material: rampa + textura en píxeles de pantalla + luz (de la derecha), sombra bajo el alero, oclusión abajo
  const mat = (ramp, tipo, op = {}) => (x, y) => {
    const v = (base - y) / s, u = (x - cx) / s - cr(v) - (op.lean ?? 0) * v, yy = Math.round(base - y);
    let i = op.i ?? 1.9;
    i += u * (op.lx ?? 0.006);
    if (op.cil) { const n = ((u - op.cil[0]) / (op.cil[1] - op.cil[0])) * 2 - 1; i += 0.55 - n * n * 1.3 + n * 0.4; }
    if (op.techo != null && v > op.techo - 6) i -= (v - (op.techo - 6)) * 0.2;
    if (op.suelo != null && v < op.suelo + 4) i -= (op.suelo + 4 - v) * 0.2;
    if (tipo === 'tabla') { const bh = Math.max(3, Math.round(3 * s)), b = Math.floor(yy / bh), r = yy - b * bh;
      if (r === 0) i -= 1.25; else if (r === bh - 1) i += 0.5;
      const jw = Math.round((22 + h(b, 1, 21) * 24) * s), jx = Math.round(h(b, 2, 21) * jw); if (((x - jx) % jw + jw) % jw === 0 && r > 0) i -= 0.9;   // juntas a tope
      if (s >= 1.4 && r === 1 + Math.floor(h(b, Math.floor(x / (7 * s)), 22) * (bh - 2)) && h(Math.floor(x / (4 * s)), b, 23) < 0.5) i -= 0.4;   // vetas
    } else if (tipo === 'piedra' || tipo === 'ladrillo') { const rh = Math.max(3, Math.round((tipo === 'piedra' ? 5 : 2.6) * s)), row = Math.floor(yy / rh), bw = Math.max(4, Math.round((tipo === 'piedra' ? 9 : 5.5) * s)), off = row & 1 ? bw >> 1 : 0, xx = x + off + 4000, col = Math.floor(xx / bw), c = xx - col * bw, r = yy - row * rh;
      if (r === 0 || c === 0) return ramp[0];
      i += (h(col, row, 11) - 0.5) * 0.9; if (r === rh - 1) i += 0.5; if (c === bw - 1) i -= 0.45;
      if (s >= 1.4 && h(col, row, 12) < 0.12 && Math.abs(c - r * 0.7 - 2) < 0.6) i -= 1;   // una grieta
    } else if (tipo === 'teja') { const rh = Math.max(2, Math.round(3 * s)), cw = Math.max(3, Math.round(4 * s)), row = Math.floor(yy / rh), off = row & 1 ? cw >> 1 : 0, xx = x + off + 4000, col = Math.floor(xx / cw), c = xx - col * cw, r = yy - row * rh;
      const borde = Math.abs(c - (cw - 1) / 2) / (cw / 2); if (r === 0 || r < borde * rh * 0.6) i -= 1.15; else if (c === 0) i -= 0.6; if (r === rh - 1) i += 0.4;
      i += (h(col, row, 13) - 0.5) * 0.8; if (!hd && h(col, row, 14) < 0.035) return P.musgo;
    } else if (tipo === 'vertical') { const bw = Math.max(3, Math.round(4 * s)), c = ((x - Math.round(cx)) % bw + bw) % bw; if (c === 0) i -= 1.1; else if (c === 1) i += 0.4;
      if (s >= 1.4 && h(Math.floor((x - cx) / bw), Math.floor(yy / (6 * s)), 24) < 0.3 && c === 2) i -= 0.35;
    }
    if (!hd) i += (h(x, y, op.k ?? 1) - 0.5) * 0.4;
    return a_rampa(ramp, i, x, y);
  };
  const A = { ventanas: [], torre: [] };
  // el cristal de una ventana: encendida de noche (cálida, con cortinas al trasluz), de día el cielo reflejado
  const encendida = (k) => noche || P.tarde ? h(k, 3, 40) < (P.anyo < 1990 ? 0.55 : 0.8) : false;
  const cristal = (u0, v0, w, hh, k, lean, lab) => (x, y) => {
    const v = (base - y) / s, u = (x - cx) / s - cr(v) - lean * (v - v0), fu = (u - u0) / w, fv = (v - v0) / hh;
    const cort = fu < 0.2 || fu > 0.8;
    if (lab) { const i = 1.3 + (1 - Math.abs(fu - 0.5) * 2) * 1.2 + (noche || P.tarde ? 0.6 : -0.6) - fv * 0.4; return a_rampa(noche || P.tarde ? P.luzLab : P.cupula, i, x, y); }
    if (encendida(k)) { if (cort) { const pl = Math.floor((x - X(u0, v0)) / Math.max(1, s)) % 2; return a_rampa(P.cortina, 1.6 + pl * 0.8 + (fu < 0.2 ? fu : 1 - fu) * 4, x, y); }
      return a_rampa(P.luzV, 1.4 + (1 - Math.abs(fu - 0.5) * 2) * 1.3 + (0.5 - fv) * 0.6, x, y); }
    if (cort) return a_rampa(P.cortina, 0.8 + (Math.floor((x - X(u0, v0)) / Math.max(1, s)) % 2) * 0.6, x, y);
    const ref = ((x + y * 0.6) % Math.round(11 * s) + Math.round(11 * s)) % Math.round(11 * s) < Math.max(1, Math.round(2 * s));
    return a_rampa(P.cristal, (noche ? 0.5 : 1.3) + fv * 1.2 + (ref ? 1.4 : 0), x, y);
  };
  // una ventana: contraventanas (una cuelga torcida), marco, cristal, parteluz, alféizar con su sombra; arco: medio punto
  const ventana = (u0, v0, w, hh, k, op = {}) => {
    const lean = op.lean ?? 0, L = (pts) => pts.map(([u, v]) => [u + lean * (v - v0), v]);
    if (op.contra) for (const sd of [-1, 1]) { const ua = sd < 0 ? u0 - 1.5 - w * 0.45 : u0 + w + 1.5, ub = ua + w * 0.45, cae = sd > 0 && h(k, 4, 40) < 0.5 ? 2.5 : 0;
      pol(L([[ua, v0 - cae * 0.4], [ub, v0], [ub, v0 + hh], [ua, v0 + hh - cae]]), (x, y) => { const yy = Math.round(base - y), lam = yy % Math.max(2, Math.round(2 * s)) === 0; return a_rampa(P.contra, lam ? 0.8 : 2 - (sd < 0 ? 0.2 : 0) + (h(x, y, 41) - 0.5) * 0.4, x, y); }); }
    const arc = op.arco ? w / 2 : 0, fr = 1.3, pts = (m) => { const p = [[u0 - m, v0 - m], [u0 + w + m, v0 - m], [u0 + w + m, v0 + hh]]; if (arc) for (let a = 0; a <= 8; a++) { const an = (a / 8) * Math.PI; p.push([u0 + w / 2 + Math.cos(an) * (w / 2 + m), v0 + hh + Math.sin(an) * (w / 2 + m)]); } else p.push([u0 + w + m, v0 + hh + m], [u0 - m, v0 + hh + m]); if (arc) p.push([u0 - m, v0 + hh]); return L(p); };
    pol(pts(fr + 0.6), mat(P.moldura, 'liso', { i: 0.6, k: 42 }));
    pol(pts(fr), mat(P.moldura, 'liso', { i: 2.3, k: 43 }));
    pol(pts(0), cristal(u0, v0, w, hh + arc, k, lean, op.lab));
    // parteluz en cruz
    const um = u0 + w / 2, vm = v0 + hh * 0.55, mc = encendida(k) && !op.lab ? P.moldura[0] : P.moldura[1];
    R.linea(X(um + lean * 0, v0), Y(v0), X(um + lean * (hh + arc), v0 + hh + arc), Y(v0 + hh + arc), mc);
    if (s >= 1.5) R.linea(X(um + lean * 0, v0) + 1, Y(v0), X(um + lean * (hh + arc), v0 + hh + arc) + 1, Y(v0 + hh + arc), mc);
    R.linea(X(u0 + lean * (vm - v0), vm), Y(vm), X(u0 + w + lean * (vm - v0), vm), Y(vm), mc);
    // alféizar con su sombra debajo
    pol(L([[u0 - fr - 1.2, v0 - fr - 1.6], [u0 + w + fr + 1.2, v0 - fr - 1.6], [u0 + w + fr + 1.2, v0 - fr], [u0 - fr - 1.2, v0 - fr]]), mat(P.moldura, 'liso', { i: 2.6, k: 44 }));
    a_tinte(R, L([[u0 - fr - 0.8, v0 - fr - 3.2], [u0 + w + fr + 0.8, v0 - fr - 3.2], [u0 + w + fr + 1.2, v0 - fr - 1.6], [u0 - fr - 1.2, v0 - fr - 1.6]]).map(([u, v]) => [X(u, v), Y(v)]), hex('#0a0820'), 0.35);
    const g = [Math.round(X(u0 + lean * hh * 0.5, v0 + hh / 2)), Math.round(Y(v0 + hh + arc)), Math.round(X(u0 + w + lean * hh * 0.5, v0 + hh / 2)), Math.round(Y(v0))];
    (op.lab ? A.torre : A.ventanas).push({ caja: g, luz: op.lab ? noche || P.tarde : encendida(k), k });
    return g;
  };

  // ── la torre del laboratorio (detrás del cuerpo por la izquierda), inclinada
  const TL = -0.075;
  pol(caja(-98, 0, -66, 86), mat(P.piedra, 'piedra', { lean: TL, cil: [-98, -66], suelo: 0, k: 50 }), TL);
  pol(caja(-101, 84, -63, 90), mat(P.piedra, 'liso', { lean: TL, i: 2.4, k: 51 }), TL);   // la cornisa
  for (let k = 0; k < 6; k++) pol(caja(-100 + k * 6.6, 81, -97.5 + k * 6.6, 84), mat(P.piedra, 'liso', { lean: TL, i: 1.2, k: 52 }), TL);   // las ménsulas
  { const cu = -82, cv = 90, r = 15;   // la cúpula del observatorio, de cobre verde, con sus costillas, remaches y la ranura
    const pts = []; for (let a = 0; a <= 16; a++) { const an = (a / 16) * Math.PI; pts.push([cu + Math.cos(an) * r, cv + Math.sin(an) * r * 0.95]); }
    pol(pts, (x, y) => { const v = (base - y) / s, u = (x - cx) / s - cr(v) - TL * v, nx = (u - cu) / r, ny = (v - cv) / (r * 0.95);
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)); let i = 0.6 + nz * 1.5 + nx * 0.7 + ny * 0.3;
      const ang = Math.atan2(ny, nx), cost = Math.abs(((ang / (Math.PI / 6)) % 1 + 1) % 1 - 0.5) < 0.06; if (cost) i -= 0.9;
      if (Math.abs(nx + 0.22) < 0.13 && ny > 0.05) return a_rampa(noche || P.tarde ? P.luzLab : P.metal, noche || P.tarde ? 1.6 + ny : 0.4 + ny, x, y);   // la ranura abierta
      if (!hd) i += (h(x, y, 53) - 0.5) * 0.5; return a_rampa(P.cupula, i, x, y); }, TL);
    A.cupula = [X(cu + TL * cv, cv), Y(cv + r)];
    // el telescopio que asoma por la ranura
    const tu = cu - 3, tv = cv + r * 0.75; R.linea(X(tu + TL * tv, tv), Y(tv), X(tu - 5 + TL * (tv + 6), tv + 6), Y(tv + 6), P.metal[2]); R.linea(X(tu + TL * tv, tv) + 1, Y(tv), X(tu - 5 + TL * (tv + 6), tv + 6) + 1, Y(tv + 6), P.metal[1]);
    // la antena: un mástil con dos varillas en uve (la escalera de Jacob que echa chispas)
    const av = cv + r * 0.95, bx = X(cu + TL * av, av), by = Y(av), tx = X(cu + TL * (av + 10), av + 10), ty = Y(av + 10);
    R.linea(bx, by, tx, ty, P.metal[1]); R.linea(bx + 1, by, tx + 1, ty, P.metal[2]);
    for (const sd of [-1, 1]) R.linea(tx, ty, tx + sd * 4 * Math.max(1, s * 0.7), ty - 9 * Math.max(1, s * 0.7), P.metal[3]);
    R.disco(bx, by, Math.max(1, s * 1.2), P.metal[2]);
    A.antena = [tx, ty, Math.round(4 * Math.max(1, s * 0.7)), Math.round(9 * Math.max(1, s * 0.7))];
  }
  for (let k = 0; k < 3; k++) ventana(-87 + TL * (12 + k * 25), 12 + k * 25, 8, 9, 20 + k, { lean: TL, arco: true, lab: true });
  // el tubo de cobre que baja por la torre (con dos válvulas)
  { const tu = -69, pv = (v) => [X(tu + TL * v, v), Y(v)]; for (let v = 4; v < 80; v += 0.5) { const [x, y] = pv(v); R.rect(Math.round(x), Math.round(y), Math.round(x + Math.max(1, s * 1.6)), Math.round(y), a_rampa(P.ladrillo, 2.4, Math.round(x), Math.round(y))); R.pset(Math.round(x), Math.round(y), P.ladrillo[1]); }
    for (const v of [30, 58]) { const [x, y] = pv(v); R.disco(x + s, y, Math.max(1.2, s * 1.6), P.metal[2]); R.pset(Math.round(x + s), Math.round(y - s), P.metal[3]); } }

  // ── la torrecilla de la derecha (también detrás del cuerpo), de tablas verde menta, y su sombrero rizado
  const TR = 0.04;
  pol(caja(62, 0, 90, 70), mat(P.torreta, 'tabla', { lean: TR, cil: [62, 90], suelo: 0, techo: 70, k: 60 }), TR);
  pol(caja(60, 68, 92, 72), mat(P.moldura, 'liso', { lean: TR, i: 2.2, k: 61 }), TR);
  ventana(71 + TR * 12, 12, 9, 12, 30, { lean: TR, arco: true }); ventana(71 + TR * 42, 42, 9, 12, 31, { lean: TR, arco: true });
  { const c2 = [[58, 71], [94, 71], [86, 84], [80, 96], [74, 84]];
    pol(c2, mat(P.cono, 'teja', { lean: TR, cil: [58, 94], k: 62 }), TR);
    pol([[86, 84], [80, 96], [83, 101], [88, 105], [95, 106], [100, 103], [99, 99], [96, 101], [91, 100], [87, 97], [86, 92]], mat(P.cono, 'teja', { lean: TR, i: 2.2, k: 63 }), TR);
    R.disco(X(99 + TR * 101, 101), Y(101), Math.max(1.2, s * 1.4), P.moldura[2]); R.pset(Math.round(X(99 + TR * 101, 101)) - 1, Math.round(Y(101)) - 1, P.moldura[3]);
    A.torreta = [X(99 + TR * 101, 101), Y(101)]; }

  // ── la chimenea torcida (detrás del tejado), de ladrillo, con su sombrerete
  const CL = 0.14;
  pol(caja(38, 66, 47, 98), mat(P.ladrillo, 'ladrillo', { lean: CL, cil: [38, 47], k: 70 }), CL);
  pol(caja(36, 98, 49, 101.5), mat(P.ladrillo, 'liso', { lean: CL, i: 2.3, k: 71 }), CL);
  A.chimenea = [X(42.5 + CL * 102, 102), Y(102)];

  // ── el tejado de escamas moradas, el hastial puntiagudo con su ojo de buey y las dos buhardillas
  pol([[-71, 55], [71, 55], [56, 79], [10, 82], [-48, 84]], mat(P.tejado, 'teja', { lx: 0.008, k: 80 }));
  pol([[-50, 83.4], [10, 81.4], [56, 78.4], [56, 80], [10, 83], [-50, 85]], mat(P.moldura, 'liso', { i: 1.2, k: 81 }));   // la cumbrera
  for (let u = -46; u < 54; u += 3.2) { const v = 84.6 - (u + 48) * 0.06; R.linea(X(u, v), Y(v), X(u, v + 2.4), Y(v + 2.4), P.metal[0]); R.pset(Math.round(X(u, v + 2.6)), Math.round(Y(v + 2.6)), P.metal[1]); }   // la crestería de hierro
  for (const [du, k] of [[-44, 0], [34, 1]]) {   // buhardillas
    pol(caja(du - 7, 58, du + 7, 70), mat(P.pared, 'tabla', { techo: 70, k: 82 + k }));
    ventana(du - 3.5, 60, 7, 7, 40 + k, {});
    pol([[du - 9.5, 69.5], [du + 9.5, 69.5], [du + 1, 80]], mat(P.tejado, 'teja', { i: 2.2, k: 84 }));
    R.linea(X(du - 9.5, 69.5), Y(69.5), X(du + 1, 80), Y(80), P.moldura[2]); R.linea(X(du + 1, 80), Y(80), X(du + 9.5, 69.5), Y(69.5), P.moldura[1]);
    a_tinte(R, [[X(du - 7, 69.4), Y(69.4)], [X(du + 7, 69.4), Y(69.4)], [X(du + 7, 67.4), Y(67.4)], [X(du - 7, 67.4), Y(67.4)]], hex('#0a0820'), 0.3);
  }
  // el hastial: escamas en otro tono, tablas de borde con su lambrequín y el ojo de buey redondo
  const gab = [[-30, 56], [22, 56], [-5, 106]];
  pol(gab, mat(P.pared, 'teja', { i: 2.2, k: 85 }));
  { const g = (f, a, b) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    for (let f = 0; f <= 1.0001; f += 0.02) for (const [a, b] of [[gab[0], gab[2]], [gab[1], gab[2]]]) { const [u, v] = g(f, a, b); R.disco(X(u, v), Y(v), Math.max(1, 1.7 * s), P.moldura[2]); }
    for (let f = 0.06; f < 0.95; f += 0.09) for (const [a, b] of [[gab[0], gab[2]], [gab[1], gab[2]]]) { const [u, v] = g(f, a, b); R.disco(X(u, v - 2.4), Y(v - 2.4), Math.max(0.8, 1.1 * s), P.moldura[1]); }   // el lambrequín de bolitas
    const ou = -4, ov = 74, orr = 6.5; R.disco(X(ou, ov), Y(ov), (orr + 1.4) * s, P.moldura[1]); R.disco(X(ou, ov), Y(ov), (orr + 0.6) * s, P.moldura[2]);
    R.disco(X(ou, ov), Y(ov), orr * s, (x, y, d) => encendida(50) ? a_rampa(P.luzV, 3 - d * 1.8, x, y) : a_rampa(P.cristal, 0.6 + (1 - d) * 1.5 + (((x + y) % 7) < 2 ? 1 : 0), x, y));
    for (let a = 0; a < 4; a++) { const an = a * Math.PI / 4; R.linea(X(ou, ov) - Math.cos(an) * orr * s, Y(ov) - Math.sin(an) * orr * s, X(ou, ov) + Math.cos(an) * orr * s, Y(ov) + Math.sin(an) * orr * s, P.moldura[1]); }
    A.ojo = [X(ou, ov), Y(ov), orr * s];
    // la veleta en el pico (la pinta la escena animada encima: aquí solo el mástil)
    R.linea(X(-5, 106), Y(106), X(-5, 113), Y(113), P.metal[0]); A.veleta = [X(-5, 113), Y(113)];
  }
  // la sombra del alero sobre la pared
  // ── el cuerpo: cimiento de piedra, tablas salmón, banda entre pisos, esquineras y cornisa con dentículos
  pol(caja(-66, 0, 66, 6), mat(P.cimiento, 'piedra', { suelo: 0, k: 90 }));
  pol([[-63, 6], [63, 6], [60, 55], [-60, 55]], mat(P.pared, 'tabla', { techo: 55, suelo: 6, k: 91 }));
  a_tinte(R, [[X(-62, 55), Y(55)], [X(62, 55), Y(55)], [X(62, 50), Y(50)], [X(-62, 51), Y(51)]], hex('#100a28'), 0.28);   // la sombra del alero
  pol(caja(-63, 29, 63, 31), mat(P.moldura, 'liso', { i: 2.2, k: 92 }));
  for (const sd of [-1, 1]) pol([[sd * 59, 6], [sd * 63.5, 6], [sd * 60.5, 55], [sd * 56.5, 55]].map(([u, v]) => [u, v]), mat(P.moldura, 'liso', { i: sd > 0 ? 2.5 : 1.7, k: 93 }));
  pol(caja(-66, 54, 66, 57.5), mat(P.moldura, 'liso', { i: 2.3, k: 94 }));
  for (let u = -64; u < 64; u += 3) R.rect(Math.round(X(u, 53.5)), Math.round(Y(54)), Math.round(X(u + 1.4, 53.5)), Math.round(Y(53)), P.moldura[1]);   // dentículos
  // las sombras que arrojan la torre y la torrecilla sobre la pared (la luz viene de arriba a la derecha)
  a_tinte(R, [[X(-63, 6), Y(6)], [X(-55, 6), Y(6)], [X(-53, 54), Y(54)], [X(-60, 54), Y(54)]].map(([x, y]) => [x, y]), hex('#100a28'), 0.25);
  // ventanas: abajo en arco, arriba rectangulares con contraventanas, cada una un poco torcida
  for (const [u, k] of [[-52, 0], [-34, 1], [24, 2], [42, 3]]) ventana(u, 10, 10, 11, k, { arco: true, lean: (h(k, 9, 40) - 0.5) * 0.12 });
  for (const [u, k] of [[-51, 4], [-33, 5], [23, 6], [41, 7]]) ventana(u, 35, 10, 12, k, { contra: true, lean: (h(k, 9, 40) - 0.5) * 0.16 });

  // ── el porche: la puerta con su montante, el frontón con columnas salomónicas y la escalinata
  if (!o.detras) {
    pol(caja(-10.5, 6, 10.5, 30), mat(P.moldura, 'liso', { i: 1.8, k: 96 }));
    pol(caja(-8, 7, 8, 25), mat(P.puerta, 'vertical', { i: 1.7, k: 97 }));
    // los cuarterones de la puerta (dos hojas)
    for (const [a, b] of [[-7, -1], [1, 7]]) for (const [c, d] of [[9, 15], [17, 23]]) { R.rect(Math.round(X(a, d)), Math.round(Y(d)), Math.round(X(b, d)), Math.round(Y(d)), P.puerta[0]); R.rect(Math.round(X(a, c)), Math.round(Y(c)), Math.round(X(b, c)), Math.round(Y(c)), P.puerta[3]); R.linea(X(a, c), Y(c), X(a, d), Y(d), P.puerta[0]); R.linea(X(b, c), Y(c), X(b, d), Y(d), P.puerta[3]); }
    R.linea(X(0, 7), Y(7), X(0, 25), Y(25), P.puerta[0]);
    R.disco(X(-2, 15), Y(15), Math.max(0.8, s * 0.9), P.moldura[3]); R.disco(X(2, 15), Y(15), Math.max(0.8, s * 0.9), P.moldura[3]);   // los pomos
    A.puerta = [Math.round(X(-8, 16)), Math.round(Y(25)), Math.round(X(8, 16)), Math.round(Y(7))];
    // el montante en abanico
    { const pts = []; for (let a = 0; a <= 10; a++) { const an = (a / 10) * Math.PI; pts.push([Math.cos(an) * 8, 25.5 + Math.sin(an) * 4.5]); }
      pol(pts, (x, y) => { const v = (base - y) / s, u = (x - cx) / s - cr(v), an = Math.atan2(v - 25.5, u); if (Math.abs(((an / (Math.PI / 6)) % 1 + 1) % 1 - 0.5) > 0.42) return P.moldura[1]; return encendida(60) ? a_rampa(P.luzV, 2.4, x, y) : a_rampa(P.cristal, 1.6, x, y); }); }
    // el frontón
    pol([[-23, 30], [23, 30], [0, 42]], mat(P.moldura, 'liso', { i: 1.4, k: 98 }));
    pol([[-19, 31.4], [19, 31.4], [0, 39.5]], mat(P.pared, 'teja', { i: 1.9, k: 99 }));
    R.disco(X(0, 34.5), Y(34.5), Math.max(1.4, 2.4 * s), P.moldura[2]); R.disco(X(0, 34.5), Y(34.5), Math.max(0.8, 1.4 * s), P.cupula[2]);   // el medallón
    pol(caja(-24, 28.6, 24, 30.4), mat(P.moldura, 'liso', { i: 2.5, k: 100 }));
    A.fronton = [X(0, 30), Y(30)];
    // columnas salomónicas (retorcidas) con basa y capitel
    for (const sd of [-1, 1]) { const u = sd * 17;
      pol(caja(u - 2.6, 6, u + 2.6, 8), mat(P.moldura, 'liso', { i: 1.6, k: 101 })); pol(caja(u - 2.8, 26.5, u + 2.8, 28.6), mat(P.moldura, 'liso', { i: 2.2, k: 102 }));
      pol(caja(u - 1.7, 8, u + 1.7, 26.5), (x, y) => { const v = (base - y) / s, uu = (x - cx) / s - cr(v) - u; const tw = ((uu * 1.3 + v * 0.9) % 3.2 + 3.2) % 3.2; return a_rampa(P.moldura, 1.4 + (tw < 1.2 ? 1.2 : 0) - uu * 0.25, x, y); }); }
    // la escalinata: cuatro escalones de piedra que bajan de la puerta, cada uno más ancho
    for (let k = 0; k < 4; k++) { const w = 21 + k * 3, v1 = 7 - k * 3.2, v0 = v1 - 3.2;
      pol(caja(-w, v0, w, v1), mat(P.cimiento, 'piedra', { i: 2.1, k: 103 + k }));
      R.rect(Math.round(X(-w, v1)), Math.round(Y(v1)), Math.round(X(w, v1)), Math.round(Y(v1)), P.cimiento[3]);
      a_tinte(R, [[X(-w, v1 - 0.6), Y(v1 - 0.6)], [X(w, v1 - 0.6), Y(v1 - 0.6)], [X(w, v1 - 1.6), Y(v1 - 1.6)], [X(-w, v1 - 1.6), Y(v1 - 1.6)]], hex('#0a0820'), 0.2); }
    A.rellano = [X(-21, 7), Y(7), X(21, 7)]; A.pie = [X(-30, -5.8), Y(-5.8), X(30, -5.8)];
  } else {
    // la fachada de atrás: una puerta pequeña de servicio y el tubo del laboratorio que sale por el cimiento
    pol(caja(-4, 6, 6, 21), mat(P.moldura, 'liso', { i: 1.8, k: 110 })); pol(caja(-2.6, 6, 4.6, 19.6), mat(P.puerta, 'vertical', { i: 1.5, k: 111 }));
    R.pset(Math.round(X(3, 13)), Math.round(Y(13)), P.moldura[3]); A.puerta = [Math.round(X(-2.6, 13)), Math.round(Y(19.6)), Math.round(X(4.6, 13)), Math.round(Y(6))];
  }
  A.caja = [Math.floor(X(-104, 0)) - 6, Math.floor(Y(122)), Math.ceil(X(104, 0)) + 6, Math.ceil(Y(-11)) + 1];
  A.X = X; A.Y = Y;
  return A;
}

// el cielo fijo (va en la capa de fondo): degradado tramado en cinco tonos, cirros finos, estrellas, y la luna con su
// halo (noche), el sol (día) o el sol grande y bajo (atardecer); o.astro [x, y, r] lo mueve
const a_bay4 = (x, y) => [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5][(y & 3) * 4 + (x & 3)] / 16;

function a_cieloFijo(R, P, hor, o = {}) {
  const cols = (P.noche ? ['#080a22', '#10143a', '#1a1e50', '#262a62', '#363670', '#46407a'] : P.tarde ? ['#26265e', '#4a3282', '#8a3e86', '#d0587a', '#f08a62', '#f8bc66'] : ['#2e62c8', '#3e78d8', '#5a94e4', '#7cb2ee', '#a6d0f6', '#d2ecfa']).map((c) => hex(c));
  for (let y = 0; y < hor; y++) for (let x = 0; x < 320; x++) {
    let f = (y / hor) * (cols.length - 1) + Math.sin(x * 0.02 + y * 0.05) * 0.18;
    const cir = Math.sin(x * 0.035 - y * 0.42 + Math.sin(x * 0.011) * 3) * Math.sin(x * 0.007 + 1.3);   // cirros finos
    if (cir > 0.82 && y < hor * 0.75) f += P.noche ? 0.7 : -0.6;
    R.pset(x, y, cols[Math.max(0, Math.min(cols.length - 1, Math.floor(f + a_bay4(x, y))))]);
  }
  if (P.noche || P.tarde) for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 200) * 320), y = Math.floor(h(k, 2, 200) * hor * (P.tarde ? 0.4 : 0.85)); if (x > 270 && y < 50) continue; R.pset(x, y, k % 5 ? hex('#8a8ab8') : hex('#e8e8ff')); if (k % 9 === 0) { R.pset(x + 1, y, hex('#6a6aa0')); R.pset(x - 1, y, hex('#6a6aa0')); R.pset(x, y + 1, hex('#6a6aa0')); R.pset(x, y - 1, hex('#6a6aa0')); } }
  const [ax, ay, ar] = o.astro ?? (P.noche ? [236, 32, 11] : P.tarde ? [64, hor - 6, 16] : [240, 30, 9]);
  if (P.noche) {   // la luna llena con dos halos tramados, cráteres y su lado en sombra
    for (let j = -ar * 3; j <= ar * 3; j++) for (let i = -ar * 3; i <= ar * 3; i++) { const d = Math.hypot(i, j) / ar; if (d < 1 || d > 3) continue; const x = ax + i, y = ay + j; if (y < 0 || y >= hor) continue; const c = R.pget(x, y); if (a_bay4(x, y) < (d < 1.6 ? 0.55 : d < 2.2 ? 0.3 : 0.12)) R.pset(x, y, a_mezcla(c, hex('#8a8ac8'), d < 1.6 ? 0.35 : 0.22)); }
    R.disco(ax, ay, ar, (x, y, d) => { const nx = (x - ax) / ar, ny = (y - ay) / ar; let i = 2.6 - Math.max(0, nx + 0.3) * 1.2 - d * 0.4; for (const [cx, cy, cr] of [[-0.35, -0.2, 0.28], [0.25, 0.35, 0.2], [0.1, -0.45, 0.14], [-0.2, 0.45, 0.12]]) { const e = Math.hypot(nx - cx, ny - cy) / cr; if (e < 1) i -= e > 0.7 ? 0.4 : 1; } return a_rampa([hex('#8a86a0'), hex('#c8c4b8'), hex('#ece8d0'), hex('#fffbe8')], i, x, y); });
  } else {   // el sol con su halo
    for (let j = -ar * 2.4; j <= ar * 2.4; j++) for (let i = -ar * 2.4; i <= ar * 2.4; i++) { const d = Math.hypot(i, j) / ar; if (d < 1 || d > 2.4) continue; const x = ax + i, y = ay + j; if (y < 0 || y >= hor) continue; if (a_bay4(x, y) < (d < 1.5 ? 0.6 : 0.25)) R.pset(x, y, a_mezcla(R.pget(x, y), hex(P.tarde ? '#fff0a0' : '#fffbe0'), 0.45)); }
    R.disco(ax, ay, ar, (x, y, d) => a_rampa([hex(P.tarde ? '#f07a3a' : '#f8d040'), hex(P.tarde ? '#f8a848' : '#fce86a'), hex('#fff6b0'), hex('#ffffff')], 3 - d * 2.2, x, y));
  }
}

// una nube de tres tonos (sombra abajo, cuerpo y el filo de luz), de bolas con la base plana
function a_nube(R, cx, cy, w, cols) {
  const r = w * 0.28, B = [[-w * 0.36, 1.2, r * 0.75], [-w * 0.12, -r * 0.35, r * 1.0], [w * 0.16, -r * 0.15, r * 0.9], [w * 0.38, 1.3, r * 0.7]];
  const base = cy + r * 0.75;
  const dentro = (x, y, k) => { if (y > base) return false; for (const [dx, dy, rr] of B) { const e = Math.hypot(x - cx - dx, (y - cy - dy) * 1.15); if (e <= rr * k) return true; } return false; };
  for (let y = Math.floor(cy - r * 1.5); y <= Math.ceil(base); y++) for (let x = Math.floor(cx - w * 0.62); x <= Math.ceil(cx + w * 0.62); x++) {
    if (!dentro(x, y, 1)) continue;
    let c = cols[1]; if (!dentro(x, y + 2, 1) || y > base - 2) c = cols[0]; else if (!dentro(x + 1, y - 2, 1)) c = cols[2]; else if (dentro(x, y, 1) && !dentro(x + 2, y - 3, 1) && a_bay(x, y) < 0.5) c = cols[2];
    else if (y > base - 4 && a_bay(x, y) < 0.5) c = cols[0];
    R.pset(x, y, c);
  }
}

// las nubes que pasan a tres velocidades (lejos despacio, cerca deprisa), en la franja y0–y1
function a_nubes(R, t, P, y0, y1, n = 7) {
  const cols = (P.noche ? ['#1c1c46', '#323262', '#6e6a9e'] : P.tarde ? ['#8a3a6a', '#d0607a', '#f8b088'] : ['#a4bce0', '#dce8f6', '#ffffff']).map((c) => hex(c));
  for (let k = 0; k < n; k++) { const capa = k % 3, v = [1.2, 2.6, 4.4][capa], w = [20, 30, 44][capa] + h(k, 1, 210) * 10, y = y0 + h(k, 2, 210) * (y1 - y0) + capa * 4;
    const x = ((h(k, 3, 210) * 420 + t * v) % 420) - 50; if (x > 250 && y < 50) continue; a_nube(R, x, y, w, cols); }
}

// murciélagos que revolotean en círculo alrededor de (cx, cy)
function a_murcielagos(R, t, cx, cy, n = 3, r = 22, col = hex('#0e0a1e')) {
  for (let k = 0; k < n; k++) { const a = t * (0.9 + k * 0.15) + k * 2.1, x = Math.round(cx + Math.cos(a) * r * (1 + k * 0.2)), y = Math.round(cy + Math.sin(a * 1.3) * r * 0.45), ala = Math.floor(t * 10 + k * 3) % 3;
    R.pset(x, y, col); R.pset(x, y - 1, col); R.pset(x - 1, y - 1, col); R.pset(x + 1, y - 1, col);
    for (const sd of [-1, 1]) { R.pset(x + sd * 2, y - 1 + (ala === 0 ? -1 : ala === 1 ? 0 : 1), col); R.pset(x + sd * 3, y - 1 + (ala === 0 ? -2 : ala === 1 ? -1 : 1), col); R.pset(x + sd * 4, y + (ala === 0 ? -2 : 0), col); } }
}

// colinas lejanas onduladas, en dos tonos con trama y árboles de piruleta (o pelados, de noche), sobre la línea yb(x)
function a_colinas(R, P, yb, cols, arboles, k = 0) {
  for (let x = 0; x < 320; x++) { const y0 = Math.round(yb(x)); for (let y = Math.max(0, y0); y < 180; y++) { const d = y - y0; R.pset(x, y, a_rampa(cols, 2.2 - d * 0.06 + (h(x >> 2, y >> 2, 220 + k) - 0.5) * 0.5 + (d === 0 ? 0.9 : 0), x, y)); } }
  if (arboles) for (let a = 0; a < arboles.n; a++) { const x = Math.round(h(a, 1, 230 + k) * 320), y = Math.round(yb(x)) + 1, alto = 5 + Math.round(h(a, 2, 230 + k) * 6);
    if (x > 272 && y - alto < 48) continue;
    R.linea(x, y, x, y - alto, arboles.tronco);
    if (arboles.pelado) { R.linea(x, y - alto + 2, x - 3, y - alto - 1, arboles.tronco); R.linea(x, y - alto + 3, x + 3, y - alto, arboles.tronco); R.pset(x + 3, y - alto - 1, arboles.tronco); }
    else { R.disco(x, y - alto - 2, 3 + (a % 3 === 0 ? 1 : 0), arboles.copa[0]); R.disco(x - 0.6, y - alto - 2.6, 2.2, arboles.copa[1]); R.pset(x - 1, y - alto - 4, arboles.copa[2]); R.pset(x, y - alto - 3, arboles.copa[2]); } }
}

// hierba: una mata de briznas que se mece con el viento (de pie en (x, y), alto a)
function a_mata(R, x, y, t, a, cols, k = 0) {
  const m = Math.sin(t * 1.8 + x * 0.3 + k) * 1.2;
  for (let b = -2; b <= 2; b++) { const alto = a - Math.abs(b) * 1.2 + h(x, b, 240) * 2, tip = x + b * 1.2 + m * (alto / a);
    R.linea(x + b * 0.5, y, tip, y - alto, b < 0 ? cols[1] : cols[2]); R.pset(Math.round(tip), Math.round(y - alto), cols[3]); }
}

// lo que vive encima de la mansión en cada fotograma: ventanas que parpadean y siluetas que pasan por las encendidas,
// burbujas en las ventanas del laboratorio, el arco eléctrico que sube por la antena, el humo de la chimenea y la
// veleta-murciélago que gira. F(x, y) lleva un punto de la capa a la pantalla (con el estiramiento del rebote).
function a_casaViva(R, t, P, A, s, F = (x, y) => [x, y]) {
  const clip = (c) => { const [x0, y0] = F(c[0], c[1]), [x1, y1] = F(c[2], c[3]); return [x0, y0, x1, y1]; };
  A.ventanas.forEach((w, n) => {
    if (!w.luz) return; const c = clip(w.caja);
    if (Math.floor(t / 2.3 + h(n, 1, 250) * 9) % 7 === 3) { R.recorte(c); a_tinte(R, [[c[0], c[1]], [c[2] + 1, c[1]], [c[2] + 1, c[3] + 1], [c[0], c[3] + 1]], hex('#100820'), 0.6); R.recorte(null); return; }   // se apaga un rato
    const per = 7 + h(n, 2, 250) * 6, u = ((t + h(n, 3, 250) * per) % per) / 2.6; if (u > 1) return;   // alguien pasa por detrás
    R.recorte(c); const w2 = c[2] - c[0], x = Math.round(c[0] - 6 * s + u * (w2 + 12 * s)), yb = c[3] + 1, sil = hex('#2a1018'), q = Math.max(1, s);
    a_elipse(R, x, yb - 3 * q, 2.2 * q, 4 * q, sil); R.disco(x + 0.5, yb - 8.5 * q, 1.9 * q, sil);
    if (n % 2 === 0) for (let k = 0; k < 5; k++) R.pset(Math.round(x - 2 * q + k * q), Math.round(yb - 10.5 * q - (k % 2) * q), sil);   // el pelo de loco del científico
    R.recorte(null);
  });
  // el laboratorio de la torre: burbujas verdes que suben por los matraces
  A.torre.forEach((w, n) => { const c = clip(w.caja); R.recorte(c); const lum = w.luz ? P.luzLab[3] : P.cupula[3];
    for (let k = 0; k < 4; k++) { const u = ((t * 0.7 + k * 0.27 + n * 0.13) % 1), x = c[0] + 1 + Math.round(h(k, n, 251) * Math.max(1, c[2] - c[0] - 2)), y = Math.round(c[3] - u * (c[3] - c[1])); R.pset(x, y, lum); if (s > 1.4) R.pset(x + 1, y, lum); }
    R.recorte(null); });
  // el arco de la escalera de Jacob: sube entre las dos varillas y se rompe arriba; chispas
  { const [ax, ay, aw, ah] = A.antena, u = (t * 0.9) % 1, [bx, by] = F(ax, ay), yy = by - u * ah * 0.95, w = 1 + u * aw, col = P.noche || P.tarde ? hex('#e8f4ff') : hex('#b8e0ff');
    let py = yy; for (let x = Math.round(bx - w); x <= Math.round(bx + w); x++) { const ny = Math.round(yy + Math.sin(t * 40 + x * 1.7) * 1.2); R.linea(x - 1, py, x, ny, col); py = ny; }
    if (P.noche) for (let x = Math.round(bx - w); x <= Math.round(bx + w); x += 2) R.pset(x, Math.round(yy) - 1, hex('#8ac8ff'));
    if (u > 0.85) for (let k = 0; k < 5; k++) R.pset(Math.round(bx + (h(k, Math.floor(t * 8), 252) - 0.5) * aw * 3), Math.round(by - ah - h(k, 2, 252) * 6), hex('#fff6a0')); }
  // el humo de la chimenea, en bolas que crecen y se van a la derecha
  { const [cx, cy] = F(A.chimenea[0], A.chimenea[1]), q = Math.max(0.8, s * 0.8), cs = P.noche ? [hex('#3a3a5a'), hex('#5a5878'), hex('#7c7a98')] : [hex('#a8a4b8'), hex('#cac6d6'), hex('#eeeaf4')];
    for (let k = 0; k < 6; k++) { const u = (t * 0.32 + k / 6) % 1, x = cx + u * 26 * q + Math.sin(u * 7 + k) * 2 * q, y = cy - u * 22 * q, r = (1.2 + u * 3.4) * q;
      R.disco(x, y + 0.6, r, cs[0]); R.disco(x - 0.4, y, r * 0.86, cs[1]); R.disco(x - r * 0.35, y - r * 0.35, r * 0.4, cs[2]); } }
  // la veleta: un murciélago de chapa que gira (se estrecha al ponerse de canto)
  { const [vx, vy] = F(A.veleta[0], A.veleta[1]), g = Math.cos(t * 1.3), w = Math.max(0.6, Math.abs(g) * 6 * Math.max(1, s * 0.8)), c = P.metal[0];
    R.linea(vx - w, vy - 1, vx + w, vy - 1, c); R.linea(vx - w, vy - 2, vx - w * 0.5, vy, c); R.linea(vx + w, vy - 2, vx + w * 0.5, vy, c); R.pset(Math.round(vx), Math.round(vy - 2), c); R.pset(Math.round(vx), Math.round(vy), c); }
}

// los adoquines irregulares de un camino (celdas alrededor de puntos movidos al azar), para colorear un trozo de suelo
function a_losas(x, y, sz, k = 0) {
  const gx = Math.floor(x / sz), gy = Math.floor(y / sz); let d1 = 1e9, d2 = 1e9, id = 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const px = (gx + i + 0.15 + h(gx + i, gy + j, 260 + k) * 0.7) * sz, py = (gy + j + 0.15 + h(gx + i, gy + j, 261 + k) * 0.7) * sz, d = Math.hypot(x - px, y - py);
    if (d < d1) { d2 = d1; d1 = d; id = (gx + i) * 31 + gy + j; } else if (d < d2) d2 = d; }
  return { borde: d2 - d1 < 1.3, id, d1 };
}

// seto con forma de tentáculo) o 'puerta' (el porche de cerca: la escalinata, la puerta con su mirilla, los faroles, la
// planta carnívora en su maceta y el felpudo)
function a_fachada(R, t, o, P, luz, clave) {
  const cerca = o.camara === 'puerta', s = cerca ? 2.2 : 1, cx = 160, base = cerca ? 148 : 128, hor = cerca ? 150 : 112;
  const fondo = a_capa(R, clave + ':fondo', false, () => {
    a_cieloFijo(R, P, hor + 10, { astro: cerca ? [40, 10, 9] : P.tarde ? [34, 96, 15] : [34, 44, P.noche ? 11 : 9] });
    if (!cerca) {
      a_colinas(R, P, (x) => 92 + Math.sin(x * 0.021) * 6 + Math.sin(x * 0.053 + 1) * 3, P.noche ? [hex('#141838'), hex('#1c2048'), hex('#262a58'), hex('#343868')] : P.tarde ? [hex('#5a3a6a'), hex('#7a4a7a'), hex('#9a5a82'), hex('#c07a8a')] : [hex('#6a8aa8'), hex('#7c9cb8'), hex('#90b0c8'), hex('#aac8da')], { n: 30, tronco: P.noche ? hex('#101430') : hex('#56708a'), copa: P.noche ? [hex('#101430'), hex('#181c40'), hex('#20244c')] : [hex('#56708a'), hex('#688aa2'), hex('#80a0b6')], pelado: P.noche }, 0);
      a_colinas(R, P, (x) => 106 + Math.sin(x * 0.03 + 2) * 5 + Math.cos(x * 0.011) * 4, P.cesped.map((c) => a_mezcla(c, P.noche ? hex('#141838') : hex('#9ab8d0'), 0.45)), { n: 22, tronco: P.corteza[1], copa: P.cesped.map((c) => a_mezcla(c, hex('#6a8aa8'), P.noche ? 0.2 : 0.35)), pelado: P.noche }, 1);
    }
    // el césped de la colina, con las franjas del cortacésped en diagonal, y el camino de losas hasta la escalinata
    const crest = (x) => (cerca ? 150 : 124) + ((x - 160) / 160) ** 2 * (cerca ? 6 : 12);
    const pc = (y) => 160 + Math.sin((y - base) * 0.07) * (cerca ? 4 : 9), hw = (y) => cerca ? 50 + (y - 166) * 1.2 : 30 + (y - 134) * 0.45;
    for (let x = 0; x < 320; x++) for (let y = Math.round(crest(x)); y < 180; y++) {
      const d = y - crest(x), cam = (cerca ? y > 165 : y > 134) && Math.abs(x - pc(y)) < hw(y);
      if (cam) { const L = a_losas(x, y * 1.6, cerca ? 14 : 9, 0); R.pset(x, y, L.borde ? P.cesped[1] : a_rampa(P.cimiento, 2.3 + (h(L.id, 1, 262) - 0.5) * 0.9 - L.d1 * 0.03 + (h(x, y, 263) - 0.5) * 0.35, x, y)); continue; }
      const banda = Math.floor((x + y * 1.4) / 26) % 2, i = 1.9 + banda * 0.45 - (d < 2 ? -0.6 : 0) + (h(x, y, 264) - 0.5) * 0.7 + (y - 120) * 0.005;
      R.pset(x, y, a_rampa(P.cesped, h(x, y, 265) < 0.06 ? i - 1 : i, x, y));
    }
    // la sombra de la casa sobre el césped
    a_tinte(R, [[60, crest(60)], [262, crest(262)], [250, crest(250) + 6], [70, crest(70) + 6]], hex('#0a0820'), 0.3);
  });
  R.copiar(fondo);
  // el cielo vivo: nubes a tres velocidades y murciélagos (noche) o pájaros (día)
  a_nubes(R, t, P, cerca ? 2 : 12, cerca ? 20 : 66, cerca ? 5 : 8);
  // la casa, con el rebote de dibujo animado si o.rebote
  let A; const casa = a_capa(R, clave + ':casa', true, () => { A = a_casa(R, P, cx, base, s); });
  A = A ?? a_capas.get(clave + ':A'); a_capas.set(clave + ':A', A);
  const reb = o.rebote ?? 0, fase = t * Math.PI * 2 * (o.ritmo ?? 1.1), st = Math.sin(fase), sy = 1 + 0.1 * reb * st, sx = 1 - 0.07 * reb * st, dy = reb * 7 * Math.max(0, Math.sin(fase - 0.6));
  const F = reb ? (x, y) => [cx + (x - cx) * sx, base - dy - (base - y) * sy] : (x, y) => [x, y];
  if (P.noche) a_murcielagos(R, t, F(A.cupula[0], A.cupula[1])[0] + 4, F(A.cupula[0], A.cupula[1])[1] + 6, 3, 18 * s);
  else bandada(R, t, { tipo: 'golondrina', n: 4, y: cerca ? 12 : 30, cada: 12, v: 36 });
  if (reb) { a_sombra(R, cx, base + 2, 112 * sx, 5, 0.25 + 0.15 * (dy / 7)); a_pegarEstirado(R, casa, cx, base, sx, sy, dy, A.caja); }
  else a_pegar(R, casa, Math.max(0, A.caja[1]), Math.min(179, A.caja[3]));
  a_casaViva(R, t, P, A, s, F);
  // el jardín por delante
  const delante = a_capa(R, clave + ':delante', true, () => (cerca ? a_porcheDelante(R, P, A) : a_jardin(R, P)));
  a_pegar(R, delante, cerca ? 120 : 112, 179);
  if (!cerca) a_jardinVivo(R, t, P); else a_porcheVivo(R, t, P, A);
  const [dx0, dy0] = F(A.puerta[0], A.puerta[1]), [dx1, dy1] = F(A.puerta[2], A.puerta[3]);
  if (cerca) { // de cerca, el tejado y la torre quedan detrás de Atom y de la barra del año: ahí, tranquilos y en sombra
    a_calma(R, [12, 0, 182, 17], 0.3, P.noche ? hex('#0a0818') : hex('#3a2a48'), 0.38, 6);
    if ((o.puerta ?? 0) > 0) a_puertaAbierta(R, t, P, [dx0, dy0, dx1, dy1].map(Math.round), Math.round(A.rellano[1]), Math.min(1, o.puerta));
    a_copaCerca(R, t, P);
  }
  return { suelo: cerca ? Math.round(A.rellano[1]) : 170, pies: cerca ? [70, 250] : [40, 280], puerta: [dx0, dy0, dx1, dy1].map(Math.round), rellano: A.rellano.map(Math.round), pie: A.pie.map(Math.round), antena: A.antena.slice(0, 2).map(Math.round), chimenea: A.chimenea.map(Math.round), camino: cerca ? [110, 210, 170] : [125, 195, 156] };
}
// el jardín delante de la fachada (capa fija): arriates de flores al pie de la casa, la reja de hierro con su cancela
// abierta y pilares de piedra, la fuente de piedra de la izquierda, el seto recortado en forma de tentáculo a la derecha,
// la gárgola sobre su pedestal y matas de hierba
function a_jardin(R, P) {
  // arriates al pie de la casa
  for (const [x0, x1] of [[98, 136], [184, 222]]) for (let x = x0; x <= x1; x++) for (let y = 124; y <= 131; y++) {
    const d = Math.abs(y - 128 + Math.sin(x * 0.7) * 1.4); if (d > 3.4) continue;
    const fl = h(x >> 1, y >> 1, 270); R.pset(x, y, fl < 0.18 ? (fl < 0.09 ? P.cono[3] : P.moldura[3]) : a_rampa(P.cesped, 1.5 + (h(x, y, 271) - 0.5) * 1.4 - (y - 124) * 0.08, x, y)); }
  // la reja: barrotes con punta de lanza, dos travesaños, pilares de piedra con bola junto a la cancela abierta
  const yr = 146, alto = 16;
  for (const [x0, x1] of [[0, 112], [210, 319]]) {
    R.rect(x0, yr - alto + 3, x1, yr - alto + 3, P.metal[0]); R.rect(x0, yr - 3, x1, yr - 3, P.metal[0]);
    for (let x = x0 + 2; x <= x1; x += 5) { R.rect(x, yr - alto, x, yr, P.metal[0]); R.pset(x + 1, yr - alto + 4, P.metal[2]); R.pset(x, yr - alto - 1, P.metal[1]); R.pset(x - 1, yr - alto, P.metal[0]); R.pset(x + 1, yr - alto, P.metal[0]); R.pset(x, yr - alto - 2, P.metal[2]);
      if (x % 15 === 2) { R.pset(x - 1, yr - 8, P.metal[0]); R.pset(x + 1, yr - 8, P.metal[0]); R.pset(x, yr - 9, P.metal[0]); R.pset(x, yr - 7, P.metal[0]); } }   // un rizo cada tres barrotes
    a_tinte(R, [[x0, yr + 1], [x1, yr + 1], [x1 + 3, yr + 3], [x0 + 3, yr + 3]], hex('#0a0820'), 0.25);
  }
  for (const px of [114, 202]) { R.rect(px, yr - 22, px + 6, yr + 1, P.cimiento[0]); R.poligono([[px + 1, yr - 21], [px + 6, yr - 21], [px + 6, yr], [px + 1, yr]], (x, y) => a_rampa(P.cimiento, 2.1 - (x - px) * 0.18 + ((y - yr) % 4 === 0 ? -0.8 : 0) + (h(x, y, 272) - 0.5) * 0.5, x, y));
    R.rect(px - 1, yr - 24, px + 7, yr - 22, P.cimiento[2]); R.disco(px + 3, yr - 27, 3, (x, y, d) => a_rampa(P.cimiento, 2.8 - d * 1.5 - (x - px - 3) * 0.2, x, y)); }
  // las hojas de la cancela, abiertas hacia dentro (en escorzo)
  for (const [px, sd] of [[120, 1], [201, -1]]) for (let k = 0; k <= 4; k++) { const x = px + sd * k * 2; R.linea(x, yr - 15 + k, x, yr - 1 + Math.round(k * 0.5), P.metal[0]); if (k < 4) { R.linea(x, yr - 13 + k, x + sd * 2, yr - 13 + k + 1, P.metal[0]); R.linea(x, yr - 4 + Math.round(k * 0.5), x + sd * 2, yr - 4 + Math.round((k + 1) * 0.5), P.metal[0]); } }
  // la fuente de piedra: pilón, fuste y taza; el lodo verde lo pinta la parte viva
  { const fx = 44, fb = 168;
    a_sombra(R, fx + 3, fb + 1, 26, 4, 0.3);
    a_elipse(R, fx, fb - 4, 24, 7, (x, y, d) => a_rampa(P.cimiento, 2.5 - d * 0.6 - (x - fx) * 0.03 + (h(x, y, 273) - 0.5) * 0.5, x, y));
    R.poligono([[fx - 24, fb - 4], [fx + 24, fb - 4], [fx + 23, fb + 1], [fx - 23, fb + 1]], (x, y) => a_rampa(P.cimiento, 1.6 - (x - fx) * 0.025 + ((x + 2) % 7 === 0 ? -0.7 : 0) + (h(x, y, 274) - 0.5) * 0.5, x, y));
    a_elipse(R, fx, fb - 5, 20, 5, (x, y, d) => a_rampa(P.noche ? [hex('#2a6a1a'), hex('#4aa82a'), hex('#7ad83a'), hex('#c8f878')] : [hex('#3e8a2a'), hex('#5ac03a'), hex('#8ae04a'), hex('#d8fa90')], 1.6 + (1 - d) * 0.9 + (((x + y * 2) % 9) < 2 ? 0.9 : 0), x, y));
    R.poligono([[fx - 3, fb - 22], [fx + 3, fb - 22], [fx + 4, fb - 5], [fx - 4, fb - 5]], (x, y) => a_rampa(P.cimiento, 2.2 - (x - fx) * 0.25 + ((y % 5) === 0 ? -0.6 : 0), x, y));
    a_elipse(R, fx, fb - 24, 11, 3.2, (x, y, d) => a_rampa(P.cimiento, 2.6 - d - (x - fx) * 0.05, x, y));
    R.poligono([[fx - 11, fb - 24], [fx + 11, fb - 24], [fx + 7, fb - 20], [fx - 7, fb - 20]], (x, y) => a_rampa(P.cimiento, 1.7 - (x - fx) * 0.08, x, y));
    // la rana de piedra que escupe (encima de la taza)
    a_elipse(R, fx, fb - 29, 4.5, 3.5, (x, y, d) => a_rampa(P.cupula, 2.4 - d - (x - fx) * 0.15, x, y)); R.disco(fx - 2, fb - 32, 1.6, P.cupula[2]); R.disco(fx + 2, fb - 32, 1.6, P.cupula[2]); R.pset(fx - 2, fb - 32, hex('#101010')); R.pset(fx + 2, fb - 32, hex('#101010'));
    R.rect(fx - 2, fb - 28, fx + 2, fb - 28, P.cupula[0]);
  }
  // el seto recortado en forma de tentáculo (con su base de ventosa y dos ojos de piedras blancas)
  { const tx = 272, tb = 168;
    a_sombra(R, tx + 4, tb + 1, 18, 3.5, 0.3);
    for (let v = 0; v < 44; v++) { const w = v < 4 ? 13 - v * 0.6 : 10.6 - (v - 4) * 0.08, wt = v > 36 ? w * Math.sqrt(Math.max(0, 1 - ((v - 36) / 8) ** 2)) : w, off = Math.sin(v * 0.09) * 4;
      for (let x = Math.round(tx + off - wt); x <= Math.round(tx + off + wt); x++) { const n = (x - tx - off) / Math.max(1, wt), y = tb - v; R.pset(x, y, a_rampa(P.cesped, 1.6 + 0.6 - n * n * 1.3 - n * 0.5 + (h(x >> 1, y >> 1, 275) - 0.5) * 1.3 + (Math.abs(n) > 0.9 ? -0.7 : 0), x, y)); } }
    for (const dx of [-4, 4]) { R.disco(tx + 3 + dx, tb - 35, 2.8, P.moldura[3]); R.disco(tx + 3 + dx + 1, tb - 34.5, 1.3, hex('#1a1420')); }
    R.rect(tx + 1, tb - 28, tx + 6, tb - 28, P.cesped[0]);
    for (let k = 0; k < 3; k++) R.disco(tx + 7, tb - 10 - k * 6, 1.5, P.cesped[3]);   // ventosas del seto
    // tijeras de podar olvidadas apoyadas
    R.linea(tx - 16, tb, tx - 12, tb - 9, P.metal[2]); R.linea(tx - 14, tb, tx - 12, tb - 9, P.metal[1]); R.disco(tx - 16, tb, 1.2, P.cono[1]); R.disco(tx - 14, tb + 1, 1.2, P.cono[1]);
  }
  // la gárgola de piedra en su pedestal, junto a la reja de la derecha (detrás de ella)
  { const gx = 240, gb = 142; R.rect(gx - 5, gb - 12, gx + 5, gb, P.cimiento[1]); R.rect(gx - 4, gb - 12, gx + 4, gb, P.cimiento[2]); R.rect(gx - 6, gb - 14, gx + 6, gb - 12, P.cimiento[3]);
    a_elipse(R, gx, gb - 19, 5, 5, (x, y, d) => a_rampa(P.piedra, 2.5 - d - (x - gx) * 0.12, x, y)); R.disco(gx, gb - 25, 3.2, P.piedra[2]); R.pset(gx - 3, gb - 28, P.piedra[1]); R.pset(gx + 3, gb - 28, P.piedra[1]); R.pset(gx - 1, gb - 25, hex('#f8d040')); R.pset(gx + 1, gb - 25, hex('#f8d040'));
    for (const sd of [-1, 1]) R.poligono([[gx + sd * 3, gb - 22], [gx + sd * 10, gb - 27], [gx + sd * 8, gb - 19]], P.piedra[1]); }
  // un buzón torcido junto al camino
  { const bx = 96, bb = 172; R.rect(bx, bb - 15, bx + 1, bb, P.corteza[2]); R.rect(bx - 5, bb - 21, bx + 6, bb - 15, P.contra[0]); R.rect(bx - 4, bb - 20, bx + 5, bb - 16, P.contra[2]); R.rect(bx - 4, bb - 20, bx + 5, bb - 20, P.contra[3]); R.rect(bx + 6, bb - 22, bx + 6, bb - 18, P.cono[2]); R.rect(bx + 6, bb - 22, bx + 8, bb - 22, P.cono[2]); a_sombra(R, bx + 2, bb + 1, 6, 1.5, 0.3); }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 276) * 320), y = 150 + Math.round(h(k, 2, 276) * 26); if (Math.abs(x - 160) < 40 && y > 150) continue; a_mata(R, x, y, 0, 4 + h(k, 3, 276) * 3, P.cesped, k); }
}

// la parte viva del jardín: el chorro de lodo de la rana, el lodo de la taza que burbujea, luciérnagas o mariposas,
// la hierba del borde que se mece
function a_jardinVivo(R, t, P) {
  const fx = 44, fb = 168, L = [hex('#4aa82a'), hex('#7ad83a'), hex('#c8f878')];
  for (let k = 0; k < 12; k++) { const u = ((t * 1.4 + k / 12) % 1), x = fx + 2 + u * 13, y = fb - 30 - Math.sin(u * Math.PI) * 9 + u * 18; R.pset(Math.round(x), Math.round(y), L[k % 3]); R.pset(Math.round(x), Math.round(y) + 1, L[0]); }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.8 + k / 3) % 1), x = fx - 12 + k * 11, y = fb - 5; if (u < 0.7) R.disco(x, y - u * 2, 0.8 + u * 1.6, L[2]); else R.pset(x, y - 2, L[1]); }
  if (P.noche || P.tarde) for (let k = 0; k < 9; k++) { const x = Math.round((h(k, 1, 277) * 300 + Math.sin(t * 0.7 + k) * 14) % 320), y = Math.round(120 + h(k, 2, 277) * 40 + Math.sin(t * 1.1 + k * 2) * 5); if (Math.sin(t * 3 + k * 1.7) > 0) { R.pset(x, y, hex('#e8ff8a')); R.pset(x + 1, y, hex('#8ac83a')); } }
  else for (let k = 0; k < 3; k++) { const x = Math.round(60 + k * 90 + Math.sin(t * 0.8 + k) * 20), y = Math.round(140 + Math.sin(t * 1.7 + k * 2) * 8), a = Math.floor(t * 8 + k) % 2, c = [P.cono[3], P.moldura[3], P.contra[3]][k]; R.pset(x, y, hex('#2a2030')); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); }
  for (let k = 0; k < 22; k++) { const x = Math.round(k * 15 + h(k, 1, 278) * 8); if (x > 120 && x < 200) continue; a_mata(R, x, 181, t, 5 + h(k, 2, 278) * 4, P.cesped, k); }
}

// por delante del porche de cerca (capa fija): los dos faroles de pared, la maceta con la planta carnívora, el felpudo
// con un tentáculo en pictograma, dos botellas de leche, la aldaba de la puerta y los arbustos de hortensias
function a_porcheDelante(R, P, A) {
  const [, ry, ] = A.rellano, dx0 = A.puerta[0], dx1 = A.puerta[2], dc = (dx0 + dx1) / 2;
  // el felpudo con un tentáculo en pictograma
  R.poligono([[dc - 22, ry - 1], [dc + 22, ry - 1], [dc + 25, ry + 3], [dc - 25, ry + 3]], (x, y) => a_rampa(P.tierra, 2.2 + ((x + y) % 3 === 0 ? -0.6 : 0) + (h(x, y, 280) - 0.5) * 0.5, x, y));
  for (let v = 0; v < 3; v++) R.rect(Math.round(dc - 2 + v * 0.5), ry - 1 + v, Math.round(dc + 2 - v * 0.3), ry - 1 + v, P.cono[1]);
  // la aldaba: una argolla que cuelga de una cara de león de bronce
  R.disco(dc, A.puerta[1] + 12, 3, P.moldura[1]); R.disco(dc, A.puerta[1] + 12, 2, P.moldura[2]); R.pset(dc - 1, A.puerta[1] + 11, hex('#1a1010')); R.pset(dc + 1, A.puerta[1] + 11, hex('#1a1010'));
  for (let a = 0; a < 16; a++) { const an = a / 16 * Math.PI * 2; R.pset(Math.round(dc + Math.cos(an) * 3), Math.round(A.puerta[1] + 18 + Math.sin(an) * 3), a < 8 ? P.moldura[1] : P.moldura[2]); }
  // la maceta con la planta carnívora (la boca se abre y se cierra en la parte viva) y dos botellas de leche
  const mx = dx0 - 46;
  R.poligono([[mx - 9, ry - 14], [mx + 9, ry - 14], [mx + 7, ry], [mx - 7, ry]], (x, y) => a_rampa(P.ladrillo, 2.2 - (x - mx) * 0.1 + ((y - ry) % 5 === 0 ? -0.6 : 0), x, y)); R.rect(mx - 10, ry - 16, mx + 10, ry - 14, P.ladrillo[3]);
  a_sombra(R, mx + 3, ry + 1, 11, 2, 0.35);
  for (const [bx, k] of [[dx1 + 12, 0], [dx1 + 17, 1]]) { R.rect(bx - 2, ry - 8, bx + 2, ry, hex('#f2f0e8')); R.rect(bx - 1, ry - 10, bx + 1, ry - 9, hex('#f2f0e8')); R.rect(bx - 1, ry - 11, bx + 1, ry - 11, k ? P.cono[2] : P.contra[2]); R.rect(bx + 1, ry - 7, bx + 1, ry - 2, hex('#c8c6c0')); R.pset(bx - 1, ry - 6, hex('#ffffff')); }
  // los faroles de pared, a los lados de la puerta
  for (const lx of [dx0 - 22, dx1 + 22]) { const ly = A.puerta[1] - 2; R.rect(lx - 1, ly + 10, lx + 1, ly + 14, P.metal[0]); R.rect(lx - 5, ly + 9, lx + 5, ly + 10, P.metal[0]);
    R.poligono([[lx - 5, ly - 3], [lx + 5, ly - 3], [lx + 4, ly + 9], [lx - 4, ly + 9]], P.metal[0]); R.poligono([[lx - 6, ly - 3], [lx + 6, ly - 3], [lx, ly - 9]], P.metal[1]); R.pset(lx, ly - 10, P.metal[2]); }
  // arbustos de hortensias a los lados de la escalinata
  for (const [bx, k] of [[A.pie[0] - 24, 0], [A.pie[2] + 24, 1]]) { const by = A.pie[1] + 2;
    for (let j = 0; j < 16; j++) { const ax = bx + (h(j, 1, 281 + k) - 0.5) * 44, ay = by - 6 - h(j, 2, 281 + k) * 22, r = 5 + h(j, 3, 281 + k) * 4;
      R.disco(ax, ay, r, (x, y, d) => a_rampa(P.cesped, 2.2 - d * 1.3 - (x - bx) * 0.02 + (h(x, y, 283) - 0.5) * 0.9, x, y)); }
    for (let j = 0; j < 7; j++) { const ax = bx + (h(j, 4, 281 + k) - 0.5) * 38, ay = by - 12 - h(j, 5, 281 + k) * 16, c = k ? [hex('#4a4aa8'), hex('#7a7ad8'), hex('#b8b8f8')] : [hex('#a83a7a'), hex('#d86aa8'), hex('#f8a8d0')];
      R.disco(ax, ay, 3.2, c[0]); for (let q = 0; q < 6; q++) R.pset(Math.round(ax - 2 + h(q, j, 284) * 4), Math.round(ay - 2 + h(q, j, 285) * 3), c[1 + (q % 2)]); }
  }
}

// la parte viva del porche: la llama de los faroles (y las polillas de noche), la mirilla que se abre y deja ver un ojo,
// la planta carnívora que abre y cierra la boca
function a_porcheVivo(R, t, P, A) {
  const [, ry] = A.rellano, dx0 = A.puerta[0], dx1 = A.puerta[2], dc = (dx0 + dx1) / 2;
  for (const [lx, k] of [[dx0 - 22, 0], [dx1 + 22, 1]]) { const ly = A.puerta[1] - 2, f = Math.sin(t * 9 + k * 2) > 0;
    R.rect(lx - 3, ly - 1, lx + 3, ly + 7, P.noche ? hex('#f8c848') : hex('#e8d8a0')); R.rect(lx - 1, ly + 1 + (f ? 0 : 1), lx + 1, ly + 5, P.noche ? hex('#fff8c8') : hex('#f8f0d0')); R.rect(lx, ly - 3, lx, ly + 9, P.metal[0]);
    if (P.noche) for (let m = 0; m < 2; m++) { const a = t * 3.1 + m * 2 + k, x = Math.round(lx + Math.cos(a) * 7), y = Math.round(ly + 3 + Math.sin(a * 1.7) * 6); R.pset(x, y, hex('#d8d0b8')); R.pset(x + (Math.floor(t * 12) % 2 ? 1 : -1), y, hex('#a8a090')); } }
  // la mirilla: cada siete segundos se abre la tapa y mira un ojo
  { const mx = dc, my = A.puerta[1] + 6, u = (t % 7) / 7, abierta = u > 0.55 && u < 0.85; R.disco(mx, my, 2.6, P.moldura[1]); R.disco(mx, my, 1.8, abierta ? hex('#f8f4e8') : P.moldura[2]);
    if (abierta) { const mira = Math.round(Math.sin(t * 2) * 1); R.pset(mx + mira, my, hex('#1a1010')); R.pset(mx + mira, my - 1, hex('#1a1010')); } }
  // la planta carnívora
  { const mx = dx0 - 46, by = ry - 16, ab = (Math.sin(t * 2.2) + 1) / 2 > 0.75 ? 1 : 0, sw = Math.sin(t * 1.3) * 2;
    R.linea(mx, by, mx + sw, by - 12, P.cesped[1]); R.linea(mx + 1, by, mx + 1 + sw, by - 12, P.cesped[2]);
    for (const sd of [-1, 1]) R.poligono([[mx, by - 3], [mx + sd * 7, by - 7], [mx + sd * 3, by - 3]], P.cesped[2]);
    const hx = mx + sw, hy = by - 14, a = ab ? 4 : 1;
    R.poligono([[hx - 7, hy], [hx + 7, hy], [hx + 5, hy - 5], [hx - 5, hy - 5]], P.cono[2]); R.poligono([[hx - 7, hy + 1], [hx + 7, hy + 1], [hx + 5, hy + 1 + a + 3], [hx - 5, hy + 1 + a + 3]], P.cono[1]);
    if (ab) { R.rect(hx - 6, hy + 1, hx + 6, hy + a, hex('#3a0a18')); for (let i = -5; i <= 5; i += 2) { R.pset(hx + i, hy + 1, hex('#fff8e8')); R.pset(hx + i + 1, hy + a, hex('#fff8e8')); } }
    R.pset(hx - 3, hy - 3, P.cono[3]); R.pset(hx + 2, hy - 4, P.cono[3]); }
}

// los tonos del lodo (da luz: no se tiñe de noche) y los del lodo apagado de día
const a_lodo = (P) => (P.noche ? ['#123e14', '#2a7a22', '#52c02e', '#a8f05a', '#eaffb8'] : P.tarde ? ['#2e5a1a', '#4a9a2a', '#7ad03a', '#c0f070', '#f4ffd0'] : ['#2a6a1e', '#3e9a2a', '#68c838', '#a8e868', '#e8ffc0']).map((c) => hex(c));

// el lodo vivo entre yt(x) y yb(x): corrientes que van a la derecha, rizos de luz, el filo de espuma, el reflejo de la
// luna (lx) y de las ventanas, y las burbujas que crecen y revientan con su anillo y sus gotas. q: escala (1 lejos, 2 cerca)
function a_rio(R, t, P, yt, yb, q = 1, o = {}) {
  const L = a_lodo(P), v = 12 * q, B = R.buf;
  for (let x = 0; x < 320; x++) { const a = Math.round(yt(x)), b = Math.round(yb(x));
    for (let y = Math.max(0, a); y <= Math.min(179, b); y++) {
      const f = (y - a) / Math.max(1, b - a), u = x - t * v * (0.6 + f * 0.6);
      const on = Math.sin(u * 0.11 / q + y * 0.7 / q + Math.sin(u * 0.03 / q + y * 0.2) * 2.2) * 0.5 + Math.sin(u * 0.045 / q - y * 0.35 / q + t * 0.8) * 0.5;
      let i = 1.15 + (0.5 - Math.abs(f - 0.35)) * 0.8 + on * 0.5 + (P.noche ? 0 : 0.25);
      if (on > 0.72) i += 1.35; else if (on > 0.55) i += 0.6; else if (on < -0.6) i -= 0.55;
      if (Math.sin(u * 0.02 / q + y * 0.15 / q + t * 0.3) > 0.93) i -= 0.7;
      if (y === a || y === a + 1) i -= 1.2;   // la orilla de enfrente echa sombra
      if (y >= b - 1 - Math.round(q)) i += Math.sin(x * 0.5 / q + t * 4) > 0 ? 1.6 : 0.6;   // el filo de espuma que lame la orilla
      if (o.luna != null && Math.abs(x - o.luna + Math.sin(y * 0.9 + t * 3) * 2 * q) < 2.5 * q && (y + Math.floor(t * 6)) % 3 !== 0) i += 1.4;
      if (o.reflejos) for (const rx of o.reflejos) if (Math.abs(x - rx + Math.sin(y * 1.3 + t * 4) * q) < 1.2 * q && f < 0.6 && (y & 1)) { B[y * 320 + x] = hex('#f8d860'); i = -9; }
      if (i > -5) B[y * 320 + x] = a_rampa(L, i, x, y);
    } }
  // las burbujas: crecen, revientan y dejan un anillo y dos gotas
  const nb = o.burbujas ?? Math.round(14 * q);
  for (let k = 0; k < nb; k++) { const per = 1.6 + h(k, 1, 300) * 1.8, ph = ((t + h(k, 2, 300) * per) % per) / per, x0 = h(k, 3, 300) * 340 - 10, x = ((x0 + Math.floor((t + h(k, 2, 300) * per) / per) * 37) % 330) - 5;
    const a = yt(x), b = yb(x), y = a + 2 + h(k, 4, 300) * Math.max(1, b - a - 5), r = (1.2 + h(k, 5, 300) * 2.2) * q;
    if (ph < 0.8) { const rr = r * (ph / 0.8); if (rr < 0.6) continue; R.disco(x, y - rr * 0.6, rr + 0.5, L[1]); R.disco(x, y - rr * 0.6, rr, (px, py, d) => a_rampa(L, 2.8 - d * 1.2, px, py)); R.pset(Math.round(x - rr * 0.4), Math.round(y - rr * 1.1), L[4]); }
    else { const u = (ph - 0.8) / 0.2, rr = r * (1 + u * 1.6); for (let n = 0; n < 12; n++) { const an = n / 12 * Math.PI * 2; R.pset(Math.round(x + Math.cos(an) * rr), Math.round(y + Math.sin(an) * rr * 0.4), L[3]); }
      for (const sd of [-1, 1]) R.pset(Math.round(x + sd * (1 + u * 3) * q), Math.round(y - r - Math.sin(u * Math.PI) * 4 * q), L[4]); } }
}

// los vapores verdes que suben del lodo (bolas tramadas que se deshacen)
function a_vapores(R, t, P, yt, n, q = 1) {
  const c = P.noche ? hex('#6ad84a') : hex('#c8f0a8');
  for (let k = 0; k < n; k++) { const per = 3 + h(k, 1, 310) * 2, u = ((t + h(k, 2, 310) * per) % per) / per, x = h(k, 3, 310) * 320 + Math.sin(u * 5 + k) * 4 * q + u * 8 * q, y = yt(x) - u * 22 * q, r = (1 + u * 3.5) * q;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const px = Math.round(x + i), py = Math.round(y + j); if (a_bay4(px, py) < 0.4 * (1 - u)) R.pset(px, py, a_mezcla(R.pget(px, py), c, 0.5)); } }
}

// el cartel de peligro: un poste de madera con una placa triangular amarilla y una calavera en pictograma (sin letras),
// un poco torcido; (x, suelo) pie del poste; q escala
function a_cartel(R, P, x, suelo, q = 1) {
  const alto = 34 * q, px = (v) => x + v * 0.08 * q;
  for (let v = 0; v < alto; v++) R.rect(Math.round(px(v) - 1.5 * q), Math.round(suelo - v), Math.round(px(v) + 1.5 * q), Math.round(suelo - v), a_rampa(P.corteza, 2.2 + (h(0, Math.floor(v / 3), 320) - 0.5) * 0.8, x, suelo - v));
  for (let v = 0; v < alto; v++) R.pset(Math.round(px(v) + 1.5 * q), Math.round(suelo - v), P.corteza[0]);
  const cx = px(alto) , cy = suelo - alto + 3 * q, w = 13 * q;
  const tri = [[cx - w, cy + 10 * q], [cx + w, cy + 8 * q], [cx + 1 * q, cy - 13 * q]];
  R.poligono(tri.map(([a, b]) => [a + 1, b + 2]), hex('#120a14'));
  R.poligono([[cx - w - 1.5, cy + 10.8 * q], [cx + w + 1.5, cy + 8.8 * q], [cx + 1 * q, cy - 14.6 * q]], hex('#1a1410'));
  R.poligono(tri, (x2, y2) => { const d = Math.hypot(x2 - cx, y2 - cy); return a_rampa(P.noche ? [hex('#6a5a10'), hex('#a8901e'), hex('#d8c030'), hex('#f8e870')] : [hex('#a88010'), hex('#d8b020'), hex('#f8d838'), hex('#fff8a0')], 2.5 - d * 0.03 / q - (x2 - cx) * 0.02 / q + (h(x2, y2, 321) < 0.06 ? -1.2 : 0), x2, y2); });
  // la calavera: cráneo, cuencas, nariz, dientes y dos tibias cruzadas
  const sx = cx, sy = cy + 0.5 * q, K = hex('#1a1410');
  R.disco(sx, sy - 2 * q, 4.2 * q, K); R.rect(Math.round(sx - 2.6 * q), Math.round(sy), Math.round(sx + 2.6 * q), Math.round(sy + 3 * q), K);
  R.disco(sx - 1.7 * q, sy - 1.6 * q, 1.2 * q, hex('#f8e870')); R.disco(sx + 1.7 * q, sy - 1.6 * q, 1.2 * q, hex('#f8e870')); R.pset(Math.round(sx), Math.round(sy + 0.6 * q), hex('#f8e870'));
  for (let i = -2; i <= 2; i += 2) R.pset(Math.round(sx + i * q * 0.8), Math.round(sy + 2.4 * q), hex('#f8e870'));
  for (const sd of [-1, 1]) { R.linea(sx - 6 * q, sy + 5 * q * sd + 1.5 * q, sx + 6 * q, sy - 5 * q * sd + 1.5 * q, K); R.linea(sx - 6 * q, sy + 5 * q * sd + 2.5 * q, sx + 6 * q, sy - 5 * q * sd + 2.5 * q, K); }
  // dos clavos y una mancha de óxido
  R.pset(Math.round(cx), Math.round(cy - 8 * q), P.metal[3]); R.pset(Math.round(cx - 7 * q), Math.round(cy + 7 * q), hex('#8a4a1a')); R.pset(Math.round(cx - 6 * q), Math.round(cy + 8 * q), hex('#8a4a1a'));
  return [Math.round(cx), Math.round(cy)];
}

// un árbol pelado y retorcido de dibujo animado (ramas que se enroscan), con un búho que parpadea en la rama de (bx, by)
function a_arbolTorcido(R, P, x, suelo, alto, dir = -1, q = 1) {
  const C2 = P.corteza, rama = (x0, y0, ang, L, gr, n) => { let px = x0, py = y0, a = ang; for (let k = 0; k < L; k++) { a += Math.sin(k * 0.35 + n) * 0.09; const nx = px + Math.cos(a), ny = py + Math.sin(a), g = gr * (1 - k / L * 0.7);
      R.disco(nx, ny, g + 0.6, C2[0]); R.disco(nx - 0.3, ny, g, (xx, yy) => a_rampa(C2, 2 - (xx - nx) / Math.max(1, g) * 0.8 + (h(xx, yy >> 1, 330) - 0.5) * 0.7, xx, yy)); px = nx; py = ny;
      if (n < 3 && k > L * 0.4 && k % Math.round(L / 3) === 0) rama(px, py, a + (k % 2 ? 0.8 : -0.9) * (n % 2 ? 1 : -1), L * 0.45, g * 0.6, n + 1); }
    if (n === 0) return [px, py]; };
  return rama(x, suelo, -Math.PI / 2 + dir * 0.12, alto, 3.2 * q, 0);
}

// la máquina del laboratorio que vierte el lodo: un depósito de cobre remachado, un tanque de cristal con lodo que
// burbujea, manómetros, una rueda dentada, la chimenea que humea y el tubo que acaba sobre el río (la parte fija)
function a_maquina(R, P, x0, suelo, salida) {
  const Cu = P.ladrillo.map((c) => a_mezcla(c, hex('#d08a3a'), 0.45)), M = P.metal;
  // la caseta de ladrillo de detrás con su tejadillo
  R.poligono([[x0 - 4, suelo], [x0 + 70, suelo], [x0 + 70, suelo - 46], [x0 - 4, suelo - 46]], (x, y) => a_rampa(P.ladrillo, 1.4 + (h(x >> 2, y >> 1, 340) - 0.5) * 0.6 + (((y + ((x / 5 | 0) % 2) * 1) % 3) === 0 || (x + (((y / 3) | 0) % 2) * 3) % 6 === 0 ? -0.9 : 0) - (x - x0) * 0.004, x, y));
  R.poligono([[x0 - 8, suelo - 45], [x0 + 74, suelo - 45], [x0 + 64, suelo - 56], [x0 + 2, suelo - 56]], (x, y) => a_rampa(P.tejado, 1.8 + ((y % 3) === 0 ? -0.9 : 0) + (h(x >> 2, y, 341) - 0.5) * 0.6, x, y));
  // la chimenea alta de la máquina
  R.poligono([[x0 + 8, suelo - 50], [x0 + 15, suelo - 50], [x0 + 14, suelo - 66], [x0 + 9, suelo - 66]], (x, y) => a_rampa(Cu, 2 - (x - x0 - 8) * 0.25 + ((y % 6) === 0 ? -0.8 : 0), x, y)); R.rect(x0 + 7, suelo - 68, x0 + 16, suelo - 66, Cu[3]);
  // el depósito de cobre (cilindro tumbado) con remaches
  a_elipse(R, x0 + 22, suelo - 20, 20, 15, (x, y, d) => { const ny = (y - (suelo - 20)) / 15; let i = 2.2 - ny * 0.9 - d * 0.4; if (Math.abs(((x - x0) % 9) - 4) < 0.6) i -= 0.9; if (Math.abs(((x - x0) % 9) - 4) < 0.6 === false && (x - x0) % 9 === 6 && (y % 4) === 0) i += 1.3; return a_rampa(Cu, i, x, y); });
  for (const lx of [x0 + 8, x0 + 32]) { R.rect(lx, suelo - 7, lx + 4, suelo, M[0]); R.rect(lx + 1, suelo - 7, lx + 3, suelo - 1, M[1]); R.rect(lx - 1, suelo - 1, lx + 5, suelo, M[0]); }   // las patas
  R.rect(x0 + 18, suelo - 38, x0 + 26, suelo - 34, Cu[0]); R.rect(x0 + 19, suelo - 37, x0 + 25, suelo - 35, Cu[2]); R.disco(x0 + 22, suelo - 40, 2.5, M[0]); R.disco(x0 + 22, suelo - 40, 1.5, M[2]);   // la escotilla con su volante
  for (let k = 0; k < 4; k++) { const gx = x0 + 10 + k * 8, gy = suelo - 31 + (k % 2) * 3; R.disco(gx, gy, 3, M[0]); R.disco(gx, gy, 2.2, hex('#f2eee2')); R.pset(gx, gy, M[0]); }
  // el tanque de cristal con el lodo dentro
  R.rect(x0 + 44, suelo - 40, x0 + 62, suelo - 4, M[0]); R.rect(x0 + 45, suelo - 39, x0 + 61, suelo - 5, a_lodo(P)[1]);
  R.rect(x0 + 45, suelo - 39, x0 + 61, suelo - 33, a_mezcla(P.cristal[2], a_lodo(P)[0], 0.4));
  R.rect(x0 + 42, suelo - 42, x0 + 64, suelo - 40, M[2]); R.rect(x0 + 42, suelo - 4, x0 + 64, suelo - 2, M[1]);
  R.rect(x0 + 47, suelo - 38, x0 + 47, suelo - 8, hex('#e8fff0'));
  // el tubo que sale del tanque y acaba sobre el río (con su brida)
  const [sx, sy] = salida;
  for (let x = x0 + 62; x <= sx; x++) { const y = sy - 3 + Math.round(Math.max(0, x0 + 70 - x) * 0); for (let j = -3; j <= 3; j++) R.pset(x, y + j, a_rampa(M, 2.2 - j * 0.45 - (j === -3 || j === 3 ? 1 : 0), x, y + j)); if ((x - x0) % 9 === 0) R.rect(x, y - 4, x + 1, y + 4, M[2]); }
  R.rect(sx - 1, sy - 6, sx + 1, sy + 2, M[3]); R.rect(sx + 1, sy - 6, sx + 1, sy + 2, M[1]);
  // la rueda dentada (estática aquí; el brillo que gira va en la parte viva)
  R.disco(x0 + 30, suelo - 44, 8, M[0]); R.disco(x0 + 30, suelo - 44, 6.6, M[2]); R.disco(x0 + 30, suelo - 44, 2, M[0]);
}

function a_maquinaViva(R, t, P, x0, suelo, salida, q = 1) {
  const L = a_lodo(P), M = P.metal;
  // la rueda gira: sus dientes y radios
  for (let k = 0; k < 10; k++) { const an = t * 1.6 + k * Math.PI / 5; R.rect(Math.round(x0 + 30 + Math.cos(an) * 8.4), Math.round(suelo - 44 + Math.sin(an) * 8.4), Math.round(x0 + 30 + Math.cos(an) * 8.4) + 1, Math.round(suelo - 44 + Math.sin(an) * 8.4) + 1, M[1]); }
  for (let k = 0; k < 3; k++) { const an = t * 1.6 + k * Math.PI * 2 / 3; R.linea(x0 + 30, suelo - 44, x0 + 30 + Math.cos(an) * 6, suelo - 44 + Math.sin(an) * 6, M[0]); }
  // las agujas de los manómetros tiemblan; los pilotos parpadean
  for (let k = 0; k < 4; k++) { const gx = x0 + 10 + k * 8, gy = suelo - 31 + (k % 2) * 3, an = -2.4 + Math.sin(t * (2 + k) + k) * 0.5 + k * 0.6; R.linea(gx, gy, gx + Math.cos(an) * 2, gy + Math.sin(an) * 2, hex('#c82a2a')); }
  for (let k = 0; k < 3; k++) R.pset(x0 + 50 + k * 4, suelo - 44, Math.sin(t * 4 + k * 2) > 0 ? [hex('#ff4a3a'), hex('#4aff6a'), hex('#ffd84a')][k] : M[0]);
  // las burbujas del tanque de cristal
  for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1, x = x0 + 48 + Math.round(h(k, 1, 342) * 12 + Math.sin(t * 3 + k) * 1), y = Math.round(suelo - 6 - u * 26); R.pset(x, y, L[4]); if (k % 2) R.pset(x + 1, y, L[3]); }
  // el humo de la chimenea de la máquina
  for (let k = 0; k < 5; k++) { const u = (t * 0.35 + k / 5) % 1, x = x0 + 12 + u * 26, y = suelo - 70 - u * 9, r = 1.5 + u * 4, cs = P.noche ? [hex('#2e3a2e'), hex('#4a5a46'), hex('#6a7e62')] : [hex('#9ab08a'), hex('#c0d4ac'), hex('#e4f0d4')];
    R.disco(x, y + 0.6, r, cs[0]); R.disco(x - 0.4, y, r * 0.85, cs[1]); R.disco(x - r * 0.3, y - r * 0.3, r * 0.4, cs[2]); }
  // el chorro de lodo que cae del tubo, con salpicaduras abajo
  const [sx, sy] = salida, cae = 9 * q;
  for (let j = 0; j < cae; j++) for (let i = -2; i <= 2; i++) { const x = sx + 2 + i + Math.round(j * 0.15), y = sy - 2 + j; R.pset(x, y, a_rampa(L, 2.2 + Math.sin(y * 1.3 - t * 14 + i) * 0.9 - Math.abs(i) * 0.4, x, y)); }
  for (let k = 0; k < 5; k++) { const u = (t * 2.2 + k / 5) % 1, an = -Math.PI / 2 + (k - 2) * 0.5; R.pset(Math.round(sx + 3 + Math.cos(an) * u * 7 * q), Math.round(sy + cae - 2 + Math.sin(an) * u * 6 * q + u * u * 7 * q), L[3 + (k % 2)]); }
}

// 'cerca' (a ras de suelo: la pared del laboratorio con el tubo, la orilla y el lodo en primer término)
function a_orilla(R, t, o, P, clave) {
  const cerca = o.camara === 'cerca', L = a_lodo(P);
  if (!cerca) {
    const yt = (x) => 106 + x * 0.03 + 2 * Math.sin(x * 0.045), yb = (x) => 117 + x * 0.085 + 3 * Math.sin(x * 0.03 + 1), salida = [74, 106], luna = 118;
    let A;
    const fondo = a_capa(R, clave + ':fondo', false, () => {
      a_cieloFijo(R, P, 104, { astro: P.noche ? [luna, 32, 10] : P.tarde ? [150, 92, 15] : [118, 30, 9] });
      a_colinas(R, P, (x) => 84 + Math.sin(x * 0.02 + 1) * 5 + Math.sin(x * 0.06) * 2, P.noche ? [hex('#121634'), hex('#1a1e44'), hex('#22264e'), hex('#30345e')] : P.tarde ? [hex('#4a2e5a'), hex('#6a3a6a'), hex('#8a4a76'), hex('#b06a80')] : [hex('#5e7e9e'), hex('#7090ae'), hex('#84a4c0'), hex('#a0c0d6')], { n: 26, tronco: P.noche ? hex('#0e1230') : hex('#56708a'), copa: [hex('#4e6a86'), hex('#5e7a96'), hex('#7090a8')], pelado: P.noche || P.tarde }, 2);
      A = a_casa(R, P, 206, 100, 0.52, { detras: true });
      // la orilla de enfrente: hierba seca hasta el agua
      a_colinas(R, P, (x) => 97 + Math.sin(x * 0.05) * 1.5, P.seco, null, 3);
      for (let x = 0; x < 320; x++) for (let y = 97; y < Math.round(yt(x)); y++) R.pset(x, y, a_rampa(P.seco, 1.6 + (h(x, y, 343) - 0.5) * 1.2 + ((x * 7 + y * 3) % 11 === 0 ? 1 : 0) - (y > yt(x) - 3 ? 1 : 0), x, y));
      a_maquina(R, P, 4, 108, salida);
      // la orilla de acá: barro húmedo con brillos verdes, hierba amarillenta, piedras
      for (let x = 0; x < 320; x++) for (let y = Math.round(yb(x)) + 1; y < 180; y++) { const d = y - yb(x);
        let c = d < 4 ? a_rampa(P.tierra, 1.2 + (h(x, y, 344) - 0.5) * 1.2 + (d < 1.5 ? -0.6 : 0), x, y) : a_rampa(P.seco, 1.4 + (h(x >> 1, y, 345) - 0.5) * 1.1 + ((x * 5 + y * 11) % 13 === 0 ? 1.1 : 0) + Math.sin(x * 0.05 + y * 0.1) * 0.3 - (y > 168 ? 0.4 : 0), x, y);
        if (d < 10) c = a_mezcla(c, L[3], (1 - d / 10) * (P.noche ? 0.35 : 0.12));
        R.pset(x, y, c); }
      for (let x = 0; x < 320; x++) for (let y = 98; y < Math.round(yt(x)); y++) { const d = yt(x) - y; if (d < 7) R.pset(x, y, a_mezcla(R.pget(x, y), L[3], (1 - d / 7) * (P.noche ? 0.4 : 0.12))); }
      for (let k = 0; k < 12; k++) { const x = h(k, 1, 346) * 320, y = yb(x) + 10 + h(k, 2, 346) * 40, r = 2 + h(k, 3, 346) * 3; if (y > 178) continue; a_sombra(R, x + 1, y + r * 0.5, r + 1, 1.5, 0.3); a_elipse(R, x, y, r * 1.3, r * 0.8, (px, py, d) => a_rampa(P.cimiento, 2.6 - d - (px - x) * 0.2, px, py)); }
    });
    R.copiar(fondo);
    A = A ?? a_capas.get(clave + ':A'); a_capas.set(clave + ':A', A);
    a_nubes(R, t, P, 6, 44, 7);
    // la mansión de atrás está en el fondo: se repinta lo vivo encima (la nube no tapa la casa: va en su franja)
    a_casaViva(R, t, P, A, 0.52);
    if (P.noche) a_murcielagos(R, t, A.cupula[0], A.cupula[1] + 4, 3, 12);
    else bandada(R, t, { tipo: 'golondrina', n: 3, y: 24, cada: 13, v: 30 });
    a_rio(R, t, P, yt, yb, 1, { luna: P.noche ? luna : null, reflejos: P.noche ? [184, 214, 236] : null });
    a_maquinaViva(R, t, P, 4, 108, salida);
    a_vapores(R, t, P, yt, 7);
    const delante = a_capa(R, clave + ':delante', true, () => {
      a_arbolTorcido(R, P, 296, 182, 92, -1, 1.2);
      a_cartel(R, P, 242, 162, 1);
      // un bidón oxidado tumbado que pierde lodo
      { const bx = 32, by = 160; a_sombra(R, bx + 2, by + 6, 14, 2.5, 0.35); a_elipse(R, bx, by, 12, 7, (x, y, d) => a_rampa(P.ladrillo.map((c) => a_mezcla(c, hex('#8a6a3a'), 0.3)), 2.4 - (y - by) * 0.2 - d * 0.4 + (Math.abs(x - bx + 4) < 1 || Math.abs(x - bx - 4) < 1 ? -0.9 : 0) + (h(x, y, 347) < 0.15 ? -0.8 : 0), x, y));
        a_elipse(R, bx + 11, by, 3, 6.5, P.metal[0]); a_elipse(R, bx + 11, by, 2, 5.4, L[2]); for (let k = 0; k < 6; k++) R.pset(bx + 13 + k, by + 4 + Math.round(k * 0.3), L[2 + (k % 2)]); R.rect(bx + 13, by + 6, bx + 22, by + 7, L[2]); }
      // juncos con la punta que brilla y matas secas
      for (let k = 0; k < 9; k++) { const x = Math.round(150 + h(k, 1, 348) * 70 - (k > 5 ? 130 : 0)), y = Math.round(yb(x) + 4); R.linea(x, y, x + (k % 2 ? 1 : -1), y - 12 - (k % 3) * 2, P.cesped[1]); R.rect(x + (k % 2 ? 1 : -1), y - 16 - (k % 3) * 2, x + (k % 2 ? 1 : -1) + 1, y - 12 - (k % 3) * 2, P.tierra[1]); }
      for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 349) * 320), y = Math.round(150 + h(k, 2, 349) * 28); if (x > 60 && x < 225 && y < 172) continue; a_mata(R, x, y, 0, 4 + h(k, 3, 349) * 4, P.seco, k); }
    });
    a_pegar(R, delante, 40, 179);
    for (let k = 0; k < 16; k++) { const x = Math.round(k * 21 + h(k, 1, 350) * 10); a_mata(R, x, 181, t, 6 + h(k, 2, 350) * 4, P.seco, k); }
    if (P.noche) for (let k = 0; k < 5; k++) { const x = Math.round(150 + h(k, 1, 348) * 70 - (k > 2 ? 130 : 0)), y = Math.round(yb(x) - 14); if (Math.sin(t * 2.5 + k * 1.4) > -0.2) R.pset(x, y, L[4]); }
    return { suelo: 162, pies: [50, 225], rio: [Math.round(yt(160)), Math.round(yb(160))], orilla: (x) => Math.round(yb(x)) + 3, tubo: salida, cartel: [242, 162], mansion: [206, 100], luna: P.noche ? [luna, 32] : null, zona: [52, 226, 152, 176] };
  }
  // ── a ras de suelo
  const yt = (x) => 150 + Math.sin(x * 0.04 + t * 0) * 1.5, yb = () => 181, orilla = (x) => 148 + Math.sin(x * 0.07) * 2;
  const fondo = a_capa(R, clave + ':fondo', false, () => {
    a_cieloFijo(R, P, 120, { astro: P.noche ? [226, 36, 13] : P.tarde ? [228, 96, 18] : [226, 34, 10] });
    a_colinas(R, P, (x) => 100 + Math.sin(x * 0.025 + 2) * 6, P.noche ? [hex('#121634'), hex('#1a1e44'), hex('#22264e'), hex('#30345e')] : P.tarde ? [hex('#4a2e5a'), hex('#6a3a6a'), hex('#8a4a76'), hex('#b06a80')] : [hex('#5e7e9e'), hex('#7090ae'), hex('#84a4c0'), hex('#a0c0d6')], { n: 20, tronco: P.noche ? hex('#0e1230') : hex('#56708a'), copa: [hex('#4e6a86'), hex('#5e7a96'), hex('#7090a8')], pelado: true }, 4);
    a_colinas(R, P, (x) => 114 + Math.sin(x * 0.04) * 3, P.seco.map((c) => a_mezcla(c, P.noche ? hex('#141838') : hex('#9ab8d0'), 0.35)), null, 5);
    // la pared del laboratorio: piedra azulada con su zócalo, una ventana de sótano con barrotes y el tubo grande
    const wx = 150; const P2 = P;
    R.poligono([[0, 6], [wx - 6, 12], [wx, 134], [0, 134]], (x, y) => { const rh = 7, row = Math.floor(y / rh), off = row & 1 ? 7 : 0, c = (x + off) % 14, r = y % rh;
      if (r === 0 || c === 0) return P2.piedra[0]; let i = 1.6 + (h((x + off) / 14 | 0, row, 351) - 0.5) * 0.9 + (r === rh - 1 ? 0.5 : 0) - (c === 13 ? 0.4 : 0) - x * 0.003 + (y > 126 ? -0.6 : 0); if (h(x, y, 352) < 0.03) i -= 1; return a_rampa(P2.piedra, i, x, y); });
    R.poligono([[wx - 6, 12], [wx, 134], [wx + 4, 134], [wx - 2, 12]], P.piedra[0]);
    for (let y = 18; y < 134; y += 9) { const xx = wx - 6 + (y - 12) * 6 / 122; R.rect(Math.round(xx) - 4, y, Math.round(xx), y, P.piedra[3]); }   // la arista con su luz
    // la hiedra seca que trepa
    for (let k = 0; k < 40; k++) { const x = 10 + h(k, 1, 353) * 120, y = 20 + h(k, 2, 353) * 110; R.pset(Math.round(x), Math.round(y), P.cesped[1]); R.pset(Math.round(x) + 1, Math.round(y), P.cesped[2]); if (k % 3 === 0) R.linea(x, y, x + 3, y + 5, P.corteza[1]); }
    // la ventana de sótano en arco, con barrotes
    { const vx = 74, vy = 64, w = 30, hh = 30; R.rect(vx - 4, vy - 4, vx + w + 4, vy + hh + 4, P.piedra[3]); R.disco(vx + w / 2, vy, w / 2 + 4, P.piedra[3]);
      R.rect(vx - 2, vy, vx + w + 2, vy + hh + 2, P.piedra[0]); R.disco(vx + w / 2, vy, w / 2 + 2, P.piedra[0]);
      const vid = (x, y) => a_rampa(P.noche || P.tarde ? P.luzLab : P.cupula, 1.4 + (1 - Math.abs(x - vx - w / 2) / (w / 2)) * 1.2 - (y - vy) * 0.01, x, y);
      R.poligono([[vx, vy], [vx + w, vy], [vx + w, vy + hh], [vx, vy + hh]], vid); R.disco(vx + w / 2, vy, w / 2, vid);
      // matraces en silueta al trasluz
      for (const [fx, fr] of [[vx + 7, 4], [vx + 17, 5], [vx + 25, 3]]) { R.disco(fx, vy + hh - fr, fr, P.luzLab[0]); R.rect(fx - 1, vy + hh - fr * 2 - 5, fx + 1, vy + hh - fr * 2 + 1, P.luzLab[0]); }
      R.rect(vx, vy + hh - 1, vx + w, vy + hh, P.luzLab[0]);
      for (let x = vx + 4; x < vx + w; x += 6) { R.rect(x, vy - w / 2 + 2, x + 1, vy + hh, P.metal[0]); R.pset(x, vy + 6, P.metal[2]); }
      R.rect(vx - 5, vy + hh + 3, vx + w + 5, vy + hh + 6, P.piedra[3]); R.rect(vx - 5, vy + hh + 6, vx + w + 5, vy + hh + 6, P.piedra[0]); }
    // el tubo grande: baja por la pared, se dobla hacia nosotros y su boca vierte el lodo en un reguero
    { const tx = 30; R.rect(tx - 10, 22, tx + 10, 30, P.metal[1]); R.rect(tx - 10, 22, tx + 10, 22, P.metal[3]); for (let y = 30; y < 116; y++) for (let i = -7; i <= 7; i++) R.pset(tx + i, y, a_rampa(P.metal.map((c) => a_mezcla(c, hex('#c8783a'), 0.35)), 2.3 - i * 0.2 - (i * i) / 18 + ((y % 22) < 2 ? 0.9 : 0) + (h(tx + i, y, 354) < 0.05 ? -0.8 : 0), tx + i, y));
      for (const y of [44, 76, 104]) { R.rect(tx - 9, y, tx + 9, y + 3, P.metal[1]); R.rect(tx - 9, y, tx + 9, y, P.metal[3]); for (const i of [-7, 7]) R.pset(tx + i, y + 1, P.metal[0]); }
      a_elipse(R, tx, 122, 13, 11, (x, y, d) => a_rampa(P.metal.map((c) => a_mezcla(c, hex('#c8783a'), 0.35)), 2.6 - d * 1.2 - (x - tx) * 0.05, x, y));
      a_elipse(R, tx + 1, 123, 9, 7.5, P.metal[0]); a_elipse(R, tx + 1, 124, 7, 5.5, L[1]); }
    // la orilla: tierra y hierba seca con piedras; el reguero de lodo que baja del tubo hasta el río
    for (let x = 0; x < 320; x++) for (let y = x < wx + 4 ? 132 : 114; y <= orilla(x) + 3; y++) { const d = orilla(x) - y;
      { let c = a_rampa(P.seco, 1.6 + (h(x >> 1, y, 355) - 0.5) * 1.2 + ((x * 5 + y * 7) % 13 === 0 ? 1 : 0) + (y - 114) * 0.012, x, y); if (d < 5) c = a_rampa(P.tierra, 1.4 + (h(x, y, 356) - 0.5) * 1.2 - (d < 1.5 ? 0.6 : 0), x, y); if (d < 12) c = a_mezcla(c, L[3], (1 - d / 12) * (P.noche ? 0.3 : 0.1)); R.pset(x, y, c); } }
    for (let y = 130; y < 152; y++) { const cx = 32 + (y - 130) * 0.7, w = 5 + (y - 130) * 0.25; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) R.pset(x, y, a_rampa(L, 2 + Math.sin(x * 0.8 + y * 0.6) * 0.6 - Math.abs(x - cx) / w * 0.8, x, y)); }
    for (let k = 0; k < 9; k++) { const x = 160 + h(k, 1, 357) * 150, y = 128 + h(k, 2, 357) * 14, r = 2 + h(k, 3, 357) * 3; a_sombra(R, x + 1, y + r * 0.5, r + 1, 1.4, 0.3); a_elipse(R, x, y, r * 1.3, r * 0.8, (px, py, d) => a_rampa(P.cimiento, 2.6 - d - (px - x) * 0.2, px, py)); }
  });
  R.copiar(fondo);
  R.recorte([152, 0, 319, 112]); a_nubes(R, t, P, 6, 60, 6); R.recorte(null);
  if (P.noche) a_murcielagos(R, t, 230, 60, 2, 26);
  // la pared: la luz de la ventana late; el reguero de lodo se mueve
  { const vx = 74, vy = 64, w = 30, pulso = 0.5 + 0.5 * Math.sin(t * 2.2); if (P.noche || P.tarde) for (let k = 0; k < 18; k++) { const x = vx + 2 + Math.floor(h(k, 1, 362) * (w - 4)), y = vy - 8 + Math.floor(h(k, 2, 362) * 36); if (h(k, Math.floor(t * 3), 363) < pulso * 0.5) R.pset(x, y, P.luzLab[3]); }
    for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1, x = vx + 4 + Math.round(h(k, 1, 358) * (w - 8)), y = Math.round(vy + 26 - u * 30); R.recorte([vx, vy - w / 2, vx + w, vy + w]); R.pset(x, y, P.luzLab[3]); R.recorte(null); } }
  for (let y = 120; y < 152; y++) { const cx = y < 130 ? 31 : 32 + (y - 130) * 0.7, w = y < 130 ? 6 : 4 + (y - 130) * 0.2; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) if (h(x, Math.floor(y + t * 14), 360) < 0.16) R.pset(x, y, h(x, y, 361) < 0.5 ? L[3] : L[4]); }
  // los tentáculos se plantan en la orilla (y 146); el lodo en primer término con burbujas grandes
  a_rio(R, t, P, (x) => orilla(x) + 2, yb, 2.2, { luna: P.noche ? 226 : null, burbujas: 9 });
  a_vapores(R, t, P, (x) => orilla(x) + 4, 6, 1.8);
  const delante = a_capa(R, clave + ':delante', true, () => {
    a_cartel(R, P, 262, 148, 1.15);
    a_arbolTorcido(R, P, 312, 150, 70, -1, 1.1);
    for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 1, 359) * 320), y = Math.round(orilla(x) - 1); if (x > 100 && x < 230) continue; a_mata(R, x, y, 0, 6 + h(k, 2, 359) * 5, P.seco, k); }
    for (let k = 0; k < 6; k++) { const x = 232 + k * 7, y = Math.round(orilla(x) + 1); R.linea(x, y, x + (k % 2 ? 1 : -1), y - 18 - (k % 3) * 3, P.cesped[1]); R.rect(x + (k % 2 ? 1 : -1), y - 23 - (k % 3) * 3, x + (k % 2 ? 1 : -1) + 1, y - 18 - (k % 3) * 3, P.tierra[1]); }
  });
  a_pegar(R, delante, 0, 179);
  return { suelo: 147, pies: [70, 240], orilla: (x) => Math.round(orilla(x)), rio: [150, 180], tubo: [31, 124], cartel: [262, 148], ventana: [74, 49, 104, 94], zona: [80, 235, 140, 150] };
}

// la paleta de dentro: los colores de día un poco apagados (la luz es de lámpara), más el papel pintado y la alfombra
function a_paletaDentro(anyo, hd) {
  const P = a_paleta('dia', anyo, hd), osc = (cs, a) => cs.map((c) => a_mezcla(c, hex('#1a1028'), a)), rp = (a) => a.map((c) => { let r = hex(c); if (anyo < 1990) r = a_mezcla(r, hex('#3a3050'), 0.3); if (hd) r = a_satura(r, 1.25); return r; });
  return { ...P, pared: osc(P.pared, 0.15), papel: rp(['#2e1e46', '#46305e', '#5e4278', '#7e62a0']), papel2: rp(['#1e3a34', '#2a5248', '#3a6a5a', '#5a8a72']), oro: rp(['#6a4a1a', '#a87a2a', '#d8a83a', '#f8d870']),
    madera: rp(['#2a140c', '#4a2616', '#6e3c22', '#965a34']), alfombra: rp(['#4a0e1a', '#7a1a2a', '#a82a3a', '#d04a4a']), beige: rp(['#7a6e58', '#aa9c7e', '#d4c8a6', '#f0e8cc']), cesped: P.cesped };
}

// un tablero de madera visto de frente: tablas horizontales de alto th, con juntas, vetas y algún nudo
function a_tablero(R, M, x0, y0, x1, y1, th = 6, k = 0, luz = 0) {
  for (let y = y0; y <= y1; y++) { const b = Math.floor((y - y0) / th), r = (y - y0) - b * th;
    for (let x = x0; x <= x1; x++) { let i = 1.9 + luz; if (r === th - 1) i -= 1.2; else if (r === 0) i += 0.5;
      const vx = Math.sin(x * 0.09 + b * 3.1 + Math.sin(x * 0.02 + b) * 2); if (Math.abs(vx - (r - th / 2) * 0.35) < 0.12) i -= 0.5;
      const jx = Math.round(h(b, 1, 400 + k) * 60); if (((x - x0 - jx) % 61 + 61) % 61 === 0) i -= 1.1;
      i += (h(x, y, 401 + k) - 0.5) * 0.35; R.pset(x, y, a_rampa(M, i, x, y)); } }
}

// el suelo de tablas en perspectiva (fugan hacia (vx, vy)) entre y0 y 179, con las juntas a tope escalonadas
function a_suelo(R, M, y0, vx, vy, k = 0) {
  for (let y = y0; y < 180; y++) { const f = (y0 - vy) / (y - vy); for (let x = 0; x < 320; x++) { const xp = vx + (x - vx) * f, tabla = Math.floor(xp / 14), c = xp - tabla * 14, zp = Math.floor((1 / f) * 8 + h(tabla, 1, 410 + k) * 5);
    let i = 1.9 - (y - y0) * 0.004 + (h(tabla, 2, 410 + k) - 0.5) * 0.5; if (c < 1 / f * 0.9) i -= 1.1; if (zp % 7 === 0 && h(tabla, zp, 411) < 0.5) i -= 0.9;
    if (Math.abs(Math.sin(xp * 0.6 + zp) * 0.5 + (c - 7) * 0.12) < 0.05) i -= 0.4; i += (h(x, y, 412 + k) - 0.5) * 0.35; R.pset(x, y, a_rampa(M, i, x, y)); } }
}

// el papel pintado de rayas con damasco (rombos y flores pequeñas), un poco torcido, con alguna mancha de humedad
function a_papel(R, M, x0, y0, x1, y1, k = 0, torc = 0.04) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const xs = x + (y - y0) * torc, raya = Math.floor(xs / 12) % 2, c = ((xs % 12) + 12) % 12;
    let i = raya ? 2.1 : 1.5; if (c < 1) i -= 0.6; const dx = ((xs % 12) + 12) % 12 - 6, dy = (y % 14) - 7; if (raya === 0 && Math.abs(dx) + Math.abs(dy) * 0.8 < 2.4) i += 1.2; if (raya === 1 && (x + y) % 4 === 0 && Math.abs(dy) < 1) i -= 0.4;
    const m = Math.sin(x * 0.05 + k) * Math.sin(y * 0.07 + k * 2); if (m > 0.85) i -= 0.5;
    i += (h(x, y, 420 + k) - 0.5) * 0.3 - (y - y0) * 0.002; R.pset(x, y, a_rampa(M, i, x, y)); }
}

// un marco de cuadro (dorado, con canto de luz) con lo que pinte dentro dibuja(x0, y0, x1, y1); inclin: torcido (px)
function a_cuadro(R, P, x0, y0, x1, y1, inclin, dibuja) {
  const pts = (m) => [[x0 - m, y0 - m + inclin], [x1 + m, y0 - m - inclin], [x1 + m, y1 + m - inclin], [x0 - m, y1 + m + inclin]];
  a_tinte(R, pts(3).map(([x, y]) => [x + 3, y + 3]), hex('#0a0614'), 0.35);
  R.poligono(pts(3), (x, y) => a_rampa(P.oro, 2 - (x - x0) * 0.008 + ((x + y) % 5 === 0 ? 0.8 : 0) - (y - y0) * 0.01, x, y));
  R.poligono(pts(1), P.oro[0]);
  R.recorte([x0, y0 - Math.abs(inclin), x1, y1 + Math.abs(inclin)]); R.poligono(pts(0), (x, y) => dibuja(x, y)); R.recorte(null);
  R.linea(x0 - 3, y0 - 3 + inclin, x1 + 3, y0 - 3 - inclin, P.oro[3]);
}

// el ordenador de los ochenta en miniatura (el juego dentro del juego): la mansión de 1987 de noche en píxeles gordos,
// con su césped y la línea de verbos abajo (barritas y pictogramas, sin letras). Se pinta en una capa de 96 × 60 que
// luego se amplía a la pantalla que toque
function a_mini(R) {
  return a_capa(R, 'mini87', false, () => {
    const P = a_paleta('noche', 1987, false);
    R.rect(0, 0, 95, 59, hex('#000000'));
    for (let y = 0; y < 40; y++) R.rect(0, y, 95, y, y < 20 ? hex('#141048') : hex('#24186a'));
    for (let k = 0; k < 14; k++) R.pset(Math.floor(h(k, 1, 430) * 96), Math.floor(h(k, 2, 430) * 22), hex('#d8d8ff'));
    R.disco(80, 8, 4, hex('#f0f0c8'));
    R.rect(0, 40, 95, 45, hex('#1a5a1a'));
    a_casa(R, P, 48, 41, 0.3);
    // la línea de verbos: tres filas de botones con pictogramas y, a la derecha, el inventario
    R.rect(0, 46, 95, 59, hex('#000000'));
    for (let f = 0; f < 3; f++) for (let c = 0; c < 3; c++) { const x = 2 + c * 20, y = 47 + f * 4; R.rect(x, y, x + 16, y + 2, f === 1 && c === 0 ? hex('#f8f070') : hex('#3aa83a')); R.rect(x + 2, y + 1, x + 14, y + 1, hex('#000000')); for (let q = 0; q < 4; q++) R.pset(x + 3 + q * 3, y + 1, hex('#5ad85a')); }
    for (let k = 0; k < 4; k++) { const x = 64 + (k % 2) * 15, y = 47 + Math.floor(k / 2) * 6; R.rect(x, y, x + 12, y + 4, hex('#2a2a8a')); R.rect(x + 3, y + 1, x + 8, y + 3, [hex('#e8c840'), hex('#c84a4a'), hex('#4ac8e8'), hex('#e8e8e8')][k]); }
  });
}

// pinta la miniatura dentro de (x0, y0)–(x1, y1), ampliada a píxeles gordos; t mueve un chaval por el césped y el
// cursor en cruz
function a_pintaMini(R, t, x0, y0, x1, y1) {
  const m = a_mini(R), B = R.buf, kx = 96 / (x1 - x0 + 1), ky = 60 / (y1 - y0 + 1);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const my = Math.min(59, Math.floor((y - y0) * ky)); for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[y * 320 + x] = m[my * 320 + Math.min(95, Math.floor((x - x0) * kx))]; }
  const P2 = (mx, my, c) => { const ax = Math.round(x0 + mx / kx), ay = Math.round(y0 + my / ky), bx = Math.round(x0 + (mx + 1) / kx) - 1, by = Math.round(y0 + (my + 1) / ky) - 1; R.rect(ax, ay, Math.max(ax, bx), Math.max(ay, by), c); };
  const cx = Math.round(20 + ((t * 6) % 50)), f = Math.floor(t * 4) % 2;   // el chaval que anda por el césped
  P2(cx, 38, hex('#f0c090')); P2(cx, 39, hex('#c83a3a')); P2(cx, 40, hex('#c83a3a')); P2(cx + f, 41, hex('#3a3aa8')); P2(cx - 1 + f, 41, hex('#3a3aa8'));
  const ux = Math.round(48 + Math.sin(t * 0.9) * 26), uy = Math.round(26 + Math.cos(t * 1.3) * 10);   // el cursor en cruz
  for (const [dx, dy] of [[-2, 0], [-1, 0], [1, 0], [2, 0], [0, -2], [0, -1], [0, 1], [0, 2]]) P2(ux + dx, uy + dy, hex('#ffffff'));
}

// el cristal de un monitor de tubo: rayas de barrido, viñeta en las esquinas, el brillo del cristal curvo y la franja
// que sube despacio
function a_crt(R, t, x0, y0, x1, y1) {
  const B = R.buf, w = x1 - x0, hh = y1 - y0, banda = y0 + ((t * 18) % (hh + 20)) - 10;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x, nx = (x - x0) / w * 2 - 1, ny = (y - y0) / hh * 2 - 1, vi = nx * nx * nx * nx + ny * ny * ny * ny;
    let c = B[i]; if ((y - y0) % 2 === 1) c = a_mezcla(c, hex('#000000'), 0.28); if (vi > 0.55) c = a_mezcla(c, hex('#000000'), Math.min(0.85, (vi - 0.55) * 1.6));
    if (Math.abs(y - banda) < 3) c = a_mezcla(c, hex('#ffffff'), 0.06); const g = nx + ny * 1.3 + 1.1; if (g > -0.15 && g < 0.15 && ny < -0.2) c = a_mezcla(c, hex('#ffffff'), 0.14); if (nx < -0.6 && ny < -0.55 && (x + y) % 2 === 0) c = a_mezcla(c, hex('#ffffff'), 0.1);
    B[i] = c; }
}

function a_cuarto(R, t, o, P0, clave) {
  const P = a_paletaDentro(o.anyo ?? 1993, !!o.hd), Pf = P0, noche = Pf.noche || Pf.tarde;
  if (o.camara === 'pantalla') {
    const S = [44, 20, 275, 146];
    const fondo = a_capa(R, clave + ':fondo', false, () => {
      a_papel(R, P.papel, 0, 0, 319, 179, 3);
      // la carcasa beige: biseles, esquinas redondeadas, textura de plástico granulado
      const caja = (x, y) => { const rx = Math.max(0, 8 - x, x - 311), ry = Math.max(0, 6 - y, y - 173); return rx * rx + ry * ry < 64; };
      // (la esquina de arriba a la derecha queda detrás de Atom: ahí el bisel y el canto se funden en un brillo liso)
      for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const q = Math.max(0, Math.min(1, (x - 262) / 14, (54 - y) / 12)); if (!caja(x, y) && q < 0.5) continue;
        const inS = x >= S[0] - 10 && x <= S[2] + 10 && y >= S[1] - 10 && y <= S[3] + 10, bisel = inS ? Math.min(x - S[0] + 10, S[2] + 10 - x, y - S[1] + 10, S[3] + 10 - y) : 99;
        const i0 = 2 - y * 0.004 + (h(x, y, 440) - 0.5) * 0.45; let i = i0; if (bisel < 10) i = (y < S[1] || x < S[0] ? 1.3 : 2.6) - bisel * 0.04 + (h(x, y, 441) - 0.5) * 0.3; if (bisel < 2) i = 0.4;
        if (x < 6 || y < 4) i += 0.6; if (x > 313 || y > 175) i -= 0.6; if (q > 0) i = i * (1 - q) + (i0 + 0.35) * q; R.pset(x, y, a_rampa(P.beige, i, x, y)); }
      // la placa de abajo: rejilla, el arcoíris sin marca, dos ruedas y la nota pegada con garabatos
      for (let x = 60; x < 140; x += 3) R.rect(x, 158, x, 168, P.beige[1]);
      for (let k = 0; k < 6; k++) R.rect(170 + k * 3, 160, 172 + k * 3, 166, [hex('#4ab84a'), hex('#e8d03a'), hex('#e8902a'), hex('#d83a3a'), hex('#9a4ab8'), hex('#3a8ad8')][k]);
      for (const kx of [236, 254]) { R.disco(kx, 162, 5, P.beige[0]); R.disco(kx, 162, 4, P.beige[2]); R.rect(kx, 158, kx, 162, P.beige[0]); }
      R.poligono([[280, 120], [312, 118], [314, 150], [282, 152]], (x, y) => a_rampa([hex('#c8b030'), hex('#e8d048'), hex('#f8e870'), hex('#fff8b0')], 2.3 - (y - 118) * 0.02, x, y));
      for (let k = 0; k < 4; k++) for (let x = 286; x < 306; x++) R.pset(x, 126 + k * 6 + Math.round(Math.sin(x * 0.9 + k) * 1.2), hex('#3a3a8a'));
    });
    R.copiar(fondo);
    R.recorte(S); if (o.pantalla) o.pantalla(R, t, S); else a_pintaMini(R, t, S[0], S[1], S[2], S[3]); R.recorte(null);
    a_crt(R, t, S[0], S[1], S[2], S[3]);
    R.pset(220, 163, Math.sin(t * 5) > -0.6 ? hex('#ff3a2a') : hex('#5a1a10')); R.pset(221, 163, Math.sin(t * 5) > -0.6 ? hex('#ff7a5a') : hex('#5a1a10'));
    return { suelo: 180, pies: [], pantalla: S };
  }
  const SC = [163, 107, 191, 127];
  const fondo = a_capa(R, clave + ':fondo', false, () => {
    a_papel(R, P.papel, 0, 6, 319, 112, 0);
    a_tablero(R, P.madera, 0, 0, 319, 5, 3, 1, 0.4); R.rect(0, 6, 319, 6, P.madera[0]); R.rect(0, 7, 319, 8, a_mezcla(P.papel[0], hex('#000000'), 0.3));
    // el zócalo de madera con cuarterones
    a_tablero(R, P.madera, 0, 112, 319, 140, 7, 2, -0.2);
    for (let x = 4; x < 320; x += 30) { R.rect(x, 117, x + 24, 117, P.madera[3]); R.rect(x, 117, x, 135, P.madera[3]); R.rect(x, 135, x + 24, 135, P.madera[0]); R.rect(x + 24, 117, x + 24, 135, P.madera[0]); }
    R.rect(0, 110, 319, 113, P.madera[2]); R.rect(0, 110, 319, 110, P.madera[3]); R.rect(0, 114, 319, 114, P.madera[0]);
    R.rect(0, 138, 319, 141, P.madera[1]); R.rect(0, 138, 319, 138, P.madera[3]);
    a_suelo(R, P.madera, 142, 160, 30, 3);
    // la alfombra ovalada con su cenefa
    a_elipse(R, 168, 160, 104, 15, (x, y, d) => { const b = d > 0.78 ? (d > 0.9 ? 0.6 : 2.6) : 1.8 + (((x >> 2) + (y >> 1)) % 3 === 0 ? 0.7 : 0) + (Math.abs(Math.sin(x * 0.2) * 3 - (y - 160)) < 1 ? 0.9 : 0); return d > 0.82 && d < 0.9 && (x % 4) < 2 ? P.oro[2] : a_rampa(P.alfombra, b + (h(x, y, 450) - 0.5) * 0.4, x, y); });
    // la ventana de guillotina con sus seis cristales, el alféizar y las cortinas de terciopelo con alzapaños
    R.rect(16, 26, 80, 100, P.madera[0]); R.rect(18, 28, 78, 98, P.madera[2]);
    R.rect(14, 98, 82, 102, P.madera[3]); R.rect(14, 102, 82, 103, P.madera[0]);
    // un cactus en una maceta en el alféizar
    R.rect(68, 90, 74, 98, P.ladrillo[2]); R.rect(67, 89, 75, 90, P.ladrillo[3]); R.rect(70, 80, 72, 89, P.cesped[2]); R.rect(68, 83, 69, 86, P.cesped[2]); R.pset(71, 79, P.cono[3]);
    for (const [a, b, sd] of [[4, 26, -1], [70, 92, 1]]) for (let y = 18; y < 112; y++) { const ata = y > 70 && y < 76, w = ata ? 0.45 : 1; for (let x = a; x <= b; x++) { const cxl = (a + b) / 2, f = (x - a) / (b - a); if (Math.abs(x - cxl) > (b - a) / 2 * (y < 70 ? 1 : w + (1 - w) * Math.min(1, (y - 76) / 20)) + 0.5 && y > 70) continue;
      const pl = Math.sin(f * Math.PI * 4 + (sd > 0 ? 1 : 0)) * 0.9; R.pset(x, y, ata ? P.oro[2] : a_rampa(P.cortina, 1.8 + pl - (sd < 0 ? f : 1 - f) * 0.4, x, y)); } }
    for (let x = 2; x < 94; x++) for (let y = 17; y < 27; y++) { const fes = y > 23 + Math.sin(x * 0.28) * 2; if (fes) continue; R.pset(x, y, a_rampa(P.cortina, 2.1 - (y - 17) * 0.08 + Math.sin(x * 0.28 + 1.5) * 0.6, x, y)); }
    R.rect(0, 16, 96, 17, P.oro[2]); R.disco(1, 16.5, 2, P.oro[3]); R.disco(95, 16.5, 2, P.oro[3]);
    // el póster de un cohete (sin letras) con chinchetas y la esquina doblada
    R.rect(102, 30, 132, 72, hex('#141838')); for (let k = 0; k < 14; k++) R.pset(103 + Math.floor(h(k, 1, 451) * 28), 31 + Math.floor(h(k, 2, 451) * 40), hex('#e8e8ff'));
    R.disco(124, 38, 4, hex('#d8a83a')); R.disco(125, 37, 3, hex('#f0c858'));
    R.poligono([[117, 40], [120, 46], [120, 62], [114, 62], [114, 46]], hex('#e8e8f0')); R.rect(114, 52, 120, 53, hex('#d83a3a')); R.disco(117, 50, 1.5, hex('#4a8ad8'));
    R.poligono([[114, 58], [110, 64], [114, 64]], hex('#d83a3a')); R.poligono([[120, 58], [124, 64], [120, 64]], hex('#d83a3a')); R.rect(115, 64, 119, 68, hex('#f8a830')); R.rect(116, 68, 118, 70, hex('#f8e870'));
    R.poligono([[128, 72], [132, 68], [132, 72]], hex('#c8c0e0')); for (const [px, py] of [[103, 31], [131, 31]]) { R.pset(px, py, hex('#d83a3a')); R.pset(px + 1, py, hex('#ff8a7a')); }
    // el reloj de pared con su caja (el péndulo va en la parte viva)
    R.rect(220, 26, 244, 78, P.madera[0]); R.rect(222, 28, 242, 76, P.madera[2]); R.rect(224, 50, 240, 74, P.madera[0]);
    R.disco(232, 38, 8, P.oro[1]); R.disco(232, 38, 7, hex('#f2eee0')); for (let k = 0; k < 12; k++) R.pset(Math.round(232 + Math.cos(k * Math.PI / 6) * 5.5), Math.round(38 + Math.sin(k * Math.PI / 6) * 5.5), hex('#3a2a2a'));
    R.poligono([[218, 26], [246, 26], [232, 18]], P.madera[1]);
    // la estantería con libros (lomos de colores, sin letras), la jaula del hámster y la lámpara de lava
    for (const sy of [86, 112]) { R.rect(256, sy, 318, sy + 3, P.madera[2]); R.rect(256, sy, 318, sy, P.madera[3]); R.rect(256, sy + 3, 318, sy + 4, P.madera[0]); a_tinte(R, [[256, sy + 5], [318, sy + 5], [318, sy + 8], [256, sy + 8]], hex('#0a0614'), 0.3); }
    R.rect(256, 54, 258, 116, P.madera[1]); R.rect(316, 54, 318, 116, P.madera[1]);
    { let x = 260; for (let k = 0; x < 290; k++) { const w = 3 + Math.floor(h(k, 1, 452) * 3), alto = 14 + Math.floor(h(k, 2, 452) * 8), c = [P.cortina, P.contra, P.oro, P.cupula, P.cono][k % 5]; R.rect(x, 86 - alto, x + w - 1, 85, c[2]); R.rect(x, 86 - alto, x, 85, c[3]); R.rect(x + w - 1, 86 - alto, x + w - 1, 85, c[1]); R.rect(x, 80 - Math.floor(alto / 2), x + w - 1, 80 - Math.floor(alto / 2), P.oro[2]); x += w; }
      R.poligono([[291, 85], [306, 66], [309, 68], [294, 85]], P.contra[2]); }
    R.rect(296, 99, 312, 111, P.metal[1]); for (let x = 297; x < 312; x += 2) R.rect(x, 100, x, 111, P.metal[3]); R.rect(296, 98, 312, 99, P.metal[2]);
    R.rect(262, 98, 266, 111, hex('#2a2a3a')); R.poligono([[260, 98], [268, 98], [266, 92], [262, 92]], P.metal[2]); R.rect(262, 112 - 1, 266, 111, P.metal[1]);
    // la mesa de madera con cajones; sobre ella el ordenador beige con su teclado, la disquetera y una caja de discos
    const mx0 = 112, mx1 = 252, mt = 134;
    a_tablero(R, P.madera, mx0, mt + 3, mx1, 152, 5, 4, -0.1);
    R.rect(mx0, mt - 2, mx1, mt + 2, P.madera[2]); R.rect(mx0, mt - 2, mx1, mt - 2, P.madera[3]); R.rect(mx0 - 1, mt + 2, mx1 + 1, mt + 3, P.madera[0]);
    R.rect(mx0 + 40, mt + 4, mx1 - 40, 152, P.madera[0]); a_tinte(R, [[mx0 + 40, mt + 4], [mx1 - 40, mt + 4], [mx1 - 40, 152], [mx0 + 40, 152]], hex('#000000'), 0.4);
    for (const [a, b] of [[mx0 + 3, mx0 + 36], [mx1 - 36, mx1 - 3]]) for (let k = 0; k < 2; k++) { const y = mt + 6 + k * 8; R.rect(a, y, b, y + 6, P.madera[1]); R.rect(a, y, b, y, P.madera[3]); R.rect((a + b) / 2 - 3, y + 3, (a + b) / 2 + 3, y + 3, P.oro[2]); }
    a_sombra(R, (mx0 + mx1) / 2, 153, 76, 3, 0.4);
    for (const lx of [mx0 + 1, mx1 - 3]) R.rect(lx, 150, lx + 2, 153, P.madera[0]);
    // la unidad central y el monitor encima
    R.rect(150, 122, 206, 133, P.beige[0]); R.rect(151, 123, 205, 132, P.beige[2]); for (let x = 154; x < 172; x += 2) R.rect(x, 126, x, 130, P.beige[1]); R.rect(176, 127, 196, 128, P.beige[0]);
    R.rect(156, 100, 198, 122, P.beige[0]); R.rect(157, 101, 197, 121, P.beige[2]); R.rect(157, 101, 197, 101, P.beige[3]); R.rect(197, 101, 197, 121, P.beige[1]);
    R.rect(SC[0] - 2, SC[1] - 2, SC[2] + 2, SC[3] + 2, P.beige[1]); R.rect(SC[0] - 1, SC[1] - 1, SC[2] + 1, SC[3] + 1, hex('#101010'));
    for (let k = 0; k < 6; k++) R.pset(166 + k * 2, 119, [hex('#4ab84a'), hex('#e8d03a'), hex('#e8902a'), hex('#d83a3a'), hex('#9a4ab8'), hex('#3a8ad8')][k]);
    R.disco(188, 119, 1.2, P.beige[0]); R.disco(193, 119, 1.2, P.beige[0]);
    // el teclado delante, en escorzo
    R.poligono([[152, 133], [204, 133], [207, 137], [149, 137]], P.beige[1]); for (let r = 0; r < 2; r++) for (let x = 153 + r; x < 203; x += 3) R.rect(x, 134 + r * 2, x + 1, 134 + r * 2, P.beige[3]);
    // la disquetera, la caja de disquetes y una taza con lápices
    R.rect(212, 120, 236, 133, P.beige[0]); R.rect(213, 121, 235, 132, P.beige[2]); R.rect(216, 125, 232, 126, hex('#2a2a2a')); R.rect(229, 129, 231, 129, hex('#5a1a10'));
    R.rect(120, 124, 140, 133, hex('#3a3a4a')); for (let k = 0; k < 5; k++) { R.rect(122 + k * 4, 119 + (k % 2), 124 + k * 4, 125, hex('#1a1a22')); R.rect(122 + k * 4, 120 + (k % 2), 124 + k * 4, 121 + (k % 2), [hex('#e8d03a'), hex('#d83a3a'), hex('#3a8ad8'), hex('#f2f0e8'), hex('#4ab84a')][k]); }
    R.rect(242, 126, 248, 133, P.cono[2]); R.rect(242, 126, 242, 133, P.cono[3]); R.linea(244, 126, 242, 119, hex('#e8c040')); R.linea(246, 126, 249, 120, hex('#3a8ad8'));
    // el joystick en la esquina de la mesa
    R.rect(114, 129, 124, 133, hex('#1a1a22')); R.rect(118, 121, 119, 129, hex('#2a2a32')); R.disco(118.5, 120, 2, hex('#c82a2a')); R.pset(116, 128, hex('#e83a3a'));
    // el flexo: base, dos brazos y la pantalla que apunta al teclado
    R.rect(244, 112, 250, 115, P.metal[0]); R.linea(247, 112, 238, 92, P.metal[1]); R.linea(248, 112, 239, 92, P.metal[2]); R.linea(238, 92, 222, 96, P.metal[1]); R.linea(238, 91, 222, 95, P.metal[2]);
    R.poligono([[216, 94], [226, 92], [228, 100], [214, 102]], P.contra[1]); R.linea(216, 94, 226, 92, P.contra[3]);
    // la silla giratoria, retirada a la izquierda
    R.rect(84, 112, 104, 132, P.cortina[1]); R.rect(86, 114, 102, 130, P.cortina[2]); R.rect(86, 114, 102, 114, P.cortina[3]); R.rect(92, 132, 95, 136, P.metal[0]);
    R.rect(80, 136, 108, 140, P.cortina[1]); R.rect(80, 136, 108, 136, P.cortina[3]); R.rect(92, 140, 95, 148, P.metal[1]); for (const [a, b] of [[82, 152], [93, 153], [106, 152]]) { R.linea(93, 148, a, b, P.metal[0]); R.disco(a, b, 1.2, hex('#1a1a1a')); }
    a_sombra(R, 94, 153, 16, 2, 0.35);
    // el cable que baja del ordenador al enchufe
    for (let k = 0; k <= 30; k++) { const f = k / 30, x = 206 + f * 40, y = 132 + Math.sin(f * Math.PI) * 14 + f * 4; R.pset(Math.round(x), Math.round(y), hex('#1a1a1a')); }
    R.rect(244, 128, 252, 136, P.beige[2]); R.rect(246, 130, 247, 132, hex('#1a1a1a')); R.rect(249, 130, 250, 132, hex('#1a1a1a'));
  });
  R.copiar(fondo);
  // la ventana: lo de fuera (cielo de noche con la luna, la colina, el resplandor verde del río) recortado a sus cristales
  R.recorte([20, 30, 76, 96]);
  { const Pv = a_paleta(noche ? 'noche' : 'dia', o.anyo ?? 1993, !!o.hd), cols = noche ? ['#0e1234', '#182050', '#26306a'] : ['#4a86e0', '#7ab0f0', '#b8dcf8'];
    for (let y = 30; y <= 96; y++) R.linea(20, y, 76, y, (x) => hex(cols[Math.min(2, Math.floor((y - 30) / 66 * 3 + a_bay4(x, y)))]));
    if (noche) { R.disco(36, 44, 5, hex('#fff8e0')); R.disco(38, 43, 1.2, hex('#d8d0b8')); for (let k = 0; k < 8; k++) R.pset(22 + Math.floor(h(k, 1, 453) * 52), 32 + Math.floor(h(k, 2, 453) * 30), hex('#d8d8ff')); }
    a_nubes(R, t * 0.6, Pv, 34, 60, 3);
    for (let x = 20; x <= 76; x++) { const y0 = Math.round(82 + Math.sin(x * 0.08) * 3); R.linea(x, y0, x, 96, noche ? hex('#141a2e') : hex('#4a7a3a')); if (noche) R.pset(x, y0 + 8, a_mezcla(hex('#3aa82a'), hex('#141a2e'), 0.3 + 0.3 * Math.sin(t * 2 + x * 0.3))); }
    R.linea(30, 82, 30, 72, noche ? hex('#141a2e') : hex('#5a4a3a')); R.linea(30, 74, 26, 70, noche ? hex('#141a2e') : hex('#5a4a3a'));
    if (noche) a_murcielagos(R, t, 50, 52, 1, 14);
  }
  R.recorte(null);
  // el marco de la ventana (cruz de parteluces) y el reflejo del cristal
  for (const y of [52, 74]) R.rect(18, y, 78, y + 1, P.madera[1]); R.rect(47, 28, 49, 98, P.madera[1]); R.rect(18, 62, 78, 64, P.madera[2]);
  for (let k = 0; k < 4; k++) R.pset(24 + k, 36 - k, hex('#ffffff'));
  // la pantalla del ordenador: lo que pinte o.pantalla, o la mansión del juego en píxeles gordos
  R.recorte(SC); if (o.pantalla) o.pantalla(R, t, SC); else a_pintaMini(R, t, SC[0], SC[1], SC[2], SC[3]); R.recorte(null);
  a_crt(R, t, SC[0], SC[1], SC[2], SC[3]);
  // la luz del flexo sobre la mesa (late un poco), el piloto de la disquetera, el péndulo, la lámpara de lava, el hámster
  { const f = 0.12 + 0.03 * Math.sin(t * 11) * (Math.sin(t * 0.7) > 0.8 ? 1 : 0); a_tinte(R, [[216, 101], [228, 99], [236, 137], [196, 138]], hex('#fff0b0'), f); }
  if (Math.sin(t * 6) > 0.2) R.pset(230, 129, hex('#ff4a2a'));
  { const a = Math.sin(t * 3.2) * 0.35, px = 232 + Math.sin(a) * 18, py = 50 + Math.cos(a) * 18; R.recorte([224, 50, 240, 74]); R.linea(232, 50, px, py, P.oro[1]); R.disco(px, py, 2.5, P.oro[2]); R.pset(Math.round(px) - 1, Math.round(py) - 1, P.oro[3]); R.recorte(null); }
  { R.rect(262, 92, 266, 98, hex('#3a1a5a')); for (let k = 0; k < 3; k++) { const u = (t * 0.25 + k / 3) % 1, y = 97 - u * 5; R.disco(263 + (k % 2) * 2, y, 1.2, hex('#ff6a3a')); } R.rect(262, 98, 266, 98, P.metal[2]); }
  // la jaula del hámster: la rueda gira con el hámster dentro
  { const wx = 304, wy = 105, an = t * 9; R.disco(wx, wy, 5, P.metal[0]); R.disco(wx, wy, 4, hex('#2a2030')); for (let k = 0; k < 6; k++) R.pset(Math.round(wx + Math.cos(an + k) * 4), Math.round(wy + Math.sin(an + k) * 4), P.metal[3]); R.rect(wx - 2, wy + 1, wx + 1, wy + 3, hex('#e8b070')); R.pset(wx + 1 + (Math.floor(t * 12) % 2), wy + 1, hex('#e8b070')); R.pset(wx + 1, wy + 2, hex('#1a1010')); }
  // motas de polvo en la luz del flexo
  for (let k = 0; k < 6; k++) { const x = Math.round(206 + ((h(k, 1, 454) * 26 + Math.sin(t * 0.5 + k) * 4))), y = Math.round(104 + ((h(k, 2, 454) * 28 + t * 2) % 28)); if (Math.sin(t + k) > -0.2) R.pset(x, y, hex('#f8f0c8')); }
  return { suelo: 160, pies: [24, 300], pantalla: SC, mesa: [112, 252, 134], silla: [94, 136], ventana: [18, 28, 78, 98], estanteria: [256, 54, 318, 116] };
}
// una puerta de cuarterones con su marco y frontoncillo, de (x0, y0) a (x1, y1); o.entorna (0–1: entreabierta, con
// luz verde dentro), o.cerrada (cadenas, tablas clavadas en aspa y un candado; los pinta a_cadenas)
function a_puerta(R, P, x0, y0, x1, y1, o = {}) {
  const w = x1 - x0, M = P.madera;
  R.rect(x0 - 5, y0 - 5, x1 + 5, y1, M[0]); R.rect(x0 - 4, y0 - 4, x1 + 4, y1, M[2]); R.rect(x0 - 4, y0 - 4, x1 + 4, y0 - 4, M[3]); R.rect(x0 - 1, y0 - 1, x1 + 1, y1, M[0]);
  R.poligono([[x0 - 8, y0 - 5], [x1 + 8, y0 - 5], [(x0 + x1) / 2, y0 - 5 - w * 0.22]], M[1]); R.poligono([[x0 - 5, y0 - 6], [x1 + 5, y0 - 6], [(x0 + x1) / 2, y0 - 4 - w * 0.2]], M[2]); R.rect(x0 - 9, y0 - 6, x1 + 9, y0 - 5, M[3]);
  if (o.entorna) { R.rect(x0, y0, x1, y1, hex('#0a140c')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x0 + w * 0.5; x++) if (a_bay4(x, y) < 0.35 - (x - x0) / w * 0.6) R.pset(x, y, hex('#3a8a3a'));
    R.poligono([[x0 + w * o.entorna, y0], [x1, y0 - 2], [x1, y1 + 1], [x0 + w * o.entorna, y1]], (x, y) => a_rampa(M, 1.6 + ((x - x0) % 5 === 0 ? -0.8 : 0), x, y)); return; }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let i = 1.8 - (x - x0) / w * 0.4 + (Math.sin(x * 0.7 + Math.sin(y * 0.05) * 3) > 0.9 ? -0.4 : 0) + (h(x, y, 460) - 0.5) * 0.3; R.pset(x, y, a_rampa(M, i, x, y)); }
  const pw = (w - 9) / 2, ph = (y1 - y0 - 12) / 3;
  for (let c = 0; c < 2; c++) for (let f = 0; f < 3; f++) { const a = x0 + 3 + c * (pw + 3), b = y0 + 3 + f * (ph + 3), e = a + pw, g = b + ph * (f === 1 ? 1 : 1);
    R.rect(a, b, e, b, M[3]); R.rect(a, b, a, g, M[3]); R.rect(a, g, e, g, M[0]); R.rect(e, b, e, g, M[0]); R.rect(a + 2, b + 2, e - 2, g - 2, M[1]); R.rect(a + 2, b + 2, e - 2, b + 2, M[2]); }
  const kx = o.pomoIzq ? x0 + 3 : x1 - 3, ky = Math.round((y0 + y1) / 2 + 4); R.disco(kx, ky, 1.6, P.oro[1]); R.pset(kx - 1, ky - 1, P.oro[3]); R.rect(kx, ky + 3, kx, ky + 5, hex('#1a0a08'));
}

// lo que cierra la puerta para siempre: dos tablas en aspa con sus clavos, dos cadenas cruzadas y un candado gordo
function a_cadenas(R, P, x0, y0, x1, y1, q = 1) {
  const tabla = (ax, ay, bx, by) => { const n = Math.hypot(bx - ax, by - ay), nx = -(by - ay) / n, ny = (bx - ax) / n, g = 3.2 * q;
    R.poligono([[ax + nx * g, ay + ny * g], [bx + nx * g, by + ny * g], [bx - nx * g, by - ny * g], [ax - nx * g, ay - ny * g]], (x, y) => a_rampa(P.seco.map((c) => a_mezcla(c, hex('#6a4a2a'), 0.5)), 2 + (h(Math.round(x * 0.3), Math.round(y * 0.3), 461) - 0.5) * 0.7 + (Math.abs(((x - ax) * nx + (y - ay) * ny)) > g - 1 ? -0.9 : 0), x, y));
    for (const f of [0.08, 0.92]) { R.disco(ax + (bx - ax) * f, ay + (by - ay) * f, 1 * q, P.metal[1]); R.pset(Math.round(ax + (bx - ax) * f), Math.round(ay + (by - ay) * f), P.metal[3]); } };
  tabla(x0 - 4 * q, y0 + 6 * q, x1 + 4 * q, y1 - 8 * q); tabla(x1 + 4 * q, y0 + 6 * q, x0 - 4 * q, y1 - 8 * q);
  const cadena = (ax, ay, bx, by) => { const n = Math.ceil(Math.hypot(bx - ax, by - ay) / (3 * q)); for (let k = 0; k <= n; k++) { const f = k / n, x = ax + (bx - ax) * f, y = ay + (by - ay) * f + Math.sin(f * Math.PI) * 6 * q; if (k % 2) { R.rect(Math.round(x - q), Math.round(y - 0.5 * q), Math.round(x + q), Math.round(y + 0.5 * q), P.metal[1]); R.pset(Math.round(x - q), Math.round(y - 0.5 * q), P.metal[3]); } else { R.disco(x, y, 1.4 * q, P.metal[0]); R.disco(x, y, 0.7 * q, P.metal[2]); } } };
  const cy = (y0 + y1) / 2;
  cadena(x0 - 6 * q, cy - 14 * q, x1 + 6 * q, cy + 10 * q); cadena(x1 + 6 * q, cy - 14 * q, x0 - 6 * q, cy + 10 * q);
  const lx = (x0 + x1) / 2, ly = cy + 6 * q;
  for (let a = 0; a <= 12; a++) { const an = Math.PI + a / 12 * Math.PI; R.disco(lx + Math.cos(an) * 3.2 * q, ly - 2 * q + Math.sin(an) * 3.6 * q, 0.9 * q, P.metal[2]); }
  R.rect(Math.round(lx - 5 * q), Math.round(ly - 2 * q), Math.round(lx + 5 * q), Math.round(ly + 6 * q), P.oro[0]); R.rect(Math.round(lx - 4 * q), Math.round(ly - q), Math.round(lx + 4 * q), Math.round(ly + 5 * q), P.oro[2]);
  R.rect(Math.round(lx - 4 * q), Math.round(ly - q), Math.round(lx + 4 * q), Math.round(ly - q), P.oro[3]); R.disco(lx, ly + 1.5 * q, 0.9 * q, hex('#1a0a08')); R.rect(Math.round(lx), Math.round(ly + 2 * q), Math.round(lx), Math.round(ly + 3.5 * q), hex('#1a0a08'));
}

// un aplique de pared con su vela (la llama la pinta la parte viva)
function a_aplique(R, P, x, y) { R.rect(x - 1, y, x + 1, y + 8, P.oro[1]); R.rect(x - 4, y + 8, x + 4, y + 9, P.oro[2]); R.rect(x - 3, y + 10, x + 3, y + 10, P.oro[0]); R.rect(x - 1, y - 6, x + 1, y - 1, hex('#f2ecd8')); R.rect(x + 1, y - 6, x + 1, y - 1, hex('#c8c0a8')); R.pset(x - 1, y - 3, hex('#ffffff')); }

// la llama de una vela que tiembla, con su halo tramado; (x, y) la base del aplique
function a_llama(R, t, x, y, k) { const f = Math.sin(t * 13 + k * 3) > 0 ? 1 : 0, m = Math.round(Math.sin(t * 5 + k) * 0.6);
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j * 1.2); if (d > 6 || d < 2) continue; const px = x + i, py = y - 9 + j; if (a_bay4(px, py) < 0.4 * (1 - d / 6)) R.pset(px, py, a_mezcla(R.pget(px, py), hex('#f8d870'), 0.35)); }
  R.pset(x + m, y - 10 - f, hex('#f8a030')); R.pset(x + m, y - 9, hex('#fff0a0')); R.pset(x, y - 8, hex('#fff8d0')); R.pset(x + m, y - 11 - f, hex('#e8602a')); R.pset(x, y - 7, hex('#3a2a1a')); }

// el reloj de pie, la consola, la lámpara que oscila y la alfombra) o 'puerta' (la puerta cerrada para siempre, de cerca)
function a_pasillo(R, t, o, P0, clave) {
  const P = a_paletaDentro(o.anyo ?? 1993, !!o.hd);
  if (o.camara === 'puerta') {
    const D = [112, 22, 208, 150];
    const fondo = a_capa(R, clave + ':fondo', false, () => {
      a_papel(R, P.papel2, 0, 0, 319, 128, 5, -0.02);
      a_tablero(R, P.madera, 0, 128, 319, 150, 6, 6, -0.3); R.rect(0, 126, 319, 128, P.madera[3]); R.rect(0, 129, 319, 129, P.madera[0]);
      R.rect(0, 150, 319, 153, P.madera[1]); R.rect(0, 150, 319, 150, P.madera[3]);
      a_suelo(R, P.madera, 154, 160, 60, 7);
      for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const d = y - 160, borde = d < 2 || d > 16; R.pset(x, y, borde ? (d === 0 || d === 18 ? P.oro[1] : P.oro[2]) : a_rampa(P.alfombra, 1.8 + ((x + Math.abs(d - 9) * 2) % 10 < 2 ? 1 : 0) + (h(x, y, 470) - 0.5) * 0.4, x, y)); }
      a_puerta(R, P, D[0], D[1], D[2], D[3], {});
      a_cadenas(R, P, D[0], D[1], D[2], D[3], 1.8);
      for (const ax of [56, 264]) a_aplique(R, P, ax, 72);
      // un cuadro torcido con el retrato en silueta del científico y un cartel de calavera clavado en la puerta
      a_cuadro(R, P, 18, 30, 50, 70, 3, (x, y) => { const d = Math.hypot(x - 34, y - 44); if (y > 52 && Math.abs(x - 34) < 12 - (70 - y) * 0.3) return hex('#2a1a2a'); if (d < 7) return hex('#2a1a2a'); if (y < 40 && Math.abs(x - 34) < 10 && (x + y) % 3 === 0) return hex('#2a1a2a'); return a_rampa(P.papel2, 2.4 - (y - 30) * 0.03, x, y); });
      a_cuadro(R, P, 268, 92, 300, 118, -2, (x, y) => a_rampa(y < 106 ? P.cupula : P.cesped, 1.6 + (y < 106 ? (106 - y) * 0.05 : 0) + (h(x >> 1, y >> 1, 471) - 0.5), x, y));
    });
    R.copiar(fondo);
    // la luz que se escapa por debajo de la puerta (algo hay detrás) y el ojo de la cerradura que se enciende
    { const u = 0.5 + 0.5 * Math.sin(t * 2.4) * Math.sin(t * 0.9 + 1); for (let x = D[0]; x <= D[2]; x++) { R.pset(x, D[3], a_mezcla(hex('#2a8a2a'), hex('#c8ff8a'), u)); if (a_bay4(x, 0) < u * 0.8) R.pset(x, D[3] + 1, a_mezcla(R.pget(x, D[3] + 1), hex('#8ae86a'), 0.4)); }
      for (let y = D[3] + 2; y < D[3] + 10; y++) for (let x = D[0] - 8; x <= D[2] + 8; x++) if (a_bay4(x, y) < u * 0.35 * (1 - (y - D[3]) / 10)) R.pset(x, y, a_mezcla(R.pget(x, y), hex('#8ae86a'), 0.3)); }
    for (const [ax, k] of [[56, 0], [264, 1]]) a_llama(R, t, ax, 72, k);
    for (let k = 0; k < 6; k++) { const x = Math.round(30 + ((h(k, 1, 472) * 260 + t * 3) % 260)), y = Math.round(40 + ((h(k, 2, 472) * 90 + Math.sin(t + k) * 8))); if (Math.sin(t * 1.4 + k) > 0) R.pset(x, y, hex('#d8d0b8')); }
    return { suelo: 168, pies: [20, 300], puerta: D, cerradura: [160, Math.round((D[1] + D[3]) / 2 + 11)], libre: [[20, 100], [220, 300]] };
  }
  const fondo = a_capa(R, clave + ':fondo', false, () => {
    a_papel(R, P.papel2, 0, 12, 319, 104, 4, 0.03);
    a_tablero(R, P.madera, 0, 0, 319, 11, 4, 8, -0.5); R.rect(0, 11, 319, 12, P.madera[0]); for (let x = 0; x < 320; x += 4) R.rect(x, 12, x + 1, 13, P.madera[2]);
    a_tablero(R, P.madera, 0, 104, 319, 134, 6, 9, -0.2);
    for (let x = 6; x < 320; x += 34) { R.rect(x, 110, x + 26, 110, P.madera[3]); R.rect(x, 110, x, 128, P.madera[3]); R.rect(x, 128, x + 26, 128, P.madera[0]); R.rect(x + 26, 110, x + 26, 128, P.madera[0]); }
    R.rect(0, 102, 319, 105, P.madera[2]); R.rect(0, 102, 319, 102, P.madera[3]); R.rect(0, 132, 319, 135, P.madera[1]); R.rect(0, 132, 319, 132, P.madera[3]);
    a_suelo(R, P.madera, 136, 160, 40, 9);
    // la alfombra larga con cenefa dorada
    for (let y = 146; y < 172; y++) for (let x = 0; x < 320; x++) { const d = y - 146, borde = d < 2 || d > 23; R.pset(x, y, borde ? (d === 0 || d === 25 ? P.oro[1] : P.oro[2]) : a_rampa(P.alfombra, 1.7 + ((x + Math.abs(d - 12) * 3) % 14 < 2 ? 1 : 0) + ((x % 28) < 1 ? -0.8 : 0) + (h(x, y, 473) - 0.5) * 0.4 + (d - 12) * 0.02, x, y)); }
    // las tres puertas: la entreabierta con luz verde, la cerrada para siempre y una normal
    a_puerta(R, P, 18, 60, 52, 134, { entorna: 0.55 });
    a_puerta(R, P, 142, 60, 178, 134, {}); a_cadenas(R, P, 142, 60, 178, 134, 0.9);
    a_puerta(R, P, 264, 60, 298, 134, { pomoIzq: true });
    // el retrato del científico (los ojos se mueven en la parte viva) y el paisaje torcido sobre la consola
    a_cuadro(R, P, 66, 28, 98, 74, -2, (x, y) => { const d = Math.hypot(x - 82, y - 46); if (y > 58 && Math.abs(x - 82) < 13 - (74 - y) * 0.25) return y > 62 && Math.abs(x - 82) < 3 ? hex('#f2f0e8') : hex('#e8e4dc'); if (d < 8) return a_rampa([hex('#a86a4a'), hex('#d09068'), hex('#f0b890'), hex('#ffd8b8')], 2.4 - (x - 82) * 0.1, x, y); if (y < 44 && Math.abs(x - 82) < 12 && h(x, y, 474) < 0.6) return hex('#f2f0f0'); return a_rampa(P.papel, 1.4 + (y - 28) * 0.02, x, y); });
    a_cuadro(R, P, 206, 32, 252, 66, 4, (x, y) => { const sky = y < 50 + Math.sin(x * 0.2) * 3; return sky ? a_rampa(P.cupula, 2.4 - (y - 32) * 0.05 + (h(x >> 2, y >> 1, 475) < 0.2 ? 0.6 : 0), x, y) : a_rampa(P.cesped, 1.7 + (h(x >> 1, y, 476) - 0.5) * 0.9, x, y); });
    a_cuadro(R, P, 116, 34, 130, 50, -1, (x, y) => (Math.abs(x - 123) < 3 - (y < 38 ? (38 - y) * 0.5 : 0) && y > 35 ? P.cono[2] : a_rampa(P.moldura, 2, x, y)));   // un tentáculo en un cuadrito
    // el reloj de pie
    R.rect(104, 62, 126, 134, P.madera[0]); R.rect(106, 64, 124, 132, P.madera[2]); R.poligono([[102, 64], [128, 64], [115, 54]], P.madera[1]); R.rect(106, 64, 124, 64, P.madera[3]);
    R.disco(115, 74, 7, P.oro[1]); R.disco(115, 74, 6, hex('#f2ecd8')); for (let k = 0; k < 12; k++) R.pset(Math.round(115 + Math.cos(k * Math.PI / 6) * 4.6), Math.round(74 + Math.sin(k * Math.PI / 6) * 4.6), hex('#3a2a2a'));
    R.rect(109, 86, 121, 124, hex('#1a0e0a')); R.rect(108, 85, 122, 85, P.madera[3]);
    a_sombra(R, 116, 135, 14, 2, 0.35);
    // la consola con un jarrón de flores mustias y un candelabro
    R.rect(212, 112, 248, 116, P.madera[2]); R.rect(212, 112, 248, 112, P.madera[3]); R.rect(214, 117, 246, 120, P.madera[1]); for (const lx of [215, 244]) R.rect(lx, 116, lx + 1, 134, P.madera[0]);
    a_sombra(R, 230, 135, 20, 2, 0.35);
    R.poligono([[220, 112], [228, 112], [229, 104], [226, 100], [222, 100], [219, 104]], P.contra[2]); R.rect(221, 101, 222, 110, P.contra[3]);
    for (const [a, b] of [[-5, -10], [0, -14], [5, -9]]) { R.linea(224, 100, 224 + a, 100 + b, P.seco[1]); R.disco(224 + a, 100 + b, 1.4, P.cono[1]); }
    R.rect(238, 104, 239, 112, P.oro[1]); R.rect(234, 104, 243, 105, P.oro[1]); for (const cx of [234, 238, 243]) R.rect(cx, 99, cx, 103, hex('#f2ecd8'));
    for (const ax of [60, 136, 190, 258]) a_aplique(R, P, ax, 66);
    // telarañas en los rincones de arriba
    for (const [cx, sd] of [[0, 1]]) { for (let a = 0; a < 5; a++) { const an = a / 4 * Math.PI / 2; R.linea(cx, 13, cx + sd * Math.cos(an) * 20, 13 + Math.sin(an) * 20, hex('#c8c8d0')); } for (const r of [7, 13, 19]) for (let a = 0; a < 12; a++) { const an = a / 11 * Math.PI / 2; R.pset(Math.round(cx + sd * Math.cos(an) * r), Math.round(13 + Math.sin(an) * r), hex('#a8a8b8')); } }
  });
  R.copiar(fondo);
  // la parte viva: llamas, los ojos del retrato que siguen, el péndulo, la luz verde que late tras la puerta entreabierta,
  // la lámpara que oscila con su charco de luz en la alfombra, un ratón que cruza junto al rodapié
  for (const [ax, k] of [[60, 0], [136, 1], [190, 2], [258, 3]]) a_llama(R, t, ax, 66, k);
  { const mx = Math.round(Math.sin(t * 0.8) * 1.4); for (const ex of [79, 85]) { R.pset(ex, 45, hex('#ffffff')); R.pset(ex + mx, 45, hex('#1a1010')); } }
  { const a = Math.sin(t * 2.6) * 0.3; R.recorte([109, 86, 121, 124]); const px = 115 + Math.sin(a) * 30, py = 86 + Math.cos(a) * 30; R.linea(115, 86, px, py, P.oro[1]); R.disco(px, py, 3, P.oro[2]); R.pset(Math.round(px) - 1, Math.round(py) - 1, P.oro[3]); R.recorte(null); }
  { const u = 0.5 + 0.5 * Math.sin(t * 3.1); for (let y = 60; y <= 134; y++) for (let x = 19; x < 34; x++) if (a_bay4(x, y) < 0.2 + u * 0.25 - (x - 19) / 40) R.pset(x, y, a_mezcla(R.pget(x, y), hex('#8ae86a'), 0.45));
    for (let y = 135; y < 150; y++) for (let x = 18; x < 64; x++) if (a_bay4(x, y) < (0.25 + u * 0.2) * (1 - (y - 135) / 15) * (1 - Math.abs(x - 34) / 30)) R.pset(x, y, a_mezcla(R.pget(x, y), hex('#8ae86a'), 0.35));
    if (Math.floor(t / 1.7) % 3 === 0) { R.pset(26, 92, hex('#e8ff6a')); R.pset(30, 92, hex('#e8ff6a')); } }
  { const a = Math.sin(t * 1.3) * 0.22, lx = 160 + Math.sin(a) * 34, ly = 4 + Math.cos(a) * 34;
    for (let y = 150; y < 176; y++) for (let x = Math.round(lx - 44); x <= Math.round(lx + 44); x++) { const d = ((x - lx) / 44) ** 2 + ((y - 162) / 12) ** 2; if (d < 1 && a_bay4(x, y) < 0.55 * (1 - d)) R.pset(x, y, a_mezcla(R.pget(x, y), hex('#fff0b0'), 0.18)); }
    R.linea(160, 0, lx, ly - 8, P.metal[0]);
    R.poligono([[lx - 9, ly - 6], [lx + 9, ly - 6], [lx + 6, ly + 2], [lx - 6, ly + 2]], P.oro[1]); R.rect(Math.round(lx - 9), Math.round(ly - 6), Math.round(lx + 9), Math.round(ly - 6), P.oro[3]);
    for (const dx of [-7, 0, 7]) { R.rect(Math.round(lx + dx), Math.round(ly - 11), Math.round(lx + dx), Math.round(ly - 7), hex('#f2ecd8')); a_llama(R, t, Math.round(lx + dx), Math.round(ly - 2), dx); }
    R.disco(lx, ly + 3, 1.6, P.oro[2]); }
  { const u = (t * 0.17) % 1; if (u < 0.6) { const x = Math.round(330 - u / 0.6 * 350), f = Math.floor(t * 14) % 2; R.rect(x, 133, x + 4, 134, hex('#7a7280')); R.pset(x - 1, 133, hex('#9a92a0')); R.pset(x, 132, hex('#c8a0b0')); R.pset(x - 2, 134, hex('#1a1010')); R.linea(x + 5, 134, x + 9, 133 - f, hex('#c8a0b0')); } }
  for (let k = 0; k < 8; k++) { const x = Math.round(120 + ((h(k, 1, 477) * 80 + Math.sin(t * 0.6 + k) * 6))), y = Math.round(40 + ((h(k, 2, 477) * 100 + t * 2.5) % 100)); if (Math.sin(t * 1.2 + k) > 0) R.pset(x, y, hex('#e8e0c0')); }
  return { suelo: 160, pies: [10, 310], puertas: [[18, 60, 52, 134], [142, 60, 178, 134], [264, 60, 298, 134]], cerrada: [142, 60, 178, 134], entreabierta: [18, 60, 52, 134], lampara: [160, 30], alfombra: [146, 171] };
}

const b_PARED = b_P('#8a7656', '#a08a66', '#b49e78', '#c6b088', '#d6c29a', '#e2d0aa');

const b_FRISO = b_P('#3a2214', '#5e3a1e', '#7a4e28', '#94622e', '#ae7a3e');

const b_MESA = b_P('#4a2e18', '#7a4e28', '#9a6634', '#b8844a', '#d4a466');

const b_MOQ = b_P('#3e2a24', '#56382c', '#6a4634', '#7e563e', '#92664a');

const b_TECHO = b_P('#8a8478', '#a8a294', '#c4beae', '#d8d2c2');

// el techo, la moldura, la pared, el friso y la moqueta de la sala (comunes a los encuadres generales)
function b_sala(R, lx, ly, luzSuelo, motivo = hex('#9a5a3a')) {
  b_techo(R, 0, 9, b_TECHO, 1); R.rect(0, 10, 319, 10, hex('#e8e0cc')); R.rect(0, 11, 319, 11, hex('#7a6a50'));
  b_pared(R, 0, 12, 319, 84, b_PARED, lx, ly, 260, 1);
  R.rect(0, 85, 319, 85, b_FRISO[4]); R.rect(0, 86, 319, 86, b_FRISO[2]); R.rect(0, 87, 319, 87, b_FRISO[0]);
  b_friso(R, 0, 88, 319, 108, b_FRISO, 11, 1);
  R.rect(0, 109, 319, 109, b_FRISO[0]); R.rect(0, 110, 319, 110, hex('#2a1a10')); R.rect(0, 111, 319, 111, hex('#1e140c'));
  b_moqueta(R, 112, b_MOQ, motivo, 1, luzSuelo);
  R.rect(0, 112, 319, 112, hex('#2a1c16'));
}

// un escritorio de madera visto un poco desde arriba: el tablero (y yt–yt+11), el frente con cajonera y tiradores, el
// hueco de las piernas en sombra y las patas (suelo en yt + 26), con su sombra en la moqueta
function b_escritorio(R, x0, x1, yt, k = 0, cajones = 'izq') {
  const { rect, pset } = R;
  b_sombra(R, (x0 + x1) / 2, yt + 27, (x1 - x0) / 2 + 4, 3, 0.35);
  rect(x0 - 1, yt - 1, x1 + 1, yt + 26, C.k);
  b_tablero(R, x0, yt, x1, yt + 10, b_MESA, 6, 20 + k);
  rect(x0, yt + 11, x1, yt + 11, b_MESA[4]); rect(x0, yt + 12, x1, yt + 12, b_MESA[1]);
  // el hueco de las piernas, en sombra, y las patas
  rect(x0, yt + 13, x1, yt + 25, hex('#24160e')); for (let y = yt + 13; y <= yt + 25; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 3) === 0) pset(x, y, hex('#2e1e14'));
  rect(x0, yt + 13, x0 + 2, yt + 25, b_MESA[1]); rect(x1 - 2, yt + 13, x1, yt + 25, b_MESA[1]); rect(x0, yt + 13, x0, yt + 25, b_MESA[3]);
  // el panel de recato al fondo del hueco
  rect(x0 + 3, yt + 13, x1 - 3, yt + 17, b_MESA[0]); rect(x0 + 3, yt + 18, x1 - 3, yt + 18, hex('#1a100a'));
  // la cajonera con sus tres cajones y tiradores de latón
  const cw = Math.min(22, Math.round((x1 - x0) * 0.32)), cx0 = cajones === 'izq' ? x0 : x1 - cw, cx1 = cx0 + cw;
  rect(cx0, yt + 13, cx1, yt + 25, b_MESA[2]);
  for (let i = 0; i < 3; i++) { const y = yt + 13 + i * 4; rect(cx0, y, cx1, y, C.k); rect(cx0 + 1, y + 1, cx1 - 1, y + 1, b_MESA[3]); rect(cx0 + Math.round(cw / 2) - 2, y + 2, cx0 + Math.round(cw / 2) + 2, y + 2, hex('#c8a040')); pset(cx0 + Math.round(cw / 2) - 2, y + 2, hex('#f0d080')); }
  rect(cx0, yt + 13, cx0, yt + 25, C.k); rect(cx1, yt + 13, cx1, yt + 25, C.k);
  rect(x0 - 1, yt + 26, x1 + 1, yt + 26, C.k);
}

// la CPU de sobremesa (una caja beige baja) con dos disqueteras de 5¼ y su piloto
function b_cpu(R, x0, y0, x1, y1) {
  const { rect, pset } = R; b_caja(R, x0, y0, x1, y1, b_BEIGE[2], b_BEIGE[4], b_BEIGE[1]);
  const w = Math.round((x1 - x0) * 0.32);
  for (let i = 0; i < 2; i++) { const dx = x1 - 4 - w - i * (w + 3), cy = Math.round((y0 + y1) / 2); rect(dx, cy - 2, dx + w, cy + 1, b_BEIGE[1]); rect(dx + 1, cy - 1, dx + w - 1, cy - 1, C.k); rect(dx + Math.round(w / 2) - 1, cy, dx + Math.round(w / 2) + 1, cy + 1, b_BEIGE[0]); }
  rect(x0 + 3, y1 - 3, x0 + 5, y1 - 2, hex('#c83a3a'));
  for (let x = x0 + 3; x < x0 + 3 + Math.round((x1 - x0) * 0.25); x += 2) rect(x, y0 + 2, x, y0 + 4, b_BEIGE[1]);
}

// un teclado beige en perspectiva (x0–x1, y0–y1): la caja y las filas de teclas con su canto
function b_teclado(R, x0, y0, x1, y1, P = b_BEIGE, tecla = 3) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P[2]); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, P[1]); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, P[3]);
  const filas = Math.max(2, Math.floor((y1 - y0 - 3) / (tecla))), tw = tecla + 1;
  for (let f = 0; f < filas; f++) { const y = y0 + 2 + f * tecla, off = (f % 2) * Math.round(tw / 2);
    for (let x = x0 + 3 + off; x + tw - 1 < x1 - 2; x += tw + 1) { const espacio = f === filas - 1 && x > x0 + (x1 - x0) * 0.3 && x < x0 + (x1 - x0) * 0.62;
      if (espacio) { if (x < x0 + (x1 - x0) * 0.3 + tw + 1) { rect(x, y, Math.round(x0 + (x1 - x0) * 0.62), y + tecla - 2, P[4]); rect(x, y + tecla - 2, Math.round(x0 + (x1 - x0) * 0.62), y + tecla - 2, P[1]); } continue; }
      rect(x, y, x + tw - 1, y + tecla - 2, h(x, f, 470) < 0.18 ? P[1] : P[4]); rect(x, y + tecla - 2, x + tw - 1, y + tecla - 2, P[1]); if (tecla > 3) pset(x, y, hex('#ffffff')); } }
}

// un disquete de 3½ (s 1: 8 × 8) o de 5¼ (o.grande) visto de frente, de color c, con su etiqueta
function b_disquete(R, x, y, c, s = 1, cinco = false) {
  const { rect, pset } = R, w = (cinco ? 11 : 8) * s - 1;
  rect(x, y, x + w, y + w, C.k); rect(x + 1, y + 1, x + w - 1, y + w - 1, c);
  if (cinco) { R.disco(x + w / 2 + 0.5, y + w / 2 + 0.5, 2 * s, C.k); rect(x + Math.round(w / 2) - s, y + w - 3 * s, x + Math.round(w / 2) + s, y + w - 1, C.k); rect(x + 2, y + 1, x + w - 2, y + 3 * s, hex('#f2eee2')); }
  else { rect(x + 2 * s, y + 1, x + w - 2 * s, y + 3 * s, hex('#c8ccd8')); rect(x + w - 3 * s, y + 1, x + w - 2 * s - 1, y + 2 * s, hex('#5e6270')); rect(x + 2 * s, y + w - 4 * s + 1, x + w - 2 * s, y + w - 1, hex('#f2eee2')); }
  pset(x + 1, y + 1, b_mezcla(c, C.blanco, 0.4));
}

// una taza en (x, base y) con su vapor que sube y se ondula
function b_taza(R, x, y, t, c, vapor = true) {
  const { rect, pset } = R; rect(x - 3, y - 6, x + 3, y, C.k); rect(x - 2, y - 5, x + 2, y - 1, c); rect(x - 2, y - 5, x - 1, y - 1, b_mezcla(c, C.blanco, 0.35)); rect(x + 4, y - 4, x + 5, y - 2, C.k); pset(x + 4, y - 3, c); rect(x - 2, y - 5, x + 2, y - 5, hex('#3a2014'));
  if (vapor) for (let k = 0; k < 3; k++) { const f = ((t * 0.7 + k / 3) % 1), yy = Math.round(y - 7 - f * 9), xx = Math.round(x - 1 + k + Math.sin(t * 2.4 + k * 2 + f * 5) * 1.5); if (f < 0.85) pset(xx, yy, f < 0.5 ? hex('#f2eee2') : hex('#c8c2b8')); }
}

// una planta de interior en su maceta (x, base y), escala s, con las hojas que se mecen un poco
function b_planta(R, x, y, t, s = 1) {
  const { rect } = R, ph = Math.round(7 * s), pw = Math.round(5 * s);
  for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.34 + Math.sin(t * 0.8 + k) * 0.04, L = (9 + (k % 3) * 4) * s;
    for (let d = 1; d < L; d++) { const px = Math.round(x + Math.cos(a) * d), py = Math.round(y - ph + Math.sin(a) * d + d * d / (L * 2.2)); R.pset(px, py, d < L * 0.5 ? hex('#2e6a3a') : hex('#4a9a4a')); if (d > 2 && d % 3 === 0) R.pset(px + 1, py, hex('#6ab85a')); } }
  rect(x - pw, y - ph, x + pw, y, C.k); rect(x - pw + 1, y - ph + 1, x + pw - 1, y - 1, hex('#b8603a')); rect(x - pw + 1, y - ph + 1, x - pw + 2, y - 1, hex('#d8804a')); rect(x - pw, y - ph, x + pw, y - ph + 1, hex('#c86a40'));
}

// un reloj de pared redondo en (cx, cy) de radio r: esfera con marcas y las agujas que andan (la del segundero, roja)
function b_reloj(R, cx, cy, r, t) {
  R.disco(cx, cy, r + 1, C.k); R.disco(cx, cy, r, hex('#c8c0b0')); R.disco(cx, cy, r - 1, hex('#f4f0e6'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), k % 3 ? hex('#8a8478') : C.k); }
  const s = t % 60, m = 23 + t / 60, hh = 4 + m / 60;
  for (const [a, L, c] of [[hh / 12, r * 0.45, C.k], [m / 60, r * 0.7, C.k], [s / 60, r * 0.8, hex('#c83a3a')]]) { const an = a * Math.PI * 2 - Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(an) * L), Math.round(cy + Math.sin(an) * L), c); }
  R.pset(cx, cy, hex('#c8a040'));
}

// un fluorescente del techo (x0–x1, y): la caja, los dos tubos y el parpadeo de vez en cuando
function b_fluorescente(R, x0, x1, y, t, k = 0) {
  const { rect } = R, f = h(Math.floor(t * 10), k, 480), on = f > 0.05;
  rect(x0, y, x1, y + 4, C.k); rect(x0 + 1, y + 1, x1 - 1, y + 3, hex('#b8b4a8'));
  for (const yy of [y + 1, y + 3]) rect(x0 + 2, yy, x1 - 2, yy, on ? hex('#fbfbf2') : hex('#a8b0a8'));
  rect(x0 + 2, y + 2, x1 - 2, y + 2, hex('#d8d8cc')); for (let x = x0 + 4; x < x1 - 2; x += 6) R.pset(x, y + 2, hex('#9a968a'));
}

// los bocetos a lápiz del corcho y la pizarra ('#' trazo): barco pirata, mono, mansión, tentáculo, fantasma, calavera
const b_BOCETOS = {
  barco: ['.......#........', '......##.#......', '.....#.#.##.....', '....#..#.#.#....', '...#...#.#..#...', '..#....#.#...#..', '..######.#####..', '.......#........', '################', '.#..#..#..#..#..', '..############..'],
  mono: ['...########...', '..#........#..', '.#..##..##..#.', '#..#..##..#..#', '#..#.#..#.#..#', '#...##..##...#', '.#....##....#.', '..#..####..#..', '...#......#...', '....######....'],
  mansion: ['.......#.......', '......###......', '..#..#####..#..', '.###.#.#.#.###.', '.#.#.#####.#.#.', '.###.#.#.#.###.', '.#.#.#####.#.#.', '.###.##.##.###.', '###############'],
  tentaculo: ['....###...', '...#####..', '..#.#.#.#.', '..#######.', '..#.....#.', '..#######.', '...#####..', '...#####..', '..#######.', '.#########'],
  fantasma: ['.....######.....', '....########....', '...#.#.##.#.#...', '...##########...', '...#..####..#...', '....##.##.##....', '...#.##..##.#...', '..#..#....#..#..', '..#..#....#..#..', '...##......##...'],
  calavera: ['...#####...', '..#######..', '.#.##.##.#.', '.#########.', '..##.#.##..', '...#####...', '...#.#.#...'],
  retrete: ['..####..', '..#..#..', '..####..', '.######.', '.#....#.', '.######.', '..#..#..', '..####..'],
  perro: ['..##...##.', '.#..###..#', '.#.#.#.#.#', '..#..#..#.', '..#.###.#.', '...#...#..', '...#####..', '..#.....#.', '..#.#.#.#.'],
};

function b_boceto(R, nombre, x, y, c, s = 1) { (b_BOCETOS[nombre] ?? []).forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); }); }

// una hoja de papel con chincheta y un boceto (o renglones), de w × hh, ligeramente torcida si se pide
function b_hojaBoceto(R, x, y, w, hh, dibujo, k = 0, pin = hex('#c83a3a')) {
  const { rect, pset } = R; rect(x + 1, y + 1, x + w + 1, y + hh + 1, hex('#5e4026'));
  rect(x, y, x + w, y + hh, k % 3 === 1 ? hex('#f2e8b8') : hex('#f4f0e6')); rect(x, y + hh, x + w, y + hh, hex('#c8c0b0')); rect(x + w, y, x + w, y + hh, hex('#d8d0c0'));
  if (dibujo) { const f = b_BOCETOS[dibujo]; b_boceto(R, dibujo, x + Math.round((w - f[0].length) / 2) + 1, y + Math.round((hh - f.length) / 2) + 1, hex('#4a4a5a')); }
  else for (let l = 0; l < Math.floor((hh - 4) / 3); l++) R.linea(x + 2, y + 3 + l * 3, x + w - 2 - Math.round(h(l, k, 481) * 6), y + 3 + l * 3, hex('#8a8aa0'));
  R.disco(x + Math.round(w / 2), y + 1, 1, pin); pset(x + Math.round(w / 2) - 1, y, C.blanco);
}

// el corcho (x0–x1, y0–y1) con su marco de madera, el grano y un surtido de bocetos
function b_corcho(R, x0, y0, x1, y1, hojas) {
  const { rect } = R; rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); rect(x0, y0, x1, y1, b_FRISO[3]); rect(x0, y0, x1, y0, b_FRISO[4]); rect(x0, y1, x1, y1, b_FRISO[1]);
  for (let y = y0 + 2; y <= y1 - 2; y++) for (let x = x0 + 2; x <= x1 - 2; x++) { const g = h(x, y, 482); R.pset(x, y, g < 0.22 ? hex('#a07446') : g > 0.85 ? hex('#d0a476') : hex('#b88a5a')); }
  for (const [x, y, w, hh, d, k] of hojas) b_hojaBoceto(R, x, y, w, hh, d, k, [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a')][k % 4]);
}

// una persona pequeña de fondo (de 9–11 px) que anda o se queda: cabeza, pelo, ropa de color c y piernas
function b_gente(R, x, suelo, t, c, pelo = hex('#3a2418'), anda = 0) {
  const { rect, pset } = R, p = anda ? Math.floor(t * 6 + x) % 2 : 0; x = Math.round(x);
  rect(x - 1, suelo - 4, x - 1, suelo - (p ? 1 : 0), hex('#2a2a3a')); rect(x + 1, suelo - 4, x + 1, suelo - (p ? 0 : 1), hex('#2a2a3a'));
  rect(x - 2, suelo - 8, x + 2, suelo - 4, c); pset(x - 2, suelo - 8, b_mezcla(c, C.blanco, 0.3));
  rect(x - 1, suelo - 11, x + 1, suelo - 9, hex('#f0c090')); rect(x - 1, suelo - 11, x + 1, suelo - 11, pelo); pset(x - 2, suelo - 10, pelo);
}

// un ventilador de mesa (base en (x, y)) con las aspas que giran tras la rejilla
function b_ventilador(R, x, y, t) {
  const { rect } = R; rect(x - 4, y - 2, x + 4, y, C.k); rect(x - 3, y - 2, x + 3, y - 1, hex('#5a6a7a')); rect(x, y - 9, x + 1, y - 2, hex('#3a4a5a'));
  const cx = x, cy = y - 13; R.disco(cx, cy, 6, hex('#2a3440'));
  for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.094; for (let d = 1; d < 6; d++) for (const e of [-0.25, 0, 0.25]) R.pset(Math.round(cx + Math.cos(a + e) * d), Math.round(cy + Math.sin(a + e) * d), hex('#b8c8d8')); }
  for (let a = 0; a < 6.28; a += 0.3) R.pset(Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), hex('#c8d0d8'));
  R.linea(cx - 6, cy, cx + 6, cy, hex('#8a98a8')); R.linea(cx, cy - 6, cx, cy + 6, hex('#8a98a8')); R.disco(cx, cy, 1, hex('#e8e8f0'));
}

// la máquina de escribir (base en (x, y), unos 32 × 16): el carro que corre con o.hoja, el papel con los renglones sin
// letras que van saliendo, las teclas y las barras que golpean; fin: el pulgar abajo dibujado en la hoja
function b_maquina(R, x, y, t, hoja = 0, pulgar = true) {
  const { rect, pset } = R, P = b_P('#1e2a2a', '#2e4040', '#46605a', '#6a8a80');
  const lineas = Math.floor(hoja * 7), car = Math.round(((hoja * 7) % 1) * 12), escribe = hoja > 0 && hoja < 1;
  // el papel que sale del rodillo
  const px = x - 9 - car, py = y - 30; rect(px, py, px + 18, y - 11, C.k); rect(px + 1, py + 1, px + 17, y - 11, hex('#f6f2ea')); rect(px + 17, py + 1, px + 17, y - 11, hex('#d8d0c0'));
  for (let l = 0; l < Math.min(6, lineas); l++) R.linea(px + 3, py + 3 + l * 2, px + 3 + Math.round(8 + h(l, 1, 483) * 6), py + 3 + l * 2, hex('#4a4a5a'));
  if (pulgar && hoja >= 1) { const qx = px + 11, qy = py + 15; rect(qx - 3, qy - 3, qx + 1, qy + 1, hex('#c83a3a')); rect(qx - 2, qy + 2, qx - 1, qy + 4, hex('#c83a3a')); rect(qx - 2, qy - 2, qx, qy, hex('#f6f2ea')); }
  // el carro con el rodillo y las palancas
  rect(x - 16 - car, y - 13, x + 14 - car, y - 9, C.k); rect(x - 15 - car, y - 12, x + 13 - car, y - 10, P[1]); rect(x - 15 - car, y - 12, x + 13 - car, y - 12, P[3]);
  rect(x - 18 - car, y - 12, x - 16 - car, y - 10, hex('#c8c8d0')); rect(x + 14 - car, y - 13, x + 16 - car, y - 12, hex('#c8c8d0'));
  // el cuerpo, las teclas en tres filas y las barras
  R.poligono([[x - 15, y - 9], [x + 15, y - 9], [x + 17, y], [x - 17, y]], C.k); R.poligono([[x - 14, y - 8], [x + 14, y - 8], [x + 16, y - 1], [x - 16, y - 1]], P[2]);
  rect(x - 14, y - 8, x + 14, y - 8, P[3]); rect(x - 6, y - 8, x + 6, y - 6, P[0]);
  for (let f = 0; f < 3; f++) for (let i = 0; i < 9 - f; i++) { const kx = x - 13 + f + i * 3, ky = y - 5 + f * 2; pset(kx, ky, hex('#e8e4d8')); pset(kx + 1, ky, hex('#c8c4b8')); }
  if (escribe && Math.floor(t * 9) % 2) { const bx = x - 2 + Math.round(h(Math.floor(t * 9), 2, 484) * 4); R.linea(bx, y - 6, x, y - 10, hex('#c8c8d0')); }
}

// la puerta de madera con su cristal esmerilado (por el que pasa alguien) y el pomo: lo fijo y lo que se mueve
function b_puertaCristal(R, x0, y0, x1, y1, t, fijo) {
  const { rect, pset } = R, g = [x0 + 6, y0 + 7, x1 - 6, y0 + 31];
  if (fijo) {
    rect(x0 - 3, y0 - 3, x1 + 3, y1, C.k); rect(x0 - 2, y0 - 2, x1 + 2, y1, b_FRISO[3]); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, b_FRISO[4]);
    b_friso(R, x0, y0, x1, y1, b_P('#5a3820', '#7a4e2c', '#9a6638', '#b47e48', '#c8945a'), 30, 5);
    rect(x0 + 3, y0 + 36, x1 - 3, y0 + 37, b_FRISO[1]); rect(x0 + 3, y0 + 38, x1 - 3, y0 + 38, b_FRISO[4]);
    rect(x0 + 3, y1 - 26, x1 - 3, y1 - 6, b_FRISO[2]); rect(x0 + 3, y1 - 26, x1 - 3, y1 - 26, b_FRISO[0]); rect(x0 + 3, y1 - 6, x1 - 3, y1 - 6, b_FRISO[4]);
    rect(g[0] - 1, g[1] - 1, g[2] + 1, g[3] + 1, C.k);
    rect(x0 + 3, y0 + 41, x0 + 5, y0 + 43, hex('#c8a040')); pset(x0 + 3, y0 + 41, hex('#f0d080')); return g;
  }
  // el cristal esmerilado: luz del pasillo y, de vez en cuando, la sombra borrosa de alguien que pasa
  for (let y = g[1]; y <= g[3]; y++) for (let x = g[0]; x <= g[2]; x++) pset(x, y, b_tono(b_P('#a8b8bc', '#c0ccce', '#d8e2e0'), 0.75 - (y - g[1]) / 40 + h(x, y, 485) * 0.25, x, y));
  const u = (t % 9) / 4; if (u < 1) { const sx = Math.round(g[0] - 6 + u * (g[2] - g[0] + 12));
    for (let y = g[1] + 4; y <= g[3]; y++) for (let x = sx - 3; x <= sx + 3; x++) { if (x < g[0] || x > g[2]) continue; const cab = y < g[1] + 10, d = cab ? Math.hypot(x - sx, y - g[1] - 7) < 3 : Math.abs(x - sx) < 4; if (d && ((x + y) & 1 || !cab)) pset(x, y, hex('#7a8488')); } }
  for (let k = 0; k < 3; k++) pset(g[0] + 2 + k, g[1] + 6 - k, hex('#eef4f2'));
  return g;
}

function b_estOficina(R, t, o, anyo) {
  const color = anyo >= 1989, A = [12, 86], B = [112, 192], Cc = [216, 270], yt = 124;
  const g = b_fondo(R, 'est-oficina|' + (color ? 1 : 0), () => {
    b_sala(R, 46, 46, [10, 82, 0.9]);
    // la ventana: marco, alféizar con un cactus y una caja de disquetes
    R.rect(8, 18, 82, 84, C.k); R.rect(9, 19, 81, 83, hex('#e8e2d2')); R.rect(9, 19, 81, 19, hex('#ffffff')); R.rect(11, 21, 79, 81, hex('#8a8272'));
    R.rect(44, 21, 45, 81, hex('#e8e2d2')); R.rect(5, 82, 85, 85, hex('#f0eadc')); R.rect(5, 85, 85, 85, hex('#a89e88')); R.rect(5, 86, 85, 86, C.k);
    b_planta(R, 20, 82, 0, 0.55); R.rect(64, 76, 76, 81, C.k); R.rect(65, 77, 75, 81, hex('#3a3a4a')); for (let i = 0; i < 4; i++) R.rect(66 + i * 2, 74 - (i % 2), 67 + i * 2, 77, [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a')][i]);
    // el corcho con bocetos, el cartel del barco al atardecer (sin letras) y la estantería con archivadores y cajas
    b_corcho(R, 94, 22, 148, 66, [[97, 25, 18, 14, 'barco', 0], [118, 24, 14, 12, 'mono', 1], [134, 26, 12, 12, null, 2], [98, 42, 15, 12, 'mansion', 3], [116, 40, 12, 13, 'tentaculo', 0], [131, 41, 14, 11, 'calavera', 1], [104, 56, 12, 8, null, 2]]);
    { const x0 = 158, y0 = 20, x1 = 188, y1 = 60; R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); R.rect(x0, y0, x1, y1, hex('#f4f0e6'));
      for (let y = y0 + 2; y < y1 - 8; y++) for (let x = x0 + 2; x <= x1 - 2; x++) { const u = (y - y0 - 2) / (y1 - y0 - 10); R.pset(x, y, u > 0.72 ? b_tono(b_P('#1e3a6a', '#2a5a8a', '#4a7aa8'), 0.5 + Math.sin(x * 0.7 + y) * 0.3, x, y) : b_tono(b_P('#c8503a', '#e87a3a', '#f0a84a', '#f8d070'), u * 1.3, x, y)); }
      R.disco(173, 41, 5, hex('#fff0a0')); R.recorte([x0 + 2, y0 + 2, x1 - 2, y1 - 9]); R.disco(173, 41, 5, hex('#fff0a0')); R.recorte(null);
      R.rect(x0 + 2, 46, x1 - 2, 46, hex('#fff0a0'));
      b_boceto(R, 'barco', 165, 36, hex('#2a1e2a')); R.rect(x0 + 3, y1 - 6, x1 - 3, y1 - 5, hex('#c83a3a')); R.rect(x0 + 6, y1 - 3, x1 - 6, y1 - 3, hex('#8a8aa0')); }
    R.rect(212, 50, 272, 52, C.k); R.rect(213, 50, 271, 50, b_FRISO[4]); R.rect(213, 51, 271, 51, b_FRISO[2]); for (const bx of [218, 266]) { R.rect(bx, 53, bx + 1, 57, hex('#5e6270')); R.pset(bx + 2, 53, hex('#5e6270')); }
    { let x = 214; const cols = [hex('#3a6ab8'), hex('#c83a3a'), hex('#e0b040'), hex('#3a8a5a'), hex('#7a4ab0'), hex('#d8d0c0')]; for (let k = 0; k < 7; k++) { R.rect(x, 37, x + 4, 49, C.k); R.rect(x + 1, 38, x + 3, 49, cols[k % 6]); R.rect(x + 1, 41, x + 3, 42, hex('#f2eee2')); R.pset(x + 2, 46, C.k); x += 5; }
      for (let k = 0; k < 3; k++) { const by = 49 - k * 4; R.rect(252, by - 3, 268, by, C.k); R.rect(253, by - 2, 267, by, [hex('#e8e0c8'), hex('#5a5a6a'), hex('#e8e0c8')][k]); R.rect(254, by - 2, 257, by - 2, [hex('#3a6ab8'), hex('#e8c040'), hex('#c83a3a')][k]); } }
    // la puerta de cristal esmerilado
    const gp = b_puertaCristal(R, 284, 50, 314, 111, 0, true);
    // los cables que bajan al enchufe del friso
    for (const [cx, ex] of [[52, 60], [150, 140], [244, 250]]) { R.linea(cx, yt + 1, ex, 104, hex('#1a1a20')); R.rect(ex - 2, 102, ex + 2, 106, hex('#e8e2d2')); R.pset(ex - 1, 104, C.k); R.pset(ex + 1, 104, C.k); }
    // los tres escritorios
    b_escritorio(R, A[0], A[1], yt, 0, 'izq'); b_escritorio(R, B[0], B[1], yt, 1, 'der'); b_escritorio(R, Cc[0], Cc[1], yt, 2, 'izq');
    // puesto A: monitor ámbar sobre su CPU, teclado, caja de disquetes, papeles
    b_cpu(R, 20, 116, 58, 126); const sA = b_monitor(R, 24, 92, 54, 116);
    b_teclado(R, 24, 128, 56, 133); R.rect(62, 125, 74, 131, C.k); R.rect(63, 126, 73, 130, hex('#3a3a4a')); for (let i = 0; i < 5; i++) R.rect(64 + i * 2, 123, 64 + i * 2, 126, [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a'), hex('#e8e0c8')][i]);
    b_disquete(R, 14, 128, hex('#3a3a4a')); R.rect(78, 127, 85, 133, hex('#f4f0e6')); R.rect(79, 129, 84, 129, hex('#8a8aa0')); R.rect(79, 131, 83, 131, hex('#8a8aa0'));
    // puesto B: monitor verde, CPU, teclado, flexo, papeles con bocetos y una pila de libros
    b_cpu(R, 122, 112, 172, 125); const sB = b_monitor(R, 128, 82, 166, 112);
    b_teclado(R, 126, 127, 168, 133); R.rect(172, 128, 177, 133, C.k); R.rect(173, 129, 176, 132, b_BEIGE[3]);
    b_hojaBoceto(R, 176, 124, 13, 9, null, 1); R.rect(114, 126, 120, 133, hex('#f4f0e6')); b_boceto(R, 'calavera', 114, 126, hex('#5a5a6a'));
    for (let k = 0; k < 3; k++) { R.rect(176, 118 - k * 3, 190, 120 - k * 3, C.k); R.rect(177, 119 - k * 3, 189, 120 - k * 3, [hex('#3a6ab8'), hex('#c83a3a'), hex('#3a8a5a')][k]); R.rect(177, 119 - k * 3, 178, 120 - k * 3, hex('#f2eee2')); }
    // el flexo de brazo, enganchado a la mesa
    R.linea(186, 112, 182, 96, C.k); R.linea(187, 112, 183, 96, hex('#3a3a4a')); R.linea(183, 96, 172, 90, C.k); R.linea(183, 97, 172, 91, hex('#3a3a4a')); R.poligono([[166, 88], [174, 86], [176, 93], [168, 95]], C.k); R.poligono([[167, 89], [173, 87], [175, 92], [169, 94]], hex('#c83a3a')); R.rect(185, 112, 189, 114, C.k);
    // puesto C: monitor de color (1989–1990) o la máquina de escribir (1987)
    let sC = null; if (color) { b_cpu(R, 224, 114, 262, 125); sC = b_monitor(R, 228, 88, 260, 114, { P: b_P('#5e5a50', '#8a8474', '#b0aa98', '#cec8b4', '#e4dece') }); b_teclado(R, 226, 127, 262, 133); }
    b_planta(R, 264, 128, 0, 0.7); b_disquete(R, 218, 127, hex('#c83a3a'));
    // la papelera con bolas de papel y un disquete tirado en la moqueta
    R.rect(96, 140, 106, 151, C.k); R.rect(97, 141, 105, 150, hex('#5a6a7a')); for (let x = 98; x < 105; x += 2) R.rect(x, 142, x, 149, hex('#3e4a58')); R.disco(99, 140, 2, hex('#f4f0e6')); R.disco(103, 139, 2, hex('#e8e2d2'));
    b_sombra(R, 101, 152, 6, 1, 0.3); b_disquete(R, 150, 166, hex('#3a6ab8')); R.disco(240, 172, 2, hex('#f4f0e6')); R.pset(239, 171, hex('#c8c0b0'));
    // primer término: el ficus alto en su macetero y la caja de cartón de un ordenador nuevo, con su flecha de «arriba»
    b_cajaCarton(R, 18, 160, 48, 179);
    return { sA, sB, sC, gp };
  });
  // lo que se mueve: el cielo por la ventana, el fluorescente, el reloj, las pantallas, pilotos, ventilador, vapor
  b_ventana(R, t, [12, 22, 43, 80], { palmeras: [[30, 46, -1]], persiana: 32, hor: 66 }); b_ventana(R, t + 3, [46, 22, 78, 80], { palmeras: [[64, 52, 1]], persiana: 32, hor: 66 });
  b_fluorescente(R, 186, 246, 2, t, 1); b_reloj(R, 204, 32, 8, t);
  b_cristal(R, g.sA, b_AMB, t); b_codigo(R, g.sA, t, b_AMB, 1); b_reflejo(R, g.sA);
  b_cristal(R, g.sB, b_FOS, t + 1);
  if (o.pantalla) o.pantalla(R, ...g.sB, t); else b_aventura(R, g.sB, t, b_FOS, { puerta: o.puerta, activo: o.activo ?? Math.floor(t / 1.5) % 9, paleta: 'fosforo' });
  b_reflejo(R, g.sB);
  if (g.sC) { b_cristal(R, g.sC, b_P('#0a0a1a', '#1a1a3a', '#3a3a6a', '#8a8ad8', '#e8e8ff'), t); b_pinturaPix(R, g.sC, t, (t * 0.12) % 1.2); b_reflejo(R, g.sC); }
  else b_maquina(R, 244, 130, t, o.hoja ?? ((t * 0.1) % 1.2), false);
  for (const [lx, on] of [[23, Math.floor(t * 3) % 5 === 0], [125, Math.floor(t * 2.3) % 4 === 1], [227, true]]) R.rect(lx, lx === 23 ? 123 : 122, lx + 2, lx === 23 ? 124 : 123, on ? hex('#f04a3a') : hex('#6a2a24'));
  b_ventilador(R, 74, 124, t); b_taza(R, 66 - 2, 133, t, hex('#c83a3a')); b_taza(R, 184, 133, t + 0.4, hex('#3a6ab8'), true);
  b_puertaCristal(R, 284, 50, 314, 111, t, false); b_ficus(R, 8, 179, t);
  // la hoja del corcho que levanta el aire del ventilador y las motas en la luz de la ventana
  if (Math.sin(t * 2.2) > 0.3) { R.rect(104, 57, 116, 58, hex('#b88a5a')); R.poligono([[104, 58], [116, 56], [115, 62], [104, 63]], hex('#f4f0e6')); R.linea(106, 59, 113, 58, hex('#8a8aa0')); }
  for (let k = 0; k < 14; k++) { const x = Math.round(16 + h(k, 1, 486) * 70 + Math.sin(t * 0.5 + k) * 4 + (h(k, 2, 486) * 50 + t * 2) % 50 * 0.6), y = Math.round(90 + (h(k, 3, 486) * 40 + t * (1 + h(k, 4, 486))) % 40); if (Math.sin(t * 1.3 + k * 2) > -0.1 && y < 122) R.pset(x, y, hex('#f8ecc8')); }
  return { suelo: 152, pies: [100, 204, 296], mesas: { A: [A[0], yt, A[1], yt + 26], B: [B[0], yt, B[1], yt + 26], C: [Cc[0], yt, Cc[1], yt + 26] }, pantalla: g.sB, pantallaA: g.sA, pantallaC: g.sC, teclado: [126, 127, 168, 133], puerta: [284, 50, 314, 111], ventana: [12, 22, 78, 80] };
}

// la aventura de dentro de un monitor (en una tinta P de cinco tonos): una habitación con su ventana y la luna, un
// cuadro, una lámpara, una puerta que se abre (o.puerta 0–1; sin ella, en bucle), un personajillo y, abajo, la línea de
// verbos en miniatura con el cursor que va de un verbo a la puerta; o.tachado: un teclado tachado encima
function b_aventura(R, s, t, P, o = {}) {
  const [x0, y0, x1, y1] = s, W = x1 - x0, H = y1 - y0, bar = Math.max(6, Math.round(H * (H > 60 ? 0.3 : 0.26))), ys = y1 - bar, suelo = Math.round(y0 + (ys - y0) * 0.78), cl = [x0 + 1, y0 + 1, x1 - 1, ys - 1];
  R.recorte(cl);
  // la pared con su papel de rayas, el zócalo y el suelo de damero
  for (let y = cl[1]; y < suelo; y++) for (let x = cl[0]; x <= cl[2]; x++) R.pset(x, y, ((x - x0) % 6 === 0) ? P[2] : (y & 1) ? P[1] : b_mezcla(P[1], P[2], 0.25));
  b_rc(R, cl, x0, suelo - 2, x1, suelo - 1, P[2]);
  for (let y = suelo; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) R.pset(x, y, ((Math.floor((x - x0 + (y - suelo) * 0.6) / 5) + Math.floor((y - suelo) / 3)) & 1) ? P[1] : P[2]);
  const sc = Math.max(1, Math.round(H / 60));
  // la ventana con la luna y el cuadro torcido
  const vx = x0 + Math.round(W * 0.12), vy = y0 + Math.round(H * 0.12), vw = Math.round(W * 0.16), vh = Math.round((suelo - y0) * 0.38);
  b_rc(R, cl, vx, vy, vx + vw, vy + vh, P[3]); b_rc(R, cl, vx + 1, vy + 1, vx + vw - 1, vy + vh - 1, P[0]); R.disco(vx + vw * 0.65, vy + vh * 0.35, Math.max(1, vw * 0.14), P[4]); b_rc(R, cl, vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh, P[3]);
  const cx = x0 + Math.round(W * 0.4), cy = y0 + Math.round(H * 0.14); R.poligono([[cx, cy + 1], [cx + vw * 0.8, cy], [cx + vw * 0.8 + 1, cy + vh * 0.55], [cx + 1, cy + vh * 0.55 + 1]], P[3]); R.poligono([[cx + 2, cy + 2], [cx + vw * 0.8 - 2, cy + 2], [cx + vw * 0.8 - 1, cy + vh * 0.55 - 1], [cx + 3, cy + vh * 0.55 - 1]], P[1]);
  // la lámpara que oscila
  { const lx = x0 + Math.round(W * 0.55), sw = Math.round(Math.sin(t * 2) * 2 * sc); R.linea(lx, y0 + 1, lx + sw, y0 + Math.round(H * 0.12), P[3]); R.poligono([[lx + sw - 3 * sc, y0 + H * 0.12 + 3 * sc], [lx + sw, y0 + H * 0.12], [lx + sw + 3 * sc, y0 + H * 0.12 + 3 * sc]], P[4]); }
  // la puerta, que se abre
  const pu = o.puerta ?? Math.max(0, Math.min(1, Math.sin(t * 0.7) * 1.5 + 0.2)), dx = x0 + Math.round(W * 0.72), dw = Math.round(W * 0.15), dt = suelo - Math.round((suelo - y0) * 0.66);
  b_rc(R, cl, dx - 1, dt - 1, dx + dw + 1, suelo, P[3]); b_rc(R, cl, dx, dt, dx + dw, suelo, P[0]);
  for (let y = dt + 1; y < suelo; y++) if (y % 3 === 0) R.pset(dx + 2, y, P[1]);
  const hoja = Math.round(dw * (1 - pu)); if (hoja > 0) { b_rc(R, cl, dx, dt, dx + hoja, suelo, P[2]); b_rc(R, cl, dx + 1, dt + 2, dx + hoja - 1, dt + 2, P[3]); if (hoja > 3) R.pset(dx + hoja - 2, Math.round((dt + suelo) / 2), P[4]); }
  if (pu > 0.3) for (let k = 0; k < 4; k++) R.pset(dx + hoja + 2 + k, suelo + 1 + k, P[3]);
  // el personajillo que anda hacia la puerta
  { const u = (t * 0.08) % 1, px = Math.round(x0 + W * (0.25 + u * 0.4)), p = Math.floor(t * 5) % 2; b_rc(R, cl, px - sc, suelo - 9 * sc, px + sc, suelo - 7 * sc, P[4]); b_rc(R, cl, px - sc, suelo - 6 * sc, px + sc, suelo - 3 * sc, P[3]); R.pset(px - sc + p, suelo - 1, P[3]); R.pset(px + sc - p, suelo - 1, P[3]); R.linea(px - sc, suelo - 2, px - sc, suelo - 1, P[3]); R.linea(px + sc, suelo - 2, px + sc, suelo - 1, P[3]); }
  R.recorte(null);
  if (o.tachado) { const kx = x0 + Math.round(W * 0.3), ky = y0 + Math.round(H * 0.18), kw = Math.round(W * 0.4), kh = Math.round(H * 0.24);
    b_rc(R, s, kx - 2, ky - 2, kx + kw + 2, ky + kh + 2, P[0]); b_rc(R, s, kx, ky, kx + kw, ky + kh, P[3]); b_rc(R, s, kx + 1, ky + 1, kx + kw - 1, ky + kh - 1, P[1]);
    for (let f = 0; f < 3; f++) for (let x = kx + 2 + f; x < kx + kw - 2; x += 3) b_rc(R, s, x, ky + 2 + f * 3, x + 1, ky + 3 + f * 3, P[3]);
    for (let i = -2; i <= 2; i++) { R.linea(kx - 4 + i, ky - 4, kx + kw + 4 + i, ky + kh + 4, P[4]); R.linea(kx + kw + 4 + i, ky - 4, kx - 4 + i, ky + kh + 4, P[4]); } }
  const r = verbos(R, t, { caja: [x0 + 1, ys, x1 - 1, y1 - 1], paleta: o.paleta ?? 'fosforo', activo: o.activo, frase: H > 70 ? [o.activo ?? 0, 'puerta'] : null, inventario: H > 70 ? ['llave', 'moneda', 'pollo'] : null });
  // el cursor: va del verbo a la puerta
  if (o.cursor !== false) { const b = r.botones[Math.max(0, o.activo ?? 0)], u = (t * 0.5) % 1, ex = dx + dw / 2, ey = (dt + suelo) / 2;
    const [px, py] = o.cursor ?? (b ? (u < 0.5 ? [lerp((b[0] + b[2]) / 2, ex, u * 2), lerp((b[1] + b[3]) / 2, ey, u * 2)] : [ex, ey]) : [ex, ey]);
    if (H > 60) verbos(R, t, { barra: false, cursor: [px, py], paleta: o.paleta ?? 'fosforo' }); else { R.pset(Math.round(px), Math.round(py), P[4]); R.pset(Math.round(px) - 2, Math.round(py), P[4]); R.pset(Math.round(px) + 2, Math.round(py), P[4]); R.pset(Math.round(px), Math.round(py) - 2, P[4]); R.pset(Math.round(px), Math.round(py) + 2, P[4]); } }
  return { puerta: [dx, dt, dx + dw, suelo], suelo, verbos: r };
}

// un dibujo pintado (la mansión en la colina al atardecer) que se vuelve píxeles en un monitor de color: u (0–1) cuánto
// se ha pasado ya (de arriba abajo), con la línea del escáner; bloque: el tamaño del píxel
function b_pinturaPix(R, s, t, u, bloque = 2) {
  const [x0, y0, x1, y1] = s, W = x1 - x0, H = y1 - y0, yl = y0 + Math.round(Math.min(1, u) * H);
  for (let y = y0 + 1; y < Math.min(y1, yl); y += bloque) for (let x = x0 + 1; x < x1; x += bloque) {
    const c = b_pintura((x - x0) / W, (y - y0) / H); b_rc(R, s, x, y, x + bloque - 1, Math.min(y + bloque - 1, yl - 1), c); }
  if (u < 1) { b_rc(R, s, x0 + 1, yl, x1 - 1, yl, hex('#ffffff')); b_rc(R, s, x0 + 1, yl + 1, x1 - 1, yl + 1, hex('#8ae0f0')); }
}

// el color del fondo pintado en (u, v) de 0 a 1: cielo de atardecer, la mansión en la colina con la ventana encendida,
// un árbol torcido y la hierba (lo comparten el papel de la mesa de dibujo y los monitores)
const b_PINT = b_P('#3a2a5a', '#7a3a6a', '#c85a5a', '#f09a5a', '#f8d070', '#2a1e3a', '#4a3a5a', '#3a5a3a', '#5a8a4a', '#f0e070', '#1e1a2a', '#8a5a3a');

function b_pintura(u, v) {
  const P = b_PINT, colina = 0.66 + 0.06 * Math.sin(u * 5 + 1) - Math.max(0, 0.14 * Math.sin((u - 0.3) / 0.45 * Math.PI)) * (u > 0.3 && u < 0.75 ? 1 : 0);
  // la mansión en lo alto de la colina: cuerpo, dos torres con tejado en punta y ventanas encendidas
  const cuerpo = u > 0.42 && u < 0.64 && v > 0.36 && v < colina + 0.02, torreI = u > 0.4 && u < 0.46 && v > 0.24 && v < 0.5, torreD = u > 0.58 && u < 0.64 && v > 0.2 && v < 0.5;
  const tejI = v <= 0.24 && v > 0.12 && Math.abs(u - 0.43) < (v - 0.12) * 0.28, tejD = v <= 0.2 && v > 0.07 && Math.abs(u - 0.61) < (v - 0.07) * 0.26, tejC = v <= 0.36 && v > 0.27 && Math.abs(u - 0.53) < (v - 0.27) * 1.3;
  if (cuerpo || torreI || torreD || tejI || tejD || tejC) { const ven = (cuerpo || torreI || torreD) && Math.floor(u * 50) % 3 === 1 && Math.floor(v * 30) % 3 === 1 && v < colina - 0.04; return ven ? P[9] : tejI || tejD || tejC ? P[10] : P[5]; }
  // el árbol torcido de la izquierda
  if (Math.abs(u - 0.2 - (0.62 - v) * 0.15) < 0.012 && v > 0.42 && v < colina) return P[11];
  if (Math.hypot((u - 0.22) * 1.3, v - 0.4) < 0.08) return Math.hypot((u - 0.2) * 1.3, v - 0.37) < 0.045 ? P[8] : P[7];
  if (v > colina) return v > colina + 0.12 ? P[7] : P[8];
  if (Math.hypot(u - 0.84, v - 0.5) < 0.07) return P[4];
  return v < 0.15 ? P[0] : v < 0.3 ? P[1] : v < 0.45 ? P[2] : P[3];
}

// un ficus alto en primer término (macetero en (x, base y)): tronco, hojas en tres tonos que se mecen
function b_ficus(R, x, y, t) {
  const { rect, pset } = R;
  R.linea(x, y - 14, x + 2, y - 50, hex('#5a3a22')); R.linea(x + 1, y - 14, x + 3, y - 50, hex('#7a5232'));
  for (let k = 0; k < 34; k++) { const a = h(k, 1, 490) * Math.PI * 2, r = 4 + h(k, 2, 490) * 12, cx = x + 2 + Math.cos(a) * r * 0.9 + Math.sin(t * 0.9 + k) * 0.6, cy = y - 50 + Math.sin(a) * r * 1.1 + 4;
    const c = k % 3 === 0 ? hex('#245a2e') : k % 3 === 1 ? hex('#3a7a3a') : hex('#5aa04a'); R.disco(cx, cy, 2.2, c); pset(Math.round(cx) - 1, Math.round(cy) - 1, hex('#7ac05a')); }
  rect(x - 8, y - 14, x + 10, y, C.k); rect(x - 7, y - 13, x + 9, y, hex('#c8c0b0')); rect(x - 7, y - 13, x - 5, y, hex('#e8e2d6')); rect(x + 6, y - 13, x + 9, y, hex('#9a9282')); rect(x - 8, y - 14, x + 10, y - 12, hex('#a8a090'));
}

// una caja de cartón (x0–x1, y0–y1) con su cinta, las solapas y el pictograma de «este lado arriba»
function b_cajaCarton(R, x0, y0, x1, y1) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1, hex('#c8a06a')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 3, hex('#dcb880')); rect(x1 - 4, y0 + 4, x1 - 1, y1, hex('#a88050'));
  rect(Math.round((x0 + x1) / 2) - 1, y0 + 1, Math.round((x0 + x1) / 2) + 1, y1, hex('#d8c8a0'));
  const ax = x0 + 6, ay = y0 + 8; for (const dx of [0, 5]) { R.linea(ax + dx, ay, ax + dx, ay + 7, hex('#3a2a1a')); pset(ax + dx - 1, ay + 1, hex('#3a2a1a')); pset(ax + dx + 1, ay + 1, hex('#3a2a1a')); } rect(ax - 1, ay + 9, ax + 6, ay + 9, hex('#3a2a1a'));
  for (let k = 0; k < 12; k++) pset(x0 + 2 + Math.round(h(k, 1, 491) * (x1 - x0 - 4)), y0 + 4 + Math.round(h(k, 2, 491) * (y1 - y0 - 5)), hex('#b08a58'));
}

// cifras diminutas de 3 × 5 (solo dígitos)
const b_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function b_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = b_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

function b_estMesa(R, t, o) {
  const g = b_fondo(R, 'est-mesa', () => {
    const { rect } = R;
    b_pared(R, 0, 0, 319, 95, b_PARED, -20, 30, 300, 2); rect(0, 96, 319, 96, b_FRISO[4]); rect(0, 97, 319, 97, b_FRISO[2]); rect(0, 98, 319, 98, b_FRISO[0]); b_friso(R, 0, 99, 319, 121, b_FRISO, 16, 3);
    // la ventana a la izquierda, cortada por el borde
    rect(0, 6, 42, 94, C.k); rect(0, 7, 41, 93, hex('#e8e2d2')); rect(0, 7, 41, 7, hex('#ffffff')); rect(0, 9, 38, 91, hex('#8a8272')); rect(0, 92, 46, 95, hex('#f0eadc')); rect(0, 95, 46, 95, C.k);
    // el corcho a la derecha, con una hoja de bocetos y una tarjeta
    rect(280, 48, 319, 98, C.k); rect(281, 49, 319, 97, b_FRISO[3]); for (let y = 51; y <= 95; y++) for (let x = 283; x <= 319; x++) { const q = h(x, y, 492); R.pset(x, y, q < 0.22 ? hex('#a07446') : q > 0.85 ? hex('#d0a476') : hex('#b88a5a')); }
    b_hojaBoceto(R, 286, 54, 20, 18, 'fantasma', 0); b_hojaBoceto(R, 296, 76, 18, 14, null, 1, hex('#3a6ab8'));
    // el tablero de la mesa, con el charco de luz del flexo
    b_tablero(R, 0, 122, 319, 179, b_MESA, 11, 5, [150, 150, 170]); rect(0, 122, 319, 122, C.k);
    // el monitor grande sobre su pie
    b_sombra(R, 160, 128, 100, 5, 0.4); rect(126, 120, 194, 128, C.k); rect(127, 121, 193, 127, b_BEIGE[1]); rect(127, 121, 193, 122, b_BEIGE[3]);
    const s = b_monitor(R, 50, 16, 270, 122);
    // la nota amarilla pegada al bisel
    rect(52, 22, 64, 33, hex('#b8a030')); rect(52, 22, 63, 32, hex('#f8e070')); for (let l = 0; l < 3; l++) R.linea(54, 25 + l * 3, 61 - l, 25 + l * 3, hex('#8a6a3a'));
    // la disquetera externa con un disquete a medio meter
    b_sombra(R, 34, 148, 30, 3, 0.4); b_caja(R, 6, 126, 60, 146, b_BEIGE[2], b_BEIGE[4], b_BEIGE[1]); rect(7, 127, 59, 131, b_BEIGE[3]);
    rect(14, 137, 52, 139, C.k); rect(15, 138, 51, 138, hex('#3a3a3a')); rect(10, 142, 13, 143, hex('#5a2a24'));
    rect(18, 139, 48, 152, C.k); rect(19, 139, 47, 151, hex('#2a2a32')); rect(24, 144, 42, 150, hex('#f2eee2')); R.linea(26, 146, 38, 146, hex('#3a6ab8')); R.linea(26, 148, 34, 148, hex('#8a8aa0')); R.disco(33, 141, 2, hex('#1a1a20'));
    // el teclado, grande
    b_sombra(R, 160, 162, 92, 3, 0.4); b_teclado(R, 70, 134, 248, 160, b_BEIGE, 5);
    // la alfombrilla y el ratón con su cable
    rect(256, 138, 316, 170, C.k); for (let y = 139; y < 170; y++) for (let x = 257; x < 316; x++) R.pset(x, y, b_tono(b_P('#1e3a6a', '#2a4a7a', '#3a5a8a'), 0.5 + h(x, y, 493) * 0.4 - (y - 139) / 80, x, y));
    R.linea(286, 144, 280, 130, hex('#3a3a3a')); R.linea(280, 130, 268, 124, hex('#3a3a3a'));
    // la libreta de espiral con bocetos y el lápiz
    R.poligono([[6, 152], [62, 150], [64, 179], [8, 179]], C.k); R.poligono([[7, 153], [61, 151], [63, 179], [9, 179]], hex('#f6eeb8'));
    for (let l = 0; l < 7; l++) R.linea(10, 158 + l * 3, 60, 157 + l * 3, hex('#a8c8e0')); for (let k = 0; k < 9; k++) R.disco(10 + k * 6, 152, 1, hex('#8a8a9a'));
    b_boceto(R, 'barco', 14, 158, hex('#3a3a5a')); b_boceto(R, 'retrete', 40, 162, hex('#3a3a5a'));
    R.linea(50, 176, 70, 164, C.k); R.linea(51, 176, 71, 164, hex('#e8c040')); R.linea(50, 177, 70, 165, hex('#b8901c')); R.pset(71, 163, hex('#f0a0b0'));
    // los disquetes sueltos y su caja
    b_disquete(R, 78, 166, hex('#c83a3a'), 1); b_disquete(R, 88, 168, hex('#3a3a4a'), 1); b_disquete(R, 98, 165, hex('#3a6ab8'), 1);
    rect(214, 164, 246, 179, C.k); rect(215, 165, 245, 179, hex('#5a6a7a')); rect(215, 165, 245, 166, hex('#8a9aaa')); for (let i = 0; i < 7; i++) rect(218 + i * 4, 160 + (i % 2), 220 + i * 4, 165, [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a')][i % 4]);
    return { s };
  });
  b_ventana(R, t, [0, 9, 38, 91], { palmeras: [[20, 70, 1]], persiana: 22, hor: 74 });
  b_cristal(R, g.s, b_FOS, t);
  const modo = o.modo ?? 'aventura';
  if (o.pantalla) o.pantalla(R, ...g.s, t);
  else if (modo === 'codigo') b_codigo(R, g.s, t, b_FOS, 3);
  else b_aventura(R, g.s, t, b_FOS, { puerta: o.puerta, activo: o.activo ?? Math.floor(t / 1.2) % 9, tachado: modo === 'tachado', cursor: o.cursor });
  b_reflejo(R, g.s);
  R.rect(10, 142, 13, 143, Math.floor(t * 4) % 3 ? hex('#f04a3a') : hex('#5a2a24'));
  // el ratón (la escena puede no pintarlo si lo coge con la mano: o.raton false) y la taza que humea
  if (o.raton !== false) { const mx = 280 + Math.round(Math.sin(t * 0.8) * 2); R.rect(mx, 144, mx + 11, 157, C.k); R.rect(mx + 1, 145, mx + 10, 156, b_BEIGE[3]); R.rect(mx + 1, 145, mx + 10, 148, b_BEIGE[4]); R.rect(mx + 5, 145, mx + 5, 149, C.k); R.rect(mx + 1, 149, mx + 10, 149, b_BEIGE[1]); }
  b_taza(R, 292, 134, t, hex('#e8e2d2'));
  return { suelo: 179, pies: [], pantalla: g.s, teclado: [70, 134, 248, 160], raton: [286, 150], disquetera: [6, 126, 60, 146], libreta: [6, 150, 64, 179] };
}

function b_estPizarra(R, t, o) {
  const yt = 124;
  const g = b_fondo(R, 'est-pizarra', () => {
    const { rect } = R; b_sala(R, 160, 4, null, hex('#8a6a3a'));
    // la pizarra: grande, de pared, con el borde de abajo a la altura de la mano de un chibi de pie (suelo 152): marco
    // de aluminio, superficie con restos de borrado, lo de otros días a medio borrar abajo (una hoja sujeta con imanes,
    // notas de colores, una tira de imanes) y la bandeja con rotuladores y borrador
    b_sombra(R, 158, 136, 80, 2, 0.25);
    rect(83, 19, 233, 134, C.k); rect(84, 20, 232, 133, hex('#b8bcc8')); rect(84, 20, 232, 20, hex('#e8ecf4')); rect(84, 133, 232, 133, hex('#7a7e8a')); rect(232, 21, 232, 132, hex('#8a8e9a'));
    for (let y = 22; y <= 131; y++) for (let x = 86; x <= 230; x++) { const q = h(x >> 2, y >> 1, 494), luz = (x - 86) * 0.6 + (y - 22) < 70 && (x - 86) * 0.6 + (y - 22) > 58;
      R.pset(x, y, q < 0.06 ? hex('#d8dce4') : (x + y * 3) % 97 === 0 ? hex('#e0e4ea') : luz && (x + y) % 2 ? hex('#ffffff') : y > 100 && q > 0.93 ? hex('#e8ebf0') : hex('#f4f6f8')); }
    for (let k = 0; k < 5; k++) { const x = 92 + k * 31, y = 76 + (k % 2) * 6; for (let i = 0; i < 14; i++) R.pset(x + i, y + Math.round(Math.sin(i * 0.8) * 1.5), hex('#e2e6ec')); }
    // lo de otros días, a medio borrar: un diagrama de cajas y flechas desvaído
    for (let k = 0; k < 3; k++) { const x0 = 132 + k * 22, y0 = 104 + (k % 2) * 6; for (let i = 0; i <= 14; i++) { R.pset(x0 + i, y0, hex('#d4dae4')); R.pset(x0 + i, y0 + 9, hex('#d4dae4')); } for (let j2 = 0; j2 <= 9; j2++) { R.pset(x0, y0 + j2, hex('#d4dae4')); R.pset(x0 + 14, y0 + j2, hex('#d4dae4')); } if (k < 2) for (let i = 15; i < 22; i++) R.pset(x0 + i, y0 + 5 + (k % 2 ? -3 : 3) * (i - 15) / 7 | 0, hex('#dce0e8')); }
    for (let i = 0; i < 40; i++) R.pset(134 + i, 124 + Math.round(Math.sin(i * 0.4) * 2), hex('#e4d8d8'));
    // la hoja impresa sujeta con dos imanes (renglones sin letras y un esquema)
    R.poligono([[93, 99], [119, 98], [120, 128], [94, 129]], C.k); R.poligono([[94, 100], [118, 99], [119, 127], [95, 128]], hex('#fbf8ee'));
    for (let l = 0; l < 6; l++) R.linea(98, 104 + l * 3, 114 - (l % 3) * 3, 104 + l * 3, hex('#9a9aaa')); R.rect(99, 121, 113, 125, hex('#c8d8ea')); R.rect(100, 122, 104, 124, hex('#3a6ab8'));
    R.poligono([[118, 127], [119, 127], [119, 124]], hex('#d8d2c2'));
    for (const [mx, my, c] of [[96, 101, hex('#c83a3a')], [116, 100, hex('#3a8a4a')]]) { R.disco(mx, my, 2.5, C.k); R.disco(mx, my, 1.8, c); R.pset(mx - 1, my - 1, hex('#ffffff')); }
    // las notas de colores, una con una esquina que se levanta, y la tira de imanes
    for (const [nx, ny, c, k] of [[196, 100, hex('#f8e870'), 0], [210, 103, hex('#f8a8c8'), 1], [200, 115, hex('#a8e0f8'), 2]]) { rect(nx, ny, nx + 11, ny + 10, b_mezcla(c, C.k, 0.45)); rect(nx, ny, nx + 10, ny + 9, c); for (let l = 0; l < 3; l++) rect(nx + 2, ny + 3 + l * 2, nx + 8 - (l + k) % 3, ny + 3 + l * 2, b_mezcla(c, C.k, 0.4)); if (k === 1) { R.pset(nx + 10, ny + 9, hex('#f4f6f8')); R.pset(nx + 9, ny + 9, b_mezcla(c, C.k, 0.25)); } }
    for (let k = 0; k < 5; k++) { const mx = 196 + k * 7; R.disco(mx, 126, 2.4, C.k); R.disco(mx, 126, 1.7, [hex('#c83a3a'), hex('#2a4fa8'), hex('#e8c040'), hex('#3a8a4a'), hex('#c87a1a')][k]); R.pset(mx - 1, 125, hex('#ffffff')); }
    // la bandeja de abajo con los rotuladores y el borrador
    rect(80, 134, 234, 137, C.k); rect(81, 135, 233, 136, hex('#9a9eaa')); rect(81, 135, 233, 135, hex('#d8dce4'));
    for (const [x, c] of [[96, hex('#c83a3a')], [106, hex('#2a4fa8')], [116, C.k], [126, hex('#3a8a4a')]]) { rect(x, 133, x + 7, 134, C.k); rect(x + 1, 133, x + 6, 133, c); }
    rect(206, 131, 222, 134, C.k); rect(207, 131, 221, 132, hex('#3a3a4a')); rect(207, 133, 221, 133, hex('#e8e2d2'));
    // el corcho a la izquierda
    b_corcho(R, 14, 24, 72, 80, [[17, 27, 16, 13, 'mono', 0], [36, 26, 16, 12, 'barco', 1], [55, 28, 14, 12, null, 2], [18, 45, 14, 14, 'tentaculo', 3], [35, 44, 17, 12, 'fantasma', 0], [55, 44, 14, 12, 'calavera', 1], [24, 63, 14, 12, null, 2], [44, 61, 16, 14, 'mansion', 3]]);
    // el calendario de pared (cuadrícula sin letras, con un día marcado) y el reloj
    rect(246, 50, 274, 80, C.k); rect(247, 51, 273, 79, hex('#f4f0e6')); rect(247, 51, 273, 57, hex('#3a6ab8')); for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) rect(249 + i * 3 + i, 60 + j * 5, 250 + i * 3 + i, 61 + j * 5, hex('#8a8aa0'));
    R.disco(264, 66, 3, hex('#c83a3a')); R.disco(264, 66, 2, hex('#f4f0e6')); R.pset(264, 66, hex('#8a8aa0')); rect(259, 49, 261, 52, hex('#5e6270'));
    // la fuente de agua: el garrafón azul, el cuerpo y los vasos de papel
    rect(2, 64, 24, 111, C.k); R.disco(13, 72, 10, C.k); R.disco(13, 72, 9, hex('#5ab0e8')); rect(5, 72, 21, 82, hex('#5ab0e8')); rect(4, 74, 6, 80, hex('#9ad8f8')); rect(10, 82, 16, 86, hex('#3a8ac8'));
    rect(3, 86, 23, 111, hex('#e8e2d2')); rect(3, 86, 5, 111, hex('#ffffff')); rect(20, 86, 23, 111, hex('#b8b0a0')); rect(9, 94, 17, 97, hex('#5a5a6a')); rect(11, 97, 12, 99, hex('#c83a3a')); rect(15, 97, 16, 99, hex('#3a6ab8')); rect(6, 100, 20, 100, hex('#8a8478'));
    rect(25, 90, 28, 104, hex('#f4f0e6')); rect(25, 90, 28, 90, hex('#c8c0b0'));
    // la mesita con la máquina de escribir, la bandeja de papel y el flexo
    b_escritorio(R, 236, 306, yt, 4, 'der');
    rect(240, 127, 254, 133, C.k); rect(241, 128, 253, 132, hex('#f4f0e6')); rect(241, 130, 253, 130, hex('#c8c0b0')); for (let k = 0; k < 3; k++) rect(241, 128 - k, 253, 128 - k, hex('#ece6d8'));
    // primer término: una silla de oficina vacía, un poco girada, y la papelera
    b_silla(R, 50, 178); R.rect(296, 158, 312, 179, C.k); R.rect(297, 159, 311, 179, hex('#5a6a7a')); for (let x = 299; x < 311; x += 3) R.rect(x, 160, x, 178, hex('#3e4a58')); R.disco(301, 158, 3, hex('#f4f0e6')); R.disco(307, 157, 3, hex('#e8e2d2'));
    return {};
  });
  b_fluorescente(R, 186, 246, 2, t, 2); b_reloj(R, 254, 32, 7, t);
  b_pizarraDibujo(R, t, o.trazo ?? 1, o.sonrisa ?? 0);
  // las burbujas que suben en el garrafón cuando alguien bebe
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k * 0.27) % 1; if (Math.sin(t * 0.7) > 0) R.pset(9 + (k * 3) % 9, Math.round(82 - f * 16), hex('#d8f4ff')); }
  b_maquina(R, 272, 130, t, o.hoja ?? Math.min(1, (t * 0.12) % 1.3), true);
  return { suelo: 152, pies: [110, 160, 210, 250], pizarra: [86, 22, 230, 131], maquina: [256, 100, 288, 130], mesa: [236, yt, 306, yt + 26], fuente: [2, 64, 28, 111] };
}
// una silla de oficina de ruedas vista de lado (base en (x, y)): respaldo, asiento, columna, estrella con ruedas
function b_silla(R, x, y) {
  const { rect } = R, c = hex('#3a4a6a'), cL = hex('#5a6a8a');
  rect(x - 9, y - 30, x - 5, y - 14, C.k); rect(x - 8, y - 29, x - 6, y - 15, c); rect(x - 8, y - 29, x - 8, y - 15, cL);
  rect(x - 9, y - 15, x + 9, y - 11, C.k); rect(x - 8, y - 14, x + 8, y - 12, c); rect(x - 8, y - 14, x + 8, y - 14, cL);
  rect(x - 1, y - 10, x + 1, y - 4, hex('#5a5a6a')); rect(x - 10, y - 4, x + 10, y - 3, C.k); for (const dx of [-10, 0, 10]) { R.disco(x + dx, y - 1, 1.5, C.k); }
}

// lo de la pizarra (u: cuánto se ha dibujado, 0–1): la «palabra» de cinco pictogramas en recuadros de colores, las
// flechas a una pantalla con su línea de verbos, el cursor dibujado y el «?» que se convierte en sonrisa (son 0–1)
function b_pizarraDibujo(R, t, u, son) {
  const col = [hex('#2a4fa8'), hex('#c83a3a'), hex('#1c1222'), hex('#3a8a4a'), hex('#c87a1a')], paso = (k, n) => u * n > k;
  for (let k = 0; k < 5; k++) { if (!paso(k, 9)) break; const x = 92 + k * 25, y = 26, c = col[k];
    for (let i = 0; i < 23; i++) { R.pset(x + i, y, c); R.pset(x + i, y + 17, c); } for (let j = 0; j < 18; j++) { R.pset(x, y + j, c); R.pset(x + 22, y + j, c); }
    b_pictoX2(R, b_VICON[[0, 1, 2, 3, 5][k]], x + 1, y + 2, c); }
  if (paso(5, 9)) { for (let k = 0; k < 5; k++) { const x0 = 103 + k * 25; R.linea(x0, 45, 150 + (k - 2) * 6, 56, hex('#5a5a6a')); } }
  if (paso(6, 9)) { const x0 = 120, y0 = 57, x1 = 186, y1 = 88; for (let i = x0; i <= x1; i++) { R.pset(i, y0, C.k); R.pset(i, y1, C.k); } for (let j = y0; j <= y1; j++) { R.pset(x0, j, C.k); R.pset(x1, j, C.k); }
    for (let i = x0 + 2; i < x1 - 1; i++) R.pset(i, 79, hex('#2a4fa8')); for (let k = 0; k < 5; k++) { const bx = x0 + 3 + k * 12; for (let i = 0; i < 9; i++) { R.pset(bx + i, 81, hex('#2a4fa8')); R.pset(bx + i, 86, hex('#2a4fa8')); } R.pset(bx, 82, hex('#2a4fa8')); R.pset(bx + 4, 83, hex('#c83a3a')); R.pset(bx + 5, 83, hex('#c83a3a')); }
    R.linea(x0 + 6, 76, x0 + 20, 66, hex('#3a8a4a')); R.linea(x0 + 20, 66, x0 + 34, 74, hex('#3a8a4a')); for (let j = 64; j <= 77; j++) R.pset(x0 + 46, j, hex('#c87a1a')); for (let i = 46; i <= 54; i++) R.pset(x0 + i, 64, hex('#c87a1a')); R.pset(x0 + 52, 71, hex('#c87a1a')); }
  if (paso(7, 9)) { const cx = 160, cy = 70; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let d = 2; d <= 5; d++) R.pset(cx + dx * d, cy + dy * d, hex('#c83a3a')); }
  if (paso(8, 9)) { const cx = 208, cy = 70, r = 13; for (let a = 0; a < 6.28; a += 0.05) R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), hex('#2a4fa8'));
    if (son < 0.5) { const k = 1 - son * 2; R.icono('?', cx - 7, cy - 9, son > 0 ? b_mezcla(hex('#c83a3a'), hex('#f4f6f8'), son * 2) : hex('#c83a3a'), hex('#d0d4dc'), 2); }
    else { const k = Math.min(1, (son - 0.5) * 2), c = hex('#3a8a4a'); R.disco(cx - 5, cy - 4, 1.5, c); R.disco(cx + 5, cy - 4, 1.5, c); for (let i = -7; i <= 7; i++) { const y = Math.round(cy + 3 + (1 - (i / 7) ** 2) * 5 * k); R.pset(cx + i, y, c); R.pset(cx + i, y + 1, c); } }
    // las risas del equipo: tres «!» que saltan alrededor
    if (son > 0.6) for (let k = 0; k < 3; k++) { const y = 30 + Math.round(Math.abs(Math.sin(t * 5 + k * 2)) * -4); R.icono('!', 222 - k * 4 + (k === 1 ? 0 : 0), y + 26 + k * 2, hex('#c83a3a'), hex('#d0d4dc'), 1); } }
}

// un pictograma de verbo al doble de tamaño (para la pizarra)
function b_pictoX2(R, filas, x, y, c) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') { R.pset(x + i * 2, y + j * 2, c); R.pset(x + i * 2 + 1, y + j * 2, c); R.pset(x + i * 2, y + j * 2 + 1, c); R.pset(x + i * 2 + 1, y + j * 2 + 1, c); } }); }

function b_estCorcho(R, t, o) {
  const g = b_fondo(R, 'est-corcho', () => {
    const { rect } = R;
    b_pared(R, 0, 0, 319, 118, b_PARED, 150, 10, 300, 3); rect(0, 119, 319, 119, b_FRISO[4]); rect(0, 120, 319, 121, b_FRISO[1]); b_friso(R, 0, 122, 319, 130, b_FRISO, 14, 4);
    b_moqueta(R, 131, b_MOQ, hex('#9a5a3a'), 3, null);
    // el corcho enorme con su marco
    rect(12, 16, 274, 114, C.k); rect(13, 17, 273, 113, b_FRISO[3]); rect(13, 17, 273, 17, b_FRISO[4]); rect(13, 113, 273, 113, b_FRISO[0]);
    for (let y = 20; y <= 110; y++) for (let x = 16; x <= 270; x++) { const q = h(x, y, 495); R.pset(x, y, q < 0.2 ? hex('#a07446') : q > 0.86 ? hex('#d0a476') : q > 0.83 ? hex('#8a6038') : hex('#b88a5a')); }
    // los bocetos grandes (a doble tamaño) en sus hojas, torcidos un poco
    const hoja = (x, y, w, hh, d, s, k) => { rect(x + 2, y + 2, x + w + 2, y + hh + 2, hex('#6a4a2a')); rect(x, y, x + w, y + hh, k % 3 === 1 ? hex('#f2e8b8') : hex('#f6f2ea')); rect(x, y + hh, x + w, y + hh, hex('#c8c0b0')); rect(x + w, y, x + w, y + hh, hex('#d8d0c0'));
      if (d) { const f = b_BOCETOS[d]; b_boceto(R, d, x + Math.round((w - f[0].length * s) / 2) + 1, y + Math.round((hh - f.length * s) / 2) + 1, hex('#3a3a50'), s); }
      R.disco(x + Math.round(w / 2), y + 2, 1.5, [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a')][k % 4]); R.pset(x + Math.round(w / 2) - 1, y + 1, C.blanco); };
    hoja(20, 22, 40, 30, 'barco', 2, 0); hoja(66, 20, 34, 26, 'mono', 2, 1); hoja(106, 24, 36, 24, 'mansion', 2, 2); hoja(150, 20, 40, 28, 'fantasma', 2, 3);
    hoja(198, 22, 28, 28, 'tentaculo', 2, 0); hoja(232, 24, 34, 22, 'retrete', 2, 1);
    hoja(22, 60, 26, 20, 'calavera', 2, 2); hoja(206, 58, 30, 26, 'perro', 2, 3);
    // los chistes: bocadillos con garabatos, un «!» y un «?» y las fichas con renglones
    for (const [x, y, w, k] of [[56, 58, 40, 0], [104, 56, 44, 1], [154, 60, 40, 2]]) { R.disco(x + w / 2, y + 10, 11, C.k); rect(x, y + 2, x + w, y + 18, C.k); rect(x + 1, y + 3, x + w - 1, y + 17, hex('#ffffff')); R.poligono([[x + 6, y + 17], [x + 12, y + 17], [x + 4, y + 24]], C.k); R.poligono([[x + 7, y + 17], [x + 11, y + 17], [x + 6, y + 21]], hex('#ffffff'));
      for (let l = 0; l < 3; l++) R.linea(x + 4, y + 6 + l * 4, x + w - 6 - Math.round(h(l, k, 496) * 10), y + 6 + l * 4, hex('#5a5a70')); R.icono(k === 1 ? '?' : '!', x + w - 7, y + 4, hex('#c83a3a'), hex('#d0d4dc'), 1); R.disco(x + w / 2, y + 3, 1.2, hex('#e8c040')); }
    for (const [x, y, k] of [[26, 88, 0], [62, 90, 1], [100, 86, 2], [140, 90, 3], [176, 88, 4], [240, 86, 5]]) b_hojaBoceto(R, x, y, 24, 18, null, k, [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a')][k % 4]);
    // la foto del equipo (caritas sin rasgos) y los cordeles rojos entre chinchetas
    rect(242, 52, 266, 72, C.k); rect(243, 53, 265, 71, hex('#f6f2ea')); rect(245, 55, 263, 66, hex('#8ac0e0')); rect(245, 63, 263, 66, hex('#7a5a3a')); for (let k = 0; k < 4; k++) { R.disco(248 + k * 5, 61, 1.6, hex('#f0c090')); R.pset(248 + k * 5, 59, [hex('#3a2418'), hex('#c8783a'), hex('#1c1424'), hex('#8a8a9a')][k]); rect(247 + k * 5, 63, 249 + k * 5, 65, [hex('#8a3a3a'), hex('#6a8a4a'), hex('#3e6a8a'), hex('#5a4a7a')][k]); }
    for (const [a, b] of [[[40, 24], [83, 22]], [[83, 22], [124, 26]], [[42, 62], [76, 60]], [[170, 22], [212, 24]]]) { const n = 30; for (let i = 0; i <= n; i++) { const u = i / n; R.pset(Math.round(a[0] + (b[0] - a[0]) * u), Math.round(a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * 4), hex('#c83a3a')); } }
    // a la derecha, la bandera pirata (pictograma) colgada bajo la zona de Atom
    rect(282, 52, 314, 76, C.k); rect(283, 53, 313, 75, hex('#2a2430')); b_boceto(R, 'calavera', 293, 58, hex('#f2eee2')); R.linea(290, 70, 306, 66, hex('#f2eee2')); R.linea(290, 66, 306, 70, hex('#f2eee2'));
    return {};
  });
  // la hoja del tentáculo que se levanta con el aire y una mosca que pasea por el corcho
  if (Math.sin(t * 1.9) > 0.4) { R.rect(198, 40, 226, 50, b_mezcla(hex('#b88a5a'), C.k, 0.2)); R.poligono([[198, 50], [226, 50], [224, 40], [200, 42]], hex('#f2ecdc')); R.linea(204, 46, 220, 45, hex('#a8a8b8')); }
  { const fx = Math.round(60 + Math.sin(t * 0.7) * 40 + Math.sin(t * 2.3) * 4), fy = Math.round(54 + Math.cos(t * 0.9) * 6); R.pset(fx, fy, C.k); if (Math.floor(t * 20) % 2) { R.pset(fx - 1, fy - 1, hex('#c8d8e8')); R.pset(fx + 1, fy - 1, hex('#c8d8e8')); } }
  // la mesa de reuniones va por delante de los personajes (con R.delante)
  if (o.delante !== false) { const antes = R.delante; R.delante = () => { antes?.(); b_mesaReunion(R, t); }; }
  return { suelo: 150, pies: [80, 150, 220], mesa: [0, 146, 319, 179], corcho: [16, 20, 270, 110] };
}

// la mesa de reuniones (por delante de quien esté detrás con los pies en y 150: le tapa las piernas): el tablero con papeles, bocetos,
// lápices, tazas que humean y un cuaderno abierto, y el canto
export function mesaReunion(R, t) { b_mesaReunion(R, t); }

function b_mesaReunion(R, t) {
  const { rect } = R;
  rect(0, 145, 319, 145, C.k); b_tablero(R, 0, 146, 319, 164, b_MESA, 10, 8, [160, 156, 140]);
  rect(0, 165, 319, 165, b_MESA[4]); rect(0, 166, 319, 167, b_MESA[1]); for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, b_tono(b_FRISO, 0.35 - (y - 168) / 30 + (h(x >> 3, y, 497) < 0.1 ? -0.15 : 0), x, y));
  for (const [x, y, w, k, d] of [[30, 148, 22, 0, 'mono'], [96, 150, 18, 1, null], [176, 147, 22, 2, 'barco'], [250, 149, 18, 3, null]]) { R.poligono([[x, y], [x + w, y - 1], [x + w + 1, y + 13], [x + 1, y + 14]], hex('#5a4026')); R.poligono([[x, y - 1], [x + w, y - 2], [x + w + 1, y + 12], [x + 1, y + 13]], k % 2 ? hex('#f2e8b8') : hex('#f6f2ea'));
    if (d) b_boceto(R, d, x + 4, y + 1, hex('#4a4a60')); else for (let l = 0; l < 4; l++) R.linea(x + 3, y + 2 + l * 3, x + w - 4, y + 1 + l * 3, hex('#8a8aa0')); }
  // el cuaderno abierto con el mapa del tesoro dibujado
  R.poligono([[124, 151], [168, 149], [170, 163], [126, 164]], C.k); R.poligono([[125, 151], [146, 150], [147, 163], [127, 163]], hex('#f6eeb8')); R.poligono([[147, 150], [167, 149], [169, 162], [148, 163]], hex('#f6eeb8'));
  for (let k = 0; k < 10; k++) R.pset(130 + k * 1.5, 156 + Math.round(Math.sin(k) * 2), hex('#c83a3a')); R.linea(156, 153, 160, 157, hex('#c83a3a')); R.linea(160, 153, 156, 157, hex('#c83a3a'));
  for (const [x, c] of [[70, hex('#e8c040')], [222, hex('#c83a3a')]]) { R.linea(x, 160, x + 16, 156, C.k); R.linea(x, 161, x + 16, 157, c); }
  b_taza(R, 84, 158, t, hex('#3a6ab8')); b_taza(R, 210, 157, t + 0.5, hex('#e8e2d2')); b_taza(R, 290, 159, t + 1, hex('#c83a3a'));
}

function b_estDibujo(R, t, o) {
  const comic = o.papel === 'comic', yt = 124;
  const g = b_fondo(R, 'est-dibujo|' + (comic ? 1 : 0), () => {
    const { rect } = R; b_sala(R, 232, 50, [196, 268, 0.5], hex('#5a7a8a'));
    // la ventana del fondo a la derecha
    rect(196, 18, 270, 82, C.k); rect(197, 19, 269, 81, hex('#e8e2d2')); rect(197, 19, 269, 19, hex('#ffffff')); rect(199, 21, 267, 79, hex('#8a8272')); rect(232, 21, 233, 79, hex('#e8e2d2')); rect(193, 80, 273, 83, hex('#f0eadc')); rect(193, 83, 273, 83, hex('#a89e88')); rect(193, 84, 273, 84, C.k);
    // en la pared: el fondo terminado enmarcado y las muestras de color clavadas
    rect(96, 22, 160, 62, C.k); rect(97, 23, 159, 61, hex('#c8a040')); rect(97, 23, 159, 23, hex('#f0d080')); rect(100, 26, 156, 58, C.k);
    for (let y = 27; y <= 57; y++) for (let x = 101; x <= 155; x++) R.pset(x, y, b_pintura((x - 101) / 54, (y - 27) / 30));
    for (let k = 0; k < 6; k++) { const x = 168 + (k % 3) * 9, y = 26 + Math.floor(k / 3) * 12; rect(x, y, x + 7, y + 9, C.k); rect(x + 1, y + 1, x + 6, y + 8, [hex('#c85a5a'), hex('#f09a5a'), hex('#f8d070'), hex('#5a8a4a'), hex('#3a2a5a'), hex('#7a3a6a')][k]); R.pset(x + 3, y, hex('#e8c040')); }
    b_corcho(R, 14, 24, 78, 70, comic ? [[17, 27, 18, 16, 'perro', 0], [38, 27, 18, 16, 'mono', 1], [59, 28, 16, 14, null, 2], [18, 48, 20, 16, 'perro', 3], [42, 49, 16, 14, 'calavera', 0], [60, 46, 15, 16, null, 1]] : [[17, 27, 18, 16, 'mansion', 0], [38, 27, 18, 16, 'tentaculo', 1], [59, 28, 16, 14, null, 2], [18, 48, 20, 16, 'barco', 3], [42, 49, 16, 14, 'fantasma', 0], [60, 46, 15, 16, null, 1]]);
    // la lona manchada de pintura bajo la mesa de dibujo
    R.poligono([[10, 140], [146, 138], [158, 162], [2, 166]], hex('#d8ccb0')); for (let k = 0; k < 40; k++) R.disco(10 + h(k, 1, 498) * 140, 141 + h(k, 2, 498) * 22, 0.8 + h(k, 3, 498) * 1.4, [hex('#c85a5a'), hex('#3a6ab8'), hex('#e8c040'), hex('#5a8a4a'), hex('#b8ac90')][k % 5]);
    for (let x = 6; x < 154; x += 3) R.pset(x, 140 + Math.round(Math.sin(x * 0.3)), hex('#b8ac90'));
    // la mesa de dibujo: las patas en tijera, el tablero inclinado con el papel y la regla paralela
    for (const [a, b] of [[[34, 150], [120, 118]], [[120, 150], [34, 118]]]) { R.linea(a[0], a[1], b[0], b[1], C.k); R.linea(a[0] + 1, a[1], b[0] + 1, b[1], hex('#8a8a9a')); R.linea(a[0] + 2, a[1], b[0] + 2, b[1], C.k); }
    rect(30, 150, 42, 152, C.k); rect(112, 150, 124, 152, C.k);
    R.poligono([[22, 124], [140, 124], [128, 84], [34, 84]], C.k); R.poligono([[23, 123], [139, 123], [127, 85], [35, 85]], hex('#c8b890')); R.linea(23, 123, 139, 123, hex('#8a7a58'));
    const pap = [[30, 119], [132, 119], [123, 89], [39, 89]];
    for (let y = 89; y <= 119; y++) { const v = (y - 89) / 30, xa = Math.round(39 - 9 * v), xb = Math.round(123 + 9 * v); for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa); R.pset(x, y, comic ? b_comic(u, v) : b_pintura(u, v)); } }
    for (let y = 89; y <= 119; y++) { const v = (y - 89) / 30; R.pset(Math.round(39 - 9 * v), y, hex('#f6f2ea')); R.pset(Math.round(123 + 9 * v), y, hex('#d8d0c0')); }
    rect(20, 125, 142, 127, C.k); rect(21, 125, 141, 126, hex('#e8e4dc')); for (let x = 24; x < 140; x += 4) R.pset(x, 125, hex('#5a5a6a'));
    for (const [x, c] of [[40, hex('#e8c040')], [52, hex('#c83a3a')], [100, hex('#3a6ab8')]]) { R.linea(x, 124, x + 9, 123, C.k); R.linea(x, 123, x + 9, 122, c); }
    // el carrito de pinturas a la izquierda: botes de colores, el vaso con pinceles y la paleta
    rect(0, 112, 16, 150, C.k); rect(1, 113, 15, 149, hex('#7a7e8a')); for (const y of [118, 132, 146]) { rect(1, y, 15, y + 1, hex('#5a5e6a')); rect(1, y, 15, y, hex('#a8acb8')); }
    for (let k = 0; k < 3; k++) { const x = 2 + k * 5; rect(x, 126, x + 3, 131, C.k); rect(x + 1, 127, x + 2, 131, [hex('#c85a5a'), hex('#3a6ab8'), hex('#e8c040')][k]); rect(x, 125, x + 3, 125, hex('#c8c8d0')); }
    rect(3, 104, 11, 117, C.k); rect(4, 106, 10, 117, hex('#bfe0f0')); for (let k = 0; k < 4; k++) { R.linea(5 + k * 2, 106, 3 + k * 3, 96 - k, hex('#a8743c')); R.pset(3 + k * 3, 95 - k, [hex('#c85a5a'), hex('#3a6ab8'), hex('#f8d070'), C.k][k]); }
    // el escritorio del escáner, el escáner y el monitor de color
    b_escritorio(R, 186, 276, yt, 6, 'der');
    b_caja(R, 194, 116, 238, 128, hex('#c8c4b8'), hex('#e8e4d8'), hex('#8a867a')); rect(196, 117, 236, 119, hex('#9a968a')); rect(198, 124, 210, 125, hex('#5a5a6a'));
    b_cpu(R, 242, 116, 274, 126); const s = b_monitor(R, 244, 92, 274, 116, { P: b_P('#5e5a50', '#8a8474', '#b0aa98', '#cec8b4', '#e4dece') });
    R.linea(238, 124, 242, 124, hex('#1a1a20'));
    return { s };
  });
  b_ventana(R, t, [199, 21, 231, 79], { palmeras: [[214, 50, 1]], persiana: 30, hor: 64 }); b_ventana(R, t + 2, [234, 21, 267, 79], { palmeras: [[256, 44, -1]], persiana: 30, hor: 64 });
  b_fluorescente(R, 120, 180, 2, t, 3);
  // el flexo de arquitecto con su haz sobre el papel
  { const lx = 92, ly = 66; R.linea(132, 86, 118, 60, C.k); R.linea(133, 86, 119, 60, hex('#5a5a6a')); R.linea(118, 60, lx + 4, ly - 2, C.k); R.linea(118, 61, lx + 4, ly - 1, hex('#5a5a6a'));
    R.poligono([[lx - 6, ly + 3], [lx + 2, ly - 5], [lx + 8, ly + 1], [lx, ly + 8]], C.k); R.poligono([[lx - 5, ly + 3], [lx + 2, ly - 4], [lx + 7, ly + 1], [lx, ly + 7]], hex('#3a8a6a')); R.pset(lx - 2, ly + 5, hex('#fff0a0'));
    b_velo(R, 50, 90, 118, 118, 0.18 + Math.sin(t * 9) * 0.01, hex('#fff4d0'), 0, false); }
  // el escaneo: la luz que asoma bajo la tapa y el dibujo que aparece en píxeles en el monitor
  const u = o.escaneo ?? (t * 0.16) % 1.25, xs = Math.round(196 + Math.min(1, u) * 40);
  if (u < 1) { R.rect(xs - 1, 120, xs + 1, 128, hex('#e8fbff')); R.rect(xs - 3, 128, xs + 3, 129, hex('#bfe8f8')); R.rect(207, 124, 209, 125, hex('#5af08a')); }
  b_cristal(R, g.s, b_P('#0a0a1a', '#1a1a3a', '#3a3a6a', '#8a8ad8', '#e8e8ff'), t); b_pinturaPix(R, g.s, t, u, 2); b_reflejo(R, g.s);
  b_taza(R, 280, 128, t, hex('#c83a3a'));
  return { suelo: 152, pies: [148, 284], tablero: [22, 84, 140, 124], papel: [30, 89, 132, 119], escaner: [194, 116, 238, 128], pantalla: g.s, mesa: [186, yt, 276, yt + 26] };
}

// el cómic del papel de la mesa de dibujo: tres viñetas con el perro y el conejo (en manchas de color, sin letras)
function b_comic(u, v) {
  const P = b_PINT, vi = Math.floor(u * 3), uu = (u * 3) % 1;
  if (uu < 0.06 || uu > 0.94 || v < 0.06 || v > 0.94) return hex('#f6f2ea');
  if (uu < 0.09 || uu > 0.91 || v < 0.1 || v > 0.9) return C.k;
  const fondo = [hex('#8ac0e0'), hex('#f0d080'), hex('#c8a0d8')][vi];
  if (v > 0.18 && v < 0.38 && uu > 0.5 && uu < 0.86) return Math.abs(v - 0.28) < 0.03 && uu < 0.8 ? hex('#8a8aa0') : hex('#ffffff');
  if (Math.hypot(uu - 0.32, v - 0.58) < 0.13) return hex('#6a6a7a');
  if (uu > 0.2 && uu < 0.44 && v > 0.66 && v < 0.88) return hex('#5a5a6a');
  if (Math.hypot(uu - 0.66, v - 0.66) < 0.09) return hex('#ffffff');
  if (Math.abs(uu - 0.62) < 0.02 && v > 0.42 && v < 0.6) return hex('#ffffff');
  if (Math.abs(uu - 0.7) < 0.02 && v > 0.44 && v < 0.6) return hex('#ffffff');
  if (uu > 0.58 && uu < 0.76 && v > 0.72 && v < 0.88) return hex('#e8e2d6');
  return v > 0.86 ? P[8] : fondo;
}

function b_estEscaner(R, t, o) {
  const g = b_fondo(R, 'est-escaner', () => {
    const { rect } = R;
    b_pared(R, 0, 0, 319, 92, b_PARED, 120, 20, 300, 4); rect(0, 93, 319, 93, b_FRISO[4]); rect(0, 94, 319, 95, b_FRISO[1]); b_friso(R, 0, 96, 319, 112, b_FRISO, 14, 6);
    b_tablero(R, 0, 113, 319, 179, b_MESA, 12, 9, [100, 140, 160]); rect(0, 113, 319, 113, C.k);
    // la tapa abierta del escáner (gomaespuma blanca dentro) y su bisagra
    R.poligono([[18, 108], [172, 108], [166, 40], [26, 40]], C.k); R.poligono([[20, 107], [170, 107], [164, 42], [28, 42]], hex('#8a867a'));
    R.poligono([[28, 104], [162, 104], [157, 48], [33, 48]], hex('#e8e6e0'));
    // la gomaespuma de la tapa: poros, la marca gastada del papel, la junta gris y la pegatina con la flecha de colocar
    for (let y = 49; y <= 103; y++) for (let x = 30; x <= 160; x++) { const q = h(x, y, 499); if (R.pget(x, y) === hex('#e8e6e0') && (q < 0.16 || ((x + y) % 7 === 0 && q < 0.5))) R.pset(x, y, q < 0.05 ? hex('#c0beb6') : hex('#d6d4cc')); }
    R.poligono([[44, 98], [146, 98], [142, 58], [48, 58]], (x, y) => ((x + y) & 1) ? hex('#d8d6ce') : hex('#e2e0d8'));
    for (let x = 30; x <= 160; x++) { R.pset(x, 104, hex('#9a968a')); R.pset(x, 103, hex('#b8b4a8')); }
    rect(132, 52, 152, 62, C.k); rect(133, 53, 151, 61, hex('#f0d860')); R.linea(136, 57, 146, 57, C.k); R.pset(145, 56, C.k); R.pset(145, 58, C.k); R.pset(144, 55, C.k); R.pset(144, 59, C.k); rect(148, 55, 150, 59, hex('#c83a3a'));
    // la balda de la pared con botes de pintura y un cuadernillo, a la izquierda
    rect(0, 30, 22, 32, C.k); rect(0, 30, 21, 30, b_FRISO[4]); for (let k = 0; k < 3; k++) { rect(1 + k * 7, 21, 6 + k * 7, 29, C.k); rect(2 + k * 7, 22, 5 + k * 7, 29, [hex('#c85a5a'), hex('#3a6ab8'), hex('#e8c040')][k]); rect(1 + k * 7, 20, 6 + k * 7, 21, hex('#c8c8d0')); }
    rect(174, 14, 194, 36, C.k); rect(175, 15, 193, 35, hex('#f6f2ea')); b_boceto(R, 'perro', 179, 20, hex('#4a4a5a')); R.disco(184, 15, 1, hex('#c83a3a'));
    rect(18, 106, 172, 110, C.k); rect(19, 107, 171, 109, hex('#6a665a'));
    // el cuerpo del escáner en perspectiva, el cristal y el dibujo puesto encima
    b_sombra(R, 96, 172, 86, 4, 0.4); R.poligono([[10, 112], [182, 112], [192, 168], [0, 168]], C.k); R.poligono([[11, 113], [181, 113], [190, 166], [2, 166]], hex('#c8c4b8')); R.linea(11, 113, 181, 113, hex('#e8e4d8'));
    rect(1, 167, 191, 174, hex('#8a867a')); rect(1, 174, 191, 174, C.k); rect(10, 169, 30, 171, hex('#5a5a6a')); rect(170, 169, 176, 171, hex('#3a3a4a'));
    R.poligono([[20, 117], [172, 117], [180, 160], [12, 160]], hex('#2a3a4a'));
    for (let y = 121; y <= 156; y++) { const v = (y - 121) / 35, xa = Math.round(28 - 9 * v), xb = Math.round(164 + 9 * v); for (let x = xa; x <= xb; x++) R.pset(x, y, b_pintura((x - xa) / (xb - xa), v)); }
    // los botes de pintura, el vaso de pinceles y la paleta delante
    for (let k = 0; k < 4; k++) { const x = 196 + k * 14; rect(x, 160, x + 10, 176, C.k); rect(x + 1, 161, x + 9, 176, [hex('#c85a5a'), hex('#f09a5a'), hex('#3a6ab8'), hex('#5a8a4a')][k]); rect(x + 1, 161, x + 3, 176, b_mezcla([hex('#c85a5a'), hex('#f09a5a'), hex('#3a6ab8'), hex('#5a8a4a')][k], C.blanco, 0.3)); rect(x, 159, x + 10, 160, hex('#c8c8d0')); }
    rect(256, 148, 266, 176, C.k); rect(257, 150, 265, 176, hex('#bfe0f0')); for (let k = 0; k < 5; k++) { R.linea(258 + k * 2, 150, 252 + k * 4, 130 - k * 2, hex('#a8743c')); R.rect(251 + k * 4, 127 - k * 2, 253 + k * 4, 129 - k * 2, [hex('#c85a5a'), hex('#3a6ab8'), hex('#f8d070'), C.k, hex('#5a8a4a')][k]); }
    R.disco(296, 166, 16, C.k); R.disco(296, 166, 15, hex('#d8b880')); R.disco(302, 172, 3, hex('#8a6a3a')); for (let k = 0; k < 6; k++) R.disco(288 + (k % 3) * 7, 158 + Math.floor(k / 3) * 7, 2.2, [hex('#c85a5a'), hex('#f09a5a'), hex('#3a6ab8'), hex('#5a8a4a'), hex('#f8d070'), hex('#f2eee2')][k]);
    // el monitor de color sobre su CPU, con el cable al escáner
    b_cpu(R, 192, 132, 312, 146); const s = b_monitor(R, 196, 48, 310, 134, { P: b_P('#5e5a50', '#8a8474', '#b0aa98', '#cec8b4', '#e4dece') });
    R.linea(184, 140, 192, 140, hex('#1a1a20')); R.linea(184, 141, 192, 141, hex('#3a3a40'));
    return { s };
  });
  const u = o.escaneo ?? (t * 0.16) % 1.25;
  // la barra de luz que recorre el cristal y su brillo en la tapa
  if (u < 1) { const y = Math.round(121 + u * 35), xa = Math.round(20 - 8 * u), xb = Math.round(172 + 8 * u);
    for (let x = xa; x <= xb; x++) { R.pset(x, y, hex('#ffffff')); R.pset(x, y - 1, hex('#c8f4ff')); R.pset(x, y + 1, hex('#c8f4ff')); if ((x & 1) === 0) { R.pset(x, y - 2, b_mezcla(R.pget(x, y - 2), hex('#c8f4ff'), 0.5)); R.pset(x, y + 2, b_mezcla(R.pget(x, y + 2), hex('#c8f4ff'), 0.5)); } }
    b_velo(R, 34, 50 + Math.round(u * 50) - 6, 156, 50 + Math.round(u * 50) + 6, 0.25, hex('#c8f4ff'), 0, false); R.rect(170, 169, 176, 171, hex('#5af08a')); }
  b_cristal(R, g.s, b_P('#0a0a1a', '#1a1a3a', '#3a3a6a', '#8a8ad8', '#e8e8ff'), t); b_pinturaPix(R, g.s, t, u, 3); b_reflejo(R, g.s);
  R.rect(195, 142, 197, 143, Math.floor(t * 3) % 2 ? hex('#f04a3a') : hex('#5a2a24'));
  return { suelo: 179, pies: [], escaner: [10, 112, 182, 168], papel: [20, 121, 172, 156], pantalla: g.s };
}

function b_estMusica(R, t, o) {
  const g = b_fondo(R, 'est-musica', () => {
    const { rect } = R; b_sala(R, 130, 30, null, hex('#5a4a8a'));
    // los paneles de espuma (en relieve de huevera) detrás del sintetizador
    rect(84, 18, 212, 82, C.k); for (let y = 19; y <= 81; y++) for (let x = 85; x <= 211; x++) { const a = Math.sin((x - 85) * 0.75) * Math.sin((y - 19) * 0.75); R.pset(x, y, b_tono(b_P('#2a2a3a', '#3a3a4e', '#4a4a62', '#5a5a74'), 0.45 + a * 0.45, x, y)); }
    for (const x of [126, 170]) rect(x, 19, x, 81, C.k);
    // el disco de oro enmarcado (sin letras) y la guitarra apoyada en la pared
    rect(30, 24, 66, 60, C.k); rect(31, 25, 65, 59, hex('#3a2a1a')); rect(33, 27, 63, 57, hex('#1e1a2a')); R.disco(48, 42, 12, hex('#a87a18')); R.disco(48, 42, 11, hex('#e8b830')); for (let r = 4; r < 11; r += 2) for (let a = 0; a < 6.28; a += 0.08) R.pset(Math.round(48 + Math.cos(a) * r), Math.round(42 + Math.sin(a) * r), hex('#c8981c')); R.disco(48, 42, 3, hex('#c83a3a')); R.pset(48, 42, C.k); R.linea(40, 34, 44, 31, hex('#fff0a0'));
    { const gx = 22; R.linea(gx, 104, gx + 6, 66, C.k); R.linea(gx + 1, 104, gx + 7, 66, hex('#5a3418')); rect(gx + 5, 62, gx + 9, 67, hex('#2a1a10')); R.disco(gx - 2, 130, 9, C.k); R.disco(gx - 2, 130, 8, hex('#c8783a')); R.disco(gx - 1, 115, 7, C.k); R.disco(gx - 1, 115, 6, hex('#c8783a')); R.disco(gx - 1, 120, 3, hex('#2a1a10')); rect(gx - 5, 132, gx + 1, 133, hex('#3a2418')); for (let k = 0; k < 4; k++) R.linea(gx - 3 + k, 132, gx + 5 + k * 0.4, 70, hex('#e8e2d2')); }
    // los soportes de los altavoces y el rack
    for (const x of [52, 196]) { rect(x - 1, 112, x + 1, 150, C.k); rect(x, 112, x, 150, hex('#8a8a9a')); rect(x - 8, 150, x + 8, 152, C.k); }
    rect(214, 70, 250, 150, C.k); rect(215, 71, 249, 149, hex('#2a2a32')); for (let k = 0; k < 7; k++) { const y = 74 + k * 11; rect(216, y, 248, y + 9, hex('#3a3a46')); rect(216, y, 248, y, hex('#5a5a6a')); R.pset(218, y + 4, hex('#c8c8d0')); R.pset(246, y + 4, hex('#c8c8d0')); for (let i = 0; i < 4; i++) R.disco(226 + i * 5, y + 5, 1.2, hex('#1a1a20')); }
    // el escritorio con el ordenador de ámbar
    b_escritorio(R, 254, 316, 124, 7, 'der'); b_cpu(R, 258, 114, 300, 125); const s = b_monitor(R, 262, 88, 298, 114);
    // los cables por la moqueta y los auriculares colgados
    for (let k = 0; k < 3; k++) { let px = 120 + k * 30, py = 156; for (let i = 0; i < 40; i++) { const nx = px + 2 + Math.sin(i * 0.5 + k) * 1, ny = 156 + k * 5 + Math.sin(i * 0.3 + k * 2) * 3; R.linea(px, py, nx, ny, hex('#1a1a20')); px = nx; py = ny; } }
    rect(210, 54, 212, 60, hex('#5e6270')); for (let a = 3.3; a < 6.1; a += 0.05) R.pset(Math.round(211 + Math.cos(a) * 7), Math.round(66 + Math.sin(a) * 7), hex('#3a3a4a')); R.disco(204, 68, 3, hex('#2a2a32')); R.disco(218, 68, 3, hex('#2a2a32'));
    return { s };
  });
  b_fluorescente(R, 186, 246, 2, t, 4);
  // los altavoces que laten con la música y las notas que salen
  const lat = Math.abs(Math.sin(t * Math.PI * 2 * 1.1)) ** 3;
  for (const x of [52, 196]) { R.rect(x - 12, 80, x + 12, 112, C.k); R.rect(x - 11, 81, x + 11, 111, hex('#2a2a32')); R.rect(x - 11, 81, x - 10, 111, hex('#4a4a56'));
    R.disco(x, 102, 7 + lat, hex('#1a1a20')); R.disco(x, 102, 6, hex('#5a5a6a')); R.disco(x, 102, 3 - lat, hex('#3a3a46')); R.disco(x, 88, 3, hex('#1a1a20')); R.disco(x, 88, 2, hex('#c8c8d0'));
    for (let k = 0; k < 2; k++) { const f = (t * 0.5 + k * 0.5 + x * 0.01) % 1, nx = Math.round(x + (x < 100 ? -1 : 1) * (6 + f * 18)), ny = Math.round(78 - f * 30 + Math.sin(t * 3 + k) * 2); if (f < 0.85) { R.disco(nx, ny, 1.5, hex('#e8c040')); R.linea(nx + 1, ny, nx + 1, ny - 5, hex('#e8c040')); R.pset(nx + 2, ny - 5, hex('#e8c040')); R.pset(nx + 3, ny - 4, hex('#e8c040')); } } }
  // los pilotos del rack y los vúmetros
  for (let k = 0; k < 7; k++) { const y = 74 + k * 11, n = Math.floor((Math.sin(t * 7 + k * 1.7) * 0.5 + 0.5) * 6 * (0.6 + lat * 0.4)); for (let i = 0; i < 6; i++) R.rect(220 + i * 4, y + 2, 222 + i * 4, y + 2, i < n ? (i > 4 ? hex('#f04a3a') : i > 3 ? hex('#f0c040') : hex('#5af08a')) : hex('#1a2a1a')); R.pset(246, y + 7, Math.floor(t * 2 + k) % 3 ? hex('#5af08a') : hex('#1a3a1a')); }
  b_cristal(R, g.s, b_AMB, t); b_pentagrama(R, g.s, t, b_AMB); b_reflejo(R, g.s);
  // el sintetizador va por delante de quien lo toca (con R.delante)
  if (o.delante !== false) { const antes = R.delante; R.delante = () => { antes?.(); b_sinte(R, t, o.toca); }; }
  else b_sinte(R, t, o.toca);
  return { suelo: 150, sueloSinte: 146, pies: [122, 290], sinte: [66, 140, 178, 168], pantalla: g.s, rack: [214, 70, 250, 150] };
}

// el sintetizador en su soporte de tijera (por delante de quien lo toca con los pies en y 146: lo tapa de cintura abajo): el cuerpo con mandos y pilotos y las teclas
// que se hunden (toca: true, en bucle)
export function sinte(R, t, toca = false) { b_sinte(R, t, toca); }

function b_sinte(R, t, toca) {
  const { rect } = R, x0 = 66, x1 = 178, d = 8;
  for (const [a, b] of [[[76, 168], [168, 150]], [[168, 168], [76, 150]]]) { R.linea(a[0], a[1], b[0], b[1], C.k); R.linea(a[0] + 1, a[1], b[0] + 1, b[1], hex('#5a5a6a')); }
  rect(x0, 140, x1, 150, C.k); rect(x0 + 1, 141, x1 - 1, 149, hex('#2a2a32')); rect(x0 + 1, 141, x1 - 1, 141, hex('#5a5a6a')); rect(x0 - 3, 166, x0 + 9, 168, C.k); rect(x1 - 9, 166, x1 + 3, 168, C.k);
  for (let i = 0; i < 6; i++) { R.disco(x0 + 6 + i * 6, 144, 1.5, hex('#c8c8d0')); R.pset(x0 + 6 + i * 6 + Math.round(Math.cos(t + i)), 144 + Math.round(Math.sin(t + i)), C.k); }
  rect(x0 + 44, 142, x0 + 64, 148, hex('#1a2a1a')); b_cifras(R, String(10 + Math.floor(t) % 90), x0 + 47, 143, hex('#5af08a'));
  for (let i = 0; i < 4; i++) R.pset(x0 + 70 + i * 6, 144, Math.floor(t * 4 + i) % 4 === 0 ? hex('#f04a3a') : hex('#5a2a24'));
  rect(x0, 150, x1, 157, C.k); const n = Math.floor((x1 - x0 - 2) / 4);
  for (let k = 0; k < n; k++) { const x = x0 + 1 + k * 4, hund = toca && h(k, Math.floor(t * 5), 500) < 0.12; rect(x, 151 + (hund ? 1 : 0), x + 2, 156, hund ? hex('#c8c4b8') : hex('#f6f2ea')); rect(x, 156, x + 2, 156, hex('#a8a498')); }
  for (let k = 0; k < n; k++) if ([0, 1, 3, 4, 5].includes(k % 7)) rect(x0 + 4 + k * 4, 151, x0 + 5 + k * 4, 153, C.k);
}

function b_estTeclado(R, t, o) {
  const g = b_fondo(R, 'est-teclado', () => {
    const { rect } = R;
    for (let y = 0; y <= 96; y++) for (let x = 0; x < 320; x++) { const a = Math.sin(x * 0.5) * Math.sin(y * 0.5); R.pset(x, y, b_tono(b_P('#22222e', '#2e2e3e', '#3a3a4e', '#4a4a60'), 0.4 + a * 0.4 + (1 - Math.hypot(x - 160, y - 40) / 260) * 0.3, x, y)); }
    for (const x of [64, 128, 192, 256]) rect(x, 0, x, 96, C.k);
    const s = b_monitor(R, 214, 48, 302, 98); rect(206, 98, 310, 100, C.k);
    return { s };
  });
  const { rect } = R, lat = Math.abs(Math.sin(t * Math.PI * 2 * 1.1)) ** 3;
  // el altavoz de la izquierda que late
  rect(10, 26, 70, 98, C.k); rect(11, 27, 69, 97, hex('#2a2a32')); rect(11, 27, 13, 97, hex('#4a4a56')); R.disco(40, 76, 18 + lat * 1.5, hex('#1a1a20')); R.disco(40, 76, 16, hex('#5a5a6a')); R.disco(40, 76, 12, hex('#4a4a56')); R.disco(40, 76, 6 - lat, hex('#3a3a46')); R.disco(40, 42, 8, hex('#1a1a20')); R.disco(40, 42, 6, hex('#c8c8d0')); R.disco(38, 40, 2, hex('#ffffff'));
  b_cristal(R, g.s, b_AMB, t); b_pentagrama(R, g.s, t, b_AMB); b_reflejo(R, g.s);
  // el panel de mandos: ruedas, potenciómetros que giran, deslizadores, pantallita con cifras y pilotos
  rect(0, 98, 319, 124, C.k); for (let y = 99; y <= 123; y++) for (let x = 0; x < 320; x++) R.pset(x, y, b_tono(b_P('#1e1e26', '#2a2a34', '#3a3a46'), 0.5 + (h(x >> 1, y, 501) - 0.5) * 0.3 - (y - 99) / 60, x, y)); rect(0, 99, 319, 99, hex('#6a6a7a'));
  for (let i = 0; i < 8; i++) { const cx = 20 + i * 18, a = t * (0.4 + i * 0.1) + i; R.disco(cx, 110, 5, C.k); R.disco(cx, 110, 4, hex('#5a5a6a')); R.disco(cx - 1, 109, 2, hex('#8a8a9a')); R.linea(cx, 110, Math.round(cx + Math.cos(a) * 4), Math.round(110 + Math.sin(a) * 4), hex('#f0c040')); }
  for (let i = 0; i < 4; i++) { const x = 170 + i * 9, p = Math.round((Math.sin(t * 0.8 + i * 1.3) * 0.5 + 0.5) * 14); rect(x, 102, x + 1, 120, C.k); rect(x - 2, 117 - p, x + 3, 119 - p, hex('#c8c8d0')); rect(x - 2, 117 - p, x + 3, 117 - p, hex('#ffffff')); }
  rect(212, 104, 262, 118, C.k); rect(213, 105, 261, 117, hex('#1a3a1a')); b_cifras(R, String(100 + Math.floor(t * 2) % 28), 218, 108, hex('#5af08a')); for (let i = 0; i < 8; i++) R.rect(236 + i * 3, 116 - Math.round(Math.abs(Math.sin(t * 4 + i)) * 8 * (0.5 + lat * 0.5)), 237 + i * 3, 116, hex('#5af08a'));
  for (let i = 0; i < 6; i++) R.disco(276 + (i % 3) * 12, 106 + Math.floor(i / 3) * 10, 2, Math.floor(t * 3 + i) % 4 === 0 ? hex('#f04a3a') : i % 2 ? hex('#3a8a4a') : hex('#5a2a24'));
  // las teclas en perspectiva (más anchas abajo), las blancas que se hunden y las negras
  const toca = o.toca ?? true, N = 22, tec = [];
  for (let k = 0; k < N; k++) { const xa = Math.round(-4 + k * 15), xb = xa + 14, hund = toca && h(k, Math.floor(t * 4), 502) < 0.16;
    rect(xa, 125, xb, 179, C.k); rect(xa + 1, 125 + (hund ? 2 : 0), xb - 1, 177, hund ? hex('#d8d4c8') : hex('#f6f2ea')); rect(xa + 1, 175, xb - 1, 177, hex('#c8c4b8')); rect(xa + 1, 125, xa + 2, 177, hex('#ffffff')); tec.push([xa, 125, xb, 179]); }
  for (let k = 0; k < N; k++) if ([0, 1, 3, 4, 5].includes(k % 7)) { const x = Math.round(-4 + k * 15) + 10; const hund = toca && h(k, Math.floor(t * 4) + 7, 502) < 0.1; rect(x, 125, x + 9, 156 + (hund ? 1 : 0), C.k); rect(x + 1, 125, x + 8, 154 + (hund ? 1 : 0), hex('#2a2a32')); rect(x + 2, 126, x + 3, 153, hex('#4a4a56')); }
  rect(0, 124, 319, 125, hex('#8a2a24'));
  return { suelo: 179, pies: [], teclas: [0, 125, 319, 179], anchoTecla: 15, pantalla: g.s };
}

// un disquete grande de 3½ (s px por unidad: 8 unidades de lado) con su etiqueta: el dibujo del juego y la misma
// línea de verbos en miniatura; sello (0–1): el sello dorado de la casa que cae y se posa en la esquina
function b_disqueteJuego(R, t, x, y, s, c, dibujo, sello) {
  const { rect } = R, w = 8 * s;
  b_sombra(R, x + w / 2 + 2, y + w + 2, w / 2 + 2, Math.max(2, s), 0.35);
  rect(x, y, x + w, y + w, C.k); rect(x + 1, y + 1, x + w - 1, y + w - 1, c); rect(x + 1, y + 1, x + w - 1, y + 1, b_mezcla(c, C.blanco, 0.35)); rect(x + w - 1, y + 2, x + w - 1, y + w - 1, b_mezcla(c, C.k, 0.35));
  rect(x + 2 * s, y + 1, x + w - 2 * s, y + Math.round(2.6 * s), hex('#c8ccd8')); rect(x + 2 * s, y + Math.round(2.6 * s), x + w - 2 * s, y + Math.round(2.6 * s), hex('#8a8e9a')); rect(x + w - 3.4 * s, y + 2, x + w - 2.6 * s, y + Math.round(2 * s), hex('#4a4e5a'));
  rect(x + w - 2, y + w - 3, x + w - 2, y + w - 2, C.k);
  // la etiqueta: el dibujo arriba y la línea de verbos abajo
  const ex0 = x + Math.round(1.2 * s), ey0 = y + Math.round(3.2 * s), ex1 = x + w - Math.round(1.2 * s), ey1 = y + w - 2;
  rect(ex0, ey0, ex1, ey1, hex('#f6f2ea')); rect(ex0, ey0, ex1, ey0, hex('#ffffff')); rect(ex1, ey0, ex1, ey1, hex('#d8d0c0'));
  const vy = ey1 - Math.max(5, Math.round((ey1 - ey0) * 0.32)), cl = [ex0 + 1, ey0 + 1, ex1 - 1, vy - 1], tin = b_mezcla(c, C.blanco, 0.55), tinS = b_mezcla(c, C.blanco, 0.3);
  for (let yy = cl[1]; yy <= cl[3]; yy++) for (let xx = cl[0]; xx <= cl[2]; xx++) R.pset(xx, yy, b_tono([tinS, tin, hex('#f6f2ea')], 1 - (yy - cl[1]) / Math.max(1, cl[3] - cl[1]) * 1.2, xx, yy));
  const f = b_BOCETOS[dibujo]; if (f) { const sc = Math.max(1, Math.floor(Math.min((cl[2] - cl[0]) / (f[0].length + 1), (cl[3] - cl[1]) / (f.length + 1)))); b_boceto(R, dibujo, Math.round((cl[0] + cl[2]) / 2 - f[0].length * sc / 2), Math.round((cl[1] + cl[3]) / 2 - f.length * sc / 2) + 1, b_mezcla(c, C.k, 0.55), sc); }
  verbos(R, t, { caja: [ex0 + 1, vy, ex1 - 1, ey1 - 1], activo: -1 });
  // el sello de la casa: una estrella dorada en un círculo, que cae y se posa sobre la esquina del plástico
  if (sello > 0) { const u = Math.min(1, sello), r = Math.max(3, Math.round(s * 0.9)), sx = x + r + 1, sy = y + r + 1 - Math.round((1 - u) * 10), rr = r + Math.round((1 - u) * 3);
    R.disco(sx + 1, sy + 1, rr, C.k); R.disco(sx, sy, rr, hex('#a87a18')); R.disco(sx, sy, rr - 1, hex('#e8b830'));
    const pts = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, q = k % 2 ? (rr - 1) * 0.42 : rr - 1.5; pts.push([sx + Math.cos(a) * q, sy + Math.sin(a) * q]); } R.poligono(pts, hex('#fff0a0'));
    if (u >= 1 && Math.sin(t * 4 + x) > 0.85) R.pset(sx - rr + 1, sy - rr + 2, hex('#ffffff')); }
}

function b_estDisquetes(R, t, o, cerca) {
  b_fondo(R, 'est-disq|' + (cerca ? 1 : 0), () => {
    const { rect } = R;
    b_pared(R, 0, 0, 319, cerca ? 30 : 62, b_PARED, 160, -10, 260, 7); rect(0, cerca ? 31 : 63, 319, cerca ? 31 : 63, b_FRISO[4]); b_friso(R, 0, cerca ? 32 : 64, 319, cerca ? 40 : 78, b_FRISO, 14, 8);
    if (!cerca) { // en la pared: el cartel del barco al atardecer, el calendario y el enchufe
      rect(98, 20, 150, 58, C.k); rect(99, 21, 149, 57, hex('#f4f0e6')); for (let y = 23; y <= 50; y++) for (let x = 101; x <= 147; x++) R.pset(x, y, y > 42 ? b_tono(b_P('#1e3a6a', '#2a5a8a', '#4a7aa8'), 0.5 + Math.sin(x * 0.7 + y) * 0.3, x, y) : b_tono(b_P('#c8503a', '#e87a3a', '#f0a84a', '#f8d070'), (y - 23) / 18, x, y));
      R.recorte([101, 23, 147, 42]); R.disco(130, 42, 6, hex('#fff0a0')); R.recorte(null); b_boceto(R, 'barco', 108, 33, hex('#2a1e2a')); rect(102, 53, 146, 54, hex('#c83a3a'));
      rect(206, 22, 232, 52, C.k); rect(207, 23, 231, 51, hex('#f4f0e6')); rect(207, 23, 231, 28, hex('#c83a3a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) rect(209 + i * 4, 31 + j * 5, 210 + i * 4, 32 + j * 5, hex('#8a8aa0')); R.disco(222, 41, 2.5, hex('#3a6ab8')); R.disco(222, 41, 1.5, hex('#f4f0e6'));
      rect(40, 66, 46, 74, hex('#e8e2d2')); R.pset(42, 70, C.k); R.pset(44, 70, C.k);
    }
    b_tablero(R, 0, cerca ? 41 : 79, 319, 179, b_MESA, cerca ? 16 : 11, 10, [160, 120, 180]); rect(0, cerca ? 41 : 79, 319, cerca ? 41 : 79, C.k);
    if (!cerca) { // la caja de plástico de disquetes abierta, a la izquierda, y el lápiz y el sello de goma a la derecha
      // (abajo a la izquierda, en primer término y lejos de la fila: por encima de los disquetes van las marcas de hecho)
      b_sombra(R, 30, 178, 26, 3, 0.35);
      R.poligono([[8, 160], [50, 160], [47, 152], [11, 152]], hex('#2a3a4a'));   // el fondo de la caja, en sombra
      for (let k = 0; k < 7; k++) b_disquete(R, 9 + k * 5, 148 + (k % 2) * 2 - (k === 3 ? 2 : 0), [hex('#3a3a4a'), hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a')][k % 5], 2);
      for (let k = 0; k < 3; k++) { const x = 14 + k * 13; rect(x, 156, x + 4, 159, C.k); rect(x + 1, 157, x + 3, 159, [hex('#f0a0b0'), hex('#a0e0f0'), hex('#f0e090')][k]); }   // las pestañas separadoras
      rect(6, 160, 52, 178, C.k);
      for (let y = 161; y <= 177; y++) for (let x = 7; x <= 51; x++) R.pset(x, y, b_tono(b_P('#7a98b0', '#98b8d0', '#b4d2e6', '#d8ecf8'), 0.62 - (y - 161) * 0.02 + (x < 12 ? 0.25 : 0) - (x > 46 ? 0.2 : 0), x, y));
      rect(7, 161, 51, 162, hex('#e8f6ff')); rect(7, 163, 51, 163, hex('#6a88a0'));
      for (let x = 12; x < 50; x += 6) { rect(x, 166, x, 175, hex('#8aa8c0')); R.pset(x + 1, 166, hex('#e8f6ff')); }
      for (let y = 165; y < 176; y += 2) R.pset(9, y, hex('#ffffff'));   // el brillo del plástico
      rect(24, 168, 34, 172, hex('#f4f0e6')); rect(25, 169, 33, 169, hex('#c83a3a')); rect(25, 171, 31, 171, hex('#8a8aa0'));   // la etiqueta sin letras
      R.linea(250, 166, 300, 150, C.k); R.linea(250, 167, 300, 151, hex('#e8c040')); R.linea(251, 168, 300, 152, hex('#b8901c')); R.pset(301, 150, hex('#f0a0b0'));
      // el tampón de tinta y el sello de goma de madera, y una libreta
      b_sombra(R, 190, 168, 22, 3, 0.35); rect(168, 152, 212, 168, C.k); rect(169, 153, 211, 167, hex('#2a2a3a')); rect(172, 155, 208, 165, hex('#8a1c24')); for (let k = 0; k < 20; k++) R.pset(173 + h(k, 1, 503) * 34, 156 + h(k, 2, 503) * 8, hex('#a8343a'));
      rect(222, 150, 236, 158, C.k); rect(223, 151, 235, 157, hex('#a8743c')); rect(226, 140, 232, 151, C.k); rect(227, 141, 231, 150, hex('#c8945a')); R.disco(229, 138, 5, C.k); R.disco(229, 138, 4, hex('#8a5428')); R.pset(227, 136, hex('#c8945a'));
      R.poligono([[60, 150], [120, 148], [122, 176], [62, 178]], C.k); R.poligono([[61, 151], [119, 149], [121, 175], [63, 177]], hex('#f6eeb8')); for (let l = 0; l < 7; l++) R.linea(66, 155 + l * 3, 116, 154 + l * 3, hex('#a8c8e0')); b_boceto(R, 'tentaculo', 72, 156, hex('#5a3a8a')); b_boceto(R, 'calavera', 96, 160, hex('#3a3a5a'));
    }
    return {};
  });
  const juegos = [['mansion', hex('#3a3a4a')], ['barco', hex('#2a4fa8')], ['tentaculo', hex('#8a3ac8')], ['fantasma', hex('#3a8a4a')], ['perro', hex('#c83a3a')], ['calavera', hex('#2a2430')], ['retrete', hex('#e8803a')]];
  const sel = o.sello ?? 0, n = cerca ? 3 : 7, s = cerca ? 11 : 5, paso = cerca ? 100 : 44, x0 = cerca ? 18 : 6, y = cerca ? 64 : 104, dis = [];
  for (let k = 0; k < n; k++) { const j = cerca ? [0, 1, 2][k] : k, x = x0 + k * paso, yy = y + Math.round(Math.sin(k * 1.7) * (cerca ? 2 : 3));
    b_disqueteJuego(R, t, x, yy, s, juegos[j][1], juegos[j][0], Math.max(0, Math.min(1, sel * n - k))); dis.push([x, yy, x + 8 * s, yy + 8 * s]); }
  // el brillo de la lámpara que pasa por los disquetes
  const bx = Math.round(((t * 40) % 420) - 50); for (let yy = 0; yy < 180; yy += 1) { const x = bx + Math.round((180 - yy) * 0.3); for (let d = 0; d < 3; d++) if (((x + d + yy) & 1) === 0) { const c = R.pget(x + d, yy); if (c && yy > (cerca ? 60 : 100)) R.pset(x + d, yy, b_mezcla(c, C.blanco, 0.12)); } }
  return { suelo: 179, pies: [], disquetes: dis };
}
// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_um = (x, y) => b_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (los de hex(): 0xAABBGGRR) en la proporción a (0–1)
function b_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el tono n (0 oscuro – 1 claro) de una rampa P, tramado: transiciones limpias sin ruido
const b_tono = (P, n, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(n * (P.length - 1) + b_um(x, y))))];

// una rampa de colores a partir de cadenas '#rrggbb'
function b_P(...l) { return l.map((s) => hex(s)); }

// rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function b_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// mezcla hacia col lo ya pintado dentro de la elipse (cx, cy, rx, ry): sombras (col oscuro) y charcos de luz (claro)
function b_sombra(R, cx, cy, rx, ry, a = 0.3, col = C.k) {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, b_mezcla(c, col, a)); } }
}

// mezcla hacia col lo ya pintado dentro del rectángulo, en damero (luz que entra, reflejos)
function b_velo(R, x0, y0, x1, y1, a = 0.3, col = C.blanco, inclin = 0, todo = false) {
  for (let y = Math.round(y0); y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = Math.round(x0) + d; x <= x1 + d; x++) if (todo || ((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, b_mezcla(c, col, a)); } }
}

// los fondos fijos de cada encuadre se pintan una vez en un búfer y se copian en cada fotograma
const b_capas = new Map();

function b_fondo(R, clave, dibuja) {
  let c = b_capas.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); const info = dibuja(); R.usar(prev); c = { b, info }; b_capas.set(clave, c); }
  R.copiar(c.b); return c.info;
}

// pared de yeso pintado: la luz baja tramada con la distancia al foco (lx, ly), con grano fino y alguna mancha
function b_pared(R, x0, y0, x1, y1, P, lx, ly, alcance = 200, k = 0) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot(x - lx, (y - ly) * 1.3) / alcance, g = h(x >> 1, y >> 1, 400 + k), g2 = h(x, y, 401 + k);
    const n = 1 - d + (g < 0.05 ? -0.18 : g > 0.96 ? 0.12 : 0) + (g2 < 0.08 ? -0.1 : 0);
    B[y * 320 + x] = b_tono(P, n, x, y);
  }
}

// friso de tablas verticales de madera (ancho w): ranura, canto de luz, vetas y la luz que baja hacia el suelo
function b_friso(R, x0, y0, x1, y1, P, w = 10, k = 0) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = Math.floor((x - x0) / w), u = (x - x0) % w; let n = 0.58 + (h(i, 1, 410 + k) - 0.5) * 0.3 - (y - y0) / Math.max(1, y1 - y0) * 0.3;
    if (u === 0) n = 0.02; else if (u === 1) n += 0.28; else if (h(x * 3 + i, Math.floor(y / (4 + (i % 3) * 2)), 411 + k) < 0.16) n -= 0.24;
    B[y * 320 + x] = b_tono(P, n, x, y);
  }
}

// tablero de madera visto desde arriba (tablas horizontales de alto tabla): juntas, vetas, nudos y el canto de luz
function b_tablero(R, x0, y0, x1, y1, P, tabla = 9, k = 0, luz = null) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / tabla), v = (y - y0) % tabla;
    for (let x = x0; x <= x1; x++) {
      let n = 0.55 + (h(f, 2, 420 + k) - 0.5) * 0.25;
      if (v === tabla - 1) n = 0.05; else if (v === 0) n += 0.2;
      else { const veta = Math.sin((x + h(f, 3, 421 + k) * 300) * 0.09 + Math.sin(x * 0.023 + f) * 2.2 + v * 0.8); if (veta > 0.82) n -= 0.22; else if (veta < -0.9) n += 0.12; }
      if (luz) n += Math.max(0, 1 - Math.hypot((x - luz[0]) / luz[2], (y - luz[1]) / (luz[2] * 0.5))) * 0.4;
      B[y * 320 + x] = b_tono(P, n, x, y);
    } }
}

// moqueta de oficina vista en perspectiva desde y0: el rizo, un dibujo de rombos que se achica al fondo y manchas
function b_moqueta(R, y0, P, motivo, k = 0, luz = null) {
  const B = R.buf;
  for (let y = y0; y < 180; y++) { const z = 30 / (y - y0 + 14), v = (y - y0 + 6) * 0.22, f = y * 320;
    for (let x = 0; x < 320; x++) {
      const u = (x - 160) * z * 0.9;
      let n = 0.42 + (y - y0) / (180 - y0) * 0.18 + (h(x, y, 430 + k) < 0.18 ? -0.16 : 0) + (((x + y) & 1) ? 0.04 : 0);
      const du = Math.abs(((u / 5) % 1 + 1) % 1 - 0.5), dv = Math.abs(((Math.log(y - y0 + 14) * 6.5) % 1 + 1) % 1 - 0.5);
      let c = null; if (du + dv < 0.17) c = motivo; else if (du + dv < 0.24) n -= 0.12;
      if (luz) { const d = Math.round((y - y0) * luz[2]); if (x >= luz[0] + d && x <= luz[1] + d) n += 0.3; }
      B[f + x] = c && b_um(x, y) < 0.8 ? c : b_tono(P, n, x, y);
    } }
}

// techo de placas acústicas (de y0 a y1): la rejilla de perfiles, el picado de las placas y una rejilla de ventilación
function b_techo(R, y0, y1, P, k = 0) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const gx = (x + 8) % 30 === 0, n = 0.6 + (h(x, y, 440 + k) < 0.12 ? -0.2 : 0) - (y - y0) * 0.02;
    B[y * 320 + x] = gx || y === y1 ? P[1] : b_tono(P, n, x, y);
  }
}

// un rectángulo con canto: contorno, cuerpo, luz arriba e izquierda y sombra abajo y derecha
function b_caja(R, x0, y0, x1, y1, c, cL, cS, k = C.k) {
  const { rect } = R; rect(x0, y0, x1, y1, k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, cL); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, cL); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, cS); rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, cS);
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba) de ancho w; respeta R.recorte
function b_nube(R, cx, cy, w, P) {
  const n = Math.max(3, Math.round(w / 7));
  for (const [dy, c, s] of [[1, P[0], 1], [0, P[1], 1], [-1, P[2], 0.62]]) for (let i = 0; i < n; i++) {
    const u = i / (n - 1) - 0.5, r = w * (0.2 - Math.abs(u) * 0.16) * s + 1;
    R.disco(cx + u * w * 0.8 - (dy < 0 ? w * 0.05 : 0), cy - r * 0.35 + dy * (dy > 0 ? 1.4 : 1.2), r, c);
  }
  for (let x = Math.round(cx - w * 0.42); x <= cx + w * 0.42; x++) R.pset(x, Math.round(cy + 1), P[0]);
}

// una palmera: tronco curvo con anillos y siete hojas que se mecen con el viento (respeta R.recorte)
function b_palmera(R, x, suelo, alto, t, P, curva = 1) {
  const m = Math.sin(t * 1.1 + x * 0.3) * 1.2;
  let tx = x, ty = suelo - alto;
  for (let i = 0; i <= alto; i++) { const u = i / alto, cx = Math.round(x + Math.sin(u * 1.7) * 5 * curva + m * u * u), cy = suelo - i;
    R.pset(cx, cy, i % 3 === 0 ? P[0] : P[1]); R.pset(cx + 1, cy, i % 3 === 0 ? P[1] : P[2]); if (alto > 30) R.pset(cx - 1, cy, P[0]); tx = cx; ty = cy; }
  for (let k = 0; k < 8; k++) { const a = -Math.PI * 1.05 + k * Math.PI / 6.4 + Math.sin(t * 1.6 + k * 1.3 + x) * 0.07, L = Math.max(9, alto * (0.4 + (k % 3) * 0.06));
    for (let d = 1; d < L; d++) { const px = tx + Math.cos(a) * d, py = ty + Math.sin(a) * d * 0.6 + d * d / (L * 1.4);
      R.pset(Math.round(px), Math.round(py), d < L * 0.3 ? P[4] : P[3]); R.pset(Math.round(px), Math.round(py) - 1, P[4]); if (d % 2 === 0 && d > 2) { R.pset(Math.round(px), Math.round(py) + 1, P[5]); if (d < L - 2) R.pset(Math.round(px - Math.cos(a)), Math.round(py) + 2, P[5]); } } }
  R.disco(tx, ty + 1, 1.6, P[6]); R.pset(tx + 2, ty + 2, P[6]);
}

// un pájaro lejano (dos alas que baten)
function b_pajaro(R, x, y, t, c) { const a = Math.sin(t * 9 + x) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 1 : -0), c); R.pset(x + 2, y - (a ? 1 : 0), c); }

// el cielo de California por una ventana (cl el hueco): azul tramado, monte azulado, colinas doradas con encinas,
// nubes de tres tonos a tres velocidades, pájaros, palmeras al viento y un coche que pasa; o.hor (el horizonte),
// o.palmeras ([[x, alto]…]), o.persiana (la y hasta la que baja la persiana; null sin persiana), o.tarde (0–1)
const b_CIELO = b_P('#3a7ed0', '#4e92dc', '#68a8e6', '#8cc0ee', '#b4d8f2', '#d8ecf4');

const b_PALMA = b_P('#5a4632', '#7a6044', '#9a7c58', '#2e6a3a', '#4a8a44', '#3e7a3c', '#8a6a3a');

const b_NUBE = b_P('#b8c8dc', '#eef2f6', '#ffffff');

function b_ventana(R, t, cl, o = {}) {
  const [x0, y0, x1, y1] = cl, hor = o.hor ?? Math.round(y0 + (y1 - y0) * 0.68), B = R.buf;
  for (let y = y0; y <= Math.min(y1, hor); y++) { const n = 1 - (y - y0) / Math.max(1, hor - y0) * 0.95; for (let x = x0; x <= x1; x++) B[y * 320 + x] = b_tono(b_CIELO, 1 - n + 0.05, x, y); }
  R.recorte(cl);
  // el monte lejano y las colinas doradas con sus encinas
  for (let x = x0; x <= x1; x++) { const ym = Math.round(hor - 6 - 7 * Math.max(0, Math.sin((x + 30) * 0.035)) - 2 * Math.sin(x * 0.11)); for (let y = ym; y <= hor; y++) R.pset(x, y, (y - ym) < 2 ? hex('#8a9ac8') : hex('#7484b4')); }
  for (let x = x0; x <= x1; x++) { const yc = Math.round(hor - 2 - 3 * Math.sin(x * 0.07 + 1) - 2 * Math.sin(x * 0.19)); for (let y = yc; y <= y1; y++) R.pset(x, y, y - yc < 1 ? hex('#e8cc80') : b_tono(b_P('#a07c3c', '#b8944a', '#cca85a'), 0.8 - (y - yc) / 12, x, y)); }
  for (let k = 0; k < 9; k++) { const ex = x0 + Math.round(h(k, 1, 450) * (x1 - x0)), ey = Math.round(hor + 1 + h(k, 2, 450) * 5); R.disco(ex, ey, 1.5, hex('#4a6a3a')); R.pset(ex - 1, ey - 1, hex('#6a8a4a')); }
  // las nubes, a tres velocidades
  const W = x1 - x0 + 60;
  for (let k = 0; k < 4; k++) { const v = [1.2, 2.2, 3.6, 1.6][k], w = [26, 18, 12, 20][k], cy = y0 + 6 + [2, 10, 5, 16][k];
    const cx = x0 - 30 + ((h(k, 3, 451) * W + t * v) % W); if (cy < hor - 6) b_nube(R, cx, cy, w, b_NUBE); }
  // dos pájaros que cruzan
  for (let k = 0; k < 2; k++) { const px = Math.round(x1 + 10 - ((t * (6 + k * 3) + k * 40) % (x1 - x0 + 30))), py = Math.round(y0 + 12 + k * 7 + Math.sin(t * 1.3 + k) * 2); b_pajaro(R, px, py, t, hex('#2a3a5a')); }
  // un coche que pasa por la carretera de abajo
  { const yr = Math.min(y1 - 2, hor + 7), cx = Math.round(x0 - 14 + ((t * 11) % (x1 - x0 + 40))); for (let x = x0; x <= x1; x++) R.pset(x, yr + 2, hex('#8a8478')); if (yr + 1 <= y1) { R.linea(cx, yr, cx + 9, yr, hex('#c83a3a')); R.linea(cx + 2, yr - 1, cx + 6, yr - 1, hex('#c83a3a')); R.pset(cx + 3, yr - 1, hex('#bfe0f0')); R.pset(cx + 5, yr - 1, hex('#bfe0f0')); R.pset(cx + 1, yr + 1, C.k); R.pset(cx + 8, yr + 1, C.k); } }
  for (const [px, al, cu] of o.palmeras ?? []) b_palmera(R, px, y1 + 2, al, t, b_PALMA, cu ?? 1);
  R.recorte(null);
  if (o.tarde) b_velo(R, x0, y0, x1, y1, 0.25 * o.tarde, hex('#f0a060'), 0, true);
  // la persiana de lamas, recogida hasta o.persiana, con su cordón que se mece
  if (o.persiana != null) { const yp = Math.min(y1, o.persiana);
    for (let y = y0; y <= yp; y++) { const r = (y - y0) % 3; R.rect(x0, y, x1, y, r === 0 ? hex('#f2ece0') : r === 1 ? hex('#d8d0c0') : hex('#9a9282')); }
    R.rect(x0, yp, x1, yp + 1, hex('#8a8272')); R.rect(x0, yp + 2, x1, yp + 2, C.k);
    const cx = x1 - 4, sw = Math.round(Math.sin(t * 1.4) * 1.3); R.linea(cx, y0, cx + sw, yp + 14, hex('#e8e0d0')); R.disco(cx + sw, yp + 15, 1, hex('#c8c0b0')); }
}

// el monitor de tubo beige de los ochenta (el chasis, el bisel hundido, los mandos y la rejilla): lo fijo; devuelve el
// hueco de la pantalla [x0, y0, x1, y1]
const b_BEIGE = b_P('#6e6450', '#a0947a', '#c4b898', '#dcd2b4', '#eee6cc');

function b_monitor(R, x0, y0, x1, y1, o = {}) {
  const { rect, pset } = R, P = o.P ?? b_BEIGE, w = x1 - x0, m = Math.max(3, Math.round(w * 0.085)), mb = Math.max(4, Math.round((y1 - y0) * 0.13));
  rect(x0, y0, x1, y1, C.k);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, b_tono(P, 0.82 - (x - x0) / w * 0.25 - (y - y0) / (y1 - y0) * 0.15, x, y));
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, P[4]); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, P[4]); rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, P[1]); rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, P[1]);
  const s = [x0 + m, y0 + m - 1, x1 - m, y1 - mb];
  // el bisel hundido alrededor del cristal
  rect(s[0] - 2, s[1] - 2, s[2] + 2, s[3] + 2, P[1]); rect(s[0] - 2, s[1] - 2, s[2] + 2, s[1] - 2, P[0]); rect(s[0] - 2, s[1] - 2, s[0] - 2, s[3] + 2, P[0]); rect(s[0] - 1, s[3] + 2, s[2] + 2, s[3] + 2, P[3]); rect(s[2] + 2, s[1] - 1, s[2] + 2, s[3] + 2, P[3]);
  rect(s[0] - 1, s[1] - 1, s[2] + 1, s[3] + 1, C.k);
  // los mandos, la franja de color (sin marca) y el piloto
  const yb = Math.round((s[3] + y1) / 2) + 1;
  if (w > 26) { rect(x0 + m, yb - 1, x0 + m + Math.max(4, Math.round(w * 0.12)), yb, P[1]); for (let i = 0; i < 3; i++) pset(x0 + m + 1 + i * 2, yb - 1, [hex('#c84a3a'), hex('#e8c040'), hex('#3a8ac8')][i]);
    for (let k = 0; k < 2; k++) { const kx = x1 - m - 2 - k * 5; R.disco(kx, yb, w > 60 ? 2 : 1, C.k); pset(kx, yb - 1, P[4]); } }
  // la rejilla de ventilación arriba
  if (o.rejilla !== false) for (let x = x0 + m + 2; x < x1 - m - 2; x += 3) rect(x, y0 + 3, x + 1, y0 + 3, P[1]);
  return s;
}

// tintas de las pantallas: el fósforo verde y el ámbar (de fondo a brillo) y el color de la VGA
const b_FOS = b_P('#081a10', '#103a22', '#1e7040', '#4ae07a', '#c8ffd8');

const b_AMB = b_P('#160c04', '#3e2408', '#9a5e18', '#f0b03a', '#ffe8b0');

// el cristal de una pantalla de tubo: fondo con líneas de barrido, esquinas curvas más oscuras y un reflejo diagonal
function b_cristal(R, s, P, t) {
  const [x0, y0, x1, y1] = s, w = x1 - x0, hh = y1 - y0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const ex = Math.min(x - x0, x1 - x), ey = Math.min(y - y0, y1 - y), esq = ex + ey < 3 ? 2 : ex < 1 || ey < 1 ? 1 : 0;
    R.pset(x, y, esq === 2 ? C.k : (y & 1) ? P[0] : esq ? P[0] : b_mezcla(P[0], P[1], 0.45)); }
  // una banda de barrido que baja despacio
  const yb = y0 + Math.floor((t * 9) % (hh + 10)) - 5; for (let y = yb; y < yb + 3; y++) if (y > y0 && y < y1) for (let x = x0 + 1; x < x1; x++) if ((x + y) & 1) R.pset(x, y, b_mezcla(R.pget(x, y), P[2], 0.25));
}

// el reflejo del cristal, encima de lo que haya en la pantalla
function b_reflejo(R, s) { const [x0, y0, x1, y1] = s, n = Math.round(Math.min(x1 - x0, y1 - y0) * 0.35); for (let i = 0; i < n; i++) for (const d of [0, 2]) { const x = x0 + 3 + i + d, y = y0 + 2 + n - i; if (x < x1 && y < y1 && ((x + y) & 1)) R.pset(x, y, b_mezcla(R.pget(x, y), C.blanco, 0.35)); } }

// líneas de programa sin letras (guiones de distinta longitud con sangrías) que suben despacio, y el cursor que parpadea
function b_codigo(R, s, t, P, k = 0, v = 1.3) {
  const [x0, y0, x1, y1] = s, paso = (y1 - y0) > 30 ? 3 : 2, n = Math.floor((y1 - y0 - 2) / paso), base = Math.floor(t * v);
  let ux = x0 + 2, uy = y0 + 2;
  for (let i = 0; i < n; i++) { const l = base + i, y = y0 + 2 + i * paso, ind = Math.floor(h(l, 1, 460 + k) * 4) * 3; let x = x0 + 2 + ind; const fin = x0 + 2 + ind + Math.round(h(l, 2, 460 + k) * (x1 - x0 - 8 - ind));
    if (h(l, 5, 460 + k) < 0.12) continue;
    while (x < fin && x < x1 - 2) { const L = 2 + Math.round(h(x, l, 461 + k) * 5); R.linea(x, y, Math.min(fin, x + L, x1 - 2), y, h(l, x, 462 + k) < 0.25 ? P[4] : P[3]); x += L + 2; }
    ux = Math.min(x, x1 - 3); uy = y; }
  if (Math.floor(t * 2.5) % 2) R.rect(ux + 1, uy - 1, ux + 2, uy, P[4]);
}

// un pentagrama que avanza con sus notas (la pantalla del rincón de la música)
function b_pentagrama(R, s, t, P) {
  const [x0, y0, x1, y1] = s, n = Math.max(1, Math.floor((y1 - y0 - 2) / 16));
  for (let p = 0; p < n; p++) { const yb = y0 + 4 + p * 16; for (let l = 0; l < 5; l++) R.linea(x0 + 2, yb + l * 2, x1 - 2, yb + l * 2, P[2]);
    for (let k = 0; k < 14; k++) { const x = Math.round(x1 - 4 - ((k * 11 + t * 14 + p * 5) % (x1 - x0 - 8))), ny = yb + Math.floor(h(k, p, 465) * 9); if (x <= x0 + 2) continue; R.pset(x, ny, P[4]); R.pset(x + 1, ny, P[4]); R.pset(x, ny + 1, P[3]); R.pset(x + 1, ny + 1, P[3]); R.linea(x + 1, ny - 1, x + 1, ny - 5, P[3]); } }
  const xp = x0 + 10 + Math.round((t * 6) % (x1 - x0 - 14)); R.linea(xp, y0 + 2, xp, y1 - 2, P[4]);
}

// las cajas de juegos inventadas: [color de la caja, cielo, dibujo, extra] (extra: 'luna', 'reloj', 'sombrero')
const b_JUEGOS = [['#1e2a5a', '#3a4a8a', 'barco', 'luna'], ['#e8803a', '#f8c060', 'retrete', 'reloj'], ['#2a1e3a', '#c8603a', 'calavera', 'sombrero'], ['#5a2a8a', '#8ad0a0', 'tentaculo', null], ['#2a2a3a', '#7a3a6a', 'mansion', 'luna'], ['#8a2a2a', '#e8c040', 'perro', null]];

// una caja de juego de cartón de frente (x, y, w, hh) con su dibujo inventado (k: cuál), el canto lateral y, con abre
// (0–1), la tapa levantada y los disquetes, el manual y el mapa de dentro
function b_cajaJuego(R, x, y, w, hh, k, abre = 0) {
  const { rect, pset } = R, [cc, cielo, dib, extra] = b_JUEGOS[k % b_JUEGOS.length], c = hex(cc), cs = hex(cielo), fr = b_BOCETOS[dib];
  if (abre > 0) { // la tapa (la cuarta parte de arriba) gira sobre la bisagra del borde de atrás: primero se ve su cara
    // de fuera, que se acorta al echarse hacia atrás; luego queda de pie, inclinada contra el fondo, con la cara de dentro
    // (cartón) a la vista, y de dentro asoman un disquete y el mapa por delante de ella
    const lt = Math.round(hh * 0.26), yc = y + lt, yh = yc - 1, fl = Math.cos(Math.PI * abre), alto = Math.max(1, Math.round(lt * Math.abs(fl) * (fl < 0 ? 0.95 : 1))), ld = fl < 0 ? Math.round(-fl * 3) : 0;
    b_cajaJuego(R, x, yc, w, hh - lt, k, 0); R.rect(x + 1, yc + 1, x + w - 1, yc + 2, hex('#2a1a10'));
    const tapa = () => {
      if (fl >= 0) { // la cara de fuera, que se echa hacia atrás
        R.poligono([[x - 1, yh - alto], [x + w + 1, yh - alto], [x + w + 1, yh + 1], [x - 1, yh + 1]], C.k); R.poligono([[x, yh - alto + 1], [x + w, yh - alto + 1], [x + w, yh], [x, yh]], c);
        const et = Math.round(Math.max(1, hh * 0.16 - 3) * fl); if (et > 0) R.rect(x + 3, yh - alto + 3, x + w - 4, Math.min(yh - 1, yh - alto + 2 + et), hex('#f0d060'));
        R.rect(x + 1, yh - alto + 1, x + w - 1, yh - alto + 1, b_mezcla(c, C.blanco, 0.3));
      } else { // la cara de dentro, de pie e inclinada contra el fondo de la balda, con su sombra
        R.poligono([[x + 2 + ld, yh - alto + 2], [x + w + 3 + ld, yh - alto + 2], [x + w + 3, yh], [x + 2, yh]], hex('#140c08'));
        R.poligono([[x - 1 + ld, yh - alto - 1], [x + w + 1 + ld, yh - alto - 1], [x + w + 1, yh + 1], [x - 1, yh + 1]], C.k);
        R.poligono([[x + ld, yh - alto], [x + w + ld, yh - alto], [x + w, yh], [x, yh]], hex('#b89a70'));
        for (let yy = yh - alto + 1; yy < yh; yy += 3) R.linea(x + 2 + Math.round(ld * (yh - yy) / alto), yy, x + w - 2 + Math.round(ld * (yh - yy) / alto), yy, hex('#a08460'));
        R.linea(x + ld, yh - alto, x + w + ld, yh - alto, c); R.linea(x + w + ld, yh - alto, x + w, yh, b_mezcla(c, C.k, 0.3)); }
      R.rect(x + 2, yh, x + w - 2, yh + 1, hex('#5a4630')); for (let i = x + 4; i < x + w - 3; i += 6) R.pset(i, yh, hex('#8a7458'));   // la bisagra de cinta
    };
    const it = Math.round(abre * Math.min(14, hh * 0.2));
    if (fl < 0) tapa();
    // (lo de dentro asoma solo por encima del borde de la caja: b_dentroDe deshace lo que pinte el disquete más abajo)
    if (it > 0) b_dentroDe(R, [x - 4, 0, x + w + 4, yc], () => { b_disquete(R, x + Math.round(w * 0.18), yc - it, hex('#c83a3a'), Math.max(1, Math.round(w / 30))); R.poligono([[x + w * 0.55, yc - it * 0.8], [x + w * 0.85, yc - it * 0.9 - 2], [x + w * 0.88, yc + 2], [x + w * 0.56, yc + 2]], hex('#e8d8a8')); R.linea(x + w * 0.6, yc - it * 0.5, x + w * 0.8, yc - it * 0.3, hex('#c83a3a')); });
    if (fl >= 0) tapa();
    return;
  }
  rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, c); rect(x + 1, y + 1, x + 1, y + hh - 1, b_mezcla(c, C.blanco, 0.3)); rect(x + w - 1, y + 2, x + w - 1, y + hh - 1, b_mezcla(c, C.k, 0.3));
  // el dibujo de la portada sobre su cielo, y la franja de «título» hecha de barras de color sin letras
  const px0 = x + 2, py0 = y + Math.round(hh * 0.22), px1 = x + w - 3, py1 = y + hh - Math.max(3, Math.round(hh * 0.12));
  for (let yy = py0; yy <= py1; yy++) for (let xx = px0; xx <= px1; xx++) pset(xx, yy, b_tono([b_mezcla(cs, C.k, 0.3), cs, b_mezcla(cs, C.blanco, 0.3)], 1 - (yy - py0) / (py1 - py0) * 1.1, xx, yy));
  if (extra === 'luna') R.disco(px1 - Math.max(2, w * 0.18), py0 + Math.max(2, hh * 0.12), Math.max(1, w * 0.08), hex('#fff0c0'));
  const sc = Math.max(1, Math.floor(Math.min((px1 - px0) / (fr[0].length + 1), (py1 - py0 - 2) / (fr.length + 1))));
  const bx = Math.round((px0 + px1) / 2 - fr[0].length * sc / 2), by = py1 - fr.length * sc;
  b_boceto(R, dib, bx, by, C.k, sc);
  if (extra === 'reloj') { const rx = bx + Math.round(fr[0].length * sc / 2), ry = by - 3 * sc; R.disco(rx, ry, 2 * sc, C.k); R.disco(rx, ry, 2 * sc - 1, hex('#f6f2ea')); pset(rx, ry - 1, C.k); pset(rx + 1, ry, C.k); }
  if (extra === 'sombrero') { const rx = bx + Math.round(5.5 * sc), ry = by; rect(rx - 4 * sc, ry - sc, rx + 4 * sc, ry - 1, C.k); rect(rx - 2 * sc, ry - 4 * sc, rx + 2 * sc, ry - sc, C.k); rect(rx - 2 * sc, ry - 2 * sc, rx + 2 * sc, ry - 2 * sc, hex('#c83a3a')); }
  rect(x + 3, y + 3, x + w - 4, y + Math.max(4, Math.round(hh * 0.16)), hex('#f0d060')); rect(x + 3, y + Math.max(4, Math.round(hh * 0.16)), x + w - 4, y + Math.max(4, Math.round(hh * 0.16)), b_mezcla(c, C.k, 0.4));
  for (let i = x + 5; i < x + w - 6; i += 3) pset(i, y + Math.round(hh * 0.1), b_mezcla(c, C.k, 0.2));
}

// una estantería de madera (x0–x1, de y0 con baldas de alto hb) con cajas de juegos, cartuchos y CD, y algún juguete
function b_estanteriaJuegos(R, x0, x1, y0, n, hb, k0 = 0) {
  const { rect } = R;
  rect(x0 - 1, y0 - 1, x1 + 1, y0 + n * hb + 3, C.k); rect(x0, y0, x1, y0 + n * hb + 2, b_FRISO[2]);
  for (let f = 0; f < n; f++) { const yb = y0 + (f + 1) * hb; rect(x0 + 2, yb - hb + 2, x1 - 2, yb - 1, hex('#2a1a12')); rect(x0, yb, x1, yb + 2, b_FRISO[3]); rect(x0, yb, x1, yb, b_FRISO[4]);
    let x = x0 + 3; for (let i = 0; x < x1 - 8; i++) { const k = k0 + f * 4 + i, ah = hb - 4 - (i % 2);
      if ((i + f) % 4 === 3) { for (let j = 0; j < 4 && x < x1 - 4; j++) { rect(x, yb - 7, x + 1, yb - 1, C.k); rect(x, yb - 6, x, yb - 1, [hex('#c8c8d0'), hex('#3a6ab8'), hex('#c83a3a'), hex('#e8c040')][j]); x += 2; } x += 2; continue; }
      const w = Math.min(Math.round(ah * 0.72), x1 - 3 - x); if (w < 6) break; b_cajaJuego(R, x, yb - ah, w, ah - 1, k); x += w + 1; } }
}

// el papel pintado de rayas con estrellitas (de los noventa), tramado con la luz de la lámpara y de la ventana
function b_papelPintado(R, x0, y0, x1, y1, P, lx, ly, k = 0) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot(x - lx, (y - ly) * 1.2) / 240, raya = Math.floor(x / 8) % 2, est = ((x % 16) === 4 && (y % 14) === 6) || ((x % 16) === 12 && (y % 14) === 13);
    B[y * 320 + x] = est ? P[P.length - 1] : b_tono(P, 0.9 - d - raya * 0.18 + (h(x, y, 510 + k) < 0.06 ? -0.1 : 0), x, y); }
}

// suelo de tablas de madera en perspectiva desde y0 (las tablas se estrechan al fondo), con vetas y brillos
function b_tarima(R, y0, P, k = 0, luz = null) {
  const B = R.buf;
  for (let y = y0; y < 180; y++) { const z = (y - y0 + 10) / 70, fila = y * 320;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / z, tb = Math.floor((u + 4000) / 22), du = ((u + 4000) % 22 + 22) % 22, cort = Math.floor((y - y0) / 9 + h(tb, 1, 515 + k) * 3);
      let n = 0.5 + (h(tb, cort, 516 + k) - 0.5) * 0.35 + (y - y0) / 300;
      if (du < 1.2 / z * 0.6 + 0.3) n = 0.05; else if (Math.sin(u * 0.4 + h(tb, 2, 517 + k) * 9 + (y - y0) * 0.6) > 0.93) n -= 0.2;
      if (luz) n += Math.max(0, 1 - Math.hypot((x - luz[0]) / luz[2], (y - luz[1]) / (luz[2] * 0.35))) * 0.35;
      B[fila + x] = b_tono(P, n, x, y); } }
}

// el barrio por la ventana (cl): cielo de atardecer o de noche, nubes de tres tonos, tejados con chimeneas y ventanas
// que se encienden, un árbol que se mece, pájaros o estrellas y un chico en bici que pasa
function b_barrio(R, t, cl, noche = 0) {
  const [x0, y0, x1, y1] = cl, B = R.buf, hor = y1 - 14;
  const CI = noche ? b_P('#0e1232', '#161c44', '#222a5a', '#3a3a6a') : b_P('#5a5aa0', '#a86a9a', '#e88a6a', '#f8c070', '#fce0a0');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = b_tono(CI, (y - y0) / (hor - y0) * 0.95, x, y);
  R.recorte(cl);
  if (noche) { for (let k = 0; k < 14; k++) { const tw = Math.sin(t * (1 + h(k, 3, 520)) + k); if (tw > -0.3) R.pset(x0 + Math.round(h(k, 1, 520) * (x1 - x0)), y0 + 2 + Math.round(h(k, 2, 520) * (hor - y0 - 14)), tw > 0.6 ? C.blanco : hex('#8a8ac8')); } R.disco(x0 + (x1 - x0) * 0.25, y0 + 9, 4, hex('#f4f0d8')); R.disco(x0 + (x1 - x0) * 0.25 + 2, y0 + 8, 3.5, CI[0]); }
  else { R.disco(x0 + (x1 - x0) * 0.7, hor - 6, 6, hex('#fff0b0')); for (let k = 0; k < 3; k++) { const W = x1 - x0 + 50, cx = x0 - 25 + ((h(k, 4, 521) * W + t * [1.4, 2.6, 4][k]) % W); b_nube(R, cx, y0 + 6 + k * 6, [22, 16, 11][k], b_P('#c86a7a', '#f0a08a', '#fcd0b0')); } for (let k = 0; k < 2; k++) b_pajaro(R, Math.round(x1 + 6 - ((t * (5 + k * 2) + k * 30) % (x1 - x0 + 20))), y0 + 10 + k * 6, t, hex('#3a2a4a')); }
  // los tejados de las casas de enfrente
  for (let k = 0; k < 4; k++) { const cx = x0 - 6 + k * 24 + (k % 2) * 4, w = 20, yb = hor + 2 - (k % 2) * 3, col = noche ? hex('#1a1c30') : [hex('#8a5a6a'), hex('#7a4a5a'), hex('#9a6a6a'), hex('#6a4a5a')][k];
    R.poligono([[cx - 2, yb - 8], [cx + w / 2, yb - 16], [cx + w + 2, yb - 8]], noche ? hex('#121424') : hex('#5a3a4a')); for (let y = yb - 8; y <= y1; y++) for (let x = cx; x <= cx + w; x++) R.pset(x, y, col);
    if (k % 2) { R.pset(cx + 15, yb - 15, C.k); for (let y = yb - 15; y < yb - 10; y++) { R.pset(cx + 15, y, hex('#3a2a2a')); R.pset(cx + 16, y, hex('#3a2a2a')); } }
    for (let i = 0; i < 2; i++) { const on = noche ? h(k, i + Math.floor(t / 6 + k), 522) < 0.7 : h(k, i, 523) < 0.3; for (let y = yb - 5; y < yb - 1; y++) for (let x = cx + 4 + i * 9; x < cx + 8 + i * 9; x++) R.pset(x, y, on ? hex('#f8d070') : noche ? hex('#2a2c44') : hex('#c8d8e8')); } }
  // la acera con el chico en bici que pasa
  for (let x = x0; x <= x1; x++) for (let y = hor + 3; y <= y1; y++) R.pset(x, y, y === hor + 3 ? hex('#a8a4b0') : noche ? hex('#2a2a3a') : hex('#6a6a7a'));
  { const bx = Math.round(x0 - 10 + ((t * 13) % (x1 - x0 + 30))), by = hor + 7, p = Math.floor(t * 8) % 2; for (const dx of [0, 8]) { R.pset(bx + dx - 1, by, C.k); R.pset(bx + dx + 1, by, C.k); R.pset(bx + dx, by - 1, C.k); R.pset(bx + dx, by + 1, C.k); } R.linea(bx, by, bx + 4, by - 3, hex('#c83a3a')); R.linea(bx + 4, by - 3, bx + 8, by, hex('#c83a3a')); R.pset(bx + 4 + p, by - 1, C.k); R.rect(bx + 3, by - 7, bx + 4, by - 4, hex('#3a8ac8')); R.pset(bx + 4, by - 8, hex('#f0c090')); R.pset(bx + 4, by - 9, hex('#c83a3a')); }
  // el árbol que se mece delante
  { const tx = x0 + Math.round((x1 - x0) * 0.12), m = Math.sin(t * 1.2) * 1.2; R.linea(tx, y1, tx, hor - 6, hex('#3a2a1a')); R.linea(tx + 1, y1, tx + 1, hor - 6, hex('#4a3a2a'));
    for (let k = 0; k < 16; k++) { const a = h(k, 1, 524) * 6.28, r = 3 + h(k, 2, 524) * 7; R.disco(tx + Math.cos(a) * r + m, hor - 12 + Math.sin(a) * r * 0.8, 3, noche ? [hex('#14201a'), hex('#1a2a20')][k % 2] : [hex('#3a5a3a'), hex('#5a7a3a'), hex('#7a8a4a')][k % 3]); } }
  R.recorte(null);
}

// la lámpara de lava (base en (x, y)): el cristal con su líquido y las burbujas de cera que suben y bajan
function b_lava(R, x, y, t) {
  const { rect, pset } = R; R.poligono([[x - 4, y - 6], [x + 4, y - 6], [x + 6, y], [x - 6, y]], C.k); R.poligono([[x - 3, y - 5], [x + 3, y - 5], [x + 5, y - 1], [x - 5, y - 1]], hex('#c8c8d0'));
  R.poligono([[x - 4, y - 7], [x + 4, y - 7], [x + 2, y - 26], [x - 2, y - 26]], C.k); R.poligono([[x - 3, y - 7], [x + 3, y - 7], [x + 1, y - 25], [x - 1, y - 25]], hex('#3a1a5a'));
  for (let k = 0; k < 3; k++) { const f = (Math.sin(t * 0.6 + k * 2.1) * 0.5 + 0.5), cy = y - 9 - f * 13, r = 1.5 + (k === 0 ? 0.8 : 0); R.disco(x + Math.sin(t + k) * 0.8, cy, r, hex('#f05a8a')); pset(Math.round(x - 1 + Math.sin(t + k) * 0.8), Math.round(cy - 1), hex('#ffa0c0')); }
  rect(x - 2, y - 30, x + 2, y - 26, C.k); rect(x - 1, y - 29, x + 1, y - 27, hex('#c8c8d0')); R.disco(x, y - 16, 9, (xx, yy, d) => b_mezcla(R.pget(xx, yy) || hex('#000000'), hex('#f05a8a'), 0.08 * (1 - d)));
}

// la pecera redonda con su pez que va y viene y una burbuja
function b_pecera(R, x, y, t) {
  R.disco(x, y, 8, C.k); R.disco(x, y, 7, hex('#8ac8e8')); for (let yy = y - 7; yy < y - 3; yy++) for (let xx = x - 7; xx <= x + 7; xx++) if (Math.hypot(xx - x, yy - y) < 7) R.pset(xx, yy, hex('#d8eef8'));
  R.rect(x - 5, y + 4, x + 5, y + 6, hex('#e8c87a')); R.pset(x - 3, y + 3, hex('#3a8a4a')); R.pset(x - 3, y + 2, hex('#3a8a4a')); R.pset(x + 2, y + 3, hex('#c83a3a'));
  const fx = Math.round(x + Math.sin(t * 0.9) * 4), d = Math.cos(t * 0.9) > 0 ? 1 : -1, fy = y + Math.round(Math.sin(t * 1.7));
  R.rect(fx - 1, fy, fx + 1, fy + 1, hex('#f08a2a')); R.pset(fx - 2 * d, fy, hex('#f0b04a')); R.pset(fx - 2 * d, fy + 1, hex('#f0b04a')); R.pset(fx + d, fy, C.k);
  const b = (t * 0.8) % 1; R.pset(fx + d * 2, Math.round(fy - 1 - b * 6), hex('#ffffff')); R.pset(x - 4, y - 5, hex('#ffffff'));
}

// la mansión en la pantalla: en píxeles (bloque b) o, con hd 0–1, una barrida que la pasa a dibujo nuevo
function b_mansionPantalla(R, s, t, hd = 0, bloque = 3) {
  const [x0, y0, x1, y1] = s, W = x1 - x0, H = y1 - y0, xl = x0 + Math.round(hd * (W + 1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (x < xl) { const u = (x - x0) / W, v = (y - y0) / H, c = b_pintura(u, v), c2 = b_pintura(u + 0.008, v + 0.012); let col = c === c2 ? c : b_um(x, y) < 0.5 ? c : c2;
      const q = h(x, y, 549); if (col === b_PINT[7] || col === b_PINT[8]) col = q < 0.18 ? b_mezcla(col, C.k, 0.2) : q > 0.9 ? b_mezcla(col, hex('#c8e870'), 0.35) : col;
      else if (v < 0.5 && col !== b_PINT[5] && col !== b_PINT[10] && col !== b_PINT[9]) col = b_mezcla(col, b_pintura(u, v + 0.07), b_um(x, y) * 0.5);
      if (v < 0.14 && q < 0.012) col = hex('#fff8e0'); R.pset(x, y, col); }
    else { const bx = x0 + Math.floor((x - x0) / bloque) * bloque, by = y0 + Math.floor((y - y0) / bloque) * bloque; R.pset(x, y, b_pintura((bx - x0) / W, (by - y0) / H)); } }
  if (hd > 0 && hd < 1) for (let y = y0; y <= y1; y++) { R.pset(xl, y, hex('#ffffff')); R.pset(xl - 1, y, hex('#bfe8f8')); if (xl + 1 <= x1) R.pset(xl + 1, y, hex('#8ad0f0')); }
  // la ventana de la torre que parpadea y el tentáculo morado que se asoma a la puerta
  if (Math.sin(t * 2.3) > 0.2) { const wx = x0 + Math.round(W * 0.61), wy = y0 + Math.round(H * 0.3); R.pset(wx, wy, hex('#fff8c0')); }
  const tx = x0 + Math.round(W * 0.53), ty = y0 + Math.round(H * 0.6), sc = Math.max(1, Math.round(W / 90)), sal = Math.abs(Math.sin(t * 2)) * 2 * sc;
  R.rect(tx - sc, ty - 4 * sc - sal, tx + sc, ty - sal, hex('#8a3ac8')); R.pset(tx, ty - 3 * sc - sal, C.blanco);
}

function b_cuarto90(R, t, o) {
  const yt = 120, noche = o.luz === 'noche' ? 1 : 0;
  const g = b_fondo(R, 'c90|' + noche, () => {
    const { rect } = R;
    b_papelPintado(R, 0, 0, 319, 106, b_P('#3a5a7a', '#4a6a8e', '#5a7ea0', '#6e92b2', '#86a8c4', '#e8e0a8'), 140, 90, 1);
    rect(0, 107, 319, 107, hex('#f2eee2')); rect(0, 108, 319, 112, hex('#d8d0c0')); rect(0, 113, 319, 113, hex('#8a8272'));
    b_moqueta(R, 114, b_P('#2a3a5a', '#34466a', '#3e527a', '#4a5e88', '#566a94'), hex('#c8a040'), 4, [180, 260, 0.4]);
    rect(0, 114, 319, 114, hex('#1a2238'));
    // la ventana con cortinas
    rect(208, 16, 272, 78, C.k); rect(209, 17, 271, 77, hex('#f2eee2')); rect(211, 19, 269, 75, hex('#8a8272')); rect(239, 19, 240, 75, hex('#f2eee2')); rect(205, 77, 275, 80, hex('#f2eee2')); rect(205, 80, 275, 80, C.k);
    // los pósters: el transbordador y el dinosaurio, sin letras
    rect(14, 18, 46, 62, C.k); rect(15, 19, 45, 61, hex('#0e1232')); for (let k = 0; k < 20; k++) R.pset(16 + h(k, 1, 525) * 28, 20 + h(k, 2, 525) * 40, hex('#c8c8e8'));
    R.poligono([[30, 26], [34, 34], [34, 50], [26, 50], [26, 34]], hex('#f2eee2')); R.poligono([[26, 44], [21, 52], [26, 52]], hex('#c8c8d0')); R.poligono([[34, 44], [39, 52], [34, 52]], hex('#c8c8d0')); rect(27, 50, 33, 52, hex('#2a2a3a')); for (let k = 0; k < 6; k++) R.pset(28 + (k % 3) * 2, 53 + Math.floor(k / 3), [hex('#f8d070'), hex('#f08a3a')][k % 2]); R.disco(30, 58, 3, hex('#e8e8f0'));
    rect(150, 20, 186, 50, C.k); rect(151, 21, 185, 49, hex('#f0d080')); R.poligono([[156, 44], [160, 34], [170, 30], [176, 24], [180, 26], [178, 30], [174, 34], [178, 44]], hex('#3a8a4a')); for (const x of [162, 172]) rect(x, 42, x + 2, 47, hex('#3a8a4a')); R.pset(177, 26, C.k); R.poligono([[151, 47], [185, 47], [185, 49], [151, 49]], hex('#c8783a'));
    // la estantería de juegos y, encima, la pecera
    b_estanteriaJuegos(R, 54, 140, 34, 2, 20, 0); rect(54, 33, 140, 33, b_FRISO[4]);
    // la cama con su manta de cuadros escoceses y la almohada
    rect(0, 112, 66, 150, C.k); rect(0, 104, 6, 150, b_FRISO[1]); rect(0, 104, 6, 104, b_FRISO[4]);
    for (let y = 118; y <= 146; y++) for (let x = 0; x <= 65; x++) { const a = ((x >> 2) % 3 === 0), b = (((y - 118) >> 2) % 3 === 0); R.pset(x, y, a && b ? hex('#2a3a6a') : a || b ? hex('#c83a3a') : hex('#a82a2a')); if (((x + y) & 3) === 0 && (a || b)) R.pset(x, y, hex('#f0d060')); }
    rect(8, 112, 34, 120, C.k); rect(9, 113, 33, 119, hex('#f2eee2')); rect(9, 118, 33, 119, hex('#c8c0b0')); rect(0, 146, 66, 150, hex('#5a2a1a')); rect(60, 146, 64, 152, hex('#3a1a10'));
    // la mesa: el ordenador de tubo con sus altavoces, la torre con el CD, el ratón y su alfombrilla, CD, una lata
    b_escritorio(R, 98, 200, yt, 9, 'der');
    const s = b_monitor(R, 124, 76, 172, 114); rect(140, 114, 156, 120, C.k); rect(141, 114, 155, 119, b_BEIGE[1]);
    for (const x of [112, 178]) { rect(x, 98, x + 10, 120, C.k); rect(x + 1, 99, x + 9, 119, b_BEIGE[2]); R.disco(x + 5, 112, 3, C.k); R.disco(x + 5, 112, 2, hex('#5a5a6a')); R.disco(x + 5, 103, 1.5, C.k); }
    b_teclado(R, 126, 123, 172, 128); rect(104, 123, 118, 130, hex('#2a5a8a')); rect(104, 123, 118, 123, hex('#4a7aaa')); R.linea(112, 124, 120, 119, hex('#3a3a3a'));
    for (let k = 0; k < 4; k++) { rect(178, 129 - k * 2, 192, 130 - k * 2, C.k); rect(179, 129 - k * 2, 191, 129 - k * 2, [hex('#c8d8e8'), hex('#e8c040'), hex('#c8d8e8'), hex('#c83a3a')][k]); }
    rect(202, 96, 222, 150, C.k); rect(203, 97, 221, 149, b_BEIGE[2]); rect(203, 97, 204, 149, b_BEIGE[4]); rect(205, 102, 219, 106, b_BEIGE[1]); rect(206, 104, 218, 104, C.k); rect(205, 110, 219, 113, b_BEIGE[1]); rect(206, 111, 218, 111, C.k); rect(208, 140, 216, 143, b_BEIGE[1]);
    // la alfombra redonda, el monopatín, los cómics y el mando de consola
    for (let y = 150; y < 180; y++) for (let x = 70; x < 260; x++) { const d = Math.hypot((x - 165) / 95, (y - 166) / 14); if (d < 1) R.pset(x, y, d > 0.85 ? hex('#e8c040') : ((Math.floor(d * 8) & 1) ? hex('#8a3a5a') : hex('#a84a6a'))); }
    rect(250, 166, 290, 170, C.k); rect(251, 166, 289, 168, hex('#5ab85a')); rect(251, 166, 289, 166, hex('#8ae07a')); for (const x of [258, 282]) { R.disco(x, 171, 2, C.k); R.disco(x, 171, 1, hex('#e8e2d2')); }
    for (let k = 0; k < 3; k++) { const x = 22 + k * 5, y = 160 - k * 2; R.poligono([[x, y], [x + 16, y - 1], [x + 17, y + 11], [x + 1, y + 12]], C.k); R.poligono([[x + 1, y], [x + 15, y - 1], [x + 16, y + 10], [x + 2, y + 11]], [hex('#e8c040'), hex('#3a8ac8'), hex('#c83a3a')][k]); rect(x + 4, y + 3, x + 11, y + 7, hex('#f6f2ea')); }
    return { s };
  });
  b_barrio(R, t, [211, 19, 238, 75], noche); b_barrio(R, t, [241, 19, 269, 75], noche);
  // las cortinas que se mueven con el aire
  for (let y = 12; y < 92; y++) { const w = 6 + Math.round(Math.sin(t * 0.8 + y * 0.08) * 1.2); for (let x = 202; x < 202 + w; x++) R.pset(x, y, (x % 3) ? hex('#e8c040') : hex('#c8a020')); R.pset(202 + w, y, C.k); for (let x = 278 - w; x < 278; x++) R.pset(x, y, (x % 3) ? hex('#e8c040') : hex('#c8a020')); R.pset(277 - w, y, C.k); }
  R.rect(198, 10, 282, 11, hex('#8a6a3a'));
  // la pantalla: la mansión en píxeles, la línea de verbos y el cursor
  b_cristal(R, g.s, b_P('#0a0a1a', '#1a1a3a', '#3a3a6a', '#8a8ad8', '#e8e8ff'), t);
  if (o.pantalla) o.pantalla(R, ...g.s, t);
  else { const sv = [g.s[0] + 1, g.s[1] + 1, g.s[2] - 1, g.s[3] - 7]; b_mansionPantalla(R, sv, t, 0, 2); verbos(R, t, { caja: [g.s[0] + 1, g.s[3] - 6, g.s[2] - 1, g.s[3] - 1], activo: Math.floor(t / 2) % 9 }); R.pset(Math.round(g.s[0] + 18 + Math.sin(t) * 10), Math.round(g.s[1] + 12 + Math.cos(t * 1.3) * 5), C.blanco); }
  b_reflejo(R, g.s);
  b_pecera(R, 128, 25, t); b_lava(R, 104, 120, t); b_planta(R, 14, 112 - 1, t, 0.6);
  R.rect(209, 143, 211, 144, Math.floor(t * 2) % 3 ? hex('#5af08a') : hex('#1a3a1a'));
  // la lata de refresco (con su brillo) y el mando de consola con su cable
  R.rect(194, 112, 198, 120, C.k); R.rect(195, 113, 197, 120, hex('#c83a3a')); R.rect(195, 116, 197, 117, C.blanco);
  return { suelo: 152, pies: [88, 236], mesa: [98, yt, 200, yt + 26], pantalla: g.s, raton: [111, 126], estanteria: [54, 34, 140, 76], ventana: [211, 19, 269, 75], cama: [0, 112, 66, 150] };
}

function b_c90Pantalla(R, t, o) {
  const g = b_fondo(R, 'c90p', () => {
    const { rect } = R;
    b_papelPintado(R, 0, 0, 319, 130, b_P('#3a5a7a', '#4a6a8e', '#5a7ea0', '#6e92b2', '#86a8c4', '#e8e0a8'), 160, 160, 2);
    b_tablero(R, 0, 131, 319, 179, b_MESA, 12, 11, [160, 150, 170]); rect(0, 131, 319, 131, C.k);
    for (const x of [8, 274]) { rect(x, 70, x + 38, 140, C.k); rect(x + 1, 71, x + 37, 139, b_BEIGE[2]); rect(x + 1, 71, x + 2, 139, b_BEIGE[4]); R.disco(x + 19, 118, 12, C.k); R.disco(x + 19, 118, 10, hex('#5a5a6a')); R.disco(x + 19, 118, 4, hex('#3a3a46')); R.disco(x + 19, 88, 6, C.k); R.disco(x + 19, 88, 4, hex('#c8c8d0')); for (let k = 0; k < 4; k++) rect(x + 6, 76 + k * 2, x + 32, 76 + k * 2, b_BEIGE[1]); }
    b_sombra(R, 160, 140, 110, 4, 0.4); const s = b_monitor(R, 54, 14, 266, 140);
    b_sombra(R, 160, 177, 96, 3, 0.4); b_teclado(R, 70, 148, 250, 176, b_BEIGE, 5);
    for (let k = 0; k < 4; k++) { rect(260, 150 - k * 2, 300, 151 - k * 2, C.k); rect(261, 150 - k * 2, 299, 150 - k * 2, [hex('#c8d8e8'), hex('#e8c040'), hex('#c8d8e8'), hex('#c83a3a')][k]); }
    rect(14, 150, 40, 172, hex('#2a5a8a')); rect(14, 150, 40, 150, hex('#4a7aaa')); rect(22, 156, 32, 168, C.k); rect(23, 157, 31, 167, b_BEIGE[3]); rect(27, 157, 27, 161, C.k); R.linea(27, 156, 34, 142, hex('#3a3a3a'));
    return { s };
  });
  const lat = Math.abs(Math.sin(t * 6)) > 0.8 ? 1 : 0; for (const x of [27, 293]) R.disco(x, 118, 4 + lat, hex('#3a3a46'));
  b_cristal(R, g.s, b_P('#0a0a1a', '#1a1a3a', '#3a3a6a', '#8a8ad8', '#e8e8ff'), t);
  const bar = 30, sv = [g.s[0] + 1, g.s[1] + 1, g.s[2] - 1, g.s[3] - bar - 1];
  let r = null;
  if (o.pantalla) o.pantalla(R, ...g.s, t);
  else { b_mansionPantalla(R, sv, t, 0, 3); r = verbos(R, t, { caja: [g.s[0] + 1, g.s[3] - bar, g.s[2] - 1, g.s[3] - 1], activo: o.activo ?? Math.floor(t / 1.5) % 9, inventario: ['llave', 'hamster', 'dentadura', 'reloj'], frase: [o.activo ?? Math.floor(t / 1.5) % 9, 'puerta'], cursor: o.cursor ?? [g.s[0] + 100 + Math.sin(t * 0.9) * 40, g.s[1] + 40 + Math.cos(t * 1.2) * 14] }); }
  b_reflejo(R, g.s);
  return { suelo: 179, pies: [], pantalla: g.s, zonaJuego: sv, teclado: [70, 148, 250, 179], botones: r?.botones };
}

function b_c90Estanteria(R, t, o) {
  b_fondo(R, 'c90e', () => {
    const { rect } = R;
    b_papelPintado(R, 0, 0, 319, 179, b_P('#3a5a7a', '#4a6a8e', '#5a7ea0', '#6e92b2', '#86a8c4', '#e8e0a8'), 160, 60, 3);
    rect(8, 40, 312, 174, C.k); rect(9, 41, 311, 173, b_FRISO[2]); // el tablero de atrás: tablas verticales con juntas, vetas y nudos, más oscuro arriba por la sombra de la balda
    for (let y = 46; y < 160; y++) for (let x = 14; x <= 306; x++) { const tb = Math.floor((x - 14) / 26), u = (x - 14) % 26, veta = Math.sin(y * 0.09 + tb * 2.1 + Math.sin(y * 0.03 + tb) * 3 + u * 0.35);
      let c = b_tono(b_P('#1a100a', '#24160e', '#2e1c12', '#3a2416'), 0.62 + veta * 0.17 + (h(tb, y >> 3, 549) - 0.5) * 0.14 - Math.max(0, 1 - (y - 46) / 16) * 0.47 + (u === 1 ? 0.2 : 0), x, y);
      if (u === 0) c = hex('#0e0806'); R.pset(x, y, c); }
    for (let k = 0; k < 9; k++) { const nx = 20 + Math.floor(h(k, 1, 548) * 280), ny = 50 + Math.floor(h(k, 2, 548) * 14); R.disco(nx, ny, 1.5, hex('#140c08')); R.pset(nx - 2, ny, hex('#3a2416')); R.pset(nx + 2, ny, hex('#3a2416')); }
    // la sombra de las cajas en el tablero (la luz viene de arriba a la izquierda)
    for (let k = 0; k < 5; k++) { const bx = 20 + k * 58; for (let y = 64; y < 160; y++) for (let x = bx + 50; x <= Math.min(305, bx + 54); x++) R.pset(x, y, b_mezcla(R.pget(x, y), C.k, 0.5)); for (let x = bx + 2; x <= bx + 54; x++) for (let y = 62; y < 66; y++) R.pset(x, y, b_mezcla(R.pget(x, y), C.k, 0.3)); }
    // cosas pequeñas en los huecos entre las cajas: un cartucho, un póster enrollado, un muñeco y un yoyó
    { rect(71, 140, 77, 159, C.k); rect(72, 141, 76, 158, hex('#5a5a66')); rect(72, 143, 76, 147, hex('#e8c040')); rect(72, 156, 76, 158, hex('#3a3a44'));
      R.linea(130, 159, 134, 118, C.k); R.linea(131, 159, 135, 118, hex('#e8e0c8')); R.linea(132, 159, 136, 118, hex('#c8bca0')); R.pset(135, 117, hex('#c83a3a')); R.pset(136, 118, hex('#c83a3a'));
      rect(187, 150, 193, 159, C.k); rect(188, 151, 192, 158, hex('#3a8a4a')); R.disco(190, 147, 3, C.k); R.disco(190, 147, 2, hex('#f0c8a0')); R.pset(189, 146, C.k); R.pset(191, 146, C.k); rect(188, 143, 192, 144, hex('#c83a3a'));
      R.disco(248, 155, 3.5, C.k); R.disco(248, 155, 2.5, hex('#3a6ac8')); R.pset(247, 154, hex('#8ab0f0')); R.linea(248, 152, 248, 130, hex('#e8e0c8')); R.pset(248, 129, C.k); }
    rect(9, 160, 311, 166, b_FRISO[3]); rect(9, 160, 311, 160, b_FRISO[4]); rect(9, 41, 311, 45, b_FRISO[3]); rect(9, 41, 311, 41, b_FRISO[4]);
    for (const x of [9, 306]) for (let y = 46; y < 160; y++) R.pset(x + 2, y, b_FRISO[1]);
    // encima de la estantería: la pecera, un robot de juguete y una pila de CD
    rect(150, 22, 166, 40, C.k); rect(151, 23, 165, 39, hex('#8a8a9a')); rect(153, 26, 163, 32, hex('#3a3a4a')); R.pset(155, 28, hex('#f04a3a')); R.pset(161, 28, hex('#f04a3a')); rect(156, 18, 160, 22, hex('#8a8a9a')); R.pset(158, 16, hex('#e8c040'));
    for (let k = 0; k < 6; k++) { rect(200, 38 - k * 2, 222, 39 - k * 2, C.k); rect(201, 38 - k * 2, 221, 38 - k * 2, [hex('#c8d8e8'), hex('#e8c040'), hex('#c83a3a')][k % 3]); }
    return {};
  });
  b_pecera(R, 60, 31, t);
  const ab = o.abre ?? 0, cajas = [], suelta = [0, 0, 0, 0, 0];
  // o.cajas: las cajas que se abren sueltas (un índice 0–4 = abierta del todo, [índice, fracción] o { índice: fracción })
  if (Array.isArray(o.cajas)) o.cajas.forEach((c) => { if (Array.isArray(c)) suelta[c[0]] = c[1]; else suelta[c] = 1; });
  else if (o.cajas) for (const k in o.cajas) suelta[k] = o.cajas[k];
  for (let k = 0; k < 5; k++) { const x = 20 + k * 58, w = 50, y = 66, hh = 92, f = Math.max(0, Math.min(1, Math.max(ab * 5 - k, suelta[k] ?? 0)));
    b_cajaJuego(R, x, y, w, hh, k, f); if (f > 0 && f < 1 && Math.sin(t * 30) > 0) R.pset(x + w / 2, y - 4, hex('#fff0a0')); cajas.push([x, y, x + w, y + hh]); }
  return { suelo: 160, pies: [], cajas };
}
// un monitor plano de hoy (marco negro fino y pie de aluminio): devuelve el hueco de la pantalla
function b_monitorPlano(R, x0, y0, x1, y1, pie = true) {
  const { rect } = R; if (pie) { const cx = Math.round((x0 + x1) / 2); rect(cx - 4, y1, cx + 4, y1 + 8, hex('#8a8e9a')); rect(cx - 3, y1, cx - 2, y1 + 8, hex('#c8ccd8')); rect(cx - 14, y1 + 8, cx + 14, y1 + 10, C.k); rect(cx - 13, y1 + 8, cx + 13, y1 + 9, hex('#a8acb8')); }
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#1e1e26')); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, hex('#2a2a34'));
  return [x0 + 2, y0 + 2, x1 - 2, y1 - 4];
}

// un portátil abierto (base en (x, y), ancho w): la pantalla (devuelve su hueco) y el teclado en perspectiva
function b_portatil(R, x, y, w, col = hex('#a8acb8')) {
  const { rect } = R, hh = Math.round(w * 0.62);
  rect(x, y - hh, x + w, y - 3, C.k); rect(x + 1, y - hh + 1, x + w - 1, y - 4, hex('#2a2a34'));
  R.poligono([[x - 3, y - 3], [x + w + 3, y - 3], [x + w + 6, y + 3], [x - 6, y + 3]], C.k); R.poligono([[x - 2, y - 2], [x + w + 2, y - 2], [x + w + 5, y + 2], [x - 5, y + 2]], col);
  for (let k = 0; k < 2; k++) for (let i = x; i < x + w; i += 3) R.pset(i, y - 1 + k * 2, hex('#5a5e6a')); rect(x + w / 2 - 4, y + 2, x + w / 2 + 4, y + 2, hex('#7a7e8a'));
  return [x + 2, y - hh + 2, x + w - 2, y - 5];
}

// una aventura nueva en una pantalla de hoy (k: cuál): fondo pintado de colores vivos, un personajillo y la línea de
// verbos abajo (en miniatura si la pantalla es pequeña)
function b_aventuraNueva(R, s, t, k) {
  const [x0, y0, x1, y1] = s, W = x1 - x0, H = y1 - y0, bar = Math.max(4, Math.round(H * 0.24)), ys = y1 - bar;
  const tema = [[b_P('#1e2a6a', '#3a5aa8', '#8ac0e8'), hex('#3a8a6a'), 'barco'], [b_P('#3a1a3a', '#8a3a6a', '#f0a050'), hex('#5a3a2a'), 'mansion'], [b_P('#0e3a3a', '#2a7a6a', '#a8e8c8'), hex('#2a5a3a'), 'tentaculo'], [b_P('#2a1a0e', '#a8502a', '#f8d070'), hex('#7a4a2a'), 'calavera']][k % 4];
  for (let y = y0; y < ys; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y > ys - Math.max(3, H * 0.18) ? tema[1] : b_tono(tema[0], 1 - (y - y0) / (ys - y0), x, y));
  const f = b_BOCETOS[tema[2]], sc = Math.max(1, Math.floor((ys - y0) / (f.length * 2.2)));
  R.recorte([x0, y0, x1, ys - 1]); b_boceto(R, tema[2], x0 + Math.round(W * 0.55), ys - Math.round(H * 0.12) - f.length * sc, b_mezcla(tema[0][0], C.k, 0.3), sc);
  const px = Math.round(x0 + W * (0.2 + ((t * 0.07 + k * 0.3) % 0.3))), pe = ys - Math.max(2, Math.round(H * 0.08)); R.rect(px - sc, pe - 6 * sc, px + sc, pe, hex('#f2eee2')); R.rect(px - sc, pe - 6 * sc, px + sc, pe - 5 * sc, hex('#f0c090')); R.recorte(null);
  verbos(R, t, { caja: [x0, ys, x1, y1], activo: Math.floor(t * 0.7 + k) % 9 });
}

function b_cuartoHoy(R, t, o) {
  const yt = 120;
  const g = b_fondo(R, 'choy', () => {
    const { rect } = R, B = R.buf;
    // la pared gris pizarra y los paneles hexagonales de espuma
    for (let y = 0; y <= 110; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_tono(b_P('#22242e', '#2a2c38', '#343644', '#3e4050', '#4a4c5e'), 0.75 - Math.hypot(x - 170, y - 100) / 260 + (h(x, y, 530) < 0.05 ? -0.1 : 0), x, y);
    for (let k = 0; k < 9; k++) { const cx = 112 + (k % 3) * 15 + (Math.floor(k / 3) % 2) * 7, cy = 26 + Math.floor(k / 3) * 13, r = 7; const pts = []; for (let i = 0; i < 6; i++) pts.push([cx + Math.cos(i * Math.PI / 3) * r, cy + Math.sin(i * Math.PI / 3) * r]);
      R.poligono(pts, C.k); R.poligono(pts.map(([a, b]) => [cx + (a - cx) * 0.85, cy + (b - cy) * 0.85]), [hex('#3a3a6a'), hex('#5a3a7a'), hex('#2a4a6a')][k % 3]); R.poligono(pts.map(([a, b]) => [cx + (a - cx) * 0.5, cy + (b - cy) * 0.5 - 1]), b_mezcla([hex('#3a3a6a'), hex('#5a3a7a'), hex('#2a4a6a')][k % 3], C.blanco, 0.12)); }
    rect(0, 111, 319, 113, hex('#1a1a22')); b_tarima(R, 114, b_P('#5a3e2a', '#7a5638', '#946a44', '#ae8456', '#c49c6a'), 2, [180, 150, 120]);
    rect(0, 114, 319, 114, hex('#1a1210'));
    // la ventana con el barrio de noche
    rect(14, 18, 76, 82, C.k); rect(15, 19, 75, 81, hex('#d8d8e0')); rect(17, 21, 73, 79, hex('#5a5a6a')); rect(44, 21, 45, 79, hex('#d8d8e0')); rect(12, 81, 78, 84, hex('#e8e8ee')); rect(12, 84, 78, 84, C.k);
    // la estantería con las cajas viejas (las mismas del cuarto de los noventa), sobre la ventana de la derecha
    b_estanteriaJuegos(R, 238, 312, 52, 2, 20, 0);
    // la mesa blanca de hoy, el monitor ancho, el portátil, la tableta en su soporte y el teléfono
    b_sombra(R, 190, 150, 72, 3, 0.4); rect(118, yt - 1, 262, yt + 4, C.k); rect(119, yt, 261, yt + 3, hex('#e8e8ee')); rect(119, yt, 261, yt, hex('#ffffff')); rect(119, yt + 3, 261, yt + 3, hex('#a8a8b8'));
    for (const x of [124, 254]) { rect(x - 1, yt + 4, x + 2, 150, C.k); rect(x, yt + 4, x + 1, 150, hex('#c8c8d0')); }
    const s = b_monitorPlano(R, 148, 66, 232, 110);
    const sp = b_portatil(R, 216, yt - 1, 22); rect(234, 106, 246, 119, C.k); rect(235, 107, 245, 118, hex('#2a2a34')); const st = [236, 108, 244, 116];
    rect(178, yt - 2, 202, yt - 1, C.k); rect(179, yt - 2, 201, yt - 2, hex('#3a3a46'));
    // el zócalo, la alfombra de rombos, los cuadros de píxeles (el tentáculo y el barco) y el puf
    rect(0, 108, 319, 113, hex('#3a3c4a')); rect(0, 108, 319, 108, hex('#5a5c6a'));
    for (let y = 140; y < 176; y++) { const v = (y - 140) / 36, xa = Math.round(96 - v * 30), xb = Math.round(256 + v * 30); for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa), borde = u < 0.04 || u > 0.96 || v < 0.08 || v > 0.92, banda = Math.floor(u * 12) % 3 === 0;
      R.pset(x, y, borde ? (((x + y) & 1) ? hex('#c8a040') : hex('#a8802a')) : banda ? (((x >> 1) + y) & 1 ? hex('#c83a5a') : hex('#a82a4a')) : b_tono(b_P('#2a3a5a', '#34466a', '#3e527a'), 0.5 + h(x, y, 533) * 0.4, x, y)); } }
    for (let x = 68; x <= 284; x += 3) { R.pset(x, 176, hex('#e8e2d2')); R.pset(x, 177, hex('#c8c2b2')); }
    // el mueble bajo de la ventana con el ordenador viejo de los noventa (guardado como recuerdo) y una consola
    rect(8, 98, 84, 113, C.k); rect(9, 99, 83, 112, hex('#e8e8ee')); rect(9, 99, 83, 99, hex('#ffffff')); rect(46, 100, 46, 111, hex('#a8a8b8')); for (const x of [26, 64]) rect(x - 3, 105, x + 3, 105, hex('#8a8a9a'));
    const sv = b_monitor(R, 18, 80, 42, 98); b_cristal(R, sv, b_FOS, 0); b_codigo(R, sv, 3, b_FOS, 5); rect(52, 92, 76, 98, C.k); rect(53, 93, 75, 97, hex('#5a5a6a')); rect(55, 94, 62, 94, hex('#3a3a46')); R.pset(72, 95, hex('#c83a3a'));
    for (const [x0, y0, d, c] of [[92, 62, 'tentaculo', hex('#8a3ac8')], [92, 86, 'barco', hex('#2a4fa8')]]) { rect(x0, y0, x0 + 18, y0 + 18, C.k); rect(x0 + 1, y0 + 1, x0 + 17, y0 + 17, hex('#f2f2f6')); rect(x0 + 3, y0 + 3, x0 + 15, y0 + 15, b_mezcla(c, C.blanco, 0.6)); b_boceto(R, d, x0 + 4, y0 + 4, c); }
    R.disco(48, 158, 18, C.k); R.disco(48, 157, 17, hex('#3a8a8a')); R.disco(43, 151, 8, hex('#5aaaaa')); rect(31, 162, 65, 170, hex('#2a6a6a')); rect(30, 170, 66, 171, C.k);
    // la silla de jugador ante la mesa, el flexo y los auriculares en su soporte
    rect(184, 84, 206, 124, C.k); rect(185, 85, 205, 123, hex('#2a2a34')); rect(188, 88, 202, 118, hex('#c83a3a')); rect(191, 90, 199, 116, hex('#2a2a34')); rect(182, 124, 208, 130, C.k); rect(183, 125, 207, 129, hex('#2a2a34')); rect(193, 130, 197, 142, hex('#5a5a6a')); rect(180, 142, 210, 144, C.k); for (const dx of [-14, 0, 14]) R.disco(195 + dx, 146, 2, C.k);
    R.linea(244, yt - 1, 250, 88, hex('#3a3a46')); R.linea(250, 88, 240, 82, hex('#3a3a46')); R.poligono([[234, 80], [244, 78], [246, 84], [236, 86]], hex('#e8e8ee'));
    rect(132, 100, 133, 119, hex('#3a3a46')); for (let a = 3.3; a < 6.1; a += 0.06) R.pset(Math.round(133 + Math.cos(a) * 6), Math.round(104 + Math.sin(a) * 6), hex('#2a2a34'));
    return { s, sp, st };
  });
  b_barrio(R, t, [17, 21, 43, 79], 1); b_barrio(R, t + 4, [46, 21, 73, 79], 1);
  // la tira de luz bajo la estantería y detrás de la mesa, que cambia de color, y su reflejo en la pared
  const hue = (t * 0.15) % 1, col = [hex('#c83ae8'), hex('#3a8ae8'), hex('#3ae8c8'), hex('#e83a8a')][Math.floor(hue * 4)];
  R.rect(238, 97, 312, 97, col); b_velo(R, 238, 98, 312, 106, 0.18, col, 0, false); R.rect(118, 118, 262, 118, col); b_velo(R, 120, 104, 260, 117, 0.12, col, 0, false);
  for (const s of [g.s]) { b_mansionPantalla(R, s, t, o.hd ?? 1, 2); }
  b_mansionPantalla(R, g.sp, t, 0, 2); b_mansionPantalla(R, g.st, t, 0, 1);
  R.rect(180, yt - 4, 190, yt - 2, C.k); R.rect(181, yt - 4, 189, yt - 3, Math.floor(t * 0.5) % 2 ? hex('#3a8ae8') : hex('#2a2a34'));
  // el gato que duerme en el puf (respira y mueve la cola) y el robot aspirador que cruza la alfombra
  { const r = Math.sin(t * 1.6) > 0 ? 1 : 0, gx = 46, gy = 150; R.disco(gx, gy, 6 + r * 0.4, C.k); R.disco(gx, gy, 5 + r * 0.4, hex('#e8803a')); R.disco(gx + 5, gy - 2, 3.5, C.k); R.disco(gx + 5, gy - 2, 2.6, hex('#e8803a')); R.pset(gx + 4, gy - 6, hex('#e8803a')); R.pset(gx + 7, gy - 6, hex('#e8803a')); R.pset(gx + 4, gy - 2, C.k); R.pset(gx + 6, gy - 2, C.k); for (let k = 0; k < 3; k++) R.pset(gx - 3 + k * 2, gy - 3, hex('#c85a1a'));
    const c = Math.sin(t * 2.2) * 3; R.linea(gx - 5, gy + 2, gx - 10, Math.round(gy + c), hex('#e8803a')); if (Math.floor(t * 0.4) % 3 === 0) R.icono('?', gx + 8, gy - 16, hex('#c8c8e0'), hex('#2a2a34'), 1); }
  { const u = (t * 0.06) % 1, rx = Math.round(40 + (u < 0.5 ? u * 2 : 2 - u * 2) * 240), ry = 172; R.disco(rx, ry, 6, C.k); R.disco(rx, ry - 1, 5, hex('#e8e8ee')); R.disco(rx, ry - 2, 2, hex('#3a3a46')); R.pset(rx + (u < 0.5 ? 4 : -4), ry - 1, Math.floor(t * 3) % 2 ? hex('#3ae8c8') : hex('#2a6a6a')); }
  b_ficus(R, 300, 168, t);
  return { suelo: 152, pies: [104, 86, 272], mesa: [118, yt, 262, 150], silla: [180, 84, 210, 146], puf: [30, 140, 66, 171], pantalla: g.s, portatil: g.sp, tableta: g.st, estanteria: [238, 52, 312, 94], ventana: [17, 21, 73, 79], mueble: [8, 98, 84, 113] };
}

function b_choyPantalla(R, t, o) {
  const g = b_fondo(R, 'choyp', () => {
    const { rect } = R, B = R.buf;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_tono(b_P('#1a1c24', '#22242e', '#2a2c38', '#343644'), 0.8 - Math.hypot(x - 160, y - 70) / 220 + (h(x, y, 531) < 0.05 ? -0.1 : 0), x, y);
    b_tablero(R, 0, 140, 319, 179, b_P('#c8c8d0', '#d8d8e0', '#e8e8ee', '#f2f2f6', '#ffffff'), 40, 12, [160, 150, 120]); rect(0, 140, 319, 140, C.k);
    const s = b_monitorPlano(R, 26, 14, 294, 132, false); rect(150, 132, 170, 140, hex('#8a8e9a'));
    return { s };
  });
  const hd = o.hd ?? ((Math.sin(t * 0.9) * 0.5 + 0.5)), cl = g.s;
  b_mansionPantalla(R, cl, t, hd, 6);
  b_reflejo(R, cl);
  // el teclado de colores: las teclas con su luz que corre en ola
  const { rect } = R; rect(40, 146, 280, 176, C.k); rect(41, 147, 279, 175, hex('#1e1e26'));
  for (let f = 0; f < 5; f++) for (let k = 0; k < 20; k++) { const x = 44 + k * 12 - (f % 2) * 3, y = 149 + f * 5; if (x > 272) continue; const c = [hex('#c83ae8'), hex('#3a8ae8'), hex('#3ae8c8'), hex('#e8c83a'), hex('#e83a8a')][Math.floor((k * 0.3 + f * 0.2 + t * 1.2) % 5)]; rect(x, y, x + 9, y + 3, hex('#2e2e38')); rect(x + 1, y + 3, x + 8, y + 3, c); if (f === 4 && k === 6) { rect(x, y, x + 40, y + 3, hex('#2e2e38')); rect(x + 1, y + 3, x + 39, y + 3, c); k += 3; } }
  return { suelo: 179, pies: [], pantalla: cl, teclado: [40, 146, 280, 176], tecla: [140, 165] };
}

function b_choyAparatos(R, t, o) {
  const g = b_fondo(R, 'choya', () => {
    const { rect } = R, B = R.buf;
    for (let y = 0; y <= 60; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_tono(b_P('#22242e', '#2a2c38', '#343644', '#3e4050'), 0.7 - Math.hypot(x - 160, y - 60) / 200 + (h(x, y, 532) < 0.05 ? -0.1 : 0), x, y);
    // los paneles hexagonales de la pared, como en el cuarto
    for (let k = 0; k < 7; k++) { const cx = 150 + (k % 4) * 15 + (Math.floor(k / 4) % 2) * 7, cy = 22 + Math.floor(k / 4) * 13, r = 7, pts = []; for (let i = 0; i < 6; i++) pts.push([cx + Math.cos(i * Math.PI / 3) * r, cy + Math.sin(i * Math.PI / 3) * r]);
      R.poligono(pts, C.k); R.poligono(pts.map(([a, b]) => [cx + (a - cx) * 0.85, cy + (b - cy) * 0.85]), [hex('#3a3a6a'), hex('#5a3a7a'), hex('#2a4a6a')][k % 3]); }
    b_tablero(R, 0, 61, 319, 179, b_MESA, 14, 15, [160, 120, 180]); rect(0, 61, 319, 62, C.k);
    // el portátil a la izquierda, la tableta apoyada en el centro y el teléfono a la derecha, con sus sombras
    b_sombra(R, 70, 150, 60, 5, 0.3); const sp = b_portatil(R, 20, 146, 100);
    b_sombra(R, 190, 156, 44, 4, 0.3); rect(148, 70, 232, 152, C.k); rect(149, 71, 231, 151, hex('#2a2a34')); rect(150, 72, 230, 150, hex('#1a1a20'));
    b_sombra(R, 276, 160, 22, 3, 0.3); rect(256, 96, 296, 158, C.k); rect(257, 97, 295, 157, hex('#2a2a34')); rect(270, 99, 282, 100, hex('#4a4a56'));
    // la taza, una figura de tentáculo morado y una caja vieja de juego
    b_cajaJuego(R, 238, 12, 36, 50, 4);
    // la lámpara de mesa y una planta en su maceta al fondo
    rect(20, 48, 22, 62, hex('#3a3a46')); R.poligono([[12, 48], [30, 48], [26, 40], [16, 40]], C.k); R.poligono([[13, 47], [29, 47], [25, 41], [17, 41]], hex('#e8e8ee')); rect(14, 62, 28, 64, hex('#3a3a46')); b_velo(R, 6, 49, 40, 60, 0.15, hex('#fff4c0'), 0, false);
    b_planta(R, 124, 62, 0, 0.9);
    R.disco(222, 166, 5, C.k); R.disco(240, 166, 5, C.k); rect(222, 161, 240, 171, C.k); R.disco(222, 166, 4, hex('#3a3a46')); R.disco(240, 166, 4, hex('#3a3a46')); rect(222, 162, 240, 170, hex('#3a3a46')); R.pset(220, 165, hex('#c8c8d0')); R.pset(221, 166, hex('#c8c8d0')); R.pset(219, 166, hex('#c8c8d0')); R.pset(242, 164, hex('#c83a3a')); R.pset(240, 166, hex('#3ab84a')); R.pset(244, 166, hex('#3a8ae8')); R.pset(242, 168, hex('#e8c040'));
    rect(176, 162, 190, 176, C.k); rect(177, 163, 189, 175, hex('#f8e070')); R.linea(179, 167, 187, 167, hex('#8a8a9a')); R.linea(179, 170, 185, 170, hex('#8a8a9a'));
    return { sp, stb: [152, 74, 228, 148], stf: [259, 102, 293, 152] };
  });
  b_mansionPantalla(R, g.sp, t, 0, 3); b_mansionPantalla(R, g.stb, t, 0, 3); b_mansionPantalla(R, g.stf, t, 0, 2);
  // el cursor en el portátil, el dedo-toque en la tableta (un círculo que se abre) y el teléfono que vibra un poco
  verbos(R, t, { barra: false, cursor: [g.sp[0] + 50 + Math.sin(t) * 20, g.sp[1] + 24 + Math.cos(t * 1.3) * 8] });
  { const f = (t * 0.7) % 1, cx = 190 + Math.round(Math.sin(Math.floor(t * 0.7) * 2.1) * 20), cy = 110; for (let a = 0; a < 6.28; a += 0.3) R.pset(Math.round(cx + Math.cos(a) * f * 8), Math.round(cy + Math.sin(a) * f * 8), hex('#ffffff')); }
  b_taza(R, 140, 172, t, hex('#e8e8ee'));
  // la tira de luz de la pared que cambia de color
  { const col = [hex('#c83ae8'), hex('#3a8ae8'), hex('#3ae8c8'), hex('#e83a8a')][Math.floor((t * 0.15) % 1 * 4)]; R.rect(0, 58, 319, 58, col); b_velo(R, 0, 46, 319, 57, 0.1, col, 0, false); }
  return { suelo: 179, pies: [], portatil: g.sp, tableta: g.stb, telefono: g.stf };
}

// el ladrillo visto de una pared (x0–x1, y0–y1): hiladas a matajunta, ladrillos de tonos distintos, llagas y desconchones
function b_ladrillo(R, x0, y0, x1, y1, k = 0, luz = null) {
  const B = R.buf, P = b_P('#5a2a22', '#7a3a2c', '#8e4634', '#a2563e', '#b8684a');
  for (let y = y0; y <= y1; y++) { const f = Math.floor(y / 6), off = (f & 1) * 8;
    for (let x = x0; x <= x1; x++) { const bx = Math.floor((x + off) / 16), jy = y % 6 === 5, jx = (x + off) % 16 === 15;
      let n = 0.5 + (h(bx, f, 540 + k) - 0.5) * 0.5 + (h(x, y, 541 + k) < 0.1 ? -0.15 : 0);
      if (luz) n += Math.max(0, 1 - Math.hypot(x - luz[0], (y - luz[1]) * 1.3) / luz[2]) * 0.4;
      B[y * 320 + x] = jy || jx ? b_tono(b_P('#5a5650', '#7a7670', '#8a867e'), n, x, y) : b_tono(P, n, x, y); } }
}

function b_estudioHoy(R, t, o) {
  const g = b_fondo(R, 'ehoy', () => {
    const { rect } = R;
    b_ladrillo(R, 0, 0, 319, 112, 0, [160, 40, 200]);
    // los ventanales con la ciudad de día
    for (const x0 of [12, 230]) { rect(x0, 16, x0 + 50, 92, C.k); rect(x0 + 1, 17, x0 + 49, 91, hex('#2a2a34')); }
    // el corcho de notas de colores y la pizarra de tareas sin letras
    rect(76, 22, 150, 70, C.k); rect(77, 23, 149, 69, hex('#f2f2f6')); for (let c = 0; c < 3; c++) { R.linea(77 + c * 24 + 24, 23, 77 + c * 24 + 24, 69, hex('#c8c8d0')); for (let k = 0; k < 4 - c; k++) { const x = 80 + c * 24 + (k % 2) * 9, y = 28 + Math.floor(k / 2) * 12 + (k % 2) * 3; rect(x, y, x + 8, y + 8, [hex('#f8e070'), hex('#f0a0c0'), hex('#a0e0f0'), hex('#a8e890')][(k + c) % 4]); R.linea(x + 1, y + 3, x + 6, y + 3, hex('#8a8a9a')); R.linea(x + 1, y + 5, x + 4, y + 5, hex('#8a8a9a')); } }
    // la balda con figuras: el tentáculo, el retrete, una calavera y un barco en botella
    rect(166, 54, 222, 56, C.k); rect(167, 54, 221, 54, hex('#c8a878'));
    { R.rect(170, 44, 174, 53, C.k); R.rect(171, 45, 173, 53, hex('#8a3ac8')); R.pset(172, 47, C.blanco); R.rect(180, 46, 186, 53, C.k); R.rect(181, 47, 185, 53, hex('#3a8ac8')); R.disco(183, 44, 2, hex('#e8c040')); R.disco(196, 49, 4, hex('#f2eee2')); R.pset(194, 48, C.k); R.pset(197, 48, C.k); R.rect(204, 46, 218, 53, C.k); R.rect(205, 47, 217, 52, hex('#a8d8e0')); R.pset(211, 49, hex('#5a3a2a')); R.linea(209, 51, 214, 51, hex('#5a3a2a')); R.pset(211, 48, C.blanco); }
    b_tarima(R, 113, b_P('#6a6a72', '#7a7a82', '#8a8a92', '#9a9aa2', '#aaaab2'), 4, null); rect(0, 113, 319, 113, C.k);
    // el sofá del fondo y las plantas en macetas altas
    rect(176, 92, 228, 113, C.k); rect(177, 93, 227, 112, hex('#3a6a6a')); rect(177, 93, 227, 99, hex('#4a7a7a')); rect(180, 100, 201, 108, hex('#4a7a7a')); rect(203, 100, 224, 108, hex('#4a7a7a'));
    b_ficus(R, 70, 116, 0); b_ficus(R, 296, 118, 0);
    return {};
  });
  // la ciudad por los ventanales (recortada), con nubes y un tranvía
  for (const x0 of [12, 230]) { const cl = [x0 + 2, 18, x0 + 48, 90]; b_ventana(R, t + x0, cl, { hor: 70, persiana: null }); R.recorte(cl);
    for (let k = 0; k < 5; k++) { const bx = x0 + 2 + k * 10, bh = 14 + Math.round(h(k, x0, 542) * 16); for (let y = 70 - bh; y <= 76; y++) for (let x = bx; x < bx + 9; x++) R.pset(x, y, ((x - bx) % 3 === 1 && (y % 3 === 0) && y < 72) ? hex('#c8d8e8') : hex('#8a8aa0')); }
    R.recorte(null); R.rect(x0 + 25, 17, x0 + 25, 91, C.k); R.rect(x0 + 1, 54, x0 + 49, 54, C.k); }
  // las lámparas colgantes que se mecen y el letrero de neón del cursor en cruz que parpadea
  for (const [lx, k] of [[100, 0], [160, 1], [220, 2]]) { const sw = Math.sin(t * 1.1 + k) * 2, ly = 34; R.linea(lx, 0, lx + sw, ly, C.k); R.poligono([[lx + sw - 7, ly + 6], [lx + sw - 3, ly], [lx + sw + 3, ly], [lx + sw + 7, ly + 6]], hex('#1e1e26')); R.rect(lx + sw - 6, ly + 6, lx + sw + 6, ly + 6, hex('#3a3a46')); R.disco(lx + sw, ly + 7, 2, hex('#fff4c0')); b_velo(R, lx + sw - 14, ly + 8, lx + sw + 14, ly + 26, 0.08, hex('#fff4c0'), 0, false); }
  { const on = h(Math.floor(t * 8), 3, 543) > 0.06, c = on ? hex('#ff4ab8') : hex('#6a2a4a'), cx = 258, cy = 74; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let d = 3; d <= 10; d++) { R.pset(cx + dx * d, cy + dy * d, c); R.pset(cx + dx * d + dy, cy + dy * d + dx, c); } if (on) b_velo(R, cx - 14, cy - 14, cx + 14, cy + 14, 0.12, hex('#ff4ab8'), 0, false); }
  if (o.delante !== false) { const antes = R.delante; R.delante = () => { antes?.(); b_mesaLarga(R, t); }; }
  return { suelo: 146, pies: [60, 116, 172, 228, 284], mesa: [0, 141, 319, 179] };
}

// la mesa larga del estudio de hoy (por delante de quien esté detrás con los pies en y 146: le tapa las piernas): el tablero blanco con
// portátiles y monitores con aventuras nuevas y su línea de verbos, tazas, cuadernos, figuras y cables
export function mesaLarga(R, t) { b_mesaLarga(R, t); }

function b_mesaLarga(R, t) {
  const { rect } = R;
  rect(0, 141, 319, 141, C.k); b_tablero(R, 0, 142, 319, 160, b_P('#c8c8d0', '#d8d8e0', '#e8e8ee', '#f2f2f6', '#ffffff'), 40, 13, [160, 150, 200]);
  rect(0, 161, 319, 162, hex('#a8a8b8')); for (let y = 163; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, b_tono(b_P('#2a2a34', '#34343e', '#3e3e4a'), 0.6 - (y - 163) / 30 + (h(x >> 2, y, 544) < 0.1 ? -0.2 : 0), x, y));
  for (let k = 0; k < 5; k++) { const x = 40 + k * 56 + (k % 2) * 4, s = b_portatil(R, x, 156, 34, [hex('#a8acb8'), hex('#3a3a46'), hex('#c8ccd8'), hex('#a8acb8'), hex('#3a3a46')][k]); b_aventuraNueva(R, s, t, k); }
  for (const [x, c] of [[20, hex('#e8803a')], [140, hex('#f2eee2')], [254, hex('#3a8ac8')]]) b_taza(R, x, 158, t + x, c);
  R.poligono([[102, 150], [118, 149], [119, 158], [103, 159]], C.k); R.poligono([[103, 150], [117, 149], [118, 157], [104, 158]], hex('#f6eeb8')); b_boceto(R, 'calavera', 105, 150, hex('#3a3a5a'));
  R.rect(212, 150, 216, 157, C.k); R.rect(213, 151, 215, 157, hex('#8a3ac8')); R.pset(214, 152, C.blanco); R.rect(298, 148, 304, 157, C.k); R.rect(299, 149, 303, 157, hex('#3ab84a')); R.pset(300, 150, C.blanco); R.pset(302, 150, C.blanco);
}

function b_ehoyMesa(R, t, o) {
  const g = b_fondo(R, 'ehoym', () => {
    const { rect } = R; b_ladrillo(R, 0, 0, 319, 74, 1, [160, 30, 220]);
    b_tablero(R, 0, 75, 319, 179, b_P('#c8c8d0', '#d8d8e0', '#e8e8ee', '#f2f2f6', '#ffffff'), 60, 14, [160, 140, 200]); rect(0, 75, 319, 75, C.k);
    const ss = []; for (let k = 0; k < 3; k++) { b_sombra(R, 58 + k * 102, 150, 46, 4, 0.3); ss.push(b_portatil(R, 14 + k * 102, 146, 88, [hex('#a8acb8'), hex('#3a3a46'), hex('#c8ccd8')][k])); }
    // notas, un cuaderno de bocetos, la figura del tentáculo verde y cables
    // la tableta de dibujo con su lápiz, el cuaderno de bocetos abierto, los auriculares y la figura del tentáculo
    rect(110, 154, 160, 176, C.k); rect(111, 155, 159, 175, hex('#2a2a34')); rect(114, 158, 156, 172, hex('#3a3a46')); R.linea(150, 176, 168, 160, C.k); R.linea(151, 176, 169, 160, hex('#c8ccd8'));
    R.poligono([[190, 152], [250, 150], [252, 176], [192, 178]], C.k); R.poligono([[191, 152], [220, 151], [221, 177], [193, 177]], hex('#f6f2ea')); R.poligono([[221, 151], [249, 150], [251, 175], [222, 177]], hex('#f6f2ea')); b_boceto(R, 'perro', 196, 156, hex('#3a3a5a')); b_boceto(R, 'fantasma', 226, 158, hex('#3a8a4a'));
    for (let a = 3.3; a < 6.1; a += 0.05) R.pset(Math.round(72 + Math.cos(a) * 10), Math.round(170 + Math.sin(a) * 8), hex('#2a2a34')); R.disco(62, 171, 4, hex('#3a3a46')); R.disco(82, 171, 4, hex('#3a3a46'));
    rect(290, 146, 298, 160, C.k); rect(291, 147, 297, 160, hex('#3ab84a')); R.pset(293, 149, C.blanco); R.pset(295, 149, C.blanco); rect(288, 160, 300, 162, hex('#3a3a46'));
    for (let k = 0; k < 4; k++) { const x = [8, 98, 172, 264][k], y = 162 + (k % 2) * 4; rect(x, y, x + 12, y + 12, C.k); rect(x + 1, y + 1, x + 11, y + 11, [hex('#f8e070'), hex('#f0a0c0'), hex('#a0e0f0'), hex('#a8e890')][k]); R.linea(x + 2, y + 4, x + 9, y + 4, hex('#8a8a9a')); R.linea(x + 2, y + 7, x + 7, y + 7, hex('#8a8a9a')); }
    return { ss };
  });
  g.ss.forEach((s, k) => b_aventuraNueva(R, s, t, k + 1));
  b_taza(R, 276, 172, t, hex('#e8803a'));
  return { suelo: 179, pies: [], pantallas: g.ss };
}

// un avatar de aficionado (cuadrado de s px con borde de color): pirata, tentáculo, calavera, perro, chica, chico con
// gorra, fantasma o mono, sin letras
function b_avatar(R, x, y, s, k) {
  const { rect, pset } = R, fondo = [hex('#3a6ab8'), hex('#8a3ac8'), hex('#c8603a'), hex('#3a8a4a'), hex('#c83a7a'), hex('#e8b830'), hex('#2a8a8a'), hex('#8a5a3a')][k % 8], cx = x + s / 2, cy = y + s / 2;
  rect(x, y, x + s, y + s, C.k); rect(x + 1, y + 1, x + s - 1, y + s - 1, fondo); rect(x + 1, y + 1, x + s - 1, y + 1, b_mezcla(fondo, C.blanco, 0.3));
  const r = s * 0.28, piel = hex('#f0c090');
  switch (k % 8) {
    case 0: R.disco(cx, cy + 1, r, piel); rect(cx - r, cy - r, cx + r, cy - r + s * 0.12, hex('#c83a3a')); pset(cx - 1, cy, C.k); rect(cx + 1, cy - 1, cx + 2, cy, C.k); break;
    case 1: rect(cx - r * 0.7, cy - r, cx + r * 0.7, cy + r * 1.4, hex('#b87ae8')); pset(cx - 1, cy - 1, C.blanco); pset(cx + 1, cy - 1, C.blanco); rect(cx - 1, cy + 2, cx + 1, cy + 2, C.k); break;
    case 2: R.disco(cx, cy, r, hex('#f2eee2')); pset(cx - 1, cy - 1, C.k); pset(cx + 1, cy - 1, C.k); rect(cx - 1, cy + 2, cx + 1, cy + 2, C.k); break;
    case 3: R.disco(cx, cy + 1, r, hex('#8a8a9a')); rect(cx - r, cy - r - 1, cx + r, cy - r + 1, hex('#5a5a6a')); pset(cx - 1, cy, C.k); pset(cx + 1, cy, C.k); pset(cx, cy + 2, C.k); break;
    case 4: R.disco(cx, cy + 1, r, piel); rect(cx - r - 1, cy - r, cx - r + 1, cy + r + 1, hex('#5a2a1a')); rect(cx + r - 1, cy - r, cx + r + 1, cy + r + 1, hex('#5a2a1a')); rect(cx - r, cy - r, cx + r, cy - r + 1, hex('#5a2a1a')); pset(cx - 1, cy, C.k); pset(cx + 1, cy, C.k); break;
    case 5: R.disco(cx, cy + 1, r, piel); rect(cx - r, cy - r, cx + r + 2, cy - r + 1, hex('#3a6ab8')); pset(cx - 1, cy, C.k); pset(cx + 1, cy, C.k); break;
    case 6: R.disco(cx, cy, r, hex('#a8e8b8')); pset(cx - 1, cy - 1, C.k); pset(cx + 1, cy - 1, C.k); rect(cx - r, cy + r - 1, cx + r, cy + r, hex('#5aa86a')); break;
    default: R.disco(cx, cy + 1, r, hex('#a8743c')); R.disco(cx, cy + 2, r * 0.6, hex('#e8c8a0')); pset(cx - 1, cy, C.k); pset(cx + 1, cy, C.k); break;
  }
}

function b_foro(R, t, o, cerca) {
  if (cerca) {
    b_fondo(R, 'foroc', () => { const B = R.buf; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_tono(b_P('#0e0e16', '#16161e', '#1e1e28'), 0.5 + h(x, y, 545) * 0.2, x, y); const s = b_monitorPlano(R, 8, 8, 312, 174, false); return { s }; });
    const s = [10, 10, 310, 170]; R.rect(s[0], s[1], s[2], s[3], hex('#e8eaf2'));
    // la barra de arriba (bloques de color sin letras) y la columna de la izquierda con los temas
    R.rect(s[0], s[1], s[2], s[1] + 10, hex('#3a3a6a')); for (let k = 0; k < 4; k++) R.rect(s[0] + 6 + k * 18, s[1] + 4, s[0] + 18 + k * 18, s[1] + 6, hex('#8a8ab8')); R.disco(250, s[1] + 5, 3, hex('#e8c040')); R.pset(252, s[1] + 2, hex('#e83a5a'));   // el aviso, fuera de la zona de Atom
    R.rect(s[0], s[1] + 11, s[0] + 54, s[3], hex('#d0d2de')); for (let k = 0; k < 8; k++) { const y = s[1] + 16 + k * 18; R.rect(s[0] + 4, y, s[0] + 50, y + 12, k === 2 ? hex('#ffffff') : hex('#e0e2ec')); b_icono(R, ['mapa', 'pollo', 'calavera', 'llave', 'moneda', 'reloj', 'cuadro', 'vela'][k], s[0] + 7, y + 3, null, hex('#a8a8b8')); R.rect(s[0] + 22, y + 5, s[0] + 46 - (k % 3) * 6, y + 6, hex('#8a8aa0')); }
    // los mensajes que suben: avatar, bocadillo con pictogramas o una miniatura, y el contador de corazones
    const hueco = [s[0] + 56, s[1] + 12, s[2] - 2, s[3] - 1]; R.recorte(hueco);
    b_dentroDe(R, hueco, () => {
    const paso = 34, sub = (t * 8) % paso, base = Math.floor(t * 8 / paso);
    for (let i = 0; i < 6; i++) { const m = base + i, y = Math.round(s[1] + 14 + i * paso - sub), x = s[0] + 60, k = Math.floor(h(m, 1, 546) * 8);
      b_avatar(R, x, y, 22, k); R.linea(x, y + 26, s[2] - 6, y + 26, hex('#c8cad6'));
      const bx = x + 28, bw = 120 + Math.round(h(m, 2, 546) * 90); for (let yy = y; yy < y + 22; yy++) R.linea(bx, yy, Math.min(s[2] - 8, bx + bw), yy, hex('#ffffff')); R.linea(bx, y, Math.min(s[2] - 8, bx + bw), y, hex('#d8dae4'));
      const tipo = m % 3; if (tipo === 0) for (let j = 0; j < 4; j++) b_icono(R, ['puerta', 'llave', 'pollo', 'calavera', 'moneda', 'mapa'][(m + j) % 6], bx + 4 + j * 14, y + 4, null, hex('#c8cad6'));
      else if (tipo === 1) { R.rect(bx + 4, y + 3, bx + 40, y + 19, C.k); b_mansionPantalla(R, [bx + 5, y + 4, bx + 39, y + 18], t, 0, 2); for (let l = 0; l < 2; l++) R.linea(bx + 46, y + 7 + l * 6, bx + 46 + 40 + Math.round(h(m, l, 547) * 40), y + 7 + l * 6, hex('#a8a8bc')); }
      else { for (let l = 0; l < 3; l++) R.linea(bx + 4, y + 5 + l * 5, bx + 30 + Math.round(h(m, l, 548) * 80), y + 5 + l * 5, hex('#a8a8bc')); }
      const cx = Math.min(s[2] - 18, bx + bw - 14), cor = 3 + Math.floor(h(m, 3, 546) * 40) + (i === 2 ? Math.floor(t) % 5 : 0); R.disco(cx - 1, y + 17, 1.5, hex('#e83a5a')); R.disco(cx + 2, y + 17, 1.5, hex('#e83a5a')); R.poligono([[cx - 3, y + 18], [cx + 4, y + 18], [cx + 0.5, y + 22]], hex('#e83a5a')); b_cifras(R, String(cor), cx + 6, y + 15, hex('#5a5a70')); }
    // corazones que suben del mensaje del centro
    for (let k = 0; k < 4; k++) { const f = (t * 0.8 + k * 0.25) % 1, x = Math.round(270 + Math.sin(t * 2 + k * 2) * 6), y = Math.round(150 - f * 70); if (f < 0.9) { R.disco(x - 1, y, 1.3, hex('#e83a5a')); R.disco(x + 1, y, 1.3, hex('#e83a5a')); R.pset(x, y + 2, hex('#e83a5a')); R.pset(x, y + 1, hex('#e83a5a')); } }
    });
    R.recorte(null);
    verbos(R, t, { barra: false, cursor: [190 + Math.sin(t * 0.7) * 50, 100 + Math.cos(t) * 30] });
    return { suelo: 179, pies: [], pantalla: s };
  }
  const g = b_fondo(R, 'forog', () => {
    const { rect } = R, B = R.buf;
    for (let y = 0; y <= 118; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_tono(b_P('#12121c', '#181824', '#1e1e2c', '#262636'), 0.7 - Math.abs(x - 150) / 300 + (((x >> 3) + (y >> 3)) & 1 ? 0.06 : 0), x, y);
    b_tarima(R, 119, b_P('#1a1a22', '#22222c', '#2a2a36', '#343442', '#3e3e4e'), 5, [150, 150, 140]); rect(0, 119, 319, 119, C.k);
    const ss = []; for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const x0 = 64 + i * 58, y0 = 18 + j * 34; ss.push(b_monitorPlano(R, x0, y0, x0 + 54, y0 + 31, false)); }
    // la estantería de cajas a la izquierda, el póster de la luna a la derecha y la mesa con teclado bajo las pantallas
    b_estanteriaJuegos(R, 4, 56, 40, 3, 22, 2); rect(250, 30, 290, 70, C.k); rect(251, 31, 289, 69, hex('#1a1a3a')); R.disco(270, 46, 9, hex('#f4f0d8')); R.disco(266, 44, 2, hex('#d8d4bc')); R.disco(274, 50, 1.5, hex('#d8d4bc')); b_boceto(R, 'barco', 262, 58, hex('#0e0e1e'));
    for (let y = 136; y < 180; y++) for (let x = 70; x < 240; x++) { const d = Math.hypot((x - 155) / 90, (y - 160) / 18); if (d < 1) R.pset(x, y, d > 0.88 ? hex('#5a3a8a') : (Math.floor(d * 6) & 1) ? hex('#2a2244') : hex('#342a52')); }
    b_escritorio(R, 90, 220, 120, 12, 'der'); b_teclado(R, 124, 122, 170, 127, b_P('#1a1a22', '#2a2a34', '#3a3a46', '#4a4a56', '#6a6a7a')); rect(180, 122, 192, 128, hex('#2a2a34')); rect(184, 123, 188, 126, hex('#4a4a56'));
    // el puf, cables por el suelo y una caja vieja de juego apoyada
    R.disco(48, 150, 18, C.k); R.disco(48, 149, 17, hex('#5a3a8a')); R.disco(42, 143, 8, hex('#7a5aaa')); rect(28, 154, 68, 168, hex('#3e2a6a')); rect(27, 168, 69, 169, C.k);
    for (let k = 0; k < 3; k++) { let px = 150 + k * 4, py = 120; for (let i = 0; i < 24; i++) { const nx = px + (k - 1) * 3 + Math.sin(i * 0.6 + k) * 2, ny = py + 2.4; R.linea(px, py, nx, ny, hex('#0a0a10')); px = nx; py = ny; } }
    b_cajaJuego(R, 262, 124, 30, 40, 2);
    return { ss };
  });
  // en cada pantalla, un aficionado (avatar) y sus bocadillos de pictogramas que aparecen y se van
  g.ss.forEach((s, i) => { const [x0, y0, x1, y1] = s; R.rect(x0, y0, x1, y1, [hex('#1e2a4a'), hex('#2a1e3a'), hex('#1e3a3a')][i % 3]); b_avatar(R, x0 + 3, y0 + 4, 18, i + 1);
    const f = (t * 0.5 + i * 0.37) % 1; if (f < 0.75) { const bx = x0 + 24, by = y0 + 5; R.rect(bx, by, x1 - 3, by + 12, hex('#f2eee2')); R.pset(bx - 1, by + 8, hex('#f2eee2')); R.pset(bx - 2, by + 9, hex('#f2eee2')); b_icono(R, ['pollo', 'calavera', 'llave', 'mapa', 'moneda', 'dentadura', 'reloj', 'hamster', 'sombrero'][i], bx + 2, by + 3, null, hex('#c8c4b8')); if (x1 - bx > 26) R.icono(['!', '?'][i % 2], bx + 15, by + 3, hex('#c83a3a'), hex('#c8c4b8'), 1); }
    R.rect(x0 + 3, y1 - 3, x0 + 3 + Math.round((x1 - x0 - 6) * ((t * 0.1 + i * 0.13) % 1)), y1 - 2, hex('#5ab8e8'));
    b_velo(R, x0 - 4, y1 + 3, x1 + 4, y1 + 6, 0.08, hex('#5ab8e8'), 0, false); });
  // la tira de luz bajo las pantallas, que cambia de color y se refleja en el suelo
  { const col = [hex('#c83ae8'), hex('#3a8ae8'), hex('#3ae8c8'), hex('#e83a8a')][Math.floor((t * 0.15) % 1 * 4)]; R.rect(62, 118, 240, 118, col); b_velo(R, 64, 120, 238, 132, 0.12, col, 0, false); }
  return { suelo: 160, pies: [140, 236], pantallas: g.ss, pared: [64, 18, 238, 118], mesa: [90, 120, 220, 146] };
}
// La línea de verbos del homenaje, abajo (y 150–179 por omisión): un panel oscuro con su canto de luz y textura, la tira
// de la frase arriba (y 151–157: el pictograma del verbo, una flecha y el del objeto, o.frase [verbo, objeto]), nueve
// botones en dos filas (5 + 4) con pictogramas claros de 11 × 7 sin letras —ojo mirar, mano coger, boca hablar, puerta
// abierta abrir, puerta cerrada cerrar, engranaje usar, regalo dar, flecha contra caja empujar, flecha que sale tirar— y,
// a la derecha, el inventario (dos flechas y 2 × 4 casillas con iconos de color). Opciones:
//   o.activo: índice (0–8) o nombre del verbo resaltado (marco dorado que late; o.pulsa 0–1 lo hunde con un destello);
//   o.inventario: lista de iconos (llave, moneda, pollo, mapa, hamster, vela, lata, cuadro, dentadura, calavera,
//     sombrero, reloj) o true (una selección); o.frase: [verbo, objeto] (objeto: un icono de inventario o 'puerta');
//   o.cursor [x, y]: el cursor en cruz que parpadea (o.cursorForma 'cruz' por omisión, u 'ojo', 'mano', 'boca',
//     'calavera': el cursor que cambia de forma); se pinta aunque la barra no esté (o.barra false);
//   o.caja [x0, y0, x1, y1]: la barra en otro sitio (dentro de una pantalla); si mide menos de 16 de alto se pinta en
//     miniatura (botones con un punto de pictograma); o.paleta 'color' (por omisión), 'fosforo' o 'ambar' (para pintarla
//     dentro de los monitores de los ochenta);
//   o.aparece (0–1): la barra sube desde abajo.
// Se pinta la última, encima de todo. Devuelve { botones: [[x0, y0, x1, y1]…], casillas, frase, cursor }: la escena
// apunta con el cursor al centro de un botón (VERBOS da los nombres en orden).
export const VERBOS = ['mirar', 'coger', 'hablar', 'abrir', 'cerrar', 'usar', 'dar', 'empujar', 'tirar'];

// las tintas de la barra: a color, en fósforo verde y en ámbar
const b_VPAL = {
  color: { fondo: hex('#24243e'), fondoL: hex('#2e2e4c'), canto: hex('#8a8ab8'), k: hex('#0e0e1a'), boton: hex('#3a3a62'), botonL: hex('#56568a'), botonS: hex('#2a2a48'), botonOn: hex('#4a3a6a'), icono: hex('#b8b8e0'), iconoOn: hex('#fff0a0'), activo: hex('#f0c040'), activoS: hex('#a8781c'), casilla: hex('#1a1a30'), frase: hex('#8ae0f0') },
  fosforo: { fondo: hex('#0a2014'), fondoL: hex('#0e2a1a'), canto: hex('#2e9a52'), k: hex('#04100a'), boton: hex('#123a22'), botonL: hex('#1e6a3a'), botonS: hex('#0a2414'), botonOn: hex('#1e6a3a'), icono: hex('#4ae07a'), iconoOn: hex('#d8ffe0'), activo: hex('#c8ffd8'), activoS: hex('#2e9a52'), casilla: hex('#06160c'), frase: hex('#8af0a8') },
  ambar: { fondo: hex('#1e1206'), fondoL: hex('#2a180a'), canto: hex('#a8661a'), k: hex('#0c0602'), boton: hex('#3a220a'), botonL: hex('#6a3e12'), botonS: hex('#241406'), botonOn: hex('#6a3e12'), icono: hex('#f0b03a'), iconoOn: hex('#fff0c8'), activo: hex('#ffe8b0'), activoS: hex('#a8661a'), casilla: hex('#140a04'), frase: hex('#f8c860') },
};

// los nueve pictogramas de los verbos (11 × 7): mirar, coger, hablar, abrir, cerrar, usar, dar, empujar, tirar
const b_VICON = [
  ['...#####...', '.##.....##.', '#...###...#', '#..##.##..#', '#...###...#', '.##.....##.', '...#####...'],
  ['..#.#.#....', '..#.#.#.#..', '..#.#.#.#..', '#.#######..', '.########..', '..######...', '...####....'],
  ['...........', '.###...###.', '#..##.##..#', '#.........#', '.##.....##.', '...#####...', '...........'],
  ['######.....', '#....##....', '#....#.#...', '#....#.#.#.', '#....#.#...', '#....##....', '######.....'],
  ['..#######..', '..#.....#..', '..#.....#..', '..#...#.#..', '..#.....#..', '..#.....#..', '..#######..'],
  ['....#.#....', '..#######..', '.##.....##.', '..#..#..#..', '.##.....##.', '..#######..', '....#.#....'],
  ['...#...#...', '....#.#....', '.#########.', '.#...#...#.', '.#########.', '.#...#...#.', '.#########.'],
  ['.......####', '..#....#..#', '..##...#..#', '#######...#', '..##...#..#', '..#....#..#', '.......####'],
  ['####.......', '#..#..#....', '#..#.##....', '#...#######', '#..#.##....', '#..#..#....', '####.......'],
];

const b_CALAVERA = ['...#####...', '..#######..', '.##..#..##.', '.##..#..##.', '..#######..', '...#.#.#...', '...#####...'];

// pinta un pictograma de filas ('#' lleno) en (x, y) con color c y, si se da, una sombra de 1 px abajo a la derecha
function b_picto(R, filas, x, y, c, sombra) {
  if (sombra != null) filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#' && filas[j + 1]?.[i + 1] !== '#') R.pset(x + i + 1, y + j + 1, sombra); });
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') R.pset(x + i, y + j, c); });
}

// los iconos de inventario a color (11 × 7; cada letra un color): un objeto de aventura sin letras
const b_ICOL = { k: '#1c1222', a: '#e8c040', A: '#a87a18', r: '#c84a3a', R: '#8a2a24', b: '#f2eee2', g: '#9a9aa8', G: '#5e5e70', m: '#a8743c', M: '#6a4424', v: '#5ab85a', z: '#5ab8e8', n: '#e8a060', p: '#f0a0b0', y: '#fff0a0' };

const b_ICONOS = {
  llave: ['...........', '.aa........', 'a..aaaaaaa.', 'a..aAAAaAa.', '.aa....A.A.', '...........', '...........'],
  moneda: ['...aaaaa...', '..aAyyyAa..', '.aAyaAaAAa.', '.aAyaaaAAa.', '.aAyAAaAAa.', '..aAAAAAa..', '...aaaaa...'],
  pollo: ['.....aa....', '....aaar...', '..aaaaaa...', '.aaaaaa.n..', 'aaaaaaa....', '.aa..aa....', '..n...n....'],
  mapa: ['.bbbbbbbbb.', '.b..r....b.', '.b.r.r.zzb.', '.b..r.zz.b.', '.b.....r.b.', '.b....r.rb.', '.bbbbbbbbb.'],
  hamster: ['...........', '..nn..n....', '.nnnnnnnn..', 'nknnnnnnnn.', '.nnnnnnnnnp', '..bnn.nnb..', '...........'],
  vela: ['....y......', '....a......', '...bbb.....', '...bbb.....', '...bbb.....', '..AAAAA....', '...........'],
  lata: ['..GGGGG....', '.rrrrrrr...', '.rbbbbbr...', '.rrrrrrr...', '.rbbbbbr...', '.rrrrrrr...', '..GGGGG....'],
  cuadro: ['mmmmmmmmmmm', 'mzzzzzzzzzm', 'mzzzyzzzzzm', 'mvvzzzzvvzm', 'mvvvvvvvvvm', 'mmmmmmmmmmm', '...........'],
  dentadura: ['...........', '.rrrrrrrrr.', 'rbbbbbbbbbr', 'r.........r', 'rbbbbbbbbbr', '.rrrrrrrrr.', '...........'],
  calavera: ['...bbbbb...', '..bbbbbbb..', '.bbkkbkkbb.', '.bbkkbkkbb.', '..bbbbbbb..', '...bkbkb...', '...bbbbb...'],
  sombrero: ['...........', '...MMMMM...', '...MMMMM...', '...rrrrr...', '.MMMMMMMMM.', 'MMMMMMMMMMM', '...........'],
  reloj: ['...aaaaa...', '..abbbbba..', '.abbbkbbba.', '.abbbkkkba.', '.abbbbbbba.', '..abbbbba..', '...aaaaa...'],
  puerta: ['..MMMMMMM..', '..MmmmmmM..', '..MmmmmmM..', '..MmmmmaM..', '..MmmmmmM..', '..MmmmmmM..', '..MMMMMMM..'],
};

const b_ICOLH = {};

// pinta un icono de inventario (a color, o de un solo color c en las pantallas de fósforo) con su sombra
function b_icono(R, nombre, x, y, c = null, sombra = null) {
  const f = b_ICONOS[nombre]; if (!f) return;
  if (sombra != null) f.forEach((fl, j) => { for (let i = 0; i < fl.length; i++) if (fl[i] !== '.' && (f[j + 1]?.[i + 1] ?? '.') === '.') R.pset(x + i + 1, y + j + 1, sombra); });
  f.forEach((fl, j) => { for (let i = 0; i < fl.length; i++) { const l = fl[i]; if (l === '.') continue; R.pset(x + i, y + j, c ?? (b_ICOLH[l] ??= hex(b_ICOL[l]))); } });
}

// La borda del barco que llega al muelle (isla 'muelle' con o.barco = x): se pinta DESPUÉS de los personajes que van en
// su cubierta, para que la borda les tape los pies. Mismos x, t y o.luz que el decorado.
export function islaBorda(R, t, x, o = {}) {
  const P = c_pal(o.luz);
  c_galeon(R, x, 121 + c_bob(t, x), t, 1, P, { soloCasco: true });
}

// la paleta de la isla según la luz: cada material con sus tonos de luz a sombra (noche de luna o día del Caribe)
const c_PALS = {};

function c_pal(luz) {
  const k = luz === 'dia' ? 'dia' : 'noche';
  if (c_PALS[k]) return c_PALS[k];
  const m = (a) => a.map(hex);
  const comun = { calido: m(['#fff4c4', '#ffd47a', '#f4a848', '#b86a36', '#4e2c2c']), oro: m(['#fff4b0', '#f4cc48', '#c8902a', '#7a5020']),
    verdeF: m(['#e8fff0', '#9af0b8', '#4ad88a', '#2a9a6a', '#145a48']), metal: m(['#a8b0c0', '#747c8e', '#4a5062', '#262a36']) };
  const N = { ...comun, noche: true,
    cielo: m(['#070b24', '#0b1130', '#10183e', '#16214e', '#1e2c5e', '#283a70', '#344a84']),
    estrella: m(['#f4f2ff', '#a8aae0', '#4e528e']), luna: m(['#fffbe6', '#efe6c8', '#d4c8a6', '#ada283']),
    halo: m(['#2a3a7c', '#46568e', '#8a90b0']), nube: m(['#161e48', '#222a58', '#323e70', '#4e5c92', '#8e98c6']),
    mar: m(['#08122c', '#0c1836', '#112042', '#172a52', '#203864', '#2c4a7a']), marL: m(['#3e5e98', '#7a98cc', '#f6eec4']),
    lejos: m(['#0b1230', '#111a3e', '#18244c', '#22305c']),
    madera: m(['#94745a', '#6e5240', '#4e382c', '#30221e']), tabla: m(['#8a7c6c', '#6a5e52', '#4c423c', '#2c2628']),
    tejado: m(['#5a4c5e', '#42384a', '#2e2638', '#1c1624']), hoja: m(['#5c9078', '#3c6c5c', '#284c46', '#183232']),
    tierra: m(['#62597a', '#4a4360', '#37314c', '#252036']), estuco: m(['#b8c0dc', '#98a0c4', '#7880a8', '#585e86']),
    teja: m(['#a05a52', '#7e4246', '#5e3038', '#3e2030']), roca: m(['#6c6c8c', '#545474', '#3e3e5c', '#2a2a44']),
    tela: m(['#b8b6c0', '#8e8ea2', '#6c6c84', '#4c4c66']), franja: m(['#9a3a3a', '#6a2a30']), cuerda: hex('#1a1620'),
    flor: m(['#e85a9a', '#b83a7a', '#f0d070']), gente: hex('#15121e') };
  const D = { ...comun, noche: false,
    cielo: m(['#2c64c0', '#3672cc', '#4280d6', '#5290de', '#66a2e6', '#80b6ee', '#a4ccf4']),
    estrella: m(['#ffffff', '#ffffff', '#ffffff']), luna: m(['#fffbe0', '#fff0a0', '#ffd860', '#f0b040']),
    halo: m(['#8cbcf0', '#b8d8f8', '#fff6d0']), nube: m(['#8aa4c8', '#b4c6e0', '#d8e4f2', '#f2f6fc', '#ffffff']),
    mar: m(['#0e3a6a', '#134a80', '#1a5a94', '#226ca8', '#2e80bc', '#4a98cc']), marL: m(['#6ab0dc', '#a8d4f0', '#ffffff']),
    lejos: m(['#4a76a0', '#5a86b0', '#6a94bc', '#7aa2c6']),
    madera: m(['#c8945e', '#a0703e', '#7a5030', '#4a3020']), tabla: m(['#c4a47e', '#a0805c', '#7a5e44', '#4c3a2c']),
    tejado: m(['#9a7a68', '#7a5c50', '#5a4038', '#3a2a26']), hoja: m(['#8ed05e', '#5eac40', '#3e8432', '#265a22']),
    tierra: m(['#d0ae76', '#ae8c5a', '#8a6c44', '#5c4630']), estuco: m(['#fffaf0', '#f0e6d2', '#d4c4aa', '#a89880']),
    teja: m(['#e0784e', '#be5a3c', '#8e402e', '#5e2a22']), roca: m(['#aaa29c', '#8a827e', '#6a6264', '#4a4246']),
    tela: m(['#fff8ea', '#e8dcc4', '#c4b498', '#968a70']), franja: m(['#c84a3a', '#8a3028']), cuerda: hex('#3a2a20'),
    flor: m(['#f05aa0', '#c83a7a', '#ffe070']), gente: hex('#3a2a2a') };
  return (c_PALS[k] = k === 'dia' ? D : N);
}

// el tramado de Bayer 4 × 4 de los degradados (0–1 según el píxel)
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_dz = (x, y) => (c_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (k = 0: a; k = 1: b)
function c_mezcla(a, b, k) { if (k <= 0) return a; if (k >= 1) return b; let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// el tono de la rampa cols para f (0 = el primero, 1 = el último), tramado entre los dos más cercanos
function c_tono(cols, f, x, y) { const n = cols.length - 1, v = Math.max(0, Math.min(n, f * n)), i = Math.floor(v); return i >= n ? cols[n] : (v - i > c_dz(x, y) ? cols[i + 1] : cols[i]); }

// rectángulo que respeta R.recorte (R.rect no lo hace)
function c_r(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) R.pset(x, y, c); }

// mezcla un color sobre lo ya pintado
function c_mix(R, x, y, c, a) { R.pset(x, y, c_mezcla(R.pget(x, y), c, a)); }

// disco cuyo color puede ser una función (x, y, d) que devuelve null para no pintar ese píxel
function c_disco(R, cx, cy, r, c) { for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) { const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d2 = dx * dx + dy * dy; if (d2 > r * r) continue; const v = typeof c === 'function' ? c(x, y, Math.sqrt(d2) / r) : c; if (v != null) R.pset(x, y, v); } }

// polígono relleno que respeta R.recorte y deja sin pintar donde la función de color devuelve null
function c_poli(R, pts, c) {
  let y0 = Infinity, y1 = -Infinity; for (const [, y] of pts) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  for (let y = Math.max(0, Math.ceil(y0)); y <= Math.min(179, Math.floor(y1)); y++) { const xs = [];
    for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length]; if ((ay <= y + 0.5 && by > y + 0.5) || (by <= y + 0.5 && ay > y + 0.5)) xs.push(ax + (y + 0.5 - ay) / (by - ay) * (bx - ax)); }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.max(0, Math.round(xs[k])); x < Math.min(320, Math.round(xs[k + 1])); x++) { const v = typeof c === 'function' ? c(x, y) : c; if (v != null) R.pset(x, y, v); } }
}

// un resplandor (farol, ventana, luna): aclara hacia col lo que ya hay, en escalones tramados que se apagan hacia fuera
function c_brillo(R, cx, cy, r, col, a = 0.5, ry = r) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const d = Math.hypot((x + 0.5 - cx) / r, (y + 0.5 - cy) / ry); if (d >= 1) continue;
    const g = Math.floor(((1 - d) * (1 - d) * a) * 7 + c_dz(x, y) * 0.9) / 7; if (g > 0) c_mix(R, x, y, col, Math.min(0.9, g));
  }
}

// un búfer fijo por clave: se pinta una vez (pinta()) y se reutiliza en cada fotograma (con R.usar y su anterior)
const c_CACHE = new WeakMap();

function c_fijo(R, clave, pinta) {
  let m = c_CACHE.get(R); if (!m) { m = new Map(); c_CACHE.set(R, m); }
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.recorte(null); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega encima, entre las filas y0 e y1, un búfer con huecos (0 = transparente): lo fijo que va por delante de lo animado
function c_capa(R, b, y0 = 0, y1 = 179) { const d = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const v = b[i]; if (v) d[i] = v; } }

// el vaivén de un barco fondeado
const c_bob = (t, x) => Math.round(Math.sin(t * 1.3 + x * 0.07) * 1.2);

// el cielo tramado hasta y1: el degradado de la paleta, con vetas suaves de bruma
function c_cielo(R, y1, P, k = 0) {
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const f = y / y1 + (h(x >> 2, y >> 1, 900 + k) - 0.5) * 0.05 + Math.sin(x * 0.031 + y * 0.21 + k) * 0.02;
    R.pset(x, y, c_tono(P.cielo, f, x, y));
  }
}

// la luna llena (de noche: halo, mares y cráteres con su borde de luz) o el sol (de día) en (cx, cy) de radio r
function c_astro(R, cx, cy, r, P) {
  const L = P.luna;
  c_brillo(R, cx, cy, r * 3.4, P.halo[0], 0.75); c_brillo(R, cx, cy, r * 1.9, P.halo[1], 0.6);
  if (!P.noche) { c_brillo(R, cx, cy, r * 1.4, P.halo[2], 0.9); c_disco(R, cx, cy, r, (x, y, d) => d > 0.82 ? L[1] : (d > 0.6 && c_dz(x, y) < 0.4 ? L[1] : L[0])); return; }
  const CR = [[-0.32, -0.2, 0.2], [0.3, 0.22, 0.25], [0.08, -0.5, 0.13], [-0.22, 0.44, 0.15], [0.52, -0.14, 0.1], [-0.58, 0.1, 0.1]], MA = [[-0.12, -0.04, 0.42], [0.32, 0.36, 0.3], [-0.4, 0.4, 0.2]];
  c_disco(R, cx, cy, r, (x, y, d) => {
    const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - cy) / r;
    let f = 0.1 + (dx + dy) * 0.14 + d * d * 0.32;
    for (const [mx, my, mr] of MA) if (Math.hypot(dx - mx, dy - my) < mr) f += 0.22;
    for (const [mx, my, mr] of CR) { const e = Math.hypot(dx - mx, dy - my); if (e < mr) f = e < mr * 0.62 ? 0.7 : (dx - mx + dy - my > 0 ? 0.02 : 0.95); }
    return c_tono(L, Math.max(0, Math.min(1, f)), x, y);
  });
}

// estrellas que titilan entre y0 e y1 (solo de noche; nunca en la zona de Atom ni encima de la luna ev = [x, y, r])
function c_estrellas(R, t, y0, y1, n, P, k = 0, ev = null, x0 = 0, x1 = 319) {
  if (!P.noche) return;
  for (let i = 0; i < n; i++) {
    const x = Math.round(x0 + h(i, 1, 700 + k) * (x1 - x0)), y = Math.round(y0 + h(i, 2, 700 + k) ** 1.4 * (y1 - y0));
    if ((x > 272 && y < 48) || (x > 16 && x < 174 && y < 16)) continue;
    if (ev && Math.hypot(x - ev[0], y - ev[1]) < ev[2] * 1.7) continue;
    const b = Math.sin(t * (0.8 + (i % 5) * 0.55) + i * 2.3); if (b < -0.6) continue;
    R.pset(x, y, b > 0.45 ? P.estrella[0] : P.estrella[1]);
    if (i % 11 === 0 && b > 0.1) for (const [a, c] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.pset(x + a, y + c, P.estrella[2]);
  }
}

// una nube de tres o cuatro tonos (la sombra de abajo, el cuerpo, la luz de arriba y el filo que toca la luna), plana por debajo
function c_nube(R, cx, cy, w, cols) {
  const B = [[-0.4, 0.1, 0.2], [-0.16, -0.06, 0.27], [0.14, -0.12, 0.3], [0.4, 0.06, 0.21], [0.02, 0.1, 0.25]], base = cy + w * 0.16;
  for (const [dx, dy, r] of B) c_disco(R, cx + dx * w, cy + dy * w + 1.5, r * w, (x, y) => y > base + 1 ? null : cols[0]);
  for (const [dx, dy, r] of B) c_disco(R, cx + dx * w, cy + dy * w, r * w * 0.94, (x, y) => y > base ? null : y > base - 1.5 && c_dz(x, y) < 0.5 ? cols[0] : cols[1]);
  for (const [dx, dy, r] of B) c_disco(R, cx + dx * w - r * w * 0.22, cy + dy * w - r * w * 0.3, r * w * 0.56, (x, y, d) => y > base - 1 ? null : d > 0.78 && c_dz(x, y) < 0.5 ? cols[1] : cols[2]);
  if (cols[3]) for (const [dx, dy, r] of B) c_disco(R, cx + dx * w - r * w * 0.34, cy + dy * w - r * w * 0.46, r * w * 0.26, (x, y) => (c_dz(x, y) < 0.7 ? cols[3] : null));
}

// nubes en capas que cruzan a distinta velocidad: capas = [[y, velocidad, ancho, cuántas, brillo 0–2], …]
function c_nubes(R, t, P, capas, k = 0) {
  const N = P.nube;
  capas.forEach(([y, v, w, n, b], j) => { const cols = b === 0 ? [N[0], N[1], N[2]] : b === 1 ? [N[1], N[2], N[3]] : [N[1], N[2], N[3], N[4]];
    for (let i = 0; i < n; i++) c_nube(R, ((h(i, j, 721 + k) * 460 + t * v) % 460) - 70, y + (h(i, j, 722 + k) - 0.5) * 8, w * (0.7 + h(i, j, 720 + k) * 0.6), cols); });
}

// murciélagos (de noche) o gaviotas (de día) que cruzan aleteando entre y0 e y1
function c_aves(R, t, P, n, y0, y1, k = 0) {
  const c = P.noche ? hex('#06060f') : hex('#f4f4f4'), c2 = P.noche ? hex('#262640') : hex('#9aa4b4');
  for (let i = 0; i < n; i++) { const v = 9 + h(i, 1, 730 + k) * 8, x = Math.round(((h(i, 2, 730 + k) * 400 + t * v) % 400) - 40), y = Math.round(y0 + h(i, 3, 730 + k) * (y1 - y0) + Math.sin(t * 2 + i * 3) * 4);
    if ((x > 266 && y < 50) || (x > 14 && x < 176 && y < 18)) continue;
    const ala = Math.floor(t * (P.noche ? 10 : 5) + i * 3) % 2;
    R.pset(x, y, c); R.pset(x + 1, y, c);
    if (ala) { R.pset(x - 1, y - 1, c); R.pset(x - 2, y - 1, c2); R.pset(x + 2, y - 1, c); R.pset(x + 3, y - 1, c2); }
    else { R.pset(x - 1, y + 1, c); R.pset(x - 2, y, c2); R.pset(x + 2, y + 1, c); R.pset(x + 3, y, c2); }
  }
}

// el agua de y0 a y1: el degradado del horizonte a lo hondo, crestas que corren en sentidos alternos y, si lx, el camino
// de la luna (o del sol) que centellea
function c_agua(R, t, y0, y1, P, lx, x0 = 0, x1 = 319, k = 0) {
  const M = P.mar, L = P.marL, n = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / n; for (let x = x0; x <= x1; x++) R.pset(x, y, c_tono(M, 1 - f * 0.9 + (h(x >> 3, y, 600 + k) - 0.5) * 0.07, x, y)); }
  for (let y = y0 + 1; y <= y1; y += 2) { const f = (y - y0) / n, paso = 8 + f * 26, v = (1 + f * 5) * ((y >> 1) & 1 ? 1 : -0.7);
    for (let i = -1; i < 320 / paso + 1; i++) { const a = h(i, y, 610 + k); if (a < 0.3) continue;
      const xx = Math.round(i * paso + (((t * v + a * 50) % paso) + paso) % paso), w = Math.round(2 + f * 9 * a);
      for (let j = 0; j < w; j++) { const px = xx + j; if (px < x0 || px > x1) continue; R.pset(px, y, j < w * 0.6 ? L[0] : M[5]); if (j > 0 && j < w - 1 && y + 1 <= y1) R.pset(px, y + 1, M[0]); } } }
  if (lx != null) for (let y = y0 + 1; y <= y1; y++) { const f = (y - y0) / n, w = 3 + f * 18;
    for (let g = 0; g < 2 + f * 5; g++) { const px = Math.round(lx + (h(g, y, Math.floor(t * 4) + 620 + k) - 0.5) * 2 * w); if (px < x0 || px > x1) continue;
      if (h(g, y, Math.floor(t * 5) + 630 + k) < 0.55) { R.pset(px, y, f < 0.35 ? L[2] : L[1]); if (f > 0.3) R.pset(px + 1, y, L[0]); } } }
}

// la estela de luz de un farol en el agua: rayitas que tiemblan bajo (x, y0) hasta y1
function c_estela(R, t, x, y0, y1, col, k = 0) {
  for (let y = y0; y <= y1; y++) { if ((y + Math.floor(t * 6 + k)) % 3 === 0) continue; const w = 1 + Math.round(h(y, Math.floor(t * 5), 640 + k) * 2), ox = Math.round(Math.sin(y * 1.7 + t * 4 + k) * 1.5);
    for (let i = -w; i <= w; i++) c_mix(R, x + ox + i, y, col, 0.55 - Math.abs(i) * 0.15); }
}

// pinta con dibuja() en un búfer aparte (lo que cabe en bb = [x0, y0, x1, y1]), lo pega encima (o.alfa: translúcido) y
// lo refleja en el agua bajo la línea de flotación wl en n filas, con ondas; devuelve lo que devuelva dibuja()
function c_conReflejo(R, t, bb, wl, n, dibuja, o = {}) {
  const x0 = Math.max(0, Math.floor(bb[0])), y0 = Math.max(0, Math.floor(bb[1])), x1 = Math.min(319, Math.ceil(bb[2])), y1 = Math.min(179, Math.ceil(bb[3]));
  const tmp = c_fijo(R, 'tmp', () => {});
  for (let y = y0; y <= y1; y++) tmp.fill(0, y * 320 + x0, y * 320 + x1 + 1);
  const prev = R.usar(tmp), res = dibuja(); R.usar(prev);
  const d = R.buf, a = o.alfa ?? 1, ra = o.reflejo ?? 0.45, ymax = o.ymax ?? 179;
  for (let y = y0; y <= Math.min(y1, ymax); y++) for (let x = x0; x <= x1; x++) { const v = tmp[y * 320 + x]; if (v) d[y * 320 + x] = a >= 1 ? v : c_mezcla(d[y * 320 + x], v, Math.min(1, a * (0.8 + c_dz(x, y) * 0.4))); }
  for (let k = 1; k <= n; k++) { const y = wl + k; if (y > ymax) break; const sy = Math.round(wl - k * 1.1); if (sy < y0) break;
    if (k > 3 && ((y + Math.floor(t * 3)) % 4) === 0) continue;
    const am = 0.4 + k * 0.12;
    for (let x = x0; x <= x1; x++) { const sx = x + Math.round(Math.sin(y * 1.9 + t * 2.6 + x * 0.05) * am); if (sx < x0 || sx > x1) continue; const v = tmp[sy * 320 + sx]; if (!v) continue; d[y * 320 + x] = c_mezcla(d[y * 320 + x], v, ra * a * (1 - k / (n + 3))); } }
  return res;
}

// un galeón de costado (proa a la derecha si o.dir = 1) con la línea de flotación en wl y escala s: casco con tracas,
// franja, portas (alguna encendida), galería de popa con ventanas, borda con balaustres, mástiles con vergas, velas
// (o.velas 'recogidas', 'izadas' o 'rotas'), bauprés con foque, jarcia, cofa, bandera pirata que ondea, farol de popa y
// o.tripulacion figuritas que pasean por cubierta. o.soloCasco: solo el casco (para pintarlo delante de los personajes).
// o.mastiles 1: una balandra. Devuelve { luces, cubierta, borda, proa, popa, mastil }.
function c_galeon(R, x, wl, t, s, P, o = {}) {
  const d = o.dir ?? 1, X = (dx) => Math.round(x + dx * s * d), Y = (dy) => Math.round(wl + dy * s);
  const M = o.madera ?? P.madera, V = o.tela ?? P.tela, F = o.franja ?? P.franja, cu = o.cuerda ?? P.cuerda, w2 = s >= 0.75, velas = o.velas ?? 'recogidas';
  const MAS = o.mastiles === 1 ? [[2, 62]] : [[-6, 76], [22, 62], [-36, 48]], top = (m) => Y(-18 - m[1]);
  const luces = [], noche = P.noche || o.fantasma;
  if (!o.soloCasco) {
    // la jarcia por detrás de las velas: estays de tope a tope, al bauprés y a la popa, y los obenques
    const prT = [X(MAS[0][0]), top(MAS[0])];
    if (MAS.length > 1) { R.linea(prT[0], prT[1], X(MAS[1][0]), top(MAS[1]), cu); R.linea(X(MAS[1][0]), top(MAS[1]), X(64), Y(-31), cu); R.linea(X(MAS[2][0]), top(MAS[2]), X(-46), Y(-27), cu); R.linea(prT[0], prT[1], X(MAS[2][0]), top(MAS[2]), cu); }
    else R.linea(prT[0], prT[1], X(64), Y(-31), cu);
    for (const m of MAS) { const yo = Y(-18 - m[1] * 0.6); for (const e of [-8, -4, 5, 9]) R.linea(X(m[0]), yo, X(m[0] + e), Y(-19), cu, w2 ? 0 : 2); }
    // el bauprés y el foque
    R.linea(X(44), Y(-20), X(66), Y(-31), M[2]); if (w2) R.linea(X(44), Y(-21), X(66), Y(-32), M[1]);
    if (velas !== 'recogidas') { const fx = X(MAS.length > 1 ? 22 : 2), fy = top(MAS.length > 1 ? MAS[1] : MAS[0]) + Math.round(4 * s);
      c_poli(R, [[X(63), Y(-30)], [fx, fy], [X(MAS.length > 1 ? 25 : 6), Y(-23)]], (px, py) => (velas === 'rotas' && h(px >> 1, py >> 1, 765) < 0.16) ? null : c_tono(V, 0.2 + Math.abs(px - fx) / (40 * s) * 0.5 + (py - fy) / (60 * s) * 0.3, px, py)); }
    // mástiles, cofa, vergas y velas
    MAS.forEach((m, mi) => {
      const mx = X(m[0]), yb = Y(-18), yt = top(m);
      const YD = [[0.4, 22], [0.66, 17], [0.88, 11]], yards = YD.map(([f, l]) => [Y(-18 - m[1] * f), Math.max(3, Math.round(l * s * m[1] / 76))]);
      R.rect(mx, yt, mx + (w2 ? 1 : 0), yb, M[2]); if (w2) R.rect(mx, yt, mx, yb, M[1]);
      for (let i = 0; i < yards.length; i++) {
        const [yy, l] = yards[i];
        if (velas === 'recogidas') { for (let px = mx - l + 1; px <= mx + l - 1; px++) { R.pset(px, yy + 1, (px & 3) === 0 ? V[3] : V[1]); if (w2) R.pset(px, yy + 2, (px & 3) === 0 ? V[3] : V[2]); } }
        else {
          const ybot = i === 0 ? Y(-27) : yards[i - 1][0] - 1, lb = Math.round(l * 1.14), alto = Math.max(1, ybot - yy), paso = Math.max(3, Math.round(4 * s));
          for (let px = mx - lb; px <= mx + lb; px++) { const cx = (px - mx) / lb, bulto = Math.sin(t * 1.6 + mi + i) * 0.6;
            let yb2 = ybot + Math.round((1 - cx * cx) * (2 + bulto) * s); if (velas === 'rotas') yb2 -= Math.floor(h(px, i, 761 + mi) * 6 * s);
            for (let py = yy + 1; py <= yb2; py++) { const u = (py - yy) / alto; if (Math.abs(px - mx) > l + (lb - l) * u + 0.5) continue;
              if (velas === 'rotas' && h(px >> 1, (py + (px & 3)) >> 3, 760 + i + mi * 3) < 0.06) continue;
              let f = 0.12 + Math.abs(cx) * 0.5 + u * 0.15 + Math.sin(t * 2 + px * 0.25) * 0.06 + (cx * d > 0 ? 0.12 : 0);
              if ((px - mx) % paso === 0) f += 0.25;
              R.pset(px, py, c_tono(V, Math.min(1, f), px, py)); } }
        }
        R.rect(mx - l, yy, mx + l, yy, M[3]); R.pset(mx - l, yy + 1, M[3]); R.pset(mx + l, yy + 1, M[3]);
      }
      if (mi === 0 && MAS.length > 1) { const yc = Y(-18 - m[1] * 0.78); R.rect(mx - Math.round(3 * s), yc - 1, mx + Math.round(3 * s) + 1, yc + 1, M[2]); R.rect(mx - Math.round(3 * s), yc - 1, mx + Math.round(3 * s) + 1, yc - 1, M[1]); }
    });
    // la bandera, que ondea hacia la izquierda (el viento sopla de la derecha)
    { const fx = X(MAS[0][0]), fy = top(MAS[0]) - 1, ban = o.bandera ?? hex('#15151c'), w = w2 ? 8 : 5, al = w2 ? 5 : 3;
      R.rect(fx, fy - 2, fx, fy, M[3]);
      for (let i = 0; i < w; i++) { const yo = Math.round(Math.sin(t * 7 - i * 0.9) * (i / 4)); for (let j = 0; j < al; j++) R.pset(fx - 1 - i, fy - 2 + j + yo, ban); }
      if (w2) { const yo = Math.round(Math.sin(t * 7 - 3 * 0.9) * 0.75), bl = o.fantasma ? P.verdeF[1] : hex('#f2eee2'); R.pset(fx - 4, fy - 1 + yo, bl); R.pset(fx - 5, fy - 1 + yo, bl); R.pset(fx - 4, fy + yo, bl); R.pset(fx - 3, fy + 1 + yo, bl); R.pset(fx - 6, fy + 1 + yo, bl); } }
    // la tripulación: figuritas que pasean por cubierta (la borda les tapa los pies)
    for (let i = 0; i < (o.tripulacion ?? 0); i++) { const u = (t * (2.5 + i * 0.9) / 40 + h(i, 1, 780)) % 2, f = u < 1 ? u : 2 - u, fx = X(-28 + f * 50), fy = Y(-17), hh = Math.max(4, Math.round(7 * s)), cc = o.gente ?? P.gente;
      R.rect(fx, fy - hh + 2, fx + 1, fy, cc); R.rect(fx, fy - hh, fx + 1, fy - hh + 1, o.cara ?? cc); if (o.fantasma) R.pset(fx + (Math.floor(t * 2 + i) % 2), fy - hh, P.verdeF[0]);
      if (i === 0 && noche) { R.pset(fx + 2 * d, fy - hh + 3, P.calido[1]); luces.push([fx + 2 * d, fy - hh + 3]); } }
  }
  // el casco: tracas, la franja de color con las portas y la obra muerta más clara
  const C1 = [[-46, -26], [-33, -26], [-31, -19], [27, -19], [29, -23], [41, -23], [47, -19], [41, -8], [34, -2], [25, 0], [-35, 0], [-41, -5], [-46, -14]];
  const pts = C1.map(([a, b]) => [x + a * s * d, wl + b * s]), p2 = Math.max(2, Math.round(2.5 * s)), p3 = Math.max(2, Math.round(3 * s));
  R.poligono(pts, (px, py) => { const r = (py - wl) / s, ri = py - wl; let c;
    if (r < -17) c = M[0]; else if (r < -12.5) c = (ri % p2 === 0 ? M[2] : M[1]); else if (r < -10.5) c = F[0]; else if (r < -9.5) c = F[1]; else if (r < -3) c = (ri % p3 === 0 ? M[3] : M[2]); else c = c_dz(px, py) < 0.6 ? M[3] : M[2];
    if (r > -9.5 && h(px >> 2, py, 770) < 0.06) c = M[3];
    return c; });
  for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length]; if (ay < wl - 0.5 || by < wl - 0.5) R.linea(ax, ay, bx, by, M[3]); }
  for (let dx = -30; dx <= 26; dx += 3) R.pset(X(dx), Y(-17), M[3]);
  R.rect(Math.min(X(-46), X(-33)), Y(-26), Math.max(X(-46), X(-33)), Y(-26), o.fantasma ? P.verdeF[2] : P.oro[2]);
  for (let dx = -26, i = 0; dx <= 22; dx += 8, i++) { const gx = X(dx); R.rect(Math.min(gx, gx + Math.round(2 * s) * d), Y(-8), Math.max(gx, gx + Math.round(2 * s) * d), Y(-6), M[3]); if (noche && i % 3 === 1) R.pset(gx, Y(-7), o.fantasma ? P.verdeF[2] : P.calido[2]); }
  // la galería de popa con sus ventanas y el farol de popa
  { const ax = Math.min(X(-44), X(-36)), bx = Math.max(X(-44), X(-36)); R.rect(ax, Y(-24), bx, Y(-20), M[3]);
    const vc = noche ? (o.fantasma ? P.verdeF[1] : P.calido[1]) : hex('#2a3a4a');
    for (let i = ax + 1; i < bx; i += Math.max(2, Math.round(3 * s))) R.rect(i, Y(-23), i + (w2 ? 1 : 0), Y(-21), vc);
    if (noche) luces.push([Math.round((ax + bx) / 2), Y(-22)]);
    const lx = X(-47), ly = Y(-30); R.linea(lx, Y(-26), lx, ly, M[3]); R.rect(lx - 1, ly - 2, lx + 1, ly, M[3]); R.pset(lx, ly - 1, noche ? (o.fantasma ? P.verdeF[0] : P.calido[0]) : P.metal[1]); if (noche) luces.push([lx, ly - 1]); }
  // el mascarón: un bulto dorado bajo el bauprés
  R.rect(Math.min(X(45), X(47)), Y(-19), Math.max(X(45), X(47)), Y(-17), o.fantasma ? P.verdeF[2] : P.oro[1]);
  return { luces, cubierta: Y(-14), borda: Y(-19), proa: [X(66), Y(-31)], popa: [X(-46), Y(-26)], mastil: [X(MAS[0][0]), top(MAS[0])] };
}

// un bote de remos con su remero (figurita de 6 px) que rema; x, wl: centro y flotación
function c_bote(R, t, x, wl, P, k = 0) {
  const M = P.madera, rem = Math.sin(t * 3.2 + k);
  R.linea(x - 2, wl - 4, x - 7 - Math.round(rem * 2), wl + 1, M[2]); R.linea(x + 2, wl - 4, x + 7 - Math.round(rem * 2), wl + 1, M[2]);
  R.rect(x - 1, wl - 8, x + 1, wl - 4, P.gente); R.rect(x - 1, wl - 10, x + 1, wl - 9, P.noche ? hex('#3a2a2a') : hex('#c8906a')); R.rect(x - 2, wl - 11, x + 2, wl - 11, hex('#5a2020'));
  R.poligono([[x - 8, wl - 4], [x + 8, wl - 4], [x + 6, wl], [x - 6, wl]], (px, py) => py === wl - 4 ? M[0] : py === wl - 3 ? M[1] : M[2]);
  R.pset(x - 8, wl - 5, M[1]); R.pset(x + 8, wl - 5, M[1]);
}

// tablones horizontales de una pared (alto px cada uno): canto de luz arriba, sombra abajo, vetas, juntas con clavo y
// alguna tabla cambiada más oscura
function c_tablones(R, x0, y0, x1, y1, M, k = 0, alto = 4) {
  for (let y = y0, f = 0; y <= y1; y += alto, f++) {
    let x = x0 - Math.floor(h(f, 1, 800 + k) * 40);
    while (x <= x1) { const L = 22 + Math.floor(h(x, f, 801 + k) * 40), xa = Math.max(x0, x), xb = Math.min(x1, x + L - 1), osc = h(x, f, 802 + k) < 0.18;
      for (let j = 0; j < alto && y + j <= y1; j++) { const c = j === 0 ? M[0] : j === alto - 1 ? M[3] : (osc ? M[2] : M[1]); for (let xx = xa; xx <= xb; xx++) R.pset(xx, y + j, c); }
      for (let g = 0; g < L / 7; g++) { const gx = xa + Math.floor(h(g, x, 803 + k) * (xb - xa)), gy = y + 1 + Math.floor(h(g, x, 804 + k) * Math.max(1, alto - 2)), gl = 2 + Math.floor(h(g, x, 805 + k) * 6); if (gy >= y + alto - 1 || gy > y1) continue; for (let i = 0; i < gl && gx + i <= xb; i++) R.pset(gx + i, gy, osc ? M[3] : M[2]); }
      if (xb < x1 && xb > x0) { for (let j = 0; j < alto && y + j <= y1; j++) R.pset(xb, y + j, M[3]); if (alto > 3) R.pset(xb - 2, y + 1, M[0]); }
      x += L; }
  }
}

// tablas de un muelle o una cubierta en perspectiva, de y0 (lejos, finas) a y1 (cerca, anchas): juntas escalonadas,
// vetas, clavos, nudos y alguna tabla más oscura
function c_suelo(R, y0, y1, M, k = 0) {
  let y = y0, f = 0;
  while (y <= y1) { const a = Math.max(2, Math.round(2 + (y - y0) / Math.max(1, y1 - y0) * 8)), L0 = 22 + a * 7;
    let x = -Math.floor(h(f, 1, 820 + k) * L0);
    while (x < 320) { const L = Math.round(L0 * (0.7 + h(x, f, 821 + k) * 0.8)), osc = h(x, f, 822 + k) < 0.2, xa = Math.max(0, x), xb = Math.min(319, x + L - 1);
      for (let j = 0; j < a && y + j <= y1; j++) { const c = j === 0 ? M[0] : j === a - 1 ? M[3] : osc ? M[2] : M[1]; for (let xx = xa; xx <= xb; xx++) R.pset(xx, y + j, c); }
      for (let g = 0; g < L / 9; g++) { const gx = xa + Math.floor(h(g, x, 823 + k) * (xb - xa)), gy = y + 1 + Math.floor(h(g, x, 824 + k) * Math.max(1, a - 2)), gl = 3 + Math.floor(h(g, x, 825 + k) * a * 1.5); if (gy >= y + a - 1 || gy > y1) continue; for (let i = 0; i < gl && gx + i <= xb; i++) R.pset(gx + i, gy, osc ? M[3] : M[2]); }
      if (xb < 319) { for (let j = 0; j < a && y + j <= y1; j++) R.pset(xb, y + j, M[3]); if (a >= 4) { R.pset(xb - 2, y + 1, M[0]); R.pset(xb - 2, y + a - 2, M[0]); R.pset(xb + 2, y + 1, M[0]); } }
      if (a >= 5 && h(x, f, 826 + k) < 0.25) { const nx = xa + 6 + Math.floor(h(x, f, 827 + k) * Math.max(1, xb - xa - 12)), ny = y + (a >> 1); R.rect(nx - 2, ny, nx + 2, ny, M[2]); R.pset(nx, ny, M[3]); }
      x += L; }
    y += a; f++; }
}

// un barril de pie (centro cx, base yb): duelas abombadas con luz a la izquierda, dos aros de hierro y la tapa
function c_barril(R, cx, yb, P, k = 0, w = 12, hh = 14) {
  const M = P.madera, top = yb - hh;
  for (let y = top; y <= yb; y++) { const u = (y - top) / hh, hw = w / 2 * (0.84 + 0.16 * Math.sin(u * Math.PI));
    for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) { const v = (x - cx) / hw; let c = c_tono(M, 0.15 + (v + 1) * 0.32 + (u > 0.88 ? 0.25 : 0), x, y);
      if (((v + 1) * 3.2) % 1 < 0.16) c = M[3];
      if (Math.abs(u - 0.2) < 0.06 || Math.abs(u - 0.8) < 0.06) c = v < -0.3 ? P.metal[1] : P.metal[2];
      if (x === Math.round(cx - hw) || x === Math.round(cx + hw)) c = M[3];
      R.pset(x, y, c); } }
  for (let x = Math.round(cx - w * 0.42); x <= Math.round(cx + w * 0.42); x++) { R.pset(x, top - 1, M[0]); R.pset(x, top, x < cx ? M[1] : M[2]); }
  R.pset(Math.round(cx - w * 0.2), Math.round(top + hh * 0.5), M[0]);
}

// una caja de madera (x0, y0)–(x1, y1): tablas, marco y la riostra en diagonal
function c_caja(R, x0, y0, x1, y1, M, k = 0) {
  c_tablones(R, x0, y0, x1, y1, M, 40 + k, 3);
  R.rect(x0, y0, x1, y0, M[3]); R.rect(x0, y1, x1, y1, M[3]); R.rect(x0, y0, x0, y1, M[3]); R.rect(x1, y0, x1, y1, M[3]);
  R.rect(x0 + 1, y0 + 1, x0 + 2, y1 - 1, M[1]); R.rect(x1 - 2, y0 + 1, x1 - 1, y1 - 1, M[2]); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, M[1]);
  R.linea(x0 + 3, y1 - 1, x1 - 3, y0 + 3, M[2]); R.linea(x0 + 3, y1 - 2, x1 - 3, y0 + 2, M[0]);
  R.pset(x0 + 1, y0 + 1, c_CLAVO); R.pset(x1 - 1, y0 + 1, c_CLAVO); R.pset(x0 + 1, y1 - 1, c_CLAVO); R.pset(x1 - 1, y1 - 1, c_CLAVO);
}

// el color de las cabezas de clavo de las cajas
const c_CLAVO = hex('#a8a8b8');

// un farol de hierro colgado de (x, y): sombrerete, cristales, la llama que tiembla. Devuelve dónde está la llama
function c_farol(R, t, x, y, P, k = 0, verde = false) {
  const fl = Math.sin(t * 11 + k * 3) + Math.sin(t * 17 + k), L = verde ? P.verdeF : P.calido, n = hex('#14121a');
  R.rect(x - 2, y, x + 2, y, n); R.rect(x - 1, y - 1, x + 1, y - 1, n); R.pset(x, y - 2, n);
  R.rect(x - 2, y + 1, x + 2, y + 6, L[1]); R.rect(x - 1, y + 2, x + 1, y + 5, L[0]); R.pset(x + (fl > 0.6 ? 1 : 0), y + 2, fl > -0.5 ? hex('#ffffff') : L[0]); R.rect(x - 1, y + 5, x + 1, y + 5, L[2]);
  R.rect(x - 2, y + 1, x - 2, y + 6, n); R.rect(x + 2, y + 1, x + 2, y + 6, n); R.rect(x - 2, y + 7, x + 2, y + 7, n); R.pset(x, y + 8, n);
  return [x, y + 4, 0.3 + fl * 0.04];
}

// el resplandor de una luz cálida (o verde): halo grande y suave, y otro pequeño y fuerte
function c_luz(R, t, x, y, r, P, k = 0, verde = false) {
  const fl = 1 + Math.sin(t * 9 + k * 2) * 0.06 + Math.sin(t * 23 + k) * 0.04, L = verde ? P.verdeF : P.calido;
  c_brillo(R, x, y, r * fl, L[2], 0.42); c_brillo(R, x, y, r * 0.45, L[1], 0.5);
}

// la luz que cae de una puerta o una ventana sobre el suelo: un trapecio tramado que se abre y se apaga hacia delante
function c_charco(R, xa, xb, y0, y1, ab, col, a) {
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), e = ab * u, c = (xa + xb) / 2, hw = (xb - xa) / 2 + e;
    for (let x = Math.round(c - hw); x <= Math.round(c + hw); x++) { const g = a * (1 - u) * (1 - Math.max(0, Math.abs(x - c) - (xb - xa) / 2) / (e + 1) * 0.7); if (g > 0.03 + c_dz(x, y) * 0.1) c_mix(R, x, y, col, Math.min(0.6, g)); } }
}

// una figura en sombra dentro de una ventana iluminada (base yb, sale por abajo del hueco): sombrero de tres picos,
// pañuelo o pelo, y el brazo que sube la jarra a ratos
function c_pirataSombra(R, t, x, yb, c, cL, k = 0) {
  x = Math.round(x);
  c_r(R, x - 4, yb - 7, x + 4, yb + 4, c); c_r(R, x - 3, yb - 8, x + 3, yb - 8, c);
  c_disco(R, x, yb - 11, 3.2, c);
  const tipo = k % 3;
  if (tipo === 0) { c_r(R, x - 5, yb - 14, x + 5, yb - 14, c); c_r(R, x - 3, yb - 16, x + 3, yb - 15, c); R.pset(x - 6, yb - 15, c); R.pset(x + 6, yb - 15, c); }
  else if (tipo === 1) { c_r(R, x - 3, yb - 15, x + 3, yb - 13, c); R.pset(x + 4, yb - 12, c); R.pset(x + 5, yb - 11, c); }
  else { c_r(R, x - 4, yb - 14, x + 2, yb - 13, c); R.pset(x - 4, yb - 12, c); }
  const fase = (t * 0.8 + k * 0.37) % 3, arriba = fase < 0.7, d = k % 2 ? 1 : -1;
  if (arriba) { R.linea(x + 3 * d, yb - 7, x + 6 * d, yb - 12, c); c_r(R, Math.min(x + 6 * d, x + 8 * d), yb - 15, Math.max(x + 6 * d, x + 8 * d), yb - 12, c); R.pset(x + 7 * d, yb - 16, cL); }
  else { R.linea(x + 4 * d, yb - 6, x + 6 * d, yb - 3, c); c_r(R, Math.min(x + 6 * d, x + 8 * d), yb - 5, Math.max(x + 6 * d, x + 8 * d), yb - 2, c); }
}

// el interior iluminado de una ventana (recortado a su hueco): pared cálida con estante de botellas, la lámpara que se
// mece y n piratas en sombra que se balancean y brindan
function c_interior(R, t, [x0, y0, x1, y1], P, k = 0, n = 2) {
  const Cc = P.calido, fl = 0.07 * Math.sin(t * 9 + k) + 0.05 * Math.sin(t * 23 + k * 2), W = x1 - x0 + 1, Hh = y1 - y0 + 1;
  R.recorte([x0, y0, x1, y1]);
  if (!P.noche) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, c_tono([hex('#3a2a2a'), hex('#24181c'), hex('#140e12')], 0.3 + (y - y0) / Hh * 0.5, x, y)); R.recorte(null); return; }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, c_tono(Cc, 0.12 + (y - y0) / Hh * 0.45 + Math.abs(x - (x0 + x1) / 2) / W * 0.6 - fl, x, y));
  const sy = y0 + Math.max(3, Math.round(Hh * 0.32));
  c_r(R, x0, sy, x1, sy, Cc[3]);
  for (let bx = x0 + 1; bx < x1; bx += 3) { const bh = 2 + ((bx * 7 + k) % 3); c_r(R, bx, sy - bh, bx, sy - 1, [hex('#4a8a5a'), hex('#8a3a2a'), hex('#3a5a8a')][(bx + k) % 3]); R.pset(bx, sy - bh, Cc[0]); }
  const cx = Math.round((x0 + x1) / 2), lx = Math.round(cx + Math.sin(t * 1.6 + k) * 2); R.linea(cx, y0, lx, y0 + 3, Cc[4]); c_r(R, lx - 1, y0 + 4, lx + 1, y0 + 5, Cc[0]);
  for (let i = 0; i < n; i++) c_pirataSombra(R, t, x0 + (i + 0.5) * W / n + Math.sin(t * (0.7 + i * 0.3) + k + i) * 2.5, y1 + 4 + Math.round(Math.abs(Math.sin(t * 2.2 + i * 1.7 + k)) * 1.5), Cc[4], Cc[0], i + k);
  R.recorte(null);
}

// humo que sube de una chimenea en (x, y) y se va hacia la izquierda, deshaciéndose
function c_humo(R, t, x, y, P, k = 0, alto = 20, deriva = 14) {
  const c1 = P.noche ? P.nube[3] : hex('#d8d8e0'), c2 = P.noche ? P.nube[2] : hex('#b8b8c4');
  for (let i = 0; i < 7; i++) { const u = (t * 0.32 + i / 7 + k * 0.13) % 1, px = x - u * deriva + Math.sin(t * 1.3 + i) * 1.5, py = y - u * alto, r = 1.4 + u * 3.6;
    c_disco(R, px, py, r, (xx, yy, d) => (c_dz(xx, yy) < 1 - u * 0.85 ? (d < 0.55 && yy < py ? c1 : c2) : null)); }
}

// la jarra de cerveza con espuma en pictograma (el letrero de la taberna), en (x, y) esquina de arriba
function c_jarra(R, x, y, P, s = 1) {
  const sp = (i, j, c) => R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c);
  const fil = ['.ww.w.', 'wwwwww', 'gyyyg.', 'gyyygg', 'gyyyg.g', 'gyyygg', 'gyyyg.', 'ggggg.'];
  const dic = { w: hex('#f8f4e8'), y: P.oro[1], g: P.oro[3] };
  fil.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (dic[f[i]]) sp(i, j, dic[f[i]]); });
}

// el letrero de madera de la taberna (x, y, w, alto) con su marco y la jarra en el centro
function c_letrero(R, x, y, w, al, P) {
  const M = P.madera; R.rect(x, y, x + w, y + al, M[3]); R.rect(x + 1, y + 1, x + w - 1, y + al - 1, M[2]);
  for (let j = y + 2; j < y + al - 1; j += 2) for (let i = x + 2; i < x + w - 1; i++) if (h(i >> 2, j, 850) < 0.4) R.pset(i, j, M[1]);
  R.rect(x + 1, y + 1, x + w - 1, y + 1, M[1]);
  c_jarra(R, Math.round(x + w / 2 - 3), Math.round(y + al / 2 - 4), P, 1);
}

// una gaviota dormida sobre un pilote en (x, y = sus patas): de vez en cuando saca la cabeza
function c_gaviota(R, t, x, y, P) {
  const b = P.noche ? hex('#b8bcd0') : hex('#f4f4f4'), g = P.noche ? hex('#6a6e88') : hex('#a8b0c0'), saca = (t % 7) > 5.6;
  R.rect(x - 3, y - 4, x + 2, y - 1, b); R.rect(x - 3, y - 2, x + 1, y - 1, g); R.pset(x - 4, y - 3, g); R.pset(x + 3, y - 2, g);
  if (saca) { R.rect(x + 1, y - 7, x + 2, y - 5, b); R.pset(x + 3, y - 6, P.oro[1]); R.pset(x + 1, y - 6, hex('#14121a')); } else { R.rect(x, y - 6, x + 2, y - 4, b); R.pset(x + 1, y - 5, g); }
  R.pset(x - 1, y, P.oro[2]); R.pset(x + 1, y, P.oro[2]);
}

// un gato tumbado sobre algo (x, y = donde apoya) que mueve la cola y parpadea
function c_gatito(R, t, x, y, P, dir = 1) {
  const c = P.noche ? hex('#2a2430') : hex('#4a3a3a'), c2 = P.noche ? hex('#4a4058') : hex('#6a5a5a'), ojo = (t % 4) < 3.8 ? (P.noche ? hex('#d8f070') : hex('#a8c040')) : c;
  R.rect(x - 4, y - 3, x + 3, y - 1, c); R.rect(x - 3, y - 4, x + 2, y - 4, c2);
  const hx = x + 4 * dir; R.rect(hx - 1, y - 5, hx + 1, y - 2, c); R.pset(hx - 1, y - 6, c); R.pset(hx + 1, y - 6, c); R.pset(hx, y - 4, ojo); R.pset(hx + dir, y - 4, ojo);
  const ca = Math.sin(t * 2.2); for (let i = 1; i <= 5; i++) R.pset(x - 4 * dir - i * dir, y - 2 - Math.round(Math.sin(i * 0.6 + ca) * (i / 2.5)), c);
}

// la isla lejana del puerto: colinas con palmeras en silueta, la mansión de la gobernadora encendida en lo alto, luces
// del pueblo en la orilla y un faro en la punta de la derecha (la luz del faro la pinta el encuadre)
function c_lejana(R, P, hor) {
  const L = P.lejos, cima = (x) => hor - 2 - 22 * Math.exp(-(((x - 52) / 36) ** 2)) - 11 * Math.exp(-(((x - 122) / 22) ** 2)) - 9 * Math.exp(-(((x - 302) / 26) ** 2)) - (x < 175 || x > 262 ? 1.6 * Math.sin(x * 0.23) + Math.sin(x * 0.61) : 0);
  for (let x = 0; x < 320; x++) { const top = Math.round(cima(x)); for (let y = Math.max(0, top); y < hor; y++) R.pset(x, y, y === top ? L[3] : (y < top + 3 && c_dz(x, y) < 0.5) ? L[2] : (h(x >> 1, y >> 1, 860) < 0.12 ? L[0] : L[1])); }
  for (const [px, alto, lado] of [[18, 9, 1], [30, 11, -1], [88, 10, 1], [134, 8, -1], [148, 9, 1], [286, 7, -1]]) { const yb = Math.round(cima(px)) + 1, tx = px + lado * 2;
    R.linea(px, yb, tx, yb - alto, L[0]); for (const [a, b] of [[-4, 2], [-3, -1], [0, -2], [3, -1], [4, 2]]) R.linea(tx, yb - alto, tx + a, yb - alto + b, L[0]); }
  { const mx = 52, my = Math.round(cima(52)) - 1; R.rect(mx - 8, my - 6, mx + 8, my, L[0]); R.poligono([[mx - 10, my - 6], [mx + 10, my - 6], [mx + 6, my - 10], [mx - 6, my - 10]], L[0]); R.rect(mx + 3, my - 13, mx + 4, my - 9, L[0]);
    if (P.noche) for (const wx of [mx - 6, mx - 3, mx + 2, mx + 5]) R.pset(wx, my - 3, wx === mx + 2 ? P.oro[1] : P.calido[1]); }
  if (P.noche) for (let i = 0; i < 9; i++) { const x = 96 + Math.round(h(i, 1, 861) * 70); R.pset(x, hor - 2 - Math.round(h(i, 2, 861) * 3), P.calido[2]); }
  R.rect(299, Math.round(cima(300)) - 9, 302, Math.round(cima(300)), L[0]); R.rect(298, Math.round(cima(300)) - 11, 303, Math.round(cima(300)) - 10, L[0]);
}

// un noray de hierro (bolardo) con un cabo, en el primer término
function c_noray(R, x, yb, P) {
  const m = P.metal; R.rect(x - 4, yb - 12, x + 4, yb, m[2]); R.rect(x - 4, yb - 12, x - 2, yb, m[1]); R.rect(x + 3, yb - 12, x + 4, yb, m[3]); R.rect(x - 6, yb - 15, x + 6, yb - 12, m[2]); R.rect(x - 6, yb - 15, x + 6, yb - 15, m[0]); R.rect(x - 6, yb - 12, x + 6, yb - 12, m[3]);
  const cu = P.noche ? hex('#8a7a5a') : hex('#c8b080'), cs = P.noche ? hex('#5a4a3a') : hex('#8a7050');
  for (let i = -5; i <= 5; i++) { R.pset(x + i, yb - 9 + Math.round(Math.abs(i) * 0.3), cu); R.pset(x + i, yb - 8 + Math.round(Math.abs(i) * 0.3), cs); }
  for (let i = 5; i < 22; i++) { R.pset(x + i, yb - 8 + Math.round(Math.sqrt(i - 5) * 1.6), cu); R.pset(x + i, yb - 7 + Math.round(Math.sqrt(i - 5) * 1.6), cs); }
}

// un rollo de cabo en el suelo (centro x, y), en espiral
function c_rollo(R, x, y, P, rx = 9) {
  const cu = P.noche ? hex('#8a7a5a') : hex('#c8b080'), cs = P.noche ? hex('#4a3e30') : hex('#8a7050'), cl = P.noche ? hex('#a8987a') : hex('#e8d4a0');
  for (let r = rx; r > 1; r -= 2) for (let a = 0; a < Math.PI * 2; a += 0.6 / r) { const px = Math.round(x + Math.cos(a) * r), py = Math.round(y + Math.sin(a) * r * 0.36); R.pset(px, py, Math.sin(a) < -0.3 ? cl : Math.sin(a) > 0.5 ? cs : cu); }
  R.pset(x, y, cs);
}

// el muelle general: horizonte en 92, el agua hasta el canto del muelle (126), las tablas de 126 a 179 y la taberna a
// la derecha (x 180–300, base 127, puerta 228–246)
function c_muelle(R, t, P, o) {
  const hor = 92, borde = 126, LX = 132, LY = 38, M = P.madera, Cc = P.calido;
  R.copiar(c_fijo(R, 'muF' + P.noche, () => { c_cielo(R, hor, P, 1); c_astro(R, LX, LY, 15, P); }));
  c_estrellas(R, t, 2, 82, 90, P, 1, [LX, LY, 15]);
  c_nubes(R, t, P, [[24, 0.7, 30, 3, 0], [52, 2.0, 40, 3, 1], [72, 3.6, 30, 2, 2]], 1);
  c_aves(R, t, P, 3, 30, 70, 1);
  c_capa(R, c_fijo(R, 'muL' + P.noche, () => c_lejana(R, P, hor)), 50, hor);
  if (P.noche && Math.sin(t * 1.6) > 0.2) { c_brillo(R, 300, 70, 9, P.calido[1], 0.6); R.pset(300, 70, P.calido[0]); }
  c_agua(R, t, hor, borde, P, LX);
  // la balandra lejana, el bote que cruza y el galeón fondeado, cada uno con su reflejo
  const bal = c_conReflejo(R, t, [140, 50, 200, 102], 102, 8, () => c_galeon(R, 166, 102 + c_bob(t, 166) * 0.5, t, 0.42, P, { mastiles: 1, velas: 'izadas', dir: -1 }));
  { const bx = Math.round(262 - ((t * 3.5) % 300)); c_conReflejo(R, t, [bx - 12, 96, bx + 12, 110], 110, 5, () => c_bote(R, t, bx, 110, P)); }
  const wl = 116 + c_bob(t, 58);
  const gal = c_conReflejo(R, t, [0, 14, 130, wl], wl, 12, () => c_galeon(R, 58, wl, t, 1, P, { tripulacion: 2 }), { ymax: borde - 1 });
  let llega = null;
  if (o.barco != null) { const bw = 121 + c_bob(t, o.barco); llega = c_conReflejo(R, t, [o.barco - 70, 20, o.barco + 70, bw], bw, 6, () => c_galeon(R, o.barco, bw, t, 1, P, { velas: 'izadas' }), { ymax: borde - 1 }); }
  if (P.noche) { for (const [lx, ly] of [...bal.luces, ...gal.luces, ...(llega ? llega.luces : [])]) c_brillo(R, lx, ly, 6, Cc[1], 0.45);
    c_estela(R, t, gal.popa[0] - 1, wl + 2, borde - 1, Cc[1], 1); }
  // el primer plano fijo: muelle, pilotes, taberna, barriles y cabos
  c_capa(R, c_fijo(R, 'muD' + P.noche, () => c_muelleFrente(R, P)), 28, 179);
  // lo que se mueve delante: los interiores, la puerta, los faroles, el letrero que se mece, el humo, el gato, la gaviota
  c_interior(R, t, [190, 80, 212, 100], P, 1, 2); c_interior(R, t, [266, 80, 288, 100], P, 4, 2); c_interior(R, t, [250, 54, 258, 60], P, 7, 0);
  for (const [a, b] of [[190, 80], [266, 80]]) { R.rect(a + 10, b, a + 11, b + 20, M[3]); R.rect(a, b + 9, a + 22, b + 10, M[3]); if (P.noche) { R.pset(a + 2, b + 2, Cc[0]); R.pset(a + 3, b + 1, Cc[0]); } else { R.linea(a + 2, b + 7, a + 7, b + 2, hex('#8aa8c8')); } }
  R.rect(254, 54, 254, 60, M[3]);
  c_interior(R, t, [228, 98, 246, 127], P, 9, 1);
  R.rect(228, 98, 231, 127, M[1]); R.rect(231, 98, 231, 127, M[3]); R.pset(230, 113, P.oro[2]);
  if (P.noche) { c_charco(R, 230, 246, 128, 168, 22, Cc[1], 0.34); for (const a of [190, 266]) c_charco(R, a, a + 22, 128, 140, 10, Cc[2], 0.16); }
  const f1 = c_farol(R, t, 221, 100, P, 1), f2 = c_farol(R, t, 253, 100, P, 2), f3 = c_farol(R, t, 151, 98, P, 3);
  if (P.noche) { for (const [fx, fy] of [f1, f2, f3]) c_luz(R, t, fx, fy, 22, P, fx); c_estela(R, t, 151, 104, borde - 1, Cc[1], 3); for (const [a, b] of [[201, 90], [277, 90]]) c_brillo(R, a, b, 20, Cc[2], 0.22); }
  // el letrero colgante de la esquina, que se mece con la brisa
  { const sw = Math.sin(t * 1.7) * 1.6, sx = Math.round(170 + sw), n = hex('#14121a');
    R.linea(165, 70, sx - 4, 74, n); R.linea(175, 70, sx + 5, 74, n); c_letrero(R, sx - 8, 74, 17, 10, P); }
  // charcos en las tablas que reflejan el cielo y tiemblan
  for (const [cx, cy, rx] of [[96, 150, 13], [176, 174, 18]]) for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / 2.6); if (d > 1) continue; R.pset(x, y, d > 0.8 ? P.tabla[3] : c_tono([P.cielo[2], P.cielo[4], P.cielo[5]], 0.5 + Math.sin(x * 0.7 + t * 3) * 0.3, x, y)); if (P.noche && Math.abs(x - cx - 3 + Math.sin(t * 2) * 2) < 1.5 && y === cy) R.pset(x, y, P.luna[1]); }
  c_humo(R, t, 200, 29, P, 1, 16, 12);
  c_gatito(R, t, 268, 99, P, -1);
  c_gaviota(R, t, 98, 109, P);
  const r = { suelo: 162, pies: [44, 256], horizonte: hor, agua: [0, hor, 319, borde - 1], muelle: [0, borde, 319, 179], luna: P.noche ? [LX, LY] : null,
    taberna: [180, 64, 300, 127], puerta: [237, 127], letrero: [170, 79], galeon: [58, wl] };
  if (llega) r.barco = { x: o.barco, cubierta: llega.cubierta, de: o.barco - 30, a: o.barco + 26 };
  return r;
}

// el primer plano fijo del muelle general
function c_muelleFrente(R, P) {
  const M = P.madera, T = P.tabla, Tj = P.tejado, n = hex('#14121a');
  c_suelo(R, 126, 179, T, 1);
  R.rect(0, 126, 319, 127, T[3]); for (let x = 3; x < 320; x += 13) R.pset(x, 127, P.metal[1]);
  const PIL = [6, 50, 96, 146];
  for (let i = 0; i < 3; i++) { const a = PIL[i] + 4, b = PIL[i + 1]; for (let x = a; x <= b; x++) { const u = (x - a) / (b - a); R.pset(x, Math.round(114 + Math.sin(u * Math.PI) * 5), P.noche ? hex('#6a5a44') : hex('#b8a070')); } }
  for (const px of PIL) { R.rect(px, 110, px + 4, 127, T[2]); R.rect(px, 110, px + 1, 127, T[1]); R.rect(px + 4, 110, px + 4, 127, T[3]); R.rect(px - 1, 109, px + 5, 110, T[0]); for (let y = 112; y < 127; y += 3) R.pset(px + 2, y, T[3]); R.rect(px - 1, 116, px + 5, 117, P.noche ? hex('#7a6a4a') : hex('#c8b080')); }
  R.rect(148, 92, 149, 110, T[2]); R.rect(148, 92, 155, 93, T[2]); R.pset(151, 94, n); R.pset(151, 95, n); R.pset(151, 96, n); R.pset(151, 97, n);
  // la taberna: paredes de tablones, postes de esquina, tejado de tablillas con musgo, chimenea de piedra y buhardilla
  c_tablones(R, 180, 64, 300, 127, M, 3, 4);
  for (let y = 64; y <= 127; y++) for (let x = 180; x <= 300; x++) if (c_dz(x, y) < (x - 180) / 120 * 0.35) R.pset(x, y, c_mezcla(R.pget(x, y), M[3], 0.3));
  for (const cx of [179, 298]) { R.rect(cx, 62, cx + 3, 127, M[3]); R.rect(cx + 1, 62, cx + 1, 127, M[1]); }
  R.rect(178, 124, 302, 127, M[3]); R.rect(178, 124, 302, 124, M[2]);
  R.poligono([[168, 66], [312, 66], [296, 46], [184, 46]], (x, y) => { const r = y - 46, row = r >> 2, off = (row & 1) * 4, j = r & 3; if (j === 3 || ((x + off) % 8) === 0) return Tj[3]; const v = h((x + off) >> 3, row, 830); return j === 0 ? (v < 0.3 ? Tj[0] : Tj[1]) : v < 0.15 ? Tj[0] : v < 0.75 ? Tj[1] : Tj[2]; });
  R.rect(184, 45, 296, 46, Tj[0]); R.rect(166, 66, 314, 68, M[3]); R.rect(166, 66, 314, 66, M[1]);
  for (let i = 0; i < 24; i++) { const x = 188 + Math.floor(h(i, 1, 831) * 104), y = 49 + Math.floor(h(i, 2, 831) * 15); R.pset(x, y, P.hoja[2]); R.pset(x + 1, y, P.hoja[1]); R.pset(x, y + 1, P.hoja[3]); }
  for (let y = 31; y <= 50; y++) for (let x = 196; x <= 205; x++) { const row = (y - 31) >> 2, off = (row & 1) * 2, j = (y - 31) & 3; R.pset(x, y, j === 3 || ((x + off) % 5 === 0) ? P.roca[3] : h((x + off) / 5 | 0, row, 832) < 0.4 ? P.roca[0] : P.roca[1]); }
  R.rect(194, 29, 207, 31, P.roca[2]); R.rect(194, 29, 207, 29, P.roca[0]); R.rect(205, 31, 205, 50, P.roca[3]);
  R.poligono([[243, 53], [265, 53], [254, 44]], (x, y) => (y & 1 ? Tj[1] : Tj[2])); R.linea(243, 53, 254, 44, Tj[0]); R.linea(254, 44, 265, 53, Tj[3]);
  R.rect(246, 52, 262, 62, M[2]); R.rect(246, 52, 262, 52, M[1]); R.rect(249, 53, 259, 61, M[3]);
  // ventanas con marco, alféizar y contraventanas (una torcida)
  for (const [a, b, k] of [[190, 80, 0], [266, 80, 1]]) { R.rect(a - 2, b - 2, a + 24, b + 22, M[3]); R.rect(a - 1, b - 1, a + 23, b - 1, M[1]); R.rect(a - 3, b + 21, a + 25, b + 22, M[0]); R.rect(a - 3, b + 23, a + 25, b + 23, M[3]);
    const sx = a - 9; for (let y = b - 1; y <= b + 20; y++) for (let x = sx; x <= sx + 5; x++) R.pset(x + (k && y > b + 12 ? 1 : 0), y + (k ? Math.round((x - sx) * 0.3) : 0), x === sx || x === sx + 5 ? M[3] : ((y - b) & 1 ? M[1] : M[2])); }
  // la puerta (el hueco lo pinta el encuadre), el letrero de encima, el escalón y las lámparas
  R.rect(225, 95, 249, 127, M[3]); R.rect(225, 95, 249, 96, M[1]); R.rect(226, 97, 227, 127, M[2]); R.rect(247, 97, 248, 127, M[2]);
  c_letrero(R, 221, 84, 32, 10, P);
  R.rect(221, 125, 253, 128, P.roca[1]); R.rect(221, 125, 253, 125, P.roca[0]); R.rect(221, 128, 253, 128, P.roca[3]);
  R.rect(162, 70, 181, 70, n); R.linea(176, 70, 181, 76, n); R.pset(162, 69, n);
  // barriles y cajas junto a la pared; una red colgada en la esquina
  c_barril(R, 262, 127, P, 1, 12, 14); c_barril(R, 276, 127, P, 2, 12, 14); c_barril(R, 269, 113, P, 4, 12, 14);
  c_caja(R, 283, 111, 297, 127, M, 5);
  for (let y = 72; y < 96; y++) for (let x = 183; x < 188; x++) if ((x + y) % 3 === 0 || (x - y + 99) % 3 === 0) R.pset(x, y + Math.round(Math.sin(x) * 0.5), P.noche ? hex('#7a7a6a') : hex('#c8c0a0'));
  // en el canto del muelle: la escalera que baja al agua, una pila de cajas con una red, un cesto de pescado y cornamusas
  R.rect(70, 116, 71, 128, T[1]); R.rect(78, 116, 79, 128, T[1]); for (let y = 118; y < 128; y += 3) R.rect(70, y, 79, y, T[2]);
  c_caja(R, 108, 118, 124, 132, M, 11); c_caja(R, 124, 122, 138, 132, M, 12); c_caja(R, 112, 106, 126, 118, M, 13);
  for (let y = 104; y < 130; y++) for (let x = 104 + Math.round((y - 104) * 0.2); x < 110 + Math.round((y - 104) * 0.4); x++) if ((x + y) % 3 === 0) R.pset(x, y, P.noche ? hex('#7a7a6a') : hex('#c8c0a0'));
  { const cx = 160, cy = 136; for (let y = cy - 6; y <= cy; y++) for (let x = cx - 8; x <= cx + 8; x++) R.pset(x, y, (x + y) % 2 ? hex(P.noche ? '#7a6a4a' : '#c8a868') : hex(P.noche ? '#5a4a34' : '#9a7a48')); R.rect(cx - 9, cy - 7, cx + 9, cy - 7, M[3]);
    for (let i = 0; i < 6; i++) { const fx = cx - 6 + i * 2.4; R.linea(Math.round(fx), cy - 7, Math.round(fx + 2), cy - 10 - (i % 2), P.metal[0]); R.pset(Math.round(fx + 2), cy - 10 - (i % 2), P.metal[1]); } }
  for (const cx of [30, 200]) { R.rect(cx - 4, 131, cx + 4, 132, P.metal[2]); R.rect(cx - 1, 133, cx + 1, 134, P.metal[3]); R.rect(cx - 4, 131, cx + 4, 131, P.metal[0]); }
  // el primer término: el noray con su cabo y un rollo a la izquierda; un barril grande y una nasa a la derecha
  c_noray(R, 16, 168, P); c_rollo(R, 38, 172, P, 9);
  c_barril(R, 306, 179, P, 6, 18, 22);
  { const x0 = 280, y0 = 164; for (let y = y0; y <= y0 + 14; y++) for (let x = x0; x <= x0 + 14; x++) { const e = (x - x0) % 4 === 0 || (y - y0) % 4 === 0; if (e) R.pset(x, y, P.noche ? hex('#8a7058') : hex('#c89a6a')); } R.rect(x0, y0 + 14, x0 + 14, y0 + 15, M[3]); R.rect(x0, y0 - 1, x0 + 14, y0, M[1]); }
}

// la fachada de la taberna de cerca: la pared llega de x 0 a 263; a la derecha, el mar con un farol; tablas del porche
// de 140 a 179. Puerta 112–136 × 98–140 (centro 124), ventanas 26–70 y 170–214 × 76–106
function c_taberna(R, t, P, o) {
  const M = P.madera, Cc = P.calido, hor = 98;
  R.copiar(c_fijo(R, 'taF' + P.noche, () => { c_cielo(R, hor, P, 3); }));
  c_estrellas(R, t, 50, 92, 26, P, 3, null, 264, 319);
  c_nubes(R, t, P, [[62, 1.6, 26, 3, 1], [82, 3, 22, 2, 2]], 3);
  c_agua(R, t, hor, 139, P, 300, 262, 319, 3);
  c_conReflejo(R, t, [276, 60, 319, 108], 108, 6, () => c_galeon(R, 300, 108 + c_bob(t, 300) * 0.5, t, 0.36, P, { dir: -1 }));
  c_capa(R, c_fijo(R, 'taD' + P.noche, () => c_tabernaFrente(R, P)), 0, 179);
  // las ventanas: los interiores, los parteluces y el reflejo del cristal
  c_interior(R, t, [26, 76, 70, 106], P, 11, 3); c_interior(R, t, [170, 76, 214, 106], P, 14, 2); c_interior(R, t, [40, 22, 62, 44], P, 17, 1);
  for (const [a, b, w, al] of [[26, 76, 44, 30], [170, 76, 44, 30], [40, 22, 22, 22]]) { const n = w > 30 ? 3 : 2; for (let i = 1; i < n; i++) R.rect(a + Math.round(w * i / n) - 1, b, a + Math.round(w * i / n), b + al, M[3]); R.rect(a, b + Math.round(al / 2), a + w, b + Math.round(al / 2) + 1, M[3]);
    if (P.noche) { R.linea(a + 3, b + 8, a + 8, b + 3, Cc[0]); R.linea(a + 4, b + 8, a + 9, b + 3, Cc[0]); } }
  // la ventana oscura de arriba: una cortina que se mece y la luna en el cristal
  { R.recorte([176, 22, 198, 44]); for (let y = 22; y <= 44; y++) for (let x = 176; x <= 198; x++) R.pset(x, y, c_tono([hex('#1a1a30'), hex('#10101e')], (y - 22) / 22, x, y)); const cw = Math.round(6 + Math.sin(t * 0.9) * 2);
    for (let y = 22; y <= 44; y++) for (let x = 176; x < 176 + cw + Math.round(Math.sin(y * 0.4 + t) * 1); x++) R.pset(x, y, (x & 1) ? hex('#7a3a4a') : hex('#5a2a3a'));
    if (P.noche) { R.pset(192, 27, P.luna[1]); R.pset(193, 27, P.luna[1]); R.pset(192, 28, P.luna[2]); } R.recorte(null);
    R.rect(187, 22, 187, 44, M[3]); R.rect(176, 33, 198, 33, M[3]); }
  // la puerta: el interior con un pirata que pasa, la hoja abierta hacia dentro y la luz que cae en el porche
  c_interior(R, t, [112, 98, 136, 140], P, 20, 1);
  { const u = (t * 0.22) % 1; if (P.noche && u < 0.5) { R.recorte([112, 98, 136, 140]); c_pirataSombra(R, t, 108 + u * 64, 128, Cc[4], Cc[0], 2); R.recorte(null); } }
  R.rect(112, 98, 117, 140, M[1]); for (let y = 100; y < 140; y += 4) R.rect(112, y, 117, y, M[2]); R.rect(117, 98, 117, 140, M[3]); R.pset(115, 120, P.oro[1]);
  if (P.noche) { c_charco(R, 114, 136, 141, 179, 30, Cc[1], 0.36); c_charco(R, 26, 70, 141, 152, 14, Cc[2], 0.14); c_charco(R, 170, 214, 141, 152, 14, Cc[2], 0.14); }
  const f1 = c_farol(R, t, 100, 100, P, 4), f2 = c_farol(R, t, 148, 100, P, 5), f3 = c_farol(R, t, 292, 70, P, 6);
  if (P.noche) { for (const [fx, fy] of [f1, f2, f3]) c_luz(R, t, fx, fy, 26, P, fx); for (const [a, b] of [[48, 91], [192, 91]]) c_brillo(R, a, b, 34, Cc[2], 0.2); c_estela(R, t, 292, 112, 138, Cc[1], 6); }
  // el aviso del tablón que se levanta con la brisa, el loro de los barriles
  { const lev = Math.max(0, Math.sin(t * 1.3)) * 3; R.poligono([[88, 112], [97, 112], [97, 120 - lev], [88, 122]], P.noche ? hex('#c8bc98') : hex('#f0e4c0')); R.linea(97, 112, 97, 120 - lev, hex('#8a7a5a')); R.pset(92, 113, hex('#a83a3a')); }
  c_loro(R, t, 238, 104, P);
  return { suelo: 160, pies: [40, 250], puerta: [124, 140], ventanas: [[26, 76, 70, 106], [170, 76, 214, 106]], banco: [24, 140, 78], barriles: [222, 254, 140], horizonte: hor, porche: [0, 141, 319, 179], loro: [238, 104] };
}

// el primer plano fijo de la taberna de cerca
function c_tabernaFrente(R, P) {
  const M = P.madera, T = P.tabla, n = hex('#14121a');
  c_suelo(R, 140, 179, T, 3);
  // pilotes, cabos y el farol del muelle, a la derecha
  for (const px of [272, 308]) { R.rect(px, 122, px + 5, 140, T[2]); R.rect(px, 122, px + 1, 140, T[1]); R.rect(px - 1, 121, px + 6, 122, T[0]); R.rect(px - 1, 129, px + 6, 130, P.noche ? hex('#7a6a4a') : hex('#c8b080')); }
  for (let x = 278; x < 308; x++) R.pset(x, Math.round(126 + Math.sin((x - 278) / 30 * Math.PI) * 4), P.noche ? hex('#6a5a44') : hex('#b8a070'));
  R.rect(290, 66, 291, 140, P.metal[2]); R.rect(290, 66, 290, 140, P.metal[1]); R.rect(286, 136, 295, 140, P.metal[2]); R.rect(287, 66, 297, 67, P.metal[2]); R.pset(292, 68, n); R.pset(292, 69, n);
  // la pared: alero con canecillos, dos plantas de tablones, viga del forjado, poste de esquina
  c_tablones(R, 0, 12, 263, 139, M, 7, 5);
  for (let y = 12; y <= 139; y++) for (let x = 0; x <= 263; x++) if (c_dz(x, y) < (1 - (y - 12) / 127) * 0.28 + (x / 263) * 0.12) R.pset(x, y, c_mezcla(R.pget(x, y), M[3], 0.28));
  R.rect(0, 0, 268, 11, P.tejado[3]); for (let x = 4; x < 268; x += 14) { R.rect(x, 6, x + 4, 11, P.tejado[2]); R.rect(x, 6, x + 4, 6, P.tejado[1]); }
  R.rect(0, 11, 268, 12, M[3]);
  R.rect(0, 62, 263, 66, M[3]); R.rect(0, 62, 263, 62, M[1]); for (let x = 8; x < 263; x += 20) { R.rect(x, 63, x + 2, 65, M[2]); R.pset(x + 1, 64, P.metal[0]); }
  R.rect(258, 0, 265, 140, M[3]); R.rect(259, 0, 260, 140, M[1]); R.rect(264, 0, 265, 140, hex('#14121a'));
  R.rect(0, 136, 263, 140, M[3]); R.rect(0, 136, 263, 136, M[2]);
  // ventanas: marco, alféizar y contraventanas
  for (const [a, b, w, al] of [[26, 76, 44, 30], [170, 76, 44, 30], [40, 22, 22, 22], [176, 22, 22, 22]]) {
    R.rect(a - 3, b - 3, a + w + 3, b + al + 3, M[3]); R.rect(a - 2, b - 2, a + w + 2, b - 2, M[1]); R.rect(a - 2, b - 2, a - 2, b + al + 2, M[1]);
    R.rect(a - 5, b + al + 2, a + w + 5, b + al + 4, M[0]); R.rect(a - 5, b + al + 5, a + w + 5, b + al + 5, M[3]);
    for (const sx of [a - 13, a + w + 5]) for (let y = b - 2; y <= b + al + 1; y++) for (let x = sx; x <= sx + 8; x++) R.pset(x, y, x === sx || x === sx + 8 || y === b - 2 || y === b + al + 1 ? M[3] : ((y - b) % 3 === 0 ? M[3] : (y - b) % 3 === 1 ? M[0] : M[1]));
  }
  // flores en la jardinera de la ventana de arriba
  R.rect(36, 49, 66, 52, M[2]); R.rect(36, 49, 66, 49, M[1]); for (let x = 37; x < 66; x += 2) { R.pset(x, 48, P.hoja[1]); R.pset(x, 47 - (x % 3 === 0 ? 1 : 0), x % 4 === 1 ? P.flor[0] : x % 4 === 3 ? P.flor[2] : P.hoja[2]); }
  // la puerta: marco, el letrero grande, las ménsulas de los faroles y el escalón
  R.rect(108, 94, 140, 140, M[3]); R.rect(109, 95, 139, 96, M[1]); R.rect(109, 97, 110, 140, M[2]); R.rect(138, 97, 139, 140, M[2]);
  c_letrero(R, 102, 74, 38, 15, P); c_jarra(R, 114, 77, P, 2);
  for (const lx of [100, 148]) { R.rect(lx - (lx < 124 ? 0 : 5), 96, lx + (lx < 124 ? 5 : 0), 96, n); R.linea(lx, 97, lx + (lx < 124 ? 4 : -4), 101, n); }
  R.rect(106, 138, 142, 141, P.roca[1]); R.rect(106, 138, 142, 138, P.roca[0]);
  // decoración: un salvavidas y dos remos cruzados en el piso de arriba
  c_disco(R, 124, 34, 9, (x, y, d) => (d < 0.55 ? null : ((Math.atan2(y - 34, x - 124) + 7) % 1.57 < 0.4 ? hex('#e8e0d0') : hex('#c83a3a'))));
  for (const [a, b] of [[[98, 18], [150, 52]], [[150, 18], [98, 52]]]) { const re = P.noche ? [hex('#c8a87a'), hex('#8a6a4a'), hex('#2a1e1a')] : [hex('#f0d0a0'), hex('#c89a6a'), hex('#4a3020')]; R.linea(a[0], a[1] - 1, b[0], b[1] - 1, re[2]); R.linea(a[0], a[1], b[0], b[1], re[0]); R.linea(a[0], a[1] + 1, b[0], b[1] + 1, re[1]); R.linea(a[0], a[1] + 2, b[0], b[1] + 2, re[2]); for (const e of [a, b]) if (e[1] > 40) c_poli(R, [[e[0] - 3, e[1] - 4], [e[0] + 3, e[1] - 4], [e[0] + 2, e[1] + 4], [e[0] - 2, e[1] + 4]], re[1]); }
  // una red con corchos colgada junto a la ventana de arriba
  for (let y = 18; y < 50; y++) for (let x = 6; x < 30; x++) { const cy = 18 + Math.round(Math.sin((x - 6) / 24 * Math.PI) * 8); if (y < cy) continue; if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) R.pset(x, y, P.noche ? hex('#8a8a7a') : hex('#d0c8a8')); } for (const [x, y] of [[9, 30], [16, 36], [24, 32], [12, 44], [22, 46]]) c_disco(R, x, y, 1.6, P.franja[0]);
  c_disco(R, 124, 34, 9, (x, y, d) => (d < 0.55 || d > 1 ? null : ((Math.atan2(y - 34, x - 124) + 7) % 1.57 < 0.4 ? hex('#e8e0d0') : (y < 34 ? hex('#d84a4a') : hex('#a82a2a')))));
  // el tablón de avisos con pictogramas: una calavera, un barco y una moneda
  R.rect(78, 108, 100, 134, M[3]); R.rect(79, 109, 99, 133, P.noche ? hex('#5a4434') : hex('#a07850'));
  R.rect(80, 111, 87, 120, P.noche ? hex('#c8bc98') : hex('#f0e4c0')); c_disco(R, 83.5, 114.5, 2, hex('#2a2430')); R.pset(82, 114, hex('#e8e0d0')); R.pset(85, 114, hex('#e8e0d0')); R.linea(81, 118, 86, 118, hex('#2a2430'));
  R.rect(80, 123, 92, 132, P.noche ? hex('#c8bc98') : hex('#f0e4c0')); R.poligono([[81, 129], [91, 129], [89, 131], [83, 131]], hex('#5a3a2a')); R.linea(86, 124, 86, 129, hex('#5a3a2a')); R.poligono([[87, 125], [87, 128], [90, 128]], hex('#a83a3a'));
  c_disco(R, 95.5, 128.5, 2.6, P.oro[1]); R.pset(95, 128, P.oro[0]);
  // el banco con una jarra olvidada y los barriles con el loro
  R.rect(24, 128, 78, 130, M[1]); R.rect(24, 128, 78, 128, M[0]); R.rect(24, 131, 78, 131, M[3]); for (const lx of [27, 74]) R.rect(lx, 132, lx + 2, 140, M[2]);
  c_jarra(R, 60, 121, P, 1);
  c_barril(R, 230, 140, P, 7, 14, 17); c_barril(R, 246, 140, P, 8, 14, 17); c_barril(R, 238, 122, P, 9, 14, 17);
  // el primer término: un ancla apoyada a la izquierda y una caja de botellas a la derecha
  { const ax = 12, ay = 176, m = P.metal; R.rect(ax - 1, ay - 34, ax + 1, ay - 4, m[2]); R.rect(ax - 1, ay - 34, ax - 1, ay - 4, m[1]); c_disco(R, ax, ay - 37, 3, (x, y, d) => (d < 0.5 ? null : m[2])); R.rect(ax - 7, ay - 28, ax + 7, ay - 27, m[2]);
    for (let i = -10; i <= 10; i++) { const y = ay - 4 - Math.round(Math.sqrt(Math.max(0, 100 - i * i)) * 0.6) + 6; R.pset(ax + i, y, m[2]); R.pset(ax + i, y + 1, m[3]); } R.poligono([[ax - 12, ay - 4], [ax - 8, ay - 2], [ax - 10, ay - 8]], m[1]); R.poligono([[ax + 12, ay - 4], [ax + 8, ay - 2], [ax + 10, ay - 8]], m[2]); }
  c_caja(R, 290, 158, 318, 179, M, 9); for (let i = 0; i < 5; i++) { const bx = 293 + i * 5; R.rect(bx, 151, bx + 2, 157, [hex('#3a7a4a'), hex('#7a3a2a'), hex('#3a5a8a')][i % 3]); R.rect(bx + 1, 148, bx + 1, 150, hex('#3a2a20')); R.pset(bx, 152, hex('#e8f0e8')); }
}

// un loro posado (x, y = sus patas) que cabecea, abre las alas a ratos y parpadea
function c_loro(R, t, x, y, P) {
  const r = hex('#d83a3a'), rs = hex('#9a2a2a'), am = hex('#f0c840'), az = hex('#3a6ad8'), k = hex('#14121a'), bl = hex('#f2eee2'), cab = Math.round(Math.sin(t * 3) * 0.6), ala = (t % 5) > 4.4;
  R.rect(x - 2, y - 9, x + 2, y - 2, r); R.rect(x + 1, y - 8, x + 2, y - 3, rs); R.rect(x - 1, y - 1, x + 1, y + 1, az); R.pset(x - 2, y + 2, az); R.pset(x + 2, y + 2, az);
  R.rect(x - 2, y - 13 + cab, x + 2, y - 9 + cab, r); R.rect(x - 1, y - 12 + cab, x, y - 11 + cab, bl); R.pset(x - 1, y - 11 + cab, (t % 3) < 2.85 ? k : bl);
  R.rect(x - 4, y - 11 + cab, x - 3, y - 10 + cab, am); R.pset(x - 4, y - 9 + cab, k);
  if (ala) { R.linea(x + 2, y - 8, x + 7, y - 12, az); R.linea(x + 2, y - 7, x + 7, y - 9, am); R.linea(x + 2, y - 6, x + 6, y - 6, r); } else { R.rect(x + 1, y - 7, x + 3, y - 3, az); R.pset(x + 3, y - 3, am); }
  R.pset(x - 1, y - 1, am); R.pset(x + 1, y - 1, am);
}

// una copa de árbol de selva: racimos de hojas en cuatro tonos (sombra, cuerpo, luz del lado de la luna, brillo) con
// textura de hojitas; lado = 1 si la luz viene de la derecha
function c_copa(R, cx, cy, rx, ry, H, k = 0, lado = 1) {
  const n = Math.round(rx * ry / 50) + 5, B = [];
  for (let i = 0; i < n; i++) { const a = h(i, 1, 840 + k) * Math.PI * 2, rr = Math.sqrt(h(i, 2, 840 + k)); B.push([cx + Math.cos(a) * rx * rr * 0.72, cy + Math.sin(a) * ry * rr * 0.72, (0.3 + h(i, 3, 840 + k) * 0.22) * Math.min(rx, ry) * 1.15]); }
  B.sort((p, q) => p[1] - q[1]);
  for (const [bx, by, r] of B) c_disco(R, bx, by + 1.5, r, H[3]);
  for (const [bx, by, r] of B) { c_disco(R, bx, by, r * 0.9, (x, y) => (h(x >> 1, y, 842 + k) < 0.22 ? H[3] : H[2]));
    c_disco(R, bx + lado * r * 0.28, by - r * 0.3, r * 0.55, (x, y, d) => (h(x, y, 843 + k) < 0.25 ? H[2] : d > 0.7 && c_dz(x, y) < 0.5 ? H[2] : H[1]));
    if (by < cy) c_disco(R, bx + lado * r * 0.42, by - r * 0.48, r * 0.22, (x, y) => (c_dz(x, y) < 0.6 ? H[0] : null)); }
  for (let i = 0; i < n * 3; i++) { const x = Math.round(cx + (h(i, 5, 844 + k) - 0.5) * rx * 1.9), y = Math.round(cy + ry * 0.55 + h(i, 6, 844 + k) * ry * 0.5); if (Math.hypot((x - cx) / rx, (y - cy) / ry) < 1.05) { R.pset(x, y, H[3]); R.pset(x, y + 1, H[2]); } }
}

// un tronco de pie (x0–x1, de y0 a y1) con corteza de surcos, luz en el lado de la luna y musgo
function c_tronco(R, x0, x1, y0, y1, M, H, k = 0, lado = 1) {
  const w = x1 - x0;
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / Math.max(1, w), base = lado > 0 ? 0.85 - u * 0.75 : 0.1 + u * 0.75, surco = h(x, 1, 870 + k) < 0.3;
    for (let y = y0; y <= y1; y++) { const ond = Math.sin(y * 0.3 + x * 1.7 + k) > 0.6; let c = c_tono(M, Math.min(1, base + (surco || ond ? 0.3 : 0) + (h(x, y >> 2, 871 + k) - 0.5) * 0.15), x, y);
      if (h(x >> 1, y >> 2, 872 + k) < 0.07) c = H[2]; R.pset(x, y, c); } }
  R.rect(x0, y0, x0, y1, M[3]); R.rect(x1, y0, x1, y1, M[3]);
  for (let i = 0; i < 3; i++) { const x = x0 - 3 - i * 2 + (i % 2) * (w + 8 + i * 4), e = i % 2 ? 1 : -1; for (let j = 0; j < 6 + i * 2; j++) R.pset(x + j * -e * 0.0 + (i % 2 ? -j : j), y1 - Math.round(Math.sqrt(j) * 1.4), M[2]); }
}

// una palmera (pie en x, suelo), de alto px, con el tronco anillado que se curva, siete hojas que cuelgan con sus
// foliolos y los cocos; se mece con t
function c_palmera(R, t, x, suelo, alto, P, k = 0, curva = 1, H = P.hoja, M = P.madera) {
  const m = Math.sin(t * 1.1 + k) * 1.5, g = Math.max(1.2, alto / 22);
  let px = x, py = suelo;
  for (let i = 0; i <= alto; i++) { const u = i / alto; px = x + curva * u * u * alto * 0.2 + m * u * u; py = suelo - i; const w = g * (1.1 - u * 0.4);
    for (let j = Math.round(-w); j <= Math.round(w); j++) { const e = j / w; R.pset(Math.round(px + j), py, (i % 4 === 0 && Math.abs(e) < 0.95) ? M[3] : e < -0.3 ? M[0] : e < 0.4 ? M[1] : M[2]); } }
  const tx = Math.round(px), ty = py, Lb = Math.max(9, alto * 0.4);
  for (let f = 0; f < 8; f++) { const a = -Math.PI / 2 + (f - 3.5) * 0.47 + Math.sin(t * 1.4 + f + k) * 0.06, L = Lb * (0.8 + (f % 3) * 0.14), dx = Math.cos(a) >= 0 ? 1 : -1;
    for (let s = 0; s <= L; s++) { const u = s / L, fx = Math.round(tx + Math.cos(a) * s * 1.15), fy = Math.round(ty + Math.sin(a) * s * 0.7 + u * u * L * 0.62);
      R.pset(fx, fy, H[3]);
      if (s % 2 === 0 && s > 1) { const len = Math.max(1, Math.round((1 - Math.abs(u - 0.45) * 1.6) * Lb * 0.2)); for (let q = 1; q <= len; q++) R.pset(fx + Math.round(q * 0.35 * dx), fy + q, q === len ? H[2] : (u < 0.5 ? H[0] : H[1])); R.pset(fx, fy - 1, H[1]); } } }
  for (const [a, b] of [[-1, 2], [1, 2], [0, 3]]) c_disco(R, tx + a, ty + b, Math.max(1.2, g * 0.7), M[2]);
}

// luciérnagas que vagan y se encienden y apagan dentro de (x0, y0)–(x1, y1)
function c_luciernagas(R, t, x0, y0, x1, y1, n, k = 0) {
  for (let i = 0; i < n; i++) { const x = x0 + (h(i, 1, 880 + k) * (x1 - x0) + Math.sin(t * (0.4 + h(i, 2, 880 + k) * 0.5) + i) * 10 + 340) % (x1 - x0), y = y0 + h(i, 3, 880 + k) * (y1 - y0) + Math.sin(t * 0.9 + i * 2) * 5, b = Math.sin(t * (1.5 + h(i, 4, 880 + k)) + i * 1.9);
    if (b < 0) continue; const px = Math.round(x0 + x - x0), py = Math.round(y); R.pset(px, py, b > 0.6 ? hex('#f4ff9a') : hex('#b8e05a')); if (b > 0.7) for (const [a, c] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) c_mix(R, px + a, py + c, hex('#d8f070'), 0.45); }
}

// neblina baja que corre entre y0 e y1: bandas tramadas que aclaran lo que hay
function c_neblina(R, t, y0, y1, col, a = 0.25, k = 0, vel = 4) {
  for (let i = 0; i < 6; i++) { const w = 60 + h(i, 1, 890 + k) * 70, cx = ((h(i, 2, 890 + k) * 440 + t * vel * (0.6 + h(i, 3, 890 + k))) % 440) - 60, cy = y0 + h(i, 4, 890 + k) * (y1 - y0), ry = 2 + h(i, 5, 890 + k) * 3;
    for (let y = Math.round(cy - ry); y <= cy + ry; y++) for (let x = Math.round(cx - w / 2); x <= cx + w / 2; x++) { const g = (1 - Math.abs(x - cx) / (w / 2)) * (1 - Math.abs(y - cy) / (ry + 1)); if (g * a > c_dz(x, y) * 0.5 && x >= 0 && x < 320) c_mix(R, x, y, col, Math.min(0.5, g * a * 1.4)); } }
}

// el mapa del tesoro clavado (x0, y0)–(x1, y1): pergamino con bordes rotos, costa, camino de puntos, una X roja, la rosa
// de los vientos; la esquina de abajo se levanta con la brisa
function c_mapaClavado(R, t, x0, y0, x1, y1, P, daga = false) {
  const pa = P.noche ? [hex('#d8c89a'), hex('#b8a478'), hex('#8a7a58')] : [hex('#f4e4b4'), hex('#dcc890'), hex('#a8946a')], ti = hex('#5a3a2a'), w = x1 - x0, al = y1 - y0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if ((x === x0 || x === x1 || y === y0 || y === y1) && h(x, y, 900) < 0.4) continue; R.pset(x, y, c_tono(pa, 0.15 + h(x >> 1, y >> 1, 901) * 0.35 + (Math.abs(x - x0 - w / 2) / w) * 0.4, x, y)); }
  for (let i = 0; i < w * 0.7; i++) { const u = i / (w * 0.7), x = Math.round(x0 + 2 + u * (w * 0.45)), y = Math.round(y0 + 3 + Math.sin(u * 5) * 2 + u * al * 0.3); R.pset(x, y, P.noche ? hex('#5a7a8a') : hex('#4a8aa8')); }
  for (let i = 0; i < 9; i++) { const u = i / 8, x = Math.round(x0 + 3 + u * (w - 8)), y = Math.round(y1 - 4 - Math.sin(u * 3.5) * (al * 0.25) - u * al * 0.2); if (i % 2 === 0) R.pset(x, y, ti); }
  const ex = x1 - 5, ey = y0 + Math.round(al * 0.42), rj = hex('#c82a2a'); R.linea(ex - 2, ey - 2, ex + 2, ey + 2, rj); R.linea(ex - 2, ey + 2, ex + 2, ey - 2, rj);
  const rx = x0 + 4, ry = y1 - 5; R.pset(rx, ry - 2, ti); R.pset(rx, ry + 2, ti); R.pset(rx - 2, ry, ti); R.pset(rx + 2, ry, ti); R.pset(rx, ry, rj);
  const lev = Math.max(0, Math.sin(t * 1.5)) * 3; R.poligono([[x1 - 5, y1 + 1], [x1 + 1, y1 + 1], [x1 + 1, y1 - 5]], (x, y) => R.pget(x, y)); c_poli(R, [[x1 - 5, y1], [x1, y1 - 5], [x1 + Math.round(lev), y1 - Math.round(lev)]], pa[2]);
  if (daga) { const m = P.metal; R.rect(x0 + w / 2 - 1 | 0, y0 - 6, x0 + w / 2 + 1 | 0, y0 - 2, hex('#5a3a2a')); R.rect(x0 + w / 2 - 3 | 0, y0 - 2, x0 + w / 2 + 3 | 0, y0 - 1, P.oro[2]); R.rect(x0 + w / 2 | 0, y0, x0 + w / 2 | 0, y0 + 3, m[0]); }
  else for (const [a, b] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1]]) R.pset(a, b, P.metal[0]);
}

// un helecho (pie en x, y) de n hojas que se mecen con el viento
function c_helecho(R, t, x, y, n, L, H, k = 0) {
  for (let f = 0; f < n; f++) { const a = -Math.PI / 2 + (f - (n - 1) / 2) * 0.42 + Math.sin(t * 1.6 + f + k) * 0.08;
    for (let s = 0; s <= L; s++) { const u = s / L, fx = x + Math.cos(a) * s, fy = y + Math.sin(a) * s * 0.85 + u * u * L * 0.5; R.pset(Math.round(fx), Math.round(fy), H[2]);
      if (s % 2 === 1 && s < L - 1) { R.pset(Math.round(fx - 1), Math.round(fy + 1), H[1]); R.pset(Math.round(fx + 1), Math.round(fy + 1), H[u < 0.5 ? 1 : 0]); } } }
}

// una seta que brilla (x, y = pie), con su halo que late
function c_seta(R, t, x, y, k = 0) {
  const l = 0.5 + Math.sin(t * 2 + k) * 0.25;
  c_brillo(R, x, y - 3, 7, hex('#7af0d0'), l * 0.6);
  R.rect(x, y - 2, x, y, hex('#d8e8e0')); R.rect(x - 2, y - 4, x + 2, y - 3, hex('#4ad8b0')); R.rect(x - 1, y - 5, x + 1, y - 5, hex('#9af8e0')); R.pset(x - 1, y - 4, hex('#e8fff8'));
}

// un búho en una rama (x, y = patas) que parpadea y gira la cabeza
function c_buho(R, t, x, y, P) {
  const c = P.noche ? hex('#5a4a52') : hex('#8a6a4a'), cs = P.noche ? hex('#3a3038') : hex('#5a4430'), ol = hex('#f0c040'), k = hex('#14121a'), gira = Math.round(Math.sin(t * 0.7) * 1.2), par = (t % 3.4) < 0.15;
  R.rect(x - 3, y - 8, x + 3, y, c); R.rect(x - 2, y - 6, x + 2, y - 1, cs); for (let i = -2; i <= 2; i += 2) R.pset(x + i, y - 4, c);
  R.rect(x - 3 + gira, y - 13, x + 3 + gira, y - 8, c); R.pset(x - 3 + gira, y - 14, c); R.pset(x + 3 + gira, y - 14, c);
  for (const e of [-1.5, 1.5]) { const ex = Math.round(x + e + gira); if (par) R.pset(ex, y - 11, cs); else { R.pset(ex, y - 11, ol); R.pset(ex + (e > 0 ? 0 : 0), y - 11, ol); R.pset(ex, y - 11, ol); R.pset(ex + (gira >= 0 ? 0 : 0), y - 10, k); } }
  R.pset(x + gira, y - 9, P.oro[2]); R.pset(x - 1, y + 1, P.oro[2]); R.pset(x + 1, y + 1, P.oro[2]);
}

// el bosque general: cielo hasta 110 entre las copas, el claro del duelo (elipse en 168, 148), el camino, el mapa en el
// árbol de la izquierda (x 62–80), el poste con flechas (x 236)
function c_bosque(R, t, P, o) {
  const LX = 214, LY = 30, H = P.hoja;
  R.copiar(c_fijo(R, 'boF' + P.noche, () => { c_cielo(R, 112, P, 2); c_astro(R, LX, LY, 12, P); }));
  c_estrellas(R, t, 2, 66, 70, P, 2, [LX, LY, 12]);
  c_nubes(R, t, P, [[24, 0.6, 24, 2, 0], [50, 1.8, 30, 3, 1]], 2);
  c_aves(R, t, P, 2, 36, 60, 2);
  c_capa(R, c_fijo(R, 'boD' + P.noche, () => c_bosqueFijo(R, P)), 0, 179);
  c_neblina(R, t, 118, 136, P.noche ? hex('#8a9ac8') : hex('#e8f0f0'), 0.25, 1, 3);
  c_mapaClavado(R, t, 60, 94, 81, 110, P);
  for (const [x, y, k] of [[86, 132, 1], [92, 134, 2], [300, 172, 3], [258, 140, 4]]) c_seta(R, t, x, y, k);
  c_buho(R, t, 118, 66, P);
  c_helecho(R, t, 14, 179, 6, 18, H, 1); c_helecho(R, t, 34, 180, 5, 14, H, 2); c_helecho(R, t, 292, 180, 6, 18, H, 3); c_helecho(R, t, 270, 179, 4, 12, H, 4);
  if (P.noche) c_luciernagas(R, t, 30, 90, 300, 170, 16, 1);
  for (let i = 0; i < 3; i++) { const u = (t * 0.12 + i / 3) % 1, x = Math.round(40 + i * 90 + Math.sin(t * 2 + i) * 6), y = Math.round(30 + u * 140); R.pset(x, y, H[1]); R.pset(x + 1, y, H[2]); }
  return { suelo: 150, pies: [60, 260], claro: [168, 148, 92, 20], duelo: [126, 210], mapa: [70, 102], arbolMapa: [62, 80, 134], poste: [236, 136], camino: [[178, 179], [160, 150], [190, 120]], luna: P.noche ? [LX, LY] : null };
}

// lo fijo del bosque general
function c_bosqueFijo(R, P) {
  const H = P.hoja, L = P.lejos, Ti = P.tierra, M = P.madera, Hm = H.map((c) => c_mezcla(c, L[2], 0.5)), Hl = H.map((c) => c_mezcla(c, L[3], 0.72));
  // las cordilleras de selva lejana, con palmeras en silueta
  for (let x = 0; x < 320; x++) { const top = Math.round(66 + 6 * Math.sin(x * 0.045) + 3 * Math.sin(x * 0.17) + 2 * Math.sin(x * 0.53)); for (let y = top; y < 112; y++) R.pset(x, y, y === top ? L[3] : c_dz(x, y) < 0.3 ? L[3] : L[2]); }
  for (let i = 0; i < 12; i++) c_copa(R, i * 30 + 6, 92 + h(i, 1, 905) * 6, 20, 13, Hl, 20 + i, 1);
  for (let i = 0; i < 10; i++) c_copa(R, i * 36 + 14, 102 + h(i, 2, 905) * 6, 22, 14, Hm, 40 + i, 1);
  c_palmera(R, 0, 150, 112, 58, P, 3, 0.35, Hm, P.madera.map((c) => c_mezcla(c, L[2], 0.5))); c_palmera(R, 0, 192, 110, 50, P, 4, 0.5, Hm, P.madera.map((c) => c_mezcla(c, L[2], 0.5)));
  // el suelo: tierra con hojarasca, matas de hierba y raíces
  const SU = [Ti[3], H[3], Ti[2], H[2], Ti[1], H[1]];
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 108) / 72, bl = Math.sin(x * 0.06 + Math.sin(y * 0.15) * 2) * Math.sin(y * 0.21 + x * 0.013) * 0.18; R.pset(x, y, c_tono(SU, 0.12 + f * 0.42 + bl + (h(x >> 1, y, 906) - 0.5) * 0.2, x, y)); }
  for (let i = 0; i < 900; i++) { const x = Math.floor(h(i, 7, 906) * 320), y = 110 + Math.floor(h(i, 8, 906) ** 0.7 * 70), al = 2 + Math.floor(h(i, 9, 906) * (2 + (y - 110) / 20)); for (let j = 0; j < al; j++) R.pset(x + (j > 1 && i % 2 ? 1 : 0), y - j, j === al - 1 ? H[1] : H[2]); }
  // el claro, más claro, con hierba corta bañada por la luna
  const CX = 168, CY = 148, RX = 92, RY = 20;
  for (let y = CY - RY; y <= CY + RY; y++) for (let x = CX - RX; x <= CX + RX; x++) { const d = Math.hypot((x - CX) / RX, (y - CY) / RY); if (d > 1) continue; const g = (1 - d) * 1.4; if (g > c_dz(x, y) * 0.8) R.pset(x, y, c_tono([H[2], H[1], H[0]], g * 0.7 + (h(x, y, 907) - 0.5) * 0.3, x, y)); }
  // el camino de tierra batida que llega desde abajo, cruza el claro y se pierde al fondo
  for (let y = 112; y < 180; y++) { const u = (y - 112) / 68, cx = 182 - Math.sin(u * 3.2) * 26 - u * 10, w = 4 + u * 26; for (let x = Math.round(cx - w); x <= cx + w; x++) { const e = Math.abs(x - cx) / w; R.pset(x, y, e > 0.85 ? Ti[2] : c_tono([Ti[0], Ti[1]], 0.3 + h(x >> 1, y, 908) * 0.5 + e * 0.3, x, y)); if (h(x, y, 909) < 0.03) R.pset(x, y, P.roca[0]); } }
  for (let i = 0; i < 260; i++) { const x = Math.floor(h(i, 1, 910) * 320), y = 110 + Math.floor(h(i, 2, 910) ** 0.8 * 70), c = h(i, 3, 910); if (c < 0.5) { R.pset(x, y, H[2]); R.pset(x - 1, y - 1, H[2]); R.pset(x + 1, y - 1, H[1]); R.pset(x, y - 2, H[1]); } else if (c < 0.75) R.pset(x, y, P.noche ? hex('#6a4a5a') : hex('#a8783a')); else R.pset(x, y, Ti[3]); }
  // el sotobosque que tapa el pie de la selva del fondo: matas, helechos y hojas grandes
  for (let i = 0; i < 22; i++) { const x = i * 15 + h(i, 1, 919) * 8, y = 112 + h(i, 2, 919) * 6; c_copa(R, x, y, 9 + h(i, 3, 919) * 6, 6 + h(i, 4, 919) * 3, H, 120 + i, 1); }
  for (let i = 0; i < 12; i++) c_helecho(R, 0, 10 + i * 27 + h(i, 5, 919) * 10, 120 + h(i, 6, 919) * 4, 5, 10, H, i);
  // rayos de luna entre los árboles, que caen sobre el claro
  if (P.noche) for (const [x0, w] of [[226, 9], [208, 6], [244, 5]]) for (let y = 40; y < 160; y++) { const xs = Math.round(x0 - (y - 40) * 0.5); for (let x = xs; x < xs + w; x++) if (((x + y) & 1) === 0 && x >= 0 && R.pget(x, y)) c_mix(R, x, y, P.luna[2], 0.13 + (y > 128 ? 0.08 : 0)); }
  // árboles del medio: el del mapa (x 60–80), dos más y sus copas
  c_tronco(R, 102, 108, 70, 130, M, H, 2, 1); c_tronco(R, 248, 256, 64, 128, M, H, 3, -1);
  c_tronco(R, 60, 80, 46, 134, M, H, 1, 1);
  c_copa(R, 72, 42, 40, 22, H, 1, 1); c_copa(R, 108, 60, 22, 14, H, 2, 1); c_copa(R, 252, 56, 24, 14, H, 3, -1);
  R.rect(104, 66, 126, 67, M[2]); R.rect(104, 66, 126, 66, M[1]);
  // el poste con dos flechas (una calavera y un barco tallados)
  { const n = hex('#14121a'); R.rect(235, 106, 238, 136, M[2]); R.rect(235, 106, 235, 136, M[1]);
    R.poligono([[224, 109], [250, 109], [255, 112.5], [250, 116], [224, 116]], (x, y) => (y === 109 ? M[0] : y === 115 ? M[3] : M[1])); R.poligono([[222, 119.5], [227, 116], [250, 116], [250, 123], [227, 123]], (x, y) => (y === 116 ? M[0] : y === 122 ? M[3] : M[2]));
    R.rect(238, 111, 240, 113, n); R.pset(239, 114, n); R.poligono([[231, 121], [239, 121], [237, 122.5], [233, 122.5]], n); R.rect(235, 117, 235, 120, n); }
  // los troncos del primer término, que enmarcan: a la izquierda hasta arriba, a la derecha bajo su copa
  c_tronco(R, 0, 22, 0, 179, M, H, 4, 1); for (let x = 0; x < 34; x++) R.pset(x, 176 + Math.round(Math.sin(x * 0.3) * 2), M[3]);
  c_copa(R, 30, 6, 46, 18, H, 5, 1);
  c_tronco(R, 296, 319, 58, 179, M, H, 6, -1); c_copa(R, 300, 60, 34, 14, H, 7, -1);
  for (const [x, y] of [[40, 158], [110, 170], [210, 176], [262, 162]]) { c_disco(R, x, y, 4, (xx, yy) => (yy > y + 1 ? null : c_dz(xx, yy) < 0.5 ? P.roca[1] : P.roca[2])); R.pset(x - 1, y - 2, P.roca[0]); }
}

// el claro de cerca: suelo 118–179, el tronco gigante de la izquierda (x 0–46) con el mapa clavado, la pala y el cofre
// (x 74–100), el tronco caído (x 226–316)
function c_claro(R, t, P, o) {
  const LX = 186, LY = 26, H = P.hoja;
  R.copiar(c_fijo(R, 'clF' + P.noche, () => { c_cielo(R, 110, P, 4); c_astro(R, LX, LY, 12, P); }));
  c_estrellas(R, t, 2, 70, 60, P, 4, [LX, LY, 12]);
  c_nubes(R, t, P, [[22, 0.7, 26, 2, 0], [48, 2, 32, 3, 1]], 4);
  c_aves(R, t, P, 2, 34, 56, 4);
  c_capa(R, c_fijo(R, 'clD' + P.noche, () => c_claroFijo(R, P)), 0, 179);
  // las lianas que cuelgan y se mecen
  for (const [x, L, k] of [[78, 46, 1], [140, 34, 2], [214, 40, 3], [250, 28, 4]]) for (let i = 0; i < L; i++) { const px = Math.round(x + Math.sin(t * 1.1 + k + i * 0.08) * i * 0.08), py = 24 + i; R.pset(px, py, H[3]); if (i % 5 === 2) { R.pset(px + 1, py, H[1]); R.pset(px - 1, py + 1, H[2]); } }
  c_neblina(R, t, 128, 146, P.noche ? hex('#8a9ac8') : hex('#e8f0f0'), 0.3, 2, 3);
  c_mapaClavado(R, t, 14, 72, 44, 96, P, true);
  for (const [x, y, k] of [[236, 136, 1], [244, 135, 2], [300, 136, 3], [58, 172, 4]]) c_seta(R, t, x, y, k);
  c_rana(R, t, 276, 134, P);
  // el brillo del oro del cofre que asoma
  if (Math.sin(t * 2.4) > 0.5) { R.pset(93, 150, hex('#ffffff')); R.pset(92, 150, P.oro[0]); R.pset(94, 150, P.oro[0]); R.pset(93, 149, P.oro[0]); R.pset(93, 151, P.oro[0]); }
  c_helecho(R, t, 8, 180, 7, 22, H, 5); c_helecho(R, t, 312, 180, 7, 22, H, 6); c_helecho(R, t, 200, 181, 5, 12, H, 7);
  if (P.noche) c_luciernagas(R, t, 50, 70, 300, 170, 18, 2);
  return { suelo: 158, pies: [70, 250], claro: [168, 152, 120, 24], duelo: [110, 200], mapa: [29, 84], pala: [86, 140], cofre: [92, 152], tronco: [226, 134, 316, 154], luna: P.noche ? [LX, LY] : null };
}

// lo fijo del claro de cerca
function c_claroFijo(R, P) {
  const H = P.hoja, L = P.lejos, Ti = P.tierra, M = P.madera, Hm = H.map((c) => c_mezcla(c, L[2], 0.45));
  // la pared de selva del fondo: copas lejanas, hojas grandes y huecos de cielo
  for (let i = 0; i < 11; i++) c_copa(R, i * 32 + 4, 74 + h(i, 1, 912) * 10, 24, 18, Hm, 60 + i, 1);
  // (las de la derecha bajan o se apartan: detrás de Atom, x 278–318 y 4–44, solo queda cielo tramado con sus nubes)
  for (let i = 0; i < 9; i++) if (i !== 5) { const cx = i * 40 + 10 - (i === 6 ? 14 : 0), cy = cx >= 280 ? 70 + h(i, 2, 912) * 6 : 40 + h(i, 2, 912) * 12; c_copa(R, cx, cy, 26, 18, H, 70 + i, 1); }
  { const Mm = M.map((c) => c_mezcla(c, L[2], 0.4)); c_palmera(R, 0, 132, 112, 72, P, 11, 0.3, Hm, Mm); c_palmera(R, 0, 214, 110, 62, P, 12, -0.25, Hm, Mm); c_tronco(R, 270, 278, 50, 112, Mm, Hm, 13, -1); }
  for (let i = 0; i < 9; i++) c_copa(R, i * 38 + 18, 104 + h(i, 3, 912) * 8, 22, 14, H, 80 + i, 1);
  // las hojas grandes de platanera de delante de la pared
  for (const [x, y, d] of [[120, 116, 1], [196, 112, -1], [150, 120, -1]]) for (let s = 0; s < 22; s++) { const fx = x + d * s * 0.9, fy = y - s * 0.7 + (s * s) * 0.03; for (let j = -3; j <= 3; j++) R.pset(Math.round(fx), Math.round(fy + j * (1 - s / 26)), j < 0 ? H[1] : j === 0 ? H[3] : H[2]); }
  // el suelo del claro: hierba bañada por la luna, tierra en los bordes, hojarasca y piedras
  for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 168) / 130, (y - 152) / 30), g = 1 - d; R.pset(x, y, g > c_dz(x, y) * 0.4 ? c_tono([H[2], H[1], H[0]], g * 0.8 + (h(x, y, 913) - 0.5) * 0.35, x, y) : c_tono(Ti, 0.5 + (h(x >> 1, y, 914) - 0.5) * 0.4, x, y)); }
  for (let i = 0; i < 300; i++) { const x = Math.floor(h(i, 1, 915) * 320), y = 118 + Math.floor(h(i, 2, 915) * 62), c = h(i, 3, 915); if (c < 0.6) { R.pset(x, y, H[3]); R.pset(x - 1, y - 1, H[2]); R.pset(x + 1, y - 2, H[1]); R.pset(x, y - 2, H[2]); } else if (c < 0.8) R.pset(x, y, P.noche ? hex('#6a4a5a') : hex('#a8783a')); else { R.pset(x, y, P.roca[1]); R.pset(x + 1, y, P.roca[2]); } }
  for (let i = 0; i < 24; i++) { const x = i * 14 + h(i, 1, 922) * 8, y = 117 + h(i, 2, 922) * 5; c_copa(R, x, y, 8 + h(i, 3, 922) * 6, 5 + h(i, 4, 922) * 3, H, 140 + i, 1); }
  for (let i = 0; i < 14; i++) c_helecho(R, 0, 6 + i * 23 + h(i, 5, 922) * 10, 124 + h(i, 6, 922) * 4, 5, 10, H, i + 20);
  if (P.noche) for (const [x0, w] of [[196, 12], [178, 7], [222, 6]]) for (let y = 30; y < 170; y++) { const xs = Math.round(x0 - (y - 30) * 0.28); for (let x = xs; x < xs + w; x++) if (((x + y) & 1) === 0 && R.pget(x, y)) c_mix(R, x, y, P.luna[2], 0.12 + (y > 140 ? 0.08 : 0)); }
  // el montón de tierra con la pala hincada y el cofre que asoma
  const mon = (x0, x1, yb, al, sol) => { for (let x = x0; x <= x1; x++) { const u = (x - (x0 + x1) / 2) / ((x1 - x0) / 2), hh = Math.round(al * Math.sqrt(Math.max(0, 1 - u * u)) * (0.9 + h(x, 1, 919) * 0.2)); for (let y = yb - hh; y <= yb; y++) { if (sol && y < sol) continue; R.pset(x, y, y === yb - hh ? Ti[0] : c_tono([Ti[0], Ti[1], Ti[2], Ti[3]], 0.15 + (u + 1) * 0.3 + (y - yb + hh) / (al + 1) * 0.25 + (h(x, y, 920) < 0.12 ? 0.3 : 0), x, y)); } } };
  mon(66, 112, 160, 14);
  R.rect(80, 146, 100, 155, M[2]); R.rect(80, 146, 100, 147, M[1]); R.rect(81, 145, 99, 145, M[0]); R.rect(80, 150, 100, 150, P.oro[2]); R.rect(89, 149, 91, 152, P.oro[1]); R.pset(90, 151, hex('#14121a')); R.rect(80, 146, 80, 155, M[3]); R.rect(100, 146, 100, 155, M[3]); for (let x = 83; x < 98; x += 3) R.pset(x, 144, P.oro[1]);
  mon(70, 108, 162, 8);
  for (let i = 0; i < 14; i++) { const x = 64 + Math.floor(h(i, 1, 921) * 50), y = 158 + Math.floor(h(i, 2, 921) * 6); R.pset(x, y, Ti[1]); R.pset(x + 1, y, Ti[2]); }
  R.linea(72, 124, 80, 152, M[1]); R.linea(73, 124, 81, 152, M[2]); R.rect(70, 122, 75, 123, M[2]); R.poligono([[78, 148], [84, 148], [85, 158], [79, 158]], P.metal[1]); R.linea(84, 148, 85, 158, P.metal[2]);
  // el tronco gigante de la izquierda con sus raíces
  c_tronco(R, 0, 46, 0, 160, M, H, 8, 1);
  for (let r = 0; r < 4; r++) for (let i = 0; i < 26 + r * 6; i++) { const x = 30 + i, y = Math.round(158 - r * 4 + Math.sqrt(i) * (2 + r * 0.6)); R.rect(x - 1 - r * 4, y - 2, x - r * 4, y, i % 4 ? M[2] : M[3]); R.pset(x - r * 4, y - 2, M[1]); }
  c_copa(R, 30, 4, 50, 14, H, 9, 1);
  // el tronco caído a la derecha, con el corte de los anillos y musgo
  for (let x = 226; x <= 316; x++) for (let y = 134; y <= 154; y++) { const v = (y - 134) / 20; R.pset(x, y, c_tono(M, 0.15 + v * 0.75 + (h(x >> 2, y, 916) - 0.5) * 0.2, x, y)); if (h(x >> 3, y >> 1, 917) < 0.08) R.pset(x, y, M[3]); if (y < 137 && h(x, y, 918) < 0.5) R.pset(x, y, H[2]); }
  for (let y = 134; y <= 154; y++) for (let x = 220; x <= 232; x++) { const d = Math.hypot((x - 226) / 6, (y - 144) / 10); if (d <= 1) R.pset(x, y, d > 0.85 ? M[3] : (Math.round(d * 6) % 2 ? hex('#c8a070') : hex('#a88050'))); }
  c_disco(R, 226, 144, 1.2, M[3]);
  R.rect(226, 155, 316, 156, Ti[3]);
}

// una rana sobre el tronco (x, y = patas) que hincha el buche y salta de vez en cuando
function c_rana(R, t, x, y, P) {
  const v = P.noche ? hex('#4a8a5a') : hex('#5ac84a'), vs = P.noche ? hex('#2a5a3a') : hex('#3a8a2a'), u = t % 6, salto = u > 5.4 ? Math.round(Math.sin((u - 5.4) / 0.6 * Math.PI) * 6) : 0, buche = Math.sin(t * 5) > 0.3 && !salto;
  y -= salto; R.rect(x - 3, y - 3, x + 3, y - 1, v); R.rect(x - 2, y - 4, x + 2, y - 4, v); R.pset(x - 2, y - 5, v); R.pset(x + 2, y - 5, v); R.pset(x - 2, y - 5, hex('#f0e070')); R.pset(x + 2, y - 5, hex('#f0e070'));
  R.rect(x - 4, y, x - 2, y, vs); R.rect(x + 2, y, x + 4, y, vs); if (buche) { R.rect(x - 1, y - 2, x + 1, y, hex('#d8e8a0')); } else R.rect(x - 1, y - 1, x + 1, y - 1, vs);
}

// estuco envejecido en (x0, y0)–(x1, y1): manchas, hiladas tenues, grietas y desconchones que dejan ver el ladrillo;
// luz que baja de arriba a la izquierda (lu: cuánto oscurece hacia la derecha y abajo)
function c_estuco(R, x0, y0, x1, y1, P, k = 0, lu = 0.35) {
  const E = P.estuco, w = Math.max(1, x1 - x0), al = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x >> 2, y >> 2, 930 + k) * 0.5 + h(x >> 1, y >> 1, 931 + k) * 0.5; R.pset(x, y, c_tono(E, 0.12 + n * 0.32 + ((x - x0) / w * 0.6 + (y - y0) / al * 0.4) * lu + ((y - y0) % 12 === 0 ? 0.12 : 0), x, y)); }
  for (let i = 0; i < Math.round(w * al / 2600) + 1; i++) { let x = x0 + Math.floor(h(i, 1, 932 + k) * w), y = y0 + Math.floor(h(i, 2, 932 + k) * al); for (let s = 0; s < 10 + h(i, 3, 932 + k) * 12; s++) { R.pset(x, y, E[3]); x += h(i, s, 933 + k) < 0.5 ? 1 : 0; y += 1; if (y > y1 || x > x1) break; } }
  for (let i = 0; i < Math.round(w * al / 9000) + 1; i++) { const cx = x0 + 10 + Math.floor(h(i, 4, 934 + k) * (w - 20)), cy = y0 + 8 + Math.floor(h(i, 5, 934 + k) * (al - 16));
    for (let y = cy - 5; y <= cy + 5; y++) for (let x = cx - 8; x <= cx + 8; x++) { const dd = Math.hypot((x - cx) / 8, (y - cy) / 5); if (dd > 1 + (h(x, y, 935) - 0.5) * 0.35) continue; if (dd > 0.85) { R.pset(x, y, y < cy ? E[3] : E[0]); continue; } R.pset(x, y, (y - cy + 3) % 3 === 2 ? P.teja[3] : (((x + (((y - cy + 9) / 3) | 0) * 3) % 7) === 0 ? P.teja[3] : P.teja[1])); }
    }
}

// la mansión de la gobernadora en la colina: el mar lejos a la izquierda, la colina, la casa (x 146–260, base 108) con
// pórtico, la verja abierta abajo (pilares 124–132 y 188–196) y el camino de grava (152–179)
function c_colina(R, t, P, o) {
  const LX = 64, LY = 34, Cc = P.calido, H = P.hoja;
  R.copiar(c_fijo(R, 'coF' + P.noche, () => { c_cielo(R, 122, P, 5); c_astro(R, LX, LY, 13, P); }));
  c_estrellas(R, t, 2, 84, 80, P, 5, [LX, LY, 13]);
  c_nubes(R, t, P, [[22, 0.7, 28, 3, 0], [50, 2, 36, 3, 1], [70, 3.4, 26, 2, 2]], 5);
  c_aves(R, t, P, 3, 30, 64, 5);
  c_agua(R, t, 100, 124, P, LX, 0, 150, 5);
  c_capa(R, c_fijo(R, 'coD' + P.noche, () => c_colinaFijo(R, P)), 36, 179);
  // la bandera de la gobernadora en el frontón, que ondea
  { const fx = 203, fy = 34; R.rect(fx, fy, fx, 54, P.metal[1]); for (let i = 0; i < 10; i++) { const yo = Math.round(Math.sin(t * 5 - i * 0.7) * (i / 5)); for (let j = 0; j < 6; j++) R.pset(fx + 1 + i, fy + 1 + j + yo, j < 2 ? P.franja[0] : j < 4 ? hex('#e8e0d0') : P.franja[0]); } R.pset(fx, fy - 1, P.oro[1]); }
  // las ventanas: el ídolo dorado en la del piso alto, interiores cálidos, una sombra que pasa
  if (P.noche) for (const [x, y, k] of [[152, 88, 1], [230, 88, 2], [166, 70, 3]]) c_interior(R, t, [x, y, x + 8, y + 11], P, k + 20, 0);
  { const ix = 244, iy = 70; R.recorte([ix, iy, ix + 8, iy + 11]); for (let y = iy; y <= iy + 11; y++) for (let x = ix; x <= ix + 8; x++) R.pset(x, y, c_tono([P.oro[0], P.oro[1], P.oro[2]], 0.2 + Math.abs(x - ix - 4) / 8 + (y - iy) / 22, x, y));
    c_r(R, ix + 3, iy + 4, ix + 5, iy + 9, P.oro[3]); c_r(R, ix + 2, iy + 3, ix + 6, iy + 5, P.oro[3]); R.pset(ix + 3, iy + 4, hex('#e83a3a')); R.pset(ix + 5, iy + 4, hex('#e83a3a')); c_r(R, ix + 2, iy + 10, ix + 6, iy + 11, P.oro[3]); R.recorte(null);
    R.rect(ix + 4, iy, ix + 4, iy + 11, P.estuco[3]); c_brillo(R, ix + 4, iy + 6, 16 + Math.sin(t * 3) * 2, P.oro[1], 0.45); if (Math.sin(t * 2.3) > 0.4) { R.pset(ix + 6, iy + 2, hex('#ffffff')); R.pset(ix + 7, iy + 2, P.oro[0]); R.pset(ix + 6, iy + 1, P.oro[0]); } }
  if (P.noche) { for (const [x, y] of [[156, 94], [234, 94], [170, 76]]) c_brillo(R, x, y, 12, Cc[2], 0.28); c_charco(R, 198, 208, 108, 122, 8, Cc[1], 0.25); }
  // la fuente con su chorro, los faroles del jardín y de la verja
  { const fx = 96, fy = 116; for (let i = 0; i < 14; i++) { const u = ((t * 1.2 + i / 14) % 1), a = (i % 2 ? 1 : -1) * (0.5 + (i % 3) * 0.3), x = fx + a * u * 10, y = fy - 8 + u * u * 14 - u * 10; R.pset(Math.round(x), Math.round(y), u < 0.5 ? P.marL[1] : P.marL[0]); }
    R.rect(fx, fy - 14, fx, fy - 8, P.marL[1]); R.pset(fx, fy - 15 - Math.round(Math.abs(Math.sin(t * 6))), P.marL[2]);
    for (let x = fx - 13; x <= fx + 13; x++) if (Math.sin(x * 0.8 + t * 3) > 0.4) R.pset(x, fy + 6, P.marL[1]); }
  const lamps = [[128, 120], [192, 120], [140, 92], [262, 92]].map(([x, y], i) => c_farol(R, t, x, y, P, 10 + i));
  if (P.noche) for (const [x, y] of lamps) c_luz(R, t, x, y, 18, P, x);
  // las palmeras que se mecen junto a la casa y la gente pequeña: un guardia que pasea por el pórtico
  c_palmera(R, t, 128, 112, 54, P, 1, 0.3); c_palmera(R, t, 280, 114, 48, P, 2, -0.3);
  { const u = (t * 0.08) % 2, f = u < 1 ? u : 2 - u, gx = Math.round(186 + f * 36), gy = 108; R.rect(gx, gy - 7, gx + 1, gy, hex('#3a3a6a')); R.rect(gx, gy - 9, gx + 1, gy - 8, P.noche ? hex('#8a6a5a') : hex('#e0b090')); R.pset(gx + 2, gy - 9, P.metal[0]); R.rect(gx + 2, gy - 12, gx + 2, gy - 6, P.metal[1]); }
  if (P.noche) c_luciernagas(R, t, 20, 112, 300, 150, 10, 5);
  return { suelo: 168, pies: [40, 280], verja: [124, 196, 152], camino: [160, 152], casa: [146, 50, 260, 108], puerta: [203, 108], ventanaIdolo: [244, 70, 252, 81], fuente: [96, 116], luna: P.noche ? [LX, LY] : null };
}

// lo fijo de la colina
function c_colinaFijo(R, P) {
  const H = P.hoja, E = P.estuco, Tj = P.teja, M = P.madera, Ro = P.roca, Ve = P.noche ? [hex('#4a7a6a'), hex('#2e5a4e'), hex('#1e3e38')] : [hex('#5aa88a'), hex('#3a8a6a'), hex('#2a6a50')];
  // el pueblo en la orilla lejana, con el puerto: tejados y luces
  for (let i = 0; i < 9; i++) { const x = 10 + i * 12, y = 112 + (i % 3) * 2; R.rect(x, y - 5, x + 8, y, P.lejos[1]); R.poligono([[x - 1, y - 5], [x + 9, y - 5], [x + 4, y - 9]], P.lejos[0]); if (P.noche && i % 2) R.pset(x + 3, y - 3, P.calido[1]); }
  // la colina
  const top = (x) => Math.round(110 - 5 * Math.exp(-(((x - 205) / 110) ** 2)) + (x < 110 ? (110 - x) * 0.28 : 0) + Math.sin(x * 0.2) * 0.8);
  for (let x = 0; x < 320; x++) for (let y = top(x); y < 180; y++) { const f = (y - top(x)) / 70; R.pset(x, y, c_tono([H[0], H[1], H[2], H[3]], 0.25 + f * 0.5 + (x / 320) * 0.25 + (h(x >> 1, y, 940) - 0.5) * 0.25, x, y)); }
  for (let i = 0; i < 500; i++) { const x = Math.floor(h(i, 1, 941) * 320), y = 112 + Math.floor(h(i, 2, 941) * 40); if (y < top(x) + 1) continue; R.pset(x, y, H[3]); R.pset(x, y - 1, H[1]); }
  // el camino de piedra que sube en zigzag de la verja a la puerta
  const tramo = (ax, ay, bx, by, w) => { for (let y = ay; y >= by; y--) { const u = (ay - y) / Math.max(1, ay - by), cx = ax + (bx - ax) * u; for (let x = Math.round(cx - w); x <= cx + w; x++) R.pset(x, y, ((x + (y >> 1) * 3) % 5 === 0 || (y & 1) === 0 && h(x, y, 942) < 0.2) ? Ro[2] : c_tono([Ro[0], Ro[1]], 0.3 + h(x >> 1, y, 943) * 0.6, x, y)); } };
  tramo(160, 152, 120, 134, 7); tramo(120, 134, 180, 120, 5); tramo(180, 120, 203, 108, 4);
  // la casa: estuco, cornisa, zócalo, tejado de tejas a cuatro aguas y chimeneas
  c_estuco(R, 146, 66, 260, 108, P, 1, 0.35);
  R.rect(146, 84, 260, 86, E[0]); R.rect(146, 86, 260, 86, E[3]); R.rect(144, 104, 262, 108, Ro[1]); R.rect(144, 104, 262, 104, Ro[0]);
  for (let y = 46; y <= 67; y++) { const u = (y - 46) / 21, a = Math.round(166 - u * 24), b = Math.round(240 + u * 24); for (let x = a; x <= b; x++) { const r = (y - 46) % 3, off = ((((y - 46) / 3) | 0) & 1) * 2; R.pset(x, y, r === 2 ? Tj[3] : ((x + off) % 4 === 0 ? Tj[2] : r === 0 ? Tj[0] : Tj[1])); } }
  R.rect(140, 66, 266, 67, Tj[3]); R.rect(166, 45, 240, 46, Tj[0]);
  for (const cx of [170, 236]) { for (let y = 36; y <= 50; y++) for (let x = cx; x <= cx + 7; x++) R.pset(x, y, (y & 3) === 3 || ((x + ((y >> 2) & 1) * 2) & 3) === 0 ? Tj[3] : Tj[1]); R.rect(cx - 1, 35, cx + 8, 36, Ro[0]); }
  // el pórtico: frontón con un óculo, cuatro columnas y la puerta
  R.poligono([[182, 67], [224, 67], [203, 53]], (x, y) => c_tono(E, 0.15 + (y - 53) / 28 + (x - 182) / 120, x, y)); R.linea(182, 67, 203, 53, E[0]); R.linea(203, 53, 224, 67, E[3]); R.rect(182, 67, 224, 69, E[0]); R.rect(182, 69, 224, 69, E[3]);
  c_disco(R, 203, 62, 2.5, P.noche ? P.calido[2] : E[3]);
  R.rect(184, 70, 222, 104, E[3]); c_estuco(R, 185, 70, 221, 104, { ...P, estuco: [E[2], E[3], E[3], P.lejos[2]] }, 2, 0.2);
  for (const cx of [186, 195, 209, 218]) { R.rect(cx, 72, cx + 2, 103, E[1]); R.rect(cx, 72, cx, 103, E[0]); R.rect(cx + 2, 72, cx + 2, 103, E[2]); R.rect(cx - 1, 70, cx + 3, 71, E[0]); R.rect(cx - 1, 103, cx + 3, 104, E[0]); }
  R.rect(199, 88, 207, 104, M[3]); R.rect(200, 89, 206, 104, M[2]); R.rect(203, 89, 203, 104, M[3]); R.rect(199, 86, 207, 87, P.noche ? P.calido[1] : E[3]); R.pset(201, 97, P.oro[1]); R.pset(205, 97, P.oro[1]);
  // las ventanas con contraventanas verdes, alféizar y un balconcillo de hierro arriba
  for (const [x, y, alta] of [[152, 88, 0], [166, 88, 0], [230, 88, 0], [244, 88, 0], [152, 70, 1], [166, 70, 1], [230, 70, 1], [244, 70, 1]]) {
    R.rect(x - 1, y - 1, x + 9, y + 12, E[3]); R.rect(x, y, x + 8, y + 11, P.noche ? hex('#141a30') : hex('#2a3a50')); R.rect(x + 4, y, x + 4, y + 11, E[2]); R.rect(x, y + 5, x + 8, y + 5, E[2]);
    for (const sx of [x - 4, x + 10]) for (let yy = y; yy <= y + 11; yy++) R.pset(sx, yy, (yy & 1) ? Ve[0] : Ve[1]), R.pset(sx + 1, yy, (yy & 1) ? Ve[1] : Ve[2]);
    R.rect(x - 2, y + 12, x + 10, y + 13, E[0]);
    if (alta) { R.rect(x - 2, y + 9, x + 10, y + 9, hex('#1a1a22')); for (let i = x - 2; i <= x + 10; i += 2) R.rect(i, y + 9, i, y + 12, hex('#1a1a22')); }
  }
  // los setos recortados delante de la casa, con flores
  for (let i = 0; i < 9; i++) { const x = 150 + i * 13; if (x > 180 && x < 226) continue; c_disco(R, x, 108, 6, (xx, yy, d) => (yy > 110 ? null : c_tono([H[0], H[1], H[2], H[3]], 0.3 + d * 0.5 + (yy - 102) / 20, xx, yy))); if (i % 2) { R.pset(x - 2, 105, P.flor[0]); R.pset(x + 2, 104, P.flor[2]); } }
  // la fuente: el pilón de piedra con el agua, la columna y la taza
  { const fx = 96, fy = 116; for (let y = fy; y <= fy + 10; y++) for (let x = fx - 16; x <= fx + 16; x++) { const d = Math.hypot((x - fx) / 16, (y - fy - 5) / 5.5); if (d > 1) continue; R.pset(x, y, d > 0.78 ? (y < fy + 5 ? Ro[0] : Ro[2]) : c_tono(P.mar, 0.6 + (fy + 5 - y) * 0.05, x, y)); }
    R.rect(fx - 1, fy - 8, fx + 1, fy + 4, Ro[1]); R.rect(fx - 1, fy - 8, fx - 1, fy + 4, Ro[0]); R.rect(fx - 5, fy - 9, fx + 5, fy - 8, Ro[0]); R.rect(fx - 4, fy - 7, fx + 4, fy - 7, Ro[2]); }
  // el muro del jardín con la verja abierta, sus pilares y el camino de grava de delante
  for (let y = 140; y <= 152; y++) for (let x = 0; x < 320; x++) { if (x > 132 && x < 188) continue; const row = (y - 140) >> 2, off = (row & 1) * 5, j = (y - 140) & 3; R.pset(x, y, j === 3 || ((x + off) % 10 === 0) ? Ro[3] : c_tono([Ro[0], Ro[1], Ro[2]], 0.2 + h((x + off) / 10 | 0, row, 944) * 0.5 + (y - 140) / 26, x, y)); }
  R.rect(0, 138, 132, 139, Ro[0]); R.rect(188, 138, 319, 139, Ro[0]); R.rect(0, 140, 132, 140, Ro[2]); R.rect(188, 140, 319, 140, Ro[2]);
  for (const px of [124, 188]) { for (let y = 124; y <= 152; y++) for (let x = px; x <= px + 8; x++) R.pset(x, y, x === px ? Ro[0] : x === px + 8 ? Ro[3] : ((y - 124) % 6 === 5 ? Ro[3] : Ro[1])); R.rect(px - 1, 122, px + 9, 124, Ro[0]); c_disco(R, px + 4, 120, 2.5, Ro[1]); }
  const hi = hex('#16141e');
  for (const [a, b] of [[133, 150], [187, 170]]) { const d = b > a ? 1 : -1; for (let i = 0; i <= Math.abs(b - a); i += 3) { const x = a + i * d, y0 = 126 + Math.round(i * 0.25); R.rect(x, y0, x, 152 - Math.round(i * 0.1), hi); R.pset(x, y0 - 1, hi); } R.rect(Math.min(a, b), 128, Math.max(a, b), 128, hi); R.rect(Math.min(a, b), 146, Math.max(a, b), 146, hi); }
  for (let y = 153; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, c_tono([P.tierra[0], P.tierra[1], P.tierra[2]], 0.3 + h(x, y, 945) * 0.45 + (Math.abs(x - 160) < 30 && (x & 7) === 0 ? 0.3 : 0), x, y));
  R.rect(0, 153, 319, 153, P.tierra[3]);
  for (const ry of [161, 172]) for (let x = 0; x < 320; x++) { const y = ry + Math.round(Math.sin(x * 0.03 + ry) * 1.2); R.pset(x, y, P.tierra[3]); if ((x & 3) === 0) R.pset(x, y - 1, P.tierra[2]); }
  for (const [cx, cy, rx] of [[60, 166, 12], [250, 175, 15]]) for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / 2.5); if (d <= 1) R.pset(x, y, d > 0.75 ? P.tierra[3] : c_tono([P.cielo[2], P.cielo[4], P.cielo[5]], 0.3 + (x - cx + rx) / (2 * rx) * 0.6, x, y)); }
  for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 1, 947) * 320), y = 154 + Math.floor(h(i, 2, 947) * 4); R.pset(x, y, P.hoja[2]); R.pset(x, y - 1, P.hoja[1]); R.pset(x + 1, y - 2, P.hoja[1]); }
  for (let i = 0; i < 160; i++) { const x = Math.floor(h(i, 1, 946) * 320), y = 155 + Math.floor(h(i, 2, 946) * 24); R.pset(x, y, Ro[0]); R.pset(x + 1, y, Ro[2]); }
  for (const x of [16, 56, 96, 230, 270, 306]) { c_disco(R, x, 140, 7, (xx, yy, d) => (yy > 141 ? null : c_tono([H[0], H[1], H[2], H[3]], 0.35 + d * 0.5, xx, yy))); R.pset(x - 3, 136, P.flor[0]); R.pset(x + 2, 135, P.flor[2]); R.pset(x, 134, P.flor[1]); }
}

// la ventana del ídolo de cerca: muro de estuco hasta 140, zócalo 140–150, grava 151–179; el hueco 122–198 × 44–118 con
// el ídolo dentro (centro 160, 82); la caja para asomarse 146–174 × 136–158
function c_ventanaIdolo(R, t, P, o) {
  const Cc = P.calido, Or = P.oro, wx0 = 123, wy0 = 45, wx1 = 197, wy1 = 117;
  R.copiar(c_fijo(R, 'viF' + P.noche, () => c_ventanaFijo(R, P)));
  // dentro: papel pintado, friso, el cuadro, el candelabro con velas, el pedestal con el ídolo y el cordón de terciopelo
  R.recorte([wx0, wy0, wx1, wy1]);
  const fl = Math.sin(t * 9) * 0.04 + Math.sin(t * 21) * 0.03;
  for (let y = wy0; y <= wy1; y++) for (let x = wx0; x <= wx1; x++) { const pat = ((x + (((y / 6) | 0) & 1) * 4) % 8 === 0 && y % 6 === 3) || ((x % 8 === 4) && ((y + 3) % 12 === 0)); R.pset(x, y, y > 100 ? c_tono([hex('#7a4a30'), hex('#5a3420'), hex('#3a2014')], 0.3 + (y - 100) / 30 + ((x & 7) === 0 ? 0.3 : 0), x, y) : pat ? Or[2] : c_tono([hex('#b8443a'), hex('#8a2e2c'), hex('#5a1e22')], 0.2 + Math.abs(x - 160) / 80 + (y - wy0) / 140 - fl, x, y)); }
  c_r(R, wx0, 100, wx1, 101, Or[2]);
  c_r(R, 130, 54, 148, 70, Or[2]); c_r(R, 131, 55, 147, 69, Or[3]); c_r(R, 132, 56, 146, 68, hex('#4a7ab8')); c_r(R, 132, 63, 146, 68, hex('#2a5a8a')); c_disco(R, 141, 61, 2.4, hex('#f8d070')); c_r(R, 132, 66, 137, 68, hex('#c8a060')); R.pset(136, 64, hex('#3a6a3a')); R.pset(135, 65, hex('#3a6a3a'));
  for (const sx of [180, 136]) { c_r(R, sx - 4, 76, sx + 4, 77, Or[2]); c_r(R, sx, 78, sx, 84, Or[2]); for (const vx of [sx - 4, sx, sx + 4]) { c_r(R, vx, 72, vx, 75, hex('#f2eee2')); const f = Math.floor(t * 10 + vx) % 3; R.pset(vx + (f === 2 ? 1 : 0), 70 + (f === 1 ? 1 : 0), Cc[1]); R.pset(vx, 71, Cc[0]); } }
  c_r(R, 152, 96, 168, 98, hex('#e8e4dc')); c_r(R, 154, 99, 166, 117, hex('#d4ccc0')); c_r(R, 154, 99, 155, 117, hex('#f2eee6')); c_r(R, 165, 99, 166, 117, hex('#a8a090')); for (let y = 101; y < 117; y += 4) R.pset(160, y, hex('#b8b0a0'));
  const lat = 0.6 + Math.sin(t * 2.6) * 0.25; c_brillo(R, 160, 84, 26, Or[1], 0.5 * lat);
  c_idolo(R, t, 160, 95, P);
  for (const px of [142, 178]) { c_r(R, px, 104, px + 1, 117, Or[2]); c_r(R, px - 1, 103, px + 2, 103, Or[1]); }
  for (let x = 143; x < 178; x++) R.pset(x, 106 + Math.round(Math.sin((x - 143) / 35 * Math.PI) * 4), hex('#a82a3a'));
  // las cortinas de terciopelo, que se mecen con la brisa
  for (const [a, d] of [[wx0, 1], [wx1, -1]]) for (let y = wy0; y <= wy1; y++) { const w = 9 + Math.round(Math.sin(y * 0.08 + t * 1.2) * 1.5 * (y - wy0) / 70) + (y > 100 ? Math.round((y - 100) * 0.12) : 0); for (let i = 0; i < w; i++) R.pset(a + i * d, y, (i + Math.round(Math.sin(y * 0.1) * 1)) % 4 === 0 ? hex('#4a1a2a') : i % 4 === 1 ? hex('#a83a4a') : hex('#7a2a3a')); }
  R.recorte(null);
  // las hojas de las ventanas abiertas hacia dentro, con reflejos, y la luz que cae sobre el alféizar y las matas
  for (const [a, b] of [[123, 129], [191, 197]]) { R.rect(a, wy0, b, wy1, hex('#2a2430')); R.rect(a + 1, wy0 + 2, b - 1, wy1 - 2, P.noche ? hex('#3a4a6a') : hex('#7aa0c8')); for (let y = wy0 + 2; y < wy1; y += 12) R.rect(a, y, b, y, hex('#2a2430')); R.linea(a + 1, wy0 + 14, b - 1, wy0 + 8, hex('#c8d8f0')); }
  if (P.noche) { c_charco(R, 128, 192, 124, 160, 26, Cc[1], 0.22); c_brillo(R, 160, 80, 70, Cc[2], 0.14); }
  // el farol de la pared, las polillas y la buganvilla que se mece; la palmera de delante
  const fa = c_farol(R, t, 258, 62, P, 30); if (P.noche) { c_luz(R, t, fa[0], fa[1], 30, P, 30); for (let i = 0; i < 3; i++) { const a = t * (2.5 + i) + i * 2; R.pset(Math.round(fa[0] + Math.cos(a) * (5 + i * 2)), Math.round(fa[1] + Math.sin(a * 1.3) * (4 + i)), hex('#e8e0c8')); } }
  for (let i = 0; i < 26; i++) { const x = Math.round(226 + h(i, 1, 950) * 26 + Math.sin(t * 1.4 + i) * 0.8), y = Math.round(22 + h(i, 2, 950) * 116); R.pset(x, y, P.flor[i % 3 === 0 ? 1 : 0]); R.pset(x + 1, y, P.flor[0]); R.pset(x, y + 1, P.hoja[1]); }
  c_palmera(R, t, 22, 182, 124, P, 7, 0.35);
  return { suelo: 166, pies: [60, 250], ventana: [wx0, wy0, wx1, wy1], alfeizar: 118, idolo: [160, 82], caja: [146, 136, 174, 158], farol: [258, 66] };
}

// el ídolo dorado (pie en x, y): una figurilla rechoncha de cabeza grande, ojos de rubí y brillos que giran
function c_idolo(R, t, x, y, P) {
  const O = P.oro, k = O[3];
  c_r(R, x - 6, y - 3, x + 6, y, O[2]); c_r(R, x - 6, y - 3, x + 6, y - 3, O[1]);
  c_r(R, x - 4, y - 10, x + 4, y - 4, O[1]); c_r(R, x - 4, y - 10, x - 3, y - 4, O[0]); c_r(R, x + 3, y - 10, x + 4, y - 4, O[2]); R.pset(x - 5, y - 8, O[1]); R.pset(x + 5, y - 8, O[2]); R.pset(x - 6, y - 7, O[1]); R.pset(x + 6, y - 7, O[2]);
  c_r(R, x - 5, y - 20, x + 5, y - 11, O[1]); c_r(R, x - 5, y - 20, x - 4, y - 11, O[0]); c_r(R, x + 4, y - 20, x + 5, y - 11, O[2]); c_r(R, x - 3, y - 22, x + 3, y - 21, O[1]); R.pset(x, y - 23, O[0]);
  R.pset(x - 2, y - 16, hex('#e8203a')); R.pset(x + 2, y - 16, hex('#e8203a')); R.pset(x - 2, y - 17, hex('#ff8a9a')); c_r(R, x - 2, y - 13, x + 2, y - 13, k); R.pset(x - 3, y - 14, k); R.pset(x + 3, y - 14, k);
  for (let i = 0; i < 3; i++) { const a = t * 1.8 + i * 2.1, sx = Math.round(x + Math.cos(a) * 9), sy = Math.round(y - 12 + Math.sin(a) * 7), b = Math.sin(t * 6 + i * 2) > 0; if (!b) continue; R.pset(sx, sy, hex('#ffffff')); R.pset(sx - 1, sy, O[0]); R.pset(sx + 1, sy, O[0]); R.pset(sx, sy - 1, O[0]); R.pset(sx, sy + 1, O[0]); }
}

// lo fijo de la ventana del ídolo: el muro, la cornisa, el marco de piedra, las contraventanas, el zócalo, las matas, la
// grava y la caja
function c_ventanaFijo(R, P) {
  const E = P.estuco, Ro = P.roca, H = P.hoja, Ve = P.noche ? [hex('#4a7a6a'), hex('#2e5a4e'), hex('#1e3e38')] : [hex('#5aa88a'), hex('#3a8a6a'), hex('#2a6a50')];
  c_estuco(R, 0, 0, 319, 140, P, 3, 0.3);
  R.rect(0, 0, 319, 6, E[2]); R.rect(0, 7, 319, 8, E[3]); for (let x = 2; x < 320; x += 10) R.rect(x, 3, x + 5, 5, E[3]);
  for (const px of [72, 258]) { R.rect(px, 9, px + 12, 140, E[1]); R.rect(px, 9, px + 1, 140, E[0]); R.rect(px + 11, 9, px + 12, 140, E[3]); for (let y = 20; y < 140; y += 22) R.rect(px, y, px + 12, y, E[2]); }
  // el marco de piedra con su clave, el alféizar con su sombra
  R.rect(115, 37, 205, 123, E[0]); R.rect(117, 39, 203, 121, E[1]); R.rect(203, 39, 205, 123, E[3]); R.rect(121, 43, 199, 119, hex('#2a2430'));
  R.poligono([[153, 30], [167, 30], [164, 42], [156, 42]], E[0]); R.linea(167, 30, 164, 42, E[3]); R.rect(153, 30, 167, 30, hex('#ffffff'));
  R.rect(110, 118, 210, 123, E[0]); R.rect(110, 118, 210, 118, hex('#ffffff')); R.rect(110, 123, 210, 123, E[3]); for (let x = 112; x < 210; x++) R.pset(x, 124, c_mezcla(R.pget(x, 124), hex('#000000'), 0.4)), R.pset(x, 125, c_mezcla(R.pget(x, 125), hex('#000000'), 0.2));
  // las contraventanas de lamas, abiertas contra la pared
  for (const sx of [94, 206]) { R.rect(sx, 40, sx + 19, 120, Ve[2]); for (let y = 42; y < 119; y++) for (let x = sx + 2; x < sx + 18; x++) R.pset(x, y, (y % 3 === 0) ? Ve[2] : (y % 3 === 1) ? Ve[0] : Ve[1]); R.rect(sx + 2, 79, sx + 17, 81, Ve[1]); R.rect(sx, 40, sx + 19, 41, Ve[0]); R.pset(sx === 94 ? sx + 19 : sx, 60, P.metal[0]); R.pset(sx === 94 ? sx + 19 : sx, 100, P.metal[0]); }
  // el zócalo de piedra y la grava
  for (let y = 140; y <= 151; y++) for (let x = 0; x < 320; x++) { const row = (y - 140) / 6 | 0, off = (row & 1) * 9, j = (y - 140) % 6; R.pset(x, y, j === 5 || (x + off) % 18 === 0 ? Ro[3] : c_tono([Ro[0], Ro[1], Ro[2]], 0.25 + h((x + off) / 18 | 0, row, 951) * 0.5 + j * 0.06, x, y)); }
  R.rect(0, 140, 319, 140, Ro[0]);
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, c_tono([P.tierra[0], P.tierra[1], P.tierra[2]], 0.25 + h(x, y, 952) * 0.5 + (y - 152) / 80, x, y));
  for (let i = 0; i < 220; i++) { const x = Math.floor(h(i, 1, 953) * 320), y = 153 + Math.floor(h(i, 2, 953) * 27); R.pset(x, y, Ro[0]); R.pset(x + 1, y, Ro[2]); }
  // las matas con flores delante del zócalo, dejando sitio a la caja
  for (const [x, w] of [[96, 40], [214, 34], [290, 30]]) for (let i = 0; i < w / 6; i++) { const cx = x - w / 2 + i * 6 + 3; c_disco(R, cx, 150, 6, (xx, yy, d) => (yy > 154 ? null : c_tono([H[0], H[1], H[2], H[3]], 0.3 + d * 0.5 + (h(xx, yy, 954) - 0.5) * 0.3, xx, yy))); R.pset(cx - 2, 146, P.flor[0]); R.pset(cx + 1, 145, P.flor[2]); R.pset(cx + 3, 148, P.flor[0]); }
  // la buganvilla: el tallo que trepa por la pared
  for (let y = 24; y < 150; y++) { const x = Math.round(238 + Math.sin(y * 0.09) * 8); R.pset(x, y, P.madera[2]); if (y % 7 === 0) R.linea(x, y, x + (y % 14 ? 5 : -5), y - 3, P.madera[2]); if (y % 3 === 0) { R.pset(x + 2, y, H[2]); R.pset(x - 2, y + 1, H[1]); } }
  // la caja para asomarse
  c_caja(R, 146, 136, 174, 158, P.madera, 20);
  for (let x = 146; x <= 176; x++) R.pset(x, 159, c_mezcla(R.pget(x, 159), hex('#000000'), 0.4));
}

// los tonos del agua de abajo según la luz (de la superficie a lo hondo) y los de la arena, las algas y los corales
function c_palMar(P) {
  const m = (a) => a.map(hex);
  return P.noche ? { agua: m(['#3a7aa8', '#2a6094', '#1e4a7c', '#163a66', '#0e2a50', '#0a1e3c']), arena: m(['#a8a088', '#8a8270', '#6a6458', '#4a4640']), rayo: hex('#a8d8e8'),
    alga: m(['#6aa86a', '#4a8a5a', '#2e6a4a', '#1e4a3a']), coral: m(['#e87a8a', '#c85a6a', '#8a3a5a']), coral2: m(['#e8b85a', '#c8903a', '#8a5a2a']), roca: m(['#5a6a88', '#46546e', '#323e56', '#222a3e']), lejos: hex('#183a62'), lejos2: hex('#123052') }
    : { agua: m(['#5ac8e0', '#3aa8d0', '#2a88bc', '#1e6aa4', '#164e88', '#103a6c']), arena: m(['#f0dca8', '#d8c08a', '#b8a070', '#8a7854']), rayo: hex('#e8fbff'),
      alga: m(['#8ad86a', '#5ab85a', '#3a904a', '#26683a']), coral: m(['#ff8a9a', '#e8607a', '#a83a5a']), coral2: m(['#ffd06a', '#e8a840', '#a86a2a']), roca: m(['#7a90a8', '#5e7290', '#465670', '#2e3a50']), lejos: hex('#2a78a8'), lejos2: hex('#20669a') };
}

// un alga larga (pie en x, y) de L px que ondula con la corriente, con sus hojas alternas
function c_alga(R, t, x, y, L, A, k = 0, ancho = 1) {
  let px = x;
  for (let i = 0; i < L; i++) { const u = i / L; px = x + Math.sin(t * 1.3 + i * 0.12 + k) * u * 6 + Math.sin(i * 0.3 + k) * 1.2; const py = y - i;
    for (let j = 0; j < ancho; j++) R.pset(Math.round(px) + j, py, j === 0 ? A[1] : A[2]);
    if (i % 4 === 2) { const d = (i >> 2) & 1 ? 1 : -1; R.pset(Math.round(px) + d * 2, py, A[0]); R.pset(Math.round(px) + d, py, A[1]); R.pset(Math.round(px) + d * 3, py + 1, A[1]); } }
}

// un pez (x, y, dir) de largo L con aleta que se mueve
function c_pez(R, t, x, y, d, L, c1, c2, k = 0) {
  x = Math.round(x); y = Math.round(y);
  for (let i = 0; i < L; i++) { const hh = Math.round(Math.sin((i + 0.5) / L * Math.PI) * L * 0.28); for (let j = -hh; j <= hh; j++) R.pset(x - i * d, y + j, j < 0 ? c1 : c2); }
  const co = Math.floor(t * 8 + k) % 2; R.pset(x - L * d, y - 1 - co, c2); R.pset(x - L * d, y + 1 + (1 - co), c2); R.pset(x - L * d - d, y - 2 + co, c1); R.pset(x - L * d - d, y + 2 - co, c1);
  R.pset(x - Math.round(L * 0.25) * d, y - (L > 5 ? 1 : 0), hex('#101018'));
}

// un ancla (centro del arganeo en x, y; escala s) con su cepo, la caña, los brazos y las uñas; la cadena sube hasta y = 0
function c_ancla(R, t, x, y, s, P, k = 0, lean = 0) {
  const m = P.metal, S = (v) => Math.round(v * s);
  for (let i = 0, yy = y - S(4); yy > -6; i++, yy -= S(4)) { const ox = Math.round(Math.sin(yy * 0.05 + t * 0.6 + k) * (y - yy) * 0.03 - (y - yy) * lean); if (i % 2) { R.rect(x + ox - S(1), yy - S(3), x + ox + S(1), yy, m[2]); R.rect(x + ox - S(1), yy - S(3), x + ox - S(1), yy, m[1]); } else { R.rect(x + ox - S(2), yy - S(3), x + ox + S(2), yy, m[2]); R.rect(x + ox - S(1), yy - S(2), x + ox + S(1), yy - S(1), m[3]); R.rect(x + ox - S(2), yy - S(3), x + ox + S(2), yy - S(3), m[1]); } }
  c_disco(R, x, y, S(3.2), (xx, yy, d) => (d < 0.5 ? null : d > 0.85 || xx > x ? m[2] : m[1]));
  R.rect(x - S(2), y + S(3), x + S(2), y + S(40), m[2]); R.rect(x - S(2), y + S(3), x - S(1), y + S(40), m[1]); R.rect(x + S(2), y + S(3), x + S(2), y + S(40), m[3]);
  R.rect(x - S(14), y + S(7), x + S(14), y + S(9), m[2]); R.rect(x - S(14), y + S(7), x + S(14), y + S(7), m[0]); c_disco(R, x - S(14), y + S(8), S(1.8), m[1]); c_disco(R, x + S(14), y + S(8), S(1.8), m[2]);
  for (let i = -S(18); i <= S(18); i++) { const u = i / S(18), yy = y + S(40) - Math.round((1 - Math.sqrt(Math.max(0, 1 - u * u))) * S(14)); R.rect(x + i, yy - S(1.5), x + i, yy + S(1.5), i < 0 ? m[1] : m[2]); R.pset(x + i, yy + S(1.5) + 1, m[3]); }
  for (const d of [-1, 1]) R.poligono([[x + d * S(18), y + S(26)], [x + d * S(23), y + S(22)], [x + d * S(20), y + S(31)]], d < 0 ? m[1] : m[2]);
  for (let i = 0; i < 8; i++) R.pset(x - S(2) + Math.floor(h(i, 1, 960 + k) * S(4)), y + S(6) + Math.floor(h(i, 2, 960 + k) * S(30)), hex('#a86a3a'));
}

// burbujas que suben desde (x, y), meciéndose, n a la vez
function c_burbujas(R, t, x, y, n, alto, k = 0, col = hex('#e8f8ff')) {
  for (let i = 0; i < n; i++) { const u = (t * (0.25 + h(i, 1, 970 + k) * 0.2) + i / n) % 1, by = y - u * alto, bx = x + Math.sin(t * 3 + i * 2 + u * 8) * 2 + (h(i, 2, 970 + k) - 0.5) * 6, r = 0.8 + u * 1.6;
    if (r < 1.3) R.pset(Math.round(bx), Math.round(by), col); else { c_disco(R, bx, by, r, (xx, yy, d) => (d > 0.6 ? col : null)); R.pset(Math.round(bx - r * 0.4), Math.round(by - r * 0.4), hex('#ffffff')); } }
}

// el fondo del mar: el agua tramada con la superficie arriba, rayos de luz que se mecen, cáusticas en la arena, algas,
// corales, peces, burbujas, un cangrejo; general (pecio al fondo, ancla en x 52) o cerca (ancla grande, roca con corales y
// una morena que asoma). La arena empieza en 140 (general) o en 128 (cerca)
function c_fondoMar(R, t, P, o, cerca) {
  const W = c_palMar(P), are = cerca ? 128 : 140;
  R.copiar(c_fijo(R, 'fm' + cerca + P.noche, () => c_fondoMarFijo(R, P, W, cerca, are)));
  // la superficie que ondula, vista desde abajo
  for (let x = 0; x < 320; x++) { const y = Math.round(2 + Math.sin(x * 0.12 + t * 1.6) * 1.2 + Math.sin(x * 0.31 - t * 2.3) * 0.8); if (x > 272) { R.pset(x, Math.min(y, 3), W.agua[0]); continue; } R.pset(x, y, W.rayo); R.pset(x, y + 1, W.agua[0]); if (Math.sin(x * 0.5 + t * 3) > 0.7) R.pset(x, y + 2, W.rayo); }
  // los rayos de luz que bajan en diagonal y se mecen
  for (let i = 0; i < 6; i++) { const x0 = 20 + i * 56 + Math.sin(t * 0.4 + i * 1.7) * 10, w = 8 + (i % 3) * 5, a = 0.16 + Math.sin(t * 0.7 + i) * 0.05;
    for (let y = 4; y < are + 20; y++) { const xs = Math.round(x0 + y * 0.32), fade = 1 - y / (are + 30); for (let x = xs; x < xs + w * (0.6 + y / 200); x++) if (((x + y) & 1) === 0 && x >= 0 && x < 320 && !(x > 274 && y < 48)) c_mix(R, x, y, W.rayo, a * fade); } }
  // las cáusticas que bailan sobre la arena
  for (let y = are + 2; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.28 + t * 1.7 + Math.sin(y * 0.45 + t)) * Math.sin(y * 0.6 - t * 1.3 + Math.sin(x * 0.17 - t * 0.8)); if (v > 0.62) c_mix(R, x, y, W.rayo, 0.32); }
  // las algas, los peces y las burbujas
  const algas = cerca ? [[6, 179, 110, 1, 2], [70, 180, 84, 2, 1], [298, 180, 120, 3, 2], [310, 180, 90, 4, 1], [226, 150, 46, 5, 1], [108, 146, 40, 6, 1]] : [[18, 172, 78, 1, 2], [96, 150, 50, 2, 1], [104, 152, 36, 3, 1], [176, 146, 44, 4, 1], [258, 156, 64, 5, 2], [300, 174, 90, 6, 2], [134, 160, 30, 7, 1]];
  for (const [x, y, L, k, a] of algas) c_alga(R, t, x, y, L, W.alga, k, a);
  for (let i = 0; i < 12; i++) { const u = (t * 0.05 + h(i, 1, 975)) % 1.4, x = 340 - u * 380 + Math.sin(i) * 6, y = 50 + Math.sin(t * 1.4 + i * 0.6) * 4 + (i % 4) * 5 + (i >> 2) * 3; if (x > 268 && y < 50) continue; c_pez(R, t, x, y, -1, 4, hex('#f0d050'), hex('#e8803a'), i); }
  for (let i = 0; i < 3; i++) { const u = (t * (0.035 + i * 0.01) + h(i, 2, 975)) % 1.5, x = -30 + u * 380, y = (cerca ? 70 : 92) + i * 16 + Math.sin(t + i) * 3; c_pez(R, t, x, y, 1, cerca ? 10 : 7, i === 1 ? hex('#8ad0f0') : hex('#c8c8e0'), i === 1 ? hex('#3a7ac8') : hex('#8a8aa8'), i); }
  { const jx = 236 + Math.sin(t * 0.3) * 8, jy = 62 + Math.sin(t * 0.8) * 6, p = (Math.sin(t * 2.4) + 1) / 2; c_disco(R, jx, jy, 5 + p, (x, y) => (y > jy + 1 ? null : c_dz(x, y) < 0.7 ? hex('#e8b8f0') : hex('#b878d8'))); for (let i = -3; i <= 3; i += 2) for (let j = 0; j < 7 + (i & 3); j++) R.pset(Math.round(jx + i + Math.sin(t * 2 + j * 0.6 + i) * 1), Math.round(jy + 2 + j * (1.2 - p * 0.3)), hex('#c890e0')); }
  const anc = cerca ? [36, 64] : [44, 108];
  c_burbujas(R, t, anc[0], cerca ? 150 : 148, 4, 120, 1); c_burbujas(R, t, 196, are + 6, 3, 110, 2); c_burbujas(R, t, cerca ? 262 : 246, are + 2, 3, 90, 3);
  c_cangrejo(R, t, cerca ? 120 + Math.sin(t * 0.5) * 26 : 210 + Math.sin(t * 0.5) * 30, cerca ? 172 : 170, cerca ? 1.4 : 1);
  if (cerca) { const sale = Math.max(0, Math.sin(t * 0.7)); const mx = 262, my = 128; for (let i = 0; i < 4 + sale * 8; i++) { const x = mx - i, y = my + Math.round(Math.sin(i * 0.6 + t * 2) * 1); R.rect(x, y - 2, x, y + 2, hex('#7a8a3a')); R.pset(x, y + 2, hex('#a8b85a')); } const hx = Math.round(mx - 4 - sale * 8); R.rect(hx - 3, 126, hx + 1, 130, hex('#7a8a3a')); R.pset(hx - 2, 127, (t % 3) < 2.85 ? hex('#f0f0c0') : hex('#7a8a3a')); R.pset(hx - 3, 130, hex('#3a3a1a')); }
  return { suelo: cerca ? 160 : 160, pies: cerca ? [96, 220] : [96, 230], arena: are, ancla: anc, superficie: 3, pecio: cerca ? null : [210, 92, 300, 142] };
}

// un cangrejo (x, y = patas, escala s) que anda de lado y abre y cierra las pinzas
function c_cangrejo(R, t, x, y, s = 1) {
  const r = hex('#e85a3a'), rs = hex('#a83a2a'), k = hex('#101018'), S = (v) => Math.round(v * s), p = Math.floor(t * 6) % 2, pz = Math.sin(t * 3) > 0;
  x = Math.round(x); R.rect(x - S(4), y - S(4), x + S(4), y - S(1), r); R.rect(x - S(4), y - S(1), x + S(4), y - S(1), rs);
  for (const d of [-1, 1]) { for (let i = 0; i < 3; i++) { const lx = x + d * S(3 + i * 1.5); R.pset(lx, y - (i + p) % 2, rs); R.pset(lx + d, y, rs); }
    R.rect(x + d * S(5), y - S(7), x + d * S(6), y - S(5), r); R.pset(x + d * S(6) + (pz ? d : 0), y - S(8), r); R.pset(x + d * S(5), y - S(8), r); }
  R.rect(x - S(2), y - S(6), x - S(2), y - S(4), r); R.rect(x + S(2), y - S(6), x + S(2), y - S(4), r); R.pset(x - S(2), y - S(6), k); R.pset(x + S(2), y - S(6), k);
}

// lo fijo del fondo del mar
function c_fondoMarFijo(R, P, W, cerca, are) {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, c_tono(W.agua, y / 175 + (h(x >> 3, y >> 2, 961) - 0.5) * 0.06 + Math.sin(x * 0.02 + y * 0.05) * 0.03, x, y));
  // las rocas y arrecifes lejanos, en dos capas que se pierden en el azul
  for (let x = 0; x < 320; x++) { const t1 = Math.round(are - 26 - 16 * Math.exp(-(((x - 70) / 40) ** 2)) - 22 * Math.exp(-(((x - 250) / 50) ** 2)) - Math.sin(x * 0.2) * 3); for (let y = t1; y < are + 4; y++) R.pset(x, y, c_dz(x, y) < 0.15 ? W.lejos2 : W.lejos); }
  if (!cerca) {
    // el pecio: un casco hundido y escorado, con el mástil roto y algas
    R.poligono([[206, 132], [222, 106], [292, 98], [300, 112], [290, 140], [214, 144]], (x, y) => c_tono([W.roca[1], W.roca[2], W.roca[3]], 0.3 + (y - 98) / 60 + ((x + y) % 5 === 0 ? 0.2 : 0), x, y));
    for (let i = 0; i < 8; i++) { const x = 226 + i * 9; R.linea(x, 106 - i, x - 6, 140, W.roca[3]); }
    for (const [x, y] of [[236, 118], [256, 116], [276, 112]]) { R.rect(x, y, x + 4, y + 4, W.roca[3]); R.rect(x + 1, y + 1, x + 3, y + 3, hex('#0a1428')); }
    R.linea(262, 101, 238, 50, W.roca[2]); R.linea(263, 101, 239, 50, W.roca[1]); R.linea(244, 62, 232, 66, W.roca[2]);
    for (let i = 0; i < 20; i++) { const x = 210 + Math.floor(h(i, 1, 962) * 88), y = 100 + Math.floor(h(i, 2, 962) * 40); R.pset(x, y, W.alga[2]); R.pset(x, y + 1, W.alga[3]); }
  }
  // la arena con sus ondas, conchas, estrellas y piedras
  for (let y = are; y < 180; y++) for (let x = 0; x < 320; x++) { const rip = Math.sin(x * 0.18 + Math.sin(y * 0.4) * 2 + y * 0.9); R.pset(x, y, c_tono(W.arena, 0.15 + (y - are) / 110 + (rip > 0.75 ? -0.15 : rip < -0.6 ? 0.18 : 0) + (h(x, y, 963) - 0.5) * 0.12, x, y)); }
  for (let x = 0; x < 320; x++) R.pset(x, are, W.arena[0]);
  for (let i = 0; i < 30; i++) { const x = Math.floor(h(i, 1, 964) * 316), y = are + 4 + Math.floor(h(i, 2, 964) * (176 - are)), c = h(i, 3, 964);
    if (c < 0.4) { R.rect(x, y, x + 2, y + 1, W.arena[0]); R.pset(x + 1, y, hex('#ffffff')); } else if (c < 0.6) { const e = hex('#e86a3a'); R.pset(x, y, e); R.pset(x - 1, y, e); R.pset(x + 1, y, e); R.pset(x, y - 1, e); R.pset(x - 1, y + 1, e); R.pset(x + 1, y + 1, e); } else { c_disco(R, x, y, 2, (xx, yy) => (yy > y + 1 ? null : c_dz(xx, yy) < 0.5 ? W.roca[1] : W.roca[2])); } }
  // los corales y las rocas con anémonas
  const coral = (x, y, alto, C3, k) => { for (let r = 0; r < 4; r++) { let px = x, py = y; const dx = (r - 1.5) * 0.5; for (let i = 0; i < alto; i++) { px += dx * 0.4 + (h(i, r, 965 + k) - 0.5) * 0.8; py -= 1; R.pset(Math.round(px), py, i > alto - 3 ? C3[0] : C3[1]); R.pset(Math.round(px) + 1, py, C3[2]); } } };
  const roca = (cx, cy, rx, ry, k) => { for (let y = cy - ry; y <= cy + ry * 0.4; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1 + (h(x >> 1, y >> 1, 966 + k) - 0.5) * 0.25) continue; R.pset(x, y, c_tono(W.roca, 0.1 + (y - cy + ry) / (ry * 1.8) * 0.6 + (x - cx) / rx * 0.15 + (h(x, y, 967 + k) < 0.12 ? 0.3 : 0), x, y)); } };
  if (cerca) {
    roca(282, 142, 44, 40, 1); roca(250, 156, 22, 14, 2);
    coral(252, 108, 18, W.coral, 1); coral(296, 106, 14, W.coral2, 2); coral(272, 142, 10, W.coral, 3);
    c_disco(R, 300, 128, 9, (x, y, d) => ((x + y * 2) % 4 < 2 ? W.coral2[1] : W.coral2[2]));
    for (let i = 0; i < 9; i++) { const x = 288 + i * 3, y = 110 + (i % 2); R.linea(x, y, x + Math.round(Math.sin(i) * 2), y - 8, W.coral[0]); }
    R.rect(258, 124, 268, 132, hex('#0a1428')); c_disco(R, 263, 128, 5, hex('#0a1428'));
    R.rect(128, 150, 134, 156, hex('#3a7a5a')); R.rect(130, 146, 132, 149, hex('#3a7a5a')); R.pset(129, 151, hex('#a8e8c8'));
    c_ancla(R, 0, 36, 64, 1.5, P, 1, 0.62);
  } else {
    roca(150, 142, 26, 14, 3); roca(20, 152, 24, 12, 4); roca(290, 150, 30, 16, 5);
    coral(140, 132, 14, W.coral, 4); coral(158, 134, 10, W.coral2, 5); coral(282, 136, 16, W.coral, 6); coral(16, 142, 12, W.coral2, 7);
    c_disco(R, 300, 140, 6, (x, y) => ((x + y * 2) % 4 < 2 ? W.coral2[1] : W.coral2[2]));
    c_ancla(R, 0, 44, 108, 1, P, 2, 0.42);
    { R.rect(90, 162, 104, 172, P.madera[2]); R.rect(90, 162, 104, 163, P.madera[1]); R.rect(90, 166, 104, 166, P.metal[2]); R.rect(96, 160, 98, 164, P.oro[2]); }
  }
}

// la paleta fantasmal (derivada de la de la noche): el cielo y el mar teñidos de verde, la madera y las velas del barco
// fantasma
function c_palFantasma(P) {
  if (P._f) return P._f;
  const V = P.verdeF[4], m = (a) => a.map(hex);
  return (P._f = { ...P, cielo: P.cielo.map((c, i) => c_mezcla(c, V, 0.1 + i * 0.07)), mar: P.mar.map((c, i) => c_mezcla(c, V, 0.2 + i * 0.04)), marL: [c_mezcla(P.marL[0], V, 0.4), P.verdeF[2], P.verdeF[1]],
    nube: P.nube.map((c, i) => c_mezcla(c, V, 0.15 + i * 0.06)), halo: [c_mezcla(P.halo[0], V, 0.5), c_mezcla(P.halo[1], P.verdeF[3], 0.5), P.verdeF[2]],
    fMadera: m(['#8ad0aa', '#56a084', '#326a5c', '#1c403a']), fTela: m(['#d8fce6', '#9aecc0', '#64c09a', '#3a8a6e']), fFranja: m(['#3a8a72', '#286456']), fCuerda: hex('#2a7a5e'), fGente: hex('#c8fcdc') });
}

// niebla verde: bancos tramados que corren despacio entre y0 e y1 (a: densidad)
function c_nieblaVerde(R, t, y0, y1, P, a = 0.4, k = 0, vel = 3, n = 7) {
  const c1 = P.verdeF[2], c2 = P.verdeF[1];
  for (let i = 0; i < n; i++) { const w = 50 + h(i, 1, 990 + k) * 80, cx = ((h(i, 2, 990 + k) * 460 + t * vel * (0.5 + h(i, 3, 990 + k))) % 460) - 70, cy = y0 + h(i, 4, 990 + k) * (y1 - y0), ry = 3 + h(i, 5, 990 + k) * 6;
    for (let y = Math.round(cy - ry); y <= cy + ry; y++) { if (y < 0 || y > 179) continue; for (let x = Math.max(0, Math.round(cx - w / 2)); x <= Math.min(319, cx + w / 2); x++) { if (x > 272 && y < 48) continue; const g = Math.max(0, 1 - Math.hypot((x - cx) / (w / 2), (y - cy) / ry)) * a; if (g > c_dz(x, y) * 0.55) c_mix(R, x, y, g > 0.35 ? c2 : c1, Math.min(0.55, g * 1.1)); } } }
}

// chispas verdes (almas) que suben despacio y titilan
function c_almas(R, t, x0, y0, x1, y1, n, P, k = 0) {
  for (let i = 0; i < n; i++) { const u = (t * (0.08 + h(i, 1, 995 + k) * 0.06) + h(i, 2, 995 + k)) % 1, x = Math.round(x0 + h(i, 3, 995 + k) * (x1 - x0) + Math.sin(t * 1.5 + i) * 3), y = Math.round(y1 - u * (y1 - y0));
    if (x > 272 && y < 48) continue; if (Math.sin(t * 4 + i * 2) > -0.3) { R.pset(x, y, P.verdeF[0]); c_mix(R, x - 1, y, P.verdeF[2], 0.5); c_mix(R, x + 1, y, P.verdeF[2], 0.5); c_mix(R, x, y + 1, P.verdeF[2], 0.4); } }
}

// el barco fantasma en la niebla: horizonte en 112, el barco con su flotación en 130 (x 110–240), la orilla de rocas de
// 150 a 179 con la repisa plana donde se plantan los personajes (suelo 168)
function c_fantasmal(R, t, P0, o) {
  const P = c_palFantasma(c_pal('noche')), hor = 112, LX = 72, LY = 34, wl = 130 + c_bob(t, 186);
  R.copiar(c_fijo(R, 'gfF', () => { c_cielo(R, hor, P, 6); c_astro(R, LX, LY, 12, P); }));
  c_estrellas(R, t, 2, 70, 50, P, 6, [LX, LY, 12]);
  c_nubes(R, t, P, [[60, 0.5, 30, 3, 0], [82, 1.4, 38, 3, 1]], 6);   // (por debajo de la zona de Atom)
  c_aves(R, t, P, 2, 40, 70, 6);
  c_agua(R, t, hor, 152, P, LX, 0, 319, 6);
  c_nieblaVerde(R, t, 86, 124, P, 0.45, 1, 2.5, 8);
  // el barco: translúcido, con su parpadeo, las velas rotas que brillan y la tripulación de fantasmas
  const al = 0.7 + Math.sin(t * 1.7) * 0.07 + (Math.sin(t * 13) > 0.95 ? -0.12 : 0);
  const g = c_conReflejo(R, t, [100, 10, 250, wl], wl, 16, () => c_galeon(R, 186, wl, t, 1.15, P, { dir: -1, velas: 'rotas', fantasma: true, madera: P.fMadera, tela: P.fTela, franja: P.fFranja, cuerda: P.fCuerda, gente: P.fGente, cara: P.verdeF[0], bandera: hex('#0e2a24'), tripulacion: 4 }), { alfa: al, reflejo: 0.5 });
  c_brillo(R, 180, 84, 80, P.verdeF[3], 0.16, 60);
  for (const [x, y] of g.luces) { c_brillo(R, x, y, 8, P.verdeF[1], 0.5); R.pset(x, y, P.verdeF[0]); }
  c_estela(R, t, g.popa[0], wl + 2, 150, P.verdeF[2], 2);
  // un fantasma pequeño que sube y baja por la jarcia
  { const u = (Math.sin(t * 0.6) + 1) / 2, fx = Math.round(200 - u * 14), fy = Math.round(wl - 30 - u * 40); c_mix(R, fx, fy, P.verdeF[0], 0.8); c_mix(R, fx + 1, fy, P.verdeF[0], 0.8); c_mix(R, fx, fy + 1, P.verdeF[1], 0.7); c_mix(R, fx + 1, fy + 1, P.verdeF[1], 0.7); c_mix(R, fx, fy + 2, P.verdeF[2], 0.6); c_mix(R, fx + 1, fy + 3, P.verdeF[2], 0.5); }
  c_nieblaVerde(R, t, 118, 150, P, 0.5, 2, 4, 7);
  // la orilla de rocas de delante
  c_capa(R, c_fijo(R, 'gfD', () => c_orillaFija(R, P)), 120, 179);
  // la espuma que rompe contra las rocas y las almas que suben
  for (let i = 0; i < 9; i++) { const x = 6 + i * 36 + Math.round(h(i, 1, 996) * 10), u = (t * 0.7 + h(i, 2, 996)) % 1; if (u < 0.4) for (let j = 0; j < 5; j++) R.pset(x + j - 2, 149 - Math.round(Math.sin(u / 0.4 * Math.PI) * (2 + (j % 3))), j % 2 ? hex('#d8f8e8') : hex('#9ad8c0')); }
  c_almas(R, t, 20, 40, 300, 150, 16, P, 1);
  c_nieblaVerde(R, t, 160, 178, P, 0.3, 3, 5, 5);
  const fa = c_farol(R, t, 268, 140, P, 40, true); c_luz(R, t, fa[0], fa[1], 18, P, 40, true);
  return { suelo: 168, pies: [40, 236], barco: [186, wl], borda: g.borda, horizonte: hor, orilla: [0, 154, 319, 179], farol: [268, 144] };
}
// lo fijo de la orilla: rocas con su cara iluminada por el barco (verde) y por la luna, algas, charcas y un bote roto
function c_orillaFija(R, P) {
  const Ro = P.roca, V = P.verdeF;
  const pied = (cx, cy, rx, ry, k) => { for (let y = Math.round(cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = Math.round(cx - rx); x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1 + (h(x >> 1, y >> 1, 997 + k) - 0.5) * 0.3 && y < cy) continue; if (Math.abs(x - cx) > rx * (1 + (h(y >> 1, 1, 998 + k) - 0.5) * 0.2)) continue;
    let f = 0.2 + (y - cy + ry) / (ry * 3) + (h(x >> 1, y >> 1, 999 + k) - 0.5) * 0.25; if (y < cy - ry * 0.6) f -= 0.2; let c = c_tono(Ro, f, x, y); if (x > cx + rx * 0.45 && y < cy + 4 && c_dz(x, y) < 0.5) c = c_mezcla(c, V[2], 0.35); R.pset(x, y, c); } };
  // la repisa de roca plana donde se plantan los personajes, con grietas, charcas y algas
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 154 + Math.round(Math.sin(x * 0.07) * 2)) continue; R.pset(x, y, c_tono([Ro[0], Ro[1], Ro[2], Ro[3]], 0.15 + (y - 152) / 45 + (h(x >> 2, y >> 1, 1000) - 0.5) * 0.35, x, y)); }
  for (let x = 0; x < 320; x++) { const y = 154 + Math.round(Math.sin(x * 0.07) * 2); R.pset(x, y, c_mezcla(Ro[0], V[1], x > 120 && x < 260 ? 0.35 : 0)); R.pset(x, y + 1, Ro[0]); }
  for (let i = 0; i < 9; i++) { let x = 20 + Math.floor(h(i, 1, 1003) * 280), y = 158 + Math.floor(h(i, 2, 1003) * 8); for (let s = 0; s < 10 + i % 5; s++) { R.pset(x, y, Ro[3]); R.pset(x, y - 1, Ro[0]); x += h(i, s, 1004) < 0.5 ? 1 : -1; y += 1; if (y > 179) break; } }
  for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 1, 1002) * 320), y = 154 + Math.floor(h(i, 2, 1002) * 8); R.pset(x, y, hex('#2a5a3a')); R.pset(x, y + 1, hex('#3a7a4a')); R.pset(x + 1, y + 1, hex('#1e4a30')); }
  for (const [cx, cy, rx] of [[150, 172, 14], [56, 174, 10], [222, 168, 8]]) for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / 2.6); if (d <= 1) R.pset(x, y, d > 0.75 ? Ro[3] : c_tono([P.mar[3], P.mar[5], V[3]], 0.3 + (x - cx + rx) / (2 * rx) * 0.6, x, y)); }
  // los peñascos de los lados y del fondo, con la cara que da al barco teñida de verde
  pied(14, 150, 24, 22, 1); pied(304, 148, 26, 24, 4); pied(240, 152, 16, 8, 3); pied(96, 154, 12, 6, 2);
  for (const [x0, x1] of [[0, 34], [282, 319]]) for (let i = 0; i < 12; i++) { const x = x0 + Math.floor(h(i, x0, 1005) * (x1 - x0)), y = 130 + Math.floor(h(i, 3, 1005) * 22); R.pset(x, y, hex('#3a7a4a')); R.pset(x, y + 1, hex('#2a5a3a')); }
  // el bote roto varado a la derecha
  { const M = P.madera; R.poligono([[248, 156], [300, 152], [296, 162], [254, 164]], (x, y) => (y < 155 ? M[0] : (x + y) % 6 === 0 ? M[3] : M[2])); for (let x = 258; x < 296; x += 7) R.rect(x, 150, x + 1, 156, M[1]); R.rect(276, 156, 284, 158, hex('#0a1418')); R.linea(300, 152, 312, 146, M[2]); }
  // el poste del farol verde
  R.rect(266, 138, 267, 160, P.madera[2]); R.rect(266, 138, 272, 139, P.madera[2]);
}

// la cubierta del barco fantasma: horizonte en 86, la borda de 96 a 128, las tablas de 128 a 179; el timón en (232, 114),
// el mástil a la izquierda (x 6–16) con la vela rota arriba, la escotilla que brilla en (160, 154)
function c_cubierta(R, t, P0, o) {
  const P = c_palFantasma(c_pal('noche')), hor = 86, LX = 196, LY = 30, V = P.verdeF;
  R.copiar(c_fijo(R, 'gcF', () => { c_cielo(R, 96, P, 7); c_astro(R, LX, LY, 11, P); }));
  c_estrellas(R, t, 2, 70, 50, P, 7, [LX, LY, 11]);
  c_nubes(R, t, P, [[26, 0.6, 28, 3, 0], [56, 1.8, 34, 3, 1]], 7);
  c_agua(R, t, hor, 96, P, LX, 0, 319, 7);
  c_nieblaVerde(R, t, 60, 96, P, 0.5, 4, 3, 7);
  // lo fijo del barco, translúcido: se ve el mar a través
  { const b = c_fijo(R, 'gcD', () => c_cubiertaFija(R, P)), d = R.buf, a = 0.82 + Math.sin(t * 1.3) * 0.06;
    for (let i = 0; i < 320 * 180; i++) { const v = b[i]; if (v) d[i] = i > 320 * 128 ? v : c_mezcla(d[i], v, a); } }
  // la vela rota que brilla y ondea, con dos fantasmas sentados en la verga
  for (let y = 23; y < 76; y++) { const w = Math.round(110 + (y - 23) * 0.2); for (let x = 18; x < 18 + w; x++) { if (h(x >> 1, (y + (x & 3)) >> 3, 1010) < 0.06) continue; const bot = 70 + Math.round(Math.sin(x * 0.15) * 3) - Math.floor(h(x, 3, 1011) * 6); if (y > bot) continue; const f = 0.15 + Math.abs(x - 70) / 110 + Math.sin(t * 2 + x * 0.2 + y * 0.1) * 0.1; c_mix(R, x, y, c_tono(P.fTela, f, x, y), 0.7); } }
  R.rect(10, 21, 132, 22, P.fMadera[2]); R.rect(10, 21, 132, 21, P.fMadera[1]);
  for (const [fx, k] of [[48, 0], [96, 1]]) { const pie = Math.round(Math.sin(t * 3 + k) * 1.5); c_mix(R, fx, 15, V[0], 0.85); c_mix(R, fx + 1, 15, V[0], 0.85); for (let y = 16; y <= 20; y++) { c_mix(R, fx, y, V[1], 0.75); c_mix(R, fx + 1, y, V[1], 0.75); } R.pset(fx, 15, hex('#0e2a24')); c_mix(R, fx + pie, 23, V[2], 0.6); c_mix(R, fx + 1 - pie, 24, V[2], 0.5); }
  // el timón que gira solo
  { const cx = 232, cy = 114, r = 13, a0 = t * 0.6 + Math.sin(t * 0.9) * 0.5, M = P.fMadera;
    for (let i = 0; i < 8; i++) { const a = a0 + i * Math.PI / 4, ex = cx + Math.cos(a) * (r + 4), ey = cy + Math.sin(a) * (r + 4); R.linea(cx, cy, Math.round(ex), Math.round(ey), M[1]); c_disco(R, ex, ey, 1.5, M[0]); }
    for (let a = 0; a < Math.PI * 2; a += 0.04) { R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), Math.sin(a) < 0 ? M[0] : M[2]); R.pset(Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), M[1]); }
    c_disco(R, cx, cy, 3, M[0]); R.pset(cx, cy, V[0]); }
  // los faroles verdes que se mecen
  const fs = [[60, 40 + 0, 1], [150, 96, 2], [300, 96, 3]].map(([x, y, k]) => c_farol(R, t, x + Math.round(Math.sin(t * 1.4 + k) * 1), y, P, 50 + k, true));
  for (const [x, y] of fs) c_luz(R, t, x, y, 22, P, x, true);
  // la escotilla con luz verde que sube, la niebla que corre por cubierta y las almas
  { const l = 0.4 + Math.sin(t * 2) * 0.15; for (let y = 150; y <= 158; y++) for (let x = 142; x <= 178; x++) if ((x - 142) % 6 !== 0 && (y - 150) % 4 !== 0) c_mix(R, x, y, V[1], l); c_brillo(R, 160, 152, 30, V[2], l * 0.6, 14); }
  c_nieblaVerde(R, t, 126, 176, P, 0.42, 5, 6, 7);
  c_almas(R, t, 20, 30, 300, 150, 14, P, 2);
  // una rata fantasma que cruza la cubierta de vez en cuando
  { const u = (t * 0.18) % 1.6; if (u < 1) { const rx = Math.round(330 - u * 360), ry = 172; for (let i = 0; i < 6; i++) c_mix(R, rx + i, ry - (i > 0 && i < 5 ? 2 : 1), V[1], 0.7); c_mix(R, rx, ry - 3, V[0], 0.8); for (let i = 1; i < 6; i++) c_mix(R, rx + 5 + i, ry - 1 - (Math.floor(t * 8 + i) % 2), V[2], 0.5); } }
  return { suelo: 162, pies: [70, 212], timon: [232, 114], borda: 96, cubierta: [0, 128, 319, 179], escotilla: [160, 154], mastil: [11, 140], horizonte: hor };
}

// lo fijo de la cubierta fantasma: el mástil y su jarcia, la borda con balaustres y portas, cañones, el pedestal del
// timón, las tablas, barriles, un rollo de cabo y cadenas
function c_cubiertaFija(R, P) {
  const M = P.fMadera, V = P.verdeF, K = hex('#0e2420');
  for (const [a, b] of [[16, 22], [16, 40], [16, 60]]) { R.linea(a, b, 120, 96, P.fCuerda); R.linea(a, b, 70, 96, P.fCuerda); }
  R.rect(6, 0, 16, 140, M[2]); R.rect(6, 0, 8, 140, M[1]); R.rect(15, 0, 16, 140, M[3]); for (let y = 10; y < 140; y += 18) R.rect(5, y, 17, y + 2, P.metal[2]);
  // la borda: pasamanos, tablas verticales, balaustres y portas con cañones
  R.rect(0, 96, 319, 99, M[0]); R.rect(0, 99, 319, 100, M[2]);
  for (let x = 0; x < 320; x++) for (let y = 101; y <= 127; y++) { const tb = (x % 7 === 0); R.pset(x, y, tb ? M[3] : c_tono(M, 0.35 + (y - 101) / 50 + (h(x / 7 | 0, y >> 2, 1012) - 0.5) * 0.25, x, y)); }
  R.rect(0, 126, 319, 128, M[3]);
  for (const px of [40, 270]) { R.rect(px - 9, 104, px + 9, 118, K); R.rect(px - 10, 103, px + 10, 103, M[1]);
    R.rect(px - 14, 118, px + 14, 126, M[2]); R.rect(px - 14, 118, px + 14, 118, M[1]); for (const wx of [px - 10, px + 10]) { c_disco(R, wx, 126, 3.5, M[3]); c_disco(R, wx, 126, 1.5, M[1]); }
    R.rect(px - 6, 108, px + 6, 116, P.metal[2]); R.rect(px - 6, 108, px + 6, 109, P.metal[1]); R.rect(px - 8, 107, px - 6, 117, P.metal[3]); c_disco(R, px + 7, 112, 4, (x, y, d) => (d < 0.5 ? K : P.metal[1])); }
  // el pedestal del timón
  R.rect(228, 116, 236, 140, M[2]); R.rect(228, 116, 229, 140, M[1]); R.rect(224, 138, 240, 142, M[3]);
  // las tablas de cubierta y sus juntas que brillan
  c_suelo(R, 128, 179, M, 9);
  for (let y = 130; y < 180; y += 7) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 1013) < 0.25) R.pset(x, y, V[3]);
  // la escotilla, barriles, un rollo de cabo y la cadena
  R.rect(140, 148, 180, 160, M[3]); R.rect(141, 149, 179, 159, K); R.rect(140, 148, 180, 148, M[0]);
  c_barril(R, 292, 150, { ...P, madera: M }, 1, 16, 20); c_barril(R, 308, 162, { ...P, madera: M }, 2, 16, 20);
  c_rollo(R, 70, 170, P, 12);
  for (let i = 0; i < 16; i++) { const x = 180 + i * 5, y = 170 + Math.round(Math.sin(i * 0.5) * 2); if (i % 2) R.rect(x, y - 1, x + 3, y + 1, P.metal[2]); else { R.rect(x, y - 2, x + 3, y + 2, P.metal[1]); R.rect(x + 1, y - 1, x + 2, y + 1, K); } }
}

// los colores de los bichos
const c_BICHO = { k: hex('#1c1420'), M: hex('#8a5430'), m: hex('#64381e'), L: hex('#b07a48'), F: hex('#e8c09a'), f: hex('#c8966e'), W: hex('#f8f4ec'), r: hex('#d84a5a'),
  Y: hex('#f4d84a'), y: hex('#c8a030'), O: hex('#e89a4a'), o: hex('#b8702e'), B: hex('#fbf2e2'), b: hex('#d8c8b0'), P: hex('#f0a0a8'), n: hex('#5a3030') };

// pinta un sprite de texto (filas; '.' transparente) con la paleta de los bichos, a escala s y en espejo si d = −1;
// (x, y): la esquina de arriba del sprite sin espejo, y ancho: el ancho del sprite (para el espejo alrededor de cx)
function c_spr(R, filas, cx, y, d, s, dic = c_BICHO) {
  const w = filas[0].length;
  filas.forEach((f, j) => { for (let i = 0; i < w; i++) { const c = dic[f[i]]; if (c == null) continue; const ii = d > 0 ? i : w - 1 - i, px = Math.round(cx - (w * s) / 2 + ii * s); R.rect(px, y + j * s, px + s - 1, y + j * s + s - 1, c); } });
}

// un píxel de detalle relativo al sprite (i, j en coordenadas del sprite de ancho w), respetando el espejo
function c_sp(R, cx, y, w, i, j, d, s, c) { const ii = d > 0 ? i : w - 1 - i, px = Math.round(cx - (w * s) / 2 + ii * s); R.rect(px, y + j * s, px + s - 1, y + j * s + s - 1, c); }

// la cabeza de mono de 11 × 10 (sin ojos ni boca: los pone la cara)
const c_CAB = [
  '...kkkkk...',
  '..kMLLLMk..',
  '.kMLMMMMMk.',
  'kkMMMMMMMkk',
  'kFkFFMFFkFk',
  'kfkFFFFFkfk',
  '.kkFFFFFkk.',
  '..kFFFFFk..',
  '..kfFFFfk..',
  '...kkkkk...',
];

// una cara de mono sobre la cabeza (esquina de arriba cx, y): ojos que parpadean o miran, y la boca según la expresión
function c_cara(R, cx, y, d, s, t, k, exp, habla) {
  const C = c_BICHO, w = 11, par = (t + k * 0.9) % 3.2 < 0.13, mira = exp === 'mira' ? (Math.sin(t * 1.3 + k) > 0.3 ? 1 : Math.sin(t * 1.3 + k) < -0.3 ? -1 : 0) : 0;
  for (const ex of [4, 6]) { if (par) c_sp(R, cx, y, w, ex, 5, d, s, C.f); else { c_sp(R, cx, y, w, ex, 5, d, s, C.W); c_sp(R, cx, y, w, ex + (mira > 0 ? 0 : mira < 0 ? 0 : 0), 5, d, s, C.W); c_sp(R, cx, y, w, ex, 5, d, s, mira === 0 ? C.k : C.W); if (mira !== 0) c_sp(R, cx, y, w, ex + mira, 5, d, s, C.k); } }
  c_sp(R, cx, y, w, 5, 6, d, s, C.f);
  const abre = habla && Math.floor(t * 9 + k) % 2 === 0;
  if (exp === 'sonrie') { for (let i = 3; i <= 7; i++) c_sp(R, cx, y, w, i, 7, d, s, C.k); for (let i = 4; i <= 6; i++) c_sp(R, cx, y, w, i, 8, d, s, abre ? C.r : C.W); }
  else if (exp === 'come') { const m = Math.floor(t * 6 + k) % 2; c_sp(R, cx, y, w, 4, 7, d, s, C.k); c_sp(R, cx, y, w, 5, 7, d, s, m ? C.r : C.k); c_sp(R, cx, y, w, 6, 7, d, s, C.k); c_sp(R, cx, y, w, 3, 6, d, s, C.f); c_sp(R, cx, y, w, 7, 6, d, s, C.f); }
  else { c_sp(R, cx, y, w, 4, 7, d, s, C.k); c_sp(R, cx, y, w, 5, 7, d, s, abre ? C.r : C.k); c_sp(R, cx, y, w, 6, 7, d, s, C.k); if (abre) c_sp(R, cx, y, w, 5, 8, d, s, C.k); }
}

// la cola de mono que se enrosca: sale de (x, y) hacia el lado −d y se mueve
function c_cola(R, t, x, y, d, s, k = 0) {
  const C = c_BICHO;
  for (let i = 0; i < 16; i++) { const u = i / 15, a = u * 4.2 + Math.sin(t * 2 + k) * 0.5, r = 2 + (1 - u) * 6; const px = Math.round(x - d * (u * 8 + Math.sin(a) * 1.5) * s), py = Math.round(y - (u * 12 - (1 - Math.cos(a * 0.9)) * 2 + (u > 0.75 ? (u - 0.75) * 10 * Math.sin(t * 2 + k) : 0)) * s);
    R.rect(px, py, px + s - 1, py + s - 1, C.m); if (i % 3 === 0) R.rect(px + s, py, px + 2 * s - 1, py + s - 1, C.M); }
}

// el mono de tres cabezas
function c_mono3(R, x, y, t, d, s, o) {
  const C = c_BICHO;
  const CU = [
    '......kkkkkkkkkkkkk......',
    '....kkMMMMMMMMMMMMMkk....',
    '...kMMMMMMMLLLMMMMMMMk...',
    '..kMMMkkFFFFFFFFFkkMMMk..',
    '..kMMk.kFFFFFFFFFk.kMMk..',
    '..kMMk.kFFFFFFFFFk.kMMk..',
    '..kMMk.kfFFFFFFFfk.kMMk..',
    '..kFFk.kMMMMMMMMMk.kFFk..',
    '...kk..kMMMMMMMMMk..kk...',
    '.......kMMk...kMMk.......',
    '.......kMMk...kMMk.......',
    '......kFFFk...kFFFk......',
    '......kkkkk...kkkkk......',
  ];
  const al = CU.length * s, quieto = o.quieto, bot = quieto ? 0 : Math.round(Math.abs(Math.sin(t * 2.2)) * 1) * s;
  const by = y - al - bot + s;
  c_cola(R, t, x - d * 9 * s, y - 5 * s - bot, d, s, 1);
  c_spr(R, CU, x, by, d, s);
  if (o.saluda) { const a = Math.sin(t * 9) > 0 ? 1 : 0; const hx = Math.round(x + d * 11 * s); R.rect(Math.min(hx, hx + d * 2 * s), by - 6 * s - a * s, Math.max(hx, hx + d * 2 * s) + s - 1, by + 4 * s, C.M); R.rect(Math.min(hx, hx + d * 2 * s), by - 8 * s - a * s, Math.max(hx, hx + d * 2 * s) + s - 1, by - 6 * s - a * s, C.F); }
  // las tres cabezas, cada una con su vaivén y su cara (la del centro va delante)
  const CAB = [[-7, 'come', 0.3], [7, 'mira', 1.7], [0, 'sonrie', 0]];
  let cab = null;
  for (const [dx, exp, k] of CAB) { const cy = by - 9 * s + (quieto ? 0 : Math.round(Math.sin(t * 3 + k * 2.1) * 1.2) * s) - (dx === 0 ? s : 0), cx = x + d * dx * s;
    c_spr(R, c_CAB, cx, cy, d, s); c_cara(R, cx, cy, d, s, t, k * 3, exp, o.habla);
    if (exp === 'come') { const px = Math.round(cx + d * -5 * s); for (let i = 0; i < 4; i++) R.rect(px + d * i * s * 0, cy + (6 + i) * s, px + s - 1, cy + (6 + i) * s + s - 1, i === 0 ? C.y : C.Y); R.rect(px - d * s, cy + 9 * s, px - d * s + s - 1, cy + 9 * s + s - 1, C.F); }
    if (dx === 0) cab = [cx, cy]; }
  return { x, y, cabeza: cab, cabezas: CAB.map(([dx]) => [x + d * dx * s, by - 9 * s]), mano: [x + d * 10 * s, by + 6 * s] };
}

// el mono pequeño
function c_mono(R, x, y, t, d, s, o) {
  const C = c_BICHO;
  const CU = [
    '....kkkkk....',
    '...kMMMMMk...',
    '..kMMFFFMMk..',
    '.kMMkFFFkMMk.',
    '.kFkkFFFkkFk.',
    '..k.kMMMk.k..',
    '....kMkMk....',
    '...kFFkFFk...',
  ];
  const CA = ['....kkkkkkk....', '...kMMMMMMMk...'];
  const anda = o.anda, salto = o.salta ? Math.round(Math.abs(Math.sin(t * 6)) * 6) * s : 0, bal = anda ? Math.round(Math.sin(t * 10)) : 0;
  const al = (CU.length + c_CAB.length) * s, by = y - al + s - salto - (anda ? Math.abs(bal) * s : 0);
  c_cola(R, t, x - d * 3 * s, y - 4 * s - salto, d, s, 2);
  const cuerpo = anda && Math.floor(t * 8) % 2 ? CU.map((f, j) => (j >= 6 ? (j === 6 ? '....kMk.kMk..' : '...kFFkkFFk..') : f)) : CU;
  c_spr(R, cuerpo, x, by + c_CAB.length * s, d, s);
  const cx = x + bal * s, cy = by;
  c_spr(R, c_CAB, cx, cy, d, s);
  const rasca = !o.platano && (t % 6) > 4.6;
  c_cara(R, cx, cy, d, s, t, 5, o.platano ? 'come' : rasca ? 'mira' : 'normal', o.habla);
  const mx = Math.round(x + d * 6 * s), my = by + (c_CAB.length + 3) * s;
  if (rasca) { const a = Math.floor(t * 10) % 2; R.rect(Math.min(mx, mx + d * s), cy - s - a * s, Math.max(mx, mx + d * s) + s - 1, my, C.M); R.rect(Math.min(mx, mx + d * s), cy - 2 * s - a * s, Math.max(mx, mx + d * s) + s - 1, cy - s - a * s, C.F); }
  if (o.platano) { const fase = (t * 0.5) % 1, px = Math.round(x + d * 5 * s), py = cy + (6 - Math.round(Math.sin(t * 3) * 1)) * s; R.rect(px, py, px + s - 1, py + 4 * s, C.Y); R.rect(px + d * s, py + s, px + d * s + s - 1, py + 4 * s, C.y); if (fase > 0.3) { R.rect(px - d * s, py + 2 * s, px - d * s + s - 1, py + 4 * s, C.Y); R.rect(px + 2 * d * s, py + 2 * s, px + 2 * d * s + s - 1, py + 3 * s, C.y); } R.rect(px, py - s, px + s - 1, py - s, C.n); }
  return { x, y, cabeza: [cx, cy], mano: [mx, my] };
}

// el hámster mareado
function c_hamster(R, x, y, t, d, s, o) {
  const C = c_BICHO, mareo = Math.max(0, Math.min(1, o.mareo ?? 0)), anda = o.anda;
  const CU = [
    '..kk...kk..',
    '.kPkkkkkPk.',
    '.kOOOOOOOk.',
    'kOOOOOOOOOk',
    'kOOOOOOOOOk',
    'kBBBBnBBBBk',
    'kBBBBBBBBBk',
    '.kBBBBBBBk.',
    '..kPk.kPk..',
  ];
  const w = 11, tam = Math.round(Math.sin(t * 5) * 1.6 * mareo), sube = anda ? Math.round(Math.abs(Math.sin(t * 14))) : 0, by = y - CU.length * s + s - sube * s, cx = x + tam * s;
  // se tambalea: las filas de arriba se tuercen hacia un lado
  const ladeo = Math.sin(t * 5) * mareo;
  CU.forEach((f, j) => { const off = Math.round(ladeo * (CU.length - j) / 4) * s; c_spr(R, [f], cx + off * d, by + j * s, d, s); });
  const off3 = Math.round(ladeo * 6 / 4) * s * d, off4 = Math.round(ladeo * 5 / 4) * s * d;
  c_sp(R, cx + off3, by, w, 2, 3, d, s, C.o); c_sp(R, cx + off3, by, w, 8, 3, d, s, C.o); c_sp(R, cx + off4, by, w, 3, 4, d, s, C.B); c_sp(R, cx + off4, by, w, 7, 4, d, s, C.B);
  // los ojos: tranquilos (con brillo) o en espiral que gira, y el hocico que se mueve
  if (mareo > 0.3) { const g = Math.floor(t * 8) % 4, E = [[0, -1], [1, 0], [0, 1], [-1, 0]]; for (const ex of [3, 7]) { const [a, b] = E[g], [a2, b2] = E[(g + 2) % 4]; c_sp(R, cx + off3, by, w, ex, 3, d, s, C.k); c_sp(R, cx + off3 + a * s * d, by + b * s, w, ex, 3, d, s, C.k); c_sp(R, cx + off3 + a2 * s * d, by + b2 * s, w, ex, 3, d, s, C.W); } }
  else for (const ex of [3, 7]) { c_sp(R, cx + off3, by, w, ex, 3, d, s, (t % 3) < 2.9 ? C.k : C.o); }
  if (Math.floor(t * 7) % 3 === 0) c_sp(R, cx + off4, by, w, 5, 4, d, s, C.P);
  // las estrellitas que giran sobre la cabeza
  if (mareo > 0.05) for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.09, sx = Math.round(cx + off3 + Math.cos(a) * 7 * s), sy = Math.round(by - 3 * s + Math.sin(a) * 2 * s); if (Math.sin(a) < -0.2 && mareo < 0.6) continue; const c = i === 1 ? hex('#ffffff') : C.Y; R.rect(sx, sy, sx + s - 1, sy + s - 1, c); R.rect(sx - s, sy, sx - 1, sy + s - 1, C.y); R.rect(sx + s, sy, sx + 2 * s - 1, sy + s - 1, C.y); R.rect(sx, sy - s, sx + s - 1, sy - 1, C.y); R.rect(sx, sy + s, sx + s - 1, sy + 2 * s - 1, C.y); }
  return { x, y, cabeza: [cx, by], mano: [cx + d * 4 * s, by + 7 * s] };
}

// los colores propios de las tres épocas
const d_C = pal({
  yeso: '#cbb48c', yesoS: '#ae9670', yesoL: '#dcc8a2', yesoD: '#8e7656', roble: '#74462a', robleS: '#55321c', robleL: '#94603a', robleD: '#36200f',
  pino: '#a8743c', pinoS: '#86592c', pinoL: '#c48c50', pinoD: '#5e3e1e', piedra: '#8a8278', piedraS: '#665e56', piedraL: '#aaa296',
  tor0: '#141828', tor1: '#22283e', tor2: '#343c58', tor3: '#4e587a', tor4: '#6e7898', rayo: '#f4f0ff', lluvia: '#8a96c0',
  vela: '#fff2b8', velaS: '#f0b040', cera: '#f2ead2', ceraS: '#c8bc9a', peluca: '#ece8e0', pelucaS: '#b8b2a8', piel: '#f0c8a0', pielS: '#c8946a',
  teal: '#3e8a7e', tealS: '#2e6e64', tealL: '#58a494', tealD: '#1e4a44', granate: '#7a2e4e', granateS: '#5a1e38', granateL: '#9a4468', crema: '#eadcbc', cremaS: '#c8b892',
  baldosa: '#eadab2', baldosaS: '#cbb88e', terra: '#b85a3a', terraS: '#8a3e26', terraL: '#d07850', sofa: '#5a8a3a', sofaS: '#3e6a28', sofaL: '#7aaa52',
  rosa: '#e888a8', rosaS: '#b85a7a', cielo1: '#4a9ee6', cielo2: '#7ab8f0', cielo3: '#b0dcf6', cesped: '#5aa83a', cespedS: '#3e8228', cespedL: '#86cc56',
  vio: '#3c2659', vioS: '#2a1a42', vioL: '#56347a', vioD: '#1a0e2c', neon: '#7af05a', neonS: '#3ab83a', neonD: '#1e6a2a', rosaN: '#f05ac8',
  fut0: '#1e0e3a', fut1: '#4a1e66', fut2: '#8a2e78', fut3: '#d0567a', fut4: '#f0a050', torre: '#2a1846', torreL: '#44286a',
  plas: '#3a8ac8', plasS: '#2a6698', plasL: '#6ab0e8', plasD: '#1a4470', laton: '#d8a840', latonS: '#a07820', latonL: '#f4d880',
});

const d_mezcla = (c, e, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((e >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

const d_CACHE = new WeakMap();

// un búfer de R.nuevo() que se pinta una sola vez (lo fijo de cada encuadre) y se guarda por clave
function d_capa(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// un búfer de trabajo (se repinta en cada fotograma: las franjas del 'triple')
function d_buf(R, clave) { let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = {})); return m[clave] ?? (m[clave] = R.nuevo()); }

// el relámpago: 0 nada, 1 el fogonazo (dos destellos seguidos); o.rayo fija el instante del grande
function d_flash(t, o = {}) {
  const u = o.rayo != null ? t - o.rayo : (t + 1.7) % 5.3;
  return u >= 0 && u < 0.1 ? 1 : u >= 0.18 && u < 0.3 ? 0.7 : 0;
}

// aclara un píxel hacia el color c (para la luz que entra por una ventana)
function d_aclara(R, x, y, c, a) { const p = R.pget(x, y); if (p) R.pset(x, y, d_mezcla(p, c, a)); }

// una nube de tres tonos (sombra, cuerpo, luz) de ancho w; cols [sombra, cuerpo, luz]; la recorta R.recorte
function d_nube(R, cx, cy, w, cols) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), cols[0]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), cols[1]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.62), cols[2]);
}

// un rayo en zigzag de (x0, y0) a (x1, y1), con su ramita y el halo azulado
function d_rayo(R, x0, y0, x1, y1, k = 0) {
  let px = x0, py = y0; const n = 9;
  for (let i = 1; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u + (i < n ? (h(i, k, 520) - 0.5) * 10 : 0)), y = Math.round(y0 + (y1 - y0) * u);
    R.linea(px + 1, py, x + 1, y, d_C.tor4); R.linea(px, py, x, y, d_C.rayo);
    if (i === 3) R.linea(x, y, x + 7 * (h(k, 3, 521) < 0.5 ? -1 : 1), y + 8, d_C.tor4);
    px = x; py = y; }
}

// la lluvia que cae en diagonal dentro de (x0, y0)–(x1, y1)
function d_lluvia(R, t, x0, y0, x1, y1, n, k = 0) {
  const w = x1 - x0 + 20, hh = y1 - y0;
  for (let i = 0; i < n; i++) { const y = y0 + ((h(i, 1, 530 + k) * hh + t * 150) % hh), x = x0 - 10 + ((h(i, 2, 530 + k) * w - (y - y0) * 0.35 + w) % w);
    R.linea(Math.round(x), Math.round(y), Math.round(x - 1), Math.round(y + 3), i % 3 ? d_C.lluvia : d_C.tor4); }
}

// gente pequeña de fondo (unos 13 px de pie): cabeza con su pelo (o.peluca: la peluca blanca de bucles con su lazo),
// cuerpo de o.ropa, piernas; o.sentado (solo la cabeza y el torso: lo de abajo lo tapa la mesa), o.escribe (el brazo
// con la pluma, que se mueve), o.saluda (el brazo arriba), o.dir
function d_persona(R, x, y, t, o = {}) {
  const { rect, pset } = R, d = o.dir ?? 1, K = C.k, ropa = o.ropa ?? hex('#4a5a8a'), ropaS = d_mezcla(ropa, K, 0.35), ropaL = d_mezcla(ropa, C.blanco, 0.3);
  const pelo = o.peluca ? d_C.peluca : o.pelo ?? hex('#5a3a20'), peloS = o.peluca ? d_C.pelucaS : d_mezcla(pelo, K, 0.3), piel = o.piel ?? d_C.piel;
  const top = Math.round(y - (o.sentado ? 11 : 13) + (o.bota ? Math.round(Math.abs(Math.sin(t * 5 + x))) * -1 : 0));
  if (!o.sentado) { rect(x - 2, top + 10, x + 2, y, K); rect(x - 1, top + 10, x - 1, y - 1, o.pierna ?? hex('#3a3040')); rect(x + 1, top + 10, x + 1, y - 1, o.pierna ?? hex('#3a3040')); }
  rect(x - 3, top + 5, x + 3, top + (o.sentado ? 11 : 10), K); rect(x - 2, top + 6, x + 2, top + (o.sentado ? 11 : 9), ropa); rect(x - 2 * d, top + 6, x - 2 * d, top + 9, ropaS); pset(x + d, top + 6, ropaL);
  if (o.peluca) { pset(x, top + 6, C.blanco); pset(x, top + 7, C.blanco); }   // la chorrera
  rect(x - 3, top - 1, x + 3, top + 4, K); rect(x - 2, top, x + 2, top + 4, piel); pset(x + d, top + 2, K); pset(x + 2 * d, top + 3, d_C.pielS);
  rect(x - 2, top - 1, x + 2, top, pelo); pset(x - 2 * d, top + 1, pelo); pset(x - 2 * d, top + 2, peloS);
  if (o.peluca) { pset(x - 3, top + 2, pelo); pset(x + 3, top + 2, pelo); pset(x - 3, top + 3, peloS); pset(x + 3, top + 3, peloS); pset(x - 3 * d, top + 4, K); pset(x - 4 * d, top + 4, K); }
  if (o.escribe) { const w = Math.round(Math.sin(t * 9 + x) * 1.2), hx = x + 4 * d + w, hy = top + 9; rect(x + 2 * d, top + 7, x + 3 * d, top + 8, ropa); pset(hx, hy, piel); pset(hx + d, hy - 1, C.blanco); pset(hx + 2 * d, hy - 2, C.blanco); pset(hx + 2 * d, hy - 3, d_C.pelucaS); }
  if (o.saluda) { const w = Math.sin(t * 7 + x) > 0 ? 1 : 0; pset(x + 3 * d, top + 5, ropa); pset(x + 4 * d, top + 3, ropa); pset(x + (4 + w) * d, top + 1, piel); pset(x + (4 + w) * d, top + 2, K); }
}

// un tentáculo pequeño de fondo (unos 12 px), de color c ('morado' o 'verde'), que salta; o.lanza (el guardián)
function d_tentaculito(R, x, y, t, col = 'morado', o = {}) {
  const c = col === 'verde' ? C.verde : C.morado, cS = col === 'verde' ? C.verdeS : C.moradoS, cL = col === 'verde' ? C.verdeL : C.moradoL;
  const s = Math.round(-Math.abs(Math.sin(t * 5 + x * 0.1)) * (o.salta === false ? 0 : 2)), yb = y + s, d = o.dir ?? 1;
  R.rect(x - 3, yb - 1, x + 3, yb, C.k); R.rect(x - 2, yb, x + 2, yb, C.ventosa);
  R.disco(x, yb - 9, 3.4, C.k); R.rect(x - 3, yb - 9, x + 3, yb - 1, C.k); R.disco(x, yb - 9, 2.5, c); R.rect(x - 2, yb - 9, x + 2, yb - 2, c);
  R.rect(x + 2 * -d, yb - 8, x + 2 * -d, yb - 2, cS); R.pset(x - d, yb - 10, cL);
  R.pset(x - 1 + d, yb - 8, C.blanco); R.pset(x + 1 + d, yb - 8, C.blanco); R.pset(x - 1 + d, yb - 7, C.k); R.pset(x + 1 + d, yb - 7, C.k); R.rect(x - 1 + d, yb - 5, x + 1 + d, yb - 5, C.k);
  if (o.lanza) { R.linea(x + 4 * d, yb - 14, x + 4 * d, yb, C.metalS); R.pset(x + 4 * d, yb - 15, C.metalL); R.pset(x + 3 * d, yb - 4, cS); }
}

// el emblema de los tentáculos (un tentáculo con sus dos ojos dentro de un óvalo), sin letras; s = 1 o 2
function d_emblema(R, cx, cy, s, fondo, linea) {
  R.disco(cx, cy, 6 * s + 1, C.k); R.disco(cx, cy, 6 * s, fondo); R.disco(cx, cy, 5 * s, d_mezcla(fondo, C.k, 0.25));
  R.disco(cx, cy - 1 * s, 2.4 * s, linea); R.rect(cx - 2 * s, cy - 1 * s, cx + 2 * s, cy + 3 * s, linea); R.rect(cx - 3 * s, cy + 3 * s, cx + 3 * s, cy + 3 * s + Math.max(0, s - 1), linea);
  R.pset(cx - s, cy - s, C.k); R.pset(cx + s, cy - s, C.k);
}

// la geometría compartida del vestíbulo (la misma casa en las tres épocas)
const d_G = { hueco: [20, 34, 66, 92], puerta: [88, 52, 114, 117], hogar: [126, 72, 194, 117], boca: [142, 90, 178, 117], cuadro: [140, 26, 180, 62], reloj: [204, 42, 222, 117] };

// las filas del suelo en perspectiva (las de atrás, más estrechas)
const d_FILAS = [118, 122, 127, 133, 140, 148, 157, 167, 180];

// el vestíbulo de una época (era 1793, 1993 o 2193): lo fijo en su búfer y, encima, la ventana viva y la vida de la sala
function d_salon(R, t, era, o = {}) {
  R.copiar(d_capa(R, 'salon' + era, () => d_salonFijo(R, era)));
  const [x0, y0, x1, y1] = d_G.hueco, fl = era === 1793 ? d_flash(t, o) : 0;
  R.recorte([x0, y0, x1, y1]); d_vista(R, t, era, x0, y0, x1, y1, o); R.recorte(null);
  d_parteluz(R, era, x0, y0, x1, y1);
  // el reloj de pie: el péndulo que oscila y el segundero
  const pa = Math.sin(t * Math.PI) * 0.35, px = 213 + Math.round(Math.sin(pa) * 12), py = 70 + Math.round(Math.cos(pa) * 12);
  R.rect(208, 68, 218, 96, era === 2193 ? hex('#140a22') : hex('#24140a')); R.linea(213, 68, px, py, d_C.latonS); R.disco(px, py + 2, 2.6, C.k); R.disco(px, py + 2, 2, d_C.laton); R.pset(px - 1, py + 1, d_C.latonL);
  const sa = Math.floor(t) * Math.PI / 30 - Math.PI / 2; R.linea(213, 54, Math.round(213 + Math.cos(sa) * 4), Math.round(54 + Math.sin(sa) * 4), C.rojo);
  if (era === 1793) d_vida1793(R, t, fl);
  else if (era === 1993) d_vida1993(R, t);
  else d_vida2193(R, t);
  const r = { suelo: 150, pies: [40, 150, 250], ventana: [x0, y0, x1, y1], puerta: [88, 52, 114, 117], hogar: [126, 72, 194, 117], reloj: [204, 42, 222, 117], escalera: [[230, 117], [296, 66]], rellano: 66, fondo: 132 };
  if (era === 1793) r.mesa = [22, 120, 112, 123];
  if (era === 1993) Object.assign(r, { sofa: [18, 108, 76, 134], hamster: [80, 112], chicles: [122, 134] });
  if (era === 2193) r.jaulas = [[38, 132], [80, 132]];
  return r;
}

// el parteluz de la ventana del vestíbulo, por encima de lo que se ve por ella
function d_parteluz(R, era, x0, y0, x1, y1) {
  const mx = (x0 + x1) >> 1, my = (y0 + y1) >> 1;
  if (era === 1793) { const c = d_C.robleS; for (const x of [x0 + 15, x0 + 31]) R.rect(x, y0, x, y1, c); for (const y of [y0 + 14, y0 + 29, y0 + 44]) R.rect(x0, y, x1, y, c); R.rect(x0, y0, x1, y0, d_C.robleD); }
  else if (era === 1993) { R.rect(mx - 1, y0, mx + 1, y1, d_C.crema); R.rect(mx + 1, y0, mx + 1, y1, d_C.cremaS); R.rect(x0, my - 1, x1, my + 1, d_C.crema); R.rect(x0, my + 1, x1, my + 1, d_C.cremaS); }
  else { R.rect(x0, my, x1, my, d_C.vioL); for (const [i, j] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 2], [x1 - 2, y1 - 2]]) R.pset(i, j, d_C.neon); }
}

// lo fijo del vestíbulo de cada época
function d_salonFijo(R, era) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k;
  // el techo (oscuro y tranquilo, por detrás de la barra del año)
  if (era === 1793) { rect(0, 0, 319, 17, d_C.robleD); for (let x = 6; x < 320; x += 30) { rect(x, 8, x + 9, 17, d_C.robleS); rect(x, 8, x + 9, 8, d_C.roble); rect(x + 9, 9, x + 9, 17, K); } rect(0, 16, 319, 17, d_C.robleS); }
  else if (era === 1993) { rect(0, 0, 319, 17, hex('#c8b894')); for (let x = 0; x < 320; x += 4) { rect(x, 11, x + 1, 13, d_C.cremaS); } rect(0, 9, 319, 10, d_C.crema); rect(0, 14, 319, 15, d_C.crema); rect(0, 16, 319, 17, d_C.cremaS); }
  else { rect(0, 0, 319, 17, d_C.vioD); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 15, d_C.vioS); rect(0, 15, 319, 15, d_C.vioS); rect(0, 16, 319, 16, d_C.neonD); rect(0, 17, 319, 17, d_C.vioS); }
  // la pared
  for (let y = 18; y < 96; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (era === 1793) { const n = h(x >> 1, y >> 1, 500), m = h(x >> 3, y >> 3, 501); c = n < 0.1 ? d_C.yesoS : n > 0.94 ? d_C.yesoL : d_C.yeso; if (m < 0.22 && (x + y) & 1) c = d_C.yesoS; if (y < 26 && (x + y) % (y - 16) === 0) c = d_C.yesoD; }
    else if (era === 1993) { const a = (x + y) % 12, b = (x - y + 1200) % 12; c = (a === 0 || b === 0) && (x & 1) ? d_C.tealS : d_C.teal; if (a === 6 && b === 6) c = d_C.tealL; if ((a === 5 || a === 7) && b === 6) c = d_C.tealL; if (y === 24 || y === 25) c = y === 24 ? d_C.crema : d_C.cremaS; }
    else { const px = x % 26, py = (y - 18) % 26; c = d_C.vio; if (px === 0 || py === 0) c = d_C.vioS; else if (px === 1 || py === 1) c = d_C.vioL; else if (x % 3 === 0 && h(x, y >> 2, 502) < 0.5) c = hex('#382254'); if ((px === 3 || px === 23) && (py === 3 || py === 23)) c = d_C.vioL; }
    pset(x, y, c);
  }
  if (era === 1793) {   // el entramado de roble y las grietas del yeso
    for (const x of [0, 120, 198, 314]) { rect(x, 18, x + 5, 95, d_C.roble); rect(x, 18, x, 95, d_C.robleL); rect(x + 5, 18, x + 5, 95, d_C.robleS); for (let y = 22; y < 94; y += 9) pset(x + 2 + (y % 2), y, d_C.robleS); }
    rect(0, 18, 319, 22, d_C.roble); rect(0, 18, 319, 18, d_C.robleL); rect(0, 22, 319, 22, d_C.robleS);
    for (const [cx, cy] of [[78, 40], [236, 30], [190, 88]]) { let x = cx, y = cy; for (let i = 0; i < 9; i++) { const nx = x + Math.round((h(i, cx, 503) - 0.5) * 4), ny = y + 2; linea(x, y, nx, ny, d_C.yesoD); x = nx; y = ny; } }
  }
  // el zócalo
  for (let y = 96; y < 118; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (era === 1793) { const b = x % 7; c = b === 0 ? d_C.pinoD : b === 1 ? d_C.pinoL : h(x, y >> 1, 504) < 0.12 ? d_C.pinoS : d_C.pino; }
    else if (era === 1993) c = d_C.granate;
    else { c = y === 99 ? d_C.neon : y === 98 || y === 100 ? d_C.neonD : (x % 8 < 4 && y > 104 && y < 112) ? K : d_C.vioS; }
    pset(x, y, c);
  }
  if (era === 1993) for (let x = 2; x < 318; x += 26) d_cuarteron(R, x, 100, x + 22, 115, d_C.granate, d_C.granateL, d_C.granateS, d_C.granateS, x);
  rect(0, 95, 319, 97, era === 1793 ? d_C.roble : era === 1993 ? d_C.crema : d_C.vioL); rect(0, 97, 319, 97, era === 1793 ? d_C.robleS : era === 1993 ? d_C.cremaS : d_C.vioS);
  rect(0, 116, 319, 117, era === 1793 ? d_C.robleS : era === 1993 ? d_C.granateS : d_C.vioD);
  // el suelo en perspectiva: tablones (1793), baldosas a cuadros (1993), losas brillantes (2193)
  for (let f = 0; f < d_FILAS.length - 1; f++) { const ya = d_FILAS[f], yb = d_FILAS[f + 1] - 1, alto = yb - ya + 1, sombra = (8 - f) * 0.04;
    for (let y = ya; y <= yb; y++) for (let x = 0; x < 320; x++) {
      let c;
      if (era === 1793) { const w = 18 + alto * 6, xx = x + f * 37, b = xx % w; c = b === 0 ? d_C.pinoD : y === yb ? d_C.pinoD : y === ya ? d_C.pinoL : h(xx >> 2, y, 505) < 0.18 ? d_C.pinoS : d_C.pino; if (b === 3 && y === ya + 1) c = K; }
      else if (era === 1993) { const w = 8 + alto * 2, xx = x + 160 * 0 - Math.round((x - 160) * (8 - f) * 0.02), i = Math.floor((xx + 4000) / w); const par = (i + f) & 1; c = par ? d_C.terra : d_C.baldosa; if ((xx + 4000) % w === 0 || y === yb) c = par ? d_C.terraS : d_C.baldosaS; if (y === ya && (xx + 4000) % w < 3) c = par ? d_C.terraL : C.blanco; }
      else { const w = 14 + alto * 3, i = Math.floor((x + f * 7) / w), par = (i + f) & 1; c = par ? d_C.vioS : hex('#22163a'); if ((x + f * 7) % w === 0 || y === yb) c = d_C.vioD; if (y === ya && par) c = d_C.vio; }
      pset(x, y, sombra > 0 && ((x + y) & 1) ? d_mezcla(c, K, sombra) : c);
    } }
  // la luz de la ventana en el suelo
  for (let y = 118; y < 150; y++) { const d = Math.round((y - 118) * 0.9); for (let x = 22 + d; x <= 64 + d; x++) if ((x + y) & 1) d_aclara(R, x, y, era === 2193 ? d_C.fut3 : C.blanco, era === 1793 ? 0.06 : 0.16); }
  // la ventana: marco, alféizar y (1993) las cortinas
  const [x0, y0, x1, y1] = d_G.hueco;
  if (era === 1793) { rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, K); rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, d_C.roble); rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, d_C.robleL); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, d_C.robleS); rect(x0 - 6, y1 + 4, x1 + 6, y1 + 7, d_C.roble); rect(x0 - 6, y1 + 4, x1 + 6, y1 + 4, d_C.robleL); rect(x0 - 6, y1 + 7, x1 + 6, y1 + 7, d_C.robleD); }
  else if (era === 1993) { rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, K); rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, d_C.crema); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, d_C.cremaS); rect(x0 - 6, y1 + 4, x1 + 6, y1 + 7, d_C.crema); rect(x0 - 6, y1 + 7, x1 + 6, y1 + 7, d_C.cremaS);
    rect(x0 - 10, y0 - 9, x1 + 10, y0 - 7, d_C.latonS); rect(x0 - 10, y0 - 9, x1 + 10, y0 - 9, d_C.laton);
    for (const [a, b, s] of [[x0 - 10, x0 + 2, 1], [x1 - 2, x1 + 10, -1]]) for (let y = y0 - 7; y < y1 + 10; y++) { const ata = y > y0 + 38 && y < y0 + 44, cin = Math.round((y > y0 + 40 ? 1 - Math.abs(y - y0 - 41) / 22 : 0) * 0); for (let x = a; x <= b; x++) { if (ata && x === a + 6) continue; const pl = (x - a) % 4; pset(x + cin * s, y, pl === 0 ? d_C.rosaS : pl === 3 ? hex('#f4b0c8') : d_C.rosa); } if (ata) rect(a, y, b, y, d_C.latonS); } }
  else { rect(x0 - 5, y0 - 5, x1 + 5, y1 + 5, K); rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, d_C.vioL); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, d_C.neonD); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K);
    for (const [i, j] of [[x0 - 5, y0 - 5], [x1 + 5, y0 - 5], [x0 - 5, y1 + 5], [x1 + 5, y1 + 5]]) { pset(i, j, d_C.vioD); } rect(x0 - 8, y1 + 5, x1 + 8, y1 + 8, d_C.vioL); rect(x0 - 8, y1 + 8, x1 + 8, y1 + 8, d_C.vioD); }
  // la puerta
  const [p0, q0, p1, q1] = d_G.puerta;
  if (era === 1793) { rect(p0 - 3, q0 - 3, p1 + 3, q1, K); rect(p0 - 2, q0 - 2, p1 + 2, q1, d_C.roble); rect(p0 - 2, q0 - 2, p1 + 2, q0 - 2, d_C.robleL);
    for (let x = p0; x <= p1; x++) for (let y = q0; y <= q1; y++) pset(x, y, (x - p0) % 5 === 0 ? d_C.robleD : h(x, y >> 1, 506) < 0.15 ? d_C.robleS : d_C.robleL);
    for (const y of [q0 + 10, q1 - 14]) { rect(p0, y, p0 + 16, y + 2, K); rect(p0 + 1, y + 1, p0 + 15, y + 1, hex('#4a4a52')); disco(p0 + 16, y + 1, 2, K); }
    rect(p1 - 5, q0 + 34, p1 - 3, q0 + 38, K); pset(p1 - 4, q0 + 35, C.metalL); disco((p0 + p1) / 2, q0 - 7, 3, K); disco((p0 + p1) / 2, q0 - 7, 2, hex('#6a6a72'));   // el pestillo y la herradura
    rect(p0 - 12, q0 + 6, p0 - 9, q0 + 8, d_C.robleD); for (const dx of [-11, -6]) { rect(p0 + dx - 1, q0 + 8, p0 + dx + 1, q0 + 10, d_C.robleD); }
    poligono([[p0 - 18, q0 + 13], [p0 - 6, q0 + 13], [p0 - 9, q0 + 9], [p0 - 15, q0 + 9]], K); poligono([[p0 - 17, q0 + 12], [p0 - 7, q0 + 12], [p0 - 9, q0 + 10], [p0 - 15, q0 + 10]], hex('#2a2a3a'));   // el tricornio colgado
    rect(p0 - 14, q0 + 14, p0 - 8, q0 + 34, K); rect(p0 - 13, q0 + 14, p0 - 9, q0 + 33, hex('#3a4a7a')); rect(p0 - 13, q0 + 14, p0 - 13, q0 + 33, hex('#2a3a5a')); for (let y = q0 + 16; y < q0 + 32; y += 4) pset(p0 - 11, y, d_C.laton); }
  else if (era === 1993) { rect(p0 - 3, q0 - 12, p1 + 3, q1, K); rect(p0 - 2, q0 - 11, p1 + 2, q1, d_C.crema); rect(p0 - 2, q0 - 11, p0 - 2, q1, C.blanco);
    disco((p0 + p1) / 2, q0 - 1, 10, K); disco((p0 + p1) / 2, q0 - 1, 9, d_C.cremaS); disco((p0 + p1) / 2, q0 - 1, 8, (x, y) => ((x + y) % 5 === 0 ? d_C.cielo3 : y < q0 - 5 ? d_C.cielo2 : hex('#f0d080')));
    for (let k = -2; k <= 2; k++) linea((p0 + p1) / 2, q0 - 1, (p0 + p1) / 2 + k * 4, q0 - 9 + Math.abs(k) * 2, d_C.cremaS);
    rect(p0, q0, p1, q1, hex('#3a7a4a')); rect(p0, q0, p1, q0, hex('#5a9a6a')); d_cuarteron(R, p0 + 3, q0 + 4, p1 - 3, q0 + 28, hex('#3a7a4a'), hex('#5a9a6a'), hex('#24563a'), hex('#2e6a40'), 7); d_cuarteron(R, p0 + 3, q0 + 34, p1 - 3, q1 - 5, hex('#3a7a4a'), hex('#5a9a6a'), hex('#24563a'), hex('#2e6a40'), 8);
    disco(p1 - 5, q0 + 32, 2, K); disco(p1 - 5, q0 + 32, 1.4, d_C.laton); pset(p1 - 6, q0 + 31, d_C.latonL); rect(p0 + 6, q1 - 2, p1 - 6, q1, hex('#8a6a3a')); }
  else { rect(p0 - 4, q0 - 6, p1 + 4, q1, K); rect(p0 - 3, q0 - 5, p1 + 3, q1, d_C.vioL); poligono([[p0 - 3, q0 + 2], [(p0 + p1) / 2, q0 - 6], [p1 + 3, q0 + 2]], d_C.vioL);
    rect(p0, q0, p1, q1, hex('#2a1a40')); for (let y = q0; y <= q1; y += 6) rect(p0, y, p1, y, d_C.vioS); rect((p0 + p1) / 2, q0, (p0 + p1) / 2, q1, K);
    rect(p0 - 2, q0 - 2, p0 - 2, q1, d_C.neonD); rect(p1 + 2, q0 - 2, p1 + 2, q1, d_C.neonD); d_emblema(R, (p0 + p1) / 2, q0 + 20, 1, C.morado, d_C.neon); }
  // la chimenea
  const [c0, d0, c1] = d_G.hogar, [b0, e0, b1] = d_G.boca;
  if (era === 1793) { for (let y = d0 + 6; y <= 117; y++) for (let x = c0; x <= c1; x++) { const fy = Math.floor((y - d0) / 6), fx = Math.floor((x + fy * 5) / 9), jy = (y - d0) % 6 === 0, jx = (x + fy * 5) % 9 === 0; pset(x, y, jy || jx ? d_C.piedraS : h(fx, fy, 507) < 0.3 ? d_C.piedraL : h(fx, fy, 508) < 0.5 ? d_C.piedra : hex('#7a7268')); }
    rect(c0 - 4, d0, c1 + 4, d0 + 5, K); rect(c0 - 3, d0 + 1, c1 + 3, d0 + 4, d_C.roble); rect(c0 - 3, d0 + 1, c1 + 3, d0 + 1, d_C.robleL); for (let x = c0; x < c1; x += 7) pset(x, d0 + 3, d_C.robleS); }
  else if (era === 1993) { for (let y = d0 + 6; y <= 117; y++) for (let x = c0; x <= c1; x++) { const fy = Math.floor((y - d0) / 4), jy = (y - d0) % 4 === 0, jx = (x + (fy & 1) * 5) % 10 === 0; pset(x, y, jy || jx ? d_C.cremaS : h((x + (fy & 1) * 5) / 10 | 0, fy, 509) < 0.25 ? C.ladrilloS : C.ladrillo); }
    rect(c0 - 5, d0, c1 + 5, d0 + 5, K); rect(c0 - 4, d0 + 1, c1 + 4, d0 + 4, C.blanco); rect(c0 - 4, d0 + 4, c1 + 4, d0 + 4, d_C.cremaS); rect(c0 - 2, d0 + 6, c0 + 2, 117, d_C.crema); rect(c1 - 2, d0 + 6, c1 + 2, 117, d_C.crema); }
  else { rect(c0, d0 + 6, c1, 117, d_C.vioS); for (let y = d0 + 8; y < 117; y += 5) rect(c0 + 2, y, c1 - 2, y, d_C.vioD); for (let x = c0 + 3; x < c1; x += 12) { pset(x, d0 + 9, d_C.vioL); pset(x, 114, d_C.vioL); }
    rect(c0 - 5, d0, c1 + 5, d0 + 5, K); rect(c0 - 4, d0 + 1, c1 + 4, d0 + 4, d_C.vioL); rect(c0 - 4, d0 + 1, c1 + 4, d0 + 1, C.moradoL); rect(c0 - 4, d0 + 4, c1 + 4, d0 + 4, d_C.neonD); }
  rect(b0 - 1, e0 - 1, b1 + 1, 117, K); rect(b0, e0, b1, 117, era === 2193 ? hex('#0e1a10') : hex('#1a1210')); if (era !== 2193) { rect(b0, e0, b1, e0 + 4, hex('#2a1e18')); poligono([[b0, e0], [b1, e0], [b1 - 6, e0 + 8], [b0 + 6, e0 + 8]], hex('#0c0808')); }
  rect(b0 - 6, 115, b1 + 6, 117, era === 1793 ? d_C.piedraL : era === 1993 ? d_C.crema : d_C.vioL);
  if (era === 1793) { linea(b0 + 4, e0 + 2, b0 + 4, 116, K); linea(b0 + 4, e0 + 4, b0 + 16, e0 + 4, K); linea(b0 + 14, e0 + 4, b0 + 14, e0 + 10, K);   // la grúa con la olla
    disco(b0 + 14, e0 + 15, 5, K); disco(b0 + 14, e0 + 15, 4, hex('#3a3a40')); pset(b0 + 12, e0 + 13, hex('#6a6a72'));
    for (const x of [b0 + 8, b1 - 8]) { rect(x - 1, 108, x + 1, 116, K); disco(x, 107, 2, K); } }
  if (era === 1993) { for (let k = 0; k < 3; k++) { rect(b0 + 8 + k * 7, 108 - k % 2 * 3, b0 + 18 + k * 7, 113 - k % 2 * 3, d_C.robleS); rect(b0 + 8 + k * 7, 108 - k % 2 * 3, b0 + 18 + k * 7, 108 - k % 2 * 3, d_C.pino); } disco(b0 + 9, 111, 2, d_C.pinoL); }
  // la repisa: velas, jarrón y fotos, o los tubos del reactor
  if (era === 1793) { for (const x of [c0 + 6, c1 - 6]) { rect(x - 2, d0 - 2, x + 2, d0 - 1, K); rect(x - 1, d0 - 2, x + 1, d0 - 2, hex('#a8a8b0')); rect(x - 1, d0 - 10, x + 1, d0 - 3, d_C.cera); pset(x + 1, d0 - 9, d_C.ceraS); }
    poligono([[c0 + 18, d0 - 1], [c0 + 30, d0 - 7], [c0 + 32, d0 - 4], [c0 + 20, d0 + 1]], hex('#d8c8a0')); pset(c0 + 31, d0 - 6, K); rect(c1 - 22, d0 - 6, c1 - 14, d0 - 1, hex('#5a6a7a')); rect(c1 - 21, d0 - 5, c1 - 15, d0 - 5, hex('#8a9aa8')); }
  if (era === 1993) { rect(c0 + 4, d0 - 9, c0 + 13, d0 - 1, K); rect(c0 + 5, d0 - 8, c0 + 12, d0 - 2, d_C.laton); rect(c0 + 6, d0 - 7, c0 + 11, d0 - 3, d_C.cielo2); rect(c0 + 7, d0 - 5, c0 + 10, d0 - 3, d_C.cesped);
    rect(c1 - 12, d0 - 8, c1 - 6, d0 - 1, K); rect(c1 - 11, d0 - 7, c1 - 7, d0 - 1, hex('#3a6aa8')); for (const [dx, dy, col] of [[-12, -12, d_C.rosa], [-9, -14, C.amarillo], [-6, -12, C.rojo]]) { linea(c1 - 9, d0 - 8, c1 + dx + 3, d0 + dy + 2, d_C.cespedS); disco(c1 + dx + 3, d0 + dy + 1, 1.6, col); }
    rect(c0 + 26, d0 - 6, c0 + 34, d0 - 1, d_C.latonS); rect(c0 + 27, d0 - 10, c0 + 33, d0 - 6, d_C.laton); pset(c0 + 28, d0 - 9, d_C.latonL); }
  if (era === 2193) { for (const x of [c0 + 6, c1 - 6]) { rect(x - 2, d0 - 14, x + 2, d0 - 1, K); rect(x - 1, d0 - 13, x + 1, d0 - 1, d_C.neonD); pset(x - 1, d0 - 12, d_C.neon); } }
  // el cuadro sobre la chimenea: un barco (1793), la mansión de noche (1993), el tentáculo coronado (2193)
  const [g0, g1, g2, g3] = d_G.cuadro;
  rect(g0 - 3, g1 - 3, g2 + 3, g3 + 3, K); rect(g0 - 2, g1 - 2, g2 + 2, g3 + 2, d_C.latonS); rect(g0 - 2, g1 - 2, g2 + 2, g1 - 2, d_C.latonL); rect(g0 - 2, g1 - 2, g0 - 2, g3 + 2, d_C.laton); rect(g0 - 1, g1 - 1, g2 + 1, g3 + 1, d_C.latonS);
  for (let y = g1; y <= g3; y++) for (let x = g0; x <= g2; x++) {
    let c;
    if (era === 1793) c = y < g1 + 22 ? (h(x >> 2, y >> 1, 510) < 0.2 ? hex('#c8b890') : hex('#b0a07a')) : ((x + y * 2) % 7 === 0 ? hex('#4a6a7a') : hex('#3a5a6a'));
    else if (era === 1993) c = y < g1 + 24 ? ((x * 7 + y * 13) % 41 === 0 ? hex('#f0e8b0') : hex('#2a2a5a')) : hex('#2a4a2a');
    else { const g = (y - g1) / (g3 - g1); c = g < 0.5 ? hex('#5a2a6a') : hex('#3a1a4a'); if (((x - g0) + (y - g1)) % 6 === 0) c = hex('#4a2258'); }
    pset(x, y, c);
  }
  if (era === 1793) { const sx = g0 + 20, sy = g1 + 24; poligono([[sx - 12, sy], [sx + 12, sy], [sx + 8, sy + 5], [sx - 9, sy + 5]], hex('#4a2e1a')); for (const [dx, hgt] of [[-6, 16], [2, 19], [9, 13]]) { linea(sx + dx, sy, sx + dx, sy - hgt, K); poligono([[sx + dx - 5, sy - hgt + 2], [sx + dx + 4, sy - hgt + 2], [sx + dx + 3, sy - 4], [sx + dx - 4, sy - 4]], hex('#f0e8d0')); } pset(sx + 2, sy - 20, C.rojo); }
  if (era === 1993) { const mx = g0 + 20, my = g1 + 24; poligono([[mx - 12, my], [mx - 12, my - 9], [mx - 6, my - 14], [mx, my - 9], [mx + 4, my - 16], [mx + 8, my - 9], [mx + 12, my - 9], [mx + 12, my]], hex('#4a3a5a')); for (const [dx, dy] of [[-9, -6], [-4, -6], [2, -11], [7, -5], [10, -5]]) pset(mx + dx, my + dy, hex('#f0d060')); disco(g2 - 6, g1 + 6, 3, hex('#f0e8c0')); }
  if (era === 2193) { const tx = g0 + 20, ty = g3 - 2; disco(tx, ty - 22, 8, K); rect(tx - 8, ty - 22, tx + 8, ty, K); disco(tx, ty - 22, 7, C.morado); rect(tx - 7, ty - 22, tx + 7, ty, C.morado); rect(tx - 7, ty - 20, tx - 5, ty, C.moradoS); disco(tx - 3, ty - 26, 2, C.moradoL);
    for (const dx of [-3, 3]) { disco(tx + dx, ty - 18, 2.2, C.blanco); pset(tx + dx, ty - 18, K); } rect(tx - 3, ty - 11, tx + 3, ty - 10, K);
    poligono([[tx - 7, ty - 28], [tx - 7, ty - 35], [tx - 3, ty - 31], [tx, ty - 36], [tx + 3, ty - 31], [tx + 7, ty - 35], [tx + 7, ty - 28]], d_C.laton); rect(tx - 7, ty - 29, tx + 7, ty - 28, d_C.latonS); pset(tx, ty - 33, C.rojo); }
  // el reloj de pie (el mismo en las tres épocas; en 2193 lleva tubos de lodo)
  const [r0, s0, r1] = d_G.reloj, mad = d_C.roble, madL = d_C.robleL, madS = d_C.robleS;
  rect(r0 - 1, s0 - 4, r1 + 1, 117, K); rect(r0, s0 - 3, r1, 116, mad); rect(r0, s0 - 3, r0, 116, madL); rect(r1, s0 - 3, r1, 116, madS);
  poligono([[r0 - 2, s0 - 3], [(r0 + r1) / 2, s0 - 10], [r1 + 2, s0 - 3]], K); poligono([[r0 - 1, s0 - 4], [(r0 + r1) / 2, s0 - 9], [r1 + 1, s0 - 4]], madL); disco((r0 + r1) / 2, s0 - 11, 1.5, d_C.laton);
  disco(213, 54, 7, K); disco(213, 54, 6, d_C.laton); disco(213, 54, 5, d_C.crema); for (let k = 0; k < 12; k++) pset(Math.round(213 + Math.cos(k * Math.PI / 6) * 4), Math.round(54 + Math.sin(k * Math.PI / 6) * 4), K);
  linea(213, 54, 213, 51, K); linea(213, 54, 216, 55, K);
  rect(207, 67, 219, 97, K); rect(r0 + 1, 100, r1 - 1, 114, madS); rect(r0 + 2, 102, r1 - 2, 112, mad); rect(r0 - 2, 114, r1 + 2, 117, K); rect(r0 - 1, 114, r1 + 1, 116, madS);
  if (era === 1993) { linea(r0 + 2, 74, r0 + 5, 84, madS); rect(r1 - 6, 103, r1 - 2, 107, C.amarillo); }   // la grieta y la nota (sin letras)
  if (era === 2193) { for (const x of [r0 - 3, r1 + 3]) { rect(x - 1, s0 + 4, x + 1, 117, K); rect(x, s0 + 5, x, 116, d_C.neonS); } rect(r0 - 3, s0 + 4, r1 + 3, s0 + 5, K); }
  // la escalera al rellano
  d_escalera(R, era);
  // los muebles de cada época
  if (era === 1793) d_mesaLarga(R);
  if (era === 1993) d_muebles1993(R);
  if (era === 2193) d_muebles2193(R);
}

// un cuarterón de madera en relieve: bisel con luz arriba a la izquierda y sombra abajo a la derecha, el campo y dos vetas
function d_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// la escalera de la derecha: ocho peldaños de (230, 117) al rellano de y 66, con su zanca, la alfombra (roja en 1993,
// morada con luz verde en 2193), los balaustres, el pasamanos y el poste de arranque; la puertecita de debajo
function d_escalera(R, era) {
  const { rect, pset, linea, poligono } = R, K = C.k, mad = era === 1793 ? d_C.roble : era === 1993 ? C.blanco : d_C.vioL, madS = era === 1793 ? d_C.robleS : era === 1993 ? d_C.cremaS : d_C.vioS, madL = era === 1793 ? d_C.robleL : era === 1993 ? C.blanco : C.moradoL;
  const alf = era === 1993 ? [C.rojo, C.rojoS] : era === 2193 ? [C.morado, C.moradoS] : null;
  poligono([[226, 118], [296, 66], [319, 66], [319, 118]], madS);
  for (let i = 0; i < 8; i++) { const x = 230 + i * 8.25, y = 117 - (i + 1) * 6.4; rect(Math.round(x), Math.round(y), 319, Math.round(y + 6.4), mad); rect(Math.round(x), Math.round(y), 319, Math.round(y), madL); rect(Math.round(x), Math.round(y + 1), Math.round(x), Math.round(y + 6.4), K);
    if (alf) { rect(Math.round(x) + 1, Math.round(y), 319, Math.round(y + 3), alf[0]); rect(Math.round(x) + 1, Math.round(y + 3), 319, Math.round(y + 3), alf[1]); if (era === 1993) pset(Math.round(x) + 2, Math.round(y + 4), d_C.laton); } }
  // la puertecita de debajo de la escalera
  rect(262, 96, 284, 117, K); poligono([[263, 97], [283, 97], [283, 117], [263, 117]], era === 2193 ? d_C.vioS : madS); poligono([[263, 97], [283, 82], [283, 97]], madS); rect(279, 106, 280, 107, d_C.laton);
  for (let x = 266; x < 282; x += 4) rect(x, 99, x, 115, K);
  // el rellano y su barandilla (por debajo de la zona de Atom)
  rect(296, 64, 319, 67, K); rect(296, 65, 319, 66, madL);
  // los balaustres y el pasamanos
  for (let x = 234; x < 296; x += 6) { const yb = Math.round(117 - (x - 230) / 8.25 * 6.4), yt = yb - 22; rect(x, yt, x + 1, yb, K); pset(x, yt + 4, madL); pset(x, yb - 4, madL); }
  for (let x = 298; x < 320; x += 6) rect(x, 48, x + 1, 64, K);
  linea(232, 94, 296, 44 + 4, K); linea(232, 93, 296, 47, madL); linea(232, 95, 296, 49, madS); rect(296, 47, 319, 48, K); rect(296, 47, 319, 47, madL);
  rect(229, 88, 235, 117, K); rect(230, 89, 234, 116, mad); rect(230, 89, 230, 116, madL); rect(228, 86, 236, 89, K); rect(229, 86, 235, 87, madL);
  if (era === 2193) { pset(232, 85, d_C.neon); linea(233, 96, 296, 50, d_C.neonD); }
}

// la mesa larga de 1793 (tablero de y 120 a 123, patas torneadas hasta 136), con papeles, tinteros y un candelabro
function d_mesaLarga(R) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k;
  // la alfombra trenzada del centro, el banco junto a la mesa y el cubo de la gotera junto a la escalera
  for (let y = -12; y <= 12; y++) for (let x = -66; x <= 66; x++) { const d = Math.hypot(x / 66, y / 12); if (d > 1) continue; const a = Math.floor(d * 6); pset(160 + x, 164 + y, d > 0.96 ? hex('#5a2a1a') : (x + a) % 3 === 0 ? hex('#5a2a1a') : [hex('#a84a2a'), hex('#c8984a'), hex('#4a6a5a')][a % 3]); }
  rect(30, 138, 104, 142, K); rect(31, 139, 103, 141, d_C.roble); rect(31, 139, 103, 139, d_C.robleL); for (const x of [34, 100]) { rect(x - 1, 142, x + 1, 150, K); pset(x, 145, d_C.roble); }
  rect(284, 160, 300, 176, K); rect(285, 161, 299, 175, d_C.pino); for (const y of [164, 172]) rect(285, y, 299, y, hex('#4a4a52')); rect(285, 161, 285, 175, d_C.pinoL); rect(286, 161, 298, 162, hex('#3a4a6a')); linea(284, 160, 292, 154, K); linea(300, 160, 292, 154, K);
  rect(240, 168, 262, 178, K); rect(241, 169, 261, 177, d_C.robleS); rect(241, 169, 261, 169, d_C.robleL); for (let x = 244; x < 260; x += 5) rect(x, 170, x, 176, d_C.robleD); disco(251, 165, 4, K); disco(251, 165, 3, hex('#c8c0a8')); pset(250, 164, C.blanco);   // el arcón con la jarra
  rect(20, 119, 114, 124, K); rect(21, 120, 113, 122, d_C.robleL); rect(21, 120, 113, 120, hex('#b07a48')); rect(21, 123, 113, 123, d_C.robleS);
  for (let x = 24; x < 112; x += 9) if (h(x, 1, 511) < 0.6) rect(x, 121, x + 4, 121, d_C.roble);
  for (const x of [25, 66, 108]) { rect(x - 2, 124, x + 2, 136, K); rect(x - 1, 124, x + 1, 135, d_C.roble); pset(x - 1, 128, d_C.robleL); pset(x - 1, 132, d_C.robleL); rect(x - 2, 129, x + 2, 130, d_C.robleS); }
  rect(23, 125, 111, 126, d_C.robleS);
  for (const [x, w] of [[30, 12], [52, 10], [74, 13], [94, 9]]) { poligono([[x, 120], [x + w, 119], [x + w + 1, 121], [x + 1, 122]], d_C.cera); for (let i = 2; i < w - 1; i += 2) pset(x + i, 120 + (i % 3 ? 1 : 0), d_C.ceraS); }
  for (const x of [47, 89]) { rect(x - 2, 116, x + 2, 120, K); rect(x - 1, 117, x + 1, 119, hex('#2a2a3a')); pset(x - 1, 117, hex('#6a6a7a')); }   // los tinteros
}

// los muebles de 1993: el sofá verde bajo la ventana, la mesita con la jaula del hámster, la máquina de chicles y la alfombra
function d_muebles1993(R) {
  const { rect, pset, disco, poligono } = R, K = C.k;
  // la alfombra redonda del centro
  for (let y = -11; y <= 11; y++) for (let x = -64; x <= 64; x++) { const d = Math.hypot(x / 64, y / 11); if (d > 1) continue; const anillo = Math.floor(d * 5); pset(170 + x, 160 + y, d > 0.95 ? C.rojoS : anillo % 2 ? hex('#c8a040') : (x + y) % 4 === 0 ? C.rojoS : C.rojo); }
  // el sofá
  rect(16, 106, 78, 135, K); rect(17, 107, 77, 120, d_C.sofa); rect(17, 107, 77, 108, d_C.sofaL); for (const x of [36, 58]) rect(x, 109, x, 119, d_C.sofaS);
  rect(14, 116, 22, 132, K); rect(15, 117, 21, 131, d_C.sofaL); rect(72, 116, 80, 132, K); rect(73, 117, 79, 131, d_C.sofa); rect(73, 117, 73, 131, d_C.sofaL);
  rect(22, 121, 72, 131, d_C.sofaS); rect(22, 121, 72, 122, d_C.sofa); for (const x of [38, 56]) rect(x, 122, x, 130, K);
  for (let x = 17; x < 78; x += 3) pset(x, 132, d_C.sofaS); for (const x of [19, 75]) rect(x, 133, x + 1, 136, d_C.robleD);
  disco(30, 114, 5, K); disco(30, 114, 4, C.amarillo); disco(29, 113, 2, hex('#f8e080'));   // un cojín
  // la mesita con la jaula del hámster
  rect(80, 120, 92, 122, K); rect(81, 120, 91, 121, d_C.pino); for (const x of [82, 90]) rect(x, 122, x, 136, d_C.pinoD);
}

// los muebles de 2193: dos jaulas cómicas en sus pedestales (con almohada y cuenco de caramelos) y los estandartes
function d_muebles2193(R) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  // la alfombra morada que va del frente al reactor, con su ribete dorado y el emblema
  poligono([[136, 118], [184, 118], [232, 180], [88, 180]], K); poligono([[138, 118], [182, 118], [228, 180], [92, 180]], d_C.latonS); poligono([[141, 118], [179, 118], [222, 180], [98, 180]], C.moradoS);
  for (let y = 119; y < 180; y++) { const a = Math.round(141 - (y - 118) * 0.69), b = Math.round(179 + (y - 118) * 0.69); for (let x = a + 2; x < b - 1; x++) if ((x + y) % 7 === 0) pset(x, y, C.morado); pset(a + 2, y, C.moradoL); pset(b - 2, y, C.moradoL); }
  for (let y = -7; y <= 7; y++) for (let x = -16; x <= 16; x++) if ((x / 16) ** 2 + (y / 7) ** 2 <= 1) pset(160 + x, 160 + y, (x / 16) ** 2 + (y / 7) ** 2 > 0.8 ? d_C.latonS : C.morado);   // la corona de los tentáculos tejida en la alfombra
  poligono([[150, 164], [150, 156], [154, 159], [160, 154], [166, 159], [170, 156], [170, 164]], d_C.laton); rect(150, 163, 170, 164, d_C.latonS); pset(160, 158, C.rojo); pset(152, 157, d_C.latonL);
  // el montón de cojines de la izquierda y las plantas raras de la derecha
  for (const [x, y, c] of [[22, 168, d_C.rosa], [36, 170, C.amarillo], [28, 161, hex('#5a8ad8')], [48, 166, d_C.neonS]]) { rect(x - 8, y - 4, x + 8, y + 4, K); rect(x - 7, y - 3, x + 7, y + 3, c); rect(x - 7, y - 3, x + 7, y - 3, d_mezcla(c, C.blanco, 0.4)); rect(x - 7, y + 3, x + 7, y + 3, d_mezcla(c, K, 0.35)); pset(x, y, d_mezcla(c, K, 0.35)); }
  for (const x of [276, 304]) { rect(x - 6, 160, x + 6, 172, K); rect(x - 5, 161, x + 5, 171, d_C.vioL); rect(x - 5, 161, x + 5, 162, C.moradoL); for (let k = 0; k < 5; k++) { const a = -2.4 + k * 0.45; linea(x, 160, Math.round(x + Math.cos(a) * 12), Math.round(160 + Math.sin(a) * 14), K); linea(x, 159, Math.round(x + Math.cos(a) * 11), Math.round(159 + Math.sin(a) * 13), d_C.neonS); disco(Math.round(x + Math.cos(a) * 12), Math.round(160 + Math.sin(a) * 14), 1.4, d_C.rosaN); } }
  // los reflejos de los estandartes y del reloj en el suelo brillante, y las luces del suelo
  for (const [x0, w, c] of [[74, 12, C.moradoS], [194, 8, C.moradoS], [206, 14, d_C.robleS]]) for (let y = 119; y < 146; y++) for (let x = x0 + (y & 1); x <= x0 + w; x += 2) if (h(x, y, 575) < 0.7 - (y - 119) / 40) pset(x, y, c);
  for (const [x, y] of [[20, 150], [300, 150], [60, 172], [262, 172]]) { rect(x - 3, y, x + 3, y + 1, K); rect(x - 2, y, x + 2, y, d_C.neon); }
  for (const cx of [38, 80]) {
    rect(cx - 19, 130, cx + 19, 136, K); rect(cx - 18, 131, cx + 18, 135, d_C.vioL); rect(cx - 18, 131, cx + 18, 131, C.moradoL); rect(cx - 18, 135, cx + 18, 135, d_C.vioS); rect(cx - 10, 136, cx + 10, 140, K); rect(cx - 9, 136, cx + 9, 139, d_C.vioS);
    rect(cx - 16, 124, cx + 16, 130, d_C.rosa); rect(cx - 16, 124, cx + 16, 124, hex('#f8c0d8')); rect(cx - 16, 129, cx + 16, 130, d_C.rosaS);   // la almohada gorda
    rect(cx + 8, 121, cx + 14, 124, K); rect(cx + 9, 121, cx + 13, 123, hex('#d8e8f0')); for (const [dx, col] of [[9, C.rojo], [11, C.amarillo], [13, d_C.neon], [10, C.azulL]]) pset(cx + dx, 120 + (dx & 1), col);   // el cuenco de caramelos
  }
}

// la vida de la sala de 1793: el fuego, las velas, los caballeros que escriben y la luz de los relámpagos
function d_vida1793(R, t, fl) {
  const { rect, pset, poligono, disco } = R, K = C.k;
  // el fuego del hogar
  const [b0, e0, b1] = d_G.boca;
  for (let k = 0; k < 7; k++) { const x = b0 + 8 + k * 4, a = 8 + Math.round(Math.abs(Math.sin(t * 7 + k * 1.9)) * 7 + h(k, Math.floor(t * 8), 512) * 3), b = 115;
    poligono([[x - 3, b], [x + Math.round(Math.sin(t * 9 + k) * 1.5), b - a], [x + 3, b]], C.naranja); poligono([[x - 1, b], [x, b - a * 0.55], [x + 1, b]], d_C.vela); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.9 + k / 3) % 1; pset(b0 + 14 + Math.round(Math.sin(u * 9 + k) * 3) + k * 6, Math.round(112 - u * 18), u < 0.6 ? C.naranja : C.rojoS); }
  rect(b0 + 4, 114, b1 - 4, 116, hex('#5a2a14')); for (let x = b0 + 5; x < b1 - 4; x += 3) pset(x, 115, Math.sin(t * 5 + x) > 0 ? C.naranja : C.rojoS);
  for (let y = 100; y < 117; y++) for (let x = b0 - 10; x < b0; x++) if (((x + y) & 1) && Math.sin(t * 6) > -0.6) d_aclara(R, x, y, C.naranja, 0.12);
  // las velas de la repisa y la del candelabro de la mesa
  const llama = (x, y, k) => { const f = Math.round(Math.sin(t * 11 + k * 2) * 0.6); pset(x + f, y - 2, d_C.vela); pset(x, y - 1, d_C.velaS); pset(x, y, d_C.vela); pset(x + f, y - 3, C.naranja); if (Math.sin(t * 3 + k) > 0.6) pset(x + f, y - 5, hex('#8a8a8a')); };
  llama(132, 59, 0); llama(188, 59, 1);
  rect(55, 108, 61, 109, K); for (const [x, y] of [[56, 104], [58, 102], [60, 104]]) { rect(x, y, x, 108, d_C.cera); llama(x, y - 2, x); } rect(57, 110, 59, 119, hex('#a8a8b0')); rect(55, 118, 61, 119, hex('#8a8a92'));
  // los dos caballeros con peluca que escriben al otro lado de la mesa (lo de debajo del tablero no se ve)
  const moja = (t % 4.4) < 0.6;
  R.recorte([0, 0, 319, 118]);
  d_persona(R, 40, 125, t, { sentado: true, peluca: true, ropa: hex('#6a4a2a'), escribe: !moja, dir: 1 });
  d_persona(R, 80, 125, t + 1.3, { sentado: true, peluca: true, ropa: hex('#3a4a7a'), escribe: true, dir: -1 });
  R.recorte(null);
  if (moja) { pset(45, 116, d_C.piel); pset(46, 115, C.blanco); pset(47, 114, C.blanco); }
  pset(44 + Math.round(Math.sin(t * 9) * 1.2), 119, K); pset(76 + Math.round(Math.sin(t * 9 + 1.3) * 1.2), 119, K);   // la tinta que va apareciendo
  // la gotera del techo que cae en el cubo, con su anillo
  { const u = (t * 0.8) % 1, y = Math.round(18 + u * u * 144); if (y < 162) { pset(292, y, d_C.lluvia); pset(292, y - 1, hex('#c8d4f0')); } else { const r = Math.round((u - 0.93) * 60); pset(292 - r, 162, d_C.lluvia); pset(292 + r, 162, d_C.lluvia); } pset(292, 18, d_C.lluvia); }
  // el relámpago: la luz que entra por la ventana y aclara el cuarto
  if (fl > 0) { for (let y = 96; y < 180; y++) { const d = Math.round((y - 96) * 0.9); for (let x = 14 + d; x <= 72 + d; x++) if ((x + y) & 1) d_aclara(R, x, y, d_C.rayo, 0.32 * fl); }
    for (let y = 18; y < 96; y += 2) for (let x = (y >> 1) & 1; x < 140; x += 2) d_aclara(R, x, y, d_C.rayo, 0.12 * fl); }
}

// la vida de la sala de 1993: el hámster en su rueda, la máquina de chicles, las motas en la luz y la lámpara
function d_vida1993(R, t) {
  const { rect, pset, disco, linea } = R, K = C.k;
  // la jaula del hámster con su rueda que gira
  rect(80, 104, 92, 119, K); rect(81, 105, 91, 118, hex('#d8eef0')); for (let x = 82; x < 91; x += 2) rect(x, 105, x, 118, hex('#9aa8b0')); rect(80, 103, 92, 104, C.rojo); rect(80, 118, 92, 119, C.rojo);
  const a = t * 7; disco(86, 112, 5, K); disco(86, 112, 4, hex('#c8d4dc')); for (let k = 0; k < 6; k++) linea(86, 112, Math.round(86 + Math.cos(a + k * 1.05) * 4), Math.round(112 + Math.sin(a + k * 1.05) * 4), hex('#8a98a0'));
  rect(84, 113, 88, 116, hex('#d8a060')); pset(87 + (Math.sin(t * 14) > 0 ? 1 : 0), 114, K); pset(85, 116 + (Math.sin(t * 14) > 0 ? 0 : -1), hex('#f0c8a0'));
  // la máquina de chicles (bola de cristal llena de colores, pie rojo), con un chicle que cae de vez en cuando
  const cx = 122; rect(cx - 4, 118, cx + 4, 134, K); rect(cx - 3, 119, cx + 3, 133, C.rojo); rect(cx - 3, 119, cx - 3, 133, hex('#e05a5a')); rect(cx - 1, 124, cx + 1, 126, d_C.latonS); pset(cx, 125, d_C.latonL);
  disco(cx, 112, 7, K); disco(cx, 112, 6, hex('#d8eef8')); for (let k = 0; k < 16; k++) { const u = h(k, 1, 513) * 6.28, r = h(k, 2, 513) * 5; pset(Math.round(cx + Math.cos(u) * r), Math.round(113 + Math.sin(u) * r * 0.8), [C.rojo, C.amarillo, d_C.cespedL, C.azulL, d_C.rosa][k % 5]); } pset(cx - 3, 108, C.blanco); pset(cx - 2, 107, C.blanco);
  rect(cx - 2, 104, cx + 2, 105, C.rojo); const u = (t % 6) / 6; if (u > 0.8) { const y = Math.round(127 + (u - 0.8) * 5 * 7); disco(cx + 5, Math.min(134, y), 1.2, d_C.rosa); }
  // las motas de polvo en la luz de la ventana
  for (let k = 0; k < 12; k++) { const y = Math.round(140 - ((h(k, 2, 514) * 40 + t * (1.5 + h(k, 3, 514) * 2)) % 40)), x = Math.round(24 + (y - 100) * 0.9 + h(k, 1, 514) * 40 + Math.sin(t * 0.4 + k) * 3); if (Math.sin(t * 1.6 + k * 1.7) > 0.1) d_aclara(R, x, y, C.blanco, 0.6); }
  // los apliques de la pared, que dan luz
  for (const x of [80, 198]) { rect(x - 1, 40, x + 1, 48, d_C.latonS); disco(x, 38, 3, K); disco(x, 38, 2, hex('#fff0b0')); pset(x - 1, 37, C.blanco); }
}

// la vida del palacio de 2193: el reactor de lodo, los estandartes, los humanos de las jaulas, el guardián del rellano
function d_vida2193(R, t) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  // el reactor de lodo en la boca de la chimenea: el depósito de cristal, el lodo que sube y baja, burbujas y el resplandor
  const [b0, e0, b1] = d_G.boca, nivel = 98 + Math.round(Math.sin(t * 1.3) * 2);
  rect(b0 + 3, e0 + 2, b1 - 3, 116, hex('#14281a')); rect(b0 + 3, nivel, b1 - 3, 116, C.lodo); rect(b0 + 3, nivel, b1 - 3, nivel, C.lodoL); for (let x = b0 + 3; x < b1 - 3; x += 2) if ((x + Math.floor(t * 6)) % 5 === 0) pset(x, nivel + 1, C.lodoL);
  for (let k = 0; k < 6; k++) { const u = (t * 0.7 + h(k, 1, 515)) % 1, x = Math.round(b0 + 8 + h(k, 2, 515) * 22 + Math.sin(u * 9 + k) * 1.5), y = Math.round(115 - u * (115 - nivel)); disco(x, y, 1.2, C.lodoS); pset(x, y - 1, C.lodoL); }
  rect(b0 + 3, e0 + 2, b0 + 4, 116, hex('#c8f0d8')); rect(b1 - 6, e0 + 2, b1 - 6, 116, hex('#4a8a5a'));
  const pulso = 0.12 + 0.08 * Math.sin(t * 2.6); for (let y = 100; y < 160; y++) for (let x = b0 - 4 + ((y + 1) & 1); x <= b1 + 4; x += 2) d_aclara(R, x, y, C.lodo, pulso * (1 - (y - 100) / 60));
  // los tubos de la repisa que burbujean
  for (const x of [132, 188]) { const u = (t * 1.4 + x) % 1; pset(x, Math.round(71 - u * 11), d_C.neon); pset(x, Math.round(66 - u * 6), C.lodoL); }
  // los estandartes morados con el emblema, que ondean
  for (const [x0, y0, w, hgt] of [[74, 22, 12, 46], [194, 22, 8, 40], [244, 20, 14, 26]]) {
    rect(x0 - 2, y0 - 2, x0 + w + 2, y0, K); rect(x0 - 1, y0 - 1, x0 + w + 1, y0 - 1, d_C.laton);
    for (let i = 0; i <= w; i++) { const o = Math.round(Math.sin(t * 2.4 + i * 0.5 + x0) * 1.2), fin = y0 + hgt + o + (i === 0 || i === w ? 0 : i < w / 2 ? i : w - i) % 3; for (let y = y0 + 1; y <= fin; y++) pset(x0 + i, y, i === 0 || i === w || y === fin ? C.k : (i + Math.round(Math.sin(t * 2.4 + i * 0.5) * 2)) % 5 === 0 ? C.moradoS : y < y0 + 4 ? C.moradoL : C.morado); }
    if (w >= 10) d_emblema(R, x0 + w / 2, y0 + 14 + Math.round(Math.sin(t * 2.4 + x0) * 1), 1, C.moradoS, d_C.neon);
    else { pset(x0 + w / 2, y0 + 10, d_C.neon); pset(x0 + w / 2, y0 + 11, d_C.neon); } }
  // los humanos de las jaulas: uno saluda, otro come caramelos, otro balancea los pies sentado en la almohada
  d_persona(R, 30, 124, t, { ropa: hex('#d8783a'), pelo: hex('#2a1a12'), saluda: true, dir: 1 });
  d_persona(R, 46, 124, t, { ropa: hex('#3a8a6a'), pelo: hex('#e0b860'), sentado: true, dir: -1 }); if (Math.sin(t * 3) > 0.3) pset(42, 117, C.rojo);
  d_persona(R, 74, 124, t + 2, { ropa: hex('#5a6ad8'), pelo: hex('#8a4a2a'), sentado: true, dir: 1 }); for (const dx of [-1, 1]) pset(74 + dx, 125 + (Math.sin(t * 6 + dx) > 0 ? 1 : 0), hex('#3a3040'));
  d_persona(R, 88, 124, t, { ropa: hex('#e8e0c8'), pelo: hex('#5a5a6a'), bota: true, dir: -1 });
  // los barrotes de las jaulas, por delante de los humanos: la cúpula y el aro de arriba con su gancho
  for (const cx of [38, 80]) { for (let x = cx - 17; x <= cx + 17; x += 4) { const top = 96 + Math.round((1 - Math.sqrt(Math.max(0, 1 - ((x - cx) / 18) ** 2))) * 14); linea(x, top, x, 129, K); linea(x + 1, top, x + 1, 129, d_C.laton); }
    for (let i = -18; i <= 18; i++) { const y = 96 + Math.round((1 - Math.sqrt(Math.max(0, 1 - (i / 18) ** 2))) * 14); pset(cx + i, y, d_C.latonS); pset(cx + i, y - 1, K); }
    rect(cx - 18, 113, cx + 18, 114, d_C.latonS); rect(cx - 18, 113, cx + 18, 113, d_C.latonL); disco(cx, 93, 2.5, K); disco(cx, 93, 1.5, d_C.laton); }
  // el guardián que patrulla el rellano
  const g = (t * 9) % 60, gx = Math.round(g < 30 ? 300 + g * 0.6 : 336 - g * 0.6); d_tentaculito(R, gx, 64, t, 'morado', { lanza: true, dir: g < 30 ? 1 : -1 });
  d_robot(R, t, 60, 250, 176);
  // la puerta: los pilotos del panel
  for (let k = 0; k < 3; k++) pset(117, 80 + k * 3, Math.floor(t * 3 + k) % 3 === 0 ? d_C.neon : d_C.neonD);
  // los reflejos en el suelo brillante
  for (let y = 120; y < 136; y += 2) { const x = 213 + Math.round(Math.sin(t + y) * 1); pset(x, y, d_C.vioL); }
}

// el robot que friega el suelo del palacio (2193): va y viene entre xa y xb sobre la línea y, deja un brillo húmedo
// detrás y le parpadea el piloto
function d_robot(R, t, xa, xb, y) {
  const K = C.k, L = xb - xa, u = (t * 14) % (2 * L), d = u < L ? 1 : -1, x = Math.round(u < L ? xa + u : xb - (u - L));
  for (let i = 4; i < 22; i += 2) R.pset(x - d * i, y + 1, d_mezcla(R.pget(x - d * i, y + 1), C.blanco, 0.25 * (1 - i / 22)));
  R.rect(x - 7, y - 4, x + 7, y, K); R.rect(x - 6, y - 5, x + 6, y - 1, K); R.rect(x - 6, y - 4, x + 6, y - 1, d_C.vioL); R.rect(x - 6, y - 4, x + 6, y - 4, C.moradoL); R.rect(x - 2, y - 7, x + 2, y - 5, K); R.rect(x - 1, y - 7, x + 1, y - 6, d_C.plasL);
  R.pset(x + 5 * d, y - 3, Math.floor(t * 4) % 2 ? d_C.neon : d_C.neonD); const r = Math.round(t * 20) % 3; R.pset(x + 7 * d, y - 1 + (r === 0 ? 0 : -1), d_C.metalL ?? C.metalL); R.pset(x + 8 * d, y - (r === 1 ? 0 : 1), C.blanco);
}

// lo que se ve por la ventana de cada época, dentro de (x0, y0)–(x1, y1) (lo recorta R.recorte del que llama)
function d_vista(R, t, era, x0, y0, x1, y1, o = {}) {
  const { pset, disco, linea, poligono, rect } = R, K = C.k, W = x1 - x0, H = y1 - y0;
  if (era === 1793) {
    const fl = d_flash(t, o);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const g = (y - y0) / H + (h(x >> 1, y >> 1, 516) - 0.5) * 0.18; pset(x, y, fl > 0 ? (g < 0.5 ? d_C.tor4 : d_C.tor3) : g < 0.3 ? d_C.tor0 : g < 0.62 ? d_C.tor1 : d_C.tor2); }
    for (let k = 0; k < 5; k++) { const v = [3, 5, 8][k % 3], w = 14 + (k % 3) * 6, x = x0 - 20 + ((h(k, 1, 517) * (W + 40) + t * v) % (W + 40)), y = y0 + 4 + k * 5; d_nube(R, x, y, w, fl ? [d_C.tor3, d_C.tor4, hex('#a8b0d0')] : [d_C.tor0, d_C.tor2, d_C.tor3]); }
    // la cometa a lo lejos, con su cola
    const kx = Math.round(x0 + W * 0.7 + Math.sin(t * 1.3) * 3), ky = Math.round(y0 + H * 0.28 + Math.sin(t * 2.1) * 2);
    poligono([[kx, ky - 3], [kx + 2, ky], [kx, ky + 3], [kx - 2, ky]], fl ? C.blanco : hex('#c8b890')); linea(kx, ky + 3, kx - 3, ky + 9, d_C.tor4);
    if (fl) d_rayo(R, kx + 3, y0, kx, ky - 3, Math.floor(t / 5.3));
    // el pueblo: tejados, el campanario y ventanas encendidas
    const yb = y1 - Math.round(H * 0.22);
    for (let x = x0; x <= x1; x++) { const tj = yb - Math.round(Math.abs(((x * 3) % 22) - 11) * 0.5) - (h(x >> 4, 1, 518) < 0.5 ? 4 : 0); for (let y = tj; y <= y1; y++) pset(x, y, fl ? d_C.tor2 : K); }
    const cx = x0 + Math.round(W * 0.3); poligono([[cx - 3, yb - 4], [cx, yb - 18], [cx + 3, yb - 4]], fl ? d_C.tor2 : K); rect(cx - 3, yb - 6, cx + 3, y1, fl ? d_C.tor2 : K);
    for (let k = 0; k < 6; k++) { const wx = x0 + 3 + Math.round(h(k, 4, 518) * (W - 6)), wy = yb + 2 + Math.round(h(k, 5, 518) * 6); if (Math.sin(t * 0.5 + k * 2) > -0.6) pset(wx, wy, d_C.velaS); }
    d_lluvia(R, t, x0, y0, x1, y1, Math.round(W * H / 55));
    // las gotas que resbalan por el cristal
    for (let k = 0; k < 4; k++) { const gx = x0 + 4 + Math.round(h(k, 6, 518) * (W - 8)), gy = y0 + Math.round(((t * 9 + h(k, 7, 518) * H) % H)); pset(gx, gy, d_C.tor4); pset(gx, gy - 1, d_C.lluvia); }
  } else if (era === 1993) {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const g = (y - y0) / H + (h(x >> 1, y >> 1, 519) - 0.5) * 0.12; pset(x, y, g < 0.25 ? d_C.cielo1 : g < 0.45 ? ((x + y) & 1 ? d_C.cielo1 : d_C.cielo2) : d_C.cielo2); }
    for (let k = 0; k < 4; k++) { const v = [2, 4, 7][k % 3], w = 10 + (k % 3) * 5, x = x0 - 16 + ((h(k, 1, 520) * (W + 32) + t * v) % (W + 32)), y = y0 + 6 + k * 6; d_nube(R, x, y, w, [hex('#b8cce2'), hex('#e2ecf6'), C.blanco]); }
    const yh = y0 + Math.round(H * 0.6);
    // el seto, el árbol que se mece y el césped
    for (let x = x0; x <= x1; x++) for (let y = yh - 3 - Math.round(h(x >> 1, 1, 521) * 2); y <= y1; y++) pset(x, y, y < yh + 1 ? ((x + y) % 3 ? hex('#2e6a2a') : hex('#3e8a3a')) : (h(x, y, 522) < 0.15 ? d_C.cespedS : (x + y) % 5 === 0 ? d_C.cespedL : d_C.cesped));
    const m = Math.round(Math.sin(t * 1.2) * 1); R.rect(x0 + 6, yh - 10, x0 + 7, yh, C.cortezaS);
    for (const [dx, dy, r] of [[0, -16, 6], [-4, -12, 4], [4, -12, 4]]) { disco(x0 + 6 + dx + m, yh + dy + 1, r, hex('#2e6a2a')); disco(x0 + 6 + dx + m - 1, yh + dy, r * 0.7, hex('#4a9a3a')); }
    // los tres retretes portátiles del jardín, diminutos, con su reloj
    for (let k = 0; k < 3; k++) { const rx = x0 + 18 + k * 9, ry = yh + 6 + (k & 1); rect(rx - 3, ry - 10, rx + 3, ry, K); rect(rx - 2, ry - 9, rx + 2, ry - 1, d_C.plas); rect(rx - 2, ry - 9, rx - 2, ry - 1, d_C.plasL); rect(rx - 2, ry - 10, rx + 2, ry - 10, C.blanco); pset(rx, ry - 12, C.blanco); pset(rx, ry - 11, K); if (Math.floor(t * 2 + k) % 3 === 0) pset(rx + 2, ry - 13, C.rojo); }
    // dos pájaros que cruzan
    for (let k = 0; k < 2; k++) { const u = ((t * 12 + k * 9) % (W + 40)) - 20, x = Math.round(x0 + u), y = y0 + 10 + k * 4 + Math.round(Math.sin(t * 3 + k) * 2), a = Math.floor(t * 6 + k) % 2; pset(x, y, K); pset(x - 1, y - a, K); pset(x + 1, y - a, K); }
  } else {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const g = (y - y0) / H + (h(x >> 1, y >> 1, 523) - 0.5) * 0.14; pset(x, y, g < 0.3 ? d_C.fut0 : g < 0.5 ? d_C.fut1 : g < 0.7 ? d_C.fut2 : g < 0.85 ? d_C.fut3 : d_C.fut4); }
    for (let k = 0; k < 10; k++) { const sx = x0 + Math.round(h(k, 1, 524) * W), sy = y0 + Math.round(h(k, 2, 524) * H * 0.35); if (Math.sin(t * 2 + k * 3) > -0.3) pset(sx, sy, C.blanco); }
    // el planeta con anillo
    const px = x0 + Math.round(W * 0.72), py = y0 + Math.round(H * 0.2); disco(px, py, 6, d_C.rosaN); disco(px - 1, py - 1, 4, hex('#f888d8')); linea(px - 10, py + 3, px + 10, py - 2, hex('#f0c8e8'));
    // las torres con forma de tentáculo (dos ventanas como ojos) y las luces
    const yb = y1;
    for (const [tx, th, w] of [[0.15, 0.62, 5], [0.42, 0.78, 6], [0.62, 0.5, 4], [0.86, 0.7, 6]]) { const cx = x0 + Math.round(W * tx), top = yb - Math.round(H * th);
      disco(cx, top + w, w, d_C.torre); rect(cx - w, top + w, cx + w, yb, d_C.torre); rect(cx - w, top + w, cx - w + 1, yb, d_C.torreL); rect(cx - w - 1, yb - 2, cx + w + 1, yb, d_C.torre);
      pset(cx - 2, top + w, d_C.neon); pset(cx + 2, top + w, d_C.neon); for (let y = top + w + 6; y < yb - 2; y += 4) if (Math.sin(t + y + cx) > -0.2) pset(cx + ((y >> 2) % 2 ? 1 : -2), y, d_C.fut4); }
    // los platillos que cruzan
    for (let k = 0; k < 2; k++) { const u = ((t * (14 + k * 8) + k * 30) % (W + 30)) - 15, x = Math.round(k ? x1 - u : x0 + u), y = y0 + Math.round(H * (0.35 + k * 0.2)) + Math.round(Math.sin(t * 2 + k) * 2);
      R.rect(x - 4, y, x + 4, y + 1, d_C.metal ?? C.metal); disco(x, y - 1, 2, d_C.plasL); pset(x - 4 + Math.floor(t * 8) % 9, y + 1, d_C.neon); }
  }
}

function d_escritorio(R, t, o = {}) {
  R.copiar(d_capa(R, 'escritorio', () => d_escritorioFijo(R)));
  const { rect, pset, poligono, linea, disco } = R, K = C.k, fl = d_flash(t, o);
  const v = [40, 30, 118, 104];
  R.recorte(v); d_vista(R, t, 1793, v[0], v[1], v[2], v[3], o); R.recorte(null);
  // el parteluz de cuarterones pequeños
  for (let x = v[0] + 13; x < v[2]; x += 13) rect(x, v[1], x, v[3], d_C.robleS); for (let y = v[1] + 15; y < v[3]; y += 15) rect(v[0], y, v[2], y, d_C.robleS); rect(78, v[1], 80, v[3], d_C.roble); rect(78, v[1], 78, v[3], d_C.robleL);
  // las cortinas pesadas que se mueven con la corriente
  for (const [a, b, s] of [[24, 40, 1], [118, 134, -1]]) for (let y = 22; y < 128; y++) { const ond = Math.round(Math.sin(t * 1.7 + y * 0.09) * (y > 100 ? 1.5 : 0.6)); for (let x = a; x <= b; x++) { const pl = (x - a + Math.round(y * 0.02 * s)) % 5; pset(x + ond * (x === a || x === b ? 0 : 1), y, pl === 0 ? hex('#5a1e28') : pl === 4 ? hex('#a84a54') : hex('#7e2a36')); } }
  rect(20, 18, 138, 21, K); rect(21, 19, 137, 20, d_C.latonS); disco(20, 20, 3, d_C.laton); disco(138, 20, 3, d_C.laton);
  // el candelabro de tres brazos
  const llama = (x, y, k) => { const f = Math.round(Math.sin(t * 11 + k * 2) * 0.6); pset(x + f, y - 2, d_C.vela); pset(x, y - 1, d_C.velaS); pset(x, y, d_C.vela); pset(x + f, y - 3, C.naranja); };
  for (const [x, y] of [[150, 100], [156, 96], [162, 100]]) { rect(x - 1, y, x + 1, y + 9, d_C.cera); pset(x + 1, y + 2, d_C.ceraS); llama(x, y - 1, x); if (Math.sin(t * 2 + x) > 0.4) pset(x + 1, y + 1 + Math.floor(t * 3 + x) % 6, d_C.ceraS); }
  for (let y = 80; y < 128; y++) for (let x = 130 + ((y) & 1); x < 186; x += 2) { const d = Math.hypot(x - 156, (y - 98) * 1.3); if (d < 30) d_aclara(R, x, y, d_C.vela, 0.18 * (1 - d / 30) * (0.85 + 0.15 * Math.sin(t * 9))); }
  // la pluma que escribe sola en el tintero (y la línea de tinta que crece en el pergamino)
  const u = (t % 5) / 5, lx = 172 + Math.round(u * 24), ly = 119 + Math.round(Math.sin(t * 14) * 0.6);
  for (let i = 0; i < Math.round(u * 24); i++) pset(172 + i, 120 + (i % 3 === 0 ? 0 : 1) * 0, K);
  linea(lx, ly, lx + 6, ly - 10, C.blanco); linea(lx + 1, ly, lx + 7, ly - 10, d_C.pelucaS); pset(lx + 7, ly - 11, C.blanco); pset(lx, ly + 1, K);
  // el gato en la alfombra: respira y mueve la cola
  const gx = 72, gy = 160, cola = Math.round(Math.sin(t * 2) * 3);
  disco(gx, gy - 3, 5, K); rect(gx - 7, gy - 5, gx + 5, gy, K); disco(gx, gy - 3, 4, hex('#d8823a')); rect(gx - 6, gy - 4, gx + 4, gy - 1, hex('#d8823a')); for (let x = gx - 5; x < gx + 4; x += 3) pset(x, gy - 4, hex('#a85a24'));
  disco(gx - 8, gy - 4, 3, K); disco(gx - 8, gy - 4, 2.2, hex('#d8823a')); pset(gx - 10, gy - 7, K); pset(gx - 7, gy - 7, K); pset(gx - 9, gy - 4, K);
  linea(gx + 5, gy - 2, gx + 10, gy - 4 + cola, K); linea(gx + 5, gy - 3, gx + 9, gy - 5 + cola, hex('#d8823a'));
  if (Math.sin(t * 1.3) > 0.6) pset(gx + 1, gy - 9 - Math.floor(t * 2) % 3, C.blanco);
  // la luz del relámpago por el ventanal
  if (fl > 0) for (let y = 104; y < 180; y++) { const d = Math.round((y - 104) * 0.5); for (let x = 40 + d; x <= 118 + d; x++) if ((x + y) & 1) d_aclara(R, x, y, d_C.rayo, 0.3 * fl); }
  return { suelo: 152, pies: [60, 206, 240], ventana: v, mesa: [140, 122, 226, 125], tintero: [168, 118], pergamino: [170, 118, 200, 122], centro: 170 };
}

// lo fijo del escritorio de 1793: la pared de yeso y roble, el ventanal, el escritorio con sus cosas, la librería y la alfombra
function d_escritorioFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k;
  rect(0, 0, 319, 17, d_C.robleD); for (let x = 10; x < 320; x += 34) { rect(x, 6, x + 11, 17, d_C.robleS); rect(x, 6, x + 11, 6, d_C.roble); }
  for (let y = 18; y < 128; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 540), m = h(x >> 3, y >> 3, 541); let c = n < 0.1 ? d_C.yesoS : n > 0.94 ? d_C.yesoL : d_C.yeso; if (m < 0.2 && (x + y) & 1) c = d_C.yesoS; pset(x, y, d_mezcla(c, C.k, Math.min(0.4, Math.abs(x - 156) / 400 + 0.08))); }
  for (const x of [0, 236]) { rect(x, 18, x + 6, 127, d_C.roble); rect(x, 18, x, 127, d_C.robleL); rect(x + 6, 18, x + 6, 127, d_C.robleS); }
  rect(0, 18, 319, 23, d_C.roble); rect(0, 18, 319, 18, d_C.robleL); rect(0, 23, 319, 23, d_C.robleS);
  // el zócalo
  for (let y = 112; y < 128; y++) for (let x = 0; x < 320; x++) { const b = x % 7; pset(x, y, b === 0 ? d_C.pinoD : h(x, y >> 1, 542) < 0.12 ? d_C.pinoS : d_C.pino); } rect(0, 111, 319, 112, d_C.roble);
  // el suelo de tablones y la alfombra trenzada
  for (let f = 0; f < 7; f++) { const ya = [128, 132, 137, 143, 151, 160, 170, 180][f], yb = [128, 132, 137, 143, 151, 160, 170, 180][f + 1] - 1, w = 30 + f * 10;
    for (let y = ya; y <= yb; y++) for (let x = 0; x < 320; x++) { const b = (x + f * 41) % w; pset(x, y, b === 0 || y === yb ? d_C.pinoD : y === ya ? d_C.pinoL : h((x + f * 41) >> 2, y, 543) < 0.18 ? d_C.pinoS : d_mezcla(d_C.pino, C.k, (6 - f) * 0.03)); } }
  for (let y = -12; y <= 12; y++) for (let x = -56; x <= 56; x++) { const d = Math.hypot(x / 56, y / 12); if (d > 1) continue; const a = Math.floor(d * 6); pset(80 + x, 162 + y, d > 0.96 ? hex('#5a2a1a') : (x + a) % 3 === 0 ? hex('#5a2a1a') : [hex('#a84a2a'), hex('#c8984a'), hex('#4a6a5a')][a % 3]); }
  // el ventanal
  rect(34, 24, 124, 110, K); rect(35, 25, 123, 109, d_C.roble); rect(35, 25, 123, 25, d_C.robleL); rect(38, 28, 120, 106, d_C.robleS); rect(30, 106, 128, 111, d_C.roble); rect(30, 106, 128, 106, d_C.robleL); rect(30, 111, 128, 111, d_C.robleD);
  // la librería de la derecha (por debajo de la zona de Atom)
  rect(246, 46, 318, 152, K); rect(247, 47, 317, 151, d_C.robleS); rect(247, 47, 317, 50, d_C.roble);
  for (const y of [70, 94, 118, 142]) { rect(248, y, 316, y + 2, d_C.roble); rect(248, y, 316, y, d_C.robleL); }
  for (const [y0, y1] of [[51, 69], [73, 93], [97, 117], [121, 141]]) { let x = 250; while (x < 312) { const w = 3 + Math.floor(h(x, y0, 544) * 4), hh = y1 - y0 - Math.floor(h(x, y0, 545) * 6), col = [hex('#7a2a2a'), hex('#2a4a6a'), hex('#4a5a2a'), hex('#6a4a2a'), hex('#8a6a3a')][Math.floor(h(x, y0, 546) * 5)];
    if (h(x, y0, 547) < 0.12) { poligono([[x, y1], [x + 3, y1], [x + 11, y1 - hh + 3], [x + 8, y1 - hh + 1]], K); poligono([[x + 1, y1], [x + 3, y1], [x + 10, y1 - hh + 3], [x + 8, y1 - hh + 2]], col); x += 12; continue; }
    rect(x, y1 - hh, x + w, y1, K); rect(x + 1, y1 - hh + 1, x + w - 1, y1, col); pset(x + 1, y1 - hh + 3, d_C.latonS); pset(x + 1, y1 - 3, d_C.latonS); x += w + 1; } }
  // el escritorio (tablero de y 122 a 125, patas hasta 146): libros, el globo, el tintero, el pergamino y la silla
  rect(136, 121, 230, 126, K); rect(137, 122, 229, 124, d_C.robleL); rect(137, 122, 229, 122, hex('#b07a48')); rect(137, 125, 229, 125, d_C.robleS);
  rect(140, 126, 226, 132, K); rect(141, 126, 225, 131, d_C.roble); for (const x of [160, 200]) { rect(x, 128, x + 14, 130, d_C.robleS); disco(x + 7, 129, 1, d_C.laton); }
  for (const x of [142, 222]) { rect(x - 2, 132, x + 2, 146, K); rect(x - 1, 132, x + 1, 145, d_C.roble); pset(x - 1, 136, d_C.robleL); pset(x - 1, 141, d_C.robleL); disco(x, 146, 2, K); }
  rect(154, 109, 158, 121, K); rect(155, 109, 157, 120, hex('#a8a8b0')); rect(148, 108, 164, 110, K); rect(149, 108, 163, 109, hex('#c8c8d0')); rect(150, 119, 162, 121, K); rect(151, 119, 161, 120, hex('#a8a8b0'));
  poligono([[170, 117], [201, 116], [203, 121], [171, 122]], d_C.cera); for (let y = 118; y < 121; y += 2) linea(174, y + 1, 198, y, d_C.ceraS); rect(198, 116, 203, 117, d_C.ceraS);
  rect(166, 115, 170, 121, K); rect(167, 116, 169, 120, hex('#2a2a3a')); pset(167, 116, hex('#6a6a7a'));
  for (const [y, w, col] of [[118, 16, hex('#7a2a2a')], [114, 14, hex('#2a4a6a')], [110, 15, hex('#4a5a2a')]]) { rect(206, y, 206 + w, y + 3, K); rect(207, y + 1, 205 + w, y + 2, col); rect(205 + w, y + 1, 205 + w, y + 2, d_C.cera); }
  disco(217, 98, 8, K); disco(217, 98, 7, hex('#3a7aa8')); for (const [dx, dy, r] of [[-3, -2, 2.5], [2, 2, 3], [3, -4, 1.5]]) disco(217 + dx, 98 + dy, r, hex('#8aa85a')); pset(214, 94, C.blanco);
  linea(208, 98, 226, 98, d_C.latonS); for (let a = 0; a < 6.3; a += 0.2) pset(Math.round(217 + Math.cos(a) * 9), Math.round(98 + Math.sin(a) * 9), d_C.laton); rect(216, 107, 218, 110, d_C.latonS); rect(213, 110, 221, 110, d_C.laton);
  // la silla de respaldo alto, por delante a la derecha del escritorio
  rect(186, 108, 190, 148, K); rect(187, 109, 189, 147, d_C.roble); rect(186, 108, 204, 112, K); rect(187, 109, 203, 111, d_C.robleL); rect(200, 108, 204, 148, K); rect(201, 109, 203, 147, d_C.roble);
  for (const x of [192, 196]) rect(x, 112, x + 1, 128, K); rect(185, 128, 205, 131, K); rect(186, 128, 204, 130, d_C.robleL);
  // un cuadro pequeño y el aplique entre el ventanal y la librería
  rect(180, 42, 222, 74, K); rect(181, 43, 221, 73, d_C.latonS); rect(183, 45, 219, 71, hex('#c8b890')); poligono([[183, 62], [195, 52], [205, 60], [212, 54], [219, 62], [219, 71], [183, 71]], hex('#6a8a5a')); disco(210, 50, 3, hex('#f0e0a0'));
}

function d_tejado(R, t, o = {}) {
  const { rect, pset, poligono, linea, disco } = R, K = C.k, fl = d_flash(t, o);
  R.copiar(d_capa(R, 'tejado', () => d_tejadoFijo(R)));
  // el cielo de tormenta vivo: nubes a tres velocidades
  for (let k = 0; k < 9; k++) { const v = [3, 6, 10][k % 3], w = 26 + (k % 3) * 12, x = -40 + ((h(k, 1, 550) * 400 + t * v) % 400), y = 18 + (k % 4) * 12 + (k % 3) * 4; d_nube(R, x, y, w, fl ? [d_C.tor3, d_C.tor4, hex('#b8c0e0')] : [d_C.tor0, d_C.tor2, d_C.tor3]); }
  // la cometa (rombo con su cruceta, la cola de lazos) y el hilo hasta la mano, con la llave colgada
  const kx = Math.round(196 + Math.sin(t * 1.1) * 6), ky = Math.round(58 + Math.sin(t * 1.7) * 4), [mx, my] = o.mano ?? [146, 128];
  const mitad = [(kx + mx) / 2 + 6, (ky + my) / 2 + 10];
  let ax = kx, ay = ky + 8; for (let i = 1; i <= 16; i++) { const u = i / 16, x = Math.round((1 - u) * (1 - u) * kx + 2 * u * (1 - u) * mitad[0] + u * u * mx), y = Math.round((1 - u) * (1 - u) * (ky + 8) + 2 * u * (1 - u) * mitad[1] + u * u * my); linea(ax, ay, x, y, fl ? C.blanco : hex('#d8d0c0')); ax = x; ay = y; }
  const lu = 0.62, lx = Math.round((1 - lu) * (1 - lu) * kx + 2 * lu * (1 - lu) * mitad[0] + lu * lu * mx), ly = Math.round((1 - lu) * (1 - lu) * (ky + 8) + 2 * lu * (1 - lu) * mitad[1] + lu * lu * my);
  disco(lx, ly + 2, 2, K); disco(lx, ly + 2, 1.2, d_C.laton); rect(lx, ly + 4, lx, ly + 8, K); pset(lx + 1, ly + 7, K); pset(lx, ly + 3, d_C.latonL);   // la llave
  for (let i = 0; i < 6; i++) { const tx = kx - 2 - i * 4 + Math.round(Math.sin(t * 6 + i) * 2), ty = ky + 10 + i * 4; pset(tx, ty, K); pset(tx - 1, ty - 1, C.rojo); pset(tx + 1, ty - 1, C.rojo); if (i > 0) linea(tx, ty, kx - 2 - (i - 1) * 4 + Math.round(Math.sin(t * 6 + i - 1) * 2), ty - 4, K); }
  poligono([[kx, ky - 11], [kx + 8, ky], [kx, ky + 9], [kx - 8, ky]], K); poligono([[kx, ky - 10], [kx + 7, ky], [kx, ky + 8], [kx - 7, ky]], hex('#e8dcc0')); poligono([[kx, ky - 10], [kx + 7, ky], [kx, ky]], hex('#c8b890'));
  linea(kx, ky - 10, kx, ky + 8, d_C.robleS); linea(kx - 7, ky, kx + 7, ky, d_C.robleS); linea(kx, ky - 13, kx, ky - 10, K);
  // el rayo cae en la cometa y baja chispeando por el hilo
  if (fl > 0) { d_rayo(R, kx + 18, 0, kx, ky - 12, Math.floor(t / 5.3));
    for (let k = 0; k < 8; k++) { const u = (k / 8 + t * 3) % 1, x = Math.round((1 - u) * (1 - u) * kx + 2 * u * (1 - u) * mitad[0] + u * u * mx), y = Math.round((1 - u) * (1 - u) * (ky + 8) + 2 * u * (1 - u) * mitad[1] + u * u * my); pset(x + 1, y - 1, C.amarillo); pset(x - 1, y + 1, C.blanco); }
    for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 10; linea(lx, ly + 4, lx + Math.round(Math.cos(a) * 5), ly + 4 + Math.round(Math.sin(a) * 5), C.amarillo); } }
  // la lluvia, el humo de las chimeneas doblado por el viento y la veleta que gira
  d_lluvia(R, t, 0, 0, 319, 179, 160, 1);
  for (const [cx, cy] of [[46, 98], [274, 104]]) for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1; disco(Math.round(cx + u * 30 + Math.sin(u * 6 + k) * 2), Math.round(cy - u * 16), 1.5 + u * 2.5, u < 0.5 ? hex('#8a8a96') : hex('#6a6e80')); }
  const va = Math.sin(t * 0.9) * 1.2 + t * 0.3; linea(110, 96, 110, 108, K); linea(Math.round(110 - Math.cos(va) * 7), 98, Math.round(110 + Math.cos(va) * 7), 98, K); poligono([[Math.round(110 + Math.cos(va) * 7), 96], [Math.round(110 + Math.cos(va) * 10), 98], [Math.round(110 + Math.cos(va) * 7), 100]], K); pset(110, 95, d_C.laton);
  // los charcos de la azotea, con anillos de gotas
  for (let k = 0; k < 5; k++) { const x = [60, 120, 180, 230, 280][k], u = (t * 1.6 + k * 0.37) % 1, r = Math.round(u * 4); linea(x - r, 166 + (k & 1) * 6, x + r, 166 + (k & 1) * 6, u < 0.6 ? d_C.tor4 : d_C.tor3); }
  if (fl > 0) for (let y = 120; y < 180; y += 1) for (let x = (y & 1); x < 320; x += 2) d_aclara(R, x, y, d_C.rayo, 0.2 * fl);
  return { suelo: 158, pies: [120, 146, 176], cometa: [kx, ky], llave: [lx, ly + 4], mano: [mx, my], barandilla: 150 };
}

// lo fijo del tejado: el cielo de tormenta tramado, el pueblo de noche al fondo, los tejados vecinos, la azotea de
// tablas con su barandilla de balaustres, dos chimeneas de ladrillo y el pararrayos aún por inventar (un palo con bola)
function d_tejadoFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const g = y / 120 + (h(x >> 1, y >> 1, 551) - 0.5) * 0.1; pset(x, y, g < 0.2 ? d_C.tor0 : g < 0.42 ? ((x + y) & 1 ? d_C.tor0 : d_C.tor1) : g < 0.65 ? d_C.tor1 : (x + y) & 1 ? d_C.tor1 : d_C.tor2); }
  // las colinas y el pueblo lejano con el campanario y las ventanas encendidas
  for (let x = 0; x < 320; x++) { const yc = 102 + Math.round(Math.sin(x * 0.03) * 5 + Math.sin(x * 0.011) * 6); for (let y = yc; y < 180; y++) pset(x, y, hex('#1a1e30')); }
  for (let x = 0; x < 320; x++) { const yt = 110 - Math.round(Math.abs(((x * 2) % 26) - 13) * 0.5) - (h(x >> 4, 1, 552) < 0.4 ? 6 : 0); for (let y = yt; y < 180; y++) pset(x, y, hex('#141626')); }
  poligono([[226, 112], [232, 76], [238, 112]], hex('#141626')); rect(228, 96, 236, 112, hex('#141626')); pset(232, 74, d_C.latonS); pset(232, 100, d_C.velaS);
  for (let k = 0; k < 26; k++) pset(Math.round(h(k, 1, 553) * 319), 108 + Math.round(h(k, 2, 553) * 10), d_C.velaS);
  // el tejado de la casa: tejas de madera en hileras, el caballete, y la azotea de tablas
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 118) / 4), b = (x + f * 3) % 8; pset(x, y, y < 150 ? ((y - 118) % 4 === 0 ? hex('#2a1e1a') : b === 0 ? hex('#2a1e1a') : h(x >> 3, f, 554) < 0.3 ? hex('#5a4234') : hex('#4a362a')) : (x % 16 === 0 || y === 150 ? d_C.robleD : (h(x >> 2, y, 555) < 0.2 ? d_C.robleS : d_C.roble))); }
  rect(0, 117, 319, 119, K); rect(0, 118, 319, 118, hex('#6a5444'));
  for (let y = 152; y < 180; y += 6) rect(0, y, 319, y, d_C.robleD);
  // la barandilla de la azotea (detrás de los pies, delante del tejado)
  rect(0, 130, 319, 133, K); rect(0, 131, 319, 132, d_C.robleL); for (let x = 4; x < 320; x += 8) { rect(x, 133, x + 2, 150, K); rect(x + 1, 134, x + 1, 149, d_C.roble); disco(x + 1, 141, 1.5, d_C.roble); }
  // las dos chimeneas de ladrillo
  for (const [x0, y0] of [[36, 100], [264, 106]]) { rect(x0, y0, x0 + 20, 132, K); for (let y = y0 + 1; y < 132; y++) for (let x = x0 + 1; x < x0 + 20; x++) { const f = (y - y0) >> 2; pset(x, y, (y - y0) % 4 === 0 || (x + (f & 1) * 3) % 6 === 0 ? hex('#3a2420') : h(x / 6 | 0, f, 556) < 0.3 ? C.ladrilloS : C.ladrillo); } rect(x0 - 2, y0 - 3, x0 + 22, y0, K); rect(x0 - 1, y0 - 2, x0 + 21, y0 - 1, hex('#6a5a5a')); }
  // el palo de la veleta con su base
  rect(106, 108, 114, 118, K); rect(107, 109, 113, 117, hex('#3a3a44'));
}

function d_jardin(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  R.copiar(d_capa(R, 'jardin', () => d_jardinFijo(R)));
  // las nubes de tres tonos en tres capas a tres velocidades (lejos: pequeñas y lentas; cerca: grandes y rápidas); las
  // de arriba se deshacen en el cielo antes de la zona de Atom, las de abajo (y > 48) cruzan el cielo entero
  R.recorte([150, 0, 319, 100]);
  const CAPAS = [[2, 12, [20, 30], 4, [hex('#9ac4e6'), hex('#c8e0f4'), hex('#e8f2fa')], true], [4.5, 20, [40, 34], 3, [hex('#a8c4e0'), hex('#dceaf6'), C.blanco], true], [8, 28, [58, 72], 3, [hex('#9ab8d8'), hex('#e2ecf6'), C.blanco], false]];
  CAPAS.forEach(([v, w0, [ya, yb], n, cols, funde], c) => { for (let k = 0; k < n; k++) { const w = w0 + (k % 2) * 6, x = 140 + ((h(k, 1, 560 + c) * 220 + t * v) % 220), y = ya + ((k * 7) % Math.max(1, yb - ya + 1));
    const f = funde ? Math.max(0, Math.min(1, (x + w * 0.5 - 240) / 30)) : 0; if (f < 1) d_nube(R, x, y, w, cols.map((cc) => b_mezcla(cc, d_C.cielo1, f))); } });
  R.recorte(null);
  // los pájaros: tres sueltos y una bandada en uve que cruza baja (por debajo de la zona de Atom)
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 16 + k * 11) % 380) - 30), y = 30 + k * 3 + Math.round(Math.sin(t * 3 + k) * 2), a = Math.floor(t * 6 + k) % 2; if (x > 270 && y < 48) continue; pset(x, y, K); pset(x - 1, y - a, K); pset(x + 1, y - a, K); pset(x - 2, y - a, K); pset(x + 2, y - a, K); }
  { const bx0 = 340 - ((t * 22) % 420); for (const [k, dx, dy] of [[0, 0, 0], [1, 6, -3], [2, 12, -6], [3, 6, 3], [4, 12, 6]]) { const x = Math.round(bx0 + dx), y = Math.round(66 + dy + Math.sin(t * 1.3) * 2), a = Math.floor(t * 7 + k * 0.5) % 2;
    if (x < 150 || x > 319) continue; pset(x, y, hex('#2a3040')); pset(x - 1, y - a, hex('#2a3040')); pset(x + 1, y - a, hex('#2a3040')); } }
  // dos gorriones posados en el cable del teléfono que dan saltitos
  for (const [x, k] of [[196, 0], [203, 1]]) { const sal = Math.sin(t * 2.2 + k * 2.5) > 0.85 ? 1 : 0, y = Math.round(40 + (x - 150) / 126 * 16 + Math.sin(Math.PI * (x - 150) / 126) * 7) - 1 - sal;
    pset(x, y, hex('#6a4a32')); pset(x + 1, y, hex('#8a6440')); pset(x, y - 1, hex('#6a4a32')); pset(x + (k ? -1 : 1) * 1 + (k ? 0 : 1), y - 1, hex('#3a2a1e')); pset(x - 1, y, hex('#4a3424')); }
  // el gato que pasea por lo alto de la valla (se para a mirar, sigue)
  { const ciclo = (t * 7) % 230, para = ciclo > 100 && ciclo < 130, cx = Math.round(330 - (para ? 100 : ciclo < 100 ? ciclo : ciclo - 30)), cy = 96, p = para ? 0 : Math.floor(t * 6) % 2;
    if (cx > 148 && cx < 326) { const G = hex('#2a2a30'), GL = hex('#4a4a54'); rect(cx, cy - 4, cx + 7, cy - 2, G); rect(cx, cy - 4, cx + 7, cy - 4, GL); rect(cx - 3, cy - 6, cx, cy - 3, G); pset(cx - 3, cy - 7, G); pset(cx - 1, cy - 7, G); pset(cx - 2, cy - 5, para ? hex('#e8d84a') : G);
      pset(cx + 1, cy - 1 + p, G); pset(cx + 6, cy - 1 + (1 - p), G); const cola = Math.round(Math.sin(t * 2) * 1.5); linea(cx + 7, cy - 3, cx + 10, cy - 8 + cola, G); } }
  // mariposas que revolotean sobre el macizo de flores y el camino
  for (let k = 0; k < 3; k++) { const ox = [262, 300, 44][k], oy = [118, 120, 128][k], x = Math.round(ox + Math.sin(t * (0.7 + k * 0.2) + k * 2) * 14), y = Math.round(oy + Math.sin(t * (1.3 + k * 0.3) + k) * 5), a = Math.floor(t * 10 + k) % 2, c = [hex('#f0d040'), C.blanco, hex('#e8783a')][k];
    pset(x, y, K); pset(x - 1, y - a, c); pset(x + 1, y - a, c); pset(x - 1, y - 1 - a, c); pset(x + 1, y - 1 - a, c); }
  // las ventanas de la mansión: una cortina que se mueve y una luz
  for (let y = 40; y < 62; y++) { const o2 = Math.round(Math.sin(t * 1.4 + y * 0.2) * 1); pset(64 + o2, y, d_C.rosaS); pset(65 + o2, y, d_C.rosa); }
  // el aspersor que gira y su abanico de agua
  const sa = t * 2.2, sx = 268, sy = 150; rect(sx - 1, sy - 4, sx + 1, sy, K); pset(sx, sy - 5, C.metalL);
  for (let k = 0; k < 14; k++) { const u = ((t * 1.8 + k / 14) % 1), a = sa + k * 0.45, r = u * 26; const x = Math.round(sx + Math.cos(a) * r), y = Math.round(sy - 6 - Math.sin(u * Math.PI) * 12 + Math.sin(a) * r * 0.3); pset(x, y, u < 0.5 ? d_C.cielo3 : C.blanco); }
  // la pila de los pájaros, con el pájaro que se baña y salpica
  const bx = 34, by = 132; const bano = Math.sin(t * 5) > 0.2; pset(bx - 2, by - 4 - (bano ? 0 : 1), hex('#8a5a3a')); pset(bx - 1, by - 4 - (bano ? 0 : 1), hex('#8a5a3a')); pset(bx - 3, by - 5 - (bano ? 0 : 1), K); pset(bx, by - 5, hex('#c84a3a'));
  if (bano) { pset(bx - 5, by - 7, C.blanco); pset(bx + 2, by - 8, d_C.cielo3); }
  // la hierba que se mueve con el viento en primer término
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 561) * 319), y = 168 + Math.round(h(k, 2, 561) * 11), w = Math.round(Math.sin(t * 2 + x * 0.1) * 1.2); linea(x, y, x + w, y - 3, (k & 1) ? d_C.cespedS : d_C.cespedL); }
  // los tres retretes (por omisión, cerrados y quietos)
  const XS = [118, 162, 206], ret = o.retretes ?? true;
  if (ret) XS.forEach((x, i) => retrete(R, x, 150, t + i * 0.7, Array.isArray(ret) ? ret[i] ?? {} : { color: ['azul', 'verde', 'rojo'][i] }));
  return { suelo: 152, pies: [70, 140, 184, 240], retretes: XS.map((x) => [x, 150]), losa: [96, 144, 228, 154], fachada: 112, centro: 160 };
}
// lo fijo del jardín: el cielo de día tramado, la fachada de la mansión (tablas pintadas, ventanas con cortinas,
// el porche con sus columnas y la puerta), los setos recortados, el césped con flores, la losa de hormigón de los
// retretes con su cable y la pila de los pájaros
function d_jardinFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k;
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const g = y / 90 + (h(x >> 1, y >> 1, 562) - 0.5) * 0.08; pset(x, y, g < 0.3 ? d_C.cielo1 : g < 0.5 ? ((x + y) & 1 ? d_C.cielo1 : d_C.cielo2) : g < 0.8 ? d_C.cielo2 : (x + y) & 1 ? d_C.cielo2 : d_C.cielo3); }
  // la fachada de la mansión (tablas horizontales pintadas de lila, como de dibujo animado), de x 0 a 150, torcida
  for (let y = 27; y < 116; y++) { const inc = Math.round((116 - y) * 0.04); for (let x = 0; x < 150 - inc; x++) pset(x, y, (y - 26) % 5 === 0 ? hex('#7a6a9a') : (y - 26) % 5 === 1 ? hex('#c8b8e0') : h(x >> 3, y, 563) < 0.08 ? hex('#8a7aaa') : hex('#a898c8')); }
  poligono([[-4, 32], [154, 27], [150, 19], [-4, 22]], K); poligono([[-4, 30], [152, 26], [149, 21], [-4, 24]], hex('#5a3a6a')); for (let x = 0; x < 150; x += 4) pset(x, 26 - Math.round(x * 0.03), hex('#3a2448'));
  for (const [x0, y0] of [[22, 38], [56, 38], [100, 36]]) { rect(x0 - 2, y0 - 2, x0 + 20, y0 + 26, K); rect(x0 - 1, y0 - 1, x0 + 19, y0 + 25, C.blanco); rect(x0 + 1, y0 + 1, x0 + 17, y0 + 23, hex('#2a3a5a')); rect(x0 + 1, y0 + 1, x0 + 17, y0 + 9, hex('#5a7aa8')); rect(x0 + 9, y0 + 1, x0 + 9, y0 + 23, C.blanco); rect(x0 + 1, y0 + 12, x0 + 17, y0 + 12, C.blanco);
    rect(x0 - 5, y0 - 1, x0 - 3, y0 + 25, hex('#3a6a4a')); rect(x0 + 21, y0 - 1, x0 + 23, y0 + 25, hex('#3a6a4a')); for (let y = y0; y < y0 + 25; y += 3) { pset(x0 - 4, y, hex('#24442e')); pset(x0 + 22, y, hex('#24442e')); } rect(x0 - 3, y0 + 26, x0 + 21, y0 + 28, C.blanco); }
  rect(58, 40, 60, 61, d_C.rosaS);   // (la cortina que se mueve va encima)
  // el porche: columnas blancas, el tejadillo y la puerta
  rect(4, 76, 144, 80, K); rect(5, 77, 143, 79, C.blanco); for (const x of [8, 48, 92, 136]) { rect(x - 2, 80, x + 2, 116, K); rect(x - 1, 80, x + 1, 116, C.blanco); rect(x + 1, 80, x + 1, 116, d_C.cremaS); }
  rect(60, 86, 80, 116, K); rect(61, 87, 79, 116, hex('#7a2e4e')); d_cuarteron(R, 63, 89, 77, 100, hex('#7a2e4e'), hex('#9a4468'), hex('#5a1e38'), hex('#5a1e38'), 3); d_cuarteron(R, 63, 103, 77, 114, hex('#7a2e4e'), hex('#9a4468'), hex('#5a1e38'), hex('#5a1e38'), 4); disco(76, 102, 1.2, d_C.laton);
  rect(0, 112, 150, 116, hex('#8a7a9a')); for (let x = 0; x < 150; x += 6) pset(x, 114, hex('#6a5a7a'));
  // lo lejano por detrás de la valla: las lomas azuladas, el depósito de agua del pueblo y el poste del teléfono con sus
  // cables (el poste en x 276 queda por debajo de la zona de Atom: la cruceta en y 56)
  for (let x = 150; x < 320; x++) { const top = Math.round(86 - Math.sin(x * 0.035) * 4 - Math.sin(x * 0.11 + 1) * 1.5); for (let y = top; y < 100; y++) pset(x, y, y === top ? hex('#a8c8b8') : h(x >> 1, y >> 1, 568) < 0.25 ? hex('#7aa494') : hex('#8ab4a2')); }
  rect(220, 76, 220, 98, hex('#7a8a98')); rect(234, 76, 234, 98, hex('#7a8a98')); linea(220, 86, 234, 96, hex('#8a9aa8')); linea(234, 86, 220, 96, hex('#8a9aa8'));
  rect(218, 66, 236, 76, hex('#9aaab8')); rect(218, 66, 220, 76, hex('#b8c8d4')); rect(232, 66, 236, 76, hex('#7a8a98')); poligono([[217, 66], [227, 60], [237, 66]], hex('#8a9aa8')); rect(218, 71, 236, 71, hex('#7a8a98'));
  const hilo = (x, k) => x < 276 ? 40 + k * 2 + (x - 150) / 126 * 16 + Math.sin(Math.PI * (x - 150) / 126) * 7 : 56 + k * 2 + Math.sin(Math.PI * (x - 276) / 88) * 5;
  for (let k = 0; k < 2; k++) for (let x = 150; x < 320; x++) pset(x, Math.round(hilo(x, k)), hex('#2a2a34'));
  rect(275, 54, 278, 112, hex('#6a4a2e')); rect(275, 54, 275, 112, hex('#8a6440')); for (let y = 60; y < 112; y += 7) pset(277, y, hex('#4a3020'));
  rect(268, 55, 285, 56, hex('#4a3020')); for (const x of [270, 283]) { rect(x, 53, x, 54, hex('#e8e4d8')); }
  // los árboles del fondo a la derecha y la valla
  for (const [x, r] of [[196, 22], [250, 18], [306, 24]]) { rect(x - 2, 80, x + 2, 112, C.cortezaS); for (const [dx, dy, rr] of [[0, -r * 1.2, r * 0.8], [-r * 0.6, -r * 0.8, r * 0.6], [r * 0.6, -r * 0.85, r * 0.6]]) { disco(x + dx, 96 + dy, rr, hex('#2e6a2a')); disco(x + dx - 1, 95 + dy, rr * 0.75, hex('#3e8a3a')); disco(x + dx - 2, 94 + dy, rr * 0.4, hex('#5aa84a')); } }
  for (let x = 150; x < 320; x += 6) { rect(x, 98, x + 3, 114, C.blanco); rect(x + 3, 98, x + 3, 114, d_C.cremaS); poligono([[x, 98], [x + 1.5, 95], [x + 3, 98]], C.blanco); } rect(150, 102, 319, 103, d_C.cremaS); rect(150, 109, 319, 110, d_C.cremaS);
  // el seto recortado
  for (let x = 0; x < 320; x++) { const top = 106 + Math.round(Math.abs(Math.sin(x * 0.2)) * -3); for (let y = top; y < 124; y++) pset(x, y, h(x >> 1, y >> 1, 564) < 0.2 ? hex('#2e6a2a') : (x + y) % 4 === 0 ? hex('#5aa84a') : hex('#3e8a3a')); pset(x, top, hex('#6ab85a')); }
  // el césped con sus franjas de cortacésped, flores y la losa
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const franja = Math.floor((x + (y - 124) * 0.6) / 22) & 1; pset(x, y, h(x, y, 565) < 0.1 ? d_C.cespedS : h(x, y, 566) < 0.05 ? d_C.cespedL : franja ? d_C.cesped : hex('#66b444')); }
  // la sombra moteada de un árbol que queda fuera de cuadro, a la derecha de la losa
  for (let y = 124; y < 144; y++) for (let x = 150; x < 240; x++) { const e = ((x - 196) / 46) ** 2 + ((y - 133) / 10) ** 2, m = h(x >> 2, y >> 1, 569); if (e < 1 && m > 0.22 + e * 0.4) pset(x, y, d_mezcla(R.pget(x, y), hex('#1e5a20'), 0.35)); }
  // matas de hierba alta, tréboles y dientes de león por todo el césped (fuera de la losa)
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 3, 567) * 316) + 2, y = 128 + Math.round(h(k, 4, 567) * 50); if (x > 88 && x < 236 && y > 140 && y < 158) continue;
    const tipo = k % 5; if (tipo < 3) { pset(x, y, d_C.cespedS); pset(x - 1, y - 1, d_C.cespedS); pset(x + 1, y - 2, d_C.cespedL); pset(x, y - 2, hex('#2e6a22')); pset(x + 2, y - 1, d_C.cespedS); }
    else if (tipo === 3) { pset(x, y, hex('#3e8228')); pset(x + 1, y, hex('#4a9a32')); pset(x, y - 1, hex('#4a9a32')); pset(x + 1, y - 1, hex('#3e8228')); }
    else { pset(x, y, hex('#8ab84a')); pset(x, y - 1, hex('#8ab84a')); pset(x, y - 2, C.blanco); pset(x - 1, y - 3, hex('#e8eef0')); pset(x + 1, y - 3, hex('#e8eef0')); pset(x, y - 4, C.blanco); } }
  // las baldosas del camino, desde la puerta del porche hacia abajo, con su sombra y el filo de luz
  for (const [cx, cy, rx] of [[70, 127, 7], [64, 135, 8], [72, 144, 8], [62, 154, 9], [72, 165, 10], [60, 176, 11]]) {
    R.disco(cx + 1, cy + 1, rx * 0.55, d_C.cespedS); for (let y = cy - 3; y <= cy + 3; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / 3.4) ** 2; if (e > 1) continue; pset(x, y, e > 0.75 ? hex('#8a867e') : y < cy - 1 ? hex('#d8d4cc') : h(x, y, 570) < 0.2 ? hex('#a8a49c') : hex('#c0bcb4')); } }
  // el macizo de flores al pie del seto de la derecha: el bordillo de ladrillo, la tierra y tulipanes de colores
  for (let x = 236; x < 320; x++) { for (let y = 124; y < 132; y++) pset(x, y, h(x, y, 571) < 0.3 ? hex('#4a2e1a') : hex('#6a4426')); pset(x, 132, (x >> 2) & 1 ? hex('#a84a2e') : hex('#c85a3a')); pset(x, 133, hex('#7a3020')); }
  for (let x = 238; x < 318; x += 4) { const c = [C.rojo, C.amarillo, d_C.rosa, C.blanco, hex('#e86a2a')][(x >> 2) % 5], hh = 4 + ((x >> 2) % 3); linea(x, 130, x, 130 - hh, d_C.cespedS); pset(x + 1, 128 - (hh >> 1), d_C.cesped); rect(x - 1, 129 - hh - 2, x + 1, 129 - hh, c); pset(x, 129 - hh - 3, c); pset(x - 1, 129 - hh - 2, d_mezcla(c, C.blanco, 0.4)); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 567) * 319), y = 126 + Math.round(h(k, 2, 567) * 10); if (x > 90 && x < 236) continue; pset(x, y, [C.rojo, C.amarillo, C.blanco, d_C.rosa][k % 4]); pset(x, y + 1, d_C.cespedS); }
  // el gnomo del jardín junto a la pila
  { const gx = 14, gy = 150; R.disco(gx, gy + 1, 4, d_C.cespedS); rect(gx - 3, gy - 7, gx + 3, gy, hex('#2a5aa8')); rect(gx + 2, gy - 7, gx + 3, gy, hex('#1a3a78')); rect(gx - 2, gy - 10, gx + 2, gy - 8, hex('#f0c8a0')); rect(gx - 2, gy - 8, gx + 2, gy - 6, C.blanco); poligono([[gx - 3, gy - 10], [gx, gy - 17], [gx + 3, gy - 10]], C.rojo); pset(gx - 1, gy - 9, K); pset(gx + 1, gy - 9, K); rect(gx - 3, gy, gx + 3, gy, K); }
  // la manguera enrollada en su carrete, a la derecha, y el triciclo rojo que alguien dejó en el césped
  { const mx = 304, my = 150; R.disco(mx, my + 7, 8, d_C.cespedS); linea(mx - 6, my + 8, mx - 1, my - 6, hex('#5a5a62')); linea(mx + 6, my + 8, mx + 1, my - 6, hex('#5a5a62'));
    R.disco(mx, my, 6, hex('#1e6a2a')); for (const r of [5, 3.5, 2]) for (let a = 0; a < 6.3; a += 0.15) pset(Math.round(mx + Math.cos(a) * r), Math.round(my + Math.sin(a) * r), r === 5 ? hex('#3aa84a') : hex('#2a8a3a')); R.disco(mx, my, 1, hex('#8a8a92')); rect(mx + 6, my - 1, mx + 9, my, hex('#c8c8d0'));
    for (let x = 274; x < 298; x++) pset(x, 155 + Math.round(Math.sin(x * 0.4) * 1.2), hex('#2a8a3a')); }
  { const tx = 292, ty = 176; R.disco(tx, ty + 1, 9, d_C.cespedS); for (const [wx, r] of [[tx - 6, 2.5], [tx + 1, 2.5], [tx + 7, 4]]) { R.disco(wx, ty - r, r, K); R.disco(wx, ty - r, r - 1, hex('#3a3a42')); pset(wx, ty - r, C.blanco); }
    linea(tx - 6, ty - 3, tx + 7, ty - 5, C.rojo); linea(tx - 2, ty - 3, tx + 4, ty - 9, C.rojo); rect(tx - 3, ty - 9, tx, ty - 8, K); linea(tx + 6, ty - 12, tx + 7, ty - 5, C.rojo); rect(tx + 4, ty - 13, tx + 9, ty - 12, hex('#3a3a42')); pset(tx + 9, ty - 13, hex('#f0d040')); }
  poligono([[96, 144], [228, 144], [232, 154], [92, 154]], K); poligono([[97, 145], [227, 145], [230, 153], [94, 153]], hex('#b8b4ac')); for (let x = 100; x < 228; x += 22) linea(x, 145, x - 2, 153, hex('#8a867e')); rect(97, 145, 227, 145, hex('#d8d4cc'));
  // el cable naranja de la alargadera que va a la casa
  for (let x = 140; x < 232; x++) pset(x, 156 + Math.round(Math.sin(x * 0.15) * 1.5), C.naranja); for (let y = 116; y < 157; y++) pset(140 + Math.round(Math.sin(y * 0.3)), y, C.naranja);
  // la pila de los pájaros
  const bx = 34, by = 132; rect(bx - 2, by, bx + 2, by + 18, K); rect(bx - 1, by, bx + 1, by + 17, hex('#c8c4bc')); rect(bx - 5, by + 17, bx + 5, by + 19, hex('#a8a49c')); rect(bx - 9, by - 3, bx + 9, by, K); rect(bx - 8, by - 2, bx + 8, by - 1, hex('#c8c4bc')); rect(bx - 7, by - 3, bx + 7, by - 3, hex('#5aa0d8'));
  // la manguera del aspersor
  for (let x = 240; x < 268; x++) pset(x, 151 + Math.round(Math.sin(x * 0.3)), hex('#2a8a3a'));
}
function d_jaulas(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  R.copiar(d_capa(R, 'jaulas', () => d_jaulasFijo(R)));
  // las pantallas de la pared con pictogramas (tentáculo, caramelo, almohada) que cambian
  for (const [sx, sy] of [[30, 34], [256, 60]]) { const p = Math.floor(t / 2.2 + sx) % 3; rect(sx, sy, sx + 22, sy + 14, hex('#0e1a14')); for (let y = sy; y <= sy + 14; y += 2) rect(sx, y, sx + 22, y, hex('#14261c'));
    if (p === 0) d_emblema(R, sx + 11, sy + 7, 1, hex('#0e1a14'), d_C.neon); else if (p === 1) { disco(sx + 11, sy + 7, 3, d_C.rosaN); poligono([[sx + 5, sy + 4], [sx + 8, sy + 7], [sx + 5, sy + 10]], d_C.rosaN); poligono([[sx + 17, sy + 4], [sx + 14, sy + 7], [sx + 17, sy + 10]], d_C.rosaN); }
    else { rect(sx + 5, sy + 5, sx + 17, sy + 10, d_C.neon); rect(sx + 6, sy + 6, sx + 16, sy + 9, d_C.neonD); } }
  // los estandartes que ondean
  for (const [x0, y0, w, hgt] of [[70, 20, 16, 60], [232, 20, 16, 30]]) for (let i = 0; i <= w; i++) { const fin = y0 + hgt + Math.round(Math.sin(t * 2.4 + i * 0.5 + x0) * 1.5) + (i < w / 2 ? i : w - i) % 4; for (let y = y0; y <= fin; y++) pset(x0 + i, y, i === 0 || i === w || y === fin ? K : (i + Math.round(Math.sin(t * 2.4 + i * 0.5) * 2)) % 6 === 0 ? C.moradoS : C.morado); }
  d_emblema(R, 78, 40 + Math.round(Math.sin(t * 2.4 + 70) * 1), 1, C.moradoS, d_C.neon); d_emblema(R, 240, 36, 1, C.moradoS, d_C.neon);
  // el ventanal corrido de la galería, con la ciudad del futuro
  R.recorte([90, 62, 300, 90]); d_vista(R, t, 2193, 90, 62, 300, 90); R.recorte(null);
  for (let x = 90; x <= 300; x += 30) { rect(x, 62, x + 1, 90, K); rect(x, 62, x, 90, d_C.vioL); } rect(90, 62, 300, 62, d_C.vioL);
  // la galería del fondo: tres jaulas pequeñas con humanos (saludan, leen, duermen) y un guardián que pasa
  for (let k = 0; k < 3; k++) { const cx = 108 + k * 34;
    d_persona(R, cx - 3, 94, t + k, { ropa: [hex('#d8783a'), hex('#3a8a6a'), hex('#e8d84a')][k], pelo: [hex('#2a1a12'), hex('#c8984a'), hex('#5a3418')][k], saluda: k === 0, sentado: k === 2, dir: k === 1 ? -1 : 1 });
    if (k === 2) for (let b = 0; b < 3; b++) { const u = (t * 0.6 + b / 3) % 1; R.disco(cx + 2 + Math.round(u * 5), Math.round(82 - u * 10), 0.6 + u * 1.2, hex('#c8d8f0')); }   // el que duerme: burbujitas
    for (let x = cx - 10; x <= cx + 10; x += 3) { const top = 74 + Math.round((1 - Math.sqrt(Math.max(0, 1 - ((x - cx) / 11) ** 2))) * 8); linea(x, top, x, 94, d_C.laton); } rect(cx - 11, 94, cx + 11, 96, K); rect(cx - 11, 94, cx + 11, 94, d_C.latonS); disco(cx, 72, 1.5, d_C.laton); }
  const gu = (t * 10) % 140, gx = Math.round(gu < 70 ? 96 + gu * 1.4 : 292 - (gu - 70) * 1.4); d_tentaculito(R, gx, 96, t, 'morado', { lanza: true, dir: gu < 70 ? 1 : -1 });
  rect(90, 96, 300, 100, K); rect(90, 97, 300, 98, d_C.vioL); for (let x = 92; x < 300; x += 8) rect(x, 99, x + 1, 100, d_C.vioD);   // la barandilla de la galería, por delante
  // el dispensador de caramelos que deja caer uno en la jaula grande de vez en cuando
  const u = (t % 4) / 4; if (u > 0.55) { const y = Math.round(54 + (u - 0.55) / 0.45 * 76); if (y < 130) { disco(176, y, 1.6, [C.rojo, C.amarillo, d_C.rosaN][Math.floor(t / 4) % 3]); pset(175, y - 1, C.blanco); } }
  for (let k = 0; k < 3; k++) pset(170 + k * 3, 46, Math.floor(t * 4 + k) % 3 === 0 ? d_C.neon : d_C.neonD);
  // la puerta de la jaula grande (o.jaula 0–1: abierta) y los barrotes de delante
  const ab = o.jaula ?? 0, cx = 160;
  for (let x = cx - 30; x <= cx + 30; x += 5) { if (ab > 0 && x >= cx + 10 && x <= cx + 26) continue; const top = 74 + Math.round((1 - Math.sqrt(Math.max(0, 1 - ((x - cx) / 31) ** 2))) * 22); linea(x, top, x, 147, K); linea(x + 1, top, x + 1, 147, d_C.laton); pset(x + 1, top + 4, d_C.latonL); }
  if (ab > 0) { const w = Math.round(16 * (1 - ab)); for (let i = 0; i <= w; i += 4) linea(cx + 26 + i, 104, cx + 26 + i, 147, d_C.laton); rect(cx + 26, 104, cx + 26 + w, 105, d_C.latonS); rect(cx + 26, 146, cx + 26 + w, 147, d_C.latonS); }
  rect(cx - 31, 120, cx + 31, 121, d_C.latonS); rect(cx - 31, 120, cx + 31, 120, d_C.latonL); if (!ab) { rect(cx + 24, 118, cx + 28, 124, K); rect(cx + 25, 119, cx + 27, 123, d_C.laton); pset(cx + 26, 121, K); }
  d_robot(R, t + 3, 210, 300, 168);
  // el resplandor del lodo de los tubos
  const pl = 0.1 + 0.06 * Math.sin(t * 2.6); for (let y = 30; y < 150; y += 1) for (let x = 6 + (y & 1); x < 30; x += 2) d_aclara(R, x, y, C.lodo, pl);
  for (let k = 0; k < 4; k++) { const v = (t * 0.8 + k / 4) % 1; disco(14 + (k & 1) * 6, Math.round(146 - v * 110), 1.3, C.lodoL); }
  return { suelo: 150, pies: [60, 160, 250], jaula: [cx, 147], puertaJaula: [cx + 10, 104, cx + 26, 147], almohada: [cx - 10, 140], caramelos: [cx + 12, 142], centro: 160 };
}

// lo fijo de la sala de las jaulas: los paneles morados con remaches, el techo con su tira de neón, la galería del
// fondo, el tubo de lodo de la izquierda, el dispensador del techo, el suelo brillante y la jaula grande por detrás
// (la cúpula y su base, la almohada gorda y el cuenco de caramelos)
function d_jaulasFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k;
  rect(0, 0, 319, 17, d_C.vioD); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 15, d_C.vioS); rect(0, 16, 319, 16, d_C.neonD); rect(0, 17, 319, 17, d_C.vioS);
  for (let y = 18; y < 132; y++) for (let x = 0; x < 320; x++) { const px = x % 26, py = (y - 18) % 26; let c = d_C.vio; if (px === 0 || py === 0) c = d_C.vioS; else if (px === 1 || py === 1) c = d_C.vioL; else if (x % 3 === 0 && h(x, y >> 2, 570) < 0.5) c = hex('#382254'); if ((px === 3 || px === 23) && (py === 3 || py === 23)) c = d_C.vioL; pset(x, y, c); }
  // la galería del fondo (suelo a y 96)
  rect(88, 60, 302, 96, hex('#2a1a42')); for (let x = 88; x < 302; x += 12) rect(x, 60, x, 96, d_C.vioS); rect(88, 58, 302, 60, K); rect(88, 59, 302, 59, d_C.vioL);
  // el tubo de lodo de la izquierda
  rect(6, 18, 30, 150, K); rect(7, 18, 29, 149, hex('#14281a')); for (let y = 30; y < 149; y++) for (let x = 8; x < 29; x++) pset(x, y, (x + y) % 7 === 0 ? C.lodoL : x < 11 ? C.lodoL : x > 25 ? C.lodoS : C.lodo); rect(8, 30, 28, 30, C.lodoL); rect(5, 18, 31, 22, d_C.vioL); rect(5, 146, 31, 152, d_C.vioL);
  // el dispensador de caramelos del techo
  rect(166, 18, 186, 48, K); rect(167, 19, 185, 47, d_C.vioL); rect(170, 22, 182, 40, hex('#d8e8f0')); for (let k = 0; k < 18; k++) pset(171 + Math.round(h(k, 1, 571) * 10), 26 + Math.round(h(k, 2, 571) * 13), [C.rojo, C.amarillo, d_C.rosaN, d_C.neon][k % 4]); rect(174, 48, 178, 54, K); rect(175, 48, 177, 53, d_C.metalS ?? C.metalS);
  // el zócalo y el suelo brillante en perspectiva
  rect(0, 130, 319, 136, d_C.vioS); rect(0, 131, 319, 131, d_C.neon); rect(0, 130, 319, 130, d_C.neonD);
  for (let f = 0; f < 6; f++) { const ya = [136, 141, 147, 154, 162, 171, 180][f], yb = [136, 141, 147, 154, 162, 171, 180][f + 1] - 1, w = 16 + f * 6;
    for (let y = ya; y <= yb; y++) for (let x = 0; x < 320; x++) { const i = Math.floor((x + f * 9) / w), par = (i + f) & 1; let c = par ? d_C.vioS : hex('#22163a'); if ((x + f * 9) % w === 0 || y === yb) c = d_C.vioD; if (y === ya && par) c = d_C.vio; pset(x, y, c); } }
  for (let y = 154; y < 176; y += 2) for (let x = 9 + (y >> 1) % 2; x < 28; x += 4) pset(x, y, d_mezcla(R.pget(x, y), C.lodo, 0.45 * (1 - (y - 154) / 24)));   // el reflejo del tubo
  // la jaula grande: la base redonda (pedestal), la parte de atrás de los barrotes, la almohada y el cuenco
  const cx = 160;
  rect(cx - 36, 147, cx + 36, 154, K); rect(cx - 35, 148, cx + 35, 153, d_C.vioL); rect(cx - 35, 148, cx + 35, 148, C.moradoL); rect(cx - 35, 153, cx + 35, 153, d_C.vioS); for (let x = cx - 32; x < cx + 34; x += 8) pset(x, 151, d_C.neon);
  for (let x = cx - 28; x <= cx + 28; x += 5) { const top = 74 + Math.round((1 - Math.sqrt(Math.max(0, 1 - ((x - cx) / 31) ** 2))) * 22); linea(x + 2, top + 2, x + 2, 146, d_C.latonS); }
  for (let i = -31; i <= 31; i++) { const y = 74 + Math.round((1 - Math.sqrt(Math.max(0, 1 - (i / 31) ** 2))) * 22); pset(cx + i, y, d_C.laton); pset(cx + i, y - 1, K); }
  disco(cx, 70, 4, K); disco(cx, 70, 3, d_C.laton); pset(cx - 1, 69, d_C.latonL); rect(cx - 1, 54, cx + 1, 67, K);
  rect(cx - 26, 136, cx + 2, 146, K); rect(cx - 25, 137, cx + 1, 145, d_C.rosa); rect(cx - 25, 137, cx + 1, 138, hex('#f8c0d8')); rect(cx - 25, 144, cx + 1, 145, d_C.rosaS); for (const [x, y] of [[cx - 25, 137], [cx + 1, 137], [cx - 25, 145], [cx + 1, 145]]) pset(x, y, K); pset(cx - 12, 141, d_C.rosaS);
  rect(cx + 6, 140, cx + 18, 146, K); rect(cx + 7, 141, cx + 17, 145, hex('#d8e8f0')); rect(cx + 7, 141, cx + 17, 141, C.blanco); for (let k = 0; k < 7; k++) disco(cx + 8 + k * 1.5, 139 - (k % 2), 1.2, [C.rojo, C.amarillo, d_C.neon, d_C.rosaN, C.azulL][k % 5]);
  // dos jarrones-tentáculo de adorno junto a la jaula
  for (const x of [100, 222]) { rect(x - 5, 128, x + 5, 147, K); rect(x - 4, 129, x + 4, 146, d_C.vioL); rect(x - 4, 129, x - 3, 146, C.moradoL); disco(x, 124, 4, K); disco(x, 124, 3, C.morado); pset(x - 1, 123, C.blanco); pset(x + 1, 123, C.blanco); }
}

// las franjas: x de destino, la x del decorado de la que se copian, y el alto común (y 30 a 160)
const d_FRANJAS = [[6, 105], [110, 209], [214, 313]], d_FY = [30, 160];

function d_triple(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, K = C.k, cam = o.camara ?? 'general', ERAS = [1793, 1993, 2193];
  // el fondo: un azul de noche con chispas de tiempo que suben
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y) % 2 && h(x >> 2, y >> 2, 580) < 0.4 ? hex('#1a1e3a') : hex('#14182e'));
  for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 1, 581) * 319), y = Math.round(179 - ((h(k, 2, 581) * 180 + t * (6 + k % 5 * 3)) % 180)); if (Math.sin(t * 3 + k) > -0.2) pset(x, y, k % 3 ? hex('#6a74b8') : d_C.latonL); }
  const fuentes = [], geo = [];
  ERAS.forEach((era, k) => {
    const b = d_buf(R, 'franja' + k), prev = R.usar(b);
    let g, sx;
    if (cam === 'general') { g = d_salon(R, t, era, o); sx = 20; }
    else if (era === 1793) { g = d_escritorio(R, t, o); sx = 126; }
    else if (era === 1993) { g = d_jardin(R, t, o); sx = 112; }
    else { g = d_jaulas(R, t, o); sx = 110; }
    R.usar(prev); fuentes.push([b, sx]); geo.push(g);
  });
  const W = 320;
  d_FRANJAS.forEach(([a, b], k) => { const [buf, sx] = fuentes[k], dx = sx - a;
    rect(a - 3, d_FY[0] - 3, b + 3, d_FY[1] + 3, K); rect(a - 2, d_FY[0] - 2, b + 2, d_FY[1] + 2, [d_C.robleL, d_C.tealL, C.moradoL][k]); rect(a - 1, d_FY[0] - 1, b + 1, d_FY[1] + 1, K);
    for (let y = d_FY[0]; y <= d_FY[1]; y++) { const fila = y * W + dx; for (let x = a; x <= b; x++) pset(x, y, buf[fila + x]); }
    // la placa del año, abajo
    const cx = (a + b) >> 1; rect(cx - 20, 163, cx + 20, 176, K); rect(cx - 19, 164, cx + 19, 175, [d_C.roble, d_C.tealS, d_C.vioL][k]); rect(cx - 19, 164, cx + 19, 164, [d_C.robleL, d_C.tealL, C.moradoL][k]);
    R.numero(String(ERAS[k]), cx + 1, 174, { centro: true }); });
  // el hilo que une las franjas y el retrete diminuto que salta de una a otra
  for (let x = 0; x < 320; x++) if (x % 4 < 2) pset(x, 168, hex('#3a4270'));
  const u = (t * 0.45) % 1, k = Math.floor((t * 0.45) % 3), xa = [56, 160, 264][k], xb = [160, 264, 56][k], x = Math.round(xa + (xb - xa) * u), y = Math.round(168 - Math.sin(u * Math.PI) * (k === 2 ? 0 : 10));
  if (!(k === 2)) { rect(x - 3, y - 9, x + 3, y, K); rect(x - 2, y - 8, x + 2, y - 1, d_C.plas); rect(x - 2, y - 8, x - 2, y - 1, d_C.plasL); rect(x - 2, y - 9, x + 2, y - 9, C.blanco); pset(x, y - 11, C.blanco); pset(x - 4, y - 3, d_C.latonL); pset(x + 4, y - 6, C.blanco); }
  else for (let i = 0; i < 4; i++) { const sx = Math.round(264 - 208 * u + Math.sin(t * 9 + i) * 4); pset(sx, 168 + (i - 2) * 2, d_C.latonL); }
  return { suelo: 150, pies: d_FRANJAS.map(([a, b]) => (a + b) >> 1), franjas: d_FRANJAS.map(([a, b], i) => ({ x0: a, x1: b, y0: d_FY[0], y1: d_FY[1], dx: a - fuentes[i][1], año: ERAS[i] })), geo };
}

// El coche de los sesenta (homenaje propio, sin marcas): un sedán grande negro con las puertas y el techo blancos, aletas
// traseras con pilotos, cromados (parachoques, rejilla, moldura), ruedas de banda blanca con tapacubos que giran, faro,
// antena que se cimbrea y una luz roja en el techo (o.sirena: gira). (x, suelo): el centro y el suelo; o.dir 1 (mira a la
// derecha) o −1; o.s escala (1: 86 × 36 px); o.anda (en marcha: bota un poco, las ruedas giran, sale humo);
// o.ocupantes(asientos): pinta a los de dentro entre la carrocería y las puertas, recortado a las ventanillas.
// Devuelve { x, suelo, asientos: [[x, pies] delante (el conductor), [x, pies] detrás] }: el centro del personaje y su línea
// de pies (con R.actor, x − 7); así asoman la cabeza y los hombros por la ventanilla.
export function coche60(R, x, suelo, t, o = {}) {
  const { poligono, disco, linea, pset } = R, s = o.s ?? 1, dir = o.dir ?? 1, P = e_P;
  const bote = o.anda ? (Math.sin(t * 17) > 0.6 ? -1 : 0) : 0;
  const X = (u) => Math.round(x + dir * u * s), Y = (v) => Math.round(suelo + v * s) + (v < -4 ? bote : 0);
  const pol = (pts, c) => poligono(pts.map(([u, v]) => [X(u), Y(v)]), c);
  const lin = (u0, v0, u1, v1, c) => linea(X(u0), Y(v0), X(u1), Y(v1), c);
  const asientos = [[X(6), Y(-17) + 9], [X(-12), Y(-17) + 9]];
  // la sombra en el suelo
  for (let j = -2; j <= 1; j++) for (let i = Math.round(-44 * s); i <= Math.round(44 * s); i++) { const xx = x + i, yy = suelo + j; if (((xx + yy) & 1) || j === 0) { const c = R.pget(xx, yy); if (c) pset(xx, yy, e_mezcla(c, P.k, 0.45)); } }
  // la antena que se cimbrea
  { const w = Math.round(Math.sin(t * 9) * 2 * (o.anda ? 1 : 0.3)); lin(-34, -18, -39 - w / s, -44, P.crD); pset(X(-39 - w / s), Y(-45), P.ro); }
  // el techo con sus montantes, el hueco de las ventanillas y el interior
  pol([[-26, -17], [-19, -35], [9, -36], [20, -17]], P.k); pol([[-24, -18], [-18, -34], [8, -35], [18, -18]], P.bl);
  pol([[-23, -18], [-18, -32], [7, -33], [15, -18]], P.inS);
  pol([[-17, -18], [-17, -27], [-14, -29], [-13, -18]], P.in); pol([[0, -18], [0, -28], [3, -30], [4, -18]], P.in);   // los respaldos
  pol([[-18, -34], [8, -35], [8, -34], [-18, -33]], P.blS);
  // la luz roja del techo
  { const on = o.sirena ? Math.floor(t * 6) % 2 : 0; pol([[-6, -36], [-5, -39], [-1, -39], [0, -36]], P.k); pol([[-5, -37], [-4, -38], [-2, -38], [-1, -37]], on ? P.roL : P.roS); if (on) { pset(X(-3), Y(-40), P.amL); pset(X(-8), Y(-38), P.roL); pset(X(2), Y(-38), P.roL); } }
  // la carrocería: aleta trasera, maletero, capó y el morro
  pol([[-45, -6], [-45, -16], [-42, -23], [-36, -19], [-26, -18], [16, -18], [36, -17], [44, -15], [45, -12], [45, -6], [40, -4], [-41, -4]], P.k);
  pol([[-44, -7], [-44, -16], [-42, -21], [-36, -18], [-26, -17], [16, -17], [36, -16], [43, -14], [44, -12], [44, -7], [39, -5], [-40, -5]], P.ne);
  pol([[-44, -12], [44, -12], [44, -7], [39, -5], [-40, -5], [-44, -7]], P.neS);
  lin(-41, -18, -36, -17, P.neL); lin(18, -16, 36, -15, P.neL); lin(-26, -16, 16, -16, P.neL); lin(-43, -11, 43, -11, P.neL);
  // el piloto de la aleta y el faro
  pol([[-45, -16], [-44, -20], [-43, -20], [-44, -14]], P.ro); pset(X(-44), Y(-18), P.roL);
  disco(X(42), Y(-12), Math.max(1, Math.round(1.6 * s)), P.amL); pset(X(42), Y(-12), P.bl);
  if (o.faros) for (let i = 1; i < 18; i++) for (let j = -i / 3; j <= i / 3; j++) if (((i + Math.round(j)) & 1) === 0) { const xx = X(44 + i), yy = Y(-12 + j); const c = R.pget(xx, yy); if (c) pset(xx, yy, e_mezcla(c, P.amL, 0.4)); }
  // la rejilla y los parachoques cromados
  pol([[43, -11], [45, -11], [45, -7], [43, -7]], P.crS); for (let v = -10; v <= -8; v += 2) lin(43, v, 45, v, P.cr);
  pol([[38, -8], [47, -8], [47, -5], [38, -5]], P.cr); lin(38, -8, 47, -8, P.crL); lin(38, -5, 47, -5, P.crD);
  pol([[-47, -8], [-38, -8], [-38, -5], [-47, -5]], P.cr); lin(-47, -8, -38, -8, P.crL); lin(-47, -5, -38, -5, P.crD);
  // los pasos de rueda y las ruedas de banda blanca con el tapacubos que gira
  const giro = (o.anda ? t * 16 : 0) * dir;
  for (const u of [-27, 26]) { const cx = X(u), cy = Y(-5) - bote, r = Math.round(6 * s);
    disco(cx, cy - 1, r + 1, P.k); disco(cx, cy, r, P.ru); disco(cx, cy, Math.round(r * 0.72), P.bl); disco(cx, cy, Math.round(r * 0.55), P.ruL); disco(cx, cy, Math.round(r * 0.42), P.cr);
    for (let k = 0; k < 3; k++) { const a = giro + k * 2.094; pset(Math.round(cx + Math.cos(a) * r * 0.36), Math.round(cy + Math.sin(a) * r * 0.36), P.crD); }
    pset(cx - 1, cy - 1, P.crL); pset(cx, cy, P.crS);
    if (o.anda) for (let k = 0; k < 3; k++) { const a = giro * 0.5 + k * 2.094; pset(Math.round(cx + Math.cos(a) * (r - 0.6)), Math.round(cy + Math.sin(a) * (r - 0.6)), P.ruL); } }
  // los de dentro: entre la carrocería y las puertas, recortados a las ventanillas
  if (o.ocupantes) { const xa = Math.min(X(-23), X(15)), xb = Math.max(X(-23), X(15)); R.recorte([xa, Y(-33), xb, Y(-6)]); o.ocupantes(asientos); R.recorte(null); }
  // por delante de ellos: las puertas blancas, la moldura cromada, los montantes y el reflejo de los cristales
  pol([[-24, -17], [17, -17], [17, -8], [-24, -8]], P.k); pol([[-23, -16], [16, -16], [16, -9], [-23, -9]], P.bl);
  pol([[-23, -11], [16, -11], [16, -9], [-23, -9]], P.blS); lin(-4, -16, -4, -9, P.k); lin(-23, -16, 16, -16, P.crL);
  lin(-44, -13, -24, -13, P.cr); lin(17, -13, 40, -13, P.cr);   // la moldura lateral
  lin(-1, -14, 1, -14, P.cr); lin(-20, -14, -18, -14, P.cr);   // los tiradores
  pol([[-26, -17], [-19, -35], [-18, -35], [-23, -18]], P.bl); pol([[-5, -18], [-5, -34], [-3, -34], [-3, -18]], P.bl); pol([[15, -18], [7, -34], [9, -35], [18, -17]], P.bl);
  lin(-23, -18, -17, -33, P.k); lin(-5, -18, -5, -33, P.k); lin(-3, -18, -3, -33, P.k); lin(15, -18, 7, -33, P.k);
  for (const [u0, du] of [[-19, 6], [6, 5]]) for (let k = 0; k < du; k++) { const u = u0 + k, v = -31 + k * 2.2; pset(X(u), Y(v), P.viL); if (k % 2 === 0) pset(X(u + 1), Y(v), P.vi); }
  lin(-26, -17, 20, -17, P.k);
  // el humo del tubo de escape
  if (o.anda) for (let k = 0; k < 5; k++) { const u = ((t * 1.6 + k / 5) % 1), px = X(-47 - u * 20), py = Y(-5) - Math.round(u * 6 * s), r = Math.round((1 + u * 3) * s * 0.8);
    if (u < 0.9) { disco(px, py, r, u < 0.5 ? P.blS : P.blD); pset(px - 1, py - 1, P.bl); } }
  return { x, suelo, asientos };
}

const e_P = pal({
  k: '#1a1420', asf: '#4c4a52', asfS: '#3c3a42', asfL: '#66646e', asfP: '#2e2c34', raya: '#f0c838', rayaS: '#b8922a', arcen: '#b89a74', arcenS: '#8e7656',
  ar: '#e0b47a', arS: '#c8945a', arL: '#f0cc94', arD: '#a8784a', arT: '#d8b08a', arF: '#e4c4a0',
  me: '#c8704a', meS: '#9a4e34', meL: '#e8946a', meB: '#b05c3c', meT: '#b0826a', meTS: '#8e6250',
  mL: '#c8a6b4', mLS: '#ac8c9e', mLL: '#dcbcc4', mLB: '#bc98aa', mLT: '#c8aab4', mLTS: '#b49aa8',
  mat: '#7a8a4a', matS: '#56663a', matL: '#a2b45e', ca: '#4a8a4a', caS: '#2e6a3a', caL: '#7ab85a', caD: '#1e4a2a',
  ma: '#8a5a34', maS: '#5e3a22', maL: '#b07a48', maD: '#40261a',
  cr: '#d8dee8', crS: '#8a94a4', crL: '#ffffff', crD: '#5a6272',
  ne: '#2a2832', neL: '#56546a', neS: '#18161e', bl: '#f2f0ea', blS: '#c8c4bc', blD: '#9a968e', ru: '#18161c', ruL: '#3a3840',
  vi: '#7aaad0', viL: '#d0eaf8', viS: '#3a5a7a', in: '#7a3430', inS: '#3e1c1c', inL: '#9a4a3a',
  ro: '#d83a3a', roS: '#9a2428', roL: '#f07a6a', am: '#f0c838', amS: '#c08a20', amL: '#fff0a0', az: '#3a6ad8', azS: '#2a4a9a', azL: '#7aa8f0',
  ve: '#3ab84a', veS: '#2a8434', veL: '#8ae87a', na: '#f08a3a', naS: '#c0601a', rs: '#f07ab8', rsS: '#b84a88', mo: '#8a5ad8', moS: '#5e3aa0',
  piel: '#f2c08e', pielS: '#c8906a', ave: '#2a2436',
  neR: '#ff4a6a', neRL: '#ffd0dc', neA: '#4ae8ff', neAL: '#e0fcff', neV: '#7aff6a', neVL: '#e0ffd8', neM: '#ffd84a', neML: '#fff8d0', neN: '#ff8a2a',
  lona: '#d83838', lonaS: '#a02428', lonaL: '#f06a5a', lonaB: '#f4ecdc', lonaBS: '#cfc2ac', lonaBL: '#fffaf0',
  tierra: '#a87a50', tierraS: '#86603e', tierraL: '#c8986a', serrin: '#e0c08a', paja: '#e8cc6a', pajaS: '#b8983a',
  trigo: '#e0b84a', trigoS: '#b88e30', trigoL: '#f4d47a', prado: '#8aa848', pradoS: '#6a8a38', granero: '#b83a2e', graneroS: '#8a2a22',
  cordel: '#c8a26a', cordelS: '#9a7848', cordelL: '#e8c890', cordelD: '#7a5a34',
  dino: '#5aa04a', dinoS: '#3a7a3a', dinoL: '#8ac86a', dinoD: '#285a2a',
  tabla: '#6a4a36', tablaS: '#4a3226', tablaL: '#8a6448', tablaD: '#2e2018', vent: '#f8c868', ventL: '#fff0b0', ventS: '#c88a3a',
  nM: '#2a2440', nMS: '#1e1a32', nML: '#3a3456', grava: '#4a4656', gravaS: '#38343f', gravaL: '#625e70',
});

// la capa fija de un decorado: se pinta una vez en un búfer (lo que no se pinta queda vacío) y en cada fotograma se pega
// encima de lo de detrás en una sola pasada; cada variante lleva su clave
const e_VACIO = 0x01020304, e_capas = new Map();

function e_capa(R, clave, dibuja) {
  let b = e_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(e_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); e_capas.set(clave, b); }
  return b;
}

// pega una capa (filas y0–y1) desplazada dx píxeles a la izquierda, dando la vuelta (para el paisaje que corre)
function e_pegar(R, b, dx = 0, y0 = 0, y1 = 179) {
  const B = R.buf, d = ((Math.round(dx) % 320) + 320) % 320;
  for (let y = y0; y <= y1; y++) { const f = y * 320; if (d === 0) { for (let x = 0; x < 320; x++) { const c = b[f + x]; if (c !== e_VACIO) B[f + x] = c; } } else for (let x = 0; x < 320; x++) { const c = b[f + ((x + d) % 320)]; if (c !== e_VACIO) B[f + x] = c; } }
}

// oscurece (o aclara hacia col) un óvalo tramado ya pintado: sombras de nubes, de coches, charcos de luz
function e_tinte(R, cx, cy, rx, ry, col, a, trama = 1) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let i = -w; i <= w; i++) { const xx = Math.round(cx + i), yy = Math.round(cy + j); if (trama > 1 && (xx + yy) % trama) continue; const c = R.pget(xx, yy); if (c) R.pset(xx, yy, e_mezcla(c, col, a)); } }
}

// una meseta de arenisca: la cima plana (a–b, a la altura top) con la roca de remate y su filo de luz, el cantil de
// frente a franjas de estratos con regueros, el talud de derrubios con peñas hasta la base; la cara de la luz (ld 1:
// derecha) más clara y la otra en sombra. p = [c, cS, cL, cB, cT, cTS]
function e_meseta(R, a, b, top, base, cil, tal, p, sem, ld = 1) {
  const [c, cS, cL, cB, cT, cTS] = p, pset = R.pset;
  for (let x = Math.floor(a - 4 - tal); x <= Math.ceil(b + 4 + tal); x++) {
    if (x < -2 || x > 322) continue;
    const d = x < a ? a - x : x > b ? x - b : 0, lado = x < a ? -1 : x > b ? 1 : 0;
    const ys = d === 0 ? top + (h(x >> 2, 3, sem) < 0.25 ? 1 : 0) : d <= 3 ? top + d + 1 : Math.round(top + cil * 0.8 + (d - 3) / tal * (base - top - cil * 0.8) + (h(x >> 1, 4, sem) - 0.5) * 2);
    for (let y = ys; y <= base; y++) {
      let col;
      const cant = d <= 3 && y < top + cil, luz = lado === ld || (lado === 0 && (ld > 0 ? b - x : x - a) < 6), sombra = lado === -ld || (lado === 0 && (ld > 0 ? x - a : b - x) < 4);
      if (cant) {
        const ond = Math.round(Math.sin(x * 0.07 + sem) * 1.2), fy = y - top + ond, banda = (fy / 3 | 0) % 4;
        col = y <= top + 1 ? (y === ys ? cL : cS) : banda === 1 ? (fy % 3 === 0 ? cS : cB) : banda === 3 ? (fy % 3 === 0 ? cL : c) : c;
        if (h(x, 1, sem + 7) < 0.1 && y > top + 3 && y < top + cil - 1) col = cS;   // los regueros (de arriba abajo)
        if (luz && col !== cS) col = col === cB ? c : cL; else if (sombra) col = col === cL ? c : cS;
      } else {
        col = h(x, y, sem + 2) < 0.35 + (y - ys) * 0.02 ? cTS : cT;
        if (sombra) col = cTS; else if (luz && h(x, y, sem + 3) < 0.5) col = c;
        if (h(x >> 1, y >> 1, sem + 4) < 0.05) col = cS;
      }
      pset(x, y, col);
    }
  }
}

// un saguaro: el tronco acanalado (costillas en tres tonos y espinas) con la punta redonda y sus brazos que suben;
// brazos: [[altura desde la base, lado, largo hacia arriba]]
function e_saguaro(R, x, base, alto, brazos, P = e_P) {
  const { rect, pset } = R, w = Math.max(3, Math.round(alto / 11));
  const tallo = (x0, y0, y1, ww) => { for (let y = y0; y <= y1; y++) for (let i = -ww; i <= ww; i++) { const e = Math.abs(i) === ww, cy = y - y0 < ww ? Math.sqrt(Math.max(0, ww * ww - (ww - (y - y0)) ** 2)) : ww; if (Math.abs(i) > cy + 0.3) continue; pset(x0 + i, y, Math.abs(i) >= Math.floor(cy) ? P.caD : i === -ww + 1 || i === -1 ? P.caL : i === ww - 1 ? P.caS : (i & 1) ? P.ca : P.caS);
      if (!e && (y * 3 + i) % 7 === 0 && Math.abs(i) < cy) pset(x0 + i, y, P.arL); } };
  for (const [hb, lado, largo] of brazos) { const yb = base - hb, xb = x + lado * (w + 3 + Math.round(w * 0.6)), ww = Math.max(2, w - 1);
    for (let i = 0; i <= Math.abs(xb - x); i++) for (let j = -ww; j <= ww; j++) pset(x + lado * i, yb + j, Math.abs(j) === ww ? P.caD : j < 0 ? P.ca : P.caS);
    tallo(xb, yb - largo, yb + ww, ww); }
  tallo(x, base - alto, base, w);
  rect(x - w - 1, base, x + w + 1, base, P.arD);
}

// un nopal: palas ovaladas con su luz, espinas en puntos y tunas rosas
function e_nopal(R, x, base, s = 1, P = e_P) {
  const palas = [[0, -6, 6, 5], [-7, -12, 5, 4], [6, -14, 5, 5], [-2, -20, 4, 4], [11, -6, 4, 3]];
  for (const [dx, dy, rx, ry] of palas) { const cx = x + dx * s, cy = base + dy * s, a = rx * s, b = ry * s;
    for (let j = -b - 1; j <= b + 1; j++) for (let i = -a - 1; i <= a + 1; i++) { const e = (i / (a + 0.5)) ** 2 + (j / (b + 0.5)) ** 2; if (e > 1.15) continue; R.pset(cx + i, cy + j, e > 0.82 ? P.caD : i + j < -a * 0.4 ? P.caL : i + j > a * 0.5 ? P.caS : P.ca); if (e < 0.7 && ((i * 3 + j * 5) & 7) === 0) R.pset(cx + i, cy + j, P.arL); }
    if (dy < -10) { R.disco(cx - 2, cy - b - 1, 1, P.rs); R.pset(cx - 2, cy - b - 2, P.rsS); } }
}

// una mata de salvia del desierto que se mece (w: ancho)
function e_mata(R, x, y, t, w, P = e_P) {
  for (let k = 0; k < w * 3; k++) { const i = Math.round((h(k, 1, x) - 0.5) * w), j = -Math.round(h(k, 2, x) * w * 0.55 * (1 - Math.abs(i) / (w * 0.6))), sw = j < -2 ? Math.round(Math.sin(t * 2.2 + x * 0.1) * (-j / w)) : 0;
    R.pset(x + i + sw, y + j, k % 4 === 0 ? P.matL : k % 3 === 0 ? P.matS : P.mat); if (j > -2) R.pset(x + i, y + j + 1, P.matS); }
}

// una planta rodadora: una maraña redonda que gira (a: ángulo)
function e_rodadora(R, x, y, r, a, P = e_P) {
  for (let k = 0; k < 9; k++) { const a0 = a + k * 0.7, a1 = a0 + 2.1 + h(k, 1, 77) * 1.2; R.linea(Math.round(x + Math.cos(a0) * r), Math.round(y + Math.sin(a0) * r), Math.round(x + Math.cos(a1) * r * 0.8), Math.round(y + Math.sin(a1) * r * 0.8), k % 3 ? P.arD : P.maS); }
  for (let k = 0; k < 16; k++) { const aa = a + k * 0.39; R.pset(Math.round(x + Math.cos(aa) * r), Math.round(y + Math.sin(aa) * r), k % 2 ? P.arS : P.maL); }
}

// un poste de teléfono: el tronco de madera con su lado de luz, los peldaños, el travesaño y los aisladores de vidrio
function e_poste(R, x, base, alto, P = e_P, noche = false) {
  const { rect, pset } = R, top = base - alto;
  rect(x - 1, top, x + 1, base, noche ? P.nMS : P.maS); if (!noche) { rect(x - 1, top, x - 1, base, P.maL); rect(x, top, x, base, P.ma); }
  for (let y = top + 8; y < base - 4; y += 4) pset(x + ((y >> 2) & 1 ? 2 : -2), y, noche ? P.nMS : P.maD);
  rect(x - 8, top + 3, x + 8, top + 4, noche ? P.nMS : P.maS); if (!noche) rect(x - 8, top + 3, x + 8, top + 3, P.ma);
  for (const dx of [-7, -3, 3, 7]) { rect(x + dx, top + 1, x + dx, top + 2, noche ? P.nML : hex('#6ab8a8')); if (!noche) pset(x + dx, top + 1, hex('#bef0e0')); }
  rect(x - 2, base, x + 2, base, noche ? P.nMS : P.arD);
}

// un cable que cuelga entre dos puntos (catenaria aproximada)
function e_cable(R, x0, y0, x1, y1, comba, c) {
  for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) { const u = (x - x0) / (x1 - x0 || 1), y = Math.round(y0 + (y1 - y0) * u + comba * 4 * u * (1 - u)); R.pset(x, y, c); }
}

// un pictograma de filas de '#' a escala s, con el color de cada símbolo: '#' c, 'o' c2, '+' c3
function e_picto(R, filas, x, y, s, c, c2 = c, c3 = c) {
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch === '.' || ch === ' ') continue; const col = ch === 'o' ? c2 : ch === '+' ? c3 : c; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(x + i * s + a, y + j * s + b, col); } });
}

// la huella gigante (el Bigfoot): cinco dedos y la planta
const e_HUELLA = ['..#.#.#..', '.#.......', '.......#.', '..#####..', '.#######.', '.#######.', '.#######.', '..######.', '..#####..', '...####..', '...####..', '...###...'];

// una persona pequeña de fondo (8–11 px): camina (anda) o se queda; k elige la ropa; o.globo pinta un globo de un color;
// o.foto: levanta una cámara que hace flash
function e_gente(R, x, y, t, k, dir = 1, o = {}) {
  const { pset, rect } = R, ropa = [hex('#c84a4a'), hex('#4a6ab0'), hex('#e0b040'), hex('#5a9a5a'), hex('#a05ac0'), hex('#e07a3a'), hex('#3a8a9a'), hex('#e0e0e0')][k % 8], pelo = [hex('#3a2a1a'), hex('#c89a4a'), hex('#1a1a1a'), hex('#8a4a2a'), hex('#d8d0c0')][k % 5], piel = [hex('#f2c08e'), hex('#c8906a'), hex('#8a5a3a'), hex('#f6d0a8')][k % 4], pant = [hex('#2a3a5a'), hex('#4a3a2a'), hex('#3a3a3a')][k % 3];
  const ch = o.chico ? 2 : 0, paso = o.anda ? Math.floor(t * 6 + k) % 2 : 0;
  rect(x - 1, y - 2, x - 1, y - paso, pant); rect(x + 1, y - 2, x + 1, y - (1 - paso), pant);
  rect(x - 1, y - 6 + ch, x + 1, y - 3, ropa); pset(x + (dir > 0 ? 2 : -2), y - 5 + ch + (o.anda ? paso : 0), piel);
  rect(x - 1, y - 9 + ch, x + 1, y - 7 + ch, piel); rect(x - 1, y - 9 + ch, x + 1, y - 9 + ch, pelo); pset(x - dir, y - 8 + ch, pelo); pset(x + dir, y - 8 + ch, hex('#1a1420'));
  if (o.globo) { const gx = x + dir * 2, gy = y - 16 + Math.round(Math.sin(t * 2 + k)); R.linea(x + dir * 2, y - 5, gx, gy + 3, hex('#e0e0e0')); R.disco(gx, gy, 2, o.globo); pset(gx - 1, gy - 1, hex('#ffffff')); }
  if (o.foto) { rect(x + dir * 2 - 1, y - 9 + ch, x + dir * 2 + 1, y - 8 + ch, hex('#2a2a2a')); if ((t + k * 0.7) % 3 < 0.12) { R.disco(x + dir * 4, y - 9, 2, hex('#ffffff')); pset(x + dir * 6, y - 11, hex('#fff8d0')); } }
}

// los dígitos 3 × 5 en dos tonos (sombra debajo)
function e_num(R, txt, x, y, c, cs) { if (cs != null) e_cifras(R, txt, x + 1, y + 1, cs); e_cifras(R, txt, x, y, c); }

function e_carreteraGeneral(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P, tarde = o.luz === 'tarde', hor = 92;
  e_cielo(R, t, { hor, modo: tarde ? 'tarde' : 'dia', sol: tarde ? [212, 74, 12] : [232, 30, 8], estela: [38, 0.03], cumulos: 6 });
  // el halcón que planea en círculos
  { const a = t * 0.5, hx = Math.round(110 + Math.cos(a) * 24), hy = Math.round(36 + Math.sin(a) * 6), b = Math.round(Math.sin(t * 2.4)); for (let i = -4; i <= 4; i++) pset(hx + i, hy - (Math.abs(i) > 2 ? b : 0), e_col.ave); pset(hx, hy + 1, e_col.ave); }
  e_pegar(R, e_capa(R, 'carr-gen-' + (tarde ? 't' : 'd'), () => e_carreteraFija(R, hor, tarde, 0)));
  // el remolino de polvo que cruza la llanura, lejos
  { const u = (t * 0.035) % 1, dx = Math.round(lerp(250, 40, u)); for (let j = 0; j < 22; j++) { const y = 108 - j, w = 1 + j * 0.18, a = t * 6 + j * 0.6; for (let k = 0; k < 2; k++) { const xx = Math.round(dx + Math.sin(a + k * 3.1) * w + j * 0.25); if (h(xx, y, Math.floor(t * 8)) < 0.7) pset(xx, y, j < 6 ? P.arD : P.arT); } } }
  // dos vacas que pastan lejos y se mueven despacio
  for (let k = 0; k < 2; k++) { const x = Math.round(64 + k * 14 + Math.sin(t * 0.15 + k) * 4), y = 108 + k * 2, cab = Math.sin(t * 0.8 + k * 2) > 0 ? 1 : 0; R.rect(x, y - 3, x + 5, y - 1, k ? hex('#4a3020') : hex('#e8e0d0')); if (!k) R.pset(x + 2, y - 2, hex('#3a2a20')); R.pset(x, y, hex('#3a2a20')); R.pset(x + 5, y, hex('#3a2a20')); R.rect(x + 6, y - 3 + cab, x + 7, y - 2 + cab, k ? hex('#4a3020') : hex('#e8e0d0')); }
  // la gasolinera del cruce, lejos: su letrero gira
  { const gx = 262, gy = 104; const a = Math.cos(t * 2); R.rect(gx + 22, gy - 16, gx + 22, gy, hex('#5a5a6a')); const w = Math.max(1, Math.round(Math.abs(a) * 4)); R.rect(gx + 22 - w, gy - 20, gx + 22 + w, gy - 16, a > 0 ? P.ro : P.bl); if (Math.floor(t * 2) % 2) R.pset(gx + 2, gy - 9, P.amL); }
  // las sombras de las nubes que barren la llanura
  for (let k = 0; k < 2; k++) { const nx = ((t * (5 + k * 2) + k * 190) % 460) - 70; e_tinte(R, nx, 100 + k * 8, 34 - k * 8, 3, P.k, 0.16, 2); }
  // el espejismo sobre el asfalto lejano: brillos que tiemblan
  for (let k = 0; k < 26; k++) { const x = Math.round((h(k, 1, 90) * 340 + t * 9) % 340) - 10, y = 124 + (k % 2), on = Math.sin(t * 5 + k * 1.3) > 0.2; if (on) { pset(x, y, tarde ? P.amL : P.viL); pset(x + 1, y, tarde ? P.am : P.vi); } }
  // el pájaro del cable: posado, salta y vuelve
  { const u = (t % 7) / 7, vuela = u > 0.7, bx = vuela ? Math.round(lerp(98, 130, (u - 0.7) / 0.3)) : 98, by = vuela ? Math.round(84 - Math.sin((u - 0.7) / 0.3 * Math.PI) * 8) : 86;
    pset(bx, by, P.ave); pset(bx + 1, by, P.ave); pset(bx + 1, by - 1, P.ave); pset(bx - 1, by - (vuela && Math.floor(t * 10) % 2 ? 1 : 0), P.ave); pset(bx + 2, by - 1, P.am); }
  // el coche de los sesenta por el carril de delante
  let coche = null;
  if (o.coche !== false) { const dir = o.cocheDir ?? 1, u = (t * 0.085) % 1, cx = o.cocheX ?? Math.round(dir > 0 ? lerp(-60, 380, u) : lerp(380, -60, u));
    coche = coche60(R, cx, 145, t, { dir, anda: o.cocheX == null || o.anda, ocupantes: o.ocupantes, sirena: o.sirena, faros: tarde });
    if (o.cocheX == null || o.anda) for (let k = 0; k < 8; k++) { const px = cx - dir * (50 + k * 5 + ((t * 30) % 5)), py = 144 - (k % 3); if (h(k, Math.floor(t * 10), 9) < 0.6) pset(px, py, P.arL); } }
  // el primer término: la arena con rizos y piedras (capa), el saguaro, los nopales, las matas y la señal de la ruta
  e_pegar(R, e_capa(R, 'carr-gen-delante-' + (tarde ? 't' : 'd'), () => e_carreteraDelante(R, tarde)), 0, 146, 179);
  e_saguaro(R, 22, 170, 72, [[34, -1, 14], [44, 1, 20]]);
  { const u = (t % 9) / 9, vu = u > 0.8; const bx = vu ? Math.round(lerp(22, -10, (u - 0.8) / 0.2)) : 22, by = vu ? Math.round(98 - (u - 0.8) * 60) : 97 - (Math.floor(t * 1.5) % 4 === 0 ? 1 : 0);   // el pájaro del saguaro
    rect(bx - 1, by - 1, bx + 1, by, hex('#8a6a4a')); pset(bx + 2, by - 1, hex('#5a4a3a')); pset(bx + 1, by - 2, hex('#8a6a4a')); pset(bx - 2, by, hex('#5a4a3a')); }
  e_nopal(R, 262, 168, 1); e_nopal(R, 286, 175, 0.8);
  for (const [mx, my, mw] of [[70, 158, 9], [150, 175, 12], [212, 160, 8], [118, 152, 6], [246, 176, 10]]) e_mata(R, mx, my, t, mw);
  // la señal de la ruta: el escudo con el 66 en su poste
  { const sx = 300, sy = 112; rect(sx, sy + 14, sx + 1, 156, P.crS); pset(sx, sy + 14, P.crD); rect(sx - 8, sy, sx + 9, sy + 14, P.k); rect(sx - 7, sy + 1, sx + 8, sy + 12, P.bl); rect(sx - 6, sy + 2, sx + 7, sy + 5, P.k); e_num(R, '66', sx - 3, sy + 6, P.k);
    rect(sx - 5, sy + 13, sx + 6, sy + 14, P.k); rect(sx - 6, sy + 2, sx + 7, sy + 2, P.blS); pset(sx - 7, sy + 1, P.blS); }
  // la rodadora que cruza rodando y botando
  { const u = (t * 0.07) % 1, rx = Math.round(lerp(-20, 340, u)), ry = 166 - Math.round(Math.abs(Math.sin(t * 4.4)) * 6); e_rodadora(R, rx, ry, 5, t * 5); if (ry > 163) { pset(rx - 6, 171, P.arL); pset(rx - 8, 170, P.arL); } }
  // la lagartija de la piedra: se asoma y se esconde
  { const sale = Math.sin(t * 0.9) > 0.3, lx = 183 + (sale ? 0 : 4); if (sale) { rect(lx, 163, lx + 4, 163, hex('#7a8a5a')); pset(lx + 5, 164, hex('#7a8a5a')); pset(lx + 6, 164, hex('#7a8a5a')); pset(lx, 162, hex('#5a6a3a')); pset(lx + 1, 164, hex('#5a6a3a')); pset(lx + 3, 164, hex('#5a6a3a')); } }
  return { suelo: 170, pies: [44, 246], horizonte: hor, coche, carril: 145, arcen: 150, sol: tarde ? [212, 74] : [232, 30] };
}

// lo fijo del plano general (capa): las dos filas de mesetas, la llanura con matas y la cerca, los postes con sus cables,
// el cartel de la huella y la carretera con su textura
function e_carreteraFija(R, hor, tarde) {
  const { rect, pset, linea } = R, P = e_P;
  const ML = tarde ? [hex('#8a6a9a'), hex('#6e5684'), hex('#a888b0'), hex('#7e6290'), hex('#9a7aa4'), hex('#7a6290')] : [P.mL, P.mLS, P.mLL, P.mLB, P.mLT, P.mLTS];
  const MC = tarde ? [hex('#b85a40'), hex('#7a3a32'), hex('#f0a070'), hex('#9a4a38'), hex('#9a6a5a'), hex('#7a4e44')] : [P.me, P.meS, P.meL, P.meB, P.meT, P.meTS];
  // las lejanas
  e_meseta(R, 150, 196, 70, hor, 10, 12, ML, 11); e_meseta(R, 252, 262, 76, hor, 8, 10, ML, 12); e_meseta(R, 300, 340, 74, hor, 9, 10, ML, 13); e_meseta(R, 84, 108, 78, hor, 7, 10, ML, 14);
  // las cercanas, de arenisca
  e_meseta(R, 18, 74, 52, hor + 4, 22, 22, MC, 21, -1); e_meseta(R, 222, 238, 60, hor + 3, 18, 14, MC, 22, -1);
  { const x0 = 240, x1 = 248; for (let y = 48; y < 64; y++) for (let x = x0 + (y < 52 ? 1 : 0); x <= x1 - (y < 52 ? 1 : 0); x++) pset(x, y, x === x0 || (y & 3) === 0 ? MC[3] : x > x1 - 2 ? MC[1] : MC[0]); rect(x0 - 1, 47, x1 + 1, 48, MC[1]); }   // la aguja de roca
  // la llanura: bandas tramadas de lejos a cerca, matas y piedrecitas
  const fondoL = tarde ? [hex('#c89a7a'), hex('#b8886a'), hex('#a87a5a')] : [P.arF, P.arT, P.ar];
  for (let y = hor; y < 121; y++) for (let x = 0; x < 320; x++) { if (R.pget(x, y) !== e_VACIO) continue; const u = (y - hor) / 29, i = u < 0.3 ? 0 : u < 0.65 ? 1 : 2, p = (u * 3) % 1; let c = fondoL[i]; if (i < 2 && e_umbral(x, y) < p - 0.6) c = fondoL[i + 1];
    if (h(x, y, 31) < 0.05) c = tarde ? hex('#9a6a50') : P.arS; pset(x, y, c); }
  for (let k = 0; k < 70; k++) { const y = hor + 2 + Math.round(h(k, 1, 32) ** 0.8 * 26), x = Math.round(h(k, 2, 32) * 319), w = 1 + Math.round((y - hor) / 8); for (let i = 0; i < w; i++) { pset(x + i, y, tarde ? hex('#6a6a3a') : P.matS); if (i > 0 && i < w - 1) pset(x + i, y - 1, tarde ? hex('#8a8a4a') : P.mat); } }
  { const gx = 262, gy = 104; rect(gx, gy - 8, gx + 18, gy, P.k); rect(gx + 1, gy - 7, gx + 17, gy, hex('#f0e8d8')); rect(gx - 2, gy - 10, gx + 20, gy - 8, P.ro); rect(gx + 3, gy - 5, gx + 7, gy - 1, P.vi); rect(gx + 10, gy - 5, gx + 13, gy, hex('#5a5a6a')); rect(gx - 8, gy - 6, gx - 2, gy - 6, P.ro); rect(gx - 7, gy - 5, gx - 6, gy, P.bl); rect(gx - 4, gy - 5, gx - 3, gy, P.bl); }   // la gasolinera lejana
  for (let x = 4; x < 320; x += 13) { rect(x, 103, x, 107, P.maS); pset(x, 102, P.ma); } linea(0, 104, 319, 104, P.crD); linea(0, 106, 319, 106, P.crS);   // la cerca de alambre
  // el cartel de la huella gigante (pictograma, sin letras)
  { const bx = 140, by = 84; rect(bx + 4, by + 16, bx + 5, 112, P.maS); rect(bx + 30, by + 16, bx + 31, 112, P.maS); rect(bx - 1, by - 1, bx + 37, by + 17, P.k); rect(bx, by, bx + 36, by + 16, hex('#f4e4c0')); rect(bx, by + 14, bx + 36, by + 16, hex('#d8c098'));
    e_picto(R, e_HUELLA.map((f) => f), bx + 3, by + 2, 1, hex('#6a3a24')); rect(bx + 15, by + 4, bx + 26, by + 5, P.ro); rect(bx + 15, by + 8, bx + 22, by + 9, P.k); rect(bx + 15, by + 11, bx + 24, by + 11, P.blD);
    rect(bx + 27, by + 7, bx + 33, by + 8, P.ro); pset(bx + 32, by + 6, P.ro); pset(bx + 32, by + 9, P.ro); pset(bx + 34, by + 7, P.ro); pset(bx + 34, by + 8, P.ro); }
  // los postes de teléfono de la otra orilla y sus cables
  const postes = [-26, 44, 114, 184, 254, 324];
  for (let i = 0; i < postes.length - 1; i++) for (const [dy, cm] of [[1, 5], [3, 6]]) e_cable(R, postes[i] + (dy === 1 ? -7 : 7), 84 + dy, postes[i + 1] + (dy === 1 ? -7 : 7), 84 + dy, cm, tarde ? hex('#3a2a3a') : hex('#4a4050'));
  for (const px of postes) e_poste(R, px, 122, 41);
  // la cuneta, el asfalto con áridos, grietas, parches de alquitrán y las rayas
  for (let y = 120; y < 124; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 33) < 0.3 ? P.arcenS : y === 123 ? P.arD : P.arcen);
  for (let y = 124; y < 148; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 34); let c = q < 0.12 ? P.asfS : q > 0.93 ? P.asfL : P.asf; if (tarde && q > 0.9) c = hex('#8a6a6a'); pset(x, y, c); }
  for (let k = 0; k < 6; k++) { const x0 = Math.round(h(k, 1, 35) * 300), y0 = 126 + Math.round(h(k, 2, 35) * 18); let x = x0, y = y0; for (let i = 0; i < 26; i++) { pset(x, y, P.asfP); x++; if (h(k, i, 36) < 0.3) y += h(k, i, 37) < 0.5 ? 1 : -1; y = Math.max(125, Math.min(146, y)); } }   // el alquitrán de las grietas
  for (const [x0, y0, w, hh] of [[38, 138, 22, 5], [196, 127, 30, 4], [276, 140, 18, 6]]) { rect(x0, y0, x0 + w, y0 + hh, P.asfS); rect(x0, y0, x0 + w, y0, P.asfP); for (let i = 0; i < w; i += 3) pset(x0 + i + 1, y0 + 2, P.asf); }   // los parches
  for (let x = 0; x < 320; x++) { if (h(x >> 2, 1, 38) > 0.12) pset(x, 125, P.blS); if (h(x >> 2, 2, 38) > 0.15) pset(x, 146, P.blS); }
  for (let x = 2; x < 320; x += 20) { rect(x, 134, x + 10, 135, P.raya); rect(x, 135, x + 10, 135, P.rayaS); if (h(x, 1, 39) < 0.5) pset(x + 4, 134, P.rayaS); }
  for (let x = 0; x < 320; x++) pset(x, 147, P.asfP);
}

// el primer término (capa): la arena con rizos, guijarros y piedras con su sombra
function e_carreteraDelante(R, tarde) {
  const { pset, disco, rect } = R, P = e_P, A = tarde ? [hex('#d89a6a'), hex('#b87a52'), hex('#eab488'), hex('#9a6040')] : [P.ar, P.arS, P.arL, P.arD];
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) { const riz = Math.sin(x * 0.18 + y * 0.9 + Math.sin(x * 0.03) * 3); let c = y < 150 ? A[3] : riz > 0.86 ? A[1] : riz < -0.9 ? A[2] : A[0]; if (h(x, y, 41) < 0.04) c = A[1]; else if (h(x, y, 42) < 0.025) c = A[2]; pset(x, y, c); }
  for (const [x, y, r] of [[186, 166, 5], [196, 168, 3], [100, 176, 4], [292, 160, 3], [56, 172, 3]]) { for (let i = -r - 2; i <= r + 3; i++) pset(x + i, y + 1, A[3]); disco(x, y - 1, r, hex('#8a6a5a')); disco(x - 1, y - 2, r - 1, hex('#a88878')); pset(x - Math.round(r / 2), y - r, hex('#c8a898')); rect(x - r, y, x + r, y, hex('#6a4e44')); }
  for (let k = 0; k < 60; k++) pset(Math.round(h(k, 1, 43) * 319), 150 + Math.round(h(k, 2, 43) * 29), k % 2 ? hex('#8a7060') : A[2]);
}

function e_carreteraCoche(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P, tarde = o.luz === 'tarde', hor = 96, v = o.velocidad ?? 1;
  e_cielo(R, t, { hor, modo: tarde ? 'tarde' : 'dia', sol: tarde ? [100, 82, 12] : [104, 34, 8], estela: [46, 0.02], cumulos: 6 });
  // las mesetas lejanas corren despacio; la llanura con sus matas, más deprisa
  e_pegar(R, e_capa(R, 'carr-coche-lej-' + (tarde ? 't' : 'd'), () => e_cocheLejos(R, hor, tarde)), t * 3 * v, 40, hor + 2);
  e_pegar(R, e_capa(R, 'carr-coche-med-' + (tarde ? 't' : 'd'), () => e_cocheMedio(R, hor, tarde)), t * 26 * v, hor - 2, 127);
  // los postes de teléfono que pasan deprisa, con los cables que suben y bajan
  { const sep = 170, off = (t * 90 * v) % sep, xs = []; for (let k = -1; k < 3; k++) xs.push(Math.round(k * sep - off + 40));
    for (let i = 0; i < xs.length - 1; i++) for (const [dy, cm] of [[0, 9], [3, 10]]) e_cable(R, xs[i] + 9, 66 + dy, xs[i + 1] - 9, 66 + dy, cm, hex('#4a4050'));
    for (const x of xs) { rect(x - 2, 62, x + 2, 128, P.maS); rect(x - 2, 62, x - 1, 128, P.maL); rect(x, 62, x, 128, P.ma); rect(x - 13, 66, x + 13, 68, P.maS); rect(x - 13, 66, x + 13, 66, P.ma); for (const dx of [-11, -5, 5, 11]) { rect(x + dx, 62, x + dx + 1, 65, hex('#6ab8a8')); pset(x + dx, 62, hex('#bef0e0')); }
      for (let y = 76; y < 124; y += 6) rect(x + ((y / 6) & 1 ? 3 : -4), y, x + ((y / 6) & 1 ? 4 : -3), y, P.maD); rect(x - 3, 128, x + 3, 129, P.arD); } }
  // el asfalto: textura que corre, las rayas que vuelan y el borde
  { const B = R.buf, off = Math.round(t * 160 * v);
    for (let y = 128; y < 162; y++) { const f = y * 320; for (let x = 0; x < 320; x++) { const q = h((x + off) >> 1, y, 51); B[f + x] = y < 131 ? (q < 0.4 ? P.arcenS : P.arcen) : y === 131 ? P.blS : y > 159 ? P.asfP : q < 0.14 ? P.asfS : q > 0.92 ? P.asfL : P.asf; } }
    for (let x = -((off) % 40); x < 320; x += 40) { rect(x, 141, x + 22, 142, P.raya); rect(x, 142, x + 22, 142, P.rayaS); }
    for (let k = 0; k < 10; k++) { const x = ((Math.round(h(k, 1, 52) * 900) - off * 1) % 900 + 900) % 900 - 100, y = 133 + Math.round(h(k, 2, 52) * 24); rect(x, y, x + 14 + (k % 3) * 6, y, P.asfP); } }
  // el coche, quieto en el encuadre, botando
  const cx = o.cocheX ?? 168, coche = coche60(R, cx, 156, t, { s: 1.6, dir: 1, anda: true, ocupantes: o.ocupantes, sirena: o.sirena, faros: tarde });
  // el polvo que levanta detrás y las líneas de velocidad
  for (let k = 0; k < 14; k++) { const u = ((t * 2.2 + k / 14) % 1), px = Math.round(cx - 82 - u * 70), py = Math.round(154 - u * 10 - h(k, 1, 53) * 6), r = Math.round(1 + u * 4); if (px > -6) { disco(px, py, r, u < 0.4 ? P.arL : P.arT); pset(px - 1, py - r + 1, P.arF); } }
  for (let k = 0; k < 7; k++) { const u = ((t * 3 + k * 0.37) % 1), x = Math.round(330 - u * 420), y = 104 + Math.round(h(k, 3, 54) * 48); if (y > 98 && y < 122) linea(x, y, x + 16, y, hex('#f4ecd8')); }
  // el primer término: la cuneta que pasa deprisa (grava y arena estiradas en rayas, piedras y matas borrosas, hitos)
  { const B = R.buf, off = Math.round(t * 300 * v);
    for (let y = 162; y < 180; y++) { const f = y * 320, k = (y - 162) / 18; for (let x = 0; x < 320; x++) { const q = h(((x + off) / (5 + k * 8)) | 0, y, 55); B[f + x] = y === 162 ? P.asfP : y < 166 ? (q < 0.4 ? P.arcenS : q > 0.85 ? P.arL : P.arcen) : q < 0.16 ? P.arS : q > 0.9 ? P.arL : q > 0.8 ? P.arT : P.ar; } }
    for (let k = 0; k < 6; k++) { const x = ((Math.round(h(k, 1, 56) * 800) - off) % 800 + 800) % 800 - 80, y = 168 + (k % 3) * 4, L = 18 + (k % 3) * 10;
      if (k % 2) { for (let i = 0; i < L; i++) { const a = Math.sin(i / L * Math.PI); for (let j = -Math.round(a * 3); j <= 0; j++) pset(x + i, y + j, j === -Math.round(a * 3) ? P.matL : (i + j) % 3 ? P.mat : P.matS); } }
      else { for (let i = 0; i < L; i++) { const a = Math.sin(i / L * Math.PI); for (let j = -Math.round(a * 2); j <= 1; j++) pset(x + i, y + j, j === 1 ? P.arD : j === -Math.round(a * 2) ? hex('#b89888') : hex('#8a6a5a')); } } }
    for (let k = 0; k < 3; k++) { const x = ((k * 230 - Math.round(t * 240 * v)) % 690 + 690) % 690 - 30; rect(x, 158, x + 2, 176, P.k); rect(x + 1, 158, x + 1, 176, P.bl); rect(x, 160, x + 2, 162, P.am); rect(x + 1, 160, x + 1, 161, P.amL); for (let j = 0; j < 16; j++) pset(x + 3 + (j % 3), 160 + j, P.blS); } }   // los hitos con su catadióptrico
  return { suelo: 156, pies: null, horizonte: hor, coche, carril: 156 };
}

// las mesetas lejanas que se repiten cada 320 px (capa que corre)
function e_cocheLejos(R, hor, tarde) {
  const ML = tarde ? [hex('#8a6a9a'), hex('#6e5684'), hex('#a888b0'), hex('#7e6290'), hex('#9a7aa4'), hex('#7a6290')] : [e_P.mL, e_P.mLS, e_P.mLL, e_P.mLB, e_P.mLT, e_P.mLTS];
  const MC = tarde ? [hex('#b85a40'), hex('#7a3a32'), hex('#f0a070'), hex('#9a4a38'), hex('#9a6a5a'), hex('#7a4e44')] : [e_P.me, e_P.meS, e_P.meL, e_P.meB, e_P.meT, e_P.meTS];
  for (const d of [-320, 0, 320]) { e_meseta(R, 30 + d, 70 + d, 72, hor + 2, 9, 12, ML, 61); e_meseta(R, 200 + d, 226 + d, 76, hor + 2, 8, 10, ML, 62); }
  for (const d of [-320, 0, 320]) { e_meseta(R, 110 + d, 170 + d, 52, hor + 2, 22, 20, MC, 63, -1); e_meseta(R, 262 + d, 274 + d, 62, hor + 2, 16, 12, MC, 64, -1); }
}

// la llanura del plano en marcha (capa que corre): bandas tramadas, matas y la cerca
function e_cocheMedio(R, hor, tarde) {
  const { pset, rect } = R, P = e_P, F = tarde ? [hex('#c89a7a'), hex('#b8886a'), hex('#a87a5a')] : [P.arF, P.arT, P.ar];
  for (let y = hor; y < 128; y++) for (let x = 0; x < 320; x++) { const u = (y - hor) / 32, i = u < 0.3 ? 0 : u < 0.6 ? 1 : 2; let c = F[i]; if (h(x, y, 57) < 0.06) c = tarde ? hex('#9a6a50') : P.arS; pset(x, y, c); }
  for (let k = 0; k < 40; k++) { const y = hor + 4 + Math.round(h(k, 1, 58) * 26), x = Math.round(h(k, 2, 58) * 300) + 4, w = 2 + Math.round((y - hor) / 6); for (let i = 0; i < w; i++) { pset(x + i, y, P.matS); if (i > 0 && i < w - 1) pset(x + i, y - 1, P.mat); if (i === 1 && w > 4) pset(x + i, y - 2, P.matL); } }
  for (let x = 2; x < 320; x += 16) { rect(x, 108, x, 114, P.maS); pset(x, 107, P.ma); } for (let x = 0; x < 320; x++) { pset(x, 109, P.crD); pset(x, 112, P.crS); }
  { const x = 150; e_saguaro(R, x, 118, 26, [[12, -1, 6], [16, 1, 8]]); }
}

function e_feriaGeneral(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P, hor = 100;
  e_cielo(R, t, { hor, modo: 'tarde', sol: [40, 86, 13], estela: [30, 0.02], cumulos: 5 });
  bandada(R, t, { tipo: 'golondrina', n: 3, y: 40, cada: 13, v: 30 });
  e_pegar(R, e_capa(R, 'feria-gen-fondo', () => e_feriaFondo(R, hor)));
  // la noria que gira, con sus barquillas y las bombillas del aro
  e_noria(R, 70, 64, 36, t);
  // la guirnalda de bombillas de la noria a la carpa y de la carpa a la caseta
  e_guirnalda(R, 104, 70, 198, 44, 10, t, 0); e_guirnalda(R, 202, 44, 300, 96, 8, t, 3);
  // la carpa grande (capa) y su bandera al viento
  e_pegar(R, e_capa(R, 'feria-gen-carpa', () => e_carpa(R, 200, 42, 122, 62, 84)), 0, 30, 124);
  e_bandera(R, 200, 26, t, P.am, P.amS);
  // dentro, por la entrada: la luz cálida y el foco que barre
  { R.recorte([191, 98, 209, 121]); const a = Math.sin(t * 1.3) * 0.6; for (let j = 0; j < 22; j++) { const cx = 200 + Math.round(Math.sin(a) * j), w = 1 + j * 0.25; for (let i = -w; i <= w; i++) if (((i + j) & 1) === 0) pset(Math.round(cx + i), 99 + j, P.amL); }
    for (let k = 0; k < 6; k++) { const hx = 192 + k * 3, hy = 118 - (Math.sin(t * 5 + k) > 0.7 ? 1 : 0); pset(hx, hy, P.k); pset(hx, hy - 1, P.k); } R.recorte(null); }
  // el letrero de la huella gigante con su marco de bombillas que corren
  e_letreroHuella(R, 116, 56, 40, 26, t);
  // la caseta de juegos con su toldo y premios, y el carrito de palomitas
  e_caseta(R, 266, 96, 50, 30, t, [P.az, P.bl], 0);
  e_palomitas(R, 128, 124, t);
  // la gente pequeña que pasea entre las atracciones, con globos
  for (let k = 0; k < 7; k++) { const d = k % 2 ? -1 : 1, v = 6 + (k % 3) * 2.5, x = Math.round(d > 0 ? ((t * v + k * 61) % 380) - 30 : 350 - ((t * v + k * 47) % 380)), y = 130 + (k % 3) * 4;
    e_gente(R, x, y, t, k, d, { anda: true, globo: k % 3 === 0 ? [P.ro, P.az, P.am, P.rs][k % 4] : null, chico: k % 4 === 1 }); }
  // el suelo cercano (capa): tierra con serrín, paja, entradas y palomitas
  e_pegar(R, e_capa(R, 'feria-gen-suelo', () => e_sueloFeria(R, 140)), 0, 140, 179);
  // un globo que se escapa y sube
  { const u = (t * 0.09) % 1, gx = Math.round(240 + Math.sin(t * 1.4) * 6 - u * 30), gy = Math.round(150 - u * 170); if (gy > 50 || gx < 272) { linea(gx, gy + 3, gx + 1, gy + 9, P.blS); disco(gx, gy, 3, P.ro); pset(gx - 1, gy - 1, P.roL); pset(gx, gy + 3, P.roS); } }
  e_feriaDelante(R, t);
  // el poste de la guirnalda en primer término, a la derecha
  { rect(303, 92, 305, 172, P.maS); rect(303, 92, 303, 172, P.maL); rect(299, 170, 309, 172, P.maD); }
  return { suelo: 166, pies: [24, 296], horizonte: hor, carpa: { x: 200, puerta: [190, 97, 210, 122] }, letrero: [116, 56, 156, 82], noria: [70, 64, 36], caseta: [266, 96, 316, 126] };
}

// lo de delante de la feria: balas de paja, el martillo de fuerza (alguien golpea y el disco sube hasta la campana) y el
// cubo de basura a rayas
function e_feriaDelante(R, t) {
  const { rect, pset, disco, linea } = R, P = e_P;
  for (const [x, y] of [[4, 168], [26, 170], [14, 158]]) { rect(x, y - 9, x + 20, y, P.k); for (let j = y - 8; j < y; j++) for (let i = x + 1; i < x + 20; i++) pset(i, j, (i + j * 3) % 5 === 0 ? P.pajaS : j === y - 8 ? hex('#f4dc8a') : P.paja); rect(x + 6, y - 9, x + 6, y, hex('#8a5a2a')); rect(x + 14, y - 9, x + 14, y, hex('#8a5a2a')); }
  { const x = 268, base = 170; rect(x - 8, base - 3, x + 10, base, P.k); rect(x - 7, base - 3, x + 9, base - 1, P.ma);
    rect(x, 96, x + 3, base - 3, P.k); for (let y = 98; y < base - 3; y++) { const u = (y - 98) / (base - 101); rect(x + 1, y, x + 2, y, u < 0.2 ? P.ro : u < 0.45 ? P.na : u < 0.7 ? P.am : P.ve); if (y % 8 === 0) pset(x + 1, y, P.bl); }
    disco(x + 1, 93, 4, P.k); disco(x + 1, 93, 3, P.am); pset(x, 92, P.amL);
    const c = (t % 4) / 4, sube = c < 0.12 ? 0 : c < 0.4 ? (c - 0.12) / 0.28 : c < 0.5 ? 1 : 1 - (c - 0.5) / 0.4, py = Math.round(lerp(base - 6, 98, Math.sin(sube * Math.PI / 2))); rect(x - 1, py - 1, x + 4, py + 1, P.k); rect(x, py, x + 3, py, P.cr);
    if (c > 0.38 && c < 0.48) { for (const [a, b] of [[-4, -3], [6, -3], [-3, 1], [5, 1], [1, -6]]) pset(x + 1 + a, 93 + b, P.amL); }
    const mazo = c < 0.12 ? -1 : 0, mx = x - 10; e_gente(R, mx, base, t, 5, 1, {}); linea(mx + 2, base - 7, mx + 6, base - 12 - mazo * 6, P.maS); rect(mx + 5, base - 15 - mazo * 6, mx + 8, base - 12 - mazo * 6, P.ma); }
  { const x = 290, y = 174; rect(x - 6, y - 14, x + 6, y, P.k); for (let j = y - 13; j < y; j++) for (let i = x - 5; i <= x + 5; i++) pset(i, j, ((i + 40) >> 1) & 1 ? P.bl : P.ro); rect(x - 7, y - 15, x + 7, y - 14, P.crS); pset(x - 2, y - 16, P.lonaBL); pset(x + 1, y - 16, P.am); }
}

// el fondo de la feria (capa): colinas lejanas con árboles, el depósito de agua, la valla de madera y el campo
function e_feriaFondo(R, hor) {
  const { rect, pset, linea, disco } = R, P = e_P;
  e_colinas(R, 92, 8, hor, hex('#8a6a9a'), hex('#c88a8a'), 2.1, { arboles: hex('#5a4a6a'), n: 26 });
  e_colinas(R, 98, 5, hor + 2, hex('#7a6a5a'), hex('#b88a6a'), 5.3, { arboles: hex('#4a4a3a'), n: 18 });
  { const x = 292, y = 66; rect(x - 9, y, x + 9, y + 10, P.k); rect(x - 8, y + 1, x + 8, y + 9, hex('#b8a0a8')); rect(x - 8, y + 6, x + 8, y + 9, hex('#9a8090')); R.poligono([[x - 10, y], [x, y - 6], [x + 10, y]], P.k); R.poligono([[x - 8, y - 1], [x, y - 5], [x + 8, y - 1]], hex('#a8909a'));
    for (const dx of [-7, -2, 3, 7]) linea(x + dx, y + 10, x + dx + (dx < 0 ? -2 : 2), hor + 2, hex('#6a5a6a')); linea(x - 8, y + 18, x + 8, y + 18, hex('#6a5a6a')); }   // el depósito de agua del pueblo
  for (let y = hor; y < 140; y++) for (let x = 0; x < 320; x++) { const u = (y - hor) / 40, q = h(x, y, 71); let c = u < 0.25 ? hex('#a87a5a') : u < 0.6 ? P.tierraS : P.tierra; if (q < 0.08) c = P.tierraS; else if (q > 0.95) c = P.serrin; if (u > 0.2 && e_umbral(x, y) < (u - 0.2) * 0.3 && q > 0.6) c = P.tierraL; pset(x, y, c); }
  for (let x = 0; x < 320; x += 9) { rect(x, hor - 4, x + 1, hor + 3, P.maS); pset(x, hor - 5, P.ma); } rect(0, hor - 2, 319, hor - 2, P.ma); rect(0, hor + 1, 319, hor + 1, P.maS);   // la valla
  // el camino de serrín entre las atracciones
  for (let y = 120; y < 140; y++) for (let x = 0; x < 320; x++) { const w = Math.sin(x * 0.02) * 4; if (Math.abs(y - 131 - w) < 4 && h(x, y, 72) < 0.7) pset(x, y, h(x, y, 73) < 0.3 ? P.serrin : hex('#d0a878')); }
}

// el suelo cercano de la feria (capa, desde y0): tierra apisonada con serrín, paja, entradas rotas, palomitas, huellas
function e_sueloFeria(R, y0) {
  const { rect, pset } = R, P = e_P;
  for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 74), m = Math.sin(x * 0.05 + y * 0.3) + Math.sin(x * 0.013 - y * 0.07) * 1.5; let c = m > 1.2 ? P.tierraL : m < -1.4 ? P.tierraS : P.tierra; if (q < 0.06) c = P.tierraS; else if (q > 0.96) c = P.serrin; pset(x, y, c); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 75) * 319), y = y0 + 2 + Math.round(h(k, 2, 75) * (177 - y0)), a = h(k, 3, 75) < 0.5 ? 1 : -1; for (let i = 0; i < 4; i++) pset(x + i, y + Math.round(i * 0.4 * a), i % 2 ? P.paja : P.pajaS); }
  for (let k = 0; k < 7; k++) { const x = Math.round(h(k, 4, 75) * 300) + 6, y = y0 + 4 + Math.round(h(k, 5, 75) * (170 - y0)); rect(x, y, x + 3, y + 1, k % 2 ? hex('#e04a4a') : hex('#e8c040')); pset(x + 1, y, P.bl); }   // entradas rotas
  for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 6, 75) * 319), y = y0 + 3 + Math.round(h(k, 7, 75) * (175 - y0)); pset(x, y, P.lonaBL); pset(x + 1, y, P.lonaBS); }   // palomitas
  for (let k = 0; k < 5; k++) { const x = 30 + k * 60 + Math.round(h(k, 8, 75) * 20), y = y0 + 8 + (k % 3) * 9; rect(x, y, x + 4, y + 2, P.tierraS); rect(x + 1, y - 2, x + 3, y - 1, P.tierraS); }   // huellas de zapatos
}

// la noria: el caballete en A, el aro doble con bombillas en carrera, los radios que giran, las barquillas colgadas con
// gente y el eje
function e_noria(R, cx, cy, r, t) {
  const { pset, linea, disco, rect } = R, P = e_P, a0 = t * 0.22;
  for (const s of [-1, 1]) { linea(cx, cy, cx + s * 26, cy + r + 22, P.k); linea(cx + s, cy, cx + s * 27, cy + r + 22, hex('#c8c0d0')); linea(cx + s * 2, cy, cx + s * 28, cy + r + 22, hex('#8a8098')); }
  linea(cx - 18, cy + r + 4, cx + 18, cy + r + 4, hex('#8a8098'));
  for (let k = 0; k < 12; k++) { const a = a0 + k * Math.PI / 6; linea(cx, cy, Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), hex('#d8d0e0')); }
  for (let i = 0; i < 360; i++) { const a = i / 360 * Math.PI * 2; for (const rr of [r, r - 4]) pset(Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), rr === r ? hex('#f0e8f0') : hex('#b8b0c8')); }
  for (let k = 0; k < 24; k++) { const a = a0 + k * Math.PI / 12, x = Math.round(cx + Math.cos(a) * (r - 2)), y = Math.round(cy + Math.sin(a) * (r - 2)), on = (k + Math.floor(t * 6)) % 3 !== 0;
    pset(x, y, on ? [P.amL, P.roL, P.azL][k % 3] : P.amS); if (on && k % 2 === 0) { pset(x + 1, y, P.amL); } }
  disco(cx, cy, 4, P.k); disco(cx, cy, 3, hex('#c8c0d0')); pset(cx - 1, cy - 1, P.bl);
  const cols = [P.ro, P.az, P.am, P.ve, P.mo, P.na];
  for (let k = 0; k < 12; k++) { const a = a0 + k * Math.PI / 6, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r), sw = Math.round(Math.sin(t * 1.5 + k) * 0.6), c = cols[k % 6];
    linea(x, y, x + sw, y + 3, P.k); rect(x - 4 + sw, y + 3, x + 4 + sw, y + 4, c); rect(x - 4 + sw, y + 5, x + 4 + sw, y + 8, P.k); rect(x - 3 + sw, y + 5, x + 3 + sw, y + 7, c); rect(x - 3 + sw, y + 7, x + 3 + sw, y + 7, e_mezcla(c, P.k, 0.35));
    if (k % 3 !== 1) { pset(x - 1 + sw, y + 4, P.piel); pset(x + 1 + sw, y + 4, k % 2 ? P.piel : hex('#8a5a3a')); } }
  rect(cx - 30, cy + r + 20, cx + 30, cy + r + 24, P.k); rect(cx - 29, cy + r + 20, cx + 29, cy + r + 22, P.ma); rect(cx - 29, cy + r + 20, cx + 29, cy + r + 20, P.maL);   // el andén
}

// una guirnalda de bombillas entre dos puntos: el cable que cuelga y bombillas de colores que titilan con su halo
function e_guirnalda(R, x0, y0, x1, y1, comba, t, k0 = 0) {
  const P = e_P, cols = [P.amL, P.roL, P.azL, P.veL, P.neML];
  e_cable(R, x0, y0, x1, y1, comba, hex('#3a2a3a'));
  const n = Math.max(3, Math.round(Math.abs(x1 - x0) / 9));
  for (let i = 1; i < n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + comba * 4 * u * (1 - u)) + 1; if (x > 272 && y < 48) continue;
    const on = Math.sin(t * 3 + i * 1.9 + k0) > -0.6, c = cols[(i + k0) % 5]; R.pset(x, y, on ? c : hex('#6a5a5a')); R.pset(x, y + 1, on ? c : hex('#5a4a4a'));
    if (on) for (const [a, b] of [[-1, 0], [1, 0], [0, 2], [-1, 1], [1, 1]]) { const cc = R.pget(x + a, y + b); if (cc) R.pset(x + a, y + b, e_mezcla(cc, c, 0.35)); } }
}

// la carpa grande de rayas rojas y blancas: el tejado cónico con rayas radiales que se curva hasta el alero, el faldón
// de picos con borde dorado, la pared con pliegues sombreados (la luz viene de la izquierda), la entrada con las lonas
// recogidas, el mástil y los vientos con sus estacas. (cx, top): la punta; base: el suelo; mw: medio ancho; alero: y
function e_carpa(R, cx, top, base, mw, alero) {
  const { pset, rect, linea } = R, P = e_P;
  for (let y = top; y <= alero + 1; y++) { const u = (y - top) / (alero - top), w = Math.round(mw * (0.12 + 0.88 * Math.pow(u, 0.62)));
    for (let x = cx - w; x <= cx + w; x++) { const ang = (x - cx) / Math.max(1, (y - top + 4)), raya = ((Math.floor(ang * 5 + 50)) & 1) === 0, lado = (x - cx) / (w + 1);
      let c = raya ? P.lona : P.lonaB; if (lado > 0.35) c = raya ? P.lonaS : P.lonaBS; else if (lado < -0.6) c = raya ? P.lonaL : P.lonaBL; if (x === cx - w || x === cx + w) c = P.k; pset(x, y, c); } }
  // el faldón de picos con su borde dorado y borlas
  for (let x = cx - mw - 2; x <= cx + mw + 2; x++) { const k = Math.floor((x - cx + 300) / 8), f = (x - cx + 300) % 8, pico = 4 - Math.abs(f - 3.5); for (let y = alero; y <= alero + 2 + pico; y++) pset(x, y, y === alero ? P.amS : (k & 1) ? P.lonaB : P.lona); pset(x, alero + 3 + Math.round(pico), P.k); if (f === 4) pset(x, alero + 8, P.am); }
  // la pared con pliegues
  for (let y = alero + 3; y <= base; y++) for (let x = cx - mw; x <= cx + mw; x++) { const k = Math.floor((x - cx + 300) / 8), f = (x - cx + 300) % 8, lado = (x - cx) / mw; let c = (k & 1) ? P.lonaB : P.lona;
      if (f === 0 || f === 7) c = (k & 1) ? P.lonaBS : P.lonaS; if (lado > 0.3 && f > 3) c = (k & 1) ? P.lonaBS : P.lonaS; if (lado < -0.5 && f < 3) c = (k & 1) ? P.lonaBL : P.lonaL; if (y > base - 3) c = e_mezcla(c, P.tierraS, 0.4); if (x === cx - mw || x === cx + mw) c = P.k; pset(x, y, c); }
  // la entrada: el hueco oscuro y las dos lonas recogidas con su cuerda
  rect(cx - 10, alero + 12, cx + 10, base, hex('#2a1418')); rect(cx - 10, alero + 12, cx + 10, alero + 12, P.k);
  for (const s of [-1, 1]) { for (let j = 0; j <= base - alero - 12; j++) { const w = Math.round(3 + (base - alero - 12 - j) * 0.06 + (j < 10 ? (10 - j) * 0.6 : 0)); for (let i = 0; i < w; i++) pset(cx + s * (10 - i), alero + 12 + j, i === w - 1 ? P.k : (i & 2) ? P.lonaS : P.lona); }
    rect(cx + s * 9 - 1, alero + 22, cx + s * 9 + 1, alero + 23, P.am); }
  // el mástil que asoma y los vientos con sus estacas
  rect(cx - 1, top - 14, cx, top, P.maS); pset(cx - 1, top - 14, P.am);
  for (const s of [-1, 1]) for (const k of [0.35, 0.8]) { const ax = Math.round(cx + s * mw * k), ay = Math.round(top + (alero - top) * Math.pow(k, 1 / 0.62) * 0.98), bx = cx + s * (mw + 14 + k * 10); linea(ax, ay, bx, base, hex('#c8b898')); rect(bx - 1, base - 2, bx, base, P.maS); }
}

// una bandera que ondea en lo alto de un mástil (x, y: la punta)
function e_bandera(R, x, y, t, c, cS) {
  for (let i = 1; i <= 10; i++) { const o = Math.round(Math.sin(t * 6 - i * 0.7) * (i / 6)); for (let j = 0; j < 5 - Math.floor(i / 3); j++) R.pset(x + i, y + j + o, j === 0 || (i + j) % 4 === 0 ? cS : c); }
  R.pset(x, y - 1, e_P.am);
}

// el letrero de la huella gigante: el panel con el pictograma de la huella y una flecha, y su marco de bombillas que
// corren (en el sentido de la flecha); patas de madera hasta el suelo
function e_letreroHuella(R, x, y, w, hh, t, s = 2) {
  const { rect, pset } = R, P = e_P;
  rect(x + 6, y + hh, x + 8, y + hh + 44, P.maS); rect(x + w - 8, y + hh, x + w - 6, y + hh + 44, P.maS); rect(x + 6, y + hh, x + 6, y + hh + 44, P.maL);
  rect(x - 2, y - 2, x + w + 2, y + hh + 2, P.k); rect(x - 1, y - 1, x + w + 1, y + hh + 1, P.roS); rect(x + 2, y + 2, x + w - 2, y + hh - 2, hex('#f6e8c8')); rect(x + 2, y + hh - 4, x + w - 2, y + hh - 2, hex('#e0c8a0'));
  e_picto(R, e_HUELLA, x + 4, y + 2, s, hex('#5a3420')); for (let j = 0; j < 12 * s; j += 3) pset(x + 6 + (j % 5), y + 4 + j, hex('#7a4a30'));
  const ax = x + 4 + 9 * s + 2, ay = y + Math.round(hh / 2) - 2; rect(ax, ay, ax + w - 9 * s - 14, ay + 3, P.ro); for (let i = 0; i < 5; i++) rect(ax + w - 9 * s - 13 + i, ay - 3 + i, ax + w - 9 * s - 13 + i, ay + 6 - i, P.ro);
  const per = 2 * (w + hh) + 8; let k = 0;
  for (let i = -1; i <= w + 1; i += 3) { for (const yy of [y - 1, y + hh + 1]) { const on = (k + Math.floor(t * 8)) % 4 !== 0; pset(x + i, yy, on ? P.amL : P.amS); k++; } }
  for (let j = 2; j < hh; j += 3) for (const xx of [x - 1, x + w + 1]) { const on = (k + Math.floor(t * 8)) % 4 !== 0; pset(xx, y + j, on ? P.amL : P.amS); k++; }
  return per;
}

// una caseta de juegos: el toldo a rayas con su faldón de picos, el mostrador, los premios colgados (muñecos que se
// balancean) y botellas para tumbar; cols: [color, blanco]
function e_caseta(R, x, y, w, hh, t, cols, k0 = 0) {
  const { rect, pset, disco } = R, P = e_P;
  rect(x, y + 6, x + w, y + hh, P.k); rect(x + 1, y + 7, x + w - 1, y + hh - 9, hex('#3a2430'));
  for (let k = 0; k < 6; k++) { const px = x + 5 + k * 8, sw = Math.round(Math.sin(t * 2 + k) * 0.8), c = [P.rs, P.am, P.azL, P.veL, P.na, P.mo][(k + k0) % 6]; R.linea(px, y + 7, px + sw, y + 10, P.blS); disco(px + sw, y + 13, 3, c); disco(px + sw, y + 10, 2, c); pset(px + sw - 1, y + 10, P.k); pset(px + sw + 1, y + 10, P.k); pset(px + sw - 2, y + 8, c); pset(px + sw + 2, y + 8, c); }
  for (let k = 0; k < 4; k++) { const bx = x + 8 + k * 4; rect(bx, y + hh - 14, bx + 1, y + hh - 10, hex('#e8f0f0')); pset(bx, y + hh - 15, P.bl); }
  rect(x - 1, y + hh - 9, x + w + 1, y + hh - 7, P.k); rect(x, y + hh - 9, x + w, y + hh - 8, P.maL); rect(x, y + hh - 6, x + w, y + hh, hex('#e8d8b8')); for (let i = x + 2; i < x + w; i += 6) rect(i, y + hh - 6, i + 2, y + hh, cols[0]);
  for (let i = 0; i <= w; i++) { const k = Math.floor(i / 6); for (let j = 0; j < 6; j++) pset(x + i, y + j, j === 0 ? P.k : (k & 1) ? cols[1] : cols[0]); const pico = 2 - Math.abs((i % 6) - 2.5) * 0.8; for (let j = 6; j < 7 + pico; j++) pset(x + i, y + j, (k & 1) ? cols[1] : cols[0]); }
  rect(x, y, x, y + hh, P.k); rect(x + w, y, x + w, y + hh, P.k);
}

// el carrito de palomitas: la vitrina de cristal donde saltan las palomitas, el techo a rayas y las ruedas
function e_palomitas(R, x, base, t) {
  const { rect, pset, disco } = R, P = e_P;
  rect(x - 9, base - 30, x + 9, base - 26, P.k); for (let i = -8; i <= 8; i++) for (let j = -29; j <= -27; j++) pset(x + i, base + j, ((i + 20) >> 2) & 1 ? P.ro : P.bl);
  rect(x - 8, base - 26, x + 8, base - 12, P.k); rect(x - 7, base - 25, x + 7, base - 13, hex('#f8e8b0')); rect(x - 7, base - 17, x + 7, base - 13, P.lonaBL);
  for (let k = 0; k < 9; k++) { const u = ((t * 1.7 + k * 0.37) % 1), px = x - 6 + ((k * 5) % 13), py = base - 17 - Math.round(Math.sin(u * Math.PI) * 7); pset(px, py, P.bl); }
  pset(x - 6, base - 24, P.bl); pset(x - 5, base - 23, P.bl);
  rect(x - 9, base - 12, x + 9, base - 4, P.k); rect(x - 8, base - 11, x + 8, base - 5, P.ro); rect(x - 8, base - 11, x + 8, base - 11, P.roL); rect(x - 2, base - 9, x + 2, base - 7, P.am);
  disco(x - 5, base - 2, 2, P.k); disco(x + 5, base - 2, 2, P.k); pset(x - 5, base - 2, P.cr); pset(x + 5, base - 2, P.cr);
}

function e_feriaCarpa(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P;
  e_cielo(R, t, { hor: 60, modo: 'tarde', sol: null, estela: null, cumulos: 3 });
  e_pegar(R, e_capa(R, 'feria-carpa-fija', () => e_carpaCerca(R)));
  // los banderines de la guirnalda alta que se mecen
  for (let i = 0; i < 16; i++) { const u = i / 16, x = Math.round(8 + u * 250), y = Math.round(18 + 10 * 4 * u * (1 - u)), sw = Math.round(Math.sin(t * 3 + i) * 1); const c = [P.ro, P.am, P.az, P.ve, P.rs][i % 5]; for (let j = 0; j < 5; j++) for (let k = -2 + Math.ceil(j / 2); k <= 2 - Math.ceil(j / 2); k++) pset(x + k + (j > 2 ? sw : 0), y + 1 + j, c); }
  e_cable(R, 4, 16, 262, 16, 10, hex('#4a3040'));
  // dentro: el foco que barre la pista y el público que se mueve
  { R.recorte([126, 72, 194, 139]); const a = Math.sin(t * 0.9) * 0.7;
    for (let j = 0; j < 68; j++) { const cx = 160 + Math.round(Math.sin(a) * j), w = 2 + j * 0.3; for (let i = -w; i <= w; i++) { const xx = Math.round(cx + i), yy = 72 + j; if (((xx + yy) & 1) === 0) { const c = R.pget(xx, yy); R.pset(xx, yy, e_mezcla(c, P.amL, 0.45)); } } }
    for (let k = 0; k < 16; k++) { const hx = 128 + (k % 8) * 8 + (k > 7 ? 4 : 0), hy = 104 + (k > 7 ? 8 : 0) - (Math.sin(t * 4 + k * 1.3) > 0.75 ? 1 : 0); disco(hx, hy, 2, hex('#2a1418')); pset(hx, hy + 3, hex('#2a1418')); rect(hx - 2, hy + 3, hx + 2, hy + 5, hex('#3a2028')); }
    R.recorte(null); }
  // el taquillero de la taquilla, que asoma y despacha
  { const sx = 44 + Math.round(Math.sin(t * 0.8) * 2); rect(sx - 2, 104, sx + 2, 108, P.piel); rect(sx - 2, 103, sx + 2, 103, hex('#3a2a1a')); rect(sx - 3, 102, sx + 3, 102, P.k); rect(sx - 2, 100, sx + 2, 101, hex('#d8c040')); pset(sx + 1, 106, P.k); pset(sx - 1, 106, P.k); rect(sx - 3, 109, sx + 3, 114, P.ro); rect(sx - 1, 109, sx + 1, 110, P.bl);
    if (Math.sin(t * 1.6) > 0.4) { rect(sx + 4, 112, sx + 9, 113, P.am); pset(sx + 9, 112, P.amS); } }
  // la puerta de la jaula, que se mece en sus bisagras
  { const a = 0.5 + Math.sin(t * 1.4) * 0.35, hx = 292, w = 20; for (let i = 0; i <= w; i++) { const xx = Math.round(hx + Math.cos(a) * i * 0.9), dy = Math.round(Math.sin(a) * i * 0.15); if (i % 4 === 0 || i === w) { linea(xx, 92 + dy, xx, 136 + dy, P.crD); linea(xx + 1, 92 + dy, xx + 1, 136 + dy, P.cr); } pset(xx, 92 + dy, P.crS); pset(xx, 93 + dy, P.crD); pset(xx, 114 + dy, P.crS); pset(xx, 135 + dy, P.crS); pset(xx, 136 + dy, P.crD); } }
  // las moscas en la paja de la jaula
  for (let k = 0; k < 3; k++) pset(Math.round(262 + Math.sin(t * 7 + k * 2) * 6), Math.round(124 + Math.cos(t * 9 + k) * 4), P.k);
  return { suelo: 162, pies: [76, 226], horizonte: 60, puerta: [128, 70, 192, 140], taquilla: [20, 84, 70, 140], jaula: [228, 84, 312, 142], huellas: [[236, 156], [264, 166], [290, 158], [314, 170]] };
}

// lo fijo de la entrada de la carpa (capa): el tejado y la pared de rayas grandes con pliegues, el faldón de picos con
// bombillas, la entrada con las lonas recogidas, la taquilla, la jaula del Bigfoot con los barrotes doblados, el letrero
// de la huella, el suelo con serrín, estacas, cuerdas y las huellas gigantes que se van
function e_carpaCerca(R) {
  const { rect, pset, disco, linea } = R, P = e_P;
  // el tejado que sube hacia la punta (fuera del encuadre) y la pared
  const TJ = [hex('#9a5a5c'), hex('#86484c'), hex('#a46668'), hex('#b49c98'), hex('#9c8682'), hex('#bea8a2')];   // el tejado, en la sombra del atardecer: poco contraste (la barra del año y Atom quedan tranquilas)
  for (let y = 0; y < 50; y++) { const w = Math.round(110 + y * 2.6); for (let x = 160 - w; x <= 160 + w; x++) { if (x < 0 || x > 319) continue; const ang = (x - 160) / (y + 60), raya = ((Math.floor(ang * 7 + 50)) & 1) === 0, lado = (x - 160) / (w + 1), m = Math.max(0, Math.min(1, (y - 24) / 22));
      let c = raya ? TJ[0] : TJ[3]; if (lado > 0.45) c = raya ? TJ[1] : TJ[4]; else if (lado < -0.55) c = raya ? TJ[2] : TJ[5]; if (m > 0 && e_umbral(x, y) < m) c = raya ? (lado > 0.45 ? P.lonaS : P.lona) : (lado > 0.45 ? P.lonaBS : P.lonaB); if ((y * 7 + x) % 23 === 0) c = e_mezcla(c, P.k, 0.15); if (Math.abs(x - (160 - w)) < 1 || Math.abs(x - (160 + w)) < 1) c = P.k; pset(x, y, c); } }
  for (let x = 0; x < 320; x++) { const k = Math.floor(x / 14), f = x % 14, pico = 6 - Math.abs(f - 6.5); for (let y = 46; y <= 50 + pico; y++) pset(x, y, y <= 47 ? P.amS : (k & 1) ? P.lonaB : P.lona); pset(x, 51 + Math.round(pico), P.k); if (f === 7) { rect(x, 52 + 6, x, 60, P.am); pset(x, 61, P.amS); } }
  for (let y = 52; y < 142; y++) for (let x = 0; x < 320; x++) { if (R.pget(x, y) !== e_VACIO && y < 62) continue; const k = Math.floor(x / 16), f = x % 16, lado = (x - 160) / 160; let c = (k & 1) ? P.lonaB : P.lona;
      if (f < 2 || f > 13) c = (k & 1) ? P.lonaBS : P.lonaS; else if (f < 5 && lado < 0) c = (k & 1) ? P.lonaBL : P.lonaL; else if (f > 9 && lado > 0) c = (k & 1) ? P.lonaBS : P.lonaS;
      if (h(x >> 1, y >> 3, 81) < 0.04) c = e_mezcla(c, P.k, 0.12); if (y > 136) c = e_mezcla(c, P.tierraS, 0.35); pset(x, y, c); }
  // la entrada: el interior oscuro con las gradas y la pista
  rect(126, 70, 194, 140, hex('#2a1418')); for (let y = 96; y < 122; y += 4) rect(126, y, 194, y, hex('#3a2028')); rect(126, 124, 194, 140, hex('#5a3a2a')); for (let x = 126; x < 195; x++) if (h(x, 1, 82) < 0.5) pset(x, 124 + Math.round(h(x, 2, 82) * 15), hex('#7a5a3a'));
  rect(126, 122, 194, 123, hex('#c83a3a'));   // el borde de la pista
  rect(125, 69, 195, 70, P.k);
  for (const s of [-1, 1]) for (let j = 0; j < 71; j++) { const w = Math.round(6 + (70 - j) * 0.05 + (j < 26 ? (26 - j) * 0.9 : 0)); for (let i = 0; i < w; i++) { const xx = 160 + s * (34 - i), f = (i + Math.round(j * 0.15)) % 6; pset(xx, 70 + j, i === w - 1 ? P.k : f < 2 ? P.lonaS : f === 5 ? P.lonaL : P.lona); } }
  for (const s of [-1, 1]) { rect(160 + s * 32 - 2, 96, 160 + s * 32 + 2, 98, P.am); pset(160 + s * 32, 99, P.amS); }
  // la taquilla: la caseta roja y dorada con su ventanilla, el tejadillo y el farolillo
  { const x0 = 20, x1 = 70; rect(x0, 84, x1, 142, P.k); rect(x0 + 1, 85, x1 - 1, 141, P.ro); for (let y = 88; y < 141; y += 6) rect(x0 + 1, y, x1 - 1, y, P.roS); rect(x0 + 1, 85, x0 + 3, 141, P.roL);
    rect(x0 + 8, 96, x1 - 8, 116, P.k); rect(x0 + 9, 97, x1 - 9, 115, hex('#4a2a20')); rect(x0 + 9, 97, x1 - 9, 98, hex('#6a3a28')); for (let x = x0 + 12; x < x1 - 9; x += 5) rect(x, 97, x, 101, P.amS);
    rect(x0 + 6, 116, x1 - 6, 118, P.am); rect(x0 + 6, 118, x1 - 6, 118, P.amS); rect(x0 + 6, 124, x1 - 6, 136, P.roS); e_picto(R, ['.###.', '#...#', '#.#.#', '#...#', '.###.'], x0 + 21, 126, 2, P.am);
    rect(x0 - 3, 78, x1 + 3, 84, P.k); rect(x0 - 2, 79, x1 + 2, 83, P.am); for (let x = x0 - 2; x <= x1 + 2; x += 4) pset(x, 81, P.amL); R.poligono([[x0 - 2, 78], [45, 66], [x1 + 2, 78]], P.k); R.poligono([[x0 + 1, 77], [45, 68], [x1 - 1, 77]], P.ro);
    rect(44, 60, 46, 66, P.am); disco(45, 59, 2, P.amL); }
  // la jaula del Bigfoot: el carromato con sus ruedas, la paja, los barrotes (dos doblados hacia fuera), la puerta abierta
  { const x0 = 228, x1 = 292, y0 = 84, y1 = 136;
    rect(x0 - 3, y0 - 6, x1 + 3, y0, P.k); rect(x0 - 2, y0 - 5, x1 + 2, y0 - 1, P.roS); rect(x0 - 2, y0 - 5, x1 + 2, y0 - 5, P.roL); for (let x = x0; x < x1; x += 8) rect(x, y0 - 4, x + 3, y0 - 2, P.am);
    rect(x0, y0, x1, y1, hex('#3a2a20')); for (let y = y0; y < y1; y += 5) rect(x0, y, x1, y, hex('#4a3426'));
    for (let x = x0; x <= x1; x++) for (let y = y1 - 10; y <= y1; y++) if (h(x, y, 83) < 0.6 - (y1 - y) * 0.05) pset(x, y, h(x, y, 84) < 0.5 ? P.paja : P.pajaS);
    for (let k = 0; k < 6; k++) { const x = x0 + 4 + Math.round(h(k, 1, 85) * 56), y = y1 - 14 - Math.round(h(k, 2, 85) * 10); pset(x, y, hex('#6a4a30')); pset(x + 1, y + 1, hex('#5a3a24')); }   // pelos del Bigfoot
    for (let x = x0 + 2; x <= x1; x += 6) { const doblado = x === x0 + 26 || x === x0 + 32; for (let y = y0; y <= y1; y++) { const dx = doblado ? Math.round(Math.sin((y - y0) / (y1 - y0) * Math.PI) * (x === x0 + 26 ? -4 : 4)) : 0; pset(x + dx, y, P.crD); pset(x + dx + 1, y, P.cr); } }
    rect(x0 - 3, y1, x1 + 3, y1 + 4, P.k); rect(x0 - 2, y1, x1 + 2, y1 + 3, P.ma); rect(x0 - 2, y1, x1 + 2, y1, P.maL);
    for (const wx of [x0 + 10, x1 - 10]) { disco(wx, y1 + 6, 7, P.k); disco(wx, y1 + 6, 6, P.ro); disco(wx, y1 + 6, 4, P.k); disco(wx, y1 + 6, 3, P.am); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(wx, y1 + 6, Math.round(wx + Math.cos(a) * 5), Math.round(y1 + 6 + Math.sin(a) * 5), P.am); } pset(wx, y1 + 6, P.k); }
    rect(x0 + 34, y1 + 18, x0 + 37, y1 + 20, P.crS); rect(x0 + 35, y1 + 16, x0 + 36, y1 + 17, P.crD);   // el candado roto en el suelo
  }
  // el letrero de la huella sobre la jaula
  e_letreroHuellaFijo(R, 236, 56, 48, 22);
  // el suelo: tierra con serrín, paja y las huellas gigantes que salen de la jaula
  e_sueloFeria(R, 142);
  for (const [x, y] of [[236, 150], [262, 164], [290, 152], [316, 166]]) { e_picto(R, e_HUELLA, x - 8, y - 11, 2, hex('#e0b88a')); e_picto(R, e_HUELLA, x - 9, y - 12, 2, hex('#5e3e28')); }
  for (const [x, s] of [[6, 1], [112, -1], [208, 1]]) { rect(x, 146, x + 1, 152, P.maS); pset(x, 145, P.maL); linea(x, 146, x + s * 14, 128, hex('#c8b898')); }   // estacas y cuerdas
}

// el letrero de la huella sin bombillas (para una capa fija)
function e_letreroHuellaFijo(R, x, y, w, hh) {
  const { rect, pset } = R, P = e_P;
  rect(x - 2, y - 2, x + w + 2, y + hh + 2, P.k); rect(x - 1, y - 1, x + w + 1, y + hh + 1, P.am); rect(x + 2, y + 2, x + w - 2, y + hh - 2, hex('#f6e8c8'));
  e_picto(R, e_HUELLA, x + 4, y + 2, 1, hex('#5a3420')); e_picto(R, e_HUELLA, x + 16, y + 6, 1, hex('#5a3420'));
  rect(x + 28, y + 9, x + w - 8, y + 11, P.ro); for (let i = 0; i < 4; i++) rect(x + w - 8 + i, y + 7 + i, x + w - 8 + i, y + 13 - i, P.ro);
  for (let i = 0; i <= w; i += 4) { pset(x + i, y - 1, P.amL); pset(x + i, y + hh + 1, P.amL); }
}

function e_atraccionGeneral(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P, hor = 90;
  e_cielo(R, t, { hor, modo: 'dia', sol: [238, 28, 8], estela: [34, 0.04], cumulos: 6 });
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 44, cada: 9, v: 34 });
  e_pegar(R, e_capa(R, 'atr-gen-fondo', () => e_atrFondo(R, hor)), 0, 50, 124);
  // el molino de la granja, que gira
  e_molino(R, 232, 60, t);
  // el trigo que ondula con el viento
  { const B = R.buf; for (let y = 96; y < 114; y++) { const f = y * 320; for (let x = 0; x < 320; x++) { const c = B[f + x]; if (c !== P.trigo && c !== P.trigoS) continue; const w = Math.sin(x * 0.06 - t * 2.4 + y * 0.2); if (w > 0.75) B[f + x] = P.trigoL; else if (w < -0.85) B[f + x] = P.trigoS; } } }
  // la camioneta que pasa por la carretera del fondo
  { const u = (t * 0.06) % 1, x = Math.round(lerp(360, -40, u)); rect(x - 10, 113, x + 10, 118, P.k); rect(x - 9, 114, x + 9, 117, hex('#3a7ac8')); rect(x - 9, 109, x - 1, 113, P.k); rect(x - 8, 110, x - 2, 113, hex('#3a7ac8')); rect(x - 7, 110, x - 4, 112, P.vi); disco(x - 6, 119, 2, P.k); disco(x + 6, 119, 2, P.k); pset(x - 10, 115, P.amL); for (let k = 0; k < 4; k++) pset(x + 12 + k * 3, 117 - (k % 2), P.arL); }
  // lo de delante (capa): el pabellón con el ovillo, el cartel, la tienda, el dinosaurio y el aparcamiento
  e_pegar(R, e_capa(R, 'atr-gen-delante', () => e_atrDelante(R)), 0, 40, 179);
  // las bombillas del cartel de la flecha, que corren hacia el ovillo
  for (let i = 0; i < 12; i++) { const x = 140 + i * 3, on = (12 - i + Math.floor(t * 9)) % 4 !== 0; pset(x, 49, on ? P.amL : P.amS); pset(x, 67, on ? P.amL : P.amS); }
  // los turistas: fotos con flash, un niño que señala al dinosaurio
  e_gente(R, 112, 147, t, 1, 1, { foto: true }); e_gente(R, 126, 148, t, 4, 1, {}); e_gente(R, 206, 147, t, 6, 1, { foto: true }); e_gente(R, 268, 148, t, 3, -1, { chico: true });
  if (Math.sin(t * 3) > 0) { pset(265, 140, P.piel); pset(264, 139, P.piel); }
  // el pájaro posado en la cabeza del dinosaurio, que salta
  { const sal = Math.floor(t * 1.3) % 5 === 0 ? 2 : 0; rect(193, 55 - sal, 195, 56 - sal, P.ave); pset(196, 55 - sal, P.am); pset(192, 54 - sal, P.ave); }
  // las cintas de la tienda que ondean
  for (let k = 0; k < 5; k++) { const x = 146 + k * 9; for (let j = 0; j < 5; j++) pset(x + Math.round(Math.sin(t * 5 + k + j * 0.5) * (j / 3)), 118 + j, [P.ro, P.am, P.az, P.ve, P.rs][k]); }
  return { suelo: 166, pies: [52, 262], horizonte: hor, ovillo: [72, 118, 24], dinosaurio: [240, 118], tienda: [140, 104, 186, 146], cartel: [138, 48, 176, 68] };
}

// el fondo de la pradera (capa): colinas, la granja con el granero y el silo, la hilera de árboles, el trigo y la carretera
function e_atrFondo(R, hor) {
  const { rect, pset, linea, disco } = R, P = e_P;
  e_colinas(R, 84, 8, hor, hex('#8aaa7a'), hex('#b8d0c0'), 3.3, { arboles: hex('#5a7a5a'), n: 24 });
  e_colinas(R, 90, 5, hor + 6, P.prado, hex('#a8c890'), 6.1, { arboles: hex('#4a6a3a'), n: 30 });
  // el granero rojo con su tejado, las puertas en aspa y el silo
  { const x = 250; rect(x, 74, x + 28, 94, P.k); rect(x + 1, 75, x + 27, 94, P.granero); for (let xx = x + 2; xx < x + 27; xx += 3) rect(xx, 75, xx, 94, P.graneroS); R.poligono([[x - 2, 75], [x + 14, 62], [x + 30, 75]], P.k); R.poligono([[x, 74], [x + 14, 64], [x + 28, 74]], hex('#5a5a62')); linea(x + 14, 64, x + 28, 74, hex('#3a3a42'));
    rect(x + 9, 82, x + 19, 94, P.bl); linea(x + 9, 82, x + 19, 94, P.bl); rect(x + 10, 83, x + 18, 93, P.graneroS); linea(x + 10, 83, x + 18, 93, P.bl); linea(x + 18, 83, x + 10, 93, P.bl); rect(x + 12, 68, x + 16, 71, P.bl);
    rect(x + 32, 58, x + 42, 94, P.k); rect(x + 33, 59, x + 41, 94, hex('#c8ccd4')); rect(x + 39, 59, x + 41, 94, hex('#9aa0ac')); for (let y = 62; y < 94; y += 4) rect(x + 33, y, x + 41, y, hex('#aab0bc')); disco(x + 37, 58, 5, P.k); disco(x + 37, 58, 4, hex('#d8dce4')); }
  // la hilera de árboles junto a la granja
  for (let k = 0; k < 9; k++) { const x = 118 + k * 7 + Math.round(h(k, 1, 92) * 4), y = 92, r = 4 + Math.round(h(k, 2, 92) * 2); disco(x, y - r, r, hex('#3a6a3a')); disco(x - 1, y - r - 1, r - 1, hex('#4a8a4a')); pset(x - 2, y - r - 2, hex('#7ab85a')); }
  // el trigo y el borde de hierba
  for (let y = 94; y < 112; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 93); let c = (x + (y >> 1)) % 3 === 0 ? P.trigoS : P.trigo; if (q > 0.93) c = P.trigoL; if (y === 94 && q < 0.5) c = P.trigoL; pset(x, y, c); }
  for (let x = 0; x < 320; x += 2) pset(x, 93 - (h(x, 1, 94) < 0.5 ? 1 : 0), P.trigoS);
  // la carretera del fondo con su línea
  for (let y = 112; y < 121; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 112 || y === 120 ? P.pradoS : h(x, y, 95) < 0.15 ? P.asfS : P.asf);
  for (let x = 0; x < 320; x += 14) rect(x, 116, x + 6, 116, P.raya);
  for (let y = 121; y < 124; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 96) < 0.4 ? P.pradoS : P.prado);
}

// el molino de viento de la granja: la torre de celosía, la cola y las aspas que giran
function e_molino(R, x, y, t) {
  const { linea, pset, disco, rect } = R, P = e_P;
  linea(x - 1, y + 2, x - 6, 94, P.crD); linea(x + 1, y + 2, x + 6, 94, P.crD); for (let yy = y + 8; yy < 94; yy += 7) { const w = Math.round((yy - y) * 0.17); linea(x - w, yy, x + w, yy, P.crS); }
  rect(x, y - 1, x + 9, y, P.crD); R.poligono([[x + 8, y - 4], [x + 12, y - 4], [x + 12, y + 3], [x + 8, y + 1]], P.crS);
  const a0 = t * 2.4; for (let k = 0; k < 12; k++) { const a = a0 + k * Math.PI / 6; for (let d = 2; d <= 9; d++) pset(Math.round(x + Math.cos(a) * d), Math.round(y + Math.sin(a) * d), d > 3 ? (k % 2 ? P.bl : P.blS) : P.crD); }
  disco(x, y, 1, P.k);
}

// lo de delante (capa): el pabellón de madera con el ovillo gigante en su peana, el cartel de la flecha, la tienda de
// recuerdos, el dinosaurio de fibra de vidrio y el aparcamiento con dos coches
function e_atrDelante(R) {
  const { rect, pset, disco, linea } = R, P = e_P;
  // el aparcamiento: asfalto viejo con grietas, manchas de aceite, plazas pintadas y topes
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 101); let c = q < 0.12 ? hex('#7a7884') : q > 0.94 ? hex('#a8a6b0') : hex('#8e8c98'); if (y < 127) c = q < 0.5 ? P.pradoS : P.prado; pset(x, y, c); }
  for (let k = 0; k < 9; k++) { const x = 8 + k * 38; for (let j = 0; j < 30; j++) pset(x + Math.round(j * 0.5), 150 + j, P.blS); }
  for (const [x, y, rx] of [[96, 168, 10], [180, 158, 8], [250, 174, 12]]) e_manchaAceite(R, x, y, rx);
  for (let k = 0; k < 5; k++) { let x = Math.round(h(k, 1, 102) * 300), y = 130 + Math.round(h(k, 2, 102) * 46); for (let i = 0; i < 18; i++) { pset(x, y, hex('#5e5c68')); x += h(k, i, 103) < 0.7 ? 1 : 0; y += h(k, i, 104) < 0.5 ? 1 : -1; } }
  rect(0, 146, 319, 147, hex('#c8c4cc')); rect(0, 148, 319, 148, hex('#6a6874'));   // el bordillo
  // el pabellón: tejado de tejuelas, vigas y postes
  { const x0 = 16, x1 = 128; R.poligono([[x0 - 6, 82], [x0 + 18, 64], [x1 - 18, 64], [x1 + 6, 82]], P.k);
    for (let y = 65; y < 82; y++) { const w0 = x0 - 5 + Math.round((82 - y) * 1.3), w1 = x1 + 5 - Math.round((82 - y) * 1.3); for (let x = w0; x <= w1; x++) { const fila = (y - 65) >> 2, off = fila & 1 ? 3 : 0; let c = (y - 65) % 4 === 3 ? hex('#5a3a2a') : ((x + off) % 6 === 0) ? hex('#6a4430') : h(x >> 1, fila, 105) < 0.2 ? hex('#7a5038') : hex('#8a5e40'); if (x < w0 + 3) c = hex('#a0704a'); pset(x, y, c); } }
    rect(x0 - 6, 82, x1 + 6, 85, P.k); rect(x0 - 5, 82, x1 + 5, 84, P.maL); rect(x0 - 5, 84, x1 + 5, 84, P.ma);
    rect(x0 + 20, 85, x1 - 20, 87, P.maS); for (const px of [x0, x1 - 4]) { rect(px, 85, px + 4, 146, P.k); rect(px + 1, 85, px + 3, 146, P.ma); rect(px + 1, 85, px + 1, 146, P.maL); rect(px - 1, 143, px + 5, 146, P.maD); }
    for (let x = x0 + 5; x < x1 - 4; x++) if (x % 4 === 0) { const y = 86 + Math.round(Math.sin((x - x0) / (x1 - x0) * Math.PI) * 3); pset(x, y, [P.amL, P.roL, P.azL][(x >> 2) % 3]); } }
  // la peana de ladrillo con la placa y el ovillo
  { const cx = 72; rect(cx - 30, 138, cx + 30, 147, P.k); for (let y = 139; y < 147; y++) for (let x = cx - 29; x <= cx + 29; x++) { const fila = (y - 139) >> 1, j = (y - 139) % 2 === 1 || (x + (fila & 1) * 3) % 6 === 0; pset(x, y, j ? hex('#c8b8a8') : h(x >> 2, fila, 106) < 0.3 ? hex('#a84a3a') : hex('#c05a44')); }
    rect(cx - 30, 138, cx + 30, 138, hex('#d8c8b8')); rect(cx - 6, 141, cx + 6, 145, P.amS); rect(cx - 5, 142, cx + 5, 144, P.am); rect(cx - 3, 143, cx + 3, 143, P.amS);
    e_ovillo(R, cx, 114, 24); }
  // el cartel de la flecha en su poste
  { rect(156, 68, 158, 104, P.crD); rect(156, 68, 156, 104, P.cr); rect(136, 48, 178, 68, P.k); rect(137, 49, 177, 67, hex('#e84a3a')); rect(140, 52, 174, 64, hex('#f8e8c8'));
    R.poligono([[144, 58], [152, 52], [152, 55], [170, 55], [170, 61], [152, 61], [152, 64]], P.az); rect(153, 56, 169, 56, P.azL);
    e_num(R, '1', 164, 52, P.ro); }
  // la tienda de recuerdos: la caseta con su toldo a rayas, el expositor de postales y camisetas colgadas
  { const x0 = 140, x1 = 188; rect(x0, 104, x1, 146, P.k); for (let y = 105; y < 146; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, (y - 105) % 5 === 4 ? hex('#c8b890') : x === x0 + 1 ? hex('#fff4d8') : hex('#f0e0b8'));
    rect(x0 - 3, 104, x1 + 3, 108, P.k); for (let x = x0 - 2; x <= x1 + 2; x++) { const k = Math.floor((x - x0) / 5); for (let y = 105; y < 112 + ((x % 5) === 2 ? 1 : 0); y++) pset(x, y, (k & 1) ? P.bl : P.ve); }
    rect(x0 + 4, 115, x1 - 4, 132, P.k); rect(x0 + 5, 116, x1 - 5, 131, hex('#3a2a30')); rect(x0 + 2, 132, x1 - 2, 135, P.ma); rect(x0 + 2, 132, x1 - 2, 132, P.maL);
    for (let k = 0; k < 4; k++) { const x = x0 + 8 + k * 9; rect(x, 120, x + 5, 126, [P.az, P.ro, P.am, P.ve][k]); rect(x + 1, 120, x + 4, 121, [P.az, P.ro, P.am, P.ve][k]); rect(x - 1, 120, x - 1, 122, [P.az, P.ro, P.am, P.ve][k]); rect(x + 6, 120, x + 6, 122, [P.az, P.ro, P.am, P.ve][k]); pset(x + 2, 123, P.bl); }   // camisetas
    rect(x1 - 12, 136, x1 - 4, 146, P.crD); for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) rect(x1 - 11 + i * 4, 137 + j * 3, x1 - 9 + i * 4, 138 + j * 3, [hex('#7ac8e8'), hex('#f0a060'), hex('#a8d870')][(i + j) % 3]); }
  // el dinosaurio de fibra de vidrio
  e_dino(R, 240, 146);
  // los coches aparcados
  e_cocheAparcado(R, 30, 174, hex('#c8a040')); e_cocheAparcado(R, 296, 177, hex('#4a8ac8'));
}

// una mancha de aceite en el asfalto, con su brillo irisado
function e_manchaAceite(R, x, y, rx) { e_tinte(R, x, y, rx, Math.max(1, Math.round(rx / 4)), e_P.k, 0.25); R.pset(x - 2, y, hex('#8a7ac0')); R.pset(x + 1, y - 1, hex('#7ab0a0')); }

// el ovillo de cordel más grande del mundo: una esfera de vueltas de cordel en tres direcciones, con su luz y su sombra
function e_ovillo(R, cx, cy, r) {
  const P = e_P, L = [-0.5, -0.62, 0.6], ln = Math.hypot(...L), ejes = [[0.3, 0.9, 0.3], [0.9, -0.2, 0.4], [-0.4, 0.4, 0.82]].map((v) => { const n = Math.hypot(...v); return v.map((c) => c / n); });
  e_tinte(R, cx + 4, cy + r - 1, r + 4, 3, P.k, 0.35);
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const d2 = x * x + y * y; if (d2 > r * r) continue;
    const nx = x / r, ny = y / r, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)), luz = (nx * L[0] + ny * L[1] + nz * L[2]) / ln;
    const fx = Math.floor((nx + 1) * 2.3 + h(Math.floor((ny + 1) * 2.3), 5, 117) * 0.9), fy = Math.floor((ny + 1) * 2.3 + h(fx, 6, 117) * 0.9), e = ejes[Math.floor(h(fx + fy * 7, 1, 116) * 3)];
    const v = Math.asin(Math.max(-1, Math.min(1, nx * e[0] + ny * e[1] + nz * e[2]))) * r / 2.4, f = ((v % 1) + 1) % 1, ranura = f < 0.32, hebra = f > 0.55 && f < 0.78;
    let c = luz > 0.75 ? P.cordelL : luz > 0.35 ? P.cordel : luz > 0 ? P.cordelS : P.cordelD; if (ranura) c = c === P.cordelL ? P.cordel : c === P.cordel ? P.cordelS : P.cordelD; else if (hebra && luz > 0.15) c = c === P.cordelD ? P.cordelS : c === P.cordelS ? P.cordel : P.cordelL;
    if (d2 > (r - 1) * (r - 1)) c = P.k; R.pset(cx + x, cy + y, c); }
}

// un dinosaurio de cuello largo de fibra de vidrio (homenaje de carretera): el cuerpo con su luz y su panza en sombra,
// las patas como columnas, el cuello que sube con la cabeza sonriente, la cola larga y manchas pintadas; x: el centro
// del cuerpo, base: el suelo
function e_dino(R, x, base) {
  const { pset, disco, rect } = R, P = e_P, cy = base - 28;
  e_tinte(R, x + 6, base, 44, 3, P.k, 0.3);
  // la cola, del cuerpo hacia la derecha y abajo
  for (let i = 0; i < 48; i++) { const u = i / 48, tx = x + 26 + i, ty = cy + 4 + Math.round(u * u * 22), w = Math.round(8 * (1 - u) + 1); for (let j = -w; j <= w; j++) pset(tx, ty + j, Math.abs(j) === w ? P.dinoD : j < -w / 3 ? P.dinoL : j > w / 3 ? P.dinoS : P.dino); }
  // las patas de atrás (más oscuras)
  for (const lx of [x - 16, x + 14]) { rect(lx - 1, cy + 6, lx + 7, base, P.dinoD); rect(lx, cy + 6, lx + 6, base - 1, P.dinoS); rect(lx, base - 2, lx + 6, base - 1, P.dinoD); }
  // el cuerpo
  for (let y = -15; y <= 15; y++) for (let i = -32; i <= 32; i++) { const e = (i / 32) ** 2 + (y / 15) ** 2; if (e > 1) continue; pset(x + i, cy + y, e > 0.9 ? P.dinoD : y < -9 + Math.abs(i) * 0.08 ? P.dinoL : y > 7 ? P.dinoS : P.dino); }
  for (const [sx, sy, r] of [[-12, -6, 3], [2, -9, 2], [14, -4, 3], [-2, 2, 2], [22, -9, 2]]) { disco(x + sx, cy + sy, r, hex('#3a8a3a')); pset(x + sx - 1, cy + sy - 1, P.dinoL); }
  // las patas de delante
  for (const lx of [x - 24, x + 4]) { rect(lx - 1, cy + 8, lx + 8, base, P.dinoD); rect(lx, cy + 8, lx + 7, base - 1, P.dino); rect(lx, cy + 8, lx + 1, base - 1, P.dinoL); for (let k = 0; k < 3; k++) pset(lx + 1 + k * 3, base - 1, P.bl); }
  // el cuello que sube hacia la izquierda y la cabeza
  for (let i = 0; i <= 56; i++) { const u = i / 56, nx = Math.round(x - 26 - Math.sin(u * 1.4) * 20), ny = Math.round(cy - 4 - u * 58), w = Math.round(7 - u * 3); for (let j = -w; j <= w; j++) pset(nx + j, ny, Math.abs(j) === w ? P.dinoD : j < -w / 3 ? P.dinoL : j > w / 2 ? P.dinoS : P.dino); }
  { const hx = x - 46, hy = cy - 63; for (let y = -5; y <= 5; y++) for (let i = -12; i <= 6; i++) { const e = (i / (i < 0 ? 12 : 6)) ** 2 + (y / 5) ** 2; if (e > 1) continue; pset(hx + i, hy + y, e > 0.82 ? P.dinoD : y < -2 ? P.dinoL : P.dino); }
    disco(hx - 3, hy - 2, 2, P.bl); pset(hx - 4, hy - 2, P.k); pset(hx - 3, hy - 3, P.k); for (let i = -11; i <= -4; i++) pset(hx + i, hy + 2 + (i > -8 ? 0 : 1) - (i === -11 ? 1 : 0), P.dinoD); pset(hx - 11, hy - 1, P.dinoD); pset(hx - 10, hy - 1, P.dinoD); }
}

// un coche aparcado de lado (copiado de th-comun.js): carrocería con brillo, cristales con reflejo, tiradores y tapacubos
function e_cocheAparcado(R, x, suelo, c) {
  const { rect, disco, pset } = R, P = e_P, cS = e_mezcla(c, P.k, 0.3), cL = e_mezcla(c, P.bl, 0.4);
  e_tinte(R, x, suelo, 22, 2, P.k, 0.4);
  rect(x - 21, suelo - 10, x + 21, suelo - 2, P.k); rect(x - 20, suelo - 9, x + 20, suelo - 3, c); rect(x - 20, suelo - 5, x + 20, suelo - 3, cS); rect(x - 19, suelo - 9, x + 19, suelo - 9, cL);
  rect(x - 13, suelo - 17, x + 11, suelo - 9, P.k); rect(x - 12, suelo - 16, x + 10, suelo - 10, c); rect(x - 11, suelo - 15, x - 1, suelo - 10, P.vi); rect(x + 1, suelo - 15, x + 9, suelo - 10, P.vi);
  pset(x - 9, suelo - 14, P.viL); pset(x - 8, suelo - 13, P.viL); pset(x + 3, suelo - 14, P.viL);
  rect(x, suelo - 9, x, suelo - 3, cS); rect(x - 4, suelo - 7, x - 2, suelo - 7, P.k); rect(x + 4, suelo - 7, x + 6, suelo - 7, P.k);
  rect(x + 19, suelo - 9, x + 20, suelo - 7, P.amL); rect(x - 20, suelo - 9, x - 19, suelo - 7, P.ro); rect(x - 21, suelo - 3, x + 21, suelo - 3, P.crS);
  for (const dx of [-13, 13]) { disco(x + dx, suelo - 1, 4, P.k); disco(x + dx, suelo - 1, 2, P.cr); pset(x + dx - 1, suelo - 2, P.crL); }
}

function e_atraccionCerca(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P;
  e_cielo(R, t, { hor: 112, modo: 'dia', sol: null, estela: [30, 0.05], cumulos: 5 });
  e_pegar(R, e_capa(R, 'atr-cerca-fija', () => e_atrCercaFija(R)), 0, 0, 179);
  // los cabos sueltos que cuelgan del ovillo y se mecen
  for (const [ax, ay, L, f] of [[104, 120, 14, 0], [196, 112, 18, 1.3], [178, 146, 10, 2.2]]) { let x = ax, y = ay; for (let i = 0; i < L; i++) { const nx = ax + Math.round(Math.sin(t * 1.6 + f + i * 0.25) * (i / L) * 3) + (ax > 150 ? Math.round(i * 0.3) : -Math.round(i * 0.3)), ny = ay + i; linea(x, y, nx, ny, P.cordelD); pset(nx + 1, ny, P.cordelL); x = nx; y = ny; } }
  // los flashes de las fotos: el ovillo se ilumina un instante
  { const k = Math.floor(t / 2.3), u = (t % 2.3) / 2.3; if (u < 0.06) { const fx = h(k, 1, 111) < 0.5 ? 20 : 300; R.disco(fx, 128, 3, P.bl); for (let j = -50; j <= 50; j += 2) for (let i = -50; i <= 50; i += 2) { const xx = 150 + i + (j & 2 ? 1 : 0), yy = 96 + j; if (i * i + j * j < 2500) { const c = R.pget(xx, yy); R.pset(xx, yy, e_mezcla(c, P.bl, 0.35)); } } } }
  // los turistas de los lados, con cámara
  e_gente(R, 20, 140, t, 2, 1, { foto: true }); e_gente(R, 300, 140, t, 5, -1, { foto: true }); e_gente(R, 10, 142, t, 7, 1, { chico: true });
  // la abeja que ronda el cordel
  { const bx = Math.round(220 + Math.sin(t * 2.1) * 16), by = Math.round(70 + Math.sin(t * 3.7) * 8); pset(bx, by, P.am); pset(bx + 1, by, P.k); pset(bx, by - 1 - (Math.floor(t * 20) % 2), P.blS); }
  // el cordón de terciopelo entre postes de latón (va por detrás de los personajes)
  for (const [x0, x1] of [[40, 110], [110, 210], [210, 280]]) e_cable(R, x0, 156, x1, 156, 5, P.roS), e_cable(R, x0, 157, x1, 157, 5, P.ro);
  for (const x of [40, 110, 210, 280]) { rect(x - 1, 155, x + 1, 170, P.k); rect(x, 155, x, 170, P.am); disco(x, 154, 2, P.amS); pset(x - 1, 153, P.amL); rect(x - 4, 169, x + 4, 171, P.k); rect(x - 3, 169, x + 3, 170, P.amS); }
  return { suelo: 174, pies: [36, 286], horizonte: 112, ovillo: [150, 96, 58], placa: [138, 150, 162, 160], cordon: 156 };
}

// lo fijo del ovillo de cerca (capa): el alero de tejuelas, los dos postes del pabellón, la pradera con el granero lejano,
// la cola del dinosaurio que asoma, el ovillo enorme sobre su peana de ladrillo con la placa y el suelo de hormigón
function e_atrCercaFija(R) {
  const { rect, pset, disco, linea } = R, P = e_P;
  e_colinas(R, 104, 6, 116, hex('#8aaa7a'), hex('#b8d0c0'), 4.4, { arboles: hex('#5a7a5a'), n: 18 });
  for (let y = 112; y < 136; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 112); let c = y < 120 ? ((x + (y >> 1)) % 3 === 0 ? P.trigoS : P.trigo) : q < 0.3 ? P.pradoS : P.prado; if (q > 0.95) c = P.trigoL; pset(x, y, c); }
  { const x = 248; rect(x, 100, x + 16, 112, P.k); rect(x + 1, 101, x + 15, 112, P.granero); R.poligono([[x - 1, 101], [x + 8, 94], [x + 17, 101]], hex('#5a5a62')); rect(x + 5, 105, x + 11, 112, P.bl); }
  // el alero de tejuelas arriba y los postes
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) { const off = (y >> 2) & 1 ? 4 : 0; pset(x, y, y === 11 ? hex('#4a3020') : (y & 3) === 3 ? hex('#6a4a34') : (x + off) % 8 === 0 ? hex('#7a5a40') : hex('#9a7454')); }
  rect(0, 12, 319, 14, hex('#8a6448')); rect(0, 15, 319, 15, hex('#5a3a28'));
  for (const px of [22, 288]) { rect(px - 4, 15, px + 4, 162, P.k); rect(px - 3, 15, px + 3, 162, P.ma); rect(px - 3, 15, px - 2, 162, P.maL); rect(px + 2, 15, px + 3, 162, P.maS); for (let y = 30; y < 160; y += 17) pset(px, y, P.maD); }
  // la cola del dinosaurio que asoma por la derecha
  for (let i = 0; i < 26; i++) { const x = 319 - i, y = 120 + Math.round(i * 0.5), w = Math.round(2 + i * 0.25); for (let j = -w; j <= w; j++) if (x > 292) pset(x, y + j, Math.abs(j) === w ? P.dinoD : j < 0 ? P.dinoL : P.dino); }
  // el suelo de hormigón con juntas y grietas
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 113); let c = q < 0.1 ? hex('#a8a4a0') : q > 0.95 ? hex('#d8d4ce') : hex('#c4c0b8'); if (y === 136 || (y - 136) % 22 === 0 || x % 64 === 0) c = hex('#9a968e'); pset(x, y, c); }
  for (let k = 0; k < 4; k++) { let x = 30 + k * 80, y = 140 + k * 8; for (let i = 0; i < 22; i++) { pset(x, y, hex('#8a8680')); x += 1; y += h(k, i, 114) < 0.5 ? 1 : 0; } }
  // la peana y el ovillo
  { const cx = 150; rect(cx - 56, 146, cx + 56, 164, P.k); for (let y = 147; y < 164; y++) for (let x = cx - 55; x <= cx + 55; x++) { const fila = (y - 147) / 3 | 0, j = (y - 147) % 3 === 2 || (x + (fila & 1) * 4) % 8 === 0; pset(x, y, j ? hex('#c8b8a8') : h(x >> 3, fila, 115) < 0.3 ? hex('#a84a3a') : hex('#c05a44')); }
    rect(cx - 56, 146, cx + 56, 147, hex('#e0d0c0')); e_tinte(R, cx, 165, 58, 2, P.k, 0.3);
    e_ovillo(R, cx, 94, 56);
    rect(cx - 13, 150, cx + 13, 161, P.k); rect(cx - 12, 151, cx + 12, 160, P.am); rect(cx - 12, 151, cx + 12, 151, P.amL); rect(cx - 12, 160, cx + 12, 160, P.amS);
    e_picto(R, ['..#####..', '.#######.', '..#####..', '...###...', '....#....', '...###...'], cx - 10, 153, 1, P.amS); e_num(R, '1', cx + 4, 154, P.amS); for (const yy of [153, 156]) rect(cx + 8, yy, cx + 10, yy, P.amS); }
}

function e_moterosGeneral(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P, hor = 104;
  e_cielo(R, t, { hor, modo: 'noche', luna: [66, 32, 7], estela: [40, 0.02], cumulos: 4 });
  // las luces de los coches que cruzan la llanura, muy lejos
  for (let k = 0; k < 3; k++) { const u = ((t * 0.05 + k * 0.33) % 1), x = Math.round(k % 2 ? lerp(330, -10, u) : lerp(-10, 330, u)); pset(x, 101, k % 2 ? P.amL : P.ro); pset(x + 2, 101, k % 2 ? P.amL : P.ro); }
  e_pegar(R, e_capa(R, 'mot-gen-fija', () => e_moterosFijo(R, hor)), 0, 36, 179);
  // el humo de la chimenea, que sube y se va con el viento
  for (let k = 0; k < 7; k++) { const u = ((t * 0.22 + k / 7) % 1), x = Math.round(212 + u * 22 + Math.sin(t * 1.3 + k * 2) * 3 * u), y = Math.round(52 - u * 26), r = 1 + u * 4; if (x > 268 && y < 48) continue;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r || e_umbral(x + i, y + j) > 0.75 - u * 0.6) continue; const c = R.pget(x + i, y + j); R.pset(x + i, y + j, e_mezcla(c, hex('#8a86a0'), 0.35)); } }
  // los neones: la calavera con alas del tejado, la jarra, la rueda, la flecha de la puerta y el letrero del poste
  const zumba = (k) => !(h(Math.floor(t * 14), k, 120) < 0.06) && !(k === 2 && (t % 6.5) > 5.9 && Math.floor(t * 20) % 2);
  e_neonCalavera(R, 130, 52, 2, zumba(1), t);
  e_neon(R, e_JARRA, 84, 104, 1, P.neM, P.neML, zumba(2));
  e_neonRueda(R, 166, 110, 7, P.neA, P.neAL, zumba(3), t);
  e_neon(R, e_FLECHA_ABAJO, 126, 94, 1, P.neR, P.neRL, Math.floor(t * 2.5) % 2 === 0);
  e_neon(R, e_ESTRELLA, 251, 56, 2, P.neN, P.neML, zumba(4));
  for (let i = 0; i < 14; i++) { const on = (i + Math.floor(t * 7)) % 3 !== 0; pset(244 + i * 3, 54, on ? P.amL : P.amS); pset(244 + i * 3, 80, on ? P.amL : P.amS); }
  // las siluetas que se mueven tras las ventanas (el camarero que va y viene; uno que levanta la jarra)
  { R.recorte([191, 101, 219, 121]); const bx = Math.round(205 + Math.sin(t * 0.7) * 10); disco(bx, 108, 3, hex('#3a2418')); rect(bx - 4, 111, bx + 4, 121, hex('#3a2418')); R.recorte(null);
    R.recorte([41, 101, 69, 121]); const al = Math.sin(t * 1.3) > 0.5 ? 3 : 0; disco(52, 110, 3, hex('#3a2418')); rect(48, 113, 56, 121, hex('#3a2418')); rect(57, 112 - al, 59, 116 - al, hex('#3a2418')); disco(64, 111, 3, hex('#3a2418')); rect(60, 114, 68, 121, hex('#3a2418')); R.recorte(null); }
  // los charcos que reflejan los neones
  for (const [px, py, rx, c, on] of [[132, 150, 13, P.neR, zumba(1)], [182, 157, 9, P.neA, zumba(3)], [24, 156, 8, P.neM, zumba(2)]]) { for (let j = -3; j <= 3; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / 3.4) ** 2; if (e > 1) continue; R.pset(px + i, py + j, e > 0.75 ? P.gravaS : hex('#1a1828')); }
    if (on) for (let j = -1; j <= 1; j++) for (let i = -rx + 4; i <= rx - 4; i++) { const o2 = Math.round(Math.sin(t * 4 + j * 2 + i * 0.4)); if ((i + o2 + j) % 3 !== 0) R.pset(px + i + o2, py + j, j === 0 ? e_mezcla(c, P.bl, 0.3) : e_mezcla(c, P.nMS, 0.45)); } }
  // las motos aparcadas: sus cromados brillan con el neón
  for (const [mx, col, k] of [[34, P.ro, 0], [74, P.az, 1], [198, hex('#3a3a44'), 2], [236, P.am, 3]]) e_moto(R, mx, 152, 1, 1, col, t, k);
  // la farola con su luz de sodio y las polillas
  { e_glow(R, 300, 64, 18, hex('#ffb060'), 0.3); disco(300, 62, 2, P.amL); for (let k = 0; k < 4; k++) { const a = t * (4 + k) + k * 1.7; pset(Math.round(300 + Math.cos(a) * (5 + k * 2)), Math.round(64 + Math.sin(a * 1.3) * 4), P.bl); } }
  // el gato del porche que mueve la cola
  { const gx = 160, gy = 135; rect(gx, gy - 3, gx + 5, gy, hex('#1e1a24')); rect(gx + 4, gy - 5, gx + 6, gy - 3, hex('#1e1a24')); pset(gx + 4, gy - 6, hex('#1e1a24')); pset(gx + 6, gy - 6, hex('#1e1a24')); if ((t % 3.3) > 0.15) { pset(gx + 5, gy - 4, P.neV); }
    const c = Math.round(Math.sin(t * 2.5) * 2); pset(gx - 1, gy - 1, hex('#1e1a24')); pset(gx - 2, gy - 2 + c, hex('#1e1a24')); pset(gx - 3, gy - 3 + c, hex('#1e1a24')); }
  return { suelo: 158, pies: [100, 180], horizonte: hor, puerta: [116, 100, 144, 138], ventanas: [[40, 100, 70, 122], [190, 100, 220, 122]], motos: [34, 74, 198, 236], porche: 138, luna: [66, 32], letrero: [240, 50, 286, 84] };
}

// lo fijo del bar de noche (capa): las mesetas en silueta, el bar de tablas con tejado de chapa y porche, ventanas,
// puerta, el armazón del letrero del tejado, la chimenea, el poste del letrero, la farola, la grava y la carretera
function e_moterosFijo(R, hor) {
  const { rect, pset, disco, linea } = R, P = e_P;
  const MN = [hex('#2a2244'), hex('#1e1a36'), hex('#3a3058'), hex('#261e3e'), hex('#221c3a'), hex('#1a1630')];
  e_meseta(R, 240, 300, 74, hor, 14, 16, MN, 81, -1); e_meseta(R, -20, 20, 80, hor, 10, 12, MN, 82, -1);
  for (let y = hor; y < 140; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 121) < 0.08 ? P.nML : y < hor + 6 ? hex('#1a1830') : P.nMS);
  for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 1, 122) * 319), y = hor + 2 + Math.round(h(k, 2, 122) * 20); rect(x, y - 3, x, y, hex('#141228')); pset(x - 1, y - 2, hex('#141228')); pset(x + 1, y - 1, hex('#141228')); }   // cactus en silueta
  // el armazón del letrero del tejado
  for (const lx of [104, 156]) { rect(lx, 66, lx + 1, 80, hex('#3a3448')); for (let y = 68; y < 80; y += 4) linea(lx, y, lx + 1, y + 3, hex('#4a4458')); }
  rect(98, 64, 162, 65, hex('#3a3448'));
  // el tejado de chapa ondulada y la chimenea
  rect(18, 72, 242, 82, P.k); for (let y = 73; y < 82; y++) for (let x = 19; x <= 241; x++) pset(x, y, (x % 4 === 0) ? hex('#2e2a3a') : (x % 4 === 1) ? hex('#5a5468') : hex('#46405a'));
  for (let k = 0; k < 9; k++) { const x = 30 + k * 24 + Math.round(h(k, 1, 123) * 10); rect(x, 74 + (k % 3), x + 3, 76 + (k % 3), hex('#6a4a3a')); }   // manchas de óxido
  rect(208, 54, 216, 72, P.k); rect(209, 55, 215, 72, hex('#4a3a3a')); rect(209, 55, 210, 72, hex('#6a5050')); rect(207, 53, 217, 55, P.k);
  // la pared de tablas, de noche
  for (let y = 83; y < 139; y++) for (let x = 20; x <= 240; x++) { const tabla = (y - 83) % 6 === 5, q = h(x >> 1, (y - 83) / 6 | 0, 124); let c = tabla ? hex('#1e1620') : q < 0.2 ? hex('#3a2a28') : q > 0.85 ? hex('#5a4234') : hex('#4a3630'); if (h(x, y, 125) < 0.03) c = hex('#2a1e1e'); if ((x + ((y - 83) / 6 | 0) * 37) % 53 === 0) c = hex('#1e1620'); pset(x, y, c); }
  // el porche: el tejadillo, los postes y el suelo de tablas
  rect(16, 92, 244, 97, P.k); rect(17, 93, 243, 95, hex('#5a4434')); rect(17, 93, 243, 93, hex('#7a5a44'));
  for (const px of [24, 80, 178, 234]) { rect(px - 2, 97, px + 2, 138, P.k); rect(px - 1, 97, px + 1, 138, hex('#5a4434')); rect(px - 1, 97, px - 1, 138, hex('#7a5a44')); }
  rect(16, 136, 244, 141, P.k); for (let x = 17; x <= 243; x++) for (let y = 137; y <= 140; y++) pset(x, y, x % 12 === 0 ? hex('#2a1e1a') : y === 137 ? hex('#6a5040') : hex('#4a3a2e'));
  // las ventanas: la luz cálida, las persianas y el marco
  for (const [x0, x1] of [[40, 70], [190, 220]]) { rect(x0 - 2, 98, x1 + 2, 124, P.k); rect(x0 - 1, 99, x1 + 1, 123, hex('#6a5040')); rect(x0, 100, x1, 122, P.vent); for (let y = 101; y < 112; y += 2) rect(x0, y, x1, y, P.ventS); rect(x0, 112, x1, 122, P.ventL); rect(Math.round((x0 + x1) / 2), 100, Math.round((x0 + x1) / 2), 122, hex('#6a5040')); rect(x0, 111, x1, 111, hex('#6a5040'));
    for (let i = x0 - 4; i <= x1 + 4; i++) for (let j = 125; j < 137; j++) if (((i + j) & 1) === 0 && h(i, j, 126) < 0.6 - (j - 125) * 0.05) pset(i, j, hex('#7a5a40')); }   // la luz que cae al porche
  // la puerta con su ojo de buey
  rect(116, 100, 144, 138, P.k); rect(117, 101, 143, 138, hex('#5a3424')); for (let x = 120; x < 143; x += 5) rect(x, 101, x, 138, hex('#3e2418')); rect(117, 101, 118, 138, hex('#7a4a34'));
  disco(130, 112, 5, P.k); disco(130, 112, 4, hex('#c8a04a')); disco(130, 112, 3, P.vent); pset(128, 110, P.ventL); rect(138, 119, 140, 121, P.am);
  // el poste del letrero y la farola
  rect(267, 80, 269, 152, P.k); rect(268, 80, 268, 152, hex('#5a5468')); rect(240, 50, 286, 84, P.k); rect(241, 51, 285, 83, hex('#2a2238')); rect(241, 51, 285, 52, hex('#3e3450'));
  rect(299, 64, 301, 156, P.k); rect(300, 64, 300, 156, hex('#5a5468')); rect(294, 60, 306, 62, P.k); rect(295, 60, 305, 61, hex('#4a4458')); rect(297, 154, 303, 156, P.k);
  // la grava del aparcamiento con rodadas y piedras
  for (let y = 141; y < 162; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 127); let c = q < 0.2 ? P.gravaS : q > 0.88 ? P.gravaL : P.grava; if (Math.abs(((x * 0.3 + y * 1.1) % 22) - 11) < 0.6) c = P.gravaS; pset(x, y, c); }
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 128) * 319), y = 142 + Math.round(h(k, 2, 128) * 18); pset(x, y, hex('#7a7488')); pset(x + 1, y + 1, P.gravaS); }
  { for (let i = -22; i <= 22; i++) for (let j = 0; j < 22; j++) { const xx = 300 + i, yy = 140 + j; if (Math.abs(i) < j * 1.1 + 4 && ((xx + yy) & 1) === 0) { const c = R.pget(xx, yy); if (c !== e_VACIO) pset(xx, yy, e_mezcla(c, hex('#ffb060'), 0.18)); } } }   // la luz de la farola en el suelo
  // la carretera de delante
  for (let y = 162; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 129); pset(x, y, y === 162 ? hex('#1a1824') : y === 164 ? hex('#8a8698') : q < 0.15 ? hex('#22202c') : q > 0.93 ? hex('#4a4658') : hex('#2e2c3a')); }
  for (let x = 4; x < 320; x += 22) rect(x, 172, x + 11, 173, hex('#b89a40'));
}

// un pictograma de neón: el resplandor tramado alrededor del tubo, el tubo y su alma blanca; apagado, el cristal oscuro
function e_neon(R, filas, x, y, s, c, cL, on) {
  const { pset } = R;
  if (on) filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let b = -2; b <= 2 + s; b++) for (let a = -2; a <= 2 + s; a++) { const xx = x + i * s + a, yy = y + j * s + b; if (((xx + yy) & 1) === 0 && (a < 0 || a >= s || b < 0 || b >= s)) { const cc = R.pget(xx, yy); if (cc) pset(xx, yy, e_mezcla(cc, c, 0.14)); } } });
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) pset(x + i * s + a, y + j * s + b, on ? ((a + b + i + j) % 3 === 0 ? cL : c) : hex('#4a4058')); });
}

// un resplandor redondo tramado (mezcla hacia col)
function e_glow(R, cx, cy, r, col, a) {
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy); if (d > r) continue; const g = 1 - d / r; if (e_umbral(x, y) < g) { const c = R.pget(x, y); if (c) R.pset(x, y, e_mezcla(c, col, a * (0.5 + g * 0.5))); } }
}

// los pictogramas de neón
const e_JARRA = ['.#######..', '#.......#.', '#.#.#.#.###', '#.#.#.#.#.#', '#.#.#.#.#.#', '#.#.#.#.###', '#.......#..', '.#######...'];

const e_FLECHA_ABAJO = ['..###..', '..#.#..', '..#.#..', '###.###', '.#...#.', '..#.#..', '...#...'];

const e_ESTRELLA = ['......#......', '.....#.#.....', '#####...#####', '.#.........#.', '..#.......#..', '...#.....#...', '..#...#...#..', '.#..#...#..#.', '.###.....###.'];

const e_CRANEO = ['...#####...', '..#.....#..', '.#.......#.', '.#.##.##.#.', '.#.##.##.#.', '.#...#...#.', '..#.....#..', '...#.#.#...', '...#####...'];

const e_ALA = ['#########.#', '..........#', '########.#.', '...........', '######.#...', '...........', '####.......'];

// la calavera con alas de neón (homenaje propio): el cráneo rojo y las alas azules que baten un poco (cx: el centro)
function e_neonCalavera(R, cx, y, s, on, t) {
  const P = e_P, w = e_CRANEO[0].length * s, bat = on ? Math.round(Math.sin(t * 3) * 1) : 0;
  const alaI = e_ALA, alaD = alaI.map((f) => f.split('').reverse().join(''));
  e_neon(R, alaD, cx - Math.round(w / 2) - 11 * s - 2, y + s + bat, s, P.neA, P.neAL, on);
  e_neon(R, alaI, cx + Math.round(w / 2) + 2, y + s + bat, s, P.neA, P.neAL, on);
  e_neon(R, e_CRANEO, cx - Math.round(w / 2), y, s, P.neR, P.neRL, on);
}

// una rueda de neón con sus radios que giran
function e_neonRueda(R, cx, cy, r, c, cL, on, t) {
  const pts = []; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; pts.push([Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r)]); }
  for (let k = 0; k < 4; k++) { const a = t * 1.5 + k * Math.PI / 4; for (let d = -r + 2; d <= r - 2; d++) pts.push([Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d)]); }
  if (on) for (const [x, y] of pts) for (const [a, b] of [[-2, 0], [2, 0], [0, -2], [0, 2], [-1, -1], [1, 1]]) { const cc = R.pget(x + a, y + b); if (cc) R.pset(x + a, y + b, e_mezcla(cc, c, 0.12)); }
  pts.forEach(([x, y], k) => R.pset(x, y, on ? (k % 3 === 0 ? cL : c) : hex('#4a4058')));
}

// una moto de las de horquilla larga (homenaje propio), de lado: ruedas de radios, el motor en V cromado con aletas, los
// escapes, el depósito en gota con su llama pintada, el sillín, el respaldo alto, el manillar alto y el faro; los
// cromados destellan (con t y k). (x, base): el centro y el suelo; dir; s: escala; col: el color del depósito
function e_moto(R, x, base, dir, s, col, t, k = 0) {
  const { poligono, disco, linea, pset } = R, P = e_P, X = (u) => Math.round(x + dir * u * s), Y = (v) => Math.round(base + v * s), lin = (a, b, c, d, cc) => linea(X(a), Y(b), X(c), Y(d), cc);
  const cL = e_mezcla(col, P.bl, 0.45), cS = e_mezcla(col, P.k, 0.35);
  for (let i = Math.round(-24 * s); i <= Math.round(26 * s); i++) { const c = R.pget(x + i, base); if (c) pset(x + i, base, e_mezcla(c, P.k, 0.45)); }
  const rueda = (u) => { const cx = X(u), cy = Y(-7), r = Math.round(7 * s); disco(cx, cy, r, P.k); disco(cx, cy, r - 1, P.ru); disco(cx, cy, r - 2, P.k);
    for (let a = 0; a < 8; a++) { const an = a * Math.PI / 8; linea(Math.round(cx - Math.cos(an) * (r - 2)), Math.round(cy - Math.sin(an) * (r - 2)), Math.round(cx + Math.cos(an) * (r - 2)), Math.round(cy + Math.sin(an) * (r - 2)), P.crD); }
    disco(cx, cy, Math.max(1, Math.round(1.5 * s)), P.cr); pset(cx, cy - r + 1, P.ruL); };
  rueda(-15); rueda(20);
  for (let a = 200; a <= 340; a += 4) { const an = a * Math.PI / 180; pset(X(-15 + Math.cos(an) * 8.5 * dir), Y(-7 + Math.sin(an) * 8.5), col); pset(X(-15 + Math.cos(an) * 9.3 * dir), Y(-7 + Math.sin(an) * 9.3), cS); }
  lin(-15, -7, -6, -16, P.crD); lin(-6, -16, 9, -19, P.ne); lin(9, -19, 3, -6, P.ne); lin(3, -6, -15, -7, P.ne);
  poligono([[X(-3), Y(-14)], [X(6), Y(-14)], [X(5), Y(-6)], [X(-2), Y(-6)]], P.crS); for (let v = -13; v <= -7; v += 2) lin(-3, v, 5, v, P.cr); lin(0, -14, -2, -18, P.crS); lin(3, -14, 5, -18, P.crS);
  lin(-1, -8, -21, -9, P.cr); lin(-1, -10, -21, -11, P.crS); lin(-21, -9, -21, -11, P.crL);
  for (let j = -3; j <= 3; j++) for (let i = -7; i <= 7; i++) { const e = (i / 7) ** 2 + (j / 3.2) ** 2; if (e > 1) continue; pset(X(4 + i), Y(-19 + j), e > 0.8 ? P.k : j < -1 ? cL : j > 1 ? cS : (i > -3 && i < 4 && j === 0) ? P.na : col); }
  poligono([[X(-10), Y(-19)], [X(-2), Y(-19)], [X(-2), Y(-17)], [X(-10), Y(-17)]], hex('#3a2418')); lin(-10, -19, -3, -19, hex('#6a4a30'));
  lin(-12, -18, -14, -28, P.cr); lin(-14, -28, -12, -28, P.cr);
  lin(12, -21, 20, -7, P.cr); lin(13, -21, 21, -7, P.crS);
  lin(12, -21, 10, -31, P.cr); lin(10, -31, 7, -31, P.cr); pset(X(7), Y(-31), P.k);
  disco(X(15), Y(-20), Math.max(1, Math.round(2 * s)), P.cr); pset(X(15) + dir, Y(-20), P.amL); pset(X(-21), Y(-13), P.ro);
  if (Math.sin(t * 2.3 + k * 1.9) > 0.85) { const gx = X(1), gy = Y(-12); pset(gx, gy - 1, P.bl); pset(gx - 1, gy, P.bl); pset(gx + 1, gy, P.bl); pset(gx, gy + 1, P.bl); pset(gx, gy, P.crL); }
}

function e_moterosCerca(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P;
  e_pegar(R, e_capa(R, 'mot-cerca-fija', () => e_moterosCercaFija(R)));
  const zumba = (k) => !(h(Math.floor(t * 14), k, 130) < 0.06) && !(k === 1 && (t % 5.5) > 4.9 && Math.floor(t * 20) % 2);
  e_neonCalavera(R, 160, 22, 3, zumba(1), t);
  e_neon(R, e_JARRA, 222, 72, 2, P.neM, P.neML, zumba(2));
  // la gramola de la ventana: los tubos de colores que cambian y las burbujas
  { R.recorte([25, 65, 103, 115]); const gx = 52; for (let j = 0; j < 30; j++) for (let i = -12; i <= 12; i++) { const e = (i / 12) ** 2 + ((j - 6) / 14) ** 2; if (j < 6 && e > 1) continue; const anillo = Math.abs(i) > 9 || (j < 8 && e > 0.6); const c = anillo ? [P.neR, P.neM, P.neA, P.neV][(Math.floor(t * 3) + (j >> 3) + (i < 0 ? 0 : 2)) % 4] : j > 20 ? hex('#6a3a2a') : hex('#c89a4a'); pset(gx + i, 78 + j, c); }
    for (let k = 0; k < 5; k++) pset(gx + (k % 2 ? 10 : -10), 108 - Math.round(((t * 12 + k * 5) % 26)), P.bl);
    for (let i = -6; i <= 6; i += 3) rect(gx + i, 94, gx + i + 1, 98, P.k);
    const bx = 84, by = 98 - (Math.floor(t * 2.2) % 2); disco(bx, by, 4, hex('#2a1810')); rect(bx - 5, by + 4, bx + 5, 115, hex('#2a1810'));   // el parroquiano que cabecea al ritmo
    R.recorte(null); }
  // la luz por la rendija de la puerta y las polillas del farol
  e_glow(R, 112, 74, 14, hex('#ffd890'), 0.35); disco(112, 74, 2, P.amL); for (let k = 0; k < 5; k++) { const a = t * (5 + k) + k * 2; pset(Math.round(112 + Math.cos(a) * (4 + k * 2)), Math.round(74 + Math.sin(a * 1.4) * 5), P.bl); }
  // las dos motos en primer término
  e_moto(R, 46, 176, 1, 1.5, P.ro, t, 0); e_moto(R, 280, 176, -1, 1.5, hex('#3a5ac8'), t, 1);
  // el reflejo del neón en los cromados y en el porche
  { const on = zumba(1); if (on) for (let i = 120; i < 200; i += 2) pset(i + ((Math.floor(t * 4)) % 2), 142, e_mezcla(R.pget(i, 142), P.neR, 0.4)); }
  return { suelo: 168, pies: [92, 228], puerta: [136, 66, 184, 140], ventana: [24, 64, 104, 116], porche: 142, neon: [124, 22, 196, 52] };
}

// lo fijo de la puerta del bar (capa): el alero de chapa, la pared de tablas de noche, la ventana con su marco, la puerta
// con el ojo de buey y la rendija de luz, el farol de pared, matrículas clavadas, el porche, la grava
function e_moterosCercaFija(R) {
  const { rect, pset, disco } = R, P = e_P;
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 11 ? P.k : (x % 5 === 0) ? hex('#221e2c') : (x % 5 === 1) ? hex('#3a3646') : hex('#2e2a3a'));
  for (let y = 12; y < 142; y++) for (let x = 0; x < 320; x++) { const fila = (y - 12) / 9 | 0, tabla = (y - 12) % 9 === 8, q = h(x >> 1, fila, 131); let c = tabla ? hex('#1a1218') : q < 0.2 ? hex('#33241f') : q > 0.85 ? hex('#4e3a2e') : hex('#3e2e26');
      if ((x + fila * 41) % 67 === 0) c = hex('#1a1218'); if (h(x, y, 132) < 0.02) c = hex('#22181a'); if ((x + fila * 41) % 67 === 3 && (y - 12) % 9 === 4) c = hex('#8a8a96'); pset(x, y, c); }
  // la ventana
  rect(22, 62, 106, 118, P.k); rect(24, 64, 104, 116, hex('#6a5040')); rect(25, 65, 103, 115, hex('#3a2418')); for (let x = 25; x <= 103; x++) for (let y = 65; y <= 115; y++) if (((x + y) & 3) === 0) pset(x, y, hex('#4a2e1e'));
  rect(64, 65, 65, 115, hex('#6a5040')); rect(25, 89, 103, 90, hex('#6a5040')); rect(20, 117, 108, 120, P.k); rect(21, 117, 107, 119, hex('#7a5a44'));
  for (let i = 0; i < 12; i++) { pset(28 + i * 2, 68 + i, hex('#8aa0c0')); pset(70 + i * 2, 68 + i, hex('#8aa0c0')); }   // el reflejo del cristal
  // la puerta con el ojo de buey, la rendija de luz y el tirador
  rect(132, 62, 188, 142, P.k); rect(134, 64, 186, 142, hex('#5a3a28')); rect(136, 66, 184, 142, hex('#4a2c1e'));
  for (let x = 140; x < 184; x += 8) rect(x, 66, x, 142, hex('#341e14')); rect(136, 66, 138, 142, hex('#6a4030'));
  for (const yy of [76, 128]) { rect(136, yy, 184, yy + 2, hex('#341e14')); rect(136, yy, 184, yy, hex('#6a4030')); }
  disco(160, 92, 9, P.k); disco(160, 92, 8, hex('#c8a04a')); disco(160, 92, 6, P.vent); disco(158, 90, 3, P.ventL); pset(156, 88, P.bl);
  rect(184, 66, 186, 142, P.ventL); rect(178, 108, 182, 112, P.k); rect(179, 109, 181, 111, P.am);
  for (let j = 0; j < 30; j++) for (let i = 0; i < 4 + j; i++) { const xx = 186 + i, yy = 142 + Math.round(j * 0.3); if (((xx + yy) & 1) === 0) pset(xx, yy, hex('#8a6a3a')); }
  // el farol de pared
  rect(110, 68, 114, 70, P.k); rect(108, 70, 116, 80, P.k); rect(109, 71, 115, 79, hex('#c8a04a'));
  // las matrículas clavadas en la pared (sin letras: números y franjas)
  for (let k = 0; k < 6; k++) { const x = 206 + (k % 3) * 34, y = 100 + Math.floor(k / 3) * 20, c = [hex('#e8e0c8'), hex('#f0c040'), hex('#c8d8f0'), hex('#f0f0f0'), hex('#e8c8a0'), hex('#d0e8d0')][k]; rect(x, y, x + 26, y + 13, P.k); rect(x + 1, y + 1, x + 25, y + 12, c); rect(x + 1, y + 1, x + 25, y + 2, [P.ro, P.az, P.ve][k % 3]); e_num(R, String(10 + k * 17), x + 6, y + 5, P.k); pset(x + 2, y + 6, P.crD); pset(x + 24, y + 6, P.crD); }
  // el porche y la grava
  rect(0, 142, 319, 152, P.k); for (let y = 143; y < 152; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 16 === 0 ? hex('#22181a') : y === 143 ? hex('#7a5a44') : y > 149 ? hex('#3a2a24') : hex('#5a4434'));
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 133); pset(x, y, q < 0.2 ? P.gravaS : q > 0.88 ? P.gravaL : P.grava); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 134) * 319), y = 153 + Math.round(h(k, 2, 134) * 26); pset(x, y, hex('#7a7488')); pset(x + 1, y + 1, P.gravaS); }
}

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1: transiciones tramadas limpias, sin ruido
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_umbral = (x, y) => e_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (los de hex(): 0xAABBGGRR) en la proporción a (0–1)
function e_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// cifras diminutas de 3 × 5 (los números de las casas): solo dígitos
const e_DIGITOS = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function e_cifras(R, txt, x, y, c) { for (const ch of txt) { const g = e_DIGITOS[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// los cielos ricos, de arriba abajo: [fracción de la altura hasta el horizonte, color]; y los tres tonos de sus nubes
const e_CIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']],
  tarde: [[0, '#24225a'], [0.14, '#3a3a7a'], [0.3, '#5e3e82'], [0.45, '#a0507a'], [0.58, '#cc626a'], [0.7, '#e88a5a'], [0.83, '#f8c070'], [0.94, '#fde4a4']],
  noche: [[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [0.95, '#3a4274']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const e_NUBES = Object.fromEntries(Object.entries({ dia: ['#a8d6f2', '#d2ecfc', '#ffffff'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], noche: ['#1a2048', '#262e58', '#343e6c'] }).map(([k, v]) => [k, v.map(hex)]));

const e_col = pal({
  estrella: '#8a94c0', estela: '#f4f8fc', estelaS: '#cfe4f4', estelaT: '#ffd8b4', estelaTS: '#f0a888', ave: '#2a2436', luna: '#f4ecd0', lunaS: '#c8c0a8',
  halo: '#fff8dc', haloT: '#ffe6a0', luz: '#ffe8a0', luzL: '#fff6d0', vidrioN: '#16182c', calido: '#ff9a5a',
  tronco: '#b0a08c', falda: '#9a7a44', faldaS: '#7a5a30', cogollo: '#6a5a3a', palma: '#2e6a2a', palmaS: '#245a24',
});

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function e_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// cielo rico (cielo() es compartido y no se toca): bandas con transición tramada; el sol con su halo tramado (grande y
// bajo al atardecer); la estela de un avión que se deshace detrás de él; cirros lejanos casi quietos y cúmulos medianos y
// cercanos a distinta velocidad; de noche, estrellas que titilan, la luna en cuarto creciente, una fugaz de vez en
// cuando y las luces de un avión. o.hor; o.modo: 'dia' | 'tarde' | 'noche'; o.sol [x, y, r] (null: sin sol); o.luna
// [x, y, r]; o.estela [y en x = 0, pendiente] (null: sin avión); o.nubes (false: sin nubes); o.cumulos (5)
function e_cielo(R, t, o = {}) {
  const { pset, disco } = R, hor = o.hor ?? 96, modo = o.modo ?? 'dia', B = R.buf, P = e_CIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = e_umbral(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48;   // la esquina de Atom queda tranquila
  if (modo === 'noche') {
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 301) * 319), y = Math.round(h(k, 2, 301) ** 1.25 * (hor - 6)); if (atom(x, y)) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 301) * 2.2) + k * 1.7);
      if (tw > -0.5) B[y * 320 + x] = tw > 0.45 ? C.blanco : e_col.estrella; if (k % 11 === 0 && tw > 0.75) { pset(x - 1, y, e_col.estrella); pset(x + 1, y, e_col.estrella); pset(x, y - 1, e_col.estrella); pset(x, y + 1, e_col.estrella); } }
    const [lx, ly, lr] = o.luna ?? [212, 26, 6];   // la luna en cuarto creciente, con su halo
    for (let y = ly - lr - 4; y <= ly + lr + 4; y++) for (let x = lx - lr - 4; x <= lx + lr + 4; x++) { if (y < 0 || y >= hor || x < 0 || x > 319) continue; const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
      if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? e_col.lunaS : e_col.luna; else if (d > lr && d < lr + 4 && e_umbral(x, y) < (lr + 4 - d) / 8) B[y * 320 + x] = e_mezcla(B[y * 320 + x], e_col.luna, 0.25); }
    { const k = Math.floor(t / 7), u = (t % 7) / 0.7; if (u < 1) { const x0 = 30 + h(k, 1, 305) * 190, y0 = 8 + h(k, 2, 305) * hor * 0.3; for (let i = 0; i < 9; i++) { const x = Math.round(x0 + u * 60 - i * 1.7), y = Math.round(y0 + u * 22 - i * 0.6); if (y >= 0 && y < hor && !atom(x, y)) pset(x, y, i < 2 ? C.blanco : e_col.estrella); } } }
  } else {
    const sol = o.sol === undefined ? (modo === 'tarde' ? [214, hor - 14, 12] : [226, 22, 8]) : o.sol;
    if (sol) {
      const [sx, sy, sr] = sol, gl = modo === 'tarde' ? e_col.haloT : e_col.halo, R2 = sr + (modo === 'tarde' ? 18 : 10);
      for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
        const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (e_umbral(x, y) < q * q) B[y * 320 + x] = e_mezcla(B[y * 320 + x], gl, 0.42); }
      if (modo === 'tarde') e_discoSol(R, sol, 'tarde');
    }
  }
  // la estela del avión: recta y densa junto a él, luego más ancha, ondulada y rala hasta deshacerse
  if (o.estela !== null) {
    const [e0, pe] = o.estela ?? [hor * 0.45, 0.04], u = ((t + (o.fase ?? 3)) % 44) * 10 - 40, ax = Math.round(u), ay = Math.round(e0 + u * pe);
    if (modo !== 'noche') { const ce = modo === 'tarde' ? e_col.estelaT : e_col.estela, ce2 = modo === 'tarde' ? e_col.estelaTS : e_col.estelaS;
      for (let i = 3; i < 190; i++) { const x = ax - i, y = Math.round(ay - i * pe + (i > 60 ? Math.sin(i * 0.15 + t * 0.2) * 0.8 : 0)); if (x < 0 || x > 319 || y < 1 || y >= hor - 1 || atom(x, y)) continue; const d = i < 40 ? 1 : i < 120 ? 0.95 - (i - 40) / 130 : 0.33 - (i - 120) / 240;
        if (e_umbral(x, y) < d) B[y * 320 + x] = ce; if (i > 18 && e_umbral(x, y + 1) < d * 0.75) B[(y + 1) * 320 + x] = ce2; if (i > 70 && e_umbral(x, y - 1) < d * 0.5) B[(y - 1) * 320 + x] = ce2; } }
    if (ax >= 0 && ax < 320 && !atom(ax, ay)) { if (modo !== 'noche') { R.rect(ax - 2, ay, ax + 1, ay, C.blanco); pset(ax - 1, ay - 1, C.grisL); } if (Math.floor(t * 2.5) % 2) pset(ax + 1, ay, C.rojo); else if (modo === 'noche') pset(ax, ay, C.blanco); }
  }
  if (o.nubes === false) { if (modo === 'dia' && o.sol !== null) e_discoSol(R, o.sol ?? [226, 22, 8], 'dia'); return; }
  const cn = e_NUBES[modo];
  // cirros: velos finos y lejanos que apenas se mueven
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(18, Math.round(hor * (0.16 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  // cúmulos: los lejanos, pequeños y lentos; los cercanos, grandes y más rápidos
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(32, hor * 0.3) + k * hor * 0.14 : Math.max(28, hor * (0.45 + (k - 2) * 0.1))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    e_nube(R, Math.round(x), y, w, k, cn); }
  if (modo === 'dia' && o.sol !== null) e_discoSol(R, o.sol ?? [226, 22, 8], 'dia');   // de día, el disco del sol queda delante de las nubes
}

// el disco del sol, con su borde y su brillo
function e_discoSol(R, [sx, sy, sr], modo) { R.disco(sx, sy, sr + 1, modo === 'tarde' ? hex('#ffd890') : C.solL); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }

// una cordillera lejana: la cresta (suma de senos con la semilla sem) entre y0 − amp e y0, rellena hasta yb con c; abajo
// se funde tramada con la bruma; o.filo: color del borde de la cresta; o.arboles: color de los árboles sueltos (robles,
// pinos) sobre la ladera. Devuelve la cresta (y de cada columna)
function e_colinas(R, y0, amp, yb, c, bruma, sem, o = {}) {
  const B = R.buf, cresta = new Int16Array(320);
  for (let x = 0; x < 320; x++) {
    const yc = Math.round(y0 - amp * (0.55 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.06 * Math.sin(x * 0.13 + sem * 4.1))); cresta[x] = yc;
    for (let y = Math.max(0, yc); y <= yb; y++) { const p = (y - yb + 7) / 8; B[y * 320 + x] = p > 0 && e_umbral(x, y) < p ? bruma : c; }
    if (o.filo != null && yc >= 0 && (x * 7 + sem * 3) % 5) B[yc * 320 + x] = o.filo;
  }
  if (o.arboles != null) for (let k = 0; k < (o.n ?? 30); k++) { const x = Math.round(h(k, sem, 304) * 319), y = cresta[x] + 1 + Math.round(h(k, sem, 305) ** 1.6 * Math.max(1, yb - cresta[x] - 6)); if (y > yb - 2) continue;
    if (o.pinos) { R.rect(x, y - 3, x, y, o.arboles); R.rect(x - 1, y - 1, x + 1, y, o.arboles); } else { R.rect(x - 1, y - 1, x + 1, y, o.arboles); R.pset(x, y - 2, o.arboles); } }
  return cresta;
}

// los dibujos (mirando a la derecha) y sus colores
const e_PERRO = (() => {
  const P = (f) => f.padEnd(18, '.');
  return {
    ancho: 18, ojos: [7], parpado: 'f', sombreroY: 6, hombro: 14, sorpresa: [[8, 6, 'e'], [11, 6, 'e'], [9, 6, 'o'], [12, 6, 'o'], [8, 5, 'k'], [9, 5, 'k'], [11, 5, 'k'], [12, 5, 'k']],
    sombrero: ['.....kkkkkkk......', '....kHHhhHHHk.....', '....kHhHHHHHk.....', '....kbbbbbbbk.....', '..kkHHHHHHHHHkk...', '..kkkkkkkkkkkkk...'].map(P),
    filas: [
      '', '', '', '', '', '',
      '.kEEkFFFFFFFFFFk', '.kEEFFFFeoFeoFFk', 'kEEEFFFFFFFFFLLLkk', 'kEEEFFFFFFFFLLLLNk', 'kEEfFFFFFFFLLLLLNk', '.kEffFFFFFfmmmmmk', '.kEkfffFFFfttmkk',
      '..k.kkWWTWkkkk', '...kSSSWTTWSSk', '..kSSSSWTTWSSSk', '..kSsSSSTTSSSsk', '..kSsSSSSSSSSsk', '..kFkSSSSSSSSkFk', '...k.kSSSSSSk.k', '.....kSSSkSSk', '.....kSSk.kSSk', '....kZZZk.kZZZk', '....kkkkk.kkkkk',
    ].map(P),
    piernas: [['.....kSSk.kSSk', '....kZZZk..kSSk', '....kkkkk.kZZZk'].map(P), ['.....kSSk.kSSk', '.....kSSk.kZZZk', '....kZZZk.kkkkk'].map(P)],
    boca: { 11: P('.kEffFFFFFfmmmmmk'), 12: P('.kEkfffFFFmtttmk') },
    sinBrazos: { 18: P('...kkSSSSSSSSk'), 19: P('....kkSSSSSSk') },
    pal: pal({ k: '#1a1420', H: '#4a4a62', h: '#6e6e8a', b: '#22222e', E: '#6a4428', F: '#b8865a', f: '#8e6440', L: '#e0b890', N: '#1a1420', e: '#ffffff', o: '#1a1420', m: '#5a1a1a', t: '#e86a7a', W: '#f2f0ea', T: '#c83a3a', S: '#7486a6', s: '#566684', Z: '#2a2228', manga: '#7486a6', mano: '#b8865a' }),
  };
})();

const e_CONEJO = (() => {
  const P = (f) => f.padEnd(16, '.');
  return {
    ancho: 16, ojos: [10, 11], parpado: 'W', orejaY: 8, hombro: 17, sorpresa: [[6, 10, 'o'], [7, 10, 'o'], [6, 11, 'o'], [7, 11, 'o'], [9, 10, 'o'], [10, 10, 'o'], [9, 11, 'o'], [10, 11, 'o'], [6, 10, 'e'], [9, 10, 'e'], [6, 9, 'k'], [7, 8, 'k'], [9, 8, 'k'], [10, 9, 'k']],
    filas: [
      '', '', '', '', '', '', '',
      '...kkkkkkkkk', '..kWWWWWWWWWk', '.kWWWWWWWWWWWk', '.kWWWWWoWWoWWk', '.kwWWWWoWWoWWWk', '.kwWWWWWWWWWWnk', '.kwWWkmmmmmmmmk', '..kwWkmddddddk', '..kwWWkmtttmk', '...kkWWkkkkk',
      '...kWWWWWWWk', '..kWkWWWWWkWk', '..kk.kWWWk.kk', '....kWWkWWk', '....kWWkWWk', '...kWWWkWWWk', '...kkkkkkkkk',
    ].map(P),
    piernas: [['....kWWkWWk', '...kWWWk.kWWk', '...kkkkk.kWWWk'].map(P), ['....kWWkWWk', '....kWWk.kWWWk', '...kWWWk.kkkkk'].map(P)],
    boca: { 14: P('..kwWkmtttttk'), 15: P('..kwWWkmmmmk') },
    sinBrazos: { 18: P('...kkWWWWWkk'), 19: P('....kWWWk') },
    pal: pal({ k: '#1a1420', W: '#f4f2f8', w: '#c4c2d8', p: '#f0a0b8', e: '#ffffff', o: '#1a1420', m: '#6a1a2a', d: '#ffffff', t: '#e86a7a', n: '#f07a9a', manga: '#f4f2f8', mano: '#f4f2f8' }),
  };
})();

// lo que va por delante de los personajes en cada encuadre de muertos() (mismas opciones): el mostrador de la agencia,
// el cristal de la ventanilla con su reflejo, la aleta y la rejilla del coche en el capó, el filo del altar de cerca
export function muertosDelante(R, t, o = {}) {
  const P = o.luz === 'dia' ? f_DIA : f_NOCHE, enc = o.encuadre ?? 'ciudad', cam = o.camara ?? 'general';
  if (enc === 'agencia') f_agenciaDelante(R, t, o, P, cam);
  if (enc === 'taller') f_tallerDelante(R, t, o, P, cam);
}

// la trama ordenada de 4 × 4 (para degradados, halos y luces tramadas)
const f_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const f_b4 = (x, y) => (f_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const f_mez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo; curva > 1 alarga los de arriba
function f_deg(R, x0, y0, x1, y1, cols, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = ((y - y0) / alto) ** curva * n;
    for (let x = x0; x <= x1; x++) { let l = Math.floor(base); if (base - l > f_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}

// las capas fijas: se pintan una vez en un búfer de R.nuevo() y se copian en cada fotograma (por R y por clave)
const f_capas = new WeakMap();

const f_VACIO = 0x01020304;

function f_capa(R, clave, dibuja, transparente = false) {
  let m = f_capas.get(R); if (!m) { m = new Map(); f_capas.set(R, m); }
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); if (transparente) b.fill(f_VACIO); const prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega una capa con huecos (los píxeles VACIO dejan ver lo de debajo) entre las filas y0 e y1: un recorrido
function f_pegar(R, b, y0 = 0, y1 = 179) { const d = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== f_VACIO) d[i] = c; } }

// nube alargada de tres tonos (c = [arriba, cuerpo, luz de abajo, filo]); (cx, cy) el centro de su base, w el ancho
function f_nube(R, cx, cy, w, k, c) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.62);
  for (let y = Math.floor(cy - 13); y <= cy + 1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 1) ? c[0] : c[1]);
}

// una voluta de humo o vapor que sube y se deshace (x, y su origen; k desfasa)
function f_humo(R, x, y, t, k = 0, col = hex('#c8c0d8'), alto = 18) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = 1.2 + u * 3, cx = x + u * alto * 0.35 + Math.sin(u * 6 + k + t * 0.7) * 1.4, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (f_b4(xx, yy) < (1 - u) * (1.2 - d) * 0.8) R.pset(xx, yy, col); } }
}

// una flor de cempasúchil (r 1–4): pétalos naranjas en anillos, el corazón más oscuro y un toque de luz arriba
function f_flor(R, x, y, r = 2, k = 0) {
  const c = [hex('#9a4a10'), hex('#d8740e'), hex('#f0a020'), hex('#ffcc48')];
  if (r <= 1) { R.pset(x, y, c[2]); R.pset(x + 1, y, c[1]); R.pset(x, y - 1, c[3]); R.pset(x + 1, y + 1, c[0]); return; }
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.3) continue;
    const anillo = (Math.round(d * 1.6 + Math.atan2(j, i) * 1.3 + k) & 1), v = d > r - 0.6 ? 0 : d < 0.8 ? 1 : j < 0 && i < 0 ? 3 : 2 - anillo * 0.6;
    R.pset(x + i, y + j, c[Math.max(0, Math.min(3, Math.round(v)))]); }
}

// una vela encendida: el cuerpo de cera con su sombra y una gota, la llama que tiembla y su halo tramado
function f_vela(R, x, y, alto, t, k = 0, halo = true, cera = hex('#f2e6c8')) {
  const fl = Math.sin(t * 9 + k * 3.1) + Math.sin(t * 13.7 + k), cs = f_mez(cera, hex('#7a5a3a'), 0.35);
  if (halo) R.halo(x, y - alto - 2, 7 + fl * 0.6, [hex('#5a2a1a'), hex('#9a4a1a'), hex('#d8822a')], 0.9);
  R.rect(x - 1, y - alto, x + 1, y, cera); R.rect(x + 1, y - alto + 1, x + 1, y, cs); R.pset(x - 1, y - alto + 1 + (k % 3), hex('#fff8e8'));
  R.pset(x, y - alto - 1, hex('#3a2a1a'));
  const fx = x + (fl > 1.2 ? 1 : fl < -1.2 ? -1 : 0);
  R.pset(fx, y - alto - 2, hex('#ffd860')); R.pset(fx, y - alto - 3, hex('#fff4c0')); if (fl > -0.5) R.pset(fx, y - alto - 4, hex('#ffb040'));
}

// una calavera de azúcar de 7 × 6: blanca, con los ojos de glaseado de color, la flor en la frente y los dientes
function f_calaverita(R, x, y, k = 0) {
  const gl = [hex('#e8488a'), hex('#3a9ae8'), hex('#3ab86a'), hex('#f0a020'), hex('#8a4ac8')], a = gl[k % 5], b = gl[(k + 2) % 5], W = hex('#f6f0e2'), S = hex('#c8bca8');
  R.rect(x - 3, y - 5, x + 3, y - 2, W); R.rect(x - 2, y - 6, x + 2, y - 6, W); R.rect(x - 2, y - 1, x + 2, y, W); R.rect(x + 3, y - 4, x + 3, y - 2, S); R.pset(x + 2, y, S);
  R.pset(x - 2, y - 3, a); R.pset(x - 1, y - 3, a); R.pset(x + 1, y - 3, a); R.pset(x + 2, y - 3, a); R.pset(x - 2, y - 4, b); R.pset(x + 2, y - 4, b);
  R.pset(x, y - 2, hex('#3a2a3a')); R.pset(x, y - 5, b); R.pset(x - 1, y - 1, hex('#8a7a8a')); R.pset(x + 1, y - 1, hex('#8a7a8a')); R.pset(x, y - 1, a);
}

// una tira de papel picado de (x0, y0) a (x1, y1), con su comba: banderitas de colores recortadas (por los huecos se ve
// lo de detrás), el borde de abajo en ondas, la luz en el canto y el viento que las mece una a una
function f_picado(R, x0, y0, x1, y1, t, k = 0, paso = 11, comba = 8, viento = 1) {
  const COL = [['#e8488a', '#b8286a', '#ff8ab8'], ['#f08a2a', '#c05a10', '#ffbe6a'], ['#f0d040', '#b89a20', '#fff08a'], ['#3ab86a', '#1e8848', '#8ae8a8'], ['#8a4ac8', '#5e2a98', '#c08af0'], ['#3a8ae8', '#2058b0', '#8ac0ff'], ['#e83a3a', '#a81e2a', '#ff8a7a']];
  const L = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.floor(L / paso));
  const Y = (u) => y0 + (y1 - y0) * u + comba * 4 * u * (1 - u);
  for (let s = 0; s <= L; s++) { const u = s / L; R.pset(Math.round(x0 + (x1 - x0) * u), Math.round(Y(u)), hex('#2a1e2a')); }
  const MOT = [['........', '..#..#..', '.#.##.#.', '..#..#..', '........', '.#.#.#..', '..#.#.#.', '........'], ['........', '...##...', '..#..#..', '.#.##.#.', '..#..#..', '...##...', '.#....#.', '........'], ['........', '.#.##.#.', '........', '..####..', '..#..#..', '..####..', '........', '.#.#.#..']];
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, bx = Math.round(x0 + (x1 - x0) * u) - 4, by = Math.round(Y(u)) + 1, c = COL[(i + k) % COL.length].map(hex), mot = MOT[(i + k) % 3];
    const sw = Math.sin(t * 2.3 * viento + i * 1.7 + k) * 1.6 * viento, vuelta = Math.sin(t * 1.1 + i * 2.9 + k) > 0.93;
    for (let j = 0; j < 10; j++) { const dx = Math.round(sw * j / 9);
      for (let q = 0; q < 8; q++) {
        if (j === 9 && (q & 1)) continue;
        if (j < 8 && mot[j][q] === '#') continue;
        const col = vuelta ? c[1] : q === 0 || j === 0 ? c[2] : q === 7 ? c[1] : c[0];
        R.pset(bx + q + dx, by + j, col);
      } }
  }
}

// un esqueleto pequeño de fondo (≈ 11 px), que pasea: cráneo, ropa de colores, piernas que alternan; o.ramo lleva flores
function f_paseante(R, x, suelo, t, k = 0, dir = 1, anda = true) {
  const ropa = [hex('#7a2a4a'), hex('#2a4a7a'), hex('#4a6a3a'), hex('#8a5a2a'), hex('#5a3a7a'), hex('#2a2a3a')][k % 6], W = hex('#ece4d2'), K = hex('#1c1222');
  const p = anda ? Math.floor(t * 6 + k) % 2 : 0, b = anda && p ? 1 : 0, x0 = Math.round(x), y = suelo - b;
  R.pset(x0 - 1, suelo, K); R.pset(x0 + 1, suelo, K);
  R.rect(x0 - 1, y - 3, x0 - 1, y - 1 + (p ? -1 : 0), W); R.rect(x0 + 1, y - 3, x0 + 1, y - 1 + (p ? 0 : -1), W);
  if (k % 3 === 1) { R.rect(x0 - 2, y - 7, x0 + 2, y - 3, ropa); R.rect(x0 - 3, y - 4, x0 + 3, y - 3, ropa); }   // vestido
  else { R.rect(x0 - 2, y - 7, x0 + 2, y - 3, ropa); R.pset(x0, y - 6, W); }
  R.rect(x0 + dir * 2, y - 6, x0 + dir * 2, y - 4, f_mez(ropa, K, 0.3));
  R.rect(x0 - 2, y - 11, x0 + 2, y - 8, W); R.pset(x0 - 1 + (dir > 0 ? 1 : 0), y - 10, K); R.pset(x0 + 1 + (dir > 0 ? 1 : 0), y - 10, K); R.pset(x0 + dir, y - 8, hex('#a89a8a'));
  if (k % 3 === 0) { R.rect(x0 - 3, y - 12, x0 + 3, y - 12, K); R.rect(x0 - 2, y - 14, x0 + 2, y - 13, K); }   // sombrero
  if (k % 4 === 2) { f_flor(R, x0 + dir * 4, y - 7, 1); f_flor(R, x0 + dir * 3, y - 9, 1); }
}

// los colores de la ciudad de los muertos: de noche (por omisión) y de día
const f_NOCHE = {
  cielo: ['#0c0e2c', '#12163a', '#1a1c48', '#262456', '#362c62', '#4a326a', '#66386e', '#8a426e', '#b0546a'].map(hex),
  nube: ['#3a3462', '#2a2850', '#5a3c6a', '#8a5070'].map(hex), lejos: hex('#2c2448'), lejosL: hex('#3c3060'), lejosV: hex('#c89a70'),
  deco: hex('#34344e'), decoL: hex('#4a4a68'), decoS: hex('#24243a'), vent: hex('#f0c870'), ventA: hex('#4a4064'), oro: hex('#c8a84a'), oroL: hex('#f0d888'), oroS: hex('#7a6428'),
  rosa: hex('#6a2a4a'), rosaL: hex('#8a3a5a'), rosaS: hex('#4a1a34'), ocre: hex('#7a5a3a'), ocreL: hex('#9a7448'), ocreS: hex('#5a3e28'),
  azul: hex('#24405a'), azulL: hex('#34587a'), azulS: hex('#182c40'), acera: hex('#4a4258'), aceraL: hex('#5e546c'), aceraS: hex('#363044'),
  calle: hex('#2a2636'), calleL: hex('#3a3448'), calleS: hex('#1e1a28'), luzSuelo: hex('#7a5a4a'), noche: true,
};

const f_DIA = {
  cielo: ['#3a64b0', '#466fbc', '#527cc6', '#628ace', '#7a9cd4', '#94afd8', '#b2c0d8', '#d4c8c0', '#ecc8a0'].map(hex),
  nube: ['#c8d0e8', '#f2f0f4', '#a8b0d0', '#8a90b8'].map(hex), lejos: hex('#8a96c0'), lejosL: hex('#a2aed0'), lejosV: hex('#6a78a8'),
  deco: hex('#b4a48a'), decoL: hex('#d2c4a6'), decoS: hex('#8a7a64'), vent: hex('#5a6e98'), ventA: hex('#3e4a6e'), oro: hex('#c89a3a'), oroL: hex('#f0d070'), oroS: hex('#8a6420'),
  rosa: hex('#d86a8a'), rosaL: hex('#f08aa8'), rosaS: hex('#a84a6a'), ocre: hex('#d8a060'), ocreL: hex('#f0c080'), ocreS: hex('#a87440'),
  azul: hex('#3a8aa8'), azulL: hex('#5aaac8'), azulS: hex('#2a6a88'), acera: hex('#a89aa0'), aceraL: hex('#c4b8b8'), aceraS: hex('#867880'),
  calle: hex('#6a6070'), calleL: hex('#7e7484'), calleS: hex('#544a5a'), luzSuelo: hex('#b8a090'), noche: false,
};

const f_K = hex('#1c1222');

function f_ciudadFondo(R, P) {
  const { rect, pset, disco } = R;
  f_deg(R, 0, 0, 319, 112, P.cielo, 1.15);
  if (P.noche) {
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 160) * 319), y = Math.round(2 + h(k, 2, 160) * 50); if ((x > 18 && x < 172 && y < 16) || (x > 274 && y < 48)) continue; pset(x, y, h(k, 3, 160) < 0.3 ? hex('#c8c0e8') : hex('#5a5a8a')); }
    R.halo(232, 26, 16, [hex('#1e1e4a'), hex('#282854'), hex('#34345e')], 1.1);
    disco(232, 26, 7, hex('#f4ecd0')); disco(234, 25, 6, hex('#fff8e0')); for (const [i, j] of [[-3, 1], [-1, 3], [1, -2], [-4, -2]]) pset(232 + i, 26 + j, hex('#d8ccb0')); disco(229, 28, 1, hex('#e0d4b8'));
  } else {
    R.halo(236, 30, 20, [hex('#b8c4dc'), hex('#d8dce4'), hex('#f2ecd8')], 1.3); disco(236, 30, 8, hex('#fff6d0')); disco(236, 30, 6, hex('#fffbe8'));
  }
  // la ciudad lejana: dos capas de torres con sus remates (pirámides, agujas, depósitos de agua) y ventanas sueltas
  for (let capa = 0; capa < 2; capa++) {
    const c = capa ? P.lejos : f_mez(P.lejos, P.cielo[6], 0.45), cl = capa ? P.lejosL : f_mez(P.lejosL, P.cielo[6], 0.45);
    for (let x = -4, k = 0; x < 320; k++) { const w = 10 + Math.floor(h(k, 1, 161 + capa) * 16); let top = (capa ? 64 : 54) + Math.floor(h(k, 2, 161 + capa) * 22); if (x + w > 274) top = Math.max(top, 50);
      rect(x, top, x + w - 1, 112, c); rect(x, top, x, 112, cl);
      const rem = Math.floor(h(k, 3, 161 + capa) * 4);
      if (rem === 0 && top > 54) for (let j = 1; j <= 6; j++) rect(x + Math.round(w / 2) - Math.round((6 - j) / 2), top - j, x + Math.round(w / 2) + Math.round((6 - j) / 2), top - j, c);
      if (rem === 1 && top > 58) { rect(x + Math.round(w / 2), top - 9, x + Math.round(w / 2), top - 1, c); if (P.noche) pset(x + Math.round(w / 2), top - 10, hex('#e84a4a')); }
      if (rem === 2) { rect(x + 2, top - 5, x + 6, top - 2, c); rect(x + 3, top - 6, x + 5, top - 6, c); rect(x + 2, top - 1, x + 2, top - 1, c); rect(x + 6, top - 1, x + 6, top - 1, c); }
      for (let wy = top + 3; wy < 108; wy += 4) for (let wx = x + 2; wx < x + w - 1; wx += 3) if (h(wx, wy, 163 + capa) < (P.noche ? 0.2 : 0.35)) pset(wx, wy, capa ? P.lejosV : f_mez(P.lejosV, c, 0.5));
      x += w; }
  }
  // el viaducto del tren: el tablero con su barandilla y los arcos de piedra
  rect(0, 98, 319, 101, P.decoS); rect(0, 97, 319, 97, P.oroS); for (let x = 0; x < 320; x += 3) pset(x, 96, P.oroS);
  for (let x = 4; x < 320; x += 24) { rect(x, 102, x + 4, 116, P.decoS); for (let i = 0; i < 20; i++) { const a = Math.sqrt(Math.max(0, 1 - ((i - 9.5) / 10) ** 2)); rect(x + 5 + i, 102, x + 5 + i, 102 + Math.round(3 - a * 3) + 1, P.decoS); } }
}

// la cantina, el hotel con su letrero, las aceras, la calle empedrada con los raíles, el altar de la esquina y el puesto de flores
function f_ciudadMedio(R, P) {
  const { rect, pset, disco, linea, poligono } = R;
  // la casa de la izquierda: estuco rosa con balcones de hierro y la panadería abajo con su toldo y el pan de muerto
  rect(0, 38, 52, 131, P.rosa); for (let y = 40; y < 131; y++) for (let x = 0; x <= 52; x++) { const v = h(x >> 1, y >> 1, 170); if (v < 0.12) pset(x, y, P.rosaS); else if (v > 0.93) pset(x, y, P.rosaL); }
  rect(0, 36, 54, 39, P.rosaL); rect(0, 40, 54, 40, f_K); for (let x = 2; x < 54; x += 4) rect(x, 41, x + 1, 42, P.rosaS);
  for (const [wx, wy] of [[6, 48], [30, 48], [6, 76], [30, 76]]) {
    rect(wx - 1, wy - 2, wx + 14, wy + 18, P.rosaL); rect(wx, wy, wx + 13, wy + 17, f_K);
    for (let j = 0; j < 17; j++) for (let i = 0; i < 13; i++) { const arco = j < 4 && Math.hypot(i - 6, j - 4) > 6.6; if (!arco) pset(wx + i, wy + j + 1, P.noche ? (j < 9 ? hex('#f0b860') : hex('#d88a40')) : hex('#3a4a6a')); }
    rect(wx + 6, wy + 1, wx + 7, wy + 17, f_K); rect(wx + 1, wy + 9, wx + 12, wy + 9, f_K);
    if (P.noche) { rect(wx + 1, wy + 3, wx + 3, wy + 16, hex('#c84a5a')); rect(wx + 10, wy + 3, wx + 12, wy + 16, hex('#c84a5a')); }
    rect(wx - 3, wy + 18, wx + 16, wy + 19, hex('#2a1e2a')); for (let i = -2; i <= 15; i += 2) { pset(wx + i, wy + 15, hex('#2a1e2a')); rect(wx + i, wy + 16, wx + i, wy + 17, hex('#2a1e2a')); } rect(wx - 3, wy + 14, wx + 16, wy + 14, hex('#2a1e2a'));
    f_flor(R, wx + 1, wy + 12, 1); f_flor(R, wx + 4, wy + 13, 1); f_flor(R, wx + 12, wy + 12, 1);
  }
  for (let x = 0; x <= 52; x++) { const c = ((x >> 2) & 1) ? hex('#f0e0c0') : hex('#3a8a5a'); rect(x, 102, x, 108, c); if ((x & 3) === 1) pset(x, 109, c); } rect(0, 101, 52, 101, f_K);
  rect(2, 110, 50, 131, f_K); rect(3, 111, 49, 128, P.noche ? hex('#f0c27a') : hex('#c8a87a')); rect(3, 111, 49, 112, P.noche ? hex('#f8dca0') : hex('#d8c098'));
  rect(4, 121, 48, 124, hex('#6a3a2a')); rect(4, 121, 48, 121, hex('#a8583a'));
  for (let k = 0; k < 6; k++) { const bx = 7 + k * 7; disco(bx, 119, 3, hex('#c88a3a')); disco(bx - 1, 118, 2, hex('#e0a850')); pset(bx - 1, 117, hex('#f8d090')); linea(bx - 2, 117, bx + 2, 117, hex('#a8682a')); pset(bx, 116, hex('#a8682a')); }
  for (let k = 0; k < 4; k++) f_calaverita(R, 10 + k * 10, 128, k);
  linea(4, 111, 14, 128, P.noche ? hex('#fff0d0') : hex('#e8e0d0'));
  // el rascacielos art déco: tres retranqueos, pilastras verticales con remate de oro, ventanas, el abanico de la corona
  const body = (x0, x1, y0, y1) => { rect(x0, y0, x1, y1, P.deco); rect(x1 - 3, y0, x1, y1, P.decoS); rect(x0, y0, x0 + 1, y1, P.decoL);
    for (let x = x0 + 4; x < x1 - 4; x += 6) { rect(x, y0 + 2, x + 1, y1, P.decoL); rect(x + 2, y0 + 2, x + 2, y1, P.decoS); }
    for (let x = x0 + 2; x <= x1 - 2; x += 6) for (let y = y0 + 4; y < y1 - 2; y += 5) { const on = h(x, y, 171) < 0.5; rect(x + 1, y, x + 1, y + 2, on ? P.vent : P.ventA); if (on && P.noche) pset(x + 1, y, hex('#fff0c0')); }
    rect(x0 - 1, y0, x1 + 1, y0 + 1, P.oro); rect(x0 - 1, y0, x1 + 1, y0, P.oroL); for (let x = x0; x <= x1; x += 3) pset(x, y0 + 2, P.oroS); };
  body(84, 162, 64, 131); body(96, 150, 42, 64); body(106, 140, 28, 42);
  // la corona: el abanico de rayos de oro y la aguja (que no llega a la barra del año)
  for (let j = 0; j <= 9; j++) { const w = Math.round(Math.sqrt(Math.max(0, 81 - (9 - j) ** 2)) * 1.4); rect(123 - w, 18 + j, 123 + w, 18 + j, P.deco); }
  for (let k = 0; k < 9; k++) { const a = Math.PI + (k + 0.5) * Math.PI / 9; linea(123, 27, 123 + Math.round(Math.cos(a) * 12), 27 + Math.round(Math.sin(a) * 8), k & 1 ? P.oro : P.oroL); }
  rect(122, 16, 124, 18, P.oro); rect(123, 15, 123, 16, P.oroL);
  // las águilas (gárgolas) de los retranqueos y el friso de zigzag
  for (const [gx, gy, d] of [[96, 64, -1], [150, 64, 1], [106, 42, -1], [140, 42, 1]]) { rect(gx + (d > 0 ? 0 : -4), gy - 3, gx + (d > 0 ? 4 : 0), gy - 1, P.oroS); pset(gx + d * 5, gy - 3, P.oro); pset(gx + d * 4, gy - 4, P.oro); }
  for (let x = 86; x < 160; x += 4) { pset(x, 70, P.oro); pset(x + 1, 69, P.oroL); pset(x + 2, 70, P.oro); pset(x + 3, 71, P.oroS); }
  // la entrada: el gran arco escalonado de oro, la puerta giratoria con su luz y la marquesina
  rect(108, 98, 138, 131, f_K); for (let s = 0; s < 4; s++) rect(109 + s * 2, 100 + s * 2, 137 - s * 2, 131, s & 1 ? P.oroS : P.oro);
  rect(116, 108, 130, 131, P.noche ? hex('#f8d890') : hex('#a8b8c8')); rect(116, 108, 130, 110, P.noche ? hex('#fff0c0') : hex('#c8d8e8'));
  rect(122, 108, 123, 131, f_K); rect(116, 120, 130, 120, P.oroS); linea(117, 110, 121, 126, P.noche ? hex('#fff8e0') : hex('#e8f0f8'));
  for (let k = 0; k < 5; k++) { const a = Math.PI + (k + 0.5) * Math.PI / 5; linea(123, 106, 123 + Math.round(Math.cos(a) * 6), 106 + Math.round(Math.sin(a) * 5), P.oroL); }
  rect(102, 96, 144, 97, P.oroS); rect(102, 95, 144, 95, P.oroL);
  // la cantina: adobe ocre, la puerta en arco con sus batientes, la guitarra de neón (pictograma) y la tira de bombillas
  rect(168, 104, 228, 131, P.ocre); for (let y = 105; y < 131; y++) for (let x = 168; x <= 228; x++) { const v = h(x >> 1, y, 172); if (v < 0.1) pset(x, y, P.ocreS); else if (v > 0.92) pset(x, y, P.ocreL); }
  rect(166, 102, 230, 104, P.ocreS); for (let x = 170; x < 228; x += 6) { rect(x, 100, x + 2, 101, P.ocreS); }
  for (let j = 0; j < 22; j++) for (let i = 0; i < 16; i++) { const arco = j < 6 && Math.hypot(i - 7.5, j - 6) > 7.6; if (!arco) pset(190 + i, 110 + j, P.noche ? (j < 12 ? hex('#e8a050') : hex('#b86a30')) : hex('#3a2a2a')); }
  rect(191, 118, 197, 126, hex('#7a4a2a')); rect(199, 118, 205, 126, hex('#7a4a2a')); for (let y = 119; y < 126; y += 2) { rect(192, y, 196, y, hex('#9a6a3a')); rect(200, y, 204, y, hex('#9a6a3a')); }
  for (const wx of [172, 212]) { rect(wx, 112, wx + 11, 122, f_K); rect(wx + 1, 113, wx + 10, 121, P.noche ? hex('#d88a40') : hex('#4a5a7a')); rect(wx + 5, 113, wx + 6, 121, f_K); rect(wx - 1, 123, wx + 12, 124, P.ocreL); f_flor(R, wx + 2, 122, 1); f_flor(R, wx + 9, 122, 1); }
  // el hotel de la derecha: ladrillo azul, ventanas con persiana, el letrero vertical (sus luces van en la capa viva)
  rect(232, 52, 319, 131, P.azul); for (let y = 54; y < 131; y += 3) for (let x = 232 + ((y / 3) & 1) * 3; x < 320; x += 6) pset(x, y, P.azulS);
  rect(230, 50, 319, 53, P.oro); rect(230, 50, 319, 50, P.oroL); for (let x = 234; x < 320; x += 5) pset(x, 54, P.oroS);
  for (const wy of [60, 78, 96]) for (const wx of [252, 270, 288, 306]) { rect(wx, wy, wx + 9, wy + 11, f_K); const on = h(wx, wy, 173) < 0.6;
    rect(wx + 1, wy + 1, wx + 8, wy + 10, on ? (P.noche ? hex('#f0c070') : hex('#6a80a8')) : P.ventA);
    const pers = 2 + Math.floor(h(wx, wy, 174) * 7); for (let j = 1; j <= pers; j++) rect(wx + 1, wy + j, wx + 8, wy + j, j & 1 ? hex('#d8c8a0') : hex('#b8a880'));
    rect(wx - 1, wy + 12, wx + 10, wy + 12, P.azulL); }
  rect(236, 56, 246, 128, f_K); rect(237, 57, 245, 127, hex('#3a1a2a'));
  rect(232, 112, 319, 113, P.oroS); for (let x = 248; x < 320; x++) { const c = ((x >> 2) & 1) ? hex('#f0e8d8') : hex('#c83a4a'); rect(x, 114, x, 118, c); if ((x & 3) === 2) pset(x, 119, c); }
  rect(262, 120, 280, 131, f_K); rect(263, 121, 279, 131, P.noche ? hex('#f0c880') : hex('#7a6a5a')); rect(271, 121, 271, 131, P.oroS);
  // la acera de enfrente con sus losas y el bordillo
  rect(0, 131, 319, 136, P.acera); for (let x = 0; x < 320; x += 12) rect(x, 131, x, 136, P.aceraS); rect(0, 131, 319, 131, P.aceraL); rect(0, 137, 319, 137, P.aceraL); rect(0, 138, 319, 138, f_K);
  // la calle: adoquines con sus juntas, dos raíles brillantes y pétalos sueltos
  rect(0, 139, 319, 150, P.calle);
  for (let y = 139; y <= 150; y += 3) for (let x = ((y / 3) & 1) * 3; x < 320; x += 6) { pset(x, y, P.calleS); pset(x + 1, y + 1, P.calleL); }
  for (const ry of [142, 147]) { rect(0, ry, 319, ry, P.calleL); for (let x = 0; x < 320; x += 5) pset(x, ry, P.noche ? hex('#8a7a8a') : hex('#c8c0c8')); }
  for (let k = 0; k < 40; k++) pset(Math.round(h(k, 1, 175) * 319), 139 + Math.round(h(k, 2, 175) * 11), k & 1 ? hex('#f0a020') : hex('#d8740e'));
  // la acera de este lado: losas grandes con vetas, el bordillo de piedra y los pétalos pisados
  rect(0, 151, 319, 153, P.aceraL); rect(0, 154, 319, 179, P.acera);
  for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 176); if (v < 0.1) pset(x, y, P.aceraS); else if (v > 0.95) pset(x, y, P.aceraL); }
  for (let x = 0; x < 320; x += 26) linea(x, 154, x - 8, 179, P.aceraS); rect(0, 166, 319, 166, P.aceraS);
  // el altar de la esquina (izquierda): tres gradas con mantel de colores, el arco de cempasúchil, las calaveritas
  rect(6, 140, 58, 160, f_K); rect(7, 141, 57, 159, hex('#6a2a3a')); for (let x = 7; x < 58; x += 4) rect(x, 141, x + 1, 159, hex('#7a3248'));
  rect(10, 128, 54, 141, f_K); rect(11, 129, 53, 140, hex('#e8e0c8')); rect(14, 118, 50, 129, f_K); rect(15, 119, 49, 128, hex('#f0e8d4'));
  for (let x = 11; x <= 53; x++) { pset(x, 140, ((x >> 1) & 1) ? hex('#e8488a') : hex('#f0a020')); pset(x, 139, hex('#c8c0a8')); }
  for (let x = 15; x <= 49; x++) { pset(x, 128, ((x >> 1) & 1) ? hex('#3a9ae8') : hex('#3ab86a')); pset(x, 127, hex('#c8c0a8')); }
  for (let a = 0; a <= 40; a++) { const u = a / 40, ax = Math.round(12 + u * 40), ay = Math.round(118 - Math.sin(u * Math.PI) * 18); f_flor(R, ax, ay, a % 3 ? 1 : 2, a); }
  rect(27, 106, 37, 116, f_K); rect(28, 107, 36, 115, hex('#c8a84a')); rect(29, 108, 35, 114, hex('#4a3a5a')); disco(32, 110, 2, hex('#e8c8a0')); rect(30, 112, 34, 114, hex('#2a2a4a'));
  for (const [x, k] of [[18, 0], [24, 1], [40, 2], [46, 3]]) f_calaverita(R, x, 126, k);
  for (const [x, k] of [[14, 4], [22, 0], [44, 1], [50, 2]]) f_calaverita(R, x, 138, k);
  rect(30, 134, 38, 138, hex('#c88a3a')); rect(31, 133, 37, 133, hex('#e0a850'));
  for (let k = 0; k < 8; k++) f_flor(R, 9 + k * 7, 158, 2, k);
  // el puesto de flores (derecha): el carro de madera con sus ruedas, los cubos de cempasúchil y el toldo
  rect(266, 138, 316, 154, f_K); rect(267, 139, 315, 153, hex('#7a4a2a')); for (let x = 268; x < 315; x += 5) rect(x, 139, x, 153, hex('#5a3418')); rect(267, 139, 315, 140, hex('#9a6a3a'));
  for (const wx of [274, 308]) { disco(wx, 157, 5, f_K); disco(wx, 157, 4, hex('#8a5a2a')); disco(wx, 157, 1, hex('#c89a5a')); for (let k = 0; k < 6; k++) pset(wx + Math.round(Math.cos(k) * 3), 157 + Math.round(Math.sin(k) * 3), hex('#5a3418')); }
  for (let k = 0; k < 4; k++) { const cx = 273 + k * 12; rect(cx - 4, 130, cx + 4, 138, hex('#5a6a7a')); rect(cx - 4, 130, cx + 4, 130, hex('#8a9aaa'));
    for (let j = 0; j < 9; j++) f_flor(R, cx - 3 + Math.round(h(k, j, 177) * 6), 125 + Math.round(h(k, j, 178) * 5), j % 3 ? 1 : 2, j + k); }
  rect(268, 104, 270, 138, hex('#5a3418')); rect(312, 104, 314, 138, hex('#5a3418'));
  for (let x = 262; x <= 319; x++) { const c = ((x >> 2) & 1) ? hex('#f0e8d8') : hex('#e8488a'); rect(x, 102, x, 109, c); if ((x & 3) === 1) pset(x, 110, c); } rect(262, 101, 319, 101, f_K);
  // las macetas de cempasúchil del bordillo
  for (const x of [78, 104, 150, 176, 222, 248]) { rect(x - 4, 156, x + 4, 163, f_K); rect(x - 3, 156, x + 3, 162, hex('#b8582a')); rect(x - 3, 156, x + 3, 157, hex('#d8784a')); rect(x + 2, 158, x + 3, 162, hex('#8a3a1a'));
    for (let j = 0; j < 7; j++) f_flor(R, x - 3 + Math.round(h(x, j, 179) * 6), 150 + Math.round(h(x, j, 180) * 5), j % 2 ? 1 : 2, j); }
}

// las farolas de hierro de la acera (van por delante de los paseantes de enfrente): globo de luz, pie de fundición
function f_farola(R, x, suelo, t, P, alto = 98) {
  const top = suelo - alto;
  if (P.noche) R.halo(x, top + 4, 13, [hex('#4a3a5a'), hex('#7a5a6a'), hex('#b8906a')], 1.4);
  R.rect(x - 1, top + 8, x + 1, suelo, f_K); R.rect(x, top + 8, x, suelo, hex('#4a4a5e'));
  R.rect(x - 3, suelo - 6, x + 3, suelo, f_K); R.rect(x - 2, suelo - 5, x + 2, suelo - 1, hex('#3a3a4e'));
  for (let k = 0; k < 4; k++) R.rect(x - 1, top + 20 + k * 18, x + 1, top + 21 + k * 18, hex('#5a5a6e'));
  R.disco(x, top + 3, 4, f_K); R.disco(x, top + 3, 3, P.noche ? hex('#fff2c0') : hex('#e8e4d8')); R.pset(x - 1, top + 2, hex('#ffffff'));
  R.rect(x - 2, top + 7, x + 2, top + 8, f_K); R.rect(x - 1, top - 2, x + 1, top - 1, f_K);
}

// la vida de la ciudad: nubes a tres velocidades, focos que barren el cielo, murciélagos, el tren dorado, los paseantes,
// el coche negro que pasa, las farolas, el papel picado al viento, las velas, el neón y los pétalos que caen
function f_ciudad(R, t, o, P) {
  const { rect, pset } = R;
  R.copiar(f_capa(R, 'ciudadF' + (P.noche ? 'n' : 'd'), () => f_ciudadFondo(R, P)));
  // los focos del estreno, detrás del rascacielos
  if (P.noche) for (const [bx, k] of [[100, 0], [150, 1]]) { const a = -Math.PI / 2 + Math.sin(t * 0.35 + k * 2.2) * 0.55;
    for (let r = 4; r < 70; r += 1) for (let w = -r * 0.07; w <= r * 0.07; w += 1) { const x = Math.round(bx + Math.cos(a) * r - Math.sin(a) * w), y = Math.round(64 + Math.sin(a) * r + Math.cos(a) * w);
      if (y < 0 || y > 60 || (x > 18 && x < 172 && y < 15) || (x > 274 && y < 46)) continue; if (f_b4(x, y) < 0.42 - r * 0.004) pset(x, y, f_mez(R.pget(x, y), hex('#c8b8d8'), 0.35)); } }
  for (let k = 0; k < 6; k++) { const v = [1.2, 2.2, 3.4][k % 3], w = 26 + (k % 3) * 10, x = ((h(k, 1, 181) * 420 + t * v) % 420) - 50, y = 30 + (k % 3) * 7 + Math.round(h(k, 2, 181) * 6);
    if (x > 250 && y < 48) continue; f_nube(R, x, y, w, k, P.nube); }
  // los murciélagos (de noche) o los pájaros (de día)
  for (let k = 0; k < 4; k++) { const x = Math.round(((h(k, 3, 181) * 360 + t * (9 + k * 2)) % 360) - 20), y = Math.round(54 + k * 6 + Math.sin(t * 2 + k) * 3), ala = Math.floor(t * 8 + k) % 2;
    if (x > 268 && y < 50) continue; const c = P.noche ? hex('#14102a') : hex('#3a3a5a'); pset(x, y, c); pset(x - 1, y - ala, c); pset(x + 1, y - ala, c); pset(x - 2, y - 1 + ala * 2, c); pset(x + 2, y - 1 + ala * 2, c); }
  // el tren dorado del viaducto: la locomotora aerodinámica y tres coches con las ventanas encendidas
  { const tx = Math.round(((t * 26) % 520) - 140);
    for (let c = 0; c < 4; c++) { const x0 = tx - c * 30, loco = c === 0;
      rect(x0 - 27, 88, x0, 96, f_K); rect(x0 - 26, 89, x0 - 1, 95, hex('#d8a83a')); rect(x0 - 26, 89, x0 - 1, 89, hex('#f8d870')); rect(x0 - 26, 94, x0 - 1, 95, hex('#8a6420'));
      if (loco) { for (let j = 0; j < 7; j++) rect(x0, 89 + j, x0 + Math.round(Math.sqrt(Math.max(0, 49 - (j - 6) ** 2)) * 0.9), 89 + j, j < 2 ? hex('#f8d870') : hex('#d8a83a')); pset(x0 + 5, 93, hex('#fff8c0')); for (let i = 0; i < 4; i++) rect(x0 - 20 + i * 5, 92, x0 - 18 + i * 5, 92, hex('#8a6420')); }
      else for (let i = 0; i < 5; i++) rect(x0 - 24 + i * 5, 90, x0 - 22 + i * 5, 92, P.noche ? hex('#fff0b0') : hex('#5a6a8a'));
      pset(x0 - 26, 97, f_K); pset(x0 - 4, 97, f_K); }
    if (P.noche) for (let i = 0; i < 3; i++) pset(tx + 8 + i * 2, 93, hex('#fff8c0')); }
  f_pegar(R, f_capa(R, 'ciudadM' + (P.noche ? 'n' : 'd'), () => f_ciudadMedio(R, P), true), 14, 179);
  // las ventanas del rascacielos que se encienden y apagan, la luz roja de la aguja
  for (let k = 0; k < 8; k++) { const x = 87 + Math.floor(h(k, 1, 182) * 12) * 6, y = 68 + Math.floor(h(k, 2, 182) * 11) * 5; if (x > 158) continue; rect(x, y, x, y + 2, Math.sin(t * 0.7 + k * 1.9) > 0 ? P.vent : P.ventA); }
  if (Math.floor(t * 1.3) % 2) pset(123, 14, hex('#ff4a4a'));
  // el letrero vertical del hotel: estrellas, una calavera y una flor que se encienden en secuencia; bombillas que corren
  { const fase = Math.floor(t * 2.2) % 5;
    const SIM = [['..#..', '.###.', '#####', '.#.#.', '#...#'], ['.###.', '#.#.#', '#####', '.#.#.', '.....'], ['.#.#.', '#####', '.###.', '..#..', '.....'], ['..#..', '.#.#.', '#.#.#', '.#.#.', '..#..']];
    SIM.forEach((s, i) => { const on = fase === 4 || fase >= i, c = on ? [hex('#ff6ab8'), hex('#ffd860'), hex('#6ae8ff'), hex('#ffa040')][i] : hex('#5a2a3a');
      s.forEach((f, j) => { for (let q = 0; q < 5; q++) if (f[q] === '#') pset(239 + q, 62 + i * 16 + j, c); }); });
    for (let y = 57; y < 128; y += 3) { pset(236, y, (y / 3 + Math.floor(t * 8)) % 3 === 0 ? hex('#fff0a0') : hex('#8a6a3a')); pset(246, y, (y / 3 + Math.floor(t * 8) + 1) % 3 === 0 ? hex('#fff0a0') : hex('#8a6a3a')); } }
  // la tira de bombillas de la cantina
  for (let x = 170; x < 228; x += 4) { const y = 106 + Math.round(Math.sin((x - 170) / 58 * Math.PI) * 3), on = (x / 4 + Math.floor(t * 3)) % 3 !== 0; pset(x, y, on ? [hex('#ff6a6a'), hex('#ffd860'), hex('#6ae88a')][(x / 4) % 3] : hex('#5a4a3a')); }
  if (o.petalos != null) f_rastro(R, t, o.petalos);
  // los paseantes de enfrente (esqueletos pequeños) y el coche negro que pasa de vez en cuando
  for (let k = 0; k < 5; k++) { const dir = k & 1 ? -1 : 1, v = 5 + k * 1.3, span = 170, x = 70 + (((h(k, 4, 182) * span + dir * t * v) % span) + span) % span; f_paseante(R, x, 135, t, k, dir); }
  { const u = ((t + 3) % 14) / 4.5; if (u < 1) { const cx = Math.round(-50 + u * 420); f_cocheNegro(R, cx, 150, t, P); } }
  // las farolas, el papel picado entre ellas y las casas, las velas del altar, los pétalos que caen
  f_farola(R, 66, 160, t, P, 104); f_farola(R, 256, 160, t, P, 104);
  f_picado(R, 66, 58, 256, 58, t, 0, 11, 12); f_picado(R, 52, 46, 232, 54, t, 3, 10, 10); f_picado(R, 0, 50, 66, 58, t, 5, 11, 5); f_picado(R, 256, 58, 319, 52, t, 2, 11, 4);
  for (const [x, y, a, k] of [[12, 140, 4, 0], [20, 140, 6, 1], [42, 140, 5, 2], [52, 140, 4, 3], [17, 128, 5, 4], [47, 128, 5, 5], [26, 118, 4, 6], [38, 118, 4, 7]]) f_vela(R, x, y - 1, a, t, k);
  f_humo(R, 34, 132, t, 1, P.noche ? hex('#8a7a9a') : hex('#e8e0e8'), 22);
  for (let k = 0; k < 9; k++) { const u = (t * 0.12 + h(k, 1, 183)) % 1, x = Math.round(h(k, 2, 183) * 320 + Math.sin(t * 1.4 + k) * 6 + u * 30), y = Math.round(40 + u * 140); if (y < 179) { pset(x, y, k & 1 ? hex('#f0a020') : hex('#ffcc48')); if (Math.sin(t * 5 + k) > 0) pset(x + 1, y, hex('#d8740e')); } }
}

// un coche negro de los cuarenta (de cine negro) que pasa por la calle: guardabarros redondos, cromados, faros encendidos
function f_cocheNegro(R, x, suelo, t, P) {
  const { rect, disco, pset } = R, c = hex('#1e1c2a'), cl = hex('#3a3850'), cr = hex('#c8c8d8');
  for (let j = 0; j < 7; j++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((j - 6) / 7) ** 2)) * 13); rect(x - 2 - w, suelo - 18 + j, x - 2 + w, suelo - 18 + j, j < 1 ? cl : c); }
  rect(x - 13, suelo - 16, x - 5, suelo - 12, P.noche ? hex('#4a4a6a') : hex('#8ab0d0')); rect(x - 1, suelo - 16, x + 7, suelo - 12, P.noche ? hex('#4a4a6a') : hex('#8ab0d0')); rect(x - 4, suelo - 17, x - 2, suelo - 11, c);
  rect(x - 24, suelo - 11, x + 22, suelo - 4, c); rect(x - 24, suelo - 11, x + 22, suelo - 11, cl); rect(x - 22, suelo - 7, x + 20, suelo - 7, cr);
  for (const wx of [-15, 13]) { for (let j = 0; j < 5; j++) rect(x + wx - 7 + j, suelo - 12 + j, x + wx + 7 - j, suelo - 12 + j, c); disco(x + wx, suelo - 2, 4, f_K); disco(x + wx, suelo - 2, 2, hex('#e8e8e8')); pset(x + wx, suelo - 2, hex('#6a6a7a')); }
  rect(x + 21, suelo - 9, x + 23, suelo - 5, cr); if (P.noche) { R.halo(x + 26, suelo - 7, 6, [hex('#6a6070'), hex('#c8b890')], 1.2); pset(x + 23, suelo - 9, hex('#fff8d0')); }
  pset(x - 24, suelo - 8, hex('#e83a3a'));
}

// el rastro de pétalos de cempasúchil por la acera hasta el portal del rascacielos (u: 0–1, cuánto hay pintado)
function f_rastro(R, t, u) {
  const PT = [[0, 170], [40, 168], [80, 165], [100, 160], [112, 152], [118, 144], [122, 136], [123, 132]];
  let L = 0; const seg = []; for (let i = 1; i < PT.length; i++) { const d = Math.hypot(PT[i][0] - PT[i - 1][0], PT[i][1] - PT[i - 1][1]); seg.push(d); L += d; }
  for (let s = 0, i = 0, acc = 0; s < L * u; s += 2.2) {
    while (i < seg.length - 1 && s > acc + seg[i]) { acc += seg[i]; i++; }
    const f = (s - acc) / seg[i], x = PT[i][0] + (PT[i + 1][0] - PT[i][0]) * f, y = PT[i][1] + (PT[i + 1][1] - PT[i][1]) * f, k = Math.round(s);
    const dx = Math.round((h(k, 1, 184) - 0.5) * 6), dy = Math.round((h(k, 2, 184) - 0.5) * 3), brillo = Math.sin(t * 3 + k * 0.7) > 0.85;
    R.pset(x + dx, y + dy, brillo ? hex('#ffe070') : k % 3 ? hex('#f0a020') : hex('#d8740e')); if (k % 2) R.pset(x + dx + 1, y + dy, hex('#c86a10'));
  }
}

// La pared de estuco añil, desconchada, con la ventana a la calle de noche (papel picado que se mece, un murciélago);
// el altar de tres gradas con manteles de colores y bordes calados, el arco de cempasúchil, tres retratos enmarcados, las
// calaveritas de azúcar, el pan de muerto, la fruta, el vaso de agua, las flores moradas, el sahumerio con el humo del
// copal y muchas velas que tiemblan; el suelo de barro con el camino de pétalos y las ollas de flores a los lados.
// Suelo 168: sitio para personajes a la izquierda (x 40–86) y a la derecha (x 236–270).
function f_altarFijo(R, P) {
  const { rect, pset, disco, linea } = R;
  const pared = P.noche ? hex('#2a3466') : hex('#3a5aa8'), paredL = P.noche ? hex('#3a4478') : hex('#5a7ac0'), paredS = P.noche ? hex('#1e2650') : hex('#2a4488');
  rect(0, 0, 319, 150, pared);
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 190), w = h(x >> 2, y >> 2, 191), w2 = h(x >> 4, y >> 4, 189);
    if (w > 0.9 && w2 > 0.7 && v > 0.2) pset(x, y, P.noche ? hex('#5a5068') : hex('#a8a0b8')); else if (v < 0.1) pset(x, y, paredS); else if (v > 0.94) pset(x, y, paredL); }
  // el estarcido de la pared: una cenefa de rombos y flores pintada a mano
  for (let x = 0; x < 320; x += 12) for (const yy of [132]) { pset(x + 6, yy, paredL); pset(x + 5, yy + 1, paredL); pset(x + 7, yy + 1, paredL); pset(x + 6, yy + 2, P.noche ? hex('#c86a4a') : hex('#f0a060')); pset(x + 5, yy + 3, paredL); pset(x + 7, yy + 3, paredL); pset(x + 6, yy + 4, paredL); pset(x, yy + 2, paredS); }
  for (let k = 0; k < 5; k++) { let x = 20 + h(k, 1, 192) * 280, y = 10 + h(k, 2, 192) * 60; for (let i = 0; i < 14; i++) { pset(Math.round(x), Math.round(y), paredS); x += h(k, i, 193) - 0.5; y += 1; } }
  // la luz cálida de las velas sobre la pared, tramada
  for (let y = 40; y < 150; y++) for (let x = 40; x < 280; x++) { const d = Math.hypot((x - 160) / 1.4, y - 150) / 110; if (d < 1 && f_b4(x, y) < (1 - d) * 0.8) pset(x, y, f_mez(R.pget(x, y), hex('#c86a4a'), 0.35)); }
  rect(0, 140, 319, 150, paredS); rect(0, 140, 319, 140, paredL);
  // la ventana de la izquierda con la calle de noche (las cosas vivas se pintan luego, recortadas)
  rect(8, 30, 52, 100, hex('#5a3a2a')); rect(10, 32, 50, 98, f_K); rect(11, 33, 49, 97, P.noche ? hex('#1a1c48') : hex('#7aa0d8'));
  rect(4, 100, 56, 103, hex('#7a5a3a')); rect(4, 100, 56, 100, hex('#a8845a'));
  // el suelo de barro: baldosas con sus juntas y el brillo de las velas
  rect(0, 151, 319, 179, hex('#8a4a2a')); for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 194); if (v < 0.08) pset(x, y, hex('#6a3420')); else if (v > 0.95) pset(x, y, hex('#a86a4a')); }
  for (let y = 151; y < 180; y += 7) rect(0, y, 319, y, hex('#5a2a18')); for (let y = 151; y < 180; y += 7) for (let x = ((y / 7) & 1) * 10; x < 320; x += 20) rect(x, y, x, y + 6, hex('#5a2a18'));
  for (let y = 152; y < 180; y++) for (let x = 60; x < 260; x++) { const d = Math.hypot((x - 160) / 2.4, (y - 152) * 1.2) / 50; if (d < 1 && f_b4(x, y) < (1 - d) * 0.6) pset(x, y, f_mez(R.pget(x, y), hex('#f0a060'), 0.3)); }
  // las tres gradas con sus manteles: blanco calado arriba, morado en medio, rosa abajo, con el borde de flecos
  const grada = (x0, x1, y0, y1, c, cS, fleco) => { rect(x0, y0, x1, y1, f_K); rect(x0 + 1, y0 + 1, x1 - 1, y1, c); rect(x1 - 4, y0 + 1, x1 - 1, y1, cS); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, f_mez(c, hex('#ffffff'), 0.4));
    for (let x = x0 + 1; x < x1; x++) { pset(x, y0 + 6, ((x >> 1) & 1) ? fleco[0] : fleco[1]); if ((x % 4) === 0) { rect(x, y0 + 7, x, y0 + 9, fleco[x % 8 ? 0 : 1]); } }
    for (let x = x0 + 4; x < x1 - 4; x += 8) { pset(x, y0 + 12, cS); pset(x + 1, y0 + 13, cS); pset(x - 1, y0 + 13, cS); pset(x, y0 + 14, cS); } };
  grada(70, 250, 128, 152, hex('#d8487a'), hex('#a82a5a'), [hex('#f0d040'), hex('#3ab86a')]);
  grada(92, 228, 104, 128, hex('#7a4ab8'), hex('#5a2a90'), [hex('#f0a020'), hex('#e8488a')]);
  grada(114, 206, 80, 104, hex('#f0eadc'), hex('#c8bca8'), [hex('#3a9ae8'), hex('#e83a3a')]);
  // el arco de cempasúchil (tres filas de flores) con flores moradas de terciopelo
  for (let a = 0; a <= 120; a++) { const u = a / 120, ax = 76 + u * 168, ay = 130 - Math.sin(u * Math.PI) * 92;
    for (const dr of [-3, 0, 3]) { const nx = Math.cos(u * Math.PI) * 0, px = Math.round(ax + Math.cos(Math.PI * u + Math.PI / 2) * dr * 0), py = Math.round(ay + dr); f_flor(R, px + (dr ? (a & 1) : 0), py, (a + dr) % 3 ? 1 : 2, a + dr); }
    if (a % 15 === 7) { disco(Math.round(ax), Math.round(ay), 2, hex('#8a1e5a')); pset(Math.round(ax) - 1, Math.round(ay) - 1, hex('#c84a8a')); } }
  // los retratos enmarcados (siluetas y paisajes, sin caras dibujadas de cerca)
  for (const [fx, k] of [[124, 0], [151, 1], [178, 2]]) { rect(fx, 58, fx + 18, 80, f_K); rect(fx + 1, 59, fx + 17, 79, k === 1 ? hex('#c8a84a') : hex('#8a5a2a')); rect(fx + 3, 61, fx + 15, 77, [hex('#d8c8a0'), hex('#a8b8c8'), hex('#c8b0a0')][k]);
    disco(fx + 9, 67, 3, hex('#5a4a4a')); rect(fx + 5, 71, fx + 13, 77, [hex('#4a3a5a'), hex('#2a4a6a'), hex('#6a2a3a')][k]); if (k === 2) rect(fx + 5, 63, fx + 13, 64, hex('#2a2a2a')); pset(fx + 4, 62, hex('#ffffff')); }
  // la grada de arriba: calaveritas, el pan de muerto y el vaso de agua
  for (const [x, k] of [[120, 0], [204, 3]]) f_calaverita(R, x, 102, k);
  disco(160, 98, 5, hex('#c88a3a')); disco(159, 97, 4, hex('#e0a850')); linea(156, 96, 164, 96, hex('#a8682a')); linea(160, 92, 160, 100, hex('#a8682a')); pset(158, 95, hex('#f8d090')); for (let i = -4; i <= 4; i += 2) pset(160 + i, 94 + Math.abs(i) / 2, hex('#f8e8c0'));
  rect(140, 94, 143, 102, hex('#a8d0e8')); rect(140, 94, 143, 95, hex('#e8f4ff')); rect(143, 96, 143, 102, hex('#7aa0c0'));
  // la grada del medio: más calaveras, fruta (naranjas, plátanos), una botella y las flores moradas en jarras
  for (const [x, k] of [[100, 1], [110, 2], [212, 4], [222, 0]]) f_calaverita(R, x, 126, k);
  for (const [x, y] of [[130, 123], [135, 124], [133, 120]]) { disco(x, y, 2, hex('#e87a1a')); pset(x - 1, y - 1, hex('#ffb050')); }
  for (let i = 0; i < 6; i++) { pset(186 + i, 123 - Math.round(Math.sin(i / 5 * Math.PI) * 2), hex('#f0d040')); pset(186 + i, 124 - Math.round(Math.sin(i / 5 * Math.PI) * 2), hex('#c8a020')); }
  rect(196, 114, 199, 126, hex('#3a6a3a')); rect(197, 110, 198, 113, hex('#3a6a3a')); pset(196, 115, hex('#8ac08a'));
  for (const jx of [146, 172]) { rect(jx, 116, jx + 7, 126, hex('#b8582a')); rect(jx, 116, jx + 7, 117, hex('#d8784a')); rect(jx + 6, 118, jx + 7, 126, hex('#8a3a1a'));
    for (let j = 0; j < 6; j++) { const px = jx + Math.round(h(jx, j, 195) * 7), py = 107 + Math.round(h(jx, j, 196) * 7); disco(px, py, 1.5, j % 2 ? hex('#8a1e5a') : hex('#b02a6a')); pset(px, py - 1, hex('#e86aa0')); } }
  // la grada de abajo: el sahumerio de barro, más calaveras y el camino de pétalos que baja al suelo
  rect(154, 138, 166, 146, hex('#8a4a2a')); rect(152, 136, 168, 138, hex('#a86a3a')); rect(158, 146, 162, 151, hex('#6a3420')); disco(160, 136, 3, hex('#3a2a2a'));
  for (const [x, k] of [[84, 2], [94, 3], [226, 1], [236, 4]]) f_calaverita(R, x, 150, k);
  for (let k = 0; k < 120; k++) { const u = h(k, 1, 197), x = Math.round(160 + (h(k, 2, 197) - 0.5) * (10 + u * 30)), y = Math.round(153 + u * 26); pset(x, y, k & 1 ? hex('#f0a020') : hex('#d8740e')); }
  // las ollas de barro con más cempasúchil a los lados
  for (const ox of [22, 296]) { for (let j = 0; j < 22; j++) { const w = Math.round(10 * Math.sin((j + 2) / 24 * Math.PI)); rect(ox - w, 146 + j, ox + w, 146 + j, j < 3 ? hex('#c86a3a') : hex('#a8502a')); rect(ox + w - 2, 146 + j, ox + w, 146 + j, hex('#7a3418')); }
    for (let x = -8; x <= 8; x += 4) pset(ox + x, 156, hex('#f0e0c0'));
    for (let j = 0; j < 18; j++) f_flor(R, ox - 9 + Math.round(h(ox, j, 198) * 18), 128 + Math.round(h(ox, j, 199) * 18), j % 3 ? 2 : 3, j); }
}

const f_VELAS_ALTAR = [[76, 128, 7], [86, 128, 5], [100, 128, 6], [112, 128, 4], [208, 128, 4], [220, 128, 6], [234, 128, 5], [244, 128, 7], [98, 104, 5], [108, 104, 4], [214, 104, 4], [224, 104, 5], [118, 80, 6], [130, 80, 4], [190, 80, 4], [202, 80, 6],
  [64, 168, 8], [72, 170, 5], [250, 168, 8], [258, 170, 5], [128, 151, 4], [192, 151, 4]];

function f_altar(R, t, o, P) {
  R.copiar(f_capa(R, 'altar' + (P.noche ? 'n' : 'd'), () => f_altarFijo(R, P)));
  // por la ventana: las estrellas, el papel picado de la calle que se mece y un murciélago, recortados al hueco
  R.recorte([11, 33, 49, 97]);
  if (P.noche) for (let k = 0; k < 10; k++) { const x = 12 + Math.round(h(k, 1, 200) * 36), y = 34 + Math.round(h(k, 2, 200) * 30); if (Math.sin(t * 2 + k) > -0.3) R.pset(x, y, hex('#c8c0e8')); }
  R.poligono([[11, 80], [20, 66], [28, 74], [40, 60], [49, 70], [49, 97], [11, 97]], P.noche ? hex('#2a2448') : hex('#8a96c0'));
  for (let k = 0; k < 6; k++) R.pset(14 + k * 6, 84 + (k % 3) * 4, P.noche ? hex('#f0c870') : hex('#5a6a9a'));
  f_picado(R, 6, 44, 56, 50, t, 2, 9, 5);
  { const x = Math.round(((t * 14) % 80) - 10), y = Math.round(54 + Math.sin(t * 3) * 4), ala = Math.floor(t * 8) % 2; R.pset(x, y, f_K); R.pset(x - 1, y - ala, f_K); R.pset(x + 1, y - ala, f_K); R.pset(x - 2, y + ala, f_K); R.pset(x + 2, y + ala, f_K); }
  R.recorte(null); R.rect(30, 33, 31, 97, hex('#5a3a2a')); R.rect(11, 64, 49, 65, hex('#5a3a2a'));
  // el papel picado de la sala, las velas, el humo del copal y los pétalos que caen
  f_picado(R, 0, 18, 272, 24, t, 1, 12, 6, 0.6); f_picado(R, 0, 48, 319, 50, t, 4, 12, 8, 0.6);
  for (const [x, y, a] of f_VELAS_ALTAR) f_vela(R, x, y - 1, a, t, x);
  f_humo(R, 160, 132, t, 0, hex('#d8d0e0'), 34); f_humo(R, 158, 130, t, 1.7, hex('#b8b0c8'), 28);
  for (let k = 0; k < 7; k++) { const u = (t * 0.1 + h(k, 1, 201)) % 1, x = Math.round(80 + h(k, 2, 201) * 160 + Math.sin(t * 1.6 + k) * 5), y = Math.round(40 + u * 120); R.pset(x, y, k & 1 ? hex('#f0a020') : hex('#ffcc48')); }
  { const a = t * 3.1, mx = Math.round(202 + Math.cos(a) * 6), my = Math.round(70 + Math.sin(a * 1.4) * 4); R.pset(mx, my, hex('#e8dcc8')); R.pset(mx + 1, my - (Math.floor(t * 12) % 2), hex('#c8bca8')); }
  return { suelo: 168, pies: [[30, 86], [234, 276]], altar: [70, 80, 250, 152], gradas: [128, 104, 80], ventana: [11, 33, 49, 97] };
}

// cámara 'general': la oficina de noche: la pared de color crema con pilastras acanaladas de oro, el zócalo de mármol
// negro, dos carteles de viaje enmarcados en pictogramas (el tren dorado hacia el sol, el barco entre estrellas), el
// reloj de rayos, el ventilador de techo que gira, el ventanal con persiana a medio bajar (la ciudad, el rascacielos y un
// foco que barre, y las rayas de la persiana en el suelo), la ventanilla de latón con su arco y su rejilla en el centro
// (el agente detrás, con los pies en y 121: se ve de la cintura arriba; lo tapan la repisa de y 113–117 y el mostrador), el revistero de folletos del tren, la
// cola con postes de latón y cordón de terciopelo, la palmera en su maceta, la escupidera, el suelo de damero que
// refleja y un oficinista pequeño al fondo que escribe a máquina. Los clientes hacen cola con los pies en y 164.
// cámara 'ventanilla': la ventanilla de cerca: el marco de latón con su abanico, la rejilla, el cristal, el agente
// detrás (pies en y 141, se ve de la cintura arriba sobre el mostrador de y 136), y detrás de él la oficina (casilleros
// de billetes, el reloj, el archivador, el flexo verde); en el mostrador el tampón, el timbre que brilla, el taco de
// billetes y el abanico de folletos del tren dorado; el cliente se pone a la izquierda, con los pies en y 178.
function f_agenciaFijo(R, P) {
  const { rect, pset, disco, linea, poligono } = R;
  const crema = hex('#d8c8a0'), cremaL = hex('#ece0c0'), cremaS = hex('#b8a47c'), oro = hex('#c8a040'), oroL = hex('#f0d070'), oroS = hex('#8a6a28'), negro = hex('#1e1a24'), negroL = hex('#3a3444');
  // la pared crema con vetas y la luz cálida de las lámparas; el friso dorado de zigzag arriba
  rect(0, 0, 319, 132, crema);
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 2, 210); if (v < 0.09) pset(x, y, cremaS); else if (v > 0.95) pset(x, y, cremaL); }
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const d = Math.abs(x - 168) / 200 + (132 - y) / 400; if (f_b4(x, y) < d * 0.55) pset(x, y, f_mez(R.pget(x, y), hex('#8a7a6a'), 0.3)); }
  rect(0, 0, 319, 9, hex('#4a3a2a')); rect(0, 10, 319, 15, negro); for (let x = 0; x < 320; x += 6) { linea(x, 15, x + 3, 11, oroS); linea(x + 3, 11, x + 6, 15, oroS); } rect(0, 16, 319, 16, oroL); rect(0, 17, 319, 17, oroS);
  // las pilastras acanaladas con capitel escalonado
  for (const px of [6, 108, 236, 306]) { rect(px, 18, px + 10, 132, cremaL); for (let x = px + 1; x < px + 10; x += 3) rect(x, 24, x, 126, cremaS); rect(px + 9, 18, px + 10, 132, cremaS);
    for (let s = 0; s < 3; s++) rect(px - s, 18 + s * 2, px + 10 + s, 19 + s * 2, s & 1 ? oroS : oro); rect(px - 2, 126, px + 12, 132, oro); rect(px - 2, 126, px + 12, 126, oroL); }
  // el zócalo de mármol negro con vetas
  rect(0, 112, 319, 132, negro); for (let k = 0; k < 30; k++) { let x = h(k, 1, 211) * 320, y = 113 + h(k, 2, 211) * 18; for (let i = 0; i < 10; i++) { pset(Math.round(x), Math.round(y), negroL); x += 1; y += (h(k, i, 212) - 0.5) * 1.6; } }
  rect(0, 112, 319, 113, oro); rect(0, 112, 319, 112, oroL);
  // los dos carteles de viaje: el tren dorado hacia el sol entre montañas, y el barco bajo las estrellas (renglones en barras)
  const cartel = (x0, y0, dibuja) => { rect(x0, y0, x0 + 40, y0 + 56, oroS); rect(x0 + 1, y0 + 1, x0 + 39, y0 + 55, oro); rect(x0 + 3, y0 + 3, x0 + 37, y0 + 53, f_K); R.recorte([x0 + 4, y0 + 4, x0 + 36, y0 + 52]); dibuja(x0 + 4, y0 + 4); R.recorte(null); };
  cartel(24, 30, (x, y) => { f_deg(R, x, y, x + 32, y + 30, [hex('#f8d070'), hex('#f0a050'), hex('#d86a50'), hex('#8a3a5a')]); disco(x + 16, y + 26, 9, hex('#fff0b0'));
    for (let k = 0; k < 8; k++) linea(x + 16, y + 26, x + 16 + Math.round(Math.cos(Math.PI + k * Math.PI / 7) * 18), y + 26 + Math.round(Math.sin(Math.PI + k * Math.PI / 7) * 18), hex('#fff8d8'));
    poligono([[x, y + 30], [x + 9, y + 18], [x + 16, y + 30]], hex('#5a2a4a')); poligono([[x + 18, y + 30], [x + 26, y + 20], [x + 33, y + 30]], hex('#4a2a4a'));
    rect(x, y + 30, x + 32, y + 48, hex('#2a1e3a')); rect(x, y + 34, x + 32, y + 34, hex('#c8a040')); rect(x + 4, y + 29, x + 26, y + 33, hex('#e8b840')); rect(x + 4, y + 29, x + 26, y + 29, hex('#fff0a0')); poligono([[x + 26, y + 29], [x + 31, y + 33], [x + 26, y + 33]], hex('#e8b840'));
    for (let i = 0; i < 4; i++) rect(x + 6 + i * 5, y + 30, x + 7 + i * 5, y + 31, hex('#fff8d0')); rect(x + 4, y + 40, x + 28, y + 41, hex('#f0d070')); rect(x + 4, y + 44, x + 20, y + 45, hex('#c8a8c8')); });
  cartel(68, 30, (x, y) => { f_deg(R, x, y, x + 32, y + 48, [hex('#141a44'), hex('#1e2a5a'), hex('#2a3a6a'), hex('#3a5a8a')]); for (let k = 0; k < 14; k++) pset(x + Math.round(h(k, 1, 213) * 32), y + Math.round(h(k, 2, 213) * 20), hex('#f0e8c8'));
    disco(x + 24, y + 8, 3, hex('#f8f0d0')); for (let yy = y + 30; yy < y + 49; yy++) for (let xx = x; xx <= x + 32; xx++) pset(xx, yy, (xx + yy * 3) % 7 === 0 ? hex('#5a8ac0') : hex('#2a4a7a'));
    poligono([[x + 4, y + 28], [x + 28, y + 28], [x + 25, y + 33], [x + 7, y + 33]], hex('#e8e0d0')); rect(x + 4, y + 31, x + 27, y + 33, hex('#c83a3a')); rect(x + 11, y + 22, x + 21, y + 28, hex('#f0e8d8'));
    for (const cx of [13, 19]) { rect(x + cx, y + 16, x + cx + 2, y + 22, hex('#c83a3a')); rect(x + cx, y + 16, x + cx + 2, y + 17, f_K); } for (let i = 0; i < 4; i++) pset(x + 12 + i * 3, y + 25, hex('#3a5a8a'));
    rect(x + 4, y + 40, x + 28, y + 41, hex('#f0d070')); rect(x + 4, y + 44, x + 22, y + 45, hex('#a8b8d8')); });
  // el reloj de rayos (las agujas van en la capa viva)
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; linea(196, 48, 196 + Math.round(Math.cos(a) * 13), 48 + Math.round(Math.sin(a) * 13), k & 1 ? oroS : oro); }
  disco(196, 48, 8, f_K); disco(196, 48, 7, hex('#f4ecd8')); for (let k = 0; k < 12; k++) pset(196 + Math.round(Math.cos(k * Math.PI / 6) * 6), 48 + Math.round(Math.sin(k * Math.PI / 6) * 6), f_K);
  // el ventanal con la ciudad (la parte viva se pinta luego, recortada) y el marco escalonado
  rect(250, 48, 300, 108, oroS); rect(252, 50, 298, 106, f_K);
  // la ventanilla de latón: el arco con su abanico, la rejilla, el mostrador de madera con paneles y el pie de mármol
  rect(124, 52, 220, 118, f_K); rect(125, 53, 219, 117, hex('#6a4a2a'));
  for (let j = 0; j < 22; j++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((22 - j) / 22) ** 2)) * 48); rect(172 - w, 30 + j, 172 + w, 30 + j, oroS); rect(172 - w + 2, 31 + j, 172 + w - 2, 31 + j, oro); }
  for (let k = 0; k < 11; k++) { const a = Math.PI + (k + 0.5) * Math.PI / 11; linea(172, 52, 172 + Math.round(Math.cos(a) * 44), 52 + Math.round(Math.sin(a) * 20), k & 1 ? oroL : oroS); } disco(172, 52, 5, oroL); disco(172, 52, 3, oro);
  rect(124, 52, 220, 54, oroL);
  // por la ventanilla: la trastienda (casilleros con billetes, el archivador, otro oficinista); los barrotes y el cristal van en la capa delante
  rect(130, 58, 214, 117, hex('#4a3a2e')); for (let j = 0; j < 4; j++) for (let i = 0; i < 10; i++) { const x = 132 + i * 8, y = 60 + j * 8; rect(x, y, x + 6, y + 6, hex('#2a1e18')); if (h(i, j, 214) < 0.7) rect(x + 1, y + 2 + Math.floor(h(i, j, 215) * 3), x + 5, y + 5, [hex('#f0e8c8'), hex('#e8c860'), hex('#c8d8e8')][(i + j) % 3]); }
  rect(198, 92, 214, 117, hex('#5a5a62')); for (let j = 0; j < 3; j++) { rect(199, 94 + j * 8, 213, 100 + j * 8, hex('#6e6e78')); rect(204, 96 + j * 8, 208, 96 + j * 8, hex('#c8c8d0')); }
  rect(110, 118, 234, 152, f_K); rect(111, 118, 233, 151, hex('#7a4a28'));
  for (let k = 0; k < 5; k++) { const x0 = 114 + k * 24; rect(x0, 124, x0 + 20, 146, hex('#5e3618')); rect(x0 + 1, 125, x0 + 19, 145, hex('#8a5a32')); for (let y = 126; y < 145; y += 2) for (let x = x0 + 2; x < x0 + 19; x++) if (h(x, y, 216) < 0.25) pset(x, y, hex('#7a4a28')); for (let i = 0; i < 5; i++) linea(x0 + 10, 145, x0 + 2 + i * 4, 128, oroS); }
  rect(108, 116, 236, 119, oro); rect(108, 116, 236, 116, oroL); rect(110, 148, 234, 152, negro); rect(110, 148, 234, 148, oroS);
  // el revistero de folletos: el tren dorado en cada folleto
  rect(240, 92, 262, 152, f_K); rect(241, 93, 261, 151, hex('#5a3a22')); for (let j = 0; j < 4; j++) { const y = 96 + j * 13; rect(242, y + 9, 260, y + 10, oroS);
    for (let i = 0; i < 3; i++) { const x = 243 + i * 6; rect(x, y, x + 5, y + 9, [hex('#f0e0b0'), hex('#c8e0f0'), hex('#f0c8d8')][(i + j) % 3]); rect(x + 1, y + 3, x + 4, y + 4, hex('#d8a83a')); pset(x + 4, y + 2, hex('#fff0a0')); rect(x + 1, y + 6, x + 4, y + 6, hex('#8a7a6a')); } }
  // la cola: postes de latón con el cordón de terciopelo rojo
  for (const px of [22, 58, 94]) { rect(px - 1, 128, px + 1, 150, oro); rect(px, 128, px, 150, oroL); disco(px, 127, 2, oroL); rect(px - 3, 150, px + 3, 152, oroS); }
  for (const [a, b] of [[22, 58], [58, 94]]) for (let x = a + 2; x < b - 1; x++) { const y = 131 + Math.round(Math.sin((x - a) / (b - a) * Math.PI) * 6); pset(x, y, hex('#a81e3a')); pset(x, y + 1, hex('#6a1024')); }
  // la palmera en su maceta deco y la escupidera de latón
  rect(274, 132, 292, 152, f_K); rect(275, 133, 291, 151, hex('#2a6a5a')); for (let y = 136; y < 151; y += 4) rect(275, y, 291, y, oro); rect(289, 133, 291, 151, hex('#1e4a40'));
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.42, L = 22 + (k % 2) * 6; for (let i = 0; i < L; i++) { const u = i / L, x = Math.round(283 + Math.cos(a) * i), y = Math.round(132 + Math.sin(a) * i + u * u * 10); pset(x, y, hex('#2a7a3a')); if (i % 2 && i > 3) { pset(x - 1, y + 1, hex('#3a9a4a')); pset(x + 1, y + 1, hex('#1e5a2a')); } } }
  disco(266, 149, 3, oroS); disco(266, 148, 3, oro); rect(264, 146, 268, 146, oroL);
  // el suelo de damero de mármol, con las rayas de luz de la persiana y los reflejos
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const ty = Math.floor((y - 152) / 7), tx = Math.floor((x + (y - 152) * 0.0) / 14); pset(x, y, (tx + ty) & 1 ? hex('#2a2430') : hex('#e8dcc4')); }
  for (let y = 152; y < 180; y++) { rect(0, y, 319, y, f_K); y += 6; } for (let x = 0; x < 320; x += 14) rect(x, 152, x, 179, hex('#8a7a5a'));
  rect(0, 152, 319, 153, oroS);
  for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const r = ((x - 200 + (y - 154) * 1.6) % 18 + 18) % 18; if (r < 6 && x > 160 && f_b4(x, y) < 0.5) pset(x, y, f_mez(R.pget(x, y), hex('#f8e8b0'), 0.35)); }
  for (const rx of [130, 172, 214]) for (let y = 154; y < 170; y++) if (f_b4(rx, y) < 0.5 - (y - 154) * 0.03) { pset(rx, y, f_mez(R.pget(rx, y), hex('#8a5a32'), 0.5)); pset(rx + 1, y, f_mez(R.pget(rx + 1, y), hex('#8a5a32'), 0.5)); }
}

// lo de delante en la agencia general: el cristal de la ventanilla con los barrotes de latón y la luz, y el mostrador
function f_agenciaDelanteFijo(R) {
  const { rect, pset, linea } = R, oro = hex('#c8a040'), oroL = hex('#f0d070'), oroS = hex('#8a6a28');
  for (let x = 130; x <= 214; x += 7) { if (x > 156 && x < 188) continue; rect(x, 58, x + 1, 117, oroS); pset(x, 58, oroL); rect(x, 58, x, 117, oro); }
  rect(130, 58, 214, 59, oro); rect(156, 60, 157, 117, oro); rect(188, 60, 189, 117, oro);
  for (let y = 62; y < 117; y++) for (let x = 130; x <= 214; x++) if (((x - y * 0.6) % 26 + 26) % 26 < 3 && f_b4(x, y) < 0.15) pset(x, y, hex('#f8f0e0'));
  rect(158, 113, 186, 117, oroS); rect(160, 114, 184, 117, hex('#2a1e18')); rect(160, 114, 184, 114, oro);
  rect(108, 116, 236, 119, oro); rect(108, 116, 236, 116, oroL); rect(110, 120, 234, 120, f_K);
  rect(164, 115, 172, 116, hex('#f0e8c8')); rect(165, 114, 171, 114, hex('#e8c860'));
}

function f_ventanillaFijo(R, P) {
  const { rect, pset, disco, linea } = R, oro = hex('#c8a040'), oroL = hex('#f0d070'), oroS = hex('#8a6a28');
  // la trastienda: pared verde oscuro con molduras, los casilleros de billetes, el archivador, el reloj
  rect(0, 0, 319, 136, hex('#2e4a40')); for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 2, 220); if (v < 0.08) pset(x, y, hex('#24403a')); else if (v > 0.95) pset(x, y, hex('#3e5e52')); }
  rect(0, 70, 319, 72, hex('#c8a040')); rect(0, 70, 319, 70, hex('#f0d070'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) { const x = 104 + i * 12, y = 52 + j * 10; rect(x, y, x + 10, y + 8, hex('#3a2a1e')); rect(x + 1, y + 1, x + 9, y + 7, hex('#1e1610'));
    if (h(i, j, 221) < 0.75) { const n = 1 + Math.floor(h(i, j, 222) * 3); for (let q = 0; q < n; q++) rect(x + 2 + q, y + 4 - q, x + 8, y + 7, [hex('#f0e8c8'), hex('#e8c860'), hex('#c8d8e8')][(i + j + q) % 3]); } }
    // el marco de latón de la ventanilla: el arco con el abanico, las jambas escalonadas, el cristal y la rejilla
  rect(0, 0, 319, 9, hex('#4a3a2a'));
  for (let x = 0; x < 320; x++) for (let y = 10; y < 136; y++) { const dentro = x >= 100 && x <= 220 && y >= 40; const arco = Math.hypot((x - 160) / 60, (y - 46) / 36) < 1 && y < 46; if (!(dentro || arco)) { const tabla = Math.floor(x / 9), veta = Math.sin(y * 0.35 + tabla * 2.1 + Math.sin(y * 0.09 + tabla) * 2.5); pset(x, y, x % 9 === 0 ? hex('#4a2a12') : veta > 0.75 ? hex('#6a3e1e') : tabla & 1 ? hex('#7a4a28') : hex('#84522c')); } }
  for (const yy of [74, 76]) for (let x = 0; x < 320; x++) { if (x >= 94 && x <= 226) continue; pset(x, yy, yy === 74 ? hex('#a8742e') : hex('#4a2a12')); }
  for (let a = 0; a < 200; a++) { const u = a / 199, ang = Math.PI + u * Math.PI; for (let r = 60; r < 66; r++) { const x = Math.round(160 + Math.cos(ang) * r), y = Math.round(46 + Math.sin(ang) * r * 0.6); if (y < 46) pset(x, y, r < 62 ? oroL : r < 64 ? oro : oroS); } }
  for (let k = 0; k < 13; k++) { const a = Math.PI + (k + 0.5) * Math.PI / 13; for (let r = 8; r < 58; r++) { const x = Math.round(160 + Math.cos(a) * r), y = Math.round(46 + Math.sin(a) * r * 0.6); if (k & 1) pset(x, y, oroS); else { pset(x, y, oro); } } }
  disco(160, 46, 7, oroS); disco(160, 46, 6, oro); disco(159, 45, 3, oroL);
  for (const jx of [94, 220]) { rect(jx, 40, jx + 6, 136, oroS); rect(jx + 1, 40, jx + 5, 136, oro); rect(jx + 2, 40, jx + 2, 136, oroL); for (let y = 48; y < 136; y += 12) rect(jx, y, jx + 6, y + 1, oroS); }
  rect(100, 46, 220, 48, oro); rect(100, 46, 220, 46, oroL);
  // el reloj de pared de este lado y el archivador del fondo (dentro del hueco)
  disco(48, 40, 12, oroS); disco(48, 40, 11, oro); disco(48, 40, 9, hex('#f4ecd8')); for (let k = 0; k < 12; k++) pset(48 + Math.round(Math.cos(k * Math.PI / 6) * 7), 40 + Math.round(Math.sin(k * Math.PI / 6) * 7), f_K);
  rect(104, 96, 124, 136, hex('#5a5a62')); for (let j = 0; j < 3; j++) { rect(106, 99 + j * 12, 122, 108 + j * 12, hex('#6e6e78')); rect(111, 102 + j * 12, 117, 102 + j * 12, hex('#c8c8d0')); }
  rect(106, 92, 114, 95, hex('#e8e0c8')); rect(107, 91, 113, 91, hex('#f8f0d8'));
  // el flexo verde de la trastienda y la placa del precio colgada (números)
  rect(176, 96, 190, 100, hex('#2a7a4a')); rect(176, 96, 190, 96, hex('#5ab87a')); rect(183, 100, 184, 110, oroS); rect(179, 110, 188, 112, oroS);
  // el mostrador de mármol con la moldura de latón y el frente de madera con el abanico de marquetería
  rect(0, 136, 319, 145, hex('#2a2430')); for (let k = 0; k < 16; k++) { let x = h(k, 1, 223) * 320, y = 137 + h(k, 2, 223) * 7; for (let i = 0; i < 12; i++) { pset(Math.round(x), Math.round(y), hex('#4a4250')); x += 1; y += (h(k, i, 224) - 0.5) * 1.2; } }
  rect(0, 136, 319, 136, hex('#5a5262')); rect(0, 146, 319, 148, oro); rect(0, 146, 319, 146, oroL);
  rect(0, 149, 319, 179, hex('#7a4a28')); for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) if (h(x, y >> 1, 225) < 0.2) pset(x, y, hex('#6a3e20'));
  for (let k = 0; k < 4; k++) { const x0 = 8 + k * 80; rect(x0, 154, x0 + 70, 179, hex('#5e3618')); rect(x0 + 1, 155, x0 + 69, 179, hex('#8a5a32')); for (let i = 0; i < 9; i++) linea(x0 + 35, 179, x0 + 3 + i * 8, 158, oroS); disco(x0 + 35, 179, 6, oro); }
}

function f_ventanillaDelanteFijo(R) {
  const { rect, pset, disco, linea } = R, oro = hex('#c8a040'), oroL = hex('#f0d070'), oroS = hex('#8a6a28');
  // la rejilla de latón (deja libre el hueco del centro) y el cristal con sus reflejos
  for (let x = 104; x <= 216; x += 8) { if (x > 128 && x < 192) continue; rect(x, 48, x + 1, 136, oroS); rect(x, 48, x, 136, oroL); }
  rect(100, 48, 220, 49, oro); for (let y = 60; y < 136; y += 24) rect(100, y, 128, y, oroS); for (let y = 60; y < 136; y += 24) rect(192, y, 220, y, oroS);
  rect(129, 48, 130, 136, oro); rect(190, 48, 191, 136, oro); rect(131, 48, 189, 50, oro);
  // la placa del precio, colgada del cristal: el billete y un número
  rect(146, 52, 174, 62, oroS); rect(147, 53, 173, 61, hex('#f0e8d0')); rect(149, 55, 158, 59, hex('#3a6a3a')); rect(150, 56, 157, 58, hex('#8ac08a')); pset(153, 57, hex('#3a6a3a')); pset(154, 57, hex('#3a6a3a')); R.numero('4', 166, 61, { color: hex('#3a2a1a'), sombra: false, centro: true });
  // el hueco de pasar billetes en el mármol
  rect(138, 132, 182, 136, f_K); rect(140, 133, 180, 135, hex('#3a2a20')); rect(138, 131, 182, 131, oroL);
  // en el mostrador: el abanico de folletos del tren dorado, el taco de billetes, el tampón y el timbre
  for (let k = 0; k < 4; k++) { const x = 30 + k * 9, y = 138 - k; rect(x, y, x + 14, y + 8, f_K); rect(x + 1, y + 1, x + 13, y + 7, [hex('#f0e0b0'), hex('#c8e0f0'), hex('#f0c8d8'), hex('#f8f0d8')][k]); rect(x + 2, y + 3, x + 10, y + 5, hex('#d8a83a')); rect(x + 2, y + 3, x + 10, y + 3, hex('#fff0a0')); pset(x + 11, y + 4, hex('#d8a83a')); for (let i = 0; i < 3; i++) pset(x + 3 + i * 3, y + 5, hex('#fff8d0')); }
  rect(226, 138, 246, 144, f_K); for (let k = 0; k < 4; k++) rect(227, 141 - k, 245, 141 - k, k & 1 ? hex('#e8c860') : hex('#f0e8c8'));
  rect(254, 137, 270, 144, f_K); rect(255, 138, 269, 143, hex('#5a3a22')); rect(258, 128, 266, 137, hex('#2a2a2a')); disco(262, 127, 3, hex('#5a3a22')); rect(256, 143, 268, 144, hex('#8a2a3a'));
  disco(290, 140, 5, f_K); disco(290, 140, 4, oro); disco(289, 139, 2, oroL); rect(285, 141, 295, 144, oroS); rect(289, 134, 291, 135, oroS);
}

function f_agencia(R, t, o, P, cam) {
  if (cam === 'ventanilla') {
    R.copiar(f_capa(R, 'ventanilla', () => f_ventanillaFijo(R, P)));
    // las agujas del reloj, el flexo que da luz, el oficinista del fondo que escribe a máquina y el archivador
    { const a = t * 0.2, b = t * 0.02; R.linea(48, 40, 48 + Math.round(Math.cos(a) * 7), 40 + Math.round(Math.sin(a) * 7), f_K); R.linea(48, 40, 48 + Math.round(Math.cos(b) * 5), 40 + Math.round(Math.sin(b) * 5), hex('#a82a2a')); }
    R.halo(183, 104, 14, [hex('#3e5a4a'), hex('#5a7a5a'), hex('#a8b878')], 0.9);
    { const tecla = Math.floor(t * 7) % 3; f_paseante(R, 212, 112, t, 5, -1, false); R.rect(196, 112, 219, 136, hex('#3a2a1e')); R.rect(196, 112, 219, 113, hex('#5a4a3a')); R.rect(198, 106, 210, 111, hex('#2a2a32')); R.rect(199, 107, 209, 108, hex('#4a4a52')); R.rect(200, 102, 208, 106, hex('#f0ece0')); R.pset(199 + tecla * 4, 109, hex('#c8c8d0'));
      if ((t % 4) > 3.6) R.rect(196, 107, 199, 107, hex('#c8c8d0')); }
    for (let k = 0; k < 10; k++) { const u = (t * 0.06 + h(k, 1, 228)) % 1, x = Math.round(172 + h(k, 2, 228) * 26 + Math.sin(t + k) * 3), y = Math.round(128 - u * 30); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, hex('#e8f0c8')); }
    { const a = t * 4.2, fx = Math.round(290 + Math.cos(a) * 9), fy = Math.round(124 + Math.sin(a * 1.7) * 5); R.pset(fx, fy, f_K); R.pset(fx + (Math.floor(t * 20) % 2 ? 1 : -1), fy - 1, hex('#c8d0e0')); }
    return { suelo: 178, pies: [[10, 90]], agente: [160, 141], cliente: [20, 178], hueco: [131, 51, 189, 135], mostrador: 136, timbre: [290, 140], folletos: [30, 134, 74, 146], tampon: [262, 132] };
  }
  R.copiar(f_capa(R, 'agencia', () => f_agenciaFijo(R, P)));
  // por el ventanal: la ciudad de noche, el rascacielos y un foco que barre, con la persiana a medio bajar
  R.recorte([252, 50, 298, 106]);
  f_deg(R, 252, 50, 298, 106, P.cielo, 1); for (let k = 0; k < 8; k++) R.pset(254 + Math.round(h(k, 1, 226) * 42), 52 + Math.round(h(k, 2, 226) * 20), hex('#c8c0e8'));
  { const a = -Math.PI / 2 + Math.sin(t * 0.4) * 0.6; for (let r = 0; r < 60; r++) for (let w = -r * 0.08; w <= r * 0.08; w++) { const x = Math.round(270 + Math.cos(a) * r - Math.sin(a) * w), y = Math.round(100 + Math.sin(a) * r + Math.cos(a) * w); if (f_b4(x, y) < 0.35) R.pset(x, y, f_mez(R.pget(x, y), hex('#c8b8d8'), 0.4)); } }
  R.poligono([[252, 106], [252, 82], [260, 82], [260, 74], [266, 74], [266, 86], [274, 86], [274, 64], [278, 58], [282, 64], [282, 84], [290, 84], [290, 78], [298, 78], [298, 106]], P.lejos);
  for (let k = 0; k < 14; k++) { const x = 254 + Math.round(h(k, 3, 226) * 42), y = 76 + Math.round(h(k, 4, 226) * 28); if (Math.sin(t * 0.5 + k) > -0.4) R.pset(x, y, P.vent); }
  { const u = (t % 7) / 7, x = Math.round(240 + u * 80); R.rect(x, 101, x + 14, 104, hex('#d8a83a')); R.rect(x + 1, 102, x + 13, 102, hex('#fff0b0')); R.pset(x + 15, 103, hex('#fff8d0')); }
  R.recorte(null);
  for (let j = 0; j < 9; j++) { const y = 51 + j * 3; R.rect(252, y, 298, y + 1, j & 1 ? hex('#e8dcc0') : hex('#d0c4a4')); R.rect(252, y + 2, 298, y + 2, hex('#a89878')); }
  R.rect(274, 50, 274, 106, hex('#8a6a28')); R.rect(252, 78, 298, 79, hex('#8a6a28'));
  R.linea(296, 50, 296, 84 + Math.round(Math.sin(t * 1.3) * 2), hex('#6a5a4a')); R.disco(296, 85 + Math.round(Math.sin(t * 1.3) * 2), 1, hex('#c8a040'));
  // las agujas del reloj de rayos
  { const a = t * 0.2 - 1, b = t * 0.02 + 2; R.linea(196, 48, 196 + Math.round(Math.cos(a) * 6), 48 + Math.round(Math.sin(a) * 6), f_K); R.linea(196, 48, 196 + Math.round(Math.cos(b) * 4), 48 + Math.round(Math.sin(b) * 4), hex('#a82a2a')); }
  // el oficinista del fondo, en la trastienda, que escribe a máquina (entre los casilleros y el archivador)
  { const tecla = Math.floor(t * 7) % 3; f_paseante(R, 140, 117, t, 5, 1, false); R.rect(144, 106, 156, 111, hex('#2a2a32')); R.rect(146, 102, 154, 106, hex('#f0ece0')); R.pset(145 + tecla * 4, 107, hex('#c8c8d0')); R.rect(136, 112, 160, 117, hex('#5a3a22')); }
  // el ventilador de techo que gira
  { const cx = 210, cy = 22; R.rect(cx, 10, cx, 18, hex('#3a2a1a')); for (let k = 0; k < 4; k++) { const a = t * 7 + k * Math.PI / 2, ex = Math.round(Math.cos(a) * 20), ey = Math.round(Math.sin(a) * 3); R.linea(cx, cy, cx + ex, cy + ey, hex('#5a3a22')); R.linea(cx, cy + 1, cx + ex, cy + ey + 1, hex('#3a2414')); }
    R.disco(cx, cy, 3, hex('#c8a040')); R.pset(cx - 1, cy - 1, hex('#f0d070')); R.rect(cx - 1, cy + 3, cx + 1, cy + 5, hex('#f8e8b0')); }
  // el polvo que flota en la luz del ventanal y las hojas de la palmera que mueve el ventilador
  for (let k = 0; k < 14; k++) { const u = (t * 0.05 + h(k, 1, 227)) % 1, x = Math.round(206 + h(k, 2, 227) * 80 + Math.sin(t * 0.7 + k) * 4), y = Math.round(150 - u * 90); if (Math.sin(t * 1.5 + k * 2) > -0.2) R.pset(x, y, hex('#fff4d0')); }
  for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + (k - 1) * 0.8 + Math.sin(t * 2.2 + k) * 0.08, L = 24; for (let i = 14; i < L; i++) { const x = Math.round(283 + Math.cos(a) * i), y = Math.round(132 + Math.sin(a) * i + (i / L) * (i / L) * 10); R.pset(x, y, hex('#3a9a4a')); R.pset(x + 1, y + 1, hex('#1e5a2a')); } }
  // las lámparas de pared con su halo
  for (const lx of [48, 226]) { R.halo(lx, 30, 9, [hex('#c8b890'), hex('#e8d8a8'), hex('#f8ecc8')], 1.2); }
  return { suelo: 164, pies: [[20, 100], [240, 300]], agente: [172, 121], mostrador: 116, ventanilla: [158, 60, 186, 117], cola: [22, 94], revistero: [240, 92, 262, 152], ventanal: [252, 50, 298, 106] };
}

function f_agenciaDelante(R, t, o, P, cam) {
  if (cam === 'ventanilla') { f_pegar(R, f_capa(R, 'ventanillaD', () => f_ventanillaDelanteFijo(R), true), 40, 150);
    // los reflejos del cristal, que resbalan despacio
    for (let y = 51; y < 131; y++) for (let x = 131; x <= 189; x++) { const r = ((x - y * 0.7 - t * 3) % 48 + 48) % 48; if ((r < 2 || (r > 6 && r < 8)) && f_b4(x, y) < 0.25) R.pset(x, y, f_mez(R.pget(x, y), hex('#f8f4e8'), 0.45)); } const b = (t % 3) < 0.15; if (b) R.pset(288, 137, hex('#ffffff')); return; }
  f_pegar(R, f_capa(R, 'agenciaD', () => f_agenciaDelanteFijo(R), true), 56, 122);
}

// cámara 'general': el muro de adobe pintado de naranja con su desconchado, una ventana con la calle, la repisa con
// velas y flores, el papel picado arriba y el calendario colgado de un clavo en el centro (x 124–196, y 40–126): cada hoja
// (o.hoja 0–3, con decimales mientras pasa) tiene su color, su número del año (1–4), un dibujo de altar distinto con sus
// velas encendidas y el número 2 del día; la hoja que pasa se levanta y se dobla hacia arriba. Suelo 168, personajes a los
// lados (x 40–110 y 210–270).
// cámara 'cerca': el calendario grande (x 92–228, y 22–168), la pared alrededor y una vela en la repisa de abajo.
function f_calendarioFijo(R, P, cerca) {
  const { rect, pset, linea } = R;
  const c = hex('#d8783a'), cL = hex('#e8905a'), cS = hex('#b8602e');
  rect(0, 0, 319, 179, c);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 230), m = Math.sin(x * 0.05 + Math.sin(y * 0.07) * 2) + Math.sin(y * 0.04 + x * 0.013);
    if (v < 0.06) pset(x, y, cS); else if (v > 0.96) pset(x, y, cL); else if (m > 1.3 && f_b4(x, y) < 0.3) pset(x, y, cL); else if (m < -1.4 && f_b4(x, y) < 0.3) pset(x, y, cS); }
  // los desconchados: el estuco caído deja ver los adobes con sus juntas
  for (const [dx, dy, dw, dh] of cerca ? [[18, 120, 40, 22], [262, 30, 34, 20]] : [[86, 96, 26, 16], [282, 60, 26, 18], [196, 26, 22, 12]]) {
    for (let y = dy; y < dy + dh; y++) for (let x = dx; x < dx + dw; x++) { const e = Math.hypot((x - dx - dw / 2) / (dw / 2), (y - dy - dh / 2) / (dh / 2)) + (h(x >> 1, y >> 1, 237) - 0.5) * 0.5; if (e > 1) continue;
      const fila = Math.floor((y - dy) / 6), junta = (y - dy) % 6 === 0 || ((x + fila * 7) % 14 === 0);
      pset(x, y, e > 0.88 ? hex('#f0d8b8') : junta ? hex('#8a5a3a') : h(x, y, 238) < 0.2 ? hex('#a87a52') : hex('#b88a5e')); } }
  // la cenefa pintada a mano: rombos y puntos de añil y rosa
  const cy0 = cerca ? 172 : 34, xF = cerca ? 320 : 270; for (let x = 0; x < xF; x++) { pset(x, cy0, hex('#2a4a8a')); pset(x, cy0 + 8, hex('#2a4a8a')); }
  if (!cerca) for (let x = 0; x < xF - 6; x += 10) { for (let k = 0; k < 4; k++) { pset(x + 5 - k, cy0 + 4 - k + 0, hex('#2a4a8a')); pset(x + 5 + k, cy0 + 4 - k, hex('#2a4a8a')); pset(x + 5 - k, cy0 + 4 + k, hex('#2a4a8a')); pset(x + 5 + k, cy0 + 4 + k, hex('#2a4a8a')); } pset(x + 5, cy0 + 4, hex('#e8488a')); pset(x, cy0 + 4, hex('#f0e0c0')); }
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) if (f_b4(x, y) < (22 - y) / 30) pset(x, y, cS);
  if (!cerca) {
    rect(0, 150, 319, 179, hex('#8a4a2a')); for (let y = 151; y < 180; y += 7) rect(0, y, 319, y, hex('#5a2a18')); for (let y = 151; y < 180; y += 7) for (let x = ((y / 7) & 1) * 10; x < 320; x += 20) rect(x, y, x, y + 6, hex('#5a2a18'));
    rect(0, 146, 319, 150, hex('#5a2a18')); rect(0, 146, 319, 146, cL);
    rect(18, 40, 70, 110, hex('#3a6a8a')); rect(20, 42, 68, 108, f_K); rect(21, 43, 67, 107, P.noche ? hex('#1a1c48') : hex('#8ab0e0'));
    R.poligono([[21, 90], [30, 76], [38, 84], [50, 70], [67, 82], [67, 107], [21, 107]], P.noche ? hex('#2a2448') : hex('#8a96c0'));
    for (let k = 0; k < 8; k++) pset(24 + k * 5, 94 + (k % 3) * 4, P.noche ? hex('#f0c870') : hex('#5a6a9a'));
    rect(43, 43, 45, 107, hex('#3a6a8a')); rect(21, 74, 67, 75, hex('#3a6a8a')); rect(14, 110, 74, 113, hex('#5a8aa8'));
    rect(214, 120, 300, 124, hex('#5a3418')); rect(214, 120, 300, 120, hex('#8a5a32')); for (const bx of [220, 294]) rect(bx, 124, bx + 2, 130, hex('#5a3418'));
    for (const [x, k] of [[236, 0], [252, 2]]) f_calaverita(R, x, 119, k);
    for (let j = 0; j < 8; j++) f_flor(R, 278 + Math.round(h(j, 1, 232) * 10), 106 + Math.round(h(j, 2, 232) * 8), j % 2 ? 1 : 2, j);
    rect(278, 112, 288, 119, hex('#b8582a')); rect(286, 113, 288, 119, hex('#8a3a1a'));
    // la ristra de chiles secos colgada de un clavo y la silla de palo con asiento de tule
    linea(96, 44, 96, 92, hex('#8a6a3a')); pset(96, 43, hex('#5a5a62'));
    for (let j = 0; j < 16; j++) for (const sd of [-1, 1]) { const yy = 48 + j * 3, xx = 96 + sd * (2 + (j % 2)); rect(Math.min(xx, xx + sd * 3), yy, Math.max(xx, xx + sd * 3), yy + 1, j % 3 ? hex('#a81e1e') : hex('#7a1414')); pset(xx + sd * 3, yy - 1, hex('#3a6a2a')); pset(xx + sd, yy, hex('#e85a4a')); }
    rect(176, 128, 178, 166, hex('#6a4224')); rect(198, 128, 200, 166, hex('#6a4224')); for (let y = 132; y < 146; y += 4) rect(178, y, 198, y + 1, hex('#8a5a32'));
    rect(174, 146, 202, 150, hex('#c8a85a')); for (let x = 175; x < 202; x += 2) pset(x, 147 + (x % 4 ? 0 : 1), hex('#a8884a')); rect(174, 150, 176, 166, hex('#6a4224')); rect(200, 150, 202, 166, hex('#6a4224')); rect(176, 158, 200, 159, hex('#5a3418'));
    for (let j = 0; j < 20; j++) { const w = Math.round(9 * Math.sin((j + 3) / 25 * Math.PI)); rect(250 - w, 148 + j, 250 + w, 148 + j, j < 2 ? hex('#c86a3a') : hex('#a8502a')); rect(250 + w - 2, 148 + j, 250 + w, 148 + j, hex('#7a3418')); }
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.35; for (let i = 0; i < 16; i++) pset(Math.round(250 + Math.cos(a) * i), Math.round(148 + Math.sin(a) * i + (i * i) * 0.03), i % 3 ? hex('#3a8a3a') : hex('#2a6a2a')); }
  } else {
    rect(0, 168, 319, 179, hex('#5a3418')); rect(0, 168, 319, 168, hex('#8a5a32')); for (let x = 0; x < 320; x += 3) if (h(x, 1, 233) < 0.4) rect(x, 170, x + 2, 170, hex('#4a2a10'));
    for (const [x, k] of [[40, 1], [272, 3]]) f_calaverita(R, x, 167, k);
    // a la izquierda, la foto antigua enmarcada (el tren dorado en el andén, en sepia) y una tira de flores colgada
    rect(22, 52, 66, 94, hex('#5a3418')); rect(24, 54, 64, 92, hex('#c8a040')); rect(26, 56, 62, 90, hex('#d8c098'));
    for (let y = 57; y < 90; y++) for (let x = 27; x < 62; x++) if (h(x, y, 239) < 0.12) pset(x, y, hex('#c0a880'));
    rect(27, 80, 61, 89, hex('#a88a62')); rect(30, 72, 56, 79, hex('#7a5a3a')); rect(30, 72, 56, 72, hex('#a8845a')); for (let i = 0; i < 4; i++) rect(33 + i * 6, 74, 35 + i * 6, 76, hex('#e8d8b0')); R.poligono([[56, 72], [61, 76], [56, 79]], hex('#7a5a3a'));
    for (let i = 0; i < 3; i++) R.disco(36 + i * 10, 68 - i, 2, hex('#b8a080')); linea(44, 46, 26, 54, hex('#3a2a1a')); linea(44, 46, 62, 54, hex('#3a2a1a')); R.disco(44, 46, 1.5, hex('#5a5a62'));
    for (let j = 0; j < 12; j++) f_flor(R, 78 + (j % 2), 40 + j * 7, j % 3 ? 2 : 1, j); linea(78, 34, 78, 120, hex('#3a6a2a'));
    // a la derecha, el corazón de hojalata calada con su marco de estrellas y el espejito redondo
    for (let j = -16; j <= 16; j++) for (let i = -18; i <= 18; i++) { const X = i / 18, Y = -j / 16 + 0.25; if ((X * X + Y * Y - 1) ** 3 - X * X * Y * Y * Y >= 0) continue; const borde = Math.abs(i) > 15 || j > 12; pset(270 + i, 64 + j, borde ? hex('#8a8a96') : ((i + j) & 3) === 0 ? hex('#5a5a66') : hex('#c8c8d4')); }
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; pset(270 + Math.round(Math.cos(a) * 24), 64 + Math.round(Math.sin(a) * 22), hex('#e8c840')); }
    R.disco(270, 64, 4, hex('#e8488a')); R.disco(269, 63, 2, hex('#ff8ab8'));
    R.disco(262, 118, 10, hex('#8a6a3a')); R.disco(262, 118, 8, hex('#a8c0d0')); linea(257, 113, 262, 112, hex('#e8f4ff')); linea(256, 116, 260, 112, hex('#e8f4ff'));
    for (let j = 0; j < 10; j++) f_flor(R, 290 + Math.round(h(j, 1, 234) * 20), 152 + Math.round(h(j, 2, 234) * 10), 2, j);
  }
}

// una hoja del calendario en el rectángulo (x0, y0)–(x1, y1), a escala s: la banda de color con el número del año (1–4)
// y una calavera; el dibujo del altar de ese año (arco de cempasúchil, gradas, velas que tiemblan, la ofrenda distinta en
// cada hoja: flores, calavera, retrato, pan) con su papel picado; y la cuadrícula del mes con el día 2 marcado con una flor
function f_hoja(R, t, x0, y0, x1, y1, n, s) {
  const { rect, pset } = R, COL = [['#e8488a', '#b8286a', '#ff8ab8'], ['#3a9ae8', '#2058b0', '#8ac0ff'], ['#8a4ac8', '#5e2a98', '#c08af0'], ['#3ab86a', '#1e8848', '#8ae8a8']][n % 4].map(hex);
  rect(x0, y0, x1, y1, f_K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#f6efe0'));
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) if (h(x, y, 235) < 0.04) pset(x, y, hex('#e8dcc8'));
  const W = x1 - x0, H = y1 - y0, bh = Math.round(H * 0.2);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + bh, COL[0]); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1 + s, COL[2]); rect(x0 + 1, y0 + bh - s, x1 - 1, y0 + bh, COL[1]);
  for (let x = x0 + 2; x < x1 - 1; x += 3 * s) rect(x, y0 + bh + 1, x + s, y0 + bh + s, COL[0]);
  R.numero(String(n + 1), x0 + 4 * s, y0 + bh - 3 * s, { color: hex('#fff4e0'), sombra: false, tam: s > 1 ? 16 : 8 });
  R.icono('calavera', x1 - 10 * s, y0 + Math.round(bh / 2) - 3 * s, hex('#fff4e0'), COL[1], s);
  // el dibujo: fondo de noche, papel picado chiquito, arco de flores, gradas, velas y la ofrenda del año
  const ix0 = x0 + 4 * s, ix1 = x1 - 4 * s, iy0 = y0 + bh + 4 * s, iy1 = y0 + Math.round(H * 0.66), cx = (ix0 + ix1) >> 1;
  rect(ix0 - 1, iy0 - 1, ix1 + 1, iy1 + 1, COL[1]); f_deg(R, ix0, iy0, ix1, iy1, [hex('#1a1c48'), hex('#2a2458'), hex('#4a2a5a')]);
  for (let k = 0; k < 6 * s; k++) pset(ix0 + Math.round(h(k, n, 236) * (ix1 - ix0)), iy0 + Math.round(h(k, 2, 236) * (iy1 - iy0) * 0.35), hex('#c8c0e8'));
  for (let x = ix0; x <= ix1; x++) { const c = [hex('#e8488a'), hex('#f0a020'), hex('#3ab86a'), hex('#3a9ae8')][Math.floor((x - ix0) / (3 * s)) % 4]; for (let j = 0; j < 2 * s; j++) if (!((x + j) % (3 * s) === 0 && j > 0)) pset(x, iy0 + j, c); }
  const base = iy1 - s, w = Math.round((ix1 - ix0) * 0.42);
  rect(cx - w, base - 4 * s, cx + w, base, COL[1]); rect(cx - w, base - 4 * s, cx + w, base - 4 * s, COL[2]);
  rect(cx - w + 3 * s, base - 8 * s, cx + w - 3 * s, base - 4 * s, COL[0]); rect(cx - w + 6 * s, base - 12 * s, cx + w - 6 * s, base - 8 * s, hex('#f0e8d4'));
  const ah = iy1 - iy0 - 6 * s;
  for (let a = 0; a <= 30; a++) { const u = a / 30, ax = Math.round(cx - w - s + u * (2 * w + 2 * s)), ay = Math.round(base - 4 * s - Math.sin(u * Math.PI) * (ah - 4 * s)); f_flor(R, ax, ay, s > 1 ? 2 : 1, a); }
  for (let i = 0; i < 6; i++) { const vx = cx - w + s + Math.round(i * (2 * w - 2 * s) / 5), vy = i % 5 === 0 ? base - 4 * s : base - 8 * s, al = (2 + (i % 2)) * s;
    rect(vx, vy - al, vx + s - 1, vy - 1, hex('#f2e6c8')); const fl = Math.sin(t * 9 + i * 2 + n) > 0; rect(vx, vy - al - s - (fl ? 1 : 0), vx + s - 1, vy - al - 1, hex('#ffcc48')); if (s > 1) pset(vx, vy - al - s - 2 - (fl ? 1 : 0), hex('#fff4c0')); }
  const top = base - 12 * s;
  if (n === 0) for (let i = -1; i <= 1; i++) f_flor(R, cx + i * 4 * s, top - 2 * s, s > 1 ? 2 : 1, i);
  if (n === 1) { f_calaverita(R, cx, top - 1, 1); if (s > 1) { f_calaverita(R, cx - 10, top - 1, 3); f_calaverita(R, cx + 10, top - 1, 4); } }
  if (n === 2) { rect(cx - 3 * s, top - 7 * s, cx + 3 * s, top - 1, hex('#c8a84a')); rect(cx - 2 * s, top - 6 * s, cx + 2 * s, top - 2 * s, hex('#4a3a5a')); R.disco(cx, top - 5 * s, s, hex('#e8c8a0')); }
  if (n === 3) { R.disco(cx, top - 3 * s, 3 * s, hex('#c88a3a')); R.disco(cx - s, top - 4 * s, 2 * s, hex('#e0a850')); R.linea(cx - 2 * s, top - 4 * s, cx + 2 * s, top - 4 * s, hex('#a8682a')); }
  // la cuadrícula del mes (7 × 4) con el día 2 marcado
  const gy0 = iy1 + 4 * s, gy1 = y1 - 3 * s, cw = (ix1 - ix0) / 7, ch = (gy1 - gy0) / 4;
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const a = Math.round(ix0 + i * cw), b = Math.round(gy0 + j * ch), c = Math.round(ix0 + (i + 1) * cw) - 1, d = Math.round(gy0 + (j + 1) * ch) - 1;
    rect(a, b, c, d, (i === 6 ? hex('#f0d8d8') : hex('#ece2cc'))); rect(a, b, c, b, hex('#c8bca8')); rect(a, b, a, d, hex('#c8bca8'));
    const dia = j * 7 + i - 3; if (dia < 1) continue; pset(a + s + 1, b + s + 1, hex('#8a7a6a')); if (dia > 9 && s > 1) pset(a + s + 3, b + s + 1, hex('#8a7a6a'));
    if (dia === 2) { f_flor(R, Math.round((a + c) / 2), Math.round((b + d) / 2), s > 1 ? 3 : 1, n); } }
  if (s > 1) R.numero('2', ix1 - 2, gy0 - 5, { color: COL[1], sombra: false });
}

function f_calendario(R, t, o, P, cam) {
  const cerca = cam === 'cerca', [x0, y0, x1, y1, s] = cerca ? [92, 26, 228, 166, 2] : [124, 46, 196, 126, 1];
  R.copiar(f_capa(R, 'calendario' + (cerca ? 'c' : 'g') + (P.noche ? 'n' : 'd'), () => f_calendarioFijo(R, P, cerca)));
  if (!cerca) { f_picado(R, 0, 18, 270, 22, t, 0, 12, 6, 0.6); for (const [x, a] of [[226, 6], [246, 4], [264, 7]]) f_vela(R, x, 119, a, t, x); f_humo(R, 264, 110, t, 0.5, hex('#e8d8c8'), 16); }
  else { f_vela(R, 160, 167, 10, t, 3); f_vela(R, 60, 167, 6, t, 1); f_vela(R, 252, 167, 7, t, 2); }
  // la sombra del calendario, el clavo, el cordel y la hoja de abajo (la siguiente) con la de encima pasando
  for (let y = y0 + 3; y <= y1 + 3; y++) for (let x = x0 + 3; x <= x1 + 3; x++) if (f_b4(x, y) < 0.5) R.pset(x, y, f_mez(R.pget(x, y), f_K, 0.35));
  const cx = (x0 + x1) >> 1; R.linea(cx, y0 - 10 * s, x0 + 8, y0, hex('#3a2a1a')); R.linea(cx, y0 - 10 * s, x1 - 8, y0, hex('#3a2a1a')); R.disco(cx, y0 - 10 * s, s + 1, hex('#5a5a62'));
  const hj = Math.max(0, Math.min(3, o.hoja ?? 0)), n = Math.floor(hj), f = hj - n;
  const siguiente = Math.min(3, n + 1);
  for (let q = 3; q > 0; q--) R.rect(x0 + q, y1 + q - 1, x1 - q, y1 + q - 1, q & 1 ? hex('#e8dcc8') : hex('#c8bca8'));
  if (f > 0 && n < 3) {
    f_hoja(R, t, x0, y0, x1, y1, siguiente, s);
    // la hoja que pasa: se acorta hacia arriba (se pinta aparte y se copia solo su trozo) y luego enseña el revés
    const alto = Math.round((y1 - y0) * (1 - f * 2));
    if (alto > 2) { const b = f_capa(R, 'hojaTmp', () => {}, true), d = R.buf; for (let i = y0 * 320; i <= y1 * 320 + 319; i++) b[i] = f_VACIO;
      const prev = R.usar(b); f_hoja(R, t, x0, y0, x1, y1, n, s); R.usar(prev);
      for (let y = y0; y <= y0 + alto; y++) for (let x = x0; x <= x1; x++) { const c = b[y * 320 + x]; if (c !== f_VACIO) d[y * 320 + x] = c; }
      for (let x = x0; x <= x1; x++) { R.pset(x, y0 + alto + 1, f_K); R.pset(x, y0 + alto + 2, hex('#e8dcc8')); if (f_b4(x, y0 + alto + 3) < 0.5) R.pset(x, y0 + alto + 3, f_mez(R.pget(x, y0 + alto + 3), f_K, 0.4)); } }
    else if (alto < -2) { const a = Math.min(5 * s, Math.round(-alto * 0.45)); for (let y = y0 - a; y <= y0; y++) { const u = (y - (y0 - a)) / Math.max(1, a); R.rect(x0 + 1, y, x1 - 1, y, f_mez(hex('#b8ac98'), hex('#e8dcc8'), u)); } R.rect(x0, y0 - a - 1, x1, y0 - a - 1, f_K); R.rect(x0, y0 - a, x0, y0, f_K); R.rect(x1, y0 - a, x1, y0, f_K); for (let x = x0 + 6; x < x1 - 4; x += 9) R.pset(x, y0 - Math.round(a / 2), hex('#a89a88')); }
  } else f_hoja(R, t, x0, y0, x1, y1, n, s);
  R.rect(x0 - 2, y0 - 2, x1 + 2, y0 + 2 * s, hex('#5a3418')); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, hex('#8a5a32')); for (let x = x0 + 4; x < x1; x += 6 * s) R.pset(x, y0 + s, hex('#c8a040'));
  return cerca ? { suelo: 178, pies: [[10, 80], [240, 300]], calendario: [x0, y0, x1, y1], hoja: n } : { suelo: 168, pies: [[30, 110], [204, 276]], calendario: [x0, y0, x1, y1], repisa: [214, 120, 300, 124], ventana: [21, 43, 67, 107], hoja: n };
}

// cámara 'general': el taller de noche: la pared de ladrillo con hollín, las vigas, la persiana metálica medio subida
// con la calle de fiesta detrás (papel picado, una ventana encendida, una farola, esqueletos que pasan), el tablero de
// herramientas con sus siluetas pintadas, el banco con el tornillo, la aceitera, la radio con el dial que brilla y la taza
// que humea; el bidón rojo, la pila de neumáticos, la placa esmaltada con la gota de aceite, la bombilla con tulipa que se
// balancea y su cono de luz; el coche antiguo (guardabarros redondos, rejilla de cascada cromada, ruedas de banda
// blanca) con el capó levantado y vapor que sale del radiador; el suelo de cemento con juntas, manchas de aceite, un
// sumidero y un gato hidráulico. El coche mira a la izquierda; el demonio se pone delante del morro (x 120–168, pies en
// y 156) y mete las manos en el motor (x 176–226, y 116–128). Suelo 156.
// cámara 'capo': el motor de cerca: la tapa del capó levantada con su acolchado y la varilla, el radiador con el tapón y
// el vapor, el ventilador y la correa que giran, el filtro de aire cromado, la tapa de balancines con aletas, el
// distribuidor con los cables, la batería y los manguitos; detrás, la pared y la bombilla; delante, el morro del coche
// (aletas, faro, moldura) que pinta muertosDelante. El demonio se asoma por detrás del motor (pies en y 150, tapados
// por el morro desde y 128); los demás, delante del coche con los pies en y 178.
const f_COCHE = { c: hex('#2a6a72'), cL: hex('#4a9aa0'), cS: hex('#1a4650'), cD: hex('#12323a'), cr: hex('#d8dce8'), crS: hex('#8a90a8') };

function f_ladrillo(R, x0, y0, x1, y1, k = 0) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, hex('#3a2420'));
  for (let y = y0; y <= y1; y += 5) for (let x = x0 - ((y / 5) & 1) * 6; x <= x1; x += 12) { const v = h(x, y, 240 + k), c = v < 0.3 ? hex('#6a3428') : v < 0.7 ? hex('#7a3e2e') : hex('#8a4a34');
    for (let j = 0; j < 4; j++) for (let i = 0; i < 11; i++) { const X = x + i, Y = y + j; if (X < x0 || X > x1 || Y > y1) continue; const n = h(X, Y, 242 + k); pset(X, Y, j === 0 && n > 0.4 ? f_mez(c, hex('#c87a5a'), 0.25) : n < 0.12 ? f_mez(c, hex('#2a1a18'), 0.4) : c); } }
}

function f_tallerFijo(R, P) {
  const { rect, pset, disco, linea, poligono } = R, C_ = f_COCHE;
  f_ladrillo(R, 0, 0, 319, 150);
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) if (f_b4(x, y) < (60 - y) / 90) pset(x, y, f_mez(R.pget(x, y), hex('#140c10'), 0.45));
  for (let k = 0; k < 6; k++) { const x = 20 + k * 54; rect(x, 0, x + 6, 6, hex('#3a2a1e')); rect(x, 6, x + 6, 7, hex('#24180f')); } rect(0, 0, 319, 3, hex('#2a1e16'));
  // la persiana subida a medias y, debajo, el hueco a la calle (lo vivo se pinta luego)
  rect(4, 26, 80, 152, hex('#5a5a62')); rect(6, 28, 78, 150, f_K);
  for (let y = 28; y < 52; y += 3) { rect(6, y, 78, y + 1, hex('#8a8a96')); rect(6, y + 2, 78, y + 2, hex('#5a5a66')); } rect(6, 52, 78, 54, hex('#4a4a52')); rect(38, 54, 46, 56, hex('#6a6a72'));
  // el tablero de herramientas y sus siluetas pintadas
  rect(88, 44, 154, 92, hex('#8a6a3a')); rect(89, 45, 153, 91, hex('#c8a46a')); for (let y = 48; y < 90; y += 4) for (let x = 92; x < 152; x += 4) pset(x, y, hex('#8a6a3a'));
  const herr = [[94, 50, 'llave'], [102, 50, 'llave'], [110, 50, 'martillo'], [124, 50, 'sierra'], [96, 72, 'alicate'], [108, 72, 'destornillador'], [116, 72, 'destornillador'], [126, 70, 'llave'], [140, 70, 'martillo']];
  for (const [x, y, q] of herr) { const s = hex('#6a4a2a'), m = hex('#9aa4b4'), mL = hex('#d8dce8'), mango = hex('#c83a3a');
    if (q === 'llave') { rect(x + 1, y + 3, x + 2, y + 16, s); rect(x + 1, y + 2, x + 2, y + 15, m); rect(x, y, x + 3, y + 2, m); pset(x + 1, y, s); pset(x + 2, y, s); rect(x, y + 16, x + 3, y + 18, m); pset(x + 1, y + 16, mL); }
    if (q === 'martillo') { rect(x + 2, y + 3, x + 3, y + 18, hex('#8a5a2a')); rect(x, y, x + 6, y + 3, m); rect(x, y, x + 6, y, mL); }
    if (q === 'sierra') { poligono([[x, y + 2], [x + 18, y + 2], [x + 18, y + 8], [x, y + 12]], m); for (let i = 0; i < 18; i += 2) pset(x + i, y + 12 - Math.round(i / 18 * 4), s); rect(x + 18, y, x + 24, y + 9, hex('#8a5a2a')); rect(x + 20, y + 3, x + 22, y + 6, hex('#c8a46a')); }
    if (q === 'alicate') { linea(x, y, x + 4, y + 8, m); linea(x + 6, y, x + 2, y + 8, m); linea(x + 2, y + 8, x + 1, y + 16, mango); linea(x + 4, y + 8, x + 5, y + 16, mango); }
    if (q === 'destornillador') { rect(x + 1, y, x + 1, y + 9, m); rect(x, y + 10, x + 2, y + 17, mango); pset(x, y + 11, hex('#f07a7a')); } }
  // el banco de trabajo: el tablero gastado, el tornillo, la aceitera, la radio, la taza, cajones y el bidón rojo
  rect(84, 104, 158, 108, hex('#6a4224')); rect(84, 104, 158, 104, hex('#9a6a3a')); for (let x = 86; x < 158; x += 7) pset(x, 106, hex('#4a2a14'));
  rect(88, 109, 90, 156, hex('#4a2a14')); rect(152, 109, 154, 156, hex('#4a2a14')); rect(88, 140, 154, 142, hex('#4a2a14'));
  rect(118, 110, 150, 124, hex('#5a3418')); for (let j = 0; j < 2; j++) { rect(120, 111 + j * 7, 148, 116 + j * 7, hex('#7a4a28')); rect(132, 113 + j * 7, 136, 113 + j * 7, hex('#c8a040')); }
  rect(90, 96, 100, 103, hex('#4a5a6a')); rect(92, 93, 98, 96, hex('#6a7a8a')); rect(100, 98, 104, 99, hex('#4a5a6a')); rect(94, 100, 96, 103, hex('#2a3a4a'));
  poligono([[106, 103], [112, 103], [111, 97], [107, 97]], hex('#c8a040')); linea(109, 97, 114, 90, hex('#c8a040')); pset(107, 98, hex('#f0d070'));
  rect(120, 92, 136, 103, hex('#5a3418')); rect(121, 93, 135, 102, hex('#8a5a32')); for (let x = 122; x < 128; x += 2) rect(x, 94, x, 101, hex('#5a3418')); rect(129, 95, 134, 98, hex('#2a1e14')); disco(131, 100, 1, hex('#c8a040'));
  rect(142, 97, 147, 103, hex('#e8e0d0')); rect(147, 99, 148, 101, hex('#e8e0d0')); rect(143, 97, 146, 97, hex('#4a2a14'));
  rect(94, 128, 106, 140, hex('#a82a2a')); rect(94, 128, 106, 129, hex('#d84a4a')); rect(98, 125, 102, 127, hex('#6a6a72')); rect(104, 130, 106, 140, hex('#7a1a1a'));
  // la placa esmaltada con la gota de aceite (pictograma) y el reloj de fichar
  rect(238, 26, 270, 52, hex('#1e3a6a')); rect(239, 27, 269, 51, hex('#e8e0c8')); rect(241, 29, 267, 49, hex('#2a5aa8'));
  for (let j = 0; j < 14; j++) { const w = j < 5 ? Math.round(j * 0.8) : Math.round(Math.sqrt(Math.max(0, 36 - (j - 8) ** 2))); rect(254 - w, 32 + j, 254 + w, 32 + j, hex('#f0c840')); } pset(252, 40, hex('#fff8c0')); pset(252, 41, hex('#fff8c0'));
  for (const [x, y] of [[239, 27], [269, 27], [239, 51], [269, 51]]) pset(x, y, hex('#8a8a96'));
  // la pila de neumáticos
  for (let k = 0; k < 5; k++) { const y = 152 - k * 9; rect(290, y - 8, 318, y, f_K); rect(291, y - 7, 317, y - 1, hex('#2a2a32')); for (let x = 292; x < 317; x += 3) pset(x, y - 4, hex('#3e3e48')); rect(291, y - 7, 317, y - 7, hex('#4a4a56')); rect(298, y - 6, 310, y - 2, hex('#1a1a22')); }
  // el suelo de cemento: juntas, manchas de aceite, el sumidero, las rayas de luz y el gato hidráulico
  rect(0, 151, 319, 179, hex('#6a6670')); for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 243); if (v < 0.07) pset(x, y, hex('#56525c')); else if (v > 0.95) pset(x, y, hex('#7e7a84')); }
  rect(0, 150, 319, 151, hex('#3a3640')); for (let x = 0; x < 320; x += 64) linea(x, 152, x - 20, 179, hex('#4e4a56')); rect(0, 166, 319, 166, hex('#4e4a56'));
  for (const [cx, cy, rx, ry] of [[226, 160, 18, 3], [60, 170, 10, 2], [140, 175, 7, 2]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 < 1 + h(i, j, 244) * 0.3) pset(cx + i, cy + j, (i + j) % 5 === 0 ? hex('#5a5a72') : hex('#3a363e'));
  rect(176, 168, 194, 172, hex('#3a3640')); for (let x = 177; x < 194; x += 2) rect(x, 169, x, 171, hex('#1e1c22'));
  rect(60, 150, 76, 156, hex('#a82a2a')); rect(60, 150, 76, 150, hex('#d84a4a')); rect(62, 145, 74, 149, hex('#7a1a1a')); for (const wx of [62, 74]) disco(wx, 157, 1.5, f_K);
  rect(12, 154, 46, 160, hex('#2a2a32')); rect(12, 154, 46, 154, hex('#5a5a66')); for (const wx of [16, 42]) disco(wx, 161, 1.5, f_K);
  // el coche (mira a la izquierda): la carrocería redonda, la cabina, el maletero, las ruedas, los cromados
  const c0 = 170;
  for (let x = c0; x <= 304; x++) { const u = (x - c0) / 134;
    const top = u < 0.06 ? 132 - Math.round(Math.sqrt(u / 0.06) * 10) : u < 0.42 ? 122 : u < 0.5 ? 122 - Math.round((u - 0.42) / 0.08 * 18) : u < 0.78 ? 104 - Math.round(Math.sin((u - 0.5) / 0.28 * Math.PI) * 4) : u < 0.86 ? 104 + Math.round((u - 0.78) / 0.08 * 16) : 120 + Math.round(((u - 0.86) / 0.14) ** 2 * 18);
    for (let y = top; y <= 150; y++) { const f = (y - top) / Math.max(1, 150 - top); pset(x, y, y === top ? C_.cL : f < 0.12 ? C_.cL : f > 0.8 ? C_.cS : C_.c); } }
  // las ventanillas, el parabrisas y el reflejo; la moldura cromada y el tirador
  poligono([[236, 108], [262, 108], [266, 122], [232, 122]], hex('#3a4a5a')); poligono([[270, 108], [278, 108], [286, 122], [270, 122]], hex('#3a4a5a'));
  linea(240, 110, 236, 120, hex('#8aa8c0')); linea(244, 110, 240, 120, hex('#6a88a0')); rect(266, 108, 268, 122, C_.c);
  linea(226, 122, 234, 104, hex('#6a88a0')); linea(227, 122, 235, 104, hex('#3a4a5a'));
  rect(176, 132, 302, 133, C_.cr); rect(176, 134, 302, 134, C_.crS); rect(252, 126, 256, 127, C_.cr);
  // los guardabarros delantero y trasero, abultados, y las ruedas de banda blanca
  for (const [wx, w] of [[192, 18], [278, 18]]) { for (let j = 0; j < 14; j++) { const ww = Math.round(Math.sqrt(Math.max(0, 1 - ((j - 14) / 14) ** 2)) * w); rect(wx - ww, 128 + j, wx + ww, 128 + j, j < 2 ? C_.cL : C_.c); }
    for (let j = 0; j < 4; j++) rect(wx - w + j, 142 + j, wx + w - j, 142 + j, C_.cS);
    disco(wx, 148, 10, f_K); disco(wx, 148, 9, hex('#1e1e26')); disco(wx, 148, 6, hex('#f0ece0')); disco(wx, 148, 4, C_.crS); disco(wx, 148, 3, C_.cr); pset(wx - 1, 147, hex('#ffffff')); }
  // la rejilla de cascada y el parachoques cromado, el faro redondo
  for (let x = 166; x < 176; x++) for (let y = 128; y < 146; y++) pset(x, y, x % 2 ? C_.cr : C_.crS); rect(162, 144, 184, 147, C_.cr); rect(162, 147, 184, 147, C_.crS);
  disco(180, 126, 4, C_.cr); disco(180, 126, 3, hex('#fff8d8')); pset(179, 125, hex('#ffffff'));
  // el capó levantado (articulado junto al parabrisas) con su varilla y el hueco del motor con sus piezas asomando
  rect(176, 118, 226, 123, f_K); for (let x = 178; x < 226; x += 6) rect(x, 116, x + 3, 119, hex('#5a5a62'));
  disco(196, 114, 5, C_.crS); disco(196, 113, 5, C_.cr); rect(191, 113, 201, 113, hex('#ffffff')); rect(206, 115, 222, 118, hex('#c83a3a')); for (let x = 207; x < 222; x += 2) pset(x, 115, hex('#e86a6a'));
  poligono([[176, 120], [228, 120], [210, 76], [172, 88]], C_.c); poligono([[178, 119], [224, 119], [208, 80], [175, 90]], C_.cS);
  for (let y = 86; y < 118; y += 3) for (let x = 176; x < 226; x += 3) if (R.pget(x, y) === C_.cS) pset(x, y, C_.cD);
  linea(172, 88, 210, 76, C_.cL); linea(184, 120, 182, 92, hex('#9aa4b4'));
}

// lo del taller que va delante del demonio y de quien se acerque al morro (el guardabarros y la rejilla)
function f_tallerDelanteFijo(R) {
  const { rect, pset, disco } = R, C_ = f_COCHE, wx = 192, w = 18;
  for (let j = 0; j < 14; j++) { const ww = Math.round(Math.sqrt(Math.max(0, 1 - ((j - 14) / 14) ** 2)) * w); rect(wx - ww, 128 + j, wx + ww, 128 + j, j < 2 ? C_.cL : C_.c); }
  for (let j = 0; j < 4; j++) rect(wx - w + j, 142 + j, wx + w - j, 142 + j, C_.cS);
  disco(wx, 148, 10, f_K); disco(wx, 148, 9, hex('#1e1e26')); disco(wx, 148, 6, hex('#f0ece0')); disco(wx, 148, 4, C_.crS); disco(wx, 148, 3, C_.cr); pset(wx - 1, 147, hex('#ffffff'));
  disco(180, 126, 4, C_.cr); disco(180, 126, 3, hex('#fff8d8')); pset(179, 125, hex('#ffffff'));
}

function f_capoFijo(R, P) {
  const { rect, pset, disco, linea, poligono } = R, C_ = f_COCHE;
  f_ladrillo(R, 0, 0, 319, 179, 3);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 190, (y - 10) * 1.3) / 200; if (f_b4(x, y) < d * 0.9) pset(x, y, f_mez(R.pget(x, y), hex('#140c10'), 0.4)); }
  // el tablero de herramientas al fondo, borroso por la distancia
  rect(16, 18, 80, 60, hex('#8a6a3a')); rect(17, 19, 79, 59, hex('#a88a5a')); for (let y = 21; y < 58; y += 4) for (let x = 19; x < 79; x += 4) pset(x, y, hex('#8a6a3a'));
  for (let k = 0; k < 7; k++) { rect(22 + k * 8, 24, 23 + k * 8, 40 + (k % 3) * 4, hex('#9aa4b4')); rect(21 + k * 8, 22, 24 + k * 8, 24, hex('#9aa4b4')); rect(22 + k * 8, 46, 23 + k * 8, 54, hex('#c83a3a')); }
  // la balda con latas de aceite y grasa, y la placa esmaltada con la gota
  rect(196, 34, 268, 36, hex('#6a4224')); rect(196, 34, 268, 34, hex('#9a6a3a')); for (const bx of [200, 264]) rect(bx, 37, bx + 1, 42, hex('#4a2a14'));
  for (let k = 0; k < 7; k++) { const bx = 200 + k * 9, al = 8 + (k % 3) * 3, col = [hex('#c83a3a'), hex('#e8b840'), hex('#3a6ac8'), hex('#3a9a5a')][k % 4]; rect(bx, 34 - al, bx + 6, 33, col); rect(bx, 34 - al, bx + 6, 34 - al, f_mez(col, hex('#ffffff'), 0.4)); rect(bx + 5, 35 - al, bx + 6, 33, f_mez(col, f_K, 0.4)); rect(bx + 1, 34 - al + 3, bx + 4, 34 - al + 5, hex('#f0e8d0')); }
  rect(112, 16, 150, 40, hex('#1e3a6a')); rect(113, 17, 149, 39, hex('#e8e0c8')); rect(115, 19, 147, 37, hex('#c83a3a'));
  for (let j = 0; j < 14; j++) { const w = j < 5 ? Math.round(j * 0.8) : Math.round(Math.sqrt(Math.max(0, 36 - (j - 8) ** 2))); rect(131 - w, 21 + j, 131 + w, 21 + j, hex('#f0c840')); }
  // la tapa del capó levantada: el acolchado gris en rombos, el marco del color del coche y la varilla
  poligono([[34, 96], [286, 96], [252, 46], [68, 46]], C_.cS); poligono([[42, 92], [278, 92], [248, 52], [72, 52]], hex('#6a6a70'));
  for (let y = 52; y < 92; y++) for (let x = 44; x < 278; x++) { if (R.pget(x, y) !== hex('#6a6a70')) continue; const a = ((x + y) % 12 + 12) % 12, b = ((x - y) % 12 + 12) % 12; if (a === 0 || b === 0) pset(x, y, hex('#4e4e56')); else if (a < 3 && b < 3) pset(x, y, hex('#86868e')); }
  linea(68, 46, 252, 46, C_.cL); linea(68, 47, 252, 47, C_.c); linea(34, 96, 68, 46, C_.c); linea(286, 96, 252, 46, C_.cD);
  linea(262, 98, 244, 60, hex('#9aa4b4')); linea(263, 98, 245, 60, hex('#5a6270'));
  // el hueco del motor, en sombra
  rect(28, 96, 292, 134, hex('#1a1a20')); for (let y = 96; y < 134; y++) for (let x = 28; x < 292; x++) if (h(x, y, 245) < 0.08) pset(x, y, hex('#2a2a32'));
  // el radiador (izquierda) con sus aletas y el tapón
  rect(32, 98, 62, 134, hex('#3a3a42')); for (let x = 34; x < 61; x += 2) rect(x, 100, x, 132, hex('#56565e')); rect(32, 98, 62, 99, hex('#6a6a72')); disco(47, 96, 3, hex('#c8c8d0')); disco(47, 95, 2, hex('#e8e8f0'));
  // el bloque: la tapa de balancines larga, con aletas, el colector y las bujías con sus cables
  rect(96, 108, 236, 132, hex('#3a4a3e')); rect(96, 108, 236, 109, hex('#5a6a5e'));
  rect(100, 100, 232, 110, hex('#2a6a5a')); for (let x = 104; x < 230; x += 5) { rect(x, 101, x + 2, 108, hex('#3a8a76')); pset(x, 101, hex('#6ac0a8')); } rect(100, 110, 232, 110, hex('#1a4a3e'));
  for (let k = 0; k < 8; k++) { const bx = 108 + k * 16; rect(bx, 112, bx + 2, 116, hex('#e8e0d0')); linea(bx + 1, 112, 150 + k * 2, 90, hex('#2a2a2a')); }
  for (let k = 0; k < 8; k++) rect(102 + k * 16, 118, 112 + k * 16, 126, hex('#5a4a40')); rect(98, 124, 234, 127, hex('#6a5a4e'));
  // el distribuidor, la batería con sus bornes y los manguitos
  rect(146, 86, 156, 96, hex('#2a2a2a')); disco(151, 86, 6, hex('#3a3a3a')); disco(151, 85, 5, hex('#5a4a40'));
  rect(246, 104, 282, 130, hex('#1e1e22')); rect(247, 105, 281, 106, hex('#3a3a42')); disco(254, 103, 2, hex('#c83a3a')); disco(274, 103, 2, hex('#3a3a3a')); for (let x = 250; x < 280; x += 5) rect(x, 108, x + 2, 110, hex('#3a3a42'));
  for (let i = 0; i < 40; i++) { const u = i / 39, x = Math.round(62 + u * 36), y = Math.round(104 + Math.sin(u * Math.PI) * -6); disco(x, y, 2.2, hex('#1e1e1e')); pset(x, y - 2, hex('#4a4a4a')); }
  for (let i = 0; i < 26; i++) { const u = i / 25, x = Math.round(236 + u * 12), y = Math.round(120 - u * 6); disco(x, y, 1.6, hex('#1e1e1e')); }
  // el morro y las aletas se ven desde aquí hasta el borde de abajo (la parte que tapa al demonio va en la capa de delante)
  rect(0, 134, 319, 179, C_.c);
}

function f_capoDelanteFijo(R) {
  const { rect, pset, disco, linea } = R, C_ = f_COCHE;
  // el filo del hueco, las aletas abombadas con su luz, la moldura cromada, el faro y la rejilla
  for (let x = 0; x < 320; x++) { const lado = x < 28 || x > 292, top = lado ? 120 + Math.round(Math.abs(x < 28 ? 28 - x : x - 292) * 0.3) : 132;
    for (let y = top; y < 180; y++) { const f = (y - top) / 46, luz = Math.sin(x / 320 * Math.PI) * 0.4; pset(x, y, y < top + 2 ? C_.cL : f < 0.18 + luz * 0.2 ? C_.cL : f > 0.75 ? C_.cS : C_.c); } }
  rect(28, 132, 292, 133, C_.cD); rect(0, 150, 319, 151, C_.cr); rect(0, 152, 319, 152, C_.crS);
  for (let x = 120; x < 200; x++) for (let y = 154; y < 180; y++) pset(x, y, x % 3 ? C_.cr : C_.crS); rect(118, 153, 202, 154, C_.cr);
  for (const fx of [40, 280]) { disco(fx, 140, 9, C_.crS); disco(fx, 140, 8, C_.cr); disco(fx, 140, 6, hex('#fff4d0')); for (let j = -5; j <= 5; j += 2) rect(fx - 5, 140 + j, fx + 5, 140 + j, hex('#f0e0b0')); pset(fx - 3, 137, hex('#ffffff')); pset(fx - 2, 137, hex('#ffffff')); }
  linea(60, 170, 110, 165, C_.cL); linea(210, 165, 260, 170, C_.cL);
}

function f_taller(R, t, o, P, cam) {
  if (cam === 'capo') {
    R.copiar(f_capa(R, 'capo', () => f_capoFijo(R, P)));
    // la bombilla del techo que se mece y su luz; el ventilador y la correa que giran; el vapor del radiador
    { const sw = Math.sin(t * 1.1) * 6, bx = Math.round(196 + sw); R.linea(196, 0, bx, 12, f_K); R.halo(bx, 16, 26, [hex('#5a3a2a'), hex('#8a6a3a'), hex('#c8a060')], 0.8); R.rect(bx - 4, 12, bx + 4, 14, hex('#2a5a4a')); R.disco(bx, 16, 2, hex('#fff8c0')); }
    { const a = t * 14; R.disco(78, 116, 9, hex('#2a2a30')); for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2; R.linea(78, 116, 78 + Math.round(Math.cos(an) * 8), 116 + Math.round(Math.sin(an) * 8), hex('#6a6a72')); } R.disco(78, 116, 2, hex('#c8c8d0'));
      for (let i = 0; i < 24; i++) { const u = (i / 24 + t * 0.6) % 1, x = Math.round(78 + (176 - 78) * u), y = Math.round(116 + (98 - 116) * u); R.pset(x, y + 9, i & 1 ? hex('#3a3a3a') : hex('#1e1e1e')); } }
    R.disco(176, 92, 9, f_COCHE.crS); R.disco(176, 91, 9, f_COCHE.cr); R.disco(176, 91, 5, hex('#b8bcc8')); R.rect(170, 87, 182, 87, hex('#ffffff')); R.pset(176 + Math.round(Math.sin(t * 1.1) * 4), 86, hex('#fff8d0'));
    f_humo(R, 47, 92, t, 0, hex('#e8e8f0'), 30); f_humo(R, 50, 94, t, 1.4, hex('#c8c8d8'), 24);
    if (Math.floor(t * 3) % 7 === 0) R.pset(148, 84, hex('#a8d8ff'));
    return { suelo: 178, pies: [[10, 100], [220, 300]], demonio: [176, 150], motor: [96, 100, 236, 132], radiador: [32, 98, 62, 134], filtro: [176, 91], bateria: [246, 104, 282, 130], morro: 132 };
  }
  R.copiar(f_capa(R, 'taller', () => f_tallerFijo(R, P)));
  // la calle por el hueco de la persiana: cielo, la casa de enfrente, papel picado, la farola y alguien que pasa
  R.recorte([6, 55, 78, 150]);
  f_deg(R, 6, 55, 78, 150, P.cielo, 1);
  R.rect(6, 80, 78, 150, P.rosa); for (let y = 82; y < 150; y += 3) for (let x = 6; x < 79; x += 5) R.pset(x + ((y / 3) & 1) * 2, y, P.rosaS);
  for (const [wx, k] of [[14, 0], [44, 1]]) { R.rect(wx, 90, wx + 12, 106, f_K); R.rect(wx + 1, 91, wx + 11, 105, Math.sin(t * 0.6 + k * 2) > -0.6 ? hex('#f0b860') : hex('#5a4064')); R.rect(wx + 6, 91, wx + 6, 105, f_K); }
  R.rect(6, 128, 78, 150, P.acera); R.rect(6, 128, 78, 128, P.aceraL);
  f_picado(R, 0, 64, 84, 70, t, 6, 10, 6);
  for (let k = 0; k < 2; k++) { const span = 110, x = -10 + (((h(k, 4, 246) * span + (k ? -1 : 1) * t * 7) % span) + span) % span; f_paseante(R, x, 140, t, k + 2, k ? -1 : 1); }
  R.recorte(null);
  // la bombilla que se balancea sobre el coche y su cono de luz, que se mueve con ella
  { const sw = Math.sin(t * 1.1) * 5, bx = Math.round(210 + sw); R.linea(210, 3, bx, 40, f_K);
    for (let y = 46; y < 151; y++) { const w = (y - 46) * 0.55; for (let x = Math.round(bx - w + (y - 46) * sw * 0.02); x <= bx + w + (y - 46) * sw * 0.02; x++) if (f_b4(x, y) < 0.22 - (y - 46) * 0.0012) R.pset(x, y, f_mez(R.pget(x, y), hex('#fff0c0'), 0.3)); }
    R.rect(bx - 5, 40, bx + 5, 42, hex('#2a5a4a')); R.rect(bx - 3, 39, bx + 3, 39, hex('#4a8a6a')); R.disco(bx, 44, 2, hex('#fff8c0')); R.halo(bx, 44, 8, [hex('#8a6a4a'), hex('#c8a060')], 1); }
  // la radio (el dial que brilla), el vapor de la taza y del radiador, la gota de aceite que cae
  R.rect(129, 95, 134, 98, Math.sin(t * 3) > 0 ? hex('#f0c040') : hex('#c89a30')); R.pset(130 + Math.floor(t * 2) % 4, 96, hex('#c83a3a'));
  f_humo(R, 145, 96, t, 0.3, hex('#e8e0d8'), 12); f_humo(R, 184, 112, t, 1.1, hex('#e8e8f0'), 20);
  { const u = (t % 2.2) / 2.2; R.pset(214, Math.round(150 + u * 9), hex('#2a2430')); }
  return { suelo: 156, pies: [[86, 168], [20, 80]], demonio: [144, 156], motor: [176, 112, 226, 124], capo: [172, 76, 228, 120], coche: [162, 104, 304, 158], banco: [84, 104, 158, 156], persiana: [6, 55, 78, 150] };
}

function f_tallerDelante(R, t, o, P, cam) {
  if (cam === 'capo') { f_pegar(R, f_capa(R, 'capoD', () => f_capoDelanteFijo(R), true), 118, 179); return; }
  f_pegar(R, f_capa(R, 'tallerD', () => f_tallerDelanteFijo(R), true), 120, 160);
}

// lo que va delante de los personajes en espacio(): el cristal de la cabina con su marco y brillo, y los rayos de luz de
// la puerta (mismas opciones que espacio)
export function espacioDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'combate', cam = o.camara ?? 'general';
  if (enc === 'asteroide') { f_luzPuerta(R, t, o.abre ?? 0, cam, true); return; }
  if (cam === 'cabina') { f_cabinaDelante(R, t); return; }
  const dy = f_meceCaza(t); f_pegarDesp(R, f_capa(R, 'cazaD', () => f_cazaCristal(R), true), 0, dy, 86, 112);
}

// pega una capa con huecos desplazada (dx, dy) entre las filas y0 e y1 de la capa
function f_pegarDesp(R, b, dx, dy, y0 = 0, y1 = 179) { const d = R.buf; for (let y = y0; y <= y1; y++) { const Y = y + dy; if (Y < 0 || Y > 179) continue; for (let x = 0; x < 320; x++) { const c = b[y * 320 + x]; if (c === f_VACIO) continue; const X = x + dx; if (X >= 0 && X < 320) d[Y * 320 + X] = c; } } }

const f_meceCaza = (t) => Math.round(Math.sin(t * 1.3) * 2);

// ruido de valor suave (interpolado) a escala e: para nebulosas sin cuadros
function f_suave(x, y, e, k) { const fx = x / e, fy = y / e, ix = Math.floor(fx), iy = Math.floor(fy), u = fx - ix, v = fy - iy, a = h(ix, iy, k), b = h(ix + 1, iy, k), c = h(ix, iy + 1, k), d = h(ix + 1, iy + 1, k), su = u * u * (3 - 2 * u), sv = v * v * (3 - 2 * v); return a + (b - a) * su + (c - a) * sv + (a - b - c + d) * su * sv; }

const f_ESP = { k: hex('#05060f'), g: [hex('#cfd4dc'), hex('#a8b0bc'), hex('#7c8696'), hex('#545e6e'), hex('#3a4252')], r: hex('#c83a3a') };

// el fondo del espacio (opaco): degradado, nebulosa tramada en dos colores, la galaxia y el planeta anillado
function f_espacioFondo(R, planeta = true) {
  const { pset, disco } = R;
  f_deg(R, 0, 0, 319, 179, [hex('#04050e'), hex('#070a1a'), hex('#0c0e26'), hex('#120f2e')]);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const n = Math.sin(x * 0.021 + Math.sin(y * 0.03) * 2.2) + Math.sin(y * 0.027 + x * 0.008 + 1.3) + (f_suave(x, y, 14, 250) - 0.5) * 1.2 + (f_suave(x, y, 5, 248) - 0.5) * 0.5;
    const m = Math.sin(x * 0.015 - 2 + Math.sin(y * 0.02 + 1) * 2.5) + Math.cos(y * 0.035 - x * 0.01) + (f_suave(x, y, 12, 251) - 0.5) * 1.2 + (f_suave(x, y, 4, 249) - 0.5) * 0.5;
    if ((x > 274 && y < 46) || (x > 18 && x < 172 && y < 16)) continue;
    if (n > 1.1 && f_b4(x, y) < (n - 1.1) * 0.9) pset(x, y, n > 1.6 ? hex('#5a2a6a') : hex('#3a1e52'));
    else if (m > 1.2 && f_b4(x, y) < (m - 1.2) * 0.8) pset(x, y, m > 1.7 ? hex('#1e5a6a') : hex('#16384a'));
  }
  for (let k = 0; k < 160; k++) { const x = Math.round(h(k, 1, 252) * 319), y = Math.round(h(k, 2, 252) * 179); if ((x > 274 && y < 46) || (x > 18 && x < 172 && y < 16)) continue; pset(x, y, h(k, 3, 252) < 0.2 ? hex('#8a90b8') : hex('#3e4466')); }
  // la galaxia en espiral, pequeña y lejana
  for (let k = 0; k < 220; k++) { const a = k * 0.09, r = k * 0.06, br = k & 1 ? 0 : Math.PI; const x = Math.round(236 + Math.cos(a + br) * r * 1.6), y = Math.round(70 + Math.sin(a + br) * r * 0.7); pset(x, y, k < 60 ? hex('#c8b8e0') : hex('#6a5a8a')); }
  disco(236, 70, 1.5, hex('#f0e8ff'));
  if (!planeta) return;
  // el planeta anillado, abajo a la izquierda, con bandas, terminador y atmósfera
  const px = 18, py = 214, pr = 92;
  for (let y = 100; y < 180; y++) for (let x = 0; x < 130; x++) { const d = Math.hypot(x - px, y - py) / pr; if (d > 1.05) continue;
    if (d > 1) { if (f_b4(x, y) < (1.05 - d) * 14) pset(x, y, hex('#3a6aa8')); continue; }
    const banda = Math.sin((y - py) * 0.22 + Math.sin(x * 0.05) * 1.5), luz = ((x - px) * 0.8 - (y - py) * 0.5) / pr;
    let c = banda > 0.5 ? hex('#c8905a') : banda > -0.3 ? hex('#a86a4a') : hex('#8a4a3a'); if (luz < 0.1) c = f_mez(c, hex('#1a1020'), 0.55); if (luz < -0.2) c = f_mez(c, hex('#06040a'), 0.6);
    if (d > 0.96) c = f_mez(c, hex('#8ab8e8'), 0.5); pset(x, y, c); }
  for (let a = -0.2; a < 1.8; a += 0.004) { for (const rr of [1.35, 1.42, 1.5]) { const x = Math.round(px + Math.cos(a) * pr * rr), y = Math.round(py - Math.sin(a) * pr * rr * 0.28); if (x < 0 || x > 319 || y > 179 || y < 0) continue; const detras = Math.hypot(x - px, y - py) < pr && Math.sin(a) > 0; if (!detras || a > 1.57) pset(x, y, rr === 1.42 ? hex('#d8c098') : hex('#a88a6a')); } }
}

// las estrellas en tres capas que corren hacia la izquierda (vel = cuánto corre la nave)
function f_estrellas(R, t, vel = 1, estela = false) {
  for (let capa = 0; capa < 3; capa++) { const v = [6, 18, 48][capa] * vel, n = [40, 26, 12][capa], c = [hex('#5a6088'), hex('#a8b0d8'), hex('#f0f4ff')][capa];
    for (let k = 0; k < n; k++) { const y = Math.round(h(k, capa, 253) * 179), x = Math.round(((h(k, capa + 3, 253) * 340 - t * v) % 340 + 340) % 340 - 10); if ((x > 274 && y < 46) || (x > 18 && x < 172 && y < 16)) continue;
      R.pset(x, y, c); if (estela || capa === 2) { const L = estela ? [3, 9, 22][capa] : 3; for (let i = 1; i < L; i++) if (f_b4(x + i, y) < 1 - i / L) R.pset(x + i, y, f_mez(c, hex('#0c0e26'), i / L)); } } }
}

// el crucero grande (capa con huecos): casco largo de placas, el puente, las ventanas, los motores
function f_crucero(R) {
  const { rect, pset, poligono, linea } = R, G = f_ESP.g;
  poligono([[30, 52], [200, 40], [236, 50], [236, 62], [200, 70], [30, 64]], G[3]);
  poligono([[30, 52], [200, 40], [236, 50], [200, 50], [30, 56]], G[2]);
  for (let x = 34; x < 232; x += 10) { linea(x, 50 - Math.round((x - 30) * 0.06), x, 66, G[4]); }
  for (let x = 36; x < 230; x += 3) { const y = 58 + (x % 9 === 0 ? 1 : 0); if (h(x, 1, 254) < 0.6) pset(x, y, hex('#f0d890')); }
  for (let k = 0; k < 30; k++) { const x = 40 + Math.round(h(k, 1, 255) * 180), y = 46 + Math.round(h(k, 2, 255) * 14); rect(x, y, x + 2 + Math.round(h(k, 3, 255) * 4), y + 1, h(k, 4, 255) < 0.5 ? G[1] : G[4]); }
  rect(150, 30, 176, 42, G[3]); rect(150, 30, 176, 31, G[1]); rect(156, 24, 170, 30, G[2]); for (let x = 152; x < 175; x += 3) pset(x, 35, hex('#a8e0ff')); rect(162, 18, 163, 24, G[2]);
  rect(196, 36, 214, 42, G[3]); rect(196, 36, 214, 36, G[1]);
  rect(22, 50, 30, 66, G[4]); for (const y of [52, 57, 62]) { rect(18, y, 22, y + 3, G[3]); }
}

// el caza de alas en X (capa con huecos, de perfil hacia la derecha): las alas de detrás, el fuselaje, las de delante
function f_caza(R) {
  const { rect, pset, poligono, linea, disco } = R, B = [hex('#f2f0ea'), hex('#d8d6d0'), hex('#a8aab0'), hex('#787c86'), hex('#4a4e58')], ROJO = hex('#b83a32'), K = f_K;
  const ala = (x0, y0, x1, y1, lejos) => { const c = lejos ? B[3] : B[1], cs = lejos ? B[4] : B[2];
    poligono([[x0, y0 - 3], [x0 + 34, y0 - 3], [x1 + 30, y1], [x1, y1]], c); linea(x0, y0 - 3, x1, y1, lejos ? B[2] : B[0]); linea(x0 + 34, y0 - 3, x1 + 30, y1, cs);
    for (let i = 1; i < 4; i++) linea(x0 + i * 8, y0 - 3, x1 + i * 7, y1, cs);
    // el cañón de la punta, largo, con su bocacha
    rect(x1 - 4, y1 - 1, x1 + 70, y1 + 1, lejos ? B[3] : B[2]); rect(x1 - 4, y1 - 1, x1 + 70, y1 - 1, lejos ? B[2] : B[0]); rect(x1 + 70, y1 - 2, x1 + 74, y1 + 2, lejos ? B[4] : B[3]); rect(x1 + 40, y1 - 2, x1 + 46, y1 + 2, lejos ? B[4] : B[3]);
    if (!lejos) { rect(x1 + 6, y1 - 2, x1 + 14, y1 + 2, ROJO); } };
  // las alas de detrás (más oscuras, un poco desplazadas)
  ala(96, 104, 76, 52, true); ala(96, 122, 76, 160, true);
  // los motores (dos se ven), con sus tomas de aire y las toberas
  for (const [y, lejos] of [[100, true], [124, false]]) { const c = lejos ? B[3] : B[1]; rect(78, y - 6, 134, y + 4, K); rect(79, y - 5, 133, y + 3, c); rect(79, y - 5, 133, y - 4, lejos ? B[2] : B[0]); rect(79, y + 2, 133, y + 3, lejos ? B[4] : B[3]);
    rect(130, y - 6, 136, y + 4, B[4]); for (let x = 84; x < 128; x += 9) rect(x, y - 5, x, y + 3, lejos ? B[4] : B[2]); rect(72, y - 5, 78, y + 3, B[4]); }
  // el fuselaje largo y el morro afilado; las placas, la franja de color (sin insignias) y la toma de la cabina
  poligono([[86, 104], [246, 108], [264, 113], [246, 118], [86, 124]], B[1]);
  poligono([[86, 104], [246, 108], [264, 113], [86, 110]], B[0]); poligono([[86, 120], [246, 117], [264, 113], [246, 118], [86, 124]], B[2]);
  for (const x of [112, 140, 188, 214, 236]) linea(x, 105 + Math.round((x - 86) * 0.025), x, 123 - Math.round((x - 86) * 0.04), B[2]);
  linea(86, 114, 260, 113, B[2]); rect(196, 109, 230, 110, ROJO); rect(196, 116, 230, 116, ROJO);
  for (let x = 92; x < 244; x += 6) pset(x, 121 - Math.round((x - 86) * 0.025), B[3]);
  rect(86, 104, 90, 124, B[3]); rect(80, 106, 86, 122, B[4]); for (let y = 108; y < 121; y += 3) rect(81, y, 85, y, B[3]);
  // el lomo de la cabina (el hueco se rellena en la escena; aquí el respaldo y el reposacabezas al fondo)
  poligono([[140, 106], [148, 92], [180, 92], [192, 107]], hex('#202838')); rect(146, 98, 150, 106, B[3]); rect(147, 96, 150, 98, B[4]);
  for (let x = 152; x < 178; x += 5) pset(x, 104, hex('#3a4458'));
  // las alas de delante (encima del fuselaje)
  ala(104, 108, 84, 46, false); ala(104, 126, 84, 166, false);
  // el astromecánico NO: en su lugar, una toma de sensores con su luz
  rect(124, 100, 132, 104, B[3]); pset(128, 99, hex('#58c8ff'));
}

// el marco de la cabina del caza y el brillo del cristal (van delante del piloto)
function f_cazaCristal(R) {
  const { pset, linea } = R, B = [hex('#f2f0ea'), hex('#d8d6d0'), hex('#a8aab0'), hex('#787c86'), hex('#4a4e58')];
  linea(140, 106, 148, 92, B[2]); linea(141, 106, 149, 92, B[3]); linea(148, 92, 180, 92, B[2]); linea(180, 92, 192, 107, B[3]); linea(179, 92, 191, 107, B[2]);
  linea(166, 92, 170, 107, B[3]); linea(140, 107, 192, 107, B[1]); linea(140, 108, 192, 108, B[2]);
  for (let i = 0; i < 6; i++) { pset(152 + i, 94 + i, hex('#e8f4ff')); if (i < 4) pset(154 + i, 94 + i, hex('#a8d0f0')); }
}

function f_combate(R, t, o) {
  R.copiar(f_capa(R, 'espacioF', () => f_espacioFondo(R)));
  f_estrellas(R, t, 1);
  // el crucero que deriva, sus luces y torretas; los drones enemigos que zigzaguean y estallan
  const dx = Math.round((t * 0.8) % 12) - 6;
  f_pegarDesp(R, f_capa(R, 'crucero', () => f_crucero(R), true), dx, 0, 14, 72);
  for (let k = 0; k < 6; k++) { const x = 40 + k * 32 + dx, on = Math.sin(t * 3 + k * 1.7) > 0.4; R.pset(x, 64, on ? hex('#ff5a5a') : hex('#5a2a2a')); }
  for (let k = 0; k < 3; k++) { const y = [52, 57, 62][k]; for (let i = 0; i < 4; i++) if (f_b4(14 - i + dx, y + 1) < 1 - i / 4 + Math.sin(t * 20 + k) * 0.1) R.rect(14 - i * 2 + dx, y, 17 - i * 2 + dx, y + 3, i < 1 ? hex('#e8f4ff') : hex('#58a8ff')); }
  { const u = (t % 2.6) / 2.6; if (u < 0.5) { const sx = 120 + dx, sy = 66, ex = sx + u * 2 * 120, ey = sy + u * 2 * 30; R.linea(Math.round(ex - 8), Math.round(ey - 2), Math.round(ex), Math.round(ey), hex('#6aff8a')); } }
  for (let k = 0; k < 3; k++) { const p = (t * 0.15 + k * 0.33) % 1, x = Math.round(330 - p * 360), y = Math.round(140 + Math.sin(t * 2.4 + k * 2) * 10 - k * 12); if (x < -6 || (x > 270 && y < 48)) continue;
    const boom = (t * 0.7 + k) % 4 < 0.25; if (boom) { R.halo(x, y, 6, [hex('#8a3a1a'), hex('#e8782a'), hex('#fff0a0')], 1.4); continue; }
    R.pset(x, y, f_ESP.g[1]); R.pset(x - 1, y - 1, f_ESP.g[3]); R.pset(x - 1, y + 1, f_ESP.g[3]); R.pset(x + 1, y, hex('#ff6a4a')); R.pset(x - 2, y - 2, f_ESP.g[3]); R.pset(x - 2, y + 2, f_ESP.g[3]); }
  // el caza, que se mece; las llamas de los motores; los rayos rojos que salen de los cañones
  const dy = f_meceCaza(t);
  for (const [y, k] of [[100, 0], [124, 1]]) { const L = 10 + Math.round(Math.sin(t * 25 + k) * 2); for (let i = 0; i < L; i++) for (let j = -3; j <= 2; j++) { const u = i / L; if (Math.abs(j + 0.5) > 3.5 * (1 - u)) continue; if (f_b4(72 - i, y + j + dy) < 1.2 - u) R.pset(72 - i, y + j + dy, u < 0.3 ? hex('#fff0e0') : u < 0.6 ? hex('#ff9a5a') : hex('#e84a3a')); } }
  f_pegarDesp(R, f_capa(R, 'caza', () => f_caza(R), true), 0, dy, 30, 172);
  for (const [cx, cy, k] of [[158, 46, 0], [158, 166, 1]]) { const u = ((t * 1.6 + k * 0.5) % 1); if (u < 0.6) { const bx = Math.round(cx + u * 300); R.rect(bx, cy + dy - (k ? 1 : 0), bx + 14, cy + dy - (k ? 1 : 0), hex('#ff6a5a')); R.rect(bx + 2, cy + dy - (k ? 1 : 0), bx + 12, cy + dy - (k ? 1 : 0), hex('#fff0e0')); }
    if (u < 0.08) R.halo(cx, cy + dy, 4, [hex('#e84a3a'), hex('#fff0a0')], 1.4); }
  return { cabina: [164, 118 + dy], hueco: [150, 93 + dy, 179, 106 + dy], suelo: 118 + dy, pies: [[150, 178]], caza: [60, 40 + dy, 270, 172 + dy], crucero: [14 + dx, 18, 236 + dx, 70], planeta: [0, 120, 130, 179] };
}

function f_cabinaFijo(R) {
  const { rect, pset, poligono, linea, disco } = R, B = [hex('#f2f0ea'), hex('#d8d6d0'), hex('#a8aab0'), hex('#787c86'), hex('#4a4e58')], ROJO = hex('#b83a32');
  // el ala de arriba con su motor (izquierda), que sale del fuselaje hacia arriba y atrás
  poligono([[30, 112], [92, 112], [16, 0], [0, 0], [0, 40]], B[2]); poligono([[30, 112], [60, 112], [6, 0], [0, 0], [0, 50]], B[1]);
  for (let i = 0; i < 5; i++) linea(40 + i * 10, 112, 4 + i * 3, 0, B[3]);
  rect(0, 112, 96, 146, f_K); rect(0, 113, 95, 145, B[1]); rect(0, 113, 95, 116, B[0]); rect(0, 140, 95, 145, B[3]); for (let x = 6; x < 92; x += 11) { rect(x, 113, x, 145, B[2]); for (let y = 118; y < 140; y += 6) pset(x + 3, y, B[3]); }
  rect(88, 110, 98, 148, B[4]); for (let y = 114; y < 146; y += 4) rect(89, y, 97, y + 1, B[3]);
  // el fuselaje: placas, remaches, desgaste y una franja de color (sin insignias)
  rect(0, 146, 319, 179, B[1]); rect(96, 110, 319, 179, B[1]);
  for (let y = 110; y < 180; y++) for (let x = 96; x < 320; x++) { const v = h(x, y, 256); if (v < 0.04) pset(x, y, B[2]); else if (v > 0.985) pset(x, y, B[3]); }
  rect(96, 110, 319, 113, B[0]); for (const x of [100, 150, 210, 260, 310]) rect(x, 114, x, 179, B[2]); rect(0, 150, 319, 150, B[2]); rect(0, 166, 319, 166, B[2]);
  for (const x of [100, 150, 210, 260, 310]) for (let y = 118; y < 179; y += 6) pset(x + 3, y, B[3]);
  rect(96, 156, 319, 159, ROJO); rect(96, 156, 319, 156, hex('#d85a4a')); for (let k = 0; k < 18; k++) { const x = 100 + Math.round(h(k, 1, 257) * 210), y = 152 + Math.round(h(k, 2, 257) * 22); rect(x, y, x + 2 + Math.round(h(k, 3, 257) * 5), y, B[3]); }
  rect(240, 124, 300, 146, B[2]); rect(241, 125, 299, 145, B[1]); for (let x = 246; x < 296; x += 4) rect(x, 128, x + 1, 142, B[3]);
  // más piezas del casco: la escotilla de servicio con su asa, el estribo, la toma de combustible, pictogramas de aviso
  rect(156, 120, 196, 146, B[3]); rect(157, 121, 195, 145, B[1]); rect(157, 121, 195, 121, B[0]); rect(170, 132, 182, 134, B[3]); rect(171, 131, 181, 131, B[4]); for (const [x, y] of [[159, 123], [193, 123], [159, 143], [193, 143]]) pset(x, y, B[4]);
  rect(120, 118, 140, 120, B[4]); rect(120, 121, 140, 121, B[3]); rect(124, 124, 136, 140, B[2]); for (let y = 126; y < 140; y += 4) rect(125, y, 135, y + 1, B[4]);
  R.disco(222, 136, 5, B[3]); R.disco(222, 136, 4, B[2]); R.disco(222, 136, 2, B[4]); pset(220, 134, B[0]);
  for (let k = 0; k < 5; k++) { const x = 210 + k * 6; for (let j = 0; j < 4; j++) { pset(x + j, 170 - j, hex('#e8b83a')); pset(x + j + 1, 170 - j, hex('#e8b83a')); } } rect(208, 171, 240, 171, hex('#3a3a44'));
  for (let x = 98; x < 320; x++) for (let y = 160; y < 180; y++) if (f_b4(x, y) < Math.max(0, Math.sin(x * 0.05) * 0.3 + (y - 160) * 0.02 - 0.1)) pset(x, y, f_mez(R.pget(x, y), hex('#5a4a40'), 0.35));
  for (let k = 0; k < 12; k++) { const x = 100 + Math.round(h(k, 1, 258) * 210), y = 116 + Math.round(h(k, 2, 258) * 30); pset(x, y, B[4]); pset(x + 1, y, B[3]); }
  // las placas del ala, con su franja y los paneles de servicio
  for (let i = 0; i < 5; i++) { const y = 30 + i * 16; linea(0, y + 18, Math.round(16 + (y / 112) * 70) - 4, y, B[3]); } rect(10, 70, 30, 82, B[3]); rect(11, 71, 29, 81, B[1]); for (let y = 73; y < 81; y += 2) rect(13, y, 27, y, B[3]);
  linea(46, 112, 8, 20, ROJO); linea(47, 112, 9, 20, ROJO);
  // la cabina: el hueco del cristal (cielo detrás: se pinta vivo), el reposacabezas, la consola y el radar
  rect(112, 104, 236, 112, hex('#202838'));
  rect(118, 86, 128, 112, hex('#3a3a44')); rect(118, 86, 128, 88, hex('#5a5a66')); rect(120, 90, 126, 110, hex('#5a2a2a'));
  poligono([[196, 112], [236, 112], [236, 96], [210, 92]], hex('#2a2e3a')); rect(212, 96, 230, 108, f_K); rect(213, 97, 229, 107, hex('#0c2a1a'));
  for (let i = 0; i < 4; i++) { rect(200 + i * 3, 104, 201 + i * 3, 105, [hex('#ff5a5a'), hex('#ffd860'), hex('#5aff8a'), hex('#5ac8ff')][i]); }
  linea(190, 112, 196, 100, hex('#3a3a44')); disco(196, 99, 2, hex('#c83a3a'));
  // los paneles laterales de la cabina con botones y el amuleto que cuelga del montante (va vivo)
  rect(130, 100, 150, 110, hex('#2a2e3a')); for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) pset(132 + i * 4, 103 + j * 4, [hex('#5a5a66'), hex('#c83a3a'), hex('#5ac8ff')][(i + j) % 3]);
}

function f_cabinaDelante(R, t) {
  const { rect, pset, linea } = R, B = [hex('#f2f0ea'), hex('#d8d6d0'), hex('#a8aab0'), hex('#787c86'), hex('#4a4e58')], dy = f_meceCaza(t) > 0 ? 1 : 0;
  // los montantes del cristal, el borde de la cabina y los reflejos que se deslizan
  for (const [a, b, c, d] of [[108, 112, 128, 64], [128, 64, 214, 60], [214, 60, 244, 112], [170, 62, 176, 112]]) { linea(a, b + dy, c, d + dy, B[2]); linea(a + 1, b + dy, c + 1, d + dy, B[3]); linea(a + 2, b + dy, c + 2, d + dy, B[4]); }
  rect(104, 110 + dy, 248, 113 + dy, B[0]); rect(104, 114 + dy, 248, 114 + dy, B[3]);
  for (let i = 0; i < 40; i++) { const x = 130 + i + Math.round((t * 8) % 60), y = 70 + Math.round(i * 0.9); if (x < 168 && y < 110) pset(x, y + dy, f_mez(R.pget(x, y + dy), hex('#e8f4ff'), 0.6)); }
}

function f_cabina(R, t, o) {
  R.copiar(f_capa(R, 'espacioF0', () => f_espacioFondo(R, false)));
  f_estrellas(R, t, 3, true);
  const dx = Math.round((t * 2) % 30) - 15;
  f_pegarDesp(R, f_capa(R, 'crucero', () => f_crucero(R), true), 30 + dx, 34, 14, 72);
  for (let k = 0; k < 2; k++) { const p = (t * 0.22 + k * 0.5) % 1, x = Math.round(330 - p * 360), y = Math.round(70 + Math.sin(t * 2 + k * 3) * 14 + k * 20); if (x > 270 && y < 48) continue; R.pset(x, y, f_ESP.g[1]); R.pset(x - 1, y - 1, f_ESP.g[3]); R.pset(x - 1, y + 1, f_ESP.g[3]); R.pset(x + 1, y, hex('#ff6a4a'));
    if ((t * 1.3 + k) % 1 < 0.3) { const u = ((t * 1.3 + k) % 1) / 0.3; R.rect(Math.round(x - 10 - u * 60), y, Math.round(x - 4 - u * 60), y, hex('#6aff8a')); } }
  const dy = f_meceCaza(t) > 0 ? 1 : 0;
  f_pegarDesp(R, f_capa(R, 'cabinaF', () => f_cabinaFijo(R), true), 0, dy, 0, 179);
  // la llama del motor, la luz de la consola y el radar que barre
  { const cx = 221, cy = 102 + dy, a = t * 3; for (let r = 0; r < 5; r++) R.pset(cx + Math.round(Math.cos(a) * r), cy + Math.round(Math.sin(a) * r), hex('#5aff8a')); R.pset(cx + 3, cy - 2, Math.sin(t * 4) > 0 ? hex('#ffd860') : hex('#3a5a2a')); R.pset(cx - 3, cy + 2, hex('#5aff8a')); }
  for (let i = 0; i < 4; i++) if (Math.sin(t * (3 + i) + i) > 0.2) R.rect(200 + i * 3, 104 + dy, 201 + i * 3, 105 + dy, hex('#ffffff'));
  for (let i = 0; i < 5; i++) if (Math.sin(t * 2.3 + i * 1.9) > 0.5) R.pset(132 + i * 4, 103 + dy, hex('#5aff8a'));
  { const a = Math.sin(t * 2.2) * 0.4, ax = 200 + Math.round(Math.sin(a) * 7), ay = 66 + dy + Math.round(Math.cos(a) * 7); R.linea(200, 64 + dy, ax, ay, hex('#8a8a96')); R.rect(ax - 1, ay, ax + 1, ay + 2, hex('#f0e8d0')); R.pset(ax, ay + 1, f_K); }
  return { cabina: [150, 121 + dy], hueco: [112, 64 + dy, 236, 111 + dy], suelo: 121 + dy, pies: [[136, 190]], consola: [196, 92, 236, 112], radar: [221, 102] };
}

const f_ROCA = [hex('#2a2430'), hex('#4a4048'), hex('#6a5e62'), hex('#8e8080'), hex('#b8a8a0'), hex('#d8ccc0')];

// la roca con textura de cráteres y luz rasante desde la derecha: rellena por columnas desde la línea alta(x) hacia abajo
function f_rocaSuelo(R, alta, x0 = 0, x1 = 319, k = 0) {
  for (let x = x0; x <= x1; x++) { const top = Math.round(alta(x)); for (let y = Math.max(0, top); y < 180; y++) {
    const d = y - top, n = h(x >> 1, y >> 1, 260 + k), m = Math.sin(x * 0.11 + y * 0.07) + Math.sin(x * 0.05 - y * 0.13);
    let v = d < 2 ? 4 : d < 5 ? 3 : 2; if (m > 1.2) v++; if (m < -1.1) v--; if (n < 0.1) v--; if (n > 0.95) v++;
    if (alta(x + 2) < alta(x) - 1 && d < 3) v = Math.max(v, 4); if (alta(x - 2) < alta(x) - 1 && d < 6) v = Math.min(v, 1);
    R.pset(x, y, f_ROCA[Math.max(0, Math.min(5, v))]); } }
}

function f_crater(R, cx, cy, rx, ry) {
  for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -rx - 1; i <= rx + 1; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 1.25) continue;
    R.pset(cx + i, cy + j, d > 1 ? (i > 0 ? f_ROCA[4] : f_ROCA[1]) : (i < 0 ? (d > 0.5 ? f_ROCA[4] : f_ROCA[2]) : f_ROCA[1])); }
}

function f_asteroideFijo(R, cerca) {
  const { rect, pset, disco, poligono, linea } = R;
  f_espacioFondo(R, false);
  if (!cerca) {
    // la Tierra (las nubes vivas se pintan luego) y la Luna
    for (let y = 18; y < 110; y++) for (let x = 0; x < 100; x++) { const d = Math.hypot(x - 46, y - 64) / 44; if (d > 1.06) continue; if (d > 1) { if (f_b4(x, y) < (1.06 - d) * 14) pset(x, y, hex('#5a9ae8')); continue; }
      const tierra = Math.sin(x * 0.12 + Math.sin(y * 0.1) * 2) + Math.cos(y * 0.09 - x * 0.04) > 0.8, luz = ((x - 46) * 0.7 - (y - 64) * 0.6) / 44;
      let c = tierra ? hex('#5a8a3a') : hex('#2a5aa8'); if (tierra && h(x >> 1, y >> 1, 261) < 0.3) c = hex('#a8884a'); if (luz < -0.15) c = f_mez(c, hex('#050812'), 0.7); else if (luz < 0.05) c = f_mez(c, hex('#0a1430'), 0.4); if (d > 0.94) c = f_mez(c, hex('#a8d0ff'), 0.4); pset(x, y, c); }
    disco(118, 30, 6, hex('#8a8a96')); disco(119, 29, 5, hex('#c8c8d0')); disco(117, 31, 1, hex('#8a8a96')); disco(121, 27, 1, hex('#a8a8b4'));
    // el Sol pequeño con su destello en cruz
    R.halo(252, 62, 14, [hex('#3a3050'), hex('#8a6a6a'), hex('#e8c890')], 1.3); disco(252, 62, 4, hex('#fff8e0')); rect(238, 62, 266, 62, hex('#fff0c8')); rect(252, 52, 252, 72, hex('#fff0c8'));
    // la superficie: la llanura gris, la loma de la derecha con la puerta, cráteres y piedras
    const alta = (x) => 130 + Math.sin(x * 0.05) * 4 + Math.sin(x * 0.17) * 1.5 + (x > 250 ? -(x - 250) * 0.25 : 0);
    f_rocaSuelo(R, alta);
    // el peñasco donde está tallada la puerta: roca con estratos, luz desde la derecha y su sombra en el suelo
    const pena = (x) => 64 + Math.abs(x - 214) * 0.55 + Math.sin(x * 0.4) * 3 + (h(x >> 2, 3, 262) - 0.5) * 6;
    for (let y = 148; y < 156; y++) for (let x = 150; x < 196; x++) if (f_b4(x, y) < 0.5 - (196 - x) / 100) pset(x, y, f_ROCA[0]);
    for (let x = 170; x <= 258; x++) for (let y = Math.round(pena(x)); y <= 150; y++) { const est = Math.sin(y * 0.35 + x * 0.04) > 0.65, n = h(x >> 1, y >> 1, 270), lado = x > 214 ? 3 : 2;
      pset(x, y, y - pena(x) < 2 ? f_ROCA[x > 214 ? 5 : 4] : est ? f_ROCA[1] : n < 0.12 ? f_ROCA[1] : n > 0.92 ? f_ROCA[4] : x < 178 ? f_ROCA[1] : f_ROCA[lado]); }
    for (const [cx, cy, rx, ry] of [[30, 150, 14, 4], [96, 166, 20, 5], [126, 140, 6, 2], [270, 146, 12, 3], [214, 168, 9, 3], [60, 136, 5, 2]]) f_crater(R, cx, cy, rx, ry);
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 263) * 318), y = Math.round(Math.max(alta(x) + 3, 130) + h(k, 2, 263) * 40); if (y > 178) continue; const r = 1 + Math.floor(h(k, 3, 263) * 3); disco(x, y, r, f_ROCA[1]); disco(x - 1, y - 1, r - 0.5, f_ROCA[3]); pset(x - 1, y - r, f_ROCA[5]); }
    // la puerta tallada en la loma
    f_portal(R, 194, 100, 226, 150, 1);
    // la nave de exploración posada: casco redondeado, cabina, patas, rampa y antena
    rect(36, 110, 98, 128, f_K); for (let y = 111; y < 128; y++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((y - 119) / 9) ** 2)) * 31); rect(67 - w, y, 67 + w, y, y < 114 ? hex('#e8e8f0') : y < 124 ? hex('#c8c8d0') : hex('#8a8a96')); }
    rect(76, 108, 92, 115, f_K); rect(77, 109, 91, 114, hex('#3a5a8a')); pset(79, 110, hex('#a8d0ff')); pset(80, 110, hex('#a8d0ff'));
    rect(40, 116, 56, 118, hex('#e8a83a')); rect(50, 103, 51, 110, hex('#8a8a96')); disco(50, 102, 2, hex('#c8c8d0'));
    for (const [a, b] of [[44, 140], [88, 140]]) { linea(a + (a < 60 ? 6 : -6), 126, a, b, hex('#6a6a76')); rect(a - 3, b, a + 3, b + 1, hex('#8a8a96')); }
    poligono([[56, 127], [70, 127], [80, 142], [66, 142]], hex('#a8a8b4')); for (let y = 130; y < 142; y += 3) linea(58 + (y - 127) * 0.7, y, 70 + (y - 127) * 0.7, y, hex('#7a7a86'));
  } else {
    // de cerca: las paredes de roca con estratos a los lados y el suelo con huellas
    const pared = (x0, x1, lado) => { for (let x = x0; x <= x1; x++) { const top = Math.max(x > 240 ? Math.round(18 + (x - 240) * 0.64 + Math.sin(x * 0.45) * 2 + h(x >> 2, 5, 275) * 3) : 18, 10 + Math.round(Math.abs(lado > 0 ? x - x0 : x1 - x) * 0.25 + Math.sin(x * 0.2) * 3)); for (let y = top; y < 160; y++) { const est = Math.sin(y * 0.22 + x * 0.03 * lado + f_suave(x, y, 9, 271) * 3) > 0.82, n = h(x >> 1, y >> 1, 264), sm = f_suave(x, y, 7, 272); pset(x, y, est ? f_ROCA[1] : n < 0.1 ? f_ROCA[1] : sm > 0.72 ? f_ROCA[lado > 0 ? 3 : 4] : sm < 0.25 ? f_ROCA[1] : n > 0.93 ? f_ROCA[4] : (lado > 0 ? f_ROCA[2] : f_ROCA[3])); }
      if (x % 23 === 7) for (let y = top + 6, xx = x; y < top + 40; y++) { xx += (h(x, y, 273) - 0.5) * 1.4; pset(Math.round(xx), y, f_ROCA[0]); } } };
    pared(0, 92, 1); pared(228, 319, -1);
    // el filo de la roca de la derecha (baja hacia la esquina, con luz en el canto y piedras sueltas encima) y, sobre él,
    // el cielo de la esquina con estrellas tenues (fondo tranquilo detrás de Atom)
    for (let x = 241; x <= 319; x++) { const top = Math.max(Math.round(18 + (x - 240) * 0.64 + Math.sin(x * 0.45) * 2 + h(x >> 2, 5, 275) * 3), 10 + Math.round((319 - x) * 0.25 + Math.sin(x * 0.2) * 3));
      pset(x, top, f_ROCA[4]); if (h(x, 1, 276) < 0.5) pset(x, top + 1, f_ROCA[3]); if (h(x >> 1, 2, 276) < 0.15) { pset(x, top - 1, f_ROCA[2]); pset(x + 1, top - 1, f_ROCA[3]); } }
    for (let k = 0; k < 12; k++) { const x = 272 + Math.round(h(k, 1, 277) * 46), y = 2 + Math.round(h(k, 2, 277) * 38); if (y < 18 + (x - 240) * 0.64 - 4) pset(x, y, h(k, 3, 277) < 0.25 ? hex('#3e4466') : hex('#232842')); }
    for (let y = 26 + 0; y < 160; y++) for (let x = 92; x < 228; x++) { if (y < 30 + Math.round(Math.sin(x * 0.3) * 3 + h(x >> 2, 1, 274) * 4)) continue; const n = h(x >> 1, y >> 1, 265); pset(x, y, n < 0.1 ? f_ROCA[1] : n > 0.92 ? f_ROCA[3] : f_ROCA[2]); }
    f_portal(R, 112, 34, 208, 158, 3);
    const alta = (x) => 156 + Math.sin(x * 0.07) * 2 + Math.sin(x * 0.23);
    f_rocaSuelo(R, alta, 0, 319, 5);
    for (const [cx, cy, rx, ry] of [[40, 170, 16, 4], [276, 166, 12, 3]]) f_crater(R, cx, cy, rx, ry);
    for (let k = 0; k < 9; k++) { const x = 136 + (k % 2) * 8 - k * 3, y = 160 + k * 2; rect(x, y, x + 3, y, f_ROCA[1]); rect(x + 1, y + 1, x + 2, y + 1, f_ROCA[1]); }
    for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 266) * 318), y = 160 + Math.round(h(k, 2, 266) * 18); const r = 1 + Math.floor(h(k, 3, 266) * 3); disco(x, y, r, f_ROCA[1]); disco(x - 1, y - 1, r - 0.5, f_ROCA[3]); }
  }
}
// la puerta extraña (marco tallado y apuntado, anillos de glifos sin letras) en (x0, y0)–(x1, y1); s escala los relieves
function f_portal(R, x0, y0, x1, y1, s) {
  const { rect, pset } = R, cx = (x0 + x1) / 2, w = (x1 - x0) / 2, m = 3 * s + 2;
  const dentro = (x, y, e) => { const yy = y - y0 - e; if (yy < 0 || y > y1) return false; const ap = Math.min(1, yy / (w * 1.1)); return Math.abs(x - cx) <= (w - e) * Math.sqrt(ap) + 0.5; };
  for (let y = y0 - m; y <= y1; y++) for (let x = Math.floor(x0 - m); x <= x1 + m; x++) { if (!dentro(x, y, -m)) continue; const lado = x < cx ? 3 : 1; pset(x, y, dentro(x, y, 0) ? hex('#1a1824') : (f_b4(x, y) < 0.5 ? f_ROCA[lado] : f_ROCA[2])); }
  // los glifos tallados en el marco: rayas, círculos y escalones (sin letras)
  for (let y = y0 - m + 2; y <= y1; y += 3 * s) for (let x = Math.floor(x0 - m); x <= x1 + m; x++) { if (!dentro(x, y, -m) || dentro(x, y, 1)) continue; if (((x * 7 + y * 3) >> 2) % 3 === 0) { pset(x, y, hex('#3a3440')); pset(x + 1, y, f_ROCA[4]); } }
}

// los anillos de glifos que laten, las hojas de la puerta y la luz que sale al abrirse (cerca = cámara 'puerta')
function f_puertaViva(R, t, abre, cerca) {
  const [x0, y0, x1, y1, s] = cerca ? [112, 34, 208, 158, 3] : [194, 100, 226, 150, 1], cx = (x0 + x1) / 2, w = (x1 - x0) / 2;
  const dentro = (x, y) => { const yy = y - y0; if (yy < 0 || y > y1) return false; const ap = Math.min(1, yy / (w * 1.1)); return Math.abs(x - cx) <= w * Math.sqrt(ap) + 0.5; };
  const pulso = 0.5 + 0.5 * Math.sin(t * 2.4), col = f_mez(hex('#2a8a9a'), hex('#8af0ff'), pulso * 0.7 + abre * 0.3);
  // la luz del interior (detrás de las hojas)
  if (abre > 0) for (let y = y0; y <= y1; y++) for (let x = Math.floor(x0); x <= x1; x++) if (dentro(x, y)) { const g = 1 - Math.abs(x - cx) / w; R.pset(x, y, g > 0.5 ? hex('#fffef0') : f_mez(hex('#a8f0ff'), hex('#fffef0'), g * 2)); }
  // las dos hojas, que se apartan hacia los lados
  const ab = Math.round(abre * w);
  for (let y = y0; y <= y1; y++) for (let x = Math.floor(x0); x <= x1; x++) { if (!dentro(x, y)) continue; const izq = x < cx; const xs = izq ? x + ab : x - ab; if (izq ? xs >= cx : xs < cx) continue;
    if (!dentro(xs, y)) continue; const borde = Math.abs(xs - cx) < s + 0.5; R.pset(x, y, borde ? hex('#5a5468') : ((xs + y) % (4 * s) === 0 ? hex('#2e2a3a') : hex('#3e3a4c'))); }
  // los anillos de glifos (giran despacio): puntos y rayas que se encienden
  const rr = cerca ? [w * 0.75, w * 0.5, w * 0.25] : [w * 0.7, w * 0.4], ccy = y1 - w * (cerca ? 1.3 : 1.1);
  rr.forEach((r, i) => { const n = Math.round(r * 0.9), giro = t * (i & 1 ? -0.3 : 0.25); for (let k = 0; k < n; k++) { const a = giro + k * Math.PI * 2 / n, x = Math.round(cx + Math.cos(a) * r), y = Math.round(ccy + Math.sin(a) * r);
    const on = (k + Math.floor(t * 4)) % 5 !== 0; if (!dentro(x, y)) continue; const xs = x < cx ? x - ab : x + ab; R.pset(xs, y, on ? col : hex('#2a3a44')); if (cerca && k % 3 === 0) R.pset(xs + 1, y, on ? col : hex('#2a3a44')); } });
  if (cerca) for (let k = 0; k < 6; k++) { const a = t * 0.25 + k * Math.PI / 3, x = Math.round(cx + Math.cos(a) * w * 0.88), y = Math.round(ccy + Math.sin(a) * w * 0.88); R.disco(x < cx ? x - ab : x + ab, y, 2, col); }
}

// los rayos de luz de la puerta abierta (tramados, en abanico hacia el suelo) y las motas que bailan en ellos
function f_luzPuerta(R, t, abre, cam, delante) {
  if (abre <= 0) return;
  const cerca = cam === 'puerta', [cx, top, bot, w0, w1] = cerca ? [160, 60, 179, 44, 120] : [210, 112, 176, 14, 56];
  for (let y = top; y <= bot; y++) { const u = (y - top) / (bot - top), w = w0 + (w1 - w0) * u; for (let x = Math.round(cx - w); x <= cx + w; x++) {
    const rayo = Math.sin((x - cx) / Math.max(1, w) * 9 + t * 0.8) > 0.2, a = abre * (0.45 - u * 0.25) * (rayo ? 1 : 0.5) * (1 - Math.abs(x - cx) / w);
    if (f_b4(x, y) < a * (delante ? 0.6 : 1)) R.pset(x, y, f_mez(R.pget(x, y), hex('#e8fcff'), delante ? 0.35 : 0.5)); } }
  for (let k = 0; k < (cerca ? 18 : 8); k++) { const u = (t * 0.2 + h(k, 1, 267)) % 1, x = Math.round(cx + (h(k, 2, 267) - 0.5) * (w0 + (w1 - w0) * u) * 1.6 + Math.sin(t + k) * 3), y = Math.round(top + u * (bot - top)); R.pset(x, y, hex('#ffffff')); }
}

function f_asteroide(R, t, o, cam) {
  const cerca = cam === 'puerta', abre = Math.max(0, Math.min(1, o.abre ?? 0));
  R.copiar(f_capa(R, cerca ? 'asteroideC' : 'asteroideG', () => f_asteroideFijo(R, cerca)));
  // estrellas que titilan y rocas que pasan lejos
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 268) * 319), y = Math.round(h(k, 2, 268) * (cerca ? 30 : 100)); if ((x > 274 && y < 46) || (x > 18 && x < 172 && y < 16)) continue; if (Math.sin(t * 2 + k * 1.3) > 0.5) { R.pset(x, y, hex('#ffffff')); R.pset(x + 1, y, hex('#8a90b8')); R.pset(x - 1, y, hex('#8a90b8')); } }
  for (let k = 0; k < 2; k++) { const p = (t * 0.03 + k * 0.5) % 1, x = Math.round(-20 + p * 360), y = cerca ? 14 + k * 8 : 80 + k * 14; if (x > 270 && y < 48) continue; R.disco(x, y, 2 + k, f_ROCA[1]); R.pset(x + 1, y - 1, f_ROCA[3]); }
  if (!cerca) {
    // las nubes de la Tierra, que se mueven (recortadas al disco y a la cara de día)
    for (let y = 22; y < 106; y++) for (let x = 4; x < 90; x++) { const d = Math.hypot(x - 46, y - 64) / 44; if (d > 0.97) continue; const n = Math.sin((x + t * 2) * 0.2 + Math.sin(y * 0.3) * 2) + Math.sin(y * 0.15 + (x + t * 2) * 0.05); const luz = ((x - 46) * 0.7 - (y - 64) * 0.6) / 44;
      if (n > 1.2 && luz > -0.1 && f_b4(x, y) < (n - 1.2) * 2) R.pset(x, y, luz > 0.2 ? hex('#ffffff') : hex('#a8b8d0')); }
    // las luces de la nave; el polvo que flota bajo la poca gravedad
    if (Math.floor(t * 2) % 2) R.pset(50, 100, hex('#ff5a5a')); R.pset(97, 120, Math.sin(t * 3) > 0 ? hex('#5aff8a') : hex('#2a5a3a'));
  }
  for (let k = 0; k < 10; k++) { const u = (t * 0.05 + h(k, 1, 269)) % 1, x = Math.round(h(k, 2, 269) * 320 + Math.sin(t * 0.5 + k) * 4), y = Math.round((cerca ? 170 : 160) - u * 30); R.pset(x, y, u < 0.5 ? f_ROCA[3] : f_ROCA[2]); }
  f_puertaViva(R, t, abre, cerca);
  f_luzPuerta(R, t, abre, cam, false);
  return cerca ? { suelo: 172, pies: [[20, 100], [120, 200], [220, 300]], puerta: [112, 34, 208, 158], abre } : { suelo: 152, pies: [[106, 186], [250, 300]], puerta: [194, 100, 226, 150], pena: [170, 64, 258, 150], nave: [36, 100, 98, 142], rampa: [56, 127, 80, 142], tierra: [46, 64, 44], abre };
}

// el demonio mecánico (ver calaca): se dibuja por formas, con luz arriba a la izquierda y sombra abajo a la derecha
function f_demonio(R, x, y, t, o) {
  const { pset, rect, disco, linea } = R, dir = o.dir ?? 1, s = o.s ?? 1;
  const N = [hex('#7a3010'), hex('#b8521e'), hex('#e8783a'), hex('#f8a060'), hex('#ffd0a0')], A = [hex('#1e2e5a'), hex('#2e4a8a'), hex('#4a6ab8'), hex('#7a9ad8')];
  const paso = o.anda ? Math.floor(t * 4 + x * 0.1) % 2 : -1, reb = o.anda ? Math.abs(Math.sin(t * Math.PI * 2)) * 1.5 : Math.sin(t * 2.1 + x) * 0.6;
  const X = (i) => Math.round(x + dir * i * s), Y = (j) => Math.round(y - j * s - (o.salto ?? 0) - reb);
  const P = (i, j, c) => { const xx = X(i), yy = Y(j); if (s === 1) pset(xx, yy, c); else rect(Math.min(xx, xx + dir * (s - 1)), yy - s + 1, Math.max(xx, xx + dir * (s - 1)), yy, c); };
  // los brazos largos (el de detrás primero) y las manos de tres dedos; la llave inglesa en la de delante
  const brazo = (lado, hx, hy) => { const sx = lado * 13, sy = 25, n = 12; let mx = 0, my = 0;
    for (let k = 0; k <= n; k++) { const u = k / n, bx = sx + (hx - sx) * u + Math.sin(u * Math.PI) * lado * 2, by = sy + (hy - sy) * u; mx = bx; my = by;
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) P(Math.round(bx + a), Math.round(by + b), Math.abs(a) + Math.abs(b) === 2 ? N[0] : a * dir * lado < 0 ? N[3] : N[2]); }
    for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) if (a * a + b * b <= 5) P(Math.round(mx + a), Math.round(my + b), a * a + b * b > 3 ? N[0] : N[3]);
    for (const [fa, fb] of [[2, -2], [3, 0], [2, 2]]) P(Math.round(mx + fa * lado), Math.round(my + fb), N[1]);
    return [X(Math.round(mx)), Y(Math.round(my))]; };
  const sube = Math.sin(t * 3) * 1.5;
  const [ax, ay, dx, dy] = o.brazos ? [-18, 40 + sube, 18, 40 - sube] : o.mete ? [14, 22 + sube, 22, 20 - sube] : [-16, 8 + sube * 0.3, 16, o.llave ? 14 : 8 - sube * 0.3];
  const atras = brazo(-1, ax, ay);
  // las botazas y las piernas cortas
  for (const [lx, k] of [[-6, 0], [6, 1]]) { const alza = paso === k ? 1 : 0;
    for (let j = 0; j < 7; j++) for (let i = -3; i <= 3; i++) P(lx + i, j + 2 + alza, j < 4 ? A[i > 1 ? 0 : 1] : N[i > 1 ? 1 : 2]);
    for (let j = 0; j < 3; j++) for (let i = -5; i <= 5; i++) { if (j === 2 && Math.abs(i) > 4) continue; P(lx + i + 1, j + alza, j === 2 ? hex('#5a3a2a') : j === 0 ? hex('#1e1612') : hex('#3a2a20')); }
    P(lx - 3, 2 + alza, hex('#8a6a4a')); }
  // el cuerpo de pera: de la cintura (j 10) a la coronilla (j 42)
  const ancho = (j) => { const u = (j - 9) / 33; if (u < 0 || u > 1) return -1; return 15 * Math.sqrt(Math.max(0, 1 - ((u - 0.38) / 0.62) ** 2)) * (1 - 0.32 * Math.max(0, u - 0.38)); };
  for (let j = 9; j <= 42; j++) { const w = ancho(j); if (w < 0) continue; for (let i = -Math.round(w); i <= Math.round(w); i++) {
    const d = Math.hypot(i / (w + 0.5), (j - 26) / 18), luz = (-i * dir) / (w + 1) * 0.6 + (j - 24) / 30; let c = luz > 0.55 ? 3 : luz > -0.1 ? 2 : luz > -0.55 ? 1 : 0;
    if (Math.abs(i) >= Math.round(w)) c = 0; if (d < 0.35 && luz > 0.3 && c === 3 && (i + j) % 7 === 0) c = 4; P(i, j, N[c]); } }
  // los cuernecillos
  for (const cx of [-6, 6]) for (let k = 0; k < 4; k++) { P(cx + Math.sign(cx) * Math.floor(k / 2), 41 + k, k < 2 ? N[1] : N[0]); }
  // el mono de trabajo: el pantalón ancho, el peto, los tirantes con botones, el bolsillo con el trapo
  for (let j = 7; j <= 20; j++) { const w = j < 10 ? 12 : Math.round(ancho(j) - 0.5); for (let i = -w; i <= w; i++) { const luz = (-i * dir) / (w + 1); P(i, j, Math.abs(i) >= w ? A[0] : luz > 0.35 ? A[3] : luz > -0.3 ? A[2] : A[1]); } }
  for (let j = 7; j <= 9; j++) P(0, j, A[0]);
  for (let j = 20; j <= 27; j++) for (let i = -7; i <= 7; i++) P(i, j, Math.abs(i) === 7 ? A[0] : i * dir < -3 ? A[3] : A[2]);
  for (let j = 21; j <= 25; j++) for (let i = -3; i <= 3; i++) P(i, j, i === -3 || i === 3 || j === 21 ? A[1] : A[2]);
  P(-1, 24, hex('#c83a3a')); P(0, 25, hex('#e85a5a')); P(1, 24, hex('#c83a3a'));
  for (const sx of [-1, 1]) { for (let j = 27; j <= 32; j++) { P(sx * (6 + (j - 27) * 0.6), j, A[1]); P(sx * (7 + (j - 27) * 0.6), j, A[0]); } P(sx * 6, 26, hex('#f0c840')); }
  for (let i = -12; i <= 12; i += 6) P(i, 14, A[0]);
  // la cara: los ojillos alegres (arcos), las cejas, la sonrisa enorme con sus dientes cuadrados
  const hab = o.habla ? (Math.floor(t * 8 + x) % 3 === 0 ? 0 : 1) : 0, parp = (t + x * 0.11) % 3.4 < 0.12;
  for (const ex of [3, 10]) { if (parp) { P(ex - 1, 36, f_K); P(ex, 36, f_K); P(ex + 1, 36, f_K); } else { P(ex - 1, 36, f_K); P(ex, 37, f_K); P(ex + 1, 36, f_K); P(ex, 36, f_K); P(ex, 37, f_K); } P(ex - 1, 39, N[0]); P(ex, 39, N[0]); P(ex + 1, 39, N[0]); }
  const bocaY = 31, boca0 = -4, boca1 = 13;
  for (let i = boca0; i <= boca1; i++) { const u = (i - boca0) / (boca1 - boca0), cur = Math.round(Math.sin(u * Math.PI) * 2.5), alto = 2 + hab * 2 + Math.round(Math.sin(u * Math.PI) * 1.5);
    P(i, bocaY - cur + 1, f_K); for (let j = 0; j < alto; j++) P(i, bocaY - cur - j, j === 0 ? hex('#5a1a1a') : hex('#8a2a2a'));
    if (i % 3 !== 0 && i > boca0 && i < boca1) { P(i, bocaY - cur - alto + 1, hex('#fff8e8')); if (hab) P(i, bocaY - cur, hex('#f0e8d8')); }
    P(i, bocaY - cur - alto, f_K); }
  P(boca1 + 1, bocaY + 1, N[1]); P(boca0 - 1, bocaY + 1, N[1]);
  const delante = brazo(1, dx, dy);
  if (o.llave) { const [hx, hy] = delante, ex = hx + dir * 2, ang = Math.sin(t * 4) * 0.3; for (let k = 0; k < 12; k++) { const px_ = Math.round(ex + dir * Math.sin(ang) * k), py_ = Math.round(hy - Math.cos(ang) * k); pset(px_, py_, hex('#c8ccd8')); pset(px_ + dir, py_, hex('#8a90a8')); }
    const tx = Math.round(ex + dir * Math.sin(ang) * 12), ty = Math.round(hy - Math.cos(ang) * 12); rect(tx - 2, ty - 3, tx + 2, ty, hex('#c8ccd8')); pset(tx, ty - 3, hex('#3a3a4a')); pset(tx, ty - 2, hex('#3a3a4a')); pset(tx - 2, ty - 1, hex('#f0f4ff')); }
  return { x, y, cabeza: [X(4), Y(36)], mano: delante, manoAtras: atras };
}

// la mano de esqueleto de 14 px, para los insertos: la misma silueta que la mano canónica (mano() y brazo()), con el
// puño de la manga, los huesos de la muñeca, el pulgar arriba y dos dedos de hueso con sus juntas, separados por la
// sombra. (x, y) y dir como mano(); o.hombro [x0, y0]: el brazo canónico (brazo(), con o.codo y o.manga) hasta la
// muñeca y esta mano encima; sin él, la manga recta de mano() (o.sinManga: solo la mano). Devuelve { x, y, mano }.
const A_MANO_HUESO = [
  '.....kkkkkk...',
  '....kWWdWWWkk.',
  'kkkkWwdddddddk',
  'MMMkwWdWWdWWWk',
  'MMMkWwdddddddk',
  'MMMkwWdWWdWWk.',
  'kkkkkWddddkk..',
  '.....kkkkk....',
];

function a_manoHueso(R, x, y, o = {}) {
  const dir = o.dir ?? 1, manga = o.manga ?? '#2a3458', puno = o.puno ?? '#f6f6ee';
  if (o.hombro) brazo(R, o.hombro[0], o.hombro[1], dir > 0 ? x - 2 : x + 3, y, manga, dir, { codo: o.codo, puno, sombra: o.sombra });
  R.dibujo(A_MANO_HUESO, Math.round(x - (dir > 0 ? 3 : 10)), Math.round(y - 4), dir, { k: hex('#1a1420'), W: hex('#f2ece0'), w: hex('#c8bea8'), d: hex('#3a3040'), M: hex(o.hombro ? puno : manga) });
  if (!o.hombro && !o.sinManga) { const mx = dir > 0 ? x - 3 : x + 3, x0 = Math.min(mx, mx - dir * 40), x1 = Math.max(mx, mx - dir * 40);
    R.rect(x0, Math.round(y - 2), x1, Math.round(y + 2), hex(manga)); R.rect(x0, Math.round(y - 3), x1, Math.round(y - 3), hex('#1a1420')); R.rect(x0, Math.round(y + 3), x1, Math.round(y + 3), hex('#1a1420')); }
  return { x, y, mano: [Math.round(x + dir * 5), Math.round(y)] };
}

// calma un rectángulo [x0, y0, x1, y1] ya pintado (la zona de Atom, la barra del año): baja el contraste hacia la media
// de alrededor (caja de radio 3) y lo oscurece un poco hacia col, con un borde suave de pl px en los lados que no tocan
// el canto de la pantalla. a: cuánto (0–1). Así lo que haya detrás (un tejado, un bisel) se queda como fondo tranquilo.
function a_calma(R, [x0, y0, x1, y1], a = 0.8, col = hex('#1a1426'), oscu = 0.12, pl = 7) {
  const B = R.buf, r = 3, X0 = Math.max(0, x0 - r), X1 = Math.min(319, x1 + r), Y0 = Math.max(0, y0 - r), Y1 = Math.min(179, y1 + r), W = X1 - X0 + 1, Hh = Y1 - Y0 + 1;
  const ch = [0, 8, 16].map(() => new Float32Array(W * Hh)), tmp = new Float32Array(W * Hh);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const c = B[y * 320 + x], k = (y - Y0) * W + x - X0; ch[0][k] = c & 255; ch[1][k] = (c >>> 8) & 255; ch[2][k] = (c >>> 16) & 255; }
  for (const m of ch) { // caja separable: primero en x, luego en y
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { let s = 0, n = 0; for (let d = -r; d <= r; d++) { const xx = x + d; if (xx >= 0 && xx < W) { s += m[y * W + xx]; n++; } } tmp[y * W + x] = s / n; }
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { let s = 0, n = 0; for (let d = -r; d <= r; d++) { const yy = y + d; if (yy >= 0 && yy < Hh) { s += tmp[yy * W + x]; n++; } } m[y * W + x] = s / n; } }
  const cr = col & 255, cg = (col >>> 8) & 255, cb = (col >>> 16) & 255;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.min(x0 > 0 ? x - x0 : 99, x1 < 319 ? x1 - x : 99, y0 > 0 ? y - y0 : 99, y1 < 179 ? y1 - y : 99), w = a * Math.min(1, (d + 1) / pl) * (a_bay(x, y) < 0.9 ? 1 : 0.9);
    const i = y * 320 + x, c = B[i], k = (y - Y0) * W + x - X0, o = oscu * Math.min(1, (d + 1) / pl);
    const f = (v, m, cc) => Math.max(0, Math.min(255, Math.round((v + (m - v) * w) * (1 - o) + cc * o)));
    B[i] = ((c & 0xff000000) | (f((c >>> 16) & 255, ch[2][k], cb) << 16) | (f((c >>> 8) & 255, ch[1][k], cg) << 8) | f(c & 255, ch[0][k], cr)) >>> 0;
  }
}

// la copa de un árbol del jardín en primer término, de cerca: una rama baja que cuelga desde arriba (x 246–276, fuera de
// la zona de Atom) y la copa que asoma por el borde derecho por debajo de y 48 (x 258–320, y 46–96): una masa de hojas a
// contraluz en cuatro tonos, el borde recortado en racimos con el filo encendido por la luz (luna o sol), tres
// mechones de hojas a lo largo de la rama, hojas sueltas que tiemblan y el vaivén del viento. La zona de Atom
// (x 278–318, y 4–44) queda libre: ahí solo se ve el tejado y el cielo, calmados en a_fachada
function a_copaCerca(R, t, P) {
  const T = P.noche ? [hex('#070a16'), hex('#0c1222'), hex('#121a2e'), hex('#1a2438'), hex('#2a3650')] : P.tarde ? [hex('#24142a'), hex('#2e1c34'), hex('#3a2440'), hex('#4a2e4a'), hex('#6a4258')] : [hex('#16301a'), hex('#1e3c20'), hex('#284a28'), hex('#335a30'), hex('#4a7a3a')];
  const vx = Math.sin(t * 0.9) * 1.2 + Math.sin(t * 2.3) * 0.4, vy = Math.sin(t * 0.7 + 1) * 0.6;
  const Rm = P.noche ? hex('#05060e') : hex('#14100c'), Rl = P.noche ? hex('#141a2a') : hex('#3a2a1a');
  // detrás de Atom solo queda el tejado: tranquilo y en sombra, como la barra del año
  a_calma(R, [276, 0, 319, 45], 0.3, P.noche ? hex('#0a0818') : hex('#3a2a48'), 0.38, 6);
  // la rama que baja desde arriba, gruesa y con su filo de luz, hasta la copa de abajo (se mece un poco)
  const rx = (y) => 248 + y * 0.42 + Math.sin(y * 0.15) * 1.5 + vx * (y / 50);
  for (let y = 0; y <= 56; y++) { const x = Math.round(rx(y)), g = y < 20 ? 2 : 1; R.rect(x - g, y, x + 1, y, Rm); R.pset(x + 1, y, Rl); }
  for (const [y0, dx, dy] of [[14, -6, 6], [30, -6, 6], [42, 6, 4]]) { const x0 = Math.round(rx(y0)); R.linea(x0, y0, x0 + dx + Math.round(vx), y0 + dy + Math.round(vy), Rm); }
  // los racimos: la copa de abajo y tres mechones a lo largo de la rama (todos fuera de la zona de Atom)
  const rac = [[266, 54, 8], [276, 50, 7], [290, 50, 8], [304, 49, 8], [316, 50, 7], [262, 66, 7], [272, 78, 9], [286, 88, 8], [300, 92, 8], [314, 90, 8],
    [249, 20, 5], [253, 17, 3], [255, 37, 5], [251, 40, 3], [266, 46, 5]];
  const dentro = (x, y) => (x >= 276 && y >= 56 && y <= 86 && (x - 276) + (86 - y) * 0.3 > 4) || rac.some(([cx, cy, r], k) => Math.hypot(x - cx - vx * (1 + k * 0.08), y - cy - vy) < r + Math.sin(x * 0.9 + y * 1.3 + k) * 1.2);
  const luzX = P.noche ? 1 : -1;   // de noche la luna da por la izquierda alta; de día el sol por la derecha
  for (let y = 8; y <= 102; y++) for (let x = 230; x < 320; x++) {
    if (x >= 277 && y <= 45) continue;
    if (!dentro(x, y)) continue;
    const arriba = !dentro(x, y - 1), borde = !dentro(x - 1, y) || !dentro(x + 1, y) || !dentro(x, y + 1) || arriba;
    const hoja = h((x + Math.round(vx)) >> 1, (y + Math.round(vy)) >> 1, 300), hoja2 = h(x >> 2, y >> 2, 302);
    if (borde) { R.pset(x, y, arriba && hoja > 0.35 ? T[4] : T[0]); continue; }
    const luz = -(y - 46) * 0.02 + (luzX > 0 ? -(x - 260) : (x - 260)) * 0.006 + (hoja2 > 0.7 ? 0.5 : 0);
    R.pset(x, y, a_rampa(T, 1.6 + luz + (hoja - 0.5) * 1.4, x, y));
    if (hoja > 0.93) R.pset(x, y, T[4]);   // brillos de hoja
  }
  // hojas sueltas que tiemblan en el borde de la copa y una que cae despacio (fuera de la zona de Atom)
  for (let k = 0; k < 11; k++) { const a = h(k, 1, 301) * Math.PI * 1.4 + Math.PI * 0.6, r = 26 + h(k, 2, 301) * 8, x = Math.round(292 + Math.cos(a) * r * 1.2 + vx * 1.5), y = Math.round(72 + Math.sin(a) * r * 0.9 + vy + Math.sin(t * 3 + k) * 0.6);
    if ((x >= 276 && y <= 46) || y < 0 || x > 319) continue; R.pset(x, y, T[3]); R.pset(x + 1, y, T[2]); R.pset(x, y + 1, T[1]); }
  const fa = (t * 0.09) % 1, hx = Math.round(270 - fa * 40 + Math.sin(t * 2.1) * 4), hy = Math.round(96 + fa * 60);
  R.pset(hx, hy, T[4]); R.pset(hx + (Math.sin(t * 4) > 0 ? 1 : -1), hy, T[3]);
}

// la puerta del porche abierta hacia dentro (u 0–1), en la caja [x0, y0, x1, y1] y con el rellano en ry: el vestíbulo
// oscuro con la luz verde del laboratorio que late al fondo (una puerta lejana encendida, la escalera que sube en
// sombra, el suelo de baldosas en perspectiva y motas de polvo en la luz), las dos hojas que giran y se estrechan con su
// cara de dentro en sombra, el filo de luz en el marco y el charco verde que se derrama por el felpudo y la escalinata
function a_puertaAbierta(R, t, P, [x0, y0, x1, y1], ry, u) {
  const late = 0.75 + Math.sin(t * 4.2) * 0.17 + Math.sin(t * 11.3) * 0.05, mid = (x0 + x1) / 2, w = x1 - x0, hh = y1 - y0;
  const VE = [hex('#040a06'), hex('#08160c'), hex('#0e2614'), hex('#18401e'), hex('#2a6a30'), hex('#4aa84a'), hex('#9af08a')];
  const fx = Math.round(mid + 3), fy0 = y0 + Math.round(hh * 0.38), fy1 = y1 - Math.round(hh * 0.22);   // la puerta lejana
  R.recorte([x0 + 1, y0 + 1, x1 - 1, y1]);
  for (let y = y0 + 1; y <= y1; y++) for (let x = x0 + 1; x < x1; x++) {
    const dl = Math.hypot((x - fx) / 9, (y - (fy0 + fy1) / 2) / 12), suelo = y > fy1;
    let i = 1.1 + Math.max(0, 1.6 - dl) * 1.6 * late + (suelo ? 0.5 + (y - fy1) / (y1 - fy1 + 1) * 0.9 * late : 0) - (y - y0) / hh * 0.2;
    if (suelo) { const v = (x - fx) / (y - fy1 + 2), lin = Math.abs((v * 4) - Math.round(v * 4)) < 0.12 || (y - fy1) % 4 === 0; if (lin) i -= 0.7; }
    R.pset(x, y, a_rampa(VE, i, x, y));
  }
  // la puerta lejana encendida, con el marco y una silueta de matraz en la luz
  R.rect(fx - 4, fy0, fx + 4, fy1, VE[1]); R.rect(fx - 3, fy0 + 1, fx + 3, fy1, a_rampa(VE, 4.6 + late, fx, fy0)); for (let y = fy0 + 1; y <= fy1; y++) for (let x = fx - 3; x <= fx + 3; x++) R.pset(x, y, a_rampa(VE, 4.2 + late * 1.6 - Math.abs(x - fx) * 0.25, x, y));
  R.rect(fx + 1, fy1 - 5, fx + 2, fy1 - 2, VE[2]); R.pset(fx + 1, fy1 - 6, VE[2]); R.rect(fx, fy1 - 2, fx + 3, fy1 - 1, VE[2]);
  // la escalera que sube a la izquierda, en sombra, con la barandilla
  for (let k = 0; k < 7; k++) { const sx = x0 + 2 + k * 3, sy = y1 - 2 - k * 3; if (sx > fx - 6) break; R.rect(sx, sy, sx + 3, y1, VE[0]); R.rect(sx, sy, sx + 3, sy, VE[2]); }
  R.linea(x0 + 2, y1 - 9, Math.min(fx - 6, x0 + 20), y1 - 27, VE[3]);
  // motas de polvo que flotan en la luz
  for (let k = 0; k < 7; k++) { const p = (t * 0.13 + h(k, 1, 290)) % 1, mx = Math.round(fx - 8 + h(k, 2, 290) * 16 + Math.sin(t * 0.9 + k) * 2), my = Math.round(y1 - 2 - p * (hh - 6)); if (Math.sin(t * 2.3 + k * 1.7) > -0.2) R.pset(mx, my, VE[6]); }
  // las dos hojas: giran hacia dentro, se estrechan y la cara de dentro queda en sombra
  const hw = w / 2 - 1, lw = Math.max(2, Math.round(hw * (1 - u * 0.82))), enc = Math.round(u * 3);
  const M = [hex('#1e0e08'), hex('#3a1c10'), hex('#5a2e1a'), hex('#7a4426')];
  for (const sd of [-1, 1]) { const ex = sd < 0 ? x0 + 1 : x1 - 1, fr = ex - sd * lw;   // bisagra en el marco, el filo libre hacia dentro
    for (let x = Math.min(ex, fr); x <= Math.max(ex, fr); x++) { const f = Math.abs(x - ex) / Math.max(1, lw), top = Math.round(y0 + 1 + f * enc), bot = Math.round(y1 - f * enc);
      for (let y = top; y <= bot; y++) { const borde = x === fr || y === top || y === bot, panel = (Math.abs(f - 0.5) < 0.32) && ((y - y0) % 13 > 2 && (y - y0) % 13 < 11);
        R.pset(x, y, borde ? hex('#0c0604') : a_rampa(M, 1.9 - u * 0.9 - f * 0.5 + (panel ? -0.5 : 0), x, y)); } }
    R.pset(fr, Math.round((y0 + y1) / 2), hex('#c8a040')); }   // el pomo
  R.recorte(null);
  // el filo de luz verde en el marco y el charco que se derrama por el felpudo y la escalinata
  const L = hex('#8af07a'), gl = u * (0.32 + 0.12 * late);
  for (let y = y0 + 2; y <= y1; y += 1) for (const x of [x0, x1]) if (a_bay(x, y) < gl * 1.6) R.pset(x, y, a_mezcla(R.pget(x, y), L, 0.5));
  for (let y = y1 + 1; y <= Math.min(179, y1 + 30); y++) { const d = y - y1, half = (w / 2) * (0.45 + u * 0.55) + d * 0.8, a = gl * Math.max(0, 1 - d / 30) * 0.8;
    for (let x = Math.round(mid - half); x <= Math.round(mid + half); x++) { const e = 1 - Math.abs(x - mid) / (half + 1); if (a_bay(x, y) < a * (0.6 + e)) R.pset(x, y, a_mezcla(R.pget(x, y), L, 0.28 + 0.2 * e)); } }
}

// dibuja(): lo que pinte fuera de la caja [x0, y0, x1, y1] se deshace (R.rect no respeta R.recorte: así los avatares y
// las miniaturas de los mensajes que suben no pisan la barra ni el marco); copia la pantalla y repone solo lo de fuera
function b_dentroDe(R, caja, dibuja) {
  const B = R.buf, W = 320, antes = B.slice(), [x0, y0, x1, y1] = caja.map(Math.round);
  dibuja();
  for (let y = 0; y < 180; y++) { const fuera = y < y0 || y > y1; for (let x = 0; x < W; x++) if (fuera || x < x0 || x > x1) B[y * W + x] = antes[y * W + x]; }
}
