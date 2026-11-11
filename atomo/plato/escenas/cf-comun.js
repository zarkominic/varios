// Fontanería y decorados del episodio 32 (The Secret: los doce cofres de 1982) en el estilo canónico pixel chibi, al nivel
// de episodios/ESTANDAR.md. Decorados (guion.md): A Nueva York 1981–2005 (la editorial de Preiss y la cámara de cajas de
// seguridad), B el cuento (el bosque antiguo, el barco de las hadas, la orilla del Nuevo Mundo), C Chicago 1983 (Grant
// Park), D Cleveland 2004 (el jardín griego), E Boston 2019 (el parque en obras y la ceremonia en Brooklyn) y F hoy (el
// estudio de Atom, el mapa de los doce puntos, un parque con la señal de no excavar).
// DERECHOS: NADA de las pinturas reales del libro (John Jude Palencar) ni de su portada: los cuadros que salen son NUESTROS
// (PIEZAS_CF.cuadro), de lejos o en trozos. Sin letras (solo números y símbolos). No se dan pistas nuevas. Nada morboso.
// Los personajes son los de ELENCO_CF y las piezas, PIEZAS_CF (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, vallas, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/cf-comun.js';
//   const { E, R, M } = await T.preparar('cf-gancho');
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
// las piezas del episodio (PIEZAS_CF: el cofre, la llave, la pala, las piedras, el libro, los cuadros nuestros, la excavadora…), las crea el reparto
export const PIEZAS_CF = KIT.PIEZAS_CF || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el papel y la tinta de la editorial, el verde de los parques, la tierra recién removida, la cerámica del cofre, el
    // mármol del jardín griego, el naranja de las obras y los colores de cuento
    papel: '#efe6d0', papelS: '#cfc4a8', tinta: '#2a2a3a', cesped: '#5a9a4a', cespedS: '#3e7436', tierra: '#7a5434',
    tierraS: '#523622', ceramica: '#e8dcc0', ceramicaS: '#b8a884', marmol: '#e4e0d4', marmolS: '#b4b0a4',
    obra: '#f0902a', obraS: '#c06a14', hada: '#c8a0ff', cuento: '#3a2a6a', cuentoL: '#7a5ac8', gema: '#3ad08a',
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
  const E = await escena(id, 'ep32');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1981–1983 (el libro y el primer cofre), 1983–2005 (la larga búsqueda y Cleveland), 2005–2019
  // (el secreto perdido y Boston), 2019–2027 (los nueve que faltan)
  Object.assign(R.ICONOS, {
    pala: ['...#...', '...#...', '...#...', '...#...', '..###..', '..###..', '...#...'],
    llave: ['..##...', '.#..#..', '..##...', '...#...', '...##..', '...#...', '...##..'],
    gema: ['.......', '.#####.', '#.#.#.#', '.#.#.#.', '..#.#..', '...#...', '.......'],
    cofre: ['.......', '.#####.', '#######', '#..#..#', '#######', '#######', '.......'],
  });
  R.tramosTiempo([[1981, 1983, R.PALA.ORO, 'pala'], [1983, 2005, R.PALA.VERDE ?? R.PALA.ORO, 'llave'], [2005, 2019, R.PALA.AZUL ?? R.PALA.ROJO, 'gema'], [2019, 2027, R.PALA.ROJO, 'cofre']]);
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

// ── A · Nueva York, 1981–2005 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del plano (suelo, mesas…).
//   'estudio': la editorial de Byron Preiss en Manhattan, un loft de ladrillo pintado: el ventanal de hierro (x 20–126,
//     y 22–86) con Manhattan (cielo tramado, nubes a cuatro velocidades, una bandada, torres lejanas con su antena, edificios
//     de ladrillo con depósitos de agua, vapor, un vecino en la azotea, la escalera de incendios), el gato y la maceta en el
//     alféizar, el radiador, la mesa de dibujo con su lámpara de brazo (x 0–58), la estantería de libros y cómics (x 130–200),
//     el escritorio con la máquina de escribir que teclea (x 138–194, tablero en y 109), las galeradas colgadas que se mecen
//     (x 204–254, y 50–70), el reloj, dos caballetes con cuadros NUESTROS (x 220 y 256, base y 132) y otro cuadro apoyado en
//     las cajas (x 116), la puerta del pasillo con su cristal esmerilado (x 288–312: pasa una sombra), el ventilador (x 244), la
//     lámpara colgante, la alfombra (x 98–236, y 139–162) y el polvo en la luz. Los personajes, con los pies en y 138–158.
//     o.epoca: 1981 | 1997 (un ordenador beige en vez de la máquina) | 2005 (atardecer: todo teñido, las ventanas de
//     enfrente encendidas, el monitor apagado y la libreta en blanco en el escritorio); o.mudanza (con 2005): la estantería
//     medio vacía, los cercos de los cuadros en la pared, lienzos envueltos, un caballete vacío, la alfombra enrollada y
//     cajas por todas partes. Llama a editorialDelante después de los actores (la esquina de una mesa de dibujo y las cajas).
//     Cámara 'mesa': el rincón de Preiss, con otra pared (yeso verde y friso de nogal): la ventana con un depósito de agua
//     de cerca (x 16–84, y 26–80), el corcho con los doce bocetos (x 103–195, y 29–77), el reloj, una balda, un cuadro, el
//     archivador con su planta, el saco del correo (x 22) y la mesa (x 59–261, tablero en y 135–146, frente hasta abajo)
//     con el sillón detrás: quien se sienta va con los pies en y 138 (asoman cabeza y hombros). Encima: la lámpara verde,
//     las cartas (o.cartas 0–1: seis montones que crecen a los lados de Preiss, sobres sueltos, el saco que rebosa y un
//     montón en el suelo), la libreta (con notas; en blanco en 2005 u o.libreta 'blanco' | 'notas'), el reloj de arena
//     (o.arena 0–1; si falta, cae solo y en 2005 ya ha caído), el teléfono (o.suena: tiembla y echa arcos; negro de disco
//     en 1981, beige después) y la taza que humea; o.lampara: false la apaga. La mesa se pinta aquí y editorialDelante la
//     repinta por delante de quien esté detrás: lo que la escena ponga encima se pinta DESPUÉS de editorialDelante. El
//     cartero y las visitas, a la derecha (x 272–296, pies en y 150–172).
//   'banco': la cámara de cajas de seguridad de un banco de Nueva York: la pared de cajitas de acero numeradas en tres
//     cuerpos (x 10–229, y 24–107; un brillo las recorre y una está abierta en x 113–126, y 72–83), la entrada redonda de
//     la cámara acorazada (centro 272, 80; radio 25) con la reja de día y, detrás, el vestíbulo con un guarda que pasea; la
//     hoja de la puerta abierta (x 296–319), la cámara de vigilancia que gira, el teclado de la alarma, los fluorescentes,
//     el suelo de mármol en damero con reflejos, una escalerilla (x 34), un carrito con cajetines (x 200) y dos postes con
//     cordón ante la puerta. Los personajes, con los pies en y 138–156. La mesa de consulta (x 94–226, tablero en
//     y 158–163), en editorialDelante.
//     Cámara 'caja': la pared de cajones grandes numerados (301–336, uno vacío en x 30–64, y 57–75) y, sobre la mesa de
//     consulta (x 79–241, tablero en y 119–150), la caja 317 abierta: tapa acolchada, interior de terciopelo con doce
//     huecos (dos filas de seis: x 123 + 15·k; y 122 la de atrás y 131 la de delante) y las piedras (o.piedras 0–12, con
//     decimales: cada una cae en su hueco y luego destellan por turnos), la llave con su etiqueta que se balancea y una
//     lupa; o.tapa >= 0.5: la caja cerrada (sin piedras a la vista). Los personajes, a los lados de la mesa (x 4–76 y 244–316, pies en y 150–170); los bonos que vuelan los pinta
//     la escena, después de editorialDelante (que repinta la mesa y la caja).
export function editorial(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'banco') return cam === 'caja' ? a_bancoCaja(R, t, o) : a_banco(R, t, o);
  return cam === 'mesa' ? a_estudioMesa(R, t, o) : a_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de editorial(); se llama después de los actores, con las mismas opciones:
//   'estudio' general: la esquina de una mesa de dibujo abajo a la izquierda (x 0–72, y 150–179: papeles, bote de pinceles,
//     taza que humea) y las cajas de libros abajo a la derecha (x 258–319, y 150–179); con o.mudanza, cajas a los dos lados.
//   'estudio' 'mesa': vuelve a pintar la mesa de Preiss con todo lo de encima (tapa a quien esté detrás, de hombros abajo).
//   'banco' general: la mesa de consulta (x 94–226, tablero en y 158–163) con su lámpara verde, el libro de firmas y la pluma.
//   'banco' 'caja': vuelve a pintar la mesa con la caja abierta y las piedras.
export function editorialDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'banco') return cam === 'caja' ? a_cajaMesa(R, t, o) : a_bancoDelante(R, t, o);
  return cam === 'mesa' ? a_mesaPreiss(R, t, o) : a_estudioDelante(R, t, o);
}
// ── B · El cuento ──────────────────────────────────────────────────────────────────────
// El cuento de hadas del libro, pintado como una lámina antigua: más saturado y mágico que el resto, con una ORLA dorada
// (fina y lisa arriba y en la esquina de Atom; con cenefa, zarcillos y gemas en las esquinas abajo y a los lados). Cada
// encuadre pinta los 320 × 180 con sus capas fijas en búferes y la vida encima; con o.criaturas === false no pinta sus
// hadas, duendes y dragón (los pone la escena con PIEZAS_CF). Lo que cuenta la narración va con opciones 0–1 o 0–12, no
// con t. o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'bosque': el Viejo Mundo de noche: cielo de añil a rosa con vía láctea, luna llena, nubes de tres tonos a tres
//     velocidades, murciélagos y fugaces; tres sierras con niebla que se arrastra, una aldea con humo y el castillo con
//     ventanas que parpadean y banderolas; lejos, los hombres con antorchas (o.antorchas 0–1: cuántos y cuánto avanzan);
//     dos árboles gigantes a los lados (la puerta de las hadas en el izquierdo, ventanas con luz en el derecho) y dos más
//     finos (el búho que parpadea), bóveda de hojas, lianas, farolillos de colores que se mecen, el claro con el camino
//     de luna (ahí pisan los personajes, y = 152), setas rojas y azules que laten, flores, piedras, el estanque con el
//     reflejo de la luna, hojas que caen y luciérnagas. Criaturas: tres duendes con hatillos por el camino, dos hadas con
//     estela y el dragón; o.huida 0–1 las lleva hacia la derecha (sin ella andan solas, despacio).
//     Cámara 'barco': el barco de las criaturas en el océano de noche (otro dibujo): cielo azul con aurora, luna
//     creciente, estrellas que titilan, fugaces y nubes bajas; la costa del Viejo Mundo con antorchas a la izquierda,
//     rocas y una ballena lejos; el mar con rizos, el camino de la luna, tres filas de olas con espuma y delfines; el
//     barco (casco curvo de tablas con cenefa de oro y gemas, portillos con luz, popa en voluta, mascarón de dragón,
//     dos velas de hoja y un foque de pétalo que se hinchan, guirnaldas de farolillos, gallardete) cabecea; en cubierta,
//     el cofre abierto con las piedras (o.piedras 0–12, por omisión 12; false lo quita); o.avance 0–1 mueve el barco
//     60 px de izquierda a derecha. Criaturas: duende al timón, duende vigía, hada y dragón.
//   'orilla': la orilla del Nuevo Mundo al amanecer: cielo de azul a oro, el sol que asoma con rayos, luna pálida, nubes
//     de tres tonos, gaviotas; el mar turquesa con el camino de oro, el barco fondeado a contraluz (velas recogidas) y un
//     bote de nuez con dos duendes que reman; la playa en diagonal con el agua que sube y baja, conchas, estrellas de mar,
//     un tronco varado, rocas, huellas y un cangrejo; dunas con barrón que se mece y el bosque de otoño (un ciervo entre
//     los troncos, hojas que vuelan). o.cofres 0–12: los cofrecitos se esconden uno a uno en doce sitios (cada uno brilla,
//     se hunde y se apaga; queda un montoncito con un destello de tarde en tarde). Criaturas: tres duendes con un
//     cofrecito en brazos, el hada y el dragón con el suyo; o.llegada 0–1 las lleva playa arriba.
//     Cámara 'doce': el mapa de pergamino de Norteamérica (sin letras) como lámina iluminada: mar de jade con rizos, tierra
//     de oro viejo, cenefa de noche con zarcillos, rosa de ocho puntas, islitas, la sierpe del Pacífico, una ballena, el
//     barco que llega por el Atlántico (o.viaje 0–1) y, de adorno, el duende en su isla, el hada y el dragón. o.gemas
//     0–12 (por omisión 12): las doce gemas bajan una a una con su estela, se posan con un aro de luz en las doce
//     ciudades del guion (Chicago, Cleveland, Boston, Nueva York, Houston, Milwaukee, San Agustín, Nueva Orleans,
//     Montreal, Roanoke, Charleston, San Francisco) y encienden su medallón de la cenefa de abajo.
// Devuelve la geometría: siempre { suelo } (en el barco cambia en cada fotograma con el cabeceo; en 'doce' es null: no
// hay suelo, ahí va una mano), y además: bosque { camino(x), luna, castillo, puerta, criaturas, libre };
// barco { cubierta(t), x0, x1, alcazar, proa, cofre, palo, criaturas, hor }; orilla { sol, hor, orilla(y), duna(x),
// escondites, barco, bote, criaturas, libre }; doce { P, puntos, lista, colores, rosa, medallon(k) }.
// Llama a cuentoDelante después de los actores, con las mismas opciones.
export function cuento(R, t, o = {}) {
  const enc = o.encuadre ?? 'bosque', cam = o.camara ?? 'general';
  if (enc === 'orilla') return cam === 'doce' ? b_doce(R, t, o) : b_orilla(R, t, o);
  return cam === 'barco' ? b_barco(R, t, o) : b_bosque(R, t, o);
}
// lo de delante de los personajes en cada encuadre de cuento(); se llama después de los actores, con las mismas opciones:
// en el bosque, la hierba alta, los helechos y las setas grandes de las esquinas de abajo y unas luciérnagas; en el barco,
// la borda (tapa los pies de quien va en cubierta); en la orilla, el barrón de las esquinas; y siempre la orla
export function cuentoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'bosque', cam = o.camara ?? 'general';
  if (enc === 'orilla') return cam === 'doce' ? b_doceDelante(R, t, o) : b_orillaDelante(R, t, o);
  return cam === 'barco' ? b_barcoDelante(R, t, o) : b_bosqueDelante(R, t, o);
}
// ── C · Chicago, 1983 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'parque': Grant Park en el verano de 1983, visto hacia el lago: cielo tramado con nubes a tres velocidades, cometa y
//     gaviotas; el skyline de los ochenta (la torre negra escalonada con dos antenas, la de las aspas, la blanca, la
//     roja…) sobre el lago Michigan con veleros, un carguero y el faro; la arboleda y la gran fuente con sus chorros; el
//     paseo con paseantes, una corredora, farolas y un banco; el césped segado a franjas con flores, sombras de nubes,
//     palomas, una ardilla y un sendero de grava; una manta de picnic con cesta y radiocasete (x 232–268, y 140–157) y
//     una bici de cross (x 81–103, y 142–157); árboles que se mecen. o.hoyos 0–6 (hoyos con su montón de tierra, en
//     c_HOYOS); o.hora: 'dia' | 'tarde'. Devuelve { suelo: 150, horizonte: 64, hoyos, fuente, banco, picnic, bici, arboles }.
//     Cámara 'hoyo': el hoyo en corte: arriba el parque (skyline, lago, arboleda, paseo con gente, dos árboles grandes) y
//     abajo la tierra por capas (mantillo, tierra, arcilla, grava) con raíces, piedras, una botella, monedas, una lata, un
//     fósil, una herradura, un hormiguero con hormigas, una lombriz y una tubería que gotea. El hoyo (x 106–205, fondo
//     y = 122) deja ver su pared de atrás. o.caja 0–1: la tierra de la pared derecha se desmorona y asoma la esquina
//     de la caja transparente con el cofre (PIEZAS_CF.cofre), con un destello. o.hora también. Devuelve { suelo: 100
//     (el césped), fondo: 122, hoyo: { x0, x1 }, pared: 206, caja: [213, 113] (su centro), cofre: [213, 124] }.
//   'ciudad': la vieja torre del agua de piedra clara (gótica, con almenas, torrecillas y chapitel de cobre) en su
//     placita de la avenida: edificios de ladrillo, art déco y vidrio con toldos y escaparates, el rascacielos de las
//     aspas detrás, un carrito de perritos que humea, semáforo, buzón, boca de riego, gente, palomas que rodean la torre y
//     una alcantarilla con vapor. Los coches de 1983 (sedán, taxi a cuadros, ranchera con madera, autobús) pasan por
//     delante: van en chicagoDelante (o.trafico: 0 los quita). Devuelve { suelo: 153, torre, puerta, acera, carriles }.
//     Cámara 'sala': la fachada de ladrillo de la sala de conciertos, con tres ventanales en arco que reflejan las nubes,
//     DOS MEDALLONES con notas musicales (♪ y ♫) y sus placas de rayas, el friso, la marquesina con bombillas, las
//     puertas iluminadas y los carteles (sin letras); a la derecha, la plaza con la estatua de bronce de un hombre alto
//     con levita, de pie delante de su silla (Lincoln, de lejos), árboles, palomas y una farola con una banderola azul noche de ribete dorado y una corchea dorada grande (x 216–228, y 104–133).
//     Devuelve { suelo: 153, medallones, ventanales, puertas, estatua, figura, pedestal, farola, acera, carriles }.
//   En los cuatro, o.hora: 'tarde' da la luz de atardecer (también a la gente pequeña, las palomas, las flores y los
//   árboles que se pintan en vivo).
export function chicago(R, t, o = {}) {
  const enc = o.encuadre ?? 'parque', cam = o.camara ?? 'general';
  if (enc === 'ciudad') return cam === 'sala' ? c_sala(R, t, o) : c_torre(R, t, o);
  return cam === 'hoyo' ? c_hoyo(R, t, o) : c_parque(R, t, o);
}
// lo de delante de los personajes en cada encuadre de chicago(); se llama después de los actores, con las mismas opciones:
//   'parque' general: la mochila roja, matas de hierba en el borde de abajo y, si hay hoyos, un montón de tierra
//     (abajo a la derecha, por debajo de y = 160);
//   'parque' cámara 'hoyo': el montón de tierra sobre el césped a la izquierda del hoyo (x 56–100), la mochila a la
//     derecha (x 241–259) y las briznas del borde del césped; la pared de la caja queda libre;
//   'ciudad' (las dos cámaras): los coches de 1983 por los dos carriles (ruedas en y = 176 el de lejos y en y = 183 el
//     de cerca; ninguno sube de y = 157, así que no pisan la acera ni los pies de quien está en ella); o.trafico: 0 los quita.
//   Con o.hora: 'tarde' todo lo de delante se tiñe con la luz de la tarde (montón, mochila, briznas y coches) y los
//   coches llevan los faros y los pilotos encendidos.
export function chicagoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'parque', cam = o.camara ?? 'general', K = c_K;
  if (enc === 'ciudad') { if (o.trafico !== 0) c_trafico(R, t, o.hora === 'tarde'); return {}; }
  const Rv = o.hora === 'tarde' ? c_vivo(R) : R;   // con la luz de la tarde, lo de delante también se tiñe
  if (cam === 'hoyo') {
    c_monton(Rv, 78, 101, 22, 15, 3);
    c_mochila(Rv, 247, 100);
    for (let x = 0; x < 320; x += 3) { if (x > 100 && x < 210) continue; const m = Math.round(Math.sin(t * 2 + x * 0.4)); Rv.pset(x, 100, K.cS); Rv.pset(x + m, 99, K.cL); if (x % 9 === 0) Rv.pset(x + m, 98, K.c1); }
    return { monton: [78, 101], mochila: [247, 100] };
  }
  if ((o.hoyos ?? 0) > 0) c_monton(Rv, 272, 181, 26, 16, 5);
  c_mochila(Rv, 222, 177);
  for (let x = 1; x < 320; x += 4) { const a = 2 + Math.round(h(x, 1, 90) * 4), m = Math.round(Math.sin(t * 1.8 + x * 0.3) * 1.2); Rv.linea(x, 179, x + m, 179 - a, x % 3 ? K.cS : K.cL); }
  return { mochila: [222, 177] };
}
// ── D · Cleveland, 2004 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// hoyos, piedras, medallones…) para que la escena ponga a los personajes sin adivinar.
//   'jardin' (suelo 125 en la terraza, junto al muro; 160–172 en el césped de abajo): el jardín de estilo griego de un
//     parque de Cleveland en mayo de 2004. Cielo tramado con nubes de tres tonos y pájaros; al fondo la ciudad azulada,
//     una arboleda de primavera con cerezos en flor y cipreses; el MURO largo de piedra con cornisa, friso de nombres
//     grabados (rosetas y rayas, sin letras), tres medallones con su placa, pilastras, hiedra y dos alas más bajas (por
//     detrás pasan paseantes de los que solo asoma la cabeza); dos columnas dóricas estriadas a los lados; la terraza de
//     losas con el arriate de tulipanes al pie del muro y la fila de piedras que se cuentan; la escalinata; abajo, el
//     césped a franjas, los parterres de tulipanes y el estanque rectangular (agua que se mueve, surtidor, nenúfares,
//     patos). Los tres medallones llevan en pequeño los mismos relieves que de cerca (filósofo, lira, paleta). Vida:
//     pétalos que caen, mariposas, un gorrión en la cornisa, viento en la hierba y en las copas (una onda de hojas
//     claras), un banco de cúmulos bajos, un avión con su estela, una cometa que un niño vuela tras el ala izquierda,
//     un petirrojo que picotea en el césped, la regadera y el aspersor que gira.
//     o.hoyo 0–1 (el hoyo de Zinn, a la izquierda, con su montón de tierra) y o.hoyo2 0–1 (el del otro extremo, donde
//     aparece el cofre). Las urnas y los tulipanes del borde de abajo van en clevelandDelante.
//     Cámara 'muro' (suelo 147): el muro de cerca, que llena la pantalla: cornisa con dentículos, greca, sillares con
//     manchas y hiedra, y los TRES MEDALLONES en relieve (un filósofo de perfil, una lira, una paleta de pintor), cada
//     uno con su placa de rayas, por encima de las cabezas; al pie, el arriate de tulipanes, la hierba y la fila de doce
//     piedras rectangulares del suelo. o.cuenta 0–1: las piedras se iluminan una a una, cada una con su número (o.hasta:
//     cuántas se cuentan, 12 por omisión; o.alReves: se cuenta desde la derecha). o.hoyo y o.hoyo2 0–1: los dos hoyos
//     (izquierda, vacío; derecha, el bueno), con su montón; o.hoyoX / o.hoyo2X los mueven. Vida: sombras de ramas que se
//     mecen sobre el muro, pétalos, una lagartija, un gorrión, mariposas, la hierba al viento. Lo de delante (carretilla
//     con tierra, cubo con varillas de sondeo, matas del primer término) en clevelandDelante.
//   'biblioteca' (suelo 152): una biblioteca pública de los noventa: estanterías altas con lomos de colores,
//     la escalera de mano, el ventanal a la calle (nubes, edificios de ladrillo, árboles, coches y un autobús,
//     recortados al hueco), un lector pequeño que pasa páginas en la mesa del fondo, el fichero de cajoncitos con un
//     globo terráqueo que gira, lámparas colgantes verdes, el reloj, un mapa enmarcado, el parqué con la luz de la
//     ventana, la alfombra y el ordenador beige de 1997 (la pantalla carga una imagen línea a línea, el módem parpadea).
//     o.sinPantalla: la pantalla del ordenador en gris, para que la escena pinte la suya (en
//     .pantalla). La mesa de lectura de delante (lámpara verde, mapas desplegados, libros, lupa) en clevelandDelante.
//     Cámara 'despacho' (suelo 150): el despacho de un abogado de Nueva Jersey: papel pintado verde y friso de madera,
//     la ventana con persiana y las casas del barrio (árbol, valla, un coche que pasa), tres diplomas (sello y rayas),
//     el mapa de corcho con chinchetas e hilo rojo, la librería de tomos de leyes, el aparador con la pecera, la
//     balanza y el fax, el archivador, el perchero, el reloj, el sillón y la alfombra. El escritorio de delante (flexo
//     verde, el libro abierto —o.libro: false lo quita—, papeles, taza que humea y el teléfono, que con o.suena tiembla
//     y suena, y con o.descolgado: true queda sin auricular, con las horquillas vacías, para que la escena lo pinte
//     en la mano del personaje) en clevelandDelante.
export function cleveland(R, t, o = {}) {
  const enc = o.encuadre ?? 'jardin', cam = o.camara ?? 'general';
  if (enc === 'biblioteca') return cam === 'despacho' ? d_despacho(R, t, o) : d_biblioteca(R, t, o);
  return cam === 'muro' ? d_muro(R, t, o) : d_jardin(R, t, o);
}
// lo de delante de los personajes en cada encuadre de cleveland(); se llama después de los actores, con las mismas
// opciones: 'jardin' general, las dos urnas de piedra de las esquinas y el macizo de tulipanes del borde; 'muro', la
// carretilla con tierra (izquierda), el cubo con las varillas de sondeo (derecha) y las matas del primer término;
// 'biblioteca' general, la mesa de lectura (x 96–206, tablero en y 142); 'despacho', el escritorio (x 60–238, tablero
// en y 138) con el teléfono (o.suena; o.descolgado: sin auricular), el flexo, el libro abierto (o.libro: false lo quita), papeles y la taza.
export function clevelandDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'jardin', cam = o.camara ?? 'general';
  if (enc === 'biblioteca') return cam === 'despacho' ? d_despachoDelante(R, t, o) : d_bibliotecaDelante(R, t, o);
  return cam === 'muro' ? d_muroDelante(R, t, o) : d_jardinDelante(R, t, o);
}
// ── E · Boston, 2019 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'obras': el parque del North End en obras, una mañana de otoño de 2019, visto desde la acera: a la izquierda, la
//     valla metálica (un paño de malla naranja, otro despejado para mirar y otro naranja) con un montón de tierra y rollos
//     de césped detrás; la entrada de camiones abierta; dentro, el campo de sóftbol levantado (la arcilla del cuadro con
//     rodadas, tiras de césped arrancado, las líneas de cal a medias, la reja de detrás del bateador, estacas con cinta,
//     un charco), la caseta de obra, un váter portátil, tubos y montones; al fondo, el puerto con barcos, el puente
//     atirantado y la otra orilla con su obelisco; a la izquierda, las casas de ladrillo del barrio con escaleras de
//     incendios y árboles de otoño. Vida: nubes, gaviotas, barcos, coches en el puente, dos obreros pequeños, la bandera
//     de la caseta, la baliza, hojas que caen, el agua. o.base (true por omisión; false la quita y deja la marca): la
//     base del bateador, un pentágono blanco. La excavadora y los personajes los pone la escena. bostonDelante pone la
//     hoja de la verja abierta, la barrera con baliza, los conos y las hojas de delante (todo bajo, a la derecha).
//     Cámara 'hoyo': el hoyo de cerca y en corte: arriba, la valla (lonas verdes atadas por sus ojales, malla naranja y
//     paños de malla despejados), montones, árboles y los bajos de las casas; el suelo (los pies en y 126) y, debajo, el
//     terreno cortado con sus capas (mantillo, tierra, una hilada de grava, arcilla en láminas y fondo compacto, con
//     piedras, raíces, un tubo viejo, lombrices), la fosa antigua de tierra revuelta donde están los trozos (un cuenco
//     de x 130 a x 282) y el hoyo ya abierto, con su contorno; en el fondo del hoyo, en su
//     escalón y en la tierra de la fosa, los trozos
//     de plástico transparente y de cerámica (o.trozos 0–1, por omisión 1: cuántos de los diez se ven, empezando por el
//     del escalón, bajo la cuchara, que lleva el reloj de sol); o.hondo (0–1, por omisión 1): lo hondo que está ya el
//     hoyo (0, sin abrir). Vida: una ardilla por lo alto de la valla, palomas, lombrices, un topo en su galería, la gota
//     del tubo, hojas. La excavadora la pone la escena (ya NO se pintan sus orugas aquí). bostonDelante pone los
//     terrones y las hierbas del borde de delante.
//   'biblioteca': al atardecer, la fachada de una gran biblioteca pública de piedra: zócalo almohadillado, tres puertas
//     en arco con faroles de hierro y escalinata, una fila de ventanales en arco y, bajo cada uno, una lápida con nombres
//     grabados (rayas, sin letras) y un medallón; dos de las lápidas con su medallón se iluminan en oro con o.luz (0–1,
//     las dos a la vez) o cada una por su lado con o.luz1 (la de la izquierda, x 112) y o.luz2 (la de la derecha, x 144),
//     las dos 0–1 y opcionales: la que no se pase sigue a o.luz;
//     cornisa y tejado de teja con crestería verde; farolas, gente pequeña, palomas. A la derecha, lejos y sobre los
//     tejados, la iglesia de ladrillo con su campanario blanco y un farol encendido arriba (o.farol 0–1; por omisión 1).
//     bostonDelante pone la farola y los bolardos de delante y las hojas. Cámara 'ceremonia': una sala de un edificio
//     histórico de Brooklyn: zócalo de paneles de madera, dos ventanales en arco con cortinas (fuera, casas de piedra
//     parda, un árbol de otoño y nubes), una chimenea de mármol con un gran paisaje marino enmarcado encima, apliques,
//     cuadros de paisajes, un reloj de pie, flores, parqué y una gran alfombra; bostonDelante pone la mesa con el paño y
//     el cojín (devuelve { cojin: [x, y] }, donde se posa la piedra) y, abajo, las filas de sillas con el público de
//     espaldas.
// Devuelve la geometría del encuadre (suelo y los puntos que usan las escenas; ver e_GEO, más abajo).
export function boston(R, t, o = {}) {
  const enc = o.encuadre ?? 'obras', cam = o.camara ?? 'general';
  if (enc === 'biblioteca') return cam === 'ceremonia' ? e_ceremonia(R, t, o) : e_biblioteca(R, t, o);
  return cam === 'hoyo' ? e_hoyo(R, t, o) : e_obras(R, t, o);
}
// lo de delante de los personajes en cada encuadre de boston(); se llama después de los actores, con las mismas opciones
// ('obras': la verja abierta, la barrera y los conos; quien mira desde la acera se pinta después de esto; 'hoyo': el
// borde de delante; 'biblioteca': la farola, los bolardos y las hojas; 'ceremonia': la mesa con el cojín —devuelve
// { cojin: [x, y] }— y las sillas con el público)
export function bostonDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'obras', cam = o.camara ?? 'general';
  if (enc === 'biblioteca') return cam === 'ceremonia' ? e_ceremoniaDelante(R, t, o) : e_bibliotecaDelante(R, t, o);
  return cam === 'hoyo' ? e_hoyoDelante(R, t, o) : e_obrasDelante(R, t, o);
}
// ── F · Hoy ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve { suelo, … } con la geometría.
//   'estudio': el estudio de Atom, de día: moldura, papel pintado salvia de rayas y rombos (la esquina de Atom, solo
//     rayas), zócalo de cuarterones, tarima con la mancha de sol y sus motas, alfombra; la ventana con cortinas (por ella,
//     el parque: cielo con nubes de tres tonos a tres velocidades, pájaros, árboles que se mecen, la fuente, paseantes y
//     un perro), el sillón mostaza con el gato que duerme, las botas de agua, el mapa enmarcado con sus doce puntos, el
//     reloj que anda, la balda (libros, globo, brújula), el cesto de mapas enrollados, la librería y el escritorio con la
//     pila de libros, la lupa, el flexo encendido y la maceta grande (PIEZAS_CF.maceta a escala 2; o.hoyo: con el hoyo),
//     la pala de juguete clavada al lado (o.pala false la quita, para que la mueva la escena) y la llavecita en la mesa
//     (o.llave); una mariposa ronda la planta. Delante (hoyDelante): el cajón de jardinería y la planta del rincón.
//     Cámara 'maceta': la maceta de cerca, en corte, sobre la mesa: las paredes de barro en sección, el plato, la tierra
//     en capas (mantillo, piedras, grava de drenaje), las raíces, una lombriz, hormigas en su galería, la planta que se
//     mece y una mariquita por el labio; detrás, la pared, la ventana con el cielo y las copas, la cortina y el flexo;
//     en la mesa, sobres de semillas y una taza que humea. o.hoyo: el hoyo abierto con su montón; o.cofre 0–1: el cofre
//     (PIEZAS_CF.cofre a escala 2; o.sinCaja) baja por el hoyo hasta el fondo; o.tapa 0–1: el hoyo se rellena de tierra
//     removida (por omisión, tapado cuando o.cofre llega a 1); o.llave 0–1: la llave (a escala 2) sube desde el fondo
//     del hoyo hasta asomar entera, con su destello; o.pala false quita la pala de juguete. Delante: la lupa y un lápiz.
//   'mapa': el mapa mural de Norteamérica a pantalla completa (un inserto, sin sitio para personajes): el mapa grabado
//     de mapa() en su marco, con doce chinchetas, hilos rojos a cuatro fotos sujetas en el mar, uno de nuestros cuadros
//     y la nota con los que faltan (número y «?»). o.puntos (0–12; 12 por omisión): cuántas chinchetas han caído;
//     o.encontrados (0–3): Chicago, Cleveland y Boston se ponen verdes con su marca de visto; o.apagados (0–1): las
//     nueve que faltan se apagan a gris; o.dudas (0–1): los nueve interrogantes que saltan como palomitas; o.hilos y
//     o.fotos (false los quita). Devuelve { P, ciudades: { chicago, cleveland, boston, nuevaYork, houston, milwaukee,
//     sanAgustin, nuevaOrleans, montreal, roanoke, charleston, sanFrancisco }, lista (las doce, en ese orden), fotos,
//     nota, cuadro }. Cámara 'tele': un salón de 2018 al anochecer: el televisor grande con un programa de aventuras
//     genérico (selva, templo, un explorador con linterna, murciélagos; o.tele false lo apaga) y su resplandor que
//     cambia, el mueble bajo con sus pilotos, cuadros, la ventana con la ciudad que se enciende, el sofá, la mesilla con
//     su lámpara y polillas, tarima y alfombra. Delante (hoyDelante): la mesita con el portátil de la subasta (nuestro
//     libro, la gráfica de pujas y la cifra en dólares que sube con o.precio 0–1 de 35 a 1250) y las palomitas.
//   'parque': el parque de un fuerte, de día (o de noche con o.noche: luna, estrellas, luceros, una fugaz, murciélagos, la farola encendida,
//     luciérnagas y dos troneras con candil): cielo con nubes de tres tonos, la bahía con un velero, la muralla de ladrillo con troneras y poterna,
//     la bandera que ondea, dos robles, césped a franjas con flores, dos parches de tierra removida, un aspersor, el
//     sendero, un cañón antiguo con sus balas, banco, farola, papelera y, bien grande, la señal de «no excavar» (una
//     pala tachada, sin letras) con su placa; paseantes diminutos, una ardilla, palomas, mariposas y hojas que caen. El
//     guarda lo pone la escena. Delante: la valla baja de postes y cuerda y un macizo de flores. Cámara 'muelle': un
//     muelle de Charleston: cielo con nubes, el puente atirantado y la otra orilla, el barco museo gris (un portaaviones
//     sin número, con banderas de señales, radar que gira y visitantes diminutos), la bahía con oleaje, un velero y una
//     lancha, la marisma con una garza que pesca, dos palmitos, el paseo de tablas con barandilla de cuerda, farola con
//     salvavidas, catalejo de monedas, banco y una gaviota; o.cambio 0–1: en la otra orilla crecen edificios nuevos con
//     sus grúas mientras pasa una tormenta (nubarrones, lluvia, relámpagos, viento en los palmitos) que al llegar a 1
//     ya se ha ido. Delante: los pilotes de acá con su cuerda y un pelícano.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'mapa') return cam === 'tele' ? f_tele(R, t, o) : f_mapa(R, t, o);
  if (enc === 'parque') return cam === 'muelle' ? f_muelle(R, t, o) : f_parque(R, t, o);
  return cam === 'maceta' ? f_maceta(R, t, o) : f_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones:
// 'estudio' el cajón de jardinería (abajo a la izquierda) y las hojas de la planta grande (abajo a la derecha); 'maceta'
// la lupa y el lápiz del borde de la mesa; 'mapa' nada (el mapa llena el cuadro); 'tele' la mesita baja con el portátil
// de la subasta (o.precio) y el cuenco de palomitas; 'parque' la valla baja de troncos con su cuerda y las matas de
// delante; 'muelle' la barandilla de cuerda del pantalán con sus pilotes y el pelícano.
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'mapa') return cam === 'tele' ? f_teleDelante(R, t, o) : {};
  if (enc === 'parque') return cam === 'muelle' ? f_muelleDelante(R, t, o) : f_parqueDelante(R, t, o);
  return cam === 'maceta' ? f_macetaDelante(R, t, o) : f_estudioDelante(R, t, o);
}
// la paleta de la editorial (un loft de ladrillo pintado) y la del banco (acero, latón, mármol y terciopelo)
const a_E = pal({
  techo: '#a39680', techoS: '#93866f', techoL: '#b0a48e', pared: '#dccba6', paredS: '#cebc95', paredL: '#e7d9ba', junta: '#cbb991',
  marco: '#3c3444', marcoL: '#6c6074', alfeizar: '#d6ccb8', suelo: '#a8743c', sueloS: '#8a5c2e', sueloL: '#c08a4c', sueloD: '#5e3a1e',
  carton: '#c89a5e', cartonS: '#a47840', cartonL: '#e0b87c', cinta: '#ecdcb0', alfombra: '#8a3a3e', alfombraS: '#6c2a30', alfombraL: '#d8a850',
  tablero: '#e9e1cc', tableroS: '#c9bfa6', lapiz: '#7a9ad0', yeso: '#b3bfa8', yesoS: '#a5b29a', yesoL: '#bfcab4', nogal: '#5c3a22', nogalS: '#40260f', nogalL: '#7c5232', nogalV: '#4c2e18',
  corcho: '#c49a62', corchoS: '#a87e4a', cuero: '#6e2630', cueroS: '#52181f', cueroL: '#8a3a44', vade: '#2e5a4a', vadeS: '#234638', vadeL: '#3d705c',
  beige: '#d8ccb0', beigeS: '#b4a888', beigeL: '#ece2c8', pantalla: '#16283c', fosforo: '#7ae0a0',
});

const a_B = pal({
  acero: '#8d97a8', aceroS: '#6a7486', aceroL: '#b6c0ce', aceroD: '#474f60', aceroB: '#dfe6ee', hueco: '#161a26', laton: '#d6a83c', latonS: '#9a7420', latonL: '#f6e08a',
  techo: '#5d6474', techoS: '#4c5362', marmol: '#dcd7c8', marmolS: '#bdb7a6', verde: '#4d6c62', verdeS: '#39544b', verdeL: '#6c8c80', vena: '#f4f0e6',
  terciopelo: '#5c1a2c', terciopeloS: '#43101f', terciopeloL: '#7c2a40', caoba: '#6e3420', caobaS: '#4e2212', caobaL: '#904a2c',
  vestibulo: '#d9c79c', vestibuloS: '#b9a678',
});

// el tinte del atardecer de 2005
const a_TARDE = hex('#f08a4a');

// la trama ordenada de 4 × 4 (umbrales de 0 a 1) de los cielos y las luces
const a_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16);

// los búferes de los fondos fijos de cada lienzo
const a_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en un búfer propio (por R y por clave) y se copia en cada fotograma
function a_fijo(R, clave, dibuja) {
  let m = a_CACHE.get(R); if (!m) a_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla dos colores (a = 0: el primero; a = 1: el segundo)
const a_mez = (c, d, a) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255; return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0; };

// vela un píxel con un color (luces, sombras y reflejos sobre lo ya pintado)
function a_velo(R, x, y, col, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y); if (c) R.pset(x, y, a_mez(c, col, a)); }

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function a_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// una sombra o una luz en elipse, tramada (a: fuerza)
function a_charco(R, cx, cy, rx, ry, col, a, trama = true) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) if (!trama || ((x + cy + j) & 1) === 0) a_velo(R, x, cy + j, col, a); }
}

// cifras de 3 × 5 para las placas de las cajas (s: escala); (x, y) es la esquina de arriba a la izquierda
const a_CIF = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];

function a_num(R, txt, x, y, c, s = 1) {
  [...String(txt)].forEach((ch, n) => { const g = a_CIF[ch.charCodeAt(0) - 48]; if (!g) return;
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.rect(x + (n * 4 + i) * s, y + j * s, x + (n * 4 + i) * s + s - 1, y + j * s + s - 1, c); });
}

// pared de ladrillo pintado: hiladas de 5 px a matajunta y algún ladrillo más claro o más oscuro; en calma = [x, y] (la
// esquina de Atom: de x a la derecha y de y hacia arriba) solo quedan las hiladas
function a_ladrillos(R, x0, y0, x1, y1, c, cS, cL, cJ, k = 0, calma = null) {
  R.rect(x0, y0, x1, y1, c);
  for (let f = 0, y = y0; y <= y1; y += 5, f++) { if (y + 4 <= y1) R.rect(x0, y + 4, x1, y + 4, cJ); const dx = (f & 1) * 6;
    for (let x = x0 - 12 + dx; x <= x1; x += 12) { const enCalma = calma && x + 12 > calma[0] && y < calma[1]; if (enCalma) continue;
      if (x >= x0) R.rect(x, y, x, Math.min(y1, y + 3), cJ);
      const q = h(x, y, 500 + k); if (q < 0.1 || q > 0.9) R.rect(Math.max(x0, x + 1), y, Math.min(x1, x + 11), Math.min(y1, y + 3), q < 0.1 ? cS : cL); } }
}

// suelo de tablas a lo largo: hiladas que se ensanchan hacia la cámara, testas a matajunta, tablas de tres tonos y vetas
function a_tablas(R, y0, y1, c, cS, cL, cD, k = 0) {
  let y = y0, a = 4, f = 0;
  while (y <= y1) { const yb = Math.min(y1, y + a - 1); let x = -Math.round(h(f, 1, 530 + k) * 60);
    while (x < 320) { const L = Math.round((36 + h(x, f, 531 + k) * 44) * (0.7 + a / 12)), q = h(x, f, 532 + k);
      R.rect(x, y, x + L - 1, yb, q < 0.28 ? a_mez(c, cS, 0.45) : q > 0.78 ? a_mez(c, cL, 0.4) : c); R.rect(x + L - 1, y, x + L - 1, yb, cD);
      for (let g = 0; g < 1 + (a >> 2); g++) { const gy = y + Math.floor(h(x, g, 533 + k + f) * Math.max(1, a - 1)), gx = x + 2 + Math.floor(h(x, g, 534 + f) * L * 0.6);
        if (gy < yb) R.rect(Math.max(0, gx), gy, Math.min(gx + 5 + Math.floor(h(gx, gy, 535) * 16), x + L - 3), gy, g % 2 ? cS : cL); }
      x += L; }
    R.rect(0, yb, 319, yb, cD); y += a; a = Math.round(a * 1.22 + 0.6); f++; }
}

// una fila de lomos de libros de pie entre xa y xb, apoyados en yb (sin letras: una banda y un brillo); lleno 0–1: cuántos
// quedan (en la mudanza, pocos); de vez en cuando, tres tumbados
const a_LOMOS = ['#c83a3a', '#2a4fa8', '#e8b830', '#3a8a4a', '#6a3a8a', '#e8803a', '#4a78d0', '#8e2424', '#f0e8d4', '#2a5a3a', '#e87a9a', '#3a3a7a', '#62b8c8'].map(hex);

function a_lomos(R, xa, xb, yb, k, lleno = 1, alto = 11) {
  let x = xa;
  while (x < xb - 1) {
    const q = h(x, yb, 520 + k), w = 2 + Math.floor(h(x, yb, 521 + k) * 3);
    if (x + w - 1 > xb) break;
    if (q > lleno) { x += w + 1; continue; }
    if (q < 0.08 * lleno && x + 9 < xb) { for (let i = 0; i < 3; i++) { const c = a_LOMOS[Math.floor(h(x, i, 522 + k) * a_LOMOS.length)]; R.rect(x, yb - 1 - i * 2, x + 8 - i, yb - i * 2, c); R.pset(x + 1, yb - 1 - i * 2, C.blanco); } x += 10; continue; }
    const a = alto - 3 + Math.floor(h(x, yb, 523 + k) * 4), c = a_LOMOS[Math.floor(h(x, yb, 524 + k) * a_LOMOS.length)];
    R.rect(x, yb - a + 1, x + w - 1, yb, c); R.rect(x, yb - a + 1, x, yb, a_mez(c, C.blanco, 0.32));
    if (w > 2) { R.rect(x + 1, yb - a + 3, x + w - 1, yb - a + 3, a_mez(c, C.k, 0.4)); R.pset(x + 1, yb - 2, a_mez(c, C.blanco, 0.55)); R.rect(x + w - 1, yb - a + 1, x + w - 1, yb, a_mez(c, C.k, 0.25)); }
    x += w;
  }
}

// una caja de cartón (libros o mudanza): caras con luz y sombra, la cinta de embalar y, con marca, un librito pintado
function a_caja(R, x0, y0, x1, y1, marca = true, k = 0) {
  const E = a_E; R.rect(x0, y0, x1, y1, C.k); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, E.carton); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, E.cartonL); R.rect(x1 - 3, y0 + 3, x1 - 1, y1 - 1, E.cartonS); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, E.cartonS);
  const xm = (x0 + x1) >> 1; R.rect(xm - 2, y0 + 1, xm + 1, Math.min(y1 - 1, y0 + 5), E.cinta); R.rect(xm - 2, y0 + 1, xm + 1, y0 + 1, C.blanco);
  for (let i = 0; i < 4; i++) { const x = x0 + 3 + Math.floor(h(i, k, 540) * Math.max(1, x1 - x0 - 8)), y = y0 + 4 + Math.floor(h(i, k, 541) * Math.max(1, y1 - y0 - 6)); R.rect(x, y, x + 2, y, E.cartonS); }
  if (marca && x1 - x0 > 16 && y1 - y0 > 10) { const bx = x0 + 4, by = y1 - 7; R.rect(bx, by, bx + 5, by + 4, C.rojoS); R.rect(bx + 1, by + 1, bx + 4, by + 1, E.cartonL); R.rect(bx + 1, by + 3, bx + 3, by + 3, E.cartonL); }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba); se pinta con discos, así que la recorta R.recorte
function a_nube(R, cx, cy, w, [s, c, l]) {
  cx = Math.round(cx); const r = Math.max(2, w / 4), B = [[-w / 2, 1, r * 0.8], [-w / 5, -1, r * 1.1], [w / 6, -2, r * 1.25], [w / 2.1, 0.5, r * 0.85]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.6, rr, s);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr, c);
  for (const [dx, dy, rr] of B) if (rr > 2) R.disco(cx + dx - 0.8, cy + dy - 1.2, rr - 1.4, l);
}

// un depósito de agua de azotea: patas de hierro con su cruz, la cuba de duelas con dos aros, luz a la izquierda y sombra
// a la derecha, y el tejadillo en cono; (cx, yb) el centro de las patas abajo; s: tamaño
function a_deposito(R, cl, cx, yb, s, P) {
  const w = Math.round(5 * s), a = Math.round(9 * s), pt = Math.round(5 * s), y1 = yb - pt, y0 = y1 - a;
  for (const d of [-1, 1]) R.linea(cx + d * (w - 1), y1, cx + d * w, yb, P.hierro); R.linea(cx - w + 1, y1 + 1, cx + w, yb - 1, P.hierro); R.linea(cx + w - 1, y1 + 1, cx - w, yb - 1, P.hierro);
  a_rc(R, cl, cx - w - 1, y1, cx + w + 1, y1, P.hierro);
  a_rc(R, cl, cx - w, y0, cx + w, y1 - 1, P.cuba);
  for (let x = cx - w; x <= cx + w; x++) { const u = (x - cx + w) / (2 * w); if (x >= cl[0] && x <= cl[2]) for (let y = Math.max(cl[1], y0); y <= Math.min(cl[3], y1 - 1); y++) { if (u < 0.22) R.pset(x, y, P.cubaL); else if (u > 0.72) R.pset(x, y, P.cubaS); else if ((x - cx) % 2 === 0 && s > 1.2) R.pset(x, y, a_mez(P.cuba, P.cubaS, 0.35)); } }
  for (const f of [0.25, 0.7]) a_rc(R, cl, cx - w, y0 + Math.round(a * f), cx + w, y0 + Math.round(a * f), P.hierro);
  R.poligono([[cx - w - 1.5, y0], [cx + w + 2.5, y0], [cx + 0.5, y0 - Math.round(4 * s)]], P.tejado);
  R.linea(cx - w - 1, y0 - 1, cx, y0 - Math.round(4 * s), P.cubaL); R.pset(cx, y0 - Math.round(4 * s) - 1, P.hierro);
}

// los colores de la vista de Manhattan: de día (a_VD) y al atardecer de 2005 (a_VT)
const a_VD = { cielo: ['#3f8fdc', '#5aa6e8', '#7cbcf0', '#a4d4f4', '#cfe6f2', '#ecdfc0'].map(hex), nube: ['#b9cfe6', '#eef4fa', '#ffffff'].map(hex), lejos: hex('#9fb6d0'), lejosL: hex('#b4c8de'),
  medio: ['#a85a44', '#8f8478', '#b98a5a', '#7c6a74'].map(hex), ventana: hex('#34425e'), ventanaL: hex('#a8d0ea'), hierro: hex('#3a3440'), cuba: hex('#8a5a36'), cubaL: hex('#b07a4a'), cubaS: hex('#5e3a22'), tejado: hex('#4c4450'), ave: hex('#3a3848'), vapor: hex('#f4f8fc') };

const a_VT = { cielo: ['#3a3a7a', '#6a4688', '#a0507a', '#d86a5a', '#f09a58', '#f8c870'].map(hex), nube: ['#7a4a7a', '#e88a6a', '#fcd08a'].map(hex), lejos: hex('#7a4a78'), lejosL: hex('#96587c'),
  medio: ['#5a2c38', '#4a3a52', '#6a3a34', '#40304a'].map(hex), ventana: hex('#2a2038'), ventanaL: hex('#ffd870'), hierro: hex('#20182a'), cuba: hex('#4a2a2c'), cubaL: hex('#c8683c'), cubaS: hex('#2e1a22'), tejado: hex('#2a2030'), ave: hex('#2a2038'), vapor: hex('#f8c8a0') };

// Manhattan por la ventana cl = [x0, y0, x1, y1], todo recortado a su hueco: cielo tramado, sol bajo (tarde), nubes de
// tres tonos a cuatro velocidades, una bandada, las torres lejanas con su antena que parpadea, los edificios de ladrillo
// con ventanas (alguna se enciende y se apaga), depósitos de agua, una chimenea con vapor, antenas, un vecino en la azotea
// y la escalera de incendios del edificio de al lado; v = 1: otra vista, con un depósito grande de cerca
function a_vistaNY(R, t, cl, tarde, v = 0) {
  const [x0, y0, x1, y1] = cl, { pset, disco, linea } = R, W = x1 - x0 + 1, H = y1 - y0 + 1, P = tarde ? a_VT : a_VD, n = P.cielo.length;
  R.recorte(cl);
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / H * (n - 1); for (let x = x0; x <= x1; x++) pset(x, y, P.cielo[Math.min(n - 1, Math.floor(f + a_BAYER[(y & 3) * 4 + (x & 3)]))]); }
  if (tarde) { const sx = x0 + Math.round(W * (v ? 0.3 : 0.6)), sy = y1 - 22; for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j); if (d < 12 && a_BAYER[((sy + j) & 3) * 4 + ((sx + i) & 3)] > d / 12) pset(sx + i, sy + j, hex('#fbd98a')); } disco(sx, sy, 6, hex('#fff0b8')); disco(sx, sy, 4.5, hex('#fffbe6')); }
  for (const [k, yy, w, vel] of [[0, 9, 17, 1.7], [1, 19, 12, 2.8], [2, 4, 9, 0.9], [3, 27, 14, 1.25]]) { const span = W + 2 * w + 36; a_nube(R, x0 - w - 8 + ((k * 57 + v * 31 + t * vel) % span), y0 + yy, w, P.nube); }
  // las torres lejanas
  for (let k = 0; k * 8 < W + 8; k++) { const x = x0 + k * 8 - 3, hh = 12 + Math.round(h(k, 1, 550 + v) * 15); a_rc(R, cl, x, y1 - 14 - hh, x + 6, y1, k % 3 ? P.lejos : P.lejosL); if (h(k, 2, 550 + v) < 0.35) a_rc(R, cl, x + 2, y1 - 17 - hh, x + 3, y1 - 14 - hh, P.lejos);
    if (tarde) for (let i = 0; i < 3; i++) if (h(k, i, 551) < 0.5) pset(x + 1 + i * 2, y1 - 12 - Math.round(h(k, i, 552) * hh), hex('#f8c870')); }
  { const ex = x0 + Math.round(W * (v ? 0.78 : 0.34)), eb = y1 - 10; a_rc(R, cl, ex - 5, eb - 30, ex + 5, y1, P.lejos); a_rc(R, cl, ex - 3, eb - 37, ex + 3, eb - 30, P.lejos); a_rc(R, cl, ex - 1, eb - 42, ex + 1, eb - 37, P.lejos); a_rc(R, cl, ex, eb - 48, ex, eb - 42, P.lejos);
    a_rc(R, cl, ex - 5, eb - 30, ex - 5, y1, P.lejosL); a_rc(R, cl, ex - 3, eb - 37, ex - 3, eb - 30, P.lejosL); if (Math.floor(t * 1.5) % 2) pset(ex, eb - 49, C.rojo);
    const cx = x0 + Math.round(W * (v ? 0.12 : 0.72)); a_rc(R, cl, cx - 3, eb - 22, cx + 3, y1, P.lejosL); for (let i = 0; i < 4; i++) disco(cx + 0.5, eb - 23 - i * 3, 3.6 - i * 0.9, P.lejosL); a_rc(R, cl, cx, eb - 39, cx, eb - 33, P.lejosL); }
  // la bandada
  { const span = W + 70, bx = x1 + 20 - ((t * 7 + v * 40) % span); for (let k = 0; k < 6; k++) { const x = Math.round(bx + k * 5 + (k % 2) * 2), y = Math.round(y0 + 13 + (k % 3) * 3 + Math.sin(t * 1.3 + k) * 2), al = Math.floor(t * 5 + k) % 2 ? -1 : 1; pset(x, y, P.ave); pset(x - 1, y + al, P.ave); pset(x + 1, y + al, P.ave); } }
  // los edificios de en medio, con sus azoteas
  const N = v ? 3 : 4, an = Math.ceil((W + 6) / N);
  for (let k = 0; k < N; k++) {
    const bx = x0 - 3 + k * an, bw = an - 2, top = y1 - (v ? 5 + Math.round(h(k, 3, 553) * 5) : 15 + Math.round(h(k, 3, 554) * 13)), c = P.medio[(k + v) % 4];
    a_rc(R, cl, bx, top, bx + bw, y1, c); a_rc(R, cl, bx, top, bx + 1, y1, a_mez(c, P.cielo[n - 1], 0.3)); a_rc(R, cl, bx + bw - 2, top, bx + bw, y1, a_mez(c, C.k, 0.3));
    a_rc(R, cl, bx - 1, top - 1, bx + bw + 1, top, a_mez(c, C.k, 0.4)); a_rc(R, cl, bx - 1, top - 2, bx + bw + 1, top - 2, a_mez(c, P.cielo[n - 1], 0.45));
    for (let y = top + 3; y < y1 - 1; y += 6) for (let x = bx + 4; x < bx + bw - 4; x += 5) { const q = h(x, y, 555 + k), luz = tarde ? q < 0.5 && h(x, y, Math.floor(t * 0.15 + q * 7)) < 0.85 : q < 0.25;
      a_rc(R, cl, x, y, x + 2, y + 3, luz ? P.ventanaL : P.ventana); if (!tarde) pset(x, y, P.ventanaL); a_rc(R, cl, x - 1, y + 4, x + 3, y + 4, a_mez(c, P.cielo[n - 1], 0.35)); }
    // en la azotea: depósito, chimenea con vapor, antena o un vecino que pasea
    const tipo = (k + v * 2) % 4, ax = bx + (bw >> 1);
    if (v && k === 1) a_deposito(R, cl, ax + 2, top - 2, 2.1, P);
    else if (tipo === 0 || tipo === 2) a_deposito(R, cl, ax + (tipo ? 3 : -3), top - 2, tipo ? 1 : 1.4, P);
    if (tipo === 1 || (v && k === 0)) { const qx = bx + 5; a_rc(R, cl, qx, top - 8, qx + 3, top - 2, a_mez(c, C.k, 0.35)); a_rc(R, cl, qx - 1, top - 9, qx + 4, top - 8, P.hierro);
      for (let i = 0; i < 6; i++) { const u = ((t * 0.45 + i / 6) % 1), px = qx + 1.5 + Math.sin(u * 5 + i * 2) * 2.5 + u * 5, py = top - 10 - u * 16; if (a_BAYER[i * 2 + 1] < 1.1 - u) disco(px, py, 1 + u * 2.2, u > 0.6 ? a_mez(P.vapor, P.cielo[1], 0.5) : P.vapor); } }
    if (tipo === 3 || tipo === 1) { const qx = bx + bw - 6; linea(qx, top - 2, qx, top - 12, P.hierro); linea(qx - 3, top - 11, qx + 3, top - 11, P.hierro); linea(qx - 2, top - 8, qx + 2, top - 8, P.hierro); }
    if (tipo === 3) { const u = (t * 0.12 + 0.3) % 2, fx = Math.round(bx + 4 + (u < 1 ? u : 2 - u) * (bw - 16)), fy = top - 3, p = Math.floor(t * 4) % 2; pset(fx, fy - 5, hex('#f6c290')); a_rc(R, cl, fx, fy - 4, fx, fy - 2, tarde ? C.blanco : C.rojo); pset(fx - p, fy - 1, P.hierro); pset(fx + p, fy, P.hierro);
      for (let i = 0; i < 3; i++) { const px = bx + bw - 14 + i * 3, salta = Math.floor(t * 1.5 + i * 0.7) % 5 === 0; pset(px, top - 3 - (salta ? 1 : 0), P.ave); pset(px + 1, top - 4 - (salta ? 1 : 0), P.ave); } }
  }
  // el edificio de al lado, muy cerca, con su escalera de incendios
  { const lx = v ? x0 : x1 - 13, lw = 13, c = tarde ? hex('#4a2028') : hex('#8a4636'), cS = tarde ? hex('#361620') : hex('#6c3226');
    a_rc(R, cl, lx, y0, lx + lw, y1, c); for (let y = y0 + 2; y <= y1; y += 3) a_rc(R, cl, lx, y, lx + lw, y, cS); a_rc(R, cl, v ? lx + lw : lx, y0, v ? lx + lw : lx, y1, P.hierro);
    for (let y = y0 + 9; y < y1; y += 17) { a_rc(R, cl, lx + 3, y, lx + 9, y + 8, P.hierro); a_rc(R, cl, lx + 4, y + 1, lx + 8, y + 7, tarde && h(y, 1, 556) < 0.7 ? P.ventanaL : P.ventana); a_rc(R, cl, lx + 6, y + 1, lx + 6, y + 7, P.hierro);
      a_rc(R, cl, lx + 1, y + 10, lx + 12, y + 10, P.hierro); for (let x = lx + 1; x <= lx + 12; x += 2) a_rc(R, cl, x, y + 6, x, y + 10, P.hierro); linea(lx + 2, y + 10, lx + 11, y + 26, P.hierro); } }
  // el reflejo del cristal
  for (const sx of [x0 + Math.round(W * 0.2), x0 + Math.round(W * 0.62)]) for (let j = 0; j < H; j++) { const x = sx + Math.round((H - j) * 0.45); for (let i = 0; i < 3; i++) if (x + i >= x0 && x + i <= x1 && ((x + i + j) & 1) === 0) a_velo(R, x + i, y0 + j, C.blanco, 0.2); }
  R.recorte(null);
}

// un caballete de madera con un cuadro NUESTRO (n 0–3; null: vacío); (x, base): entre las patas, en el suelo
function a_caballete(R, x, base, n) {
  const { linea, rect } = R, K = C.k;
  linea(x + 3, base - 42, x + 8, base - 3, C.maderaS);
  for (const d of [-1, 1]) { linea(x + d * 3, base - 44, x + d * 12, base, K); linea(x + d * 2, base - 44, x + d * 11, base, C.madera); linea(x + d, base - 44, x + d * 10, base, d < 0 ? C.maderaL : C.maderaS); }
  rect(x - 1, base - 50, x + 1, base - 12, K); rect(x, base - 49, x, base - 13, C.maderaL); rect(x - 9, base - 5, x + 9, base - 5, C.maderaS);
  if (n != null) PIEZAS_CF.cuadro(R, x, base - 13, { n }); else rect(x - 3, base - 40, x + 3, base - 38, K);
  rect(x - 15, base - 13, x + 15, base - 11, K); rect(x - 14, base - 13, x + 14, base - 12, C.maderaL);
}

// un reloj de pared: aro, esfera con marcas, las dos agujas (h0: la hora al empezar) y el segundero rojo a saltos
function a_reloj(R, cx, cy, r, t, h0 = 10.15, aro = C.maderaS) {
  const { disco, pset, linea } = R; disco(cx, cy, r + 1.5, C.k); disco(cx, cy, r + 0.5, aro); disco(cx, cy, r - 1, C.blanco);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx - 0.5 + Math.cos(a) * (r - 2)), Math.round(cy - 0.5 + Math.sin(a) * (r - 2)), k % 3 ? C.grisL : C.grisS); }
  const hh = (h0 + t / 3600) / 12 * Math.PI * 2 - Math.PI / 2, mm = ((h0 % 1) + t / 3600) * Math.PI * 2 - Math.PI / 2, ss = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
  linea(cx - 0.5, cy - 0.5, cx - 0.5 + Math.cos(hh) * (r - 4), cy - 0.5 + Math.sin(hh) * (r - 4), C.k); linea(cx - 0.5, cy - 0.5, cx - 0.5 + Math.cos(mm) * (r - 2.5), cy - 0.5 + Math.sin(mm) * (r - 2.5), C.k);
  linea(cx - 0.5, cy - 0.5, cx - 0.5 + Math.cos(ss) * (r - 2), cy - 0.5 + Math.sin(ss) * (r - 2), C.rojo);
}

// una figurita de fondo de 9 px (pies en y): ps pinta cada punto (para recortarla a un hueco)
function a_figurita(ps, x, y, t, ropa, pelo, anda = true) {
  const p = anda ? Math.floor(t * 4) % 2 : 0, piel = hex('#f0c090');
  ps(x, y - 8, pelo); ps(x + 1, y - 8, pelo); ps(x, y - 7, piel); ps(x + 1, y - 7, piel); for (let j = 6; j >= 3; j--) { ps(x, y - j, ropa); ps(x + 1, y - j, ropa); }
  ps(x - 1, y - 5 - p, ropa); ps(x + 2, y - 5 + p - 1, ropa); ps(x, y - 2, C.k); ps(x + 1, y - 2, C.k); ps(x - p, y - 1, C.k); ps(x + 1 + p, y - 1, C.k); ps(x - p, y, C.k); ps(x + 1 + p, y, C.k);
}

// una maceta con una planta de hojas que se mecen; (x, y): centro de la base
function a_planta(R, x, y, t, s = 1, k = 0) {
  const { rect, linea, pset } = R, v = hex('#3a8a4a'), vL = hex('#5cb05a'), vS = hex('#24603a');
  for (let i = 0; i < 5 + s * 2; i++) { const a = -Math.PI / 2 + (i - (2 + s)) * 0.42, L = (6 + (i % 3) * 2) * s, m = Math.sin(t * 1.3 + i * 1.7 + k) * 0.8, ex = x + Math.cos(a) * L + m, ey = y - 5 * s - 1 + Math.sin(a) * L * 1.1;
    linea(x, y - 5 * s, ex, ey, i % 2 ? v : vS); linea(x + 1, y - 5 * s, ex + 1, ey, i % 2 ? vL : v); pset(Math.round(ex), Math.round(ey), vL); }
  rect(x - 3 * s, y - 5 * s, x + 3 * s, y, C.k); rect(x - 3 * s + 1, y - 5 * s + 1, x + 3 * s - 1, y - 1, C.naranjaS); rect(x - 3 * s + 1, y - 5 * s + 1, x + 3 * s - 1, y - 5 * s + 1, C.naranja); rect(x - 3 * s + 1, y - 5 * s + 1, x - 3 * s + 1, y - 1, C.naranja);
}

// LA EDITORIAL, cámara general: lo fijo (pared de ladrillo, marco del ventanal, radiador, estantería, puerta, tablas,
// alfombra, la luz del ventanal en el suelo, la mesa de dibujo, el escritorio, los caballetes y las cajas)
function a_estudioFijo(R, ep, mud) {
  const { rect, pset, linea, poligono, disco } = R, E = a_E, K = C.k, tarde = ep >= 2005;
  // el techo de yeso con sus vigas y el tubo de los rociadores
  rect(0, 0, 319, 13, E.techo); for (let x = 14; x < 320; x += 34) { rect(x, 0, x + 1, 11, E.techoS); rect(x + 2, 0, x + 2, 11, E.techoL); }
  rect(0, 8, 319, 8, E.techoL); rect(0, 9, 319, 9, E.techoS); rect(0, 12, 319, 13, E.techoS); for (let x = 30; x < 320; x += 68) rect(x, 7, x + 1, 10, E.techoS);
  // la pared de ladrillo pintado, con la sombra del techo y el zócalo
  a_ladrillos(R, 0, 14, 319, 112, E.pared, E.paredS, E.paredL, E.junta, 0, [262, 50]); rect(0, 14, 319, 14, E.paredS);
  for (let x = 0; x < 320; x++) if ((x & 1) === 0) pset(x, 15, E.paredS);
  rect(0, 107, 319, 112, K); rect(0, 108, 319, 111, C.maderaS); rect(0, 108, 319, 108, C.maderaL);
  // el ventanal de hierro (la vista se pinta en cada fotograma) y su alféizar
  rect(17, 19, 129, 89, K); rect(18, 20, 128, 88, E.marco); rect(18, 20, 128, 20, E.marcoL); rect(18, 20, 18, 88, E.marcoL); rect(20, 22, 126, 86, K);
  rect(14, 89, 132, 92, K); rect(15, 89, 131, 91, E.alfeizar); rect(15, 89, 131, 89, C.blanco); for (let x = 16; x < 131; x++) if (x & 1) pset(x, 93, E.paredS);
  // el radiador de hierro bajo la ventana, con su llave y su tubo
  rect(61, 95, 101, 111, K); for (let x = 62; x <= 98; x += 4) { rect(x, 96, x + 2, 110, C.grisL); rect(x, 96, x, 110, C.blanco); rect(x + 2, 97, x + 2, 110, C.gris); rect(x + 3, 96, x + 3, 110, C.grisS); rect(x, 96, x + 2, 96, C.blanco); }
  rect(102, 103, 105, 106, K); rect(103, 104, 104, 105, C.oro); rect(103, 107, 104, 111, C.grisS);
  // la estantería de libros ilustrados y cómics (en la mudanza, medio vacía), con rollos de carteles encima
  rect(130, 22, 200, 112, K); rect(131, 23, 199, 24, C.maderaL); rect(131, 25, 199, 111, C.maderaS); rect(131, 25, 132, 111, C.madera); rect(198, 25, 199, 111, C.maderaD);
  for (let i = 0; i < 6; i++) { const ys = 27 + i * 14; rect(133, ys, 197, ys + 12, hex('#3a2416')); rect(133, ys, 197, ys + 1, hex('#2a180e')); rect(133, ys + 13, 197, ys + 13, C.maderaL);
    if (i === 1) { a_lomos(R, 134, 178, ys + 12, i, mud ? 0.3 : 1); disco(188, ys + 6, 4.5, K); disco(188, ys + 6, 3.5, hex('#3a78c8')); rect(186, ys + 4, 188, ys + 6, hex('#5aaa5a')); pset(190, ys + 7, hex('#5aaa5a')); pset(186, ys + 3, C.blanco); rect(186, ys + 11, 190, ys + 12, C.oroS); rect(188, ys + 10, 188, ys + 10, C.oroS); }
    else if (i === 3 && !mud) { for (let j = 0; j < 9; j++) rect(135 + (j % 2), ys + 12 - j, 152 - (j % 3), ys + 12 - j, a_LOMOS[(j * 5) % a_LOMOS.length]); for (let j = 0; j < 9; j += 2) pset(136, ys + 12 - j, C.blanco); a_lomos(R, 156, 196, ys + 12, i); }
    else if (i === 0) { a_lomos(R, 134, 182, ys + 12, i, mud ? 0.25 : 1); rect(187, ys + 4, 193, ys + 5, C.oro); rect(188, ys + 6, 192, ys + 8, C.oro); rect(190, ys + 9, 190, ys + 10, C.oroS); rect(188, ys + 11, 192, ys + 12, C.oroS); pset(188, ys + 4, C.oroL); pset(189, ys + 6, C.oroL); }
    else a_lomos(R, 134, 196, ys + 12, i, mud ? (i === 5 ? 0.5 : 0.22) : 1); }
  for (const [x, w, c] of [[138, 26, C.blanco], [142, 30, E.cinta], [176, 18, C.blanco]]) { rect(x, 18, x + w, 21, K); rect(x, 19, x + w, 20, c); rect(x, 19, x, 20, C.grisL); rect(x + 4, 19, x + 5, 20, C.rojo); }
  // la pared de los caballetes: en la mudanza, los cercos claros de los cuadros que ya no están
  if (mud) for (const [a, b, c, d] of [[206, 58, 232, 80], [240, 62, 258, 78]]) { rect(a, b, c, d, E.paredL); rect(a, d, c, d, E.paredS); rect(c, b, c, d, E.paredS); pset((a + c) >> 1, b - 2, C.grisS); }
  // la puerta del pasillo, con su cristal esmerilado (la sombra de quien pasa, en cada fotograma) y el interruptor
  rect(284, 50, 316, 112, K); rect(285, 51, 315, 111, C.maderaS); rect(285, 51, 315, 51, C.maderaL); rect(288, 54, 312, 111, K); rect(289, 55, 311, 111, C.madera); rect(289, 55, 311, 55, C.maderaL); rect(289, 55, 289, 111, C.maderaL);
  rect(291, 57, 309, 83, K); rect(292, 58, 308, 82, hex('#b9cac8')); rect(291, 87, 309, 108, C.maderaS); rect(292, 88, 308, 107, C.madera); rect(292, 88, 308, 88, C.maderaD); rect(292, 88, 292, 107, C.maderaD); rect(293, 107, 308, 107, C.maderaL);
  disco(294, 86, 1.6, C.oro); pset(293, 85, C.oroL); rect(279, 76, 281, 80, K); pset(280, 77, C.blanco); pset(280, 79, C.grisL);
  // el suelo de tablas y la alfombra (en la mudanza, enrollada junto a la pared)
  a_tablas(R, 113, 179, E.suelo, E.sueloS, E.sueloL, E.sueloD, 0); for (let x = 0; x < 320; x++) { pset(x, 113, E.sueloD); if (x & 1) pset(x, 114, E.sueloD); }
  if (!mud) { for (let y = 139; y <= 162; y++) { const d = (y - 139) * 0.55, xa = Math.round(98 - d), xb = Math.round(236 + d);
      for (let x = xa; x <= xb; x++) { const bx = Math.min(x - xa, xb - x), by = Math.min(y - 139, 162 - y), b = Math.min(bx / 1.6, by);
        const romb = (Math.abs(((x - 167 + 800) % 18) - 9) + Math.abs(((y - 150 + 80) * 2 % 18) - 9));
        pset(x, y, b < 1 ? E.alfombraS : b < 2.2 ? E.alfombraL : b < 3.2 ? E.alfombraS : romb === 4 || romb === 5 ? E.alfombraL : romb < 3 ? hex('#3a4a7a') : (x + y) % 5 === 0 ? E.alfombraS : E.alfombra); }
      if (y % 2) { pset(xa - 1, y, E.cinta); pset(xa - 2, y, E.cinta); pset(xb + 1, y, E.cinta); pset(xb + 2, y, E.cinta); } } }
  else { rect(204, 124, 262, 133, K); rect(205, 125, 261, 132, E.alfombra); rect(205, 125, 261, 126, hex('#a85058')); rect(205, 131, 261, 132, E.alfombraS); for (let x = 208; x < 260; x += 6) rect(x, 127, x + 1, 130, E.alfombraL); disco(262, 129, 4, K); disco(262, 129, 3, E.alfombraS); pset(262, 129, E.alfombraL); rect(226, 124, 228, 133, E.cinta); }
  // la luz del ventanal en el suelo, con la sombra de los parteluces
  for (let y = 116; y <= (tarde ? 172 : 160); y++) { const d = (y - 116) * (tarde ? 1.5 : 0.85), xa = Math.round(30 + d), xb = Math.round(122 + d * 1.2);
    for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa); if (Math.abs(u - 0.33) < 0.022 || Math.abs(u - 0.66) < 0.022 || (y - 116) % 22 === 9) continue; a_velo(R, x, y, tarde ? hex('#ff9a4a') : hex('#fff2c0'), ((x + y) & 1) ? (tarde ? 0.3 : 0.24) : (tarde ? 0.16 : 0.12)); } }
  // las cajas de libros junto al radiador
  a_caja(R, 105, 99, 128, 113, true, 1); if (mud) { a_caja(R, 108, 86, 127, 99, false, 2); a_caja(R, 82, 118, 104, 134, true, 3); a_caja(R, 86, 104, 102, 118, false, 4); }
  // la mesa de dibujo inclinada (tablero con un boceto a lápiz azul, la regla, las patas de tubo) y su taburete
  a_charco(R, 30, 135, 30, 3, K, 0.3); a_charco(R, 70, 135, 9, 2, K, 0.3);
  for (const x of [8, 48]) { rect(x, 119, x + 2, 134, K); rect(x + 1, 119, x + 1, 133, C.grisL); } rect(8, 127, 50, 127, C.grisS); rect(5, 134, 13, 135, K); rect(45, 134, 53, 135, K);
  poligono([[5, 99], [53, 99], [59, 119], [-1, 119]], K); poligono([[6, 100], [52, 100], [57, 118], [0, 118]], E.tablero); rect(0, 119, 58, 121, K); rect(0, 119, 57, 120, C.maderaS); rect(0, 119, 57, 119, C.maderaL);
  if (!mud) { poligono([[13, 102], [45, 102], [48, 115], [10, 115]], C.blanco); linea(14, 113, 22, 105, E.lapiz); linea(22, 105, 27, 110, E.lapiz); linea(27, 110, 33, 104, E.lapiz); linea(33, 104, 44, 113, E.lapiz); disco(40, 105, 1.5, E.lapiz); rect(30, 104, 31, 107, E.lapiz); linea(12, 114, 46, 114, E.lapiz);
    rect(3, 109, 55, 109, C.ocre); rect(3, 110, 55, 110, C.ocreS); rect(2, 107, 4, 112, C.ocreS); pset(13, 102, E.cinta); pset(44, 102, E.cinta); linea(49, 104, 53, 112, C.amarillo); pset(53, 113, K); }
  else { for (let x = 4; x < 54; x += 3) pset(x, 108 + (x % 2), E.tableroS); a_caja(R, 12, 86, 40, 100, true, 5); }
  rect(63, 121, 77, 123, K); rect(64, 121, 76, 122, C.rojoS); rect(64, 121, 76, 121, C.rojo); for (const x of [65, 75]) rect(x, 124, x, 134, C.grisS); rect(65, 129, 75, 129, C.grisS);
  // el escritorio de la máquina (la máquina o el ordenador, en cada fotograma): tablero, cajonera, papeles y el bote de lápices
  a_charco(R, 166, 133, 28, 3, K, 0.3);
  for (let y = 113; y <= 131; y++) for (let x = 143; x <= 169; x++) if ((x + y) & 1) a_velo(R, x, y, K, 0.45);
  rect(140, 113, 143, 132, K); rect(141, 113, 142, 131, C.madera); rect(169, 113, 193, 132, K); rect(170, 113, 192, 131, C.madera);
  for (let i = 0; i < 3; i++) { const y = 114 + i * 6; rect(171, y, 191, y + 4, C.maderaS); rect(172, y + 1, 190, y + 3, C.madera); rect(172, y + 1, 190, y + 1, C.maderaL); rect(179, y + 2, 183, y + 2, C.oro); }
  rect(137, 109, 195, 113, K); rect(138, 110, 194, 110, C.maderaL); rect(138, 111, 194, 112, C.madera);
  rect(184, 103, 188, 109, K); rect(185, 104, 187, 108, hex('#4a78d0')); linea(185, 103, 184, 99, C.amarillo); linea(187, 103, 188, 98, C.rojo); pset(186, 100, C.verde); pset(186, 101, C.verde); pset(186, 102, C.verde);
  if (mud) a_caja(R, 144, 94, 168, 109, true, 6);
  else { rect(169, 106, 181, 109, K); rect(170, 106, 180, 106, C.blanco); rect(170, 107, 180, 107, C.grisL); rect(170, 108, 180, 108, C.blanco); }
  // los caballetes con los cuadros (en la mudanza: uno vacío y los lienzos envueltos contra la pared)
  for (const x of [220, 256]) a_charco(R, x, 133, 13, 2, K, 0.3);
  if (!mud) { a_caballete(R, 220, 132, 0); a_caballete(R, 256, 132, 1); }
  else { a_caballete(R, 256, 132, null);
    for (const [x, y] of [[228, 112], [236, 116]]) { rect(x - 13, y - 22, x + 13, y, K); rect(x - 12, y - 21, x + 12, y - 1, E.cartonL); rect(x + 9, y - 20, x + 12, y - 1, E.carton); rect(x - 12, y - 11, x + 12, y - 11, C.blanco); rect(x, y - 21, x, y - 1, C.blanco); for (let i = 0; i < 5; i++) pset(x - 9 + i * 4, y - 16 + (i % 2) * 9, E.carton); } }
  // el atardecer de 2005 lo tiñe todo
  if (tarde) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 21 && x <= 125 && y >= 23 && y <= 85) continue; pset(x, y, a_mez(a_mez(R.pget(x, y), a_TARDE, 0.17), hex('#2a1838'), 0.14)); }
}

// la máquina de escribir de 1981 (el carro avanza y vuelve, la hoja sube, una tecla baja), el ordenador beige de 1997 (las
// líneas crecen y el cursor parpadea) o, en 2005, el monitor apagado; sobre el escritorio (tablero en y 109)
function a_maquina(R, t, ep) {
  const { rect, pset } = R, E = a_E, K = C.k;
  if (ep < 1990) { const paso = Math.floor(t * 5) % 16, dx = 4 - Math.min(paso, 9), sube = Math.floor(t * 5 / 16) % 4;
    rect(153 + dx, 89 - sube, 162 + dx, 100, K); rect(154 + dx, 90 - sube, 161 + dx, 100, C.blanco); for (let j = 0; j < 3 + sube; j++) rect(155 + dx, 98 - j * 2, 155 + dx + 3 + (j * 3) % 3, 98 - j * 2, C.grisS);
    rect(146 + dx, 99, 168 + dx, 101, K); rect(147 + dx, 100, 167 + dx, 100, C.grisL); rect(144 + dx, 99, 145 + dx, 100, C.grisS);
    rect(147, 101, 167, 109, K); rect(148, 102, 166, 108, hex('#3d6676')); rect(148, 102, 166, 102, hex('#5a8a9c')); rect(148, 107, 166, 108, hex('#2c4c5a'));
    for (let j = 0; j < 2; j++) for (let i = 0; i < 8; i++) { const baja = paso < 10 && (paso * 3 + j) % 8 === i && j === paso % 2; pset(150 + i * 2 + j, 104 + j * 2 + (baja ? 1 : 0), baja ? C.blanco : C.grisL); } }
  else { const on = ep < 2005;
    rect(146, 90, 166, 105, K); rect(147, 91, 165, 104, E.beige); rect(147, 91, 165, 91, E.beigeL); rect(164, 92, 165, 104, E.beigeS); rect(149, 93, 162, 102, K); rect(150, 94, 161, 101, on ? E.pantalla : hex('#2a2c34'));
    if (on) { const n = Math.floor(t * 1.6) % 5; for (let j = 0; j <= n && j < 4; j++) rect(151, 95 + j * 2, 151 + (j === n ? Math.floor((t * 1.6 % 1) * 8) : 4 + (j * 5) % 5), 95 + j * 2, E.fosforo); if (Math.floor(t * 3) % 2) pset(160, 100, C.blanco); pset(164, 103, C.verdeL); }
    else { pset(151, 95, hex('#4a4c58')); pset(152, 95, hex('#4a4c58')); pset(151, 96, hex('#4a4c58')); }
    rect(152, 105, 160, 106, E.beigeS); rect(145, 106, 167, 109, K); rect(146, 107, 166, 108, E.beigeL); for (let x = 147; x < 166; x += 2) pset(x, 108, E.beigeS);
    if (ep >= 2005) { rect(170, 104, 182, 109, K); rect(171, 105, 181, 108, C.blanco); rect(176, 105, 176, 108, C.grisL); } }
}

// LA EDITORIAL, cámara general
function a_estudio(R, t, o) {
  const { rect, pset, linea, disco } = R, E = a_E, K = C.k, ep = o.epoca ?? 1981, mud = !!o.mudanza, tarde = ep >= 2005;
  const q = (c) => (tarde ? a_mez(a_mez(c, a_TARDE, 0.17), hex('#2a1838'), 0.14) : c);
  a_fijo(R, 'estudio|' + ep + '|' + mud, () => a_estudioFijo(R, ep, mud));
  // la vista, los parteluces y lo que queda por delante del cristal
  a_vistaNY(R, t, [21, 23, 125, 85], tarde, 0);
  for (const x of [55, 90]) { rect(x, 23, x + 1, 85, K); } rect(21, 43, 125, 44, K); for (const x of [55, 90]) pset(x, 43, E.marcoL);
  // el gato en el alféizar, que mira a los pájaros y mueve la cola; las macetas
  if (!mud) { const gx = 62, gy = 88, c = q(hex('#4a4a5a')), cL = q(hex('#6c6c7e')), co = Math.round(Math.sin(t * 2.2) * 1.5);
    rect(gx, gy - 6, gx + 7, gy, c); rect(gx + 1, gy - 7, gx + 6, gy - 6, c); rect(gx + 5, gy - 11, gx + 9, gy - 6, c); pset(gx + 5, gy - 12, c); pset(gx + 9, gy - 12, c); pset(gx + 8, gy - 9, C.amarillo); rect(gx + 1, gy - 5, gx + 2, gy - 1, cL);
    linea(gx, gy - 1, gx - 4, gy - 1, c); linea(gx - 4, gy - 1, gx - 6 + co, gy - 4, c); if (Math.floor(t * 0.7) % 4 === 0) pset(gx + 5, gy - 13, c);
    }
  a_planta(R, 82, 88, t, 1, 0);
  // la lámpara de brazo de la mesa de dibujo, con su luz sobre el tablero
  { linea(50, 100, 55, 84, K); linea(51, 100, 56, 84, q(C.grisL)); linea(56, 84, 42, 74, K); linea(56, 85, 42, 75, q(C.grisL)); disco(56, 84, 1.5, K);
    R.poligono([[33, 72], [44, 69], [47, 78], [31, 81]], K); R.poligono([[34, 73], [43, 71], [45, 77], [33, 79]], q(C.rojo)); linea(35, 73, 42, 71, q(hex('#e8706a')));
    if (!mud) { rect(35, 80, 43, 80, C.oroL); for (let j = 0; j < 20; j++) for (let i = -8 - (j >> 1); i <= 8 + (j >> 1); i++) if (((i + j) & 1) === 0 && a_BAYER[(j & 3) * 4 + (i & 3)] > j / 26) a_velo(R, 38 + i, 82 + j, C.oroL, 0.3); } }
  // el cuadro apoyado en las cajas
  if (!mud) PIEZAS_CF.cuadro(R, 116, 100, { n: 3 });
  // el ventilador del techo
  { const cx = 244, cy = 17, a = t * 7; rect(cx, 12, cx, 15, K); for (let k = 0; k < 3; k++) { const ex = cx + Math.cos(a + k * 2.094) * 21, ey = cy + Math.sin(a + k * 2.094) * 2.2; linea(cx, cy, ex, ey, q(C.maderaS)); linea(cx, cy + 1, ex, ey + 1, q(C.maderaD)); }
    rect(cx - 2, 15, cx + 2, 18, K); rect(cx - 1, 16, cx + 1, 17, q(C.oro)); }
  // la lámpara colgante
  { rect(208, 0, 208, 15, K); R.poligono([[201, 21], [216, 21], [212, 15], [205, 15]], K); R.poligono([[202, 20], [215, 20], [211, 16], [206, 16]], q(C.verde)); rect(206, 16, 210, 16, q(C.verdeL)); rect(206, 21, 211, 22, C.oroL);
    for (let j = 0; j < 22; j++) for (let i = -6 - j; i <= 6 + j; i++) if (((i + j) & 1) === 0 && a_BAYER[(j & 3) * 4 + (i & 3)] > j / 22 + 0.15) a_velo(R, 208 + i, 23 + j, C.oroL, tarde ? 0.26 : 0.14); }
  // las galeradas colgadas de una cuerda, que se mecen con el ventilador
  { for (let x = 204; x <= 254; x++) pset(x, 50 + Math.round(2.4 * (1 - ((x - 229) / 25) ** 2)), K);
    for (let k = 0; k < 4; k++) { if (mud && k !== 1) continue; const x0 = 207 + k * 12, y0 = 51 + Math.round(2.4 * (1 - ((x0 + 4 - 229) / 25) ** 2)), sw = Math.sin(t * 1.7 + k * 1.3) * 1.4;
      for (let j = 0; j < 19; j++) { const dx = Math.round(sw * j / 18); rect(x0 + dx, y0 + j, x0 + 8 + dx, y0 + j, q(j === 18 ? E.tableroS : C.blanco)); pset(x0 + 8 + dx, y0 + j, q(E.tableroS));
        if (j > 2 && j < 17 && j % 2 === 1) rect(x0 + 1 + dx, y0 + j, x0 + 3 + ((j * 7 + k * 3) % 5) + dx, y0 + j, q(k === 2 && j === 9 ? C.rojo : hex('#8c8ca0'))); }
      rect(x0 + 3, y0 - 1, x0 + 4, y0 + 1, q(k % 2 ? C.rojo : C.ocre)); } }
  a_reloj(R, 268, 62, 6, t, tarde ? 6.4 : 10.15);
  a_maquina(R, t, ep);
  // la sombra de quien pasa por el pasillo, tras el cristal esmerilado de la puerta
  { const u = (t % 8.5) / 2.4, cl = [292, 58, 308, 82]; if (u < 1) { const x = (Math.floor(t / 8.5) % 2 ? 314 - u * 28 : 286 + u * 28), c = q(hex('#8a9c9c')); a_rc(R, cl, x - 3, 66, x + 3, 82, c); a_rc(R, cl, x - 2, 61, x + 2, 65, c); }
    for (let j = 0; j < 8; j++) a_velo(R, 296 + j, 66 - j, C.blanco, 0.35); }
  // el polvo en la luz del ventanal
  for (let k = 0; k < 12; k++) { const fy = (h(k, 3, 560) * 70 + t * (2 + h(k, 4, 560) * 3)) % 70, x = Math.round(34 + fy * 0.75 + h(k, 5, 560) * 80 + Math.sin(t * 0.6 + k) * 2), y = Math.round(88 + fy); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, tarde ? hex('#ffd8a0') : hex('#fff8e0')); }
  return { suelo: 150, sueloMin: 138, sueloMax: 158, ventana: [20, 22, 126, 86], alfeizar: 88, estanteria: [130, 22, 200, 112], escritorio: { x0: 138, x1: 194, y: 109, maquina: [157, 100] }, mesaDibujo: { x0: 0, x1: 58, y: 100 },
    caballetes: [[220, 132], [256, 132]], cuadros: mud ? [] : [[220, 119], [256, 119], [116, 100]], galeradas: [204, 50, 254, 70], reloj: [268, 62], puerta: [288, 54, 312, 111], alfombra: [98, 139, 236, 162], libre: [84, 138, 280, 158] };
}

// lo de delante de la cámara general de la editorial
function a_estudioDelante(R, t, o) {
  const { rect, pset, linea, poligono } = R, E = a_E, K = C.k, ep = o.epoca ?? 1981, mud = !!o.mudanza, tarde = ep >= 2005;
  const q = (c) => (tarde ? a_mez(a_mez(c, a_TARDE, 0.17), hex('#2a1838'), 0.14) : c);
  if (mud) { a_caja(R, -2, 156, 46, 181, true, 10); a_caja(R, 40, 164, 76, 181, false, 11); a_caja(R, 256, 158, 321, 181, true, 12); a_caja(R, 276, 147, 312, 158, false, 13);
    rect(50, 160, 58, 164, K); rect(51, 161, 57, 163, q(E.cinta)); rect(53, 162, 55, 162, K);
    for (const [a, b, c, d] of [[-2, 156, 46, 179], [40, 164, 76, 179], [256, 158, 319, 179], [276, 147, 312, 158]]) if (tarde) for (let y = b; y <= d; y++) for (let x = Math.max(0, a); x <= Math.min(319, c); x++) pset(x, y, a_mez(a_mez(R.pget(x, y), a_TARDE, 0.17), hex('#2a1838'), 0.14));
    return { cajas: [[0, 156, 46, 179], [40, 164, 76, 179], [256, 158, 319, 179], [276, 147, 312, 158]] }; }
  // la esquina de la mesa de dibujo de delante: papeles con renglones, la regla, el bote de pinceles y la taza que humea
  poligono([[-1, 159], [60, 155], [74, 180], [-1, 180]], K); poligono([[0, 160], [59, 156], [72, 180], [0, 180]], q(E.tablero)); linea(0, 160, 59, 156, q(C.blanco));
  for (let i = 0; i < 9; i++) pset(4 + i * 7, 176 - (i % 3) * 2, q(E.tableroS));
  poligono([[8, 164], [40, 161], [46, 176], [12, 179]], q(C.blanco)); linea(12, 179, 46, 176, q(E.tableroS)); for (let j = 0; j < 5; j++) linea(13 + j, 166 + j * 2.5, 30 + j + (j * 5) % 9, 164.5 + j * 2.5, q(hex('#8c8ca0')));
  poligono([[30, 168], [52, 163], [56, 172], [34, 177]], q(E.cinta)); for (let j = 0; j < 3; j++) linea(36 + j, 170 + j * 2.2, 50 + j, 166.8 + j * 2.2, q(hex('#8c8ca0'))); pset(51, 164, q(C.rojo)); pset(52, 164, q(C.rojo));
  if (Math.sin(t * 1.7) > 0.4) { pset(55, 172, q(C.blanco)); pset(56, 171, q(C.blanco)); }
  rect(4, 150, 11, 160, K); rect(5, 151, 10, 159, q(hex('#4a78d0'))); rect(5, 151, 6, 159, q(hex('#7aa0e4'))); linea(6, 150, 4, 142, q(C.maderaL)); pset(4, 141, q(C.rojo)); pset(4, 140, q(C.rojo)); linea(8, 150, 9, 143, q(C.amarillo)); pset(9, 142, K); linea(10, 150, 13, 144, q(C.maderaL)); pset(13, 143, q(C.azulL)); pset(14, 142, q(C.azulL));
  if (ep < 2005) { rect(60, 162, 67, 169, K); rect(61, 163, 66, 168, q(C.rojo)); rect(61, 163, 61, 168, q(hex('#e8706a'))); rect(62, 163, 66, 163, q(hex('#5a3a22'))); rect(68, 164, 69, 167, K); for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1; if (u < 0.85) pset(Math.round(63 + Math.sin(u * 7 + i * 2) * 1.6), Math.round(160 - u * 9), q(C.blanco)); } }
  // las cajas de libros de la derecha, con unos cuantos encima
  a_caja(R, 258, 160, 321, 181, true, 14); a_caja(R, 284, 150, 321, 160, false, 15);
  for (let i = 0; i < 3; i++) { const c = a_LOMOS[(i * 4 + 1) % a_LOMOS.length]; rect(260 + i, 157 - i * 3, 280 - i, 159 - i * 3, K); rect(261 + i, 157 - i * 3, 279 - i, 158 - i * 3, q(c)); rect(261 + i, 157 - i * 3, 263 + i, 158 - i * 3, q(C.blanco)); }
  if (tarde) for (const [a, b, c, d] of [[258, 160, 319, 179], [284, 150, 319, 160]]) for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) pset(x, y, a_mez(a_mez(R.pget(x, y), a_TARDE, 0.17), hex('#2a1838'), 0.14));
  return { mesaDibujo: [0, 156, 72, 179], cajas: [[258, 160, 319, 179], [284, 150, 319, 160]] };
}

// LA MESA DE PREISS (cámara 'mesa'): lo fijo (pared de yeso con friso de nogal, marco de la ventana, tablón de corcho con
// los doce bocetos, balda, cuadro, archivador, el sillón de cuero y las tablas del suelo)
function a_mesaFijo(R, ep) {
  const { rect, pset, linea, poligono, disco } = R, E = a_E, K = C.k, tarde = ep >= 2005;
  rect(0, 0, 319, 13, E.techo); for (let x = 14; x < 320; x += 34) { rect(x, 0, x + 1, 11, E.techoS); rect(x + 2, 0, x + 2, 11, E.techoL); } rect(0, 12, 319, 13, E.techoS);
  // la pared de yeso verde gris, con su picado, y el friso de cuarterones de nogal
  rect(0, 14, 319, 91, E.yeso); rect(0, 14, 319, 14, E.yesoS);
  for (let i = 0; i < 520; i++) { const x = Math.floor(h(i, 1, 570) * 320), y = 16 + Math.floor(h(i, 2, 570) * 74); if (x > 262 && y < 50) continue; rect(x, y, x + (i % 3 ? 0 : 1), y, i % 2 ? E.yesoS : E.yesoL); }
  for (let x = 0; x < 320; x++) if (x & 1) pset(x, 15, E.yesoS);
  rect(0, 90, 319, 118, K); rect(0, 91, 319, 92, E.nogalL); rect(0, 93, 319, 117, E.nogal);
  for (let k = 0; k < 11; k++) { const x0 = 2 + k * 29; rect(x0, 96, x0 + 24, 113, E.nogalS); rect(x0, 96, x0 + 23, 112, E.nogalL); rect(x0 + 1, 97, x0 + 23, 112, E.nogal); for (let i = 0; i < 2; i++) { const vx = x0 + 5 + Math.floor(h(k, i, 571) * 14); for (let y = 99; y < 111; y++) if (h(vx, y, 572) > 0.2) pset(vx + Math.round(Math.sin(y * 0.13 + k * 2) * 0.9), y, E.nogalV); } }
  rect(0, 115, 319, 117, E.nogalS); rect(0, 115, 319, 115, E.nogalL);
  // la ventana de guillotina (la vista, en cada fotograma)
  rect(12, 22, 88, 84, K); rect(13, 23, 87, 83, C.blanco); rect(13, 23, 87, 23, C.blanco); rect(86, 24, 87, 83, C.grisL); rect(16, 26, 84, 80, K);
  rect(9, 84, 91, 87, K); rect(10, 84, 90, 86, C.blanco); rect(10, 86, 90, 86, C.grisL); for (let x = 12; x < 90; x++) if (x & 1) pset(x, 88, E.yesoS);
  // el tablón de corcho: los doce bocetos de los cuadros en su rejilla, notas con renglones, una foto y un hilo rojo
  rect(100, 26, 198, 80, K); rect(101, 27, 197, 79, C.madera); rect(101, 27, 197, 27, C.maderaL); rect(103, 29, 195, 77, E.corcho);
  for (let i = 0; i < 260; i++) pset(104 + Math.floor(h(i, 1, 573) * 91), 30 + Math.floor(h(i, 2, 573) * 47), i % 3 ? E.corchoS : hex('#d8b47a'));
  { const cols = [['#3a3a7a', '#e8b830'], ['#62b8c8', '#3a8a4a'], ['#a0507a', '#f8c870'], ['#2a4fa8', '#f6f2ea'], ['#3a8a4a', '#c83a3a'], ['#e8803a', '#3a3a7a'], ['#6a3a8a', '#62b8c8'], ['#8e2424', '#e8b830'], ['#4a78d0', '#5aaa5a'], ['#e87a9a', '#3a3a7a'], ['#2a5a3a', '#f8c870'], ['#3a3a7a', '#e87a9a']];
    for (let k = 0; k < 12; k++) { const x = 106 + (k % 4) * 12, y = 32 + Math.floor(k / 4) * 13, [a, b] = cols[k].map(hex); rect(x, y, x + 9, y + 9, K); rect(x + 1, y + 1, x + 8, y + 8, a); rect(x + 1, y + 6, x + 8, y + 8, a_mez(a, K, 0.35)); rect(x + 3 + (k % 3), y + 3, x + 5 + (k % 3), y + 6, b); pset(x + 2 + (k * 3) % 5, y + 2, C.blanco); pset(x + 5, y - 1, k % 3 ? C.rojo : C.amarillo); } }
  for (const [x, y, w, a, c] of [[158, 31, 14, 17, C.blanco], [176, 33, 15, 12, hex('#f6e890')], [160, 52, 12, 14, hex('#f0e8d4')], [176, 49, 16, 20, C.blanco]]) { rect(x + 1, y + 1, x + w + 1, y + a + 1, E.corchoS); rect(x, y, x + w, y + a, c); for (let j = 3; j < a - 1; j += 2) rect(x + 2, y + j, x + 3 + ((j * 5 + x) % (w - 5)), y + j, hex('#8c8ca0')); pset(x + (w >> 1), y + 1, C.rojo); }
  rect(177, 51, 191, 60, hex('#62a8d8')); rect(177, 57, 191, 60, hex('#5a9a4a')); poligono([[181, 57], [185, 52], [189, 57]], hex('#8a8a9a')); disco(189, 53, 1.2, C.amarillo);
  linea(111, 31, 165, 32, C.rojo); linea(165, 32, 184, 50, C.rojo); linea(135, 57, 166, 53, C.rojo);
  // el reloj (las agujas, en cada fotograma), la balda con libros y el cuadro
  rect(204, 58, 276, 61, K); rect(205, 58, 275, 59, C.maderaL); rect(205, 60, 275, 60, C.maderaS); for (const x of [210, 268]) { linea(x, 61, x, 66, K); linea(x, 66, x + 4, 61, K); }
  a_lomos(R, 207, 246, 57, 30, 1, 11); rect(249, 51, 257, 57, K); rect(250, 52, 256, 56, C.oro); rect(250, 52, 256, 52, C.oroL); rect(252, 48, 254, 51, C.oroS);
  PIEZAS_CF.cuadro(R, 240, 88, { n: 2 }); pset(240, 63, K);
  // el archivador de chapa con una planta encima (las hojas, en cada fotograma) y el paragüero
  rect(277, 84, 309, 119, K); rect(278, 85, 308, 118, hex('#7c8672')); rect(278, 85, 308, 85, hex('#a0aa94')); rect(306, 86, 308, 118, hex('#5c6654'));
  for (let i = 0; i < 3; i++) { const y = 87 + i * 10; rect(280, y, 304, y + 8, hex('#5c6654')); rect(281, y + 1, 304, y + 8, hex('#8a947e')); rect(281, y + 1, 304, y + 1, hex('#a0aa94')); rect(288, y + 3, 296, y + 5, K); rect(289, y + 4, 295, y + 4, C.blanco); rect(290, y + 7, 294, y + 7, C.grisS); }
  // el suelo de tablas oscuras, la luz de la ventana y la papelera
  a_tablas(R, 119, 179, hex('#8a5a32'), hex('#6e4424'), hex('#a47040'), hex('#4a2c14'), 3); for (let x = 0; x < 320; x++) { pset(x, 119, hex('#4a2c14')); if (x & 1) pset(x, 120, hex('#4a2c14')); }
  for (let y = 122; y <= 164; y++) { const d = (y - 122) * (tarde ? 1.1 : 0.5), xa = Math.round(8 + d), xb = Math.round(52 + d * 1.2); for (let x = xa; x <= xb; x++) { if (Math.abs(x - ((xa + xb) >> 1)) < 1 || y === 142) continue; a_velo(R, x, y, tarde ? hex('#ff9a4a') : hex('#fff2c0'), ((x + y) & 1) ? 0.26 : 0.12); } }
  a_charco(R, 308, 165, 12, 2, K, 0.3); rect(300, 146, 316, 164, K); for (let y = 147; y < 164; y++) for (let x = 301; x < 316; x++) pset(x, y, (x + y) % 3 === 0 ? C.grisS : (x - y + 300) % 3 === 0 ? C.gris : hex('#3a3a48')); rect(300, 146, 316, 147, C.grisL);
  disco(305, 144, 2.5, C.blanco); disco(310, 143, 3, hex('#e8e0cc')); pset(309, 142, C.grisL); pset(305, 144, C.grisL); disco(294, 163, 2.5, C.blanco); pset(294, 163, C.grisL);
  // el sillón de cuero con botones, detrás de la mesa
  rect(144, 111, 176, 147, K); rect(145, 110, 175, 110, K); rect(145, 112, 175, 147, E.cuero); rect(146, 111, 174, 112, E.cueroL); rect(173, 113, 175, 147, E.cueroS); rect(145, 113, 146, 147, E.cueroL);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const bx = 150 + i * 7 + (j % 2) * 3, by = 116 + j * 6; if (bx < 173) { pset(bx, by, E.cueroS); pset(bx - 1, by - 1, E.cueroL); } }
  for (const x of [143, 177]) { rect(x - 2, 128, x + 2, 147, K); rect(x - 1, 129, x + 1, 147, E.nogalL); }
  if (tarde) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 16 && x <= 84 && y >= 26 && y <= 80) continue; pset(x, y, a_mez(a_mez(R.pget(x, y), a_TARDE, 0.17), hex('#2a1838'), 0.14)); }
}

// un teléfono de sobremesa (negro de disco en 1981, beige de teclas después); con suena, tiembla, salta el auricular y
// salen los arcos del timbre; (x, y): centro de la base
function a_telefono(R, x, y, t, suena, ep) {
  const { rect, pset, poligono, disco } = R, K = C.k, viejo = ep < 1990, c = viejo ? hex('#2e2e3e') : a_E.beige, cL = viejo ? hex('#5a5a70') : a_E.beigeL, cS = viejo ? hex('#1c1c28') : a_E.beigeS;
  const f = suena ? Math.floor(t * 18) % 2 : 0, dx = suena ? (f ? 1 : -1) : 0, dy = suena && f ? -2 : 0;
  for (let i = 0; i < 7; i++) pset(x - 11 - i, y - 1 + (i % 2), K);
  poligono([[x - 8 + dx, y - 7], [x + 9 + dx, y - 7], [x + 11 + dx, y + 1], [x - 10 + dx, y + 1]], K); poligono([[x - 7 + dx, y - 6], [x + 8 + dx, y - 6], [x + 10 + dx, y], [x - 9 + dx, y]], c); rect(x - 7 + dx, y - 6, x + 7 + dx, y - 6, cL); rect(x - 9 + dx, y - 1, x + 9 + dx, y - 1, cS);
  if (viejo) { disco(x + 0.5 + dx, y - 2.5, 2.6, a_E.beigeL); disco(x + 0.5 + dx, y - 2.5, 1, K); } else { for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) pset(x - 2 + i * 2 + dx, y - 4 + j * 2, cS); pset(x + 6 + dx, y - 4, suena && f ? C.rojo : C.rojoS); }
  rect(x - 11 + dx, y - 11 + dy, x + 11 + dx, y - 8 + dy, K); rect(x - 10 + dx, y - 10 + dy, x + 10 + dx, y - 9 + dy, c); rect(x - 10 + dx, y - 10 + dy, x + 10 + dx, y - 10 + dy, cL);
  for (const s of [-1, 1]) { rect(x + s * 11 - 2 + dx, y - 9 + dy, x + s * 11 + 2 + dx, y - 6 + dy, K); rect(x + s * 11 - 1 + dx, y - 9 + dy, x + s * 11 + 1 + dx, y - 7 + dy, c); }
  if (suena) for (const s of [-1, 1]) for (let r = 0; r < 3; r++) { if ((Math.floor(t * 9) + r) % 3 === 0) continue; const rr = 5 + r * 3; for (let a = -0.9; a <= 0.9; a += 0.22) { const px = Math.round(x + s * (13 + Math.cos(a) * rr)), py = Math.round(y - 12 + Math.sin(a) * rr - r); pset(px, py, C.oroL); pset(px, py + 1, C.oroS); } }
}

// un reloj de arena con sus tapas de madera y sus columnas; u 0–1: cuánta arena ha caído; (x, y): centro de la base
function a_relojArena(R, x, y, u, t) {
  const { rect, pset } = R, K = C.k, vid = hex('#cfe6f0'), are = hex('#e8c060'), areS = hex('#c89a38'), W = [7, 7, 5, 3, 1];
  rect(x - 5, y - 16, x + 5, y, K); rect(x - 4, y - 15, x + 4, y - 14, C.maderaL); rect(x - 4, y - 1, x + 4, y, C.madera); rect(x - 4, y - 13, x + 4, y - 2, hex('#34424a'));
  for (const s of [-4, 4]) rect(x + s, y - 13, x + s, y - 2, C.oroS);
  const arriba = Math.round((1 - u) * 5), abajo = Math.round(u * 5);
  for (let j = 0; j < 5; j++) { const w = W[j] >> 1; rect(x - w, y - 13 + j, x + w, y - 13 + j, j >= 5 - arriba ? (j === 5 - arriba ? are : areS) : vid); const w2 = W[4 - j] >> 1; rect(x - w2, y - 7 + j, x + w2, y - 7 + j, j >= 5 - abajo ? are : vid); }
  pset(x, y - 8, u > 0 && u < 1 ? are : vid); if (u > 0.01 && u < 0.99) for (let j = 0; j < 5 - abajo; j++) if ((Math.floor(t * 12) + j) % 2) pset(x, y - 7 + j, are);
  pset(x - 3, y - 13, C.blanco); pset(x - 3, y - 3, C.blanco);
}

// LA MESA DE PREISS con todo lo de encima (la pinta editorial() y la repinta editorialDelante() por delante de quien se
// siente detrás): frente de cajones, tablero con vade verde, la lámpara de banquero, las pilas de cartas (o.cartas 0–1) y
// los sobres sueltos, la libreta (en blanco en 2005), el reloj de arena (o.arena 0–1; si falta, cae solo), el teléfono
// (o.suena) y la taza que humea
function a_mesaPreiss(R, t, o) {
  const { rect, pset, linea, poligono } = R, E = a_E, K = C.k, ep = o.epoca ?? 1981, tarde = ep >= 2005, n = Math.max(0, Math.min(1, o.cartas ?? 0));
  const q = (c) => (tarde ? a_mez(a_mez(c, a_TARDE, 0.17), hex('#2a1838'), 0.14) : c), nog = q(E.nogal), nogL = q(E.nogalL), nogS = q(E.nogalS);
  // el frente: dos cajoneras con tiradores de latón y el faldón del centro
  rect(59, 147, 261, 179, K); rect(60, 148, 260, 179, nog);
  for (const x0 of [63, 203]) for (let i = 0; i < 2; i++) { const y = 152 + i * 14; rect(x0, y, x0 + 54, y + 11, nogS); rect(x0, y, x0 + 53, y + 10, nogL); rect(x0 + 1, y + 1, x0 + 53, y + 10, nog); for (let j = 0; j < 3; j++) rect(x0 + 6 + j * 15, y + 3 + (j % 2) * 4, x0 + 14 + j * 15, y + 3 + (j % 2) * 4, q(E.nogalV)); rect(x0 + 22, y + 5, x0 + 32, y + 6, K); rect(x0 + 23, y + 5, x0 + 31, y + 5, q(C.oro)); pset(x0 + 23, y + 5, q(C.oroL)); }
  rect(121, 150, 199, 179, nogS); rect(122, 151, 198, 179, q(E.nogalV)); rect(127, 155, 193, 179, nogS); rect(128, 156, 193, 179, nog); for (let j = 0; j < 4; j++) rect(134 + j * 14, 160 + (j % 2) * 7, 144 + j * 14, 160 + (j % 2) * 7, q(E.nogalV));
  // el tablero, con su veta, el canto con brillo y el vade verde
  poligono([[65, 134], [255, 134], [263, 148], [57, 148]], K);
  poligono([[66, 135], [254, 135], [261, 146], [59, 146]], (x, y) => (h(x >> 3, y, 574) < 0.22 ? nogL : h((x + 4) >> 4, y, 575) < 0.15 ? q(E.nogalV) : q(hex('#6c4428'))));
  rect(59, 147, 261, 147, nogL); rect(59, 148, 261, 149, nogS); { const g = ((t * 0.25) % 2) * 200; if (g < 190) rect(62 + Math.round(g), 147, 68 + Math.round(g), 147, q(hex('#e8b880'))); }
  poligono([[122, 138], [198, 138], [202, 146], [118, 146]], q(E.vadeS)); poligono([[124, 139], [196, 139], [199, 145], [121, 145]], (x, y) => ((x * 3 + y * 5) % 7 === 0 ? q(E.vadeL) : q(E.vade)));
  // la lámpara de banquero y su luz
  rect(71, 142, 85, 144, K); rect(72, 142, 84, 143, q(C.oro)); rect(72, 142, 84, 142, q(C.oroL)); rect(77, 128, 79, 141, K); rect(78, 128, 78, 141, q(C.oro));
  poligono([[66, 129], [91, 129], [87, 122], [70, 122]], K); poligono([[67, 128], [90, 128], [86, 123], [71, 123]], q(C.verde)); rect(71, 123, 86, 123, q(C.verdeL)); rect(68, 129, 89, 129, o.lampara === false ? K : C.oroL); pset(88, 131, q(C.oro)); pset(88, 133, q(C.oro));
  if (o.lampara !== false) { a_charco(R, 80, 141, 24, 5, C.oroL, 0.3); for (let j = 0; j < 10; j++) for (let i = -9 - j; i <= 9 + j; i++) if (((i + j) & 1) === 0 && a_BAYER[(j & 3) * 4 + (i & 3)] > j / 12) a_velo(R, 78 + i, 130 + j, C.oroL, 0.16); }
  // las cartas: seis montones que crecen (los de atrás primero) y los sobres sueltos por el tablero
  const pilas = [[112, 144], [240, 145], [130, 146], [222, 146], [96, 147], [250, 147]];
  for (let k = 0; k < Math.floor(n * 9); k++) { const x = 100 + Math.round(h(k, 1, 576) * 140), y = 137 + Math.round(h(k, 2, 576) * 7), s = k % 2 ? 1 : -1; if (x > 136 && x < 184) continue; poligono([[x, y], [x + 8, y + s], [x + 9, y + 3 + s], [x + 1, y + 3]], K); poligono([[x + 1, y + 1], [x + 8, y + 1 + s], [x + 8, y + 2 + s], [x + 1, y + 2]], q(k % 3 ? C.blanco : hex('#f0e8d4'))); pset(x + 7, y + 1 + s, q(C.rojo)); }
  pilas.forEach(([x, y], k) => { const a = Math.max(0, Math.min(1, n * 2.4 - k * 0.24)); if (a > 0.03 && PIEZAS_CF.cartas) PIEZAS_CF.cartas(R, x, y, { alto: a }); });
  // la libreta: con notas en 1981 y 1997, en blanco en 2005 (o.libreta: 'blanco' | 'notas'), y el lápiz
  { const blanco = (o.libreta ?? (tarde ? 'blanco' : 'notas')) === 'blanco';
    poligono([[140, 138], [181, 138], [185, 146], [136, 146]], K); poligono([[141, 139], [180, 139], [183, 145], [138, 145]], q(C.blanco)); linea(160, 139, 160, 145, q(C.grisL)); for (let y = 139; y <= 145; y += 2) pset(160, y, K);
    if (!blanco) for (let j = 0; j < 3; j++) { rect(142, 140 + j * 2, 150 + (j * 5) % 6, 140 + j * 2, q(hex('#6a78b0'))); rect(163, 140 + j * 2, 170 + (j * 7) % 8, 140 + j * 2, q(hex('#6a78b0'))); }
    else { pset(178, 140, q(C.grisL)); pset(143, 144, q(C.grisL)); }
    linea(186, 145, 196, 142, q(C.amarillo)); pset(197, 142, K); pset(185, 145, q(C.rosa)); }
  // el reloj de arena, el teléfono y la taza
  a_relojArena(R, 205, 144, o.arena ?? (tarde ? 1 : (t / 45) % 1), t);
  a_telefono(R, 222, 141, t, !!o.suena, ep);
  if (!tarde) { rect(100, 138, 106, 144, K); rect(101, 139, 105, 143, q(C.rojo)); rect(101, 139, 105, 139, q(hex('#5a3a22'))); rect(107, 140, 108, 142, K); for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1; if (u < 0.85) pset(Math.round(103 + Math.sin(u * 7 + i * 2) * 1.6), Math.round(136 - u * 9), C.blanco); } }
  return { mesa: [59, 134, 261, 179], tablero: 146, pilas };
}

// LA MESA DE PREISS, la cámara: la pared de su rincón, la ventana con el depósito de cerca, el corcho, el saco del correo
// que se llena con o.cartas, y la mesa
function a_estudioMesa(R, t, o) {
  const { rect, pset, linea } = R, E = a_E, K = C.k, ep = o.epoca ?? 1981, tarde = ep >= 2005, n = Math.max(0, Math.min(1, o.cartas ?? 0));
  const q = (c) => (tarde ? a_mez(a_mez(c, a_TARDE, 0.17), hex('#2a1838'), 0.14) : c);
  a_fijo(R, 'mesa|' + ep, () => a_mesaFijo(R, ep));
  a_vistaNY(R, t, [16, 26, 84, 80], tarde, 1);
  rect(16, 52, 84, 53, C.blanco); rect(16, 54, 84, 54, K); rect(50, 55, 50, 80, C.blanco);
  // la persiana a medio subir, con su cordón que se mece
  for (let y = 26; y <= 30; y += 3) { rect(16, y, 84, y + 1, q(hex('#e8e0cc'))); rect(16, y + 2, 84, y + 2, q(hex('#a89c84'))); } { const sw = Math.round(Math.sin(t * 1.1) * 1.2); linea(80, 32, 80 + sw, 46, K); pset(80 + sw, 47, q(C.oro)); }
  a_reloj(R, 216, 38, 7, t, tarde ? 6.4 : 3.3);
  a_planta(R, 264, 58, t, 1, 4); a_planta(R, 293, 84, t, 2, 6);
  // el saco del correo y sus sobres
  { const x = 22, y = 166, lleno = 0.25 + n * 0.75, top = Math.round(y - 14 - lleno * 14), lona = q(hex('#b8a47c')), lonaS = q(hex('#94805c')), lonaL = q(hex('#d4c298'));
    a_charco(R, x, y + 1, 18, 3, K, 0.3);
    R.poligono([[x - 15, y + 1], [x + 15, y + 1], [x + 17, top + 6], [x + 11, top - 1], [x - 11, top - 1], [x - 17, top + 6]], K); R.poligono([[x - 14, y], [x + 14, y], [x + 16, top + 6], [x + 10, top], [x - 10, top], [x - 16, top + 6]], lona);
    for (let yy = top + 2; yy < y; yy++) { pset(x - 12 - (yy > top + 6 ? 2 : 0), yy, lonaL); pset(x + 11 + (yy > top + 6 ? 2 : 0), yy, lonaS); pset(x + 10 + (yy > top + 6 ? 2 : 0), yy, lonaS); } for (let i = 0; i < 4; i++) linea(x - 8 + i * 5, top + 8, x - 9 + i * 5, y - 3, lonaS);
    rect(x - 6, y - 12, x + 6, y - 5, q(hex('#3a5a9a'))); rect(x - 4, y - 10, x + 4, y - 10, q(C.blanco)); rect(x - 4, y - 8, x + 2, y - 8, q(C.blanco));
    for (let k = 0; k < 3 + Math.round(n * 7); k++) { const ex = x - 9 + (k * 7) % 17, ey = top - 2 - (k % 3) * 2 - Math.floor(k / 4) * 2; rect(ex - 1, ey - 1, ex + 7, ey + 4, K); rect(ex, ey, ex + 6, ey + 3, q(k % 3 ? C.blanco : hex('#f0e8d4'))); linea(ex, ey, ex + 3, ey + 2, q(C.grisL)); linea(ex + 6, ey, ex + 3, ey + 2, q(C.grisL)); if (k % 2) pset(ex + 5, ey + 3, q(C.rojo)); }
    if (n > 0.55) { PIEZAS_CF.cartas(R, 46, 172, { alto: Math.min(1, (n - 0.55) * 2.2) }); } }
  // el polvo en la luz
  for (let k = 0; k < 8; k++) { const fy = (h(k, 3, 577) * 70 + t * (2 + h(k, 4, 577) * 3)) % 70, x = Math.round(14 + fy * 0.4 + h(k, 5, 577) * 44 + Math.sin(t * 0.6 + k) * 2), y = Math.round(90 + fy); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, tarde ? hex('#ffd8a0') : hex('#fff8e0')); }
  const g = a_mesaPreiss(R, t, o);
  return { suelo: 164, detras: 138, sillon: [160, 138], mesa: g.mesa, tablero: [59, 135, 261, 146], telefono: [222, 141], libreta: [160, 142], relojArena: [205, 144], lampara: [78, 129], taza: [103, 144], pilas: g.pilas, saco: [22, 166],
    ventana: [16, 26, 84, 80], corcho: [103, 29, 195, 77], reloj: [216, 38], cuadro: [240, 88], archivador: [278, 85, 308, 118], papelera: [308, 164], libre: [[40, 152, 56, 172], [272, 150, 296, 172]] };
}

// LA CÁMARA DE CAJAS DE SEGURIDAD: una caja pequeña de acero con su bisel, el número y las dos cerraduras
function a_cajita(R, bx, by, w, a, n, tirador) {
  const { rect, pset } = R, B = a_B;
  rect(bx, by, bx + w - 1, by + a - 1, B.aceroD); rect(bx, by, bx + w - 2, by + a - 2, B.acero); rect(bx, by, bx + w - 2, by, B.aceroL); rect(bx, by, bx, by + a - 2, B.aceroL); rect(bx + 1, by + a - 2, bx + w - 2, by + a - 2, B.aceroS);
  const s = String(n); a_num(R, s, bx + ((w - 1 - (s.length * 4 - 1)) >> 1), by + 2, B.aceroD);
  pset(bx + 3, by + a - 3, B.hueco); pset(bx + w - 5, by + a - 3, B.hueco); pset(bx + 3, by + a - 4, B.laton); pset(bx + w - 5, by + a - 4, B.laton);
  if (tirador) { rect(bx + 5, by + a - 4, bx + w - 7, by + a - 3, B.latonS); rect(bx + 5, by + a - 4, bx + w - 7, by + a - 4, B.laton); }
  if (h(bx, by, 580) < 0.3) rect(bx + 2, by + 1, bx + w - 4, by + 1, B.aceroB);
}

// chapa de acero cepillado en planchas con remaches; calma: sin remaches ni rayas (la esquina de Atom)
function a_chapa(R, x0, y0, x1, y1, k = 0, calma = null) {
  const B = a_B; R.rect(x0, y0, x1, y1, B.acero);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x += 3) { if (calma && x > calma[0] && y < calma[1]) continue; const q = h(x >> 2, y, 581 + k); if (q < 0.045) R.rect(x, y, Math.min(x1, x + 5), y, a_mez(B.acero, B.aceroL, 0.55)); else if (q > 0.96) R.rect(x, y, Math.min(x1, x + 4), y, a_mez(B.acero, B.aceroS, 0.5)); }
  for (let x = x0 + 28; x < x1; x += 30) { const ya = calma && x > calma[0] ? calma[1] : y0; R.rect(x, ya, x, y1, B.aceroS); R.rect(x + 1, ya, x + 1, y1, B.aceroL); }
  for (let y = y0 + 31; y < y1; y += 33) { R.rect(x0, y, x1, y, B.aceroS); R.rect(x0, y + 1, x1, y + 1, B.aceroL); }
  for (let x = x0 + 28; x < x1; x += 30) for (let y = y0 + 4; y < y1; y += 11) { if (calma && x > calma[0] && y < calma[1]) continue; R.pset(x - 3, y, B.aceroD); R.pset(x - 3, y - 1, B.aceroB); R.pset(x + 4, y, B.aceroD); R.pset(x + 4, y - 1, B.aceroB); }
}

// suelo de mármol en damero, en perspectiva (yh: la línea de fuga): losas crema y verdes con vetas, juntas y motas
function a_marmol(R, y0, y1, yh, ancho = 0.55, fondo = 200) {
  const B = a_B;
  for (let y = y0; y <= y1; y++) { const d = y - yh; for (let x = 0; x < 320; x++) { const u = (x - 160) / (d * ancho) + 100.5, v = fondo / d, tu = Math.floor(u), tv = Math.floor(v), osc = (tu + tv) & 1;
      let c = osc ? B.verde : B.marmol;
      const ve = Math.sin(x * 0.11 + y * 0.31 + tu * 2.1 + tv * 3.7) + Math.sin(x * 0.05 - y * 0.23 + tu * 1.3);
      if (Math.abs(ve) < 0.07) c = osc ? B.verdeL : B.marmolS; else if (Math.abs(ve - 0.9) < 0.04) c = osc ? B.verdeS : B.vena; else if (h(x, y, 582) < 0.05) c = osc ? B.verdeS : B.marmolS;
      if (u - tu < 1 / (d * ancho) || v - tv < fondo / (d * d)) c = osc ? B.verdeS : B.marmolS;
      R.pset(x, y, c); } }
}

// un poste de latón con su cordón de terciopelo hasta el siguiente
function a_poste(R, x, y, hasta = null) {
  const B = a_B; if (hasta != null) for (let i = x; i <= hasta; i++) { const u = (i - x) / (hasta - x), yy = Math.round(y - 15 + 5 * 4 * u * (1 - u)); R.pset(i, yy, hex('#8e2434')); R.pset(i, yy + 1, hex('#5e1420')); if (i % 3 === 0) R.pset(i, yy, hex('#c0465a')); }
  R.rect(x - 1, y - 17, x + 1, y, C.k); R.rect(x, y - 16, x, y - 1, B.laton); R.disco(x + 0.5, y - 18.5, 2, C.k); R.disco(x + 0.5, y - 18.5, 1.2, B.latonL); R.rect(x - 3, y - 1, x + 3, y, C.k); R.rect(x - 2, y - 1, x + 2, y - 1, B.laton);
}

// la entrada redonda de la cámara acorazada: centro y radio
const a_VAULT = [272, 80, 25];

// LA CÁMARA DE CAJAS DE SEGURIDAD, lo fijo: techo, chapa, el vestíbulo por el hueco redondo, el marco y la hoja de la
// puerta, la pared de cajitas numeradas, el mármol con sus reflejos, la escalerilla, el carrito y los postes
function a_bancoFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, B = a_B, K = C.k, [vx, vy, vr] = a_VAULT;
  // el techo de hormigón con casetones y los fluorescentes
  rect(0, 0, 319, 13, B.techo); for (let x = 20; x < 320; x += 40) { rect(x, 0, x + 1, 12, B.techoS); } rect(0, 6, 319, 6, B.techoS); rect(0, 13, 319, 13, K);
  rect(0, 14, 319, 22, B.aceroS); rect(0, 14, 319, 14, B.aceroD); rect(0, 22, 319, 22, B.aceroD); for (let x = 5; x < 320; x += 9) { if (x > 262) continue; pset(x, 18, B.aceroL); pset(x, 19, B.aceroD); }
  for (const x of [44, 118, 192]) { rect(x - 1, 15, x + 27, 18, K); rect(x, 15, x + 26, 17, hex('#dfeaf4')); rect(x, 17, x + 26, 17, hex('#b8c8d8')); }
  // la pared del fondo y la entrada: chapa de acero; por el hueco redondo se ve el vestíbulo del banco
  a_chapa(R, 230, 23, 319, 112, 0, [262, 50]);
  for (let y = vy - vr; y <= vy + vr; y++) for (let x = vx - vr; x <= vx + vr; x++) { if ((x - vx) ** 2 + (y - vy) ** 2 > vr * vr) continue;
    let c = y < 62 ? B.vestibuloS : y < 86 ? B.vestibulo : y < 92 ? hex('#7a5a36') : ((x >> 2) + ((y - 92) >> 1)) & 1 ? B.marmol : B.marmolS;
    if (y >= 62 && y < 86 && (x - 250) % 12 === 0) c = B.vestibuloS; if (y === 62 || y === 86) c = hex('#9a8658');
    pset(x, y, c); }
  { const ps = (x, y, c) => { if ((x - vx) ** 2 + (y - vy) ** 2 <= vr * vr) pset(x, y, c); }, rc = (a, b, c, d, col) => { for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) ps(x, y, col); };
    // la ventanilla del cajero con su reja de latón, una lámpara y una palmera
    rc(256, 66, 276, 85, K); rc(257, 67, 275, 84, hex('#f0e2b4')); for (let x = 259; x < 275; x += 3) rc(x, 67, x, 80, B.latonS); rc(257, 80, 275, 81, B.laton); rc(254, 85, 278, 87, hex('#5e3a1e')); rc(254, 85, 278, 85, C.maderaL);
    rc(284, 56, 284, 62, K); rc(281, 62, 287, 65, B.latonL); rc(282, 66, 286, 66, C.blanco);
    rc(288, 84, 292, 91, hex('#8e5a30')); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.5; for (let r = 0; r < 9; r++) ps(Math.round(290 + Math.cos(a) * r), Math.round(83 + Math.sin(a) * r), i % 2 ? hex('#3a8a4a') : hex('#5cb05a')); } }
  // el marco redondo de la cámara: acero grueso con doce pernos y su luz arriba a la izquierda
  for (let y = vy - vr - 7; y <= vy + vr + 7; y++) for (let x = vx - vr - 7; x <= vx + vr + 7; x++) { const d = Math.hypot(x - vx, y - vy); if (d <= vr || d > vr + 6.5) continue; const luz = (vx - x) + (vy - y);
    pset(x, y, d > vr + 5.5 || d < vr + 1 ? K : d < vr + 2.2 ? B.aceroD : luz > 18 ? B.aceroB : luz > 0 ? B.aceroL : luz < -24 ? B.aceroS : B.acero); }
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2 + 0.26, x = Math.round(vx + Math.cos(a) * (vr + 3.8)), y = Math.round(vy + Math.sin(a) * (vr + 3.8)); pset(x, y, B.aceroD); pset(x - 1, y - 1, B.aceroB); }
  rect(vx - vr - 4, 110, vx + vr + 4, 112, K); rect(vx - vr - 3, 110, vx + vr + 3, 111, B.aceroL);
  // la hoja redonda de la puerta, abierta hacia la derecha: canto, cara interior con los cerrojos y el volante
  { const cx = 309, cy = 82, rx = 9, ry = 29;
    for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 5; x <= 319; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2, e2 = ((x - cx + 4) / rx) ** 2 + ((y - cy) / ry) ** 2;
      if (e <= 1) pset(x, y, e > 0.86 ? B.aceroD : (x - cx) + (y - cy) * 0.3 < -5 ? B.aceroL : y > cy + 14 ? B.aceroS : B.acero); else if (e2 <= 1) pset(x, y, e2 > 0.85 ? K : y < cy - 8 ? B.aceroB : y > cy + 12 ? B.aceroD : B.aceroS); else if (e <= 1.18 || e2 <= 1.16) pset(x, y, K); }
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = Math.round(cx + Math.cos(a) * 6), y = Math.round(cy + Math.sin(a) * 22); rect(x - 1, y - 1, x, y, B.aceroD); pset(x - 1, y - 1, B.aceroB); }
    rect(cx - 2, cy - 7, cx + 2, cy + 7, K); rect(cx - 1, cy - 6, cx + 1, cy + 6, B.laton); rect(cx - 1, cy - 6, cx - 1, cy + 6, B.latonL); linea(cx - 4, cy - 10, cx + 4, cy + 10, B.latonS); linea(cx + 4, cy - 10, cx - 4, cy + 10, B.latonS);
    for (const y of [cy - 18, cy + 18]) { rect(297, y - 2, 303, y + 2, K); rect(298, y - 1, 302, y + 1, B.aceroS); pset(298, y - 1, B.aceroB); } }
  // el teclado de la alarma (sus luces, en cada fotograma)
  rect(236, 62, 243, 76, K); rect(237, 63, 242, 75, B.aceroD); for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) pset(238 + i * 3, 68 + j * 2, B.aceroB);
  // la pared de cajas de seguridad: tres cuerpos entre pilastras con remaches, cuatro filas pequeñas, tres medianas con
  // tirador y una de cajones grandes; una caja está abierta, con su cajetín a medio sacar
  rect(0, 23, 229, 112, B.aceroD);
  let num = 101;
  for (let cu = 0; cu < 3; cu++) { const x0 = 10 + cu * 75;
    for (let f = 0; f < 4; f++) for (let c = 0; c < 5; c++) a_cajita(R, x0 + c * 14, 24 + f * 9, 14, 9, num++, false);
    for (let f = 0; f < 3; f++) for (let c = 0; c < 5; c++) a_cajita(R, x0 + c * 14, 60 + f * 12, 14, 12, num++, true);
    for (let c = 0; c < 2; c++) a_cajita(R, x0 + c * 35, 96, 35, 12, num++, true); }
  for (const x0 of [0, 80, 155]) { const w = x0 ? 4 : 9; rect(x0, 23, x0 + w, 108, B.aceroS); rect(x0, 23, x0, 108, B.aceroL); rect(x0 + w, 23, x0 + w, 108, B.aceroD); for (let y = 28; y < 108; y += 10) { pset(x0 + (w >> 1), y, B.aceroD); pset(x0 + (w >> 1), y - 1, B.aceroB); } }
  rect(0, 108, 229, 112, K); rect(0, 109, 229, 111, B.aceroS); rect(0, 109, 229, 109, B.aceroL); for (let x = 14; x < 226; x += 38) for (let i = 0; i < 5; i++) rect(x + i * 2, 110, x + i * 2, 111, B.hueco);
  { const bx = 113, by = 72; rect(bx, by, bx + 13, by + 11, B.hueco); rect(bx + 1, by + 2, bx + 12, by + 10, K); rect(bx + 2, by + 3, bx + 11, by + 10, B.aceroL); rect(bx + 2, by + 3, bx + 11, by + 3, B.aceroB); rect(bx + 5, by + 6, bx + 8, by + 7, B.laton); rect(bx + 2, by + 10, bx + 11, by + 10, B.aceroS);
    rect(bx - 4, by - 1, bx - 1, by + 12, K); rect(bx - 3, by, bx - 2, by + 11, B.aceroB); rect(bx - 2, by, bx - 2, by + 11, B.aceroS); }
  // la cámara de vigilancia (su luz y su giro, en cada fotograma) y la rejilla de ventilación
  rect(204, 15, 224, 20, K); for (let x = 205; x < 224; x += 2) rect(x, 16, x, 19, B.aceroL);
  // el suelo de mármol, con el reflejo de las cajas y el filo de latón
  a_marmol(R, 113, 179, 97);
  for (let y = 113; y < 134; y++) for (let x = 0; x < 320; x++) { const a = 0.34 * (1 - (y - 113) / 21); if (((x + y) & 1) === 0 || y < 120) a_velo(R, x, y, R.pget(x, 112 - Math.round((y - 113) * 1.6)), a); }
  rect(0, 113, 319, 113, K); for (let x = 0; x < 320; x++) if (x % 4 < 3) pset(x, 114, B.latonS);
  for (const fx of [57, 131, 205]) a_charco(R, fx, 150, 44, 9, C.blanco, 0.13);
  // la escalerilla, el carrito con dos cajetines y los postes con su cordón ante la puerta de la cámara
  a_charco(R, 34, 135, 14, 2, K, 0.3); rect(24, 126, 44, 128, K); rect(25, 126, 43, 127, B.aceroL); rect(28, 118, 40, 120, K); rect(29, 118, 39, 119, B.aceroL); for (const x of [25, 43]) linea(x, 128, x + (x < 30 ? -2 : 2), 134, K); for (const x of [29, 39]) linea(x, 120, x + (x < 30 ? -2 : 2), 126, K); rect(22, 134, 26, 135, K); rect(42, 134, 46, 135, K);
  a_charco(R, 200, 135, 16, 2, K, 0.3); rect(186, 120, 214, 122, K); rect(187, 120, 213, 121, B.aceroL); rect(187, 129, 213, 130, B.aceroS); for (const x of [187, 212]) rect(x, 122, x + 1, 133, B.aceroD); disco(189, 134, 1.6, K); disco(212, 134, 1.6, K); rect(214, 116, 215, 121, B.aceroD); rect(214, 115, 219, 116, K);
  rect(189, 114, 203, 120, K); rect(190, 115, 202, 119, B.acero); rect(190, 115, 202, 115, B.aceroB); rect(195, 117, 198, 117, B.laton); rect(192, 123, 208, 129, K); rect(193, 124, 207, 128, B.aceroL); rect(198, 126, 202, 126, B.laton);
  a_charco(R, 272, 133, 30, 2, K, 0.25); a_poste(R, 246, 132, 297); a_poste(R, 297, 132);
}

// LA CÁMARA DE CAJAS DE SEGURIDAD, cámara general
function a_banco(R, t, o) {
  const { rect, pset, linea } = R, B = a_B, K = C.k, [vx, vy, vr] = a_VAULT;
  a_fijo(R, 'banco', () => a_bancoFijo(R));
  // el guarda que pasea por el vestíbulo, visto por el hueco, y la reja de día por delante
  { const ps = (x, y, c) => { if ((x - vx) ** 2 + (y - vy) ** 2 <= (vr - 1) ** 2) pset(x, y, c); }, u = (t * 0.09) % 2, gx = Math.round(248 + (u < 1 ? u : 2 - u) * 42);
    a_figurita(ps, gx, 95, t, hex('#2a3a6a'), hex('#1c2444')); a_figurita(ps, 266, 80, t, hex('#8a3a4a'), hex('#5e3a1e'), false); if (Math.floor(t * 0.8) % 3 === 0) ps(267, 73, hex('#f0c090'));
    for (let x = vx - vr + 3; x < vx + vr; x += 4) for (let y = vy - vr; y <= vy + vr; y++) { ps(x, y, K); ps(x + 1, y, B.aceroL); }
    for (const y of [61, 99]) for (let x = vx - vr; x <= vx + vr; x++) { ps(x, y, K); ps(x, y + 1, B.aceroS); }
    rect(vx - 3, 78, vx + 3, 85, K); rect(vx - 2, 79, vx + 2, 84, B.laton); pset(vx, 81, K); pset(vx, 82, K); pset(vx - 2, 79, B.latonL); }
  // el brillo que recorre las cajas
  { const sx = ((t * 34) % 420) - 60; for (let y = 24; y <= 107; y++) { const x = Math.round(sx + (107 - y) * 0.6); for (let i = 0; i < 5; i++) if (x + i >= 10 && x + i <= 229) a_velo(R, x + i, y, C.blanco, i === 1 || i === 2 ? 0.42 : 0.2); } }
  // la cámara de vigilancia, que gira, y sus luces; el teclado de la alarma; un fluorescente que falla
  { const g = Math.round(Math.sin(t * 0.5) * 3); rect(232, 23, 234, 26, K); rect(229 + g, 26, 238 + g, 30, K); rect(230 + g, 27, 237 + g, 29, B.aceroB); rect(g > 0 ? 237 + g : 229 + g, 27, g > 0 ? 238 + g : 230 + g, 29, B.hueco); pset(233 + g, 28, Math.floor(t * 2) % 2 ? C.rojo : C.rojoS); }
  pset(238, 65, Math.floor(t * 1.2) % 2 ? C.verdeL : hex('#1e4a2a')); pset(241, 65, Math.floor(t * 0.4) % 5 === 0 ? C.rojo : C.rojoS); rect(238, 64, 238, 64, B.aceroD);
  { const u = t % 9.3; if (u < 0.08 || (u > 0.16 && u < 0.22)) { rect(118, 15, 144, 17, B.aceroL); } }
  // el destello de un tirador y las motas de polvo bajo la luz
  { const k = Math.floor(t * 1.4), x = 10 + (Math.floor(h(k, 1, 584) * 3) * 75) + Math.floor(h(k, 2, 584) * 5) * 14 + 7, y = 60 + Math.floor(h(k, 3, 584) * 3) * 12 + 8, f = (t * 1.4) % 1; if (f < 0.5) { pset(x, y, C.blanco); pset(x - 1, y, B.latonL); pset(x + 1, y, B.latonL); pset(x, y - 1, B.latonL); pset(x, y + 1, B.latonL); } }
  for (let k = 0; k < 9; k++) { const fy = (h(k, 3, 585) * 90 + t * (2 + h(k, 4, 585) * 2)) % 90, x = Math.round(40 + h(k, 5, 585) * 180 + Math.sin(t * 0.5 + k) * 3), y = Math.round(24 + fy); if (Math.sin(t * 1.4 + k * 2) > 0.2) pset(x, y, B.aceroB); }
  return { suelo: 150, sueloMin: 138, sueloMax: 156, cajas: [10, 24, 229, 107], abierta: [119, 78], puertaCamara: [vx, vy, vr], hoja: [309, 82], postes: [[246, 132], [297, 132]], escalerilla: [34, 134], carrito: [200, 134], mesa: [94, 157, 226, 179], libre: [50, 138, 240, 156] };
}

// lo de delante de la cámara del banco: la mesa de consulta de caoba con su lámpara verde, el libro de firmas y la pluma
function a_bancoDelante(R, t, o) {
  const { rect, pset, linea, poligono } = R, B = a_B, K = C.k;
  a_charco(R, 160, 178, 70, 2, K, 0.3);
  for (const x of [100, 214]) { rect(x, 165, x + 6, 179, K); rect(x + 1, 165, x + 5, 179, B.caobaS); rect(x + 1, 165, x + 2, 179, B.caoba); }
  rect(98, 164, 222, 172, K); rect(99, 165, 221, 171, B.caoba); rect(99, 171, 221, 171, B.caobaS); for (let x = 104; x < 218; x += 38) { rect(x, 166, x + 30, 170, B.caobaS); rect(x + 1, 167, x + 30, 170, B.caoba); rect(x + 13, 168, x + 17, 168, B.laton); }
  poligono([[99, 157], [221, 157], [226, 165], [94, 165]], K); poligono([[100, 158], [220, 158], [224, 163], [96, 163]], (x, y) => (h(x >> 3, y, 586) < 0.25 ? B.caobaL : B.caoba)); rect(95, 164, 225, 164, B.caobaL);
  poligono([[122, 159], [200, 159], [202, 162], [120, 162]], a_E.vade); { const g = ((t * 0.3) % 2) * 130; if (g < 122) rect(97 + Math.round(g), 164, 102 + Math.round(g), 164, hex('#f0b890')); }
  // la lámpara verde y su luz
  rect(104, 159, 116, 161, K); rect(105, 159, 115, 160, B.laton); rect(109, 149, 111, 158, K); rect(110, 149, 110, 158, B.laton); poligono([[100, 150], [121, 150], [118, 144], [103, 144]], K); poligono([[101, 149], [120, 149], [117, 145], [104, 145]], C.verde); rect(104, 145, 117, 145, C.verdeL); rect(102, 150, 119, 150, C.oroL);
  a_charco(R, 112, 161, 20, 3, C.oroL, 0.3);
  // el libro de firmas abierto, con renglones, y la pluma en su tintero
  poligono([[166, 158], [198, 158], [200, 163], [164, 163]], K); poligono([[167, 159], [197, 159], [198, 162], [166, 162]], C.blanco); rect(182, 159, 182, 162, C.grisL); for (let j = 0; j < 2; j++) { rect(169, 160 + j, 178 - j * 3, 160 + j, hex('#6a78b0')); rect(185, 160 + j, 190 + j * 4, 160 + j, hex('#6a78b0')); }
  rect(206, 157, 212, 162, K); rect(207, 158, 211, 161, hex('#2a2a4a')); pset(207, 158, C.grisL); linea(210, 157, 215, 148, K); linea(211, 157, 216, 148, C.blanco); pset(216, 147, C.blanco);
  return { mesa: [94, 157, 226, 179], tablero: [96, 158, 224, 163], lampara: [110, 150] };
}

// la pared de cajones grandes de la cámara 'caja' y el suelo, fijos
function a_cajaFijo(R) {
  const { rect, pset, disco } = R, B = a_B, K = C.k;
  rect(0, 0, 319, 13, B.techo); for (let x = 20; x < 320; x += 40) rect(x, 0, x + 1, 12, B.techoS); rect(0, 6, 319, 6, B.techoS); rect(0, 13, 319, 13, K);
  a_chapa(R, 0, 14, 319, 116, 3, [250, 52]);
  // cinco filas de cajones con placa de latón numerada, dos cerraduras y tirador; un hueco vacío: de ahí salió la caja
  rect(0, 16, 251, 116, B.aceroD); let num = 301;
  for (let f = 0; f < 5; f++) for (let c = 0; c < 7; c++) { const bx = 2 + c * 36 - 8, by = 17 + f * 20, w = 35, a = 19, vacio = f === 2 && c === 1; num++;
    if (vacio) { rect(bx, by, bx + w - 1, by + a - 1, K); rect(bx + 1, by + 1, bx + w - 2, by + a - 2, B.hueco); rect(bx + 1, by + a - 4, bx + w - 2, by + a - 2, hex('#22283a')); rect(bx - 5, by - 1, bx - 1, by + a, K); rect(bx - 4, by, bx - 2, by + a - 1, B.aceroB); rect(bx - 2, by, bx - 2, by + a - 1, B.aceroS); continue; }
    rect(bx, by, bx + w - 1, by + a - 1, B.aceroD); rect(bx, by, bx + w - 2, by + a - 2, B.acero); rect(bx, by, bx + w - 2, by, B.aceroL); rect(bx, by, bx, by + a - 2, B.aceroL); rect(bx + 1, by + a - 2, bx + w - 2, by + a - 2, B.aceroS);
    for (let i = 0; i < 4; i++) { const sx = bx + 3 + Math.floor(h(c, f * 5 + i, 587) * (w - 12)), sy = by + 2 + Math.floor(h(c, f * 5 + i, 588) * (a - 5)); rect(sx, sy, sx + 5, sy, i % 2 ? B.aceroL : B.aceroS); }
    rect(bx + 9, by + 2, bx + 24, by + 9, B.latonS); rect(bx + 10, by + 3, bx + 24, by + 9, B.laton); rect(bx + 10, by + 3, bx + 24, by + 3, B.latonL); a_num(R, num, bx + 12, by + 4, hex('#3a2a10'));
    for (const kx of [bx + 5, bx + 28]) { disco(kx + 0.5, by + 13.5, 2, B.latonS); pset(kx, by + 13, B.hueco); pset(kx, by + 14, B.hueco); pset(kx - 1, by + 12, B.latonL); }
    rect(bx + 12, by + 13, bx + 21, by + 15, B.aceroD); rect(bx + 12, by + 13, bx + 21, by + 13, B.aceroB); }
  // la sombra del fondo (queda desenfocado) y la pilastra de la derecha con su aplique
  for (let y = 16; y <= 116; y++) for (let x = 0; x <= 251; x++) a_velo(R, x, y, hex('#1c2238'), 0.2 + (y > 96 ? (y - 96) * 0.008 : 0));
  rect(252, 14, 257, 116, B.aceroS); rect(252, 14, 252, 116, K); rect(257, 14, 257, 116, B.aceroL);
  rect(284, 62, 292, 64, K); rect(285, 62, 291, 63, B.laton); rect(287, 64, 289, 72, B.latonS); R.poligono([[281, 62], [296, 62], [293, 52], [284, 52]], K); R.poligono([[282, 61], [295, 61], [292, 53], [285, 53]], hex('#f6e6b0'));
  rect(0, 113, 319, 116, K); rect(0, 114, 319, 115, B.aceroS); rect(0, 114, 319, 114, B.aceroL);
  a_marmol(R, 117, 179, 92, 0.75, 260);
  for (let y = 117; y < 132; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0 || y < 121) a_velo(R, x, y, R.pget(x, 116 - Math.round((y - 117) * 1.6)), 0.3 * (1 - (y - 117) / 15));
  rect(0, 117, 319, 117, K); for (let x = 0; x < 320; x++) if (x % 4 < 3) pset(x, 118, B.latonS);
  a_charco(R, 160, 172, 84, 6, K, 0.32);
}

// los colores de las doce piedras, por orden de hueco
const a_GEMAS = ['esmeralda', '#e03a4a', 'aguamarina', '#f0b030', '#a05ad8', '#f4f4fa', 'peridoto', '#3a5ae0', '#e86aa0', '#30c0b0', '#c0462a', '#e8e0f0'];

// los doce huecos de la caja (centro de abajo de cada piedra): dos filas de seis
const a_HUECOS = Array.from({ length: 12 }, (_, k) => [123 + (k % 6) * 15, k < 6 ? 122 : 131]);

// LA CAJA ABIERTA sobre la mesa de consulta (la pinta editorial() y la repinta editorialDelante()): mesa de caoba con
// tapete de cuero, la caja de acero con la tapa levantada (acolchada, con su placa), el interior de
// terciopelo con doce huecos y las piedras (o.piedras 0–12: cada una cae en su hueco y destella), la llave con su
// etiqueta que se balancea y la lupa; con o.tapa >= 0.5 la caja está cerrada (la tapa de acero con su placa, sin piedras)
function a_cajaMesa(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R, B = a_B, K = C.k, p = Math.max(0, Math.min(12, o.piedras ?? 0));
  // las patas torneadas y el faldón
  for (const x of [92, 220]) { rect(x, 160, x + 8, 175, K); rect(x + 1, 160, x + 7, 174, B.caobaS); rect(x + 1, 160, x + 3, 174, B.caoba); rect(x - 1, 166, x + 9, 168, K); rect(x, 167, x + 8, 167, B.caobaL); rect(x - 1, 174, x + 9, 176, K); rect(x, 175, x + 8, 175, B.caoba); }
  rect(84, 151, 236, 161, K); rect(85, 152, 235, 160, B.caoba); rect(85, 160, 235, 160, B.caobaS); for (let x = 92; x < 230; x += 48) { rect(x, 153, x + 40, 158, B.caobaS); rect(x + 1, 154, x + 40, 158, B.caoba); rect(x + 17, 156, x + 23, 156, B.laton); }
  // el tablero con su veta y el tapete de cuero verde con filete dorado
  poligono([[95, 118], [225, 118], [241, 152], [79, 152]], K); poligono([[96, 119], [224, 119], [238, 150], [82, 150]], (x, y) => (h(x >> 3, y, 589) < 0.25 ? B.caobaL : h((x + 5) >> 4, y, 590) < 0.14 ? B.caobaS : B.caoba)); rect(80, 151, 240, 151, B.caobaL);
  poligono([[103, 122], [217, 122], [229, 148], [91, 148]], (x, y) => ((x * 7 + y * 13) % 11 === 0 ? a_E.vadeL : (x * 5 + y * 3) % 9 === 0 ? a_E.vadeS : a_E.vade));
  linea(104, 123, 216, 123, B.latonS, 2); linea(93, 147, 227, 147, B.laton, 2); linea(103, 124, 92, 146, B.latonS, 2); linea(217, 124, 228, 146, B.latonS, 2);
  { const g = ((t * 0.3) % 2) * 160; if (g < 150) rect(82 + Math.round(g), 151, 88 + Math.round(g), 151, hex('#f0b890')); }
  a_charco(R, 160, 140, 64, 9, C.oroL, 0.12);
  const cerrada = (o.tapa ?? 0) >= 0.5;
  if (cerrada) { poligono([[109, 112], [211, 112], [218, 133], [102, 133]], K); poligono([[111, 113], [209, 113], [215, 131], [105, 131]], (x, y) => (y < 115 ? B.aceroB : h(x >> 2, y, 594) < 0.12 ? B.aceroB : x + y * 2 > 440 ? B.acero : B.aceroL));
    rect(148, 118, 172, 127, K); rect(149, 119, 171, 126, B.laton); rect(149, 119, 171, 119, B.latonL); a_num(R, '317', 155, 120, hex('#3a2a10')); { const g = ((t * 0.22) % 3) * 110; if (g < 100) for (let i = 0; i < 5; i++) a_velo(R, 108 + Math.round(g) + i, 122 + (i & 1), C.blanco, 0.6); } }
  else {
  // la tapa levantada: canto de acero, forro acolchado en rombos con botones y la placa con su número
  poligono([[109, 113], [211, 113], [215, 77], [105, 77]], K); poligono([[111, 112], [209, 112], [213, 79], [107, 79]], (x, y) => (y < 81 ? B.aceroB : x + y < 190 ? B.aceroL : B.acero));
  poligono([[115, 110], [205, 110], [208, 83], [112, 83]], (x, y) => { const a = (x + y * 2) % 12, b = (x - y * 2 + 480) % 12; return a === 0 || b === 0 ? B.terciopeloS : a === 1 || b === 1 ? B.terciopeloL : B.terciopelo; });
  for (let j = 0; j < 3; j++) for (let i = 0; i < 8; i++) { const x = 118 + i * 12 + (j % 2) * 6, y = 86 + j * 9; if (x < 204) pset(x, y, B.laton); }
  rect(150, 91, 170, 101, K); rect(151, 92, 169, 100, B.laton); rect(151, 92, 169, 92, B.latonL); rect(151, 100, 169, 100, B.latonS); a_num(R, '317', 155, 94, hex('#3a2a10'));
  { const g = ((t * 0.22) % 3) * 110; if (g < 100) for (let i = 0; i < 4; i++) a_velo(R, 109 + Math.round(g) + i, 79 + (i & 1), C.blanco, 0.7); }
  for (const x of [111, 208]) { linea(x, 112, x + (x < 160 ? -3 : 3), 96, K); linea(x + (x < 160 ? 1 : -1), 112, x + (x < 160 ? -2 : 2), 97, B.aceroL); }
  // el interior: terciopelo granate con sus doce huecos
  poligono([[109, 112], [211, 112], [218, 133], [102, 133]], K); poligono([[111, 113], [209, 113], [215, 131], [105, 131]], (x, y) => ((x + y * 3) % 5 === 0 ? B.terciopeloL : y < 115 ? B.terciopeloS : B.terciopelo));
  for (let x = 108; x < 213; x++) if (x & 1) pset(x, 124, B.terciopeloS);
  }
  // la cara de delante: acero cepillado, la placa, el asa y la cerradura con su llave y su etiqueta
  rect(101, 132, 219, 148, K); rect(102, 133, 218, 147, B.acero); rect(102, 133, 218, 134, B.aceroB); rect(102, 146, 218, 147, B.aceroS); rect(102, 133, 102, 147, B.aceroL); rect(217, 135, 218, 147, B.aceroS);
  for (let i = 0; i < 24; i++) { const x = 105 + Math.floor(h(i, 1, 591) * 104), y = 136 + Math.floor(h(i, 2, 591) * 10); rect(x, y, x + 3 + (i % 4), y, i % 2 ? B.aceroL : B.aceroS); }
  rect(108, 136, 130, 144, K); rect(109, 137, 129, 143, B.laton); rect(109, 137, 129, 137, B.latonL); a_num(R, '317', 114, 138, hex('#3a2a10'));
  rect(146, 137, 174, 143, K); rect(147, 138, 173, 139, B.aceroB); rect(147, 140, 173, 142, B.aceroD); rect(150, 141, 170, 141, B.aceroS); rect(148, 138, 149, 142, B.aceroL); rect(171, 138, 172, 142, B.aceroL);
  disco(199.5, 139.5, 3.4, K); disco(199.5, 139.5, 2.4, B.laton); pset(198, 138, B.latonL); rect(199, 139, 199, 141, K);
  { const sw = Math.sin(t * 2.3) * 2.2; rect(201, 139, 205, 140, B.latonL); disco(206.5, 139.5, 1.6, B.laton); linea(206, 141, 206 + sw, 146, K); const ex = Math.round(206 + sw); rect(ex - 2, 146, ex + 2, 151, K); rect(ex - 1, 147, ex + 1, 150, C.rojo); pset(ex, 148, C.blanco); }
  for (let x = 102; x <= 220; x++) if ((x & 1) === 0) a_velo(R, x, 149, K, 0.5);
  // los huecos y las piedras: las que ya están destellan por turnos; la que llega, cae en su sitio
  const ent = Math.floor(p), fr = p - ent;
  if (!cerrada) a_HUECOS.forEach(([x, y]) => { for (let i = -4; i <= 4; i++) { pset(x + i, y - 2, hex('#2a0812')); if (Math.abs(i) < 4) { pset(x + i, y - 3, hex('#2a0812')); pset(x + i, y - 1, K); } if (Math.abs(i) < 3) pset(x + i, y, B.terciopeloL); } });
  if (!cerrada) a_HUECOS.forEach(([x, y], k) => { if (k > ent || (k === ent && fr < 0.08)) return; const cae = k === ent ? (1 - fr) ** 2 * 26 : 0, brilla = k < ent && (k * 5 + Math.floor(t * 1.6)) % 4 === 0, col = a_GEMAS[k];
    if (!cae) { const cc = hex(col[0] === '#' ? col : { esmeralda: '#2eb872', aguamarina: '#62cce8', peridoto: '#a8d430' }[col]); pset(x - 6, y - 1, cc); pset(x + 6, y - 1, cc); pset(x - 5, y, a_mez(cc, B.terciopelo, 0.5)); pset(x + 5, y, a_mez(cc, B.terciopelo, 0.5)); }
    PIEZAS_CF.piedra(R, x, Math.round(y - cae), brilla ? { color: col, t: (t * 1.6) % 1 } : { color: col }); });
  // la lupa de joyero
  disco(229.5, 141.5, 4.5, K); disco(229.5, 141.5, 3.5, hex('#cfe6f0')); pset(228, 140, C.blanco); pset(229, 139, C.blanco); linea(232, 145, 236, 149, K); linea(233, 145, 237, 149, C.maderaL);
  return { mesa: [79, 118, 241, 176], tablero: [82, 119, 238, 150], caja: [101, 112, 219, 148], tapa: cerrada ? [102, 112, 218, 133] : [105, 77, 215, 113], huecos: a_HUECOS };
}

// LA CÁMARA DE CAJAS, cámara 'caja': la pared de cajones (más cerca), el aplique que tiembla y la mesa con la caja
function a_bancoCaja(R, t, o) {
  const { pset, rect } = R, B = a_B;
  a_fijo(R, 'caja', () => a_cajaFijo(R));
  // la luz del aplique, que tiembla, y el brillo que recorre los cajones
  { const f = 0.2 + Math.sin(t * 7) * 0.03 + (Math.floor(t * 3) % 7 === 0 ? -0.05 : 0); for (let j = 0; j < 36; j++) for (let i = -14 - (j >> 1); i <= 14 + (j >> 1); i++) if (((i + j) & 1) === 0 && a_BAYER[(j & 3) * 4 + (i & 3)] > j / 40) a_velo(R, 288 + i, 64 + j, C.oroL, f); rect(283, 62, 293, 62, C.oroL); }
  { const sx = ((t * 30) % 460) - 70; for (let y = 17; y <= 112; y++) { const x = Math.round(sx + (112 - y) * 0.6); for (let i = 0; i < 6; i++) if (x + i >= 0 && x + i <= 250) a_velo(R, x + i, y, C.blanco, i === 2 || i === 3 ? 0.34 : 0.16); } }
  { const k = Math.floor(t * 1.2), x = 2 + Math.floor(h(k, 1, 592) * 7) * 36 - 8 + 5, y = 17 + Math.floor(h(k, 2, 592) * 5) * 20 + 13; if ((t * 1.2) % 1 < 0.45 && x > 2) { pset(x, y, C.blanco); pset(x - 1, y, B.latonL); pset(x + 1, y, B.latonL); pset(x, y - 1, B.latonL); pset(x, y + 1, B.latonL); } }
  for (let k = 0; k < 8; k++) { const fy = (h(k, 3, 593) * 60 + t * (2 + h(k, 4, 593) * 2)) % 60, x = Math.round(268 + h(k, 5, 593) * 44 + Math.sin(t * 0.5 + k) * 3), y = Math.round(66 + fy); if (Math.sin(t * 1.4 + k * 2) > 0.2) pset(x, y, C.oroL); }
  const g = a_cajaMesa(R, t, o);
  return { suelo: 160, sueloMin: 150, sueloMax: 170, ...g, hueco: [30, 57, 64, 75], aplique: [288, 58], libre: [[4, 150, 76, 170], [244, 150, 316, 170]] };
}

// una capa fija: se pinta una vez en un búfer de R.nuevo() y se guarda con su clave
const b_capas = new Map();

function b_capa(R, clave, dibuja) { let b = b_capas.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); b_capas.set(clave, b); } return b; }

// vuelca una capa con huecos (0 = transparente) sobre lo que haya: los términos de delante de un decorado
function b_sobre(R, capa) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = capa[i]; if (c) B[i] = c; } }

// una rampa de colores (de la sombra a la luz) y la mezcla de dos colores (u = 0 el primero, 1 el segundo)
const b_rp = (...a) => a.map((c) => hex(c));

const b_mz = (a, b, u) => { const f = (s) => Math.round(((a >> s) & 255) + (((b >> s) & 255) - ((a >> s) & 255)) * u); return ((255 << 24) | (f(16) << 16) | (f(8) << 8) | f(0)) >>> 0; };

// un resplandor: mezcla lo que hay con col, más cuanto más cerca del centro (f: fuerza 0–1), tramado en el borde
export function b_luz(R, cx, cy, r, col, f = 0.7) {
  for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    const g = 1 - Math.hypot(x - cx, y - cy) / r; if (g <= 0) continue; const a = g * g * f; if (a < 0.12 && a * 8 < R.b4(x, y)) continue; R.pset(x, y, b_mz(R.pget(x, y), col, Math.min(1, a))); }
}

// un destello en cruz de 1 a 2 px de brazo (gemas, estrellas, espuma); u 0–1 lo abre y lo cierra
export function b_destello(R, x, y, u, col) { const r = u > 0.66 ? 2 : u > 0.33 ? 1 : 0; R.pset(x, y, col); for (let k = 1; k <= r; k++) { R.pset(x - k, y, col); R.pset(x + k, y, col); R.pset(x, y - k, col); R.pset(x, y + k, col); } }

// una copa de hojas: una elipse de borde roto, con mechones y la luz que viene de (lx, ly) (vector hacia la luz)
function b_copa(R, cx, cy, rx, ry, RP, k = 0, lx = -0.7, ly = -0.7) {
  for (let y = Math.floor(cy - ry - 2); y <= cy + ry + 2; y++) for (let x = Math.floor(cx - rx - 2); x <= cx + rx + 2; x++) {
    const dx = (x - cx) / rx, dy = (y - cy) / ry, d = dx * dx + dy * dy + (h(x >> 1, y >> 1, k) - 0.5) * 0.55; if (d > 1) continue;
    const mech = h(Math.floor((x + y * 0.5) / 3), Math.floor((y - x * 0.3) / 3), k + 5);
    const v = (RP.length - 1) * 0.42 + (dx * lx + dy * ly) * 1.3 + (mech - 0.5) * 1.9 + (d > 0.78 ? -0.7 : 0);
    R.pset(x, y, R.tone4(RP, v, x, y)); }
}

// un tronco retorcido: el eje [[y, cx, ancho], …] de arriba abajo; corteza con vetas que se retuercen, la luz por el lado
// luz (-1 izquierda, 1 derecha), el filo de luna (último tono de la rampa) y el contorno (el primero)
function b_tronco(R, eje, RP, o = {}) {
  const luz = o.luz ?? -1, k = o.k ?? 0, n4 = RP.length - 1;
  for (let n = 0; n + 1 < eje.length; n++) { const [y0, c0, w0] = eje[n], [y1, c1, w1] = eje[n + 1];
    for (let y = y0; y < y1; y++) { const u = (y - y0) / (y1 - y0), e = u * u * (3 - 2 * u), cx = c0 + (c1 - c0) * e + Math.sin(y * 0.11 + k) * 1.5, w = w0 + (w1 - w0) * e;
      for (let x = Math.floor(cx - w); x <= cx + w; x++) { const s = (x - cx) / w;
        const veta = Math.sin((x - cx) * 0.85 + Math.sin(y * 0.07 + k) * 2.6 + s * 2) * 0.6 + (h(x, y >> 2, k) - 0.5) * 0.8;
        let v = n4 * 0.5 + luz * s * 1.5 + veta; if (Math.abs(x - cx) > w - 1.2) v = luz * s > 0 ? n4 : 0; else v = Math.min(v, n4 - 1);
        R.pset(x, y, R.tone4(RP, v, x, y)); } } }
}

// una rama (o una raíz) gruesa de (x0, y0) a (x1, y1), que se estrecha de w0 a w1 y se comba c px
function b_rama(R, x0, y0, x1, y1, w0, w1, RP, c = 0) {
  const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0)), n4 = RP.length - 1;
  for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * c, w = w0 + (w1 - w0) * u;
    for (let j = -w; j <= w; j += 0.5) { const yy = Math.round(y + j), xx = Math.round(x); R.pset(xx, yy, j <= -w + 1 ? RP[n4 - 1] : j >= w - 0.6 ? RP[0] : R.tone4(RP, n4 * 0.45 - j / w + (h(xx >> 1, yy, 9) - 0.5), xx, yy)); } }
}

// una seta: el pie claro y el sombrero (rampa de 3: sombra, color, luz) con lunares; s: el radio del sombrero
function b_seta(R, x, y, s, RP, lunar = hex('#fff4e0')) {
  const pie = Math.max(2, Math.round(s * 0.9));
  for (let j = 0; j < pie; j++) { R.pset(x - 1, y - j, hex('#cdbfae')); R.pset(x, y - j, hex('#f4ead8')); if (s > 3) R.pset(x + 1, y - j, hex('#a8988e')); }
  const cy = y - pie;
  for (let j = 0; j <= Math.round(s * 0.75); j++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - (j / (s * 0.75 + 0.5)) ** 2)) * s); for (let i = -w; i <= w; i++) R.pset(x + i, cy - j, j === 0 ? RP[0] : i < -w * 0.3 && j > 1 ? RP[2] : RP[1]); }
  if (s >= 3) { R.pset(x - 1, cy - 2, lunar); R.pset(x + Math.round(s * 0.5), cy - 1, lunar); if (s >= 5) { R.pset(x - Math.round(s * 0.6), cy - 1, lunar); R.pset(x + 1, cy - Math.round(s * 0.6), lunar); R.pset(x + 2, cy - 2, lunar); } }
}

// un helecho: frondas curvas con sus hojitas, que se mecen con a (radianes de más)
function b_helecho(R, x, y, len, n, cols, a = 0) {
  for (let f = 0; f < n; f++) { const an = -Math.PI / 2 + (f - (n - 1) / 2) * (2.2 / n) + a * (0.5 + 0.5 * Math.abs(f - (n - 1) / 2)); let px = x, py = y;
    for (let i = 0; i < len; i++) { const cur = an + (f - (n - 1) / 2) * i * 0.035; px += Math.cos(cur); py += Math.sin(cur) + i * 0.035; const X = Math.round(px), Y = Math.round(py);
      R.pset(X, Y, cols[1]); if (i % 2 === 0 && i > 1) { const l = Math.max(1, Math.round((1 - i / len) * 3)); for (let q = 1; q <= l; q++) { R.pset(Math.round(px - Math.sin(cur) * q), Math.round(py + Math.cos(cur) * q), cols[0]); R.pset(Math.round(px + Math.sin(cur) * q), Math.round(py - Math.cos(cur) * q), cols[2]); } } } }
}

// una nube de cuento: bultos redondos sobre una base plana, en tres tonos (sombra abajo, cuerpo y luz arriba a la izquierda)
function b_nube(R, cx, cy, w, RP, k = 0) {
  const n = Math.max(3, Math.round(w / 7));
  for (let b = 0; b < n; b++) { const u = (b + 0.5) / n, bx = cx - w / 2 + u * w, r = (2.5 + Math.sin(u * Math.PI) * w * 0.14) * (0.75 + h(b, k, 3) * 0.5), by = cy - r * 0.6;
    for (let y = Math.floor(by - r); y <= cy; y++) for (let x = Math.floor(bx - r); x <= bx + r; x++) { const dx = x - bx, dy = y - by; if (dx * dx + dy * dy > r * r) continue;
      const v = 1.2 - dy / r * 1.1 - dx / r * 0.5 - (cy - y < 2 ? 1 : 0); R.pset(x, y, R.tone4(RP, v, x, y)); } }
}

// la orla de la ilustración: un marco dorado fino con cenefa, esquinas con gema abajo y zarcillos en los lados; arriba y
// en la esquina de Atom es un filete liso y apagado (la barra del año y Atom van encima). Se calcula una vez (lista de
// píxeles) y se pinta en cuento() y otra vez en cuentoDelante(); un brillo recorre el oro con t
let b_orlaPx = null;

function b_orla(R, t, gema = '#c8a0ff') {
  if (!b_orlaPx) {
    const b = R.nuevo(), prev = R.usar(b), K = hex('#1c1222'), O = b_rp('#6a4a14', '#a87a18', '#e0b040', '#ffe890'), OA = b_rp('#3a2c3a', '#5a4638', '#6e5636');
    // arriba: filete liso y apagado
    R.rect(0, 0, 319, 0, K); R.rect(0, 1, 319, 1, OA[1]); R.rect(0, 2, 319, 2, K);
    // lados y abajo: 5 px con cenefa
    const lado = (x0, dx, y0) => { for (let y = y0; y < 180; y++) { R.pset(x0, y, K); R.pset(x0 + dx, y, O[1]); R.pset(x0 + 2 * dx, y, y % 6 < 3 ? O[2] : O[1]); R.pset(x0 + 3 * dx, y, O[0]); R.pset(x0 + 4 * dx, y, K); if (y % 12 === 5) { R.pset(x0 + 2 * dx, y, O[3]); R.pset(x0 + 5 * dx, y, O[1]); R.pset(x0 + 5 * dx, y + 1, K); R.pset(x0 + 6 * dx, y - 1, O[0]); } } };
    lado(0, 1, 3); lado(319, -1, 50);
    for (let y = 3; y < 50; y++) { R.pset(319, y, K); R.pset(318, y, OA[1]); R.pset(317, y, K); }
    for (let x = 0; x < 320; x++) { R.pset(x, 179, K); R.pset(x, 178, O[1]); R.pset(x, 177, x % 6 < 3 ? O[2] : O[1]); R.pset(x, 176, O[0]); R.pset(x, 175, K); if (x % 12 === 5 && x > 14 && x < 306) { R.pset(x, 177, O[3]); R.pset(x, 174, O[1]); R.pset(x + 1, 174, K); R.pset(x - 1, 173, O[0]); } }
    // esquinas de abajo (rombo con gema) y la de arriba a la izquierda (pequeña)
    const esquina = (cx, cy, r, g) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.abs(i) + Math.abs(j); if (d > r) continue; R.pset(cx + i, cy + j, d === r ? K : d >= r - 1 ? O[i + j < 0 ? 3 : 1] : d >= r - 2 ? O[0] : g ? (i + j < -1 ? hex('#ffffff') : i + j < 1 ? hex(gema) : b_mz(hex(gema), K, 0.45)) : O[2]); } };
    esquina(5, 174, 7, true); esquina(314, 174, 7, true); esquina(4, 5, 4, false);
    for (const [sx, d] of [[12, 1], [307, -1]]) for (let i = 0; i < 9; i++) { R.pset(sx + d * i, 172 - Math.round(Math.sin(i * 0.7) * 2), O[2]); R.pset(sx - d * 0 + d * (i >> 1) - d * 8, 166 - i, O[2]); }
    R.usar(prev); const ix = [], co = []; for (let i = 0; i < 57600; i++) if (b[i]) { ix.push(i); co.push(b[i]); }
    b_orlaPx = [ix, co];
  }
  const B = R.buf, [ix, co] = b_orlaPx; for (let k = 0; k < ix.length; k++) B[ix[k]] = co[k];
  // el brillo que recorre el oro de abajo y de la izquierda
  const u = (t * 40) % 700, L = hex('#fff8d0');
  if (u < 300) { for (let i = 0; i < 5; i++) R.pset(12 + u + i, 177, L); } else if (u < 460) { for (let i = 0; i < 4; i++) R.pset(2, 170 - (u - 300) + i, L); }
}

const b_BQ = { luna: [128, 46, 13], suelo: 152, castillo: [222, 96], puerta: [36, 141] };

const b_CORTEZA = b_rp('#160f2a', '#2a1a40', '#44285a', '#643a6a', '#8a5a80', '#c8a8d8');

const b_CORTEZA_L = b_rp('#141234', '#1e1a4a', '#2c2660', '#3e3478', '#5a4c96');

const b_HOJA = b_rp('#0c1430', '#12203e', '#18324c', '#20485a', '#2e6a68', '#4a9a80');

// el cielo del cuento (fijo): degradado tramado de añil a rosa, estrellas quietas, la luna con cráteres y su halo
function b_bosqueCielo(R) {
  const SK = b_rp('#16123c', '#1e1750', '#2b1e6c', '#422a86', '#643694', '#8c4298', '#b85694', '#de7a8e', '#f6a488');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone4(SK, y / 122 * 8 + (h(x >> 2, y >> 1, 3) - 0.5) * 0.7 + Math.sin(x * 0.02 + y * 0.05) * 0.3, x, y));
  for (let k = 0; k < 110; k++) { const x = Math.floor(h(k, 1) * 320), y = Math.floor(h(k, 2) * 96); R.pset(x, y, hex(k % 5 === 0 ? '#fff0c8' : k % 3 === 0 ? '#c8b0ff' : '#8a78d0')); }
  // la vía láctea: una banda de polvo de estrellas en diagonal
  for (let k = 0; k < 260; k++) { const u = h(k, 7), x = Math.floor(u * 340 - 10), y = Math.floor(18 + u * 60 + (h(k, 8) - 0.5) * 22 * (0.4 + h(k, 9))); if (y < 100) R.pset(x, y, hex(k % 4 === 0 ? '#b8a0f0' : '#6a58b8')); }
  const [lx, ly, lr] = b_BQ.luna; b_luz(R, lx, ly, 40, hex('#f8e0c0'), 0.75);
  R.disco(lx, ly, lr, (x, y, d) => { const s = (x - lx + (y - ly)) / lr; return d > 0.92 ? hex('#e8cc98') : R.tone4(b_rp('#d8bc8c', '#f0dca8', '#fff4cc', '#fffbe8'), 2.2 - s * 1.1 + (h(x >> 1, y >> 1, 4) - 0.5) * 0.8, x, y); });
  for (const [dx, dy, r] of [[-4, -3, 2.5], [3, 2, 3], [-2, 5, 1.6], [5, -5, 1.5], [-7, 3, 1.2]]) { R.disco(lx + dx, ly + dy, r, hex('#e0c898')); R.disco(lx + dx + 0.6, ly + dy + 0.6, r - 0.8, hex('#ecd8a8')); }
}

// el fondo (con huecos): tres sierras de niebla con pinos, el castillo sobre su peña y el puente
function b_bosqueFondo(R) {
  const sierras = [[90, 7, 0.021, b_rp('#6a469c', '#7c52a8', '#9060b0'), 1], [101, 6, 0.033, b_rp('#4a3486', '#583c94', '#6846a0'), 2], [112, 5, 0.027, b_rp('#2c2264', '#362a72', '#423280'), 3]];
  const cima = (s, x) => s[0] + Math.sin(x * s[2] + s[4] * 2) * s[1] + Math.sin(x * s[2] * 2.7 + s[4]) * s[1] * 0.4;
  const castillo = () => {
    const [cx, base] = b_BQ.castillo, P = b_rp('#3a2c78', '#5244a0', '#6e60c0', '#9488dc', '#c0b4f0'), T = b_rp('#5a2458', '#8a3870', '#b85888');
    // la peña
    for (let y = base - 14; y < base + 12; y++) for (let x = cx - 34; x <= cx + 34; x++) { const w = 12 + (y - base + 14) * 1.5 + Math.sin(y * 0.9) * 2; if (Math.abs(x - cx) < w) R.pset(x, y, R.tone4(b_rp('#30246a', '#40307e', '#544096', '#6a54a8'), 1.6 - (x - cx) / w * 1.5 + (h(x >> 1, y >> 1, 12) - 0.5) * 1.4, x, y)); }
    const torre = (x, w, top, bot, tejado) => {
      for (let y = top; y <= bot; y++) for (let i = -w; i <= w; i++) R.pset(x + i, y, R.tone4(P, 2.1 - i / w * 1.6 + ((y % 4 === 0) ? -0.5 : 0) + (h(x + i, y, 2) - 0.5) * 0.5, x + i, y));
      for (let i = -w - 1; i <= w + 1; i++) { R.pset(x + i, top, P[i < 0 ? 4 : 2]); if ((i + w + 1) % 2 === 0 && !tejado) R.pset(x + i, top - 1, P[i < 0 ? 3 : 1]); }
      if (tejado) for (let j = 0; j < tejado; j++) { const ww = Math.round((w + 1) * (1 - j / tejado)); for (let i = -ww; i <= ww; i++) R.pset(x + i, top - 1 - j, i < -ww * 0.2 ? T[2] : i > ww * 0.5 ? T[0] : T[1]); }
    };
    // el puente de arcos a la izquierda
    for (let x = cx - 44; x < cx - 16; x++) { const a = (x - cx + 44) % 9; for (let y = base - 10; y < base + 2; y++) if (y < base - 7 || a === 0 || (y - (base - 7)) < (4 - Math.abs(a - 4.5)) * 0.2) R.pset(x, y, y === base - 10 ? P[3] : P[1]); }
    torre(cx, 9, base - 24, base - 8, 0); torre(cx - 13, 4, base - 30, base - 9, 8); torre(cx + 12, 5, base - 36, base - 10, 10); torre(cx - 2, 3, base - 44, base - 24, 9); torre(cx + 22, 3, base - 22, base - 8, 6); torre(cx - 22, 3, base - 20, base - 6, 5);
    R.rect(cx - 2, base - 15, cx + 2, base - 9, hex('#241a54')); R.rect(cx - 1, base - 16, cx + 1, base - 16, hex('#241a54'));
  };
  sierras.forEach((s, n) => {
    for (let x = 0; x < 320; x++) { const y0 = Math.round(cima(s, x)); for (let y = y0; y < 126; y++) { const prof = (y - y0) / 16; let c = R.tone4(s[3], 2.2 - prof * 2 + (h(x >> 1, y, n) - 0.5) * 0.9, x, y);
      // la niebla que se posa al pie de cada sierra
      if (prof > 0.45 && (prof - 0.45) * 1.5 > R.b4(x, y)) c = b_mz(c, hex('#c890c0'), 0.35 - n * 0.08); R.pset(x, y, c); }
      // pinos en la cresta
      if (h(x, n, 21) < 0.34) { const al = 2 + Math.floor(h(x, n, 22) * (3 + n * 2)); for (let j = 0; j < al; j++) { const w = Math.round(j * 0.45); for (let i = -w; i <= w; i++) R.pset(x + i, y0 - al + j, i < 0 ? s[3][2] : s[3][0]); } } }
    // una aldea lejana en la segunda sierra: casitas con tejado y una ventana (la luz la pone la vida)
    if (n === 1) { for (const x of b_ALDEA) { const y = Math.round(cima(s, x)); R.rect(x - 2, y - 3, x + 2, y, hex('#3a2c78')); for (let j = 0; j < 3; j++) R.rect(x - 3 + j, y - 4 - j, x + 3 - j, y - 4 - j, hex(j ? '#8a3870' : '#5a2458')); R.pset(x + 2, y - 7, hex('#3a2c78')); } castillo(); }
  });
}

// lo de cerca (con huecos): la bóveda de hojas, los dos árboles enormes de los lados, otros dos más finos detrás, el claro
// con el camino de luna, el estanque, setas, flores, piedras y raíces
function b_bosqueCerca(R) {
  const S = b_BQ.suelo, MUSGO = b_rp('#0e2238', '#14343e', '#1c4c46', '#286a4e', '#3c8858', '#5aa868'), CAM = b_rp('#4a3c70', '#665488', '#8472a0', '#a492b8', '#c4b4d0', '#e0d4e4');
  // el suelo: musgo con matas y el camino que cruza (y sube hacia el castillo)
  const caminoY = (x) => S - 1 + Math.sin(x * 0.033) * 3, caminoW = (x) => 8.5 + Math.sin(x * 0.085 + 1) * 1.5;
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) {
    const borde = 122 + Math.sin(x * 0.11) * 1.5 + Math.sin(x * 0.37) * 1; if (y < borde) continue;
    const dy = Math.abs(y - caminoY(x)) / caminoW(x), bx = 212 + (146 - y) * 0.45 + Math.sin(y * 0.22) * 3, db = y < 147 ? Math.abs(x - bx) / (1.5 + (y - 121) * 0.22) : 9;
    const sombra = Math.sin((x - y * 1.6) * 0.045 + 1) > 0.55 ? 1 : 0;
    if (dy < 1 || db < 1) { const d = Math.min(dy, db); let v = 3.4 - d * d * 1.6 + (h(x >> 1, y, 31) - 0.5) * 1.3 - sombra * 1.3 + (h(x, y, 32) < 0.04 ? 1.6 : 0) - (h(x, y, 33) < 0.05 ? 1.5 : 0); if (y < 140) v -= (140 - y) * 0.12; R.pset(x, y, R.tone4(CAM, v, x, y)); }
    else { const mech = h(Math.floor(x / 3 + y * 0.3), Math.floor(y / 2), 34); R.pset(x, y, R.tone4(MUSGO, 1.2 + (y - 122) / 58 * 1.6 + (mech - 0.5) * 2.2 - sombra * 0.7 + (Math.min(dy, db) < 1.4 ? 0.8 : 0), x, y)); }
  }
  const enCamino = (x, y) => Math.abs(y - caminoY(x)) < caminoW(x) + 1;
  // losas del camino: juntas oscuras cortas
  for (let k = 0; k < 90; k++) { const x = 46 + Math.floor(h(k, 41) * 274), y = Math.round(caminoY(x) + (h(k, 42) - 0.5) * 12); for (let i = 0; i < 3 + (k % 3); i++) R.pset(x + i, y + (i > 2 ? 1 : 0), CAM[1]); R.pset(x + 1, y + 1, CAM[5]); }
  // matas de hierba, flores y hojas caídas en el musgo
  for (let k = 0; k < 260; k++) { const x = Math.floor(h(k, 43) * 320), y = 124 + Math.floor(h(k, 44) * 54); if (enCamino(x, y)) continue; const c = MUSGO[3 + (k % 3)];
    R.pset(x, y, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 2, MUSGO[5]); R.pset(x + 1, y - 1, c);
    if (k % 4 === 0) { const f = hex(['#ff8ac8', '#fff4d0', '#ffd84a', '#9ad8ff', '#e0a0ff'][k % 5]); R.pset(x + 3, y - 2, f); R.pset(x + 3, y - 1, MUSGO[4]); if (k % 8 === 0) { R.pset(x + 2, y - 2, f); R.pset(x + 4, y - 2, f); R.pset(x + 3, y - 3, f); R.pset(x + 3, y - 2, hex('#fff8a0')); } } }
  // el estanque con su orilla de piedras
  for (let y = 162; y < 175; y++) for (let x = 205; x < 268; x++) { const d = ((x - 236) / 28) ** 2 + ((y - 168) / 5.5) ** 2 + (h(x >> 1, y, 45) - 0.5) * 0.15; if (d < 1) R.pset(x, y, d > 0.8 ? hex('#0c1640') : R.tone4(b_rp('#141e5a', '#1c2c78', '#2a4496', '#4a6cc0'), 1 + (y - 164) * 0.25 + Math.sin(x * 0.5 + y) * 0.4, x, y)); else if (d < 1.25 && h(x >> 1, y >> 1, 46) < 0.6) R.pset(x, y, h(x >> 1, y >> 1, 47) < 0.5 ? CAM[3] : CAM[1]); }
  // los árboles finos de detrás (azulados, más lejos)
  b_tronco(R, [[0, 80, 6], [60, 76, 6], [110, 80, 8], [128, 79, 13]], b_CORTEZA_L, { k: 3 });
  b_tronco(R, [[0, 250, 5], [70, 247, 5], [112, 250, 7], [127, 249, 11]], b_CORTEZA_L, { k: 5 });
  b_rama(R, 82, 58, 104, 40, 2.5, 1, b_CORTEZA_L, -3); b_rama(R, 246, 64, 226, 50, 2.2, 1, b_CORTEZA_L, -2); b_rama(R, 77, 84, 60, 74, 2, 0.8, b_CORTEZA_L, 2);
  // el hueco del búho en el árbol fino de la izquierda
  R.disco(79.5, 92.5, 3.6, hex('#0a0a24')); R.disco(79.5, 92.5, 4.4, (x, y, d) => (d > 0.82 ? b_CORTEZA_L[4] : null) ?? R.pget(x, y));
  // los dos gigantes de los lados, con raíces
  b_tronco(R, [[0, 10, 24], [40, 16, 22], [90, 12, 25], [124, 15, 31], [144, 18, 44], [158, 14, 58]], b_CORTEZA, { k: 1 });
  b_tronco(R, [[0, 306, 20], [50, 303, 19], [96, 307, 22], [126, 304, 28], [146, 300, 40], [160, 304, 52]], b_CORTEZA, { k: 2 });
  b_rama(R, 40, 150, 78, 163, 4, 1.2, b_CORTEZA, 3); b_rama(R, 30, 158, 60, 174, 4, 1.5, b_CORTEZA, 2); b_rama(R, 276, 150, 244, 160, 3.5, 1, b_CORTEZA, 3);
  b_rama(R, 30, 52, 62, 30, 5, 2, b_CORTEZA, -4); b_rama(R, 34, 84, 58, 70, 3, 1.2, b_CORTEZA, -2); b_rama(R, 290, 58, 262, 40, 4.5, 1.8, b_CORTEZA, -3); b_rama(R, 286, 92, 268, 82, 2.6, 1, b_CORTEZA, -2);
  // nudos de la corteza y repisas de setas en los troncos
  for (const [x, y, r] of [[8, 70, 4], [22, 104, 3], [300, 118, 4], [296, 66, 3]]) { R.disco(x, y, r, b_CORTEZA[1]); R.disco(x, y, r - 1.3, b_CORTEZA[0]); R.pset(x - r + 1, y - r + 1, b_CORTEZA[4]); }
  for (const [x, y, d] of [[37, 108, 1], [39, 114, 1], [36, 96, 1], [282, 104, -1], [280, 110, -1]]) { for (let i = 0; i < 5; i++) { R.pset(x + i * d, y, hex('#f0b060')); R.pset(x + i * d, y + 1, hex('#a8643c')); } R.pset(x + 5 * d, y, hex('#ffe0a0')); }
  // la puerta de las hadas al pie del árbol de la izquierda: arco de madera roja, ventanuco, aldaba y dos escalones
  { const [px, py] = b_BQ.puerta; for (let j = 0; j < 15; j++) for (let i = -6; i <= 6; i++) { const arco = j < 6 ? Math.hypot(i, 6 - j) : Math.abs(i); if (arco > 6.3) continue; R.pset(px + i, py - 14 + j, arco > 5 ? hex('#e8c068') : i === -2 || i === 2 ? hex('#7a2030') : (i + 6) % 4 === 0 ? hex('#c84a58') : hex('#a83244')); }
    R.rect(px - 1, py - 10, px + 1, py - 8, hex('#ffe890')); R.pset(px, py - 9, hex('#fff8d0')); R.pset(px + 3, py - 5, hex('#ffe890')); R.pset(px + 3, py - 4, hex('#a87a18'));
    R.rect(px - 8, py + 1, px + 8, py + 2, CAM[3]); R.rect(px - 8, py + 1, px + 8, py + 1, CAM[5]); R.rect(px - 10, py + 3, px + 10, py + 4, CAM[2]); R.rect(px - 10, py + 3, px + 10, py + 3, CAM[4]); }
  // las ventanas redondas del árbol de la derecha (el marco; la luz la pone la vida) y su balconcito
  for (const [x, y] of [[298, 80], [307, 104]]) { R.disco(x + 0.5, y + 0.5, 5.2, hex('#e8c068')); R.disco(x + 0.5, y + 0.5, 4, hex('#ffd060')); R.rect(x, y - 3, x, y + 4, hex('#8a5a20')); R.rect(x - 3, y, x + 4, y, hex('#8a5a20')); R.rect(x - 5, y + 6, x + 6, y + 6, hex('#8a5a80')); R.rect(x - 4, y + 7, x + 5, y + 7, hex('#2a1a40')); }
  // hiedra que sube por los troncos
  for (const [x0, y0, y1, d] of [[30, 60, 140, 1], [2, 30, 120, 1], [288, 50, 140, -1], [316, 60, 150, -1]]) for (let y = y0; y < y1; y++) { const x = Math.round(x0 + Math.sin(y * 0.16) * 3 + (y - y0) * 0.04 * d); R.pset(x, y, b_HOJA[3]); if (y % 3 === 0) { R.pset(x + d, y, b_HOJA[5]); R.pset(x + d, y - 1, b_HOJA[4]); R.pset(x - d, y + 1, b_HOJA[4]); } }
  // setas: las rojas grandes junto al gigante de la izquierda, corros pequeños y las azules (que luego brillan)
  const ROJA = b_rp('#7a1428', '#d8303a', '#ff7a6a'), OCRE = b_rp('#7a4a1c', '#d89a3a', '#ffd070');
  b_seta(R, 60, 141, 7, ROJA); b_seta(R, 70, 143, 4, ROJA); b_seta(R, 52, 142, 3, ROJA); b_seta(R, 267, 143, 5, OCRE); b_seta(R, 259, 142, 3, OCRE);
  for (const [x, y, s] of [[104, 166, 3], [111, 168, 2], [98, 169, 2], [170, 172, 3], [186, 136, 2], [140, 134, 2], [147, 135, 3], [22, 170, 4]]) b_seta(R, x, y, s, s === 3 ? ROJA : OCRE);
  for (const [x, y, s] of b_SETAS_AZULES) b_seta(R, x, y, s, b_rp('#1c5a8a', '#3ab8e0', '#a0f0ff'), hex('#e0ffff'));
  // piedras con musgo
  for (const [x, y, r] of [[122, 138, 4], [196, 164, 3], [288, 170, 5], [86, 172, 4], [232, 138, 3]]) { R.disco(x, y, r, (px, py, d) => R.tone4(b_rp('#2a2450', '#463c70', '#6a5c90', '#9084b0'), 1.7 - (px - x + py - y) / r * 0.9, px, py)); for (let i = -r + 1; i < r - 1; i++) if (h(i, x, 50) < 0.6) R.pset(x + i, y - r + 1 + Math.round(Math.abs(i) * 0.3), MUSGO[5]); }
  // la bóveda de hojas: arriba del todo y más espesa hacia los lados
  for (let k = 0; k < 46; k++) { const x = h(k, 51) * 340 - 10, lado = Math.abs(x - 160) / 160, y = -4 + h(k, 52) * (8 + lado * lado * 34); b_copa(R, x, y, 14 + h(k, 53) * 12, 8 + h(k, 54) * 7, b_HOJA.slice(0, 5), k, 0.2, 0.9); }
  for (const [x, y, rx, ry, k] of [[62, 30, 20, 11, 60], [104, 38, 13, 7, 61], [262, 38, 18, 10, 62], [226, 48, 11, 6, 63], [58, 72, 11, 6, 64], [268, 80, 10, 6, 65]]) b_copa(R, x, y, rx, ry, b_HOJA, k, 0.5, 0.8);
  // lianas que cuelgan de la bóveda
  for (const [x, l] of [[52, 30], [96, 16], [150, 9], [206, 12], [236, 20], [272, 34], [118, 12]]) for (let j = 0; j < l; j++) { const xx = Math.round(x + Math.sin(j * 0.25 + x) * 1.2), yy = 8 + j + Math.round(Math.abs(x - 160) * 0.1); if (j % 4 === 3) R.pset(xx + 1, yy, b_HOJA[4]); R.pset(xx, yy, b_HOJA[2]); }
}

const b_ALDEA = [98, 108, 121, 143, 152, 168];

const b_SETAS_AZULES = [[282, 160, 4], [290, 163, 3], [275, 164, 2], [296, 158, 2], [44, 166, 3], [36, 168, 2]];

// una criatura pequeña con su hatillo de gemas al hombro (el duende que huye): el saco y un destello de color
function b_hatillo(R, x, y, t, col, dir = 1) {
  R.disco(x - 6 * dir + 0.5, y - 9.5, 2.6, hex('#8a5a34')); R.pset(x - 6 * dir, y - 12, hex('#5e3a20')); R.pset(x - 7 * dir, y - 11, hex('#b07a4a')); R.linea(x - 5 * dir, y - 9, x - 2 * dir, y - 7, hex('#5e3a20'));
  if (Math.floor(t * 3 + x * 0.1) % 3 === 0) b_destello(R, x - 6 * dir, y - 13, 0.5, hex(col)); else R.pset(x - 6 * dir, y - 13, hex(col));
}

// las criaturas del bosque: tres duendes con hatillos por el camino, dos hadas con su estela y el dragón pequeño que
// vuela; u: lo que han avanzado (px) hacia la derecha. Devuelve dónde están (los pies o el centro de abajo)
function b_criaturasBosque(R, t, u) {
  const P = PIEZAS_CF, S = b_BQ.suelo, pos = { duendes: [], hadas: [], dragon: null };
  const cam = (x) => S + Math.round(Math.sin(x * 0.033) * 3);
  [[92, '#3ad08a'], [124, '#ff5a6a'], [168, '#62cce8']].forEach(([x0, col], k) => { const x = Math.round(Math.min(x0 + u, 250 + k * 16)), y = cam(x) + (Math.floor(t * 6 + k) % 2 ? -1 : 0);
    for (let i = -4; i <= 4; i++) if ((i + x) % 2) R.pset(x + i, cam(x) + 1, hex('#4a3c70'));
    b_hatillo(R, x, y, t, col); if (P.duende) P.duende(R, x, y, { t: t + k * 0.3, dir: 1 }); pos.duendes.push([x, y]); });
  [[150, 112, 0], [206, 100, 2]].forEach(([x0, y0, f], k) => { const x = Math.round(Math.min(x0 + u * 0.9, 280) + Math.sin(t * 1.3 + f) * 7), y = Math.round(y0 + Math.sin(t * 2.1 + f) * 5);
    for (let i = 1; i < 9; i++) { const tx = x - i * 3 - Math.round(Math.sin(t * 1.3 + f - i * 0.2) * 2), ty = y - 6 + Math.round(Math.sin((t - i * 0.09) * 2.1 + f) * 3) + (i >> 1); if ((i + Math.floor(t * 8)) % 2 === 0) R.pset(tx, ty, hex(i < 4 ? '#fff4c0' : k ? '#ff9ad0' : '#c8a0ff')); }
    b_luz(R, x, y - 7, 9, hex(k ? '#ffb0e0' : '#e0c0ff'), 0.45); if (P.hada) P.hada(R, x, y, { t: t + k * 0.06, dir: 1 }); pos.hadas.push([x, y]); });
  { const x = Math.round(Math.min(246 + u * 0.7, 268) + Math.sin(t * 0.8) * 6), y = Math.round(118 + Math.sin(t * 1.7) * 4); if (P.dragon) P.dragon(R, x, y, { t, dir: 1 });
    if (Math.floor(t * 1.2) % 3 === 0) { const f = (t * 1.2) % 1; for (let i = 0; i < 3; i++) R.pset(x + 11 + Math.round(f * 6) + i, y - 9 - (i % 2), hex(i ? '#ffb040' : '#fff0a0')); } pos.dragon = [x, y]; }
  return pos;
}

// EL BOSQUE (cuento, encuadre 'bosque', cámara 'general')
function b_bosque(R, t, o) {
  const S = b_BQ.suelo, [lx, ly] = b_BQ.luna;
  R.copiar(b_capa(R, 'bq:cielo', () => b_bosqueCielo(R)));
  // estrellas que titilan y una fugaz de vez en cuando (por el centro, lejos del año y de Atom)
  for (let k = 0; k < 34; k++) { const x = 8 + Math.floor(h(k, 61) * 304), y = 16 + Math.floor(h(k, 62) * 74), f = Math.sin(t * (1.5 + h(k, 63) * 3) + k * 2); if (Math.hypot(x - lx, y - ly) < 22) continue; if (f > 0.2) b_destello(R, x, y, f > 0.85 && k % 3 === 0 ? 0.5 : 0, hex(k % 4 ? '#fff4d8' : '#c8e8ff')); }
  { const c = 5.5, f = (t % c) / 0.7, k = Math.floor(t / c); if (f < 1) { const x = 170 + h(k, 64) * 70 - f * 44, y = 50 + h(k, 65) * 14 + f * 16; for (let i = 0; i < 9; i++) R.pset(Math.round(x + i * 1.7), Math.round(y - i * 0.62), i < 2 ? hex('#ffffff') : i < 5 ? hex('#ffe8b0') : hex('#b890d8')); } }
  // nubes de cuento en tres tonos, a tres velocidades
  const NU = [b_rp('#4a2e86', '#6a3e9c', '#9a5cb0', '#d090c8'), b_rp('#3a2878', '#57368e', '#7c4ca4', '#b078c0'), b_rp('#2c2068', '#44307e', '#5e4094', '#8a60ac')];
  [[40, 62, 46, 2.2, 0], [200, 30, 60, 2.2, 0], [310, 70, 40, 2.2, 0], [120, 76, 34, 4, 1], [270, 56, 44, 4, 1], [10, 40, 38, 6.5, 2], [180, 84, 30, 6.5, 2]].forEach(([x0, y, w, v, n], k) => b_nube(R, ((x0 + t * v + 60) % 440) - 60, y, w, NU[n], k));
  // murciélagos que cruzan por delante de la luna
  for (let k = 0; k < 3; k++) { const u = ((t * (9 + k * 3) + k * 90) % 260), x = Math.round(20 + u), y = Math.round(40 + k * 9 + Math.sin(t * 2 + k) * 5), a = Math.floor(t * 9 + k) % 2, c = hex('#1a1238'); R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y + (a ? -1 : 1), c); R.pset(x + 2, y + (a ? -1 : 1), c); }
  b_sobre(R, b_capa(R, 'bq:fondo', () => b_bosqueFondo(R)));
  // el castillo: ventanas que parpadean y banderolas
  { const [cx, base] = b_BQ.castillo; [[0, -20], [-13, -22], [12, -28], [12, -20], [-2, -36], [22, -16], [-22, -14], [4, -13], [-5, -20]].forEach(([dx, dy], k) => { const on = Math.sin(t * (0.7 + k * 0.23) + k * 1.9) > -0.6; R.pset(cx + dx, base + dy, hex(on ? '#ffe080' : '#3a2c78')); R.pset(cx + dx, base + dy + 1, hex(on ? '#ffb040' : '#30246a')); });
    for (const [dx, top] of [[-13, -39], [12, -47], [-2, -54]]) { R.linea(cx + dx, base + top, cx + dx, base + top - 5, hex('#c0b4f0')); for (let i = 1; i < 6; i++) { const yy = base + top - 5 + Math.round(Math.sin(t * 5 + i * 0.9 + dx) * 0.8); R.pset(cx + dx + i, yy, hex('#ff5a7a')); if (i < 4) R.pset(cx + dx + i, yy + 1, hex('#c83a5a')); } } }
  // la aldea: ventanas encendidas y humo de las chimeneas
  b_ALDEA.forEach((x, k) => { const y = Math.round(101 + Math.sin(x * 0.033 + 4) * 6 + Math.sin(x * 0.033 * 2.7 + 2) * 2.4); if (Math.sin(t * 0.5 + k * 2.3) > -0.7) R.pset(x, y - 2, hex('#ffd060')); for (let q = 0; q < 3; q++) { const u = (t * 0.35 + q / 3 + k * 0.17) % 1; R.pset(Math.round(x + 2 + Math.sin(u * 5 + k) * 1.5 + u * 3), Math.round(y - 8 - u * 9), hex(u > 0.6 ? '#7a5aa8' : '#a888c8')); } });
  // los hombres con antorchas, lejos, por la sierra de más acá (o.antorchas 0–1: cuántos y cuánto han avanzado)
  { const an = o.antorchas ?? 0.6, n = Math.round(an * 8); for (let k = 0; k < n; k++) { const x = Math.round(44 + k * 13 + (h(k, 71) - 0.5) * 6 + an * 26 + t * 1.6 - k * 0.2), y = Math.round(112 + Math.sin(x * 0.027 + 6) * 5 + Math.sin(x * 0.027 * 2.7 + 3) * 2), p = Math.floor(t * 4 + k) % 2, c = hex('#140e30');
      if (x > 200) continue; b_luz(R, x + 3, y - 9, 7, hex('#ff9a3a'), 0.6);
      R.rect(x - 1, y - 6, x + 1, y - 2, c); R.pset(x, y - 7, c); R.pset(x, y - 8, c); R.pset(x - 1, y - 1 + p, c); R.pset(x + 1, y - p, c); R.linea(x + 1, y - 5, x + 3, y - 7, c); R.pset(x + 3, y - 8, c);
      const fl = Math.floor(t * 10 + k * 3) % 3; R.pset(x + 3, y - 9, hex('#ffd040')); R.pset(x + 3 + (fl === 1 ? 1 : 0), y - 10, hex('#ff7a2a')); if (fl === 2) R.pset(x + 2, y - 11, hex('#ff5a2a')); if (k % 3 === 1) { R.linea(x - 2, y - 4, x - 3, y - 10, c); R.pset(x - 3, y - 11, hex('#c8c8e0')); } } }
  // la niebla que se arrastra entre las sierras
  for (let y = 104; y < 124; y++) for (let x = (y % 2); x < 320; x += 2) { const v = Math.sin(x * 0.045 + t * 0.5 + y * 0.3) + Math.sin(x * 0.021 - t * 0.3 + y) * 0.8; if (v > 1.15 + (124 - y) * 0.02) R.pset(x, y, b_mz(R.pget(x, y), hex('#e0b0d8'), 0.4)); }
  b_sobre(R, b_capa(R, 'bq:cerca', () => b_bosqueCerca(R)));
  // el estanque: el reflejo de la luna que tiembla y ondas
  for (let j = 0; j < 4; j++) { const y = 165 + j * 2, w = 1 + Math.round(Math.abs(Math.sin(t * 2.2 + j * 1.3)) * 3), x = 230 + Math.round(Math.sin(t * 1.4 + j) * 2); for (let i = -w; i <= w; i++) R.pset(x + i, y, hex(j % 2 ? '#fff4cc' : '#e8d49a')); }
  { const f = (t * 0.6) % 1, r = 2 + f * 9; for (let a = 0; a < 6.28; a += 0.25) { const x = Math.round(250 + Math.cos(a) * r), y = Math.round(169 + Math.sin(a) * r * 0.28); if (f < 0.8 && ((x - 236) / 26) ** 2 + ((y - 168) / 4.5) ** 2 < 1) R.pset(x, y, hex('#6a8cd8')); } }
  // las ventanas del árbol de la derecha y el ventanuco de la puerta: luz de vela que tiembla; los ojos del búho
  [[298, 80], [307, 104]].forEach(([x, y], k) => { const f = 0.5 + 0.18 * Math.sin(t * 7 + k * 2) + 0.1 * Math.sin(t * 13.7 + k); b_luz(R, x + 0.5, y + 0.5, 11, hex('#ffc050'), f * 0.7); R.pset(x + 2, y - 2 + (Math.floor(t * 0.4 + k) % 2 ? 0 : 3), hex('#fff8d0')); });
  b_luz(R, b_BQ.puerta[0], b_BQ.puerta[1] - 9, 7, hex('#ffe890'), 0.45 + 0.12 * Math.sin(t * 6));
  if ((t % 4.2) > 0.25) { R.pset(78, 92, hex('#ffe060')); R.pset(81, 92, hex('#ffe060')); }
  // farolillos que cuelgan de las ramas y se mecen
  [[60, 34, 18], [100, 42, 10], [264, 44, 16], [224, 52, 9], [184, 14, 14]].forEach(([x, y, l], k) => { const a = Math.sin(t * 1.3 + k * 1.7) * 0.16, fx = Math.round(x + Math.sin(a) * l), fy = Math.round(y + Math.cos(a) * l), c = hex(['#ffb040', '#7ae0ff', '#ff8ac8', '#a0ff9a', '#ffd870'][k]);
    R.linea(x, y, fx, fy, hex('#0c1430')); b_luz(R, fx, fy + 3, 12, c, 0.5 + 0.12 * Math.sin(t * 5 + k * 3)); R.rect(fx - 2, fy, fx + 2, fy, hex('#e8c068')); R.rect(fx - 2, fy + 1, fx + 2, fy + 4, c); R.rect(fx - 1, fy + 2, fx, fy + 3, hex('#fffbe8')); R.rect(fx - 1, fy + 5, fx + 1, fy + 5, hex('#a87a18')); R.pset(fx, fy + 6, hex('#e8c068')); });
  // las setas azules laten
  b_SETAS_AZULES.forEach(([x, y, s], k) => b_luz(R, x, y - s - 1, s * 2.4 + 2, hex('#60e8ff'), 0.32 + 0.2 * Math.sin(t * 2.4 + k * 1.1)));
  // las criaturas (o.criaturas false las quita; o.huida 0–1 las lleva hacia la derecha; sin ella, andan solas despacio)
  let pos = null; if (o.criaturas !== false) pos = b_criaturasBosque(R, t, o.huida != null ? o.huida * 110 : t * 4);
  // hojas que caen
  for (let k = 0; k < 7; k++) { const u = (t * (0.11 + k * 0.013) + h(k, 81)) % 1, x = Math.round(40 + h(k, 82) * 240 + Math.sin(u * 9 + k) * 9), y = Math.round(20 + u * 140), c = hex(k % 2 ? '#e8a040' : '#d05a48'); R.pset(x, y, c); R.pset(x + (Math.floor(u * 30) % 2 ? 1 : -1), y + 1, c); }
  b_luciernagas(R, t, 46, [8, 312, 60, 172], 0);
  b_orla(R, t);
  return { suelo: S, camino: (x) => S + Math.round(Math.sin(x * 0.033) * 3), luna: [lx, ly], castillo: b_BQ.castillo, puerta: b_BQ.puerta, criaturas: pos, libre: [50, 262] };
}

// luciérnagas: n lucecitas que vagan y se encienden y apagan dentro de [x0, x1, y0, y1]
export function b_luciernagas(R, t, n, [x0, x1, y0, y1], k0 = 0) {
  for (let k = 0; k < n; k++) { const s = k + k0, px = x0 + h(s, 91) * (x1 - x0) + Math.sin(t * (0.4 + h(s, 92) * 0.5) + s) * 9 + Math.sin(t * 1.3 + s * 2) * 2, py = y0 + h(s, 93) * (y1 - y0) + Math.cos(t * (0.5 + h(s, 94) * 0.5) + s * 1.3) * 6, f = Math.sin(t * (1.2 + h(s, 95) * 1.6) + s * 2.4);
    const x = Math.round(px), y = Math.round(py); if (f < -0.25) continue; const L = hex('#f8ffa0'), D = hex('#b8e050');
    R.pset(x, y, f > 0.2 ? L : D); if (f > 0.55) { for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + i, y + j, b_mz(R.pget(x + i, y + j), D, 0.6)); } }
}

// lo de delante en el bosque: helechos y setas grandes en las esquinas de abajo, hierba alta que se mece, luciérnagas
// de primer término y la orla
function b_bosqueDelante(R, t, o) {
  const V = b_rp('#0a1a30', '#12343c', '#1e5a4a'), V2 = b_rp('#123a3a', '#1e6048', '#3a9060');
  for (let x = 6; x < 314; x += 3) { const al = 3 + Math.floor(h(x, 1, 96) * 6) + (x < 70 || x > 250 ? 4 : 0), a = Math.sin(t * 1.6 + x * 0.09) * 1.6; for (let j = 0; j < al; j++) R.pset(Math.round(x + a * (j / al) ** 2), 176 - j, j > al - 2 ? V2[2] : V2[x % 2]); }
  const m = Math.sin(t * 1.1) * 0.07;
  b_helecho(R, 22, 176, 26, 6, V, m); b_helecho(R, 46, 178, 18, 5, V2, -m); b_helecho(R, 300, 176, 24, 6, V, -m); b_helecho(R, 274, 178, 16, 5, V2, m);
  b_seta(R, 12, 174, 8, b_rp('#5a1024', '#b82838', '#f06a60')); b_seta(R, 308, 174, 6, b_rp('#5a1024', '#b82838', '#f06a60')); b_seta(R, 30, 175, 4, b_rp('#7a4a1c', '#d89a3a', '#ffd070'));
  b_luciernagas(R, t, 8, [10, 310, 150, 174], 300);
  b_orla(R, t);
  return {};
}

const b_BA = { hor: 104, cub: 121, x0: 114, x1: 198, palo: [148, 25], trinquete: [192, 50], cofre: [170, 121] };

const b_MAR_N = b_rp('#081238', '#0c1c50', '#12306c', '#1a4a88', '#2a6ca0', '#4a94b8', '#8ac8d8', '#e8fcff');

const b_GEMAS = ['#2eb872', '#62cce8', '#a8d430', '#e83a4a', '#b070f0', '#ffc030', '#3a6af0', '#ff8ac0', '#f4f4ff', '#ff8030', '#30d0c0', '#c03ac0'];

// vuelca un trozo de una capa con huecos, desplazado (dx, dy): el barco que cabecea
function b_pega(R, capa, dx, dy, x0, y0, x1, y1) { const B = R.buf; for (let y = y0; y <= y1; y++) { const yy = y + dy; if (yy < 0 || yy > 179) continue; for (let x = x0; x <= x1; x++) { const c = capa[y * 320 + x]; if (!c) continue; const xx = x + dx; if (xx >= 0 && xx < 320) B[yy * 320 + xx] = c; } } }

// el cielo de noche del mar (fijo): azul hondo que aclara hacia el horizonte, vía láctea, la luna creciente y la base del mar
function b_barcoCielo(R) {
  const SK = b_rp('#080a2c', '#0c1240', '#121c58', '#182a72', '#203c8a', '#2c549c', '#3c70a8', '#5a92b4');
  for (let y = 0; y < b_BA.hor; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone4(SK, y / b_BA.hor * 7.4 + (h(x >> 2, y >> 1, 3) - 0.5) * 0.7 + Math.sin(x * 0.017 - y * 0.04) * 0.35, x, y));
  for (let k = 0; k < 420; k++) { const u = h(k, 7), x = Math.floor(u * 360 - 20), y = Math.floor(70 - u * 62 + (h(k, 8) - 0.5) * 30 * (0.3 + h(k, 9))); if (y > 14 && y < 96 && !(x > 270 && y < 48)) R.pset(x, y, hex(k % 5 === 0 ? '#c8d8ff' : k % 2 ? '#5a6cc0' : '#7a5ac8')); }
  for (let k = 0; k < 120; k++) { const x = Math.floor(h(k, 1) * 320), y = Math.floor(h(k, 2) * 98); R.pset(x, y, hex(k % 5 === 0 ? '#fff0c8' : k % 3 === 0 ? '#a8c8ff' : '#6a80d0')); }
  // la luna creciente y su halo
  const [lx, ly] = [56, 46]; b_luz(R, lx, ly, 34, hex('#d8e8ff'), 0.6);
  R.disco(lx, ly, 11, (x, y, d) => (Math.hypot(x + 0.5 - lx - 5, y + 0.5 - ly + 3) < 10 ? null : d > 0.9 ? hex('#e8d8a0') : R.tone4(b_rp('#f0e0a8', '#fff4cc', '#fffbe8'), 1.4 - (x - lx) * 0.1, x, y)) ?? R.pget(x, y));
  // el mar de base: de azul a negro hacia abajo
  for (let y = b_BA.hor; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone4(b_MAR_N, 4.2 - (y - b_BA.hor) / 76 * 3.4 + (y < b_BA.hor + 3 ? 1 : 0) + (h(x >> 2, y, 5) - 0.5) * 0.7, x, y));
}

// el casco (con huecos): una cáscara curva de tablas, popa enroscada, mascarón de cisne-dragón, cenefa de oro con gemas,
// portillos encendidos, el alcázar de popa con su ventana y el castillete de proa
const b_borda = (x) => { const u = (x - 78) / 154; return 122 - 14 * Math.abs(2 * u - 1) ** 2.6; };

function b_barcoCasco(R) {
  const MA = b_rp('#2c1626', '#4a2430', '#6e3a34', '#96583a', '#c08048', '#e4ac60'), ORO = b_rp('#7a5410', '#c8961e', '#f4cc48', '#fff0a0');
  const quilla = (x) => { const u = (x - 78) / 154; return 122 + 27 * Math.sin(Math.PI * u) ** 0.55; };
  for (let x = 78; x <= 232; x++) { const yg = b_borda(x), yk = quilla(x); for (let y = Math.round(yg) - 3; y <= yk; y++) { const f = (y - yg) / (yk - yg), tabla = ((f * 7) % 1 + 1) % 1;
    let c; if (y < yg - 2) c = ORO[3]; else if (y < yg) c = ORO[x % 6 < 3 ? 2 : 1]; else if (y < yg + 1) c = MA[0];
    else if (f > 0.16 && f < 0.3) c = (x + Math.round(y)) % 8 < 1 ? ORO[3] : ORO[f < 0.2 ? 2 : f > 0.27 ? 0 : 1];
    else c = tabla < 0.16 ? MA[1] : R.tone4(MA, 4.3 - f * 3.4 - (x - 78) / 154 * 0.9 + (h(x >> 2, Math.floor(f * 7), 11) - 0.5) * 1.1 + (h(x, y, 12) < 0.05 ? -1 : 0), x, y);
    if (x === 78 || x === 232 || y > yk - 1) c = MA[0]; R.pset(x, y, c); }
    // testas de tabla
    if (x % 17 === 3) for (let p = 2; p < 7; p += 2) { const y = Math.round(yg + (yk - yg) * (p / 7 + 0.07)); R.pset(x, y, MA[0]); R.pset(x, y + 1, MA[0]); R.pset(x + 1, y, MA[5]); } }
  // gemas engastadas en la cenefa y portillos encendidos
  for (let k = 0; k < 9; k++) { const x = 96 + k * 15, y = Math.round(b_borda(x) + (quilla(x) - b_borda(x)) * 0.23); R.disco(x + 0.5, y + 0.5, 2.2, hex('#3a2410')); R.pset(x, y, hex(b_GEMAS[k])); R.pset(x + 1, y, hex(b_GEMAS[k])); R.pset(x, y - 1, hex('#ffffff')); R.pset(x + 1, y + 1, b_mz(hex(b_GEMAS[k]), 0, 0.4)); }
  for (const x of [112, 134, 158, 182]) { const y = Math.round(b_borda(x) + (quilla(x) - b_borda(x)) * 0.5); R.disco(x + 0.5, y + 0.5, 3.6, ORO[1]); R.disco(x + 0.5, y + 0.5, 2.6, hex('#ffd060')); R.pset(x - 1, y - 1, hex('#fff8d0')); R.rect(x, y - 2, x, y + 3, ORO[0]); }
  // el alcázar de popa y el castillete de proa (por fuera): tablas, barandilla y ventana
  const caseta = (x0, x1, top, base) => { for (let x = x0; x <= x1; x++) for (let y = top; y <= base(x); y++) R.pset(x, y, y === top ? ORO[3] : y === top + 1 ? ORO[1] : (x - x0) % 5 === 0 ? MA[1] : R.tone4(MA, 3.3 - (y - top) * 0.22 + (h(x, y >> 1, 13) - 0.5), x, y)); for (let x = x0; x <= x1; x += 3) { R.pset(x, top - 1, ORO[2]); R.pset(x, top - 2, ORO[2]); } R.rect(x0, top - 3, x1, top - 3, ORO[3]); };
  caseta(84, 110, 109, (x) => b_borda(x) - 3); caseta(204, 224, 111, (x) => b_borda(x) - 3);
  for (const [x, y] of [[92, 112], [101, 112]]) { R.rect(x - 2, y, x + 2, y + 4, hex('#ffd060')); R.rect(x - 2, y, x + 2, y, ORO[0]); R.rect(x, y, x, y + 4, ORO[0]); R.pset(x - 1, y + 1, hex('#fff8d0')); }
  // la popa enroscada (voluta con una gema) y el timón
  b_rama(R, 80, 112, 70, 96, 3.4, 2.2, MA, -2); for (let a = 0; a < 7.5; a += 0.12) { const r = 6.5 - a * 0.7, x = 73 + Math.cos(a + 2.2) * r, y = 91 + Math.sin(a + 2.2) * r; R.pset(Math.round(x), Math.round(y), MA[4]); R.pset(Math.round(x), Math.round(y) + 1, MA[2]); R.pset(Math.round(x) + 1, Math.round(y), MA[3]); }
  R.disco(73.5, 91.5, 1.6, hex('#ff5a7a')); R.pset(73, 91, hex('#ffffff'));
  // el mascarón: cuello de cisne y cabeza de dragón de oro, con cuernos y ojo de rubí
  b_rama(R, 228, 114, 238, 98, 3.6, 2.4, b_rp('#7a5410', '#a87a18', '#c8961e', '#f4cc48', '#fff0a0'), 3);
  { const G = b_rp('#7a5410', '#c8961e', '#f4cc48', '#fff0a0'); R.disco(240.5, 96.5, 4, (x, y) => R.tone4(G, 1.9 - (x - 240 + y - 96) * 0.25, x, y)); R.rect(243, 96, 249, 99, G[1]); R.rect(243, 96, 249, 96, G[3]); R.rect(244, 99, 249, 99, G[0]); R.pset(250, 97, G[2]); R.pset(250, 98, G[1]); R.pset(249, 100, hex('#ffffff')); R.pset(247, 100, hex('#ffffff'));
    R.pset(241, 95, hex('#ff3050')); R.pset(242, 95, hex('#ffffff')); R.linea(238, 93, 235, 89, G[2]); R.linea(240, 92, 239, 88, G[3]); for (let i = 0; i < 5; i++) R.pset(234 - i, 100 + i * 2, G[2]); for (let i = 0; i < 4; i++) { R.pset(236 - i * 2, 102 + i * 3, G[3]); R.pset(235 - i * 2, 103 + i * 3, G[1]); } }
}

// la arboladura (con huecos): los dos palos con sus cofas de bellota, las vergas, los obenques y la cubierta de dentro
function b_barcoPalos(R) {
  const MA = b_rp('#2c1626', '#4a2430', '#6e3a34', '#96583a', '#c08048'), [mx, my] = b_BA.palo, [tx, ty] = b_BA.trinquete;
  // la cubierta que se ve por dentro de la borda (la pared de la otra banda, en sombra)
  for (let x = 80; x <= 230; x++) for (let y = Math.round(b_borda(x)) - 8; y < b_borda(x); y++) R.pset(x, y, (x % 7 === 0) ? MA[0] : R.tone4(MA, 1.3 + (h(x >> 1, y, 14) - 0.5), x, y));
  // obenques (escalas de cuerda) y estays
  for (const [px, py, bx] of [[mx, my + 10, 122], [mx, my + 10, 174], [tx, ty + 8, 178], [tx, ty + 8, 206]]) { const yb = Math.round(b_borda(bx)) - 3; R.linea(px, py, bx, yb, hex('#8a7460')); R.linea(px, py, bx + (bx < px ? 6 : -6), yb, hex('#8a7460')); for (let u = 0.2; u < 1; u += 0.1) { const y = Math.round(py + (yb - py) * u), xa = Math.round(px + (bx - px) * u), xb = Math.round(px + (bx + (bx < px ? 6 : -6) - px) * u); R.linea(xa, y, xb, y, hex('#6a5848')); } }
  R.linea(tx, ty, 238, 96, hex('#8a7460')); R.linea(mx, my + 2, tx, ty + 4, hex('#8a7460'));
  for (const [px, top, w] of [[mx, my, 2], [tx, ty, 1]]) { for (let y = top; y < 122; y++) for (let i = -w; i <= w; i++) R.pset(px + i, y, i === -w ? MA[4] : i === w ? MA[0] : y % 9 === 0 ? MA[1] : MA[2 + (h(i, y >> 2, 15) > 0.5 ? 1 : 0)]);
    // la cofa: una cáscara de bellota
    for (let j = 0; j < 5; j++) { const ww = 3 + w + (j < 2 ? j : 2 - (j - 2) * 0.7); for (let i = -Math.round(ww); i <= Math.round(ww); i++) R.pset(px + i, top + 8 + j, j === 0 ? hex('#e4ac60') : (i + j) % 2 ? MA[3] : MA[2]); } }
  // las vergas
  R.rect(mx - 30, my + 15, mx + 30, my + 16, MA[3]); R.rect(mx - 30, my + 15, mx + 30, my + 15, MA[4]); R.rect(tx - 18, ty + 13, tx + 18, ty + 14, MA[3]); R.rect(tx - 18, ty + 13, tx + 18, ty + 13, MA[4]);
  // la rueda del timón en el alcázar y unos barriles y fardos en cubierta
  R.disco(96.5, 103.5, 4.4, hex('#c08048')); R.disco(96.5, 103.5, 3.2, MA[1]); R.rect(96, 98, 96, 109, hex('#e4ac60')); R.rect(91, 103, 102, 103, hex('#e4ac60')); R.pset(96, 103, hex('#fff0a0'));
  for (const [x, c] of [[126, 0], [133, 1], [186, 0]]) { const y = Math.round(b_borda(x)) - 3; R.rect(x - 3, y - 8, x + 3, y, c ? hex('#7a6a9a') : MA[3]); R.rect(x - 3, y - 6, x + 3, y - 6, hex('#e4ac60')); R.rect(x - 3, y - 2, x + 3, y - 2, hex('#e4ac60')); R.rect(x - 3, y - 8, x - 3, y, MA[4]); R.rect(x + 3, y - 8, x + 3, y, MA[0]); }
}

// una vela de hoja: una hoja grande colgada de su verga (cx, y0) hasta la punta (y1), de media anchura w; el nervio
// central, los nervios de lado, el borde dentado y la panza que se hincha con el viento (a)
function b_velaHoja(R, cx, y0, y1, w, RP, a, k = 0) {
  const n = RP.length - 1, alto = y1 - y0;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / alto, perfil = Math.sin(Math.PI * Math.min(1, v * 0.62 + 0.3)) ** 0.8 * (v > 0.75 ? 1 - ((v - 0.75) / 0.25) ** 1.6 : 1), panza = Math.sin(v * Math.PI) * a, wl = w * perfil - panza * 0.5, wr = w * perfil + panza;
    const eje = cx + panza * 0.9;
    for (let x = Math.floor(cx - wl - 1); x <= cx + wr + 1; x++) { const s = x < eje ? (x - eje) / (wl + panza * 0.9) : (x - eje) / Math.max(1, wr - panza * 0.9), diente = (h(Math.floor(y / 3), x < eje ? 0 : 1, k) - 0.5) * 0.12;
      if (Math.abs(s) > 1 + diente) continue; const nerv = ((y - Math.abs(x - eje) * 0.75) % 9 + 9) % 9;
      let t4 = n * 0.52 - s * 1.5 + (0.5 - v) * 0.9 + (h(x >> 1, y >> 1, k + 1) - 0.5) * 0.9 + Math.sin(s * 3 + a * 0.3) * 0.4;
      if (Math.abs(x - eje) < 1) t4 = n; else if (nerv < 1) t4 += 1.1; if (Math.abs(s) > 0.9 + diente) t4 = s < 0 ? n - 1 : 0.2;
      R.pset(x, y, R.tone4(RP, t4, x, y)); } }
}

// un cofre pequeño abierto con las piedras preciosas amontonadas: n de 0 a 12 (las que brillan), con destellos y un
// resplandor de colores; (x, y) = centro de abajo
export function b_cofreGemas(R, x, y, t, n) {
  const MA = b_rp('#4a2430', '#96583a', '#c08048'), O = hex('#f4cc48');
  R.rect(x - 8, y - 6, x + 8, y, MA[1]); R.rect(x - 8, y - 6, x + 8, y - 6, O); R.rect(x - 8, y - 3, x + 8, y - 3, MA[0]); R.rect(x - 8, y - 6, x - 8, y, MA[2]); R.rect(x + 8, y - 6, x + 8, y, MA[0]); R.rect(x - 1, y - 4, x + 1, y - 2, O);
  R.rect(x - 8, y - 15, x + 8, y - 13, MA[0]); R.rect(x - 7, y - 16, x + 7, y - 16, O); R.rect(x - 8, y - 12, x - 8, y - 7, MA[0]); R.rect(x + 8, y - 12, x + 8, y - 7, MA[0]); R.rect(x - 7, y - 12, x + 7, y - 7, hex('#3a1c2c'));
  const k = Math.max(0, Math.min(12, n)); if (k > 0) b_luz(R, x, y - 9, 12 + k * 0.8, hex(b_GEMAS[Math.floor(t * 1.5) % Math.max(1, Math.ceil(k))]), 0.3 + k * 0.02);
  for (let g = 0; g < Math.ceil(k); g++) { const fila = g < 6 ? 0 : g < 10 ? 1 : 2, i = fila === 0 ? g : fila === 1 ? g - 6 : g - 10, gx = x - 6 + (fila === 0 ? i * 2.5 : fila === 1 ? 1.5 + i * 2.6 : 4 + i * 3), gy = y - 7 - fila * 2, c = hex(b_GEMAS[g]), ap = Math.min(1, k - g);
    const X = Math.round(gx), Y = Math.round(gy - (1 - ap) * 6); R.pset(X, Y, c); R.pset(X + 1, Y, c); R.pset(X, Y - 1, b_mz(c, hex('#ffffff'), 0.6)); R.pset(X + 1, Y - 1, c); R.pset(X + 1, Y + 1, b_mz(c, 0, 0.35));
    const f = (t * 1.3 + g * 0.37) % 1; if (f < 0.25 || ap < 1) b_destello(R, X, Y - 1, ap < 1 ? 1 : f * 4, hex('#ffffff')); }
}

// una fila de olas grandes: lomos que avanzan, cuerpo tramado y cresta de espuma con salpicaduras
function b_olas(R, t, y0, y1, amp, lon, vel, tono, k = 0) {
  for (let x = 0; x < 320; x++) { const f = x / lon + t * vel + k, s = Math.sin(f) + Math.sin(f * 2.3 + k) * 0.35, top = Math.round(y0 - s * amp);
    for (let y = top; y <= y1; y++) { const d = y - top; let v = tono - d * 0.22 + s * 0.6 + (h(x >> 1, y, k) - 0.5) * 0.5 + (Math.sin(x * 0.4 + y * 1.3 - t * 2) > 0.92 ? 1.2 : 0); if (d === 0) v = s > 0.25 ? 7 : tono + 2; else if (d === 1 && s > 0.7) v = 6; R.pset(x, y, R.tone4(b_MAR_N, v, x, y)); }
    if (s > 1.05 && (x + Math.floor(t * 6)) % 3 === 0) R.pset(x, top - 1 - (x % 2), b_MAR_N[7]); }
}

// EL BARCO (cuento, encuadre 'bosque', cámara 'barco')
function b_barco(R, t, o) {
  const H = b_BA.hor, dy = Math.round(Math.sin(t * 1.15) * 2), dx = Math.round(((o.avance ?? 0.5) - 0.5) * 60), [mx, my] = b_BA.palo, [tx, ty] = b_BA.trinquete, viento = Math.sin(t * 1.5) * 2.5 + Math.sin(t * 3.7) * 0.8;
  R.copiar(b_capa(R, 'ba:cielo', () => b_barcoCielo(R)));
  // la aurora: cortinas verdes y moradas que ondean (lejos de la esquina de Atom)
  for (let x = 4; x < 262; x++) { const base = 26 + Math.sin(x * 0.03 + t * 0.25) * 9 + Math.sin(x * 0.011 - t * 0.14) * 7, al = 12 + Math.sin(x * 0.05 + t * 0.4) * 6, fu = 0.5 + 0.5 * Math.sin(x * 0.21 + t * 0.7 + Math.sin(x * 0.07) * 3);
    for (let j = 0; j < al; j++) { const y = Math.round(base + j); if (y < 16) continue; const a = (1 - j / al) * fu * (x < 20 ? x / 20 : x > 236 ? (262 - x) / 26 : 1); if (a * 1.3 > R.b4(x, y) + 0.08) R.pset(x, y, b_mz(R.pget(x, y), hex(j < al * 0.35 ? '#60ffb0' : j < al * 0.7 ? '#40c8c0' : '#9060e0'), 0.42)); } }
  // estrellas que titilan y fugaces
  for (let k = 0; k < 40; k++) { const x = 8 + Math.floor(h(k, 61) * 304), y = 16 + Math.floor(h(k, 62) * 80), f = Math.sin(t * (1.5 + h(k, 63) * 3) + k * 2); if (x > 270 && y < 48) continue; if (f > 0.1) b_destello(R, x, y, f > 0.8 && k % 3 === 0 ? 0.5 : 0, hex(k % 4 ? '#fff4d8' : '#c8e8ff')); }
  for (let q = 0; q < 2; q++) { const c = 3.4 + q * 1.3, f = ((t + q * 1.9) % c) / 0.6, k = Math.floor((t + q * 1.9) / c) + q * 50; if (f < 1) { const x = 110 + h(k, 64) * 150 - f * 50, y = 22 + h(k, 65) * 30 + f * 20; for (let i = 0; i < 11; i++) R.pset(Math.round(x + i * 1.7), Math.round(y - i * 0.68), i < 2 ? hex('#ffffff') : i < 6 ? hex('#d8f0ff') : hex('#6a90e0')); } }
  // nubes bajas en tres tonos, a tres velocidades
  const NU = [b_rp('#16286a', '#24408c', '#3a60a8', '#7aa0d0'), b_rp('#122058', '#1c3478', '#2c4c94', '#5a80b8'), b_rp('#0e1a4c', '#162a68', '#223e84', '#4468a8')];
  [[30, 98, 60, 1.5, 2], [150, 100, 80, 1.5, 2], [280, 97, 50, 1.5, 2], [90, 90, 44, 3, 1], [250, 86, 54, 3, 1], [190, 76, 40, 5, 0], [20, 70, 34, 5, 0]].forEach(([x0, y, w, v, n], k) => b_nube(R, ((x0 - t * v + 800) % 440) - 60, y, w, NU[n], k + 10));
  // el Viejo Mundo que queda atrás: la costa a la izquierda, con las antorchas de los hombres en la playa
  for (let x = 0; x < 86; x++) { const y0 = Math.round(H - 9 * Math.max(0, 1 - x / 86) ** 0.7 - Math.sin(x * 0.3) * 1 - (x < 30 ? Math.sin(x * 0.2) * 2 : 0)); for (let y = y0; y < H; y++) R.pset(x, y, y === y0 ? hex('#2c3c84') : hex('#141a50')); }
  for (let k = 0; k < 6; k++) { const x = 6 + k * 9 + Math.round(Math.sin(t * 0.7 + k) * 1.5), fl = Math.floor(t * 9 + k * 2) % 3; R.pset(x, H - 2, hex('#ffb040')); if (fl) R.pset(x, H - 3, hex('#ff7030')); R.pset(x, H + 1 + fl, hex('#c87a30')); }
  // unas rocas con un arco, a la derecha, y una ballena lejana que resopla
  for (let x = 262; x < 304; x++) { const y0 = Math.round(H - 7 * Math.sin((x - 262) / 42 * Math.PI) ** 0.6 - (x % 7 < 3 ? 1 : 0)); for (let y = y0; y < H + 1; y++) if (!(x > 276 && x < 286 && y > H - 4)) R.pset(x, y, x - 262 < (y - y0) * 2 + 4 ? hex('#3a4c94') : hex('#161e54')); }
  // (la ballena va más abajo, ya sobre el mar)
  // el mar: rizos que corren, el camino de luz de la luna y el brillo verde de la aurora
  for (let y = H + 1; y < 140; y++) { const p = (y - H) / 36, kx = 0.9 - p * 0.55; for (let x = 0; x < 320; x++) { const s = Math.sin(x * kx + t * (1.2 + p) + Math.sin(y * 0.9 + x * 0.02) * 2.4 + h(0, y, 77) * 6) + Math.sin(x * kx * 0.37 - t * 0.8 + h(1, y, 78) * 6) * 0.7, cl = Math.abs(x - 56 - Math.sin(y * 0.7 + t) * 2) < 3 + p * 12;
      if (s > (cl ? 0.2 : 1.25)) R.pset(x, y, cl ? hex(s > 1.1 ? '#fffbe8' : '#c8d8f0') : b_MAR_N[5 + (s > 1.55 ? 1 : 0)]); else if (s < -1.3) R.pset(x, y, b_MAR_N[1]); else if (s > 0.9 && x < 250 && (x + y) % 5 === 0) R.pset(x, y, hex('#2a8a90')); } }
  // la ballena que asoma y resopla, lejos a la derecha
  { const x = 292 - Math.round(((t * 0.1) % 1) * 14), y = H + 9, f = (t * 0.4) % 1, C1 = hex('#1c2a6a'), C2 = hex('#4a6ab0');
    for (let i = -8; i <= 8; i++) { const al = Math.round(4 * Math.sqrt(1 - (i / 8.5) ** 2)); for (let j = 0; j < al; j++) R.pset(x + i, y - j, j === al - 1 ? C2 : C1); } R.pset(x - 5, y - 1, hex('#e8fcff'));
    R.linea(x + 9, y - 1, x + 13, y - 5, C1); R.pset(x + 12, y - 6, C1); R.pset(x + 14, y - 6, C1); R.pset(x + 15, y - 7, C2); R.pset(x + 11, y - 7, C2); for (let i = -10; i <= 11; i++) if ((i + Math.floor(t * 4)) % 2) R.pset(x + i, y + 1, b_MAR_N[7]);
    if (f < 0.6) { const g = f / 0.6; for (let j = 0; j < 8; j++) { const sp = Math.round((j / 7) ** 2 * 4 * g), yy = y - 4 - Math.round(j * g * 1.6); R.pset(x - 4 + sp, yy, hex('#e8fcff')); R.pset(x - 4 - sp, yy, hex('#a8d0f0')); if (j === 7) { R.pset(x - 3 + sp, yy + 1, hex('#e8fcff')); R.pset(x - 5 - sp, yy + 1, hex('#a8d0f0')); } } } }
  // el barco: la arboladura, las velas de hoja que se hinchan, el casco y lo que cuelga
  const ox = dx, oy = dy;
  b_pega(R, b_capa(R, 'ba:palos', () => b_barcoPalos(R)), ox, oy, 76, 20, 240, 124);
  b_velaHoja(R, mx + ox, my + 17 + oy, my + 72 + oy, 30, b_rp('#103c30', '#165a38', '#1e7a40', '#34a048', '#62c458', '#a4e870', '#e0ffa8'), viento, 1);
  b_velaHoja(R, tx + ox, ty + 15 + oy, ty + 54 + oy, 17, b_rp('#6a2018', '#96341c', '#c45424', '#ec7c30', '#ffac48', '#ffe090'), viento * 0.7, 2);
  // el foque: un pétalo rosa entre el trinquete y el mascarón
  R.poligono([[tx + 3 + ox, ty + 6 + oy], [234 + ox, 98 + oy], [tx + 6 + ox + viento, 104 + oy]], (x, y) => R.tone4(b_rp('#8a2a5a', '#c04a80', '#f07aa8', '#ffb8d0'), 1.6 + (ty + 60 - y) * 0.03 - (x - tx - ox) * 0.03 + (((x + y) % 7) === 0 ? 1 : 0), x, y));
  // la guirnalda de farolillos de la popa al palo mayor y del mayor a la proa, que se mece
  const guirn = (x0, y0, x1, y1, n, k0) => { for (let i = 0; i <= 40; i++) { const u = i / 40, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * (9 + Math.sin(t * 1.3 + k0) * 1.5); R.pset(Math.round(x) + ox, Math.round(y) + oy, hex('#8a7460')); }
    for (let q = 1; q <= n; q++) { const u = q / (n + 1), x = Math.round(x0 + (x1 - x0) * u + Math.sin(t * 1.6 + q + k0) * 1.2) + ox, y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * (9 + Math.sin(t * 1.3 + k0) * 1.5)) + oy + 1, c = hex(['#ffb040', '#7ae0ff', '#ff8ac8', '#a0ff9a', '#ffd870', '#c8a0ff'][(q + k0) % 6]);
      b_luz(R, x, y + 2, 9, c, 0.5 + 0.12 * Math.sin(t * 5 + q * 3 + k0)); R.rect(x - 1, y, x + 1, y, hex('#e8c068')); R.rect(x - 1, y + 1, x + 1, y + 3, c); R.pset(x, y + 2, hex('#fffbe8')); R.pset(x, y + 4, hex('#a87a18')); } };
  guirn(72, 90, mx, my + 4, 4, 0); guirn(mx, my + 4, 238, 94, 5, 3);
  // el gallardete del palo mayor y la veleta del trinquete
  R.linea(mx + ox, my + oy, mx + ox, my - 6 + oy, hex('#c08048')); for (let i = 1; i < 12; i++) { const yy = my - 6 + oy + Math.round(Math.sin(t * 6 - i * 0.7) * (i / 8)); R.pset(mx + ox + i, yy, hex(i % 4 < 2 ? '#ff5a7a' : '#ffd870')); if (i < 8) R.pset(mx + ox + i, yy + 1, hex('#c83a5a')); }
  R.disco(tx + ox + 0.5, ty - 2 + oy + 0.5, 1.6, hex('#ffe890'));
  // las criaturas a bordo (o.criaturas false las quita): el duende al timón, otro de vigía en la proa, el hada que
  // ronda el palo y el dragón pequeño que vuela a la par
  const P = PIEZAS_CF, cub = b_BA.cub + oy; let pos = null;
  if (o.criaturas !== false) {
    pos = { timonel: [98 + ox, 109 + oy], vigia: [214 + ox, 111 + oy] };
    if (P.duende) { P.duende(R, 104 + ox, 109 + oy, { t, dir: -1 }); P.duende(R, 214 + ox, 111 + oy, { t: t + 0.4, dir: 1 }); }
    const hx = Math.round(mx + ox + Math.cos(t * 1.1) * 30), hy = Math.round(my + 44 + oy + Math.sin(t * 2.2) * 6 - 24);
    for (let i = 1; i < 9; i++) { const tt = t - i * 0.07; if ((i + Math.floor(t * 8)) % 2 === 0) R.pset(Math.round(mx + ox + Math.cos(tt * 1.1) * 30), Math.round(my + 14 + oy + Math.sin(tt * 2.2) * 6) + (i >> 1), hex(i < 4 ? '#fff4c0' : '#ff9ad0')); }
    b_luz(R, hx, hy - 7, 9, hex('#ffb0e0'), 0.45); if (P.hada) P.hada(R, hx, hy, { t, dir: Math.sin(t * 1.1) > 0 ? -1 : 1 }); pos.hada = [hx, hy];
    const gx = Math.round(262 + ox * 0.6 + Math.sin(t * 0.9) * 7), gy = Math.round(82 + Math.sin(t * 1.9) * 5); if (P.dragon) P.dragon(R, gx, gy, { t, dir: 1 }); pos.dragon = [gx, gy];
    if (Math.floor(t * 1.1) % 3 === 0) { const f = (t * 1.1) % 1; for (let i = 0; i < 3; i++) R.pset(gx + 11 + Math.round(f * 6) + i, gy - 9 - (i % 2), hex(i ? '#ffb040' : '#fff0a0')); }
  }
  // el cofre abierto de las piedras preciosas en cubierta (o.piedras 0–12; false lo quita)
  const [cx, cy] = [b_BA.cofre[0] + ox, cub - 3];
  if (o.piedras !== false) b_cofreGemas(R, cx, cy, t, o.piedras ?? 12);
  b_pega(R, b_capa(R, 'ba:casco', () => b_barcoCasco(R)), ox, oy, 60, 82, 252, 150);
  // la luz de los portillos tiembla
  [112, 134, 158, 182].forEach((x, k) => b_luz(R, x + ox + 0.5, Math.round(b_borda(x) + 13) + oy, 7, hex('#ffc050'), 0.4 + 0.12 * Math.sin(t * 6 + k * 2)));
  // el agua contra el casco: la ola de proa, la estela de popa con plancton que brilla y los reflejos de los portillos
  b_olas(R, t, 141, 151, 2.2, 13, -1.6, 3.6, 1);
  for (let i = 0; i < 26; i++) { const x = 232 + ox - i * 0.4 + Math.sin(t * 5 + i) * 1.5 + (i % 5), y = 139 - Math.sin(i / 26 * Math.PI) * (5 + Math.sin(t * 3) * 1.5) + (i % 3); R.pset(Math.round(x + i * 0.5), Math.round(y), b_MAR_N[7]); if (i % 2) R.pset(Math.round(x + i * 0.5) + 1, Math.round(y) + 1, b_MAR_N[6]); }
  for (let k = 0; k < 38; k++) { const u = (t * 0.5 + h(k, 71)) % 1, x = Math.round(84 + ox - u * 96), y = Math.round(142 + (h(k, 72) - 0.5) * (4 + u * 10)); if (x > 5) R.pset(x, y, u < 0.3 ? b_MAR_N[7] : hex(k % 3 ? '#60ffd0' : '#a0f0ff')); }
  [112, 134, 158, 182].forEach((x, k) => { for (let j = 0; j < 6; j++) { const xx = x + ox + Math.round(Math.sin(t * 3 + j * 1.2 + k) * 2); if ((j + Math.floor(t * 5)) % 2) { R.pset(xx, 146 + j * 2, hex('#e8a040')); R.pset(xx + 1, 146 + j * 2, hex('#a86a30')); } } });
  // dos filas de olas grandes por delante, y los delfines que saltan
  b_olas(R, t, 155, 166, 3, 19, 1.1, 3, 2);
  for (let k = 0; k < 2; k++) { const c = 4.2, f = ((t + k * 1.7) % c) / 1.3; if (f < 1) { const x0 = Math.round(262 + k * 24 - f * 36), y0 = Math.round(158 - Math.sin(f * Math.PI) * 18), inc = f < 0.35 ? -1 : f > 0.65 ? 1 : 0, C1 = hex('#3a5aa8'), C2 = hex('#7a9ad8'), C3 = hex('#e0ecff');
      // cuerpo curvo de 13 px (morro a la izquierda), vientre claro, aleta y cola
      for (let i = -6; i <= 6; i++) { const yy = y0 + Math.round(inc * -i * 0.55 + (inc === 0 ? (i * i) * 0.06 : 0)), g = Math.abs(i) > 4 ? 1 : 2; for (let j = -g; j <= g; j++) R.pset(x0 + i, yy + j, j === -g ? C2 : j === g ? C3 : C1); if (i === 0) { R.pset(x0, yy - 3, C1); R.pset(x0 + 1, yy - 3, C1); R.pset(x0 + 1, yy - 4, C1); } if (i === -5) R.pset(x0 - 4, yy - 1, hex('#101838')); if (i === 6) { R.pset(x0 + 7, yy - 2, C1); R.pset(x0 + 8, yy - 3, C1); R.pset(x0 + 7, yy + 2, C1); R.pset(x0 + 8, yy + 3, C1); } if (i === -6) R.pset(x0 - 7, yy, C1); }
      if (f < 0.18 || f > 0.82) for (let i = -4; i <= 4; i++) { R.pset(x0 + i * 2, 156 - Math.abs(i % 2) * 2 - (4 - Math.abs(i)), b_MAR_N[7]); R.pset(x0 + i * 2 + 1, 157, b_MAR_N[6]); } } }
  b_olas(R, t, 169, 179, 3.6, 26, -0.8, 2.2, 3);
  b_orla(R, t, '#62cce8');
  return { suelo: cub, cubierta: (tt) => b_BA.cub + Math.round(Math.sin(tt * 1.15) * 2), x0: b_BA.x0 + ox, x1: b_BA.x1 + ox, alcazar: [98 + ox, 109 + oy], proa: [214 + ox, 111 + oy], cofre: [cx, cy], palo: [mx + ox, my + oy], criaturas: pos, hor: H };
}

// lo de delante en el barco: la borda (tapa los pies de quien va en cubierta), y la orla
function b_barcoDelante(R, t, o) {
  const dy = Math.round(Math.sin(t * 1.15) * 2), dx = Math.round(((o.avance ?? 0.5) - 0.5) * 60);
  b_pega(R, b_capa(R, 'ba:casco', () => b_barcoCasco(R)), dx, dy, 112, 114, 202, 132);
  b_orla(R, t, '#62cce8');
  return {};
}

const b_OR = { hor: 92, suelo: 150, sol: [100, 92], barco: [46, 108], bote: [70, 127] };

const b_ARENA = b_rp('#8a6a5a', '#b08a62', '#d0a870', '#ecc888', '#fbe2a8', '#fff6d0');

const b_MAR_A = b_rp('#1c4486', '#2a62a4', '#3a88b8', '#56b0c0', '#86d4c8', '#c4f0d8', '#fffbe0');

// dónde acaba el agua en cada fila (la orilla baja en diagonal hacia la izquierda) y la cresta de las dunas
const b_orillaX = (y) => 178 - 0.92 * Math.max(0, y - 92) ** 1.24 + Math.sin(y * 0.17) * 4;

const b_duna = (x) => 119 - 9 * Math.sin((x - 96) * 0.026) ** 2 - 3.5 * Math.sin(x * 0.071 + 1) + Math.max(0, 150 - x) * 0.16;

// los doce escondites (centro de abajo de cada cofrecito): dunas, linde del bosque, rocas y playa
const b_ESCONDITES = [[136, 126], [160, 118], [192, 119], [228, 127], [262, 117], [304, 122], [114, 144], [146, 135], [212, 134], [254, 138], [296, 140], [182, 163]];

// el cielo del amanecer (fijo): del azul que se va al oro del horizonte, con las últimas estrellas y el resplandor del sol
function b_orillaCielo(R) {
  const SK = b_rp('#34449a', '#4a56ac', '#6c66b8', '#9474bc', '#c084b4', '#e894a4', '#fca88c', '#ffc884', '#ffe49c', '#fff4c4');
  const [sx, sy] = b_OR.sol;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone4(SK, Math.min(1, y / b_OR.hor) * 8.2 + Math.max(0, 1 - Math.hypot(x - sx, (y - sy) * 1.5) / 110) * 1.6 + (h(x >> 2, y >> 1, 3) - 0.5) * 0.6 + Math.sin(x * 0.015 + y * 0.06) * 0.3, x, y));
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1) * 320), y = Math.floor(h(k, 2) * 34); R.pset(x, y, hex(k % 3 ? '#8a90d8' : '#d8dcff')); }
  // la luna pálida que se va, arriba a la izquierda (debajo de la barra del año)
  R.disco(34.5, 34.5, 6, (x, y) => (Math.hypot(x - 37.5, y - 32.5) < 5.6 ? R.pget(x, y) : hex('#c8c8f0')));
  // montañas azules muy lejos, a la derecha
  for (let x = 190; x < 320; x++) { const y0 = Math.round(88 - 24 * Math.sin((x - 170) * 0.012) ** 2 - 7 * Math.abs(Math.sin(x * 0.06 + 1)) - 3 * Math.abs(Math.sin(x * 0.17))); for (let y = Math.max(y0, 50); y < 100; y++) R.pset(x, y, R.tone4(b_rp('#7a70b8', '#9486c4', '#b8a0cc', '#e0c0d0'), 1.2 + (y - y0) * 0.09 - Math.sin(x * 0.06 + 1) * 1.2 + (y - y0 < 3 && Math.sin(x * 0.06 + 1) < 0 ? 1.5 : 0), x, y)); }
}

// la tierra (con huecos): el bosque del Nuevo Mundo en otoño, las dunas, la playa con conchas, estrellas de mar,
// un tronco varado, rocas y las huellas que suben del agua
function b_orillaTierra(R) {
  const SOMBRA = hex('#8a6a9a');
  // el bosque, en tres filas: la de atrás azulada, la de en medio de otoño y los arbustos de delante
  const tope = (x) => Math.max(50, 96 - (x - 160) * 0.42);
  const OTONOS = [b_rp('#5a1a2a', '#8a2830', '#c0402c', '#e8682c', '#ff9a3c', '#ffd070'), b_rp('#6a3a10', '#a86414', '#d8921c', '#f4be30', '#ffe060', '#fff8a8'), b_rp('#123a34', '#1c5a3c', '#2c7c44', '#4ca050', '#84c85c', '#c8ec80'), b_rp('#5a1440', '#8a2054', '#b8346a', '#e05a88', '#ff90a8', '#ffc8c8')];
  const ATRAS = b_rp('#2a3a6a', '#34507c', '#42688a', '#5a8498', '#7aa0a4');
  for (let x = 166; x < 330; x += 9) { const y = tope(x) + 4 + h(x, 1, 20) * 6; b_copa(R, x, y + 6, 9, 9 + h(x, 2, 20) * 5, ATRAS, x, -0.8, -0.5); for (let j = y + 10; j < 108; j++) R.pset(x, j, ATRAS[0]); }
  for (let x = 172; x < 330; x += 13) { const k = Math.floor(h(x, 3, 20) * 4), y = tope(x) + 14 + h(x, 4, 20) * 8, r = 9 + h(x, 5, 20) * 5;
    for (let j = Math.round(y + 4); j < 112; j++) { R.pset(x, j, hex('#3a2434')); R.pset(x + 1, j, hex('#5a3a44')); if (j % 7 === 0) R.pset(x - 1, j - 2, hex('#3a2434')); }
    b_copa(R, x, y, r, r * 0.85, OTONOS[k], x + 1, -0.8, -0.5); b_copa(R, x - r * 0.6, y + r * 0.5, r * 0.6, r * 0.5, OTONOS[k], x + 2, -0.8, -0.5); b_copa(R, x + r * 0.6, y + r * 0.6, r * 0.55, r * 0.45, OTONOS[(k + 1) % 4], x + 3, -0.8, -0.5); }
  // la penumbra entre troncos y los arbustos con bayas
  for (let x = 160; x < 320; x++) { let y = 40; while (y < 116 && R.pget(x, y) === 0) y++; for (; y < 116; y++) if (R.pget(x, y) === 0) R.pset(x, y, R.tone4(b_rp('#1a1a3e', '#262a52', '#343a62', '#4a5a70'), 0.9 + (h(x >> 1, y >> 1, 21) - 0.5) * 1.6 + (y > 100 ? (y - 100) * 0.08 : 0), x, y)); }
  // troncos de abedul y de arce en la penumbra, y rayos de sol que se cuelan
  for (let x = 181; x < 320; x += 11) { const xx = x + Math.round(h(x, 7, 20) * 5), ab = (x % 22) < 11, y0 = Math.round(tope(xx) + 26 + h(x, 8, 20) * 8); for (let y = y0; y < 114; y++) { R.pset(xx, y, hex(ab ? (y % 5 === 0 ? '#5a5070' : '#e8e0f0') : '#7a4a50')); R.pset(xx + 1, y, hex(ab ? '#a8a0c0' : '#4a2a3a')); } }
  for (let x = 176; x < 320; x++) for (let y = 84; y < 114; y++) if (((x + y * 0.8) % 34) < 5 && R.b4(x, y) < 0.3) { const c = R.pget(x, y); if (c === hex('#1a1a3e') || c === hex('#262a52') || c === hex('#343a62')) R.pset(x, y, hex('#8a7a70')); }
  for (let x = 168; x < 326; x += 7) { const y = 108 + h(x, 6, 20) * 4 + Math.max(0, 190 - x) * 0.1; b_copa(R, x, y, 6, 4.5, OTONOS[2], x + 4, -0.8, -0.5); if (x % 3 === 0) { R.pset(x - 2, y, hex('#ff4a5a')); R.pset(x + 2, y + 1, hex('#ff4a5a')); R.pset(x, y - 2, hex('#ffb0b8')); } }
  // la arena: dunas (luz por la izquierda, sombra malva por la derecha), playa con rizos y arena mojada junto al agua
  for (let y = 88; y < 180; y++) for (let x = 0; x < 320; x++) {
    const xs = b_orillaX(y), d = b_duna(x); if (x < xs || (y < d && R.pget(x, y) !== 0) || (y < d && x < 320 && y < 100 + Math.max(0, 176 - x)) && y < d) { if (x < xs || y < d) continue; }
    if (y < d) continue;
    const pend = b_duna(x + 2) - b_duna(x - 2), enDuna = y < d + 9 + Math.sin(x * 0.05) * 3, moj = (x - xs) / 13;
    let v = 3.3 + (h(x >> 1, y, 22) - 0.5) * 0.9 + (h(x, y, 23) < 0.03 ? 1.4 : 0) - (h(x, y, 24) < 0.035 ? 1.6 : 0);
    if (enDuna) v += pend * 1.5 - (y - d) * 0.06 + (y - d < 1 ? 1.2 : 0) + Math.sin((y - d) * 1.5 + x * 0.22 + Math.sin(x * 0.07) * 2) * 0.55; else v += Math.sin((y + Math.sin(x * 0.045) * 5) * 0.75) * 0.45 - (y - 128) * 0.008;
    let c = R.tone4(b_ARENA, v, x, y); if (enDuna && pend > 0.25 && (pend - 0.25) * 2.4 > R.b4(x, y)) c = b_mz(c, SOMBRA, 0.14);
    if (moj < 1) c = b_mz(c, hex(moj < 0.35 ? '#c890a0' : '#b88a78'), 0.55 - moj * 0.3); R.pset(x, y, c); }
  // matas de barrón en las crestas de las dunas (la base; las hojas que se mecen las pone la vida)
  for (const [x] of b_MATAS) { const y = Math.round(b_duna(x)) + 2; for (let i = -3; i <= 3; i++) R.pset(x + i, y + (Math.abs(i) > 1 ? 1 : 0), hex('#6a7a3a')); }
  // el tronco varado, con su sombra
  { const x0 = 196, y0 = 156; for (let i = 0; i < 40; i++) { const y = y0 - Math.round(i * 0.12); for (let j = 0; j < 5; j++) R.pset(x0 + i, y + j, j === 0 ? hex('#e8d4b0') : j === 4 ? hex('#5a4038') : (i * 3 + j) % 7 === 0 ? hex('#7a5a48') : hex(j < 2 ? '#c0a080' : '#9a7a60')); R.pset(x0 + i + 2, y + 5, SOMBRA); if (i % 2) R.pset(x0 + i + 3, y + 6, SOMBRA); }
    R.rect(x0 - 1, y0, x0 - 1, y0 + 4, hex('#5a4038')); R.pset(x0, y0 + 2, hex('#5a4038')); R.linea(x0 + 26, y0 - 3, x0 + 31, y0 - 10, hex('#9a7a60')); R.linea(x0 + 27, y0 - 3, x0 + 32, y0 - 10, hex('#5a4038')); R.linea(x0 + 30, y0 - 8, x0 + 34, y0 - 9, hex('#9a7a60')); }
  // rocas con percebes y algas
  for (const [x, y, r] of [[276, 160, 7], [286, 164, 4], [120, 164, 5], [36, 172, 6], [236, 126, 4]]) { for (let i = -r; i <= r + 3; i++) R.pset(x + i + 2, y + Math.round(r * 0.6), SOMBRA);
    R.disco(x, y, r, (px, py) => (py > y + r * 0.55 ? null : R.tone4(b_rp('#3a3458', '#5a5278', '#847a98', '#b8a8b8', '#e8d8d0'), 2 - (px - x) / r * 1.4 - (py - y) / r * 1.2 + (h(px, py, 25) - 0.5), px, py)) ?? R.pget(px, py));
    R.pset(x + 2, y + 1, hex('#f4ead8')); R.pset(x - 1, y + 2, hex('#f4ead8')); R.pset(x - r + 1, y + Math.round(r * 0.5), hex('#3c8858')); R.pset(x - r, y + Math.round(r * 0.5) + 1, hex('#3c8858')); }
  // conchas, caracolas, estrellas de mar, guijarros y algas por la playa
  for (let k = 0; k < 70; k++) { const y = 124 + Math.floor(h(k, 26) * 52), x = Math.floor(b_orillaX(y) + 6 + h(k, 27) * (316 - b_orillaX(y))); if (x > 312 || y < b_duna(x) + 6) continue; const q = k % 6;
    if (q === 0) { R.pset(x, y, hex('#fff0f0')); R.pset(x + 1, y, hex('#ffb8c8')); R.pset(x, y + 1, hex('#e88aa0')); R.pset(x + 1, y + 1, hex('#fff0f0')); R.pset(x + 2, y + 1, SOMBRA); }
    else if (q === 1) { const c = hex('#ff7a3a'); R.pset(x, y, hex('#ffb060')); for (const [i, j] of [[0, -1], [0, -2], [-1, 0], [-2, 0], [1, 0], [2, 0], [-1, 1], [-2, 2], [1, 1], [2, 2]]) R.pset(x + i, y + j, c); R.pset(x + 3, y + 2, SOMBRA); }
    else if (q === 2) { R.pset(x, y, hex('#f8f4ff')); R.pset(x + 1, y, hex('#c8c0e0')); R.pset(x + 1, y + 1, SOMBRA); }
    else if (q === 3) { for (let i = 0; i < 4; i++) R.pset(x + i, y + (i % 2), hex(i % 2 ? '#3c8858' : '#1c5a46')); }
    else { R.pset(x, y, hex(q === 4 ? '#8a7a9a' : '#fff6d0')); R.pset(x + 1, y + 1, hex('#b08a62')); } }
  // las huellas pequeñas que suben del agua hacia las dunas
  for (let i = 0; i < 16; i++) { const x = 84 + i * 6, y = 140 - Math.round(i * 0.9) + (i % 2) * 3; R.pset(x, y, hex('#b08a62')); R.pset(x + 1, y, hex('#b08a62')); R.pset(x + 1, y + 1, hex('#fff6d0')); }
}

const b_MATAS = [[116], [124], [138], [163], [171], [188], [209], [216], [240], [247], [270], [279], [288], [297], [305], [313]];

// un cofrecito de cerámica pequeño (7 × 6), con su cerradura de oro; (x, y) = centro de abajo
export function b_cofrecito(R, x, y) {
  const T = hex('#f0e6cc'), S = hex('#cdbd96'), K = hex('#5a4a3a'), O = hex('#f0c040');
  R.rect(x - 4, y - 4, x + 4, y + 1, K); R.rect(x - 3, y - 6, x + 3, y - 5, K); R.pset(x, y - 7, K);
  R.rect(x - 3, y - 3, x + 3, y, T); R.rect(x - 2, y - 5, x + 2, y - 4, T); R.rect(x - 3, y - 4, x - 3, y - 4, S); R.rect(x + 3, y - 4, x + 3, y, S); R.rect(x - 3, y, x + 3, y, S); R.rect(x - 3, y - 3, x + 3, y - 3, K); R.pset(x, y - 3, O); R.pset(x, y - 2, O); R.pset(x - 2, y - 5, hex('#ffffff')); R.pset(x, y - 6, O);
}

// el barco fondeado, pequeño y a contraluz: las velas de hoja recogidas en sus vergas, tres farolillos y el ancla
function b_barquito(R, cx, yw, t) {
  const dy = Math.round(Math.sin(t * 0.9) * 1), MA = b_rp('#3a1c30', '#5e3038', '#8a4c3c', '#c08048'), O = hex('#f4cc48');
  for (let i = -25; i <= 25; i++) { const u = (i + 25) / 50, yg = yw - 6 - 6 * Math.abs(2 * u - 1) ** 2.4 + dy; for (let y = Math.round(yg); y <= yw + 1; y++) R.pset(cx + i, y, y === Math.round(yg) ? O : y === Math.round(yg) + 3 ? hex('#c8961e') : MA[i < -8 ? 2 : i < 10 ? 1 : 0]); }
  for (let j = 0; j < 5; j++) for (let i = -22 + j * 2; i <= 22 - j * 2; i++) if ((i + j * 3 + Math.floor(t * 3)) % 4 < 2) R.pset(cx + i + Math.round(Math.sin(t * 2 + j) * 1.5), yw + 2 + j * 2, hex(j < 2 ? '#3a2c5a' : '#2a4a8a'));
  for (const x of [-12, -3, 7]) { R.pset(cx + x, yw - 2 + dy, hex('#ffd060')); R.pset(cx + x, yw + 3, hex('#e8a040')); }
  for (let a = 0; a < 5; a += 0.3) R.pset(Math.round(cx - 27 + Math.cos(a + 2) * (3 - a * 0.5)), Math.round(yw - 16 + dy + Math.sin(a + 2) * (3 - a * 0.5)), MA[3]); R.linea(cx - 25, yw - 12 + dy, cx - 26, yw - 14 + dy, MA[2]);
  R.linea(cx + 25, yw - 12 + dy, cx + 29, yw - 17 + dy, O); R.rect(cx + 29, yw - 19 + dy, cx + 32, yw - 18 + dy, O); R.pset(cx + 33, yw - 18 + dy, hex('#c8961e')); R.pset(cx + 30, yw - 20 + dy, hex('#ff3050'));
  for (const [x, top, w, c, c2] of [[-4, -44, 15, '#2c7c44', '#84c85c'], [12, -32, 9, '#c45424', '#ffac48']]) { R.rect(cx + x, yw + top + dy, cx + x, yw - 7 + dy, MA[1]); R.pset(cx + x - 1, yw + top + 4 + dy, MA[2]); R.pset(cx + x + 1, yw + top + 4 + dy, MA[2]);
    R.rect(cx + x - w, yw + top + 8 + dy, cx + x + w, yw + top + 8 + dy, MA[3]); for (let i = -w + 1; i < w; i++) { R.pset(cx + x + i, yw + top + 9 + dy, hex(c2)); R.pset(cx + x + i, yw + top + 10 + dy, hex(c)); if (i % 5 === 0) { R.pset(cx + x + i, yw + top + 9 + dy, MA[0]); R.pset(cx + x + i, yw + top + 10 + dy, MA[0]); R.pset(cx + x + i, yw + top + 11 + dy, hex(c)); } }
    R.linea(cx + x, yw + top + dy, cx + x - w - 4, yw - 9 + dy, (px, py, k) => (k % 2 ? hex('#6a5060') : null)); R.linea(cx + x, yw + top + dy, cx + x + w + 4, yw - 9 + dy, (px, py, k) => (k % 2 ? hex('#6a5060') : null)); }
  for (let i = 1; i < 8; i++) R.pset(cx - 4 + i, yw - 46 + dy + Math.round(Math.sin(t * 5 - i * 0.8) * (i / 6)), hex(i % 4 < 2 ? '#ff5a7a' : '#ffd870'));
  [[-18, -22], [4, -24], [20, -18]].forEach(([x, y], k) => { b_luz(R, cx + x, yw + y + dy, 5, hex('#ffd070'), 0.4 + 0.1 * Math.sin(t * 5 + k * 2)); R.pset(cx + x, yw + y + dy, hex('#fff4c0')); R.pset(cx + x, yw + y + 1 + dy, hex('#ffb040')); });
  for (let j = 0; j < 14; j++) if (j % 2) R.pset(cx + 22 + (j >> 2), yw - 8 + j + dy * (j < 6 ? 1 : 0), hex('#3a2c40'));
}

// las criaturas que desembarcan: tres duendes que suben por la playa con su cofrecito en brazos, el hada que lleva otro
// colgando y el dragón que vuela hacia el bosque con el suyo; u: lo que han avanzado (px). Devuelve dónde están
function b_criaturasOrilla(R, t, u) {
  const P = PIEZAS_CF, pos = { duendes: [], hada: null, dragon: null };
  [[112, 150], [142, 144], [86, 153]].forEach(([x0, y0], k) => { const x = Math.round(Math.min(300, x0 + u)), y = y0 - Math.round(Math.min(u, 300 - x0) * 0.1) + (Math.floor(t * 6 + k) % 2 ? -1 : 0);
    for (let i = -4; i <= 4; i++) if ((i + x) % 2) R.pset(x + i + 2, y + 1, hex('#b08a90')); if (P.duende) P.duende(R, x, y, { t: t + k * 0.3, dir: 1 }); b_cofrecito(R, x + 7, y - 4); R.pset(x + 3, y - 6, hex('#f6c290')); R.pset(x + 4, y - 5, hex('#f6c290')); R.pset(x + 10, y - 5, hex('#f6c290')); pos.duendes.push([x, y]); });
  { const x = Math.round(176 + u * 0.8 + Math.sin(t * 1.3) * 6), y = Math.round(108 + Math.sin(t * 2.1) * 5); for (let i = 1; i < 8; i++) if ((i + Math.floor(t * 8)) % 2 === 0) R.pset(x - i * 3, y - 6 + Math.round(Math.sin((t - i * 0.09) * 2.1) * 3) + (i >> 1), hex(i < 4 ? '#ffffff' : '#ff9ad0'));
    R.linea(x, y, x, y + 4, hex('#8a7460')); b_cofrecito(R, x, y + 10); if (P.hada) P.hada(R, x, y, { t, dir: 1 }); pos.hada = [x, y]; }
  { const x = Math.round(232 + u * 0.6 + Math.sin(t * 0.8) * 6), y = Math.round(84 + Math.sin(t * 1.7) * 4); b_cofrecito(R, x + 1, y + 5); if (P.dragon) P.dragon(R, x, y, { t, dir: 1 }); pos.dragon = [x, y]; }
  return pos;
}

// LA ORILLA (cuento, encuadre 'orilla', cámara 'general')
function b_orilla(R, t, o) {
  const H = b_OR.hor, [sx, sy] = b_OR.sol, S = b_OR.suelo;
  R.copiar(b_capa(R, 'or:cielo', () => b_orillaCielo(R)));
  // el sol que asoma: rayos que giran despacio, el disco y su borde
  for (let y = 22; y < H; y++) for (let x = sx - 72; x < sx + 72; x++) { if (x < 0) continue; const dx = x - sx, dy2 = y - sy, r = Math.hypot(dx, dy2); if (r > 70 || r < 12) continue; const an = Math.atan2(dy2, dx), ra = Math.sin(an * 11 + t * 0.35) + Math.sin(an * 5 - t * 0.2) * 0.5; if (ra > 0.85 && (1 - r / 70) ** 1.5 * 1.1 > R.b4(x, y) + 0.1) R.pset(x, y, b_mz(R.pget(x, y), hex('#fff8c8'), 0.4)); }
  R.disco(sx, sy, 14, (x, y, d) => (y >= H ? R.pget(x, y) : d > 0.88 ? hex('#ff9a40') : R.tone4(b_rp('#ffb040', '#ffd050', '#fff0a0', '#fffbe0'), 3.2 - d * 2.6, x, y)));
  // nubes del amanecer en tres tonos (el vientre de oro), a tres velocidades
  const NU = [b_rp('#c06a90', '#f09a8c', '#ffc890', '#fff0c0'), b_rp('#9a62a8', '#d0829c', '#f8ac90', '#ffe0a8'), b_rp('#7a5ab0', '#a870b0', '#dc94a4', '#ffcca0')];
  [[60, 60, 54, 2, 0], [190, 56, 56, 2, 0], [-20, 78, 44, 2, 0], [130, 70, 40, 3.6, 1], [250, 64, 46, 3.6, 1], [20, 58, 34, 5.5, 2], [170, 82, 30, 5.5, 2]].forEach(([x0, y, w, v, n], k) => b_nube(R, ((x0 + t * v + 60) % 400) - 60, y, w, NU[n], k + 20));
  // gaviotas
  for (let k = 0; k < 6; k++) { const x = Math.round(((k * 61 + t * (7 + k % 3 * 2)) % 300) - 20), y = Math.round(52 + (k * 13) % 26 + Math.sin(t * 1.4 + k) * 3), a = Math.floor(t * 5 + k) % 2, c = hex(k % 2 ? '#fff8e8' : '#5a4a7a'); if (x > 262 && y < 50) continue; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y + (a ? -1 : 0), c); R.pset(x + 2, y + (a ? -1 : 0), c); }
  // el mar de la mañana: bandas que corren, el camino de oro del sol y la orilla
  for (let y = H; y < 180; y++) { const xs = Math.min(319, Math.round(b_orillaX(y)) + 9), p = (y - H) / 88, kx = 0.8 - p * 0.5, f0 = h(0, y, 77) * 6, f1 = h(1, y, 78) * 6;
    for (let x = 0; x <= xs; x++) { const s = Math.sin(x * kx + t * (1 + p) + f0 + Math.sin(y * 0.8 + x * 0.02) * 2) + Math.sin(x * kx * 0.37 - t * 0.7 + f1) * 0.7, sol = Math.abs(x - sx - Math.sin(y * 0.6 + t) * 2) < 5 + p * 22 && y < 140;
      let v = 1.2 + p * 2.6 + (y < H + 2 ? 2.5 : 0) + (s > 1.2 ? 1.5 : s < -1.2 ? -1 : 0) + (xs - x < 26 ? (26 - (xs - x)) * 0.08 : 0);
      R.pset(x, y, sol && s > 0.1 ? hex(s > 1 ? '#fffbe0' : '#ffe088') : R.tone4(b_MAR_A, v, x, y)); } }
  // el barco fondeado (a contraluz del sol) y el bote de cáscara de nuez con dos duendes que reman
  b_barquito(R, b_OR.barco[0], b_OR.barco[1], t);
  { const [bx0, by0] = b_OR.bote, bx = bx0 + Math.round(Math.sin(t * 0.5) * 3), by = by0 + Math.round(Math.sin(t * 1.4) * 1), re = Math.sin(t * 2.4);
    for (let i = -8; i <= 8; i++) { const top = by - 3 + Math.round((i / 8) ** 2 * -2); for (let y = top; y <= by + 1; y++) R.pset(bx + i, y, y === top ? hex('#e4ac60') : hex(i < 0 ? '#96583a' : '#6e3a34')); }
    for (const [dx, c] of [[-3, '#5ac83a'], [3, '#d8303a']]) { R.rect(bx + dx - 1, by - 7, bx + dx + 1, by - 4, hex('#a8743c')); R.rect(bx + dx - 1, by - 9, bx + dx + 1, by - 8, hex('#f6c290')); R.rect(bx + dx - 1, by - 11, bx + dx + 1, by - 10, hex(c)); R.pset(bx + dx + 1, by - 12, hex(c)); R.linea(bx + dx, by - 5, bx + dx - 5 + Math.round(re * 2), by + 2, hex('#c08048')); }
    for (let i = 0; i < 5; i++) if ((i + Math.floor(t * 4)) % 2) R.pset(bx - 10 - i * 2, by + 2, hex('#fffbe0')); }
  b_sobre(R, b_capa(R, 'or:tierra', () => b_orillaTierra(R)));
  // el agua que sube y baja por la arena: lámina clara, la espuma y la línea que dejó la ola anterior
  { const sube = 4 + Math.sin(t * 0.9) * 4, ant = 9 - ((t * 0.9 / 6.283 + 0.25) % 1) * 3;
    for (let y = H + 4; y < 180; y++) { const xs = b_orillaX(y) + 9, e = Math.round(xs + sube + Math.sin(y * 0.5 + t * 2) * 1.2 + h(0, y, 80) * 2); for (let x = Math.round(xs); x <= e; x++) R.pset(x, y, e - x < 2 ? b_MAR_A[6] : b_mz(R.pget(x, y), b_MAR_A[4], 0.55)); if (y % 2) R.pset(e + 1, y, hex('#fffbe0'));
      const xa = Math.round(xs + ant + h(1, y, 81) * 2); if (xa > e + 1 && y % 3) R.pset(xa, y, hex('#fff6d0')); } }
  // el barrón de las dunas se mece con la brisa
  for (const [x] of b_MATAS) { const y = Math.round(b_duna(x)) + 2; for (let b = -3; b <= 3; b++) { const al = 6 + ((b * 7 + x) % 4), a = Math.sin(t * 2 + x * 0.1 + b) * 1.5 + b * 0.9; for (let j = 0; j < al; j++) R.pset(Math.round(x + b + a * (j / al) ** 1.6), y - j, hex(j > al - 2 ? '#e8e09a' : b % 2 ? '#8a9a4a' : '#5a7a3a')); } }
  // hojas de otoño que vuelan del bosque, un ciervo que asoma entre los troncos y un cangrejo que pasea por la arena mojada
  for (let k = 0; k < 8; k++) { const u = (t * (0.09 + k * 0.012) + h(k, 82)) % 1, x = Math.round(310 - u * 150 + Math.sin(u * 8 + k) * 6), y = Math.round(70 + u * 50 + Math.sin(u * 13 + k) * 5), c = hex(['#ff9a3c', '#e8482c', '#ffd070'][k % 3]); if (x > 262 && y < 50) continue; R.pset(x, y, c); R.pset(x + (Math.floor(u * 40) % 2 ? 1 : -1), y + 1, c); }
  { const x = 205, y = 107, c = hex('#a8643c'), oreja = Math.floor(t * 0.8) % 4 === 0 ? 1 : 0; R.rect(x, y - 4, x + 6, y - 2, c); R.rect(x + 6, y - 8, x + 7, y - 4, c); R.rect(x + 7, y - 9, x + 9, y - 8, c); R.pset(x + 9, y - 8, hex('#2a1a20')); R.pset(x + 7, y - 10 - oreja, c); R.pset(x + 6, y - 11, hex('#e8d4b0')); R.pset(x + 8, y - 11, hex('#e8d4b0')); R.pset(x + 1, y - 1, c); R.pset(x + 5, y - 1, c); R.pset(x + 1, y, c); R.pset(x + 5, y, c); R.pset(x, y - 4, hex('#fff4e0')); R.pset(x + 2, y - 3, hex('#e8c098')); }
  { const u = Math.sin(t * 0.5) * 14, y = 168, x = Math.round(b_orillaX(y) + 24 + u), p = Math.floor(t * 8) % 2, c = hex('#e8482c'); R.rect(x - 2, y - 2, x + 2, y - 1, c); R.pset(x - 1, y - 3, hex('#fff4e0')); R.pset(x + 1, y - 3, hex('#fff4e0')); R.pset(x - 3, y - (p ? 3 : 2), c); R.pset(x + 3, y - (p ? 2 : 3), c); R.pset(x - 3 + p, y, c); R.pset(x + 2 + p, y, c); R.pset(x - 1, y, hex('#a0282c')); }
  // los doce cofrecitos que se esconden (o.cofres 0–12): cada uno aparece con un resplandor, se hunde en la arena y se
  // apaga; del que ya está escondido queda un montoncito y, de tarde en tarde, un destello
  const n = Math.max(0, Math.min(12, o.cofres ?? 0));
  b_ESCONDITES.forEach(([x, y], k) => { const a = Math.max(0, Math.min(1, n - k)); if (a <= 0) return; const col = hex(b_GEMAS[k]);
    if (a < 1) { const hundido = Math.round(Math.max(0, a - 0.45) / 0.55 * 6), luz = a < 0.45 ? a / 0.45 : 1 - (a - 0.45) / 0.55;
      b_luz(R, x, y - 4, 7 + luz * 8, col, 0.65 * luz); b_cofrecito(R, x, y); if (hundido > 0) { const F = R.tone4; for (let j = 0; j < hundido; j++) for (let i = -4; i <= 4; i++) R.pset(x + i, y - j, F(b_ARENA, 3.2 + (h(x + i, y - j, 22) - 0.5), x + i, y - j)); }
      for (let q = 0; q < 6; q++) { const an = q * 1.05 + t * 2, r = 5 + luz * 6 + (q % 2) * 2; if (luz > 0.2) b_destello(R, Math.round(x + Math.cos(an) * r), Math.round(y - 4 + Math.sin(an) * r * 0.7), luz * 0.9, q % 2 ? hex('#ffffff') : col); } }
    else { for (let i = -3; i <= 3; i++) { R.pset(x + i, y, b_ARENA[2]); if (Math.abs(i) < 3) R.pset(x + i, y - 1, b_ARENA[i < 0 ? 5 : 3]); if (Math.abs(i) < 2) R.pset(x + i, y - 2, b_ARENA[i < 0 ? 5 : 4]); } for (let i = -3; i <= 4; i++) R.pset(x + i, y + 1, hex('#a8847a')); R.pset(x + 4, y, hex('#a8847a')); const f = (t * 0.45 + k * 0.31) % 1; if (f < 0.12) b_destello(R, x, y - 3, f / 0.12, col); } });
  // las criaturas que desembarcan (o.criaturas false las quita; o.llegada 0–1 las lleva playa arriba)
  let pos = null; if (o.criaturas !== false) pos = b_criaturasOrilla(R, t, o.llegada != null ? o.llegada * 120 : t * 4);
  b_orla(R, t, '#ffc030');
  return { suelo: S, sol: [sx, sy], hor: H, orilla: b_orillaX, duna: b_duna, escondites: b_ESCONDITES, barco: b_OR.barco, bote: b_OR.bote, criaturas: pos, libre: [70, 300] };
}

// lo de delante en la orilla: el barrón alto de las esquinas de abajo, una roca con una caracola y la orla
function b_orillaDelante(R, t, o) {
  for (const [x0, n] of [[250, 22], [8, 6]]) for (let b = 0; b < n; b++) { const x = x0 + b * 3, al = 9 + ((b * 7) % 9), a = Math.sin(t * 1.8 + x * 0.12) * 2.5 + (b - n / 2) * 0.25; for (let j = 0; j < al; j++) R.pset(Math.round(x + a * (j / al) ** 1.6), 177 - j, hex(j > al - 2 ? '#f0e8a0' : b % 2 ? '#7a8a3a' : '#4a6a34')); }
  b_orla(R, t, '#ffc030');
  return {};
}

// las doce ciudades (las tres primeras, las de los cofres hallados, con su piedra de verdad: esmeralda, aguamarina y
// peridoto) y sus colores; el orden es el de o.gemas
const b_CIUDADES = { chicago: [-87.63, 41.88], cleveland: [-81.69, 41.5], boston: [-71.06, 42.36], nuevaYork: [-74.0, 40.71], houston: [-95.37, 29.76], milwaukee: [-87.91, 43.04], sanAgustin: [-81.31, 29.9], nuevaOrleans: [-90.07, 29.95], montreal: [-73.57, 45.5], roanoke: [-75.67, 35.9], charleston: [-79.93, 32.78], sanFrancisco: [-122.42, 37.77] };

let b_doceP = null;

// el pergamino (fijo): el mapa grabado de la serie, más pequeño y vuelto a colorear como una lámina iluminada (el mar de
// jade, la tierra de oro viejo), con su cenefa de noche con zarcillos de oro, doce medallones abajo, la rosa de ocho
// puntas (sin letras) y unas islas de fantasía
function b_doceFijo(R) {
  b_doceP = mapa(R, 0, { zoom: 0.86, vida: false, rosa: false });
  const B = R.buf, JADE = b_rp('#2c6a70', '#3a8280', '#4e9a8e', '#6cb29c', '#94caae', '#c0e0c4');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = B[y * 320 + x], r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, lum = (r + g + b) / 765;
    if (b > r + 6) R.pset(x, y, R.tone4(JADE, (lum - 0.42) * 16 + (h(x >> 1, y >> 1, 3) - 0.5) * 0.6, x, y));
    else if (g > r + 4 && g > b + 20) R.pset(x, y, hex(lum > 0.42 ? '#4c9a48' : '#2a6a3a'));
    else { const bor = Math.min(x - 14, 305 - x, y - 14, 165 - y), vi = bor < 26 ? (26 - bor) / 26 * 0.22 : 0; R.pset(x, y, b_mz(((255 << 24) | (Math.round(b * 0.8) << 16) | (Math.round(g * 0.98) << 8) | Math.min(255, Math.round(r * 1.04))) >>> 0, hex('#8a5a2a'), vi * (0.6 + h(x >> 1, y >> 1, 4) * 0.8))); } }
  // rizos de buril en el mar y tres islitas de fantasía con su árbol
  for (let k = 0; k < 230; k++) { const x = 16 + Math.floor(h(k, 8) * 286), y = 17 + Math.floor(h(k, 9) * 146); let mar = true; for (let i = -2; i < 7 && mar; i++) { const c = R.pget(x + i, y), c2 = R.pget(x + i, y - 2); if (!JADE.includes(c) || !JADE.includes(c2)) mar = false; } if (!mar) continue; const c = k % 3 ? JADE[0] : JADE[5]; R.pset(x, y, c); R.pset(x + 1, y - 1, c); R.pset(x + 2, y, c); R.pset(x + 3, y + 1, c); R.pset(x + 4, y, c); }
  for (const [x, y] of [[268, 128], [58, 44], [246, 150]]) { R.rect(x - 4, y, x + 4, y + 1, hex('#e8c880')); R.rect(x - 2, y - 1, x + 2, y - 1, hex('#f4dc98')); R.rect(x - 5, y + 2, x + 5, y + 2, hex('#d8f0d8')); R.rect(x, y - 5, x, y - 2, hex('#6a4a2a')); R.disco(x + 0.5, y - 6.5, 2.4, hex('#3a8a3a')); R.pset(x - 1, y - 8, hex('#6ac04a')); R.pset(x, y - 7, hex('#6ac04a')); }
  // la cenefa: noche morada con estrellas y un zarcillo de oro con hojas; arriba y en la esquina de Atom, lisa
  const N = b_rp('#1c1444', '#261a58', '#32226c'), O = b_rp('#8a6414', '#d0a030', '#ffe080');
  const enCenefa = (x, y) => x < 14 || x > 305 || y < 14 || y > 165;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (enCenefa(x, y)) R.pset(x, y, R.tone4(N, 1 + (h(x >> 1, y >> 1, 5) - 0.5) * 1.6, x, y));
  for (let x = 13; x <= 306; x++) { R.pset(x, 13, O[1]); R.pset(x, 166, O[1]); if (x % 2) { R.pset(x, 14, hex('#6a4a2a')); R.pset(x, 165, hex('#6a4a2a')); } }
  for (let y = 13; y <= 166; y++) { R.pset(13, y, O[1]); R.pset(306, y, O[1]); if (y % 2) { R.pset(14, y, hex('#6a4a2a')); R.pset(305, y, hex('#6a4a2a')); } }
  const zarcillo = (hor, a0, a1, fijo) => { for (let a = a0; a < a1; a++) { const d = Math.round(Math.sin(a * 0.42) * 2.4), x = hor ? a : fijo + d, y = hor ? fijo + d : a; R.pset(x, y, O[1]); if (a % 7 === 3) { const s = Math.cos(a * 0.42) > 0 ? 1 : -1; for (let q = 1; q <= 2; q++) R.pset(hor ? x + q : x + s * q, hor ? y + s * q : y + q, q === 1 ? hex('#5ac83a') : hex('#2e8a24')); } if (a % 21 === 10) { R.pset(x, y, hex('#ff8ac8')); R.pset(hor ? x : x + 1, hor ? y - 1 : y, hex('#ffd0e8')); } } };
  zarcillo(false, 20, 164, 9); zarcillo(false, 54, 164, 310);
  for (let k = 0; k < 26; k++) { const x = 16 + Math.floor(h(k, 6) * 250), y = 5 + Math.floor(h(k, 7) * 7); R.pset(x, y, hex(k % 3 ? '#4a3a8a' : '#6a5aa8')); }
  // los doce medallones de abajo (se encienden con las gemas)
  for (let k = 0; k < 12; k++) { const x = 28 + k * 24; R.disco(x + 0.5, 171.5, 3.6, O[0]); R.disco(x + 0.5, 171.5, 2.6, N[0]); if (k < 11) for (let i = 6; i < 19; i++) R.pset(x + i, 171 + Math.round(Math.sin(i * 0.5) * 1.4), O[i % 5 === 0 ? 2 : 0]); }
  // la rosa de ocho puntas en el Pacífico (sin letras): puntas de oro y granate sobre un aro
  { const [cx, cy] = b_ROSA_DOCE; for (let a = 0; a < 6.283; a += 0.04) { R.pset(Math.round(cx + Math.cos(a) * 13), Math.round(cy + Math.sin(a) * 13), hex('#6a4a2a')); if (Math.floor(a * 16 / 6.283 * 2) % 2) R.pset(Math.round(cx + Math.cos(a) * 11), Math.round(cy + Math.sin(a) * 11), hex('#8a6414')); }
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, L = k % 2 ? 8 : 15, px = cx + Math.cos(a) * L, py = cy + Math.sin(a) * L, qa = a + Math.PI / 2, w = k % 2 ? 2 : 3;
      R.poligono([[px, py], [cx + Math.cos(qa) * w, cy + Math.sin(qa) * w], [cx, cy]], hex(k % 2 ? '#d0a030' : '#b8303a')); R.poligono([[px, py], [cx - Math.cos(qa) * w, cy - Math.sin(qa) * w], [cx, cy]], hex(k % 2 ? '#8a6414' : '#f4e4c0')); R.linea(px, py, cx + Math.cos(qa) * w, cy + Math.sin(qa) * w, hex('#4a2a1a')); R.linea(px, py, cx - Math.cos(qa) * w, cy - Math.sin(qa) * w, hex('#4a2a1a')); }
    R.disco(cx + 0.5, cy + 0.5, 2.2, hex('#ffe080')); R.pset(cx, cy, hex('#4a2a1a')); R.pset(cx, cy - 18, hex('#d0a030')); R.pset(cx - 1, cy - 17, hex('#d0a030')); R.pset(cx + 1, cy - 17, hex('#d0a030')); R.pset(cx, cy - 16, hex('#ffe080')); }
}

const b_ROSA_DOCE = [44, 142];

// una gema pequeña tallada (7 × 7 con su contorno), con su brillo
export function b_gema(R, x, y, col, lit = 1) {
  const c = hex(col), K = hex('#2a1a30'), L = b_mz(c, hex('#ffffff'), 0.65), D = b_mz(c, K, 0.45);
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { const d = Math.abs(i) + Math.abs(j); if (d > 3) continue; R.pset(x + i, y + j, d === 3 ? K : i + j < -1 ? L : i + j > 1 ? D : c); }
  if (lit > 0.5) R.pset(x - 1, y - 1, hex('#ffffff'));
}

// EL MAPA DE LAS DOCE GEMAS (cuento, encuadre 'orilla', cámara 'doce')
function b_doce(R, t, o) {
  R.copiar(b_capa(R, 'doce', () => b_doceFijo(R)));
  const P = b_doceP, pts = Object.values(b_CIUDADES).map((c) => P(c).map(Math.round)), n = Math.max(0, Math.min(12, o.gemas ?? o.piedras ?? 12));
  // estrellas de la cenefa que titilan (abajo y a los lados; arriba queda quieta)
  for (let k = 0; k < 16; k++) { const lado = k % 2, x = lado ? (k % 4 === 1 ? 5 + (k % 3) * 2 : 312 + (k % 3)) : 20 + Math.floor(h(k, 11) * 280), y = lado ? 60 + Math.floor(h(k, 12) * 100) : 169 + (k % 3) * 3; if (Math.sin(t * (2 + h(k, 13) * 2) + k * 1.9) > 0.4 && !(y > 167 && y < 176 && (x - 28) % 24 < 5)) R.pset(x, y, hex('#fff4c0')); }
  // el mar vivo: rizos de tinta que cambian, la sierpe que ondula en el Pacífico y una ballena que resopla en el Atlántico
  for (let k = 0; k < 60; k++) { const x = 16 + Math.floor(h(k, 14) * 288), y = 16 + Math.floor(h(k, 15) * 148), c = R.pget(x, y); if (((c >> 16) & 255) < (c & 255) + 20 || Math.floor(t * 0.8 + h(k, 16) * 3) % 3) continue; const f = Math.floor(t * 2 + k) % 2; for (let i = 0; i < 5; i++) { const xx = x + i, yy = y + ((i + f) % 4 < 2 ? 0 : 1); const c2 = R.pget(xx, yy); if (((c2 >> 16) & 255) > (c2 & 255) + 20) R.pset(xx, yy, hex('#d8f0d8')); } }
  { const [sx, sy] = [30, 84], V = b_rp('#1c5a3a', '#3a9a4a', '#a8e060'); for (let k = 0; k < 4; k++) { const cx = sx + k * 9 - 4, al = 3 + Math.sin(t * 2.2 - k * 1.2) * 2.5; for (let i = -3; i <= 3; i++) { const y = Math.round(sy - Math.max(0, al) * (1 - (i / 3.2) ** 2)); if (al > 0.6) { R.pset(cx + i, y, V[2]); R.pset(cx + i, y + 1, V[1]); if (y + 2 <= sy) R.pset(cx + i, y + 2, V[0]); } } R.pset(cx - 4, sy + 1, hex('#e8fff0')); R.pset(cx + 4, sy + 1, hex('#e8fff0')); }
    const hy = sy - 8 + Math.round(Math.sin(t * 2.2 + 1.2) * 1.5), hx = sx - 12; R.rect(hx, hy + 3, hx + 2, sy, V[1]); R.rect(hx - 2, hy, hx + 2, hy + 3, V[1]); R.rect(hx - 4, hy + 1, hx - 2, hy + 2, V[2]); R.pset(hx, hy + 1, hex('#fff0a0')); R.pset(hx + 1, hy - 1, hex('#f0c040')); R.pset(hx + 3, hy, V[0]); R.pset(hx - 5, hy + 3, hex('#ff5a4a')); R.pset(hx + 3, sy + 1, hex('#e8fff0')); }
  { const [wx, wy] = [286, 146], f = (t * 0.45) % 1; R.rect(wx - 6, wy - 2, wx + 4, wy, hex('#2a4a7a')); R.rect(wx - 5, wy - 3, wx + 2, wy - 3, hex('#3a6a9a')); R.pset(wx - 4, wy - 2, hex('#ffffff')); R.linea(wx + 5, wy - 2, wx + 8, wy - 5 - Math.round(Math.sin(t * 3) * 1), hex('#2a4a7a')); R.pset(wx + 9, wy - 6, hex('#2a4a7a')); R.pset(wx + 9, wy - 3, hex('#2a4a7a')); for (let i = -7; i <= 6; i++) if ((i + Math.floor(t * 4)) % 2) R.pset(wx + i, wy + 1, hex('#e8fff0'));
    if (f < 0.55) for (let j = 0; j < 6; j++) { const sp = Math.round((j / 5) ** 2 * 3 * (f / 0.55)); R.pset(wx - 3 + sp, wy - 4 - Math.round(j * f * 2), hex('#e8fff0')); R.pset(wx - 3 - sp, wy - 4 - Math.round(j * f * 2), hex('#c0e0e0')); } }
  // el barco de las criaturas que llega por el Atlántico (o.viaje 0–1; sin él, va y viene despacio)
  { const u = o.viaje != null ? Math.max(0, Math.min(1, o.viaje)) : 0.5 + 0.5 * Math.sin(t * 0.25), bx = Math.round(298 - u * 30), by = Math.round(104 - u * 16 + Math.sin(t * 2) * 1);
    for (let i = 1; i < 7; i++) if ((i + Math.floor(t * 3)) % 2) R.pset(bx + 6 + i * 3, by + 1 + Math.round(i * 1.2), hex('#6a4a2a'));
    R.rect(bx - 5, by - 2, bx + 5, by, hex('#7a4424')); R.rect(bx - 4, by + 1, bx + 4, by + 1, hex('#4a2a1a')); R.rect(bx - 5, by - 2, bx + 5, by - 2, hex('#f0c040')); R.pset(bx - 6, by - 3, hex('#f0c040')); R.pset(bx - 7, by - 4, hex('#f0c040')); R.pset(bx + 6, by - 3, hex('#7a4424'));
    R.rect(bx, by - 11, bx, by - 3, hex('#4a2a1a')); for (let j = 0; j < 7; j++) { const w = [2, 3, 4, 4, 3, 2, 1][j]; for (let i = -w; i <= w; i++) R.pset(bx + i - 1, by - 10 + j, i < -w + 1 ? hex('#a8e060') : i === 0 ? hex('#c8f090') : hex('#3a9a4a')); } R.pset(bx + 1, by - 12, hex('#ff5a7a')); R.pset(bx + 2, by - 12 + (Math.floor(t * 5) % 2), hex('#ff5a7a'));
    for (let i = -6; i <= 6; i++) if ((i + Math.floor(t * 4)) % 3) R.pset(bx + i, by + 2, hex('#e8fff0')); }
  // las criaturas de los márgenes del mapa (o.criaturas false las quita): el dragón sobre el golfo, el hada en el
  // Atlántico y el duende en su isla del Pacífico
  const Pz = PIEZAS_CF;
  if (o.criaturas !== false) {
    if (Pz.dragon) Pz.dragon(R, 196 + Math.round(Math.sin(t * 0.7) * 5), 158 + Math.round(Math.sin(t * 1.6) * 2), { t, dir: 1 });
    const hx = 284 + Math.round(Math.sin(t * 1.1) * 6), hy = 74 + Math.round(Math.sin(t * 2.3) * 4); for (let i = 1; i < 7; i++) if ((i + Math.floor(t * 8)) % 2 === 0) R.pset(hx + i * 2, hy - 4 + i, hex(i < 3 ? '#fff4c0' : '#ff9ad0')); if (Pz.hada) Pz.hada(R, hx, hy, { t, dir: -1 });
    R.rect(22, 119, 40, 120, hex('#d8b070')); R.rect(25, 117, 37, 118, hex('#ecc888')); R.rect(21, 121, 41, 121, hex('#e8fff0')); R.rect(36, 108, 36, 117, hex('#7a4a24')); for (let i = -3; i <= 3; i++) R.pset(36 + i, 107 + Math.abs(i) + (i > 0 ? Math.round(Math.sin(t * 2)) : 0), hex('#3a9a4a')); if (Pz.duende) Pz.duende(R, 29, 117, { t, dir: 1 });
  }
  // las doce gemas que se posan (o.gemas 0–12): cada una baja con su estela, toca el mapa con un aro de luz y se queda
  // brillando; abajo se enciende su medallón
  pts.forEach(([x, y], k) => { const a = Math.max(0, Math.min(1, n - k)), col = b_GEMAS[k], c = hex(col); if (a <= 0) return;
    R.disco(28 + k * 24 + 0.5, 171.5, 2.6, c); R.pset(28 + k * 24, 171, hex('#ffffff'));
    if (a < 0.6) { const u = a / 0.6, gy = Math.round(y - (1 - u * u) * 60), gx = Math.round(x + (1 - u) * 14); for (let i = 1; i < 8; i++) if ((i + Math.floor(t * 12)) % 2) R.pset(gx + Math.round(i * 0.9), gy - i * 3, i < 4 ? hex('#ffffff') : c); if (gy > 16) { b_luz(R, gx, gy, 8, c, 0.6); b_gema(R, gx, gy, col); } return; }
    const u = a < 1 ? (a - 0.6) / 0.4 : 1, late = 0.5 + 0.5 * Math.sin(t * 2.6 + k * 1.3);
    if (u < 1) { const r = 3 + u * 11; for (let an = 0; an < 6.283; an += 0.22) if (((an * 5) | 0) % 2) R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r * 0.8), u < 0.5 ? hex('#ffffff') : c); }
    b_luz(R, x, y, 8 + late * 3, c, 0.5 + late * 0.2); b_gema(R, x, y - (u < 0.3 ? 2 : 0), col, late);
    const f = (t * 0.9 + k * 0.41) % 1; if (f < 0.2) b_destello(R, x - 1, y - 2, f * 5, hex('#ffffff')); });
  b_orla(R, t, '#3ad08a');
  return { suelo: null, P, puntos: Object.fromEntries(Object.keys(b_CIUDADES).map((k, i) => [k, pts[i]])), lista: pts, colores: b_GEMAS, rosa: b_ROSA_DOCE, medallon: (k) => [28 + k * 24, 171] };
}

// lo de delante en el mapa: solo la orla (las gemas quedan debajo de una mano que señale)
function b_doceDelante(R, t, o) { b_orla(R, t, '#3ad08a'); return {}; }

// dónde están los seis hoyos del parque (centro de la boca), en el orden en que aparecen con o.hoyos
export const c_HOYOS = [[66, 132, 13], [118, 124, 11], [250, 128, 12], [196, 122, 10], [92, 168, 16], [176, 170, 16]];

// la paleta de Chicago (propia: no depende de las de otros episodios)
const c_K = pal({
  k: '#1c1222', blanco: '#f6f2ea', gris: '#8c8ca0', grisL: '#b8bccc', grisS: '#5e5e70', rojo: '#d83a3a', rojoS: '#a02a34', azul: '#3a6ac8', azulL: '#6a9ae8', amarillo: '#f0c838', amarilloL: '#ffe890',
  naranja: '#f0902a', verde: '#3a9a5a', crema: '#efe6d0', oro: '#f0c848', piel: '#f0b890', piel2: '#a86a48', madera: '#a06a3a', maderaL: '#c88a52', maderaS: '#6e4424',
  metal: '#9aa4b4', metalL: '#d0d8e4', metalD: '#4a5262', sol: '#ffe070', solL: '#fff0a8', halo: '#fff8dc', haloT: '#ffe6a0', ave: '#2a2436',
  c0: '#57a444', c1: '#66b44c', cS: '#3c8236', cL: '#8acc5c', cD: '#2c642e', hoja: '#4c9a40', hojaL: '#74bc50', hojaB: '#a4d868', hojaS: '#347a38', hojaD: '#1e4a2c', hoja2: '#3e8a4a', hojaL2: '#6aa860',
  tronco: '#7a5638', troncoL: '#a07a50', troncoS: '#523624', losa: '#dcd0b0', losaS: '#b4a684', losaL: '#eee4c8',
  lago0: '#a4d0ea', lago1: '#6aa8de', lago2: '#4686cc', lago3: '#3470b8', lagoL: '#e4f4fc',
  tierra: '#7e5636', tierraL: '#a07446', tierraS: '#5c3c26', tierraD: '#3e2818', humus: '#4a3424', humusL: '#6a4a30', humusD: '#32221a', arcilla: '#b0703c', arcillaL: '#cc8c50', arcillaS: '#8c5430',
  grava: '#7c7468', gravaL: '#a49c8c', gravaS: '#5a5448', hoyoD: '#2a1a14', piedra: '#a8a498', piedraL: '#d0ccbc', piedraS: '#74706a',
  cal: '#e6d8a8', calL: '#f8eecc', calS: '#c4b27e', calD: '#96845a', calJ: '#d0c090', hueco: '#3a3040', cobre: '#6aa890', cobreS: '#467a68', cobreL: '#94c8ae',
  ladr: '#a84a3a', ladrS: '#8e3a32', ladrL: '#bc5a44', ladrJ: '#96443a', ladrD: '#6a2a2a', vidrio: '#2e4a5e', vidrioL: '#7ab0c8', vidrioD: '#1e3040', luz: '#f8cc70', luzL: '#fff0b0',
  acera: '#c8c4b6', aceraS: '#a8a496', aceraL: '#dedacc', asf: '#4a4a58', asfS: '#40404c', asfL: '#5a5a68', bronce: '#4a6e5c', bronceL: '#74a088', bronceS: '#2c4438', granito: '#b8a8a4', granitoS: '#8c7c7c', granitoL: '#d8cac4',
  taxi: '#f0c020', bus: '#3a8a5a', hancock: '#3a3844', hancockL: '#565462', sears: '#343a50', searsL: '#4a5270',
});

const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const c_um = (x, y) => c_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function c_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// lo fijo de un encuadre se pinta una vez en un búfer propio (0 = transparente: detrás se ve el cielo) y se devuelve
const c_CACHE = new WeakMap();

function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// pega el búfer fijo sobre lo ya pintado, saltando lo transparente (un recorrido de pantalla)
function c_pega(R, b, y0 = 0) { const B = R.buf; for (let i = y0 * 320; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } }

// la luz del atardecer sobre todo lo fijo ya pintado en el búfer actual (se hace una vez, dentro de c_fijo)
function c_atardece(R) { const B = R.buf, cal = hex('#ff8a4a'), osc = hex('#2a1a4a'); for (let i = 0; i < 57600; i++) if (B[i]) B[i] = c_mez(c_mez(B[i], cal, 0.2), osc, 0.14); }

// un pictograma de filas de '#'
function c_picto(R, filas, x, y, c) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') R.pset(x + i, y + j, c); }); }

const c_NOTA1 = ['...##..', '...###.', '...#.##', '...#..#', '...#..#', '...#...', '...#...', '.###...', '####...', '####...', '.##....'];

const c_NOTA2 = ['..#######', '..#######', '..#.....#', '..#.....#', '..#.....#', '..#.....#', '..#...###', '###..####', '####.####', '####..##.', '.##......'];

// avión, cirros casi quietos y cúmulos de tres tonos a distintas velocidades. o.hor; o.modo 'dia' | 'tarde'; o.sol [x, y, r]
const c_CIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']],
  tarde: [[0, '#24225a'], [0.14, '#3a3a7a'], [0.3, '#5e3e82'], [0.45, '#a0507a'], [0.58, '#cc626a'], [0.7, '#e88a5a'], [0.83, '#f8c070'], [0.94, '#fde4a4']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const c_NUBES = { dia: ['#a8d6f2', '#d2ecfc', '#ffffff'].map(hex), tarde: ['#7a4476', '#de8478', '#ffd4a4'].map(hex) };

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana
function c_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

function c_cielo(R, t, o = {}) {
  const K = c_K, hor = o.hor ?? 96, modo = o.modo ?? 'dia', B = R.buf, P = c_CIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = c_um(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 270 && y < 50, sol = o.sol === undefined ? [258, 22, 7] : o.sol;
  if (sol) { const [sx, sy, sr] = sol, gl = modo === 'tarde' ? K.haloT : K.halo, R2 = sr + (modo === 'tarde' ? 18 : 10);
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
      const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (c_um(x, y) < q * q) B[y * 320 + x] = c_mez(B[y * 320 + x], gl, 0.42); } }
  // la estela del avión: densa junto a él y rala hasta deshacerse
  if (o.estela !== null) { const [e0, pe] = o.estela ?? [hor * 0.5, 0.03], u = ((t + 9) % 44) * 10 - 40, ax = Math.round(u), ay = Math.round(e0 + u * pe), ce = modo === 'tarde' ? hex('#ffd8b4') : hex('#f4f8fc'), ce2 = modo === 'tarde' ? hex('#f0a888') : hex('#cfe4f4');
    for (let i = 3; i < 170; i++) { const x = ax - i, y = Math.round(ay - i * pe + (i > 60 ? Math.sin(i * 0.15 + t * 0.2) * 0.8 : 0)); if (x < 0 || x > 319 || y < 16 || y >= hor - 1 || atom(x, y)) continue; const d = i < 40 ? 1 : i < 120 ? 0.95 - (i - 40) / 130 : 0.33 - (i - 120) / 240;
      if (c_um(x, y) < d) B[y * 320 + x] = ce; if (i > 18 && c_um(x, y + 1) < d * 0.75) B[(y + 1) * 320 + x] = ce2; }
    if (ax >= 0 && ax < 320 && ay > 16 && !atom(ax, ay)) { R.rect(ax - 2, ay, ax + 1, ay, K.blanco); R.pset(ax - 1, ay - 1, K.grisL); } }
  const cn = c_NUBES[modo];
  // cirros: velos finos y lejanos que apenas se mueven
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(18, Math.round(hor * (0.2 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      R.pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) R.pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) R.pset(x - 4, y + 1, cn[0]); } }
  // cúmulos: los lejanos, pequeños y lentos; los cercanos, grandes y más rápidos
  const n = o.cumulos ?? 6;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(32, hor * 0.34) + k * hor * 0.14 : Math.max(28, hor * (0.45 + (k - 2) * 0.09))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    c_nube(R, Math.round(x), y, w, k, cn); }
  if (sol) { const [sx, sy, sr] = sol; R.disco(sx, sy, sr + 1, modo === 'tarde' ? hex('#ffd890') : K.solL); R.disco(sx, sy, sr, K.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }
}

// un edificio lejano: fachada c con el lado derecho en sombra cS y ventanas cV (o.bandas: franjas; o.px, o.py: su paso;
// o.luz: fracción de ventanas encendidas, de color o.cL)
function c_edif(R, x0, x1, top, base, c, cS, cV, o = {}) {
  R.rect(x0, top, x1, base, c); R.rect(x1 - Math.max(0, ((x1 - x0) / 4) | 0), top, x1, base, cS);
  const px = o.px ?? 3, py = o.py ?? 3;
  for (let y = top + 2; y < base - 1; y += py) { if (o.bandas) { R.rect(x0, y, x1, y, cV); continue; } for (let x = x0 + 1; x < x1; x += px) if (h(x, y, x0) < (o.d ?? 0.75)) R.pset(x, y, o.luz && h(x, y, 9) < o.luz ? (o.cL ?? c_K.luz) : cV); }
}

// el skyline de Chicago en 1983 visto desde el parque, con la base en y = base: tres términos (bruma, medio, cerca).
// Lo alto queda entre x 172 y 276; bajo el año no pasa de y 22 y bajo Atom, de y 52
function c_skyline(R, base, tarde) {
  const K = c_K, { rect, pset, linea } = R, luz = tarde ? 0.3 : 0, d = base - 66;
  // la bruma del fondo: bloques pálidos
  for (let k = 0; k < 26; k++) { const x0 = Math.round(k * 12.6 + h(k, 1, 40) * 5), w = 6 + Math.round(h(k, 2, 40) * 8), top = base - 8 - Math.round(h(k, 3, 40) * (x0 > 262 ? 6 : 20)); c_edif(R, x0, x0 + w, top, base, hex('#9cb8d6'), hex('#8aa8ca'), hex('#b4cce4'), { d: 0.5, luz, cL: K.luz }); }
  // el término medio: torres azuladas con retranqueos, depósitos y antenas
  for (const [x0, x1, top, tipo] of [[2, 14, 44, 0], [18, 30, 36, 1], [34, 50, 46, 0], [52, 62, 30, 2], [66, 82, 40, 1], [86, 100, 48, 0], [142, 150, 34, 0], [166, 176, 42, 1], [202, 214, 38, 2], [216, 226, 46, 0], [254, 266, 52, 0], [268, 280, 56, 1], [284, 296, 58, 0]]) {
    const tp = top + d; c_edif(R, x0, x1, tp, base, hex('#7c96ba'), hex('#6682a8'), hex('#a4bedc'), { luz, d: 0.8 });
    if (tipo === 1) { c_edif(R, x0 + 2, x1 - 2, tp - 5, tp, hex('#7c96ba'), hex('#6682a8'), hex('#a4bedc'), { luz }); rect(x0 + 4, tp - 8, x1 - 4, tp - 5, hex('#6682a8')); }
    if (tipo === 2) { linea((x0 + x1) >> 1, tp - 7, (x0 + x1) >> 1, tp, hex('#56709a')); rect(x0 + 1, tp - 2, x0 + 3, tp, hex('#56709a')); }
    rect(x0, tp, x1, tp, hex('#94aece')); }
  // la torre de piedra con su mástil, la roja y la blanca de rayas finas
  { const tp = 38 + d; c_edif(R, 104, 122, tp, base, hex('#c4bca8'), hex('#a49c8c'), hex('#7c8498'), { luz, px: 2 }); rect(109, tp - 4, 117, tp, hex('#b4ac98')); linea(113, tp - 13, 113, tp - 4, K.grisS); pset(113, tp - 14, K.rojo); }
  c_edif(R, 150, 164, 44 + d, base, hex('#b44e40'), hex('#963c36'), hex('#d47a66'), { luz, px: 2, py: 2, d: 0.6 });
  { const tp = 22 + d; rect(128, tp, 140, base, hex('#e2e8f0')); rect(137, tp, 140, base, hex('#bcc8d8')); for (let x = 129; x < 140; x += 2) linea(x, tp + 1, x, base, hex('#a4b2c8')); rect(128, tp, 140, tp, K.blanco); }
  // la torre negra escalonada, la más alta, con sus dos antenas
  { const c = K.sears, cL = K.searsL, tp = 15 + d;
    rect(176, 42 + d, 198, base, c); rect(180, 30 + d, 198, 42 + d, c); rect(184, tp, 194, 30 + d, c);
    for (let y = tp + 2; y < base; y += 2) { const x0 = y < 30 + d ? 184 : y < 42 + d ? 180 : 176, x1 = y < 30 + d ? 194 : 198; for (let x = x0 + 1; x < x1; x++) if ((x & 1) || tarde) pset(x, y, tarde && h(x, y, 44) < 0.3 ? K.luz : cL); }
    for (const yy of [29 + d, 41 + d, 54 + d]) rect(176, yy, 198, yy, hex('#22263a')); rect(176, 42 + d, 177, base, cL); rect(184, tp, 184, 30 + d, cL);
    linea(187, tp - 8, 187, tp, K.grisL); linea(191, tp - 8, 191, tp, K.grisL); pset(187, tp - 9, K.blanco); pset(191, tp - 9, K.blanco); }
  // la torre oscura que se estrecha, con sus aspas y sus dos antenas
  { const tp = 24 + d; for (let y = tp; y <= base; y++) { const e = (y - tp) / (base - tp), x0 = Math.round(232 - e * 5), x1 = Math.round(244 + e * 5); rect(x0, y, x1, y, (y - tp) % 3 === 0 ? K.hancockL : K.hancock); pset(x0, y, K.hancockL); if (tarde && (y - tp) % 3 === 1) for (let x = x0 + 1; x < x1; x += 2) if (h(x, y, 45) < 0.4) pset(x, y, K.luz); }
    for (let s = 0; s < 3; s++) { const y0 = tp + 2 + s * 13, y1 = y0 + 13; linea(232 - s * 1.6, y0, 245 + (s + 1) * 1.6, y1, hex('#787686')); linea(244 + s * 1.6, y0, 231 - (s + 1) * 1.6, y1, hex('#787686')); }
    linea(236, tp - 9, 236, tp, K.grisL); linea(240, tp - 9, 240, tp, K.grisL); pset(236, tp - 10, K.blanco); pset(240, tp - 10, K.blanco); }
}

// el lago: degradado tramado, destellos que titilan, veleros, un carguero en el horizonte y el faro del rompeolas
function c_lago(R, t, y0, y1, tarde) {
  const K = c_K, B = R.buf, cs = tarde ? [hex('#f4b888'), hex('#c8808c'), hex('#7a5a94'), hex('#5a4a88')] : [K.lago0, K.lago1, K.lago2, K.lago3], n = y1 - y0;
  for (let y = y0; y < y1; y++) { const u = (y - y0) / n * 3, i = Math.min(2, u | 0), p = u - i; for (let x = 0; x < 320; x++) B[y * 320 + x] = c_um(x + ((t * 3) | 0), y) < p ? cs[i + 1] : cs[i]; }
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 50) * 319), y = y0 + 1 + Math.round(h(k, 2, 50) * (n - 2)); if (Math.sin(t * (1.5 + h(k, 3, 50) * 2) + k * 1.7) > 0.25) R.rect(x, y, x + 1 + (k % 3), y, tarde ? hex('#ffe4a4') : K.lagoL); }
  // el rompeolas con su faro y el carguero
  R.rect(286, y0, 319, y0, K.grisS); R.rect(300, y0 - 6, 302, y0 - 1, K.blanco); R.rect(300, y0 - 4, 302, y0 - 3, K.rojo); R.pset(301, y0 - 7, Math.floor(t * 1.2) % 2 ? K.amarilloL : K.rojo);
  { const x = Math.round(340 - ((t * 2.2 + 120) % 420)); R.rect(x, y0 - 1, x + 22, y0, hex('#5a4a5a')); R.rect(x + 16, y0 - 4, x + 20, y0 - 2, K.crema); R.pset(x + 18, y0 - 5, K.rojoS); }
  for (let k = 0; k < 5; k++) { const d = k % 2 ? -1 : 1, v = 2.5 + k * 0.8, u = (h(k, 4, 51) * 400 + t * v) % 400, x = Math.round(d > 0 ? u - 40 : 360 - u), y = y0 + 3 + ((k * 5) % (n - 5)), s = 4 + (k % 3) * 2, vela = [K.blanco, K.blanco, K.rojo, K.amarillo, K.blanco][k];
    R.rect(x - 3, y, x + 3, y, K.blanco); R.rect(x - 2, y + 1, x + 2, y + 1, K.azul); R.linea(x, y - s - 1, x, y, K.k);
    for (let j = 0; j < s; j++) { R.rect(x + (d > 0 ? 1 : -1 - Math.round(j * 0.7)), y - s + j, x + (d > 0 ? 1 + Math.round(j * 0.7) : -1), y - s + j, vela); } R.pset(x - d, y - 2, K.grisL); R.rect(x - 2, y + 2, x + 2, y + 2, tarde ? hex('#ffe4a4') : K.lagoL); }
}

// un árbol frondoso de parque: tronco con luz y sombra y copa de bolas en cuatro tonos, con contorno oscuro, motas de
// hojas y un vaivén leve con t. (x, suelo) = el pie; alto total; rx = radio de la copa
function c_arbol(R, x, suelo, alto, rx, t, o = {}) {
  const K = c_K, P = o.pal ?? [K.hojaD, K.hojaS, K.hoja, K.hojaL, K.hojaB], ry = Math.round(rx * (o.ach ?? 0.82)), cy = suelo - alto + ry, w = Math.max(1, Math.round(rx / 8)), sem = o.sem ?? x;
  for (let y = cy; y <= suelo; y++) { const e = y > suelo - 3 ? 1 : 0; R.rect(x - w - e, y, x + w + e, y, K.tronco); R.pset(x - w - e, y, K.troncoL); R.pset(x + w + e, y, K.troncoS); if (w > 1 && h(x, y, 5) < 0.35) R.pset(x + 1 - ((y >> 2) & 1), y, K.troncoS); }
  if (rx > 12) { R.linea(x, cy + ry + 4, x - Math.round(rx * 0.45), cy + 2, K.tronco); R.linea(x, cy + ry + 6, x + Math.round(rx * 0.5), cy + 3, K.troncoS); }
  const n = 6 + Math.round(rx / 3), bol = [[x, cy, rx * 0.5]], m = Math.round(Math.sin(t * 1.1 + sem));
  for (let i = 0; i < n; i++) { const a = (i / n) * 6.283 + h(i, sem, 21), dd = 0.45 + 0.3 * h(i, sem, 22), r = rx * (0.3 + 0.16 * h(i, sem, 23)); bol.push([x + Math.cos(a) * dd * rx, cy + Math.sin(a) * dd * ry, r]); }
  for (const [bx, by, r] of bol) R.disco(Math.round(bx), Math.round(by), Math.round(r + 1), P[0]);
  for (const [bx, by, r] of bol) R.disco(Math.round(bx), Math.round(by), Math.round(r), P[1]);
  for (const [bx, by, r] of bol) R.disco(Math.round(bx - 1), Math.round(by - 1), Math.round(r * 0.8), P[2]);
  for (const [bx, by, r] of bol) R.disco(Math.round(bx - r * 0.25 + m * 0.5), Math.round(by - r * 0.35), Math.round(r * 0.45), P[3]);
  bol.forEach(([bx, by, r], i) => { for (let q = 0; q < 4; q++) { const a = h(i, q, sem) * 6.283, dd = h(q, i, sem + 1) * r * 0.85, px = Math.round(bx + Math.cos(a) * dd), py = Math.round(by + Math.sin(a) * dd * 0.9); R.pset(px + (q === 0 ? m : 0), py, Math.sin(a) < -0.1 ? P[4] : P[1]); if (q === 1) R.pset(px + 1, py, P[0]); } });
}

// las hojas con la luz del atardecer (los árboles que se mecen se pintan en vivo, fuera del búfer teñido)
const c_HOJAS_T = ['hojaD', 'hojaS', 'hoja', 'hojaL', 'hojaB'].map((k) => c_mez(c_mez(c_K[k], hex('#ff8a4a'), 0.2), hex('#2a1a4a'), 0.14));

// sombra tramada (de un árbol, de una nube) sobre el suelo: oscurece la elipse
function c_sombra(R, cx, cy, rx, ry, f = 0.3, col = c_K.hojaD) {
  const B = R.buf; for (let y = Math.max(0, cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, cx - rx); x <= Math.min(319, cx + rx); x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e < 1 && c_um(x, y) < 1.25 - e) { const i = y * 320 + x; if (B[i]) B[i] = c_mez(B[i], col, f); } }
}

// un paseante pequeño (11 px) con ropa de 1983; k elige colores; d = hacia dónde mira; o.quieto; o.ps: su pset (recortes)
const c_ROPA = ['#d84a4a', '#3a8ad0', '#f0c838', '#e87ab0', '#5aba6a', '#f6f2ea', '#8a5ad0', '#f08a3a'].map(hex), c_PANT = ['#3a4a7a', '#5a4a3a', '#e8e0d0', '#2a2a3a'].map(hex), c_PELO = ['#3a2a1a', '#c89a4a', '#1c1424', '#8a4a2a'].map(hex);

function c_gente(R, x, y, k, t, d = 1, o = {}) {
  const K = c_K, ps = o.ps ?? R.pset, paso = o.quieto ? 0 : Math.floor(t * 5 + k) % 2, ropa = c_ROPA[k % 8], pant = c_PANT[k % 4], piel = k % 4 === 2 ? K.piel2 : K.piel, pelo = c_PELO[(k * 3) % 4];
  for (let j = 0; j < 4; j++) { ps(x + paso, y - j, pant); ps(x + 2 - paso, y - j, pant); }
  if (k % 5 === 1) for (let j = 2; j < 4; j++) { ps(x + paso, y - j, piel); ps(x + 2 - paso, y - j, piel); }   // pantalón corto
  for (let j = 4; j < 8; j++) for (let i = 0; i < 3; i++) ps(x + i, y - j, ropa);
  ps(x + (d > 0 ? 2 : 0), y - 6 + (o.quieto ? 0 : paso), piel);
  for (let i = 0; i < 3; i++) { ps(x + i, y - 8, piel); ps(x + i, y - 9, piel); ps(x + i, y - 10, pelo); }
  ps(x + (d > 0 ? 0 : 2), y - 9, pelo); if (k % 3 === 0) { ps(x, y - 9, K.k); ps(x + 2, y - 9, K.k); ps(x + 1, y - 9, K.k); }   // gafas de sol de los ochenta
}

// una paloma que picotea (o.vuela: aleteando)
function c_paloma(R, x, y, t, k = 0, d = 1) {
  const K = c_K, pic = Math.sin(t * 5 + k * 2.3) > 0.5 ? 1 : 0;
  R.rect(x - 1, y - 2, x + 2, y - 1, hex('#8a8e9e')); R.pset(x - 2 * d + (d < 0 ? 1 : 0), y - 2, hex('#6a6e7e')); R.pset(x + (d > 0 ? 3 : -2), y - 3 + pic, hex('#6a6e7e')); R.pset(x + (d > 0 ? 4 : -3), y - 3 + pic * 2, K.naranja); R.pset(x, y - 1, hex('#b0b4c4')); R.pset(x, y, K.rojoS); R.pset(x + 1, y, K.rojoS);
}

// un banco de parque de listones verdes, de frente (22 px)
function c_banco(R, x, y) { const K = c_K; for (const dy of [-9, -6]) { R.rect(x, y + dy, x + 22, y + dy + 1, K.k); R.rect(x + 1, y + dy, x + 21, y + dy, hex('#3e8a5a')); } R.rect(x, y - 3, x + 22, y - 2, K.k); R.rect(x + 1, y - 3, x + 21, y - 3, hex('#5aa872')); for (const lx of [x + 2, x + 19]) { R.rect(lx, y - 9, lx + 1, y, K.k); } }

// una farola de fundición con su globo (encendido al atardecer, con halo tramado)
function c_farola(R, x, y0, y1, on) {
  const K = c_K; R.rect(x, y0 + 5, x + 1, y1, K.k); R.rect(x - 1, y1 - 1, x + 2, y1, K.k); R.rect(x - 1, y0 + 4, x + 2, y0 + 5, K.k); R.disco(x, y0 + 1, 3, K.k); R.disco(x, y0 + 1, 2, on ? K.luzL : hex('#e4ecec')); R.pset(x - 1, y0, K.blanco);
  if (on) for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d > 3.5 && d < 7.5 && c_um(x + i, y0 + 1 + j) < (7.5 - d) / 6) { const p = R.pget(x + i, y0 + 1 + j); if (p) R.pset(x + i, y0 + 1 + j, c_mez(p, K.luzL, 0.4)); } }
}

// un montón de tierra recién sacada: (x, y) = centro de la base; rx, alto; terrones, piedrecitas y alguna brizna
function c_monton(R, x, y, rx, alto, k = 0) {
  const K = c_K;
  for (let i = -rx; i <= rx; i++) { const u = i / rx, top = Math.round(y - alto * Math.sqrt(Math.max(0, 1 - u * u)) * (0.86 + 0.14 * Math.sin(i * 0.9 + k))) ;
    for (let yy = top; yy <= y; yy++) { const q = h(x + i, yy, 70 + k), q2 = h((x + i) >> 1, yy >> 1, 71 + k); let c = u < -0.25 && yy < top + alto * 0.5 ? K.tierraL : u > 0.45 || yy > y - 2 ? K.tierraS : K.tierra; if (q2 < 0.2) c = K.tierraS; else if (q < 0.09) c = K.arcillaL; else if (q > 0.95) c = K.tierraD; if (yy === top) c = u < 0.2 ? K.arcillaL : K.tierraD; R.pset(x + i, yy, c); } }
  for (let q = 0; q < 6; q++) { const px = x + Math.round((h(q, k, 72) - 0.5) * rx * 2.6), py = y - Math.round(h(q, k, 73) * 2); R.pset(px, py, K.tierra); R.pset(px + 1, py, K.tierraS); }
  R.pset(x - (rx >> 1), y - (alto >> 1), K.piedraL); R.pset(x + (rx >> 2), y - (alto >> 2), K.piedra); R.pset(x + 2, y - alto + 3, K.cS);
}

// una mochila roja de los ochenta con su bolsillo, las hebillas y una cantimplora al lado: (x, y) = centro de la base
function c_mochila(R, x, y) {
  const K = c_K; R.rect(x - 6, y - 12, x + 6, y, K.k); R.rect(x - 5, y - 11, x + 5, y - 1, K.rojo); R.rect(x + 3, y - 11, x + 5, y - 1, K.rojoS); R.rect(x - 5, y - 11, x + 5, y - 10, hex('#f06a5a')); R.rect(x - 4, y - 6, x + 2, y - 1, K.k); R.rect(x - 3, y - 5, x + 1, y - 2, hex('#e8a030')); R.rect(x - 3, y - 5, x + 1, y - 5, K.amarilloL);
  R.rect(x - 3, y - 14, x + 3, y - 13, K.k); R.pset(x - 1, y - 8, K.metalL); R.pset(x - 1, y - 9, K.metalL); R.rect(x + 8, y - 7, x + 12, y, K.k); R.rect(x + 9, y - 6, x + 11, y - 1, hex('#5a8a6a')); R.pset(x + 9, y - 6, hex('#8aba9a')); R.rect(x + 9, y - 9, x + 11, y - 8, K.metal);
}

function c_parque(R, t, o) {
  const K = c_K, tarde = o.hora === 'tarde', n = Math.max(0, Math.min(6, Math.round(o.hoyos ?? 0))), Rv = tarde ? c_vivo(R) : R, { rect, pset, linea, disco } = Rv, c0 = tarde ? c_tarde(K.c0) : K.c0, c1 = tarde ? c_tarde(K.c1) : K.c1;
  c_cielo(R, t, { hor: 68, modo: tarde ? 'tarde' : 'dia', sol: tarde ? [262, 54, 8] : [258, 22, 7], estela: [34, 0.02] });
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 46, cada: 10, v: 34 });
  c_lago(R, t, 64, 86, tarde);
  c_pega(R, c_fijo(R, 'parque' + n + tarde, () => c_parqueFijo(R, n, tarde)), 0);
  // la cometa que vuela sobre el lago (su hilo baja hasta el niño del paseo)
  { const kx = Math.round(212 + Math.sin(t * 0.7) * 9), ky = Math.round(40 + Math.cos(t * 1.1) * 4); linea(kx, ky + 4, 224, 86, hex('#e8eef4'), 2); for (let j = -4; j <= 4; j++) { const w = 3 - Math.round(Math.abs(j) * 0.7); rect(kx - w, ky + j, kx + w, ky + j, j < 0 ? K.rojo : K.amarillo); } pset(kx, ky, K.k);
    for (let i = 1; i < 7; i++) pset(kx + Math.round(Math.sin(t * 4 + i) * 1.5), ky + 4 + i * 2, i % 2 ? K.azulL : K.blanco); }
  // la sombra de una nube que cruza el césped
  { const nx = Math.round(((t * 6) % 560) - 120); c_sombra(R, nx, 158, 64, 9, 0.16, K.cD); }
  // la gran fuente: el chorro central y los arcos de agua, con su rocío
  { const fx = 70, fb = 90, al = 15 + Math.round(Math.sin(t * 1.3) * 2); for (let j = 0; j < al; j++) { pset(fx + Math.round(Math.sin(t * 9 + j) * 0.6), fb - 10 - j, j % 3 ? K.blanco : K.lagoL); if (j < al - 4) pset(fx + 1, fb - 10 - j, K.lago0); }
    for (let s = -1; s <= 1; s += 2) for (let i = 1; i < 14; i++) { const u = i / 14, x = fx + s * Math.round(u * 15), y = fb - 5 - Math.round(Math.sin(u * Math.PI) * 9); if ((i + Math.floor(t * 10)) % 3) pset(x, y, K.blanco); if ((i + Math.floor(t * 10)) % 4 === 0) pset(x, y + 1, K.lagoL); }
    for (let q = 0; q < 6; q++) { const u = (t * 1.4 + q / 6) % 1; pset(fx + Math.round((h(q, 1, 55) - 0.5) * 30), fb - 4 - Math.round(u * 5), K.lagoL); } }
  // la gente del paseo: paseantes, una corredora con cinta en el pelo, un perro con su dueño y el niño de la cometa
  for (let k = 0; k < 5; k++) { const d = k % 2 ? -1 : 1, v = k === 3 ? 22 : 6 + k * 1.6, u = (t * v + k * 83) % 400, x = Math.round(d > 0 ? u - 40 : 360 - u); c_gente(Rv, x, 97, k + 1, t * (k === 3 ? 2 : 1), d); if (k === 3) rect(x, 87, x + 2, 87, K.amarillo);
    if (k === 2) { const px = x + d * 7, sal = Math.floor(t * 6) % 2; rect(px - 2, 95, px + 2, 96, hex('#c89a5a')); pset(px + d * 3, 94, hex('#c89a5a')); pset(px - d * 3, 94 - sal, hex('#c89a5a')); pset(px - 2, 97, hex('#8a6a3a')); pset(px + 2, 97, hex('#8a6a3a')); linea(x + (d > 0 ? 3 : -1), 91, px + d * 2, 94, K.k); } }
  c_gente(Rv, 223, 92, 4, 0, -1, { quieto: true }); pset(224, 86, K.piel);
  c_banco(Rv, 182, 110); c_gente(Rv, 190, 107, 6, 0, 1, { quieto: true }); rect(193, 100, 196, 102, K.blanco); pset(194, 101, K.grisL);   // alguien lee el periódico en el banco
  // los árboles de cerca, que se mecen, con la ardilla del tronco
  c_arbol(Rv, 296, 134, 84, 27, t, { sem: 7 }); c_arbol(Rv, 22, 120, 62, 19, t, { sem: 3 });
  { const u = (t * 0.25) % 2, ay = Math.round(128 - (u < 1 ? u : 2 - u) * 22); rect(299, ay - 3, 300, ay, hex('#a06a3a')); pset(300, ay - 4, hex('#a06a3a')); rect(301, ay - 1, 302, ay + 2, hex('#c88a52')); }
  // las palomas del césped y las flores que mueve el aire
  for (let k = 0; k < 4; k++) c_paloma(Rv, 132 + k * 9 + Math.round(Math.sin(t * 0.6 + k * 2) * 3), 112 + (k % 2) * 4, t, k, k % 2 ? 1 : -1);
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 57) * 319), y = 104 + Math.round(h(k, 2, 57) * 72); if (R.pget(x, y) === c0 || R.pget(x, y) === c1) { const m = Math.round(Math.sin(t * 2.2 + k)); pset(x + m, y - 2, k % 3 ? K.blanco : K.amarillo); pset(x, y - 1, K.cS); } }
  // una mariposa
  { const bx = Math.round(150 + Math.sin(t * 0.5) * 60), by = Math.round(120 + Math.sin(t * 1.7) * 8); pset(bx, by, K.k); if (Math.floor(t * 8) % 2) { pset(bx - 1, by - 1, K.naranja); pset(bx + 1, by - 1, K.naranja); } else { pset(bx - 1, by, K.naranja); pset(bx + 1, by, K.naranja); } }
  return { suelo: 150, horizonte: 64, picnic: [249, 157], bici: [92, 157], hoyos: c_HOYOS.slice(0, n).map(([x, y]) => [x, y]), fuente: [70, 90], banco: [193, 110], arboles: [[22, 120], [296, 134]] };
}
// lo fijo del parque: el skyline, la arboleda de la orilla, la fuente, el paseo, el césped a franjas, el sendero y los hoyos
function c_parqueFijo(R, n, tarde) {
  const K = c_K, B = R.buf, { rect, pset, disco, linea } = R;
  c_skyline(R, 64, tarde);
  for (let x = 0; x < 320; x++) { const yt = 86 - Math.round(3 + 2 * Math.sin(x * 0.21) + 1.6 * Math.sin(x * 0.07 + 1) + h(x >> 1, 3, 61) * 2); for (let y = yt; y < 90; y++) B[y * 320 + x] = y === yt ? K.hojaL2 : h(x, y, 62) < 0.22 ? K.hojaD : y - yt < 3 ? K.hoja2 : K.hojaS; if (x % 13 === 5) { B[88 * 320 + x] = K.troncoS; B[89 * 320 + x] = K.troncoS; } }
  for (let y = 90; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (y >= 93 && y <= 99) c = y === 93 || y === 99 ? K.losaS : (x + (y > 96 ? 7 : 0)) % 14 === 0 || y === 96 ? K.losaS : h(x >> 1, y, 63) < 0.1 ? K.losaL : K.losa;
    else { const xl = 58 - (y - 99) * 0.8, xr = 72 - (y - 99) * 0.42;
      if (y > 99 && x >= xl && x <= xr) c = x < xl + 1 || x > xr - 1 ? K.losaS : h(x >> 1, y >> 1, 64) < 0.16 ? K.losaS : h(x, y, 65) < 0.12 ? K.losaL : K.losa;
      else { const s = Math.floor((x - 160) / (y - 50) * 2.6) & 1, q = h(x, y, 66); c = s ? K.c1 : K.c0; if (q < 0.045) c = K.cL; else if (q > 0.96) c = K.cS; else if (h(x >> 3, y >> 2, 67) < 0.14 && ((x + y) & 1)) c = K.cS; if (y < 93) c = (x + y) & 1 ? K.cS : K.c0; } }
    B[y * 320 + x] = c; }
  // parterres de tulipanes al otro lado del paseo y matas sueltas en el césped
  for (let x = 96; x < 320; x += 2) { if (x > 160 && x < 176) continue; pset(x, 91, [K.rojo, K.amarillo, hex('#e87ab0'), K.blanco][(x >> 1) % 4]); pset(x, 92, K.cD); }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 68) * 319), y = 102 + Math.round(h(k, 2, 68) * 76), c = B[y * 320 + x]; if (c !== K.c0 && c !== K.c1) continue; if (k % 3 === 0) { pset(x, y, K.blanco); pset(x + 1, y, K.amarillo); } else { linea(x, y, x - 1, y - 2, K.cD); linea(x + 1, y, x + 2, y - 3, K.cL); pset(x, y - 1, K.cS); } }
  // la gran fuente de piedra rosada: tres pilas
  { const fx = 70, fb = 90, p = hex('#e4c8c0'), pS = hex('#b89890'), pL = hex('#f6e4dc'); rect(fx - 18, fb - 2, fx + 18, fb, K.k); rect(fx - 17, fb - 2, fx + 17, fb - 1, p); rect(fx - 17, fb - 2, fx + 17, fb - 2, K.lago1); rect(fx + 8, fb - 1, fx + 17, fb - 1, pS);
    rect(fx - 9, fb - 6, fx + 9, fb - 5, p); rect(fx - 9, fb - 6, fx + 9, fb - 6, pL); rect(fx - 2, fb - 4, fx + 2, fb - 3, pS); rect(fx - 4, fb - 9, fx + 4, fb - 8, p); rect(fx - 4, fb - 9, fx + 4, fb - 9, pL); rect(fx - 1, fb - 7, fx + 1, fb - 7, pS); pset(fx, fb - 10, pL); }
  // las sombras de los árboles, los árboles lejanos y las farolas
  c_sombra(R, 150, 101, 16, 3); c_sombra(R, 262, 104, 18, 3); c_sombra(R, 300, 137, 34, 7, 0.34); c_sombra(R, 28, 122, 22, 5, 0.34);
  c_arbol(R, 150, 100, 40, 13, 0, { sem: 5, pal: [K.hojaD, K.hojaS, K.hoja2, K.hojaL2, K.hojaL] }); c_arbol(R, 262, 103, 46, 15, 0, { sem: 9 }); c_arbol(R, 112, 92, 26, 9, 0, { sem: 2, pal: [K.hojaD, K.hojaS, K.hoja2, K.hojaL2, K.hojaL] });
  c_farola(R, 126, 76, 93, tarde); c_farola(R, 238, 76, 93, tarde);
  rect(206, 103, 210, 110, K.k); rect(207, 104, 209, 109, hex('#4a7a5a')); rect(206, 103, 210, 103, K.metalD);   // la papelera
  // la manta de picnic a cuadros con su cesta, el termo y el radiocasete de 1983; y la bici de cross apoyada en su pata
  for (let y = 150; y <= 157; y++) for (let x = 236; x <= 262; x++) { const xx = x + ((157 - y) >> 1); pset(xx, y, y === 157 ? K.cD : ((x >> 1) + (y >> 1)) & 1 ? K.rojo : K.blanco); }
  rect(240, 143, 248, 150, K.k); rect(241, 144, 247, 149, K.maderaL); for (let x = 241; x <= 247; x += 2) rect(x, 144, x, 149, K.madera); rect(241, 146, 247, 146, K.maderaS); for (let a = 0; a <= 3.15; a += 0.3) pset(Math.round(244 + Math.cos(a) * 4), Math.round(143 - Math.sin(a) * 4), K.maderaS);
  rect(252, 142, 265, 150, K.k); rect(253, 143, 264, 149, K.grisL); rect(253, 143, 264, 143, K.blanco); disco(256, 147, 2, K.k); disco(261, 147, 2, K.k); pset(256, 147, K.gris); pset(261, 147, K.gris); rect(257, 144, 260, 144, K.k); pset(258, 144, K.rojo); rect(254, 140, 263, 140, K.k); pset(254, 141, K.k); pset(263, 141, K.k); linea(264, 142, 268, 135, K.metalD);
  rect(232, 146, 234, 151, K.k); rect(233, 147, 233, 150, K.azulL); pset(233, 145, K.metalL);
  { const bx = 92, by = 157; for (const dx of [-7, 7]) { disco(bx + dx, by - 4, 4, K.k); disco(bx + dx, by - 4, 3, K.c0); disco(bx + dx, by - 4, 1, K.metalL); pset(bx + dx, by - 7, K.grisL); pset(bx + dx - 3, by - 4, K.grisL); pset(bx + dx + 3, by - 4, K.grisL); pset(bx + dx, by - 1, K.grisL); }
    linea(bx - 7, by - 4, bx - 2, by - 10, K.rojo); linea(bx - 2, by - 10, bx + 5, by - 10, K.rojo); linea(bx + 5, by - 10, bx + 7, by - 4, K.rojo); linea(bx - 2, by - 10, bx + 1, by - 4, K.rojo); linea(bx + 1, by - 4, bx - 7, by - 4, K.rojoS); linea(bx + 5, by - 10, bx + 4, by - 14, K.metalD); rect(bx + 2, by - 15, bx + 6, by - 15, K.k); rect(bx - 5, by - 12, bx - 1, by - 11, K.k); pset(bx + 1, by - 4, K.metalL); linea(bx + 1, by - 4, bx + 3, by, K.metalD); rect(bx + 1, by - 13, bx + 3, by - 12, K.amarillo); }
  // los hoyos, del fondo hacia delante
  c_HOYOS.slice(0, n).map((q, i) => [q, i]).sort((a, b) => a[0][1] - b[0][1]).forEach(([[x, y, rx], i]) => {
    const ry = Math.max(3, Math.round(rx * 0.34)), lado = i % 2 ? -1 : 1;
    for (let j = -ry; j <= ry; j++) for (let ii = -rx; ii <= rx; ii++) { const e = (ii / rx) ** 2 + (j / ry) ** 2; if (e >= 1) continue; pset(x + ii, y + j, e > 0.82 && j < 1 ? K.arcillaL : j < -ry * 0.25 ? ((j + ry) & 1 ? K.tierra : K.tierraS) : j < ry * 0.3 ? K.tierraD : K.hoyoD); }
    for (let ii = -rx; ii <= rx; ii += 2) pset(x + ii, y + Math.round(ry * Math.sqrt(1 - (ii / rx) ** 2)), K.cD);
    c_monton(R, x + lado * (rx + Math.round(rx * 0.7)), y + ry - 1, Math.round(rx * 0.8), Math.round(rx * 0.62), i);
    rect(x - lado * (rx + 4) - 2, y + 1, x - lado * (rx + 4) + 2, y + 2, K.cD); rect(x - lado * (rx + 4) - 2, y + 3, x - lado * (rx + 4) + 2, y + 3, K.tierra);   // un tepe cortado
  });
  if (tarde) c_atardece(R);
}

// la tierra por capas en el píxel (x, y): mantillo oscuro, tierra parda, arcilla y grava
function c_estrato(x, y) {
  const K = c_K, y1 = 108 + Math.sin(x * 0.05) * 2 + Math.sin(x * 0.13), y2 = 137 + Math.sin(x * 0.03 + 1) * 3, y3 = 158 + Math.sin(x * 0.04 + 2) * 2.5, q = h(x, y, 81), q2 = h(x >> 1, y >> 1, 82);
  if (y < y1) return q < 0.14 ? K.humusL : q2 < 0.2 ? K.humusD : K.humus;
  if (y < y1 + 1.5) return c_um(x, y) < 0.5 ? K.humus : K.tierra;
  if (y < y2) return q < 0.07 ? K.tierraL : q2 < 0.16 ? K.tierraS : ((y + Math.round(Math.sin(x * 0.08) * 2)) % 9 === 0 && q > 0.4) ? K.tierraS : K.tierra;
  if (y < y2 + 2) return c_um(x, y) < 0.5 ? K.tierra : K.arcilla;
  if (y < y3) return q < 0.08 ? K.arcillaL : q2 < 0.18 ? K.arcillaS : K.arcilla;
  return q2 < 0.3 ? K.gravaS : q < 0.14 ? K.gravaL : K.grava;
}

const c_HOYO = { x0: 106, x1: 205, fondo: 122, cesped: 100 };

function c_hoyo(R, t, o) {
  const K = c_K, tarde = o.hora === 'tarde', caja = Math.max(0, Math.min(1, o.caja ?? 0)), Rv = tarde ? c_vivo(R) : R, { rect, pset, linea } = Rv, H = c_HOYO;
  c_cielo(R, t, { hor: 62, modo: tarde ? 'tarde' : 'dia', sol: tarde ? [200, 46, 8] : [222, 22, 7], estela: null, cumulos: 5 });
  c_lago(R, t, 60, 70, tarde);
  const fijo = c_fijo(R, 'hoyo' + tarde, () => c_hoyoFijo(R, tarde)); c_pega(R, fijo, 8);
  // la gente del paseo lejano
  for (let k = 0; k < 4; k++) { const d = k % 2 ? -1 : 1, u = (t * (5 + k * 1.5) + k * 97) % 400, x = Math.round(d > 0 ? u - 40 : 360 - u); if (x > 22 && x < 48) continue; c_gente(Rv, x, 82, k + 2, t, d); }
  c_banco(Rv, 232, 93);
  // los dos árboles grandes, que se mecen, y hojas que caen
  c_arbol(Rv, 36, 99, 74, 28, t, { sem: 4 }); c_arbol(Rv, 290, 99, 52, 24, t, { sem: 8, ach: 0.7 });
  for (let k = 0; k < 5; k++) { const u = (t * 0.16 + k / 5) % 1, x = Math.round(20 + h(k, 1, 84) * 280 + Math.sin(t * 2 + k) * 4), y = Math.round(50 + u * 48); if (x < 270 || y > 50) pset(x, y, k % 2 ? K.hojaL : K.amarillo); }
  for (let k = 0; k < 3; k++) c_paloma(Rv, 140 + k * 14 + Math.round(Math.sin(t * 0.5 + k) * 2), 94 + (k % 2) * 2, t, k, k % 2 ? 1 : -1);
  // bajo tierra: la lombriz, las hormigas del hormiguero y la gota de la tubería
  { const wx = 62, wy = 126; for (let i = 0; i < 11; i++) pset(wx + i, wy + Math.round(Math.sin(t * 3 + i * 0.8) * 1.4), i === 10 ? hex('#f0a0a0') : i % 4 === 3 ? hex('#c06a6a') : hex('#e08a8a')); }
  for (let k = 0; k < 5; k++) { const u = (t * 0.12 + k / 5) % 1, [ax, ay] = c_tunel(u); pset(ax, ay, K.k); pset(ax + 1, ay, K.k); }
  { const u = (t * 0.6) % 1; pset(148, 177 + Math.round(u * 3), K.lago1); if (u > 0.8) { pset(147, 179, K.lagoL); pset(149, 179, K.lagoL); } }
  // la caja en la pared derecha: está entera en la tierra y solo se ve lo que se ha desmoronado
  if (caja > 0) {
    const cx = 213, cyb = 124, B = R.buf, r = 3 + caja * 13.5;
    if (PIEZAS_CF.cofre) PIEZAS_CF.cofre(R, cx, cyb, {}); else { rect(204, 104, 221, 121, K.lagoL); rect(208, 113, 217, 120, K.crema); }
    for (let y = 98; y <= 128; y++) for (let x = 196; x <= 230; x++) { const d = Math.hypot(x - 206, (y - 113) * 0.9) + (h(x, y, 85) - 0.5) * 5; if (d > r) B[y * 320 + x] = fijo[y * 320 + x]; else if (x > 205 && fijo[y * 320 + x] !== B[y * 320 + x] && d > r - 2 && h(x, y, 86) < 0.5) B[y * 320 + x] = K.tierraS; }
    // el borde de luz de la caja, los terrones que caen y el destello
    for (let y = 104; y <= 121; y++) if (Math.hypot(0, (y - 113) * 0.9) < r - 1) { pset(204, y, K.blanco); pset(205, y, K.lagoL); }
    if (caja < 1) for (let k = 0; k < 7; k++) { const u = (caja * 4 + k / 7) % 1; pset(204 - (k % 4) - Math.round(u * 3), 105 + Math.round(u * u * 16), k % 2 ? K.tierra : K.tierraL); }
    for (let i = 0; i < Math.round(caja * 9); i++) { pset(204 - i, 121, i % 3 ? K.tierra : K.tierraL); if (i < caja * 5) pset(204 - i, 120, K.tierraS); }
    if (caja > 0.5) { const s = Math.sin(t * 6), gx = 205, gy = 107; if (s > -0.3) { pset(gx, gy, K.blanco); for (let i = 1; i <= (s > 0.5 ? 4 : 2); i++) { pset(gx - i, gy, K.blanco); pset(gx + i, gy, K.blanco); pset(gx, gy - i, K.blanco); pset(gx, gy + i, K.blanco); } if (s > 0.5) { pset(gx - 2, gy - 2, K.lagoL); pset(gx + 2, gy - 2, K.lagoL); pset(gx - 2, gy + 2, K.lagoL); pset(gx + 2, gy + 2, K.lagoL); } } }
  }
  return { suelo: H.cesped, fondo: H.fondo, hoyo: { x0: H.x0, x1: H.x1 }, pared: 206, caja: [213, 113], cofre: [213, 124] };
}
// el túnel del hormiguero: de la superficie (x = 268) a la cámara; u 0–1 a lo largo, ida y vuelta
function c_tunel(u) { const v = u < 0.5 ? u * 2 : 2 - u * 2, pts = [[268, 100], [266, 110], [274, 118], [270, 128], [282, 134], [292, 132]], f = v * (pts.length - 1), i = Math.min(pts.length - 2, f | 0), p = f - i; return [Math.round(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * p), Math.round(pts[i][1] + (pts[i + 1][1] - pts[i][1]) * p)]; }

// lo fijo del hoyo: el parque de arriba y la tierra en corte, con el hoyo abierto
function c_hoyoFijo(R, tarde) {
  const K = c_K, B = R.buf, { rect, pset, linea, disco } = R, H = c_HOYO;
  c_skyline(R, 60, tarde);
  // la arboleda de la orilla, el césped lejano con su paseo y sus parterres
  for (let x = 0; x < 320; x++) { const yt = 70 - Math.round(3 + 2 * Math.sin(x * 0.19 + 2) + 1.6 * Math.sin(x * 0.06) + h(x >> 1, 3, 87) * 2); for (let y = yt; y < 76; y++) B[y * 320 + x] = y === yt ? K.hojaL2 : h(x, y, 62) < 0.22 ? K.hojaD : y - yt < 3 ? K.hoja2 : K.hojaS; }
  for (let y = 76; y < 100; y++) for (let x = 0; x < 320; x++) { let c;
    if (y >= 79 && y <= 83) c = y === 79 || y === 83 ? K.losaS : (x + (y > 81 ? 6 : 0)) % 12 === 0 ? K.losaS : h(x >> 1, y, 63) < 0.1 ? K.losaL : K.losa;
    else if (y >= 97) c = y === 97 ? (h(x, 0, 88) < 0.5 ? K.cL : K.c1) : (x + y) & 1 ? K.cS : K.cD;
    else { const s = Math.floor((x - 160) / (y - 56) * 3) & 1, q = h(x, y, 66); c = s ? K.c1 : K.c0; if (q < 0.05) c = K.cL; else if (q > 0.955) c = K.cS; else if (h(x >> 3, y >> 1, 67) < 0.13 && ((x + y) & 1)) c = K.cS; if (y < 79) c = (x + y) & 1 ? K.cS : K.c0; }
    B[y * 320 + x] = c; }
  for (let x = 60; x < 320; x += 2) { pset(x, 77, [K.rojo, K.amarillo, hex('#e87ab0'), K.blanco][(x >> 1) % 4]); pset(x, 78, K.cD); }
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 89) * 319), y = 86 + Math.round(h(k, 2, 89) * 9); if (k % 3 === 0) { pset(x, y, K.blanco); pset(x + 1, y, K.amarillo); } else { linea(x, y, x - 1, y - 2, K.cD); pset(x + 1, y - 1, K.cL); } }
  c_sombra(R, 44, 97, 38, 4, 0.34); c_sombra(R, 288, 97, 30, 3, 0.34);
  c_farola(R, 118, 62, 79, tarde); c_farola(R, 210, 62, 79, tarde);
  // la tierra en corte
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) {
    const xl = H.x0 - 2 + (y - 100) * 0.1, dentro = y < H.fondo && x >= xl && x <= H.x1;
    let c = c_estrato(x, y);
    if (dentro) { c = c_mez(c, K.hoyoD, 0.42); if (x % 9 === 4 && h(x, y >> 2, 83) < 0.6) c = c_mez(c, K.hoyoD, 0.3); if (x - xl < 2) c = c_mez(c, K.k, 0.3); else if (x > H.x1 - 2) c = c_mez(c, K.k, 0.45); if (y >= H.fondo - 2) c = h(x, y, 91) < 0.4 ? K.tierraL : K.tierra; }
    else if (y === H.fondo && x >= xl && x <= H.x1) c = K.tierraD;
    B[y * 320 + x] = c; }
  // el hueco del hoyo deja ver el césped de detrás entre y 97 y 100
  for (let x = H.x0 - 2; x <= H.x1; x++) for (let y = 97; y < 100; y++) B[y * 320 + x] = (x + y) & 1 ? K.c0 : K.cS;
  // raíces: las finas del césped y las gruesas del árbol de la izquierda
  for (let x = 2; x < 320; x += 5) { if (x > H.x0 - 6 && x < H.x1 + 4) continue; const l = 3 + Math.round(h(x, 1, 92) * 7); for (let j = 0; j < l; j++) pset(x + Math.round(Math.sin(j * 0.8 + x) * 1.2), 100 + j, j % 3 ? hex('#c8a878') : hex('#a08458')); }
  for (const [x1, y1, w] of [[4, 150, 2], [70, 136, 2], [88, 118, 1], [20, 168, 1], [58, 160, 1]]) { for (let i = 0; i <= 40; i++) { const u = i / 40, x = Math.round(36 + (x1 - 36) * u + Math.sin(u * 7 + x1) * 2), y = Math.round(100 + (y1 - 100) * Math.sqrt(u)); rect(x, y, x + (u < 0.5 ? w : 0), y + (u < 0.3 ? 1 : 0), hex('#8a6240')); pset(x, y, hex('#b08458')); } }
  // piedras, con su luz y su sombra
  for (const [x, y, rx, ry] of [[24, 132, 5, 3], [96, 150, 6, 4], [130, 142, 4, 2], [166, 133, 5, 3], [244, 142, 7, 4], [300, 152, 5, 3], [50, 172, 6, 3], [118, 170, 4, 3], [186, 166, 7, 3], [232, 172, 5, 3], [280, 170, 6, 4], [312, 128, 4, 3], [150, 128, 3, 2]])
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e < 1) pset(x + i, y + j, e > 0.7 ? (j > 0 || i > rx * 0.4 ? K.piedraS : K.piedraL) : j < -ry * 0.3 ? K.piedraL : h(x + i, y + j, 93) < 0.15 ? K.piedraS : K.piedra); }
  // cosas enterradas: una botella verde, tres monedas, una lata oxidada, un fósil en espiral, una herradura
  { linea(56, 150, 68, 144, hex('#2a6a4a')); linea(56, 151, 68, 145, hex('#3a8a5a')); linea(57, 152, 69, 146, hex('#3a8a5a')); linea(58, 153, 68, 148, hex('#2a6a4a')); rect(69, 143, 72, 144, hex('#3a8a5a')); pset(60, 150, hex('#8ad0a0')); pset(62, 149, hex('#8ad0a0'));
    for (const [x, y] of [[146, 151], [150, 153], [143, 154]]) { rect(x, y, x + 2, y + 1, K.oro); pset(x, y, K.amarilloL); pset(x + 2, y + 1, hex('#a8842a')); }
    rect(256, 149, 263, 155, hex('#8a4a2a')); rect(256, 149, 263, 149, hex('#c07a4a')); rect(257, 151, 262, 151, hex('#6a3420')); rect(257, 153, 262, 153, hex('#6a3420')); pset(263, 148, hex('#c07a4a'));
    for (let a = 0; a < 14; a += 0.25) { const r = 1 + a * 0.42; pset(Math.round(34 + Math.cos(a) * r), Math.round(168 + Math.sin(a) * r * 0.8), a % 1 < 0.5 ? K.piedraL : K.gravaL); }
    for (let a = 0.4; a < 2.8; a += 0.12) { const x = Math.round(300 + Math.cos(a) * 6), y = Math.round(126 - Math.sin(a) * 6) + 6; pset(x, y, hex('#7a5a4a')); pset(x, y + 1, hex('#5a3e34')); } }
  // el hormiguero: el túnel y su cámara, con huevos
  for (let u = 0; u <= 0.5; u += 0.004) { const [x, y] = c_tunel(u); rect(x, y, x + 1, y + 1, K.hoyoD); } rect(288, 130, 298, 135, K.hoyoD); rect(290, 129, 296, 129, K.hoyoD); pset(292, 134, K.crema); pset(294, 134, K.crema); pset(296, 133, K.crema);
  for (let j = 0; j < 3; j++) rect(266 - j, 99 - j, 271 + j, 99 - j, K.arcillaL);
  // la vieja tubería de hierro del fondo, con sus juntas y sus remaches
  for (let x = 0; x < 320; x++) { for (let y = 170; y <= 176; y++) B[y * 320 + x] = y === 170 ? K.metalL : y < 173 ? K.metal : y < 176 ? K.grisS : K.metalD; if (x % 64 === 20) { for (let y = 168; y <= 178; y++) { B[y * 320 + x] = K.metalD; B[y * 320 + x + 1] = K.metal; B[y * 320 + x + 2] = K.metal; B[y * 320 + x + 3] = K.metalD; } } else if (x % 16 === 5) B[172 * 320 + x] = K.metalD; if (h(x >> 2, 0, 94) < 0.2) B[174 * 320 + x] = hex('#8a5a3a'); }
  if (tarde) c_atardece(R);
}

// lo fijo de la calle desde y = ya: la acera de losas (hasta y = 156), el bordillo (157–158) y la calzada con rodadas,
// manchas de aceite, remiendos, gravilla, la tapa de alcantarilla, la rejilla, un charco y la línea discontinua (y = 178)
function c_calleFija(R, ya) {
  const K = c_K, B = R.buf, yb = 157;
  for (let y = ya; y < 180; y++) for (let x = 0; x < 320; x++) { let c; const q = h(x, y, 95);
    if (y < yb) { const u = (x - 160) * (1 - (y - ya) * 0.012), v = ((u % 22) + 22) % 22; c = y === ya ? K.aceraS : v < 1 || y === ya + 5 ? K.aceraS : q < 0.07 ? K.aceraL : q > 0.95 ? K.aceraS : h(Math.floor(u / 22), y > ya + 5 ? 1 : 0, 96) < 0.25 ? K.aceraL : K.acera; }
    else if (y < yb + 2) c = y === yb ? K.blanco : hex('#8a8678');
    else { const q2 = h(x >> 2, y >> 1, 93); c = q < 0.1 ? K.asfL : q > 0.84 ? K.asfS : K.asf; if (q2 < 0.16) c = c_um(x, y) < 0.5 ? K.asfS : c; else if (q2 > 0.9) c = c_um(x, y) < 0.4 ? K.asfL : c;
      if (y === yb + 2) c = K.asfS; if (y === yb + 3 && h(x >> 1, 3, 94) < 0.5) c = hex('#6a6a70');   // la arenilla junto al bordillo
      if ((y === 168 || y === 169 || y === 175 || y === 176) && h(x >> 4, y >> 1, 97) < 0.8) c = c_um(x, y + (x >> 5)) < 0.45 ? hex('#383842') : c;   // las rodadas
      if (y === 178 && x % 26 < 14) c = h(x, 1, 92) < 0.12 ? K.asfL : hex('#e8e4d0'); }
    B[y * 320 + x] = c; }
  // parches, grietas, tapa de alcantarilla, rejilla del bordillo y un charco
  R.rect(40, 171, 66, 176, K.asfS); for (let x = 40; x <= 66; x += 2) R.pset(x, 171, K.asfL);
  for (let i = 0; i < 26; i++) { R.pset(196 + i, 162 + Math.round(Math.sin(i * 0.9) * 1.5 + i * 0.12), K.k); R.pset(118 + Math.round(Math.sin(i * 0.7) * 2), 160 + (i >> 1), K.asfS); }
  for (let j = -3; j <= 3; j++) for (let i = -8; i <= 8; i++) { const e = (i / 8) ** 2 + (j / 3) ** 2; if (e < 1) R.pset(100 + i, 173 + j, e > 0.72 ? K.k : (i + j) & 1 ? K.metalD : K.grisS); }
  R.rect(224, 159, 236, 160, K.k); for (let x = 225; x < 236; x += 2) R.pset(x, 159, K.metalD);
  // manchas de aceite, un remiendo de alquitrán en zigzag, gravilla clara y una hoja de periódico aplastada
  for (const [mx, my, rx] of [[28, 166, 5], [158, 171, 7], [246, 173, 5], [300, 168, 4]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / 2) ** 2; if (e < 1 && c_um(mx + i, my + j) < 1.1 - e) R.pset(mx + i, my + j, e < 0.3 ? hex('#2e2e38') : hex('#383842')); }
  for (let i = 0; i < 34; i++) { const x = 136 + i, y = 164 + Math.round(Math.abs(((i + 3) % 8) - 4) * 0.5 + i * 0.06); R.pset(x, y, hex('#2a2a32')); if (i % 3 === 0) R.pset(x, y + 1, hex('#2a2a32')); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 91) * 319), y = 160 + Math.round(h(k, 2, 91) * 18); R.pset(x, y, k % 4 === 0 ? hex('#8a8a94') : K.asfL); if (k % 5 === 0) R.pset(x + 1, y, K.asfS); }
  R.rect(182, 161, 187, 163, hex('#d8d4c4')); R.rect(182, 163, 187, 163, hex('#a8a498')); R.rect(183, 162, 186, 162, K.grisS); R.pset(187, 161, K.asf);
  for (let j = -2; j <= 2; j++) for (let i = -11; i <= 11; i++) { const e = (i / 11) ** 2 + (j / 2) ** 2; if (e < 1) R.pset(274 + i, 162 + j, e > 0.7 ? hex('#5a6a88') : hex('#7a94b8')); }
}
// el vapor de la alcantarilla y el brillo del charco
function c_calleViva(R, t) {
  const K = c_K;
  for (let k = 0; k < 7; k++) { const u = (t * 0.45 + k / 7) % 1, x = 100 + Math.round(Math.sin(u * 5 + k) * 3 + u * 4), y = 172 - Math.round(u * 15); if (u < 0.3) R.pset(x, y, K.grisL); else if (c_um(x, y) < 1.2 - u) { R.pset(x, y, K.blanco); R.pset(x + 1, y, K.grisL); if (u < 0.7) R.pset(x, y - 1, K.blanco); } }
  { const x = 266 + Math.round(((t * 3) % 16)); R.rect(x, 162, x + 3, 162, hex('#c8dcf0')); R.pset(270 + Math.round(Math.sin(t) * 4), 161, K.blanco); }
}

// un coche de 1983 de perfil: 'sedan' (anguloso, con cromados), 'taxi' (amarillo con franja de cuadros y luz en el techo),
// 'familiar' (ranchera con paneles de madera y baca) o 'bus' (urbano verde y crema, con pasajeros). (x, s) = el centro y
// la línea de las ruedas; d = sentido de la marcha
function c_coche(R, x, s, tipo, col, d, t) {
  const K = c_K, X = (a, y0, b, y1, c) => { const p = x + a * d, q = x + b * d; R.rect(Math.min(p, q), s + y0, Math.max(p, q), s + y1, c); }, cS = c_mez(col, K.k, 0.3), cL = c_mez(col, K.blanco, 0.4), rot = t * 9;
  const rueda = (a, r) => { const wx = x + a * d, wy = s - r; R.disco(wx, wy, r, K.k); R.disco(wx, wy, r - 2, K.metalL); R.pset(wx, wy, K.metalD); R.pset(wx + Math.round(Math.cos(rot) * (r - 2)), wy + Math.round(Math.sin(rot) * (r - 2)), K.metalD); };
  if (tipo === 'bus') {
    X(-44, -26, 44, -3, K.k); X(-43, -25, 43, -14, K.crema); X(-43, -12, 43, -4, col); X(-43, -13, 43, -13, K.blanco); X(-43, -25, 43, -25, K.blanco); X(-43, -5, 43, -4, cS);
    for (let i = 0; i < 7; i++) { const a = -40 + i * 9; X(a, -23, a + 6, -17, K.vidrio); X(a, -23, a + 6, -23, K.vidrioL); if (h(i, 2, 98) < 0.7) { X(a + 2, -20, a + 4, -18, i % 2 ? K.piel : K.piel2); X(a + 2, -21, a + 4, -21, c_PELO[i % 4]); } }
    X(25, -23, 31, -5, K.k); X(26, -22, 30, -6, K.vidrio); X(28, -22, 28, -6, K.k); X(35, -23, 42, -15, K.vidrio); X(36, -22, 37, -18, K.vidrioL); X(38, -19, 40, -17, K.piel); X(38, -20, 40, -20, K.k);
    X(-30, -9, 10, -8, K.blanco); X(43, -8, 44, -6, K.amarilloL); X(-44, -8, -43, -6, K.rojo); X(-45, -5, 45, -3, K.metalD); X(-20, -27, -8, -27, K.metalD);
    rueda(-28, 5); rueda(28, 5);
    for (let q = 0; q < 3; q++) { const u = (t * 1.5 + q / 3) % 1; R.pset(x - (46 + Math.round(u * 8)) * d, s - 5 - Math.round(u * 5), K.grisL); }
    return;
  }
  const fam = tipo === 'familiar';
  X(-24, -11, 24, -3, K.k); X(-23, -10, 23, -4, col); X(-23, -10, 23, -10, cL); X(-23, -5, 23, -4, cS); X(-23, -7, 23, -7, K.metalL);
  X(fam ? -23 : -14, -18, 9, -10, K.k); X(fam ? -22 : -13, -17, 8, -11, col); X(fam ? -22 : -13, -17, 8, -17, cL);
  X(fam ? -21 : -12, -16, -3, -12, K.vidrio); X(-1, -16, 7, -12, K.vidrio); X(1, -16, 3, -15, K.vidrioL); X(-10, -16, -8, -15, K.vidrioL); if (fam) { X(-12, -17, -12, -11, col); X(-20, -19, 4, -19, K.metalD); X(-18, -19, -18, -18, K.metalD); X(2, -19, 2, -18, K.metalD); }
  X(9, -17, 9, -15, cS); X(10, -13, 11, -11, K.k); X(3, -14, 5, -13, K.piel); X(3, -15, 5, -15, c_PELO[col & 3]);
  X(-2, -10, -2, -5, cS); X(0, -9, 1, -9, K.metalL);
  if (fam) { X(-21, -9, 20, -6, K.maderaL); X(-21, -9, 20, -9, K.madera); X(-21, -6, 20, -6, K.maderaS); for (let a = -15; a < 20; a += 7) X(a, -9, a, -6, K.maderaS); }
  if (tipo === 'taxi') { for (let a = -22; a <= 22; a++) { R.pset(x + a * d, s - 8, a & 1 ? K.k : K.blanco); R.pset(x + a * d, s - 7, a & 1 ? K.blanco : K.k); } X(-4, -20, 0, -19, K.k); X(-3, -20, -1, -20, Math.floor(t * 2) % 2 ? K.amarilloL : K.naranja); }
  X(-25, -6, -24, -4, K.metalL); X(24, -6, 25, -4, K.metalL); X(23, -9, 23, -8, K.amarilloL); X(-23, -9, -23, -8, K.rojo);
  rueda(-14, 4); rueda(14, 4);
}

// el tráfico de la avenida, por delante de la gente: el carril de lejos (ruedas en y = 176) va hacia la izquierda y el
// de cerca (ruedas en y = 183, ya en el borde de abajo) hacia la derecha. Ningún coche pisa la acera (y 146–156): el techo
// más alto queda en y = 157. Con tarde, los coches se tiñen y llevan los faros y los pilotos encendidos
function c_trafico(R, t, tarde = false) {
  const K = c_K, Rv = tarde ? c_vivo(R) : R;
  const luces = (x, s, d, bus) => { if (!tarde) return; const a = bus ? 44 : 24, y = s - (bus ? 7 : 8); R.rect(x + a * d - (d < 0 ? 1 : 0), y - 1, x + a * d + (d > 0 ? 1 : 0), y, K.luzL); R.pset(x - a * d, y, hex('#ff5a4a'));
    for (let i = 2; i < 16; i++) for (let j = -1; j <= 2; j++) { const px = x + (a + i) * d, py = y + j + (i >> 3); if (c_um(px, py) < 0.62 - i * 0.04) { const p = R.pget(px, py); if (p) R.pset(px, py, c_mez(p, K.luzL, 0.4)); } } };
  for (const [off, tipo, col] of [[0, 'sedan', hex('#c8b890')], [300, 'sedan', hex('#d8843a')], [560, 'familiar', hex('#5a7a5a')]]) { const x = Math.round(390 - ((t * 34 + off) % 800)); if (x > -40 && x < 360) { c_coche(Rv, x, 176, tipo, col, -1, t); luces(x, 176, -1); } }
  for (const [off, tipo, col] of [[120, 'sedan', hex('#4a6ab0')], [330, 'bus', K.bus], [560, 'taxi', K.taxi], [740, 'sedan', hex('#a83a3a')]]) { const x = Math.round(((t * 46 + off) % 920) - 70), s = tipo === 'bus' ? 184 : 183; if (x > -60 && x < 380) { c_coche(Rv, x, s, tipo, col, 1, t); luces(x, s, 1, tipo === 'bus'); } }
}
function c_torre(R, t, o) {
  const K = c_K, tarde = o.hora === 'tarde', Rv = tarde ? c_vivo(R) : R, { rect, pset, linea } = Rv;
  c_cielo(R, t, { hor: 122, modo: tarde ? 'tarde' : 'dia', sol: tarde ? [226, 96, 9] : [228, 30, 7], estela: [44, 0.03], cumulos: 6 });
  c_pega(R, c_fijo(R, 'torre' + tarde, () => c_torreFija(R, tarde)), 0);
  // las palomas que rodean el chapitel y las que se posan en las almenas
  for (let k = 0; k < 4; k++) { const a = t * 0.7 + k * 1.6, x = Math.round(196 + Math.cos(a) * (22 + k * 3)), y = Math.round(26 + Math.sin(a) * 6 + k * 2), al = Math.floor(t * 7 + k) % 2; if (Math.sin(a) > -0.2 || Math.abs(x - 196) > 9) { pset(x, y, K.ave); pset(x - 1, y - al, K.ave); pset(x + 1, y - al, K.ave); pset(x - 2, y - al * 2 + 1, hex('#6a6e7e')); pset(x + 2, y - al * 2 + 1, hex('#6a6e7e')); } }
  for (const [px, py, k] of [[176, 81, 0], [215, 81, 1], [161, 91, 2]]) c_paloma(Rv, px, py, t, k, k % 2 ? 1 : -1);
  // la bandera del edificio de la izquierda
  { const bx = 78, by = 34; linea(bx, by - 12, bx, by, K.metalD); for (let i = 0; i < 12; i++) { const yy = by - 12 + Math.round(Math.sin(t * 5 + i * 0.7) * 1.2); for (let j = 0; j < 7; j++) pset(bx + 1 + i, yy + j, i < 5 && j < 4 ? K.azul : j % 2 ? K.blanco : K.rojo); } }
  // el semáforo, el reloj de la esquina y el letrero luminoso (rayas que corren)
  { const f = Math.floor(t / 3) % 3; R.rect(9, 113, 9 + 2, 113 + 2, f === 0 ? K.rojo : hex('#5a2a2a')); R.rect(9, 117, 11, 119, f === 2 ? K.amarillo : hex('#5a4a2a')); R.rect(9, 121, 11, 123, f === 1 ? hex('#4ae07a') : hex('#2a4a3a')); }
  { const a = t * 0.5; linea(56, 112, 56 + Math.round(Math.cos(a) * 3), 112 + Math.round(Math.sin(a) * 3), K.k); linea(56, 112, 56, 110, K.k); }
  for (let i = 0; i < 9; i++) R.pset(111 + i * 4 + (Math.floor(t * 4) % 4), 121, K.amarilloL);
  // la gente de la placita y de la acera del fondo; el vapor del carrito de perritos
  for (let k = 0; k < 4; k++) { const d = k % 2 ? -1 : 1, u = (t * (6 + k * 1.3) + k * 113) % 420, x = Math.round(d > 0 ? u - 50 : 370 - u); c_gente(Rv, x, 147, k, t, d); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; pset(84 + Math.round(Math.sin(u * 6 + k) * 2), 132 - Math.round(u * 9), u > 0.6 ? K.grisL : K.blanco); }
  c_arbol(Rv, 148, 146, 46, 13, t, { sem: 6 }); c_arbol(Rv, 246, 146, 42, 12, t, { sem: 11 });
  c_calleViva(Rv, t);
  return { suelo: 153, torre: [196, 146], puerta: [196, 146], acera: [146, 156], carriles: [176, 183] };
}
// un sillar de piedra caliza en (x, y) de un paño que empieza en (x0, y0): juntas, manchas, luz a la izquierda
const c_sillar = (x, y, x0, y0, K, osc) => { const fila = ((y - y0) / 4) | 0, junta = (y - y0) % 4 === 3 || (x - x0 + fila * 4) % 8 === 0, q = h(x, y, 99); return junta ? (osc ? K.calD : K.calJ) : q < 0.07 ? (osc ? K.calD : K.calS) : q > 0.95 ? K.calL : osc ? K.calS : K.cal; };

// la torre del agua gótica: (cx, base) = centro de la base. Tres cuerpos con almenas y torrecillas, el fuste octogonal,
// la galería, la linterna y el chapitel de cobre verde
function c_torreAgua(R, cx, base) {
  const K = c_K, { rect, pset, linea, poligono } = R;
  const pano = (x0, y0, x1, y1, o = {}) => { rect(x0 - 1, y0 - 1, x1 + 1, y1, K.k); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, c_sillar(x, y, x0, y0, K, x > x1 - (o.s ?? Math.round((x1 - x0) * 0.22)))); rect(x0, y0, x0, y1, K.calL); };
  const almenas = (x0, x1, y) => { for (let x = x0; x <= x1 - 2; x += 5) { rect(x - 1, y - 4, x + 3, y, K.k); rect(x, y - 3, x + 2, y, K.cal); pset(x, y - 3, K.calL); pset(x + 2, y - 1, K.calS); } };
  const torrecilla = (x, y0, y1, w = 3) => { pano(x - w, y0, x + w, y1, { s: 2 }); rect(x - w - 2, y0 - 3, x + w + 2, y0, K.k); rect(x - w - 1, y0 - 2, x + w + 1, y0 - 1, K.calL); rect(x + 1, y0 - 2, x + w + 1, y0 - 1, K.calS); almenas(x - w - 1, x + w + 2, y0 - 3); rect(x, y0 + 5, x, y0 + 9, K.hueco); pset(x, y0 + 4, K.calD); };
  const ojiva = (x, y0, y1, w = 2) => { rect(x - w - 1, y0 + 1, x + w + 1, y1 + 1, K.calD); rect(x - w, y0 + 2, x + w, y1, K.hueco); rect(x - w + 1, y0, x + w - 1, y0 + 1, K.hueco); pset(x, y0 - 1, K.hueco); pset(x, y0 - 2, K.calD); rect(x, y0 + 2, x, y1, K.vidrioL); rect(x - w, y0 + ((y1 - y0) >> 1) + 1, x + w, y0 + ((y1 - y0) >> 1) + 1, K.calD); pset(x - w, y0 + 3, K.vidrio); };
  // el fuste octogonal (tres caras), con sus cordones y saeteras
  { const y0 = base - 104, y1 = base - 60; rect(cx - 12, y0 - 1, cx + 12, y1, K.k);
    for (let y = y0; y <= y1; y++) for (let x = cx - 11; x <= cx + 11; x++) { const cara = x < cx - 5 ? 0 : x > cx + 5 ? 2 : 1, junta = (y - y0) % 4 === 3 || (x + (((y - y0) / 4) | 0) * 3) % 6 === 0; pset(x, y, cara === 0 ? (junta ? K.cal : K.calL) : cara === 1 ? (junta ? K.calJ : K.cal) : (junta ? K.calD : K.calS)); }
    for (const yy of [y0 + 8, y0 + 24]) { rect(cx - 12, yy, cx + 12, yy + 1, K.calD); rect(cx - 12, yy, cx + 4, yy, K.calL); }
    ojiva(cx, y0 + 12, y0 + 20, 1); ojiva(cx, y0 + 29, y0 + 38, 1); rect(cx - 9, y0 + 14, cx - 9, y0 + 19, K.hueco); rect(cx + 9, y0 + 14, cx + 9, y0 + 19, K.hueco); rect(cx - 9, y0 + 31, cx - 9, y0 + 36, K.hueco); rect(cx + 9, y0 + 31, cx + 9, y0 + 36, K.hueco);
    // la galería con almenas, la linterna con arquitos y el chapitel
    rect(cx - 15, y0 - 5, cx + 15, y0 - 1, K.k); rect(cx - 14, y0 - 4, cx + 14, y0 - 2, K.calL); rect(cx + 6, y0 - 4, cx + 14, y0 - 2, K.calS); for (let x = cx - 13; x < cx + 14; x += 3) pset(x, y0 - 1, K.calD); almenas(cx - 14, cx + 15, y0 - 5);
    rect(cx - 8, y0 - 17, cx + 8, y0 - 6, K.k); rect(cx - 7, y0 - 16, cx + 7, y0 - 6, K.cal); rect(cx - 7, y0 - 16, cx - 5, y0 - 6, K.calL); rect(cx + 4, y0 - 16, cx + 7, y0 - 6, K.calS); for (const ax of [cx - 4, cx, cx + 4]) { rect(ax - 1, y0 - 13, ax + 1, y0 - 7, K.hueco); pset(ax, y0 - 14, K.hueco); } rect(cx - 9, y0 - 18, cx + 9, y0 - 17, K.k); rect(cx - 8, y0 - 18, cx + 8, y0 - 18, K.calL);
    poligono([[cx - 9, y0 - 18], [cx, y0 - 34], [cx + 9, y0 - 18]], K.k); poligono([[cx - 7, y0 - 19], [cx, y0 - 32], [cx + 7, y0 - 19]], K.cobre); poligono([[cx + 1, y0 - 19], [cx, y0 - 32], [cx + 7, y0 - 19]], K.cobreS); linea(cx - 5, y0 - 20, cx - 1, y0 - 29, K.cobreL); for (let y = y0 - 21; y > y0 - 30; y -= 3) pset(cx - 2 + ((y0 - y) >> 3), y, K.cobreS);
    linea(cx, y0 - 39, cx, y0 - 33, K.k); pset(cx, y0 - 40, K.oro); pset(cx - 1, y0 - 37, K.oro); pset(cx + 1, y0 - 37, K.oro); }
  // el segundo cuerpo, con sus torrecillas
  pano(cx - 24, base - 60, cx + 24, base - 40); almenas(cx - 24, cx + 25, base - 61); for (const x of [cx - 14, cx, cx + 14]) ojiva(x, base - 55, base - 45, 2);
  torrecilla(cx - 24, base - 68, base - 40); torrecilla(cx + 24, base - 68, base - 40);
  // el cuerpo bajo: la puerta ojival con escalones, ventanas, contrafuertes y cuatro torrecillas
  pano(cx - 38, base - 40, cx + 38, base); almenas(cx - 38, cx + 39, base - 41);
  rect(cx - 38, base - 22, cx + 38, base - 21, K.calD); rect(cx - 38, base - 22, cx + 20, base - 22, K.calL); rect(cx - 38, base - 3, cx + 38, base, K.calS); rect(cx - 38, base - 3, cx + 38, base - 3, K.calD);
  for (const x of [cx - 24, cx + 24]) { ojiva(x, base - 34, base - 25, 2); ojiva(x, base - 17, base - 6, 3); }
  torrecilla(cx - 38, base - 54, base); torrecilla(cx + 38, base - 54, base); torrecilla(cx - 11, base - 50, base, 2); torrecilla(cx + 11, base - 50, base, 2);
  { const y0 = base - 24; rect(cx - 7, y0 + 3, cx + 7, base, K.calD); rect(cx - 6, y0 + 1, cx + 6, y0 + 3, K.calD); rect(cx - 4, y0 - 1, cx + 4, y0 + 1, K.calD); rect(cx - 2, y0 - 3, cx + 2, y0 - 1, K.calD); pset(cx, y0 - 4, K.calD);
    rect(cx - 5, y0 + 4, cx + 5, base, K.maderaS); rect(cx - 4, y0 + 2, cx + 4, y0 + 4, K.maderaS); rect(cx - 2, y0, cx + 2, y0 + 2, K.maderaS); rect(cx, y0 + 1, cx, base, K.k); for (let y = y0 + 6; y < base; y += 4) { rect(cx - 5, y, cx + 5, y, K.madera); } rect(cx - 4, y0 + 5, cx - 1, y0 + 5, K.maderaL); pset(cx - 2, base - 9, K.oro); pset(cx + 2, base - 9, K.oro);
    rect(cx - 10, base - 1, cx + 10, base, K.calL); rect(cx - 12, base + 1, cx + 12, base + 1, K.cal); rect(cx - 10, base, cx + 10, base, K.calS);
    for (const fx of [cx - 9, cx + 9]) { rect(fx - 1, base - 16, fx + 1, base - 12, K.k); pset(fx, base - 14, K.luz); pset(fx, base - 17, K.k); } }
}

// lo fijo de la avenida: los edificios, el rascacielos de las aspas, la torre, la placita, el carrito y la calle
function c_torreFija(R, tarde) {
  const K = c_K, B = R.buf, { rect, pset, linea, disco } = R, luz = (x, y, p) => tarde && h(x, y, 100) < p;
  // lejos, entre los edificios: bloques en la bruma (llegan hasta x = 280: no queda hueco entre el rascacielos y el edificio bajo)
  for (let k = 0; k < 12; k++) { const x0 = 150 + k * 11, top = 78 + Math.round(h(k, 1, 101) * 22); c_edif(R, x0, x0 + 9, top, 140, hex('#9cb8d6'), hex('#8aa8ca'), hex('#b4cce4'), { d: 0.6, luz: tarde ? 0.3 : 0 }); }
  // el rascacielos de las aspas, detrás a la derecha
  for (let y = 0; y <= 140; y++) { const e = y / 140, x0 = Math.round(250 - e * 6), x1 = Math.round(272 + e * 4); rect(x0, y, x1, y, y % 4 === 0 ? K.hancockL : K.hancock); pset(x0, y, K.hancockL); if (y % 4 === 2) for (let x = x0 + 2; x < x1; x += 2) pset(x, y, luz(x, y, 0.35) ? K.luz : hex('#4a4856')); }
  for (let s = 0; s < 3; s++) { const y0 = 4 + s * 44, y1 = y0 + 44, e0 = y0 / 140, e1 = y1 / 140; linea(250 - e0 * 6, y0, 272 + e1 * 4, y1, hex('#7e7c8c')); linea(272 + e0 * 4, y0, 250 - e1 * 6, y1, hex('#7e7c8c')); rect(Math.round(250 - e1 * 6), y1, Math.round(272 + e1 * 4), y1, hex('#22202c')); }
  // el edificio bajo de la derecha (bajo Atom): piedra con escaparate y toldo
  { rect(279, 62, 319, 146, K.k); for (let y = 63; y <= 146; y++) for (let x = 280; x < 320; x++) pset(x, y, c_sillar(x, y, 280, 63, K, false) === K.calJ ? hex('#b4aca0') : h(x, y, 102) < 0.06 ? hex('#b4aca0') : hex('#cac2b4')); rect(280, 63, 319, 65, hex('#e0dad0')); rect(280, 66, 319, 66, hex('#9a9288'));
    for (let wy = 72; wy < 116; wy += 15) for (let wx = 285; wx < 316; wx += 12) { rect(wx - 1, wy - 1, wx + 7, wy + 10, hex('#9a9288')); rect(wx, wy, wx + 6, wy + 9, luz(wx, wy, 0.5) ? K.luz : K.vidrio); rect(wx, wy, wx + 6, wy + 1 + ((wx + wy) % 4), K.crema); rect(wx + 3, wy, wx + 3, wy + 9, hex('#9a9288')); rect(wx - 1, wy + 10, wx + 7, wy + 10, hex('#e0dad0')); }
    rect(282, 126, 317, 146, K.k); rect(283, 127, 316, 145, K.vidrioD); rect(283, 127, 316, 128, K.vidrioL); for (const mx of [290, 301, 311]) { rect(mx - 2, 134, mx + 2, 141, [K.rojo, K.azulL, K.amarillo][mx % 3]); rect(mx - 1, 131, mx + 1, 133, K.piel); rect(mx - 3, 142, mx + 3, 145, K.maderaL); }
    for (let x = 281; x < 320; x++) for (let j = 0; j < 6; j++) pset(x, 120 + j, j === 5 ? ((x >> 1) & 1 ? K.blanco : K.rojoS) : ((x - j) >> 2) & 1 ? K.rojo : K.blanco); rect(281, 119, 319, 119, K.k); }
  // los tres edificios de la izquierda: ladrillo con escalera de incendios, art déco de piedra y muro cortina de los sesenta
  { rect(0, 30, 52, 146, K.k); for (let y = 31; y <= 146; y++) for (let x = 0; x < 52; x++) { const fila = (y / 3) | 0, junta = y % 3 === 2 || (x + fila * 4) % 8 === 0; pset(x, y, junta ? K.ladrJ : h(x >> 3, fila, 103) < 0.2 ? K.ladrS : h(x, y, 104) < 0.05 ? K.ladrL : K.ladr); }
    rect(0, 31, 51, 34, K.calS); rect(0, 31, 51, 31, K.calL); for (let x = 1; x < 52; x += 4) rect(x, 35, x + 1, 36, K.calD);
    for (let wy = 42; wy < 112; wy += 18) for (let wx = 5; wx < 46; wx += 16) { rect(wx - 1, wy - 2, wx + 9, wy + 11, K.calS); rect(wx, wy, wx + 8, wy + 10, luz(wx, wy, 0.45) ? K.luz : K.vidrio); rect(wx, wy, wx + 8, wy + ((wx * 3 + wy) % 6), K.crema); rect(wx + 4, wy, wx + 4, wy + 10, K.calS); rect(wx, wy + 5, wx + 8, wy + 5, K.calS); rect(wx - 2, wy + 11, wx + 10, wy + 12, K.calL); pset(wx + 1, wy + 8, K.vidrioL);
      if ((wx + wy) % 5 === 0) { rect(wx + 1, wy + 7, wx + 7, wy + 10, K.grisL); rect(wx + 2, wy + 8, wx + 6, wy + 8, K.grisS); } }
    for (let wy = 54; wy < 112; wy += 18) { rect(18, wy, 34, wy, K.k); for (let x = 18; x <= 34; x += 2) pset(x, wy - 3, K.k), pset(x, wy - 2, K.k), pset(x, wy - 1, K.k); rect(18, wy - 4, 34, wy - 4, K.k); linea(20, wy, 32, wy + 14, K.k); }
    rect(0, 118, 51, 146, K.k); rect(1, 127, 50, 145, K.vidrioD); rect(1, 127, 50, 128, K.vidrioL); rect(22, 127, 32, 146, K.maderaS); rect(24, 129, 30, 140, tarde ? K.luz : K.vidrio); pset(31, 137, K.oro);
    for (const [fx, c] of [[6, K.amarillo], [12, K.rojo], [40, K.azulL], [45, hex('#e87ab0')]]) { rect(fx, 136, fx + 3, 143, c); rect(fx, 134, fx + 3, 135, K.crema); }
    for (let x = 0; x < 52; x++) for (let j = 0; j < 7; j++) pset(x, 119 + j, j === 6 ? ((x >> 1) & 1 ? K.blanco : hex('#2a6a4a')) : ((x + j) >> 2) & 1 ? hex('#3a8a5a') : K.blanco); }
  { rect(53, 22, 104, 146, K.k); for (let y = 23; y <= 146; y++) for (let x = 54; x < 104; x++) { const pil = (x - 54) % 10 < 3; pset(x, y, pil ? (h(x, y >> 2, 105) < 0.1 ? hex('#d8d0c0') : hex('#e8e2d4')) : (y % 12 === 4 ? hex('#a8a090') : hex('#c8c0b0'))); }
    for (let x = 54; x < 104; x += 10) { rect(x, 20, x + 2, 22, K.k); rect(x, 21, x + 2, 22, hex('#e8e2d4')); } rect(54, 23, 103, 24, hex('#f4f0e6'));
    for (let wy = 30; wy < 112; wy += 12) for (let wx = 58; wx < 100; wx += 10) { rect(wx, wy, wx + 5, wy + 7, luz(wx, wy, 0.4) ? K.luz : K.vidrio); rect(wx, wy, wx + 5, wy + ((wx + wy * 3) % 5), hex('#e8dcc0')); pset(wx + 1, wy + 6, K.vidrioL); rect(wx, wy + 8, wx + 5, wy + 8, hex('#f4f0e6')); }
    // el reloj de la esquina en su ménsula (las agujas se mueven) y el banco de abajo, con columnas y puerta giratoria
    rect(52, 106, 60, 118, K.k); rect(53, 107, 59, 117, hex('#3a6a5a')); disco(56, 112, 4, K.k); disco(56, 112, 3, K.crema);
    rect(54, 119, 103, 146, hex('#d8d0c0')); rect(54, 119, 103, 121, hex('#f4f0e6')); rect(54, 122, 103, 122, hex('#a8a090')); for (const px of [60, 74, 88, 98]) { rect(px, 123, px + 3, 146, hex('#f4f0e6')); rect(px + 3, 123, px + 3, 146, hex('#a8a090')); rect(px - 1, 123, px + 4, 124, hex('#e8e2d4')); rect(px - 1, 145, px + 4, 146, hex('#a8a090')); }
    rect(78, 128, 87, 146, K.k); rect(79, 129, 86, 146, tarde ? K.luz : K.vidrioL); rect(82, 129, 83, 146, K.oro); rect(79, 137, 86, 137, K.oro); rect(64, 128, 73, 140, K.vidrio); rect(64, 128, 73, 129, K.vidrioL); rect(92, 128, 97, 140, K.vidrio); }
  { rect(105, 36, 150, 146, K.k); for (let y = 37; y <= 146; y++) for (let x = 106; x < 150; x++) { const mont = (x - 106) % 6 === 0, ant = (y - 37) % 10 > 6; pset(x, y, mont ? K.metalL : ant ? (h(x, y, 106) < 0.2 ? hex('#3a8a8a') : hex('#4a9a9a')) : luz(x - (x - 106) % 6, y - (y - 37) % 10, 0.3) ? K.luz : c_um(x + ((y / 10) | 0) * 3, y) < 0.3 + 0.3 * Math.sin((x + y * 2) * 0.05) ? hex('#8ac0d8') : hex('#5a94b8')); }
    rect(106, 37, 149, 38, K.metalL); rect(106, 116, 149, 146, K.k); rect(107, 117, 148, 125, hex('#2a2a3a')); rect(107, 126, 148, 146, K.vidrioD); rect(107, 126, 148, 127, K.vidrioL); for (const mx of [116, 127, 138]) rect(mx, 126, mx, 146, K.metalL); rect(120, 132, 126, 146, tarde ? K.luz : hex('#4a6a7e')); rect(128, 132, 134, 146, tarde ? K.luz : hex('#4a6a7e'));
    for (let i = 0; i < 10; i++) rect(109 + i * 4, 120, 110 + i * 4, 122, K.rojoS); }
  // la placita: seto, flores, bancos y farolas; la torre
  for (let y = 138; y < 146; y++) for (let x = 151; x < 279; x++) pset(x, y, y < 140 ? ((x + y) & 1 ? K.cS : K.c0) : h(x, y, 107) < 0.08 ? K.cL : ((x >> 2) + y) & 1 ? K.c0 : K.c1);
  for (let x = 151; x < 279; x++) { const yt = 134 - Math.round(h(x >> 1, 1, 108) * 2); if (Math.abs(x - 196) < 46) continue; for (let y = yt; y < 140; y++) pset(x, y, y === yt ? K.hojaL : h(x, y, 109) < 0.25 ? K.hojaD : K.hojaS); if (x % 4 === 0) pset(x, yt + 2, [K.rojo, K.amarillo, K.blanco][(x >> 2) % 3]); }
  c_torreAgua(R, 196, 146);
  for (let x = 152; x < 278; x += 3) { if (Math.abs(x - 196) < 14) continue; pset(x, 144, [K.rojo, K.amarillo, hex('#e87ab0'), K.blanco][(x / 3 | 0) % 4]); pset(x, 145, K.cD); }
  c_farola(R, 170, 122, 146, tarde); c_farola(R, 222, 122, 146, tarde);
  c_calleFija(R, 146);
  // el semáforo, el buzón azul, la boca de riego, las cajas de periódicos y el carrito de perritos con su sombrilla
  rect(4, 100, 6, 153, K.k); rect(5, 100, 5, 152, K.metalD); rect(7, 110, 13, 126, K.k); rect(8, 111, 12, 125, hex('#3a3a2a'));
  rect(26, 139, 36, 152, K.k); rect(27, 140, 35, 151, K.azul); rect(27, 140, 35, 141, K.azulL); rect(28, 144, 34, 144, K.k); rect(33, 140, 35, 151, hex('#2a4a98')); rect(27, 152, 28, 153, K.k); rect(34, 152, 35, 153, K.k);
  rect(268, 145, 272, 152, K.k); rect(269, 146, 271, 151, K.rojo); pset(269, 146, hex('#f08a7a')); rect(267, 148, 273, 149, K.k); pset(270, 148, K.metalL); rect(269, 144, 271, 144, K.k);
  for (const [nx, c] of [[296, K.rojo], [305, K.amarillo], [314, K.azul]]) { rect(nx - 4, 140, nx + 3, 152, K.k); rect(nx - 3, 141, nx + 2, 151, c); rect(nx - 2, 143, nx + 1, 146, K.crema); rect(nx - 2, 144, nx + 1, 144, K.grisS); pset(nx + 1, 148, K.metalL); }
  { const x = 70; for (let j = 0; j < 6; j++) { const w = 3 + j * 2; for (let i = -w; i <= w; i++) pset(x + 6 + i, 120 + j, ((i + 40) >> 2) & 1 ? K.rojo : K.amarillo); pset(x + 6 - w - 1, 120 + j, K.k); pset(x + 6 + w + 1, 120 + j, K.k); } rect(x - 8, 126, x + 20, 126, K.k); rect(x + 6, 127, x + 6, 138, K.metalD);
    rect(x - 4, 137, x + 18, 149, K.k); rect(x - 3, 138, x + 17, 148, K.metalL); rect(x - 3, 138, x + 17, 139, K.blanco); rect(x - 3, 145, x + 17, 148, K.metal); rect(x, 141, x + 6, 144, K.rojo); rect(x + 9, 141, x + 15, 144, K.amarillo); rect(x + 1, 142, x + 5, 142, K.maderaL); disco(x, 150, 3, K.k); disco(x, 150, 1, K.metalL); disco(x + 14, 150, 3, K.k); disco(x + 14, 150, 1, K.metalL); rect(x + 12, 134, x + 15, 137, K.metalD);
    c_gente(R, x - 9, 150, 5, 0, 1, { quieto: true }); rect(x - 9, 142, x - 7, 146, K.blanco); rect(x - 9, 139, x - 7, 139, K.blanco); }
  if (tarde) c_atardece(R);
}
// la estatua de bronce: un hombre alto con levita, de pie, la cabeza algo inclinada y la mano en la solapa (17 × 38)
const c_ESTATUA = ['......kkkkk......', '.....kSSSSSk.....', '.....kSbbbSk.....', '.....kLbbbSk.....', '.....kLbbSSk.....', '.....kbbbSSk.....', '.....kbSSSSk.....', '......kSSSk......', '....kkkbbSkkk....', '...kLLbbLbbSSk...',
  '..kLLbbbLbbbSSk..', '..kLbbbbLSbbSSk..', '..kLbbbLLSbbbSk..', '..kLbbLLbSbbbSk..', '..kLbbLLbSbbbSk..', '..kLbbbbbSbbbSk..', '..kLbbbbbSbbbSk..', '..kLbbbbbSbbSSk..', '..kLbbbbbSbbSSk..', '...kLbbbbSbbSk...', '...kLbbbbSbbSk...', '...kLbbbbbbbSk...',
  '...kLbbbbbbbSk...', '...kLbbbbbbSSk...', '..kLbbbbbbbbSSk..', '..kLbbbbbbbbSSk..', '..kLbbbbbbbbSSk..', '..kSSSSSSSSSSSk..', '...kLbbSkkbbSk...', '...kLbbSkkbbSk...', '...kLbbSkkbbSk...', '...kLbbSkkbbSk...', '...kLbbSkkbbSk...', '...kLbbSkkbbSk...', '...kLbbSkkbbSk...',
  '...kLbbSkkbbSk...', '..kLbbbSkkbbbSk..', '..kkkkkkkkkkkkk..'];

const c_VENT = [40, 103, 166], c_MED = [[72, 72], [135, 72]];

function c_sala(R, t, o) {
  const K = c_K, tarde = o.hora === 'tarde', Rv = tarde ? c_vivo(R) : R, { rect, pset, linea } = Rv, B = R.buf;
  c_cielo(R, t, { hor: 132, modo: tarde ? 'tarde' : 'dia', sol: tarde ? [244, 104, 9] : [240, 26, 7], estela: null, cumulos: 6 });
  c_pega(R, c_fijo(R, 'sala' + tarde, () => c_salaFija(R, tarde)), 0);
  // las nubes que se reflejan en los ventanales (solo sobre el vidrio)
  if (!tarde) for (let k = 0; k < 4; k++) { const cx = Math.round(((t * 5 + k * 62) % 250) - 22), cy = 58 + k * 12; for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) { const x = cx + i, y = cy + j; if (x < 0 || x > 205 || (i / 14) ** 2 + (j / 3) ** 2 >= 1) continue; const q = B[y * 320 + x]; if (q === K.vidrio) B[y * 320 + x] = j < 0 ? K.vidrioL : hex('#4a7088'); } }
  // las bombillas de la marquesina que corren, y los faroles de las puertas
  for (let i = 0; i < 13; i++) { const on = (i + Math.floor(t * 4)) % 3 === 0; R.pset(79 + i * 4, 118, on ? K.luzL : hex('#a87830')); if (on) R.pset(79 + i * 4, 119, K.luz); }
  for (const fx of [21, 59, 147, 185]) { const p = Math.sin(t * 9 + fx) > 0.92 ? K.luz : K.luzL; R.rect(fx, 127, fx + 1, 129, p); }
  // el vestíbulo: gente que cruza por dentro de la puerta del centro (recortada a su hueco)
  { R.recorte([94, 126, 112, 147]); const u = (t * 0.22) % 1, x = Math.round(88 + u * 30); c_gente(Rv, x, 147, 3, t, 1); c_gente(Rv, 124 - Math.round(((t * 0.17 + 0.5) % 1) * 36), 146, 6, t, -1); R.recorte(null); }
  // la banderola de la farola, las palomas de la plaza y del pedestal, hojas, y la gente lejana de la plaza
  for (const [px, py, k] of [[246, 145, 0], [282, 145, 1], [272, 91, 2], [232, 150, 3]]) c_paloma(Rv, px + (k === 3 ? Math.round(Math.sin(t * 0.7) * 4) : 0), py, t, k, k % 2 ? 1 : -1);
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, u = (t * (4 + k) + k * 77) % 160, x = Math.round(d > 0 ? 222 + u : 330 - u); if (Math.abs(x - 262) < 26) continue; c_gente(Rv, x, 140, k + 4, t, d); }
  c_arbol(Rv, 235, 138, 34, 9, t, { sem: 12 }); c_arbol(Rv, 306, 142, 60, 18, t, { sem: 14 });
  c_banderola(Rv, t, 216, 104);
  for (let k = 0; k < 4; k++) { const u = (t * 0.14 + k / 4) % 1; pset(Math.round(222 + h(k, 1, 110) * 90 + Math.sin(t * 2 + k) * 4), Math.round(84 + u * 60), k % 2 ? K.hojaL : K.amarillo); }
  // un músico que pasa por la acera del fondo con la funda del violonchelo
  { const u = (t * 7 + 60) % 460, x = Math.round(380 - u); c_gente(Rv, x, 150, 7, t, -1); rect(x + 4, 141, x + 7, 150, K.k); rect(x + 5, 143, x + 6, 149, hex('#5a3a2a')); rect(x + 5, 139, x + 5, 141, K.k); }
  c_calleViva(Rv, t);
  return { suelo: 153, medallones: c_MED.map(([x, y]) => [x, y]), ventanales: c_VENT.map((x) => [x, 76]), puertas: c_VENT.map((x) => [x, 148]), estatua: [262, 146], figura: [262, 72, 111], pedestal: [245, 111, 279, 146], farola: [214, 150], acera: [148, 156], carriles: [176, 183] };
}
// lo fijo de la sala: la plaza con la estatua y la fachada de ladrillo con sus ventanales, medallones, friso y puertas
function c_salaFija(R, tarde) {
  const K = c_K, B = R.buf, { rect, pset, linea, disco } = R;
  // ── la plaza de la derecha: edificios en la bruma, arboleda, seto, la exedra de piedra y el pavimento
  for (let k = 0; k < 10; k++) { const x0 = 206 + k * 12, top = 70 + Math.round(h(k, 1, 111) * 26); c_edif(R, x0, x0 + 10, top, 130, hex('#9cb8d6'), hex('#8aa8ca'), hex('#b4cce4'), { d: 0.6, luz: tarde ? 0.3 : 0 }); }
  for (let x = 206; x < 320; x++) { const yt = (Math.abs(x - 262) < 26 ? 118 : 112) - Math.round(4 + 3 * Math.sin(x * 0.17) + 2 * Math.sin(x * 0.06 + 1) + h(x >> 1, 3, 112) * 2); for (let y = yt; y < 132; y++) B[y * 320 + x] = y === yt ? K.hojaL2 : h(x, y, 62) < 0.22 ? K.hojaD : y - yt < 4 ? K.hoja2 : K.hojaS; }
  for (let y = 130; y < 148; y++) for (let x = 206; x < 320; x++) { const d = Math.hypot((x - 263) / 2.6, y - 150); let c; if (d < 17) { const a = Math.atan2(y - 150, x - 263); c = Math.abs(d % 5 - 2.5) < 0.6 || Math.abs((a * 9) % 1) < 0.12 ? K.losaS : h(x, y, 113) < 0.1 ? K.losaL : K.losa; } else { const q = h(x, y, 66); c = ((x >> 3) + (y >> 1)) & 1 ? K.c1 : K.c0; if (q < 0.05) c = K.cL; else if (q > 0.95) c = K.cS; if (y < 132) c = (x + y) & 1 ? K.cS : K.cD; } B[y * 320 + x] = c; }
  // la exedra: el banco curvo de piedra detrás de la estatua
  for (let x = 236; x <= 290; x++) { const u = (x - 263) / 27, yy = Math.round(132 + u * u * 5); rect(x, yy - 7, x, yy, x % 9 === 0 ? K.granitoS : K.granito); pset(x, yy - 8, K.k); pset(x, yy - 7, K.granitoL); pset(x, yy - 3, K.granitoS); pset(x, yy + 1, K.k); } rect(235, 128, 236, 138, K.k); rect(290, 128, 291, 138, K.k);
  // el pedestal de granito con su placa (rayas) y la corona de flores; la estatua de bronce: un hombre alto con levita, de
  // pie, con la cabeza algo inclinada y una mano en la solapa, delante de su silla
  { const cx = 262; rect(cx - 22, 143, cx + 22, 146, K.k); rect(cx - 21, 143, cx + 21, 145, K.granitoL); rect(cx - 21, 145, cx + 21, 145, K.granitoS); rect(cx - 17, 111, cx + 17, 143, K.k);
    for (let y = 112; y <= 142; y++) for (let x = cx - 16; x <= cx + 16; x++) pset(x, y, x > cx + 10 ? K.granitoS : h(x, y, 114) < 0.12 ? K.granitoL : h(x, y, 115) < 0.08 ? K.granitoS : K.granito);
    rect(cx - 19, 110, cx + 19, 113, K.k); rect(cx - 18, 111, cx + 18, 112, K.granitoL); rect(cx - 16, 140, cx + 16, 142, K.granitoS); rect(cx - 16, 139, cx + 16, 139, K.granitoL); rect(cx - 10, 119, cx + 9, 130, hex('#5a4a2a')); rect(cx - 9, 120, cx + 8, 129, hex('#8a7a3a')); for (let y = 122; y <= 127; y += 2) rect(cx - 7, y, cx + (y === 124 ? 2 : 6), y, hex('#d8c46a'));
    for (let a = 0; a < 6.3; a += 0.4) pset(Math.round(cx - 11 + Math.cos(a) * 3), Math.round(137 + Math.sin(a) * 3), a % 0.8 < 0.4 ? K.hojaS : K.rojo);
    const b = K.bronce, bL = K.bronceL, bS = K.bronceS;
    // la silla, detrás y más baja, para que el busto se recorte contra el cielo
    rect(cx + 6, 91, cx + 15, 110, K.k); rect(cx + 7, 92, cx + 14, 109, bS); rect(cx + 12, 92, cx + 14, 109, hex('#22342c')); rect(cx + 7, 92, cx + 14, 93, b); rect(cx + 7, 100, cx + 14, 101, K.k); pset(cx + 7, 90, K.k); pset(cx + 14, 90, K.k); rect(cx + 7, 102, cx + 8, 109, b);
    // el hombre, píxel a píxel: k contorno, b bronce, L luz, S sombra
    c_ESTATUA.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) { const ch = fila[i]; if (ch !== '.') pset(cx - 8 + i, 73 + j, ch === 'k' ? K.k : ch === 'L' ? bL : ch === 'S' ? bS : b); } }); }
  for (const bx of [222, 284]) c_banco(R, bx, 147);
  // ── la fachada: ladrillo en aparejo con manchas, tranquilo arriba (el año)
  for (let y = 0; y < 112; y++) for (let x = 0; x <= 205; x++) { const fila = (y / 3) | 0, junta = y % 3 === 2 || (x + fila * 4) % 8 === 0, q = h((x + fila * 4) >> 3, fila, 116); B[y * 320 + x] = junta ? K.ladrJ : y < 22 ? K.ladr : q < 0.16 ? K.ladrS : q > 0.9 ? K.ladrL : K.ladr; }
  for (let y = 0; y < 148; y++) { for (let x = 200; x <= 205; x++) B[y * 320 + x] = ((y / 6) | 0) % 2 ? (x > 203 ? K.calS : K.cal) : (x < 202 ? K.ladrD : x > 203 ? K.calS : K.calL); B[y * 320 + 206] = K.k; }
  // la cornisa con dentículos y el friso con tres cartelas grabadas (rayas, sin letras)
  rect(0, 22, 205, 30, K.k); rect(0, 23, 205, 25, K.calL); rect(0, 26, 205, 29, K.cal); rect(0, 29, 205, 29, K.calS); for (let x = 1; x < 205; x += 4) rect(x, 27, x + 1, 28, K.calD);
  rect(0, 31, 199, 41, K.cal); rect(0, 31, 199, 31, K.calD); rect(0, 41, 199, 41, K.calD); for (let x = 0; x < 200; x++) if (h(x, 3, 117) < 0.2) pset(x, 33 + (x % 7), K.calJ);
  for (const cx of c_VENT) { rect(cx - 22, 33, cx + 22, 39, K.calD); rect(cx - 21, 34, cx + 21, 38, K.calL); for (let i = -16; i <= 14; i += 5) rect(cx + i, 35, cx + i + 2 + (((i + 20) / 5) & 1), 36, K.calD); pset(cx - 19, 35, K.calD); pset(cx + 19, 36, K.calD); }
  // los tres ventanales en arco: marco de piedra con clave, vidrio con montantes y abanico, y balaustrada
  for (const cx of c_VENT) {
    for (let y = 44; y <= 104; y++) for (let x = cx - 19; x <= cx + 19; x++) { const dx = x - cx, dy = y - 62, d = Math.hypot(dx, dy), ar = y < 62; const fuera = ar ? d > 18.5 : Math.abs(dx) > 18; if (fuera) continue;
      const marco = ar ? d > 14.5 : Math.abs(dx) > 14; let c;
      if (marco) { const a = Math.atan2(-dy, dx); c = (ar ? d > 17.6 : Math.abs(dx) === 18) ? K.k : ar ? (Math.abs(((a / 0.262) % 1 + 1) % 1) < 0.14 ? K.calD : dx > 6 ? K.calS : K.calL) : ((y % 7 === 0) ? K.calD : dx > 0 ? K.calS : K.calL); }
      else { const a = Math.atan2(-dy, dx); c = ar ? (d > 13.6 || Math.abs(d - 6) < 0.6 || Math.abs((((a + 0.01) / 0.5236) % 1 + 1) % 1) < 0.1 && d > 6 ? (tarde ? K.calD : K.crema) : tarde ? K.luz : K.vidrio) : (Math.abs(dx) === 14 || dx === 0 || Math.abs(dx) === 7 || y === 62 || y === 63 || y === 83 ? (tarde ? K.calD : K.crema) : tarde ? (h(x >> 2, y >> 3, 118) < 0.3 ? K.luzL : K.luz) : K.vidrio);
        if (!tarde && c === K.vidrio && y > 90 && h(x >> 1, y, 119) < 0.5) c = K.vidrioD; if (c !== K.crema && c !== K.calD && y > 84 && Math.abs(dx) < 13 && ((dx + 14) % 7 < 5) && y < 88 + (Math.abs(dx) % 7)) c = hex('#8a2a3a'); }
      B[y * 320 + x] = c; }
    rect(cx - 3, 42, cx + 3, 48, K.k); rect(cx - 2, 43, cx + 2, 47, K.calL); rect(cx + 1, 43, cx + 2, 47, K.calS);
    rect(cx - 21, 104, cx + 21, 106, K.k); rect(cx - 20, 104, cx + 20, 105, K.calL); for (let x = cx - 19; x <= cx + 19; x += 3) { rect(x, 106, x + 1, 110, K.cal); pset(x + 1, 108, K.calS); pset(x - 1, 107, K.ladrD); } rect(cx - 21, 110, cx + 21, 111, K.calS); }
  // LOS DOS MEDALLONES: corona de laurel de piedra, fondo azul y la nota dorada; debajo, su placa de rayas, y encima, una guirnalda
  c_MED.forEach(([mx, my], k) => {
    for (let j = -13; j <= 13; j++) for (let i = -13; i <= 13; i++) { const d = Math.hypot(i, j); if (d > 13) continue; const a = Math.atan2(j, i); pset(mx + i, my + j, d > 12 ? K.k : d > 9 ? (Math.abs(((a / 0.3927) % 1 + 1) % 1 - 0.5) < 0.2 ? K.calD : (i + j < 0 ? K.calL : K.cal)) : d > 8.2 ? K.k : hex(i + j < -6 ? '#34588a' : '#274670')); }
    c_picto(R, k ? c_NOTA2 : c_NOTA1, mx - (k ? 4 : 3) + 1, my - 4, hex('#8a6a1a')); c_picto(R, k ? c_NOTA2 : c_NOTA1, mx - (k ? 4 : 3), my - 5, K.oro); pset(mx - (k ? 4 : 2), my + 3, K.amarilloL);
    rect(mx - 13, my + 18, mx + 13, my + 26, K.k); rect(mx - 12, my + 19, mx + 12, my + 25, K.calL); rect(mx - 12, my + 25, mx + 12, my + 25, K.calS); rect(mx - 9, my + 21, mx + 3, my + 21, K.calD); rect(mx + 5, my + 21, mx + 9, my + 21, K.calD); rect(mx - 7, my + 23, mx + 6, my + 23, K.calD);
    for (let i = -11; i <= 11; i++) { const yy = my - 21 + Math.round((1 - (i / 11) ** 2) * 4); pset(mx + i, yy, i % 3 ? K.cal : K.calL); pset(mx + i, yy + 1, K.calD); } rect(mx - 12, my - 23, mx - 11, my - 20, K.calL); rect(mx + 11, my - 23, mx + 12, my - 20, K.calL); });
  // el piso bajo de piedra almohadillada, con las tres puertas en arco, los carteles y la marquesina de hierro y vidrio
  for (let y = 112; y < 148; y++) for (let x = 0; x <= 199; x++) { const banda = (y - 112) % 6 === 5, q = h(x, y, 120); B[y * 320 + x] = y === 112 ? K.calL : y === 113 ? K.calD : banda ? K.calD : (x + (((y - 112) / 6) | 0) * 11) % 22 === 0 ? K.calJ : q < 0.06 ? K.calS : q > 0.96 ? K.calL : K.cal; }
  rect(0, 144, 199, 147, K.calS); rect(0, 144, 199, 144, K.calD);
  c_VENT.forEach((cx, k) => {
    for (let y = 119; y < 148; y++) for (let x = cx - 14; x <= cx + 14; x++) { const dx = x - cx, dy = y - 131, d = Math.hypot(dx, dy), ar = y < 131; if (ar ? d > 13.5 : Math.abs(dx) > 13) continue; const marco = ar ? d > 11 : Math.abs(dx) > 11; let c;
      if (marco) c = (ar ? d > 12.6 : Math.abs(dx) === 13) ? K.k : dx > 0 ? K.calS : K.calL;
      else if (k === 1) c = y > 143 ? hex('#a02a3a') : y < 128 ? K.luzL : h(x >> 1, y >> 2, 121) < 0.25 ? hex('#e8b050') : K.luz;   // la del centro, abierta: el vestíbulo
      else c = ar ? (Math.abs(dx) < 1 || d > 10 ? K.maderaS : K.luz) : dx === 0 || Math.abs(dx) === 11 ? K.k : y > 140 ? K.maderaS : (Math.abs(dx) > 2 && Math.abs(dx) < 9 && y > 133 && y < 139) ? K.luz : y === 131 ? K.maderaS : K.madera;
      B[y * 320 + x] = c; }
    if (k === 1) { rect(cx - 2, 123, cx + 2, 125, K.oro); pset(cx, 122, K.oro); pset(cx - 3, 126, K.luzL); pset(cx + 3, 126, K.luzL); pset(cx, 127, K.blanco); } else { pset(cx - 2, 137, K.oro); pset(cx + 2, 137, K.oro); } });
  for (const fx of [21, 59, 147, 185]) { rect(fx - 1, 124, fx + 2, 131, K.k); rect(fx, 126, fx + 1, 130, K.luzL); rect(fx - 1, 132, fx + 2, 132, K.k); }
  for (const [px, c, nota] of [[66, hex('#2a4a7a'), 0], [130, hex('#7a2a3a'), 1]]) { rect(px, 122, px + 13, 142, K.k); rect(px + 1, 123, px + 12, 141, K.oro); rect(px + 2, 124, px + 11, 140, c); c_picto(R, nota ? c_NOTA2.map((f) => f.slice(1)) : c_NOTA1, px + (nota ? 3 : 4), 125, K.crema); rect(px + 3, 137, px + 10, 137, K.crema); rect(px + 4, 139, px + 8, 139, K.grisL); }
  // la marquesina sobre la puerta del centro
  rect(76, 112, 130, 117, K.k); rect(77, 113, 129, 114, hex('#3a5a4a')); rect(77, 115, 129, 116, hex('#2a3a3a')); for (let x = 78; x < 129; x += 6) rect(x, 113, x + 3, 113, hex('#8ab0a0')); for (const tx of [80, 126]) linea(tx, 112, tx + (tx < 100 ? -6 : 6), 100, K.k);
  // la bajante, un aparato de aire y manchas de la fachada
  rect(4, 26, 5, 147, hex('#5a6a5a')); for (let y = 30; y < 147; y += 16) rect(3, y, 6, y, K.k);
  c_calleFija(R, 148);
  // la farola doble con su banderola, la boca de riego y un cubo de basura
  rect(213, 96, 214, 152, K.k); rect(212, 151, 215, 153, K.k); rect(208, 98, 219, 98, K.k); for (const gx of [208, 219]) { disco(gx, 95, 3, K.k); disco(gx, 95, 2, tarde ? K.luzL : hex('#e4ecec')); pset(gx - 1, 94, K.blanco); } rect(214, 102, 230, 103, K.k); pset(231, 102, K.oro); pset(231, 103, K.k);
  rect(190, 146, 194, 152, K.k); rect(191, 147, 193, 151, K.rojo); pset(191, 147, hex('#f08a7a')); rect(189, 149, 195, 149, K.k);
  rect(8, 141, 16, 152, K.k); rect(9, 142, 15, 151, K.metal); for (let x = 10; x < 15; x += 2) rect(x, 143, x, 150, K.metalD); rect(8, 140, 16, 141, K.metalD);
  if (tarde) c_atardece(R);
}
// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const d_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_um = (x, y) => d_BAY[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function d_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la paleta de los decorados de Cleveland
const d_P = pal({
  k: '#1c1222', bl: '#f6f2ea',
  // la piedra del muro y de las columnas, las losas y la grava
  m0: '#d9d2c0', m0b: '#d0c8b4', m1: '#c2b9a4', m2: '#eee8d8', m3: '#a2998a', m4: '#7e7668', musgo: '#8aa45e', musgoS: '#64804a',
  l0: '#c9c2b2', l0b: '#bdb6a6', l1: '#a59e90', l2: '#ddd7c8', g0: '#d8c8a4', g1: '#bfad86', g2: '#eadec2',
  // los verdes de la arboleda, los cipreses, el césped y la hiedra
  vd: '#1f4a34', v0: '#2f6b3a', v1: '#3f8a46', v2: '#5aa852', v3: '#8cd06a', vj0: '#4a8a3a', vj1: '#6aae48', vj2: '#9ad464', vj3: '#c8ec8a',
  cip: '#234f3a', cipS: '#173828', cipL: '#3a6e4c', c0: '#58a244', c1: '#66b24e', cS: '#3f8038', cL: '#92d468', cD: '#2e6630',
  // los cerezos en flor
  r0: '#c8648e', r1: '#ec98b8', r2: '#ffc8dc', r3: '#fff0f4', b0: '#cfc6dc', b1: '#ece6f2', b2: '#ffffff',
  // la tierra removida
  t0: '#7a5434', t1: '#5a3a24', t2: '#9c7248', t3: '#3a2416', t4: '#b08a5c',
  // el agua del estanque
  a0: '#2a648e', a1: '#3a80ae', a2: '#5ca2c8', a3: '#b4e0f0', aS: '#1f4c72',
  // lo lejano y el cielo
  lej: '#a8c2dc', lejS: '#94b2d0', lejL: '#c2d8ea', ave: '#2a2436', tronco: '#6a4a34', troncoS: '#4a3224',
  // tulipanes y flores
  f0: '#e03a4a', f1: '#f0c838', f2: '#f088b0', f3: '#f8f4ec', f4: '#9a5ad8', f5: '#f08a3a',
  oro: '#e8b830', oroL: '#fff0a0', oroS: '#a87a18', laton: '#c89a3a', latonL: '#f0d070', latonS: '#8a6420',
  // interiores: madera, paredes, suelos
  w0: '#8a5a34', wS: '#6a4226', wL: '#b07c48', wLL: '#cc9a62', wD: '#3e2616', wDD: '#2a1a10',
  pa0: '#d6d8c2', pa1: '#c8ccb4', pa2: '#e4e6d4', paS: '#b0b69e',
  pq0: '#b98450', pq1: '#a87242', pq2: '#c8965e', pqS: '#8a5a32', pqL: '#e2b47a',
  al0: '#8e2f3a', al1: '#74222e', al2: '#b04a4a', alO: '#d8b060', alA: '#2e4a6e',
  be0: '#d8d0b8', be1: '#b8b098', be2: '#ece6d2', beS: '#9a927c', crt: '#18343a', crtL: '#2a5a5e',
  vp0: '#2e5a48', vp1: '#356650', vp2: '#28503e', mo0: '#b8ae98', mo1: '#a89e88', mo2: '#c8c0ac',
  lam: '#2e8a5a', lamL: '#5ac88a', lamS: '#1c5e3c', luz: '#fff0b0', piel: '#f0c090', pielS: '#c89468',
  cu0: '#5e3a2a', cu1: '#44281c', cu2: '#7a5038', gr0: '#8c8ca0', gr1: '#6c6c80', gr2: '#b0b4c4', gr3: '#4a4c5e',
  corcho: '#c89a62', corchoS: '#a87a48', mapa: '#e8e0c4', mapaS: '#cfc4a0', mapaA: '#8ac0dc', mapaV: '#a8cc8a', rojo: '#d83a3a', azul: '#3a6ac8',
  ci1: '#4aa6ea', ci2: '#74bef2', ci3: '#a8daf4', ci4: '#d0e8ee', ld0: '#a85440', ld1: '#8a3e30', ld2: '#c06a52',
});

// las bandas del cielo de mayo, de arriba abajo: [fracción de la altura, color], y los tres tonos de las nubes
const d_CIE = [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']].map(([f, c]) => [f, hex(c)]);

const d_NUB = ['#a8d6f2', '#d2ecfc', '#ffffff'].map(hex);

// fondo fijo: se pinta una vez en un búfer propio (lo que queda a 0 es transparente) y se guarda por lienzo y clave
const d_CACHE = new WeakMap();

function d_fijo(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// pega un fondo fijo: por encima de yT respeta lo ya pintado donde el búfer es transparente; de yT abajo, copia tal cual
function d_pegar(R, b, yT = 0) { const B = R.buf, n = yT * 320; for (let i = 0; i < n; i++) { const c = b[i]; if (c) B[i] = c; } B.set(b.subarray(n), n); }

// rellena un rectángulo con el color que da f(x, y) (0: no pinta), escribiendo en el búfer
function d_tex(R, x0, y0, x1, y1, f) { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const c = f(x, y); if (c) B[y * 320 + x] = c; } }

// rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function d_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// cifras diminutas de 3 × 5 (solo dígitos); devuelve el ancho pintado
const d_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function d_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = d_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana
function d_nube(R, cx, cy, w, sem, c = d_NUB) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08), xa = Math.round(cx - w * 0.47), xb = Math.round(cx + w * 0.47); R.linea(xa, y0, xb, y0, c[0]); R.linea(xa, y0 + 1, xb, y0 + 1, c[0]); R.linea(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);   // con linea, que respeta el recorte
}

// el cielo de día hasta hor: bandas con transición tramada, el sol con su halo, cirros casi quietos y cúmulos lejanos
// (lentos) y cercanos (más rápidos); los cirros no entran en la esquina de Atom. o.sol [x, y, r] o null; o.cumulos
function d_cielo(R, t, hor, o = {}) {
  const B = R.buf, P = d_CIE, tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = d_um(x, y) < p ? b : a;
  }
  const sol = o.sol === undefined ? [226, 24, 8] : o.sol;
  if (sol) { const [sx, sy, sr] = sol, R2 = sr + 10;
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) { const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (d_um(x, y) < q * q) B[y * 320 + x] = d_mez(B[y * 320 + x], 0xffdcf8ff, 0.42); } }
  const atom = (x, y) => x > 268 && y < 50;
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(17, Math.round(hor * (0.2 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || y >= hor - 1 || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      R.pset(x, y, e > 0.35 ? d_NUB[1] : d_NUB[0]); if (e > 0.6 && i % 4) R.pset(x + 3, y - 1, d_NUB[2]); if (e > 0.5 && i % 5 === 0) R.pset(x - 4, y + 1, d_NUB[0]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(30, hor * 0.36) + k * hor * 0.13 : Math.max(26, hor * (0.5 + (k - 2) * 0.1))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    d_nube(R, Math.round(x), y, w, k); }
  if (sol) { const [sx, sy, sr] = sol; R.disco(sx, sy, sr + 1, hex('#ffe28a')); R.disco(sx, sy, sr, hex('#fff4c8')); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }
}

// la copa de un árbol: racimo de bolas en cuatro tonos c = [sombra, cuerpo, luz, brillo], con la luz arriba a la izquierda
function d_copa(R, cx, cy, r, c, sem) {
  const L = [], n = 6 + Math.round(r / 3);
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + h(i, sem, 31), d = r * (0.35 + 0.3 * h(i, sem, 32)); L.push([cx + Math.cos(a) * d * 1.15, cy + Math.sin(a) * d * 0.8, r * (0.42 + 0.2 * h(i, sem, 33))]); }
  L.push([cx, cy, r * 0.6]);
  for (const [x, y, q] of L) R.disco(Math.round(x + 1), Math.round(y + 2), Math.round(q), c[0]);
  for (const [x, y, q] of L) R.disco(Math.round(x), Math.round(y), Math.round(q), c[1]);
  for (const [x, y, q] of L) R.disco(Math.round(x - q * 0.3), Math.round(y - q * 0.35), Math.round(q * 0.55), c[2]);
  for (let k = 0; k < r * 4; k++) { const a = h(k, sem, 34) * 6.283, d = Math.sqrt(h(k, sem, 35)) * r * 0.95, x = Math.round(cx + Math.cos(a) * d * 1.1), y = Math.round(cy + Math.sin(a) * d * 0.8); R.pset(x, y, Math.cos(a) + Math.sin(a) < -0.3 ? c[3] : k % 3 ? c[0] : c[2]); }
}

// un ciprés: huso alto y estrecho con la luz a la izquierda, sombra a la derecha y mechones
function d_cipres(R, x, base, alto, w) {
  for (let j = 0; j <= alto; j++) { const u = j / alto, a = Math.max(0, Math.round(w * Math.sin(Math.min(1, u * 1.25) * Math.PI * 0.55) ** 0.8 * (u < 0.1 ? u * 10 : 1) + (h(j, x, 36) - 0.5)));
    for (let i = -a; i <= a; i++) { const q = h(x + i, j, 37); R.pset(x + i, base - alto + j, i < -a * 0.3 ? (q < 0.3 ? d_P.cipL : d_P.cip) : i > a * 0.35 ? d_P.cipS : q < 0.2 ? d_P.cipS : d_P.cip); } }
  R.rect(x, base - 2, x, base, d_P.troncoS);
}

// sillares: bloques de bw × bh con las juntas trabadas, el filo de luz arriba, motas y algún bloque de otro tono
function d_sillares(R, x0, y0, x1, y1, bw, bh, k = 0) {
  const P = d_P;
  d_tex(R, x0, y0, x1, y1, (x, y) => { const fila = ((y - y0) / bh) | 0, jy = (y - y0) % bh, xx = x - x0 + (fila % 2 ? bw >> 1 : 0), jx = xx % bw, b = (xx / bw) | 0, q = h(b, fila, k);
    if (jx === 0 || jy === bh - 1) return P.m3; if (jy === 0) return P.m2; const n = h(x, y, k + 1); return n < 0.05 ? P.m1 : n > 0.97 ? P.m2 : q < 0.22 ? P.m0b : q > 0.9 ? P.m1 : P.m0; });
}

// un nombre grabado, sin letras: dos renglones de rayas cortas con su filo de luz (como cincelado)
function d_nombre(R, x, y, w, sem, c = d_P.m4, cl = d_P.m2) {
  for (let f = 0; f < 2; f++) { let i = f ? 2 : 0; const fin = f ? w - 3 : w; let n = 0;
    while (i < fin) { const L = 2 + Math.floor(h(n, sem + f, 38) * 4); if (i + L > fin) break; R.rect(x + i, y + f * 3, x + i + L - 1, y + f * 3, c); R.rect(x + i + 1, y + f * 3 + 1, x + i + L, y + f * 3 + 1, cl); i += L + 2; n++; } }
}

// una columna dórica: basa de dos escalones, fuste estriado que se estrecha hacia arriba (luz a la izquierda, sombra a
// la derecha), collarino, equino y ábaco; base = y del suelo, top = y de lo alto del ábaco, w = ancho del fuste abajo
function d_columna(R, cx, base, top, w) {
  const { rect, pset } = R, P = d_P, a = w >> 1;
  rect(cx - a - 5, base - 2, cx + a + 5, base, P.m3); rect(cx - a - 5, base - 3, cx + a + 5, base - 3, P.m2); rect(cx - a - 5, base - 2, cx + a + 4, base - 1, P.m0); rect(cx + a + 1, base - 2, cx + a + 5, base - 1, P.m1);
  rect(cx - a - 3, base - 6, cx + a + 3, base - 4, P.m0); rect(cx - a - 3, base - 6, cx + a + 3, base - 6, P.m2); rect(cx + a, base - 5, cx + a + 3, base - 4, P.m1); rect(cx - a - 3, base - 4, cx + a + 3, base - 4, P.m3);
  const y0 = top + 7, y1 = base - 7;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), ha = a - (u < 0.35 ? 1 : 0);
    for (let i = -ha; i <= ha; i++) { const v = (i + ha) / (2 * ha), est = (i + 40) % 3; let c = v < 0.22 ? (est ? P.m2 : P.m0) : v < 0.62 ? (est ? P.m0 : P.m1) : v < 0.86 ? (est ? P.m1 : P.m3) : (est ? P.m3 : P.m4);
      if (i === -ha) c = P.m1; if (i === ha) c = P.m4; if (h(cx + i, y, 39) < 0.03) c = P.m3; pset(cx + i, y, c); }
    if ((y - y0) % 13 === 12) for (let i = -ha; i <= ha; i++) pset(cx + i, y, i > ha * 0.3 ? P.m4 : P.m3); }   // las juntas de los tambores
  rect(cx - a, top + 6, cx + a, top + 6, P.m3); rect(cx - a - 1, top + 5, cx + a + 1, top + 5, P.m0); rect(cx - a - 2, top + 4, cx + a + 2, top + 4, P.m0); pset(cx + a + 2, top + 4, P.m1); pset(cx + a + 1, top + 5, P.m1);
  rect(cx - a - 4, top, cx + a + 4, top + 3, P.m0); rect(cx - a - 4, top, cx + a + 4, top, P.m2); rect(cx + a + 1, top + 1, cx + a + 4, top + 3, P.m1); rect(cx - a - 4, top + 3, cx + a + 4, top + 3, P.m3);
  for (let k = 0; k < 7; k++) pset(cx - a + Math.round(h(k, cx, 40) * w), y1 - Math.round(h(k, cx, 41) * 5), k % 2 ? P.musgo : P.musgoS);   // musgo al pie
}

// una mata de hiedra que trepa: hojas en tres verdes alrededor de un tallo que sube desde (x, y) n píxeles
function d_hiedra(R, x, y, n, sem, ancho = 5) {
  for (let j = 0; j < n; j++) { const cx = x + Math.round(Math.sin(j * 0.5 + sem) * 2), a = Math.round(ancho * (1 - j / n) + 1);
    for (let k = 0; k < 3; k++) { const dx = Math.round((h(j, k, sem) - 0.5) * 2 * a), q = h(j, k, sem + 1); R.pset(cx + dx, y - j, q < 0.3 ? d_P.v0 : q < 0.7 ? d_P.v1 : d_P.v2); if (q > 0.8) R.pset(cx + dx + 1, y - j, d_P.v0); } }
}

// tulipanes en fila entre x0 y x1, con el pie en y: tallo, hoja y la flor de colores, que el viento mece
function d_tulipanes(R, t, x0, x1, y, sem, paso = 3, alto = 3, gr = false) {
  const F = [d_P.f0, d_P.f1, d_P.f2, d_P.f3, d_P.f4, d_P.f5];
  for (let x = x0, k = 0; x <= x1; x += paso, k++) { const q = h(k, sem, 42), a = alto + (q < 0.3 ? 1 : 0), s = Math.round(Math.sin(t * 2 + x * 0.35 + sem) * 0.7), c = F[Math.floor(h(k, sem, 43) * F.length)], cs = d_mez(c, d_P.k, 0.25);
    R.rect(x, y - a + 1, x, y, d_P.v1); R.pset(x + (k % 2 ? 1 : -1), y - 1, d_P.v2);
    if (gr) { R.pset(x - 1, y - 2, d_P.v0); R.pset(x + 1, y - 3, d_P.v2); R.rect(x + s - 1, y - a - 2, x + s + 1, y - a, c); R.pset(x + s + 1, y - a, cs); R.pset(x + s + 1, y - a - 1, cs); R.pset(x + s, y - a - 3, c); R.pset(x + s - 1, y - a - 2, d_mez(c, d_P.bl, 0.4)); }
    else { R.pset(x + s, y - a, c); R.pset(x + s, y - a - 1, c); if (q > 0.5) R.pset(x + s + 1, y - a, cs); } }
}

// un hoyo en el suelo, con el pie en (x, y): la boca oscura, el borde de tierra removida, terrones y el montón al lado
// (o.dir: a qué lado, 1 derecha); p 0–1 lo hace crecer; o.s escala
function d_hoyo(R, x, y, p, o = {}) {
  if (!(p > 0)) return; p = Math.min(1, p);
  const P = d_P, s = o.s ?? 1, dir = o.dir ?? 1, rx = Math.round((4 + 8 * p) * s), ry = Math.max(1, Math.round((1.2 + 2.3 * p) * s)), cy = y - ry;
  for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -rx - 2; i <= rx + 2; i++) { const e = (i / (rx + 2)) ** 2 + (j / (ry + 1)) ** 2; if (e <= 1) R.pset(x + i, cy + j, h(x + i, j, 44) < 0.3 ? P.t2 : P.t0); }
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e <= 1) R.pset(x + i, cy + j, j <= -ry * 0.3 && e > 0.45 ? P.t1 : e > 0.8 && j > 0 ? P.t3 : P.k); }
  const mr = Math.round((3 + 8 * p) * s), mh = Math.round((1 + 8 * p) * s), mx = x + dir * (rx + mr + 1);
  for (let i = -mr; i <= mr; i++) { const hh = Math.round(mh * Math.cos(i / (mr + 1) * Math.PI / 2) ** 0.9 * (0.85 + 0.15 * h(i, x, 45)));
    for (let j = 0; j <= hh; j++) { const q = h(mx + i, j, 46); R.pset(mx + i, y - j, j === hh ? P.t4 : i * dir > mr * 0.35 ? (q < 0.3 ? P.t3 : P.t1) : q < 0.14 ? P.t1 : q > 0.82 ? P.t2 : P.t0); } }
  R.rect(mx - mr - 1, y + 1, mx + mr + 1, y + 1, P.t1);
  for (let k = 0; k < Math.round(7 * p * s); k++) { const tx = x + Math.round((h(k, x, 47) - 0.5) * (rx * 2 + 14 * s)), ty = y + 1 - Math.round(h(k, x, 48) * 3 * s) + 2; R.pset(tx, ty, P.t0); R.pset(tx + 1, ty, P.t1); if (k % 3 === 0) R.pset(tx, ty - 1, P.t2); }
}

// una mariposa que revolotea alrededor de (cx, cy)
function d_mariposa(R, t, cx, cy, c, k) { const x = Math.round(cx + Math.sin(t * 0.9 + k) * 16 + Math.sin(t * 2.3 + k * 2) * 4), y = Math.round(cy + Math.cos(t * 1.3 + k) * 5 + Math.sin(t * 3.1) * 2), al = Math.floor(t * 9 + k) % 2; R.pset(x, y, d_P.k); if (al) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); } else { R.pset(x - 1, y, c); R.pset(x + 1, y, c); } }

// un gorrión que da saltitos por una repisa: (x0, y) y el tramo L que recorre
function d_gorrion(R, t, x0, y, L, k = 0) { const u = (t * 0.22 + k * 0.37) % 2, v = u < 1 ? u : 2 - u, dir = u < 1 ? 1 : -1, pasos = Math.floor(v * L / 4), x = Math.round(x0 + pasos * 4), sal = (v * L / 4) % 1 < 0.3 ? 1 : 0, yy = y - sal, pico = Math.sin(t * 5 + k) > 0.7 ? 1 : 0;
  R.rect(x - 1, yy - 2, x + 2, yy - 1, hex('#8a6a4a')); R.pset(x + (dir > 0 ? 2 : -1), yy - 3 + pico, hex('#6a4a34')); R.pset(x + (dir > 0 ? 3 : -2), yy - 3 + pico, d_P.oro); R.pset(x + (dir > 0 ? -2 : 3), yy - 2, hex('#5a3e2a')); R.pset(x, yy - 1, hex('#d8c8a8')); R.pset(x + 1, yy, d_P.k); }

// la geometría del plano general: suelos, hoyos, medallones, columnas y el centro del estanque
const d_JAR = { suelo: 125, sueloBajo: 164, hoyo: [112, 123], hoyo2: [200, 123], medallones: [[86, 89], [154, 89], [221, 89]], columnas: [44, 262], estanque: [160, 158] };

// lo fijo del jardín (se pinta una vez): la ciudad, la arboleda, el muro, las columnas, la terraza, la escalinata, el
// césped, el brocal del estanque y los parterres; el cielo queda transparente
function d_jardinFijo(R) {
  const { rect, pset, disco, linea } = R, P = d_P;
  // la loma lejana, azulada por la bruma, por detrás de la ciudad
  const H0 = d_mez(P.v0, P.lej, 0.6), H1 = d_mez(P.v1, P.lej, 0.55), H2 = d_mez(P.v2, P.lejL, 0.55);
  for (let x = 0; x < 320; x++) { const yf = Math.round(52 - 4 * Math.abs(Math.sin(x * 0.19 + 0.5)) - 2 * Math.abs(Math.sin(x * 0.41)) + 2 * Math.sin(x * 0.03));
    for (let y = yf; y < 72; y++) pset(x, y, y === yf ? H2 : y - yf < 3 ? (h(x, y, 121) < 0.3 ? H2 : H1) : d_um(x, y) < (y - yf) / 12 ? H0 : H1); }
  // la ciudad a lo lejos, azulada
  for (const [x0, w, y0, punta] of [[62, 6, 50, 0], [70, 6, 42, 1], [78, 8, 48, 0], [89, 6, 53, 0], [97, 9, 45, 0], [109, 6, 51, 0], [172, 7, 50, 0], [181, 5, 54, 0]]) {
    rect(x0, y0, x0 + w, 72, P.lej); rect(x0 + w - 1, y0, x0 + w, 72, P.lejS); rect(x0, y0, x0 + w, y0, P.lejL);
    for (let y = y0 + 2; y < 70; y += 3) for (let x = x0 + 1; x < x0 + w - 1; x += 2) if (h(x, y, 21) < 0.5) pset(x, y, P.lejL);
    if (punta) { rect(x0 + 1, y0 - 4, x0 + w - 1, y0, P.lej); rect(x0 + 2, y0 - 8, x0 + w - 2, y0 - 4, P.lej); rect(x0 + w - 2, y0 - 8, x0 + w - 2, y0, P.lejS); linea(x0 + 3, y0 - 8, x0 + 3, y0 - 13, P.lejS); } }
  // la arboleda de en medio: una masa de copas festoneadas, con la luz en la ladera izquierda de cada una
  const yM = (x) => Math.round(64 - 5 * Math.abs(Math.sin(x * 0.115 + 1)) - 3 * Math.abs(Math.sin(x * 0.27 + 2)) - 2 * Math.sin(x * 0.045));
  for (let x = 0; x < 320; x++) { const yc = yM(x), sube = yM(x - 1) >= yc;
    for (let y = yc; y < 112; y++) { const d = y - yc, q = h(x >> 1, y, 22); pset(x, y, d === 0 ? (sube ? P.v2 : P.v1) : d < 3 ? (q < 0.3 && sube ? P.v2 : P.v1) : d < 9 ? (d_um(x, y) < (d - 2) / 7 ? P.v0 : P.v1) : q < 0.1 ? P.v1 : d_um(x, y) < (d - 8) / 12 ? P.vd : P.v0); } }
  // cipreses y, delante, los árboles de primavera (d_ARB): verdes tiernos, cerezos rosas y blancos y un ciruelo rojo
  d_cipres(R, 64, 66, 36, 4); d_cipres(R, 73, 66, 26, 3); d_cipres(R, 244, 66, 30, 4); d_cipres(R, 251, 66, 21, 3); d_cipres(R, 20, 82, 34, 4); d_cipres(R, 303, 82, 28, 4); d_cipres(R, 296, 82, 20, 3);
  for (const [x, y] of [[6, 84], [34, 84], [288, 84], [314, 84]]) { rect(x - 1, y - 26, x + 1, y, P.tronco); rect(x + 1, y - 26, x + 1, y, P.troncoS); linea(x, y - 14, x - 5, y - 20, P.troncoS); linea(x, y - 11, x + 5, y - 18, P.tronco); for (let j = 4; j < 26; j += 5) pset(x - 1, y - j, P.troncoS); }
  for (const [cx, cy, r, c, s, flor] of d_ARB) d_copa2(R, cx, cy, r, c, s, flor);
  // ── el muro: las dos alas bajas y el cuerpo central con cornisa, friso de nombres, medallones, pilastras y zócalo
  for (const [x0, x1] of [[0, 38], [268, 319]]) { d_sillares(R, x0, 83, x1, 111, 14, 6, 50); rect(x0, 80, x1, 82, P.m0); rect(x0, 80, x1, 80, P.m2); rect(x0, 83, x1, 83, P.m3); rect(x0, 107, x1, 111, P.m1); rect(x0, 107, x1, 107, P.m2); rect(x0, 111, x1, 111, P.m3); }
  d_sillares(R, 50, 79, 256, 106, 18, 7, 52);
  rect(48, 62, 258, 65, P.m0); rect(48, 62, 258, 62, P.m2); rect(48, 65, 258, 65, P.m3); rect(50, 66, 256, 66, P.m4);
  rect(50, 67, 256, 78, P.m0b); rect(50, 67, 256, 67, P.m1); rect(50, 78, 256, 78, P.m3);
  for (let k = 0; k < 6; k++) { const x = 59 + k * 33 + (k > 1 ? 2 : 0) + (k > 3 ? 2 : 0); disco(x, 72, 2, P.m3); pset(x, 72, P.m2); pset(x - 1, 71, P.m4); d_nombre(R, x + 5, 70, 22, k * 7 + 3); }
  for (const px of [50, 118, 187, 252]) { rect(px, 66, px + 4, 106, P.m0); rect(px, 66, px, 106, P.m2); rect(px + 4, 66, px + 4, 106, P.m3); rect(px + 5, 67, px + 5, 106, P.m1); rect(px - 1, 66, px + 5, 67, P.m2); rect(px - 1, 68, px + 5, 68, P.m3); }
  d_JAR.medallones.forEach(([cx, cy], k) => { d_medallonMini(R, cx, cy, k);
    rect(cx - 13, cy + 10, cx + 13, cy + 16, P.m1); rect(cx - 13, cy + 10, cx + 13, cy + 10, P.m3); rect(cx - 13, cy + 16, cx + 13, cy + 16, P.m2); d_nombre(R, cx - 10, cy + 12, 21, cx); });
  rect(50, 106, 256, 111, P.m1); rect(50, 106, 256, 106, P.m2); rect(50, 111, 256, 111, P.m3); for (let x = 50; x < 256; x += 3) if (h(x, 1, 53) < 0.4) pset(x, 110, P.musgoS);
  for (let k = 0; k < 14; k++) { const x = 56 + Math.round(h(k, 2, 54) * 194), n = 4 + Math.round(h(k, 3, 54) * 9); for (let j = 0; j < n; j++) if (d_um(x, 80 + j) < 0.6 - j / n * 0.5) pset(x, 79 + j, P.m1); }   // chorreones bajo el friso
  d_hiedra(R, 247, 110, 34, 5, 6); d_hiedra(R, 240, 110, 18, 6, 4); d_hiedra(R, 58, 110, 14, 7, 4); d_hiedra(R, 8, 110, 22, 8, 5); d_hiedra(R, 310, 110, 20, 9, 5); d_hiedra(R, 282, 110, 10, 10, 3);
  // ── la terraza: el arriate al pie del muro, la fila de piedras que se cuentan y las losas
  d_tex(R, 0, 112, 319, 127, (x, y) => { if (y <= 114) { const q = h(x, y, 55); return q < 0.2 ? P.t1 : q > 0.9 ? P.t2 : P.t0; }
    if (y <= 119 && x >= 64 && x < 244) { const jx = (x - 64) % 15; return y === 115 ? P.l1 : jx === 0 ? P.l1 : y === 116 ? P.m2 : y === 119 ? P.l0b : h(x, y, 56) < 0.06 ? P.l0 : P.l2; }
    const fila = y < 120 ? 0 : y < 124 ? 1 : 2, yy = [115, 120, 124][fila], jx = (x + fila * 9 + Math.floor(h((x + fila * 9) / 21 | 0, fila, 57) * 5)) % 21, q = h(x, y, 58);
    if (y === yy || jx === 0) return h(x, y, 59) < 0.18 ? P.musgoS : P.l1; return q < 0.05 ? P.l1 : q > 0.95 ? P.l2 : h((x + fila * 9) / 21 | 0, fila, 60) < 0.3 ? P.l0b : P.l0; });
  for (let x = 2; x < 318; x += 2) { const q = h(x, 3, 61); if (q < 0.55) { pset(x, 113, q < 0.25 ? P.v1 : P.v2); if (q < 0.12) pset(x, 112, P.v2); } }
  for (const cx of d_JAR.columnas) for (let j = 0; j < 12; j++) for (let i = 0; i < 16 - j; i++) if (d_um(cx + 8 + i + j, 115 + j) < 0.5) { const x = cx + 8 + i + j, y = 115 + j; pset(x, y, d_mez(R.pget(x, y), P.m4, 0.45)); }   // la sombra de las columnas
  d_columna(R, 44, 114, 46, 12); d_columna(R, 262, 114, 46, 12);
  // ── la escalinata
  rect(0, 128, 319, 129, P.l2); rect(0, 130, 319, 130, P.m3); rect(0, 131, 319, 132, P.l0); rect(0, 133, 319, 134, P.m4);
  for (let x = 0; x < 320; x++) { if (x % 40 === 17) { rect(x, 128, x, 129, P.l1); rect(x + 20, 131, x + 20, 132, P.l1); } if (h(x, 4, 62) < 0.1) pset(x, 133, P.musgoS); if (h(x, 5, 62) < 0.06) pset(x, 130, P.musgo); }
  // ── abajo: el césped a franjas, el paseo de grava, el brocal del estanque y los parterres
  d_tex(R, 0, 135, 319, 179, (x, y) => { const xl = 104 - (y - 142) * 0.45, xr = 216 + (y - 142) * 0.45, enY = y >= 142 && y <= 174;
    if (enY && x >= xl && x <= xr) return P.a1;
    if (y >= 139 && y <= 177 && x >= xl - 3 && x <= xr + 3) { const top = y < 142, bot = y > 174; return (y === 139 || (x < xl - 2 && !top) ) ? P.m2 : (bot && y === 177) || (!top && !bot && x > xr + 2) ? P.m3 : ((x + (y > 174 ? 5 : 0)) % 11 === 0 && (top || bot)) || (!top && !bot && y % 8 === 0) ? P.m3 : y === 141 || y === 175 ? P.m1 : P.m0; }
    if ((y < 139 && x > 92 && x < 228) || (y >= 139 && x >= xl - 13 && x <= xr + 13)) {   // la grava: el bordillo, la sombra del brocal, guijarros y las rayas del rastrillo
      if ((y < 139 && (x === 93 || x === 227)) || (y >= 139 && (x < xl - 12 || x > xr + 12))) return y % 6 === 0 ? P.m3 : P.l2;
      if (y >= 141 && ((x > xr + 3 && x <= xr + 7) || y === 178) && d_um(x, y) < 0.6) return d_GS;
      const q = h(x, y, 63); if (h(x >> 1, y >> 1, 163) < 0.05) return (x & 1) || (y & 1) ? P.g1 : P.g2;
      if (y % 3 === 0 && h(x >> 2, y, 164) < 0.55) return d_G0B; return q < 0.12 ? P.g1 : q > 0.9 ? P.g2 : P.g0; }
    // el césped: franjas de siega con el borde tramado, briznas (punta clara, pie oscuro) y el borde de abajo en sombra
    const f = (x - 160) / (y - 96) * 2.6, fl = Math.floor(f), fr = f - fl, q = h(x, y, 64), b = h(x, y >> 1, 264); let s = fl & 1; if (fr < 0.14 && d_um(x, y) < 0.5 - fr * 3) s ^= 1;
    let c = s ? P.c1 : P.c0; if (y === 135) c = P.cD; else if (y === 136 || (y === 137 && d_um(x, y) < 0.5)) c = P.cS; else if (b < 0.07) c = (y & 1) ? P.cS : P.cL; else if (q < 0.03) c = P.cL; else if (q > 0.97) c = P.cS; else if (y > 171 && d_um(x, y) < (y - 171) / 22) c = P.cS;
    return c; });
  for (const [x0, x1] of [[14, 84], [236, 306]]) { rect(x0 - 2, 141, x1 + 2, 149, P.m3); rect(x0 - 2, 141, x1 + 2, 141, P.m2); d_tex(R, x0, 142, x1, 148, (x, y) => { const q = h(x, y, 65); return q < 0.25 ? P.t1 : q > 0.85 ? P.t2 : P.t0; }); rect(x0 - 2, 150, x1 + 2, 150, P.cD);
    for (let x = x0 + 1; x < x1; x += 2) { pset(x, 147, P.v1); pset(x, 144, P.v1); } }
  // margaritas y tréboles sueltos por el césped
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 6, 66) * 319), y = 152 + Math.round(h(k, 7, 66) * 26); if (x > 76 && x < 244) continue; if (k % 3 === 0) { pset(x, y, P.f3); pset(x, y + 1, P.v0); } else if (k % 3 === 1) pset(x, y, P.f1); else { pset(x, y, P.cD); pset(x + 1, y, P.cD); } }
  d_cespedVida(R);
}
// el agua del estanque (trapecio y 142–174): bandas tramadas, el reflejo claro del muro, ondas que corren, nenúfares,
// el surtidor con sus anillos y dos patos con su estela
function d_estanque(R, t) {
  const B = R.buf, P = d_P;
  for (let y = 142; y <= 174; y++) { const xl = Math.ceil(104 - (y - 142) * 0.45), xr = Math.floor(216 + (y - 142) * 0.45), v = (y - 142) / 32;
    for (let x = xl; x <= xr; x++) { let c = d_um(x, y) < v * 1.1 - 0.15 ? P.a0 : P.a1;
      if (y < 150 && d_um(x + Math.round(Math.sin(t * 1.6 + y * 0.9) * 1.5), y) < 0.8 - (y - 142) / 9) c = P.a2;   // el cielo reflejado al fondo
      const w = Math.sin(x * 0.33 + y * 1.4 + t * 1.5) * Math.sin(y * 0.8 - t * 0.9 + x * 0.06); if (w > 0.86) c = P.a3; else if (w < -0.9) c = P.aS;
      if (y === 142 || x === xl) c = P.aS;
      B[y * 320 + x] = c; } }
  for (let k = 0; k < 3; k++) { const r = ((t * 5 + k * 5) % 15); for (let a = 0; a < 6.283; a += 0.12) { const x = Math.round(160 + Math.cos(a) * (3 + r) * 1.8), y = Math.round(158 + Math.sin(a) * (1 + r * 0.45)); if (y > 143 && y < 174 && d_um(x, y) > r / 18) R.pset(x, y, P.a3); } }
  R.rect(158, 156, 162, 158, P.m3); R.rect(158, 155, 162, 155, P.m2); R.rect(159, 153, 161, 154, P.m1);   // el surtidor
  for (let k = 0; k < 9; k++) { const u = (t * 1.6 + k / 9) % 1, dx = (k % 3 - 1) * 5 * u, y = 152 - Math.round(Math.sin(u * Math.PI) * (9 + (k % 2) * 2)); R.pset(Math.round(160 + dx), y, u < 0.5 ? P.bl : P.a3); if (k % 3 === 1 && u < 0.5) R.pset(160, y + 1, P.a3); }
  for (const [x, y, fl] of [[122, 150, 1], [196, 147, 0], [204, 166, 1], [116, 168, 0], [140, 171, 0], [186, 158, 0]]) { const b = Math.round(Math.sin(t * 1.2 + x) * 0.5); R.rect(x - 2, y + b, x + 2, y + b, P.v1); R.rect(x - 1, y - 1 + b, x + 2, y - 1 + b, P.v2); R.pset(x + 3, y + b, P.v0); if (fl) { R.pset(x, y - 2 + b, P.r2); R.pset(x + 1, y - 2 + b, P.r1); } }
  for (let k = 0; k < 2; k++) { const a = t * 0.22 + k * 3.3, x = Math.round(160 + Math.cos(a) * (36 - k * 10)), y = Math.round(159 + Math.sin(a) * (9 - k * 2)), d = -Math.sin(a) > 0 ? 1 : -1, c = k ? hex('#8a6a4a') : P.bl;
    for (let i = 2; i < 8; i++) if ((i + Math.floor(t * 6)) % 2) { R.pset(x - d * (i + 2), y + 1 + (i >> 2), P.a3); R.pset(x - d * (i + 2), y - (i >> 2), P.a3); }
    R.rect(x - 2, y - 1, x + 2, y, c); R.pset(x - d * 3, y - 1, c); R.rect(x + d * 2, y - 3, x + d * 3, y - 2, k ? hex('#2e6a4a') : P.bl); R.pset(x + d * 4, y - 2, P.f5); R.pset(x + d * 3, y - 3, P.k); R.rect(x - 2, y + 1, x + 2, y + 1, P.aS); }
}

// el plano general del jardín: el cielo, lo fijo y toda la vida animada; o.hoyo y o.hoyo2
function d_jardin(R, t, o) {
  const P = d_P;
  d_cielo(R, t, 78, { sol: [206, 26, 8] });
  d_cieloVida(R, t);
  // golondrinas que cruzan el cielo (se pierden antes de la esquina de Atom)
  for (let k = 0; k < 4; k++) { const x = Math.round(((t * 38 + k * 13) % 460) - 60 - (k % 2) * 7), y = Math.round(31 + k * 4 + Math.sin(t * 1.7 + k) * 3 + Math.max(0, x - 175) * 0.5), al = Math.floor(t * 7 + k) % 2; if (x < -3 || x > 270) continue; R.pset(x, y, P.ave); R.pset(x - 1, y - al, P.ave); R.pset(x - 2, y - al * 2 + 1, P.ave); R.pset(x + 1, y - al, P.ave); R.pset(x + 2, y - al * 2 + 1, P.ave); }
  d_pegar(R, d_fijo(R, 'jardin', () => d_jardinFijo(R)), 100);
  // el viento corre por las copas: una onda de hojas claras que pasa de izquierda a derecha (solo sobre cada copa)
  { const F = d_fijo(R, 'jardin', () => d_jardinFijo(R));
    for (const [cx, cy, r, c, k] of d_ARB) { const cO = d_mez(c[0], P.k, 0.38); for (let i = 0; i < r * 3; i++) { const a = h(i, k, 67) * 6.283, d = Math.sqrt(h(i, k, 68)) * r, x = Math.round(cx + Math.cos(a) * d * 1.15), y = Math.round(cy + Math.sin(a) * d * 0.8), w = Math.sin(x * 0.07 - t * 1.7 + y * 0.05 + k);
      if (w < 0.45 || x < 0 || x > 319) continue; const p = F[y * 320 + x]; if (p === c[0] || p === c[1] || p === c[2] || p === cO) R.pset(x, y, w > 0.8 ? c[3] : c[2]); } }
    for (let x = 0; x < 320; x += 3) { const y = Math.round(64 - 5 * Math.abs(Math.sin(x * 0.115 + 1)) - 3 * Math.abs(Math.sin(x * 0.27 + 2)) - 2 * Math.sin(x * 0.045)); if (Math.sin(x * 0.07 - t * 1.7) > 0.7 && F[y * 320 + x] === P.v2) R.pset(x, y, P.v3); } }
  // los paseantes de detrás de las alas del muro: solo asoman la cabeza y los hombros
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, u = ((t * (0.035 + k * 0.006) + k * 0.4) % 1), x = Math.round(d > 0 ? lerp(-12, 332, u) : lerp(332, -12, u)), b = Math.floor(t * 4 + k) % 2, y = 78 - b; if ((x > 1 && x < 34) || (x > 271 && x < 317)) { const pelo = [hex('#3a2a1a'), hex('#c89a4a'), hex('#8a8a96')][k], ropa = [P.f0, P.azul, P.f1][k];
      R.rect(x, y - 3, x + 2, y - 1, P.piel); R.rect(x, y - 4, x + 2, y - 4, pelo); R.pset(d > 0 ? x : x + 2, y - 3, pelo); R.rect(x - 1, y, x + 3, 79, ropa); } }
  d_cometa(R, t);   // después de los paseantes: el niño de la cometa queda delante
  d_gorrion(R, t, 96, 61, 110, 0);
  // el arriate del muro, los parterres y el estanque
  d_tulipanes(R, t, 66, 242, 114, 1, 4, 3); d_tulipanes(R, t, 4, 34, 114, 2, 5, 3); d_tulipanes(R, t, 274, 316, 114, 3, 5, 3);
  d_tulipanes(R, t, 16, 83, 146, 4, 3, 4); d_tulipanes(R, t, 17, 82, 149, 5, 3, 3); d_tulipanes(R, t, 238, 305, 146, 6, 3, 4); d_tulipanes(R, t, 239, 304, 149, 7, 3, 3);
  d_estanque(R, t); d_aspersor(R, t, 271, 168); d_petirrojo(R, t, 34, 160, 40, 0);
  // los hoyos junto al muro
  d_hoyo(R, d_JAR.hoyo[0], d_JAR.hoyo[1], o.hoyo ?? 0, { dir: -1 }); d_hoyo(R, d_JAR.hoyo2[0], d_JAR.hoyo2[1], o.hoyo2 ?? 0, { dir: 1 });
  // pétalos que caen de los cerezos, mariposas y la brisa en la hierba
  for (let k = 0; k < 18; k++) { const x = Math.round(((h(k, 8, 69) * 340 + t * (7 + h(k, 9, 69) * 6) + Math.sin(t * 1.3 + k) * 5) % 340) - 10), y = Math.round(40 + ((h(k, 10, 69) * 136 + t * (6 + h(k, 11, 69) * 5)) % 136)); if (x > 268 && y < 50) continue; R.pset(x, y, k % 3 ? P.r2 : P.r3); if (k % 4 === 0) R.pset(x + 1, y, P.r1); }
  d_mariposa(R, t, 50, 138, P.f1, 0); d_mariposa(R, t, 270, 136, P.bl, 2); d_mariposa(R, t, 150, 108, P.f5, 4);
  for (let k = 0; k < 10; k++) { const x = Math.round(((h(k, 12, 70) * 400 + t * (30 + k * 3)) % 400) - 40), y = 153 + Math.round(h(k, 13, 70) * 24); if (x > 78 && x < 242) continue; if (Math.sin(t * 0.9 + k) > 0.2) { R.pset(x, y, P.cL); R.pset(x + 1, y, P.cL); R.pset(x + 2, y - 1, P.cL); } }
  const piedras = []; for (let k = 0; k < 12; k++) piedras.push([71 + k * 15, 118]);
  return { ...d_JAR, piedras };
}
// lo de delante en el plano general: las dos urnas de piedra con geranios y los tulipanes del borde de abajo
function d_jardinDelante(R, t, o) {
  const P = d_P;
  for (const cx of [11, 308]) { R.rect(cx - 6, 176, cx + 6, 179, P.m3); R.rect(cx - 6, 175, cx + 6, 175, P.m2); R.rect(cx - 2, 170, cx + 2, 174, P.m1); R.rect(cx - 2, 170, cx - 1, 174, P.m0);
    for (let j = 0; j < 9; j++) { const a = Math.round(4 + Math.sin(j / 8 * Math.PI) * 4); R.rect(cx - a, 161 + j, cx + a, 161 + j, P.m0); R.rect(cx - a, 161 + j, cx - a + 1, 161 + j, P.m2); R.rect(cx + a - 2, 161 + j, cx + a, 161 + j, P.m3); } R.rect(cx - 6, 159, cx + 6, 160, P.m2); R.rect(cx - 6, 160, cx + 6, 160, P.m3);
    for (let k = 0; k < 12; k++) { const a = h(k, cx, 71) * Math.PI, d = 3 + h(k, cx, 72) * 6, x = Math.round(cx + Math.cos(a) * d * 1.2 + Math.sin(t * 1.5 + k) * 0.6), y = Math.round(158 - Math.sin(a) * d); R.pset(x, y + 1, P.v0); R.pset(x + 1, y + 1, P.v1); R.pset(x, y, k % 3 ? P.f0 : P.f2); if (k % 2) R.pset(x + 1, y, P.f0); } }
  d_tulipanes(R, t, 24, 86, 179, 8, 4, 4); d_tulipanes(R, t, 236, 296, 179, 9, 4, 4);
  return {};
}

// la geometría del muro de cerca: el suelo, los medallones, la fila de piedras y la línea de los hoyos
const d_MUR = { suelo: 147, medallones: [[70, 62], [156, 62], [242, 62]], piedraX0: 40, piedraW: 20, piedraY: [152, 166], hoyoY: 145 };

// los relieves de los medallones (17 de ancho): el filósofo de perfil, la lira y la paleta de pintor
const d_REL = {
  filosofo: ['......#####......', '....#########....', '...###########...', '..#############..', '..#############..', '.##############..', '.##############..', '###############..', '.#############...', '..############...', '.############....', '.############....', '.###########.....', '..##########.....', '...#####.####....', '....###..#####...', '.........######..', '....############.', '..###############', '#################', '#################'],
  lira: ['..##.........##..', '.###.........###.', '.##...........##.', '.##...........##.', '.###############.', '.##..#.#.#.#..##.', '.##..#.#.#.#..##.', '.##..#.#.#.#..##.', '.##..#.#.#.#..##.', '..##.#.#.#.#.##..', '..##.#.#.#.#.##..', '...###.#.#.###...', '....####.####....', '.....#######.....', '......#####......', '.......###.......', '.......###.......', '.....#######.....', '....#########....'],
  paleta: ['.................', '.....########....', '...############..', '..##############.', '.####.###########', '.###...####.#####', '#####.####...####', '###########.#####', '#################', '#####..##########', '####....#######..', '#####..######....', '.###########.....', '..#########......', '....######.......'],
};

// un medallón de piedra en relieve: el aro con su luz y su sombra, el campo hundido y la figura que sobresale
function d_medallon(R, cx, cy, r, tipo) {
  const P = d_P, g = d_REL[tipo];
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) { const d = Math.hypot(i, j), ds = Math.hypot(i - 1.5, j - 1.5), luz = -(i + j) / (d + 0.01);
    if (d > r + 0.5) { if (ds <= r + 0.5) R.pset(cx + i, cy + j, P.m4); continue; }
    let c; if (d > r - 1) c = luz > 0.3 ? P.m2 : luz < -0.3 ? P.m3 : P.m0; else if (d > r - 3) c = luz > 0.2 ? P.m2 : P.m0; else if (d > r - 4) c = luz > 0.2 ? P.m4 : P.m2; else c = h(cx + i, cy + j, 73) < 0.12 ? P.m4 : (d > r - 6 && luz > 0.4) ? P.m4 : P.m3;
    R.pset(cx + i, cy + j, c); }
  const w = g[0].length, x0 = cx - (w >> 1), y0 = cy - Math.round(g.length / 2) + (tipo === 'filosofo' ? 1 : 0), en = (i, j) => j >= 0 && j < g.length && i >= 0 && i < w && g[j][i] === '#';
  for (let j = 0; j < g.length; j++) for (let i = 0; i < w; i++) if (en(i, j) && Math.hypot(x0 + i + 1 - cx, y0 + j + 1 - cy) < r - 3) R.pset(x0 + i + 1, y0 + j + 1, P.m4);
  for (let j = 0; j < g.length; j++) for (let i = 0; i < w; i++) if (en(i, j) && Math.hypot(x0 + i - cx, y0 + j - cy) < r - 3) R.pset(x0 + i, y0 + j, !en(i - 1, j) || !en(i, j - 1) ? P.m2 : !en(i + 1, j) || !en(i, j + 1) ? P.m0b : P.m0);
  if (tipo === 'filosofo') for (const [i, j] of [[4, 6], [2, 9], [3, 9], [10, 6], [10, 7], [11, 7], [3, 3], [5, 3], [7, 4], [9, 4], [11, 5], [13, 5], [3, 11], [5, 12], [4, 13], [6, 11], [7, 13]]) R.pset(x0 + i, y0 + j, P.m4);   // el ojo, la boca, la oreja, la cinta y la barba
  if (tipo === 'paleta') { R.linea(cx + 1, cy + 2, cx + 9, cy - 9, P.m4); R.linea(cx + 1, cy + 1, cx + 8, cy - 9, P.m2); R.rect(cx + 8, cy - 11, cx + 10, cy - 9, P.m2); R.pset(cx + 10, cy - 9, P.m4); }   // el pincel, metido por el agujero
}

// lo fijo del muro de cerca (se pinta una vez): las copas de arriba, la cornisa, la greca, los sillares, los medallones
// con sus placas, el zócalo, la hiedra, el arriate, la hierba y la fila de piedras
function d_muroFijo(R) {
  const { rect, pset, disco, linea } = R, P = d_P;
  // las copas que asoman por encima del muro
  for (let x = 0; x < 320; x++) { const yc = Math.round(15 - 2.5 * Math.sin(x * 0.09) - 2 * Math.sin(x * 0.23 + 1)) + (x < 20 ? -Math.round((20 - x) * 0.3) : 0) + (x > 262 ? 2 : 0);
    for (let y = yc; y < 20; y++) { const q = h(x, y, 74), rosa = (x > 190 && x < 252) || x < 26; pset(x, y, y === yc ? (rosa ? P.r2 : P.v2) : q < 0.3 ? (rosa ? P.r0 : P.v0) : (rosa ? P.r1 : P.v1)); } }
  // la cornisa con sus dentículos y la greca
  rect(0, 19, 319, 24, P.m0); rect(0, 19, 319, 19, P.m2); rect(0, 20, 319, 20, P.m2); rect(0, 24, 319, 24, P.m3); rect(0, 25, 319, 26, P.m4);
  for (let x = 0; x < 320; x++) { if (h(x >> 1, 1, 75) < 0.08) pset(x, 21 + (x % 3), P.m1); pset(x, 27, P.m1); pset(x, 28, P.m1); if (x % 6 < 3) { pset(x, 27, P.m0); pset(x, 28, x % 6 === 2 ? P.m3 : P.m0); pset(x, 29, P.m3); } else pset(x, 29, P.m1); }
  d_tex(R, 0, 30, 319, 40, (x, y) => { const u = (x + 3) % 12, v = y - 31; if (y === 30) return P.m2; if (y === 40) return P.m3;
    const g = (v === 1 && u < 10) || (u === 0 && v >= 1 && v <= 7) || (v === 7 && u < 8) || (u === 7 && v >= 3 && v <= 7) || (v === 3 && u >= 3 && u <= 7) || (u === 3 && v >= 3 && v <= 5);
    if (g) return P.m4; const g2 = (v === 2 && u >= 1 && u < 11) || (u === 1 && v >= 2 && v <= 8); return g2 ? P.m2 : h(x, y, 76) < 0.06 ? P.m1 : P.m0b; });
  rect(270, 27, 319, 40, P.m0b); rect(270, 27, 319, 27, P.m2); rect(270, 40, 319, 40, P.m3); rect(270, 27, 270, 40, P.m3); rect(271, 28, 271, 39, P.m2); for (let k = 0; k < 16; k++) pset(273 + Math.round(h(k, 1, 95) * 44), 29 + Math.round(h(k, 2, 95) * 10), P.m0);   // la esquina de Atom: un sillar liso
  // el paño de sillares grandes, con manchas de humedad que bajan de la cornisa
  d_tex(R, 0, 41, 319, 101, (x, y) => { const bw = 40, bh = 15, fila = ((y - 41) / bh) | 0, jy = (y - 41) % bh, xx = x + (fila % 2 ? 20 : 0) + 6, jx = xx % bw, b = (xx / bw) | 0, q = h(b, fila, 77), n = h(x, y, 78);
    if (jx === 0 || jy === bh - 1) return P.m3; if (jx === 1 || jy === 0) return P.m2; if (jx === bw - 1 || jy === bh - 2) return P.m1;
    let c = q < 0.2 ? P.m0b : q > 0.88 ? P.m1 : P.m0; if (n < 0.035) c = P.m1; else if (n > 0.975) c = P.m2; else if (h(x >> 2, y >> 1, 79) < 0.05) c = P.m0b;
    const ch = h((x / 9) | 0, 2, 80); if (ch < 0.3 && d_um(x, y) < (0.55 - (y - 41) / (30 + ch * 120)) * (1 - Math.abs((x % 9) - 4) / 5)) c = d_mez(c, P.m4, 0.3);
    return c; });
  for (const [x0, y0, n, s] of [[118, 44, 16, 1], [204, 58, 12, 2], [26, 70, 10, 3], [292, 52, 13, 4]]) { let x = x0; for (let j = 0; j < n; j++) { pset(x, y0 + j, P.m4); pset(x + 1, y0 + j, P.m2); if (h(j, s, 81) < 0.4) x += h(j, s, 82) < 0.5 ? 1 : -1; } }   // grietas
  // los tres medallones y sus placas
  const tipos = ['filosofo', 'lira', 'paleta'];
  d_MUR.medallones.forEach(([cx, cy], k) => { d_medallon(R, cx, cy, 16, tipos[k]);
    rect(cx - 24, cy + 22, cx + 24, cy + 33, P.m1); rect(cx - 24, cy + 22, cx + 24, cy + 22, P.m4); rect(cx - 24, cy + 22, cx - 24, cy + 33, P.m4); rect(cx - 23, cy + 33, cx + 24, cy + 33, P.m2); rect(cx + 24, cy + 23, cx + 24, cy + 33, P.m2);
    d_nombre(R, cx - 19, cy + 25, 38, k * 5 + 1, P.m4, P.m2); d_nombre(R, cx - 12, cy + 30, 24, k * 5 + 2, P.m4, P.m2);
    for (const dx of [-21, 21]) { disco(cx + dx, cy + 27, 1, P.m3); pset(cx + dx, cy + 27, P.m2); } });
  // ramas de laurel grabadas entre los medallones
  for (const cx of [113, 199]) for (let j = 0; j < 22; j++) { const y = 50 + j, x = cx + Math.round(Math.sin(j * 0.22) * 2); pset(x, y, P.m3); if (j % 4 === 1) { pset(x - 1, y - 1, P.m3); pset(x - 2, y - 2, P.m3); pset(x - 3, y - 2, P.m2); pset(x + 1, y - 1, P.m3); pset(x + 2, y - 2, P.m3); pset(x + 3, y - 2, P.m2); } }
  // el zócalo moldurado, con musgo
  rect(0, 102, 319, 104, P.m2); rect(0, 104, 319, 104, P.m3); rect(0, 105, 319, 113, P.m0); rect(0, 105, 319, 105, P.m1); rect(0, 110, 319, 110, P.m1); rect(0, 113, 319, 113, P.m4);
  for (let x = 0; x < 320; x++) { if (x % 64 === 30) rect(x, 105, x, 112, P.m3); const q = h(x, 3, 83); if (q < 0.35) pset(x, 112, P.musgoS); if (q < 0.18) pset(x, 111, P.musgo); if (q < 0.06) { pset(x, 110, P.musgo); pset(x, 109, P.musgoS); } if (h(x, 4, 83) < 0.05) pset(x, 106 + (x % 4), P.m1); }
  // la hiedra de los extremos
  d_hiedra(R, 5, 112, 74, 11, 9); d_hiedra(R, 12, 112, 48, 12, 7); d_hiedra(R, 314, 112, 58, 13, 8); d_hiedra(R, 306, 112, 34, 14, 6); d_hiedra(R, 132, 112, 12, 15, 4);
  // ── el suelo: el arriate, la hierba (más oscura a la sombra del muro), la fila de doce piedras y el primer término
  d_tex(R, 0, 114, 319, 179, (x, y) => { const q = h(x, y, 84);
    if (y <= 119) return q < 0.2 ? P.t1 : q > 0.88 ? P.t2 : y === 114 ? P.t3 : P.t0;
    if (y >= 152 && y <= 167 && x >= 38 && x <= 281) { const jx = (x - 40) % 20, k = ((x - 40) / 20) | 0, v = h(k, 5, 85);
      if (x < 40 || x > 279 || jx === 0 || jx === 19) return q < 0.3 ? P.musgoS : P.m4; if (y >= 166) return P.m4; if (y === 152) return P.m2; if (jx === 1) return P.m2; if (y === 165 || jx === 18) return P.l1;
      return q < 0.05 ? P.l1 : q > 0.96 ? P.m2 : h(x >> 1, y >> 1, 86 + k) < 0.1 ? P.l0b : v < 0.35 ? P.l0 : v < 0.7 ? P.l2 : P.l0b; }
    const sombra = y < 128 ? d_um(x, y) < (128 - y) / 9 : false, man = h(x >> 3, y >> 2, 87) < 0.4; let c = sombra ? P.cS : man ? P.c0 : P.c1;
    if (q < 0.07) c = sombra ? P.cD : P.cS; else if (q > 0.93) c = sombra ? P.c0 : P.cL; if (y === 120) c = P.cD; if (y === 151 || y === 168) c = P.cD;
    return c; });
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 6, 88) * 319), y = 122 + Math.round(h(k, 7, 88) * 56); if (y >= 150 && y <= 169) continue; if (k % 4 === 0) { pset(x, y, P.f3); pset(x - 1, y + 1, P.f3); pset(x + 1, y + 1, P.f3); pset(x, y + 1, P.f1); } else if (k % 4 === 1) pset(x, y, P.f1); else if (k % 4 === 2) { pset(x, y, P.cD); pset(x + 1, y - 1, P.cD); } else { pset(x, y, P.g1); pset(x + 1, y, P.g2); } }
  for (const [k, dx, dy] of [[2, 6, 5], [7, 11, 8], [9, 4, 3]]) { const x = 40 + k * 20 + dx; linea(x, 153 + dy, x + 4, 157 + dy, P.l1); pset(x + 4, 158 + dy, P.l1); }   // piedras con una raja
}

// el muro de cerca: lo fijo y la vida animada; o.cuenta, o.hasta, o.alReves, o.hoyo, o.hoyo2, o.hoyoX, o.hoyo2X
function d_muro(R, t, o) {
  const P = d_P, B = R.buf, M = d_MUR;
  d_cielo(R, t, 22, { sol: null, cumulos: 0 });
  for (let k = 0; k < 3; k++) d_nube(R, Math.round(((h(k, 1, 94) * 400 + t * (2 + k)) % 420) - 50), 9 + k * 2, 16 + k * 6, k + 20);
  d_pegar(R, d_fijo(R, 'muro', () => d_muroFijo(R)), 20);
  // las copas se mecen: brillos que corren por arriba
  { const F = d_fijo(R, 'muro', () => d_muroFijo(R)); for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 89) * 319), y = 14 + Math.round(h(k, 2, 89) * 4), xx = x + Math.round(Math.sin(t * 1.5 + k)), c = F[y * 320 + xx]; if (y < 19 && c && Math.sin(t * 2 + k * 1.3) > 0.2) R.pset(xx, y, (x > 190 && x < 252) || x < 26 ? P.r3 : P.v3); } }
  // la sombra de las ramas, que se mece sobre el muro (arriba a la izquierda y a la derecha, lejos de los medallones)
  for (const [cx, cy, rx, ry, k] of [[24, 50, 26, 12, 0], [116, 46, 14, 7, 1], [200, 96, 16, 6, 2], [292, 78, 24, 12, 3]]) { const dx = Math.sin(t * 0.9 + k * 2) * 3, dy = Math.cos(t * 0.7 + k) * 1.5;
    for (let y = Math.max(41, Math.round(cy - ry)); y <= Math.min(101, Math.round(cy + ry)); y++) for (let x = Math.max(0, Math.round(cx - rx)); x <= Math.min(319, Math.round(cx + rx)); x++) { const e = ((x - cx - dx) / rx) ** 2 + ((y - cy - dy) / ry) ** 2; if (e > 1) continue;
      const hoja = Math.sin((x - dx) * 0.9 + k) * Math.sin((y - dy) * 1.1 + k * 2) + Math.sin((x - dx + y) * 0.37); if (hoja > 0.35 && d_um(x, y) < 0.8 - e * 0.6) B[y * 320 + x] = d_mez(B[y * 320 + x], P.m4, 0.3); } }
  // el destello que recorre los medallones
  M.medallones.forEach(([cx, cy], k) => { const u = ((t * 0.25 + k * 0.33) % 1) * 3; if (u < 1) { const a = -2.6 + u * 1.6; for (let i = -1; i <= 1; i++) R.pset(Math.round(cx + Math.cos(a + i * 0.08) * 15), Math.round(cy + Math.sin(a + i * 0.08) * 15), P.bl); } });
  // una lagartija que sale de la hiedra de la derecha, se para al sol y vuelve a esconderse; el gorrión de la cornisa
  { const u = (t % 8) / 8, v = u < 0.2 ? u / 0.2 : u < 0.75 ? 1 : 1 - (u - 0.75) / 0.25, x = Math.round(lerp(312, 282, v)), y = Math.round(96 - v * 8), corre = u < 0.2 || u > 0.75, cola = Math.round(Math.sin(t * (corre ? 18 : 2))), d = u > 0.75 ? -1 : 1;
    if (v > 0.12) { R.rect(x, y, x + 4, y, P.musgoS); R.pset(d > 0 ? x - 1 : x + 5, y, P.v0); for (let i = 1; i <= 3; i++) R.pset(d > 0 ? x + 4 + i : x - i, y + (i < 3 ? cola : 0), P.musgoS); R.pset(x + 1, y - 1, P.v0); R.pset(x + 1, y + 1, P.v0); R.pset(x + 3, y - 1, P.v0); R.pset(x + 3, y + 1, P.v0); } }
  d_gorrion(R, t, 60, 18, 150, 1);
  // los tulipanes del arriate y la hierba que mueve el viento
  d_tulipanes(R, t, 22, 300, 120, 11, 7, 6, true); d_tulipanes(R, t, 26, 298, 122, 12, 9, 4, true);
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 3, 90) * 319), y = 124 + Math.round(h(k, 4, 90) * 54); if (y >= 149 && y <= 169) continue; const s = Math.round(Math.sin(t * 2.2 + x * 0.08 + k) * 1.2); R.pset(x, y, P.cS); R.pset(x + (s > 0 ? 1 : s < 0 ? -1 : 0), y - 1, P.cL); if (k % 3 === 0) R.pset(x + s, y - 2, P.cL); }
  // la cuenta de las piedras: se iluminan una a una, cada una con su número
  const hasta = Math.max(1, Math.min(12, o.hasta ?? 12)), n = Math.max(0, Math.min(hasta, Math.floor((o.cuenta ?? 0) * hasta + 1e-6)));
  for (let k = 0; k < n; k++) { const i = o.alReves ? 11 - k : k, x0 = M.piedraX0 + i * 20, ult = k === n - 1;
    for (let y = 153; y <= 165; y++) for (let x = x0 + 1; x <= x0 + 18; x++) B[y * 320 + x] = d_mez(B[y * 320 + x], ult ? P.oroL : P.oro, ult ? 0.7 : 0.45);
    if (ult) { R.rect(x0, 152, x0 + 19, 152, P.oroL); R.rect(x0, 166, x0 + 19, 166, P.oroS); R.rect(x0, 152, x0, 166, P.oroL); R.rect(x0 + 19, 152, x0 + 19, 166, P.oroS);
      for (let q = 0; q < 4; q++) { const a = t * 3 + q * 1.57, sx = Math.round(x0 + 10 + Math.cos(a) * 12), sy = Math.round(159 + Math.sin(a) * 9); R.pset(sx, sy, P.bl); if (q % 2) { R.pset(sx - 1, sy, P.oroL); R.pset(sx + 1, sy, P.oroL); R.pset(sx, sy - 1, P.oroL); R.pset(sx, sy + 1, P.oroL); } } }
    const s = String(k + 1), w = s.length * 4 - 1; d_cifras(R, s, x0 + 10 - (w >> 1), 157, P.wDD); }
  // los dos hoyos, al pie de la piedra que toca
  const hx = o.hoyoX ?? M.piedraX0 + 3 * 20 + 10, hx2 = o.hoyo2X ?? M.piedraX0 + 8 * 20 + 10;
  d_hoyo(R, hx, M.hoyoY, o.hoyo ?? 0, { s: 1.5, dir: -1 }); d_hoyo(R, hx2, M.hoyoY, o.hoyo2 ?? 0, { s: 1.5, dir: 1 });
  // pétalos y mariposas
  for (let k = 0; k < 14; k++) { const x = Math.round(((h(k, 8, 91) * 340 + t * (6 + h(k, 9, 91) * 5) + Math.sin(t * 1.3 + k) * 5) % 340) - 10), y = Math.round(18 + ((h(k, 10, 91) * 150 + t * (7 + h(k, 11, 91) * 5)) % 150)); if (x > 268 && y < 50) continue; R.pset(x, y, k % 3 ? P.r2 : P.r3); if (k % 4 === 0) R.pset(x + 1, y, P.r1); }
  d_mariposa(R, t, 30, 126, P.f1, 1); d_mariposa(R, t, 286, 128, P.bl, 3);
  const piedras = []; for (let k = 0; k < 12; k++) piedras.push([M.piedraX0 + k * 20 + 10, 159]);
  return { suelo: M.suelo, medallones: M.medallones, piedras, hoyo: [hx, M.hoyoY], hoyo2: [hx2, M.hoyoY] };
}

// lo de delante en el muro: la carretilla con tierra (izquierda), el cubo con las varillas de sondeo (derecha) y las
// matas de hierba y tulipanes del primer término
function d_muroDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, P = d_P, vr = hex('#3a8a5a'), vrS = hex('#286a44'), vrL = hex('#5ab07a');
  // la carretilla: la caja verde con su montón de tierra, la rueda, las patas y los mangos
  for (let i = -12; i <= 12; i++) { const hh = Math.round(7 * Math.cos(i / 13 * Math.PI / 2)); for (let j = 0; j <= hh; j++) { const q = h(i, j, 92); pset(22 + i, 156 - j, j === hh ? P.t4 : i > 4 ? P.t1 : q < 0.15 ? P.t1 : q > 0.85 ? P.t2 : P.t0); } }
  R.poligono([[6, 156], [39, 156], [34, 168], [12, 168]], P.k); R.poligono([[8, 157], [37, 157], [33, 167], [13, 167]], vr); rect(8, 157, 37, 158, vrL); R.poligono([[28, 159], [36, 159], [33, 167], [28, 167]], vrS);
  linea(34, 165, 40, 162, P.k); linea(34, 166, 40, 163, P.wL); rect(39, 161, 41, 163, P.k); linea(14, 168, 12, 177, P.k); linea(15, 168, 13, 177, P.gr1); linea(30, 168, 31, 177, P.k);
  disco(8, 173, 5, P.k); disco(8, 173, 3, P.gr3); disco(8, 173, 1, P.gr2); linea(12, 167, 8, 173, P.gr1); pset(6, 171, P.gr1);
  // el cubo de chapa con las varillas de sondeo y una paleta
  for (const [x, a, c] of [[296, 42, 0], [301, 48, 1], [306, 38, 0]]) { linea(x, 160, x + (x - 300) * 0.4, 160 - a, P.gr1); linea(x + 1, 160, x + 1 + (x - 300) * 0.4, 160 - a, P.gr2); const tx = Math.round(x + (x - 300) * 0.4), ty = 160 - a; rect(tx - 3, ty - 1, tx + 4, ty, P.k); rect(tx - 3, ty - 1, tx - 2, ty, P.rojo); rect(tx + 3, ty - 1, tx + 4, ty, P.rojo); }
  R.poligono([[290, 158], [312, 158], [309, 177], [293, 177]], P.k); R.poligono([[291, 159], [311, 159], [308, 176], [294, 176]], P.gr0); R.poligono([[305, 159], [311, 159], [308, 176], [304, 176]], P.gr1); rect(291, 159, 311, 160, P.gr2); rect(293, 165, 309, 165, P.gr1); rect(294, 171, 308, 171, P.gr1); rect(295, 161, 296, 174, P.gr2);
  for (let a = 0; a < Math.PI; a += 0.1) pset(Math.round(301 + Math.cos(a) * 12), Math.round(160 - Math.sin(a) * 4 + 8), P.gr3);
  // las matas del primer término, que el viento mece
  for (let k = 0; k < 46; k++) { const x = 50 + Math.round(h(k, 1, 93) * 232), a = 3 + Math.round(h(k, 2, 93) * 5), s = Math.sin(t * 2 + x * 0.1 + k) * 1.5; linea(x, 179, Math.round(x + s), 179 - a, k % 3 ? P.cS : P.cD); if (k % 2) linea(x + 1, 179, Math.round(x + 1 + s), 180 - a, P.cL); }
  d_tulipanes(R, t, 56, 276, 179, 13, 13, 6, true);
  return {};
}

const d_LOM = [['#8e2f3a', '#6a1f2a', '#b85060'], ['#2e4a7a', '#1e3458', '#5070a8'], ['#2e6a4a', '#1e4a34', '#4e9068'], ['#b08a3a', '#806020', '#d8b460'], ['#6a4a7a', '#4a305a', '#8e6aa0'], ['#a85a2a', '#7a3e1a', '#cc7e48'], ['#d8ccb0', '#a89c80', '#f0e8d0'], ['#3a3a48', '#24242e', '#5a5a6c'], ['#7a8a9a', '#566474', '#9eb0c0'], ['#b84a3a', '#8a3226', '#d87058']].map((a) => a.map(hex));

const d_LEY = [['#b89a6a', '#8a7048', '#d8be8e'], ['#7a2a2a', '#521a1a', '#a04444'], ['#2a3a2a', '#1a261a', '#48604a']].map((a) => a.map(hex));

// una balda de libros entre x0 y x1 con la base en yb: lomos de anchos, altos y colores distintos, con su luz y su
// sombra, tejuelos, algún hueco y algún montón tumbado; ley: tomos de leyes iguales, con sus dos bandas
function d_libros(R, x0, x1, yb, alto, sem, ley) {
  const { rect, pset } = R; let x = x0, i = 0;
  while (x < x1 - 1) { const q = h(i, sem, 101);
    if (!ley && q < 0.06) { x += 2 + Math.floor(h(i, sem, 102) * 3); i++; continue; }
    if (!ley && q > 0.93 && x + 9 <= x1) { for (let k = 0; k < 3; k++) { const [c, cS, cL] = d_LOM[Math.floor(h(i, k, sem + 3) * d_LOM.length)], w = 8 - (k % 2); rect(x, yb - k * 3 - 2, x + w, yb - k * 3, c); rect(x, yb - k * 3, x + w, yb - k * 3, cS); pset(x + 2, yb - k * 3 - 1, cL); } x += 10; i++; continue; }
    const w = ley ? 3 + (i % 4 === 3 ? 1 : 0) : 2 + Math.floor(h(i, sem, 103) * 2.6), hh = ley ? alto - 2 - (h((i / 5) | 0, sem, 104) < 0.3 ? 1 : 0) : Math.round(alto * (0.6 + 0.38 * h(i, sem, 105)));
    if (x + w - 1 > x1) break;
    const [c, cS, cL] = ley ? d_LEY[((i / 6) | 0) % 3 === 2 ? 1 + (sem % 2) : 0] : d_LOM[Math.floor(h(i, sem, 106) * d_LOM.length)];
    rect(x, yb - hh, x + w - 1, yb, c); rect(x + w - 1, yb - hh, x + w - 1, yb, cS); pset(x, yb - hh, cL);
    if (ley) { rect(x, yb - hh + 2, x + w - 2, yb - hh + 3, d_LEY[1][0]); rect(x, yb - hh + 6, x + w - 2, yb - hh + 6, d_P.k); pset(x, yb - 2, d_P.oro); }
    else if (w >= 3) { pset(x + 1, yb - hh + 2, cL); if (q > 0.5) rect(x, yb - 4, x + w - 2, yb - 3, d_P.bl); else pset(x + 1, yb - 2, d_P.oro); }
    else if (q > 0.6) pset(x, yb - 3, d_P.bl);
    x += w; i++; }
}

// una estantería de madera de n baldas llenas de libros (o.ley: tomos de leyes), con su cornisa y sus costados
function d_estante(R, x0, y0, x1, y1, n, sem, o = {}) {
  const { rect } = R, P = d_P, ah = (y1 - y0 - 2) / n;
  rect(x0, y0, x1, y1, P.wD); rect(x0 + 2, y0 + 2, x1 - 2, y1, P.wDD);
  for (let k = 0; k < n; k++) { const yb = Math.round(y0 + (k + 1) * ah) - 1;
    d_libros(R, x0 + 3, x1 - 3, yb, Math.round(ah) - 5, sem * 10 + k, o.ley);
    rect(x0 + 2, yb + 1, x1 - 2, yb + 2, P.w0); rect(x0 + 2, yb + 1, x1 - 2, yb + 1, P.wL); }
  rect(x0, y0, x0 + 1, y1, P.w0); rect(x0, y0, x0, y1, P.wL); rect(x1 - 1, y0, x1, y1, P.wS);
  rect(x0 - 1, y0 - 3, x1 + 1, y0 + 1, P.w0); rect(x0 - 1, y0 - 3, x1 + 1, y0 - 3, P.wL); rect(x0 - 1, y0 + 1, x1 + 1, y0 + 1, P.wD);
}

// madera con vetas: c base, cS veta oscura, cL veta clara (vetas horizontales, o verticales con vert)
function d_veta(R, x0, y0, x1, y1, c, cS, cL, k = 0, vert = false) {
  d_tex(R, x0, y0, x1, y1, (x, y) => { const a = vert ? y : x, b = vert ? x : y, q = h((a + Math.round(Math.sin(b * 0.7 + k) * 3)) >> 3, b, 110 + k); return q < 0.14 ? cS : q > 0.9 ? cL : c; });
}

// el flexo de banquero: pie y tallo de latón y la tulipa de cristal verde, con la bombilla encendida; (x, y) = pie
function d_flexo(R, x, y) {
  const { rect, pset } = R, P = d_P;
  rect(x - 4, y - 1, x + 4, y, P.latonS); rect(x - 3, y - 2, x + 3, y - 1, P.laton); rect(x - 3, y - 2, x + 1, y - 2, P.latonL); rect(x, y - 9, x, y - 3, P.laton); pset(x + 1, y - 6, P.latonS);
  rect(x - 7, y - 13, x + 7, y - 10, P.lam); rect(x - 6, y - 14, x + 6, y - 14, P.lam); rect(x - 6, y - 14, x + 2, y - 13, P.lamL); rect(x - 7, y - 10, x + 7, y - 10, P.lamS); rect(x + 5, y - 13, x + 7, y - 11, P.lamS);
  pset(x - 8, y - 11, P.laton); pset(x + 8, y - 11, P.laton); rect(x - 5, y - 9, x + 5, y - 9, P.luz); pset(x + 3, y - 8, P.laton); pset(x + 3, y - 7, P.laton); pset(x + 3, y - 6, P.latonL);
}

// un charco de luz cálida, tramado, sobre lo que ya hay pintado: elipse (cx, cy, rx, ry) con fuerza a
function d_luz(R, cx, cy, rx, ry, a = 0.4, col = d_P.luz) {
  const B = R.buf;
  for (let y = Math.max(0, cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, cx - rx); x <= Math.min(319, cx + rx); x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e < 1 && d_um(x, y) < (1 - e) * 1.3) B[y * 320 + x] = d_mez(B[y * 320 + x], col, a); }
}

// un reloj de pared que anda: el aro, la esfera con las doce marcas y las tres agujas
function d_reloj(R, cx, cy, r, t, aro = d_P.wD, h0 = 10.2) {
  R.disco(cx, cy, r + 1, d_P.k); R.disco(cx, cy, r, aro); R.disco(cx, cy, r - 2, d_P.bl); R.disco(cx + 1, cy + 1, r - 3, hex('#ece6d6')); R.disco(cx, cy, r - 3, d_P.bl);
  for (let k = 0; k < 12; k++) R.pset(Math.round(cx + Math.cos(k * Math.PI / 6) * (r - 3)), Math.round(cy + Math.sin(k * Math.PI / 6) * (r - 3)), k % 3 ? d_P.gr0 : d_P.k);
  const am = (h0 % 1) * 6.283 + t * 0.02 - 1.571, ah = h0 / 12 * 6.283 - 1.571, as = Math.floor(t) / 60 * 6.283 - 1.571;
  R.linea(cx, cy, Math.round(cx + Math.cos(ah) * (r - 5)), Math.round(cy + Math.sin(ah) * (r - 5)), d_P.k); R.linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 3)), Math.round(cy + Math.sin(am) * (r - 3)), d_P.k);
  R.linea(cx, cy, Math.round(cx + Math.cos(as) * (r - 3)), Math.round(cy + Math.sin(as) * (r - 3)), d_P.rojo); R.pset(cx, cy, d_P.k);
}

// un coche pequeño recortado a cl, con el morro hacia d
function d_coche(R, cl, x, y, c, d = 1) {
  d_rc(R, cl, x, y - 4, x + 12, y - 1, c); d_rc(R, cl, x + 3, y - 7, x + 9, y - 5, c); d_rc(R, cl, x + 4, y - 6, x + 5, y - 5, d_P.ci3); d_rc(R, cl, x + 7, y - 6, x + 8, y - 5, d_P.ci3); d_rc(R, cl, x, y - 1, x + 12, y - 1, d_mez(c, d_P.k, 0.4));
  d_rc(R, cl, x + 2, y - 1, x + 3, y, d_P.k); d_rc(R, cl, x + 9, y - 1, x + 10, y, d_P.k); d_rc(R, cl, d > 0 ? x + 12 : x, y - 3, d > 0 ? x + 12 : x, y - 3, d_P.oroL);
}

// lo que se ve por una ventana, recortado a cl = [x0, y0, x1, y1]. tipo 'ciudad': el cielo con nubes, un edificio de
// ladrillo y otro de piedra con sus ventanas, árboles de la acera, una farola y la calle con coches y un autobús;
// 'barrio': las casas de madera de un barrio de Nueva Jersey, un árbol, el césped, la valla blanca, el buzón y un coche
function d_vista(R, t, cl, tipo) {
  const [x0, y0, x1, y1] = cl, P = d_P, H = y1 - y0, rc = (a, b, c, d, col) => d_rc(R, cl, a, b, c, d, col);
  d_tex(R, x0, y0, x1, y1, (x, y) => { const u = (y - y0) / H * 3.2, i = Math.min(3, Math.floor(u)), f = u - i; return [P.ci1, P.ci2, P.ci3, P.ci4][f > 0.7 && i < 3 && d_um(x, y) < (f - 0.7) / 0.3 ? i + 1 : i]; });
  R.recorte(cl);
  const W = x1 - x0 + 70;
  d_nube(R, Math.round(x0 - 35 + ((t * 2.4 + 30) % W)), y0 + 11, 24, 41); d_nube(R, Math.round(x0 - 35 + ((t * 1.5 + 70) % W)), y0 + 24, 16, 42);
  { const u = (t * 0.09 + 0.3) % 1, bx = Math.round(x0 - 6 + u * (x1 - x0 + 12)), by = y0 + 16 + Math.round(Math.sin(t * 1.3) * 3), al = Math.floor(t * 6) % 2; R.pset(bx, by, P.ave); R.pset(bx - 1, by - al, P.ave); R.pset(bx + 1, by - al, P.ave); }
  if (tipo === 'ciudad') {
    const b1 = x0 + 36, yb = y1 - 13;
    rc(x0, y0 + 18, b1, yb, P.ld0); rc(b1 - 3, y0 + 18, b1, yb, P.ld1); rc(x0, y0 + 16, b1 + 1, y0 + 18, P.m0); rc(x0, y0 + 18, b1 + 1, y0 + 18, P.m3);
    for (let y = y0 + 20; y < yb; y += 2) for (let x = x0 + (y % 4 ? 0 : 2); x < b1 - 3; x += 4) R.pset(x, y, P.ld2);
    for (let f = 0; f < 5; f++) for (let c = 0; c < 4; c++) { const wx = x0 + 3 + c * 8, wy = y0 + 22 + f * 9; if (wy + 5 > yb) continue; rc(wx - 1, wy - 1, wx + 4, wy + 5, P.m0); rc(wx, wy, wx + 3, wy + 4, h(f, c, 111) < 0.25 ? P.oroL : hex('#34485e')); rc(wx, wy + 2, wx + 3, wy + 2, P.m0); }
    const b2 = x1 - 32; rc(b2, y0 + 32, x1, yb, P.m0); rc(b2, y0 + 30, x1, y0 + 32, P.m2); rc(b2, y0 + 33, x1, y0 + 33, P.m3); for (let c = 0; c < 4; c++) { const wx = b2 + 3 + c * 8; rc(wx - 1, y0 + 36, wx - 1, yb, P.m2); rc(wx + 4, y0 + 36, wx + 4, yb, P.m3); for (let f = 0; f < 3; f++) rc(wx, y0 + 37 + f * 9, wx + 3, y0 + 42 + f * 9, f === 1 && c === 2 ? P.oroL : hex('#4a5e74')); }
    rc(b1 + 1, y0 + 40, b2 - 1, yb, hex('#8a9cb4')); for (let y = y0 + 43; y < yb; y += 4) for (let x = b1 + 3; x < b2 - 2; x += 3) R.pset(x, y, hex('#b4c4d8'));
    for (const [tx, r, k] of [[x0 + 14, 7, 0], [x0 + 46, 8, 1], [x1 - 12, 7, 2]]) { const s = Math.round(Math.sin(t * 1.2 + k * 2)); rc(tx, yb - 8, tx + 1, yb, P.troncoS); R.disco(tx + 1, yb - 12, r, P.v0); R.disco(tx + s, yb - 14, r - 2, P.v1); R.disco(tx - 2 + s, yb - 16, r - 5, P.v2); R.pset(tx + 3 + s, yb - 15, P.v3); }
    rc(x0 + 62, yb - 22, x0 + 62, yb, P.gr3); rc(x0 + 60, yb - 24, x0 + 64, yb - 22, P.k); rc(x0 + 61, yb - 23, x0 + 63, yb - 23, P.oroL);
    rc(x0, yb, x1, yb + 2, hex('#b8b4bc')); rc(x0, yb + 3, x1, y1, hex('#4a4a5a')); for (let x = x0 + 2; x < x1; x += 9) rc(x, yb + 8, x + 4, yb + 8, hex('#e8d84a'));
    { const u = (t * 0.045 + 0.2) % 1, bx = Math.round(x1 + 10 - u * (x1 - x0 + 60)); rc(bx, yb - 6, bx + 30, yb + 6, hex('#e0a030')); rc(bx, yb + 4, bx + 30, yb + 6, hex('#b87a1c')); rc(bx, yb - 6, bx + 30, yb - 6, hex('#f4c860')); for (let k = 0; k < 5; k++) rc(bx + 2 + k * 6, yb - 4, bx + 5 + k * 6, yb, P.ci3); rc(bx + 4, yb + 6, bx + 7, yb + 8, P.k); rc(bx + 22, yb + 6, bx + 25, yb + 8, P.k); }
    d_coche(R, cl, Math.round(x0 - 16 + ((t * 0.11 + 0.5) % 1) * (x1 - x0 + 32)), y1 - 1, P.rojo, 1); d_coche(R, cl, Math.round(x0 - 16 + ((t * 0.083 + 0.1) % 1) * (x1 - x0 + 32)), y1 - 1, hex('#3a6a9a'), 1);
  } else {
    const yb = y1 - 12;
    for (let x = x0; x <= x1; x++) { const yc = Math.round(yb - 20 - 3 * Math.sin(x * 0.2) - 2 * Math.sin(x * 0.53 + 1)); for (let y = yc; y <= yb; y++) R.pset(x, y, y === yc ? P.v2 : h(x, y, 112) < 0.25 ? P.v0 : P.v1); }
    // la casa amarilla, de tablas, con su tejado a dos aguas, la chimenea y la puerta roja
    { const a = x0 + 3, b = x0 + 29; rc(b - 6, yb - 34, b - 3, yb - 24, P.ld0); rc(b - 7, yb - 35, b - 2, yb - 34, P.ld1);
      R.poligono([[a - 2, yb - 20], [(a + b) / 2, yb - 33], [b + 2, yb - 20]], hex('#5a5a6a')); R.linea(a - 2, yb - 20, (a + b) >> 1, yb - 33, hex('#7a7a8c')); for (let y = yb - 30; y < yb - 20; y += 3) R.linea((a + b) / 2 - (y - yb + 33) * 1.0, y, (a + b) / 2 + (y - yb + 33) * 1.0, y, hex('#4a4a58'));
      rc(a, yb - 20, b, yb, hex('#ecd890')); for (let y = yb - 18; y < yb; y += 3) rc(a, y, b, y, hex('#d0b868')); rc(b - 2, yb - 20, b, yb, hex('#c8b060'));
      rc(a + 3, yb - 16, a + 9, yb - 9, P.bl); rc(a + 4, yb - 15, a + 8, yb - 10, hex('#4a6a8a')); rc(a + 6, yb - 15, a + 6, yb - 10, P.bl); rc(a + 13, yb - 12, a + 18, yb, P.bl); rc(a + 14, yb - 11, a + 17, yb, hex('#b03a3a')); R.pset(a + 16, yb - 6, P.oroL);
      rc((a + b) / 2 - 2, yb - 28, (a + b) / 2 + 1, yb - 24, P.bl); rc((a + b) / 2 - 1, yb - 27, (a + b) / 2, yb - 25, hex('#4a6a8a')); }
    // la casa azul, con el garaje
    { const a = x0 + 38, b = x1 - 1; R.poligono([[a - 2, yb - 16], [a + 12, yb - 27], [b + 4, yb - 27], [b + 4, yb - 16]], hex('#6a4a3a')); R.linea(a - 2, yb - 16, a + 12, yb - 27, hex('#8a6a54')); for (let y = yb - 25; y < yb - 16; y += 3) R.linea(a + 2, y, b + 4, y, hex('#5a3e30'));
      rc(a, yb - 16, b, yb, hex('#8ab0c8')); for (let y = yb - 14; y < yb; y += 3) rc(a, y, b, y, hex('#6e96b0')); rc(a + 2, yb - 13, a + 8, yb - 7, P.bl); rc(a + 3, yb - 12, a + 7, yb - 8, t % 9 > 6 ? P.oroL : hex('#4a6a8a')); rc(a + 5, yb - 12, a + 5, yb - 8, P.bl);
      rc(a + 12, yb - 11, b - 2, yb, P.bl); for (let y = yb - 9; y < yb; y += 3) rc(a + 13, y, b - 3, y, P.gr2); }
    // el árbol de entre las dos casas, que se mece
    { const tx = x0 + 34, s = Math.round(Math.sin(t * 1.1)); rc(tx - 1, yb - 14, tx, yb, P.troncoS); R.disco(tx, yb - 20, 8, P.v0); R.disco(tx - 1 + s, yb - 22, 6, P.vj1); R.disco(tx - 3 + s, yb - 24, 3, P.vj2); R.pset(tx + 2 + s, yb - 23, P.vj3); R.pset(tx - 4 + s, yb - 19, P.vj3); }
    rc(x0, yb, x1, yb + 4, P.c0); for (let x = x0; x <= x1; x += 2) R.pset(x + (Math.sin(t * 2 + x) > 0.5 ? 1 : 0), yb + 1 + (x % 3), P.cL);
    for (let x = x0; x <= x1; x += 3) rc(x, yb + 2, x + 1, yb + 7, P.bl); rc(x0, yb + 4, x1, yb + 4, P.bl); for (let x = x0; x <= x1; x += 3) R.pset(x + 2, yb + 6, P.c0);
    rc(x0 + 52, yb - 1, x0 + 52, yb + 4, P.gr3); rc(x0 + 50, yb - 3, x0 + 54, yb - 1, P.azul); R.pset(x0 + 55, yb - 3, P.rojo);
    rc(x0, yb + 8, x1, yb + 8, hex('#b8b4bc')); rc(x0, yb + 9, x1, y1, hex('#4a4a5a'));
    { const u = (t * 0.07 + 0.35) % 1; if (u < 0.6) d_coche(R, cl, Math.round(x0 - 16 + u / 0.6 * (x1 - x0 + 32)), y1, hex('#7a9a6a'), 1); }
  }
  R.recorte(null);
}

// la pantalla de un ordenador de 1997: un navegador gris con su barra azul, que va cargando una imagen (un mapa) línea a
// línea y vuelve a empezar; debajo, la barra de progreso
function d_pantalla97(R, t, x0, y0, x1, y1) {
  const { rect, pset } = R, P = d_P, u = (t * 0.14) % 1.25, p = Math.min(1, u);
  rect(x0, y0, x1, y1, hex('#c8c8c8')); rect(x0, y0, x1, y0 + 1, hex('#1a2a8a')); pset(x1 - 1, y0, hex('#c8c8c8')); pset(x1 - 3, y0, hex('#c8c8c8'));
  for (let x = x0 + 1; x < x0 + 12; x += 3) pset(x, y0 + 3, hex('#6a6a6a')); rect(x0 + 13, y0 + 3, x1 - 1, y0 + 3, P.bl);
  const ix0 = x0 + 1, iy0 = y0 + 5, ix1 = x1 - 1, iy1 = y1 - 3, n = Math.round((iy1 - iy0 + 1) * p);
  for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) { let c;
    if (y - iy0 < n) { const rio = Math.abs((x - ix0) - (y - iy0) * 0.9 - 4) < 1.2; c = rio ? P.mapaA : (x - ix0 > 13 && y - iy0 < 5) ? P.mapaV : ((x + y) % 5 === 0 ? P.mapaS : P.mapa); if (x === ix0 + 16 && y === iy0 + 7) c = P.rojo; }
    else c = ((x + y) & 1) ? hex('#d8d8d8') : P.bl; pset(x, y, c); }
  rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, hex('#8a8a8a')); rect(x0 + 1, y1 - 1, Math.round(x0 + 1 + (x1 - x0 - 2) * p), y1 - 1, hex('#2a8a3a'));
  const sy = y0 + (Math.floor(t * 9) % (y1 - y0 + 1)); for (let x = x0; x <= x1; x += 2) pset(x, sy, d_mez(R.pget(x, sy), P.bl, 0.35));   // el barrido del tubo
  pset(x0, y0, P.bl);
}

// un globo terráqueo que gira despacio sobre su pie de latón; (cx, cy) el centro de la bola, r el radio
function d_globo(R, cx, cy, r, t) {
  const P = d_P;
  R.rect(cx - 4, cy + r + 5, cx + 4, cy + r + 6, P.latonS); R.rect(cx - 3, cy + r + 4, cx + 3, cy + r + 4, P.laton); R.rect(cx, cy + r, cx, cy + r + 4, P.laton);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.3) continue; const w = Math.sqrt(Math.max(0.01, r * r - j * j)), lon = Math.asin(Math.max(-1, Math.min(1, i / w))) + t * 0.5, lat = j / r;
    const tierra = Math.sin(lon * 2 + lat * 2.4) + Math.sin(lon * 3.1 - lat * 3 + 2) * 0.7 + Math.sin(lat * 5 + lon) * 0.4 > 0.55; let c = tierra ? (h(i, j, 113) < 0.3 ? hex('#c8b070') : hex('#7aa85a')) : hex('#3a78b8');
    if (i + j > r * 0.75) c = d_mez(c, P.k, 0.3); else if (i + j < -r * 0.9) c = d_mez(c, P.bl, 0.35); if (Math.abs(lat) > 0.86) c = P.bl; R.pset(cx + i, cy + j, c); }
  for (let a = -1.9; a < 1.9; a += 0.1) R.pset(Math.round(cx + Math.cos(a + 0.35) * (r + 2)), Math.round(cy + Math.sin(a + 0.35) * (r + 2)), a < 0 ? P.latonL : P.laton);
  R.pset(cx - Math.round(r * 0.4), cy - Math.round(r * 0.5), P.bl);
}

// un lector pequeño sentado a la mesa del fondo: asoman la cabeza y los hombros; lee, cabecea y pasa la página
function d_lector(R, x, y, t, pelo, ropa) {
  const P = d_P, ca = Math.sin(t * 0.7) > 0.6 ? 1 : 0, pasa = (t % 4.5) < 0.5;
  R.rect(x - 5, y - 8, x + 5, y, ropa); R.rect(x - 5, y - 8, x - 4, y, d_mez(ropa, P.bl, 0.25)); R.rect(x + 4, y - 7, x + 5, y, d_mez(ropa, P.k, 0.3)); R.rect(x - 1, y - 9, x + 1, y - 8, P.pielS);
  R.rect(x - 3, y - 16 + ca, x + 3, y - 10 + ca, P.piel); R.rect(x - 4, y - 17 + ca, x + 4, y - 14 + ca, pelo); R.rect(x - 4, y - 14 + ca, x - 4, y - 11 + ca, pelo); R.rect(x + 4, y - 14 + ca, x + 4, y - 12 + ca, pelo); R.pset(x - 2, y - 12 + ca, P.k); R.pset(x + 2, y - 12 + ca, P.k);
  R.rect(x - 7, y - 1, x + 7, y + 1, P.bl); R.rect(x, y - 1, x, y + 1, P.gr0); R.rect(x - 7, y + 1, x + 7, y + 1, P.gr2); for (const dx of [-5, -3, 2, 4]) R.pset(x + dx, y, P.gr0);
  if (pasa) { const u = (t % 4.5) / 0.5, px = Math.round(x + 6 - u * 12); R.linea(x, y, px, y - 2 - Math.round(Math.sin(u * Math.PI) * 3), P.bl); }
  R.rect(x - 7, y - 3, x - 6, y - 1, P.piel); R.rect(x + 6, y - 3, x + 7, y - 1, P.piel);
}

// la geometría de la biblioteca: el suelo, la pantalla del ordenador, el ventanal, el fichero y las mesas
const d_BIB = { suelo: 152, pantalla: [252, 95, 276, 107], ventana: [119, 22, 201, 97], fichero: [8, 60], mesaPC: [226, 308], mesa: [96, 206, 146] };

// lo fijo de la biblioteca (se pinta una vez): pared, parqué, alfombra, estanterías, escalera, marco del ventanal,
// lámparas, la mesa del fondo, el fichero y la mesa del ordenador
function d_biblioFija(R) {
  const { rect, pset, disco, linea } = R, P = d_P;
  // la pared de yeso, con la moldura del techo y el zócalo
  d_tex(R, 0, 0, 319, 117, (x, y) => { if (y < 4) return h(x >> 3, y, 114) < 0.2 ? P.wS : P.w0; if (y === 4) return P.wL; if (y === 5) return P.wD; const q = h(x >> 1, y >> 1, 115); return q < 0.06 ? P.pa1 : q > 0.95 ? P.pa2 : (y > 96 && d_um(x, y) < (y - 96) / 40) ? P.pa1 : P.pa0; });
  rect(0, 112, 319, 117, P.wS); rect(0, 112, 319, 112, P.wL); rect(0, 117, 319, 117, P.wDD);
  // el parqué, con la luz de la ventana y la alfombra
  const ys = [118, 122, 127, 133, 140, 148, 157, 167, 180];
  d_tex(R, 0, 118, 319, 179, (x, y) => { const fila = ys.findIndex((v) => y < v) - 1, xx = x + fila * 37, tb = (xx / 54) | 0, q = h(tb, fila, 116), n = h(x >> 2, y, 117);
    let c = ys.includes(y) ? P.pqS : xx % 54 === 0 ? P.pqS : q < 0.3 ? P.pq1 : q > 0.75 ? P.pq2 : P.pq0; if (c !== P.pqS && n < 0.1) c = P.pq1; else if (c !== P.pqS && n > 0.94) c = P.pq2;
    const xl = 112 - (y - 118) * 1.1, xr = 200 - (y - 118) * 0.25; if (y < 162 && x > xl && x < xr) { const v = (x - xl) / (xr - xl) * 3; if (v % 1 > 0.07 && d_um(x, y) < 0.95 - (y - 118) / 70) c = c === P.pqS ? P.pq0 : P.pqL; }
    return c; });
  d_tex(R, 44, 137, 276, 169, (x, y) => { const bx = Math.min(x - 44, 276 - x), by = Math.min(y - 137, 169 - y), b = Math.min(bx, by);
    if (bx < 2) return (y & 1) ? P.alO : 0; if (b < 2 + (bx < 4 ? 2 : 0)) return P.al1; if (b === 4 || b === 6) return P.alO; if (b === 5) return P.alA;
    const u = Math.abs(((x - 160) % 24 + 24) % 24 - 12), v = Math.abs((y - 153)); if (Math.abs(u + v * 1.5 - 9) < 1) return P.alO; if (u + v * 1.5 < 5) return P.alA; return h(x, y, 118) < 0.12 ? P.al1 : (x + y) % 7 === 0 ? P.al2 : P.al0; });
  // la estantería grande de la izquierda (con el halo de las lámparas en la pared) y la escalera de mano
  for (const lx of [30, 64]) d_luz(R, lx, 22, 24, 14, 0.3);
  d_estante(R, 2, 25, 106, 111, 5, 1); rect(54, 25, 55, 111, P.w0); rect(54, 25, 54, 111, P.wL);
  for (const dx of [0, 7]) { linea(82 + dx, 113, 92 + dx, 28, P.wS); linea(83 + dx, 113, 93 + dx, 28, P.wL); }
  for (let k = 0; k < 9; k++) { const y = 106 - k * 9, x = Math.round(83 + (113 - y) * 10 / 85); rect(x, y, x + 7, y, P.wL); rect(x, y + 1, x + 7, y + 1, P.wS); }
  // el marco de la ventana (el hueco lo pinta la vista) y su repisa con una planta y libros
  rect(113, 16, 207, 102, P.wD); rect(115, 18, 205, 100, P.w0); rect(115, 18, 205, 18, P.wL); rect(115, 18, 115, 100, P.wL); rect(118, 21, 202, 98, P.wD); rect(119, 22, 201, 97, P.ci2);
  rect(111, 101, 209, 103, P.wL); rect(111, 104, 209, 104, P.wS); rect(113, 105, 207, 105, P.paS);
  // la estantería de la derecha, el reloj y el mapa enmarcado
  d_estante(R, 212, 53, 318, 111, 3, 2);
  rect(244, 19, 272, 43, P.wD); rect(245, 20, 271, 42, P.w0); rect(247, 22, 269, 40, P.mapaA); for (const [x, y, r] of [[253, 29, 4], [256, 34, 3], [263, 28, 4], [266, 33, 3], [262, 36, 2]]) disco(x, y, r, P.mapaV); for (let x = 248; x < 269; x += 5) for (let y = 23; y < 40; y += 2) pset(x, y, d_mez(P.mapaA, P.bl, 0.4)); rect(247, 22, 269, 22, d_mez(P.mapaA, P.k, 0.3));
  // las lámparas colgantes de cristal verde y su halo en la pared
  for (const lx of [30, 64]) { rect(lx, 6, lx, 14, P.wS); rect(lx - 5, 17, lx + 5, 19, P.lam); rect(lx - 4, 16, lx + 4, 16, P.lam); rect(lx - 2, 15, lx + 2, 15, P.laton); rect(lx - 4, 16, lx, 17, P.lamL); rect(lx - 5, 19, lx + 5, 19, P.lamS); rect(lx - 3, 20, lx + 3, 20, P.luz); }
  // la mesa del fondo, bajo la ventana, con sus sillas, un flexo y libros
  for (const sx of [150, 180]) { rect(sx - 8, 104, sx + 8, 124, P.wS); rect(sx - 7, 105, sx + 7, 123, P.wDD); for (const dx of [-5, -1, 3]) { rect(sx + dx, 105, sx + dx + 2, 123, P.w0); rect(sx + dx, 105, sx + dx, 123, P.wL); } rect(sx - 8, 104, sx + 8, 105, P.wL); }
  rect(121, 124, 199, 126, P.wLL); rect(121, 124, 199, 124, hex('#e0b47e')); rect(121, 127, 199, 128, P.wS); rect(123, 129, 197, 131, P.wD); rect(123, 129, 126, 141, P.w0); rect(194, 129, 197, 141, P.w0); rect(126, 129, 126, 141, P.wD); rect(194, 129, 194, 141, P.wD);
  d_tex(R, 118, 141, 202, 143, (x, y) => (d_um(x, y) < 0.5 ? P.pqS : 0));
  d_flexo(R, 132, 124); d_luz(R, 132, 124, 12, 3, 0.45);
  for (let k = 0; k < 3; k++) { const [c, cS] = d_LOM[(k * 3 + 1) % 10]; rect(184 - k, 121 - k * 2, 195 - k, 122 - k * 2, c); rect(184 - k, 122 - k * 2, 195 - k, 122 - k * 2, cS); }
  // el fichero de cajoncitos, con uno abierto; encima, el pie del globo y una planta
  rect(8, 98, 60, 148, P.wD); rect(9, 99, 59, 101, P.wLL); rect(9, 102, 59, 147, P.w0); rect(57, 102, 59, 147, P.wS);
  for (let f = 0; f < 5; f++) for (let c = 0; c < 4; c++) { const x = 11 + c * 12, y = 104 + f * 8; rect(x, y, x + 10, y + 6, P.wD); rect(x + 1, y + 1, x + 9, y + 5, h(f, c, 119) < 0.3 ? P.wL : P.w0); rect(x + 1, y + 1, x + 9, y + 1, P.wLL); rect(x + 3, y + 2, x + 7, y + 3, P.bl); rect(x + 4, y + 5, x + 6, y + 5, P.latonL); pset(x + 5, y + 4, P.laton); }
  rect(34, 119, 46, 127, P.wD); rect(35, 120, 45, 126, P.wLL); rect(36, 117, 44, 119, P.bl); for (let x = 37; x < 44; x += 2) pset(x, 117, P.gr2); rect(38, 123, 42, 124, P.bl); rect(39, 126, 41, 126, P.latonL); rect(34, 128, 46, 128, P.wDD);
  rect(10, 148, 13, 152, P.wD); rect(55, 148, 58, 152, P.wD); d_tex(R, 6, 152, 62, 154, (x, y) => (d_um(x, y) < 0.55 ? P.pqS : 0));
  rect(45, 92, 53, 98, hex('#b8603a')); rect(45, 92, 53, 92, hex('#d88050')); rect(51, 93, 53, 98, hex('#8a4428')); for (let k = 0; k < 12; k++) { const a = -0.3 - h(k, 1, 120) * 2.5, d = 4 + h(k, 2, 120) * 8, x = Math.round(49 + Math.cos(a) * d), y = Math.round(92 + Math.sin(a) * d); linea(49, 92, x, y, k % 2 ? P.v0 : P.v1); pset(x, y, P.v2); }
  // la mesa del ordenador beige: el monitor, la caja, el teclado, el ratón, el módem, los disquetes y la papelera
  rect(226, 126, 308, 129, P.wLL); rect(226, 126, 308, 126, hex('#e6c090')); rect(226, 130, 308, 131, P.wS); rect(226, 132, 229, 152, P.w0); rect(305, 132, 308, 152, P.w0); rect(229, 132, 229, 152, P.wD); rect(305, 132, 305, 152, P.wD);
  d_veta(R, 230, 132, 304, 145, P.w0, P.wS, P.wL, 3); rect(230, 132, 304, 132, P.wD); rect(230, 146, 304, 146, P.wDD); d_tex(R, 224, 152, 310, 154, (x, y) => (d_um(x, y) < 0.55 ? P.pqS : 0));
  linea(296, 126, 300, 112, P.gr3); rect(298, 106, 303, 111, P.be2); rect(300, 108, 301, 109, P.gr3);   // el cable del teléfono, a su roseta
  rect(243, 116, 285, 125, P.k); rect(244, 117, 284, 124, P.be0); rect(244, 117, 284, 117, P.be2); rect(244, 123, 284, 124, P.be1); rect(266, 120, 280, 120, P.k); rect(266, 121, 280, 121, P.beS); rect(248, 119, 258, 122, P.be1); for (let x = 249; x < 258; x += 2) rect(x, 119, x, 122, P.beS); pset(282, 122, hex('#3ad85a'));
  rect(258, 113, 270, 115, P.be1); rect(256, 115, 272, 116, P.beS);
  rect(248, 90, 280, 113, P.k); rect(249, 91, 279, 112, P.be0); rect(249, 91, 279, 91, P.be2); rect(249, 91, 249, 112, P.be2); rect(277, 92, 279, 112, P.be1); rect(249, 111, 279, 112, P.be1); rect(251, 94, 277, 108, P.k); rect(252, 95, 276, 107, P.crt); pset(275, 110, hex('#3ad85a')); rect(252, 110, 256, 110, P.beS);
  rect(246, 125, 278, 128, P.k); rect(247, 125, 277, 127, P.be2); for (let x = 248; x < 277; x += 2) { pset(x, 126, P.be1); pset(x + 1, 127, P.beS); } rect(256, 127, 268, 127, P.be0);
  rect(280, 124, 287, 128, hex('#3a5a8a')); rect(282, 125, 285, 127, P.k); rect(282, 125, 284, 126, P.be2); linea(284, 124, 286, 118, P.gr1);
  rect(288, 120, 303, 125, P.k); rect(289, 121, 302, 124, P.gr1); rect(289, 121, 302, 121, P.gr2);
  for (let k = 0; k < 4; k++) { rect(231, 123 - k * 2, 239, 124 - k * 2, [hex('#2a2a3a'), P.azul, P.rojo, hex('#2a2a3a')][k]); rect(233, 123 - k * 2, 236, 123 - k * 2, P.gr2); }
  rect(234, 142, 244, 152, P.gr3); for (let y = 143; y < 152; y += 2) for (let x = 235 + (y % 4 ? 0 : 1); x < 244; x += 2) pset(x, y, P.gr2); rect(233, 141, 245, 141, P.gr2); disco(238, 140, 2, P.bl); disco(241, 139, 2, P.mapa);
}

// la biblioteca: lo fijo y la vida animada (la calle, el lector, el globo, el reloj, la pantalla, el módem, el polvo)
function d_biblioteca(R, t, o) {
  const P = d_P, G = d_BIB, V = G.ventana;
  R.copiar(d_fijo(R, 'biblio', () => d_biblioFija(R)));
  // lo que se ve por el ventanal, sus parteluces, el reflejo del cristal y lo de la repisa
  d_vista(R, t, V, 'ciudad');
  for (let k = 0; k < 14; k++) { const x = V[0] + 8 + k, y = V[1] + 2; for (let j = 0; j < 30; j++) if ((j + k) % 3 === 0) { const xx = x + j * 0.5 | 0, yy = y + j; R.pset(xx, yy, d_mez(R.pget(xx, yy), P.bl, 0.3)); } }
  for (const x of [146, 174]) { R.rect(x, V[1], x + 1, V[3], P.w0); R.rect(x, V[1], x, V[3], P.wL); } for (const y of [46, 72]) { R.rect(V[0], y, V[2], y + 1, P.w0); R.rect(V[0], y, V[2], y, P.wL); }
  R.rect(123, 96, 131, 100, hex('#b8603a')); R.rect(123, 96, 131, 96, hex('#d88050')); for (let k = 0; k < 7; k++) { const s = Math.sin(t * 1.3 + k) * 0.8, x = Math.round(127 + (k - 3) * 2.2 + s), y = 90 - (k % 3) * 2; R.linea(127, 96, x, y, k % 2 ? P.v1 : P.v0); R.pset(x, y, P.v2); }
  for (let k = 0; k < 3; k++) { const [c, cS] = d_LOM[(k * 2 + 4) % 10]; R.rect(184 + k, 98 - k * 2, 196, 99 - k * 2, c); R.rect(184 + k, 99 - k * 2, 196, 99 - k * 2, cS); }
  // el lector de la mesa del fondo
  d_lector(R, 150, 123, t, hex('#5a3a22'), hex('#4a6a9a'));
  // el globo terráqueo, el reloj, la pantalla que carga y el módem que parpadea
  d_globo(R, 24, 81, 10, t); d_reloj(R, 228, 31, 9, t, P.w0, 3.4);
  const [px0, py0, px1, py1] = G.pantalla;
  if (o.sinPantalla) R.rect(px0, py0, px1, py1, P.crtL); else d_pantalla97(R, t, px0, py0, px1, py1);
  R.pset(px0, py0, P.bl); R.pset(px0 + 1, py0, d_mez(P.crt, P.bl, 0.5));
  for (let k = 0; k < 5; k++) { const on = h(Math.floor(t * (5 + k * 2)), k, 121) < (k === 0 ? 1 : 0.55); R.pset(291 + k * 2, 123, on ? (k % 2 ? hex('#3ad85a') : P.rojo) : P.gr3); }
  if (Math.floor(t * 3) % 2) R.pset(280, 122, P.oroL);
  // el polvo en la luz del ventanal
  for (let k = 0; k < 16; k++) { const x = 110 + ((h(k, 1, 122) * 96 + Math.sin(t * 0.4 + k) * 6 + t * 1.5) % 96), y = 150 - ((h(k, 2, 122) * 90 + t * (2 + h(k, 3, 122) * 2)) % 90); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(Math.round(x), Math.round(y), P.luz); }
  return { ...G };
}

// lo de delante en la biblioteca: la mesa de lectura (flexo, mapas desplegados, lupa, libros, fichas) y el carrito de
// libros de la derecha
function d_bibliotecaDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, P = d_P;
  R.poligono([[99, 146], [203, 146], [207, 152], [95, 152]], P.wLL); d_tex(R, 96, 147, 206, 152, (x, y) => (x > 95 - (146 - y) * 0.6 && x < 207 + (146 - y) * 0.6 && h(x >> 3, y, 123) < 0.2 ? P.wL : 0)); rect(100, 146, 202, 146, hex('#e6c090'));
  rect(95, 153, 207, 155, P.w0); rect(95, 153, 207, 153, P.wL); rect(95, 156, 207, 156, P.wDD); rect(100, 157, 202, 161, P.wS); rect(100, 161, 202, 161, P.wDD);
  for (const x of [97, 200]) { rect(x, 157, x + 5, 179, P.w0); rect(x, 157, x, 179, P.wL); rect(x + 5, 157, x + 5, 179, P.wD); }
  // el mapa grande desplegado, que cuelga por delante de la mesa
  R.poligono([[122, 146], [178, 146], [182, 152], [118, 152]], P.mapa); rect(118, 153, 182, 164, P.mapa); rect(118, 153, 182, 153, P.mapaS); rect(118, 164, 182, 164, P.mapaS); rect(182, 153, 182, 164, P.mapaS);
  for (const x of [134, 150, 166]) rect(x, 147, x, 163, P.mapaS); rect(118, 158, 182, 158, P.mapaS);
  for (let x = 119; x < 182; x++) { const y = Math.round(156 + Math.sin(x * 0.18) * 3 + (x - 150) * 0.05); pset(x, y, P.mapaA); if (x % 3) pset(x, y + 1, P.mapaA); }
  for (const [x, y, r] of [[128, 161, 2], [170, 150, 2], [142, 149, 1]]) disco(x, y, r, P.mapaV); for (let x = 152; x < 178; x += 3) pset(x, 160 - ((x - 152) >> 2), P.rojo); pset(176, 154, P.rojo); disco(176, 153, 1, P.rojo); for (let k = 0; k < 9; k++) pset(121 + ((k * 13) % 58), 154 + ((k * 5) % 9), P.gr0);
  // la lupa, el lápiz, las fichas y el montón de libros
  disco(190, 148, 3, P.k); disco(190, 148, 2, hex('#c8e8f8')); pset(189, 147, P.bl); linea(192, 150, 196, 152, P.wS);
  linea(104, 150, 114, 148, P.oro); pset(115, 148, P.k); pset(103, 150, P.f2);
  for (let k = 0; k < 3; k++) { const [c, cS, cL] = d_LOM[(k * 3 + 2) % 10]; rect(186 - k, 143 - k * 3, 200 - k, 145 - k * 3, c); rect(186 - k, 145 - k * 3, 200 - k, 145 - k * 3, cS); rect(187 - k, 143 - k * 3, 190 - k, 143 - k * 3, cL); }
  // el flexo verde, con su charco de luz sobre la mesa
  d_luz(R, 108, 149, 13, 3, 0.4); d_flexo(R, 108, 148);
  // el carrito de devoluciones, con dos baldas de libros
  rect(288, 150, 289, 177, P.gr1); rect(316, 150, 317, 177, P.gr1); rect(288, 150, 288, 177, P.gr2);
  for (const y of [160, 174]) { d_libros(R, 291, 314, y, 9, 7 + y); rect(288, y + 1, 317, y + 2, P.gr0); rect(288, y + 1, 317, y + 1, P.gr2); }
  disco(290, 178, 1, P.k); disco(315, 178, 1, P.k); rect(286, 149, 290, 149, P.gr3);
  return {};
}

// la geometría del despacho: el suelo, la ventana, el mapa, el escritorio, el teléfono, el sillón y el libro
const d_DES = { suelo: 150, ventana: [33, 27, 95, 86], mapa: [168, 20, 242, 60], escritorio: [60, 238, 142], telefono: [212, 143], sillon: 180, libro: [120, 147] };

// un diploma enmarcado, sin letras: el paspartú, renglones de rayas, el sello con su cinta y la firma
function d_diploma(R, x0, y0, x1, y1, sello, k) {
  const { rect, pset, disco } = R, P = d_P;
  rect(x0, y0, x1, y1, P.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, k % 2 ? P.oroS : P.wD); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, k % 2 ? P.oro : P.w0); rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, P.bl); rect(x0 + 2, y0 + 2, x1 - 2, y0 + 2, P.gr2);
  const mx = (x0 + x1) >> 1; rect(mx - 6, y0 + 5, mx + 6, y0 + 5, P.k); rect(mx - 4, y0 + 6, mx + 4, y0 + 6, P.gr1);
  for (let y = y0 + 9; y < y1 - 7; y += 2) rect(x0 + 5 + (y % 4), y, x1 - 5 - ((y + k) % 3), y, P.gr2);
  disco(x1 - 7, y1 - 6, 2, sello); pset(x1 - 7, y1 - 6, d_mez(sello, P.bl, 0.5)); pset(x1 - 8, y1 - 3, sello); pset(x1 - 6, y1 - 3, sello);
  for (let i = 0; i < 7; i++) pset(x0 + 5 + i, y1 - 5 + Math.round(Math.sin(i * 1.4 + k)), P.azul);
}

// lo fijo del despacho (se pinta una vez): papel pintado, friso, moqueta, alfombra, marco y cortinas de la ventana,
// perchero, diplomas, mapa de corcho, librería, archivador, aparador, sillón y ficus
function d_despachoFijo(R) {
  const { rect, pset, disco, linea } = R, P = d_P;
  // el papel pintado verde (a rayas suaves con un motivo pequeño), la moldura del techo, el friso de madera y el zócalo
  d_tex(R, 0, 0, 319, 75, (x, y) => { if (y < 3) return P.wS; if (y === 3) return P.wL; if (y === 4) return P.wDD; const r = (x >> 3) & 1, at = x > 262 && y < 56 && d_um(x, y) < 2.4 * (1 - Math.hypot((x - 298) / 36, (y - 24) / 32));   // at: la esquina de Atom, sin motivo ni raya
    if (!at && (x & 7) === 4 && (y & 7) === (r ? 2 : 6)) return P.vp1; if (!at && (x & 7) === 0) return P.vp2; return r ? P.vp0 : (d_um(x, y) < 0.5 ? P.vp0 : P.vp1); });
  rect(0, 76, 319, 76, P.wLL); rect(0, 77, 319, 77, P.w0); rect(0, 78, 319, 78, P.wDD);
  d_veta(R, 0, 79, 319, 111, P.w0, P.wS, P.wL, 5);
  for (let x = 4; x < 320; x += 40) { rect(x, 82, x + 31, 108, P.wS); rect(x + 1, 83, x + 31, 108, P.wL); d_veta(R, x + 1, 83, x + 30, 107, P.w0, P.wS, P.wL, 6 + x, true); rect(x + 4, 86, x + 27, 104, P.wS); rect(x + 5, 87, x + 27, 104, P.wL); d_veta(R, x + 5, 87, x + 26, 103, hex('#94623a'), P.wS, P.wL, 7 + x, true); }
  rect(0, 112, 319, 116, P.wD); rect(0, 112, 319, 112, P.w0); rect(0, 116, 319, 116, P.wDD);
  // la moqueta y la alfombra persa
  d_tex(R, 0, 117, 319, 179, (x, y) => { const q = h(x, y, 130); return y === 117 ? P.mo1 : q < 0.14 ? P.mo1 : q > 0.9 ? P.mo2 : ((x + y * 3) % 9 === 0 ? P.mo1 : P.mo0); });
  d_tex(R, 30, 126, 290, 177, (x, y) => { const bx = Math.min(x - 30, 290 - x), by = Math.min(y - 126, 177 - y), b = Math.min(bx, by);
    if (bx < 2) return (y & 1) ? P.alO : 0; if (b < 4) return P.al1; if (b === 4 || b === 9) return P.alO; if (b > 4 && b < 9) return ((x + y) % 6 < 2 || (x - y + 600) % 6 < 2) ? P.alA : P.al1;
    const u = Math.abs(((x - 160) % 30 + 30) % 30 - 15), v = Math.abs((y - 152) % 18); const d = u + Math.abs(v - 9) * 1.6; if (Math.abs(d - 11) < 1) return P.alO; if (d < 4) return P.alO; if (d < 8) return P.alA; return h(x, y, 131) < 0.12 ? P.al1 : (x * 3 + y) % 8 === 0 ? P.al2 : P.al0; });
  // la ventana: el marco blanco (el hueco lo pinta la vista), la repisa, la barra y las cortinas
  rect(27, 21, 101, 92, P.k); rect(28, 22, 100, 91, P.be2); rect(98, 23, 100, 91, P.be1); rect(28, 89, 100, 91, P.be1); rect(32, 26, 96, 87, P.k); rect(33, 27, 95, 86, P.ci2);
  rect(24, 92, 104, 94, P.be2); rect(24, 95, 104, 95, P.beS); rect(26, 96, 102, 96, P.wDD);
  rect(16, 18, 112, 19, P.wD); rect(16, 18, 112, 18, P.wS); disco(15, 18, 2, P.wD); disco(113, 18, 2, P.wD);
  for (const [x0, x1] of [[18, 29], [99, 110]]) d_tex(R, x0, 20, x1, 98, (x, y) => { const u = (x - x0) % 4; return y > 96 && (x + y) % 2 ? 0 : u === 0 ? hex('#3e1820') : u === 1 ? hex('#8a3a44') : u === 2 ? hex('#6e2a34') : hex('#561e28'); });
  for (const cx of [23, 104]) { rect(cx - 6, 62, cx + 6, 63, P.oro); rect(cx - 6, 64, cx + 6, 64, P.oroS); }
  // el perchero con la gabardina y el sombrero
  rect(8, 46, 9, 116, P.wD); rect(8, 46, 8, 116, P.w0); rect(3, 115, 14, 116, P.wD); linea(8, 50, 4, 47, P.wD); linea(9, 50, 13, 47, P.wD);
  d_tex(R, 2, 52, 15, 92, (x, y) => { const a = 3 + Math.min(4, (y - 52) * 0.4); if (Math.abs(x - 8.5) > a) return 0; return x < 5 ? hex('#e0cca0') : x > 12 ? hex('#a08c64') : (x === 8 && y > 58) ? hex('#a08c64') : h(x, y >> 2, 132) < 0.12 ? hex('#b8a47c') : hex('#c8b48a'); });
  rect(3, 72, 14, 73, hex('#a08c64')); pset(9, 73, P.laton); rect(3, 42, 14, 44, hex('#5a4a3a')); rect(5, 38, 12, 42, hex('#6a5846')); rect(5, 38, 12, 38, hex('#8a7660')); rect(5, 41, 12, 41, hex('#3a2e24'));
  // los diplomas y una foto enmarcada
  d_diploma(R, 114, 20, 140, 42, P.rojo, 0); d_diploma(R, 114, 47, 140, 69, P.oro, 1); d_diploma(R, 144, 26, 158, 44, P.azul, 2);
  rect(144, 50, 158, 64, P.k); rect(145, 51, 157, 63, P.oroS); rect(146, 52, 156, 62, P.ci2); rect(146, 58, 156, 62, hex('#3a78b8')); R.poligono([[150, 58], [153, 53], [153, 58]], P.bl); rect(149, 59, 154, 59, P.wD);
  // el mapa de corcho: la hoja con el lago, el río, las calles y los parques; chinchetas, hilo rojo, notas y una foto
  rect(161, 15, 249, 71, P.k); rect(162, 16, 248, 70, P.w0); rect(162, 16, 248, 16, P.wL); d_tex(R, 164, 18, 246, 68, (x, y) => (h(x, y, 133) < 0.2 ? P.corchoS : h(x >> 1, y >> 1, 134) < 0.1 ? hex('#d8ae78') : P.corcho));
  d_tex(R, 168, 20, 242, 60, (x, y) => { const or = 28 + Math.sin(x * 0.11) * 3 + Math.sin(x * 0.37) * 1.2; if (y < or) return y > or - 1.5 ? d_mez(P.mapaA, P.bl, 0.5) : ((x + y * 2) % 9 === 0 ? d_mez(P.mapaA, P.bl, 0.3) : P.mapaA);
    const rio = Math.abs(x - 200 - Math.sin(y * 0.25) * 4 - (y - 40) * 0.3); if (rio < 1.2) return P.mapaA; if ((x > 176 && x < 190 && y > 44 && y < 54) || (x > 216 && x < 232 && y > 34 && y < 42)) return h(x, y, 135) < 0.2 ? d_mez(P.mapaV, P.k, 0.15) : P.mapaV;
    if (x % 8 === 0 || y % 7 === 0) return P.mapaS; if ((x - y + 300) % 23 === 0) return hex('#e0b070'); return x === 168 || y === 60 ? P.mapaS : P.mapa; });
  rect(168, 20, 242, 20, P.bl); rect(204, 20, 204, 60, d_mez(P.mapa, P.k, 0.12));
  const pins = [[181, 49, P.rojo], [208, 36, P.rojo], [226, 38, P.rojo], [222, 52, P.oro], [190, 34, P.azul]];
  linea(181, 49, 208, 36, P.rojo); linea(208, 36, 226, 38, P.rojo); for (let a = 0; a < 6.3; a += 0.3) pset(Math.round(226 + Math.cos(a) * 5), Math.round(38 + Math.sin(a) * 4), P.rojo);
  for (const [x, y, c] of pins) { pset(x + 1, y + 1, P.k); disco(x, y, 1, c); pset(x, y - 1, d_mez(c, P.bl, 0.6)); }
  rect(170, 62, 180, 68, hex('#f0e070')); rect(171, 64, 178, 64, P.gr0); rect(171, 66, 176, 66, P.gr0); pset(175, 62, P.rojo); rect(184, 62, 196, 68, P.bl); rect(185, 63, 195, 67, P.ci3); rect(185, 66, 195, 67, P.c0); rect(189, 64, 191, 66, P.m0); pset(190, 62, P.azul);
  rect(230, 62, 242, 68, P.bl); for (let y = 63; y < 68; y += 2) rect(231, y, 240 - (y % 3), y, P.gr2); pset(236, 62, P.oro);
  // el reloj y la librería de tomos de leyes, con un helecho encima
  d_estante(R, 256, 53, 318, 111, 3, 3, { ley: true });
  rect(262, 46, 270, 49, hex('#b8603a')); rect(262, 46, 270, 46, hex('#d88050')); for (let k = 0; k < 9; k++) { const a = -0.4 - k * 0.29, x = Math.round(266 + Math.cos(a) * 7), y = Math.round(45 + Math.sin(a) * 5); linea(266, 45, x, y, k % 2 ? P.v0 : P.v1); pset(x, y + 1, P.v2); }
  // el archivador metálico, con carpetas y un cactus encima
  rect(111, 83, 137, 116, P.k); rect(112, 84, 136, 115, P.gr0); rect(133, 84, 136, 115, P.gr1); rect(112, 84, 136, 84, P.gr2); for (let k = 0; k < 3; k++) { const y = 86 + k * 10; rect(114, y, 131, y + 8, P.gr1); rect(115, y + 1, 131, y + 8, P.gr2); rect(115, y + 1, 130, y + 7, P.gr0); rect(120, y + 2, 125, y + 3, P.bl); rect(121, y + 5, 124, y + 5, P.gr3); }
  rect(113, 80, 127, 82, hex('#d8c070')); rect(113, 78, 126, 79, hex('#c8a858')); rect(114, 77, 125, 77, P.bl); rect(130, 79, 134, 82, hex('#b8603a')); rect(131, 73, 133, 78, P.v1); pset(131, 73, P.v2); pset(130, 76, P.v1); pset(134, 75, P.v1); pset(132, 72, P.f2);
  // el aparador con la pecera (el agua la pinta la animación), la balanza de latón, el fax y una foto
  rect(163, 90, 251, 116, P.k); d_veta(R, 164, 91, 250, 115, P.w0, P.wS, P.wL, 9); rect(164, 91, 250, 92, P.wLL); rect(164, 93, 250, 93, P.wD); for (const x of [165, 194, 223]) { rect(x + 1, 96, x + 25, 113, P.wS); rect(x + 2, 97, x + 25, 113, P.wL); rect(x + 2, 97, x + 24, 112, P.w0); pset(x + 22, 104, P.latonL); pset(x + 22, 105, P.laton); }
  rect(169, 73, 205, 90, P.k); rect(170, 74, 204, 76, P.gr3); rect(170, 77, 204, 89, hex('#3a8aa0'));
  rect(220, 89, 228, 90, P.latonS); rect(224, 75, 224, 89, P.laton); rect(216, 76, 232, 76, P.laton); pset(224, 74, P.latonL); for (const dx of [-8, 8]) { linea(224 + dx, 77, 224 + dx - 2, 82, P.latonS); linea(224 + dx, 77, 224 + dx + 2, 82, P.latonS); rect(224 + dx - 3, 83, 224 + dx + 3, 83, P.laton); rect(224 + dx - 2, 84, 224 + dx + 2, 84, P.latonS); }
  rect(235, 83, 249, 90, P.k); rect(236, 84, 248, 89, P.be0); rect(236, 84, 248, 84, P.be2); rect(238, 80, 246, 83, P.bl); rect(239, 81, 244, 81, P.gr2); rect(237, 86, 241, 88, P.beS); for (let x = 243; x < 248; x += 2) pset(x, 87, P.gr1);
  rect(208, 82, 215, 90, P.k); rect(209, 83, 214, 89, P.oroS); rect(210, 84, 213, 88, P.ci3); rect(210, 87, 213, 88, P.c0);
  // el sillón de cuero de respaldo alto, detrás del escritorio
  { const sx = d_DES.sillon;
    for (let y = 106; y <= 146; y++) { const a = y < 111 ? [6, 9, 10, 11, 12][y - 106] : y > 124 ? 11 : 12;
      for (let i = -a; i <= a; i++) { const b = Math.abs(i) === a || y === 106; pset(sx + i, y, b ? P.k : i < -a + 3 ? P.cu2 : i > a - 4 ? P.cu1 : (i === 0 && y > 118) ? P.cu1 : P.cu0); } }
    rect(sx - 7, 109, sx + 7, 117, P.cu2); rect(sx - 7, 117, sx + 7, 117, P.cu1); rect(sx - 6, 110, sx + 6, 110, hex('#946a50'));
    for (let y = 122; y < 142; y += 7) for (let x = sx - 7 + ((y / 7) & 1) * 4; x <= sx + 8; x += 8) { pset(x, y, P.cu1); pset(x - 1, y - 1, P.cu2); }
    for (const d of [-1, 1]) { rect(sx + d * 15 - 2, 128, sx + d * 15 + 2, 133, P.k); rect(sx + d * 15 - 1, 129, sx + d * 15 + 1, 132, d < 0 ? P.cu2 : P.cu1); rect(sx + d * 14, 134, sx + d * 14, 146, P.gr3); } }
  // el ficus de la derecha, en su maceta
  rect(296, 140, 312, 152, P.k); rect(297, 141, 311, 151, hex('#b8603a')); rect(297, 141, 311, 142, hex('#d88050')); rect(308, 143, 311, 151, hex('#8a4428')); rect(303, 112, 304, 140, P.troncoS); linea(304, 126, 310, 118, P.troncoS); linea(303, 122, 297, 114, P.troncoS);
  d_copa(R, 304, 104, 12, [P.vd, P.v0, P.v1, P.v2], 14); d_copa(R, 296, 114, 6, [P.vd, P.v0, P.v1, P.v2], 15); d_copa(R, 312, 118, 6, [P.vd, P.v0, P.v1, P.v2], 16);
  d_tex(R, 292, 152, 316, 154, (x, y) => (d_um(x, y) < 0.5 ? P.mo1 : 0));
}
// la pecera del aparador: el agua, la grava, dos plantas que se mecen, tres peces que van y vienen y las burbujas
function d_pecera(R, t, x0, y0, x1, y1) {
  const P = d_P, cl = [x0, y0, x1, y1];
  d_tex(R, x0, y0, x1, y1, (x, y) => (y > y1 - 2 ? (h(x, y, 136) < 0.5 ? hex('#d8c8a0') : hex('#b8a47c')) : y === y0 ? hex('#a8e0ec') : d_um(x, y) < (y - y0) / 14 ? hex('#2e7a94') : hex('#3a8aa0')));
  R.recorte(cl);
  for (const [px, c] of [[x0 + 5, P.v1], [x1 - 6, P.v2], [x0 + 16, P.v0]]) for (let j = 0; j < 8; j++) R.pset(px + Math.round(Math.sin(t * 1.5 + j * 0.6 + px) * (j / 5)), y1 - 2 - j, c);
  for (const [k, c, v] of [[0, P.f5, 5], [1, P.oroL, 3.4], [2, P.f2, 4.2]]) { const L = x1 - x0 - 8, u = (t * v + k * 13) % (2 * L), x = Math.round(x0 + 4 + (u < L ? u : 2 * L - u)), d = u < L ? 1 : -1, y = Math.round(y0 + 3 + k * 3 + Math.sin(t * 1.2 + k * 2)); R.rect(x - 1, y, x + 1, y, c); R.pset(x, y - 1, c); R.pset(x - 2 * d, y - 1, c); R.pset(x - 2 * d, y + 1, c); R.pset(x + d, y, P.k); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k * 0.27) % 1; R.pset(x1 - 10 + Math.round(Math.sin(t * 3 + k)), Math.round(y1 - 2 - u * (y1 - y0 - 2)), hex('#c8f0f8')); }
  R.recorte(null);
  R.rect(x0, y0, x0, y1, hex('#a8e0ec')); R.pset(x0 + 2, y0 + 2, P.bl); R.pset(x0 + 2, y0 + 3, P.bl);
}

// el despacho: lo fijo y la vida animada (el barrio por la ventana, la persiana, el reloj, la pecera, el fax, el polvo)
function d_despacho(R, t, o) {
  const P = d_P, G = d_DES, V = G.ventana;
  R.copiar(d_fijo(R, 'despacho', () => d_despachoFijo(R)));
  // la ventana: el barrio, el travesaño, la persiana recogida arriba con su cordón y la planta de la repisa
  d_vista(R, t, V, 'barrio');
  R.rect(63, V[1], 64, V[3], P.be2); R.rect(V[0], 54, V[2], 55, P.be2); R.rect(V[0], 56, V[2], 56, P.be1);
  for (let y = V[1]; y < V[1] + 13; y += 2) { R.rect(V[0], y, V[2], y, P.be2); R.rect(V[0], y + 1, V[2], y + 1, P.beS); } R.rect(V[0], V[1] + 13, V[2], V[1] + 14, P.be1);
  { const s = Math.round(Math.sin(t * 1.1) * 1.2); R.linea(V[2] - 4, V[1] + 14, V[2] - 4 + s, V[1] + 34, P.be1); R.rect(V[2] - 5 + s, V[1] + 34, V[2] - 3 + s, V[1] + 36, P.be2); }
  R.rect(40, 88, 48, 92, hex('#b8603a')); R.rect(40, 88, 48, 88, hex('#d88050')); for (let k = 0; k < 6; k++) { const s = Math.sin(t * 1.2 + k) * 0.7, x = Math.round(44 + (k - 2.5) * 2.4 + s), y = 81 + (k % 3) * 2; R.linea(44, 88, x, y, k % 2 ? P.v1 : P.v0); R.pset(x, y, k % 3 ? P.v2 : P.f0); }
  // la luz de la ventana sobre la moqueta, el reloj, la pecera y las luces del fax
  d_reloj(R, 264, 30, 8, t, P.laton, 4.7);
  d_pecera(R, t, 171, 77, 203, 89);
  if (Math.floor(t * 1.5) % 2) R.pset(247, 86, P.rojo); R.pset(245, 86, hex('#3ad85a'));
  { const b = Math.round(Math.sin(t * 0.8) * 1); for (const dx of [-8, 8]) R.pset(224 + dx, 85 + (dx > 0 ? b : -b), P.latonL); }
  // las hojas del ficus y las motas de polvo en la luz
  for (let k = 0; k < 6; k++) { const a = h(k, 1, 137) * 6.283, d = 4 + h(k, 2, 137) * 7, x = Math.round(304 + Math.cos(a) * d + Math.sin(t * 1.3 + k)), y = Math.round(104 + Math.sin(a) * d * 0.8); if (Math.sin(t * 2 + k * 1.9) > 0) R.pset(x, y, P.v3); }
  for (let k = 0; k < 12; k++) { const x = 30 + ((h(k, 3, 138) * 80 + Math.sin(t * 0.4 + k) * 6 + t * 1.5) % 80), y = 140 - ((h(k, 4, 138) * 60 + t * (2 + h(k, 5, 138) * 2)) % 60); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(Math.round(x), Math.round(y), P.luz); }
  return { ...G };
}

// lo de delante en el despacho: el escritorio de madera con su tapete verde, cajones y tiradores; encima, el flexo, el
// libro abierto (o.libro: false lo quita), papeles, el portalápices, la taza que humea y el teléfono (o.suena)
function d_despachoDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, P = d_P, G = d_DES;
  R.poligono([[66, 142], [232, 142], [238, 149], [60, 149]], P.wL); d_tex(R, 60, 143, 238, 149, (x, y) => (x > 61 + (149 - y) * 0.8 && x < 237 - (149 - y) * 0.8 && h(x >> 3, y, 139) < 0.22 ? P.wLL : 0)); rect(66, 142, 232, 142, P.wLL);
  R.poligono([[104, 143], [196, 143], [199, 148], [101, 148]], hex('#2e6a4e')); rect(105, 143, 195, 143, hex('#3e8462')); rect(102, 148, 198, 148, P.oroS);
  rect(60, 150, 238, 152, P.w0); rect(60, 150, 238, 150, P.wLL); rect(60, 153, 238, 153, P.wDD);
  d_veta(R, 62, 154, 236, 179, P.w0, P.wS, P.wL, 11); rect(62, 154, 62, 179, P.wL); rect(236, 154, 236, 179, P.wD);
  for (const x0 of [66, 190]) for (let k = 0; k < 2; k++) { const y = 156 + k * 12; rect(x0, y, x0 + 42, y + 10, P.wS); rect(x0 + 1, y + 1, x0 + 42, y + 10, P.wL); d_veta(R, x0 + 1, y + 1, x0 + 41, y + 9, hex('#94623a'), P.wS, P.wL, 12 + k + x0); rect(x0 + 17, y + 5, x0 + 25, y + 5, P.latonL); rect(x0 + 17, y + 6, x0 + 25, y + 6, P.latonS); }
  rect(112, 156, 186, 179, P.wS); rect(113, 157, 186, 179, P.wD); d_veta(R, 114, 158, 185, 179, P.wS, P.wD, P.w0, 15, true);
  // el libro abierto, con su estampa y sus renglones
  if (o.libro !== false) { const [bx, by] = G.libro; R.poligono([[bx - 15, by - 4], [bx + 15, by - 4], [bx + 17, by], [bx - 17, by]], P.bl); rect(bx - 17, by + 1, bx + 17, by + 1, hex('#4a3a7a')); rect(bx, by - 4, bx, by, P.gr2); rect(bx - 15, by - 4, bx + 15, by - 4, P.gr2);
    rect(bx - 12, by - 3, bx - 4, by - 1, hex('#e89a5a')); rect(bx - 12, by - 1, bx - 4, by - 1, hex('#3a2a6a')); pset(bx - 8, by - 3, hex('#3a2a6a')); pset(bx - 8, by - 2, hex('#3a2a6a')); for (let j = 0; j < 3; j++) rect(bx + 3 + j % 2, by - 3 + j, bx + 12 - j, by - 3 + j, P.gr0); }
  // papeles, el portalápices y la taza de café que humea
  R.poligono([[158, 144], [176, 144], [178, 148], [156, 148]], P.bl); for (let j = 0; j < 2; j++) rect(160, 145 + j * 2, 174 - j * 3, 145 + j * 2, P.gr2); R.poligono([[164, 143], [182, 144], [183, 146], [163, 146]], P.mapa); linea(166, 145, 180, 145, P.azul);
  rect(92, 139, 97, 145, P.k); rect(93, 140, 96, 145, P.gr3); linea(94, 139, 93, 134, P.oro); linea(95, 139, 96, 133, P.rojo); linea(96, 139, 98, 135, P.azul);
  rect(186, 140, 191, 146, P.bl); rect(190, 141, 191, 146, P.gr2); rect(192, 142, 193, 144, P.bl); rect(187, 140, 190, 140, hex('#5a3a22'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k * 0.33) % 1; if (u < 0.85) pset(188 + Math.round(Math.sin(t * 2 + k * 2 + u * 5) * 1.3), 138 - Math.round(u * 8), u < 0.45 ? P.bl : P.gr2); }
  // el flexo y su charco de luz
  d_luz(R, 78, 146, 14, 3, 0.4); d_flexo(R, 78, 145);
  // el teléfono de sobremesa: la base con las teclas, el auricular y el cable rizado; con o.suena tiembla y suena;
  // con o.descolgado no se pinta el auricular (lo lleva el personaje): quedan las horquillas vacías y no suena
  { const [tx, ty] = G.telefono, des = !!o.descolgado, su = !!o.suena && !des, dx = su ? Math.round(Math.sin(t * 40)) : 0, dy = su && Math.sin(t * 40) > 0.3 ? -1 : 0;
    R.poligono([[tx - 9, ty + 3], [tx + 9, ty + 3], [tx + 7, ty - 3], [tx - 7, ty - 3]], P.k); R.poligono([[tx - 8, ty + 2], [tx + 8, ty + 2], [tx + 6, ty - 2], [tx - 6, ty - 2]], P.be0); rect(tx - 6, ty - 2, tx + 6, ty - 2, P.be2); rect(tx - 8, ty + 2, tx + 8, ty + 2, P.be1);
    for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) pset(tx - 1 + i * 2, ty - 1 + j * 2, P.gr3); pset(tx - 5, ty, su && Math.floor(t * 8) % 2 ? P.rojo : hex('#7a2a2a'));
    if (des) { for (const hx of [tx - 8, tx + 6]) { rect(hx, ty - 4, hx + 2, ty - 3, P.k); pset(hx + 1, ty - 4, P.be1); } }   // descolgado: solo las dos horquillas de la base
    else { rect(tx - 10 + dx, ty - 6 + dy, tx + 10 + dx, ty - 4 + dy, P.k); rect(tx - 9 + dx, ty - 6 + dy, tx + 9 + dx, ty - 5 + dy, P.be0); rect(tx - 9 + dx, ty - 6 + dy, tx + 9 + dx, ty - 6 + dy, P.be2); rect(tx - 10 + dx, ty - 4 + dy, tx - 6 + dx, ty - 3 + dy, P.k); rect(tx + 6 + dx, ty - 4 + dy, tx + 10 + dx, ty - 3 + dy, P.k); }
    for (let i = 0; i < 10; i++) pset(tx - 12 - i, ty + 1 + (i % 2) + (i > 6 ? 1 : 0), P.gr3);
    if (su) for (let k = 0; k < 2; k++) { const r = 5 + k * 4 + (Math.floor(t * 8) % 2); for (let a = -0.9; a <= 0.9; a += 0.18) { pset(Math.round(tx + 11 + Math.cos(a) * r), Math.round(ty - 8 + Math.sin(a) * r), P.oroL); pset(Math.round(tx - 11 - Math.cos(a) * r), Math.round(ty - 8 + Math.sin(a) * r), P.oroL); } } }
  // la placa de latón (sin letras) y el tarjetero
  rect(140, 146, 154, 148, P.latonS); rect(140, 145, 154, 147, P.laton); rect(141, 145, 153, 145, P.latonL); rect(143, 146, 151, 146, P.latonS);
  return {};
}
// la geometría de cada encuadre (lo que devuelve boston(): el suelo y los puntos que usan las escenas)
const e_GEO = {
  // suelo: los pies dentro del parque; acera: los pies de quien mira desde fuera (se pinta DESPUÉS de bostonDelante)
  obras: { suelo: 150, acera: 176, base: [202, 158], excavadora: [246, 150], valla: [0, 132, 98, 164], mirador: [50, 176], caseta: [136, 80, 190, 104], sol: [240, 22], horizonte: 70 },
  hoyo: { suelo: 126, hoyo: [158, 264, 158], fondo: 157, escalon: [246, 256, 141], excavadora: [278, 126], trozos: [[250, 135], [226, 152], [262, 150], [204, 153], [240, 166], [184, 152], [214, 168], [172, 164], [194, 169], [150, 160]] },
  biblioteca: { suelo: 160, medallones: [[106, 75], [138, 75]], lapidas: [[101, 69, 123, 80], [133, 69, 155, 80]], puertas: [[72, 100, 88, 138], [104, 100, 120, 138], [136, 100, 152, 138]], escalinata: [46, 138, 178, 146], farol: [258, 53], iglesia: [248, 8, 268, 126], calle: [222, 130, 319, 145] },
  ceremonia: { suelo: 156, sueloFondo: 146, mesa: [140, 141, 180, 158], cojin: [160, 137], ventanas: [[59, 26, 103, 90], [217, 26, 261, 90]], chimenea: [128, 93, 192, 127], cuadro: [122, 25, 198, 73], reloj: [10, 47, 26, 127], puerta: [284, 58, 312, 127], pasillo: [148, 178], sillas: 164 },
};

const e_P = pal({
  metal: '#9aa2b0', metalL: '#d0d6e0', metalS: '#5e6676', eslabon: '#aab2c0', hormigon: '#b4b0a8', hormigonS: '#8a867e',
  obra: '#f08a24', obraL: '#ffb450', obraS: '#b85c12', obraM: '#e07a1c',
  t0: '#a07a50', t1: '#8a6440', t2: '#6e4c30', t3: '#523622', t4: '#3c2618', tL: '#bc9666', arcilla: '#b88a5e', arcillaL: '#cca274', arcillaS: '#9c7048',
  piedra: '#a8a49c', piedraS: '#7c786f', cesped: '#6a9a3e', cespedL: '#8cb850', cespedS: '#4a7630', cespedD: '#38582a',
  tronco: '#5a4030', troncoS: '#3c2a20', lad0: '#a2503c', lad1: '#84382c', lad2: '#bc6a4e', ladJ: '#8e4434', ladB0: '#8a4638', ladB1: '#6e3028', ladB2: '#a45e48', ladBJ: '#783a2e',
  ladC0: '#b46a48', ladC1: '#96503a', ladC2: '#cc8460', ladCJ: '#a05a40', cornisa: '#d8ccb4', cornisaS: '#a89c84', vidrio: '#3a4a64', vidrioL: '#8ab0d0', vidrioS: '#26324a', marco: '#ece6d8',
  lejos: '#9ab0c4', lejosS: '#8098b0', lejosL: '#b8cad8', agua0: '#4a7ea8', agua1: '#5a90b8', agua2: '#3c6c96', aguaL: '#d4e8f4', puente: '#e4e8ec', puenteS: '#a8b4c0',
  acera: '#b0aca6', aceraS: '#8e8a86', aceraL: '#c8c4bc', hoja0: '#e8902a', hoja1: '#d8502a', hoja2: '#f0c840', hoja3: '#a83a24',
  caseta: '#e4e0d4', casetaS: '#b8b4a8', casetaA: '#3a6a9a', chaleco: '#f07a1c', casco: '#f4d030', vaquero: '#3a5a8a', piel: '#f0c090',
  pl: '#cfe6f0', plL: '#f4fcff', plS: '#8ab4c8', cer: '#e8dcc0', cerS: '#b8a884', cerD: '#8a7a5c',
  pied0: '#cfc4a8', pied1: '#b8ac90', pied2: '#e2d8be', pied3: '#9c9078', piedJ: '#a89c82', piedD: '#7e7460', teja: '#b0583c', tejaS: '#8a4030', cobre: '#5aa890', cobreS: '#3e8470',
  luz: '#ffd870', luzL: '#fff4c0', luzS: '#e8a838', noche: '#2a2a4a', hierro: '#2a2a36',
  mad0: '#7a4e2c', mad1: '#643c20', mad2: '#96683a', mad3: '#4a2a16', madL: '#b48450', pared0: '#d8c8a0', pared1: '#c8b88e', pared2: '#e6d8b4', paredR: '#b4a47c',
  parq0: '#a87a48', parq1: '#946838', parq2: '#bc8e58', alf0: '#8a2e36', alf1: '#6e2230', alf2: '#c8a050', alf3: '#2e4a6a', alf4: '#e4d4a8',
  cort0: '#6a2a3a', cort1: '#4e1c2c', cort2: '#8a3c4c', marmol: '#e4e0d8', marmolS: '#b8b4ac', marmolV: '#9aa0a8', dorado: '#d8a838', doradoS: '#9c7420', doradoL: '#f8e080',
});

const e_VACIO = 0x01020304;

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_umbral = (x, y) => e_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo en la proporción a (0–1)
function e_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la capa fija de un encuadre: se pinta una sola vez en un búfer aparte, sobre un fondo «vacío» (lo que queda sin
// pintar deja ver el cielo o el agua vivos), y en cada fotograma se pega con e_pega
const e_capas = new Map();

function e_capa(R, clave, dibuja) {
  let b = e_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(e_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); e_capas.set(clave, b); }
  return b;
}

// pega una capa fija sobre lo ya pintado (una sola pasada), saltando lo vacío
function e_pega(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c !== e_VACIO) B[i] = c; } }

// los cielos de Boston, de arriba abajo: [fracción de la altura hasta el horizonte, color]; y los tres tonos de sus nubes
const e_CIELOS = Object.fromEntries(Object.entries({
  otono: [[0, '#3c86d4'], [0.22, '#52a0e2'], [0.45, '#78b8ea'], [0.66, '#9ccced'], [0.84, '#c0dcea'], [0.95, '#e4e4d4']],
  ocaso: [[0, '#262458'], [0.16, '#3a3676'], [0.32, '#5c3e80'], [0.47, '#96507c'], [0.6, '#c8646c'], [0.72, '#e88c5c'], [0.84, '#f6bc70'], [0.94, '#fbdc9c']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const e_NUBES = Object.fromEntries(Object.entries({ otono: ['#a8cce8', '#d6eaf8', '#ffffff'], ocaso: ['#6e4274', '#d07c78', '#ffcc9c'] }).map(([k, v]) => [k, v.map(hex)]));

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma
function e_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// cielo rico (copia adaptada del de th-comun.js; cielo() es compartido y no se toca): bandas con transición tramada, el
// sol con su halo tramado, cirros lejanos casi quietos y cúmulos de tres tonos a tres velocidades; la esquina de Atom y
// la barra del año quedan tranquilas (los cirros no entran y los cúmulos pasan por debajo). o.hor; o.modo: 'otono' |
// 'ocaso'; o.sol [x, y, r] (null: sin sol); o.cumulos [[x0, y, ancho, velocidad], …]
function e_cielo(R, t, o = {}) {
  const hor = o.hor ?? 70, modo = o.modo ?? 'otono', B = R.buf, P = e_CIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor)), cn = e_NUBES[modo];
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = e_umbral(x, y) < p ? b : a;
  }
  const quieto = (x, y) => (x > 270 && y < 48) || (x > 14 && x < 176 && y < 17);
  const sol = o.sol === undefined ? [240, 22, 7] : o.sol;
  if (sol) { const [sx, sy, sr] = sol, gl = hex(modo === 'ocaso' ? '#ffe6a0' : '#fff8dc'), R2 = sr + (modo === 'ocaso' ? 20 : 11);
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
      const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (e_umbral(x, y) < q * q) B[y * 320 + x] = e_mezcla(B[y * 320 + x], gl, 0.45); } }
  // cirros: velos finos y lejanos que apenas se mueven
  for (let k = 0; k < 5; k++) { const w = 30 + Math.round(h(k, 5, 402) * 44), x0 = ((h(k, 6, 402) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.round(hor * (0.27 + k * 0.1));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || y >= hor - 2 || quieto(x, y) || h(i >> 2, k, 403) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      B[y * 320 + x] = e > 0.35 ? cn[1] : cn[0]; if (e > 0.6 && i % 4 && x < 316) B[(y - 1) * 320 + x + 3] = cn[2]; if (e > 0.5 && i % 5 === 0 && x > 4) B[(y + 1) * 320 + x - 4] = cn[0]; } }
  if (sol) { const [sx, sy, sr] = sol; R.disco(sx, sy, sr + 1, modo === 'ocaso' ? hex('#ffd890') : C.solL); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }
  // cúmulos: los lejanos, pequeños y lentos; los cercanos, mayores y más rápidos
  const cum = o.cumulos ?? [[120, hor - 8, 16, 1.1], [330, hor - 6, 14, 0.8], [190, hor - 14, 22, 1.7], [250, hor - 22, 26, 2.3], [150, hor - 30, 18, 1.4]];
  cum.forEach(([x0, y, w, v], k) => e_nube(R, Math.round(((x0 + t * v) % 520) - 90), y, w, k + 3, cn));
}

// gaviotas que planean en círculos anchos (dos píxeles de ala que baten despacio)
function e_gaviotas(R, t, cx, cy, n = 3, c = C.blanco, cS = hex('#5a6478')) {
  for (let k = 0; k < n; k++) { const a = t * (0.34 + k * 0.07) + k * 2.1, x = Math.round(cx + Math.cos(a) * (34 + k * 13)), y = Math.round(cy + Math.sin(a) * (7 + k * 2) + k * 4), b = Math.sin(t * 5 + k * 2) > 0.2 ? 1 : 0;
    R.pset(x, y, c); R.pset(x - 1, y - b, c); R.pset(x + 1, y - b, c); R.pset(x - 2, y - 2 * b + 1, cS); R.pset(x + 2, y - 2 * b + 1, cS); }
}

// pared de ladrillo visto: hiladas de 3 px con la junta más oscura, a soga (cada hilada desplazada media pieza) y cada
// ladrillo con su tono; p = [medio, oscuro, claro, junta]
function e_ladrillos(R, x0, y0, x1, y1, p, sem = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const hi = Math.floor((y - y0) / 3), jy = (y - y0) % 3 === 2;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const xx = x - x0 + (hi & 1) * 3, q = h(Math.floor(xx / 6), hi, sem);
      B[y * 320 + x] = jy || xx % 6 === 5 ? p[3] : q < 0.2 ? p[1] : q > 0.84 ? p[2] : p[0]; } }
}

// ventana de guillotina con su dintel y su alféizar de piedra, el marco blanco, el vidrio con un reflejo en diagonal y un
// estor a media altura; con luz, encendida (cálida)
function e_ventana(R, x, y, w, alto, sem = 0, luz = false) {
  const { rect, pset } = R, q = h(x, y, sem);
  rect(x - 1, y - 2, x + w, y - 1, e_P.cornisa); rect(x - 1, y - 1, x + w, y - 1, e_P.cornisaS); rect(x - 1, y + alto, x + w, y + alto, e_P.cornisa); rect(x - 1, y + alto + 1, x + w, y + alto + 1, e_P.ladB1);
  rect(x, y, x + w - 1, y + alto - 1, luz ? e_P.luz : e_P.vidrio);
  if (luz) { rect(x, y, x + w - 1, y + 1, e_P.luzL); if (q > 0.5) rect(x + 1, y + alto - 4, x + 2, y + alto - 1, e_P.luzS); }
  else { if (q < 0.45) rect(x, y, x + w - 1, y + 1 + Math.round(q * 6), e_P.marco); else if (q > 0.8) rect(x, y, x + 1, y + alto - 1, hex('#b46a6a'));
    for (let i = 0; i < Math.min(w, alto) - 1; i++) pset(x + w - 2 - i, y + alto - 4 + i - Math.round(q * 3), e_P.vidrioL); rect(x, y + alto - 1, x + w - 1, y + alto - 1, e_P.vidrioS); }
  rect(x, y + (alto >> 1), x + w - 1, y + (alto >> 1), e_P.marco); if (w > 5) rect(x + (w >> 1), y, x + (w >> 1), y + alto - 1, e_P.marco);
}

// casa de ladrillo del barrio vista de frente: la cornisa con dentículos y su sombra, pisos de ventanas, chimeneas y
// antena en la azotea, la sombra del lado y, con o.escalera (la columna de ventanas), la escalera de incendios de hierro
function e_casa(R, x0, x1, top, base, p, sem, o = {}) {
  const { rect, pset, linea } = R, w = x1 - x0;
  for (const [cx, ch] of o.chimeneas ?? [[x0 + 5, 7]]) { rect(cx, top - ch, cx + 4, top, p[1]); rect(cx, top - ch, cx + 1, top, p[0]); rect(cx - 1, top - ch - 1, cx + 5, top - ch, e_P.cornisaS); pset(cx + 2, top - ch - 2, C.k); }
  if (o.antena) { const ax = x1 - 7; rect(ax, top - 11, ax, top, e_P.metalS); rect(ax - 3, top - 10, ax + 3, top - 10, e_P.metalS); rect(ax - 2, top - 8, ax + 2, top - 8, e_P.metalS); }
  if (o.deposito) { const dx = x0 + Math.round(w * 0.55); rect(dx, top - 9, dx + 7, top - 3, e_P.mad1); rect(dx, top - 9, dx + 2, top - 3, e_P.mad0); rect(dx - 1, top - 6, dx + 8, top - 6, e_P.hierro); pset(dx + 1, top - 2, e_P.hierro); pset(dx + 6, top - 2, e_P.hierro); pset(dx + 1, top - 1, e_P.hierro); pset(dx + 6, top - 1, e_P.hierro); R.poligono([[dx - 1, top - 9], [dx + 3.5, top - 13], [dx + 8, top - 9]], e_P.mad3); }
  e_ladrillos(R, x0, top, x1, base, p, sem);
  rect(x1 - 2, top, x1, base, p[1]); rect(x0, top, x0, base, p[1]); for (let y = top; y <= base; y += 3) pset(x1 - 3, y, p[1]);
  rect(x0 - 1, top - 3, x1 + 1, top, e_P.cornisa); rect(x0 - 1, top - 3, x1 + 1, top - 3, e_P.marco); rect(x0 - 1, top, x1 + 1, top, e_P.cornisaS); for (let x = x0; x <= x1; x += 3) pset(x, top - 1, e_P.cornisaS);
  rect(x0 + 1, top + 1, x1 - 1, top + 2, p[1]);
  const nx = Math.max(2, Math.floor((w - 3) / 11)), paso = (w - 3) / nx, np = Math.floor((base - top - 8) / 17);
  for (let f = 0; f < np; f++) { const wy = top + 8 + f * 17;
    for (let k = 0; k < nx; k++) { const wx = Math.round(x0 + 2 + paso * k + (paso - 6) / 2); e_ventana(R, wx, wy, 6, 10, sem + f * 7 + k, o.luces && h(f, k, sem + 50) < o.luces);
      if (o.jardineras && f === np - 2 && k % 2 === 0) { rect(wx - 1, wy + 9, wx + 6, wy + 10, e_P.mad1); for (let i = 0; i < 7; i++) pset(wx - 1 + i, wy + 8, i % 3 ? C.hierbaS : e_P.hoja1); } }
    rect(x0 + 1, wy + 14, x1 - 1, wy + 14, p[2]); }
  if (o.escalera != null) { const k = o.escalera, wx = Math.round(x0 + 2 + paso * k + (paso - 6) / 2) - 3, wd = Math.round(paso) + 10;
    for (let f = 0; f < np - 1; f++) { const by = top + 8 + f * 17 + 12; rect(wx, by, wx + wd, by, e_P.hierro); rect(wx, by - 5, wx + wd, by - 5, e_P.hierro); for (let i = 0; i <= wd; i += 2) pset(wx + i, by - 3, e_P.hierro); rect(wx, by - 5, wx, by, e_P.hierro); rect(wx + wd, by - 5, wx + wd, by, e_P.hierro);
      if (f < np - 2) { const d = f % 2 ? 1 : -1, xa = d > 0 ? wx + 2 : wx + wd - 2, xb = d > 0 ? wx + wd - 3 : wx + 3; linea(xa, by + 1, xb, by + 11, e_P.hierro); linea(xa + 1, by + 1, xb + 1, by + 11, e_P.hierro); }
      else { rect(wx + 3, by + 1, wx + 3, by + 9, e_P.hierro); rect(wx + 6, by + 1, wx + 6, by + 9, e_P.hierro); for (let j = 2; j < 9; j += 2) rect(wx + 3, by + j, wx + 6, by + j, e_P.hierro); } } }
}

// los colores de los árboles de otoño: [sombra, cuerpo, luz, hojas sueltas]
const e_OTO = [['#a8481c', '#d8702a', '#f0a03c', '#f8d060'], ['#7e2420', '#b83a2a', '#de6238', '#f09a48'], ['#b07a18', '#dca82a', '#f4cc4a', '#fbe890'], ['#5a6e24', '#86962e', '#b4bc44', '#e0d060']].map((v) => v.map(hex));

// árbol de otoño: el tronco con ramas y la copa hecha de bolas con su contorno, sombreada (la luz viene de arriba a la
// derecha) y con hojas sueltas de otro tono; r es el radio de la copa y k, el color (e_OTO)
function e_arbolOto(R, x, base, alto, r, sem, k = 0) {
  const { rect, pset, disco, linea } = R, p = e_OTO[k % 4], top = base - alto, cy = top + Math.round(r * 0.7), B = R.buf;
  for (let y = base; y >= cy; y--) { const w = y > base - 3 ? 2 : 1; rect(x - w, y, x + w, y, e_P.tronco); pset(x - w, y, e_P.troncoS); if ((y + sem) % 5 === 0) pset(x, y, e_P.troncoS); }
  linea(x, cy + r * 0.7, x - r * 0.6, cy + 1, e_P.troncoS); linea(x, cy + r * 0.8, x + r * 0.6, cy + 2, e_P.tronco);
  const n = 7 + Math.round(r / 3), bolas = [[x, cy, r * 0.62]];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + h(i, sem, 71), d = r * (0.42 + 0.3 * h(i, sem, 72)); bolas.push([x + Math.cos(a) * d * 1.2, cy + Math.sin(a) * d * 0.72, r * (0.36 + 0.2 * h(i, sem, 73))]); }
  const marca = hex('#010203');
  for (const [bx, by, br] of bolas) disco(Math.round(bx), Math.round(by), Math.round(br) + 1, e_P.troncoS);
  for (const [bx, by, br] of bolas) disco(Math.round(bx), Math.round(by), Math.round(br), marca);
  for (let y = Math.max(0, cy - r * 2); y <= Math.min(179, cy + r * 2); y++) for (let xx = Math.max(0, x - r * 2); xx <= Math.min(319, x + r * 2); xx++) { if (B[y * 320 + xx] !== marca) continue;
    const l = ((xx - x) * 0.45 - (y - cy) * 1.1) / r + (h(xx >> 1, y >> 1, sem) - 0.5) * 0.9, q = h(xx, y, sem + 9);
    B[y * 320 + xx] = q < 0.06 ? p[3] : l > 0.42 ? p[2] : l < -0.38 ? p[0] : q > 0.93 ? p[0] : p[1]; }
}

// un tramo de valla de obra entre dos postes [x, base, alto] (puede ir en perspectiva): postes con su pie de hormigón,
// largueros y malla metálica de rombos, que deja ver lo de detrás; malla = 1: forrada de malla naranja de obra (con su
// trama de agujeros, la comba de arriba y el filo claro); malla = 2: la malla naranja medio caída de un lado; paso: la
// separación de los rombos de la malla metálica (4 por omisión; más, deja ver mejor lo de detrás)
function e_valla(R, x0, b0, h0, x1, b1, h1, malla = 0, sem = 0, paso = 4) {
  const { rect, pset } = R;
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / Math.max(1, x1 - x0), b = Math.round(lerp(b0, b1, u)), hh = lerp(h0, h1, u), top = Math.round(b - hh);
    const comba = malla ? Math.round(Math.sin(u * Math.PI) * hh * 0.08 + (malla === 2 ? u * u * hh * 0.5 : 0)) : 0;
    for (let y = top; y < b; y++) {
      if (y === top || y === b - 2) { pset(x, y, y === top ? e_P.metalL : e_P.metal); continue; }
      if (malla && y > top + 1 + comba && y < b - 2) pset(x, y, y === top + 2 + comba ? e_P.obraL : (x % 3 === 0 && y % 3 === 0) ? e_P.obraS : h(x >> 2, y >> 1, sem) < 0.22 ? e_P.obraM : (y - top) % 9 === 5 ? e_P.obraL : e_P.obra);
      else if ((x + y) % paso === 0 || (x - y + 400) % paso === 0) pset(x, y, e_P.eslabon);
    } }
  for (const [x, b, hh] of [[x0, b0, h0], [x1, b1, h1]]) { const top = Math.round(b - hh) - 1; rect(x, top, x + 1, b, e_P.metalL); rect(x + 1, top, x + 1, b, e_P.metalS); if (hh > 16) { rect(x - 3, b - 1, x + 4, b + 1, e_P.hormigon); rect(x - 3, b + 1, x + 4, b + 1, e_P.hormigonS); pset(x - 3, b - 1, e_P.aceraL); } }
}
// un montón de tierra: el perfil irregular, la luz por la derecha y la sombra por la izquierda con el paso tramado,
// terrones, piedras y alguna mata; p = [claro, medio, oscuro, muy oscuro]
function e_monton(R, cx, base, w, alto, sem, p = [e_P.tL, e_P.t0, e_P.t2, e_P.t3]) {
  const B = R.buf, m = w / 2;
  for (let i = -Math.round(m); i <= Math.round(m); i++) { const x = cx + i; if (x < 0 || x > 319) continue; const u = i / m, prof = Math.cos(u * Math.PI / 2) ** 0.8 * (1 + 0.1 * Math.sin(i * 0.5 + sem) + 0.08 * Math.sin(i * 0.23 + sem * 2)), top = Math.round(base - alto * prof);
    for (let y = Math.max(0, top); y <= base; y++) { const d = (y - top) / alto, l = u * 0.7 - d * 0.35 + (h(x >> 1, y >> 1, sem) - 0.5) * 0.7 + (e_umbral(x, y) - 0.5) * 0.25, q = h(x, y, sem + 3);
      B[y * 320 + x] = y === top ? p[3] : q < 0.03 ? e_P.piedra : q > 0.975 ? p[3] : l > 0.3 ? p[0] : l > -0.2 ? p[1] : p[2]; } }
  for (let k = 0; k < Math.round(w / 6); k++) { const x = Math.round(cx - m - 3 + h(k, sem, 5) * (w + 6)), y = base + Math.round(h(k, sem, 6) * 2); R.pset(x, y, p[2]); R.pset(x + 1, y, p[1]); if (k % 3 === 0) R.pset(x, y - 1, p[1]); }
}

// un cono de obra con sus dos franjas blancas y su base
function e_cono(R, x, base, s = 1) { const { rect } = R, a = 7 * s; rect(x - 3 * s, base - 1, x + 3 * s, base, e_P.obraS); for (let j = 0; j < a; j++) { const w = Math.round((j / a) * 2 * s); rect(x - w, base - 1 - a + j, x + w, base - 1 - a + j, j === 2 * s || j === 4 * s ? C.blanco : e_P.obra); } R.pset(x + 1, base - 3, e_P.obraS); }

// un obrero pequeño de fondo (10 px): casco amarillo, chaleco naranja con su franja y vaqueros; anda (pasos) o palea
function e_obrero(R, x, suelo, t, k = 0, o = {}) {
  const { rect, pset, linea } = R, dir = o.dir ?? 1, paso = o.anda ? Math.floor(t * 5 + k) % 2 : 0, pal = o.palea ? Math.sin(t * 3 + k) : 0;
  rect(x - 1, suelo - 3, x - 1, suelo - (paso ? 1 : 0), e_P.vaquero); rect(x + 1, suelo - 3, x + 1, suelo - (paso ? 0 : 1), e_P.vaquero);
  rect(x - 1, suelo - 7, x + 1, suelo - 4, e_P.chaleco); rect(x - 1, suelo - 6, x + 1, suelo - 6, e_P.luzL); rect(x - 1, suelo - 9, x + 1, suelo - 8, e_P.piel); rect(x - 1, suelo - 10, x + 1, suelo - 10, e_P.casco); pset(x + dir * 2, suelo - 9, e_P.casco);
  if (o.palea) { const hx = x + dir * 3, hy = suelo - 5 - Math.round(pal * 2); pset(x + dir * 2, suelo - 6, e_P.chaleco); linea(hx - dir, hy - 3, hx + dir * 2, hy + 3, e_P.mad1); rect(hx + dir * 2, hy + 3, hx + dir * 3, hy + 4, e_P.metal); if (pal > 0.6) { pset(hx + dir * 3, hy + 1, e_P.t1); pset(hx + dir * 4, hy, e_P.t0); } }
  else pset(x + dir * 2, suelo - 6 + paso, e_P.piel);
}

// hojas de otoño que caen meciéndose dentro de [x0, x1] × [y0, y1]
function e_hojas(R, t, x0, x1, y0, y1, n, sem = 0) {
  const c = [e_P.hoja0, e_P.hoja1, e_P.hoja2, e_P.hoja3];
  for (let k = 0; k < n; k++) { const v = 9 + h(k, sem, 81) * 9, u = ((t * v + h(k, sem, 82) * 400) % (y1 - y0 + 10)), y = Math.round(y0 + u), x = Math.round(x0 + h(k, sem, 83) * (x1 - x0) + Math.sin(t * 1.7 + k * 1.3) * 5 - u * 0.15);
    if (y > y1) continue; R.pset(x, y, c[k % 4]); if (Math.sin(t * 4 + k) > 0) R.pset(x + 1, y, c[k % 4]); else R.pset(x, y + 1, c[(k + 1) % 4]); }
}

// lo fijo de las obras (una vez, en su capa): la otra orilla, el puente, el muelle, las casas, los árboles, el terreno
// con el cuadro de arcilla y el césped arrancado, la caseta, la reja del bateador, los montones y la valla de delante
function e_obrasFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, P = e_P;
  // la otra orilla: bloques lejanos y brumosos, una arboleda, el obelisco y dos grúas del puerto
  for (let x = 118; x < 320; x++) { const bk = x >> 3, hh = 3 + Math.floor(h(bk, 1, 420) * 6) + (h(bk, 2, 420) > 0.8 ? 4 : 0);
    for (let y = 70 - hh; y < 70; y++) B[y * 320 + x] = (x & 7) === 7 ? P.lejosS : ((y & 1) && h(x >> 1, y, 421) < 0.3 ? P.lejosL : P.lejos);
    if (h(x >> 2, 3, 420) < 0.5) { B[68 * 320 + x] = hex('#8a9a8c'); B[69 * 320 + x] = hex('#8a9a8c'); if (h(x >> 1, 4, 420) < 0.5) B[67 * 320 + x] = hex('#b0a07c'); } }
  rect(151, 50, 153, 67, P.lejosL); rect(153, 51, 153, 67, P.lejosS); pset(152, 49, P.lejosL); pset(152, 48, P.lejosS);
  for (const gx of [172, 184]) { linea(gx, 68, gx, 53, P.lejosS); linea(gx - 4, 54, gx + 8, 54, P.lejosS); linea(gx, 51, gx + 7, 54, P.lejosS); pset(gx + 7, 56, P.lejosS); pset(gx + 7, 57, P.lejosS); }
  // el puente atirantado: dos torres en «Y» invertida, los tirantes en abanico y el tablero con sus pilas en el agua
  for (const tx of [218, 266]) { for (let k = 1; k <= 6; k++) { linea(tx, 38 + k, tx - k * 4, 62, P.puenteS); linea(tx, 38 + k, tx + k * 4, 62, P.puenteS); }
    linea(tx - 6, 80, tx, 47, P.puente); linea(tx - 5, 80, tx + 1, 47, P.puente); linea(tx + 6, 80, tx, 47, P.puenteS); linea(tx + 5, 80, tx - 1, 47, P.puenteS); rect(tx, 35, tx, 47, P.puente); rect(tx - 2, 56, tx + 2, 56, P.puenteS); pset(tx, 34, C.rojo); }
  rect(190, 62, 319, 62, P.puente); rect(190, 63, 319, 64, P.puenteS); rect(190, 65, 319, 65, P.lejosS); for (let x = 194; x < 320; x += 3) pset(x, 61, P.puenteS);
  for (const px of [198, 242, 294]) { rect(px, 66, px + 2, 80, P.puenteS); rect(px, 66, px, 80, P.puente); }
  // el borde del muelle: la albardilla de piedra, bolardos y una barandilla
  rect(118, 96, 319, 96, P.aceraL); rect(118, 97, 319, 98, P.hormigonS); for (let x = 122; x < 320; x += 9) { rect(x, 91, x, 96, P.metalS); } rect(118, 91, 319, 91, P.metalS); rect(118, 93, 319, 93, P.metalS);
  // las casas de ladrillo del barrio
  const LA = [P.lad0, P.lad1, P.lad2, P.ladJ], LB = [P.ladB0, P.ladB1, P.ladB2, P.ladBJ], LC = [P.ladC0, P.ladC1, P.ladC2, P.ladCJ];
  for (const [gx, gy] of [[26, 35], [61, 32], [93, 32]]) rect(gx, gy, gx, 106, P.ladB1);   // la medianera entre casa y casa
  e_casa(R, 94, 124, 27, 106, LB, 4, { escalera: 0, chimeneas: [[98, 5], [116, 4]] });
  e_casa(R, 62, 92, 32, 106, LC, 3, { jardineras: true, antena: true, chimeneas: [[66, 5]] });
  e_casa(R, 27, 60, 24, 106, LA, 2, { escalera: 1, chimeneas: [[30, 5], [52, 4]] });
  e_casa(R, -4, 25, 35, 106, LB, 1, { deposito: true, chimeneas: [] });
  for (const [dx, c] of [[40, hex('#2e5a4a')], [74, hex('#6a2a2a')], [104, hex('#2a3a5a')]]) { rect(dx - 1, 90, dx + 6, 106, P.cornisa); rect(dx, 92, dx + 5, 106, c); rect(dx, 92, dx + 5, 93, P.vidrioL); pset(dx + 4, 99, P.dorado); rect(dx - 2, 104, dx + 7, 106, P.hormigon); rect(dx - 2, 106, dx + 7, 106, P.hormigonS); }
  // los árboles de otoño de la acera de enfrente y el del fondo a la derecha
  e_arbolOto(R, 302, 108, 46, 15, 4, 0); e_arbolOto(R, 14, 110, 34, 11, 1, 2); e_arbolOto(R, 84, 110, 30, 10, 2, 1); e_arbolOto(R, 118, 110, 38, 12, 3, 0);
  // el terreno: la tierra removida, el cuadro de arcilla con sus pasadas de rastrillo, el césped del fondo arrancado a
  // tiras y, abajo, la acera de losas con su bordillo
  for (let y = 99; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y >= 166) { const fy = y - 168, fila = Math.floor(fy / 5), xx = x + fila * 7;
      c = y === 166 ? P.aceraL : y === 167 ? P.aceraS : (fy % 5 === 4 || xx % 14 === 0) ? P.aceraS : h(Math.floor(xx / 14), fila, 430) < 0.3 ? P.aceraL : P.acera; if (h(x, y, 431) < 0.03) c = P.aceraS; }
    else { const q = h(x >> 1, y, 432), q2 = h(x >> 2, y >> 1, 433), lej = y < 112 + 6 * e_umbral(x, y);
      c = q2 < 0.2 ? P.t2 : q < 0.22 ? P.t0 : q > 0.93 ? P.tL : lej ? P.t0 : P.t1;
      const e = ((x - 208) / 106) ** 2 + ((y - 151) / 25) ** 2;
      if (e < 1 - (e_umbral(x, y) - 0.5) * 0.3) { c = q2 < 0.13 ? P.arcillaS : q > 0.84 ? P.arcillaL : P.arcilla; if (y % 4 === 1 && h(x >> 3, y, 434) < 0.5) c = P.arcillaS; }
      const borde = 115 + 4 * Math.sin(x * 0.07) + 3 * Math.sin(x * 0.19 + 1);
      if (y < borde && x > 96 && e >= 1.2 && ((x + y * 2) % 52) > 12) { c = q < 0.3 ? P.cespedS : q > 0.86 ? P.cespedL : P.cesped; if (y > borde - 1.5 || ((x + y * 2) % 52) === 13) c = P.cespedD; } }
    B[y * 320 + x] = c; }
  // al pie de las casas, la calle con su acera y tres coches aparcados; más acá, un contenedor de escombros
  for (let y = 99; y < 110; y++) for (let x = 0; x < 128; x++) B[y * 320 + x] = y < 101 ? (x % 9 === 0 ? P.aceraS : P.aceraL) : y === 101 ? P.aceraS : y === 109 ? P.hormigonS : h(x >> 1, y, 441) < 0.15 ? hex('#5a5a68') : hex('#4e4e5c');
  for (const [cx, c, cS] of [[22, '#b83a3a', '#8a2a2e'], [58, '#e4e8ec', '#a8b0bc'], [96, '#3a5a8a', '#2a4268']]) { rect(cx - 13, 100, cx + 13, 105, hex(c)); rect(cx - 13, 104, cx + 13, 105, hex(cS)); rect(cx - 8, 95, cx + 7, 100, hex(c)); rect(cx - 7, 96, cx - 1, 99, P.vidrio); rect(cx + 1, 96, cx + 6, 99, P.vidrio); pset(cx - 5, 97, P.vidrioL); pset(cx + 3, 97, P.vidrioL); rect(cx - 8, 95, cx + 7, 95, e_mezcla(hex(c), C.blanco, 0.4)); disco(cx - 8, 106, 2, P.hierro); disco(cx + 8, 106, 2, P.hierro); pset(cx - 8, 106, P.metal); pset(cx + 8, 106, P.metal); pset(cx + 13, 102, C.amarillo); pset(cx - 13, 102, C.rojo); rect(cx - 12, 108, cx + 12, 108, hex('#3a3a48')); }
  { const x0 = 58, y0 = 114; poligono([[x0, y0], [x0 + 36, y0], [x0 + 32, y0 + 13], [x0 + 4, y0 + 13]], hex('#d8a020')); rect(x0, y0, x0 + 36, y0 + 1, hex('#f4c840')); for (let x = x0 + 6; x < x0 + 34; x += 7) rect(x, y0 + 2, x, y0 + 12, hex('#a87a14')); rect(x0 + 4, y0 + 13, x0 + 32, y0 + 13, hex('#7a5a10')); rect(x0 + 2, y0 + 14, x0 + 36, y0 + 14, P.t3);
    for (let k = 0; k < 12; k++) { const x = x0 + 3 + Math.round(h(k, 1, 442) * 30), y = y0 - 1 - Math.round(h(k, 2, 442) * 3); rect(x, y, x + 2, y + 1, k % 3 === 0 ? P.lad0 : k % 3 === 1 ? P.hormigon : P.madL); } linea(x0 + 20, y0 - 1, x0 + 30, y0 - 7, P.madL); }
  // las rodadas de las orugas (dos carriles de huellas) y las líneas de cal a medio borrar que salen de la base
  for (const [x0, y0, x1, y1, x2, y2] of [[124, 118, 190, 126, 236, 152], [318, 163, 290, 160, 262, 153]]) for (let s = 0; s <= 1; s += 0.004) { const a = (1 - s) ** 2, b = 2 * s * (1 - s), c2 = s * s, x = Math.round(a * x0 + b * x1 + c2 * x2), y = Math.round(a * y0 + b * y1 + c2 * y2);
    if (x % 3 !== 0) { pset(x, y, P.t3); pset(x, y + 4 + (y > 140 ? 1 : 0), P.t3); } else pset(x, y + 1, P.t2); }
  for (const [x1, y1] of [[118, 124], [306, 130]]) for (let s = 0.08; s <= 1; s += 0.01) { const x = Math.round(lerp(202, x1, s)), y = Math.round(lerp(156, y1, s)); if (h(x >> 2, y, 435) < 0.62) { pset(x, y, C.blanco); if (s < 0.5) pset(x + 1, y, hex('#e0d8c8')); } }
  // terrones sueltos, las marcas de pintura de las canalizaciones (azul y rosa) con sus banderines, la manguera naranja
  // que sale de la caseta, unos tablones y un palé con sacos
  for (let k = 0; k < 46; k++) { const x = 100 + Math.round(h(k, 1, 440) * 216), y = 112 + Math.round(h(k, 2, 440) * 50); if (y > 136 && y < 153 && x > 130 && x < 215) continue; pset(x, y, P.t3); pset(x + 1, y, P.t2); pset(x, y - 1, k % 2 ? P.tL : P.arcillaL); if (k % 3 === 0) { pset(x + 2, y, P.t3); pset(x + 1, y - 1, P.t0); } }
  for (let s = 0; s <= 1; s += 0.012) { const x = Math.round(lerp(134, 196, s)), y = Math.round(lerp(133, 126, s)); if (Math.floor(s * 20) % 2 === 0) { pset(x, y, hex('#4a8ad8')); } const x2 = Math.round(lerp(286, 240, s)), y2 = Math.round(lerp(128, 140, s) + Math.sin(s * 6)); if (Math.floor(s * 16) % 2 === 0) pset(x2, y2, hex('#e86aa0')); }
  for (const [fx, fy, c] of [[140, 132, '#4a8ad8'], [166, 129, '#4a8ad8'], [192, 126, '#4a8ad8'], [280, 129, '#e86aa0'], [258, 135, '#e86aa0']]) { rect(fx, fy - 5, fx, fy, P.metalS); rect(fx + 1, fy - 5, fx + 3, fy - 4, hex(c)); pset(fx + 1, fy - 3, hex(c)); }
  { let x = 150, y = 108; for (let i = 0; i < 70; i++) { x += -0.55 + Math.sin(i * 0.22) * 0.9; y += 0.42 + Math.cos(i * 0.31) * 0.25; pset(Math.round(x), Math.round(y), i % 7 === 6 ? P.obraS : P.obra); pset(Math.round(x), Math.round(y) + 1, P.t3); } }
  for (const [bx, by, bw] of [[278, 144, 26], [283, 147, 24]]) { rect(bx, by, bx + bw, by + 2, hex('#d8b47a')); rect(bx, by, bx + bw, by, hex('#ecd09a')); rect(bx, by + 2, bx + bw, by + 2, hex('#a8844e')); rect(bx - 1, by + 3, bx + bw, by + 3, P.t3); for (let i = 4; i < bw; i += 7) pset(bx + i, by + 1, hex('#a8844e')); }
  { const x = 196, y = 123; rect(x, y - 2, x + 18, y, P.mad1); rect(x, y - 3, x + 18, y - 3, P.madL); rect(x + 1, y, x + 2, y + 1, P.mad3); rect(x + 16, y, x + 17, y + 1, P.mad3); for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) { const sx = x + 1 + i * 9 - (j === 2 ? -4 : 0), sy = y - 7 - j * 4; if (j === 2 && i) continue; rect(sx, sy, sx + 7, sy + 3, hex('#d4ccb8')); rect(sx, sy + 3, sx + 7, sy + 3, hex('#a8a090')); rect(sx + 2, sy + 1, sx + 5, sy + 1, P.casetaA); } rect(x - 1, y + 2, x + 19, y + 2, P.t3); }
  for (let y = 100; y < 110; y++) for (let x = 126; x < 136; x++) if (x - 126 > (y - 100) * 0.4 && e_umbral(x, y) < 0.5) pset(x, y, P.t3);
  // el charco, que refleja el cielo
  for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) { const e = (i / 14) ** 2 + (j / 3.4) ** 2 + (h(i >> 1, j, 436) - 0.5) * 0.25; if (e < 1) pset(150 + i, 161 + j, e > 0.72 ? P.t3 : j < 0 ? hex('#7aa8cc') : hex('#9cc4e0')); }
  // al fondo: la valla del muelle (con paños de malla naranja), montones, tubos y la reja de detrás del bateador
  for (let k = 0; k < 6; k++) e_valla(R, 118 + k * 34, 105, 12, 118 + k * 34 + 34, 105, 12, k === 2 || k === 4 || k === 5 ? 1 : 0, k);
  e_monton(R, 292, 112, 50, 15, 7); e_monton(R, 258, 110, 30, 8, 8);
  for (const [px, py] of [[276, 111], [283, 111], [290, 111], [279, 105], [286, 105]]) { disco(px, py - 3, 3, hex('#4a8a8a')); disco(px, py - 3, 2, hex('#6ab0a8')); disco(px, py - 3, 1, P.hierro); pset(px - 1, py - 5, hex('#a8dcd0')); }
  for (let k = 0; k < 3; k++) e_valla(R, 208 + k * 18, 108, 34, 226 + k * 18, 108, 34, 0, k);
  for (let k = 0; k <= 3; k++) { const x = 208 + k * 18; linea(x, 74, x - 6, 68, P.metalL); linea(x + 1, 74, x - 5, 68, P.metalS); } linea(202, 68, 256, 68, P.metalL); for (let x = 203; x < 262; x++) for (let y = 69; y < 74; y++) if (((x + y) & 3) === 0 && x - (74 - y) < 262 - 6 + (y - 68)) pset(x, y, P.eslabon);
  rect(208, 100, 262, 101, hex('#3a6a4a')); rect(208, 102, 262, 102, hex('#2a4e38'));   // el zócalo de lona verde de la reja
  // la caseta de obra, con su puerta, su ventana, el tablón de avisos (pictogramas), el aire y los escalones
  { const x0 = 136, x1 = 190, y0 = 80, y1 = 105;
    rect(x0, y0, x1, y1, P.caseta); for (let x = x0 + 2; x < x1; x += 3) rect(x, y0 + 2, x, y1 - 1, P.casetaS); rect(x0, y0, x1, y0 + 1, P.casetaA); rect(x0, y0 + 2, x1, y0 + 2, P.metalS); rect(x1 - 2, y0 + 3, x1, y1, P.casetaS); rect(x0, y1, x1, y1, P.metalS);
    rect(x0 + 3, y1 + 1, x0 + 5, y1 + 2, P.hormigonS); rect(x1 - 6, y1 + 1, x1 - 4, y1 + 2, P.hormigonS);
    rect(x0 + 5, y0 + 6, x0 + 13, y1 - 1, P.casetaA); rect(x0 + 6, y0 + 7, x0 + 12, y0 + 12, P.vidrioL); rect(x0 + 6, y0 + 7, x0 + 12, y0 + 8, P.vidrio); pset(x0 + 12, y0 + 16, P.metalL); rect(x0 + 4, y1, x0 + 14, y1 + 1, P.metal); rect(x0 + 3, y1 + 2, x0 + 15, y1 + 3, P.metalS);
    rect(x0 + 18, y0 + 6, x0 + 34, y0 + 15, P.metalS); rect(x0 + 19, y0 + 7, x0 + 33, y0 + 14, P.vidrio); for (let j = 0; j < 4; j++) rect(x0 + 19, y0 + 7 + j * 2, x0 + 33, y0 + 7 + j * 2, P.marco); linea(x0 + 28, y0 + 14, x0 + 33, y0 + 9, P.vidrioL); rect(x0 + 26, y0 + 7, x0 + 26, y0 + 14, P.metalS);
    rect(x0 + 38, y0 + 5, x0 + 50, y0 + 16, C.blanco); rect(x0 + 38, y0 + 5, x0 + 50, y0 + 5, P.metalS); poligono([[x0 + 41, y0 + 7], [x0 + 44, y0 + 10], [x0 + 41, y0 + 13], [x0 + 38.6, y0 + 10]], C.amarillo); pset(x0 + 41, y0 + 9, C.k); pset(x0 + 41, y0 + 10, C.k); pset(x0 + 41, y0 + 12, C.k);
    disco(x0 + 47, y0 + 9, 2, C.azul); pset(x0 + 47, y0 + 8, C.blanco); pset(x0 + 47, y0 + 9, C.blanco); rect(x0 + 45, y0 + 13, x0 + 49, y0 + 13, C.rojo); rect(x0 + 45, y0 + 15, x0 + 48, y0 + 15, P.metalS);
    rect(x0 + 40, y0 + 19, x0 + 48, y0 + 23, P.metal); rect(x0 + 41, y0 + 20, x0 + 47, y0 + 22, P.metalS); pset(x0 + 44, y0 + 21, P.hierro);
    rect(x1 + 1, 66, x1 + 1, y1, P.metalS); rect(x1, y1, x1 + 2, y1 + 1, P.hormigonS); }
  // el váter portátil
  { const x0 = 195, y0 = 87; rect(x0, y0, x0 + 9, 106, hex('#3a8a9a')); rect(x0, y0, x0 + 9, y0 + 1, hex('#e4ecec')); rect(x0 + 8, y0 + 2, x0 + 9, 106, hex('#2a6a7a')); rect(x0 + 2, y0 + 4, x0 + 6, 105, hex('#4aa0b0')); rect(x0 + 3, y0 + 5, x0 + 5, y0 + 6, hex('#2a6a7a')); pset(x0 + 6, y0 + 11, C.blanco); rect(x0 - 1, 106, x0 + 10, 106, P.hormigonS); }
  // estacas de replanteo con su cinta, una carretilla y un rollo de malla
  for (const [sx, sy] of [[128, 132], [112, 150], [296, 132], [312, 150], [180, 122]]) { rect(sx, sy - 6, sx, sy, P.madL); pset(sx, sy - 7, P.obra); pset(sx + 1, sy, P.t3); pset(sx + 2, sy, P.t3); }
  { const x = 126, y = 124; poligono([[x - 6, y - 7], [x + 5, y - 7], [x + 3, y - 2], [x - 4, y - 2]], hex('#3a7a5a')); rect(x - 6, y - 7, x + 5, y - 7, hex('#5aa07a')); rect(x - 5, y - 9, x + 3, y - 8, P.t1); pset(x - 2, y - 10, P.t0); disco(x - 4, y, 1, P.hierro); linea(x + 4, y - 4, x + 10, y - 6, P.metalS); rect(x + 2, y - 2, x + 2, y, P.metalS); rect(x - 7, y + 1, x + 4, y + 1, P.t3); }
  // detrás de la valla de delante: un montón grande de tierra, rollos de césped levantado y unos tubos
  e_monton(R, 26, 152, 58, 34, 5); { const x = 40, y = 122; linea(x, y, x + 4, y - 13, P.mad2); linea(x + 1, y, x + 5, y - 13, P.mad1); rect(x + 3, y - 15, x + 6, y - 13, P.metalS); }
  for (const [rx, ry] of [[74, 156], [84, 156], [79, 149]]) { disco(rx, ry - 4, 5, P.cespedD); disco(rx, ry - 4, 4, P.cesped); disco(rx, ry - 4, 3, P.t2); disco(rx, ry - 4, 2, P.cespedS); pset(rx, ry - 4, P.t3); pset(rx - 2, ry - 7, P.cespedL); }
  rect(60, 157, 98, 157, P.t3);
  // la valla de delante: malla naranja, un paño despejado (el mirador) y la malla medio caída; la señal de prohibido
  // el paso (un pictograma) y, junto al poste de la entrada, la hoja de la verja abierta hacia dentro
  e_valla(R, 0, 164, 32, 32, 164, 32, 1, 1); e_valla(R, 33, 164, 32, 65, 164, 32, 0, 2); e_valla(R, 66, 164, 32, 98, 164, 32, 2, 3);
  rect(8, 138, 20, 150, C.blanco); rect(8, 138, 20, 138, P.metalS); rect(8, 150, 20, 150, P.metalS); disco(14, 144, 4, C.rojo); disco(14, 144, 3, C.blanco); rect(11, 143, 17, 145, C.rojo); pset(8, 137, P.metalL); pset(20, 137, P.metalL);
  e_valla(R, 100, 163, 31, 121, 148, 25, 0, 4); rect(98, 131, 99, 165, P.metalL); rect(100, 131, 100, 165, P.metalS);
  // la acera: una rejilla de desagüe, la boca de riego, el barro que sacan las orugas y las hojas caídas
  rect(134, 171, 146, 176, P.hierro); for (let x = 135; x < 146; x += 2) rect(x, 172, x, 175, P.aceraS);
  for (let j = -3; j <= 3; j++) for (let i = -7; i <= 7; i++) { const e = (i / 7.5) ** 2 + (j / 3.4) ** 2; if (e < 1) pset(188 + i, 174 + j, e > 0.7 ? P.hierro : (i + j) % 3 === 0 ? P.metalS : hex('#6e7280')); }
  { const x = 112, y = 177; rect(x - 2, y - 8, x + 2, y, C.rojo); rect(x + 1, y - 8, x + 2, y, C.rojoS); rect(x - 3, y - 6, x + 3, y - 5, C.rojo); rect(x - 1, y - 10, x + 1, y - 9, C.rojoS); pset(x - 1, y - 7, hex('#f08a7a')); rect(x - 3, y, x + 3, y, P.aceraS); }
  for (let k = 0; k < 120; k++) { const x = 236 + Math.round(h(k, 1, 437) * 84), y = 164 + Math.round(h(k, 2, 437) ** 0.7 * 15); pset(x, y, h(k, 3, 437) < 0.5 ? P.t1 : P.t2); if (k % 3 === 0) pset(x + 1, y, P.t1); }
  const hc = [P.hoja0, P.hoja1, P.hoja2, P.hoja3];
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 438) ** 1.5 * 319), y = k % 3 === 0 ? 108 + Math.round(h(k, 2, 438) * 54) : 167 + Math.round(h(k, 2, 438) * 12); if (k % 3 === 0 && x > 130) continue; pset(x, y, hc[k % 4]); if (k % 2) pset(x + 1, y, hc[(k + 1) % 4]); }
}

function e_obras(R, t, o = {}) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, P = e_P, G = e_GEO.obras;
  e_cielo(R, t, { hor: 72, modo: 'otono', sol: [240, 22, 7] });
  e_gaviotas(R, t, 196, 50, 3);
  // el agua del puerto, viva: bandas que se mecen y destellos (más bajo el sol)
  for (let y = 70; y < 99; y++) { const f = y * 320, d = y - 70;
    for (let x = 118; x < 320; x++) { const ola = Math.sin(x * 0.33 + t * 1.7 + y * 1.3) + Math.sin(x * 0.12 - t * 1.1 + y * 0.7), sol = Math.abs(x - 240) < 16 - d * 0.3;
      B[f + x] = ola > (sol ? 0.75 : 1.5) ? P.aguaL : d < 2 ? P.agua1 : ((y + Math.round(Math.sin(x * 0.08 + y + t * 0.5) * 1.4)) & 3) === 0 ? P.agua1 : d > 14 && e_umbral(x, y) < (d - 14) / 14 ? P.agua2 : P.agua0; } }
  // un velero y un transbordador que cruzan el puerto
  { const x = Math.round(118 + ((t * 5 + 40) % 230)), y = 79; poligono([[x + 1, y - 9], [x + 1, y - 1], [x + 7, y - 1]], C.blanco); poligono([[x, y - 7], [x, y - 1], [x - 4, y - 1]], hex('#e8e0d0')); rect(x - 5, y, x + 7, y + 1, hex('#2a4a6a')); rect(x - 4, y, x + 6, y, C.blanco); for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 4)) % 2) pset(x - 5 - i * 2, y + 2, P.aguaL); }
  { const x = Math.round(340 - ((t * 9 + 90) % 290)), y = 89; rect(x - 12, y - 3, x + 12, y, C.blanco); rect(x - 12, y - 1, x + 12, y, hex('#2a5a8a')); rect(x - 8, y - 6, x + 7, y - 4, hex('#e4e8ec')); for (let i = -7; i < 7; i += 3) pset(x + i, y - 5, P.vidrio); rect(x - 1, y - 9, x + 1, y - 7, C.rojoS); disco(x + 3 + Math.round(Math.sin(t) * 1), y - 12, 1, P.lejosL); pset(x + 6, y - 14, P.lejosL);
    for (let i = 1; i < 9; i++) if ((i + Math.floor(t * 5)) % 2) { pset(x + 12 + i * 2, y + 1, P.aguaL); pset(x + 13 + i * 3, y - 1 + (i % 3), P.aguaL); } }
  e_pega(R, e_capa(R, 'obras', () => e_obrasFijo(R)));
  // coches que cruzan el puente
  for (let k = 0; k < 5; k++) { const d = k % 2 ? 1 : -1, x = Math.round(190 + (((d * t * (11 + k * 3) + k * 41) % 130) + 130) % 130); pset(x, 61, [C.rojo, C.blanco, hex('#2a3a5a'), C.amarillo, hex('#e4e8ec')][k]); pset(x + 1, 61, hex('#3a4252')); }
  // la base del bateador: un pentágono blanco medio enterrado (sin ella, la marca en la arcilla)
  { const [bx, by] = G.base;
    if (o.base !== false) { poligono([[bx - 11, by - 5], [bx + 11, by - 5], [bx + 13, by], [bx, by + 6], [bx - 13, by]], P.t3); poligono([[bx - 10, by - 4], [bx + 10, by - 4], [bx + 11, by], [bx, by + 4], [bx - 11, by]], C.blanco); rect(bx - 9, by - 4, bx + 9, by - 4, hex('#d8d4c8')); R.linea(bx - 10, by + 1, bx, by + 5, hex('#b8b4a8')); R.linea(bx + 10, by + 1, bx, by + 5, hex('#b8b4a8')); pset(bx - 5, by - 1, P.arcillaL); pset(bx + 6, by, P.arcillaL); pset(bx + 2, by - 3, hex('#d8d4c8')); pset(bx - 1, by + 2, hex('#d8d4c8')); }
    else { poligono([[bx - 11, by - 5], [bx + 11, by - 5], [bx + 13, by], [bx, by + 6], [bx - 13, by]], P.t3); poligono([[bx - 9, by - 3], [bx + 9, by - 3], [bx + 10, by], [bx, by + 4], [bx - 10, by]], P.t4); pset(bx - 14, by + 3, P.tL); pset(bx + 14, by - 3, P.tL); pset(bx - 10, by + 2, P.t1); pset(bx + 11, by - 1, P.t1); pset(bx + 10, by + 3, P.t2); } }
  // la bandera naranja de la caseta y su baliza, el humo del generador y las cintas de las estacas, al viento
  for (let i = 0; i < 9; i++) { const yy = 67 + Math.round(Math.sin(t * 5 - i * 0.8) * (i / 6)); rect(192 + i, yy, 192 + i, yy + 4 - (i > 6 ? 1 : 0), i % 3 === 2 ? P.obraL : P.obra); }
  if (Math.floor(t * 2) % 2) { pset(137, 78, P.obraL); pset(137, 77, C.amarillo); pset(136, 78, P.obra); pset(138, 78, P.obra); } else pset(137, 78, P.obraS);
  for (const [sx, sy] of [[128, 132], [112, 150], [296, 132], [312, 150], [180, 122]]) { const f = Math.sin(t * 6 + sx) > 0 ? 1 : 0; pset(sx + 1, sy - 7, P.obra); pset(sx + 2, sy - 7 + f, P.obraL); pset(sx + 3, sy - 6 - f, P.obra); }
  // el charco riela y la malla naranja se mueve con el aire (un brillo que la recorre)
  for (let k = 0; k < 5; k++) { const x = 141 + ((k * 5 + Math.floor(t * 3)) % 19), y = 160 + (k % 3); if (B[y * 320 + x] !== P.t3) pset(x, y, C.blanco); }
  { const m = Math.floor(t * 26) % 150; for (let y = 134; y < 162; y++) for (let d = 0; d < 3; d++) { const x = m - (y - 134) + d; if (x >= 0 && x < 99 && B[y * 320 + x] === P.obra) B[y * 320 + x] = P.obraL; } }
  // dos obreros pequeños al fondo: uno va y viene con paso tranquilo y otro palea en el montón de la derecha
  { const u = (t * 0.06) % 1, ida = u < 0.5, x = Math.round(ida ? lerp(146, 194, u * 2) : lerp(194, 146, u * 2 - 1)); e_obrero(R, x, 119, t, 0, { anda: true, dir: ida ? 1 : -1 }); }
  e_obrero(R, 300, 122, t, 1, { palea: true, dir: -1 });
  for (const [px, py, k] of [[164, 174, 0], [171, 177, 1]]) { const pic = Math.sin(t * 3.2 + k * 2) > 0.5 ? 1 : 0; rect(px, py - 2, px + 3, py, hex('#7a7e8e')); pset(px + 3 + pic, py - 3 + pic, hex('#5a5e6e')); pset(px + 4 + pic, py - 3 + pic, C.naranja); pset(px, py - 1, hex('#9aa0b0')); pset(px + 1, py + 1, C.naranjaS); }
  e_hojas(R, t, 0, 130, 74, 162, 9, 1); e_hojas(R, t, 286, 320, 76, 150, 4, 2);
  return { ...G };
}

// lo de delante en las obras: a la derecha, la otra hoja de la verja (abierta), una barrera de plástico con su baliza
// que parpadea, dos conos y las hojas que caen por delante
function e_obrasDelante(R, t, o = {}) {
  const { rect, pset } = R, P = e_P;
  e_valla(R, 302, 179, 36, 324, 172, 34, 1, 6);
  { const x0 = 256, x1 = 292, y1 = 178; rect(x0, y1 - 12, x1, y1, C.blanco); rect(x0 + 2, y1 - 15, x1 - 2, y1 - 13, C.blanco); rect(x0, y1 - 1, x1, y1, hex('#c8c4bc')); for (let x = x0; x <= x1; x++) for (let y = y1 - 10; y <= y1 - 4; y++) if (((x - x0 + (y1 - y)) % 12) < 6) pset(x, y, y === y1 - 10 ? P.obraL : P.obra); rect(x0, y1 - 12, x0, y1, hex('#c8c4bc')); rect(x1, y1 - 12, x1, y1, P.casetaS); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, P.aceraS);
    const on = Math.floor(t * 2.5) % 2; rect(x0 + 5, y1 - 19, x0 + 8, y1 - 16, on ? C.amarillo : P.obraS); rect(x0 + 6, y1 - 20, x0 + 7, y1 - 20, P.hierro); if (on) { pset(x0 + 4, y1 - 18, P.luzL); pset(x0 + 9, y1 - 18, P.luzL); pset(x0 + 6, y1 - 21, P.luzL); pset(x0 + 6, y1 - 18, C.blanco); } }
  e_cono(R, 232, 178); e_cono(R, 214, 174); rect(210, 175, 218, 175, P.aceraS); rect(228, 179, 236, 179, P.aceraS);
  e_hojas(R, t, 110, 320, 118, 179, 5, 3);
  return {};
}

// el color del terreno cortado en (x, y): el mantillo oscuro con raicillas, la tierra vegetal, una hilada de grava, el
// relleno arcilloso con sus láminas onduladas y el fondo compacto con vetas; los límites, ondulados y tramados. Dentro de
// la fosa antigua (e_fosa) las capas se rompen: tierra revuelta, más suelta y clara, con terrones y su borde marcado
function e_estrato(x, y) {
  const P = e_P, um = e_umbral(x, y), w1 = 139 + Math.round(2.5 * Math.sin(x * 0.045) + 1.5 * Math.sin(x * 0.13 + 2)) + (um < 0.5 ? 0 : 1), w2 = 161 + Math.round(3 * Math.sin(x * 0.03 + 1) + 2 * Math.sin(x * 0.11)) + (um < 0.5 ? 0 : 2), q = h(x >> 1, y >> 1, 450), q1 = h(x, y, 451);
  if (y < 132) return y === 129 ? P.t4 : q1 < 0.35 ? P.t4 : y === 131 && q1 > 0.8 ? P.t2 : P.t3;
  const yf = e_fosa(x);
  if (yf && y <= yf) { const d = yf - y, q2 = h(x >> 2, (y + (x >> 3)) >> 1, 452);   // la tierra revuelta de la fosa
    if (d < 1.2) return P.t4; if (d < 2.2 && um < 0.6) return P.t3;
    return q2 < 0.2 ? P.arcilla : q2 > 0.82 ? P.t2 : q < 0.14 ? P.t0 : q > 0.9 ? P.t3 : q1 < 0.03 ? P.piedra : q1 > 0.975 ? P.arcillaL : P.t1; }
  if (y < w1 - 1) return q < 0.22 ? P.t3 : q > 0.9 ? P.t1 : q1 < 0.02 ? P.piedraS : P.t2;
  if (y <= w1) return q1 < 0.3 ? P.piedra : q1 < 0.52 ? P.piedraS : q1 > 0.9 ? P.aceraL : P.t3;   // la hilada de grava
  if (y < w2) { const lam = (y + Math.round(1.6 * Math.sin(x * 0.07 + (y >> 3)))) % 6 === 0;
    return lam && q1 < 0.78 ? P.arcillaS : q < 0.08 ? P.arcillaS : q > 0.92 ? P.arcillaL : q1 < 0.02 ? P.piedraS : q1 > 0.985 ? P.tL : P.arcilla; }
  if (y === w2) return P.t4;
  return q < 0.25 ? P.t4 : q > 0.9 ? P.t2 : q1 < 0.03 ? P.piedraS : (y + (x >> 4)) % 7 === 0 && q1 < 0.4 ? P.t2 : P.t3;
}
// el fondo del hoyo en la columna x (la y de su suelo, con el hoyo entero): la pared de la izquierda en talud, el suelo
// y, a la derecha, el escalón donde muerde la cuchara
function e_perfilHoyo(x) {
  if (x < 158 || x > 264) return 129;
  if (x < 170) return lerp(129, 158, (x - 158) / 12); if (x <= 240) return 158 + (h(x >> 2, 1, 452) < 0.3 ? -1 : 0);
  if (x < 246) return lerp(158, 141, (x - 240) / 6); if (x <= 256) return 141; return lerp(141, 129, (x - 256) / 8);
}

// un trozo del cofre roto en (x, y): los pares, de plástico transparente (azulado, con su filo de luz); los impares, de
// cerámica (crema, con un resto de pintura); el primero, más grande, con el dibujo del reloj de sol (un aro azul con su
// aguja); cada uno con su sombra de contacto debajo
function e_trozo(R, x, y, k) {
  const { pset, rect, poligono, linea } = R, P = e_P, az = hex('#2e56a8'), ro = hex('#c05a26');
  // la sombra de contacto: el trozo descansa en la tierra
  for (let i = -5; i <= 5; i++) if (k || i > -5) pset(x + i, y + (k === 0 ? 6 : k % 2 ? 5 : 4), e_P.t4);
  if (k === 0) { const ext = [[x - 10, y + 3], [x - 9, y - 5], [x - 4, y - 10], [x + 4, y - 10], [x + 7, y - 7], [x + 6, y - 4], [x + 10, y - 2], [x + 8, y + 2], [x + 9, y + 5], [x - 7, y + 5]];
    poligono(ext, C.k); poligono(ext.map(([i, j]) => [i + Math.sign(x - i), j + Math.sign(y - 2 - j)]), P.cer);
    rect(x - 6, y + 3, x + 6, y + 3, P.cerS); rect(x - 4, y - 8, x + 2, y - 8, C.blanco); pset(x - 7, y - 4, C.blanco);
    // el reloj de sol pintado, todo en azul como en el inserto de la mesa: el aro, la aguja en diagonal y dos marcas
    R.anillo(x - 1, y - 2, 5, az); linea(x - 4, y + 1, x + 2, y - 5, az); linea(x - 3, y + 1, x + 2, y - 4, az); pset(x - 1, y - 6, az); pset(x + 3, y - 2, az); pset(x - 3, y - 4, P.plS);
    pset(x + 7, y - 4, C.k); pset(x + 8, y + 1, P.cerS); return; }
  const s = h(k, 1, 453) < 0.5 ? 1 : -1;
  if (k % 2 === 0) { poligono([[x - 6 * s, y + 3], [x - 2 * s, y - 6], [x + 6 * s, y - 2], [x + 3 * s, y + 4]], P.metalS); poligono([[x - 5 * s, y + 2], [x - 2 * s, y - 5], [x + 5 * s, y - 2], [x + 2 * s, y + 3]], P.pl); linea(x - 2 * s, y - 5, x + 5 * s, y - 2, P.plL); linea(x - 2 * s, y - 4, x - 4 * s, y + 1, P.plL); linea(x - s, y + 2, x + 3 * s, y - 1, P.plS); pset(x, y - 2, C.blanco); pset(x + s, y - 2, C.blanco); }
  else { poligono([[x - 6, y + 2], [x - 3 * s, y - 5], [x + 5, y - 3], [x + 6, y + 2], [x - 1, y + 5]], C.k); poligono([[x - 5, y + 2], [x - 3 * s, y - 4], [x + 4, y - 3], [x + 5, y + 2], [x - 1, y + 4]], P.cer); rect(x - 2, y - 3, x + 2, y - 3, C.blanco); rect(x - 2, y, x + 1, y, k % 4 === 1 ? az : ro); pset(x + 2, y - 1, k % 4 === 1 ? az : ro); rect(x, y + 2, x + 3, y + 2, P.cerS); pset(x - 1, y + 3, P.cerS); }
}
// lo fijo del hoyo: las casas y los árboles del fondo, la camioneta de la obra, la valla (lona verde, malla naranja y
// paños despejados) con sus señales, el suelo y el terreno cortado entero (el hoyo se abre encima, vivo)
function e_hoyoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, P = e_P;
  const LA = [P.lad0, P.lad1, P.lad2, P.ladJ], LB = [P.ladB0, P.ladB1, P.ladB2, P.ladBJ], LC = [P.ladC0, P.ladC1, P.ladC2, P.ladCJ];
  for (const [gx, gy] of [[25, 41], [61, 39], [93, 39], [215, 43]]) rect(gx, gy, gx, 110, P.ladB1);   // la medianera entre casa y casa
  e_casa(R, 216, 248, 43, 110, LC, 14, { chimeneas: [[220, 5]], jardineras: true }); e_casa(R, 182, 214, 36, 110, LA, 13, { escalera: 1, chimeneas: [[204, 5]] });
  e_casa(R, 94, 128, 33, 110, LB, 12, { antena: true, chimeneas: [[98, 5]] }); e_casa(R, 62, 92, 39, 110, LC, 11, { escalera: 0, chimeneas: [[80, 4]] }); e_casa(R, 26, 60, 31, 110, LA, 10, { jardineras: true, chimeneas: [[30, 5], [50, 4]] }); e_casa(R, -6, 24, 41, 110, LB, 9, { deposito: true, chimeneas: [] });
  rect(129, 60, 181, 110, P.lejos); for (let y = 60; y < 110; y++) for (let x = 129; x <= 181; x++) if (h(x >> 2, y >> 2, 455) < 0.3) pset(x, y, P.lejosS); rect(129, 58, 181, 60, P.lejosL);   // una casa más lejana, entre las dos filas
  rect(249, 66, 319, 110, P.lejos); rect(249, 64, 319, 66, P.lejosL); for (let x = 254; x < 316; x += 9) for (let y = 71; y < 104; y += 11) rect(x, y, x + 3, y + 5, P.lejosS);
  e_arbolOto(R, 155, 112, 60, 20, 21, 0); e_arbolOto(R, 288, 112, 56, 21, 22, 1); e_arbolOto(R, 4, 112, 44, 14, 23, 2); e_arbolOto(R, 232, 112, 34, 11, 24, 2);
  // la camioneta de la obra, aparcada tras la valla
  { const x = 52, y = 117; rect(x - 18, y - 12, x + 20, y - 3, C.blanco); rect(x - 18, y - 5, x + 20, y - 3, hex('#c8ccd4')); rect(x + 2, y - 20, x + 15, y - 12, C.blanco); rect(x + 4, y - 19, x + 13, y - 14, P.vidrio); linea(x + 9, y - 14, x + 13, y - 18, P.vidrioL); rect(x + 16, y - 12, x + 20, y - 10, hex('#e4e8ec')); pset(x + 20, y - 8, C.amarillo); pset(x - 18, y - 9, C.rojo);
    rect(x - 18, y - 13, x, y - 13, P.metalS); rect(x - 16, y - 16, x - 4, y - 14, P.t1); rect(x - 13, y - 17, x - 7, y - 17, P.t0); rect(x - 6, y - 8, x + 4, y - 7, P.obra); disco(x - 11, y - 2, 3, P.hierro); disco(x - 11, y - 2, 1, P.metal); disco(x + 13, y - 2, 3, P.hierro); disco(x + 13, y - 2, 1, P.metal); rect(x + 8, y - 23, x + 10, y - 21, P.obra); }
  e_monton(R, 201, 120, 52, 24, 25);
  // el suelo: una franja de tierra pisada con terrones, piedrecillas, las huellas de las orugas a la derecha y unas matas de
  // césped que quedan a la izquierda
  for (let y = 111; y < 129; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y, 456), q2 = h(x >> 2, y >> 1, 457);
    let c = y < 113 ? (q < 0.5 ? P.t2 : P.t3) : q2 < 0.18 ? P.t1 : q < 0.2 ? P.tL : q > 0.94 ? P.t2 : P.t0;
    if (y >= 120 && x > 244 && x < 316 && (y === 121 || y === 126) && x % 3) c = P.t3; else if (y >= 121 && y <= 126 && x > 244 && x < 316 && x % 6 === 0) c = P.t2;
    if (x < 86 && y > 115 && h(x >> 1, y >> 1, 458) < 0.5 - x / 200) c = q < 0.35 ? P.cespedS : q > 0.85 ? P.cespedL : P.cesped;
    B[y * 320 + x] = c; }
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 459) * 319), y = 119 + Math.round(h(k, 2, 459) * 8); pset(x, y, P.piedra); pset(x + 1, y, P.piedraS); if (k % 4 === 0) { pset(x, y - 1, P.aceraL); } }
  // la valla: paños de 46 px (lona verde, despejado, lona, malla naranja medio caída, despejado y dos de lona, detrás de la excavadora)
  for (let k = 0; k < 7; k++) { const x0 = -6 + k * 46, tipo = [2, 0, 2, 1, 0, 2, 2][k];
    e_valla(R, x0, 119, 38, x0 + 46, 119, 38, tipo === 1 ? (k === 3 ? 2 : 1) : 0, 30 + k, 6);
    // la lona verde va por delante de la malla, atada al larguero por sus ojales: pliegues verticales, la comba de
    // abajo, el dobladillo y algún remiendo
    if (tipo === 2) { const v0 = hex('#32644a'), vS = hex('#285440'), vD = hex('#1e4030'), vL = hex('#40785a'), vLL = hex('#589270');
      for (let x = Math.max(0, x0 + 3); x <= Math.min(319, x0 + 45); x++) { const i = x - x0, pl = Math.sin(i * 0.52 + k * 1.7) + 0.5 * Math.sin(i * 0.17 + k), bajo = 114 - Math.round(1.6 * Math.abs(Math.sin(i * 0.2 + k)));
        for (let y = 84; y <= bajo; y++) { const q = h(x >> 1, y >> 1, 460 + k); B[y * 320 + x] = y === 84 || y === bajo ? vD : y === 85 ? vL : pl > 0.9 ? (e_umbral(x, y) < 0.6 ? vLL : vL) : pl > 0.35 ? vL : pl < -0.9 ? vD : pl < -0.4 ? vS : q < 0.1 ? vS : v0; }
        for (let y = bajo + 1; y < 117; y++) if ((x + y) % 2) B[y * 320 + x] = P.t4; }
      for (let x = x0 + 7; x < x0 + 44; x += 9) { if (x < 1 || x > 318) continue; pset(x, 86, P.metalL); pset(x, 87, vD); linea(x, 85, x, 82, P.cornisa); pset(x, 111, P.metalL); pset(x, 112, vD); }
      if (k === 5) { rect(x0 + 34, 104, x0 + 40, 109, vD); rect(x0 + 35, 105, x0 + 39, 108, hex('#4a8a8a')); pset(x0 + 35, 105, vLL); } if (k === 0) for (let j = 0; j < 7; j++) pset(x0 + 30 + (j >> 1), 99 + j, vD); } }
  // las señales: peligro (un rombo amarillo con «!») y casco obligatorio (un disco azul)
  { const x = 108, y = 96; poligono([[x, y - 8], [x + 8, y], [x, y + 8], [x - 8, y]], C.k); poligono([[x, y - 7], [x + 7, y], [x, y + 7], [x - 7, y]], C.amarillo); rect(x, y - 4, x, y + 1, C.k); rect(x - 1, y - 4, x + 1, y - 3, C.k); rect(x, y + 3, x, y + 4, C.k); }
  { const x = 234, y = 96; disco(x, y, 7, C.blanco); disco(x, y, 6, C.azul); rect(x - 3, y - 2, x + 3, y, C.blanco); rect(x - 2, y - 3, x + 2, y - 3, C.blanco); rect(x - 4, y + 1, x + 4, y + 1, C.blanco); }
  e_monton(R, 122, 122, 58, 10, 26); { const x = 138, y = 118; R.linea(x, y, x + 5, y - 16, P.mad2); R.linea(x + 1, y, x + 6, y - 16, P.mad1); rect(x + 4, y - 19, x + 7, y - 16, P.metalS); pset(x + 5, y - 20, P.metalS); }
  e_cono(R, 14, 125); e_cono(R, 150, 124);
  // el terreno cortado, con todo lo que guarda: piedras, cascotes de ladrillo, raíces, un tubo viejo de hierro, una
  // botella, una pelota de sóftbol perdida y la galería de un topo
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = e_estrato(x, y);
  for (let x = 0; x < 320; x++) { if (x < 86 && h(x >> 1, 1, 461) < 0.75 - x / 160) { B[128 * 320 + x] = P.cesped; if (h(x, 2, 461) < 0.5) B[127 * 320 + x] = P.cespedL; B[129 * 320 + x] = P.cespedD; if (x % 3 === 0) B[130 * 320 + x] = P.cespedD; } else if (h(x, 3, 461) < 0.4) B[128 * 320 + x] = P.t2; }
  for (let k = 0; k < 22; k++) { const x = Math.round(h(k, 1, 462) * 319), y = 140 + Math.round(h(k, 2, 462) * 38), r = 1 + Math.round(h(k, 3, 462) * 2.4); if (x > 150 && x < 272 && y < 166) continue;
    if (k % 6 === 5) { rect(x - 2, y - 1, x + 2, y + 1, P.lad1); rect(x - 2, y - 1, x + 1, y, P.lad0); pset(x - 1, y - 1, P.lad2); continue; }
    for (let j = -r; j <= r; j++) for (let i = -r - 1; i <= r + 1; i++) if ((i / (r + 1.3)) ** 2 + (j / (r + 0.3)) ** 2 < 1) pset(x + i, y + j, j < 0 && i > -r ? P.piedra : P.piedraS); pset(x, y - r, P.aceraL); pset(x - r - 1, y + r, P.t4); }
  for (const [rx, n, sem] of [[8, 4, 1], [292, 5, 2], [100, 2, 3]]) for (let k = 0; k < n; k++) { let x = rx + (k - n / 2) * 5, y = 130; const L = 14 + h(k, sem, 463) * 22; for (let i = 0; i < L; i++) { x += (h(i >> 1, k, sem + 464) - 0.5) * 1.6 + (k - n / 2) * 0.12; y += 1; pset(Math.round(x), y, i < L * 0.4 ? P.troncoS : P.t4); if (i < 5) pset(Math.round(x) + 1, y, P.tronco); if (i === Math.round(L * 0.5)) for (let j = 1; j < 6; j++) pset(Math.round(x) + j, y + (j >> 1), P.t4); } }
  { const y = 167; rect(0, y, 92, y + 5, hex('#7a4a34')); rect(0, y, 92, y, hex('#b0704a')); rect(0, y + 1, 92, y + 1, hex('#96583c')); rect(0, y + 5, 92, y + 5, hex('#4e2c20')); for (let x = 6; x < 92; x += 17) { rect(x, y - 1, x + 2, y + 6, hex('#5e3626')); rect(x, y - 1, x, y + 6, hex('#96583c')); }
    for (let k = 0; k < 30; k++) pset(Math.round(h(k, 1, 465) * 90), y + 1 + Math.round(h(k, 2, 465) * 3), h(k, 3, 465) < 0.5 ? hex('#c8703a') : hex('#4e2c20')); rect(93, y, 95, y + 5, hex('#4e2c20')); rect(93, y + 1, 94, y + 4, P.hierro); }
  { const x = 268, y = 154; rect(x - 5, y - 2, x + 3, y + 1, hex('#3a7a5a')); rect(x - 5, y - 2, x + 3, y - 2, hex('#6ab08a')); rect(x + 4, y - 1, x + 7, y, hex('#3a7a5a')); pset(x + 8, y - 1, hex('#2a5a42')); pset(x + 8, y, hex('#2a5a42')); rect(x - 3, y - 1, x - 1, y - 1, hex('#a8dcc0')); rect(x - 6, y - 1, x - 6, y, hex('#2a5a42')); }
  { const x = 112, y = 152; disco(x, y, 4, P.t4); disco(x, y, 3, C.blanco); pset(x - 2, y - 1, C.rojo); pset(x - 1, y - 2, C.rojo); pset(x - 1, y, C.rojo); pset(x + 1, y + 2, C.rojo); pset(x + 2, y + 1, C.rojo); pset(x + 1, y, C.rojo); pset(x + 2, y + 2, hex('#c8c4bc')); }
  for (let x = 262; x < 320; x++) { const yc = 171 + Math.round(Math.sin(x * 0.12) * 2); for (let j = -4; j <= 4; j++) { const y = yc + j; if (y > 179) continue; B[y * 320 + x] = Math.abs(j) === 4 ? P.t4 : h(x >> 1, y, 466) < 0.2 ? hex('#3a2418') : hex('#2a1a12'); } } disco(261, 171, 4, hex('#2a1a12'));
}
function e_hoyo(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, B = R.buf, P = e_P, G = e_GEO.hoyo, hondo = Math.max(0, Math.min(1, o.hondo ?? 1)), nt = Math.round(Math.max(0, Math.min(1, o.trozos ?? 1)) * G.trozos.length);
  e_cielo(R, t, { hor: 66, modo: 'otono', sol: null, cumulos: [[110, 30, 22, 1.2], [200, 38, 28, 1.8], [290, 26, 16, 0.9]] });
  e_gaviotas(R, t, 200, 22, 2);
  e_pega(R, e_capa(R, 'hoyo', () => e_hoyoFijo(R)));
  // el hoyo, abierto sobre el corte: la boca en el suelo, la pared del fondo en sombra con las marcas de la cuchara, el
  // filo de luz en el borde y la tierra suelta abajo
  if (hondo > 0.04) { const oscuro = hex('#1e120c');
    for (let x = 158; x <= 264; x++) { const yb = Math.round(129 + (e_perfilHoyo(x) - 129) * hondo), boca = Math.round(Math.min(7, (x - 158) * 0.9, (264 - x) * 0.9) * Math.min(1, hondo * 3));
      for (let y = 128 - boca; y <= yb; y++) { if (y < 129) { B[y * 320 + x] = y === 128 - boca ? P.t3 : e_umbral(x, y) < 0.7 ? P.t4 : oscuro; continue; }
        const c = e_estrato(x, y), a = 0.5 + (y - 129) * 0.006 + ((x + (y >> 1)) % 7 === 0 ? 0.14 : 0);
        B[y * 320 + x] = y === yb ? (h(x, 3, 470) < 0.6 ? P.t1 : P.tL) : y === yb - 1 && h(x >> 1, 4, 470) < 0.5 ? P.t2 : e_mezcla(c, oscuro, a); }
      if (boca > 0) B[(127 - boca) * 320 + x] = P.tL; }
    // el contorno del hoyo: el filo claro de la tierra recién cortada y, por fuera, una línea de sombra
    { let ya = 129; for (let x = 158; x <= 265; x++) { const yb = Math.round(129 + (e_perfilHoyo(x) - 129) * hondo); for (let y = Math.min(ya, yb); y <= Math.max(ya, yb); y++) { if (y > 129) { B[(y + 1) * 320 + x] = P.t4; if (Math.abs(ya - yb) > 1) B[y * 320 + x - (yb > ya ? 1 : 0)] = h(x, y, 471) < 0.6 ? P.t1 : P.tL; } } ya = yb; } }
    // la tierra suelta que queda en el fondo: montoncitos y terrones
    if (hondo > 0.5) for (let k = 0; k < 9; k++) { const x = 174 + k * 7 + Math.round(h(k, 1, 473) * 4), yb = Math.round(129 + (e_perfilHoyo(x) - 129) * hondo); pset(x, yb - 1, P.t0); pset(x + 1, yb - 1, P.t1); if (k % 3 === 0) { pset(x, yb - 2, P.tL); pset(x - 1, yb - 1, P.t1); } }
    // terrones que ruedan por el talud
    for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k * 0.27) % 1, x = Math.round(lerp(159, 170, u)), y = Math.round(lerp(130, 157, u * u) * hondo + 129 * (1 - hondo)); if (hondo > 0.5 && u < 0.9) { pset(x + 1, y - 1, P.t0); if (k % 2) pset(x + 2, y - 1, P.tL); } } }
  // los trozos del cofre (los que toque) y el destello que los recorre
  for (let k = 0; k < nt; k++) e_trozo(R, G.trozos[k][0], G.trozos[k][1], k);
  if (nt > 0) { const k = Math.floor(t * 1.6) % nt, [x, y] = G.trozos[k], f = (t * 1.6) % 1; if (f < 0.55) { pset(x - 1, y - 3, C.blanco); if (f > 0.12 && f < 0.42) { pset(x - 2, y - 3, C.blanco); pset(x, y - 3, C.blanco); pset(x - 1, y - 4, C.blanco); pset(x - 1, y - 2, C.blanco); } } }
  // vida: una ardilla corre por lo alto de la valla, dos palomas en un poste, las lombrices, el topo que asoma en su
  // galería, la gota del tubo viejo, la malla naranja que se mueve y las hojas que caen
  { const u = (t % 9) / 4.2; if (u < 1) { const x = Math.round(-10 + u * 340), y = 80 - (Math.floor(t * 9) % 2), c = hex('#8a5a3a'), cS = hex('#5e3a22'); rect(x - 3, y - 2, x + 2, y - 1, c); rect(x + 2, y - 4, x + 4, y - 2, c); pset(x + 4, y - 5, cS); pset(x + 4, y - 3, C.k); rect(x - 6, y - 5, x - 4, y - 2, cS); pset(x - 5, y - 6, c); pset(x - 7, y - 4, c); pset(x - 2 + (Math.floor(t * 9) % 2) * 3, y, cS); } }
  for (const [px, k] of [[178, 0], [183, 1]]) { const pic = Math.sin(t * 3 + k * 2) > 0.7 ? 1 : 0; rect(px, 78, px + 3, 80, hex('#7a7e8e')); pset(px + 3 + pic, 77 + pic, hex('#5a5e6e')); pset(px + 4 + pic, 77 + pic, C.naranja); pset(px, 79, hex('#9aa0b0')); }
  for (const [wx, wy, k] of [[40, 150, 0], [300, 146, 1], [196, 172, 2]]) for (let i = 0; i < 8; i++) pset(wx + i, wy + Math.round(Math.sin(t * 3 + i * 0.9 + k * 2) * 1.4), i === 7 ? hex('#c86a6a') : hex('#e89a9a'));
  { const sal = Math.sin(t * 0.7) > -0.2 ? 1 : 0, x = 296 - sal * 8, y = 171, c = hex('#4a4250'), cL = hex('#6a6272'); if (sal) { rect(x, y - 3, x + 12, y + 2, c); rect(x + 2, y - 3, x + 10, y - 3, cL); rect(x - 2, y - 1, x, y + 1, hex('#e8a0a0')); pset(x - 3, y, hex('#f0c0c0')); pset(x + 2, y - 1, (t % 3) < 0.15 ? c : C.blanco); rect(x + 3, y + 3, x + 5, y + 3, hex('#e8a0a0')); pset(x + 1 + (Math.floor(t * 4) % 2), y + 3, hex('#e8a0a0')); } else { rect(x, y - 3, x + 6, y + 2, c); rect(x + 1, y - 3, x + 5, y - 3, cL); } }
  { const u = (t * 0.8) % 1, y = Math.round(173 + u * u * 6); if (y < 180) pset(96, y, hex('#9cc4e0')); pset(96, 172, hex('#6a9ac0')); }
  { const m = Math.floor(t * 30) % 260; for (let y = 84; y < 116; y++) for (let d = 0; d < 3; d++) { const x = m - (y - 84) + d; if (x >= 0 && x < 320 && B[y * 320 + x] === P.obra) B[y * 320 + x] = P.obraL; } }
  // el viento en las lonas verdes: una onda de luz que las recorre
  { const v0 = hex('#32644a'), vL = hex('#40785a'), m = Math.floor(t * 22) % 400; for (let y = 86; y < 114; y++) for (let d = 0; d < 4; d++) { const x = m - 40 - ((y - 86) >> 1) + d; if (x >= 0 && x < 320 && B[y * 320 + x] === v0) B[y * 320 + x] = vL; } }
  e_hojas(R, t, 0, 320, 50, 126, 10, 5);
  return { ...G, trozosVistos: nt };
}
// lo de delante en el hoyo: las matas y los terrones del borde, que tapan los pies, y unas hojas que caen por delante
function e_hoyoDelante(R, t, o = {}) {
  const { pset } = R, P = e_P;
  for (let k = 0; k < 44; k++) { const x = Math.round(h(k, 1, 472) * 319); if (x > 154 && x < 268) continue; const q = h(k, 2, 472);
    if (x < 90 && q < 0.6) { pset(x, 127, P.cespedL); pset(x, 126 - (Math.sin(t * 2 + k) > 0.5 ? 1 : 0), P.cesped); pset(x + 1, 127, P.cespedS); } else { pset(x, 127, P.t1); pset(x + 1, 127, P.t2); if (q > 0.7) pset(x, 126, P.t2); } }
  e_hojas(R, t, 0, 320, 90, 178, 4, 6);
  return {};
}

const e_B = pal({ s0: '#d6bea4', s1: '#c2a890', s2: '#e8d2b2', sJ: '#a88c82', sD: '#84707e', sK: '#5e4e64', sL: '#f6e2bc', lado: '#f0a868', ladoS: '#d88454', ladoL: '#fcc884',
  vid: '#f0b850', vidL: '#fce08c', vidS: '#c8843a', vidO: '#4a4264', vidOL: '#6a6288', reja: '#2a2438', teja: '#9a5248', tejaS: '#743a40', tejaL: '#bc6c54',
  lej0: '#7a5484', lej1: '#5a3e70', lej2: '#44305c', lad: '#7c3c40', ladS: '#5c2a38', ladL: '#b06448', bl: '#e4d4cc', blS: '#a894ac', blL: '#fce8c8', piz: '#4a4468', pizL: '#8a6c84',
  los0: '#8c8296', los1: '#988ea0', losJ: '#6a6078', losL: '#c8a888', asf: '#4a4460', asfS: '#3c3652', bronce: '#4e7868', bronceS: '#365a52', bronceL: '#7aa890' });

// la silueta de una estatua de bronce sentada (una figura con manto, de frente), de 13 × 14
const e_ESTATUA = ['.....###.....', '....#####....', '....#####....', '.....###.....', '...#######...', '..#########..', '..#########..', '.###.###.###.', '.##..###..##.', '.##.#####.##.', '..##########.', '..###########', '.############', '.############'];

// el centro de cada uno de los siete ventanales de la fachada, y cuáles son los dos de las lápidas que se iluminan
const e_VANOS = [16, 48, 80, 112, 144, 176, 208], e_LUCES = [3, 4];

// una lápida con nombres grabados bajo su ventanal: un medallón redondo a la izquierda y tres filas de rayas desiguales
// (sin letras); con luz (0–1) se enciende en oro
function e_lapida(R, cx, luz = 0) {
  const { rect, pset, disco } = R, B = e_B, P = e_P, m = (a, b) => (luz > 0 ? e_mezcla(a, b, luz) : a);
  rect(cx - 11, 69, cx + 11, 80, m(B.sJ, P.luzS)); rect(cx - 10, 70, cx + 10, 79, m(B.s2, P.luz)); rect(cx - 10, 70, cx + 10, 70, m(B.sL, P.luzL)); rect(cx - 10, 79, cx + 10, 79, m(B.s1, P.luzS));
  const raya = m(B.sD, hex('#7a4a14'));
  [[cx - 2, cx + 8], [cx - 2, cx + 4], [cx + 6, cx + 8], [cx - 2, cx + 1], [cx + 3, cx + 7]].forEach(([xa, xb], i) => rect(xa, [72, 75, 75, 78, 78][i], xb, [72, 75, 75, 78, 78][i], raya));
  disco(cx - 6, 75, 4, m(B.sD, hex('#8a5818'))); disco(cx - 6, 75, 3, m(B.sL, P.luzL)); disco(cx - 6, 75, 1, m(B.s1, P.luzS)); pset(cx - 7, 73, m(B.sL, C.blanco));
}

// lo fijo de la biblioteca: los tejados lejanos, la iglesia con su campanario, la calle, la fachada entera y la plaza
function e_biblioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, Bf = R.buf, B = e_B, P = e_P;
  // los tejados lejanos, en dos términos, con chimeneas y alguna ventana encendida
  for (let x = 222; x < 320; x++) { const k = x >> 3, a = 88 + Math.round(h(k, 1, 480) * 9), b = 100 + Math.round(h(x >> 4, 2, 480) * 8);
    for (let y = a; y < 126; y++) Bf[y * 320 + x] = y === a ? B.lej0 : (x & 7) === 0 ? B.lej1 : B.lej0; if (h(k, 3, 480) < 0.3 && (x & 7) === 3) { Bf[(a - 1) * 320 + x] = B.lej1; Bf[(a - 2) * 320 + x] = B.lej1; }
    for (let y = b; y < 126; y++) Bf[y * 320 + x] = y === b ? B.lej0 : (x & 15) === 0 ? B.lej2 : B.lej1; }
  for (let k = 0; k < 16; k++) { const x = 224 + Math.round(h(k, 4, 480) * 92), y = 104 + Math.round(h(k, 5, 480) * 16); if (x > 244 && x < 272) continue; rect(x, y, x + 1, y + 2, k % 3 ? P.luz : P.luzS); }
  // la iglesia de ladrillo: la torre con su ventana y su óculo, el cuerpo blanco de las campanas (el vano donde cuelga el
  // farol), el segundo cuerpo, la aguja de pizarra con la veleta y la nave con tres ventanas encendidas; el sol poniente
  // le da por la derecha
  { const x0 = 248, x1 = 268, mx = 258;
    poligono([[x1, 96], [319, 96], [319, 104], [x1, 104]], B.piz); for (let x = x1; x < 320; x++) for (let y = 96; y < 104; y++) if ((x + y * 2) % 5 === 0) pset(x, y, B.pizL); rect(x1, 95, 319, 95, B.pizL);
    e_ladrillos(R, x1, 104, 319, 126, [B.lad, B.ladS, B.ladL, B.ladS], 31); for (const wx of [278, 294, 310]) { rect(wx - 3, 109, wx + 3, 122, B.sK); disco(wx, 109, 3, B.sK); rect(wx - 2, 109, wx + 2, 121, B.vid); disco(wx, 109, 2, B.vidL); rect(wx, 107, wx, 121, B.vidS); rect(wx - 2, 114, wx + 2, 114, B.vidS); }
    e_ladrillos(R, x0, 60, x1, 126, [B.lad, B.ladS, B.ladL, B.ladS], 32); rect(x1 - 2, 60, x1, 126, B.ladL); rect(x1, 60, x1, 126, B.lado); rect(x0, 60, x0 + 1, 126, B.ladS);
    rect(mx - 3, 70, mx + 3, 84, B.sK); disco(mx, 70, 3, B.sK); rect(mx - 2, 70, mx + 2, 83, B.vidO); disco(mx, 70, 2, B.vidOL); rect(mx, 68, mx, 83, B.blS); rect(mx - 2, 76, mx + 2, 76, B.blS); disco(mx, 96, 4, B.blS); disco(mx, 96, 3, B.bl); pset(mx, 96, B.sK); linea(mx, 96, mx + 2, 94, B.sK); linea(mx, 96, mx, 93, B.sK);
    rect(mx - 4, 108, mx + 4, 126, B.sK); disco(mx, 108, 4, B.sK); rect(mx - 3, 109, mx + 3, 126, hex('#3e2a30')); rect(mx, 106, mx, 126, B.sK); rect(x0 - 1, 100, x1 + 1, 101, B.blS);
    rect(x0 - 1, 58, x1 + 1, 60, B.bl); rect(x0 - 1, 60, x1 + 1, 60, B.blS); rect(x0 + 1, 44, x1 - 1, 58, B.bl); rect(x0 + 1, 44, x0 + 3, 58, B.blS); rect(x1 - 3, 44, x1 - 1, 58, B.blL);
    rect(mx - 4, 48, mx + 4, 57, B.sK); disco(mx, 48, 4, B.sK); rect(mx - 3, 48, mx + 3, 57, hex('#2e2440')); disco(mx, 48, 3, hex('#2e2440')); rect(x0, 42, x1, 43, B.bl); for (let x = x0; x <= x1; x += 2) pset(x, 41, B.bl); rect(x0, 44, x1, 44, B.blS);
    rect(mx - 6, 32, mx + 6, 41, B.bl); rect(mx - 6, 32, mx - 4, 41, B.blS); rect(mx + 4, 32, mx + 6, 41, B.blL); rect(mx - 1, 34, mx + 1, 40, hex('#2e2440')); pset(mx, 33, hex('#2e2440')); rect(mx - 7, 31, mx + 7, 31, B.blS);
    poligono([[mx - 6, 31], [mx, 11], [mx + 6, 31]], B.piz); linea(mx + 1, 13, mx + 6, 31, B.lado); linea(mx, 13, mx + 4, 30, B.pizL); rect(mx, 7, mx, 11, B.sK); rect(mx - 2, 8, mx + 2, 8, B.sK); pset(mx + 3, 7, B.sK); disco(mx, 12, 1, P.dorado); }
  // los árboles oscuros del atrio y la verja de hierro de la iglesia
  for (const [ax, r] of [[284, 6], [236, 6]]) { rect(ax, 118, ax, 128, hex('#3a2430')); for (let j = -r; j <= r; j++) for (let i = -r - 1; i <= r + 1; i++) { const e = (i / (r + 1.5)) ** 2 + (j / r) ** 2 + h(i >> 1, j >> 1, ax) * 0.25; if (e < 1) pset(ax + i, 115 + j, e > 0.62 && i > 0 && j < 2 ? hex('#d07840') : h(ax + i, j, 481) < 0.18 ? hex('#a84a34') : j > r * 0.2 ? hex('#5a2a38') : hex('#84383a')); } }
  for (let x = 226; x < 320; x += 3) rect(x, 121, x, 128, B.reja); rect(226, 122, 319, 122, B.reja); rect(226, 128, 319, 129, B.sK);
  // la calle de la derecha: la calzada con su paso de cebra y el bordillo
  for (let y = 130; y < 146; y++) for (let x = 222; x < 320; x++) Bf[y * 320 + x] = y === 130 ? B.losJ : y >= 144 ? (y === 144 ? B.los1 : B.losJ) : h(x >> 1, y, 482) < 0.18 ? B.asfS : B.asf;
  for (let x = 232; x < 316; x += 9) for (let y = 134; y < 142; y++) for (let i = 0; i < 5; i++) if (h(x + i, y, 483) < 0.85) pset(x + i - Math.round((y - 134) * 0.5), y, hex('#b8a8b8'));
  // la biblioteca: los sillares (cada uno con su tono), el zócalo almohadillado y la sombra bajo la cornisa
  for (let y = 30; y < 138; y++) for (let x = 0; x < 224; x++) { const bajo = y >= 88, fy = bajo ? 7 : 6, fila = Math.floor((y - 30) / fy), jy = (y - 30) % fy === fy - 1, xx = x + (fila & 1) * 8, jx = xx % 16 === 15, q = h(Math.floor(xx / 16), fila, 484);
    let c = jy || jx ? (bajo ? B.sD : B.sJ) : q < 0.22 ? B.s1 : q > 0.8 ? B.s2 : B.s0;
    if (bajo && !jy && !jx && ((y - 30) % fy === 0 || xx % 16 === 0)) c = B.sL; if (h(x, y, 485) < 0.02) c = B.s1; if (y < 42 && e_umbral(x, y) < (42 - y) / 8) c = B.sD;
    Bf[y * 320 + x] = c; }
  // el lado de la derecha, que recibe el sol poniente
  for (let y = 30; y < 138; y++) for (let x = 224; x < 234; x++) { const jy = (y - 30) % 6 === 5; Bf[y * 320 + x] = x === 224 ? B.sL : jy ? B.ladoS : h(x >> 1, y >> 2, 486) < 0.25 ? B.ladoL : B.lado; }
  for (const wy of [50, 104]) { rect(227, wy, 231, wy + 14, B.sK); rect(228, wy + 1, 230, wy + 13, B.vidO); pset(229, wy + 3, B.vidOL); }
  // el tejado de teja con su crestería de cobre verde y la cornisa con dentículos
  for (let y = 22; y < 30; y++) for (let x = 0; x < 236; x++) { if (x > 226 + (y - 20)) continue; const m = (x + (((y - 20) / 3) | 0) * 2) % 4; Bf[y * 320 + x] = y === 22 ? B.tejaL : m === 0 ? B.tejaS : (y - 20) % 3 === 2 ? B.tejaS : h(x >> 2, y, 487) < 0.2 ? B.tejaL : B.teja; }
  for (let x = 0; x < 230; x++) { Bf[21 * 320 + x] = P.cobreS; Bf[20 * 320 + x] = x % 4 < 2 ? P.cobre : P.cobreS; if (x % 8 === 1 && (x < 18 || x > 172)) Bf[19 * 320 + x] = P.cobre; }
  rect(0, 30, 236, 31, B.sL); rect(0, 32, 235, 34, B.s2); for (let x = 0; x < 235; x += 4) rect(x, 33, x + 1, 34, B.sJ); rect(0, 35, 234, 35, B.sD); rect(0, 36, 224, 37, B.s2); rect(0, 38, 224, 38, B.sJ);
  rect(0, 39, 223, 41, B.s0); for (let x = 4; x < 220; x += 3) if (h(x, 1, 488) < 0.8 && x % 32 > 3) pset(x, 40, B.sD);   // el friso, con su inscripción a rayas
  // los siete ventanales en arco: la moldura, la vidriera encendida con su abanico de maineles y, entre arco y arco, un florón
  e_VANOS.forEach((cx, k) => { const cy = 55, on = k !== 0 && k !== 5;
    for (let y = 43; y <= 66; y++) for (let x = cx - 12; x <= cx + 12; x++) { const dx = x - cx, dy = y - cy, d = dy < 0 ? Math.hypot(dx, dy) : Math.abs(dx); if (d > 12 || x < 0) continue;
      let c; if (d > 10.5) c = B.sL; else if (d > 9.5) c = B.sD;
      else { const an = Math.atan2(-dy, dx), radial = dy < 0 && d > 3 && Math.abs(((an / (Math.PI / 6)) % 1) - 0.5) > 0.42, reja = dx === 0 || Math.abs(dx) === 5 || dy === 0 || dy === 6 || radial || (dy < 0 && Math.abs(d - 3.5) < 0.6);
        c = reja ? B.reja : on ? (d < 5 && dy < 4 ? B.vidL : h(x >> 1, y >> 1, 489 + k) < 0.25 ? B.vidS : B.vid) : (h(x >> 1, y >> 1, 489 + k) < 0.3 ? B.vidOL : B.vidO); if (on && dy > 8) c = (x + k) % 4 < 2 ? hex('#8a4a2a') : hex('#6a3a3a'); }
      Bf[y * 320 + x] = c; }
    rect(cx - 1, 41, cx + 1, 44, B.sL); pset(cx, 45, B.sD); rect(cx - 13, 67, cx + 13, 67, B.sL); rect(cx - 13, 68, cx + 13, 68, B.sD);
    if (cx + 16 < 224) { disco(cx + 16, 48, 3, B.sD); disco(cx + 16, 48, 2, B.s2); pset(cx + 16, 48, B.sD); pset(cx + 15, 47, B.sL); }
    e_lapida(R, cx, 0); });
  // la imposta entre los dos pisos
  rect(0, 83, 224, 84, B.sL); rect(0, 85, 224, 86, B.s2); rect(0, 87, 224, 87, B.sD);
  // el piso bajo: ventanas con reja a los lados y, en el centro, las tres puertas en arco con sus cancelas de hierro
  for (const cx of [16, 48, 176, 208]) { rect(cx - 8, 98, cx + 8, 124, B.sL); rect(cx - 7, 99, cx + 7, 123, B.vidO); for (let x = cx - 7; x <= cx + 7; x += 3) rect(x, 99, x, 123, B.reja); for (let y = 102; y < 123; y += 5) rect(cx - 7, y, cx + 7, y, B.reja); rect(cx - 9, 124, cx + 9, 125, B.sL); rect(cx - 9, 126, cx + 9, 126, B.sD); pset(cx - 4, 101, B.vidOL); pset(cx + 2, 106, B.vidOL); }
  for (const cx of [80, 112, 144]) { for (let y = 99; y < 138; y++) for (let x = cx - 10; x <= cx + 10; x++) { const dx = x - cx, dy = y - 110, d = dy < 0 ? Math.hypot(dx, dy) : Math.abs(dx); if (d > 10) continue;
      let c; if (d > 8.5) c = B.sL; else if (d > 7.5) c = B.sK;
      else { const luz = 1 - Math.hypot(dx / 9, (y - 124) / 22); c = e_umbral(x, y) < luz * 0.9 ? B.vid : e_umbral(x, y) < luz * 1.5 ? B.vidS : hex('#5a3a3a'); if (dx % 3 === 0 || dy === 0 || y === 126) c = B.reja; if (dy < 0 && Math.abs(d - 4) < 0.6) c = B.reja; if (y > 126 && Math.abs(dx) === 1) c = B.reja; }
      Bf[y * 320 + x] = c; }
    rect(cx - 2, 96, cx + 2, 100, B.sL); rect(cx - 1, 97, cx + 1, 99, B.s1); pset(cx, 101, B.sD); pset(cx - 2, 128, P.dorado); pset(cx + 2, 128, P.dorado); }
  // los faroles de hierro entre las puertas (sus luces, vivas, van encima) y los pendones a los lados
  for (const fx of [64, 96, 128, 160]) { rect(fx, 104, fx, 118, B.reja); rect(fx - 4, 110, fx + 4, 110, B.reja); rect(fx - 4, 108, fx - 4, 110, B.reja); rect(fx + 4, 108, fx + 4, 110, B.reja); rect(fx - 1, 118, fx + 1, 120, B.reja); pset(fx, 121, B.reja); }
  for (const [px, c, cS] of [[32, hex('#3a4a8a'), hex('#2a3668')], [192, hex('#8a3040'), hex('#682434')]]) { rect(px - 4, 90, px + 4, 90, B.reja); rect(px - 3, 91, px + 3, 112, c); rect(px + 2, 91, px + 3, 112, cS); poligono([[px - 3, 112], [px, 115], [px + 3, 112]], c); disco(px, 99, 2, P.dorado); pset(px, 99, c); rect(px - 2, 105, px + 2, 105, P.dorado); }
  // la escalinata, con sus dos pedestales y sus estatuas de bronce sentadas, y el zócalo de granito
  rect(0, 138, 234, 145, B.sD); for (let x = 0; x < 234; x++) if (x % 18 === 0) rect(x, 139, x, 144, B.sK); rect(0, 138, 234, 138, B.sJ);
  for (let k = 0; k < 4; k++) { rect(58 - k * 3, 138 + k * 2, 166 + k * 3, 139 + k * 2, k % 2 ? B.s0 : B.sL); rect(58 - k * 3, 139 + k * 2, 166 + k * 3, 139 + k * 2, B.sJ); }
  for (const px of [42, 182]) { rect(px - 8, 126, px + 8, 145, B.s0); rect(px - 8, 126, px + 8, 127, B.sL); rect(px + 5, 128, px + 8, 145, B.s1); rect(px - 9, 124, px + 9, 125, B.s2); rect(px - 9, 144, px + 9, 145, B.sJ); rect(px - 5, 132, px + 3, 139, B.s1); rect(px - 4, 133, px + 2, 138, B.s0);
    e_ESTATUA.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') pset(px - 6 + i, 110 + j, i > 8 ? B.bronceS : i < 4 || j < 2 ? B.bronceL : B.bronce); }); pset(px - 1, 111, B.bronceL); rect(px - 3, 119, px + 2, 119, B.bronceS); }
  // la plaza: losas grandes en perspectiva, con la luz cálida de los faroles y de las puertas, y hojas caídas
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const d = y - 146, fila = d < 4 ? 0 : d < 10 ? 1 : d < 18 ? 2 : d < 27 ? 3 : 4, jy = d === 4 || d === 10 || d === 18 || d === 27, px = (x - 160) * 100 / (y - 40) + fila * 23, jx = ((Math.floor(px) % 46) + 46) % 46 === 0;
    let c = jy || jx ? B.losJ : h(Math.floor(px / 46), fila, 490) < 0.35 ? B.los1 : B.los0; if (h(x, y, 491) < 0.03) c = B.losJ;
    const lz = Math.max(1 - Math.hypot((x - 112) / 70, (y - 144) / 16), 1 - Math.hypot((x - 258) / 30, (y - 150) / 8)); if (lz > 0 && e_umbral(x, y) < lz * 0.8 && !jy && !jx) c = B.losL;
    Bf[y * 320 + x] = c; }
  const hc = [P.hoja0, P.hoja1, P.hoja2, P.hoja3]; for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 492) * 319), y = 148 + Math.round(h(k, 2, 492) * 31); pset(x, y, hc[k % 4]); if (k % 2) pset(x + 1, y, hc[(k + 1) % 4]); }
  { const ax = 292, B2 = R.buf; rect(ax - 1, 100, ax + 1, 150, hex('#3a2430')); rect(ax + 1, 100, ax + 1, 150, hex('#6a3a34')); linea(ax, 112, ax - 8, 100, hex('#3a2430')); linea(ax, 108, ax + 8, 98, hex('#3a2430')); rect(ax - 5, 150, ax + 5, 151, B.reja); for (let i = -5; i <= 5; i += 2) pset(ax + i, 152, B.reja);
    const bolas = [[0, 0, 11], [-10, 4, 8], [10, 3, 8], [-5, -7, 8], [6, -8, 7], [0, 8, 8], [-13, -2, 5], [14, -3, 5]], marca = hex('#010203');
    for (const [dx, dy, r] of bolas) disco(ax + dx, 88 + dy, r + 1, hex('#3a2030')); for (const [dx, dy, r] of bolas) disco(ax + dx, 88 + dy, r, marca);
    for (let y = 66; y < 108; y++) for (let x = ax - 22; x <= Math.min(319, ax + 22); x++) { if (B2[y * 320 + x] !== marca) continue; const l = ((x - ax) * 0.8 - (y - 88) * 0.5) / 14 + (h(x >> 1, y >> 1, 493) - 0.5) * 0.9, q = h(x, y, 495); B2[y * 320 + x] = q < 0.05 ? hex('#f8c060') : l > 0.5 ? hex('#e8843c') : l < -0.3 ? hex('#6a2a38') : q > 0.9 ? hex('#6a2a38') : hex('#a84438'); } }
  // dos farolas de la plaza y un banco
  for (const fx of [246, 270]) { rect(fx, 100, fx, 146, B.reja); rect(fx - 1, 144, fx + 1, 146, B.reja); rect(fx - 2, 98, fx + 2, 99, B.reja); rect(fx - 1, 92, fx + 1, 97, P.luz); pset(fx, 91, B.reja); rect(fx - 2, 91, fx + 2, 91, B.reja); }
  { const x = 196, y = 150; rect(x, y - 6, x + 22, y - 5, hex('#6a4a3a')); rect(x, y - 3, x + 22, y - 2, hex('#7a563e')); rect(x + 1, y - 6, x + 1, y, B.reja); rect(x + 21, y - 6, x + 21, y, B.reja); rect(x, y - 9, x + 22, y - 8, hex('#6a4a3a')); rect(x + 1, y - 9, x + 1, y - 6, B.reja); rect(x + 21, y - 9, x + 21, y - 6, B.reja); }
}

function e_biblioteca(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, Bf = R.buf, B = e_B, P = e_P, G = e_GEO.biblioteca, luz0 = Math.max(0, Math.min(1, o.luz ?? 0)), luces = [Math.max(0, Math.min(1, o.luz1 ?? luz0)), Math.max(0, Math.min(1, o.luz2 ?? luz0))], farol = Math.max(0, Math.min(1, o.farol ?? 1));
  e_cielo(R, t, { hor: 128, modo: 'ocaso', sol: [300, 112, 9], cumulos: [[330, 70, 24, 1.1], [400, 84, 18, 0.8], [296, 58, 16, 1.4]] });
  for (let k = 0; k < 12; k++) { const x = 176 + Math.round(h(k, 1, 494) * 92), y = 3 + Math.round(h(k, 2, 494) * 30); if (Math.sin(t * (1.5 + k * 0.3) + k) > -0.3) pset(x, y, k % 3 ? hex('#a8a4d8') : C.blanco); }
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 74, cada: 10, v: 44 });
  e_pega(R, e_capa(R, 'biblioteca', () => e_biblioFijo(R)));
  // en las vidrieras encendidas, las siluetas de los lectores que pasan y una lámpara que oscila apenas
  e_VANOS.forEach((cx, k) => { if (k === 0 || k === 5) return; const u = ((t * (2.2 + k * 0.4) + k * 9) % 34) - 6, x = Math.round(cx - 9 + u);
    if (u > 0 && u < 18 && Bf[60 * 320 + x] !== B.reja) { for (let y = 58; y <= 63; y++) if (Bf[y * 320 + x] !== B.reja) pset(x, y, hex('#5a3a3a')); pset(x, 57, hex('#5a3a3a')); if (Bf[58 * 320 + x + 1] !== B.reja) pset(x + 1, 59, hex('#5a3a3a')); } });
  // las dos lápidas que se iluminan: se encienden en oro, con un halo tramado que late y destellos; cada una con su
  // luz (o.luz1 la de la izquierda, o.luz2 la de la derecha; la que no se pase sigue a o.luz)
  for (const [n, k] of e_LUCES.entries()) { const luz = luces[n]; if (luz <= 0) continue; const cx = e_VANOS[k], late = 0.85 + 0.15 * Math.sin(t * 4 + k), rr = 20 * luz * late;
    for (let y = 75 - 16; y <= 75 + 16; y++) for (let x = cx - 26; x <= cx + 26; x++) { const d = Math.hypot((x - cx) * 0.7, y - 75); if (d < rr && e_umbral(x, y) < (1 - d / rr) * 0.75 * luz) Bf[y * 320 + x] = e_mezcla(Bf[y * 320 + x], P.luzL, 0.55); }
    e_lapida(R, cx, luz);
    if (luz > 0.6) for (let j = 0; j < 4; j++) { const a = t * 1.2 + j * 1.57 + k, x = Math.round(cx + Math.cos(a) * 15), y = Math.round(75 + Math.sin(a) * 9); if (Math.sin(t * 6 + j * 2) > 0) { pset(x, y, C.blanco); pset(x - 1, y, P.luzL); pset(x + 1, y, P.luzL); pset(x, y - 1, P.luzL); pset(x, y + 1, P.luzL); } } }
  // los faroles de las puertas y las farolas, que tiemblan
  for (const [fx, k] of [[64, 0], [96, 1], [128, 2], [160, 3]]) { const f = Math.sin(t * 7 + k * 2.3) > 0.6 ? 1 : 0; for (const dx of [-4, 0, 4]) { const y = dx ? 106 : 102; disco(fx + dx, y, 2, f && dx ? P.luz : P.luzL); pset(fx + dx, y, C.blanco); pset(fx + dx, y - 3, P.luzS); }
    for (let j = -9; j <= 9; j++) for (let i = -11; i <= 11; i++) { const d = Math.hypot(i, j * 1.2), x = fx + i, y = 105 + j; if (d > 3.5 && d < 11 && e_umbral(x, y) < (1 - d / 11) * 0.5) Bf[y * 320 + x] = e_mezcla(Bf[y * 320 + x], P.luz, 0.4); } }
  for (const fx of [246, 270]) { const f = Math.sin(t * 5 + fx) > 0.8; rect(fx - 1, 92, fx + 1, 97, f ? P.luz : P.luzL); for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j), x = fx + i, y = 95 + j; if (d > 2 && d < 8 && x < 320 && e_umbral(x, y) < (1 - d / 8) * 0.5) Bf[y * 320 + x] = e_mezcla(Bf[y * 320 + x], P.luz, 0.4); } }
  // el farol del campanario (o.farol): encendido, con su halo
  { const [fx, fy] = G.farol;
    if (farol > 0) { const late = 0.82 + 0.18 * Math.sin(t * 5), rr = 16 * farol * late; for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i, j), x = fx + i, y = fy + j; if (d < rr && x < 278 && e_umbral(x, y) < (1 - d / rr) * 0.85) Bf[y * 320 + x] = e_mezcla(Bf[y * 320 + x], P.luzL, 0.55); } }
    rect(fx - 2, fy - 3, fx + 2, fy + 3, B.reja); rect(fx - 1, fy - 5, fx + 1, fy - 4, B.reja); pset(fx, fy - 6, B.reja); rect(fx - 1, fy - 2, fx + 1, fy + 2, farol > 0 ? P.luz : B.vidO); if (farol > 0) { rect(fx, fy - 2, fx, fy + 1, C.blanco); pset(fx - 1, fy + 2, P.luzS); pset(fx + 1, fy + 2, P.luzS); if (Math.sin(t * 9) > 0) pset(fx, fy - 2, P.luzL); } }
  // un coche que cruza la calle del fondo, con los faros encendidos (se recorta a la calle)
  { const x = Math.round(340 - ((t * 26 + 30) % 190)); if (x > 232) { const y = 141; for (let i = -9; i <= 9; i++) for (let j = -6; j <= 0; j++) { const xx = x + i; if (xx < 235 || xx > 319) continue; if (j < -3 && (i < -5 || i > 4)) continue; Bf[(y + j) * 320 + xx] = j === 0 ? B.reja : j < -3 ? (i > -4 && i < 3 ? B.vidO : hex('#8a3a44')) : hex('#a84a50'); }
      if (x - 10 > 235) { pset(x - 10, y - 2, P.luzL); pset(x - 11, y - 2, P.luz); pset(x - 12, y - 1, P.luz); pset(x - 13, y - 1, P.luzS); } if (x - 5 > 235 && x + 5 < 320) { disco(x - 5, y, 1, B.reja); disco(x + 5, y, 1, B.reja); } } }
  // gente pequeña: uno lee sentado en la escalinata, una pareja pasea ante la iglesia y un ciclista cruza la plaza al fondo
  { const x = 70, y = 143; rect(x - 1, y - 6, x + 1, y - 2, hex('#3a5a7a')); rect(x - 1, y - 8, x + 1, y - 7, P.piel); rect(x - 1, y - 9, x + 1, y - 9, hex('#4a2a1a')); rect(x + 1, y - 2, x + 4, y - 1, hex('#3a3a4a')); rect(x + 4, y - 1, x + 4, y + 1, hex('#3a3a4a')); rect(x + 2, y - 5, x + 4, y - 4, Math.floor(t * 0.5) % 2 ? C.blanco : hex('#e8e0d0')); }
  { const u = (t * 0.035) % 1, x = Math.round(lerp(318, 238, u)), y = 133, p = Math.floor(t * 4) % 2; for (const [dx, c] of [[0, hex('#3a6a5a')], [5, hex('#8a4a6a')]]) { if (x + dx > 319) continue; rect(x + dx, y - 6, x + dx + 1, y - 3, c); rect(x + dx, y - 8, x + dx + 1, y - 7, P.piel); pset(x + dx, y - 2, hex('#2a2a3a')); pset(x + dx + 1, y - 2 + p, hex('#2a2a3a')); pset(x + dx + (dx ? 1 : 0), y - 1 - p, hex('#2a2a3a')); } }
  // las farolas y el tronco del árbol quedan por delante del coche y de los paseantes
  for (const fx of [246, 270]) { rect(fx, 100, fx, 146, B.reja); rect(fx - 1, 144, fx + 1, 146, B.reja); } rect(291, 124, 293, 150, hex('#3a2430')); rect(293, 124, 293, 150, hex('#6a3a34'));
  for (const [px, py, k] of [[150, 150, 0], [156, 152, 1], [28, 149, 2]]) { const pic = Math.sin(t * 3.4 + k * 2) > 0.6 ? 1 : 0; rect(px, py - 2, px + 3, py, hex('#7a7e8e')); pset(px + 3 + pic, py - 3 + pic, hex('#5a5e6e')); pset(px + 4 + pic, py - 3 + pic, C.naranja); pset(px, py - 1, hex('#9aa0b0')); pset(px + 1, py + 1, B.reja); }
  for (const [px, k] of [[100, 0], [107, 1], [186, 2]]) { const pic = Math.sin(t * 2.6 + k * 2) > 0.7 ? 1 : 0; rect(px, 27, px + 3, 29, hex('#4a4458')); pset(px + 3 + pic, 26 + pic, hex('#3a3448')); pset(px + 4 + pic, 26 + pic, C.naranja); pset(px, 28, hex('#6a6480')); }
  e_hojas(R, t, 0, 320, 96, 176, 6, 7); e_hojas(R, t, 270, 320, 96, 158, 5, 9);
  return { ...G };
}
// lo de delante en la biblioteca: una farola de hierro a la izquierda (encendida, con su halo), los bolardos con su
// cadena al pie del encuadre y unas hojas que pasan por delante
function e_bibliotecaDelante(R, t, o = {}) {
  const { rect, pset, disco } = R, Bf = R.buf, B = e_B, P = e_P;
  rect(6, 92, 8, 179, B.reja); rect(7, 92, 7, 179, hex('#4a4460')); rect(4, 170, 10, 179, B.reja); rect(5, 166, 9, 169, B.reja); rect(3, 90, 11, 91, B.reja); rect(2, 76, 12, 77, B.reja); rect(5, 73, 9, 75, B.reja); pset(7, 72, B.reja); rect(3, 78, 3, 89, B.reja); rect(11, 78, 11, 89, B.reja);
  { const f = Math.sin(t * 6) > 0.7; rect(4, 78, 10, 89, f ? P.luz : P.luzL); rect(6, 81, 8, 86, C.blanco); rect(7, 78, 7, 89, f ? P.luzS : P.luz);
    for (let j = -16; j <= 16; j++) for (let i = -8; i <= 18; i++) { const d = Math.hypot(i, j), x = 7 + i, y = 84 + j; if (x < 0 || x > 319 || y < 16) continue; if ((Math.abs(i) > 4 || Math.abs(j) > 7) && d < 17 && e_umbral(x, y) < (1 - d / 17) * 0.55) Bf[y * 320 + x] = e_mezcla(Bf[y * 320 + x], P.luz, 0.4); } }
  const bol = [36, 104, 172, 240, 308]; bol.forEach((bx, k) => { rect(bx - 2, 168, bx + 2, 179, B.reja); rect(bx - 1, 168, bx - 1, 179, hex('#4a4460')); disco(bx, 167, 2, B.reja); pset(bx - 1, 166, hex('#6a6480'));
    if (k < bol.length - 1) for (let x = bx + 3; x < bol[k + 1] - 2; x++) { const u = (x - bx) / 68, y = Math.round(170 + Math.sin(u * Math.PI) * 6 + Math.sin(t * 1.5 + k) * 0.6 * Math.sin(u * Math.PI)); pset(x, y, x % 3 ? B.reja : hex('#5a5470')); } });
  e_hojas(R, t, 0, 320, 110, 179, 5, 8);
  return {};
}

const e_VENT = [81, 239];   // el centro de cada ventanal de la sala

// ¿cae (x, y) en el vidrio del ventanal de centro cx? (arco de medio punto de 21 px de radio, de y 26 a y 90)
const e_enVidrio = (x, y, cx) => { const dx = x - cx; return y <= 90 && (y >= 47 ? Math.abs(dx) <= 21 : dx * dx + (y - 47) * (y - 47) <= 441); };

// lo fijo de la sala: el techo, la pared empapelada (lisa junto a Atom y bajo el año), el zócalo de paneles, los
// ventanales con sus cortinas, la chimenea con el gran cuadro, el reloj de pie, la puerta, los floreros y el suelo
function e_ceremoniaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, Bf = R.buf, P = e_P;
  // la pared: la escocia del techo, el papel con su dibujo de rombos (apagado), el friso y el zócalo de paneles de madera
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { if (e_enVidrio(x, y, e_VENT[0]) || e_enVidrio(x, y, e_VENT[1])) continue; let c;
    if (y < 7) c = y === 6 ? P.paredR : y === 3 ? P.pared1 : y < 3 ? P.pared2 : P.pared0;
    else if (y < 90) { const liso = (x > 266 && y < 52) || y < 18, mx = ((x + ((y >> 4) & 1) * 8) & 15) - 8, my = (y & 15) - 8;
      c = !liso && Math.abs(mx) + Math.abs(my) < 3 ? P.pared1 : !liso && Math.abs(mx) + Math.abs(my) === 7 && (x & 1) ? P.pared2 : P.pared0;
      if (y < 13 && e_umbral(x, y) < (13 - y) / 9) c = P.pared1; if (y === 18 || y === 19) c = y === 18 ? P.pared2 : P.paredR; }
    else if (y < 93) c = y === 90 ? P.madL : y === 91 ? P.mad2 : P.mad3;
    else if (y >= 123) c = y === 123 ? P.madL : y === 127 ? P.mad3 : P.mad1;
    else { const px = x % 30, py = y - 93, veta = h(x >> 3, y, 500) < 0.12;
      c = px === 0 ? P.mad3 : px === 29 ? P.mad2 : (px === 4 || py === 3) && px >= 4 && px <= 25 && py >= 3 && py <= 26 ? P.mad3 : (px === 25 || py === 26) && px >= 4 && px <= 25 && py >= 3 && py <= 26 ? P.madL : px > 4 && px < 25 && py > 3 && py < 26 ? (veta ? P.mad1 : (px + py) % 11 === 0 ? P.mad2 : P.mad0) : veta ? P.mad3 : P.mad1; }
    Bf[y * 320 + x] = c; }
  // los dos ventanales: el marco blanco, los maineles (el abanico del arco) y la repisa; el vidrio queda vacío (lo de fuera va vivo)
  for (const cx of e_VENT) { for (let y = 22; y <= 92; y++) for (let x = cx - 25; x <= cx + 25; x++) { const dx = x - cx, dy = y - 47, d = dy < 0 ? Math.hypot(dx, dy) : Math.abs(dx); if (d > 24.5 || y > 90) continue;
      if (d > 21) { Bf[y * 320 + x] = d > 23.5 ? P.paredR : d > 22.5 ? P.marco : P.cornisa; continue; }
      const an = Math.atan2(-dy, dx), radial = dy < 0 && d > 7 && Math.abs(((an / (Math.PI / 5)) % 1) - 0.5) > 0.46;
      if (dx === 0 || dx === -1 || Math.abs(dx) === 11 || dy === 0 || dy === 1 || y === 68 || radial || (dy < 0 && Math.abs(d - 7) < 0.7)) Bf[y * 320 + x] = dx === -1 || dy === 1 ? P.cornisa : P.marco; }
    rect(cx - 26, 91, cx + 26, 92, P.marco); rect(cx - 26, 93, cx + 26, 93, P.cornisaS); rect(cx - 24, 94, cx + 24, 94, P.mad3);
    // las cortinas de terciopelo, recogidas con su alzapaños dorado, la galería con flecos y la barra
    for (const s of [-1, 1]) for (let y = 21; y <= 116; y++) { const rec = y < 76 ? 0 : y < 82 ? (y - 76) * 0.8 : 4.8 - (y - 82) * 0.05, xa = cx + s * (27 - 0), xb = cx + s * (13 + rec + (y < 30 ? -3 : 0));
      for (let x = Math.min(xa, xb); x <= Math.max(xa, xb); x++) { const u = Math.abs(x - cx), pl = (u + (y > 80 ? 1 : 0)) % 5; Bf[y * 320 + x] = y === 116 ? P.cort1 : pl === 0 ? P.cort1 : pl === 2 ? P.cort2 : P.cort0; }
      if (y >= 77 && y <= 79) for (let x = Math.min(xa, xb) + (s > 0 ? 3 : 0); x <= Math.max(xa, xb) - (s > 0 ? 0 : 3); x++) Bf[y * 320 + x] = y === 78 ? P.doradoL : P.dorado; }
    for (let x = cx - 29; x <= cx + 29; x++) { const u = (x - cx + 29) / 58, dep = Math.round(7 + 5 * Math.abs(Math.sin(u * Math.PI * 3))); for (let y = 20; y <= 20 + dep; y++) Bf[y * 320 + x] = y === 20 + dep ? P.dorado : y === 20 + dep - 1 ? P.cort1 : (x + y) % 6 === 0 ? P.cort2 : (x - y) % 7 === 0 ? P.cort1 : P.cort0; if (x % 2) Bf[(21 + dep) * 320 + x] = P.doradoS; }
    rect(cx - 31, 19, cx + 31, 19, P.dorado); rect(cx - 31, 20, cx + 31, 20, P.doradoS); disco(cx - 32, 19, 1, P.doradoL); disco(cx + 32, 19, 1, P.doradoL); }
  // bajo el ventanal izquierdo, un radiador de hierro; bajo el derecho, un banco con cojines
  { const x0 = 64, y0 = 99; for (let x = x0; x < x0 + 34; x += 3) { rect(x, y0, x + 1, 124, P.marmolS); rect(x, y0, x, 124, P.marmol); pset(x, y0 - 1, P.marmolS); pset(x + 1, y0 - 1, P.marmolS); } rect(x0, y0 + 2, x0 + 33, y0 + 2, P.marmolV); rect(x0, 121, x0 + 33, 121, P.marmolV); rect(x0 + 1, 125, x0 + 2, 127, P.hierro); rect(x0 + 31, 125, x0 + 32, 127, P.hierro); rect(x0 + 34, y0 + 6, x0 + 36, y0 + 7, P.dorado); }
  { const x0 = 220, y = 127; rect(x0, y - 12, x0 + 38, y - 9, P.mad2); rect(x0, y - 9, x0 + 38, y - 8, P.mad3); rect(x0 + 2, y - 8, x0 + 3, y, P.mad1); rect(x0 + 35, y - 8, x0 + 36, y, P.mad1); rect(x0 + 2, y - 16, x0 + 18, y - 13, P.alf3); rect(x0 + 2, y - 16, x0 + 18, y - 16, hex('#4a6a8a')); rect(x0 + 20, y - 16, x0 + 36, y - 13, P.alf0); rect(x0 + 20, y - 16, x0 + 36, y - 16, P.cort2); for (let x = x0 + 4; x < x0 + 36; x += 4) pset(x, y - 14, P.alf2); }
  // la chimenea de mármol: la repisa, las jambas acanaladas, el dintel con su roseta y el hogar de ladrillo con los morillos
  { rect(128, 93, 192, 127, P.marmol); for (let k = 0; k < 40; k++) { let x = 128 + h(k, 1, 502) * 64, y = 93 + h(k, 2, 502) * 34; for (let i = 0; i < 7; i++) { x += h(k, i, 503) < 0.5 ? 1 : 0; y += h(k, i, 504) < 0.6 ? 1 : 0; if (x < 192 && y < 127) pset(Math.round(x), Math.round(y), k % 3 ? P.marmolS : P.marmolV); } }
    rect(128, 93, 128, 127, P.marmolS); rect(192, 93, 192, 127, P.marmolV); for (const jx of [131, 134, 186, 189]) rect(jx, 100, jx, 124, P.marmolS); rect(138, 93, 138, 127, P.marmolS); rect(182, 93, 182, 127, P.marmolS);
    rect(139, 99, 181, 99, P.marmolS); disco(160, 95, 2, P.marmolS); pset(160, 95, P.marmol); rect(146, 95, 154, 95, P.marmolS); rect(166, 95, 174, 95, P.marmolS);
    e_ladrillos(R, 140, 100, 180, 127, [hex('#4a2a26'), hex('#3a201e'), hex('#5c3630'), hex('#2a1614')], 505); rect(140, 100, 180, 101, hex('#1e1010')); rect(140, 100, 141, 127, hex('#1e1010')); rect(179, 100, 180, 127, hex('#1e1010'));
    rect(124, 87, 196, 88, P.marmol); rect(124, 89, 196, 90, P.marmolS); rect(126, 91, 194, 92, P.marmolV); rect(124, 87, 196, 87, C.blanco);
    for (const ax of [146, 174]) { rect(ax, 116, ax, 126, P.dorado); disco(ax, 115, 1, P.doradoL); rect(ax - 1, 126, ax + 1, 127, P.doradoS); } rect(149, 123, 171, 125, hex('#4a2e1e')); rect(151, 121, 169, 122, hex('#5e3a24')); pset(152, 121, hex('#8a5a3a')); rect(124, 126, 196, 127, P.marmolV); }
  // sobre la repisa: un reloj de mesa, dos candelabros y dos retratos pequeños en su marco (siluetas ovaladas)
  { rect(155, 78, 165, 86, P.mad1); rect(156, 77, 164, 77, P.mad2); rect(157, 76, 163, 76, P.mad1); disco(160, 82, 3, P.marco); rect(154, 86, 166, 86, P.dorado); pset(160, 82, C.k); pset(160, 81, C.k); pset(161, 82, C.k);
    for (const kx of [134, 186]) { rect(kx, 80, kx, 86, P.dorado); rect(kx - 2, 86, kx + 2, 86, P.doradoS); rect(kx - 3, 80, kx + 3, 80, P.dorado); for (const dx of [-3, 0, 3]) { rect(kx + dx, 76, kx + dx, 79, P.marco); } }
    for (const fx of [144, 174]) { rect(fx, 79, fx + 6, 86, P.dorado); rect(fx + 1, 80, fx + 5, 85, hex('#6a7a6a')); rect(fx + 2, 82, fx + 4, 85, hex('#3a4a5a')); pset(fx + 3, 81, hex('#c8a888')); } }
  // el gran cuadro de encima: una marina antigua (un velero de tres palos, nubes y una costa lejana) en su marco dorado, con su luz
  { const x0 = 122, y0 = 25, x1 = 198, y1 = 73; rect(x0, y0, x1, y1, P.doradoS); rect(x0, y0, x1, y0 + 1, P.doradoL); rect(x0, y0, x0 + 1, y1, P.doradoL); rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, P.dorado); rect(x0 + 4, y0 + 4, x1 - 4, y1 - 4, P.doradoS); for (let x = x0 + 3; x < x1 - 2; x += 4) { pset(x, y0 + 3, P.doradoL); pset(x, y1 - 3, P.doradoL); } for (let y = y0 + 3; y < y1 - 2; y += 4) { pset(x0 + 3, y, P.doradoL); pset(x1 - 3, y, P.doradoL); }
    for (let y = y0 + 5; y <= y1 - 5; y++) for (let x = x0 + 5; x <= x1 - 5; x++) { const v = (y - y0 - 5) / (y1 - y0 - 10), q = h(x >> 1, y >> 1, 506); let c;
      if (v < 0.62) { c = v < 0.2 ? hex('#6a7a8a') : v < 0.42 ? (e_umbral(x, y) < (v - 0.2) * 4.5 ? hex('#c8b890') : hex('#8a9a9c')) : hex('#d8c498'); let nb = 0; for (const [nx, ny, nr] of [[140, 10, 5], [147, 8, 6], [154, 11, 5], [178, 14, 5], [185, 12, 6], [191, 15, 4], [166, 7, 4]]) { const dd = Math.hypot((x - nx) * 0.7, y - y0 - ny); if (dd < nr) nb = Math.max(nb, y - y0 - ny < -1 ? 2 : 1); } if (nb) c = nb === 2 ? hex('#ece0c4') : hex('#b4a890'); }
      else c = (y + Math.round(Math.sin(x * 0.4 + y) * 1.2)) % 3 === 0 ? hex('#4a6a70') : q < 0.2 ? hex('#22404a') : hex('#2e525a');
      Bf[y * 320 + x] = c; }
    for (let x = x0 + 5; x < x0 + 26; x++) { const yy = y0 + 31 - Math.round(Math.sin((x - x0) * 0.2) * 1.5 + 1.5); rect(x, yy, x, y0 + 29, hex('#5a6a5a')); }
    { const sx = 164, sy = y0 + 34; rect(sx - 11, sy - 3, sx + 11, sy, hex('#3a2418')); rect(sx - 9, sy + 1, sx + 9, sy + 1, hex('#2a1810')); rect(sx - 11, sy - 3, sx + 11, sy - 3, hex('#8a6a3a')); linea(sx + 11, sy - 3, sx + 16, sy - 6, hex('#3a2418'));
      for (const [mx, mh] of [[-7, 15], [0, 18], [7, 14]]) { rect(sx + mx, sy - 3 - mh, sx + mx, sy - 3, hex('#3a2418')); for (let j = 0; j < 3; j++) { const w = 4 - j, yy = sy - 5 - j * 4 - (mh > 17 ? 2 : 0); rect(sx + mx - w, yy - 2, sx + mx + w, yy, hex('#e8dcc0')); rect(sx + mx - w, yy, sx + mx + w, yy, hex('#b8a888')); rect(sx + mx + w - 1, yy - 2, sx + mx + w, yy, hex('#cfc0a0')); } }
      pset(sx + 1, sy - 21, C.rojo); pset(sx + 2, sy - 21, C.rojo); for (let i = 0; i < 9; i++) pset(sx - 14 - i * 2, sy + 1 + (i % 2), hex('#9ab8b8')); }
    rect(148, 21, 172, 22, P.dorado); rect(148, 23, 172, 23, P.doradoS); rect(159, 24, 161, 24, P.doradoS); }
  // los apliques de latón (sus velas, vivas, van encima) y un paisaje ovalado
  for (const ax of [112, 208]) { rect(ax, 52, ax, 60, P.dorado); disco(ax, 61, 2, P.dorado); pset(ax, 61, P.doradoL); rect(ax - 5, 54, ax + 5, 54, P.dorado); rect(ax - 5, 51, ax - 5, 54, P.dorado); rect(ax + 5, 51, ax + 5, 54, P.dorado); rect(ax - 5, 47, ax - 5, 50, P.marco); rect(ax + 5, 47, ax + 5, 50, P.marco); }
  { const x = 36, y = 52; for (let j = -10; j <= 10; j++) for (let i = -8; i <= 8; i++) { const e = (i / 8.5) ** 2 + (j / 10.5) ** 2; if (e < 1) pset(x + i, y + j, e > 0.72 ? (i + j < 0 ? P.doradoL : P.dorado) : e > 0.6 ? P.doradoS : j > 3 ? (h(i >> 1, j, 507) < 0.4 ? hex('#5a7a3a') : hex('#6e8a44')) : j > 0 && Math.abs(i + 2) < 4 - j ? hex('#4a5a3a') : hex('#a8c0c8')); } pset(x, y - 12, P.doradoS); }
  // el reloj de pie, a la izquierda: la caja de nogal, la esfera y la puerta de vidrio (el péndulo va vivo)
  { const x0 = 10, x1 = 26, mx = 18; rect(x0, 56, x1, 127, P.mad1); rect(x0, 56, x0 + 1, 127, P.mad2); rect(x1 - 1, 56, x1, 127, P.mad3); rect(x0 - 1, 54, x1 + 1, 55, P.mad2); poligono([[x0 - 1, 54], [mx, 47], [x1 + 1, 54]], P.mad1); linea(x0 - 1, 54, mx, 47, P.madL); disco(mx, 49, 1, P.dorado); rect(x0 - 1, 72, x1 + 1, 73, P.mad2); rect(x0 - 1, 108, x1 + 1, 109, P.mad2); rect(x0 - 1, 124, x1 + 1, 127, P.mad3);
    disco(mx, 64, 6, P.dorado); disco(mx, 64, 5, P.marco); for (let k = 0; k < 12; k++) pset(Math.round(mx + Math.cos(k * 0.5236) * 4), Math.round(64 + Math.sin(k * 0.5236) * 4), P.hierro); rect(x0 + 3, 76, x1 - 3, 105, hex('#2a1c14')); rect(x0 + 3, 76, x0 + 3, 105, P.mad3); rect(x0 + 4, 112, x1 - 4, 121, P.mad0); rect(x0 + 4, 112, x1 - 4, 112, P.mad3); }
  // la puerta de la derecha, de dos hojas con cuarterones, con su frontón
  { const x0 = 284, x1 = 312, y0 = 58; rect(x0 - 3, y0 - 3, x1 + 3, 127, P.mad2); rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, P.madL); rect(x0 - 5, y0 - 6, x1 + 5, y0 - 4, P.mad1); rect(x0 - 5, y0 - 6, x1 + 5, y0 - 6, P.madL); rect(x0, y0, x1, 127, P.mad0); rect((x0 + x1) >> 1, y0, (x0 + x1) >> 1, 127, P.mad3);
    for (const hx of [x0 + 2, ((x0 + x1) >> 1) + 2]) for (const [ya, yb] of [[y0 + 3, y0 + 26], [y0 + 30, y0 + 48], [y0 + 52, 124]]) { rect(hx, ya, hx + 10, yb, P.mad1); rect(hx, ya, hx + 10, ya, P.mad3); rect(hx, ya, hx, yb, P.mad3); rect(hx + 10, ya, hx + 10, yb, P.madL); rect(hx, yb, hx + 10, yb, P.madL); for (let y = ya + 2; y < yb - 1; y += 3) if (h(hx, y, 508) < 0.5) rect(hx + 3, y, hx + 7, y, P.mad0); }
    disco(((x0 + x1) >> 1) - 2, 96, 1, P.doradoL); disco(((x0 + x1) >> 1) + 3, 96, 1, P.doradoL); }
  // el parqué en espiga, con el reflejo de los ventanales, y la gran alfombra con su cenefa, sus rombos y el medallón
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const d = y - 128, banda = d >> 3, s = (banda & 1) ? x + d : x - d, m = ((s % 8) + 8) % 8, tab = Math.floor(s / 8), q = h(tab, banda, 510);
    let c = d === 0 ? P.mad3 : m === 0 || d % 8 === 0 ? P.parq1 : q < 0.3 ? P.parq2 : q > 0.8 ? P.parq1 : P.parq0; if (h(x, y, 511) < 0.02) c = P.parq1;
    const xa = 70 - (y - 138) * 0.7, xb = 250 + (y - 138) * 0.7;
    if (y >= 138 && y <= 175 && x >= xa && x <= xb) { const bo = Math.min(x - xa, xb - x, (y - 138) * 1.6, (175 - y) * 1.6), u = (x - 160) / ((xb - xa) / 2), v = (y - 156.5) / 18.5, e = (u / 0.42) ** 2 + (v / 0.62) ** 2;
      if (bo < 1.5) c = P.alf4; else if (bo < 3.5) c = P.alf3; else if (bo < 5) c = P.alf2; else if (bo < 8.5) c = ((x + (y & 2 ? 2 : 0)) & 3) < 2 ? P.alf3 : P.alf4; else if (bo < 10) c = P.alf2;
      else if (e < 1) c = e > 0.82 ? P.alf2 : e > 0.6 ? P.alf3 : e < 0.12 ? P.alf2 : (Math.round(u * 40) + Math.round(v * 14)) % 3 === 0 ? P.alf4 : P.alf3;
      else { const rx = Math.round(u * 56 + 200), ry = y - 138, rm = Math.abs(((rx + ry * 2) % 16) - 8) + Math.abs(((rx - ry * 2 + 400) % 16) - 8); c = rm < 3 ? P.alf2 : rm > 12 ? P.alf1 : (rx + ry) % 9 === 0 ? P.alf4 : P.alf0; }
      if (x - xa < 0.9 || xb - x < 0.9) c = y % 2 ? P.alf4 : P.parq1; }
    for (const cx of e_VENT) { const lx = x - (cx + (y - 128) * 0.9 * (cx < 160 ? 1 : -1)); if (Math.abs(lx) < 20 && y < 172 && Math.abs(Math.round(lx)) % 11 > 0 && d % 14 > 1 && e_umbral(x, y) < 0.55 - d * 0.006) c = e_mezcla(c, P.luzL, 0.38); }
    Bf[y * 320 + x] = c; }
  // dos floreros en sus pedestales de mármol, a los lados de la chimenea, con crisantemos y hojas de otoño
  for (const fx of [116, 204]) { rect(fx - 4, 110, fx + 4, 128, P.marmol); rect(fx + 2, 110, fx + 4, 128, P.marmolS); rect(fx - 5, 108, fx + 5, 109, P.marmol); rect(fx - 5, 127, fx + 5, 128, P.marmolV); rect(fx - 5, 110, fx + 5, 110, P.marmolS);
    rect(fx - 2, 100, fx + 2, 107, hex('#3a5a8a')); rect(fx - 3, 102, fx + 3, 105, hex('#3a5a8a')); rect(fx + 2, 101, fx + 3, 106, hex('#2a4268')); pset(fx - 2, 102, hex('#8ab0d8')); rect(fx - 1, 103, fx + 1, 103, P.marco); rect(fx - 2, 99, fx + 2, 99, P.dorado);
    for (let k = 0; k < 26; k++) { const a = Math.PI * (1 + h(k, fx, 512)), r = 3 + h(k, fx, 513) * 9, x = Math.round(fx + Math.cos(a) * r * 1.1), y = Math.round(99 + Math.sin(a) * r); pset(x, y, hex('#3e6a34')); pset(x, y + 1, hex('#2e5228')); }
    for (let k = 0; k < 11; k++) { const a = Math.PI * (1.08 + 0.84 * h(k, fx, 514)), r = 5 + h(k, fx, 515) * 8, x = Math.round(fx + Math.cos(a) * r * 1.1), y = Math.round(99 + Math.sin(a) * r), c = [P.hoja0, P.hoja2, C.blanco, P.hoja1, hex('#e8a0b0')][k % 5]; disco(x, y, 1, c); pset(x, y, k % 2 ? P.luzL : P.hoja3); } }
}

// lo que se ve por un ventanal (vivo; la pared fija lo recorta al pegarse encima): el cielo de la tarde con nubes, las
// casas de piedra parda de enfrente con sus cornisas y ventanas, un árbol de otoño y un pájaro
function e_vistaCalle(R, t, cx, k) {
  const { rect, pset, disco } = R, Bf = R.buf, x0 = cx - 22, x1 = cx + 22;
  for (let y = 24; y <= 91; y++) for (let x = x0; x <= x1; x++) Bf[y * 320 + x] = y < 38 ? hex('#6aaee4') : y < 52 ? (e_umbral(x, y) < (y - 38) / 14 ? hex('#a4d2f0') : hex('#84c0ec')) : hex('#c4e2f0');
  for (let n = 0; n < 2; n++) { const x = x0 - 20 + ((t * (1.6 + n * 1.3) + n * 37 + k * 23) % 86); e_nube(R, Math.round(x), 40 + n * 12, 16 + n * 6, n + k * 2, e_NUBES.otono); }
  const casas = [[x0, 15, 60, '#8a5a4a', '#6e4438'], [x0 + 15, 16, 66, '#9a6a50', '#7c5240'], [x0 + 31, 15, 58, '#7a5046', '#603c36']];
  for (const [hx, w, top, c, cS] of casas) { rect(hx, top, hx + w - 1, 91, hex(c)); rect(hx + w - 2, top, hx + w - 1, 91, hex(cS)); rect(hx, top - 2, hx + w - 1, top - 1, hex('#d8c8b0')); rect(hx, top, hx + w - 1, top, hex(cS));
    for (let wy = top + 4; wy < 90; wy += 10) for (let wx = hx + 2; wx < hx + w - 4; wx += 6) { rect(wx, wy, wx + 2, wy + 5, h(wx, wy, 520) < 0.25 ? hex('#f0d080') : hex('#3a4660')); rect(wx - 1, wy - 1, wx + 3, wy - 1, hex('#d8c8b0')); } }
  { const ax = cx + (k ? -13 : 12), m = Math.round(Math.sin(t * 1.2 + k)); rect(ax, 74, ax + 1, 91, e_P.troncoS); for (const [dx, dy, r, c] of [[0, 0, 7, '#b83a2a'], [-5, 3, 5, '#d8702a'], [5, 2, 5, '#de6238'], [-2, -4, 4, '#f0a03c'], [3, -3, 3, '#f09a48']]) disco(ax + dx + m, 70 + dy, r, hex(c)); for (let i = 0; i < 9; i++) pset(ax - 6 + Math.round(h(i, k, 521) * 13) + m, 64 + Math.round(h(i, k, 522) * 10), hex('#f8d060')); }
  for (let i = 0; i < 3; i++) { const u = ((t * 9 + i * 31 + k * 17) % 34), x = Math.round(cx - 12 + h(i, k, 523) * 26 + Math.sin(t * 2 + i) * 3), y = Math.round(58 + u); pset(x, y, i % 2 ? e_P.hoja0 : e_P.hoja2); }
  { const u = ((t * 0.16 + k * 0.45) % 1), bx = Math.round(x0 - 6 + u * 60), by = Math.round(34 + Math.sin(u * 9) * 4), b = Math.sin(t * 12) > 0 ? 1 : 0; pset(bx, by, hex('#2a2436')); pset(bx - 1, by - b, hex('#2a2436')); pset(bx + 1, by - b, hex('#2a2436')); pset(bx - 2, by - 2 * b + 1, hex('#2a2436')); pset(bx + 2, by - 2 * b + 1, hex('#2a2436')); }
}

function e_ceremonia(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, Bf = R.buf, P = e_P, G = e_GEO.ceremonia;
  e_VENT.forEach((cx, k) => e_vistaCalle(R, t, cx, k));
  const capa = e_capa(R, 'ceremonia', () => e_ceremoniaFijo(R));
  e_pega(R, capa);
  // el reflejo que cruza los vidrios de vez en cuando
  for (const cx of e_VENT) { const u = ((t * 0.22 + cx * 0.01) % 1) * 90 - 20; for (let y = 28; y <= 90; y++) for (let d = 0; d < 4; d++) { const x = Math.round(cx - 22 + u + (90 - y) * 0.35) + d * (d > 1 ? 3 : 1); if (x >= 0 && x < 320 && capa[y * 320 + x] === e_VACIO && e_umbral(x, y) < 0.5) Bf[y * 320 + x] = e_mezcla(Bf[y * 320 + x], C.blanco, 0.4); } }
  // el fuego de la chimenea, con su resplandor en el hogar
  for (let x = 150; x <= 170; x++) { const a = 5 + Math.sin(x * 1.3 + t * 9) * 2.5 + Math.sin(x * 0.6 - t * 6) * 2.5 + (1 - Math.abs(x - 160) / 10) * 6, top = Math.round(121 - Math.max(0, a)); for (let y = top; y <= 121; y++) { const v = (121 - y) / Math.max(1, a); pset(x, y, v > 0.75 ? hex('#e8602a') : v > 0.4 ? hex('#f8a030') : hex('#fff0a0')); } }
  for (let k = 0; k < 5; k++) { const u = (t * 0.8 + k * 0.23) % 1, x = Math.round(154 + h(k, Math.floor(t * 0.8 + k * 0.23), 530) * 12 + Math.sin(t * 3 + k) * 2), y = Math.round(116 - u * 13); if (u < 0.9) pset(x, y, u < 0.5 ? hex('#fff0a0') : hex('#f8a030')); }
  for (let y = 102; y < 127; y++) for (const x of [142, 143, 177, 178]) if (e_umbral(x, y + Math.floor(t * 6)) < 0.4) pset(x, y, hex('#8a4a2e'));
  // las velas de los apliques y de los candelabros, con su halo; los péndulos y las agujas de los dos relojes
  for (const [vx, vy, hl] of [[107, 46, 1], [117, 46, 1], [203, 46, 1], [213, 46, 1], [131, 75, 0], [134, 75, 0], [137, 75, 0], [183, 75, 0], [186, 75, 0], [189, 75, 0]]) { const f = Math.sin(t * 9 + vx * 1.7) > 0.3 ? 1 : 0; pset(vx, vy, P.luz); pset(vx, vy - 1, f ? P.luzL : P.luz); if (f) pset(vx, vy - 2, hex('#f8a030'));
    if (hl) for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j), x = vx + i, y = vy + j; if (d > 1.5 && d < 7.5 && y > 19 && e_umbral(x, y) < (1 - d / 7.5) * 0.55 && capa[y * 320 + x] !== e_VACIO) Bf[y * 320 + x] = e_mezcla(Bf[y * 320 + x], P.luzL, 0.4); } }
  { const a = Math.sin(t * 3.1) * 0.5, px = Math.round(18 + Math.sin(a) * 11), py = Math.round(80 + Math.cos(a) * 20); linea(18, 78, px, py, P.dorado); disco(px, py, 2, P.dorado); pset(px - 1, py - 1, P.doradoL);
    const m = t * 0.1, s = t * 6.283 / 6; linea(18, 64, Math.round(18 + Math.sin(m) * 3), Math.round(64 - Math.cos(m) * 3), C.k); linea(18, 64, Math.round(18 + Math.sin(s) * 4), Math.round(64 - Math.cos(s) * 4), C.rojoS); pset(18, 64, C.k);
    const p2 = Math.round(Math.sin(t * 6) * 1.4); pset(160 + p2, 85, P.doradoL); pset(160, 84, P.dorado); }
  // motas de polvo en la luz de los ventanales
  motas(R, t, 60, 130, 96, 170, 9, P.luzL); motas(R, t, 190, 262, 96, 170, 9, P.luzL);
  return { ...G };
}

// lo de delante en la ceremonia: la mesa con su paño (a la altura de la cintura: quien pase por detrás asoma cabeza y
// hombros) y el cojín de terciopelo donde se posa la piedra; abajo, dos bloques de sillas doradas con el público de
// espaldas (cabezas que se mueven, alguno levanta el móvil para la foto) y el pasillo en medio. Devuelve { cojin: [x, y] }
function e_ceremoniaDelante(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, P = e_P, G = e_GEO.ceremonia, [x0, y0, x1, y1] = G.mesa;
  // la mesa: la sombra, el paño que cae con sus pliegues y su cenefa dorada, y el tablero
  for (let x = x0 - 2; x <= x1 + 6; x++) for (let y = y1 - 1; y <= y1 + 1; y++) if (e_umbral(x, y) < 0.5) pset(x, y, hex('#4a2a2a'));
  for (let x = x0; x <= x1; x++) { const pl = (x - x0) % 7, c = pl === 0 ? P.marmolS : pl === 3 ? C.blanco : P.marmol; rect(x, y0 + 2, x, y1 - 1 - (pl === 3 ? 0 : pl % 2), c); pset(x, y1 - 3 - (pl % 2), P.dorado); if (pl === 3) pset(x, y1 - 4, P.dorado); }
  rect(x0 - 1, y0, x1 + 1, y0 + 1, C.blanco); rect(x0 - 1, y0 + 2, x1 + 1, y0 + 2, P.marmolS); rect(x1, y0 + 3, x1, y1 - 2, P.marmolV);
  for (let x = x0 + 4; x < x1 - 2; x += 8) { pset(x, y0 + 6, P.marmolS); pset(x + 1, y0 + 7, P.marmolS); pset(x - 1, y0 + 7, P.marmolS); pset(x, y0 + 8, P.marmolS); }
  // el cojín, con sus borlas
  { const [cx, cy] = G.cojin; rect(cx - 8, cy + 1, cx + 8, cy + 3, P.cort0); rect(cx - 7, cy, cx + 7, cy, P.cort2); rect(cx - 8, cy + 3, cx + 8, cy + 3, P.cort1); rect(cx - 3, cy, cx + 3, cy, P.cort0); pset(cx - 9, cy + 2, P.dorado); pset(cx + 9, cy + 2, P.dorado); pset(cx - 10, cy + 3, P.doradoL); pset(cx + 10, cy + 3, P.doradoL); rect(cx - 8, cy + 1, cx + 8, cy + 1, P.cort2); rect(cx - 2, cy + 1, cx + 2, cy + 1, P.cort0); }
  // un ramo pequeño y dos copas en la mesa
  { const fx = x0 + 6; rect(fx - 1, y0 - 4, fx + 1, y0 - 1, hex('#8ab0d8')); pset(fx - 1, y0 - 4, C.blanco); for (const [dx, dy, c] of [[-2, -6, P.hoja0], [0, -8, C.blanco], [2, -6, P.hoja2], [-1, -7, hex('#3e6a34')], [1, -5, hex('#3e6a34')], [3, -8, P.hoja1]]) pset(fx + dx, y0 + dy, c); }
  // las sillas doradas y el público de espaldas, en dos bloques con el pasillo en medio
  const pelos = ['#3a2418', '#6a4a2a', '#c8a050', '#2a2a36', '#8a8a96', '#a8502a', '#e4d8c0', '#4a3020'].map(hex), ropa = ['#3a4a7a', '#7a3a4a', '#4a6a5a', '#5a5a6a', '#8a6a3a', '#3a3a4a'].map(hex);
  for (let fila = 0; fila < 2; fila++) for (let k = 0; k < 14; k++) { const x = 14 + k * 22 + fila * 9 + (k > 6 ? 6 : 0), yb = 171 + fila * 7; if (Math.abs(x - 163) < 15) continue;
    rect(x - 6, yb, x + 6, 179, P.dorado); rect(x - 6, yb, x + 6, yb, P.doradoL); rect(x - 6, yb, x - 6, 179, P.doradoL); rect(x + 6, yb, x + 6, 179, P.doradoS); for (let i = -4; i <= 4; i += 2) rect(x + i, yb + 2, x + i, 179, P.doradoS); disco(x - 6, yb - 1, 1, P.doradoL); disco(x + 6, yb - 1, 1, P.doradoL);
    const q = h(k, fila, 540); if (q < 0.22) continue;
    const mv = Math.round(Math.sin(t * (0.8 + q) + k * 2.1 + fila) * 0.8), hx = x + mv, hy = yb - 4, pc = pelos[(k * 3 + fila * 5) % 8], rc = ropa[(k + fila * 2) % 6];
    rect(hx - 6, hy + 5, hx + 6, 179, rc); rect(hx - 5, hy + 4, hx + 5, hy + 4, rc); rect(hx + 4, hy + 5, hx + 6, 179, e_mezcla(rc, C.k, 0.3)); rect(x - 6, yb + 4, x + 6, yb + 4, P.dorado);
    disco(hx, hy, 4, pc); rect(hx - 4, hy, hx + 4, hy + 2, pc); rect(hx - 2, hy + 3, hx + 2, hy + 4, P.piel); pset(hx - 2, hy - 3, e_mezcla(pc, C.blanco, 0.35)); pset(hx - 1, hy - 3, e_mezcla(pc, C.blanco, 0.35)); if (q > 0.8) rect(hx - 4, hy + 1, hx + 4, hy + 4, pc);
    if (k === 3 && fila === 0 || k === 10 && fila === 0) { const fl = (t + k) % 3.2 < 0.12; rect(hx + 7, hy - 3, hx + 9, hy + 1, P.piel); rect(hx + 6, hy - 9, hx + 10, hy - 3, C.k); rect(hx + 7, hy - 8, hx + 9, hy - 4, fl ? C.blanco : hex('#8ab0d8')); if (fl) { pset(hx + 8, hy - 11, C.blanco); pset(hx + 5, hy - 7, C.blanco); pset(hx + 11, hy - 7, C.blanco); } } }
  return { cojin: [G.cojin[0], G.cojin[1]] };
}

// la paleta propia de hoy: el papel pintado y la madera del estudio, el barro y la tierra de la maceta, el cielo de día
// y sus nubes de tres tonos, el césped, el ladrillo del fuerte, el gris del barco museo, la marisma y el salón de 2018
const F = pal({
  k: '#17151d', blanco: '#f6f4ec',
  pared: '#b9c9b4', paredL: '#c9d6c2', paredS: '#a3b5a0', paredD: '#8ea28e', moldura: '#e9e3d0', molduraS: '#c4bca4',
  roble: '#8a5c34', robleL: '#a97644', robleS: '#6a4424', robleD: '#4a2e18', robleC: '#c08e58',
  tarima: '#b98a56', tarimaL: '#cfa16a', tarimaS: '#9a6f42', tarimaD: '#7a5430',
  barro: '#c8643a', barroL: '#e28a58', barroS: '#96442a', barroD: '#6e2e1c', barroC: '#f0a878',
  tierra0: '#5a3c26', tierra1: '#4a2f1c', tierra2: '#3a2416', tierra3: '#2c1a10', tierraL: '#7a5434', grava: '#9a9488', gravaS: '#6e685e',
  cielo0: '#3f8fe0', cielo1: '#5aa4ea', cielo2: '#7cbaf0', cielo3: '#a2d0f4', cielo4: '#c6e2f6', cielo5: '#e2f0f6',
  nubeL: '#ffffff', nubeM: '#e6eef8', nubeS: '#c2d2ea', nubeD: '#9cb2d6',
  hoja: '#4c9a40', hojaL: '#78c452', hojaS: '#2f6e30', hojaD: '#1f4c26', hojaC: '#a6dc6a',
  cesped: '#62a848', cespedL: '#84c45a', cespedS: '#468a3a', cespedD: '#2f6a30',
  ladrillo: '#a8523c', ladrilloL: '#c66e50', ladrilloS: '#7e3828', ladrilloD: '#5a261c', junta: '#d0a888',
  senda: '#d9c39a', sendaL: '#eadab4', sendaS: '#b89e76',
  casco: '#8a93a2', cascoL: '#aab3c0', cascoS: '#667080', cascoD: '#474f5e',
  agua0: '#2f6fa6', agua1: '#3f84b8', agua2: '#5a9cc8', agua3: '#86bbd8', aguaL: '#d2ecf6',
  marisma: '#8a9a4a', marismaL: '#b4bc62', marismaS: '#5e7038', marismaD: '#42522c', fango: '#6a5a44',
  tabla: '#a88a66', tablaL: '#c4a680', tablaS: '#82684a', tablaD: '#5c4832',
  salon: '#3a3f5c', salonL: '#4a5070', salonS: '#2c3048', salonD: '#20233a',
  sofa: '#7a4a5e', sofaL: '#9a6076', sofaS: '#5a3446', sofaD: '#3e2232',
  oro: '#e8c040', oroL: '#f8e080', verde: '#3ab85a', verdeL: '#7ee08a', verdeS: '#1e7a3a', rojo: '#d8423a', rojoL: '#f07868', rojoS: '#96241e',
  papel: '#efe6d0', papelS: '#cfc4a8', hilo: '#c8342e', hiloS: '#7e1c1a',
});

// las capas fijas: lo que no se mueve se pinta una sola vez en un búfer de R.nuevo() que empieza «vacío» (F_VACIO) y en
// cada fotograma se pega encima de lo que se mueve por detrás (el cielo, lo que se ve por la ventana); clave por variante
const F_VACIO = 0x01020304, f_capas = new Map();

function f_capa(R, clave, dibuja) {
  let b = f_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(F_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); f_capas.set(clave, b); }
  return b;
}

// pega una capa fija sobre el búfer en uso, dejando ver lo de detrás por sus huecos
function f_pegar(R, b) { const d = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c !== F_VACIO) d[i] = c; } }

// el umbral de la trama ordenada 4 × 4 (0–1), para degradados y brumas tramados
const F_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const f_b4 = (x, y) => (F_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const f_cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const f_mez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo; luz(x, y) suma pasos de la rampa
function f_degradado(R, x0, y0, x1, y1, cols, luz = null, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = ((y - y0) / alto) ** curva * n;
    for (let x = x0; x <= x1; x++) { let v = luz ? base + luz(x, y) : base; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > f_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}

// una nube de bolas que se solapan, con la base plana: c = [arriba (luz), cuerpo, panza, filo de abajo]; (cx, cy) el
// centro de su base, w el ancho, k la semilla; [rx0, rx1] recorta en horizontal (para las ventanas)
function f_nube(R, cx, cy, w, k, c, rx0 = 0, rx1 = 319, ry0 = 0) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3.4 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.max(rx0, Math.floor(cx - w * 0.62)), x1 = Math.min(rx1, Math.ceil(cx + w * 0.62));
  for (let y = Math.max(ry0, Math.floor(cy - 13)); y <= cy + 1; y++) for (let x = x0; x <= x1; x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 2) ? c[0] : c[1]);
}

// el cielo de día de hoy en [x0, x1] × [y0, hor]: degradado tramado, nubes de tres tonos a tres velocidades (lejanas
// pequeñas y lentas, medias, cercanas grandes y rápidas) y pájaros; o.tormenta 0–1 lo oscurece; o.calma: sin nubes
// grandes en la zona de Atom ni sobre la barra del año
const F_CIELO = ['cielo0', 'cielo1', 'cielo2', 'cielo3', 'cielo4', 'cielo5'];

function f_cielo(R, t, x0, y0, x1, hor, o = {}) {
  const tor = o.tormenta ?? 0, gris = hex('#5a6478'), cols = F_CIELO.map((k, i) => (tor > 0 ? f_mez(F[k], f_mez(gris, hex('#8a94a4'), i / 5), tor * 0.85) : F[k]));
  f_degradado(R, x0, y0, x1, hor, cols, null, o.curva ?? 0.9);
  const N = [F.nubeL, F.nubeM, F.nubeS, F.nubeD].map((c) => (tor > 0 ? f_mez(c, hex('#4a5266'), tor * 0.6) : c)), w = x1 - x0 + 90, esc = o.esc ?? 1;
  // tres capas: lejos (pequeñas, lentas, casi en el horizonte), en medio y cerca (grandes, rápidas, arriba)
  const capas = o.capas ?? [[0.82, 0.45, 2.2, 5, 0], [0.58, 0.7, 4.5, 4, 1], [0.3, 1, 8, 3, 2]];
  for (const [fy, s, v, n, kk] of capas) for (let i = 0; i < n; i++) {
    const cx = x0 - 45 + (((h(i, kk, 61) * w + t * v + i * w / n) % w) + w) % w, cy = Math.round(y0 + (hor - y0) * (fy + (h(i, kk, 62) - 0.5) * 0.22)), an = Math.round((26 + h(i, kk, 63) * 30) * s * esc);
    if (o.calma && cy < y0 + 40 && (cx + an * 0.6 > 270 || cx - an * 0.6 < 176) && kk === 2) continue;
    f_nube(R, Math.round(cx), cy, an, i * 7 + kk * 31, kk === 0 ? [N[1], N[1], N[2], N[3]] : N, x0, x1, y0); }
}

// un pájaro pequeño (una uve que aletea) recortado a [x0, x1]
function f_pajaro(R, x, y, t, k, c, x0 = 0, x1 = 319) {
  const a = Math.sin(t * 9 + k * 2.1) > 0 ? 1 : -1; for (const [i, j] of [[0, 0], [-1, -a], [1, -a], [-2, -a * (a > 0 ? 2 : 1)], [2, -a * (a > 0 ? 2 : 1)]]) if (x + i >= x0 && x + i <= x1) R.pset(x + i, y + j, c);
}

// las doce ciudades (lon, lat), en este orden: las tres encontradas (Chicago 1983, Cleveland 2004, Boston 2019) y las
// nueve que faltan
export const F_CIUDADES = [['chicago', -87.63, 41.88], ['cleveland', -81.69, 41.5], ['boston', -71.06, 42.36], ['nuevaYork', -74.0, 40.71], ['houston', -95.37, 29.76],
  ['milwaukee', -87.91, 43.04], ['sanAgustin', -81.31, 29.9], ['nuevaOrleans', -90.07, 29.95], ['montreal', -73.57, 45.5], ['roanoke', -75.66, 35.89], ['charleston', -79.93, 32.78], ['sanFrancisco', -122.42, 37.77]];

// dónde se queda el interrogante de cada una de las nueve (desde su chincheta), para que no tape a las vecinas
const F_DUDA = [[11, 4], [-6, -18], [-7, -18], [-9, -15], [6, -19], [-3, -21], [-10, -13], [-10, -14], [7, -18]];

// una chincheta pequeña (cabeza de 5 px con su filo, la aguja y la sombra); b 0–1: cae desde arriba
function f_chincheta(R, x, y, c, cl, b = 1) {
  if (b <= 0) return; const alto = Math.round((1 - b) * (1 - b) * 40);
  R.pset(x + 1 + (alto >> 2), y + 1, hex('#5a503e')); R.pset(x + 2 + (alto >> 2), y + 1, hex('#5a503e')); R.pset(x + 2 + (alto >> 2), y, hex('#5a503e'));
  R.linea(x, y - alto, x, y - 2 - alto, hex('#4a4a56')); R.disco(x, y - 5 - alto, 3, F.k); R.disco(x, y - 5 - alto, 2, c); R.pset(x - 1, y - 6 - alto, cl); R.pset(x, y - 6 - alto, cl);
}

// una foto sujeta con su chincheta (20 × 23): el borde blanco, la sombra y dentro un dibujo sin letras; n: 0 un parque con
// su árbol y su banco, 1 una fuente, 2 una columna con su estatua, 3 un faro en la costa
function f_foto(R, x, y, n, t) {
  const { rect, pset, disco, linea } = R;
  rect(x + 2, y + 2, x + 21, y + 24, hex('#6a6048')); rect(x, y, x + 19, y + 22, F.k); rect(x + 1, y + 1, x + 18, y + 21, F.blanco); rect(x + 1, y + 20, x + 18, y + 21, hex('#d8d4c4'));
  const a = x + 2, b = y + 2; rect(a, b, a + 15, b + 13, n === 3 ? hex('#f0b078') : F.cielo2); rect(a, b, a + 15, b + 2, n === 3 ? hex('#e88a6a') : F.cielo1);
  if (n === 0) { rect(a, b + 9, a + 15, b + 13, F.cesped); rect(a, b + 12, a + 15, b + 13, F.cespedS); rect(a + 4, b + 6, a + 4, b + 10, F.robleD); disco(a + 4, b + 4, 3, F.hojaS); disco(a + 3, b + 3, 2, F.hoja); pset(a + 2, b + 2, F.hojaL); rect(a + 9, b + 9, a + 13, b + 9, F.robleS); pset(a + 9, b + 10, F.robleS); pset(a + 13, b + 10, F.robleS); pset(a + 11, b + 2, F.nubeL); pset(a + 12, b + 2, F.nubeL); }
  else if (n === 1) { rect(a, b + 9, a + 15, b + 13, F.senda); rect(a + 3, b + 9, a + 12, b + 10, hex('#9aa0a8')); rect(a + 3, b + 10, a + 12, b + 10, hex('#6c7480')); rect(a + 7, b + 5, a + 8, b + 9, hex('#b4bac2')); rect(a + 5, b + 6, a + 10, b + 6, hex('#9aa0a8')); for (const i of [5, 10]) { pset(a + i, b + 7, F.aguaL); pset(a + i, b + 8, F.aguaL); } pset(a + 7, b + 3, F.aguaL); pset(a + 8, b + 4, F.aguaL); disco(a + 1, b + 7, 2, F.hojaS); disco(a + 14, b + 7, 2, F.hojaS); }
  else if (n === 2) { rect(a, b + 10, a + 15, b + 13, F.cesped); rect(a + 6, b + 4, a + 9, b + 10, hex('#dcd8cc')); rect(a + 9, b + 4, a + 9, b + 10, hex('#aca89c')); rect(a + 5, b + 10, a + 10, b + 11, hex('#bcb8ac')); rect(a + 5, b + 3, a + 10, b + 3, hex('#eeeadc')); rect(a + 7, b, a + 8, b + 2, hex('#6e8a7a')); pset(a + 9, b + 1, hex('#6e8a7a')); disco(a + 1, b + 8, 2, F.hojaS); disco(a + 14, b + 9, 2, F.hoja); }
  else { rect(a, b + 9, a + 15, b + 13, F.agua1); for (const [i, j] of [[2, 10], [9, 11], [5, 12], [13, 10]]) pset(a + i, b + j, F.aguaL); rect(a + 9, b + 8, a + 15, b + 9, hex('#6a5a4a')); rect(a + 11, b + 2, a + 12, b + 8, F.blanco); rect(a + 11, b + 4, a + 12, b + 5, F.rojo); rect(a + 10, b + 1, a + 13, b + 1, F.k); pset(a + 11, b, F.oroL); disco(a + 3, b + 5, 2, hex('#fff0c0')); }
  // la chincheta de arriba y un brillo que cruza el papel de vez en cuando
  disco(x + 10, y, 2, F.k); disco(x + 10, y, 1, F.oro); pset(x + 9, y - 1, F.oroL);
  const u = ((t * 0.35 + n * 0.23) % 1) * 60 - 20; for (let j = 0; j < 14; j++) { const xx = Math.round(a + u - j * 0.6); if (xx >= a && xx <= a + 15 && (j & 1)) pset(xx, b + j, F.blanco); }
}

// un hilo rojo tenso entre dos puntos, con una pizca de comba que tiembla
function f_hilo(R, x0, y0, x1, y1, t, k) {
  const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)), comba = 1.5 + Math.sin(t * 1.3 + k) * 0.6;
  for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba); R.pset(x, y, F.hilo); R.pset(x, y + 1, F.hiloS); }
}

// el mapa mural de Norteamérica, a pantalla completa (sin sitio para personajes: es un inserto): el mapa de papel
// grabado de mapa() (costas, lagos, ríos, bosques, relieve y el papel viejo, con su rayo de sol, la sombra de las hojas,
// las motas y la mariquita) en su marco de madera, y encima las doce chinchetas, los hilos rojos que van a las fotos
// sujetas en el mar (un parque, una fuente, una columna, un faro), uno de nuestros cuadros (PIEZAS_CF.cuadro) y la nota
// con la cuenta de los que faltan (solo el número y un «?»). o.puntos (0–12, 12 por omisión): cuántas chinchetas han
// caído ya (la última cae desde arriba); o.encontrados (0–3): Chicago, Cleveland y Boston se ponen verdes, con su marca
// de visto y un anillo que late; o.apagados (0–1): las nueve que faltan se apagan a gris; o.dudas (0–1): los nueve
// interrogantes que saltan uno tras otro como palomitas y se quedan bailando; o.hilos y o.fotos (false los quita).
// Devuelve { P (la proyección [lon, lat] → [x, y]), ciudades: { chicago: [x, y], … }, lista: [[x, y] × 12] (en el orden
// de F_CIUDADES), fotos: [[x, y] × 4], nota: [x, y], cuadro: [x, y] }
function f_mapa(R, t, o = {}) {
  const P = mapa(R, t, { zona: 'eeuu', rosa: [100, 158], vida: o.vida });
  const lista = F_CIUDADES.map(([, lon, lat]) => P([lon, lat]).map(Math.round)), ciudades = Object.fromEntries(F_CIUDADES.map(([k], i) => [k, lista[i]]));
  const pts = o.puntos ?? 12, enc = o.encontrados ?? 0, apa = f_cl(o.apagados ?? 0), dud = o.dudas ?? 0;
  const FOTOS = [[24, 86, 0, [11]], [184, 142, 1, [7, 4]], [280, 62, 2, [3, 8]], [272, 112, 3, [9, 10, 6]]], NOTA = [288, 155], CUADRO = [40, 160];
  if (o.fotos !== false) {
    // los hilos van por debajo de las fotos y de las chinchetas
    if (o.hilos !== false) FOTOS.forEach(([fx, fy, , cs], i) => cs.forEach((c, j) => { if (pts > c) f_hilo(R, fx + 10, fy, lista[c][0], lista[c][1] - 5, t, i * 3 + j); }));
    for (const [fx, fy, n] of FOTOS) f_foto(R, fx, fy, n, t);
    // nuestro cuadro, sujeto con dos chinchetas, y la nota con los que faltan
    R.rect(CUADRO[0] - 13, CUADRO[1] - 22, CUADRO[0] + 16, CUADRO[1] + 2, hex('#6a6048')); PIEZAS_CF.cuadro?.(R, CUADRO[0], CUADRO[1], { n: 0 });
    for (const dx of [-11, 11]) { R.disco(CUADRO[0] + dx, CUADRO[1] - 23, 1, F.oro); R.pset(CUADRO[0] + dx, CUADRO[1] - 24, F.oroL); }
    const [nx, ny] = NOTA, falta = 12 - Math.floor(f_cl(enc, 0, 3)), ond = Math.sin(t * 1.7) > 0.6 ? 1 : 0;
    R.rect(nx - 13, ny - 15, nx + 15, ny + 9, hex('#6a6048')); R.rect(nx - 15, ny - 17, nx + 13, ny + 7, F.k); R.rect(nx - 14, ny - 16, nx + 12, ny + 6, hex('#f6e27a')); R.rect(nx - 14, ny + 4, nx + 12, ny + 6, hex('#d8c050'));
    R.poligono([[nx + 12, ny + 6], [nx + 12, ny + 1 - ond], [nx + 7 - ond, ny + 6]], hex('#b89c38'));
    R.numero(String(falta), nx - 12, ny + 1, { rampa: [F.k, F.k, F.rojoS, F.rojo, F.rojo, F.rojoL, F.rojoL, F.rojoL] }); R.icono('?', nx + (falta > 9 ? 6 : 0), ny - 7, F.robleD, hex('#d8c050'));
    R.disco(nx - 1, ny - 16, 2, F.k); R.disco(nx - 1, ny - 16, 1, F.rojo); R.pset(nx - 2, ny - 17, F.rojoL);
  }
  // las chinchetas (de arriba abajo, para que las de delante tapen a las de detrás)
  const orden = lista.map((p, i) => i).sort((a, b) => lista[a][1] - lista[b][1]), GRIS = hex('#8a8a8e'), GRISL = hex('#b4b4b8');
  for (const i of orden) { const b = f_cl(pts - i); if (b <= 0) continue; const [x, y] = lista[i], v = i < 3 ? f_cl(enc - i) : 0;
    const c = v > 0.5 ? F.verde : i >= 3 && apa > 0 ? f_mez(F.rojo, GRIS, apa) : F.rojo, cl = v > 0.5 ? F.verdeL : i >= 3 && apa > 0 ? f_mez(F.rojoL, GRISL, apa) : F.rojoL;
    if (b >= 1 && v <= 0 && apa < 0.5 && pts < 12.5 && pts - i < 1.6) { const r = 3 + Math.round(f_cl(pts - i - 1, 0, 0.6) * 10); R.anillo(x, y - 5, r, F.oroL, 1); }   // el destello al clavarse
    if (v > 0) { const r = 5 + Math.round(((t * 1.2 + i * 0.3) % 1) * 6); R.anillo(x, y - 5, v < 1 ? 3 + Math.round(v * 9) : r, v < 1 ? F.blanco : F.verdeL, 1); }
    f_chincheta(R, x, y, c, cl, b);
    if (v >= 1) { const vx = x - 9, vy = y - 13; for (const [dx, dy] of [[0, 2], [1, 3], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0]]) { R.rect(vx + dx - 1, vy + dy, vx + dx + 1, vy + dy + 2, F.k); } for (const [dx, dy] of [[0, 2], [1, 3], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0]]) R.rect(vx + dx, vy + dy + 1, vx + dx, vy + dy + 1, F.verdeL); } }
  // los nueve interrogantes: saltan como palomitas, uno tras otro, y se quedan bailando encima de su chincheta
  if (dud > 0) for (let k = 0; k < 9; k++) { const i = 3 + [8, 2, 0, 5, 6, 3, 1, 4, 7][k], v = f_cl((dud * 1.5 - k * 0.11) / 0.3); if (v <= 0) continue;
    const [x, y] = lista[i], [ox, oy] = F_DUDA[i - 3], bot = v < 1 ? Math.sin(v * Math.PI) * 12 : Math.abs(Math.sin(t * 3.4 + k * 1.3)) * 3;
    const px = Math.round(x + ox * v), py = Math.round(y - 5 + (oy + 5) * v - bot), g = v < 0.25 ? 1 : v < 0.5 ? 3 : 5;
    R.disco(px, py + 1, g + 1, F.k); if (g >= 5) { R.disco(px - 3, py - 2, 3, F.k); R.disco(px + 3, py - 1, 3, F.k); R.disco(px - 3, py - 2, 2, hex('#fff6d8')); R.disco(px + 3, py - 1, 2, hex('#f4dc9a')); }
    R.disco(px, py + 1, g, hex('#fff0c0')); if (g >= 5) { R.pset(px - 2, py + 5, hex('#e8c070')); R.pset(px + 2, py + 4, hex('#e8c070')); R.icono('?', px - 2, py - 2, F.rojoS, hex('#f4dc9a')); }
    if (v < 1 && v > 0.3) for (let j = 0; j < 4; j++) R.pset(px + Math.round(Math.cos(j * 1.6 + k) * (4 + v * 8)), py + Math.round(Math.sin(j * 1.6 + k) * (4 + v * 8)), F.oroL); }
  return { P, ciudades, lista, fotos: FOTOS.map(([x, y]) => [x + 10, y + 11]), nota: NOTA, cuadro: CUADRO, suelo: null };
}

// una hilera de libros de pie en [x0, x1] sobre la balda y (lomos de colores con su filete, alguno inclinado o tumbado)
function f_libros(R, x0, x1, y, k, alto = 11) {
  const COL = ['#b0463c', '#3e6a9a', '#d8a84a', '#4a8a5a', '#7a4a8a', '#c87a3a', '#e8dcc0', '#2e4a6a', '#9a3a52', '#5a9a9a'].map(hex);
  let x = x0, i = 0;
  while (x < x1 - 1) { const w = 2 + Math.floor(h(i, k, 31) * 2.4), a = alto - Math.floor(h(i, k, 32) * 4), c = COL[Math.floor(h(i, k, 33) * COL.length)];
    if (x + w > x1) break;
    if (h(i, k, 34) < 0.1 && x + 9 < x1) { R.rect(x, y - 3, x + 8, y - 1, c); R.rect(x, y - 1, x + 8, y - 1, f_mez(c, F.k, 0.35)); R.rect(x + 1, y - 2, x + 2, y - 2, F.oroL); x += 10; i++; continue; }
    R.rect(x, y - a, x + w - 1, y - 1, c); R.rect(x + w - 1, y - a, x + w - 1, y - 1, f_mez(c, F.k, 0.35)); R.pset(x, y - a, f_mez(c, F.blanco, 0.4));
    if (w > 2) { R.pset(x + 1, y - a + 2, F.oroL); R.pset(x + 1, y - 3, F.oroL); }
    x += w + (h(i, k, 35) < 0.12 ? 2 : 0); i++; }
}

// la tarima: tablas en filas que se ensanchan hacia nosotros, con juntas alternadas, vetas, nudos y el filo de luz
function f_tarima(R, y0, k = 0, P = [F.tarima, F.tarimaL, F.tarimaS, F.tarimaD]) {
  let y = y0, a = 4, f = 0;
  while (y < 180) { const y1 = Math.min(179, y + a - 1);
    for (let x = 0; x < 320; x++) { const tabla = Math.floor((x + f * 37 + h(f, k, 41) * 50) / (38 + f * 6)), tono = h(tabla, f, 42 + k);
      for (let yy = y; yy <= y1; yy++) R.pset(x, yy, tono < 0.25 ? f_mez(P[0], P[2], 0.45) : tono > 0.8 ? f_mez(P[0], P[1], 0.5) : P[0]);
      if (Math.floor((x + 1 + f * 37 + h(f, k, 41) * 50) / (38 + f * 6)) !== tabla) for (let yy = y; yy <= y1; yy++) R.pset(x, yy, P[2]); }
    R.rect(0, y, 319, y, P[3]); if (a > 3) for (let x = 0; x < 320; x++) if (h(x >> 1, f, 43 + k) < 0.5) R.pset(x, y + 1, P[1]);
    for (let n = 0; n < 26 + f * 4; n++) { const gx = Math.floor(h(n, f, 44 + k) * 320), gy = y + 2 + Math.floor(h(n, f, 45 + k) * Math.max(1, a - 2)), gl = 3 + Math.floor(h(n, f, 46 + k) * (6 + f * 2)); if (gy <= y1) R.rect(gx, gy, Math.min(319, gx + gl), gy, P[2]); }
    for (let n = 0; n < 3; n++) { const gx = Math.floor(h(n, f, 47 + k) * 310), gy = y + 2 + Math.floor(h(n, f, 48 + k) * Math.max(1, a - 3)); if (a > 4 && gy < y1) { R.rect(gx, gy, gx + 2, gy, P[3]); R.pset(gx + 1, gy - 1, P[2]); R.pset(gx + 1, gy + 1, P[2]); } }
    y = y1 + 1; a += 1 + (f > 2 ? 1 : 0); f++; }
}

// lo que se ve por la ventana del estudio, recortado a su hueco [x0, y0, x1, y1]: el cielo con sus nubes, los árboles
// del parque que se mecen, el césped con el sendero y la fuente, y dos paseantes diminutos y un perro
function f_vistaParque(R, t, x0, y0, x1, y1) {
  const hor = y0 + Math.round((y1 - y0) * 0.6);
  f_cielo(R, t, x0, y0, x1, hor, { esc: 0.55, capas: [[0.8, 0.5, 1.2, 3, 0], [0.5, 0.75, 2.4, 3, 1], [0.22, 1, 4.2, 2, 2]] });
  for (let k = 0; k < 3; k++) { const u = ((t * (5 + k * 2) + k * 31) % (x1 - x0 + 30)); f_pajaro(R, Math.round(x1 + 10 - u), y0 + 8 + k * 6 + Math.round(Math.sin(t * 1.3 + k) * 2), t, k, hex('#3a4a6a'), x0, x1); }
  R.recorte([x0, y0, x1, y1]);
  // los árboles lejanos (dos filas) y el césped
  for (let x = x0; x <= x1; x++) { const a = Math.round(4 + 2.5 * Math.sin(x * 0.31) + 1.5 * Math.sin(x * 0.83 + 2)); R.linea(x, hor - a - 3, x, hor, hex('#6a9a8a')); R.pset(x, hor - a - 3, hex('#8ab4a0')); }
  for (const [dx, r, k] of [[6, 7, 0], [24, 9, 1], [47, 8, 2], [58, 6, 3]]) { const m = Math.round(Math.sin(t * 0.9 + k * 2) * 1), cx = x0 + dx;
    R.linea(cx, hor - 2, cx, hor + 5, F.robleD); R.disco(cx + m, hor - r, r, F.hojaD); R.disco(cx + m - 1, hor - r - 1, r - 1, F.hojaS); R.disco(cx + m - 2, hor - r - 2, r - 3, F.hoja); R.disco(cx + m - 3, hor - r - 3, Math.max(1, r - 6), F.hojaL); }
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 51) < 0.14 ? F.cespedL : (y - hor) < 3 ? F.cespedS : h(x >> 1, y, 52) < 0.2 ? F.cespedS : F.cesped);
  // el sendero en curva y la fuente
  for (let y = hor + 4; y <= y1; y++) { const cx = x0 + 30 + Math.round(Math.sin((y - hor) * 0.22) * 8), w = 2 + ((y - hor) >> 2); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, x === cx - w ? F.sendaS : (x + y) % 5 === 0 ? F.sendaL : F.senda); }
  { const fx = x0 + 44, fy = hor + 9; R.disco(fx, fy, 5, hex('#8a9098')); R.disco(fx, fy - 1, 4, F.agua2); R.linea(fx, fy - 7, fx, fy - 1, hex('#c8ccd4')); R.linea(fx - 2, fy - 5, fx + 2, fy - 5, hex('#a8aeb8'));
    for (let k = 0; k < 5; k++) { const u = (t * 1.6 + k / 5) % 1, sx = (k % 2 ? 1 : -1) * Math.round(u * 4); R.pset(fx + sx, fy - 8 + Math.round(u * u * 7), F.aguaL); } R.pset(fx - 2 + Math.floor(t * 3) % 5, fy - 1, F.aguaL); }
  // los paseantes y el perro, de un lado a otro por el césped
  for (const [v, y, c, k] of [[4.5, hor + 6, '#c8423a', 0], [-3.2, hor + 13, '#3a5a9a', 1]]) { const an = x1 - x0 + 16, x = x0 - 8 + ((((t * v + k * 40) % an) + an) % an), p = Math.floor(t * 4 + k) % 2;
    R.linea(Math.round(x), y - 5, Math.round(x), y - 2, hex(c)); R.pset(Math.round(x), y - 6, hex('#f0c8a0')); R.pset(Math.round(x), y - 7, hex('#4a3020')); R.pset(Math.round(x) - p, y - 1, F.k); R.pset(Math.round(x) + 1 - p, y, F.k);
    if (k === 0) { const px = Math.round(x) + 5; R.linea(px, y - 2, px + 3, y - 2, hex('#b08a5a')); R.pset(px + 4, y - 3, hex('#b08a5a')); R.pset(px + p, y - 1, hex('#8a6a3a')); R.pset(px + 3 - p, y - 1, hex('#8a6a3a')); R.pset(px - 1, y - 3 - p, hex('#b08a5a')); } }
  R.recorte(null);
}

// la capa fija del estudio: molduras, papel pintado, zócalo de madera, tarima con la mancha de sol, la ventana con sus
// cortinas (el cristal es un hueco), el sillón, el mapa enmarcado, el reloj, la balda, el escritorio y la librería
function f_estudioFijo(R) {
  const { rect, pset, disco, linea, poligono } = R;
  // el papel pintado: rayas finas y rombos pequeños, más claro junto a la ventana; la esquina de Atom, solo rayas suaves
  for (let y = 14; y <= 103; y++) for (let x = 0; x < 320; x++) { const luz = f_cl(1 - Math.hypot(x - 60, (y - 60) * 1.2) / 150), raya = x % 12 === 0, tranq = x > 262 && y < 52;
    let c = raya ? F.paredS : luz * 1.1 > f_b4(x, y) + 0.25 ? F.paredL : F.pared;
    if (!tranq && !raya) { const mx = ((x + 6) % 12) - 6, my = ((y + ((Math.floor((x + 6) / 12) & 1) * 7)) % 14) - 7; if (Math.abs(mx) + Math.abs(my) === 2) c = F.paredS; else if (mx === 0 && my === 0) c = F.moldura; }
    if (y > 98 && f_b4(x, y) < (y - 98) / 8) c = F.paredS;
    pset(x, y, c); }
  // la moldura del techo
  rect(0, 0, 319, 13, F.moldura); rect(0, 9, 319, 9, F.molduraS); rect(0, 12, 319, 13, F.molduraS); rect(0, 14, 319, 14, F.paredD); for (let x = 3; x < 320; x += 6) { pset(x, 11, F.molduraS); pset(x + 1, 11, F.blanco); } rect(0, 4, 319, 4, F.blanco);
  // el zócalo de cuarterones
  rect(0, 104, 319, 106, F.robleC); rect(0, 104, 319, 104, hex('#dcae78')); rect(0, 107, 319, 107, F.robleD); rect(0, 108, 319, 141, F.roble);
  for (let x = 0; x < 320; x++) for (let y = 108; y <= 137; y++) if (h(x >> 2, y, 21) < 0.16) pset(x, y, F.robleS); else if (h(x >> 3, y, 22) < 0.06) pset(x, y, F.robleL);
  for (let x = 4; x < 320; x += 35) { rect(x, 111, x + 28, 134, F.robleS); rect(x + 1, 112, x + 28, 134, F.robleL); rect(x + 2, 113, x + 27, 133, F.roble); for (let y = 114; y < 133; y++) for (let i = x + 3; i < x + 27; i++) if (h(i >> 2, y, 23) < 0.2) pset(i, y, F.robleS); rect(x + 2, 113, x + 27, 113, F.robleD); rect(x + 2, 113, x + 2, 133, F.robleD); }
  rect(0, 138, 319, 141, F.robleD); rect(0, 138, 319, 138, F.robleS);
  // la tarima y la mancha de sol que entra por la ventana (con la sombra de la cruz)
  f_tarima(R, 142);
  for (let y = 142; y < 180; y++) { const u = (y - 142) / 38, a = 46 + u * 46, b = 112 + u * 62; for (let x = Math.round(a); x <= b; x++) { const v = (x - a) / (b - a); if (Math.abs(v - 0.5) < 0.03 || (u > 0.44 && u < 0.5)) continue; const c = R.pget(x, y); pset(x, y, c === F.tarimaD ? F.tarimaS : c === F.tarimaS ? F.tarima : c === F.tarimaL ? hex('#e8c48a') : (x + y) % 2 ? F.tarimaL : hex('#dcb47a')); } }
  // la alfombra, con su cenefa y sus flecos
  { const y0 = 155, y1 = 174; for (let y = y0; y <= y1; y++) { const d = (y - y0) * 0.8, a = Math.round(96 - d), b = Math.round(262 + d); for (let x = a; x <= b; x++) { const bx = Math.min(x - a, b - x), by = Math.min(y - y0, y1 - y);
      pset(x, y, bx < 2 || by < 1 ? hex('#7a2e34') : bx < 5 || by < 3 ? ((x + y) % 4 < 2 ? hex('#d8b46a') : hex('#b0463c')) : bx < 7 || by < 4 ? hex('#7a2e34') : ((x >> 2) + (y >> 1)) % 6 === 0 ? hex('#d8b46a') : (x + y * 3) % 9 === 0 ? hex('#8a3a40') : hex('#a8423e')); }
      if (y % 2 === 0) { pset(a - 1, y, F.moldura); pset(b + 1, y, F.moldura); } } rect(88, 175, 270, 175, F.tarimaD); }
  // la ventana: marco, hueco del cristal, cruz, alféizar; la barra y las cortinas con sus pliegues
  rect(25, 25, 93, 95, F.k); rect(26, 26, 92, 94, F.moldura); rect(26, 26, 92, 26, F.blanco); rect(29, 29, 89, 91, F.molduraS); rect(30, 30, 88, 90, F_VACIO);
  rect(58, 30, 60, 90, F.moldura); rect(60, 30, 60, 90, F.molduraS); rect(30, 58, 88, 60, F.moldura); rect(30, 60, 88, 60, F.molduraS);
  rect(21, 95, 97, 98, F.k); rect(22, 95, 96, 97, F.moldura); rect(22, 95, 96, 95, F.blanco); rect(24, 99, 94, 100, F.paredD);
  rect(12, 21, 106, 22, F.robleD); rect(12, 21, 106, 21, F.robleL); disco(11, 21, 2, F.oro); disco(107, 21, 2, F.oro); pset(10, 20, F.oroL); pset(106, 20, F.oroL);
  for (const [a, b] of [[14, 28], [90, 104]]) { for (let x = a; x <= b; x++) { const p = Math.sin((x - a) * 1.25); for (let y = 23; y <= 101 + Math.round(p); y++) pset(x, y, p > 0.5 ? hex('#e0946a') : p > -0.3 ? hex('#c87a52') : hex('#a05e3e')); pset(x, 23, hex('#8a4a30')); }
    rect(a, 23, a, 101, F.k); rect(b, 23, b, 101, F.k); for (let x = a; x <= b; x += 3) rect(x, 22, x + 1, 24, F.oro); rect(a + 1, 70, b - 1, 71, hex('#f0d890')); rect(a + 1, 72, b - 1, 72, hex('#8a4a30')); }
  // en el alféizar, un cactus pequeño y una regadera
  rect(34, 91, 39, 94, F.barro); rect(33, 90, 40, 90, F.barroL); rect(35, 84, 38, 89, F.hojaS); rect(36, 84, 36, 89, F.hojaL); pset(34, 87, F.hojaS); pset(39, 86, F.hojaS); pset(36, 83, hex('#f08aa8'));
  rect(74, 88, 82, 94, hex('#5a9aa8')); rect(74, 88, 82, 88, hex('#8accd8')); rect(82, 90, 82, 94, hex('#3e7482')); linea(83, 92, 87, 88, hex('#5a9aa8')); pset(87, 87, hex('#8accd8')); linea(72, 89, 72, 93, hex('#3e7482')); pset(73, 88, hex('#3e7482')); pset(73, 94, hex('#3e7482'));
  // el sillón mostaza bajo la ventana, con su cojín, y las botas de agua al lado
  { const x0 = 34, x1 = 84; rect(x0 + 2, 112, x1 - 2, 147, F.k); rect(x0 + 3, 113, x1 - 3, 132, hex('#d8a43a')); rect(x0 + 3, 113, x1 - 3, 114, hex('#f0c460')); for (let y = 116; y < 131; y += 5) for (let x = x0 + 8 + ((y / 5) & 1) * 5; x < x1 - 6; x += 10) { pset(x, y, hex('#a87a22')); pset(x + 1, y + 1, hex('#f0c460')); }
    rect(x0, 122, x0 + 7, 147, F.k); rect(x1 - 7, 122, x1, 147, F.k); rect(x0 + 1, 123, x0 + 6, 146, hex('#c8922e')); rect(x1 - 6, 123, x1 - 1, 146, hex('#c8922e')); rect(x0 + 1, 123, x0 + 6, 124, hex('#f0c460')); rect(x1 - 6, 123, x1 - 1, 124, hex('#f0c460')); rect(x0 + 6, 125, x0 + 6, 146, hex('#a87a22')); rect(x1 - 1, 125, x1 - 1, 146, hex('#a87a22'));
    rect(x0 + 8, 132, x1 - 8, 137, hex('#e8b84a')); rect(x0 + 8, 132, x1 - 8, 132, hex('#f8d478')); rect(x0 + 8, 138, x1 - 8, 146, hex('#b88628')); rect(x0 + 8, 138, x1 - 8, 138, hex('#8a6418'));
    rect(x0 + 3, 148, x0 + 5, 150, F.robleD); rect(x1 - 5, 148, x1 - 3, 150, F.robleD); for (let x = x0 - 1; x <= x1 + 3; x++) pset(x, 151, F.tarimaD);
    for (const bx of [92, 99]) { rect(bx, 138, bx + 4, 150, F.k); rect(bx + 1, 139, bx + 3, 149, hex('#3a8a5a')); rect(bx + 1, 139, bx + 1, 149, hex('#5ab47a')); rect(bx, 148, bx + 6, 150, F.k); rect(bx + 1, 149, bx + 5, 149, hex('#2a6a42')); rect(bx + 1, 139, bx + 3, 139, hex('#f0d890')); } }
  // el mapa enmarcado: Norteamérica en miniatura con sus doce puntos (tres verdes) y un hilo
  { const ox = 116, oy = 37; rect(ox - 4, oy - 4, ox + 49, oy + 38, hex('#8ea28e')); rect(ox - 5, oy - 5, ox + 48, oy + 37, F.k); rect(ox - 4, oy - 4, ox + 47, oy + 36, F.roble); rect(ox - 4, oy - 4, ox + 47, oy - 4, F.robleC); rect(ox - 4, oy + 36, ox + 47, oy + 36, F.robleD); rect(ox - 2, oy - 2, ox + 45, oy + 34, F.robleD);
    rect(ox - 1, oy - 1, ox + 44, oy + 33, hex('#8fb6cc')); for (let y = oy; y < oy + 33; y++) for (let x = ox; x < ox + 44; x++) if (h(x, y, 24) < 0.12) pset(x, y, hex('#a8c8d8'));
    const NA = [[4, 6], [10, 4], [18, 5], [26, 3], [34, 5], [40, 3], [44, 7], [40, 10], [38, 13], [41, 12], [42, 15], [38, 17], [36, 21], [34, 24], [35, 28], [33, 29], [31, 25], [27, 25], [24, 27], [22, 31], [19, 31], [17, 27], [13, 24], [9, 22], [7, 24], [6, 20], [4, 14]].map(([x, y]) => [ox + x, oy + y]);
    poligono(NA.map(([x, y]) => [x, y + 1]), hex('#5a8aa8')); poligono(NA, hex('#ecdcb0')); for (let y = oy; y < oy + 33; y++) for (let x = ox; x < ox + 44; x++) if (R.pget(x, y) === hex('#ecdcb0')) { if (h(x, y, 25) < 0.1) pset(x, y, hex('#d4c090')); else if (y < oy + 9 && h(x >> 1, y, 26) < 0.3) pset(x, y, hex('#a8b47a')); }
    rect(ox + 28, oy + 10, ox + 31, oy + 11, hex('#8fb6cc')); pset(ox + 32, oy + 12, hex('#8fb6cc')); linea(ox + 24, oy + 12, ox + 26, oy + 24, hex('#7aa0bc'));
    [[29, 13, 1], [32, 13, 1], [39, 11, 1], [38, 13, 0], [23, 24, 0], [29, 10, 0], [33, 24, 0], [28, 25, 0], [37, 8, 0], [36, 18, 0], [34, 21, 0], [6, 15, 0]].forEach(([x, y, v]) => { pset(ox + x, oy + y, v ? F.verde : F.rojo); pset(ox + x, oy + y - 1, v ? F.verdeL : F.rojoL); });
    for (let i = 0; i < 12; i++) pset(ox + 1 + i, oy + 1 + i, hex('#b4d4e4')); disco(ox + 22, oy - 8, 1, F.k); linea(ox + 10, oy - 5, ox + 22, oy - 8, hex('#6a7a6a')); linea(ox + 34, oy - 5, ox + 22, oy - 8, hex('#6a7a6a')); }
  // el reloj de pared (las agujas van aparte)
  disco(190, 46, 10, hex('#8ea28e')); disco(189, 45, 10, F.k); disco(189, 45, 9, F.robleC); disco(189, 45, 7, F.blanco); for (let k = 0; k < 12; k++) pset(189 + Math.round(Math.sin(k * Math.PI / 6) * 6), 45 - Math.round(Math.cos(k * Math.PI / 6) * 6), k % 3 ? F.molduraS : F.k);
  // la balda con libros, un globo terráqueo, una brújula y una bola de nieve
  rect(202, 73, 264, 74, F.k); rect(202, 72, 264, 73, F.robleL); rect(202, 74, 264, 74, F.robleD); rect(204, 75, 262, 76, F.paredD); for (const x of [208, 258]) { linea(x, 75, x, 80, F.robleD); linea(x, 80, x + 3, 75, F.robleD); }
  f_libros(R, 204, 228, 72, 3); disco(238, 64, 6, F.k); disco(238, 64, 5, F.agua2); rect(235, 61, 238, 64, F.cesped); rect(239, 65, 241, 67, F.cesped); pset(236, 60, F.aguaL); rect(237, 70, 239, 71, F.oro); rect(235, 71, 241, 71, F.robleD); linea(232, 62, 244, 66, F.oro);
  disco(251, 68, 3, F.k); disco(251, 68, 2, F.oroL); pset(251, 67, F.rojo); pset(251, 69, F.k); rect(256, 64, 262, 71, F.k); rect(257, 65, 261, 68, F.cielo3); pset(259, 67, F.hoja); pset(258, 66, F.blanco); pset(260, 65, F.blanco); rect(257, 69, 261, 70, F.rojoS);
  // el escritorio, a la altura del pecho de un chibi: tablero con su canto, un cajón a cada lado con su tirador, el hueco
  // de las piernas y las patas
  { const x0 = 164, x1 = 268; rect(x0 + 2, 153, x1 + 4, 153, F.tarimaD); rect(x0 + 3, 154, x1 + 2, 154, F.tarimaS);
    rect(x0, 139, x1, 143, F.k); rect(x0 + 1, 140, x1 - 1, 141, F.robleC); rect(x0 + 1, 140, x1 - 1, 140, hex('#e0b47c')); rect(x0 + 1, 142, x1 - 1, 142, F.robleS); for (let x = x0 + 3; x < x1 - 2; x++) if (h(x >> 2, 3, 27) < 0.3) pset(x, 141, F.robleL);
    rect(x0 + 3, 144, x1 - 3, 152, F.k); rect(x0 + 4, 144, x0 + 34, 151, F.roble); rect(x1 - 34, 144, x1 - 4, 151, F.roble); rect(x0 + 35, 144, x1 - 35, 146, F.robleS); rect(x0 + 35, 147, x1 - 35, 151, hex('#2e2014'));
    for (const a of [x0 + 4, x1 - 34]) { rect(a + 2, 145, a + 28, 150, F.robleD); rect(a + 3, 146, a + 27, 149, F.robleL); rect(a + 3, 149, a + 27, 149, F.roble); for (let x = a + 4; x < a + 27; x++) if (h(x >> 1, 9, 28) < 0.3) pset(x, 147, F.roble); rect(a + 13, 147, a + 17, 147, F.oro); pset(a + 13, 148, F.robleD); pset(a + 17, 148, F.robleD); rect(a, 151, a + 2, 152, F.robleD); rect(a + 28, 151, a + 30, 152, F.robleD); }
    for (let x = x0 + 37; x < x1 - 36; x += 3) pset(x, 151 - ((x >> 1) & 1), F.robleD); }
  // sobre el escritorio: la pila de libros con la lupa encima, y el flexo (su luz va aparte)
  rect(168, 136, 184, 138, F.k); rect(169, 136, 183, 137, hex('#3e6a9a')); rect(169, 138, 183, 138, F.papel); rect(170, 132, 186, 135, F.k); rect(171, 132, 185, 133, hex('#b0463c')); rect(171, 134, 185, 134, F.papel); rect(175, 132, 176, 133, F.oroL);
  rect(169, 129, 182, 131, F.k); rect(170, 129, 181, 129, hex('#4a8a5a')); rect(170, 130, 181, 130, F.papel);
  disco(176, 124, 4, F.k); disco(176, 124, 3, hex('#bfe0ee')); pset(175, 123, F.blanco); pset(174, 124, F.blanco); linea(179, 127, 184, 128, F.robleD); linea(179, 126, 184, 127, F.robleS);
  rect(256, 137, 265, 138, F.k); rect(257, 137, 264, 137, hex('#4a6a8a')); linea(261, 136, 263, 120, F.k); linea(262, 136, 264, 120, hex('#6a8aaa')); linea(263, 120, 252, 111, F.k); linea(264, 120, 253, 111, hex('#6a8aaa')); disco(263, 120, 1, F.oro);
  poligono([[244, 109], [254, 106], [257, 112], [247, 118]], F.k); poligono([[246, 110], [253, 108], [255, 112], [248, 116]], hex('#4a6a8a')); linea(246, 110, 253, 108, hex('#8ab0d0'));
  // el cesto de mimbre con mapas enrollados y un paraguas
  { const x0 = 140, x1 = 156; for (const [dx, a, c] of [[3, 24, '#efe6d0'], [7, 30, '#e0d4b4'], [11, 22, '#efe6d0']]) { rect(x0 + dx - 1, 134 - a, x0 + dx + 2, 140, F.k); rect(x0 + dx, 135 - a, x0 + dx + 1, 140, hex(c)); pset(x0 + dx, 135 - a, hex('#c8342e')); pset(x0 + dx + 1, 139 - a, hex('#8a9ab8')); }
    rect(x0, 134, x1, 150, F.k); for (let y = 135; y <= 149; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, ((x + (y >> 1) * 2) % 4 < 2) ? hex('#c8a060') : hex('#9a7438')); rect(x0 + 1, 135, x1 - 1, 135, hex('#e4c080')); rect(x1 - 1, 136, x1 - 1, 149, hex('#7a5a2a')); rect(x0 + 1, 151, x1 + 2, 151, F.tarimaD); }
  // la librería de la derecha (por debajo de la esquina de Atom): baldas con libros, una caja, una planta colgante y un trofeo
  { const x0 = 274, x1 = 316, y0 = 54; rect(x0 + 3, y0 + 3, x1 + 3, 151, hex('#8ea28e')); rect(x0, y0, x1, 151, F.k); rect(x0 + 1, y0 + 1, x1 - 1, 150, F.roble); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, F.robleC); rect(x0 + 1, y0 + 3, x0 + 2, 150, F.robleL); rect(x1 - 2, y0 + 3, x1 - 1, 150, F.robleS);
    for (let b = 0; b < 5; b++) { const ya = y0 + 4 + b * 19, yb = ya + 15; rect(x0 + 3, ya, x1 - 3, yb, hex('#3a2616')); rect(x0 + 3, ya, x1 - 3, ya + 1, hex('#241408')); rect(x0 + 3, yb + 1, x1 - 3, yb + 2, F.robleC); rect(x0 + 3, yb + 3, x1 - 3, yb + 3, F.robleD);
      if (b === 1) { f_libros(R, x0 + 4, x0 + 20, yb + 1, 11, 12); rect(x0 + 24, yb - 8, x0 + 36, yb, F.k); rect(x0 + 25, yb - 7, x0 + 35, yb - 1, hex('#c8a060')); rect(x0 + 25, yb - 7, x0 + 35, yb - 6, hex('#e4c080')); rect(x0 + 29, yb - 5, x0 + 31, yb - 3, F.oro); }
      else if (b === 3) { f_libros(R, x0 + 16, x1 - 4, yb + 1, 13, 12); disco(x0 + 9, yb - 4, 4, F.k); disco(x0 + 9, yb - 4, 3, F.barro); rect(x0 + 6, yb - 8, x0 + 12, yb - 7, F.barroL); disco(x0 + 8, yb - 10, 2, F.hoja); disco(x0 + 11, yb - 11, 2, F.hojaS); pset(x0 + 7, yb - 11, F.hojaL); }
      else if (b === 4) { rect(x0 + 5, yb - 9, x0 + 20, yb, F.k); rect(x0 + 6, yb - 8, x0 + 19, yb - 1, hex('#4a6a8a')); rect(x0 + 6, yb - 8, x0 + 19, yb - 7, hex('#6a8aaa')); rect(x0 + 11, yb - 5, x0 + 14, yb - 4, F.papel); f_libros(R, x0 + 23, x1 - 4, yb + 1, 17, 10); }
      else f_libros(R, x0 + 4, x1 - 4, yb + 1, 5 + b * 2, 12); }
    // la planta colgante de arriba, que cae por el canto
    rect(x0 + 6, y0 - 6, x0 + 16, y0 - 1, F.k); rect(x0 + 7, y0 - 5, x0 + 15, y0 - 1, hex('#e8dcc0')); rect(x0 + 7, y0 - 5, x0 + 15, y0 - 5, F.blanco);
    for (const [dx, l, k] of [[5, 16, 0], [8, 9, 1], [12, 22, 2], [16, 12, 3]]) for (let j = 0; j < l; j++) { const xx = x0 + dx + Math.round(Math.sin(j * 0.5 + k) * 1.5), yy = y0 - 6 + j; pset(xx, yy, F.hojaS); if (j % 3 === 0) { pset(xx + 1, yy, F.hoja); pset(xx - 1, yy + 1, F.hojaL); } } }
}

// el estudio de Atom, de día (cámara 'general'). Ver la cabecera de hoy()
function f_estudio(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R;
  f_vistaParque(R, t, 30, 30, 88, 90);
  f_pegar(R, f_capa(R, 'estudio', () => f_estudioFijo(R)));
  // los reflejos del cristal: dos brillos en diagonal que cruzan despacio
  { const u = ((t * 0.12) % 1) * 90 - 20; for (let j = 0; j < 60; j++) for (const d of [0, 9]) { const x = Math.round(30 + u + d - j * 0.5), y = 30 + j; if (x >= 30 && x <= 88 && x !== 58 && x !== 59 && x !== 60 && (y < 58 || y > 60) && (j + d) % 3 === 0) pset(x, y, hex('#e8f4fa')); } }
  // el haz de sol con sus motas
  motas(R, t, 44, 150, 96, 172, 16, hex('#fff6d8'));
  // el reloj: las agujas
  { const cx = 189, cy = 45, as = t * Math.PI * 2 / 60 * 6, am = t * 0.02 + 1.1, ah = 5.2; linea(cx, cy, cx + Math.round(Math.sin(ah) * 3), cy - Math.round(Math.cos(ah) * 3), F.k); linea(cx, cy, cx + Math.round(Math.sin(am) * 5), cy - Math.round(Math.cos(am) * 5), F.k); linea(cx, cy, cx + Math.round(Math.sin(as) * 6), cy - Math.round(Math.cos(as) * 6), F.rojo); pset(cx, cy, F.oro); }
  // el gato dormido en el sillón: respira, mueve la oreja y la punta de la cola
  { const r = Math.sin(t * 1.6) > 0.3 ? 1 : 0, cx = 60, cy = 131, N = hex('#e89a4a'), NS = hex('#b86a2a'), NL = hex('#f8c888');
    for (let i = -9; i <= 9; i++) { const a = Math.round(Math.sqrt(1 - (i / 9.5) ** 2) * (6 + r)); rect(cx + i, cy - a - 1, cx + i, cy, F.k); if (Math.abs(i) < 9) rect(cx + i, cy - a, cx + i, cy, i % 4 === 0 ? NS : N); if (Math.abs(i) < 7) pset(cx + i, cy - a, NL); }
    disco(cx - 8, cy - 3, 4, F.k); disco(cx - 8, cy - 3, 3, N); const or = (t % 5.3) < 0.2 ? 1 : 0; poligono([[cx - 12, cy - 5], [cx - 11, cy - 9 - or], [cx - 9, cy - 6]], F.k); poligono([[cx - 7, cy - 6], [cx - 5, cy - 9], [cx - 4, cy - 5]], F.k); pset(cx - 11, cy - 7 - or, N); pset(cx - 5, cy - 7, N);
    pset(cx - 10, cy - 3, F.k); pset(cx - 9, cy - 3, F.k); pset(cx - 6, cy - 3, F.k); pset(cx - 5, cy - 3, F.k); pset(cx - 8, cy - 1, hex('#f08aa0')); rect(cx - 9, cy, cx - 7, cy, NL);
    const cl = Math.round(Math.sin(t * 2.2) * 1.5); linea(cx + 9, cy - 1, cx + 13, cy - 3 - cl, F.k); linea(cx + 9, cy, cx + 14, cy - 2 - cl, N); pset(cx + 14, cy - 3 - cl, NL); }

  // la luz del flexo sobre la maceta y la pared (tramada, con un parpadeo leve)
  { const f = Math.sin(t * 9) > 0.96 ? 0.85 : 1; for (let y = 112; y <= 139; y++) { const a = (y - 112) / 27, xa = 251 - a * 34, xb = 251 + a * 4; for (let x = Math.round(xa); x <= xb; x++) if (f_b4(x, y) < 0.34 * f * (1 - a * 0.5)) pset(x, y, hex('#fff0b8')); } disco(250, 114, 1, hex('#fffbe0')); }
  // la maceta grande (a escala 2) con su pala de juguete clavada al lado y, si toca, la llavecita en la mesa
  const mx = 214, my = 139;
  rect(mx - 19, my + 1, mx + 21, my + 1, F.robleS);
  PIEZAS_CF.maceta?.(R, mx, my, { s: 2, hoyo: !!o.hoyo });
  if (o.pala !== false) { rect(238, my + 1, 246, my + 1, F.robleS); PIEZAS_CF.palaJuguete?.(R, 241, my, { s: 1 }); }
  if (o.llave) { PIEZAS_CF.llave?.(R, 194, my, {}); if (Math.sin(t * 4) > 0.5) { pset(196, my - 9, F.blanco); pset(197, my - 10, F.blanco); pset(195, my - 10, F.blanco); pset(196, my - 11, F.blanco); } }
  // una mariposa que ronda la planta
  { const a = t * 1.1, bx = Math.round(mx + Math.cos(a) * 24 + Math.sin(a * 2.3) * 5), by = Math.round(92 + Math.sin(a * 1.7) * 9), al = Math.sin(t * 16) > 0 ? 2 : 1; pset(bx, by, F.k); pset(bx - 1, by - al + 1, hex('#f0a030')); pset(bx + 1, by - al + 1, hex('#f0a030')); if (al > 1) { pset(bx - 2, by - 2, hex('#f8d060')); pset(bx + 2, by - 2, hex('#f8d060')); } }
  return { suelo: 160, sueloMin: 156, sueloMax: 172, mesa: { x0: 164, x1: 268, y: 139, pie: 153 }, maceta: [mx, my], macetaEscala: 2, tierra: [mx, my - 26], pala: [241, my], llave: [194, my], ventana: [30, 30, 88, 90], sillon: [59, 131], mapa: [112, 33, 164, 74], libreria: [274, 54, 316, 151], flexo: [250, 114], libre: [100, 160] };
}

// por delante de los personajes en el estudio: el cajón de jardinería (abajo a la izquierda), con el saco de tierra, la
// regadera y los guantes, y las hojas grandes de la planta del rincón (abajo a la derecha), que se mecen
function f_estudioDelante(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R;
  rect(0, 160, 42, 179, F.k); for (let y = 161; y < 180; y++) for (let x = 0; x <= 41; x++) pset(x, y, (y - 161) % 6 === 5 ? F.robleD : h(x >> 2, y, 71) < 0.25 ? F.robleS : F.roble); rect(0, 161, 41, 161, F.robleC); for (const x of [3, 38]) { pset(x, 164, F.k); pset(x, 170, F.k); pset(x, 176, F.k); }
  poligono([[4, 160], [8, 147], [24, 146], [27, 160]], F.k); poligono([[6, 160], [9, 149], [23, 148], [25, 160]], hex('#c8b890')); rect(10, 152, 22, 152, hex('#a89868')); R.icono('gota', 13, 153, F.hojaS, hex('#c8b890')); rect(9, 148, 23, 149, hex('#e0d4b0'));
  rect(29, 150, 40, 160, F.k); rect(30, 151, 39, 160, hex('#5a9aa8')); rect(30, 151, 39, 151, hex('#8accd8')); linea(28, 153, 22, 148, F.k); linea(28, 154, 22, 149, hex('#5a9aa8')); rect(33, 146, 37, 147, F.k); linea(32, 150, 33, 147, F.k); linea(38, 150, 37, 147, F.k);
  // la planta del rincón
  rect(296, 166, 319, 179, F.k); rect(297, 167, 319, 179, F.barro); rect(297, 167, 319, 168, F.barroL); rect(294, 163, 319, 166, F.k); rect(295, 164, 319, 165, F.barroL);
  for (const [bx, by, l, an, k] of [[304, 164, 22, -2.1, 0], [308, 164, 26, -1.75, 1], [312, 164, 24, -1.35, 2], [306, 164, 15, -2.6, 3], [314, 164, 17, -1.0, 4]]) { const a = an + Math.sin(t * 1.1 + k * 1.7) * 0.05, ex = bx + Math.cos(a) * l, ey = by + Math.sin(a) * l, nx = -Math.sin(a), ny = Math.cos(a);
    poligono([[bx, by], [Math.round(bx + Math.cos(a) * l * 0.5 + nx * 5), Math.round(by + Math.sin(a) * l * 0.5 + ny * 5)], [Math.round(ex), Math.round(ey)], [Math.round(bx + Math.cos(a) * l * 0.5 - nx * 5), Math.round(by + Math.sin(a) * l * 0.5 - ny * 5)]], k % 2 ? F.hojaS : F.hoja);
    linea(bx, by, Math.round(ex), Math.round(ey), k % 2 ? F.hoja : F.hojaL); }
  return {};
}

// la geometría de la maceta grande: el medio ancho de fuera y de dentro en cada fila (el labio arriba, el cuerpo que se
// estrecha hacia la base)
const F_MAC = { cx: 160, y0: 56, y1: 150, tierra: 71, fondo: 143 };

const f_macFuera = (y) => (y < 68 ? 72 : 65 - (y - 68) * 19 / 82), f_macDentro = (y) => (y < 68 ? 62 : 58 - (y - 68) * 19 / 82);

// la capa fija de la maceta en corte: la pared del estudio desenfocada (rayas anchas, la ventana a la izquierda con el
// cristal hueco), la mesa de roble, la maceta de barro cortada (sus paredes en sección, el labio, el agujero de drenaje y
// el plato) y la tierra por dentro en capas: mantillo con raíces, tierra prieta con piedras y lombriceras, y la grava
function f_macetaFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, M = F_MAC;
  // la pared, a lo grande y desenfocada: rayas anchas y rombos tramados; arriba a la derecha, tranquila
  for (let y = 0; y <= 131; y++) for (let x = 0; x < 320; x++) { const raya = (x + 8) % 34 < 3, luz = f_cl(1 - Math.hypot(x - 30, (y - 60) * 1.3) / 190), tranq = x > 250 && y < 56;
    let c = raya ? F.paredS : luz > f_b4(x, y) + 0.2 ? F.paredL : F.pared;
    if (!tranq && !raya) { const mx = ((x + 25) % 34) - 17, my = ((y + ((Math.floor((x + 25) / 34) & 1) * 17)) % 34) - 17, d = Math.abs(mx) + Math.abs(my); if (d < 6 && (d === 5 || (d < 3 && (x + y) % 2))) c = F.paredS; }
    pset(x, y, c); }
  rect(0, 0, 319, 5, F.moldura); rect(0, 6, 319, 7, F.molduraS); rect(0, 8, 319, 8, F.paredD);
  // la ventana, cerca: marco grueso, el cristal hueco, la cortina recogida
  rect(0, 14, 78, 112, F.k); rect(0, 15, 77, 111, F.moldura); rect(0, 15, 77, 16, F.blanco); rect(72, 17, 77, 111, F.molduraS); rect(0, 20, 70, 104, F_VACIO); rect(30, 20, 34, 104, F.moldura); rect(34, 20, 34, 104, F.molduraS); rect(0, 60, 70, 64, F.moldura); rect(0, 64, 70, 64, F.molduraS);
  rect(0, 112, 86, 117, F.k); rect(0, 113, 85, 116, F.moldura); rect(0, 113, 85, 113, F.blanco); rect(0, 118, 82, 119, F.paredD);
  for (let x = 80; x <= 100; x++) { const p = Math.sin((x - 80) * 0.75); for (let y = 9; y <= 122 + Math.round(p * 2); y++) { const est = y > 74 && y < 80; pset(x, y, est ? hex('#f0d890') : p > 0.5 ? hex('#e0946a') : p > -0.3 ? hex('#c87a52') : hex('#a05e3e')); } } rect(79, 9, 79, 122, F.k); rect(101, 9, 101, 122, F.k); rect(72, 9, 110, 11, F.robleD); rect(72, 9, 110, 9, F.robleL);
  // la mesa: el tablero visto desde arriba (vetas largas, nudos, el brillo del barniz), el canto y el frente con un cajón
  for (let y = 132; y <= 168; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 4, y, 91), v2 = h((x + y * 3) >> 5, y >> 1, 92); pset(x, y, y < 134 ? F.robleD : v < 0.2 ? F.roble : v2 < 0.25 ? F.robleC : F.robleL); }
  for (let n = 0; n < 60; n++) { const gx = Math.floor(h(n, 1, 93) * 320), gy = 135 + Math.floor(h(n, 2, 93) * 33), gl = 8 + Math.floor(h(n, 3, 93) * 30); rect(gx, gy, Math.min(319, gx + gl), gy, n % 3 ? F.roble : F.robleS); }
  for (const [nx, ny] of [[44, 158], [268, 142], [236, 162]]) { disco(nx, ny, 2, F.robleS); pset(nx, ny, F.robleD); for (let a = 0; a < 6.3; a += 0.5) pset(Math.round(nx + Math.cos(a) * 4), Math.round(ny + Math.sin(a) * 2), F.roble); }
  for (let x = 0; x < 320; x++) if (h(x >> 1, 9, 94) < 0.6) pset(x, 134, hex('#e0b47c'));
  rect(0, 169, 319, 171, hex('#e0b47c')); rect(0, 172, 319, 173, F.robleS); rect(0, 174, 319, 179, F.robleD); for (let x = 0; x < 320; x++) if (h(x >> 2, 5, 95) < 0.3) pset(x, 176 + (x & 1), F.robleS);
  rect(110, 175, 210, 179, F.k); rect(111, 176, 209, 179, F.roble); rect(111, 176, 209, 176, F.robleL); rect(150, 178, 170, 179, F.oro);
  // el plato y su sombra
  for (let y = 146; y <= 158; y++) { const w = 60 - Math.abs(y - 152) * 1.5; for (let x = Math.round(M.cx - w - 6); x <= M.cx + w + 12; x++) if ((x + y) % 2 === 0 && y > 150) pset(x, y, F.robleS); }
  rect(M.cx - 56, 149, M.cx + 56, 155, F.k); rect(M.cx - 55, 150, M.cx + 55, 152, F.barroL); rect(M.cx - 55, 150, M.cx + 55, 150, F.barroC); rect(M.cx - 53, 153, M.cx + 53, 154, F.barroS); rect(M.cx - 50, 155, M.cx + 50, 155, F.barroD);
  // la maceta cortada: por fuera el filo, las paredes en sección (barro claro con su veta), el interior en sombra por
  // encima de la tierra y la tierra en capas
  const T = [F.tierra0, F.tierra1, F.tierra2, F.tierra3];
  for (let y = M.y0; y <= M.y1 - 1; y++) { const a = Math.round(f_macFuera(y)), b = Math.round(f_macDentro(y));
    for (let x = M.cx - a; x <= M.cx + a; x++) { const dx = Math.abs(x - M.cx), izq = x < M.cx; let c;
      if (dx >= a - 0 || y === M.y0) c = F.k;
      else if (dx > b || y >= M.fondo + 1) c = (x + y * 2) % 7 === 0 ? F.barroL : dx === a - 1 ? (izq ? F.barroC : F.barroS) : y < 68 && y > 65 ? F.barro : h(x, y, 96) < 0.1 ? F.barro : hex('#e89868');
      else if (dx === b) c = F.barroD;
      else if (y < f_macSup(x)) c = (x + y) % 2 && y > 62 ? F.barroD : F.barroS;
      else { const d = (y - M.tierra) / (M.fondo - M.tierra), n = d * 3.1 + (h(x >> 1, y >> 1, 97) - 0.5) * 0.9 + Math.sin(x * 0.09 + y * 0.05) * 0.25; let l = Math.floor(f_cl(n, 0, 2.99)); if (n - l > f_b4(x, y) + 0.3 && l < 3) l++;
        c = T[Math.min(3, l)]; const r = h(x, y, 98); if (r < 0.05) c = F.tierraL; else if (r > 0.96) c = F.tierra3; else if (d < 0.1 && r < 0.3) c = hex('#6a4a2e');
        if (d > 0.86) c = h(x >> 1, y >> 1, 99) < 0.55 ? ((x >> 1) + (y >> 1)) % 2 ? F.grava : F.gravaS : F.tierra3; }
      pset(x, y, c); } }
  rect(M.cx - 4, M.fondo + 1, M.cx + 4, M.y1 - 1, F.tierra3); rect(M.cx - 5, M.fondo + 1, M.cx - 5, M.y1 - 1, F.barroD); rect(M.cx + 5, M.fondo + 1, M.cx + 5, M.y1 - 1, F.barroD);
  // el labio: su canto de luz y la sombra que echa sobre el cuerpo
  rect(M.cx - 71, 57, M.cx - 63, 57, F.barroC); rect(M.cx + 63, 57, M.cx + 71, 57, F.barroC); rect(M.cx - 71, 67, M.cx - 62, 67, F.barroD); rect(M.cx + 62, 67, M.cx + 71, 67, F.barroD); rect(M.cx - 61, 57, M.cx + 61, 58, F.barroD);
  // piedras, un trozo de teja, una concha de caracol y raíces viejas
  for (const [px, py, r, c] of [[118, 112, 3, '#9a9488'], [206, 100, 2, '#b0a898'], [140, 132, 4, '#8a8478'], [190, 128, 2, '#a8a090'], [128, 94, 2, '#b0a898'], [214, 82, 2, '#9a9488'], [150, 104, 2, '#8a8478'], [200, 136, 3, '#9a9488']]) { disco(px, py, r + 1, F.tierra3); disco(px, py, r, hex(c)); pset(px - 1, py - 1, hex('#d0cabc')); pset(px + 1, py + 1, F.gravaS); }
  poligono([[108, 124], [116, 121], [118, 125], [110, 128]], F.k); poligono([[110, 124], [115, 122], [116, 125], [111, 127]], F.barro);
  disco(212, 118, 3, F.k); disco(212, 118, 2, hex('#e8dcc0')); pset(212, 118, hex('#a89878')); pset(213, 117, hex('#a89878')); pset(209, 120, hex('#e8dcc0'));
}
// las raíces de la planta: hilos claros que bajan desde el pie del tallo y se ramifican
function f_raices(R, x0, y0) {
  const c = hex('#d8c4a0'), cs = hex('#a89070');
  for (let k = 0; k < 7; k++) { let x = x0 + (k - 3) * 1.2, y = y0, dx = (k - 3) * 0.45; const l = 14 + Math.floor(h(k, 1, 111) * 22);
    for (let j = 0; j < l; j++) { x += dx + (h(k, j, 112) - 0.5) * 1.6; y += 1; dx *= 0.96; R.pset(Math.round(x), Math.round(y), j < l * 0.6 ? c : cs); if (j < 5) R.pset(Math.round(x) + 1, Math.round(y), cs);
      if (j % 7 === 5) for (let m = 1; m < 5; m++) R.pset(Math.round(x + m * (k % 2 ? 1 : -1)), Math.round(y + m * 0.6), cs); } }
}

// una hoja grande en (x, y) que sale con el ángulo a y mide l; el nervio claro y la mitad de abajo en sombra
function f_hoja(R, x, y, a, l, an = 0.3) {
  const ex = x + Math.cos(a) * l, ey = y + Math.sin(a) * l, mx = x + Math.cos(a) * l * 0.45, my = y + Math.sin(a) * l * 0.45, nx = -Math.sin(a) * l * an, ny = Math.cos(a) * l * an, q = (u, v) => [Math.round(u), Math.round(v)];
  R.poligono([q(x, y), q(mx + nx * 1.12, my + ny * 1.12 - 1), q(ex + Math.cos(a) * 1.5, ey + Math.sin(a) * 1.5), q(mx - nx * 1.12, my - ny * 1.12 + 1)], F.k);
  R.poligono([q(x, y), q(mx + nx, my + ny), q(ex, ey)], ny > 0 ? F.hojaS : F.hoja); R.poligono([q(x, y), q(mx - nx, my - ny), q(ex, ey)], ny > 0 ? F.hoja : F.hojaS);
  R.linea(...q(x, y), ...q(ex, ey), F.hojaL); for (const u of [0.3, 0.5, 0.7]) { const bx = x + (ex - x) * u, by = y + (ey - y) * u; R.linea(...q(bx, by), ...q(bx + nx * 0.55 * (1 - u) * 2 + Math.cos(a) * 3, by + ny * 0.55 * (1 - u) * 2 + Math.sin(a) * 3), F.hojaL); }
}

// la maceta de cerca, en corte, sobre la mesa del estudio (cámara 'maceta'). Ver la cabecera de hoy()
function f_maceta(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, M = F_MAC;
  // por la ventana: el cielo con sus nubes, las copas desenfocadas del parque que se mecen y un pájaro
  f_cielo(R, t, 0, 20, 70, 84, { esc: 1.1, capas: [[0.85, 0.5, 1.5, 3, 0], [0.55, 0.8, 3, 3, 1], [0.25, 1.1, 5.5, 2, 2]] });
  R.recorte([0, 20, 70, 104]);
  for (const [cx, cy, r, k] of [[8, 92, 16, 0], [36, 96, 18, 1], [62, 90, 14, 2]]) { const m = Math.round(Math.sin(t * 0.8 + k * 2)); disco(cx + m, cy, r, F.hojaD); disco(cx + m - 2, cy - 3, r - 3, F.hojaS); disco(cx + m - 4, cy - 6, r - 8, F.hoja); for (let j = 0; j < 9; j++) { const a = j * 0.9 + k, d = r * (0.3 + h(j, k, 121) * 0.6); pset(Math.round(cx + m + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.8 - 2), j % 2 ? F.hojaL : F.hoja); } }
  { const u = (t * 11) % 120; f_pajaro(R, Math.round(84 - u), 34 + Math.round(Math.sin(t * 1.4) * 3), t, 0, hex('#3a4a6a'), 0, 70); f_pajaro(R, Math.round(98 - u), 40 + Math.round(Math.sin(t * 1.4 + 1) * 3), t, 1, hex('#3a4a6a'), 0, 70); }
  R.recorte(null);
  f_pegar(R, f_capa(R, 'maceta', () => f_macetaFijo(R)));
  // el brillo del cristal y las motas del rayo de sol
  { const u = ((t * 0.1) % 1) * 110 - 20; for (let j = 0; j < 84; j++) { const x = Math.round(u - j * 0.45), y = 20 + j; if (x >= 0 && x <= 70 && !(x >= 30 && x <= 34) && !(y >= 60 && y <= 64) && j % 3 === 0) { pset(x, y, hex('#e8f4fa')); pset(x + 6, y, hex('#e8f4fa')); } } }
  motas(R, t, 20, 140, 30, 130, 14, hex('#fff6d8'));
  // el flexo, que entra por la derecha (por debajo de la esquina de Atom), y su luz tramada sobre la maceta
  { const f = Math.sin(t * 9) > 0.96 ? 0.8 : 1; for (let y = 78; y <= 148; y++) { const a = (y - 78) / 70, xa = 276 - a * 62, xb = 290 + a * 16; for (let x = Math.round(xa); x <= Math.min(319, xb); x++) if (f_b4(x, y) < 0.2 * f * (1 - a * 0.6) && R.pget(x, y) !== F.k) pset(x, y, hex('#fff0b8')); }
    linea(319, 52, 296, 60, F.k); linea(319, 53, 296, 61, hex('#6a8aaa')); linea(319, 54, 296, 62, hex('#4a6a8a')); linea(319, 55, 297, 63, F.k);
    R.poligono([[268, 70], [286, 56], [300, 62], [296, 80], [276, 82]], F.k); R.poligono([[271, 70], [286, 59], [297, 63], [294, 77], [277, 79]], hex('#4a6a8a')); linea(272, 69, 286, 59, hex('#8ab0d0')); linea(287, 59, 296, 63, hex('#6a8aaa')); R.poligono([[272, 73], [278, 80], [293, 78]], hex('#fff6c8')); disco(296, 61, 2, F.oro); }
  // el hoyo y el cofre enterrado: o.cofre 0–1 lo baja por el hoyo; o.tapa 0–1 rellena el hoyo de tierra removida
  const cof = f_cl(o.cofre ?? 0), cx = 184, cyTop = M.tierra + 2, cy = Math.round(lerp(cyTop + 10, 134, cof)), tapa = f_cl(o.tapa ?? (cof >= 1 ? 1 : 0)), hoyo = cof > 0 || o.hoyo;
  if (hoyo) { const fondo = cof > 0 ? cy + 2 : M.tierra + 22;
    // (nada por encima de la superficie de la tierra: el hoyo abierto empieza en ella y el relleno acaba a ras, sin borde)
    for (let y = M.tierra - 4; y <= fondo; y++) { const w = 29 + Math.round(Math.sin(y * 0.7) * 1.5) - (y > fondo - 3 ? (y - fondo + 3) * 3 : 0); for (let x = cx - w; x <= cx + w; x++) { const sup = f_macSup(x); if (y < sup) continue; const lleno = y > lerp(fondo, sup - 1, tapa) + Math.sin(x * 0.5) * 1.5 * (1 - tapa);
      pset(x, y, lleno ? (h(x, y, 131) < 0.3 ? F.tierraL : h(x, y, 132) < 0.4 ? F.tierra0 : hex('#6a4a2e')) : Math.abs(x - cx) > w - 2 ? F.tierra2 : (x + y) % 2 ? F.tierra3 : hex('#1e120a')); } }
    // el montón de tierra sacada, al lado del hoyo (se gasta al tapar)
    const mont = Math.round(9 * (1 - tapa)); for (let i = -14; i <= 14; i++) { const a = Math.round(Math.cos(i / 14 * Math.PI / 2) * mont); if (a > 0) { rect(cx - 46 + i, M.tierra - a, cx - 46 + i, M.tierra, h(i, 1, 133) < 0.3 ? F.tierraL : F.tierra0); pset(cx - 46 + i, M.tierra - a, F.k); } } }
  if (cof > 0) { PIEZAS_CF.cofre?.(R, cx, cy, { s: 2, sinCaja: !!o.sinCaja });
    if (tapa > 0) { const fondo = cy + 2; for (let x = cx - 29; x <= cx + 29; x++) { const sup = f_macSup(x), lim = lerp(fondo, sup - 1, tapa) + Math.sin(x * 0.5) * 1.5 * (1 - tapa); for (let y = Math.max(sup, Math.ceil(lim)); y <= fondo; y++) if (y > lim && (Math.abs(x - cx) > 26 || y < cy - 44)) pset(x, y, h(x, y, 131) < 0.3 ? F.tierraL : h(x, y, 132) < 0.4 ? F.tierra0 : hex('#6a4a2e')); } } }
  // las raíces y la planta: el tallo que se mece y sus hojas grandes
  const px = 126; f_raices(R, px, M.tierra);
  { const m = (y) => Math.sin(t * 1.2) * (M.tierra - y) * 0.035 + Math.sin(t * 2.1 + 1) * (M.tierra - y) * 0.012; let ax = px, ay = M.tierra + 1;
    for (let y = M.tierra; y >= 26; y--) { const x = Math.round(px + Math.sin((M.tierra - y) * 0.05) * 5 + m(y)); rect(x - 2, y, x + 2, y, F.k); rect(x - 1, y, x + 1, y, F.hoja); pset(x - 1, y, F.hojaL); ax = x; ay = y; }
    for (const [y, a, l] of [[60, -0.5, 30], [52, Math.PI + 0.45, 28], [42, -0.75, 26], [36, Math.PI + 0.7, 22], [30, -1.0, 12], [29, Math.PI + 1.0, 11]]) { const x = px + Math.sin((M.tierra - y) * 0.05) * 5 + m(y); f_hoja(R, x, y, a + Math.sin(t * 1.2 + y) * 0.05, l); }
    rect(ax - 1, ay - 3, ax + 1, ay - 1, F.hojaC); pset(ax, ay - 4, F.hojaC); }
  // la llavecita: o.llave 0–1 sube desde lo hondo hasta asomar entera por encima de la tierra, con su destello
  const ll = f_cl(o.llave ?? 0), lx = cx, ly = Math.round(lerp(M.tierra + 20, M.tierra - 6, ll));
  if ((o.llave ?? 0) > 0) { PIEZAS_CF.llave?.(R, lx, ly, { s: 2 }); if (ll > 0.8) for (let k = 0; k < 4; k++) { const a = t * 2 + k * 1.57, r = 14 + Math.sin(t * 5) * 2; pset(Math.round(lx + Math.cos(a) * r), Math.round(ly - 14 + Math.sin(a) * r), F.oroL); pset(Math.round(lx + Math.cos(a) * (r - 1)), Math.round(ly - 14 + Math.sin(a) * (r - 1)), F.blanco); } }
  // la vida de la tierra: una lombriz que se estira y se encoge, y hormigas en fila por su galería
  { const e = Math.sin(t * 2.4) * 0.5 + 0.5, x0 = 132, y0 = 122, l = 12 + Math.round(e * 6); for (let i = 0; i < l; i++) { const x = x0 + i, y = y0 + Math.round(Math.sin(i * 0.7 + t * 3) * 1.5); pset(x, y, hex('#e89a9a')); pset(x, y + 1, i > 3 && i < 7 ? hex('#f8c0b8') : hex('#c06a72')); } }
  for (let x = 110; x <= 150; x++) { const y = 102 + Math.round(Math.sin(x * 0.2) * 2); pset(x, y, F.tierra3); pset(x, y + 1, hex('#1e120a')); }
  for (let k = 0; k < 4; k++) { const u = ((t * 0.16 + k * 0.25) % 1), x = Math.round(110 + u * 40), y = 102 + Math.round(Math.sin(x * 0.2) * 2); pset(x, y, hex('#c8a070')); pset(x + 1, y, hex('#e8c8a0')); }
  // una mariquita que recorre el labio de la maceta
  { const u = (t * 0.05) % 1, x = Math.round(M.cx - 66 + u * 132), p = Math.floor(t * 6) % 2; rect(x - 2, 53, x + 2, 55, F.k); rect(x - 1, 53, x + 1, 54, F.rojo); pset(x, 53, F.k); pset(x + 2, 54, F.k); pset(x - 1 + p, 56, F.k); pset(x + 1 - p, 56, F.k); }
  // la pala de juguete clavada en la tierra y las cosas de la mesa: los sobres de semillas y la taza que humea
  if (o.pala !== false) PIEZAS_CF.palaJuguete?.(R, 112, M.tierra + 5, { s: 2 });
  for (const [sx, sy, c, k] of [[246, 150, '#e8dcc0', 0], [262, 153, '#d8e8c8', 1]]) { rect(sx, sy - 22, sx + 15, sy, F.k); rect(sx + 1, sy - 21, sx + 14, sy - 1, hex(c)); rect(sx + 1, sy - 21, sx + 14, sy - 18, k ? F.hoja : F.rojo); disco(sx + 7, sy - 10, 3, k ? F.oro : hex('#f08aa8')); pset(sx + 7, sy - 10, k ? F.robleD : F.oroL); linea(sx + 7, sy - 6, sx + 7, sy - 3, F.hojaS); pset(sx + 8, sy - 5, F.hoja); rect(sx + 2, sy + 1, sx + 17, sy + 1, F.robleS); }
  { const tx = 38, ty = 150; rect(tx - 9, ty - 16, tx + 9, ty, F.k); rect(tx - 8, ty - 15, tx + 8, ty - 1, hex('#e8e4d8')); rect(tx - 8, ty - 15, tx - 6, ty - 1, F.blanco); rect(tx + 6, ty - 15, tx + 8, ty - 1, hex('#b8b4a8')); rect(tx - 8, ty - 9, tx + 8, ty - 7, hex('#3e6a9a')); rect(tx - 7, ty - 15, tx + 7, ty - 14, hex('#6a4a2e')); rect(tx + 10, ty - 12, tx + 13, ty - 5, F.k); rect(tx + 10, ty - 10, tx + 11, ty - 7, F.robleL); rect(tx - 8, ty + 1, tx + 12, ty + 1, F.robleS);
    for (let k = 0; k < 3; k++) { const u = (t * 0.4 + k / 3) % 1, x = Math.round(tx - 3 + k * 3 + Math.sin(u * 6 + k) * 2), y = Math.round(ty - 18 - u * 16); if (u < 0.85) { pset(x, y, F.blanco); pset(x, y - 1, hex('#e8f0f0')); if (u < 0.5) pset(x + 1, y, F.blanco); } } }
  return { suelo: 150, mesa: 150, maceta: { cx: M.cx, y0: M.y0, y1: M.y1, x0: M.cx - 72, x1: M.cx + 72 }, tierra: M.tierra, hoyo: [cx, M.tierra], cofre: [cx, cy], cofreFondo: [cx, 134], llave: [lx, ly], llaveFuera: [lx, M.tierra - 6], planta: [px, 26], pala: [112, M.tierra + 5], libre: [[232, 60, 268, 120]] };
}
// por delante en la maceta de cerca: en el canto de la mesa, la lupa (con su reflejo que se mueve) y un lápiz
function f_macetaDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  linea(40, 176, 64, 164, F.k); linea(40, 177, 64, 165, F.robleD); linea(41, 178, 65, 166, F.k); disco(74, 158, 12, F.k); disco(74, 158, 10, hex('#c0c8d0')); disco(74, 158, 9, hex('#d8ecf2')); disco(74, 158, 8, hex('#c4e0ea'));
  for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) if (i * i + j * j < 60 && h((74 + i) >> 3, 158 + j, 91) < 0.3) pset(74 + i, 158 + j, hex('#b89868'));
  { const u = Math.sin(t * 0.8) * 3; rect(Math.round(69 + u), 152, Math.round(71 + u), 153, F.blanco); pset(Math.round(68 + u), 154, F.blanco); }
  linea(272, 174, 312, 166, F.k); linea(272, 175, 312, 167, F.oro); linea(272, 176, 312, 168, hex('#b8901c')); linea(272, 177, 312, 169, F.k); rect(266, 175, 271, 177, hex('#e8c8a0')); pset(265, 176, F.k); rect(309, 166, 313, 169, hex('#f08aa8'));
  return {};
}

function f_programa(R, t, x0, y0, x1, y1) {
  const { pset, disco, linea, poligono } = R, w = x1 - x0 + 1, al = y1 - y0 + 1, sue = y1 - 12;
  f_degradado(R, x0, y0, x1, y1, ['#0c2a3a', '#12404a', '#1a5a52', '#2a7a5a', '#1a4a3a', '#0e2e26'].map(hex), null, 0.8);
  R.recorte([x0, y0, x1, y1]);
  disco(x0 + 22, y0 + 13, 7, hex('#f4f0d0')); disco(x0 + 25, y0 + 11, 6, hex('#12404a'));
  // la selva lejana y la media, que se deslizan a distinta velocidad
  for (const [v, base, amp, c, k] of [[3, 30, 8, '#0e3a36', 0], [7, 40, 10, '#0a2a26', 1]]) for (let x = x0; x <= x1; x++) { const xx = x + t * v, a = base - amp * (0.5 + 0.5 * Math.sin(xx * 0.13 + k)) - 3 * Math.sin(xx * 0.41 + k * 2); linea(x, Math.round(y0 + a), x, sue, hex(c)); if (k && Math.floor(xx) % 23 === 0) linea(x, y0 + 8, x, Math.round(y0 + a), hex('#0a2a26')); }
  // el templo: sillares, la puerta oscura y la espiral
  { const tx = x0 + 80 - Math.round(3 - 3 * Math.cos(t * 0.5)), ty = sue; poligono([[tx - 22, ty], [tx - 18, ty - 34], [tx + 18, ty - 34], [tx + 22, ty]], hex('#3a4a4a')); for (let j = 0; j < 34; j += 6) for (let i = -20 + (j % 12 ? 4 : 0); i < 20; i += 9) pset(tx + i, ty - j - 1, hex('#566a66'));
    for (let j = 0; j < 34; j += 6) linea(tx - 19, ty - j, tx + 19, ty - j, hex('#2a3838')); poligono([[tx - 7, ty], [tx - 7, ty - 18], [tx, ty - 23], [tx + 7, ty - 18], [tx + 7, ty]], hex('#061412'));
    for (let a = 0; a < 9; a += 0.4) pset(Math.round(tx + Math.cos(a) * a * 0.55), Math.round(ty - 29 + Math.sin(a) * a * 0.45), hex('#d8c060')); poligono([[tx - 24, ty - 34], [tx + 24, ty - 34], [tx + 20, ty - 38], [tx - 20, ty - 38]], hex('#4a5e5a'));
    for (let k = 0; k < 4; k++) { const lx = tx - 20 + k * 13, ll = 6 + (k * 5) % 7; for (let j = 0; j < ll; j++) pset(lx + Math.round(Math.sin(j * 0.6 + t + k)), ty - 34 + j, hex('#2a7a4a')); } }
  // el suelo y el explorador con su linterna
  for (let y = sue; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, h(x + Math.floor(t * 7), y, 141) < 0.2 ? hex('#2a4a3a') : hex('#12261e'));
  { const ex = x0 + 34 + Math.round(Math.sin(t * 0.5) * 5), ey = sue + 4, p = Math.floor(t * 5) % 2, an = -0.25 + Math.sin(t * 1.3) * 0.3;
    for (let r = 4; r < 46; r++) for (let d = -r * 0.22; d <= r * 0.22; d++) { const x = Math.round(ex + 5 + Math.cos(an) * r - Math.sin(an) * d), y = Math.round(ey - 8 + Math.sin(an) * r + Math.cos(an) * d); if (f_b4(x, y) < 0.5 - r * 0.008) pset(x, y, r < 30 ? hex('#f0e090') : hex('#a8b070')); }
    f_explorador(R, ex, ey, p); }
  // las hojas grandes de delante, que se mecen, y las lianas
  for (const [bx, k, d] of [[x0 - 2, 0, 1], [x1 + 2, 1, -1], [x0 + 50, 2, 1]]) for (let j = 0; j < 4; j++) { const a = (d > 0 ? -0.3 : Math.PI + 0.3) - d * j * 0.42 + Math.sin(t * 1.4 + k + j) * 0.06, l = 22 - j * 2 - (k === 2 ? 10 : 0), by = y1 + 2 - (k === 2 ? 0 : 6);
    poligono([[bx, by], [Math.round(bx + Math.cos(a) * l * 0.5 - Math.sin(a) * 4), Math.round(by + Math.sin(a) * l * 0.5 + Math.cos(a) * 4)], [Math.round(bx + Math.cos(a) * l), Math.round(by + Math.sin(a) * l)], [Math.round(bx + Math.cos(a) * l * 0.5 + Math.sin(a) * 4), Math.round(by + Math.sin(a) * l * 0.5 - Math.cos(a) * 4)]], j % 2 ? hex('#0e3a2a') : hex('#061e16')); }
  // murciélagos y luciérnagas
  for (let k = 0; k < 3; k++) { const u = (t * (0.13 + k * 0.03) + k * 0.37) % 1, bx = Math.round(x1 + 8 - u * (w + 16)), by = y0 + 10 + k * 7 + Math.round(Math.sin(t * 3 + k) * 3), a = Math.sin(t * 14 + k) > 0 ? 1 : -1; pset(bx, by, F.k); pset(bx - 1, by - a, F.k); pset(bx + 1, by - a, F.k); pset(bx - 2, by, F.k); pset(bx + 2, by, F.k); }
  for (let k = 0; k < 9; k++) if (Math.sin(t * 2.3 + k * 1.9) > 0.2) pset(x0 + Math.round(h(k, 1, 142) * w + Math.sin(t * 0.7 + k) * 4), y0 + 18 + Math.round(h(k, 2, 142) * (al - 34) + Math.cos(t * 0.9 + k) * 3), hex('#d8f080'));
  // la mosca del canal (un rombo) y la franja de abajo con una barra que avanza (sin letras)
  poligono([[x1 - 9, y0 + 4], [x1 - 6, y0 + 7], [x1 - 9, y0 + 10], [x1 - 12, y0 + 7]], hex('#e8f0f0'));
  for (let x = x0 + 5; x <= x0 + 50; x++) { pset(x, y1 - 5, hex('#10202a')); pset(x, y1 - 4, x - x0 - 5 < ((t * 4) % 46) ? hex('#f0c040') : hex('#3a5a6a')); pset(x, y1 - 3, hex('#10202a')); }
  R.recorte(null);
}
// lo que se ve por la ventana del salón [x0, y0, x1, y1]: el anochecer tramado, nubes encendidas por debajo, los bloques
// con ventanas que se encienden y se apagan, un avión que parpadea y la luz de los coches abajo
function f_vistaCiudad(R, t, x0, y0, x1, y1) {
  f_degradado(R, x0, y0, x1, y1, ['#1c2256', '#3e3274', '#5e3a7a', '#8a467c', '#b8587a', '#e07c6e', '#f4a868'].map(hex), null, 1.1);
  for (const [dx, dy, w, v, k] of [[10, 16, 26, 0.9, 0], [44, 24, 20, 0.6, 1]]) f_nube(R, x0 + ((dx + t * v) % (x1 - x0 + 30)) - 10, y0 + dy, w, k + 40, [hex('#5e4a86'), hex('#7c5690'), hex('#d27a8a'), hex('#f6b08c')], x0, x1, y0);
  R.recorte([x0, y0, x1, y1]);
  { const u = (t * 0.06) % 1, ax = Math.round(x0 - 4 + u * (x1 - x0 + 8)), ay = y0 + 9 - Math.round(u * 4); R.pset(ax, ay, hex('#c8c8e0')); R.pset(ax - 1, ay, hex('#8a8ab0')); if (Math.sin(t * 8) > 0) R.pset(ax + 1, ay, F.rojo); }
  let x = x0; for (let k = 0; x <= x1; k++) { const w = 7 + Math.floor(h(k, 1, 151) * 8), a = 14 + Math.floor(h(k, 2, 151) * 26), yt = y1 - a, c = k % 2 ? hex('#2a2648') : hex('#1e1c3a');
    R.poligono([[x, y1], [x, yt], [x + w - 1, yt], [x + w - 1, y1]], c); R.linea(x, yt, x, y1, hex('#3e3866'));
    for (let wy = yt + 2; wy < y1 - 1; wy += 3) for (let wx = x + 2; wx < x + w - 1; wx += 2) { const on = h(wx, wy + Math.floor((t + h(wx, wy, 152) * 9) / 5), 153) < 0.45; R.pset(wx, wy, on ? (h(wx, wy, 154) < 0.3 ? hex('#a8d8f0') : hex('#f8d27a')) : hex('#3a3660')); }
    if (k % 3 === 0) { R.linea(x + (w >> 1), yt - 4, x + (w >> 1), yt, hex('#1e1c3a')); if (Math.sin(t * 3 + k) > 0) R.pset(x + (w >> 1), yt - 5, F.rojo); }
    x += w; }
  for (let k = 0; k < 2; k++) { const u = (t * (0.2 + k * 0.07) + k * 0.5) % 1, cx = Math.round(k ? x1 + 3 - u * (x1 - x0 + 6) : x0 - 3 + u * (x1 - x0 + 6)); R.pset(cx, y1, k ? F.rojo : hex('#fff6c8')); R.pset(cx + (k ? 1 : -1), y1, k ? F.rojoS : hex('#f8d27a')); }
  R.recorte(null);
}

// la capa fija del salón: cornisa, papel pintado azul de noche, la tele en la pared (la pantalla es un hueco), el mueble
// bajo con la barra de sonido, la consola y el router, los cuadros, la ventana con sus cortinas (el cristal, hueco), el
// sofá con cojines y una manta, la mesilla con su lámpara, la planta, la tarima oscura y la alfombra
function f_teleFijo(R) {
  const { rect, pset, disco, linea, poligono } = R;
  for (let y = 9; y <= 127; y++) for (let x = 0; x < 320; x++) { const tranq = x > 262 && y < 52, luz = f_cl(1 - Math.hypot(x - 88, (y - 66) * 1.1) / 120) * 0.8 + f_cl(1 - Math.hypot(x - 306, (y - 100) * 1.1) / 60) * 0.9;
    let c = luz > f_b4(x, y) + 0.3 ? F.salonL : F.salon; if (!tranq) { const mx = x % 10, my = (y + (Math.floor(x / 10) & 1) * 5) % 10; if (mx === 5 && my === 5) c = F.salonL; else if ((mx === 4 || mx === 6) && my === 5 || mx === 5 && (my === 4 || my === 6)) c = F.salonS; }
    if (y > 120 && f_b4(x, y) < (y - 120) / 10) c = F.salonS; pset(x, y, c); }
  rect(0, 0, 319, 8, hex('#c8c8d4')); rect(0, 6, 319, 6, hex('#9a9aaa')); rect(0, 8, 319, 8, hex('#7a7a8c')); rect(0, 9, 319, 9, F.salonD); rect(0, 3, 319, 3, hex('#e4e4ec'));
  rect(0, 124, 319, 127, hex('#e4e0d4')); rect(0, 124, 319, 124, F.blanco); rect(0, 127, 319, 127, hex('#8a8698'));
  // la tarima oscura y la alfombra de rombos
  f_tarima(R, 128, 5, [hex('#6a5248'), hex('#826658'), hex('#544038'), hex('#3e2e2a')]);
  { const y0 = 146, y1 = 176; for (let y = y0; y <= y1; y++) { const d = (y - y0) * 0.9, a = Math.round(84 - d), b = Math.round(264 + d); for (let x = a; x <= b; x++) { const bx = Math.min(x - a, b - x), by = Math.min(y - y0, y1 - y), u = ((x - 174) / (1 + (y - y0) * 0.01)) | 0;
      pset(x, y, bx < 2 || by < 1 ? hex('#2a3a5a') : bx < 4 || by < 2 ? hex('#e0d8c0') : (Math.abs((u % 16 + 16) % 16 - 8) + Math.abs((y - y0) % 10 - 5)) % 7 === 0 ? hex('#e0d8c0') : (Math.abs((u % 16 + 16) % 16 - 8) + Math.abs((y - y0) % 10 - 5)) < 4 ? hex('#3e5a8a') : hex('#4a6a9a')); } } rect(78, 177, 292, 177, hex('#3e2e2a')); }
  // la tele: el marco fino, la pantalla (hueco), el pie de pared y los altavoces
  rect(24, 28, 152, 104, hex('#20233a')); rect(25, 29, 151, 103, F.k); rect(27, 31, 149, 101, hex('#2a2c36')); rect(29, 33, 147, 99, F_VACIO); rect(26, 30, 150, 30, hex('#4a4c58')); rect(84, 102, 92, 102, hex('#6a6c78')); pset(144, 102, hex('#3ad06a'));
  // el mueble bajo: tablero, tres puertas (una de rejilla), la barra de sonido, la consola con su piloto, el router y libros
  { const x0 = 30, x1 = 146; rect(x0 + 2, 141, x1 + 3, 141, hex('#3e2e2a')); rect(x0, 112, x1, 140, F.k); rect(x0 + 1, 113, x1 - 1, 114, hex('#e8e4d8')); rect(x0 + 1, 115, x1 - 1, 115, hex('#a8a498')); rect(x0 + 1, 116, x1 - 1, 136, hex('#d8d4c8'));
    for (const [a, b, tipo] of [[x0 + 3, x0 + 38, 0], [x0 + 41, x0 + 76, 1], [x0 + 79, x1 - 3, 0]]) { rect(a, 118, b, 134, hex('#a8a498')); rect(a + 1, 119, b - 1, 133, tipo ? hex('#2a2c36') : hex('#ece8dc')); if (tipo) { for (let y = 120; y < 133; y += 2) rect(a + 2, y, b - 2, y, hex('#3e404c')); rect(a + 6, 126, a + 20, 131, F.k); rect(a + 7, 127, a + 19, 130, hex('#3a3c48')); } else { rect(b - 4, 124, b - 3, 128, hex('#8a8698')); for (let y = 120; y < 133; y++) if (h(a, y, 161) < 0.3) rect(a + 2, y, b - 6, y, hex('#e0dccf')); } }
    for (const x of [x0 + 5, x1 - 8]) { rect(x, 137, x + 3, 140, hex('#8a6a4a')); } rect(x0 + 1, 137, x1 - 1, 137, hex('#8a8698'));
    rect(x0 + 34, 108, x0 + 84, 111, F.k); rect(x0 + 35, 109, x0 + 83, 110, hex('#3a3c48')); for (let x = x0 + 37; x < x0 + 82; x += 2) pset(x, 110, hex('#5a5c68'));
    rect(x0 + 6, 104, x0 + 22, 111, F.k); rect(x0 + 7, 105, x0 + 21, 110, hex('#e8e4d8')); rect(x0 + 7, 108, x0 + 21, 108, hex('#a8a498')); rect(x0 + 98, 106, x0 + 112, 111, F.k); rect(x0 + 99, 107, x0 + 111, 110, hex('#f0f0f4')); linea(x0 + 100, 106, x0 + 98, 99, F.k); linea(x0 + 110, 106, x0 + 112, 99, F.k); }
  // la planta alta de la izquierda
  rect(6, 128, 20, 142, F.k); rect(7, 129, 19, 141, hex('#e8e4d8')); rect(7, 129, 19, 130, F.blanco); rect(17, 131, 19, 141, hex('#a8a498')); for (const [a, l, k] of [[-1.9, 34, 0], [-1.55, 40, 1], [-1.2, 32, 2], [-2.3, 24, 3], [-0.85, 22, 4]]) { const ex = 13 + Math.cos(a) * l, ey = 128 + Math.sin(a) * l; linea(13, 128, Math.round(ex), Math.round(ey), F.hojaD); for (let j = 4; j < l; j += 3) { const px = 13 + Math.cos(a) * j, py = 128 + Math.sin(a) * j, s = 3 + (j % 2); linea(Math.round(px), Math.round(py), Math.round(px - s), Math.round(py - 2), k % 2 ? F.hojaS : F.hoja); linea(Math.round(px), Math.round(py), Math.round(px + s), Math.round(py - 1), k % 2 ? F.hoja : F.hojaS); } }
  // tres cuadros pequeños entre la tele y la ventana: una montaña, una brújula y un pez
  for (const [x, y, n] of [[160, 34, 0], [160, 58, 1], [174, 46, 2]]) { rect(x - 1, y - 1, x + 12, y + 12, F.k); rect(x, y, x + 11, y + 11, n === 1 ? F.oro : hex('#e4e0d4')); rect(x + 1, y + 1, x + 10, y + 10, n === 0 ? F.cielo3 : n === 1 ? F.papel : hex('#2f6fa6'));
    if (n === 0) { poligono([[x + 1, y + 10], [x + 5, y + 4], [x + 8, y + 7], [x + 10, y + 10]], hex('#6a7a9a')); pset(x + 5, y + 4, F.blanco); pset(x + 5, y + 5, F.blanco); } else if (n === 1) { R.anillo(x + 5, y + 5, 3, F.robleD); pset(x + 5, y + 4, F.rojo); pset(x + 5, y + 3, F.rojo); pset(x + 5, y + 6, F.k); } else { rect(x + 3, y + 5, x + 7, y + 6, hex('#f0a040')); pset(x + 8, y + 4, hex('#f0a040')); pset(x + 8, y + 7, hex('#f0a040')); pset(x + 3, y + 5, F.k); pset(x + 2, y + 3, F.aguaL); pset(x + 9, y + 9, F.aguaL); } }
  // la ventana y las cortinas recogidas
  rect(193, 27, 255, 91, F.k); rect(194, 28, 254, 90, hex('#e4e0d4')); rect(197, 31, 251, 87, F_VACIO); rect(223, 31, 225, 87, hex('#e4e0d4')); rect(197, 58, 251, 59, hex('#e4e0d4')); rect(190, 91, 258, 94, F.k); rect(191, 91, 257, 93, hex('#e4e0d4')); rect(191, 91, 257, 91, F.blanco);
  rect(184, 23, 264, 24, hex('#8a8698')); for (const [a, b, d] of [[186, 196, 1], [252, 262, -1]]) for (let x = a; x <= b; x++) { const p = Math.sin((x - a) * 1.3); for (let y = 25; y <= 100; y++) { const est = y > 64 && y < 68, dx = est ? 0 : y > 68 ? Math.round((y - 68) * 0.1 * d) : 0; pset(x + dx, y, est ? F.oro : p > 0.4 ? hex('#5a9a9a') : p > -0.4 ? hex('#3e7a7e') : hex('#2a5a62')); } }
  // el sofá: respaldo, brazos, asiento, cojines y la manta doblada
  { const x0 = 196, x1 = 290; rect(x0 - 2, 150, x1 + 4, 151, hex('#3e2e2a')); rect(x0, 102, x1, 148, F.k); rect(x0 + 1, 103, x1 - 1, 126, F.sofa); rect(x0 + 1, 103, x1 - 1, 104, F.sofaL); for (let y = 106; y < 126; y++) for (let x = x0 + 2; x < x1 - 1; x++) if (h(x, y, 162) < 0.12) pset(x, y, F.sofaS); else if (h(x, y, 163) < 0.05) pset(x, y, F.sofaL);
    rect(x0 + 46, 103, x0 + 47, 126, F.sofaS); for (const bx of [x0 + 23, x0 + 70]) { disco(bx, 114, 1, F.sofaD); pset(bx, 113, F.sofaL); }
    rect(x0, 112, x0 + 9, 148, F.k); rect(x1 - 9, 112, x1, 148, F.k); rect(x0 + 1, 113, x0 + 8, 147, F.sofa); rect(x1 - 8, 113, x1 - 1, 147, F.sofa); rect(x0 + 1, 113, x0 + 8, 115, F.sofaL); rect(x1 - 8, 113, x1 - 1, 115, F.sofaL); rect(x0 + 8, 116, x0 + 8, 147, F.sofaS); rect(x1 - 8, 116, x1 - 8, 147, F.sofaS);
    rect(x0 + 10, 126, x1 - 10, 126, F.k); rect(x0 + 10, 127, x1 - 10, 133, F.sofaL); rect(x0 + 10, 127, x1 - 10, 127, hex('#b47a90')); rect(x0 + 47, 127, x0 + 47, 133, F.sofaS); rect(x0 + 10, 134, x1 - 10, 134, F.k); rect(x0 + 10, 135, x1 - 10, 145, F.sofaS); rect(x0 + 10, 144, x1 - 10, 145, F.sofaD);
    for (const x of [x0 + 3, x1 - 6]) rect(x, 148, x + 3, 150, hex('#8a6a4a'));
    rect(x0 + 11, 113, x0 + 26, 126, F.k); rect(x0 + 12, 114, x0 + 25, 125, hex('#e8c040')); for (let i = 0; i < 12; i += 3) linea(x0 + 12 + i, 114, x0 + 12, 114 + i, hex('#f8e080')); rect(x0 + 12, 124, x0 + 25, 125, hex('#b8901c'));
    rect(x1 - 30, 116, x1 - 11, 126, F.k); rect(x1 - 29, 117, x1 - 12, 125, hex('#5a9a9a')); for (let x = x1 - 28; x < x1 - 12; x += 4) rect(x, 117, x, 125, hex('#e4e0d4'));
    rect(x1 - 22, 100, x1 - 2, 106, F.k); rect(x1 - 21, 101, x1 - 3, 105, hex('#e0d8c0')); for (let x = x1 - 20; x < x1 - 3; x += 3) rect(x, 101, x, 105, hex('#c8423a')); rect(x1 - 21, 103, x1 - 3, 103, hex('#3e5a8a')); for (let x = x1 - 21; x < x1 - 2; x += 2) pset(x, 107, hex('#e0d8c0')); }
  // la mesilla con su lámpara (la luz va aparte), por debajo de la esquina de Atom
  rect(296, 122, 318, 124, F.k); rect(297, 122, 317, 123, hex('#a8845a')); rect(300, 125, 301, 148, hex('#6a4e30')); rect(313, 125, 314, 148, hex('#6a4e30')); rect(300, 138, 314, 138, hex('#6a4e30'));
  rect(305, 112, 309, 121, F.k); rect(306, 113, 308, 121, hex('#e8e4d8')); poligono([[298, 112], [302, 96], [312, 96], [316, 112]], F.k); poligono([[300, 111], [303, 97], [311, 97], [314, 111]], hex('#f8e8b0')); linea(303, 97, 301, 110, hex('#fffbe0'));
}

// el salón de 2018 al anochecer (cámara 'tele'). Ver la cabecera de hoy()
function f_tele(R, t, o = {}) {
  const { rect, pset, disco } = R, enc = o.tele !== false;
  if (enc) f_programa(R, t, 29, 33, 147, 99); else { rect(29, 33, 147, 99, hex('#101218')); for (let j = 0; j < 40; j++) { pset(60 + j, 40 + j, hex('#1e2230')); pset(66 + j, 40 + j, hex('#1e2230')); } }
  f_vistaCiudad(R, t, 197, 31, 251, 87);
  f_pegar(R, f_capa(R, 'tele', () => f_teleFijo(R)));
  // el resplandor de la tele, que cambia de color: sobre la pared, el mueble y la tarima (tramado)
  if (enc) { const fase = Math.floor(t * 0.8) % 3, col = [hex('#5ac8a8'), hex('#f0e090'), hex('#6aa8e0')][fase], f = 0.75 + 0.25 * Math.sin(t * 7);
    for (let y = 20; y <= 110; y++) for (let x = 12; x <= 164; x++) { if (x >= 24 && x <= 152 && y >= 28 && y <= 104) continue; const d = Math.max(24 - x, x - 152, 28 - y, y - 104); if (d < 9 && f_b4(x, y) < (0.42 - d * 0.045) * f && R.pget(x, y) !== F.k) pset(x, y, f_mez(R.pget(x, y), col, 0.45)); }
    for (let y = 142; y <= 172; y++) for (let x = 24; x <= 150; x++) { const a = (1 - (y - 142) / 34) * (1 - Math.abs(x - 88) / 70); if (a > 0 && f_b4(x, y) < a * 0.5 * f) pset(x, y, f_mez(R.pget(x, y), col, 0.4)); } }
  // el reflejo del cristal de la ventana
  for (let j = 0; j < 50; j += 3) { const x = 240 - Math.round(j * 0.5), y = 33 + j; if (x !== 223 && x !== 224 && x !== 225 && y !== 58 && y !== 59) pset(x, y, hex('#c8a8c8')); }
  // la lámpara de la mesilla: su halo tramado, con un parpadeo leve, y dos polillas
  { const f = Math.sin(t * 11) > 0.95 ? 0.8 : 1; for (let y = 86; y <= 122; y++) for (let x = 284; x <= 319; x++) { const d = Math.hypot(x - 308, (y - 104) * 1.1); if (d < 22 && d > 8 && f_b4(x, y) < (0.5 - d * 0.022) * f && R.pget(x, y) !== F.k) pset(x, y, hex('#f8e8b0')); }
    for (let k = 0; k < 2; k++) { const a = t * (2.3 + k) + k * 3; pset(Math.round(308 + Math.cos(a) * (9 + k * 3)), Math.round(100 + Math.sin(a * 1.3) * 7), F.blanco); } }
  // los pilotos: la consola, el router (tres que parpadean) y la barra de sonido
  pset(40, 109, Math.sin(t * 2) > -0.5 ? hex('#5ac8f0') : hex('#2a5a7a')); for (let k = 0; k < 3; k++) pset(131 + k * 3, 109, h(k, Math.floor(t * (5 + k)), 164) < 0.6 ? hex('#3ad06a') : hex('#1e5a32')); pset(66, 110, hex('#f0a040'));
  motas(R, t, 30, 150, 104, 126, 6, hex('#8ad8c8'));
  return { suelo: 158, sueloMin: 150, sueloMax: 166, tele: [29, 33, 147, 99], ventana: [197, 31, 251, 87], mueble: [30, 112, 146, 140], sofa: { x0: 206, x1: 280, asiento: 127, pies: 146, respaldo: 103 }, lampara: [308, 104], portatil: [128, 104, 192, 144], mesita: { x0: 112, x1: 208, y: 150 }, libre: [[30, 110, 158], [212, 290, 162]] };
}

// por delante en el salón: la mesita baja con el portátil de la subasta (sin letras: nuestro libro en su ficha, la cifra
// en dólares que sube con o.precio 0–1 hasta pasar de mil, la flecha verde, la gráfica de pujas que crece, el reloj con su
// barra que se agota y el botón que late), un cuenco de palomitas, el mando y una taza
function f_teleDelante(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, p = f_cl(o.precio ?? 0), x0 = 128, y0 = 104, x1 = 192, y1 = 144;
  // la mesita: tablero de cristal sobre patas de madera, y su sombra en la alfombra
  for (let x = 106; x <= 216; x++) if (x % 2) pset(x, 171, hex('#2a3a5a'));
  rect(108, 149, 212, 153, F.k); rect(109, 150, 211, 150, hex('#d8ecf2')); rect(109, 151, 211, 152, hex('#9ac0d0')); for (let x = 112; x < 210; x += 9) pset(x, 151, hex('#d8ecf2'));
  for (const x of [112, 204]) { rect(x, 154, x + 4, 169, F.k); rect(x + 1, 154, x + 2, 168, hex('#a8845a')); rect(x + 3, 154, x + 3, 168, hex('#6a4e30')); } rect(117, 160, 203, 161, hex('#6a4e30')); rect(117, 160, 203, 160, hex('#a8845a'));
  // el portátil: la base con el teclado, la bisagra y la pantalla
  poligono([[x0 - 6, 149], [x1 + 6, 149], [x1 + 2, 145], [x0 - 2, 145]], F.k); poligono([[x0 - 4, 148], [x1 + 4, 148], [x1 + 1, 146], [x0 - 1, 146]], hex('#b4b8c4')); for (let x = x0 + 2; x < x1 - 1; x += 3) { pset(x, 147, hex('#6a6e7a')); } rect(x0 + 24, 148, x0 + 40, 148, hex('#8a8e9a'));
  rect(x0 - 3, y0 - 3, x1 + 3, y1 + 1, F.k); rect(x0 - 2, y0 - 2, x1 + 2, y1, hex('#c8ccd8')); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, F.blanco); rect(x0 - 1, y0 - 1, x1 + 1, y1 - 1, F.k); rect(x0, y0, x1, y1 - 2, hex('#f4f4f0')); pset(x0 + 32, y0 - 2, hex('#3a3c48'));
  // la página: la barra de arriba con tres puntos, la ficha del libro, la gráfica, la cifra y el botón
  rect(x0, y0, x1, y0 + 4, hex('#3e5a8a')); for (let k = 0; k < 3; k++) pset(x0 + 2 + k * 3, y0 + 2, [F.rojoL, F.oroL, F.verdeL][k]); rect(x0 + 14, y0 + 1, x1 - 12, y0 + 3, hex('#e8ecf4')); pset(x1 - 3, y0 + 2, F.blanco); pset(x1 - 5, y0 + 2, F.blanco);
  rect(x0 + 2, y0 + 7, x0 + 30, y0 + 25, hex('#c8ccd8')); rect(x0 + 3, y0 + 8, x0 + 29, y0 + 24, hex('#e4ecf4')); PIEZAS_CF.libro?.(R, x0 + 16, y0 + 23, {}); if (Math.sin(t * 3) > 0.7) { pset(x0 + 26, y0 + 10, F.oroL); pset(x0 + 27, y0 + 9, F.oroL); pset(x0 + 25, y0 + 9, F.oroL); pset(x0 + 26, y0 + 8, F.oroL); }
  { const gx = x0 + 34, gy = y0 + 25, n = 9; rect(gx - 1, y0 + 7, gx - 1, gy, hex('#8a8e9a')); rect(gx - 1, gy, x1 - 2, gy, hex('#8a8e9a')); for (let k = 0; k < n; k++) { const v = f_cl(p * 1.25 - k * 0.03) * ((k + 1) / n) ** 1.8, a = 1 + Math.round(v * 15 + (k === n - 1 ? Math.abs(Math.sin(t * 6)) * 1.5 * p : 0)); rect(gx + 1 + k * 3, gy - a, gx + 2 + k * 3, gy - 1, k === n - 1 ? F.verde : hex('#6aa8e0')); pset(gx + 1 + k * 3, gy - a, k === n - 1 ? F.verdeL : hex('#a8d0f0')); } }
  const precio = Math.round(lerp(35, 1250, p * p * (3 - 2 * p)) / 5) * 5 + (p > 0 && p < 1 ? Math.floor(t * 9) % 5 : 0), sube = p > 0.02 && p < 1;
  R.numero('$' + precio, x0 + 2, y0 + 37, { rampa: p >= 1 ? [F.k, F.k, F.verdeS, F.verdeS, F.verde, F.verde, F.verdeL, F.verdeL] : [F.k, F.k, hex('#20233a'), hex('#20233a'), hex('#3e5a8a'), hex('#3e5a8a'), hex('#3e5a8a'), hex('#3e5a8a')] });
  if (sube || p >= 1) { const ay = y0 + 30 - (sube ? Math.floor(t * 5) % 3 : 0); poligono([[x1 - 14, ay + 4], [x1 - 10, ay], [x1 - 6, ay + 4]], F.verde); rect(x1 - 11, ay + 4, x1 - 9, ay + 7, F.verde); }
  rect(x0 + 2, y1 - 4, x0 + 2 + Math.round((x1 - x0 - 4) * (p >= 1 ? 0 : 1 - p * 0.9)), y1 - 3, p > 0.7 ? F.rojo : F.oro); 
  // el brillo de la pantalla y su luz sobre el cristal de la mesa
  for (let j = 0; j < 12; j++) pset(x1 - 2 - j, y0 + 6 + j, hex('#ffffff')); for (let x = x0; x <= x1; x += 2) pset(x, 151, hex('#f4f4f0'));
  // el cuenco de palomitas (alguna salta), el mando y la taza
  { const bx = 108, by = 149; for (const [dx, dy, k] of [[-6, -9, 0], [-1, -11, 1], [4, -10, 2], [8, -8, 3], [-3, -8, 4], [2, -8, 5]]) { disco(bx + dx, by + dy, 2, k % 2 ? hex('#fff6d8') : hex('#f4dc9a')); pset(bx + dx, by + dy - 1, F.blanco); }
    { const u = (t * 0.7) % 1; if (u < 0.5) { const s = Math.sin(u * 2 * Math.PI) * 9; disco(bx + 2 + Math.round(u * 8), Math.round(by - 11 - s), 1, hex('#fff6d8')); } }
    poligono([[bx - 11, by - 8], [bx + 12, by - 8], [bx + 8, by], [bx - 7, by]], F.k); poligono([[bx - 9, by - 7], [bx + 10, by - 7], [bx + 7, by - 1], [bx - 6, by - 1]], hex('#c8423a')); for (let i = -6; i < 9; i += 4) linea(bx + i, by - 7, bx + Math.round(i * 0.75), by - 1, F.blanco); }
  rect(196, 146, 208, 149, F.k); rect(197, 147, 207, 148, hex('#3a3c48')); pset(199, 147, F.rojo); pset(202, 147, hex('#8a8e9a')); pset(205, 147, hex('#8a8e9a'));
  return { portatil: [x0, y0, x1, y1], precio };
}

// un roble grande: el tronco con su corteza y sus ramas, y la copa en cuatro tonos (la luz arriba a la izquierda), con
// huecos de cielo en el borde y barbas de musgo colgando; (x, y) el pie del tronco, r el radio de la copa, k la semilla
function f_roble(R, x, y, r, k) {
  const { rect, pset, disco, linea } = R, alto = Math.round(r * 1.5);
  for (let j = 0; j <= alto; j++) { const w = Math.round(3 + (j < 4 ? (4 - j) * 0.8 : 0) + (alto - j) * 0.03), yy = y - j; rect(x - w, yy, x + w, yy, F.robleD); rect(x - w + 1, yy, x + w - 2, yy, hex('#6e5238')); rect(x - w + 1, yy, x - w + 1, yy, hex('#9a7a56')); if (h(j, k, 171) < 0.4) pset(x - w + 2 + Math.floor(h(j, k, 172) * (w * 2 - 3)), yy, F.robleD); }
  linea(x - 2, y - alto + 8, x - Math.round(r * 0.6), y - alto - 2, F.robleD); linea(x + 2, y - alto + 10, x + Math.round(r * 0.7), y - alto, F.robleD); linea(x + 1, y - alto + 9, x + Math.round(r * 0.7), y - alto - 1, hex('#6e5238'));
  const cy = y - alto - Math.round(r * 0.35), B = []; for (let i = 0; i < 11; i++) { const a = i / 11 * Math.PI * 2 + h(i, k, 173), d = r * (0.25 + h(i, k, 174) * 0.5); B.push([x + Math.cos(a) * d * 1.25, cy + Math.sin(a) * d * 0.7, r * (0.42 + h(i, k, 175) * 0.2)]); } B.push([x, cy, r * 0.6]);
  const den = (px, py) => { for (const [bx, by, br] of B) if ((px - bx) ** 2 + (py - by) ** 2 < br * br) return true; return false; };
  for (let py = Math.floor(cy - r * 1.2); py <= cy + r * 1.1; py++) for (let px = Math.floor(x - r * 1.7); px <= x + r * 1.7; px++) { if (!den(px, py)) continue; const borde = !den(px - 1, py) || !den(px + 1, py) || !den(px, py - 1) || !den(px, py + 1);
    const luz = (x - px) * 0.5 + (cy - py) * 1.1, n = h(px >> 1, py >> 1, 176 + k), n2 = h(px, py, 177 + k); let c = luz > r * 0.55 ? F.hojaL : luz > r * 0.05 ? F.hoja : luz > -r * 0.5 ? F.hojaS : F.hojaD;
    if (n < 0.22) c = c === F.hojaL ? F.hoja : c === F.hoja ? F.hojaS : F.hojaD; else if (n > 0.86) c = c === F.hojaD ? F.hojaS : c === F.hojaS ? F.hoja : c === F.hoja ? F.hojaL : F.hojaC;
    if (borde) c = !den(px, py + 1) || !den(px + 1, py) ? F.hojaD : F.k; if (n2 < 0.012 && !borde) c = F.hojaC; pset(px, py, c); }
  for (let i = 0; i < 7; i++) { const mx = Math.round(x - r * 1.1 + i * r * 0.36), l = 4 + Math.floor(h(i, k, 178) * 8); let my = cy; while (den(mx, my + 1) && my < cy + r * 1.2) my++; for (let j = 1; j < l; j++) pset(mx, my + j, j % 2 ? hex('#9aa88a') : hex('#7a8a72')); }
}

// los colores de las copas y los troncos (de día o teñidos de noche), para saber qué tapa a lo que pasa por detrás
const f_hojasC = {};

function f_hojas(noche) { const k = noche ? 'n' : 'd'; if (!f_hojasC[k]) f_hojasC[k] = new Set([F.hoja, F.hojaL, F.hojaS, F.hojaD, F.hojaC, F.robleD, hex('#6e5238'), hex('#9a7a56'), hex('#9aa88a'), hex('#7a8a72')].map((c) => (noche ? f_mez(c, hex('#141c48'), 0.58) : c))); return f_hojasC[k]; }

// la señal de «no excavar» (sin letras): disco blanco con aro rojo, una pala clara de pie (mango de madera, hoja de acero) y una sola barra roja en diagonal, en su
// poste, con una placa pequeña debajo (un papel con sello: hace falta permiso); (x, y) el pie del poste; r el radio
function f_senal(R, x, y, r = 13) {
  const { rect, pset, disco, linea } = R, cy = y - 34 - r;
  rect(x - 1, cy, x + 2, y, F.k); rect(x, cy, x, y - 1, hex('#8a8e9a')); rect(x + 1, cy, x + 1, y - 1, hex('#5a5e6a')); rect(x - 3, y, x + 5, y, F.cespedD);
  disco(x + 2, cy + 2, r + 1, hex('#3a5a32')); disco(x, cy, r + 1, F.k); disco(x, cy, r, F.rojo); disco(x, cy, r - 3, F.blanco);
  for (let a = 3.4; a < 5; a += 0.05) pset(Math.round(x + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), F.rojoL);
  // la pala, de pie y clara (perfil negro, mango de madera y hoja de acero con su brillo): el puño en T, el mango y la hoja
  rect(x - 4, cy - 9, x + 3, cy - 6, F.k); rect(x - 3, cy - 8, x + 2, cy - 7, F.robleC); rect(x - 3, cy - 8, x + 2, cy - 8, F.robleL);
  rect(x - 2, cy - 6, x + 1, cy + 1, F.k); rect(x - 1, cy - 6, x, cy + 1, F.robleC); rect(x - 1, cy - 6, x - 1, cy + 1, F.robleL);
  R.poligono([[x - 5, cy], [x + 4, cy], [x + 4, cy + 5], [x, cy + 9], [x - 1, cy + 9], [x - 5, cy + 5]], F.k); R.poligono([[x - 4, cy + 1], [x + 3, cy + 1], [x + 3, cy + 5], [x, cy + 8], [x - 1, cy + 8], [x - 4, cy + 5]], hex('#8a8e9a'));
  rect(x - 3, cy + 1, x - 2, cy + 4, hex('#c8ccd4')); pset(x - 2, cy + 5, hex('#c8ccd4')); rect(x + 2, cy + 2, x + 2, cy + 5, hex('#5a5e6a'));
  // la única diagonal: la barra roja de prohibición, de aro a aro (de arriba a la izquierda a abajo a la derecha), por encima
  for (let i = -8; i <= 8; i++) { rect(x + i - 1, cy + i, x + i + 1, cy + i, F.rojo); pset(x + i, cy + i - 1, F.rojo); pset(x + i, cy + i + 1, F.rojo); } for (let i = -7; i <= 7; i++) pset(x + i + 1, cy + i - 1, F.rojoL);
  // la placa: un papel con su sello y dos renglones (sin letras)
  rect(x - 9, cy + r + 4, x + 10, cy + r + 15, F.k); rect(x - 8, cy + r + 5, x + 9, cy + r + 14, F.blanco); rect(x - 8, cy + r + 13, x + 9, cy + r + 14, hex('#c8ccd4')); rect(x - 6, cy + r + 7, x - 1, cy + r + 12, F.papelS); rect(x - 5, cy + r + 8, x - 2, cy + r + 8, F.k); rect(x - 5, cy + r + 10, x - 3, cy + r + 10, F.k); disco(x + 5, cy + r + 9, 2, F.rojo); pset(x + 5, cy + r + 9, F.rojoL); pset(x - 9, cy + r + 5, hex('#8a8e9a')); pset(x + 10, cy + r + 5, hex('#8a8e9a'));
}
// la capa fija del parque: la bahía, la muralla de ladrillo del fuerte con su albardilla, sus troneras y su poterna, el
// talud de hierba, los robles, el césped a franjas con tréboles y flores, el sendero que va a la poterna, el cañón en su
// cureña con sus balas, el banco, la farola, la papelera y la señal. El cielo queda hueco
function f_parqueFijo(R) {
  const { rect, pset, disco, linea, poligono } = R;
  // la bahía al fondo y la otra orilla
  for (let y = 78; y <= 88; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 80 ? (h(x >> 2, 1, 181) < 0.6 ? hex('#6a9a8a') : hex('#8ab4a0')) : (x + y * 3) % 7 === 0 ? F.aguaL : y < 83 ? F.agua3 : F.agua2);
  // la muralla del fuerte, de ladrillo: hiladas con juntas, manchas de humedad, luz arriba y sombra al pie
  const mx0 = 118, my0 = 56, my1 = 104;
  for (let y = my0; y <= my1; y++) for (let x = mx0; x < 320; x++) { const f = (y - my0) >> 2, junta = (y - my0) % 4 === 3 || (x + (f & 1) * 5) % 10 === 0, n = h(Math.floor((x + (f & 1) * 5) / 10), f, 182);
    let c = junta ? F.junta : n < 0.2 ? F.ladrilloS : n > 0.82 ? F.ladrilloL : F.ladrillo; if (h(x >> 3, y >> 3, 183) < 0.18 && !junta) c = F.ladrilloS; if (y > my1 - 6 && f_b4(x, y) < (y - my1 + 7) / 9) c = junta ? F.ladrilloS : F.ladrilloD; if (y < my0 + 3 && !junta) c = F.ladrilloL; pset(x, y, c); }
  rect(mx0 - 2, my0 - 5, 319, my0 - 1, F.k); rect(mx0 - 1, my0 - 4, 319, my0 - 2, hex('#d8d4c8')); rect(mx0 - 1, my0 - 4, 319, my0 - 4, F.blanco); rect(mx0 - 1, my0 - 1, 319, my0 - 1, hex('#8a867a')); rect(mx0, my0, mx0, my1, F.k); rect(mx0 + 1, my0, mx0 + 2, my1, F.ladrilloL);
  for (let x = mx0 + 14; x < 320; x += 37) { if (x > 236 && x < 280) continue; rect(x - 1, my0 + 9, x + 12, my0 + 25, F.ladrilloD); for (let i = 0; i <= 11; i++) { const a = Math.round(Math.sqrt(1 - ((i - 5.5) / 6) ** 2) * 5); rect(x + i, my0 + 15 - a, x + i, my0 + 24, hex('#2a1a16')); } rect(x, my0 + 24, x + 11, my0 + 25, hex('#d8d4c8')); rect(x + 2, my0 + 20, x + 9, my0 + 21, hex('#3a3a42')); pset(x + 9, my0 + 20, hex('#6a6a72')); }
  // la poterna: arco de piedra, la reja y el túnel oscuro
  { const gx = 258; for (let i = -13; i <= 13; i++) { const a = Math.round(Math.sqrt(1 - (i / 13.5) ** 2) * 12); rect(gx + i, my1 - 22 - a, gx + i, my1, hex('#d8d4c8')); } for (let i = -9; i <= 9; i++) { const a = Math.round(Math.sqrt(1 - (i / 9.5) ** 2) * 9); rect(gx + i, my1 - 21 - a, gx + i, my1, hex('#1e1416')); if (i % 3 === 0) rect(gx + i, my1 - 21 - a, gx + i, my1 - 12, hex('#4a4a52')); }
    rect(gx - 9, my1 - 12, gx + 9, my1 - 12, hex('#4a4a52')); for (let k = -12; k <= 12; k += 6) pset(gx + k, my1 - 24 - Math.round(Math.sqrt(Math.max(0, 1 - (k / 13.5) ** 2)) * 8), hex('#8a867a')); rect(gx - 1, my1 - 37, gx + 1, my1 - 33, hex('#eeeadc')); }
  // el talud de hierba al pie de la muralla y el césped a franjas
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = 104 + Math.round(Math.sin(x * 0.05) * 2 + (x < 118 ? -8 - Math.sin(x * 0.03) * 3 : 0)); if (y < borde) continue;
    const franja = Math.floor((x + (y - 100) * 1.4) / (14 + (y - 100) * 0.35)) & 1, n = h(x, y, 184); let c = franja ? F.cesped : hex('#6cb44e'); if (y - borde < 3) c = F.cespedS; else if (n < 0.1) c = F.cespedL; else if (n > 0.9) c = F.cespedS; else if (h(x >> 2, y >> 1, 185) < 0.08) c = F.cespedD; pset(x, y, c); }
  // tréboles, margaritas y dientes de león
  for (let n = 0; n < 70; n++) { const x = Math.floor(h(n, 1, 186) * 320), y = 112 + Math.floor(h(n, 2, 186) * 66), tp = n % 4; if (tp === 0) { pset(x, y, F.blanco); pset(x - 1, y, F.blanco); pset(x + 1, y, F.blanco); pset(x, y - 1, F.blanco); pset(x, y, F.oro); } else if (tp === 1) { pset(x, y, F.oro); pset(x, y + 1, F.cespedD); } else if (tp === 2) { pset(x, y, F.cespedD); pset(x + 1, y - 1, F.cespedD); pset(x - 1, y - 1, F.cespedD); } else { pset(x, y, hex('#e88ab0')); pset(x, y + 1, F.cespedD); } }
  // el sendero de tierra clara: cruza por delante y sube en curva hasta la poterna; bordes de ladrillo y guijarros
  const senda = (x, y) => { if (y >= 150 && y <= 170) return true; if (y < 150 && y >= 104) { const u = (150 - y) / 46, cx = 196 + u * 62 - Math.sin(u * Math.PI) * 16, w = 15 - u * 8; return Math.abs(x - cx) < w; } return false; };
  for (let y = 104; y <= 171; y++) for (let x = 0; x < 320; x++) if (senda(x, y)) { const borde = !senda(x - 1, y) || !senda(x + 1, y) || !senda(x, y - 1) || !senda(x, y + 1), n = h(x, y, 187); pset(x, y, borde ? ((x + y) % 4 < 2 ? F.ladrilloS : F.ladrillo) : n < 0.1 ? F.sendaS : n > 0.88 ? F.sendaL : h(x >> 2, y >> 1, 188) < 0.12 ? F.sendaS : F.senda); }
  for (const [x, y] of [[30, 158], [88, 165], [150, 156], [214, 163], [268, 158], [300, 166], [226, 132], [246, 116]]) { rect(x, y, x + 2, y, hex('#9a8e7a')); pset(x + 1, y - 1, hex('#c8bca0')); }
  // los robles de la izquierda (uno lejos, otro cerca) y un arbusto con flores
  f_roble(R, 104, 112, 15, 3); f_roble(R, 44, 132, 27, 1);
  for (let i = -12; i <= 12; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0 && Math.abs(i) < 12 - j) pset(44 + i + j * 2, 133 + j, F.cespedD);
  // el banco de madera y hierro, a la sombra del roble
  { const bx = 8, by = 146; rect(bx, by - 13, bx + 30, by - 12, F.k); for (const y of [by - 12, by - 9]) { rect(bx, y, bx + 30, y + 1, F.robleL); rect(bx, y + 2, bx + 30, y + 2, F.robleD); } rect(bx - 1, by - 6, bx + 31, by - 4, F.k); rect(bx, by - 6, bx + 30, by - 5, F.robleC); for (const x of [bx + 1, bx + 28]) { rect(x, by - 13, x + 1, by, hex('#2a2e36')); rect(x - 1, by - 7, x + 2, by - 7, hex('#2a2e36')); } for (let x = bx - 2; x < bx + 34; x += 2) pset(x, by + 1, F.cespedD); }
  // la farola de hierro (su luz va aparte) y la papelera
  { const fx = 88; rect(fx - 1, 112, fx + 1, 150, F.k); rect(fx, 112, fx, 149, hex('#3e4a44')); rect(fx - 3, 147, fx + 3, 150, F.k); rect(fx - 2, 148, fx + 2, 149, hex('#3e4a44')); rect(fx - 4, 102, fx + 4, 112, F.k); rect(fx - 3, 104, fx + 3, 110, hex('#f4f0d8')); rect(fx, 104, fx, 110, hex('#3e4a44')); poligono([[fx - 5, 102], [fx + 5, 102], [fx, 97]], F.k); pset(fx, 96, F.k); rect(fx - 4, 151, fx + 6, 151, F.cespedD);
    rect(68, 139, 77, 150, F.k); rect(69, 140, 76, 149, hex('#3e6a4a')); for (let x = 70; x < 76; x += 2) rect(x, 141, x, 148, hex('#2a4a32')); rect(67, 138, 78, 139, F.k); rect(68, 138, 77, 138, hex('#5a8a66')); rect(68, 151, 79, 151, F.cespedD); }
  // el cañón antiguo en su cureña de madera, sobre una losa, con su pirámide de balas
  { const cx = 150, cy = 126; rect(cx - 30, cy, cx + 30, cy + 3, F.k); rect(cx - 29, cy, cx + 29, cy + 1, hex('#d8d4c8')); rect(cx - 29, cy + 2, cx + 29, cy + 2, hex('#8a867a')); for (let x = cx - 30; x < cx + 34; x += 2) pset(x, cy + 4, F.cespedD);
    poligono([[cx - 14, cy - 1], [cx - 10, cy - 12], [cx + 8, cy - 12], [cx + 12, cy - 1]], F.k); poligono([[cx - 12, cy - 2], [cx - 9, cy - 11], [cx + 7, cy - 11], [cx + 10, cy - 2]], F.roble); rect(cx - 9, cy - 11, cx + 7, cy - 11, F.robleC); rect(cx - 10, cy - 6, cx + 9, cy - 6, F.robleD);
    for (const wx of [cx - 9, cx + 7]) { disco(wx, cy - 4, 5, F.k); disco(wx, cy - 4, 4, F.robleS); disco(wx, cy - 4, 1, hex('#3a3a42')); for (let a = 0; a < 6.3; a += 0.785) pset(Math.round(wx + Math.cos(a) * 3), Math.round(cy - 4 + Math.sin(a) * 3), F.robleC); }
    poligono([[cx - 20, cy - 13], [cx - 18, cy - 20], [cx + 24, cy - 24], [cx + 25, cy - 16]], F.k); poligono([[cx - 18, cy - 14], [cx - 17, cy - 19], [cx + 23, cy - 23], [cx + 23, cy - 17]], hex('#3a4a44')); linea(cx - 17, cy - 19, cx + 23, cy - 23, hex('#6a8a7a')); linea(cx - 16, cy - 15, cx + 22, cy - 18, hex('#24302c')); rect(cx + 24, cy - 25, cx + 26, cy - 15, F.k); pset(cx + 25, cy - 20, hex('#6a8a7a')); disco(cx - 21, cy - 16, 2, F.k); rect(cx - 2, cy - 22, cx - 1, cy - 15, hex('#24302c')); rect(cx + 10, cy - 23, cx + 11, cy - 16, hex('#24302c'));
    for (const [bx, by] of [[cx + 20, cy - 1], [cx + 25, cy - 1], [cx + 30, cy - 1], [cx + 22, cy - 5], [cx + 27, cy - 5], [cx + 25, cy - 9]]) { disco(bx, by - 1, 2, F.k); pset(bx - 1, by - 2, hex('#6a6e7a')); } }
  // dos parches de tierra recién removida (alguien ya cavó aquí) y el pie del aspersor
  for (const [px, py, w] of [[196, 141, 9], [286, 128, 7]]) for (let j = -3; j <= 3; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / 3.4) ** 2 < 1) pset(px + i, py + j, h(px + i, py + j, 195) < 0.3 ? F.tierraL : j > 1 ? F.tierra1 : F.tierra0);
  rect(299, 139, 301, 142, F.k); pset(300, 140, hex('#8a8e9a')); pset(300, 138, F.k);
  // la señal de no excavar, bien visible junto al sendero
  f_senal(R, 124, 152, 13);
  // matas de hierba alta al borde del sendero
  for (let n = 0; n < 40; n++) { const x = Math.floor(h(n, 3, 189) * 320), y = n % 2 ? 149 : 172; if (Math.abs(x - 124) < 6) continue; linea(x, y, x - 1, y - 3, F.cespedD); linea(x + 1, y, x + 1, y - 4, F.cespedS); pset(x + 2, y - 2, F.cespedL); }
  for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) if (h(x, y, 190) < 0.08) pset(x, y, F.cespedD);
}

// el parque público de hoy, de día o de noche (cámara 'general'). Ver la cabecera de hoy()
function f_parque(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, noche = !!o.noche;
  if (noche) { f_degradado(R, 0, 0, 319, 99, ['#0c1238', '#121a4a', '#1a245c', '#26306c', '#34407c', '#465490'].map(hex), null, 1.1);
    for (let k = 0; k < 46; k++) { const x = Math.floor(h(k, 1, 191) * 320), y = Math.floor(h(k, 2, 191) * 74), b = Math.sin(t * (1 + (k % 5) * 0.5) + k); if ((y < 16 && x > 16 && x < 174) || (x > 272 && y < 48)) continue; if (b > -0.3) pset(x, y, b > 0.6 ? hex('#f4f0ff') : hex('#8a8ac0')); }
    // el polvo de estrellas tenues (fijas), cinco luceros que titilan en cruz, una estrella fugaz de vez en cuando y dos
    // murciélagos que salen de detrás de la muralla y cruzan (todo por debajo de la barra del año y fuera de la esquina de Atom)
    for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 3, 196) * 320), y = 16 + Math.floor(h(k, 4, 196) * 70); if (x > 270 && y < 50) continue; pset(x, y, k % 3 ? hex('#5a64a4') : hex('#7a80b8')); }
    for (const [x, y, k] of [[196, 26, 0], [236, 44, 1], [262, 22, 2], [60, 30, 3], [120, 52, 4]]) { const b = Math.sin(t * (2.2 + k * 0.4) + k * 2); pset(x, y, hex('#f4f0ff')); if (b > 0) { pset(x - 1, y, hex('#8a8ac0')); pset(x + 1, y, hex('#8a8ac0')); pset(x, y - 1, hex('#8a8ac0')); pset(x, y + 1, hex('#8a8ac0')); } if (b > 0.75) { pset(x - 2, y, hex('#5a64a4')); pset(x + 2, y, hex('#5a64a4')); pset(x, y - 2, hex('#5a64a4')); pset(x, y + 2, hex('#5a64a4')); } }
    R.halo(176, 38, 22, [hex('#26306c'), hex('#34407c'), hex('#5a68a0')], 1); disco(176, 38, 9, hex('#f4f0d8')); disco(173, 35, 2, hex('#d8d4bc')); disco(179, 41, 1, hex('#d8d4bc')); pset(175, 42, hex('#d8d4bc'));
    for (const [x0, y, w, v, k] of [[40, 40, 50, 1.2, 0], [200, 58, 40, 0.8, 1], [300, 50, 46, 1.6, 2]]) f_nube(R, Math.round(((x0 + t * v) % 420) - 50), y, w, k + 50, [hex('#4a5890'), hex('#34407c'), hex('#26306c'), hex('#1a245c')]);
    { const u = (t * 0.09 + 0.25) % 1, n = Math.floor(t * 0.09 + 0.25); if (u < 0.035) { const q = u / 0.035, x = Math.round(230 + h(n, 1, 197) * 32 - q * 36), y = Math.round(20 + h(n, 2, 197) * 8 + q * 14); for (let i = 0; i < 9; i++) pset(x + i, y - Math.round(i * 0.35), i < 2 ? hex('#f4f0ff') : i < 5 ? hex('#8a8ac0') : hex('#5a64a4')); } }
    for (let k = 0; k < 2; k++) { const u = (t * (0.11 + k * 0.04) + k * 0.45) % 1, bx = Math.round(330 - u * 350), by = 34 + k * 9 + Math.round(Math.sin(t * 2.6 + k * 2) * 4) + Math.max(0, Math.round((bx - 236) * 0.6)), a = Math.sin(t * 13 + k) > 0 ? 1 : -1, c = hex('#0a0e2a'); pset(bx, by, c); pset(bx - 1, by, c); pset(bx + 1, by, c); pset(bx - 2, by - a, c); pset(bx + 2, by - a, c); pset(bx - 3, by - a, c); pset(bx + 3, by - a, c); } }
  else { f_cielo(R, t, 0, 0, 319, 99, { calma: true, capas: [[0.66, 0.5, 2.2, 5, 0], [0.44, 0.75, 4.5, 4, 1], [0.2, 1, 8, 4, 2]] });
    // una bandada lejana, gaviotas sobre la bahía y un velero que cruza
    bandada(R, t, { y: 34, n: 5, cada: 11, semilla: 4 }); for (let k = 0; k < 3; k++) { const u = ((t * (6 + k * 2) + k * 90) % 380), x = Math.round(u - 30), y = 62 + k * 5 + Math.round(Math.sin(t * 1.1 + k * 2) * 3); if (x < 116) f_pajaro(R, x, y, t, k + 3, F.blanco); } }
  f_pegar(R, f_capa(R, noche ? 'parque-noche' : 'parque', () => { f_parqueFijo(R); if (noche) { const b = R.buf, az = hex('#141c48'); for (let i = 0; i < 57600; i++) if (b[i] !== F_VACIO) b[i] = f_mez(b[i], az, 0.58); } }));
  // el velero por la bahía (se ve a la izquierda de la muralla; los robles lo tapan)
  const HOJAS = f_hojas(noche);
  { const u = (t * 2.2) % 150, x = Math.round(-10 + u); if (x < 112) { const A = noche ? hex('#8a8ab0') : F.blanco, vela = (px, py) => { const c = R.pget(px, py); if (c !== F.k && !HOJAS.has(c)) pset(px, py, A); }; for (let j = 0; j < 10; j++) for (let i = 0; i <= j >> 1; i++) vela(x + i, 73 + j); for (let i = -3; i <= 6; i++) { const c = R.pget(x + i, 83); if (!HOJAS.has(c) && c !== F.k) pset(x + i, 83, noche ? hex('#2a2e4a') : hex('#5a4a3a')); } } for (let k = 0; k < 6; k++) { const wx = (k * 23 + Math.floor(t * 3)) % 116; pset(wx, 84 + (k % 3), noche ? hex('#5a68a0') : F.aguaL); } }
  // la bandera en su mástil sobre la muralla (franjas y cantón, sin escudos), que ondea
  { const fx = 206; rect(fx, 22, fx + 1, 52, noche ? hex('#5a5e7a') : hex('#c8ccd4')); pset(fx, 21, F.oro); for (let i = 0; i < 20; i++) { const dy = Math.round(Math.sin(t * 4 - i * 0.5) * (i / 9)); for (let j = 0; j < 11; j++) { let c = j % 2 ? F.blanco : F.rojo; if (i < 8 && j < 6) c = (i + j) % 2 ? hex('#3e5a9a') : hex('#2a3e7a'); if (noche) c = f_mez(c, hex('#141c48'), 0.5); pset(fx + 2 + i, 24 + j + dy, c); } } }
  // paseantes diminutos al pie de la muralla: van y vienen por detrás del cañón (tapados por los árboles y la señal)
  for (const [v, k, col] of noche ? [] : [[5, 0, '#c8423a'], [-3.4, 1, '#3a5a9a'], [7.5, 2, '#e8c040']]) { const an = 136, x = Math.round(182 + ((((t * v + k * 50) % an) + an) % an)), y = 108, p = Math.floor(t * (k === 2 ? 8 : 4) + k) % 2; if (x > 244 && x < 272) continue;
    rect(x, y - 6, x + 1, y - 2, hex(col)); pset(x, y - 7, hex('#f0c8a0')); pset(x + 1, y - 7, hex('#f0c8a0')); pset(x, y - 8, hex('#4a3020')); pset(x + 1, y - 8, hex('#4a3020')); pset(x - p + 1, y - 1, F.k); pset(x + p, y, F.k); }
  // una ardilla que corretea por el césped y se para a mirar; palomas que picotean en el sendero
  { const ciclo = (t * 0.22) % 1, corre = ciclo < 0.6, x = Math.round(44 + (corre ? ciclo / 0.6 : 1) * 16), y = 146 - (corre ? Math.abs(Math.round(Math.sin(t * 12) * 2)) : 0), M = noche ? hex('#3a2e3a') : hex('#b06a3a'); if (!noche) { rect(x, y - 3, x + 4, y - 1, M); pset(x + 5, y - 4, M); pset(x + 5, y - 3, M); pset(x + 6, y - 3, F.k); rect(x - 2, y - 6 + (corre ? 1 : 0), x - 1, y - 2, hex('#c88a52')); pset(x - 3, y - 6, hex('#c88a52')); pset(x + 1, y, F.k); pset(x + 4, y, F.k); } }
  for (const [px, py, k] of noche ? [] : [[176, 160, 0], [186, 164, 1], [286, 162, 2]]) { const pica = Math.sin(t * 5 + k * 2) > 0.4, x = px + Math.round(Math.sin(t * 0.4 + k) * 3); rect(x, py - 3, x + 3, py - 1, hex('#8a8e9a')); pset(x + 4, py - 2, hex('#6a6e7a')); pset(x + (pica ? 0 : 0), py - (pica ? 1 : 4), hex('#5a5e6a')); pset(x - 1, py - (pica ? 0 : 4), F.oro); pset(x + 1, py, F.rojoS); pset(x + 2, py, F.rojoS); }
  // el viento: las matas del borde que se mecen, hojas que caen del roble y dos mariposas
  for (let n = 0; n < 16; n++) { const x = 6 + n * 20 + Math.floor(h(n, 1, 192) * 8), y = 173 + (n % 3), m = Math.round(Math.sin(t * 2.2 + n) * 1.5); if (Math.abs(x - 124) < 8) continue; linea(x, y, x + m, y - 5, noche ? hex('#1e3a34') : F.cespedL); linea(x + 2, y, x + 2 + m, y - 4, noche ? hex('#16302c') : F.cespedS); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.13 + k * 0.27) % 1, x = Math.round(20 + h(k, 1, 193) * 50 + Math.sin(u * 9 + k) * 6 + u * 14), y = Math.round(92 + u * 56); pset(x, y, noche ? hex('#2a4a3a') : k % 2 ? F.oro : F.hojaL); pset(x + 1, y + (Math.sin(t * 6 + k) > 0 ? 1 : 0), noche ? hex('#2a4a3a') : F.hoja); }
  if (!noche) for (let k = 0; k < 2; k++) { const a = t * (0.9 + k * 0.3) + k * 3, bx = Math.round(230 + k * 40 + Math.cos(a) * 16), by = Math.round(138 + Math.sin(a * 1.6) * 7), al = Math.sin(t * 15 + k) > 0; pset(bx, by, F.k); pset(bx - 1, by - (al ? 1 : 0), k ? F.blanco : F.oro); pset(bx + 1, by - (al ? 1 : 0), k ? F.blanco : F.oro); }
  // el aspersor del césped: un abanico de gotas que va y viene
  if (!noche) { const a0 = -1.57 + Math.sin(t * 1.3) * 0.9; for (let k = 0; k < 14; k++) { const u = ((t * 1.8 + k / 14) % 1), a = a0 + (k % 3 - 1) * 0.08, r = u * 26; pset(Math.round(300 + Math.cos(a) * r), Math.round(138 + Math.sin(a) * r * 0.8 + u * u * 14), k % 2 ? F.aguaL : F.blanco); } }
  // de noche: la farola encendida con su cono tramado, luciérnagas y la poterna con un farol
  if (noche) { const f = Math.sin(t * 13) > 0.93 ? 0.7 : 1; rect(85, 104, 91, 110, hex('#fff6c8')); rect(88, 104, 88, 110, hex('#f8d27a'));
    for (let y = 96; y <= 168; y++) for (let x = 48; x <= 130; x++) { const d = Math.hypot(x - 88, (y - 108) * 0.75); if (d < 40 && f_b4(x, y) < (0.62 - d * 0.016) * f) { const c = R.pget(x, y); if (c !== F.k) pset(x, y, f_mez(c, hex('#f8e8a0'), 0.42)); } }
    for (let k = 0; k < 10; k++) if (Math.sin(t * 2 + k * 1.7) > 0.1) pset(Math.round(150 + h(k, 1, 194) * 160 + Math.sin(t * 0.6 + k) * 5), Math.round(112 + h(k, 2, 194) * 50 + Math.cos(t * 0.8 + k) * 4), hex('#d8f080'));
    // dos troneras con luz de candil dentro (tiembla) y su resplandor en el alféizar
    for (const [wx, k] of [[169, 0], [280, 1]]) { const fl = 0.75 + 0.25 * Math.sin(t * 9 + k * 2) * Math.sin(t * 3.7 + k); for (let i = 1; i <= 10; i++) { const a = Math.round(Math.sqrt(1 - ((i - 5.5) / 6) ** 2) * 5); for (let y = 72 - a; y <= 75; y++) pset(wx + i, y, f_b4(wx + i, y) < (y - 66) * 0.11 * fl - Math.abs(i - 5.5) * 0.06 ? hex('#f0b850') : y > 72 ? hex('#a86a2e') : hex('#6a4028')); } for (let i = 0; i <= 11; i++) pset(wx + i, 80, hex('#a89a78')); pset(wx + 5, 74 + (Math.sin(t * 11 + k) > 0 ? 0 : 1), hex('#fff6c8')); }
    pset(258, 76, hex('#f8d27a')); pset(258, 77, hex('#f8e8a0')); for (let k = 0; k < 14; k++) if (f_b4(251 + k, 90) < 0.5) pset(251 + k, 86 + (k % 4), hex('#6a5a3a')); }
  return { suelo: 160, sueloMin: 153, sueloMax: 168, senda: [150, 170], cesped: [112, 148], senal: { x: 124, pie: 152, centro: [124, 105], r: 13 }, canon: [150, 126], banco: { x0: 8, x1: 38, asiento: 141 }, farola: [88, 104], muralla: [118, 56, 319, 104], poterna: [258, 104], bandera: [206, 22], roble: [44, 132], hoyos: [[196, 141], [286, 128]], horizonte: 99, libre: [[140, 310, 160], [130, 230, 146]] };
}
// por delante en el parque: la valla baja de postes de madera con su cuerda (abajo del todo) y, a la izquierda, un macizo
// de flores que se mece
function f_parqueDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, noche = !!o.noche, q = (c) => (noche ? f_mez(c, hex('#141c48'), 0.58) : c);
  for (let x = 14; x < 320; x += 44) { rect(x - 2, 168, x + 3, 179, F.k); rect(x - 1, 169, x + 2, 179, q(F.roble)); rect(x - 1, 169, x - 1, 179, q(F.robleC)); rect(x - 1, 169, x + 2, 169, q(F.robleC)); pset(x + 1, 173, q(F.robleD)); pset(x, 176, q(F.robleD));
    if (x + 44 < 330) for (let i = 4; i < 42; i++) { const y = 172 + Math.round(Math.sin(i / 46 * Math.PI) * 4 + Math.sin(t * 1.5 + x) * 0.6); pset(x + i, y, q(hex('#d8c8a0'))); pset(x + i, y + 1, (i % 3) ? q(hex('#a8946a')) : F.k); } }
  for (let i = 0; i < 44; i++) { const y = 172 + Math.round(Math.sin((i + 14) / 46 * Math.PI) * 4); if (i < 12) { pset(i, y, q(hex('#d8c8a0'))); pset(i, y + 1, q(hex('#a8946a'))); } }
  for (let k = 0; k < 9; k++) { const x = 294 + (k % 5) * 6 - (k > 4 ? 3 : 0), m = Math.round(Math.sin(t * 1.8 + k) * 1.2), y = 166 - (k > 4 ? 5 : 0) - (k % 3); linea(x, 179, x + m, y, q(F.hojaS)); disco(x + m, y, 2, q([hex('#f08aa8'), hex('#f8d060'), F.blanco][k % 3])); pset(x + m, y, q(F.oro)); pset(x - 2, y + 6, q(F.hoja)); pset(x + 2, y + 9, q(F.hojaL)); }
  return {};
}

// un palmito: el tronco con sus anillos, que se curva un poco, y la copa de hojas en abanico que se mecen con el viento
// (más con o.viento); (x, y) el pie, al el alto
function f_palmito(R, x, y, al, t, k, viento = 0) {
  const { rect, pset, linea, disco } = R; let tx = x;
  for (let j = 0; j <= al; j++) { tx = x + Math.round(Math.sin(j / al * 1.6) * 4 * (k % 2 ? 1 : -1) + viento * (j / al) ** 2 * 5); const w = j < 3 ? 3 : 2; rect(tx - w, y - j, tx + w, y - j, F.k); rect(tx - w + 1, y - j, tx + w - 1, y - j, j % 3 === 0 ? hex('#6a5238') : hex('#9a7c56')); pset(tx - w + 1, y - j, hex('#c0a276')); }
  const cy = y - al; disco(tx, cy, 3, F.hojaD);
  for (let i = 0; i < 11; i++) { const a = -Math.PI * (0.02 + i / 10 * 0.96) + Math.sin(t * (1.6 + viento * 3) + i * 0.8 + k) * (0.07 + viento * 0.22) + viento * 0.35, l = 13 + (i % 3) * 3 + (k % 2) * 2;
    for (let j = 0; j <= l; j++) { const u = j / l, px = Math.round(tx + Math.cos(a) * j), py = Math.round(cy + Math.sin(a) * j + u * u * 9); pset(px, py, i % 2 ? F.hojaS : F.hoja); pset(px, py + 1, F.hojaD); if (j > 3 && j % 2 === 0) { pset(px, py + 2, i % 2 ? F.hojaD : F.hojaS); if (u > 0.4) pset(px + (Math.cos(a) > 0 ? -1 : 1), py + 3, F.hojaS); } if (j > l - 3) pset(px, py - 1, F.hojaL); } }
}

// el barco museo, de lejos: un portaaviones gris anclado, con el casco en tres tonos, la cubierta de vuelo en voladizo, la
// isla con su mástil y sus antenas, aviones aparcados diminutos, la línea de flotación roja y manchas de óxido (sin
// número ni letras); x0–x1 su eslora, ya la línea de agua
function f_barcoMuseo(R, x0, x1, ya) {
  const { rect, pset, linea, poligono, disco } = R, yc = ya - 20;
  poligono([[x0 + 10, ya], [x0, yc + 3], [x0 + 6, yc], [x1 - 2, yc], [x1, yc + 4], [x1 - 12, ya]], F.k);
  for (let y = yc + 1; y < ya; y++) { const u = (y - yc) / 20, a = Math.round(x0 + 2 + u * 9), b = Math.round(x1 - 1 - u * 11); for (let x = a; x <= b; x++) pset(x, y, y > ya - 3 ? F.rojoS : u < 0.25 ? F.cascoL : (x - a) < 14 ? F.cascoS : h(x >> 3, y >> 2, 201) < 0.2 ? F.cascoS : F.casco); }
  for (let x = x0 + 16; x < x1 - 14; x += 7) { pset(x, yc + 8, F.cascoD); pset(x + 1, yc + 8, F.cascoD); if (h(x, 1, 202) < 0.35) for (let j = 0; j < 5; j++) pset(x, yc + 9 + j, hex('#8a6a5a')); }
  for (let x = x0 + 30; x < x1 - 30; x += 22) { rect(x, yc + 4, x + 9, yc + 6, F.cascoD); rect(x + 1, yc + 5, x + 8, yc + 5, hex('#2a303c')); }
  // la cubierta de vuelo, en voladizo, y lo que hay encima
  rect(x0 - 4, yc - 3, x1 + 3, yc, F.k); rect(x0 - 3, yc - 2, x1 + 2, yc - 2, F.cascoL); rect(x0 - 3, yc - 1, x1 + 2, yc - 1, F.cascoS); for (let x = x0; x < x1; x += 5) pset(x, yc - 1, F.cascoD);
  for (const [ax, d] of [[x0 + 22, 1], [x0 + 40, 1], [x0 + 60, -1], [x1 - 34, -1]]) { rect(ax - 4, yc - 5, ax + 4, yc - 4, hex('#566070')); rect(ax - 1, yc - 6, ax + 1, yc - 3, hex('#667080')); pset(ax + d * 5, yc - 6, hex('#566070')); pset(ax + d * 5, yc - 7, hex('#566070')); pset(ax - d * 4, yc - 5, F.cascoL); }
  // la isla: puente, chimenea, mástil con crucetas y el radar (su giro va aparte)
  const ix = x0 + Math.round((x1 - x0) * 0.52); rect(ix, yc - 17, ix + 26, yc - 3, F.k); rect(ix + 1, yc - 16, ix + 25, yc - 4, F.casco); rect(ix + 1, yc - 16, ix + 25, yc - 16, F.cascoL); rect(ix + 20, yc - 15, ix + 25, yc - 4, F.cascoS); for (let x = ix + 3; x < ix + 19; x += 3) { pset(x, yc - 13, hex('#2a303c')); pset(x, yc - 9, hex('#2a303c')); }
  rect(ix + 5, yc - 24, ix + 16, yc - 17, F.k); rect(ix + 6, yc - 23, ix + 15, yc - 18, F.cascoL); rect(ix + 7, yc - 21, ix + 14, yc - 20, hex('#2a303c')); rect(ix + 17, yc - 22, ix + 23, yc - 17, F.k); rect(ix + 18, yc - 21, ix + 22, yc - 18, F.cascoD);
  rect(ix + 10, yc - 38, ix + 11, yc - 24, F.k); rect(ix + 6, yc - 33, ix + 15, yc - 33, F.k); rect(ix + 8, yc - 29, ix + 13, yc - 29, F.k); pset(ix + 6, yc - 34, F.k); pset(ix + 15, yc - 34, F.k);
  linea(ix + 11, yc - 37, x1 - 6, yc - 3, hex('#566070')); linea(ix + 10, yc - 37, x0 + 8, yc - 3, hex('#566070'));
  // el ancla, la pasarela de visitantes y su escalera hasta el muelle
  rect(x0 + 8, yc + 5, x0 + 9, yc + 9, F.cascoD); rect(x0 + 6, yc + 9, x0 + 11, yc + 9, F.cascoD);
  return { isla: [ix, yc - 17], mastil: [ix + 10, yc - 38], cubierta: yc - 3 };
}

// la capa fija del muelle: la otra orilla con su puente atirantado, el barco museo, la marisma con sus canales y su
// fango, el paseo de tablas con su barandilla de cuerda, el catalejo de monedas, el banco, la farola y el salvavidas.
// El cielo y el agua quedan huecos
function f_muelleFijo(R) {
  const { rect, pset, disco, linea, poligono } = R;
  // la otra orilla: arboleda baja y casitas
  for (let x = 0; x < 320; x++) { const a = Math.round(3 + 1.5 * Math.sin(x * 0.11) + 1.2 * Math.sin(x * 0.29 + 1)); rect(x, 92 - a, x, 92, hex('#5a8a80')); pset(x, 92 - a, hex('#7aa898')); } rect(0, 93, 319, 93, hex('#c8c0a0'));
  for (const [x, w] of [[8, 6], [22, 4], [300, 7]]) { rect(x, 88, x + w, 92, hex('#e8e0d0')); poligono([[x - 1, 88], [x + w + 1, 88], [x + (w >> 1), 85]], hex('#a8584a')); }
  // el puente atirantado, lejos: dos torres en rombo, el tablero y los tirantes en abanico
  { const P = hex('#8a9ab0'), PL = hex('#b4c0d0'); rect(0, 80, 118, 80, P); rect(0, 81, 118, 81, hex('#6e7e96')); for (const tx of [32, 84]) { linea(tx - 3, 92, tx, 58, P); linea(tx + 3, 92, tx, 58, P); linea(tx - 2, 80, tx + 2, 80, PL); pset(tx, 57, PL); for (let k = 1; k <= 6; k++) { linea(tx, 60 + k, tx - k * 4, 80, PL); linea(tx, 60 + k, tx + k * 4, 80, PL); } } for (let x = 4; x < 118; x += 12) rect(x, 82, x, 92, hex('#6e7e96')); }
  f_barcoMuseo(R, 126, 312, 104);
  // la marisma: la hierba de sal en matas, de tres tonos, con canales de agua (huecos) y orillas de fango
  for (let y = 112; y <= 141; y++) for (let x = 0; x < 320; x++) { const borde = 121 + Math.sin(x * 0.045) * 5 + Math.sin(x * 0.13 + 2) * 2 + (x > 120 && x < 250 ? 9 + Math.sin((x - 120) / 130 * Math.PI) * 7 : 0); if (y < borde) continue;
    const canal = Math.abs(y - (131 + Math.sin(x * 0.06 + 1) * 3)) < 1.2 && (x < 96 || x > 270); if (canal) continue; const n = h(x, y, 203), m = h(x >> 2, y >> 1, 204);
    pset(x, y, y - borde < 2 ? F.fango : m < 0.25 ? F.marismaS : m > 0.78 ? F.marismaL : n < 0.12 ? F.marismaD : n > 0.9 ? hex('#d0d078') : F.marisma); }
  // el paseo de tablas: la barandilla del fondo (postes y dos cuerdas), las tablas en perspectiva con clavos y huecos
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 142) / 1) , fila = y < 146 ? 0 : y < 151 ? 1 : y < 157 ? 2 : y < 164 ? 3 : y < 172 ? 4 : 5, y0 = [142, 146, 151, 157, 164, 172][fila], an = 22 + fila * 5, tb = Math.floor((x - 160) / an + 100 + fila * 0.5), xx = ((x - 160) % an + an * 100 + (fila % 2) * (an >> 1)) % an, n = h(tb, fila, 205);
    let c = y === y0 ? F.tablaD : xx === 0 ? F.tablaS : n < 0.25 ? F.tablaS : n > 0.8 ? F.tablaL : F.tabla; if (y === y0 + 1 && h(x >> 1, fila, 206) < 0.5) c = F.tablaL; if (h(x, y, 207) < 0.06) c = F.tablaS; if ((xx === 2 || xx === an - 2) && y === y0 + 2) c = F.tablaD; pset(x, y, c); }
  rect(0, 140, 319, 141, F.k); rect(0, 140, 319, 140, F.tablaL);
  for (let x = 6; x < 320; x += 52) { rect(x - 2, 124, x + 2, 141, F.k); rect(x - 1, 125, x + 1, 140, F.tabla); rect(x - 1, 125, x - 1, 140, F.tablaL); rect(x - 2, 123, x + 2, 124, F.k); rect(x - 1, 123, x + 1, 123, hex('#e8e0d0'));
    for (const yy of [128, 134]) for (let i = 3; i < 50; i++) { const y = yy + Math.round(Math.sin(i / 52 * Math.PI) * 3); if (x + i < 320) { pset(x + i, y, hex('#e0d4b0')); if (i % 3 === 0) pset(x + i, y + 1, hex('#8a7a5a')); } } }
  // el catalejo de monedas, el banco, la farola y el salvavidas en su poste
  { const cx = 250; rect(cx - 1, 128, cx + 1, 146, F.k); rect(cx, 128, cx, 145, hex('#8a9ab0')); rect(cx - 4, 146, cx + 4, 148, F.k); rect(cx - 3, 146, cx + 3, 147, hex('#6e7e96')); poligono([[cx - 8, 121], [cx + 6, 118], [cx + 8, 126], [cx - 6, 129]], F.k); poligono([[cx - 6, 122], [cx + 5, 120], [cx + 6, 125], [cx - 5, 127]], hex('#8a9ab0')); linea(cx - 6, 122, cx + 5, 120, hex('#d0dae6')); disco(cx - 7, 125, 2, F.k); pset(cx - 7, 125, hex('#8ac8e8')); pset(cx + 2, 124, F.oro); rect(cx - 6, 149, cx + 7, 149, F.tablaD); }
  { const bx = 276, by = 152; rect(bx, by - 14, bx + 34, by - 13, F.k); for (const y of [by - 13, by - 10]) { rect(bx, y, bx + 34, y + 1, hex('#3e7a7e')); rect(bx, y + 2, bx + 34, y + 2, hex('#2a5a62')); } rect(bx - 1, by - 7, bx + 35, by - 5, F.k); rect(bx, by - 7, bx + 34, by - 6, hex('#5a9a9a')); for (const x of [bx + 2, bx + 31]) { rect(x, by - 14, x + 1, by, hex('#2a2e36')); } rect(bx - 1, by + 1, bx + 37, by + 1, F.tablaD); }
  { const fx = 112; rect(fx - 1, 100, fx + 1, 146, F.k); rect(fx, 100, fx, 145, hex('#3e4a44')); rect(fx - 3, 144, fx + 3, 147, F.k); rect(fx - 4, 90, fx + 4, 100, F.k); rect(fx - 3, 92, fx + 3, 98, hex('#f4f0d8')); rect(fx, 92, fx, 98, hex('#3e4a44')); poligono([[fx - 5, 90], [fx + 5, 90], [fx, 85]], F.k); rect(fx - 4, 148, fx + 6, 148, F.tablaD);
    disco(fx, 122, 6, F.k); disco(fx, 122, 5, hex('#f08a3a')); disco(fx, 122, 2, F.k); disco(fx, 122, 1, F.marisma); rect(fx - 5, 121, fx - 3, 122, F.blanco); rect(fx + 3, 121, fx + 5, 122, F.blanco); rect(fx - 1, 117, fx, 119, F.blanco); rect(fx - 1, 125, fx, 127, F.blanco); }
}

// el muelle de Charleston, con el barco museo al fondo (cámara 'muelle'). Ver la cabecera de hoy()
function f_muelle(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, cam = f_cl(o.cambio ?? 0), tor = cam > 0 && cam < 1 ? Math.sin(cam * Math.PI) ** 0.7 : 0;
  f_cielo(R, t, 0, 0, 319, 94, { calma: true, tormenta: tor, capas: [[0.72, 0.5, 2.2 + tor * 8, 5, 0], [0.48, 0.8, 4.5 + tor * 14, 4, 1], [0.22, 1.05, 8 + tor * 22, 4, 2]] });
  // los nubarrones de la tormenta, que pasan de izquierda a derecha con el cambio, y el relámpago
  if (tor > 0) { const NB = [hex('#6a7284'), hex('#4a5266'), hex('#3a4254'), hex('#2a3040')]; for (let k = 0; k < 7; k++) { const cx = Math.round(-120 + cam * 520 + k * 46 - 140 + Math.sin(t * 0.4 + k) * 4), cy = 30 + (k % 3) * 14 + (k % 2) * 5; const an = 70 + (k % 3) * 16; if (cy < 50 && cx + an * 0.62 > 270 && cx - an * 0.62 < 319) continue; f_nube(R, cx, cy, an, k + 70, NB); }
    if (tor > 0.75 && (t * 1.3) % 1 < 0.1) { let x = 150 + Math.floor(h(Math.floor(t * 1.3), 1, 211) * 90), y = 34; for (let j = 0; j < 12; j++) { const nx = x + Math.round((h(j, Math.floor(t * 1.3), 212) - 0.5) * 8); linea(x, y, nx, y + 5, hex('#fff8c0')); x = nx; y += 5; } } }
  if (tor < 0.3) bandada(R, t, { y: 40, n: 4, cada: 12, semilla: 6 });
  // el agua de la bahía: degradado tramado, oleaje que corre (más picado con la tormenta) y los destellos del sol
  f_degradado(R, 0, 94, 319, 141, [F.agua3, F.agua2, F.agua1, F.agua0].map((c) => (tor > 0 ? f_mez(c, hex('#3a4a5e'), tor * 0.7) : c)), (x, y) => Math.sin(x * 0.05 + y * 0.4 + t * (0.8 + tor * 2)) * 0.35, 0.8);
  for (let k = 0; k < 60; k++) { const y = 96 + Math.floor(h(k, 1, 213) * 44), v = 4 + (y - 96) * 0.25 + tor * 14, x = Math.round(((h(k, 2, 213) * 340 + t * v) % 340) - 10), l = 2 + Math.floor((y - 96) / 9) + Math.round(tor * 2); if (Math.sin(t * 1.5 + k) > -0.4) { linea(x, y, x + l, y, tor > 0.4 ? hex('#a8b8c8') : F.aguaL); if (tor > 0.4) pset(x + 1, y - 1, F.blanco); } }
  // los edificios nuevos que crecen en la otra orilla con o.cambio (por detrás del puente y de la arboleda), con su grúa
  if (cam > 0) { const E = [[2, 16, 40, '#b8c4d0'], [20, 14, 52, '#9aa8ba'], [40, 20, 34, '#c8d0d8'], [62, 14, 46, '#a8b4c4'], [98, 18, 30, '#b8c4d0']]; E.forEach(([x, w, al, col], k) => { const g = f_cl((cam * 1.5 - 0.12 - k * 0.1) / 0.7), a = Math.round(al * g); if (a < 2) return; const yt = 92 - a, c = tor > 0 ? f_mez(hex(col), hex('#4a5266'), tor * 0.5) : hex(col);
      rect(x - 1, yt - 1, x + w, 92, F.k); rect(x, yt, x + w - 1, 92, c); rect(x, yt, x + 1, 92, f_mez(c, F.blanco, 0.4)); rect(x + w - 3, yt, x + w - 1, 92, f_mez(c, F.k, 0.25));
      for (let wy = yt + 3; wy < 90; wy += 4) for (let wx = x + 3; wx < x + w - 3; wx += 3) pset(wx, wy, tor > 0.3 && h(wx, wy, 214) < 0.5 ? hex('#f8d27a') : hex('#5a7a9a'));
      if (g < 1) { for (let wx = x; wx < x + w; wx += 3) rect(wx, yt - 3, wx, yt - 1, hex('#e8a040')); const gx = x + (w >> 1), gy = yt - 16, a2 = Math.sin(t * 0.7 + k) * 0.5; rect(gx, gy, gx, yt - 1, hex('#e8a040')); linea(gx - Math.round(Math.cos(a2) * 6), gy, gx + Math.round(Math.cos(a2) * 13), gy, hex('#e8a040')); pset(gx + Math.round(Math.cos(a2) * 10), gy + 1 + Math.round(Math.abs(Math.sin(t)) * 3), F.k); }
      else if (k % 2 === 0) { rect(x + 2, yt - 3, x + 4, yt - 1, F.k); if (Math.sin(t * 3 + k) > 0) pset(x + 3, yt - 4, F.rojo); } }); }
  // un velero y una lancha taxi que cruzan por delante del barco
  { const u = (t * 2.6 + 40) % 380, x = Math.round(u - 30), y = 110; poligono([[x, y - 1], [x, y - 13], [x + 7, y - 1]], F.blanco); poligono([[x - 1, y - 2], [x - 1, y - 10], [x - 5, y - 2]], hex('#e8e0d0')); poligono([[x - 7, y], [x + 9, y], [x + 7, y + 2], [x - 5, y + 2]], hex('#a8423e')); pset(x, y - 14, F.rojo); for (let i = 1; i < 6; i++) pset(x - 8 - i * 2, y + 2 + (i % 2), F.aguaL); }
  { const u = (t * 7 + 200) % 420, x = Math.round(350 - u), y = 122; rect(x, y - 3, x + 13, y, F.k); rect(x + 1, y - 2, x + 12, y - 1, hex('#f0c030')); rect(x + 4, y - 6, x + 10, y - 3, F.k); rect(x + 5, y - 5, x + 9, y - 4, hex('#8ac8e8')); for (let i = 1; i < 8; i++) { pset(x + 14 + i * 2, y + (i % 2), F.blanco); pset(x + 15 + i * 2, y + 1, F.aguaL); } }
  f_pegar(R, f_capa(R, 'muelle', () => f_muelleFijo(R)));
  if (tor > 0) { const b = R.buf, g = hex('#3a4254'), a = tor * 0.38; for (let i = 94 * 320; i < 57600; i++) b[i] = f_mez(b[i], g, a); }
  // el reflejo del casco en el agua (tramado, tiembla), el radar que gira, las banderas de señales y la gente en cubierta
  for (let y = 105; y <= 113; y++) for (let x = 138; x <= 300; x++) { const xx = x + Math.round(Math.sin(y * 1.3 + t * 2.5) * 1.5); if (f_b4(xx, y) < 0.5 - (y - 105) * 0.05 && R.pget(x, y) !== F.blanco) pset(x, y, tor > 0.3 ? hex('#4a5666') : hex('#5a7890')); }
  { const mx = 233, my = 46 + 0, a = t * 2.2, w = Math.round(Math.cos(a) * 5); rect(mx - Math.abs(w), my, mx + Math.abs(w), my + 1, F.k); if (w > 0) pset(mx + w, my, F.cascoL); pset(mx + 1, my - 2, Math.sin(t * 3) > 0 ? F.rojo : F.rojoS);
    const COL = [F.rojo, F.oro, hex('#3e5a9a'), F.blanco, F.verde]; for (let i = 2; i < 30; i += 3) { const u = i / 32, x = Math.round(234 + u * 72), y = Math.round(48 + u * 33) + Math.round(Math.sin(t * (5 + tor * 8) + i) * (0.7 + tor)); rect(x, y, x + 1, y + 2, COL[i % 5]); }
    for (let i = 2; i < 30; i += 3) { const u = i / 32, x = Math.round(232 - u * 96), y = Math.round(48 + u * 33) + Math.round(Math.sin(t * (5 + tor * 8) + i * 2) * (0.7 + tor)); rect(x, y, x + 1, y + 2, COL[(i + 2) % 5]); } }
  if (tor < 0.4) for (const [v, k, col] of [[3, 0, '#c8423a'], [-2.2, 1, '#e8c040'], [4.1, 2, '#3a8a5a'], [-3.3, 3, '#e8e0d0']]) { const an = 150, x = Math.round(140 + ((((t * v + k * 47) % an) + an) % an)), y = 80, p = Math.floor(t * 4 + k) % 2; if (x > 220 && x < 252) continue; rect(x, y - 4, x, y - 2, hex(col)); pset(x, y - 5, hex('#f0c8a0')); pset(x + p - 0, y - 1, F.k); }
  // la garza blanca de la marisma, que pesca: baja la cabeza de vez en cuando; y la hierba de sal que se mece
  { const gx = 60, gy = 132, pica = (t % 5.5) > 4.6; rect(gx, gy - 12, gx, gy, hex('#2a2e36')); rect(gx + 3, gy - 11, gx + 3, gy, hex('#2a2e36')); poligono([[gx - 4, gy - 13], [gx + 6, gy - 14], [gx + 7, gy - 18], [gx - 1, gy - 19]], F.blanco); pset(gx - 5, gy - 14, hex('#d0d4dc'));
    if (pica) { linea(gx + 6, gy - 18, gx + 11, gy - 13, F.blanco); linea(gx + 7, gy - 18, gx + 12, gy - 13, F.blanco); pset(gx + 13, gy - 11, F.oro); pset(gx + 12, gy - 12, F.oro); pset(gx + 14, gy - 10, F.aguaL); }
    else { linea(gx + 6, gy - 18, gx + 7, gy - 26, F.blanco); linea(gx + 7, gy - 18, gx + 8, gy - 26, F.blanco); rect(gx + 7, gy - 28, gx + 9, gy - 26, F.blanco); rect(gx + 10, gy - 27, gx + 12, gy - 27, F.oro); pset(gx + 9, gy - 28, F.k); } }
  for (let n = 0; n < 54; n++) { const x = Math.floor(h(n, 1, 215) * 320), y = 126 + Math.floor(h(n, 2, 215) * 14), m = Math.round(Math.sin(t * (1.8 + tor * 4) + n * 0.7) * (1 + tor * 2) + tor * 2); if (x > 126 && x < 246 && y < 138) continue; if (Math.abs(x - 60) < 8) continue; linea(x, y, x + m, y - 5, n % 3 ? F.marismaL : hex('#d0d078')); pset(x + 1, y - 1, F.marismaS); }
  // los palmitos, que se doblan con el viento, y la luz de la farola con la tormenta
  f_palmito(R, 9, 150, 62, t, 0, tor); f_palmito(R, 304, 148, 44, t, 1, tor);
  if (tor > 0.4) { rect(109, 92, 115, 98, hex('#fff6c8')); for (let y = 86; y <= 150; y++) for (let x = 84; x <= 140; x++) { const d = Math.hypot(x - 112, (y - 96) * 0.7); if (d < 30 && f_b4(x, y) < 0.5 - d * 0.017) { const c = R.pget(x, y); if (c !== F.k) pset(x, y, f_mez(c, hex('#f8e8a0'), 0.4)); } } }
  // las gaviotas: una posada en la barandilla que mira a los lados y otras dos que planean
  { const gx = 162, gy = 123, mira = Math.floor(t * 0.7) % 2 ? 1 : -1; rect(gx - 3, gy - 4, gx + 3, gy - 1, F.blanco); rect(gx - 4, gy - 3, gx - 1, gy - 2, hex('#8a9ab0')); rect(gx + mira * 2, gy - 7, gx + mira * 2 + 1, gy - 5, F.blanco); pset(gx + mira * 4, gy - 6, F.oro); pset(gx + mira * 2 + (mira > 0 ? 1 : 0), gy - 7, F.k); pset(gx - 1, gy, F.oro); pset(gx + 1, gy, F.oro); }
  if (tor < 0.5) for (let k = 0; k < 2; k++) { const a = t * (0.35 + k * 0.1) + k * 2.4, x = Math.round(190 + k * 50 + Math.cos(a) * 40), y = Math.round(58 + k * 8 + Math.sin(a * 2) * 6); if (x > 270 && y < 48) continue; f_pajaro(R, x, y, t * 0.5, k, F.blanco); pset(x, y + 1, hex('#8a9ab0')); }
  // la lluvia de la tormenta: rachas inclinadas por todo el cuadro y salpicaduras en las tablas
  if (tor > 0.15) { const n = Math.round(tor * 150); for (let k = 0; k < n; k++) { const x = Math.floor((h(k, 1, 216) * 380 + t * 60) % 380) - 30, y = Math.floor((h(k, 2, 216) * 200 + t * (210 + (k % 5) * 20)) % 190); if (y < 16 && x > 16 && x < 174) continue; if (x > 274 && y < 48) continue; pset(x, y, hex('#c8d4e4')); pset(x - 1, y + 1, hex('#c8d4e4')); if (k % 2) pset(x - 1, y + 2, hex('#8a9ab8')); }
    for (let k = 0; k < 12; k++) { const u = (t * 3 + k * 0.37) % 1, x = Math.floor(h(k, Math.floor(t * 3 + k * 0.37), 217) * 320), y = 146 + Math.floor(h(k, 3, 217) * 30); if (u < 0.4) { pset(x - 1 - Math.round(u * 4), y - Math.round(u * 5), hex('#c8d4e4')); pset(x + 1 + Math.round(u * 4), y - Math.round(u * 5), hex('#c8d4e4')); } } }
  return { suelo: 160, sueloMin: 150, sueloMax: 170, horizonte: 93, agua: [94, 141], barco: { x0: 126, x1: 312, agua: 104, cubierta: 81, isla: [223, 67], mastil: [233, 46] }, puente: [0, 58, 118, 92], edificios: [0, 40, 118, 92], barandilla: 140, catalejo: [250, 148], banco: { x0: 276, x1: 310, asiento: 146 }, farola: [112, 92], palmitos: [[9, 150], [304, 148]], garza: [60, 132], tormenta: tor, libre: [[40, 240, 160]] };
}

// por delante en el muelle: los pilotes del borde de acá con su cuerda gruesa y, sobre el de la izquierda, un pelícano
// que se acicala y abre el pico
function f_muelleDelante(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, cam = f_cl(o.cambio ?? 0), tor = cam > 0 && cam < 1 ? Math.sin(cam * Math.PI) ** 0.7 : 0, q = (c) => (tor > 0 ? f_mez(c, hex('#3a4254'), tor * 0.38) : c);
  for (const x of [26, 132, 238]) { rect(x - 5, 162, x + 5, 179, F.k); rect(x - 4, 163, x + 4, 179, q(F.tablaS)); rect(x - 4, 163, x - 3, 179, q(F.tablaL)); rect(x + 3, 163, x + 4, 179, q(F.tablaD)); rect(x - 5, 160, x + 5, 162, F.k); rect(x - 4, 160, x + 4, 161, q(hex('#e8e0d0'))); for (let y = 166; y < 180; y += 5) pset(x - 1 + (y % 2), y, q(F.tablaD));
    for (let i = 6; i < 100; i++) { const y = 167 + Math.round(Math.sin(i / 106 * Math.PI) * 6 + Math.sin(t * 1.4 + x) * 0.6); if (x + i < 320) { rect(x + i, y, x + i, y + 1, q(hex('#e0d4b0'))); pset(x + i, y + 2, i % 4 === 0 ? F.k : q(hex('#8a7a5a'))); } } }
  for (let i = 0; i < 21; i++) { const y = 167 + Math.round(Math.sin((i + 80) / 106 * Math.PI) * 6); rect(i, y, i, y + 1, q(hex('#e0d4b0'))); pset(i, y + 2, q(hex('#8a7a5a'))); }
  // el pelícano
  { const px = 26, py = 160, ab = (t % 6) > 5 ? 2 : 0, ac = (t % 6) < 1.2; rect(px - 6, py - 10, px + 5, py - 2, F.k); rect(px - 5, py - 9, px + 4, py - 3, q(hex('#8a7a6a'))); rect(px - 5, py - 9, px + 2, py - 8, q(hex('#b0a090'))); rect(px - 7, py - 7, px - 5, py - 4, q(hex('#6a5a4a'))); pset(px - 2, py - 1, q(F.oro)); pset(px + 2, py - 1, q(F.oro));
    if (ac) { rect(px + 1, py - 14, px + 4, py - 9, F.k); rect(px + 2, py - 13, px + 3, py - 10, q(F.blanco)); linea(px + 1, py - 12, px - 3, py - 7, q(hex('#e8a040'))); }
    else { rect(px + 2, py - 18, px + 6, py - 9, F.k); rect(px + 3, py - 17, px + 5, py - 10, q(F.blanco)); pset(px + 5, py - 16, F.k); rect(px + 3, py - 18, px + 5, py - 18, q(hex('#f8e080'))); linea(px + 6, py - 15, px + 14, py - 12, F.k); linea(px + 6, py - 14, px + 13, py - 12, q(hex('#e8a040'))); poligono([[px + 6, py - 13], [px + 13, py - 11], [px + 8, py - 9 + ab]], q(hex('#f0c070'))); } }
  return {};
}

// el fondo de la fosa antigua en la columna x: el hueco que alguien cavó y volvió a tapar en 1981 (un cuenco ancho bajo
// el hoyo de hoy, de x 130 a x 282); dentro, la tierra está revuelta y es donde aparecen los trozos; fuera, 0
function e_fosa(x) { const u = Math.abs(x - 206) / 76; return u >= 1 ? 0 : 129 + 50 * (1 - u ** 2.6) ** 0.385 + 1.5 * Math.sin(x * 0.21); }

// la superficie de la tierra de la maceta en la columna x (ondula un poco): la comparten la capa fija y el relleno del hoyo
const f_macSup = (x) => F_MAC.tierra + Math.round(Math.sin(x * 0.21) * 1.2 + Math.sin(x * 0.07 + 1) * 1.5);

// el programa de aventuras de la tele (genérico, sin logos ni letras), recortado a la pantalla [x0, y0, x1, y1]: la selva
// de noche en tres términos que se deslizan, la puerta de un templo con una espiral, un explorador (f_explorador, de unos
// 19 px: se lee desde el sofá) que avanza con su linterna (el haz tramado barre las piedras), murciélagos, luciérnagas y
// la mosca del canal
// las filas del explorador de la tele (11 × 16, mira a la derecha) y sus dos pasos (3 filas de piernas)
const F_EXP = ['...hhhh....', '..hhhhhH...', '..hhhhHH...', 'hhhhhhhhHH.', '..ssssss...', '..ssssks...', '..ssssss...', '...ssss....', '.mmcccc....', 'mmmccccc...', 'mmMcccccsgy', 'mmMcccc....', '.MMccCC....', '..bbbbb....', '..ttttt....', '..ttTtt....'];

const F_EXP_PASO = [['.tt..tt....', '.tt...tt...', '.zz...zzz..'], ['..tttt.....', '...ttt.....', '...zzzz....']];

const F_EXP_COL = { h: hex('#f0e4b0'), H: hex('#c0aa70'), s: hex('#f0c8a0'), k: hex('#1a1420'), c: hex('#e8e0d0'), C: hex('#b8b0a0'), m: hex('#c8503a'), M: hex('#8a3028'), b: hex('#5a3a1e'), t: hex('#9a8a5a'), T: hex('#6a5c3c'), z: hex('#4a2e1c'), g: hex('#9aa0aa'), y: hex('#fff8c0') };

// el explorador genérico del programa de la tele (sin logos ni rasgos de nadie): salacot claro, camisa clara, mochila
// roja y la linterna en la mano tendida, con su perfil oscuro para que no se pierda en la selva; (ex, ey) los pies,
// p (0 o 1) el paso. La linterna queda en (ex + 5, ey − 8). Todo con pset: respeta el recorte de la pantalla
function f_explorador(R, ex, ey, p) {
  const filas = [...F_EXP, ...F_EXP_PASO[p ? 1 : 0]], x0 = ex - 5, y0 = ey - filas.length + 1, K = hex('#061412');
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] !== '.') for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x0 + i + dx, y0 + j + dy, K); });
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] !== '.') R.pset(x0 + i, y0 + j, F_EXP_COL[f[i]]); });
}

// el color c con la luz del atardecer (la misma mezcla que c_atardece), para lo que se pinta en vivo sobre lo fijo ya teñido
const c_TINTES = new Map();

function c_tarde(c) { let v = c_TINTES.get(c); if (v === undefined) { v = c_mez(c_mez(c, hex('#ff8a4a'), 0.2), hex('#2a1a4a'), 0.14); c_TINTES.set(c, v); } return v; }

// un R que tiñe con la luz de la tarde todo lo que pinta (pset, rect, linea y disco): para la gente pequeña, las palomas,
// las flores, los bancos, los árboles y los coches que se dibujan en vivo cuando o.hora es 'tarde'
const c_VIVOS = new WeakMap();

function c_vivo(R) {
  let v = c_VIVOS.get(R); if (v) return v;
  v = Object.create(R);
  const pon = (k, f) => Object.defineProperty(v, k, { value: f, writable: true, configurable: true });
  pon('pset', (x, y, c) => R.pset(x, y, c_tarde(c))); pon('rect', (x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c_tarde(c)));
  pon('linea', (x0, y0, x1, y1, c, ...r) => R.linea(x0, y0, x1, y1, c_tarde(c), ...r)); pon('disco', (x, y, r, c) => R.disco(x, y, r, c_tarde(c)));
  c_VIVOS.set(R, v); return v;
}

// la nota de la banderola: una corchea gruesa de 9 × 13
const c_NOTA3 = ['...##....', '...###...', '...####..', '...##.##.', '...##..##', '...##..##', '...##..#.', '...##....', '...##....', '.####....', '#####....', '#####....', '.###.....'];

// la banderola de la farola de la sala: azul noche con ribete de oro y una corchea dorada grande (como los medallones),
// con cola de golondrina; cuelga del brazo en (x, y) y ondea por filas con t (la nota ondea con la tela)
function c_banderola(R, t, x, y) {
  const K = c_K, az = hex('#243a8a'), azS = hex('#182a66'), azL = hex('#3a56b0'), w = 13, alto = 30, m = (j) => Math.round(Math.sin(t * 2.2 + j * 0.28) * (j / 24));
  for (let j = 0; j < alto; j++) { const dx = m(j), pl = Math.sin(t * 2.2 + j * 0.28 + 1.2);
    for (let i = 0; i < w; i++) { if (j >= alto - 4 && Math.abs(i - 6) <= j - (alto - 5)) continue;   // la cola de golondrina
      const borde = i === 0 || i === w - 1 || j === 0 || (j >= alto - 5 && Math.abs(i - 6) === j - (alto - 6)) || (j === alto - 6 && i === 6);
      R.pset(x + i + dx, y + j, borde ? K.k : i === 1 || i === w - 2 || j === 1 ? K.oro : pl > 0.55 && i < 6 ? azL : pl < -0.55 || i > 9 ? azS : az); } }
  c_NOTA3.forEach((f, j) => { const dx = m(j + 7); for (let i = 0; i < f.length; i++) if (f[i] === '#') { R.pset(x + 2 + i + dx, y + 7 + j, K.amarilloL); if (f[i + 1] !== '#') R.pset(x + 3 + i + dx, y + 7 + j, K.k); } });
  for (const gx of [x + 2, x + w - 3]) { R.pset(gx, y - 1, K.oro); }   // las anillas del brazo
}

// los tonos de la grava rastrillada y de la sombra sobre ella, las nubes bajas del horizonte y el ciruelo de hoja roja
const d_G0B = hex('#cdbd98'), d_GS = hex('#a8966e'), d_NUBL = ['#b4d6f0', '#dcecf8', '#f6fbff'].map(hex), d_CIR = ['#5a2a44', '#7e3a58', '#a8527a', '#d488a8'].map(hex);

// las copas del plano general del jardín, de atrás adelante: [cx, cy, r, tonos, semilla, flor]; tonos = [sombra,
// cuerpo, luz, brillo]. Las usan d_jardinFijo (para pintarlas) y d_jardin (para el viento que corre por ellas)
const d_ARB = (() => { const P = d_P, V = [P.v0, P.v1, P.v2, P.v3], J = [P.vj0, P.vj1, P.vj2, P.vj3], RO = [P.r0, P.r1, P.r2, P.r3], BL = [P.b0, P.b1, P.b2, P.b2];
  return [[56, 56, 8, V, 11], [108, 55, 8, BL, 12, [P.r2, P.b2]], [146, 57, 8, V, 13], [184, 54, 9, d_CIR, 14], [238, 55, 8, RO, 15, [P.r3, P.b2]],
    [90, 51, 11, V, 1], [126, 46, 13, RO, 3, [P.r3, P.b2, P.r0]], [163, 43, 16, J, 2], [200, 48, 11, BL, 4, [P.r2, P.b2]], [222, 47, 12, J, 5],
    [6, 58, 12, J, 6], [34, 54, 11, RO, 7, [P.r3, P.b2, P.r0]], [288, 62, 11, V, 8], [314, 64, 10, RO, 9, [P.r3, P.b2, P.r0]]]; })();

// una copa con más oficio que d_copa: contorno oscuro, cuatro tonos con la luz arriba a la izquierda, hojas sueltas
// (claras en la parte iluminada, oscuras en la sombra) y, con flor (lista de colores), motas de flor
function d_copa2(R, cx, cy, r, c, sem, flor = null) {
  const cO = d_mez(c[0], d_P.k, 0.38), L = [], n = 6 + Math.round(r / 2.5), mios = new Set([cO, c[0], c[1], c[2]]), pg = (x, y) => (x < 0 || x > 319 || y < 0 || y > 179 ? 0 : R.pget(x, y));
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + h(i, sem, 31), d = r * (0.4 + 0.3 * h(i, sem, 32)); L.push([cx + Math.cos(a) * d * 1.15, cy + Math.sin(a) * d * 0.78, r * (0.4 + 0.2 * h(i, sem, 33))]); }
  L.push([cx, cy, r * 0.62]);
  for (const [x, y, q] of L) R.disco(Math.round(x), Math.round(y + 1), Math.round(q) + 1, cO);
  for (const [x, y, q] of L) R.disco(Math.round(x), Math.round(y), Math.round(q), c[0]);
  for (const [x, y, q] of L) R.disco(Math.round(x - q * 0.2), Math.round(y - q * 0.25), Math.round(q * 0.78), c[1]);
  for (const [x, y, q] of L) R.disco(Math.round(x - q * 0.42), Math.round(y - q * 0.48), Math.round(q * 0.42), c[2]);
  for (let k = 0; k < r * 7; k++) { const a = h(k, sem, 34) * 6.283, d = Math.sqrt(h(k, sem, 35)) * r * 1.15, x = Math.round(cx + Math.cos(a) * d * 1.15), y = Math.round(cy + Math.sin(a) * d * 0.85), luz = -(Math.cos(a) + Math.sin(a)) * 0.7;
    if (!mios.has(pg(x, y))) continue;
    if (luz > 0.3) { R.pset(x, y, c[3]); if (k % 2 && mios.has(pg(x + 1, y))) R.pset(x + 1, y, c[3]); } else if (luz < -0.3) R.pset(x, y, k % 3 ? cO : c[1]); else R.pset(x, y, k % 2 ? c[0] : c[2]); }
  if (flor) for (let k = 0; k < r * 3; k++) { const a = h(k, sem, 134) * 6.283, d = Math.sqrt(h(k, sem, 135)) * r, x = Math.round(cx + Math.cos(a) * d * 1.1), y = Math.round(cy + Math.sin(a) * d * 0.8); if (mios.has(pg(x, y)) || pg(x, y) === c[3]) R.pset(x, y, flor[k % flor.length]); }
}

// los relieves pequeños de los medallones del plano general (7 de ancho), en el mismo orden que los del muro de
// cerca: el filósofo de perfil, la lira y la paleta de pintor
const d_RELMINI = [['..###..', '.#####.', '.#####.', '#####..', '.####..', '..###..', '.#####.', '#######'], ['#.....#', '#.....#', '#######', '#.#.#.#', '#.#.#.#', '.##.##.', '..###..', '.#####.'], ['..####.', '.######', '###.###', '#######', '####...', '.###...']];

// un medallón pequeño (radio 7) que se lee de lejos: el aro claro con su sombra, el campo hundido y oscuro y la
// figura k (0 filósofo, 1 lira, 2 paleta) en claro
function d_medallonMini(R, cx, cy, k) {
  const P = d_P, hondo = hex('#6e6658'), hondoS = hex('#544c40'), g = d_RELMINI[k % 3];
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j), luz = -(i + j) / (d + 0.01);
    if (d > 7.5) { if (Math.hypot(i - 1, j - 1) <= 7.6) R.pset(cx + i, cy + j, P.m4); continue; }
    R.pset(cx + i, cy + j, d > 6.4 ? (luz > 0.3 ? P.bl : luz < -0.3 ? P.m3 : P.m2) : d > 5.4 ? (luz > 0.2 ? P.m2 : luz < -0.4 ? P.m1 : P.m0) : d > 4.6 ? (luz > 0 ? hondoS : P.m3) : hondo); }
  const x0 = cx - (k % 3 === 2 ? 4 : 3), y0 = cy - (g.length >> 1);
  g.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') { const arr = j === 0 || g[j - 1][i] !== '#', izq = i === 0 || f[i - 1] !== '#'; R.pset(x0 + i, y0 + j, arr || izq ? P.bl : P.m2); } });
  if (k % 3 === 2) { for (let i = 0; i <= 5; i++) { R.pset(cx + i + 1, cy + 1 - i, hondoS); R.pset(cx + i, cy + 1 - i, P.bl); } R.pset(cx + 5, cy - 5, P.m4); }   // el pincel, en diagonal, que asoma sobre el aro
}

// el césped de abajo con vida (fijo): la sombra de los parterres, corros de trébol, matas, dientes de león, pétalos
// caídos, la regadera junto al parterre de la izquierda y la manguera con el aspersor y su corro mojado a la derecha
function d_cespedVida(R) {
  const { rect, pset } = R, P = d_P, agua = (x, y) => y >= 139 && y <= 177 && x >= 104 - (y - 142) * 0.45 - 3 && x <= 216 + (y - 142) * 0.45 + 3;
  const en = (x, y) => y >= 152 && y <= 178 && x >= 0 && x <= 319 && (x < 104 - (y - 142) * 0.45 - 15 || x > 216 + (y - 142) * 0.45 + 15);
  for (const [x0, x1] of [[14, 84], [236, 306]]) for (let x = x0; x <= x1 + 5; x++) { pset(x, 151, P.cD); if (d_um(x, 152) < 0.5) pset(x, 152, P.cS); }
  for (let j = -6; j <= 6; j++) for (let i = -19; i <= 19; i++) { const e = (i / 19) ** 2 + (j / 6) ** 2, x = 271 + i, y = 169 + j; if (e <= 1 && en(x, y) && d_um(x, y) < 0.62 - e * 0.4) pset(x, y, e < 0.4 && (x + y) % 3 === 0 ? P.cD : P.cS); }   // el corro mojado
  for (const [cx, cy, rx, ry] of [[30, 160, 7, 2], [58, 173, 8, 3], [72, 163, 5, 2], [42, 176, 6, 2], [20, 156, 5, 2], [250, 158, 6, 2], [296, 157, 7, 2], [256, 176, 7, 2], [300, 172, 6, 2]]) {
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2, x = cx + i, y = cy + j; if (e <= 1 && en(x, y) && d_um(x, y) < 0.7 - e * 0.3) pset(x, y, h(x, y, 171) < 0.25 ? P.cD : P.cS); }
    if (en(cx - 2, cy)) pset(cx - 2, cy, P.f3); if (en(cx + 3, cy - 1)) pset(cx + 3, cy - 1, P.f3); if (en(cx + 1, cy + 1)) pset(cx + 1, cy + 1, P.r2); }
  for (let k = 0; k < 44; k++) { const x = Math.round(h(k, 1, 172) * 319), y = 154 + Math.round(h(k, 2, 172) * 24); if (!en(x - 1, y) || !en(x + 1, y)) continue; pset(x, y, P.cD); pset(x, y - 1, P.cS); pset(x - 1, y - 1, P.cL); pset(x + 1, y - 1, P.cS); pset(x + 1, y - 2, P.cL); if (k % 3 === 0) pset(x - 1, y - 2, P.vj3); }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 3, 173) * 319), y = 156 + Math.round(h(k, 4, 173) * 21); if (!en(x, y) || !en(x + 1, y)) continue; pset(x, y, P.cD); pset(x, y - 1, P.v1);
    if (k % 3) { pset(x, y - 2, P.f1); pset(x + 1, y - 2, P.oro); } else { pset(x, y - 2, P.bl); pset(x + 1, y - 3, P.m2); pset(x - 1, y - 3, P.bl); } }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 5, 174) * 319), y = 136 + Math.round(h(k, 6, 174) * 43); if (agua(x, y)) continue; pset(x, y, k % 3 ? P.r2 : P.r3); if (k % 5 === 0) pset(x + 1, y, P.r1); }
  // la regadera
  rect(74, 151, 81, 157, P.k); rect(75, 152, 80, 156, P.gr0); rect(75, 152, 75, 156, P.gr2); rect(80, 152, 80, 156, P.gr1); rect(75, 154, 80, 154, P.gr1); R.linea(82, 154, 85, 151, P.k); R.linea(82, 153, 85, 150, P.gr0); pset(86, 149, P.gr2); pset(86, 150, P.k); pset(85, 149, P.k);
  pset(73, 152, P.k); pset(72, 153, P.k); pset(72, 154, P.k); pset(72, 155, P.k); pset(73, 156, P.k); rect(74, 158, 83, 158, P.cD);
  // la manguera, que entra por la derecha, y la base del aspersor
  for (let x = 273; x < 320; x++) { const y = 169 + Math.round(Math.sin(x * 0.23) * 1.6 + (x - 273) * 0.07); pset(x, y + 1, P.cD); pset(x, y, P.lamS); if (x % 4 < 2) pset(x, y - 1, P.lam); }
  rect(268, 168, 274, 170, P.k); rect(269, 168, 273, 169, P.gr1); rect(269, 168, 273, 168, P.gr2);
}

// el aspersor del césped (x, y = su base): dos chorros opuestos que giran, con gotas que brillan al caer
function d_aspersor(R, t, x, y) {
  const P = d_P, a = t * 1.8;
  for (let s = 0; s < 2; s++) { const ca = Math.cos(a + s * Math.PI), sa = Math.sin(a + s * Math.PI);
    for (let i = 1; i <= 13; i++) { const u = i / 13, px = Math.round(x + ca * u * 19), py = Math.round(y - 3 - Math.sin(u * Math.PI) * 7 + sa * u * 4); if ((i + Math.floor(t * 14)) % 3) R.pset(px, py, u > 0.7 ? P.a3 : P.bl); if (i > 9 && (i + Math.floor(t * 9)) % 2) R.pset(px + (ca > 0 ? 1 : -1), py + 2, P.a3); } }
  R.rect(x - 1, y - 4, x + 1, y - 1, P.gr3); R.pset(x, y - 4, P.gr2); R.pset(x - 1, y - 3, P.gr2);
}

// un petirrojo americano por el césped: va y viene a saltitos entre x0 y x0 + L (pie en y) y picotea al parar
function d_petirrojo(R, t, x0, y, L, k = 0) {
  const u = (t * 0.16 + k * 0.41) % 2, v = u < 1 ? u : 2 - u, dir = u < 1 ? 1 : -1, f = v * L / 5, x = Math.round(x0 + Math.floor(f) * 5), fr = f % 1, yy = y - (fr < 0.22 ? 2 : 0), pica = fr > 0.5 && Math.floor(t * 5) % 2 ? 1 : 0;
  const gris = hex('#5a5058'), grisS = hex('#3c343e'), pecho = hex('#e8703a'), fx = dir > 0 ? x + 2 : x - 2;
  R.rect(x - 2, y + 1, x + 2, y + 1, d_P.cD);
  R.rect(x - 2, yy - 3, x + 2, yy - 1, gris); R.rect(x - 1, yy - 4, x + 1, yy - 4, gris); R.pset(x - dir * 3, yy - 3, grisS); R.pset(x - dir * 4, yy - 4, grisS);
  R.rect(Math.min(fx, fx - dir), yy - 2, Math.max(fx, fx - dir), yy - 1, pecho); R.pset(x, yy, d_P.k); R.pset(x + dir, yy, d_P.k);
  const hy = yy - 6 + pica * 3, hx = fx + (pica ? dir : 0); R.rect(Math.min(hx, hx - dir), hy, Math.max(hx, hx - dir), hy + 1, grisS); R.pset(hx, hy, d_P.bl); R.pset(hx + dir, hy + 1, d_P.f1);
}

// una cometa que un niño vuela desde detrás del ala izquierda del muro (de él solo asoman la cabeza y la mano): el
// rombo de dos colores que cabecea, la cola de lazos y el hilo
function d_cometa(R, t) {
  const P = d_P, kx = Math.round(40 + Math.sin(t * 0.7) * 2), ky = Math.round(24 + Math.cos(t * 0.9) * 2), pelo = hex('#7a4a2a');
  R.linea(15, 75, kx, ky + 6, P.bl);   // el hilo pasa a la izquierda del capitel de la columna (x 34)
  R.rect(11, 75, 13, 77, P.piel); R.rect(11, 74, 13, 74, pelo); R.pset(11, 75, pelo); R.rect(10, 78, 14, 79, P.f5); R.pset(15, 77, P.piel); R.pset(15, 76, P.piel);
  for (let i = 1; i <= 7; i++) { const x = Math.round(kx + i + Math.sin(t * 5 + i * 0.9) * 1.3), y = Math.round(ky + 6 + i * 0.9); R.pset(x, y, P.bl); if (i % 3 === 2) { R.pset(x - 1, y, P.f2); R.pset(x + 1, y, P.f2); R.pset(x, y, P.f0); } }
  R.poligono([[kx, ky - 6], [kx + 5, ky - 1], [kx, ky + 6], [kx - 5, ky - 1]], P.k);
  R.poligono([[kx, ky - 5], [kx, ky + 5], [kx - 4, ky - 1]], P.f0); R.poligono([[kx, ky - 5], [kx + 4, ky - 1], [kx, ky + 5]], P.f1);
  R.linea(kx - 3, ky - 1, kx + 3, ky - 1, P.oroS); R.pset(kx - 1, ky - 3, P.f2); R.pset(kx + 1, ky + 2, P.oroL);
}

// lo que anima el cielo del jardín (va antes de pegar lo fijo): un banco de cúmulos bajos tras la arboleda, casi
// quietos, y un avión muy alto con su estela, que se deshace por detrás; no entra en la esquina de Atom
function d_cieloVida(R, t) {
  const P = d_P;
  d_nube(R, Math.round(26 + t * 0.5), 61, 58, 31, d_NUBL); d_nube(R, Math.round(132 + t * 0.4), 58, 44, 32, d_NUBL); d_nube(R, Math.round(262 + t * 0.35), 68, 40, 33, d_NUBL);
  const ax = Math.round(((t * 6 + 100) % 400) - 60), ay = 24;
  if (ax < 262) { for (let i = 4; i < 70; i++) { const x = ax - i; if (x < 0) break; const u = i / 70; if (d_um(x, ay) > u * 0.9) R.pset(x, ay, P.bl); if (i > 12 && h(i >> 2, 7, 175) > 0.35 + u * 0.4) R.pset(x, ay + (h(i >> 2, 8, 175) < 0.5 ? 1 : -1), d_NUB[1]); }
    R.rect(ax - 3, ay, ax + 1, ay, P.gr2); R.pset(ax + 2, ay, P.bl); R.pset(ax - 1, ay - 1, P.gr1); R.pset(ax - 2, ay + 1, P.gr1); R.pset(ax - 4, ay - 1, P.gr1); }
}
