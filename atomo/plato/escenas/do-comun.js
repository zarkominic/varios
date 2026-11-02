// Fontanería y decorados del episodio 19 (Avengers: Doomsday: todo lo que hay que saber antes del estreno, 2019–2026) en el
// estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el lago y la batalla de 2019, B la
// oficina del tiempo, C el multiverso (santuario, Nueva York nevada, el consejo de la Tierra 838) y D el cosmos (las Tierras
// con número, los choques, el reino cuántico), E el escenario (el auditorio de la Comic-Con, el plató de las sillas, la rueda
// de prensa), F el Vacío y la mansión de los mutantes, G Washington y la torre, H la Tierra de los años sesenta e I Latveria
// y la casa de los 4, J hoy (el cine, el cuarto del fan) y K el mundo (Wakanda, Nueva York de hoy); más la pieza del hilo de
// gags: el cubo de palomitas con ojos.
// Los héroes son los de ELENCO_DO y PIEZAS_DO (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos, SIN
// logos, letras ni nada copiado de las películas. Sin destripes. Nada morboso: el chasquido y las desapariciones, con luz y
// polvo de colores.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas,
// butacas) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores» (en el 18,
// el orden de dibujo fue el fallo número uno). La esquina de Atom (x 278–318, y 4–44), siempre tranquila.
//
//   import * as T from '/atomo/plato/escenas/do-comun.js';
//   const { E, R, M } = await T.preparar('do-gancho');
//   T.rodar(E, R, [[0, (t) => T.lago(R, t, { encuadre: 'batalla' })]], { año: 2019 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, PIEZAS_DO, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, PIEZAS_DO };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la batalla y el lago: ruinas, humo, el atardecer naranja, el agua del lago
    ruina: '#6a6470', ruinaS: '#3e3a46', humo: '#8a8494', atardecer: '#e8904a', lagoA: '#3a6a9a', lagoL: '#7ab0d8',
    // la oficina del tiempo: marrones y naranjas de los setenta, el ámbar de las pantallas, el dorado de la línea sagrada
    tvaM: '#8a5a30', tvaN: '#d8783a', ambar: '#f0b040', lineaO: '#ffd860',
    // el multiverso y el cosmos: el naranja de los hechizos, el azul del espacio, los colores de las Tierras
    runa: '#ffb040', espacio: '#0e1430', espacioL: '#2a3a7a', nebulosa: '#8a3ab0', cuantico: '#e05ab0',
    // el escenario: butacas rojas, focos, la pantalla gigante
    butaca: '#a8283a', foco: '#fff0b0', pantallaG: '#1a1e2a',
    // el Vacío: arena rojiza y restos; los sesenta: pastel, cromo y turquesa; Latveria: piedra gris y verde
    vacio: '#c87a4a', vacioS: '#8a4a2a', pastel: '#f0c8a0', cromo: '#d0d8e0', turquesa: '#3ab0a8', latveria: '#6a7068', verdeDoom: '#2a6a3a',
    // Wakanda: oro y verde selva; hoy: el azul de las pantallas
    wakandaO: '#d8a830', selva: '#2a7a4a', pantallaHoy: '#4a8ae8',
    // las palomitas: cubo de rayas rojas y blancas, palomitas mantequilla
    rayaR: '#d82a2a', rayaB: '#f6f2ea', palomita: '#fff4c8', palomitaS: '#e8c870',
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
  const E = await escena(id, 'ep19');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: la gema (2019–2023) y la máscara de Doom (2024–2026)
  Object.assign(R.ICONOS, {
    gema: ['...#...', '..###..', '.#####.', '#######', '.#####.', '..###..', '...#...'],
    mascara: ['.#####.', '#######', '##.#.##', '#######', '#.###.#', '#.#.#.#', '.#####.'],
  });
  R.tramosTiempo([[2019, 2023, R.PALA.ORO, 'gema'], [2024, 2026, R.PALA.VERDE ?? R.PALA.AZUL, 'mascara']]);
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

// ── A · El lago y la batalla de 2019 ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'batalla': un campo de batalla en ruinas tras la gran pelea: un edificio derrumbado, cráteres, humo que sube, restos
//     de naves, cielo naranja; o.destello (0–1): el destello blanco del chasquido llena el plano y el ejército del fondo se
//     deshace en polvo de colores (sin cuerpos, nada morboso); o.luz 'dia' o 'noche'; o.camara 'general' o 'pedestal' (de
//     noche, una armadura roja y dorada sobre un pedestal entre las ruinas, con una vela de homenaje).
//   'campo': un campo de flores y pájaros junto a una cabaña en un planeta verde; o.polvo (0–1): la mitad de las flores y
//     de los pájaros se deshace en polvo de luz; o.camara 'general' o 'cerca'.
//   'laboratorio': el garaje-laboratorio junto al lago: la plataforma circular del tiempo con sus luces, ordenadores,
//     trajes colgados, herramientas; o.viaje (0–1): destellos en la plataforma; tres relojes en una pizarra (2012, 2013,
//     2014, 1970 con R.numero); o.camara 'general' o 'estuche' (el estuche abierto con las seis gemas y el martillo).
//   'cocina': una cocina de los años cuarenta, de noche: radio de válvulas, nevera redonda, ventana con la calle; o.camara
//     'general' o 'radio' (sitio para que una pareja baile despacio).
//   'lago': un lago al atardecer con un muelle, juncos, árboles y un banco de madera de frente; o.camara 'general' o
//     'banco' (el banco de cerca para un anciano y otro personaje de pie); o.ramas (0–1): un árbol de luz en el cielo.
// Delante: lagoDelante(R, t, o) con el respaldo del banco y la barandilla del laboratorio: llama a lagoDelante después
// de los actores. Devuelve { suelo, … } según el encuadre.
export function lago(R, t, o = {}) {
  provisional(R, t, C.ruinaS, C.atardecer);
  return { suelo: 160 };
}
export function lagoDelante(R, t, o = {}) {}

// ── B · La oficina del tiempo ─────────────────────────────────────────────────────────────────────────────────────────
// Una burocracia retro de los años setenta que vigila el tiempo (nuestra, sin logos). o.encuadre:
//   'oficina': una nave enorme de oficinas: filas de mesas con máquinas de escribir, archivadores, tubos neumáticos con
//     cápsulas que pasan, relojes grandes en las paredes, lámparas naranjas, moqueta marrón, agentes al fondo; o.camara
//     'general' o 'pantalla' (un monitor ámbar grande con UNA línea del tiempo dorada recta; o.ramas 0–1 la ramifica).
//   'arbol': un vacío oscuro donde flota la línea del tiempo como una rama de luz; o.ramas (0–1) le brotan ramas de
//     colores, cada una con un mundito al final; o.camara 'general' o 'poda' (un tramo de rama de cerca con sitio para un
//     agente con tijeras de podar).
//   'fin': el fin del tiempo: un castillo flotante en el vacío con un despacho de madera y un gran ventanal; o.telar (0–1)
//     un telar gigante de luz que se rompe; o.camara 'general' o 'trono' (un trono en el centro de un árbol de ramas de luz
//     que suben, sitio para Loki sentado).
// Delante: tiempoDelante(R, t, o) con las mesas de la oficina: llama a tiempoDelante después de los actores.
export function tiempo(R, t, o = {}) {
  provisional(R, t, C.tvaM, C.tvaN);
  return { suelo: 160 };
}
export function tiempoDelante(R, t, o = {}) {}

// ── C · El multiverso ─────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'santuario': el santuario de un hechicero en Nueva York: escalera, vidriera redonda, libros, reliquias, velas; o.hechizo
//     (0–1): un círculo de runas doradas que se tuerce; o.portal (0–1): un portal de chispas naranjas; o.luz 'dia'/'noche';
//     o.camara 'general' o 'portal' (el portal de cerca).
//   'nieve': Nueva York de noche con nieve: calles, rascacielos, farolas, coches con nieve; o.grieta (0–1): una grieta de
//     luz se abre en el cielo; o.camara 'general' o 'calle' (una calle de cerca con escaparates).
//   'consejo': una sala blanca y solemne en otra Tierra: columnas, suelo pulido, sillas altas en semicírculo para un
//     consejo de héroes; o.camara 'general' o 'jueces' (las sillas altas de cerca).
// Delante: multiversoDelante(R, t, o) (la barandilla del santuario): llama a multiversoDelante después de los actores.
export function multiverso(R, t, o = {}) {
  provisional(R, t, C.espacio, C.runa);
  return { suelo: 160 };
}
export function multiversoDelante(R, t, o = {}) {}

// ── D · El cosmos ─────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'espacio': el espacio con nebulosas y estrellas en capas; varias Tierras, cada una con su número (o.numeros: lista de
//     cifras para R.numero, por ejemplo [616, 838, 828]; o.foco: índice de la Tierra grande); o.choque (0–1): dos planetas
//     se acercan y chocan con un destello (de cuento, sin destrucción gráfica); o.camara 'general' o 'choque' (los dos
//     planetas de cerca).
//   'cuantico': un reino microscópico de colores: burbujas, células gigantes, una ciudad de cristal al fondo, cielo rosa y
//     violeta; o.camara 'general' o 'ciudad'.
export function cosmos(R, t, o = {}) {
  provisional(R, t, C.espacio, C.nebulosa);
  return { suelo: 160 };
}

// ── E · El escenario ──────────────────────────────────────────────────────────────────────────────────────────────────
// Tres encuadres con dos cámaras cada uno (o.encuadre, o.camara). Ninguno lleva letras: los rótulos, las pancartas y los
// respaldos se insinúan con barras, pictogramas (escudo, martillo, cuernos, máscara, corazón) y números.
//   'auditorio' (por omisión): el pabellón de la Comic-Con de noche. o.camara 'general': techo con la cercha de focos
//     móviles (haces tramados que barren el escenario y dejan su charco de luz), banderolas con pictogramas, la pantalla
//     gigante (x 92–228, y 22–84) con su resplandor, dos pantallas laterales que repiten la imagen, los altavoces, la mesa
//     del panel con micrófonos y botellas, el escenario de tablas (suelo y = 106) con su tira de luz que corre, el foso con
//     la valla y dos de seguridad que pasean, y el público en tres filas de espaldas (peinados, gorras, disfraces de
//     cuernos, máscara roja, capucha verde y casco alado; pancartas con pictogramas y un «3000», móviles que graban).
//     o.camara 'pantalla': la pantalla de cerca (x 36–244, y 16–112) entre telones de terciopelo, el escenario de tablas
//     con el reflejo de la pantalla (suelo y = 146, sitio para dos o tres), cuñas de monitor, una torre de altavoces y una
//     fila de cabezas abajo.
//     o.pantalla: lo que se ve en la gigante (y en las laterales): 'mascara' (la máscara de metal con la capucha verde,
//     con un brillo que la recorre), 'titulo' (un rótulo de barras de metal con su destello, sin letras), 'fechas' (dos
//     hojas de calendario con o.numeros, por omisión ['2026', '2027'], y una flecha), 'casco' (un villano de casco azul con
//     aletas laterales delante de un trono), 'flecha' (la máscara, una flecha que crece y un cartel con la máscara) o nada
//     (un fondo cósmico con anillos que laten). o.glitch (0–1): interferencias para el cambio de imagen.
//     o.ovacion (0–1): el público se levanta en ola, levanta los brazos, las pancartas y los móviles.
//   'plato': el plató a oscuras del directo de las sillas. o.camara 'general': la parrilla de focos, telones, el ciclorama,
//     el suelo negro brillante con marcas de cinta y cables, y la fila de sillas de director (respaldos de lona sin letras)
//     que va de abajo a la izquierda (x 40, y 172) al punto de fuga (x 252, y 90) y no se acaba: cada silla con su haz y
//     su charco de luz, y la cámara avanza despacio (o.dolly: velocidad, 0.12 por omisión; 0 la para); al fondo, un técnico
//     que cruza y una grúa de cámara con su piloto. o.camara 'silla': la última silla de cerca (x 168, suelo 154), con una
//     capa verde colgada del respaldo (o.capa: false la quita), un haz fuerte con motas y la fila que se pierde a la
//     izquierda. o.contador: el número del panel de LED colgado (R.numero grande, ámbar); sin él, el panel muestra el
//     piloto rojo del directo y un reloj que corre.
//   'prensa': una rueda de prensa en un salón de hotel: el fondo de paneles con emblemas repetidos (barras y máscara, sin
//     letras) y su caída de luz, dos expositores enrollables con la máscara y 2026, una mesita con botellas, la tarima
//     (suelo y = 122) y la moqueta; la cámara de televisión con su piloto y una fila de fotógrafos de espaldas con flashes.
//     o.camara 'general' o 'cerca' (los emblemas y el atril más grandes; suelo y = 150). o.flashes (0–1, 0.5 por omisión):
//     cuántos flashes saltan; el atril (x 146–174, tapa en y = 112; de cerca x 138–182, tapa en y = 140) lo pinta
//     escenarioDelante: quien habla se pone en x ≈ 153 y asoman su cabeza y sus hombros.
// Delante: escenarioDelante(R, t, o) (mismas opciones): la fila de cabezas más cercana del auditorio (con brazos en la
// ovación y móviles), y en la prensa el atril con el ramillete de micrófonos y la primera fila de fotógrafos con sus
// cámaras y flashes; en el plató general, el pie de un foco en primer plano a la izquierda. Llama a escenarioDelante
// después de los actores. Devuelve { suelo, ... } (ver la geometría en cada encuadre).
export function escenario(R, t, o = {}) {
  const enc = o.encuadre ?? 'auditorio', cam = o.camara ?? 'general';
  if (enc === 'plato') return cam === 'silla' ? e_platoSilla(R, t, o) : e_platoGeneral(R, t, o);
  if (enc === 'prensa') return e_prensa(R, t, o, cam === 'cerca');
  return cam === 'pantalla' ? e_audPantalla(R, t, o) : e_audGeneral(R, t, o);
}
export function escenarioDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'auditorio', cam = o.camara ?? 'general';
  if (enc === 'plato') { if (cam !== 'silla') e_pieFoco(R, t); return; }
  if (enc === 'prensa') { e_atril(R, t, cam === 'cerca'); e_prensaDelante(R, t, o, cam === 'cerca'); return; }
  if (cam === 'pantalla') e_filaPublico(R, t, { y: 176, r: 10, dx: 26, x0: 6, f: 9, u: (o.ovacion ?? 0) * 0.6, luz: EP.bordeF, carteles: false });
  else e_filaPublico(R, t, { y: 175, r: 9, dx: 23, x0: 4, f: 3, u: (o.ovacion ?? 0) * 0.6, luz: EP.bordeC, carteles: false });
}
// ── F · El Vacío y la mansión ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'vacio' (por omisión): un desierto rojizo bajo un cielo de tormenta tramado (tres capas de nubes a tres velocidades,
//     relámpagos lejanos con su fogonazo, polvo que vuela), lleno de restos gigantes de otros universos: en el horizonte,
//     en la bruma, una cúpula rota, un rascacielos hundido y torcido, la fortaleza pequeña con sus banderas, una noria
//     medio enterrada y la proa de una nave clavada; en el medio, una cabeza de estatua coronada enorme medio enterrada
//     (piedra con grietas), un letrero de bombillas sin letras (flecha y estrella, las bombillas se persiguen) y un coche
//     de los cincuenta volcado; delante, un semáforo hundido que parpadea en ámbar, una viga torcida, un tapacubos y
//     piedras. Vida: rodadora que cruza, ráfagas de arena, chatarreros diminutos en el horizonte, cuervos que planean.
//     o.camara:
//       'general': el desierto entero (suelo 160; sitio libre x 96–214).
//       'restos': otra cámara, más baja y cerca, al pie de la cabeza gigante (a la derecha, enorme) y del coche volcado (a
//         la izquierda, grande); el letrero al fondo (suelo 164; sitio libre x 98–196).
//       'fortaleza': la fortaleza en ruinas hecha de restos, de cerca: torres de contenedores, muro de chapas, puertas de
//         coche y tablones, un autobús empotrado, una valla publicitaria sin letras, la puerta de vigas con el rastrillo,
//         banderas de trapo, bidones con fuego y humo, vigías que pasean por el adarve (suelo 166; puerta x 136–184).
//     o.portal (0–1): se abre un portal de chispas naranjas (un óvalo que gira) en o.portalEn [x, y] (por omisión
//       [150, 138] en 'general', [146, 140] en 'restos', [160, 128] en 'fortaleza'): 0 cerrado, 1 abierto del todo.
//     o.relampagos (por omisión true): false quita los relámpagos (para planos con mucho diálogo).
//   'mansion': una mansión de escuela de otra época: fachada de ladrillo con hiladas y llagas, piedra en las esquinas y
//     cornisas, tejado de pizarra con buhardillas y chimeneas que humean, el pórtico de columnas con frontón, ventanas de
//     guillotina con cortinas (alguien se asoma), hiedra; el jardín con el césped a franjas, setos, robles que se mecen,
//     el camino de grava, la fuente con agua que cae y ondas, y al fondo a la derecha el hangar con un avión negro a medio
//     salir (luz que parpadea); cielo tramado con nubes de tres tonos a tres velocidades y pájaros; alumnos diminutos que
//     pasan y un jardinero.
//     o.camara:
//       'general': la mansión entera (suelo 166; sitio libre x 24–196, la fuente en x 214–262).
//       'cerca': la escalinata de piedra con su barandilla de balaustres y jarrones, la puerta doble con el montante de
//         abanico, faroles, ventanas a los lados (suelo 166: sitio para 6 personajes en fila, x 52–268 cada ~40 px).
//     o.luz: 'dia' (por omisión) o 'tarde' (otra luz: cielo de atardecer, ladrillo cálido, ventanas y faroles encendidos).
// Devuelve { suelo, libre: [x0, x1], ... } (y puerta, portal, fuente, escalones según el encuadre).
export function vacio(R, t, o = {}) {
  if ((o.encuadre ?? 'vacio') === 'mansion') return f_mansion(R, t, o);
  return f_vacio(R, t, o);
}
// ── G · Washington y la torre ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'torre' (por omisión): la sala de control en lo alto de una torre de cristal de Nueva York. Techo de grafito con
//     focos, dos ventanales de suelo a techo con parteluces y sus reflejos (fuera: cielo tramado con nubes de tres tonos a
//     tres velocidades, sol o luna, la otra orilla, el río con barcos, rascacielos con depósitos de agua y antenas que
//     parpadean, un helicóptero, un avión, pájaros; de noche, ventanas encendidas que titilan y estrellas); en medio, la
//     pared de pantallas: la pantalla grande (o.pantalla: 'tierra' = la Tierra que gira con el 616 en cian; 'nave' = alerta
//     roja: una nave con un «4» enorme sale de un portal hacia la Tierra, con mira y triángulos de aviso, y se encienden
//     las balizas rojas de la sala; 'apagada'; sin nada, un globo de alambre en espera), dos monitores con gráficas y radar,
//     un armario de servidores con pilotos y una planta. Consolas con monitores animados y sillas de oficina a los dos
//     lados; suelo pulido de losas con el reflejo del cielo y de la pantalla y, de día o al atardecer, la luz del sol.
//     Un técnico pequeño teclea de espaldas en la consola de la izquierda (o.gente: false lo quita).
//     o.polvo: la sala abandonada: sillas apartadas y una volcada, planta seca, telaraña con su araña que sube y baja,
//     polvo y huellas en el suelo, una pelusa que rueda, motas en la luz, monitores apagados y la pantalla que parpadea.
//     o.luz: 'dia' (por omisión), 'atardecer' o 'noche' (la «otra luz»).
//     o.camara 'general': sala entera con la mesa redonda en medio (la mesa y las sillas de delante, en washingtonDelante);
//     'mesa': más cerca, la pared de pantallas grande y la mesa redonda llenando la parte de abajo (sitio para 6 detrás).
//   'despacho': un despacho presidencial ovalado inventado (sin escudos ni sellos): cornisa con dentículos, papel de rayas
//     suaves, zócalo de cuarterones, tres ventanales con el jardín (cielo con nubes, sol, arboleda, un pórtico blanco, una
//     fuente que salta, setos, rosales, un jardinero que pasea, una ardilla, pájaros y dos árboles que se mecen), cortinas
//     doradas que mece el aire y su bambalina, dos banderas genéricas colgadas (rayas con el cantón liso, sin estrellas; y
//     una azul lisa con flecos), la alfombra ovalada con un sol de rayos en el centro, la luz del sol con motas.
//     o.luz 'dia' | 'atardecer'. o.camara 'general': el despacho entero, el escritorio al fondo con su sillón, a la
//     izquierda un paisaje con su lamparita y una consola con un caballo de bronce, a la derecha la puerta con frontón y
//     el reloj de pie con su péndulo; delante (washingtonDelante) dos sofás de rayas y la mesita con manzanas.
//     'cerca': el escritorio de cerca (en washingtonDelante) con el sillón detrás, estantería con libros sin letras,
//     mesita con lámpara y fotos, aplique, helecho.
//   'celda': una prisión blanca y futurista: techo de hexágonos, paneles con juntas y una ranura de luz cian, pasarela con
//     guardias pequeños que pasan, cámaras que giran, puerta corredera con su piloto, un monitor de constantes, el
//     interfono en su pedestal (o.habla: su luz parpadea) y una celda de cristal sobre una peana con su franja de aviso;
//     detrás, una pantalla con planetas que orbitan y uno que late en rojo. Un robot aspirador cruza el suelo.
//     o.camara 'general' (la celda entera a la derecha, sitio fuera a la izquierda) o 'cerca' (el cristal ocupa la mitad
//     derecha, con la pantalla de planetas en la pared del fondo de la celda, detrás del preso).
// Delante: washingtonDelante(R, t, o) pinta lo que va por delante de los actores: en la torre, la mesa redonda (con el
// anillo de luz, tabletas y tazas; con polvo, gris y con papeles) y las sillas de delante; en el despacho, los sofás y la
// mesita ('general') o el escritorio ('cerca'); en la celda, el cristal (reflejos, el brillo que pasa, los agujeros para
// hablar y los postes). Llama a washingtonDelante después de los actores. Devuelve { suelo, … } (ver cada encuadre).
export function washington(R, t, o = {}) {
  const enc = o.encuadre ?? 'torre', cam = o.camara ?? 'general';
  if (enc === 'despacho') return g_despacho(R, t, cam, o.luz === 'atardecer' ? 'atardecer' : 'dia', o);
  if (enc === 'celda') return g_celda(R, t, cam, o);
  return g_torre(R, t, cam, G_LUZ[o.luz] ? o.luz : 'dia', o);
}
export function washingtonDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'torre', cam = o.camara ?? 'general';
  if (enc === 'despacho') g_despachoDelante(R, t, cam, o);
  else if (enc === 'celda') g_celdaDelante(R, t, cam, o);
  else g_torreDelante(R, t, cam, o);
}
// ── H · La Tierra de los años sesenta ────────────────────────────────────────────────────────────────────────────────
// Una Nueva York retrofuturista de los sesenta (la Tierra 828): coches con aletas, monorraíl, robots, tonos pastel, cromo y
// turquesa, vivos. Cielos tramados con cirros y cúmulos de tres tonos a tres velocidades, pájaros y confeti.
// o.encuadre:
//   'ciudad' (por omisión): la avenida en fiesta. Al fondo, rascacielos pastel con antenas, agujas y una torre-platillo
//     entre la bruma; un dirigible a rayas; el monorraíl elevado con su tren de tres coches que cruza; una fila de
//     edificios de cuatro plantas (ladrillo rosa, menta con bandas de cromo, mantequilla con arcos, lila de cristal,
//     melocotón con escalera de incendios) con toldos a rayas, escaparates con género, gente que saluda y tira confeti
//     desde las ventanas, banderines que ondean; el público en la acera (niños a hombros, globos, banderitas lisas);
//     farolas atómicas y guirnaldas de banderines; la calle con confeti, y el desfile: robots de hojalata que marchan con
//     tambor y trompeta, la carroza (falda turquesa con estrellas, festón rosa, cohete de cromo en la proa con su humo,
//     estrella atómica con un 4 en la popa, globos) y un descapotable con aletas detrás; espectadores de espaldas abajo.
//     o.camara 'general' o 'desfile' (la carroza de cerca, con sitio para cuatro héroes en la cubierta, la fachada de
//     ladrillo con vecinos en las ventanas, la menta con aletas de cromo, la torre-platillo y el monorraíl a la derecha,
//     el público tras la valla de cromo).
//     o.carroza: x del centro de la carroza (160); o.avance: px/s a los que avanza el desfile (0: parado, las ruedas
//     quietas; con avance, los robots y el coche la siguen); o.confeti (0–1, 1): cuánto confeti cae; o.cuatro (true): el 4
//     de la estrella atómica.
//   'cielo': la ciudad vista desde una azotea con el cielo enorme. o.camara 'general' (la azotea entera: depósito de agua
//     de madera, palomar con palomas, antena de televisión, extractor que gira con vapor, un robot que barre; al fondo los
//     tejados, la ciudad pastel y el monorraíl) o 'familia' (la azotea de cerca: tarima, tumbona con sombrilla, mesita
//     con radio y limonadas, un robot mayordomo, palmera en maceta de cromo, barandilla de cromo al fondo).
//     o.gigante (0–1): Galactus (PIEZAS_DO.galactus a escala 5 en 'general', 6 en 'familia', con luz de contorno, sombreado
//     tramado, bruma, ojos que brillan y chispas de energía) asoma detrás de la ciudad y tapa el sol: el cielo vira a
//     morado, sale la corona de rayos del sol tras su cabeza y un aura; la gente de las azoteas lo señala y los pájaros
//     huyen. o.portal (0–1): se abre un portal azul en espiral a la izquierda. o.expulsa (0–1): Galactus sale volando
//     hacia el portal, se encoge y desaparece en él (con o.portal a 1).
// Devuelve { suelo (donde se plantan los pies de los héroes), calle, carroza: { x0, x1, cubierta }, galactus: { x, y, s }
// (la cara), portal: [x, y, r], sol: [x, y] } (lo que no aplica, null). Delante (opcional, después de los actores):
// h_confeti(R, t, { n }) con el confeti que cae por delante en la avenida.
export function sesenta(R, t, o = {}) {
  const enc = o.encuadre ?? 'ciudad', cam = o.camara ?? 'general';
  if (enc === 'cielo') return h_azotea(R, t, o, cam === 'familia');
  return cam === 'desfile' ? h_desfile(R, t, o) : h_avenida(R, t, o);
}
// ── I · Latveria y la casa de los 4 ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'castillo': un castillo de piedra gris con banderas verdes (sin escudos) sobre un pueblo europeo de montaña;
//     o.vinetas (0–1): viñetas de cómic antiguo flotan con un 1962; o.camara 'general' o 'vinetas'.
//   'cuarto': un cuarto infantil de los sesenta retrofuturista: cuna, móvil de planetas, juguetes, ventana con el
//     monorraíl; o.camara 'general' o 'puerta' (la puerta entreabierta, vista desde dentro).
export function latveria(R, t, o = {}) {
  provisional(R, t, C.latveria, C.verdeDoom);
  return { suelo: 160 };
}

// ── J · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cine': una sala de cine de noche: butacas rojas en filas, pasillo con luces, la pantalla grande (o.pantalla:
//     'mascara', 'martillo', 'choque', 'reloj' con R.numero, 'doom', o nada), proyector con su haz; o.luces (0–1); o.camara
//     'general' o 'pantalla' (la pantalla de cerca, con dos filas de butacas delante).
//   'cuarto': el cuarto de un fan: pósteres sin letras (un escudo, unos cuernos, un guante), estantería con cajas de
//     película con iconos, figuras, un mapa en la pared con líneas, Tierras con números y una máscara (o.mapa 0–1 lo
//     completa); o.camara 'general' o 'estanteria'.
// Delante: hoyDelante(R, t, o) con las butacas de delante del cine y el escritorio del cuarto: llama a hoyDelante
// después de los actores.
export function hoy(R, t, o = {}) {
  provisional(R, t, C.pantallaG, C.pantallaHoy);
  return { suelo: 160 };
}
export function hoyDelante(R, t, o = {}) {}

// ── K · El mundo de hoy ──────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'wakanda': una ciudad de torres doradas y verdes entre selva y cascadas, con trenes flotantes; o.camara 'general' o
//     'agua' (la orilla de un río con sitio para que alguien salga del agua).
//   'nyhoy': Nueva York de hoy al atardecer desde lo alto: rascacielos, azoteas, depósitos de agua; o.camara 'general' o
//     'taquilla' (la entrada de un cine con cola, marquesina con luces sin letras).
export function mundo(R, t, o = {}) {
  provisional(R, t, C.selva, C.wakandaO);
  return { suelo: 160 };
}

// ── Pieza del hilo de gags ───────────────────────────────────────────────────────────────────────────────────────────
// El cubo de palomitas con ojos (nuestro): un cubo de cartón de rayas rojas y blancas, de ~16 × 18 px a o.s 1 (pie en
// (x, y)), lleno de palomitas que asoman, con dos ojos grandes, boca y bracitos. o.expresion 'normal' | 'susto' | 'llora'
// | 'risa' | 'mareo'; o.salta (0–1) palomitas que saltan; o.saluda; o.tapa (se tapa los ojos); o.gafas; o.dir.
// Devuelve { x, y, cabeza, mano }.
export function palomitas(R, x, y, t, o = {}) {
  R.rect(x - 7, y - 16, x + 7, y, C.rayaR);
  return { x, y, cabeza: [x, y - 18], mano: [x + 8, y - 8] };
}

// la paleta del escenario
const EP = pal({
  k: '#0c0b12', techo0: '#07080f', techo1: '#0d1020', cercha: '#262a3c', cerchaL: '#3a405a', cerchaS: '#181b28',
  muro0: '#0f121e', muro1: '#141929', muro2: '#1a2034', marco: '#05060a', marcoL: '#2c3040', marcoS: '#16181f',
  tabla: '#3a2a22', tablaS: '#281c16', tablaL: '#58402e', tablaB: '#7a5a40', falda: '#0b0c13', led: '#2ab8f0', ledL: '#c8f4ff', ledS: '#13475e',
  terc: '#2a0e18', tercL: '#4a1a28', tercS: '#16070c', capa: '#1e6a36', capaL: '#3a9a50', capaS: '#0e3a1e', capaD: '#08240f', oro: '#e8b840', oroL: '#fff0a0', oroS: '#9a6a1a',
  m0: '#2a2e36', m1: '#4a505c', m2: '#7a8290', m3: '#b0b8c4', m4: '#e4e8ee', ojo: '#5aff8a',
  azulC: '#2a5ac8', azulCL: '#5a9af0', azulCS: '#163278', violeta: '#3a1a5a', violetaL: '#6a3a9a', violetaS: '#1c0c30',
  piel0: '#e8c09a', piel1: '#c8885a', piel2: '#8a5a3a', piel3: '#f0c8a0',
  bordeC: '#f0d8a8', bordeF: '#b8d8f8', suelo0: '#0f1016', suelo1: '#15161e', suelo2: '#1d1f2a', cinta: '#e8c040', cintaR: '#e0507a', cintaA: '#4aa0e8',
  madera: '#c89a5a', maderaL: '#e8c088', maderaS: '#8a6038', lona: '#1a1a22', lonaL: '#34343e', lonaS: '#0e0e14',
  navy: '#18203a', navyL: '#222c4c', navyS: '#10162a', plata: '#8a94b0', plataL: '#c8d0e4', moq: '#2a2c3c', moqL: '#34374a', moqS: '#1e2030',
  rojo: '#d83a3a', rojoS: '#7a1a1a', blanco: '#f6f4ee', crema: '#e8e0cc', ambar: '#ffb040', ambarS: '#6a3a10', verdeS: '#2ac060',
});

// el umbral de la trama ordenada 4 × 4 (0–1): degradados, haces y brumas tramados, sin ruido
const E_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_b4 = (x, y) => (E_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const e_mezcla = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

const e_lim = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// la capa fija de un decorado: se pinta una vez por lienzo en un búfer aparte y en cada fotograma se copia entera
const e_CAPAS = new WeakMap();

function e_capa(R, clave, dibuja) {
  let m = e_CAPAS.get(R); if (!m) e_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// un rectángulo que respeta un recorte [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function e_rectC(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// tiñe lo ya pintado hacia col en la proporción f, con trama (dens: qué parte de los píxeles, 0–1)
function e_tinte(R, x0, y0, x1, y1, col, f, dens = 1) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (dens >= 1 || e_b4(x, y) < dens) { const c = R.pget(x, y); if (c) R.pset(x, y, e_mezcla(c, col, f)); }
}

// un haz de luz tramado desde (x0, y0) hasta (x1, y1), de ancho w0 arriba a w1 abajo, que aclara lo que hay debajo
function e_haz(R, x0, y0, x1, y1, w0, w1, col, f = 0.22, dens = 0.5) {
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, Math.round(y1)); y++) { const u = (y - y0) / Math.max(1, y1 - y0), cx = x0 + (x1 - x0) * u, w = w0 + (w1 - w0) * u;
    for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const borde = Math.abs(x - cx) / Math.max(1, w); if (e_b4(x, y) < dens * (1 - borde * 0.7) * (1 - u * 0.35)) { const c = R.pget(x, y); if (c) R.pset(x, y, e_mezcla(c, col, f)); } } }
}

// un charco de luz elíptico en el suelo (centro, radios), que aclara lo que hay debajo con el borde tramado
function e_charco(R, cx, cy, rx, ry, col, f = 0.25) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue; if (e < 0.5 || e_b4(cx + i, cy + j) < (1 - e) * 1.6) { const c = R.pget(cx + i, cy + j); if (c) R.pset(cx + i, cy + j, e_mezcla(c, col, e < 0.5 ? f : f * 0.6)); } }
}

// un foco móvil colgado (x, y: el gancho): el yugo, el cuerpo con su brillo y la lente del color col (encendida o no)
function e_foco(R, x, y, col, enc = true, dir = 0) {
  const { rect, pset } = R;
  rect(x - 3, y, x + 3, y + 1, EP.k); rect(x - 3, y + 1, x - 3, y + 5, EP.cercha); rect(x + 3, y + 1, x + 3, y + 5, EP.cercha);
  rect(x - 2, y + 2, x + 2, y + 6, EP.k); rect(x - 1, y + 3, x + 1, y + 5, EP.m1); pset(x - 1, y + 3, EP.m2);
  rect(x - 2 + dir, y + 7, x + 2 + dir, y + 7, enc ? col : EP.m0); if (enc) pset(x + dir, y + 8, EP.blanco);
}

// un pictograma de pancarta o de banderola (sin letras) de tamaño s (1 = unos 7 px) centrado en (x, y):
// 'escudo', 'martillo', 'cuernos', 'mascara', 'corazon', 'garras', 'estrella'
function e_picto(R, tipo, x, y, s = 1) {
  const { rect, disco, pset, linea } = R, q = (a) => Math.round(a * s);
  if (tipo === 'escudo') { disco(x, y, q(3.6), EP.rojo); disco(x, y, q(2.6), EP.blanco); disco(x, y, q(1.7), EP.rojo); disco(x, y, Math.max(1, q(1)), EP.azulC); pset(x, y, EP.blanco); }
  else if (tipo === 'martillo') { rect(x - q(3), y - q(3), x + q(3), y - q(1), EP.m3); rect(x - q(3), y - q(1), x + q(3), y - q(1), EP.m1); rect(x - Math.max(0, q(0.5)), y - q(1), x + Math.max(0, q(0.5)), y + q(3.5), EP.tablaB); }
  else if (tipo === 'cuernos') { for (const d of [-1, 1]) { linea(x + d * q(1), y + q(2), x + d * q(2), y - q(1), EP.oro); linea(x + d * q(2), y - q(1), x + d * q(3.5), y - q(3.5), EP.oro); pset(x + d * q(3.5), y - q(3.5), EP.oroL); } rect(x - q(1), y + q(1), x + q(1), y + q(3), EP.capa); }
  else if (tipo === 'mascara') e_mascara(R, x, y, s < 1.5 ? 1 : Math.round(s), {});
  else if (tipo === 'corazon') { disco(x - q(1.5), y - q(1), q(1.8), EP.rojo); disco(x + q(1.5), y - q(1), q(1.8), EP.rojo); R.poligono([[x - q(3.2), y - q(0.6)], [x + q(3.2), y - q(0.6)], [x, y + q(3)]], EP.rojo); pset(x - q(2), y - q(2), EP.blanco); }
  else if (tipo === 'garras') { for (const d of [-2, 0, 2]) linea(x + q(d), y + q(3), x + q(d) + q(1), y - q(3.5), EP.m4); }
  else { R.poligono([[x, y - q(3.5)], [x + q(1), y - q(1)], [x + q(3.5), y - q(1)], [x + q(1.5), y + q(1)], [x + q(2.2), y + q(3.5)], [x, y + q(2)], [x - q(2.2), y + q(3.5)], [x - q(1.5), y + q(1)], [x - q(3.5), y - q(1)], [x - q(1), y - q(1)]], EP.oro); }
}

// la máscara de metal (nuestra, sin nada copiado): en (cx, cy), su centro; s = 1 es la de mano (7 × 9 px, para que la
// sostenga un personaje) y s ≥ 2 la grande de la pantalla (unos 9·s px de alto), con la frente, la ceja, las rendijas de
// los ojos que brillan, la nariz con su arista, la rejilla de la boca, remaches y el brillo que la recorre (o.brillo:
// posición 0–1 de la franja de luz); o.capucha: la capucha verde alrededor (solo en la grande); o.ojos: brillo de los
// ojos 0–1. Exportada: las escenas la ponen en la mano de rdj (la mano de R.actor(..., { sostiene: true }).mano)
export function e_mascara(R, cx, cy, s = 1, o = {}) {
  const { pset } = R; cx = Math.round(cx); cy = Math.round(cy);
  if (s < 2) {
    const F = ['.kkkkk.', 'k2333lk', 'k23331k', 'kkk3kkk', 'k23331k', 'k22311k', 'k1k1k1k', '.k211k.', '..kkk..'];
    const col = { k: EP.k, l: EP.m4, 3: EP.m3, 2: EP.m2, 1: EP.m1 };
    F.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] !== '.') pset(cx - 3 + i, cy - 4 + j, col[f[i]]); });
    return;
  }
  const H = 4.5 * s, W = 3.6 * s;
  const dentro = (u, v) => v < -0.15 ? u * u + ((v + 0.15) / 0.85) ** 2 < 1 : v < 1 && Math.abs(u) < 1 - (v + 0.15) * 0.38;
  if (o.capucha) {
    for (let y = Math.floor(cy - H * 1.75); y <= Math.ceil(cy + H * 1.6); y++) for (let x = Math.floor(cx - W * 1.75); x <= Math.ceil(cx + W * 1.75); x++) {
      const u = (x - cx) / W, v = (y - cy) / H, pico = v < -1 ? Math.abs(u) < (v + 1.75) * 1.4 : true, e = (u / 1.65) ** 2 + ((v + 0.05) / 1.6) ** 2;
      if (e > 1 || !pico || v > 1.55) continue;
      const pl = Math.sin(u * 5.5 + v * 1.2), din = (u / 1.25) ** 2 + ((v + 0.05) / 1.25) ** 2 < 1;
      let c = din ? EP.capaD : pl > 0.55 ? EP.capaL : pl > -0.3 ? EP.capa : EP.capaS; if (e > 0.88) c = EP.k; else if (!din && u > 0.7 && e_b4(x, y) < 0.5) c = EP.capaS;
      pset(x, y, c);
    }
  }
  const brillo = o.brillo ?? -1, ojos = o.ojos ?? 0.6;
  for (let y = Math.floor(cy - H); y <= Math.ceil(cy + H); y++) for (let x = Math.floor(cx - W); x <= Math.ceil(cx + W); x++) {
    const u = (x - cx) / W, v = (y - cy) / H; if (!dentro(u, v)) continue;
    const du = 1 / W, dv = 1 / H; if (!dentro(u - du, v) || !dentro(u + du, v) || !dentro(u, v - dv) || !dentro(u, v + dv)) { pset(x, y, EP.k); continue; }
    let l = 0.62 - u * 0.42 - v * 0.12 + (e_b4(x, y) - 0.5) * 0.18; let c;
    if (v > -0.42 && v < -0.33) l += 0.25;                                               // la ceja
    if (Math.abs(u) < 0.09 && v > -0.3 && v < 0.3) l += u < 0 ? 0.35 : -0.1;              // la arista de la nariz
    if (Math.abs(brillo - (u * 0.5 + 0.5 + v * 0.25)) < 0.06) l += 0.45;                  // la franja de brillo
    c = l > 0.95 ? EP.m4 : l > 0.7 ? EP.m3 : l > 0.42 ? EP.m2 : l > 0.2 ? EP.m1 : EP.m0;
    if (v > -0.3 && v < -0.17 && Math.abs(u) > 0.18 && Math.abs(u) < 0.7 - (v + 0.3) * 0.6) c = ojos > 0.5 && Math.abs(u) > 0.3 && Math.abs(u) < 0.55 ? e_mezcla(EP.k, EP.ojo, ojos * 0.7) : EP.k;
    if (v > 0.48 && v < 0.64 && Math.abs(u) < 0.42) c = (x - cx) % 2 === 0 ? EP.k : EP.m1;   // la rejilla de la boca
    if (s >= 3 && ((Math.abs(Math.abs(u) - 0.8) < 0.07 && Math.abs(v + 0.05) < 0.05) || (Math.abs(Math.abs(u) - 0.68) < 0.07 && Math.abs(v - 0.55) < 0.05))) c = EP.m4;   // remaches
    pset(x, y, c);
  }
}

// una cabeza vista de espaldas (centro x, y; radio r): tipo 0 pelo corto, 1 calvo con el pelo de la nuca, 2 moño,
// 3 coleta, 4 rizos, 5 gorra del revés, y los disfraces: 6 cuernos dorados, 7 máscara roja con su red, 8 capucha verde,
// 9 casco azul con alitas; pl/ps: luz y sombra del pelo; borde: el filo de luz que le llega del escenario
function e_cabeza(R, x, y, r, tipo, pl, ps, piel, borde) {
  const { disco, pset, rect, linea } = R;
  rect(x - 2, y + r - 2, x + 2, y + r + 2, e_mezcla(piel, EP.k, 0.4));
  if (tipo === 4) { for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * (r - 2)), y + Math.round(Math.sin(a * 0.785) * (r - 2)), 3, EP.k); disco(x, y, r, EP.k); for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * (r - 2)), y + Math.round(Math.sin(a * 0.785) * (r - 2)), 2, ps); disco(x, y, r - 1, ps); disco(x - 1, y - 2, r - 4, pl); }
  else {
    disco(x, y, r, EP.k);
    if (tipo === 1) { disco(x, y, r - 1, piel); disco(x - 1, y - 2, r - 4, e_mezcla(piel, EP.blanco, 0.15)); pset(x - 2, y - r + 3, e_mezcla(piel, EP.blanco, 0.6)); rect(x - r + 2, y + 2, x + r - 2, y + r - 2, ps); }
    else if (tipo === 5) { const g = (x & 1) ? hex('#b8343a') : hex('#2e4a8a'); disco(x, y, r - 1, e_mezcla(g, EP.k, 0.3)); disco(x, y - 1, r - 2, g); disco(x - 1, y - 3, Math.max(1, r - 5), e_mezcla(g, EP.blanco, 0.25)); rect(x - r + 2, y + 3, x + r - 2, y + r - 2, ps); rect(x - 1, y + 2, x + 1, y + 3, ps); }
    else if (tipo === 7) { disco(x, y, r - 1, hex('#b82a2a')); disco(x - 1, y - 2, r - 4, hex('#d84040')); for (let a = 0; a < 6; a++) linea(x, y - 1, x + Math.round(Math.cos(a * 1.05) * (r - 1)), y - 1 + Math.round(Math.sin(a * 1.05) * (r - 1)), hex('#5a1010')); disco(x, y - 1, 1, hex('#5a1010')); }
    else if (tipo === 8) { disco(x, y - 1, r, EP.capaS); disco(x, y - 1, r - 1, EP.capa); disco(x - 1, y - 3, r - 4, EP.capaL); R.poligono([[x - 2, y - r], [x + 2, y - r], [x, y - r - 3]], EP.capa); rect(x - r + 1, y + 2, x + r - 1, y + r, EP.capaS); }
    else if (tipo === 9) { disco(x, y, r - 1, EP.azulCS); disco(x - 1, y - 1, r - 2, EP.azulC); disco(x - 2, y - 3, Math.max(1, r - 5), EP.azulCL); for (const d of [-1, 1]) { linea(x + d * (r - 1), y - 1, x + d * (r + 2), y - 5, EP.blanco); linea(x + d * (r - 1), y, x + d * (r + 2), y - 3, EP.crema); } }
    else { disco(x, y, r - 1, ps); disco(x - 1, y - 1, r - 3, pl); for (let i = -3; i <= 3; i += 2) pset(x + i, y + r - 4 + (i & 2 ? 1 : 0), e_mezcla(ps, EP.k, 0.3)); }
    if (tipo === 2) { disco(x, y - r, Math.max(2, r / 3), EP.k); disco(x, y - r, Math.max(1, r / 3 - 1), pl); }
    if (tipo === 3) { rect(x - 2, y + r - 2, x + 2, y + r + 7, EP.k); rect(x - 1, y + r - 2, x + 1, y + r + 6, ps); rect(x - 1, y + r - 1, x + 1, y + r - 1, hex('#c83a5a')); }
    if (tipo === 6) { for (const d of [-1, 1]) { linea(x + d * 3, y - r + 2, x + d * 4, y - r - 3, EP.k); linea(x + d * 4, y - r - 3, x + d * 7, y - r - 7, EP.k); linea(x + d * 3, y - r + 1, x + d * 4, y - r - 3, EP.oro); linea(x + d * 4, y - r - 4, x + d * 6, y - r - 7, EP.oro); pset(x + d * 6, y - r - 7, EP.oroL); } }
  }
  if (tipo !== 8) { pset(x - r, y + 1, piel); pset(x + r, y + 1, piel); }
  for (let i = -r + 2; i <= r - 2; i++) pset(x + i, y - Math.round(Math.sqrt(Math.max(0, (r - 1) ** 2 - i * i))), Math.abs(i) < r - 3 ? borde : e_mezcla(borde, pl, 0.5));
}

const E_PELOS = [['#3a2a20', '#241810'], ['#6a4a2a', '#4a321a'], ['#1e1a24', '#100c14'], ['#c8a060', '#8a6a3a'], ['#8a5a2a', '#5a3a1a'], ['#9a9aa8', '#6a6a78'], ['#a83a2a', '#6a2018']].map(([a, b]) => [hex(a), hex(b)]);

const E_ROPA = ['#3a5a8a', '#8a3a3a', '#4a6a4a', '#6a4a7a', '#c8a050', '#5a5a6a', '#2a7a8a', '#b85a2a'].map(hex);

const E_PIELES = ['#e8c09a', '#c8885a', '#8a5a3a', '#f0c8a0'].map(hex);

const E_TIPOS = [0, 1, 2, 3, 4, 5, 0, 6, 2, 7, 0, 3, 8, 4, 1, 9, 5, 0];

const E_CARTELES = ['escudo', 'martillo', 'cuernos', 'mascara', 'corazon', '3000', 'garras', 'estrella'];

// una fila de público de espaldas: o.y (centro de las cabezas), o.r (radio), o.dx (paso), o.x0, o.f (semilla de la fila),
// o.u (la ovación 0–1: se levantan en ola y alzan los brazos), o.luz (el filo de luz), o.oscuro (0–1: lejanía),
// o.carteles (pancartas con pictogramas sostenidas con las dos manos), o.moviles (móviles que graban, 0–1)
function e_filaPublico(R, t, o) {
  const { rect, disco, linea, pset } = R, { y: yb, r, dx, x0, f, u = 0, luz, oscuro = 0 } = o, mov = o.moviles ?? 0.25;
  for (let k = 0; x0 + k * dx - dx < 330; k++) {
    const sem = h(k, f, 610), x = Math.round(x0 + k * dx + (sem - 0.5) * dx * 0.3 + Math.sin(t * 0.6 + k * 1.7 + f) * 0.8);
    const v = e_lim((u - sem * 0.45) / 0.45), sube = Math.round(v * r * 1.3 + (v > 0.9 ? Math.abs(Math.sin(t * 5 + k)) * 2 : 0)), y = yb - sube;
    const ropa0 = E_ROPA[Math.floor(h(k, f, 611) * E_ROPA.length)], ropa = e_mezcla(ropa0, EP.techo0, 0.25 + oscuro * 0.5), pelo = E_PELOS[Math.floor(h(k, f, 612) * E_PELOS.length)].map((c) => e_mezcla(c, EP.techo0, oscuro * 0.4));
    const piel = e_mezcla(E_PIELES[Math.floor(h(k, f, 613) * 4)], EP.techo0, 0.15 + oscuro * 0.4), tipo = E_TIPOS[Math.floor(h(k, f, 614) * E_TIPOS.length)];
    const hw = Math.round(r * 1.35);
    // los hombros y la espalda
    rect(x - hw - 1, y + r - 2, x + hw + 1, 180, EP.k); rect(x - hw, y + r - 1, x + hw, 180, ropa); rect(x - hw, y + r - 1, x + hw, y + r - 1, e_mezcla(ropa, luz, 0.35)); rect(x - hw, y + r + 4, x + hw, 180, e_mezcla(ropa, EP.k, 0.25)); rect(x, y + r, x, y + r + 5, e_mezcla(ropa, EP.k, 0.35));
    // los brazos en alto en la ovación, o la pancarta, o el móvil
    const cartel = o.carteles !== false && h(k, f, 615) < 0.11, movil = !cartel && h(k, f, 616) < mov + v * 0.3;
    if (cartel) {
      const tipo2 = E_CARTELES[Math.floor(h(k, f, 617) * E_CARTELES.length)], w = tipo2 === '3000' ? 18 : Math.round(r * 1.45), hh = Math.round(r * 1.05), bob = Math.round(Math.sin(t * (2 + v * 4) + k) * (1 + v)), cy = y - r - hh - 3 - Math.round(v * 3) + bob;
      for (const d of [-1, 1]) { linea(x + d * (hw - 1), y + r, x + d * (w - 2), cy + hh, EP.k); linea(x + d * (hw - 2), y + r, x + d * (w - 3), cy + hh, ropa); }
      const papel = [EP.blanco, hex('#f0e0a0'), hex('#c8e8c0'), hex('#f0c8d8'), hex('#c8dcf0')][Math.floor(h(k, f, 618) * 5)];
      rect(x - w, cy - hh, x + w, cy + hh, EP.k); rect(x - w + 1, cy - hh + 1, x + w - 1, cy + hh - 1, e_mezcla(papel, EP.techo0, oscuro * 0.4)); rect(x - w + 1, cy + hh - 1, x + w - 1, cy + hh - 1, e_mezcla(papel, EP.k, 0.25));
      if (tipo2 === '3000') R.numero('3000', x - 15, cy + 3, { color: EP.rojo, sombra: false }); else e_picto(R, tipo2, x, cy, Math.max(1, r / 7));
      for (const d of [-1, 1]) disco(x + d * (w - 2), cy + hh, 1.5, piel);
    } else if (v > 0.35) {
      for (const d of [-1, 1]) { const ag = Math.sin(t * 6 + k * 2 + d) * 2, hx = x + d * (hw + 2) + Math.round(ag * d * 0.5), hy = y - r - 2 + Math.round(ag); linea(x + d * (hw - 1), y + r, hx, hy, EP.k); linea(x + d * (hw - 2), y + r, hx - d, hy, ropa); disco(hx, hy - 1, 1.6, piel); }
    } else if (movil) {
      const d = k % 2 ? 1 : -1, hx = x + d * (hw + 1), hy = y - r + 1; linea(x + d * (hw - 1), y + r, hx, hy + 3, EP.k); linea(x + d * (hw - 2), y + r, hx - d, hy + 3, ropa);
      rect(hx - 2, hy - 3, hx + 2, hy + 3, EP.k); rect(hx - 1, hy - 2, hx + 1, hy + 2, Math.sin(t * 3 + k) > 0 ? hex('#a8d0ff') : hex('#c8e4ff')); pset(hx + 1, hy - 2, EP.blanco);
      if (r >= 7 && (t * 0.7 + k) % 4 < 0.12) R.halo(hx, hy, 6, [hex('#5a6a8a'), hex('#a8b8d8')], 1.4);
    }
    e_cabeza(R, x, y, r, tipo, pelo[0], pelo[1], piel, luz);
  }
}

function e_pantalla(R, t, o, x0, y0, x1, y1) {
  const { pset, disco, linea, poligono } = R, cl = [x0, y0, x1, y1], tipo = o.pantalla, w = x1 - x0, hgt = y1 - y0, cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
  R.recorte(cl);
  const fondo = (c0, c1, c2) => { for (let y = y0; y <= y1; y++) { const v = (y - y0) / hgt; for (let x = x0; x <= x1; x++) { const d = Math.hypot((x - cx) / w, (y - cy) / hgt) * 1.6; pset(x, y, d + e_b4(x, y) * 0.25 < 0.45 ? c2 : d + e_b4(x, y) * 0.25 < 0.8 ? c1 : c0); } } };
  const chispas = (n, col, vel = 6) => { for (let i = 0; i < n; i++) { const px = x0 + ((h(i, 1, 620) * w + Math.sin(t + i) * 3) % w), py = y1 - ((h(i, 2, 620) * hgt + t * vel * (0.5 + h(i, 3, 620))) % hgt); if (Math.sin(t * 3 + i) > -0.2) pset(px, py, col); } };
  if (tipo === 'mascara') {
    fondo(hex('#04140a'), hex('#0a2a14'), hex('#14421e')); chispas(Math.round(w / 4), hex('#5ac87a'));
    for (let a = 0; a < 12; a++) { const g = a * 0.5236 + t * 0.08; linea(cx, cy, cx + Math.cos(g) * w, cy + Math.sin(g) * w, (x, y) => e_b4(x, y) < 0.25 ? hex('#1a5a2a') : null); }
    const s = Math.max(2, Math.round(hgt / 22)); e_mascara(R, cx, cy + Math.round(s * 0.6), s, { capucha: true, brillo: ((t * 0.35) % 1.6) - 0.3, ojos: 0.6 + Math.sin(t * 2) * 0.4 });
  } else if (tipo === 'titulo') {
    fondo(hex('#0a0c12'), hex('#151a26'), hex('#20283a')); chispas(Math.round(w / 5), hex('#8a94b0'), 3);
    const s = Math.max(1, Math.round(hgt / 30)), anchos = [10, 7, 12, 9, 11, 8], tot = anchos.reduce((a, b) => a + b + 3, -3) * s; let x = cx - Math.round(tot / 2), k = 0;
    for (const a of anchos) { const xa = x, xb = x + a * s - 1, ya = cy - 6 * s, yb = cy + 4 * s;
      for (let y = ya; y <= yb; y++) for (let xx = xa; xx <= xb; xx++) { const l = (y - ya) / (yb - ya), sh = Math.abs(((t * 0.5) % 1.6) - 0.3 - (xx - x0) / w) < 0.04; pset(xx, y, xx === xa || xx === xb || y === ya || y === yb ? EP.k : sh ? EP.m4 : l < 0.3 ? EP.m3 : l < 0.7 ? EP.m2 : EP.m1); }
      if (k === 2) { e_rectC(R, cl, xa + 2 * s, ya - 3 * s, xb - 2 * s, ya - 2 * s, EP.capaL); } x += (a + 3) * s; k++; }
    e_rectC(R, cl, cx - Math.round(tot / 2), cy + 7 * s, cx + Math.round(tot / 2), cy + 7 * s, EP.m2);
    e_mascara(R, cx, cy - 11 * s, s >= 2 ? 2 : 1, {});
  } else if (tipo === 'fechas') {
    fondo(hex('#0c0a1a'), hex('#1a1630'), hex('#2a2248')); chispas(Math.round(w / 5), hex('#c8b8f0'), 2);
    const nums = (o.numeros ?? ['2026', '2027']).map(String), tam = w > 180 ? 16 : 8, tw = tam === 16 ? 70 : 38, th = tam === 16 ? 40 : 22;
    nums.slice(0, 2).forEach((n, i) => { const tx = cx + (i ? 1 : -1) * Math.round(w * 0.25), ty = cy + Math.round(Math.sin(t * 1.5 + i) * 1);
      e_rectC(R, cl, tx - tw / 2, ty - th / 2, tx + tw / 2, ty + th / 2, EP.k); e_rectC(R, cl, tx - tw / 2 + 1, ty - th / 2 + 1, tx + tw / 2 - 1, ty + th / 2 - 1, EP.blanco);
      e_rectC(R, cl, tx - tw / 2 + 1, ty - th / 2 + 1, tx + tw / 2 - 1, ty - th / 2 + Math.round(th * 0.25), i ? EP.capa : EP.rojo); for (const d of [-1, 1]) e_rectC(R, cl, tx + d * tw / 4, ty - th / 2 - 2, tx + d * tw / 4 + 1, ty - th / 2 + 2, EP.m2);
      R.numero(n, tx, ty + (tam === 16 ? 12 : 7), { tam, centro: true, color: hex('#1a2040'), sombra: false, contorno: false }); });
    const u = (t * 0.7) % 1, ax = cx - Math.round(w * 0.07), bx = cx + Math.round(w * 0.07); linea(ax, cy, ax + Math.round((bx - ax) * Math.min(1, u * 1.5)), cy, EP.oro); poligono([[bx - 1, cy - 3], [bx + 3, cy], [bx - 1, cy + 3]], u > 0.6 ? EP.oroL : EP.oro);
  } else if (tipo === 'casco') {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / hgt + Math.sin(x * 0.08 + t * 0.6) * 0.04; pset(x, y, v + e_b4(x, y) * 0.2 < 0.35 ? hex('#160a2a') : v + e_b4(x, y) * 0.2 < 0.75 ? hex('#24104a') : hex('#3a1a6a')); }
    chispas(Math.round(w / 4), hex('#a87af0'), 4);
    const s = hgt / 60;
    // el trono: respaldo alto con puntas, el tapizado violeta con botones dorados
    const tx = cx, ty = y0 + Math.round(6 * s), tw = Math.round(28 * s);
    poligono([[tx - tw, y1], [tx - tw, ty + 10 * s], [tx - tw * 0.7, ty], [tx, ty - 6 * s], [tx + tw * 0.7, ty], [tx + tw, ty + 10 * s], [tx + tw, y1]], hex('#c89a30'));
    poligono([[tx - tw + 2 * s, y1], [tx - tw + 2 * s, ty + 11 * s], [tx - tw * 0.66, ty + 3 * s], [tx, ty - 2 * s], [tx + tw * 0.66, ty + 3 * s], [tx + tw - 2 * s, ty + 11 * s], [tx + tw - 2 * s, y1]], hex('#5a2a8a'));
    for (let i = -3; i <= 3; i++) disco(tx + i * tw * 0.27, ty + 6 * s + Math.abs(i) * 2 * s, Math.max(1, s), EP.oroL);
    // el busto: hombreras verdes con su filo, la túnica violeta y el cuello alto
    const by = cy + Math.round(15 * s), hw = Math.round(19 * s);
    poligono([[tx - hw, y1], [tx - hw, by + 5 * s], [tx - hw * 0.55, by - 2 * s], [tx + hw * 0.55, by - 2 * s], [tx + hw, by + 5 * s], [tx + hw, y1]], hex('#2a6a3a'));
    poligono([[tx - hw + 2 * s, y1], [tx - hw + 2 * s, by + 6 * s], [tx - hw * 0.5, by + 1 * s], [tx - hw * 0.3, by + 1 * s], [tx - hw * 0.3, y1]], hex('#4a9a5a'));
    poligono([[tx - hw * 0.3, y1], [tx - hw * 0.3, by], [tx + hw * 0.3, by], [tx + hw * 0.3, y1]], hex('#4a2a7a'));
    poligono([[tx - hw * 0.45, by], [tx - hw * 0.4, by - 8 * s], [tx + hw * 0.4, by - 8 * s], [tx + hw * 0.45, by]], hex('#1a4a2a'));
    // el casco azul: la cúpula, las carrilleras, las aletas que suben a los lados, la cara en sombra y los ojos que brillan
    const hcx = tx, hcy = cy - Math.round(5 * s), hr = 11 * s;
    for (const d of [-1, 1]) { poligono([[hcx + d * hr * 0.75, hcy + hr * 0.35], [hcx + d * hr * 1.85, hcy - hr * 1.35], [hcx + d * hr * 1.35, hcy - hr * 0.05], [hcx + d * hr * 0.85, hcy - hr * 0.35]], EP.k);
      poligono([[hcx + d * hr * 0.8, hcy + hr * 0.25], [hcx + d * hr * 1.72, hcy - hr * 1.2], [hcx + d * hr * 1.3, hcy - hr * 0.12], [hcx + d * hr * 0.88, hcy - hr * 0.3]], d < 0 ? hex('#5a9af0') : hex('#2a5ac8')); }
    for (let y = Math.floor(hcy - hr - 1); y <= Math.ceil(hcy + hr * 1.25); y++) for (let x = Math.floor(hcx - hr - 1); x <= Math.ceil(hcx + hr + 1); x++) {
      const u = (x - hcx) / hr, v = (y - hcy) / hr, dentro = (a, b) => (b < 0 ? a * a + b * b < 1 : b < 1.2 && Math.abs(a) < 1 - b * 0.18);
      if (!dentro(u, v)) continue; const borde = !dentro(u - 1 / hr, v) || !dentro(u + 1 / hr, v) || !dentro(u, v - 1 / hr) || !dentro(u, v + 1 / hr);
      const cara = Math.abs(u) < 0.5 - Math.max(0, v - 0.7) * 0.5 && v > -0.35 && v < 1.1;
      let c; if (borde) c = EP.k; else if (cara) c = v < -0.25 ? EP.k : hex('#2a1a3a'); else { const l = 0.55 - u * 0.4 - v * 0.25 + (e_b4(x, y) - 0.5) * 0.15; c = Math.abs(u) < 0.05 && v < -0.35 ? hex('#8ac0ff') : l > 0.8 ? hex('#a8d0ff') : l > 0.55 ? EP.azulCL : l > 0.3 ? EP.azulC : EP.azulCS; }
      pset(x, y, c);
    }
    const brilla = 0.5 + Math.sin(t * 2.5) * 0.5; for (const d of [-1, 1]) e_rectC(R, cl, hcx + d * Math.round(2.5 * s) - Math.round(s), hcy + Math.round(1 * s), hcx + d * Math.round(2.5 * s) + Math.round(s * 0.6), hcy + Math.round(1 * s), e_mezcla(hex('#8a5af0'), hex('#f0e8ff'), brilla));
  } else if (tipo === 'flecha') {
    fondo(hex('#04140a'), hex('#0a2214'), hex('#123420')); chispas(Math.round(w / 5), hex('#5ac87a'));
    const s = Math.max(2, Math.round(hgt / 26)), mx = x0 + Math.round(w * 0.22); e_mascara(R, mx, cy, s, { capucha: true, brillo: ((t * 0.35) % 1.6) - 0.3 });
    const u = e_lim(((t * 0.5) % 1.4) / 0.8), ax = x0 + Math.round(w * 0.4), bx = x0 + Math.round(w * 0.6), ex = Math.round(ax + (bx - ax) * u);
    for (let d = -1; d <= 1; d++) linea(ax, cy + d, ex, cy + d, EP.oro); poligono([[ex, cy - 5], [ex + 6, cy], [ex, cy + 5]], EP.oroL);
    const px0 = x0 + Math.round(w * 0.68), px1 = x0 + Math.round(w * 0.9), py0 = y0 + Math.round(hgt * 0.12), py1 = y1 - Math.round(hgt * 0.12);
    e_rectC(R, cl, px0 - 1, py0 - 1, px1 + 1, py1 + 1, EP.k); e_rectC(R, cl, px0, py0, px1, py1, hex('#0e2a18')); e_rectC(R, cl, px0, py0, px1, py0 + Math.round((py1 - py0) * 0.25), hex('#1a4a2a'));
    e_mascara(R, Math.round((px0 + px1) / 2), Math.round(py0 + (py1 - py0) * 0.5), Math.max(2, s - 1), {});
    for (let i = 0; i < 3; i++) e_rectC(R, cl, px0 + 3, py1 - 4 - i * 3, px1 - 3 - i * 4, py1 - 3 - i * 3, EP.m2);
  } else {
    fondo(hex('#060a1a'), hex('#0e1630'), hex('#1a2448')); chispas(Math.round(w / 3), hex('#c8d8ff'), 2);
    for (let a = 0; a < 3; a++) { const r = ((t * 6 + a * 12) % 36) * hgt / 60; for (let g = 0; g < 6.28; g += 1 / Math.max(4, r)) { const x = cx + Math.cos(g) * r * 1.4, y = cy + Math.sin(g) * r; if (e_b4(Math.round(x), Math.round(y)) < 0.6) pset(x, y, r < hgt * 0.3 ? EP.azulCL : EP.azulC); } }
    disco(cx, cy, Math.max(2, hgt / 10), hex('#3a6ac8')); disco(cx - 1, cy - 1, Math.max(1, hgt / 18), hex('#a8c8ff'));
  }
  // las interferencias del cambio de imagen
  const g = o.glitch ?? 0; if (g > 0) for (let i = 0; i < 6; i++) { const y = y0 + Math.floor(h(i, Math.floor(t * 12), 621) * hgt), d = Math.round((h(i, Math.floor(t * 12), 622) - 0.5) * 10 * g); if (h(i, 3, Math.floor(t * 12)) < g) for (let x = x0; x <= x1; x++) pset(x + d, y, (x + i) % 3 ? hex('#c8e8ff') : hex('#3a4a6a')); }
  // la trama de LED: una fila de cada tres un poco más oscura
  for (let y = y0 + 2; y <= y1; y += 3) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y); R.pset(x, y, e_mezcla(c, EP.k, 0.18)); }
  R.recorte(null);
}

const E_FOCOS_G = [[36, 0], [96, 1], [134, 2], [186, 3], [224, 4], [262, 5]];

function e_audGeneral(R, t, o) {
  const { rect, pset, disco, linea } = R;
  e_capa(R, 'aud-g', () => e_audFondoG(R));
  // la pantalla gigante y las laterales (repiten la imagen)
  e_pantalla(R, t, o, 95, 25, 225, 81);
  e_pantalla(R, t, o, 13, 47, 61, 75); e_pantalla(R, t, o, 259, 53, 307, 81);
  // la tira de LED al pie de la pantalla, con chevrones que corren, y la del borde del escenario
  for (let x = 30; x <= 290; x++) { const v = ((x + Math.floor(t * 14)) % 16); for (let y = 88; y <= 92; y++) { const ch = Math.abs(v - 8 + Math.abs(y - 90) * 1) < 1.2; pset(x, y, ch ? EP.led : (x + y) % 2 ? EP.ledS : hex('#0e2a3a')); } }
  for (let x = 30; x <= 290; x += 3) pset(x, 111, ((x / 3 + Math.floor(t * 8)) % 9) === 0 ? EP.ledL : EP.led);
  // los focos móviles: el charco de luz en las tablas, el haz tramado y el cuerpo colgado de la cercha
  const COLF = [hex('#fff0b0'), hex('#a8d8ff'), hex('#ffb8e0'), hex('#fff0b0'), hex('#a8d8ff'), hex('#ffd0a0')];
  const dest = E_FOCOS_G.map(([fx, k]) => Math.round(Math.max(40, Math.min(280, fx + Math.sin(t * 0.45 + k * 1.9) * 34))));
  E_FOCOS_G.forEach(([fx, k], i) => e_charco(R, dest[i], 101, 15, 3, COLF[i], 0.3));
  E_FOCOS_G.forEach(([fx, k], i) => e_haz(R, fx, 22, dest[i], 100, 1, 12, COLF[i], 0.16, 0.32));
  E_FOCOS_G.forEach(([fx, k], i) => e_foco(R, fx, 15, COLF[i], true, Math.sign(dest[i] - fx)));
  // los de seguridad que pasean por el foso, detrás de la valla
  for (let i = 0; i < 2; i++) { const p = (t * 9 + i * 140) % 300, x = Math.round(10 + (Math.floor(p / 150) % 2 ? 300 - p % 150 * 2 : p % 150 * 2)), y = 120, an = Math.floor(t * 5 + i) % 2;
    rect(x - 2, y - 11, x + 2, y - 4, EP.k); rect(x - 1, y - 10, x + 1, y - 5, hex('#2a2a32')); rect(x - 1, y - 9, x + 1, y - 8, hex('#e8c040')); disco(x, y - 13, 2.2, EP.k); disco(x, y - 13, 1.5, E_PIELES[i * 2]); rect(x - 1, y - 4, x - 1, y - 1 - an, EP.k); rect(x + 1, y - 4, x + 1, y - 1 - (1 - an), EP.k); }
  // la valla del foso por delante de ellos
  rect(0, 116, 319, 117, EP.m1); rect(0, 116, 319, 116, EP.m2); for (let x = 2; x < 320; x += 5) rect(x, 117, x, 123, EP.m0); rect(0, 122, 319, 123, EP.m1);
  // el público en tres filas, de la más lejana a la más cercana
  const u = o.ovacion ?? 0;
  e_filaPublico(R, t, { y: 129, r: 5, dx: 13, x0: 3, f: 0, u, luz: EP.bordeC, oscuro: 0.55, moviles: 0.15 });
  e_filaPublico(R, t, { y: 143, r: 6, dx: 16, x0: 10, f: 1, u, luz: EP.bordeC, oscuro: 0.3 });
  e_filaPublico(R, t, { y: 158, r: 7, dx: 19, x0: 0, f: 2, u, luz: EP.bordeC, oscuro: 0.1 });
  return { suelo: 106, escenario: [40, 280], publico: 178, pantalla: [95, 25, 225, 81], mesa: [36, 74, 106] };
}

// la capa fija del auditorio general
function e_audFondoG(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo y las paredes del pabellón: degradado tramado, paneles acústicos, rejillas de ventilación
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const v = y / 120 + (h(x >> 3, y >> 3, 630) - 0.5) * 0.06; pset(x, y, v + e_b4(x, y) * 0.12 < 0.18 ? EP.techo0 : v + e_b4(x, y) * 0.12 < 0.45 ? EP.techo1 : EP.muro0); }
  for (let x = 0; x < 320; x += 20) for (let y = 22; y < 88; y++) if (((x / 20) | 0) % 2) pset(x, y, EP.muro1);
  for (let x = 0; x < 320; x += 6) for (let y = 30; y < 88; y++) if (e_b4(x, y) < 0.3) pset(x + 3, y, EP.muro1);
  for (const [x0, y0] of [[8, 26], [300, 92]]) { rect(x0, y0, x0 + 12, y0 + 6, EP.k); for (let i = 0; i < 6; i++) rect(x0 + 1 + i * 2, y0 + 1, x0 + 1 + i * 2, y0 + 5, EP.muro2); }
  // las salidas de emergencia: el pictograma verde del que corre
  for (const x0 of [4, 306]) { rect(x0, 84, x0 + 10, 90, EP.k); rect(x0 + 1, 85, x0 + 9, 89, hex('#1a8a4a')); disco(x0 + 6, 86, 1, EP.blanco); linea(x0 + 5, 87, x0 + 4, 89, EP.blanco); linea(x0 + 5, 87, x0 + 7, 89, EP.blanco); }
  // la cercha de los focos, de lado a lado (más apagada bajo Atom)
  for (let x = 0; x < 320; x++) { const c = x > 268 ? EP.cerchaS : EP.cercha; pset(x, 8, c); pset(x, 14, c); if (x <= 268) pset(x, 7, EP.cerchaL); }
  for (let x = 0; x < 320; x += 8) { const c = x > 268 ? EP.cerchaS : EP.cercha; linea(x, 8, x + 4, 14, c); linea(x + 4, 14, x + 8, 8, c); }
  for (const x of [20, 160, 300]) rect(x, 0, x, 7, EP.cerchaS);
  // las banderolas colgadas de la cercha, con un pictograma cada una
  [[74, 'escudo', '#2a3a6a'], [232, 'martillo', '#5a2a2a']].forEach(([x0, p, c], k) => {
    const col = hex(c); rect(x0 + 2, 15, x0 + 2, 26, EP.cercha); rect(x0 + 12, 15, x0 + 12, 26, EP.cercha); rect(x0, 26, x0 + 14, 70, EP.k); rect(x0 + 1, 27, x0 + 13, 69, col); rect(x0 + 1, 27, x0 + 2, 69, e_mezcla(col, EP.blanco, 0.15)); rect(x0 + 12, 27, x0 + 13, 69, e_mezcla(col, EP.k, 0.3));
    poligono([[x0, 70], [x0 + 14, 70], [x0 + 7, 76]], EP.k); poligono([[x0 + 1, 70], [x0 + 13, 70], [x0 + 7, 75]], col);
    e_picto(R, p, x0 + 7, 42, 1.4); e_picto(R, k ? 'cuernos' : 'estrella', x0 + 7, 58, 1); rect(x0 + 3, 50, x0 + 11, 50, e_mezcla(col, EP.blanco, 0.4));
  });
  // el marco de la pantalla gigante, con su resplandor tramado alrededor, y las dos laterales
  for (let y = 16; y <= 90; y++) for (let x = 86; x <= 234; x++) { const d = Math.max(92 - x, x - 228, 22 - y, y - 84, 0); if (d > 0 && (1 - d / 7) * 0.55 > e_b4(x, y)) pset(x, y, hex('#1c2238')); }
  rect(92, 22, 228, 84, EP.marco); rect(93, 23, 227, 23, EP.marcoL); rect(93, 83, 227, 83, EP.marcoS); rect(150, 84, 170, 86, EP.marco);
  for (const [x0, y0, x1, y1] of [[10, 44, 64, 78], [256, 50, 310, 84]]) { rect(x0, y0, x1, y1, EP.marco); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, EP.marcoL); rect(x0 + 24, y0 - 8, x0 + 24, y0, EP.cerchaS); rect(x1 - 24, y0 - 8, x1 - 24, y0, EP.cerchaS); }
  // el fondo del escenario bajo la pantalla, la tarima de tablas y la falda negra
  rect(28, 86, 292, 93, EP.k);
  for (let y = 94; y <= 108; y++) for (let x = 28; x <= 292; x++) { const tab = (y - 94) % 4 === 3, junta = (x + (((y - 94) >> 2) * 13)) % 37 === 0; pset(x, y, tab || junta ? EP.tablaS : h(x >> 1, y, 631) < 0.15 ? EP.tablaL : EP.tabla); }
  rect(28, 94, 292, 94, EP.tablaB);
  rect(28, 109, 292, 115, EP.falda); rect(28, 109, 292, 109, hex('#2a2c38')); for (let x = 30; x < 292; x += 12) rect(x, 112, x, 115, hex('#15161f'));
  // las torres de altavoces a los lados, sobre el escenario
  for (const x0 of [30, 274]) { rect(x0, 82, x0 + 16, 106, EP.k); rect(x0 + 1, 83, x0 + 15, 105, hex('#1e2028')); for (const [cy, r] of [[88, 3], [97, 5]]) { disco(x0 + 8, cy, r, hex('#2a2c36')); disco(x0 + 8, cy, r - 2, hex('#14151c')); pset(x0 + 6, cy - r + 1, hex('#4a4c5a')); } rect(x0 + 1, 100, x0 + 15, 100, hex('#2a2c36')); }
  // la mesa del panel, con su faldón, los micrófonos y las botellas de agua
  rect(50, 96, 82, 99, EP.k); rect(51, 96, 81, 96, hex('#3a4a7a')); rect(51, 99, 81, 106, hex('#1e2a50')); for (let x = 53; x < 81; x += 4) rect(x, 100, x, 106, hex('#18224a')); rect(51, 106, 81, 106, EP.k);
  for (const x of [58, 74]) { linea(x, 95, x + 2, 91, EP.m1); rect(x + 2, 90, x + 3, 91, EP.k); rect(x + 5, 91, x + 6, 95, hex('#8ac0e0')); pset(x + 5, 90, hex('#3a7aba')); }
  // el suelo del pabellón y el foso
  for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, e_b4(x, y) < 0.2 ? EP.muro1 : EP.techo0);
}

function e_audPantalla(R, t, o) {
  const { rect, pset } = R;
  e_capa(R, 'aud-p', () => e_audFondoP(R));
  e_pantalla(R, t, o, 39, 19, 241, 109);
  // el reflejo de la pantalla en las tablas, volteado y apagado
  for (let j = 0; j < 14; j++) { const ys = 108 - j * 2, yd = 120 + j; for (let x = 40; x <= 240; x++) { if ((x + yd) % 2) continue; const c = R.pget(x, ys), d = R.pget(x, yd); if (c && d) pset(x, yd, e_mezcla(d, c, 0.35 - j * 0.022)); } }
  // la tira de LED al pie de la pantalla y la del borde del escenario
  for (let x = 34; x <= 246; x++) { const v = ((x + Math.floor(t * 14)) % 16); for (let y = 112; y <= 116; y++) pset(x, y, Math.abs(v - 8 + Math.abs(y - 114)) < 1.2 ? EP.led : (x + y) % 2 ? EP.ledS : hex('#0e2a3a')); }
  for (let x = 0; x <= 319; x += 3) pset(x, 154, ((x / 3 + Math.floor(t * 8)) % 9) === 0 ? EP.ledL : EP.led);
  // los focos de arriba: haz y charco
  const COLF = [hex('#fff0b0'), hex('#a8d8ff'), hex('#ffd0a0')];
  [60, 140, 220].forEach((fx, i) => { const dx = Math.round(fx + Math.sin(t * 0.5 + i * 2.1) * 26); e_charco(R, dx, 140, 22, 4, COLF[i], 0.28); e_haz(R, fx, 10, dx, 138, 1, 16, COLF[i], 0.14, 0.3); e_foco(R, fx, 2, COLF[i], true, Math.sign(dx - fx)); });
  // humo de la máquina, que se arrastra por el suelo del escenario
  for (let i = 0; i < 9; i++) { const x = ((h(i, 1, 640) * 360 + t * (6 + i)) % 360) - 20, y = 140 + Math.round(h(i, 2, 640) * 10); for (let a = -10; a <= 10; a++) for (let b = -2; b <= 2; b++) if (e_b4(Math.round(x + a), y + b) < 0.18 * (1 - Math.abs(a) / 11)) { const c = R.pget(Math.round(x + a), y + b); if (c) pset(Math.round(x + a), y + b, e_mezcla(c, hex('#c8d0e0'), 0.25)); } }
  // la fila de cabezas de más atrás
  e_filaPublico(R, t, { y: 166, r: 8, dx: 22, x0: 14, f: 8, u: o.ovacion ?? 0, luz: EP.bordeF, oscuro: 0.35, moviles: 0.3, carteles: false });
  return { suelo: 146, escenario: [70, 240], publico: 180, pantalla: [39, 19, 241, 109] };
}

// la capa fija del auditorio con la pantalla de cerca
function e_audFondoP(R) {
  const { rect, pset, disco, linea } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, e_b4(x, y) < 0.18 + y / 900 ? EP.techo1 : EP.techo0);
  // la cercha de arriba (oscura, bajo el año y Atom)
  for (let x = 0; x < 320; x++) { pset(x, 1, EP.cerchaS); pset(x, 6, EP.cerchaS); } for (let x = 0; x < 320; x += 8) { linea(x, 1, x + 4, 6, EP.cerchaS); linea(x + 4, 6, x + 8, 1, EP.cerchaS); }
  // los telones de terciopelo a los dos lados, con sus pliegues y el filo de luz
  for (const [x0, x1] of [[0, 32], [248, 319]]) for (let y = 8; y < 156; y++) for (let x = x0; x <= x1; x++) { const p = Math.sin((x - x0) * 0.55 + y * 0.01); pset(x, y, p > 0.6 ? EP.tercL : p > -0.2 ? EP.terc : EP.tercS); }
  for (let x = 0; x <= 32; x++) if (x % 7 === 3) for (let y = 8; y < 156; y++) if (e_b4(x, y) < 0.5) pset(x, y, hex('#6a2a3a'));
  rect(248, 8, 248, 155, EP.k); rect(32, 8, 32, 155, EP.k);
  // el marco de la pantalla y su resplandor
  for (let y = 10; y <= 116; y++) for (let x = 30; x <= 250; x++) { const d = Math.max(36 - x, x - 244, 16 - y, y - 112, 0); if (d > 0 && (1 - d / 6) * 0.55 > e_b4(x, y)) pset(x, y, hex('#1c2238')); }
  rect(36, 16, 244, 111, EP.marco); rect(37, 17, 243, 17, EP.marcoL); rect(37, 110, 243, 110, EP.marcoS);
  // las tablas del escenario, con juntas en perspectiva
  for (let y = 117; y <= 152; y++) for (let x = 0; x < 320; x++) { const fila = y - 117, tab = fila > 0 && [4, 9, 15, 22, 30].includes(fila), junta = Math.round((x - 160) * 34 / (34 + fila * 2)) % 24 === 0; pset(x, y, tab || junta ? EP.tablaS : h(x >> 1, y, 641) < 0.13 ? EP.tablaL : EP.tabla); }
  rect(0, 117, 319, 117, EP.tablaB);
  rect(0, 153, 319, 159, EP.falda); rect(0, 153, 319, 153, hex('#2a2c38'));
  // la torre de altavoces y las cuñas de monitor en el suelo del escenario
  rect(256, 100, 284, 148, EP.k); rect(257, 101, 283, 147, hex('#1e2028')); for (const [cy, r] of [[110, 6], [130, 9]]) { disco(270, cy, r, hex('#2a2c36')); disco(270, cy, r - 3, hex('#14151c')); pset(267, cy - r + 1, hex('#4a4c5a')); }
  for (const x0 of [40, 226]) { R.poligono([[x0, 150], [x0 + 18, 150], [x0 + 16, 142], [x0 + 3, 140]], EP.k); R.poligono([[x0 + 1, 149], [x0 + 17, 149], [x0 + 15, 143], [x0 + 4, 141]], hex('#22242e')); for (let x = x0 + 5; x < x0 + 15; x += 2) rect(x, 144, x, 148, hex('#16171f')); }
  // el rincón de Atom, en calma: el telón se apaga ahí
  e_tinte(R, 266, 0, 319, 50, EP.techo0, 0.55);
  // el hueco oscuro del público
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, e_b4(x, y) < 0.15 ? EP.muro0 : EP.techo0);
}

// una silla de director (x: el centro; suelo; s: escala, 1 ≈ 17 px de alto), de frente: patas en aspa, asiento y
// respaldo de lona con sus costuras, brazos y largueros de madera con su luz; niebla (0–1) la funde con la oscuridad
function e_sillaDir(R, x, suelo, s, niebla = 0, luz = 0) {
  const { rect, linea, pset } = R, q = (v) => Math.round(v * s), osc = EP.techo0;
  const M = e_mezcla(EP.madera, osc, niebla), ML = e_mezcla(EP.maderaL, osc, niebla), MS = e_mezcla(EP.maderaS, osc, niebla), L = e_mezcla(luz > 0 ? EP.lonaL : EP.lona, osc, niebla * 0.6), LL = e_mezcla(hex('#4a4a56'), osc, niebla), LS = e_mezcla(EP.lonaS, osc, niebla * 0.5), K = e_mezcla(EP.k, osc, niebla * 0.5);
  x = Math.round(x); suelo = Math.round(suelo);
  if (s < 0.35) { rect(x - q(6), suelo - q(17), x + q(6), suelo - q(13), L); linea(x - q(6), suelo, x + q(6), suelo - q(8), M); linea(x + q(6), suelo, x - q(6), suelo - q(8), M); rect(x - q(6), suelo - q(9), x + q(6), suelo - q(8), L); return; }
  // las patas de atrás y el aspa de delante
  linea(x - q(5), suelo - q(1), x + q(5), suelo - q(8), MS); linea(x + q(5), suelo - q(1), x - q(5), suelo - q(8), MS);
  for (const d of [-1, 1]) { linea(x - d * q(6), suelo, x + d * q(6), suelo - q(8), K); linea(x - d * q(6) + 1, suelo, x + d * q(6) + 1, suelo - q(8), d > 0 ? M : ML); }
  rect(x - q(7), suelo - q(1), x - q(5), suelo, M); rect(x + q(5), suelo - q(1), x + q(7), suelo, MS);
  // el asiento de lona
  rect(x - q(6), suelo - q(9), x + q(6), suelo - q(7), K); rect(x - q(6) + 1, suelo - q(9) + 1, x + q(6) - 1, suelo - q(7), L); rect(x - q(6) + 1, suelo - q(9) + 1, x + q(6) - 1, suelo - q(9) + 1, LL);
  // los largueros, los brazos y el respaldo
  for (const d of [-1, 1]) { rect(x + d * q(6) - (d > 0 ? 1 : 0), suelo - q(18), x + d * q(6) + (d > 0 ? 0 : 1), suelo - q(7), K); rect(x + d * q(6) - (d > 0 ? 1 : 0) + (d > 0 ? 0 : 1), suelo - q(18), x + d * q(6) - (d > 0 ? 1 : 0) + (d > 0 ? 0 : 1), suelo - q(8), d > 0 ? MS : ML);
    rect(Math.min(x + d * q(5), x + d * q(8)), suelo - q(12), Math.max(x + d * q(5), x + d * q(8)), suelo - q(11), K); rect(Math.min(x + d * q(5), x + d * q(8)), suelo - q(12), Math.max(x + d * q(5), x + d * q(8)), suelo - q(12), d > 0 ? M : ML); rect(x + d * q(8), suelo - q(12), x + d * q(8), suelo - q(7), MS); }
  rect(x - q(6), suelo - q(18), x + q(6), suelo - q(14), K); rect(x - q(6) + 1, suelo - q(18) + 1, x + q(6) - 1, suelo - q(14) - 1, L);
  if (s >= 0.8) { rect(x - q(6) + 1, suelo - q(18) + 1, x + q(6) - 1, suelo - q(18) + 1, LL); rect(x - q(6) + 1, suelo - q(14) - 1, x + q(6) - 1, suelo - q(14) - 1, LS); for (let i = x - q(6) + 2; i < x + q(6) - 1; i += 2) { pset(i, suelo - q(18) + 2, LS); pset(i, suelo - q(14) - 2, LS); } }
  if (luz > 0) { pset(x - q(6), suelo - q(18), e_mezcla(EP.maderaL, EP.blanco, 0.5)); pset(x + q(6), suelo - q(18), EP.maderaL); }
}

// la fila infinita de sillas en perspectiva: de (xa, ya) a la fuga (fx, fy); avance: cuánto ha andado la cámara (sillas)
function e_filaSillas(R, t, xa, ya, fx, fy, s0, avance, focos) {
  const fr = avance - Math.floor(avance), lista = [];
  for (let i = 40; i >= 0; i--) { const z = 1 + (i - fr) * 0.42; if (z < 0.55) continue; const x = fx + (xa - fx) / z, y = fy + (ya - fy) / z, s = s0 / z; if (s < 0.1) continue; lista.push([x, y, s, z, i]); }
  for (const [x, y, s, z] of lista) {
    const niebla = e_lim((z - 1.3) / 6), luz = z < 5 ? 1 : 0; if (niebla > 0.97) continue;
    if (focos && luz) e_charco(R, Math.round(x), Math.round(y), Math.max(3, Math.round(12 * s)), Math.max(1, Math.round(3 * s)), hex('#fff0c8'), 0.22 * (1 - niebla));
    e_sillaDir(R, x, y, s, niebla, luz);
    if (focos && luz) { // el reflejo en el suelo brillante
      for (let j = 1; j < Math.round(8 * s); j++) if (e_b4(Math.round(x), Math.round(y) + j) < 0.5 - j * 0.04) { const c = R.pget(Math.round(x), Math.round(y) + j); if (c) R.pset(Math.round(x), Math.round(y) + j, e_mezcla(c, EP.maderaS, 0.4)); }
    }
  }
  return lista;
}

// el panel de LED colgado (x0, y0, x1, y1) con el piloto rojo del directo y o.contador (o un reloj que corre)
function e_panelContador(R, t, x0, y0, x1, y1, o) {
  const { rect, pset, disco } = R;
  for (const x of [x0 + 10, x1 - 10]) rect(x, 0, x, y0, EP.cerchaS);
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, EP.k); rect(x0, y0, x1, y1, hex('#0a0806')); rect(x0, y0, x1, y0, hex('#2a2620'));
  for (let y = y0 + 2; y < y1; y += 2) for (let x = x0 + 2; x < x1; x += 2) pset(x, y, hex('#1a120a'));
  const vivo = Math.floor(t * 1.5) % 2; disco(x0 + 6, y0 + 6, 2, vivo ? EP.rojo : EP.rojoS); if (vivo) pset(x0 + 5, y0 + 5, hex('#ffb0b0'));
  if (o.contador != null) { const n = String(o.contador); R.halo(Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2), Math.round((x1 - x0) / 2), [hex('#1a1006'), hex('#2a1a08')], 1.1); R.numero(n, Math.round((x0 + x1) / 2) + 3, y1 - 5, { tam: 16, centro: true, color: EP.ambar, sombra: false, contorno: false }); }
  else { const s = Math.floor(t) + 5 * 3600 + 21 * 60, hh = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = s % 60; R.numero(`${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, Math.round((x0 + x1) / 2) + 4, y1 - 6, { color: EP.ambar, sombra: false }); }
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) if ((x % 2 === 0 || y % 2 === 0) && R.pget(x, y) === EP.ambar) pset(x, y, EP.ambarS);
}

// la capa fija del plató (fuga en fx, fy; izq: la cámara mira hacia la izquierda): el telón de terciopelo del fondo con
// sus pliegues y la luz violeta del ciclorama que sube desde el suelo, la parrilla de tubos con sus focos de palas, los
// telones de los lados, el rincón de realización (mesa con tres monitores, un técnico con cascos y su taza) y el suelo
// negro de tableros con juntas en perspectiva, el reflejo del ciclorama, marcas de cinta, rozaduras y dos cables con cinta
function e_platoFondo(R, fx, fy, izq) {
  const { rect, pset, linea, disco, poligono } = R;
  // el telón del fondo: pliegues verticales y la luz del ciclorama, que sube desde el suelo y se apaga hacia arriba
  for (let y = 0; y < fy; y++) for (let x = 0; x < 320; x++) {
    const p = Math.sin(x * 0.42 + Math.sin(x * 0.05) * 2), sub = e_lim(1 - (fy - y) / 46), luz = sub * sub * 0.9 + (p > 0.5 ? 0.12 : p < -0.4 ? -0.08 : 0);
    const b = luz + e_b4(x, y) * 0.22; pset(x, y, b < 0.12 ? EP.techo0 : b < 0.3 ? hex('#100f1c') : b < 0.5 ? hex('#1a1630') : b < 0.72 ? hex('#262046') : hex('#342a5e'));
  }
  // la parrilla de tubos con los focos de palas (unos apagados, otros con la lente tibia)
  for (const y of [5, 15]) for (let x = 0; x < 320; x++) pset(x, y, x > 266 ? EP.techo1 : EP.cerchaS);
  for (let x = 6; x < 268; x += 18) { rect(x, 5, x, 15, EP.cerchaS); const on = h(x, 1, 653) < 0.4;
    rect(x - 3, 16, x + 3, 22, EP.k); rect(x - 2, 17, x + 2, 21, hex('#22242e')); pset(x - 2, 17, hex('#3a3c48')); linea(x - 4, 22, x - 6, 25, EP.cerchaS); linea(x + 4, 22, x + 6, 25, EP.cerchaS);
    rect(x - 2, 22, x + 2, 23, on ? hex('#a88a50') : hex('#2a2a34')); if (on) pset(x, 23, hex('#f8e0a0')); }
  // los telones de los lados
  for (const [x0, x1] of [[0, 12], [308, 319]]) for (let y = 24; y < fy + 8; y++) for (let x = x0; x <= x1; x++) { const p = Math.sin((x - x0) * 0.8); pset(x, y, p > 0.5 ? hex('#1c1a28') : p > -0.3 ? hex('#121119') : hex('#09090f')); }
  // el suelo: tableros negros con las juntas que van a la fuga, el reflejo violeta del ciclorama y el grano
  for (let y = fy; y < 180; y++) { const d = (y - fy) / (180 - fy);
    for (let x = 0; x < 320; x++) { const refl = e_lim(0.5 - d * 1.4) + (Math.sin(x * 0.42 + Math.sin(x * 0.05) * 2) > 0.5 ? 0.06 : 0), b = refl + e_b4(x, y) * 0.2 + (h(x >> 1, y, 654) - 0.5) * 0.12;
      pset(x, y, b < 0.1 ? EP.suelo0 : b < 0.22 ? EP.suelo1 : b < 0.4 ? EP.suelo2 : hex('#221e36')); } }
  for (let y = fy + 4; y < 180; y++) { const dz = y - fy, paso = dz * 1.3, zf = Math.floor(260 / dz), zf1 = Math.floor(260 / (dz + 1));
    for (let x = 0; x < 320; x++) { const rx = x - fx, m = rx - Math.round(rx / paso) * paso; if ((paso > 11 && Math.abs(m) < 0.5) || (zf !== zf1 && dz > 8 && (x & 1) === 0)) pset(x, y, hex('#0c0d13')); else if (paso > 11 && m > 0.5 && m < 1.5 && e_b4(x, y) < 0.3) pset(x, y, EP.suelo2); } }
  rect(13, fy - 1, 307, fy, hex('#2e2848'));
  // marcas de cinta (pocas y gastadas), rozaduras claras y dos cables con tiras de cinta encima
  for (let i = 0; i < 12; i++) { const x = Math.round(h(i, 1, 651) * 320), y = fy + 10 + Math.round(h(i, 2, 651) * (165 - fy)), c = e_mezcla([EP.cinta, EP.cintaR, EP.cintaA][i % 3], EP.suelo0, 0.45), l = 1 + Math.round((y - fy) / 35); rect(x - l, y, x + l, y, c); rect(x, y - 1, x, y + 1, c); }
  for (let i = 0; i < 50; i++) { const x = Math.round(h(i, 3, 652) * 320), y = fy + 6 + Math.round(h(i, 4, 652) * (174 - fy)); linea(x, y, x + 3 + Math.round(h(i, 5, 652) * 8), y + (i % 3 === 0 ? 1 : 0), i % 4 ? EP.suelo2 : hex('#2a2a36')); }
  for (const [y0, k] of [[156, 0], [174, 1]]) { let px = izq ? 320 : 0, py = y0; for (let s = 0; s <= 320; s += 4) { const x = izq ? 320 - s : s, y = y0 + Math.round(Math.sin(s * 0.035 + k * 2) * 5 + Math.sin(s * 0.11) * 2); linea(px, py, x, y, EP.k); linea(px, py - 1, x, y - 1, hex('#2a2c38')); px = x; py = y; if (s % 92 === 40) { rect(x - 2, y - 2, x + 3, y + 1, hex('#3a3a44')); rect(x - 2, y - 2, x + 3, y - 2, hex('#4a4a56')); } } }
  // el rincón de realización: mesa, tres monitores encendidos (la imagen la pone el plano), sillas, un técnico con cascos
  const vx = izq ? 230 : 20, vy = fy + 2;
  rect(vx, vy - 9, vx + 52, vy - 7, EP.k); rect(vx + 1, vy - 9, vx + 51, vy - 9, hex('#3a3c48')); rect(vx + 2, vy - 7, vx + 3, vy + 4, EP.k); rect(vx + 49, vy - 7, vx + 50, vy + 4, EP.k);
  for (let i = 0; i < 3; i++) { const mx = vx + 4 + i * 16; rect(mx, vy - 21, mx + 13, vy - 11, EP.k); rect(mx + 6, vy - 11, mx + 7, vy - 9, EP.k); }
  rect(vx + 40, vy - 12, vx + 42, vy - 10, hex('#c8c0b0')); pset(vx + 41, vy - 13, hex('#6a6a7a'));
}

// la vida del rincón de realización (vx, vy como en e_platoFondo): las tres pantallas, que cambian, y el técnico con
// cascos que mira y gira la cabeza
function e_realizacion(R, t, vx, vy) {
  const { rect, pset, disco } = R;
  for (let i = 0; i < 3; i++) { const mx = vx + 4 + i * 16, cual = (Math.floor(t / 2.5) + i) % 3;
    rect(mx + 1, vy - 20, mx + 12, vy - 12, cual === 0 ? hex('#1a1a28') : cual === 1 ? hex('#22203a') : hex('#14121e'));
    if (cual !== 2) { rect(mx + 4, vy - 17, mx + 9, vy - 16, hex('#8a6a40')); rect(mx + 5, vy - 15, mx + 8, vy - 13, hex('#3a3a48')); } else { rect(mx + 3, vy - 18, mx + 10, vy - 14, hex('#b04040')); pset(mx + 6, vy - 16, EP.blanco); }
    rect(mx + 1, vy - 20, mx + 12, vy - 20, hex('#4a4a6a')); }
  const x = vx + 26, y = vy - 1, gira = Math.sin(t * 0.6) > 0.3 ? 1 : 0;
  rect(x - 3, y - 8, x + 3, y, EP.k); rect(x - 2, y - 7, x + 2, y, hex('#2a3a5a')); disco(x, y - 11, 3, EP.k); disco(x, y - 11, 2.2, hex('#3a2a20')); pset(x - 1 + gira * 2, y - 11, E_PIELES[0]);
  rect(x - 3, y - 14, x + 3, y - 14, EP.k); pset(x - 3, y - 12, EP.k); pset(x + 3, y - 12, EP.k);
}

function e_platoGeneral(R, t, o) {
  const fx = 252, fy = 88;
  e_capa(R, 'plato-g', () => e_platoFondo(R, fx, fy, false));
  const { rect, pset, disco, linea } = R;
  e_realizacion(R, t, 20, fy + 2);
  // los bastones de luz de pie a lo largo del fondo, tibios, que respiran
  for (const [bx, k] of [[90, 0], [140, 1], [186, 2]]) { const b = 0.6 + Math.sin(t * 0.9 + k * 2) * 0.25; R.halo(bx, fy - 16, 12, [hex('#2a2030'), hex('#3a2a3a')], b * 1.3); rect(bx - 1, fy - 30, bx + 1, fy - 3, EP.k); rect(bx, fy - 29, bx, fy - 4, e_mezcla(hex('#a87a50'), hex('#ffe0a8'), b)); linea(bx - 3, fy, bx, fy - 3, EP.k); linea(bx + 3, fy, bx, fy - 3, EP.k); }
  // la grúa de cámara al fondo, que se balancea, con su piloto rojo
  { const bx = 288, by = fy + 4, a = -0.5 + Math.sin(t * 0.35) * 0.25, ex = Math.round(bx + Math.cos(a + Math.PI) * 30), ey = Math.round(by - 14 + Math.sin(a + Math.PI) * 30);
    rect(bx - 1, by - 14, bx + 1, by, EP.k); linea(bx - 6, by, bx + 6, by, EP.k); linea(bx + 10, by - 18, ex, ey, hex('#3a3c48')); linea(bx + 10, by - 17, ex, ey + 1, hex('#22242e')); rect(bx + 8, by - 20, bx + 13, by - 15, hex('#2a2c38'));
    rect(ex - 4, ey, ex + 3, ey + 5, EP.k); rect(ex - 3, ey + 1, ex + 2, ey + 4, hex('#30323e')); pset(ex - 4, ey + 2, hex('#5a8ac8')); if (Math.floor(t * 2) % 2) pset(ex + 2, ey, EP.rojo); }
  // un técnico con cascos que cruza al fondo, con un rollo de cable
  { const p = (t * 9) % 400, x = Math.round(p < 200 ? 60 + p : 460 - p), y = fy + 6, an = Math.floor(t * 5) % 2, d = p < 200 ? 1 : -1;
    rect(x - 2, y - 8, x + 2, y - 3, EP.k); rect(x - 1, y - 7, x + 1, y - 3, hex('#2e3040')); disco(x, y - 10, 2, EP.k); disco(x, y - 10, 1.3, hex('#c8906a')); pset(x - d, y - 11, EP.k); pset(x, y - 12, EP.k);
    rect(x - 1, y - 2, x - 1, y - an, EP.k); rect(x + 1, y - 2, x + 1, y - 1 + an, EP.k); disco(x + d * 3, y - 5, 2, hex('#e8a040')); pset(x + d * 3, y - 5, EP.k); }
  // la fila de sillas, que avanza despacio, con sus haces de luz
  const avance = t * (o.dolly ?? 0.12), lista = e_filaSillas(R, t, 30, 178, fx, fy, 2.0, avance, true);
  for (const [x, y, s, z] of lista) if (z < 4.2 && x > -10 && x < 330) e_haz(R, x + 8 * s, 24, x, y - 14 * s, 1, Math.max(3, 10 * s), hex('#fff0c8'), 0.13, 0.3);
  e_motas(R, t, 10, 200, 30, 170, 30, hex('#6a6470'), 3);
  e_camaraEstudio(R, t, 296, 176);
  // el panel de LED con el contador
  e_panelContador(R, t, 186, 22, 266, 46, o);
  return { suelo: 164, libre: [150, 290, 128, 176], fuga: [fx, fy], fila: [[30, 178], [fx, fy]], panel: [186, 22, 266, 46], realizacion: [20, 72, fy] };
}

function e_platoSilla(R, t, o) {
  const fx = 40, fy = 96;
  e_capa(R, 'plato-s', () => e_platoFondo(R, fx, fy, true));
  const { rect, pset, disco, poligono, linea } = R;
  e_realizacion(R, t, 230, fy + 2);
  // la fila que se pierde a la izquierda, en la oscuridad (quieta), con los charcos de luz más tenues
  e_filaSillas(R, t, 122, 148, fx, fy, 1.1, 0, true);
  // el haz fuerte sobre la última silla, con motas, y su charco de luz
  e_charco(R, 168, 155, 30, 6, hex('#fff0c8'), 0.32);
  e_haz(R, 176, 0, 168, 152, 3, 30, hex('#fff0c8'), 0.16, 0.42);
  e_motas(R, t, 140, 196, 20, 150, 30, hex('#e8e0c0'), 7);
  e_sillaDir(R, 168, 154, 1.6, 0, 1);
  // la capa verde colgada del respaldo: cae por delante y por el brazo derecho, con pliegues, la capucha y el broche
  if (o.capa !== false) {
    const sw = Math.round(Math.sin(t * 0.8) * 1), tela = (k) => { const p = Math.sin(k); return p > 0.55 ? EP.capaL : p > -0.25 ? EP.capa : EP.capaS; };
    // la capucha, que asoma por detrás del respaldo a la izquierda, con su hueco en sombra
    disco(161, 123, 5, EP.k); disco(161, 123, 4, EP.capaS); disco(160, 122, 3, EP.capa); pset(158, 120, EP.capaL); disco(162, 124, 2, EP.capaD);
    // la caída por el lado derecho, por fuera del brazo, hasta el suelo, con pliegues en diagonal y el bajo que se mece
    const borde = (y, a, b, c) => (y < 139 ? a + (b - a) * (y - 124) / 15 : b + (c - b) * (y - 139) / 14);
    for (let y = 123; y <= 153; y++) { const xa = Math.round(borde(y, 174, 177, 179 + sw)), xb = Math.round(borde(y, 181, 186, 189 + sw));
      for (let x = xa - 1; x <= xb + 1; x++) pset(x, y, x < xa || x > xb || y === 153 ? EP.k : x === xb ? EP.capaD : tela((x - y * 0.35) * 1.1)); }
    for (let x = 179 + sw; x <= 189 + sw; x += 3) pset(x, 152, EP.capaL);
    // el rollo de tela sobre el canto del respaldo
    for (let x = 155; x <= 183; x++) { const r = x < 157 || x > 181 ? 1 : 0; for (let y = 121 + r; y <= 127 - r; y++) pset(x, y, x === 155 || x === 183 || y === 121 + r || y === 127 - r ? EP.k : y === 122 + r ? EP.capaL : (x % 5 === 0 ? EP.capaS : y > 125 ? EP.capaS : EP.capa)); }
    // el paño que cae por delante de la lona, con el bajo ondulado
    for (let x = 157; x <= 172; x++) { const yb = 133 + Math.round(Math.sin(x * 0.9 + sw * 0.5)); for (let y = 128; y <= yb; y++) pset(x, y, y === yb || x === 157 ? EP.k : tela(x * 0.9 + y * 0.1)); }
    disco(172, 126, 2, EP.k); disco(172, 126, 1.5, EP.oro); pset(171, 125, EP.oroL); pset(173, 127, EP.oroS);   // el broche
  }
  e_panelContador(R, t, 26, 22, 106, 46, o);
  return { suelo: 156, silla: [168, 154], libre: [[96, 146], [196, 260]], panel: [26, 22, 106, 46] };
}

// la cámara de estudio sobre su pedestal (x: la columna; suelo), vista de lado mirando a la izquierda: cuerpo con el
// objetivo y el parasol, el visor, las asas, el piloto rojo que se enciende, la columna con el aro de dirección, la base
// con ruedas y el cable que se va por el suelo
function e_camaraEstudio(R, t, x, suelo) {
  const { rect, pset, disco, linea } = R;
  linea(x + 4, suelo - 1, 330, suelo - 6, EP.k); linea(x + 4, suelo - 2, 330, suelo - 7, hex('#2a2c38'));
  rect(x - 14, suelo - 4, x + 12, suelo - 2, EP.k); rect(x - 13, suelo - 4, x + 11, suelo - 4, hex('#3a3c48')); for (const dx of [-12, 0, 10]) { disco(x + dx, suelo - 1, 2, EP.k); pset(x + dx, suelo - 1, hex('#4a4c58')); }
  rect(x - 2, suelo - 34, x + 2, suelo - 4, EP.k); rect(x - 1, suelo - 34, x - 1, suelo - 5, hex('#4a4c58')); rect(x, suelo - 34, x + 1, suelo - 5, hex('#2a2c36'));
  for (let a = 0; a < 16; a++) pset(x + Math.round(Math.cos(a * 0.39) * 9), suelo - 20 + Math.round(Math.sin(a * 0.39) * 2), a < 8 ? hex('#5a5c68') : hex('#2a2c36'));
  rect(x - 12, suelo - 48, x + 8, suelo - 35, EP.k); rect(x - 11, suelo - 47, x + 7, suelo - 36, hex('#3a3e4a')); rect(x - 11, suelo - 47, x + 7, suelo - 47, hex('#5a5e6a')); rect(x - 11, suelo - 38, x + 7, suelo - 36, hex('#2a2c36'));
  rect(x - 22, suelo - 45, x - 12, suelo - 38, EP.k); rect(x - 21, suelo - 44, x - 13, suelo - 39, hex('#22242e')); rect(x - 26, suelo - 47, x - 22, suelo - 36, EP.k); rect(x - 25, suelo - 46, x - 23, suelo - 37, hex('#2e303a')); pset(x - 25, suelo - 43, hex('#5a8ac8')); pset(x - 25, suelo - 42, hex('#3a5a8a'));
  rect(x + 4, suelo - 56, x + 14, suelo - 48, EP.k); rect(x + 5, suelo - 55, x + 13, suelo - 49, hex('#1a2a3a')); rect(x + 6, suelo - 53, x + 11, suelo - 51, hex('#3a3a48')); pset(x + 8, suelo - 54, hex('#8a7050'));
  linea(x + 8, suelo - 36, x + 18, suelo - 28, EP.k); linea(x - 8, suelo - 36, x + 2, suelo - 26, EP.k);
  const vivo = Math.sin(t * 0.7) > -0.2; rect(x - 6, suelo - 51, x - 3, suelo - 49, EP.k); rect(x - 5, suelo - 50, x - 4, suelo - 50, vivo ? EP.rojo : EP.rojoS); if (vivo) R.halo(x - 4, suelo - 50, 5, [hex('#3a1418'), hex('#5a1a20')], 1.2);
}

// motas de polvo que flotan en la luz, dentro de x0–x1 × y0–y1 (n motas del color c; parpadean al girar)
function e_motas(R, t, x0, x1, y0, y1, n, c, k = 0) {
  const md = (v, m) => ((v % m) + m) % m;
  for (let i = 0; i < n; i++) { const x = x0 + md(h(i, k, 660) * (x1 - x0) + Math.sin(t * 0.4 + i) * 5 + t * 1.3, x1 - x0), y = y1 - md(h(i, k, 661) * (y1 - y0) + t * (1.5 + h(i, k, 662) * 2), y1 - y0);
    if (Math.sin(t * 1.3 + i * 2.1) > -0.3) R.pset(Math.round(x), Math.round(y), c); }
}

// el pie de un foco en primer plano, a la izquierda del plató (va por delante de los actores)
function e_pieFoco(R, t) {
  const { rect, linea, pset, disco } = R;
  linea(8, 180, 18, 150, EP.k); linea(30, 180, 20, 150, EP.k); rect(18, 120, 21, 152, EP.k); rect(19, 120, 19, 152, hex('#2a2c38'));
  rect(10, 106, 30, 120, EP.k); rect(11, 107, 29, 119, hex('#1e2028')); rect(11, 107, 29, 107, hex('#3a3c48')); for (let y = 109; y < 119; y += 3) rect(13, y, 27, y, hex('#15161d'));
  rect(30, 108, 33, 118, EP.k); pset(31, 110, hex('#ffe8a0')); pset(31, 113, hex('#ffe8a0'));
}

function e_prensaFondo(R, cerca) {
  const { rect, pset, disco, linea, poligono } = R, s = cerca ? 2 : 1, yt = cerca ? 140 : 112;
  // el fondo de paneles: la tela azul marino con su trama, los emblemas repetidos y las juntas, y la caída de luz
  for (let y = 0; y < yt; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y * 3) % 7 === 0 ? EP.navyL : (x * 3 + y) % 11 === 0 ? EP.navyS : EP.navy);
  const tw = 30 * s, th = 22 * s;
  for (let f = 0; f * th < yt; f++) for (let c = -1; c * tw < 330; c++) { const x = c * tw + (f % 2 ? tw / 2 : 0) + 6 * s, y = f * th + 6 * s;
    if ((f + c) % 2 === 0) { for (let i = 0; i < 3; i++) { const a = [9, 6, 8][i] * s; rect(x, y + i * 4 * s, x + a, y + i * 4 * s + 2 * s - 1, i === 1 ? EP.plataL : EP.plata); } }
    else e_mascara(R, x + 5 * s, y + 4 * s, s >= 2 ? 2 : 1, {}); }
  for (let x = 64 * s; x < 320; x += 64 * s) { rect(x, 0, x, yt - 1, EP.navyS); rect(x + 1, 0, x + 1, yt - 1, EP.navyL); }

  for (let y = 0; y < yt; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 190, (y - yt * 0.7) / (yt * 0.95)); if (d > 0.55 && e_b4(x, y) < (d - 0.55) * 1.6) { const c = R.pget(x, y); pset(x, y, e_mezcla(c, hex('#04050a'), 0.45)); } }
  // la barra del año y el rincón de Atom, en calma: el fondo se apaga ahí
  e_tinte(R, 14, 0, 176, 17, hex('#0a0e1c'), 0.6); e_tinte(R, 268, 0, 319, 50, hex('#0a0e1c'), 0.6);
  // los expositores enrollables a los lados, con la máscara, barras y 2026
  const ex = cerca ? [[0, 40], [282, 319]] : [[18, 54], [266, 302]], ya = cerca ? 52 : 48;
  for (const [x0, x1] of ex) { rect(x0, ya, x1, yt + 6, EP.k); for (let y = ya + 1; y < yt + 6; y++) for (let x = x0 + 1; x < x1; x++) { const v = (y - ya) / (yt - ya); pset(x, y, v + e_b4(x, y) * 0.2 < 0.3 ? hex('#0a1a10') : v + e_b4(x, y) * 0.2 < 0.7 ? hex('#12301c') : hex('#1a4a28')); }
    const cx = Math.round((x0 + x1) / 2); e_mascara(R, cx, ya + 20 * s / 1.2, 2, { capucha: true, brillo: 0.3 }); for (let i = 0; i < 3; i++) rect(x0 + 5, ya + 44 + i * 4, x1 - 5 - i * 5, ya + 45 + i * 4, i ? EP.m2 : EP.m3);
    R.numero('2026', cx, yt - 4, { centro: true, color: EP.capaL, sombra: false }); rect(x0 - 2, yt + 6, x1 + 2, yt + 8, EP.m1); rect(x0 - 2, yt + 6, x1 + 2, yt + 6, EP.m3); }
  // la tarima con moqueta azul y el faldón; el suelo del salón con su moqueta de rombos
  rect(0, yt, 319, yt + 12, hex('#1e3a7a')); for (let y = yt; y <= yt + 12; y++) for (let x = 0; x < 320; x++) if (e_b4(x, y) < 0.18) pset(x, y, hex('#2a4a8a')); rect(0, yt, 319, yt, hex('#3a5aa0'));
  rect(0, yt + 13, 319, yt + 19, EP.k); for (let x = 0; x < 320; x += 6) rect(x, yt + 14, x + 2, yt + 19, hex('#14161f'));
  for (let y = yt + 20; y < 180; y++) for (let x = 0; x < 320; x++) { const r = (Math.abs(((x + 8) % 16) - 8) + Math.abs(((y) % 12) - 6) * 1.3); pset(x, y, r < 2 ? EP.moqL : r > 9 ? EP.moqS : EP.moq); }
  // la mesita con mantel, botellas de agua y vasos
  if (!cerca) { rect(68, yt - 14, 98, yt - 11, EP.k); rect(69, yt - 14, 97, yt - 14, EP.blanco); rect(69, yt - 13, 97, yt - 2, EP.crema); for (let x = 71; x < 97; x += 3) rect(x, yt - 12, x, yt - 2, hex('#d0c8b4')); rect(69, yt - 1, 97, yt - 1, EP.k);
    for (const x of [73, 79, 85]) { rect(x, yt - 22, x + 2, yt - 15, hex('#8ac0e0')); rect(x, yt - 23, x + 2, yt - 23, hex('#3a7aba')); pset(x, yt - 21, EP.blanco); } rect(90, yt - 18, 93, yt - 15, hex('#c8e8f8')); }
}

function e_prensa(R, t, o, cerca) {
  const { rect, pset, disco, linea } = R, yt = cerca ? 140 : 112;
  e_capa(R, cerca ? 'prensa-c' : 'prensa-g', () => e_prensaFondo(R, cerca));
  // el foco de luz sobre el atril, que respira un poco
  e_charco(R, 160, cerca ? 100 : 76, cerca ? 70 : 52, cerca ? 46 : 36, hex('#8aa0d8'), 0.12 + Math.sin(t * 0.7) * 0.03);
  // los flashes: iluminan el fondo un instante
  const fl = e_flash(t, o.flashes ?? 0.5);
  if (fl > 0.2) e_tinte(R, 0, 0, 319, yt + 12, EP.blanco, 0.18 * fl, 0.5);
  if (!cerca) {
    // la cámara de televisión con su trípode, a la izquierda, con el piloto y el operador
    const cx = 34, cy = 128; linea(cx, cy + 4, cx - 10, 168, EP.k); linea(cx, cy + 4, cx + 8, 168, EP.k); linea(cx, cy + 4, cx, 168, hex('#2a2c38'));
    rect(cx - 12, cy - 6, cx + 10, cy + 4, EP.k); rect(cx - 11, cy - 5, cx + 9, cy + 3, hex('#3a3e4a')); rect(cx - 11, cy - 5, cx + 9, cy - 5, hex('#5a5e6a')); rect(cx + 10, cy - 4, cx + 16, cy + 2, EP.k); rect(cx + 11, cy - 3, cx + 15, cy + 1, hex('#22242e')); pset(cx + 14, cy - 2, hex('#5a8ac8'));
    rect(cx - 15, cy - 4, cx - 12, cy, EP.k); pset(cx - 9, cy - 7, Math.floor(t * 2) % 2 ? EP.rojo : EP.rojoS);
    e_cabeza(R, cx - 18, cy - 4, 6, 5, E_PELOS[2][0], E_PELOS[2][1], E_PIELES[1], hex('#8aa0d8'));
    // la primera fila de periodistas, de espaldas, con cámaras y móviles
    e_fotografos(R, t, 150, 7, 24, 60, 4, o.flashes ?? 0.5);
  }
  return cerca ? { suelo: 150, atril: [138, 182, 140], libre: [[70, 128], [192, 260]] } : { suelo: 122, atril: [146, 174, 112], libre: [[60, 140], [180, 250]], mesa: [68, 98] };
}

// la fuerza del flash más fuerte que salta en este instante (0–1)
function e_flash(t, dens) { let f = 0; for (let i = 0; i < 6; i++) { const per = 2.3 + i * 0.7, u = ((t + h(i, 1, 670) * per) % per); if (h(i, 2, 670) < dens + 0.2 && u < 0.12) f = Math.max(f, 1 - u / 0.12); } return f; }

// una fila de fotógrafos de espaldas (y, radio, paso, x0, semilla): unos con la cámara en alto ante la cara, que dispara
// su flash de vez en cuando, y otros con el móvil; hueco [x0, x1]: tramo sin nadie (para no tapar el atril)
function e_fotografos(R, t, y, r, dx, x0, f, dens, hueco = null) {
  const { rect, disco, pset, linea } = R;
  for (let k = 0; x0 + k * dx < 330; k++) {
    const x = Math.round(x0 + k * dx + (h(k, f, 680) - 0.5) * 6); if (hueco && x > hueco[0] && x < hueco[1]) continue; const ropa = e_mezcla(E_ROPA[Math.floor(h(k, f, 681) * 8)], EP.k, 0.35), pelo = E_PELOS[Math.floor(h(k, f, 682) * 7)], piel = E_PIELES[Math.floor(h(k, f, 683) * 4)];
    const hw = Math.round(r * 1.4); rect(x - hw - 1, y + r - 2, x + hw + 1, 180, EP.k); rect(x - hw, y + r - 1, x + hw, 180, ropa); rect(x - hw, y + r - 1, x + hw, y + r - 1, e_mezcla(ropa, EP.bordeF, 0.3)); rect(x, y + r, x, 180, e_mezcla(ropa, EP.k, 0.3));
    e_cabeza(R, x, y, r, [0, 1, 3, 5, 4, 2][Math.floor(h(k, f, 684) * 6)], pelo[0], pelo[1], piel, hex('#a8b8e0'));
    const sube = Math.sin(t * 0.8 + k * 1.3) > -0.4;
    if (h(k, f, 685) < 0.6 && sube) { // la cámara ante la cara: asoma por los lados de la cabeza, con el objetivo y las manos
      rect(x - r - 3, y - 3, x + r + 3, y + 3, EP.k); rect(x - r - 2, y - 2, x - r + 1, y + 2, hex('#2a2c34')); rect(x + r - 1, y - 2, x + r + 2, y + 2, hex('#2a2c34')); rect(x - 3, y - r - 2, x + 3, y - r + 1, EP.k); rect(x - 2, y - r - 1, x + 2, y - r, hex('#3a3c46'));
      disco(x - r - 3, y + 3, 1.6, piel); disco(x + r + 3, y + 3, 1.6, piel);
      const per = 2.1 + (k % 5) * 0.6, u = (t + h(k, f, 686) * per) % per; if (h(k, f, 687) < dens + 0.25 && u < 0.14) { const g = 1 - u / 0.14; R.halo(x, y - r - 2, 10 + 6 * g, [hex('#c8d0e8'), hex('#f0f4ff'), EP.blanco], 1.4); rect(x - 2, y - r - 3, x + 2, y - r - 1, EP.blanco); for (let a = 0; a < 4; a++) linea(x, y - r - 2, x + Math.round(Math.cos(a * 1.57 + 0.78) * 8 * g), y - r - 2 + Math.round(Math.sin(a * 1.57 + 0.78) * 8 * g), EP.blanco); }
    } else if (h(k, f, 688) < 0.5) { const d = k % 2 ? 1 : -1, hx = x + d * (hw + 1), hy = y - r; linea(x + d * (hw - 1), y + r, hx, hy + 3, EP.k); rect(hx - 2, hy - 3, hx + 2, hy + 3, EP.k); rect(hx - 1, hy - 2, hx + 1, hy + 2, hex('#a8d0ff')); disco(hx, hy + 4, 1.5, piel); }
  }
}

// el atril con su frente de madera oscura, el emblema de barras y la máscara, el ramillete de micrófonos con sus
// cubos de colores (sin letras) y el vaso de agua; va por delante de quien habla
function e_atril(R, t, cerca) {
  const { rect, pset, disco, linea, poligono } = R, cx = 160, top = cerca ? 140 : 112, hw = cerca ? 22 : 14, bot = cerca ? 186 : 127;
  poligono([[cx - hw - 2, top], [cx + hw + 2, top], [cx + hw - 1, bot], [cx - hw + 1, bot]], EP.k);
  poligono([[cx - hw - 1, top + 1], [cx + hw + 1, top + 1], [cx + hw - 2, bot], [cx - hw + 2, bot]], hex('#3a2a22'));
  for (let y = top + 3; y < bot; y++) { const u = (y - top) / (bot - top); pset(Math.round(cx - hw - 1 + u * 3) + 1, y, hex('#6a4a34')); pset(Math.round(cx + hw + 1 - u * 3) - 1, y, hex('#22160f')); if ((y - top) % 5 === 0) for (let x = cx - hw + 3; x < cx + hw - 2; x++) if (h(x, y, 690) < 0.4) pset(x, y, hex('#46342a')); }
  rect(cx - hw - 3, top - 2, cx + hw + 3, top + 1, EP.k); rect(cx - hw - 2, top - 2, cx + hw + 2, top - 1, hex('#5a4030')); rect(cx - hw - 2, top - 2, cx + hw + 2, top - 2, hex('#8a6a4a'));
  // el emblema del frente: placa de metal con la máscara y tres barras
  const ey = top + (cerca ? 14 : 8), es = cerca ? 2 : 1; rect(cx - 8 * es, ey - 5 * es, cx + 8 * es, ey + 6 * es, EP.k); rect(cx - 8 * es + 1, ey - 5 * es + 1, cx + 8 * es - 1, ey + 6 * es - 1, EP.navy); e_mascara(R, cx, ey - es, es >= 2 ? 2 : 1, {}); rect(cx - 5 * es, ey + 4 * es, cx + 5 * es, ey + 4 * es, EP.plata);
  // el ramillete de micrófonos, cada uno con su cubo de color, y el vaso de agua
  const n = cerca ? 7 : 5, mh = cerca ? 4 : 3;
  for (let i = 0; i < n; i++) { const bx = cx - hw + 4 + Math.round(i * (2 * hw - 8) / (n - 1)), tx = cx - 6 + Math.round(i * 12 / (n - 1)), ty = top - mh - (i % 2);
    linea(bx, top - 2, tx, ty, EP.k); const col = [EP.rojo, EP.azulC, EP.blanco, EP.cinta, EP.capaL, EP.violetaL, EP.cintaA][i];
    if (cerca || i % 2 === 0) { rect(tx - 2, ty + 2, tx + 2, ty + 5, EP.k); rect(tx - 1, ty + 3, tx + 1, ty + 4, col); }
    disco(tx, ty, cerca ? 2 : 1.5, EP.k); pset(tx - 1, ty - 1, EP.m2); }
  rect(cx + hw - 2, top - 7, cx + hw + 1, top - 3, EP.k); rect(cx + hw - 1, top - 6, cx + hw, top - 3, hex('#c8e8f8')); pset(cx + hw - 1, top - 6, EP.blanco);
}

// la primera fila de la prensa, por delante del atril
function e_prensaDelante(R, t, o, cerca) {
  if (cerca) { e_fotografos(R, t, 164, 10, 62, 34, 9, o.flashes ?? 0.5, [124, 196]); return; }
  e_fotografos(R, t, 172, 9, 30, 46, 6, o.flashes ?? 0.5);
}

// las capas fijas: se pintan una vez por lienzo y clave en un búfer de R.nuevo() (0 = hueco transparente)
const f_CACHE = new WeakMap();

function f_capa(R, clave, dibuja) {
  let m = f_CACHE.get(R); if (!m) f_CACHE.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega una capa fija sobre lo pintado respetando sus huecos (una pasada)
function f_pegar(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } }

// el umbral de tramado ordenado 4×4 (0–1)
const f_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const f_umbral = (x, y) => (f_BAYER[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores: a = 0 deja c, a = 1 da d
function f_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// elige un tono de una rampa (0–1) con tramado entre los dos vecinos
function f_rampa(cols, v, x, y) {
  const n = cols.length - 1, f = Math.max(0, Math.min(0.9999, v)) * n, i = Math.floor(f);
  return i < n && f_umbral(x, y) < f - i ? cols[i + 1] : cols[i];
}

// la zona de Atom y la barra del año: ahí no se pinta nada que llame la atención
const f_tranquilo = (x, y) => (x > 272 && y < 48) || (y < 16 && x > 14 && x < 176);

const FV = {
  cielo: ['#1e1228', '#2a1630', '#3a1c32', '#4e2234', '#682a36', '#883a3a', '#a84e3e', '#c86a46'].map(hex),
  nube0: ['#2e1a30', '#3a2034', '#4a2838'].map(hex), nube1: ['#3c1e30', '#58293a', '#7a3a40'].map(hex), nube2: ['#2a1426', '#4a2232', '#8a4440'].map(hex),
  lejos: hex('#5a2e36'), lejosL: hex('#78403e'), lejosS: hex('#44222e'), lejosV: hex('#9a5446'), bruma: hex('#8a4a42'),
  arena: ['#5a2a1e', '#7a3a24', '#9a5030', '#b8663a', '#cc7a46', '#de9258', '#eeaa6c'].map(hex),
  piedra: ['#2e2228', '#4a3a3e', '#665250', '#846c66', '#a48a7e', '#c4a898', '#dcc4b0'].map(hex),
  coche: hex('#4a9a92'), cocheS: hex('#2e6a68'), cocheL: hex('#86c4b6'), oxido: hex('#8a4424'), oxidoL: hex('#b8683a'),
  cromo: hex('#c8c8cc'), cromoS: hex('#7a7a84'), goma: hex('#262228'), gomaL: hex('#4a4248'),
  metal: hex('#5a5258'), metalS: hex('#3a3238'), metalL: hex('#8a7e80'),
  rayo: hex('#f4e0ff'), rayoS: hex('#b89ad8'), chispa: hex('#ffb040'), chispaL: hex('#fff0b0'), chispaS: hex('#e05a1a'),
  fuego: ['#8a1e10', '#d8501a', '#f89a2a', '#ffe070'].map(hex), humo: hex('#4a3438'), humoL: hex('#6a4e4e'),
  trapo: [hex('#a83a2a'), hex('#d8b070'), hex('#3a6a8a'), hex('#6a8a3a')],
};

// el cielo de tormenta: degradado tramado con el resplandor del horizonte (en un búfer); flash: el del relámpago
function f_cieloTormenta(R, hor, flash) {
  return f_capa(R, 'vac-cielo|' + hor + '|' + flash, () => {
    const B = R.buf;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const yy = Math.min(y, hor), u = yy / hor, glow = Math.exp(-(((x - 120) / 110) ** 2)) * u * u * u * 0.16, rem = Math.sin(x * 0.045 + y * 0.11) * Math.sin(x * 0.013 - y * 0.05) * 0.05;
      let v = u * 0.9 + glow + rem + (flash ? 0.16 : 0);
      B[y * 320 + x] = f_rampa(FV.cielo, v, x, y);
    }
  });
}

// una nube de tormenta de tres tonos (panza oscura, cuerpo y filo de luz por arriba); w = ancho
function f_nubeT(R, cx, cy, w, cols) {
  const BL = [[0, 0, 0.26], [-0.28, 0.05, 0.2], [0.28, 0.04, 0.22], [-0.1, -0.11, 0.21], [0.13, -0.08, 0.18], [-0.46, 0.09, 0.13], [0.47, 0.08, 0.13], [-0.02, 0.07, 0.24]];
  const r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of BL) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 2), r(f), cols[0]);
  for (const [dx, dy, f] of BL) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f * 0.92), cols[1]);
  for (const [dx, dy, f] of BL) if (dy < 0.06) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), r(f * 0.55), cols[2]);
}

// el cielo animado: copia el degradado, tres capas de nubes a tres velocidades, el relámpago y su fogonazo
function f_cieloVivo(R, t, hor, o) {
  const per = 5.3, k = Math.floor(t / per), ph = t - k * per, hay = o.relampagos !== false, flash = hay && (ph < 0.09 || (ph > 0.16 && ph < 0.22));
  R.copiar(f_cieloTormenta(R, hor, flash));
  // lejanas: casi del color del cielo, lentas
  for (let i = 0; i < 6; i++) { const w = 40 + h(i, 1, 801) * 30, x = ((h(i, 2, 801) * 420 + t * 1.2) % 440) - 60, y = 20 + h(i, 3, 801) * (hor * 0.3); f_nubeT(R, x, y, w, FV.nube0); }
  // medias
  for (let i = 0; i < 5; i++) { const w = 46 + h(i, 1, 802) * 30, x = ((h(i, 2, 802) * 420 + t * 3) % 460) - 70, y = hor * 0.45 + h(i, 3, 802) * hor * 0.2; f_nubeT(R, x, y, w, flash ? FV.nube2 : FV.nube1); }
  // cercanas: oscuras, grandes y rápidas, con el filo encendido por el resplandor
  for (let i = 0; i < 3; i++) { const w = 70 + i * 12, x = ((h(i, 2, 803) * 440 + t * 6.5) % 500) - 90, y = hor * 0.68 + i * 5; f_nubeT(R, x, y, w, FV.nube2); }
  // el relámpago: una rama quebrada que baja hasta el horizonte (los restos lo tapan después)
  if (hay && ph < 0.25) {
    const izq = h(k, 1, 804) < 0.35, x0 = izq ? 24 + h(k, 2, 804) * 70 : 182 + h(k, 2, 804) * 80; let x = x0, y = 18;
    const ramas = [];
    while (y < hor) { const nx = x + (h(k, y, 805) - 0.5) * 9, ny = y + 3 + h(k, y, 806) * 5; R.linea(x, y, nx, ny, FV.rayo); R.linea(x + 1, y, nx + 1, ny, FV.rayoS); if (h(k, y, 807) < 0.15) ramas.push([nx, ny]); x = nx; y = ny; }
    for (const [bx, by] of ramas) { let xx = bx, yy = by; for (let j = 0; j < 4; j++) { const nx = xx + 3 + h(bx, j, 808) * 4, ny = yy + 3; R.linea(xx, yy, nx, ny, FV.rayoS); xx = nx; yy = ny; } }
  }
  return flash;
}

// el suelo de arena: dunas con su ladera de luz y de sombra, rizos del viento cada vez más marcados cerca, guijarros
function f_arena(R, hor, sem) {
  const B = R.buf;
  for (let y = hor; y < 180; y++) { const u = (y - hor) / (180 - hor), f = y * 320;
    for (let x = 0; x < 320; x++) {
      const duna = Math.sin(x * 0.021 + u * 9 + sem + Math.sin(x * 0.007 + sem) * 2.2), lad = Math.cos(x * 0.021 + u * 9 + sem + Math.sin(x * 0.007 + sem) * 2.2);
      let v = 0.36 + u * 0.32 + lad * 0.16 + duna * 0.04;
      if (u < 0.12) v = v * (u / 0.12) + 0.3 * (1 - u / 0.12);   // la bruma del horizonte
      const riz = Math.sin(x * (0.18 + u * 0.22) + y * (0.9 + u * 0.6) + Math.sin(x * 0.05 + y * 0.13) * 3);
      if (u > 0.08 && riz > 0.9 - u * 0.05) v -= 0.17; else if (u > 0.08 && riz < -0.94) v += 0.08;
      const q = h(x, y, 810 + sem); if (q < 0.025 * u) v -= 0.3; else if (q > 1 - 0.02 * u) v += 0.14;
      B[f + x] = f_rampa(FV.arena, v, x, y);
    } }
}

// una piedra del desierto con su luz arriba a la derecha y su sombra
function f_piedraV(R, x, y, r) {
  for (let j = -r; j <= 2; j++) for (let i = -r - 3; i <= r + 3; i++) if (j > 0 && Math.abs(i + 2) < r + 2 - j) R.pset(x + i, y + j, FV.arena[1]);
  for (let j = -r; j <= 0; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.4); if (d > r) continue; R.pset(x + i, y + j, d > r - 1 ? FV.piedra[0] : f_rampa(FV.piedra, 0.35 + (i - j) / r * 0.2, x + i, y + j)); }
}

// los restos lejanos del horizonte, en la bruma: cúpula, rascacielos torcido, fortaleza pequeña, noria y proa de nave
function f_horizonte(R, hor, cual) {
  const { pset, rect, linea, poligono, disco } = R, c = FV.lejos, cL = FV.lejosL, cS = FV.lejosS, v = FV.lejosV;
  if (cual.includes('cupula')) {   // una cúpula rota con sus nervios y la linterna partida
    for (let j = 0; j <= 16; j++) { const w = Math.round(Math.sqrt(1 - (j / 17) ** 2) * 20); rect(4, hor - j, 4 + w * 2, hor - j, c); pset(4 + w * 2, hor - j, cL); }
    for (const dx of [8, 14, 20, 26, 32]) for (let j = 0; j < 15; j++) if (Math.hypot(dx - 24, j * 1.2) < 20) pset(4 + dx, hor - j, cS);
    for (let i = 0; i < 9; i++) pset(18 + i, hor - 16 + (i % 3), cS); rect(22, hor - 22, 26, hor - 17, c); pset(25, hor - 23, c); pset(23, hor - 20, v);
  }
  if (cual.includes('torre')) {   // un rascacielos hundido y torcido, con su rejilla de ventanas
    const ox = 104, a = 0.22, W = 20, H = 52, cs = Math.cos(a), sn = Math.sin(a), P = (u, w) => [ox + u * cs + w * sn, hor + 4 - w * cs + u * sn];
    const pts = [P(0, 0), P(W, 0), P(W, H), P(0, H)];
    poligono(pts, (x, y) => { const dx = x - ox, dy = y - (hor + 4), u = dx * cs + dy * sn, w = (dx * sn - dy * cs); const col = Math.floor(u / 4), fil = Math.floor(w / 4);
      if (u > W - 3) return cS; if ((u % 4) > 1.5 && (w % 4) > 1.8) return h(col, fil, 812) < 0.25 ? cS : h(col, fil, 813) < 0.12 ? v : cL; return c; });
    linea(...P(0, H), ...P(W, H), cL); linea(...P(W * 0.3, H), ...P(W * 0.35, H + 8), c); pset(...P(W * 0.35, H + 9), v);
  }
  if (cual.includes('fortaleza')) {   // la fortaleza pequeña: bloques, pinchos y dos banderas (las banderas, en el plano)
    for (const [x0, y0, x1] of [[146, hor - 12, 160], [158, hor - 18, 172], [170, hor - 10, 182], [140, hor - 7, 148]]) { rect(x0, y0, x1, hor + 1, cS); rect(x0, y0, x1, y0, cL); for (let x = x0 + 1; x < x1; x += 3) pset(x, y0 + 3, c); }
    for (const x of [148, 156, 162, 168, 176]) { linea(x, hor - 12 - (x % 5), x + 1, hor - 17 - (x % 5), cS); }
    rect(162, hor - 26, 162, hor - 18, cS); rect(176, hor - 20, 176, hor - 10, cS);
  }
  if (cual.includes('noria')) {   // una noria medio enterrada: el aro doble, los radios y las cabinas colgadas
    const cx = 224, cy = hor + 8, r = 32;
    for (let a = 0; a < Math.PI * 2; a += 0.012) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r); if (y <= hor) { pset(x, y, c); pset(Math.round(cx + Math.cos(a) * (r - 3)), Math.round(cy + Math.sin(a) * (r - 3)), cS); } }
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2 + 0.1, x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r; if (y1 < hor) linea(cx, Math.min(cy, hor), x1, y1, cS);
      if (y1 < hor - 4) { rect(Math.round(x1) - 2, Math.round(y1) + 2, Math.round(x1) + 2, Math.round(y1) + 5, k % 3 ? c : cL); pset(Math.round(x1), Math.round(y1) + 1, cS); pset(Math.round(x1) - 1, Math.round(y1) + 3, v); } }
    linea(cx - 14, hor, cx - 3, cy - 6, cS); linea(cx + 14, hor, cx + 3, cy - 6, cS);
  }
  if (cual.includes('nave')) {   // la proa de una nave clavada en la arena: placas, una aleta y las portillas
    poligono([[256, hor + 2], [304, hor + 2], [308, hor - 10], [290, hor - 24], [270, hor - 14]], c);
    poligono([[290, hor - 24], [308, hor - 10], [300, hor - 9], [287, hor - 20]], cL);
    poligono([[268, hor - 13], [256, hor - 30], [262, hor - 30], [276, hor - 17]], cS);
    for (let i = 0; i < 4; i++) { linea(266 + i * 9, hor + 1, 278 + i * 7, hor - 14 - i * 2, cS); disco(272 + i * 8, hor - 6 - i * 2, 1, v); }
  }
}

// la cabeza de estatua coronada, enorme y medio enterrada: piedra sombreada como un volumen (luz arriba a la derecha),
// con la corona de puntas, la frente, los ojos cerrados, la nariz, la oreja, grietas y la arena que la cubre por debajo
// de enterrada(x) (la y de la arena en cada columna). (cx, cy) el centro, rx/ry los radios, ang la inclinación
function f_cabeza(R, cx, cy, rx, ry, ang, enterrada) {
  const { pset, linea, poligono } = R, cs = Math.cos(ang), sn = Math.sin(ang), P = FV.piedra;
  const aPant = (u, v) => [cx + u * rx * cs - v * ry * sn, cy + u * rx * sn + v * ry * cs];
  // la corona: un aro con puntas
  for (let k = 0; k < 7; k++) { const u = -0.75 + k * 0.25, [x0, y0] = aPant(u - 0.1, -0.86), [x1, y1] = aPant(u + 0.1, -0.86), [xp, yp] = aPant(u, -1.28 - (k % 2) * 0.1);
    poligono([[x0, y0], [x1, y1], [xp, yp]], (x, y) => (x - xp) * cs + (y - yp) * sn > 0 ? P[3] : P[4]); linea(xp, yp, x1, y1, P[1]); pset(Math.round(xp), Math.round(yp), P[6]); }
  const L = [0.55, -0.6, 0.58], R2 = Math.max(rx, ry) + 2;
  for (let y = Math.floor(cy - R2); y <= cy + R2; y++) for (let x = Math.floor(cx - R2); x <= cx + R2; x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179 || y >= enterrada(x)) continue;
    const dx = x - cx, dy = y - cy, u = (dx * cs + dy * sn) / rx, v = (-dx * sn + dy * cs) / ry, d = u * u + v * v * (v > 0 ? 1.1 : 1);
    if (d > 1) continue;
    const nz = Math.sqrt(Math.max(0, 1 - d)); let b = (u * L[0] + v * L[1] + nz * L[2]) * 0.55 + 0.35 + (h(x >> 1, y >> 1, 820) - 0.5) * 0.12;
    if (v > -0.86 && v < -0.66) b += v < -0.82 ? 0.18 : v > -0.7 ? -0.2 : 0.05;   // el aro de la corona
    if (Math.abs(v + 0.32) < 0.05 && Math.abs(u) < 0.62) b -= 0.22;   // la frente
    for (const ex of [-0.34, 0.3]) { const e = (u - ex) / 0.17, ev = v + 0.12 - e * e * 0.05; if (Math.abs(e) < 1 && Math.abs(ev) < 0.03) b = 0.02; else if (Math.abs(e) < 1 && ev > -0.12 && ev < -0.03) b += 0.12; }   // los ojos cerrados y el párpado
    if (Math.abs(u - 0.0) < 0.1 && v > -0.2 && v < 0.24) b += u < -0.02 ? -0.18 : 0.12;   // el caballete de la nariz
    if (Math.abs(v - 0.27) < 0.05 && Math.abs(u) < 0.14) b -= 0.25;   // la base de la nariz
    if (Math.abs(v - 0.5) < 0.03 && Math.abs(u) < 0.26) b = 0.08;   // los labios
    if (u < -0.82 && Math.abs(v - 0.05) < 0.22) b -= 0.18;   // la oreja
    if (d > 0.93) b = Math.min(b, 0.12);   // el contorno
    pset(x, y, f_rampa(P, b, x, y));
  }
  // grietas: una grande que baja desde la corona y dos pequeñas
  for (const [s, u0, v0, n] of [[1, 0.42, -0.9, 14], [2, -0.6, -0.3, 6], [3, 0.6, 0.15, 5]]) { let [x, y] = aPant(u0, v0); for (let i = 0; i < n; i++) { const nx = x + (h(s, i, 821) - 0.6) * 4, ny = y + 3; if (ny < enterrada(Math.round(nx))) { linea(x, y, nx, ny, P[0]); pset(Math.round(nx) + 1, Math.round(ny), P[5]); } x = nx; y = ny; } }
}

// un coche de los cincuenta volcado (panza arriba, el techo hundido en la arena): carrocería descolorida con óxido,
// ruedas arriba con tapacubos, tubo de escape, parachoques cromado, ventanillas rotas; cx el centro, base la arena, s escala
function f_cocheVolcado(R, cx, base, s) {
  const { rect, pset, disco, poligono, linea } = R, S = (v) => Math.round(v * s), X = (v) => cx + S(v), Y = (v) => base - S(v);
  // la sombra en la arena (hacia la izquierda)
  for (let j = 0; j < S(4); j++) rect(X(-36) - j, base - j, X(26), base - j, j < 2 ? FV.arena[1] : FV.arena[2]);
  // la cabina (ahora abajo): el techo aplastado y las ventanillas rotas
  poligono([[X(-16), Y(2)], [X(16), Y(2)], [X(20), Y(11)], [X(-20), Y(11)]], C.k);
  poligono([[X(-15), Y(3)], [X(15), Y(3)], [X(18), Y(10)], [X(-18), Y(10)]], (x, y) => { const lo = x < X(-1) ? X(-17) : X(1), w = x - lo; return w < S(2) ? FV.cocheS : (w + y) % 7 === 0 ? FV.cocheL : (h(x, y, 830) < 0.2 ? hex('#3a4a5a') : hex('#1e2830')); });
  rect(X(-1), Y(10), X(1), Y(3), FV.cocheS);
  // la carrocería: el cuerpo largo con aletas, su luz arriba y el óxido
  poligono([[X(-30), Y(10)], [X(30), Y(10)], [X(32), Y(16)], [X(30), Y(23)], [X(-28), Y(23)], [X(-32), Y(17)]], C.k);
  poligono([[X(-29), Y(11)], [X(29), Y(11)], [X(31), Y(16)], [X(29), Y(22)], [X(-27), Y(22)], [X(-31), Y(17)]], (x, y) => {
    const v = (Y(11) - y) / S(11); let c = v > 0.75 ? FV.cocheL : v < 0.25 ? FV.cocheS : FV.coche;
    if (h(x >> 1, y >> 1, 831) < 0.16 || (h(x >> 2, y >> 2, 832) < 0.12)) c = h(x, y, 833) < 0.5 ? FV.oxido : FV.oxidoL; return c; });
  rect(X(-30), Y(17), X(30), Y(17), FV.cromo); rect(X(-30), Y(16), X(30), Y(16), FV.cromoS);   // la moldura
  rect(X(-33), Y(14), X(-31), Y(19), FV.cromo); rect(X(31), Y(13), X(33), Y(19), FV.cromo);   // los parachoques
  pset(X(31), Y(20), hex('#e8604a')); pset(X(-32), Y(20), hex('#f0e0a0'));   // piloto y faro
  // la panza: el chasis oscuro, los ejes y el tubo de escape
  rect(X(-26), Y(26), X(26), Y(23), FV.goma); rect(X(-26), Y(26), X(26), Y(26), FV.gomaL); linea(X(-22), Y(25), X(24), Y(25), FV.metalS); rect(X(24), Y(25), X(34), Y(25), FV.metal); pset(X(34), Y(25), C.k);
  for (const wx of [-19, 19]) { const x = X(wx), y = Y(28); disco(x, y, S(7) + 1, C.k); disco(x, y, S(7), FV.goma); disco(x, y, S(4), FV.cromoS); disco(x - 1, y - 1, S(3), FV.cromo); pset(x - S(2), y - S(2), C.blanco);
    for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(x + Math.cos(a) * S(5.6)), Math.round(y + Math.sin(a) * S(5.6)), FV.gomaL); }
}

// un letrero de carretera sin letras, inclinado: poste oxidado y panel de dos colores con una flecha y una estrella; las
// bombillas del borde se pintan aparte (f_bombillas) porque se persiguen
function f_letrero(R, x, base, s) {
  const { rect, pset, poligono, linea } = R, S = (v) => Math.round(v * s);
  rect(x - S(1), base - S(46), x + S(1), base, FV.metal); rect(x + S(1), base - S(46), x + S(1), base, FV.metalS); for (let y = base - S(44); y < base; y += S(6)) pset(x - S(1), y, FV.oxidoL);
  rect(x - S(4), base - S(1), x + S(4), base + 1, FV.arena[2]);
  const P = [[x - S(22), base - S(64)], [x + S(18), base - S(60)], [x + S(17), base - S(42)], [x - S(23), base - S(46)]];
  poligono(P.map(([a, b], i) => [a + (i < 2 ? 0 : 0), b]), C.k);
  poligono([[x - S(21), base - S(63)], [x + S(17), base - S(59)], [x + S(16), base - S(43)], [x - S(22), base - S(47)]], (xx, yy) => {
    const u = (xx - (x - S(21))) / S(38); let c = u < 0.62 ? hex('#a8322a') : hex('#e8d8a8'); if (h(xx >> 1, yy >> 1, 840) < 0.12) c = f_mezcla(c, FV.oxido, 0.6); return c; });
  // la flecha (pictograma) y la estrella
  const ax = x - S(14), ay = base - S(53); rect(ax, ay, ax + S(10), ay + S(2), hex('#f0e0b0')); poligono([[ax + S(10), ay - S(3)], [ax + S(15), ay + S(1)], [ax + S(10), ay + S(5)]], hex('#f0e0b0'));
  const sx = x + S(8), sy = base - S(51); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 5; linea(sx, sy, sx + Math.cos(a) * S(4), sy + Math.sin(a) * S(4), hex('#a8322a')); }
  pset(sx, sy, hex('#a8322a'));
}

function f_bombillas(R, x, base, s, t) {
  const S = (v) => v * s, n = 18;
  for (let k = 0; k < n; k++) { const u = k / n; let px, py;
    if (u < 0.5) { const f = u * 2; px = x - S(21) + f * S(38); py = base - S(64) + f * S(4); } else { const f = (u - 0.5) * 2; px = x + S(16) - f * S(38); py = base - S(42) - f * S(4); }
    const on = ((k + Math.floor(t * 6)) % 3) !== 0 && !(k === 7 && Math.sin(t * 13) > 0.2);   // una bombilla floja
    R.pset(Math.round(px), Math.round(py), on ? hex('#fff0a0') : hex('#5a3a2a')); }
}

// el semáforo hundido y torcido, con su ámbar que parpadea
function f_semaforo(R, t, x0, y0, s) {
  const { linea, rect, pset, disco } = R, S = (v) => Math.round(v * s);
  for (let i = -1; i <= 1; i++) linea(x0 + i, 180, x0 + S(10) + i, y0 + S(20), i < 1 ? FV.metal : FV.metalS);
  const x = x0 + S(10), y = y0; rect(x - S(5), y, x + S(5), y + S(26), C.k); rect(x - S(4), y + 1, x + S(4), y + S(25), hex('#3a3a2a')); rect(x + S(3), y + 1, x + S(4), y + S(25), hex('#26261c'));
  const on = Math.floor(t * 1.6) % 2 === 0;
  [[hex('#5a1a14'), hex('#5a1a14')], [on ? hex('#ffb030') : hex('#6a4a14'), hex('#fff0a0')], [hex('#143a1e'), hex('#143a1e')]].forEach(([c, cl], i) => { const cy = y + S(5) + i * S(8); disco(x, cy, S(3), c); if (i === 1 && on) { pset(x - 1, cy - 1, cl); for (let a = 0; a < 6.28; a += 0.4) if (f_umbral(Math.round(x + Math.cos(a) * S(6)), cy) < 0.5) pset(Math.round(x + Math.cos(a) * S(6)), Math.round(cy + Math.sin(a) * S(6)), hex('#c87a3a')); }
    rect(x - S(4), cy - S(4), x + S(4), cy - S(4), C.k); });
}

// una viga de doble T torcida, con remaches y óxido
function f_viga(R, x0, y0, x1, y1, g) {
  const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * 3) * 3);
    for (let j = -g; j <= g; j++) R.pset(x, y + j, j === -g ? FV.metalL : j === g ? FV.metalS : Math.abs(j) < 2 ? (h(x, y + j, 850) < 0.2 ? FV.oxido : FV.metal) : FV.metalS);
    R.pset(x, y + g + 1, C.k); if (i % 6 === 3) { R.pset(x, y - g + 1, FV.cromo); R.pset(x, y + g - 1, FV.metalL); } }
}

// la rodadora: una bola de ramitas que rueda y bota
function f_rodadora(R, x, y, t, r) {
  for (let k = 0; k < 14; k++) { const a = k * 0.9 + t * 5, b = a + 1.7 + (k % 3); R.linea(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.9), Math.round(x + Math.cos(b) * r * 0.5), Math.round(y + Math.sin(b) * r * 0.5), k % 2 ? hex('#7a5a34') : hex('#a8844a')); }
  R.pset(Math.round(x), Math.round(y), hex('#5a4024'));
}

// un chatarrero diminuto (8 px) que camina con un fardo, para la vida del fondo
function f_chatarrero(R, x, y, t, k, col) {
  const { pset, rect } = R, p = Math.floor(t * 4 + k) % 2;
  pset(x, y, C.k); pset(x + 2, y, C.k); if (p) pset(x + 1, y - 1, C.k); else { pset(x, y - 1, C.k); pset(x + 2, y - 1, C.k); }
  rect(x, y - 5, x + 2, y - 2, col); rect(x, y - 7, x + 2, y - 6, hex('#4a3a34')); pset(x + 1, y - 6, hex('#d8a07a'));
  rect(x - 3, y - 6, x - 1, y - 3, hex('#8a7a5a')); pset(x - 2, y - 7, hex('#a89a7a'));
}

// el portal de chispas: un óvalo que gira, con su luz dentro y chispas que saltan; a de 0 a 1
function f_portal(R, t, x, y, a) {
  if (a <= 0) return;
  const rx = 16 * a, ry = 22 * a;
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d < 0.8 && f_umbral(x + i, y + j) < (0.8 - d) * 0.9) R.pset(Math.round(x + i), Math.round(y + j), d < 0.3 ? hex('#ffe8a0') : hex('#e88a3a')); }
  for (let k = 0; k < 90; k++) { const an = k / 90 * Math.PI * 2 + t * 4, w = 1 + 0.08 * Math.sin(k * 3 + t * 9), px = Math.round(x + Math.cos(an) * rx * w), py = Math.round(y + Math.sin(an) * ry * w);
    R.pset(px, py, k % 3 === 0 ? FV.chispaL : k % 3 === 1 ? FV.chispa : FV.chispaS); if (k % 5 === 0) R.pset(px + 1, py, FV.chispa); }
  for (let k = 0; k < 10; k++) { const u = ((t * 1.6 + k / 10) % 1), an = k * 2.3 + t, px = Math.round(x + Math.cos(an) * (rx + u * 10)), py = Math.round(y + Math.sin(an) * (ry + u * 8) + u * u * 8); R.pset(px, py, u < 0.5 ? FV.chispaL : FV.chispaS); }
}

// ráfagas de arena que vuelan a ras de suelo (de izquierda a derecha)
function f_rafagas(R, t, y0, y1, n) {
  for (let k = 0; k < n; k++) { const L = 18 + h(k, 1, 860) * 30, y = Math.round(y0 + h(k, 2, 860) * (y1 - y0)), x0 = ((h(k, 3, 860) * 400 + t * (60 + k * 9)) % 440) - 60;
    for (let i = 0; i < L; i++) { const x = Math.round(x0 + i), yy = y + Math.round(Math.sin((x + t * 30) * 0.12) * 1.2); if (h(i, k, 861) < 0.45 || f_tranquilo(x, yy)) continue; R.pset(x, yy, i > L * 0.7 ? FV.arena[6] : FV.arena[5]); } }
}

// los cuervos que planean en círculos
function f_cuervos(R, t, cx, cy, n) {
  for (let k = 0; k < n; k++) { const a = t * 0.5 + k * 2.4, x = Math.round(cx + Math.cos(a) * (24 + k * 6)), y = Math.round(cy + Math.sin(a) * 6), b = Math.floor(t * 5 + k) % 2;
    if (f_tranquilo(x, y)) continue; R.pset(x, y, C.k); R.pset(x - 1, y - b, C.k); R.pset(x + 1, y - b, C.k); R.pset(x - 2, y - 1 + b, C.k); R.pset(x + 2, y - 1 + b, C.k); }
}

// una bandera de trapo que ondea en su mástil
function f_bandera(R, t, x, y, w, col, k) {
  R.linea(x, y, x, y + 14, FV.metalS);
  for (let i = 1; i <= w; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.6 + k) * (i / w) * 2); for (let j = 0; j < 5; j++) if (!(i === w && (j === 1 || j === 3))) R.pset(x + i, y + j + dy, j === 4 || (i + j) % 5 === 0 ? f_mezcla(col, C.k, 0.3) : col); }
}

// un bidón con fuego, sus llamas que bailan, el humo que sube y su resplandor en el suelo
function f_bidonFuego(R, t, x, base, k) {
  const { rect, pset, disco } = R;
  for (let j = -6; j <= 6; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i / 16, j / 5); if (d < 1 && f_umbral(x + i, base + j) < (1 - d) * 0.5) pset(x + i, base + j, f_mezcla(R.pget(x + i, base + j), FV.fuego[2], 0.35)); }
  rect(x - 5, base - 12, x + 5, base, C.k); rect(x - 4, base - 11, x + 4, base - 1, FV.oxido); rect(x - 4, base - 11, x - 3, base - 1, FV.oxidoL); rect(x + 3, base - 11, x + 4, base - 1, hex('#5a2a14'));
  for (const y of [base - 9, base - 4]) rect(x - 4, y, x + 4, y, hex('#5a2a14'));
  for (let i = 0; i < 12; i++) { const fx = x - 4 + (i % 9), al = 4 + Math.round((Math.sin(t * 11 + i * 1.7 + k) + 1) * 3 + (i % 3)), fy = base - 12;
    for (let j = 0; j < al; j++) pset(fx, fy - j, FV.fuego[Math.min(3, Math.floor((1 - j / al) * 3.5))]); }
  for (let i = 0; i < 6; i++) { const u = ((t * 0.35 + i / 6 + k * 0.13) % 1), sx = Math.round(x + Math.sin(u * 6 + i + t) * 3 + u * 10), sy = Math.round(base - 20 - u * 46); if (!f_tranquilo(sx, sy)) disco(sx, sy, 1 + u * 3, u < 0.5 ? FV.humoL : FV.humo); }
  if (Math.sin(t * 7 + k) > 0.6) pset(x + Math.round(Math.sin(t * 3) * 3), base - 22 - Math.round((t * 20 + k * 7) % 10), FV.chispaL);
}

// el Vacío: tres cámaras
function f_vacio(R, t, o) {
  const cam = o.camara ?? 'general';
  if (cam === 'fortaleza') return f_fortaleza(R, t, o);
  const restos = cam === 'restos', hor = restos ? 84 : 94;
  f_cieloVivo(R, t, hor, o);
  // la vida del horizonte, por detrás de los restos: cuervos sobre la noria, chatarreros que caminan
  f_cuervos(R, t, restos ? 150 : 224, restos ? 50 : 56, 3);
  const capa = f_capa(R, 'vac-' + cam, () => {
    const { rect, pset, linea, disco } = R;
    if (restos) {
      f_horizonte(R, hor, ['torre', 'fortaleza', 'noria']);
      f_arena(R, hor, 2.1);
      f_letrero(R, 150, 116, 0.55);
      // la arena amontonada contra la cabeza y la cabeza enorme a la derecha
      const enterr = (x) => 150 - Math.round(Math.max(0, (x - 190)) * 0.12) + Math.round(Math.sin(x * 0.09) * 2);
      f_cabeza(R, 244, 116, 64, 54, -0.2, enterr);
      for (let x = 176; x < 320; x++) { const y0 = enterr(x); for (let y = y0; y < y0 + 10 && y < 180; y++) if (R.pget(x, y) && y - y0 < 2) pset(x, y, FV.arena[y - y0 === 0 ? 5 : 4]); }
      f_cocheVolcado(R, 48, 158, 1.45);
      f_piedraV(R, 120, 172, 4); f_piedraV(R, 214, 176, 6); f_piedraV(R, 92, 150, 2);
      f_viga(R, 0, 120, 26, 132, 3);
      disco(205, 158, 5, C.k); disco(205, 158, 4, FV.cromoS); disco(204, 157, 3, FV.cromo); pset(203, 156, C.blanco);   // un tapacubos
    } else {
      f_horizonte(R, hor, ['cupula', 'torre', 'fortaleza', 'noria', 'nave']);
      f_arena(R, hor, 0.4);
      const enterr = (x) => 132 + Math.round(Math.abs(x - 62) * 0.06) + Math.round(Math.sin(x * 0.13) * 1.5);
      f_cabeza(R, 62, 108, 40, 38, -0.26, enterr);
      for (let x = 14; x < 112; x++) { const y0 = enterr(x); if (R.pget(x, y0 - 1)) { pset(x, y0, FV.arena[5]); pset(x, y0 + 1, FV.arena[4]); } }
      f_letrero(R, 186, 140, 1);
      f_cocheVolcado(R, 250, 140, 1);
      f_piedraV(R, 140, 124, 3); f_piedraV(R, 208, 150, 3); f_piedraV(R, 120, 176, 5); f_piedraV(R, 238, 170, 4); f_piedraV(R, 36, 150, 2);
      f_viga(R, 286, 180, 320, 150, 3);
      disco(266, 172, 6, C.k); disco(266, 172, 5, FV.cromoS); disco(265, 171, 4, FV.cromo); disco(266, 172, 1, FV.cromoS); pset(263, 169, C.blanco);   // un tapacubos
      // unas huellas que van hacia la fortaleza
      for (let k = 0; k < 9; k++) { const u = k / 9, x = Math.round(150 + u * 8 + (k % 2) * 3), y = Math.round(176 - u * 70); if (y > hor + 4) { pset(x, y, FV.arena[2]); pset(x + 1, y, FV.arena[2]); } }
    }
  });
  f_pegar(R, capa);
  // la vida: banderitas de la fortaleza lejana, chatarreros, luces, la rodadora, las ráfagas
  const fx = restos ? [[162, hor - 26], [176, hor - 20]] : [[162, hor - 26], [176, hor - 20]];
  for (const [x, y] of fx) for (let i = 1; i <= 4; i++) R.pset(x + i, y + Math.round(Math.sin(t * 7 - i) * 0.6), i % 2 ? FV.trapo[0] : f_mezcla(FV.trapo[0], C.k, 0.3));
  for (let k = 0; k < 3; k++) { const x = Math.round(((h(k, 1, 870) * 300 + t * (2 + k)) % 330) - 10), y = hor + 2 + k; if (Math.abs(x - 160) > 30 || k === 0) f_chatarrero(R, x, y, t, k, FV.trapo[k + 1]); }
  if (!restos) { if (Math.floor(t * 1.2) % 2) R.pset(290, hor - 23, hex('#ff5a3a')); f_semaforo(R, t, 6, 132, 1); }
  f_bombillas(R, restos ? 150 : 186, restos ? 116 : 140, restos ? 0.55 : 1, t);
  { const u = ((t * 0.09) % 1.3), x = -20 + u * 280, y = (restos ? 150 : 148) - Math.abs(Math.sin(t * 3.2)) * 7; f_rodadora(R, x, y, t, restos ? 5 : 4); }
  f_rafagas(R, t, hor + 6, 176, restos ? 7 : 9);
  const pe = o.portalEn ?? (restos ? [146, 140] : [150, 138]);
  f_portal(R, t, pe[0], pe[1], o.portal ?? 0);
  return restos ? { suelo: 164, libre: [98, 196], horizonte: hor, cabeza: [254, 104], coche: [48, 158], letrero: [150, 116], portal: pe }
    : { suelo: 160, libre: [96, 214], horizonte: hor, cabeza: [62, 108], coche: [250, 140], letrero: [186, 140], portal: pe };
}

// la fortaleza de restos, de cerca
function f_fortaleza(R, t, o) {
  const hor = 112;
  f_cieloVivo(R, t, hor, o);
  f_cuervos(R, t, 120, 40, 2);
  const capa = f_capa(R, 'vac-fortaleza', () => {
    const { rect, pset, linea, poligono, disco } = R;
    f_horizonte(R, hor, ['cupula']);
    f_arena(R, hor, 1.3);
    // una chapa ondulada con su luz, su sombra y sus remaches
    const chapa = (x0, y0, x1, y1, col, vert = true) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const o2 = (vert ? x : y) % 4; let c = o2 === 0 ? f_mezcla(col, C.k, 0.35) : o2 === 1 ? f_mezcla(col, C.blanco, 0.15) : col; if (h(x >> 1, y >> 1, 880) < 0.1) c = h(x, y, 881) < 0.5 ? FV.oxido : FV.oxidoL; pset(x, y, c); } rect(x0, y0, x1, y0, C.k); rect(x0, y1, x1, y1, C.k); rect(x0, y0, x0, y1, C.k); rect(x1, y0, x1, y1, C.k); for (let x = x0 + 3; x < x1; x += 7) { pset(x, y0 + 2, FV.cromo); pset(x, y1 - 2, FV.cromo); } };
    // un contenedor de lado con sus nervios, sus puertas y su sombra
    const contenedor = (x0, y0, w, hh, col) => { rect(x0, y0, x0 + w, y0 + hh, C.k); for (let y = y0 + 1; y < y0 + hh; y++) for (let x = x0 + 1; x < x0 + w; x++) { let c = (x - x0) % 3 === 0 ? f_mezcla(col, C.k, 0.3) : col; if (y < y0 + 3) c = f_mezcla(col, C.blanco, 0.2); if (y > y0 + hh - 3) c = f_mezcla(col, C.k, 0.4); if (h(x >> 1, y >> 1, 882) < 0.08) c = FV.oxido; pset(x, y, c); } rect(x0 + w - 6, y0 + 3, x0 + w - 6, y0 + hh - 3, C.k); pset(x0 + w - 4, y0 + hh / 2, FV.cromo); pset(x0 + w - 8, y0 + hh / 2, FV.cromo); };
    // el muro del fondo: chapas, puertas de coche y tablones a la altura del horizonte
    chapa(56, 74, 104, 150, hex('#7a6a5a')); chapa(214, 70, 262, 150, hex('#6a7a7a'), false);
    for (let k = 0; k < 6; k++) { const x = 104 + k * 5; rect(x, 66 + (k % 3) * 3, x + 4, 150, C.k); rect(x + 1, 67 + (k % 3) * 3, x + 3, 150, k % 2 ? hex('#8a5a34') : hex('#a06a3a')); for (let y = 70 + k; y < 150; y += 9) pset(x + 2, y, hex('#5a3a1e')); }
    for (let k = 0; k < 6; k++) { const x = 186 + k * 5; rect(x, 64 + (k % 2) * 4, x + 4, 150, C.k); rect(x + 1, 65 + (k % 2) * 4, x + 3, 150, k % 2 ? hex('#7a5030') : hex('#9a6436')); for (let y = 68 + k; y < 150; y += 8) pset(x + 2, y, hex('#5a3a1e')); }
    // un autobús escolar empotrado en el muro (a la izquierda), con sus ventanillas
    poligono([[58, 104], [104, 96], [104, 128], [58, 134]], C.k);
    poligono([[59, 105], [103, 97], [103, 127], [59, 133]], (x, y) => { const top = 105 - (x - 59) * 8 / 44; const v = y - top; if (v < 3) return hex('#f0c040'); if (v < 12 && (x - 59) % 8 > 1) return h(x >> 2, 1, 883) < 0.3 ? hex('#1e2830') : hex('#4a5a6a'); if (Math.abs(v - 16) < 1) return C.k; return h(x >> 1, y >> 1, 884) < 0.08 ? FV.oxido : hex('#d8a02a'); });
    // dos puertas de coche clavadas
    for (const [x, y, c] of [[226, 108, FV.coche], [240, 112, hex('#a83a2a')]]) { rect(x, y, x + 13, y + 16, C.k); rect(x + 1, y + 1, x + 12, y + 15, c); rect(x + 2, y + 2, x + 11, y + 7, hex('#2a3440')); linea(x + 3, y + 3, x + 6, y + 6, hex('#6a8090')); rect(x + 9, y + 10, x + 11, y + 10, FV.cromo); }
    // las torres de contenedores apilados (izquierda y derecha)
    contenedor(4, 120, 56, 30, hex('#a8402a')); contenedor(8, 92, 50, 28, hex('#2a6a8a')); contenedor(0, 64, 46, 28, hex('#5a7a3a'));
    contenedor(262, 120, 58, 30, hex('#3a5a8a')); contenedor(266, 92, 52, 28, hex('#b8782a')); contenedor(258, 64, 40, 28, hex('#8a3a4a'));
    // la valla publicitaria sin letras sobre el muro de la izquierda, torcida: barras y un pictograma de sol
    poligono([[60, 44], [112, 50], [110, 76], [58, 70]], C.k);
    poligono([[61, 45], [111, 51], [109, 75], [59, 69]], (x, y) => { let c = hex('#3aa0b8'); if (y > 60 + (x - 60) * 0.12) c = hex('#e8c060'); if (h(x >> 2, y >> 2, 885) < 0.12) c = hex('#c8c0b0'); return c; });
    disco(74, 56, 5, hex('#f8e070')); for (const [a, b] of [[86, 55], [86, 59]]) rect(a, b + Math.round((a - 60) * 0.12), a + 18, b + 1 + Math.round((a - 60) * 0.12), hex('#f6f2ea'));
    for (const x of [68, 100]) { linea(x, 72, x - 2, 76, FV.metalS); }
    // la puerta de vigas con el rastrillo levantado y el arco de chapa
    rect(126, 58, 135, 152, C.k); rect(185, 58, 194, 152, C.k);
    for (const x0 of [127, 186]) for (let y = 59; y < 152; y++) for (let x = x0; x < x0 + 8; x++) pset(x, y, x === x0 || x === x0 + 7 ? FV.metalS : x === x0 + 1 ? FV.metalL : (h(x, y >> 1, 886) < 0.12 ? FV.oxido : FV.metal));
    for (let x = 126; x <= 194; x++) { const y = Math.round(66 - Math.sin((x - 126) / 68 * Math.PI) * 10); for (let j = 0; j < 7; j++) pset(x, y + j, j === 0 || j === 6 ? C.k : j === 1 ? FV.metalL : (x % 6 === 0 ? FV.cromo : FV.metal)); }
    // el hueco de la puerta: dentro, el patio en sombra con hogueras lejanas
    for (let y = 73; y < 152; y++) for (let x = 136; x < 185; x++) { const v = (y - 73) / 79; pset(x, y, y > 132 ? f_rampa(FV.arena, 0.2 + (y - 132) / 60, x, y) : f_rampa([hex('#1a0e16'), hex('#2a1620'), hex('#3e2026')], v, x, y)); }
    for (let k = 0; k < 5; k++) { const x = 140 + k * 10, y = 130 - (k % 2) * 3; rect(x, y, x + 6, y + 2, hex('#4a2a2a')); }
    // el rastrillo de barras con sus puntas, subido
    for (let x = 138; x < 184; x += 5) { rect(x, 73, x + 1, 92, FV.metalS); pset(x, 93, FV.metal); pset(x, 94, C.k); } for (const y of [76, 84, 90]) rect(136, y, 184, y, FV.metalS);
    // pinchos de viga sobre el muro
    for (let k = 0; k < 18; k++) { const x = 52 + k * 12 + (k % 3) * 2, y = 60 + (k % 4) * 4; if (x > 120 && x < 200) continue; linea(x, y + 8, x + 2 - (k % 3), y - 6, FV.metalS); linea(x + 1, y + 8, x + 3 - (k % 3), y - 6, FV.metalL); }
    // el adarve de tablones sobre el muro
    for (const [x0, x1, y] of [[56, 126, 74], [194, 262, 70]]) { rect(x0, y, x1, y + 2, C.k); for (let x = x0; x <= x1; x++) pset(x, y + 1, x % 9 === 0 ? hex('#5a3a1e') : hex('#a87a46')); for (let x = x0 + 4; x < x1; x += 14) rect(x, y + 3, x, y + 8, hex('#5a3a1e')); }
    // la barricada de neumáticos y cajas al pie del muro
    for (const [x, y] of [[66, 152], [76, 152], [71, 146], [246, 152], [256, 152]]) { disco(x, y, 5, C.k); disco(x, y, 4, FV.goma); disco(x, y, 2, C.k); for (let a = 0; a < 6.28; a += 0.8) pset(Math.round(x + Math.cos(a) * 3.5), Math.round(y + Math.sin(a) * 3.5), FV.gomaL); }
    for (const [x, y] of [[100, 150], [212, 150]]) { rect(x, y - 12, x + 12, y, C.k); rect(x + 1, y - 11, x + 11, y - 1, hex('#a07a46')); for (const yy of [y - 8, y - 4]) rect(x + 1, yy, x + 11, yy, hex('#6a4a26')); linea(x + 1, y - 11, x + 11, y - 1, hex('#6a4a26')); }
    // el suelo pisoteado: huellas de ruedas hacia la puerta, piedras y un tapacubos
    for (let y = 152; y < 180; y++) for (const xx of [150, 170]) { const x = Math.round(xx + (xx - 160) * (y - 152) * 0.08); pset(x, y, FV.arena[2]); if (y % 3 === 0) pset(x + 1, y, FV.arena[2]); }
    f_piedraV(R, 30, 172, 5); f_piedraV(R, 290, 176, 6); f_piedraV(R, 110, 170, 3);
    disco(232, 172, 5, C.k); disco(232, 172, 4, FV.cromoS); disco(231, 171, 3, FV.cromo); pset(230, 170, C.blanco);
  });
  f_pegar(R, capa);
  // la vida: banderas de trapo, los vigías que pasean por el adarve, los bidones con fuego, chispas y ráfagas
  f_bandera(R, t, 20, 46, 12, FV.trapo[0], 0); f_bandera(R, t, 120, 40, 10, FV.trapo[1], 1); f_bandera(R, t, 200, 42, 10, FV.trapo[2], 2); f_bandera(R, t, 262, 48, 10, FV.trapo[3], 3);
  for (const [x0, x1, y, k] of [[60, 120, 73, 0], [198, 256, 69, 1]]) { const u = (Math.sin(t * 0.45 + k * 2) + 1) / 2, x = Math.round(x0 + u * (x1 - x0)); f_chatarrero(R, x, y, t, k, FV.trapo[k + 2]); }
  f_bidonFuego(R, t, 114, 160, 0); f_bidonFuego(R, t, 206, 160, 1);
  f_rafagas(R, t, 156, 178, 5);
  const pe = o.portalEn ?? [160, 128];
  f_portal(R, t, pe[0], pe[1], o.portal ?? 0);
  return { suelo: 166, libre: [40, 280], horizonte: hor, puerta: [136, 184, 152], bidones: [114, 206], portal: pe };
}

// la paleta de la mansión, de día o al atardecer (la tarde lo calienta todo y enciende ventanas y faroles)
const f_PALM = new Map();

function f_palMansion(tarde) {
  const k = tarde ? 1 : 0; if (f_PALM.has(k)) return f_PALM.get(k);
  const cal = (c, a = 0.22) => (tarde ? f_mezcla(hex(c), hex('#e87a3a'), a) : hex(c));
  const P = {
    cielo: (tarde ? ['#3a3a7a', '#5a4488', '#8a4c86', '#c45e74', '#e8805a', '#f8a868', '#ffd08a'] : ['#4a8ad0', '#5e9ada', '#74ace2', '#8cbcea', '#a6ccf0', '#c0dcf2', '#d8eaf4']).map(hex),
    nube: (tarde ? ['#8a4a6a', '#d8806a', '#ffc890'] : ['#a8bed6', '#dfeaf4', '#ffffff']).map(hex),
    lejos: cal('#5a7a8a', 0.3), lejosS: cal('#4a6a78', 0.3), bosque: cal('#2e5a3a'), bosqueS: cal('#1e4228'), bosqueL: cal('#4a7a44'),
    lad: cal('#a4503a'), ladS: cal('#7a3628'), ladL: cal('#c0664a'), llaga: cal('#cbbca4'), llagaS: cal('#9a8c78'),
    piedra: cal('#e0d6c2'), piedraS: cal('#b0a48e'), piedraSS: cal('#857a68'), piedraL: cal('#f4ecdc'),
    pizarra: cal('#4a5262'), pizarraS: cal('#343a48'), pizarraL: cal('#6a7488'),
    marco: cal('#f2eee4'), marcoS: cal('#bab4a6'), vidrio: cal('#2a3e58'), vidrioL: cal('#7aa4c8'), cortina: cal('#a83a3a'), cortinaS: cal('#7a2428'), luzV: hex('#f8c860'), luzVL: hex('#fff0b0'),
    puerta: cal('#5a3420'), puertaS: cal('#3a2014'), puertaL: cal('#7a4a2e'), laton: hex('#e8c050'),
    hierba: cal('#5aa040'), hierbaS: cal('#468a34'), hierbaD: cal('#2e6a2a'), hierbaL: cal('#7cc050'),
    seto: cal('#2e6a30'), setoS: cal('#1e4a22'), setoL: cal('#4a8a3e'), hiedra: cal('#3a7a3a'), hiedraS: cal('#245a2a'), hiedraL: cal('#5a9a4a'),
    grava: cal('#d8c8a8'), gravaS: cal('#b4a484'), gravaL: cal('#ece0c4'),
    agua: cal('#5a9ac8'), aguaS: cal('#3a78a8'), aguaL: cal('#c4e4f4'),
    tronco: cal('#5a3e2a'), troncoS: cal('#3a2618'), copa: [cal('#24502a'), cal('#3a7234'), cal('#5a9440'), cal('#86b850')],
    hangar: cal('#8a9098'), hangarS: cal('#5e646e'), hangarL: cal('#b4bac2'), jet: hex('#1a1c24'), jetL: hex('#3a3e4a'),
    flor: [hex('#e84a5a'), hex('#f8d040'), hex('#f6f2ea'), hex('#b05ad0')], humo: cal('#c8c8cc'), humoS: cal('#9a9aa4'),
  };
  f_PALM.set(k, P); return P;
}

// el cielo de la mansión: degradado tramado (en un búfer), el sol, tres capas de nubes y pájaros
function f_cieloDia(R, t, hor, P, tarde) {
  R.copiar(f_capa(R, 'man-cielo|' + hor + '|' + tarde, () => {
    const B = R.buf, sol = tarde ? [300, 84] : [266, 64];
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const u = Math.min(y, hor) / hor; let v = u + Math.sin(x * 0.03 + y * 0.07) * 0.025;
      const d = Math.hypot(x - sol[0], y - sol[1]); v += Math.max(0, 1 - d / (tarde ? 90 : 40)) * 0.25; B[y * 320 + x] = f_rampa(P.cielo, v, x, y); }
    if (tarde) { R.disco(300, 84, 11, hex('#ffe0a0')); R.disco(300, 84, 9, hex('#fff4d0')); } 
  }));
  const nube = (cx, cy, w) => { const BL = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
    for (const [dx, dy, f] of BL) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), P.nube[0]);
    for (const [dx, dy, f] of BL) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f * 0.95), P.nube[1]);
    for (const [dx, dy, f] of BL) if (dy < 0.05) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.6), P.nube[2]); };
  for (let i = 0; i < 4; i++) { const x = ((h(i, 1, 900) * 400 + t * 1.1) % 440) - 60, y = 22 + i * 7; if (x < 250) nube(x, y, 16 + i * 3); }   // lejanas y lentas (no pasan por la esquina de Atom)
  for (let i = 0; i < 3; i++) { const x = ((h(i, 1, 901) * 400 + t * 2.6) % 440) - 60, y = 50 + i * 9; nube(x, y, 26 + i * 4); }
  for (let i = 0; i < 2; i++) { const x = ((h(i, 1, 902) * 400 + t * 4.8) % 460) - 70, y = 70 + i * 10; nube(x, y, 38 + i * 6); }
  if (!tarde) { R.disco(266, 64, 8, hex('#fff4c0')); R.disco(266, 64, 7, hex('#ffe070')); R.disco(264, 62, 3, hex('#fffcec')); }   // de día, el sol va delante de las nubes
  for (let k = 0; k < 4; k++) { const x = Math.round(((t * (14 + k * 2) + k * 70) % 360) - 20), y = Math.round(44 + k * 5 + Math.sin(t * 2 + k) * 2), b = Math.floor(t * 6 + k) % 2; if (f_tranquilo(x, y)) continue;
    R.pset(x, y, C.k); R.pset(x - 1, y - b, C.k); R.pset(x + 1, y - b, C.k); R.pset(x - 2, y - 1, C.k); R.pset(x + 2, y - 1, C.k); }
}

// un muro de ladrillo con hiladas a soga, llagas y ladrillos de tonos distintos, con sombra bajo la cornisa (sy)
function f_ladrillo(R, x0, y0, x1, y1, P, sy = -1) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor(y / 3), off = (fila % 2) * 3;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let c;
      if (y % 3 === 2) c = P.llaga; else if ((x + off) % 6 === 5) c = P.llagaS;
      else { const q = h((x + off) / 6 | 0, fila, 910); c = q < 0.18 ? P.ladS : q > 0.86 ? P.ladL : P.lad; if (y % 3 === 0 && q > 0.5) c = P.ladL; }
      if (sy >= 0 && y < sy + 4 && y >= sy && f_umbral(x, y) < 1 - (y - sy) / 4) c = f_mezcla(c, C.k, 0.3);
      B[y * 320 + x] = c; } }
}

// una ventana de guillotina: marco blanco, dintel de piedra, cristal con su reflejo, cortinas y alféizar; luz: encendida
function f_ventana(R, x, y, w, hh, P, luz) {
  const { rect, pset, linea } = R;
  rect(x - 2, y - 3, x + w + 2, y - 1, P.piedra); rect(x - 2, y - 1, x + w + 2, y - 1, P.piedraS); pset(x + (w >> 1), y - 3, P.piedraL);   // el dintel con su clave
  rect(x - 1, y, x + w + 1, y + hh, C.k); rect(x, y, x + w, y + hh, P.marco);
  const g = (x0, y0, x1, y1) => { for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) { let c = luz ? ((xx + yy) % 7 === 0 ? P.luzVL : P.luzV) : (yy - y0 + (xx - x0)) % 9 < 2 ? P.vidrioL : P.vidrio; if (!luz && yy === y0) c = f_mezcla(P.vidrio, C.k, 0.4); pset(xx, yy, c); } };
  const m = y + (hh >> 1); g(x + 1, y + 1, x + w - 1, m - 1); g(x + 1, m + 1, x + w - 1, y + hh - 1);
  rect(x + 1, m, x + w - 1, m, P.marco); linea(x + (w >> 1), y + 1, x + (w >> 1), y + hh - 1, P.marco);
  for (let yy = y + 1; yy < y + hh; yy++) { pset(x + 1, yy, P.cortina); pset(x + w - 1, yy, P.cortinaS); if (yy < y + hh * 0.6) { pset(x + 2, yy, P.cortina); pset(x + w - 2, yy, P.cortina); } }
  rect(x - 2, y + hh + 1, x + w + 2, y + hh + 2, P.piedra); rect(x - 2, y + hh + 2, x + w + 2, y + hh + 2, P.piedraSS);   // el alféizar
}

// un roble que se mece: tronco con su lado de sombra, ramas y una copa de cuatro tonos con huecos
function f_roble(R, x, base, s, t, P) {
  const { rect, pset, disco } = R, S = (v) => Math.round(v * s), m = Math.sin(t * 0.9 + x) * 1.2 * s;
  for (let j = 0; j < S(30); j++) { const w = S(4) - Math.floor(j / S(12)); rect(x - w, base - j, x + w, base - j, P.tronco); rect(x + w - S(1.5), base - j, x + w, base - j, P.troncoS); if ((j + x) % 5 === 0) pset(x - 1, base - j, P.troncoS); }
  rect(x - S(7), base, x + S(7), base + 1, P.hierbaD);
  const cs = [[0, -40, 18], [-14, -32, 13], [14, -33, 14], [-6, -50, 12], [9, -48, 12], [-18, -22, 9], [19, -24, 9]];
  cs.forEach(([dx, dy, r], i) => disco(x + S(dx) + m * (i % 2 ? 1 : 0.6), base + S(dy) + 2, S(r), P.copa[0]));
  cs.forEach(([dx, dy, r], i) => disco(x + S(dx) + m, base + S(dy), S(r * 0.9), P.copa[1]));
  cs.forEach(([dx, dy, r], i) => disco(x + S(dx) + m - S(2), base + S(dy) - S(3), S(r * 0.55), P.copa[2]));
  for (let k = 0; k < 40; k++) { const a = h(k, x, 920) * 6.28, d = h(k, x, 921) * S(20), px = Math.round(x + Math.cos(a) * d * 1.2 + m), py = Math.round(base - S(40) + Math.sin(a) * d - S(3)); pset(px, py, k % 3 ? P.copa[3] : P.copa[0]); }
}

// la fuente: el pilón ovalado de piedra con el agua que ondea, la columna de dos tazas y el agua que cae
function f_fuente(R, t, cx, base, P) {
  const { rect, pset, disco } = R;
  for (let j = -7; j <= 7; j++) for (let i = -28; i <= 28; i++) { const d = (i / 28) ** 2 + (j / 7) ** 2; if (d > 1) continue; pset(cx + i, base - 4 + j, d > 0.72 ? (j < 0 ? P.piedraL : P.piedraS) : (() => { const rr = Math.sqrt(d) * 10 - t * 3; return Math.sin(rr * 2) > 0.75 ? P.aguaL : (i + j * 3 + 40) % 9 === 0 ? P.aguaL : j < -2 ? P.aguaS : P.agua; })()); }
  rect(cx - 28, base - 3, cx + 28, base + 3, P.piedra); for (let x = cx - 28; x <= cx + 28; x++) { const yy = base - 3 + Math.round((1 - ((x - cx) / 28) ** 2) * 6) ; pset(x, Math.min(yy + 3, base + 6), P.piedraSS); }
  for (let x = cx - 27; x <= cx + 27; x += 6) pset(x, base, P.piedraS);
  rect(cx - 2, base - 22, cx + 2, base - 4, P.piedra); rect(cx + 1, base - 22, cx + 2, base - 4, P.piedraS);
  for (const [yy, w] of [[base - 22, 10], [base - 32, 6]]) { rect(cx - w, yy - 2, cx + w, yy, P.piedra); rect(cx - w, yy, cx + w, yy + 1, P.piedraSS); rect(cx - w + 1, yy - 2, cx + w - 1, yy - 2, P.aguaL); }
  rect(cx - 1, base - 38, cx + 1, base - 33, P.piedra); disco(cx, base - 39, 1.5, P.piedraL);
  for (let k = 0; k < 16; k++) { const u = (t * 1.4 + k / 16) % 1, sd = k % 2 ? 1 : -1, w = k < 8 ? 10 : 6, y0 = k < 8 ? base - 22 : base - 32, x = Math.round(cx + sd * (w + u * 3)), y = Math.round(y0 + u * u * (k < 8 ? 18 : 10));
    pset(x, y, u > 0.7 ? P.aguaL : P.agua); pset(x, y + 1, P.aguaS); }
  for (let k = 0; k < 4; k++) { const u = (t * 1.8 + k / 4) % 1; pset(cx + Math.round(Math.sin(k * 2) * 2), base - 40 - Math.round(Math.sin(u * Math.PI) * 4), P.aguaL); }
}

// el humo de una chimenea: bocanadas que suben y se tuercen con el viento
function f_humoCh(R, t, x, y, P, k) {
  for (let i = 0; i < 7; i++) { const u = ((t * 0.25 + i / 7 + k * 0.31) % 1), sx = Math.round(x - u * 26 + Math.sin(u * 5 + t + k) * 2), sy = Math.round(y - u * 30); if (f_tranquilo(sx, sy)) continue; R.disco(sx, sy, 1 + u * 3, u < 0.45 ? P.humo : P.humoS); }
}

// un figurante diminuto (9 px) que pasea: un alumno con jersey de color o el jardinero con su cortacésped
function f_alumno(R, x, y, t, k, col, P) {
  const { pset, rect } = R, p = Math.floor(t * 4 + k) % 2;
  rect(x, y - 2, x, y, hex('#2a2a3a')); rect(x + 2, y - 2, x + 2, y, hex('#2a2a3a')); if (p) { pset(x, y, P.grava); pset(x + 1, y, hex('#2a2a3a')); }
  rect(x, y - 6, x + 2, y - 3, col); rect(x, y - 8, x + 2, y - 7, hex('#e0aa80')); rect(x, y - 9, x + 2, y - 9, k % 2 ? hex('#3a2a1a') : hex('#c89a4a'));
  if (k === 3) { rect(x + 4, y - 3, x + 8, y, hex('#c83a2a')); pset(x + 3, y - 4, C.k); pset(x + 5, y, C.k); pset(x + 8, y, C.k); }   // el cortacésped
}

function f_mansion(R, t, o) {
  const tarde = o.luz === 'tarde', P = f_palMansion(tarde);
  if ((o.camara ?? 'general') === 'cerca') return f_escalinata(R, t, o, P, tarde);
  const hor = 104;
  f_cieloDia(R, t, hor, P, tarde);
  const capa = f_capa(R, 'man-general|' + tarde, () => {
    const { rect, pset, linea, poligono, disco } = R, B = R.buf;
    // las colinas lejanas y el bosque del horizonte
    for (let x = 0; x < 320; x++) { const yc = Math.round(92 - 6 * Math.sin(x * 0.02 + 1) - 3 * Math.sin(x * 0.07)); for (let y = yc; y < hor; y++) B[y * 320 + x] = (y - yc) < 2 ? P.lejos : P.lejosS;
      const yb = Math.round(99 - 3 * Math.abs(Math.sin(x * 0.21)) - 2 * Math.abs(Math.sin(x * 0.53))); for (let y = yb; y < hor + 2; y++) B[y * 320 + x] = h(x >> 1, y >> 1, 930) < 0.25 ? P.bosqueL : y - yb < 1 ? P.bosqueL : (x + y) % 3 ? P.bosque : P.bosqueS; }
    // el hangar al fondo a la derecha: bóveda de chapa con nervios y la puerta abierta (el avión, en el plano)
    for (let y = 80; y < 112; y++) for (let x = 264; x < 320; x++) { const u = (x - 292) / 30, top = 112 - Math.sqrt(Math.max(0, 1 - u * u)) * 32; if (y < top) continue; let c = x % 5 === 0 ? P.hangarS : u < -0.3 ? P.hangarL : P.hangar; if (y - top < 1) c = C.k; pset(x, y, c); }
    rect(278, 92, 306, 112, C.k); for (let y = 93; y < 112; y++) for (let x = 279; x < 306; x++) pset(x, y, y < 96 ? hex('#141418') : f_rampa([hex('#1e2028'), hex('#2a2e38'), hex('#3a3e48')], (y - 93) / 19, x, y));
    rect(278, 110, 306, 112, hex('#5a5a5e'));
    // el avión negro a medio salir: morro, cabina con su brillo, alas en flecha
    poligono([[282, 104], [302, 100], [316, 104], [302, 107]], P.jet); poligono([[290, 104], [278, 110], [284, 110], [298, 105]], P.jetL); poligono([[290, 103], [296, 99], [304, 101]], P.jet);
    rect(303, 101, 308, 102, hex('#4a6a8a')); pset(305, 101, hex('#c8e4f8')); linea(284, 105, 314, 104, P.jetL);
    // la mansión: alas y cuerpo central de ladrillo, con la cornisa de piedra y las esquinas de sillar
    f_ladrillo(R, 36, 60, 256, 112, P, 60); f_ladrillo(R, 112, 44, 180, 112, P, 44);
    for (const [x0, x1, y] of [[34, 258, 58], [110, 182, 42]]) { rect(x0, y - 2, x1, y + 1, P.piedra); rect(x0, y - 3, x1, y - 3, C.k); rect(x0, y + 1, x1, y + 1, P.piedraSS); for (let x = x0 + 1; x < x1; x += 3) pset(x, y, P.piedraS); }
    rect(36, 84, 256, 85, P.piedra); rect(36, 85, 256, 85, P.piedraS);   // la imposta entre pisos
    for (const xq of [36, 108, 180, 252]) for (let y = (xq === 108 || xq === 180) ? 44 : 60; y < 112; y += 4) { rect(xq, y, xq + ((y >> 2) % 2 ? 5 : 3), y + 2, P.piedra); rect(xq, y + 3, xq + 5, y + 3, P.piedraS); }
    // el tejado de pizarra de las alas y del cuerpo central, con sus hileras, buhardillas y chimeneas
    const tejado = (x0, x1, yb, al, ent) => { for (let j = 0; j < al; j++) { const y = yb - j, a = x0 + Math.round(j * ent / al), b = x1 - Math.round(j * ent / al); for (let x = a; x <= b; x++) pset(x, y, x === a || x === b ? C.k : j % 3 === 0 ? P.pizarraS : ((x + (j / 3 | 0) * 2) % 5 === 0 ? P.pizarraS : h(x >> 1, j, 931) < 0.15 ? P.pizarraL : P.pizarra)); } rect(x0 + ent, yb - al, x1 - ent, yb - al, C.k); };
    tejado(34, 258, 54, 12, 6); tejado(108, 184, 38, 14, 8);
    for (const x of [56, 86, 206, 236]) { rect(x - 5, 44, x + 5, 53, C.k); rect(x - 4, 45, x + 4, 53, P.piedra); rect(x - 2, 47, x + 2, 52, tarde && x % 3 ? P.luzV : P.vidrio); pset(x - 1, 48, P.vidrioL); poligono([[x - 7, 45], [x, 39], [x + 7, 45]], P.pizarraS); linea(x - 7, 45, x, 39, C.k); linea(x, 39, x + 7, 45, C.k); }
    for (const x of [46, 102, 192, 246]) { rect(x - 3, 36, x + 3, 50, C.k); f_ladrillo(R, x - 2, 37, x + 2, 50, P); rect(x - 4, 35, x + 4, 36, P.piedra); rect(x - 1, 33, x, 34, hex('#8a4a32')); }
    // el frontón del cuerpo central con el óculo y la linterna con la veleta
    poligono([[112, 42], [146, 26], [180, 42]], C.k); poligono([[115, 41], [146, 28], [177, 41]], P.piedra); linea(146, 28, 177, 41, P.piedraS);
    disco(146, 35, 4, C.k); disco(146, 35, 3, tarde ? P.luzV : P.vidrio); pset(145, 34, P.vidrioL);
    rect(141, 18, 151, 25, C.k); rect(142, 19, 150, 25, P.marco); for (const x of [144, 148]) rect(x, 20, x + 1, 24, tarde ? P.luzV : P.vidrio); poligono([[140, 18], [146, 13], [152, 18]], P.pizarraS);
    // las ventanas de las alas y del cuerpo central (dos pisos)
    for (const x of [44, 64, 84, 196, 216, 236]) { f_ventana(R, x, 65, 10, 15, P, tarde && h(x, 1, 932) < 0.6); f_ventana(R, x, 89, 10, 16, P, tarde && h(x, 2, 932) < 0.5); }
    for (const x of [120, 162]) f_ventana(R, x, 50, 10, 14, P, tarde);
    // el pórtico: entablamento, columnas con su sombra, la puerta con el montante y los escalones
    rect(114, 66, 178, 72, C.k); rect(115, 67, 177, 71, P.piedra); rect(115, 71, 177, 71, P.piedraS); for (let x = 116; x < 177; x += 3) pset(x, 68, P.piedraS);
    poligono([[114, 66], [146, 54], [178, 66]], C.k); poligono([[118, 65], [146, 56], [174, 65]], P.piedraL);
    for (let y = 73; y < 108; y++) for (let x = 116; x < 177; x++) if (f_umbral(x, y) < 0.55) pset(x, y, f_mezcla(R.pget(x, y), C.k, 0.35));   // la sombra del pórtico en la fachada
    rect(138, 84, 154, 108, C.k); for (let y = 85; y < 108; y++) for (let x = 139; x < 154; x++) pset(x, y, x === 146 ? P.puertaS : (y - 85) % 7 === 0 || (x - 139) % 7 === 1 ? P.puertaS : P.puertaL);
    for (let i = -7; i <= 7; i++) for (let j = 0; j <= 6; j++) if (Math.hypot(i, j * 1.2) < 7.5) pset(146 + i, 83 - j, Math.hypot(i, j * 1.2) > 6.5 ? C.k : (i + 7) % 3 === 0 ? P.marco : tarde ? P.luzV : P.vidrio);
    pset(144, 97, P.laton); pset(148, 97, P.laton);
    for (const x of [120, 132, 158, 170]) { rect(x - 3, 72, x + 3, 74, P.piedra); rect(x - 2, 75, x + 2, 106, P.piedraL); rect(x + 1, 75, x + 2, 106, P.piedraS); for (let y = 76; y < 106; y += 2) pset(x - 1, y, P.piedra); rect(x - 3, 106, x + 3, 108, P.piedra); }
    for (let k = 0; k < 3; k++) { rect(112 - k * 3, 108 + k * 2, 180 + k * 3, 109 + k * 2, P.piedra); rect(112 - k * 3, 110 + k * 2, 180 + k * 3, 110 + k * 2, P.piedraSS); }
    // la hiedra que trepa por las esquinas
    for (const [x0, y0, n] of [[36, 84, 60], [236, 62, 50], [106, 90, 24]]) for (let k = 0; k < n; k++) { const x = Math.round(x0 + h(k, x0, 933) * 22), y = Math.round(y0 + h(k, x0, 934) * (112 - y0)); disco(x, y, 1.5, h(k, 1, 935) < 0.3 ? P.hiedraS : P.hiedra); if (k % 3 === 0) pset(x, y - 1, P.hiedraL); }
    // el suelo: el camino de grava hasta el pórtico, el césped a franjas, los setos y los parterres
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (y - 112) / 68, xl = 112 - u * 120, xr = 180 + u * 40; let c;
      if (x >= xl && x <= xr) { const q = h(x, y, 936); c = q < 0.15 ? P.gravaS : q > 0.88 ? P.gravaL : P.grava; if (x - xl < 1.5 || xr - x < 1.5) c = P.piedraS; }
      else { const s = Math.floor((x + (y - 112) * (x < 146 ? -1.2 : 1.2)) / 14) & 1; c = s ? P.hierba : P.hierbaS; if (h(x, y, 937) < 0.06) c = P.hierbaL; else if (h(x, y, 938) < 0.05) c = P.hierbaD; }
      B[y * 320 + x] = c; }
    for (const [x0, x1] of [[36, 108], [184, 256]]) { rect(x0, 106, x1, 114, C.k); for (let y = 107; y < 114; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, y < 109 ? P.setoL : h(x >> 1, y >> 1, 939) < 0.3 ? P.setoS : P.seto); for (let x = x0 + 2; x < x1; x += 5) pset(x, 115, P.hierbaD); }
    for (const [x0, y0] of [[8, 128], [76, 124]]) for (let k = 0; k < 40; k++) { const x = x0 + (k * 7) % 34, y = y0 + (k * 3) % 6; pset(x, y, P.flor[k % 4]); pset(x, y + 1, P.hierbaD); }
    // las rodadas del camino, una carretilla junto al parterre y las dos farolas de hierro del camino
    for (let y = 114; y < 180; y++) { const u = (y - 112) / 68; for (const sd of [-1, 1]) { const x = Math.round(146 + sd * (6 + u * 24) + (u * 26)); for (let i = 0; i < 2 + u * 3; i++) if (f_umbral(x + i, y) < 0.6) pset(x + i, y, P.gravaS); } }
    for (let k = 0; k < 60; k++) { const y = 114 + Math.round(h(k, 1, 944) * 64), u = (y - 112) / 68, x = Math.round(112 - u * 120 + h(k, 2, 944) * (68 + u * 160)); pset(x, y, P.piedraSS); pset(x + 1, y, P.gravaL); }
    { const x = 104, y = 132; rect(x, y - 5, x + 9, y - 1, C.k); rect(x + 1, y - 4, x + 8, y - 2, hex('#3a7a5a')); rect(x + 1, y - 4, x + 8, y - 4, hex('#5a9a7a')); disco(x + 2, y, 2, C.k); pset(x + 2, y, P.piedraS); R.linea(x + 9, y - 4, x + 14, y - 7, C.k); R.linea(x + 9, y - 2, x + 14, y - 5, C.k);
      for (let i = 0; i < 6; i++) pset(x + 2 + i, y - 6, P.flor[i % 4]); }
    for (const x of [60, 200]) { rect(x - 1, 112, x + 1, 140, C.k); rect(x, 113, x, 139, hex('#3a3e4a')); rect(x - 3, 138, x + 3, 141, C.k); rect(x - 4, 104, x + 4, 112, C.k); rect(x - 3, 105, x + 3, 111, tarde ? P.luzV : hex('#d8e0e4')); rect(x - 5, 103, x + 5, 104, C.k); pset(x, 101, C.k); pset(x, 102, C.k); linea(x, 105, x, 111, C.k); }
  });
  f_pegar(R, capa);
  // la vida: humo de las chimeneas, la luz del hangar, alumnos que pasean, el jardinero, la fuente y los robles que se mecen
  for (const [x, k] of [[46, 0], [102, 1], [192, 2], [246, 3]]) f_humoCh(R, t, x, 32, P, k);
  if (Math.floor(t * 1.3) % 2) R.pset(292, 81, hex('#ff4a3a'));
  if (Math.sin(t * 0.7) > 0.4) { R.rect(86, 66, 87, 67, hex('#e0aa80')); R.pset(86, 65, hex('#3a2a1a')); }   // alguien se asoma a una ventana
  for (let k = 0; k < 3; k++) { const d = k % 2 ? 1 : -1, u = ((t * 0.06 + k * 0.37) % 1), x = Math.round(d > 0 ? 20 + u * 280 : 300 - u * 280), y = 118 + k * 2; if (x > 108 && x < 186 && y < 120) continue; f_alumno(R, x, y, t, k, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8b030')][k], P); }
  { const u = (Math.sin(t * 0.35) + 1) / 2; f_alumno(R, Math.round(20 + u * 60), 140, t, 3, hex('#5a7a3a'), P); }
  f_fuente(R, t, 238, 150, P);
  f_roble(R, 16, 164, 1.15, t, P); f_roble(R, 296, 128, 0.8, t, P);
  return { suelo: 166, libre: [24, 196], horizonte: hor, puerta: [146, 108], fuente: [238, 150], hangar: [292, 104] };
}

// la escalinata de cerca: muro de ladrillo con pilastras, la puerta doble con montante de abanico, faroles, ventanas, y
// los escalones de piedra que bajan ensanchándose, con su barandilla de balaustres y los jarrones con flores
function f_escalinata(R, t, o, P, tarde) {
  f_cieloDia(R, t, 40, P, tarde);
  const capa = f_capa(R, 'man-cerca|' + tarde, () => {
    const { rect, pset, linea, poligono, disco } = R, B = R.buf;
    f_ladrillo(R, 0, 34, 319, 130, P, 34);
    rect(0, 28, 319, 33, P.piedra); rect(0, 27, 319, 27, C.k); rect(0, 33, 319, 33, P.piedraSS); for (let x = 1; x < 320; x += 4) rect(x, 31, x + 1, 32, P.piedraS);   // la cornisa con dentículos
    for (let x = 0; x < 320; x++) for (let y = 18; y < 27; y++) if (!f_tranquilo(x, y)) pset(x, y, (y - 18) % 3 === 0 ? P.pizarraS : (x + ((y / 3) | 0) * 2) % 6 === 0 ? P.pizarraS : P.pizarra);
    // ventanas a los lados (dos por lado) y la hiedra
    for (const x of [22, 62, 244, 284]) f_ventana(R, x, 52, 16, 26, P, tarde && x !== 62);
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 940) * 40), y = Math.round(40 + h(k, 2, 940) * 90); disco(x, y, 1.5, h(k, 3, 940) < 0.3 ? P.hiedraS : P.hiedra); if (k % 3 === 0) pset(x + 1, y - 1, P.hiedraL); }
    // las pilastras con capitel, el arco de piedra con su clave y la puerta doble con cuarterones y el montante de abanico
    for (const x0 of [112, 196]) { rect(x0, 40, x0 + 11, 120, C.k); rect(x0 + 1, 41, x0 + 10, 120, P.piedra); rect(x0 + 8, 41, x0 + 10, 120, P.piedraS); rect(x0 + 1, 41, x0 + 2, 120, P.piedraL); for (let y = 46; y < 118; y += 3) pset(x0 + 5, y, P.piedraS); rect(x0 - 1, 38, x0 + 12, 42, P.piedraL); rect(x0 - 1, 42, x0 + 12, 42, P.piedraSS); }
    for (let i = -34; i <= 34; i++) for (let j = 0; j <= 34; j++) { const d = Math.hypot(i, j); if (d > 34 || d < 22) continue; const a = Math.atan2(j, i); pset(160 + i, 74 - j, d > 33 ? C.k : ((a / 0.2) % 1) < 0.12 ? P.piedraS : d < 23 ? P.piedraSS : P.piedra); }
    rect(156, 38, 164, 44, P.piedraL); rect(156, 44, 164, 44, P.piedraS);
    for (let i = -22; i <= 22; i++) for (let j = 0; j <= 22; j++) { const d = Math.hypot(i, j); if (d > 22) continue; const a = Math.atan2(j, i); pset(160 + i, 74 - j, d > 21 || ((a / 0.31) % 1) < 0.1 || d < 6 ? P.marco : tarde ? P.luzV : (i + j) % 8 < 2 ? P.vidrioL : P.vidrio); }
    rect(138, 74, 182, 120, C.k); rect(138, 74, 182, 76, P.marco);
    for (let y = 77; y < 120; y++) for (let x = 139; x < 182; x++) { const lx = (x - 139) % 21; let c = x === 160 ? P.puertaS : P.puerta; if ((lx === 3 || lx === 17) && ((y > 80 && y < 96) || (y > 100 && y < 116))) c = P.puertaS; else if ((lx === 4 || lx === 18) && ((y > 80 && y < 96) || (y > 100 && y < 116))) c = P.puertaL; else if (((y === 81 || y === 101) && lx > 3 && lx < 17)) c = P.puertaL; else if ((y === 95 || y === 115) && lx > 3 && lx < 17) c = P.puertaS; pset(x, y, c); }
    disco(156, 99, 1.5, P.laton); disco(164, 99, 1.5, P.laton); disco(160, 86, 2.5, P.laton); pset(160, 89, C.k);
    // los escalones: cada uno con su huella clara, su tabica en sombra y juntas de losa
    for (let k = 7; k >= 0; k--) { const y = 120 + k * 5, w = 34 + k * 15; for (let j = 0; j < 5; j++) for (let x = 160 - w; x <= 160 + w; x++) { let c = j < 2 ? ((x * 3 + k * 5) % 23 === 0 ? P.piedraS : h(x >> 2, k, 941) < 0.15 ? P.piedraL : P.piedra) : j === 4 ? P.piedraSS : P.piedraS; pset(x, y + j, c); } }
    // el suelo de losas al pie
    for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 160) / 6), junta = (y - 160) % 6 === 5 || (x + fila * 11) % 22 === 0; B[y * 320 + x] = junta ? P.piedraSS : h(x >> 3, fila, 942) < 0.2 ? P.piedraL : h(x, y, 943) < 0.05 ? P.piedraS : P.piedra; }
    for (let x = 0; x < 320; x++) { pset(x, 160, P.piedraSS); }
    // la barandilla: el pasamanos en diagonal y los balaustres, a cada lado
    for (const sd of [-1, 1]) { const xa = 160 + sd * 36, ya = 108, xb = 160 + sd * 150, yb = 148;
      for (let k = 0; k <= 26; k++) { const u = k / 26, x = Math.round(xa + (xb - xa) * u), y = Math.round(ya + (yb - ya) * u); for (let j = 2; j < 12; j++) pset(x, y + j, j === 2 || j === 11 ? P.piedraS : Math.abs(j - 6) < 2 ? P.piedraL : P.piedra); if (sd > 0) pset(x + 1, y + 6, P.piedraSS); else pset(x - 1, y + 6, P.piedraSS); }
      linea(xa, ya, xb, yb, C.k); linea(xa, ya + 1, xb, yb + 1, P.piedraL); linea(xa, ya + 2, xb, yb + 2, P.piedra); linea(xa, ya + 3, xb, yb + 3, P.piedraSS);
      // el pilar del arranque con su jarrón
      const px = 160 + sd * 156; rect(px - 7, 136, px + 7, 162, C.k); rect(px - 6, 137, px + 6, 162, P.piedra); rect(px + (sd > 0 ? 3 : -6), 137, px + (sd > 0 ? 6 : -3), 162, P.piedraS); rect(px - 8, 134, px + 8, 137, P.piedraL); rect(px - 8, 137, px + 8, 137, P.piedraSS);
      for (let j = 0; j < 10; j++) { const w = Math.round(2 + Math.sin(j / 10 * Math.PI) * 4); rect(px - w, 133 - j, px + w, 133 - j, j < 2 ? P.piedraS : P.piedra); pset(px + w, 133 - j, P.piedraSS); }
      rect(px - 6, 123, px + 6, 124, P.piedraL); }
    // los faroles de pared junto a la puerta (la llama, en el plano)
    for (const x of [102, 218]) { rect(x - 1, 58, x + 1, 62, C.k); rect(x - 4, 62, x + 4, 76, C.k); rect(x - 3, 63, x + 3, 75, tarde ? P.luzV : hex('#c8d4dc')); rect(x - 5, 61, x + 5, 62, C.k); rect(x - 2, 77, x + 2, 78, C.k); linea(x, 63, x, 75, C.k); }
  });
  f_pegar(R, capa);
  // la vida: las llamas de los faroles, las flores de los jarrones al viento, alguien que se asoma y un pájaro que salta
  for (const x of [102, 218]) { const f = Math.sin(t * 9 + x) > 0; R.rect(x - 1, 69, x + 1, 72, tarde ? hex('#fff0a0') : hex('#f8d070')); R.pset(x + (f ? 1 : -1), 68, tarde ? hex('#ffe070') : hex('#f8b040')); if (tarde) for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 5 && d < 10 && f_umbral(x + i, 70 + j) < (10 - d) / 14) R.pset(x + i, 70 + j, f_mezcla(R.pget(x + i, 70 + j), hex('#ffd080'), 0.35)); } }
  for (const sd of [-1, 1]) { const px = 160 + sd * 156; for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.35, m = Math.sin(t * 2.2 + k) * 0.8, x = Math.round(px + Math.cos(a) * (4 + k % 3) + m), y = Math.round(121 + Math.sin(a) * (5 + k % 3)); R.linea(px, 122, x, y, P.hiedra); R.pset(x, y, P.flor[k % 4]); R.pset(x + 1, y, P.flor[(k + 1) % 4]); } }
  if (Math.sin(t * 0.8) > 0.3) { R.rect(70, 60, 72, 63, hex('#e0aa80')); R.rect(70, 59, 72, 59, hex('#3a2a1a')); }
  { const u = (t * 0.5) % 4, x = Math.round(240 + Math.min(1, u) * 16), y = Math.round(107 + (x - 196) * 0.351 - Math.abs(Math.sin(u * Math.PI * 3)) * 3 * (u < 1 ? 1 : 0)); R.rect(x - 1, y - 2, x + 1, y, hex('#6a4a3a')); R.pset(x + 2, y - 2, hex('#e8a030')); R.pset(x, y - 3, hex('#6a4a3a')); R.pset(x - 2, y - 1, hex('#4a3428')); R.pset(x + 1, y - 2, C.k); }
  return { suelo: 166, libre: [52, 268], fila: [60, 100, 140, 180, 220, 260], puerta: [160, 120], escalones: [120, 160] };
}

// paleta: convierte a color los textos '#…' y las listas de ellos
const g_pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : typeof v === 'string' ? hex(v) : v]));

// las tres luces de fuera: cielo (de arriba abajo), nubes (luz, cuerpo, sombra), los tres términos de la ciudad, el río
const G_LUZ = {
  dia: g_pal({ cielo: ['#4a86c8', '#5a94d2', '#6ea4da', '#86b6e2', '#a2c8ea', '#c2dcf2'], nubes: ['#ffffff', '#e2ecf6', '#b4c8de'], sol: '#fff8d0', solH: '#ffe68a',
    lejos: '#a6bacd', lejosS: '#92a7bd', medio: '#7c93b0', medioS: '#647a98', medioL: '#94aac4', cerca: '#4a5a74', cercaS: '#384660', cercaL: '#62748e',
    ventana: '#9cc0dc', ventanaL: '#d6ecfa', rio: '#4a7cae', rioL: '#86b4da', luz: '#fff2d0', estrella: '#ffffff', noche: false }),
  atardecer: g_pal({ cielo: ['#33306e', '#5a3a7e', '#8e4878', '#cc6252', '#ee8a4a', '#f8b464'], nubes: ['#ffd49c', '#f0a070', '#a45a7a'], sol: '#fff0b0', solH: '#ffb060',
    lejos: '#a06a84', lejosS: '#8c5a76', medio: '#704a6e', medioS: '#5c3c5e', medioL: '#86587a', cerca: '#3c2c48', cercaS: '#2e223a', cercaL: '#584064',
    ventana: '#e89a58', ventanaL: '#ffd890', rio: '#b8664e', rioL: '#f2aa6a', luz: '#ffc890', estrella: '#ffffff', noche: false }),
  noche: g_pal({ cielo: ['#090d22', '#0e1434', '#141c44', '#1a2450', '#222e5c', '#2c3866'], nubes: ['#4e5880', '#3a4470', '#2a3258'], sol: '#f4f0dc', solH: '#8a92b8',
    lejos: '#252d50', lejosS: '#1e2544', medio: '#1a2040', medioS: '#141934', medioL: '#262e52', cerca: '#11152a', cercaS: '#0b0e1e', cercaL: '#20263e',
    ventana: '#e8c460', ventanaL: '#fff0b0', rio: '#141c44', rioL: '#3e4c8c', luz: '#a8b8e8', estrella: '#dfe6ff', noche: true }),
};

// un búfer fijo por clave: se pinta una vez (R.nuevo) y se reutiliza; datos: lo que devuelve el dibujo (luces, antenas)
const g_capas = new Map();

function g_capa(R, clave, dibuja) {
  let c = g_capas.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); const datos = dibuja(); R.usar(prev); c = { b, datos }; g_capas.set(clave, c); }
  return c;
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function g_mezcla(c, d, a) { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; }

// pega un búfer sobre lo que hay, en el rectángulo dado, dejando ver lo de debajo donde el búfer está vacío
function g_pega(R, b, x0, y0, x1, y1) { for (let y = y0; y <= y1; y++) for (let x = x0, i = y * 320 + x0; x <= x1; x++, i++) { const c = b[i]; if (c) R.pset(x, y, c); } }

// tiñe lo que hay en un rectángulo hacia col (a: cuánto); trama: solo uno de cada dos píxeles
function g_tinte(R, x0, y0, x1, y1, col, a, trama = false) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (!trama || ((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, g_mezcla(c, col, a)); } }

// la luz que entra por un hueco: un paralelogramo tramado más claro (inclin: cuánto se tuerce por fila; se apaga hacia abajo)
function g_haz(R, x0, x1, y0, y1, inclin, col, a) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin), f = a * (1 - 0.6 * (y - y0) / Math.max(1, y1 - y0)); for (let x = x0 + d; x <= x1 + d; x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, g_mezcla(c, col, f)); } }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba); n: [luz, cuerpo, sombra]
function g_nube(R, cx, cy, w, n) {
  const r = Math.max(2, w * 0.32), B = [[-w * 0.42, 1, r * 0.78], [0, -1, r], [w * 0.4, 0.5, r * 0.82]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1, rr, n[2]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.95, n[1]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.6, n[0]);
}

// el cielo de fuera en los huecos rects: degradado tramado (ya–yb), estrellas de noche, el sol (con su halo) o la luna, y
// siete nubes de tres tonos a tres velocidades recortadas a cada hueco
function g_cielo(R, t, rects, ya, yb, P, sol, k = 0) {
  const n = P.cielo.length - 1;
  for (const [x0, y0, x1, y1] of rects) for (let y = y0; y <= y1; y++) { const u = Math.max(0, Math.min(1, (y - ya) / (yb - ya))) * n;
    for (let x = x0; x <= x1; x++) R.pset(x, y, P.cielo[Math.min(n, Math.max(0, Math.floor(u + (h(x, y, 600 + k) - 0.5) * 0.9)))]); }
  for (const r of rects) {
    R.recorte(r);
    if (P.noche) for (let s = 0; s < 70; s++) { const x = Math.round(h(s, 1, 610 + k) * 319), y = Math.round(ya + h(s, 2, 610 + k) * (yb - ya) * 0.55); if (Math.sin(t * 1.7 + s * 2.3) > -0.5) R.pset(x, y, s % 6 ? P.estrella : C.blanco); }
    if (sol) { const [sx, sy, sr] = sol;
      for (let j = -sr - 7; j <= sr + 7; j++) for (let i = -sr - 7; i <= sr + 7; i++) { const d = Math.hypot(i, j); if (d > sr + 1 && d < sr + 7 && ((i + j) & 1) === 0 && h(i, j, 615) < 1 - (d - sr) / 8) R.pset(sx + i, sy + j, g_mezcla(R.pget(sx + i, sy + j), P.solH, 0.45)); }
      R.disco(sx, sy, sr + 1, P.solH); R.disco(sx, sy, sr, P.sol);
      if (P.noche) { R.disco(sx + 3, sy - 2, sr - 1, P.cielo[2]); R.pset(sx - 2, sy + 1, P.solH); R.pset(sx - 3, sy - 2, P.solH); }
      else R.disco(sx - 1, sy - 1, Math.max(1, sr - 3), C.blanco); }
    for (let c = 0; c < 7; c++) { const cap = c % 3, v = [1.1, 2.3, 3.8][cap], w = [9, 13, 19][cap], cx = Math.round(((h(c, 3, 620 + k) * 380 + t * v) % 380) - 30), cy = Math.round(ya + 6 + h(c, 4, 620 + k) * (yb - ya) * 0.32 + cap * 5); g_nube(R, cx, cy, w, P.nubes); }
  }
  R.recorte(null);
}

// la ciudad de fuera, en el búfer (todo el ancho; se ve solo por los ventanales): la otra orilla (yr) en dos términos,
// el río, y los rascacielos de cerca (base yb) con rejilla de ventanas, depósitos de agua, antenas y remates. Devuelve
// las ventanas que se encienden (luces), las antenas (puntas que parpadean) y la franja del río
function g_ciudad(R, P, yr, yb, esc) {
  const { rect, pset, poligono } = R, luces = [], antenas = [];
  // el término de lejos
  for (let x = -6; x < 326;) { const w = 5 + Math.floor(h(x, 1, 630) * 8); let a = Math.round((10 + h(x, 2, 630) * 22) * esc); if (x > 262) a = Math.min(a, yr - 50);
    rect(x, yr - a, x + w, yr, P.lejos); rect(x + w, yr - a, x + w, yr, P.lejosS);
    for (let y = yr - a + 2; y < yr; y += 3) for (let i = x + 1; i < x + w; i += 2) if (h(i, y, 631) < 0.45) { pset(i, y, P.noche ? P.ventana : P.lejosS); if (P.noche && h(i, y, 632) < 0.25) luces.push([i, y]); }
    x += w + (h(x, 4, 630) < 0.3 ? 3 : 0); }
  // el término medio: torres con retranqueos y una aguja de los años treinta
  for (let x = -4; x < 324;) { const w = 8 + Math.floor(h(x, 1, 633) * 10); let a = Math.round((14 + h(x, 2, 633) * 26) * esc); if (x > 262) a = Math.min(a, yr - 48);
    const top = yr - a + 6;
    if (h(x, 3, 633) < 0.55) {
      rect(x, top, x + w, yr, P.medio); rect(x, top, x, yr, P.medioL); rect(x + w - 1, top, x + w, yr, P.medioS);
      if (h(x, 5, 633) < 0.5) { rect(x + 2, top - 4, x + w - 2, top, P.medio); rect(x + w - 2, top - 4, x + w - 2, top, P.medioS); }
      for (let y = top + 2; y < yr - 1; y += 3) for (let i = x + 2; i < x + w - 1; i += 2) { const on = h(i, y, 634) < (P.noche ? 0.38 : 0.6); pset(i, y, on ? (P.noche ? P.ventana : P.medioL) : P.medioS); if (on && P.noche && h(i, y, 635) < 0.3) luces.push([i, y]); }
    }
    x += w + 1 + Math.floor(h(x, 6, 633) * 6); }
  // la aguja (en el ventanal de la izquierda)
  { const x = 46, top = yr - Math.round(52 * esc);
    rect(x, top + 14, x + 12, yr, P.medio); rect(x + 2, top + 8, x + 10, top + 14, P.medio); rect(x + 4, top + 3, x + 8, top + 8, P.medio); rect(x + 5, top - 4, x + 7, top + 3, P.medioL); rect(x + 6, top - 12, x + 6, top - 4, P.medioL);
    rect(x + 11, top + 14, x + 12, yr, P.medioS); rect(x, top + 14, x, yr, P.medioL);
    for (let y = top + 16; y < yr - 1; y += 3) for (let i = x + 2; i < x + 11; i += 2) { pset(i, y, P.noche ? P.ventana : P.medioS); if (P.noche && h(i, y, 636) < 0.2) luces.push([i, y]); }
    antenas.push([x + 6, top - 13]); }
  // el río con su brillo y un muelle
  rect(0, yr + 1, 319, yr + Math.round(8 * esc), P.rio);
  for (let y = yr + 2; y < yr + Math.round(8 * esc); y++) for (let x = (y * 7) % 11; x < 320; x += 9 + (y % 3) * 4) if (h(x, y, 637) < 0.7) rect(x, y, x + 2 + Math.round(h(x, y, 638) * 4), y, P.rioL);
  rect(0, yr + 1, 319, yr + 1, P.medioS);
  // los rascacielos de cerca
  for (let x = -6; x < 326;) { const w = 14 + Math.floor(h(x, 1, 640) * 16), a = Math.round((14 + h(x, 2, 640) * 30) * esc), top = yb - a;
    if (h(x, 3, 640) < 0.66) {
      rect(x, top, x + w, yb, P.cerca); rect(x, top, x, yb, P.cercaL); rect(x + w - 2, top, x + w, yb, P.cercaS); rect(x, top, x + w, top, P.cercaL);
      for (let y = top + 3; y < yb - 1; y += 4) for (let i = x + 2; i < x + w - 3; i += 3) { const on = h(i, y, 641) < (P.noche ? 0.45 : 0.3);
        rect(i, y, i + 1, y + 1, on ? P.ventanaL : P.ventana); if (!P.noche) pset(i + 1, y + 1, P.cercaS); if (on && P.noche && h(i, y, 642) < 0.35) luces.push([i, y]); }
      const tipo = h(x, 4, 640);
      if (tipo < 0.4) {   // el depósito de agua de madera, en sus patas, con el tejado de cono
        const dx = x + 3 + Math.floor(h(x, 7, 640) * (w - 10)), madera = P.noche ? hex('#2a2018') : hex('#7a5638'), maderaS = P.noche ? hex('#1c150f') : hex('#5a3e28');
        pset(dx, top - 1, P.cercaS); pset(dx + 5, top - 1, P.cercaS); pset(dx + 1, top - 2, P.cercaS); pset(dx + 4, top - 2, P.cercaS);
        rect(dx, top - 8, dx + 5, top - 3, madera); rect(dx + 4, top - 8, dx + 5, top - 3, maderaS); rect(dx, top - 6, dx + 5, top - 6, maderaS);
        poligono([[dx - 1, top - 8], [dx + 2.5, top - 12], [dx + 6, top - 8]], maderaS);
      } else if (tipo < 0.7) { const ax = x + Math.floor(w / 2); rect(ax, top - 9, ax, top - 1, P.cercaL); rect(ax - 1, top - 2, ax + 1, top - 1, P.cercaS); antenas.push([ax, top - 10]); }
      else { rect(x + 3, top - 4, x + w - 5, top - 1, P.cerca); rect(x + w - 6, top - 4, x + w - 5, top - 1, P.cercaS); rect(x + 5, top - 6, x + 8, top - 5, P.cercaS); }
    }
    x += w + 2 + Math.floor(h(x, 6, 640) * 10); }
  return { luces, antenas, rio: [yr + 2, yr + Math.round(8 * esc) - 1] };
}

// un monigote pequeño de fondo (≈10 px): cabeza, pelo, cuerpo con su sombra y piernas que andan; dir ±1
function g_figurita(R, x, suelo, t, ropa, o = {}) {
  const { rect, pset } = R, piel = o.piel ?? hex('#f0c090'), pelo = o.pelo ?? hex('#3a2a1a'), anda = o.anda ?? true, dir = o.dir ?? 1, f = anda ? Math.floor(t * 6 + x) % 2 : 0;
  x = Math.round(x);
  rect(x - 1, suelo - 10, x + 1, suelo - 8, piel); rect(x - 1, suelo - 10, x + 1, suelo - 10, pelo); pset(dir > 0 ? x - 1 : x + 1, suelo - 9, pelo);
  rect(x - 2, suelo - 7, x + 2, suelo - 3, ropa); rect(dir > 0 ? x - 2 : x + 2, suelo - 7, dir > 0 ? x - 2 : x + 2, suelo - 3, g_mezcla(ropa, C.k, 0.35));
  pset(x + 2 * dir, suelo - 4 - f, piel);
  rect(x - 1, suelo - 2, x - 1, suelo - (f ? 1 : 0), o.pantalon ?? hex('#2a2e3a')); rect(x + 1, suelo - 2, x + 1, suelo - (f ? 0 : 1), o.pantalon ?? hex('#2a2e3a'));
}

// una silla de oficina vista de espaldas o de frente (x: centro, suelo: donde apoyan las ruedas); o.color; o.girada (−1..1)
function g_sillaOficina(R, x, suelo, o = {}) {
  const { rect, pset } = R, c = o.color ?? hex('#2e3440'), cL = g_mezcla(c, C.blanco, 0.25), cS = g_mezcla(c, C.k, 0.4), g = Math.round((o.girada ?? 0) * 3), w = 5 - Math.abs(g) * 0.6 | 0;
  x = Math.round(x);
  rect(x - w + g, suelo - 17, x + w + g, suelo - 8, C.k); rect(x - w + 1 + g, suelo - 16, x + w - 1 + g, suelo - 9, c); rect(x - w + 1 + g, suelo - 16, x + w - 1 + g, suelo - 16, cL); pset(x - w + 1 + g, suelo - 16, C.k); pset(x + w - 1 + g, suelo - 16, C.k);
  rect(x + w - 2 + g, suelo - 15, x + w - 1 + g, suelo - 9, cS); rect(x - 1 + g, suelo - 13, x + 1 + g, suelo - 12, cL);
  rect(x - 6, suelo - 8, x + 6, suelo - 6, C.k); rect(x - 5, suelo - 8, x + 5, suelo - 7, c); rect(x - 7, suelo - 9, x - 6, suelo - 7, cS); rect(x + 6, suelo - 9, x + 7, suelo - 7, cS);
  rect(x, suelo - 5, x, suelo - 2, hex('#8a92a0')); rect(x - 5, suelo - 1, x + 5, suelo - 1, hex('#5a6270'));
  for (const dx of [-5, 0, 5]) pset(x + dx, suelo, C.k);
}

// la misma silla, volcada en el suelo (x, suelo: donde descansa)
function g_sillaCaida(R, x, suelo) {
  const { rect, pset } = R, c = hex('#2e3440'), cL = hex('#58606e');
  rect(x - 9, suelo - 8, x + 1, suelo - 1, C.k); rect(x - 8, suelo - 7, x, suelo - 2, c); rect(x - 8, suelo - 7, x, suelo - 7, cL);
  rect(x + 1, suelo - 6, x + 3, suelo, C.k); rect(x + 4, suelo - 4, x + 8, suelo - 4, hex('#8a92a0')); rect(x + 9, suelo - 9, x + 9, suelo, hex('#5a6270'));
  pset(x + 10, suelo - 9, C.k); pset(x + 10, suelo - 4, C.k); pset(x + 10, suelo, C.k);
  for (let i = -12; i <= 12; i++) { const c0 = R.pget(x + i, suelo + 1); if (c0) R.pset(x + i, suelo + 1, g_mezcla(c0, C.k, 0.35)); }
}

// geometría de la sala por cámara: ventanales, pantalla grande, monitores de la pared, monitores de consola, sillas
const G_TORRE = {
  general: { ven: [[0, 18, 101, 100], [218, 18, 319, 100]], yb: 100, yr: 76, esc: 1, muro: [102, 217], pant: [115, 25, 204, 75], mon: [[115, 80, 157, 94], [162, 80, 204, 94]],
    consola: [[3, 86, 98], [221, 86, 316]], monCon: [[10, 73], [32, 73], [54, 73], [76, 73], [228, 73], [250, 73], [272, 73], [294, 73]], sillas: [24, 66, 244, 290], sSuelo: 116, suelo: 101,
    sol: { dia: [44, 33, 6], atardecer: [70, 68, 9], noche: [252, 32, 5] } },
  mesa: { ven: [[0, 18, 83, 104], [236, 18, 319, 104]], yb: 104, yr: 80, esc: 1.15, muro: [84, 235], pant: [97, 24, 222, 92], mon: [],
    consola: [[2, 92, 80], [239, 92, 317]], monCon: [[8, 79], [30, 79], [52, 79], [246, 79], [268, 79], [290, 79]], sillas: [20, 62, 258, 300], sSuelo: 124, suelo: 105,
    sol: { dia: [34, 34, 6], atardecer: [52, 72, 9], noche: [262, 34, 5] } },
};

function g_torre(R, t, cam, luz, o) {
  const G = G_TORRE[cam === 'mesa' ? 'mesa' : 'general'], M = cam === 'mesa', P = G_LUZ[luz], polvo = !!o.polvo, modo = o.pantalla, alerta = modo === 'nave' && !polvo;
  const { pset, rect, linea } = R;
  // 1. fuera: cielo, sol o luna, nubes; la ciudad (búfer); el río con barcos, el helicóptero, el avión, pájaros, luces
  g_cielo(R, t, G.ven, 18, G.yb - 10, P, G.sol[luz], M ? 1 : 0);
  const ciudad = g_capa(R, `ciudad|${luz}|${cam}`, () => g_ciudad(R, P, G.yr, G.yb, G.esc));
  for (const [x0, y0, x1, y1] of G.ven) g_pega(R, ciudad.b, x0, y0, x1, y1);
  const { luces, antenas, rio } = ciudad.datos;
  if (P.noche) for (let i = 0; i < luces.length; i += 3) { const [x, y] = luces[i]; if (Math.sin(t * 0.6 + i * 1.37) > 0.82) pset(x, y, P.lejosS); }
  antenas.forEach(([x, y], i) => { if (Math.sin(t * 3 + i * 1.9) > 0.2) { pset(x, y, hex('#ff4a3a')); if (P.noche) { pset(x - 1, y, hex('#a02a2a')); pset(x + 1, y, hex('#a02a2a')); } } });
  // barcos: solo sobre el agua (lo que tapa la orilla de cerca los tapa)
  const esAgua = (x, y) => { const c = R.pget(x, y); return c === P.rio || c === P.rioL; };
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, x0 = Math.round(((k * 113 + t * (3 + k * 2) * d) % 340 + 340) % 340 - 10), y = rio[0] + 1 + k * 2;
    for (let i = -3; i <= 3; i++) if (esAgua(x0 + i, y)) pset(x0 + i, y, i === 3 * d ? C.blanco : k === 1 ? hex('#c84a3a') : hex('#e8e4dc'));
    if (esAgua(x0, y - 1)) pset(x0, y - 1, C.blanco);
    for (let i = 4; i < 12; i++) if (esAgua(x0 - i * d, y + 1) && (i + Math.floor(t * 4)) % 3) pset(x0 - i * d, y + 1, P.rioL); }
  if (!P.noche) {   // el helicóptero que cruza el ventanal de la izquierda, con su rotor
    const u = (t % 26) / 26, hx = Math.round(-20 + u * 140), hy = Math.round(46 + Math.sin(t * 0.8) * 3);
    rect(hx - 3, hy - 1, hx + 2, hy + 2, hex('#2a3242')); rect(hx + 3, hy, hx + 9, hy, hex('#2a3242')); pset(hx + 9, hy - 1, hex('#2a3242')); rect(hx - 2, hy, hx, hy, P.ventana);
    const r = Math.floor(t * 20) % 2; rect(hx - 6 + r, hy - 3, hx + 5 - r, hy - 3, hex('#5a6272')); rect(hx - 3, hy + 3, hx + 3, hy + 3, hex('#2a3242'));
    if (Math.sin(t * 6) > 0.4) pset(hx - 3, hy + 2, hex('#ff4a3a'));
    for (let k = 0; k < 4; k++) { const x = Math.round(((t * 7 + k * 9) % 140) + 200), y = 30 + (k % 2) * 4 + Math.round(Math.sin(t * 2 + k)), a = Math.sin(t * 11 + k * 2) > 0 ? 1 : 0; pset(x, y, P.cercaS); pset(x - 1, y - a, P.cercaS); pset(x + 1, y - a, P.cercaS); }
  }
  { const u = ((t + 9) % 34) / 34, ax = Math.round(330 - u * 360), ay = 24;   // el avión alto, con su luz
    for (let i = 3; i < 26; i++) if ((i + Math.floor(t * 2)) % 7) pset(ax + i, ay, P.noche ? P.medioL : g_mezcla(P.cielo[1], C.blanco, i < 12 ? 0.8 : 0.45));
    rect(ax - 2, ay, ax + 2, ay, P.noche ? P.medioL : hex('#dfe6ee')); pset(ax, ay - 1, P.noche ? P.medioL : hex('#dfe6ee')); if (Math.sin(t * 7) > 0.3) pset(ax - 2, ay, hex('#ff4a3a')); }
  // una técnica que pasa por detrás de las consolas de la derecha (la tapan la consola y los monitores de la sala)
  if (!polvo && o.gente !== false && !M) { const u = (t % 18) / 18; g_figurita(R, Math.round(224 + (u < 0.5 ? u * 2 : 2 - u * 2) * 86), G.consola[1][1] + 2, t, hex('#e8e8ea'), { dir: u < 0.5 ? 1 : -1, pelo: hex('#c88a3a') }); }
  // 2. la sala (búfer: todo menos el cristal)
  const sala = g_capa(R, `sala|${cam}|${polvo}|${luz}`, () => g_torreSala(R, G, M, polvo, P, luz));
  g_pega(R, sala.b, 0, 0, 319, 179);
  // los reflejos del cristal: dos rayas en diagonal por paño
  for (const [x0, y0, x1, y1] of G.ven) for (let k = 0; k < 3; k++) { const bx = x0 + 8 + k * 34; for (let i = 0; i < 26; i++) { const x = bx + i, y = y0 + 4 + i * 2; if (x < x1 - 1 && y < y1 - 2 && y !== 56) { pset(x, y, g_mezcla(R.pget(x, y), C.blanco, 0.22)); if (i < 16) pset(x + 4, y, g_mezcla(R.pget(x + 4, y), C.blanco, 0.14)); } } }
  // 3. la pantalla grande y los monitores
  g_pantallaTorre(R, t, G.pant, modo, polvo);
  G.mon.forEach((r, i) => g_monitorito(R, t, r, i, polvo, alerta));
  G.monCon.forEach(([x, y], i) => g_monitorito(R, t, [x + 1, y + 1, x + 16, y + 10], i + 2, polvo || (i === 3), alerta, polvo && i === 5));
  // pilotos del frente de las consolas y del armario de servidores
  for (const [x0, y, x1] of G.consola) for (let x = x0 + 6; x < x1 - 4; x += 7) { const on = polvo ? false : Math.sin(t * (2 + (x % 5)) + x) > 0; pset(x, y + 8, on ? (alerta ? hex('#ff4a3a') : (x % 3 ? hex('#5ae08a') : hex('#ffc04a'))) : hex('#1a1e26')); }
  { const rx = M ? 224 : 208, ry = M ? 70 : 64; for (let j = 0; j < 8; j++) for (let i = 0; i < 2; i++) { const on = !polvo && Math.sin(t * (5 + j) + i * 3 + j) > 0.1; pset(rx + 2 + i * 4, ry + 4 + j * 4, on ? (j % 3 ? hex('#5ae08a') : hex('#4ac8f0')) : hex('#1c2028')); } }
  // las balizas rojas de alerta en el borde del techo (con la nave)
  if (alerta) { const f = (Math.sin(t * 6) + 1) / 2; for (let x = 0; x < 320; x++) { const c = R.pget(x, 17); pset(x, 17, g_mezcla(c, hex('#ff3a3a'), 0.3 + f * 0.5)); if (((x + Math.floor(t * 30)) % 40) < 6) pset(x, 16, hex('#ff8a7a')); }
    for (const [bx, by] of [[G.muro[0] + 4, 21], [G.muro[1] - 4, 21]]) { R.disco(bx, by, 2, Math.sin(t * 8 + bx) > 0 ? hex('#ff4a3a') : hex('#8a1a1a')); } }
  // 4. vida: el técnico que teclea; con polvo, la araña, la pelusa y las motas
  if (!polvo && o.gente !== false && !M) {
    const x = G.sillas[1], y = G.sSuelo - 17, brazo = Math.floor(t * 7) % 2;
    rect(x - 3, y - 3, x + 3, y, hex('#4a6a9a')); rect(x - 3, y - 3, x + 3, y - 3, hex('#6a8ab8')); rect(x - 2, y - 8, x + 2, y - 4, hex('#3a2a1e')); rect(x - 1, y - 9, x + 1, y - 9, hex('#3a2a1e')); pset(x + 2, y - 5, hex('#e0b088'));
    pset(x - 4, y - 2 - brazo, hex('#4a6a9a')); pset(x + 4, y - 1 - (1 - brazo), hex('#4a6a9a'));
  }
  if (polvo) {
    const sx = G.muro[0] + 7, sy = Math.round(30 + Math.sin(t * 0.7) * 7);   // la araña que sube y baja por su hilo
    linea(sx, 19, sx, sy - 2, hex('#b8c0c8')); rect(sx - 1, sy - 1, sx + 1, sy + 1, hex('#1a1a20')); pset(sx, sy - 2, hex('#1a1a20'));
    for (const [dx, dy] of [[-2, -1], [2, -1], [-2, 1], [2, 1], [-3, 0], [3, 0]]) pset(sx + dx, sy + dy + (Math.floor(t * 4) % 2 && dy ? 0 : 0), hex('#2a2a30'));
    const bx = Math.round(((t * 9) % 380) - 30), by = 168 + Math.round(Math.abs(Math.sin(t * 2.2)) * -2);   // la pelusa que rueda
    for (let k = 0; k < 18; k++) { const a = k * 0.35 + t * 3, r = 2 + (k % 3); pset(bx + Math.round(Math.cos(a) * r), by + Math.round(Math.sin(a) * r * 0.8), k % 2 ? hex('#a8a8ae') : hex('#cfcfd4')); }
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 650) * 300 + 10 + Math.sin(t * 0.5 + k) * 5), y = Math.round(G.suelo - 4 - ((h(k, 2, 650) * 70 + t * (1.2 + h(k, 3, 650))) % 70)); if (Math.sin(t * 1.4 + k * 1.7) > 0.1) pset(x, y, g_mezcla(R.pget(x, y), hex('#f4ecd8'), 0.55)); }
  } else if (luz !== 'noche') for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 651) * 300 + 10 + Math.sin(t * 0.4 + k) * 4), y = Math.round(G.suelo + 2 + ((h(k, 2, 651) * 40 + t * 2) % 40)); if (Math.sin(t * 1.6 + k * 1.3) > 0.4) pset(x, y, g_mezcla(R.pget(x, y), P.luz, 0.5)); }
  const mesa = M ? { cx: 160, borde: 142, detras: 150, sitios: [40, 88, 136, 184, 232, 280] } : { cx: 160, cy: 132, rx: 64, ry: 9, borde: 123, detras: 134, sitios: [128, 160, 192] };
  return { suelo: M ? 150 : 158, mesa, pantalla: G.pant, ventanales: G.ven, sol: G.sol[luz], libre: M ? [[20, 300, 150]] : [[10, 92, 150, 172], [228, 310, 150, 172]], horizonte: G.yr };
}

// la sala de la torre en su búfer (todo menos el cristal de los ventanales)
function g_torreSala(R, G, M, polvo, P, luz) {
  const { rect, pset, linea, poligono, disco } = R, [m0, m1] = G.muro, y0 = G.suelo;
  // el techo de grafito: paneles con sus juntas, focos empotrados y el canto del falso techo
  rect(0, 0, 319, 17, hex('#2a2f3b'));
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) { if (x % 40 === 0) pset(x, y, hex('#22262f')); else if (h(x >> 1, y, 660) < 0.08) pset(x, y, hex('#2f3542')); }
  for (let x = 0; x < 320; x += 1) { pset(x, 5, (x % 40) < 20 ? hex('#262a35') : hex('#2d3240')); }
  for (const fx of [190, 214, 238, 262]) { rect(fx - 2, 9, fx + 2, 10, hex('#4a5264')); rect(fx - 1, 9, fx + 1, 9, hex('#c8d2e2')); }
  rect(0, 14, 319, 15, hex('#3a4150')); rect(0, 16, 319, 16, hex('#5c6678')); rect(0, 17, 319, 17, hex('#1c2028'));
  // los ventanales: marco, parteluces, travesaño, alféizar (el cristal se queda vacío)
  for (const [x0, ya, x1, yb] of G.ven) {
    rect(x0, yb + 1, x1, yb + 3, hex('#5a6474')); rect(x0, yb + 1, x1, yb + 1, hex('#8a96a8')); rect(x0, yb + 4, x1, yb + 4, hex('#20242c'));
    for (let x = x0 + 34; x < x1 - 4; x += 34) { rect(x, ya, x + 1, yb, hex('#2a303a')); pset(x, ya, hex('#5a6474')); for (let y = ya; y <= yb; y += 1) if (y % 2) pset(x, y, hex('#3c4452')); }
    rect(x0, 58, x1, 59, hex('#2a303a')); rect(x0, 58, x1, 58, hex('#4c5666'));
  }
  // la pared de pantallas: chapa cepillada con juntas
  rect(m0, 18, m1, y0 - 1, hex('#2a303c'));
  for (let x = m0; x <= m1; x++) for (let y = 18; y < y0; y++) if (h(x, y >> 2, 661) < 0.18) pset(x, y, hex('#323a48')); else if (h(x, y >> 3, 662) < 0.08) pset(x, y, hex('#242934'));
  rect(m0, 18, m0 + 1, y0 - 1, hex('#1a1e26')); rect(m1 - 1, 18, m1, y0 - 1, hex('#1a1e26')); rect(m0 + 2, 18, m0 + 2, y0 - 1, hex('#4a5466')); rect(m1 - 2, 18, m1 - 2, y0 - 1, hex('#3a4352'));
  { const [x0, ya, x1, yb] = G.pant; rect(x0 - 4, ya - 3, x1 + 4, yb + 3, hex('#101318')); rect(x0 - 3, ya - 2, x1 + 3, yb + 2, hex('#1e232c')); rect(x0 - 3, ya - 2, x1 + 3, ya - 2, hex('#4a5466')); rect(x0 - 1, ya - 1, x1 + 1, yb + 1, hex('#0a0c10'));
    rect(((x0 + x1) >> 1) - 2, yb + 2, ((x0 + x1) >> 1) + 2, yb + 2, hex('#3a4352')); }
  for (const [x0, ya, x1, yb] of G.mon) { rect(x0 - 2, ya - 2, x1 + 2, yb + 2, hex('#101318')); rect(x0 - 1, ya - 1, x1 + 1, yb + 1, hex('#0a0c10')); rect(x0 - 2, ya - 2, x1 + 2, ya - 2, hex('#3a4352')); }
  rect(m0 + 4, y0 - 4, m1 - 4, y0 - 3, hex('#1a1e26')); for (let x = m0 + 6; x < m1 - 4; x += 4) pset(x, y0 - 4, hex('#3a4352'));
  // el suelo pulido: degradado tramado, motas, losas en perspectiva
  const PISO = [hex('#4e5768'), hex('#465061'), hex('#3e4757'), hex('#373f4d'), hex('#303743')];
  for (let y = y0; y < 180; y++) { const u = (y - y0) / (179 - y0) * 4; for (let x = 0; x < 320; x++) { let c = PISO[Math.min(4, Math.max(0, Math.floor(u + (h(x, y, 663) - 0.5) * 0.8)))]; if (h(x, y, 664) < 0.03) c = hex('#5a6476'); pset(x, y, c); } }
  for (let d = 3, y = y0 + 3; y < 180; d += 2, y += d) { rect(0, y, 319, y, hex('#272d37')); rect(0, y + 1, 319, y + 1, hex('#566072')); }
  for (let k = -8; k <= 8; k++) { const xb = 160 + k * 46, xa = Math.round(160 + (xb - 160) * (y0 - 30) / (179 - 30)); linea(xa, y0, xb, 179, hex('#272d37')); }
  // el reflejo del cielo y de la pantalla en el suelo
  for (const [x0, , x1] of G.ven) for (let y = y0; y < y0 + 30; y++) { const f = 0.28 * (1 - (y - y0) / 30); for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 && (x - x0) % 34 > 1) pset(x, y, g_mezcla(R.pget(x, y), P.cielo[3], f)); }
  { const [x0, , x1] = G.pant; for (let y = y0; y < y0 + 22; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0) pset(x, y, g_mezcla(R.pget(x, y), hex('#3a7ab8'), 0.16 * (1 - (y - y0) / 22))); }
  // el sol en el suelo (de día y al atardecer)
  if (luz !== 'noche') { const [x0, , x1] = G.ven[0]; g_haz(R, x0 + 8, x1 - 30, y0 + 2, 179, 0.7, P.luz, luz === 'atardecer' ? 0.22 : 0.16); }
  // las consolas con sus monitores
  for (const [x0, yc, x1] of G.consola) {
    rect(x0, yc, x1, yc + 3, hex('#5a6474')); rect(x0, yc, x1, yc, hex('#8a96a8')); rect(x0, yc + 4, x1, yc + 18, hex('#262c36')); rect(x0, yc + 4, x1, yc + 4, hex('#1a1e26'));
    for (let x = x0 + 3; x < x1 - 2; x += 22) { rect(x, yc + 10, x + 14, yc + 10, hex('#1c2028')); rect(x, yc + 12, x + 14, yc + 12, hex('#1c2028')); rect(x, yc + 14, x + 14, yc + 14, hex('#1c2028')); }
    rect(x0, yc + 18, x1, yc + 18, hex('#1a1e26'));
    for (let x = x0 + 5; x < x1 - 4; x += 15) { rect(x, yc - 1, x + 5, yc - 1, hex('#2a2e36')); if (h(x, yc, 665) < 0.5) rect(x + 7, yc - 2, x + 9, yc - 1, hex('#c8c0b0')); }   // teclados y tazas
  }
  for (const [x, y] of G.monCon) { rect(x, y, x + 17, y + 11, hex('#14171d')); rect(x, y, x + 17, y, hex('#4a5466')); rect(x + 8, y + 12, x + 9, y + 13, hex('#3a4250')); rect(x + 5, y + 13, x + 12, y + 13, hex('#2a303a')); }
  // las sillas de las consolas (con polvo, apartadas)
  G.sillas.forEach((x, i) => { if (polvo && i === 2) return; g_sillaOficina(R, x + (polvo ? [7, -9, 0, 11][i] : 0), G.sSuelo + (polvo ? [4, 9, 0, 6][i] : 0), { girada: polvo ? [0.8, -0.6, 0, 0.5][i] : 0 }); });
  if (polvo) g_sillaCaida(R, M ? 268 : 252, M ? 136 : 132);
  // la planta (seca con polvo) y el armario de servidores
  { const px = M ? 90 : 107, py = y0 + 2;
    rect(px - 5, py - 9, px + 5, py, hex('#1e2228')); rect(px - 5, py - 9, px + 5, py - 9, hex('#4a5262')); rect(px + 3, py - 8, px + 5, py, hex('#14171c'));
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.28, L = 14 + (k % 3) * 6; for (let i = 0; i < L; i++) { const cae = polvo ? i * i * 0.04 : i * i * 0.012, x = Math.round(px + Math.cos(a) * i * (polvo ? 0.8 : 0.5)), y = Math.round(py - 10 + Math.sin(a) * i + cae); pset(x, y, polvo ? (i % 4 ? hex('#8a6a3a') : hex('#6a4e28')) : (i % 4 ? hex('#3a8a4a') : hex('#5ab062'))); if (!polvo && i > 4 && i % 3 === 0) pset(x + 1, y, hex('#2a6a3a')); } }
    if (polvo) for (let k = 0; k < 4; k++) pset(px - 8 + k * 5, py + 1, hex('#8a6a3a')); }
  { const rx = M ? 224 : 208, ry = M ? 70 : 64; rect(rx - 1, ry - 1, rx + 9, y0 + 3, hex('#0e1014')); rect(rx, ry, rx + 8, y0 + 2, hex('#1e232c')); rect(rx, ry, rx + 8, ry, hex('#4a5466'));
    for (let y = ry + 2; y < y0; y += 4) rect(rx + 1, y + 2, rx + 7, y + 2, hex('#14171c')); }
  // el suelo de la mesa: un círculo de losa más oscura con su anillo de luces empotradas (apagado con polvo)
  if (!M) { for (let y = 122; y <= 166; y++) for (let x = 40; x <= 280; x++) { const d = Math.hypot((x - 160) / 116, (y - 146) / 20); if (d <= 1 && ((x + y) & 1) === 0) pset(x, y, g_mezcla(R.pget(x, y), hex('#1a1e28'), d > 0.93 ? 0.05 : 0.22)); }
    for (let a = 0; a < 6.28; a += 0.07) { const x = Math.round(160 + Math.cos(a) * 112), y = Math.round(146 + Math.sin(a) * 19); rect(x, y, x + 1, y, polvo ? hex('#3a404c') : hex('#5ad0f0')); if (!polvo) pset(x, y + 1, hex('#2a6a8a')); } }
  // las sillas de detrás de la mesa redonda (vista general); con polvo, apartadas
  if (!M) [[160, 128, 0], [124, 132, 0.4], [196, 132, -0.4], [92, 138, 0.8], [228, 138, -0.8]].forEach(([x, s, g], i) => {
    if (polvo) { x += [0, -12, 16, -14, 18][i]; s += [-4, 2, -2, 4, 3][i]; g = [0.6, -0.3, 0.9, 0.2, -0.9][i]; }
    g_sillaOficina(R, x, s, { girada: g, color: hex('#323846') }); });
  // con polvo: polvo en el suelo, huellas que llevan a la mesa y telaraña en la esquina de la pared de pantallas
  if (polvo) {
    for (let i = 0; i < 2600; i++) { const x = Math.floor(h(i, 1, 666) * 320), y = y0 + Math.floor(h(i, 2, 666) * (180 - y0)); pset(x, y, g_mezcla(R.pget(x, y), hex('#8a8a86'), 0.35)); }
    for (let k = 0; k < 9; k++) { const x = 20 + k * 13, y = 174 - k * 3 + (k % 2) * 3; rect(x, y, x + 1, y, hex('#2a2f3a')); rect(x, y - 1, x, y - 1, hex('#2a2f3a')); }
    const [w0] = G.muro; for (let k = 0; k < 6; k++) linea(w0 + 3, 18, w0 + 3 + Math.round(Math.cos(k * 0.3) * 12), 18 + Math.round(Math.sin(k * 0.3) * 12), hex('#8a929e'));
    for (const r of [4, 7, 10]) for (let k = 0; k < 6; k++) pset(w0 + 3 + Math.round(Math.cos(k * 0.3) * r), 18 + Math.round(Math.sin(k * 0.3) * r), hex('#9aa2ae'));
  }
  return null;
}

// la pantalla grande de la torre (r: hueco de la imagen); modo 'tierra' | 'nave' | 'apagada' | otro (espera)
function g_pantallaTorre(R, t, r, modo, polvo) {
  const { pset, linea, disco, poligono } = R, [x0, y0, x1, y1] = r, w = x1 - x0, hh = y1 - y0, cy = (y0 + y1) >> 1, rojo = modo === 'nave';
  R.recorte(r);
  if (modo === 'apagada') { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x - x0) + (y - y0) * 2) % 90 < 14 ? hex('#1e242e') : hex('#0c0f14')); R.recorte(null); return; }
  const fondo = rojo ? [hex('#1c0c12'), hex('#240e16')] : [hex('#0a1626'), hex('#0d1b2e')], rej = rojo ? hex('#3a1420') : hex('#15304a'), barre = Math.round(y0 + ((t * 18) % (hh + 10)) - 5);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, Math.abs(y - barre) < 1 ? (rojo ? hex('#4a1a24') : hex('#1c3c5a')) : ((x - x0) % 8 === 0 || (y - y0) % 8 === 0) ? rej : fondo[y & 1]);
  if (modo === 'tierra') {
    const rr = Math.round(hh * 0.33), gx = x0 + Math.round(w * 0.27), gy = cy - 1;
    for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; pset(gx + Math.round(Math.cos(a) * (rr + 9)), gy + Math.round(Math.sin(a) * 4) + (Math.sin(a) < 0 ? 0 : 0), k % 2 ? hex('#2a6a8a') : hex('#4ac0e0')); }
    for (let j = -rr - 1; j <= rr + 1; j++) for (let i = -rr - 1; i <= rr + 1; i++) { const d2 = i * i + j * j; if (d2 > (rr + 1) * (rr + 1)) continue; if (d2 > rr * rr) { if (((i + j) & 1) === 0) pset(gx + i, gy + j, hex('#5ad0f0')); continue; }
      const z = Math.sqrt(rr * rr - d2), lon = Math.atan2(i, z) + t * 0.35, lat = Math.asin(j / rr);
      const tierra = Math.sin(lon * 2 + 0.6) * Math.cos(lat * 2.2) + 0.55 * Math.sin(lon * 5 + lat * 3.1) + 0.3 * Math.cos(lat * 6 + lon * 3) > 0.4, nube = Math.sin(lon * 7 - t * 0.25 + lat * 9) > 0.9;
      const luz = (-i * 0.5 - j * 0.5 + z) / rr; let c = nube ? hex('#eef8ff') : tierra ? (luz > 0.75 ? hex('#7ad07a') : hex('#3c9c52')) : (luz > 0.75 ? hex('#4a92de') : hex('#2664b4'));
      if (Math.abs(lat) > 1.2) c = hex('#e8f4ff'); if (luz < 0.2) c = g_mezcla(c, hex('#0a1626'), 0.5); pset(gx + i, gy + j, c); }
    for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; if (Math.sin(a) > 0) pset(gx + Math.round(Math.cos(a) * (rr + 9)), gy + Math.round(Math.sin(a) * 4), k % 2 ? hex('#2a6a8a') : hex('#4ac0e0')); }
    const sa = t * 1.1; if (Math.sin(t * 6) > -0.3) disco(gx + Math.round(Math.cos(sa) * (rr + 9)), gy + Math.round(Math.sin(sa) * 4), 1, hex('#fff0a0'));
    const nx = x0 + Math.round(w * 0.71), CIAN = [hex('#f0feff'), hex('#b4f0ff'), hex('#62d4f4'), hex('#2a9ad4'), hex('#1a6aa8')];
    R.numero('616', nx, gy + 8, { tam: 16, centro: true, rampa: CIAN });
    linea(nx - 26, gy + 12, nx + 26, gy + 12, hex('#2a6a8a')); for (let i = 0; i < 6; i++) { const bh = 2 + Math.round((Math.sin(t * 2 + i) + 1) * 2); linea(nx - 22 + i * 9, y1 - 3, nx - 22 + i * 9, y1 - 3 - bh, hex('#4ac0e0')); }
    if (Math.sin(t * 4) > 0) { linea(nx - 28, gy - 12, nx - 24, gy - 12, hex('#5ad0f0')); linea(nx - 28, gy - 12, nx - 28, gy - 8, hex('#5ad0f0')); linea(nx + 24, gy - 12, nx + 28, gy - 12, hex('#5ad0f0')); linea(nx + 28, gy - 12, nx + 28, gy - 8, hex('#5ad0f0')); }
  } else if (modo === 'nave') {
    const s = hh / 40, px = x0 + Math.round(w * 0.14), sx = Math.round(x0 + w * 0.5 + Math.sin(t * 0.6) * w * 0.05), sy = Math.round(cy + Math.sin(t * 1.3) * 1.5);
    for (let k = 0; k < 24; k++) { const y = y0 + 2 + Math.round(h(k, 1, 670) * (hh - 4)), x = Math.round(x1 - ((h(k, 2, 670) * w + t * 40) % w)); linea(x, y, x + 3 + (k % 3) * 2, y, k % 3 ? hex('#6a3a4a') : hex('#c8a0b0')); }
    for (let k = 0; k < 4; k++) { const rr = Math.round((5 + k * 3) * s * 0.8); for (let a = 0; a < 6.28; a += 0.25) { const b = a + t * (1.5 - k * 0.2); if (((a * 4) | 0) % 2) pset(px + Math.round(Math.cos(b) * rr * 0.55), cy + Math.round(Math.sin(b) * rr), k % 2 ? hex('#8a4ae0') : hex('#4a8af0')); } }
    disco(px, cy, Math.round(3 * s), hex('#e8d8ff'));
    const ex = x1 - Math.round(9 * s), er = Math.round(6 * s); disco(ex, cy - 2, er, hex('#2664b4')); disco(ex - 1, cy - 3, er - 2, hex('#3c9c52')); disco(ex - 2, cy - 4, Math.max(1, er - 4), hex('#4a92de'));
    for (let x = sx + Math.round(34 * s); x < ex - er - 2; x += 4) pset(x, cy - 1, Math.floor(t * 6 + x / 4) % 2 ? hex('#ff6a5a') : hex('#6a2a2a'));
    const P2 = (a, b) => [sx + a * s, sy + b * s], casco = [P2(-30, -7), P2(14, -9), P2(30, -2), P2(32, 1), P2(14, 9), P2(-30, 8), P2(-34, 0)];
    poligono([P2(-24, -7), P2(-14, -16), P2(-6, -7)], hex('#3a4254')); poligono([P2(-24, 8), P2(-14, 16), P2(-6, 8)], hex('#2a3040'));
    poligono(casco.map(([x, y]) => [x + (x > sx ? 1 : -1), y + (y > sy ? 1 : -1)]), hex('#05060a'));
    poligono(casco, (x, y) => { const v = (y - (sy - 9 * s)) / (18 * s); return v < 0.25 ? hex('#d4dcea') : v < 0.6 ? hex('#98a4ba') : hex('#5a6478'); });
    for (let i = -24; i < 12; i += 5) pset(sx + Math.round(i * s), sy - Math.round(4 * s), Math.sin(t * 3 + i) > 0 ? hex('#fff0a0') : hex('#6a7488'));
    disco(sx + Math.round(22 * s), sy - Math.round(2 * s), Math.round(2 * s), hex('#4ac8f0'));
    for (let k = 0; k < 3; k++) disco(sx - Math.round(34 * s) - k * 2 - Math.floor(t * 10 + k) % 2, sy + k - 1, Math.max(1, Math.round(2.5 * s) - k), k ? hex('#8ac8ff') : hex('#ffffff'));
    const nx = sx - Math.round(6 * s); disco(nx, sy, Math.round(9 * s), hex('#1a2a6a')); disco(nx, sy, Math.round(9 * s) - 1, hex('#f4f8ff'));
    R.numero('4', nx + 1, sy + 8, { tam: 16, centro: true, color: hex('#1a3ab0') });
    if (Math.sin(t * 5) > -0.2) { const bx = Math.round(38 * s), by = Math.round(15 * s), L = 5;
      for (const [cx, cy2, dx, dy] of [[sx - bx, sy - by, 1, 1], [sx + bx, sy - by, -1, 1], [sx - bx, sy + by, 1, -1], [sx + bx, sy + by, -1, -1]]) { linea(cx, cy2, cx + L * dx, cy2, hex('#ff4a3a')); linea(cx, cy2, cx, cy2 + L * dy, hex('#ff4a3a')); } }
    for (const [ax, ay] of [[x0 + 3, y0 + 3], [x1 - 13, y0 + 3]]) { const on = Math.sin(t * 6 + ax) > -0.3; poligono([[ax + 5, ay], [ax + 10, ay + 9], [ax, ay + 9]], on ? hex('#ffd040') : hex('#7a5a20')); R.icono('!', ax + 4, ay + 2, hex('#1a1010'), on ? hex('#ffd040') : hex('#7a5a20'), 1); }
    const f = (Math.sin(t * 6) + 1) / 2; for (let x = x0; x <= x1; x++) for (const y of [y0, y0 + 1, y1 - 1, y1]) pset(x, y, g_mezcla(hex('#5a1018'), hex('#ff4a3a'), f)); for (let y = y0; y <= y1; y++) for (const x of [x0, x0 + 1, x1 - 1, x1]) pset(x, y, g_mezcla(hex('#5a1018'), hex('#ff4a3a'), f));
  } else {   // en espera: un globo de alambre que gira y barras que suben y bajan
    const gx = (x0 + x1) >> 1, rr = Math.round(hh * 0.34);
    for (let k = 0; k < 6; k++) { const ph = t * 0.5 + k * Math.PI / 6, rx = Math.abs(Math.cos(ph)) * rr; for (let a = 0; a < 6.28; a += 0.12) pset(gx + Math.round(Math.cos(a) * rx), cy + Math.round(Math.sin(a) * rr), hex('#2a7aa8')); }
    for (let k = -2; k <= 2; k++) { const yy = cy + Math.round(k * rr / 3), rx = Math.round(Math.sqrt(rr * rr - (k * rr / 3) ** 2)); linea(gx - rx, yy, gx + rx, yy, hex('#1e5a80')); }
    for (let a = 0; a < 6.28; a += 0.05) pset(gx + Math.round(Math.cos(a) * rr), cy + Math.round(Math.sin(a) * rr), hex('#4ac0e0'));
    for (let i = 0; i < 5; i++) { const bh = 3 + Math.round((Math.sin(t * 1.7 + i * 1.3) + 1) * 4); linea(x0 + 5 + i * 4, y1 - 3, x0 + 5 + i * 4, y1 - 3 - bh, hex('#4ac0e0')); linea(x1 - 5 - i * 4, y1 - 3, x1 - 5 - i * 4, y1 - 3 - (13 - bh), hex('#2a8ab8')); }
    if (Math.sin(t * 4) > 0) pset(x0 + 4, y0 + 4, hex('#5ae08a'));
  }
  // con polvo: la imagen parpadea y tiene polvo encima
  if (polvo) { const fl = h(Math.floor(t * 9), 1, 671); if (fl < 0.18) { const gy = y0 + Math.floor(h(Math.floor(t * 9), 2, 671) * hh); for (let x = x0; x <= x1; x++) pset(x, gy, hex('#8adcf4')); }
    for (let i = 0; i < 160; i++) { const x = x0 + Math.floor(h(i, 1, 672) * w), y = y0 + Math.floor(h(i, 2, 672) * hh); pset(x, y, g_mezcla(R.pget(x, y), hex('#9a9a96'), 0.5)); } }
  R.recorte(null);
  for (let k = 0; k < 12; k++) { const x = x0 + 3 + k, y = y0 + 1 + k * 2; if (y < y1) pset(x, y, g_mezcla(R.pget(x, y), C.blanco, 0.2)); }
}

// un monitor pequeño (hueco r): gráfica que corre, radar que barre, barras o un mapa de puntos según i; apagado = negro
// con polvo (parpadea si chisporrotea)
function g_monitorito(R, t, r, i, apagado, alerta, chispa = false) {
  const { pset, linea } = R, [x0, y0, x1, y1] = r, w = x1 - x0, hh = y1 - y0;
  if (apagado && !(chispa && h(Math.floor(t * 7), i, 673) < 0.3)) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x + y * 2) % 23) < 3 ? hex('#1e232c') : hex('#0b0d11')); return; }
  const c1 = alerta ? hex('#ff5a4a') : [hex('#5ae08a'), hex('#4ac8f0'), hex('#ffc04a')][i % 3], c2 = alerta ? hex('#6a1a1a') : hex('#163448'), bg = alerta ? hex('#1c0a0e') : hex('#08121e');
  R.recorte(r);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y & 1) ? bg : g_mezcla(bg, c2, 0.3));
  const tipo = i % 4;
  if (tipo === 0) { let py = 0; for (let x = x0; x <= x1; x++) { const y = Math.round(y0 + hh / 2 + Math.sin((x - x0) * 0.4 + t * 3) * hh * 0.25 + Math.sin((x - x0) * 1.3 + t * 5) * hh * 0.12); if (x > x0) linea(x - 1, py, x, y, c1); py = y; } }
  else if (tipo === 1) { const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, rr = Math.min(w, hh) / 2 - 1, a = t * 2.5; for (let q = 0; q < 6.28; q += 0.2) pset(cx + Math.round(Math.cos(q) * rr), cy + Math.round(Math.sin(q) * rr), c2 === hex('#163448') ? hex('#1e5a40') : c2);
    for (let k = 0; k < 4; k++) linea(cx, cy, cx + Math.round(Math.cos(a - k * 0.15) * rr), cy + Math.round(Math.sin(a - k * 0.15) * rr), k ? g_mezcla(bg, c1, 0.5 - k * 0.1) : c1);
    for (let k = 0; k < 3; k++) { const q = h(k, i, 674) * 6.28, d = h(k, 2, 674) * rr; if (Math.cos(a - q) > 0.6) pset(cx + Math.round(Math.cos(q) * d), cy + Math.round(Math.sin(q) * d), C.blanco); } }
  else if (tipo === 2) for (let k = 0; k * 3 < w - 1; k++) { const bh = Math.round((Math.sin(t * 2 + k * 0.9 + i) + 1.2) / 2.2 * (hh - 2)); linea(x0 + 1 + k * 3, y1 - 1, x0 + 1 + k * 3, y1 - 1 - bh, c1); }
  else { for (let k = 0; k < 4; k++) linea(x0 + 2, y0 + 2 + k * 3, x0 + 2 + Math.round(h(k, i, 675) * (w - 6)), y0 + 2 + k * 3, c2 === hex('#163448') ? hex('#2a6a8a') : c2); const k = Math.floor(t * 2) % 4; linea(x0 + 2, y0 + 2 + k * 3, x0 + 2 + Math.round(h(k, i, 675) * (w - 6)), y0 + 2 + k * 3, c1); }
  R.recorte(null);
  pset(x0, y0, g_mezcla(R.pget(x0, y0), C.blanco, 0.3)); pset(x0 + 1, y0, g_mezcla(R.pget(x0 + 1, y0), C.blanco, 0.2));
}

// la mesa redonda de la torre y las sillas de delante (por delante de los actores)
function g_torreDelante(R, t, cam, o) {
  const { rect, pset, linea, disco } = R, polvo = !!o.polvo, M = cam === 'mesa';
  const sup = polvo ? [hex('#5a5e66'), hex('#4c5058'), hex('#6c7078')] : [hex('#1c222e'), hex('#262e3c'), hex('#3a465a')];
  const cx = 160, cy = M ? 176 : 132, rx = M ? 172 : 64, ry = M ? 34 : 9;
  if (!M) {   // el pie de la mesa y su base
    rect(cx - 9, cy + ry, cx + 9, cy + ry + 16, hex('#14181f')); rect(cx - 8, cy + ry, cx - 6, cy + ry + 16, hex('#3a4252')); rect(cx - 22, cy + ry + 16, cx + 22, cy + ry + 19, hex('#1a1e26')); rect(cx - 22, cy + ry + 16, cx + 22, cy + ry + 16, hex('#4a5466'));
    // el canto de la mesa
    for (let x = cx - rx; x <= cx + rx; x++) { const e = Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2)), y = Math.round(cy + ry * e); rect(x, y, x, y + 3, hex('#0e1116')); pset(x, y + 1, polvo ? hex('#7a7e86') : hex('#4a5a74')); }
  }
  // el tablero: degradado tramado, reflejo de los ventanales, anillo de luz, borde iluminado
  const y0 = cy - ry;
  for (let y = Math.max(0, y0); y <= Math.min(179, cy + ry); y++) { const e = Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2)), w = Math.round(rx * e), v = (y - y0) / (2 * ry);
    for (let x = cx - w; x <= cx + w; x++) { const lv = v + (h(x, y, 677) - 0.5) * 0.12; let c = sup[lv < 0.3 ? 2 : lv < 0.65 ? 1 : 0];
      if (!polvo && (Math.abs(x - cx + 70 * (M ? 1.6 : 0.6) - (y - y0) * 1.2) < (M ? 9 : 4) || Math.abs(x - cx - 60 * (M ? 1.6 : 0.6) - (y - y0) * 1.2) < (M ? 6 : 3)) && ((x + y) & 1) === 0) c = g_mezcla(c, hex('#8ab0d8'), 0.3);
      if (polvo && h(x, y, 676) < 0.25) c = hex('#7a7e86');
      pset(x, y, c); }
    pset(cx - w, y, polvo ? hex('#8a8e96') : hex('#6a7a94')); pset(cx + w, y, polvo ? hex('#8a8e96') : hex('#6a7a94')); }
  for (let x = cx - rx; x <= cx + rx; x++) { const e = Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2)), y = Math.round(cy - ry * e); if (y >= 0) { pset(x, y, polvo ? hex('#9a9ea6') : hex('#8a9ab4')); pset(x, y + 1, polvo ? hex('#6a6e76') : hex('#4a5a74')); } }
  // el anillo de luz con un tramo brillante que da la vuelta
  const arx = M ? 74 : 38, ary = M ? 10 : 5, acy = M ? cy - 14 : cy;
  for (let a = 0; a < 6.28; a += 0.02) { const x = Math.round(cx + Math.cos(a) * arx), y = Math.round(acy + Math.sin(a) * ary); if (y < y0 + 2 || y > 179) continue; const d = ((a - t * 1.6) % 6.28 + 6.28) % 6.28;
    pset(x, y, polvo ? hex('#3a3e46') : d < 0.6 ? hex('#c8f4ff') : d < 1.4 ? hex('#5ad0f0') : hex('#1e5a7a')); }
  if (!polvo) { disco(cx, acy, M ? 4 : 2, hex('#1e5a7a')); disco(cx, acy, M ? 2 : 1, Math.sin(t * 3) > 0 ? hex('#c8f4ff') : hex('#5ad0f0')); for (let k = 0; k < 4; k++) { const y = acy - 3 - ((t * 8 + k * 4) % 14); if (y > y0 - 10) pset(cx + (k % 2 ? 1 : -1), Math.round(y), g_mezcla(R.pget(cx, Math.round(y)), hex('#8ae8ff'), 0.6)); } }
  // la mesa grande: juntas del tablero, pantallas empotradas, carpetas y un portátil cerrado
  if (M) { for (let a = 3.3; a < 6.12; a += 0.012) { const x = Math.round(cx + Math.cos(a) * 128), y = Math.round(cy + Math.sin(a) * 26); if (y > y0 + 1) pset(x, y, polvo ? hex('#4a4e56') : hex('#10141c')); }
    for (const [px, py, pw] of [[60, 166, 22], [238, 166, 22]]) { rect(px, py, px + pw, py + 7, hex('#0a0c10')); if (!polvo) { rect(px + 1, py + 1, px + pw - 1, py + 6, hex('#0e2a3a')); for (let k = 0; k < 5; k++) { const bh = 1 + Math.round((Math.sin(t * 2 + k + px) + 1) * 2); rect(px + 3 + k * 4, py + 6 - bh, px + 4 + k * 4, py + 6, hex('#4ac8f0')); } } }
    rect(110, 170, 126, 176, hex('#c8c0a8')); rect(111, 169, 127, 175, polvo ? hex('#d8d4c8') : hex('#e8e4dc')); linea(113, 171, 124, 171, hex('#a8a498')); linea(113, 173, 121, 173, hex('#a8a498'));
    rect(196, 168, 218, 174, hex('#3a3e48')); rect(196, 168, 218, 168, hex('#7a8494')); pset(207, 171, polvo ? hex('#5a5e66') : hex('#c8d2e2')); }
  // en cada sitio: una tableta encendida y una taza (con polvo: papeles sueltos y una taza volcada)
  const sitios = M ? [[46, 150], [96, 147], [224, 147], [274, 150], [130, 166], [190, 166]] : [[116, 128], [204, 128], [134, 136], [186, 136]];
  sitios.forEach(([x, y], i) => {
    if (polvo) { rect(x - 4, y - 1, x + 3, y + 1, hex('#c8c4b8')); pset(x - 2, y, hex('#9a968a')); pset(x + 1, y, hex('#9a968a')); if (i === 1) { rect(x + 6, y, x + 9, y + 1, hex('#e8e4dc')); pset(x + 10, y + 1, hex('#6a4a2a')); } return; }
    const s = M ? 2 : 1; rect(x - 3 * s, y - s, x + 3 * s, y + s, hex('#0a0c10')); rect(x - 3 * s + 1, y - s + 1, x + 3 * s - 1, y + s - 1, Math.sin(t * 1.3 + i) > 0.6 ? hex('#4ac8f0') : hex('#2a7ab0'));
    if (M) { linea(x - 3, y - 1, x + 2, y - 1, hex('#c8f4ff')); pset(x + 4, y, hex('#ffc04a')); }
    if (i % 2 === 0) { const cx2 = x + (M ? 12 : 6); rect(cx2, y - 3 * s, cx2 + 2 * s, y, hex('#e8e4dc')); rect(cx2 + 2 * s, y - 2 * s, cx2 + 2 * s + 1, y - s, hex('#e8e4dc')); pset(cx2, y - 3 * s, hex('#ffffff'));
      if (M) for (let k = 0; k < 3; k++) { const vy = y - 7 - ((t * 5 + k * 3) % 8); pset(cx2 + 1 + Math.round(Math.sin(t * 2 + k)), Math.round(vy), g_mezcla(R.pget(cx2 + 1, Math.round(vy)), C.blanco, 0.45)); } }
  });
  // las sillas de delante, de espaldas (vista general); en la mesa, dos respaldos en las esquinas
  if (!M) [[96, 152, 0.6], [128, 158, 0.2], [192, 158, -0.2], [224, 152, -0.6]].forEach(([x, s, g], i) => {
    if (polvo) { if (i === 2) { g_sillaCaida(R, 214, 168); return; } x += [-14, -6, 0, 16][i]; s += [8, 4, 0, 10][i]; g = [-0.4, 0.9, 0, 0.3][i]; }
    g_sillaOficina(R, x, s, { girada: g, color: hex('#262c38') }); });
  else for (const [x, d] of [[10, 1], [310, -1]]) { rect(x - 14, 150, x + 14, 179, C.k); rect(x - 13, 151, x + 13, 179, hex('#2a303c')); rect(x - 13, 151, x + 13, 152, hex('#4a5466')); rect(x + 9 * d, 153, x + 13 * d, 179, hex('#1e232c'));
    for (let y = 156; y < 179; y += 5) for (let i = -10; i <= 6; i += 4) { pset(x + i * d, y, hex('#1a1e26')); pset(x + i * d + d, y - 1, hex('#3e4656')); } rect(x - 12 * d, 152, x - 12 * d, 179, hex('#3a4252')); }
}

const G_DESP = {
  general: { ven: [[114, 32, 136, 108], [148, 32, 172, 108], [184, 32, 206, 108]], yH: 80, pared: 128, riel: 96, cortinas: [[104, 112, -1], [208, 216, 1]], banderas: [94, 226], bY: 40, sol: [196, 44, 6], cielo: [32, 80] },
  cerca: { ven: [[98, 26, 130, 116], [142, 26, 178, 116], [190, 26, 222, 116]], yH: 82, pared: 130, riel: 98, cortinas: [[88, 97, -1], [223, 232, 1]], banderas: [80, 240], bY: 34, sol: [206, 40, 6], cielo: [26, 82] },
};

function g_despacho(R, t, cam, luz, o) {
  const Cc = cam === 'cerca', G = G_DESP[Cc ? 'cerca' : 'general'], P = G_LUZ[luz], { pset, rect } = R;
  // 1. el jardín de fuera: cielo, nubes, sol; arboleda, pórtico, césped, setos y rosales (búfer); la vida
  g_cielo(R, t, G.ven, G.cielo[0], G.cielo[1], P, luz === 'atardecer' ? [G.sol[0] - 30, G.sol[1] + 30, 8] : G.sol, 3);
  const jardin = g_capa(R, `jardin|${cam}|${luz}`, () => g_jardin(R, G, P, luz));
  for (const [x0, y0, x1, y1] of G.ven) g_pega(R, jardin.b, x0, y0, x1, y1);
  const yH = G.yH;
  for (const [tx, ty, tr] of [[G.ven[0][0] - 2, yH - 34, 13], [G.ven[2][1] + 4, yH - 28, 12]]) {   // dos árboles cercanos que se mecen
    const sw = Math.sin(t * 0.9 + tx) * 1.5; R.recorte([G.ven[0][0], 0, G.ven[2][2], 179]);
    for (let j = -tr; j <= tr; j++) for (let i = -tr - 2; i <= tr + 2; i++) { const d = Math.hypot(i * 0.85, j); if (d > tr - h(i, j, 680) * 2) continue; const x = Math.round(tx + i + sw * (1 - (j + tr) / (2 * tr))), y = ty + j, l = (-i - j) / tr + h(i >> 1, j >> 1, 681) * 0.8;
      pset(x, y, luz === 'atardecer' ? (l > 0.6 ? hex('#8a8a3a') : l > 0 ? hex('#5a6a2e') : hex('#36421e')) : (l > 0.6 ? hex('#6ab04a') : l > 0 ? hex('#3e8a3a') : hex('#24602e'))); }
    rect(tx - 1, ty + tr - 2, tx + 1, yH + 8, hex('#5a3e28')); R.recorte(null); }
  { const fx = 160, fy = yH + 7; for (let k = 0; k < 10; k++) { const u = ((t * 1.4 + k * 0.1) % 1), x = Math.round(fx + (k % 2 ? 1 : -1) * u * 4), y = Math.round(fy - 7 * Math.sin(u * Math.PI) - 1); pset(x, y, u < 0.5 ? C.blanco : hex('#bfe0f4')); } }   // la fuente
  { const u = (t % 20) / 20, gx = Math.round(G.ven[0][0] + (u < 0.5 ? u * 2 : 2 - u * 2) * (G.ven[2][2] - G.ven[0][0])), gy = yH + 13;   // el jardinero con su carretilla
    const d = u < 0.5 ? 1 : -1; g_figurita(R, gx, gy, t, hex('#3a6a3a'), { dir: d, pelo: hex('#c8a060') }); rect(gx + 3 * d, gy - 4, gx + 6 * d, gy - 2, hex('#a83a2a')); pset(gx + 5 * d, gy - 1, C.k); pset(gx + 3 * d, gy - 4, hex('#3a8a3a')); }
  { const u = (t % 9) / 9, sx = Math.round(G.ven[1][0] + 4 + u * 18), sy = G.ven[1][3] - 9 - Math.round(Math.abs(Math.sin(t * 5)) * 3);   // la ardilla que salta por el césped
    rect(sx, sy, sx + 2, sy + 1, hex('#8a5a30')); pset(sx + 3, sy - 1, hex('#8a5a30')); pset(sx - 1, sy - 1, hex('#a87040')); pset(sx - 2, sy - 2, hex('#a87040')); pset(sx - 1, sy - 3, hex('#a87040')); pset(sx + 3, sy - 1, C.k); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 8 + k * 7) % 140) + 100), y = 42 + (k % 2) * 4 + Math.round(Math.sin(t * 2 + k)), a = Math.sin(t * 12 + k * 2) > 0 ? 1 : 0; pset(x, y, hex('#2a2a34')); pset(x - 1, y - a, hex('#2a2a34')); pset(x + 1, y - a, hex('#2a2a34')); }
  // 2. la sala (búfer)
  const sala = g_capa(R, `despacho|${cam}|${luz}`, () => g_despachoSala(R, G, Cc, P, luz));
  g_pega(R, sala.b, 0, 0, 319, 179);
  for (const [x0, y0, x1, y1] of G.ven) for (let i = 0; i < 18; i++) { const x = x0 + 3 + i, y = y0 + 6 + i * 3; if (x < x1 && y < y1) pset(x, y, g_mezcla(R.pget(x, y), C.blanco, 0.3)); }
  // 3. cortinas que mece el aire, la bambalina y las banderas
  const top = G.ven[0][1] - 8, bajo = G.pared;
  for (const [xa, xb, lado] of G.cortinas) g_cortinaDorada(R, t, xa, xb, top, bajo, lado);
  g_bambalina(R, G.cortinas[0][0] - 2, G.cortinas[1][1] + 2, top - 2, Cc ? 9 : 8);
  const [b1, b2] = G.banderas, fl = Cc ? 54 : 50;
  g_banderaColgada(R, t, b1 + 1, G.bY + 3, 12, fl, (i, j) => j < 22 && i < 7 ? hex('#26346a') : Math.floor(j / 4) % 2 ? hex('#f2ece0') : hex('#b02a3a'));
  g_banderaColgada(R, t + 1.7, b2 - 12, G.bY + 3, 12, fl, (i, j) => (i === 0 || i === 11) ? hex('#d8b048') : hex('#24306a'));
  for (const bx of G.banderas) { rect(bx, G.bY, bx, bajo + 12, hex('#b88a30')); rect(bx + 1, G.bY, bx + 1, bajo + 12, hex('#e8c060')); R.disco(bx, G.bY - 2, 2, hex('#e8c060')); pset(bx, G.bY - 6, hex('#e8c060')); pset(bx, G.bY - 5, hex('#b88a30')); rect(bx - 3, bajo + 12, bx + 4, bajo + 14, hex('#8a6420')); }
  // 4. vida: péndulo del reloj, motas en la luz, la lámpara
  if (!Cc) { const a = Math.sin(t * 2.6) * 0.35, px = 303, py = 86; for (let i = 0; i < 18; i++) pset(px + Math.round(Math.sin(a) * i), py + i, hex('#c89a40')); R.disco(px + Math.round(Math.sin(a) * 19), py + 19, 2, hex('#e8c060')); pset(px + Math.round(Math.sin(a) * 19) - 1, py + 18, C.blanco);
    const s = Math.floor(t) % 60; R.linea(303, 70, 303 + Math.round(Math.sin(s / 60 * 6.28) * 3), 70 - Math.round(Math.cos(s / 60 * 6.28) * 3), hex('#2a2018')); }
  for (let k = 0; k < 20; k++) { const w = G.ven[k % 3], y = Math.round(bajo + 30 - ((h(k, 2, 682) * 60 + t * (1.4 + h(k, 3, 682) * 2)) % 60)), x = Math.round(w[0] - (y - w[3]) * 0.6 + h(k, 1, 682) * 24 + Math.sin(t * 0.4 + k) * 3); if (y > w[3] + 4 && Math.sin(t * 1.6 + k * 1.7) > 0) pset(x, y, g_mezcla(R.pget(x, y), hex('#fff4d0'), 0.6)); }
  const suelo = Cc ? 150 : 158;
  return { suelo, ventanas: G.ven, banderas: G.banderas, horizonte: yH,
    escritorio: Cc ? { x0: 64, x1: 256, borde: 139, detras: 146 } : { x0: 126, x1: 194, borde: 114, suelo: 140, sillon: 160 },
    puerta: Cc ? null : [246, 54, 282, 128], libre: Cc ? [[8, 60, 168], [262, 312, 168]] : [[80, 244, 150, 162]] };
}

// el jardín de fuera del despacho, en su búfer (todo el ancho): arboleda, pórtico blanco, césped a rayas, sendero, setos,
// la fuente y los rosales
function g_jardin(R, G, P, luz) {
  const { rect, pset, poligono } = R, yH = G.yH, yb = G.ven[0][3], at = luz === 'atardecer';
  const V = at ? [hex('#4a5a2a'), hex('#5e6e32'), hex('#3a4622')] : [hex('#3e7a3a'), hex('#4e9046'), hex('#2e6030')];
  for (let x = 90; x < 240; x += 1) { const a = 8 + Math.round(h(x >> 3, 1, 683) * 6 + Math.sin(x * 0.4) * 2); for (let y = yH - a; y < yH; y++) pset(x, y, h(x, y, 684) < 0.3 ? V[2] : (y - yH + a) < 3 ? V[1] : V[0]); }
  // el pórtico blanco al fondo
  { const px = 160, pb = yH - 1, cB = at ? hex('#f0d8c0') : hex('#f2f0ea'), cS = at ? hex('#b89a8a') : hex('#c4c8cc');
    rect(px - 14, pb - 9, px + 14, pb, cB); poligono([[px - 16, pb - 9], [px, pb - 15], [px + 16, pb - 9]], cB); rect(px - 16, pb - 9, px + 16, pb - 9, cS);
    for (let i = -12; i <= 12; i += 4) rect(px + i, pb - 8, px + i, pb - 1, cS); rect(px - 14, pb, px + 14, pb, cS); }
  for (let y = yH; y <= yb; y++) for (let x = 90; x < 240; x++) { const banda = Math.floor((y - yH + (x - 160) * 0.05) / 3) % 2; let c = banda ? (at ? hex('#6a7a34') : hex('#5aa04a')) : (at ? hex('#5e6e2e') : hex('#4c9040')); if (h(x, y, 685) < 0.06) c = at ? hex('#7a8a3e') : hex('#6ab05a'); pset(x, y, c); }
  // el sendero de grava hasta la fuente
  for (let y = yH + 2; y <= yb; y++) { const w = 2 + Math.round((y - yH) * 0.5), c0 = 160 + Math.round(Math.sin((y - yH) * 0.08) * 3); for (let x = c0 - w; x <= c0 + w; x++) pset(x, y, h(x, y, 686) < 0.3 ? hex('#c8b890') : hex('#ddd0ae')); }
  // la fuente: taza de piedra con agua
  rect(150, yH + 6, 170, yH + 9, hex('#d8d4c8')); rect(152, yH + 6, 168, yH + 6, hex('#8ac0e0')); rect(150, yH + 9, 170, yH + 9, hex('#a8a498')); rect(158, yH + 3, 162, yH + 6, hex('#c8c4b8'));
  // el seto y los rosales
  for (let x = 90; x < 240; x++) { if (Math.abs(x - 160) < 6 + 3) continue; for (let y = yH + 11; y < yH + 15; y++) pset(x, y, h(x, y, 687) < 0.4 ? V[2] : V[0]); pset(x, yH + 11, V[1]); }
  for (let x = 90; x < 240; x++) for (let y = yb - 6; y <= yb; y++) { let c = h(x, y, 688) < 0.5 ? V[2] : V[0]; if (h(x, y, 689) < 0.16) c = h(x, y, 690) < 0.5 ? hex('#d82a3a') : hex('#f07a8a'); pset(x, y, c); }
  return null;
}

// una cortina dorada con sus pliegues, de y0 a y1, recogida con un alzapaños y su borla; abajo la mece el aire.
// lado −1: va a la izquierda del hueco, 1: a la derecha
function g_cortinaDorada(R, t, xa, xb, y0, y1, lado) {
  const pl = [hex('#f0c860'), hex('#d8a840'), hex('#b88828'), hex('#987018')], ata = Math.round(y0 + (y1 - y0) * 0.55), w0 = xb - xa + 1;
  for (let y = y0; y <= y1; y++) {
    const g = Math.max(0, 1 - Math.abs(y - ata) / 14), w = Math.round(w0 - g * 3), sw = y > ata ? Math.round(Math.sin(t * 0.9 + xa * 0.13 + y * 0.05) * (y - ata) / 30) : 0;
    const x0 = lado < 0 ? xa + sw : xb - w + 1 + sw, x1 = x0 + w - 1;
    for (let x = x0; x <= x1; x++) R.pset(x, y, pl[(x - x0 + (lado < 0 ? 0 : 2)) % 4]);
    R.pset(lado < 0 ? x1 : x0, y, hex('#6a4a10'));
  }
  const ai = lado < 0 ? xa : xb - w0 + 4; R.rect(ai, ata, ai + w0 - 4, ata + 1, hex('#7a2a2a')); R.rect(ai, ata, ai + w0 - 4, ata, hex('#a83a3a'));
  const bx = lado < 0 ? ai + w0 - 3 : ai - 1; R.rect(bx, ata + 1, bx, ata + 5, hex('#a83a3a')); R.pset(bx, ata + 6, hex('#e8c060'));
}

// la bambalina de arriba: tres festones dorados con sus pliegues y flecos
function g_bambalina(R, x0, x1, y, alto) {
  const { rect, pset } = R; rect(x0, y - 2, x1, y, hex('#987018')); rect(x0, y - 2, x1, y - 2, hex('#e8c060'));
  const n = 3, w = (x1 - x0) / n;
  for (let k = 0; k < n; k++) for (let x = Math.round(x0 + k * w); x < Math.round(x0 + (k + 1) * w); x++) { const u = (x - x0 - k * w) / w, fondo = Math.round(y + 2 + Math.sin(u * Math.PI) * alto);
    for (let yy = y + 1; yy <= fondo; yy++) pset(x, yy, (yy - y + Math.round(Math.sin(u * Math.PI) * 3)) % 4 < 2 ? hex('#d8a840') : hex('#b88828'));
    pset(x, fondo, hex('#6a4a10')); if (x % 2 === 0) pset(x, fondo + 1, hex('#e8c060')); }
}

// una bandera colgada de su mástil, con pliegues que respiran (x, y: esquina de arriba; w × alto) y flecos dorados abajo
function g_banderaColgada(R, t, x, y, w, alto, pinta) {
  for (let i = 0; i < w; i++) { const pl = Math.sin(i * 1.1 + t * 0.7), largo = alto - Math.round((1 - Math.cos(i * 0.5)) * 1.5);
    for (let j = 0; j < largo; j++) { const dx = Math.round(Math.sin(t * 0.8 + j * 0.06) * (j / alto) * 1.2); let c = pinta(i, j); if (pl < -0.5) c = g_mezcla(c, C.k, 0.28); else if (pl > 0.6) c = g_mezcla(c, C.blanco, 0.15); R.pset(x + i + dx, y + j, c); }
    if (i % 2 === 0) R.pset(x + i + Math.round(Math.sin(t * 0.8 + largo * 0.06) * 1.2), y + largo, hex('#e8c060')); }
}

// el despacho en su búfer (todo menos el cristal)
function g_despachoSala(R, G, Cc, P, luz) {
  const { rect, pset, linea, poligono, disco } = R, pared = G.pared, riel = G.riel;
  // el techo y la cornisa con dentículos
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 691) < 0.5 ? hex('#f4ecd8') : hex('#efe6d0'));
  rect(0, 12, 319, 13, hex('#fbf6ea')); rect(0, 14, 319, 14, hex('#d8ccb0')); for (let x = 0; x < 320; x += 4) rect(x, 15, x + 1, 17, hex('#e6dcc4')); rect(0, 18, 319, 18, hex('#c8b896')); rect(0, 19, 319, 19, hex('#f4ecd8'));
  // la pared: papel de rayas muy suave (la esquina de arriba a la derecha, lisa y tranquila), sombra de la curva
  for (let y = 20; y < riel; y++) for (let x = 0; x < 320; x++) { let c = (x % 8 < 2 && !(x > 266 && y < 50)) ? hex('#ebdfc0') : hex('#f0e5c8'); if (((x * 3 + y * 5) % 16 === 0) && h(x, y, 692) < 0.6 && !(x > 266 && y < 50)) c = hex('#e6d9b8');
    const borde = Math.min(x, 319 - x); if (borde < 24 && ((x + y) & 1) === 0) c = g_mezcla(c, hex('#a89870'), (24 - borde) / 24 * 0.35); if (y < 24 && ((x + y) & 1)) c = g_mezcla(c, hex('#a89870'), 0.15); pset(x, y, c); }
  // el riel y el zócalo de cuarterones
  rect(0, riel, 319, riel, hex('#fff8e6')); rect(0, riel + 1, 319, riel + 1, hex('#e0d2b0')); rect(0, riel + 2, 319, riel + 2, hex('#c8b892'));
  rect(0, riel + 3, 319, pared - 4, hex('#ece0c4'));
  for (let x = 4; x < 316; x += 30) { rect(x, riel + 6, x + 24, pared - 8, hex('#c8b892')); rect(x + 1, riel + 7, x + 24, pared - 8, hex('#f4ead2')); rect(x + 1, riel + 7, x + 23, riel + 7, hex('#fffaf0')); rect(x + 24, riel + 7, x + 24, pared - 8, hex('#d4c6a4')); rect(x + 1, pared - 8, x + 24, pared - 8, hex('#d4c6a4')); }
  rect(0, pared - 4, 319, pared, hex('#f6eed8')); rect(0, pared - 4, 319, pared - 4, hex('#fffaf0')); rect(0, pared, 319, pared, hex('#a89870'));
  // el suelo: tablas de roble en perspectiva y la alfombra ovalada con su sol de rayos
  const yS = pared + 1;
  for (let y = yS; y < 180; y++) for (let x = 0; x < 320; x++) { const k = Math.round((x - 160) * 40 / (y - 40 + 40)), tabla = Math.floor((x - 160) / Math.max(4, (y - 60) * 0.18)); let c = (tabla & 1) ? hex('#8a5a34') : hex('#9a6a40'); if (h(tabla, Math.floor(y / 3), 693) < 0.2) c = hex('#7a4c2a'); if (h(x, y, 694) < 0.1) c = hex('#a8784a'); pset(x, y, c); }
  const [acx, acy, arx, ary] = Cc ? [160, 170, 168, 28] : [160, 160, 152, 24];
  for (let y = Math.max(yS + 1, acy - ary); y <= Math.min(179, acy + ary); y++) for (let x = acx - arx; x <= acx + arx; x++) { const dx = (x - acx) / arx, dy = (y - acy) / ary, d = Math.sqrt(dx * dx + dy * dy); if (d > 1 || x < 0 || x > 319) continue;
    let c; if (d > 0.97) c = hex('#c8a860'); else if (d > 0.95 || (d > 0.84 && d < 0.86)) c = hex('#d8b048'); else if (d > 0.86) { const a = Math.atan2(dy, dx); c = (Math.floor(a * 16) % 2 === 0 && Math.abs(d - 0.905) < 0.02) ? hex('#d8b048') : hex('#2c3e78'); }
    else if (d < 0.3) { const a = Math.atan2(dy, dx); c = d < 0.08 ? hex('#d8b048') : (Math.floor((a + 3.1416) / (Math.PI / 12)) % 2 ? hex('#e8c860') : hex('#f2e4ba')); } else if (d < 0.33) c = hex('#2c3e78'); else c = h(x, y, 695) < 0.2 ? hex('#e0cfa0') : hex('#e8d8ac');
    if (dy < -0.5 && ((x + y) & 1)) c = g_mezcla(c, hex('#5a4a30'), 0.1); pset(x, y, c); }
  // la luz del sol de los ventanales sobre la alfombra
  for (const [x0, , x1] of G.ven) g_haz(R, x0 - 4, x1 - 4, yS + 1, 179, -0.55, P.luz, luz === 'atardecer' ? 0.24 : 0.18);
  // los ventanales: marco blanco, parteluces, alféizar (el cristal se queda vacío)
  for (const [x0, y0, x1, y1] of G.ven) {
    rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, hex('#c8bca0')); rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, hex('#fbf6ea')); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#d8ccb0'));
    rect(x0, y0, x1, y1, 0);
    const mx = (x0 + x1) >> 1; rect(mx, y0, mx + 1, y1, hex('#f4ecd8')); pset(mx + 1, y0, hex('#c8bca0'));
    for (let y = y0 + 15; y < y1; y += 16) { rect(x0, y, x1, y, hex('#f4ecd8')); rect(x0, y + 1, x1, y + 1, hex('#c8bca0')); }
    rect(x0 - 6, y1 + 4, x1 + 6, y1 + 6, hex('#fbf6ea')); rect(x0 - 6, y1 + 7, x1 + 6, y1 + 7, hex('#b8a888'));
  }
  // las barras de las cortinas
  rect(G.cortinas[0][0] - 4, G.ven[0][1] - 12, G.cortinas[1][1] + 4, G.ven[0][1] - 11, hex('#b88a30')); rect(G.cortinas[0][0] - 4, G.ven[0][1] - 12, G.cortinas[1][1] + 4, G.ven[0][1] - 12, hex('#e8c060'));
  if (!Cc) {
    // pilastras estriadas
    for (const px of [84, 230]) { rect(px, 20, px + 6, pared - 4, hex('#f8f0dc')); for (let x = px + 1; x < px + 6; x += 2) rect(x, 26, x, pared - 10, hex('#e0d2b0')); rect(px - 1, 20, px + 7, 23, hex('#fbf6ea')); rect(px - 1, 24, px + 7, 24, hex('#c8b896')); rect(px - 1, pared - 9, px + 7, pared - 4, hex('#fbf6ea')); rect(px + 6, 20, px + 6, pared - 4, hex('#d4c6a4')); }
    // el paisaje con su marco dorado y su lamparita
    rect(20, 38, 74, 72, hex('#8a6420')); rect(21, 39, 73, 71, hex('#e8c060')); rect(23, 41, 71, 69, hex('#b88a30')); rect(24, 42, 70, 68, hex('#a8c8e4'));
    for (let x = 24; x <= 70; x++) { const m = 54 + Math.round(Math.sin(x * 0.25) * 4 + Math.sin(x * 0.6) * 2); for (let y = m; y <= 68; y++) pset(x, y, y < 58 ? hex('#7a8aa8') : y < 62 ? hex('#5a8a5a') : y < 64 ? hex('#6aa0c8') : hex('#4a7a3a')); }
    g_nube(R, 36, 47, 9, [hex('#ffffff'), hex('#e8f0f8'), hex('#c8d8e8')]); rect(52, 62, 56, 64, hex('#f4f0e6')); poligono([[51, 62], [54, 59], [57, 62]], hex('#a83a2a'));
    rect(38, 34, 56, 35, hex('#b88a30')); rect(46, 36, 47, 37, hex('#8a6420')); for (let y = 37; y < 46; y++) for (let x = 38 - (y - 37); x <= 56 + (y - 37); x++) if (((x + y) & 1) === 0 && h(x, y, 696) < 0.5) pset(x, y, g_mezcla(R.pget(x, y), hex('#fff4c0'), 0.25));
    // la consola con el caballo de bronce, libros y la lámpara
    rect(12, 102, 80, 105, hex('#5a3420')); rect(12, 102, 80, 102, hex('#8a5a34')); rect(14, 106, 78, 109, hex('#6a3e26')); for (const lx of [16, 75]) { rect(lx, 110, lx + 2, pared - 2, hex('#5a3420')); pset(lx, 110, hex('#8a5a34')); }
    { const hx = 28, hy = 101; rect(hx, hy - 2, hx + 12, hy, hex('#3a2a1a')); rect(hx + 2, hy - 8, hx + 10, hy - 5, hex('#6a4a2a')); rect(hx + 3, hy - 4, hx + 3, hy - 3, hex('#6a4a2a')); rect(hx + 9, hy - 4, hx + 9, hy - 3, hex('#6a4a2a')); rect(hx + 10, hy - 12, hx + 12, hy - 7, hex('#6a4a2a')); rect(hx + 12, hy - 12, hx + 14, hy - 10, hex('#6a4a2a')); pset(hx + 1, hy - 7, hex('#6a4a2a')); pset(hx, hy - 6, hex('#6a4a2a')); rect(hx + 3, hy - 8, hx + 8, hy - 8, hex('#a87a40')); pset(hx + 11, hy - 12, hex('#a87a40')); rect(hx + 1, hy - 4, hx + 1, hy - 3, hex('#6a4a2a')); }
    for (const [bx, bc, bh] of [[48, '#2a4a7a', 7], [51, '#7a2a2a', 9], [54, '#2a5a3a', 8], [57, '#d8c8a0', 6]]) { rect(bx, 101 - bh, bx + 2, 101, hex(bc)); pset(bx, 101 - bh, hex('#e8c060')); }
    rect(65, 96, 71, 101, hex('#d8c8a0')); rect(67, 90, 69, 95, hex('#b88a30')); poligono([[62, 90], [64, 81], [72, 81], [74, 90]], hex('#f4ead0')); for (let x = 63; x < 74; x += 2) linea(x, 89, x + (x < 68 ? 1 : -1), 82, hex('#e0d2b0'));
    g_tinte(R, 56, 84, 80, 100, hex('#fff0c0'), 0.18, true);
    // la puerta con su frontón
    rect(243, 51, 285, pared - 1, hex('#c8bca0')); rect(244, 52, 284, pared - 1, hex('#fbf6ea')); rect(247, 55, 281, pared - 1, hex('#efe4c8'));
    for (const [x0, y0, x1, y1] of [[250, 58, 263, 88], [266, 58, 278, 88], [250, 92, 263, pared - 4], [266, 92, 278, pared - 4]]) { rect(x0, y0, x1, y1, hex('#d4c6a4')); rect(x0 + 1, y0 + 1, x1, y1, hex('#f8f0dc')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#fffaf0')); }
    rect(264, 55, 264, pared - 1, hex('#c8bca0')); R.disco(261, 94, 1, hex('#e8c060')); R.disco(268, 94, 1, hex('#e8c060'));
    poligono([[240, 51], [264, 45], [288, 51]], hex('#fbf6ea')); linea(240, 51, 264, 45, hex('#c8bca0')); linea(264, 45, 288, 51, hex('#c8bca0')); rect(240, 51, 288, 52, hex('#d8ccb0'));
    // el reloj de pie (el péndulo y la aguja se animan)
    rect(294, 62, 312, pared - 1, hex('#4a2a1a')); rect(295, 63, 311, pared - 1, hex('#6a3a22')); rect(296, 64, 310, 76, hex('#4a2a1a')); R.disco(303, 70, 5, hex('#f4ecd8')); R.disco(303, 70, 5, hex('#f4ecd8'));
    for (let k = 0; k < 12; k++) pset(303 + Math.round(Math.cos(k * 0.5236) * 4), 70 + Math.round(Math.sin(k * 0.5236) * 4), hex('#4a3a2a')); linea(303, 70, 305, 69, hex('#2a2018'));
    rect(294, 60, 312, 61, hex('#8a5a34')); poligono([[293, 60], [303, 55], [313, 60]], hex('#6a3a22')); rect(298, 84, 308, 112, hex('#2a1a10')); rect(298, 84, 308, 84, hex('#8a5a34')); rect(296, 116, 310, pared - 2, hex('#5a3420'));
    for (let y = 80; y < pared; y += 3) pset(296, y, hex('#8a5a34'));
    // el escritorio del fondo con su sillón y lo de encima
    rect(150, 94, 170, 116, hex('#1e140e')); rect(151, 95, 169, 116, hex('#3e2418')); rect(151, 95, 169, 96, hex('#5a3a28')); for (let y = 99; y < 114; y += 4) for (let x = 154; x < 168; x += 4) pset(x, y, hex('#2a1810'));
    rect(124, 112, 196, 115, hex('#3a1e10')); rect(125, 112, 195, 113, hex('#8a4e2e')); rect(125, 112, 195, 112, hex('#a8683c'));
    rect(127, 116, 193, 140, hex('#4a2616')); rect(128, 116, 192, 139, hex('#6a3a22'));
    for (const [x0, x1] of [[131, 149], [171, 189]]) { rect(x0, 119, x1, 136, hex('#4a2616')); rect(x0 + 1, 120, x1, 136, hex('#7a4428')); rect(x0 + 1, 120, x1 - 1, 120, hex('#a8683c')); for (let x = x0 + 3; x < x1 - 1; x += 3) linea(x, 122, x + 1, 134, hex('#6a3a22')); }
    rect(152, 119, 168, 139, hex('#3a1e10')); R.disco(160, 128, 5, hex('#b88a30')); R.disco(160, 128, 3, hex('#e8c060')); for (let k = 0; k < 8; k++) pset(160 + Math.round(Math.cos(k * 0.785) * 4), 128 + Math.round(Math.sin(k * 0.785) * 4), hex('#8a6420'));
    rect(127, 139, 193, 140, hex('#2a1408'));
    rect(132, 104, 134, 111, hex('#b88a30')); rect(129, 101, 137, 104, hex('#2a6a3a')); rect(129, 101, 137, 101, hex('#4a9a5a')); rect(131, 111, 135, 111, hex('#8a6420'));   // la lámpara de banquero
    rect(140, 109, 150, 111, hex('#f4f0e6')); rect(141, 108, 149, 108, hex('#e8e4da'));   // papeles
    rect(156, 108, 164, 111, hex('#6a4a8a')); for (let k = 0; k < 6; k++) pset(157 + k, 107, [hex('#d82a3a'), hex('#f0c040'), hex('#3a9a4a'), hex('#4a7ad8'), hex('#f07ab0'), hex('#f08a3a')][k]);   // el cuenco de caramelos
    rect(180, 108, 188, 111, hex('#d8d0b8')); rect(181, 106, 187, 107, hex('#c8c0a8')); rect(176, 109, 177, 111, hex('#2a2a2a'));   // el teléfono
    rect(170, 109, 173, 111, hex('#e8c060')); pset(171, 106, hex('#2a2a2a')); pset(172, 107, hex('#2a2a2a'));
    g_sombraSuelo(R, 160, 141, 40, 3);
  } else {
    // la estantería con libros sin letras, un globo terráqueo y un jarrón
    rect(4, 30, 62, pared, hex('#3a2014')); rect(6, 32, 60, pared, hex('#5a3420'));
    for (let s = 0; s < 5; s++) { const y = 50 + s * 19; rect(6, y, 60, y + 2, hex('#7a4a2c')); rect(6, y, 60, y, hex('#a8683c'));
      let x = 8; while (x < 58) { const w = 2 + Math.floor(h(x, s, 697) * 3), bh = 10 + Math.floor(h(x, s, 698) * 6), col = [hex('#7a2a2a'), hex('#2a4a7a'), hex('#2a5a3a'), hex('#d8c8a0'), hex('#5a3a6a'), hex('#8a6a2a')][Math.floor(h(x, s, 699) * 6)];
        if (h(x, s, 700) < 0.14 && x < 48) { if (s === 1) { R.disco(x + 5, y - 6, 4, hex('#3a7ab8')); pset(x + 4, y - 7, hex('#5aa04a')); pset(x + 6, y - 5, hex('#5aa04a')); rect(x + 5, y - 2, x + 5, y - 1, hex('#b88a30')); } else { rect(x + 2, y - 8, x + 6, y - 1, hex('#e8e4dc')); rect(x + 3, y - 10, x + 5, y - 9, hex('#e8e4dc')); pset(x + 3, y - 6, hex('#3a6ab0')); } x += 10; continue; }
        rect(x, y - bh, x + w, y - 1, col); rect(x, y - bh, x, y - 1, g_mezcla(col, C.blanco, 0.25)); rect(x, y - bh + 2, x + w, y - bh + 2, hex('#e8c060')); x += w + 1; } }
    rect(4, 30, 62, 32, hex('#7a4a2c')); rect(4, 30, 62, 30, hex('#a8683c'));
    // la mesita con la lámpara y las fotos, el aplique y el helecho
    rect(258, 108, 300, 111, hex('#5a3420')); rect(258, 108, 300, 108, hex('#8a5a34')); for (const lx of [261, 296]) rect(lx, 112, lx + 2, pared, hex('#4a2a1a'));
    rect(283, 100, 289, 107, hex('#3a6a8a')); rect(285, 92, 287, 99, hex('#b88a30')); poligono([[278, 92], [281, 82], [291, 82], [294, 92]], hex('#f4ead0')); g_tinte(R, 270, 80, 300, 106, hex('#fff0c0'), 0.15, true);
    for (const [fx, fw] of [[262, 8], [272, 6]]) { rect(fx, 107 - fw - 2, fx + fw, 107, hex('#b88a30')); rect(fx + 1, 107 - fw - 1, fx + fw - 1, 106, hex('#c8d8e4')); pset(fx + 3, 104, hex('#f0c090')); pset(fx + 3, 105, hex('#3a5a8a')); if (fw > 6) { pset(fx + 5, 104, hex('#f0c090')); pset(fx + 5, 105, hex('#8a3a3a')); } }
    rect(268, 58, 270, 66, hex('#b88a30')); for (const dx of [-3, 5]) { rect(268 + dx, 56, 268 + dx + 1, 60, hex('#f8f0dc')); pset(268 + dx, 55, hex('#fff4c0')); } g_tinte(R, 258, 46, 282, 70, hex('#fff4c8'), 0.12, true);
    rect(304, pared - 10, 316, pared, hex('#8a5a3a')); rect(304, pared - 10, 316, pared - 10, hex('#a87050'));
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.32; for (let i = 0; i < 20; i++) { const x = Math.round(310 + Math.cos(a) * i * 0.7), y = Math.round(pared - 11 + Math.sin(a) * i + i * i * 0.03); pset(x, y, i % 3 ? hex('#3a8a4a') : hex('#5ab062')); if (i % 2) pset(x + (k < 4 ? -1 : 1), y + 1, hex('#2a6a3a')); } }
    // el sillón alto de cuero detrás del escritorio
    rect(138, 98, 182, 142, hex('#1e100a')); rect(140, 100, 180, 142, hex('#4a2a1e')); rect(140, 100, 180, 102, hex('#6a3e2a'));
    for (let y = 106; y < 140; y += 6) for (let x = 144; x < 178; x += 6) { pset(x + ((y / 6) & 1) * 3, y, hex('#2e1810')); pset(x + ((y / 6) & 1) * 3 - 1, y - 1, hex('#6a3e2a')); }
    rect(176, 100, 180, 142, hex('#341c12'));
  }
  return null;
}

// la sombra blanda en el suelo (oscurece una elipse)
function g_sombraSuelo(R, cx, cy, rx, ry) { for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, g_mezcla(c, C.k, 0.22)); } } }

// lo que va delante en el despacho: sofás de rayas y la mesita con manzanas ('general') o el escritorio ('cerca')
function g_despachoDelante(R, t, cam, o) {
  const { rect, pset, linea, disco } = R;
  if (cam !== 'cerca') {
    for (const [xa, xb, d] of [[-6, 70, 1], [250, 326, -1]]) {   // los sofás, de espaldas, con el brazo enrollado
      for (let x = xa; x <= xb; x++) { const top = 150 + Math.round(Math.abs(x - (xa + xb) / 2) / 40 * 2); for (let y = top; y < 180; y++) pset(x, y, y === top ? hex('#fffaf0') : (x % 6 < 3 ? hex('#efe2c0') : hex('#e2d2a8'))); pset(x, top + 1, hex('#f8f0dc')); }
      for (let y = 158; y < 180; y++) for (let x = xa; x <= xb; x++) if (((x + y) & 1) === 0) pset(x, y, g_mezcla(R.pget(x, y), hex('#8a7a5a'), 0.18));
      const ax = d > 0 ? xb : xa; for (let y = 152; y < 180; y++) for (let i = -5; i <= 5; i++) pset(ax + i, y, Math.abs(i) > 4 ? hex('#a89870') : i * d > 1 ? hex('#d8c8a0') : hex('#f4ead2')); disco(ax, 153, 5, hex('#f4ead2')); disco(ax - d, 152, 3, hex('#fffaf0'));
      for (let x = xa + 6; x < xb - 6; x += 10) disco(x, 162, 1, hex('#c8b890'));
    }
    // la mesita baja con el cuenco de manzanas y un libro
    rect(118, 170, 202, 174, hex('#3a1e10')); rect(119, 170, 201, 171, hex('#8a4e2e')); rect(119, 170, 201, 170, hex('#a8683c')); for (const lx of [122, 196]) rect(lx, 175, lx + 2, 179, hex('#4a2616'));
    rect(140, 166, 160, 169, hex('#d8d4c8')); rect(142, 165, 158, 165, hex('#f4f0e6'));
    for (const [ax, ay, c] of [[145, 163, '#c82a2a'], [150, 162, '#d83a2a'], [155, 163, '#b82a2a'], [148, 160, '#7ab03a']]) { disco(ax, ay, 2, hex(c)); pset(ax - 1, ay - 1, hex('#ffb0a0')); pset(ax, ay - 3, hex('#4a2a1a')); }
    rect(172, 167, 186, 169, hex('#2a4a7a')); rect(172, 166, 186, 166, hex('#f4f0e6')); rect(174, 165, 184, 165, hex('#7a2a2a'));
    return;
  }
  // el escritorio de cerca: tablero con veta, faldón de cuarterones, el panel del hueco con un rosetón tallado
  rect(62, 138, 258, 146, hex('#2a1408')); rect(63, 139, 257, 145, hex('#8a4e2e'));
  for (let y = 139; y <= 145; y++) for (let x = 63; x <= 257; x++) if (h(x >> 3, y, 701) < 0.22 && h(x, y, 702) < 0.85) pset(x, y, hex('#7a4428')); else if (((x + y) & 1) === 0 && Math.abs(x - 120 - (y - 139) * 2) < 6) pset(x, y, hex('#a8683c'));
  rect(63, 139, 257, 139, hex('#c08048')); rect(63, 146, 257, 147, hex('#4a2616'));
  rect(66, 148, 254, 179, hex('#5a3020')); rect(66, 148, 254, 148, hex('#a8683c'));
  for (const [x0, x1] of [[70, 118], [202, 250]]) { for (let k = 0; k < 2; k++) { const y0 = 152 + k * 14, y1 = y0 + 11; rect(x0, y0, x1, y1, hex('#3a1e10')); rect(x0 + 1, y0 + 1, x1, y1, hex('#7a4428')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#a8683c')); rect(x0 + 3, y0 + 3, x1 - 3, y1 - 2, hex('#6a3a22'));
    rect(((x0 + x1) >> 1) - 3, y0 + 5, ((x0 + x1) >> 1) + 3, y0 + 6, hex('#e8c060')); pset(((x0 + x1) >> 1) - 3, y0 + 6, hex('#8a6420')); } }
  rect(124, 150, 196, 179, hex('#3a1e10')); rect(125, 151, 195, 179, hex('#6a3a22')); rect(125, 151, 195, 151, hex('#a8683c'));
  disco(160, 166, 10, hex('#8a6420')); disco(160, 166, 9, hex('#b88a30')); disco(160, 166, 6, hex('#7a4428')); disco(160, 166, 3, hex('#e8c060'));
  for (let k = 0; k < 12; k++) { const a = k * 0.5236; linea(160 + Math.round(Math.cos(a) * 4), 166 + Math.round(Math.sin(a) * 4), 160 + Math.round(Math.cos(a) * 8), 166 + Math.round(Math.sin(a) * 8), k % 2 ? hex('#e8c060') : hex('#8a6420')); }
  for (const px of [120, 198]) { rect(px, 148, px + 3, 179, hex('#4a2616')); for (let y = 152; y < 178; y += 3) pset(px + 1, y, hex('#8a4e2e')); }
  // encima: la lámpara verde, carpetas, el teléfono, el portaplumas y un papel; el brillo que corre por el canto
  rect(80, 130, 82, 138, hex('#b88a30')); rect(74, 124, 88, 129, hex('#1e5a2e')); rect(74, 124, 88, 124, hex('#4a9a5a')); rect(77, 138, 85, 138, hex('#8a6420')); g_tinte(R, 72, 139, 92, 145, hex('#f8e8a0'), 0.25, true);
  rect(94, 134, 110, 138, hex('#2a4a7a')); rect(95, 132, 109, 133, hex('#7a2a2a')); rect(96, 131, 108, 131, hex('#d8c8a0'));
  rect(138, 136, 152, 138, hex('#f4f0e6')); linea(140, 137, 150, 137, hex('#c8c4b8'));
  rect(212, 134, 218, 138, hex('#3a2a1a')); linea(213, 133, 211, 128, hex('#e8c060')); linea(217, 133, 219, 129, hex('#e8c060'));
  rect(228, 133, 242, 138, hex('#d8d0b8')); rect(230, 131, 240, 132, hex('#c8c0a8')); rect(229, 131, 230, 131, hex('#2a2a2a')); rect(240, 131, 241, 131, hex('#2a2a2a')); if (Math.sin(t * 5) > 0.6) pset(241, 135, hex('#ff4a3a'));
  const br = Math.round(((t * 30) % 300) + 40); for (let x = br; x < br + 6; x++) if (x > 63 && x < 257) pset(x, 139, hex('#f0b070'));
}

function g_celda(R, t, cam, o) {
  const Cc = cam === 'cerca', { pset, rect, linea, disco } = R;
  const sala = g_capa(R, `celda|${cam}`, () => g_celdaSala(R, Cc));
  R.copiar(sala.b);
  // la pantalla de los planetas (detrás de la celda; en la cámara de cerca, en la pared del fondo de la celda)
  const pant = Cc ? [188, 48, 286, 102] : [163, 55, 259, 101];
  g_planetas(R, t, pant);
  // el cristal tiñe todo lo de dentro de la celda
  const dentro = Cc ? [155, 0, 319, 157] : [144, 43, 274, 147];
  g_tinte(R, dentro[0], dentro[1], dentro[2], dentro[3], hex('#bfe6f4'), 0.12, true);
  // la tira de luz del techo de la celda y de la peana, que respira
  const f = (Math.sin(t * 1.6) + 1) / 2;
  if (!Cc) { for (let x = 140; x <= 278; x++) pset(x, 40, g_mezcla(hex('#5ac8e8'), hex('#d8f6ff'), f)); }
  for (let x = Cc ? 152 : 140; x <= (Cc ? 319 : 278); x++) pset(x, Cc ? 160 : 151, g_mezcla(hex('#3ab0d8'), hex('#b8f0ff'), 1 - f));
  // la pasarela con los guardias que pasan (por detrás de la barandilla)
  const pw = Cc ? [0, 149, 40] : [0, 136, 46];
  for (let k = 0; k < 2; k++) { const u = ((t + k * 7) % 16) / 16, d = k ? -1 : 1, x = Math.round(d > 0 ? pw[0] - 6 + u * (pw[1] - pw[0] + 12) : pw[1] + 6 - u * (pw[1] - pw[0] + 12)); g_figurita(R, x, pw[2], t, hex('#3a4a6a'), { dir: d, pelo: hex('#1a1a20'), pantalon: hex('#2a3448') }); }
  for (let x = pw[0]; x <= pw[1]; x++) { pset(x, pw[2] - 8, hex('#b8c4cc')); if (x % 6 === 0) rect(x, pw[2] - 7, x, pw[2] - 1, hex('#9aa8b2')); pset(x, pw[2] - 4, hex('#c8d2d8')); }
  // las cámaras de seguridad que giran
  for (const [cx, cy, fase] of Cc ? [[8, 24, 0]] : [[8, 24, 0], [132, 22, 2]]) { const g = Math.round(Math.sin(t * 0.5 + fase) * 3); rect(cx - 1, cy - 3, cx + 1, cy, hex('#8a96a0')); rect(cx - 3 + g, cy, cx + 3 + g, cy + 3, hex('#3a4250')); rect(cx - 3 + g, cy, cx + 3 + g, cy, hex('#6a7482')); pset(cx + (g >= 0 ? 4 : -4) + g, cy + 2, hex('#1a1e26')); if (Math.sin(t * 2 + fase) > 0) pset(cx - 2 + g, cy + 1, hex('#ff4a3a')); }
  // el monitor de constantes de la pared y el piloto de la puerta
  { const [mx, my] = Cc ? [62, 62] : [70, 68]; R.recorte([mx, my, mx + 36, my + 18]); for (let x = mx; x <= mx + 36; x++) { const y = my + 9 + (((x - mx + Math.floor(t * 20)) % 18) === 6 ? -6 : ((x - mx + Math.floor(t * 20)) % 18) === 7 ? 4 : 0); pset(x, y, hex('#5ae08a')); }
    for (let k = 0; k < 4; k++) linea(mx + 2 + k * 9, my + 16, mx + 2 + k * 9 + Math.round((Math.sin(t + k) + 1) * 3), my + 16, hex('#4ac8f0')); R.recorte(null); }
  if (!Cc) { const on = Math.sin(t * 1.2) > -0.6; disco(34, 56, 1, on ? hex('#ff4a3a') : hex('#5a1a1a')); pset(40, 56, on ? hex('#2a5a3a') : hex('#5ae08a')); }
  // el interfono: su luz parpadea cuando se habla
  { const [ix, iy] = Cc ? [133, 128] : [118, 124], on = o.habla ? Math.sin(t * 9) > -0.3 : Math.sin(t * 1.5) > 0.7; disco(ix, iy + 3, 1, on ? hex('#5ae08a') : hex('#2a5a3a')); }
  // las luces de los hexágonos del techo, que respiran despacio
  for (let k = 0; k < 5; k++) { const x = 30 + k * 56, y = 7, l = (Math.sin(t * 0.8 + k * 1.3) + 1) / 2; if (l > 0.6) for (let i = -3; i <= 3; i++) pset(x + i, y, g_mezcla(R.pget(x + i, y), C.blanco, 0.5)); }
  // el robot aspirador que cruza el suelo (vista general)
  if (!Cc) { const u = (t % 14) / 14, d = u < 0.5 ? 1 : -1, rx = Math.round(14 + (u < 0.5 ? u * 2 : 2 - u * 2) * 110), ry = 172;
    rect(rx - 5, ry - 2, rx + 5, ry, hex('#3a4250')); rect(rx - 4, ry - 3, rx + 4, ry - 3, hex('#5a6472')); rect(rx - 3, ry - 3, rx + 1, ry - 3, hex('#7a8492')); pset(rx + 3 * d, ry - 2, Math.sin(t * 6) > 0 ? hex('#4ac8f0') : hex('#1a4a5a'));
    for (let k = 1; k < 5; k++) pset(rx - (5 + k) * d, ry + 1, g_mezcla(R.pget(rx - (5 + k) * d, ry + 1), C.blanco, 0.5)); }
  return Cc ? { suelo: 170, dentro: 154, cristal: [154, 0, 319, 157], afuera: [10, 140, 170], interfono: [126, 128, 142, 166], pantalla: pant }
    : { suelo: 158, dentro: 148, cristal: [143, 42, 275, 148], afuera: [20, 132, 158], interfono: [112, 122, 124, 156], pantalla: pant, puerta: [16, 60, 52, 118] };
}

// la prisión en su búfer: techo de hexágonos, paneles, pasarela, puerta, celda con peana, banco y suelo pulido
function g_celdaSala(R, Cc) {
  const { rect, pset, linea, poligono } = R;
  // el techo de hexágonos
  rect(0, 0, 319, 15, hex('#e2e9ed'));
  for (let y = 0; y < 15; y++) for (let x = 0; x < 320; x++) { const q = (Math.floor(y / 5) & 1) * 4, i = (x + q) % 8; if (y % 5 === 0 && i < 6) pset(x, y, hex('#d2dbe1')); else if (i === 6 || i === 7) pset(x, y, hex('#d6dfe4')); }
  rect(0, 15, 319, 15, hex('#c4ced6')); rect(0, 16, 319, 16, hex('#f8fbfc'));
  // la pared de paneles con juntas y la ranura de luz
  const yS = Cc ? 128 : 118;
  for (let y = 17; y < yS; y++) for (let x = 0; x < 320; x++) { const px = (x - 6 + 340) % 34, py = y < 64 ? y - 17 : y - 64; let c = px === 0 ? hex('#c4ced6') : px === 1 ? hex('#f8fbfc') : y === 64 ? hex('#c4ced6') : y === 65 ? hex('#f8fbfc') : (px + py * 0.6 < 12 ? hex('#edf2f4') : hex('#e5ebee')); if (h(x, y, 703) < 0.02) c = hex('#dce4e8'); pset(x, y, c); }
  for (let x = 0; x < 320; x++) { pset(x, 28, hex('#bfe8f4')); pset(x, 29, hex('#8ad4ec')); pset(x, 27, g_mezcla(R.pget(x, 27), hex('#bfe8f4'), 0.4)); pset(x, 30, g_mezcla(R.pget(x, 30), hex('#bfe8f4'), 0.4)); }
  rect(0, yS - 3, 319, yS - 1, hex('#d4dce2')); rect(0, yS - 3, 319, yS - 3, hex('#f8fbfc'));
  // la pasarela de arriba
  const [p0, p1, pY] = Cc ? [0, 149, 40] : [0, 136, 46];
  rect(p0, pY, p1, pY + 3, hex('#cfd8de')); rect(p0, pY, p1, pY, hex('#f4f8fa')); rect(p0, pY + 4, p1, pY + 5, hex('#a8b4bc'));
  for (let x = p0 + 10; x < p1; x += 40) { rect(x, pY + 6, x + 1, pY + 9, hex('#b8c4cc')); }
  // la puerta corredera (general) y el monitor de constantes
  if (!Cc) { rect(13, 57, 55, yS - 1, hex('#b8c4cc')); rect(16, 60, 52, yS - 1, hex('#d8e0e6')); rect(34, 60, 34, yS - 1, hex('#a8b4bc')); rect(16, 60, 52, 60, hex('#f4f8fa'));
    for (let x = 16; x < 52; x += 1) { pset(x, yS - 3, ((x >> 2) & 1) ? hex('#e8c040') : hex('#2a2a30')); } rect(56, 82, 60, 92, hex('#3a4250')); for (let k = 0; k < 4; k++) pset(57 + (k % 2) * 2, 84 + (k >> 1) * 3, hex('#8a96a0'));
    rect(30, 54, 42, 58, hex('#3a4250')); }
  { const [mx, my] = Cc ? [62, 62] : [70, 68]; rect(mx - 2, my - 2, mx + 38, my + 20, hex('#3a4250')); rect(mx, my, mx + 36, my + 18, hex('#0a1420')); for (let x = mx; x <= mx + 36; x += 6) for (let y = my; y <= my + 18; y++) pset(x, y, hex('#10223a')); }
  if (Cc) { for (let y = 20; y < yS; y++) for (let x = 18; x <= 26; x++) pset(x, y, x === 18 || x === 26 ? hex('#c4ced6') : g_mezcla(hex('#f4fbff'), hex('#bfe8f4'), Math.abs(x - 22) / 5)); }
  // tuberías con abrazaderas, rejilla de ventilación, extintor y el puesto de guardia con sus pantallas
  { const x1 = Cc ? 149 : 136, pyT = Cc ? 50 : 52; for (const [y, c, cL] of [[pyT, hex('#aab6be'), hex('#dce4e8')], [pyT + 4, hex('#8ac0d4'), hex('#c8e8f4')]]) { rect(0, y, x1, y + 2, c); rect(0, y, x1, y, cL); for (let x = 8; x < x1; x += 24) { rect(x, y - 1, x + 2, y + 3, hex('#7a8690')); pset(x + 1, y - 1, hex('#c4ced6')); } }
    const [gx, gy] = Cc ? [32, 106] : [62, 100], gw = Cc ? 56 : 44;
    rect(gx, gy + 6, gx + gw, gy + 8, hex('#b8c4cc')); rect(gx, gy + 6, gx + gw, gy + 6, hex('#f8fbfc')); rect(gx + 2, gy + 9, gx + gw - 2, yS - 1, hex('#d4dce2')); rect(gx + 2, gy + 9, gx + gw - 2, gy + 9, hex('#a8b4bc'));
    for (let k = 0; k * 16 < gw - 10; k++) { const mx = gx + 4 + k * 16; rect(mx, gy - 4, mx + 12, gy + 4, hex('#3a4250')); rect(mx + 1, gy - 3, mx + 11, gy + 3, hex('#0e2030')); for (let i = 0; i < 4; i++) rect(mx + 2, gy - 2 + i * 2, mx + 2 + Math.round(h(i, k, 707) * 8), gy - 2 + i * 2, i % 2 ? hex('#4ac8f0') : hex('#2a7aa8')); rect(mx + 5, gy + 5, mx + 7, gy + 5, hex('#5a6472')); }
    const [vx, vy] = Cc ? [110, 70] : [112, 70]; rect(vx, vy, vx + 18, vy + 10, hex('#b8c4cc')); for (let y = vy + 2; y < vy + 9; y += 2) rect(vx + 2, y, vx + 16, y, hex('#7a8690'));
    const [ex, ey] = Cc ? [8, 104] : [58, 104]; rect(ex, ey, ex + 4, ey + 11, hex('#c82a2a')); rect(ex + 1, ey + 1, ex + 1, ey + 10, hex('#f05a4a')); rect(ex + 1, ey - 3, ex + 3, ey - 1, hex('#2a2a30')); rect(ex - 1, ey + 4, ex + 5, ey + 5, hex('#2a2a30'));
    poligono([[ex + 2, ey - 14], [ex + 7, ey - 6], [ex - 3, ey - 6]], hex('#e8c040')); pset(ex + 2, ey - 11, hex('#2a2a30')); pset(ex + 2, ey - 10, hex('#2a2a30')); pset(ex + 2, ey - 8, hex('#2a2a30')); }
  // el suelo pulido de losas blancas con el reflejo de la celda
  for (let y = yS; y < 180; y++) { const u = (y - yS) / (180 - yS); for (let x = 0; x < 320; x++) { let c = u < 0.3 ? hex('#e2e8ec') : u < 0.65 ? hex('#d8e0e5') : hex('#ced7dd'); if (((x + y) & 1) && (u * 3 % 1) > 0.85) c = hex('#d8e0e5'); if (h(x, y, 704) < 0.02) c = hex('#c4ced6'); pset(x, y, c); } }
  for (let d = 4, y = yS + 4; y < 180; d += 3, y += d) { rect(0, y, 319, y, hex('#c0cad2')); rect(0, y + 1, 319, y + 1, hex('#f0f4f6')); }
  for (let k = -8; k <= 8; k++) { const xb = 160 + k * 44, xa = Math.round(160 + (xb - 160) * (yS - 20) / 160); linea(xa, yS, xb, 179, hex('#c0cad2')); }
  // la celda: tapa con rejillas, peana, el banco de dentro, las aristas del fondo
  if (!Cc) {
    rect(138, 32, 280, 42, hex('#c8d2d8')); rect(139, 33, 279, 39, hex('#eef3f5')); rect(139, 33, 279, 33, hex('#ffffff')); for (let x = 146; x < 274; x += 8) rect(x, 35, x + 4, 35, hex('#b8c4cc')); for (let x = 146; x < 274; x += 8) rect(x, 37, x + 4, 37, hex('#b8c4cc'));
    R.numero('7', 209, 40, { centro: true, color: hex('#6a7a88'), sombra: false });
    rect(160, 52, 262, 104, hex('#2a3038')); rect(161, 53, 261, 103, hex('#14181e'));
    rect(144, 140, 274, 147, hex('#d4dee4')); for (let x = 150; x < 270; x += 12) linea(x, 140, x - 3, 147, hex('#c8d2d8'));
    linea(152, 44, 152, 139, hex('#c8dce6')); linea(266, 44, 266, 139, hex('#c8dce6')); linea(152, 139, 266, 139, hex('#b8ccd8'));
    rect(232, 124, 268, 130, hex('#c4ced6')); rect(232, 124, 268, 124, hex('#ffffff')); rect(233, 125, 267, 129, hex('#eef3f5')); rect(236, 131, 238, 139, hex('#b8c4cc')); rect(262, 131, 264, 139, hex('#b8c4cc'));
    rect(244, 120, 262, 123, hex('#6a7a9a')); rect(244, 120, 262, 120, hex('#8a9aba')); for (const [bx, bc] of [[236, '#a83a3a'], [238, '#3a6aa8'], [240, '#e8c040']]) rect(bx, 118, bx + 1, 123, hex(bc));
    rect(220, 136, 223, 139, hex('#f4f8fa')); pset(224, 137, hex('#f4f8fa'));
    rect(136, 148, 282, 158, hex('#b8c4cc')); rect(137, 148, 281, 157, hex('#e4eaee')); rect(137, 148, 281, 148, hex('#ffffff'));
    for (let x = 132; x <= 286; x++) for (let y = 160; y <= 162; y++) pset(x, y, (((x + y) >> 2) & 1) ? hex('#e8c040') : hex('#2a2a30'));
    for (let y = 163; y < 180; y++) for (let x = 140; x <= 278; x++) if (((x + y) & 1) === 0 && (x % 20) < 8) pset(x, y, g_mezcla(R.pget(x, y), hex('#8ac8e0'), 0.2 * (1 - (y - 163) / 17)));
    // el pedestal del interfono
    rect(113, 128, 123, 156, hex('#c8d2d8')); rect(114, 128, 121, 156, hex('#eef3f5')); rect(110, 122, 126, 128, hex('#b8c4cc')); rect(111, 122, 125, 126, hex('#e4eaee')); for (let k = 0; k < 9; k++) pset(113 + (k % 3) * 2, 123 + Math.floor(k / 3), hex('#5a6472'));
    g_sombraSuelo(R, 118, 157, 9, 1); g_sombraSuelo(R, 209, 163, 74, 2);
  } else {
    for (let y = 0; y < 158; y++) for (let x = 155; x < 320; x++) { if (y < 140) { if ((x - 155) % 40 === 0) pset(x, y, hex('#c8d2d8')); } }
    for (const lx of [166, 302]) for (let y = 20; y < 136; y++) for (let x = lx; x <= lx + 4; x++) pset(x, y, x === lx || x === lx + 4 ? hex('#c4ced6') : g_mezcla(hex('#f4fbff'), hex('#bfe8f4'), Math.abs(x - lx - 2) / 3));
    rect(200, 114, 236, 124, hex('#b8c4cc')); for (let y = 116; y < 123; y += 2) rect(202, y, 234, y, hex('#7a8690'));
    rect(184, 44, 290, 106, hex('#2a3038')); rect(185, 45, 289, 105, hex('#14181e'));
    rect(155, 140, 319, 157, hex('#d4dee4')); for (let x = 160; x < 320; x += 14) linea(x, 140, x - 4, 157, hex('#c8d2d8')); rect(155, 140, 319, 140, hex('#b8ccd8'));
    rect(282, 126, 319, 133, hex('#c4ced6')); rect(282, 126, 319, 126, hex('#ffffff')); rect(283, 127, 319, 132, hex('#eef3f5')); rect(288, 134, 290, 139, hex('#b8c4cc')); rect(296, 121, 316, 125, hex('#6a7a9a')); rect(296, 121, 316, 121, hex('#8a9aba'));
    rect(150, 158, 319, 168, hex('#b8c4cc')); rect(151, 158, 319, 167, hex('#e4eaee')); rect(151, 158, 319, 158, hex('#ffffff'));
    for (let x = 146; x <= 319; x++) for (let y = 170; y <= 172; y++) pset(x, y, (((x + y) >> 2) & 1) ? hex('#e8c040') : hex('#2a2a30'));
    rect(128, 134, 138, 166, hex('#c8d2d8')); rect(129, 134, 136, 166, hex('#eef3f5')); rect(125, 128, 141, 134, hex('#b8c4cc')); rect(126, 128, 140, 132, hex('#e4eaee')); for (let k = 0; k < 9; k++) pset(128 + (k % 3) * 2, 129 + Math.floor(k / 3), hex('#5a6472'));
    g_sombraSuelo(R, 133, 167, 9, 1);
  }
  return null;
}

// la pantalla de los planetas: estrellas, órbitas punteadas, planetas que giran (uno con anillo, uno que late en rojo con
// su aviso) y una retícula que barre
function g_planetas(R, t, r) {
  const { pset, disco, linea } = R, [x0, y0, x1, y1] = r, cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, w = x1 - x0, hh = y1 - y0;
  R.recorte(r);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y & 1) ? hex('#080c1c') : hex('#0b1024'));
  for (let k = 0; k < 40; k++) pset(x0 + Math.floor(h(k, 1, 705) * w), y0 + Math.floor(h(k, 2, 705) * hh), Math.sin(t * 2 + k) > 0 ? hex('#c8d4ff') : hex('#4a5480'));
  disco(cx, cy, 4, hex('#ffd860')); disco(cx, cy, 2, hex('#fff6c8'));
  const P = [[11, 1.2, '#4a92de', 2], [19, 0.7, '#e08a4a', 3], [28, 0.45, '#5ab06a', 3], [38, 0.3, '#d8b06a', 4]];
  P.forEach(([rr, v, c, pr], i) => { const ry = rr * 0.45; for (let a = 0; a < 6.28; a += 0.18) pset(cx + Math.round(Math.cos(a) * rr), cy + Math.round(Math.sin(a) * ry), hex('#24305a'));
    const a = t * v + i * 1.7, px = cx + Math.round(Math.cos(a) * rr), py = cy + Math.round(Math.sin(a) * ry); disco(px, py, pr, hex(c)); pset(px - 1, py - 1, C.blanco);
    if (i === 3) linea(px - 6, py + 1, px + 6, py - 1, hex('#f0e0b0')); });
  // el planeta extraño que llega, latiendo en rojo, con su aviso
  const ex = x1 - 16 - Math.round(Math.sin(t * 0.4) * 4), ey = y0 + 12, l = (Math.sin(t * 4) + 1) / 2;
  disco(ex, ey, 5, hex('#6a1a2a')); disco(ex, ey, 4, g_mezcla(hex('#a82a3a'), hex('#ff6a5a'), l)); pset(ex - 2, ey - 2, hex('#ffb0a0'));
  for (let a = 0; a < 6.28; a += 0.3) pset(ex + Math.round(Math.cos(a) * (7 + l * 2)), ey + Math.round(Math.sin(a) * (7 + l * 2)), hex('#ff4a3a'));
  for (let k = 0; k < 6; k++) pset(ex - 8 - k * 4, ey + 3 + k * 2, Math.floor(t * 6 + k) % 2 ? hex('#ff6a5a') : hex('#5a1a1a'));
  { const ax = x0 + 3, ay = y0 + 3, on = Math.sin(t * 5) > -0.2; R.poligono([[ax + 5, ay], [ax + 10, ay + 9], [ax, ay + 9]], on ? hex('#ffd040') : hex('#7a5a20')); R.icono('!', ax + 4, ay + 2, hex('#1a1010'), on ? hex('#ffd040') : hex('#7a5a20'), 1); }
  const sx = Math.round(x0 + ((t * 22) % w)); for (let y = y0; y <= y1; y++) pset(sx, y, g_mezcla(R.pget(sx, y), hex('#4ac8f0'), 0.35));
  R.recorte(null);
  for (let k = 0; k < 10; k++) pset(x0 + 2 + k, y0 + 1 + k * 2, g_mezcla(R.pget(x0 + 2 + k, y0 + 1 + k * 2), C.blanco, 0.2));
}

// el cristal de la celda, por delante del preso: rayas de reflejo en diagonal, el brillo que pasa, los agujeros para
// hablar (con un poco de vaho) y los postes del marco
function g_celdaDelante(R, t, cam, o) {
  const Cc = cam === 'cerca', { pset, rect } = R, [x0, y0, x1, y1] = Cc ? [155, 0, 319, 157] : [144, 43, 274, 147], brillo = ((t * 26) % 260) - 60;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = ((x - x0) + (y - y0) * 0.6) % 70, b = Math.abs((x - x0) + (y - y0) * 0.6 - brillo);
    if (d < 5 || (d > 9 && d < 11) || b < 3) { const c = R.pget(x, y); if (c) pset(x, y, g_mezcla(c, C.blanco, b < 3 ? 0.35 : d < 5 ? 0.16 : 0.24)); } }
  const [hx, hy] = Cc ? [170, 124] : [160, 110];
  for (let k = 0; k < 8; k++) { const a = k * 0.785, x = hx + Math.round(Math.cos(a) * 4), y = hy + Math.round(Math.sin(a) * 4); pset(x, y, hex('#5a6472')); pset(x + 1, y + 1, hex('#f4fbff')); } pset(hx, hy, hex('#5a6472'));
  if (o.habla) { const v = (Math.sin(t * 3) + 1) / 2; for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j < 36 && ((i + j) & 1) === 0) pset(hx + i, hy + j, g_mezcla(R.pget(hx + i, hy + j), C.blanco, 0.12 + v * 0.12)); }
  const postes = Cc ? [[150, 154]] : [[140, 143], [275, 278]];
  for (const [a, b] of postes) { rect(a, Cc ? 0 : 34, b, Cc ? 168 : 158, hex('#b8c4cc')); rect(a + 1, Cc ? 0 : 34, b - 1, Cc ? 168 : 158, hex('#eef3f5')); rect(a + 1, Cc ? 0 : 34, a + 1, Cc ? 168 : 158, hex('#ffffff')); }
}

// la paleta de los sesenta: pastel, cromo y turquesa
const h_P = pal({
  k: '#2a2436', kS: '#3e3450', blanco: '#fffdf6',
  cromo: '#eef4f8', cromoM: '#bccad4', cromoS: '#7e8e9c', cromoK: '#4c5a68',
  turq: '#3ab0a8', turqL: '#7ed8cc', turqS: '#22807e', turqK: '#16605e',
  rosa: '#f4a8b8', rosaL: '#fcd4dc', rosaS: '#d47a92', rosaK: '#a85670',
  menta: '#a8e0c8', mentaL: '#d4f4e6', mentaS: '#76b49c', mentaK: '#4e8a76',
  mante: '#f8e098', manteL: '#fff2c4', manteS: '#d8b866', manteK: '#a8864a',
  lila: '#c8b8e8', lilaL: '#e6def8', lilaS: '#9a88c4', lilaK: '#6e5e9a',
  celeste: '#a0d0f0', celesteL: '#d4ecfc', celesteS: '#72a2c8',
  melo: '#f8c8a0', meloL: '#fde2c6', meloS: '#d49a72', meloK: '#a8704e',
  ladr: '#ec9c94', ladrS: '#c87474', junta: '#f6d4c8',
  asfalto: '#a4acbc', asfaltoS: '#8e96a8', asfaltoL: '#bcc4d0', raya: '#f8f4e4',
  acera: '#e6decc', aceraS: '#c8bca6', aceraL: '#f6eedc',
  cristal: '#78c0d8', cristalL: '#cceef8', cristalS: '#4a88a8', interior: '#5a5878', interiorS: '#46445e',
  bruma: '#cfe6e4', brumaL: '#e4f0ea',
  rojo: '#ee6a6a', amar: '#f8d448', azul: '#5a86e6', verde: '#5ac884', naranja: '#f6964a', morado: '#a07ae0',
  madera: '#b08458', maderaL: '#d0a878', maderaS: '#7e5a3a', maderaK: '#5a3e28',
  tarima: '#d8c0a0', tarimaS: '#b49a78', tarimaL: '#ecd8bc',
  teja: '#e8b8a0', tejaS: '#c89480', tejaL: '#f6d4c0',
  sol: '#fff2b0', solL: '#fffce8', halo: '#fff4c8',
  portal0: '#0e1a5a', portal1: '#2a5ae0', portal2: '#62b8ff', portal3: '#d8f6ff',
  ojo: '#e8fbff', ojoH: '#8ae8ff', chispa: '#b8f0ff', aura: '#c8a0ff',
});

const h_ROPA = ['#e8708e', '#3ab0c8', '#f0c040', '#8a6ad8', '#4ec080', '#f08a4a', '#f4f0f6', '#4a72c0', '#e85a5a', '#7ad0c0'].map(hex);

const h_PIEL = ['#f6c8a0', '#e0a878', '#b07850', '#805030', '#f8dcc0'].map(hex);

const h_PELO = ['#3a2a1a', '#c8984a', '#1c1a24', '#8a4a2a', '#e8d4a0', '#5a3a2a'].map(hex);

// umbral del tramado ordenado 4 × 4 (transiciones limpias, sin ruido) y la mezcla de dos colores del lienzo
const h_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const h_umbral = (x, y) => h_BAYER[((y & 3) << 2) | (x & 3)];

function h_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la capa fija de cada encuadre: se pinta una vez en un búfer (con huecos VACÍO por donde se ve el cielo, que se mueve)
// y en cada fotograma se pega encima (una pasada)
const h_VACIO = 0x01020304;

const h_capas = new Map();

function h_capa(R, clave, dibuja) {
  let b = h_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(h_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); h_capas.set(clave, b); }
  return b;
}

function h_pegar(R, b, y0 = 0) { const B = R.buf; for (let i = y0 * 320; i < 57600; i++) { const c = b[i]; if (c !== h_VACIO) B[i] = c; } }

// un rectángulo que respeta R.recorte (R.rect no lo hace)
function h_rc(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(x0, y, x1, y, c); }

// la esquina de Atom y la barra del año: ahí no cae confeti ni pasa nada contrastado
const h_tranquila = (x, y) => (x > 274 && y < 48) || (y < 16 && x > 16 && x < 174);

// del gigante y salen estrellas; cirros casi quietos y cúmulos de tres tonos lejanos y cercanos a distinta velocidad
const h_CIELO_DIA = [[0, '#46b8d2'], [0.18, '#62c6da'], [0.38, '#88d4de'], [0.58, '#b2e2da'], [0.76, '#e4e6cc'], [0.9, '#fcdcc0']].map(([f, c]) => [f, hex(c)]);

const h_CIELO_GIG = ['#2c2260', '#46307e', '#6c4698', '#a466aa', '#e088a2', '#fab8a2'].map(hex);

const h_NUBE_DIA = ['#e2b0c6', '#fbe6ee', '#ffffff'].map(hex), h_NUBE_GIG = ['#62468a', '#a678b0', '#e2b2ce'].map(hex);

function h_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.66), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

function h_cielo(R, t, o = {}) {
  const hor = o.hor ?? 100, g = o.g ?? 0, B = R.buf, tr = 3, lim = h_CIELO_DIA.map(([f]) => Math.round(f * hor));
  const P = h_CIELO_DIA.map(([, c], i) => (g > 0 ? h_mezcla(c, h_CIELO_GIG[i], g) : c));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = h_umbral(x, y) < p ? b : a;
  }
  // con el gigante, el cielo se llena de estrellas que titilan (el cosmos se asoma)
  if (g > 0.25) for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 620) * 319), y = Math.round(h(k, 2, 620) ** 1.4 * hor * 0.6); if (h_tranquila(x, y) || h(k, 3, 620) > (g - 0.25) * 1.6) continue;
    const tw = Math.sin(t * (1.5 + h(k, 4, 620) * 2) + k); if (tw > -0.3) R.pset(x, y, tw > 0.5 ? h_P.blanco : hex('#a898d8')); }
  if (o.sol) h_sol(R, t, o.sol, g);
  if (o.nubes === false) return;
  const cn = [0, 1, 2].map((i) => (g > 0 ? h_mezcla(h_NUBE_DIA[i], h_NUBE_GIG[i], g) : h_NUBE_DIA[i]));
  // cirros: velos finos que apenas se mueven
  for (let k = 0; k < 4; k++) { const w = 36 + Math.round(h(k, 5, 621) * 50), x0 = ((h(k, 6, 621) * 440 + t * (0.6 + k * 0.25)) % 470) - 80, y = Math.max(20, Math.round(hor * (0.14 + k * 0.09)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || h_tranquila(x, y) || h(i >> 2, k, 622) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      R.pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) R.pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) R.pset(x - 4, y + 1, cn[0]); } }
  // cúmulos: los lejanos, pequeños y lentos; los cercanos, grandes y más rápidos
  const n = o.cumulos ?? 5, yc = o.yNubes ?? [0.3, 0.62];
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 12 : 14 + ((k * 7) % 9), v = cerca ? 3.4 + k * 1.3 : 1.2 + k * 0.3,
      y = Math.round(cerca ? hor * yc[0] + k * hor * 0.16 : hor * (yc[1] - (k - 2) * 0.12)), x = ((h(k, 7, 623) * 470 + t * v) % 500) - 90;
    h_nube(R, Math.round(x), y, w, k + (o.semilla ?? 0), cn); }
}

// el sol con su halo tramado; con g se apaga hacia el rosa (lo tapa el gigante)
function h_sol(R, t, [sx, sy, sr], g = 0) {
  const B = R.buf, R2 = sr + 12, gl = h_mezcla(h_P.halo, hex('#ffc0d8'), g);
  for (let y = Math.max(0, sy - R2); y <= Math.min(179, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
    const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (h_umbral(x, y) < q * q) B[y * 320 + x] = h_mezcla(B[y * 320 + x], gl, 0.45); }
  R.disco(sx, sy, sr + 1, h_mezcla(h_P.solL, hex('#ffd8e8'), g)); R.disco(sx, sy, sr, h_mezcla(h_P.sol, hex('#ffd0a0'), g)); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), h_P.solL);
}

// mano), o.globo (color del globo), o.sombrero, o.nino (un niño a hombros), o.dir; lleva un tono de ropa, piel y pelo por k
function h_persona(R, x, y, t, k, o = {}) {
  const { rect, pset, linea } = R, ropa = h_ROPA[k % h_ROPA.length], piel = h_PIEL[(k * 3 + 1) % h_PIEL.length], pelo = h_PELO[(k * 7 + 2) % h_PELO.length];
  const ropaS = h_mezcla(ropa, h_P.k, 0.3), pant = [hex('#3a4a6a'), hex('#5a4a3a'), hex('#4a4a56'), hex('#2e3a5a')][k % 4], G = o.g === 'grande';
  const sube = o.agita && Math.sin(t * (6 + (k % 3)) + k * 1.7) > -0.2, bote = o.agita ? Math.round(Math.max(0, Math.sin(t * 5 + k)) * (G ? 1 : 0.6)) : 0;
  y -= bote;
  if (!G) {
    pset(x - 1, y, pant); pset(x + 1, y, pant); pset(x - 1, y - 1, pant); pset(x + 1, y - 1, pant);
    rect(x - 2, y - 5, x + 2, y - 2, ropa); rect(x + 2, y - 5, x + 2, y - 2, ropaS); pset(x - 2, y - 2, ropaS);
    rect(x - 1, y - 8, x + 1, y - 6, piel); rect(x - 1, y - 9, x + 1, y - 9, pelo); pset(o.dir < 0 ? x + 1 : x - 1, y - 8, pelo);
    if (o.sombrero) { rect(x - 2, y - 9, x + 2, y - 9, o.sombrero); rect(x - 1, y - 11, x + 1, y - 10, o.sombrero); }
    if (sube) { pset(x + 3, y - 6, ropa); pset(x + 3, y - 7, piel); pset(x + 4, y - 8 + (Math.sin(t * 9 + k) > 0 ? 0 : 1), piel); } else { pset(x + 3, y - 4, ropa); pset(x + 3, y - 3, piel); }
    pset(x - 3, y - 4, ropaS); pset(x - 3, y - 3, piel);
    if (o.bandera) { const hx = sube ? x + 4 : x + 3, hy = sube ? y - 8 : y - 3, ond = Math.floor(t * 6 + k) % 2; linea(hx, hy, hx, hy - 6, h_P.cromoK); rect(hx + 1, hy - 6, hx + 3, hy - 5 + ond, o.bandera); pset(hx + 4, hy - 6 + ond, o.bandera); }
    if (o.globo) { const gx = x - 4 + Math.round(Math.sin(t * 1.3 + k) * 1.5), gy = y - 20; linea(x - 3, y - 3, gx, gy + 3, h_P.cromoS); R.disco(gx, gy, 3, o.globo); pset(gx - 1, gy - 1, h_P.blanco); pset(gx, gy + 3, o.globo); }
    if (o.nino) { const nr = h_ROPA[(k + 4) % h_ROPA.length], np = h_PIEL[(k + 2) % h_PIEL.length], ny = y - 10, nb = Math.sin(t * 7 + k) > 0;
      rect(x - 1, ny - 3, x + 1, ny, nr); pset(x - 2, ny, nr); pset(x + 2, ny, nr); rect(x - 1, ny - 5, x + 1, ny - 4, np); rect(x - 1, ny - 6, x + 1, ny - 6, h_PELO[(k + 3) % 6]);
      pset(x + 2, ny - 3 - (nb ? 2 : 0), np); pset(x - 2, ny - 3 - (nb ? 0 : 2), np); }
    return;
  }
  // 14 px
  rect(x - 2, y - 4, x - 1, y, pant); rect(x + 1, y - 4, x + 2, y, pant); rect(x - 2, y, x - 1, y, h_P.k); rect(x + 1, y, x + 2, y, h_P.k);
  rect(x - 3, y - 9, x + 3, y - 5, ropa); rect(x + 2, y - 9, x + 3, y - 5, ropaS); rect(x - 3, y - 5, x + 3, y - 5, ropaS);
  rect(x - 2, y - 13, x + 2, y - 10, piel); rect(x - 2, y - 14, x + 2, y - 14, pelo); pset(x - 3, y - 13, pelo); pset(x + 3, y - 13, pelo); pset(x - 3, y - 12, pelo);
  pset(x - 1, y - 12, h_P.k); pset(x + 1, y - 12, h_P.k); if (o.agita) pset(x, y - 10, hex('#c05050'));
  if (o.sombrero) { rect(x - 4, y - 14, x + 4, y - 14, o.sombrero); rect(x - 2, y - 17, x + 2, y - 15, o.sombrero); rect(x - 2, y - 15, x + 2, y - 15, h_mezcla(o.sombrero, h_P.k, 0.4)); }
  if (sube) { const ax = x + 5, ay = y - 15 + (Math.sin(t * 9 + k) > 0 ? 0 : 1); linea(x + 3, y - 8, ax, ay + 2, ropa); rect(ax - 1, ay, ax, ay + 1, piel); }
  else { linea(x + 3, y - 8, x + 4, y - 5, ropa); pset(x + 4, y - 4, piel); }
  linea(x - 3, y - 8, x - 4, y - 5, ropaS); pset(x - 4, y - 4, piel);
  if (o.bandera) { const hx = sube ? x + 5 : x + 4, hy = sube ? y - 15 : y - 4, ond = Math.floor(t * 6 + k) % 2; linea(hx, hy, hx, hy - 8, h_P.cromoK); rect(hx + 1, hy - 8, hx + 5, hy - 6 + ond, o.bandera); rect(hx + 1, hy - 8, hx + 5, hy - 8, h_mezcla(o.bandera, h_P.blanco, 0.4)); pset(hx + 6, hy - 7 + ond, o.bandera); }
  if (o.globo) { const gx = x - 6 + Math.round(Math.sin(t * 1.3 + k) * 2), gy = y - 28; linea(x - 4, y - 5, gx, gy + 4, h_P.cromoS); R.disco(gx, gy, 4, o.globo); R.disco(gx - 1, gy - 1, 1, h_mezcla(o.globo, h_P.blanco, 0.6)); pset(gx, gy + 4, o.globo); pset(gx, gy + 5, o.globo); }
  if (o.nino) { const nr = h_ROPA[(k + 4) % h_ROPA.length], np = h_PIEL[(k + 2) % h_PIEL.length], ny = y - 14, nb = Math.sin(t * 7 + k) > 0;
    rect(x - 2, ny - 4, x + 2, ny, nr); rect(x - 4, ny - 1, x - 3, ny, nr); rect(x + 3, ny - 1, x + 4, ny, nr); rect(x - 2, ny - 7, x + 2, ny - 5, np); rect(x - 2, ny - 8, x + 2, ny - 8, h_PELO[(k + 3) % 6]);
    pset(x - 1, ny - 6, h_P.k); pset(x + 1, ny - 6, h_P.k); linea(x + 2, ny - 3, x + 4, ny - 6 - (nb ? 2 : 0), nr); linea(x - 2, ny - 3, x - 4, ny - 6 - (nb ? 0 : 2), nr); }
}

// ventanas, bandas de cromo y remate: 'antena', 'cupula' (cúpula de cristal), 'aguja' (aguja con anillos), 'escalon'
function h_torre(R, x, w, top, base, col, tipo, k, bru = 0.45) {
  const { rect, pset, linea, disco } = R, c = h_mezcla(col, h_P.bruma, bru), cS = h_mezcla(c, h_P.kS, 0.18), cL = h_mezcla(c, h_P.blanco, 0.3), v = h_mezcla(c, h_P.cristalS, 0.35), vL = h_mezcla(c, h_P.blanco, 0.5);
  let y0 = top;
  if (tipo === 'escalon') { rect(x + 3, top, x + w - 4, top + 8, c); rect(x + w - 6, top, x + w - 4, top + 8, cS); y0 = top + 8; }
  rect(x, y0, x + w - 1, base, c); rect(x + w - Math.max(3, w >> 2), y0, x + w - 1, base, cS); rect(x, y0, x, base, cL);
  for (let yy = y0 + 3; yy < base - 1; yy += 4) for (let xx = x + 2; xx < x + w - 2; xx += 3) pset(xx, yy, h(xx, yy, k) < 0.18 ? vL : xx > x + w - (w >> 2) - 1 ? h_mezcla(v, h_P.kS, 0.15) : v);
  for (let yy = y0 + 12; yy < base; yy += 13) rect(x, yy, x + w - 1, yy, cL);
  const mx = x + (w >> 1);
  if (tipo === 'antena') { linea(mx, y0 - 1, mx, y0 - 14, cS); rect(mx - 3, y0 - 9, mx + 3, y0 - 9, cS); rect(mx - 2, y0 - 12, mx + 2, y0 - 12, cS); }
  else if (tipo === 'cupula') { disco(mx, y0, (w >> 1) - 1, h_mezcla(h_P.cristalL, h_P.bruma, bru)); for (let i = -(w >> 1) + 2; i < (w >> 1) - 1; i += 3) linea(mx + i, y0, mx + Math.round(i * 0.4), y0 - (w >> 1) + 2, h_mezcla(h_P.cromoS, h_P.bruma, bru)); rect(x, y0, x + w - 1, y0 + 1, cL); }
  else if (tipo === 'aguja') { for (let j = 0; j < 22; j++) { const a = Math.max(0, Math.round((22 - j) / 7)); rect(mx - a, y0 - j, mx + a, y0 - j, j % 6 === 3 ? cL : cS); } }
}

// la torre-platillo de los sesenta: el fuste con su ascensor de cristal y el platillo con su anillo de ventanas
function h_torrePlatillo(R, cx, top, base, bru = 0.35) {
  const { rect, pset, linea } = R, m = (c) => h_mezcla(c, h_P.bruma, bru);
  for (const dx of [-3, 3]) linea(cx + dx, base, cx + Math.sign(dx), top + 6, m(h_P.cromoS));
  rect(cx - 1, top + 6, cx + 1, base, m(h_P.cromoM)); pset(cx, top + 6, m(h_P.cromo));
  for (let y = top + 12; y < base; y += 6) linea(cx - 2, y, cx + 2, y, m(h_P.cromoS));
  for (let j = -4; j <= 4; j++) { const a = Math.round(Math.sqrt(1 - (j / 4.6) ** 2) * 16); rect(cx - a, top + j, cx + a, top + j, m(j < -1 ? h_P.turqL : j < 2 ? h_P.cromo : h_P.cromoS)); }
  for (let i = -13; i <= 13; i += 3) pset(cx + i, top, m(h_P.cristalS)); rect(cx - 16, top + 1, cx + 16, top + 1, m(h_P.cromoM));
  for (let j = 1; j < 4; j++) rect(cx - 6 + j, top - 4 - j, cx + 6 - j, top - 4 - j, m(h_P.turq)); linea(cx, top - 8, cx, top - 14, m(h_P.cromoS));
}

// una ventana de fachada: marco, cristal con el reflejo del cielo en diagonal, parteluz, alféizar con su sombra, a veces
// cortinas pastel o una maceta. Devuelve el hueco [x0, y0, x1, y1] (para gente que se asoma)
function h_ventana(R, x0, y0, w, alto, marco, k) {
  const { rect, pset } = R, mS = h_mezcla(marco, h_P.k, 0.3);
  rect(x0 - 1, y0 - 1, x0 + w, y0 + alto, mS); rect(x0, y0, x0 + w - 1, y0 + alto - 1, marco);
  const gx0 = x0 + 1, gy0 = y0 + 1, gx1 = x0 + w - 2, gy1 = y0 + alto - 2;
  for (let y = gy0; y <= gy1; y++) for (let x = gx0; x <= gx1; x++) { const d = (x - gx0) + (y - gy0) * 0.8, f = (y - gy0) / (gy1 - gy0 + 1);
    pset(x, y, (d % 9) < 2 && f < 0.7 ? h_P.cristalL : f > 0.55 ? h_P.interior : h_umbral(x, y) < 0.3 ? h_P.cristalL : h_P.cristal); }
  const cort = h(k, 3, 630); if (cort < 0.5) { const cc = [h_P.rosaL, h_P.manteL, h_P.mentaL, h_P.lilaL][k % 4]; for (let y = gy0; y <= gy1; y++) { const a = Math.round(2 + (y - gy0) * 0.15); rect(gx0, y, gx0 + a - 1, y, cc); rect(gx1 - a + 1, y, gx1, y, cc); pset(gx0 + a - 1, y, h_mezcla(cc, h_P.k, 0.15)); } }
  rect(x0 + (w >> 1), gy0, x0 + (w >> 1), gy1, marco);
  rect(x0 - 2, y0 + alto, x0 + w + 1, y0 + alto + 1, h_P.blanco); rect(x0 - 2, y0 + alto + 2, x0 + w + 1, y0 + alto + 2, mS);
  if (h(k, 4, 630) < 0.3) { const px = x0 + 2 + Math.round(h(k, 5, 630) * (w - 6)); rect(px, y0 + alto - 3, px + 3, y0 + alto - 1, h_P.naranja); rect(px, y0 + alto - 6, px + 3, y0 + alto - 4, h_P.verde); pset(px + 1, y0 + alto - 7, h_P.rosa); }
  return [gx0, gy0, gx1, gy1];
}

// alguien asomado a un hueco de ventana que saluda y tira confeti (recortado al hueco)
function h_vecino(R, t, [x0, y0, x1, y1], k) {
  const x = Math.round((x0 + x1) / 2 + Math.sin(t * 0.7 + k) * 2), y = y1 + 1, ropa = h_ROPA[(k + 2) % h_ROPA.length], piel = h_PIEL[k % h_PIEL.length], pelo = h_PELO[(k + 1) % 6];
  R.recorte([x0, y0, x1, y1]);
  h_rc(R, x - 3, y - 5, x + 3, y, ropa); h_rc(R, x - 2, y - 9, x + 2, y - 6, piel); h_rc(R, x - 2, y - 10, x + 2, y - 10, pelo); R.pset(x - 3, y - 9, pelo); R.pset(x - 1, y - 8, h_P.k); R.pset(x + 1, y - 8, h_P.k);
  const s = Math.sin(t * 7 + k * 2) > 0; R.linea(x + 3, y - 4, x + 5, y - 9 - (s ? 1 : 0), ropa); R.pset(x + 5, y - 10 - (s ? 1 : 0), piel);
  R.recorte(null);
  // el puñado de confeti que tira, que cae hacia la calle
  const u = ((t * 0.6 + h(k, 9, 631)) % 1); if (u < 0.6) for (let i = 0; i < 6; i++) { const cx = x + 5 + Math.round(u * 10 * (h(i, k, 632) - 0.3)), cy = y - 10 + Math.round(u * u * 50 + i * 2 * u); if (!h_tranquila(cx, cy)) R.pset(cx, cy, h_ROPA[(i + k) % h_ROPA.length]); }
}

// cromo, con pasajeros en las ventanillas; s = 1 cerca, 0.6 lejos; va a v px/s y vuelve a pasar cada ciclo
function h_viga(R, y, x0, x1, pilares, bru = 0) {
  const { rect, pset } = R, m = (c) => h_mezcla(c, h_P.bruma, bru);
  rect(x0, y, x1, y + 4, m(h_P.cromoM)); rect(x0, y, x1, y, m(h_P.cromo)); rect(x0, y + 4, x1, y + 5, m(h_P.cromoS)); rect(x0, y + 6, x1, y + 6, m(h_P.turqS));
  for (let x = x0; x <= x1; x += 8) pset(x, y + 2, m(h_P.cromoS));
  for (const px of pilares) { rect(px - 2, y + 7, px + 2, 179, m(h_P.cromoM)); rect(px + 1, y + 7, px + 2, 179, m(h_P.cromoS)); rect(px - 6, y + 6, px + 6, y + 8, m(h_P.cromoS)); rect(px - 5, y + 6, px + 5, y + 6, m(h_P.cromo)); }
}

function h_tren(R, t, y, o = {}) {
  const { pset } = R, s = o.s ?? 1, v = o.v ?? 34, L = Math.round(34 * s), alto = Math.round(12 * s), ciclo = (360 + 3 * L) / v + (o.pausa ?? 3), u = ((t + (o.fase ?? 0)) % ciclo) * v, xc = Math.round(o.dir < 0 ? 330 - u + 3 * L : u - 3 * L - 10);
  const bru = o.bru ?? 0, m = (c) => (bru ? h_mezcla(c, h_P.bruma, bru) : c);
  if (o.clip) R.recorte(o.clip);
  for (let c = 0; c < 3; c++) { const x0 = xc + c * (L + 1), x1 = x0 + L - 1, y0 = y - alto;
    h_rc(R, x0, y0 + 2, x1, y - 1, m(hex('#f6eedc'))); h_rc(R, x0 + 1, y0 + 1, x1 - 1, y0 + 1, m(hex('#f6eedc'))); h_rc(R, x0 + 2, y0, x1 - 2, y0, m(h_P.cromoM));
    h_rc(R, x0, y - Math.round(4 * s), x1, y - Math.round(2 * s), m(h_P.turq)); h_rc(R, x0, y - 1, x1, y, m(h_P.cromoS));
    const vy = y0 + Math.round(3 * s); for (let w = x0 + 3; w + Math.round(4 * s) < x1 - 1; w += Math.round(6 * s)) { h_rc(R, w, vy, w + Math.round(4 * s), vy + Math.round(3 * s), m(h_P.cristalS)); pset(w, vy, m(h_P.cristalL));
      if (h(w - xc, c, 640) < 0.6) { pset(w + 2, vy + Math.round(2 * s), m(h_PIEL[(w + c) % 5])); if (s > 0.8) pset(w + 2, vy + 1, m(h_PELO[(w + c) % 6])); } }
    if (c === 2 || c === 0) { const nx = c === 2 ? x1 : x0, d = c === 2 ? 1 : -1; for (let j = 0; j < alto; j++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - ((j - alto * 0.55) / (alto * 0.6)) ** 2)) * 6 * s); h_rc(R, Math.min(nx, nx + a * d), y0 + j, Math.max(nx, nx + a * d), y0 + j, m(j < alto * 0.45 ? h_P.cristalL : h_P.cromo)); } }
  }
  R.recorte(null);
}

function h_robotin(R, x, y, t, k, paso) {
  const { rect, pset, linea, disco } = R, b = Math.round(Math.abs(Math.sin(t * 6 + k)) * 1), p = paso ? Math.round(Math.sin(t * 6 + k)) : 0, cu = [h_P.rosa, h_P.turq, h_P.mante][k % 3];
  y -= b;
  rect(x - 3 + p, y - 3, x - 2 + p, y, h_P.cromoS); rect(x + 2 - p, y - 3, x + 3 - p, y, h_P.cromoS); rect(x - 4 + p, y, x - 1 + p, y, h_P.k); rect(x + 1 - p, y, x + 4 - p, y, h_P.k);
  rect(x - 4, y - 10, x + 4, y - 4, h_P.cromoM); rect(x - 4, y - 10, x - 3, y - 4, h_P.cromo); rect(x + 3, y - 10, x + 4, y - 4, h_P.cromoS); rect(x - 2, y - 8, x + 2, y - 6, cu); pset(x - 1, y - 7, Math.sin(t * 5 + k) > 0 ? h_P.rojo : h_P.amar);
  rect(x - 3, y - 16, x + 3, y - 11, h_P.cromoM); rect(x - 3, y - 16, x - 2, y - 11, h_P.cromo); rect(x - 2, y - 14, x + 2, y - 13, h_P.k); pset(x - 1, y - 14, h_P.ojoH); pset(x + 1, y - 14, h_P.ojoH); rect(x - 1, y - 12, x + 1, y - 12, h_P.cromoS);
  linea(x, y - 17, x, y - 19, h_P.cromoS); pset(x, y - 20, Math.floor(t * 3 + k) % 2 ? h_P.rojo : h_P.amar);
  const tipo = k % 3;
  if (tipo === 0) { disco(x + 6, y - 6, 3, h_P.rojo); rect(x + 4, y - 7, x + 8, y - 7, h_P.blanco); const g = Math.sin(t * 12 + k) > 0; linea(x + 4, y - 10, x + 6 + (g ? 1 : -1), y - 10 - (g ? 2 : 0), h_P.cromoS); }
  else if (tipo === 1) { linea(x + 4, y - 11, x + 8, y - 13, h_P.amar); rect(x + 8, y - 15, x + 9, y - 11, h_P.amar); pset(x + 10, y - 13, h_P.manteL); if (Math.sin(t * 8 + k) > 0.3) { pset(x + 12, y - 15, h_P.blanco); pset(x + 13, y - 17, h_P.blanco); } }
  else { const o2 = Math.floor(t * 5 + k) % 2; linea(x + 5, y - 6, x + 5, y - 20, h_P.cromoS); rect(x + 6, y - 20, x + 11, y - 17 + o2, h_P.turq); rect(x + 6, y - 20, x + 11, y - 20, h_P.turqL); }
}

function h_coche(R, x, y, t, col, dir = 1, giro = 0, conductor = true) {
  const { rect, pset, linea, disco, poligono } = R, X = (i) => x + i * dir, cS = h_mezcla(col, h_P.k, 0.25), cL = h_mezcla(col, h_P.blanco, 0.4);
  // la sombra, la carrocería con su moldura de cromo, las aletas de atrás y el parabrisas
  rect(x - 22, y + 1, x + 22, y + 2, h_mezcla(h_P.asfalto, h_P.k, 0.25));
  poligono([[X(-22), y - 3], [X(-22), y - 9], [X(-16), y - 15], [X(-14), y - 10], [X(18), y - 10], [X(22), y - 7], [X(22), y - 3]], col);
  linea(X(-21), y - 9, X(-16), y - 14, cL); linea(X(-14), y - 10, X(17), y - 10, cL); rect(Math.min(X(-21), X(21)), y - 6, Math.max(X(-21), X(21)), y - 6, h_P.cromo); rect(Math.min(X(-22), X(22)), y - 4, Math.max(X(-22), X(22)), y - 3, cS);
  rect(Math.min(X(21), X(23)), y - 7, Math.max(X(21), X(23)), y - 3, h_P.cromoM); rect(Math.min(X(-23), X(-21)), y - 7, Math.max(X(-23), X(-21)), y - 3, h_P.cromoM); pset(X(22), y - 8, h_P.manteL); pset(X(-21), y - 8, h_P.rojo);
  linea(X(6), y - 10, X(10), y - 15, h_P.cromoS); linea(X(7), y - 10, X(11), y - 15, h_P.cristalL); rect(Math.min(X(-12), X(4)), y - 12, Math.max(X(-12), X(4)), y - 11, h_mezcla(h_P.rojo, h_P.blanco, 0.3));
  if (conductor) { rect(Math.min(X(1), X(4)), y - 17, Math.max(X(1), X(4)), y - 14, h_PIEL[1]); rect(Math.min(X(1), X(4)), y - 18, Math.max(X(1), X(4)), y - 18, h_PELO[0]); const s = Math.sin(t * 6) > 0; linea(X(-1), y - 13, X(-3), y - 19 - (s ? 1 : 0), h_ROPA[3]); pset(X(-3), y - 20 - (s ? 1 : 0), h_PIEL[1]); }
  for (const dx of [-13, 13]) { const wx = X(dx); disco(wx, y - 1, 4, h_P.k); disco(wx, y - 1, 3, h_P.blanco); disco(wx, y - 1, 2, h_P.cromoS); pset(wx + Math.round(Math.cos(giro) * 2), y - 1 + Math.round(Math.sin(giro) * 2), h_P.k); pset(wx, y - 1, h_P.cromo); }
}

// la carroza: cubierta crema, falda turquesa plisada con moldura de cromo y estrellas, festón rosa y blanco que ondea, el
// cohete de cromo en la proa (humo pastel que sale de las toberas), la estrella atómica con un 4 en la popa, globos atados
// y ruedas que asoman. (cx, cub) = centro y altura de la cubierta; w = ancho; alto = alto de la falda
function h_carroza(R, t, cx, cub, w, alto, o = {}) {
  const { rect, pset, linea, disco } = R, x0 = Math.round(cx - w / 2), x1 = x0 + w - 1, g = o.g ?? 1, giro = o.giro ?? 0, cuatro = o.cuatro !== false;
  // la sombra en el asfalto y las ruedas
  for (let x = x0 - 4; x <= x1 + 6; x++) for (let j = 0; j < 3; j++) if (h_umbral(x, cub + alto + 4 + j) < 0.7 - j * 0.2) pset(x, cub + alto + 4 + j, h_mezcla(h_P.asfalto, h_P.k, 0.35));
  for (const fx of [0.16, 0.84]) { const wx = Math.round(x0 + w * fx), r = Math.round(4 + g * 2); disco(wx, cub + alto + 2, r, h_P.k); disco(wx, cub + alto + 2, r - 1, h_P.cromoK); disco(wx, cub + alto + 2, r - 3, h_P.cromoM); for (let a = 0; a < 3; a++) { const an = giro + a * 2.09; pset(wx + Math.round(Math.cos(an) * (r - 2)), cub + alto + 2 + Math.round(Math.sin(an) * (r - 2)), h_P.k); } }
  // la falda plisada con su luz (de arriba a la izquierda) y la moldura
  for (let y = cub + 3; y <= cub + alto; y++) for (let x = x0; x <= x1; x++) { const pl = (x - x0) % 4, f = (y - cub) / alto; let c = pl === 0 ? h_P.turqS : pl === 1 ? h_P.turqL : h_P.turq; if (f > 0.75 && h_umbral(x, y) < (f - 0.75) * 3) c = h_P.turqS; if (x > x1 - 3) c = h_P.turqS; if (x < x0 + 2) c = h_P.turqL; pset(x, y, c); }
  rect(x0 - 1, cub + alto - 1, x1 + 1, cub + alto + 1, h_P.cromoS); rect(x0 - 1, cub + alto - 1, x1 + 1, cub + alto - 1, h_P.cromo);
  for (let x = x0 + 10; x < x1 - 6; x += Math.round(18 * g)) { const sy = cub + Math.round(alto * 0.6), s = g > 1.4 ? 2 : 1; rect(x - s, sy - s * 2, x + s - 1 + (s > 1 ? 1 : 0), sy + s * 2, h_P.blanco); rect(x - s * 2, sy - s + 1, x + s * 2, sy + s - 1, h_P.blanco); pset(x, sy, h_P.manteL); }
  // la cubierta y su canto de cromo
  rect(x0 - 2, cub, x1 + 2, cub + 2, h_P.cromoM); rect(x0 - 2, cub, x1 + 2, cub, h_P.blanco); rect(x0 - 2, cub + 2, x1 + 2, cub + 2, h_P.cromoS);
  for (let x = x0; x < x1; x += 7) pset(x, cub + 1, h_P.cromo);
  // el festón que cuelga del canto y ondea
  const fw = Math.round(8 * g), fa = Math.round(3 * g);
  for (let x = x0; x <= x1; x++) { const i = (x - x0) % fw, n = Math.floor((x - x0) / fw), d = Math.round(Math.sin(i / fw * Math.PI) * fa + Math.sin(t * 3 + n) * 0.6), c = n % 2 ? h_P.rosa : h_P.blanco;
    for (let j = 3; j <= 3 + d; j++) pset(x, cub + j, j === 3 + d ? h_mezcla(c, h_P.k, 0.2) : c); }
  // la estrella atómica de la popa, con su mástil, sus órbitas y el 4
  const ex = x0 + Math.round(18 * g), ey = cub - Math.round(26 * g), er = Math.round(12 * g);
  rect(ex - 1, ey, ex + 1, cub, h_P.cromoS); rect(ex - 1, ey, ex - 1, cub, h_P.cromo);
  for (let a = 0; a < 12; a++) { const an = a / 12 * Math.PI * 2 + Math.sin(t * 0.8) * 0.05, l = a % 2 ? er : er * 1.5; linea(ex, ey, ex + Math.round(Math.cos(an) * l), ey + Math.round(Math.sin(an) * l), a % 2 ? h_P.manteS : h_P.cromoM); disco(ex + Math.round(Math.cos(an) * l), ey + Math.round(Math.sin(an) * l), g > 1.4 ? 2 : 1, a % 3 === 0 ? h_P.rosa : a % 3 === 1 ? h_P.turqL : h_P.mante); }
  for (let k = 0; k < 2; k++) for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2, rx = er * 1.15, ry = er * 0.42, rot = (k ? 0.7 : -0.7), px = Math.cos(an) * rx, py = Math.sin(an) * ry; pset(ex + Math.round(px * Math.cos(rot) - py * Math.sin(rot)), ey + Math.round(px * Math.sin(rot) + py * Math.cos(rot)), h_P.turqS); }
  { const an = t * 2.4, px = Math.cos(an) * er * 1.15, py = Math.sin(an) * er * 0.42; disco(ex + Math.round(px * Math.cos(0.7) - py * Math.sin(0.7)), ey + Math.round(px * Math.sin(0.7) + py * Math.cos(0.7)), 1, h_P.rojo); }
  { const rr = er * 0.8, pts = [], pi = []; for (let a = 0; a < 10; a++) { const an = -Math.PI / 2 + a * Math.PI / 5, l = a % 2 ? rr * 0.5 : rr; pts.push([ex + Math.cos(an) * (l + 1), ey + Math.sin(an) * (l + 1)]); pi.push([ex + Math.cos(an) * l, ey + Math.sin(an) * l]); }
    R.poligono(pts, h_P.k); R.poligono(pi, h_P.blanco); R.poligono(pi.map(([px, py]) => [px + (px - ex) * -0.2 + 1, py + (py - ey) * -0.2 + 1]), h_P.manteL); }
  if (cuatro) R.numero('4', ex + 1, ey + (g > 1.4 ? 4 : 4), { color: h_P.turqS, centro: true, sombra: false });
  // el cohete de cromo de la proa: cuerpo, ojo de buey, aletas, punta rosa y humo pastel
  const rx = x1 - Math.round(12 * g), rTop = cub - Math.round(40 * g), rw = Math.round(7 * g);
  for (let y = rTop; y < cub; y++) { const f = (y - rTop) / (cub - rTop), a = f < 0.3 ? Math.round(rw * Math.sqrt(f / 0.3)) : f > 0.85 ? Math.round(rw * (1 - (f - 0.85) * 1.5)) : rw;
    for (let x = rx - a; x <= rx + a; x++) { const u = (x - rx + a) / (2 * a + 1); pset(x, y, f < 0.28 ? (u < 0.35 ? h_P.rosaL : u > 0.75 ? h_P.rosaS : h_P.rosa) : u < 0.25 ? h_P.blanco : u > 0.78 ? h_P.cromoS : u > 0.6 ? h_P.cromoM : h_P.cromo); }
    pset(rx - a - 1, y, h_P.cromoK); pset(rx + a + 1, y, h_P.cromoK); }
  rect(rx - rw, rTop + Math.round((cub - rTop) * 0.3), rx + rw, rTop + Math.round((cub - rTop) * 0.3), h_P.turq);
  { const py = rTop + Math.round((cub - rTop) * 0.5), pr = Math.round(3 * g); disco(rx, py, pr + 1, h_P.cromoK); disco(rx, py, pr, h_P.cristal); pset(rx - 1, py - 1, h_P.cristalL); pset(rx - pr + 1, py, h_P.cristalL); }
  for (const d of [-1, 1]) { const fx = rx + d * rw, fy = cub - Math.round(14 * g); R.poligono([[fx, fy], [fx + d * Math.round(7 * g), cub - 1], [fx, cub - 1]], h_P.turq); linea(fx, fy, fx + d * Math.round(7 * g), cub - 1, h_P.turqS); }
  for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + i / 6) % 1), sx = rx + Math.round(-u * 26 * g - 4), sy = cub - Math.round(4 * g) - Math.round(u * 18 * g + Math.sin(t * 2 + i) * 2), r = Math.max(1, Math.round((1 + u * 3) * g * 0.8));
    disco(sx, sy, r, h_mezcla(h_P.blanco, [h_P.rosaL, h_P.mentaL, h_P.lilaL][i % 3], 0.5 + u * 0.3)); if (r > 1) pset(sx - 1, sy - 1, h_P.blanco); }
  // los globos atados a las esquinas, que se mecen
  for (const [bx, k] of [[x0 + 4, 0], [x0 + Math.round(36 * g), 1], [x1 - Math.round(26 * g), 2]]) { const gx = bx + Math.round(Math.sin(t * 1.4 + k * 2) * 3 * g), gy = cub - Math.round((34 + k * 6) * g), r = Math.round(3 * g + 1), c = [h_P.rosa, h_P.mante, h_P.lila][k];
    linea(bx, cub, gx, gy + r, h_P.cromoS); disco(gx, gy, r, h_mezcla(c, h_P.k, 0.15)); disco(gx - 1, gy - 1, r - 1, c); pset(gx - Math.round(r / 2), gy - Math.round(r / 2), h_P.blanco); pset(gx, gy + r, c); }
  return { x0, x1, cubierta: cub };
}

// el confeti que cae (por detrás o, llamándola después de los actores, por delante): papelitos de colores que giran
// (cambian de 2 px a 1 px) y serpentinas que bajan ondulando. o.n (60); o.y0/o.y1 (franja); o.semilla
export function h_confeti(R, t, o = {}) {
  const n = o.n ?? 60, y0 = o.y0 ?? -10, y1 = o.y1 ?? 180, sem = o.semilla ?? 0, H = y1 - y0 + 10;
  for (let k = 0; k < n; k++) { const v = 12 + h(k, 2, 650 + sem) * 14, x = Math.round(((h(k, 1, 650 + sem) * 360 + Math.sin(t * 1.6 + k) * 5 + t * 4) % 340) - 10), y = Math.round(y0 + ((h(k, 3, 650 + sem) * H + t * v) % H));
    if (h_tranquila(x, y)) continue; const c = h_ROPA[k % h_ROPA.length], gira = Math.sin(t * 7 + k * 1.3);
    R.pset(x, y, c); if (gira > 0.2) R.pset(x + 1, y, c); else if (gira < -0.6) R.pset(x, y + 1, h_mezcla(c, h_P.k, 0.25)); }
  for (let k = 0; k < Math.round(n / 15); k++) { const x = Math.round(((h(k, 5, 651 + sem) * 330 + t * 3) % 340) - 10), yb = Math.round(y0 + ((h(k, 6, 651 + sem) * H + t * 10) % H)), c = h_ROPA[(k + 3) % h_ROPA.length];
    for (let j = 0; j < 9; j++) { const xx = x + Math.round(Math.sin(j * 0.9 + t * 3 + k) * 2), yy = yb - j; if (!h_tranquila(xx, yy)) R.pset(xx, yy, c); } }
}

// los edificios de la fila de la avenida: [x0, x1, tejado, color, luz, sombra, tipo]
const h_FILA = () => [[0, 58, 78, h_P.ladr, h_P.junta, h_P.ladrS, 'ladrillo'], [58, 118, 70, h_P.menta, h_P.mentaL, h_P.mentaS, 'bandas'], [118, 186, 84, h_P.mante, h_P.manteL, h_P.manteS, 'arcos'],
  [186, 250, 74, h_P.lila, h_P.lilaL, h_P.lilaS, 'cristal'], [250, 320, 80, h_P.melo, h_P.meloL, h_P.meloS, 'incendios']];

// las ventanas de la avenida en las que se asoma un vecino (las calcula la capa)
let h_huecosAv = [];

function h_capaAvenida(R) {
  const { rect, pset, linea, disco } = R; h_huecosAv = [];
  // los rascacielos lejanos entre la bruma, la torre-platillo y la viga del monorraíl
  const T0 = [[0, 18, 52, h_P.celeste, 'escalon'], [16, 14, 40, h_P.lila, 'antena'], [30, 22, 58, h_P.rosa, ''], [50, 16, 34, h_P.menta, 'cupula'], [64, 20, 48, h_P.mante, 'escalon'], [84, 12, 32, h_P.celeste, 'aguja'],
    [94, 26, 54, h_P.melo, ''], [118, 18, 40, h_P.turqL, 'antena'], [134, 22, 60, h_P.lila, 'escalon'], [154, 16, 36, h_P.rosa, 'cupula'], [168, 24, 50, h_P.menta, ''], [190, 12, 30, h_P.mante, 'aguja'],
    [200, 20, 56, h_P.celeste, 'antena'], [252, 18, 54, h_P.rosa, 'escalon'], [268, 22, 66, h_P.menta, ''], [288, 16, 56, h_P.lila, 'cupula'], [302, 18, 62, h_P.mante, '']];
  for (const [x, w, top, c, tipo] of T0) h_torre(R, x, w, top, 100, c, tipo, x, 0.55);
  h_torrePlatillo(R, 236, 50, 100, 0.4);
  h_viga(R, 58, 0, 319, [24, 104, 184, 264], 0.15);
  // la fila de la avenida
  for (const [x0, x1, top, c, cL, cS, tipo] of h_FILA()) {
    for (let y = top; y < 124; y++) for (let x = x0; x < x1; x++) { let col = c;
      if (tipo === 'ladrillo') { const f = ((y - top) / 3) | 0, j = (y - top) % 3 === 2 || (x + (f % 2) * 4) % 8 === 0; col = j ? cL : h(x >> 3, f, 660) < 0.12 ? cS : c; }
      else if (tipo === 'bandas') col = (y - top) % 12 === 0 ? h_P.cromo : (y - top) % 12 === 1 ? h_P.cromoS : h_umbral(x, y) < 0.08 ? cL : c;
      else if (tipo === 'arcos') col = (y - top) % 4 === 0 && h(x >> 2, y, 661) < 0.4 ? cS : h_umbral(x, y) < 0.06 ? cL : c;
      else if (tipo === 'cristal') col = (x - x0) % 8 === 0 ? h_P.cromoM : (y - top) % 10 === 0 ? h_P.cromoS : c;
      else col = (y - top) % 3 === 2 || (x + (((y - top) / 3) | 0) % 2 * 3) % 6 === 0 ? cS : h(x >> 2, y, 662) < 0.08 ? cL : c;
      if (x >= x1 - 3) col = h_mezcla(col, h_P.kS, 0.18); if (x === x0) col = cL;
      pset(x, y, col); }
    // la cornisa con su sombra y el remate del tejado
    rect(x0, top - 2, x1 - 1, top, h_P.blanco); rect(x0, top + 1, x1 - 1, top + 1, cS); for (let x = x0 + 2; x < x1; x += 4) pset(x, top + 2, h_mezcla(cS, h_P.k, 0.15));
    // ventanas de las plantas
    const ancho = x1 - x0, nv = Math.max(2, Math.round(ancho / 20)), wv = tipo === 'cristal' ? 10 : 11;
    for (let p = 0; p < 2; p++) for (let i = 0; i < nv; i++) { const vx = x0 + Math.round((i + 0.5) * ancho / nv - wv / 2), vy = top + 6 + p * 14; if (vy + 10 > 102) continue;
      const hue = h_ventana(R, vx, vy, wv, tipo === 'arcos' ? 10 : 9, tipo === 'arcos' ? h_P.manteL : h_P.blanco, x0 + i * 7 + p);
      if (tipo === 'arcos') for (let j = 0; j < 3; j++) { const a = Math.round(Math.sqrt(1 - ((3 - j) / 3.4) ** 2) * (wv / 2)); rect(vx + (wv >> 1) - a, vy - 3 + j, vx + (wv >> 1) + a - 1, vy - 3 + j, h_P.manteL); }
      if ((i + p + x0) % 3 === 0) h_huecosAv.push(hue); }
    // el toldo a rayas y el escaparate de la planta baja
    const ac = [h_P.rosa, h_P.turq, h_P.rojo, h_P.menta, h_P.azul][(x0 / 58) | 0];
    for (let y = 104; y <= 109; y++) for (let x = x0 + 2; x < x1 - 2; x++) { const rr = ((x - x0) >> 2) % 2; pset(x, y, y === 109 ? h_mezcla(rr ? ac : h_P.blanco, h_P.k, 0.25) : rr ? ac : h_P.blanco); }
    for (let x = x0 + 2; x < x1 - 2; x += 4) { pset(x + 1, 110, ((x - x0) >> 2) % 2 ? ac : h_P.blanco); pset(x + 2, 110, ((x - x0) >> 2) % 2 ? ac : h_P.blanco); }
    rect(x0 + 3, 111, x1 - 4, 123, h_P.cromoS); rect(x0 + 4, 111, x1 - 5, 122, h_P.interiorS);
    for (let x = x0 + 4; x < x1 - 5; x++) for (let y = 111; y <= 122; y++) if ((x + y * 0.7) % 14 < 2) pset(x, y, h_mezcla(h_P.interiorS, h_P.cristalL, 0.5));
    for (let i = 0; i < 6; i++) { const gx = x0 + 8 + Math.round(h(i, x0, 663) * (ancho - 20)), gc = h_ROPA[(i + x0) % h_ROPA.length]; rect(gx, 117 - (i % 3) * 2, gx + 3, 121, gc); pset(gx, 117 - (i % 3) * 2, h_mezcla(gc, h_P.blanco, 0.5)); }
    rect(x0 + 4, 121, x1 - 5, 122, h_P.cromoM);
    // la puerta del portal
    const px = x0 + (ancho >> 1) - 4; rect(px - 1, 109, px + 8, 123, h_P.cromoK); rect(px, 110, px + 7, 123, h_mezcla(c, h_P.k, 0.35)); rect(px + 1, 111, px + 6, 118, h_P.cristalS); pset(px + 1, 111, h_P.cristalL); pset(px + 6, 119, h_P.amar);
  }
  // los remates de los tejados: el depósito de agua, el mástil, el letrero-bumerán (sin letras), la antena
  { const x = 22; rect(x - 6, 62, x + 6, 72, h_P.madera); for (let i = -6; i <= 6; i += 2) rect(x + i, 62, x + i, 72, h_P.maderaS); rect(x - 6, 64, x + 6, 64, h_P.cromoS); rect(x - 6, 69, x + 6, 69, h_P.cromoS);
    for (let j = 0; j < 5; j++) rect(x - 6 + j, 61 - j, x + 6 - j, 61 - j, h_P.maderaK); for (const dx of [-5, 5]) linea(x + dx, 72, x + dx * 1.2, 76, h_P.maderaK); }
  { const x = 152; for (let a = 0; a < 3; a++) { linea(x - 18 + a * 12, 82, x - 10 + a * 12, 72, h_P.cromoS); }
    for (let j = 0; j < 6; j++) for (let i = 0; i < 30; i++) { const yy = 74 + j - Math.round(Math.sin(i / 30 * Math.PI) * 4); pset(x - 15 + i, yy, j === 0 ? h_P.rosaL : j === 5 ? h_P.rosaK : h_P.rosa); }
    for (let i = 0; i < 30; i += 5) pset(x - 13 + i, 76 - Math.round(Math.sin(i / 30 * Math.PI) * 4), h_P.manteL); }
  { const x = 270; linea(x, 80, x, 52, h_P.cromoS); for (const [l, y] of [[8, 58], [6, 64], [4, 70]]) linea(x - l, y, x + l, y, h_P.cromoS); }
  // la acera de atrás: baldosas con juntas y el bordillo
  for (let y = 124; y <= 131; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 131 ? h_P.aceraS : y === 124 ? h_P.aceraS : (x + (y > 127 ? 6 : 0)) % 12 === 0 || y === 127 ? h_P.aceraS : h(x >> 2, y, 664) < 0.1 ? h_P.aceraL : h_P.acera);
  rect(0, 132, 319, 133, h_P.cromoM); rect(0, 132, 319, 132, h_P.aceraL);
  // la calzada: asfalto pastel tramado, raya discontinua, tapa de alcantarilla, confeti ya caído y la acera de delante
  for (let y = 134; y < 171; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 665); let c = q < 0.07 ? h_P.asfaltoS : q > 0.95 ? h_P.asfaltoL : h_P.asfalto;
    if (y < 138 && h_umbral(x, y) < (138 - y) / 6) c = h_mezcla(c, h_P.k, 0.15); if (y >= 154 && y <= 155 && (x % 24) < 13) c = h_P.raya;
    if (h(x, y, 666) < 0.012) c = h_ROPA[(x + y) % h_ROPA.length]; pset(x, y, c); }
  disco(60, 164, 5, h_P.asfaltoS); disco(60, 164, 4, h_P.cromoS); for (let i = -3; i <= 3; i += 2) linea(57, 164 + i, 63, 164 + i, h_P.asfaltoS);
  rect(0, 171, 319, 172, h_P.cromoM); rect(0, 171, 319, 171, h_P.aceraL);
  for (let y = 173; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 14 === 0 || y === 176) ? h_P.aceraS : h(x >> 2, y, 667) < 0.1 ? h_P.aceraL : h_P.acera);
}

function h_avenida(R, t, o) {
  const { rect, pset, linea, disco } = R;
  h_cielo(R, t, { hor: 100, cumulos: 5, yNubes: [0.22, 0.4] });
  // el dirigible a rayas que cruza despacio por encima de la ciudad (sin letras)
  { const u = ((t * 6 + 120) % 520), x = Math.round(330 - u), y = 50; if (x > -70 && x < 320) {
    for (let j = -6; j <= 6; j++) { const a = Math.round(Math.sqrt(1 - (j / 6.6) ** 2) * 26); for (let i = -a; i <= a; i++) { if (h_tranquila(x + i, y + j)) continue; pset(x + i, y + j, j < -3 ? h_P.cromo : ((i + 40) >> 3) % 2 ? h_P.rosaL : h_P.blanco); } if (!h_tranquila(x + a, y + j)) pset(x + a, y + j, h_P.cromoS); }
    rect(x - 6, y + 7, x + 6, y + 9, h_P.cromoS); rect(x - 5, y + 8, x + 5, y + 8, h_P.cristal); R.poligono([[x + 22, y - 3], [x + 32, y - 9], [x + 32, y + 9], [x + 22, y + 3]], h_P.turq); if (Math.floor(t * 2) % 2) pset(x + 32, y, h_P.rojo); } }
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 40, cada: 12, v: 36 });
  h_pegar(R, h_capa(R, 'h-avenida', () => h_capaAvenida(R)), 20);
  // las luces de las antenas lejanas, el tren del monorraíl y la bandera del mástil
  for (const [x, y] of [[23, 25], [125, 25], [210, 41]]) if (Math.floor(t * 1.5 + x) % 2) pset(x, y, h_P.rojo);
  h_tren(R, t, 57, { s: 0.9, v: 32, fase: 4 });
  { const x = 88; linea(x, 69, x, 52, h_P.cromoS); for (let i = 0; i < 12; i++) { const y = 52 + Math.round(Math.sin(t * 6 - i * 0.6) * 1.2); rect(x + 1 + i, y, x + 1 + i, y + 5, i % 4 < 2 ? h_P.turq : h_P.blanco); } }
  // vecinos asomados que saludan y tiran confeti
  h_huecosAv.forEach((hue, k) => h_vecino(R, t, hue, k));
  // el público de la acera de atrás (detrás de las farolas y del desfile)
  for (let k = 0; k < 30; k++) { const x = 5 + k * 10.6 + Math.round(h(k, 1, 670) * 4), op = { agita: k % 3 !== 2, bandera: k % 5 === 1 ? [h_P.rosa, h_P.turq, h_P.amar][k % 3] : null, globo: k % 7 === 3 ? h_ROPA[k % 10] : null, nino: k % 9 === 4, sombrero: k % 6 === 0 ? h_P.cromoK : null };
    h_persona(R, Math.round(x), 130 - (k % 2), t, k, op); }
  // farolas atómicas y la guirnalda de banderines entre ellas
  const fx = [36, 156, 276];
  for (let i = 0; i < fx.length - 1; i++) { const a = fx[i], b = fx[i + 1]; for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(92 + Math.sin(u * Math.PI) * 10 + Math.sin(t * 2 + x * 0.05) * 0.6); pset(x, y, h_P.cromoS); if ((x - a) % 8 === 2) { const c = h_ROPA[((x - a) / 8 | 0) % h_ROPA.length], ond = Math.round(Math.sin(t * 5 + x) * 0.8); for (let j = 1; j <= 4; j++) for (let ii = 0; ii <= 4 - j; ii++) pset(x + ii + (j > 2 ? ond : 0), y + j, c); } } }
  for (const x of fx) { rect(x - 1, 92, x + 1, 131, h_P.cromoS); rect(x - 1, 92, x - 1, 131, h_P.cromo); rect(x - 3, 128, x + 3, 131, h_P.cromoK); disco(x, 88, 4, h_P.cromoK); disco(x, 88, 3, Math.floor(t * 2 + x) % 4 ? h_P.manteL : h_P.blanco); pset(x - 1, 87, h_P.blanco);
    for (let a = 0; a < 3; a++) { const an = a * 2.09 + t * 1.5; pset(x + Math.round(Math.cos(an) * 6), 88 + Math.round(Math.sin(an) * 2), h_P.turq); } }
  // el desfile: los robots de la banda delante, la carroza y el descapotable detrás
  const av = o.avance ?? 0, cx = Math.round((o.carroza ?? 160) + av * t), giro = av ? t * av / 5 : 0;
  for (let k = 0; k < 3; k++) h_robotin(R, cx + 82 + k * 16, 150 + (k % 2) * 3, t, k, true);
  const car = h_carroza(R, t, cx, 142, 124, 14, { g: 1, giro, cuatro: o.cuatro });
  h_coche(R, cx - 96, 160, t, h_P.rosa, 1, giro, true);
  h_confeti(R, t, { n: Math.round(70 * (o.confeti ?? 1)) });
  // espectadores de espaldas en la acera de delante (cabezas y brazos que saludan)
  for (let k = 0; k < 9; k++) { const x = 14 + k * 36 + Math.round(h(k, 2, 671) * 10); if (x > 300) continue; const pc = h_PELO[k % 6], ro = h_ROPA[(k + 5) % 10], s = Math.sin(t * 6 + k) > 0;
    rect(x - 5, 176, x + 5, 179, ro); rect(x - 5, 176, x + 5, 176, h_mezcla(ro, h_P.blanco, 0.3)); disco(x, 172, 4, pc); pset(x - 2, 170, h_mezcla(pc, h_P.blanco, 0.3));
    if (k % 2) { linea(x + 5, 176, x + 8, 168 - (s ? 2 : 0), ro); rect(x + 7, 166 - (s ? 2 : 0), x + 9, 167 - (s ? 2 : 0), h_PIEL[k % 5]); } }
  return { suelo: car.cubierta, calle: 160, carroza: car, galactus: null, portal: null, sol: null };
}

let h_huecosDes = [];

function h_capaDesfile(R) {
  const { rect, pset, linea } = R; h_huecosDes = [];
  // a la derecha, la ciudad lejana: torres, la torre-platillo y la viga del monorraíl que sale de detrás de la menta
  for (const [x, w, top, c, tipo] of [[214, 16, 74, h_P.lila, 'antena'], [228, 20, 62, h_P.rosa, 'escalon'], [278, 18, 66, h_P.mante, 'cupula'], [294, 26, 58, h_P.celeste, ''], [248, 14, 80, h_P.menta, '']]) h_torre(R, x, w, top, 104, c, tipo, x, 0.45);
  h_torrePlatillo(R, 264, 50, 104, 0.3);
  h_viga(R, 76, 214, 319, [250, 306], 0.1);
  // la fachada de ladrillo rosa: hiladas a soga, juntas claras, ladrillos sueltos más oscuros, luz a la izquierda
  for (let y = 0; y < 104; y++) for (let x = 0; x < 130; x++) { const f = (y / 4) | 0, j = y % 4 === 3 || (x + (f % 2) * 5) % 10 === 0, q = h((x + (f % 2) * 5) / 10 | 0, f, 680);
    let c = j ? h_P.junta : q < 0.12 ? h_P.ladrS : q > 0.9 ? hex('#f4b4a8') : h_P.ladr; if (x > 120) c = h_mezcla(c, h_P.kS, 0.2); if (y < 18) c = h_mezcla(c, h_P.junta, 0.35); pset(x, y, c); }
  for (const vy of [22, 56]) { rect(0, vy - 4, 129, vy - 3, h_P.junta); for (const vx of [10, 48, 86]) { const hue = h_ventana(R, vx, vy, 26, 22, h_P.blanco, vx + vy); rect(vx - 1, vy - 3, vx + 26, vy - 2, h_P.ladrS); if ((vx + vy) % 3 !== 1) h_huecosDes.push(hue); } }
  // el toldo a rayas de la tienda y su escaparate (lo tapa casi todo el público)
  for (let y = 84; y <= 92; y++) for (let x = 2; x < 126; x++) pset(x, y, y >= 91 ? h_mezcla(((x >> 3) % 2) ? h_P.rosa : h_P.blanco, h_P.k, 0.2) : ((x >> 3) % 2) ? h_P.rosa : h_P.blanco);
  for (let x = 2; x < 126; x += 8) { R.disco(x + 4, 93, 3, ((x >> 3) % 2) ? h_P.rosa : h_P.blanco); }
  rect(4, 96, 124, 104, h_P.interiorS); for (let x = 6; x < 122; x += 9) rect(x, 98, x + 5, 104, h_ROPA[(x / 9 | 0) % 10]);
  // la fachada menta: aletas verticales de cromo, ventanas corridas y el remate con la estrella de rayos
  for (let y = 18; y < 104; y++) for (let x = 130; x < 214; x++) { const fin = (x - 130) % 12; let c = fin < 2 ? (fin === 0 ? h_P.cromo : h_P.cromoS) : h_umbral(x, y) < 0.07 ? h_P.mentaL : h_P.menta; if (x > 208) c = h_mezcla(c, h_P.kS, 0.2); pset(x, y, c); }
  for (const vy of [28, 52, 76]) { for (let x = 132; x < 212; x++) for (let y = vy; y < vy + 12; y++) { if ((x - 130) % 12 < 2) continue; const d = (x + (y - vy) * 0.8) % 16, f = (y - vy) / 12; pset(x, y, d < 3 && f < 0.7 ? h_P.cristalL : f > 0.6 ? h_P.interior : h_P.cristal); }
    rect(130, vy - 2, 213, vy - 1, h_P.mentaS); rect(130, vy + 12, 213, vy + 13, h_P.blanco); for (let x = 136; x < 210; x += 24) h_huecosDes.push([x, vy, x + 9, vy + 11]); }
  rect(128, 16, 215, 18, h_P.blanco); rect(128, 19, 215, 19, h_P.mentaS);
  { const x = 196; linea(x, 16, x, 4, h_P.cromoS); for (let a = 0; a < 8; a++) { const an = a / 8 * Math.PI * 2; linea(x, 6, x + Math.round(Math.cos(an) * 7), 6 + Math.round(Math.sin(an) * 7), a % 2 ? h_P.turq : h_P.rosa); } }
  rect(129, 0, 130, 104, h_P.kS);
  // la calle: asfalto tramado con confeti caído y la sombra de la valla
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 681); let c = q < 0.08 ? h_P.asfaltoS : q > 0.95 ? h_P.asfaltoL : h_P.asfalto; if (y < 126 && h_umbral(x, y) < (126 - y) / 7) c = h_mezcla(c, h_P.k, 0.2); if (h(x, y, 682) < 0.016) c = h_ROPA[(x * 3 + y) % 10]; pset(x, y, c); }
  for (let x = 0; x < 320; x++) if (x % 30 < 16) { pset(x, 176, h_P.raya); pset(x, 177, h_P.raya); }
  rect(0, 104, 319, 108, h_P.acera); rect(0, 104, 319, 104, h_P.aceraL); for (let x = 0; x < 320; x += 12) rect(x, 105, x, 108, h_P.aceraS);
}

function h_desfile(R, t, o) {
  const { rect, pset, linea, disco } = R;
  h_cielo(R, t, { hor: 104, cumulos: 4, yNubes: [0.5, 0.6], semilla: 3 });
  bandada(R, t, { tipo: 'golondrina', n: 3, y: 56, cada: 10, v: 30 });
  h_pegar(R, h_capa(R, 'h-desfile', () => h_capaDesfile(R)));
  h_tren(R, t, 75, { s: 1, v: 30, clip: [215, 0, 319, 179], pausa: 0 });
  h_huecosDes.forEach((hue, k) => h_vecino(R, t, hue, k + 3));
  // el público tras la valla: dos filas (la de atrás más pequeña) con niños a hombros, banderitas y globos
  for (let k = 0; k < 20; k++) h_persona(R, 6 + k * 16 + Math.round(h(k, 1, 690) * 5), 112, t, k + 7, { agita: k % 2 === 0, bandera: k % 4 === 1 ? [h_P.turq, h_P.rosa, h_P.amar][k % 3] : null, sombrero: k % 5 === 2 ? h_P.cromoS : null });
  for (let k = 0; k < 16; k++) { const x = 10 + k * 20 + Math.round(h(k, 2, 690) * 6); h_persona(R, x, 124, t, k, { g: 'grande', agita: k % 3 !== 1, bandera: k % 4 === 2 ? [h_P.rosa, h_P.turq, h_P.amar, h_P.lila][k % 4] : null, globo: k % 5 === 0 ? h_ROPA[(k * 3) % 10] : null, nino: k % 6 === 3, sombrero: k % 7 === 1 ? h_P.rojo : null }); }
  // la valla de cromo (caballetes con su barra a rayas)
  rect(0, 116, 319, 119, h_P.cromoM); rect(0, 116, 319, 116, h_P.blanco); rect(0, 119, 319, 119, h_P.cromoS); for (let x = 0; x < 320; x += 10) rect(x, 117, x + 4, 118, (x / 10) % 2 ? h_P.turq : h_P.rosaL);
  for (let x = 18; x < 320; x += 52) { linea(x - 4, 128, x, 119, h_P.cromoS); linea(x + 4, 128, x, 119, h_P.cromoS); linea(x - 3, 128, x + 1, 119, h_P.cromo); }
  // la carroza (parada, se mece en su suspensión) y el confeti
  const av = o.avance ?? 0, cx = Math.round((o.carroza ?? 160) + av * t), b = av ? 0 : Math.round(Math.sin(t * 1.6) * 0.6);
  const car = h_carroza(R, t, cx, 150 + b, 236, 20, { g: 1.8, giro: av ? t * av / 6 : 0, cuatro: o.cuatro });
  h_confeti(R, t, { n: Math.round(80 * (o.confeti ?? 1)), semilla: 2 });
  return { suelo: car.cubierta, calle: 176, carroza: car, galactus: null, portal: null, sol: null };
}

// izquierda tramada, sombra a la derecha, contorno con luz de contorno (le da el sol por detrás), brillo en la cresta del
// casco y en el rombo del pecho, cinturón con remaches. Se pinta con escala k (para encogerse en el portal), bruma abajo,
// ojos que brillan y chispas de energía entre las alas del casco
const h_galImgs = new Map();

function h_galImg(R, s) {
  if (h_galImgs.has(s)) return h_galImgs.get(s);
  const W = 24 * s, H = 35 * s, img = new Uint32Array(W * H).fill(h_VACIO), b = R.nuevo(), prev = R.usar(b);
  for (let y0 = 0; y0 < H; y0 += 180) { b.fill(h_VACIO); PIEZAS_DO.galactus(R, W / 2, H - y0, { s, ojos: false }); for (let y = 0; y < 180 && y0 + y < H; y++) for (let x = 0; x < W; x++) img[(y0 + y) * W + x] = b[y * 320 + x]; }
  R.usar(prev);
  const K = hex('#1c1222'), out = new Uint32Array(W * H), vacio = (x, y) => x < 0 || y < 0 || x >= W || y >= H || img[y * W + x] === h_VACIO;
  const luz = hex('#efe0ff'), sombra = hex('#140a26'), rim = hex('#ffe8f4'), rim2 = hex('#c8b0ff');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x, c = img[i]; if (c === h_VACIO) { out[i] = h_VACIO; continue; }
    if (c === K) { const borde = vacio(x - 1, y) || vacio(x + 1, y) || vacio(x, y - 1) || vacio(x, y + 1); out[i] = borde ? (h_umbral(x, y) < 0.55 ? rim : rim2) : hex('#2a1838'); continue; }
    const lx = x / W, ly = y / H; let r = c;
    const fl = 0.42 - lx * 0.75 - ly * 0.25; if (fl > 0 && h_umbral(x, y) < fl * 1.4) r = h_mezcla(r, luz, 0.28);
    const fs = lx - 0.6 + ly * 0.15; if (fs > 0 && h_umbral(x + 1, y) < fs * 1.8) r = h_mezcla(r, sombra, 0.32);
    // junto al contorno de dentro, un filo de luz (arriba y a la izquierda) o de sombra (abajo a la derecha)
    if (img[i - 1] === K && img[i - 2] !== K && x > 1 && lx < 0.6) r = h_mezcla(r, luz, 0.35); if (img[i + W] === K && y < H - 1) r = h_mezcla(r, sombra, 0.25);
    out[i] = r; }
  // detalles a píxel: la cresta del casco, las nervaduras de las alas, el rombo del pecho y los remaches del cinturón
  const P = (x, y, c) => { if (x >= 0 && y >= 0 && x < W && y < H && out[y * W + x] !== h_VACIO) out[y * W + x] = c; };
  for (let y = 5 * s; y < 8 * s; y++) { P(Math.round(11.5 * s), y, hex('#c8a8f0')); P(Math.round(11.5 * s) + 1, y, hex('#8a5ac8')); }
  for (const [c0, c1] of [[2, 5], [18, 21]]) for (let y = 2 * s; y < 11 * s; y += Math.max(2, s)) for (let x = c0 * s; x < c1 * s; x++) if ((x + y) % 3 === 0) P(x, y, hex('#8a5ac8'));
  for (let j = 0; j < 4 * s; j++) for (let i = 9 * s; i < 14 * s; i++) { const cx = 11.5 * s, cy = 16.5 * s; if (Math.abs(i - cx) + Math.abs(15 * s + j - cy) < 1.6 * s && (i + j) % 2 === 0) P(i, 15 * s + j, hex('#b088f0')); }
  for (let x = 7 * s + 2; x < 16 * s; x += Math.max(3, s + 1)) { P(x, 21 * s + (s >> 1), hex('#f0e0ff')); P(x + 1, 21 * s + (s >> 1), hex('#8a5ac8')); }
  const r = { img: out, W, H, s }; h_galImgs.set(s, r); return r;
}

// pinta a Galactus con la cara (columna 11,5 y fila 10 de la pieza) en (fx, fy), a escala k (1 = tamaño de la pieza);
// o.bruma: [color, y donde ya es casi todo bruma]; o.tinte: [color, a] (al entrar en el portal)
function h_galactus(R, t, s, fx, fy, k = 1, o = {}) {
  const G = h_galImg(R, s), B = R.buf, x0 = fx - 11.5 * s * k, y0 = fy - 10 * s * k, w = Math.ceil(G.W * k), al = Math.ceil(G.H * k);
  const [bc, by] = o.bruma ?? [0, 9999], [tc, ta] = o.tinte ?? [0, 0];
  for (let j = 0; j < al; j++) { const y = Math.round(y0 + j); if (y < 0 || y > 179) continue; const sy = Math.min(G.H - 1, Math.floor(j / k)), ab = bc ? Math.max(0, Math.min(0.85, (y - (by - 70)) / 80)) : 0;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319) continue; let c = G.img[sy * G.W + Math.min(G.W - 1, Math.floor(i / k))]; if (c === h_VACIO) continue;
      if (ab > 0 && h_umbral(x, y) < ab) c = h_mezcla(c, bc, 0.45); if (ta > 0) c = h_mezcla(c, tc, ta); B[y * 320 + x] = c; } }
  // los ojos que brillan y laten
  const pul = 0.5 + 0.5 * Math.sin(t * 2.2), es = s * k;
  for (const ci of [9, 12]) { const ex = Math.round(x0 + (ci + 0.5) * es), ey = Math.round(y0 + 9.5 * es), rr = Math.max(1, es * (0.9 + pul * 0.5));
    if (es >= 2) for (let jj = -Math.ceil(rr * 2); jj <= rr * 2; jj++) for (let ii = -Math.ceil(rr * 2); ii <= rr * 2; ii++) { const d = Math.hypot(ii, jj) / (rr * 2); if (d < 1 && h_umbral(ex + ii, ey + jj) < (1 - d) * 0.8) { const xx = ex + ii, yy = ey + jj; if (xx >= 0 && xx < 320 && yy >= 0 && yy < 180) B[yy * 320 + xx] = h_mezcla(B[yy * 320 + xx], h_P.ojoH, 0.55); } }
    R.disco(ex, ey, Math.max(0.8, es * 0.55), h_P.ojo); }
  // chispas de energía que saltan entre las puntas del casco
  if (k > 0.4) for (let n = 0; n < 3; n++) { const fase = Math.floor(t * 8 + n * 3); if (h(fase, n, 700) < 0.45) continue; const lado = n % 2 ? 1 : -1, ax = x0 + (lado > 0 ? 21.5 : 1.5) * es, ay = y0 + (1 + h(fase, n, 701) * 8) * es;
    let px = ax, py = ay; for (let q = 0; q < 6; q++) { const nx = px + lado * (2 + h(fase, q, 702) * 3) * k, ny = py + (h(fase, q, 703) - 0.5) * 6 * k; R.linea(px, py, nx, ny, q % 2 ? h_P.chispa : h_P.blanco); px = nx; py = ny; } }
}

// el aura del gigante (tramada, detrás de él) y la corona de rayos del sol que tapa su cabeza
function h_corona(R, t, cx, cy, r, a) {
  const B = R.buf;
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) { if (h_tranquila(x, y)) continue; const d = Math.hypot(x - cx, (y - cy) * 1.15) / r; if (d >= 1) continue;
    const an = Math.atan2(y - cy, x - cx), rayo = 0.5 + 0.5 * Math.sin(an * 9 + t * 0.6) * Math.sin(an * 5 - t * 0.4), q = (1 - d) * (0.35 + rayo * 0.65) * a;
    if (h_umbral(x, y) < q) B[y * 320 + x] = h_mezcla(B[y * 320 + x], d < 0.35 ? h_P.solL : rayo > 0.6 ? h_P.halo : h_P.aura, 0.55); }
}

// el portal azul en espiral que gira: brazos de luz, borde brillante, resplandor tramado y chispas que orbitan
function h_portal(R, t, cx, cy, r) {
  if (r < 1) return; const B = R.buf, R2 = r * 1.35;
  for (let y = Math.max(0, Math.floor(cy - R2)); y <= Math.min(179, cy + R2); y++) for (let x = Math.max(0, Math.floor(cx - R2)); x <= Math.min(319, cx + R2); x++) { if (h_tranquila(x, y)) continue;
    const dx = x - cx, dy = (y - cy) / 0.82, d = Math.hypot(dx, dy) / r; if (d > 1.35) continue; const i = y * 320 + x;
    if (d > 1) { if (h_umbral(x, y) < (1.35 - d) / 0.35 * 0.6) B[i] = h_mezcla(B[i], h_P.portal2, 0.45); continue; }
    if (d > 0.9) { B[i] = h_umbral(x, y) < (d - 0.9) * 10 ? h_P.portal2 : h_P.portal3; continue; }
    const an = Math.atan2(dy, dx), sp = Math.sin(an * 3 + d * 11 - t * 5);
    B[i] = d < 0.18 ? (h_umbral(x, y) < 0.5 ? h_P.portal0 : hex('#1a2a7a')) : sp > 0.55 ? (d > 0.6 ? h_P.portal3 : h_P.portal2) : sp > 0 ? h_P.portal1 : h_umbral(x, y) < d ? h_P.portal1 : h_P.portal0; }
  for (let k = 0; k < 10; k++) { const an = t * (1.5 + k * 0.1) + k * 0.63, rr = r * (1.05 + 0.15 * Math.sin(t * 3 + k)), x = Math.round(cx + Math.cos(an) * rr), y = Math.round(cy + Math.sin(an) * rr * 0.82); if (!h_tranquila(x, y)) { R.pset(x, y, h_P.blanco); R.pset(x - 1, y, h_P.portal3); } }
}

function h_capaAzotea(R) {
  const { rect, pset, linea, disco } = R;
  // la ciudad lejana entre la bruma (torres pastel, la torre-platillo) y el monorraíl
  for (let k = 0; k < 26; k++) { const x = k * 13 - 4 + Math.round(h(k, 1, 710) * 6), w = 10 + Math.round(h(k, 2, 710) * 10), top = 92 + Math.round(h(k, 3, 710) * 22); h_torre(R, x, w, top, 130, [h_P.lila, h_P.celeste, h_P.rosa, h_P.menta, h_P.mante][k % 5], ['', 'antena', 'cupula', 'escalon', 'aguja'][k % 5], k * 9, 0.6); }
  h_torrePlatillo(R, 56, 92, 130, 0.5);
  h_viga(R, 116, 0, 319, [40, 120, 200, 280], 0.45);
  // los tejados vecinos: cornisas, chimeneas, depósitos y claraboyas
  const tej = [[0, 64, 122, h_P.melo, h_P.meloS], [64, 132, 128, h_P.menta, h_P.mentaS], [132, 210, 124, h_P.rosa, h_P.rosaS], [210, 268, 130, h_P.celeste, h_P.celesteS], [268, 320, 120, h_P.mante, h_P.manteS]];
  for (const [x0, x1, top, c, cS] of tej) { for (let y = top; y < 142; y++) for (let x = x0; x < x1; x++) pset(x, y, y === top ? h_P.blanco : y === top + 1 ? cS : x >= x1 - 3 ? cS : (y - top) % 6 === 5 ? h_mezcla(c, cS, 0.5) : h_umbral(x, y) < 0.07 ? h_P.blanco : c);
    for (let x = x0 + 4; x < x1 - 8; x += 14) { const vy = top + 5; rect(x, vy, x + 5, vy + 5, h_P.cromoS); rect(x + 1, vy + 1, x + 4, vy + 4, h_P.cristal); pset(x + 1, vy + 1, h_P.cristalL); } }
  for (const [x, top] of [[20, 112], [100, 118], [176, 114], [300, 110]]) { rect(x - 2, top, x + 2, top + 10, h_P.ladr); rect(x - 3, top - 1, x + 3, top, h_P.ladrS); rect(x + 1, top, x + 2, top + 10, h_P.ladrS); }
  { const x = 240; rect(x - 6, 112, x + 6, 124, h_P.madera); for (let i = -6; i <= 6; i += 2) rect(x + i, 112, x + i, 124, h_P.maderaS); for (let j = 0; j < 4; j++) rect(x - 6 + j, 111 - j, x + 6 - j, 111 - j, h_P.maderaK); for (const d of [-5, 5]) linea(x + d, 124, x + d, 130, h_P.maderaK); }
  // el pretil de nuestra azotea: ladrillo pastel con remate de cromo
  for (let y = 142; y < 152; y++) for (let x = 0; x < 320; x++) { const f = ((y - 142) / 3) | 0, j = (y - 142) % 3 === 2 || (x + (f % 2) * 4) % 8 === 0; pset(x, y, y < 144 ? (y === 142 ? h_P.cromo : h_P.cromoS) : j ? h_P.junta : h(x >> 3, f, 711) < 0.12 ? h_P.ladrS : h_P.ladr); }
  // el suelo de la azotea: baldosa de barro pastel en damero, juntas, manchas y sombra del pretil
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = ((y - 152) / 5) | 0, fx = ((x + fy * 3) / 12) | 0, j = (y - 152) % 5 === 4 || (x + fy * 3) % 12 === 0;
    let c = j ? h_P.tejaS : (fx + fy) % 2 ? h_P.teja : h_P.tejaL; if (h(x, y, 712) < 0.04) c = h_P.tejaS; if (y < 156 && h_umbral(x, y) < (156 - y) / 5) c = h_mezcla(c, h_P.k, 0.2); pset(x, y, c); }
  // el depósito de agua de madera sobre sus patas (a la izquierda), con duelas, aros y escalerilla
  { const x0 = 8, x1 = 52; for (let y = 86; y < 128; y++) for (let x = x0; x < x1; x++) { const u = (x - x0) / (x1 - x0), du = (x - x0) % 4; pset(x, y, du === 0 ? h_P.maderaK : u < 0.2 ? h_P.maderaL : u > 0.75 ? h_P.maderaS : h(x, y >> 2, 713) < 0.1 ? h_P.maderaS : h_P.madera); }
    for (const y of [92, 104, 116, 125]) { rect(x0 - 1, y, x1, y, h_P.cromoS); rect(x0 - 1, y - 1, x1, y - 1, h_P.cromoM); }
    for (let j = 0; j < 12; j++) { const a = Math.round((x1 - x0) / 2 * (j / 12)) + 1; rect(30 - a, 74 + j, 30 + a, 74 + j, j % 3 === 0 ? h_P.maderaK : h_P.maderaS); } rect(29, 70, 31, 74, h_P.cromoS);
    for (const lx of [12, 26, 40, 48]) { rect(lx, 128, lx + 1, 152, h_P.cromoK); } linea(12, 132, 48, 148, h_P.cromoS); linea(48, 132, 12, 148, h_P.cromoS); rect(8, 128, 52, 129, h_P.maderaK);
    for (let y = 92; y < 152; y += 3) rect(54, y, 57, y, h_P.cromoS); rect(54, 90, 54, 152, h_P.cromoK); rect(57, 90, 57, 152, h_P.cromoK); }
  // el palomar (a la derecha) con su tejadillo, rejilla y aldabilla
  { const x0 = 250, x1 = 300; rect(x0, 128, x1, 152, h_P.maderaK); rect(x0 + 1, 129, x1 - 1, 151, h_P.blanco); for (let x = x0 + 2; x < x1 - 1; x += 3) linea(x, 131, x, 150, h_P.cromoM); for (let y = 132; y < 150; y += 3) linea(x0 + 2, y, x1 - 2, y, h_P.cromoM);
    R.poligono([[x0 - 4, 129], [(x0 + x1) / 2, 116], [x1 + 4, 129]], h_P.turq); linea(x0 - 4, 129, (x0 + x1) / 2, 116, h_P.turqL); linea((x0 + x1) / 2, 116, x1 + 4, 129, h_P.turqS); rect(x0 + 18, 138, x0 + 30, 151, h_P.interiorS); rect(x0 - 2, 152, x1 + 2, 153, h_P.maderaS); }
  // la antena de televisión (en espina de pez)
  { const x = 226; rect(x, 92, x + 1, 152, h_P.cromoS); rect(x, 92, x, 152, h_P.cromo); for (const [l, y] of [[14, 96], [11, 101], [8, 106], [5, 111]]) { linea(x - l, y, x + l, y, h_P.cromoS); pset(x - l, y + 1, h_P.cromoK); pset(x + l, y + 1, h_P.cromoK); } linea(x, 120, x - 20, 152, h_P.cromoS); linea(x + 1, 120, x + 22, 152, h_P.cromoS); }
}

function h_capaAzoteaCerca(R) {
  const { rect, pset, linea, disco } = R;
  // la franja de la ciudad lejana y los tejados vecinos entre la bruma
  for (let k = 0; k < 24; k++) { const x = k * 14 - 6 + Math.round(h(k, 1, 720) * 6), w = 10 + Math.round(h(k, 2, 720) * 12), top = 96 + Math.round(h(k, 3, 720) * 12); h_torre(R, x, w, top, 120, [h_P.celeste, h_P.rosa, h_P.mante, h_P.lila, h_P.menta][k % 5], ['', 'cupula', 'antena', '', 'escalon'][k % 5], k * 5, 0.62); }
  h_torrePlatillo(R, 290, 94, 120, 0.55);
  h_viga(R, 106, 0, 319, [70, 230], 0.5);
  for (let y = 112; y < 122; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 112 ? h_mezcla(h_P.blanco, h_P.bruma, 0.4) : h_mezcla([h_P.melo, h_P.menta, h_P.rosa, h_P.celeste][(x / 80) | 0], h_P.bruma, 0.45 - (y - 112) * 0.02));
  // el pretil de ladrillo pastel con remate de cromo y la barandilla de tubos de cromo encima
  for (let y = 122; y < 140; y++) for (let x = 0; x < 320; x++) { const f = ((y - 122) / 4) | 0, j = (y - 122) % 4 === 3 || (x + (f % 2) * 6) % 12 === 0; pset(x, y, y < 125 ? (y === 122 ? h_P.cromo : h_P.cromoS) : j ? h_P.junta : h(x / 12 | 0, f, 721) < 0.12 ? h_P.ladrS : h(x / 12 | 0, f, 722) > 0.9 ? hex('#f4b4a8') : h_P.ladr); }
  for (const y of [104, 113]) { rect(0, y, 319, y + 1, h_P.cromoM); rect(0, y, 319, y, h_P.blanco); }
  for (let x = 8; x < 320; x += 40) { rect(x, 104, x + 2, 122, h_P.cromoM); rect(x, 104, x, 122, h_P.blanco); rect(x + 2, 104, x + 2, 122, h_P.cromoS); }
  // la tarima de tablas con vetas, nudos y la sombra del pretil
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = ((y - 140) / 6) | 0, j = (y - 140) % 6 === 5, cab = (x + tb * 37) % 64 === 0, q = h(x >> 3, tb, 723), v = Math.sin(x * 0.18 + tb * 2 + Math.sin(x * 0.05) * 2) > 0.85;
    let c = j || cab ? h_P.tarimaS : v ? h_mezcla(h_P.tarima, h_P.tarimaS, 0.5) : q > 0.85 ? h_P.tarimaL : h_P.tarima; if (h(x, y, 724) < 0.006) c = h_P.maderaS; if (y < 146 && h_umbral(x, y) < (146 - y) / 6) c = h_mezcla(c, h_P.k, 0.18); pset(x, y, c); }
  // la tumbona a rayas (izquierda)
  { R.poligono([[6, 150], [56, 150], [58, 156], [8, 156]], h_P.cromoS); for (let x = 8; x < 56; x++) for (let y = 147; y < 154; y++) pset(x, y, ((x >> 2) % 2) ? h_P.rosa : h_P.blanco); rect(8, 153, 56, 154, h_P.rosaS);
    for (let j = 0; j < 22; j++) { const x = 8 - Math.round(j * 0.15), y = 147 - j; rect(x, y, x + 7, y, ((y >> 2) % 2) ? h_P.rosa : h_P.blanco); pset(x + 7, y, h_P.rosaS); }
    for (const lx of [10, 52]) { linea(lx, 154, lx - 3, 166, h_P.cromoK); linea(lx + 1, 154, lx + 4, 166, h_P.cromoS); } rect(10, 170, 60, 172, h_mezcla(h_P.tarima, h_P.k, 0.18)); }
  // la palmera en su maceta de cromo (derecha)
  { const x = 306; for (let y = 150; y < 172; y++) { const a = 9 - Math.round((y - 150) * 0.12); rect(x - a, y, x + a, y, y === 150 ? h_P.blanco : (y - 150) % 7 === 3 ? h_P.turq : h_P.cromoM); pset(x - a, y, h_P.cromo); pset(x + a, y, h_P.cromoS); }
    for (let y = 104; y < 150; y++) { const xx = x + Math.round(Math.sin(y * 0.08) * 2); rect(xx - 1, y, xx + 1, y, (y % 4) ? h_P.maderaS : h_P.madera); } }
  // la mesita de cromo con la radio de baquelita y dos limonadas
  { rect(256, 146, 296, 148, h_P.cromoM); rect(256, 146, 296, 146, h_P.blanco); rect(274, 148, 277, 168, h_P.cromoS); rect(266, 168, 286, 170, h_P.cromoK);
    rect(260, 134, 278, 145, h_P.turqS); rect(261, 135, 277, 144, h_P.turq); for (let x = 263; x < 270; x += 2) rect(x, 137, x, 142, h_P.turqK); disco(274, 139, 3, h_P.manteL); pset(274, 139, h_P.k); rect(276, 131, 276, 134, h_P.cromoS);
    for (const gx of [283, 291]) { rect(gx - 2, 137, gx + 2, 145, h_P.cristalL); rect(gx - 1, 139, gx + 1, 144, h_P.amar); pset(gx - 1, 139, h_P.manteL); linea(gx + 1, 139, gx + 3, 133, h_P.rosa); } }
}

function h_azotea(R, t, o, cerca) {
  const { rect, pset, linea, disco } = R, g = Math.max(0, Math.min(1, o.gigante ?? 0)), pt = Math.max(0, Math.min(1, o.portal ?? 0)), ex = Math.max(0, Math.min(1, o.expulsa ?? 0));
  const s = cerca ? 6 : 5, hor = cerca ? 122 : 142, e = 1 - (1 - g) ** 2;
  // la cara de Galactus (y el sol que tapa): sube desde detrás de la ciudad
  const fxBase = cerca ? 196 : 190, fyArriba = cerca ? 74 : 68, fyAbajo = (cerca ? 122 : 142) + 12 * s, sol = [fxBase, fyArriba, cerca ? 14 : 12];
  const por = cerca ? [64, 50, 34] : [70, 54, 30];
  const tinte = Math.min(1, g * 0.85 * (1 - ex * 0.7));
  h_cielo(R, t, { hor, g: tinte, cumulos: 5, yNubes: cerca ? [0.25, 0.42] : [0.22, 0.4], semilla: cerca ? 5 : 1, sol: null });
  // el sol: visible antes de que suba el gigante; luego queda detrás de su cabeza con la corona de rayos
  h_sol(R, t, sol, tinte);
  if (g > 0 && ex < 1) h_corona(R, t, sol[0], sol[1] + 10, Math.round((cerca ? 100 : 86) * e), e * (1 - ex));
  // el portal
  if (pt > 0) h_portal(R, t, por[0], por[1], por[2] * (1 - (1 - pt) ** 3) * (ex > 0.85 ? 1 - (ex - 0.85) / 0.15 * 0.6 : 1));
  // Galactus: sube (gigante) y, al expulsarlo, vuela hacia el portal encogiéndose
  if (g > 0 && ex < 1) {
    const ue = ex * ex * (3 - 2 * ex), fx0 = fxBase, fy0 = Math.round(fyAbajo + (fyArriba - fyAbajo) * e + Math.sin(t * 0.9) * 1.2);
    const fx = Math.round(fx0 + (por[0] - fx0) * ue), fy = Math.round(fy0 + (por[1] - fy0) * ue), k = 1 - ue * 0.94;
    h_galactus(R, t, s, fx, fy, k, { bruma: ex > 0 ? null : [h_mezcla(h_P.bruma, hex('#c890c0'), tinte), hor], tinte: [h_P.portal2, ue * 0.6] });
  }
  // nubes bajas que pasan por delante del gigante (dan la escala)
  { const cn = [0, 1, 2].map((i) => h_mezcla(h_NUBE_DIA[i], h_NUBE_GIG[i], tinte)); for (let k = 0; k < 3; k++) { const x = ((h(k, 8, 730) * 420 + t * (5 + k * 2)) % 480) - 80; h_nube(R, Math.round(x), hor - 18 - k * 6, 40 + k * 8, 20 + k, cn); } }
  if (pt > 0 && ex > 0 && ex < 1) h_portal(R, t, por[0], por[1], por[2] * 0.25 * Math.sin(ex * Math.PI));   // el remolino del centro, que se lo traga
  // los pájaros (huyen cuando aparece el gigante)
  if (g < 0.5) bandada(R, t, { tipo: 'golondrina', n: 4, y: cerca ? 60 : 64, cada: 11, v: 34 });
  else for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6) % 1), x = Math.round(150 - u * 200 + k * 9), y = Math.round(90 - u * 60 + Math.sin(k) * 8), b = Math.floor(t * 8 + k) % 2; if (h_tranquila(x, y) || x < 0) continue; pset(x, y, h_P.kS); pset(x - 1, y - b, h_P.kS); pset(x + 1, y - b, h_P.kS); }
  // la capa fija de la ciudad y de la azotea
  h_pegar(R, h_capa(R, cerca ? 'h-azoteaCerca' : 'h-azotea', () => (cerca ? h_capaAzoteaCerca(R) : h_capaAzotea(R))), cerca ? 80 : 60);
  // vida: el tren lejano del monorraíl, las ventanas que se encienden con el gigante, la gente que señala en las azoteas
  h_tren(R, t, cerca ? 105 : 115, { s: 0.55, v: 22, bru: cerca ? 0.5 : 0.4, fase: 6, pausa: 2 });
  if (g > 0.3) for (let k = 0; k < 6; k++) { const x = cerca ? 20 + k * 52 : 70 + k * 30, y = cerca ? 111 : (k % 2 ? 121 : 127), s2 = Math.sin(t * 7 + k) > 0;
    if (!cerca && x > 200 && x < 250) continue; pset(x, y, h_ROPA[k]); pset(x, y - 1, h_ROPA[k]); pset(x, y - 2, h_PIEL[k % 5]); pset(x + 1, y - 2 - (s2 ? 1 : 0), h_PIEL[k % 5]); pset(x + 2, y - 3 - (s2 ? 1 : 0), h_PIEL[k % 5]); }
  if (cerca) {
    // la sombrilla de la tumbona, que ondea con la brisa
    { const x = 34; rect(x, 84, x, 150, h_P.cromoS); rect(x - 3, 150, x + 3, 152, h_P.cromoK);
      for (let i = -26; i <= 26; i++) { const ond = Math.round(Math.sin(t * 3 + i * 0.25) * 0.7), y0 = 80 + Math.round((i / 26) ** 2 * 10), y1 = 92 + Math.round((i / 26) ** 2 * 3) + (((i + 26) % 7) < 4 ? 1 : 0) + ond, sec = Math.floor((i + 26) / 7.6) % 2;
        for (let y = y0; y <= y1; y++) pset(x + i, y, y === y1 ? (sec ? h_P.rosaS : h_P.cromoM) : y < y0 + 2 && i < 0 ? (sec ? h_P.rosaL : h_P.blanco) : i > 12 ? (sec ? h_P.rosaS : h_P.rosaL) : (sec ? h_P.rosa : h_P.blanco)); }
      disco(x, 79, 2, h_P.cromoS); pset(x - 1, 78, h_P.blanco); }
    // las hojas de la palmera, que se mecen
    for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + (k - 2.5) * 0.55 + Math.sin(t * 1.4 + k) * 0.06; for (let i = 0; i < 18; i++) { const x = Math.round(306 + Math.cos(an) * i * 1.1), y = Math.round(104 + Math.sin(an) * i * 0.8 + (i * i) * 0.03); if (h_tranquila(x, y)) continue; pset(x, y, h_P.turqS); if (i % 2) { pset(x, y + 1, h_P.verde); pset(x + 1, y + 2, hex('#3a9a6a')); } } }
    // el robot mayordomo que rueda junto a la mesita con su bandeja
    { const x = 244 + Math.round(Math.sin(t * 0.6) * 3), y = 166; disco(x, y - 1, 3, h_P.k); disco(x, y - 1, 2, h_P.cromoS); rect(x - 5, y - 16, x + 5, y - 4, h_P.cromoM); rect(x - 5, y - 16, x - 4, y - 4, h_P.blanco); rect(x + 4, y - 16, x + 5, y - 4, h_P.cromoS);
      rect(x - 3, y - 12, x + 3, y - 8, h_P.turq); pset(x - 2, y - 11, Math.floor(t * 3) % 2 ? h_P.rojo : h_P.amar); pset(x, y - 11, h_P.manteL); disco(x, y - 21, 5, h_P.cromoM); disco(x - 1, y - 22, 3, h_P.cromo); rect(x - 3, y - 22, x + 3, y - 20, h_P.k); pset(x - 2, y - 21, h_P.ojoH); pset(x + 2, y - 21, h_P.ojoH);
      linea(x, y - 26, x, y - 29, h_P.cromoS); pset(x, y - 30, Math.floor(t * 2) % 2 ? h_P.rojo : h_P.rosa); linea(x + 5, y - 13, x + 10, y - 17, h_P.cromoS); rect(x + 7, y - 19, x + 15, y - 18, h_P.cromo); rect(x + 9, y - 23, x + 10, y - 20, h_P.cristalL); pset(x + 9, y - 21, h_P.rosa); }
    // un abejorro que zumba junto a la palmera; brillos del cromo
    { const x = Math.round(290 + Math.sin(t * 2.2) * 10), y = Math.round(128 + Math.sin(t * 3.7) * 5); pset(x, y, h_P.amar); pset(x + 1, y, h_P.k); if (Math.floor(t * 12) % 2) pset(x, y - 1, h_P.blanco); }
    if (Math.floor(t * 0.7) % 4 === 0) { const x = 8 + 40 * (Math.floor(t * 0.7 / 4) % 8); pset(x, 106, h_P.blanco); pset(x - 1, 105, h_P.blanco); pset(x + 1, 107, h_P.blanco); }
  } else {
    // las palomas del palomar (picotean y una se asoma y sale volando de vez en cuando)
    for (let k = 0; k < 3; k++) { const x = 256 + k * 15, pic = Math.sin(t * 4 + k * 2) > 0.6 ? 1 : 0; rect(x, 125, x + 3, 127, hex('#8a8ea0')); pset(x + 3 + pic, 124 + pic, hex('#6a6e80')); pset(x + 4 + pic, 124 + pic, h_P.naranja); pset(x, 126, hex('#aab0c0')); pset(x + 1, 128, h_P.naranja); }
    { const u = (t % 9) / 9, x = Math.round(275 - u * 120), y = Math.round(140 - u * 70 - Math.sin(u * 6) * 4), b = Math.floor(t * 9) % 2; if (u < 0.9 && !h_tranquila(x, y)) { rect(x, y, x + 2, y + 1, hex('#8a8ea0')); pset(x - 1, y - b, hex('#6a6e80')); pset(x + 3, y - b, hex('#6a6e80')); } }
    // el extractor con su turbina que gira y el vapor que sale
    { const x = 76; rect(x - 4, 134, x + 4, 152, h_P.cromoS); rect(x - 4, 134, x - 3, 152, h_P.cromo); const f = Math.floor(t * 8) % 3; for (let j = 0; j < 8; j++) { const a = Math.round(Math.sqrt(1 - ((j - 4) / 4.5) ** 2) * 7); rect(x - a, 126 + j, x + a, 126 + j, (j + f) % 3 === 0 ? h_P.cromoS : h_P.cromoM); } pset(x, 125, h_P.cromoK);
      for (let i = 0; i < 5; i++) { const u = ((t * 0.4 + i / 5) % 1), vx = x + Math.round(u * 14 + Math.sin(t + i) * 2), vy = 124 - Math.round(u * 26), r = 1 + Math.round(u * 3); disco(vx, vy, r, h_mezcla(h_P.blanco, h_P.bruma, u * 0.7)); } }
    // el robot que barre la azotea
    { const x = Math.round(92 + Math.sin(t * 0.5) * 8), y = 168, d = Math.cos(t * 0.5) > 0 ? 1 : -1; rect(x - 4, y - 12, x + 4, y - 3, h_P.cromoM); rect(x - 4, y - 12, x - 3, y - 3, h_P.blanco); rect(x - 2, y - 9, x + 2, y - 6, h_P.rosa); disco(x, y - 16, 4, h_P.cromoM); rect(x - 3, y - 17, x + 3, y - 15, h_P.k); pset(x - 1 + d, y - 16, h_P.ojoH); pset(x + 1 + d, y - 16, h_P.ojoH);
      disco(x - 2, y - 1, 2, h_P.k); disco(x + 2, y - 1, 2, h_P.k); const sw = Math.round(Math.sin(t * 6) * 3); linea(x + 3 * d, y - 8, x + (8 + sw) * d, y, h_P.madera); rect(Math.min(x + (6 + sw) * d, x + (10 + sw) * d), y, Math.max(x + (6 + sw) * d, x + (10 + sw) * d), y + 1, h_P.mante);
      if (Math.abs(sw) > 2) { pset(x + (12 + sw) * d, y - 1, h_P.tejaS); pset(x + (13 + sw) * d, y - 2, h_P.tejaS); } }
  }
  // lo que devuelve: la cara del gigante, el portal y el sol
  const fyG = Math.round(fyAbajo + (fyArriba - fyAbajo) * e);
  return { suelo: cerca ? 165 : 166, calle: null, carroza: null, galactus: g > 0 && ex < 1 ? { x: fxBase, y: fyG, s } : null, portal: pt > 0 ? por : null, sol: [sol[0], sol[1]] };
}
