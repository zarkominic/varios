// Fontanería y decorados del episodio 33 (Dune: el libro que nadie quería publicar) en el estilo canónico pixel chibi, al
// nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Florence, Oregón (las dunas de 1957 y las de hoy), B la casa de
// Herbert (cuarto de trabajo, entrada con buzón, cocina), C el planeta de arena (NUESTRO), D las editoriales (editoriales:
// pasillo de puertas y Chilton; libros: imprenta, librería, premios y quiosco), E el cine (cine: estudio de París y plató
// de 1984; salas: el cine, la subasta y el rodaje en el desierto) y F hoy (el estudio de Atom, un campus de 1970).
// DERECHOS: NADA de imágenes de las películas de Dune (ni actores, ni vestuario, ni naves, ni el diseño de sus gusanos) ni
// de las portadas del libro. El planeta es NUESTRO: dos lunas, dunas anaranjadas, rocas y, como mucho, una silueta enorme
// y lejana que mueve la arena (nunca una boca con dientes). Las películas se cuentan con marquesinas, taquillas y butacas;
// las pantallas, con formas abstractas. Sin letras (solo números y símbolos). Nada morboso.
// Los personajes son los de ELENCO_DU y las piezas, PIEZAS_DU (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, vallas, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14; las cifras del año
// bajan hasta y ≈ 20: nada en y 15–20 bajo x 20–45), también.
//
//   import * as T from '/atomo/plato/escenas/du-comun.js';
//   const { E, R, M } = await T.preparar('du-gancho');
//   T.rodar(E, R, [[0, (t) => T.hoy(R, t, { encuadre: 'estudio' })]], { año: 2026 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import * as KIT from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa as mapaFa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, ELENCO_CHIBI, a_cifras };
// el mapa de papel (el de fa-comun.js, con sus mismas opciones; devuelve la proyección). Aquí, además, la esquina de
// Atom queda tranquila: los ríos finos que el mapa pinta en tierra se borran en x 262–319, y 14–50 (el papel de al lado
// ocupa su sitio) y se apagan tramados de x 250 a 262, como si nacieran ahí. o.rioAtom: true los deja como estaban.
export function mapa(R, t, o = {}) {
  const P = mapaFa(R, t, o);
  if (o.rioAtom === true) return P;
  const agua = (c) => (c & 255) + 6 < ((c >>> 16) & 255);        // más azul que rojo: tinta de río
  for (let x = 250; x < 318; x++) for (let y = 15; y <= 50; y++) { const c = R.pget(x, y); if (!agua(c)) continue;
    if (x < 262 && ((x * 3 + y * 5) % 12) >= x - 250) continue;   // de x 250 a 262 se apaga tramado
    let q = c; for (const [dx, dy] of [[0, -3], [0, 3], [0, -5], [0, 5], [-4, -2], [4, 2], [0, -8], [0, 8]]) { const v = R.pget(x + dx, y + dy); if (v && !agua(v)) { q = v; break; } }
    R.pset(x, y, q); }
  return P;
}
// las piezas del episodio (PIEZAS_DU: el libro, el manuscrito, la avioneta, el reloj de arena, los manuales, los trofeos…), las crea el reparto
export const PIEZAS_DU = KIT.PIEZAS_DU || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la arena de Oregón (clara, fría) y la del planeta (anaranjada), la hierba de playa, el papel de los manuscritos, la
    // madera del cuarto de Herbert, el azul noche del libro, el rojo de las butacas y el dorado de los premios
    arena: '#e6d2a0', arenaS: '#c4a870', arenaL: '#f4e8c4', duna: '#e09848', dunaS: '#b06a2c', dunaL: '#f4c078',
    hierba: '#7a9a52', hierbaS: '#4e7238', papel: '#efe6d0', papelS: '#cfc4a8', tinta: '#2a2a3a', libro: '#1c2450',
    butaca: '#a02c34', butacaS: '#6e1c26', oro: '#e8b840', oroS: '#a87820', pino: '#2e5a3c', mar: '#3a6a8a',
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
  const E = await escena(id, 'ep33');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1957–1965 (del reportaje al libro), 1965–1974 (el éxito lento), 1974–1986 (las películas
  // imposibles), 1986–2027 (por fin, y las dunas de hoy)
  Object.assign(R.ICONOS, {
    duna: ['.......', '.......', '...##..', '..####.', '.######', '#######', '.......'],
    libro: ['.......', '######.', '#....#.', '#.##.#.', '#....#.', '######.', '.......'],
    claqueta: ['#.#.#.#', '#######', '#.....#', '#.....#', '#.....#', '#######', '.......'],
    hierba: ['.#...#.', '.#.#.#.', '..###..', '..###..', '...#...', '...#...', '.......'],
  });
  R.tramosTiempo([[1957, 1965, R.PALA.ORO, 'duna'], [1965, 1974, R.PALA.VERDE ?? R.PALA.ORO, 'libro'], [1974, 1986, R.PALA.ROJO, 'claqueta'], [1986, 2027, R.PALA.AZUL ?? R.PALA.ROJO, 'hierba']]);
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

// ── A · Florence, Oregón (1957 y hoy) ──────────────────────────────────────────────────────────────────────
// o.encuadre ('dunas' por omisión | 'pueblo') y o.camara ('general' por omisión o la segunda de cada uno). Devuelve la
// geometría del encuadre (suelo y los puntos que usan las escenas). Los valores desconocidos caen en 'dunas' general.
//   'dunas' (suelo y 152, libre x 40–250): la costa de Oregón a ras de suelo. Cielo tramado con cirros y cúmulos de tres
//     tonos a varias velocidades que pasan por detrás de las dunas, el sol velado (232, 30), el Pacífico gris con sus
//     rompientes (animadas), la bruma y el cabo lejano con su faro que destella; a la derecha, la loma azulada y el
//     bosque de pinos. La DUNA GRANDE de arena clara y fría (cresta en 178, 50; barlovento rizado por el viento, filo en
//     ese y cara de caída en sombra) avanza sobre los pinos (troncos enterrados, copas que asoman, dos secos), la casa
//     de madera con la arena hasta las ventanas y la carretera medio sepultada con su raya y sus postes torcidos; la
//     duna baja de la izquierda ya la pisa. Vida: EL VIENTO (el gran penacho de arena que sale de la cresta y cae en
//     arco sobre el bosque, con rachas que lo hinchan; penachos menores en la duna baja y en las lejanas; la ventisca
//     pegada a todo el filo, la cortina y los regueros que resbalan por la cara de caída, hebras que suben por el
//     barlovento, velos que cruzan por delante de los pinos y serpientes de arena por el llano), gaviotas, las hileras
//     de hierba de playa recién plantada con estacas, cordeles y banderines (o.hierba 0–1: cuántas hileras, 0,7 por
//     omisión), la camioneta verde del servicio forestal con plantones y dos operarios pequeños que se agachan a
//     plantar; en primer término, pisadas, conchas, piedras, matas sueltas, dos troncos de deriva, y a los lados del
//     sitio de los personajes un haz de estacas con la pala clavada (36, 150) y el cajón de plantones (265, 151).
//     Con o.hierba 0 no hay plantación: ni hileras, ni camioneta, ni operarios, ni estacas, ni cajón (camion,
//     operarios y cajon se devuelven null); en su sitio, lo que la arena se traga: los hitos de la carretera cada vez
//     más enterrados, una señal de curva torcida (130, 111), una rama de deriva y un bidón oxidado (265, 151).
//     o.epoca: 1957 (por omisión) | 'hoy': EL MISMO sitio (mismos perfiles, casa, postes y tronco), ahora cubierto de
//     hierba verde con arbustos en flor y pinos jóvenes, cielo azul, la carretera limpia de punta a punta con un coche,
//     la casa restaurada, dos paseantes por la cresta, olas de viento en la hierba, y la señal redonda de la planta
//     tachada (PIEZAS_DU.senalHierba en 262, 151; o.senal: false la quita). o.limpia 0–1: la franja donde se ha quitado
//     la hierba (una elipse que crece desde 150, 156) y vuelve la arena de 1957 con sus rachas, también en el prado, la
//     duna baja y la cara de caída de la duna grande.
//     Lo de delante (la valla de listones medio enterrada, matas, rachas) va en oregonDelante.
//     Cámara 'aire': lo mismo en picado desde la avioneta: el mar con su espuma y su marejada a la izquierda, la playa,
//     la franja ancha de dunas con crestas en media luna y sus sombras (en 'hoy', casi toda verde), lagos con juncos,
//     las lenguas de arena que se meten en el bosque oscuro, el río con su barra, su barca y sus destellos, la carretera
//     de la costa con su puente y un coche, Florence con sus tejados y pantalanes, campos; calima arriba (deja
//     tranquilas la barra del año y la esquina de Atom), nubes por debajo con su sombra, gaviotas y la sombra de la
//     avioneta que corre por la arena (o.sombra: [x, y] para fijarla, false para quitarla; devuelve .sombra y .avioneta,
//     el sitio que le toca a PIEZAS_DU.avioneta, que pone la escena).
//   'pueblo' (suelo y 152, libre x 20–200): Florence en 1957, junto al río: las lomas de pinos con bruma, el puente de
//     arcos de hormigón con sus cuatro torres, coches que lo cruzan, el río con destellos, el pantalán con dos barcas
//     de pesca que cabecean, un pescador y gaviotas en los pilotes; la barandilla del muelle con nasas, una red y un
//     barril; el poste del teléfono; tres tiendas de madera con fachada falsa, rótulo de barras y pictograma (pez,
//     ancla, taza), toldo de rayas que se mueve, escaparate con género y puerta a la escala de los personajes; humo en
//     la chimenea, una camioneta azul aparcada, la acera de tablones, la calzada con charcos y, al final de la calle
//     (derecha), la valla que la arena salta para meterse en la calzada.
//     Cámara 'corte' (suelo y 178, libre x 72–244): una duna en CORTE, como una gran lámina de ciencias que llena la
//     pared de una sala; debajo, un palmo de pared, el zócalo (y 162–167) y el SUELO de tablas (y 168–179) a la escala
//     de los personajes, con una mesita a la izquierda (x 12–44: frasco de arena y lupa) y un banco a la derecha
//     (x 254–311: libros, bote de lápices y un cesto de láminas enrolladas): el viento (flechas animadas), la arena en capas, la
//     hierba con sus raíces largas, el agua bajo la arena, un escarabajo, un pájaro y un pino. Seis piezas, cada una en
//     su casilla clara (0 viento, 1 arena, 2 hierba a la izquierda, de arriba abajo; 3 agua, 4 escarabajo, 5 pájaro a
//     la derecha, de abajo arriba), unidas por flechas entre sí y por líneas de puntos con su sitio en el corte.
//     o.piezas 0–6: cuántas se ven (6 por omisión); o.falta: índice de la pieza que se quita: deja su hueco punteado,
//     desaparece del corte, y las demás se tiñen de gris con un «!» y el corte entero se apaga.
export function oregon(R, t, o = {}) {
  const enc = o.encuadre ?? 'dunas', cam = o.camara ?? 'general';
  if (enc === 'pueblo') return cam === 'corte' ? a_orCorte(R, t, o) : a_orPueblo(R, t, o);
  return cam === 'aire' ? a_orAire(R, t, o) : a_orDunas(R, t, o);
}
// lo de delante de los personajes en cada encuadre de oregon(); se llama después de los actores, con las mismas opciones.
//   'dunas' general: en las dos esquinas de abajo, una valla de listones medio enterrada (1957) o un poste de sendero
//     (hoy), matas de hierba de playa que se mecen en el borde inferior y, en 1957, rachas de arena que cruzan por
//     delante de los pies. Nada sube de y 150 salvo en los bordes (x < 50, x > 276): no tapa caras.
//   'dunas' aire: jirones de nube que pasan por delante de la avioneta (bajos y por los bordes).
//   'pueblo' general: el bolardo con su maroma y una caja de pesca en la esquina izquierda, y arena que cruza la calle.
//   'pueblo' corte: nada (la lámina no tiene primer término).
export function oregonDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'dunas', cam = o.camara ?? 'general', P = a_OR, hoy = o.epoca === 'hoy';
  if (enc === 'pueblo') {
    if (cam === 'corte') return {};
    // el bolardo de hierro con su maroma y la caja de pesca
    R.rect(6, 163, 31, 179, P.madera[1]); R.rect(6, 163, 31, 164, P.madera[3]); for (let x = 6; x < 31; x += 6) R.rect(x, 165, x, 179, P.madera[0]); R.rect(6, 170, 31, 170, P.madera[0]);
    for (let k = 0; k < 5; k++) { const x = 9 + k * 5; R.rect(x, 160, x + 3, 162, k % 2 ? P.mar[3] : P.mar[4]); R.pset(x + 3, 161, P.k); }
    R.rect(40, 166, 47, 179, P.k); R.rect(41, 167, 46, 179, P.hierro[1]); R.rect(41, 167, 42, 179, P.hierro[2]); R.rect(38, 164, 49, 166, P.k); R.rect(39, 164, 48, 165, P.hierro[2]);
    for (let x = 48; x < 78; x++) { const y = 172 + Math.round(5 * Math.sin((x - 48) / 30 * Math.PI) + 0.6 * Math.sin(t * 2 + x * 0.3)); R.pset(x, y, P.madera[4]); R.pset(x, y + 1, P.madera[2]); }
    a_orRachas(R, t, 250, 319, 158, 178, 5, P.arena[5], 71);
    return {};
  }
  if (cam === 'aire') {
    // jirones de nube por delante, pegados a los bordes de abajo
    for (let k = 0; k < 3; k++) { const x = ((k * 173 + t * (16 + k * 5)) % 460) - 70, y = 172 + k * 4; a_orVelo(R, x, y, 54 + k * 12, 7, P.nube[2], 0.5, k); }
    return {};
  }
  // la valla de listones medio enterrada (1957) en las dos esquinas
  if (!hoy) {
    const liston = (x, top, base, inc) => { for (let y = top; y <= base; y++) { const xx = x + Math.round((base - y) * inc); R.pset(xx, y, P.madera[3]); R.pset(xx + 1, y, P.madera[1]); } R.pset(x + Math.round((base - top) * inc), top - 1, P.madera[4]); };
    for (let k = 0; k < 8; k++) liston(2 + k * 6, 166 - Math.round(7 * Math.sin(k * 0.45 + 0.4)) + (k % 3), 179, -0.06 - k * 0.012);
    for (let x = 0; x < 50; x++) if (x % 6 !== 3) { R.pset(x, 170 + Math.round(x * 0.05), P.hierro[1]); }
    for (let k = 0; k < 7; k++) liston(279 + k * 6, 163 + Math.round(6 * Math.sin(k * 0.5)) + (k % 2), 179, 0.05 + k * 0.01);
    for (let x = 279; x < 320; x++) if (x % 6 !== 1) R.pset(x, 171 - Math.round((x - 279) * 0.04), P.hierro[1]);
    // la arena amontonada al pie de la valla
    for (let x = 0; x < 56; x++) { const y0 = 176 - Math.round(3 * Math.sin(x / 56 * Math.PI)); for (let y = y0; y < 180; y++) R.pset(x, y, a_orTono(P.arena, 3.6 + (y === y0 ? 1.2 : 0) + (h(x, y, 61) - 0.5), x, y)); }
    for (let x = 272; x < 320; x++) { const y0 = 177 - Math.round(4 * Math.sin((x - 272) / 60 * Math.PI)); for (let y = y0; y < 180; y++) R.pset(x, y, a_orTono(P.arena, 3.2 + (y === y0 ? 1.2 : 0) + (h(x, y, 62) - 0.5), x, y)); }
  } else {
    // el poste del sendero con su franja y su flecha
    R.rect(296, 150, 301, 179, P.k); R.rect(297, 151, 300, 179, P.madera[2]); R.rect(297, 151, 297, 179, P.madera[4]); R.rect(297, 155, 300, 157, a_orC.amarillo); R.rect(297, 161, 300, 162, P.madera[0]);
  }
  // las matas del borde de abajo, que se mecen
  const G = hoy ? [P.hierba[1], P.hierba[3], P.hierba[5]] : [P.mata[0], P.mata[1], P.mata[2]];
  const matas = hoy ? [[14, 180, 12], [34, 181, 9], [58, 182, 7], [262, 182, 8], [282, 181, 11], [312, 180, 13], [96, 183, 5], [228, 183, 5]] : [[20, 181, 10], [44, 182, 7], [268, 182, 8], [300, 181, 11]];
  for (const [x, y, a] of matas) a_orMata(R, x, y, a, t, G, x);
  if (!hoy) a_orRachas(R, t, 0, 319, 156, 176, 6, P.arena[5], 63);
  return {};
}
// ── B · La casa de Herbert, 1957–1986 ──────────────────────────────────────────────────────────────────────
// o.encuadre ('cuarto' por omisión | 'entrada') y o.camara ('general' por omisión o la segunda de cada uno). Devuelve
// la geometría del encuadre (suelo y los puntos que usan las escenas). El fondo fijo de cada vista va en un búfer.
//   'cuarto': el cuarto de trabajo de Frank Herbert, de frente. Techo de viga oscura (tranquilo bajo la barra del año),
//     pared de tablas verticales, rodapié en y 122–127 y tarima desde y 128, con una alfombra de rombos. De izquierda a
//     derecha: la ESTANTERÍA grande (x 4–92, cinco baldas con lomos de colores, sin letras), la VENTANA (cristal x
//     106–168, y 36–90; todo recortado a su hueco: cielo tramado, colinas, abetos que se mecen, lluvia fina del
//     noroeste) con sus cortinas, que se mueven, y debajo el arcón con cojín; la pared de los MAPAS (x 180–252: el
//     mapa de la costa de Oregón clavado) sobre un mueble de cajones con el globo terráqueo y libros de desiertos y
//     plantas abiertos; a la derecha el reloj de péndulo (se mueve), un cuadro pequeño, el sillón verde (x 262–306) y
//     la lámpara de pie (la esquina de Atom queda en pared tranquila). La silla de trabajo asoma detrás de la mesa (x
//     134–158). La mesa con la máquina de escribir va en casaDelante. o.epoca cambia el contenido Y la luz:
//       1957 (por omisión): día gris de lluvia; pocos libros (huecos, una cámara, una planta), facturas clavadas junto
//         al mapa, el gato gris dormido en el arcón, la lámpara de pie encendida.
//       1963: de noche, solo el flexo de la mesa (halo cálido tramado, el resto en penumbra azul); estanterías a
//         reventar con hojas que asoman, un segundo mapa de desierto, fichas clavadas unidas con hilo rojo, bolas de
//         papel; pilas de notas por el suelo y los muebles (o.notas 0–1: su altura; por omisión 0.7), el gato en el
//         sillón. La torre grande la pone la escena con PIEZAS_DU.pilaNotas.
//       1972: mañana clara con nubes y pájaros, un rayo de sol en la tarima con motas; cortinas naranjas, mapa y lámina
//         enmarcados, una balda con los dos premios (PIEZAS_DU.trofeoNebula y trofeoHugo), todo ordenado, el perro
//         dormido junto al sillón.
//       1986: atardecer, todo teñido de ámbar (el tinte va en el búfer, no por fotograma), el sol bajo en la ventana y
//         un rayo largo; la BALDA DE HONOR con sus seis libros (devuelta en honor), la silla vacía, sin animal; la
//         máquina tapada con su funda y una flor en un vaso (casaDelante). Con respeto.
//       (La luz de 1963 y 1986 va en el búfer: los actores y las piezas que ponga la escena salen sin teñir.)
//     Cámara 'mesa': la mesa de cerca, vista desde arriba en tres cuartos. Arriba, una franja de pared (tranquila);
//     el tablero de madera con vetas llena el resto. La máquina de escribir verde azulada en el centro, arriba (carro,
//     cesta de tipos, cuatro filas de teclas), con su hoja (o.escribe 0–1: renglones escritos; o.teclea: las teclas y
//     los tipos se mueven); a la izquierda la bandeja de lápices y la pluma, el bote de lápices, el tintero, un reloj de
//     bolsillo (el segundero anda), tres sobres y el mapa de la costa de Oregón desplegado; a la derecha la foto antigua
//     enmarcada (devuelta en foto: hueco para lo que ponga la escena), el flexo verde con su charco de luz, la taza
//     que humea y, abajo, las facturas con su clip (o.facturas 0–1: cuántas; por omisión 1 en 1957 y 0 después: en su
//     sitio queda un cuaderno cerrado); en el centro, la carpeta de escritorio de cuero verde: sitio libre (libre).
//     o.epoca da la luz (1957 gris, 1963 de noche con una polilla, 1972 sol, 1986 ámbar) y o.notas 0–1, fichas sueltas
//     por los bordes. Nada de ceniceros ni tabaco.
//   'entrada': la entrada de la casa, de día, vista desde la calle: la casa de tablas verde salvia a la izquierda (x
//     0–197) con el tejado de tejas de madera (tranquilo bajo la barra del año), el porche con sus postes, barandilla,
//     mecedora, cesta colgante y campanillas de viento (se mueven), la ventana grande con cortinas, lámpara y el gato,
//     la PUERTA con mosquitera (x 106–136; o.puerta 0–1 la abre), los escalones (x 96–146, y 128–140), el triciclo
//     de los niños (x 164) y la boca de incendios (x 181); a la derecha el
//     jardín con dos abetos que se mecen, el aspersor (en seco), la valla de listones, la calle de
//     detrás con un coche de los sesenta aparcado, otro que pasa de vez en cuando y un cartero lejano que camina, la
//     casa del vecino con su chimenea que humea y colinas de abetos; cielo tramado con nubes de tres tonos a tres
//     velocidades y pájaros. Delante, el camino de losas, la acera (y 152–163; los pies en y 158), el bordillo y el
//     asfalto. El BUZÓN de poste, grande, junto a la acera (devuelto en buzon: x, y de la base, boca [x, y]);
//     o.bandera (0–1) sube su banderita roja y o.buzonAbierto (0–1) le abre la portezuela. o.lluvia: cielo gris,
//     charcos con ondas, farol del porche encendido y la llovizna (que pinta casaDelante por encima de los actores).
//     Cámara 'cocina': la cocina-comedor de los cincuenta: friso verde menta arriba (tranquilo bajo la barra del
//     año), papel pintado amarillo (liso en la esquina de Atom), el cubo de pedal y la caja de botellas de leche, la
//     nevera redondeada (x 12–60) con los dibujos de los niños y una radio encima, el tablero de corcho con los BOCETOS
//     DE ANUNCIOS de Beverly (una lata, un coche, una sonrisa, un jabón; sin letras), la ventana sobre el fregadero
//     (cristal x 126–186, y 36–78: jardín con abetos, nubes y un pájaro, recortado) con visillos de cuadros, el grifo
//     que gotea, los armarios verde menta, la cocina de esmalte con la CAFETERA que humea y la llama, el calendario
//     (solo números), el teléfono de pared, el reloj, la lámpara de globo y el suelo de damero en perspectiva (desde y
//     128). Dos sillas de cromo y vinilo rojo (x 94 y 254, patas en y 146: quedan detrás de los personajes). La mesa
//     de Beverly, en casaDelante. o.lluvia: llueve en la ventana.
//   Además, en la 'entrada': cirros altos, el poste de la luz de la calle de detrás con sus cables (pasan por debajo de
//     la esquina de Atom) y tres pájaros posados (x 234, 265 y 271) que dan saltitos, tulipanes al pie de la valla, la manguera, una
//     pelota, un petirrojo que picotea en el césped, el sumidero y el bordillo rojo de la boca de incendios, rodadas y
//     grietas en el asfalto y dos hojas que arrastra el aire. En la 'cocina': la sombra del parteluz en el sol del
//     suelo, brillos en las baldosas, esquinas más oscuras, la sombra de la mesa, las botas de agua en su bandeja, un fardo de periódicos (barras), la bolsa de la compra, el gato
//     sentado cerca de su cuenco (x 49–61) y una mosca en la lámpara. En la 'mesa': el pie de un cuadro en la pared (x 234–262), el cerco
//     de café, la goma, el sacapuntas y sus virutas, dos clips, el cable del flexo y, en 1957, la luz gris de la
//     ventana con las sombras de las gotas que resbalan. En el 'cuarto' de 1963, una polilla ronda el flexo.
export function casa(R, t, o = {}) {
  if (o.encuadre === 'entrada') return o.camara === 'cocina' ? b_cocina(R, t, o) : b_entrada(R, t, o);
  return o.camara === 'mesa' ? b_mesa(R, t, o) : b_cuarto(R, t, o);
}
// lo de delante de los personajes en cada encuadre de casa(); se llama después de los actores, con las mismas opciones.
//   'cuarto': la MESA de trabajo (tablero en y 143, x 94–218; cajonera, hueco y armario; patas hasta y 176) con el flexo
//     (encendido en 1957 y 1963), el bote de lápices, las hojas, la máquina de escribir (PIEZAS_DU.maquina en x 180;
//     en 1986, tapada con su funda, y un vaso con una flor en lugar de la taza) y la taza que humea; en 1963, pilas de
//     notas sobre la mesa y en primer término (o.notas). Quien se sienta detrás (x 146) asoma cabeza y hombros.
//   'cuarto' con cámara 'mesa': nada (todo está en casa).
//   'entrada': la llovizna por delante de todo (solo con o.lluvia) y sus salpicaduras en la acera.
//   'entrada' con cámara 'cocina': la MESA de Beverly (formica roja con canto de cromo, tablero en y 143, x 106–238,
//     patas de horquilla hasta y 176) con su máquina de escribir (x 204), un tablero de dibujo inclinado con un boceto,
//     el bote de lápices, bocetos sueltos y la taza que humea. Quien se sienta detrás (x 166) asoma cabeza y hombros.
export function casaDelante(R, t, o = {}) {
  if (o.encuadre === 'entrada') return o.camara === 'cocina' ? b_cocinaDelante(R, t, o) : b_entradaDelante(R, t, o);
  return o.camara === 'mesa' ? {} : b_cuartoDelante(R, t, o);
}
// ── C · El planeta de arena (nuestro) ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'desierto': un planeta desierto INVENTADO por nosotros: un mar de dunas anaranjadas hasta el horizonte (y 92), en
//     seis términos, con crestas afiladas, caras en sombra y rizaduras, bajo un cielo tramado ocre que vira a violeta
//     arriba, con DOS LUNAS (una grande y pálida en 216,48 y otra pequeña y rojiza que deriva despacio), estrellas que
//     titilan, velos de polvo alto de tres tonos a tres velocidades y una estrella fugaz; mesetas de roca en el
//     horizonte, afloramientos de roca oscura con sus sombras largas, dos torbellinos de polvo, arena que vuela de las
//     crestas y resbala por las laderas, y destellos anaranjados que brillan y se apagan en la arena (o.brillo 0–1,
//     0.35 por omisión). o.hora: 'ocaso' (por omisión, con el sol poniéndose a la izquierda) | 'noche' | 'dia'.
//     Con la cámara general, 'dia' es OTRO encuadre, a ras del llano: el horizonte baja a y 104 bajo un cielo grande,
//     la luna grande asoma enorme tras el horizonte a la derecha (246, 102; radio 34: queda por debajo de la esquina
//     de Atom), la pequeña va alta en el centro (168, 58) y el sol arriba a la izquierda (52, 50); entre las dunas
//     bajas del fondo y la cresta de delante (suelo 150, el mismo) queda un llano ancho con rizaduras, piedras y dos
//     rodadas viejas, y por él cruza la loma (y 129, hasta 90 px de largo y 14 de alto por o.lomaEscala; centro en
//     232 − 6·(t − o.t0)), grande respecto a los personajes.
//     o.silueta 0–1: lejos (en el llano, y 116), la arena se abomba en una loma larguísima (hasta 112 px) que avanza
//     despacio hacia la izquierda: proa empinada a la luz y popa en sombra, un caballón de arena que empuja por
//     delante, arcos de presión que se abren en el llano, un surco hundido de estela y una polvareda (algo enorme se
//     mueve DEBAJO: nunca se le ve boca ni cuerpo); o.lomaX fija su centro (si no, 240 − 6·(t − o.t0); 262 − … con
//     'roca'; o.t0 = el instante en que empieza el plano, 0 por omisión) y o.lomaEscala la agranda (1 por omisión). Los personajes se plantan en la cresta de la duna de delante
//     (suelo 150, x 30–290). Cámara 'roca': desde lo alto de un afloramiento de roca: la repisa de roca con vetas y
//     grietas abajo a la izquierda (suelo 131, x 40–145), el desierto abajo y lejos (horizonte en y 64, nueve términos
//     de dunas más pequeñas), las dos lunas más grandes (la grande asoma tras el horizonte) y la loma de o.silueta
//     más larga (hasta 140 px, en y 101). Devuelve { suelo, hor, lunaG, lunaP, sol, loma: { x, y, len, alto } | null,
//     punto, libre: [x0, x1] }.
//     Llama a planetaDelante después de los actores (rocas y arena que vuela por delante de los pies).
//   'orbita': el planeta visto desde el espacio: una esfera ocre (centro 150,100; radio 58) con bandas de dunas,
//     escudos de roca oscura, casquetes diminutos, tres tormentas de polvo que giran, la línea de la noche y un filo
//     de atmósfera; las dos lunas en órbita (animadas: pasan por delante y por detrás) y un campo de estrellas que
//     titilan con una nebulosa y una fugaz. Gira despacio (o.giro en radianes; por omisión 0.03·(t − o.t0)). o.verde 0–1: una
//     mancha verde que crece en un punto (para el cierre; devuelve dónde está en .verde). Cámara 'globo': un globo
//     terráqueo de escritorio, de cerca (centro 160,80; radio 38), con su arco de latón y su peana, sobre una mesa de
//     madera con libros, cuartillas, un libro abierto y un sobre, delante de una pared empapelada con estantería, un
//     flexo de pared (atornillado junto al borde derecho, todo por encima de y 85; no pisa la mesa),
//     notas clavadas, un reloj de péndulo y una lámina; o.arena 0–1 funde el globo de la Tierra (azul y verde) en un
//     globo todo de arena, y mientras tanto cae un hilo de arena que hace un montoncito en la mesa (.monton). El globo
//     gira (o.giro; por omisión 0.5 + 0.22·(t − o.t0)). Es un inserto: ahí no va un chibi, va T.mano o T.brazo: .libre es
//     el carril de la derecha del globo (x 205–319, y 86–132, por debajo de la lámina y del flexo, sin nada que lo
//     cruce; el globo queda a 121 px del borde: por ahí la mano llega con un lápiz o un puntero) y .libreArriba el
//     de arriba (x 182–268, y 0–46, pared tranquila): T.brazo(R, 199, −2, 190, 39, manga, −1, { codo: [198, 18] })
//     baja desde el borde con 40 px a la vista y la punta de los dedos toca el pivote del polo del globo en .toque
//     (177, 41); para tocar la esfera misma (186, 51) hace falta la muñeca en (199, 50): unos 51 px, más de la cuenta. Llama a planetaDelante después (libros y lapicero del primer término).
export function planeta(R, t, o = {}) {
  const enc = o.encuadre ?? 'desierto', cam = o.camara ?? 'general';
  if (enc === 'orbita') return cam === 'globo' ? c_globo(R, t, o) : c_orbita(R, t, o);
  return c_desierto(R, t, o, cam === 'roca' ? 'roca' : 'general');
}
// lo de delante de los personajes en cada encuadre de planeta(); se llama después de los actores, con las mismas
// opciones. 'desierto': las rocas de las esquinas de abajo y rachas de arena a ras de suelo; con la cámara 'roca', el
// peñasco de la izquierda de la repisa (x 2–34), las piedras de su borde (x 150–194) y la aguja de roca de abajo a la
// derecha (x 262–320, y 128–180). 'orbita': nada; con la cámara 'globo', la pila de libros de abajo a la izquierda
// (x 0–66, y 152–180) y el bote de lápices de abajo a la derecha (x 290–314).
export function planetaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'desierto', cam = o.camara ?? 'general';
  if (enc === 'orbita') { if (cam === 'globo') c_globoDelante(R, t, o); return {}; }
  const P = c_HORAS[o.hora] ?? c_HORAS.ocaso;
  if (cam === 'roca') {
    c_roca(R, P, 18, 138, 32, 16, 3, 0); c_roca(R, P, 160, 139, 14, 5, 5, 0); c_roca(R, P, 181, 141, 18, 7, 8, 0);
    c_roca(R, P, 296, 186, 62, 58, 11, 0, { sinSombra: true });
    c_rachas(R, t, P, 126, 136, 5, 4);
  } else {
    c_roca(R, P, 14, 184, 46, 24, 21, 0, { sinSombra: true }); c_roca(R, P, 306, 186, 34, 17, 23, 0, { sinSombra: true });
    c_roca(R, P, 49, 181, 16, 7, 27, 0, { sinSombra: true });
    c_rachas(R, t, P, 145, 156, 7, 2);
  }
  return {};
}
// ── D · Las editoriales, 1963–1966 ──────────────────────────────────────────────────────────────────────
// o.encuadre ('pasillo' por omisión | 'chilton') y o.camara ('general' por omisión o la segunda de cada uno). Devuelve
// la geometría del encuadre (suelo y los puntos que usan las escenas). El fondo fijo de cada vista va en un búfer.
//   'pasillo': un pasillo de oficinas de Nueva York a principios de los sesenta, de frente: cinco puertas de editoriales
//     (x 100, 146, 192, 238 y 284; hoja de y 94 a 139) con montante numerado, cristal esmerilado con un símbolo distinto
//     en cada una (pluma, libro, estrella, ancla, búho; sin letras) tras el que pasan sombras, ranura de correo y pomo;
//     entre ellas, el reloj, el buzón de latón con su tubo de cristal (cae un sobre de vez en cuando), el surtidor de
//     agua (burbujas), un ficus, la silla de espera y la manguera; apliques (uno parpadea), zócalo de madera y linóleo
//     a cuadros en perspectiva con el brillo de los apliques y el reflejo de puertas y muebles; cada puerta encendida
//     derrama su luz en el suelo (se apaga con su cartel). En la pared: cenefa estarcida en el friso (y 35–44, hasta
//     x 262), tablón de corcho con avisos (x 91–117, y 53–70), rótulo del ascensor (x 48–68, y 27–37, dos triángulos),
//     dinteles, bisagras y la sombra de cada marco, y una polilla en el aplique del medio. A la izquierda (x 6–68) se abre el pasillo transversal EN
//     PERSPECTIVA: más puertas, lámparas, el ascensor al fondo (se abre y se cierra, con su indicador de aguja), una
//     secretaria pequeña que va y viene con papeles y el carrito del correo. o.cerradas 0–1: cuántas de las cinco
//     puertas (de izquierda a derecha) tienen ya el cartelito de «no» (una X roja colgada, con la luz apagada); el
//     último cartel se balancea. Devuelve puertas: [{ x, y, cartel: [x, y], ranura: [x, y], cerrada }], cerradas (n),
//     ascensor y suelo. No lleva nada delante.
//     Cámara 'despacho': el despacho de un editor, oscuro y de madera: papel pintado verde, zócalo de caoba, ventana
//     de guillotina a la izquierda (x 24–96, y 32–96: rascacielos en tres términos, depósitos de agua, vapor, nubes,
//     palomas y luces que se encienden, todo recortado) con su persiana y su radiador, perchero con gabardina y
//     sombrero, un barómetro de caoba (x 0–17, y 46–86), diplomas (rayas y sello), una lámpara de techo de cristal verde
//     (x 180–196, y 14–29), una balda con libros y una copa (x 209–238, y 66–87), reloj con segundero, un grabado de barcos (o.sinCuadro: sin él, para colgar
//     ahí el calendario de la escena; devuelve pared: [241, 52]), archivadores a la derecha con torres de manuscritos y
//     un ventilador que gira, pilas de manuscritos en el suelo, parqué en espiga y alfombra, con la luz de la ventana
//     en el suelo (x 58–157, y 141–177; se atenúa cuando pasa una nube). El sillón del editor
//     (x 186) va detrás del actor; la mesa (x 122–250, tablero en y 139) con su torre de manuscritos, la lámpara
//     de latón, la taza que humea y el teléfono negro (o.suena: tiembla y suena) va en
//     editorialesDelante. Devuelve suelo (160, delante de la mesa), asiento [186, 146] (pies de quien se sienta detrás: asoman
//     cabeza y hombros), mesa { x0, x1, y }, libre [216, 139] (el tramo despejado del tablero, para el libro o la carta),
//     telefono, torre, ventana, reloj, visita y pared [x, y] (centro de abajo del grabado).
//   'chilton': la editorial de Filadelfia, clara y técnica: una estantería grande (x 8–150) con cinco baldas de
//     MANUALES de taller (lomos de colores con la franja blanca y la llave inglesa) y su escalera de biblioteca; dos
//     láminas de un coche en despiece y un calendario con un coche (números sueltos, sin letras); la MAQUETA DE MOTOR
//     en su pedestal (x 200: los pistones suben y bajan y gira el ventilador); la ventana (x 226–288, y 52–102: el
//     ladrillo de enfrente, la torre con su RELOJ en marcha, humo, nubes y palomas, recortado), el planero con rollos
//     y un ventilador de sobremesa que oscila, y un tablero con llaves colgadas; sobre la ventana, la balda de las
//     maquetas (x 223–267, y 28–46: dos coches y una copa); en el suelo, al sol, la caja de manuales recién llegada y un
//     fardo atado (x 232–292, y 137–160: quien pase por delante va en suelo ≥ 160); suelo de tablas con la luz de la
//     ventana y motas de polvo. El sillón de Lanier (x 112) va detrás del actor; su mesa de acero (x 62–176, tablero
//     en y 139) con la LÁMPARA VERDE encendida, el café, el bote de lápices, la bandeja con manuales y un coche de
//     juguete va en editorialesDelante. Devuelve suelo (160, delante), asiento [112, 146], mesa, libre [140, 139] (el
//     sitio del cheque), lampara, motor, ventana, reloj, visita y estanteria.
//     Cámara 'estante': un INSERTO (aquí no cabe un chibi a escala: se usa con T.mano o T.brazo): un estante de cerca
//     con manuales grandes (PIEZAS_DU.manual({ lomo: true, s: 3 }): 18 × 72, de colores, con la llave inglesa fina en
//     la franja y el año en cifras) uno
//     tras otro, sujetalibros de engranaje, un pistón de pisapapeles y un coche de juguete; arriba, manuales tumbados,
//     una aceitera, un tarro de tornillos y cajas de recambios en la sombra; una araña que sube y baja por su hilo (x 260); abajo asoman los de la balda siguiente; una franja de sol que se desliza, motas de polvo, una
//     etiqueta que se mece y una mosca. Devuelve hueco: [x, y] (centro de abajo del sitio vacío, de 20 px, donde
//     entra PIEZAS_DU.libro({ lomo: true, s: 3 })), balda (y donde se apoyan los libros), s (3) y suelo (= balda).
export function editoriales(R, t, o = {}) {
  const chilton = o.encuadre === 'chilton';
  if (chilton) return o.camara === 'estante' ? d_estante(R, t, o) : d_chilton(R, t, o);
  return o.camara === 'despacho' ? d_despacho(R, t, o) : d_pasillo(R, t, o);
}
// lo de delante de los personajes en cada encuadre de editoriales(); se llama después de los actores, con las mismas
// opciones: la mesa del editor en 'despacho' (o.suena: el teléfono tiembla) y la de Lanier en 'chilton' (general). En
// 'pasillo' general y en 'estante' no hay nada delante (devuelve {})
export function editorialesDelante(R, t, o = {}) {
  if (o.encuadre === 'chilton') return o.camara === 'estante' ? {} : d_mesaLanier(R, t, o);
  return o.camara === 'despacho' ? d_mesaEditor(R, t, o) : {};
}
// ── D2 · Los libros: imprenta, librería, premios y quiosco ──────────────────────────────────────────────────────────────────────
// o.encuadre ('imprenta' por omisión | 'premios') y o.camara ('general' por omisión o la segunda de cada uno). Devuelve la
// geometría del encuadre (suelo y los puntos que usan las escenas). Lo de delante de los personajes va en librosDelante.
//   'imprenta': una imprenta de 1965. Nave de ladrillo pintado con tres ventanales (cielo con nubes que pasan, tejados y
//     un depósito de agua), cerchas y tres lámparas que se mecen; a la izquierda la prensa (x 6–152, y 58–147): la pila
//     de papel del alimentador, tres cilindros que giran tras la boca, los rodillos de tinta, la banda de papel que
//     corre, el volante con su correa, el manómetro que tiembla y los pilotos; la cinta (x 150–226, tablero en y 137)
//     lleva los pliegos a la encuadernadora (x 224–260), cuya prensa sube y baja y echa vapor de cola; a la derecha, el
//     palé (x 264–316, base y 146) donde crece la pila de libros azul noche: o.pila 0–1 (0.5 por omisión; 1 = 56
//     libros en 4 columnas). Junto a la pared va y viene un operario pequeño con su carro (o.operario: false lo quita).
//     Reloj de pared, tablón, balda de botes de tinta, tuberías, extintor; suelo de cemento con juntas, manchas, raya
//     de seguridad y la luz de los ventanales con motas de polvo. Personajes en suelo 154, libres en x 150–262.
//     Cámara 'libreria': una librería de 1965. A la izquierda el escaparate (x 9–75, y 42–100; por él se ve la calle:
//     fachada de enfrente, coches de la época y paseantes, recortados al cristal; libros expuestos y un gato que mueve
//     la cola) y la puerta de cristal con su campanilla (x 84–108); al fondo, la estantería de cuatro baldas (x 112–319,
//     y 46–118) con lomos, libros de cara, un globo y la escalera corredera; reloj de péndulo, un móvil de planetas que
//     gira (x 211–231), tres lámparas de globo (x 9, 186 y 256: ninguna bajo la barra del año, x 20–170); la esquina de Atom, pared lisa tras una pilastra. En medio: la mesa de novedades (x 14–96, tablero y 133) con sus pilas y la MESA
//     CENTRAL (x 132–204, tablero claro en y 132–136) sobre una alfombra, con un panel claro detrás (x 138–172,
//     y 105–127; o.panel: false lo quita) ante el que la escena pone la pila pequeña (centro x 155, base y 135) y una
//     pizarrita oscura vacía (o.cartel: false la quita) donde la escena escribe el precio con R.numero (x 181, base
//     y 132). Suelo de tablas con el sol del escaparate. Suelo 154. El mostrador con la caja registradora va en
//     librosDelante (quien atiende va detrás, en x 244–266 y suelo 146: asoman cabeza y hombros).
//   'premios': una sala de banquetes de 1966. Escenario (tablas en y 105–118; los pies en suelo 116) con telón azul
//     noche con estrellas que titilan, emblema dorado de laurel y estrella, dos recortables colgados (un planeta con
//     anillo y una luna) que se mecen, bambalina y cortinas granates con cordones, dos arañas con velas que tiemblan,
//     candilejas, dos focos que barren hacia o.foco (x, 160 por omisión), el atril con micrófono (x 142–158, y 99–116;
//     o.atril: false lo quita), la mesa de los trofeos con mantel (x 198–246, tablero y 100: los trofeos los pone la
//     escena), dos centros de flores (76 y 283, 116), la escalerilla y las paredes de nogal con apliques. La
//     embocadura NO es simétrica: va de la pilastra de x 26–31 a la de x 268–273 (cortinas en x 32–66 y 233–267,
//     bambalina hasta x 273; emblema en 152, 50; recortables en 104 y 200); a su derecha, el paño de nogal ancho
//     (x 274–319), liso hasta y 50 (la esquina de Atom), con su cuarterón y su aplique (307, 74) por debajo; las
//     tablas siguen hasta x 293. Abajo, la moqueta. Las mesas
//     redondas con manteles y el público de espaldas van en librosDelante (o.aplauso 0–1: cuántos aplauden).
//     Cámara 'quiosco': una esquina de ciudad en 1963. Cielo tramado con nubes de tres tonos y palomas; enfrente, cinco
//     edificios (ladrillo, piedra, escalera de incendios, depósito de agua, toldos, una barbería con su poste que
//     gira, semáforo, buzón), la acera de enfrente con paseantes, la calzada con coches y el AUTOBÚS, que llega por la
//     izquierda, para en la parada (morro en x 292, puerta en x 266–276) y se va: o.bus 0–1 (0 fuera por la izquierda,
//     0.5 parado con la puerta abierta, 1 fuera por la derecha; sin o.bus hace el ciclo solo cada 18 s). En la acera
//     de aquí (suelo 152): el QUIOSCO verde (x 4–131, y 46–148) con revistas colgadas con pinzas que se mecen
//     (portadas de planetas, cohetes y robots, sin letras), el quiosquero dentro (o.quiosquero: false lo quita),
//     periódicos apilados en la repisa (y 118) y fardos atados; la farola, la papelera, el poste de la parada (x 240)
//     y el banco (x 256–306, asiento y 139). Los personajes van por delante de todo eso.
export function libros(R, t, o = {}) {
  if ((o.encuadre ?? 'imprenta') === 'premios') return o.camara === 'quiosco' ? e_quiosco(R, t, o) : e_premios(R, t, o);
  return o.camara === 'libreria' ? e_libreria(R, t, o) : e_imprenta(R, t, o);
}
// Lo de delante de los personajes en cada encuadre de libros(); se llama después de los actores, con las mismas opciones.
//   imprenta: un palé de resmas envueltas (x 0–46, y 160–179) y un cajón de libros abierto (x 266–319, y 162–179).
//   librería: el mostrador de madera (x 236–319, tablero y 138–141) con la caja registradora de latón (x 290–316,
//     y 115–138), la lámpara de banquero con su luz (x 269–285) y el timbre (x 236–243); el tramo x 244–266 queda
//     despejado para quien atiende; y un cesto de saldos con su cartel de estrella, abajo a la izquierda (x 0–40).
//   premios: tres mesas redondas (centros x 52, 160 y 268; mantel en y 153–165) con velas, copas y flores, y el público
//     de espaldas en sus sillas (las cabezas nunca suben de y 139); o.aplauso 0–1 (0.2 por omisión: aplaude alguno).
//   quiosco: fardos de periódicos atados (x 0–36), una boca de riego (x 300–309) y dos palomas que picotean.
export function librosDelante(R, t, o = {}) {
  if ((o.encuadre ?? 'imprenta') === 'premios') return o.camara === 'quiosco' ? e_quioscoDelante(R, t, o) : e_premiosDelante(R, t, o);
  return o.camara === 'libreria' ? e_libreriaDelante(R, t, o) : e_imprentaDelante(R, t, o);
}
// ── E · El cine, 1974–2026 ──────────────────────────────────────────────────────────────────────
// o.encuadre ('paris' por omisión | 'plato') y o.camara ('general' por omisión o la segunda de cada uno). Devuelve la
// geometría del encuadre (suelo y los puntos que usan las escenas). Lo de delante, en cineDelante (después de los actores).
//   'paris': un estudio de París en 1975: un piso alto con cornisa, paños de moldura y suelo de roble en espiga; en el
//     centro, el balcón abierto (por él, tejados de zinc con buhardillas, chimeneas que humean, una cúpula lejana, nubes,
//     golondrinas y una paloma; barandilla de forja, geranios, visillos que el aire hincha); las paredes forradas de unos
//     170 dibujos colgados con chincheta (NUESTROS: naves ovaladas, castillos de torres, trajes en triángulo, planetas,
//     paisajes a bandas; manchas de color, nunca copias) y una cuerda con más dibujos tendidos; el aire del balcón les
//     levanta las esquinas. A la izquierda, el planero de nogal con rollos, la cafetera (vapor) y el tocadiscos (gira);
//     una cesta de rollos; a la derecha, la mesa de dibujo inclinada con su flexo (tiembla) y su taburete, y la
//     estantería. Motas de polvo en el sol. o.dibujos 0–1 (por omisión 1): cuántos dibujos hay en la pared (0: la pared
//     vacía, con las huellas de los cuadros, clavos, una grieta, pruebas de color a brocha, un desconchón, una mancha
//     de humedad y, a lápiz, palotes de cuenta (símbolos, no letras) y un boceto NUESTRO de un planeta con anillo); bajo
//     el paño izquierdo, un radiador de hierro (x 83–102, y 102–121) con un gato dormido encima (respira y mece la cola); aparecen salteados. Suelo de los personajes: y 148.
//     Cámara 'salon': un salón recargado de hotel de lujo: friso de escayola, damasco granate, arrimadero lacado, parqué
//     de Versalles y alfombra oriental; ventana alta con cortinas de terciopelo (se mecen) y los tejados; sofá Luis XV;
//     chimenea de mármol con fuego (llamas, brasas, chispas), espejo dorado (un brillo lo cruza), reloj de péndulo,
//     candelabros y apliques con velas que tiemblan; araña de cristal que destella; una mesita de mármol (su tablero,
//     en 171, 126: ahí va el taxímetro); un dosel morado con corona dorada sobre una tarima roja de dos escalones (el
//     trono, PIEZAS_DU.trono, lo pone la escena en 231, 141) y una puerta doble a la derecha. Suelo: y 156.
//   'plato': un plató de cine de 1983: una nave en penumbra con parrilla de cerchas y cinco focos con su haz y polvo
//     en el aire (uno parpadea), pared acolchada, el portón medio abierto (fuera, sol, naves, un depósito, un carrito
//     que cruza, gente, tres nubes a tres velocidades y dos pájaros), piloto rojo, cuadro eléctrico; en el centro, sobre una tarima, un decorado de cartón piedra
//     a medio pintar: dos columnas y un arco dorados solo hasta donde ha llegado la brocha, y un telón NUESTRO (dunas,
//     un sol y dos lunas) con la derecha aún en lienzo crudo; un pintor en su andamio que dora la columna; una grúa de
//     cámara sobre raíles cuyo brazo sube y baja con su operador; una pared de roca falsa con la imprimación a la vista
//     y otro bastidor visto por detrás (listones, tornapuntas, sacos de arena) donde un técnico suelda (chispas); un
//     tramoyista que cruza con un tablón; cables, botes, tambores de columna y marcas de cinta en el suelo. Suelo: y 156.
//     o.variante 'espacio': OTRO plató, unos años después (mismos suelos 156 y 143, misma tarima en x 110–210, y 126,
//     y se entra por el mismo sitio, x ≈ 44): pared de ladrillo pintado de azul gris, suelo de tableros de madera, el
//     portón granate CERRADO con su puerta de paso abierta (x 37–53, y 81–117), un ventilador de efectos (gira) y la
//     máquina de humo; en la tarima, colgado de un pórtico de tubo, un ciclorama de ESTRELLAS nuestro (x 114–206,
//     y 44–125: espacio hondo, un planeta con anillo en 186, 66, una nebulosa y un suelo lunar de maqueta; el centro,
//     x 136–168, queda libre para lo que la escena pinte delante); a la derecha la mesa de maquetas (x 214–260) con
//     su flexo, bajo un móvil de planetas, y una estantería metálica (x 276–319, y 56–128); tres focos de luz fría;
//     un tramoyista cruza con una estrella de atrezo. Devuelve lo mismo que el otro (arco = el ciclorama).
//     Cámara 'oficina': TRES oficinas distintas (o.variante: 'paris' | 'estudio' | 'magnate'; si no se pide, 'paris'
//     para o.lugar 'paris' o 'lluvia' y 'estudio' para Hollywood). En las tres, el escritorio (x 98–222; caoba, teca o
//     ébano), el sillón del productor (x 146–174) y los suelos son los mismos: 158 a los lados y 147 detrás.
//     · 'estudio' (un ejecutivo de estudio, 1976): pared verde agua, arrimadero lacado en crema, moqueta mostaza de
//       círculos; a la IZQUIERDA la librería (x 0–51) y una lámpara de arco (x 58–100); los tres carteles en su sitio
//       ([110|148|186, 32], 30 × 53, con otros dibujos); a la DERECHA, bajo la esquina de Atom, una ventana apaisada
//       (cristal x 230–313, y 56–94) con persiana, sobre un aparador de teca (x 228–316, y 106–124) con un televisor
//       de barras de colores, un trofeo y la bandeja del bar; reloj de rayos (244, 34).
//     · 'magnate' (el gran productor, al caer la tarde): pared azul con raya fina dorada, arrimadero de caoba, suelo de
//       mármol en damero; detrás del escritorio un ventanal de tres hojas (cristal x 62–214, y 26–96) con cortinas
//       doradas y el sol que se pone; una puerta de caoba (x 6–46) y un perchero a la izquierda; a la derecha seis
//       fotos enmarcadas (x 226–267, y 28–81), la cafetera exprés cromada en su consola (x 228–264; echa vapor) y un
//       globo terráqueo de pie que gira (298, 84; radio 14). Sin carteles (devuelve carteles: []).
//     · 'paris' (la de siempre): la oficina de un productor: pared entelada, arrimadero de nogal, moqueta teja con rombos; una
//     ventana con la persiana recogida (o.lugar: 'hollywood' por omisión: colinas, naves de estudio, palmeras al viento,
//     un dirigible, coches | 'lluvia': de noche, torres con ventanas que se encienden, neones de símbolos que parpadean,
//     un tren elevado, lluvia y gotas en el cristal, y la habitación en penumbra con el reflejo de los neones |
//     'paris': los tejados de París), un sofá de cuero, tres carteles de película sin letras (formas y colores
//     nuestros) con su luz de cuadro, reloj de pared (anda), archivador con guiones y un ventilador que gira la cabeza
//     (cintas al aire), estantería con latas de película y dos trofeos genéricos, y el sillón granate del productor.
//     Suelo: y 158 a los lados del escritorio; quien va detrás del escritorio, en y 147 (x ≈ 150).
export function cine(R, t, o = {}) {
  const enc = o.encuadre ?? 'paris', cam = o.camara ?? 'general';
  if (enc === 'paris') return cam === 'salon' ? f_salon(R, t, o) : f_paris(R, t, o);
  return cam === 'oficina' ? f_oficina(R, t, o) : f_plato(R, t, o);
}
// lo de delante de los personajes en cada encuadre de cine(); se llama después de los actores, con las mismas opciones.
//   paris/general: la mesa larga de trabajo (tablero de y 150 a 158, x 26–294; el centro, x 140–190, queda libre para el
//     listín): flexos en los extremos, tarros de pinceles y lápices, tinteros, la taza, hojas con manchas de color y el
//     teléfono; debajo, caballetes, una caja con rollos y libros. o.salto 0–1: todo lo de la mesa da un bote (gag 7).
//     o.mesa: 'llena' | 'limpia' (por omisión, limpia si o.dibujos < 0,15) | false (sin mesa).
//   paris/salon: una kentia en su macetón de latón (abajo a la izquierda, se mece) y un carrito de servicio con la
//     cubitera, copas y una tetera de plata (abajo a la derecha).
//   plato/general: un foco fresnel en su trípode visto por detrás (izquierda), una caja de material con rollos de cable y
//     dos sillas de director de lona (abajo a la derecha, x 244–296). Con o.variante 'espacio': tres cajones de apoyo
//     con un megáfono (x 0–28), la misma caja (x 32–66), una mesita plegable con el termo (x 244–268) y UNA silla de
//     director verde (x 272–296).
//   plato/oficina: el escritorio (de caoba, de teca clara en la variante 'estudio' o de ébano en 'magnate'; tablero de y 143 a 150, x 98–222; frente hasta y 174): el montón de contratos,
//     el teléfono con sus teclas que parpadean, el péndulo de Newton, la lámpara de banquero (encendida) y la placa sin
//     letras; la franja x 142–186 del tablero queda libre para el contrato que viaja.
export function cineDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'paris', cam = o.camara ?? 'general';
  if (enc === 'paris') return cam === 'salon' ? f_salonDelante(R, t, o) : f_parisDelante(R, t, o);
  return cam === 'oficina' ? f_oficinaDelante(R, t, o) : f_platoDelante(R, t, o);
}
// ── E2 · El cine por fuera y por dentro, la subasta y el rodaje ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). SIEMPRE se llama a salasDelante después de los actores, con las mismas opciones.
//   'sala': la fachada de un cine, de noche: los vecinos (un café y una tienda), el pretil, el letrero vertical y la
//     marquesina (sin letras: renglones en trazos y, con o.lunas 1–3, uno, dos o tres discos de luna; sin o.lunas, solo
//     trazos), tres vitrinas de carteles (formas abstractas; con o.lunas n, los n primeros llevan 1…n lunas sobre
//     NUESTRAS dunas), las puertas de cristal con el vestíbulo (palomitas, alguien que cruza), la taquilla acristalada con
//     la taquillera y el precio, la acera mojada con reflejos y las farolas. o.epoca: 1984 (bombillas que corren, neón
//     rosa, ladrillo granate, coches cuadrados, vapor de alcantarilla) | 2021 (caja de luz blanca, carteles
//     retroiluminados, fachada gris, todocaminos, hojas que corren, móviles en la cola) | 2026 (pantalla de ledes ámbar y
//     tiras turquesa, coches eléctricos con barra de luz, nieve que cae). o.cola 0–1: cuánta gente hace cola (extras
//     chibi: hasta 12 en fila hacia la taquilla, pies en y 141; desde 0,6 la cola dobla y vuelve por el bordillo, pies en
//     y 151, esa parte en salasDelante). o.coches false: sin coches (pasan por delante, en salasDelante).
//     Cámara 'butacas': dentro, desde el fondo de la sala: la pantalla enorme (por omisión, un resplandor de arena
//     abstracto que ondula; o.pantalla false la deja en penumbra para que pinte la escena, recortando a g.pantalla), el
//     haz del proyector con polvo, el telón recogido, las paredes acolchadas con apliques, la salida, el escenario; las
//     filas de butacas rojas de espaldas van en salasDelante, con o.lleno 0–1: cuántas cabezas hay (las vacías enseñan el
//     respaldo). Con o.frente true, la misma sala vista DESDE la pantalla (para ver caras): la pared del fondo con la
//     cabina y su haz con polvo, las puertas, el extintor, la moqueta de rombos, el pasillo con su alfombra y sus pilotos
//     (x 201–241, y 98–127), tres filas de butacas acanaladas de cara; en la fila de los protagonistas (g.asientos) el
//     decorado sienta extras según o.lleno salvo en o.reservados (índices de asiento, por omisión [4, 7]); la fila de
//     delante (respaldos con el asiento levantado que tapan las piernas, un cubo de palomitas, un vaso y un abrigo) va en
//     salasDelante. o.luz 0–1: cuánto alumbra la pantalla a la sala.
//   'subasta': una sala de subastas de París en 2021: boiserie clara con molduras, un ventanal con tejados de zinc, cuadros
//     abstractos, la pantalla con la cifra (o.cifra, con R.numero; o.puja 0–1 la barra de la puja), la mesa de teléfonos
//     con tres empleados, el pedestal con vitrina para el libro (lo pone la escena en g.pedestal), la tribuna del
//     subastador (su frente, el cristal de la vitrina y el público sentado de espaldas con paletas numeradas, en
//     salasDelante; o.paletas 0–1: cuántas se levantan; o.lleno 0–1: cuánta gente). Cámara 'rodaje': un rodaje en un
//     desierto DE VERDAD de la Tierra (paredes de arenisca roja altísimas, arena rojiza con rizaduras, cielo azul con un
//     solo sol): la carpa de los monitores, sombrillas, una cámara en su travelín que va y viene por los raíles, focos y
//     reflectores, el camión, técnicos pequeños, un banderín al viento; lo de delante (la cámara grande en su trípode,
//     cajas de material y cables) en salasDelante (o.delante false lo quita).
export function salas(R, t, o = {}) {
  const enc = o.encuadre ?? 'sala', cam = o.camara ?? 'general';
  if (enc === 'subasta') return cam === 'rodaje' ? g_rodaje(R, t, o) : g_subasta(R, t, o);
  return cam === 'butacas' ? (o.frente ? g_patio(R, t, o) : g_butacas(R, t, o)) : g_fachada(R, t, o);
}
// lo de delante de los personajes en cada encuadre de salas(); se llama después de los actores, con las mismas opciones:
// 'sala': la vuelta de la cola junto al bordillo y los coches; 'butacas': las filas de butacas de espaldas con el público
// (o, con o.frente, la fila de respaldos de delante); 'subasta': el frente de la tribuna, el cristal de la vitrina y el
// público con sus paletas; 'rodaje': la cámara grande, las cajas y los cables
export function salasDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'sala', cam = o.camara ?? 'general';
  if (enc === 'subasta') return cam === 'rodaje' ? g_rodajeDelante(R, t, o) : g_subastaDelante(R, t, o);
  return cam === 'butacas' ? (o.frente ? g_patioDelante(R, t, o) : g_butacasDelante(R, t, o)) : g_fachadaDelante(R, t, o);
}
// ── F · Hoy ──────────────────────────────────────────────────────────────────────
// o.encuadre ('estudio' por omisión, o 'campus') y o.camara ('general' por omisión, o la segunda de cada uno: 'mesa' en
// el estudio y 'catalogo' en el campus). Devuelve la geometría del encuadre (suelo y los puntos que usan las escenas).
//   'estudio': el estudio de Atom, de día: moldura, papel pintado color arena con rayas finas, soles y dunas (liso
//     detrás de Atom y bajo el año), friso de cuarterones verde azulado, tarima con la mancha de sol y alfombra; la
//     librería de nogal (libros, un globo, un cactus, cajas, un helecho encima), el cesto de mapas enrollados, el mapa
//     enmarcado, el reloj de péndulo que anda, la ventana con cortinas recogidas (por ella, recortado: cielo con nubes
//     de tres tonos, pájaros, una cometa, tejados, los árboles del parque que se mecen, un paseante y una ciclista), la
//     lámpara de pie, el cuadro de las dos lunas sobre las dunas y el sillón mostaza con el gato gris que duerme. El
//     escritorio va en hoyDelante. o.arena 0–1: dunas que suben del suelo y se arriman a los muebles, con granos que
//     ruedan; o.hierba 0–1: la hierba se queda con el cuarto: un tapiz relleno que nace al pie del escritorio y acaba
//     cubriendo el suelo, y después las baldas y el techo de la librería, el friso, el alféizar (el cristal queda
//     libre), el sillón, los marcos y la lámpara, con flores al final (no depende de o.arena).
//     o.enVentana(R, t, [x0, y0, x1, y1]): lo que la escena quiera pintar FUERA, detrás de los barrotes (recortado).
//     Cámara 'mesa': el escritorio de cerca (un inserto para manos y piezas, sin sitio para personajes): el tablero de
//     nogal con vetas, nudos y el charco de luz, el flexo que entra por la izquierda con su haz y sus motas, el libro
//     abierto (el nuestro), una hoja de notas, el reloj de arena a escala 4 (corre solo; o.nivel 0–1 lo fija, o.roto lo
//     raja, o.reloj false lo quita para que lo mueva la escena), la plantita en su maceta, el bote de lápices; detrás,
//     el papel pintado a doble tamaño, el canto del friso, el cuadro de las dos lunas y la ventana desenfocada en
//     tramas (cielo, nubes y copas que se mueven; admite o.enVentana). o.arena 0–1: el montoncito de (226, 158) crece
//     hasta ser una duna de mesa que entierra el pie del reloj y, pasada la mitad, otra entierra el libro (o.monton
//     0–1: el montón solo, sin lo demás); o.hierba 0–1: la hierba brota en el montón y se queda con el tablero, con
//     flores al final.
//   'campus': el césped de una universidad en 1970: cielo con nubes de tres tonos a tres velocidades, el sol y pájaros;
//     el pabellón de ladrillo con hiedra, buhardillas y pórtico, la galería de arcos (por dentro pasa gente), la torre
//     del reloj (anda), la biblioteca de piedra; dos árboles grandes que se mecen y sueltan hojas, césped a franjas con
//     margaritas, la acera (paseantes con libros y una ciclista), el camino del pórtico, el aparcabicis, una farola, el
//     corro de la guitarra (rasguea y suben notas), el corro de lectura, una lectora bajo el árbol, la pancarta clavada
//     con una hoja y la pancarta grande que ondea entre dos postes (planeta, hoja y sol; sin letras), un estudiante que
//     lanza el disco volador y el perro que salta a cogerlo, mariposas, una mochila y un termo. La mesa de libros va en
//     hoyDelante. Cámara 'catalogo': un catálogo enorme abierto sobre una manta de cuadros en el césped, visto desde
//     arriba (un inserto para manos y piezas): dos páginas con doce casillas (martillo, serrucho, hacha, tienda,
//     farol, mochila, sobre de semillas, regadera, pala, nuestro libro, cúpula de barras y brújula, cada una con sus
//     rayas de texto y su etiqueta de color; sin letras), el otro ejemplar cerrado con la foto de la Tierra en la tapa,
//     una manzana, un collar de cuentas, un lápiz, una taza y un sombrero de paja (ala ovalada, copa y cinta con lazo); sombras de hojas que se mecen, la
//     esquina de la página que levanta el aire, una mariquita, hormigas y una mariposa.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'campus') return cam === 'catalogo' ? h_catalogo(R, t, o) : h_campus(R, t, o);
  return cam === 'mesa' ? h_mesa(R, t, o) : h_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones:
// 'estudio' el escritorio de nogal (x 92–208, tablero en y 131) con la pila de libros, la plantita, el bote de lápices,
// el flexo encendido y el reloj de arena a escala 2 (o.reloj false lo quita; o.nivel, o.roto), y con o.arena el montón
// del tablero (o.monton: solo ese), los hilos que caen por el canto y la duna de delante, y con o.hierba la hierba que
// nace en el montón, cubre el tablero con una mata rellena (baja junto al reloj), cuelga en cortina por los cajones,
// los cierra de musgo y sale por el suelo, con flores y mariposas;
// 'mesa' la lupa y el lápiz del borde, la arena que rebosa por delante y las briznas de delante; 'campus' la mesa
// plegable (x 114–206, tablero en y 148) con sus libros, el nuestro de pie, la hucha de lata, el cartel con un libro
// dibujado y la caja de cartón; 'catalogo' las briznas altas de las esquinas de abajo.
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'campus') return cam === 'catalogo' ? h_catalogoDelante(R, t, o) : h_campusDelante(R, t, o);
  return cam === 'mesa' ? h_mesaDelante(R, t, o) : h_estudioDelante(R, t, o);
}
const a_orHex = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map((c) => hex(c)) : hex(v)]));

// rampas de oscuro a claro: la arena FRÍA de Oregón (sombras azuladas, nada de naranja), la hierba de playa, el mar gris…
const a_OR = a_orHex({
  k: '#1c1222',
  arena: ['#76809a', '#9aa0ac', '#c2bfb0', '#ddd5ba', '#eee7cd', '#fbf7e6'],
  hierba: ['#2a4438', '#3a5f3e', '#547e44', '#769c50', '#9ab862', '#c4d688'],
  mata: ['#5c7048', '#8a9a5a', '#bcc27c'],
  cielo57: ['#6a94b6', '#86acc8', '#a4c2d6', '#c2d6de', '#dbe4e2'],
  cieloHoy: ['#3c8cd6', '#5ea4e4', '#88c0ee', '#b2d8f2', '#d8eaf0'],
  mar: ['#34506c', '#476a86', '#62869c', '#88a6b6', '#bccfd4'],
  rio: ['#2e5a78', '#3f7290', '#5a8ea6', '#84b0c0', '#c0dce0'],
  pino: ['#182f2c', '#22463a', '#346246', '#4e8250'],
  nube: ['#a9b8c8', '#d2dce4', '#f6f6f2'],
  nubeHoy: ['#b4cce4', '#e2ecf6', '#ffffff'],
  madera: ['#3e2a20', '#5e4230', '#84603e', '#a88456', '#ccac7c'],
  gris: ['#3c3e4c', '#5a5d6a', '#7c7f8a', '#a2a4aa', '#c8c8c6'],
  hormigon: ['#7c7c84', '#a09e9c', '#c2beb2', '#deD8c6', '#f0ecde'],
  hierro: ['#2c2c38', '#4a4c5a', '#74788a'],
  papel: ['#cdbf9c', '#e2d6b4', '#efe6cc', '#f8f2de'],
});

const a_orC = a_orHex({ niebla: '#dfe6e4', bruma: '#c6d4da', verdeFS: '#3e6a4a', verdeFSs: '#2a4a36', verdeFSl: '#5e8c62', amarillo: '#e8c64a', rojo: '#b8443a', rojoS: '#7e2c2a', blanco: '#f6f2ea', piel: '#e8b890', caqui: '#b09a6a', azul: '#4a6a9a', naranja: '#e08a3a', cristal: '#8fb6c8', cristalS: '#4e7088', teja: '#7a4a3c', tejaS: '#54302a', tinta: '#4a4038', agua: '#5a9ac4' });

const a_orB4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// umbral de la trama ordenada 4×4 (0–1) y tono tramado de una rampa
const a_orU = (x, y) => (a_orB4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const a_orTono = (rampa, v, x, y) => { let l = Math.floor(v); if (v - l > a_orU(x, y)) l++; return rampa[l < 0 ? 0 : l >= rampa.length ? rampa.length - 1 : l]; };

// mezcla de dos colores (a = 0 el primero, 1 el segundo)
const a_orMez = (c1, c2, a) => { const r = (c1 & 255) + ((c2 & 255) - (c1 & 255)) * a, g = ((c1 >> 8) & 255) + (((c2 >> 8) & 255) - ((c1 >> 8) & 255)) * a, b = ((c1 >> 16) & 255) + (((c2 >> 16) & 255) - ((c1 >> 16) & 255)) * a; return (0xff000000 | (Math.round(b) << 16) | (Math.round(g) << 8) | Math.round(r)) >>> 0; };

const a_orSm = (a, b, v) => { const p = Math.max(0, Math.min(1, (v - a) / (b - a))); return p * p * (3 - 2 * p); };

// ruido suave (interpolado) para manchas grandes
const a_orRu = (x, y, k = 0) => { const xi = Math.floor(x), yi = Math.floor(y), s = (f) => f * f * (3 - 2 * f), fx = s(x - xi), fy = s(y - yi), a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy; };

// lo fijo de cada vista se pinta una vez en su búfer (por lienzo y variante) y se copia en cada fotograma
const a_orCACHE = new WeakMap();

function a_orFijo(R, clave, dibuja) {
  let m = a_orCACHE.get(R); if (!m) a_orCACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); const extra = dibuja(b); R.usar(prev); m[clave] = { b, extra }; }
  return m[clave];
}

// el cielo en bandas con transición tramada, de arriba (rampa[0]) al horizonte
function a_orCielo(R, y1, rampa) {
  const n = rampa.length - 1;
  for (let y = 0; y < y1; y++) { const f = Math.min(n - 0.001, (y / y1) ** 0.85 * n), i = Math.floor(f), p = Math.max(0, Math.min(1, (f - i - 0.2) / 0.6)); for (let x = 0; x < 320; x++) R.pset(x, y, a_orU(x, y) < p ? rampa[i + 1] : rampa[i]); }
}

// una nube de tres tonos (sombra, cuerpo, luz) con la base plana; se deshace tramada al entrar en la esquina de Atom y no
// sube a la barra del año
function a_orNube(R, cx, cy, w, N, y1 = 180) {
  const BL = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2], [-0.5, 0.12, 0.12], [0.52, 0.12, 0.11]], base = cy + w * 0.2;
  const pinta = (ox, oy, f, c) => { for (const [dx, dy, r0] of BL) { const r = Math.max(1, r0 * w * f), X = cx + dx * w + ox, Y = cy + dy * w + oy;
    for (let y = Math.floor(Y - r); y <= Y + r; y++) { if (y < 17 || y >= y1 || y > base + oy) continue; for (let x = Math.max(0, Math.floor(X - r)); x <= Math.min(319, X + r); x++) { if ((x - X) ** 2 + (y - Y) ** 2 > r * r || (y < 23 && x < 50)) continue; if (y < 50 && x > 248 && a_orRu(x * 0.22, y * 0.22, 9) * 0.75 + a_orU(x, y) * 0.25 < (x - 248) / 24) continue; R.pset(x, y, c); } } } };
  pinta(0, 1, 1, N[0]); pinta(0, 0, 1, N[1]); pinta(-1, -1, 0.68, N[2]);
}

// un velo tramado y alargado (niebla, cirro, jirón de nube): mezcla el color con lo que hay debajo
function a_orVelo(R, x0, y0, w, alto, c, fuerza = 0.5, k = 0) {
  for (let j = -alto; j <= alto; j++) { const y = Math.round(y0 + j); if (y < 0 || y > 179) continue; for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319) continue; const e = Math.sin(i / w * Math.PI) * (1 - Math.abs(j) / (alto + 1)) * (0.55 + 0.45 * a_orRu(i * 0.12, j * 0.5 + k * 7, 40 + k)); if (e * fuerza * 2 > a_orU(x, y)) R.pset(x, y, a_orMez(R.pget(x, y), c, 0.55)); } }
}

// los cirros: tres velos finos y altos, bien visibles, que apenas se mueven (por debajo de las cifras del año)
function a_orCirros(R, t, c) {
  for (let k = 0; k < 4; k++) { const w = 60 + k * 16, x0 = ((k * 131 + 40 + t * (2 + k * 0.7)) % 470) - 110, y0 = 25 + k * 5 + (k === 3 ? -9 : 0);
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || (x > 262 && y0 < 48)) continue; const e = Math.sin(i / w * Math.PI), y = Math.round(y0 - i * 0.05 + Math.sin(i * 0.11 + k) * 1.2);
      if (h(i >> 2, k, 46) < 0.2) continue; R.pset(x, y, a_orMez(R.pget(x, y), c, e > 0.3 ? 0.8 : 0.45)); if (e > 0.55 && (i >> 1) % 3) R.pset(x + 2, y - 1, a_orMez(R.pget(x + 2, y - 1), c, 0.6)); if (e > 0.8 && i % 4 < 2) R.pset(x - 1, y + 1, a_orMez(R.pget(x - 1, y + 1), c, 0.4)); } }
}

// rachas de arena (o de espuma) que cruzan de izquierda a derecha entre y0 e y1
function a_orRachas(R, t, x0, x1, y0, y1, n, c, k = 0) {
  const W = x1 - x0 + 60;
  for (let i = 0; i < n; i++) { const v = 70 + h(i, 1, k) * 80, x = x0 - 30 + ((h(i, 2, k) * W + t * v) % W), y = Math.round(y0 + h(i, 3, k) * (y1 - y0) + Math.sin(t * 3 + i) * 1.2), L = 5 + Math.round(h(i, 4, k) * 9);
    for (let j = 0; j < L; j++) { const X = Math.round(x + j); if (X < x0 || X > x1 || (j > L - 4 && j % 2)) continue; R.pset(X, y, c); } }
}

// una mata de hierba de playa (hojas largas que salen de un punto y se doblan con el viento)
function a_orMata(R, x, y, alto, t, G, k = 0) {
  const n = Math.max(3, Math.round(alto * 0.8)), m = Math.sin(t * 2.6 + k * 0.7) * 0.5 + 0.7;
  for (let i = 0; i < n; i++) { const a = (i / (n - 1) - 0.5) * 1.5, L = alto * (0.6 + 0.4 * h(i, k, 33)), c = G[i % 3];
    for (let s = 0; s <= L; s++) { const u = s / L, xx = x + Math.sin(a) * s * 0.55 + u * u * (m * alto * 0.32 + a * 1.5), yy = y - Math.cos(a) * s; R.pset(Math.round(xx), Math.round(yy), u > 0.8 ? G[2] : c); } }
}

// un pino de la costa (Pinus contorta), con las ramas escalonadas, la luz a la izquierda y la copa vencida por el viento
function a_orPino(R, x, base, alto, PN, o = {}) {
  const tr = Math.max(2, Math.round(alto * (o.tronco ?? 0.28)));
  R.rect(x, base - tr - 2, x + (alto > 26 ? 1 : 0), base, o.seco ? a_OR.gris[2] : a_OR.madera[1]); if (alto > 26) R.rect(x, base - tr - 2, x, base, o.seco ? a_OR.gris[3] : a_OR.madera[2]);
  if (o.seco) { for (let k = 0; k < 4; k++) { const y = base - tr - k * Math.round(alto * 0.14); R.rect(x, y - Math.round(alto * 0.14), x, y, a_OR.gris[2]); R.linea(x, y, x + (k % 2 ? 4 : -4) * (1 - k * 0.15), y - 3, a_OR.gris[k % 2 ? 2 : 3]); } return; }
  const n = Math.max(3, Math.round(alto / 7)), h0 = alto - tr;
  for (let k = 0; k < n; k++) { const u = k / n, yb = base - tr - u * h0, w = Math.max(1.5, (1 - u) * alto * 0.24 + 1), ht = h0 / n * 1.7, inc = (o.viento ?? 1) * u * alto * 0.08;
    for (let j = 0; j <= ht; j++) { const y = Math.round(yb - j), ww = w * (1 - j / ht); for (let i = -Math.ceil(ww); i <= Math.ceil(ww) + 1; i++) { if (Math.abs(i - 0.5) > ww + 0.5) continue; const X = Math.round(x + i + inc + j * 0.08 * (o.viento ?? 1)), v = 1.5 - i / (ww + 1) * 1.1 + (j < 1.5 ? -0.9 : 0) + (h(X, y, 44) - 0.5) * 0.9; R.pset(X, y, a_orTono(PN, v, X, y)); } } }
}

// una figura pequeña de 9 px (operario, paseante): gorro o casco, cara, torso y piernas; o.agachado la inclina, o.paso anima las piernas
function a_orMini(R, x, y, o = {}) {
  const d = o.dir ?? 1, ag = o.agachado ? 1 : 0, p = o.paso != null ? Math.floor(o.paso * 5) % 2 : 0;
  R.rect(x - 1, y - 2, x - 1, y - p, o.pant ?? a_OR.gris[0]); R.rect(x + 1, y - 2, x + 1, y - (1 - p) * (o.paso != null ? 1 : 0), o.pant ?? a_OR.gris[0]);
  R.rect(x - 1 + ag * d, y - 5 + ag, x + 1 + ag * d, y - 3, o.ropa ?? a_orC.caqui); R.pset(x + 1 + ag * d, y - 5 + ag, o.ropaS ?? o.ropa ?? a_orC.caqui);
  const hx = x + ag * 2 * d, hy = y - 7 + ag * 2; R.rect(hx - 1, hy, hx, hy + 1, a_orC.piel); R.rect(hx - 1, hy - 1, hx, hy - 1, o.gorro ?? a_OR.madera[1]); if (o.ala) R.pset(hx + d, hy - 1 + (d > 0 ? 0 : 0), o.gorro ?? a_OR.madera[1]);
  if (ag) { R.pset(hx + d, hy + 3, a_orC.piel); R.pset(hx + d, hy + 4, a_orC.piel); }
}

// la camioneta de los años cincuenta (del servicio forestal, verde; o la del pueblo): cabina redondeada, caja con adrales,
// aletas y parachoques; c = [sombra, color, luz], dir = hacia dónde mira, s = escala
function a_orCamion(R, x, y, c = [a_orC.verdeFSs, a_orC.verdeFS, a_orC.verdeFSl], dir = 1, s = 1) {
  const X = (i) => x + Math.round(i * s) * dir, Y = (j) => y + Math.round(j * s), r = (a, b, c2, d, col) => R.rect(Math.min(X(a), X(c2)), Y(b), Math.max(X(a), X(c2)), Y(d), col), K = a_OR.k;
  r(-15, -9, 14, -3, K); r(-4, -15, 6, -9, K); r(-14, -8, 13, -4, c[1]); r(-14, -8, 13, -8, c[2]); r(-14, -5, 13, -4, c[0]);
  r(-3, -14, 5, -9, c[1]); r(-3, -14, 5, -14, c[2]); r(-1, -13, 4, -10, a_orC.cristal); r(-1, -13, 0, -12, a_orC.blanco); r(2, -13, 2, -10, c[0]);
  r(-14, -11, -5, -9, c[0]); for (let i = -13; i < -5; i += 3) r(i, -12, i, -9, a_OR.madera[3]); r(-14, -10, -5, -10, a_OR.madera[2]);   // los adrales de la caja
  r(14, -7, 14, -6, a_orC.amarillo); r(-15, -7, -15, -6, a_orC.rojo); r(12, -3, 15, -3, a_OR.gris[3]); r(-16, -3, -13, -3, a_OR.gris[3]); r(5, -9, 5, -4, c[0]);
  for (const cx of [-9, 9]) { R.disco(X(cx) + 0.5, y - 2.5 * s, 3.2 * s, K); R.disco(X(cx) + 0.5, y - 2.5 * s, 1.4 * s, a_OR.gris[3]); R.disco(X(cx) + 0.5, y - 2.5 * s, 0.5 * s, a_OR.gris[1]); }
  for (let i = Math.round(-17 * s); i <= 17 * s; i++) if ((i + 80) % 2) { const xx = x + i; R.pset(xx, y + 1, a_orMez(R.pget(xx, y + 1), K, 0.35)); }
}

const a_orHOR = 70, a_orSUELO = 152;

// los perfiles de las dunas (los mismos en 1957 y hoy: es lo que hace que se reconozca el sitio): las lejanas, la GRANDE
// (barlovento suave desde el mar, cresta en x 178, cara de caída empinada hacia el bosque), la baja de la izquierda y el
// primer término
const a_orY1 = (x) => 85 + 3 * Math.sin(x * 0.05 + 1) - 6 * Math.exp(-(((x - 62) / 24) ** 2)) - 3 * Math.exp(-(((x - 118) / 14) ** 2));

const a_orY2 = (x) => x <= 178 ? 50 + 52 * Math.pow(Math.max(0, (178 - x) / 190), 0.82) + 1.4 * Math.sin(x * 0.07) * Math.min(1, (178 - x) / 50) : 50 + 62 * a_orSm(-0.12, 1, (x - 178) / 74) - 62 * a_orSm(-0.12, 1, 0) + Math.max(0, x - 252) * 0.04;

const a_orXr = (y) => { const u = (y - 50) / 84; return 178 - 26 * u + 12 * Math.sin(u * Math.PI * 1.5); };   // el filo que baja de la cresta

const a_orToe = (x) => 134 - 22 * a_orSm(140, 215, x) + 2 * Math.sin(x * 0.1);   // el pie de la cara de caída

const a_orY3 = (x) => 109 + 21 * a_orSm(26, 172, x) - 6 * Math.exp(-(((x - 34) / 38) ** 2)) + 0.8 * Math.sin(x * 0.11);

const a_orY5 = (x) => 138 + 2.5 * Math.sin(x * 0.021 + 1) + 1.3 * Math.sin(x * 0.057);

const a_orYA = (x) => 121 + (x - 120) * 0.015, a_orYB = (x) => 128 + (x - 120) * 0.03;   // los bordes lejano y cercano de la carretera

// el fondo fijo de las dunas a ras de suelo (1957 u hoy), pintado una vez en su búfer B; soloSuelo: solo el terreno (para
// la franja limpia); planta: false quita el material de la plantación (o.hierba 0) y pone lo que la arena se traga.
// Devuelve .marca: los píxeles de hierba de 'hoy' que la franja limpia puede devolver a la arena
function a_orDunasFijo(R, hoy, B, soloSuelo = false, planta = true) {
  const P = a_OR, A = P.arena, G = P.hierba, hor = a_orHOR, marca = new Uint8Array(320 * 180), pset = R.pset;
  const verde = (x, y, k) => hoy && a_orRu(x * 0.045, y * 0.075, k) < 0.7;
  // tono de la arena: luz por la pendiente (el sol a la izquierda), rizaduras del viento que siguen el perfil, grano
  const arena = (x, y, d, p, k, luz = 3.5, esc = 1) => { let v = luz - p * 0.5; const r = Math.sin(d * 1.15 / esc + 2.4 * Math.sin(x * 0.085 / esc + k) + x * 0.03); if (r > 0.8) v -= 1.25; else if (r < -0.9) v += 0.5; v += (h(x, y, k) - 0.5) * 0.45 + (a_orRu(x * 0.035, y * 0.07, k) - 0.5) * 1.1; if (d < 1) v += 1.2; return v; };
  // tono de la hierba: montículos, penachos claros y huecos oscuros
  const prado = (x, y, d, p, k, luz = 3) => { let v = luz - p * 0.4 + (a_orRu(x * 0.22, y * 0.4, k) - 0.5) * 2.2; const q = h(x, y, k + 1); if (q < 0.1) v += 1.1; else if (q > 0.9) v -= 1; if (d < 1) v += 1; if ((x + (y >> 1) * 3) % 7 === 0 && h(x, y >> 1, k + 2) < 0.4) v += 0.8; return v; };
  const capa = (x0, x1, yT, yB, f) => { for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const a = Math.round(yT(x)), b = Math.min(179, Math.round(typeof yB === 'function' ? yB(x) : yB)), p = yT(x + 2) - yT(x - 2); for (let y = Math.max(0, a); y <= b; y++) { const c = f(x, y, y - a, p); if (c != null) pset(x, y, c); } } };
  // 1 · el cielo, el sol velado, el mar gris con su bruma y el cabo lejano con su faro
  a_orCielo(R, hor + 14, hoy ? P.cieloHoy : P.cielo57);
  { const [sx, sy, sr] = [232, 30, 7], halo = hoy ? hex('#fff8dc') : hex('#f4f0e0');
    for (let y = sy - 22; y <= sy + 22; y++) for (let x = sx - 22; x <= sx + 22; x++) { const d = Math.hypot(x - sx, y - sy); if (d > 22 || y < 16) continue; const k = 1 - d / 22; if (a_orU(x, y) < k * k * 1.4) pset(x, y, a_orMez(R.pget(x, y), halo, 0.5)); }
    R.disco(sx, sy, sr + 1, hoy ? hex('#ffe9a0') : hex('#f6f0dc')); R.disco(sx, sy, sr, hoy ? hex('#fff6cc') : hex('#fdfbf0')); }
  for (let y = hor; y < hor + 22; y++) for (let x = 0; x < 320; x++) { const v = 4.2 - Math.min(14, y - hor) * 0.3 + (h(x >> 2, y, 3) - 0.5) * 1.3 + (hoy ? -0.4 : 0); pset(x, y, a_orTono(hoy ? P.rio : P.mar, v, x, y)); }
  R.poligono([[0, 61], [10, 59], [24, 60], [36, 64], [50, 68], [60, hor], [0, hor]], (x, y) => a_orTono([hex('#6c8494'), hex('#88a0ac'), hex('#a4b8c0')], 1.2 - (y - 59) * 0.08 + (h(x, y, 4) - 0.5), x, y));
  for (let x = 2; x < 44; x += 3) { const y = Math.round(60 + Math.max(0, x - 22) * 0.2) - 1; if (x < 14 || x > 22) { pset(x, y, hex('#5e7888')); pset(x, y - 1, hex('#5e7888')); } }
  R.rect(17, 53, 18, 59, hex('#e8ecec')); pset(17, 52, hex('#5e7888')); pset(18, 52, hex('#5e7888')); R.rect(16, 59, 19, 59, hex('#c0c8cc'));
  for (let y = hor - 7; y <= hor + 5; y++) for (let x = 0; x < 320; x++) { const e = (1 - Math.abs(y - hor + 1) / 7) * (0.35 + 0.65 * a_orRu(x * 0.03, y * 0.3, 5)) * (hoy ? 0.5 : 1); if (e > a_orU(x, y) + 0.12) pset(x, y, a_orC.niebla); }
  // 2 · a la derecha, el bosque de pinos: la loma lejana azulada y el macizo oscuro
  capa(196, 319, (x) => 62 + 3 * Math.sin(x * 0.045) + (x % 5 < 2 ? 0 : 1) + 2 * h(x >> 1, 0, 6), 90, (x, y, d) => a_orTono([hex('#587a84'), hex('#6e909a'), hex('#8aa8ae')], 1.6 - d * 0.1 + (h(x, y, 7) - 0.5) * 1.2, x, y));
  capa(206, 319, (x) => 76 + 3 * Math.sin(x * 0.09 + 2) + ((x * 7) % 9 < 3 ? -3 : (x * 7) % 9 < 6 ? -1 : 0) + Math.max(0, 250 - x) * 0.12, 126, (x, y, d) => a_orTono(P.pino, 1.5 - d * 0.06 + (h(x, y, 8) - 0.5) * 1.6 + (h(x >> 1, y >> 2, 9) < 0.2 ? 1 : 0), x, y));
  // 3 · las dunas lejanas, entre el mar y la duna grande
  capa(0, 170, a_orY1, 112, (x, y, d, p) => { const c = verde(x, y, 10) && d > 2 ? a_orTono(G, prado(x, y, d, p, 11, 3.2), x, y) : a_orTono(A, arena(x, y, d, p * 1.6, 12, 3.7, 0.7), x, y); return a_orMez(c, a_orC.bruma, 0.3); });
  // 4 · la DUNA GRANDE: el barlovento rizado, el filo de la cresta que baja en ese hacia el primer término y la cara de caída en sombra
  capa(0, 319, a_orY2, 143, (x, y, d, p) => {
    const xr = a_orXr(y), toe = a_orToe(x), i = y * 320 + x;
    if (x > xr && y < toe) {   // la cara de caída, en sombra fría, con sus regueros de arena
      const dr = x - xr; let v = 0.3 + Math.min(0.9, dr * 0.012) + (h(x, y, 13) - 0.5) * 0.6 + (h((x * 2 - y) >> 2, 3, 14) < 0.16 ? 0.55 : 0) + (dr < 1.5 ? -0.5 : 0) + Math.max(0, 1 - (toe - y) / 9) * 0.9 + (d < 2 ? 0.8 : 0);
      if (hoy && d > 7 + 5 * a_orRu(x * 0.1, y * 0.1, 15)) { marca[i] = 1; return a_orTono(G, 2 + (a_orRu(x * 0.25, y * 0.4, 16) - 0.5) * 2 + (h(x, y, 17) < 0.1 ? 1 : 0), x, y); }
      return a_orTono(A, v, x, y);
    }
    if (x > xr && y >= toe) { const c = hoy ? (marca[i] = 1, a_orTono(G, prado(x, y, 9, 0, 18, 2.9), x, y)) : a_orTono(A, arena(x, y, y - toe + 6, 0, 19, 3.1), x, y); return c; }   // el llano al pie
    const dx = xr - x, filo = dx < 2, w = Math.sin(d * 0.13 - x * 0.035 + 1.6 * Math.sin(x * 0.028)), onda = d < 5 ? 0 : w > 0.9 ? -1.5 : w > 0.7 ? 0.7 : w * 0.25;
    if (hoy && !filo && d > 3 && a_orRu(x * 0.045, y * 0.075, 20) < 0.72) { marca[i] = 1; return a_orTono(G, prado(x, y, d, p, 21, 3.1 + onda * 0.6 + Math.min(0.5, dx * 0.004)), x, y); }
    return a_orTono(A, arena(x, y, d, p, 22, 3.3 + onda + (filo ? 1.5 : 0) - Math.min(0.5, d * 0.006)), x, y);
  });
  // la sombra que la cresta echa sobre el llano
  for (let y = 110; y < 124; y++) for (let x = 190; x < 262; x++) { const dd = y - a_orToe(x); if (x > a_orXr(y) && dd > 0 && dd < 5 && a_orU(x, y) < 0.6 - dd * 0.12) pset(x, y, a_orMez(R.pget(x, y), hoy ? G[0] : A[0], 0.55)); }
  // 5 · la carretera (en 1957, medio sepultada: la arena la cruza en lenguas y la tapa del todo hacia la izquierda)
  const carretera = (x0) => { for (let x = x0; x < 320; x++) { const ya = Math.round(a_orYA(x)), yb = Math.round(a_orYB(x)), ym = Math.round((ya + yb) / 2);
    for (let y = ya - 1; y <= yb + 1; y++) { const i = y * 320 + x; marca[i] = 0; const orilla = y < ya || y > yb;
      const tapada = !hoy && (a_orRu(x * 0.06, y * 0.2, 23) + a_orSm(300, 150, x) * 0.9 > 0.86 + (orilla ? -0.2 : 0));
      if (tapada) { pset(x, y, a_orTono(A, 3.4 + (h(x, y, 24) - 0.5) * 1.2, x, y)); continue; }
      let c = orilla ? (hoy ? P.gris[3] : a_orTono(A, 2.2, x, y)) : a_orTono(P.gris, (hoy ? 1.3 : 1.7) + (h(x, y, 25) - 0.5) * 0.9 + (y === ya ? 0.8 : 0), x, y);
      if (!orilla && y === ym && (x + 400) % 16 < 8) c = hoy ? a_orC.amarillo : P.gris[4];
      if (hoy && !orilla && (y === ya + 1 || y === yb - 1) && x % 2) c = a_orC.blanco;
      pset(x, y, c); } } };
  if (!hoy) carretera(104);
  // 6 · los pinos medio enterrados al pie de la cara de caída, la casa con la arena hasta las ventanas y los postes
  const PN = P.pino;
  for (const [x, b, a, seco] of [[268, 108, 44], [280, 104, 50], [306, 106, 46], [316, 110, 50], [294, 102, 44]]) a_orPino(R, x, b, a, PN, { seco });
  for (const [x, b, a, seco] of [[216, 126, 46], [226, 128, 54, 1], [234, 127, 50], [243, 128, 58], [252, 127, 48, !hoy], [260, 126, 52]]) a_orPino(R, x, b, a, PN, { seco: seco && !hoy, tronco: 0.34 });
  if (!hoy) { a_orPino(R, 212, 110, 9, PN, { tronco: 0.05 }); a_orPino(R, 224, 118, 12, PN, { tronco: 0.05 }); R.linea(203, 100, 205, 93, P.gris[2]); R.linea(205, 96, 207, 94, P.gris[2]); }   // copas que asoman de la arena
  // la arena (o la hierba) que sube por los troncos
  capa(204, 266, (x) => (hoy ? 123 : 115) + 2.5 * Math.sin(x * 0.17) + (hoy ? 0 : 3 * Math.sin(x * 0.06 + 1)), 122, (x, y, d, p) => hoy ? a_orTono(G, prado(x, y, d, p, 26, 2.8), x, y) : a_orTono(A, arena(x, y, d, p, 27, 3.3), x, y));
  { // la casa de madera
    const W = hoy ? [hex('#a8b4b0'), hex('#c6d0c8'), hex('#e2e8dc'), hex('#f4f4ea')] : [P.madera[0], P.madera[1], P.madera[2], P.madera[3]], x0 = 268, x1 = 304;
    R.rect(x0 - 1, 93, x1 + 1, 121, P.k); for (let y = 94; y <= 120; y++) for (let x = x0; x <= x1; x++) pset(x, y, a_orTono(W, 2 - (x - x0) / 36 * 0.9 + (y % 3 === 0 ? -1 : 0) + (h(x, y, 28) - 0.5) * 0.6, x, y));
    R.poligono([[x0 - 4, 94], [286, 79], [x1 + 5, 94]], P.k); R.poligono([[x0 - 2, 93], [286, 81], [x1 + 3, 93]], (x, y) => (y % 3 === 0 || (x + y * 2) % 7 === 0) ? (hoy ? a_orC.tejaS : P.gris[0]) : x < 286 ? (hoy ? a_orC.teja : P.gris[2]) : (hoy ? a_orC.tejaS : P.gris[1]));
    R.rect(295, 78, 299, 87, P.k); R.rect(296, 79, 298, 87, hoy ? a_orC.rojo : a_orC.rojoS); R.rect(296, 79, 298, 79, P.gris[3]);
    for (const wx of [272, 291]) { R.rect(wx, 99, wx + 9, 109, P.k); R.rect(wx + 1, 100, wx + 8, 108, hoy ? a_orC.cristal : a_orC.cristalS); R.rect(wx + 4, 100, wx + 4, 108, W[3]); R.rect(wx + 1, 104, wx + 8, 104, W[3]); pset(wx + 2, 101, a_orC.blanco); pset(wx + 3, 102, a_orC.blanco); if (hoy) { R.rect(wx + 1, 109, wx + 8, 110, a_orC.rojo); pset(wx + 3, 108, a_orC.amarillo); pset(wx + 6, 108, a_orC.blanco); } }
    R.rect(283, 104, 289, 120, P.k); R.rect(284, 105, 288, 120, hoy ? a_orC.rojoS : P.madera[0]); pset(287, 113, a_orC.amarillo);
    if (!hoy) { R.linea(281, 100, 279, 110, P.madera[0]); R.rect(280, 86, 282, 86, P.gris[1]); }   // una contraventana descolgada
    // la arena amontonada contra la fachada, hasta el alféizar (en 1957); el césped y la valla blanca (hoy)
    if (!hoy) capa(246, 319, (x) => 109 - 6 * Math.exp(-(((x - 266) / 11) ** 2)) + 3 * Math.sin(x * 0.19) + 2 * a_orSm(296, 320, x) * 3 - 3 * Math.exp(-(((x - 300) / 9) ** 2)), (x) => a_orYA(x) - 2, (x, y, d, p) => a_orTono(A, arena(x, y, d, p, 29, 3.5), x, y));
    else { capa(246, 319, () => 119, (x) => a_orYA(x) - 2, (x, y, d, p) => a_orTono(G, prado(x, y, d, p, 30, 3.2), x, y)); for (let x = 262; x < 320; x += 3) { R.rect(x, 116, x, 121, a_orC.blanco); } R.rect(262, 118, 319, 118, a_orC.blanco); }
  }
  // 7 · la duna baja de la izquierda (la que ya pisa la carretera) y el primer término
  capa(0, 176, a_orY3, 141, (x, y, d, p) => { if (y < a_orY2(x) + 2) return null; const i = y * 320 + x, sombra = x > 44 && x < 60 && d < (x - 44) * 0.9 && d < 9;
    if (hoy && d > 2 && a_orRu(x * 0.05, y * 0.09, 31) < 0.74) { marca[i] = 1; return a_orTono(G, prado(x, y, d, p, 32, sombra ? 2 : 3.2), x, y); }
    return a_orTono(A, arena(x, y, d, p, 33, sombra ? 2 : 3.4, 1.25), x, y); });
  if (hoy) { carretera(0); for (let x = 0; x < 118; x++) { const ya = Math.round(a_orYA(x)) - 2; for (let k = 0; k < 3; k++) pset(x, ya - k, a_orTono(G, 1 + k * 0.5 + h(x, k, 34), x, ya - k)); } }
  capa(0, 319, a_orY5, 179, (x, y, d, p) => { const i = y * 320 + x;
    if (hoy && !(Math.abs(y - (158 + 5 * Math.sin(x * 0.02 + 2))) < 3 + 1.5 * a_orRu(x * 0.1, 0, 35)) && a_orRu(x * 0.04, y * 0.08, 36) < 0.82) { marca[i] = 1; return a_orTono(G, prado(x, y, d, p, 37, 3.3 + (y - 138) * 0.012), x, y); }
    return a_orTono(A, arena(x, y, d, p * 2, 38, 3.3 + (y - 138) * 0.008 + 0.5 * Math.sin(x * 0.045 + y * 0.12), 1.9), x, y); });
  if (soloSuelo) return {};
  const snap = B.slice();
  // 8 · los postes del teléfono (en 1957, los de la izquierda torcidos y enterrados hasta el travesaño) y sus cables
  const postes = hoy ? [[316, 34, 0], [262, 34, 0], [212, 34, 0], [164, 33, 0], [116, 33, 0], [68, 32, 0], [20, 32, 0]] : [[316, 34, 0], [262, 33, 0.03], [212, 24, 0.1], [172, 11, 0.22]], puntas = [];
  for (const [x, alto, inc] of postes) { const b = Math.round(a_orYA(x)) - 1; for (let s = 0; s <= alto; s++) { const X = Math.round(x + s * inc), y = b - s; pset(X, y, P.madera[1]); pset(X + 1, y, P.madera[0]); } const tx = Math.round(x + alto * inc), ty = b - alto;
    R.linea(tx - 4, ty + 3 - Math.round(inc * 8), tx + 5, ty + 3 + Math.round(inc * 8), P.madera[0]); pset(tx - 4, ty + 2 - Math.round(inc * 8), P.gris[4]); pset(tx + 5, ty + 2 + Math.round(inc * 8), P.gris[4]); puntas.push([tx, ty + 2]); }
  for (let k = 0; k + 1 < puntas.length; k++) { const [ax, ay] = puntas[k], [bx, by] = puntas[k + 1]; for (let x = bx; x <= ax; x++) { const u = (x - bx) / Math.max(1, ax - bx), y = Math.round(by + (ay - by) * u + Math.sin(u * Math.PI) * 5); if (x % 4 !== 3) pset(x, y, P.hierro[1]); } }
  // 9 · el primer término: pisadas, un tronco de deriva, conchas y piedras; hoy, arbustos, pinos jóvenes y el sendero
  if (!hoy) { for (let k = 0; k < 12; k++) { const x = 196 + k * 9, y = 163 + Math.round(4 * Math.sin(k * 0.6)) + (k % 2) * 3; R.rect(x, y, x + 2, y, A[2]); pset(x + 1, y + 1, A[1]); }
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 50) * 318), y = 142 + Math.round(h(k, 2, 50) * 36); if (k % 3 === 0) { R.rect(x, y, x + 1, y, P.gris[2]); pset(x, y - 1, P.gris[4]); pset(x + 2, y + 1, A[1]); } else { pset(x, y, k % 3 === 1 ? a_orC.blanco : A[1]); } } }
  if (!hoy) {
    if (planta) { // el haz de estacas y el cajón de plantones, a los lados del sitio de los personajes
      for (let k = 0; k < 5; k++) { R.linea(8 + k * 2, 150 - k, 30 + k * 2, 146 - k, P.madera[k % 2 ? 3 : 2]); } R.rect(17, 143, 18, 150, P.gris[1]); for (let i = 6; i < 44; i++) if (i % 2) pset(i, 151, A[1]);
      R.rect(258, 143, 273, 151, P.k); R.rect(259, 144, 272, 150, P.madera[2]); R.rect(259, 144, 272, 144, P.madera[4]); R.rect(259, 147, 272, 147, P.madera[0]); for (let i = 0; i < 6; i++) { R.rect(260 + i * 2, 140 - (i % 2), 260 + i * 2, 143, G[2]); pset(261 + i * 2, 141, G[3]); } for (let i = 256; i < 276; i++) if (i % 2) pset(i, 152, A[1]);
    } else { // sin plantación (o.hierba 0): lo que la arena se va tragando
      // una rama de deriva blanqueada en vez del haz de estacas
      R.linea(8, 150, 30, 146, P.gris[2]); R.linea(8, 149, 30, 145, P.gris[4]); R.linea(18, 147, 23, 141, P.gris[3]); R.linea(23, 141, 27, 140, P.gris[3]); R.linea(13, 149, 10, 145, P.gris[2]); pset(30, 145, P.madera[2]); for (let i = 6; i < 34; i++) if (i % 2) pset(i, 151, A[1]);
      // un bidón oxidado medio enterrado en vez del cajón de plantones
      { const RU = [hex('#4e3128'), hex('#7c4a34'), hex('#a8683e'), hex('#c98a54')]; R.rect(259, 141, 272, 151, P.k); for (let y = 142; y <= 151; y++) for (let x = 260; x <= 271; x++) pset(x, y, a_orTono(RU, 2.6 - (x - 260) * 0.2 + (y === 145 || y === 149 ? -1.2 : 0) + (h(x, y, 53) - 0.5) * 0.9, x, y));
        R.rect(260, 139, 271, 141, P.k); R.rect(261, 140, 270, 140, P.gris[3]); R.rect(262, 139, 269, 139, P.gris[2]); R.rect(263, 140, 265, 140, P.gris[4]); pset(268, 140, P.k); R.rect(260, 145, 271, 145, RU[3]); R.rect(260, 149, 266, 149, RU[3]); R.rect(260, 146, 271, 146, RU[0]);
        for (let x = 254; x <= 276; x++) { const y0 = 151 - Math.round(4.5 * Math.exp(-(((x - 259) / 6) ** 2)) + 1.5 * Math.exp(-(((x - 272) / 3) ** 2))); for (let y = y0; y <= 152; y++) pset(x, y, y === y0 ? A[5] : a_orTono(A, 3.4 + (h(x, y, 54) - 0.5), x, y)); } for (let i = 262; i < 280; i++) if (i % 2) pset(i, 153, A[1]); }
      // los hitos de la carretera, cada vez más enterrados hacia la izquierda, y la señal de curva torcida
      for (let k = 0; k < 8; k++) { const x = 150 - k * 12, y = Math.round(a_orYA(x)) - 1, a = Math.max(1, 5 - k); R.rect(x, y - a, x, y, P.gris[4]); pset(x + 1, y - a + 1, P.gris[1]); pset(x, y - a, a > 2 ? a_orC.rojo : a_orC.blanco); if (a > 1) pset(x + 1, y + 1, A[1]); pset(x - 1, y + 1, A[5]); }
      { const bx = 126, by = 127; for (let s = 0; s <= 10; s++) { const X = bx + Math.round(s * 0.28); pset(X, by - s, P.gris[3]); pset(X + 1, by - s, P.gris[1]); }
        const cx = 130, cy = 111; for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const m = Math.abs(i) + Math.abs(j); if (m <= 7) pset(cx + i, cy + j, m >= 6 ? P.gris[0] : j > 1 && a_orU(cx + i, cy + j) < 0.2 + j * 0.1 ? A[3] : (i + j < -3 ? hex('#e8dca4') : hex('#d6c078'))); }
        for (const [i, j] of [[-1, 3], [-1, 2], [-1, 1], [-1, 0], [0, -1], [1, -2], [2, -2], [1, -3], [2, -3], [3, -2], [2, -1]]) pset(cx + i, cy + j, P.gris[0]);   // la flecha de curva
        for (let x = 122; x <= 134; x++) { const y0 = 127 - Math.round(2.4 * Math.exp(-(((x - 126) / 4) ** 2))); for (let y = y0; y <= 128; y++) pset(x, y, y === y0 ? A[5] : A[4]); } }
    }
    // la pala clavada
    R.rect(36, 128, 36, 147, P.madera[2]); R.rect(37, 128, 37, 147, P.madera[0]); R.rect(34, 127, 39, 128, P.madera[1]); R.rect(34, 146, 39, 152, P.k); R.rect(35, 147, 38, 151, P.gris[3]); R.rect(35, 147, 35, 151, P.gris[4]);
    a_orTronco(R, 196, 173, 15, 3, A, 81);
  }
  a_orTronco(R, 62, 168, 29, 5, hoy ? [G[0], G[0], G[1], G[2], G[3], G[4]] : A, 82);
  if (hoy) {
    const arbusto = (x, y, r) => { R.disco(x, y - r * 0.6, r, G[0]); R.disco(x - 1, y - r * 0.8, r * 0.75, G[1]); R.disco(x - 2, y - r, r * 0.4, G[2]); for (let i = -r; i <= r; i++) if ((i + 20) % 2) pset(Math.round(x + i), Math.round(y + 1), G[0]); if (h(x, y, 52) < 0.5) { pset(x + 1, Math.round(y - r), a_orC.amarillo); pset(x - 2, Math.round(y - r * 0.5), a_orC.amarillo); } };
    for (const [x, y, r] of [[30, 112, 4], [58, 118, 3], [88, 108, 3], [112, 96, 4], [134, 84, 3], [150, 104, 4], [96, 126, 3], [168, 92, 3], [196, 116, 3], [18, 132, 4], [142, 132, 3], [232, 142, 4], [300, 141, 5], [8, 146, 5]]) arbusto(x, y, r);
    for (const [x, b, a] of [[22, 108, 16], [74, 104, 20], [102, 92, 14], [126, 100, 22], [146, 78, 12], [160, 96, 18], [46, 122, 15], [186, 108, 16], [118, 118, 12]]) a_orPino(R, x, b, a, PN, { viento: 0.5 });
    for (const [x, b, a] of [[4, 150, 30], [314, 146, 26]]) a_orPino(R, x, b, a, PN, { viento: 0.6 });
  }
  if (hoy) for (let i = 0; i < marca.length; i++) if (marca[i] && B[i] !== snap[i]) marca[i] = 0;
  return { marca };
}
function a_orDunas(R, t, o) {
  const hoy = o.epoca === 'hoy', P = a_OR, A = P.arena, G = P.hierba, hor = a_orHOR, suelo = a_orSUELO;
  const planta = (o.hierba ?? 0.7) > 0;   // con o.hierba 0 no hay plantación: ni hileras, ni camioneta, ni operarios, ni cajón
  const F = a_orFijo(R, hoy ? 'dunasHoy' : planta ? 'dunas57' : 'dunas57s', (B) => a_orDunasFijo(R, hoy, B, false, planta));
  R.copiar(F.b);
  const lim = hoy ? Math.max(0, Math.min(1, o.limpia ?? 0)) : 0;
  // las nubes: cirros lentos y dos términos de cúmulos que el viento del mar lleva tierra adentro
  const N = hoy ? P.nubeHoy : P.nube, tapa = (x, y) => y >= a_orY2(x) - 1 || (x > 196 && y > 60);
  a_orCirros(R, t, N[2]);
  for (let k = 0; k < 7; k++) { const cx = ((k * 61 + 20 + t * (1.2 + (k % 3) * 0.4)) % 400) - 40; a_orNubeTras(R, cx, 60 + (k % 3) * 3, 12 + (k % 4) * 3, [N[0], a_orMez(N[1], a_orC.bruma, 0.4), N[1]], tapa); }   // los cúmulos lejanos, casi quietos sobre el horizonte
  for (const [x0, y, w, v] of [[30, 42, 26, 5], [200, 38, 22, 4], [330, 46, 30, 5.5], [110, 31, 34, 9], [300, 29, 40, 10.5], [400, 44, 20, 6.5], [250, 50, 18, 5]]) { const cx = ((x0 + t * v) % 440) - 60, w2 = w * a_orSm(268, 214, cx); if (w2 > 4 && cx + w * 0.7 > 0) a_orNubeTras(R, cx, y, w2, N, tapa); }
  // el faro, que da su destello
  if (Math.floor(t * 0.8) % 3 === 0) { R.pset(17, 52, a_orC.amarillo); R.pset(18, 52, a_orC.blanco); R.pset(19, 52, a_orC.amarillo); R.pset(16, 52, a_orC.amarillo); }
  // las rompientes: líneas de espuma que avanzan hacia la playa
  for (let k = 0; k < 4; k++) { const u = ((t * 0.16 + k / 4) % 1), y = Math.round(hor + 2 + u * 10); for (let x = 0; x < 150; x++) { if (y >= a_orY1(x) - 1 || y >= a_orY2(x) - 1) continue; const e = Math.sin(x * 0.11 + k * 2 + t * 0.6) + Math.sin(x * 0.043 + k); if (e > 0.5 - u * 0.6) R.pset(x, y + Math.round(Math.sin(x * 0.2 + t) * 0.6), u > 0.7 ? a_orC.blanco : P.mar[4]); } }
  // gaviotas que aguantan contra el viento
  for (let k = 0; k < 4; k++) { const x = Math.round(40 + k * 34 + Math.sin(t * 0.5 + k * 2) * 14 - ((t * 3 + k * 20) % 60) * 0.3), y = Math.round(44 + k * 5 + Math.sin(t * 1.1 + k) * 3 - (k === 3 ? 12 : 0)); R.gaviota(x, y, t * 0.6, k); }
  if (!hoy) {
    // EL VIENTO, que es de lo que va el plano. 1 · velos de arena tramados que cruzan por delante del bosque y de la cara de caída
    for (let k = 0; k < 3; k++) { const x = ((k * 163 + t * (38 + k * 11)) % 470) - 130; a_orVelo(R, x, 92 + k * 10 + Math.sin(t * 0.7 + k) * 3, 80 + k * 14, 5 + k, A[4], 0.3 + 0.08 * k, 20 + k); }
    // 2 · los granos que saltan de las crestas y caen por la cara de sombra
    for (let k = 0; k < 300; k++) { const xc = 70 + h(k, 1, 55) * 110, u = (t * (0.45 + h(k, 2, 55) * 0.5) + h(k, 3, 55)) % 1, g = 0.5 + 0.5 * Math.sin(t * 0.9 + xc * 0.02), cerca = Math.max(0, 1 - (178 - xc) / 60);
      const x = Math.round(xc + u * (22 + 44 * g * (0.4 + cerca))), y = Math.round(a_orY2(xc) - 1 - Math.sin(u * 2.4) * (2 + (3 + 6 * cerca) * h(k, 4, 55)) + u * u * 22 * cerca);
      if (u < 0.94 && a_orU(x, y) > u * 0.8) { R.pset(x, y, u < 0.4 ? A[5] : A[4]); if (u < 0.6 && k % 2 === 0) R.pset(x + 1, y, A[5]); if (u < 0.25 && k % 3 === 0) R.pset(x + 2, y, A[5]); } }
    // 3 · la ventisca que corre pegada a todo el filo del barlovento, más alta cuanto más cerca de la cresta
    for (let x = 56; x < 180; x++) { const cer = (x - 56) / 124, n = a_orRu(x * 0.1 - t * 4.2, 0.5, 49), alto = Math.round((1 + 5.5 * cer) * n * 1.5), yb = Math.round(a_orY2(x)) - 1;
      for (let j = 0; j < alto; j++) { const y = yb - j; if (y < 22) break; if (j < alto * 0.4 || a_orU(x, y) < 0.62 - j / alto * 0.35) R.pset(x, y, j < 1 ? A[5] : j < alto * 0.5 ? A[4] : A[3]); } }
    // 4 · los penachos: el grande de la cresta (178, 50), el de la duna baja de la izquierda y dos pequeños en las dunas lejanas
    a_orPenacho(R, t, 62, Math.round(a_orY1(62)), { largo: 22, esc: 0.3, fuerza: 0.8, k: 3, tapa: (x, y) => y >= a_orY2(x) - 1 });
    a_orPenacho(R, t, 118, Math.round(a_orY1(118)), { largo: 16, esc: 0.25, fuerza: 0.7, k: 5, tapa: (x, y) => y >= a_orY2(x) - 1 });
    a_orPenacho(R, t, 178, 50, { largo: 90, esc: 1, fuerza: 1.15, k: 0 });
    a_orPenacho(R, t, 34, Math.round(a_orY3(34)), { largo: 40, esc: 0.42, fuerza: 0.95, k: 1 });
    // la cortina: la arena que el penacho deja caer, clara sobre la sombra de la cara de caída
    for (let y = 51; y < 104; y++) { const xr = Math.ceil(a_orXr(y)) + 1, fy = 1 - (y - 50) / 58; for (let x = xr; x < xr + 38; x++) { if (y >= a_orToe(x) - 1) break; const e = (1 - (x - xr) / 38) * fy * a_orRu(x * 0.11 - t * 2.6, y * 0.15 - t * 2.2, 45); if (e * 2 > a_orU(x, y) + 0.34) R.pset(x, y, e > 0.42 ? A[3] : A[2]); } }
    // 5 · los regueros: pequeñas avalanchas de arena clara que resbalan por la cara de caída
    for (let k = 0; k < 6; k++) { const u = (t * (0.3 + (k % 3) * 0.05) + k * 0.19) % 1, ya = 56 + k * 7, xa = a_orXr(ya) + 4 + (k % 2) * 5, rec = 16 + k * 5;
      for (let s = 0; s < 8; s++) { const d = u * rec + s, y = Math.round(ya + d), x = Math.round(xa + d * 0.8 + Math.sin(d * 0.5 + k)); if (x <= a_orXr(y) + 1 || y >= a_orToe(x) - 1) continue; R.pset(x, y, s > 5 ? A[4] : s > 2 ? A[3] : A[2]); if (s > 4) R.pset(x + 1, y, A[3]); } }
    // 6 · la arena que sube rasando por el barlovento: hebras largas que siguen la pendiente
    for (let k = 0; k < 22; k++) { const u = (t * (0.3 + h(k, 7, 55) * 0.26) + h(k, 8, 55)) % 1, x0 = 4 + u * 176, d = 4 + h(k, 9, 55) * 36, L = 9 + Math.round(h(k, 10, 55) * 14);
      for (let j = 0; j < L; j++) { const x = Math.round(x0 + j), y = Math.round(a_orY2(x) + d + 1.1 * Math.sin(x * 0.19 + k)); if (x > 319 || x >= a_orXr(y) - 2 || y >= a_orY3(x) - 2) continue; const punta = j < 2 || j > L - 4; if (punta && j % 2) continue; R.pset(x, y, A[5]); if (!punta && (x & 1) && k % 2) R.pset(x, y + 1, A[2]); } }
    // lo mismo, más flojo, en la duna baja
    for (let k = 0; k < 36; k++) { const xc = 8 + h(k, 5, 55) * 60, u = (t * 0.6 + h(k, 6, 55)) % 1, x = Math.round(xc + u * 22), y = Math.round(a_orY3(xc) - 1 - Math.sin(u * 2.6) * 3 + u * u * 6); if (a_orU(x, y) > u * 0.8) R.pset(x, y, A[5]); }
    a_orRachas(R, t, 0, 176, 92, 108, 5, A[5], 56); a_orRachas(R, t, 150, 319, 122, 133, 5, A[4], 57); a_orRachas(R, t, 0, 319, 140, 150, 5, A[5], 58);
    // 7 · las serpientes de arena que cruzan el llano del primer término (detrás de los personajes)
    for (let k = 0; k < 9; k++) { const v = 64 + h(k, 11, 55) * 60, x0 = ((h(k, 12, 55) * 430 + t * v) % 430) - 60, y0 = 141 + h(k, 13, 55) * 37, L = 16 + Math.round(h(k, 14, 55) * 20);
      for (let j = 0; j < L; j++) { const x = Math.round(x0 + j); if (x < 0 || x > 319) continue; const y = Math.round(y0 + 2.2 * Math.sin((x0 + j) * 0.085 + k * 2)), e = Math.sin(j / L * Math.PI); if (e < 0.35 && j % 2) continue; R.pset(x, y, A[5]); if (e > 0.75 && (x & 1)) R.pset(x, y + 1, A[2]); } }
    // las hileras de hierba de playa recién plantada, con sus estacas y sus cordeles (o.hierba)
    const nh = !planta ? 0 : Math.round(Math.max(0, Math.min(1, o.hierba ?? 0.7)) * 6), G = P.hierba;
    for (let k = 0; k < nh; k++) { const x0 = 4 + k * 3, x1 = 148 - k * 7, yy = (x) => Math.round(a_orY3(x) + 4 + k * 4.6 + (x - 80) * k * 0.012);
      if (yy(x0) > 139) continue;
      for (let x = x0; x <= x1; x++) if (x % 3 !== 1) R.pset(x, yy(x) - 1, P.madera[2]);
      for (let x = x0 + 3; x < x1 - 1; x += 6 + (k > 3 ? 1 : 0)) { const y = yy(x), m = Math.sin(t * 3 + x * 0.3 + k) > 0.2 ? 1 : 0; R.pset(x, y, G[1]); R.pset(x, y - 1, G[2]); R.pset(x + m, y - 2, G[3]); R.pset(x - 1, y - 1, G[1]); R.pset(x + 1 + m, y - 1, G[3]); if (k > 1) R.pset(x + m * 2, y - 3, G[4]); R.pset(x + 1, y + 1, A[1]); }
      for (const x of [x0, x1]) { const y = yy(x); R.rect(x, y - 4, x, y, P.madera[1]); R.pset(x, y - 5, a_orC.rojo); R.pset(x + (Math.sin(t * 6 + k) > 0 ? 1 : 2), y - 5, a_orC.rojo); } }
    for (const [x, y, a] of [[214, 147, 6], [306, 149, 7], [128, 173, 5], [236, 166, 5], [102, 146, 4]]) a_orMata(R, x, y, a, t, P.mata, x);   // matas nativas sueltas
    if (planta) {
      // la camioneta del servicio forestal y los dos operarios que plantan (solo si hay plantación: o.hierba > 0)
      a_orCamion(R, 134, 136, undefined, -1);
      { const u = (t * 0.5) % 1; for (let k = 0; k < 3; k++) R.pset(151 + Math.round(u * 5) + k, 132 - Math.round(u * 3) - k % 2, a_orMez(R.pget(152 + k, 130), A[5], 0.6)); }
      R.rect(120, 123, 127, 125, P.mata[0]); for (let i = 0; i < 4; i++) R.pset(121 + i * 2, 122 - (Math.sin(t * 3 + i) > 0 ? 1 : 0), P.mata[2]);   // las matas en la caja
      a_orMini(R, 58, Math.round(a_orY3(58)) + 13, { agachado: Math.sin(t * 1.6) > 0.1, ropa: a_orC.verdeFS, gorro: a_orC.caqui, ala: true });
      a_orMini(R, 92, Math.round(a_orY3(92)) + 9, { agachado: Math.sin(t * 1.6 + 2) > 0.3, ropa: a_orC.caqui, gorro: a_orC.verdeFSs, dir: -1, ala: true });
      R.rect(64, Math.round(a_orY3(64)) + 10, 67, Math.round(a_orY3(64)) + 12, P.madera[2]); R.pset(65, Math.round(a_orY3(64)) + 9, P.mata[2]); R.pset(66, Math.round(a_orY3(64)) + 8, P.mata[1]);   // el cajón de plantones
    }
  } else {
    // la franja limpia: donde se ha quitado la hierba vuelve la arena de 1957 (y vuelve a moverse)
    if (lim > 0) { const S = a_orFijo(R, 'dunasArena', (B) => a_orDunasFijo(R, false, B, true)).b, M = F.extra.marca, B = R.buf;
      for (let y = 84; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!M[i]) continue; const e = Math.hypot((x - 150) / 210, (y - 156) / 62) + (a_orRu(x * 0.09, y * 0.12, 59) - 0.5) * 0.22; if (e < lim * 1.08) B[i] = e > lim * 1.08 - 0.035 ? (a_orU(x, y) < 0.5 ? P.madera[1] : G[0]) : S[i]; }
      const xa = Math.max(0, 150 - 200 * lim), xb = Math.min(319, 150 + 200 * lim); if (lim > 0.25) { a_orRachas(R, t, xa + 20, xb - 20, 150 - 40 * lim, 172, Math.round(8 * lim), A[5], 60); } }
    // el viento en la hierba: olas claras que corren por el prado
    { const M = F.extra.marca, B = R.buf; for (let k = 0; k < 520; k++) { const x = Math.round(h(k, 1, 64) * 319), y = 80 + Math.round(h(k, 2, 64) * 99), i = y * 320 + x; if (!M[i] || !G.includes(B[i])) continue; const w = Math.sin(x * 0.06 - t * 2.4 + y * 0.09 + Math.sin(y * 0.05) * 2); if (w > 0.55 && lim * 1.08 <= Math.hypot((x - 150) / 210, (y - 156) / 62) + 0.12) { B[i] = G[5]; if (y > 100 && x < 319) B[i - 320 + 1] = G[4]; } } }
    // un coche pequeño por la carretera y dos paseantes en la cresta
    { const u = (t * 0.07 + 0.2) % 1, x = Math.round(340 - u * 380), y = Math.round((a_orYA(x) + a_orYB(x)) / 2) + 1; R.rect(x - 5, y - 3, x + 5, y - 1, a_orC.rojo); R.rect(x - 3, y - 5, x + 2, y - 4, a_orC.rojoS); R.rect(x - 2, y - 5, x + 1, y - 5, a_orC.cristal); R.pset(x - 3, y, P.k); R.pset(x + 3, y, P.k); R.pset(x - 6, y - 2, a_orC.amarillo); }
    { const va = 12 - Math.abs(((t * 1.4) % 24) - 12), d = ((t * 1.4) % 24) < 12 ? 1 : -1;
      a_orMini(R, 150 + Math.round(va), Math.round(a_orY2(150 + va)) + 1, { ropa: a_orC.azul, gorro: a_orC.rojo, paso: t, dir: d });
      a_orMini(R, 142 + Math.round(va), Math.round(a_orY2(142 + va)) + 1, { ropa: a_orC.naranja, gorro: P.madera[1], paso: t + 0.3, dir: d }); }
    // la señal redonda de la planta tachada
    if (o.senal !== false && PIEZAS_DU.senalHierba) PIEZAS_DU.senalHierba(R, 262, 151, {});
  }
  return { suelo, horizonte: hor, sol: [232, 30], cresta: [178, 50], faro: [17, 52], carretera: { x0: hoy ? 0 : 150, x1: 319, yLejos: [Math.round(a_orYA(0)), Math.round(a_orYA(319))], yCerca: [Math.round(a_orYB(0)), Math.round(a_orYB(319))] }, casa: { x0: 268, x1: 304, tejado: 80, puerta: [286, 120], ventanas: [[276, 104], [295, 104]] },
    pala: hoy ? null : [36, 150], cajon: hoy || !planta ? null : [265, 151], camion: hoy || !planta ? null : [134, 136], operarios: hoy || !planta ? null : [[58, 124], [92, 130]], hileras: { x0: 4, x1: 148, y0: 108, y1: 138 }, senal: hoy ? [262, 151] : null, tronco: [77, 167], limpia: { cx: 150, cy: 156, rx: 210, ry: 62 }, libre: [52, 240] };
}
// la nube que pasa por detrás de las dunas y del bosque: la misma de a_orNube, recortada por lo que tapa(x, y) diga
function a_orNubeTras(R, cx, cy, w, N, tapa) {
  const ps = R.pset; R.pset = (x, y, c) => { if (!tapa(x, y)) ps(x, y, c); };
  try { a_orNube(R, cx, cy, w, N, 84); } finally { R.pset = ps; }
}

const a_orCosta = (y) => 60 + 9 * Math.sin(y * 0.03 + 1) + 4 * Math.sin(y * 0.11) + y * 0.04;

const a_orBosque = (y) => 204 + 12 * Math.sin(y * 0.027 + 2) + 30 * (a_orRu(y * 0.075, 1, 70) - 0.5) + 8 * (a_orRu(y * 0.3, 2, 70) - 0.5);

const a_orRio = (x) => 142 + 10 * Math.sin(x * 0.024 + 0.6) + 4 * Math.sin(x * 0.06);

const a_orVia = (y) => 254 + 5 * Math.sin(y * 0.03);

const a_orLAGOS = [[178, 48, 13, 6], [190, 96, 9, 5], [146, 76, 6, 3], [168, 122, 7, 3]];

function a_orAireFijo(R, hoy) {
  const P = a_OR, A = P.arena, G = P.hierba, pset = R.pset;
  for (let y = 0; y < 180; y++) { const xc = a_orCosta(y), xf = a_orBosque(y);
    for (let x = 0; x < 320; x++) {
      const yr = a_orRio(x), wr = 3 + 6 * a_orSm(210, 70, x) + (x < xc + 12 ? (xc + 12 - x) * 0.5 : 0), dr = Math.abs(y - yr); let c;
      if (dr < wr && x > xc - 14) c = a_orTono(P.rio, 1.6 + (wr - dr) * -0.12 + (dr > wr - 1.3 ? 2.2 : 0) + (h(x >> 1, y, 71) - 0.5) * 0.8, x, y);
      else if (x < xc) { const d = xc - x; c = a_orTono(P.mar, 3.6 - d * 0.055 + 0.5 * Math.sin((x * 0.9 + y * 0.35) * 0.5) * (d < 30 ? 1 : 0.5) + (h(x >> 1, y, 72) - 0.5) * 0.8, x, y); }
      else if (x < xc + 6) c = a_orTono(A, 2.2 + (x - xc) * 0.35 + (h(x, y, 73) - 0.5) * 0.6, x, y);
      else if (x < xf) {
        // las dunas: crestas en media luna paralelas a la costa; la cara del mar clara y la de tierra en sombra
        const f = ((x - xc) * 0.2 + 2.3 * Math.sin(y * 0.06 + x * 0.012) + 1.2 * Math.sin(y * 0.021 + 1) + 1.1 * Math.sin(y * 0.15 + x * 0.07) * a_orRu(x * 0.03, y * 0.03, 69)) / (2 * Math.PI), s = f - Math.floor(f);
        let v = s < 0.64 ? 2.5 + 2.3 * s / 0.64 : 0.7 + (s - 0.64) * 3.2; v += (h(x, y, 74) - 0.5) * 0.7; if (s < 0.64 && (x + y * 2) % 5 === 0) v -= 0.5;
        const cubre = hoy ? a_orRu(x * 0.05, y * 0.06, 75) < 0.74 && x > xc + 12 : a_orRu(x * 0.06, y * 0.07, 75) < 0.2 && x > xc + 30;
        c = cubre ? a_orTono(G, v * 0.75 + 0.4 + (h(x, y, 76) < 0.15 ? 1 : 0), x, y) : a_orTono(A, v, x, y);
        if (xf - x < 9 && h(x, y, 77) < 0.16 + (hoy ? 0.2 : 0)) c = P.pino[h(x, y, 78) < 0.5 ? 1 : 2];   // copas que aún asoman de la arena
      } else c = a_orTono(P.pino, 1.3 + (a_orRu(x * 0.16, y * 0.2, 79) - 0.5) * 1.8 + (h(x, y, 80) < 0.16 ? 1 : h(x, y, 80) > 0.9 ? -1 : 0) + (x - xf < 2 ? -1 : 0), x, y);
      pset(x, y, c);
    } }
  // los lagos entre las dunas, con su orla de juncos
  for (const [cx, cy, rx, ry] of a_orLAGOS) for (let y = cy - ry - 2; y <= cy + ry + 2; y++) for (let x = cx - rx - 2; x <= cx + rx + 2; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 1, y >> 1, 81) - 0.5) * 0.3; if (e < 1) pset(x, y, a_orTono(P.rio, 1.2 + e * 1.6 + (y < cy - ry * 0.3 ? 0.8 : 0), x, y)); else if (e < 1.5) pset(x, y, (x + y) % 2 ? G[1] : G[2]); }
  // la barra de arena de la desembocadura
  for (let x = 40; x < 66; x++) { const y0 = Math.round(a_orRio(x) + 9 + (x - 40) * 0.12); for (let j = 0; j < 3 + (x > 50 ? 1 : 0); j++) pset(x, y0 + j, a_orTono(A, 3 + j * 0.5, x, y0 + j)); }
  // la carretera de la costa (norte–sur por el borde del bosque) con su claro, y el puente sobre el río
  for (let y = 0; y < 180; y++) { const x = Math.round(a_orVia(y)); pset(x - 1, y, hoy ? G[2] : A[2]); pset(x + 1, y, hoy ? G[1] : A[1]); pset(x, y, P.gris[hoy ? 2 : 3]); if (!hoy && h(x, y, 82) < 0.14 && y < 100) { pset(x, y, A[3]); pset(x - 2, y, A[3]); } }
  { const yb = Math.round(a_orRio(256)), xb = Math.round(a_orVia(yb)); R.rect(xb - 2, yb - 6, xb + 2, yb + 6, P.hormigon[1]); R.rect(xb - 1, yb - 6, xb + 1, yb + 6, P.hormigon[3]); R.rect(xb, yb - 6, xb, yb + 6, P.gris[3]); for (const j of [-3, 3]) { pset(xb - 3, yb + j, P.hormigon[4]); pset(xb + 3, yb + j, P.hormigon[4]); } for (let j = -5; j <= 5; j++) pset(xb + 4, yb + j, a_orMez(R.pget(xb + 4, yb + j), P.k, 0.4)); }
  // Florence: el claro del pueblo en la orilla norte, con sus calles y sus tejados; el muelle y los campos
  { const x0 = 262, x1 = 304; for (let x = x0 - 3; x <= x1 + 3; x++) { const yb = Math.round(a_orRio(x)) - 8, y0 = yb - 30 + Math.round(4 * Math.sin(x * 0.2)); for (let y = y0; y <= yb + 2; y++) pset(x, y, a_orTono([hex('#7e8e62'), hex('#9aa674'), hex('#b8bc8a'), hex('#d0cca0')], 1.6 + (a_orRu(x * 0.3, y * 0.3, 83) - 0.5) * 2, x, y)); }
    const TJ = [P.gris[2], a_orC.teja, P.gris[3], a_orC.tejaS, hex('#c8c0a8'), P.gris[1]];
    for (let cx = x0; cx < x1; cx += 7) { const yb = Math.round(a_orRio(cx)) - 10; for (let k = 0; k < 4; k++) { const y = yb - k * 7; R.rect(cx - 1, y + 5, cx + 6, y + 5, P.gris[3]); if (h(cx, k, 84) < 0.82) { const w = 3 + Math.round(h(cx, k, 85) * 2), c = TJ[Math.floor(h(cx, k, 86) * 6)]; R.rect(cx, y, cx + w, y + 3, c); R.rect(cx, y, cx + w, y, a_orMez(c, a_orC.blanco, 0.4)); R.rect(cx + 1, y + 4, cx + w + 1, y + 4, a_orMez(R.pget(cx + 1, y + 4), P.k, 0.4)); } }
      for (let y = yb - 24; y <= yb + 5; y++) pset(cx - 2, y, P.gris[3]); }
    for (let x = 270; x < 296; x += 8) { const y = Math.round(a_orRio(x)) - 4; R.rect(x, y, x + 1, y + 4, P.madera[3]); }   // los pantalanes
    for (let k = 0; k < 4; k++) { const x = 216 + k * 8, y = Math.round(a_orRio(x)) + 12; R.rect(x, y, x + 6, y + 8, k % 2 ? hex('#8a9a5a') : hex('#a8a66a')); for (let j = 1; j < 8; j += 2) R.rect(x, y + j, x + 6, y + j, k % 2 ? hex('#7a8a4e') : hex('#989660')); }   // los campos del sur
  }
  // la calima: lo de arriba queda más lejos y se aclara (y deja tranquilas la barra del año y la esquina de Atom)
  for (let y = 0; y < 46; y++) for (let x = 0; x < 320; x++) { const a = (1 - y / 46) * (x > 268 ? 1.25 : 1); if (a * a * 0.95 > a_orU(x, y)) pset(x, y, a_orMez(R.pget(x, y), a_orC.bruma, 0.72)); else pset(x, y, a_orMez(R.pget(x, y), a_orC.bruma, a * 0.35)); }
  return {};
}

function a_orAire(R, t, o) {
  const hoy = o.epoca === 'hoy', P = a_OR, A = P.arena;
  R.copiar(a_orFijo(R, hoy ? 'aireHoy' : 'aire57', () => a_orAireFijo(R, hoy)).b);
  // la espuma de las olas contra la playa y la marejada que entra
  for (let y = 8; y < 180; y++) { const xc = a_orCosta(y); for (let k = 0; k < 3; k++) { const d = 2 + k * 6 + 2.5 * Math.sin(t * 1.3 + k * 2.1 + y * 0.09) + ((t * 2 + k * 3) % 6) * (k ? 0.6 : 0); if (h(y >> 1, k, 87 + Math.floor(t * 1.5 + k) % 3) < 0.72 - k * 0.15) { const x = Math.round(xc - d); R.pset(x, y, k ? P.mar[4] : a_orC.blanco); if (!k) R.pset(x - 1, y, a_orC.blanco); } }
    for (let k = 0; k < 3; k++) { const x = Math.round(((k * 21 + t * 3) % 60) - 6 + 3 * Math.sin(y * 0.05 + k)); if (x < xc - 22 && x >= 0 && (y + k * 5 + Math.floor(t * 2)) % 9 < 5) R.pset(x, y, P.mar[2]); } }
  // destellos en el río y en los lagos, una barca que sale a la mar y un coche por la carretera
  for (let k = 0; k < 26; k++) { const x = 70 + Math.round(h(k, 1, 90) * 240), y = Math.round(a_orRio(x) + (h(k, 2, 90) - 0.5) * 5); if (Math.sin(t * 3 + k * 1.9) > 0.5) R.pset(x, y, P.rio[4]); }
  for (const [cx, cy, rx] of a_orLAGOS) if (Math.sin(t * 2 + cx) > 0) { R.pset(cx - 2 + Math.round(Math.sin(t + cx) * rx * 0.4), cy - 1, P.rio[4]); R.pset(cx + 2, cy + 1, P.rio[3]); }
  { const u = (t * 0.035 + 0.3) % 1, x = Math.round(200 - u * 150), y = Math.round(a_orRio(x)); R.rect(x - 2, y - 1, x + 2, y, a_orC.blanco); R.pset(x - 3, y, a_orC.blanco); R.pset(x, y - 1, a_orC.rojo); for (let k = 1; k < 7; k++) if (k % 2) { R.pset(x + 2 + k, y - 1 - (k >> 2), P.rio[4]); R.pset(x + 2 + k, y + 1 + (k >> 2), P.rio[4]); } }
  { const u = (t * 0.06 + 0.1) % 1, y = Math.round(190 - u * 200), x = Math.round(a_orVia(y)); R.rect(x, y, x, y + 2, hoy ? a_orC.rojo : a_orC.verdeFS); R.pset(x, y, a_orC.blanco); }
  // la arena que vuela de cresta en cresta
  if (!hoy) { a_orRachas(R, t, 84, 190, 20, 60, 5, A[5], 91); a_orRachas(R, t, 86, 196, 62, 126, 8, A[5], 92); a_orRachas(R, t, 80, 200, 150, 178, 4, A[5], 93); }
  // gaviotas sobre la rompiente (desde arriba: dos alas blancas)
  for (let k = 0; k < 5; k++) { const y = Math.round(((k * 43 + t * (5 + k)) % 200) - 10), x = Math.round(a_orCosta(Math.max(0, y)) - 10 + k * 5 + 5 * Math.sin(t * 0.8 + k)), a = Math.sin(t * 8 + k) > 0 ? 1 : 0; if (y > 22) { R.pset(x, y, a_orC.blanco); R.pset(x - 1, y - a, a_orC.blanco); R.pset(x + 1, y - a, a_orC.blanco); R.pset(x + 3, y + 3, a_orMez(R.pget(x + 3, y + 3), P.k, 0.3)); } }
  // las nubes de abajo, con su sombra sobre la tierra
  for (const [x0, y0, w, v] of [[20, 70, 30, 7], [190, 128, 38, 9], [300, 58, 26, 8], [120, 164, 30, 10]]) { const cx = ((x0 + t * v) % 420) - 50, cy = y0 + 4 * Math.sin(x0);
    for (let j = -w * 0.3; j <= w * 0.22; j++) for (let i = -w * 0.6; i <= w * 0.6; i++) { const x = Math.round(cx + i + 12), y = Math.round(cy + j + 14); if (x < 0 || x > 319 || y < 0 || y > 179) continue; if ((i / (w * 0.6)) ** 2 + (j / (w * 0.3)) ** 2 < 1 && a_orU(x, y) < 0.62) R.pset(x, y, a_orMez(R.pget(x, y), P.k, 0.3)); }
    a_orNube(R, cx, cy, w, P.nubeHoy); }
  // la sombra de la avioneta, que corre por la arena (o.sombra: [x, y]; por omisión, sube sola por las dunas)
  const sm = Array.isArray(o.sombra) ? o.sombra : [Math.round(122 + 22 * Math.sin(t * 0.23)), Math.round(158 - ((t * 7) % 80))];
  if (o.sombra !== false) { const [sx, sy] = sm, pt = (x, y) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, a_orMez(R.pget(x, y), P.k, (x + y) % 2 ? 0.5 : 0.38)); };
    for (let j = -6; j <= 6; j++) { pt(sx, sy + j); if (j > -5 && j < 4) pt(sx + 1, sy + j); } for (let i = -8; i <= 9; i++) { pt(sx + i, sy - 2); if (Math.abs(i) < 7) pt(sx + i, sy - 1); } for (let i = -3; i <= 4; i++) pt(sx + i, sy + 5); }
  return { suelo: 150, sombra: sm, avioneta: [sm[0] + 44, sm[1] - 30], costa: [Math.round(a_orCosta(90)), 90], dunas: { x0: 76, x1: 196 }, bosque: { x0: 212, x1: 319 }, rio: { y: [Math.round(a_orRio(100)), Math.round(a_orRio(200)), Math.round(a_orRio(300))] }, boca: [56, Math.round(a_orRio(56))], pueblo: [283, Math.round(a_orRio(283)) - 24], puente: [Math.round(a_orVia(a_orRio(256))), Math.round(a_orRio(256))], lagos: a_orLAGOS.map(([x, y]) => [x, y]), carretera: [Math.round(a_orVia(20)), Math.round(a_orVia(100))] };
}

function a_orPuebloFijo(R) {
  const P = a_OR, A = P.arena, pset = R.pset, hor = 74, K = P.k;
  a_orCielo(R, hor + 2, P.cielo57);
  // las lomas de pinos del otro lado del río, con bruma
  for (let x = 0; x < 320; x++) { const y0 = Math.round(54 + 4 * Math.sin(x * 0.02 + 1) + 2 * Math.sin(x * 0.07) + ((x * 7) % 9 < 3 ? -2 : (x * 7) % 9 < 6 ? -1 : 0)); for (let y = y0; y <= hor; y++) pset(x, y, a_orTono([hex('#4e7078'), hex('#62848a'), hex('#7c9ca0'), hex('#9cb6b8')], 2.2 - (y - y0) * 0.09 + (h(x, y, 100) - 0.5) * 1.3 + (y > hor - 5 ? 1.2 : 0), x, y)); }
  for (let x = 0; x < 320; x++) if (a_orRu(x * 0.04, 0, 101) > 0.35) for (let j = 0; j < 3; j++) if (a_orU(x, 66 + j) < 0.7 - j * 0.2) pset(x, 68 + j, a_orC.niebla);
  R.rect(0, hor, 319, hor + 1, hex('#3e5a5e'));
  // el río
  for (let y = hor + 2; y < 114; y++) for (let x = 0; x < 152; x++) pset(x, y, a_orTono(P.rio, 3.3 - (y - hor) * 0.065 + (h(x >> 2, y, 102) < 0.3 ? 0.8 : 0) + (h(x >> 3, y, 103) - 0.5) * 0.6, x, y));
  // el puente del Siuslaw: tablero, dos arcos atirantados de hormigón, las cuatro torres del tramo central y las pilas
  const H = P.hormigon, tab = 58;
  const pila = (x, w, top) => { R.rect(x - 1, top, x + w, 80, K); for (let y = top; y <= 82; y++) for (let i = 0; i < w; i++) pset(x + i, y, a_orTono(H, 3.2 - i * 0.9 + (y > 76 ? -1.2 : 0) + (y % 6 === 0 ? -0.6 : 0), x + i, y)); for (let y = 83; y < 96; y++) for (let i = 0; i < w; i++) if (a_orU(x + i, y) < 0.6 - (y - 83) * 0.04) pset(x + i + Math.round(Math.sin(y * 0.9) * 0.7), y, a_orMez(R.pget(x + i, y), H[2], 0.5)); };
  for (const cx of [30, 118]) { for (let i = -27; i <= 27; i++) { const y = Math.round(tab - 15 * Math.sqrt(Math.max(0, 1 - (i / 27) ** 2))); R.rect(cx + i, y - 1, cx + i, y + 1, K); } for (let i = -26; i <= 26; i++) { const y = Math.round(tab - 15 * Math.sqrt(Math.max(0, 1 - (i / 27) ** 2))); pset(cx + i, y, H[3]); pset(cx + i, y - 1 + (i > 0 ? 2 : 0), i > 0 ? H[1] : H[4]); if ((i + 30) % 5 === 0 && Math.abs(i) < 25) for (let yy = y + 2; yy < tab; yy++) pset(cx + i, yy, H[yy % 2 ? 1 : 2]); } }
  R.rect(0, tab - 1, 152, tab + 3, K); R.rect(0, tab, 152, tab, H[4]); R.rect(0, tab + 1, 152, tab + 2, H[2]); for (let x = 0; x < 152; x += 3) pset(x, tab - 2, H[3]); R.rect(0, tab - 3, 152, tab - 3, H[2]);
  for (const x of [1, 56, 88, 146]) pila(x, 4, tab + 3);
  for (const x of [60, 84]) { pila(x, 6, 46); R.rect(x + 1, 43, x + 4, 45, K); R.rect(x + 2, 41, x + 3, 44, H[3]); pset(x + 2, 40, K); R.rect(x + 2, 50, x + 3, 53, hex('#4a5a6a')); R.rect(x, 48, x + 5, 48, H[1]); }
  for (let x = 66; x < 84; x++) if (x % 2) pset(x, tab + 4, H[1]);
  for (let x = 150; x < 320; x++) for (let y = hor - 4 + ((x * 7) % 9 < 4 ? 0 : 2); y < 122; y++) pset(x, y, a_orTono(P.pino, 1.2 + (h(x, y, 114) - 0.5) * 1.6 + (h(x >> 1, y >> 2, 115) < 0.2 ? 1 : 0), x, y));   // el macizo oscuro detrás de las tiendas
  // los pinos de la ladera detrás de las tiendas
  for (const [x, b, a] of [[158, 80, 30], [172, 76, 26], [190, 72, 22], [262, 84, 34], [274, 80, 28], [300, 86, 36], [312, 92, 40], [288, 84, 30]]) a_orPino(R, x, b, a, P.pino, { viento: 0.4 });
  // el pantalán flotante con sus pilotes
  R.rect(12, 99, 134, 102, K); for (let x = 13; x < 134; x++) { pset(x, 100, x % 5 === 0 ? P.madera[1] : P.madera[3]); pset(x, 101, P.madera[1]); }
  for (const x of [14, 44, 74, 104, 132]) { R.rect(x - 1, 90, x + 2, 106, K); R.rect(x, 91, x + 1, 106, P.madera[2]); R.rect(x, 91, x, 106, P.madera[3]); R.rect(x, 90, x + 1, 90, P.gris[4]); for (let y = 107; y < 112; y++) if (y % 2) pset(x + (y % 4 === 1 ? 1 : 0), y, P.rio[0]); }
  for (let x = 134; x < 150; x++) { const y = 101 + Math.round((x - 134) * 0.7); pset(x, y, P.madera[3]); pset(x, y + 1, P.madera[1]); if (x % 4 === 0) pset(x, y - 3, P.madera[1]); pset(x, y - 4, P.madera[2]); }
  // la calle: acera de tablones, bordillo y calzada con parches, rodadas y charcos
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 114) c = x < 152 ? (y === 112 ? P.madera[3] : K) : null;
    else if (y < 121 && x < 152) c = a_orTono(P.madera, 2.6 + ((x + 3) % 14 === 0 ? -1.6 : 0) + (h(x >> 3, y, 104) - 0.5) * 0.9 + (y === 114 ? 0.8 : 0), x, y);
    else if (y < 121) c = null;
    else if (y < 130) c = a_orTono(P.madera, 2.9 + ((x + (y > 125 ? 7 : 0)) % 18 === 0 ? -1.6 : 0) + (y === 125 ? -1.2 : 0) + (h(x >> 3, y, 105) - 0.5) * 1.1 + (y === 121 ? 0.7 : 0), x, y);
    else if (y < 132) c = y === 130 ? P.gris[3] : P.gris[0];
    else { const rod = Math.abs(y - 143) < 2 || Math.abs(y - 165) < 2; c = a_orTono(P.gris, 1.9 + (a_orRu(x * 0.05, y * 0.12, 106) - 0.5) * 1.6 + (h(x, y, 107) - 0.5) * 0.8 + (rod ? -0.5 : 0) + (y - 132) * 0.008, x, y); if (y === 154 && (x + 6) % 26 < 12) c = P.gris[4]; }
    if (c != null) pset(x, y, c); }
  for (const [cx, cy, rx, ry] of [[70, 170, 16, 3], [176, 147, 10, 2]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 1, y, 108) - 0.5) * 0.4 < 1) pset(x, y, y < cy ? P.cielo57[3] : P.cielo57[2]);
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 109) * 319), y = 133 + Math.round(h(k, 2, 109) * 45); pset(x, y, k % 2 ? P.gris[3] : P.gris[0]); if (k % 7 === 0) R.linea(x, y, x + 5, y + 1, P.gris[0]); }
  // la tapa de alcantarilla, manchas de aceite, hojas y papeles, y la arena que el viento ha ido dejando contra el bordillo
  for (let j = -3; j <= 3; j++) for (let i = -8; i <= 8; i++) if ((i / 8.5) ** 2 + (j / 3.5) ** 2 < 1) pset(118 + i, 162 + j, (i / 8.5) ** 2 + (j / 3.5) ** 2 > 0.7 ? P.gris[0] : (i + j * 2) % 3 === 0 ? P.gris[1] : P.gris[2]);
  for (const [cx, cy, rx] of [[236, 150, 9], [40, 148, 6], [150, 172, 7]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 2.5) ** 2 + (h(i, j, 111) - 0.5) * 0.5 < 1 && (i + j) % 2) pset(cx + i, cy + j, P.gris[0]);
  for (let x = 0; x < 250; x++) { const a = Math.round(1.5 * a_orRu(x * 0.07, 0, 112) + (x > 200 ? (x - 200) * 0.04 : 0)); for (let j = 0; j < a; j++) pset(x, 132 + j, a_orTono(A, 3 + j * 0.4, x, 132 + j)); }
  for (let k = 0; k < 9; k++) { const x = 14 + Math.round(h(k, 1, 113) * 230), y = 136 + Math.round(h(k, 2, 113) * 40); if (k % 3 === 0) { R.rect(x, y, x + 3, y + 1, hex('#e8e0c8')); pset(x + 1, y, P.gris[2]); } else { pset(x, y, hex('#a8743c')); pset(x + 1, y, hex('#c8903c')); pset(x + 1, y + 1, hex('#8a5a2c')); } }
  // el banco delante de la primera tienda, la boca de riego y el buzón azul (sin letras)
  R.rect(158, 120, 181, 121, P.k); R.rect(158, 119, 181, 120, P.madera[3]); R.rect(158, 113, 181, 114, P.madera[3]); R.rect(158, 116, 181, 116, P.madera[2]); for (const x of [159, 180]) { R.rect(x, 112, x, 126, P.hierro[0]); } R.rect(159, 121, 180, 121, P.madera[1]);
  R.rect(203, 118, 208, 128, P.k); R.rect(204, 119, 207, 128, a_orC.rojo); R.rect(204, 119, 204, 128, hex('#d86a5a')); R.rect(203, 121, 208, 121, a_orC.rojoS); R.rect(204, 116, 207, 118, P.k); R.rect(205, 117, 206, 117, a_orC.rojo); pset(202, 123, P.gris[3]); pset(209, 123, P.gris[3]);
  // la barandilla del muelle, las nasas de cangrejos, la red tendida y el barril
  for (let x = 0; x < 150; x += 18) { R.rect(x + 1, 104, x + 3, 119, K); R.rect(x + 2, 105, x + 2, 118, P.madera[3]); pset(x + 2, 104, P.madera[4]); }
  for (const y of [107, 112]) for (let x = 0; x < 148; x++) { pset(x, y, P.madera[y === 107 ? 3 : 2]); pset(x, y + 1, P.madera[0]); }
  for (let k = 0; k < 5; k++) { const x = 22 + (k % 3) * 13 + (k > 2 ? 6 : 0), y = k > 2 ? 104 : 113; R.rect(x, y, x + 11, y + 7, K); R.rect(x + 1, y + 1, x + 10, y + 6, hex('#6a5a40')); for (let i = 1; i < 10; i++) for (let j = 1; j < 7; j++) if ((i + j) % 2) pset(x + i, y + j, hex('#9a8458')); pset(x + 5, y + 3, a_orC.naranja); pset(x + 6, y + 4, a_orC.naranja); }
  for (let x = 76; x < 124; x++) { const s = Math.round(5 * Math.sin((x - 76) / 48 * Math.PI)); for (let y = 108; y <= 110 + s; y++) if ((x + y) % 2 === 0) pset(x, y, hex('#5a7a6a')); if (x % 8 === 0) pset(x, 111 + s, a_orC.naranja); }
  R.rect(132, 108, 143, 120, K); for (let y = 109; y < 120; y++) for (let x = 133; x < 143; x++) pset(x, y, a_orTono(P.madera, 3.2 - (x - 133) * 0.25 + (y === 111 || y === 117 ? -3 : 0), x, y));
  // el poste del teléfono con su travesaño, su transformador y los cables
  R.rect(146, 30, 148, 121, K); R.rect(147, 31, 147, 121, P.madera[2]); R.rect(140, 35, 154, 36, K); R.rect(141, 35, 153, 35, P.madera[3]); for (const x of [141, 145, 150, 153]) pset(x, 34, P.gris[4]); R.rect(149, 44, 153, 51, K); R.rect(150, 45, 152, 50, P.gris[2]); pset(150, 45, P.gris[4]);
  for (let x = 0; x < 141; x++) { const u = x / 141; for (const d of [0, 4]) if ((x + d) % 5) pset(x, Math.round(38 + d + u * (-4 - d) + Math.sin(u * Math.PI) * 6), P.hierro[0]); }
  for (let x = 154; x < 214; x++) { const u = (x - 154) / 60; if (x % 5) pset(x, Math.round(34 + u * 14 + Math.sin(u * Math.PI) * 5), P.hierro[0]); }
  // las tres tiendas de madera con su fachada falsa, el rótulo (barras y un pictograma), el toldo, el escaparate y la puerta
  const tienda = (x0, x1, top, F, toldo, tipo, alta) => {
    R.rect(x0 - 1, top - 1, x1 + 1, 121, K);
    for (let y = top; y <= 120; y++) for (let x = x0; x <= x1; x++) pset(x, y, a_orTono(F, 2.3 - (x - x0) / (x1 - x0) * 0.7 + (y % 4 === 0 ? -1.3 : y % 4 === 1 ? 0.5 : 0) + (h(x >> 2, y, 110 + x0) - 0.5) * 0.6 - (y > 88 && y < 92 ? 1 : 0), x, y));
    R.rect(x0 - 2, top - 3, x1 + 2, top, K); R.rect(x0 - 1, top - 2, x1 + 1, top - 1, F[3]); R.rect(x0 - 1, top - 1, x1 + 1, top - 1, F[1]); for (let x = x0 + 2; x < x1; x += 5) R.rect(x, top + 1, x + 1, top + 2, F[0]);
    R.rect(x0, top, x0 + 1, 120, F[3]); R.rect(x1 - 1, top, x1, 120, F[0]);
    // el rótulo: tablero claro con barras (sin letras) y su pictograma
    const ry = alta ? 74 : top + 6, cx = (x0 + x1) >> 1; R.rect(x0 + 5, ry - 1, x1 - 5, ry + 9, K); R.rect(x0 + 6, ry, x1 - 6, ry + 8, hex('#efe6cc')); R.rect(x0 + 6, ry + 8, x1 - 6, ry + 8, hex('#cdbf9c'));
    R.rect(x0 + 9, ry + 2, cx - 9, ry + 3, toldo[0]); R.rect(x0 + 9, ry + 5, cx - 12, ry + 6, P.gris[1]); R.rect(cx + 9, ry + 2, x1 - 9, ry + 3, toldo[0]); R.rect(cx + 12, ry + 5, x1 - 9, ry + 6, P.gris[1]);
    if (tipo === 0) { for (let i = -5; i <= 4; i++) { const w = Math.round(2.6 * Math.sqrt(Math.max(0, 1 - (i / 5.5) ** 2))); R.rect(cx + i, ry + 4 - w, cx + i, ry + 4 + w, hex('#4a7a9a')); } R.poligono([[cx + 4, ry + 4], [cx + 8, ry + 1], [cx + 8, ry + 8]], hex('#4a7a9a')); pset(cx - 3, ry + 3, a_orC.blanco); }   // un pez
    else if (tipo === 1) { R.rect(cx, ry + 1, cx, ry + 7, P.hierro[0]); R.rect(cx - 2, ry + 2, cx + 2, ry + 2, P.hierro[0]); for (let i = -3; i <= 3; i++) pset(cx + i, ry + 7 - Math.round(Math.abs(i) * 0.6), P.hierro[0]); pset(cx - 4, ry + 5, P.hierro[0]); pset(cx + 4, ry + 5, P.hierro[0]); pset(cx, ry + 1, a_orC.rojo); }   // un ancla
    else { R.rect(cx - 3, ry + 3, cx + 2, ry + 7, a_orC.rojo); R.rect(cx + 3, ry + 4, cx + 4, ry + 5, a_orC.rojo); R.rect(cx - 2, ry + 3, cx + 1, ry + 3, hex('#5a3a28')); pset(cx - 1, ry + 1, P.gris[3]); pset(cx, ry, P.gris[3]); }   // una taza
    // las ventanas del piso de arriba, con sus cortinas
    if (alta) for (const wx of [x0 + 7, x1 - 17]) { R.rect(wx, top + 6, wx + 10, top + 19, K); R.rect(wx + 1, top + 7, wx + 9, top + 18, a_orC.cristalS); R.rect(wx + 1, top + 7, wx + 3, top + 14, a_orC.blanco); R.rect(wx + 7, top + 7, wx + 9, top + 14, a_orC.blanco); R.rect(wx + 5, top + 7, wx + 5, top + 18, F[3]); R.rect(wx + 1, top + 12, wx + 9, top + 12, F[3]); R.rect(wx - 1, top + 20, wx + 11, top + 20, F[3]); pset(wx + 4, top + 9, a_orC.cristal); }
    // el escaparate (con su género) y la puerta con cristal
    const px = tipo === 1 ? x0 + 6 : x1 - 18, ex0 = tipo === 1 ? x0 + 22 : x0 + 5, ex1 = tipo === 1 ? x1 - 5 : x1 - 22;
    R.rect(ex0 - 1, 95, ex1 + 1, 116, K); R.rect(ex0, 96, ex1, 115, hex('#34485a')); for (let y = 96; y <= 115; y++) for (let x = ex0; x <= ex1; x++) if ((x - y + 400) % 23 < 4 && y < 110) pset(x, y, hex('#4e6a80')); R.rect(ex0, 110, ex1, 115, hex('#c8bc9c')); R.rect(ex0, 110, ex1, 110, hex('#efe6cc'));
    for (let x = ex0 + 2, k = 0; x < ex1 - 4; x += 6, k++) { if (tipo === 0) { R.rect(x, 107, x + 4, 109, k % 2 ? hex('#8ab0c8') : hex('#c8d4dc')); pset(x + 4, 108, K); pset(x + 5, 107, hex('#8ab0c8')); pset(x + 5, 109, hex('#8ab0c8')); if (k % 2) { R.rect(x + 1, 100, x + 3, 104, a_orC.rojo); R.rect(x + 1, 101, x + 3, 102, a_orC.blanco); } }
      else if (tipo === 1) { if (k % 3 === 0) { R.rect(x, 103, x + 2, 109, P.madera[1]); R.rect(x, 108, x + 4, 109, P.madera[0]); } else if (k % 3 === 1) { R.rect(x + 1, 102, x + 3, 109, a_orC.amarillo); R.rect(x + 1, 104, x + 3, 106, a_orC.blanco); pset(x + 2, 101, K); } else { R.disco(x + 2.5, 106.5, 2.6, P.madera[4]); R.disco(x + 2.5, 106.5, 1, hex('#34485a')); } }
      else { if (k % 2) { R.rect(x, 106, x + 4, 109, hex('#d8a860')); R.rect(x, 106, x + 4, 106, hex('#f0d090')); pset(x + 2, 105, a_orC.rojo); } else { R.rect(x + 1, 105, x + 3, 109, a_orC.blanco); pset(x + 4, 107, a_orC.blanco); R.rect(x + 1, 105, x + 3, 105, a_orC.azul); } } }
    R.rect(px - 1, 91, px + 13, 120, K); R.rect(px, 92, px + 12, 120, F[0]); R.rect(px + 1, 93, px + 11, 119, toldo[0]); R.rect(px + 3, 95, px + 9, 108, hex('#34485a')); R.rect(px + 3, 95, px + 4, 100, hex('#4e6a80')); R.rect(px + 2, 110, px + 10, 117, a_orMez(toldo[0], K, 0.3)); pset(px + 10, 109, a_orC.amarillo); R.rect(px + 4, 101, px + 8, 104, a_orC.blanco); R.rect(px + 5, 102, px + 7, 102, a_orC.rojo);
    R.rect(px - 1, 121, px + 13, 122, P.gris[3]);
  };
  const FA = [[hex('#9c8a5c'), hex('#c4b07a'), hex('#e0cf98'), hex('#f2e6b8')], [hex('#5e2a26'), hex('#863a30'), hex('#a84c3c'), hex('#c8684e')], [hex('#48626a'), hex('#648488'), hex('#84a4a2'), hex('#a8c2ba')]];
  tienda(152, 204, 60, FA[0], [a_orC.rojo, a_orC.blanco], 0, false); tienda(207, 256, 49, FA[1], [a_orC.verdeFS, a_orC.blanco], 1, true); tienda(259, 299, 62, FA[2], [a_orC.azul, a_orC.blanco], 2, false);
  R.rect(240, 43, 245, 48, K); R.rect(241, 44, 244, 48, a_orC.rojoS); R.rect(240, 43, 245, 43, P.gris[2]);   // la chimenea
  // el final de la calle: la valla de tablas y la arena que la salta y se mete en la calzada
  for (let x = 300; x < 320; x++) { const y0 = Math.round(102 - (x - 300) * 0.55 + 2 * Math.sin(x * 0.4)); for (let y = y0; y < 122; y++) pset(x, y, a_orTono(A, 3.6 - (y - y0) * 0.05 + (h(x, y, 120) - 0.5) * 0.8 + (y === y0 ? 1 : 0), x, y)); }
  for (let x = 301; x < 320; x += 4) { const top = 104 + ((x * 7) % 5); R.rect(x, top, x + 2, 122, K); R.rect(x, top + 1, x + 1, 122, P.madera[(x >> 2) % 2 ? 2 : 3]); } R.rect(300, 110, 319, 110, P.madera[1]);
  for (let x = 248; x < 320; x++) { const u = (x - 248) / 72, y0 = Math.round(123 - u * u * 6 + 1.5 * Math.sin(x * 0.2)), y1 = Math.round(132 + u * u * 50 + 3 * Math.sin(x * 0.13)); for (let y = Math.max(113, y0); y <= Math.min(179, y1); y++) { if (y < 122 && x < 300) continue; const e = (y1 - y) / 6; if (e < 1 && a_orU(x, y) > e) continue; pset(x, y, a_orTono(A, 3.4 + (h(x, y, 121) - 0.5) * 0.9 - (Math.sin((y - y0) * 0.9 + x * 0.1) > 0.85 ? 0.9 : 0) + (y === y0 ? 1 : 0), x, y)); } }
  // la camioneta aparcada junto al bordillo
  a_orCamion(R, 228, 141, [hex('#3a5a7a'), hex('#5a82a8'), hex('#8ab0cc')], -1, 1.5);
  return {};
}

function a_orPueblo(R, t, o) {
  const P = a_OR, A = P.arena;
  R.copiar(a_orFijo(R, 'pueblo', () => a_orPuebloFijo(R)).b);
  // las nubes, que entran del mar
  a_orCirros(R, t, P.nube[2]);
  for (const [x0, y, w, v] of [[60, 37, 24, 5], [250, 35, 20, 4], [150, 30, 30, 8.5], [380, 31, 26, 6.5], [10, 46, 14, 2], [100, 48, 12, 1.6], [200, 44, 16, 2.2], [320, 47, 13, 1.8]]) { const cx = ((x0 + t * v) % 460) - 60, w2 = w * a_orSm(268, 214, cx), ps = R.pset; if (w2 < 4) continue; R.pset = (x, yy, c) => { if (yy < 52 + 3 * Math.sin(x * 0.02 + 1) && !(yy > 38 && Math.abs(x - 30) < 27) && !(yy > 38 && Math.abs(x - 118) < 27) && !(x > 139 && x < 155 && yy > 28) && !(x > 205 && x < 258 && yy > 44)) ps(x, yy, c); }; try { a_orNube(R, cx, y, w2, P.nube, 60); } finally { R.pset = ps; } }
  // un coche y un camión pequeños que cruzan el puente
  for (const [f, v, c] of [[0, 0.05, a_orC.rojo], [0.55, 0.04, a_orC.verdeFS]]) { const u = (t * v + f) % 1, x = Math.round(-10 + u * 170); if (x < 150 && !(x > 57 && x < 67) && !(x > 81 && x < 91)) { R.rect(x - 3, 55, x + 3, 56, c); R.rect(x - 1, 54, x + 1, 54, a_orC.cristal); R.pset(x + 4, 56, a_orC.amarillo); } }
  // los destellos del río y el reflejo que tiembla
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 122) * 150), y = 78 + Math.round(h(k, 2, 122) * 30), s = Math.sin(t * 2.4 + k * 1.3); if (s > 0.3 && R.pget(x, y) !== P.k) { R.pset(x, y, P.rio[4]); if (s > 0.8) R.pset(x + 1, y, a_orC.blanco); } }
  // las dos barcas de pesca amarradas, que cabecean, con sus tangones
  for (const [bx, k, col] of [[40, 0, [hex('#e8e4d8'), hex('#3e6a5a')]], [100, 1, [hex('#dcd8cc'), hex('#8a3a30')]]]) { const b = Math.round(Math.sin(t * 1.5 + k * 2) * 1.1), y = 109 + b, d = k ? -1 : 1, X = (i) => bx + i * d, r = (a, y0, c2, y1, c) => R.rect(Math.min(X(a), X(c2)), y0, Math.max(X(a), X(c2)), y1, c);
    r(-16, y - 6, 15, y, P.k); r(-15, y - 5, 16, y - 1, col[0]); r(-15, y - 2, 15, y - 1, col[1]); r(15, y - 7, 18, y - 5, P.k); r(16, y - 6, 17, y - 5, col[0]); r(-15, y - 5, 16, y - 5, a_orC.blanco);
    r(-6, y - 14, 4, y - 6, P.k); r(-5, y - 13, 3, y - 6, col[0]); r(-5, y - 13, 3, y - 13, col[1]); r(-3, y - 11, -1, y - 8, a_orC.cristalS); r(1, y - 11, 2, y - 8, a_orC.cristalS);
    R.rect(X(6), y - 30, X(6), y - 6, P.madera[1]); R.linea(X(6), y - 28, X(-12), y - 20 + b, P.madera[2]); R.linea(X(6), y - 28, X(18), y - 18 - b, P.madera[2]); R.linea(X(6), y - 30, X(-15), y - 6, P.hierro[1], 3); R.pset(X(6), y - 31, a_orC.rojo); R.pset(X(6) + (Math.sin(t * 5 + k) > 0 ? 1 : 2), y - 31, a_orC.rojo);
    R.disco(X(-12), y - 3, 1.6, a_orC.naranja); for (let i = -17; i <= 18; i++) if ((i + Math.floor(t * 3)) % 3) R.pset(X(i), 111, P.rio[4]); }
  // un pescador en el pantalán y una gaviota en cada pilote
  a_orMini(R, 62 + Math.round(Math.sin(t * 0.4) * 8), 99, { ropa: a_orC.amarillo, gorro: a_orC.azul, paso: Math.cos(t * 0.4) * 8 > 0 ? t : t, dir: Math.cos(t * 0.4) > 0 ? 1 : -1 });
  for (const [x, k] of [[14, 0], [104, 1]]) { const g = Math.floor(t * 0.7 + k) % 4 === 0 ? 1 : 0; R.rect(x - 1, 87, x + 1, 88, a_orC.blanco); R.pset(x + (k ? -2 : 2), 87 - g, a_orC.blanco); R.pset(x + (k ? -3 : 3), 87 - g, a_orC.amarillo); R.pset(x + (k ? 2 : -2), 88, P.gris[2]); R.pset(x, 89, a_orC.naranja); }
  for (let k = 0; k < 3; k++) R.gaviota(Math.round(50 + k * 40 + Math.sin(t * 0.6 + k * 2) * 26), Math.round(42 + k * 6 + Math.sin(t * 1.2 + k) * 4 - (k === 1 ? 14 : 0)), t * 0.6, k);
  // el humo de la chimenea, que el viento tumba
  for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1, x = Math.round(243 + u * 20 + Math.sin(u * 6 + k) * 1.5), y = Math.round(41 - u * 8); if (y > 20 && x < 270) { const c = a_orMez(R.pget(x, y), a_orC.blanco, 0.55 - u * 0.4); R.pset(x, y, c); R.pset(x + 1, y, c); if (u > 0.3) { R.pset(x, y - 1, c); R.pset(x + 1, y + 1, c); } } }
  // los toldos de rayas, con el faldón que se mueve
  for (const [x0, x1, c] of [[154, 202, a_orC.rojo], [209, 254, a_orC.verdeFS], [261, 297, a_orC.azul]]) for (let x = x0; x <= x1; x++) { const raya = Math.floor((x - x0) / 4) % 2, col = raya ? a_orC.blanco : c, f = Math.round(Math.sin(t * 3 + x * 0.35) * 0.7 + 0.5);
    for (let j = 0; j < 7; j++) R.pset(x, 84 + j, j === 0 ? a_orMez(col, a_orC.blanco, 0.5) : j > 4 ? a_orMez(col, P.k, 0.2) : col); R.pset(x, 83, P.k); const fl = 91 + ((x - x0) % 4 === 1 || (x - x0) % 4 === 2 ? 2 : 1) + f; for (let y = 91; y <= fl; y++) R.pset(x, y, y === fl ? a_orMez(col, P.k, 0.35) : col); R.pset(x, fl + 1, a_orMez(R.pget(x, fl + 1), P.k, 0.4)); }
  // la arena que entra por el final de la calle
  a_orRachas(R, t, 236, 319, 124, 150, 5, A[5], 123);
  for (let k = 0; k < 14; k++) { const u = (t * 0.7 + h(k, 1, 124)) % 1, x = Math.round(318 - u * 30 - h(k, 2, 124) * 14), y = Math.round(100 + h(k, 3, 124) * 8 - Math.sin(u * 3) * 4 + u * 10); if (x > 296) R.pset(x, y, A[5]); }
  return { suelo: 152, horizonte: 74, acera: { y0: 121, y1: 129 }, bordillo: 131, puente: { y: 58, x0: 0, x1: 150, torres: [63, 87] }, rio: { x0: 0, x1: 150, y0: 76, y1: 111 }, barcas: [[40, 109], [100, 109]], poste: 147,
    tiendas: [{ x0: 152, x1: 204, puerta: [192, 120], escaparate: [157, 96, 182, 115] }, { x0: 207, x1: 256, puerta: [219, 120], escaparate: [229, 96, 251, 115] }, { x0: 259, x1: 299, puerta: [287, 120], escaparate: [264, 96, 277, 115] }],
    camioneta: [228, 141], arena: { x0: 262, x1: 319 }, libre: [20, 200] };
}

const a_orCAS = [[10, 44], [10, 80], [10, 116], [272, 116], [272, 80], [272, 44]].map(([x, y]) => [x, y, x + 37, y + 29]);

const a_orYD = (x) => x < 164 ? 100 - 36 * a_orSm(74, 164, x) : 64 + 36 * a_orSm(164, 200, x);

// adónde señala cada casilla dentro del corte (el punto donde acaba su línea de puntos)
const a_orANCLA = [[88, 62], [150, 96], [112, 88], [222, 124], [208, 99], [164, 58]];

function a_orCorteFijo(R) {
  const P = a_OR, A = P.arena, pset = R.pset, K = a_orC.tinta;
  // el papel: fibras, manchas, los dobleces y el recuadro de tinta
  for (let y = 0; y < 153; y++) for (let x = 0; x < 320; x++) pset(x, y, a_orTono(P.papel, 2.3 + (a_orRu(x * 0.03, y * 0.04, 130) - 0.5) * 1.4 + (h(x, y, 131) - 0.5) * 0.7 + (x === 106 || x === 213 ? -0.8 : x === 107 || x === 214 ? 0.6 : 0) - (y > 146 ? (y - 146) * 0.12 : 0), x, y));
  for (let y = 22; y < 148; y++) { if (y % 2 || y > 30) pset(5, y, K); if (y > 48) pset(314, y, K); if (y > 28) pset(7, y, P.papel[0]); if (y > 50) pset(312, y, P.papel[0]); } for (let x = 5; x < 315; x++) { pset(x, 148, K); pset(x, 146, P.papel[0]); }
  // el corte: el aire (un lavado azul muy claro), la arena en capas inclinadas, el agua bajo la arena y la roca rayada
  for (let x = 64; x <= 256; x++) { const yd = Math.round(a_orYD(x));
    for (let y = 34; y < yd; y++) if (a_orU(x, y) < 0.34 * a_orSm(34, 60, y) * a_orSm(64, 76, x) * a_orSm(256, 244, x)) pset(x, y, hex('#d2e2e6'));
    for (let y = yd; y <= 140; y++) { let c;
      if (y > 133) c = (x + y * 2) % 6 < 2 ? hex('#6a6258') : hex('#8e8676');
      else if (y > 116 + Math.round(1.5 * Math.sin(x * 0.12))) c = a_orTono(P.rio, 2.4 + (y - 118) * -0.09 + ((x + y * 3) % 7 === 0 ? 1 : 0) + (h(x, y, 132) - 0.5) * 0.6, x, y);
      else { const capa = ((x - (y - 64) * 1.25 + 400) % 10), lecho = y > 100 ? (y % 5 === 0 ? -0.9 : 0) : (capa < 1.3 ? -0.9 : capa > 8.6 ? 0.5 : 0); c = a_orTono(A, 2.9 + lecho * 1.3 + (h(x, y, 133) - 0.5) * 0.8 + (y > 110 ? -0.8 : 0) + (y - yd < 2 ? 1.2 : 0) + (x - 164) * 0.004, x, y); }
      pset(x, y, c); }
    pset(x, yd - 1, K); pset(x, 141, K); if (x % 3) pset(x, 116 + Math.round(1.5 * Math.sin(x * 0.12)), hex('#2e5a78')); }
  for (let y = 100; y <= 141; y++) { pset(63, y, K); pset(257, y, K); }
  // las raíces largas de la hierba (el dibujo de tinta): bajan hasta cerca del agua y se ramifican
  for (let k = 0; k < 7; k++) { const x0 = 92 + k * 9, y0 = Math.round(a_orYD(x0)), L = 22 + (k % 3) * 7; for (let s = 0; s < L; s++) { const x = Math.round(x0 + Math.sin(s * 0.3 + k) * 2 + (k % 2 ? 1 : -1) * s * 0.12), y = y0 + s; if (y < 116) pset(x, y, s % 5 === 4 ? hex('#b09a6a') : hex('#7a6444')); if (s % 7 === 5 && y < 112) { pset(x + 1, y + 1, hex('#7a6444')); pset(x + 2, y + 2, hex('#7a6444')); pset(x - 1, y + 1, hex('#7a6444')); } } }
  // el pino del llano, con sus raíces
  a_orPino(R, 236, 100, 40, P.pino, { viento: 0.5 }); for (let s = 0; s < 12; s++) { pset(236 - Math.round(s * 0.8), 101 + s, hex('#5e4230')); pset(237 + Math.round(s * 0.7), 101 + s, hex('#5e4230')); if (s < 8) pset(236, 101 + s, hex('#5e4230')); }
  // el listón de abajo de la lámina (con sus cantoneras de latón) y, debajo, la SALA a la escala de los personajes: un
  // palmo de pared, el zócalo de madera y el suelo de tablas (los pies van en y 178); a los lados, fuera de x 72–244,
  // una mesita con el frasco de arena y la lupa (izquierda) y un banco con libros, el bote de lápices y un cesto de
  // láminas enrolladas (derecha), todo del tamaño de un chibi
  R.rect(0, 153, 319, 157, P.k); for (let x = 0; x < 320; x++) { pset(x, 154, P.madera[3]); pset(x, 155, P.madera[2]); pset(x, 156, P.madera[1]); } R.rect(2, 153, 5, 158, P.k); R.rect(314, 153, 317, 158, P.k); R.rect(3, 154, 4, 157, a_orC.amarillo); R.rect(315, 154, 316, 157, a_orC.amarillo);
  for (let y = 158; y < 162; y++) for (let x = 0; x < 320; x++) pset(x, y, a_orTono([hex('#3e5650'), hex('#4c6860'), hex('#5c7a70')], 1.5 - (y === 158 ? 1.2 : 0) + (h(x >> 1, y, 134) - 0.5) * 0.8 + ((x + 9) % 40 === 0 ? -0.8 : 0), x, y));
  for (let y = 162; y < 168; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 162 ? P.madera[4] : y === 167 ? P.madera[0] : (x + 21) % 64 === 0 ? P.madera[0] : a_orTono(P.madera, 2.1 + (y === 163 ? 0.8 : 0) + Math.sin(x * 0.07 + y * 0.9) * 0.5 + (h(x >> 2, y, 135) - 0.5) * 0.8 - (y === 166 ? 0.7 : 0), x, y));
  { const TB = [hex('#5c4028'), hex('#7c5a38'), hex('#9c7648'), hex('#b8925e'), hex('#d2b07c')];
    for (let y = 168; y < 180; y++) { const fila = y < 171 ? 0 : y < 175 ? 1 : 2, junta = y === 171 || y === 175;
      for (let x = 0; x < 320; x++) { const tope = (x + fila * 53 + 17) % (96 + fila * 22) === 0, veta = Math.sin(x * 0.045 + fila * 2.1 + Math.sin(y * 0.8 + x * 0.012) * 1.6);
        pset(x, y, junta || tope ? TB[0] : a_orTono(TB, 2.7 + veta * 0.55 + (h(x >> 2, y, 137 + fila) - 0.5) * 0.8 + (y === 168 ? -1.5 : y === 169 ? -0.6 : 0) + ((x + fila * 31) % 150 < 60 ? 0.35 : 0) + (y === 172 || y === 176 ? 0.6 : 0), x, y)); } }
    for (let k = 0; k < 9; k++) { const x = 18 + k * 36 + (k % 2) * 7, y = [170, 173, 178][k % 3]; pset(x, y, TB[0]); pset(x + 1, y, TB[4]); }
    // la mesita de la izquierda: el frasco de arena con su tapa y su etiqueta, y la lupa tumbada
    const mueble = (x0, x1) => { for (let x = x0 - 2; x <= x1 + 3; x++) if ((x + 1) % 2) { pset(x, 178, TB[0]); if (x > x0 && x < x1) pset(x + 1, 179, TB[1]); }
      R.rect(x0, 165, x1, 167, P.k); R.rect(x0 + 1, 165, x1 - 1, 165, P.madera[4]); R.rect(x0 + 1, 166, x1 - 1, 166, P.madera[2]);
      for (const x of [x0 + 2, x1 - 4]) { R.rect(x, 168, x + 2, 178, P.k); R.rect(x + 1, 168, x + 1, 177, P.madera[3]); } R.rect(x0 + 5, 172, x1 - 5, 172, P.madera[1]); R.rect(x0 + 5, 173, x1 - 5, 173, P.k); };
    mueble(12, 44);
    R.rect(17, 157, 24, 164, P.k); R.rect(18, 158, 23, 164, hex('#b8ccd0')); R.rect(18, 158, 18, 164, hex('#e8f0f0')); for (let y = 161; y <= 164; y++) for (let x = 18; x <= 23; x++) pset(x, y, a_orTono(A, 3.6 - (x - 18) * 0.3 + (y === 161 ? 1 : 0), x, y)); R.rect(17, 156, 24, 157, P.k); R.rect(18, 156, 23, 156, P.madera[3]); R.rect(20, 162, 22, 163, a_orC.blanco);
    R.disco(34.5, 161.5, 3.4, P.k); R.disco(34.5, 161.5, 2.4, hex('#cfe2e6')); pset(33, 160, a_orC.blanco); R.rect(37, 163, 41, 164, P.k); R.rect(38, 163, 40, 163, P.madera[2]); R.rect(28, 164, 31, 164, P.hierro[2]);
    // el banco de la derecha: tres libros apilados, el bote de lápices y, al lado, el cesto con dos láminas enrolladas
    mueble(254, 290);
    for (const [x, y, w, c] of [[258, 162, 13, hex('#7a3a30')], [259, 159, 11, hex('#3e6a5a')], [257, 156, 12, hex('#c8a04a')]]) { R.rect(x - 1, y - 1, x + w + 1, y + 2, P.k); R.rect(x, y, x + w, y + 1, c); R.rect(x, y, x + w, y, a_orMez(c, a_orC.blanco, 0.35)); R.rect(x + w - 1, y, x + w, y + 1, hex('#efe6cc')); }
    R.rect(278, 158, 284, 164, P.k); R.rect(279, 159, 283, 164, hex('#5a82a8')); R.rect(279, 159, 279, 164, hex('#8ab0cc')); for (const [x, c, al] of [[279, a_orC.amarillo, 5], [281, a_orC.rojo, 4], [283, a_orC.verdeFS, 6]]) { R.rect(x, 158 - al, x, 158, c); pset(x, 157 - al, K); }
    R.rect(297, 166, 311, 178, P.k); for (let y = 167; y < 178; y++) for (let x = 298; x <= 310; x++) pset(x, y, (x + y) % 4 === 0 ? P.madera[1] : (x - y + 400) % 4 === 0 ? P.madera[4] : P.madera[3]); R.rect(298, 167, 310, 167, P.madera[4]); for (let x = 296; x <= 313; x++) if (x % 2) pset(x, 179, TB[0]);
    for (const [x, al, c] of [[300, 16, hex('#efe6cc')], [305, 12, hex('#e2d6b4')]]) { R.rect(x - 1, 166 - al, x + 3, 166, P.k); R.rect(x, 167 - al, x + 2, 166, c); R.rect(x + 2, 167 - al, x + 2, 166, hex('#b8a888')); pset(x + 1, 167 - al, K); R.rect(x, 160, x + 2, 160, a_orC.rojo); }
  }
  return {};
}

// el dibujo de cada pieza dentro de su casilla (cx, cy = su centro); t las anima
function a_orPieza(R, k, cx, cy, t) {
  const P = a_OR, A = P.arena, K = a_orC.tinta, ps = R.pset;
  if (k === 0) { for (let j = -1; j <= 1; j++) { const y0 = cy + j * 7, d = Math.floor(t * 9 + j * 2) % 6; for (let i = -13; i <= 10; i++) if ((i + 60 - d) % 6 < 4) ps(cx + i, y0 + Math.round(2 * Math.sin((i + 13) * 0.3 + j)), hex('#5a82a8')); const ye = y0 + Math.round(2 * Math.sin(23 * 0.3 + j)); R.poligono([[cx + 10, ye - 3], [cx + 15, ye], [cx + 10, ye + 4]], hex('#3a5a7a')); } }
  else if (k === 1) { for (let i = -12; i <= 12; i++) { const a = Math.round(9 * Math.exp(-((i / 7) ** 2))); for (let j = 0; j <= a; j++) ps(cx + i, cy + 9 - j, a_orTono(A, 2.3 - i * 0.14 + (j === a ? 1.6 : 0) + ((i + j * 2 + 40) % 5 === 0 ? -1 : 0), cx + i, cy + 9 - j)); ps(cx + i, cy + 10, K); }
    for (let g = 0; g < 5; g++) { const u = (t * 0.9 + g / 5) % 1; ps(cx + Math.round((g - 2) * 1.5), cy - 12 + Math.round(u * 12), A[u < 0.5 ? 1 : 0]); } }
  else if (k === 2) { a_orMata(R, cx, cy + 2, 12, t, [P.hierba[1], P.hierba[3], P.hierba[4]], 3); R.rect(cx - 12, cy + 3, cx + 12, cy + 3, K); for (let r = -1; r <= 1; r++) for (let s = 0; s < 9; s++) ps(cx + r * 3 + Math.round(Math.sin(s * 0.5 + r) * 1.5 + r * s * 0.3), cy + 4 + s, s % 4 === 3 ? hex('#b09a6a') : hex('#7a6444')); }
  else if (k === 3) { for (let j = -9; j <= 4; j++) { const w = j < -2 ? Math.round((j + 10) * 0.6) : Math.round(Math.sqrt(Math.max(0, 30 - (j - 0) ** 2))); for (let i = -w; i <= w; i++) ps(cx + i, cy + j, i < -1 ? hex('#8cc4e0') : a_orC.agua); } ps(cx - 2, cy - 1, a_orC.blanco); ps(cx - 3, cy, a_orC.blanco); ps(cx - 2, cy + 1, a_orC.blanco);
    for (let i = -12; i <= 12; i++) { const y = cy + 9 + Math.round(Math.sin(i * 0.7 + t * 3)); ps(cx + i, y, hex('#3f7290')); if (i % 2) ps(cx + i, y + 2, hex('#84b0c0')); } }
  else if (k === 4) { const x = cx + Math.round(Math.sin(t * 0.9) * 5), d = Math.cos(t * 0.9) > 0 ? 1 : -1, p = Math.floor(t * 8) % 2; R.rect(cx - 13, cy + 7, cx + 13, cy + 7, K); for (let i = -12; i <= 12; i += 3) ps(cx + i, cy + 9, A[2]);
    for (let j = -4; j <= 0; j++) { const w = Math.round(6 * Math.sqrt(1 - (j / 5) ** 2)); for (let i = -w; i <= w; i++) ps(x + i, cy + 5 + j, j < -2 && i * d < 2 ? hex('#4a4a6a') : hex('#24243a')); } R.rect(x + d * 6, cy + 2, x + d * 8, cy + 4, hex('#24243a')); ps(x + d * 9, cy + 1, K); ps(x + d * 10, cy, K); ps(x - d, cy + 1, hex('#8a8ab0'));
    for (const i of [-4, 0, 4]) { ps(x + i + (p ? 1 : -1) * (i ? 1 : -1), cy + 6, K); } R.rect(x, cy + 1, x, cy + 5, hex('#3a3a54')); }
  else { const s = Math.abs(Math.sin(t * 2.2)) > 0.8 ? -1 : 0, x = cx + Math.round(Math.sin(t * 0.7) * 4), y = cy + 4 + s; R.rect(cx - 13, cy + 8, cx + 13, cy + 8, K);
    R.rect(x - 4, y - 4, x + 3, y, hex('#b8a888')); R.rect(x - 3, y - 1, x + 2, y + 1, a_orC.blanco); R.rect(x - 6, y - 3, x - 5, y - 2, hex('#8a7a5e')); R.rect(x + 2, y - 7, x + 5, y - 4, hex('#c8b898')); R.rect(x + 2, y - 5, x + 4, y - 4, a_orC.blanco); ps(x + 4, y - 6, K); ps(x + 6, y - 5, K); ps(x + 7, y - 5, K); R.rect(x + 2, y - 8, x + 4, y - 8, hex('#5e4a34'));
    ps(x - 1, y + 2, a_orC.naranja); ps(x - 1, y + 3, a_orC.naranja); ps(x + 1, y + 2, a_orC.naranja); ps(x + 1, y + 3 + (s ? -1 : 0), a_orC.naranja); }
}

function a_orCorte(R, t, o) {
  const P = a_OR, K = a_orC.tinta, n = Math.max(0, Math.min(6, Math.round(o.piezas ?? 6))), falta = o.falta ?? -1, hay = (k) => k < n && k !== falta;
  R.copiar(a_orFijo(R, 'corte', () => a_orCorteFijo(R)).b);
  // dentro del corte, lo que pone cada pieza: el viento sobre la cresta, la hierba, los destellos del agua, el escarabajo y el pájaro
  if (hay(0)) for (let j = 0; j < 3; j++) { const d = Math.floor(t * 10 + j * 2) % 6; for (let x = 68; x < 176 - j * 14; x++) { const y = Math.round(a_orYD(x) - 9 - j * 7 - 3 * Math.sin(x * 0.05 + j)); if (y > 36 && (x + 60 - d) % 6 < 4) R.pset(x, y, hex('#5a82a8')); } const xe = 176 - j * 14, ye = Math.round(a_orYD(xe) - 9 - j * 7 - 3 * Math.sin(xe * 0.05 + j)); R.poligono([[xe, ye - 3], [xe + 5, ye], [xe, ye + 4]], hex('#3a5a7a')); }
  if (hay(1)) for (let g = 0; g < 10; g++) { const u = (t * 0.8 + g / 10) % 1, x = Math.round(166 + u * 30 + g % 3), y = Math.round(a_orYD(x) - 2 - Math.sin(u * 3) * 2); R.pset(x, y, P.arena[5]); }
  if (hay(2)) for (let k = 0; k < 7; k++) { const x = 92 + k * 9; a_orMata(R, x, Math.round(a_orYD(x)) - 1, 9 + (k % 3) * 2, t, [P.hierba[1], P.hierba[3], P.hierba[4]], k); }
  else if (n > 2) for (let k = 0; k < 7; k++) { const x = 92 + k * 9, y = Math.round(a_orYD(x)) - 2; for (let j = 0; j < 9; j += 2) R.pset(x + (j > 4 ? 1 : 0), y - j, P.papel[0]); }
  if (hay(3)) for (let k = 0; k < 16; k++) { const x = 68 + Math.round(h(k, 1, 141) * 184), y = 120 + Math.round(h(k, 2, 141) * 11); if (Math.sin(t * 2.6 + k * 1.7) > 0.4) { R.pset(x, y, P.rio[4]); R.pset(x + 1, y, P.rio[3]); } }
  else if (n > 3) for (let y = 117; y < 134; y++) for (let x = 64; x <= 256; x++) if ((x + y) % 2) R.pset(x, y, P.arena[1]);
  if (hay(4)) { const x = 204 + Math.round(Math.sin(t * 0.8) * 5), y = Math.round(a_orYD(x)) - 2; R.rect(x - 2, y - 2, x + 2, y, hex('#24243a')); R.pset(x + 3, y - 1, hex('#24243a')); R.pset(x - 1, y - 2, hex('#6a6a90')); R.pset(x - 2 + Math.floor(t * 8) % 2, y + 1, K); R.pset(x + 1 + Math.floor(t * 8) % 2, y + 1, K); }
  if (hay(5)) { const x = 160 + Math.round(Math.sin(t * 0.6) * 3), y = Math.round(a_orYD(x)) - 3 - (Math.abs(Math.sin(t * 2.2)) > 0.8 ? 1 : 0); R.rect(x - 3, y - 2, x + 2, y, hex('#b8a888')); R.rect(x - 2, y, x + 1, y, a_orC.blanco); R.rect(x + 2, y - 4, x + 3, y - 3, hex('#c8b898')); R.pset(x + 4, y - 3, K); R.pset(x - 1, y + 1, a_orC.naranja); R.pset(x + 1, y + 1, a_orC.naranja); }
  // las casillas claras, con su pieza, y las flechas que las unen entre sí y con el corte
  const flecha = (x0, y0, x1, y1, c) => { R.linea(x0, y0, x1, y1, c); const a = Math.atan2(y1 - y0, x1 - x0); for (const s of [-1, 1]) R.linea(x1, y1, x1 - Math.round(Math.cos(a + s * 0.6) * 4), y1 - Math.round(Math.sin(a + s * 0.6) * 4), c); };
  const tinte = hex('#9a8c94'), cFle = falta >= 0 ? hex('#a8544a') : K;
  for (let k = 0; k < 6; k++) { const [x0, y0, x1, y1] = a_orCAS[k], cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, [ax, ay] = a_orANCLA[k], izq = k < 3;
    if (k >= n) continue;
    // la línea de puntos hasta su sitio en el corte
    { const sx = izq ? x1 + 2 : x0 - 2; R.linea(sx, cy, ax, ay, k === falta ? P.papel[0] : cFle, 4); if (k !== falta) R.disco(ax + 0.5, ay + 0.5, 1.6, cFle); }
    if (k === falta) { for (let x = x0; x <= x1; x++) if (x % 4 < 2) { R.pset(x, y0, K); R.pset(x, y1, K); } for (let y = y0; y <= y1; y++) if (y % 4 < 2) { R.pset(x0, y, K); R.pset(x1, y, K); } continue; }
    R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, P.papel[0]); R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#fffaea')); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, P.papel[2]); R.rect(x0 + 1, y0 + 1, x0 + 3, y0 + 1, P.papel[1]);
    a_orPieza(R, k, cx, cy, falta >= 0 ? 0.4 + k : t);
    if (falta >= 0) { const B = R.buf; for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) B[y * 320 + x] = a_orMez(B[y * 320 + x], tinte, a_orU(x, y) < 0.5 ? 0.62 : 0.45); const tb = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.icono('!', x1 - 6 + tb, y0 + 3, hex('#a8443a'), hex('#fffaea')); }
  }
  for (const [a, b] of [[0, 1], [1, 2], [3, 4], [4, 5]]) if (a < n && b < n) { const A1 = a_orCAS[a], B1 = a_orCAS[b], cx = (A1[0] + A1[2]) >> 1, sube = B1[1] < A1[1]; flecha(cx, sube ? A1[1] - 1 : A1[3] + 2, cx, sube ? B1[3] + 3 : B1[1] - 2, a === falta || b === falta ? P.papel[0] : cFle); }
  if (n > 3) { const c = falta === 2 || falta === 3 ? P.papel[0] : cFle; R.linea(48, 143, 264, 143, c, falta >= 0 ? 4 : 0); R.linea(48, 143, 48, 140, c); flecha(264, 143, 271, 138, c); }
  // sin una pieza, todo el corte se apaga
  if (falta >= 0) { const B = R.buf; for (let y = 34; y <= 141; y++) for (let x = 63; x <= 257; x++) if (a_orU(x, y) < 0.5) B[y * 320 + x] = a_orMez(B[y * 320 + x], tinte, 0.5); }
  return { suelo: 178, lamina: { x0: 0, y0: 0, x1: 319, y1: 152 }, corte: { x0: 63, y0: 34, x1: 257, y1: 141, cresta: [164, 64] }, casillas: a_orCAS.map(([x0, y0, x1, y1]) => ({ x0, y0, x1, y1, cx: (x0 + x1) >> 1, cy: (y0 + y1) >> 1 })), anclas: a_orANCLA, suelo2: { y0: 168, y1: 179 }, zocalo: [162, 167], mesa: { y0: 165, y1: 179 }, mesita: [12, 156, 44, 178], banco: [254, 150, 311, 178], libre: [72, 244] };
}

// la trama ordenada de 4 × 4 (0–1) para los degradados
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_um = (x, y) => b_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores: a = 0 deja c, a = 1 da d
const b_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// un color a partir de sus componentes (0–255, se recortan)
const b_rgb = (r, g, b) => { const q = (v) => Math.max(0, Math.min(255, Math.round(v))); return ((255 << 24) | (q(b) << 16) | (q(g) << 8) | q(r)) >>> 0; };

const b_hx = (a) => a.map(hex);

// la época pedida (1957 si no es una de las cuatro)
const b_ep = (o) => ([1957, 1963, 1972, 1986].includes(+o.epoca) ? +o.epoca : 1957);

// los búferes de los fondos fijos (uno por vista y variante) y de las piezas de delante (con huecos)
const b_capas = new Map(), b_VACIO = 0x01020304;

function b_fondo(R, clave, dibuja) {
  let b = b_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); b_capas.set(clave, b); }
  R.copiar(b);
}

// lo de delante: se pinta una vez en un búfer vacío y en cada fotograma se copian sus píxeles (filas y0–y1), bajados dy
function b_frente(R, clave, y0, y1, dibuja, dy = 0) {
  let b = b_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(b_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); b_capas.set(clave, b); }
  const B = R.buf, d = dy * 320; for (let i = y0 * 320, n = (Math.min(y1, 179 - dy) + 1) * 320; i < n; i++) { const c = b[i]; if (c !== b_VACIO) B[i + d] = c; }
}

// pasa todo el búfer en uso por la luz f(r, g, b, x, y) → color (una sola vez, al hacer el búfer)
function b_grada(R, f) { const B = R.buf; for (let i = 0; i < B.length; i++) { const c = B[i]; if (c !== b_VACIO) B[i] = f(c & 255, (c >>> 8) & 255, (c >>> 16) & 255, i % 320, (i / 320) | 0); } }

// la luz de cada época: 1957, gris y fría; 1963, de noche, con el halo tramado del flexo en (lx, ly); 1972, clara;
// 1986, ámbar, más viva cerca de la ventana (vx, vy)
function b_luzEpoca(ep, lx, ly, vx, vy) {
  if (ep === 1957) return (r, g, b) => { const l = (r * 3 + g * 5 + b * 2) / 10; return b_rgb((r * 0.7 + l * 0.3) * 0.93, (g * 0.7 + l * 0.3) * 0.96, (b * 0.7 + l * 0.3) * 1.02 + 9); };
  if (ep === 1963) return (r, g, b, x, y) => { const d = Math.hypot((x - lx) * 0.8, (y - ly) * 1.1), n = Math.max(0, Math.min(4, Math.floor(4.7 - d / 38 + b_um(x, y) * 0.95))), f = [0.4, 0.5, 0.64, 0.82, 1][n];
    return n >= 3 ? b_rgb(r * f * 1.06 + 8, g * f * 0.98 + 3, b * f * 0.8) : b_rgb(r * f * 0.84, g * f * 0.9, b * f * 1.1 + 18); };
  if (ep === 1986) return (r, g, b, x, y) => { const d = Math.hypot((x - vx) * 0.7, y - vy), n = Math.max(0, Math.min(3, Math.floor(3.8 - d / 80 + b_um(x, y) * 0.95))), f = [0.62, 0.74, 0.87, 1][n];
    return b_rgb(r * f * 1.08 + 28 * f, g * f * 0.8 + 8, b * f * 0.5 + 8); };
  return (r, g, b) => b_rgb(r * 1.02 + 3, g + 1, b * 0.96);
}

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function b_rc(R, cl, x0, y0, x1, y1, c) { x0 = Math.max(Math.round(x0), cl[0]); y0 = Math.max(Math.round(y0), cl[1]); x1 = Math.min(Math.round(x1), cl[2]); y1 = Math.min(Math.round(y1), cl[3]); if (x1 >= x0 && y1 >= y0) R.rect(x0, y0, x1, y1, c); }

// aclara (o tiñe) lo que haya en una elipse, tramado: un charco de luz
function b_charco(R, cx, cy, rx, ry, col, a = 0.28) {
  const B = R.buf;
  for (let y = Math.max(0, cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, cx - rx); x <= Math.min(319, cx + rx); x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1 && b_um(x, y) < (1 - d) * 1.5) { const i = y * 320 + x; if (B[i] !== b_VACIO) B[i] = b_mez(B[i], col, d < 0.35 ? a : a * 0.6); } }
}

// la luz que entra por una ventana: un paralelogramo tramado (inclin: cuánto se tuerce por fila)
function b_rayo(R, x0, y0, x1, y1, inclin, col, a = 0.3) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = Math.max(0, x0 + d); x <= Math.min(319, x1 + d); x++) if (((x + y) & 1) === 0) { const i = y * 320 + x; B[i] = b_mez(B[i], col, a); } }
}

// la sombra de un mueble en el suelo: oscurece, tramada, una franja
function b_sombra(R, x0, y0, x1, y1, a = 0.3) { const B = R.buf; for (let y = y0; y <= y1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (((x + y) & 1) === 0 || y === y0) { const i = y * 320 + x; if (B[i] !== b_VACIO) B[i] = b_mez(B[i], C.k, a); } }

// pared de tablas verticales con juntas, canto de luz y vetas largas; T: los tonos de oscuro a claro; luz(x, y): el
// nivel (0–5) de cada punto, que se trama; calma(x, y): donde es verdadero, sin vetas (la esquina de Atom)
function b_pared(R, x0, y0, x1, y1, T, luz, k = 0, ancho = 14, calma = null) {
  const B = R.buf, n = T.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const tb = Math.floor(x / ancho), dx = x - tb * ancho, q = calma && calma(x, y);
    let l = luz(x, y) + (b_um(x, y) - 0.5) * 0.8 + (q ? 0 : (h(tb, 0, 70 + k) - 0.5) * 0.7);
    if (dx === 0) l -= q ? 0.6 : 1.5; else if (dx === 1 && !q) l += 0.6;
    else if (!q) { const v = h(tb * 31 + dx, Math.floor((y + h(tb, dx, 71 + k) * 60) / (16 + ((dx * 7) % 5) * 7)), 72 + k); if (v < 0.2) l -= 0.8; else if (v > 0.92) l += 0.7; }
    B[y * 320 + x] = T[Math.max(0, Math.min(n, Math.round(l)))];
  }
  for (let i = 0; i < 9; i++) { const nx = x0 + 6 + Math.round(h(i, 1, 73 + k) * (x1 - x0 - 12)), ny = y0 + 8 + Math.round(h(i, 2, 73 + k) * (y1 - y0 - 16)); if (calma && calma(nx, ny)) continue; R.rect(nx - 1, ny - 2, nx + 1, ny + 2, T[1]); R.rect(nx, ny - 1, nx, ny + 1, T[0]); R.pset(nx - 2, ny, T[1]); R.pset(nx + 2, ny, T[1]); }
}

// tarima vista de frente: filas de tablas cada vez más altas, con las juntas a matajunta y vetas; T: junta y tres tonos
function b_tarima(R, y0, T, k = 0) {
  const { rect } = R; let y = y0, a = 5;
  for (let f = 0; y < 180; f++) { const y1 = Math.min(179, y + a - 1); let x = -Math.round(h(f, 1, 90 + k) * 50);
    while (x < 320) { const L = 44 + Math.round(h(x, f, 91 + k) * 50), c = T[1 + Math.floor(h(x, f, 92 + k) * 2.99)]; rect(Math.max(0, x), y, Math.min(319, x + L - 1), y1, c);
      for (let g = 0; g < 2 + (a >> 2); g++) { const gy = y + 1 + Math.floor(h(x, g, 93 + k + f) * Math.max(1, a - 2)), gx = x + 2 + Math.round(h(x, g, 94 + k + f) * (L - 18)); if (gy < y1) rect(Math.max(0, gx), gy, Math.min(319, Math.min(x + L - 2, gx + 6 + Math.round(h(gx, gy, 95) * 18))), gy, h(gx, g, 96) < 0.55 ? T[0] : T[3]); }
      if (x + L - 1 < 320 && x + L - 1 >= 0) rect(x + L - 1, y, x + L - 1, y1, T[0]); x += L; }
    rect(0, y1, 319, y1, T[0]); y = y1 + 1; a += 1 + (f % 2); }
}

const b_LOMOS = b_hx(['#a8343a', '#2e5a8a', '#d8a838', '#3a7a52', '#6a4a8a', '#d8cdb4', '#c0642a', '#243a5a', '#7a2a34', '#4a8a8a', '#8a6a3a', '#b8b0a0']);

// una balda de libros de x0 a x1 con la base en yb: lomos de colores con su filo de luz y sus dos franjas (sin letras);
// lleno 0–1: cuánto ocupa (lo demás, huecos, libros tumbados o inclinados); papeles 0–1: hojas que asoman entre ellos
function b_lomos(R, x0, x1, yb, alto, sem, lleno = 1, papeles = 0) {
  const { rect, pset } = R; let x = x0;
  for (let k = 0; x < x1 - 2; k++) {
    if (h(k, sem, 80) > lleno) {
      const r = h(k, sem, 81);
      if (r < 0.45 && x + 13 < x1) { const n = 1 + Math.round(h(k, sem, 82) * 2); for (let i = 0; i < n; i++) { const c = b_LOMOS[(k + i * 5 + sem) % 12], y = yb - i * 4; rect(x, y - 3, x + 11 - i, y, C.k); rect(x + 1, y - 2, x + 10 - i, y - 1, c); rect(x + 8 - i, y - 2, x + 10 - i, y - 1, hex('#e8e0c8')); } x += 14; }
      else if (r < 0.7 && x + 9 < x1) { const c = b_LOMOS[(k * 3 + sem) % 12], hh = alto - 3; for (let j = 0; j <= hh; j++) { const xx = x + Math.round((hh - j) * 0.3); pset(xx, yb - j, C.k); pset(xx + 1, yb - j, b_mez(c, C.blanco, 0.25)); pset(xx + 2, yb - j, c); pset(xx + 3, yb - j, C.k); } x += 9; }
      else x += 4 + Math.round(h(k, sem, 83) * 7);
      continue;
    }
    const w = 2 + Math.round(h(k, sem, 84) * 3), hh = Math.round(alto * (0.66 + 0.34 * h(k, sem, 85))), c = b_LOMOS[Math.floor(h(k, sem, 86) * 11.99)];
    if (x + w > x1) break;
    rect(x, yb - hh, x + w, yb, C.k); rect(x + 1, yb - hh + 1, x + w - 1, yb, c); rect(x + 1, yb - hh + 1, x + 1, yb, b_mez(c, C.blanco, 0.28));
    if (w > 2) { rect(x + 1, yb - hh + 3, x + w - 1, yb - hh + 3, b_mez(c, hex('#f4e0a0'), 0.7)); rect(x + 1, yb - 3, x + w - 1, yb - 3, b_mez(c, C.k, 0.35)); }
    if (papeles && h(k, sem, 87) < papeles) rect(x + w, yb - hh - 2, x + w, yb - hh + 3, hex('#efe6d0'));
    x += w + 1;
  }
}

// una nube pequeña de tres tonos (sombra abajo, cuerpo, luz arriba); la recorta R.recorte. P: [sombra, cuerpo, luz]
function b_nube(R, cx, cy, w, P) {
  const N = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of N) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), P[0]);
  for (const [dx, dy, f] of N) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), P[1]);
  for (const [dx, dy, f] of N) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.7), P[2]);
  R.linea(Math.round(cx - w * 0.5), Math.round(cy + w * 0.24), Math.round(cx + w * 0.5), Math.round(cy + w * 0.24), P[0]);
}

// un abeto del noroeste (con poligono y linea: lo recorta R.recorte): pisos que se abren hacia abajo y se mecen con
// el viento, más arriba que abajo. P: [oscuro, medio, luz, tronco]
function b_abeto(R, x, yb, alto, t, P, k = 0) {
  const n = Math.max(3, Math.round(alto / 6)), an = alto * 0.24;
  R.linea(x, yb, x, yb - Math.round(alto * 0.3), P[3]); R.linea(x + 1, yb, x + 1, yb - Math.round(alto * 0.3), P[3]);
  for (let j = n - 1; j >= 0; j--) { const u = j / n, y1 = yb - Math.round(alto * 0.12) - Math.round(u * alto * 0.88 * 0.86), y0 = y1 - Math.round(alto / n * 1.9), w = Math.max(2, Math.round(an * (1 - u * 0.86))), m = Math.round(Math.sin(t * 1.3 + k * 1.7 + j * 0.5) * 1.6 * u);
    R.poligono([[x + m, y0], [x - w + (m >> 1), y1], [x + w + 1 + (m >> 1), y1]], P[0]);
    R.poligono([[x + m, y0 + 1], [x - w + 2 + (m >> 1), y1 - 1], [x + (m >> 1), y1 - 1]], P[1]);
    R.linea(x + m, y0 + 1, x - w + 2 + (m >> 1), y1 - 1, P[2]); }
}

// la ventana del cuarto y lo que se ve por ella, todo recortado a su cristal cl = [x0, y0, x1, y1]. modo: 'lluvia'
// (día gris), 'noche' (luna, estrellas y lluvia), 'dia' (nubes y pájaros) o 'tarde' (el sol bajo, ámbar)
function b_ventana(R, t, cl, modo) {
  const [x0, y0, x1, y1] = cl, B = R.buf, w = x1 - x0, a = y1 - y0, { disco, linea, pset, rect } = R;
  const S = b_hx({ lluvia: ['#74828f', '#8c98a4', '#a6b0b8', '#bcc4c8'], noche: ['#0c1230', '#141c44', '#1e2858', '#2c3668'], dia: ['#3e98dc', '#62b0ea', '#90ccf2', '#c4e6f6'], tarde: ['#4e3a7c', '#a04e78', '#e8744e', '#f8b450'] }[modo] ?? ['#74828f', '#8c98a4', '#a6b0b8', '#bcc4c8']);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = S[Math.max(0, Math.min(3, Math.floor((y - y0) / (a * 0.8) * 3.4 + (b_um(x, y) - 0.5) * 0.9)))];
  R.recorte(cl);
  const lejos = { lluvia: '#7a8c8c', noche: '#141a38', dia: '#6a9c8a', tarde: '#7a3a4e' }[modo], P = b_hx({ lluvia: ['#2c4a40', '#3c6050', '#5a7c68', '#3a2c24'], noche: ['#0a1020', '#101a2c', '#1e2c44', '#0a0c16'], dia: ['#1e5236', '#2e7048', '#58a064', '#4a3222'], tarde: ['#2a1a2c', '#4a2630', '#c0603a', '#20121c'] }[modo]);
  if (modo === 'tarde') { const sx = x0 + Math.round(w * 0.32), sy = y1 - 22; disco(sx, sy, 10, hex('#f8c860')); disco(sx, sy, 7, hex('#fff0b8')); for (let k = 0; k < 3; k++) rect(Math.max(x0, sx - 14 + k * 3), sy + 2 + k * 3, Math.min(x1, sx + 14 - k * 3), sy + 2 + k * 3, hex('#e8744e'));
    for (const [cx, cy, cw, v] of [[10, 9, 20, 0.9], [44, 17, 16, 1.6], [28, 25, 12, 2.4]]) b_nube(R, x0 + ((cx + t * v) % (w + 30)) - 12, y0 + cy, cw, b_hx(['#7a3a6a', '#c05a6a', '#f8a060'])); }
  if (modo === 'noche') { for (let k = 0; k < 16; k++) { const sx = x0 + Math.round(h(k, 1, 60) * w), sy = y0 + Math.round(h(k, 2, 60) * a * 0.5), tw = Math.sin(t * (1.2 + h(k, 3, 60) * 2) + k * 2); if (tw > -0.3) pset(sx, sy, tw > 0.6 ? C.blanco : hex('#8a94c8')); }
    const mx = x1 - 14, my = y0 + 11; for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) if (Math.hypot(i, j) <= 5 && Math.hypot(i - 2.4, j - 1) > 4.2) pset(mx + i, my + j, hex('#e8e4c8'));
    for (const [cx, cy, cw, v] of [[8, 20, 22, 0.7], [40, 10, 16, 1.2]]) b_nube(R, x0 + ((cx + t * v) % (w + 30)) - 12, y0 + cy, cw, b_hx(['#141c40', '#1e2850', '#2e3a68'])); }
  if (modo === 'dia') { disco(x1 - 12, y0 + 10, 5, hex('#fff4c8')); for (const [cx, cy, cw, v] of [[6, 10, 22, 1.1], [40, 20, 16, 1.9], [22, 30, 12, 2.9]]) b_nube(R, x0 + ((cx + t * v) % (w + 34)) - 14, y0 + cy, cw, b_hx(['#c0d8ec', '#e6f2fa', '#ffffff']));
    for (let k = 0; k < 2; k++) { const bx = x0 + ((t * (7 + k * 3) + k * 37) % (w + 16)) - 8, by = y0 + 8 + k * 9 + Math.round(Math.sin(t * 2 + k) * 2), al = Math.floor(t * 5 + k) % 2; pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); pset(bx - 2, by + (al ? 0 : -1) - (al ? 1 : 0), C.k); pset(bx + 2, by + (al ? 0 : -1) - (al ? 1 : 0), C.k); } }
  if (modo === 'lluvia') for (const [cx, cy, cw, v] of [[4, 8, 30, 0.8], [38, 14, 24, 1.4], [20, 24, 18, 2.2]]) b_nube(R, x0 + ((cx + t * v) % (w + 40)) - 18, y0 + cy, cw, b_hx(['#5e6c7a', '#74828f', '#909ca6']));
  // las colinas lejanas, erizadas de abetos, y dos filas de abetos más cerca
  for (let x = x0; x <= x1; x++) { const yr = y1 - 20 - Math.round(5 * Math.sin(x * 0.07 + 1) + 3 * Math.sin(x * 0.19)) - ((x * 7) % 3); linea(x, yr, x, y1, hex(lejos)); }
  for (let k = 0; k < 9; k++) b_abeto(R, x0 + 2 + k * 8 + ((k * 5) % 3), y1 - 2 + (k % 2) * 2, 20 + ((k * 7) % 9), t * 0.7, [P[0], P[0], P[1], P[3]], k);
  b_abeto(R, x0 + 13, y1 + 6, 50, t, P, 3); b_abeto(R, x1 - 9, y1 + 8, 40, t, P, 7);
  if (modo === 'lluvia' || modo === 'noche') { const c = hex(modo === 'noche' ? '#4a5890' : '#d4dce4');
    for (let k = 0; k < 30; k++) { const rx = x0 + Math.round(h(k, 1, 61) * (w + 10)), ph = (t * (1.5 + h(k, 2, 61) * 0.7) + h(k, 3, 61)) % 1, ry = y0 - 6 + Math.round(ph * (a + 10)); linea(rx, ry, rx - 1, ry + 3, c); }
    for (let k = 0; k < 6; k++) { const gx = x0 + 4 + Math.round(h(k, 4, 61) * (w - 8)), ph = (t * (0.07 + h(k, 5, 61) * 0.08) + h(k, 6, 61)) % 1, gy = y0 + Math.round(ph * a); pset(gx, gy, C.blanco); pset(gx, gy - 1, c); pset(gx, gy - 2, c); } }   // gotas que resbalan por el cristal
  for (let i = 0; i < 9; i++) if (i % 2) pset(x0 + 5 + i, y0 + 12 - i, modo === 'noche' ? hex('#3a4678') : C.blanco);   // el reflejo del cristal
  R.recorte(null);
}

// un gato dormido, hecho un ovillo (14 × 7): respira y mueve una oreja. P: [pelo, sombra, claro]
function b_gatoDormido(R, x, y, t, P) {
  const { rect, pset } = R, r = Math.sin(t * 1.6) > 0.3 ? 1 : 0;
  rect(x - 6, y - 4 - r, x + 5, y, C.k); rect(x - 7, y - 3, x + 6, y, C.k); rect(x - 5, y - 3 - r, x + 4, y - 1, P[0]); rect(x - 6, y - 2, x + 5, y - 1, P[0]); rect(x - 3, y - 3 - r, x + 2, y - 3 - r, P[2]);
  rect(x - 6, y - 1, x + 2, y - 1, P[1]); pset(x - 2, y - 2, P[1]); pset(x + 1, y - 2, P[1]);
  rect(x + 2, y - 5, x + 7, y - 1, C.k); rect(x + 3, y - 4, x + 6, y - 1, P[0]); pset(x + 3, y - 6, C.k); pset(x + 6, y - 6 + (Math.sin(t * 0.9) > 0.94 ? 1 : 0), C.k); pset(x + 4, y - 2, C.k); pset(x + 5, y - 2, C.k); pset(x + 6, y - 3, hex('#e8a0a0'));
  rect(x - 7, y, x - 2, y, P[1]); pset(x - 8, y - 1, C.k);
}

// un perro dormido, tumbado de lado (22 × 9): respira y mueve la cola de vez en cuando
function b_perroDormido(R, x, y, t) {
  const { rect, pset } = R, r = Math.sin(t * 1.3) > 0.2 ? 1 : 0, p = hex('#c89858'), s = hex('#9a7038'), l = hex('#e8c488'), co = Math.sin(t * 0.8) > 0.8 ? Math.round(Math.sin(t * 9)) : 0;
  rect(x - 9, y - 6 - r, x + 6, y, C.k); rect(x - 8, y - 5 - r, x + 5, y - 1, p); rect(x - 6, y - 5 - r, x + 2, y - 5 - r, l); rect(x - 8, y - 1, x + 5, y - 1, s);
  rect(x + 5, y - 6, x + 12, y, C.k); rect(x + 6, y - 5, x + 11, y - 1, p); rect(x + 5, y - 6, x + 7, y - 2, s); pset(x + 9, y - 3, C.k); pset(x + 10, y - 3, C.k); rect(x + 11, y - 2, x + 12, y - 1, C.k); rect(x + 8, y - 1, x + 10, y - 1, l);
  rect(x - 12, y - 2 + co, x - 9, y - 1 + co, C.k); pset(x - 11, y - 2 + co, p); rect(x - 4, y, x + 2, y, s);
}

// una pila de hojas en el suelo (base en yb, de w de ancho y alto de alta): hojas descuadradas de dos tonos
function b_pila(R, x, yb, w, alto, sem = 0, tn = null) {
  const cs = [hex('#efe6d0'), hex('#cfc4a8'), hex('#f8f2e2'), hex('#b8ac90')].map((c) => (tn ? tn(c, x, yb) : c)), n = Math.round(alto); if (n < 1) return;
  for (let j = 0; j < n; j++) { const dx = Math.round((h(j, sem, 88) - 0.5) * 3), y = yb - j; R.rect(x - (w >> 1) + dx - 1, y, x + (w >> 1) + dx + 1, y, C.k); R.rect(x - (w >> 1) + dx, y, x + (w >> 1) + dx, y, cs[j % 3 === 2 ? 1 : h(j, sem, 89) < 0.15 ? 3 : 0]); }
  const dx = Math.round((h(n - 1, sem, 88) - 0.5) * 3); R.rect(x - (w >> 1) + dx - 1, yb - n, x + (w >> 1) + dx + 1, yb - n, C.k); R.rect(x - (w >> 1) + dx, yb - n + 1, x + (w >> 1) + dx, yb - n + 1, cs[2]);
}

// el mapa de la costa de Oregón en papel (sin letras): el mar con sus olas a la izquierda, la franja de dunas, el
// bosque, un río con su desembocadura y un círculo rojo a lápiz sobre las dunas. (x0, y0): arriba a la izquierda
function b_mapaCosta(R, x0, y0, w, a, marco = false) {
  const { rect, pset, linea } = R;
  rect(x0 - 1, y0 - 1, x0 + w, y0 + a, C.k); if (marco) { rect(x0 - 3, y0 - 3, x0 + w + 2, y0 + a + 2, C.k); rect(x0 - 2, y0 - 2, x0 + w + 1, y0 + a + 1, hex('#6a4424')); rect(x0 - 2, y0 - 2, x0 + w + 1, y0 - 2, hex('#a8743c')); }
  for (let y = 0; y < a; y++) { const c = Math.round(w * 0.36 + 3 * Math.sin(y * 0.3) + 2 * Math.sin(y * 0.11 + 2)), d = c + 3 + Math.round(2 + 2 * Math.sin(y * 0.2 + 1));
    for (let x = 0; x < w; x++) { let col = x < c ? ((x + y * 2) % 7 === 0 && x < c - 2 ? hex('#8ab4cc') : hex('#a8cce0')) : x < d ? ((x + y) % 3 ? hex('#f0dc98') : hex('#d8bc70')) : (h(x, y, 62) < 0.25 ? hex('#8aa870') : hex('#a8c088'));
      if (x === c) col = hex('#4a7a9a'); pset(x0 + x, y0 + y, col); } }
  const ry = Math.round(a * 0.62); for (let x = Math.round(w * 0.4); x < w; x++) pset(x0 + x, y0 + ry - Math.round(3 * Math.sin((x - w * 0.4) * 0.25)), hex('#4a7a9a'));
  linea(x0 + (w >> 1), y0, x0 + (w >> 1), y0 + a - 1, hex('#c8bc98')); linea(x0, y0 + (a >> 1), x0 + w - 1, y0 + (a >> 1), hex('#c8bc98'));   // los dobleces
  R.anillo(x0 + Math.round(w * 0.46), y0 + Math.round(a * 0.3), 4, C.rojo);
  for (let k = 0; k < 4; k++) pset(x0 + w - 5 + (k % 2) * 2, y0 + a - 6 + (k >> 1) * 2, hex('#6a5a3a'));
}

// la lámina del planeta de arena (NUESTRO): dos lunas sobre dunas anaranjadas, en su marco
function b_lamina(R, x0, y0, w, a) {
  const { rect, disco, pset } = R;
  rect(x0 - 3, y0 - 3, x0 + w + 2, y0 + a + 2, C.k); rect(x0 - 2, y0 - 2, x0 + w + 1, y0 + a + 1, hex('#3a2a1e')); rect(x0 - 2, y0 - 2, x0 + w + 1, y0 - 2, hex('#6a4a30')); rect(x0, y0, x0 + w - 1, y0 + a - 1, hex('#f4c078'));
  for (let y = 0; y < a * 0.5; y++) for (let x = 0; x < w; x++) pset(x0 + x, y0 + y, b_um(x, y) < y / (a * 0.5) ? hex('#f4c078') : hex('#e8a060'));
  disco(x0 + Math.round(w * 0.3), y0 + 5, 3, hex('#fff0d0')); disco(x0 + Math.round(w * 0.62), y0 + 4, 1, hex('#f8e0c0'));
  for (let x = 0; x < w; x++) { const y1 = Math.round(a * 0.62 - 3 * Math.sin(x * 0.3 + 1)), y2 = Math.round(a * 0.78 - 2 * Math.sin(x * 0.22 + 3)); rect(x0 + x, y0 + y1, x0 + x, y0 + a - 1, hex('#e09848')); rect(x0 + x, y0 + y2, x0 + x, y0 + a - 1, hex('#b06a2c')); pset(x0 + x, y0 + y1, hex('#f8d090')); }
}

// el globo terráqueo en su pie de latón (el centro de la esfera en cx, cy)
function b_globo(R, cx, cy, r) {
  const { rect, disco, pset, linea } = R;
  rect(cx - 4, cy + r + 4, cx + 4, cy + r + 5, C.k); rect(cx - 3, cy + r + 4, cx + 3, cy + r + 4, hex('#d8a840')); rect(cx - 1, cy + r, cx + 1, cy + r + 3, hex('#a87820'));
  R.anillo(cx, cy, r + 2, hex('#a87820')); disco(cx, cy, r + 1, C.k); disco(cx, cy, r, hex('#4a8ac0'));
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) { const n = Math.sin(i * 0.9 + 1) + Math.sin(j * 1.1 + i * 0.4); if (n > 0.9) pset(cx + i, cy + j, n > 1.5 ? hex('#d8c078') : hex('#6aa860')); else if (i > r * 0.4 && i * i + j * j > r * r * 0.5) pset(cx + i, cy + j, hex('#3a6a9a')); }
  pset(cx - Math.round(r * 0.45), cy - Math.round(r * 0.5), C.blanco); pset(cx - Math.round(r * 0.45) + 1, cy - Math.round(r * 0.5), C.blanco); linea(cx - 1, cy - r - 3, cx + 1, cy - r - 1, hex('#d8a840'));
}

const b_VENT = [106, 36, 168, 90];

// lo fijo del cuarto en la época ep, con la luz neutra (la de la época se la da b_grada)
function b_cuartoFijo(R, ep) {
  const { rect, pset, disco, poligono, linea } = R, P = PIEZAS_DU, e57 = ep === 1957, e63 = ep === 1963, e72 = ep === 1972, e86 = ep === 1986;
  // el techo (una viga oscura, tranquila), la pared de tablas, el rodapié y la tarima
  rect(0, 0, 319, 19, hex('#3c281a')); for (let i = 0; i < 90; i++) { const x = Math.round(h(i, 1, 40) * 300), y = Math.round(h(i, 2, 40) * 18); rect(x, y, x + 6 + Math.round(h(i, 3, 40) * 14), y, hex('#422c1e')); }
  rect(0, 20, 319, 21, hex('#76522f')); rect(0, 22, 319, 22, hex('#2e1e14'));
  b_pared(R, 0, 23, 319, 121, b_hx(['#553820', '#644428', '#745030', '#855e3a', '#966c44', '#a67a50']), (x, y) => 3.2 - (y < 36 ? (36 - y) * 0.11 : 0) - Math.abs(x - 150) / 300, 0, 14, (x, y) => x > 264 && y < 50);
  rect(0, 122, 319, 127, hex('#4a3020')); rect(0, 122, 319, 122, hex('#8a623e')); rect(0, 126, 319, 126, hex('#3a2416')); rect(0, 127, 319, 127, hex('#24160e'));
  b_tarima(R, 128, b_hx(['#5e3c22', '#7c5230', '#8a5e38', '#9c6e44']), 0);
  b_sombra(R, 0, 128, 319, 130, 0.3);
  // la alfombra de rombos (abstracta), con su cenefa y sus flecos
  { const x0 = 58, x1 = 262, y0 = 134, y1 = 176, c1 = hex('#8e2e2a'), c2 = hex('#c8a25a'), c3 = hex('#2e4a5a'), c4 = hex('#e4d4a8');
    for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * 0.22); for (let x = x0 - d; x <= x1 + d; x++) { const u = (x - 160) / (1 + (y - y0) * 0.0022), v = y - y0, bo = v < 2 || v > y1 - y0 - 2 || x < x0 - d + 3 || x > x1 + d - 3, ce = v < 6 || v > y1 - y0 - 6 || x < x0 - d + 9 || x > x1 + d - 9;
      const rb = (Math.abs(((u + 400) % 28) - 14) + Math.abs(((v * 2.4 + 8) % 28) - 14));
      R.buf[y * 320 + x] = bo ? c3 : ce ? (((Math.floor(u / 4) + (v >> 1)) & 1) ? c2 : c1) : rb < 5 ? c4 : rb < 9 ? c3 : rb < 11 ? c2 : (h(x, y, 41) < 0.12 ? hex('#a03a32') : c1); } }
    for (let y = y0; y <= y1; y += 2) { const d = Math.round((y - y0) * 0.22); rect(x0 - d - 3, y, x0 - d - 1, y, c4); rect(x1 + d + 1, y, x1 + d + 3, y, c4); } }
  // ── la estantería grande: cinco baldas
  rect(3, 25, 93, 127, C.k); rect(4, 26, 92, 126, hex('#5a3a20')); rect(4, 26, 92, 27, hex('#a67844')); rect(4, 26, 5, 126, hex('#7c5430')); rect(91, 26, 92, 126, hex('#462c18')); rect(4, 124, 92, 126, hex('#3e2816'));
  const LL = e57 ? [0.55, 0.38, 0.62, 0.34, 0.5] : e63 ? [0.93, 0.9, 0.96, 0.88, 0.92] : e72 ? [0.97, 0.93, 0.97, 0.94, 0.9] : [0.98, 0.97, 0.98, 0.96, 0.97];
  for (let b = 0; b < 5; b++) { const yb = 45 + b * 19; rect(7, yb - 16, 89, yb, hex('#2a1c14')); rect(7, yb - 16, 89, yb - 14, hex('#1c120c')); rect(7, yb - 16, 8, yb, hex('#1c120c'));
    const fin = e57 && (b === 1 || b === 3) ? 64 : e72 && b === 2 ? 70 : 89;
    b_lomos(R, 9, fin, yb, 14, ep * 3 + b, LL[b], e63 ? 0.35 : 0);
    if (e57 && b === 1) { rect(69, yb - 9, 85, yb, C.k); rect(70, yb - 8, 84, yb - 1, hex('#3a3a44')); rect(70, yb - 8, 84, yb - 7, hex('#8a8a94')); disco(77, yb - 4, 3, C.k); disco(77, yb - 4, 2, hex('#5a7a9a')); pset(76, yb - 5, C.blanco); rect(81, yb - 11, 84, yb - 9, hex('#8a8a94')); }   // la cámara del reportero
    if (e57 && b === 3) { rect(70, yb - 6, 80, yb, C.k); rect(71, yb - 5, 79, yb - 1, hex('#c0603a')); rect(71, yb - 5, 79, yb - 5, hex('#e08050')); for (const [dx, dy] of [[-3, -8], [0, -11], [3, -9], [-1, -13], [2, -12], [-4, -11]]) { linea(75, yb - 6, 75 + dx, yb + dy, hex('#3a7a4a')); pset(75 + dx, yb + dy, hex('#6aaa5a')); } }   // una planta
    if (e72 && b === 2) { b_globo(R, 79, yb - 9, 5); }
    rect(6, yb + 1, 90, yb + 2, hex('#8a5e36')); rect(6, yb + 1, 90, yb + 1, hex('#b8844c')); }
  if (e63) for (const [x, y] of [[20, 24], [44, 23], [66, 24]]) { rect(x, y - 3, x + 16, y, C.k); rect(x + 1, y - 2, x + 15, y, hex('#efe6d0')); rect(x + 1, y - 1, x + 15, y - 1, hex('#cfc4a8')); }   // más hojas encima
  // ── la ventana (el cristal lo pinta b_ventana en cada fotograma): marco, alféizar y barra de la cortina
  rect(101, 31, 173, 95, C.k); rect(102, 32, 172, 94, hex('#e0d4b8')); rect(102, 32, 172, 33, hex('#f6eed8')); rect(170, 34, 172, 94, hex('#b8ac90')); rect(105, 35, 169, 91, C.k);
  rect(98, 95, 176, 99, C.k); rect(99, 95, 175, 97, hex('#e8dcc0')); rect(99, 95, 175, 95, hex('#f8f0dc')); rect(99, 98, 175, 98, hex('#a89c80'));
  rect(92, 28, 182, 29, hex('#2e2018')); disco(92, 28, 1, hex('#d8a840')); disco(182, 28, 1, hex('#d8a840'));
  // ── el arcón bajo la ventana, con su cojín de cuadros
  rect(103, 106, 171, 127, C.k); rect(104, 107, 170, 126, hex('#6e4826')); rect(104, 107, 170, 108, hex('#a67844')); for (let x = 104; x < 170; x += 11) rect(x, 109, x, 126, hex('#553820')); rect(104, 116, 170, 116, hex('#553820'));
  rect(133, 111, 141, 117, C.k); rect(134, 112, 140, 116, hex('#d8a840')); pset(137, 114, C.k); for (const x of [108, 166]) { rect(x - 1, 109, x + 1, 125, hex('#3a2416')); pset(x, 112, hex('#d8a840')); pset(x, 122, hex('#d8a840')); }
  rect(105, 102, 169, 106, C.k); for (let x = 106; x <= 168; x++) for (let y = 103; y <= 105; y++) pset(x, y, ((x >> 2) + (y >> 1)) & 1 ? hex('#a8343a') : hex('#e0d0b0')); rect(106, 103, 168, 103, hex('#c85a5a'));
  // ── la pared de los mapas
  if (e57) { b_mapaCosta(R, 183, 31, 38, 46); for (const [px, py] of [[183, 31], [220, 31]]) disco(px, py, 1, C.rojo);
    for (const [fx, fy, k] of [[226, 30, 0], [240, 34, 1], [228, 53, 2], [242, 57, 3]]) { rect(fx - 1, fy - 1, fx + 11, fy + 17, C.k); rect(fx, fy, fx + 10, fy + 16, k % 2 ? hex('#f4e8e0') : hex('#efe6d0')); rect(fx + 1, fy + 2, fx + 7, fy + 2, hex('#5a5a6a')); for (let l = 0; l < 4; l++) { rect(fx + 1, fy + 5 + l * 2, fx + 5 - (l + k) % 2, fy + 5 + l * 2, hex('#9a9aa8')); rect(fx + 8, fy + 5 + l * 2, fx + 9, fy + 5 + l * 2, hex('#9a9aa8')); }
      rect(fx + 5, fy + 13, fx + 9, fy + 14, C.rojo); disco(fx + 5, fy, 1, [C.rojo, hex('#3a6ab8'), hex('#e8c040'), C.rojo][k]); } }
  if (e63) { b_mapaCosta(R, 183, 31, 38, 46);
    { const x0 = 226, y0 = 30; rect(x0 - 1, y0 - 1, x0 + 26, y0 + 30, C.k); rect(x0, y0, x0 + 25, y0 + 29, hex('#ecd8a0')); for (let r = 3; r < 14; r += 3) for (let an = 0; an < 6.28; an += 0.12) { const x = Math.round(x0 + 12 + Math.cos(an) * r * 1.1 + Math.sin(an * 3) * 1.2), y = Math.round(y0 + 15 + Math.sin(an) * r); if (x > x0 && x < x0 + 25 && y > y0 && y < y0 + 29) pset(x, y, hex('#b88a48')); } disco(x0 + 12, y0 + 15, 1, C.rojo); }   // el mapa del desierto, con sus curvas de nivel
    const pin = []; for (let k = 0; k < 15; k++) { const nx = 181 + Math.round(h(k, 1, 42) * 62), ny = 62 + Math.round(h(k, 2, 42) * 26) - (k % 5 === 0 ? 34 : 0), c = b_hx(['#efe6d0', '#f4e8a0', '#e8d4c0', '#d8e4d0'])[k % 4]; rect(nx - 1, ny - 1, nx + 9, ny + 7, C.k); rect(nx, ny, nx + 8, ny + 6, c); for (let l = 0; l < 2; l++) rect(nx + 1, ny + 2 + l * 2, nx + 6 - (k + l) % 3, ny + 2 + l * 2, hex('#7a7a8a')); disco(nx + 4, ny, 1, k % 3 ? C.rojo : hex('#3a6ab8')); pin.push([nx + 4, ny]); }
    for (let k = 0; k < 6; k++) { const a = pin[k * 2], b = pin[(k * 2 + 5) % 15]; linea(a[0], a[1], b[0], b[1], hex('#c83a3a'), 0); }
    for (const [x, y, c] of [[94, 40, '#f4e8a0'], [94, 58, '#efe6d0'], [96, 76, '#e8d4c0']]) { rect(x - 1, y - 1, x + 6, y + 7, C.k); rect(x, y, x + 5, y + 6, hex(c)); rect(x + 1, y + 2, x + 4, y + 2, hex('#7a7a8a')); rect(x + 1, y + 4, x + 3, y + 4, hex('#7a7a8a')); } }
  if (e72 || e86) { b_mapaCosta(R, 185, 31, 34, 36, true); b_lamina(R, 228, 31, 22, 18); }
  if (e72) { rect(180, 78, 254, 80, C.k); rect(181, 78, 253, 78, hex('#b8844c')); rect(181, 79, 253, 79, hex('#8a5e36')); for (const x of [186, 248]) poligono([[x - 2, 81], [x + 2, 81], [x, 86]], hex('#462c18'));
    P.trofeoNebula?.(R, 198, 78, {}); P.trofeoHugo?.(R, 216, 78, {}); for (let i = 0; i < 3; i++) { rect(228, 74 - i * 4, 242 - i, 77 - i * 4, C.k); rect(229, 75 - i * 4, 241 - i, 76 - i * 4, b_LOMOS[[1, 6, 3][i]]); } }
  if (e86) { rect(180, 82, 254, 84, C.k); rect(181, 82, 253, 82, hex('#c8944c')); rect(181, 83, 253, 83, hex('#8a5e36')); for (const x of [186, 248]) poligono([[x - 2, 85], [x + 2, 85], [x, 90]], hex('#462c18'));
    rect(183, 70, 185, 81, C.k); rect(184, 71, 184, 81, hex('#d8a840'));   // el sujetalibros
    b_hx(['#c8742a', '#2e5a8a', '#3a7a52', '#8a2a34', '#d8a838', '#4a3a7a']).forEach((c, i) => { const x = 187 + i * 7, hh = 18 - (i % 3); rect(x, 81 - hh, x + 6, 81, C.k); rect(x + 1, 82 - hh, x + 5, 81, c); rect(x + 1, 82 - hh, x + 1, 81, b_mez(c, C.blanco, 0.35)); rect(x + 2, 85 - hh, x + 5, 85 - hh, hex('#f4e0a0')); rect(x + 2, 87 - hh, x + 5, 87 - hh, hex('#f4e0a0')); disco(x + 3, 75, 1, hex('#f4c078')); rect(x + 2, 79, x + 5, 79, b_mez(c, C.k, 0.4)); });
    rect(229, 70, 231, 81, C.k); rect(230, 71, 230, 81, hex('#d8a840')); P.trofeoNebula?.(R, 239, 82, { s: 1 }); }
  // ── el mueble de cajones con el globo y los libros abiertos de desiertos y plantas
  rect(181, 99, 253, 127, C.k); rect(182, 100, 252, 126, hex('#6e4826')); rect(182, 100, 252, 101, hex('#b8844c')); rect(182, 102, 252, 102, hex('#553820'));
  for (let f = 0; f < 2; f++) for (let c = 0; c < 3; c++) { const x = 184 + c * 23, y = 104 + f * 11; rect(x, y, x + 21, y + 9, hex('#553820')); rect(x + 1, y + 1, x + 20, y + 8, hex('#7c5430')); rect(x + 1, y + 1, x + 20, y + 1, hex('#966c44')); rect(x + 7, y + 3, x + 14, y + 5, hex('#e8dcc0')); rect(x + 9, y + 6, x + 12, y + 7, hex('#d8a840')); pset(x + 9, y + 4, hex('#7a7a8a')); pset(x + 11, y + 4, hex('#7a7a8a')); }
  if (!e72) b_globo(R, 240, 86, 7); if (e72) { rect(234, 90, 247, 99, C.k); rect(235, 91, 246, 98, hex('#c0603a')); rect(235, 91, 246, 91, hex('#e08050')); for (let k = 0; k < 9; k++) { const dx = Math.round((h(k, 1, 43) - 0.5) * 16), dy = -4 - Math.round(h(k, 2, 43) * 12); linea(240, 91, 240 + dx, 91 + dy, hex('#2e6a3e')); disco(240 + dx, 91 + dy, 1, k % 2 ? hex('#5aa85a') : hex('#3a8a4a')); } }
  // el libro abierto (dunas dibujadas en una página, una planta en la otra) y otros apilados
  { const x = 186, y = 99; rect(x, y - 4, x + 27, y, C.k); rect(x + 1, y - 3, x + 13, y - 1, hex('#f4ecd8')); rect(x + 14, y - 3, x + 26, y - 1, hex('#e8dcc0')); pset(x + 13, y - 1, hex('#a89c80'));
    rect(x + 3, y - 2, x + 5, y - 2, hex('#e09848')); rect(x + 6, y - 3, x + 8, y - 3, hex('#e09848')); rect(x + 8, y - 2, x + 11, y - 2, hex('#b06a2c')); pset(x + 19, y - 3, hex('#3a8a4a')); pset(x + 20, y - 2, hex('#3a8a4a')); pset(x + 21, y - 3, hex('#5aa85a')); pset(x + 17, y - 2, hex('#7a7a8a')); pset(x + 23, y - 2, hex('#7a7a8a'));
    if (!e57) for (let i = 0; i < (e63 ? 3 : 2); i++) { rect(216, y - 3 - i * 4, 229 - i, y - i * 4, C.k); rect(217, y - 2 - i * 4, 228 - i, y - 1 - i * 4, b_LOMOS[[6, 3, 2][i]]); rect(225 - i, y - 2 - i * 4, 228 - i, y - 1 - i * 4, hex('#e8e0c8')); } }
  // ── el reloj de péndulo (la esfera y la caja; el péndulo y las agujas, en vivo) y un cuadro pequeño del mar
  rect(254, 50, 268, 86, C.k); rect(255, 51, 267, 85, hex('#5a3a20')); rect(255, 51, 267, 52, hex('#a67844')); poligono([[254, 50], [261, 45], [268, 50]], C.k); poligono([[256, 50], [261, 47], [266, 50]], hex('#7c5430'));
  disco(261, 59, 5, C.k); disco(261, 59, 4, hex('#f4ecd8')); for (let k = 0; k < 4; k++) pset(261 + [0, 3, 0, -3][k], 59 + [-3, 0, 3, 0][k], hex('#5a5a6a')); rect(257, 67, 265, 83, hex('#2a1c14'));
  rect(276, 56, 300, 74, C.k); rect(277, 57, 299, 73, hex('#8a6a3a')); rect(277, 57, 299, 57, hex('#c8a25a')); rect(279, 59, 297, 71, hex('#a8cce0')); rect(279, 66, 297, 71, hex('#4a7a9a')); for (let x = 280; x < 297; x += 4) pset(x + (x % 3), 68, hex('#cfe2f0')); rect(279, 70, 297, 71, hex('#f0dc98')); disco(292, 62, 1, hex('#fff4c8'));
  // ── el sillón verde con su manta y la lámpara de pie
  b_sombra(R, 258, 144, 316, 148, 0.3);
  { const v = hex('#4a6e50'), vS = hex('#34523c'), vL = hex('#6a9068');
    rect(264, 98, 304, 140, C.k); rect(265, 99, 303, 139, v); rect(265, 99, 303, 100, vL); rect(300, 101, 303, 139, vS); for (const [bx, by] of [[274, 108], [284, 108], [294, 108], [279, 116], [289, 116]]) { pset(bx, by, vS); pset(bx - 1, by - 1, vL); }
    rect(260, 114, 270, 142, C.k); rect(261, 115, 269, 141, v); rect(261, 115, 269, 116, vL); rect(298, 114, 308, 142, C.k); rect(299, 115, 307, 141, vS); rect(299, 115, 307, 116, v);
    rect(270, 126, 298, 142, C.k); rect(271, 127, 297, 133, vL); rect(271, 134, 297, 141, v); rect(271, 134, 297, 134, vS);
    for (const x of [262, 305]) { rect(x, 143, x + 2, 146, C.k); pset(x + 1, 144, hex('#7c5430')); }
    for (let y = 100; y < 124; y++) for (let x = 292; x <= 304; x++) if (x - 292 > (y - 100) * 0.15 - 2) pset(x, y, ((x >> 1) + (y >> 1)) & 1 ? hex('#c8a25a') : ((x >> 1) & 1 ? hex('#8e2e2a') : hex('#e4d4a8'))); rect(291, 100, 291, 123, C.k); rect(292, 124, 304, 124, C.k); }   // la manta de cuadros
  rect(312, 88, 313, 145, C.k); rect(312, 88, 312, 145, hex('#b8944c')); rect(307, 145, 318, 147, C.k); rect(308, 145, 317, 145, hex('#d8a840'));
  poligono([[304, 88], [319, 88], [317, 72], [307, 72]], C.k); poligono([[305, 87], [319, 87], [316, 73], [308, 73]], e57 ? hex('#f8e8b0') : hex('#d8c8a0')); rect(308, 73, 316, 73, hex('#fff4d0')); for (let x = 307; x < 319; x += 3) pset(x, 86, hex('#a89060'));
  if (e57) b_charco(R, 310, 100, 22, 30, hex('#fff0c0'), 0.2);
  // ── la silla de trabajo, que asoma detrás de la mesa
  for (const x of [134, 157]) { rect(x, 113, x + 2, 150, C.k); rect(x + 1, 114, x + 1, 150, hex('#7c5430')); } rect(134, 113, 159, 119, C.k); rect(135, 114, 158, 118, hex('#855e3a')); rect(135, 114, 158, 114, hex('#b8844c'));
  for (const x of [140, 146, 152]) { rect(x, 120, x + 1, 138, hex('#5a3a20')); pset(x, 121, hex('#855e3a')); } rect(136, 128, 157, 129, hex('#5a3a20'));
  if (e63) for (const [x, y] of [[84, 152], [106, 160], [236, 156], [270, 164], [60, 170], [296, 154]]) { disco(x, y, 2, C.k); disco(x, y, 1, hex('#efe6d0')); pset(x, y - 1, hex('#f8f2e2')); pset(x + 1, y + 1, hex('#b8ac90')); }   // bolas de papel
}

// las pilas de notas de 1963: [x, yb, ancho, alto máximo]; las de detrás de los personajes y las de primer término
const b_PILAS = [[22, 149, 14, 20], [36, 150, 12, 12], [98, 147, 12, 15], [224, 146, 14, 24], [254, 150, 12, 14], [150, 101, 14, 7], [208, 98, 12, 6]];

const b_PILAS_D = [[26, 178, 16, 20], [48, 179, 12, 11], [242, 178, 16, 22], [292, 179, 14, 16]];

const b_GEO_CUARTO = { suelo: 150, mesa: { x0: 94, x1: 218, y: 143 }, asiento: 146, maquina: [180, 143], flexo: [114, 129], ventana: b_VENT, estanteria: [4, 26, 92, 126], mapas: [181, 30, 253, 92], honor: { x0: 187, x1: 228, y: 81 }, sillon: [284, 133], arcon: [137, 102], libres: [[16, 90], [222, 300]] };

function b_cuarto(R, t, o) {
  const ep = b_ep(o), L = b_luzEpoca(ep, 114, 122, 137, 64), tn = (c, x, y) => L(c & 255, (c >>> 8) & 255, (c >>> 16) & 255, x, y), { rect, pset, linea, disco } = R;
  b_fondo(R, 'cuarto' + ep, () => { b_cuartoFijo(R, ep); b_grada(R, L);
    if (ep === 1972) { b_rayo(R, 150, 128, 204, 172, 0.9, hex('#fff4c8'), 0.26); b_rayo(R, 108, 100, 166, 106, 0.3, hex('#fff4c8'), 0.2); }
    if (ep === 1986) { b_rayo(R, 176, 128, 236, 176, 1.5, hex('#ffc060'), 0.36); b_rayo(R, 178, 60, 230, 121, 0.5, hex('#ffc060'), 0.2); b_charco(R, 137, 64, 62, 46, hex('#ffc878'), 0.2); } });
  b_ventana(R, t, b_VENT, { 1957: 'lluvia', 1963: 'noche', 1972: 'dia', 1986: 'tarde' }[ep]);
  // el parteluz y el pestillo
  { const m = tn(hex('#e0d4b8'), 137, 60), mS = tn(hex('#a89c80'), 137, 60); rect(136, 36, 138, 90, m); rect(138, 36, 138, 90, mS); rect(106, 61, 168, 62, m); rect(106, 63, 168, 63, mS); rect(135, 64, 139, 66, tn(hex('#d8a840'), 137, 60)); }
  // las cortinas, que mueve el aire
  { const cs = (ep >= 1972 ? ['#c8743a', '#a85a2a', '#e8a060'] : ['#8a9a6a', '#6a7a52', '#aabb88']).map((c) => tn(hex(c), 100, 60));
    for (let y = 30; y < 100; y++) { const w = 7 + Math.round(Math.sin(t * 0.8 + y * 0.08) * 1.2 + (y - 30) * 0.02), w2 = 7 + Math.round(Math.sin(t * 0.7 + 2 + y * 0.07) * 1 + (y - 30) * 0.02);
      for (let i = 0; i <= w; i++) pset(96 + i, y, i % 4 === 1 ? cs[2] : i % 4 === 3 ? cs[1] : cs[0]); pset(96 + w + 1, y, C.k); pset(95, y, C.k);
      for (let i = 0; i <= w2; i++) pset(178 - i, y, i % 4 === 1 ? cs[2] : i % 4 === 3 ? cs[1] : cs[0]); pset(178 - w2 - 1, y, C.k); pset(179, y, C.k);
      if (ep >= 1972 && y % 9 === 4) { pset(99, y, cs[2]); pset(175, y, cs[2]); } } }
  // el péndulo y las agujas del reloj
  { const px = 261 + Math.round(Math.sin(t * 3.1) * 3), oro = tn(hex('#d8a840'), 261, 76); linea(261, 67, px, 79, oro); disco(px, 80, 1, oro); pset(px, 80, tn(hex('#fff0a0'), 261, 76));
    const am = t * 0.1 + ep; linea(261, 59, 261 + Math.round(Math.sin(am) * 3), 59 - Math.round(Math.cos(am) * 3), C.k); linea(261, 59, 261 + Math.round(Math.sin(am / 12 + 1) * 2), 59 - Math.round(Math.cos(am / 12 + 1) * 2), C.k); }
  // el animal de cada época
  if (ep === 1957) b_gatoDormido(R, 136, 101, t, [hex('#8a8a94'), hex('#5e5e70'), hex('#b8b8c4')].map((c) => tn(c, 136, 100)));
  if (ep === 1963) b_gatoDormido(R, 284, 126, t, [hex('#8a8a94'), hex('#5e5e70'), hex('#b8b8c4')].map((c) => tn(c, 284, 126)));
  if (ep === 1972) b_perroDormido(R, 286, 148, t);
  // las pilas de notas de 1963 (las de detrás de los personajes)
  if (ep === 1963) { const n = Math.max(0, Math.min(1, o.notas ?? 0.7)); b_PILAS.forEach(([x, yb, w, a], k) => b_pila(R, x, yb, w, a * n, k, tn)); }
  if (ep === 1963) { const a = t * 2.4, x = Math.round(116 + Math.cos(a) * 9 + Math.sin(a * 2.7) * 3), y = Math.round(115 + Math.sin(a * 1.3) * 6), al = Math.floor(t * 12) % 2; pset(x, y, hex('#e8e0d0')); pset(x - 1, y - al, hex('#b8b0a0')); pset(x + 1, y - al, hex('#b8b0a0')); }   // una polilla ronda el flexo
  // la lámpara de pie encendida (1957) parpadea apenas; motas de polvo en el rayo de sol (1972 y 1986)
  if (ep === 1957) { const f = Math.sin(t * 7) > 0.96; rect(309, 86, 315, 86, f ? hex('#e8d8a0') : hex('#fff4d0')); }
  if (ep === 1972 || ep === 1986) for (let k = 0; k < 16; k++) { const u = (t * 0.05 + h(k, 1, 44)) % 1, x = Math.round((ep === 1986 ? 190 : 150) + h(k, 2, 44) * 80 + Math.sin(t * 0.5 + k) * 4), y = Math.round(70 + u * 96); if (Math.sin(t * 1.5 + k * 2.3) > -0.2) pset(x, y, ep === 1986 ? hex('#ffe0a0') : hex('#fff8e0')); }
  return { ...b_GEO_CUARTO, epoca: ep };
}
function b_cuartoDelante(R, t, o) {
  const ep = b_ep(o), L = b_luzEpoca(ep, 114, 122, 137, 64), tn = (c, x, y) => L(c & 255, (c >>> 8) & 255, (c >>> 16) & 255, x, y), { rect, pset, linea, disco, poligono } = R, P = PIEZAS_DU, luz = ep === 1957 || ep === 1963;
  b_frente(R, 'cuartoD' + ep, 100, 179, () => {
    const m = hex('#83552c'), mS = hex('#5e3a1e'), mL = hex('#a8743c'), mD = hex('#3a2214');
    for (let y = 169; y <= 172; y++) for (let x = 94 + (y - 169) * 2; x <= 220 - (y - 169) * 2; x++) if ((x + y) & 1) pset(x, y, hex('#241610'));   // la sombra en la alfombra
    for (const x of [100, 209]) { rect(x, 166, x + 3, 170, C.k); rect(x + 1, 166, x + 2, 169, mS); }
    rect(98, 141, 214, 167, C.k);
    rect(99, 142, 136, 166, m); for (let k = 0; k < 3; k++) { const y = 143 + k * 8; rect(101, y, 134, y + 6, mS); rect(102, y + 1, 133, y + 5, m); rect(102, y + 1, 133, y + 1, mL); for (let g = 0; g < 3; g++) { const gx = 104 + Math.round(h(k, g, 45) * 20); rect(gx, y + 2 + g, gx + 6 + Math.round(h(g, k, 46) * 6), y + 2 + g, mS); } rect(114, y + 3, 121, y + 4, C.k); rect(115, y + 3, 120, y + 3, hex('#d8a840')); }
    rect(137, 142, 176, 166, hex('#1c120e')); rect(137, 142, 176, 150, hex('#2e1e16')); rect(137, 151, 176, 151, hex('#3e2a1e')); for (let x = 141; x < 176; x += 9) rect(x, 142, x, 150, hex('#241812'));
    rect(177, 142, 213, 166, m); rect(179, 144, 211, 164, mS); rect(180, 145, 210, 163, m); rect(180, 145, 210, 145, mL); rect(184, 149, 206, 159, mS); rect(185, 150, 205, 158, m); rect(185, 150, 205, 150, mL); for (let g = 0; g < 5; g++) { const gy = 147 + g * 3 + (g % 2), gx = 182 + Math.round(h(g, 1, 47) * 14); rect(gx, gy, gx + 8 + Math.round(h(g, 2, 47) * 8), gy, mS); } rect(181, 153, 182, 156, hex('#d8a840'));
    rect(94, 137, 218, 141, C.k); rect(95, 138, 217, 138, hex('#d09a5e')); rect(95, 139, 217, 140, mL); for (let g = 0; g < 9; g++) { const gx = 98 + Math.round(h(g, 3, 48) * 100); rect(gx, 139 + (g % 2), gx + 8, 139 + (g % 2), m); } rect(95, 140, 217, 140, mD);
    // el flexo verde
    rect(101, 134, 113, 137, C.k); rect(102, 135, 112, 136, hex('#2e6a3e')); rect(102, 135, 112, 135, hex('#4a9a5a'));
    linea(107, 134, 102, 122, C.k); linea(108, 134, 103, 122, hex('#8a8a94')); linea(102, 122, 110, 113, C.k); linea(103, 122, 111, 113, hex('#8a8a94')); disco(103, 122, 1, hex('#d8a840'));
    poligono([[106, 112], [116, 109], [123, 119], [111, 122]], C.k); poligono([[108, 113], [115, 111], [120, 118], [112, 120]], hex('#2e7a46')); linea(109, 113, 115, 111, hex('#6aba7a'));
    if (luz) { rect(114, 120, 119, 121, hex('#fff4c0')); }
    // el bote de lápices
    rect(121, 129, 128, 137, C.k); rect(122, 130, 127, 136, hex('#3a6ab8')); rect(122, 130, 127, 130, hex('#6a9ae0')); rect(122, 133, 127, 133, hex('#2a4a8a'));
    for (const [x, c, y] of [[122, '#e8c040', 123], [124, '#c83a3a', 125], [126, '#f4f0e8', 122]]) { rect(x, y, x, 129, hex(c)); pset(x, y - 1, C.k); } linea(125, 129, 129, 121, hex('#8a8a94'));
    // las hojas, la máquina (o su funda) y la taza (o el vaso con la flor)
    rect(149, 134, 167, 137, C.k); rect(150, 135, 166, 136, hex('#efe6d0')); rect(150, 134, 165, 134, hex('#f8f2e2')); rect(152, 135, 160, 135, hex('#9a9aa8'));
    if (ep === 1972) { rect(132, 131, 142, 137, C.k); rect(133, 132, 141, 136, hex('#c8a25a')); rect(134, 133, 140, 135, hex('#a8cce0')); rect(134, 135, 140, 135, hex('#e09848')); }   // una foto pequeña en su marco
    if (ep !== 1986) { P.maquina?.(R, 180, 138, {});
      rect(197, 130, 205, 137, C.k); rect(198, 131, 204, 136, hex('#f4f0e8')); rect(198, 131, 204, 131, hex('#5a3a2a')); rect(205, 132, 207, 135, C.k); pset(206, 133, hex('#f4f0e8')); pset(206, 134, hex('#f4f0e8')); rect(199, 134, 203, 134, hex('#c83a3a')); }
    else { poligono([[166, 137], [167, 123], [172, 118], [189, 118], [194, 123], [195, 137]], C.k); poligono([[167, 137], [168, 124], [173, 119], [188, 119], [193, 124], [194, 137]], hex('#7a7c6a')); linea(173, 119, 188, 119, hex('#a8aa94')); linea(168, 124, 173, 119, hex('#a8aa94'));
      for (const x of [172, 180, 188]) linea(x, 122, x + (x - 180) / 4, 136, hex('#5e6052')); rect(167, 135, 194, 135, hex('#5e6052')); rect(167, 136, 194, 136, hex('#c8a25a'));
      rect(199, 130, 204, 137, C.k); rect(200, 131, 203, 136, hex('#a8cce0')); rect(200, 134, 203, 136, hex('#7aa8c8')); pset(200, 131, C.blanco); linea(202, 131, 203, 121, hex('#3a7a4a')); pset(204, 125, hex('#5aa85a')); disco(203, 119, 2, hex('#f8f4ec')); pset(203, 119, hex('#e8c040')); }
    b_grada(R, L);
  }, 6);
  // en vivo: el flexo encendido, el vapor de la taza y, en 1963, las pilas de la mesa y las de primer término
  if (luz) { const f = Math.sin(t * 9) > 0.97 ? 1 : 0; for (let y = 128; y <= 142; y++) { const w = Math.round((y - 127) * 0.9); for (let x = 116 - w; x <= 117 + w; x++) if (b_um(x, y + (f ? 1 : 0)) < 0.34 - (y - 128) * 0.012 && x > 113 - w) { const c = R.pget(x, y); if (c) pset(x, y, b_mez(c, hex('#fff0b0'), 0.4)); } } pset(116, 127, C.blanco); }
  if (ep !== 1986) for (let k = 0; k < 3; k++) { const ph = (t * 0.55 + k / 3) % 1; for (let i = 0; i < 3; i++) pset(Math.round(201 + Math.sin(ph * 6 + k * 2 + i * 0.8) * 1.6), Math.round(135 - ph * 12 - i * 2), ph < 0.6 ? hex('#d8d4dc') : hex('#a8a4b8')); }
  if (ep === 1963) { const n = Math.max(0, Math.min(1, o.notas ?? 0.7)); b_pila(R, 136, 142, 10, 4 * n, 20, tn); b_pila(R, 210, 142, 10, 9 * n, 21, tn); b_PILAS_D.forEach(([x, yb, w, a], k) => b_pila(R, x, yb, w, a * n, 30 + k, tn)); }
  return { ...b_GEO_CUARTO, epoca: ep };
}

const b_GEO_MESA = { libre: [108, 96, 232, 172], foto: [209, 27, 237, 47], hoja: [127, 23, 169, 43], maquina: [148, 66], teclado: [116, 62, 180, 86], flexo: [264, 62], taza: [258, 96], facturas: [246, 110, 306, 172], mapa: [8, 122, 96, 176], sobres: [12, 88, 88, 116], tintero: [58, 70], reloj: [84, 72] };

function b_mesaFijo(R, ep, nf, nn) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, luz = ep === 1957 || ep === 1963;
  // la pared (tranquila) y el canto de atrás de la mesa
  b_pared(R, 0, 0, 319, 18, b_hx(['#4a3020', '#553820', '#5e3e24', '#664428', '#6e4a2c']), () => 2.4, 5, 16, (x, y) => x > 264 || y < 15);
  rect(0, 19, 319, 20, hex('#2a1a12')); rect(0, 21, 319, 21, hex('#c8925a'));
  // el tablero: tablas a lo largo, con la veta en ondas, juntas y nudos
  const T = b_hx(['#6a4424', '#83552c', '#96643a', '#a8743c', '#b88448']);
  for (let y = 22; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor((y - 22) / 26), dy = (y - 22) - tb * 26, on = Math.sin(x * 0.045 + tb * 2.1 + Math.sin(x * 0.013 + tb) * 2) * 3.2;
    const v = Math.abs(((dy + on + 40) % 6.5) - 3.2); let l = 2.4 + (h(tb, 0, 50) - 0.5) * 0.8 + (b_um(x, y) - 0.5) * 0.7; if (dy === 0) l -= 1.6; else if (v < 0.55) l -= 1; else if (v > 2.9) l += 0.55; if (h(x >> 3, y, 51) < 0.07) l -= 0.5;
    B[y * 320 + x] = T[Math.max(0, Math.min(4, Math.round(l)))]; }
  for (let i = 0; i < 5; i++) { const nx = 20 + Math.round(h(i, 1, 52) * 280), ny = 30 + Math.round(h(i, 2, 52) * 140); for (let r = 4; r > 0; r--) R.anillo(nx, ny, r, r % 2 ? T[0] : T[2]); pset(nx, ny, T[0]); }
  // la carpeta de escritorio de cuero verde: el sitio libre
  { const [x0, y0, x1, y1] = [104, 92, 236, 176]; b_sombra(R, x0 + 2, y1 + 1, x1 + 3, y1 + 2, 0.35); b_sombra(R, x1 + 1, y0 + 3, x1 + 3, y1, 0.35);
    rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#5e3a1e')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#8a5e36'));
    for (let y = y0 + 5; y <= y1 - 5; y++) for (let x = x0 + 5; x <= x1 - 5; x++) B[y * 320 + x] = h(x, y, 53) < 0.1 ? hex('#3a5a48') : h(x, y, 54) < 0.08 ? hex('#26402f') : hex('#2e4a3a');
    rect(x0 + 5, y0 + 5, x1 - 5, y0 + 5, hex('#1e3226')); rect(x0 + 5, y0 + 5, x0 + 5, y1 - 5, hex('#1e3226'));
    for (let x = x0 + 4; x < x1 - 3; x += 3) { pset(x, y0 + 3, hex('#c8a25a')); pset(x, y1 - 3, hex('#c8a25a')); } for (let y = y0 + 4; y < y1 - 3; y += 3) { pset(x0 + 3, y, hex('#c8a25a')); pset(x1 - 3, y, hex('#c8a25a')); }
    for (const [cx, cy, sx, sy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) for (let i = 1; i < 12; i++) rect(Math.min(cx + sx, cx + sx * (12 - i)), cy + sy * i, Math.max(cx + sx, cx + sx * (12 - i)), cy + sy * i, i === 11 || 12 - i === 1 ? hex('#3a2214') : hex('#6e4826')); }
  // ── la máquina de escribir, desde arriba en tres cuartos
  b_sombra(R, 106, 86, 196, 91, 0.4); b_sombra(R, 190, 52, 197, 86, 0.4);
  rect(126, 22, 170, 44, C.k); rect(127, 23, 169, 43, hex('#f8f4ea')); rect(168, 24, 169, 43, hex('#d8d0c0'));   // la hoja
  linea(107, 41, 96, 31, C.k); linea(108, 41, 97, 31, hex('#c8d0dc')); disco(96, 30, 2, C.k); pset(96, 30, hex('#c8d0dc'));   // la palanca del carro
  rect(100, 40, 196, 51, C.k); rect(101, 41, 195, 50, hex('#2a2a34')); rect(101, 41, 195, 41, hex('#5a5a68')); rect(104, 44, 192, 46, hex('#16161c')); rect(104, 44, 192, 44, hex('#44444e')); rect(112, 48, 184, 48, hex('#c8d0dc')); for (let x = 114; x < 184; x += 5) pset(x, 49, hex('#8a8a94'));
  for (const kx of [98, 198]) { rect(kx - 3, 41, kx + 3, 50, C.k); rect(kx - 2, 42, kx + 2, 49, hex('#3a3a44')); for (let y = 43; y < 49; y += 2) rect(kx - 2, y, kx + 2, y, hex('#16161c')); pset(kx - 1, 42, hex('#8a8a94')); }
  poligono([[108, 51], [188, 51], [196, 90], [100, 90]], C.k); poligono([[109, 52], [187, 52], [194, 89], [102, 89]], hex('#4a9a94')); poligono([[183, 52], [187, 52], [194, 89], [188, 89]], hex('#357a76')); linea(110, 52, 186, 52, hex('#8ad0c8')); linea(109, 53, 103, 88, hex('#6ab8b0')); rect(103, 88, 193, 89, hex('#2e6a66'));
  for (let x = 112; x <= 184; x++) { const dy = Math.round(9 * Math.sqrt(Math.max(0, 1 - ((x - 148) / 34) ** 2))); if (dy > 0) { rect(x, 53, x, 53 + dy, hex('#1c1c24')); if ((x - 148) % 3 === 0) linea(x, 53 + dy - 1, 148 + Math.round((x - 148) * 0.25), 54, hex('#8a8a98')); } }   // la cesta de los tipos
  rect(140, 53, 156, 54, hex('#c8d0dc')); rect(143, 86, 153, 86, hex('#d8a840'));
  for (let f = 0; f < 4; f++) { const y = 66 + f * 5, n = 11 - (f === 3 ? 1 : 0), x0 = 148 - (n - 1) * 3 - (f % 2); for (let k = 0; k < n; k++) { const x = x0 + k * 6 + (f % 2) * 3 - (f === 3 ? -3 : 0); disco(x, y, 2, C.k); rect(x - 1, y - 1, x + 1, y, hex('#f0e8d4')); pset(x - 1, y - 1, C.blanco); pset(x, y + 1, hex('#a89c80')); } }
  rect(127, 85, 169, 87, C.k); rect(128, 85, 168, 86, hex('#2a2a34')); rect(128, 85, 168, 85, hex('#5a5a68'));
  // ── a la izquierda: la bandeja con lápices y pluma, el bote, el tintero, el reloj de bolsillo, los sobres y el mapa
  b_sombra(R, 14, 51, 88, 53, 0.35); rect(12, 36, 86, 51, C.k); rect(13, 37, 85, 50, hex('#5e3a1e')); rect(15, 39, 83, 48, hex('#3a2214')); rect(15, 39, 83, 39, hex('#24160e'));
  rect(18, 41, 66, 42, hex('#e8c040')); rect(18, 42, 66, 42, hex('#b8901c')); rect(67, 41, 71, 42, hex('#f6c290')); pset(72, 41, C.k); rect(15, 41, 17, 42, hex('#e88a9a'));
  rect(22, 44, 62, 45, hex('#c83a3a')); rect(63, 44, 66, 45, hex('#f6c290')); pset(67, 44, C.k); rect(26, 46, 70, 47, hex('#1c2450')); rect(71, 46, 76, 47, hex('#d8a840')); pset(77, 46, hex('#8a8a94')); rect(40, 46, 42, 47, hex('#d8a840'));
  b_sombra(R, 22, 76, 40, 80, 0.35); disco(28, 68, 9, C.k); disco(28, 68, 8, hex('#3a6ab8')); disco(28, 68, 6, hex('#16203a')); for (const [dx, dy, c] of [[-3, -2, '#e8c040'], [1, -3, '#c83a3a'], [3, 1, '#f4f0e8'], [-2, 3, '#3a8a4a'], [0, 0, '#e8803a']]) { disco(28 + dx, 68 + dy, 1, hex(c)); pset(28 + dx, 68 + dy, C.k); } pset(22, 63, hex('#8ab0e8')); pset(23, 62, hex('#8ab0e8'));
  b_sombra(R, 53, 77, 68, 79, 0.35); rect(51, 63, 65, 77, C.k); rect(52, 64, 64, 76, hex('#1c2450')); rect(52, 64, 64, 64, hex('#4a5a9a')); rect(52, 64, 52, 76, hex('#33407a')); disco(58, 70, 4, C.k); disco(58, 70, 3, hex('#0c1028')); pset(57, 69, hex('#6a7ac8')); rect(54, 66, 55, 66, C.blanco);
  linea(76, 86, 92, 76, hex('#8a8a94'), 2); disco(84, 72, 7, C.k); disco(84, 72, 6, hex('#d8a840')); disco(84, 72, 5, hex('#f8f0dc')); for (let k = 0; k < 12; k++) pset(84 + Math.round(Math.sin(k * 0.5236) * 4), 72 - Math.round(Math.cos(k * 0.5236) * 4), hex('#5a5a6a')); rect(83, 63, 85, 65, C.k); pset(84, 64, hex('#d8a840'));
  for (const [x, y, g, k] of [[14, 96, -2, 0], [30, 90, 1, 1], [46, 97, 3, 2]]) { const q = [[x, y - g], [x + 40, y + g], [x + 40 + g, y + 22 + g], [x + g, y + 22 - g]]; b_sombra(R, x + 2, y + 22, x + 42, y + 24, 0.3); poligono(q.map(([a, b], i) => [a + (i === 1 || i === 2 ? 1 : -1), b + (i > 1 ? 1 : -1)]), C.k); poligono(q, [hex('#efe6d0'), hex('#e4dcc8'), hex('#f4ecd8')][k]);
    linea(x + 1, y - g + 1, x + 20, y + 10, hex('#b8ac90')); linea(x + 39, y + g + 1, x + 20, y + 10, hex('#b8ac90'));
    rect(x + 31, y + 3 + (g > 0 ? g : 0), x + 37, y + 9 + (g > 0 ? g : 0), [hex('#c83a3a'), hex('#3a6ab8'), hex('#3a8a4a')][k]); rect(x + 33, y + 5 + (g > 0 ? g : 0), x + 35, y + 7 + (g > 0 ? g : 0), hex('#f4ecd8')); for (let i = 0; i < 3; i++) for (let s = 0; s < 8; s++) pset(x + 22 + s, y + 4 + i * 2 + Math.round(Math.sin(s * 1.5) * 0.6) + (g > 0 ? g : 0), hex('#5a5a6a'));
    for (let l = 0; l < 3; l++) rect(x + 8 + g, y + 13 + l * 3, x + 26 - l * 4 + g, y + 13 + l * 3, hex('#8a8a98')); }
  { b_sombra(R, 10, 177, 100, 179, 0.3); const x0 = 8, y0 = 122; b_mapaCosta(R, x0, y0, 88, 54); linea(x0 + 29, y0, x0 + 29, y0 + 53, hex('#c8bc98')); linea(x0 + 58, y0, x0 + 58, y0 + 53, hex('#c8bc98'));
    const cx = x0 + 76, cy = y0 + 12; for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; linea(cx, cy, cx + Math.round(Math.sin(a) * 6), cy - Math.round(Math.cos(a) * 6), hex('#6a5a3a')); } R.anillo(cx, cy, 3, hex('#6a5a3a')); pset(cx, cy - 7, C.rojo);   // la rosa de los vientos
    rect(40, 150, 62, 151, hex('#c83a3a')); pset(63, 150, hex('#f6c290')); pset(64, 150, C.k); }   // el lápiz rojo encima
  // ── a la derecha: la foto enmarcada, el flexo, la taza y las facturas (o el cuaderno)
  b_sombra(R, 208, 52, 244, 55, 0.4); rect(204, 22, 242, 52, C.k); rect(205, 23, 241, 51, hex('#6a4424')); rect(205, 23, 241, 23, hex('#a8743c')); rect(207, 25, 239, 49, hex('#d8a840')); rect(208, 26, 238, 48, C.k);
  for (let y = 27; y <= 47; y++) for (let x = 209; x <= 237; x++) B[y * 320 + x] = y < 37 + Math.round(2 * Math.sin(x * 0.3)) ? (b_um(x, y) < (y - 27) / 14 ? hex('#d8c4a0') : hex('#c4ac84')) : y < 42 + Math.round(2 * Math.sin(x * 0.2 + 2)) ? hex('#a88a60') : hex('#8a6e48');
  for (let i = 0; i < 7; i++) pset(211 + i, 33 - i, hex('#ece0c4'));
  { const bx = 290, by = 86; b_sombra(R, bx - 8, by + 8, bx + 12, by + 12, 0.4); disco(bx, by, 10, C.k); disco(bx, by, 9, hex('#2e6a3e')); disco(bx - 1, by - 1, 6, hex('#3a7a4a')); for (let a = 3.4; a < 4.6; a += 0.12) pset(Math.round(bx + Math.cos(a) * 7), Math.round(by + Math.sin(a) * 7), hex('#8ad09a')); disco(bx, by, 2, C.k); pset(bx, by, hex('#c8d0dc'));
    for (const d of [-1, 0, 1]) { linea(bx + d, by, 299 + d, 55, d === 0 ? hex('#c8d0dc') : C.k); } disco(299, 55, 2, C.k); pset(299, 55, hex('#d8a840'));
    for (const d of [-1, 0, 1]) linea(299, 55 + d, 272, 61 + d, d === 0 ? hex('#c8d0dc') : C.k);
    for (let j = -11; j <= 11; j++) for (let i = -16; i <= 16; i++) { const d = (i / 16) ** 2 + (j / 11) ** 2; if (d <= 1) pset(262 + i, 62 + j, d > 0.8 ? C.k : d < 0.12 ? hex('#1e4a2c') : (i + j * 1.2 < -6 ? hex('#5aaa6a') : i + j > 10 ? hex('#245a34') : hex('#2e7a46'))); } disco(262, 62, 2, hex('#8a8a94')); pset(261, 61, C.blanco); }
  b_sombra(R, 254, 103, 270, 106, 0.4); disco(258, 96, 8, C.k); disco(258, 96, 7, hex('#f4f0e8')); disco(258, 96, 5, hex('#4a2e1e')); disco(257, 95, 3, hex('#6a4428')); pset(255, 94, hex('#a8845a')); rect(266, 94, 270, 98, C.k); rect(266, 95, 269, 97, hex('#f4f0e8')); pset(267, 96, C.k); for (let a = 2.6; a < 4.2; a += 0.15) pset(Math.round(258 + Math.cos(a) * 6), Math.round(96 + Math.sin(a) * 6), C.blanco);
  if (nf > 0) { for (let k = nf - 1; k >= 0; k--) { const x = 250 + k * 2 - (k % 2) * 5, y = 116 - k * 2 + (k % 2) * 3, w = 50, a = 54; if (k === nf - 1) b_sombra(R, 252, 168, 308, 172, 0.3); rect(x - 1, y - 1, x + w, y + a, C.k); rect(x, y, x + w - 1, y + a - 1, k % 2 ? hex('#f4e4dc') : hex('#f8f2e6'));
      if (k === 0) { rect(x + 3, y + 4, x + 24, y + 6, hex('#3a3a4a')); rect(x + 34, y + 3, x + 45, y + 8, hex('#c8c0b0')); for (let l = 0; l < 7; l++) { rect(x + 3, y + 12 + l * 4, x + 22 - (l * 5) % 9, y + 12 + l * 4, hex('#9a9aa8')); rect(x + 36, y + 12 + l * 4, x + 45, y + 12 + l * 4, hex('#7a7a8a')); } rect(x + 30, y + 41, x + 46, y + 41, hex('#3a3a4a')); rect(x + 30, y + 44, x + 47, y + 51, C.rojo); rect(x + 31, y + 45, x + 46, y + 50, hex('#f8f2e6')); rect(x + 34, y + 47, x + 43, y + 48, C.rojo);
        R.anillo(x + 12, y + 44, 6, C.rojo); R.anillo(x + 12, y + 44, 5, C.rojo); R.icono('!', x + 9, y + 41, C.rojo, hex('#f8f2e6'), 1); } }
    { const x = 262, y = 108; rect(x, y, x + 9, y + 15, C.k); rect(x + 1, y + 1, x + 8, y + 14, hex('#c8d0dc')); rect(x + 3, y + 3, x + 6, y + 14, hex('#f8f2e6')); rect(x + 1, y + 1, x + 8, y + 1, C.blanco); } }   // el clip
  else { b_sombra(R, 250, 168, 304, 171, 0.35); rect(247, 113, 301, 168, C.k); rect(248, 114, 300, 167, hex('#1c2450')); rect(248, 114, 300, 114, hex('#4a5a9a')); rect(248, 114, 252, 167, hex('#0c1028')); rect(262, 124, 290, 136, hex('#efe6d0')); rect(265, 128, 286, 128, hex('#7a7a8a')); rect(265, 131, 280, 131, hex('#7a7a8a')); rect(296, 114, 297, 167, hex('#c83a3a')); for (let y = 118; y < 166; y += 5) pset(250, y, hex('#8a8a94')); }
  b_mesaExtras(R);
  // las fichas sueltas de 1963, por los bordes
  for (let k = 0; k < nn; k++) { const [x, y, g] = [[92, 26, 1], [176, 60, -1], [238, 70, 2], [2, 58, -2], [212, 58, 1], [88, 100, -1], [240, 150, 2], [180, 24, -2]][k], c = b_hx(['#efe6d0', '#f4e8a0', '#e8d4c0', '#d8e4d0'])[k % 4]; const q = [[x, y - g], [x + 22, y + g], [x + 22 + g, y + 15 + g], [x + g, y + 15 - g]]; poligono(q.map(([a, b], i) => [a + (i === 1 || i === 2 ? 1 : -1), b + (i > 1 ? 1 : -1)]), C.k); poligono(q, c); for (let l = 0; l < 3; l++) rect(x + 3, y + 4 + l * 3, x + 17 - (k + l) % 3 * 3, y + 4 + l * 3, hex('#6a6a7a')); rect(x + 3, y + 2, x + 8, y + 2, C.rojo); }
}
function b_mesa(R, t, o) {
  const ep = b_ep(o), luz = ep === 1957 || ep === 1963, L = b_luzEpoca(ep, 226, 96, 60, 60), { rect, pset, linea, disco } = R;
  const nf = Math.round(Math.max(0, Math.min(1, +(o.facturas ?? (ep === 1957 ? 1 : 0)))) * 5), nn = ep === 1963 ? Math.round(Math.max(0, Math.min(1, o.notas ?? 0.7)) * 8) : Math.round(Math.max(0, Math.min(1, o.notas ?? 0)) * 8);
  b_fondo(R, 'mesa' + ep + '|' + nf + '|' + nn, () => { b_mesaFijo(R, ep, nf, nn); b_grada(R, L);
    if (luz) { b_charco(R, 226, 98, 84, 56, hex('#fff0c0'), ep === 1963 ? 0.2 : 0.24); b_charco(R, 250, 80, 30, 22, hex('#fff8d8'), 0.3); }
    if (ep === 1957) { b_rayo(R, 20, 22, 110, 179, 0.5, hex('#c4d4e4'), 0.13); b_rayo(R, 62, 22, 66, 179, 0.5, hex('#2a3038'), 0.2); }
    if (ep === 1972) { b_rayo(R, 20, 22, 110, 179, 0.5, hex('#fff4c8'), 0.24); b_rayo(R, 62, 22, 66, 179, 0.5, hex('#7a5a3a'), 0.3); }
    if (ep === 1986) { b_rayo(R, 30, 22, 150, 179, 0.7, hex('#ffb850'), 0.3); b_rayo(R, 86, 22, 91, 179, 0.7, hex('#6a3a1e'), 0.35); } });
  // los renglones de la hoja (o.escribe) y el tecleo (o.teclea)
  { const e = Math.max(0, Math.min(1, o.escribe ?? 0.35)), n = e * 8, tinta = hex('#3a3a4a'); for (let l = 0; l < Math.ceil(n); l++) { const y = 41 - l * 2 - (l > 3 ? 1 : 0), u = l < Math.floor(n) ? 1 : n - Math.floor(n), w = Math.round((30 + ((l * 7) % 8)) * (l === 0 ? u : 1)); for (let x = 0; x < w; x++) if ((x * 7 + l * 3) % 6 !== 0) pset(131 + x, y, tinta); }
    if (o.teclea) { const k = Math.floor(t * 9), on = (t * 9) % 1 < 0.5, f = Math.floor(h(k, 1, 55) * 4), n2 = 11 - (f === 3 ? 1 : 0), i = Math.floor(h(k, 2, 55) * n2), x = 148 - (n2 - 1) * 3 - (f % 2) + i * 6 + (f % 2) * 3 + (f === 3 ? 3 : 0), y = 66 + f * 5;
      if (on) { rect(x - 1, y - 1, x + 1, y, hex('#b8ac90')); linea(148 + Math.round((x - 148) * 0.5), 60, 148 + Math.round((x - 148) * 0.1), 49, hex('#c8d0dc')); } } }
  // el segundero del reloj de bolsillo, el vapor de la taza, el filo de luz del flexo y, de noche, una polilla
  { const a = Math.floor(t) * 0.1047; linea(84, 72, 84 + Math.round(Math.sin(a) * 4), 72 - Math.round(Math.cos(a) * 4), C.rojo); linea(84, 72, 86, 70, C.k); linea(84, 72, 84, 69, C.k); }
  for (let k = 0; k < 4; k++) { const ph = (t * 0.45 + k / 4) % 1; for (let i = 0; i < 4; i++) { const x = Math.round(258 + Math.sin(ph * 6 + k * 1.7 + i * 0.7) * 2.4 + ph * 3), y = Math.round(92 - ph * 22 - i * 2); pset(x, y, ph < 0.5 ? hex('#f0ece4') : hex('#c8c0b4')); } }
  if (luz) { const f = Math.sin(t * 8) > 0.96; for (let a = 0.9; a < 2.5; a += 0.09) pset(Math.round(262 + Math.cos(a) * 15), Math.round(62 + Math.sin(a) * 10), f ? hex('#e8d8a0') : hex('#fff8d0')); }
  if (ep === 1957) { const B = R.buf, s = hex('#20262e'); for (let k = 0; k < 10; k++) { const u = (t * (0.22 + h(k, 1, 58) * 0.2) + h(k, 2, 58)) % 1, y = Math.round(24 + u * 150), x = Math.round(22 + h(k, 3, 58) * 84 + (y - 22) * 0.5); for (let j = 0; j < 3; j++) if (y + j < 180 && x < 318) { const i = (y + j) * 320 + x + (j >> 1); B[i] = b_mez(B[i], s, 0.24); } } }   // las sombras de las gotas que resbalan por la ventana
  if (ep === 1963) { const a = t * 2.6, x = Math.round(246 + Math.cos(a) * 26 + Math.sin(a * 2.7) * 6), y = Math.round(84 + Math.sin(a) * 14 + Math.cos(a * 3.1) * 4), al = Math.floor(t * 12) % 2; pset(x, y, hex('#e8e0d0')); pset(x - 1, y - al, hex('#b8b0a0')); pset(x + 1, y - al, hex('#b8b0a0')); }
  if (ep === 1972 || ep === 1986) for (let k = 0; k < 12; k++) { const u = (t * 0.04 + h(k, 1, 56)) % 1, x = Math.round(30 + h(k, 2, 56) * 100 + u * 60), y = Math.round(24 + u * 150); if (Math.sin(t * 1.4 + k * 2.1) > 0) pset(x, y, ep === 1986 ? hex('#ffe0a0') : hex('#fff8e0')); }
  return { ...b_GEO_MESA, epoca: ep };
}
const b_CIELO_S = b_hx(['#5aa4e0', '#7cbcec', '#a6d6f2', '#d6ecf2']), b_CIELO_L = b_hx(['#76848f', '#8c98a4', '#a4aeb6', '#bcc4c8']);

const b_ES_CIELO = new Set([...b_CIELO_S, ...b_CIELO_L]);

const b_GEO_ENTRADA = { suelo: 158, acera: [152, 163], buzon: { x: 228, y: 156, boca: [243, 135], caja: [214, 128, 241, 142] }, puerta: { x: 121, y: 123, hueco: [106, 56, 136, 121] }, porche: { y: 123, x0: 100, x1: 142 }, escalones: [96, 128, 146, 140], camino: [104, 141, 140, 151], ventana: [28, 60, 82, 98], horizonte: 118, coche: [242, 119], libres: [[150, 214], [250, 316]] };

// un coche de los sesenta, pequeño, de perfil (el centro de abajo en x, y): dos tonos, aletas y cromados
function b_coche60(R, x, y, c, cL) {
  const { rect, pset, disco } = R;
  rect(x - 14, y - 7, x + 13, y - 2, C.k); rect(x - 13, y - 6, x + 12, y - 3, c); rect(x - 13, y - 6, x + 12, y - 6, cL); rect(x - 7, y - 11, x + 5, y - 7, C.k); rect(x - 6, y - 10, x + 4, y - 7, hex('#f4f0e8')); rect(x - 5, y - 9, x - 1, y - 7, hex('#8ac0e0')); rect(x + 1, y - 9, x + 3, y - 7, hex('#8ac0e0'));
  pset(x - 14, y - 8, C.k); pset(x - 13, y - 7, c); rect(x - 14, y - 3, x - 13, y - 3, hex('#c8d0dc')); rect(x + 12, y - 3, x + 13, y - 3, hex('#c8d0dc')); pset(x + 13, y - 5, hex('#fff0a0')); pset(x - 14, y - 5, C.rojo); rect(x - 12, y - 4, x + 11, y - 4, hex('#c8d0dc'));
  for (const dx of [-8, 7]) { disco(x + dx, y - 2, 2, C.k); pset(x + dx, y - 2, hex('#c8d0dc')); }
}

// el buzón de poste, de lado (x: el poste; yb: su base): la caja de aluminio de techo redondo, la portezuela a la
// derecha (abre 0–1: se abate y deja ver el hueco) y la banderita roja (ban 0–1: tumbada o levantada)
function b_buzon(R, x, yb, abre = 0, ban = 0, lluvia = false) {
  const { rect, pset, linea, poligono } = R, al = hex(lluvia ? '#aab0bc' : '#c4cad4'), alS = hex(lluvia ? '#7c8492' : '#8e96a6'), alL = hex(lluvia ? '#d0d4dc' : '#f0f2f6');
  rect(x - 3, yb - 14, x + 2, yb, C.k); rect(x - 2, yb - 14, x + 1, yb - 1, hex('#8a6a44')); rect(x - 2, yb - 14, x - 2, yb - 1, hex('#a8885a')); rect(x + 1, yb - 14, x + 1, yb - 1, hex('#6a4e30')); for (let y = yb - 11; y < yb; y += 4) pset(x - 1, y, hex('#6a4e30'));
  poligono([[x - 6, yb - 13], [x + 5, yb - 13], [x + 2, yb - 9], [x - 3, yb - 9]], C.k); rect(x - 8, yb - 3, x + 7, yb, hex('#4e7238')); for (const dx of [-8, -5, 4, 7]) linea(x + dx, yb - 2, x + dx + (dx < 0 ? -1 : 1), yb - 6, hex('#7a9a52'));   // el soporte y unas matas al pie
  const x0 = x - 14, x1 = x + 13, y0 = yb - 28, y1 = yb - 14;
  rect(x0, y0 + 3, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 3, C.k); rect(x0 + 3, y0, x1 - 3, y0, C.k);
  rect(x0 + 1, y0 + 4, x1 - 1, y1 - 1, al); rect(x0 + 2, y0 + 2, x1 - 2, y0 + 3, al); rect(x0 + 3, y0 + 1, x1 - 3, y0 + 1, alL); rect(x0 + 2, y0 + 2, x1 - 4, y0 + 2, alL); rect(x0 + 1, y1 - 3, x1 - 1, y1 - 1, alS); rect(x0 + 1, y1 - 4, x1 - 1, y1 - 4, hex('#a8aebc'));
  for (const rx of [x0 + 4, x1 - 6]) { rect(rx, y0 + 1, rx, y1 - 1, alS); } for (const [dx, dy] of [[4, 7], [7, 7], [10, 7]]) rect(x0 + dx + 2, y0 + dy, x0 + dx + 3, y0 + dy + 2, hex('#5a6272'));   // tres trazos en la chapa (sin letras)
  if (abre > 0.5) { rect(x1 - 3, y0 + 2, x1 - 1, y1 - 1, hex('#1c2030')); rect(x1 - 2, y0 + 4, x1 - 1, y1 - 2, hex('#0c0e18')); rect(x1, y1 - 1, x1 + 9, y1 + 1, C.k); rect(x1 + 1, y1 - 1, x1 + 8, y1, alS); rect(x1 + 1, y1 - 1, x1 + 8, y1 - 1, al); pset(x1 + 8, y1 - 2, hex('#5a6272')); }
  else { rect(x1 - 2, y0 + 2, x1 - 1, y1 - 1, alS); rect(x1, y0 + 4, x1 + 1, y1 - 1, C.k); pset(x1 + 1, y0 + 7, hex('#5a6272')); rect(x1 + 1, y0 + 6, x1 + 2, y0 + 8, C.k); }
  const px = x - 7, py = y1 - 4;
  if (ban > 0.5) { rect(px - 1, py - 14, px + 1, py + 1, C.k); rect(px, py - 13, px, py, C.rojo); rect(px + 1, py - 14, px + 6, py - 9, C.k); rect(px + 1, py - 13, px + 5, py - 10, C.rojo); pset(px + 1, py - 13, hex('#f08080')); }
  else { rect(px - 1, py - 1, px + 12, py + 1, C.k); rect(px, py, px + 6, py, C.rojo); rect(px + 6, py - 2, px + 12, py + 2, C.k); rect(px + 7, py - 1, px + 11, py + 1, C.rojo); pset(px + 7, py - 1, hex('#f08080')); }
  pset(px, py, hex('#c8d0dc'));
}

function b_entradaFijo(R, llu) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, S = llu ? b_CIELO_L : b_CIELO_S, hm = (c) => (llu ? b_mez(hex(c), hex('#5a6470'), 0.28) : hex(c));
  // el cielo tramado y un banco de nubes fijo en el horizonte
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = S[Math.max(0, Math.min(3, Math.floor(y / 112 * 3.6 + (b_um(x, y) - 0.5) * 0.95)))];
  { const N = llu ? b_hx(['#687684', '#7e8a96', '#96a0aa']) : b_hx(['#c0d8ea', '#e0eef6', '#f8fcff']); for (const [cx, cy, w] of [[210, 84, 30], [244, 88, 24], [280, 82, 36], [312, 86, 26], [228, 70, 16]]) b_nube(R, cx, cy, w, N); }
  // las colinas de abetos, en dos términos, con bruma
  for (let x = 196; x < 320; x++) { const y1 = 92 - Math.round(7 * Math.sin(x * 0.035 + 1) + 3 * Math.sin(x * 0.11)) - ((x * 7) % 3 ? 0 : 2) - ((x * 5) % 4 === 0 ? 1 : 0); rect(x, y1, x, 118, hm('#7a9aa0')); const y2 = 102 - Math.round(5 * Math.sin(x * 0.05 + 3) + 2 * Math.sin(x * 0.17)) - [0, 2, 4, 1][x % 4]; rect(x, y2, x, 118, hm('#4a7860')); if (x % 4 === 2) pset(x, y2 + 1, hm('#6a9a78')); }
  for (let y = 96; y < 104; y++) for (let x = 196; x < 320; x++) if (b_um(x, y) < 0.3 && B[y * 320 + x] === hm('#7a9aa0')) B[y * 320 + x] = S[3];
  // la casa del vecino y otra más lejos
  rect(200, 104, 226, 116, C.k); rect(201, 105, 225, 116, hm('#a8b4c8')); poligono([[198, 104], [213, 96], [228, 104]], C.k); poligono([[201, 103], [213, 97], [225, 103]], hm('#5a5a6a')); rect(206, 108, 210, 112, hm('#f8d878'));
  rect(262, 99, 306, 116, C.k); rect(263, 100, 305, 116, hm('#e8dcc0')); for (let y = 102; y < 116; y += 3) rect(263, y, 305, y, hm('#c8bc9c')); poligono([[258, 99], [284, 86], [310, 99]], C.k); poligono([[261, 98], [284, 87], [307, 98]], hm('#9a4a3a')); for (let y = 90; y < 98; y += 2) rect(284 - (y - 87) * 2, y, 284 + (y - 87) * 2, y, hm('#7a3226'));
  rect(294, 82, 299, 92, C.k); rect(295, 83, 298, 92, hm('#a84a3a')); rect(294, 82, 299, 83, hm('#c8664e'));
  rect(267, 103, 275, 110, C.k); rect(268, 104, 274, 109, llu ? hex('#f8d878') : hex('#8ac0e0')); rect(271, 104, 271, 109, C.blanco); rect(283, 104, 290, 116, C.k); rect(284, 105, 289, 116, hm('#3a6a8a')); pset(288, 111, hex('#d8a840')); rect(295, 103, 302, 110, C.k); rect(296, 104, 301, 109, hm('#8ac0e0')); rect(299, 104, 299, 109, C.blanco);
  for (const bx of [264, 278, 304]) { disco(bx, 115, 2, hm('#3a7a4a')); pset(bx, 114, hm('#6aaa5a')); }
  // la acera y la calle de detrás, y la valla de listones
  rect(196, 116, 319, 116, hm('#d0ccc4')); rect(196, 117, 319, 119, hm('#6a6a74')); for (let x = 198; x < 320; x += 9) rect(x, 118, x + 3, 118, hm('#e8d84a'));
  // el césped: franjas de siega, matas y tréboles
  const G = [hm('#3c7a34'), hm('#4c9040'), hm('#5aa04a'), hm('#7cc060')];
  for (let y = 120; y < 152; y++) for (let x = 0; x < 320; x++) { const fr = Math.floor((x + (y - 120) * 1.4) / 16) & 1, n = h(x, y, 30); B[y * 320 + x] = n < 0.1 ? G[0] : n > 0.93 ? G[3] : fr ? G[2] : (b_um(x, y) < 0.5 ? G[1] : G[2]); }
  for (let i = 0; i < 46; i++) { const x = Math.round(h(i, 1, 31) * 318), y = 123 + Math.round(h(i, 2, 31) * 26); pset(x, y, G[0]); pset(x, y - 1, G[3]); pset(x + 1, y - 2, G[3]); if (i % 6 === 0) { pset(x + 3, y, hex('#f4f0e8')); pset(x + 4, y - 1, hex('#f0d860')); } }
  for (let x = 196; x < 320; x += 3) { rect(x, 121, x + 1, 127, hm('#f0ece0')); pset(x + 1, 122, hm('#c8c4b8')); pset(x, 120, hm('#f0ece0')); pset(x + 2, 123, hm('#b8b4a8')); pset(x + 2, 126, hm('#b8b4a8')); } rect(196, 128, 319, 128, G[0]);
  // el camino de losas, la acera, el bordillo y el asfalto
  for (let y = 141; y < 152; y++) { const d = Math.round((y - 141) * 0.4); rect(104 - d, y, 140 + d, y, hm('#b8b0a4')); pset(104 - d, y, hm('#8a8478')); pset(140 + d, y, hm('#8a8478')); } for (const y of [144, 148]) rect(103, y, 143, y, hm('#8a8478')); for (const [x, y] of [[118, 141], [128, 145], [114, 149]]) rect(x, y, x, y + 3, hm('#8a8478'));
  const A = [hm('#9a968e'), hm('#b4b0a8'), hm('#c0bcb4'), hm('#d4d0c8')];
  for (let y = 152; y <= 163; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 32); B[y * 320 + x] = y === 152 ? A[3] : (x + (y - 152)) % 40 === 0 ? A[0] : n < 0.08 ? A[0] : n > 0.9 ? A[3] : (b_um(x, y) < (y - 152) / 14 ? A[1] : A[2]); }
  for (const [x, y] of [[66, 158], [186, 156], [282, 160]]) { linea(x, y, x + 5, y + 2, A[0]); linea(x + 5, y + 2, x + 7, y + 5, A[0]); pset(x + 2, y, hm('#5aa04a')); pset(x + 6, y + 2, hm('#5aa04a')); }
  rect(0, 164, 319, 164, hm('#dcd8d0')); rect(0, 165, 319, 166, hm('#8e8a82')); for (let x = 20; x < 320; x += 52) rect(x, 164, x, 166, hm('#6e6a64'));
  const F = [hm('#3e3e48'), hm('#4c4c58'), hm('#565662'), hm('#666672')];
  for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 33); B[y * 320 + x] = y === 167 ? F[0] : n < 0.12 ? F[0] : n > 0.9 ? F[3] : (b_um(x, y) < 0.4 + 0.3 * Math.sin(x * 0.02) ? F[1] : F[2]); }
  for (let j = -3; j <= 3; j++) for (let i = -9; i <= 9; i++) { const d = (i / 9) ** 2 + (j / 3) ** 2; if (d <= 1) pset(64 + i, 174 + j, d > 0.72 ? F[0] : (i + j) % 3 ? hm('#6e6e7a') : F[1]); }   // la tapa de alcantarilla
  for (const [x0, x1, y] of [[150, 176, 171], [156, 170, 172], [262, 300, 176], [270, 292, 175]]) rect(x0, y, x1, y, llu ? hex('#8e9aa8') : F[0]);   // charcos (o parches de alquitrán)
  for (const [x, y] of [[20, 170], [110, 177], [210, 169], [240, 176], [306, 171]]) { pset(x, y, hm('#c8843a')); pset(x + 1, y, hm('#a85a2a')); }   // hojas caídas
  // ── la casa: el tejado de tejas de madera (tranquilo), el alero, la pared de tablas y el porche
  poligono([[0, 0], [188, 0], [205, 23], [0, 23]], hm('#4e5c5a')); for (let y = 3; y < 23; y += 4) { const xf = 188 + y * 17 / 23; rect(0, y, Math.round(xf) - 1, y, hm('#465452')); for (let x = (y % 8 ? 3 : 0); x < xf - 2; x += 6) pset(x, y + 1 + (h(x, y, 34) < 0.3 ? 1 : 0), hm('#465452')); } for (let i = 0; i < 40; i++) { const x = Math.round(h(i, 1, 35) * 186), y = Math.round(h(i, 2, 35) * 21); pset(x, y, hm('#56645f')); }
  linea(188, 0, 205, 23, C.k); rect(0, 23, 206, 27, C.k); rect(0, 24, 205, 25, hm('#f0ece0')); rect(0, 26, 205, 26, hm('#b8b4a8'));
  for (let y = 28; y <= 121; y++) for (let x = 0; x <= 197; x++) { const f = (y - 28) % 5, sh = y < 40 ? 1 : y < 58 ? (b_um(x, y) < (58 - y) / 18 ? 1 : 0) : 0, c = f === 4 ? hm('#93a487') : f === 0 ? hm('#d6e2c6') : h(x >> 3, y, 36) < 0.06 ? hm('#b4c2a6') : hm('#c2d0b4'); B[y * 320 + x] = sh ? b_mez(c, hex('#3a4a48'), 0.34) : c; }
  rect(198, 28, 198, 140, C.k); rect(194, 28, 197, 127, hm('#f0ece0')); rect(197, 28, 197, 127, hm('#c8c4b8'));
  rect(0, 36, 197, 41, C.k); rect(0, 37, 197, 39, hm('#f0ece0')); rect(0, 40, 197, 40, hm('#b8b4a8'));
  rect(200, 27, 203, 138, C.k); rect(201, 27, 202, 137, hm('#d8d8dc')); for (const y of [50, 90, 126]) rect(200, y, 203, y, hm('#8a8a94')); rect(200, 138, 208, 141, C.k); rect(201, 139, 207, 140, hm('#d8d8dc'));   // el canalón
  // la ventana grande con sus contraventanas, y la pequeña
  for (const [x0, x1, grande] of [[24, 86, true], [154, 188, false]]) {
    rect(x0, 56, x1, 102, C.k); rect(x0 + 1, 57, x1 - 1, 101, hm('#f0ece0')); rect(x0 + 3, 59, x1 - 3, 99, C.k);
    for (let y = 60; y <= 98; y++) for (let x = x0 + 4; x <= x1 - 4; x++) B[y * 320 + x] = b_um(x, y) < (y - 60) / 60 ? hex('#4a5a6a') : hex('#34424e');
    if (grande) { rect(60, 76, 72, 78, hex('#f8d878')); poligono([[59, 84], [73, 84], [70, 76], [62, 76]], llu ? hex('#f8e098') : hex('#d8c078')); rect(65, 85, 66, 98, hex('#8a6a3a')); if (llu) b_charco(R, 66, 82, 16, 14, hex('#f8e098'), 0.3);
      rect(30, 86, 44, 98, hex('#5a3a20')); rect(31, 80, 43, 86, hex('#6e4826')); for (let x = 32; x < 43; x += 3) rect(x, 81, x + 1, 85, b_LOMOS[(x * 3) % 12]); }   // dentro: la lámpara y una estantería
    for (const [cx, s] of [[x0 + 4, 1], [x1 - 4, -1]]) for (let y = 60; y <= 98; y++) { const w = Math.round(3 + (y - 60) * (grande ? 0.16 : 0.08) + Math.sin(y * 0.5) * 0.6); for (let i = 0; i < w; i++) pset(cx + s * i, y, i === w - 1 ? hm('#c8bca0') : (i % 3 === 1 ? hm('#f8f2e2') : hm('#e8dcc0'))); }
    const mx = (x0 + x1) >> 1; rect(mx, 59, mx + 1, 99, hm('#f0ece0')); rect(x0 + 3, 78, x1 - 3, 79, hm('#f0ece0')); rect(x0 + 3, 80, x1 - 3, 80, hex('#2a343e'));
    for (let i = 0; i < 10; i++) if (i % 2) { pset(x0 + 8 + i, 72 - i, hex('#a8c8dc')); pset(x0 + 12 + i, 72 - i, hex('#7a9ab0')); }
    rect(x0 - 2, 102, x1 + 2, 105, C.k); rect(x0 - 1, 102, x1 + 1, 103, hm('#f0ece0')); rect(x0 - 1, 104, x1 + 1, 104, hm('#b8b4a8'));
    if (grande) for (const sx of [x0 - 7, x1 + 1]) { rect(sx, 56, sx + 6, 102, C.k); rect(sx + 1, 57, sx + 5, 101, hm('#3a5a48')); for (let y = 59; y < 101; y += 3) rect(sx + 1, y, sx + 5, y, hm('#2a4436')); rect(sx + 1, 57, sx + 1, 101, hm('#4e7460')); } }
  // la mecedora y una mesita con una maceta, detrás de la barandilla
  { const m = hm('#8a5a34'), mS = hm('#5e3a1e'); rect(44, 84, 46, 118, mS); rect(62, 84, 64, 118, mS); rect(44, 84, 64, 86, m); for (let x = 48; x < 62; x += 4) rect(x, 87, x + 1, 104, m); rect(42, 104, 68, 106, m); rect(42, 100, 44, 104, mS); rect(66, 100, 68, 104, mS); rect(46, 96, 62, 103, hm('#c85a4a')); rect(46, 96, 62, 96, hm('#e88070'));
    rect(72, 108, 84, 109, m); rect(77, 110, 79, 121, mS); rect(74, 101, 82, 107, hm('#c0603a')); rect(74, 101, 82, 101, hm('#e08050')); for (const [dx, dy] of [[-3, -4], [0, -7], [3, -5], [-1, -9], [2, -8]]) { linea(78, 101, 78 + dx, 101 + dy, hm('#3a7a4a')); pset(78 + dx, 101 + dy, hm('#c83a3a')); } }
  // la puerta: el marco, la hoja de madera y la mosquitera (las pinta de nuevo b_entrada si se abre)
  rect(101, 50, 141, 122, C.k); rect(102, 51, 140, 121, hm('#f0ece0')); rect(102, 51, 140, 51, C.blanco); rect(105, 55, 137, 121, C.k);
  b_puerta(R, 0, llu);
  rect(143, 60, 149, 62, C.k); rect(144, 63, 148, 70, C.k); rect(145, 64, 147, 69, llu ? hex('#fff0a0') : hex('#e8e4c8')); pset(146, 71, C.k); if (llu) b_charco(R, 146, 68, 12, 14, hex('#fff0a0'), 0.3);   // el farol
  // los postes, la barandilla, el suelo del porche, la celosía y los escalones
  for (const [a, b] of [[10, 93], [150, 193]]) { rect(a, 104, b, 107, C.k); rect(a, 105, b, 106, hm('#f0ece0')); rect(a, 118, b, 120, C.k); rect(a, 119, b, 119, hm('#e0dcd0')); for (let x = a + 2; x < b; x += 4) { rect(x, 108, x, 117, hm('#f0ece0')); rect(x + 1, 108, x + 1, 117, hm('#8a9a84')); } }
  for (const x of [6, 94, 146]) { rect(x - 1, 41, x + 4, 122, C.k); rect(x, 42, x + 3, 121, hm('#f0ece0')); rect(x + 3, 42, x + 3, 121, hm('#c8c4b8')); rect(x - 2, 41, x + 5, 44, C.k); rect(x - 1, 42, x + 4, 43, hm('#f0ece0')); rect(x - 2, 117, x + 5, 122, C.k); rect(x - 1, 118, x + 4, 121, hm('#e0dcd0')); }
  rect(0, 122, 198, 128, C.k); rect(0, 123, 197, 123, hm('#e4dcc8')); rect(0, 124, 197, 127, hm('#a89c88')); for (let x = 3; x < 197; x += 7) rect(x, 124, x, 127, hm('#8a7e6c')); rect(0, 124, 197, 124, hm('#c4b8a2'));
  rect(108, 121, 134, 123, C.k); rect(109, 121, 133, 122, hm('#9a6a3a')); for (let x = 110; x < 133; x += 3) pset(x, 122, hm('#c89858'));   // el felpudo
  for (const [a, b] of [[0, 95], [147, 197]]) { rect(a, 129, b, 140, hm('#2e3a34')); for (let y = 129; y <= 140; y++) for (let x = a; x <= b; x++) if ((x + y) % 6 === 0 || (x - y + 600) % 6 === 0) pset(x, y, hm('#e0dcd0')); rect(a, 140, b, 140, C.k); }
  for (let k = 0; k < 3; k++) { const y = 128 + k * 4, a = 99 - k * 2, b = 143 + k * 2; rect(a - 1, y, b + 1, y + 4, C.k); rect(a, y + 1, b, y + 1, hm('#e4dcc8')); rect(a, y + 2, b, y + 3, hm('#a89c88')); for (let x = a + 6; x < b; x += 11) pset(x, y + 2, hm('#8a7e6c')); }
  // la cesta colgante de helechos y los arriates con hortensias
  linea(50, 41, 46, 49, hm('#5a5a6a')); linea(50, 41, 54, 49, hm('#5a5a6a')); rect(44, 49, 56, 53, C.k); rect(45, 50, 55, 52, hm('#8a5a34')); for (let k = 0; k < 9; k++) { const dx = -8 + k * 2, dy = 2 + Math.abs(dx) * 0.6; linea(50, 49, 50 + dx, Math.round(49 + dy - 5), hm('#3a8a4a')); pset(50 + dx, Math.round(50 + dy - 3), hm('#6aba5a')); }
  for (const [a, b] of [[2, 92], [150, 194]]) for (let x = a + 4; x < b; x += 10) { const y = 139 + ((x * 3) % 3); disco(x, y, 5, hm('#2e6a3e')); disco(x - 1, y - 1, 3, hm('#3a8a4a')); for (let i = 0; i < 4; i++) { const fx = x - 3 + ((i * 5 + x) % 7), fy = y - 3 + ((i * 3 + x) % 5); pset(fx, fy, (x >> 1) % 3 ? hex('#e88ab0') : hex('#8a9ae8')); pset(fx + 1, fy, (x >> 1) % 3 ? hex('#f8b8d0') : hex('#b8c4f8')); } }
  // el triciclo de los niños, una manguera y la boca de riego
  { const x = 164, y = 150; disco(x - 5, y - 2, 2, C.k); disco(x + 5, y - 3, 3, C.k); pset(x + 5, y - 3, hex('#c8d0dc')); pset(x - 5, y - 2, hex('#c8d0dc')); linea(x - 5, y - 3, x + 4, y - 6, C.rojo); linea(x - 5, y - 4, x + 4, y - 7, C.rojo); linea(x + 5, y - 3, x + 3, y - 10, C.rojo); rect(x + 1, y - 11, x + 5, y - 10, C.k); rect(x - 5, y - 6, x - 2, y - 5, hex('#3a3a44')); }
  for (let a = 0; a < 6.28; a += 0.25) { pset(Math.round(214 + Math.cos(a) * 5), Math.round(146 + Math.sin(a) * 2), hm('#2e6a3e')); pset(Math.round(214 + Math.cos(a) * 3), Math.round(146 + Math.sin(a) * 1), hm('#3a8a4a')); }
  rect(178, 153, 185, 156, C.k); rect(179, 147, 184, 155, C.k); rect(180, 148, 183, 155, C.rojo); rect(180, 148, 180, 155, hex('#e86a5a')); rect(180, 145, 183, 147, C.k); rect(181, 146, 182, 146, C.rojo); rect(177, 150, 186, 151, C.k); pset(178, 150, hex('#e8c040')); pset(185, 150, hex('#e8c040'));   // la boca de incendios
  b_entradaExtras(R, llu, hm, S);
}
// la puerta de la entrada: abre 0 (cerrada: la hoja granate y, delante, la mosquitera con su malla) a 1 (abierta: el
// recibidor con su perchero y la luz de dentro; la mosquitera, de canto junto a la bisagra)
function b_puerta(R, abre, llu) {
  const { rect, pset, linea } = R, x0 = 106, x1 = 136, y0 = 56, y1 = 121;
  if (abre > 0.02) { rect(x0, y0, x1, y1, hex('#2a2420')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (b_um(x, y) < 0.25 + (x - x0) / 80) pset(x, y, hex('#4a3828')); rect(x0, 112, x1, y1, hex('#5e3a1e')); rect(x0, 112, x1, 112, hex('#8a5e36'));
    rect(124, 70, 125, 111, hex('#3a2214')); for (const [dx, dy] of [[-4, -2], [4, -2], [-3, 3], [3, 3]]) linea(124, 72, 124 + dx, 70 + dy, hex('#3a2214')); rect(126, 74, 131, 92, hex('#6a7a52')); rect(126, 74, 131, 75, hex('#8a9a6a')); rect(117, 66, 121, 74, hex('#f8d878')); rect(118, 75, 120, 76, hex('#8a6a3a'));
    const w = Math.round((x1 - x0) * (1 - abre)); rect(x0, y0, x0 + Math.max(2, w), y1, hex('#e0dcd0')); if (w > 4) for (let y = y0 + 3; y <= y1 - 3; y++) for (let x = x0 + 2; x <= x0 + w - 2; x++) pset(x, y, (x + y) & 1 ? hex('#5a6468') : hex('#3a3430')); rect(x0 + Math.max(2, w), y0, x0 + Math.max(2, w), y1, C.k); return; }
  rect(x0, y0, x1, y1, hex('#7a3a2c')); for (const [a, b] of [[60, 86], [92, 116]]) { rect(x0 + 4, a, x1 - 4, b, hex('#5e2a20')); rect(x0 + 5, a + 1, x1 - 5, b - 1, hex('#8a4636')); }
  for (let y = y0 + 3; y <= 96; y++) for (let x = x0 + 3; x <= x1 - 3; x++) if ((x + y) & 1) pset(x, y, hex('#5a6468'));   // la malla
  for (let i = 0; i < 12; i++) if (i % 2) pset(x0 + 6 + i, y0 + 22 - i, hex('#a8b4b8'));
  rect(x0, y0, x1, y0 + 2, hex('#e0dcd0')); rect(x0, y1 - 2, x1, y1, hex('#e0dcd0')); rect(x0, y0, x0 + 2, y1, hex('#e0dcd0')); rect(x1 - 2, y0, x1, y1, hex('#e0dcd0')); rect(x0, 97, x1, 99, hex('#e0dcd0')); rect(x0 + 3, 100, x1 - 3, y1 - 3, hex('#d0ccc0')); linea(x0 + 3, y1 - 3, x1 - 3, 100, hex('#b0ac9c'));
  rect(x1 - 6, 88, x1 - 4, 93, C.k); pset(x1 - 5, 89, hex('#c8d0dc')); pset(x1 - 5, 91, hex('#c8d0dc'));
}

function b_entrada(R, t, o) {
  const llu = !!o.lluvia, { rect, pset, linea, disco } = R, B = R.buf, hm = (c) => (llu ? b_mez(hex(c), hex('#5a6470'), 0.28) : hex(c));
  b_fondo(R, 'entrada' + (llu ? 'L' : ''), () => b_entradaFijo(R, llu));
  // las nubes de tres tonos a tres velocidades y los pájaros: solo sobre el cielo (no pisan el tejado ni los abetos)
  const PN = llu ? b_hx(['#5e6c7a', '#74828e', '#8e9aa6']) : b_hx(['#bcd6ea', '#e4f0f8', '#ffffff']);
  const nube = (cx, cy, w) => { const N = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]];
    for (let p = 0; p < 3; p++) for (const [dx, dy, f] of N) { const r = Math.max(1, Math.round(f * w * (p === 2 ? 0.7 : 1))), ox = Math.round(cx + dx * w - (p === 2 ? 1 : 0)), oy = Math.round(cy + dy * w + (p === 0 ? 1 : p === 2 ? -1 : 0));
      for (let j = -r; j <= r; j++) { const yy = oy + j; if (yy < 0 || yy > 123) continue; const ww = Math.round(Math.sqrt(r * r - j * j)); for (let x = Math.max(0, ox - ww); x <= Math.min(319, ox + ww); x++) { const i = yy * 320 + x, c = B[i]; if (b_ES_CIELO.has(c) || c === PN[0] || c === PN[1] || c === PN[2]) B[i] = PN[p]; } } } };
  for (const [x0, y, w, v] of [[230, 66, 34, 1.3], [300, 82, 24, 2.3], [250, 53, 14, 3.4], [214, 60, 20, 1.8]]) if (w) nube(196 + ((x0 + t * v) % 190) - 30, y, w);
  if (!llu) for (let k = 0; k < 3; k++) { const bx = Math.round(200 + ((t * (9 + k * 4) + k * 53) % 150)), by = 56 + k * 9 + Math.round(Math.sin(t * 1.6 + k) * 3), al = Math.floor(t * 5 + k) % 2, i = by * 320 + bx; if (bx < 318 && b_ES_CIELO.has(B[i])) { pset(bx, by, C.k); pset(bx - 1, by - al, C.k); pset(bx + 1, by - al, C.k); pset(bx - 2, by - al * 2 + (al ? 0 : -1), C.k); pset(bx + 2, by - al * 2 + (al ? 0 : -1), C.k); } }
  // el humo de la chimenea del vecino
  for (let k = 0; k < 5; k++) { const u = (t * 0.22 + k / 5) % 1, x = Math.round(297 + u * 12 + Math.sin(u * 5 + k) * 2), y = Math.round(80 - u * 22); if (y > 46) disco(x, y, u < 0.3 ? 1 : 2, u > 0.7 ? (llu ? hex('#a4aeb6') : hex('#d6ecf2')) : hex('#e8e8ec')); }
  // la calle de detrás: el cartero lejano, un coche que pasa de vez en cuando y el coche aparcado
  R.recorte([204, 100, 319, 119]);
  { const u = (t / 26) % 1, para = u > 0.3 && u < 0.45, cx = Math.round(u < 0.3 ? 330 - u / 0.3 * 50 : para ? 280 : 280 - (u - 0.45) / 0.55 * 90), pa = Math.floor(t * 4) % 2, y = 116; if (cx < 325) { linea(cx, y - 8, cx, y - 3, hex('#3a5a8a')); linea(cx + 1, y - 8, cx + 1, y - 3, hex('#2a4470')); pset(cx, y - 9, hex('#f6c290')); pset(cx + 1, y - 9, hex('#f6c290')); linea(cx - 1, y - 10, cx + 1, y - 10, hex('#2a4470')); pset(cx - 1, y - 9, hex('#2a4470')); linea(cx + 2, y - 7, cx + 3, y - 4, hex('#8a5a34')); pset(cx + 3, y - 5, hex('#a8743c')); pset(cx + (para ? 0 : pa), y - 2, C.k); pset(cx + 1 - (para ? 0 : pa), y - 2, C.k); pset(cx, y - 1, C.k); pset(cx + 1, y - 1, C.k); if (para) pset(cx - 1, y - 6, hex('#f4f0e8')); } }
  { const u = (t % 14) / 4; if (u < 1) { const cx = Math.round(190 + u * 150); R.poligono([[cx - 13, 118], [cx - 13, 112], [cx - 6, 112], [cx - 4, 108], [cx + 5, 108], [cx + 8, 112], [cx + 13, 113], [cx + 13, 118]], C.k); R.poligono([[cx - 12, 117], [cx - 12, 113], [cx - 5, 113], [cx - 3, 109], [cx + 4, 109], [cx + 7, 113], [cx + 12, 114], [cx + 12, 117]], hm('#c8a040')); linea(cx - 2, 110, cx + 3, 110, hex('#8ac0e0')); linea(cx - 3, 111, cx + 4, 111, hex('#8ac0e0')); disco(cx - 7, 118, 2, C.k); disco(cx + 7, 118, 2, C.k); } }
  R.recorte(null);
  b_coche60(R, 242, 120, hm('#4ab0b0'), hm('#8ad8d0'));
  for (let x = 226; x < 259; x += 3) { rect(x, 121, x + 1, 127, hm('#f0ece0')); pset(x + 1, 122, hm('#c8c4b8')); pset(x, 120, hm('#f0ece0')); }   // la valla, por delante del coche
  // los dos abetos del jardín, que se mecen
  { const P = llu ? b_hx(['#1e3a34', '#2c5044', '#4a705c', '#3a2c24']) : b_hx(['#1e5236', '#2e7048', '#5aa064', '#5a3e28']); b_abeto(R, 216, 136, 104, t, P, 1); b_abeto(R, 308, 134, 74, t, P, 4); }
  // el aspersor (en seco) y una mariposa; con lluvia, las ondas de los charcos
  if (!llu) { const a0 = Math.sin(t * 0.9) * 0.7; for (let k = 0; k < 12; k++) { const u = ((t * 1.4 + k / 12) % 1), an = a0 + (k % 3 - 1) * 0.12, x = Math.round(286 + Math.sin(an) * u * 22), y = Math.round(146 - Math.sin(u * Math.PI) * 12 - u * 2); pset(x, y, k % 2 ? C.blanco : hex('#b8e0f8')); } rect(285, 145, 287, 147, C.k); pset(286, 145, hex('#c8d0dc'));
    const mx = Math.round(170 + Math.sin(t * 0.7) * 16 + Math.sin(t * 2.3) * 4), my = Math.round(134 + Math.cos(t * 0.9) * 5 + Math.sin(t * 3.1) * 2), al = Math.floor(t * 8) % 2; pset(mx, my, C.k); pset(mx - 1, my - al, hex('#f8d040')); pset(mx + 1, my - al, hex('#f8d040')); }
  else for (const [cx, cy, k] of [[163, 171, 0], [280, 176, 1], [120, 158, 2], [40, 161, 3]]) { const u = (t * 0.9 + k * 0.37) % 1, r = Math.round(1 + u * 5); for (let a = 0; a < 6.28; a += 0.5) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.35); if (u < 0.8) pset(x, y, hex('#c4ccd4')); } }
  // los pájaros posados en el cable (dan saltitos, se giran y mueven la cola), un petirrojo que picotea en el césped
  // y, en seco, dos hojas que el aire arrastra por el asfalto
  for (const [bx, k] of [[234, 2], [265, 0], [271, 1]]) { const ph = t * 0.6 + k * 1.7, sal = !llu && Math.sin(ph * 2.3 + k) > 0.9 ? 1 : 0, d = Math.sin(ph * 0.5 + k * 2) > 0 ? 1 : -1, y = b_cableY(bx) - sal, c = hex('#2a2a34');
    rect(bx - 1, y - 3, bx + 1, y - 1, c); pset(bx, y - 2, hex('#5a5a68')); pset(bx + d, y - 4, c); pset(bx + d * 2, y - 4, hex('#e8a040')); pset(bx - d * 2, y - 1 - (Math.sin(t * 3 + k * 2) > 0.6 ? 1 : 0), c); }
  if (!llu) { const paso = Math.floor(t * 0.8), u = (t * 0.8) % 1, x0 = 246 + Math.round(h(paso, 1, 39) * 10), x1 = 246 + Math.round(h(paso + 1, 1, 39) * 10), mv = u > 0.8 ? (u - 0.8) / 0.2 : 0, rx = Math.round(x0 + (x1 - x0) * mv), ry = 150 - (mv > 0 ? Math.round(Math.sin(mv * Math.PI) * 2) : 0), d = x1 >= x0 ? 1 : -1, pica = u > 0.25 && u < 0.7 && Math.floor(u * 9) % 2 === 0;
    rect(rx - 1, ry - 2, rx + 1, ry - 1, hex('#5a4a3a')); pset(rx + d, ry - 1, hex('#e86a3a')); pset(rx - d * 2, ry - 2, hex('#3a2e24')); pset(rx, ry, C.k);
    if (pica) { pset(rx + d * 2, ry - 1, hex('#5a4a3a')); pset(rx + d * 2, ry, hex('#e8c040')); } else { pset(rx + d, ry - 3, hex('#5a4a3a')); pset(rx + d * 2, ry - 3, hex('#e8c040')); }
    for (let k = 0; k < 2; k++) { const v = (t * (0.07 + k * 0.03) + k * 0.45) % 1, x = Math.round(-6 + v * 332), y = 170 + k * 5 + Math.round(Math.sin(v * 30 + k) * 1.5), g = Math.floor(t * 6 + k) % 2; pset(x, y, hex('#c8843a')); pset(x + 1, y - g, hex('#a85a2a')); } }
  // el gato en la ventana (mueve la cola), las campanillas de viento y la puerta si se abre
  { const gx = 38, gy = 79, c = hex('#2a2a34'); rect(gx - 3, gy - 6, gx + 2, gy, c); rect(gx - 2, gy - 10, gx + 1, gy - 6, c); pset(gx - 2, gy - 11, c); pset(gx + 1, gy - 11, c); const co = Math.round(Math.sin(t * 1.7) * 2); linea(gx + 3, gy, gx + 6, gy - 2 - Math.abs(co), c); pset(gx + 6 + (co > 0 ? 1 : 0), gy - 3 - Math.abs(co), c); pset(gx - 1, gy - 8, hex('#e8c040')); }
  { const cx = 172, s = Math.sin(t * 2.2) * (llu ? 2.4 : 1.4); linea(cx, 41, cx, 45, hex('#5a5a6a')); rect(cx - 3, 45, cx + 3, 46, C.k); for (let k = -1; k <= 1; k++) { const dx = Math.round(s * (1 + k * 0.3)); linea(cx + k * 2, 47, cx + k * 2 + dx, 53 + (k ? 0 : 2), hex('#c8d0dc')); } pset(cx + Math.round(s * 1.4), 57, hex('#d8a840')); }
  if ((o.puerta ?? 0) > 0.02) b_puerta(R, Math.min(1, o.puerta), llu);
  b_buzon(R, 228, 156, o.buzonAbierto ?? 0, o.bandera ?? 0, llu);
  return { ...b_GEO_ENTRADA, lluvia: llu };
}
function b_entradaDelante(R, t, o) {
  if (!o.lluvia) return { ...b_GEO_ENTRADA };
  const { linea, pset } = R, c = hex('#d4dce6'), c2 = hex('#aab6c4');
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 37) * 340), ph = (t * (1.3 + h(k, 2, 37) * 0.6) + h(k, 3, 37)) % 1, y = Math.round(-10 + ph * 190); if ((y < 24 && x < 176) || (y < 50 && x > 270)) continue; linea(x, y, x - 2, y + 5, k % 3 ? c2 : c); }
  for (let k = 0; k < 14; k++) { const ph = (t * 2.2 + h(k, 4, 37) * 3) % 1, x = Math.round(h(k, 5 + Math.floor(t * 2.2 + h(k, 4, 37) * 3), 37) * 319), y = 153 + Math.round(h(k, 6, 37) * 25); if (ph < 0.4) { pset(x - 1, y - 1, c); pset(x + 1, y - 1, c); pset(x, y, c2); } }
  return { ...b_GEO_ENTRADA };
}

const b_VENT_C = [126, 36, 186, 78];

const b_GEO_COCINA = { suelo: 150, mesa: { x0: 106, x1: 238, y: 143 }, asiento: 166, maquina: [204, 143], tablero: [122, 124, 142, 143], ventana: b_VENT_C, nevera: [12, 42, 60, 127], bocetos: [66, 30, 114, 86], cafetera: [216, 92], encimera: 94, telefono: [296, 70], sillas: [[94, 146], [254, 146]], libres: [[14, 100], [244, 306]] };

// una silla de cocina de cromo y vinilo rojo (x: el centro; yb: el suelo), vista de frente
function b_sillaCromo(R, x, yb) {
  const { rect, pset, linea } = R, cr = hex('#c8d0dc'), crS = hex('#8a94a4'), v = hex('#c83a3a'), vL = hex('#e86a5a'), vS = hex('#8e2424');
  for (const dx of [-9, 7]) { const s = dx < 0 ? -1 : 1; for (let j = 0; j <= 13; j++) { const xx = x + dx + Math.round(s * j / 7); rect(xx - 1, yb - 13 + j, xx + 2, yb - 13 + j, C.k); pset(xx, yb - 13 + j, cr); pset(xx + 1, yb - 13 + j, crS); } rect(x + dx + s * 2 - 1, yb, x + dx + s * 2 + 2, yb, C.k); }
  rect(x - 7, yb - 9, x + 7, yb - 8, C.k); rect(x - 6, yb - 9, x + 6, yb - 9, crS);
  for (const dx of [-8, 6]) { rect(x + dx - 1, yb - 30, x + dx + 2, yb - 15, C.k); rect(x + dx, yb - 30, x + dx, yb - 15, cr); rect(x + dx + 1, yb - 30, x + dx + 1, yb - 15, crS); }
  rect(x - 9, yb - 38, x + 9, yb - 26, C.k); rect(x - 8, yb - 37, x + 8, yb - 27, v); rect(x - 8, yb - 37, x + 8, yb - 36, vL); rect(x - 8, yb - 28, x + 8, yb - 27, vS); rect(x - 4, yb - 34, x + 4, yb - 34, vS); pset(x, yb - 32, hex('#f0d860'));
  rect(x - 10, yb - 17, x + 10, yb - 13, C.k); rect(x - 9, yb - 16, x + 9, yb - 14, v); rect(x - 9, yb - 16, x + 9, yb - 16, vL); rect(x - 10, yb - 13, x + 10, yb - 12, crS);
}

// un boceto de anuncio en su hoja (sin letras): 0 una lata, 1 un coche, 2 una sonrisa, 3 una pastilla de jabón con
// burbujas; trazo de lápiz y una mancha de color
function b_boceto(R, x, y, w, a, tipo) {
  const { rect, pset, linea, disco } = R, lap = hex('#4a4a5a'), cx = x + (w >> 1), cy = y + (a >> 1);
  rect(x - 1, y - 1, x + w, y + a, C.k); rect(x, y, x + w - 1, y + a - 1, hex('#f8f4ea')); rect(x + w - 2, y + 1, x + w - 1, y + a - 1, hex('#e0d8c8'));
  if (tipo === 0) { rect(cx - 4, cy - 6, cx + 3, cy + 5, lap); rect(cx - 3, cy - 5, cx + 2, cy + 4, hex('#c83a3a')); rect(cx - 3, cy - 2, cx + 2, cy, hex('#f8f4ea')); rect(cx - 3, cy - 5, cx - 3, cy + 4, hex('#e86a5a')); rect(cx - 3, cy - 7, cx + 2, cy - 7, hex('#8a94a4')); for (let k = 0; k < 4; k++) linea(cx + 6, cy - 5 + k * 2, cx + 9, cy - 6 + k * 2, hex('#e8c040')); }
  else if (tipo === 1) { rect(cx - 9, cy, cx + 8, cy + 3, lap); rect(cx - 8, cy + 1, cx + 7, cy + 2, hex('#4ab0b0')); rect(cx - 4, cy - 4, cx + 3, cy, lap); rect(cx - 3, cy - 3, cx + 2, cy - 1, hex('#bcd6ea')); disco(cx - 5, cy + 4, 2, lap); disco(cx + 5, cy + 4, 2, lap); pset(cx - 5, cy + 4, hex('#f8f4ea')); pset(cx + 5, cy + 4, hex('#f8f4ea')); linea(cx - 12, cy + 7, cx + 11, cy + 7, hex('#9a9aa8')); for (let k = 0; k < 3; k++) linea(cx - 14 + k, cy - 2 + k * 2, cx - 11 + k, cy - 2 + k * 2, hex('#9a9aa8')); }
  else if (tipo === 2) { R.anillo(cx, cy, 7, lap); pset(cx - 3, cy - 2, lap); pset(cx + 3, cy - 2, lap); pset(cx - 3, cy - 3, lap); pset(cx + 3, cy - 3, lap); for (let i = -4; i <= 4; i++) { pset(cx + i, cy + 2 + (Math.abs(i) < 3 ? 2 : Math.abs(i) < 4 ? 1 : 0), hex('#c83a3a')); if (Math.abs(i) < 3) pset(cx + i, cy + 3, hex('#f8f4ea')); } for (let k = 0; k < 4; k++) { const an = -2.4 + k * 0.5; linea(cx + Math.round(Math.cos(an) * 9), cy + Math.round(Math.sin(an) * 9), cx + Math.round(Math.cos(an) * 11), cy + Math.round(Math.sin(an) * 11), hex('#e8c040')); } }
  else { rect(cx - 7, cy, cx + 6, cy + 5, lap); rect(cx - 6, cy + 1, cx + 5, cy + 4, hex('#f0a0c0')); rect(cx - 6, cy + 1, cx + 5, cy + 1, hex('#f8c8dc')); rect(cx - 3, cy + 2, cx + 2, cy + 3, hex('#f8c8dc')); for (const [dx, dy, r] of [[-5, -4, 2], [0, -6, 3], [5, -3, 2], [3, -9, 1], [-3, -9, 1]]) { R.anillo(cx + dx, cy + dy, r, hex('#7ab8e8')); pset(cx + dx - 1, cy + dy - 1, C.blanco); } }
  for (let k = 0; k < 2; k++) rect(x + 2, y + a - 5 + k * 2, x + w - 5 - k * 5, y + a - 5 + k * 2, hex('#b8b0a0'));
}

// un dibujo de niño hecho con ceras: 0 una casa con sol, 1 un monigote con un perro, 2 un gato
function b_dibujoNino(R, x, y, tipo) {
  const { rect, pset, linea, disco } = R; rect(x - 1, y - 1, x + 13, y + 11, C.k); rect(x, y, x + 12, y + 10, hex('#f8f4ea'));
  if (tipo === 0) { rect(x + 2, y + 5, x + 7, y + 9, hex('#c83a3a')); linea(x + 1, y + 5, x + 4, y + 2, hex('#3a6ab8')); linea(x + 5, y + 2, x + 8, y + 5, hex('#3a6ab8')); pset(x + 4, y + 8, hex('#e8c040')); disco(x + 10, y + 2, 1, hex('#f0c020')); rect(x, y + 10, x + 12, y + 10, hex('#3a8a4a')); }
  else if (tipo === 1) { pset(x + 3, y + 2, hex('#e8803a')); pset(x + 4, y + 2, hex('#e8803a')); linea(x + 3, y + 3, x + 3, y + 7, hex('#3a6ab8')); linea(x + 1, y + 5, x + 5, y + 5, hex('#3a6ab8')); pset(x + 2, y + 8, hex('#3a6ab8')); pset(x + 4, y + 8, hex('#3a6ab8')); rect(x + 7, y + 6, x + 10, y + 7, hex('#8a5a34')); pset(x + 11, y + 5, hex('#8a5a34')); pset(x + 7, y + 8, hex('#8a5a34')); pset(x + 10, y + 8, hex('#8a5a34')); pset(x + 6, y + 5, hex('#8a5a34')); }
  else { disco(x + 6, y + 6, 3, hex('#e8803a')); disco(x + 6, y + 3, 2, hex('#e8803a')); pset(x + 4, y + 1, hex('#e8803a')); pset(x + 8, y + 1, hex('#e8803a')); pset(x + 5, y + 3, C.k); pset(x + 7, y + 3, C.k); linea(x + 9, y + 8, x + 11, y + 5, hex('#e8803a')); }
  rect(x + 5, y - 1, x + 7, y, [hex('#e8c040'), hex('#c83a3a'), hex('#3a6ab8')][tipo]);   // el imán
}

function b_cocinaFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf;
  // el techo, el papel pintado (liso arriba y en la esquina de Atom) y el zócalo de madera pintada
  for (let y = 0; y <= 19; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_um(x, y) < 0.18 + y * 0.012 ? hex('#6ea896') : hex('#78b4a0');   // el friso verde menta (tranquilo bajo la barra del año)
  rect(0, 20, 319, 20, hex('#4a7a6a')); rect(0, 21, 319, 22, hex('#d4ecdc')); rect(0, 23, 319, 23, hex('#b8a870'));
  for (let y = 24; y <= 91; y++) for (let x = 0; x < 320; x++) { const calma = x > 264 && y < 50, u = x % 12, v = (y - 11) % 12, c = hex('#f0e2a8');
    B[y * 320 + x] = calma ? (b_um(x, y) < 0.12 ? hex('#ecdca0') : c) : (u === 5 && v > 3 && v < 7) || (v === 5 && u > 3 && u < 7) ? hex('#e8b850') : (u === 5 && v === 5) ? hex('#c8743a') : ((u + 6) % 12 === 5 && (v + 6) % 12 === 5) ? hex('#a8c890') : x % 12 === 11 ? hex('#e8d898') : c; }
  for (let y = 92; y <= 127; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y < 94 ? (y === 92 ? hex('#f8fcf4') : hex('#a8c8b4')) : x % 10 === 0 ? hex('#a0c4b0') : x % 10 === 1 ? hex('#d4ecdc') : hex('#bcdcc8');
  rect(0, 122, 319, 127, hex('#8ab4a0')); rect(0, 122, 319, 122, hex('#d4ecdc')); rect(0, 127, 319, 127, hex('#4a6a5c'));
  // el suelo de damero en perspectiva, con el brillo de la ventana
  { const F = [128, 132, 137, 143, 150, 158, 167, 177, 190]; for (let y = 128, v = 0; y < 180; y++) { if (y >= F[v + 1]) v++; const w = 9 + (y - 128) * 0.26, borde = y === F[v];
    for (let x = 0; x < 320; x++) { const u = Math.floor((x - 160) / w + 100), par = (u + v) & 1, n = h(x, y, 20), fx = ((x - 160) / w + 100) - u;
      B[y * 320 + x] = par ? (borde ? hex('#d85a50') : n < 0.07 ? hex('#a83030') : fx > 0.86 ? hex('#b03a34') : hex('#c8433c')) : (borde ? hex('#fffaf0') : n < 0.07 ? hex('#dcd4c0') : fx > 0.86 ? hex('#e0d8c4') : hex('#f4eedc')); } } }
  b_sombra(R, 0, 128, 319, 130, 0.25); b_rayo(R, 150, 128, 200, 168, 0.8, C.blanco, 0.28);
  b_cocinaSuelo(R);
  // ── la nevera redondeada de los cincuenta, con la radio encima y los dibujos de los niños
  b_sombra(R, 10, 126, 66, 131, 0.3);
  rect(11, 46, 61, 127, C.k); rect(13, 43, 59, 46, C.k); rect(16, 41, 56, 43, C.k); rect(12, 47, 60, 126, hex('#e2ecd8')); rect(14, 44, 58, 47, hex('#e2ecd8')); rect(17, 42, 55, 44, hex('#f4faec')); rect(12, 47, 14, 126, hex('#f4faec')); rect(56, 47, 60, 126, hex('#b8c8b0')); rect(58, 49, 60, 126, hex('#a0b29a'));
  rect(12, 72, 60, 73, hex('#8a9a84')); rect(12, 74, 60, 74, hex('#f4faec')); rect(50, 54, 53, 68, C.k); rect(51, 55, 52, 67, hex('#c8d0dc')); rect(50, 78, 53, 96, C.k); rect(51, 79, 52, 95, hex('#c8d0dc')); rect(20, 50, 34, 53, hex('#c8d0dc')); rect(21, 51, 33, 52, hex('#c83a3a')); rect(12, 124, 60, 126, hex('#5a6a5c'));
  b_dibujoNino(R, 16, 58, 0); b_dibujoNino(R, 33, 80, 1); b_dibujoNino(R, 17, 98, 2); rect(34, 100, 44, 110, C.k); rect(35, 101, 43, 109, hex('#f8f4ea')); for (let l = 0; l < 3; l++) rect(36, 103 + l * 2, 41 - l, 103 + l * 2, hex('#9a9aa8')); disco(39, 100, 1, hex('#3a8a4a'));
  rect(22, 28, 50, 41, C.k); rect(23, 29, 49, 40, hex('#c8743a')); rect(23, 29, 49, 30, hex('#e8a060')); rect(25, 32, 37, 38, hex('#3a2a1e')); for (let x = 26; x < 37; x += 2) rect(x, 33, x, 37, hex('#8a6a3a')); disco(43, 35, 3, C.k); disco(43, 35, 2, hex('#f8e8b0')); linea(36, 28, 30, 23, hex('#8a94a4'));   // la radio (el dial lo enciende b_cocina)
  // ── el corcho con los bocetos de anuncios de Beverly
  rect(65, 29, 115, 87, C.k); rect(66, 30, 114, 86, hex('#8a5e3a')); rect(68, 32, 112, 84, hex('#c89a64')); for (let k = 0; k < 150; k++) pset(68 + Math.round(h(k, 1, 21) * 44), 32 + Math.round(h(k, 2, 21) * 52), k % 3 ? hex('#b08650') : hex('#d8ac78'));
  b_boceto(R, 70, 34, 19, 23, 0); b_boceto(R, 92, 36, 19, 21, 2); b_boceto(R, 71, 60, 24, 21, 1); b_boceto(R, 97, 60, 14, 22, 3); for (const [px, py, c] of [[79, 34, C.rojo], [101, 36, hex('#3a6ab8')], [83, 60, hex('#e8c040')], [104, 60, C.rojo]]) disco(px, py, 1, c);
  // ── la ventana sobre el fregadero (el cristal, en vivo): marco y alféizar con macetas
  rect(121, 31, 191, 83, C.k); rect(122, 32, 190, 82, hex('#f8f4ea')); rect(188, 34, 190, 82, hex('#d0c8b8')); rect(125, 35, 187, 79, C.k);
  rect(118, 83, 194, 86, C.k); rect(119, 83, 193, 84, hex('#f8f4ea')); rect(119, 85, 193, 85, hex('#c8c0b0'));
  // ── la encimera con el fregadero, los armarios bajos y la cocina de esmalte
  rect(116, 93, 276, 97, C.k); rect(117, 94, 275, 94, hex('#f4f0e8')); rect(117, 95, 275, 95, hex('#e8a8a0')); rect(117, 96, 275, 96, hex('#c8d0dc'));
  rect(116, 98, 276, 127, C.k); for (let k = 0; k < 4; k++) { const x0 = [117, 157, 245, 0][k], x1 = [156, 199, 275, 0][k]; if (!x1) continue; rect(x0, 98, x1, 126, hex('#9ad0c0')); rect(x0 + 2, 100, x1 - 2, 124, hex('#6eb0a0')); rect(x0 + 3, 101, x1 - 3, 123, hex('#a8dccc')); rect(x0 + 3, 101, x1 - 3, 101, hex('#d0f0e4')); rect(x1 - 7, 108, x1 - 5, 114, C.k); rect(x1 - 6, 109, x1 - 6, 113, hex('#e8eef4')); rect(x0 + 6, 104, x1 - 10, 104, hex('#bce8d8')); }
  rect(117, 124, 275, 126, hex('#3a4a44'));
  rect(140, 89, 172, 93, C.k); rect(141, 90, 171, 92, hex('#e8eef4')); rect(142, 91, 170, 92, hex('#9aa4b4')); rect(154, 80, 156, 90, C.k); rect(155, 81, 155, 89, hex('#e8eef4')); rect(154, 78, 162, 80, C.k); rect(155, 79, 161, 79, hex('#e8eef4')); rect(160, 80, 162, 83, C.k); pset(161, 81, hex('#c8d0dc')); for (const dx of [-4, 5]) { rect(155 + dx - 1, 86, 155 + dx + 1, 89, C.k); pset(155 + dx, 87, dx < 0 ? C.rojo : hex('#3a6ab8')); }
  rect(176, 85, 186, 93, C.k); for (let i = 0; i < 4; i++) { rect(177 + i * 2, 86 + (i % 2), 178 + i * 2, 92, i % 2 ? hex('#f4f0e8') : hex('#b8d8f0')); } rect(126, 86, 136, 93, C.k); rect(127, 87, 135, 92, hex('#e8c040')); rect(127, 87, 135, 88, hex('#f8e080')); rect(129, 84, 133, 86, C.k); rect(130, 85, 132, 85, hex('#4a8a4a'));   // el escurreplatos y el jabón
  // la cocina: placa, mandos, horno con su cristal
  rect(200, 88, 244, 127, C.k); rect(201, 89, 243, 126, hex('#f4f0e8')); rect(201, 89, 243, 90, C.blanco); rect(240, 91, 243, 126, hex('#d0c8b8')); rect(201, 84, 243, 88, C.k); rect(202, 85, 242, 87, hex('#f4f0e8')); disco(222, 86, 1, hex('#c8d0dc'));
  rect(201, 91, 243, 92, hex('#2a2a34')); for (const bx of [212, 232]) { rect(bx - 6, 90, bx + 6, 91, hex('#16161c')); }
  for (let k = 0; k < 4; k++) { disco(208 + k * 9, 99, 2, C.k); pset(208 + k * 9, 98, hex('#c83a3a')); pset(208 + k * 9, 99, hex('#f4f0e8')); } rect(205, 104, 239, 122, C.k); rect(206, 105, 238, 121, hex('#e8e4d8')); rect(210, 108, 234, 117, C.k); rect(211, 109, 233, 116, hex('#3a2a1e')); for (let i = 0; i < 5; i++) pset(213 + i, 114 - i, hex('#7a5a3a')); rect(208, 106, 236, 106, hex('#c8d0dc')); rect(201, 124, 243, 126, hex('#5a5a5a'));
  // la cafetera (percolador de cromo) y una olla
  { const x = 212; rect(x - 6, 76, x + 5, 90, C.k); rect(x - 5, 77, x + 4, 89, hex('#c8d0dc')); rect(x - 5, 77, x - 4, 89, hex('#f4f8fc')); rect(x + 2, 77, x + 4, 89, hex('#8a94a4')); rect(x - 4, 73, x + 3, 76, C.k); rect(x - 3, 74, x + 2, 75, hex('#e8eef4')); rect(x - 1, 71, x, 73, C.k); pset(x - 1, 72, hex('#8ac0e0')); poligono([[x - 6, 78], [x - 11, 76], [x - 10, 80], [x - 6, 82]], C.k); pset(x - 8, 79, hex('#c8d0dc')); rect(x + 5, 78, x + 9, 79, C.k); rect(x + 8, 79, x + 9, 86, C.k); rect(x + 5, 86, x + 9, 87, C.k); rect(x - 5, 84, x + 4, 84, hex('#8a94a4')); }
  { const x = 232; rect(x - 7, 82, x + 7, 90, C.k); rect(x - 6, 83, x + 6, 89, hex('#3a6ab8')); rect(x - 6, 83, x + 6, 83, hex('#6a9ae0')); rect(x - 8, 81, x + 8, 82, C.k); rect(x - 1, 79, x + 1, 80, C.k); rect(x - 10, 84, x - 8, 85, C.k); rect(x + 8, 84, x + 10, 85, C.k); for (let i = -5; i < 6; i += 3) pset(x + i, 86, C.blanco); }
  // ── los armarios altos, la barra con los cacharros colgados y la campana
  rect(196, 23, 268, 58, C.k); for (let k = 0; k < 3; k++) { const x0 = 197 + k * 24; rect(x0, 24, x0 + 22, 57, hex('#9ad0c0')); rect(x0 + 2, 26, x0 + 20, 55, hex('#6eb0a0')); rect(x0 + 3, 27, x0 + 19, 54, hex('#a8dccc')); rect(x0 + 3, 27, x0 + 19, 27, hex('#d0f0e4')); rect(x0 + (k === 1 ? 4 : 16), 46, x0 + (k === 1 ? 5 : 17), 51, C.k); for (let g = 0; g < 2; g++) rect(x0 + 5, 32 + g * 9, x0 + 15, 32 + g * 9, hex('#bce8d8')); }
  rect(196, 58, 268, 59, hex('#4a6a5c'));
  rect(198, 64, 266, 65, hex('#8a94a4')); rect(198, 64, 266, 64, hex('#e8eef4'));
  { linea(246, 65, 246, 68, hex('#5a5a6a')); disco(246, 73, 5, C.k); disco(246, 73, 4, hex('#3a3a44')); disco(245, 72, 2, hex('#5a5a68')); linea(254, 65, 254, 80, C.k); rect(252, 78, 256, 84, C.k); rect(253, 79, 255, 83, hex('#c8d0dc')); linea(260, 65, 260, 76, C.k); for (let i = -2; i <= 2; i++) linea(260 + i, 70, 260 + i, 78 - Math.abs(i), hex('#c8d0dc')); rect(236, 66, 240, 72, C.k); rect(237, 67, 239, 71, hex('#c83a3a')); }
  // ── a la derecha (bajo la esquina de Atom): el reloj, el calendario (solo números) y el teléfono de pared
  disco(292, 58, 7, C.k); disco(292, 58, 6, hex('#c83a3a')); disco(292, 58, 5, hex('#f8f4ea')); for (let k = 0; k < 12; k++) pset(292 + Math.round(Math.sin(k * 0.5236) * 4), 58 - Math.round(Math.cos(k * 0.5236) * 4), hex('#5a5a6a'));
  rect(276, 70, 290, 90, C.k); rect(277, 71, 289, 89, hex('#f8f4ea')); rect(277, 71, 289, 75, hex('#c83a3a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) pset(279 + i * 2, 78 + j * 3, (i + j * 5) % 7 === 3 ? hex('#c83a3a') : hex('#8a8aa0')); disco(283, 70, 1, hex('#8a94a4'));
  rect(296, 68, 310, 92, C.k); rect(297, 69, 309, 91, hex('#3a3a44')); rect(297, 69, 309, 70, hex('#5a5a68')); disco(303, 80, 4, hex('#16161c')); disco(303, 80, 3, hex('#e8e4d8')); disco(303, 80, 1, hex('#3a3a44')); rect(294, 71, 312, 74, C.k); rect(295, 72, 311, 73, hex('#4a4a56')); rect(293, 70, 296, 77, C.k); rect(310, 70, 313, 77, C.k); for (let y = 92; y < 112; y += 2) pset(300 + ((y >> 1) & 1), y, hex('#3a3a44'));
  // ── la lámpara de globo
  rect(206, 0, 207, 16, hex('#4a6a5c')); rect(202, 10, 211, 12, C.k); rect(203, 11, 210, 11, hex('#d8a840')); disco(206, 21, 8, hex('#c8c0a8')); disco(206, 21, 7, hex('#f8f4e0')); disco(205, 20, 4, C.blanco); b_charco(R, 206, 24, 30, 20, hex('#fff8d8'), 0.22);
  // ── dos sillas de cromo, una escoba y el cuenco del gato
  b_sombra(R, 80, 145, 108, 148, 0.3); b_sillaCromo(R, 94, 146); b_sombra(R, 240, 145, 268, 148, 0.3); b_sillaCromo(R, 254, 146);
  linea(310, 94, 307, 134, hex('#a8743c')); linea(311, 94, 308, 134, hex('#83552c')); poligono([[302, 134], [314, 134], [316, 144], [300, 144]], C.k); poligono([[303, 135], [313, 135], [314, 143], [302, 143]], hex('#e8c040')); for (let x = 303; x < 314; x += 2) linea(x, 136, x - 1, 143, hex('#b8901c'));
  b_sombra(R, 64, 126, 114, 130, 0.3);
  rect(66, 104, 82, 127, C.k); rect(67, 105, 81, 126, hex('#e8eef4')); rect(67, 105, 69, 126, C.blanco); rect(78, 105, 81, 126, hex('#b4bcc8')); rect(65, 101, 83, 104, C.k); rect(66, 102, 82, 103, hex('#c83a3a')); rect(66, 102, 82, 102, hex('#e86a5a')); rect(72, 99, 76, 101, C.k); rect(70, 125, 78, 127, C.k); rect(71, 113, 77, 113, hex('#b4bcc8'));   // el cubo de pedal
  rect(88, 112, 112, 127, C.k); rect(89, 113, 111, 126, hex('#a8743c')); rect(89, 113, 111, 113, hex('#c8944c')); rect(89, 119, 111, 119, hex('#83552c')); for (let x = 93; x < 110; x += 6) { rect(x - 2, 104, x + 2, 113, C.k); rect(x - 1, 105, x + 1, 113, hex('#f8f8f4')); pset(x - 1, 106, C.blanco); rect(x - 1, 102, x + 1, 104, C.k); pset(x, 103, x % 12 > 5 ? hex('#c83a3a') : hex('#3a6ab8')); rect(x, 114, x, 126, hex('#83552c')); }   // la caja con las botellas de leche
  rect(70, 130, 80, 134, C.k); rect(71, 131, 79, 133, hex('#3a6ab8')); rect(72, 130, 78, 130, hex('#f8f4ea')); b_sombra(R, 68, 135, 82, 136, 0.3);
}
function b_cocina(R, t, o) {
  const { rect, pset, linea, disco } = R, cl = b_VENT_C;
  b_fondo(R, 'cocina', () => b_cocinaFijo(R));
  // la ventana: el jardín (o la lluvia), el parteluz y los visillos de cuadros que mueve el aire
  b_ventana(R, t, cl, o.lluvia ? 'lluvia' : 'dia');
  rect(155, 36, 157, 78, hex('#f8f4ea')); rect(157, 36, 157, 78, hex('#d0c8b8')); rect(126, 56, 186, 57, hex('#f8f4ea'));
  rect(123, 33, 189, 34, hex('#8a94a4'));
  for (let x = 125; x <= 187; x++) { const a = 9 + Math.round(Math.sin(x * 0.45) * 1.5 + Math.sin(t * 1.3 + x * 0.2) * 0.8); for (let y = 35; y <= 35 + a; y++) pset(x, y, ((x >> 1) + (y >> 1)) & 1 ? hex('#c83a3a') : hex('#f8f4ea')); pset(x, 36 + a, C.k); }
  for (const [x0, s] of [[126, 1], [186, -1]]) for (let y = 58; y <= 78; y++) { const w = 9 + Math.round(Math.sin(t * 1.1 + y * 0.2 + s) * 1.2); for (let i = 0; i < w; i++) pset(x0 + s * i, y, ((i >> 1) + (y >> 1)) & 1 ? hex('#c83a3a') : hex('#f8f4ea')); pset(x0 + s * w, y, C.k); }
  // las macetas del alféizar
  for (const [x, c] of [[134, '#c83a3a'], [178, '#e8c040']]) { rect(x - 3, 78, x + 3, 83, C.k); rect(x - 2, 79, x + 2, 82, hex('#c0603a')); const m = Math.round(Math.sin(t * 1.2 + x) * 0.6); linea(x, 78, x + m, 73, hex('#3a8a4a')); linea(x - 1, 78, x - 3 + m, 75, hex('#3a8a4a')); linea(x + 1, 78, x + 3 + m, 75, hex('#3a8a4a')); disco(x + m, 72, 1, hex(c)); }
  // la gota del grifo, la llama y el vapor de la cafetera, el dial de la radio, el reloj y el cordón del teléfono
  { const u = (t * 0.8) % 1; if (u < 0.5) pset(161, 84 + Math.round(u * 12), hex('#8ac0e0')); else if (u < 0.6) { pset(160, 90, hex('#8ac0e0')); pset(162, 90, hex('#8ac0e0')); } }
  for (let i = -4; i <= 4; i += 2) pset(212 + i, 90 - (Math.floor(t * 9 + i) % 2), i % 4 ? hex('#6ab0f8') : hex('#f8e080'));
  for (let k = 0; k < 5; k++) { const ph = (t * 0.5 + k / 5) % 1; for (let i = 0; i < 4; i++) { const x = Math.round(202 + Math.sin(ph * 7 + k * 1.9 + i * 0.7) * 2.5 - ph * 4), y = Math.round(75 - ph * 30 - i * 2); if (y > 24) pset(x, y, ph < 0.45 ? hex('#f8f8fc') : hex('#d0d4dc')); } }
  { const g = Math.sin(t * 5) > 0.2; disco(43, 35, 2, g ? hex('#fff0a0') : hex('#f8e8b0')); linea(43, 35, 43 + Math.round(Math.sin(t * 0.3) * 2), 33, C.rojo); for (let k = 0; k < 3; k++) { const u = (t * 1.2 + k / 3) % 1; if (u < 0.7) pset(53 + Math.round(u * 8), 30 - Math.round(Math.sin(u * 4 + k) * 2) - k * 2, hex('#c8743a')); } }   // la radio suena: unas notas (puntos) que salen
  { const a = t * 0.105, a2 = t * 0.105 / 12 + 1; linea(292, 58, 292 + Math.round(Math.sin(a) * 4), 58 - Math.round(Math.cos(a) * 4), C.k); linea(292, 58, 292 + Math.round(Math.sin(a2) * 2), 58 - Math.round(Math.cos(a2) * 2), C.k); pset(292, 58, C.rojo); }
  // el gato, sentado cerca de su cuenco (mueve la cola y a ratos se lame, con los ojos cerrados), y una mosca que
  // ronda la lámpara
  { const x = 55, y = 138, come = Math.sin(t * 0.7) > 0.55, co = Math.round(Math.sin(t * 1.9) * 2), pal = { k: C.k, a: hex('#8a8a94'), d: hex('#5e5e70'), l: hex('#c4c4d0'), p: hex('#e8a0a0'), e: come ? hex('#5e5e70') : hex('#e8c040') };
    const pinta = (f, x0, y0) => f.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) if (fila[i] !== '.') pset(x0 + i, y0 + j, pal[fila[i]]); });
    linea(x - 6, y - 1, x - 9, y - 2 - Math.abs(co), C.k); linea(x - 6, y - 2, x - 9, y - 3 - Math.abs(co), C.k); pset(x - 9 - (co > 0 ? 1 : 0), y - 4 - Math.abs(co), C.k);
    pinta(b_GATO[1], x - 6, y - 6); pinta(b_GATO[0], x - 2, y - 12 + (come ? 1 + (Math.floor(t * 5) % 2) : 0)); }
  { const a = t * 2.1, x = Math.round(206 + Math.cos(a) * 14 + Math.sin(a * 2.3) * 4), y = Math.round(27 + Math.sin(a * 1.4) * 6 + Math.cos(a * 3.1) * 2); pset(x, y, C.k); if (Math.floor(t * 14) % 2) pset(x + 1, y - 1, hex('#8a8a94')); }
  return { ...b_GEO_COCINA };
}
function b_cocinaDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = PIEZAS_DU;
  b_frente(R, 'cocinaD', 100, 179, () => {
    const cr = hex('#c8d0dc'), crS = hex('#8a94a4');
    for (let y = 170; y <= 172; y++) for (let x = 110 + (y - 170) * 3; x <= 234 - (y - 170) * 3; x++) if ((x + y) & 1) pset(x, y, hex('#5a2a28'));
    for (const [x, d] of [[114, -1], [230, 1]]) { linea(x, 143, x + d * 4, 170, C.k); linea(x + 1, 143, x + 1 + d * 4, 170, cr); linea(x + 2, 143, x + 2 + d * 4, 170, crS); linea(x - d * 6, 143, x + d * 3, 170, C.k); linea(x - d * 6 + 1, 143, x + d * 3 + 1, 170, crS); rect(x + d * 4 - 1, 170, x + d * 4 + 3, 171, C.k); }
    rect(110, 143, 234, 147, C.k); rect(111, 144, 233, 146, hex('#8e2424')); rect(111, 144, 233, 144, hex('#a83030'));
    rect(106, 137, 238, 143, C.k); rect(107, 138, 237, 138, hex('#f08070')); rect(107, 139, 237, 139, hex('#d84a42')); rect(107, 140, 237, 142, cr); rect(107, 141, 237, 141, C.blanco); rect(107, 142, 237, 142, crS); for (let x = 109; x < 237; x += 4) pset(x, 140, crS);
    // el tablero de dibujo inclinado con un boceto, y el bote de lápices
    poligono([[120, 137], [144, 137], [141, 117], [123, 117]], C.k); poligono([[121, 136], [143, 136], [140, 118], [124, 118]], hex('#a8743c')); rect(125, 120, 139, 134, hex('#f8f4ea')); rect(128, 124, 136, 130, hex('#4a4a5a')); rect(129, 125, 135, 129, hex('#e8c040')); rect(129, 125, 135, 126, hex('#f8e080')); disco(132, 127, 1, hex('#c83a3a')); for (let k = 0; k < 3; k++) linea(137, 122 + k, 138, 121 + k, hex('#4a4a5a')); rect(126, 132, 134, 132, hex('#b8b0a0')); rect(130, 117, 134, 118, crS);
    rect(147, 129, 154, 137, C.k); rect(148, 130, 153, 136, hex('#f4f0e8')); rect(148, 132, 153, 133, hex('#c83a3a')); for (const [x, c, y] of [[148, '#e8c040', 123], [150, '#3a6ab8', 125], [152, '#c83a3a', 122]]) { rect(x, y, x, 129, hex(c)); pset(x, y - 1, C.k); }
    // bocetos sueltos, la máquina y la taza
    rect(172, 135, 188, 137, C.k); rect(173, 135, 187, 136, hex('#f8f4ea')); rect(175, 136, 182, 136, hex('#9a9aa8')); rect(176, 133, 190, 135, C.k); rect(177, 133, 189, 134, hex('#efe6d0')); pset(180, 134, hex('#c83a3a')); pset(184, 134, hex('#4ab0b0'));
    P.maquina?.(R, 204, 138, {});
    rect(222, 130, 230, 137, C.k); rect(223, 131, 229, 136, hex('#8ad0c0')); rect(223, 131, 229, 131, hex('#5a3a2a')); rect(230, 132, 232, 135, C.k); pset(231, 133, hex('#8ad0c0')); pset(231, 134, hex('#8ad0c0')); rect(224, 134, 228, 134, hex('#f4f0e8'));
  }, 6);
  for (let k = 0; k < 3; k++) { const ph = (t * 0.55 + k / 3) % 1; for (let i = 0; i < 3; i++) pset(Math.round(226 + Math.sin(ph * 6 + k * 2 + i * 0.8) * 1.6), Math.round(135 - ph * 12 - i * 2), ph < 0.6 ? hex('#f0f0f4') : hex('#c8c8d4')); }
  return { ...b_GEO_COCINA };
}

// mezcla de dos colores (u = 0 → a, u = 1 → b)
const c_mez = (a, b, u) => { u = u < 0 ? 0 : u > 1 ? 1 : u; const r = (a & 255) + ((b & 255) - (a & 255)) * u, g = ((a >> 8) & 255) + (((b >> 8) & 255) - ((a >> 8) & 255)) * u, bl = ((a >> 16) & 255) + (((b >> 16) & 255) - ((a >> 16) & 255)) * u; return (0xff000000 | (bl << 16) | (g << 8) | r) >>> 0; };

// trama de Bayer 4×4 y tono tramado de una rampa (v = índice con decimales)
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b = (x, y) => (c_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const c_tono = (rampa, v, x, y) => { let l = Math.floor(v); if (v - l > c_b(x, y)) l++; return rampa[l < 0 ? 0 : l >= rampa.length ? rampa.length - 1 : l]; };

const c_rampa = (...cs) => cs.map(hex);

// la paleta de cada hora: cielo (de arriba al horizonte), arena (de la sombra a la luz), roca, bruma del horizonte,
// los tres velos de polvo alto y las dos lunas
const c_HORAS = {
  ocaso: { hora: 'ocaso', cielo: c_rampa('#2c1a4c', '#45245e', '#6c3068', '#98425e', '#c45e4c', '#e08a40', '#f0b458', '#f8d888'),
    arena: c_rampa('#5e262e', '#8a3c26', '#b85a24', '#dc8434', '#f2ac54', '#fcd68a'), roca: c_rampa('#24182c', '#3c2436', '#5c343c', '#844e44', '#b07454'),
    bruma: hex('#e8985a'), velo: c_rampa('#b4585a', '#e89a58', '#f8cc84'), lunaG: c_rampa('#8a6e84', '#bca49c', '#e0d0b4', '#f8eed4'), lunaP: c_rampa('#7a4448', '#a8684e', '#d49466', '#f0c08c'),
    estrella: c_rampa('#8a6a96', '#d8c0d8', '#fff4e0'), destello: c_rampa('#ff7a20', '#ffb040', '#fff0b0') },
  noche: { hora: 'noche', cielo: c_rampa('#090b22', '#0f1336', '#181a4c', '#24225c', '#352a68', '#4c336c', '#643c6a', '#7c4868'),
    arena: c_rampa('#1e1638', '#322046', '#4e2c50', '#743e52', '#9c5a52', '#c88868'), roca: c_rampa('#0c0a1c', '#181228', '#281c38', '#3c2c4a', '#584664'),
    bruma: hex('#583a68'), velo: c_rampa('#2e2860', '#463470', '#64487c'), lunaG: c_rampa('#585878', '#9c9cb0', '#d4d4dc', '#fcfcf4'), lunaP: c_rampa('#5c3a4c', '#94605c', '#c88c74', '#f0c0a0'),
    estrella: c_rampa('#6a6aa0', '#c0c8f0', '#ffffff'), destello: c_rampa('#ff7a20', '#ffb040', '#fff0b0') },
  dia: { hora: 'dia', cielo: c_rampa('#8470a8', '#a88cac', '#c8a4a4', '#e0bc94', '#ecce94', '#f4dea4', '#f8eabc', '#fcf4d4'),
    arena: c_rampa('#8a4222', '#b46026', '#d88232', '#eea248', '#f8c674', '#fde8ac'), roca: c_rampa('#38242e', '#583638', '#7c4e40', '#a47050', '#c89a72'),
    bruma: hex('#f2cc94'), velo: c_rampa('#e4c49c', '#f4dcb0', '#fdf2d8'), lunaG: c_rampa('#c8a8a8', '#dcc4b4', '#f0e0c8', '#fcf6e4'), lunaP: c_rampa('#c09088', '#d8a88c', '#ecc4a0', '#f8dcbc'),
    estrella: c_rampa('#c8a4a4', '#e8d4c0', '#fcf4d4'), destello: c_rampa('#ff8a28', '#ffc050', '#fff4c0') },
};

// las dos cámaras del desierto. Cada capa de dunas: [base, altura, periodo, fase, semilla, lejanía 0–1]
const c_VISTAS = {
  general: { hor: 92, sol: [44, 89, 9], lunaG: [216, 48, 16], lunaP: [112, 37, 6], suelo: 150,
    capas: [[96, 4, 40, 0.3, 1, 0.72], [102, 7, 58, 0.1, 2, 0.52], [107, 3, 96, 0.6, 3, 0.36], [130, 13, 104, 0.2, 4, 0.16], [147, 15, 150, 0.55, 5, 0.04]],
    mesetas: [[176, 22, 9], [204, 9, 12], [262, 30, 6], [96, 16, 5], [16, 20, 7]],
    rocas: [[268, 127, 30, 15, 31, 0.1], [62, 119, 16, 7, 33, 0.22], [150, 104, 10, 4, 35, 0.4], [300, 109, 12, 5, 37, 0.36]],
    loma: { y: 116, len: 112, alto: 13, x0: 240 }, torbellinos: [[96, 111, 13, 0.9], [226, 103, 8, 1.7]], plumas: [3, 4], brillos: [100, 178] },
  roca: { hor: 64, sol: [26, 62, 8], lunaG: [222, 46, 24], lunaP: [122, 40, 9], suelo: 131,
    capas: [[67, 3, 22, 0.2, 11, 0.8], [72, 4, 32, 0.7, 12, 0.66], [78, 5, 44, 0.4, 13, 0.52], [86, 6, 60, 0.1, 14, 0.4], [90, 2, 110, 0.5, 15, 0.3], [110, 9, 84, 0.3, 16, 0.18], [128, 12, 112, 0.75, 17, 0.08], [150, 14, 140, 0.15, 18, 0], [172, 15, 180, 0.6, 19, 0]],
    mesetas: [[150, 18, 6], [188, 8, 9], [282, 26, 5], [70, 22, 4]],
    rocas: [[246, 96, 16, 7, 41, 0.3], [296, 122, 22, 11, 43, 0.1], [226, 150, 26, 12, 45, 0]],
    loma: { y: 101, len: 140, alto: 15, x0: 262 }, torbellinos: [[250, 85, 9, 0.6], [286, 104, 12, 2.1]], plumas: [5, 6, 7], brillos: [70, 178] },
  // la cámara general de DÍA (o.hora 'dia'): a ras del llano. El horizonte baja a y 104, el cielo es grande, la luna
  // grande asoma enorme tras el horizonte a la derecha (por debajo de la esquina de Atom) y la pequeña va alta, en el
  // centro; el sol, arriba a la izquierda, bajo la barra del año. Entre las dunas bajas del fondo y la cresta de
  // delante (y 150) queda un llano ancho con rizaduras y piedras: por ahí cruza la loma (y 128)
  llano: { hor: 104, sol: [44, 100, 9], solDia: [52, 50, 8], lunaG: [246, 102, 34], lunaP: [168, 58, 6], suelo: 150, llano: [117, 150],
    capas: [[108, 4, 46, 0.3, 21, 0.62], [113, 5, 72, 0.7, 22, 0.42], [118, 2, 150, 0.15, 23, 0.26], [133, 2, 230, 0.5, 24, 0.12]],
    mesetas: [[8, 40, 11], [58, 16, 6], [112, 26, 4], [170, 12, 8], [300, 20, 7]],
    rocas: [], rocasLlano: [[30, 127, 24, 11, 51, 0.16], [296, 141, 20, 9, 53, 0.06], [116, 120, 9, 4, 55, 0.3], [214, 144, 8, 3, 57, 0.04]],
    loma: { y: 129, len: 90, alto: 14, x0: 232 }, torbellinos: [[64, 121, 14, 0.9]], plumas: [1], brillos: [112, 178] },
};

// búferes fijos por lienzo: se pintan una vez y se copian en cada fotograma
const c_CACHE = new WeakMap();

function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b), extra = {}; dibuja(extra); R.usar(prev); m[clave] = { b, extra }; }
  R.copiar(m[clave].b); return m[clave].extra;
}

// el perfil de una capa de dunas en la columna x, a d píxeles por debajo de la cresta: la altura de la cresta (y), la
// fase p dentro de la duna (p < 0.7 la cara al viento, iluminada; p > 0.7 la cara de avalancha, en sombra) y su altura a
function c_duna(c, x, d = 0) {
  const per = c[2], k = c[4], xs = x - d * 0.7 - Math.sin(d * 0.1 + k) * per * 0.1;
  const xw = xs + per * 0.22 * Math.sin(xs * 6.2832 / (per * 3.1) + k) + per * 0.1 * Math.sin(xs * 6.2832 / (per * 1.3) + k * 2.3);
  const q = xw / per + c[3], i = Math.floor(q), p = q - i, a = c[1] * (0.45 + 0.55 * h(i, k, 3));
  const s = p < 0.7 ? (p / 0.7) ** 1.5 : 1 - ((p - 0.7) / 0.3) ** 0.75;
  return { y: c[0] - a * s, p, a, i };
}

// una capa de dunas, de su cresta hasta abajo: cara iluminada con rizaduras, arista viva, cara en sombra que baja en
// diagonal y se funde con el llano; rampa ya mezclada con la bruma según su lejanía
function c_capaDuna(R, c, rampa) {
  const k = c[4], fino = c[1] < 5;
  for (let x = 0; x < 320; x++) {
    const y0 = Math.round(c_duna(c, x).y);
    for (let y = Math.max(0, y0); y < 180; y++) {
      const d = y - y0, g = c_duna(c, x, d), f = Math.min(1, d / (c[1] * 2.2 + 5));
      let v;
      const lim = 0.7 + 0.3 * Math.max(0, 1 - d / (g.a * 2.4 + 3));     // la sombra se cierra en punta hacia abajo
      if (g.p < 0.7 || g.p >= lim) { const u = g.p < 0.7 ? g.p / 0.7 : 0.2; v = 2.6 + 2 * u * u; if (!fino && ((d + Math.round(2 * Math.sin(x * 0.31 + k) + x * 0.12)) % 5) === 0 && d > 1) v -= 0.5; }
      else { const u = (g.p - 0.7) / (lim - 0.7); v = 0.3 + 1.7 * u * u; }
      v += (2.9 - v) * f * 0.5 + (h(x, y, k) - 0.5) * 0.5;
      if (d === 0 && g.p < 0.74) v = g.p > 0.25 ? 5 : 4.2;
      else if (d === 1 && g.p < 0.7 && g.p > 0.45) v = Math.max(v, 4.4);
      R.pset(x, y, c_tono(rampa, v, x, y));
    }
  }
}

// un afloramiento de roca oscura: silueta mellada con estratos, grietas, la cara izquierda a la luz y la derecha en
// sombra, su sombra larga sobre la arena y la arena que se le amontona al pie. (cx, base) = centro de abajo
function c_roca(R, P, cx, base, w, hh, k, lejos = 0, o = {}) {
  const rp = lejos ? P.roca.map((c) => c_mez(c, P.bruma, lejos)) : P.roca, ar = lejos ? P.arena.map((c) => c_mez(c, P.bruma, lejos)) : P.arena, m = w / 2;
  const alto = (i) => { const u = i / m, b = Math.floor((i + m) / Math.max(2, w / 7)); return Math.max(1, Math.round(hh * (1 - Math.abs(u) ** 2.4) * (0.62 + 0.38 * h(b, k, 1)))); };
  if (!o.sinSombra) for (let i = -m; i <= m + hh * 2.4; i++) { const a = i <= m ? Math.min(3, Math.round((i + m) * 0.3)) : Math.max(0, Math.round(3 - (i - m) / (hh * 0.8))); for (let j = 0; j <= a; j++) if (((cx + i + base + j) & 1) === 0 || i < m + hh) R.pset(cx + i + j, base + j, ar[0]); }
  for (let i = -m; i <= m; i++) { const a = alto(i), u = i / m, x = Math.round(cx + i);
    for (let j = 0; j < a; j++) { const y = base - j; let v = 2.9 - (u + 1) * 1.05 - (1 - j / a) * 0.5 + (h(x, y, k) - 0.5) * 0.6;
      if ((y + Math.floor((x + k * 3) * 0.22)) % 4 === 0) v -= 0.9;                 // estratos
      if (h(Math.floor(x / 4), 0, k) < 0.28 && h(x, 1, k) < 0.5) v -= 0.8;           // grietas verticales
      if (j === a - 1) v = u < 0.3 ? 4 : 2.6; else if (j === a - 2 && u < 0) v += 0.8;
      if (i === -m || alto(i - 1) < j) v = Math.max(v, 3.4);                         // el filo de la izquierda, a la luz
      R.pset(x, y, c_tono(rp, v, x, y)); } }
  if (!o.sinSombra) for (let i = -m - 2; i <= m + 1; i++) { const x = Math.round(cx + i), n = h(x, 5, k) < 0.5 ? 1 : 0; for (let j = 0; j <= n; j++) R.pset(x, base - j + 1, ar[i < 0 ? 4 : 2]); }
}

// una luna: disco con cráteres, sombreado desde (lx, ly) y la parte oscura transparente (deja ver el cielo) salvo de
// noche; con halo tramado
function c_luna(R, cx, cy, r, rp, lx, ly, k, noche, yMax = 999) {
  const n = Math.hypot(lx, ly, 0.55), Lx = lx / n, Ly = ly / n, Lz = 0.55 / n;
  for (let j = -r - 3; j <= r + 3; j++) for (let i = -r - 3; i <= r + 3; i++) {
    const x = cx + i, y = cy + j, d2 = i * i + j * j; if (y > yMax) continue;
    if (d2 > r * r) { if (noche && d2 < (r + 3) * (r + 3) && c_b(x, y) < 0.3) R.pset(x, y, rp[0]); continue; }
    const nz = Math.sqrt(1 - d2 / (r * r)), l = (i / r) * Lx + (j / r) * Ly + nz * Lz;
    if (l < -0.08 && !noche) { R.pset(x, y, c_mez(R.pget(x, y), rp[0], l > -0.2 ? 0.7 : 0.5)); continue; }
    let v = 0.6 + l * 3;
    // cráteres y mares: manchas redondas de ruido en celdas
    const cs = Math.max(3, r / 3), ci = Math.floor((i + 40) / cs), cj = Math.floor((j + 40) / cs), ox = (h(ci, cj, k) - 0.5) * cs * 0.6, oy = (h(ci, cj, k + 1) - 0.5) * cs * 0.6;
    const dc = Math.hypot(i + 40 - (ci + 0.5) * cs - ox, j + 40 - (cj + 0.5) * cs - oy), rc = cs * (0.18 + 0.3 * h(ci, cj, k + 2));
    if (h(ci, cj, k + 3) < 0.6) { if (dc < rc) v -= 0.9; else if (dc < rc + 1 && i * Lx + j * Ly < (ci + 0.5) * cs - 40) v += 0.5; }
    if (R.vnoise(i * 0.16 + k, j * 0.16) > 0.6) v -= 0.5;
    R.pset(x, y, c_tono(rp, Math.max(noche ? 0 : 0.2, v), x, y));
  }
}

// ¿está (x, y) en una zona tranquila (la barra del año o la esquina de Atom)?
const c_tranquila = (x, y) => (y < 22 && x < 178) || (x > 270 && y < 50);

// lo mismo, de 0 a 1 y con el borde difuminado (para que los fondos no dejen ver un rectángulo)
const c_calma = (x, y) => Math.max(0, 1 - Math.hypot(Math.max(0, x - 176), Math.max(0, y - 20)) / 16, 1 - Math.hypot(Math.max(0, 274 - x), Math.max(0, y - 46)) / 16);

// el cielo del planeta, fijo: degradado tramado de ocho tonos con bandas de polvo, el resplandor del sol, una franja
// lechosa y las estrellas (devuelve su lista, para que titilen)
function c_cieloPlaneta(R, P, hor, sol, estrellas) {
  const noche = P.hora === 'noche', dia = P.hora === 'dia';
  for (let y = 0; y <= hor + 8; y++) for (let x = 0; x < 320; x++) {
    let v = (y / hor) ** (noche ? 1.5 : 1.15) * 7;
    v += (R.vnoise(x * 0.022, y * 0.17 + 5) - 0.5) * 1.5 + (R.vnoise(x * 0.07 + 9, y * 0.3) - 0.5) * 0.6;
    if (!noche) { const ds = Math.hypot(x - sol[0], (y - sol[1]) * 1.7); v += 2.4 * Math.max(0, 1 - ds / (dia ? 60 : 110)); }
    const banda = Math.max(0, 1 - Math.abs((y - 4) - (x - 60) * 0.16 - 10 * R.vnoise(x * 0.02, 3)) / 16) * R.vnoise(x * 0.05 + 2, y * 0.08);
    const q = c_calma(x, y); if (!dia) v += banda * (noche ? 2 : 1) * (1 - 0.7 * q);
    R.pset(x, y, c_tono(P.cielo, Math.min(7, Math.max(0, v)), x, y));
    if (!dia && v < (noche ? 5.4 : 3.4)) { const e = h(x, y, 7);
      if (e < (noche ? 0.016 : 0.008) * (1 - 0.65 * q)) { const br = !q && e < (noche ? 0.004 : 0.0016) ? 2 : e < 0.006 ? 1 : 0; R.pset(x, y, P.estrella[br]); if (br) estrellas.push([x, y, br]); } }
  }
}

// el sol poniéndose (ocaso) o alto (día): disco de tres tonos
function c_sol(R, P, sol) {
  const [x, y, r] = sol; if (P.hora === 'noche') return;
  R.disco(x, y, r + 2, hex('#fce8a0')); R.disco(x, y, r, hex('#fff6cc')); R.disco(x - 1, y - 1, r - 3, hex('#ffffff'));
}

// las mesetas de roca del horizonte, veladas por la bruma: [x, ancho, alto]
function c_mesetas(R, P, hor, lista) {
  const rp = P.roca.map((c) => c_mez(c, P.bruma, 0.55));
  for (const [x0, w, a] of lista) for (let i = 0; i < w; i++) { const u = i / w, t0 = u < 0.12 ? 0.5 : u > 0.85 ? 0.6 : 1, aa = Math.round(a * t0 * (0.85 + 0.15 * h(Math.floor(i / 3), x0)));
    for (let j = 0; j <= aa; j++) { const x = x0 + i, y = hor + 2 - j; R.pset(x, y, c_tono(rp, 2.6 - u * 1.6 + (j === aa ? 0.9 : 0) - ((j % 3) === 0 ? 0.5 : 0), x, y)); } }
}

// el primer término de la cámara general: la cresta ancha donde se plantan los personajes (y ≈ 150), con rizaduras,
// guijarros y, a la derecha, la arista que cae en sombra
function c_primerTermino(R, P) {
  const ar = P.arena;
  for (let x = 0; x < 320; x++) {
    const yc = 150 + Math.round(1.2 * Math.sin(x * 0.021 + 1) + (x < 26 ? (26 - x) * 0.3 : 0) + (x > 300 ? (x - 300) * 0.2 : 0));
    for (let y = yc; y < 180; y++) { const d = y - yc, xr = 232 + d * 2.3 + 5 * Math.sin(d * 0.3);
      const rr = d * 1.25 + 3 * Math.sin(x * 0.085 + d * 0.06) + 1.6 * Math.sin(x * 0.23 + 2);
      let v = ((Math.round(rr) % 5) + 5) % 5 === 0 ? 2.9 : ((Math.round(rr) % 5) + 5) % 5 === 1 ? 4.4 : 3.7;
      v -= d * 0.022; v += (h(x, y, 9) - 0.5) * 0.5;
      if (d === 0) v = 5; else if (d < 3) v = 4.6 - d * 0.2;
      if (x > xr) v = Math.min(v, 0.8 + (x - xr) * 0.022 + (h(x, y, 4) - 0.5) * 0.5); else if (x > xr - 2 && d > 0) v = 5;
      R.pset(x, y, c_tono(ar, v, x, y));
    }
  }
  // un rastro de huellas que sube hasta la cresta (hoyos con el borde claro)
  for (let k = 0; k < 11; k++) { const x = Math.round(22 + k * 7.5 + (k % 2) * 2), y = Math.round(177 - k * 2.4 - (k % 2)); R.rect(x, y, x + 2, y, ar[1]); R.pset(x + 1, y - 1, ar[2]); R.rect(x, y + 1, x + 2, y + 1, ar[5]); }
  // guijarros y piedras medio enterradas, con su sombra a la derecha
  for (let k = 0; k < 16; k++) { const x = Math.round(12 + h(k, 1, 50) * 215), y = Math.round(157 + h(k, 2, 50) * 20), s = h(k, 3, 50) < 0.3 ? 2 : 1;
    R.rect(x, y - s + 1, x + s, y, P.roca[2]); R.pset(x, y - s + 1, P.roca[4]); R.rect(x + s + 1, y, x + s + 2 + s, y, ar[1]); }
}

// la repisa de roca de la cámara 'roca': la cara de arriba (donde se plantan los pies, y 127–136), el canto vivo y el
// cortado que cae hasta abajo, con estratos, grietas, cornisas y arena posada
function c_repisa(R, P) {
  const rp = P.roca, ar = P.arena;
  const borde = (y) => y < 139 ? 198 - (139 - y) * 0.4 : 198 - (y - 139) * 0.62 - 7 * Math.sin((y - 139) * 0.16) - (h(Math.floor(y / 5), 0, 60) - 0.5) * 9;
  const techo = (x) => 127 + Math.round(x * 0.018 + 1.2 * Math.sin(x * 0.07) + (x > 182 ? (x - 182) * 0.35 : 0));
  for (let x = 0; x < 215; x++) { const yt = techo(x), canto = yt + 11 + Math.round(2 * h(Math.floor(x / 9), 0, 61));
    for (let y = yt; y < 180; y++) { if (x > borde(y)) continue; const db = borde(y) - x; let v;
      if (y < canto) {                                                           // la cara de arriba: clara, con losas, juntas y arena en los huecos
        v = 3.5 - (y - yt) * 0.07 + (h(x, y, 62) - 0.5) * 0.7; if (y === yt) v = 4;
        const lx = (x + (y - yt) * 2.4) / 17, ly = (y - yt) / 4; if (lx - Math.floor(lx) < 0.09 || (ly - Math.floor(ly) < 0.26 && h(Math.floor(lx), Math.floor(ly), 63) < 0.6)) v -= 1.5;
        if (R.vnoise(x * 0.09, y * 0.5 + 3) > 0.72) { R.pset(x, y, c_tono(ar, 3.6 + (h(x, y, 3) - 0.5), x, y)); continue; }
      } else {                                                                   // el cortado: columnas de roca con su cara a la luz, estratos y grietas
        const q = (x + (y - yt) * 0.22 + 5 * Math.sin(y * 0.06)) / 15, u = q - Math.floor(q), e = y + Math.floor(x * 0.13 + 2 * Math.sin(x * 0.05));
        v = 2.2 - (y - yt) * 0.014 + (h(x, y, 64) - 0.5) * 0.6 + (u < 0.22 ? 0.9 : u > 0.8 ? -0.9 : 0) + (h(Math.floor(q), 0, 69) - 0.5) * 0.7;
        if (e % 5 === 0) v -= 0.8; else if (e % 5 === 1) v += 0.4;
        if (y === canto || y === canto + 1) v -= 1.1;                            // la sombra bajo el canto
        if (db < 2) v = 3.8; else if (db < 8) v += 0.9 - db * 0.1;               // el filo del cortado, a la luz del ocaso
      }
      R.pset(x, y, c_tono(rp, v, x, y)); } }
}

// velos de polvo alto: tres tonos a tres velocidades, lenticulares, con los bordes tramados
function c_velos(R, t, P, hor, lunas = []) {
  for (let tier = 0; tier < 3; tier++) { const n = 4 + tier, vel = [2.2, 5, 9.5][tier], col = P.velo[tier];
    for (let k = 0; k < n; k++) { const L = 16 + h(k, tier, 20) * (22 + tier * 8), y0 = Math.round(24 + (hor - 36) * ((k + h(k, tier, 21) * 0.7) / n) * (0.55 + tier * 0.22) + tier * 3);
      const cx = ((h(k, tier, 22) * 420 + t * vel) % 420) - 50, g = 1 + (tier > 0 ? 1 : 0);
      for (let j = -g; j <= g; j++) { const l = L * (1 - Math.abs(j) / (g + 1.2)), y = y0 + j, dx = j * 3;
        for (let i = -l; i <= l; i++) { const x = Math.round(cx + i + dx); if (c_tranquila(x, y) || y >= hor - 1 || lunas.some((m) => (x - m[0]) ** 2 + (y - m[1]) ** 2 < (m[2] + 2) ** 2)) continue;
          const borde = Math.abs(i) > l - 5 || Math.abs(j) === g; if (borde ? c_b(x, y) < 0.42 : c_b(x, y) < 0.8) R.pset(x, y, col); } } } }
}

// las estrellas titilan (las brillantes hacen una cruz de vez en cuando)
function c_titilar(R, t, P, estrellas) {
  for (let k = 0; k < estrellas.length; k++) { const [x, y, br] = estrellas[k], f = Math.sin(t * (2 + h(k, 0, 30) * 3) + k * 1.7);
    if (f < -0.55) R.pset(x, y, P.estrella[0]); else if (f > 0.8 && br === 2) { R.pset(x, y, P.estrella[2]); R.pset(x - 1, y, P.estrella[1]); R.pset(x + 1, y, P.estrella[1]); R.pset(x, y - 1, P.estrella[1]); R.pset(x, y + 1, P.estrella[1]); } }
}

// una estrella fugaz cada `cada` segundos, en la franja libre del cielo (entre la barra y Atom)
function c_fugaz(R, t, P, cada, x0, y0) {
  const u = (t % cada) / 0.7; if (u > 1) return; const n = Math.floor(t / cada), x = x0 + h(n, 1, 40) * 50 - u * 46, y = y0 + h(n, 2, 40) * 8 + u * 16;
  for (let i = 0; i < 9; i++) { const px = Math.round(x + i * 1.6), py = Math.round(y - i * 0.55); if (!c_tranquila(px, py)) R.pset(px, py, P.estrella[i < 2 ? 2 : i < 5 ? 1 : 0]); }
}

// un torbellino de polvo: una columna que se abre hacia arriba, culebrea y gira; (x, base) = su pie
function c_torbellino(R, t, P, x, base, alto, k, cols) {
  for (let j = 0; j <= alto; j++) { const w = 1 + j * 0.3, cx = x + Math.sin(j * 0.55 + t * 3.2 + k) * (0.6 + j * 0.14);
    for (let i = -Math.ceil(w); i <= Math.ceil(w); i++) { const giro = Math.sin((i / w) * 1.5 + t * 9 + j * 0.8 + k);
      if (h(i + Math.floor(t * 9) * 5, j, k) < 0.62 - j / alto * 0.25) R.pset(Math.round(cx + i), base - j, giro > 0.2 ? cols[2] : giro > -0.5 ? cols[1] : cols[0]); } }
  for (let i = 0; i < 6; i++) { const a = t * 4 + i * 1.05 + k; R.pset(Math.round(x + Math.cos(a) * (3 + i % 3)), base + 1 - (i % 2), cols[i % 2 ? 2 : 1]); }
}

// la arena que el viento arranca de una cresta: un velo que vuela hacia la derecha y cae
function c_pluma(R, t, P, x, y, fuerza, k, cols) {
  for (let q = 0; q < 22; q++) { const e = (t * (0.55 + h(q, k, 70) * 0.4) + h(q, k, 71)) % 1, px = x - 3 + e * (16 + 14 * fuerza) + h(q, k, 72) * 5, py = y - 1 - Math.sin(e * 2.6) * (2 + 3 * h(q, k, 73)) * fuerza + e * e * 4;
    if (e < 0.85) { R.pset(Math.round(px), Math.round(py), e < 0.4 ? cols[5] : cols[4]); if (e < 0.5 && q % 3 === 0) R.pset(Math.round(px) + 1, Math.round(py), cols[4]); } }
}

// arena que resbala por una cara de avalancha: hilos que bajan en diagonal
function c_resbala(R, t, x, y, largo, k, cols) {
  for (let s = 0; s < 4; s++) { const u = (t * 0.45 + s / 4 + h(s, k, 75) * 0.2) % 1, sx = x + s * 5 + h(s, k, 76) * 3;
    for (let i = 0; i < 4; i++) { const v = u - i * 0.03; if (v < 0) continue; R.pset(Math.round(sx + v * largo * 0.45), Math.round(y + v * largo), i === 0 ? cols[4] : cols[3]); } }
}

// los destellos anaranjados de la arena: cruces pequeñas que se encienden y se apagan, cada una a su ritmo
function c_destellos(R, t, P, n, y0, y1, hor, repisa) {
  for (let k = 0; k < n; k++) { const x = Math.round(6 + h(k, 1, 80) * 308), y = Math.round(y0 + h(k, 2, 80) ** 0.8 * (y1 - y0)), f = Math.sin(t * (1.6 + h(k, 3, 80) * 2.2) + k * 2.1);
    if (f < 0.25 || y <= hor + 2 || (repisa && x < 204 && y > 122)) continue; const g = f > 0.8 ? 2 : f > 0.55 ? 1 : 0;
    R.pset(x, y, P.destello[g]); if (g > 0 && y > hor + 12) { R.pset(x - 1, y, P.destello[g - 1]); R.pset(x + 1, y, P.destello[g - 1]); R.pset(x, y - 1, P.destello[g - 1]); R.pset(x, y + 1, P.destello[0]); }
    if (g === 2 && y > 120) { R.pset(x - 2, y, P.destello[0]); R.pset(x + 2, y, P.destello[0]); R.pset(x, y - 2, P.destello[0]); } }
}

// la loma: la arena se abomba en un lomo larguísimo que avanza hacia la izquierda (algo enorme va por DEBAJO: solo se
// ve arena). De proa a popa: los arcos de presión que se abren en el llano, el caballón de arena que empuja y se
// desmorona hacia delante, el lomo (proa empinada a la luz, rizaduras que siguen su curva, filo claro y una banda de
// brillo debajo, popa en sombra), la cola baja y el surco hundido de la estela entre sus dos labios; más la
// sombra al pie, la arena que rueda por las faldas, las bocanadas de la proa y la polvareda de tres tonos que deja
// detrás. La falda de sotavento va en un tono más hondo que el de cualquier duna y el lomo arroja su sombra en el
// llano, hacia la derecha y hacia abajo (hasta ~0,4 de su altura): es lo que lo despega del fondo. s = 0–1 (cuánto se abomba). Devuelve { x, y, len, alto }: el centro, la línea del llano, el largo del lomo
// (sin la cola) y su altura
function c_loma(R, t, P, x, y, len, alto, s, rampa) {
  const L = Math.round(len * (0.55 + 0.45 * s)), A = alto * s * (1 + 0.07 * Math.sin(t * 1.7)), x0 = Math.round(x - L / 2), x1 = x0 + L, cola = Math.round(L * 0.5);
  const alt = (px) => (px <= x0 ? 0 : px < x1 ? A * c_lomaPerfil((px - x0) / L) : A * 0.2 * Math.max(0, 1 - (px - x1) / cola) ** 1.3);
  const osc = c_mez(rampa[0], P.roca[0], 0.45), osc2 = c_mez(rampa[0], P.roca[0], 0.2);
  const polvo = [c_mez(rampa[2], P.bruma, 0.3), c_mez(rampa[4], P.bruma, 0.25), c_mez(rampa[5], 0xffffffff, 0.35)], ps = (px, py, c) => { if (px >= 0 && px < 320 && py >= 0 && py < 180) R.pset(px, py, c); };
  // la estela: un surco hundido (dos filas oscuras) entre dos labios claros, que culebrea y se deshace a lo lejos
  const n = Math.round(150 * s + 30);
  for (let i = -Math.round(L * 0.5); i < n; i++) { const px = x1 + i, f = 1.15 - i / n, dy = i > 8 && Math.sin(i * 0.13 - t * 1.6) > 0.6 ? 1 : 0;
    if ((i > n * 0.6 && c_b(px, y) > f * 2.4) || c_b(px, y) > s * 1.8) continue;
    if (alt(px) < 1) { ps(px, y - 1 + dy, rampa[5]); ps(px, y + dy, rampa[4]); }
    ps(px, y + 1 + dy, rampa[0]); ps(px, y + 2 + dy, rampa[i > 0 && (i + Math.floor(t * 5)) % 11 < 2 ? 3 : 1]); ps(px, y + 3 + dy, rampa[5]); if (i > 0 && (i + Math.floor(t * 6)) % 7 < 3) ps(px, y + 4 + dy, rampa[4]); }
  // la sombra al pie del lomo: dos filas llenas y una tramada, más anchas hacia la popa
  for (let px = x0 + Math.round(L * 0.05); px < x1; px++) { const u = (px - x0) / L; if (alt(px) < 2) continue; ps(px, y + 1, rampa[0]); if (u > 0.16 && u < 0.8) ps(px + 1, y + 2, rampa[u > 0.3 && u < 0.66 ? 0 : 1]); if (u > 0.3 && u < 0.62 && (px & 1)) ps(px + 2, y + 3, rampa[1]); }
  // la sombra arrojada en el llano: cae hacia la derecha y hacia abajo, más larga cuanto más alto es el lomo, oscura
  // junto al pie y tramada en el borde (es lo que despega la loma de las dunas de detrás)
  for (let px = x0 + Math.round(L * 0.1); px <= x1 + cola; px++) { const a = alt(px); if (a < 2) continue; const nf = Math.round(a * 0.42) + 1;
    for (let r = 1; r <= nf; r++) { const sx = px + Math.round(r * 1.7), sy = y + r; if (r >= nf - 1 && nf > 2 && ((sx + sy) & 1)) continue; ps(sx, sy, r <= nf * 0.5 ? osc : osc2); } }
  // el lomo y su cola: la luz viene de la izquierda; cara clara con rizaduras que siguen su curva, y la popa y la
  // falda de la derecha en sombra, con el terminador en diagonal
  for (let px = x0; px <= x1 + cola; px++) { if (px < 0 || px > 319) continue; const a = alt(px), ai = Math.round(a); if (ai < 1) continue;
    const pend = alt(px + 2) - alt(px - 2), u = (px - x0) / L, li = px - x0;
    for (let j = 0; j <= ai; j++) { const q = j / ai, prof = ai - j, ds = (u - 0.36 - 0.3 * q) * L, raya = (prof + Math.round(Math.sin(li * 0.19))) % 5 === 3 && prof > 2; let v;
      const luzv = (pend > 1.2 ? 3.5 : pend > 0.5 ? 2.9 : 2.4) + q * 1.3 - (j === 0 ? 1.4 : q < 0.2 ? 0.5 : 0) - (raya ? 1 : 0) + (h(li, j, 91) - 0.5) * 0.24, somv = (u > 1 ? 1.5 : 0.5) + (raya ? -0.5 : 0) + (q > 0.8 ? 0.5 : 0);
      v = ds <= 0 ? luzv : ds >= 4 ? somv : luzv + (somv - luzv) * ds / 4;
      if (prof === 0 && ai > 1) v = ds > 2 ? 3 : 5.6; else if (prof === 1 && ai > 3 && ds <= 0) v = 5;
      // la falda de sotavento, bien oscura abajo (sombra propia): tono más hondo que el de cualquier duna
      R.pset(px, y - j, ds >= 4 && u < 1 && prof > 1 && (q < 0.25 || (q < 0.55 && ((px + j) & 1))) ? (q < 0.25 ? osc : osc2) : c_tono(rampa, v, px, y - j)); } }
  // el brillo del lomo: una banda clara tramada que sigue la curva, tres píxeles por debajo del filo de la proa
  for (let px = x0 + 2; px < x0 + L * 0.42; px++) { const a = Math.round(alt(px)); if (a > 7 && ((px + Math.floor(t * 3)) % 9) > 1) { ps(px, y - a + 3, rampa[5]); if (px & 1) ps(px, y - a + 4, rampa[5]); } }
  // regueros de arena que se desmoronan por las dos faldas
  for (let q = 0; q < 34 * s; q++) { const e = (t * (0.7 + h(q, 0, 90) * 0.5) + h(q, 1, 90)) % 1, u = 0.03 + h(q, 2, 90) * 0.94, px = Math.round(x0 + u * L + (u < 0.4 ? -e * 4 : e * 3)), a = alt(px); if (a < 2) continue; const py = Math.round(y - a * (1 - e * 0.85)); ps(px, py, rampa[5]); if (e > 0.15) ps(px + (u < 0.4 ? 1 : -1), py - 1, rampa[u > 0.6 ? 3 : 5]); }
  // el caballón: la arena que la proa empuja y amontona por delante, con el pie en sombra; hierve y se desmorona
  { const B = Math.max(2.5, A * 0.42), an = Math.round(10 + A * 0.6);
    for (let d = -4; d <= an; d++) { const px = x0 + 4 - d, b = Math.round(B * (d < 0 ? 1 + d / 5 : 1 - (d / an) ** 1.5) + 0.7 * Math.sin(t * 7 + d * 1.1) + 0.3);
      for (let j = 0; j <= b; j++) ps(px, y - j, j >= b - 1 ? rampa[5] : j === 0 ? rampa[3] : rampa[4]);
      if (b >= 0) { ps(px, y + 1, rampa[0]); if (d < an - 3) ps(px + 1, y + 2, rampa[1]); } }
    for (let q = 0; q < 18 * s; q++) { const e = (t * 1.4 + h(q, 3, 90)) % 1, ang = 2.2 + h(q, 4, 90) * 1.5; ps(Math.round(x0 - an * 0.4 + Math.cos(ang) * e * 15), Math.round(y - B - Math.sin(ang) * e * 9 + e * e * 9), e < 0.5 ? rampa[5] : rampa[4]); } }
  // los arcos de presión: la arena del llano se arruga por delante en tres ondas que se abren y se apagan
  for (let k = 0; k < 3; k++) { const e = (t * 0.6 + k / 3) % 1, d = 16 + A * 0.7 + e * 30 * s; for (let jj = -2; jj <= 5; jj++) { const px = Math.round(x0 - d + (jj - 1.5) ** 2 * 0.55), py = y + jj; if (c_b(px, py) > 1.25 - e) continue; ps(px, py, rampa[5]); ps(px + 1, py, rampa[1]); if (e < 0.6) { ps(px - 1, py, rampa[5]); ps(px + 2, py, rampa[1]); } } }
  // las bocanadas de polvo de la proa
  for (let k = 0; k < 5; k++) { const e = (t * 0.8 + k / 5) % 1, px = Math.round(x0 + 5 - e * 9 + k * 3), py = Math.round(y - A * 0.4 - 2 - e * (9 + k * 4) * s), rr = 1.8 + e * 4.6; for (let j = -6; j <= 6; j++) for (let i = -7; i <= 7; i++) if (i * i + j * j * 1.6 < rr * rr && c_b(px + i, py + j) < 0.95 - e * 0.8) ps(px + i, py + j, polvo[j < -1 ? 2 : j < 1 ? 1 : 0]); }
  // la polvareda que deja detrás: bocanadas redondas de tres tonos (la luz arriba a la izquierda), con el borde
  // tramado, que suben, se abren, se deshacen y se van con el viento
  for (let k = 0; k < 10; k++) { const e = (t * 0.4 + k / 10) % 1, ux = Math.round(x0 + L * (0.5 + 0.13 * (k % 4))), px = Math.round(ux + e * (40 + k * 3) * s), py = Math.round(y - alt(ux) - 2 - e * (8 + (k % 3) * 3) * s), rr = (2.4 + e * 5.5) * (0.6 + 0.4 * s);
    for (let j = -8; j <= 8; j++) for (let i = -9; i <= 9; i++) { const d2 = (i * i * 0.7 + j * j * 1.1) / (rr * rr); if (d2 < 1 && py + j < y - 1 && c_b(px + i, py + j) < (d2 > 0.7 ? 1.3 : 1.9) - 2 * e) ps(px + i, py + j, polvo[j < -rr * 0.2 ? 2 : j > rr * 0.25 && d2 > 0.5 ? 0 : 1]); } }
  // el polvo que el viento peina del filo hacia atrás
  for (let q = 0; q < 26 * s; q++) { const e = (t * 0.8 + h(q, 5, 90)) % 1, u = 0.12 + h(q, 6, 90) * 0.7, a = alt(Math.round(x0 + u * L)); ps(Math.round(x0 + u * L + e * 18), Math.round(y - a - 1 - Math.sin(e * 3) * 2.5), e < 0.5 ? rampa[5] : rampa[4]); }
  return { x, y, len: L, alto: A };
}
// el llano de la cámara de día: rizaduras del viento (rayas cortas, más largas y separadas cuanto más cerca), manchas de
// arena más tostada, guijarros con su sombra y dos rodadas viejas medio borradas que se pierden hacia el horizonte
function c_llano(R, P, V) {
  const ar = P.arena, [y0, y1] = V.llano;
  for (let y = y0; y < y1; y++) { const f = (y - y0) / (y1 - y0), paso = 2 + Math.round(f * 2);
    for (let x = 0; x < 320; x++) { const m = R.vnoise(x * 0.018 + 40, y * 0.09 + 7);
      if (m > 0.66 && c_b(x, y) < (m - 0.66) * 5) R.pset(x, y, c_mez(ar[3], P.bruma, 0.3 * (1 - f)));
      if ((y - y0) % paso) continue; const n = R.vnoise(x * (0.1 - f * 0.055) + y * 1.7, y * 0.9);
      if (n > 0.6) R.pset(x, y, c_mez(ar[2], P.bruma, 0.3 * (1 - f))); else if (n < 0.32) R.pset(x, y + 1, c_mez(ar[5], P.bruma, 0.25 * (1 - f))); } }
  for (let k = 0; k < 26; k++) { const y = Math.round(y0 + 3 + h(k, 2, 60) ** 0.7 * (y1 - y0 - 6)), x = Math.round(6 + h(k, 1, 60) * 308), g = y > y0 + 16 && h(k, 3, 60) < 0.4 ? 2 : 1;
    R.rect(x, y - g + 1, x + g, y, P.roca[2]); R.pset(x, y - g + 1, P.roca[4]); R.rect(x + g + 1, y, x + g + 1 + g * 2, y, ar[1]); }
  for (const dx of [0, 9]) for (let y = y0 + 2; y < y1 - 2; y++) { const f = (y - y0) / (y1 - y0), x = Math.round(250 - f * 150 + dx * (0.3 + f) + 4 * Math.sin(y * 0.2)); if (h(x, y, 61) < 0.55) { R.pset(x, y, ar[1]); R.pset(x + 1, y, ar[5]); } }
}
// rachas de arena a ras de suelo, por delante de los pies
function c_rachas(R, t, P, y0, y1, n, k) {
  for (let q = 0; q < n; q++) { const v = 26 + h(q, k, 95) * 30, x = ((h(q, k, 96) * 400 + t * v) % 400) - 40, y = Math.round(y0 + h(q, k, 97) * (y1 - y0) + Math.sin(t * 2 + q) * 1), L = 5 + Math.floor(h(q, k, 98) * 8);
    for (let i = 0; i < L; i++) if ((i + q) % 3 !== 2) R.pset(Math.round(x + i), y + (i > L - 3 ? 1 : 0), i < 2 ? P.arena[5] : P.arena[4]); }
}

// el encuadre 'desierto' con sus dos cámaras
function c_desierto(R, t, o, cam) {
  const P = c_HORAS[o.hora] ?? c_HORAS.ocaso, noche = P.hora === 'noche', dia = P.hora === 'dia', V = dia && cam === 'general' ? c_VISTAS.llano : c_VISTAS[cam], hor = V.hor;
  const sol = dia ? V.solDia ?? [56, 40, 7] : V.sol, luz = dia ? [-0.8, -0.5] : noche ? [-0.6, -0.6] : [-0.85, 0.45];
  const rampaDe = (lejos) => P.arena.map((c) => c_mez(c, P.bruma, lejos));
  const ex = c_fijo(R, 'desierto|' + cam + '|' + P.hora, (extra) => {
    extra.estrellas = []; c_cieloPlaneta(R, P, hor, sol, extra.estrellas); c_sol(R, P, sol);
    // la luna grande va en el fondo fijo (la tapan el horizonte y las mesetas); la pequeña deriva y va animada
    c_luna(R, V.lunaG[0], V.lunaG[1], V.lunaG[2], P.lunaG, luz[0], luz[1], 3, noche);
    c_mesetas(R, P, hor, V.mesetas);
    // la bruma del horizonte: una franja tramada
    for (let y = hor - 5; y <= hor + 2; y++) for (let x = 0; x < 320; x++) if (c_b(x, y) < (y - hor + 6) / 12 && R.vnoise(x * 0.05, y) > 0.3) R.pset(x, y, P.bruma);
    extra.picos = [];
    V.capas.forEach((c, n) => {
      c_capaDuna(R, c, rampaDe(c[5]));
      for (const r of V.rocas) if (r[1] > c[0] - c[1] && (n === V.capas.length - 1 || r[1] <= V.capas[n + 1][0] - V.capas[n + 1][1])) c_roca(R, P, ...r);
      // las crestas más altas de las capas con pluma: de ahí vuela la arena
      if (V.plumas.includes(n)) { let mejor = null; for (let x = 8; x < 300; x++) { const g = c_duna(c, x); if (g.p > 0.62 && g.p < 0.7 && g.a > c[1] * 0.7) { if (!mejor || g.y < mejor[1]) mejor = [x, Math.round(g.y), n]; } else if (mejor && g.p < 0.3) { extra.picos.push(mejor); mejor = null; } } if (mejor) extra.picos.push(mejor); }
    });
    if (V.llano) { c_llano(R, P, V); for (const r of V.rocasLlano) c_roca(R, P, ...r); }
    if (cam === 'roca') c_repisa(R, P); else c_primerTermino(R, P);
    extra.estrellas = extra.estrellas.filter(([x, y, br]) => R.pget(x, y) === P.estrella[br] && Math.hypot(x - V.lunaG[0], y - V.lunaG[1]) > V.lunaG[2] + 3);
  });
  // lo animado
  if (!dia) { c_titilar(R, t, P, ex.estrellas); c_fugaz(R, t, P, noche ? 4.5 : 7, 196, 22); }
  // la luna pequeña deriva despacio (se queda en la franja libre, bajo la barra del año)
  const lp = [Math.round(V.lunaP[0] + t * 0.45), V.lunaP[1], V.lunaP[2]];
  c_luna(R, lp[0], lp[1], lp[2], P.lunaP, luz[0], luz[1], 9, noche, hor - 2);
  c_velos(R, t, P, hor, [V.lunaG, lp]);
  const polvo = [c_mez(P.arena[3], P.bruma, 0.4), c_mez(P.arena[4], P.bruma, 0.3), c_mez(P.arena[5], P.bruma, 0.2)];
  for (const [x, y, a, k] of V.torbellinos) c_torbellino(R, t, P, x + Math.round(Math.sin(t * 0.3 + k) * 8 + t * 1.2), y, a, k, polvo);
  for (const [x, y, n] of ex.picos) { const rp = rampaDe(V.capas[n][5]); c_pluma(R, t, P, x, y, 0.7 + 0.3 * Math.sin(t * 0.8 + x), x, rp); if (x < 280) c_resbala(R, t, x + 4, y + 3, V.capas[n][1] * 0.9, x, rp); }
  // la loma que avanza bajo la arena
  let loma = null; const s = Math.max(0, Math.min(1, o.silueta ?? 0));
  if (s > 0.02) { const lx = o.lomaX ?? V.loma.x0 - (t - (o.t0 ?? 0)) * 6; loma = c_loma(R, t, P, Math.round(lx), V.loma.y, V.loma.len * (o.lomaEscala ?? 1), V.loma.alto * (o.lomaEscala ?? 1), s * s * (3 - 2 * s), rampaDe(0.08)); }
  // desde la repisa: hilos de arena que el viento saca por el canto y caen por el cortado
  if (cam === 'roca') for (let q = 0; q < 14; q++) { const e = (t * 0.6 + h(q, 1, 99)) % 1, x = 190 + (q % 3) * 3 + e * 9 + Math.sin(t * 2 + q) * 1.5, y = 137 + e * e * 40; if (e < 0.9) R.pset(Math.round(x), Math.round(y), P.arena[e < 0.4 ? 5 : 4]); }
  c_destellos(R, t, P, Math.round((o.brillo ?? 0.35) * 46), V.brillos[0], V.brillos[1], hor, cam === 'roca');
  return { suelo: V.suelo, hor, sol: dia || !noche ? sol : null, lunaG: V.lunaG, lunaP: lp, loma, punto: cam === 'roca' ? [100, 131] : [160, 150], libre: cam === 'roca' ? [40, 145] : [30, 290] };
}

// un vector de la esfera en coordenadas del planeta (lon, lat en radianes) y su base tangente (para tormentas y manchas)
function c_sitio(lon, lat) {
  const C0 = [Math.cos(lat) * Math.sin(lon), -Math.sin(lat), Math.cos(lat) * Math.cos(lon)], n = Math.hypot(C0[2], C0[0]) || 1;
  const e1 = [C0[2] / n, 0, -C0[0] / n], e2 = [C0[1] * e1[2] - C0[2] * e1[1], C0[2] * e1[0] - C0[0] * e1[2], C0[0] * e1[1] - C0[1] * e1[0]];
  return { c: C0, e1, e2 };
}

const c_TORMENTAS = [[c_sitio(0.1, 0.5), 0.3, 1], [c_sitio(1.5, -0.35), 0.24, -1], [c_sitio(-1.1, -0.1), 0.2, 1], [c_sitio(2.9, 0.3), 0.3, 1], [c_sitio(-2.3, 0.55), 0.22, -1]];

const c_VERDE = c_sitio(0.18, 0.1);

const c_PLANETA = c_rampa('#3a1a26', '#66301f', '#964a20', '#c26c28', '#e09440', '#f2bc6c', '#fbe2a6');

const c_NOCHE_P = c_rampa('#0e0a1e', '#1c1028', '#301832', '#4a2434');

const c_VERDES = c_rampa('#2e5a2c', '#467e36', '#66a244', '#96c860');

// el tono (índice de c_PLANETA con decimales) de un punto de la superficie de arena, en coordenadas del planeta;
// vale para el planeta en órbita y para el globo de arena. Devuelve −1 en los casquetes
function c_arenaEsfera(R, X, Y, Z, t) {
  const lat = Math.asin(-Y), n1 = R.vnoise(X * 2.2 + 10 + Z * 1.3, Y * 2.6 - Z * 1.7), n2 = R.vnoise(X * 6 - Z * 5 + 3, Y * 7 + Z * 4);
  if (Math.abs(lat) > 1.12 + 0.12 * n2) return -1;
  let a = 3.9 + 0.8 * Math.sin(lat * 8 + 3 * n1) + 0.45 * Math.sin(Math.atan2(X, Z) * 34 + lat * 16 + 5 * n2) + (n2 - 0.5) * 0.8;
  const escudo = R.vnoise(X * 1.5 + 7 - Z, Y * 1.9 + 3 + Z * 0.8); if (escudo > 0.6) a -= Math.min(2, (escudo - 0.6) * 14) * (0.8 + 0.4 * n2);
  for (const [S, r, sg] of c_TORMENTAS) { const cs = X * S.c[0] + Y * S.c[1] + Z * S.c[2]; if (cs < 0.9) continue;
    const a1 = X * S.e1[0] + Y * S.e1[1] + Z * S.e1[2], a2 = X * S.e2[0] + Y * S.e2[1] + Z * S.e2[2], dd = Math.hypot(a1, a2); if (dd > r) continue;
    const sp = Math.sin(Math.atan2(a2, a1) * 2 * sg + dd * 26 - t * 1.4); if (dd < 0.03) a = 2.4; else if (sp > 0.1) a = Math.max(a, 5 + sp * (1 - dd / r)); else a += 0.4 * (1 - dd / r); }
  return a;
}

// el planeta desde el espacio
function c_orbita(R, t, o) {
  const cx = 150, cy = 100, r = 58, rot = o.giro ?? (t - (o.t0 ?? 0)) * 0.03, cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(0.3), st = Math.sin(0.3);
  const ex = c_fijo(R, 'orbita', (extra) => {
    extra.estrellas = []; const fondo = c_rampa('#05050f', '#0a0a1c', '#12102c', '#1e1640', '#30204e', '#4a2c58'), nebu = c_rampa('#12102c', '#2a1a48', '#4a2456', '#7a3458', '#a8505a');
    const est = c_rampa('#5a5a88', '#b0b8e0', '#ffffff', '#ffd8a0', '#a0d0ff');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const q = c_calma(x, y), n = R.vnoise(x * 0.018 + 4, y * 0.03) * 0.6 + R.vnoise(x * 0.06, y * 0.07 + 8) * 0.4;
      // la nebulosa: una franja en diagonal, de abajo a la izquierda hacia arriba a la derecha, deshilachada
      const eje = Math.abs((y - 150) + (x - 40) * 0.42) / 46, neb = Math.max(0, 1 - eje) * n * 2.2 * (1 - 0.7 * q), neb2 = Math.max(0, 1 - Math.hypot(x - 286, y - 150) / 60) * R.vnoise(x * 0.05 + 20, y * 0.05) * 1.6;
      let c = c_tono(fondo, 0.4 + n * 2.2 + (y / 180) * 0.8, x, y);
      if (neb > 0.5) c = c_tono(nebu, (neb - 0.5) * 4.2, x, y);
      if (neb2 > 0.45) c = c_tono(c_rampa('#12102c', '#16264a', '#1e4460', '#2e6a78'), (neb2 - 0.45) * 5, x, y);
      R.pset(x, y, c);
      const e = h(x, y, 17); if (e < (0.02 + neb * 0.012) * (1 - 0.7 * q)) { const br = !q && e < 0.003 ? 2 : e < 0.008 ? 1 : 0; R.pset(x, y, br === 2 ? est[2 + Math.floor(h(x, y, 18) * 3)] : est[br]); if (br) extra.estrellas.push([x, y, br]); }
    }
    // cuatro estrellas grandes con sus puntas, lejos de las zonas tranquilas
    for (const [x, y, c] of [[36, 60, 3], [254, 150, 4], [70, 158, 2], [236, 66, 2]]) { R.pset(x, y, est[2]); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { R.pset(x + dx, y + dy, est[c]); R.pset(x + dx * 2, y + dy * 2, est[0]); } }
  });
  c_titilar(R, t, { estrella: c_rampa('#3a3a60', '#b0b8e0', '#ffffff') }, ex.estrellas); c_fugaz(R, t, { estrella: c_rampa('#5a5a88', '#b0b8e0', '#ffffff') }, 5.5, 230, 52);
  // las lunas: delante o detrás del planeta según el punto de su órbita
  const lunas = [[104, 24, 0.2, 0.2, 1.2, 9, c_HORAS.noche.lunaG, 3, -0.14], [80, 14, 0.42, 0.42, 3.6, 4, c_HORAS.ocaso.lunaP, 9, 0.2]].map(([rx, ry, vel, , f0, rr, rp, k, incl]) => { const a = t * vel + f0, dx = Math.cos(a) * rx; return { x: Math.round(cx + dx), y: Math.round(cy + Math.sin(a) * ry + dx * incl), r: rr, rp, k, delante: Math.sin(a) > 0 }; });
  const pintaLuna = (l) => c_luna(R, l.x, l.y, l.r, l.rp, -0.75, -0.4, l.k, true);
  for (const l of lunas) if (!l.delante) pintaLuna(l);
  // la esfera: solo se recorre su disco
  const Lx = -0.6, Ly = -0.36, Lz = 0.71, vd = Math.max(0, Math.min(1, o.verde ?? 0)); let verde = null;
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) {
    const d2 = i * i + j * j, x = cx + i, y = cy + j;
    if (d2 > r * r) { if (d2 < (r + 2.4) * (r + 2.4) && i * Lx + j * Ly > -r * 0.2 && c_b(x, y) < 0.6) R.pset(x, y, d2 < (r + 1.2) * (r + 1.2) ? hex('#f0a860') : hex('#8a4a48')); continue; }
    const nx = i / r, ny = j / r, nz = Math.sqrt(1 - nx * nx - ny * ny), x1 = nx * ct + ny * st, Y = -nx * st + ny * ct, X = x1 * cr + nz * sr, Z = -x1 * sr + nz * cr;
    const l = nx * Lx + ny * Ly + nz * Lz; let a = c_arenaEsfera(R, X, Y, Z, t), c;
    // la mancha verde: crece desde un punto, con el borde deshilachado
    let g = 0; if (vd > 0) { const cs = X * c_VERDE.c[0] + Y * c_VERDE.c[1] + Z * c_VERDE.c[2]; if (cs > 0.6) { const a1 = X * c_VERDE.e1[0] + Y * c_VERDE.e1[1] + Z * c_VERDE.e1[2], a2 = X * c_VERDE.e2[0] + Y * c_VERDE.e2[1] + Z * c_VERDE.e2[2];
      const m1 = R.vnoise(X * 5 + Z * 4 + 11, Y * 5 - Z * 3), m2 = R.vnoise(X * 13 - Z * 9, Y * 13 + Z * 7 + 4), dd = Math.hypot(a1, a2 * 1.2), lim = vd * 0.44 * (0.35 + 0.9 * m1 + 0.35 * m2) + 0.015;
      if (dd < lim) g = 1 + Math.min(1, (lim - dd) / 0.12) + (m2 - 0.5) * 0.5; else if (dd < lim * 1.5 && m2 > 0.74) g = 1.05;                // islotes sueltos alrededor
      if (g && Math.abs(a2 - 0.05 * Math.sin(a1 * 30) + 0.02) < 0.012 && a1 > -lim * 0.8 && a1 < lim * 0.6) g = -1; } }                       // un río
    if (l < 0.04) c = c_tono(c_NOCHE_P, (l + 0.3) * 6 + (g ? 0.4 : 0) + (a > 4.6 ? 0.5 : 0), x, y);
    else { const luzv = Math.min(1, l * 1.5), limbo = nz < 0.3 ? (0.3 - nz) * 2.5 : 0;
      if (g < 0) c = c_MAR[2 + (luzv > 0.7 ? 1 : 0)];
      else if (g) c = c_tono(c_VERDES, (g - 1) * 1.7 + luzv * 1.5 - 0.3, x, y);
      else if (a < 0) c = c_tono(c_rampa('#b8a090', '#e0d0b8', '#fcf4e0'), luzv * 2, x, y);
      else c = c_tono(c_PLANETA, a * (0.38 + 0.62 * luzv) + limbo + (l < 0.16 ? -1.2 * (1 - (l - 0.04) / 0.12) : 0), x, y); }
    R.pset(x, y, c);
  }
  // dónde cae la mancha verde en pantalla (si está en la cara visible)
  { const C0 = c_VERDE.c, x1 = C0[0] * cr - C0[2] * sr, z1 = C0[0] * sr + C0[2] * cr, nx = x1 * ct - C0[1] * st, ny = x1 * st + C0[1] * ct; if (z1 > 0) verde = [Math.round(cx + nx * r), Math.round(cy + ny * r)]; }
  for (const l of lunas) if (l.delante) pintaLuna(l);
  return { centro: [cx, cy], r, lunaG: [lunas[0].x, lunas[0].y, lunas[0].r], lunaP: [lunas[1].x, lunas[1].y, lunas[1].r], verde, libre: [268, 56, 318, 176] };
}

// los continentes del globo de la Tierra, a grandes rasgos: elipses [lon, lat, semieje lon, semieje lat] en grados
const c_TIERRAS = [[-102, 46, 30, 19], [-88, 17, 9, 8], [-60, -12, 15, 21], [-68, -40, 6, 14], [20, 6, 19, 25], [26, -22, 10, 12], [14, 50, 17, 9], [88, 52, 52, 19], [78, 22, 9, 11], [106, 16, 11, 11], [135, -25, 15, 9], [-40, 73, 11, 7], [115, -2, 12, 4]];

const c_MAR = c_rampa('#163260', '#24528c', '#3c7cb8', '#68a8dc', '#a4d4f4'), c_CAMPO = c_rampa('#2c5c30', '#448238', '#6aa446', '#a4c466'), c_SECO = c_rampa('#8a6a3a', '#b89450', '#d8b870');

// el cuarto del globo, fijo: pared empapelada, estantería, notas, lámina, flexo, mesa con sus cosas y la peana
function c_cuartoGlobo(R) {
  const pared = c_rampa('#3e2e2a', '#584030', '#74573a', '#906e46', '#ac8654', '#c8a068'), mad = c_rampa('#2c1a14', '#44281a', '#603a22', '#7c4e2c', '#9a663a', '#b8824c'), papel = c_rampa('#a89878', '#cfc4a8', '#efe6d0', '#fbf6e6');
  const luzEn = (x, y) => Math.max(0, 1 - Math.hypot(x - 226, (y - 100) * 1.25) / 124);
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) {
    const q = c_tranquila(x, y); let v = 1.25 + luzEn(x, y) * 2.9 - (y < 30 ? (30 - y) * 0.02 : 0);
    if (y >= 106) { v = 0.9 + luzEn(x, y) * 2 + ((x % 40) < 2 ? -0.8 : (x % 40) < 4 ? 0.5 : 0) + (y === 106 ? 1 : y === 107 ? -0.6 : y > 124 ? -0.5 : 0) + (h(x >> 1, y, 100) - 0.5) * 0.4 + ((y + (x >> 3)) % 6 === 0 ? -0.3 : 0); R.pset(x, y, c_tono(mad, v + 0.6, x, y)); continue; }
    if (!q) { v += (x % 12) < 6 ? 0.22 : -0.22; if ((x % 12) === 3 && (y % 10) === 4) v += 0.9; if (((x % 12) === 2 || (x % 12) === 4) && (y % 10) === 4) v += 0.4; if ((x % 12) === 9 && (y % 10) === 9) v -= 0.6; }
    else v += (x % 12) < 6 ? 0.08 : -0.08;
    R.pset(x, y, c_tono(pared, v, x, y));
  }
  // la estantería de la izquierda: cuatro baldas de libros (lomos con bandas, sin letras), algunos tumbados, y cachivaches
  const lomos = c_rampa('#7a2c2c', '#2c4a6a', '#3e6a44', '#8a6a2c', '#5a3a6a', '#a05a2c', '#2c5a5a', '#6a6a70', '#b89450', '#44283a');
  R.rect(2, 24, 80, 105, mad[1]); R.rect(2, 24, 80, 25, mad[4]); R.rect(2, 24, 3, 105, mad[3]); R.rect(79, 24, 80, 105, mad[0]);
  for (let b = 0; b < 4; b++) { const y1 = 44 + b * 20, y0 = y1 - 17; R.rect(4, y0, 78, y1, hex('#20120e')); R.rect(4, y1 + 1, 78, y1 + 2, mad[4]); R.rect(4, y1 + 3, 78, y1 + 3, mad[0]);
    let x = 5; while (x < 74) { const w = 2 + Math.floor(h(x, b, 110) * 4), a = 10 + Math.floor(h(x, b, 111) * 6), c = lomos[Math.floor(h(x, b, 112) * lomos.length)], tipo = h(x, b, 113);
      if (tipo < 0.1 && x < 62) { for (let s = 0; s < 3; s++) { const cc = lomos[Math.floor(h(x, s, 114 + b) * lomos.length)]; R.rect(x, y1 - 2 - s * 3, x + 11, y1 - s * 3, cc); R.rect(x + 2, y1 - 1 - s * 3, x + 3, y1 - 1 - s * 3, c_mez(cc, 0xffffffff, 0.5)); R.rect(x, y1 - 2 - s * 3, x + 11, y1 - 2 - s * 3, c_mez(cc, 0xffffffff, 0.2)); } x += 13; continue; }
      if (tipo > 0.93 && x < 66) { if (b % 2) { R.rect(x + 1, y1 - 4, x + 5, y1, hex('#a0523a')); R.rect(x + 2, y1 - 9, x + 4, y1 - 5, hex('#4a8a44')); R.pset(x + 1, y1 - 7, hex('#4a8a44')); R.pset(x + 5, y1 - 8, hex('#4a8a44')); } else { R.disco(x + 3, y1 - 3, 3, hex('#8a7460')); R.pset(x + 2, y1 - 5, hex('#c0a888')); } x += 8; continue; }
      R.rect(x, y1 - a, x + w, y1, c); R.rect(x, y1 - a, x, y1, c_mez(c, 0xffffffff, 0.28)); R.rect(x + w, y1 - a, x + w, y1, c_mez(c, 0xff000000, 0.35));
      if (w > 2) { R.rect(x + 1, y1 - a + 2, x + w - 1, y1 - a + 2, c_mez(c, hex('#f0d890'), 0.6)); if (h(x, b, 115) < 0.5) R.rect(x + 1, y1 - 3, x + w - 1, y1 - 3, c_mez(c, hex('#f0d890'), 0.6)); }
      x += w + 1; } }
  // notas clavadas en la pared: cuartillas con renglones (rayas) y un croquis de dunas
  for (const [x, y, w, a, tipo] of [[88, 58, 16, 20, 0], [100, 80, 15, 18, 1], [86, 84, 11, 13, 2]]) { R.rect(x + 1, y + 1, x + w + 1, y + a + 1, pared[0]); R.rect(x, y, x + w, y + a, papel[tipo === 1 ? 1 : 2]); R.pset(x + (w >> 1), y + 1, hex('#c03a30'));
    if (tipo === 1) { for (let i = 2; i < w - 1; i++) { R.pset(x + i, y + 9 - Math.round(3 * Math.sin(i * 0.5) ** 2), hex('#b06a2c')); R.pset(x + i, y + 13 - Math.round(2 * Math.sin(i * 0.4 + 1) ** 2), hex('#8a5a3a')); } R.disco(x + w - 4, y + 4, 1, hex('#8a5a3a')); }
    else for (let l = 4; l < a - 1; l += 3) R.rect(x + 2, y + l, x + w - 2 - Math.floor(h(l, x, 116) * 5), y + l, hex('#6a6a7a')); }
  // la lámina de la derecha: un mapa de dunas en curvas de nivel, con su marco
  R.rect(208, 48, 254, 84, mad[1]); R.rect(209, 49, 253, 83, mad[4]); R.rect(211, 51, 251, 81, papel[2]);
  for (let y = 52; y <= 80; y++) for (let x = 212; x <= 250; x++) { const n = R.vnoise(x * 0.11, y * 0.14 + 30) * 6; if (n - Math.floor(n) < 0.16) R.pset(x, y, hex(n > 3.6 ? '#b06a2c' : '#c89a5a')); else if (n > 4.2) R.pset(x, y, hex('#f0d8a0')); }
  R.rect(208, 85, 254, 85, pared[0]);
  // el reloj de pared (la caja y la esfera; el péndulo y las agujas van animados)
  R.rect(89, 30, 107, 52, mad[0]); R.rect(90, 31, 106, 51, mad[3]); R.disco(98, 38, 6, mad[0]); R.disco(98, 38, 5, papel[3]); for (let k = 0; k < 12; k++) R.pset(Math.round(98 + Math.cos(k * 0.5236) * 4), Math.round(38 + Math.sin(k * 0.5236) * 4), hex('#3a2a2a')); R.rect(93, 45, 103, 50, hex('#20120e'));
  // la mesa: tablero de madera con vetas, juntas, el canto de atrás con su brillo y el charco de luz del flexo
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) {
    const lz = Math.max(0, 1 - Math.hypot(x - 232, (y - 150) * 2.2) / 130);
    let v = 2 + lz * 2.4 + 0.5 * Math.sin(y * 1.1 + 5 * R.vnoise(x * 0.016, y * 0.28)) + (h(x >> 2, y, 120) - 0.5) * 0.4;
    if (y === 128) v += 1.4; else if (y === 129) v += 0.6; if (y === 146 || y === 165) v -= 1.3; else if (y === 147 || y === 166) v += 0.4;
    if (R.vnoise(x * 0.05 + 40, y * 0.2) > 0.78) v -= 0.7;
    R.pset(x, y, c_tono(mad, v, x, y));
  }
  // la sombra del globo y su peana sobre la mesa
  for (let y = 136; y <= 148; y++) for (let x = 104; x <= 168; x++) if (((x - 136) / 32) ** 2 + ((y - 142) / 6) ** 2 < 1 && ((x + y) & 1)) R.pset(x, y, mad[0]);
  // la pila de libros del fondo, a la izquierda del globo, con un cuaderno encima
  for (const [x0, y0, w, a, c] of [[84, 131, 36, 7, lomos[1]], [87, 124, 31, 6, lomos[3]], [85, 118, 33, 5, lomos[0]]]) { R.rect(x0, y0, x0 + w, y0 + a, c); R.rect(x0, y0, x0 + w, y0, c_mez(c, 0xffffffff, 0.3)); R.rect(x0 + w - 3, y0 + 1, x0 + w, y0 + a - 1, papel[2]); for (let j = 2; j < a - 1; j += 2) R.rect(x0 + w - 3, y0 + j, x0 + w, y0 + j, papel[0]); R.rect(x0 + 4, y0 + 2, x0 + 5, y0 + a - 2, c_mez(c, hex('#f0d890'), 0.6)); R.rect(x0, y0 + a, x0 + w, y0 + a, c_mez(c, 0xff000000, 0.4)); }
  R.rect(92, 114, 112, 117, papel[1]); R.rect(92, 114, 112, 114, papel[3]); R.linea(96, 113, 110, 111, hex('#c8a030')); R.pset(111, 111, hex('#3a2a2a'));
  // el libro abierto, a la derecha: dos páginas con renglones y un dibujo de dunas, y un lápiz
  R.poligono([[196, 160], [222, 156], [224, 172], [198, 176]], papel[2]); R.poligono([[224, 156], [252, 160], [250, 176], [224, 172]], papel[3]); R.linea(223, 156, 224, 172, papel[0]);
  R.linea(196, 176, 224, 173, mad[0]); R.linea(224, 173, 250, 177, mad[0]); R.linea(197, 177, 224, 174, hex('#7a2c2c')); R.linea(224, 174, 250, 178, hex('#7a2c2c'));
  for (let l = 0; l < 4; l++) { R.linea(200, 163 + l * 3, 219 - (l === 3 ? 7 : 0), 160 + l * 3, hex('#8a8a96')); }
  for (let i = 0; i < 20; i++) { R.pset(228 + i, 163 + Math.round(i * 0.14 - 2.5 * Math.sin(i * 0.45) ** 2), hex('#b06a2c')); R.pset(228 + i, 168 + Math.round(i * 0.14 - 1.5 * Math.sin(i * 0.4 + 2) ** 2), hex('#8a5a3a')); } R.disco(244, 160, 1, hex('#c89a5a'));
  R.linea(228, 171, 244, 173, hex('#8a8a96')); R.linea(258, 170, 276, 163, hex('#d8a030')); R.linea(258, 171, 276, 164, hex('#a87820')); R.pset(257, 171, hex('#3a2a2a')); R.pset(277, 163, hex('#d07070'));
  // cuartillas mecanografiadas (renglones) a la izquierda, delante
  R.poligono([[108, 156], [140, 152], [146, 170], [114, 175]], papel[1]); R.poligono([[104, 154], [136, 151], [141, 169], [109, 173]], papel[3]);
  for (let l = 0; l < 5; l++) R.linea(109 + l, 157 + l * 3, 132 + l - (l === 4 ? 9 : l === 1 ? 4 : 0), 154 + l * 3, hex('#7a7a88'));
  // una taza, a la izquierda (su vapor va animado)
  R.rect(40, 138, 51, 149, hex('#e8e0d0')); R.rect(40, 138, 51, 138, hex('#fbf6e6')); R.rect(41, 139, 50, 139, hex('#4a2c1c')); R.rect(49, 140, 51, 149, hex('#b8ac98')); R.rect(52, 141, 54, 141, hex('#e8e0d0')); R.rect(54, 142, 54, 146, hex('#e8e0d0')); R.rect(52, 147, 54, 147, hex('#b8ac98')); R.rect(41, 143, 48, 144, hex('#c05a3a')); R.rect(39, 150, 53, 150, mad[0]);
  // un sobre con su sello y una goma de borrar, planos sobre la mesa, donde antes pisaba el flexo
  R.linea(265, 143, 292, 141, mad[0]); R.poligono([[262, 135], [289, 133], [292, 140], [265, 142]], papel[2]); R.linea(262, 135, 289, 133, papel[3]); R.linea(263, 136, 277, 139, papel[0]); R.linea(288, 134, 277, 139, papel[0]); R.rect(284, 135, 287, 137, hex('#c03a30')); R.pset(285, 136, hex('#f0d890')); R.linea(268, 140, 276, 139, hex('#8a8a96'));
  R.rect(300, 137, 307, 139, hex('#d07070')); R.rect(300, 137, 307, 137, hex('#f0a0a0')); R.rect(305, 137, 307, 139, hex('#5a7098')); R.rect(301, 140, 308, 140, mad[0]);
  // el flexo de pared: una placa atornillada junto al borde derecho, dos tramos articulados con su muelle y la
  // pantalla alta que mira al globo. Todo queda por encima de y 85: el carril de la mano y la esquina de la mesa, libres
  for (let y = 72; y <= 85; y++) for (let x = 311; x < 320; x++) if (((x + y) & 1) === 0 && (x - 311) + (y - 72) > 4) R.pset(x, y, pared[0]);
  R.rect(314, 69, 319, 83, hex('#2a3a34')); R.rect(314, 69, 314, 83, hex('#5a7a6a')); R.rect(315, 69, 319, 69, hex('#5a7a6a')); R.pset(317, 71, hex('#c8a030')); R.pset(317, 81, hex('#c8a030')); R.rect(315, 75, 318, 77, hex('#1c2a26'));
  R.linea(316, 75, 306, 53, hex('#8a8a80')); R.linea(317, 75, 307, 53, hex('#4a4a48')); for (let i = 0; i < 6; i++) R.pset(313 - Math.round(i * 0.9), 66 - i * 2, hex('#c8c8c0'));
  R.linea(305, 53, 292, 59, hex('#8a8a80')); R.linea(305, 54, 292, 60, hex('#4a4a48')); R.disco(306, 53, 2, hex('#6a4a18')); R.disco(306, 53, 1, hex('#f0d060')); R.disco(316, 76, 1, hex('#c8a030'));
  R.poligono([[287, 55], [295, 62], [279, 78], [264, 64]], hex('#2e5a48')); R.poligono([[287, 55], [264, 64], [267, 67], [289, 57]], hex('#5a9a78')); R.poligono([[295, 62], [279, 78], [278, 75], [292, 61]], hex('#1c3a30')); R.linea(265, 65, 278, 77, hex('#fff0b0')); R.linea(264, 66, 277, 78, hex('#ffd060')); R.disco(291, 59, 2, hex('#c8a030'));
  // la peana del globo: dos discos de madera torneada y el vástago de latón
  for (let y = -5; y <= 5; y++) for (let x = -18; x <= 18; x++) { if ((x / 18) ** 2 + (y / 4.5) ** 2 < 1) R.pset(160 + x, 138 + y, c_tono(mad, 2.4 + x * 0.09 - y * 0.25, x, y)); }
  for (let x = -18; x <= 18; x++) { const yy = Math.round(4.5 * Math.sqrt(1 - (x / 18) ** 2)); R.pset(160 + x, 138 + yy + 1, mad[0]); R.pset(160 + x, 138 - yy, mad[5]); }
  for (let y = -3; y <= 2; y++) for (let x = -10; x <= 10; x++) if ((x / 10) ** 2 + (y / 2.6) ** 2 < 1) R.pset(160 + x, 133 + y, c_tono(mad, 3.2 + x * 0.14, x, y));
  R.rect(158, 121, 162, 132, hex('#a87820')); R.rect(159, 121, 160, 132, hex('#f0d060')); R.rect(162, 121, 162, 132, hex('#6a4a18')); R.rect(156, 128, 164, 129, hex('#c8a030'));
}
// el color de un punto del globo de la Tierra (lon, lat en radianes; nn = ruido del borde de la costa)
function c_tierraEn(lon, lat, nn) {
  const lo = lon * 57.2958, la = lat * 57.2958;
  if (la > 78 - nn * 6 || la < -70 + nn * 6) return 2;                              // hielo
  for (const [l0, a0, sl, sa] of c_TIERRAS) { let dl = lo - l0; if (dl > 180) dl -= 360; else if (dl < -180) dl += 360; if ((dl / sl) ** 2 + ((la - a0) / sa) ** 2 < 0.75 + nn * 0.6) return Math.abs(Math.abs(la) - 24) < 9 && nn > 0.35 ? 3 : 1; }
  return 0;                                                                         // mar
}

// el globo terráqueo de escritorio
function c_globo(R, t, o) {
  const cx = 160, cy = 80, r = 38, ar = Math.max(0, Math.min(1, o.arena ?? 0)), rot = o.giro ?? 0.5 + (t - (o.t0 ?? 0)) * 0.22, cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(0.4), st = Math.sin(0.4);
  c_fijo(R, 'globo', () => c_cuartoGlobo(R));
  // el reloj: péndulo y agujas
  { const a = Math.sin(t * 3.1) * 0.5; R.linea(98, 45, Math.round(98 + Math.sin(a) * 4), 49, hex('#c8a030')); R.pset(Math.round(98 + Math.sin(a) * 4.5), 50, hex('#f0d060')); R.linea(98, 38, 98 + Math.round(Math.sin(t * 0.5) * 3), 38 - Math.round(Math.cos(t * 0.5) * 3), hex('#3a2a2a')); R.linea(98, 38, 100, 37, hex('#3a2a2a')); }
  // el cono de luz del flexo, con motas de polvo que flotan
  for (let q = 0; q < 16; q++) { const u = (h(q, 1, 130) + t * (0.03 + h(q, 2, 130) * 0.04)) % 1, x = 268 - u * 76 + Math.sin(t * 0.8 + q) * 4, y = 76 + u * 22 + (h(q, 3, 130) - 0.4) * 50 * u + Math.sin(t * 1.1 + q * 2) * 2; if (Math.sin(t * 2 + q * 1.3) > -0.3 && !(Math.hypot(x - cx, y - cy) < r + 4)) R.pset(Math.round(x), Math.round(y), hex(q % 3 ? '#f0d8a0' : '#fff4d0')); }
  // el vapor de la taza
  for (let q = 0; q < 9; q++) { const u = (t * 0.35 + q / 9) % 1, x = 45 + Math.sin(u * 5 + q * 2.1 + t) * (1.5 + u * 2.5), y = 136 - u * 16; if (c_b(Math.round(x), Math.round(y)) < 1 - u) { R.pset(Math.round(x), Math.round(y), hex('#d8c8b0')); if (u < 0.4) R.pset(Math.round(x), Math.round(y) - 1, hex('#b8a488')); } }
  // el arco de latón por detrás (la mitad izquierda del meridiano) y los pivotes de los polos
  for (let a = 1.35; a < 5.15; a += 0.012) { const x = cx + Math.cos(a) * (r + 3.4), y = cy + Math.sin(a) * (r + 3.4); R.pset(Math.round(x), Math.round(y), hex('#a87820')); R.pset(Math.round(cx + Math.cos(a) * (r + 4.6)), Math.round(cy + Math.sin(a) * (r + 4.6)), Math.sin(a) < -0.2 ? hex('#f8e088') : hex('#d8a838')); R.pset(Math.round(cx + Math.cos(a) * (r + 2.4)), Math.round(cy + Math.sin(a) * (r + 2.4)), hex('#6a4a18')); }
  // la esfera: Tierra (mar, campos, desiertos, hielo, con su retícula) que la arena va tapando según o.arena
  const Lx = 0.5, Ly = -0.45, Lz = 0.74;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const d2 = i * i + j * j; if (d2 > r * r) continue; const x = cx + i, y = cy + j;
    const nx = i / r, ny = j / r, nz = Math.sqrt(1 - nx * nx - ny * ny), x1 = nx * ct + ny * st, Y = -nx * st + ny * ct, X = x1 * cr + nz * sr, Z = -x1 * sr + nz * cr;
    const l = Math.max(0, nx * Lx + ny * Ly + nz * Lz), luzv = 0.25 + 0.75 * l, lat = Math.asin(-Y), lon = Math.atan2(X, Z), nn = R.vnoise(X * 5 + Z * 3 + 9, Y * 5 - Z * 2);
    const f = 0.72 * R.vnoise(X * 2.4 + 3 + Z * 2, Y * 2.4 - Z + 6) + 0.28 * c_b(x, y), lim = ar * 1.06; let c;
    if (f < lim) { const a = c_arenaEsfera(R, X, Y, Z, 0); c = a < 0 ? c_tono(c_PLANETA, 4.5 + luzv * 1.5, x, y) : c_tono(c_PLANETA, (f > lim - 0.035 && ar < 0.98 ? 6 : a + 0.6) * (0.35 + 0.65 * luzv), x, y); }
    else { const tp = c_tierraEn(lon, lat, nn), ret = Math.abs(((lon * 57.2958 + 360) % 30) - 15) > 15 - 0.9 / Math.max(0.3, Math.cos(lat)) || Math.abs((((lat * 57.2958 + 90) % 30) + 30) % 30 - 15) > 14.1;
      const rp = tp === 0 ? c_MAR : tp === 1 ? c_CAMPO : tp === 3 ? c_SECO : null, base = tp === 0 ? 0.6 + nn * 0.8 : 0.3 + nn * 1.6;
      c = rp ? c_tono(rp, (base + (ret ? -0.7 : 0)) * 0.55 + luzv * (rp.length - 1) * 0.72, x, y) : c_tono(c_rampa('#a8b8c8', '#dce8f0', '#ffffff'), luzv * 2.4, x, y); }
    if (d2 > (r - 1.2) * (r - 1.2)) c = c_mez(c, 0xff000000, 0.45);
    R.pset(x, y, c);
  }
  // el brillo del barniz (la bombilla reflejada) y los pivotes
  R.rect(cx + 14, cy - 22, cx + 17, cy - 20, 0xffffffff); R.pset(cx + 13, cy - 21, 0xffffffff); R.pset(cx + 18, cy - 19, hex('#fff4d0')); R.pset(cx + 20, cy - 16, hex('#fff4d0')); R.pset(cx + 21, cy - 15, hex('#fff4d0'));
  for (const sg of [-1, 1]) { const px = Math.round(cx + sg * st * (r + 2)), py = Math.round(cy - sg * ct * (r + 2)); R.disco(px, py, 2, hex('#6a4a18')); R.disco(px, py, 1, hex('#f0d060')); }
  // la arena que cae del globo y el montoncito que crece en la mesa
  const mx = 128, my = 143;
  if (ar > 0.03) { const an = Math.round(3 + ar * 9), al = 1 + ar * 6;
    for (let i = -an; i <= an; i++) { const a = Math.round(al * (1 - (Math.abs(i) / an) ** 1.3)); for (let j = 0; j <= a; j++) R.pset(mx + i, my - j, c_tono(c_PLANETA, 4 + (i < 0 ? -0.9 : 0.9) + (j === a ? 1 : 0) + (h(i, j, 140) - 0.5), mx + i, my - j)); R.pset(mx + i, my + 1, hex('#2c1a14')); }
    const n = ar < 0.97 ? 16 : 5; for (let q = 0; q < n; q++) { const u = (t * 1.5 + h(q, 1, 141)) % 1, x = mx + (h(q, 2, 141) - 0.5) * 3 + (1 - u) * 4, y0 = cy + Math.sqrt(Math.max(0, r * r - (x - cx) ** 2)) + 1, y = y0 + u * u * (my - al - y0); R.pset(Math.round(x), Math.round(y), c_PLANETA[q % 2 ? 5 : 4]); } }
  return { centro: [cx, cy], r, mesa: 128, base: [160, 138], monton: [mx, my], libre: [205, 86, 319, 132], libreArriba: [182, 0, 268, 46], toque: [177, 41], pila: [102, 114] };
}
// lo de delante del globo: una pila de dos libros con un lápiz abajo a la izquierda y un bote de lápices a la derecha
function c_globoDelante(R, t, o) {
  const papel = c_rampa('#a89878', '#cfc4a8', '#efe6d0');
  for (const [x0, y0, w, a, col] of [[-4, 166, 66, 14, '#2c5a5a'], [2, 154, 58, 12, '#8a3a2c']]) { const c = hex(col); R.rect(x0, y0, x0 + w, y0 + a, c); R.rect(x0, y0, x0 + w, y0 + 1, c_mez(c, 0xffffffff, 0.3)); R.rect(x0 + w - 5, y0 + 2, x0 + w, y0 + a - 2, papel[2]); for (let j = 3; j < a - 2; j += 2) R.rect(x0 + w - 5, y0 + j, x0 + w, y0 + j, papel[0]);
    R.rect(x0 + 10, y0 + 3, x0 + 12, y0 + a - 3, c_mez(c, hex('#f0d890'), 0.6)); R.rect(x0 + 16, y0 + 3, x0 + 17, y0 + a - 3, c_mez(c, hex('#f0d890'), 0.6)); R.rect(x0, y0 + a, x0 + w, y0 + a, c_mez(c, 0xff000000, 0.45));
    for (let x = x0 + 22; x < x0 + w - 8; x += 2) if (h(x, y0, 150) < 0.5) R.pset(x, y0 + (a >> 1), c_mez(c, 0xff000000, 0.3)); }
  // un sol y una duna dorados en el lomo de arriba (pictograma, sin letras)
  R.disco(36, 158, 2, hex('#f0d060')); for (let i = 0; i < 12; i++) R.pset(28 + i, 163 - Math.round(2 * Math.sin(i * 0.5) ** 2), hex('#f0d060'));
  R.linea(8, 152, 44, 150, hex('#d8a030')); R.linea(8, 153, 44, 151, hex('#a87820')); R.pset(45, 150, hex('#3a2a2a')); R.pset(7, 152, hex('#d07070'));
  // el bote de lápices
  R.rect(290, 158, 312, 180, hex('#3a4a6a')); R.rect(290, 158, 292, 180, hex('#5a7098')); R.rect(309, 158, 312, 180, hex('#26324a')); R.rect(290, 158, 312, 159, hex('#7a90b8')); R.rect(292, 166, 308, 167, hex('#c8a030'));
  for (const [x, a, col] of [[294, 14, '#d8a030'], [299, 18, '#c03a30'], [303, 12, '#3e6a44'], [307, 16, '#d8a030']]) { R.rect(x, 158 - a, x + 1, 157, hex(col)); R.pset(x, 157 - a, hex('#e8d0a0')); R.pset(x, 156 - a, hex('#3a2a2a')); }
}

// un fondo fijo se pinta una vez en su búfer (clave por vista) y luego se copia entero en cada fotograma
const d_capas = new Map();

function d_capa(R, clave, dibuja) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_capas.set(clave, b); }
  return b;
}

// mezcla dos colores (a = cuánto del segundo)
function d_mezcla(c, d, a) {
  const m = (s) => Math.round(((c >> s) & 255) * (1 - a) + ((d >> s) & 255) * a);
  return (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0;
}

// trama ordenada de 4 × 4 (0–1), para los degradados
const d_bayer = (x, y) => [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5][(y & 3) * 4 + (x & 3)] / 16;

// madera con veta: un rectángulo de color base con hebras oscuras (s) y claras (l) a lo largo (vertical si v)
function d_veta(R, x0, y0, x1, y1, base, s, l, k = 0, v = false) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const a = v ? y : x, b = v ? x : y, n = h((a + Math.floor(h(0, b, k) * 9)) >> 3, b, k);
    R.pset(x, y, n < 0.17 ? s : n > 0.9 ? l : base);
  }
}

// cifras diminutas de 3 × 5 (números de puerta, años en los lomos, el calendario); devuelve el ancho
const D_CIFRAS = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function d_cifras(R, txt, x, y, c, e = 1) {
  let cx = x;
  for (const ch of String(txt)) { const g = D_CIFRAS[+ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') for (let a = 0; a < e; a++) for (let b = 0; b < e; b++) R.pset(cx + i * e + a, y + j * e + b, c); cx += 4 * e; }
  return cx - x - e;
}

// los símbolos de las puertas (9 × 9, sin letras): pluma, libro, estrella, ancla y búho
const D_SIMBOLOS = [
  ['......##.', '.....###.', '....###..', '...###...', '..####...', '..###....', '.#.#.....', '#........', '.........'],
  ['.........', '###...###', '#..#.#..#', '#...#...#', '#...#...#', '#...#...#', '###.#.###', '...###...', '.........'],
  ['....#....', '....#....', '...###...', '#########', '.#######.', '..#####..', '..##.##..', '.##...##.', '.#.....#.'],
  ['...###...', '...#.#...', '...###...', '....#....', '..#####..', '....#....', '#...#...#', '##..#..##', '.#######.'],
  ['#.......#', '##.....##', '#########', '#.##.##.#', '#.##.##.#', '####.####', '.#######.', '..#####..', '..#.#.#..'],
];

const d_simbolo = (R, k, cx, cy, c) => { const g = D_SIMBOLOS[k % 5]; for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) if (g[j][i] === '#') R.pset(cx - 4 + i, cy - 4 + j, c); };

// una nube de tres tonos (luz arriba, cuerpo y sombra abajo); respeta el recorte
function d_nube(R, cx, cy, w, tonos) {
  const [l, m, s] = tonos;
  for (const [dx, dy, r] of [[-w * 0.5, 1, w * 0.3], [0, 0, w * 0.42], [w * 0.5, 1, w * 0.32], [w * 0.2, -w * 0.16, w * 0.3]]) R.disco(cx + dx, cy + dy + 1.4, r, s);
  for (const [dx, dy, r] of [[-w * 0.5, 1, w * 0.3], [0, 0, w * 0.42], [w * 0.5, 1, w * 0.32], [w * 0.2, -w * 0.16, w * 0.3]]) R.disco(cx + dx, cy + dy, r, m);
  for (const [dx, dy, r] of [[-w * 0.4, 0, w * 0.18], [0.05 * w, -w * 0.14, w * 0.26], [w * 0.3, -w * 0.26, w * 0.16]]) R.disco(cx + dx, cy + dy - 1, r, l);
}

// una paloma lejana que aletea (3 px); respeta el recorte
const d_paloma = (R, x, y, t, k, c) => { const a = Math.sin(t * 11 + k * 2.3) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); };

// una torre de manuscritos: tacos de folios (cada uno de 4 px) algo descolocados, con su cordel rojo; base en (x, y)
function d_torre(R, x, y, n, w = 20, k = 0) {
  const { rect, pset } = R, P = hex('#efe6d0'), PS = hex('#cfc4a8'), PD = hex('#a89c80');
  for (let i = 0; i < n; i++) {
    const dx = Math.round((h(i, k, 7) - 0.5) * 4), y1 = y - i * 4, x0 = x - (w >> 1) + dx, x1 = x0 + w - 1;
    rect(x0, y1 - 3, x1, y1, C.k); rect(x0 + 1, y1 - 3, x1 - 1, y1 - 1, P); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 2, PS); rect(x1 - 2, y1 - 3, x1 - 1, y1 - 1, PS);
    for (let q = x0 + 2; q < x1 - 2; q += 3) if (h(q, i, k) < 0.5) pset(q, y1 - 1, PD);
    if (h(i, k, 3) < 0.6) rect(x0 + 5 + (i % 3) * 2, y1 - 3, x0 + 5 + (i % 3) * 2, y1 - 1, hex('#c0403a'));
    if (h(i, k, 5) < 0.3) rect(x0 + 1, y1 - 3, x0 + 3, y1 - 1, [hex('#7a9ac0'), hex('#d8b850'), hex('#c87a5a')][i % 3]);
  }
  const yt = y - n * 4; rect(x - (w >> 1) + 2, yt, x + (w >> 1) - 3, yt, hex('#fbf6e6'));
  return yt;
}

// humo o vapor: bocanadas de tres tonos que suben y se abren; respeta el recorte
function d_vapor(R, x, y, t, alto, tonos, k = 0) {
  for (let i = 0; i < 5; i++) { const u = (t * 0.22 + i / 5 + k * 0.13) % 1, px = x + Math.sin(u * 5 + i + k) * 2 + u * 5, py = y - u * alto, r = 1 + u * 3.2;
    if (u > 0.92) continue; R.disco(px, py + 0.8, r, tonos[2]); R.disco(px, py, r - 0.3, tonos[1]); R.disco(px - r * 0.3, py - r * 0.3, r * 0.45, tonos[0]); }
}

// el hilo de vapor de una taza: unos píxeles que suben ondulando
const d_humillo = (R, x, y, t, c) => { for (let i = 0; i < 7; i++) { const u = (t * 0.5 + i / 7) % 1; if (u < 0.85 && (i + Math.floor(t * 3)) % 2) R.pset(Math.round(x + Math.sin(u * 7 + t * 1.5) * 1.6), Math.round(y - u * 10), c); } };

const D_PUERTAS = [100, 146, 192, 238, 284];

// perspectiva del pasillo transversal: de la profundidad s (0 cerca, 1 al fondo) a la fracción en pantalla
const D_R = 22 / 62, d_u = (s) => (1 - 1 / (1 + s * (1 / D_R - 1))) / (1 - D_R);

const d_px = (s) => { const u = d_u(s); return { xl: lerp(6, 24, u), xr: lerp(68, 46, u), yt: lerp(44, 84, u), yb: lerp(139, 113, u), e: 1 - u * (1 - D_R) }; };

function d_pasilloFijo(R) {
  const { rect, pset, poligono, disco, linea } = R;
  const pared = hex('#d6c99c'), paredS = hex('#c8ba8c'), paredL = hex('#e2d6ac'), alto = hex('#cbbd90'), mad = hex('#7a4a2a'), madS = hex('#5a3420'), madL = hex('#96603a'), madD = hex('#3c2216');
  const laton = hex('#d8a848'), latonS = hex('#9a7028'), latonL = hex('#f4d888');
  // el techo y su moldura (tranquilo: encima va la barra del año)
  rect(0, 0, 319, 14, hex('#b8ad88')); for (let x = 0; x < 320; x++) for (let y = 0; y < 15; y++) if (h(x >> 1, y, 3) < 0.08) pset(x, y, hex('#b0a580'));
  rect(0, 15, 319, 15, hex('#8e8462')); rect(0, 16, 319, 17, hex('#e6dcb8')); rect(0, 18, 319, 18, hex('#a89c74'));
  // la pared: friso alto, riel de cuadros y yeso con su grano y sus desconchones
  for (let y = 19; y <= 107; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 11); pset(x, y, y < 46 ? (n < 0.1 ? hex('#c2b486') : alto) : n < 0.07 ? paredS : n > 0.95 ? paredL : (h(x >> 3, y >> 2, 12) < 0.12 && (x + y) % 2 ? paredS : pared)); }
  rect(0, 46, 319, 46, hex('#8e7c54')); rect(0, 47, 319, 47, paredL);
  for (let x = 0; x < 320; x++) for (let y = 48; y <= 51; y++) if ((x + y) % 2) pset(x, y, paredS);   // la sombra del riel
  // el zócalo de madera en cuarterones, con su pasamanos y su rodapié
  d_veta(R, 0, 108, 319, 139, mad, madS, madL, 21);
  rect(0, 107, 319, 107, madD); rect(0, 108, 319, 108, madL); rect(0, 109, 319, 109, madS); rect(0, 135, 319, 135, madD); rect(0, 136, 319, 139, madS); rect(0, 136, 319, 136, hex('#6a3e24'));
  for (let x = 72; x < 320; x += 23) { rect(x, 113, x + 17, 131, madD); d_veta(R, x + 1, 114, x + 16, 130, hex('#86522e'), mad, hex('#a06a40'), 22 + x, true); rect(x + 1, 114, x + 16, 114, madS); rect(x + 16, 114, x + 16, 130, madL); }
  // el suelo de linóleo a cuadros en perspectiva (fuga hacia el centro), con la sombra del zócalo
  const s0 = hex('#d2c9a8'), s0b = hex('#c4ba98'), s1 = hex('#5c7a6a'), s1b = hex('#4e6a5c');
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = y - 122, z = 400 / d, wx = (x - 160) * z / 22, par = (Math.floor(wx / 5 + 100) + Math.floor(z / 2)) & 1, n = h(x, y, 31);
    let c = par ? (n < 0.12 ? s1b : s1) : (n < 0.12 ? s0b : s0);
    if (y < 150) c = d_mezcla(c, hex('#98a48c'), (150 - y) / 11);   // los cuadros del fondo se funden con el aire (sin muaré)
    if (y < 143) c = d_mezcla(c, madD, y === 140 ? 0.55 : 0.25);
    pset(x, y, c);
  }
  // el pasillo transversal en perspectiva (x 6–68): techo, paredes con puertas, suelo y, al fondo, el ascensor
  rect(3, 41, 71, 139, C.k); rect(4, 42, 70, 139, madD); rect(5, 43, 69, 139, madL); rect(6, 44, 68, 139, C.k);
  poligono([[6, 44], [69, 44], [47, 84], [24, 84]], (x, y) => ((y - 44) % 9 === 8 ? hex('#a69a76') : hex('#bdb18a')));
  for (const lado of [0, 1]) {
    const X = (s) => (lado ? d_px(s).xr : d_px(s).xl);
    poligono([[X(0) + lado, 44], [X(1) + lado, 84], [X(1) + lado, 114], [X(0) + lado, 140]], (x, y) => { const u = lado ? (68 - x) / 22 : (x - 6) / 18, yt = lerp(44, 84, u), yb = lerp(139, 113, u), f = (y - yt) / (yb - yt);
      return f > 0.66 ? (f < 0.69 ? madD : lado ? hex('#6a3e26') : hex('#5e3620')) : lado ? hex('#c9bc90') : hex('#b9ac80'); });
    for (const [a, b, k] of [[0.1, 0.28, 0], [0.46, 0.62, 1], [0.8, 0.92, 2]]) { const A = d_px(a), B = d_px(b), xa = lado ? A.xr : A.xl, xb = lado ? B.xr : B.xl, top = (P) => lerp(P.yt, P.yb, 0.4);
      poligono([[xa, top(A)], [xb, top(B)], [xb, B.yb], [xa, A.yb]], madD);
      poligono([[xa + (lado ? -1 : 1), top(A) + 2], [xb, top(B) + 2], [xb, lerp(top(B), B.yb, 0.5)], [xa + (lado ? -1 : 1), lerp(top(A), A.yb, 0.5)]], (k + lado) % 2 ? hex('#e6dcae') : hex('#a8ac9c')); }
  }
  // el suelo del pasillo transversal, con los mismos cuadros
  for (let y = 114; y <= 139; y++) { const u = (139 - y) / 26, xl = lerp(6, 24, u), xr = lerp(68, 46, u), e = 1 - u * (1 - D_R), s = (1 / e - 1) / (1 / D_R - 1);
    for (let x = Math.ceil(xl); x <= Math.floor(xr); x++) { const f = (x - xl) / (xr - xl); pset(x, y, ((Math.floor(s * 9) + Math.floor(f * 4)) & 1) ? s1 : s0); if (f < 0.08 || f > 0.92) pset(x, y, d_mezcla(R.pget(x, y), madD, 0.35)); } }
  // las lámparas del techo que se alejan
  for (const s of [0.12, 0.42, 0.78]) { const P = d_px(s), r = Math.max(1, Math.round(3 * P.e)); rect(37, P.yt, 37, P.yt + r, C.k); disco(37.5, P.yt + r + r, r + 0.4, hex('#fff4c8')); pset(37, P.yt + r + r, C.blanco); }
  // la pared del fondo y el ascensor (las hojas se pintan en cada fotograma)
  rect(24, 84, 46, 113, hex('#b4a67c')); rect(24, 104, 46, 113, hex('#5e3620')); rect(24, 103, 46, 103, madD);
  rect(28, 89, 42, 113, C.k); rect(29, 90, 41, 113, latonS);
  rect(31, 85, 39, 87, C.k); rect(32, 86, 38, 86, hex('#f0e4b8'));
  pset(44, 100, hex('#e8d060')); pset(44, 102, hex('#7a6a40'));
  // el marco del arco, por delante
  rect(4, 42, 70, 43, madL); rect(4, 42, 5, 139, madL); rect(69, 42, 70, 139, mad); rect(3, 41, 71, 41, C.k);
  // cada puerta: marco, montante con su número, hoja con cristal esmerilado, ranura de latón, cuarterón y pomo
  D_PUERTAS.forEach((cx, k) => {
    rect(cx - 15, 81, cx + 15, 139, C.k); rect(cx - 14, 82, cx + 14, 139, madL); rect(cx - 12, 82, cx + 12, 139, madD); rect(cx + 13, 83, cx + 14, 139, mad);
    rect(cx - 11, 84, cx + 11, 91, C.k); rect(cx - 10, 85, cx + 10, 90, hex('#9eb0a8')); for (let x = cx - 10; x <= cx + 10; x++) if (x % 2) pset(x, 85, hex('#b8c8be'));
    d_cifras(R, 12 + k * 2, cx - 3, 85, hex('#2e3a36'));
    d_veta(R, cx - 11, 94, cx + 11, 139, hex('#8a5630'), hex('#6e4226'), hex('#a26c40'), 40 + k, true);
    rect(cx - 11, 94, cx - 11, 139, madL); rect(cx + 11, 94, cx + 11, 139, madS); rect(cx - 11, 93, cx + 11, 93, C.k);
    rect(cx - 9, 96, cx + 9, 114, C.k);
    rect(cx - 8, 127, cx + 8, 136, madS); rect(cx - 7, 128, cx + 7, 135, hex('#7c4c2c')); rect(cx - 7, 128, cx + 7, 128, madD); rect(cx + 7, 128, cx + 7, 135, madL);
    rect(cx - 6, 120, cx + 4, 123, C.k); rect(cx - 5, 121, cx + 3, 122, laton); rect(cx - 5, 121, cx + 3, 121, latonL); rect(cx - 3, 122, cx + 1, 122, hex('#3a2a14'));
    disco(cx + 8.5, 121.5, 1.9, C.k); disco(cx + 8.5, 121.5, 1.2, laton); pset(cx + 8, 121, latonL);
    rect(cx - 13, 138, cx + 13, 139, hex('#4a2c1a')); rect(cx - 9, 137, cx + 9, 137, latonS);   // el umbral con su pletina
  });
  d_pasilloPuertas(R);
  // los apliques (x 169, 215, 261): brazo de latón, tulipa y el halo tramado en la pared
  for (const x of [169, 215, 261]) {
    for (let j = -16; j <= 20; j++) for (let i = -15; i <= 15; i++) { const d = Math.hypot(i, j * 0.8), py = 62 + j; if (py < 48 || py > 106) continue; if (d < 9 || (d < 15 && d_bayer(x + i, py) > (d - 9) / 6)) pset(x + i, py, d < 6 ? hex('#f6ecc0') : paredL); }
    rect(x - 1, 66, x + 1, 72, C.k); rect(x, 67, x, 71, laton); rect(x - 2, 72, x + 2, 73, C.k); pset(x, 72, latonL);
    poligono([[x - 5, 57], [x + 6, 57], [x + 4, 66], [x - 3, 66]], C.k); poligono([[x - 4, 58], [x + 5, 58], [x + 3, 65], [x - 2, 65]], hex('#fff0b8')); rect(x - 3, 58, x - 2, 64, C.blanco); rect(x - 4, 65, x + 4, 65, latonS);
  }
  // los grabados enmarcados entre los apliques (una ciudad, un puente y un velero, en sepia)
  for (const [x, k] of [[146, 0], [192, 1], [238, 2]]) {
    rect(x - 10, 56, x + 10, 72, C.k); rect(x - 9, 57, x + 9, 71, madL); rect(x - 9, 71, x + 9, 71, madS); rect(x - 7, 59, x + 7, 69, hex('#e8dcb8')); rect(x - 8, 73, x + 10, 73, paredS); pset(x, 55, C.k);
    const tin = hex('#7a6444'), tinL = hex('#b8a47c');
    if (k === 0) { for (let i = 0; i < 7; i++) { const a = [5, 8, 4, 9, 6, 3, 7][i]; rect(x - 7 + i * 2, 69 - a, x - 6 + i * 2, 69, i % 2 ? tin : tinL); } }
    else if (k === 1) { rect(x - 7, 66, x + 7, 66, tin); for (let i = -6; i <= 6; i++) pset(x + i, 61 + Math.round(i * i / 9), tin); rect(x - 4, 60, x - 4, 69, tin); rect(x + 4, 60, x + 4, 69, tin); rect(x - 7, 68, x + 7, 69, tinL); }
    else { rect(x - 7, 67, x + 7, 69, tinL); rect(x - 4, 66, x + 4, 66, tin); rect(x, 60, x, 66, tin); for (let i = 0; i < 5; i++) rect(x + 1, 61 + i, x + 1 + (4 - i), 61 + i, tinL); for (let i = 0; i < 4; i++) pset(x - 1 - i, 65 - i * 0 - (3 - i), tin); }
  }
  // el reloj de pared (x 79; las agujas se pintan en cada fotograma) y el paragüero
  disco(79.5, 66.5, 8.4, C.k); disco(79.5, 66.5, 7.4, mad); disco(79.5, 66.5, 6.2, hex('#f4ecd4')); for (let k = 0; k < 12; k++) pset(Math.round(79 + Math.cos(k * Math.PI / 6) * 5.2), Math.round(66 + Math.sin(k * Math.PI / 6) * 5.2), k % 3 ? hex('#a89c80') : C.k);
  rect(75, 122, 83, 139, C.k); rect(76, 123, 82, 138, latonS); rect(76, 123, 77, 138, laton); rect(76, 126, 82, 126, hex('#6a4c18')); rect(76, 134, 82, 134, hex('#6a4c18'));
  linea(78, 122, 76, 108, C.k); linea(79, 122, 77, 108, hex('#2e3a5a')); pset(76, 107, C.k); pset(75, 106, C.k); pset(74, 107, C.k); linea(81, 122, 83, 111, hex('#6a2a2a')); pset(83, 110, madL); pset(84, 110, madL);
  // el buzón de latón con su tubo de cristal desde el techo (x 123)
  rect(121, 19, 125, 95, C.k); rect(122, 19, 124, 95, hex('#c4d4cc')); rect(122, 19, 122, 95, hex('#e4eee8')); for (let y = 30; y < 95; y += 22) rect(121, y, 125, y + 1, latonS);
  rect(116, 95, 130, 124, C.k); rect(117, 96, 129, 123, laton); rect(117, 96, 129, 97, latonL); rect(128, 98, 129, 123, latonS); rect(117, 122, 129, 123, latonS);
  rect(119, 100, 127, 102, C.k); rect(120, 101, 126, 101, hex('#3a2a14'));
  rect(119, 107, 127, 113, latonS); rect(120, 108, 126, 112, hex('#f0e6c8')); linea(120, 108, 123, 110, hex('#a89870')); linea(126, 108, 123, 110, hex('#a89870'));   // el pictograma del sobre
  rect(120, 117, 126, 120, latonS); pset(123, 118, C.k); pset(123, 119, C.k);
  // el surtidor de agua (x 169; las burbujas, en cada fotograma)
  rect(162, 116, 176, 139, C.k); rect(163, 117, 175, 138, hex('#c4ccc8')); rect(163, 117, 164, 138, hex('#e2e8e4')); rect(173, 117, 175, 138, hex('#98a4a0')); rect(163, 124, 175, 124, hex('#8a9692'));
  rect(166, 126, 172, 129, hex('#6a7672')); pset(167, 127, hex('#4a90d0')); pset(171, 127, hex('#d04a4a')); rect(165, 133, 173, 133, hex('#8a9692')); rect(163, 137, 175, 138, hex('#6a7672'));
  rect(164, 96, 174, 116, C.k); rect(165, 97, 173, 115, hex('#a8d0e0')); rect(165, 97, 166, 115, hex('#d4ecf4')); rect(172, 97, 173, 115, hex('#86b4c8')); rect(166, 95, 172, 96, C.k); rect(167, 95, 171, 95, hex('#c4e0ea'));
  rect(177, 120, 180, 126, C.k); rect(178, 121, 179, 125, hex('#f4f0e4'));   // los vasos de papel
  // el ficus en su maceta (x 215; las hojas se mecen en cada fotograma)
  poligono([[209, 127], [222, 127], [220, 139], [211, 139]], C.k); poligono([[210, 128], [221, 128], [219, 138], [212, 138]], hex('#b8623a')); rect(210, 128, 221, 129, hex('#d07c4c')); rect(218, 130, 219, 137, hex('#8e4426'));
  rect(215, 104, 215, 127, hex('#5a4026'));
  // la silla de espera (x 261) con una revista
  rect(253, 112, 255, 139, C.k); rect(254, 113, 254, 138, madL); rect(267, 124, 269, 139, C.k); rect(268, 125, 268, 138, madL);
  rect(253, 112, 258, 124, C.k); rect(254, 113, 257, 123, hex('#7a2e2e')); rect(254, 113, 254, 123, hex('#9a4040'));
  rect(253, 123, 270, 127, C.k); rect(254, 124, 269, 126, hex('#8a3434')); rect(254, 124, 269, 124, hex('#a84a4a'));
  rect(260, 121, 267, 123, C.k); rect(261, 121, 266, 122, hex('#e8dcc0')); pset(262, 121, hex('#c0403a'));
  // la manguera contra incendios tras su cristal (x 302–316)
  rect(301, 84, 317, 106, C.k); rect(302, 85, 316, 105, hex('#a83030')); rect(304, 87, 314, 103, hex('#c8d4cc')); disco(309.5, 95.5, 6, hex('#d8c8a0')); disco(309.5, 95.5, 4, hex('#b8a880')); disco(309.5, 95.5, 2, hex('#8a2a2a'));
  for (let i = 0; i < 6; i++) pset(305 + i, 88 + i, C.blanco);
  rect(306, 112, 312, 126, C.k); rect(307, 113, 311, 125, hex('#c03a3a')); rect(307, 113, 308, 125, hex('#e05a5a')); rect(308, 109, 310, 112, C.k); pset(311, 110, C.k); pset(312, 111, C.k); rect(307, 118, 311, 119, hex('#f0e6c8'));
  d_pasilloMas(R);
  // el brillo de cada aplique en el linóleo
  for (const x of [169, 215, 261]) for (let y = 142; y < 176; y++) for (let i = -3; i <= 3; i++) if ((i + y) % 2 === 0 && h(x + i, y, 5) < 0.75 - (y - 142) / 60) pset(x + i + Math.round((x - 160) * (y - 140) / 90), y, d_mezcla(R.pget(x + i + Math.round((x - 160) * (y - 140) / 90), y), hex('#fff4d0'), 0.45));
}
function d_pasillo(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  R.copiar(d_capa(R, 'pasillo', () => d_pasilloFijo(R)));
  const n = Math.max(0, Math.min(5, Math.round((o.cerradas ?? 0) * 5)));
  // los cristales: encendidos, con la sombra de alguien que pasa por dentro; apagados, los de las puertas cerradas
  D_PUERTAS.forEach((cx, k) => {
    const cerrada = k < n, luz = cerrada ? hex('#6c7478') : hex('#ecdfb0'), luzS = cerrada ? hex('#5e666a') : hex('#d8ca98');
    for (let y = 97; y <= 113; y++) for (let x = cx - 8; x <= cx + 8; x++) pset(x, y, h(x, y, 60 + k) < 0.28 ? luzS : luz);
    if (!cerrada) {
      // la sombra de quien trabaja dentro: va y viene despacio tras el cristal
      const sx = cx + Math.round(Math.sin(t * (0.35 + k * 0.11) + k * 2.1) * 9), som = hex('#b4a67c');
      R.recorte([cx - 8, 97, cx + 8, 113]); disco(sx + 0.5, 103.5, 3.2, som); for (let y = 106; y <= 113; y++) for (let x = sx - 4; x <= sx + 5; x++) if ((x + y) % 2 || y > 108) pset(x, y, som); R.recorte(null);
      for (let i = 0; i < 5; i++) pset(cx - 7 + i, 98 + i * 2, hex('#fbf4d4'));
    }
    d_simbolo(R, k, cx, 104, cerrada ? hex('#3a4044') : hex('#5a4420'));
    rect(cx - 8, 97, cx + 8, 97, cerrada ? hex('#4e5458') : hex('#c4b684'));
    if (cerrada) {
      // el cartelito del «no»: cuelga de su cordel sobre el cristal, con la X roja; el último se balancea
      const b = k === n - 1 ? Math.round(Math.sin(t * 5) * 1.2 * Math.max(0, 1 - ((t * 0.5) % 4) / 2)) : 0, px = cx + b, py = 114;
      linea(cx, 110, px - 4, py, hex('#3a3026')); linea(cx, 110, px + 4, py, hex('#3a3026')); pset(cx, 109, hex('#d8a848'));
      rect(px - 7, py, px + 7, py + 13, C.k); rect(px - 6, py + 1, px + 6, py + 12, hex('#f6f0e0')); rect(px - 6, py + 12, px + 6, py + 12, hex('#cfc4a8'));
      for (let i = 0; i < 9; i++) { for (const d of [0, 1]) { pset(px - 4 + i + d - 1 + 0, py + 2 + i, hex('#d02c2c')); pset(px + 4 - i - d + 1, py + 2 + i, hex('#d02c2c')); } }
    } else if (Math.sin(t * 0.8 + k * 1.9) > 0.92) pset(cx + 1, 122, hex('#f6f0e0'));   // una carta que asoma por la ranura
  });
  // la luz de cada puerta encendida se derrama en el linóleo (late apenas y se apaga con su cartel)
  D_PUERTAS.forEach((cx, k) => { if (k < n) return; const lat = 0.58 + Math.sin(t * 1.1 + k * 1.7) * 0.07;
    for (let y = 140; y <= 157; y++) { const f = (y - 140) / 18, w = 8 + f * 5, dx = (cx - 160) * (y - 140) / 90;
      for (let i = -Math.ceil(w); i <= w; i++) { const x = Math.round(cx + dx + i); if (x >= 0 && x < 320) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff0b8'), lat * (1 - f) * (1 - Math.abs(i) / (w + 1)))); } } });
  // la esquina de un aviso del tablón, que se levanta con la corriente, y la polilla que ronda el aplique del medio
  if (Math.sin(t * 2.7) > 0.2) { pset(107, 67, hex('#c08e54')); pset(106, 67, hex('#8aa4b0')); pset(107, 66, hex('#8aa4b0')); }
  { const a = t * 3.1, mx = Math.round(215 + Math.cos(a) * (7 + Math.sin(t * 0.7) * 3)), my = Math.round(57 + Math.sin(a * 1.3) * 5); pset(mx, my, hex('#5a4a30')); pset(mx + (Math.sin(t * 30) > 0 ? 1 : -1), my - 1, hex('#8a7a58')); }
  // el aplique del medio parpadea de vez en cuando
  if (Math.sin(t * 2.3) > 0.9 && Math.sin(t * 31) > 0) { for (let j = 58; j <= 65; j++) for (let i = 212; i <= 219; i++) if (R.pget(i, j) === hex('#fff0b8')) pset(i, j, hex('#e0c880')); }
  // el reloj: las agujas y el segundero
  { const a = (f, r, c) => linea(79, 66, Math.round(79 + Math.sin(f * Math.PI * 2) * r), Math.round(66 - Math.cos(f * Math.PI * 2) * r), c); a(0.87 + t / 3600, 3, C.k); a(0.3 + t / 600, 4.6, C.k); a(t / 60, 5, hex('#c03030')); pset(79, 66, C.k); }
  // el sobre que cae por el tubo de cristal
  { const u = (t % 6.5) / 1.4; if (u < 1) { const y = Math.round(22 + u * u * 70); rect(122, y, 124, y + 1, hex('#f6f0e0')); pset(123, y + 1, hex('#c0403a')); } }
  // las burbujas del surtidor
  for (let k = 0; k < 4; k++) { const u = (t * (0.5 + k * 0.13) + k * 0.31) % 1, g = Math.floor((t * (0.5 + k * 0.13) + k * 0.31)) % 3; if (g === 0) pset(167 + k + Math.round(Math.sin(u * 9 + k)), Math.round(114 - u * 15), hex('#f0fbff')); }
  rect(165, 98 + Math.round(Math.sin(t * 1.3) * 0.6), 173, 98 + Math.round(Math.sin(t * 1.3) * 0.6), hex('#d4ecf4'));
  // las hojas del ficus, que se mecen con la corriente
  for (let k = 0; k < 9; k++) { const lado = k % 2 ? 1 : -1, y0 = 122 - k * 2.4, m = Math.sin(t * 1.4 + k * 0.9) * 0.8, x1 = 215 + lado * (7 - (k > 6 ? 3 : 0)) + m, y1 = y0 - 6 + Math.abs(m) * 0.5;
    linea(215, Math.round(y0), Math.round(x1), Math.round(y1), hex('#2e6a3a')); disco(x1, y1, 2.3, hex('#2e6a3a')); disco(x1 - lado * 0.6, y1 - 0.6, 1.5, hex('#4a9a52')); pset(Math.round(x1 - lado), Math.round(y1 - 1), hex('#7ac070')); }
  // ── el pasillo transversal: el ascensor, la secretaria y el carrito ──
  R.recorte([6, 44, 68, 139]);
  // el ascensor: las hojas se abren un rato cada 13 s y dentro hay luz; el indicador de aguja barre los pisos
  { const c = t % 13, ab = Math.max(0, Math.min(1, c < 6 ? 0 : c < 7 ? c - 6 : c < 10 ? 1 : c < 11 ? 11 - c : 0)), w = Math.round(ab * 5);
    for (let y = 90; y <= 112; y++) for (let x = 29; x <= 41; x++) { const d = Math.abs(x - 35); pset(x, y, d < w ? (y > 108 ? hex('#8a7a58') : (x + y) % 5 === 0 ? hex('#e8d8a0') : hex('#f4e8b8')) : d === w || d === 6 ? hex('#7a5a20') : (x % 3 === 0 ? hex('#c89a40') : hex('#b08430'))); }
    if (w > 2) { rect(34, 100, 36, 108, hex('#3a4a6a')); disco(35.5, 98.5, 1.6, hex('#f0c090')); pset(35, 97, hex('#4a3020')); pset(36, 97, hex('#4a3020')); }   // el ascensorista
    const g = Math.PI * (0.15 + 0.7 * (0.5 + 0.5 * Math.sin(t * 0.48))); pset(Math.round(35 - Math.cos(g) * 2.4), 86, hex('#c03030')); pset(35, 87, C.k);
    if (ab > 0 && Math.sin(t * 9) > 0) pset(44, 100, C.blanco); }
  // la secretaria: va hacia el fondo y vuelve, con sus papeles; su tamaño sigue la perspectiva
  { const c = (t % 16) / 16, ida = c < 0.5, s = ida ? lerp(0.06, 0.82, c * 2) : lerp(0.82, 0.06, (c - 0.5) * 2), P = d_px(s), e = P.e, H = 13.5 * e, x = lerp(P.xl, P.xr, 0.36) + Math.sin(t * 6) * 0.3 * e, yb = P.yb - 1.5 * e, paso = Math.sin(t * 7) > 0;
    const piel = hex('#f0c8a0'), pelo = hex('#7a4a22'), vest = hex('#2e8a8a'), vestS = hex('#1e6a6e');
    for (const lado of [-1, 1]) { const lev = (lado > 0) === paso ? 0 : e; linea(Math.round(x + lado * e), Math.round(yb - H * 0.3), Math.round(x + lado * e), Math.round(yb - lev), piel); pset(Math.round(x + lado * e), Math.round(yb - lev), C.k); }
    for (let j = 0; j <= H * 0.42; j++) { const w = (0.9 + j / (H * 0.42) * 1.4) * e; for (let i = -w; i <= w; i++) pset(Math.round(x + i), Math.round(yb - H * 0.72 + j), i > w * 0.4 ? vestS : vest); }
    disco(x + 0.5, yb - H * 0.84, 2.3 * e, pelo); disco(x + 0.5 + (ida ? 0 : 0), yb - H * 0.8, 1.7 * e, ida ? pelo : piel); disco(x + 0.5, yb - H * 0.98, 1.5 * e, pelo);
    if (e > 0.5) { rect(Math.round(x + 2 * e), Math.round(yb - H * 0.62), Math.round(x + 2 * e + 2), Math.round(yb - H * 0.62 + 2 * e), hex('#f6f0e0')); if (!ida) pset(Math.round(x), Math.round(yb - H * 0.8), C.k); }
  }
  // el carrito del correo, aparcado cerca (por delante de la secretaria): cesta de alambre con sobres y paquetes
  { const x = 52, y = 137; rect(x - 7, y - 14, x + 8, y - 4, C.k); rect(x - 6, y - 13, x + 7, y - 5, hex('#b8a070')); for (let i = x - 6; i <= x + 7; i += 2) rect(i, y - 13, i, y - 5, hex('#8a744a'));
    rect(x - 6, y - 9, x + 7, y - 9, hex('#6a5632')); rect(x - 5, y - 17, x - 1, y - 14, hex('#f6f0e0')); pset(x - 2, y - 16, hex('#3a6ab0')); rect(x, y - 18, x + 3, y - 14, hex('#e8dcc0')); rect(x + 4, y - 16, x + 7, y - 14, hex('#c89a5a')); pset(x + 5, y - 15, hex('#8a5a2a'));
    rect(x + 8, y - 20, x + 9, y - 6, C.k); rect(x + 7, y - 21, x + 10, y - 20, C.k);
    rect(x - 6, y - 3, x - 6, y - 2, C.k); rect(x + 7, y - 3, x + 7, y - 2, C.k); disco(x - 5.5, y - 0.5, 1.5, C.k); disco(x + 7.5, y - 0.5, 1.5, C.k); pset(x - 6, y - 1, hex('#8a8a96')); pset(x + 7, y - 1, hex('#8a8a96')); }
  R.recorte(null);
  // una mota de polvo a la luz de cada aplique
  for (let k = 0; k < 9; k++) { const x = [169, 215, 261][k % 3] + Math.round(Math.sin(t * 0.5 + k * 2.2) * 9), y = Math.round(52 + ((h(k, 2, 9) * 50 + t * (1.5 + h(k, 3, 9) * 2)) % 50)); if (Math.sin(t * 1.7 + k) > 0.2) pset(x, y, d_mezcla(R.pget(x, y), C.blanco, 0.5)); }
  return { suelo: 154, puertas: D_PUERTAS.map((x, k) => ({ x, y: 139, cartel: [x, 115], ranura: [x - 1, 122], cerrada: k < n })), cerradas: n, ascensor: [35, 113], reloj: [79, 66] };
}
const D_VENTANA_NY = [24, 32, 96, 96];

function d_despachoFijo(R) {
  const { rect, pset, poligono, disco, linea } = R;
  const papel = hex('#4e6e5c'), papelS = hex('#466452'), papelL = hex('#58796a'), caoba = hex('#6a3424'), caobaS = hex('#4c2218'), caobaL = hex('#8a4a30'), caobaD = hex('#34160f');
  const laton = hex('#d8a848'), latonS = hex('#9a7028');
  // el techo y la moldura
  rect(0, 0, 319, 13, hex('#3e4c44')); for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 2) < 0.07) pset(x, y, hex('#384640'));
  rect(0, 14, 319, 14, caobaD); rect(0, 15, 319, 16, caobaL); rect(0, 17, 319, 17, caobaS);
  // el papel pintado verde: listas finas y un rombo pequeño que se repite (tranquilo en la esquina de Atom)
  for (let y = 18; y <= 103; y++) for (let x = 0; x < 320; x++) { const atom = x >= 266 && y <= 50, lista = x % 12 === 0 && (!atom || (y > 38 && y % 2 === 0)), rombo = !atom && (x % 12 === 6) && (y % 10 === 4), n = h(x, y, 4);   // sin dibujo tras Atom
    pset(x, y, lista ? papelS : rombo ? papelL : n < 0.06 ? papelS : n > 0.96 ? papelL : papel); }
  for (let x = 0; x < 320; x++) for (let y = 18; y <= 21; y++) if ((x + y) % 2) pset(x, y, papelS);
  // el zócalo de caoba en cuarterones
  d_veta(R, 0, 104, 319, 139, caoba, caobaS, caobaL, 5);
  rect(0, 104, 319, 104, caobaD); rect(0, 105, 319, 105, caobaL); rect(0, 106, 319, 106, caobaS); rect(0, 135, 319, 139, caobaS); rect(0, 135, 319, 135, caobaD);
  for (let x = 6; x < 320; x += 28) { rect(x, 110, x + 21, 131, caobaD); d_veta(R, x + 1, 111, x + 20, 130, hex('#743a28'), caoba, hex('#96543a'), 6 + x, true); rect(x + 1, 111, x + 20, 111, caobaS); rect(x + 20, 111, x + 20, 130, caobaL); }
  // el suelo: parqué en espiga y la alfombra con su cenefa
  const pq = [hex('#8a5a34'), hex('#7a4c2a'), hex('#9a6a40'), hex('#6c4024')];
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fx = x + (y - 140) * 0, bloque = Math.floor(fx / 12), d = (bloque % 2 ? (x % 12) + (y - 140) : (11 - (x % 12)) + (y - 140)), tab = Math.floor(d / 5), junta = d % 5 === 0 || x % 12 === 0;
    let c = junta ? pq[3] : pq[(tab + bloque * 3) % 3]; if (!junta && h(x, y, 8) < 0.1) c = pq[1]; if (y < 143) c = d_mezcla(c, caobaD, y === 140 ? 0.6 : 0.3); pset(x, y, c); }
  poligono([[40, 148], [282, 148], [296, 177], [26, 177]], C.k);
  poligono([[42, 149], [280, 149], [293, 176], [29, 176]], (x, y) => { const f = (y - 149) / 27, xl = lerp(42, 29, f), xr = lerp(280, 293, f), u = (x - xl) / (xr - xl), b = Math.min(u, 1 - u) * (xr - xl), bv = Math.min(y - 149, 176 - y);
    if (b < 3 || bv < 2) return hex('#d8b870'); if (b < 9 || bv < 5) return ((Math.floor(u * 60) + y) % 4 === 0) ? hex('#d8b870') : hex('#2e3a5a');
    const mx = Math.abs(((u * 12) % 1) - 0.5) + Math.abs((((y - 149) / 9) % 1) - 0.5); return mx < 0.22 ? hex('#d8b870') : mx < 0.4 ? hex('#2e3a5a') : h(x, y, 9) < 0.15 ? hex('#7a1e26') : hex('#8e2a30'); });
  for (let x = 28; x < 296; x += 3) { pset(x - Math.round((x - 160) * 0.01), 178, hex('#e8dcc0')); }   // los flecos
  // ── la ventana (x 24–96, y 32–96): el marco, el alféizar y el radiador; lo de fuera, en cada fotograma ──
  const [vx0, vy0, vx1, vy1] = D_VENTANA_NY;
  rect(vx0 - 5, vy0 - 5, vx1 + 5, vy1 + 4, C.k); rect(vx0 - 4, vy0 - 4, vx1 + 4, vy1 + 3, hex('#e4dcc4')); rect(vx0 - 4, vy0 - 4, vx1 + 4, vy0 - 4, C.blanco); rect(vx1 + 3, vy0 - 3, vx1 + 4, vy1 + 3, hex('#b8ae90')); rect(vx0 - 1, vy0 - 1, vx1 + 1, vy1 + 1, C.k);
  rect(vx0 - 8, vy1 + 4, vx1 + 8, vy1 + 7, C.k); rect(vx0 - 7, vy1 + 5, vx1 + 7, vy1 + 6, hex('#e4dcc4')); rect(vx0 - 7, vy1 + 6, vx1 + 7, vy1 + 6, hex('#b8ae90'));
  for (let x = vx0 - 6; x <= vx1 + 6; x++) for (let y = vy1 + 8; y <= vy1 + 10; y++) if (y <= 103 && (x + y) % 2) pset(x, y, papelS);
  // el radiador de hierro, con sus elementos y su llave
  rect(30, 110, 90, 137, C.k); for (let x = 31; x < 90; x += 6) { rect(x, 111, x + 4, 136, hex('#b8b4a4')); rect(x, 111, x, 136, hex('#d8d4c4')); rect(x + 4, 111, x + 4, 136, hex('#8a8676')); rect(x + 1, 111, x + 3, 112, hex('#d8d4c4')); rect(x + 1, 134, x + 3, 136, hex('#8a8676')); }
  rect(91, 114, 94, 116, C.k); pset(93, 113, latonS); rect(92, 117, 92, 139, C.k); rect(32, 138, 34, 139, C.k); rect(86, 138, 88, 139, C.k);
  // la planta del alféizar
  rect(84, 97, 91, 100, C.k); rect(85, 97, 90, 99, hex('#b8623a'));
  // ── el perchero (x 112) con la gabardina, el sombrero y el paraguas ──
  rect(111, 44, 113, 139, C.k); rect(112, 45, 112, 138, caobaL); linea(105, 139, 119, 139, C.k); linea(107, 138, 117, 138, caobaL); disco(112.5, 43.5, 1.8, C.k);
  for (const d of [-1, 1]) { linea(112, 52, 112 + d * 6, 47, C.k); linea(112, 60, 112 + d * 5, 56, C.k); }
  poligono([[112, 54], [122, 58], [125, 112], [113, 114], [110, 80]], C.k); poligono([[113, 56], [121, 59], [124, 111], [114, 113], [111, 80]], (x, y) => (x > 121 - (112 - y) * 0.02 ? hex('#a08c62') : (x + (y >> 2)) % 6 === 0 ? hex('#b09c70') : hex('#c4b084')));
  rect(116, 78, 121, 79, hex('#8a7650')); pset(118, 70, hex('#6a5a3a')); pset(118, 88, hex('#6a5a3a')); linea(115, 60, 117, 110, hex('#a08c62'));
  rect(99, 44, 111, 46, C.k); rect(101, 40, 109, 44, C.k); rect(100, 45, 110, 45, hex('#5a5048')); rect(102, 41, 108, 43, hex('#6a5e54')); rect(102, 43, 108, 43, hex('#2a2420')); pset(103, 41, hex('#8a7e72'));
  linea(107, 62, 104, 132, C.k); linea(108, 62, 105, 132, hex('#2e3a5a')); pset(104, 133, C.k); pset(107, 60, C.k); pset(108, 59, C.k); pset(109, 60, C.k);
  // ── los diplomas (rayas y sello) y la foto de grupo ──
  for (const [x, y, w, hh, k] of [[130, 34, 24, 19, 0], [158, 34, 24, 19, 1], [136, 60, 34, 22, 2]]) {
    rect(x + 1, y + hh + 1, x + w + 1, y + hh + 2, papelS);
    rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, k === 2 ? caobaL : laton); rect(x + 1, y + hh - 1, x + w - 1, y + hh - 1, k === 2 ? caobaS : latonS);
    rect(x + 3, y + 3, x + w - 3, y + hh - 3, k === 2 ? hex('#c8c0a8') : hex('#f2ead4'));
    if (k < 2) { rect(x + 7, y + 5, x + w - 7, y + 5, hex('#3a3a4a')); for (let j = 0; j < 3; j++) rect(x + 5, y + 8 + j * 2, x + w - 5 - (j === 2 ? 6 : 0), y + 8 + j * 2, hex('#a8a090')); disco(x + w - 6.5, y + hh - 5.5, 1.8, k ? hex('#c03030') : hex('#d8a848')); rect(x + 5, y + hh - 5, x + 10, y + hh - 5, hex('#3a4a8a')); }
    else { rect(x + 4, y + 4, x + w - 4, y + 9, hex('#a8b4bc')); for (let i = 0; i < 6; i++) { const px = x + 6 + i * 4; rect(px, y + 12, px + 2, y + 17, [hex('#3a3a4a'), hex('#5a4a3a'), hex('#4a5a6a')][i % 3]); disco(px + 1.5, y + 10.5, 1.4, hex('#e8c8a0')); } rect(x + 4, y + 18, x + w - 4, y + 18, hex('#8a8270')); }
    pset(x + (w >> 1), y - 1, C.k);
  }
  // el reloj de pared (x 206, y 44): las agujas, en cada fotograma (el grabado de la derecha se pinta aparte: o.sinCuadro)
  disco(206.5, 44.5, 9.4, C.k); disco(206.5, 44.5, 8.4, laton); disco(206.5, 44.5, 7.2, hex('#f4ecd4')); for (let k = 0; k < 12; k++) pset(Math.round(206 + Math.cos(k * Math.PI / 6) * 6), Math.round(44 + Math.sin(k * Math.PI / 6) * 6), k % 3 ? hex('#a89c80') : C.k);
  for (let i = 0; i < 4; i++) pset(202 + i, 55 + (i >> 1), papelS);
  // ── los archivadores (x 240–302, y 76–139), con sus tiradores, etiquetas y un cajón entreabierto ──
  for (let k = 0; k < 3; k++) { const x = 240 + k * 21; rect(x, 76, x + 20, 139, C.k); rect(x + 1, 77, x + 19, 138, hex('#6a7a6c')); rect(x + 1, 77, x + 1, 138, hex('#88988a')); rect(x + 18, 77, x + 19, 138, hex('#4e5c50'));
    for (let j = 0; j < 4; j++) { const y = 78 + j * 15, ab = k === 1 && j === 2; rect(x + 2, y, x + 17, y + 13, hex('#3e4a40')); rect(x + 3 , y + 1, x + 16, y + 12, ab ? hex('#8a9a8c') : hex('#74857a')); rect(x + 3, y + 1, x + 16, y + 1, hex('#96a698')); rect(x + 3, y + 12, x + 16, y + 12, hex('#5a6a5e'));
      rect(x + 6, y + 3, x + 13, y + 6, hex('#3e4a40')); rect(x + 7, y + 4, x + 12, y + 5, hex('#f2ead4')); rect(x + 8, y + 4, x + 10, y + 4, hex('#8a8270')); rect(x + 7, y + 9, x + 12, y + 10, hex('#c8ccc0')); rect(x + 7, y + 10, x + 12, y + 10, hex('#3e4a40'));
      if (ab) { rect(x + 3, y - 1, x + 16, y, hex('#e8dcc0')); pset(x + 6, y - 2, hex('#d8b850')); pset(x + 11, y - 2, hex('#c0403a')); } }
    pset(x + 16, 80, laton); }
  for (let x = 240; x <= 302; x++) for (let y = 73; y <= 75; y++) if ((x + y) % 2) pset(x, y, papelS);
  // encima: dos torres de manuscritos (el ventilador, en cada fotograma) y, en el suelo, más pilas
  d_torre(R, 252, 75, 4, 18, 1); d_torre(R, 291, 75, 2, 18, 2);
  d_torre(R, 310, 139, 5, 16, 3); d_torre(R, 226, 139, 3, 16, 4);
  // la papelera de alambre con bolas de papel
  poligono([[14, 124], [28, 124], [26, 139], [16, 139]], C.k); poligono([[15, 125], [27, 125], [25, 138], [17, 138]], (x, y) => ((x + y) % 3 === 0 || (x - y + 60) % 3 === 0 ? hex('#8a8a80') : hex('#3a3a36')));
  disco(19.5, 123.5, 2.4, hex('#f2ead4')); disco(23.5, 122.5, 2, hex('#e0d6bc')); pset(19, 123, hex('#cfc4a8')); disco(9.5, 137.5, 1.8, hex('#f2ead4')); pset(9, 138, hex('#cfc4a8'));
  // ── el sillón del editor (x 186): respaldo alto de cuero capitoné, por detrás de quien se siente ──
  poligono([[172, 139], [173, 114], [178, 109], [194, 109], [199, 114], [200, 139]], C.k);
  poligono([[173, 139], [174, 115], [178, 110], [194, 110], [198, 115], [199, 139]], (x, y) => (x > 195 ? hex('#3c1c18') : ((x - 174) % 6 === 3 && (y - 110) % 6 === 3) ? hex('#2a100e') : ((x - 174) % 6 === 2 && (y - 110) % 6 === 2) ? hex('#8a4a3a') : hex('#5c2c24')));
  rect(176, 111, 196, 111, hex('#7a4034')); for (let x = 176; x <= 196; x += 4) pset(x, 112, laton);
  d_despachoMas(R);
}
function d_despacho(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  R.copiar(d_capa(R, 'despacho', () => d_despachoFijo(R)));
  const [vx0, vy0, vx1, vy1] = D_VENTANA_NY, W = vx1 - vx0 + 1;
  const rc = (x0, y0, x1, y1, c) => rect(Math.max(vx0, x0), Math.max(vy0, y0), Math.min(vx1, x1), Math.min(vy1, y1), c);
  // el cielo de la tarde, tramado en cuatro tonos
  const cielo = [hex('#7fb0d8'), hex('#9cc4e0'), hex('#bcd8e4'), hex('#dce8dc'), hex('#f0e8cc')];
  for (let y = vy0; y <= vy1; y++) for (let x = vx0; x <= vx1; x++) { const f = (y - vy0) / (vy1 - vy0) * 3.6 + (d_bayer(x, y) - 0.5) * 0.9; pset(x, y, cielo[Math.max(0, Math.min(4, Math.round(f)))]); }
  R.recorte(D_VENTANA_NY);
  // nubes de tres tonos a tres velocidades
  const NUB = [hex('#ffffff'), hex('#e8f0f4'), hex('#b8ccdc')];
  for (let k = 0; k < 4; k++) { const w = [13, 9, 16, 7][k], cx = vx0 - 20 + ((t * [1.6, 2.6, 1.0, 3.4][k] + k * 31) % (W + 40)), cy = vy0 + [9, 18, 26, 6][k]; d_nube(R, cx, cy, w, NUB); }
  // los rascacielos lejanos (siluetas claras) con uno de aguja
  for (let i = 0; i < 12; i++) { const x = vx0 + i * 6 + Math.round(h(i, 1, 70) * 2), top = Math.round(vy0 + 22 + h(i, 2, 70) * 22), c = hex('#9fb4cc');
    rc(x, top, x + 5, vy1, c); rc(x, top, x, vy1, hex('#b4c6d8')); if (h(i, 3, 70) < 0.5) rc(x + 1, top - 3, x + 3, top, c); for (let y = top + 3; y < vy1; y += 3) for (let q = x + 1; q < x + 5; q += 2) if (h(q, y, 71) < 0.5) pset(q, y, hex('#8ea4be')); }
  { const x = vx0 + 47; rc(x, vy0 + 20, x + 8, vy1, hex('#8a9cb8')); rc(x + 1, vy0 + 15, x + 7, vy0 + 20, hex('#8a9cb8')); rc(x + 2, vy0 + 11, x + 6, vy0 + 15, hex('#8a9cb8')); rc(x + 3, vy0 + 8, x + 5, vy0 + 11, hex('#8a9cb8')); rc(x + 4, vy0 + 2, x + 4, vy0 + 8, hex('#7a8ca8')); rc(x, vy0 + 20, x, vy1, hex('#a4b4cc'));
    for (let y = vy0 + 22; y < vy1; y += 2) for (let q = x + 2; q < x + 8; q += 2) pset(q, y, hex('#74869e')); if (Math.sin(t * 3) > 0) pset(x + 4, vy0 + 1, hex('#e04040')); }
  // el término medio: bloques de piedra con sus ventanas; algunas se encienden y se apagan
  for (const [x, w, top, c, cs] of [[vx0 - 2, 18, vy0 + 34, hex('#7c7890'), hex('#62607a')], [vx0 + 30, 16, vy0 + 30, hex('#8a7e88'), hex('#6e6470')], [vx0 + 58, 16, vy0 + 38, hex('#74809a'), hex('#5c6880')]]) {
    rc(x, top, x + w, vy1, c); rc(x + w - 2, top, x + w, vy1, cs); rc(x, top, x + w, top, hex('#a8a4b4')); rc(x + 2, top - 2, x + w - 3, top - 1, cs);
    for (let y = top + 3; y < vy1; y += 4) for (let q = x + 2; q < x + w - 2; q += 3) { const on = h(q, y, 72) < 0.3 && Math.sin(t * 0.4 + q * 1.3 + y) > -0.5; rc(q, y, q, y + 1, on ? hex('#f8e8a0') : hex('#3e3e58')); } }
  // el primer término: el edificio de ladrillo de enfrente con su cornisa, su escalera de incendios y sus depósitos de agua
  { const L = hex('#9a4e3a'), LS = hex('#7a3a2c'), LL = hex('#b86448'), top = vy0 + 44;
    for (let y = top; y <= vy1; y++) for (let x = vx0; x <= vx0 + 44; x++) pset(x, y, (y - top) % 3 === 0 ? LS : ((x + ((y - top) / 3 | 0) * 3) % 6 === 0 ? LS : h(x, y, 73) < 0.12 ? LL : L));
    rc(vx0, top - 2, vx0 + 46, top - 1, hex('#c8b89a')); rc(vx0, top, vx0 + 46, top, hex('#6a2e22'));
    for (const wx of [vx0 + 4, vx0 + 17, vx0 + 30]) { rc(wx, top + 5, wx + 7, top + 16, C.k); rc(wx + 1, top + 6, wx + 6, top + 15, wx === vx0 + 17 ? hex('#f8e8a0') : hex('#3a4a60')); rc(wx + 1, top + 10, wx + 6, top + 10, C.k); rc(wx, top + 17, wx + 7, top + 17, hex('#c8b89a'));
      if (wx === vx0 + 17) { const sx = wx + 2 + Math.round((Math.sin(t * 0.5) + 1) * 1.2); rc(sx, top + 12, sx + 1, top + 15, hex('#6a5a3a')); pset(sx, top + 11, hex('#6a5a3a')); } }
    for (let y = top + 3; y <= vy1; y += 9) { linea(vx0 + 12, y, vx0 + 28, y, C.k); linea(vx0 + 14, y, vx0 + 20, y + 9, hex('#2a2a30')); }
    // los depósitos de agua de madera, sobre sus patas, con su tejadillo
    for (const [dx, s] of [[vx0 + 10, 1], [vx0 + 34, 0]]) { const by = top - 3 - s; for (const p of [-4, 0, 4]) linea(dx + p, by - 6, dx + p, by, C.k); linea(dx - 4, by - 2, dx + 4, by - 5, C.k);
      rc(dx - 6, by - 17, dx + 6, by - 6, C.k); for (let x = dx - 5; x <= dx + 5; x++) for (let y = by - 16; y <= by - 7; y++) pset(x, y, (x - dx + 5) % 3 === 0 ? hex('#5a3a22') : x > dx + 2 ? hex('#6e4a2c') : hex('#8a6038'));
      rc(dx - 5, by - 13, dx + 5, by - 13, hex('#3a2a1a')); rc(dx - 5, by - 9, dx + 5, by - 9, hex('#3a2a1a'));
      for (let j = 0; j < 5; j++) linea(dx - 6 + j, by - 18 - j, dx + 6 - j, by - 18 - j, j === 0 ? C.k : hex('#4a4a56')); pset(dx, by - 23, C.k); }
    // el edificio de la derecha, más bajo, con su chimenea que echa vapor
    const g = hex('#6a6676'); rc(vx0 + 47, vy0 + 52, vx1, vy1, g); rc(vx0 + 47, vy0 + 51, vx1, vy0 + 51, hex('#9a96a6')); for (let y = vy0 + 55; y < vy1; y += 5) for (let x = vx0 + 50; x < vx1 - 1; x += 5) rc(x, y, x + 2, y + 2, h(x, y, 74) < 0.35 ? hex('#f8e8a0') : hex('#3a3a50'));
    rc(vx0 + 62, vy0 + 45, vx0 + 65, vy0 + 51, hex('#4a4652')); rc(vx0 + 61, vy0 + 44, vx0 + 66, vy0 + 44, C.k);
    d_vapor(R, vx0 + 63.5, vy0 + 42, t, 26, [hex('#ffffff'), hex('#e4e8ec'), hex('#c0c8d0')], 1);
    // la antena de televisión y la ropa tendida
    linea(vx0 + 54, vy0 + 51, vx0 + 54, vy0 + 43, C.k); linea(vx0 + 51, vy0 + 44, vx0 + 57, vy0 + 44, C.k); linea(vx0 + 52, vy0 + 46, vx0 + 56, vy0 + 46, C.k);
  }
  // las palomas: tres que cruzan y una posada en la cornisa que picotea
  for (let k = 0; k < 3; k++) d_paloma(R, Math.round(vx0 - 6 + ((t * (9 + k * 3) + k * 37) % (W + 14))), Math.round(vy0 + 14 + k * 7 + Math.sin(t * 1.3 + k) * 3), t, k, hex('#3a3a4a'));
  { const px = vx0 + 40, py = vy0 + 41, pic = Math.sin(t * 2.2) > 0.6 ? 1 : 0; rc(px, py - 1, px + 2, py, hex('#6a6a7a')); pset(px + 3, py - 2 + pic, hex('#6a6a7a')); pset(px - 1, py - 1, hex('#4a4a5a')); }
  R.recorte(null);
  // la persiana (lamas arriba), el cordón que se mece, los junquillos de la guillotina y el reflejo del cristal
  for (let y = vy0; y <= vy0 + 9; y += 2) { rect(vx0, y, vx1, y, hex('#e8e0c8')); rect(vx0, y + 1, vx1, y + 1, hex('#a8a088')); }
  rect(vx0, vy0 + 10, vx1, vy0 + 10, C.k);
  { const m = Math.round(Math.sin(t * 1.1) * 1.3); linea(vx1 - 5, vy0 + 11, vx1 - 5 + m, vy0 + 30, hex('#e8e0c8')); rect(vx1 - 6 + m, vy0 + 30, vx1 - 4 + m, vy0 + 32, hex('#d8a848')); }
  rect(vx0 + 35, vy0 + 11, vx0 + 37, vy1, C.k); rect(vx0 + 36, vy0 + 11, vx0 + 36, vy1, hex('#e4dcc4')); rect(vx0, vy0 + 36, vx1, vy0 + 38, C.k); rect(vx0, vy0 + 37, vx1, vy0 + 37, hex('#e4dcc4'));
  for (const [px, py, n] of [[vx0 + 4, vy0 + 13, 10], [vx0 + 8, vy0 + 13, 6], [vx0 + 42, vy0 + 41, 11], [vx0 + 46, vy0 + 41, 5]]) for (let i = 0; i < n; i++) { const x = px + i, y = py + i * 2; pset(x, y, d_mezcla(R.pget(x, y), C.blanco, 0.4)); }
  // el grabado de la pared de la derecha (x 226–256, y 28–52): un puerto con barcos; o.sinCuadro lo quita para colgar ahí otra cosa
  if (!o.sinCuadro) { const x = 226, y = 28; rect(x + 1, y + 25, x + 31, y + 26, hex('#466452')); rect(x, y, x + 30, y + 24, C.k); rect(x + 1, y + 1, x + 29, y + 23, hex('#8a4a30')); rect(x + 1, y + 23, x + 29, y + 23, hex('#4c2218')); rect(x + 3, y + 3, x + 27, y + 21, hex('#e8dcb8'));
    rect(x + 3, y + 15, x + 27, y + 21, hex('#b8c4bc')); for (let i = 0; i < 6; i++) rect(x + 4 + i * 4, y + 17 + (i % 2) * 2, x + 6 + i * 4, y + 17 + (i % 2) * 2, hex('#e8ece4'));
    for (const [bx, m] of [[x + 9, 8], [x + 20, 6]]) { rect(bx - 4, y + 14, bx + 4, y + 15, hex('#5a4630')); rect(bx, y + 14 - m, bx, y + 14, hex('#5a4630')); for (let i = 0; i < m - 2; i++) rect(bx + 1, y + 15 - m + i, bx + 1 + Math.round(i * 0.6), y + 15 - m + i, hex('#f6f0e0')); }
    disco(x + 23.5, y + 6.5, 1.6, hex('#e8a848')); pset(x + 15, y - 1, C.k); }
  // la planta del alféizar, que se mueve con la corriente del radiador
  for (let k = 0; k < 5; k++) { const m = Math.sin(t * 1.6 + k) * 0.7, x1 = 87.5 + (k - 2) * 2.6 + m, y1 = 91 - (k % 2) * 3; linea(87, 97, Math.round(x1), Math.round(y1), hex('#2e6a3a')); disco(x1, y1, 1.6, hex('#3e8a48')); pset(Math.round(x1), Math.round(y1 - 1), hex('#7ac070')); }
  // el aire caliente del radiador (una trama que sube)
  for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1, x = 36 + k * 9 + Math.round(Math.sin(u * 8 + k) * 1.5), y = Math.round(109 - u * 5); pset(x, y, d_mezcla(R.pget(x, y), C.blanco, 0.25 * (1 - u))); }
  // el reloj: agujas y segundero
  { const a = (f, r, c) => linea(206, 44, Math.round(206 + Math.sin(f * Math.PI * 2) * r), Math.round(44 - Math.cos(f * Math.PI * 2) * r), c); a(0.42 + t / 3600, 3.6, C.k); a(0.1 + t / 600, 5.6, C.k); a(t / 60, 6, hex('#c03030')); pset(206, 44, C.k); }
  // el ventilador de encima de los archivadores: la rejilla, las aspas que giran y la cabeza que oscila
  { const cx = 272 + Math.round(Math.sin(t * 0.7) * 2), cy = 64; rect(270, 72, 276, 75, C.k); rect(271, 73, 275, 74, hex('#4a5a50')); rect(272, 68, 273, 72, C.k);
    disco(cx + 0.5, cy + 0.5, 7.4, C.k); disco(cx + 0.5, cy + 0.5, 6.4, hex('#55685c')); for (let k = 0; k < 3; k++) { const g = t * 14 + k * Math.PI * 2 / 3; linea(cx, cy, Math.round(cx + Math.cos(g) * 5), Math.round(cy + Math.sin(g) * 5), hex('#c8d4cc')); linea(cx, cy, Math.round(cx + Math.cos(g + 0.4) * 5), Math.round(cy + Math.sin(g + 0.4) * 5), hex('#9aaa9e')); }
    for (let k = 0; k < 16; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 8) * 6.6), Math.round(cy + Math.sin(k * Math.PI / 8) * 6.6), hex('#c8ccc0')); disco(cx + 0.5, cy + 0.5, 1.3, hex('#d8a848'));
    // el papel de la torre de al lado, que aletea con el aire
    const al = Math.sin(t * 9) > 0 ? 1 : 0; rect(244, 58 - al, 250, 58 - al, hex('#fbf6e6')); pset(243, 58, hex('#fbf6e6')); }
  // la luz de la ventana en el parqué y la alfombra: un paralelogramo tramado con la sombra de la cruceta, que se
  // atenúa cuando pasa una nube; la aguja del barómetro tiembla y la lámpara de techo late apenas
  { const nube = 0.5 + Math.sin(t * 0.37) * 0.12;
    for (let y = 141; y < 178; y++) { const x0 = Math.round(58 + (y - 141) * 1.15); for (let x = x0; x < x0 + 58; x++) { const u = (x - x0) / 58; if ((x + y) % 2 === 0 && Math.abs(u - 0.5) > 0.035 && Math.abs(y - 158) > 1) pset(x, y, d_mezcla(R.pget(x, y), hex('#ffe8b0'), nube)); } } }
  { const g = -2.2 + Math.sin(t * 0.6) * 0.25 + Math.sin(t * 7) * 0.03; linea(8, 71, Math.round(8 + Math.cos(g) * 3.4), Math.round(71 + Math.sin(g) * 3.4), hex('#2a2a3a')); pset(8, 71, hex('#d8a848')); }
  if (Math.sin(t * 2.9) > 0.55) rect(183, 28, 193, 28, hex('#fff4c8'));
  // motas de polvo en la luz de la ventana
  for (let k = 0; k < 10; k++) { const y = Math.round(100 + ((h(k, 2, 77) * 40 + t * (1.4 + h(k, 3, 77) * 2)) % 40)), x = Math.round(30 + h(k, 1, 77) * 70 + (y - 100) * 0.5 + Math.sin(t * 0.5 + k) * 3); if (Math.sin(t * 1.5 + k * 1.7) > 0.1) pset(x, y, d_mezcla(R.pget(x, y), hex('#f4e8c8'), 0.55)); }
  return { suelo: 160, asiento: [186, 146], mesa: { x0: 122, x1: 250, y: 139 }, libre: [216, 139], telefono: [243, 130], torre: [135, 110], ventana: D_VENTANA_NY, pared: [241, 52], reloj: [206, 44], visita: [86, 160] };
}
// la mesa del editor (x 122–250; tablero en y 139–143 y frente hasta y 170), por delante de quien se siente: nogal con
// veta, cajones con tiradores de latón y el brillo que lo recorre; encima, a la izquierda, la torre alta de manuscritos
// (x 124–146, hasta y 110), la lámpara de latón encendida y la taza que humea; a la derecha del todo, el teléfono negro
// de disco (x 235–251; o.suena: tiembla y salen rayos). La cara de quien se sienta queda en x 176–196 y el tramo
// x 198–234 del tablero queda LIBRE (libre: [216, 139]) para el libro abierto o la carta. Devuelve mesa, libre,
// telefono [x, y] (encima del auricular) y torre [x, y] (lo alto de la torre)
function d_mesaEditor(R, t, o = {}) {
  const { rect, pset, poligono, disco, linea } = R, nog = hex('#5e3620'), nogS = hex('#44251a'), nogL = hex('#7c4c2c'), nogD = hex('#2c160e'), laton = hex('#d8a848'), latonL = hex('#f4d888');
  // la sombra en la alfombra, el tablero y el frente
  for (let x = 118; x <= 254; x++) for (let y = 169; y <= 172; y++) if ((x + y) % 2 === 0) pset(x, y, d_mezcla(R.pget(x, y), nogD, 0.6));
  rect(120, 138, 252, 170, C.k);
  d_veta(R, 121, 139, 251, 142, nogL, nog, hex('#96623a'), 80); rect(121, 139, 251, 139, hex('#a87448')); rect(121, 143, 251, 143, nogD);
  { const b = Math.round(((t * 22) % 300) - 60); for (let x = 124; x <= 248; x++) if (Math.abs(x - 121 - b) < 5 && (x % 2)) pset(x, 140, hex('#c8986a')); }
  d_veta(R, 123, 144, 249, 168, nog, nogS, nogL, 81); rect(121, 144, 122, 169, nogS); rect(250, 144, 251, 169, nogD); rect(123, 144, 249, 144, nogS);
  for (const [x0, x1] of [[125, 160], [212, 247]]) { for (let j = 0; j < 2; j++) { const y = 147 + j * 11; rect(x0, y, x1, y + 9, nogD); d_veta(R, x0 + 1, y + 1, x1 - 1, y + 8, hex('#6a3e24'), nog, hex('#865632'), 82 + j + x0); rect(x0 + 1, y + 1, x1 - 1, y + 1, nogS); rect(x1 - 1, y + 1, x1 - 1, y + 8, nogL);
    const cx = (x0 + x1) >> 1; rect(cx - 4, y + 4, cx + 4, y + 5, C.k); rect(cx - 3, y + 4, cx + 3, y + 4, laton); pset(cx - 3, y + 4, latonL); } }
  rect(163, 147, 209, 166, nogD); d_veta(R, 164, 148, 208, 165, hex('#54301c'), nogS, nog, 85, true); rect(164, 148, 208, 148, nogD); disco(186.5, 156.5, 2.2, C.k); disco(186.5, 156.5, 1.4, laton);
  rect(121, 169, 251, 170, nogD); rect(124, 171, 128, 173, C.k); rect(244, 171, 248, 173, C.k);
  // la torre alta de manuscritos y, a su lado, la lámpara de latón con su luz
  d_torre(R, 135, 138, 7, 22, 11);
  rect(152, 136, 160, 138, C.k); rect(153, 136, 159, 137, laton); rect(155, 124, 156, 136, C.k); pset(156, 130, latonL);
  poligono([[149, 117], [162, 117], [165, 125], [146, 125]], C.k); poligono([[150, 118], [161, 118], [163, 124], [148, 124]], laton); rect(150, 118, 160, 118, latonL); rect(149, 124, 162, 124, hex('#fff4c8'));
  for (let y = 126; y <= 138; y++) for (let x = 143; x <= 168; x++) { const d = Math.abs(x - 155.5) / (4 + (y - 126) * 0.8); if (d < 1 && d_bayer(x, y) < 0.55 - d * 0.3 + Math.sin(t * 2.1) * 0.03) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff0b0'), 0.45)); }
  // el teléfono negro de disco, en la esquina derecha del tablero (el cable cae por el canto)
  { const s = o.suena ? Math.round(Math.sin(t * 40)) : 0, x = 243 + s, y = 138;
    rect(x - 7, y - 4, x + 7, y, C.k); rect(x - 6, y - 3, x + 6, y - 1, hex('#2a2a34')); rect(x - 5, y - 3, x + 4, y - 3, hex('#4a4a58')); disco(x + 0.5, y - 1.5, 2.2, hex('#c8c8d0')); pset(x, y - 2, C.k);
    rect(x - 8, y - 7, x + 8, y - 5, C.k); rect(x - 7, y - 7, x - 5, y - 4, C.k); rect(x + 5, y - 7, x + 7, y - 4, C.k); rect(x - 6, y - 7, x + 6, y - 7, hex('#4a4a58'));
    for (let i = 0; i < 5; i++) pset(251, y - 2 + i * 6, C.k);
    if (o.suena && Math.sin(t * 12) > 0) for (const d of [-1, 1]) for (let i = 0; i < 4; i++) pset(x + d * (11 + (i === 0 || i === 3 ? 0 : 1)), y - 9 + i, hex('#f8e060')); }
  // la taza de café que humea, junto a la lámpara
  rect(170, 134, 175, 138, C.k); rect(171, 135, 174, 137, hex('#f2ead4')); rect(171, 135, 174, 135, hex('#5a3420')); pset(176, 136, C.k); d_humillo(R, 172.5, 132, t, hex('#e8e8e0'));
  return { mesa: { x0: 122, x1: 250, y: 139 }, libre: [216, 139], telefono: [243, 130], torre: [135, 110] };
}

const D_VENTANA_FI = [226, 52, 288, 102];

const D_LOMOS = ['#b83a34', '#2e5a9a', '#3a7a4a', '#d07a30', '#6a7078', '#c8a030', '#2e7a80', '#8a3a5a'];

function d_chiltonFijo(R) {
  const { rect, pset, poligono, disco, linea } = R;
  const pared = hex('#e4dabc'), paredS = hex('#d6cba8'), paredL = hex('#eee6cc'), dado = hex('#8fa6ac'), dadoS = hex('#7a9198'), dadoL = hex('#a8bcc0'), roble = hex('#b08850'), robleS = hex('#8a6638'), robleL = hex('#cca468'), robleD = hex('#5e4424');
  // el techo con su pantalla fluorescente (apagada de contraste) y la moldura
  rect(0, 0, 319, 14, hex('#cfc8ae')); for (let y = 0; y < 15; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 2) < 0.07) pset(x, y, hex('#c6bfa4'));
  rect(186, 6, 262, 11, hex('#b4ad92')); rect(187, 7, 261, 10, hex('#e8e4d0')); for (let x = 190; x < 260; x += 6) rect(x, 7, x, 10, hex('#d0cab4'));
  rect(0, 15, 319, 15, hex('#a8a086')); rect(0, 16, 319, 17, paredL);
  // la pared de yeso crema y el friso azulado con su listón
  for (let y = 18; y <= 97; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 4); pset(x, y, n < 0.06 ? paredS : n > 0.95 ? paredL : (h(x >> 3, y >> 2, 5) < 0.1 && (x + y) % 2 ? paredS : pared)); }
  for (let y = 98; y <= 139; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 6); pset(x, y, x % 8 === 0 ? dadoS : x % 8 === 1 ? dadoL : n < 0.07 ? dadoS : dado); }
  rect(0, 98, 319, 98, hex('#5e747a')); rect(0, 99, 319, 100, hex('#c4d2d4')); rect(0, 101, 319, 101, dadoS); rect(0, 135, 319, 139, hex('#5e747a')); rect(0, 135, 319, 135, hex('#48595e'));
  // el suelo de tablas color miel, con sus juntas, sus nudos y la sombra del zócalo
  const tb = [hex('#c89858'), hex('#bc8c4e'), hex('#d4a666'), hex('#9a7038')];
  for (let y = 140; y < 180; y++) { const fila = Math.floor((y - 140) / (4 + ((y - 140) >> 4))), off = (fila * 37) % 50;
    for (let x = 0; x < 320; x++) { const junta = ((y - 140) % (4 + ((y - 140) >> 4)) === 0) || ((x + off) % 50 === 0), n = h((x + off) >> 3, y, 7); let c = junta ? tb[3] : n < 0.15 ? tb[1] : n > 0.9 ? tb[2] : tb[(fila + Math.floor((x + off) / 50)) % 2 ? 0 : 1];
      if (y < 143) c = d_mezcla(c, hex('#48595e'), y === 140 ? 0.55 : 0.25); pset(x, y, c); } }
  // la luz de la ventana en el suelo (un paralelogramo tramado con la sombra de la cruceta)
  for (let y = 144; y < 178; y++) for (let x = 150; x < 300; x++) { const u = (x - (236 - (y - 144) * 1.3)) / 60; if (u > 0 && u < 1 && Math.abs(u - 0.5) > 0.03 && Math.abs(y - 160) > 1 && (x + y) % 2 === 0) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff4d0'), 0.5)); }
  // ── la estantería de los manuales (x 8–150, y 24–139): cinco baldas y el armario de abajo ──
  rect(7, 23, 151, 139, C.k); rect(8, 24, 150, 139, roble); rect(8, 24, 150, 25, robleL); rect(8, 26, 150, 26, robleS); rect(8, 24, 10, 139, robleL); rect(148, 24, 150, 139, robleS);
  let serie = 0;
  for (let r = 0; r < 5; r++) {
    const y0 = 28 + r * 19, y1 = y0 + 16;
    rect(11, y0 - 1, 147, y1 + 2, robleD); rect(11, y0, 147, y1, hex('#4a3420')); for (let x = 11; x <= 147; x++) for (let y = y0; y <= y0 + 2; y++) if ((x + y) % 2) pset(x, y, hex('#34241a'));
    rect(11, y1 + 1, 147, y1 + 1, robleL); rect(11, y1 + 2, 147, y1 + 2, robleS);
    rect(78, y0, 80, y1, roble); rect(78, y0, 78, y1, robleL); rect(80, y0, 80, y1, robleS);   // el montante central
    for (const [xa, xb] of [[12, 77], [81, 147]]) {
      let x = xa, quedan = 0, col = 0, alto = 14;
      while (x < xb - 2) {
        if (quedan <= 0) { quedan = 3 + Math.floor(h(x, r, 90) * 6); col = hex(D_LOMOS[(serie++ * 3 + r) % D_LOMOS.length]); alto = 12 + Math.floor(h(x, r, 91) * 4); }
        const hueco = h(x, r, 92) < 0.07 && x < xb - 12;
        if (hueco) {
          // un hueco con algo: un engranaje, un coche de juguete o unos manuales tumbados
          const q = Math.floor(h(x, r, 93) * 3);
          if (q === 0) { disco(x + 4.5, y1 - 3.5, 4, hex('#8a8a96')); disco(x + 4.5, y1 - 3.5, 2.6, hex('#b4b4c0')); disco(x + 4.5, y1 - 3.5, 1.2, hex('#4a3420')); for (let k = 0; k < 8; k++) pset(Math.round(x + 4 + Math.cos(k * Math.PI / 4) * 4.4), Math.round(y1 - 4 + Math.sin(k * Math.PI / 4) * 4.4), hex('#8a8a96')); }
          else if (q === 1) { rect(x + 1, y1 - 3, x + 9, y1 - 1, hex('#c03a34')); rect(x + 3, y1 - 5, x + 7, y1 - 4, hex('#c03a34')); pset(x + 4, y1 - 4, hex('#c4e0ea')); pset(x + 6, y1 - 4, hex('#c4e0ea')); pset(x + 2, y1, C.k); pset(x + 8, y1, C.k); }
          else for (let j = 0; j < 3; j++) { rect(x, y1 - 2 - j * 3, x + 9, y1 - j * 3, hex(D_LOMOS[(j * 2 + r) % 8])); rect(x + 1, y1 - 2 - j * 3, x + 3, y1 - j * 3, hex('#f2ead4')); pset(x + 2, y1 - 1 - j * 3, C.k); }
          x += 11; quedan = 0; continue;
        }
        const w = h(x, r, 94) < 0.3 ? 4 : 3, top = y1 - alto + 1;
        rect(x, top, x + w - 1, y1, col); rect(x + w - 1, top, x + w - 1, y1, d_mezcla(col, C.k, 0.4)); rect(x, top, x, y1, d_mezcla(col, C.blanco, 0.22));
        rect(x, top + 2, x + w - 2, top + 4, hex('#f2ead4')); rect(x + 1, top + 6, x + 1, top + 8, d_mezcla(col, C.k, 0.45)); pset(x + 1, top + 5, d_mezcla(col, C.k, 0.45));   // la franja blanca y, debajo, el mango de la llave
        rect(x, y1 - 2, x + w - 2, y1 - 2, hex('#f2ead4'));
        x += w; quedan--;
      }
    }
  }
  // el armario de abajo, con puertas y tiradores, y las etiquetas de latón de las baldas
  rect(11, 123, 147, 137, robleD); for (let k = 0; k < 4; k++) { const x = 12 + k * 34; d_veta(R, x, 124, x + 32, 136, roble, robleS, robleL, 95 + k, true); rect(x, 124, x + 32, 124, robleL); rect(x + 32, 124, x + 32, 136, robleS); rect(x + 3, 127, x + 29, 134, robleS); rect(x + 4, 128, x + 28, 133, hex('#a67e48')); disco(x + (k % 2 ? 5.5 : 27.5), 130.5, 1.4, hex('#d8a848')); }
  rect(8, 138, 150, 139, robleD);
  for (let r = 0; r < 5; r++) for (const x of [40, 110]) { const y = 28 + r * 19 + 17; rect(x, y, x + 6, y + 1, hex('#d8a848')); rect(x + 1, y, x + 5, y, hex('#f2ead4')); }
  // la escalera de biblioteca, apoyada en su riel
  rect(11, 27, 147, 27, hex('#8a8a96'));
  for (const dx of [0, 9]) { linea(22 + dx, 139, 34 + dx, 28, C.k); linea(23 + dx, 139, 35 + dx, 28, hex('#c8a060')); }
  for (let k = 1; k < 9; k++) { const y = 139 - k * 12, x = 22 + (139 - y) * 12 / 111; rect(Math.round(x) + 1, y, Math.round(x) + 9, y, hex('#8a6638')); rect(Math.round(x) + 1, y + 1, Math.round(x) + 9, y + 1, hex('#5e4424')); }
  // ── las dos láminas del coche en despiece (azul de plano, trazos blancos) ──
  for (const [x, k] of [[158, 0], [190, 1]]) {
    const y = 28, w = 28, hh = 30, tinta = hex('#e4eef8'), azul = hex('#2e5688');
    rect(x + 1, y + hh + 1, x + w + 1, y + hh + 2, paredS); rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, hex('#e8e0c8')); rect(x + 2, y + 2, x + w - 2, y + hh - 2, azul);
    for (let j = y + 4; j < y + hh - 2; j += 4) for (let i = x + 4; i < x + w - 2; i += 4) pset(i, j, hex('#4a72a4'));
    if (k === 0) {
      // la carrocería arriba, el bastidor en medio y las cuatro ruedas abajo, unidas por líneas de puntos
      linea(x + 5, y + 10, x + 9, y + 10, tinta); linea(x + 9, y + 10, x + 11, y + 6, tinta); linea(x + 11, y + 6, x + 18, y + 6, tinta); linea(x + 18, y + 6, x + 20, y + 10, tinta); linea(x + 20, y + 10, x + 23, y + 10, tinta); linea(x + 23, y + 10, x + 23, y + 12, tinta); linea(x + 5, y + 12, x + 23, y + 12, tinta); linea(x + 5, y + 10, x + 5, y + 12, tinta);
      rect(x + 6, y + 17, x + 22, y + 17, tinta); rect(x + 8, y + 16, x + 8, y + 18, tinta); rect(x + 20, y + 16, x + 20, y + 18, tinta);
      for (const cx of [x + 8, x + 20]) { for (let g = 0; g < 8; g++) pset(Math.round(cx + Math.cos(g * Math.PI / 4) * 2.4), Math.round(y + 24 + Math.sin(g * Math.PI / 4) * 2.4), tinta); pset(cx, y + 24, tinta); for (let j = y + 13; j < y + 22; j += 2) pset(cx, j, hex('#8ab0d8')); }
    } else {
      // el motor en despiece: culata, bloque, pistones y cárter a lo largo de un eje
      rect(x + 7, y + 5, x + 20, y + 7, tinta); rect(x + 8, y + 6, x + 19, y + 6, azul); for (let i = 0; i < 4; i++) { rect(x + 8 + i * 3, y + 10, x + 9 + i * 3, y + 12, tinta); pset(x + 8 + i * 3, y + 14, tinta); }
      rect(x + 6, y + 17, x + 21, y + 21, tinta); rect(x + 7, y + 18, x + 20, y + 20, azul); for (let i = 0; i < 4; i++) pset(x + 9 + i * 3, y + 19, tinta);
      linea(x + 7, y + 24, x + 20, y + 24, tinta); linea(x + 9, y + 26, x + 18, y + 26, tinta); for (let j = y + 3; j < y + 27; j += 2) pset(x + 23, j, hex('#8ab0d8'));
      d_cifras(R, 4, x + 3, y + 22, hex('#8ab0d8'));
    }
    pset(x + (w >> 1), y - 1, C.k);
  }
  // el calendario con su coche (números sueltos, sin letras) y la espiral
  { const x = 160, y = 64; rect(x + 1, y + 33, x + 21, y + 34, paredS); rect(x, y, x + 20, y + 32, C.k); rect(x + 1, y + 1, x + 19, y + 31, hex('#f6f0e0')); for (let i = x + 2; i < x + 19; i += 2) pset(i, y, hex('#c8c8d0'));
    rect(x + 2, y + 2, x + 18, y + 13, hex('#8cc4e8')); rect(x + 2, y + 10, x + 18, y + 13, hex('#7aa860')); rect(x + 5, y + 8, x + 15, y + 10, hex('#d03a34')); rect(x + 7, y + 6, x + 12, y + 7, hex('#d03a34')); pset(x + 8, y + 7, hex('#c4e0ea')); pset(x + 11, y + 7, hex('#c4e0ea')); pset(x + 7, y + 11, C.k); pset(x + 13, y + 11, C.k); pset(x + 16, y + 3, hex('#fff4c8'));
    rect(x + 2, y + 15, x + 18, y + 17, hex('#c03a34')); d_cifras(R, 7, x + 9, y + 19, hex('#2a2a3a'));
    for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) pset(x + 4 + i * 2, y + 26 + j * 2, (i + j * 7) === 9 ? hex('#d03a34') : i === 6 ? hex('#c08080') : hex('#8a8a96')); }
  // ── la ventana (x 226–288, y 52–102): marco y alféizar; lo de fuera, en cada fotograma ──
  const [vx0, vy0, vx1, vy1] = D_VENTANA_FI;
  rect(vx0 - 5, vy0 - 5, vx1 + 5, vy1 + 4, C.k); rect(vx0 - 4, vy0 - 4, vx1 + 4, vy1 + 3, hex('#f4f0e4')); rect(vx1 + 3, vy0 - 3, vx1 + 4, vy1 + 3, hex('#c4bea8')); rect(vx0 - 4, vy1 + 2, vx1 + 4, vy1 + 3, hex('#c4bea8')); rect(vx0 - 1, vy0 - 1, vx1 + 1, vy1 + 1, C.k);
  rect(vx0 - 7, vy1 + 4, vx1 + 7, vy1 + 6, C.k); rect(vx0 - 6, vy1 + 4, vx1 + 6, vy1 + 5, hex('#f4f0e4'));
  // ── el planero (x 220–294, y 110–139) con sus cajones anchos, los rollos de planos y una caja de fichas ──
  rect(219, 111, 295, 139, C.k); rect(220, 112, 294, 138, hex('#7c8a86')); rect(220, 112, 294, 113, hex('#a8b4b0')); rect(292, 114, 294, 138, hex('#5e6c68'));
  for (let j = 0; j < 4; j++) { const y = 115 + j * 6; rect(222, y, 290, y + 4, hex('#4e5a58')); rect(223, y, 289, y + 3, hex('#8e9c98')); rect(223, y, 289, y, hex('#a8b4b0')); rect(250, y + 1, 262, y + 2, hex('#d4d8d0')); rect(250, y + 2, 262, y + 2, hex('#4e5a58')); rect(226, y + 1, 232, y + 2, hex('#f2ead4')); }
  for (const [x, c] of [[224, '#e4eef8'], [229, '#9ec0e0'], [233, '#f2ead4']]) { rect(x, 100, x + 3, 111, C.k); rect(x + 1, 101, x + 2, 110, hex(c)); pset(x + 1, 100, hex('#8a8a96')); }
  rect(238, 108, 256, 111, C.k); rect(239, 108, 255, 110, hex('#e4eef8')); rect(239, 109, 255, 109, hex('#9ec0e0')); disco(239.5, 109.5, 1.6, hex('#c4d8ec')); pset(239, 109, hex('#2e5688'));
  // ── el tablero de las llaves (x 298–318, y 52–98): cada herramienta en su silueta ──
  rect(297, 51, 319, 99, C.k); rect(298, 52, 318, 98, hex('#b89868')); for (let y = 54; y < 98; y += 3) for (let x = 300; x < 318; x += 3) pset(x, y, hex('#8a6e44'));
  for (let k = 0; k < 4; k++) { const x = 301 + k * 4, l = 16 - k * 2, y = 56; rect(x, y + 2, x, y + l, hex('#c8ccd4')); rect(x + 1, y + 2, x + 1, y + l, hex('#7a8088')); pset(x - 1, y, hex('#c8ccd4')); pset(x + 1, y, hex('#c8ccd4')); pset(x, y + 1, hex('#c8ccd4')); disco(x + 0.5, y + l + 1.5, 1.4, hex('#c8ccd4')); pset(x, y + l + 1, hex('#b89868')); }
  rect(301, 80, 303, 92, hex('#c03a34')); rect(302, 76, 302, 80, hex('#c8ccd4')); rect(306, 78, 307, 92, hex('#c8a030')); rect(305, 76, 308, 78, hex('#7a8088')); rect(311, 80, 315, 82, hex('#7a8088')); rect(312, 82, 313, 93, hex('#8a5a2a'));
  // el perchero de pared con la bata de taller (bajo el tablero)
  rect(300, 102, 316, 103, C.k); poligono([[303, 104], [314, 104], [316, 132], [301, 132]], C.k); poligono([[304, 105], [313, 105], [315, 131], [302, 131]], (x, y) => (x > 311 ? hex('#7a8ea8') : (x === 308) ? hex('#6a7e98') : hex('#94a8c0'))); rect(304, 116, 307, 120, hex('#7a8ea8')); pset(309, 110, hex('#f2ead4')); pset(309, 116, hex('#f2ead4'));
  // ── el pedestal de la maqueta (x 187–213): columna clara con su placa; el motor, en cada fotograma ──
  { const q = 27; rect(160 + q, 118, 186 + q, 139, C.k); rect(161 + q, 119, 185 + q, 138, hex('#e8e2d0')); rect(161 + q, 119, 185 + q, 120, C.blanco); rect(182 + q, 121, 185 + q, 138, hex('#c4bea8')); rect(161 + q, 136, 185 + q, 138, hex('#c4bea8')); rect(158 + q, 116, 188 + q, 118, C.k); rect(159 + q, 116, 187 + q, 117, hex('#f4f0e4'));
    rect(167 + q, 124, 179 + q, 129, hex('#9a7028')); rect(168 + q, 125, 178 + q, 128, hex('#d8a848')); rect(170 + q, 126, 176 + q, 126, hex('#6a4c18')); rect(171 + q, 127, 175 + q, 127, hex('#6a4c18')); }
  // ── el sillón giratorio de Lanier (x 112), por detrás de quien se siente ──
  poligono([[99, 139], [100, 116], [104, 111], [120, 111], [124, 116], [125, 139]], C.k);
  poligono([[100, 139], [101, 117], [104, 112], [120, 112], [123, 117], [124, 139]], (x, y) => (x > 120 ? hex('#3a4c44') : (y - 112) % 7 === 6 ? hex('#34463e') : x < 103 ? hex('#6a8a7a') : hex('#4e6a5c')));
  rect(103, 113, 121, 113, hex('#7a9a8a'));
  d_chiltonMas(R);
}
function d_chilton(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  R.copiar(d_capa(R, 'chilton', () => d_chiltonFijo(R)));
  const [vx0, vy0, vx1, vy1] = D_VENTANA_FI, W = vx1 - vx0 + 1;
  const rc = (x0, y0, x1, y1, c) => rect(Math.max(vx0, x0), Math.max(vy0, y0), Math.min(vx1, x1), Math.min(vy1, y1), c);
  // el cielo de la mañana, tramado
  const cielo = [hex('#6aa8e0'), hex('#86bce8'), hex('#a8d0ee'), hex('#c8e2f2')];
  for (let y = vy0; y <= vy1; y++) for (let x = vx0; x <= vx1; x++) { const f = (y - vy0) / (vy1 - vy0) * 2.8 + (d_bayer(x, y) - 0.5) * 0.9; pset(x, y, cielo[Math.max(0, Math.min(3, Math.round(f)))]); }
  R.recorte(D_VENTANA_FI);
  const NUB = [hex('#ffffff'), hex('#eaf2f8'), hex('#bcd0e2')];
  for (let k = 0; k < 3; k++) { const w = [12, 8, 15][k], cx = vx0 - 18 + ((t * [2.2, 3.4, 1.3][k] + k * 29) % (W + 36)), cy = vy0 + [8, 16, 23][k]; d_nube(R, cx, cy, w, NUB); }
  // los tejados lejanos
  for (let i = 0; i < 9; i++) { const x = vx0 + i * 7, top = Math.round(vy0 + 30 + h(i, 1, 60) * 8); rc(x, top, x + 6, vy1, hex('#9aa8c0')); rc(x, top, x, vy1, hex('#b0bcd0')); if (h(i, 2, 60) < 0.4) rc(x + 2, top - 3, x + 3, top, hex('#8a98b0')); }
  // la torre del reloj: piedra clara, cornisas, el tejado en punta con su remate y la esfera (las agujas andan)
  { const tx = 264, P = hex('#c8c0ac'), PS = hex('#a49c88'), PL = hex('#e0d8c4');
    rc(tx, vy0 + 14, tx + 14, vy1, P); rc(tx + 11, vy0 + 14, tx + 14, vy1, PS); rc(tx, vy0 + 14, tx + 1, vy1, PL);
    rc(tx - 1, vy0 + 13, tx + 15, vy0 + 14, PS); rc(tx - 1, vy0 + 30, tx + 15, vy0 + 31, PS); rc(tx - 1, vy0 + 12, tx + 15, vy0 + 12, PL);
    for (let j = 0; j < 9; j++) linea(tx + 2 + Math.round(j * 0.6), vy0 + 11 - j, tx + 12 - Math.round(j * 0.6), vy0 + 11 - j, j % 3 === 2 ? hex('#4a5a6a') : hex('#5e7080')); linea(tx + 7, vy0 + 2, tx + 7, vy0, C.k); pset(tx + 7, vy0 + 1, hex('#d8a848'));
    for (let y = vy0 + 34; y < vy1; y += 7) { rc(tx + 3, y, tx + 5, y + 4, hex('#4a5266')); rc(tx + 8, y, tx + 10, y + 4, hex('#4a5266')); pset(tx + 4, y - 1, hex('#4a5266')); pset(tx + 9, y - 1, hex('#4a5266')); }
    disco(tx + 7.5, vy0 + 22.5, 6.2, C.k); disco(tx + 7.5, vy0 + 22.5, 5.2, hex('#f6f0dc')); for (let k = 0; k < 4; k++) pset(Math.round(tx + 7 + Math.cos(k * Math.PI / 2) * 4.2), Math.round(vy0 + 22 + Math.sin(k * Math.PI / 2) * 4.2), C.k);
    const a = (f, r) => linea(tx + 7, vy0 + 22, Math.round(tx + 7 + Math.sin(f * Math.PI * 2) * r), Math.round(vy0 + 22 - Math.cos(f * Math.PI * 2) * r), C.k); a(0.82 + t / 720, 2.6); a(0.15 + t / 60, 4.2); }
  // el edificio de ladrillo de enfrente, con sus ventanas de arco, la cornisa y la chimenea que humea
  { const L = hex('#a8523c'), LS = hex('#86402e'), LL = hex('#c46a4c'), top = vy0 + 22;
    for (let y = top; y <= vy1; y++) for (let x = vx0; x <= vx0 + 34; x++) pset(x, y, (y - top) % 3 === 0 ? LS : ((x + ((y - top) / 3 | 0) * 3) % 6 === 0 ? LS : h(x, y, 61) < 0.12 ? LL : L));
    for (let y = vy0 + 40; y <= vy1; y++) for (let x = vx0 + 35; x <= vx1; x++) if (x < 263 || x > 279) pset(x, y, (y - top) % 3 === 0 ? hex('#74382a') : ((x + ((y - top) / 3 | 0) * 3) % 6 === 0 ? hex('#74382a') : hex('#94483a')));
    rc(vx0, top - 2, vx0 + 36, top - 1, hex('#d8ccb0')); rc(vx0, top, vx0 + 36, top, hex('#6a2e22')); rc(vx0 + 35, vy0 + 39, vx1, vy0 + 39, hex('#c8bca0'));
    for (const wx of [vx0 + 4, vx0 + 15, vx0 + 26]) for (const wy of [top + 5, top + 19]) { rc(wx, wy, wx + 6, wy + 9, C.k); rc(wx + 1, wy + 1, wx + 5, wy + 8, h(wx, wy, 62) < 0.4 ? hex('#f8e8a0') : hex('#3a4a60')); rc(wx + 3, wy + 1, wx + 3, wy + 8, C.k); rc(wx, wy + 10, wx + 6, wy + 10, hex('#d8ccb0')); pset(wx, wy, L); pset(wx + 6, wy, L); }
    rc(vx0 + 20, top - 9, vx0 + 24, top - 3, hex('#74382a')); rc(vx0 + 19, top - 10, vx0 + 25, top - 10, C.k);
    d_vapor(R, vx0 + 22.5, top - 12, t, 20, [hex('#f4f4f4'), hex('#d8dce0'), hex('#aab2bc')], 2);
    // palomas en la cornisa: una da saltitos
    for (let k = 0; k < 3; k++) { const px = vx0 + 4 + k * 5, sal = k === 1 && Math.sin(t * 3) > 0.7 ? 1 : 0; rc(px, top - 4 - sal, px + 1, top - 3 - sal, hex('#5a5a6a')); pset(px + (k % 2 ? 2 : -1), top - 5 - sal, hex('#5a5a6a')); }
  }
  for (let k = 0; k < 3; k++) d_paloma(R, Math.round(vx1 + 6 - ((t * (8 + k * 3) + k * 23) % (W + 14))), Math.round(vy0 + 10 + k * 5 + Math.sin(t * 1.4 + k) * 2), t, k, hex('#3a3a4a'));
  R.recorte(null);
  // la cruceta de la ventana y el reflejo
  rect(vx0 + 30, vy0, vx0 + 32, vy1, C.k); rect(vx0 + 31, vy0, vx0 + 31, vy1, hex('#f4f0e4')); rect(vx0, vy0 + 24, vx1, vy0 + 26, C.k); rect(vx0, vy0 + 25, vx1, vy0 + 25, hex('#f4f0e4'));
  for (const [px, py, n] of [[vx0 + 3, vy0 + 2, 9], [vx0 + 7, vy0 + 2, 5], [vx0 + 36, vy0 + 29, 9], [vx0 + 40, vy0 + 29, 4]]) for (let i = 0; i < n; i++) { const x = px + i, y = py + i * 2; pset(x, y, d_mezcla(R.pget(x, y), C.blanco, 0.4)); }
  // la pantalla fluorescente, que zumba (un parpadeo muy leve)
  if (Math.sin(t * 1.7) > 0.96 && Math.sin(t * 40) > 0) rect(187, 7, 261, 10, hex('#d8d4c0'));
  // ── la maqueta del motor en su pedestal: el bloque en corte con cuatro pistones que suben y bajan, el cigüeñal, la
  // correa y el ventilador que gira ──
  { const x = 200, y = 115, ac = hex('#6a7a94'), acS = hex('#4a5870'), acL = hex('#94a4bc');
    rect(x - 11, y - 14, x + 11, y, C.k); rect(x - 10, y - 13, x + 10, y - 1, ac); rect(x - 10, y - 13, x + 10, y - 13, acL); rect(x + 8, y - 12, x + 10, y - 1, acS);
    rect(x - 9, y - 19, x + 9, y - 14, C.k); rect(x - 8, y - 18, x + 8, y - 15, hex('#c03a34')); rect(x - 8, y - 18, x + 8, y - 18, hex('#e05a50')); for (let k = 0; k < 4; k++) { pset(x - 6 + k * 4, y - 20, C.k); pset(x - 6 + k * 4, y - 21, Math.sin(t * 9 + k * 1.57) > 0.8 ? hex('#fff080') : hex('#d8d8e0')); }
    rect(x - 8, y - 11, x + 6, y - 3, hex('#2a3040'));   // la ventana del corte
    for (let k = 0; k < 4; k++) { const f = Math.sin(t * 5 + k * Math.PI / 2), py = Math.round(y - 8 + f * 2), px = x - 7 + k * 4; rect(px, py - 2, px + 1, py, hex('#d8dce4')); pset(px, py - 2, C.blanco); linea(px, py + 1, px + (f > 0 ? 0 : 1), y - 3, hex('#9aa4b4')); }
    rect(x - 8, y - 3, x + 6, y - 3, hex('#d8a848'));
    // la polea, la correa y el ventilador
    const fx = x - 14, fy = y - 8; linea(x - 11, y - 4, fx, fy, C.k); disco(x - 10.5, y - 3.5, 1.6, hex('#2a2a34'));
    for (let k = 0; k < 4; k++) { const g = t * 8 + k * Math.PI / 2; linea(fx, fy, Math.round(fx + Math.cos(g) * 1.2), Math.round(fy + Math.sin(g) * 5), k % 2 ? hex('#e8c040') : hex('#c8a030')); }
    pset(fx, fy, C.k);
    rect(x - 9, y, x - 7, y + 1, C.k); rect(x + 7, y, x + 9, y + 1, C.k); rect(x + 11, y - 9, x + 13, y - 6, C.k); pset(x + 12, y - 8, acL); }
  // el ventilador de sobremesa del planero, que oscila
  { const cx = 278 + Math.round(Math.sin(t * 0.8) * 2), cy = 100; rect(275, 109, 283, 111, C.k); rect(276, 109, 282, 110, hex('#5a8a8a')); rect(278, 105, 279, 109, C.k);
    disco(cx + 0.5, cy + 0.5, 6.4, C.k); disco(cx + 0.5, cy + 0.5, 5.4, hex('#4a7676')); for (let k = 0; k < 3; k++) { const g = t * 15 + k * Math.PI * 2 / 3; linea(cx, cy, Math.round(cx + Math.cos(g) * 4), Math.round(cy + Math.sin(g) * 4), hex('#d4e4e0')); }
    for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 5.6), Math.round(cy + Math.sin(k * Math.PI / 6) * 5.6), hex('#c8d4d0')); pset(cx, cy, hex('#d8a848'));
    // la esquina del plano de encima, que se levanta con el aire
    const al = Math.sin(t * 8) > 0 ? 1 : 0; rect(252, 107 - al, 256, 107 - al, hex('#e4eef8')); }
  // el destello que salta por las maquetas de la balda y la copa
  { const k = Math.floor(t * 0.7) % 3, x = [228, 242, 257][k]; if ((t * 0.7) % 1 < 0.3) { pset(x, 35 - (k === 2 ? 6 : 0), C.blanco); pset(x + 1, 34 - (k === 2 ? 6 : 0), C.blanco); } }
  // la bata se mece un poco con el ventilador
  { const m = Math.round(Math.sin(t * 1.2) * 1); if (m) for (let y = 126; y <= 131; y++) { pset(301 + (m > 0 ? 0 : 1), y, hex('#94a8c0')); } }
  // motas de polvo en el rayo de la ventana
  for (let k = 0; k < 12; k++) { const y = Math.round(106 + ((h(k, 2, 66) * 66 + t * (1.4 + h(k, 3, 66) * 2)) % 66)), x = Math.round(256 - (y - 106) * 0.9 + h(k, 1, 66) * 50 + Math.sin(t * 0.5 + k) * 3); if (Math.sin(t * 1.5 + k * 1.7) > 0.1) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff8e0'), 0.6)); }
  return { suelo: 160, asiento: [112, 146], mesa: { x0: 64, x1: 176, y: 139 }, libre: [140, 139], lampara: [80, 118], motor: [200, 94], ventana: D_VENTANA_FI, reloj: [271, 74], visita: [215, 160], estanteria: [8, 24, 150, 139] };
}
// la mesa de Lanier (x 62–178; tablero en y 139–143 y frente de acero hasta y 170), por delante de quien se siente:
// tablero claro con canto cromado, dos cuerpos de cajones con tiradores y el hueco de las piernas; encima, la LÁMPARA
// VERDE de banquero encendida (su charco de luz late apenas), la taza que humea, el bote de lápices, la bandeja con
// manuales y un coche de juguete. La cara de quien se sienta queda en x 102–122 y el tramo x 124–155 del tablero
// queda LIBRE (libre: [140, 139]) para el cheque o la revista. Devuelve mesa, libre y lampara [x, y] (lo alto de la pantalla)
function d_mesaLanier(R, t, o = {}) {
  const { rect, pset, poligono, disco, linea } = R, ac = hex('#7c8e8a'), acS = hex('#5e6e6a'), acL = hex('#a0b0aa'), acD = hex('#3e4a48'), cromo = hex('#e0e4e8');
  for (let x = 60; x <= 180; x++) for (let y = 169; y <= 172; y++) if ((x + y) % 2 === 0) pset(x, y, d_mezcla(R.pget(x, y), hex('#4a3420'), 0.55));
  rect(62, 138, 178, 170, C.k);
  rect(63, 139, 177, 142, hex('#d8c8a0')); rect(63, 139, 177, 139, hex('#ece0bc')); for (let x = 64; x < 177; x += 2) if (h(x, 1, 50) < 0.4) pset(x, 141, hex('#c8b890')); rect(63, 143, 177, 143, cromo); rect(63, 144, 177, 144, acD);
  rect(65, 145, 175, 168, ac); rect(63, 145, 64, 169, acS); rect(176, 145, 177, 169, acD);
  rect(100, 147, 142, 168, acD); for (let y = 147; y <= 168; y++) for (let x = 100; x <= 142; x++) if ((x + y) % 2 && y < 151) pset(x, y, hex('#2a3432')); rect(100, 146, 142, 146, acS);
  for (const [x0, x1] of [[67, 97], [145, 173]]) for (let j = 0; j < 3; j++) { const y = 147 + j * 7; rect(x0, y, x1, y + 5, acD); rect(x0 + 1, y, x1 - 1, y + 4, j === 2 ? ac : hex('#869894')); rect(x0 + 1, y, x1 - 1, y, acL); const cx = (x0 + x1) >> 1; rect(cx - 5, y + 2, cx + 5, y + 2, cromo); rect(cx - 5, y + 3, cx + 5, y + 3, acD); }
  rect(63, 169, 177, 170, acD); rect(66, 171, 69, 174, C.k); rect(171, 171, 174, 174, C.k); pset(67, 174, cromo); pset(172, 174, cromo);
  { const b = Math.round(((t * 18) % 260) - 40); for (let x = 68; x <= 172; x++) if (Math.abs(x - 63 - b) < 4 && (x % 2)) pset(x, 143, C.blanco); }
  // la lámpara verde de banquero: pie de latón, pantalla de cristal verde y el charco de luz
  { const x = 80; rect(x - 6, 136, x + 6, 138, C.k); rect(x - 5, 136, x + 5, 137, hex('#d8a848')); rect(x - 5, 136, x + 3, 136, hex('#f4d888')); rect(x - 1, 126, x, 136, C.k); pset(x, 130, hex('#f4d888')); pset(x + 3, 131, hex('#d8a848')); pset(x + 3, 132, hex('#d8a848'));
    poligono([[x - 10, 118], [x + 10, 118], [x + 13, 126], [x - 13, 126]], C.k); poligono([[x - 9, 119], [x + 9, 119], [x + 11, 125], [x - 11, 125]], (px, py) => (py === 119 ? hex('#7ad89a') : px > x + 5 ? hex('#1e7a48') : px < x - 5 ? hex('#4cc07a') : hex('#2e9a5a')));
    rect(x - 7, 120, x - 4, 121, hex('#c8f4d4')); rect(x - 11, 126, x + 11, 126, hex('#fff4c0'));
    for (let y = 127; y <= 138; y++) for (let px = x - 20; px <= x + 20; px++) { const d = Math.abs(px - x) / (9 + (y - 127) * 0.9); if (d < 1 && d_bayer(px, y) < 0.6 - d * 0.35 + Math.sin(t * 2.3) * 0.03) pset(px, y, d_mezcla(R.pget(px, y), hex('#fff2b0'), 0.5)); } }
  // la taza de café que humea
  rect(91, 134, 96, 138, C.k); rect(92, 135, 95, 137, hex('#f6f0e0')); rect(92, 135, 95, 135, hex('#5a3420')); pset(97, 136, C.k); d_humillo(R, 93.5, 132, t, hex('#f4f4ec'));
  // el bote de lápices, la bandeja con manuales y el coche de juguete encima
  rect(64, 131, 69, 138, C.k); rect(65, 132, 68, 137, hex('#c03a34')); rect(65, 132, 65, 137, hex('#e05a50')); linea(66, 131, 65, 127, hex('#e8c040')); linea(67, 131, 68, 127, hex('#3a6ab0')); pset(65, 126, C.k);
  rect(156, 135, 176, 138, C.k); rect(157, 136, 175, 137, hex('#8a8a80'));
  for (let j = 0; j < 3; j++) { const y = 134 - j * 3, dx = [0, 1, -1][j], c = hex(D_LOMOS[[1, 0, 2][j]]); rect(158 + dx, y - 2, 174 + dx, y, C.k); rect(159 + dx, y - 2, 173 + dx, y - 1, c); rect(159 + dx, y - 2, 162 + dx, y - 1, hex('#f2ead4')); pset(160 + dx, y - 1, C.k); rect(159 + dx, y, 173 + dx, y, hex('#e8e0c8')); }
  { const x = 167, y = 125; rect(x - 5, y - 3, x + 5, y - 1, hex('#e8a030')); rect(x - 2, y - 5, x + 2, y - 4, hex('#e8a030')); rect(x - 5, y - 3, x + 5, y - 3, hex('#f8c860')); pset(x - 1, y - 4, hex('#c4e0ea')); pset(x + 1, y - 4, hex('#c4e0ea')); disco(x - 2.5, y - 0.5, 1.3, C.k); disco(x + 3.5, y - 0.5, 1.3, C.k); pset(x + 5, y - 2, C.blanco); }
  return { mesa: { x0: 64, x1: 176, y: 139 }, libre: [140, 139], lampara: [80, 118] };
}

const D_ESTANTE = { balda: 128, s: 3, hueco: [169, 128], libros: [[35, 0, 58], [54, 0, 59], [73, 0, 60], [92, 1, 61], [111, 1, 62], [130, 2, 63], [149, 2, 64], [189, 3, 65], [208, 3, 66], [227, 4, 67], [246, 0, 68]] };

function d_estanteFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, fondo = hex('#3e2a1c'), fondoS = hex('#32201a'), fondoL = hex('#4a3422'), roble = hex('#b08850'), robleS = hex('#8a6638'), robleL = hex('#cca468'), robleD = hex('#5e4424');
  const manual = PIEZAS_DU.manual;
  // el fondo de la estantería: tablero oscuro con veta vertical, más oscuro arriba y en las esquinas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, (y + Math.floor(h(x, 0, 30) * 9)) >> 3, 31); let c = n < 0.16 ? fondoS : n > 0.92 ? fondoL : x % 64 === 0 ? fondoS : fondo; if (y < 40) c = d_mezcla(c, hex('#1c1210'), 0.45 - y * 0.006); pset(x, y, c); }
  // arriba (y 20–39), en la sombra: manuales tumbados, una caja de fichas y un plano enrollado (poco contraste)
  const osc = (c) => d_mezcla(hex(c), hex('#1c1210'), 0.5);
  for (const [x, w, n] of [[52, 46, 3], [190, 40, 2]]) for (let j = 0; j < n; j++) { const y = 39 - j * 6, dx = (j % 2) * 3; rect(x + dx, y - 5, x + dx + w, y, hex('#140c0a')); rect(x + dx + 1, y - 4, x + dx + w - 1, y - 1, osc(D_LOMOS[(j + x) % 8])); rect(x + dx + 4, y - 4, x + dx + 12, y - 1, osc('#f2ead4')); rect(x + dx + 6, y - 3, x + dx + 9, y - 2, hex('#140c0a')); rect(x + dx + w - 6, y - 4, x + dx + w - 5, y - 1, osc('#f2ead4')); }
  rect(118, 24, 150, 39, hex('#140c0a')); rect(119, 25, 149, 39, osc('#8a8a80')); rect(119, 25, 149, 27, osc('#a8a89c')); rect(130, 30, 138, 34, osc('#f2ead4')); rect(132, 32, 136, 32, hex('#140c0a'));
  rect(240, 34, 268, 39, hex('#140c0a')); rect(241, 35, 267, 38, osc('#e4eef8')); rect(241, 36, 267, 36, osc('#9ec0e0')); disco(241.5, 36.5, 2.2, osc('#c4d8ec'));
  d_estanteMas(R);
  // la balda de arriba (y 40–47) con su canto claro y su sombra debajo
  const tabla = (y0) => { d_veta(R, 0, y0, 319, y0 + 7, roble, robleS, robleL, y0); rect(0, y0, 319, y0, robleL); rect(0, y0 + 1, 319, y0 + 1, hex('#dcb878')); rect(0, y0 + 7, 319, y0 + 7, robleD); rect(0, y0 + 8, 319, y0 + 8, C.k);
    for (let y = y0 + 9; y <= y0 + 15; y++) for (let x = 0; x < 320; x++) if (d_bayer(x, y) < 0.85 - (y - y0 - 9) * 0.13) pset(x, y, hex('#1c1210')); };
  tabla(40);
  // la fila de manuales (base en y 128): la sombra de cada uno en el fondo, y el lomo con su año
  for (const [cx, col, año] of D_ESTANTE.libros) {
    rect(cx - 8, 58, cx + 9, 128, hex('#1c1210'));
    manual(R, cx, 128, { lomo: true, s: 3, color: D_LOMOS[col] }); d_llave(R, cx, 65);
    // detalle fino encima del lomo: el brillo del canto, la tela y el año en cifras entre dos filetes
    for (let y = 60; y <= 124; y++) { pset(cx - 5, y, d_mezcla(R.pget(cx - 5, y), C.blanco, 0.28)); if (y % 2) pset(cx - 4, y, d_mezcla(R.pget(cx - 4, y), C.blanco, 0.16)); pset(cx + 2, y, d_mezcla(R.pget(cx + 2, y), C.k, 0.14)); }
    for (let y = 94; y <= 110; y++) for (let x = cx - 5; x <= cx + 2; x++) if ((x + y) % 4 === 0) pset(x, y, d_mezcla(R.pget(x, y), C.k, 0.12));
    rect(cx - 6, 95, cx + 5, 95, hex('#f2ead4')); rect(cx - 6, 109, cx + 5, 109, hex('#f2ead4')); d_cifras(R, año, cx - 6, 97, hex('#f2ead4'), 2);
  }
  // el hueco (x 159–179): más oscuro, con la huella limpia en el polvo
  rect(159, 58, 179, 128, hex('#241812')); for (let y = 58; y <= 128; y++) { pset(159, y, hex('#160e0a')); pset(160, y, hex('#1c1210')); if (y % 2) pset(161, y, hex('#1c1210')); pset(179, y, hex('#2e2018')); }
  rect(161, 127, 178, 128, hex('#2e2018'));
  // el sujetalibros de engranaje (izquierda)
  rect(4, 118, 24, 128, C.k); rect(5, 119, 23, 127, hex('#4a4a56')); rect(5, 119, 23, 119, hex('#7a7a88')); rect(20, 84, 24, 128, C.k); rect(21, 85, 23, 127, hex('#5a5a68')); rect(21, 85, 21, 127, hex('#8a8a98'));
  disco(11.5, 104.5, 11.6, C.k); disco(11.5, 104.5, 10.4, hex('#8a8a98')); for (let k = 0; k < 10; k++) { const g = k * Math.PI / 5; disco(11.5 + Math.cos(g) * 11, 104.5 + Math.sin(g) * 11, 2.2, C.k); disco(11.5 + Math.cos(g) * 10.6, 104.5 + Math.sin(g) * 10.6, 1.4, hex('#8a8a98')); }
  disco(11.5, 104.5, 7.6, hex('#a8a8b8')); disco(11.5, 104.5, 4, hex('#5a5a68')); disco(11.5, 104.5, 2, hex('#241812')); for (let i = 0; i < 5; i++) pset(6 + i, 99 + (i >> 1), hex('#d0d0dc'));
  // a la derecha: el pistón de pisapapeles y el coche de juguete de hojalata
  { const x = 274; rect(x - 8, 100, x + 8, 128, C.k); rect(x - 7, 101, x + 7, 127, hex('#b4b8c4')); rect(x - 7, 101, x - 5, 127, hex('#dce0e8')); rect(x + 5, 101, x + 7, 127, hex('#7c8090')); rect(x - 7, 101, x + 7, 102, hex('#e8ecf2'));
    for (const y of [105, 108, 111]) { rect(x - 7, y, x + 7, y, hex('#5a5e6c')); } disco(x + 0.5, 119.5, 3.4, C.k); disco(x + 0.5, 119.5, 2.4, hex('#5a5e6c')); pset(x - 1, 118, hex('#8a8e9c'));
    rect(x - 3, 92, x + 3, 100, C.k); rect(x - 2, 86, x + 2, 99, hex('#9aa0ae')); rect(x - 2, 86, x - 2, 99, hex('#c8ccd8')); disco(x + 0.5, 85.5, 4, C.k); disco(x + 0.5, 85.5, 3, hex('#9aa0ae')); disco(x + 0.5, 85.5, 1.4, hex('#241812')); }
  { const x = 300, y = 128; rect(x - 13, y - 9, x + 13, y - 3, C.k); rect(x - 12, y - 8, x + 12, y - 4, hex('#d03a34')); rect(x - 12, y - 8, x + 12, y - 8, hex('#f06a5a')); poligono([[x - 7, y - 9], [x - 4, y - 15], [x + 6, y - 15], [x + 9, y - 9]], C.k); poligono([[x - 5, y - 9], [x - 3, y - 14], [x + 5, y - 14], [x + 7, y - 9]], hex('#d03a34'));
    rect(x - 3, y - 13, x, y - 10, hex('#c4e0ea')); rect(x + 2, y - 13, x + 5, y - 10, hex('#c4e0ea')); pset(x - 3, y - 13, C.blanco); rect(x - 12, y - 5, x + 12, y - 5, hex('#f2ead4')); pset(x + 12, y - 7, hex('#fff080')); pset(x - 12, y - 7, hex('#8a1e1e'));
    for (const d of [-7, 7]) { disco(x + d + 0.5, y - 2.5, 3.2, C.k); disco(x + d + 0.5, y - 2.5, 1.4, hex('#c8ccd4')); } }
  // la balda principal (y 129–136) con los portaetiquetas de latón (rayas, sin letras)
  tabla(129);
  for (const x of [60, 150, 240]) { rect(x - 9, 130, x + 9, 136, C.k); rect(x - 8, 131, x + 8, 135, hex('#d8a848')); rect(x - 8, 131, x + 8, 131, hex('#f4d888')); rect(x - 6, 132, x + 6, 134, hex('#f2ead4')); rect(x - 4, 133, x + 1, 133, hex('#6a6a70')); pset(x + 4, 133, hex('#c03a34')); }
  // abajo asoman los manuales de la balda siguiente (la franja blanca y la llave)
  for (let k = 0; k < 17; k++) { const cx = 12 + k * 19, c = D_LOMOS[[4, 4, 5, 5, 5, 1, 1, 6, 6, 6, 0, 0, 7, 7, 2, 2, 2][k]]; if (k === 9) { rect(cx - 9, 148, cx + 9, 179, hex('#1c1210')); continue; }
    manual(R, cx, 220, { lomo: true, s: 3, color: c }); d_llave(R, cx, 157); for (let y = 152; y < 180; y++) { pset(cx - 5, y, d_mezcla(R.pget(cx - 5, y), C.blanco, 0.28)); pset(cx + 2, y, d_mezcla(R.pget(cx + 2, y), C.k, 0.14)); } }
  for (let y = 145; y <= 151; y++) for (let x = 0; x < 320; x++) if (d_bayer(x, y) < 0.8 - (y - 145) * 0.12) pset(x, y, hex('#1c1210'));
}
// la llave inglesa fina sobre la franja blanca de un lomo grande (12 × 27; cx = centro del lomo, y0 = arriba de la franja):
// la boca abierta arriba, el mango y el ojo abajo
function d_llave(R, cx, y0) {
  const { rect, pset, disco } = R, k = hex('#2a2a3a'), g = hex('#6a6a7a'), b = hex('#f2ead4');
  rect(cx - 6, y0, cx + 5, y0 + 26, b); rect(cx - 6, y0 + 26, cx + 5, y0 + 26, hex('#cfc4a8'));
  rect(cx - 4, y0 + 3, cx - 3, y0 + 8, k); rect(cx + 2, y0 + 3, cx + 3, y0 + 8, k); pset(cx - 5, y0 + 4, k); pset(cx + 4, y0 + 4, k); pset(cx - 5, y0 + 5, k); pset(cx + 4, y0 + 5, k);
  rect(cx - 4, y0 + 8, cx + 3, y0 + 10, k); rect(cx - 3, y0 + 11, cx + 2, y0 + 11, k); rect(cx - 2, y0 + 7, cx + 1, y0 + 7, k);
  rect(cx - 1, y0 + 12, cx, y0 + 19, k); pset(cx - 1, y0 + 13, g); pset(cx - 1, y0 + 15, g); pset(cx - 1, y0 + 17, g);
  disco(cx, y0 + 21.5, 3.1, k); disco(cx, y0 + 21.5, 1.1, b);
}

function d_estante(R, t, o = {}) {
  const { rect, pset, linea, disco } = R;
  R.copiar(d_capa(R, 'estante', () => d_estanteFijo(R)));
  // la franja de sol que entra por la persiana y se desliza despacio por los lomos
  for (let y = 56; y <= 128; y++) for (let x = 0; x < 320; x++) { const u = (((x - (y - 56) * 0.45 - t * 7) % 230) + 230) % 230; if (u < 30 && (u > 3 && u < 27 || (x + y) % 2)) { const p = R.pget(x, y), cl = (p & 255) + ((p >> 8) & 255) + ((p >> 16) & 255) > 200; pset(x, y, d_mezcla(p, hex('#fff0c0'), u > 12 && u < 16 ? 0.05 : cl ? 0.22 : 0.07)); } }
  // la etiqueta de cartón que cuelga de la balda de arriba y se mece
  { const m = Math.sin(t * 1.3) * 2.2, x = Math.round(214 + m), y = 60; linea(214, 48, x, y, hex('#e8e0c8')); rect(x - 4, y, x + 4, y + 9, C.k); rect(x - 3, y + 1, x + 3, y + 8, hex('#e8d8a8')); pset(x, y + 2, C.k); rect(x - 2, y + 4, x + 2, y + 4, hex('#8a7a58')); rect(x - 2, y + 6, x + 1, y + 6, hex('#8a7a58')); }
  // motas de polvo que flotan delante del estante
  for (let k = 0; k < 16; k++) { const x = Math.round((h(k, 1, 40) * 320 + t * (2 + h(k, 2, 40) * 3)) % 320), y = Math.round(56 + ((h(k, 3, 40) * 70 + Math.sin(t * 0.6 + k) * 5 + t * 1.2) % 70)); if (Math.sin(t * 1.8 + k * 1.3) > 0) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff4d0'), 0.6)); }
  // la mosca que pasea por el canto de la balda, se para y se frota las patas
  { const c = (t * 0.12) % 1, x = Math.round(20 + (c < 0.5 ? c * 2 : 2 - c * 2) * 110), y = 128, quieta = Math.sin(t * 0.9) > 0.3; rect(x, y - 1, x + 1, y - 1, C.k); pset(x + (c < 0.5 ? 2 : -1), y - 1, hex('#3a3a4a')); if (!quieta || Math.sin(t * 20) > 0) pset(x, y - 2, hex('#c8d4e0')); }
  // la araña que sube y baja por su hilo entre el último manual y el pistón
  { const y = Math.round(66 + (Math.sin(t * 0.45) * 0.5 + 0.5) * 22 + Math.sin(t * 2.1) * 1.2), x = 260; linea(x, 56, x, y - 2, hex('#7a6a58')); rect(x - 1, y - 1, x, y, hex('#0c0806')); pset(x - 2, y - 2, hex('#0c0806')); pset(x + 1, y - 2, hex('#0c0806')); pset(x - 2, y + (Math.sin(t * 6) > 0 ? 1 : 0), hex('#0c0806')); pset(x + 1, y + (Math.sin(t * 6) > 0 ? 0 : 1), hex('#0c0806')); pset(x - 1, y - 1, hex('#a85a3a')); }
  // el destello del latón de los portaetiquetas, que pasa de uno a otro
  { const k = Math.floor(t * 0.5) % 3, x = [60, 150, 240][k]; if ((t * 0.5) % 1 < 0.25) { pset(x - 7, 131, C.blanco); pset(x - 6, 132, C.blanco); } }
  // el brillo que recorre el cromo del coche de juguete
  { const b = Math.round((t * 9) % 60); if (b < 22) pset(289 + b, 120, C.blanco); }
  const { balda, s, hueco } = D_ESTANTE;
  return { suelo: balda, balda, s, hueco: [...hueco], ancho: 20, alto: 72 };
}
// la paleta de los cuatro decorados de libros()
const e_P = pal({
  viga: '#3a3e4a', vigaL: '#565c6a', vigaS: '#2a2c36', muro: '#d8ceb8', muroS: '#bcb098', muroL: '#e6dcc8', muroD: '#c8bca4',
  zoc: '#5a8272', zocS: '#48705f', zocL: '#74a08c', zocD: '#34544a', suelo: '#8e8a86', sueloS: '#76726e', sueloL: '#a6a29c', mancha: '#625e5e',
  maq: '#5c7c74', maqL: '#86a89c', maqS: '#40605a', maqD: '#2c403c', int: '#181c24', maq2: '#6a7488', maq2L: '#96a0b4', maq2S: '#4a5266',
  amar: '#e8c030', cieloA: '#6cb4ec', cieloB: '#9cd0f4', cieloC: '#d8ecf4', lejos: '#8a94ac', lejosS: '#6c7692', luz: '#fff0c4',
  nubeL: '#ffffff', nube: '#e8f0f8', nubeS: '#b8cce0', tubo: '#a85a3a', tuboL: '#d88a5a', pale: '#b08850', paleS: '#7a5a30',
  techoC: '#ece2cc', techoS: '#d4c8ae', mold: '#c8a878', empap: '#b8c4a4', empapS: '#a8b694', empapL: '#c6d0b2',
  est: '#7a4c26', estL: '#a8743c', estS: '#56321a', estF: '#2e1c12', tabla: '#b8884c', tablaS: '#94683a', tablaL: '#d0a468', tablaD: '#70482a',
  mantel: '#2e5a48', mantelS: '#1e4234', mesaL: '#f0e4c4', mesaS: '#d0c09a', alf: '#8a2c34', alfS: '#641e28', alfL: '#c8a050',
  fach: '#b85a44', fachS: '#8e3e30', acera: '#b4b0b8', aceraS: '#94909c', asf: '#4c4c5c', asfS: '#3c3c4a', asfL: '#5e5e6e', raya: '#e8e0c0',
  vid: '#3a5878', vidL: '#7aa8cc', telon: '#1c2450', telonS: '#141a3c', telonL: '#2a3468', terc: '#8e1e2c', tercS: '#641420', tercL: '#b83444',
  nogal: '#6a4024', nogalL: '#8e5c34', nogalS: '#4a2a16', nogalV: '#583420', escen: '#c89858', escenS: '#a47840', escenL: '#e0b878',
  moq: '#4a2440', moqS: '#381a32', moqL: '#6a3a5a', mantelB: '#f2eee4', mantelBS: '#c8c4c0', mantelBD: '#a09ca0',
  kio: '#3e7a52', kioL: '#5e9c6c', kioS: '#2a5a3c', kioD: '#1e4430', kioInt: '#1e1a24', busC: '#f0e6c8', busV: '#4a8a6a', busVS: '#346a50', cromo: '#d8e0e8',
  piel: '#f2c8a0', pielS: '#d09a70',
});

// los búferes fijos de cada decorado (uno por lienzo y clave)
const e_CACHE = new WeakMap();

// devuelve el búfer fijo de la clave; la primera vez lo pinta con dibuja() sobre un búfer vacío (0 = sin pintar)
function e_buf(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(b); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// mezcla de dos colores (k = 0 → a, k = 1 → b)
const e_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= (Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) & 255) << s; return (0xff000000 | r) >>> 0; };

// tiñe un píxel ya pintado hacia el color c (k 0–1); respeta el recorte
function e_tinte(R, x, y, c, k) { if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y); if (p) R.pset(x, y, e_mez(p, c, k)); }

// la trama ordenada de 4 × 4 (0–1)
const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_tr = (x, y) => (e_B4[(x & 3) + ((y & 3) << 2)] + 0.5) / 16;

// un rectángulo pintado con pset (respeta R.recorte, para lo que se ve por ventanas y puertas)
function e_r(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) R.pset(x, y, c); }

// un degradado vertical tramado entre los colores de cols (respeta el recorte)
function e_degr(R, x0, y0, x1, y1, cols) {
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(f)), fr = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, fr > e_tr(x, y) ? cols[i + 1] : cols[i]); }
}

// una caja con contorno: relleno c, canto de luz arriba y a la izquierda (l) y de sombra abajo y a la derecha (s)
function e_caja(R, x0, y0, x1, y1, c, l, s) {
  R.rect(x0, y0, x1, y1, C.k); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c);
  if (l) { R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, l); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, l); }
  if (s) { R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, s); R.rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, s); }
}

// un cuarterón de madera en relieve con dos vetas
function e_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 620) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 621 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba); solo pinta donde ok(x, y) (o en todas partes) y respeta el recorte
function e_nube(R, cx, cy, w, ok) {
  const P = e_P, bolas = [[0, 0, w * 0.3], [-w * 0.3, w * 0.07, w * 0.22], [w * 0.3, w * 0.06, w * 0.24], [-w * 0.08, -w * 0.12, w * 0.24], [w * 0.14, -w * 0.07, w * 0.2]];
  const pinta = (dx, dy, f, c) => { for (const [bx, by, r] of bolas) { const rr = r * f, x0 = Math.round(cx + bx + dx), y0 = Math.round(cy + by + dy);
    for (let j = -Math.ceil(rr); j <= rr; j++) for (let i = -Math.ceil(rr); i <= rr; i++) if (i * i + j * j <= rr * rr && y0 + j <= cy + w * 0.2 && (!ok || ok(x0 + i, y0 + j))) R.pset(x0 + i, y0 + j, c); } };
  pinta(0, 1, 1, P.nubeS); pinta(0, -1, 0.92, P.nube); pinta(-1, -2, 0.62, P.nubeL);
}

// los colores de los lomos de los libros
const e_LOMOS = ['#8a2c2c', '#2c5a8a', '#3a7a4a', '#c89a3a', '#6a3a7a', '#b8562a', '#2a3a5a', '#7a6a4a', '#a83a5a', '#d8c8a0', '#4a8a8a', '#5a3a2a'].map((c) => hex(c));

// una fila de lomos de pie entre x0 y x1 sobre la balda yb (alto: el más alto): anchos, alturas y colores variados, canto
// de luz, tejuelos y, de vez en cuando, tres libros tumbados o uno apoyado
function e_lomos(R, x0, x1, yb, alto, k) {
  let x = x0;
  while (x <= x1) {
    const q = h(x, yb, 510 + k), w = Math.min(x1 - x + 1, 2 + Math.floor(h(x, k, 511) * 3)), a = alto - Math.floor(h(x, k, 512) * 4), c = e_LOMOS[Math.floor(h(x, k, 513) * e_LOMOS.length)];
    if (q < 0.07 && x + 9 <= x1) {
      for (let j = 0; j < 3; j++) { const cc = e_LOMOS[(j * 5 + x) % e_LOMOS.length], y = yb - j * 3; R.rect(x, y - 2, x + 7, y, cc); R.rect(x, y, x + 7, y, e_mez(cc, C.k, 0.45)); R.rect(x, y - 2, x + 7, y - 2, e_mez(cc, C.blanco, 0.25)); R.pset(x + 2, y - 1, C.oroL); }
      x += 9; continue;
    }
    R.rect(x, yb - a + 1, x + w - 1, yb, c); R.rect(x, yb - a + 1, x, yb, e_mez(c, C.blanco, 0.32)); if (w > 2) R.rect(x + w - 1, yb - a + 1, x + w - 1, yb, e_mez(c, C.k, 0.4));
    R.rect(x, yb - a + 1, x + w - 1, yb - a + 1, e_mez(c, C.k, 0.3));
    if (h(x, k, 514) > 0.4) R.rect(x + (w > 2 ? 1 : 0), yb - a + 3, x + w - 1 - (w > 2 ? 1 : 0), yb - a + 3, h(x, k, 515) > 0.5 ? C.oroL : C.papel);
    if (h(x, k, 516) > 0.6 && w > 2) R.rect(x + 1, yb - 3, x + w - 2, yb - 2, e_mez(c, C.blanco, 0.55));
    x += w;
  }
}

// un libro del episodio tumbado (12 × 3): tapa azul noche, lomo con su banda naranja y el corte claro de las hojas
function e_libroPlano(R, x, y, k = 0) {
  R.rect(x, y - 2, x + 11, y, C.libro); R.rect(x, y - 2, x + 11, y - 2, hex('#2e3a78')); R.rect(x, y, x + 11, y, C.k);
  R.rect(x + 2, y - 2, x + 3, y - 1, C.duna); R.pset(x + 5, y - 1, C.oroL); if (k % 2) R.rect(x + 9, y - 1, x + 11, y - 1, C.papel); else R.pset(x + 11, y - 1, C.papel);
}

// una portada de revista de ciencia ficción (w × a, sin letras): cabecera en barra y un planeta con anillo, un cohete, un
// robot o una luna con estrellas, según k
function e_portada(R, x, y, w, a, k) {
  const F = [hex('#1c2450'), hex('#b83a2c'), hex('#e0b030'), hex('#2a8a8a'), hex('#d86a2a'), hex('#5a3a8a'), hex('#24304a')], f = F[k % F.length], claro = (k % F.length) === 2;
  R.rect(x, y, x + w - 1, y + a - 1, C.k); R.rect(x + 1, y + 1, x + w - 2, y + a - 2, f);
  R.rect(x + 1, y + 1, x + w - 2, y + 2, claro ? hex('#b83a2c') : hex('#f4e060')); R.rect(x + 2, y + 1, x + 3, y + 1, claro ? C.blanco : hex('#b83a2c'));
  const cx = x + (w >> 1), cy = y + Math.round(a * 0.62), m = k % 4;
  if (m === 0) { R.disco(cx, cy, 2.4, hex('#e89848')); R.pset(cx - 1, cy - 1, hex('#f8d090')); for (let i = -3; i <= 3; i++) R.pset(cx + i, cy + (i > 0 ? -1 : i < 0 ? 1 : 0), C.blanco); R.pset(x + 2, y + 4, C.blanco); }
  else if (m === 1) { R.rect(cx, cy - 3, cx, cy + 1, C.blanco); R.rect(cx - 1, cy - 1, cx - 1, cy + 1, C.grisL); R.pset(cx, cy - 4, C.rojo); R.pset(cx - 2, cy + 1, C.rojo); R.pset(cx + 1, cy + 1, C.rojo); R.pset(cx, cy + 2, hex('#ffb040')); R.pset(cx - 1, cy + 3, hex('#ffe080')); R.pset(x + w - 3, y + 4, C.blanco); }
  else if (m === 2) { R.rect(cx - 2, cy - 3, cx + 1, cy - 1, C.grisL); R.pset(cx - 1, cy - 2, C.rojo); R.pset(cx + 1, cy - 2, C.rojo); R.pset(cx, cy - 4, C.grisL); R.rect(cx - 2, cy, cx + 1, cy + 2, C.gris); R.pset(cx - 3, cy + 1, C.grisL); R.pset(cx + 2, cy + 1, C.grisL); R.pset(cx - 1, cy + 1, hex('#f4e060')); }
  else { R.disco(cx, cy - 1, 2.4, hex('#f4ecd0')); R.disco(cx + 1.4, cy - 1.6, 2, f); R.pset(x + 2, y + a - 3, C.blanco); R.pset(x + w - 3, y + 4, C.blanco); R.pset(cx + 2, cy + 2, C.blanco); }
}

// un coche de los sesenta (26 × 9, con aletas y parachoques cromado) pintado con pset para que se recorte; x = borde
// izquierdo, s = suelo, dir = hacia dónde mira
function e_coche60(R, x, s, dir, col, t = 0) {
  const px = (i0, j0, i1, j1, c) => { for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) R.pset(dir > 0 ? x + i : x + 25 - i, s - j, c); }, S = e_mez(col, C.k, 0.35), L = e_mez(col, C.blanco, 0.4);
  px(0, 2, 25, 5, C.k); px(6, 6, 18, 9, C.k); px(1, 3, 24, 5, col); px(1, 5, 24, 5, L); px(1, 2, 24, 2, S); px(7, 6, 17, 8, hex('#f0e8d8'));
  px(8, 6, 11, 7, e_P.vid); px(13, 6, 16, 7, e_P.vid); px(8, 7, 9, 7, e_P.vidL); px(0, 6, 1, 6, C.k); px(0, 5, 0, 5, C.rojo); px(25, 4, 25, 4, hex('#fff0a0')); px(24, 2, 25, 2, e_P.cromo); px(0, 2, 1, 2, e_P.cromo);
  for (const w of [5, 20]) { px(w - 2, 0, w + 2, 2, C.k); px(w - 1, -0, w + 1, 3, C.k); px(w - 1, 1, w + 1, 1, C.grisL); px(w + (Math.floor(t * 9) % 2 ? 0 : 0), 1, w, 1, C.gris); }
}

// un paseante pequeño (10 px) pintado con pset para que se recorte: sombrero o pelo, abrigo de color y piernas que andan
function e_peaton(R, x, s, t, k, dir = 1) {
  const ab = [hex('#3a4a7a'), hex('#8a3a3a'), hex('#5a6a4a'), hex('#c8a060'), hex('#4a3a5a'), hex('#2a6a6a')][k % 6], pelo = [hex('#3a2a1c'), hex('#1c1c24'), hex('#8a5a2a'), hex('#5a5a66')][k % 4], f = Math.floor(t * 5 + k * 1.7) % 2;
  x = Math.round(x);
  e_r(R, x, s - 10, x + 2, s - 10, pelo); if (k % 3 === 0) { e_r(R, x - 1, s - 10, x + 3, s - 10, pelo); e_r(R, x, s - 11, x + 2, s - 11, pelo); }
  e_r(R, x, s - 9, x + 2, s - 8, e_P.piel); R.pset(dir > 0 ? x : x + 2, s - 9, pelo);
  e_r(R, x - 1, s - 7, x + 3, s - 4, ab); e_r(R, x, s - 7, x + 2, s - 7, e_mez(ab, C.blanco, 0.3)); R.pset(dir > 0 ? x + 3 : x - 1, s - 5, e_P.piel);
  if (k % 2) e_r(R, x - 1, s - 3, x + 3, s - 3, ab);
  if (f) { e_r(R, x, s - 3, x, s - 1, C.k); e_r(R, x + 2, s - 3, x + 2, s - 2, C.k); } else { e_r(R, x, s - 3, x, s - 2, C.k); e_r(R, x + 2, s - 3, x + 2, s - 1, C.k); }
}

// un reloj de pared: esfera con sus marcas, las agujas y el segundero rojo (h0: la hora al empezar)
function e_reloj(R, cx, cy, r, t, h0 = 10.17) {
  R.disco(cx + 0.5, cy + 0.5, r + 1.6, C.k); R.disco(cx + 0.5, cy + 0.5, r + 0.6, e_P.nogalL); R.disco(cx + 0.5, cy + 0.5, r - 0.4, hex('#f4eeda'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(a) * (r - 1.6)), Math.round(cy + Math.sin(a) * (r - 1.6)), k % 3 ? C.grisL : C.k); }
  const hh = h0 + t / 3600, am = (hh % 1) * Math.PI * 2 - Math.PI / 2, ah = (hh / 12) * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
  R.linea(cx, cy, cx + Math.cos(ah) * (r - 4), cy + Math.sin(ah) * (r - 4), C.k); R.linea(cx, cy, cx + Math.cos(am) * (r - 2.4), cy + Math.sin(am) * (r - 2.4), C.k);
  R.linea(cx, cy, cx + Math.cos(as) * (r - 2), cy + Math.sin(as) * (r - 2), C.rojo); R.pset(cx, cy, C.k);
}

// un cilindro de máquina visto de canto: aro, brillo, la plancha oscura que da vueltas y los radios (rot en radianes)
function e_cilindro(R, x, y, r, rot, plancha = true) {
  R.disco(x + 0.5, y + 0.5, r + 1, C.k); R.disco(x + 0.5, y + 0.5, r, C.metalS); R.disco(x, y, r - 1.2, C.metal); R.disco(x - r * 0.3, y - r * 0.3, r * 0.42, C.metalL);
  if (plancha) for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; if (((a - rot) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) < 2.3) { R.pset(Math.round(x + Math.cos(a) * (r - 1.5)), Math.round(y + Math.sin(a) * (r - 1.5)), e_P.int); R.pset(Math.round(x + Math.cos(a) * (r - 2.5)), Math.round(y + Math.sin(a) * (r - 2.5)), hex('#3a4252')); } }
  for (let k = 0; k < 3; k++) { const a = rot + k * 2.094; R.linea(x, y, x + Math.cos(a) * (r - 4), y + Math.sin(a) * (r - 4), C.metalD); }
  R.disco(x + 0.5, y + 0.5, 2.6, C.metalD); R.pset(x, y, C.metalL);
}

// una lámpara industrial colgada en (x, y0–y1) que se mece un poco, con su bombilla
function e_lampara(R, x, y0, y1, t, k = 0, col = hex('#3a6a5a')) {
  const lx = x + Math.round(Math.sin(t * 0.9 + k * 2.1) * 1.3);
  R.linea(x, y0, lx, y1 - 6, C.k); R.poligono([[lx - 7, y1 + 1], [lx - 3, y1 - 6], [lx + 4, y1 - 6], [lx + 8, y1 + 1]], C.k); R.poligono([[lx - 5, y1], [lx - 2, y1 - 5], [lx + 3, y1 - 5], [lx + 6, y1]], col);
  R.rect(lx - 2, y1 - 5, lx - 1, y1 - 3, e_mez(col, C.blanco, 0.35)); R.rect(lx - 2, y1 + 1, lx + 2, y1 + 2, hex('#fff4c8')); R.pset(lx - 3, y1 + 1, hex('#ffe08a')); R.pset(lx + 3, y1 + 1, hex('#ffe08a'));
  return lx;
}

// motas de polvo que flotan en un haz de luz (x0–x1, y0–y1), sesgado dx píxeles por fila
function e_polvo(R, t, x0, y0, x1, y1, n, k = 0, dx = 0.5) {
  for (let i = 0; i < n; i++) { const fy = (h(i, 3, 630 + k) * (y1 - y0) + t * (1.5 + h(i, 4, 630 + k) * 3)) % (y1 - y0), x = Math.round(x0 + fy * dx + h(i, 5, 630 + k) * (x1 - x0) + Math.sin(t * 0.6 + i) * 2), y = Math.round(y0 + fy);
    if (Math.sin(t * 1.4 + i * 2) > -0.2) R.pset(x, y, hex('#fff6dc')); }
}

// un operario pequeño (12 px) de mono azul y gorra que empuja un carro con resmas (x = centro, s = suelo, dir, anda)
function e_obrero(R, x, s, t, dir, anda) {
  const K = C.k, f = anda ? Math.floor(t * 6) % 2 : 0, cx = x + dir * 7;
  for (let i = -3; i <= 9; i++) if (i & 1) R.pset(x + dir * i, s + 1, e_P.zocD);
  R.rect(cx - 4, s - 5, cx + 4, s - 1, K); R.rect(cx - 3, s - 4, cx + 3, s - 2, hex('#8a7450')); R.rect(cx - 3, s - 8, cx + 3, s - 5, K); R.rect(cx - 2, s - 7, cx + 2, s - 6, C.blanco); R.pset(cx - 3, s, K); R.pset(cx + 3, s, K);
  R.rect(x - 2, s - 12, x + 2, s - 1, K); R.rect(x - 1, s - 11, x + 1, s - 10, hex('#3a5280')); R.pset(x + dir * 2, s - 10, hex('#3a5280')); R.rect(x - 1, s - 9, x + 1, s - 8, e_P.piel); R.rect(x - 1, s - 7, x + 1, s - 4, hex('#4a6a9a')); R.pset(x - dir, s - 7, hex('#6a8aba'));
  R.pset(x + dir * 2, s - 6, hex('#4a6a9a')); R.pset(x + dir * 3, s - 6, e_P.piel);
  if (f) { R.rect(x - 1, s - 3, x - 1, s - 1, hex('#2a3a5a')); R.rect(x + 1, s - 3, x + 1, s - 2, hex('#2a3a5a')); } else { R.rect(x - 1, s - 3, x - 1, s - 2, hex('#2a3a5a')); R.rect(x + 1, s - 3, x + 1, s - 1, hex('#2a3a5a')); }
}

// LA IMPRENTA (libros, encuadre 'imprenta', cámara general)
function e_imprenta(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = e_P, VENT = [16, 102, 188];
  R.copiar(e_buf(R, 'imprenta', () => {
    // el techo: la viga de acero con sus cartelas y las cerchas
    rect(0, 0, 319, 11, P.viga); rect(0, 3, 319, 3, P.vigaL); rect(0, 10, 319, 11, P.vigaS);
    for (let x = 6; x < 320; x += 26) { rect(x, 0, x + 2, 9, P.vigaS); pset(x + 1, 5, P.vigaL); linea(x + 3, 9, x + 15, 4, P.vigaS); linea(x + 15, 4, x + 26, 9, P.vigaS); }
    // la pared de ladrillo pintado (crema arriba) y el zócalo verde
    rect(0, 12, 319, 86, P.muro); rect(0, 87, 319, 117, P.zoc);
    for (let y = 12, f = 0; y < 116; y += 4, f++) { const z = y >= 87, cS = z ? P.zocS : P.muroS, cL = z ? P.zocL : P.muroL, cD = z ? P.zocD : P.muroD;
      for (let x = 0; x < 320; x++) if (h(x, y, 501) > 0.22) pset(x, y + 3, cS);
      for (let x = (f % 2) * 6 - 2; x < 320; x += 12) { rect(x, y, x, y + 2, cS); const q = h(x, f, 502); if (q < 0.1) rect(x + 1, y, x + 11, y + 2, cL); else if (q > 0.95 && !z) rect(x + 1, y, x + 11, y + 2, cD); else if (q > 0.6 && q < 0.68) { pset(x + 3, y + 1, cS); pset(x + 7, y + 1, cS); } } }
    rect(0, 86, 319, 86, P.zocL); rect(0, 87, 319, 87, P.zocD); rect(0, 115, 319, 117, P.zocD); rect(0, 115, 319, 115, K);
    // los ventanales: el marco, el cielo tramado y los tejados de enfrente (las nubes y los travesaños van en cada fotograma)
    VENT.forEach((x0, v) => {
      rect(x0 - 3, 20, x0 + 73, 61, K); rect(x0 - 2, 21, x0 + 72, 60, P.viga); rect(x0 - 2, 21, x0 + 72, 21, P.vigaL); e_degr(R, x0, 23, x0 + 70, 58, [P.cieloA, P.cieloB, P.cieloC]);
      for (let k = 0; k < 9; k++) { const bx = x0 + k * 8, bh = 5 + Math.floor(h(k, v, 503) * 11); rect(bx, 58 - bh, Math.min(x0 + 70, bx + 7), 58, k % 2 ? P.lejos : P.lejosS); rect(bx, 58 - bh, Math.min(x0 + 70, bx + 7), 58 - bh, P.cieloC);
        for (let y = 61 - bh; y < 57; y += 3) for (let i = 1; i < 7; i += 2) if (bx + i <= x0 + 70 && h(bx + i, y, 504) < 0.4) pset(bx + i, y, hex('#f4e8b0')); }
      if (v === 1) { rect(x0 + 30, 36, x0 + 40, 43, P.lejosS); rect(x0 + 30, 36, x0 + 40, 36, P.lejos); poligono([[x0 + 29, 36], [x0 + 42, 36], [x0 + 35, 31]], P.lejosS); rect(x0 + 31, 44, x0 + 31, 50, P.lejosS); rect(x0 + 39, 44, x0 + 39, 50, P.lejosS); }
      if (v === 0) { rect(x0 + 50, 38, x0 + 53, 52, P.lejosS); rect(x0 + 49, 38, x0 + 54, 39, hex('#a85a4a')); }
      rect(x0 - 4, 61, x0 + 74, 63, K); rect(x0 - 3, 61, x0 + 73, 62, P.muroL);
    });
    // el sol de los ventanales en la pared y en el suelo se pinta al final (cuando ya está el suelo)
    // lo que cuelga de la pared: tuberías, el cuadro eléctrico, la balda de botes de tinta, el tablón, el extintor
    rect(150, 66, 319, 68, K); rect(150, 66, 319, 66, P.tuboL); rect(150, 67, 319, 67, P.tubo); for (let x = 164; x < 320; x += 30) { rect(x, 65, x + 1, 69, K); pset(x, 66, C.metalL); }
    rect(264, 68, 266, 114, K); rect(265, 68, 265, 114, P.tubo); rect(263, 96, 267, 98, K); pset(265, 97, C.rojo);
    e_caja(R, 154, 70, 164, 84, C.metalS, C.metalL, C.metalD); rect(158, 73, 160, 78, K); pset(159, 74, C.metalL); rect(156, 81, 162, 82, P.amar);
    rect(170, 82, 216, 83, K); rect(170, 82, 216, 82, P.estL); for (const x of [173, 213]) linea(x, 84, x - 2, 88, K);
    [[hex('#1c1c24'), hex('#50505c')], [hex('#2a6ab8'), hex('#6aa8e8')], [hex('#1c1c24'), hex('#50505c')], [hex('#c8562a'), hex('#f0946a')], [hex('#d8d0c0'), C.blanco], [hex('#1c1c24'), hex('#50505c')]].forEach(([c, l], k) => { const x = 172 + k * 7 + (k > 3 ? 2 : 0); rect(x, 75 - (k % 2), x + 5, 81, K); rect(x + 1, 76 - (k % 2), x + 4, 80, c); rect(x + 1, 76 - (k % 2), x + 1, 80, l); rect(x + 1, 78, x + 4, 78, C.papel); });
    e_caja(R, 222, 70, 252, 86, hex('#b88a54'), hex('#d0a46c'), hex('#94683a'));
    [[225, 72, 8, 6], [235, 73, 7, 9], [244, 72, 6, 5], [226, 80, 6, 4], [244, 79, 6, 5]].forEach(([x, y, w, a], k) => { rect(x, y, x + w - 1, y + a - 1, k === 3 ? hex('#f4e060') : C.blanco); for (let j = 1; j < a - 1; j += 2) rect(x + 1, y + j, x + w - 2 - (j % 3), y + j, C.grisL); pset(x + (w >> 1), y, C.rojo); });
    rect(308, 92, 314, 109, K); rect(309, 95, 313, 108, C.rojo); rect(309, 95, 309, 108, hex('#e86a5a')); rect(310, 92, 312, 94, C.metalD); rect(310, 100, 312, 102, C.papel); linea(313, 93, 316, 97, K);
    // el suelo de cemento: moteado, juntas en perspectiva, manchas de aceite, recortes de papel y la raya de seguridad
    rect(0, 118, 319, 179, P.suelo); rect(0, 118, 319, 119, P.sueloS);
    for (let i = 0; i < 900; i++) { const x = Math.floor(h(i, 1, 505) * 320), y = 120 + Math.floor(h(i, 2, 505) * 60); pset(x, y, i % 3 ? P.sueloS : P.sueloL); if (i % 5 === 0) pset(x + 1, y, i % 3 ? P.sueloS : P.sueloL); }
    for (const y of [126, 136, 149, 165]) for (let x = 0; x < 320; x++) if (h(x, y, 506) > 0.12) pset(x, y, P.sueloS);
    for (let k = -3; k <= 11; k++) linea(k * 40, 119, Math.round(160 + (k * 40 - 160) * 1.9), 179, P.sueloS);
    for (const [x, y, r] of [[96, 162, 7], [188, 170, 9], [40, 172, 5], [214, 156, 4], [284, 168, 6]]) for (let j = -r; j <= r; j++) { const w = Math.round(Math.sqrt(r * r - j * j) * 1.8), yy = y + Math.round(j * 0.4); for (let x2 = x - w; x2 <= x + w; x2++) if (h(x2, yy, 507) > 0.2) pset(x2, yy, P.mancha); }
    for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 1, 508) * 300) + 8, y = 152 + Math.floor(h(k, 2, 508) * 26); rect(x, y, x + 2, y, C.blanco); pset(x + 1, y - 1, P.muroL); pset(x + 3, y + 1, P.sueloS); }
    for (let y = 150; y <= 151; y++) for (let x = 0; x < 160; x++) pset(x, y, ((x + y) >> 2) % 2 ? P.amar : hex('#2a2a30'));
    rect(120, 170, 136, 175, K); for (let x = 122; x < 136; x += 2) rect(x, 171, x, 174, P.sueloS);
    // el sol de los ventanales: un haz tramado que baja por la pared y se tiende en el suelo, con la sombra de los travesaños
    VENT.forEach((x0) => { for (let y = 64; y < 150; y++) { const d = Math.round((y - 64) * (y < 118 ? 0.45 : 0.45 + (y - 118) * 0.02)), m = y < 118 ? 0.2 : 0.26;
      for (let x = x0 + 4 + d; x <= x0 + 66 + d; x++) { const u = (x - x0 - 4 - d) % 21; if (u < 2) continue; if (((x + y) & 1) === 0 || (y > 118 && u > 3 && u < 19)) e_tinte(R, x, y, P.luz, m); } } });
    // LA PRENSA. El zócalo con franjas de peligro, el alimentador con su pila de papel, el cuerpo esmaltado con remaches,
    // la boca (los cilindros van en cada fotograma), los tinteros de arriba y la salida
    for (let x = 2; x < 158; x++) for (let y = 147; y <= 149; y++) if ((x + y) & 1) e_tinte(R, x, y, K, 0.5);
    rect(6, 138, 152, 147, K); rect(7, 139, 151, 146, P.maqD); rect(7, 139, 151, 139, P.maqS); for (let y = 142; y <= 145; y++) for (let x = 7; x < 152; x++) if (((x + y) >> 2) % 2) pset(x, y, P.amar);
    rect(8, 96, 10, 138, K); pset(9, 97, C.metalL); rect(9, 98, 9, 137, C.metalS); rect(33, 96, 36, 138, K); rect(34, 98, 34, 137, C.metalS);
    rect(10, 108, 33, 138, K); rect(11, 109, 32, 137, C.blanco); for (let y = 110; y < 138; y += 2) rect(11, y, 32, y, hex('#d4d0c4')); rect(11, 109, 12, 137, hex('#fffdf4'));
    poligono([[36, 70], [40, 65], [126, 65], [131, 70], [131, 139], [36, 139]], K); poligono([[37, 71], [41, 66], [125, 66], [130, 71], [130, 138], [37, 138]], P.maq);
    rect(41, 66, 125, 66, P.maqL); rect(37, 71, 37, 137, P.maqL); rect(129, 72, 129, 137, P.maqS); rect(38, 136, 129, 137, P.maqS);
    for (let x = 42; x < 128; x += 8) { pset(x, 69, P.maqL); pset(x, 70, P.maqS); pset(x, 134, P.maqL); pset(x, 135, P.maqS); } for (let y = 76; y < 134; y += 8) { pset(40, y, P.maqL); pset(40, y + 1, P.maqS); pset(127, y, P.maqL); pset(127, y + 1, P.maqS); }
    rect(45, 77, 121, 125, K); rect(46, 78, 120, 124, P.int); for (let x = 54; x < 120; x += 13) rect(x, 79, x, 123, hex('#242a36')); rect(46, 78, 120, 79, hex('#0e1016'));
    rect(54, 56, 112, 66, K); rect(55, 57, 111, 65, P.maqS); rect(55, 57, 111, 57, P.maqL); [K, hex('#2a6ab8'), K, hex('#c8562a')].forEach((c, k) => { rect(60 + k * 13, 52, 66 + k * 13, 57, K); rect(61 + k * 13, 53, 65 + k * 13, 56, k % 2 ? c : hex('#3a3a46')); pset(61 + k * 13, 53, C.grisL); rect(62 + k * 13, 60, 64 + k * 13, 62, c === K ? hex('#50505c') : c); });
    rect(130, 104, 152, 139, K); rect(131, 105, 151, 138, P.maq); rect(131, 105, 151, 105, P.maqL); rect(150, 106, 150, 137, P.maqS); rect(134, 129, 151, 135, K); rect(135, 130, 151, 134, P.int);
    rect(134, 110, 148, 124, K); rect(135, 111, 147, 123, P.maqS); for (let y = 113; y < 123; y += 2) rect(137, y, 145, y, P.maqD);
    // la placa (barras, sin letras), el triángulo de aviso, los botones y la palanca
    rect(96, 127, 118, 134, K); rect(97, 128, 117, 133, C.oroS); rect(98, 129, 110, 129, C.oroL); rect(98, 131, 114, 131, C.oroL); pset(116, 129, C.oroL);
    poligono([[44, 136], [49, 127], [54, 136]], K); poligono([[46, 135], [49, 129], [52, 135]], P.amar); rect(49, 131, 49, 132, K); pset(49, 134, K);
    rect(58, 127, 90, 135, K); rect(59, 128, 89, 134, hex('#22262e')); disco(63.5, 131.5, 2, hex('#3aa85a')); disco(70.5, 131.5, 2, C.rojo); pset(63, 130, hex('#8ae0a0')); pset(70, 130, hex('#f09a8a'));
    rect(38, 96, 39, 110, K); disco(38.5, 95.5, 2, C.rojo);
    // la cinta: patas, travesaño y rodillos de los extremos
    for (const x of [158, 216]) { rect(x, 142, x + 2, 149, K); rect(x + 1, 142, x + 1, 148, C.metalL); } rect(160, 145, 216, 145, K);
    rect(150, 137, 226, 142, K); rect(151, 138, 225, 138, C.metalL); rect(151, 139, 225, 141, C.metalS);
    // la encuadernadora: columna con el depósito de cola, la garganta (la prensa va en cada fotograma), el volante y la rampa
    for (let x = 222; x < 264; x++) for (let y = 148; y <= 150; y++) if ((x + y) & 1) e_tinte(R, x, y, K, 0.5);
    rect(224, 108, 260, 149, K); rect(225, 109, 259, 148, P.maq2); rect(225, 109, 259, 109, P.maq2L); rect(225, 109, 225, 148, P.maq2L); rect(258, 110, 258, 148, P.maq2S); rect(225, 144, 259, 148, P.maq2S);
    rect(228, 84, 256, 108, K); rect(229, 85, 255, 107, P.maq2); rect(229, 85, 255, 85, P.maq2L); rect(254, 86, 254, 107, P.maq2S); for (let y = 89; y < 106; y += 6) { pset(231, y, P.maq2L); pset(252, y, P.maq2L); }
    rect(236, 88, 248, 96, K); rect(237, 89, 247, 95, hex('#22262e'));
    rect(229, 112, 255, 136, K); rect(230, 113, 254, 135, P.int); rect(230, 113, 254, 114, hex('#0e1016'));
    rect(233, 76, 245, 84, K); rect(234, 77, 244, 83, C.metalS); rect(234, 77, 235, 83, C.metalL); rect(236, 79, 242, 80, hex('#e8c888'));
    rect(228, 139, 238, 145, K); rect(229, 140, 237, 144, hex('#22262e')); rect(244, 139, 256, 145, K); rect(245, 140, 255, 144, C.oroS); rect(246, 141, 252, 141, C.oroL); rect(246, 143, 254, 143, C.oroL);
    poligono([[260, 128], [270, 141], [270, 145], [260, 138]], K); poligono([[260, 130], [269, 142], [269, 144], [260, 137]], C.metalS); linea(260, 130, 269, 142, C.metalL);
    // el palé
    for (let x = 262; x < 320; x++) for (let y = 151; y <= 153; y++) if ((x + y) & 1) e_tinte(R, x, y, K, 0.5);
    rect(262, 147, 318, 151, K); rect(263, 148, 317, 148, P.pale); rect(263, 149, 317, 150, P.paleS); for (const x of [263, 287, 311]) rect(x, 149, x + 5, 150, P.pale); for (const x of [270, 294]) rect(x, 149, x + 15, 150, K);
  }));
  // por los ventanales: nubes de tres tonos a tres velocidades, humo de la chimenea, un pájaro; y encima los travesaños
  VENT.forEach((x0, v) => {
    R.recorte([x0, 23, x0 + 70, 58]); const lejos = (x, y) => { const c = R.pget(x, y); return c === P.cieloA || c === P.cieloB || c === P.cieloC || c === P.nube || c === P.nubeS || c === P.nubeL; };
    for (const [bx, y, w, vel] of [[20, 31, 20, 2.2], [150, 37, 28, 1.3], [250, 30, 16, 3.1], [90, 43, 16, 1.8]]) e_nube(R, ((bx + t * vel) % 330 + 330) % 330 - 30, y, w, lejos);
    if (v === 0) for (let k = 0; k < 7; k++) { const u = (t * 0.25 + k / 7) % 1, sx = Math.round(x0 + 52 + u * 9 + Math.sin(t + k) * 1.5), sy = Math.round(37 - u * 15); if (lejos(sx, sy)) { pset(sx, sy, hex('#e8e4dc')); if (u > 0.3) pset(sx + 1, sy, hex('#d0ccc8')); } }
    { const u = ((t + v * 4) % 13) / 5; if (u < 1) { const bx = Math.round(330 - u * 340), by = 29 + v * 3 + Math.round(Math.sin(t * 2) * 2), a = Math.sin(t * 10) > 0 ? -1 : 0; pset(bx, by, K); pset(bx - 1, by + a, K); pset(bx + 1, by + a, K); pset(bx - 2, by + a * 2, K); pset(bx + 2, by + a * 2, K); } }
    R.recorte(null);
    for (let x = x0 + 17; x < x0 + 70; x += 18) rect(x, 23, x, 58, P.viga); for (const y of [34, 46]) rect(x0, y, x0 + 70, y, P.viga);
    for (let k = 0; k < 10; k++) { pset(x0 + 3 + k, 33 - k, hex('#e8f4fc')); pset(x0 + 40 + k, 57 - k, hex('#e8f4fc')); }
  });
  e_reloj(R, 290, 78, 7, t, 9.4);
  pset(159, 72, Math.floor(t * 1.5) % 2 ? hex('#6ae080') : hex('#2a6a3a'));
  e_polvo(R, t, 24, 64, 80, 146, 9, 1, 0.45); e_polvo(R, t, 196, 64, 250, 146, 8, 2, 0.45);
  // el operario del fondo (pequeño, 12 px), que va y viene con su carro de papel junto a la pared
  if (o.operario !== false) { const u = (t % 20) / 20, para = (u >= 0.42 && u < 0.5) || u >= 0.92, x = Math.round(u < 0.42 ? lerp(160, 208, u / 0.42) : u < 0.5 ? 208 : u < 0.92 ? lerp(208, 160, (u - 0.5) / 0.42) : 160), d = u < 0.5 ? 1 : -1;
    e_obrero(R, x, 124, t, d, !para); }
  // la prensa en marcha: la hoja de arriba del alimentador, la banda de papel con sus marcas, los rodillos de tinta, los
  // tres cilindros, el volante con su correa, el manómetro y los pilotos
  { const v = Math.round(Math.sin(t * 31) * 0.4), u = (t * 1.6) % 1;
    rect(12 + Math.round(u * 22), 107 - (u < 0.2 ? 1 : 0), 34 + Math.round(u * 6), 107 - (u < 0.2 ? 1 : 0), C.blanco); rect(20, 104, 24, 106, K); rect(21, 102, 23, 104, C.metalS); pset(22, 107 - (u < 0.5 ? 0 : 1), hex('#c84a3a'));
    R.recorte([46, 78, 120, 124]);
    const WEB = [[46, 108], [58, 92], [74, 99], [88, 110], [100, 100], [112, 96], [120, 116]];
    for (let i = 0; i + 1 < WEB.length; i++) { const [ax, ay] = WEB[i], [bx, by] = WEB[i + 1], Lg = Math.hypot(bx - ax, by - ay); linea(ax, ay, bx, by, C.blanco); linea(ax, ay + 1, bx, by + 1, hex('#c8c4b8'));
      for (let s = (t * 34 + i * 3) % 6; s < Lg; s += 6) { const q = s / Lg; pset(Math.round(lerp(ax, bx, q)), Math.round(lerp(ay, by, q)), K); } }
    for (let k = 0; k < 5; k++) { const x = 56 + k * 13, a = t * 9 * (k % 2 ? -1 : 1); disco(x + 0.5, 84.5, 3.6, K); disco(x + 0.5, 84.5, 2.6, k === 1 ? hex('#2a6ab8') : k === 3 ? hex('#c8562a') : hex('#3a3a46')); pset(x + Math.round(Math.cos(a) * 2), 84 + Math.round(Math.sin(a) * 2), C.grisL); pset(x - 1, 83, C.gris); }
    e_cilindro(R, 62, 108 + v, 12, t * 5); e_cilindro(R, 88, 98, 11, -t * 5.4 + 1); e_cilindro(R, 108, 110 + v, 10, t * 6 + 2);
    R.recorte(null);
    // el volante y la correa hasta el motor
    linea(133, 84, 136, 112, K); linea(149, 84, 146, 112, K); for (let s = (t * 22) % 5; s < 28; s += 5) { pset(133 + Math.round(s * 3 / 28), 84 + Math.round(s), C.gris); pset(149 - Math.round(s * 3 / 28), 112 - Math.round(s), C.gris); }
    disco(141.5, 84.5, 10, K); disco(141.5, 84.5, 9, hex('#a83a2c')); disco(141.5, 84.5, 7, P.maqD); disco(141.5, 84.5, 6.2, P.muroS);
    for (let k = 0; k < 5; k++) { const a = t * 7 + k * 1.2566; linea(141, 84, 141 + Math.cos(a) * 7, 84 + Math.sin(a) * 7, hex('#a83a2c')); } disco(141.5, 84.5, 2.4, K); pset(141, 84, C.metalL); pset(137, 78, hex('#e87a6a'));
    disco(141.5, 117.5, 4, K); disco(141.5, 117.5, 3, C.metalS); pset(141 + Math.round(Math.cos(t * 14) * 2), 117 + Math.round(Math.sin(t * 14) * 2), C.metalL);
    // el manómetro y los pilotos
    disco(116.5, 71.5, 4.6, K); disco(116.5, 71.5, 3.6, C.blanco); { const a = Math.PI * 1.3 + Math.sin(t * 11) * 0.12 + Math.sin(t * 0.9) * 0.3; linea(116, 72, 116 + Math.cos(a) * 3, 72 + Math.sin(a) * 3, C.rojo); }
    for (let k = 0; k < 4; k++) pset(77 + k * 3, 131, Math.floor(t * 3 + k) % 4 === 0 ? hex('#fff0a0') : [hex('#3aa85a'), hex('#e8c030'), hex('#3aa85a'), hex('#c83a3a')][k]);
    // el pliego que sale por la boca hacia la cinta
    { const q = (t * 0.9) % 1; rect(136 + Math.round(q * 12), 132, 147 + Math.round(q * 4), 133, C.blanco); }
  }
  // la cinta: las marcas que corren y los pliegos impresos (blancos con su mancha de texto) que van a la encuadernadora
  for (let x = 151 + Math.floor(t * 18) % 6; x < 226; x += 6) pset(x, 140, C.metalD);
  for (let k = 0; k < 4; k++) { const x = Math.round(150 + ((k * 21 + t * 18) % 84)); if (x > 216) continue; rect(x, 133, x + 11, 137, K); rect(x + 1, 134, x + 10, 136, C.blanco); rect(x + 2, 135, x + 5, 135, C.grisL); rect(x + 7, 135, x + 9, 135, C.grisL); rect(x + 1, 134, x + 10, 134, hex('#fffdf4')); }
  // la encuadernadora: la prensa baja sobre el libro, el piloto, el vapor de la cola y el volante de la derecha
  { const u = (t * 0.9) % 1, baja = u < 0.5 ? Math.sin(u * 2 * Math.PI) ** 2 : 0, py = Math.round(116 + baja * 10);
    rect(240, 114, 244, py, C.metalD); rect(241, 114, 242, py, C.metalL); rect(232, py, 252, py + 3, K); rect(233, py + 1, 251, py + 2, C.metal); rect(233, py + 1, 251, py + 1, C.metalL);
    rect(232, 133, 252, 135, C.metalS); { const bx = u < 0.5 ? 236 : Math.round(236 + (u - 0.5) * 44); if (bx < 246) e_libroPlano(R, bx, 132, 0); else if (bx < 262) e_libroPlano(R, bx, 132 + Math.round((bx - 250) * 0.5), 0); }
    for (let k = 0; k < 3; k++) pset(239 + k * 3, 92, Math.floor(t * 2.2 + k) % 3 === 0 ? hex('#fff0a0') : k === 2 ? C.rojo : hex('#3aa85a')); rect(238, 94, 238 + Math.round(4 + Math.sin(t * 2) * 3), 94, hex('#6ae080'));
    for (let k = 0; k < 6; k++) { const q = (t * 0.4 + k / 6) % 1, sx = Math.round(239 + Math.sin(t * 1.3 + k * 2) * 2 + q * 3), sy = Math.round(75 - q * 14); if (q < 0.85) pset(sx, sy, q < 0.4 ? C.blanco : hex('#d8d4cc')); if (q < 0.4) pset(sx + 1, sy, hex('#e8e4dc')); }
    for (let k = 0; k < 4; k++) pset(230 + Math.floor((t * 5 + k * 2)) % 8, 142, hex('#6ae080')); }
  // la pila de libros recién encuadernados sobre el palé (o.pila)
  const n = Math.round(Math.max(0, Math.min(1, o.pila ?? 0.5)) * 56); let cima = 147;
  for (let k = 0; k < n; k++) { const col = k % 4, fila = Math.floor(k / 4), x = 265 + col * 13 + ((fila + col) % 3 === 0 ? 1 : 0), y = 146 - fila * 3; e_libroPlano(R, x, y, k + fila); cima = y - 3; }
  // las tres lámparas, que se mecen, y su luz en el suelo
  [78, 160, 246].forEach((x, k) => { e_lampara(R, x, 11, 24 + (k % 2) * 3, t, k); });
  return { suelo: 154, prensa: [6, 56, 152, 147], cinta: [150, 137, 226], encuadernadora: [224, 76, 260, 149], pale: [264, 147, 316], cimaPila: cima, libre: [150, 262] };
}

// lo de delante en la imprenta: el palé de resmas envueltas y el cajón de libros
function e_imprentaDelante(R, t, o) {
  const { rect, pset } = R, K = C.k, P = e_P;
  rect(0, 174, 48, 179, K); rect(0, 175, 47, 176, P.pale); rect(0, 177, 47, 179, P.paleS); for (const x of [10, 30]) rect(x, 177, x + 8, 179, K);
  [[0, 166, 22], [24, 166, 21], [4, 158, 24], [29, 159, 15]].forEach(([x, y, w], k) => { rect(x, y, x + w, y + 8, K); rect(x + 1, y + 1, x + w - 1, y + 7, k % 2 ? hex('#c8a878') : hex('#b89868')); rect(x + 1, y + 1, x + w - 1, y + 1, hex('#e0c498')); rect(x + (w >> 1) - 1, y + 1, x + (w >> 1), y + 7, C.blanco); rect(x + 3, y + 4, x + 6, y + 5, C.papel); if (k > 1) pset(x + w - 3, y + 3, hex('#94784c')); });
  rect(266, 162, 319, 179, K); rect(267, 163, 319, 179, hex('#a8804a')); rect(267, 163, 319, 164, hex('#c89e62')); for (const y of [169, 175]) rect(267, y, 319, y, hex('#7a5a30')); for (let x = 272; x < 320; x += 11) { pset(x, 166, hex('#7a5a30')); pset(x, 172, hex('#7a5a30')); }
  for (let k = 0; k < 4; k++) { const x = 269 + k * 13; rect(x, 157, x + 11, 162, K); rect(x + 1, 158, x + 10, 162, C.libro); rect(x + 1, 158, x + 10, 158, hex('#2e3a78')); rect(x + 2, 159, x + 3, 162, C.duna); pset(x + 6, 160, C.oroL); }
  rect(282, 168, 302, 174, K); rect(283, 169, 301, 173, C.papel); for (let k = 0; k < 3; k++) rect(285 + k * 6, 170, 288 + k * 6, 172, k === 1 ? C.libro : C.grisS);
  return {};
}

// la calle de 1965 que se ve por el escaparate y la puerta de la librería (todo con pset: se recorta al hueco rc)
function e_calle65(R, t, rc) {
  const P = e_P, K = C.k; R.recorte(rc);
  e_degr(R, rc[0], rc[1], rc[2], 56, [P.cieloA, P.cieloB, P.cieloC]); e_nube(R, ((30 + t * 1.6) % 150) - 20, 46, 18);
  // la fachada de enfrente: ladrillo, ventanas con cortina, el toldo de rayas y su tienda; un árbol que se mece
  e_r(R, rc[0], 50, rc[2], 83, P.fach); for (let y = 52; y < 72; y += 3) for (let x = rc[0]; x <= rc[2]; x++) if ((x + (y % 2) * 3) % 6 === 0 || h(x, y, 520) < 0.06) R.pset(x, y, P.fachS);
  e_r(R, rc[0], 49, rc[2], 50, hex('#e0d0b0'));
  for (let x = 4; x < 112; x += 12) { e_r(R, x, 54, x + 6, 63, K); e_r(R, x + 1, 55, x + 5, 62, (x / 12 | 0) % 3 === 1 ? hex('#f4e8b0') : P.vid); e_r(R, x + 1, 55, x + 2, 62, (x / 12 | 0) % 2 ? hex('#e8e0d0') : hex('#c85a5a')); e_r(R, x, 64, x + 6, 64, hex('#e0d0b0')); }
  for (let x = rc[0]; x <= rc[2]; x++) { const a = ((x + 200) / 5 | 0) % 2; e_r(R, x, 69, x, 72 + ((x + 200) % 5 === 2 ? 1 : 0), a ? hex('#c83a3a') : hex('#f4ecdc')); }
  e_r(R, rc[0], 74, rc[2], 82, hex('#3a2a2a')); for (let x = 6; x < 112; x += 22) { e_r(R, x, 75, x + 16, 81, hex('#f0d890')); e_r(R, x + 2, 78, x + 5, 81, hex('#c85a5a')); e_r(R, x + 8, 77, x + 10, 81, hex('#4a8a8a')); e_r(R, x + 12, 79, x + 14, 81, hex('#e89848')); }
  { const sw = Math.round(Math.sin(t * 1.3) * 1); e_r(R, 40, 70, 41, 84, hex('#5a3a22')); R.disco(41 + sw, 64, 6, C.hierbaS); R.disco(39 + sw, 62, 4, C.hierba); R.disco(43 + sw, 61, 2.4, C.hierbaL); }
  // la acera de enfrente con paseantes, y la calzada con los coches
  e_r(R, rc[0], 83, rc[2], 86, P.acera); e_r(R, rc[0], 86, rc[2], 86, P.aceraS); e_r(R, rc[0], 87, rc[2], 103, P.asf); for (let x = rc[0]; x <= rc[2]; x++) { if (((x + 100) / 5 | 0) % 2) R.pset(x, 93, P.raya); if (h(x, 3, 521) < 0.2) R.pset(x, 89 + Math.floor(h(x, 4, 521) * 10), P.asfS); }
  for (let k = 0; k < 3; k++) { const d = k % 2 ? 1 : -1, x = ((k * 53 + t * (5 + k * 1.5) * d) % 150 + 150) % 150 - 14; e_peaton(R, x, 86, t, k + 2, d); }
  { const x = 130 - ((t * 26) % 210); e_coche60(R, Math.round(x), 92, -1, hex('#4a8ab8'), t); const x2 = ((t * 32 + 60) % 240) - 40; e_coche60(R, Math.round(x2), 99, 1, hex('#c8563a'), t); }
  R.recorte(null);
}

// LA LIBRERÍA (libros, encuadre 'imprenta', cámara 'libreria')
function e_libreria(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = e_P;
  R.copiar(e_buf(R, 'libreria', () => {
    // el techo con su moldura de dentículos y la pared empapelada a rayas con motivo
    rect(0, 0, 319, 17, P.techoC); for (let x = 0; x < 270; x += 40) rect(x, 0, x, 17, P.techoS); rect(0, 8, 268, 8, P.techoS);
    rect(0, 18, 319, 18, hex('#e0c498')); rect(0, 19, 319, 20, P.mold); rect(0, 21, 319, 21, hex('#94784c')); for (let x = 2; x < 266; x += 5) rect(x, 19, x + 1, 20, hex('#a8885c'));
    rect(0, 22, 319, 118, P.empap); rect(266, 0, 270, 43, P.mold); rect(266, 0, 266, 43, hex('#e0c498')); rect(270, 0, 270, 43, hex('#94784c')); for (let x = 3; x < 264; x += 8) { rect(x, 22, x, 118, P.empapS); for (let y = 26 + (x % 16 ? 5 : 0); y < 118; y += 10) { pset(x + 4, y, P.empapL); pset(x + 3, y + 1, P.empapL); pset(x + 5, y + 1, P.empapL); pset(x + 4, y + 2, P.empapL); } }
    // el suelo de tablas: juntas más separadas cuanto más cerca, testas alternadas, vetas y clavos
    rect(0, 118, 319, 179, P.tabla); { const YS = [118, 122, 127, 133, 140, 148, 157, 167, 180];
      for (let f = 0; f + 1 < YS.length; f++) { const y0 = YS[f], y1 = YS[f + 1] - 1; if (y0 > 118) rect(0, y0, 319, y0, P.tablaD); rect(0, y0 + 1, 319, y0 + 1, P.tablaL);
        for (let x = Math.floor(h(f, 1, 530) * 60) - 20; x < 320; x += 50 + Math.floor(h(x, f, 531) * 40)) { rect(x, y0, x, y1, P.tablaD); pset(x + 2, y0 + 2, P.tablaD); pset(x - 2, y0 + 2, P.tablaD); if (h(x, f, 532) < 0.5) rect(x + 1, y0 + 1, Math.min(319, x + 40), y1, e_mez(P.tabla, P.tablaS, 0.45)); }
        for (let g = 0; g < 5; g++) { const gy = y0 + 2 + Math.floor(h(f, g, 533) * Math.max(1, y1 - y0 - 2)); let x = -Math.floor(h(f, g, 534) * 30); while (x < 320) { const L = 10 + Math.floor(h(x, gy, 535) * 30); if (gy <= y1 && h(x, g, 536) < 0.6) rect(Math.max(0, x), gy, Math.min(319, x + L), gy, g % 2 ? P.tablaS : P.tablaL); x += L + 6 + Math.floor(h(x, gy, 537) * 18); } } } }
    rect(0, 115, 111, 117, P.est); rect(0, 115, 111, 115, P.estL); rect(0, 118, 111, 118, K);
    // la pared del escaparate: el marco, las vidrieras de colores de arriba, el alféizar y el zócalo de cuarterones
    rect(4, 30, 80, 104, K); rect(5, 31, 79, 103, P.est); rect(5, 31, 79, 31, P.estL); rect(8, 33, 76, 101, K); rect(9, 34, 75, 40, hex('#2a2030'));
    for (let k = 0; k < 11; k++) { const c = [hex('#d8a030'), hex('#3a8a6a'), hex('#b8442c'), hex('#3a6ab8')][k % 4]; rect(9 + k * 6 + (k > 0 ? 1 : 0), 34, 14 + k * 6, 40, c); pset(10 + k * 6 + (k > 0 ? 1 : 0), 35, e_mez(c, C.blanco, 0.5)); }
    rect(9, 41, 75, 41, K); rect(2, 104, 82, 107, K); rect(3, 105, 81, 105, P.estL); rect(3, 106, 81, 106, P.est);
    for (let k = 0; k < 3; k++) e_cuarteron(R, 6 + k * 25, 109, 28 + k * 25, 114, P.est, P.estL, P.estS, P.estS, k);
    // la puerta: marco, cristal, cuarterón, pomo y el felpudo
    rect(82, 38, 110, 118, K); rect(83, 39, 109, 117, P.estL); rect(85, 41, 107, 117, K); rect(86, 42, 106, 117, hex('#8a3a2c')); rect(86, 42, 106, 42, hex('#b85a44')); rect(87, 45, 105, 86, K);
    e_cuarteron(R, 89, 91, 103, 113, hex('#8a3a2c'), hex('#b85a44'), hex('#5e2218'), hex('#742c20'), 7); disco(104.5, 89.5, 1.6, C.oro); pset(104, 89, C.oroL);
    poligono([[80, 119], [112, 119], [116, 124], [76, 124]], K); poligono([[82, 120], [110, 120], [113, 123], [79, 123]], hex('#6a5a3a')); for (let x = 81; x < 112; x += 3) pset(x, 121 + (x % 2), hex('#8a7a52'));
    // la estantería: cornisa, montantes, baldas con su canto de luz, el fondo oscuro y los libros
    rect(110, 44, 319, 118, K); rect(111, 45, 319, 117, P.estF); rect(110, 43, 319, 46, K); rect(111, 44, 319, 44, P.estL); rect(111, 45, 319, 45, P.est);
    const BAL = [66, 83, 100, 116], MON = [111, 163, 215, 267];
    BAL.forEach((yb, f) => MON.forEach((x0, b) => { const xa = x0 + 3, xb = (MON[b + 1] ?? 320) - 1;
      if (f === 1 && b === 1) { for (let k = 0; k < 4; k++) e_portada(R, xa + 1 + k * 12, yb - 14, 10, 14, k + 3); }
      else if (f === 0 && b === 0) { e_lomos(R, xa, xa + 20, yb, 13, 1); disco(xa + 31.5, yb - 7.5, 5.6, K); disco(xa + 31.5, yb - 7.5, 4.6, hex('#4a8ab8')); disco(xa + 30, yb - 9, 2, hex('#6aa85a')); pset(xa + 34, yb - 6, hex('#6aa85a')); pset(xa + 33, yb - 5, hex('#6aa85a')); rect(xa + 29, yb - 1, xa + 34, yb, C.oroS); rect(xa + 31, yb - 2, xa + 32, yb - 2, C.oroS); e_lomos(R, xa + 40, xb, yb, 12, 2); }
      else if (f === 2 && b === 2) { e_lomos(R, xa, xa + 14, yb, 13, 5); for (let k = 0; k < 2; k++) e_portada(R, xa + 18 + k * 13, yb - 14, 11, 14, k * 3 + 1); e_lomos(R, xa + 44, xb, yb, 11, 6); }
      else if (f === 3) e_lomos(R, xa, xb, yb - 1, 13, 30 + b);
      else e_lomos(R, xa, xb, yb, 10 + ((f + b) % 3) * 2, f * 4 + b + 10);
      rect(x0, 46, x0 + 2, 117, K); rect(x0 + 1, 46, x0 + 1, 117, P.est); }));
    BAL.forEach((yb, f) => { rect(111, yb + 1, 319, yb + 2, K); rect(111, yb + 1, 319, yb + 1, P.estL); if (f < 3) for (let x = 120; x < 316; x += 52) { rect(x + 14, yb + 1, x + 22, yb + 2, C.papel); pset(x + 16, yb + 2, C.rojo); rect(x + 18, yb + 2, x + 20, yb + 2, C.grisS); } for (let x = 114; x < 320; x++) if ((x & 1) && R.pget(x, yb + 3) === P.estF) pset(x, yb + 3, K); });
    for (const x0 of MON) { rect(x0, 46, x0 + 2, 117, K); rect(x0 + 1, 46, x0 + 1, 117, P.estL); }
    // encima de la estantería: una caja de sombreros, una pila tumbada y la hiedra que cuelga
    rect(124, 36, 142, 43, K); rect(125, 37, 141, 42, hex('#c8a878')); rect(125, 37, 141, 38, hex('#e0c498')); rect(132, 37, 133, 42, hex('#8a3a2c'));
    for (let k = 0; k < 3; k++) { rect(182 + k, 40 - k * 3, 200 - k, 43 - k * 3, K); rect(183 + k, 41 - k * 3, 199 - k, 42 - k * 3, e_LOMOS[k * 3 + 1]); }
    rect(236, 37, 246, 43, K); rect(237, 38, 245, 42, hex('#b8562a')); for (let k = 0; k < 16; k++) { const lx = 232 + Math.floor(h(k, 1, 540) * 20), ly = 30 + Math.floor(h(k, 2, 540) * 22); pset(lx, ly, k % 2 ? C.hierba : C.hierbaS); pset(lx + 1, ly, C.hierbaS); if (ly > 44) pset(lx, ly - 1, C.hierbaS); }
    // la escalera corredera con su raíl
    rect(111, 48, 276, 48, C.oroS); for (const dx of [0, 9]) { linea(232 + dx, 119, 240 + dx, 49, K); linea(233 + dx, 119, 241 + dx, 49, P.tablaL); } for (let y = 56; y < 118; y += 9) { const ox = Math.round((119 - y) * 8 / 70); rect(233 + ox, y, 241 + ox, y, K); rect(233 + ox, y - 1, 241 + ox, y - 1, P.tablaL); }
    // la alfombra, bajo la mesa central: cenefa, rombos y flecos
    poligono([[112, 143], [226, 143], [240, 165], [98, 165]], K); poligono([[114, 144], [224, 144], [237, 164], [101, 164]], P.alf);
    for (let y = 146; y < 163; y++) { const d = Math.round((y - 144) * 0.65); pset(116 - d, y, P.alfL); pset(222 + d, y, P.alfL); } rect(117, 146, 221, 146, P.alfL); rect(106, 162, 232, 162, P.alfL);
    for (let j = 0; j < 3; j++) for (let x = 124 - j * 3; x < 220 + j * 3; x += 12 + j) { const y = 150 + j * 4; pset(x, y, P.alfL); pset(x - 1, y + 1, P.alfS); pset(x + 1, y + 1, P.alfS); pset(x, y + 2, P.alfL); pset(x + 6, y + 1, hex('#3a6a8a')); }
    for (let x = 100; x < 240; x += 3) pset(x, 166, hex('#e0d0a0'));
    // el sol del escaparate en el suelo, con la sombra de la cruz
    for (let y = 119; y < 152; y++) { const d = Math.round((y - 119) * 0.9); for (let x = 12 + d; x <= 70 + d; x++) { if (Math.abs(x - d - 42) < 2) continue; if (((x + y) & 1) === 0 || y % 4 !== 0) e_tinte(R, x, y, P.luz, 0.3); } }
    // la mesa de novedades: tablero, faldón, patas torneadas, su sombra y las pilas de libros con uno de cara
    for (let x = 12; x < 100; x++) for (let y = 150; y <= 152; y++) if ((x + y) & 1) e_tinte(R, x, y, K, 0.45);
    for (const x of [16, 90]) { rect(x, 139, x + 4, 151, K); rect(x + 1, 139, x + 2, 150, P.estL); rect(x + 3, 139, x + 3, 150, P.est); rect(x - 1, 144, x + 5, 145, K); }
    rect(12, 131, 98, 137, K); rect(13, 132, 97, 134, P.tablaL); rect(13, 132, 97, 132, hex('#e8c488')); rect(13, 135, 97, 136, P.est); rect(14, 138, 96, 141, K); rect(15, 138, 95, 140, P.est); rect(15, 140, 95, 140, P.estS);
    [[17, 4, 2], [31, 6, 5], [45, 3, 8], [72, 5, 0], [85, 4, 3]].forEach(([x, n, c]) => { for (let j = 0; j < n; j++) { const cc = e_LOMOS[(c + (j > n - 2 ? 0 : j)) % e_LOMOS.length], y = 131 - j * 3, dx = (j * 7 + x) % 3 - 1; rect(x + dx, y - 3, x + dx + 11, y, K); rect(x + dx + 1, y - 2, x + dx + 10, y - 1, cc); rect(x + dx + 1, y - 2, x + dx + 10, y - 2, e_mez(cc, C.blanco, 0.3)); pset(x + dx + 3, y - 1, C.oroL); pset(x + dx + 10, y - 1, C.papel); } });
    e_portada(R, 58, 116, 11, 15, 4); rect(57, 130, 69, 131, K);
    // LA MESA CENTRAL: tablero claro y despejado, mantel verde con pliegues y galón dorado
    for (let x = 128; x < 210; x++) for (let y = 151; y <= 153; y++) if ((x + y) & 1) e_tinte(R, x, y, K, 0.5);
    rect(133, 137, 203, 151, K); rect(134, 137, 202, 150, P.mantel); for (let x = 138; x < 202; x += 7) rect(x, 139, x, 150, P.mantelS); for (let x = 141; x < 202; x += 7) rect(x, 140, x, 148, hex('#3e6e5a'));
    rect(134, 148, 202, 148, C.oroS); for (let x = 135; x < 202; x += 2) pset(x, 149, C.oro);
    rect(130, 131, 206, 138, K); rect(131, 132, 205, 136, P.mesaL); rect(131, 132, 205, 132, C.blanco); rect(131, 137, 205, 137, P.mesaS); for (let x = 134; x < 204; x += 4) pset(x, 135, P.mesaS);
  }));
  // la calle, por el escaparate y por el cristal de la puerta
  e_calle65(R, t, [9, 42, 75, 100]); e_calle65(R, t, [88, 46, 104, 85]);
  // el escaparate por dentro: la cruz del marco, los libros expuestos de espaldas en sus atriles, el gato y el reflejo
  rect(42, 42, 42, 100, K); rect(9, 68, 75, 68, K);
  [[12, 9, 4], [23, 8, 1], [33, 9, 6]].forEach(([x, w, k]) => { rect(x, 88, x + w, 100, K); rect(x + 1, 89, x + w - 1, 99, e_mez(e_LOMOS[k], K, 0.35)); rect(x + 1, 89, x + 1, 99, e_mez(e_LOMOS[k], K, 0.1)); });
  for (let j = 0; j < 3; j++) { rect(46, 97 - j * 3, 57, 100 - j * 3, K); rect(47, 98 - j * 3, 56, 99 - j * 3, e_mez(e_LOMOS[j + 6], K, 0.3)); }
  { const cx = 66, cy = 96, r = Math.sin(t * 1.6) > 0.6 ? 1 : 0; disco(cx, cy, 4.6, K); rect(cx - 6, cy - 1, cx + 5, cy + 4, K); disco(cx - 5, cy - 2, 3, K); pset(cx - 7, cy - 5 - r, K); pset(cx - 4, cy - 5, K); pset(cx - 7, cy - 4, K);
    const a = Math.sin(t * 2.2) * 2; linea(cx + 5, cy + 3, cx + 8 + Math.round(a * 0.5), cy + 6, K); linea(cx + 8 + Math.round(a * 0.5), cy + 6, cx + 7 + Math.round(a), cy + 9, K); rect(cx - 3, cy - 2, cx + 2, cy - 2, hex('#3a3040')); }
  for (let k = 0; k < 12; k++) { e_tinte(R, 14 + k, 62 - k, C.blanco, 0.45); e_tinte(R, 17 + k, 62 - k, C.blanco, 0.3); e_tinte(R, 50 + k, 96 - k, C.blanco, 0.3); }
  // el cristal de la puerta: el cartelito colgado (un sol: abierto) y la campanilla, que tiembla
  rect(95, 46, 96, 50, K); rect(91, 51, 101, 59, K); rect(92, 52, 100, 58, C.blanco); disco(96.5, 55.5, 2, hex('#e8a030')); pset(96, 52, hex('#e8a030')); pset(93, 55, hex('#e8a030')); pset(99, 55, hex('#e8a030'));
  { const b = Math.round(Math.sin(t * 7) * (((t % 9) < 1.2) ? 1.5 : 0.2)); linea(104, 38, 104 + b, 42, K); rect(102 + b, 42, 106 + b, 45, K); rect(103 + b, 42, 105 + b, 44, C.oro); pset(103 + b, 42, C.oroL); pset(104 + b, 46, C.oroS); }
  // el reloj de péndulo sobre la puerta
  rect(90, 22, 102, 36, K); rect(91, 23, 101, 35, P.est); rect(91, 23, 101, 23, P.estL); disco(96.5, 27.5, 3.6, hex('#f4eeda')); linea(96, 27, 96 + Math.round(Math.cos(t / 30 - 1.57) * 2), 27 + Math.round(Math.sin(t / 30 - 1.57) * 2), K); linea(96, 27, 98, 26, K);
  { const a = Math.round(Math.sin(t * 3.14) * 2); linea(96, 31, 96 + a, 34, C.oroS); pset(96 + a, 34, C.oroL); }
  // el móvil de planetas, que gira despacio
  linea(221, 0, 221, 9, C.grisS); rect(211, 9, 231, 9, K);
  [[-10, 6, hex('#e89848'), 2.6, 1], [0, 9, hex('#4a8ab8'), 2, 0], [10, 5, hex('#f4ecd0'), 1.8, 0]].forEach(([dx, ly, c, r, an], k) => { const x = 221 + Math.round(dx * Math.cos(t * 0.5 + k * 0.4)), y = 10 + ly + Math.round(Math.sin(t * 1.1 + k) * 0.6); linea(221 + Math.round(dx * Math.cos(t * 0.5 + k * 0.4)), 10, x, y - 2, C.grisS); disco(x + 0.5, y + 0.5, r + 1, K); disco(x + 0.5, y + 0.5, r, c); pset(x - 1, y - 1, C.blanco); if (an) for (let i = -4; i <= 4; i++) pset(x + i, y + (i > 1 ? -1 : i < -1 ? 1 : 0), hex('#f8d090')); });
  // las tres lámparas de globo, con su halo: ninguna en x 20–170, que es la barra del año (la cifra baja hasta y 24)
  [9, 186, 256].forEach((x, k) => { linea(x, 0, x, 11, K); rect(x - 2, 11, x + 2, 12, C.oroS); disco(x + 0.5, 17.5, 5.6, K); disco(x + 0.5, 17.5, 4.6, hex('#fff4c8')); disco(x - 0.5, 16, 2, C.blanco); const f = Math.sin(t * 2.3 + k * 2) > 0.92 ? 0.1 : 0.2;
    for (let j = -11; j <= 13; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j * 1.1); if (d > 6.4 && d < 14 && ((x + i + 17 + j) & 1) === 0 && 17 + j > 0) e_tinte(R, x + i, 17 + j, hex('#fff0c0'), f * (1 - d / 14) * 2); } });
  e_polvo(R, t, 14, 104, 70, 150, 8, 3, 0.9);
  // sobre la mesa central: el panel claro de la novedad (detrás de la pila) y la pizarrita del precio, vacía
  if (o.panel !== false) { rect(140, 128, 141, 132, K); rect(169, 128, 170, 132, K); rect(136, 103, 174, 129, K); rect(137, 104, 173, 128, C.oroS); rect(138, 105, 172, 127, hex('#f4ecd8')); rect(138, 105, 172, 105, C.blanco); rect(138, 127, 172, 127, hex('#d8ccb0'));
    for (const [x, y] of [[141, 108], [169, 108], [141, 124], [169, 124]]) pset(x, y, C.oro); const g = Math.sin(t * 1.7) > 0.8; e_estrella(R, 155.5, 100.5, 3.4, K); e_estrella(R, 155.5, 100.5, 2.4, g ? C.oroL : C.oro); }
  if (o.cartel !== false) { poligono([[177, 135], [203, 135], [201, 122], [179, 122]], K); poligono([[178, 134], [202, 134], [200, 123], [180, 123]], hex('#262a38')); rect(180, 123, 200, 123, hex('#4a5066')); rect(178, 134, 202, 134, hex('#14161e')); }
  return { suelo: 154, mesa: [155, 135], precio: [181, 132], panel: [138, 105, 172, 127], tablero: [132, 132, 204, 136], novedades: [14, 131, 96], escaparate: [9, 42, 75, 100], puerta: [84, 108, 118], estanteria: [112, 46, 319, 118], mostrador: [236, 138, 319], dependiente: [246, 146], libre: [[98, 128], [208, 232]] };
}
// lo de delante en la librería: el mostrador con la caja registradora y el cesto de saldos
function e_libreriaDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = e_P;
  // el mostrador: tablero con su vuelo y su brillo, frente de cuarterones y rodapié
  rect(238, 142, 319, 179, K); rect(239, 143, 319, 179, P.est); rect(239, 143, 319, 144, P.estS);
  for (let k = 0; k < 3; k++) e_cuarteron(R, 243 + k * 26, 148, 264 + k * 26, 172, P.est, P.estL, P.estS, P.estS, 20 + k); rect(239, 175, 319, 179, P.estS); rect(239, 175, 319, 175, K);
  rect(235, 137, 319, 142, K); rect(236, 138, 319, 139, P.tablaL); rect(236, 138, 319, 138, hex('#e8c488')); rect(236, 140, 319, 141, P.est);
  { const g = ((t * 0.25) % 2) * 84; if (g < 78) rect(238 + Math.round(g), 138, 243 + Math.round(g), 138, C.blanco); }
  // la caja registradora de latón: el visor con sus cifras, las teclas en filas, la manivela y el cajón
  rect(290, 124, 316, 138, K); rect(291, 125, 315, 137, hex('#b8862c')); rect(291, 125, 315, 125, hex('#f0cc6a')); rect(291, 125, 291, 137, hex('#e0b048')); rect(314, 126, 315, 137, hex('#8a5e1a'));
  poligono([[292, 124], [314, 124], [311, 115], [295, 115]], K); poligono([[294, 123], [312, 123], [310, 116], [296, 116]], hex('#c89a38')); rect(297, 117, 309, 121, K); rect(298, 118, 308, 120, hex('#f4eeda'));
  for (let k = 0; k < 3; k++) { rect(299 + k * 3, 118, 300 + k * 3, 120, K); pset(299 + k * 3, 119, hex('#f4eeda')); } pset(304, 120, K);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { const kx = 293 + i * 3 + (j % 2), ky = 127 + j * 3; rect(kx, ky, kx + 1, ky + 1, K); pset(kx, ky, (i + j) % 5 === 0 ? C.rojo : hex('#f4eeda')); }
  rect(291, 135, 315, 137, hex('#8a5e1a')); rect(301, 136, 305, 136, hex('#f0cc6a')); linea(316, 128, 319, 126, K); linea(319, 126, 319, 131, K); disco(319, 132, 1.6, hex('#8a3a2c'));
  // la lámpara de banquero con su luz, y el timbre en la esquina; el sitio de quien atiende (x 244–266) queda despejado
  rect(273, 135, 281, 137, K); rect(274, 135, 280, 136, C.oro); rect(276, 127, 277, 135, C.oroS); poligono([[269, 128], [285, 128], [282, 122], [272, 122]], K); poligono([[271, 127], [283, 127], [281, 123], [273, 123]], hex('#2e7a52')); rect(273, 123, 280, 123, hex('#5aa87a')); rect(272, 128, 282, 128, hex('#fff4c8'));
  for (let y = 129; y < 137; y++) for (let x = 269 - (y - 129); x <= 285 + (y - 129); x++) if (((x + y) & 1) === 0 && x < 290 && x > 267) e_tinte(R, x, y, hex('#fff0c0'), 0.28 + (Math.sin(t * 2.7) > 0.95 ? -0.1 : 0));
  rect(236, 135, 243, 137, K); disco(239.5, 134.5, 3.4, K); disco(239.5, 134.5, 2.4, C.oro); pset(238, 133, C.oroL); pset(239, 130, K);
  // el cesto de saldos, abajo a la izquierda, con libros de canto
  poligono([[0, 164], [40, 164], [36, 179], [0, 179]], K); poligono([[0, 165], [39, 165], [35, 179], [0, 179]], hex('#b8904c')); for (let y = 167; y < 180; y += 3) for (let x = (y % 2) * 2; x < 38; x += 4) pset(x, y, hex('#8a6a30')); rect(0, 165, 39, 165, hex('#d8b470'));
  [[2, 9, 2], [9, 12, 0], [15, 8, 4], [21, 11, 8], [28, 9, 6]].forEach(([x, a, c]) => { rect(x, 164 - a, x + 6, 164, K); rect(x + 1, 165 - a, x + 5, 164, e_LOMOS[c]); rect(x + 1, 165 - a, x + 1, 164, e_mez(e_LOMOS[c], C.blanco, 0.3)); rect(x + 2, 167 - a, x + 4, 167 - a, C.oroL); });
  rect(12, 146, 22, 153, K); rect(13, 147, 21, 152, hex('#f4e060')); R.icono('estrella', 14, 147, C.rojo, hex('#f4e060'), 1); rect(17, 153, 17, 156, K);
  return {};
}

// una estrella de cinco puntas rellena, de radio r
function e_estrella(R, cx, cy, r, c, rot = -Math.PI / 2) {
  const pts = []; for (let k = 0; k < 10; k++) { const a = rot + k * Math.PI / 5, rr = k % 2 ? r * 0.42 : r; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } R.poligono(pts, c);
}

// una araña de salón colgada en (x, y 0–36): cadena, cuerpo dorado, dos pisos de brazos con velas que tiemblan y cristales
function e_arana(R, x, t, k = 0) {
  const K = C.k;
  for (let y = 0; y < 14; y++) R.pset(x, y, y % 3 ? C.oroS : C.oro);
  R.rect(x - 2, 14, x + 2, 17, K); R.rect(x - 1, 15, x + 1, 16, C.oro); R.rect(x - 1, 18, x + 1, 30, K); R.rect(x, 18, x, 30, C.oro); R.disco(x + 0.5, 31.5, 3, K); R.disco(x + 0.5, 31.5, 2, C.oro); R.pset(x, 30, C.oroL); R.pset(x, 35, hex('#bfe8ff'));
  for (const [dx, y] of [[-15, 24], [-8, 21], [8, 21], [15, 24]]) {
    const s = Math.sign(dx); for (let i = 1; i <= Math.abs(dx); i++) { const yy = y + 4 - Math.round(Math.sin(i / Math.abs(dx) * Math.PI / 2) * 4) + (i < 3 ? 1 : 0); R.pset(x + s * i, yy + 1, K); R.pset(x + s * i, yy, C.oro); }
    R.rect(x + dx - 1, y - 3, x + dx + 1, y + 1, K); R.rect(x + dx, y - 2, x + dx, y, hex('#f4eeda')); const f = Math.sin(t * 13 + dx + k * 3) > 0.2 ? 1 : 0;
    R.pset(x + dx, y - 4 - f, hex('#fff0a0')); R.pset(x + dx, y - 3, hex('#ffb040')); R.pset(x + dx, y + 3, hex('#bfe8ff')); R.pset(x + dx, y + 5, Math.sin(t * 3 + dx + k) > 0.6 ? C.blanco : hex('#8ac0e0'));
    for (let j = -7; j <= 3; j++) for (let i = -5; i <= 5; i++) if (i * i + j * j < 26 && i * i + j * j > 2 && ((x + dx + i + y + j) & 1) === 0 && y + j > 11) e_tinte(R, x + dx + i, y - 3 + j, hex('#ffe8a0'), 0.16);
  }
  for (let i = -12; i <= 12; i += 4) R.pset(x + i, 28 + (Math.abs(i) > 6 ? 1 : 3), Math.sin(t * 2.4 + i + k) > 0.7 ? C.blanco : hex('#8ac0e0'));
}

// un centro de flores en su jarrón (base en x, y): helechos que se mecen y flores de colores
function e_flores(R, x, y, t, k = 0) {
  const K = C.k; R.poligono([[x - 5, y], [x + 5, y], [x + 3, y - 10], [x - 3, y - 10]], K); R.poligono([[x - 4, y - 1], [x + 4, y - 1], [x + 2, y - 9], [x - 2, y - 9]], hex('#d8dce8')); R.rect(x - 2, y - 8, x - 2, y - 2, C.blanco); R.rect(x - 3, y - 6, x + 3, y - 5, hex('#4a6ab8'));
  for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.3 + Math.sin(t * 1.1 + i + k) * 0.04, L = 12 + (i % 3) * 3; for (let s = 0; s < L; s++) { const fx = Math.round(x + Math.cos(a) * s + Math.sign(i - 4) * s * s * 0.02), fy = Math.round(y - 10 + Math.sin(a) * s); R.pset(fx, fy, s % 2 ? C.pino : hex('#3a7a4a')); if (s % 3 === 0) R.pset(fx + 1, fy, hex('#5a9a5a')); } }
  [[-6, -20, 0], [5, -22, 1], [0, -25, 2], [-3, -16, 1], [7, -16, 0], [-9, -14, 2], [3, -18, 0]].forEach(([dx, dy, c]) => { const col = [hex('#f4ecd0'), hex('#e87a9a'), hex('#f4c040')][c]; R.disco(x + dx + 0.5, y + dy + 0.5, 1.8, col); R.pset(x + dx, y + dy, c === 2 ? hex('#c87a20') : hex('#f4e060')); });
}

// LA SALA DE PREMIOS (libros, encuadre 'premios', cámara general)
function e_premios(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = e_P, foco = o.foco ?? 160;
  R.copiar(e_buf(R, o.atril === false ? 'premiosSinAtril' : 'premios', () => {
    // el techo artesonado y la cornisa dorada
    rect(0, 0, 319, 8, P.nogalS); for (let x = 0; x < 320; x += 32) { rect(x, 0, x, 8, hex('#38200f')); rect(x + 1, 1, x + 30, 1, P.nogalV); } rect(0, 9, 319, 9, hex('#38200f')); rect(0, 10, 319, 10, P.nogalL);
    // el telón de fondo, de terciopelo azul noche con pliegues, más claro abajo; estrellas fijas
    rect(28, 11, 267, 104, P.telon); for (let x = 30; x < 266; x += 9) { rect(x, 11, x + 1, 104, P.telonS); rect(x + 4, 11, x + 4, 104, hex('#20285a')); }
    for (let y = 70; y < 105; y++) for (let x = 28; x < 268; x++) if (e_tr(x, y) < (y - 70) / 60) pset(x, y, e_mez(R.pget(x, y), P.telonL, 0.6));
    for (let k = 0; k < 60; k++) { const x = 60 + Math.floor(h(k, 1, 550) * 180), y = 24 + Math.floor(h(k, 2, 550) * 70); pset(x, y, k % 4 ? hex('#8a94c8') : hex('#e8ecff')); }
    // el emblema: corona de laurel dorada y una estrella
    for (let k = 0; k < 26; k++) { const a = Math.PI * 0.62 + k / 25 * Math.PI * 1.76, x = Math.round(152 + Math.cos(a) * 17), y = Math.round(50 + Math.sin(a) * 17), x2 = Math.round(152 + Math.cos(a) * 20), y2 = Math.round(50 + Math.sin(a + 0.1) * 20), x3 = Math.round(152 + Math.cos(a) * 14), y3 = Math.round(50 + Math.sin(a + 0.1) * 14);
      pset(x, y, C.oroS); if (k % 2 === 0) { linea(x, y, x2, y2, C.oro); pset(x2, y2, C.oroL); linea(x, y, x3, y3, C.oro); } }
    e_estrella(R, 152.5, 50.5, 11, K); e_estrella(R, 152.5, 50.5, 9.4, C.oro); e_estrella(R, 151.5, 49.5, 5, C.oroL); rect(146, 68, 158, 70, K); rect(147, 69, 157, 69, C.oro);
    // las paredes de nogal con cuarterones, las pilastras estriadas del escenario y el zócalo
    // (a la derecha el paño de nogal es más ancho, x 274–319, y hasta y 50 va liso, con la veta muy suave y sin molduras
    // ni apliques: es la esquina de Atom; la embocadura acaba en la pilastra de x 268–273)
    rect(274, 11, 319, 129, P.nogal); for (let y = 11; y <= 50; y++) for (let x = 274; x < 320; x++) if (h(x >> 1, y >> 2, 549) < 0.1) pset(x, y, e_mez(P.nogal, P.nogalS, 0.35));
    e_cuarteron(R, 276, 54, 317, 100, P.nogal, P.nogalL, P.nogalS, P.nogalV, 5); rect(274, 103, 319, 104, P.nogalL); rect(274, 105, 319, 129, P.nogalS); e_cuarteron(R, 296, 108, 317, 126, P.nogalS, P.nogal, hex('#38200f'), P.nogalV, 6);
    for (const [xa, xb, k] of [[0, 25, 0]]) { rect(xa, 11, xb, 129, P.nogal); e_cuarteron(R, xa + 2, 14, xb - 2, 60, P.nogal, P.nogalL, P.nogalS, P.nogalV, k); e_cuarteron(R, xa + 2, 64, xb - 2, 100, P.nogal, P.nogalL, P.nogalS, P.nogalV, k + 1); rect(xa, 103, xb, 104, P.nogalL); rect(xa, 105, xb, 129, P.nogalS); e_cuarteron(R, xa + 2, 108, xb - 2, 126, P.nogalS, P.nogal, hex('#38200f'), P.nogalV, k + 2); }
    for (const x of [26, 268]) { rect(x, 11, x + 5, 118, hex('#38200f')); rect(x + 1, 11, x + 4, 117, P.nogal); rect(x + 1, 46, x + 1, 117, P.nogalL); rect(x + 3, 16, x + 3, 112, P.nogalS); rect(x, 113, x + 5, 117, C.oroS); rect(x, 114, x + 5, 114, C.oro); }
    // las cortinas granates recogidas con cordones dorados, y la bambalina con festones y flecos
    for (const s of [1, -1]) { const X = (d) => (s > 0 ? 32 + d : 267 - d);
      for (let y = 20; y <= 104; y++) { const w = y < 74 ? Math.round(34 - (y - 20) * 0.37) : Math.round(14 + (y - 74) * 0.3); for (let d = 0; d <= w; d++) { const u = d / Math.max(1, w), f = Math.floor(u * 5 + 0.5) % 2; pset(X(d), y, d === w ? K : (d + Math.floor(y / 30)) % 4 === 0 ? P.tercS : f ? P.terc : (d % 4 === 2 && !(s < 0 && y < 46 && d < 12) ? P.tercL : P.terc)); } }
      for (let d = 0; d <= 15; d++) { pset(X(d), 73, K); pset(X(d), 74, C.oro); pset(X(d), 75, C.oroS); pset(X(d), 76, K); } for (let j = 0; j < 7; j++) { pset(X(12), 77 + j, C.oro); pset(X(13), 77 + j, j > 3 ? C.oroL : C.oroS); } pset(X(12), 84, C.oroL); }
    for (let x = 26; x <= 273; x++) { const u = ((x - 26) % 31) / 31, b = 21 + Math.round(Math.sin(u * Math.PI) * 4); for (let y = 11; y <= b; y++) pset(x, y, y === b ? C.oroS : (x - 26) % 31 < 2 ? P.tercS : ((x + Math.floor(u * 6)) % 5 === 0 ? P.tercS : y < 13 ? P.tercL : P.terc)); const calma = x < 48; pset(x, b + 1, x % 2 ? (calma ? P.tercS : C.oro) : K); if (x % 2 && !calma) pset(x, b + 2, C.oroS); }
    for (let x = 57; x <= 243; x += 31) { rect(x - 1, 21, x + 1, 27, K); pset(x, 22, C.oroL); rect(x, 23, x, 26, C.oro); }
    // las tablas del escenario en perspectiva, el canto y el frente de cuarterones
    rect(26, 105, 293, 118, P.escen); rect(26, 105, 293, 105, P.escenS); for (const y of [108, 112]) for (let x = 26; x < 294; x++) if (h(x, y, 551) > 0.15) pset(x, y, P.escenS);
    for (let k = -8; k <= 8; k++) linea(160 + k * 17, 105, 160 + k * 21, 118, P.escenS); for (let i = 0; i < 90; i++) { const x = 28 + Math.floor(h(i, 1, 552) * 262), y = 106 + Math.floor(h(i, 2, 552) * 12); rect(x, y, x + 3 + (i % 4), y, i % 2 ? P.escenL : P.escenS); }
    rect(26, 118, 293, 119, K); rect(26, 118, 293, 118, P.escenL); rect(26, 120, 293, 129, P.nogal); for (let k = 0; k < 9; k++) e_cuarteron(R, 29 + k * 29.5, 121, 54 + k * 29.5, 128, P.nogal, P.nogalL, P.nogalS, P.nogalV, 30 + k);
    // la moqueta de la sala: dibujo de rombos, más separados cuanto más cerca
    rect(0, 130, 319, 179, P.moq); rect(0, 130, 319, 131, P.moqS);
    for (let r = 0; r < 11; r++) { const y = 133 + Math.round(r * 3.4 + r * r * 0.32); if (y > 177) break; const paso = 12 + r * 2, off = (r % 2) * (paso >> 1); for (let x = off; x < 320; x += paso) { pset(x, y, P.moqL); pset(x - 1, y + 1, P.moqL); pset(x + 1, y + 1, P.moqL); pset(x, y + 2, P.moqL); pset(x, y + 1, hex('#c8a050')); } }
    for (let i = 0; i < 500; i++) pset(Math.floor(h(i, 1, 553) * 320), 131 + Math.floor(h(i, 2, 553) * 48), i % 2 ? P.moqS : hex('#522a48'));
    // la escalerilla del escenario, a la izquierda
    for (let k = 0; k < 3; k++) { rect(34 - k * 2, 120 + k * 4, 62 + k * 2, 123 + k * 4, K); rect(35 - k * 2, 120 + k * 4, 61 + k * 2, 120 + k * 4, P.escenL); rect(35 - k * 2, 121 + k * 4, 61 + k * 2, 122 + k * 4, P.escenS); }
    // el atril (de perfil, mirando a la sala) con su micrófono
    if (o.atril !== false) { for (let x = 138; x < 164; x++) if (x & 1) pset(x, 117, P.escenS);
      rect(144, 102, 156, 116, K); rect(145, 103, 155, 115, P.nogal); e_cuarteron(R, 146, 104, 154, 113, P.nogal, P.nogalL, P.nogalS, P.nogalV, 44); rect(142, 115, 158, 117, K); rect(143, 115, 157, 115, P.nogalL);
      poligono([[141, 103], [159, 103], [159, 99], [141, 101]], K); poligono([[142, 102], [158, 102], [158, 100], [142, 101]], P.nogalL); e_estrella(R, 150.5, 108.5, 3, C.oro);
      linea(156, 99, 159, 92, K); rect(158, 89, 161, 92, K); rect(159, 90, 160, 91, C.metalL); }
    // la mesa de los trofeos: tablero, mantel blanco con pliegues y un galón dorado
    for (let x = 196; x < 250; x++) if (x & 1) pset(x, 117, P.escenS);
    rect(200, 102, 244, 116, K); rect(201, 102, 243, 115, P.mantelB); for (let x = 204; x < 243; x += 6) { rect(x, 104, x, 115, P.mantelBS); pset(x + 1, 115, P.mantelBD); } rect(201, 112, 243, 112, C.oro); rect(201, 113, 243, 113, C.oroS);
    rect(197, 98, 247, 102, K); rect(198, 99, 246, 100, P.mantelB); rect(198, 101, 246, 101, P.mantelBS);
  }));
  // las estrellas que titilan y los dos recortables colgados (un planeta con anillo y una luna), que se mecen
  for (let k = 0; k < 14; k++) { const x = 60 + Math.floor(h(k, 3, 554) * 180), y = 24 + Math.floor(h(k, 4, 554) * 66), s = Math.sin(t * 2.6 + k * 1.9); if (s > 0.55) { pset(x, y, C.blanco); if (s > 0.85) { pset(x - 1, y, hex('#8a94c8')); pset(x + 1, y, hex('#8a94c8')); pset(x, y - 1, hex('#8a94c8')); pset(x, y + 1, hex('#8a94c8')); } } }
  { const a = Math.round(Math.sin(t * 0.9) * 1.6), b = Math.round(Math.sin(t * 0.8 + 2) * 1.6);
    linea(104, 26, 104 + a, 40, hex('#5a6498')); disco(104.5 + a, 46.5, 7, K); disco(104.5 + a, 46.5, 6, hex('#e09848')); disco(102.5 + a, 44.5, 3, hex('#f4c078')); for (let i = -10; i <= 10; i++) { const yy = 46 + Math.round(i * 0.3); if (Math.abs(i) > 6 || i * 0.3 > 0) { pset(104 + a + i, yy, hex('#f4ecd0')); pset(104 + a + i, yy + 1, K); } }
    linea(200, 26, 200 + b, 36, hex('#5a6498')); disco(200.5 + b, 42.5, 6, K); disco(200.5 + b, 42.5, 5, hex('#f4ecd0')); disco(203 + b, 41, 4.2, P.telon); pset(197 + b, 44, hex('#c8c0a0')); }
  // las arañas, los apliques de las paredes y las candilejas
  e_arana(R, 92, t, 0); e_arana(R, 228, t, 1);
  for (const [x, k] of [[12, 0], [307, 1]]) { rect(x - 3, 74, x + 3, 80, K); rect(x - 2, 75, x + 2, 79, C.oro); pset(x - 1, 76, C.oroL); for (const dx of [-4, 4]) { rect(x + dx - 1, 68, x + dx + 1, 74, K); rect(x + dx, 69, x + dx, 73, hex('#f4eeda')); const f = Math.sin(t * 12 + dx + k * 4) > 0 ? 1 : 0; pset(x + dx, 67 - f, hex('#fff0a0')); pset(x + dx, 68, hex('#ffb040')); }
    for (let j = -12; j <= 6; j++) for (let i = -10; i <= 10; i++) if (i * i + j * j < 110 && ((x + i + j) & 1) === 0) e_tinte(R, x + i, 68 + j, hex('#ffe8a0'), 0.2 * (1 - (i * i + j * j) / 110) + (Math.sin(t * 9 + k) > 0.9 ? 0.03 : 0)); }
  for (let x = 44; x < 290; x += 26) { rect(x - 3, 116, x + 3, 119, K); rect(x - 2, 117, x + 2, 118, C.oroS); pset(x, 117, Math.sin(t * 5 + x) > -0.6 ? hex('#fff0a0') : C.oro); for (let j = 1; j <= 6; j++) for (let i = -j; i <= j; i++) if (((x + i + j) & 1) === 0) e_tinte(R, x + i, 116 - j, hex('#fff0c0'), 0.2 - j * 0.025); }
  // los dos focos, que barren hacia o.foco, y su charco de luz en las tablas
  [[70, 0.7, 0], [250, 0.6, 2]].forEach(([fx, vel, fase]) => { const obj = foco + Math.sin(t * vel + fase) * 9;
    for (let y = 22; y <= 117; y += 1) { const u = (y - 11) / 106, cx = lerp(fx, obj, u), w = 2 + u * 15; for (let x = Math.ceil(cx - w); x <= cx + w; x++) if (((x + y) & 1) === 0) e_tinte(R, x, y, hex('#fff4d0'), 0.15); }
    rect(fx - 4, 10, fx + 4, 15, K); rect(fx - 3, 11, fx + 3, 14, C.metalD); const d = obj > fx ? 1 : -1; rect(fx - 1 + d, 15, fx + 1 + d, 17, K); pset(fx + d, 16, hex('#fff4c8')); });
  for (let y = 108; y <= 117; y++) for (let x = foco - 30; x <= foco + 30; x++) if (((x - foco) / 30) ** 2 + ((y - 113) / 5) ** 2 < 1 && ((x + y) & 1)) e_tinte(R, x, y, hex('#fff4d0'), 0.3);
  e_polvo(R, t, 110, 30, 210, 100, 10, 5, 0);
  // los centros de flores, a los lados del escenario
  e_flores(R, 76, 116, t, 0); e_flores(R, 283, 116, t, 1);
  return { suelo: 116, escenario: [28, 105, 291, 118], atril: [150, 99], micro: [160, 90], mesa: [222, 98], trofeos: [[212, 98], [234, 98]], foco, libre: [[86, 138], [164, 196]] };
}

// un espectador de espaldas sentado en su silla (cx: centro; y: coronilla; alto: hasta dónde baja); k elige pelo y traje;
// ap (0–1): aplaude con las manos en alto, a un lado de la cabeza
function e_espalda(R, cx, y, alto, t, k, ap) {
  const K = C.k, PELO = [hex('#3a2a1c'), hex('#1c1c24'), hex('#8a5a2a'), hex('#c8a050'), hex('#9a9aa8'), hex('#5a3418'), hex('#b0502c')], TRAJE = [hex('#22242e'), hex('#2a3458'), hex('#4a4a56'), hex('#2e6a62'), hex('#7a2a4a'), hex('#3a2a22'), hex('#c8a040'), hex('#34503c')];
  const pelo = PELO[k % PELO.length], tr = TRAJE[(k * 3 + 1) % TRAJE.length], mujer = k % 3 === 1, calvo = k % 7 === 4, bob = ap > 0 ? Math.round(Math.abs(Math.sin(t * 7 + k)) * 0.8) : (Math.sin(t * 0.7 + k * 2.3) > 0.9 ? 1 : 0);
  y += bob;
  // los hombros y la espalda, con el cuello de la camisa o el collar
  R.poligono([[cx - 8, y + alto], [cx - 8, y + 13], [cx - 5, y + 10], [cx + 6, y + 10], [cx + 9, y + 13], [cx + 9, y + alto]], K);
  R.poligono([[cx - 7, y + alto], [cx - 7, y + 13], [cx - 4, y + 11], [cx + 5, y + 11], [cx + 8, y + 13], [cx + 8, y + alto]], tr);
  for (let yy = y + 13; yy < y + alto; yy++) { R.pset(cx - 7, yy, e_mez(tr, C.blanco, 0.25)); R.pset(cx + 7, yy, e_mez(tr, K, 0.35)); } if (!mujer) R.rect(cx, y + 12, cx, y + alto - 1, e_mez(tr, K, 0.3));
  R.rect(cx - 2, y + 9, cx + 2, y + 10, K); R.rect(cx - 1, y + 9, cx + 1, y + 10, e_P.pielS); if (mujer) { for (let i = -3; i <= 3; i++) R.pset(cx + i, y + 11 + (Math.abs(i) < 2 ? 1 : 0), C.blanco); } else R.rect(cx - 3, y + 11, cx + 3, y + 11, C.blanco);
  // la cabeza por detrás: pelo corto, melena, moño o calva
  R.disco(cx + 0.5, y + 4.5, 5.4, K); R.disco(cx + 0.5, y + 4.5, 4.4, calvo ? e_P.piel : pelo); R.pset(cx - 2, y + 2, e_mez(calvo ? e_P.piel : pelo, C.blanco, 0.35)); R.pset(cx - 1, y + 1, e_mez(calvo ? e_P.piel : pelo, C.blanco, 0.35));
  if (calvo) { R.rect(cx - 4, y + 5, cx + 4, y + 7, PELO[4]); R.pset(cx - 4, y + 4, PELO[4]); R.pset(cx + 4, y + 4, PELO[4]); }
  else if (mujer && k % 2) { R.rect(cx - 5, y + 4, cx + 5, y + 10, K); R.rect(cx - 4, y + 4, cx + 4, y + 9, pelo); R.rect(cx + 3, y + 5, cx + 3, y + 9, e_mez(pelo, K, 0.3)); }
  else if (mujer) { R.disco(cx + 0.5, y - 0.5, 3, K); R.disco(cx + 0.5, y - 0.5, 2, pelo); R.rect(cx - 2, y + 8, cx + 2, y + 8, e_P.piel); }
  else { R.rect(cx - 3, y + 8, cx + 3, y + 8, e_P.piel); R.pset(cx - 5, y + 5, e_P.piel); R.pset(cx + 5, y + 5, e_P.piel); }
  // el respaldo de la silla, dorado, con sus barrotes
  { const y0 = y - bob + 16; if (y0 + 3 < y + alto) { R.rect(cx - 8, y0, cx + 9, y0 + 2, K); R.rect(cx - 7, y0, cx + 8, y0, C.oroL); R.rect(cx - 7, y0 + 1, cx + 8, y0 + 1, C.oroS); for (const dx of [-7, -2, 3, 8]) { R.rect(cx + dx - 1, y0 + 2, cx + dx + 1, y - bob + alto, K); R.rect(cx + dx, y0 + 2, cx + dx, y - bob + alto, C.oro); } } }
  // las manos, que aplauden a un lado
  if (ap > 0) { const j = Math.sin(t * 15 + k * 1.3) > 0 ? 1 : 0, s = k % 2 ? 1 : -1, hx = cx + s * 8, hy = y + 6; R.rect(hx - 2 - j, hy - 1, hx - j, hy + 2, K); R.rect(hx - 1 - j, hy, hx - 1 - j, hy + 1, e_P.piel); R.rect(hx + j, hy - 2, hx + 2 + j, hy + 1, K); R.rect(hx + 1 + j, hy - 1, hx + 1 + j, hy, e_P.piel); if (!j) { R.pset(hx, hy - 4, C.blanco); R.pset(hx - 3, hy - 3, C.blanco); R.pset(hx + 3, hy - 3, C.blanco); } }
}

// lo de delante en la sala de premios: las tres mesas redondas con su servicio y el público de espaldas, que aplaude
function e_premiosDelante(R, t, o) {
  const { rect, pset, disco } = R, K = C.k, P = e_P, ap = o.aplauso ?? 0.2;
  const aplaude = (k) => (h(k, 7, 560) < ap ? 1 : 0);
  [52, 160, 268].forEach((cx, m) => {
    // los dos de los lados (detrás del mantel)
    e_espalda(R, cx - 45, 140, 39, t, m * 5, aplaude(m * 5)); e_espalda(R, cx + 45, 141, 38, t, m * 5 + 1, aplaude(m * 5 + 1));
    // la mesa: el faldón con pliegues y el tablero elíptico con su sombra
    for (let y = 159; y <= 179; y++) { const w = 38 - Math.round((y - 159) * 0.12); for (let x = cx - w; x <= cx + w; x++) { const u = Math.abs(x - cx) / w; pset(x, y, u > 0.97 ? K : (x - cx + 40) % 9 === 0 ? P.mantelBD : (x - cx + 40) % 9 === 1 || u > 0.8 ? P.mantelBS : P.mantelB); } }
    for (let j = -7; j <= 7; j++) { const w = Math.round(39 * Math.sqrt(1 - (j / 7.5) ** 2)); for (let x = cx - w; x <= cx + w; x++) pset(x, 159 + j, Math.abs(x - cx) > w - 1 || Math.abs(j) === 7 ? K : j > 4 ? P.mantelBS : P.mantelB); }
    for (let x = cx - 30; x <= cx + 30; x += 3) pset(x, 164, P.mantelBD);
    // el servicio: platos, copas, la botella, la vela que tiembla y el centro de flores
    for (const dx of [-26, -9, 14, 28]) { for (let i = -4; i <= 4; i++) { pset(cx + dx + i, 158 + (dx % 2 ? 1 : -1), Math.abs(i) > 2 ? P.mantelBD : C.blanco); pset(cx + dx + i, 159 + (dx % 2 ? 1 : -1), P.mantelBS); } }
    for (const dx of [-18, 6, 22]) { rect(cx + dx, 150, cx + dx + 2, 153, hex('#bfe8ff')); pset(cx + dx, 150, C.blanco); rect(cx + dx, 152, cx + dx + 2, 153, dx === 6 ? hex('#e8d880') : hex('#a83a4a')); pset(cx + dx + 1, 154, hex('#8ac0e0')); pset(cx + dx + 1, 155, hex('#8ac0e0')); rect(cx + dx, 156, cx + dx + 2, 156, hex('#8ac0e0')); }
    rect(cx + 12, 144, cx + 15, 156, K); rect(cx + 13, 148, cx + 14, 155, hex('#2e6a4a')); rect(cx + 13, 145, cx + 14, 147, hex('#2e6a4a')); pset(cx + 13, 149, hex('#6aa87a')); rect(cx + 13, 151, cx + 14, 153, C.papel);
    { const f = Math.sin(t * 14 + m * 2) > 0.1 ? 1 : 0; rect(cx - 13, 149, cx - 11, 156, K); rect(cx - 12, 150, cx - 12, 155, hex('#f4eeda')); pset(cx - 12, 148 - f, hex('#fff0a0')); pset(cx - 12, 149, hex('#ffb040')); for (let j = -4; j <= 3; j++) for (let i = -4; i <= 4; i++) if (i * i + j * j < 17 && i * i + j * j > 1 && ((i + j) & 1) === 0) e_tinte(R, cx - 12 + i, 148 + j, hex('#ffe8a0'), 0.25); }
    disco(cx + 0.5, 151.5, 4, hex('#2e5a3c')); for (const [dx, dy, c] of [[-2, -3, 0], [2, -2, 1], [0, 0, 2], [-3, 1, 1], [3, 1, 0]]) { pset(cx + dx, 151 + dy, [hex('#e87a9a'), hex('#f4ecd0'), hex('#f4c040')][c]); pset(cx + dx + 1, 151 + dy, [hex('#e87a9a'), hex('#f4ecd0'), hex('#f4c040')][c]); } rect(cx - 2, 155, cx + 2, 157, hex('#d8dce8'));
    // los tres de este lado, de espaldas, por delante de la mesa
    for (let i = 0; i < 3; i++) { const k = m * 5 + 2 + i; e_espalda(R, cx - 22 + i * 22 + (i === 1 ? 0 : 0), 161 + (i === 1 ? 1 : 0), 19, t, k, aplaude(k)); }
  });
  return {};
}

// el autobús urbano de 1963 (118 × 36; x = borde de atrás, s = suelo de las ruedas; va hacia la derecha): crema y verde
// con su filete cromado, ventanillas con viajeros (uno lee una revista), el anuncio del costado (formas, sin letras),
// la puerta de delante (abre: de par en par) y las ruedas que giran
function e_bus(R, x, s, t, abre, gira) {
  const { rect, pset, disco, poligono } = R, K = C.k, P = e_P;
  for (let i = 2; i < 118; i++) for (let j = 0; j <= 2; j++) if ((x + i + j) & 1) e_tinte(R, x + i, s + j, K, 0.5);
  poligono([[x + 4, s - 36], [x + 110, s - 36], [x + 118, s - 27], [x + 118, s - 4], [x, s - 4], [x, s - 32]], K);
  poligono([[x + 5, s - 35], [x + 109, s - 35], [x + 117, s - 26], [x + 117, s - 19], [x + 1, s - 19], [x + 1, s - 31]], P.busC); rect(x + 1, s - 18, x + 116, s - 5, P.busV); rect(x + 1, s - 8, x + 116, s - 5, P.busVS);
  rect(x + 5, s - 35, x + 108, s - 35, C.blanco); rect(x + 1, s - 19, x + 116, s - 19, P.cromo); rect(x + 1, s - 18, x + 116, s - 18, C.grisS);
  // las ventanillas y los viajeros
  for (let k = 0; k < 7; k++) { const wx = x + 6 + k * 12; rect(wx, s - 32, wx + 10, s - 22, K); rect(wx + 1, s - 31, wx + 9, s - 23, P.vid); rect(wx + 1, s - 31, wx + 9, s - 30, P.vidL); pset(wx + 2, s - 28, P.vidL); pset(wx + 3, s - 29, P.vidL);
    if (k !== 2 && k !== 5) { const pelo = [hex('#3a2a1c'), hex('#c8a050'), hex('#1c1c24'), hex('#8a5a2a'), hex('#9a9aa8')][k % 5], hb = Math.sin(t * 1.3 + k * 2) > 0.85 ? 1 : 0; rect(wx + 3, s - 28 + hb, wx + 6, s - 25, P.piel); rect(wx + 3, s - 29 + hb, wx + 6, s - 28 + hb, pelo); pset(wx + 3, s - 27 + hb, pelo); rect(wx + 2, s - 24, wx + 7, s - 23, [hex('#3a4a7a'), hex('#8a3a3a'), hex('#5a6a4a'), hex('#4a3a5a')][k % 4]);
      if (k === 3) { rect(wx + 5, s - 26, wx + 8, s - 23, hex('#b83a2c')); pset(wx + 6, s - 25, hex('#f4e060')); pset(wx + 7, s - 24, C.blanco); } } }
  // el morro: parabrisas, el rótulo (un disco de color y barras), el faro y el parachoques
  poligono([[x + 104, s - 32], [x + 110, s - 32], [x + 116, s - 25], [x + 116, s - 21], [x + 104, s - 21]], K); poligono([[x + 105, s - 31], [x + 109, s - 31], [x + 115, s - 24], [x + 115, s - 22], [x + 105, s - 22]], P.vidL); pset(x + 107, s - 29, C.blanco); pset(x + 108, s - 28, C.blanco); rect(x + 105, s - 25, x + 108, s - 22, hex('#3a4a7a')); rect(x + 106, s - 27, x + 108, s - 26, P.piel); rect(x + 106, s - 28, x + 108, s - 28, hex('#2a3458'));
  rect(x + 113, s - 12, x + 117, s - 9, K); rect(x + 114, s - 11, x + 116, s - 10, hex('#fff0a0')); rect(x + 112, s - 6, x + 119, s - 4, K); rect(x + 113, s - 6, x + 118, s - 5, P.cromo); rect(x - 1, s - 6, x + 3, s - 4, K); rect(x, s - 6, x + 2, s - 5, P.cromo); rect(x + 1, s - 14, x + 2, s - 11, C.rojo);
  // la puerta de delante
  rect(x + 91, s - 33, x + 102, s - 5, K); if (abre > 0.5) { rect(x + 92, s - 32, x + 101, s - 6, hex('#2a2a34')); rect(x + 92, s - 32, x + 93, s - 6, P.busC); rect(x + 100, s - 32, x + 101, s - 6, P.busC); rect(x + 94, s - 9, x + 99, s - 6, C.grisS); rect(x + 94, s - 9, x + 99, s - 9, C.grisL); rect(x + 96, s - 30, x + 96, s - 12, P.cromo); }
  else { rect(x + 92, s - 32, x + 101, s - 6, P.busC); rect(x + 93, s - 31, x + 96, s - 20, P.vid); rect(x + 98, s - 31, x + 100, s - 20, P.vid); rect(x + 97, s - 32, x + 97, s - 6, K); rect(x + 93, s - 17, x + 96, s - 8, P.busV); rect(x + 98, s - 17, x + 100, s - 8, P.busV); pset(x + 93, s - 30, P.vidL); }
  // el anuncio del costado: un planeta con anillo, un cohete y barras de colores
  rect(x + 32, s - 17, x + 76, s - 8, K); rect(x + 33, s - 16, x + 75, s - 9, hex('#f4ecd0')); disco(x + 39.5, s - 12.5, 3, hex('#e09848')); for (let i = -5; i <= 5; i++) if (Math.abs(i) > 2) pset(x + 39 + i, s - 12 + (i > 0 ? -1 : 1), hex('#1c2450'));
  rect(x + 47, s - 15, x + 62, s - 14, hex('#b83a2c')); rect(x + 47, s - 12, x + 58, s - 12, C.grisS); rect(x + 47, s - 10, x + 60, s - 10, C.grisS); rect(x + 67, s - 15, x + 68, s - 11, hex('#1c2450')); pset(x + 67, s - 16, C.rojo); pset(x + 68, s - 10, hex('#ffb040')); pset(x + 72, s - 14, hex('#1c2450')); pset(x + 71, s - 11, hex('#1c2450'));
  // las ruedas
  for (const wx of [x + 20, x + 88]) { disco(wx + 0.5, s - 8.5, 7, hex('#1e3a2c')); rect(wx - 6, s - 8, wx + 7, s - 6, hex('#1e3a2c')); disco(wx + 0.5, s - 5.5, 6, K); disco(wx + 0.5, s - 5.5, 4.6, hex('#3a3a46')); disco(wx + 0.5, s - 5.5, 2.6, P.cromo); for (let k = 0; k < 3; k++) { const a = gira + k * 2.094; pset(wx + Math.round(Math.cos(a) * 3.6), s - 6 + Math.round(Math.sin(a) * 3.6), C.grisL); } pset(wx, s - 6, K); }
}

// un paquete de periódicos atado con cuerda (x, y = esquina de abajo a la izquierda; n: cuántos)
function e_fardo(R, x, y, w, n, k = 0) {
  R.rect(x, y - n * 2 - 1, x + w, y, C.k); for (let j = 0; j < n; j++) { R.rect(x + 1, y - 1 - j * 2, x + w - 1, y - 1 - j * 2, hex('#b8b4ac')); R.rect(x + 1, y - 2 - j * 2, x + w - 1, y - 2 - j * 2, j % 3 ? hex('#ece6d6') : C.blanco); }
  R.rect(x + 1, y - n * 2, x + w - 1, y - n * 2, C.blanco); R.rect(x + 2, y - n * 2, x + 5, y - n * 2, C.grisS); R.rect(x + (w >> 1), y - n * 2, x + (w >> 1), y - 1, hex('#8a6a3a')); if (k % 2) R.rect(x + 3, y - n, x + w - 3, y - n, hex('#8a6a3a'));
}

// una paloma (x, y = patas); pica: baja la cabeza
function e_paloma(R, x, y, dir, pica) {
  const K = C.k; R.rect(x - 3, y - 4, x + 2, y - 1, K); R.rect(x - 2, y - 4, x + 1, y - 2, hex('#8a94a8')); R.rect(x - 2, y - 3, x, y - 2, hex('#a8b0c0')); R.pset(x - 3 * dir, y - 4, K);
  const hx = x + 3 * dir, hy = pica ? y - 2 : y - 6; R.rect(hx - 1, hy, hx + 1, hy + 2, K); R.pset(hx, hy + 1, hex('#6a7a94')); R.pset(hx + dir, hy + (pica ? 2 : 1), hex('#e8a030')); R.pset(hx, hy + 2, hex('#5a9a7a')); R.pset(x - 1, y, hex('#c85a4a')); R.pset(x + 1, y, hex('#c85a4a'));
}

// EL QUIOSCO (libros, encuadre 'premios', cámara 'quiosco')
function e_quiosco(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = e_P;
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  // LO DE LEJOS (fijo): los edificios, la acera de enfrente, la calzada y la acera de aquí; el cielo se rellena donde no hay nada
  const lejos = e_buf(R, 'quioscoLejos', (b) => {
    const edificio = (x0, x1, top, c, cS, cL, k, vent) => {
      rect(x0, top, x1, 108, c); rect(x0, top, x0, 108, K); rect(x1, top, x1, 108, cS);
      for (let y = top + 6; y < 86; y += 3) for (let x = x0 + 1; x < x1; x++) if ((x + (y % 2) * 3) % 7 === 0 || h(x, y, 570 + k) < 0.05) pset(x, y, cS); for (let i = 0; i < (x1 - x0) * 2; i++) pset(x0 + 1 + Math.floor(h(i, 1, 571 + k) * (x1 - x0 - 1)), top + 5 + Math.floor(h(i, 2, 571 + k) * 78), cL);
      rect(x0 - 1, top - 2, x1 + 1, top + 2, K); rect(x0, top - 1, x1, top - 1, cL); rect(x0, top, x1, top + 1, c); for (let x = x0 + 2; x < x1; x += 4) pset(x, top + 3, K);
      const [vw, va, px, py] = vent; for (let y = top + 9; y + va < 84; y += py) for (let x = x0 + 6; x + vw < x1 - 3; x += px) { const q = h(x, y, 572 + k); rect(x - 1, y - 1, x + vw, y + va, K); rect(x, y, x + vw - 1, y + va - 1, q < 0.25 ? hex('#f4e8b0') : P.vid); rect(x, y, x + vw - 1, y, q < 0.25 ? hex('#fff8d8') : P.vidL);
        if (q > 0.5) rect(x, y, x + (vw >> 1) - 1, y + va - 1, q > 0.75 ? hex('#e8e0d0') : hex('#c8785a')); rect(x + (vw >> 1), y, x + (vw >> 1), y + va - 1, K); rect(x - 1, y + va + 1, x + vw, y + va + 1, cL); if (q > 0.86) { rect(x, y + va - 1, x + vw - 1, y + va, hex('#6a4a2a')); pset(x + 1, y + va - 2, C.rojo); pset(x + 3, y + va - 2, hex('#f4c040')); pset(x + 2, y + va - 3, C.hierbaS); } }
    };
    edificio(0, 68, 26, P.fach, P.fachS, hex('#d07860'), 0, [6, 9, 13, 15]);
    edificio(69, 148, 38, hex('#d8c8a0'), hex('#b8a47c'), hex('#ece0c0'), 1, [7, 9, 14, 15]);
    edificio(149, 230, 30, hex('#9a6a4e'), hex('#78503a'), hex('#b8846a'), 2, [5, 10, 11, 16]);
    edificio(231, 275, 20, hex('#8a94a8'), hex('#6c7690'), hex('#a8b2c4'), 3, [4, 11, 9, 16]);
    edificio(276, 319, 56, hex('#7a9a86'), hex('#5c7c6a'), hex('#9ab8a4'), 4, [7, 8, 13, 14]);
    for (let x = 236; x < 274; x += 9) rect(x, 24, x, 86, hex('#a8b2c4'));
    // el depósito de agua de la azotea, las chimeneas y la escalera de incendios
    rect(184, 12, 200, 24, K); rect(185, 13, 199, 23, hex('#7a5a3a')); for (let x = 187; x < 199; x += 3) rect(x, 13, x, 23, hex('#5a3e24')); rect(185, 17, 199, 17, hex('#3a2a1c')); poligono([[183, 12], [201, 12], [192, 6]], K); poligono([[185, 11], [199, 11], [192, 7]], hex('#5a5a66')); for (const x of [186, 198]) { linea(x, 24, x - 2, 28, K); linea(x, 24, x + 2, 28, K); }
    rect(86, 31, 92, 36, K); rect(87, 32, 91, 36, hex('#a85a4a')); rect(300, 49, 306, 54, K); rect(301, 50, 305, 54, hex('#a85a4a'));
    for (let f = 0; f < 3; f++) { const y = 56 + f * 15; rect(112, y, 146, y, K); rect(112, y - 5, 146, y - 5, K); for (let x = 112; x <= 146; x += 3) rect(x, y - 5, x, y, K); linea(116, y, 140, y + 15, K); linea(117, y, 141, y + 15, hex('#4a4a56')); }
    // los bajos: toldos de rayas, escaparates, puertas, la barbería (el poste gira en cada fotograma) y un café
    const bajo = (x0, x1, ca, cb, k) => { rect(x0, 86, x1, 108, hex('#3a2e2a')); rect(x0, 86, x1, 86, K);
      for (let x = x0 + 2; x < x1 - 1; x++) { const a = ((x - x0) / 5 | 0) % 2, b = 93 + ((x - x0) % 5 === 2 ? 1 : 0); for (let y = 87; y <= b; y++) pset(x, y, y === 87 ? K : a ? ca : cb); pset(x, b + 1, K); }
      const xm = x0 + ((x1 - x0) * 0.62 | 0); rect(x0 + 4, 96, xm - 2, 106, K); rect(x0 + 5, 97, xm - 3, 105, hex('#f0d890')); rect(x0 + 5, 97, xm - 3, 97, hex('#fff4c8'));
      for (let x = x0 + 7; x < xm - 6; x += 7) { const q = (x + k) % 4; rect(x, 101 - q, x + 3, 105, [hex('#c85a5a'), hex('#4a8a8a'), hex('#e89848'), hex('#5a6ab8')][q]); pset(x + 1, 100 - q, K); }
      rect(xm + 1, 94, xm + 10, 108, K); rect(xm + 2, 95, xm + 9, 107, [hex('#5e2a22'), hex('#2a4a3a'), hex('#2a3458')][k % 3]); rect(xm + 3, 96, xm + 8, 101, P.vid); pset(xm + 8, 103, C.oro); };
    bajo(0, 68, hex('#c83a3a'), hex('#f4ecdc'), 0); bajo(69, 148, hex('#3a7a5a'), hex('#f4ecdc'), 1); bajo(149, 230, hex('#e0a030'), hex('#f4ecdc'), 2); bajo(231, 275, hex('#3a5a9a'), hex('#f4ecdc'), 3); bajo(276, 319, hex('#b85a8a'), hex('#f4ecdc'), 4);
    // la acera de enfrente: bordillo, juntas, el buzón azul, la boca de riego, el árbol y el poste del semáforo
    rect(0, 108, 319, 113, P.acera); rect(0, 108, 319, 108, hex('#cac6ce')); rect(0, 113, 319, 113, P.aceraS); for (let x = 5; x < 320; x += 13) rect(x, 109, x, 112, P.aceraS);
    rect(166, 99, 173, 109, K); rect(167, 100, 172, 108, hex('#2a4a9a')); rect(167, 100, 172, 100, hex('#5a7ac8')); rect(168, 102, 171, 102, K); rect(168, 105, 171, 106, C.blanco);
    rect(226, 76, 227, 109, K); rect(223, 76, 230, 91, K); rect(224, 77, 229, 90, hex('#2a2a34'));
    rect(203, 92, 205, 109, K); rect(204, 93, 204, 108, hex('#6a4a2a')); disco(204.5, 86, 8, K); disco(204.5, 86, 7, C.hierbaS); disco(202, 84, 4.4, C.hierba); disco(206, 82, 2.4, C.hierbaL); rect(200, 108, 209, 109, K);
    // la calzada: moteado, rayas, la tapa de alcantarilla, el paso de cebra y las manchas
    rect(0, 114, 319, 138, P.asf); rect(0, 114, 319, 114, hex('#2a2a34')); for (let i = 0; i < 700; i++) { const x = Math.floor(h(i, 1, 573) * 320), y = 115 + Math.floor(h(i, 2, 573) * 23); pset(x, y, i % 3 ? P.asfS : P.asfL); }
    for (let x = 6; x < 290; x += 24) { rect(x, 125, x + 11, 125, P.raya); rect(x + 1, 126, x + 10, 126, hex('#b8b098')); }
    for (let x = 296; x < 320; x += 6) { rect(x, 116, x + 2, 136, P.raya); for (let y = 117; y < 136; y += 3) pset(x + (y % 2), y, P.asfL); }
    for (let i = -6; i <= 6; i++) { const w = Math.round(Math.sqrt(36 - i * i) * 0.4); rect(200 + i, 131 - w, 200 + i, 131 + w, hex('#34343e')); } rect(196, 130, 204, 130, hex('#5e5e6e')); rect(198, 132, 202, 132, hex('#5e5e6e'));
    for (const [x, y, r] of [[90, 133, 6], [250, 120, 5]]) for (let j = -2; j <= 2; j++) for (let i = -r; i <= r; i++) if (h(x + i, y + j, 574) > 0.35 && i * i / (r * r) + j * j / 5 < 1) pset(x + i, y + j, P.asfS);
    // el bordillo y la acera de aquí: losas en perspectiva, grietas, chicles, la rejilla y hojas
    rect(0, 138, 319, 140, hex('#d4d0d8')); rect(0, 140, 319, 140, hex('#7c7884')); rect(0, 141, 319, 179, P.acera);
    for (let i = 0; i < 800; i++) { const x = Math.floor(h(i, 1, 575) * 320), y = 142 + Math.floor(h(i, 2, 575) * 38); pset(x, y, i % 3 ? P.aceraS : hex('#c8c4cc')); }
    for (const y of [149, 160, 173]) { rect(0, y, 319, y, P.aceraS); for (let x = 0; x < 320; x++) if (h(x, y, 576) > 0.5) pset(x, y + 1, hex('#c8c4cc')); }
    for (let k = -4; k <= 12; k++) linea(k * 36 + 10, 141, Math.round(160 + (k * 36 + 10 - 160) * 1.6), 179, P.aceraS);
    for (const [x, y] of [[170, 156], [222, 168], [60, 170], [286, 163]]) { linea(x, y, x + 5, y + 2, hex('#7c7884')); linea(x + 5, y + 2, x + 7, y + 6, hex('#7c7884')); }
    for (const [x, y] of [[188, 166], [130, 172], [246, 158], [300, 171], [90, 163]]) { pset(x, y, hex('#e8a0b0')); pset(x + 1, y, hex('#7c7884')); }
    rect(196, 142, 214, 146, K); for (let x = 198; x < 214; x += 2) rect(x, 143, x, 145, hex('#5e5a66'));
    // el cielo, tramado, donde no hay edificio
    const cols = [C.cielo1, C.cielo2, C.cielo3, hex('#e4f0f4')], mask = new Uint8Array(320 * 70);
    for (let y = 0; y < 70; y++) { const f = y / 62 * 3, i = Math.min(2, Math.floor(f)), fr = Math.min(1, f - i); for (let x = 0; x < 320; x++) if (!b[y * 320 + x]) { mask[y * 320 + x] = 1; b[y * 320 + x] = fr > e_tr(x, y) ? cols[i + 1] : cols[i]; } }
    m.quioscoMask = mask;
  });
  // LO DE CERCA (fijo, con huecos): el quiosco, la farola, la papelera, la parada y el banco
  const cerca = e_buf(R, 'quioscoCerca', (b) => {
    // las sombras en la acera
    for (let y = 147; y <= 152; y++) for (let x = 6 + (y - 147); x < 140 + (y - 147) * 2; x++) if ((x + y) & 1) pset(x, y, hex('#7c7884'));
    for (let y = 148; y <= 151; y++) for (let x = 254; x < 312; x++) if ((x + y) & 1) pset(x, y, hex('#7c7884'));
    // el rótulo del tejado (una estrella, un globo y barras: sin letras) y el tejado
    rect(38, 45, 98, 58, K); rect(39, 46, 97, 57, hex('#f4ecd0')); rect(39, 46, 97, 47, C.blanco); rect(40, 56, 96, 56, hex('#d0c4a0')); e_estrella(R, 47.5, 52, 4.6, C.rojo); rect(55, 49, 78, 51, hex('#1c2450')); rect(55, 53, 72, 54, C.rojo); disco(88.5, 51.5, 4, hex('#3a6ab8')); disco(87, 50, 1.6, hex('#6aa85a')); pset(90, 53, hex('#6aa85a'));
    for (const x of [44, 92]) rect(x, 58, x + 1, 60, K);
    poligono([[6, 68], [128, 68], [122, 59], [12, 59]], K); poligono([[8, 67], [126, 67], [121, 60], [13, 60]], P.kioD); rect(13, 60, 121, 60, P.kioL); for (let x = 16; x < 122; x += 9) linea(x, 61, x - 3 + Math.round((x - 67) * 0.06), 66, P.kioS);
    // el cuerpo de madera verde: postes, la ventanilla con su interior, la repisa y el frente
    rect(16, 68, 118, 149, K); rect(17, 69, 117, 148, P.kio); for (let x = 20; x < 117; x += 7) rect(x, 78, x, 147, P.kioS); rect(17, 69, 20, 148, P.kioL); rect(18, 69, 18, 148, hex('#7ab888')); rect(114, 69, 117, 148, P.kioS);
    rect(22, 77, 112, 118, K); rect(23, 78, 111, 117, P.kioInt);
    for (let f = 0; f < 3; f++) { const y = 91 + f * 9; rect(23, y, 111, y, hex('#3a3040')); for (let x = 24; x < 110; x += 5) { const c = e_LOMOS[(x + f * 3) % e_LOMOS.length]; rect(x, y - 7 + ((x + f) % 3), x + 3, y - 1, e_mez(c, P.kioInt, 0.55)); pset(x, y - 6 + ((x + f) % 3), e_mez(c, P.kioInt, 0.3)); } }
    // el frente: dos filas de revistas en sus guías de alambre y el zócalo
    rect(19, 124, 115, 146, P.kioS); for (let k = 0; k < 8; k++) e_portada(R, 21 + k * 12, 125, 11, 12, k + 2); rect(19, 133, 115, 133, K); rect(19, 132, 115, 132, C.grisL);
    for (let k = 0; k < 8; k++) e_portada(R, 21 + k * 12, 136, 11, 11, k * 3 + 1); rect(19, 143, 115, 143, K); rect(19, 142, 115, 142, C.grisL); rect(16, 146, 118, 149, K); rect(17, 147, 117, 148, P.kioD);
    // la repisa con los periódicos apilados, el tarro de caramelos y el platillo de las monedas
    rect(18, 118, 116, 123, K); rect(19, 119, 115, 120, P.tablaL); rect(19, 119, 115, 119, hex('#e8c488')); rect(19, 121, 115, 122, P.est);
    e_fardo(R, 24, 118, 20, 3, 0); e_fardo(R, 46, 118, 20, 5, 0); rect(26, 110, 31, 110, K); rect(34, 110, 41, 110, C.grisS); rect(48, 106, 55, 106, K); rect(48, 104, 52, 105, C.grisS);
    rect(96, 108, 104, 118, K); rect(97, 109, 103, 117, hex('#bfe8ff')); rect(97, 106, 103, 108, K); rect(98, 107, 102, 107, C.rojo); for (let i = 0; i < 9; i++) pset(98 + (i * 3) % 5, 111 + (i * 2) % 6, [C.rojo, hex('#f4e060'), hex('#3aa85a'), hex('#e87a9a')][i % 4]); pset(97, 109, C.blanco);
    rect(82, 115, 90, 118, K); rect(83, 116, 89, 117, C.metalL); pset(85, 116, C.oro); pset(87, 116, C.oro);
    // el toldo de rayas con festones
    for (let x = 14; x <= 120; x++) { const a = ((x - 14) / 6 | 0) % 2, bb = 75 + ((x - 14) % 6 === 2 || (x - 14) % 6 === 3 ? 1 : 0); for (let y = 68; y <= bb; y++) pset(x, y, y === 68 ? K : a ? hex('#f4ecd0') : hex('#2e6a48')); pset(x, bb + 1, K); }
    // las hojas abiertas de los lados, con sus revistas
    for (const [x0, k0] of [[3, 0], [119, 4]]) { rect(x0, 72, x0 + 13, 142, K); rect(x0 + 1, 73, x0 + 12, 141, P.kioS); rect(x0 + 1, 73, x0 + 1, 141, P.kio); for (let k = 0; k < 4; k++) { e_portada(R, x0 + 2, 75 + k * 16, 10, 13, k0 + k * 2 + 1); rect(x0 + 1, 89 + k * 16, x0 + 12, 89 + k * 16, C.grisL); } }
    // los fardos de periódicos recién llegados, junto al quiosco
    e_fardo(R, 134, 150, 18, 4, 1); e_fardo(R, 136, 141, 16, 3, 1);
    // la farola: fuste, brazo y globo
    rect(152, 142, 158, 150, K); rect(153, 143, 157, 149, hex('#3a4a44')); rect(154, 48, 156, 142, K); rect(155, 50, 155, 142, hex('#5a6a64')); for (const y of [70, 100, 130]) rect(153, y, 157, y + 1, K);
    linea(155, 48, 160, 42, K); linea(160, 42, 168, 42, K); rect(165, 43, 172, 44, K); disco(168.5, 48, 4, K); disco(168.5, 48, 3, hex('#f4f0e0')); pset(167, 47, C.blanco);
    // la papelera, el poste de la parada con su disco (un autobús) y el horario (barras), y el banco
    rect(220, 136, 231, 150, K); rect(221, 137, 230, 149, hex('#3a6a52')); for (let y = 139; y < 149; y += 2) for (let x = 221 + (y % 4 ? 1 : 0); x < 231; x += 2) pset(x, y, hex('#1e4430')); rect(219, 135, 232, 137, K); rect(220, 136, 231, 136, hex('#5e9c6c'));
    rect(239, 100, 241, 150, K); rect(240, 104, 240, 149, C.metalL); rect(237, 149, 243, 151, K); disco(240.5, 96.5, 8, K); disco(240.5, 96.5, 7, hex('#f4ecd0')); disco(240.5, 96.5, 6, hex('#2a4a9a')); rect(236, 94, 245, 98, C.blanco); rect(237, 95, 238, 96, hex('#2a4a9a')); rect(240, 95, 241, 96, hex('#2a4a9a')); rect(243, 95, 244, 96, hex('#2a4a9a')); pset(237, 99, C.blanco); pset(244, 99, C.blanco);
    rect(236, 110, 245, 122, K); rect(237, 111, 244, 121, C.blanco); for (let y = 113; y < 121; y += 2) rect(238, y, 243 - (y % 3), y, C.grisS); pset(238, 112, C.rojo);
    for (const x of [258, 302]) { rect(x, 128, x + 2, 151, K); rect(x + 1, 129, x + 1, 150, hex('#3a4a44')); rect(x - 2, 137, x + 4, 138, K); }
    for (const y of [129, 133]) { rect(255, y, 307, y + 2, K); rect(256, y, 306, y + 1, hex('#3e7a52')); rect(256, y, 306, y, hex('#5e9c6c')); } rect(254, 139, 308, 142, K); rect(255, 139, 307, 140, hex('#5e9c6c')); rect(255, 141, 307, 141, hex('#2a5a3c'));
    const idx = []; for (let i = 0; i < b.length; i++) if (b[i]) idx.push(i); m.quioscoIdx = Int32Array.from(idx);
  });
  R.copiar(lejos);
  // las nubes de tres tonos a tres velocidades (solo sobre el cielo; se dan la vuelta por detrás del edificio alto) y dos pájaros
  const mask = m.quioscoMask, esCielo = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 70 && mask[y * 320 + x] === 1 && !(x > 262 && y < 50) && !(y < 16 && x < 176) && !(x < 66 && y < 26);
  for (const [bx, y, w, vel] of [[90, 29, 26, 1.4], [170, 26, 20, 2.3], [230, 34, 22, 0.9], [120, 36, 16, 1.8]]) e_nube(R, ((bx + t * vel) % 300 + 300) % 300 - 30, y, w, esCielo);
  for (let k = 0; k < 2; k++) { const u = ((t + k * 6.5) % 13) / 13, bx = Math.round(-10 + u * 280), by = 34 + k * 9 + Math.round(Math.sin(t * 1.2 + k) * 3), a = Math.sin(t * 9 + k) > 0 ? -1 : 0; if (esCielo(bx, by)) { pset(bx, by, K); pset(bx - 1, by + a, K); pset(bx + 1, by + a, K); pset(bx - 2, by + a * 2, K); pset(bx + 2, by + a * 2, K); } }
  // la vida de enfrente: el poste de la barbería, el semáforo, una cortina, luces que se encienden y los paseantes
  rect(141, 92, 145, 107, K); for (let y = 93; y <= 106; y++) for (let x = 142; x <= 144; x++) pset(x, y, [C.blanco, C.rojo, C.blanco, hex('#2a4a9a')][Math.floor((y * 0.7 + x + t * 6) % 4)]); rect(141, 90, 145, 92, K); pset(143, 91, C.metalL);
  { const f = Math.floor(t / 4) % 3; [C.rojo, hex('#f4c040'), hex('#3aa85a')].forEach((c, k) => { disco(227, 79.5 + k * 4, 1.6, f === k ? c : e_mez(c, K, 0.7)); }); }
  { const a = Math.round(Math.sin(t * 1.7) * 1.2); rect(162, 55, 163 + a, 63, hex('#e8e0d0')); }
  for (let k = 0; k < 4; k++) { const d = k % 2 ? 1 : -1, x = ((k * 97 + t * (6 + k * 1.3) * d) % 360 + 360) % 360 - 20; e_peaton(R, x, 113, t, k, d); }
  // el vapor de la alcantarilla y los coches del carril de enfrente (van hacia la izquierda)
  for (let k = 0; k < 7; k++) { const q = (t * 0.35 + k / 7) % 1, sx = Math.round(200 + Math.sin(t * 1.1 + k * 2) * (2 + q * 4)), sy = Math.round(130 - q * 16); if ((k + Math.floor(t * 3)) % 2 || q < 0.5) { pset(sx, sy, hex('#c8c8d4')); if (q < 0.6) pset(sx + 1, sy, hex('#9a9aaa')); } }
  { const x = 340 - ((t * 38) % 520); e_coche60(R, Math.round(x), 123, -1, hex('#c8563a'), t); const x2 = 340 - ((t * 31 + 260) % 640); e_coche60(R, Math.round(x2), 124, -1, hex('#4a8ab8'), t); }
  // EL AUTOBÚS, por el carril de aquí: llega por la izquierda, para en la parada con la puerta abierta y se va
  let u = o.bus; if (u == null) { const c = (t + 5) % 18; u = c < 5 ? c / 5 * 0.5 : c < 11 ? 0.5 : c < 15 ? 0.5 + (c - 11) / 4 * 0.5 : 1; }
  u = Math.max(0, Math.min(1, u));
  const X0 = 174, bx = Math.round(u <= 0.5 ? lerp(-130, X0, 1 - (1 - u * 2) ** 2) : lerp(X0, 330, ((u - 0.5) * 2) ** 2)), parado = Math.abs(u - 0.5) < 0.004;
  if (bx > -122 && bx < 322) { e_bus(R, bx, 136 + (parado && Math.sin(t * 21) > 0.6 ? 0 : 0), t, parado ? 1 : 0, bx * 0.25);
    for (let k = 0; k < 4; k++) { const q = (t * 1.4 + k / 4) % 1; pset(bx - 3 - Math.round(q * 9), 131 - Math.round(q * 5 + Math.sin(t * 3 + k) * 1), q < 0.5 ? hex('#8a8a96') : hex('#6a6a78')); } }
  // lo de cerca, encima
  { const idx = m.quioscoIdx; for (let i = 0; i < idx.length; i++) { const p = idx[i]; pset(p % 320, (p / 320) | 0, cerca[p]); } }
  // el quiosquero dentro (ordena y saluda), la bombilla y las revistas colgadas con pinzas, que se mecen
  { const f = Math.sin(t * 2.1) > 0.97 ? 0.1 : 0.24; disco(88.5, 82.5, 2, hex('#fff4c8')); rect(88, 78, 88, 80, K); for (let j = -8; j <= 12; j++) for (let i = -14; i <= 14; i++) if (i * i + j * j < 180 && ((i + j) & 1) === 0 && 82 + j > 78 && 82 + j < 118 && 88 + i < 112) e_tinte(R, 88 + i, 82 + j, hex('#ffe8a0'), f * (1 - (i * i + j * j) / 180)); }
  if (o.quiosquero !== false) { const vx = 62 + Math.round(Math.sin(t * 0.5) * 3), br = Math.sin(t * 1.8) > 0.3 ? 1 : 0;
    rect(vx - 2, 109, vx + 10, 117, K); rect(vx - 1, 110, vx + 9, 117, hex('#e8e0d0')); rect(vx + 2, 110, vx + 6, 117, hex('#3a5a8a')); rect(vx - 1, 110, vx - 1, 117, C.blanco); rect(vx + 10, 111 - br * 3, vx + 12, 114 - br * 3, K); pset(vx + 11, 112 - br * 3, P.piel);
    R.busto('calvo', { C: hex('#e8e0d0'), c: hex('#c8c0b0') }, vx, 98, t, {}); rect(vx, 97, vx + 8, 98, K); rect(vx + 1, 96, vx + 7, 97, hex('#3a5a8a')); rect(vx + 1, 95, vx + 7, 95, K); rect(vx + 5, 98, vx + 10, 98, hex('#2a4270')); }
  rect(23, 79, 111, 79, hex('#c8c0a8'));
  for (let k = 0; k < 7; k++) { const x = 25 + k * 12 + (k > 4 ? 0 : 0), sw = Math.round(Math.sin(t * 1.6 + k * 1.1) * 1.2); if (k === 3 && o.quiosquero !== false) continue; rect(x + 4, 78, x + 5, 81, hex('#c85a3a')); pset(x + 4, 78, hex('#f09a7a'));
    e_portada(R, x + (sw > 0.5 ? 1 : sw < -0.5 ? -1 : 0), 81, 11, 13, k); }
  // las palomas del tejado (una da saltitos) y la luz de la farola de día: un brillo que parpadea
  e_paloma(R, 30 + Math.round(((t * 0.4) % 1 < 0.2 ? Math.sin(t * 20) : 0)), 59, 1, Math.sin(t * 1.3) > 0.5); e_paloma(R, 112, 59 - ((t % 5) < 0.3 ? 2 : 0), -1, false);
  if (Math.sin(t * 2.2) > 0.8) pset(170, 46, C.blanco);
  // una hoja de periódico que el viento arrastra por la acera
  { const q = (t % 11) / 11, x = Math.round(330 - q * 380), y = Math.round(166 + Math.sin(q * 19) * 3), g = Math.floor(t * 5) % 3; if (g === 0) { rect(x, y - 3, x + 6, y, K); rect(x + 1, y - 2, x + 5, y - 1, C.blanco); pset(x + 2, y - 2, C.grisS); pset(x + 4, y - 1, C.grisS); } else if (g === 1) { poligono([[x, y], [x + 6, y - 1], [x + 7, y - 5], [x + 1, y - 3]], K); poligono([[x + 1, y - 1], [x + 5, y - 2], [x + 6, y - 4], [x + 2, y - 3]], C.blanco); } else { rect(x + 1, y - 5, x + 5, y, K); rect(x + 2, y - 4, x + 4, y - 1, C.blanco); pset(x + 3, y - 3, C.grisS); } }
  return { suelo: 152, quiosco: [4, 46, 131, 148], ventanilla: [66, 118], repisa: [18, 118, 116], parada: [240, 150], banco: [256, 139, 306], farola: 155, bus: bx, busPuerta: [bx + 92, bx + 101], busParado: parado, carril: 136, libre: [[160, 218], [244, 318]] };
}

// lo de delante en el quiosco: los fardos de periódicos, la boca de riego y las palomas que picotean
function e_quioscoDelante(R, t, o) {
  const { rect, pset, disco } = R, K = C.k;
  for (let y = 176; y <= 179; y++) for (let x = 0; x < 44; x++) if ((x + y) & 1) pset(x, y, hex('#7c7884'));
  e_fardo(R, 0, 179, 24, 6, 1); e_fardo(R, 2, 166, 20, 4, 0); e_fardo(R, 26, 179, 14, 4, 1);
  rect(299, 162, 310, 178, K); rect(300, 163, 309, 177, C.rojo); rect(300, 163, 301, 177, hex('#e86a5a')); rect(308, 164, 309, 177, C.rojoS); rect(301, 158, 308, 162, K); rect(302, 159, 307, 161, C.rojo); rect(303, 156, 306, 158, K); rect(296, 167, 299, 171, K); rect(297, 168, 298, 170, C.rojoS); rect(310, 167, 313, 171, K); rect(311, 168, 312, 170, C.rojoS); rect(297, 177, 312, 179, K); rect(298, 178, 311, 178, C.rojoS); disco(304.5, 169.5, 2, hex('#e8c030'));
  for (let y = 178; y <= 179; y++) for (let x = 312; x < 320; x++) if ((x + y) & 1) pset(x, y, hex('#7c7884'));
  { const a = (t % 7) / 7, x1 = Math.round(196 + (a < 0.3 ? a / 0.3 * 10 : 10)); e_paloma(R, x1, 175 - (a < 0.3 && Math.sin(t * 16) > 0 ? 1 : 0), 1, a > 0.3 && Math.sin(t * 7) > 0); e_paloma(R, 222, 172, -1, Math.sin(t * 5 + 1) > 0.2); pset(212, 176, hex('#e8d8a0')); pset(215, 174, hex('#e8d8a0')); pset(209, 173, hex('#e8d8a0')); }
  return {};
}

// la paleta propia de los decorados del cine (maderas, zinc, latón, terciopelos, hormigón)
const f_P = pal({
  k: '#1c1222', bl: '#f6f2ea', pared: '#8f9c96', paredL: '#a3aea6', paredS: '#7a8782', paredD: '#5c6866', techo: '#d6cfbc', techoS: '#c4bca6', zoc: '#dcd6c6', zocS: '#a9a394',
  roble: '#b07c44', robleL: '#c8965a', robleS: '#8e5e30', robleD: '#6e4422', nogal: '#7a5230', nogalL: '#96683e', nogalS: '#5a3a20', nogalD: '#3e2614',
  zinc: '#7f90a6', zincL: '#a3b2c4', zincS: '#5f6e86', crema: '#e6d8b8', cremaS: '#c2b08c', cremaD: '#9a8a6a', teja: '#c8683c', tejaS: '#964628',
  oro: '#e0b040', oroL: '#f8dc80', oroS: '#a87820', oroD: '#74500e', hierro: '#2a2a34', metal: '#9aa4b4', metalS: '#6c7688', metalL: '#c8d0dc', metalD: '#4a5262',
  papel: '#f2ecda', papelS: '#d2c8ae', kraft: '#c8a878', rojo: '#d83a3a', rojoS: '#9a2430', verde: '#4a9a5a', verdeS: '#2e6a40', verdeL: '#7ac87a', piel: '#f0c090',
  pino: '#d2a868', pinoL: '#e6c488', pinoS: '#a87e44', vino: '#7c2638', vinoL: '#963a4c', vinoS: '#5a1828', vinoD: '#3e0e1c',
});

const f_VIVOS = ['#e83a8a', '#2ec4c4', '#f08a24', '#9ad83a', '#8a4ae8', '#f4d23a', '#d8343a', '#2a6ae0', '#f46aa8', '#3ad89a'].map((c) => hex(c));

const f_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral del tramado ordenado de 4 × 4 (0–1)
const f_b4 = (x, y) => (f_BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// los fondos fijos se pintan una vez por clave en un búfer y luego se copian
const f_capas = new Map();

function f_capa(R, clave, dibuja) {
  let b = f_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); f_capas.set(clave, b); }
  return b;
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function f_mez(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// un rectángulo que sí respeta R.recorte (R.rect no lo hace)
function f_r(R, x0, y0, x1, y1, c) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, c); }

// tiñe un rectángulo hacia un color (paso 2: solo la mitad de los píxeles, en tramado); respeta el recorte
function f_velo(R, x0, y0, x1, y1, col, a, paso = 1) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (paso === 1 || (x + y) % paso === 0) R.pset(x, y, f_mez(R.pget(x, y), col, a));
}

// tiñe un polígono (un haz de luz, una mancha de sol): mezcla cada píxel con col
function f_haz(R, pts, col, a, paso = 1) { R.poligono(pts, (x, y) => (paso === 1 || (x + y) % paso === 0 ? f_mez(R.pget(x, y), col, a) : R.pget(x, y))); }

// un marco rehundido con bisel: línea de sombra arriba y a la izquierda, de luz abajo y a la derecha
function f_bisel(R, x0, y0, x1, y1, luz, sombra) {
  R.rect(x0, y0, x1, y0, sombra); R.rect(x0, y0, x0, y1, sombra); R.rect(x0, y1, x1, y1, luz); R.rect(x1, y0, x1, y1, luz);
}

// una nube de tres tonos (luz arriba, cuerpo, panza en sombra) hecha de bolas; respeta el recorte
function f_nube(R, cx, cy, w, cols = [f_P.bl, hex('#dfeaf2'), hex('#b4c8dc')]) {
  for (const [dx, dy, r] of [[-0.5, 0.1, 0.3], [-0.15, -0.12, 0.4], [0.25, -0.02, 0.34], [0.55, 0.12, 0.22]]) R.disco(cx + dx * w, cy + dy * w, r * w, (x, y) => (y > cy + 0.12 * w ? cols[2] : y > cy - 0.05 * w ? cols[1] : cols[0]));
  for (let x = Math.round(cx - w * 0.75); x <= cx + w * 0.72; x++) R.pset(x, Math.round(cy + 0.3 * w), cols[2]);
}

// un pájaro lejano que aletea (una «v» de 3 px)
function f_pajaro(R, x, y, t, k, c = f_P.hierro) { const a = Math.sin(t * 11 + k * 2.3) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); }

// una persona pequeña de fondo (unos 10 px; respeta el recorte), de pie en (x, suelo): pelo o gorra, cara, camisa y pantalón; o.anda mueve
// las piernas; o.brazo [dx, dy]: la mano de delante va ahí (para pintar, empujar o sostener algo); o.casco: color
function f_tecnico(R, x, suelo, t, o = {}) {
  const { pset } = R, rect = (xa, ya, xb, yb, c) => f_r(R, xa, ya, xb, yb, c), dir = o.dir ?? 1, ropa = o.ropa ?? hex('#3a6aa8'), pant = o.pant ?? hex('#3a3a4a'), paso = o.anda ? Math.floor(t * 6 + x) % 2 : 0;
  rect(x - 1, suelo - 9, x + 1, suelo - 7, f_P.piel); rect(x - 1, suelo - 10, x + 1, suelo - 10, o.pelo ?? f_P.nogalD); pset(x - dir, suelo - 9, o.pelo ?? f_P.nogalD); pset(x + dir, suelo - 8, f_P.k);
  rect(x - 1, suelo - 6, x + 1, suelo - 3, ropa); pset(x - dir, suelo - 6, f_mez(ropa, f_P.k, 0.3)); pset(x - dir, suelo - 5, f_mez(ropa, f_P.k, 0.3));
  rect(x - 1, suelo - 2, x - 1, suelo - (paso ? 1 : 0), pant); rect(x + 1, suelo - 2, x + 1, suelo - (paso ? 0 : 1), pant); pset(x, suelo - 2, pant);
  if (o.brazo) { R.linea(x + dir, suelo - 5, x + o.brazo[0], suelo + o.brazo[1], ropa); pset(x + o.brazo[0], suelo + o.brazo[1], f_P.piel); }
  else pset(x + dir * 2, suelo - 4 + (paso ? 1 : 0), f_P.piel);
}

// los edificios de enfrente (los mismos para lo fijo y para el humo): [x, ancho, y del alero]
function f_parisEdif(x0, y0, x1, y1) {
  const H = y1 - y0 + 1, L = []; let bx = x0 - 3;
  for (let i = 0; bx < x1; i++) { const w = 13 + Math.floor(h(i, 1, 341) * 9); L.push([bx, w, Math.round(y0 + H * (0.47 + h(i, 2, 342) * 0.13))]); bx += w + 1; }
  return L;
}

// los tejados de París, lo que no se mueve (dentro del hueco x0–x1, y0–y1; quien llama pone el recorte): el cielo
// tramado, la silueta lejana con una cúpula, las mansardas de zinc con buhardillas, las fachadas crema con contraventanas,
// las chimeneas con sus tubos de barro, y el tejado de cerca con su chimenea grande y una antena de televisión
function f_parisFuera(R, x0, y0, x1, y1) {
  const { pset, linea } = R, W = x1 - x0 + 1, H = y1 - y0 + 1, P = (xa, ya, xb, yb, c) => f_r(R, xa, ya, xb, yb, c);
  const CI = ['#5a9ed4', '#7ab4e0', '#9ccaea', '#c4def0', '#ecE6d4', '#f6dcbc'].map((c) => hex(c.toLowerCase()));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.min(4.99, (y - y0) / (H * 0.5) * 5); pset(x, y, CI[Math.min(5, Math.floor(f + f_b4(x, y)))]); }
  // la ciudad lejana, en dos capas azuladas, con una cúpula y una aguja
  const yh = Math.round(y0 + H * 0.5);
  for (let x = x0; x <= x1; x++) { const a = 3 + Math.floor(h(x >> 2, 0, 340) * 5) + ((x >> 1) % 5 === 0 ? 1 : 0), b = 1 + Math.floor(h((x + 40) >> 3, 1, 340) * 5);
    for (let y = yh - a - 4; y <= yh; y++) pset(x, y, hex('#a9bcd2')); for (let y = yh - b; y <= yh; y++) pset(x, y, hex('#8ea4c0')); }
  const dx = Math.round(x0 + W * 0.3); R.disco(dx, yh - 9, 4.2, hex('#a9bcd2')); P(dx - 4, yh - 9, dx + 3, yh - 4, hex('#a9bcd2')); linea(dx, yh - 17, dx, yh - 13, hex('#a9bcd2')); pset(dx - 2, yh - 10, hex('#c4d4e4'));
  linea(x0 + Math.round(W * 0.8), yh - 16, x0 + Math.round(W * 0.8), yh - 6, hex('#8ea4c0'));
  // las casas de enfrente
  f_parisEdif(x0, y0, x1, y1).forEach(([bx, w, ty], i) => {
    for (let y = ty; y < ty + 9; y++) for (let x = bx; x < bx + w; x++) pset(x, y, y === ty ? f_P.zincL : (x - bx) % 4 === 0 ? f_P.zincS : (x + y) % 7 === 0 ? f_P.zincL : f_P.zinc);
    for (let d = 3; d < w - 4; d += 6) { P(bx + d, ty + 3, bx + d + 3, ty + 8, f_P.crema); P(bx + d + 1, ty + 4, bx + d + 2, ty + 8, h(i, d, 343) < 0.3 ? hex('#f4d890') : hex('#3a4658')); pset(bx + d, ty + 2, f_P.zincL); pset(bx + d + 3, ty + 2, f_P.zincL); pset(bx + d + 1, ty + 2, f_P.zincL); pset(bx + d + 2, ty + 2, f_P.zincL); }
    P(bx, ty + 9, bx + w - 1, ty + 9, f_P.bl); P(bx, ty + 10, bx + w - 1, ty + 10, f_P.cremaD);
    for (let y = ty + 11; y <= y1; y++) for (let x = bx; x < bx + w; x++) pset(x, y, x === bx ? f_P.cremaD : h(x, y, 344) < 0.07 ? f_P.cremaS : i % 2 ? f_P.crema : hex('#dccba6'));
    for (let fy = ty + 13; fy < y1; fy += 10) { for (let d = 2; d < w - 3; d += 5) { P(bx + d, fy, bx + d + 2, fy + 5, h(i + fy, d, 345) < 0.25 ? hex('#f4d890') : hex('#46546a')); pset(bx + d, fy, hex('#8a9ab0')); pset(bx + d - 1, fy + 2, hex('#7a8e9e')); pset(bx + d + 3, fy + 2, hex('#7a8e9e')); }
      P(bx + 1, fy + 6, bx + w - 2, fy + 6, f_P.hierro); P(bx + 1, fy + 7, bx + w - 2, fy + 7, f_P.cremaS); }
    const cx = bx + 2 + Math.floor(h(i, 3, 346) * (w - 8)); P(cx, ty - 5, cx + 4, ty, f_P.cremaS); P(cx, ty - 5, cx, ty, f_P.cremaD); P(cx - 1, ty - 6, cx + 5, ty - 6, f_P.cremaD);
    for (let k = 0; k < 3; k++) { pset(cx + k * 2, ty - 7, f_P.teja); pset(cx + k * 2, ty - 8, k % 2 ? f_P.tejaS : f_P.teja); }
  });
  // el tejado de cerca: planchas de zinc con sus juntas alzadas, la cumbrera, la chimenea grande y la antena
  const yn = y1 - Math.round(H * 0.2);
  for (let y = yn; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y === yn ? f_P.zincL : y === yn + 1 ? hex('#90a0b6') : (x + (y >> 1)) % 9 === 0 ? f_P.zincS : h(x >> 1, y, 347) < 0.08 ? hex('#56647c') : hex('#6c7c94'));
  const qx = Math.round(x0 + W * 0.7); P(qx, yn - 13, qx + 9, yn + 3, f_P.cremaS); P(qx, yn - 13, qx + 2, yn + 3, f_P.cremaD); P(qx - 1, yn - 15, qx + 10, yn - 14, f_P.crema); for (let y = yn - 11; y < yn + 2; y += 3) P(qx + 3, y, qx + 9, y, hex('#b09c78'));
  for (let k = 0; k < 4; k++) { P(qx + 1 + k * 2, yn - 19, qx + 1 + k * 2, yn - 16, k % 2 ? f_P.tejaS : f_P.teja); pset(qx + 1 + k * 2, yn - 20, f_P.hierro); }
  const ax = Math.round(x0 + W * 0.18); linea(ax, yn - 16, ax, yn, f_P.hierro); for (const [dy, w] of [[-16, 4], [-13, 3], [-10, 2]]) linea(ax - w, yn + dy, ax + w, yn + dy, f_P.hierro); linea(ax, yn - 4, ax + 4, yn, f_P.hierro);
  return { humo: [qx + 4, yn - 21] };
}

// lo que se mueve sobre los tejados: nubes de tres tonos a tres velocidades, el humo de dos chimeneas, golondrinas y una
// paloma que anda por la cumbrera
function f_parisFueraVivo(R, t, x0, y0, x1, y1) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1, yn = y1 - Math.round(H * 0.2), qx = Math.round(x0 + W * 0.7);
  for (let k = 0; k < 3; k++) { const w = 8 + k * 4, cx = x0 - 16 + ((t * (1.2 + k * 0.9) + k * 37 + x0) % (W + 34)), cy = y0 + 6 + k * Math.round(H * 0.09); f_nube(R, Math.round(cx), cy, w); }
  const ed = f_parisEdif(x0, y0, x1, y1), e = ed[1] ?? ed[0], ex = e[0] + 2 + Math.floor(h(1, 3, 346) * (e[1] - 8)) + 2;
  for (const [hx, hy, n] of [[qx + 4, yn - 21, 6], [ex, e[2] - 9, 4]]) for (let k = 0; k < n; k++) { const u = ((t * 0.3 + k / n) % 1), px = hx + Math.sin(t * 0.8 + k * 2) * 2 + u * 7, py = hy - u * 15, r = 1 + u * 2.4;
    for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= r * r && (u < 0.5 || (Math.round(px) + i + Math.round(py) + j) % 2 === 0)) R.pset(Math.round(px) + i, Math.round(py) + j, j < 0 ? hex('#eef0f0') : hex('#c8ccd4')); }
  for (let k = 0; k < 3; k++) f_pajaro(R, Math.round(x0 + ((t * (7 + k * 2) + k * 31) % (W + 12)) - 6), y0 + Math.round(H * 0.2) + k * 4 + Math.round(Math.sin(t * 1.3 + k) * 2), t, k);
  const pu = (t * 0.12) % 1, px = Math.round(x0 + 4 + (pu < 0.5 ? pu * 2 : 2 - pu * 2) * W * 0.5), pd = pu < 0.5 ? 1 : -1, pico = Math.sin(t * 5) > 0.5 ? 1 : 0;
  R.pset(px, yn - 2, f_P.metalS); R.pset(px - pd, yn - 2, f_P.metalS); R.pset(px - pd * 2, yn - 2, f_P.metalD); R.pset(px + pd, yn - 3 + pico, f_P.metalL); R.pset(px, yn - 1, f_P.teja);
}

// las hojas colgadas: filas apretadas en los dos paños de pared, cada una con su sitio, su tamaño y su turno de aparición
let f_HOJAS = null;

function f_hojas() {
  if (f_HOJAS) return f_HOJAS; const L = []; let k = 0;
  for (const [xa, xb] of [[7, 111], [188, 265]]) { let y = 23;
    for (let r = 0; y < 91; r++) { const hh = 6 + Math.floor(h(r, xa, 301) * 4); let x = xa + Math.floor(h(r, xa, 302) * 3);
      while (x < xb - 5) { const w = Math.min(xb - x, 5 + Math.floor(h(k, 1, 303) * 5)); L.push({ x, y: y + (h(k, 3, 305) < 0.25 ? 1 : 0), w, h: hh - (h(k, 2, 304) < 0.3 ? 1 : 0), k, rango: h(k, 4, 306) }); x += w + 1 + (h(k, 5, 307) < 0.2 ? 1 : 0); k++; }
      y += hh + 1; } }
  return (f_HOJAS = L);
}

// un dibujo NUESTRO de w × hh (manchas de color: una nave ovalada, un castillo de torres, un traje en triángulo, un
// planeta con anillo sobre papel oscuro, un paisaje a bandas, una trama de máquina o un boceto a lápiz), con su chincheta
function f_dibujo(R, x, y, w, hh, k, sombra) {
  const { rect, pset } = R, tipo = Math.floor(h(k, 7, 310) * 7), oscuro = tipo === 3 || h(k, 8, 311) < 0.1;
  const pap = oscuro ? [hex('#1e2450'), hex('#2a1a3e'), hex('#12303a')][k % 3] : [f_P.papel, f_P.bl, hex('#ece0c0'), hex('#e2eef0'), hex('#f4e2dc'), f_P.kraft][Math.floor(h(k, 9, 312) * 6)];
  const a = f_VIVOS[Math.floor(h(k, 10, 313) * 10)], b = f_VIVOS[Math.floor(h(k, 11, 314) * 10)], c = f_VIVOS[(k * 7 + 3) % 10];
  if (sombra) { rect(x + 1, y + hh, x + w, y + hh, sombra); rect(x + w, y + 1, x + w, y + hh, sombra); }
  rect(x, y, x + w - 1, y + hh - 1, pap);
  const cx = x + (w >> 1), by = y + hh - 2, my = y + (hh >> 1);
  if (tipo === 0) { rect(x + 1, my - 1, x + w - 2, my, a); rect(x + 2, my - 2, x + w - 3, my - 2, b); pset(cx, my - 3, c); rect(x + 2, my + 1, x + w - 3, my + 1, b); pset(x + 1, by, c); pset(x + 3, by, c); }
  else if (tipo === 1) { rect(x + 1, by, x + w - 2, by, b); for (let i = 0; i * 2 + 1 < w - 1; i++) { const th = 2 + Math.floor(h(k, i, 315) * (hh - 4)); rect(x + 1 + i * 2, by - th, x + 1 + i * 2, by - 1, i % 2 ? a : c); } }
  else if (tipo === 2) { for (let j = 0; j < hh - 3; j++) { const m = Math.min((w >> 1) - 1, (j + 1) >> 1); rect(cx - m, y + 2 + j, cx + m, y + 2 + j, j % 3 === 2 ? b : a); } pset(cx, y + 1, c); }
  else if (tipo === 3) { R.disco(cx + 0.5, y + hh / 2, Math.min(w, hh) / 2 - 1.2, a); rect(x + 1, my, x + w - 2, my, b); pset(x + 1, y + 1, f_P.bl); pset(x + w - 2, by, f_P.bl); pset(x + w - 3, y + 1, c); }
  else if (tipo === 4) { rect(x + 1, y + 1, x + w - 2, my - 1, a); rect(x + 1, my, x + w - 2, by - 1, b); rect(x + 1, by, x + w - 2, by, c); pset(x + w - 3, y + 2, f_P.bl); }
  else if (tipo === 5) { for (let j = 1; j < hh - 1; j++) for (let i = 1; i < w - 1; i++) if ((i + j + k) % 3 === 0) pset(x + i, y + j, (i + j) % 2 ? a : b); }
  else { for (let j = 2; j < hh - 1; j += 2) rect(x + 1, y + j, x + w - 2 - ((j + k) % 3), y + j, oscuro ? f_P.zincL : hex('#8a8698')); rect(x + 1, y + 1, x + 2, y + 2, a); }
  pset(cx, y, k % 4 ? f_P.rojo : f_P.metalD);
}

// el suelo de roble en espiga: tablas a un lado y al otro, cada una con su tono, juntas y veta
function f_espiga(x, y, k = 330) {
  const bw = 12, banda = Math.floor(x / bw), xi = x - banda * bw, s = banda % 2 ? 1 : -1, v = y * 2 + s * xi + 400, tabla = Math.floor(v / 5), tono = h(tabla, banda, k);
  if (v % 5 === 0 || xi === 0) return f_P.robleS;
  if (h(x, y, k + 1) < 0.07) return f_P.robleS;
  return tono < 0.28 ? f_P.robleL : tono < 0.8 ? f_P.roble : hex('#a06e3a');
}

// el estudio vacío o lleno de dibujos (lleno: con todas las hojas en la pared), lo que no se mueve
function f_parisFijo(R, lleno) {
  const { rect, pset, linea, poligono, disco } = R;
  // el techo, la cornisa con dentículos y la pared gris verdosa con su grano, manchas y desconchones
  rect(0, 0, 319, 8, f_P.techo); for (let y = 0; y < 9; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y >> 1, 320) < 0.1) pset(x, y, f_P.techoS);
  rect(0, 9, 319, 9, f_P.techoS); rect(0, 10, 319, 11, f_P.zoc); rect(0, 12, 319, 13, f_P.zocS); for (let x = 0; x < 320; x += 4) rect(x, 12, x + 1, 13, f_P.zoc); rect(0, 14, 319, 14, f_P.paredD);
  rect(0, 15, 319, 121, f_P.pared);
  for (let y = 15; y < 115; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 321), m = h(x >> 4, y >> 4, 322); if (v < 0.07) pset(x, y, f_P.paredL); else if (v < 0.12) pset(x, y, f_P.paredS); else if (m < 0.3 && (x + y) % 2 === 0 && h(x >> 1, y >> 1, 323) < 0.4) pset(x, y, f_P.paredL); else if (y < 22 && (x + y) % 2 === 0) pset(x, y, f_P.paredS); }
  // los paños de moldura (boiserie), el friso de media altura y el zócalo
  for (const [xa, xb] of [[3, 113], [185, 267], [271, 317]]) { f_bisel(R, xa, 18, xb, 98, f_P.paredL, f_P.paredD); f_bisel(R, xa + 2, 20, xb - 2, 96, f_P.paredD, f_P.paredL); f_bisel(R, xa, 104, xb, 113, f_P.paredL, f_P.paredD); }
  rect(0, 99, 319, 99, f_P.paredL); rect(0, 100, 319, 101, hex('#b4beb4')); rect(0, 102, 319, 102, f_P.paredD);
  rect(0, 115, 319, 121, f_P.zoc); rect(0, 115, 319, 115, f_P.bl); rect(0, 120, 319, 120, f_P.zocS); rect(0, 121, 319, 121, f_P.paredD); for (let x = 0; x < 320; x++) if (h(x, 5, 324) < 0.1) pset(x, 117 + (x % 3), f_P.zocS);
  // las huellas de la pared vacía: cuadros que ya no están, clavos, restos de cinta y una grieta
  for (const [x0, y0, w, hh] of [[20, 32, 22, 28], [60, 40, 34, 22], [200, 30, 26, 34], [236, 52, 20, 16]]) { for (let y = y0; y < y0 + hh; y++) for (let x = x0; x < x0 + w; x++) if ((x + y) % 2 === 0) pset(x, y, f_P.paredL); f_bisel(R, x0 - 1, y0 - 1, x0 + w, y0 + hh, f_P.pared, f_P.paredS); pset(x0 + (w >> 1), y0 - 3, f_P.hierro); pset(x0 + (w >> 1), y0 - 2, f_P.paredD); }
  for (let k = 0; k < 26; k++) { const x = 8 + Math.floor(h(k, 1, 325) * 100) + (k % 2 ? 182 : 0) * (h(k, 3, 325) < 0.8 ? 1 : 0), y = 24 + Math.floor(h(k, 2, 325) * 70); pset(x, y, f_P.paredD); if (k % 3 === 0) { rect(x + 2, y + 1, x + 4, y + 1, f_P.crema); } }
  let gx = 100; for (let y = 15; y < 44; y++) { gx += h(y, 1, 326) < 0.35 ? (h(y, 2, 326) < 0.5 ? -1 : 1) : 0; pset(gx, y, f_P.paredD); if (y % 7 === 3) pset(gx + 1, y + 1, f_P.paredS); }
  f_parisPared(R);
  // las hojas
  if (lleno) for (const q of f_hojas()) f_dibujo(R, q.x, q.y, q.w, q.h, q.k, f_P.paredD);
  // el balcón: el cerco blanco, los tejados, la barandilla de hierro forjado, el alféizar con geranios y las dos hojas
  // de la puerta abiertas hacia dentro
  rect(115, 17, 183, 121, f_P.paredD); rect(116, 18, 182, 121, f_P.zoc); rect(116, 18, 182, 18, f_P.bl); rect(116, 18, 116, 121, f_P.bl); rect(119, 21, 179, 121, f_P.zocS); rect(120, 22, 178, 121, f_P.hierro);
  R.recorte([121, 23, 177, 112]); f_parisFuera(R, 121, 23, 177, 112); R.recorte(null);
  rect(121, 113, 177, 121, f_P.cremaS); rect(121, 113, 177, 113, f_P.bl); rect(121, 114, 177, 114, f_P.crema); for (let x = 121; x <= 177; x++) if (h(x, 9, 327) < 0.2) pset(x, 116 + (x % 4), f_P.cremaD);
  rect(121, 91, 177, 92, f_P.hierro); rect(121, 110, 177, 110, f_P.hierro); rect(121, 93, 177, 93, hex('#4a4a58'));
  for (let x = 123; x <= 177; x += 6) { rect(x, 93, x, 110, f_P.hierro); if (x + 3 <= 176) { R.anillo(x + 3.5, 98.5, 2.2, f_P.hierro); R.anillo(x + 3.5, 105.5, 2.2, f_P.hierro); pset(x + 3, 102, f_P.hierro); } }
  rect(124, 107, 132, 112, f_P.teja); rect(124, 107, 132, 107, hex('#e08a5a')); rect(124, 111, 132, 112, f_P.tejaS); for (let k = 0; k < 7; k++) { const x = 123 + Math.floor(h(k, 1, 328) * 11), y = 101 + Math.floor(h(k, 2, 328) * 5); pset(x, y, k % 3 ? f_P.rojo : hex('#f46a6a')); pset(x + 1, y + 1, f_P.verdeS); pset(x, y + 2, f_P.verde); }
  for (const s of [-1, 1]) { const xa = s < 0 ? 105 : 180, xb = xa + 14, c = (x) => (s < 0 ? x - xa : xb - x);
    poligono([[xa, s < 0 ? 19 : 22], [xb + 1, s < 0 ? 22 : 19], [xb + 1, s < 0 ? 122 : 127], [xa, s < 0 ? 127 : 122]], f_P.paredD);
    for (let x = xa + 1; x < xb; x++) { const ya = 21 + Math.round((14 - c(x)) * 0.2) + (s < 0 ? 0 : 0), yb = 125 - Math.round((14 - c(x)) * 0.3);
      for (let y = ya; y <= yb; y++) { const borde = c(x) < 3 || c(x) > 11 || (y - ya) % 25 < 3 || y > yb - 5; pset(x, y, borde ? (c(x) === 1 ? f_P.bl : f_P.zoc) : (x + y) % 9 < 2 ? hex('#e8f4f8') : (y - ya) % 25 < 12 ? hex('#b8d4e4') : hex('#9cc0d8')); } }
  }
  // el suelo de roble en espiga, la sombra al pie de la pared y el sol que entra por el balcón (con la sombra de la cruz)
  for (let y = 122; y < 180; y++) for (let x = 0; x < 320; x++) { let c = f_espiga(x, y); if (y < 127) c = f_mez(c, f_P.nogalD, 0.4 - (y - 122) * 0.07); pset(x, y, c); }
  poligono([[122, 122], [178, 122], [150, 176], [66, 176]], (x, y) => { const u = (x - (122 - (y - 122) * 1.04)) / (56 + (y - 122) * 0.52); return Math.abs(u - 0.5) < 0.03 || (y - 122) % 19 === 17 ? R.pget(x, y) : f_mez(R.pget(x, y), hex('#fff0c0'), 0.3); });
  // el planero de nogal (cajones anchos con dos tiradores de latón), con rollos, la cafetera italiana y el tocadiscos
  rect(9, 99, 63, 131, f_P.k); rect(10, 100, 62, 130, f_P.nogal); rect(10, 100, 62, 100, f_P.nogalL); rect(9, 98, 63, 99, f_P.nogalS); rect(9, 98, 63, 98, f_P.nogalL);
  for (let c = 0; c < 5; c++) { const y = 102 + c * 6; rect(11, y, 61, y + 4, f_P.nogalS); rect(12, y, 61, y + 3, f_P.nogal); rect(12, y, 61, y, f_P.nogalL); for (const x of [22, 50]) { rect(x - 2, y + 2, x + 2, y + 2, f_P.oro); pset(x - 2, y + 3, f_P.oroS); pset(x + 2, y + 3, f_P.oroS); } rect(33, y + 1, 39, y + 2, f_P.papel); for (let x = 13; x < 61; x += 3) if (h(x, c, 329) < 0.3) pset(x, y + 1 + (x % 3), f_P.nogalS); }
  rect(12, 131, 14, 133, f_P.nogalD); rect(58, 131, 60, 133, f_P.nogalD); for (let x = 8; x < 66; x++) if (x % 2) pset(x, 133, f_P.robleD);
  for (const [x, y, w, c] of [[24, 95, 20, f_P.papel], [26, 92, 16, hex('#e2eef0')], [30, 89, 12, f_P.kraft]]) { rect(x, y, x + w, y + 2, c); rect(x, y + 2, x + w, y + 2, f_P.papelS); disco(x + 0.5, y + 1.5, 1.6, f_P.papelS); pset(x, y + 1, f_P.cremaD); rect(x + w, y, x + w, y + 2, f_P.cremaD); }
  rect(14, 90, 19, 97, f_P.metalS); rect(15, 90, 18, 93, f_P.metal); rect(14, 94, 19, 94, f_P.metalD); rect(15, 95, 18, 97, f_P.metalL); pset(15, 91, f_P.bl); rect(20, 91, 20, 95, f_P.k); pset(16, 89, f_P.k); pset(17, 89, f_P.k); pset(13, 91, f_P.metalD);
  rect(46, 94, 61, 97, f_P.k); rect(47, 95, 60, 96, hex('#6a3a2a')); rect(47, 95, 60, 95, hex('#8a5038')); rect(48, 93, 57, 93, f_P.hierro); rect(49, 92, 56, 92, hex('#3a3a48')); pset(59, 92, f_P.metalL); linea(59, 92, 56, 93, f_P.metal);
  // la cesta de mimbre con rollos y tubos
  rect(67, 118, 80, 131, f_P.k); for (let y = 119; y < 131; y++) for (let x = 68; x < 80; x++) pset(x, y, (x + (y >> 1)) % 3 === 0 ? hex('#8a6430') : (y % 2 ? hex('#c89a52') : hex('#b0843e')));
  for (const [x, y0, c] of [[69, 104, f_P.papel], [72, 100, f_P.kraft], [75, 106, hex('#e2eef0')], [77, 102, f_P.papel]]) { rect(x, y0, x + 2, 118, c); rect(x + 2, y0, x + 2, 118, f_P.papelS); rect(x, y0, x + 2, y0, f_P.k); pset(x + 1, y0, f_P.cremaD); }
  // la mesa de dibujo inclinada, con su hoja a medias, la regla en T, el flexo y el taburete
  for (const [xa, ya, xb, yb] of [[199, 114, 203, 132], [237, 114, 241, 132], [209, 100, 211, 126], [245, 100, 247, 126]]) { linea(xa, ya, xb, yb, f_P.nogalD); linea(xa + 1, ya, xb + 1, yb, f_P.nogal); }
  linea(202, 126, 240, 126, f_P.nogalD); linea(204, 120, 244, 104, f_P.nogalS);
  poligono([[195, 112], [241, 112], [252, 93], [206, 93]], f_P.k); poligono([[197, 111], [240, 111], [250, 94], [207, 94]], f_P.pinoL); rect(195, 113, 241, 114, f_P.pinoS); rect(195, 115, 241, 115, f_P.k);
  poligono([[203, 109], [234, 109], [242, 96], [211, 96]], f_P.bl); for (const [x, y, r, c] of [[216, 103, 3, 7], [226, 101, 2.4, 2], [221, 106, 1.6, 0]]) disco(x, y, r, f_VIVOS[c]); linea(210, 107, 232, 99, hex('#8a8698')); linea(228, 105, 236, 98, f_VIVOS[4]);
  linea(200, 106, 246, 106, f_P.robleS); rect(244, 104, 247, 108, f_P.robleS);
  linea(250, 93, 255, 78, f_P.metalD); linea(255, 78, 243, 70, f_P.metalD); pset(255, 78, f_P.metalL); poligono([[236, 68], [244, 66], [246, 71], [237, 75]], f_P.k); poligono([[238, 69], [243, 68], [244, 71], [238, 73]], f_P.verde); pset(239, 69, f_P.verdeL);
  rect(257, 116, 268, 117, f_P.k); rect(258, 115, 267, 116, hex('#8a3a30')); rect(258, 115, 267, 115, hex('#b05444')); for (const [xa, xb] of [[259, 257], [262, 262], [266, 268]]) linea(xa, 118, xb, 132, f_P.nogalD); rect(258, 126, 267, 126, f_P.nogalS);
  for (let x = 196; x < 270; x++) if (x % 2) pset(x, 133, f_P.robleD);
  // la estantería de la derecha (por debajo de Atom): lomos, rollos, botes de pintura y cajas
  rect(273, 50, 317, 131, f_P.k); rect(274, 51, 316, 130, f_P.nogalD); rect(274, 51, 316, 51, f_P.nogalL); rect(274, 51, 275, 130, f_P.nogal); rect(315, 51, 316, 130, f_P.nogal);
  for (const y of [70, 90, 110, 129]) { rect(276, y, 314, y + 1, f_P.nogal); rect(276, y, 314, y, f_P.nogalL); }
  for (let x = 277; x < 313;) { const w = 2 + Math.floor(h(x, 1, 332) * 3), a = 9 + Math.floor(h(x, 2, 332) * 7), c = [hex('#6a4a3a'), hex('#4a5a6a'), hex('#7a6a4a'), hex('#5a3a4a'), hex('#4a6a5a')][Math.floor(h(x, 3, 332) * 5)]; rect(x, 70 - a, x + w - 1, 69, c); rect(x, 70 - a, x, 69, f_mez(c, f_P.bl, 0.25)); pset(x + (w >> 1), 70 - a + 2, f_P.oroS); x += w + (h(x, 4, 332) < 0.2 ? 2 : 0); }
  for (let k = 0; k < 9; k++) { const x = 279 + (k % 5) * 7 + (k > 4 ? 3 : 0), y = k > 4 ? 80 : 86; disco(x + 0.5, y + 0.5, 3, f_P.papelS); disco(x + 0.5, y + 0.5, 2.2, k % 3 ? f_P.papel : f_P.kraft); pset(x, y, f_P.cremaD); }
  for (let k = 0; k < 5; k++) { const x = 277 + k * 8, c = f_mez(f_VIVOS[(k * 3 + 1) % 10], f_P.nogalD, 0.35); rect(x, 102, x + 5, 109, f_P.metalS); rect(x, 102, x + 5, 102, f_P.metalL); rect(x, 104, x + 5, 107, c); pset(x + 1 + (k % 3), 103, c); pset(x + 5, 105, f_mez(c, f_P.k, 0.3)); }
  rect(278, 116, 296, 128, hex('#a88a5a')); rect(278, 116, 296, 116, hex('#c8a878')); rect(286, 116, 288, 128, hex('#8a6e42')); rect(299, 119, 312, 128, hex('#8a7a9a')); rect(299, 119, 312, 119, hex('#a898b4')); rect(302, 122, 309, 123, f_P.papel);
  for (let x = 272; x < 319; x++) if (x % 2) pset(x, 132, f_P.robleD);
  // bolas de papel y hojas caídas por el suelo
  for (const [x, y] of [[92, 138], [176, 136], [186, 141], [30, 142], [248, 140]]) { disco(x, y, 1.6, f_P.papel); pset(x, y + 1, f_P.papelS); pset(x + 2, y + 2, f_P.robleD); }
  for (const [x, y, k] of [[100, 134, 3], [224, 138, 8]]) { poligono([[x, y], [x + 9, y - 1], [x + 11, y + 3], [x + 2, y + 4]], f_P.papel); pset(x + 4, y + 1, f_VIVOS[k]); pset(x + 6, y + 2, f_VIVOS[k + 1]); linea(x + 2, y + 5, x + 11, y + 4, f_P.robleD); }
}
// el estudio de París, entero (ver la cabecera de cine)
function f_paris(R, t, o) {
  const { pset, rect, linea } = R, d = Math.max(0, Math.min(1, o.dibujos ?? 1)), H = f_hojas();
  const vacio = f_capa(R, 'paris0', () => f_parisFijo(R, false)), lleno = f_capa(R, 'paris1', () => f_parisFijo(R, true));
  if (d >= 1) R.copiar(lleno); else { R.copiar(vacio); if (d > 0) for (const q of H) if (q.rango < d) for (let y = q.y; y <= q.y + q.h; y++) for (let x = q.x; x <= q.x + q.w; x++) pset(x, y, lleno[y * 320 + x]); }
  // por el balcón: nubes, humo, pájaros
  R.recorte([121, 23, 177, 93]); f_parisFueraVivo(R, t, 121, 23, 177, 112); R.recorte(null);
  // los visillos, que el aire hincha
  for (const s of [-1, 1]) for (let y = 23; y <= 117; y++) { const w = Math.round(5 + (y - 23) / 30 + Math.sin(t * 1.3 + y * 0.06 + s) * (y - 23) / 40);
    for (let i = 0; i < w; i++) { const x = s < 0 ? 121 + i : 177 - i; pset(x, y, f_mez(R.pget(x, y), f_P.bl, i === w - 1 ? 0.9 : (i + (y >> 3)) % 3 === 0 ? 0.5 : 0.72)); } }
  // la cuerda con dibujos tendidos delante del balcón, que se mecen
  if (d > 0.05) { for (let x = 112; x <= 186; x++) pset(x, 21 + Math.round(Math.sin((x - 112) / 74 * Math.PI) * 3), f_P.hierro);
    for (let k = 0; k < 6; k++) { if (h(k, 1, 350) > d * 1.4) continue; const x = 124 + k * 9, y = 22 + Math.round(Math.sin((x - 112) / 74 * Math.PI) * 3), sw = Math.round(Math.sin(t * 1.7 + k * 1.3) * 1.2);
      for (let j = 0; j < 9; j++) { const xx = x + Math.round(sw * j / 8); rect(xx, y + j, xx + 6, y + j, j === 0 ? f_P.papelS : f_P.papel); if (j > 1 && j < 8) { pset(xx + 2 + (j % 3), y + j, f_VIVOS[(k * 3 + 2) % 10]); pset(xx + 1 + ((j + k) % 4), y + j, f_VIVOS[(k * 5) % 10]); } pset(xx + 7, y + j, f_P.paredD); }
      pset(x + 3, y - 1, f_P.rojo); } }
  // el aire del balcón levanta la esquina de algunas hojas (una ola que sale del balcón)
  if (d > 0) for (const q of H) { if (q.k % 4 || q.rango >= d || (q.x + q.w > 104 && q.x < 120) || (q.x + q.w > 234 && q.y + q.h > 62)) continue; const dist = Math.abs(q.x + q.w / 2 - 150); if (Math.sin(t * 2.4 - dist / 16 + q.k) < 0.35) continue;
    const x = q.x + q.w - 1, y = q.y + q.h - 1; pset(x, y, f_P.paredD); pset(x - 1, y, f_P.paredD); pset(x, y - 1, f_P.paredD); pset(x - 1, y - 1, f_P.bl); pset(x - 2, y, f_P.papelS); }
  // el vapor de la cafetera, el disco que gira, el flexo que tiembla y las motas de polvo en el sol
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1, x = 17 + Math.round(Math.sin(t * 1.5 + k * 2 + u * 5) * 1.5), y = 87 - Math.round(u * 10); if (u < 0.85) pset(x, y, f_mez(R.pget(x, y), f_P.bl, 0.75 - u * 0.6)); }
  { const a = t * 3.5; pset(52 + Math.round(Math.cos(a) * 3), 92, f_P.metalL); pset(53 - Math.round(Math.cos(a) * 2), 92, hex('#d83a3a')); }
  const luz = Math.sin(t * 13) > -0.92 ? 0.34 : 0.2; f_haz(R, [[238, 73], [244, 71], [246, 108], [214, 110]], f_P.oroL, luz, 2); pset(240, 72, f_P.oroL); pset(241, 72, f_P.bl);
  for (let k = 0; k < 14; k++) { const u = (h(k, 1, 351) + t * (0.02 + h(k, 2, 351) * 0.03)) % 1, y = 124 + Math.round(u * 50), x = Math.round(150 - (y - 122) * (0.2 + h(k, 3, 351) * 0.8) + Math.sin(t * 0.7 + k) * 3), yy = y - (k % 4) * 9; if (Math.sin(t * 2 + k * 1.9) > 0) pset(x, yy, f_mez(R.pget(x, yy), hex('#fff6d0'), 0.7)); }
  // el gato del estudio, dormido sobre el radiador
  f_gato(R, 86, 101, t);
  return { suelo: 148, sueloAtras: 138, balcon: [120, 22, 178, 121], paredIzq: [7, 23, 111, 97], paredDer: [188, 23, 265, 97], planero: [10, 99, 62, 131], mesaDibujo: [195, 93, 252, 132], taburete: [262, 115], mesa: { x0: 26, x1: 294, y: 150, libre: [140, 190] } };
}
// la mesa de trabajo del estudio, por delante de los personajes (ver la cabecera de cineDelante)
function f_parisDelante(R, t, o) {
  if (o.mesa === false) return {};
  const { rect, pset, linea, poligono, disco } = R, s = Math.max(0, Math.min(1, o.salto ?? 0)), bote = (amp, fase = 0) => -Math.round(Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, s * 1.25 - fase)))) * amp);
  const llena = (o.mesa ?? ((o.dibujos ?? 1) > 0.15 ? 'llena' : 'limpia')) === 'llena';
  // la sombra bajo la mesa, lo que hay debajo (una caja con rollos, libros apilados) y los caballetes
  for (let y = 160; y < 180; y++) for (let x = 30; x < 291; x++) if ((x + y) % 2 === 0 || y < 164) pset(x, y, f_mez(R.pget(x, y), f_P.nogalD, 0.45));
  rect(84, 164, 112, 179, f_P.k); rect(85, 165, 111, 179, hex('#b08a54')); rect(85, 165, 111, 165, hex('#c8a46c')); rect(96, 165, 99, 179, hex('#8e6c3c')); for (const [x, y0, c] of [[87, 157, f_P.papel], [91, 160, f_P.kraft], [102, 158, hex('#e2eef0')], [106, 161, f_P.papel]]) { rect(x, y0, x + 2, 164, c); rect(x + 2, y0, x + 2, 164, f_P.papelS); }
  for (let k = 0; k < 5; k++) { const y = 175 - k * 3, c = [hex('#7a3a3a'), hex('#3a5a7a'), hex('#7a6a3a'), hex('#4a6a4a'), hex('#5a3a6a')][k]; rect(196 + (k % 2), y, 222 + (k % 2), y + 2, c); rect(196 + (k % 2), y, 222 + (k % 2), y, f_mez(c, f_P.bl, 0.3)); rect(198, y + 1, 200, y + 1, f_P.oroS); }
  for (const x of [50, 268]) { poligono([[x, 159], [x + 4, 159], [x - 4, 180], [x - 8, 180]], f_P.pinoS); poligono([[x + 2, 159], [x + 6, 159], [x + 14, 180], [x + 10, 180]], f_P.pino); linea(x - 3, 172, x + 10, 172, f_P.pinoS); linea(x - 3, 173, x + 10, 173, f_P.k); }
  // el tablero de pino: veta, manchas de tinta y de color, cortes de cuchilla; el canto y su sombra
  poligono([[33, 149], [287, 149], [296, 159], [24, 159]], f_P.k); poligono([[34, 150], [286, 150], [294, 158], [26, 158]], f_P.pino);
  for (let y = 150; y <= 158; y++) { const xa = Math.round(34 - (y - 150)), xb = Math.round(286 + (y - 150)); for (let x = xa + 1; x < xb; x++) { const v = h(x >> 3, y, 360); if (v < 0.22 && h(x, y, 361) < 0.8) pset(x, y, f_P.pinoS); else if (v > 0.86) pset(x, y, f_P.pinoL); } pset(xa + 1, y, f_P.pinoL); }
  for (const [x, y, c] of [[70, 155, 4], [118, 152, 1], [162, 156, 7], [206, 152, 0], [250, 156, 5], [150, 151, 2]]) { pset(x, y, f_mez(f_VIVOS[c], f_P.pino, 0.3)); pset(x + 1, y, f_mez(f_VIVOS[c], f_P.pino, 0.5)); pset(x, y + 1, f_mez(f_VIVOS[c], f_P.pino, 0.6)); }
  rect(25, 159, 295, 161, f_P.pinoS); rect(25, 159, 295, 159, f_P.pinoL); rect(25, 162, 295, 162, f_P.k);
  // hojas sobre la mesa (en escorzo), con sus manchas
  const hoja = (x, y, w, k, dy) => { poligono([[x, y + dy], [x + w, y + dy], [x + w + 3, y + 5 + dy], [x + 2, y + 5 + dy]], k % 3 === 2 ? hex('#e2eef0') : f_P.papel); linea(x + 2, y + 6 + dy, x + w + 3, y + 6 + dy, f_P.pinoS);
    for (let i = 0; i < 3; i++) rect(x + 3 + i * Math.floor(w / 3.4), y + 1 + dy + (i % 2), x + 4 + i * Math.floor(w / 3.4) + (k + i) % 3, y + 2 + dy + (i % 2) * 2, f_VIVOS[(k * 3 + i * 2) % 10]); };
  if (llena) { hoja(60, 151, 20, 1, bote(2, 0.05)); hoja(70, 152, 18, 4, bote(3, 0.02)); hoja(206, 152, 16, 8, bote(3, 0.04)); hoja(236, 152, 16, 3, bote(2, 0.08)); }
  else hoja(206, 151, 20, 9, bote(2));
  // los flexos de los extremos (con su charco de luz en el tablero)
  for (const dir of [1, -1]) { const bx = dir > 0 ? 40 : 280, dy = bote(3, 0.1), tiembla = s > 0 && s < 1 ? Math.round(Math.sin(s * 30) * 1) : 0;
    rect(bx - 3, 148 + dy, bx + 3, 150 + dy, f_P.k); rect(bx - 2, 148 + dy, bx + 2, 149 + dy, f_P.metalD);
    linea(bx, 148 + dy, bx + dir * 5, 134 + dy, f_P.k); linea(bx + dir, 148 + dy, bx + dir * 6, 134 + dy, f_P.metalS); linea(bx + dir * 5, 134 + dy, bx + dir * 16 + tiembla, 127 + dy, f_P.k); linea(bx + dir * 5, 133 + dy, bx + dir * 16 + tiembla, 126 + dy, f_P.metalS); pset(bx + dir * 5, 134 + dy, f_P.metalL);
    const cx = bx + dir * 18 + tiembla; poligono([[cx - 4, 126 + dy], [cx + 4, 126 + dy], [cx + 6, 132 + dy], [cx - 6, 132 + dy]], f_P.k); poligono([[cx - 3, 127 + dy], [cx + 3, 127 + dy], [cx + 5, 131 + dy], [cx - 5, 131 + dy]], dir > 0 ? hex('#c84a3a') : hex('#3a7ab0')); pset(cx - 2, 128 + dy, f_P.bl); rect(cx - 4, 132 + dy, cx + 4, 132 + dy, f_P.oroL);
    const fl = Math.sin(t * 9 + dir) > -0.95 ? 0.4 : 0.22; f_haz(R, [[cx - 4, 133 + dy], [cx + 4, 133 + dy], [cx + 16, 157], [cx - 16, 157]], f_P.oroL, fl * 0.5, 2); f_haz(R, [[cx - 14, 151], [cx + 14, 151], [cx + 17, 157], [cx - 17, 157]], f_P.oroL, fl); }
  // tarros de pinceles y lápices, tinteros, la taza con su vapor, la paleta de godés, la regla y el teléfono
  const tarro = (x, dy, vid, pal) => { rect(x - 1, 140 + dy, x + 6, 150 + dy, f_P.k); rect(x, 141 + dy, x + 5, 149 + dy, vid); rect(x, 141 + dy, x, 149 + dy, f_mez(vid, f_P.bl, 0.5)); rect(x, 146 + dy, x + 5, 149 + dy, f_mez(vid, f_P.k, 0.2));
    pal.forEach((c, i) => { const xx = x + i * 1.6, top = 131 + (i * 5) % 4 + dy; linea(Math.round(xx + (i - 1.5) * 0.9), top, Math.round(xx + 0.5), 141 + dy, i % 2 ? f_P.pinoS : f_P.nogalS); pset(Math.round(xx + (i - 1.5) * 0.9), top, c); pset(Math.round(xx + (i - 1.5) * 0.9), top + 1, c); }); };
  if (llena) {
    tarro(100, bote(6, 0.03), hex('#9ac8dc'), [f_VIVOS[0], f_VIVOS[5], f_VIVOS[1], f_VIVOS[6]]); tarro(226, bote(7, 0.06), hex('#d8b070'), [f_P.hierro, f_VIVOS[7], f_P.hierro, f_VIVOS[2]]);
    for (const [x, c, a] of [[128, hex('#1a1a2a'), 5], [134, hex('#2a3a8a'), 8], [244, hex('#8a1a2a'), 6]]) { const dy = bote(a, 0.04); rect(x - 1, 145 + dy, x + 4, 151 + dy, f_P.k); rect(x, 146 + dy, x + 3, 150 + dy, c); pset(x, 146 + dy, f_P.bl); rect(x + 1, 143 + dy, x + 2, 144 + dy, f_P.k); }
    { const dy = bote(2, 0.1); poligono([[194, 151 + dy], [206, 151 + dy], [208, 156 + dy], [194, 156 + dy]], f_P.bl); for (let i = 0; i < 5; i++) { rect(195 + i * 2 + (i > 2 ? 1 : 0), 152 + dy + (i % 2) * 2, 188 + i * 2 + (i > 2 ? 1 : 0), 153 + dy + (i % 2) * 2, f_VIVOS[(i * 3 + 1) % 10]); } linea(194, 157 + dy, 208, 157 + dy, f_P.pinoS); }
    { const dy = bote(1, 0.1); linea(64, 157 + dy, 100, 157 + dy, hex('#e8c85a')); for (let x = 66; x < 100; x += 3) pset(x, 157 + dy, f_P.oroS); }
  }
  { const dy = bote(8, 0.02), x = llena ? 114 : 100; rect(x - 2, 150 + dy, x + 8, 151 + dy, f_P.k); rect(x - 1, 150 + dy, x + 7, 150 + dy, f_P.bl); rect(x, 144 + dy, x + 6, 149 + dy, f_P.k); rect(x + 1, 145 + dy, x + 5, 149 + dy, f_P.bl); rect(x + 1, 145 + dy, x + 5, 145 + dy, hex('#5a3a22')); rect(x + 5, 146 + dy, x + 5, 149 + dy, f_P.papelS); pset(x + 7, 146 + dy, f_P.k); pset(x + 8, 147 + dy, f_P.k); pset(x + 7, 148 + dy, f_P.k);
    for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1, px = x + 3 + Math.round(Math.sin(t * 2 + k * 2.1 + u * 4) * 1.4), py = 143 + dy - Math.round(u * 8); pset(px, py, f_mez(R.pget(px, py), f_P.bl, 0.7 - u * 0.5)); } }
  { const dy = bote(4, 0.07), x = 252; rect(x - 1, 144 + dy, x + 15, 152 + dy, f_P.k); rect(x, 145 + dy, x + 14, 151 + dy, hex('#2a2a36')); rect(x, 145 + dy, x + 14, 145 + dy, hex('#4a4a5a')); disco(x + 7.5, 148.5 + dy, 3, hex('#c8c0a8')); disco(x + 7.5, 148.5 + dy, 1.2, hex('#2a2a36')); rect(x - 2, 141 + dy + (s > 0.1 && s < 0.9 ? -2 : 0), x + 16, 143 + dy + (s > 0.1 && s < 0.9 ? -2 : 0), f_P.k); rect(x - 1, 142 + dy + (s > 0.1 && s < 0.9 ? -2 : 0), x + 15, 142 + dy + (s > 0.1 && s < 0.9 ? -2 : 0), hex('#4a4a5a')); }
  return { mesa: { x0: 26, x1: 294, y: 150, frente: 158, libre: [140, 190] } };
}

// una cortina de terciopelo con pliegues, de y0 a y1, recogida en «ata» con un cordón dorado; abajo la mece el aire.
// xa–xb: su ancho; lado −1: a la izquierda del cristal, 1: a la derecha; pl: los cuatro tonos del pliegue
function f_cortina(R, t, xa, xb, lado, y0, y1, ata, pl) {
  const w0 = xb - xa + 1;
  for (let y = y0; y <= y1; y++) {
    const g = Math.max(0, 1 - Math.abs(y - ata) / 14), w = Math.round(w0 - g * 4), sw = y > ata ? Math.round(Math.sin(t * 0.9 + xa * 0.13 + y * 0.05) * (y - ata) / 30) : 0;
    const x0 = lado < 0 ? xa + sw : xb - w + 1 + sw, x1 = x0 + w - 1;
    for (let x = x0; x <= x1; x++) R.pset(x, y, pl[(x - x0 + (lado < 0 ? 0 : 2)) % 4]);
    R.pset(lado < 0 ? x1 : x0, y, f_P.k);
    if (y === y1) for (let x = x0; x <= x1; x++) R.pset(x, y1 + 1, x % 2 ? f_P.oro : f_P.oroS);
  }
  const ai = lado < 0 ? xa : xb - w0 + 5; R.rect(ai, ata, ai + w0 - 5, ata + 1, f_P.oro); R.rect(ai, ata, ai + w0 - 5, ata, f_P.oroL);
  const bx = lado < 0 ? ai + w0 - 4 : ai - 1; R.rect(bx, ata + 1, bx, ata + 4, f_P.oroS); R.pset(bx, ata + 5, f_P.oro); R.pset(bx, ata + 6, f_P.oroL);
}

// una vela encendida (la llama tiembla): x, y = la punta de la vela
function f_llama(R, x, y, t, k) { const a = Math.sin(t * 9 + k * 2.1) > 0.2 ? 1 : 0; R.pset(x, y - 1, hex('#ffb040')); R.pset(x, y - 2 - a, hex('#fff0a0')); if (a) R.pset(x, y - 2, hex('#ffd060')); }

// la galería de la cortina del salón: un bandó con ondas y borlas (se pinta cada fotograma, por delante de las nubes)
function f_bando(R) {
  const { rect, pset } = R;
  rect(0, 22, 58, 25, f_P.oroS); rect(0, 22, 58, 22, f_P.oroL); rect(0, 23, 58, 23, f_P.oro);
  for (let x = 0; x <= 58; x++) { const a = 5 + Math.round(Math.abs(Math.sin((x - 1) / 19 * Math.PI)) * 6); for (let y = 26; y < 26 + a; y++) pset(x, y, [hex('#3a7286'), hex('#2e5a6a'), hex('#22465a'), hex('#2e5a6a')][(x + (y >> 1)) % 4]); pset(x, 26 + a, x % 2 ? f_P.oro : f_P.oroS); }
  for (const x of [1, 20, 39, 58]) { rect(x - 1, 30, x, 33, f_P.oro); pset(x - 1, 34, f_P.oroL); pset(x, 35, f_P.oroS); }
}

// el salón, lo que no se mueve
function f_salonFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, friso = hex('#d8caa6'), frisoS = hex('#cdbd96'), panel = hex('#e4d8ba'), panelS = hex('#c4b48c'), panelL = hex('#f4ecd4');
  // el techo, la cornisa dorada, el friso de escayola (tranquilo: ahí van el año y Atom) y la moldura dorada
  rect(0, 0, 319, 8, hex('#e6dcc4')); for (let y = 0; y < 9; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y >> 1, 400) < 0.1) pset(x, y, hex('#ddd2b8'));
  rect(0, 9, 319, 9, f_P.cremaS); rect(0, 10, 319, 11, hex('#f0e6cc')); rect(0, 12, 319, 13, hex('#cdb880')); for (let x = 0; x < 320; x += 5) rect(x, 12, x + 2, 13, hex('#e4d29a')); rect(0, 14, 319, 14, hex('#b89a50')); rect(0, 15, 319, 15, f_P.cremaD);
  rect(0, 16, 319, 45, friso); for (let y = 16; y < 46; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 401); if (v < 0.07) pset(x, y, frisoS); else if (v > 0.95) pset(x, y, hex('#e0d4b4')); else if (y > 41 && (x + y) % 2 === 0) pset(x, y, frisoS); }
  for (let x = 12; x < 268; x += 36) for (let i = 0; i < 24; i++) { const y = 26 + Math.round(Math.sin(i / 23 * Math.PI) * 5); pset(x + i, y, frisoS); if (i % 6 === 0) pset(x + i, y + 1, hex('#c2b088')); }
  rect(0, 46, 319, 46, f_P.oroL); rect(0, 47, 319, 47, f_P.oro); rect(0, 48, 319, 48, f_P.oroS);
  // el damasco granate: medallones en rombo y listas, con paños enmarcados en oro
  for (let y = 49; y < 104; y++) for (let x = 0; x < 320; x++) { const cx = Math.floor(x / 14), u = (x % 14) - 7, v = ((y - 49 + (cx % 2) * 9) % 18) - 9, r = Math.abs(u) / 6 + Math.abs(v) / 8;
    pset(x, y, (r < 1 && r > 0.72) || Math.abs(u) + Math.abs(v) < 2 ? f_P.vinoL : u === -7 && y % 2 ? f_P.vinoS : r < 0.72 && (x + y) % 2 === 0 && r > 0.4 ? hex('#872e42') : h(x, y, 402) < 0.05 ? f_P.vinoS : f_P.vino); }
  for (let y = 49; y < 54; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0 || y < 51) pset(x, y, f_mez(R.pget(x, y), f_P.vinoD, 0.4));
  // el arrimadero de madera lacada, con cuarterones fileteados en oro, y el rodapié
  rect(0, 104, 319, 124, panel); rect(0, 104, 319, 104, f_P.oro); rect(0, 105, 319, 105, panelL);
  for (let x = 2; x < 320; x += 38) { f_bisel(R, x, 108, x + 33, 121, panelL, panelS); f_bisel(R, x + 2, 110, x + 31, 119, hex('#d8be78'), hex('#d8be78')); for (let i = x + 4; i < x + 30; i += 3) if (h(i, 1, 403) < 0.3) pset(i, 112 + (i % 6), panelS); }
  rect(0, 125, 319, 131, hex('#cdbf9c')); rect(0, 125, 319, 125, panelL); rect(0, 130, 319, 130, hex('#a8986e')); rect(0, 131, 319, 131, hex('#6e5a3a'));
  // el parqué de Versalles (cuadros con sus aspas), con el reflejo de la ventana, y la alfombra oriental con flecos
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x + 6) % 18, v = (y - 132) % 18, tono = h(Math.floor((x + 6) / 18), Math.floor((y - 132) / 18), 404);
    let c = u === 0 || v === 0 ? f_P.robleD : u === v || u + v === 18 ? f_P.robleS : h(x, y, 405) < 0.06 ? f_P.robleS : (u > v) === (u + v > 18) ? (tono < 0.5 ? hex('#c08a4a') : hex('#b47e40')) : (tono < 0.5 ? hex('#cc9856') : hex('#c08a4a'));
    if (y < 137) c = f_mez(c, f_P.nogalD, 0.4 - (y - 132) * 0.07); pset(x, y, c); }
  f_haz(R, [[14, 132], [44, 132], [70, 178], [26, 178]], hex('#fff0c8'), 0.22, 2);
  const A = [[40, 145], [186, 145], [197, 175], [27, 175]];
  poligono(A.map(([x, y], i) => [x + (i === 0 || i === 3 ? -2 : 2), y]), (x, y) => (y % 2 ? hex('#e8dcc0') : R.pget(x, y)));
  poligono(A, (x, y) => { const fy = (y - 145) / 30, xa = 40 - 13 * fy, xb = 186 + 11 * fy, u = (x - xa) / (xb - xa), b = Math.min(u, 1 - u) * (xb - xa), bv = Math.min(y - 145, 175 - y);
    if (b < 2 || bv < 1) return hex('#1a2452'); if (b < 7 || bv < 4) return (Math.floor(u * 60) + y) % 4 === 0 ? f_P.oro : (Math.floor(u * 60) + y) % 4 === 2 ? hex('#c8d4e8') : hex('#24306a'); if (b < 9 || bv < 5) return f_P.oroS;
    const du = (u - 0.5) * 2, dv = (fy - 0.5) * 2, m = du * du + dv * dv * 1.2; if (m < 0.1) return (x + y) % 3 === 0 ? f_P.oroL : hex('#24306a'); if (m < 0.16) return f_P.oro;
    const X = Math.floor(u * 90), Y = y - 145; return (X + Y) % 10 === 0 || (X - Y + 100) % 10 === 0 ? hex('#6a1626') : (X % 10 === 5 && Y % 10 === 5) || (X % 10 === 0 && Y % 10 === 0) ? f_P.oroL : h(x, y, 406) < 0.08 ? hex('#7a1e2e') : hex('#8e2838'); });
  // la ventana alta de la izquierda (el cerco, los tejados; los cuarterones se pintan cada fotograma)
  rect(9, 20, 47, 117, f_P.cremaD); rect(10, 21, 46, 116, panelL); rect(12, 23, 44, 113, f_P.hierro);
  R.recorte([13, 24, 43, 112]); f_parisFuera(R, 13, 24, 43, 112); R.recorte(null); rect(10, 113, 46, 116, panel); rect(10, 113, 46, 113, panelL);
  // el sofá Luis XV bajo la ventana: marco dorado, seda a rayas, cojín redondo y patas curvas
  rect(15, 111, 61, 129, f_P.oroS); rect(16, 110, 60, 110, f_P.oro); rect(24, 108, 52, 109, f_P.oro); rect(34, 106, 42, 107, f_P.oroL); pset(38, 105, f_P.oroL);
  for (let y = 112; y <= 127; y++) for (let x = 17; x <= 59; x++) pset(x, y, (x >> 1) % 3 === 0 ? hex('#c8b06a') : (x >> 1) % 3 === 1 ? hex('#efe2c0') : hex('#dccb9c'));
  for (let x = 20; x < 58; x += 9) for (let y = 114; y < 126; y += 5) pset(x + ((y >> 2) % 2) * 4, y, f_P.oroS);
  rect(12, 120, 16, 137, f_P.oroS); rect(13, 119, 16, 121, f_P.oro); rect(60, 120, 64, 137, f_P.oroS); rect(60, 119, 63, 121, f_P.oro); pset(13, 120, f_P.oroL); pset(61, 120, f_P.oroL);
  rect(15, 128, 61, 135, hex('#e6d8b0')); rect(15, 128, 61, 128, hex('#f8f0d8')); for (let x = 17; x < 60; x += 2) if ((x >> 1) % 3 === 0) rect(x, 129, x + 1, 134, hex('#c8b06a')); rect(14, 136, 62, 138, f_P.oroS); rect(14, 136, 62, 136, f_P.oro);
  for (const x of [16, 38, 60]) { linea(x, 139, x - 1, 146, f_P.oroS); linea(x + 1, 139, x, 146, f_P.oro); pset(x - 2, 147, f_P.oroS); }
  disco(26, 124, 4.5, hex('#2e5a6a')); disco(26, 124, 3, hex('#3a7286')); pset(26, 124, f_P.oro); for (let x = 12; x < 66; x++) if (x % 2) pset(x, 148, f_P.robleD);
  // la chimenea de mármol blanco con su hogar de ladrillo, y encima el espejo dorado con su copete
  rect(67, 93, 143, 97, f_P.k); rect(68, 94, 142, 96, hex('#f2efe8')); rect(68, 96, 142, 96, hex('#c4c0b8')); rect(70, 98, 140, 131, hex('#8a867e')); rect(71, 98, 139, 131, hex('#e6e2da'));
  for (let k = 0; k < 40; k++) { const x = 72 + Math.floor(h(k, 1, 407) * 66), y = 99 + Math.floor(h(k, 2, 407) * 31); pset(x, y, hex('#b8b4bc')); pset(x + 1, y + 1, hex('#cfcbd0')); if (k % 4 === 0) pset(x + 2, y + 1, hex('#b8b4bc')); }
  rect(72, 99, 138, 103, hex('#d4d0c8')); for (let x = 76; x < 136; x += 6) { pset(x, 101, hex('#a8a49c')); pset(x + 1, 100, hex('#a8a49c')); pset(x + 2, 101, hex('#a8a49c')); pset(x + 3, 102, hex('#a8a49c')); }
  for (const x of [74, 131]) for (let i = 0; i < 3; i++) rect(x + i * 2, 106, x + i * 2, 128, hex('#bcb8b0'));
  rect(83, 105, 127, 131, f_P.k); for (let y = 106; y < 130; y++) for (let x = 84; x <= 126; x++) pset(x, y, y % 4 === 0 || (x + (y >> 2) * 4) % 8 === 0 ? hex('#22140f') : h(x, y, 408) < 0.2 ? hex('#4a2a20') : hex('#3a1e18'));
  rect(79, 129, 131, 131, f_P.oroS); rect(79, 129, 131, 129, f_P.oroL); for (let x = 81; x < 131; x += 4) pset(x, 130, f_P.oroD);
  rect(76, 39, 134, 93, f_P.k); rect(77, 40, 133, 92, f_P.oroS); rect(78, 41, 132, 91, f_P.oro); rect(79, 42, 131, 42, f_P.oroL); rect(79, 42, 79, 90, f_P.oroL); rect(81, 44, 129, 89, f_P.oroS); rect(82, 45, 128, 88, f_P.oroD);
  for (let i = 80; i < 132; i += 4) { pset(i, 43, f_P.oroD); pset(i, 90, f_P.oroD); } for (let j = 44; j < 90; j += 4) { pset(80, j, f_P.oroD); pset(130, j, f_P.oroD); }
  poligono([[92, 39], [98, 33], [105, 30], [112, 33], [118, 39]], f_P.k); poligono([[94, 39], [99, 34], [105, 32], [111, 34], [116, 39]], f_P.oro); disco(105, 36, 2.2, f_P.oroL); pset(105, 36, f_P.oroS); pset(99, 37, f_P.oroL); pset(111, 37, f_P.oroS);
  for (let y = 46; y <= 87; y++) for (let x = 83; x <= 127; x++) { const f = (y - 46) / 42 * 2 + (x - 83) / 44 * 0.8; pset(x, y, [hex('#b4c8d4'), hex('#a2b8c8'), hex('#8ea6ba'), hex('#7c94aa')][Math.min(3, Math.floor(f + f_b4(x, y)))]); }
  for (let y = 72; y <= 87; y++) for (let x = 83; x <= 127; x++) if ((x + y) % 2 === 0 || y > 80) pset(x, y, f_mez(R.pget(x, y), f_P.vino, 0.45));   // el damasco de enfrente, reflejado
  for (let y = 48; y <= 70; y++) for (let x = 85; x <= 90; x++) if ((x + y) % 2) pset(x, y, hex('#dce8ee'));   // la ventana, reflejada
  // sobre la repisa: el reloj dorado, dos jarrones de porcelana y dos candelabros de tres brazos
  rect(99, 82, 111, 93, f_P.k); rect(100, 83, 110, 92, f_P.oro); rect(100, 83, 110, 83, f_P.oroL); rect(102, 80, 108, 82, f_P.oroS); pset(105, 79, f_P.oroL); disco(105.5, 87.5, 3.2, f_P.bl); pset(105, 87, f_P.k); pset(105, 86, f_P.k); pset(106, 88, f_P.k); rect(100, 92, 110, 92, f_P.oroD);
  for (const x of [89, 118]) { rect(x, 87, x + 4, 93, f_P.k); rect(x + 1, 86, x + 3, 92, hex('#e8eef4')); rect(x, 88, x + 4, 91, hex('#e8eef4')); pset(x + 2, 89, hex('#2a4a9a')); pset(x + 1, 90, hex('#2a4a9a')); pset(x + 3, 88, hex('#2a4a9a')); rect(x + 1, 85, x + 3, 85, hex('#2a4a9a')); }
  for (const x of [73, 137]) { rect(x - 1, 92, x + 1, 93, f_P.oroS); rect(x, 82, x, 92, f_P.oro); linea(x - 4, 82, x + 4, 82, f_P.oro); for (const d of [-4, 0, 4]) { rect(x + d, 78, x + d, 81, f_P.bl); pset(x + d, 82, f_P.oroL); } }
  // los apliques de pared, con su resplandor en el damasco
  for (const x of [63, 148]) { for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) { const g = 1 - Math.hypot(i, j) / 11; if (g > 0 && g > f_b4(x + i, 64 + j) * 0.9) pset(x + i, 64 + j, f_mez(R.pget(x + i, 64 + j), hex('#ffc870'), 0.35 * g + 0.1)); }
    rect(x - 1, 68, x + 1, 74, f_P.oroS); pset(x, 75, f_P.oro); linea(x - 3, 68, x + 3, 68, f_P.oro); for (const d of [-3, 3]) { rect(x + d, 64, x + d, 67, f_P.bl); } disco(x, 71, 1.5, f_P.oroL); }
  // la mesita de mármol y bronce (el taxímetro lo pone la escena encima, en y 126)
  for (let x = 160; x <= 182; x++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - ((x - 171) / 11.5) ** 2)) * 2); rect(x, 126 - a, x, 127 + a, hex('#ece8e0')); pset(x, 128 + a, f_P.oroS); pset(x, 129 + a, f_P.k); if (h(x, 3, 409) < 0.3) pset(x, 126, hex('#c0bcc4')); pset(x, 125 - a, f_P.bl); }
  rect(170, 131, 172, 146, f_P.oro); rect(170, 131, 170, 146, f_P.oroL); rect(169, 136, 173, 138, f_P.oroS); linea(171, 146, 164, 150, f_P.oroS); linea(171, 146, 178, 150, f_P.oroS); linea(171, 145, 164, 149, f_P.oro); linea(171, 145, 178, 149, f_P.oro); rect(170, 147, 172, 150, f_P.oroS);
  for (let x = 162; x < 181; x++) if (x % 2) pset(x, 151, f_P.robleD);
  // el dosel: la corona dorada, el paño morado del fondo con sus pliegues y lunares de oro, y las dos caídas recogidas
  const mo = [hex('#4a2e82'), hex('#3a2268'), hex('#2c1850'), hex('#3a2268')], moL = [hex('#6a46a8'), hex('#583a94'), hex('#46287c'), hex('#583a94')];
  for (let y = 31; y <= 136; y++) for (let x = 212; x <= 250; x++) pset(x, y, (x % 8 === 3 && y % 8 === 3) || (x % 8 === 7 && y % 8 === 7) ? f_P.oro : mo[(x + 1) % 4 < 2 ? ((x >> 2) % 2 ? 0 : 1) : ((x >> 2) % 2 ? 1 : 2)]);
  for (const s of [-1, 1]) for (let y = 31; y <= 136; y++) { const fuera = y < 98 ? Math.round(15 * Math.sin(Math.min(1, (y - 31) / 67) * Math.PI / 2)) : 14 - Math.min(3, (y - 98) >> 2) + ((y >> 3) % 2), dentro = y < 98 ? Math.round(7 * ((y - 31) / 67) ** 2) : 6;
    for (let i = dentro; i <= fuera + 4 - (y < 98 ? 0 : 0); i++) { const x = s < 0 ? 214 - i : 248 + i; pset(x, y, i === fuera + 4 ? f_P.k : moL[(i + (y >> 4)) % 4]); } if (y === 136) for (let i = dentro; i <= fuera + 4; i++) pset(s < 0 ? 214 - i : 248 + i, 137, i % 2 ? f_P.oro : f_P.oroS); }
  for (const x of [197, 265]) { rect(x - 2, 97, x + 4, 99, f_P.oro); rect(x - 2, 97, x + 4, 97, f_P.oroL); rect(x, 100, x + 1, 105, f_P.oroS); pset(x, 106, f_P.oro); pset(x + 1, 107, f_P.oroL); }
  rect(206, 25, 256, 31, f_P.k); rect(207, 26, 255, 30, f_P.oro); rect(207, 26, 255, 26, f_P.oroL); rect(207, 30, 255, 30, f_P.oroS); for (let x = 210; x < 254; x += 6) { pset(x, 28, x % 12 ? f_P.rojo : hex('#3a8ad8')); poligono([[x - 3, 25], [x, 20], [x + 3, 25]], f_P.oro); pset(x, 20, f_P.oroL); pset(x, 19, f_P.bl); }
  // la tarima de dos escalones, alfombrada en rojo con galón dorado (el trono lo pone la escena)
  for (let x = 192; x < 272; x++) if (x % 2) pset(x, 157, f_P.robleD);
  rect(193, 152, 269, 156, f_P.k); rect(194, 153, 268, 156, C.butacaS); rect(194, 153, 268, 153, f_P.oro); for (let x = 196; x < 268; x += 4) pset(x, 155, f_P.oroS);
  poligono([[198, 147], [264, 147], [269, 152], [193, 152]], f_P.k); poligono([[199, 148], [263, 148], [267, 152], [195, 152]], C.butaca); for (let x = 198; x < 266; x += 2) pset(x, 150, hex('#b83c44'));
  rect(201, 143, 261, 147, f_P.k); rect(202, 144, 260, 147, C.butacaS); rect(202, 144, 260, 144, f_P.oro); for (let x = 204; x < 260; x += 4) pset(x, 146, f_P.oroS);
  poligono([[206, 135], [256, 135], [261, 143], [201, 143]], f_P.k); poligono([[207, 136], [255, 136], [259, 143], [203, 143]], C.butaca); for (let y = 137; y < 143; y++) for (let x = 205; x < 258; x++) if (h(x, y, 410) < 0.12) pset(x, y, hex('#b83c44')); rect(207, 136, 255, 136, hex('#c04a50'));
  // la puerta doble de la derecha (por debajo de Atom), lacada en crema con filetes de oro
  rect(276, 50, 316, 131, hex('#a8986e')); rect(277, 51, 315, 131, panel); rect(277, 51, 315, 51, panelL); rect(296, 52, 296, 131, hex('#a8986e'));
  for (const xa of [279, 298]) { f_bisel(R, xa, 55, xa + 15, 88, panelL, panelS); f_bisel(R, xa + 2, 57, xa + 13, 86, hex('#d8be78'), hex('#d8be78')); f_bisel(R, xa, 94, xa + 15, 127, panelL, panelS); f_bisel(R, xa + 2, 96, xa + 13, 125, hex('#d8be78'), hex('#d8be78')); }
  rect(293, 90, 294, 92, f_P.oro); rect(298, 90, 299, 92, f_P.oro); pset(293, 90, f_P.oroL); pset(298, 90, f_P.oroL); poligono([[288, 50], [296, 46], [304, 50]], hex('#d8be78')); pset(296, 47, f_P.oroL);
  // bajo el año, friso liso: fuera el filo del cerco que asomaba sobre el bandó (x 0–47, y 20–21)
  for (let y = 20; y <= 21; y++) for (let x = 0; x <= 47; x++) pset(x, y, h(x, y, 401) < 0.07 ? frisoS : friso);
}
// el salón de hotel, entero (ver la cabecera de cine)
function f_salon(R, t, o) {
  const { rect, pset, linea } = R;
  R.copiar(f_capa(R, 'salon', () => f_salonFijo(R)));
  // por la ventana: nubes, humo y pájaros; luego los cuarterones y el brillo del cristal
  R.recorte([13, 24, 43, 94]); f_parisFueraVivo(R, t, 13, 24, 43, 112); R.recorte(null);
  rect(28, 24, 28, 112, hex('#f4ecd4')); for (const y of [46, 68, 90]) rect(13, y, 43, y, hex('#f4ecd4')); for (let i = 0; i < 12; i++) { const x = 15 + i, y = 26 + i * 2; pset(x, y, f_mez(R.pget(x, y), f_P.bl, 0.5)); }
  const pl = [hex('#3a7286'), hex('#2e5a6a'), hex('#22465a'), hex('#2e5a6a')]; f_cortina(R, t, 1, 13, -1, 37, 122, 90, pl); f_cortina(R, t, 43, 56, 1, 37, 122, 90, pl); f_bando(R);
  // el fuego de la chimenea: llamas que suben, brasas, chispas y su resplandor en el suelo
  for (let x = 90; x <= 120; x++) { const a = Math.round(4 + 9 * Math.abs(Math.sin(x * 0.55 + t * 6.5) * Math.sin(x * 0.21 - t * 3.1)) * (1 - Math.abs(x - 105) / 22));
    for (let j = 0; j < a; j++) { const y = 126 - j, f = j / a; if (f > 0.7 && (x + y + Math.floor(t * 10)) % 2) continue; pset(x, y, f < 0.3 ? hex('#fff0a0') : f < 0.6 ? hex('#ffb040') : hex('#e0562a')); } }
  rect(88, 127, 122, 128, hex('#2a1810')); for (let x = 89; x <= 121; x += 2) pset(x, 127, Math.sin(t * 5 + x) > 0.2 ? hex('#ff7a30') : hex('#a03a1a')); rect(92, 125, 104, 126, hex('#4a2a1a')); rect(106, 124, 118, 125, hex('#3a2014'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.7 + k / 4) % 1, x = 96 + k * 6 + Math.round(Math.sin(t * 3 + k) * 2), y = 122 - Math.round(u * 14); if (y > 106) pset(x, y, u < 0.5 ? hex('#ffd060') : hex('#e0562a')); }
  { const a = 0.14 + 0.05 * Math.sin(t * 7) + 0.03 * Math.sin(t * 17); f_haz(R, [[84, 132], [126, 132], [140, 144], [70, 144]], hex('#ffb040'), a, 2); }
  // las velas de los candelabros y de los apliques, el péndulo del reloj
  for (const x of [73, 137]) for (const d of [-4, 0, 4]) f_llama(R, x + d, 78, t, x + d);
  for (const x of [63, 148]) for (const d of [-3, 3]) f_llama(R, x + d, 64, t, x * 2 + d);
  { const a = Math.round(Math.sin(t * Math.PI) * 1.5); pset(105 + a, 91, f_P.oroL); pset(105, 90, f_P.oroD); }
  // el espejo: un brillo que lo cruza despacio y los destellos de la araña reflejada
  { const bx = 83 + ((t * 9) % 90) - 30; for (let y = 46; y <= 87; y++) for (let i = 0; i < 4; i++) { const x = Math.round(bx + i - (y - 46) * 0.5); if (x >= 83 && x <= 127) pset(x, y, f_mez(R.pget(x, y), f_P.bl, i === 1 ? 0.5 : 0.25)); }
    for (let k = 0; k < 7; k++) { const x = 108 + Math.floor(h(k, 1, 411) * 16), y = 50 + Math.floor(h(k, 2, 411) * 14); pset(x, y, Math.sin(t * 4 + k * 1.7) > 0.3 ? hex('#fff4c0') : hex('#e0c880')); } }
  // la araña de cristal: la cadena, el fuste dorado, dos pisos de brazos con velas, guirnaldas de cuentas y lágrimas
  const ax = 184; for (let j = -24; j <= 24; j++) for (let i = -30; i <= 30; i++) { const g = 1 - Math.hypot(i, j * 1.2) / 30, x = ax + i, y = 30 + j; if (y > 15 && g > 0 && g * 0.8 > f_b4(x, y) * 0.9) pset(x, y, f_mez(R.pget(x, y), hex('#fff0c0'), 0.3 * g + 0.08)); }
  for (let y = 0; y < 16; y++) pset(ax, y, y % 2 ? f_P.oro : f_P.oroS); rect(ax - 3, 0, ax + 3, 1, f_P.oroS);
  rect(ax - 1, 16, ax + 1, 38, f_P.oro); rect(ax - 1, 16, ax - 1, 38, f_P.oroL); rect(ax - 2, 20, ax + 2, 22, f_P.oro); rect(ax - 3, 29, ax + 3, 31, f_P.oro); rect(ax - 2, 35, ax + 2, 36, f_P.oroS); pset(ax, 39, f_P.oroS);
  for (const [dy, w, n] of [[26, 16, 3], [33, 10, 2]]) for (const s of [-1, 1]) { for (let i = 2; i <= w; i++) { const y = dy + 3 - Math.round(Math.sin(i / w * Math.PI * 0.5) * 4) + Math.round(Math.sin(i / w * Math.PI) * 2); pset(ax + s * i, y, f_P.oro); pset(ax + s * i, y + 1, f_P.oroS); }
    for (let k = 1; k <= n; k++) { const i = Math.round(w * k / n), x = ax + s * i, y = dy - 1 + (k === n ? 0 : 2); rect(x, y - 3, x, y, f_P.bl); pset(x - 1, y + 1, f_P.oroL); pset(x + 1, y + 1, f_P.oroL); f_llama(R, x, y - 3, t, x); }
    for (let i = 3; i < w; i += 2) { const y = dy + 5 + Math.round(Math.sin(i / w * Math.PI) * 3), on = Math.sin(t * 5 + i * 1.3 + s + dy) > 0.5; pset(ax + s * i, y, on ? f_P.bl : hex('#a8d4e8')); if (i % 4 === 3) pset(ax + s * i, y + 1 + (on ? 1 : 0), hex('#d8f0f8')); } }
  for (let k = 0; k < 3; k++) { const y = 40 + k * 2, on = Math.floor(t * 3 + k) % 3 === 0; pset(ax, y, on ? f_P.bl : hex('#a8d4e8')); pset(ax + (k === 1 ? 1 : 0), y + 1, hex('#d8f0f8')); if (k === 1) pset(ax - 1, y, hex('#a8d4e8')); }
  return { suelo: 156, tarima: { x0: 203, x1: 259, y: 141, trono: [231, 141] }, escalon: { x0: 195, x1: 267, y: 150 }, mesita: [171, 126], chimenea: [70, 93, 140, 131], espejo: [76, 39, 134, 93], ventana: [12, 23, 44, 113], sofa: [14, 110, 62, 147], puerta: [277, 51, 315, 131], alfombra: [27, 145, 197, 175] };
}

// lo de delante del salón: la kentia y el carrito de servicio (ver la cabecera de cineDelante)
function f_salonDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  // la kentia: el macetón de latón y sus palmas, que se mecen
  for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.36 + Math.sin(t * 0.9 + k) * 0.04, L = 34 + (k % 3) * 7, sw = Math.sin(t * 1.1 + k * 1.7) * 1.5; let px = 15, py = 160;
    for (let i = 1; i <= L; i++) { const f = i / L, x = 15 + Math.cos(a) * i * 0.75 + sw * f * f, y = 160 + Math.sin(a) * i * (1 - f * 0.5) * 1.25 + f * f * 26 * Math.abs(Math.cos(a)) - i * 0.55;
      linea(px, py, x, y, f_P.verdeS); if (i > 4) { const d = Math.max(2, Math.round(9 * Math.sin(f * Math.PI))), nx = Math.cos(a) > 0 ? 1 : -1; linea(x, y, x - nx * 2, y + d, k % 2 ? f_P.verde : hex('#3a8048')); linea(x, y, x + nx * 2, y - d * 0.6, f_P.verdeL); } px = x; py = y; } }
  poligono([[4, 158], [26, 158], [23, 180], [7, 180]], f_P.k); poligono([[5, 159], [25, 159], [22, 180], [8, 180]], f_P.oro); rect(5, 159, 25, 160, f_P.oroL); for (let y = 162; y < 180; y++) { pset(8 + ((y - 159) >> 3), y, f_P.oroL); rect(19 - ((y - 159) >> 3), y, 22 - ((y - 159) >> 3), y, f_P.oroS); } rect(6, 166, 24, 166, f_P.oroD); rect(7, 157, 23, 158, hex('#3a2a1a'));
  // el carrito: mantel, cubitera con la botella, dos copas y la tetera de plata, que humea
  rect(264, 153, 318, 155, f_P.k); rect(265, 153, 317, 154, f_P.oroL); rect(266, 155, 316, 162, f_P.bl); for (let x = 266; x <= 316; x++) { const a = 162 + ((x >> 2) % 2); rect(x, 160, x, a, f_P.bl); pset(x, a + 1, f_P.papelS); if (x % 4 === 0) rect(x, 156, x, a, f_P.papelS); }
  rect(268, 164, 269, 176, f_P.oroS); rect(312, 164, 313, 176, f_P.oroS); rect(266, 170, 316, 171, f_P.oro); rect(266, 170, 316, 170, f_P.oroL); for (const x of [270, 310]) { disco(x + 0.5, 177.5, 2.6, f_P.k); disco(x + 0.5, 177.5, 1.2, f_P.metal); }
  rect(284, 164, 300, 169, hex('#e8eef4')); rect(284, 164, 300, 164, f_P.bl); rect(286, 166, 298, 166, hex('#2a4a9a'));
  poligono([[270, 141], [283, 141], [281, 153], [272, 153]], f_P.k); poligono([[271, 142], [282, 142], [280, 152], [273, 152]], f_P.metal); rect(272, 142, 273, 151, f_P.metalL); rect(279, 143, 280, 151, f_P.metalS); rect(270, 141, 283, 141, f_P.metalL);
  linea(276, 141, 279, 129, f_P.k); linea(277, 141, 280, 129, hex('#2e6a40')); linea(278, 141, 281, 129, hex('#1e4a2c')); rect(279, 127, 281, 130, f_P.oro); pset(279, 127, f_P.oroL); for (const x of [272, 274, 282]) pset(x, 140, hex('#d8f0f8'));
  for (const x of [288, 294]) { rect(x, 145, x + 3, 147, hex('#d8f0f8')); pset(x, 145, f_P.bl); rect(x + 1, 146, x + 2, 147, hex('#f0d890')); rect(x + 1, 148, x + 2, 151, hex('#b8d8e8')); rect(x, 152, x + 3, 152, hex('#b8d8e8')); if (Math.sin(t * 3 + x) > 0.7) pset(x + 3, 145, f_P.bl); }
  rect(301, 145, 311, 152, f_P.k); rect(302, 144, 310, 152, f_P.metal); rect(303, 144, 304, 151, f_P.metalL); rect(308, 145, 310, 152, f_P.metalS); rect(304, 142, 308, 143, f_P.metalS); pset(306, 141, f_P.oro); linea(311, 147, 315, 144, f_P.metalS); linea(301, 146, 299, 149, f_P.metalD); pset(299, 150, f_P.metalD);
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1, x = 316 + Math.round(Math.sin(t * 2 + k * 2 + u * 4) * 1.3), y = 142 - Math.round(u * 9); pset(x, y, f_mez(R.pget(x, y), f_P.bl, 0.7 - u * 0.5)); }
  return { kentia: [0, 108, 44, 179], carrito: [264, 127, 318, 179] };
}

// la roca falsa de cartón piedra: facetas con luz arriba a la izquierda, vetas y grietas
function f_roca(x, y) {
  const celda = (px, py) => { const gx = Math.floor(px / 10), gy = Math.floor(py / 8); let m = 1e9, id = 0; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const cx = (gx + i + h(gx + i, gy + j, 500)) * 10, cy = (gy + j + h(gx + i, gy + j, 501)) * 8, d = (px - cx) ** 2 + ((py - cy) * 1.3) ** 2; if (d < m) { m = d; id = (gx + i) * 31 + (gy + j) * 17; } } return id; };
  const id = celda(x, y), v = h(id, 3, 502);
  if (celda(x + 1, y + 1) !== id) return hex('#5e3424');
  if (celda(x - 1, y - 1) !== id) return hex('#dca070');
  return h(x, y, 503) < 0.08 ? hex('#7a4630') : (y + Math.floor(v * 5)) % 6 === 0 && h(x >> 1, y, 504) < 0.6 ? hex('#9a5c3c') : v < 0.3 ? hex('#8e5236') : v < 0.7 ? hex('#b0704a') : hex('#c4845a');
}

// el plató, lo que no se mueve
function f_platoFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, nave = hex('#1a1c28'), viga = hex('#262a3a'), ac = hex('#3c3c4a'), acS = hex('#2e2e3a'), acL = hex('#474756');
  // el techo en penumbra con la parrilla de cerchas (tranquilo: ahí van el año y Atom)
  rect(0, 0, 319, 24, nave); rect(0, 10, 319, 11, viga); rect(0, 22, 319, 23, viga); for (let x = 0; x < 320; x++) { const z = Math.abs(((x + 8) % 24) - 12); pset(x, 11 + z, hex('#222636')); if (x % 24 === 4) rect(x, 0, x, 9, hex('#20232f')); }
  // la pared acolchada (rombos cosidos), la pasarela con su barandilla, el rodapié de tablas
  for (let y = 25; y < 112; y++) for (let x = 0; x < 320; x++) { const a = (x + y * 2) % 20, b = ((x - y * 2) % 20 + 20) % 20; pset(x, y, a === 0 || b === 0 ? acS : a === 1 || b === 1 ? (h(x, y, 502) < 0.5 ? acL : ac) : h(x, y, 503) < 0.06 ? acL : y > 96 && (x + y) % 2 ? acS : ac); }
  rect(0, 46, 277, 46, hex('#555564')); rect(0, 47, 277, 47, acS); rect(0, 40, 277, 40, hex('#4a4a58')); for (let x = 8; x < 278; x += 22) rect(x, 40, x, 46, hex('#4a4a58'));
  for (let y = 48; y < 112; y += 4) { rect(262, y, 268, y, hex('#555564')); } rect(261, 47, 261, 112, hex('#4e4e5c')); rect(269, 47, 269, 112, hex('#4e4e5c'));
  rect(0, 112, 319, 117, hex('#4a3c30')); rect(0, 112, 319, 112, hex('#6a5844')); for (let x = 0; x < 320; x += 26) rect(x, 113, x, 117, hex('#32281e'));
  // el suelo de hormigón pintado: grano, juntas, rozaduras, y los charcos de luz de los focos
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 504), m = h(x >> 3, y >> 2, 505); let c = v < 0.08 ? hex('#4c4e58') : v > 0.94 ? hex('#72747e') : m < 0.25 ? hex('#585a64') : hex('#5e606a'); if (y === 140 || y === 164 || (x + (y - 118)) % 90 === 0) c = hex('#484a54'); if (y < 122) c = f_mez(c, nave, 0.5 - (y - 118) * 0.1); pset(x, y, c); }
  for (let k = 0; k < 22; k++) { const x = Math.floor(h(k, 1, 506) * 310), y = 124 + Math.floor(h(k, 2, 506) * 52), n = 3 + Math.floor(h(k, 3, 506) * 8); for (let i = 0; i < n; i++) pset(x + i, y + (i >> 2), k % 3 ? hex('#4a4c56') : hex('#7a7c86')); }
  // el portón de la nave, medio abierto: fuera, el sol de la tarde sobre otras naves y un depósito de agua
  rect(11, 43, 61, 117, f_P.k); rect(12, 44, 60, 117, hex('#2a2c36')); rect(14, 46, 32, 117, hex('#56665e'));
  for (let x = 14; x <= 32; x++) for (let y = 46; y <= 117; y++) pset(x, y, x % 4 === 0 ? hex('#3e4c46') : x % 4 === 1 ? hex('#6e7e74') : h(x, y, 507) < 0.08 ? hex('#4a5a52') : hex('#56665e'));
  for (let y = 108; y <= 117; y++) for (let x = 14; x <= 32; x++) pset(x, y, (x + y) % 8 < 4 ? hex('#e8c040') : f_P.k); rect(29, 78, 30, 88, f_P.metalL); rect(14, 46, 32, 46, hex('#7e8e84'));
  R.recorte([33, 46, 59, 117]);
  for (let y = 46; y <= 117; y++) for (let x = 33; x <= 59; x++) { const f = (y - 46) / 44 * 4; pset(x, y, y > 104 ? ((x + y * 3) % 13 === 0 ? hex('#b8b4a8') : hex('#cfcabc')) : [hex('#7ec0ee'), hex('#a0d2f2'), hex('#c4e4f4'), hex('#eaeada'), hex('#f6e4c0')][Math.min(4, Math.floor(f + f_b4(x, y)))]); }
  f_r(R, 33, 86, 48, 104, hex('#e4d8ba')); for (let x = 33; x <= 48; x++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - ((x - 38) / 11) ** 2)) * 6); f_r(R, x, 86 - a, x, 86, hex('#c8baa0')); pset(x, 86 - a, hex('#f4ecd4')); } f_r(R, 36, 93, 44, 104, hex('#8a7a6a')); f_r(R, 33, 90, 48, 90, hex('#b8a888'));
  f_r(R, 51, 72, 58, 80, hex('#d4d8dc')); f_r(R, 51, 72, 58, 72, f_P.bl); f_r(R, 57, 73, 58, 80, hex('#a8b0b8')); pset(54, 70, hex('#d4d8dc')); pset(55, 71, hex('#d4d8dc')); pset(54, 71, hex('#d4d8dc')); linea(52, 81, 51, 104, hex('#8a9098')); linea(57, 81, 58, 104, hex('#8a9098')); linea(52, 92, 57, 92, hex('#8a9098')); linea(52, 81, 57, 92, hex('#a0a6ae'));
  R.recorte(null);
  f_haz(R, [[33, 118], [59, 118], [104, 154], [44, 154]], hex('#fff0c8'), 0.3); f_haz(R, [[44, 154], [104, 154], [118, 166], [50, 166]], hex('#fff0c8'), 0.14, 2);
  rect(40, 36, 50, 42, f_P.k); rect(41, 37, 49, 41, hex('#3a3e4a')); rect(12, 30, 13, 43, hex('#4a4e5a')); rect(12, 30, 44, 31, hex('#4a4e5a'));
  // el cuadro eléctrico con sus tubos, y el extintor
  rect(94, 58, 108, 76, f_P.k); rect(95, 59, 107, 75, f_P.metalS); rect(95, 59, 107, 59, f_P.metalL); rect(96, 61, 106, 66, f_P.metalD); rect(100, 25, 101, 58, hex('#4a4e5a')); rect(104, 76, 105, 112, hex('#4a4e5a')); for (let i = 0; i < 3; i++) rect(97 + i * 3, 71, 98 + i * 3, 73, f_P.k);
  rect(68, 94, 73, 108, f_P.k); rect(69, 95, 72, 107, f_P.rojo); rect(69, 95, 69, 107, hex('#f06a5a')); rect(70, 92, 71, 94, f_P.metalD); pset(72, 93, f_P.k); rect(69, 99, 72, 100, f_P.bl);
  // los raíles del travelín y la base de la grúa
  for (let x = 16; x < 132; x += 6) rect(x, 136, x + 1, 141, hex('#4a3a2c')); rect(14, 137, 132, 137, f_P.metalL); rect(14, 138, 132, 138, f_P.metalD); rect(14, 140, 132, 140, f_P.metalL); rect(14, 141, 132, 141, f_P.metalD);
  rect(64, 128, 94, 136, f_P.k); rect(65, 129, 93, 135, hex('#3a4a6a')); rect(65, 129, 93, 129, hex('#5a6e94')); rect(65, 134, 93, 135, hex('#2a3650')); for (const x of [69, 89]) { disco(x + 0.5, 137.5, 2.6, f_P.k); pset(x, 137, f_P.metal); }
  rect(76, 102, 82, 128, f_P.k); rect(77, 103, 81, 128, hex('#4a5e84')); rect(77, 103, 77, 128, hex('#6a80a8')); rect(74, 124, 84, 128, hex('#2a3650'));
  // la tarima del decorado: el telón pintado a medias (NUESTRO: dunas, un sol y dos lunas), las dos columnas y el arco,
  // dorados solo hasta donde ha llegado la brocha; a la derecha, el yeso crudo con las líneas de lápiz
  for (let y = 54; y <= 125; y++) for (let x = 128; x <= 192; x++) { const borde = 172 + Math.round(Math.sin(y * 0.7) * 2 + h(y, 1, 508) * 4);
    if (x > borde) { pset(x, y, (x - 128) % 8 === 0 || (y - 54) % 8 === 0 ? hex('#b8ae98') : h(x, y, 509) < 0.06 ? hex('#cfc6ae') : hex('#dcd2ba')); continue; }
    const d1 = 104 + Math.sin(x * 0.11 + 1) * 5, d2 = 112 + Math.sin(x * 0.08 + 4) * 4 + Math.sin(x * 0.3) * 1.2;
    if (y > d2) pset(x, y, y - d2 < 2 ? C.dunaL : (x + y) % 5 === 0 ? C.dunaS : C.duna); else if (y > d1) pset(x, y, y - d1 < 1.5 ? hex('#e8a860') : hex('#c8803c'));
    else { const f = (y - 54) / 50 * 4; pset(x, y, [hex('#2a8a9a'), hex('#4aa8a8'), hex('#8ac4a8'), hex('#e8cc90'), hex('#f4b060')][Math.min(4, Math.floor(f + f_b4(x, y)))]); } }
  disco(150, 86, 9, hex('#fff0b0')); disco(150, 86, 7, hex('#fff8d8')); disco(138, 66, 3, hex('#f4ecd4')); pset(137, 65, f_P.bl); disco(164, 72, 2, hex('#e8c8a0'));
  const fuste = (x0, dorado) => { for (let y = 60; y <= 125; y++) for (let i = 0; i < 15; i++) { const x = x0 + i, s = i < 3 ? 0 : i < 8 ? 1 : i < 12 ? 2 : 3, pint = dorado === 1 || (dorado === 0.5 && y < 96 + Math.round(h(i, 3, 510) * 5));
      pset(x, y, i === 0 || i === 14 ? f_P.k : i % 3 === 0 ? (pint ? f_P.oroD : hex('#a8a498')) : pint ? [f_P.oroL, f_P.oro, f_P.oroS, f_P.oroD][s] : [f_P.bl, hex('#e0dcd0'), hex('#c8c4b8'), hex('#a8a498')][s]); }
    for (const [ya, yb, e] of [[55, 59, 2], [122, 126, 2]]) { rect(x0 - e, ya, x0 + 14 + e, yb, f_P.k); rect(x0 - e + 1, ya + 1, x0 + 13 + e, yb - 1, dorado ? f_P.oro : hex('#d8d4c8')); rect(x0 - e + 1, ya + 1, x0 + 13 + e, ya + 1, dorado ? f_P.oroL : f_P.bl); } };
  for (let x = 114; x <= 206; x++) { const u = (x - 160) / 46, ye = Math.round(60 - Math.sqrt(Math.max(0, 1 - u * u)) * 22), ui = (x - 160) / 31, yi = Math.abs(ui) < 1 ? Math.round(62 - Math.sqrt(1 - ui * ui) * 13) : 60, pint = x < 166 + Math.round(h(x, 2, 511) * 5);
    for (let y = ye; y <= Math.min(59, yi); y++) pset(x, y, y === ye || y === yi ? f_P.k : pint ? (y === ye + 1 ? f_P.oroL : (x + y) % 6 === 0 ? f_P.oroD : y > yi - 3 ? f_P.oroS : f_P.oro) : (y === ye + 1 ? f_P.bl : (x % 8 === 0 || y % 8 === 0) ? hex('#b8b4a8') : y > yi - 3 ? hex('#c8c4b8') : hex('#e0dcd0'))); }
  fuste(114, 1); fuste(192, 0.5);
  rect(110, 126, 210, 133, f_P.k); rect(111, 127, 209, 132, hex('#8a6a44')); rect(111, 127, 209, 127, hex('#b08a5c')); for (let x = 118; x < 208; x += 12) rect(x, 128, x, 132, hex('#6a4e30')); for (let x = 108; x < 214; x++) if (x % 2) pset(x, 134, hex('#3e4048'));
  // el andamio del pintor (tubos, cruces, tablón y ruedas) con su cubo
  for (const x of [210, 230]) { rect(x, 64, x + 1, 128, f_P.metalS); rect(x, 64, x, 128, f_P.metalL); disco(x + 0.5, 130, 2, f_P.k); pset(x, 130, f_P.metal); }
  for (const y of [66, 76, 110]) rect(210, y, 231, y, f_P.metalS); linea(211, 93, 230, 109, f_P.metalD); linea(230, 93, 211, 109, f_P.metalD); linea(211, 111, 230, 127, f_P.metalD); linea(230, 111, 211, 127, f_P.metalD);
  rect(207, 91, 234, 93, f_P.k); rect(208, 91, 233, 92, f_P.pino); rect(208, 91, 233, 91, f_P.pinoL); rect(224, 85, 229, 90, f_P.metalS); rect(224, 85, 229, 86, f_P.oro); pset(226, 87, f_P.oroL); linea(224, 84, 229, 84, f_P.metalD);
  // el decorado de roca falsa (pintada casi entera; abajo, la imprimación gris) y otro bastidor visto por detrás, con
  // sus listones, el tornapuntas y los sacos de arena
  for (let x = 238; x <= 284; x++) { const top = 56 + Math.round(h(x >> 2, 1, 512) * 5 + Math.sin(x * 0.4) * 2); for (let y = top; y <= 128; y++) { const cruda = y > 112 - Math.round(Math.sin(x * 0.5) * 3 + h(x >> 1, 2, 513) * 6) && x < 262;
      pset(x, y, x === 238 || y === top ? f_P.k : cruda ? (h(x, y, 514) < 0.1 ? hex('#8e8a84') : hex('#a8a49c')) : f_roca(x, y)); } pset(x, top + 1, hex('#e0a878')); }
  rect(285, 60, 286, 128, hex('#7a6038')); for (let x = 238; x < 288; x++) if (x % 2) pset(x, 129, hex('#3e4048'));
  rect(289, 57, 319, 128, f_P.k); rect(290, 58, 319, 128, hex('#b89a66')); for (let y = 58; y <= 128; y++) for (let x = 290; x < 320; x++) if (h(x >> 3, y, 515) < 0.2 && h(x, y, 516) < 0.7) pset(x, y, hex('#a88a58'));
  for (const x of [290, 304, 317]) { rect(x, 58, x + 2, 128, hex('#d8bc84')); rect(x + 2, 58, x + 2, 128, hex('#8e7240')); } for (const y of [58, 82, 106, 126]) { rect(290, y, 319, y + 2, hex('#d8bc84')); rect(290, y + 2, 319, y + 2, hex('#8e7240')); }
  linea(293, 84, 303, 61, hex('#c8a870')); linea(306, 105, 316, 85, hex('#c8a870')); linea(294, 84, 304, 61, hex('#8e7240'));
  linea(300, 84, 290, 136, f_P.k); linea(301, 84, 291, 136, hex('#d8bc84')); linea(302, 84, 292, 136, hex('#8e7240'));
  for (const [x, y] of [[282, 134], [291, 136], [286, 130]]) { rect(x, y, x + 9, y + 4, f_P.k); rect(x + 1, y, x + 8, y + 3, hex('#7a7a5a')); rect(x + 1, y, x + 8, y, hex('#9a9a74')); pset(x + 4, y + 2, hex('#5a5a40')); }
  // por el suelo: tambores de columna tumbados, botes de pintura, la escalera de tijera, cables y marcas de cinta
  for (const [x, y] of [[96, 128], [103, 121]]) { rect(x, y, x + 15, y + 7, f_P.k); rect(x + 1, y + 1, x + 14, y + 6, hex('#e0dcd0')); rect(x + 1, y + 1, x + 14, y + 2, f_P.bl); rect(x + 1, y + 5, x + 14, y + 6, hex('#b8b4a8')); for (let i = 3; i < 14; i += 3) pset(x + i, y + 3, hex('#b8b4a8')); disco(x + 14, y + 4, 3.4, f_P.k); disco(x + 14, y + 4, 2.4, hex('#c8c4b8')); pset(x + 14, y + 4, hex('#8a867e')); }
  // (la escalera de tijera va en f_plato, por delante de lo que pasa por el portón)
  for (const [x, c] of [[122, f_P.oro], [128, hex('#2a8a9a')], [216, C.duna]]) { rect(x, 135, x + 4, 140, f_P.metalS); rect(x, 135, x + 4, 135, c); rect(x, 137, x + 4, 138, f_P.bl); pset(x + 1, 136, c); linea(x, 134, x + 4, 134, f_P.metalD); }
  const cable = (x0, x1, y0, amp, f, c) => { for (let x = x0; x <= x1; x++) { const y = Math.round(y0 + Math.sin(x * f) * amp + (x - x0) * 0.04); pset(x, y, c); pset(x, y + 1, f_P.k); } };
  cable(20, 118, 150, 3, 0.09, hex('#2a2a34')); cable(86, 240, 145, 2, 0.06, hex('#c85a2a')); cable(196, 319, 162, 3, 0.07, hex('#2a2a34')); cable(0, 70, 168, 2, 0.12, hex('#3a5a8a'));
  for (const [x, y, c] of [[150, 160, hex('#e8c040')], [196, 160, hex('#e8c040')], [100, 160, f_P.bl], [240, 150, hex('#d83a3a')]]) { rect(x - 3, y, x + 3, y, c); rect(x, y, x, y + 3, c); }
  // los focos de la parrilla, con su haz (los cuerpos, lejos de la esquina de Atom)
  for (const [x, w] of [[62, 20], [104, 22], [150, 26], [198, 22], [244, 20]]) {
    f_haz(R, [[x - 3, 31], [x + 4, 31], [x + w, 118], [x - w, 118]], hex('#fff0c8'), 0.1); f_haz(R, [[x - 2, 31], [x + 3, 31], [x + w * 0.5, 118], [x - w * 0.5, 118]], hex('#fff0c8'), 0.08, 2);
    for (let j = -8; j <= 8; j++) for (let i = -w - 8; i <= w + 8; i++) { const g = 1 - Math.hypot(i / (w + 8), j / 8); if (g > 0 && g > f_b4(x + i, 150 + j) * 0.7) pset(x + i, 150 + j, f_mez(R.pget(x + i, 150 + j), hex('#fff0c8'), 0.16 * g + 0.05)); }
    rect(x, 24, x, 24, hex('#3a3e4a')); rect(x - 4, 21, x + 4, 29, f_P.k); rect(x - 3, 22, x + 3, 28, hex('#2e323e')); rect(x - 3, 22, x - 3, 28, hex('#4a4e5a')); rect(x - 5, 22, x - 5, 26, hex('#3a3e4a')); rect(x + 5, 22, x + 5, 26, hex('#3a3e4a')); rect(x - 6, 29, x - 4, 31, f_P.k); rect(x + 4, 29, x + 6, 31, f_P.k); }
}

// EL OTRO PLATÓ (cine, encuadre 'plato', cámara general, o.variante 'espacio'): lo que no se mueve. Otra nave, unos
// años después: pared de ladrillo pintado de azul gris con su franja, suelo de tableros de madera, el portón granate
// CERRADO con su puerta de paso abierta (x 37–53, y 81–117: por ahí se entra), un ventilador de efectos y la máquina de
// humo a la izquierda; en el centro, sobre la misma tarima (x 110–210, y 126), un ciclorama de ESTRELLAS nuestro
// (x 114–206, y 44–125: espacio hondo, un planeta con anillo, una nebulosa y un suelo lunar de maqueta) colgado de un
// pórtico de tubo; a la derecha, la mesa de maquetas (x 214–260) con su flexo, bajo un móvil de planetas, y una
// estantería metálica de material (x 276–319, por debajo de la esquina de Atom)
function f_plato2Fijo(R) {
  const { rect, pset, linea, poligono, disco } = R, nave = hex('#141a26'), viga = hex('#222a3a');
  rect(0, 0, 319, 24, nave); rect(0, 10, 319, 11, viga); rect(0, 22, 319, 23, viga); for (let x = 0; x < 320; x++) { const z = Math.abs(((x + 8) % 24) - 12); pset(x, 11 + z, hex('#1e2634')); if (x % 24 === 4) rect(x, 0, x, 9, hex('#1c222e')); }
  // la pared de ladrillo pintado (hiladas de 5 px, a tizón y soga), con desconchones, una franja y el rodapié
  for (let y = 25; y < 112; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 25) / 5), xx = x + (f % 2) * 7, junta = (y - 25) % 5 === 4 || xx % 14 === 0, v = h(Math.floor(xx / 14), f, 670), g = h(x, y, 671);
    let c = junta ? hex('#2a3442') : v < 0.16 ? hex('#3a4a5c') : v > 0.86 ? hex('#4e6076') : g < 0.05 ? hex('#50627a') : hex('#44546a'); if (y > 92) c = junta ? hex('#1e2a30') : v < 0.3 ? hex('#2a4a48') : hex('#305450'); if (y === 92) c = hex('#c8c0a8'); if (h(x >> 3, y >> 2, 672) < 0.035 && y < 92) c = hex('#7a5a4a'); pset(x, y, c); }
  rect(0, 112, 319, 117, hex('#2a2e36')); rect(0, 112, 319, 112, hex('#4a5060')); for (let x = 0; x < 320; x += 26) rect(x, 113, x, 117, hex('#1c2028'));
  // el suelo de tableros de madera: vetas, juntas, rozaduras y marcas de cinta
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = y < 132 ? 0 : y < 152 ? 1 : 2, xx = x + fila * 37, v = h(x >> 2, y, 673), ve = Math.sin(x * 0.06 + fila * 2 + Math.sin(y * 0.5 + x * 0.02) * 1.8);
    let c = y === 132 || y === 152 || xx % 78 === 0 ? hex('#5a4a34') : ve > 0.72 ? hex('#7a6648') : v < 0.12 ? hex('#806c4e') : v > 0.9 ? hex('#a08a68') : hex('#8e7a5a'); if (y < 123) c = f_mez(c, nave, 0.55 - (y - 118) * 0.1); pset(x, y, c); }
  for (let k = 0; k < 20; k++) { const x = Math.floor(h(k, 1, 674) * 310), y = 124 + Math.floor(h(k, 2, 674) * 52), n = 3 + Math.floor(h(k, 3, 674) * 8); for (let i = 0; i < n; i++) pset(x + i, y + (i >> 2), k % 3 ? hex('#6e5c40') : hex('#b09a78')); }
  // el portón granate, cerrado: chapa ondulada, su guía arriba, franja de aviso abajo y la puerta de paso abierta
  rect(11, 43, 61, 117, f_P.k); for (let x = 12; x <= 60; x++) for (let y = 44; y <= 117; y++) pset(x, y, x % 4 === 0 ? hex('#5a2620') : x % 4 === 1 ? hex('#96483c') : h(x, y, 675) < 0.08 ? hex('#6a3028') : hex('#7e3a30'));
  for (let y = 110; y <= 117; y++) for (let x = 12; x <= 60; x++) pset(x, y, (x + y) % 8 < 4 ? hex('#e8c040') : f_P.k); rect(12, 44, 60, 44, hex('#b06050')); rect(8, 40, 64, 42, f_P.k); rect(9, 41, 63, 41, f_P.metalS);
  rect(35, 79, 55, 117, f_P.k); rect(36, 80, 54, 80, f_P.metalL);
  R.recorte([37, 81, 53, 117]); for (let y = 81; y <= 117; y++) for (let x = 37; x <= 53; x++) { const f = (y - 81) / 26 * 4; pset(x, y, y > 108 ? ((x + y * 3) % 11 === 0 ? hex('#b8b4a8') : hex('#d4cfc0')) : [hex('#8ac8f0'), hex('#a8d6f2'), hex('#c8e6f4'), hex('#ecebd8'), hex('#f6e6c4')][Math.min(4, Math.floor(f + f_b4(x, y)))]); }
  f_r(R, 44, 98, 53, 108, hex('#d8ccb0')); f_r(R, 44, 98, 53, 98, hex('#f0e6cc')); f_r(R, 46, 102, 49, 108, hex('#8a7a6a')); f_r(R, 37, 104, 43, 108, hex('#a8b494')); R.recorte(null);
  rect(54, 82, 58, 117, hex('#4a1e1a')); rect(54, 82, 54, 117, hex('#96483c'));
  f_haz(R, [[37, 118], [53, 118], [88, 150], [40, 150]], hex('#fff0c8'), 0.28); f_haz(R, [[40, 150], [88, 150], [100, 162], [44, 162]], hex('#fff0c8'), 0.13, 2);
  rect(40, 36, 50, 42, f_P.k); rect(41, 37, 49, 41, hex('#3a3e4a'));
  // el ventilador de efectos en su pie (las aspas, en f_plato2) y la máquina de humo con su manguera
  rect(84, 96, 86, 136, f_P.k); rect(85, 96, 85, 135, f_P.metalS); poligono([[76, 137], [85, 128], [94, 137]], f_P.k); rect(77, 136, 93, 137, f_P.metalD); for (let an = 0; an < 6.3; an += 0.06) { pset(Math.round(85 + Math.cos(an) * 13), Math.round(84 + Math.sin(an) * 13), f_P.k); pset(Math.round(85 + Math.cos(an) * 12), Math.round(84 + Math.sin(an) * 12), f_P.metalS); }
  for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) if (i * i + j * j < 125) pset(85 + i, 84 + j, (i + j) % 4 === 0 ? hex('#262c38') : hex('#1a1e28'));
  rect(96, 128, 108, 137, f_P.k); rect(97, 129, 107, 136, hex('#c84a2a')); rect(97, 129, 107, 129, hex('#e87a5a')); rect(99, 131, 102, 133, f_P.k); rect(108, 131, 111, 133, f_P.metalD); pset(105, 134, f_P.metalL);
  // el pórtico de tubo, la tarima negra con su canto amarillo y el ciclorama de estrellas (NUESTRO)
  for (const x of [110, 208]) { rect(x, 38, x + 2, 126, f_P.k); rect(x + 1, 38, x + 1, 126, f_P.metalL); } rect(108, 38, 212, 41, f_P.k); rect(109, 39, 211, 39, f_P.metalL); rect(109, 40, 211, 40, f_P.metalS); for (let x = 112; x < 208; x += 8) linea(x, 41, x + 4, 38, f_P.metalD);
  for (let y = 44; y <= 125; y++) for (let x = 114; x <= 206; x++) { const f = (y - 44) / 82 * 3.4, n = Math.hypot(x - 136, (y - 96) * 1.4), q = h(x, y, 676);
    let c = [hex('#080a22'), hex('#10123a'), hex('#1c1a52'), hex('#2c2260')][Math.min(3, Math.floor(f + f_b4(x, y) * 0.9))]; if (n < 20 && f_b4(x, y) > n / 22) c = n < 7 ? hex('#c86aa8') : n < 13 ? hex('#8a4a9a') : hex('#4a2e7a'); if (q < 0.03) c = q < 0.008 ? f_P.bl : hex('#8a94c8'); pset(x, y, c); }
  rect(113, 43, 207, 43, f_P.k); rect(113, 43, 113, 125, f_P.k); rect(207, 43, 207, 125, f_P.k); for (let x = 118; x < 206; x += 11) { pset(x, 42, f_P.metalL); pset(x, 44, f_P.metalD); }
  disco(186, 66, 8.4, f_P.k); disco(186, 66, 7.4, hex('#e09848')); disco(184, 64, 3.4, hex('#f4c078')); rect(181, 69, 191, 70, hex('#b06a2c')); for (let i = -13; i <= 13; i++) { const yy = 66 + Math.round(i * 0.28); if (Math.abs(i) > 7 || i * 0.28 > 0.5) { pset(186 + i, yy + 1, hex('#f4ecd0')); pset(186 + i, yy + 2, f_P.k); } }
  for (let x = 114; x <= 206; x++) { const top = 112 - Math.round(Math.sin(x * 0.07 + 1) * 3 + Math.sin(x * 0.23) * 1.5 + (x > 180 ? (x - 180) * 0.12 : 0)); for (let y = top; y <= 125; y++) pset(x, y, y === top ? hex('#e8e4dc') : (x + y * 2) % 7 === 0 ? hex('#8a8a96') : y - top < 3 ? hex('#c4c2c0') : hex('#a4a4aa')); }
  for (const [cx, cy, r] of [[128, 119, 4], [150, 122, 3], [172, 118, 5], [196, 121, 3]]) { for (let i = -r; i <= r; i++) { pset(cx + i, cy, hex('#6e6e7a')); if (Math.abs(i) < r) pset(cx + i, cy + 1, hex('#e8e4dc')); } pset(cx - r, cy - 1, hex('#e8e4dc')); pset(cx + r, cy - 1, hex('#8a8a96')); }
  rect(110, 126, 210, 133, f_P.k); rect(111, 127, 209, 132, hex('#26262e')); rect(111, 127, 209, 127, hex('#e8c040')); for (let x = 118; x < 208; x += 12) rect(x, 129, x, 132, hex('#1a1a20')); for (let x = 108; x < 214; x++) if (x % 2) pset(x, 134, hex('#5a4a34'));
  // la mesa de maquetas (a la escala de los personajes): tablero, caballetes, botes de pintura, una nave a medio
  // pegar (cajas y tubos), un flexo y, debajo, una caja de piezas
  rect(214, 113, 260, 116, f_P.k); rect(215, 113, 259, 114, f_P.pinoL); rect(215, 115, 259, 115, f_P.pinoS); for (const x of [218, 254]) { linea(x, 117, x - 3, 128, f_P.k); linea(x + 1, 117, x + 4, 128, f_P.k); linea(x, 117, x - 2, 128, f_P.pino); } rect(219, 122, 255, 122, f_P.pinoS); for (let x = 213; x < 262; x++) if (x % 2) pset(x, 129, hex('#5a4a34'));
  for (const [x, c] of [[217, hex('#d83a3a')], [223, hex('#3a8ad8')], [229, f_P.bl]]) { rect(x, 108, x + 4, 112, f_P.metalS); rect(x, 108, x + 4, 108, c); pset(x + 1, 110, c); }
  rect(236, 107, 250, 111, f_P.k); rect(237, 108, 249, 110, hex('#c8ccd4')); rect(237, 108, 249, 108, f_P.bl); rect(239, 105, 243, 107, hex('#8a8e9a')); rect(246, 106, 248, 107, hex('#d83a3a')); rect(250, 109, 253, 109, f_P.metalD); pset(234, 109, f_P.metalD); pset(235, 109, f_P.metalD); pset(241, 112, f_P.k); pset(247, 112, f_P.k);
  rect(255, 111, 258, 112, f_P.k); linea(256, 110, 253, 103, f_P.metalS); linea(253, 103, 249, 101, f_P.metalS); rect(246, 99, 250, 101, f_P.k); rect(247, 100, 249, 100, f_P.oro);
  rect(230, 123, 246, 128, f_P.k); rect(231, 124, 245, 127, f_P.kraft); rect(231, 124, 245, 124, f_P.papel); pset(235, 123, hex('#8a8e9a')); pset(240, 122, hex('#d83a3a'));
  // la estantería metálica de material (bajo la esquina de Atom): cajas, latas, focos y rollos
  rect(276, 56, 319, 128, f_P.k); rect(277, 57, 319, 127, hex('#1e2430')); for (const x of [277, 298]) rect(x, 57, x + 1, 127, f_P.metalS); for (const y of [74, 92, 110, 126]) { rect(277, y, 319, y + 1, f_P.metalS); rect(277, y, 319, y, f_P.metalL); }
  for (const [x, y, w, a, c] of [[280, 74, 14, 11, hex('#b08a54')], [301, 74, 16, 8, hex('#3a4a6a')], [280, 92, 10, 9, hex('#8a3a34')], [292, 92, 5, 13, f_P.metal], [301, 92, 17, 12, hex('#b08a54')], [280, 110, 16, 10, hex('#3a6a5a')], [301, 110, 9, 7, f_P.metal], [311, 110, 8, 12, hex('#c8a040')], [280, 126, 12, 12, hex('#3a4a6a')], [301, 126, 17, 9, hex('#b08a54')]]) { rect(x, y - a, x + w, y - 1, f_P.k); rect(x + 1, y - a + 1, x + w - 1, y - 1, c); rect(x + 1, y - a + 1, x + w - 1, y - a + 1, f_mez(c, f_P.bl, 0.35)); rect(x + 3, y - a + 4, x + Math.min(w - 2, 8), y - a + 5, f_P.papel); }
  for (let x = 274; x < 320; x++) if (x % 2) pset(x, 129, hex('#5a4a34'));
  // por el suelo: cables, marcas de cinta y dos cajones de apoyo
  const cable = (x0, x1, y0, amp, f, c) => { for (let x = x0; x <= x1; x++) { const y = Math.round(y0 + Math.sin(x * f) * amp + (x - x0) * 0.04); pset(x, y, c); pset(x, y + 1, f_P.k); } };
  cable(96, 250, 146, 2, 0.07, hex('#2a2a34')); cable(60, 200, 166, 3, 0.05, hex('#3a8a4a')); cable(210, 319, 163, 2, 0.09, hex('#2a2a34'));
  for (const [x, y, c] of [[150, 160, hex('#e8c040')], [196, 160, hex('#e8c040')], [100, 160, f_P.bl], [240, 150, hex('#3ad8d8')]]) { rect(x - 3, y, x + 3, y, c); rect(x, y, x, y + 3, c); }
  // tres focos en la parrilla, de luz fría, con su haz y su charco en el suelo
  for (const [x, w] of [[84, 22], [160, 30], [236, 22]]) {
    f_haz(R, [[x - 3, 31], [x + 4, 31], [x + w, 118], [x - w, 118]], hex('#c8e4ff'), 0.1); f_haz(R, [[x - 2, 31], [x + 3, 31], [x + w * 0.5, 118], [x - w * 0.5, 118]], hex('#c8e4ff'), 0.08, 2);
    for (let j = -8; j <= 8; j++) for (let i = -w - 8; i <= w + 8; i++) { const g = 1 - Math.hypot(i / (w + 8), j / 8); if (g > 0 && g > f_b4(x + i, 150 + j) * 0.7) pset(x + i, 150 + j, f_mez(R.pget(x + i, 150 + j), hex('#e8f4ff'), 0.16 * g + 0.05)); }
    rect(x - 4, 21, x + 4, 29, f_P.k); rect(x - 3, 22, x + 3, 28, hex('#2e323e')); rect(x - 3, 22, x - 3, 28, hex('#4a4e5a')); rect(x - 6, 29, x - 4, 31, f_P.k); rect(x + 4, 29, x + 6, 31, f_P.k); }
  // la esquina de Atom, tranquila: el ladrillo se apaga ahí
  f_calmar(R, 270, 25, 319, 50, 0.75);
}
// el otro plató, entero
function f_plato2(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(f_capa(R, 'plato2', () => f_plato2Fijo(R)));
  // por la puerta de paso: una nube y un pájaro; el piloto rojo de encima
  R.recorte([37, 81, 53, 117]); f_nube(R, Math.round(30 + ((t * 2.4 + 8) % 34)), 87, 5); f_pajaro(R, Math.round(56 - ((t * 5 + 3) % 26)), 92 + Math.round(Math.sin(t * 1.3) * 2), t, 4, hex('#5a6a7a')); R.recorte(null);
  { const on = Math.floor(t * 1.6) % 2 === 0; rect(43, 38, 47, 40, on ? hex('#ff4a3a') : hex('#6a1a1a')); if (on) pset(45, 37, hex('#ffb0a0')); }
  // las aspas del ventilador y el humo que sale de la máquina y se va hacia el decorado
  for (let b = 0; b < 4; b++) { const an = t * 14 + b * Math.PI / 2; linea(85, 84, Math.round(85 + Math.cos(an) * 10), Math.round(84 + Math.sin(an) * 10), f_P.metalL); linea(85, 84, Math.round(85 + Math.cos(an + 0.25) * 9), Math.round(84 + Math.sin(an + 0.25) * 9), f_P.metalS); } disco(85, 84, 2, f_P.k); pset(85, 84, f_P.oro);
  for (let k = 0; k < 9; k++) { const u = (t * 0.35 + k / 9) % 1, x = Math.round(111 + u * 30 + Math.sin(u * 5 + k) * 2), y = Math.round(132 - u * 10 - Math.sin(u * 3 + k * 2) * 2), r = 1 + Math.round(u * 2.5); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (i + j + k) % 2 === 0) pset(x + i, y + j, f_mez(R.pget(x + i, y + j), hex('#e8ecf4'), 0.42 - u * 0.36)); }
  // las estrellas del ciclorama titilan y los tres focos del pórtico parpadean por turnos
  for (let k = 0; k < 12; k++) { const x = 118 + Math.floor(h(k, 1, 677) * 84), y = 48 + Math.floor(h(k, 2, 677) * 56), sc = Math.sin(t * 2.6 + k * 1.9); if (sc > 0.5 && Math.hypot(x - 186, y - 66) > 15) { pset(x, y, f_P.bl); if (sc > 0.85) { pset(x - 1, y, hex('#8a94c8')); pset(x + 1, y, hex('#8a94c8')); pset(x, y - 1, hex('#8a94c8')); pset(x, y + 1, hex('#8a94c8')); } } }
  [84, 160, 236].forEach((x, k) => { const on = k !== 2 || Math.sin(t * 15) > -0.6 || Math.floor(t * 0.6) % 3 !== 0; rect(x - 3, 29, x + 3, 30, on ? hex('#e8f4ff') : hex('#5a6a80')); if (on) { pset(x - 4, 31, hex('#c8e4ff')); pset(x + 4, 31, hex('#c8e4ff')); pset(x, 31, f_P.bl); } });
  for (let k = 0; k < 20; k++) { const cx = [84, 160, 236][k % 3], u = (h(k, 1, 678) + t * (0.015 + h(k, 2, 678) * 0.02)) % 1, y = 34 + Math.round(u * 80), x = Math.round(cx + (h(k, 3, 678) - 0.5) * 2 * (4 + u * 18) + Math.sin(t * 0.6 + k) * 2); if (Math.sin(t * 2.2 + k * 1.9) > 0.1) pset(x, y, f_mez(R.pget(x, y), hex('#e8f4ff'), 0.55)); }
  // el móvil de planetas de maqueta colgado sobre la mesa (se mecen)
  [[222, 62, 4, hex('#d8683a')], [236, 78, 6, hex('#3a8ac8')], [251, 66, 3, hex('#e8c040')]].forEach(([x0, y0, r, c], k) => { const x = x0 + Math.round(Math.sin(t * 1.1 + k * 2) * 2); linea(x0, 24, x, y0 - r, hex('#5a6478')); disco(x, y0, r + 1, f_P.k); disco(x, y0, r, c); disco(x - 1, y0 - 1, r * 0.45, f_mez(c, f_P.bl, 0.5)); if (k === 1) { linea(x - 9, y0 + 2, x + 9, y0 - 2, f_P.papel); } });
  // el flexo de la mesa de maquetas: su luz tiembla sobre la nave a medio pegar
  { const fl = Math.sin(t * 12) > -0.9 ? 0.5 : 0.25; for (let j = 0; j < 6; j++) for (let i = -2 - j; i <= 2 + j; i++) if ((i + j) % 2 === 0) pset(247 + i, 102 + j, f_mez(R.pget(247 + i, 102 + j), hex('#fff0c0'), fl - j * 0.06)); pset(248, 102, hex('#fff8d8')); }
  // un tramoyista que cruza por el fondo con una estrella de atrezo al hombro
  { const u = (t % 18) / 18, ida = u < 0.5, x = Math.round(ida ? 262 - u * 2 * 170 : 92 + (u - 0.5) * 2 * 170), d = ida ? -1 : 1; f_tecnico(R, x, 143, t, { dir: d, anda: true, ropa: hex('#8a4ac8'), pelo: hex('#2a2a34') }); if (ida) { const sx = x - 1, sy = 130; R.poligono([[sx, sy - 5], [sx + 2, sy - 1], [sx + 6, sy - 1], [sx + 3, sy + 1], [sx + 4, sy + 5], [sx, sy + 3], [sx - 4, sy + 5], [sx - 3, sy + 1], [sx - 6, sy - 1], [sx - 2, sy - 1]], f_P.oro); pset(sx, sy, f_P.oroL); } }
  return { suelo: 156, sueloAtras: 143, variante: 'espacio', tarima: { x0: 111, x1: 209, y: 126 }, arco: [114, 44, 206, 126], porton: [37, 81, 53, 117], ventilador: [72, 71, 98, 137], mesaMaquetas: [214, 99, 260, 128], estanteria: [276, 56, 319, 128], marcas: [[150, 160], [196, 160]], libre: [40, 248] };
}
// lo de delante del otro plató: tres cajones de apoyo con un megáfono, la caja de material (la misma, x 32–66) y, a la
// derecha, una mesita plegable con el termo y los vasos junto a una silla de director verde (x 272–296)
function f_plato2Delante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  for (const [x, y, w, a] of [[0, 166, 28, 13], [2, 156, 24, 10], [5, 148, 18, 8]]) { rect(x, y, x + w, y + a, f_P.k); rect(x + 1, y + 1, x + w - 1, y + a - 1, f_P.pino); rect(x + 1, y + 1, x + w - 1, y + 1, f_P.pinoL); rect(x + 1, y + a - 1, x + w - 1, y + a - 1, f_P.pinoS); rect(x + (w >> 1) - 3, y + 3, x + (w >> 1) + 3, y + 4, f_P.k); for (let i = x + 3; i < x + w - 2; i += 5) pset(i, y + a - 3, f_P.pinoS); }
  poligono([[8, 147], [8, 142], [20, 139], [20, 147]], f_P.k); poligono([[9, 146], [9, 143], [19, 141], [19, 146]], hex('#d83a3a')); rect(20, 138, 21, 147, f_P.bl); rect(5, 143, 8, 146, f_P.k); pset(6, 144, hex('#8a8e9a'));
  rect(32, 160, 66, 179, f_P.k); rect(33, 161, 65, 179, hex('#2a2e3a')); rect(33, 161, 65, 161, f_P.metalL); rect(33, 162, 65, 162, f_P.metalS); for (const x of [33, 62]) { rect(x, 163, x + 3, 166, f_P.metal); pset(x + 1, 164, f_P.metalD); } rect(47, 168, 51, 172, f_P.metal); rect(48, 169, 50, 170, f_P.metalD); for (let x = 36; x < 64; x += 4) pset(x, 175, hex('#3a3e4a'));
  for (let k = 0; k < 3; k++) { for (let x = 38; x <= 52; x++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - ((x - 45) / 7.5) ** 2)) * 2); pset(x, 158 - k - a, hex('#3a8a4a')); pset(x, 158 - k + a, k ? hex('#3a8a4a') : hex('#2a5a34')); } } rect(55, 156, 61, 160, f_P.k); rect(56, 157, 60, 159, hex('#c8c8d0')); pset(58, 158, f_P.k);
  // la mesita plegable con el termo (su vapor) y dos vasos
  rect(244, 160, 268, 162, f_P.k); rect(245, 160, 267, 160, f_P.metalL); rect(245, 161, 267, 161, f_P.metalS); linea(247, 163, 264, 179, f_P.k); linea(265, 163, 248, 179, f_P.k); linea(248, 163, 265, 179, f_P.metalS);
  rect(249, 149, 254, 159, f_P.k); rect(250, 150, 253, 159, hex('#d83a3a')); rect(250, 150, 250, 159, hex('#f06a5a')); rect(250, 147, 253, 149, f_P.metalL); for (const x of [258, 263]) { rect(x, 156, x + 2, 159, f_P.bl); pset(x + 2, 157, hex('#c8c0a8')); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; if (u < 0.8) pset(259 + Math.round(Math.sin(u * 6 + k) * 1.5), 154 - Math.round(u * 8), f_mez(R.pget(259, 154 - Math.round(u * 8)), f_P.bl, 0.6 - u * 0.5)); }
  { const x = 272, lona = hex('#2e7a4a'), lonaL = f_mez(lona, f_P.bl, 0.3);
    linea(x + 1, 162, x + 21, 178, f_P.k); linea(x + 2, 162, x + 22, 178, f_P.pino); linea(x + 21, 162, x + 1, 178, f_P.k); linea(x + 22, 162, x + 2, 178, f_P.pinoS); pset(x + 12, 170, f_P.metalL);
    rect(x, 158, x + 23, 161, f_P.k); rect(x + 1, 159, x + 22, 160, lona); rect(x + 1, 159, x + 22, 159, lonaL);
    rect(x, 138, x + 1, 161, f_P.k); rect(x + 22, 138, x + 23, 161, f_P.k); rect(x + 1, 139, x + 1, 160, f_P.pino); rect(x + 22, 139, x + 22, 160, f_P.pinoS); rect(x - 1, 150, x + 4, 151, f_P.pino); rect(x + 19, 150, x + 24, 151, f_P.pino); rect(x - 1, 152, x + 4, 152, f_P.k); rect(x + 19, 152, x + 24, 152, f_P.k);
    rect(x + 2, 139, x + 21, 146, lona); rect(x + 2, 139, x + 21, 139, lonaL); rect(x + 2, 146, x + 21, 146, f_mez(lona, f_P.k, 0.3)); rect(x + 2, 142, x + 21, 143, lonaL); for (let i = x - 2; i < x + 26; i++) if (i % 2) pset(i, 179, hex('#5a4a34')); }
  return { cajones: [0, 138, 28, 179], caja: [32, 155, 66, 179], mesita: [244, 147, 268, 179], sillas: [[272, 138, 296, 179]] };
}
// el plató, entero (ver la cabecera de cine)
function f_plato(R, t, o) {
  if (o.variante === 'espacio') return f_plato2(R, t, o);
  const { rect, pset, linea, disco } = R;
  R.copiar(f_capa(R, 'plato', () => f_platoFijo(R)));
  // por el portón: una nube, un carrito eléctrico que cruza y gente que pasa
  R.recorte([33, 46, 59, 117]);
  // (dos nubes más, a otras velocidades, y un segundo pájaro)
  f_nube(R, Math.round(26 + ((t * 0.9 + 22) % 48)), 50, 6, [hex('#f0f4f6'), hex('#dce6ee'), hex('#bccada')]); f_nube(R, Math.round(24 + ((t * 3.6 + 9) % 52)), 64, 5); f_pajaro(R, Math.round(62 - ((t * 4.5 + 11) % 34)), 52 + Math.round(Math.sin(t * 1.4 + 2) * 2), t, 5, hex('#5a6a7a'));
  f_nube(R, Math.round(30 + ((t * 2.2) % 44)), 56, 8); f_pajaro(R, Math.round(34 + ((t * 6) % 30)), 64 + Math.round(Math.sin(t) * 2), t, 3, hex('#5a6a7a'));
  { const u = (t % 9) / 9, x = Math.round(26 + u * 44); f_r(R, x, 108, x + 9, 112, hex('#f4f0e4')); f_r(R, x + 1, 103, x + 8, 103, hex('#d83a3a')); pset(x + 1, 104, f_P.metalD); pset(x + 8, 104, f_P.metalD); pset(x + 1, 106, f_P.metalD); pset(x + 8, 106, f_P.metalD); f_r(R, x + 4, 105, x + 5, 107, hex('#3a6aa8')); pset(x + 4, 104, f_P.piel); pset(x + 2, 113, f_P.k); pset(x + 7, 113, f_P.k); }
  f_tecnico(R, Math.round(62 - ((t * 3.2) % 34)), 115, t, { dir: -1, anda: true, ropa: hex('#d8a030') });
  R.recorte(null);
  // la escalera de tijera apoyada junto al portón, por delante de lo que pasa fuera
  linea(46, 96, 40, 134, f_P.pinoS); linea(47, 96, 41, 134, f_P.pino); linea(48, 96, 54, 134, f_P.pinoS); linea(49, 96, 55, 134, f_P.pino); for (let y = 102; y < 132; y += 6) linea(45 - ((y - 96) / 6 | 0), y, 49 + ((y - 96) / 6 | 0), y, f_P.pinoS);
  // el piloto rojo del portón, los testigos del cuadro eléctrico y los focos de la parrilla (uno parpadea)
  { const on = Math.floor(t * 1.6) % 2 === 0; rect(43, 38, 47, 40, on ? hex('#ff4a3a') : hex('#6a1a1a')); if (on) { pset(45, 37, hex('#ffb0a0')); for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3], [-2, -2], [2, -2]]) pset(45 + dx * 2, 39 + dy, f_mez(R.pget(45 + dx * 2, 39 + dy), hex('#ff4a3a'), 0.5)); } }
  for (let i = 0; i < 3; i++) pset(97 + i * 3, 72, Math.floor(t * 2 + i * 1.3) % 3 === 0 ? f_P.verdeL : i === 2 && Math.floor(t * 5) % 2 ? hex('#ffb040') : hex('#2a3a2a'));
  [62, 104, 150, 198, 244].forEach((x, k) => { const on = k !== 3 || Math.sin(t * 17) > -0.6 || Math.floor(t * 0.7) % 3 !== 0; rect(x - 3, 29, x + 3, 30, on ? hex('#fff4c8') : hex('#8a7a50')); if (on) { pset(x - 4, 31, hex('#ffe8a0')); pset(x + 4, 31, hex('#ffe8a0')); pset(x, 31, f_P.bl); } });
  // el polvo en los haces
  for (let k = 0; k < 26; k++) { const cx = [62, 104, 150, 198, 244][k % 5], u = (h(k, 1, 520) + t * (0.015 + h(k, 2, 520) * 0.02)) % 1, y = 34 + Math.round(u * 80), x = Math.round(cx + (h(k, 3, 520) - 0.5) * 2 * (4 + u * 16) + Math.sin(t * 0.6 + k) * 2); if (Math.sin(t * 2.2 + k * 1.9) > 0.1) pset(x, y, f_mez(R.pget(x, y), hex('#fff6d0'), 0.6)); }
  // la grúa de cámara: el brazo sube y baja despacio, con el operador y la cámara en la plataforma y los contrapesos
  { const a = -0.42 + Math.sin(t * 0.55) * 0.16, px = 79, py = 102, x1 = px + Math.cos(a) * 38, y1 = py + Math.sin(a) * 38, x0 = px - Math.cos(a) * 15, y0 = py - Math.sin(a) * 15;
    linea(x0, y0 - 1, x1, y1 - 1, hex('#6a80a8')); linea(x0, y0, x1, y1, hex('#4a5e84')); linea(x0, y0 + 1, x1, y1 + 1, f_P.k); linea(px, py - 8, x1 - 4, y1 - 1, f_P.metalD); linea(px, py - 8, x0 + 2, y0 - 1, f_P.metalD); rect(px, py - 8, px, py, f_P.metalD);
    const cx = Math.round(x0), cy = Math.round(y0); rect(cx - 4, cy - 1, cx + 3, cy + 6, f_P.k); rect(cx - 3, cy, cx + 2, cy + 5, hex('#5a5e6a')); rect(cx - 3, cy, cx + 2, cy, hex('#8a8e9a')); rect(cx - 3, cy + 3, cx + 2, cy + 3, hex('#3a3e4a'));
    disco(px + 0.5, py + 0.5, 2.6, f_P.k); pset(px, py, f_P.metalL);
    const qx = Math.round(x1), qy = Math.round(y1); rect(qx - 5, qy + 1, qx + 7, qy + 2, f_P.k); rect(qx - 4, qy + 1, qx + 6, qy + 1, f_P.metal); f_tecnico(R, qx - 1, qy, t, { dir: 1, ropa: hex('#8a3a3a'), pelo: hex('#c8a060') });
    rect(qx + 2, qy - 9, qx + 8, qy - 5, f_P.k); rect(qx + 3, qy - 8, qx + 7, qy - 6, hex('#3a3e4a')); rect(qx + 9, qy - 8, qx + 10, qy - 6, f_P.k); pset(qx + 11, qy - 7, Math.floor(t * 2) % 2 ? hex('#8ac0e0') : f_P.bl); disco(qx + 4, qy - 11, 1.6, f_P.k); disco(qx + 7, qy - 11, 1.6, f_P.k); pset(qx + 5, qy - 4, f_P.rojo); linea(qx + 5, qy - 4, qx + 5, qy, f_P.metalD); }
  // el pintor en el andamio, que dora la columna con su rodillo
  { const m = Math.round(Math.sin(t * 2.6) * 5); f_tecnico(R, 218, 91, t, { dir: -1, ropa: hex('#3a6ac8'), pant: hex('#2a4a9a'), pelo: f_P.bl, brazo: [-9, -9 + m] }); rect(206, 80 + m, 208, 84 + m, f_P.oroL); rect(206, 80 + m, 206, 84 + m, f_P.oro);
    for (let y = 96; y < 100; y++) for (let i = 4; i < 12; i++) if (h(i, y, 521) < 0.3 + 0.3 * Math.sin(t * 0.5)) pset(192 + i, y + Math.round(h(i, 3, 510) * 5), f_P.oro); }
  // un tramoyista que cruza con un tablón al hombro y otro que suelda detrás del bastidor (chispas)
  { const u = (t % 16) / 16, ida = u < 0.5, x = Math.round(ida ? 244 - u * 2 * 150 : 94 + (u - 0.5) * 2 * 150), d = ida ? -1 : 1; f_tecnico(R, x, 143, t, { dir: d, anda: true, ropa: hex('#4a8a5a'), pelo: hex('#e8c040') }); if (ida) { rect(x - 9, 135, x + 9, 136, f_P.pino); rect(x - 9, 135, x + 9, 135, f_P.pinoL); pset(x - 10, 136, f_P.k); pset(x + 10, 136, f_P.k); } }
  { f_tecnico(R, 312, 139, t, { dir: -1, ropa: hex('#5a5a6a'), pelo: hex('#2a2a34'), brazo: [-5, -4] }); rect(310, 130, 312, 132, hex('#2a2a34')); const on = Math.floor(t * 0.5) % 3 !== 2; if (on) { const q = Math.floor(t * 14); pset(306, 135, f_P.bl); pset(305, 135, hex('#a0d8ff')); pset(306, 134, hex('#a0d8ff'));
      for (let k = 0; k < 6; k++) { const a = h(k, q, 522) * Math.PI * 1.2 + Math.PI * 0.6, r = 2 + h(k, q, 523) * 6; pset(Math.round(306 + Math.cos(a) * r), Math.round(135 - Math.abs(Math.sin(a)) * r * 0.8 + r * 0.3), k % 2 ? hex('#fff0a0') : hex('#ffb040')); } } }
  return { suelo: 156, sueloAtras: 143, tarima: { x0: 111, x1: 209, y: 126 }, arco: [114, 38, 206, 126], porton: [33, 46, 59, 117], grua: [64, 80, 120, 136], andamio: [208, 64, 232, 130], roca: [238, 56, 284, 128], bastidor: [289, 57, 319, 128], marcas: [[150, 160], [196, 160]], libre: [40, 248] };
}
// lo de delante del plató: el foco en su trípode, la caja de material y las sillas de director (ver cineDelante)
function f_platoDelante(R, t, o) {
  if (o.variante === 'espacio') return f_plato2Delante(R, t, o);
  const { rect, pset, linea, disco, poligono } = R;
  // el foco fresnel, visto por detrás, en su trípode; su luz se escapa por las viseras
  linea(13, 126, 3, 179, f_P.k); linea(14, 126, 4, 179, hex('#3a3e4a')); linea(15, 126, 25, 179, f_P.k); linea(14, 126, 24, 179, hex('#3a3e4a')); rect(13, 118, 15, 179, f_P.k); rect(14, 118, 14, 179, hex('#5a5e6a')); rect(11, 150, 17, 152, f_P.k);
  rect(1, 98, 25, 119, f_P.k); rect(2, 99, 24, 118, hex('#2a2e3a')); rect(2, 99, 24, 99, hex('#4a4e5a')); for (let y = 102; y < 117; y += 3) rect(4, y, 20, y, hex('#1e222c')); rect(21, 101, 23, 116, hex('#3a3e4a')); disco(6, 103, 1.2, hex('#5a5e6a'));
  poligono([[25, 96], [31, 92], [31, 124], [25, 120]], f_P.k); { const a = Math.sin(t * 13) > -0.9 ? 0.9 : 0.5; rect(26, 99, 26, 117, f_mez(f_P.k, hex('#fff0c8'), a)); rect(27, 97, 27, 119, f_mez(f_P.k, hex('#ffd890'), a * 0.5)); }
  linea(0, 108, 0, 120, hex('#4a4e5a')); for (let y = 119; y < 176; y++) pset(8 + Math.round(Math.sin(y * 0.2) * 2), y, f_P.k);
  // la caja de material: cantoneras, cierres, un rollo de cable naranja y uno de cinta
  rect(32, 160, 66, 179, f_P.k); rect(33, 161, 65, 179, hex('#2a2e3a')); rect(33, 161, 65, 161, f_P.metalL); rect(33, 162, 65, 162, f_P.metalS); for (const x of [33, 62]) { rect(x, 163, x + 3, 166, f_P.metal); pset(x + 1, 164, f_P.metalD); } rect(47, 168, 51, 172, f_P.metal); rect(48, 169, 50, 170, f_P.metalD); for (let x = 36; x < 64; x += 4) pset(x, 175, hex('#3a3e4a'));
  for (let k = 0; k < 3; k++) { for (let x = 38; x <= 52; x++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - ((x - 45) / 7.5) ** 2)) * 2); pset(x, 158 - k - a, hex('#e8702a')); pset(x, 158 - k + a, k ? hex('#e8702a') : hex('#a84a1a')); } } rect(55, 156, 61, 160, f_P.k); rect(56, 157, 60, 159, hex('#c8c8d0')); pset(58, 158, f_P.k);
  // las dos sillas de director: tijera de madera, asiento y respaldo de lona
  for (const [x, lona] of [[244, hex('#2a4a8a')], [272, hex('#a02c34')]]) { const lonaL = f_mez(lona, f_P.bl, 0.3);
    linea(x + 1, 162, x + 21, 178, f_P.k); linea(x + 2, 162, x + 22, 178, f_P.pino); linea(x + 21, 162, x + 1, 178, f_P.k); linea(x + 22, 162, x + 2, 178, f_P.pinoS); pset(x + 12, 170, f_P.metalL);
    rect(x, 158, x + 23, 161, f_P.k); rect(x + 1, 159, x + 22, 160, lona); rect(x + 1, 159, x + 22, 159, lonaL);
    rect(x, 138, x + 1, 161, f_P.k); rect(x + 22, 138, x + 23, 161, f_P.k); rect(x + 1, 139, x + 1, 160, f_P.pino); rect(x + 22, 139, x + 22, 160, f_P.pinoS); rect(x - 1, 150, x + 4, 151, f_P.pino); rect(x + 19, 150, x + 24, 151, f_P.pino); rect(x - 1, 152, x + 4, 152, f_P.k); rect(x + 19, 152, x + 24, 152, f_P.k);
    rect(x + 2, 139, x + 21, 146, lona); rect(x + 2, 139, x + 21, 139, lonaL); rect(x + 2, 146, x + 21, 146, f_mez(lona, f_P.k, 0.3)); rect(x + 2, 142, x + 21, 143, lonaL);
    for (let i = x - 2; i < x + 26; i++) if (i % 2) pset(i, 179, hex('#3e4048')); }
  return { foco: [0, 92, 31, 179], caja: [32, 155, 66, 179], sillas: [[244, 138, 268, 179], [272, 138, 296, 179]] };
}

// lo que se ve por la ventana y no se mueve, según el lugar (quien llama pone el recorte): 'hollywood' (cielo de
// tarde, colinas secas con casitas, naves de estudio con su depósito de agua, los troncos de tres palmeras y la calle),
// 'lluvia' (una ciudad de noche: torres con ventanas encendidas y la bruma rosa de los neones) o 'paris' (los tejados)
function f_oficinaFuera(R, lugar, x0, y0, x1, y1) {
  const { pset, linea } = R, W = x1 - x0 + 1, H = y1 - y0 + 1, P = (xa, ya, xb, yb, c) => f_r(R, xa, ya, xb, yb, c);
  if (lugar === 'paris') { f_parisFuera(R, x0, y0, x1, y1); return; }
  if (lugar === 'lluvia') {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (y - y0) / H * 4; pset(x, y, [hex('#14122e'), hex('#1e1a40'), hex('#2e2254'), hex('#4a2a62'), hex('#6a3068')][Math.min(4, Math.floor(f + f_b4(x, y)))]); }
    for (let k = 0; k < 9; k++) { const bx = x0 + Math.floor(k * W / 9) - 2, w = 6 + Math.floor(h(k, 1, 600) * 6), top = y0 + Math.round(H * (0.16 + h(k, 2, 600) * 0.3)); P(bx, top, bx + w, y1, hex('#26264e')); P(bx, top, bx, y1, hex('#34346a'));
      for (let y = top + 2; y < y1 - 4; y += 3) for (let x = bx + 1; x < bx + w; x += 2) if (h(x, y, 601) < 0.4) pset(x, y, h(x, y, 602) < 0.7 ? hex('#e8c860') : hex('#8ad0e8')); if (k % 3 === 0) linea(bx + (w >> 1), top - 6, bx + (w >> 1), top, hex('#34346a')); }
    for (let k = 0; k < 5; k++) { const bx = x0 + Math.floor(k * W / 5) - 3 + (k % 2) * 4, w = 12 + Math.floor(h(k, 3, 603) * 7), top = y0 + Math.round(H * (0.46 + h(k, 4, 603) * 0.22)); P(bx, top, bx + w, y1, hex('#14142e')); P(bx, top, bx + w, top, hex('#3a3a6a'));
      for (let y = top + 3; y < y1 - 6; y += 5) for (let x = bx + 2; x < bx + w - 1; x += 4) if (h(x, y, 604) < 0.55) { P(x, y, x + 1, y + 2, h(x, y, 605) < 0.75 ? hex('#f0d070') : hex('#f09ab8')); pset(x, y, hex('#fff0b0')); } }
    P(x0, y1 - 8, x1, y1 - 7, hex('#0e0e22')); for (let x = x0; x <= x1; x += 7) P(x, y1 - 6, x, y1, hex('#0e0e22')); P(x0, y1 - 1, x1, y1, hex('#1a1a34'));
    return;
  }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (y - y0) / (H * 0.62) * 5; pset(x, y, [hex('#4a98dc'), hex('#6cb0e6'), hex('#94c8ee'), hex('#c0def0'), hex('#ecdcc0'), hex('#f6d4a8')][Math.min(5, Math.floor(f + f_b4(x, y)))]); }
  const yh = y0 + Math.round(H * 0.6);
  for (let x = x0; x <= x1; x++) { const a = Math.round(7 + Math.sin(x * 0.09 + 1) * 4 + Math.sin(x * 0.23) * 2), b = Math.round(3 + Math.sin(x * 0.13 + 3) * 3);
    for (let y = yh - a; y <= yh + 3; y++) pset(x, y, y === yh - a ? hex('#d8c498') : h(x, y, 606) < 0.14 ? hex('#8a8a58') : (x + y) % 9 === 0 ? hex('#a08c5a') : hex('#b8a474')); for (let y = yh - b; y <= yh + 3; y++) pset(x, y, h(x, y, 607) < 0.2 ? hex('#6e7a4a') : hex('#94905c')); }
  for (let k = 0; k < 9; k++) { const x = x0 + 3 + Math.floor(h(k, 1, 608) * (W - 8)), y = yh - 3 - Math.floor(h(k, 2, 608) * 6); P(x, y, x + 2, y + 1, k % 2 ? f_P.bl : hex('#f0d8b0')); pset(x, y - 1, f_P.teja); pset(x + 1, y - 1, f_P.teja); pset(x + 2, y - 1, f_P.tejaS); }
  for (const [bx, w, a] of [[x0 + 2, 26, 12], [x0 + 34, 30, 15]]) { const by = yh + 4; P(bx, by, bx + w, y1 - 6, hex('#e8dcc0')); P(bx + w - 5, by, bx + w, y1 - 6, hex('#c8b894'));
    for (let x = bx; x <= bx + w; x++) { const c = Math.round(Math.sqrt(Math.max(0, 1 - ((x - bx - w / 2) / (w / 2 + 1)) ** 2)) * a * 0.45); P(x, by - c, x, by, x % 4 === 0 ? hex('#a8b0b0') : hex('#c4cccc')); pset(x, by - c, hex('#e4ecec')); }
    P(bx + 4, y1 - 15, bx + 11, y1 - 7, hex('#7a6a5a')); P(bx + 5, y1 - 14, bx + 10, y1 - 7, hex('#94846e')); for (let x = bx + 15; x < bx + w - 4; x += 5) P(x, by + 4, x + 2, by + 6, hex('#5a7a9a')); P(bx, by + 1, bx + w, by + 1, hex('#b8a888')); }
  const tx = x0 + Math.round(W * 0.9); P(tx - 4, yh - 12, tx + 4, yh - 4, hex('#d0d4d8')); P(tx - 4, yh - 12, tx + 4, yh - 12, f_P.bl); P(tx + 2, yh - 11, tx + 4, yh - 4, hex('#9aa2aa')); pset(tx, yh - 14, hex('#d0d4d8')); P(tx - 1, yh - 13, tx + 1, yh - 13, hex('#d0d4d8')); linea(tx - 3, yh - 3, tx - 4, y1 - 6, hex('#7a828a')); linea(tx + 3, yh - 3, tx + 4, y1 - 6, hex('#7a828a')); linea(tx - 3, yh + 4, tx + 3, yh + 10, hex('#7a828a')); P(tx - 4, yh - 8, tx + 4, yh - 8, hex('#c85a3a'));
  for (const [dx, a0] of [[0.14, 30], [0.33, 38], [0.63, 26]]) { const px = x0 + Math.round(W * dx), a = Math.round(a0 * Math.min(1, H / 67)); /* en una ventana baja, palmeras más cortas */ for (let y = y1 - 6 - a; y <= y1 - 6; y++) { pset(px + Math.round(Math.sin(y * 0.11) * 1.2), y, y % 3 ? hex('#7a5a3a') : hex('#5a4028')); } }
  P(x0, y1 - 5, x1, y1, hex('#5a5c66')); P(x0, y1 - 5, x1, y1 - 5, hex('#c8c4b4')); for (let x = x0 + 2; x < x1; x += 7) P(x, y1 - 2, x + 3, y1 - 2, hex('#e8d890'));
}

// lo que se mueve fuera, según el lugar
function f_oficinaFueraVivo(R, t, lugar, x0, y0, x1, y1) {
  const { pset, linea } = R, W = x1 - x0 + 1, H = y1 - y0 + 1;
  if (lugar === 'paris') { f_parisFueraVivo(R, t, x0, y0, x1, y1); return; }
  if (lugar === 'lluvia') {
    // ventanas que se encienden y se apagan, la baliza roja, los neones (símbolos, sin letras) y el tren elevado
    for (let k = 0; k < 14; k++) { const x = x0 + 2 + Math.floor(h(k, 1, 610) * (W - 4)), y = y0 + Math.round(H * 0.5) + Math.floor(h(k, 2, 610) * H * 0.35); if (Math.floor(t * 0.4 + h(k, 3, 610) * 9) % 4 === 0) { pset(x, y, hex('#fff0b0')); pset(x + 1, y, hex('#f0d070')); } }
    if (Math.floor(t * 1.4) % 2) { pset(x0 + Math.round(W * 0.36), y0 + 5, hex('#ff4a3a')); pset(x0 + Math.round(W * 0.8), y0 + 9, hex('#ff4a3a')); }
    { const nx = x0 + Math.round(W * 0.16), ny = y0 + Math.round(H * 0.34), on = Math.floor(t * 1.3) % 5, rosa = hex('#ff5aa8'), rosaL = hex('#ffc0e0'), apag = hex('#6a2a52');
      f_r(R, nx - 1, ny - 1, nx + 7, ny + 27, hex('#1a1030')); for (let y = ny; y <= ny + 26; y++) { pset(nx, y, on ? rosa : apag); pset(nx + 6, y, on ? rosa : apag); } for (let x = nx; x <= nx + 6; x++) { pset(x, ny, on ? rosa : apag); pset(x, ny + 26, on ? rosa : apag); }
      const s = (k) => (on > k ? rosaL : apag); R.disco(nx + 3.5, ny + 5.5, 2, s(0)); pset(nx + 3, ny + 5, hex('#1a1030')); for (let i = 0; i < 4; i++) linea(nx + 3 - (i >> 1), ny + 11 + i, nx + 3 + ((i + 1) >> 1), ny + 11 + i, s(1)); f_r(R, nx + 2, ny + 18, nx + 4, ny + 20, s(2)); f_r(R, nx + 2, ny + 23, nx + 4, ny + 23, s(3));
      if (on) for (let y = ny - 3; y <= ny + 29; y++) for (const x of [nx - 3, nx + 9]) if ((x + y) % 2) pset(x, y, f_mez(R.pget(x, y), rosa, 0.4)); }
    { const nx = x0 + Math.round(W * 0.52), ny = y0 + Math.round(H * 0.5), on = Math.sin(t * 9) > -0.7 && Math.floor(t * 0.6) % 4 !== 3, c = on ? hex('#4ae8f0') : hex('#1e5a66'); f_r(R, nx - 1, ny - 1, nx + 21, ny + 6, hex('#101a30'));
      for (let i = 0; i < 12; i++) { pset(nx + 1 + i, ny + 2, c); pset(nx + 1 + i, ny + 3, c); } for (let i = 0; i < 4; i++) { pset(nx + 13 + i, ny + 2 - (3 - i), c); pset(nx + 13 + i, ny + 3 + (3 - i), c); } pset(nx + 18, ny + 2, on ? f_P.bl : c); pset(nx + 19, ny + 3, c); pset(nx + 18, ny + 3, c); pset(nx + 19, ny + 2, c); }
    { const u = (t % 7) / 7, tx = Math.round(x0 - 30 + u * (W + 60)); for (let i = 0; i < 26; i++) { const x = tx + i; pset(x, y1 - 11, hex('#3a3a5a')); pset(x, y1 - 10, i % 4 === 3 ? hex('#3a3a5a') : hex('#f0d070')); pset(x, y1 - 9, hex('#2a2a48')); } pset(tx + 26, y1 - 10, f_P.bl); }
    // la lluvia: rayas que caen en diagonal y gotas que resbalan por el cristal
    for (let k = 0; k < 46; k++) { const x = x0 + ((h(k, 1, 611) * W + t * 22 * (0.8 + h(k, 3, 611) * 0.4)) % W), y = y0 + ((h(k, 2, 611) * H + t * 120 * (0.8 + h(k, 3, 611) * 0.4)) % H); for (let i = 0; i < 4; i++) { const px = Math.round(x + i * 0.4), py = Math.round(y + i); pset(px, py, f_mez(R.pget(px, py), hex('#b8d0f0'), 0.45)); } }
    for (let k = 0; k < 9; k++) { const u = (h(k, 1, 612) + t * (0.03 + h(k, 2, 612) * 0.05)) % 1, x = x0 + 3 + Math.floor(h(k, 3, 612) * (W - 6)) + Math.round(Math.sin(u * 20 + k) * 0.8), y = y0 + Math.round(u * H); for (let i = 1; i < 7; i++) pset(x, y - i, f_mez(R.pget(x, y - i), hex('#b8d0f0'), 0.3 - i * 0.04)); pset(x, y, hex('#dceafc')); pset(x, y + 1, hex('#8aa8d0')); }
    return;
  }
  // Hollywood: nubes, un dirigible lento, las palmeras al viento, pájaros y coches por la calle
  for (let k = 0; k < 3; k++) f_nube(R, Math.round(x0 - 14 + ((t * (1 + k * 0.8) + k * 41) % (W + 30))), y0 + 5 + k * 6, 8 + k * 3, [f_P.bl, hex('#f4ead8'), hex('#e0c8b0')]);
  { const u = (t % 40) / 40, x = Math.round(x1 + 12 - u * (W + 30)), y = y0 + 16 + Math.round(Math.sin(t * 0.5) * 1); for (let i = -6; i <= 6; i++) { const a = Math.round(Math.sqrt(1 - (i / 6.5) ** 2) * 2.4); f_r(R, x + i, y - a, x + i, y + a, i > 3 ? hex('#a8b0bc') : hex('#d8dce4')); pset(x + i, y - a, f_P.bl); } f_r(R, x - 3, y, x + 2, y, hex('#d83a3a')); f_r(R, x - 1, y + 3, x + 1, y + 3, hex('#5a626e')); pset(x + 7, y - 1, hex('#a8b0bc')); pset(x + 7, y + 1, hex('#a8b0bc')); }
  for (const [dx, a0, k] of [[0.14, 30, 0], [0.33, 38, 1], [0.63, 26, 2]]) { const a = Math.round(a0 * Math.min(1, H / 67)), px = x0 + Math.round(W * dx) + Math.round(Math.sin((y1 - 6 - a) * 0.11) * 1.2), py = y1 - 6 - a, sw = Math.sin(t * 1.4 + k * 2) * 1.6;
    for (let f = 0; f < 7; f++) { const an = -Math.PI + f * Math.PI / 6, L = 6 + (f % 2); let qx = px, qy = py; for (let i = 1; i <= L; i++) { const x = px + Math.cos(an) * i + sw * i / L, y = py + Math.sin(an) * i * 0.6 + (i * i) / L * 0.7; linea(qx, qy, x, y, f % 2 ? hex('#3a7a3a') : hex('#2a5a2c')); qx = x; qy = y; } } pset(px, py, hex('#8a5a2a')); pset(px + 1, py + 1, hex('#8a5a2a')); }
  for (let k = 0; k < 2; k++) f_pajaro(R, Math.round(x0 + ((t * (6 + k * 3) + k * 37) % (W + 10)) - 5), y0 + 22 + k * 5 + Math.round(Math.sin(t * 1.2 + k) * 2), t, k);
  const COCHE = [hex('#d83a3a'), f_P.bl, hex('#3a8ad8'), hex('#e8c040'), hex('#4a9a5a')];
  for (let k = 0; k < 5; k++) { const d = k % 2 ? 1 : -1, x = x0 + Math.round((((k * 23 + t * (9 + (k % 3) * 4) * d) % (W + 12)) + W + 12) % (W + 12)) - 6, y = y1 - (d > 0 ? 1 : 3); f_r(R, x, y, x + 4, y, COCHE[k]); f_r(R, x + 1, y - 1, x + 3, y - 1, COCHE[k]); pset(x + 2, y - 1, hex('#b8dcf0')); pset(x, y + 1, f_P.k); pset(x + 4, y + 1, f_P.k); }
}

// un cartel de película enmarcado, sin letras: formas y colores NUESTROS, y abajo las barras que insinúan los créditos
function f_cartel(R, x, y, k) {
  const { rect, pset, disco, poligono, linea } = R, w = 30, a = 52;
  rect(x + 2, y + a + 1, x + w + 1, y + a + 2, hex('#a08850')); rect(x - 1, y - 1, x + w, y + a, f_P.k); rect(x, y, x + w - 1, y + a - 1, hex('#3a2a1e')); rect(x, y, x + w - 1, y, hex('#6a5038')); rect(x + 2, y + 2, x + w - 3, y + a - 3, f_P.papel);
  const x0 = x + 3, y0 = y + 3, x1 = x + w - 4, y1 = y + a - 13;
  if (k === 0) { for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) pset(i, j, [hex('#f4d23a'), hex('#f0a030'), hex('#e8603a'), hex('#b83a6a')][Math.min(3, Math.floor((j - y0) / (y1 - y0) * 3.4 + f_b4(i, j)))]);
    disco(x + 15, y0 + 16, 8, hex('#fff0a0')); disco(x + 15, y0 + 16, 6, hex('#fff8d8')); poligono([[x0, y1 + 1], [x0, y1 - 9], [x0 + 7, y1 - 16], [x0 + 13, y1 - 8], [x0 + 18, y1 - 13], [x1 + 1, y1 - 5], [x1 + 1, y1 + 1]], hex('#3a1a4a')); linea(x0 + 7, y1 - 16, x0 + 10, y1 - 9, hex('#6a3a7a')); for (let i = 0; i < 4; i++) pset(x0 + 4 + i * 6, y0 + 3 + (i % 2) * 3, f_P.bl); }
  else if (k === 1) { rect(x0, y0, x1, y1, hex('#1a7a84')); for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) if (h(i, j, 620) < 0.1) pset(i, j, hex('#2a8e98'));
    for (const [r, c] of [[10, hex('#d8343a')], [7.5, f_P.papel], [5, hex('#d8343a')], [2.5, f_P.papel]]) disco(x + 15, y0 + 15, r, c); poligono([[x0, y1 - 3], [x1 + 1, y0 + 6], [x1 + 1, y0 + 10], [x0, y1 + 1]], hex('#f4d23a')); rect(x + 13, y1 - 9, x + 16, y1, f_P.k); disco(x + 15, y1 - 11, 2, f_P.k); }
  else if (k === 3) { for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) pset(i, j, [hex('#2a2a5a'), hex('#6a3a7a'), hex('#c84a6a'), hex('#f08a3a'), hex('#f4d23a')][Math.min(4, Math.floor((j - y0) / (y1 - y0) * 4.6 + f_b4(i, j) * 0.8))]);
    for (let j = 0; j <= 10; j++) { const w = Math.round(Math.sqrt(100 - j * j)); if (j % 3 !== 2) rect(Math.max(x0, x + 15 - w), y1 - 6 - j, Math.min(x1, x + 15 + w), y1 - 6 - j, hex('#fff0a0')); } rect(x0, y1 - 5, x1, y1, hex('#1a1a3a'));
    linea(x + 8, y1, x + 11, y0 + 13, f_P.k); linea(x + 9, y1, x + 12, y0 + 13, f_P.k); for (const [dx, dy] of [[-7, 2], [-6, -3], [-1, -6], [5, -4], [8, 1], [3, 4], [-3, 5]]) linea(x + 11, y0 + 13, x + 11 + dx, y0 + 13 + dy, f_P.k); }
  else if (k === 4) { rect(x0, y0, x1, y1, hex('#b8302a')); for (let f = 0; f < 12; f++) { const an = f * Math.PI / 6; if (f % 2 === 0) poligono([[x + 15, y0 + 18], [x + 15 + Math.cos(an - 0.13) * 40, y0 + 18 + Math.sin(an - 0.13) * 40], [x + 15 + Math.cos(an + 0.13) * 40, y0 + 18 + Math.sin(an + 0.13) * 40]].map(([px, py]) => [Math.max(x0, Math.min(x1 + 1, px)), Math.max(y0, Math.min(y1 + 1, py))]), hex('#e8603a')); }
    disco(x + 15, y0 + 18, 9, f_P.k); disco(x + 15, y0 + 18, 7.6, f_P.papel); for (let q = 0; q < 5; q++) disco(x + 15 + Math.cos(q * 1.257) * 4.4, y0 + 18 + Math.sin(q * 1.257) * 4.4, 1.5, f_P.k); pset(x + 15, y0 + 18, f_P.k); rect(x0, y1 - 3, x1, y1, hex('#f4d23a')); }
  else if (k === 5) { for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) pset(i, j, [hex('#101a3e'), hex('#1e3a6a'), hex('#2e5a8a')][Math.min(2, Math.floor((j - y0) / (y1 - y0) * 2.6 + f_b4(i, j) * 0.8))]); for (let i = 0; i < 7; i++) pset(x0 + 2 + ((i * 7) % 22), y0 + 2 + ((i * 5) % 12), f_P.bl);
    disco(x + 21, y0 + 7, 4, hex('#f4ecd0')); disco(x + 23, y0 + 6, 3.4, hex('#101a3e')); poligono([[x0, y1 + 1], [x0 + 9, y0 + 14], [x0 + 15, y0 + 24], [x0 + 19, y0 + 19], [x1 + 1, y1 - 4], [x1 + 1, y1 + 1]], hex('#3a8a8a')); poligono([[x0 + 9, y0 + 14], [x0 + 12, y0 + 19], [x0 + 9, y0 + 18], [x0 + 6, y0 + 20]], f_P.bl); linea(x0 + 9, y0 + 14, x0 + 15, y0 + 24, hex('#1e5a62'));
    for (let j = 0; j < 11; j++) { const w = (11 - j) >> 2; rect(x + 17 - w, y1 - j, x + 17 + w, y1 - j, j % 3 === 1 ? hex('#1e5a62') : hex('#f4d23a')); } }
  else { rect(x0, y0, x1, y1, hex('#14142a')); for (let f = 0; f < 9; f++) { const an = -Math.PI + (f + 0.5) * Math.PI / 9; if (f % 2 === 0) poligono([[x + 15, y1], [x + 15 + Math.cos(an - 0.14) * 44, y1 + Math.sin(an - 0.14) * 44], [x + 15 + Math.cos(an + 0.14) * 44, y1 + Math.sin(an + 0.14) * 44]].map(([px, py]) => [Math.max(x0, Math.min(x1 + 1, px)), Math.max(y0, Math.min(y1 + 1, py))]), f % 4 ? hex('#e8a030') : hex('#f4d23a')); }
    rect(x0, y0, x1, y0 + 4, hex('#d8343a')); poligono([[x + 15, y0 + 9], [x + 19, y0 + 16], [x + 15, y0 + 23], [x + 11, y0 + 16]], f_P.bl); poligono([[x + 15, y0 + 12], [x + 17, y0 + 16], [x + 15, y0 + 20], [x + 13, y0 + 16]], hex('#8ad0e8')); rect(x0, y1 - 2, x1, y1, hex('#14142a')); }
  rect(x0 + 2, y1 + 3, x1 - 2, y1 + 5, k === 1 || k === 5 ? hex('#d8343a') : hex('#2a2a3a')); rect(x0 + 6, y1 + 7, x1 - 6, y1 + 7, hex('#8a8698')); rect(x0 + 3, y1 + 9, x1 - 3, y1 + 9, hex('#b8b4c0'));
  // la luz de cuadro, de latón, y su resplandor
  rect(x + 8, y - 5, x + 21, y - 4, f_P.oro); rect(x + 8, y - 5, x + 21, y - 5, f_P.oroL); rect(x + 14, y - 3, x + 15, y - 2, f_P.oroS); for (let j = 2; j < 9; j++) for (let i = x + 4 + j; i < x + w - 4 - j; i++) if ((i + j) % 2 === 0) pset(i, y + j, f_mez(R.pget(i, y + j), hex('#fff0c0'), 0.4 - j * 0.04));
}

// la oficina, lo que no se mueve (según el lugar: de noche, con lluvia, la habitación queda en penumbra azulada)
function f_oficinaFijo(R, lugar) {
  const { rect, pset, linea, poligono, disco } = R, tela = hex('#c8aa6c'), telaS = hex('#b89858'), telaL = hex('#d8bc80');
  // el techo de placas, la moldura de nogal y la pared entelada (trama de arpillera, con sus paños)
  rect(0, 0, 319, 10, hex('#e4dcc8')); for (let x = 0; x < 320; x += 32) rect(x, 0, x, 10, hex('#d8cfb8')); rect(0, 5, 319, 5, hex('#dcd3bc')); for (let y = 0; y < 10; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 630) < 0.06) pset(x, y, hex('#d8cfb8'));
  rect(0, 11, 319, 13, f_P.nogal); rect(0, 11, 319, 11, f_P.nogalL); rect(0, 13, 319, 13, f_P.nogalD);
  for (let y = 14; y < 100; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 2, y, 631), g = h(x, y, 632); pset(x, y, x % 80 === 79 ? telaS : v < 0.22 ? telaS : v > 0.9 ? telaL : g < 0.05 ? telaL : y < 18 && (x + y) % 2 ? telaS : tela); }
  // el arrimadero de nogal con cuarterones y veta, y el rodapié
  rect(0, 100, 319, 127, f_P.nogal); rect(0, 100, 319, 100, f_P.nogalL); rect(0, 101, 319, 102, f_P.nogalS); rect(0, 103, 319, 103, f_P.nogalD);
  for (let x = 2; x < 320; x += 40) { f_bisel(R, x, 106, x + 35, 121, f_P.nogalL, f_P.nogalD); rect(x + 2, 108, x + 33, 119, f_P.nogalS); for (let k = 0; k < 8; k++) { const xb = x + 4 + k * 4; for (let y = 109; y < 119; y++) if (h(k + x, y >> 2, 633) < 0.75) pset(Math.round(xb + Math.sin(y * 0.3 + k + x) * 1), y, k % 3 ? f_P.nogalD : f_P.nogal); } }
  rect(0, 123, 319, 127, f_P.nogalD); rect(0, 123, 319, 123, f_P.nogalS);
  // la moqueta de pelo, color teja, con su dibujo de rombos y la sombra al pie de la pared
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 634), a = (x + y * 2) % 48, b = ((x - y * 2) % 48 + 48) % 48; let c = a < 2 || b < 2 ? hex('#7e3c1e') : (a > 22 && a < 26) && (b > 22 && b < 26) ? hex('#c8803c') : v < 0.2 ? hex('#8e4624') : v > 0.85 ? hex('#b0623a') : hex('#9e5230'); if (y < 133) c = f_mez(c, f_P.nogalD, 0.45 - (y - 128) * 0.08); pset(x, y, c); }
  // el sofá de cuero bajo la ventana (capitoné, tres cojines) y un cojín mostaza
  rect(11, 107, 99, 141, f_P.k); rect(12, 108, 98, 126, hex('#6a3a26')); rect(12, 108, 98, 109, hex('#8a5238')); for (let y = 112; y < 125; y += 6) for (let x = 18 + ((y / 6) % 2 | 0) * 5; x < 96; x += 10) { pset(x, y, hex('#3e2014')); pset(x + 1, y - 1, hex('#8a5238')); pset(x - 1, y + 1, hex('#4e2a1a')); }
  for (let k = 0; k < 3; k++) { const x = 19 + k * 24; rect(x, 126, x + 23, 134, hex('#7a4630')); rect(x, 126, x + 23, 127, hex('#9a6044')); rect(x + 23, 126, x + 23, 134, hex('#4e2a1a')); rect(x, 134, x + 23, 134, hex('#4e2a1a')); }
  rect(12, 118, 18, 138, hex('#6a3a26')); rect(12, 118, 18, 119, hex('#8a5238')); rect(92, 118, 98, 138, hex('#5a301e')); rect(92, 118, 98, 119, hex('#8a5238')); rect(12, 135, 98, 138, hex('#4e2a1a')); rect(14, 139, 17, 141, f_P.nogalD); rect(93, 139, 96, 141, f_P.nogalD);
  poligono([[70, 116], [84, 114], [86, 127], [72, 128]], hex('#d8a030')); poligono([[72, 117], [83, 116], [84, 126], [73, 127]], hex('#e8b840')); linea(74, 119, 82, 124, hex('#b88420')); for (let x = 10; x < 102; x++) if (x % 2) pset(x, 142, hex('#5e2c14'));
  // los tres carteles con su luz, el reloj, el archivador metálico con guiones encima y la estantería de latas de película
  [110, 148, 186].forEach((x, k) => f_cartel(R, x, 32, k));
  rect(225, 85, 259, 128, f_P.k); rect(226, 86, 258, 127, hex('#6a7458')); rect(226, 86, 258, 86, hex('#8a947a')); rect(256, 86, 258, 127, hex('#525c44'));
  for (let c = 0; c < 3; c++) { const y = 88 + c * 13; f_bisel(R, 228, y, 254, y + 11, hex('#8a947a'), hex('#4a5440')); rect(237, y + 2, 245, y + 4, f_P.papel); rect(238, y + 3, 243, y + 3, hex('#8a8698')); rect(236, y + 7, 246, y + 8, f_P.metalL); rect(236, y + 8, 246, y + 8, f_P.metalD); }
  for (let k = 0; k < 4; k++) { const y = 83 - k * 2; rect(227 + (k % 2), y, 241 + (k % 2), y + 1, [f_P.papel, hex('#b8d0e8'), f_P.papel, hex('#f0c8c0')][k]); rect(227 + (k % 2), y + 1, 241 + (k % 2), y + 1, f_P.papelS); pset(228 + (k % 2), y, f_P.oroS); }
  disco(242.5, 56.5, 8, f_P.k); disco(242.5, 56.5, 7, f_P.oroS); disco(242.5, 56.5, 6, f_P.bl); for (let k = 0; k < 12; k++) pset(Math.round(242 + Math.cos(k * Math.PI / 6) * 5), Math.round(56 + Math.sin(k * Math.PI / 6) * 5), k % 3 ? hex('#b8b4c0') : f_P.k);
  rect(267, 52, 319, 128, f_P.k); rect(268, 53, 319, 127, f_P.nogalD); rect(268, 53, 319, 53, f_P.nogalL); rect(268, 53, 269, 127, f_P.nogal);
  for (const y of [72, 91, 110, 126]) { rect(270, y, 319, y + 1, f_P.nogal); rect(270, y, 319, y, f_P.nogalL); }
  const lata = (x, y, w, c) => { rect(x, y, x + w, y + 3, f_P.k); rect(x + 1, y, x + w - 1, y + 2, f_P.metal); rect(x + 1, y, x + w - 1, y, f_P.metalL); rect(x + 3, y + 1, x + 7, y + 1, c); pset(x + w - 2, y + 1, f_P.metalD); };
  for (let k = 0; k < 5; k++) lata(272 + (k % 2), 68 - k * 3, 15, f_mez(f_VIVOS[(k * 3) % 10], f_P.metalD, 0.3)); disco(302.5, 63.5, 7.5, f_P.k); disco(302.5, 63.5, 6.5, f_P.metal); disco(302.5, 63.5, 5, f_P.metalD); for (let k = 0; k < 3; k++) disco(302.5 + Math.cos(k * 2.09) * 3, 63.5 + Math.sin(k * 2.09) * 3, 1.3, f_P.nogalD); pset(302, 63, f_P.metalL); pset(299, 58, f_P.metalL);
  // dos trofeos genéricos (una copa y una estrella sobre peana) y más latas
  rect(275, 86, 281, 90, f_P.nogalS); rect(277, 82, 279, 85, f_P.oro); poligono([[274, 75], [283, 75], [281, 82], [276, 82]], f_P.oro); rect(275, 75, 282, 75, f_P.oroL); pset(276, 77, f_P.oroL); pset(273, 77, f_P.oroS); pset(284, 77, f_P.oroS);
  rect(291, 87, 297, 90, f_P.nogalS); rect(294, 82, 294, 86, f_P.oroS); poligono([[294, 74], [296, 78], [299, 79], [296, 81], [294, 84], [292, 81], [289, 79], [292, 78]], f_P.oro); pset(294, 78, f_P.oroL);
  for (let k = 0; k < 3; k++) lata(303, 87 - k * 3, 13, f_mez(f_VIVOS[(k * 3 + 4) % 10], f_P.metalD, 0.3));
  for (let k = 0; k < 4; k++) lata(272, 106 - k * 3, 16, f_mez(f_VIVOS[(k * 2 + 1) % 10], f_P.metalD, 0.3)); for (let k = 0; k < 5; k++) lata(293 + (k % 2), 106 - k * 3, 16, f_mez(f_VIVOS[(k * 2 + 6) % 10], f_P.metalD, 0.3));
  for (let x = 272; x < 318;) { const w = 3 + Math.floor(h(x, 1, 635) * 3), a = 9 + Math.floor(h(x, 2, 635) * 5), c = [hex('#6a4a3a'), hex('#4a5a6a'), hex('#7a6a4a'), hex('#5a3a4a')][Math.floor(h(x, 3, 635) * 4)]; rect(x, 126 - a, x + w - 1, 125, c); rect(x, 126 - a, x, 125, f_mez(c, f_P.bl, 0.25)); rect(x + 1, 126 - a + 2, x + w - 2, 126 - a + 3, f_P.papel); x += w + (h(x, 4, 635) < 0.15 ? 3 : 0); }
  for (let x = 224; x < 320; x++) if (x % 2) pset(x, 129, hex('#5e2c14'));
  // el sillón del productor, de cuero granate con capitoné, detrás del escritorio
  for (let y = 108; y <= 148; y++) { const m = y < 114 ? Math.round(Math.sqrt(Math.max(0, 1 - ((114 - y) / 6.5) ** 2)) * 14) : 14; rect(160 - m - 1, y, 160 + m + 1, y, f_P.k); rect(160 - m, y, 160 + m, y, y < 110 ? hex('#963a48') : hex('#7c2638')); pset(160 - m, y, hex('#963a48')); rect(160 + m - 2, y, 160 + m, y, hex('#5a1828')); }
  for (let y = 114; y < 146; y += 7) for (let x = 151 + ((y / 7) % 2 | 0) * 4; x < 172; x += 8) { pset(x, y, hex('#3e0e1c')); pset(x + 1, y - 1, hex('#963a48')); } rect(143, 134, 147, 146, f_P.k); rect(144, 135, 146, 146, hex('#5a1828')); rect(173, 134, 177, 146, f_P.k); rect(174, 135, 176, 146, hex('#5a1828'));
  // la ventana: el marco de nogal, el alféizar con un cactus, y la persiana recogida arriba
  rect(16, 24, 96, 102, f_P.k); rect(17, 25, 95, 101, f_P.nogalS); rect(17, 25, 95, 25, f_P.nogalL); rect(17, 25, 17, 101, f_P.nogalL); rect(20, 28, 92, 96, f_P.nogalD);
  // de noche: la penumbra azulada en toda la habitación (el cristal se pinta después)
  if (lugar === 'lluvia') { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, f_mez(R.pget(x, y), hex('#161a40'), y < 14 ? 0.5 : 0.38));
    for (const x of [110, 148, 186]) for (let j = 0; j < 30; j++) for (let i = x + 2; i < x + 28; i++) pset(i, 34 + j, f_mez(R.pget(i, 34 + j), hex('#ffe0a0'), Math.max(0, 0.3 - j * 0.012))); }
  R.recorte([21, 29, 91, 95]); f_oficinaFuera(R, lugar, 21, 29, 91, 95); R.recorte(null);
  rect(14, 97, 98, 99, f_P.k); rect(15, 97, 97, 98, lugar === 'lluvia' ? hex('#5a4a4a') : f_P.nogalL);
  if (lugar !== 'lluvia') f_haz(R, [[30, 128], [96, 128], [136, 176], [52, 176]], hex('#fff0c0'), lugar === 'paris' ? 0.16 : 0.24);
  // la esquina de Atom, tranquila: la trama del entelado se apaga ahí
  f_calmar(R, 272, 16, 319, 47, 0.6);
}
// la oficina del productor, entera (ver la cabecera de cine)
function f_oficina(R, t, o) {
  if (f_ofiVar(o) !== 'paris') return f_oficina2(R, t, o, f_ofiVar(o));
  const { rect, pset, linea, disco } = R, lugar = o.lugar === 'lluvia' || o.lugar === 'paris' ? o.lugar : 'hollywood', noche = lugar === 'lluvia';
  R.copiar(f_capa(R, 'oficina-' + lugar, () => f_oficinaFijo(R, lugar)));
  R.recorte([21, 29, 91, 95]); f_oficinaFueraVivo(R, t, lugar, 21, 29, 91, 95); R.recorte(null);
  // el parteluz, la persiana recogida con su cordón, el brillo del cristal y el cactus del alféizar
  rect(55, 29, 57, 95, f_P.nogalD); rect(56, 29, 56, 95, noche ? hex('#3a2a2a') : f_P.nogal); rect(21, 29, 91, 30, f_P.nogalD);
  for (let y = 31; y < 39; y += 2) { rect(21, y, 91, y, noche ? hex('#8a8698') : hex('#f0e8d4')); rect(21, y + 1, 91, y + 1, noche ? hex('#4a4a62') : hex('#b8ae94')); } rect(88, 39, 88, 62, noche ? hex('#6a6a82') : hex('#d8d0bc')); pset(88, 63, f_P.oro); pset(88, 64, f_P.oroS);
  for (let i = 0; i < 16; i++) { for (const [bx, by] of [[26, 42], [31, 42], [62, 56]]) { const x = bx + i, y = by + i * 2; if (y < 95 && (x < 55 || x > 57)) pset(x, y, f_mez(R.pget(x, y), f_P.bl, noche ? 0.14 : 0.32)); } }
  rect(27, 92, 33, 96, noche ? hex('#6a3a2a') : f_P.teja); rect(27, 92, 33, 92, noche ? hex('#8a4a3a') : hex('#e08a5a')); rect(29, 84, 31, 91, noche ? hex('#2a5a44') : f_P.verde); pset(29, 84, f_P.verdeL); rect(27, 87, 28, 89, noche ? hex('#2a5a44') : f_P.verdeS); pset(32, 86, f_P.verdeS); pset(33, 85, f_P.verdeS); pset(30, 83, hex('#f46aa8'));
  // de noche, el reflejo de los neones en la pared y en la moqueta; de día, motas de polvo en el sol
  if (noche) { const rosa = Math.floor(t * 1.3) % 5 > 0, cian = Math.sin(t * 9) > -0.7 && Math.floor(t * 0.6) % 4 !== 3;
    if (rosa) f_haz(R, [[30, 128], [70, 128], [96, 172], [44, 172]], hex('#ff5aa8'), 0.16, 2); if (cian) f_haz(R, [[60, 128], [96, 128], [140, 172], [92, 172]], hex('#4ae8f0'), 0.13, 2);
    for (let y = 30; y < 96; y += 2) { if (rosa) pset(96 + (y % 4 ? 1 : 2), y, f_mez(R.pget(97, y), hex('#ff5aa8'), 0.5)); } }
  else for (let k = 0; k < 12; k++) { const u = (h(k, 1, 640) + t * (0.02 + h(k, 2, 640) * 0.03)) % 1, y = 100 + Math.round(u * 60), x = Math.round(60 + h(k, 3, 640) * 50 + (y - 100) * 0.4 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 2 + k * 1.9) > 0.1) pset(x, y, f_mez(R.pget(x, y), hex('#fff6d0'), 0.6)); }
  // el reloj de pared (las agujas andan) y el ventilador que gira la cabeza sobre el archivador, con sus cintas al aire
  { const sa = t * Math.PI / 2.5 - Math.PI / 2; linea(242, 56, 242 + Math.cos(-0.9) * 3, 56 + Math.sin(-0.9) * 3, f_P.k); linea(242, 56, 242 + Math.cos(0.6) * 4, 56 + Math.sin(0.6) * 4, f_P.k); linea(242, 56, Math.round(242 + Math.cos(sa) * 5), Math.round(56 + Math.sin(sa) * 5), hex('#d83a3a')); }
  { const gir = Math.sin(t * 0.7), cx = 250 + Math.round(gir * 2), cy = 70, rx = 6.5 - Math.abs(gir) * 1.5, met = noche ? hex('#7a84a0') : f_P.metalL;
    rect(246, 82, 255, 84, f_P.k); rect(247, 82, 254, 83, noche ? hex('#4a5068') : f_P.metalS); rect(250, 77, 251, 82, noche ? hex('#4a5068') : f_P.metalS);
    for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; pset(Math.round(cx + Math.cos(an) * rx), Math.round(cy + Math.sin(an) * 6.5), f_P.k); if (a % 5 === 0) linea(cx, cy, Math.round(cx + Math.cos(an) * (rx - 1)), Math.round(cy + Math.sin(an) * 5.5), noche ? hex('#3a4058') : hex('#8a94a4')); }
    for (let b = 0; b < 3; b++) { const an = t * 26 + b * 2.094; linea(cx, cy, Math.round(cx + Math.cos(an) * (rx - 1.5)), Math.round(cy + Math.sin(an) * 5), met); } pset(cx, cy, f_P.oro);
    for (let k = 0; k < 2; k++) for (let i = 0; i < 9; i++) { const x = cx - Math.round(rx) - 1 - i + Math.round(gir * 1), y = cy - 3 + k * 5 + Math.round(Math.sin(t * 12 + i * 0.9 + k * 2) * (i / 4)); pset(x, y, k ? hex('#d83a3a') : f_P.bl); }
    if (Math.sin(t * 3) > 0.2) { rect(238, 74, 242, 75, f_P.papel); pset(237, 73, f_P.papel); pset(236, 72, f_P.papelS); } }
  return { suelo: 158, sueloTrasMesa: 147, ventana: [20, 28, 92, 96], sofa: [12, 108, 98, 141], carteles: [[110, 32], [148, 32], [186, 32]], archivador: [226, 86, 258, 127], estanteria: [268, 53, 319, 127], sillon: [146, 108, 174, 148], mesa: { x0: 98, x1: 222, y: 143, frente: 150, libre: [142, 186] }, libre: [[40, 96], [224, 300]] };
}

// qué oficina toca: o.variante ('paris' | 'estudio' | 'magnate'); si no se pide, la de París para o.lugar 'paris' o
// 'lluvia' y la del estudio para Hollywood (así dos productores distintos no comparten despacho)
const f_ofiVar = (o) => (o.lugar === 'lluvia' ? 'paris' : ['paris', 'estudio', 'magnate'].includes(o.variante) ? o.variante : o.lugar === 'paris' ? 'paris' : 'estudio');
// la geometría de las otras dos oficinas (el cristal de la ventana y lo que devuelven)
const f_OFI2 = {
  estudio: { cristal: [230, 56, 313, 94], ret: { ventana: [226, 52, 317, 99], estanteria: [0, 40, 51, 128], lampara: [58, 46, 100, 128], aparador: [228, 106, 316, 128], tele: [234, 88, 258, 105], carteles: [[110, 32], [148, 32], [186, 32]], libre: [[40, 96], [224, 300]] } },
  magnate: { cristal: [62, 26, 214, 96], ret: { ventana: [58, 22, 218, 101], puerta: [8, 36, 44, 127], fotos: [226, 28, 268, 84], cafetera: [230, 88, 260, 128], globo: [298, 84, 14], carteles: [], libre: [[40, 96], [224, 280]] } },
};
// las otras dos oficinas, lo que no se mueve. 'estudio': el despacho de un ejecutivo de estudio de los 70 (pared verde
// agua, arrimadero lacado en crema, moqueta mostaza de círculos; la librería a la IZQUIERDA, una lámpara de arco, los
// tres carteles (otros) en su sitio, y a la DERECHA una ventana apaisada y baja con su persiana, sobre un aparador con
// un televisor, un trofeo y la bandeja del bar). 'magnate': el despacho de un gran productor al caer la tarde (pared
// azul con raya fina dorada, arrimadero de caoba, suelo de mármol en damero; un ventanal de tres hojas detrás del
// escritorio con cortinas doradas, una puerta a la izquierda, y a la derecha seis fotos enmarcadas, la cafetera
// exprés cromada en su consola y un globo terráqueo de pie)
function f_oficina2Fijo(R, vari, lugar) {
  const { rect, pset, linea, poligono, disco } = R, est = vari === 'estudio', G = f_OFI2[vari], [vx0, vy0, vx1, vy1] = G.cristal;
  rect(0, 0, 319, 10, hex('#e4dcc8')); for (let x = 0; x < 320; x += 32) rect(x, 0, x, 10, hex('#d8cfb8')); rect(0, 5, 319, 5, hex('#dcd3bc')); for (let y = 0; y < 10; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 630) < 0.06) pset(x, y, hex('#d8cfb8'));
  const zoc = est ? [hex('#e2d8c0'), hex('#f6eedc'), hex('#c6ba9c'), hex('#9a8e72')] : [hex('#6e2e20'), hex('#8e4630'), hex('#521e14'), hex('#34100a')];
  rect(0, 11, 319, 13, zoc[est ? 0 : 2]); rect(0, 11, 319, 11, zoc[1]); rect(0, 13, 319, 13, zoc[3]);
  // la pared
  if (est) { const W = hex('#6f9a94'), WS = hex('#5e8680'), WL = hex('#84aca4'); for (let y = 14; y < 100; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 660); pset(x, y, v < 0.13 ? WS : v > 0.91 ? WL : x % 24 === 11 && y % 3 ? WS : y < 17 && (x + y) % 2 ? WS : W); } }
  else { const W = hex('#2c3a66'), WS = hex('#243056'), WL = hex('#3a4a7c'), oro = hex('#8a7440'); for (let y = 14; y < 100; y++) for (let x = 0; x < 320; x++) { const v = h(x, y >> 2, 661); pset(x, y, x % 16 === 7 ? (y % 4 === 3 ? WS : oro) : x % 16 === 15 ? WL : v < 0.1 ? WS : y < 17 && (x + y) % 2 ? WS : W); } }
  // el arrimadero con sus cuarterones y el rodapié
  rect(0, 100, 319, 127, zoc[0]); rect(0, 100, 319, 100, zoc[1]); rect(0, 101, 319, 102, zoc[2]); rect(0, 103, 319, 103, zoc[3]); if (!est) rect(0, 101, 319, 101, f_P.oroS);
  for (let x = 2; x < 320; x += 40) { f_bisel(R, x, 106, x + 35, 121, zoc[1], zoc[3]); rect(x + 2, 108, x + 33, 119, zoc[est ? 0 : 2]); for (let k = 0; k < 8; k++) { const xb = x + 4 + k * 4; for (let y = 109; y < 119; y++) if (h(k + x, y >> 2, 662) < (est ? 0.25 : 0.75)) pset(Math.round(xb + Math.sin(y * 0.3 + k + x) * 1), y, est ? zoc[2] : k % 3 ? zoc[3] : zoc[0]); } }
  rect(0, 123, 319, 127, zoc[3]); rect(0, 123, 319, 123, zoc[2]);
  // el suelo: moqueta mostaza de pelo con círculos (estudio) o mármol en damero que se abre hacia delante (magnate)
  if (est) for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 663), d = Math.hypot(((x + 28) % 56) - 28, ((((y - 128) * 2.2) + 28) % 56) - 28); let c = d > 19 && d < 22.5 ? hex('#8a6420') : d > 8 && d < 10.5 ? hex('#dcb458') : v < 0.2 ? hex('#a87c2c') : v > 0.86 ? hex('#cca048') : hex('#b88a34'); if (y < 133) c = f_mez(c, hex('#4a3a1a'), 0.45 - (y - 128) * 0.08); pset(x, y, c); }
  else { const FY = [128, 131, 135, 140, 146, 153, 161, 170, 180]; for (let r = 0; r < 8; r++) for (let y = FY[r]; y < FY[r + 1]; y++) { const w = 13 + (y - 128) * 0.42; for (let x = 0; x < 320; x++) { const ix = Math.floor((x - 160) / w + 50), bl = (ix + r) % 2 === 0, v = h(x, y, 664), ve = Math.sin(x * 0.21 + y * 0.6 + ix * 3) > 0.93;
      let c = bl ? (ve ? hex('#c4bcae') : v < 0.1 ? hex('#dcd4c4') : hex('#ece6d8')) : (ve ? hex('#4a4a58') : v < 0.1 ? hex('#34343e') : hex('#26262e')); if (y === FY[r]) c = f_mez(c, f_P.k, 0.35); if (y < 133) c = f_mez(c, hex('#14101a'), 0.4 - (y - 128) * 0.07); pset(x, y, c); } } }
  const lata = (x, y, w, c) => { rect(x, y, x + w, y + 3, f_P.k); rect(x + 1, y, x + w - 1, y + 2, f_P.metal); rect(x + 1, y, x + w - 1, y, f_P.metalL); rect(x + 3, y + 1, x + 7, y + 1, c); pset(x + w - 2, y + 1, f_P.metalD); };
  // el sillón del productor, detrás del escritorio (cuero naranja o verde botella)
  { const [c, cL, cS, cD] = est ? [hex('#c8742a'), hex('#e09448'), hex('#96501a'), hex('#5e300e')] : [hex('#2e5a44'), hex('#44785c'), hex('#1e3e2e'), hex('#10241a')];
    for (let y = 108; y <= 148; y++) { const m = y < 114 ? Math.round(Math.sqrt(Math.max(0, 1 - ((114 - y) / 6.5) ** 2)) * 14) : 14; rect(160 - m - 1, y, 160 + m + 1, y, f_P.k); rect(160 - m, y, 160 + m, y, y < 110 ? cL : c); pset(160 - m, y, cL); rect(160 + m - 2, y, 160 + m, y, cS); }
    if (est) for (let y = 116; y < 146; y += 6) rect(148, y, 172, y, cS); else for (let y = 114; y < 146; y += 7) for (let x = 151 + ((y / 7) % 2 | 0) * 4; x < 172; x += 8) { pset(x, y, cD); pset(x + 1, y - 1, cL); }
    rect(143, 134, 147, 146, f_P.k); rect(144, 135, 146, 146, est ? f_P.metal : cS); rect(173, 134, 177, 146, f_P.k); rect(174, 135, 176, 146, est ? f_P.metalS : cS); }
  if (est) {
    // la librería, a la izquierda: latas de película, dos trofeos, carpetas y una planta que cuelga
    rect(0, 40, 52, 128, f_P.k); rect(0, 41, 51, 127, f_P.nogalD); rect(0, 41, 51, 41, f_P.nogalL); rect(50, 41, 51, 127, f_P.nogal);
    for (const y of [60, 80, 100, 126]) { rect(0, y, 49, y + 1, f_P.nogal); rect(0, y, 49, y, f_P.nogalL); }
    for (let k = 0; k < 4; k++) lata(2 + (k % 2), 56 - k * 3, 15, f_mez(f_VIVOS[(k * 3 + 2) % 10], f_P.metalD, 0.3)); disco(34.5, 51.5, 7.5, f_P.k); disco(34.5, 51.5, 6.5, f_P.metal); disco(34.5, 51.5, 5, f_P.metalD); for (let k = 0; k < 3; k++) disco(34.5 + Math.cos(k * 2.09) * 3, 51.5 + Math.sin(k * 2.09) * 3, 1.3, f_P.nogalD); pset(34, 51, f_P.metalL);
    rect(6, 76, 12, 79, f_P.nogalS); rect(8, 72, 10, 75, f_P.oro); poligono([[5, 65], [14, 65], [12, 72], [7, 72]], f_P.oro); rect(6, 65, 13, 65, f_P.oroL); pset(4, 67, f_P.oroS); pset(15, 67, f_P.oroS);
    for (let k = 0; k < 4; k++) lata(22 + (k % 2), 76 - k * 3, 16, f_mez(f_VIVOS[(k * 2 + 5) % 10], f_P.metalD, 0.3)); rect(42, 68, 47, 79, hex('#d8dce4')); rect(42, 68, 42, 79, f_P.bl); rect(44, 71, 45, 73, hex('#d83a3a'));
    for (let x = 2; x < 48;) { const w = 3 + Math.floor(h(x, 1, 665) * 3), a = 11 + Math.floor(h(x, 2, 665) * 6), c = [hex('#c8643a'), hex('#3a6a8a'), hex('#e8c040'), hex('#6a8a4a'), hex('#8a4a6a')][Math.floor(h(x, 3, 665) * 5)]; rect(x, 100 - a, x + w - 1, 99, c); rect(x, 100 - a, x, 99, f_mez(c, f_P.bl, 0.3)); rect(x + 1, 100 - a + 2, x + w - 2, 100 - a + 3, f_P.papel); x += w + (h(x, 4, 665) < 0.2 ? 2 : 0); }
    for (let k = 0; k < 3; k++) { rect(4 + k * 15, 106 + (k % 2) * 2, 15 + k * 15, 125, f_P.k); rect(5 + k * 15, 107 + (k % 2) * 2, 14 + k * 15, 125, [hex('#b08a54'), hex('#8a9a6a'), hex('#b08a54')][k]); rect(7 + k * 15, 112, 12 + k * 15, 114, f_P.papel); }
    rect(20, 33, 34, 40, f_P.k); rect(21, 34, 33, 40, f_P.teja); rect(21, 34, 33, 34, hex('#e08a5a')); for (const [dx, L, k] of [[-6, 16, 0], [-1, 9, 1], [4, 20, 2], [10, 12, 3], [14, 7, 4]]) for (let i = 0; i < L; i++) { const x = 27 + dx + Math.round(Math.sin(i * 0.5 + k) * 1.5), y = 30 + i; if (y < 33 || x < 20 || x > 34) { pset(x, y, i % 3 ? f_P.verde : f_P.verdeS); if (i % 4 === 1) pset(x + 1, y, f_P.verdeL); } }
    // la lámpara de arco: base de mármol, el tubo cromado que se curva y la pantalla esférica
    rect(58, 124, 72, 128, f_P.k); rect(59, 125, 71, 127, hex('#d8d4cc')); rect(59, 125, 71, 125, f_P.bl); for (let i = 0; i <= 60; i++) { const u = i / 60, x = Math.round(65 + 30 * Math.sin(u * Math.PI / 2) ** 2.2), y = Math.round(124 - 78 * Math.sin(u * Math.PI / 2)); pset(x, y, f_P.metalL); pset(x + 1, y, f_P.metalS); }
    disco(95.5, 52.5, 6.5, f_P.k); disco(95.5, 52.5, 5.5, hex('#f4ecd0')); disco(94, 51, 2.4, f_P.bl); rect(91, 57, 100, 58, hex('#fff4c0'));
    for (let j = 0; j < 30; j++) for (let i = -4 - (j >> 1); i <= 5 + (j >> 1); i++) if ((i + j) % 2 === 0 && f_b4(95 + i, 59 + j) > j / 34) pset(95 + i, 59 + j, f_mez(R.pget(95 + i, 59 + j), hex('#fff0c0'), 0.22));
    [110, 148, 186].forEach((x, k) => f_cartel(R, x, 32, k + 3));
    // el reloj de rayos (las agujas, en f_oficina2) y el marco de la ventana apaisada con su alféizar
    for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6, r1 = k % 2 ? 9 : 12; linea(244 + Math.cos(an) * 5, 34 + Math.sin(an) * 5, 244 + Math.cos(an) * r1, 34 + Math.sin(an) * r1, k % 2 ? f_P.oroS : f_P.oro); } disco(244.5, 34.5, 5, f_P.k); disco(244.5, 34.5, 4, f_P.papel);
    rect(226, 52, 317, 97, f_P.k); rect(227, 53, 316, 96, hex('#e8e0cc')); rect(227, 53, 316, 53, f_P.bl); rect(229, 55, 314, 95, hex('#b8ae94'));
    R.recorte(G.cristal); f_oficinaFuera(R, lugar, vx0, vy0, vx1, vy1); R.recorte(null);
    rect(224, 97, 319, 99, f_P.k); rect(225, 97, 318, 98, f_P.bl);
    // el aparador de teca con sus puertas correderas y sus patas, y lo que tiene encima: el trofeo y la bandeja del bar
    rect(228, 106, 316, 124, f_P.k); rect(229, 107, 315, 123, hex('#b87a3e')); rect(229, 107, 315, 107, hex('#d89a56')); rect(229, 122, 315, 123, hex('#8a5626')); for (const x of [258, 287]) rect(x, 108, x, 122, hex('#6e441c')); for (const x of [244, 272, 301]) { disco(x, 115, 1.6, f_P.k); pset(x, 115, f_P.oro); }
    for (let y = 109; y < 122; y += 3) for (let x = 230; x < 315; x++) if (h(x >> 2, y, 666) < 0.35) pset(x, y, hex('#a06a32')); for (const x of [232, 311]) { rect(x, 124, x + 1, 128, f_P.k); } for (let x = 228; x < 318; x++) if (x % 2) pset(x, 129, hex('#6a4c14'));
    rect(267, 102, 275, 105, f_P.k); rect(268, 103, 274, 104, f_P.nogalS); rect(270, 97, 272, 102, f_P.oroS); poligono([[271, 86], [273, 91], [277, 92], [274, 95], [271, 99], [268, 95], [265, 92], [269, 91]], f_P.oro); pset(271, 91, f_P.oroL);
    rect(286, 104, 310, 105, f_P.k); rect(287, 104, 309, 104, f_P.metalL); rect(289, 94, 294, 103, f_P.k); rect(290, 95, 293, 103, hex('#c8843a')); rect(290, 95, 290, 103, hex('#f0c080')); rect(291, 91, 292, 94, f_P.k); pset(291, 90, f_P.oro); for (const x of [298, 303]) { rect(x, 99, x + 3, 103, hex('#bfe8ff')); pset(x, 99, f_P.bl); rect(x, 102, x + 3, 103, hex('#d8a040')); }
    f_haz(R, [[236, 128], [304, 128], [262, 178], [170, 178]], hex('#fff0c0'), 0.2);
  } else {
    // la puerta de caoba de la izquierda (cuarterones, pomo de latón, su marco) y un perchero con un sombrero
    rect(6, 34, 46, 127, f_P.k); rect(7, 35, 45, 127, zoc[2]); rect(7, 35, 45, 36, zoc[1]); rect(10, 38, 42, 127, zoc[0]); rect(10, 38, 10, 127, zoc[1]); for (const [ya, yb] of [[42, 70], [75, 98], [103, 123]]) { f_bisel(R, 14, ya, 38, yb, zoc[1], zoc[3]); rect(16, ya + 2, 36, yb - 2, zoc[2]); for (let y = ya + 3; y < yb - 2; y += 2) for (let x = 17; x < 36; x++) if (h(x >> 2, y, 667) < 0.3) pset(x, y, zoc[0]); }
    disco(39, 86, 1.8, f_P.k); pset(39, 86, f_P.oro); pset(38, 85, f_P.oroL); for (let x = 5; x < 48; x++) if (x % 2) pset(x, 128, hex('#14101a'));
    rect(51, 70, 52, 127, f_P.k); rect(51, 70, 51, 127, f_P.nogalL); rect(47, 126, 56, 128, f_P.k); for (const dx of [-3, 3]) linea(51, 74, 51 + dx, 70, f_P.nogalL); rect(47, 64, 56, 67, f_P.k); rect(48, 65, 55, 66, hex('#8a7a5a')); rect(45, 68, 58, 68, f_P.k); rect(48, 66, 55, 66, hex('#5a3a2a'));
    // el ventanal de tres hojas detrás del escritorio: lo de fuera, con la luz naranja de la tarde, y las cortinas doradas
    rect(58, 22, 218, 99, f_P.k); rect(59, 23, 217, 98, zoc[0]); rect(59, 23, 217, 23, zoc[1]); rect(61, 25, 215, 97, zoc[3]);
    R.recorte(G.cristal); f_oficinaFuera(R, lugar, vx0, vy0, vx1, vy1); R.recorte(null);
    for (let y = vy0; y <= vy1; y++) for (let x = vx0; x <= vx1; x++) pset(x, y, f_mez(R.pget(x, y), y < vy0 + 34 ? hex('#f0843a') : hex('#b84a4a'), 0.34 - (y - vy0) * 0.002 + (f_b4(x, y) - 0.5) * 0.08));
    for (const s of [0, 1]) for (let d = 0; d < 15; d++) { const x = s ? 214 - d : 62 + d; for (let y = 26; y <= 96; y++) { if (y > 70 && d > 8 + (96 - y) * 0.2) continue; pset(x, y, d === 14 || (y > 70 && d >= 8 + (96 - y) * 0.2 - 1) ? f_P.oroD : d % 5 === 0 ? f_P.oroD : d % 5 === 2 ? f_P.oroL : d % 5 === 3 ? f_P.oro : f_P.oroS); } rect(s ? 206 : 62, 69, s ? 214 : 70, 70, f_P.vino); }
    rect(60, 24, 216, 27, f_P.k); rect(61, 25, 215, 26, f_P.oro); rect(61, 25, 215, 25, f_P.oroL); rect(56, 99, 220, 101, f_P.k); rect(57, 99, 219, 100, zoc[1]);
    f_haz(R, [[84, 128], [196, 128], [248, 178], [104, 178]], hex('#ffb060'), 0.2); f_haz(R, [[118, 128], [140, 128], [166, 178], [128, 178]], hex('#fff0c0'), 0.12, 2);
    // seis fotos enmarcadas (pictogramas, sin caras): estrella, monte, palmera, sol, rollo y claqueta
    for (let k = 0; k < 6; k++) { const x = 226 + (k % 2) * 22, y = 28 + (k >> 1) * 19; rect(x, y, x + 19, y + 15, f_P.k); rect(x + 1, y + 1, x + 18, y + 14, k % 3 === 1 ? f_P.oro : f_P.nogal); rect(x + 3, y + 3, x + 16, y + 12, [hex('#d8c8a8'), hex('#a8c0d0'), hex('#e8d0a0'), hex('#c8d8c0'), hex('#d8c0c8'), hex('#c8c8d8')][k]); const cx = x + 10, cy = y + 8;
      if (k === 0) { poligono([[cx, cy - 4], [cx + 1, cy - 1], [cx + 4, cy - 1], [cx + 2, cy + 1], [cx + 3, cy + 4], [cx, cy + 2], [cx - 3, cy + 4], [cx - 2, cy + 1], [cx - 4, cy - 1], [cx - 1, cy - 1]], hex('#a87820')); }
      else if (k === 1) { poligono([[x + 3, y + 13], [cx - 2, cy - 3], [cx + 1, cy + 1], [cx + 3, cy - 1], [x + 17, y + 13]], hex('#4a6a8a')); pset(cx - 2, cy - 3, f_P.bl); pset(cx - 2, cy - 2, f_P.bl); }
      else if (k === 2) { rect(cx, cy - 1, cx, y + 12, hex('#6a4a2a')); for (const [dx, dy] of [[-4, 0], [-3, -3], [0, -4], [3, -3], [4, 0]]) linea(cx, cy - 2, cx + dx, cy - 2 + dy, hex('#3a7a3a')); }
      else if (k === 3) { disco(cx, cy + 1, 3.4, hex('#e87a2a')); rect(x + 3, cy + 3, x + 16, y + 12, hex('#8a6a9a')); }
      else if (k === 4) { disco(cx, cy, 4.4, f_P.k); disco(cx, cy, 3.2, f_P.metal); pset(cx, cy, f_P.k); pset(cx - 2, cy, f_P.k); pset(cx + 2, cy, f_P.k); pset(cx, cy - 2, f_P.k); pset(cx, cy + 2, f_P.k); }
      else { rect(cx - 4, cy - 1, cx + 4, cy + 3, f_P.k); rect(cx - 3, cy, cx + 3, cy + 2, f_P.bl); for (let i = -4; i <= 4; i++) pset(cx + i, cy - 2 - (i + 4 >> 2), (i + 4) % 3 ? f_P.k : f_P.bl); } }
    // la consola con la cafetera exprés cromada (su vapor, en f_oficina2) y dos tacitas
    rect(228, 108, 264, 111, f_P.k); rect(229, 108, 263, 109, zoc[1]); rect(229, 110, 263, 110, zoc[2]); for (const x of [231, 259]) { rect(x, 111, x + 2, 128, f_P.k); rect(x + 1, 111, x + 1, 127, zoc[0]); } rect(233, 118, 259, 119, zoc[2]); for (let x = 228; x < 266; x++) if (x % 2) pset(x, 129, hex('#14101a'));
    rect(234, 90, 252, 107, f_P.k); rect(235, 91, 251, 106, f_P.metal); rect(235, 91, 251, 92, f_P.metalL); rect(249, 93, 251, 106, f_P.metalS); rect(237, 94, 247, 97, f_P.metalD); pset(238, 95, hex('#ff4a3a')); pset(241, 95, f_P.verdeL); rect(239, 99, 240, 102, f_P.k); rect(244, 99, 245, 102, f_P.k); rect(237, 103, 248, 104, f_P.metalD); rect(238, 87, 248, 90, f_P.k); rect(239, 88, 247, 89, f_P.oro); rect(232, 96, 234, 97, f_P.k);
    for (const x of [255, 260]) { rect(x, 105, x + 3, 107, f_P.bl); pset(x + 4, 106, f_P.bl); rect(x, 105, x + 3, 105, hex('#5a3a2a')); }
    // el globo terráqueo de pie (los meridianos giran en f_oficina2): peana de caoba y aro de latón
    rect(290, 124, 306, 128, f_P.k); rect(291, 125, 305, 127, zoc[0]); rect(291, 125, 305, 125, zoc[1]); rect(297, 100, 299, 124, f_P.k); rect(298, 100, 298, 124, f_P.oro); for (let x = 288; x < 310; x++) if (x % 2) pset(x, 129, hex('#14101a'));
    for (let an = -0.4; an < Math.PI + 0.4; an += 0.05) { const x = Math.round(298 + Math.cos(an - 0.3) * 16.4), y = Math.round(84 + Math.sin(an - 0.3) * 16.4); pset(x, y, f_P.oro); pset(x + 1, y, f_P.oroS); }
  }
  // la esquina de Atom, tranquila
  f_calmar(R, 272, 14, 319, 49, est ? 0.6 : 0.8);
}
// las otras dos oficinas, enteras: lo fijo y su vida (lo de fuera, el reloj, el televisor, el vapor, el globo, el polvo)
function f_oficina2(R, t, o, vari) {
  const { rect, pset, linea, disco } = R, est = vari === 'estudio', lugar = o.lugar === 'paris' ? 'paris' : 'hollywood', G = f_OFI2[vari], [vx0, vy0, vx1, vy1] = G.cristal;
  R.copiar(f_capa(R, 'oficina2-' + vari + '-' + lugar, () => f_oficina2Fijo(R, vari, lugar)));
  if (est) {
    R.recorte(G.cristal); f_oficinaFueraVivo(R, t, lugar, vx0, vy0, vx1, vy1); R.recorte(null);
    // los dos parteluces, la persiana a medio bajar (sus lamas y su cordón) y el brillo del cristal
    for (const x of [258, 286]) { rect(x, vy0, x + 1, vy1, hex('#e8e0cc')); rect(x + 1, vy0, x + 1, vy1, hex('#b8ae94')); }
    for (let y = vy0; y < vy0 + 8; y += 2) { rect(vx0, y, vx1, y, hex('#f4ecd8')); rect(vx0, y + 1, vx1, y + 1, hex('#b8ae94')); } rect(311, vy0 + 8, 311, vy0 + 22, hex('#d8d0bc')); pset(311, vy0 + 23, f_P.oro);
    for (let i = 0; i < 12; i++) for (const [bx, by] of [[236, 70], [241, 70], [292, 72]]) { const x = bx + i, y = by + i * 2; if (y <= vy1 && x !== 258 && x !== 259 && x !== 286 && x !== 287) pset(x, y, f_mez(R.pget(x, y), f_P.bl, 0.3)); }
    // el reloj de rayos y el televisor del aparador: barras de colores que saltan, la antena y el piloto
    { const sa = t * Math.PI / 2.5 - Math.PI / 2; linea(244, 34, 244 + Math.cos(-0.9) * 2, 34 + Math.sin(-0.9) * 2, f_P.k); linea(244, 34, 244 + Math.cos(0.7) * 3, 34 + Math.sin(0.7) * 3, f_P.k); pset(Math.round(244 + Math.cos(sa) * 3), Math.round(34 + Math.sin(sa) * 3), hex('#d83a3a')); }
    rect(234, 88, 258, 105, f_P.k); rect(235, 89, 257, 104, hex('#e8e0cc')); rect(235, 89, 257, 89, f_P.bl); rect(254, 90, 257, 104, hex('#c8bea4')); rect(236, 90, 252, 103, f_P.k); linea(244, 88, 239, 80, f_P.metalS); linea(247, 88, 253, 81, f_P.metalS); pset(255, 92, hex('#8a8068')); pset(255, 95, hex('#8a8068')); pset(255, 101, Math.floor(t * 2) % 2 ? hex('#ff4a3a') : hex('#8a2a2a'));
    { const salto = Math.floor(t * 0.9) % 5 === 4, B = [f_P.bl, hex('#f4d23a'), hex('#2ec4c4'), hex('#4ac84a'), hex('#e83a8a'), hex('#d8343a'), hex('#2a6ae0')]; for (let i = 0; i < 15; i++) for (let y = 91; y <= 102; y++) pset(237 + i, y, y > 99 ? (i % 4 < 2 ? hex('#2a2a3a') : hex('#8a8698')) : salto && (y + Math.floor(t * 30)) % 5 === 0 ? f_P.bl : B[Math.min(6, (i + (salto ? 1 : 0)) >> 1) % 7]); const ly = 91 + Math.floor((t * 9) % 12); for (let i = 0; i < 15; i++) pset(237 + i, ly, f_mez(R.pget(237 + i, ly), f_P.bl, 0.35)); }
    // la luz de la lámpara de arco (tiembla un punto) y las motas de polvo en el sol de la ventana
    if (Math.sin(t * 9) > -0.95) { pset(93, 58, f_P.bl); pset(98, 58, f_P.bl); }
    for (let k = 0; k < 12; k++) { const u = (h(k, 1, 640) + t * (0.02 + h(k, 2, 640) * 0.03)) % 1, y = 100 + Math.round(u * 60), x = Math.round(288 - h(k, 3, 640) * 60 - (y - 100) * 0.5 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 2 + k * 1.9) > 0.1) pset(x, y, f_mez(R.pget(x, y), hex('#fff6d0'), 0.6)); }
  } else {
    R.recorte(G.cristal); f_oficinaFueraVivo(R, t, lugar, vx0, vy0, vx1, vy1);
    // el sol bajo, que se pone tras las colinas
    { const sx = 92, sy = vy0 + 30 + Math.round(t * 0.15); for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d < 7.5 && f_b4(sx + i, sy + j) > d / 9) pset(sx + i, sy + j, f_mez(R.pget(sx + i, sy + j), hex('#fff0a0'), d < 4 ? 0.8 : 0.4)); } }
    R.recorte(null);
    // los dos parteluces, el travesaño, las cortinas que tapan lo de fuera y el brillo del cristal
    for (const x of [112, 163]) { rect(x, vy0, x + 2, vy1, hex('#34100a')); rect(x + 1, vy0, x + 1, vy1, hex('#6e2e20')); } rect(vx0, 44, vx1, 45, hex('#34100a')); rect(vx0, 44, vx1, 44, hex('#6e2e20'));
    for (const s of [0, 1]) for (let d = 0; d < 15; d++) { const x = s ? 214 - d : 62 + d, sw = Math.round(Math.sin(t * 0.8 + s * 2) * 0.6); for (let y = 28; y <= 96; y++) { if (y > 70 && d > 8 + (96 - y) * 0.2 + sw) continue; pset(x, y, d === 14 ? f_P.oroD : d % 5 === 0 ? f_P.oroD : d % 5 === 2 ? f_P.oroL : d % 5 === 3 ? f_P.oro : f_P.oroS); } rect(s ? 206 : 62, 69, s ? 214 : 70, 70, f_P.vino); pset(s ? 206 : 70, 71, f_P.oroL); }
    for (let i = 0; i < 18; i++) for (const [bx, by] of [[82, 48], [88, 48], [174, 50]]) { const x = bx + i, y = by + i * 2; if (y <= vy1 && (x < 112 || x > 114) && (x < 163 || x > 165)) pset(x, y, f_mez(R.pget(x, y), f_P.bl, 0.22)); }
    // el vapor de la cafetera y su piloto; el globo que gira despacio (meridianos y manchas de tierra que corren)
    for (let k = 0; k < 7; k++) { const u = (t * 0.45 + k / 7) % 1, x = Math.round(243 + Math.sin(u * 6 + k * 2) * (1 + u * 3)), y = Math.round(86 - u * 16); if (u < 0.9 && (k + Math.floor(t * 4)) % 3) { pset(x, y, f_mez(R.pget(x, y), f_P.bl, 0.7 - u * 0.6)); if (u > 0.3) pset(x + 1, y, f_mez(R.pget(x + 1, y), f_P.bl, 0.4 - u * 0.3)); } }
    pset(238, 95, Math.floor(t * 1.5) % 2 ? hex('#ff4a3a') : hex('#8a2a2a'));
    { const cx = 298, cy = 84, r = 14, g = t * 0.5; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = i * i + j * j; if (d2 > r * r + 3) continue; if (d2 > (r - 1) * (r - 1)) { pset(cx + i, cy + j, f_P.k); continue; } const z = Math.sqrt(r * r - d2), lon = Math.atan2(i, z) + g, lat = Math.asin(j / r), tierra = Math.sin(lon * 2 + Math.sin(lat * 3) * 1.2) + Math.cos(lat * 4 + lon) * 0.7 > 0.75, mer = Math.abs(Math.sin(lon * 3)) < 0.07 || Math.abs(Math.sin(lat * 3)) < 0.06;
        let c = tierra ? (h(i + Math.floor(g * 4), j, 668) < 0.3 ? hex('#c8a85a') : hex('#8aa85a')) : mer ? hex('#8ab8d8') : hex('#4a86b8'); if (i + j > 9) c = f_mez(c, f_P.k, 0.3); else if (i + j < -13) c = f_mez(c, f_P.bl, 0.35); pset(cx + i, cy + j, c); } pset(cx - 5, cy - 7, f_P.bl); pset(cx - 6, cy - 6, f_P.bl); }
    // las motas de polvo en el sol de la tarde
    for (let k = 0; k < 12; k++) { const u = (h(k, 1, 640) + t * (0.02 + h(k, 2, 640) * 0.03)) % 1, y = 100 + Math.round(u * 60), x = Math.round(90 + h(k, 3, 640) * 110 + (y - 100) * 0.3 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 2 + k * 1.9) > 0.1) pset(x, y, f_mez(R.pget(x, y), hex('#ffe0a0'), 0.6)); }
  }
  return { suelo: 158, sueloTrasMesa: 147, variante: vari, sillon: [146, 108, 174, 148], mesa: { x0: 98, x1: 222, y: 143, frente: 150, libre: [142, 186] }, ...G.ret };
}

// el escritorio del productor, por delante de los personajes (ver la cabecera de cineDelante)
function f_oficinaDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, noche = o.lugar === 'lluvia', S = (c) => (noche ? f_mez(c, hex('#161a40'), 0.3) : c), vari = f_ofiVar(o);
  // la madera del escritorio cambia con la oficina: caoba (París), teca clara (estudio) o ébano con filete dorado (magnate)
  const M = vari === 'estudio' ? ['#b87a3e', '#d89a56', '#96602c', '#6e441c'] : vari === 'magnate' ? ['#3a3238', '#5a4e54', '#28222a', '#16121a'] : ['#7a3a26', '#9a5236', '#5a2618', '#3a160e'];
  const cao = S(hex(M[0])), caoL = S(hex(M[1])), caoS = S(hex(M[2])), caoD = S(hex(M[3]));
  // la sombra en la moqueta, el frente con cuarterones y pilastras, el filete de latón y el tablero con su veta y su brillo
  for (let y = 172; y < 179; y++) for (let x = 94; x < 228; x++) if ((x + y) % 2 === 0 || y < 176) pset(x, y, f_mez(R.pget(x, y), f_P.k, 0.35));
  rect(99, 150, 221, 175, f_P.k); rect(100, 151, 220, 174, cao); rect(100, 151, 220, 151, S(f_P.oroS)); rect(100, 152, 220, 152, caoL); rect(100, 172, 220, 174, caoD);
  for (const [xa, xb] of [[106, 140], [144, 176], [180, 214]]) { f_bisel(R, xa, 155, xb, 169, caoL, caoD); rect(xa + 2, 157, xb - 2, 167, caoS); for (let k = 0; k < (xb - xa - 4) / 4; k++) { const xv = xa + 4 + k * 4; for (let y = 158; y < 167; y++) if (h(k + xa, y >> 2, 650) < 0.7) pset(Math.round(xv + Math.sin(y * 0.4 + k) * 1), y, cao); } if (xa !== 144) { disco(xa + (xb - xa) / 2, 162, 1.4, S(f_P.oro)); } }
  for (const x of [101, 141, 177, 216]) { rect(x, 154, x + 3, 171, caoS); rect(x + 1, 154, x + 1, 171, caoL); }
  poligono([[103, 142], [217, 142], [224, 151], [96, 151]], f_P.k); poligono([[104, 143], [216, 143], [222, 150], [98, 150]], caoL);
  const brillo = Math.round(((t * 22) % 260) - 60);
  for (let y = 144; y <= 149; y++) { const xa = Math.round(104 - (y - 143) * 0.86), xb = Math.round(216 + (y - 143) * 0.86); for (let x = xa + 1; x < xb; x++) { if (h(x >> 3, y, 651) < 0.22 && h(x, y, 652) < 0.85) pset(x, y, cao); } for (let x = 100 + brillo - (y - 143) * 2; x < 100 + brillo - (y - 143) * 2 + 5; x++) if (x > xa && x < xb) pset(x, y, S(hex('#c07a48'))); }
  // el montón de contratos (con su clip y su sello), el teléfono de teclas que parpadean y el péndulo de Newton
  for (let k = 0; k < 5; k++) { const y = 143 - k * 1, x = 106 + (k % 2); poligono([[x, y], [x + 17, y], [x + 19, y + 4], [x + 2, y + 4]], k === 4 ? S(f_P.bl) : S(f_P.papelS)); if (k === 4) { for (let i = 0; i < 3; i++) rect(x + 4, y + 1 + i, x + 13 - i * 2, y + 1 + i, S(hex('#8a8698'))); disco(x + 15, y + 3, 1.3, S(hex('#d83a3a'))); pset(x + 2, y, f_P.metalL); pset(x + 3, y, f_P.metalD); } }
  rect(127, 141, 141, 147, f_P.k); rect(128, 142, 140, 146, S(hex('#d8ceb4'))); rect(128, 142, 140, 142, S(f_P.bl)); rect(126, 138, 142, 140, f_P.k); rect(127, 139, 141, 139, S(hex('#e8dec4'))); pset(127, 141, f_P.k); pset(141, 141, f_P.k);
  for (let i = 0; i < 4; i++) pset(130 + i * 3, 145, Math.floor(t * 2.5 + i * 1.7) % 4 === 0 ? hex('#ffb040') : i === 1 && Math.floor(t * 4) % 2 ? hex('#ff4a3a') : S(hex('#8a8068'))); for (let i = 0; i < 4; i++) pset(130 + i * 3, 143, S(hex('#a89e84')));
  for (let y = 147; y < 150; y++) pset(125 - (y - 147) + Math.round(Math.sin(y * 2)), y, f_P.k);
  { const x0 = 190, a = Math.sin(t * 4.2), izq = a < 0 ? Math.round(a * 3.5) : 0, der = a > 0 ? Math.round(a * 3.5) : 0; rect(x0 - 2, 147, x0 + 12, 148, f_P.k); rect(x0 - 1, 147, x0 + 11, 147, S(f_P.nogal)); rect(x0 - 1, 134, x0 - 1, 147, S(f_P.metalS)); rect(x0 + 11, 134, x0 + 11, 147, S(f_P.metalS)); rect(x0 - 1, 134, x0 + 11, 134, S(f_P.metalL));
    for (let b = 0; b < 5; b++) { const dx = b === 0 ? izq : b === 4 ? der : 0, dy = dx ? -Math.round(Math.abs(dx) / 2.2) : 0, bx = x0 + 1 + b * 2 + dx; linea(x0 + 1 + b * 2, 135, bx, 142 + dy, S(hex('#b8b4c0'))); rect(bx, 143 + dy, bx + 1, 144 + dy, S(f_P.metalL)); pset(bx + 1, 144 + dy, S(f_P.metalD)); } }
  // la placa de sobremesa (sin letras) y la lámpara de banquero, encendida
  rect(150, 147, 170, 149, f_P.k); rect(151, 147, 169, 148, S(f_P.oro)); rect(151, 147, 169, 147, S(f_P.oroL)); rect(154, 148, 166, 148, S(f_P.oroD));
  { const fl = Math.sin(t * 11) > -0.96 ? 1 : 0.6; f_haz(R, [[197, 138], [213, 138], [221, 150], [189, 150]], hex('#fff0a0'), 0.3 * fl); f_haz(R, [[200, 133], [210, 133], [213, 138], [197, 138]], hex('#fff0a0'), 0.2 * fl, 2);
    rect(201, 146, 209, 148, f_P.k); rect(202, 146, 208, 147, f_P.oro); rect(204, 134, 205, 146, f_P.oroS); rect(204, 134, 204, 146, f_P.oroL); rect(197, 128, 213, 133, f_P.k); rect(198, 129, 212, 132, hex('#2a8a5a')); rect(198, 129, 212, 129, hex('#5ac88a')); rect(199, 133, 211, 133, f_mez(hex('#8a7a40'), hex('#fff8c0'), fl)); pset(206, 135, f_P.oro); pset(206, 136, f_P.oroS);
    if (noche) for (let j = -9; j <= 9; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i / 16, j / 9), x = 205 + i, y = 134 + j; if (g > 0 && g * fl > f_b4(x, y) * 1.1 && (y < 128 || y > 133)) pset(x, y, f_mez(R.pget(x, y), hex('#ffe890'), 0.22 * g)); } }
  return { mesa: { x0: 98, x1: 222, y: 143, frente: 150, libre: [142, 186] } };
}

// un color de '#rrggbb' con memoria (para no convertirlo en cada fotograma)
const G_HX = new Map();

const g_hex = (s) => { let v = G_HX.get(s); if (v === undefined) { v = hex(s); G_HX.set(s, v); } return v; };

// el umbral de la trama ordenada 4 × 4 (0–1), para degradados y halos tramados
const G_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const g_b4 = (x, y) => (G_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const g_mez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo; luz(x, y) suma pasos de la rampa
function g_deg(R, x0, y0, x1, y1, cols, luz = null, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = ((y - y0) / alto) ** curva * n;
    for (let x = x0; x <= x1; x++) { let v = luz ? base + luz(x, y) : base; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > g_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}

// vapor en bocanadas que suben y se deshacen (x, y: la boca)
function g_vapor(R, x, y, t, k = 0, col = C.blanco, alto = 18) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = 1.6 + u * 3.4, cx = x + u * alto * 0.45 + Math.sin(u * 6 + k + t * 0.7) * 1.2, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (d < 0.7 && u < 0.6) R.pset(xx, yy, col); else if (g_b4(xx, yy) < (1.1 - u) * (1.3 - d)) R.pset(xx, yy, col); } }
}

// una cabeza del público vista de espaldas (centro x, y; radio 8 con el contorno): tipo 0 pelo corto, 1 calvo, 2 moño,
// 3 coleta, 4 rizos, 5 gorra; pelo = [luz, sombra]; borde: la luz que le llega por arriba y deja un filo
function g_cabeza(R, x, y, tipo, pelo, piel, borde) {
  const { disco, pset, rect } = R, [pl, ps] = pelo, nuca = (dy, c) => { for (let i = -6; i <= 6; i++) pset(x + i, y + Math.round(Math.sqrt(49 - i * i)) - dy, c); };
  rect(x - 2, y + 6, x + 2, y + 9, g_mez(piel, C.k, 0.35));
  if (tipo === 4) { for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * 6), y + Math.round(Math.sin(a * 0.785) * 6), 3, C.k); disco(x, y, 8, C.k); for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * 6), y + Math.round(Math.sin(a * 0.785) * 6), 2, ps); disco(x, y, 7, ps); disco(x - 1, y - 2, 4, pl); for (let a = 0; a < 5; a++) pset(x - 4 + a * 2, y - 8 + (a % 2), borde); return; }
  disco(x, y, 8, C.k);
  if (tipo === 1) { disco(x, y, 7, piel); disco(x - 1, y - 2, 4, g_mez(piel, C.blanco, 0.15)); pset(x - 3, y - 4, g_mez(piel, C.blanco, 0.6)); nuca(1, pl); nuca(2, ps); nuca(3, ps); }
  else if (tipo === 5) { const g = (x & 1) ? g_hex('#b8343a') : g_hex('#2e4a8a'); disco(x, y, 7, g_mez(g, C.k, 0.3)); disco(x, y - 1, 6, g); disco(x - 1, y - 3, 3, g_mez(g, C.blanco, 0.25)); nuca(1, ps); nuca(2, ps); rect(x - 1, y + 3, x + 1, y + 4, ps); pset(x, y - 7, g_mez(g, C.k, 0.4)); }
  else { disco(x, y, 7, ps); disco(x - 1, y - 1, 5, pl); for (let i = -3; i <= 3; i += 2) pset(x + i, y + 4 + (i & 2 ? 1 : 0), g_mez(ps, C.k, 0.3)); }
  if (tipo === 2) { disco(x, y - 8, 3, C.k); disco(x, y - 8, 2, pl); pset(x - 1, y - 9, borde); }
  if (tipo === 3) { rect(x - 2, y + 6, x + 2, y + 15, C.k); rect(x - 1, y + 6, x + 1, y + 14, ps); rect(x - 1, y + 9, x - 1, y + 13, pl); rect(x - 1, y + 7, x + 1, y + 7, g_hex('#c83a5a')); }
  pset(x - 8, y + 1, piel); pset(x + 8, y + 1, piel); pset(x - 8, y + 2, g_mez(piel, C.k, 0.3)); pset(x + 8, y + 2, g_mez(piel, C.k, 0.3));
  for (let i = -4; i <= 4; i++) pset(x + i, y - Math.round(Math.sqrt(49 - i * i)), Math.abs(i) < 4 ? borde : g_mez(borde, pl, 0.5));
}

const G_PELOS = [['#2a2430', '#1a1420'], ['#5a3a20', '#3a2414'], ['#8a5a2a', '#5a3a1a'], ['#c8a060', '#8a6a3a'], ['#1e1a24', '#100c14'], ['#8a8a98', '#5e5e6c']];

const G_PIELES = ['#e8c09a', '#c8885a', '#8a5a3a', '#f0c8a0'];

// un fondo fijo: se pinta una vez en su búfer (por clave) y se devuelve para copiarlo
const G_CAPAS = new Map();

function g_capa(R, clave, dibuja) { let b = G_CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); G_CAPAS.set(clave, b); } return b; }

// los extras del episodio (gente de la cola, del público y empleados), los que existan en el reparto
// según el sitio: 'sala' (público de cine sin gorros de lana ni cintas), 'calle' (la cola de hoy, abrigada) u 'oficina' (empleados)
const G_GENTE = { sala: ['lector1DU', 'lector2DU', 'estudiante2DU', 'lector3DU', 'estudiante3DU'], calle: ['lector1DU', 'voluntario2DU', 'lector2DU', 'estudiante2DU', 'lector3DU', 'voluntario1DU', 'estudiante3DU'], oficina: ['lector1DU', 'lector2DU', 'lector3DU'] };

const g_gente = (sitio = 'sala') => G_GENTE[sitio].map((n) => ELENCO_CHIBI[n]).filter(Boolean);

// la paleta y los rasgos de la fachada del cine en cada época (1984, 2021, 2026)
const G_EP = {
  1984: { cielo: ['#0e1236', '#161c4a', '#22265e', '#3a3070', '#5a3a78', '#844678'], lejos: '#3a3462', lejosL: '#50467a', cerca: '#28223f', vent: '#f0c870', pared: '#7c2a34', paredS: '#66202a', paredL: '#a03e46', zoc: '#221c2a', zocL: '#4c4460', marq: '#f2e2b4', marqS: '#d6c28c', trazo: '#2a2230', trazo2: '#c8343a', luz: '#fff2c0', luzM: '#e8b840', luzS: '#a07a30', neon: '#ff6aa8', neonL: '#ffd6ea', neonS: '#b8406a', acera: '#5e5870', aceraS: '#4e4860', aceraL: '#7e6a78', calz: '#2a2838', calzL: '#36344c', vest: ['#f8d890', '#f0c478', '#a83a3a'], precio: '4' },
  2021: { cielo: ['#081428', '#0c1c38', '#12284a', '#1a3660', '#284872', '#3a5a84'], lejos: '#22344e', lejosL: '#34486a', cerca: '#162238', vent: '#cfe4f8', pared: '#3a4052', paredS: '#2e3344', paredL: '#4e566c', zoc: '#1a1c26', zocL: '#3e4456', marq: '#f2f6fa', marqS: '#c4ced8', trazo: '#1c2030', trazo2: '#d06a2a', luz: '#ffffff', luzM: '#cfe0f4', luzS: '#8a9ab4', neon: '#f0a840', neonL: '#fff0c8', neonS: '#a8702a', acera: '#565c6e', aceraS: '#464c5e', aceraL: '#74788a', calz: '#22252f', calzL: '#30343f', vest: ['#f4ead8', '#e6d4b8', '#4a5a7a'], precio: '12' },
  2026: { cielo: ['#0a0e24', '#0e1432', '#141c44', '#1c2656', '#283268', '#384078'], lejos: '#262e52', lejosL: '#38426c', cerca: '#161c36', vent: '#a8e8e0', pared: '#1e2c3c', paredS: '#16222f', paredL: '#2e4458', zoc: '#0e141c', zocL: '#2c3a4a', marq: '#10141c', marqS: '#080a10', trazo: '#f0a840', trazo2: '#40e0d0', luz: '#d8fff8', luzM: '#40e0d0', luzS: '#1e7a78', neon: '#40e0d0', neonL: '#d8fff8', neonS: '#1e8a88', acera: '#5a6274', aceraS: '#4a5264', aceraL: '#8a94a8', calz: '#20242e', calzL: '#2e3440', vest: ['#e8f0f0', '#c8dcdc', '#2a5a6a'], precio: '15' },
};

const G_EPC = new Map();

const g_ep = (ep) => { if (!G_EPC.has(ep)) { const P = {}; for (const [k, v] of Object.entries(G_EP[ep])) P[k] = Array.isArray(v) ? v.map(g_hex) : k === 'precio' ? v : g_hex(v); G_EPC.set(ep, P); } return G_EPC.get(ep); };

// las vitrinas de los carteles (x0, x1; y 72–122), las puertas (y 72–131) y las pilastras de luz de la fachada
const G_VIT = [[48, 74], [80, 106], [240, 266]], G_PUERTAS = [114, 150], G_PIL = [42, 109, 186, 235, 273];

// un cartel de cine sin letras en [x0, x1] × [y0, y1]: con n lunas (1–3), NUESTRO planeta (cielo, n discos de luna y
// dos dunas); con n = 0, un cartel abstracto distinto según k (aros, rayas o arcos); abajo, la franja de créditos en trazos
function g_cartel(R, x0, y0, x1, y1, n, k) {
  const { rect, pset, disco, linea } = R, w = x1 - x0, cx = (x0 + x1) >> 1;
  if (n > 0) {
    g_deg(R, x0, y0, x1, y1 - 8, ['#141a44', '#2a2a68', '#5e3a7a', '#b8587a', '#f0a060', '#f8cc88'].map(g_hex), null, 1.2);
    for (let i = 0; i < 9; i++) pset(x0 + 1 + Math.floor(h(i, k, 341) * (w - 1)), y0 + 1 + Math.floor(h(i, k, 342) * 14), g_hex('#c8c0e8'));
    for (let i = 0; i < n; i++) { const mx = cx + Math.round((i - (n - 1) / 2) * 8), my = y0 + 8 + (i % 2) * 3 + (n === 1 ? 2 : 0), r = n === 1 ? 5 : i === 0 ? 4 : 3; disco(mx, my, r, g_hex('#f6ecd0')); disco(mx - 1, my - 1, r - 2, g_hex('#fffbe8')); pset(mx + 1, my + 1, g_hex('#d8c8a0')); }
    for (let x = x0; x <= x1; x++) { const d1 = y1 - 21 + Math.round(Math.sin((x - x0) * 0.22 + k) * 3 + (x - x0) * 0.15), d2 = y1 - 13 + Math.round(Math.sin((x - x0) * 0.3 + 2 + k) * 2 - (x - x0) * 0.1);
      for (let y = d1; y <= y1 - 8; y++) pset(x, y, y === d1 ? g_hex('#f8c880') : y < d2 ? ((x + y) % 5 === 0 ? g_hex('#c07438') : g_hex('#d08040')) : y === d2 ? g_hex('#e89850') : g_hex('#8a4a2c')); }
  } else if (k % 3 === 0) { rect(x0, y0, x1, y1, g_hex('#1e6a70')); for (const [r, c] of [[11, '#f0e0b0'], [9, '#1e6a70'], [7, '#e8804a'], [5, '#1e6a70'], [3, '#f0e0b0']]) disco(cx, y0 + 18, r, g_hex(c)); R.poligono([[cx - 9, y1 - 10], [cx + 9, y1 - 10], [cx, y1 - 22]], g_hex('#12383c')); }
  else if (k % 3 === 1) { rect(x0, y0, x1, y1, g_hex('#e0b040')); for (let d = -40; d < 40; d += 8) for (let j = 0; j < 3; j++) for (let y = y0; y <= y1 - 8; y++) { const x = x0 + d + j + (y - y0); if (x >= x0 && x <= x1) pset(x, y, g_hex('#b8342c')); } disco(cx, y0 + 20, 7, g_hex('#1c1820')); disco(cx - 2, y0 + 18, 2, g_hex('#f6ecd0')); }
  else { rect(x0, y0, x1, y1, g_hex('#3a2a5a')); for (let i = 0; i < 4; i++) { const r = 12 - i * 3; for (let a = Math.PI; a < Math.PI * 2; a += 0.06) pset(cx + Math.round(Math.cos(a) * r), y1 - 12 + Math.round(Math.sin(a) * r * 1.6), g_hex(i % 2 ? '#f08a6a' : '#f0d8a0')); } for (let i = 0; i < 6; i++) pset(x0 + 2 + Math.floor(h(i, 3, 343) * (w - 3)), y0 + 2 + Math.floor(h(i, 4, 343) * 10), g_hex('#f0d8a0')); linea(x0, y1 - 12, x1, y1 - 12, g_hex('#f0d8a0')); }
  rect(x0, y1 - 7, x1, y1, g_hex('#16121c')); rect(x0 + 3, y1 - 5, x1 - 3, y1 - 5, g_hex('#e8dcc0')); rect(x0 + 6, y1 - 3, x1 - 6, y1 - 3, g_hex('#8a8070'));
}

// lo fijo de la fachada del cine en la época ep con n lunas en la marquesina y los carteles
function g_fachadaFija(R, ep, P, n) {
  const { rect, pset, disco, poligono, linea } = R, K = C.k, viejo = ep === 1984;
  // el cielo de noche y la ciudad al fondo en dos capas, con sus ventanas
  g_deg(R, 0, 0, 319, 62, P.cielo, null, 1.15);
  for (let x = -6, k = 0; x < 320; k++) { const w = 12 + Math.floor(h(k, 1, 331) * 14); let top = 22 + Math.floor(h(k, 2, 331) * 14); if (x + w > 262) top = Math.max(top, 50);
    rect(x, top, x + w - 1, 62, P.lejos); rect(x, top, x + w - 1, top, P.lejosL); for (let wy = top + 3; wy < 60; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 3) if (h(wx, wy, 332) < 0.15) pset(wx, wy, g_mez(P.vent, P.lejos, 0.4)); x += w; }
  for (let x = -4, k = 0; x < 320; k++) { const w = 16 + Math.floor(h(k, 3, 331) * 18); let top = 30 + Math.floor(h(k, 4, 331) * 10); if (x + w > 262) top = Math.max(top, 52);
    rect(x, top, x + w - 1, 62, P.cerca); if (h(k, 5, 331) < 0.5) { rect(x + 3, top - 3, x + 8, top - 1, P.cerca); if (!viejo) rect(x + 5, top - 7, x + 5, top - 4, P.cerca); }
    for (let wy = top + 3; wy < 60; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 4) if (h(wx, wy, 333) < 0.24) pset(wx, wy, h(wx, wy, 334) < 0.6 ? P.vent : g_hex('#a8c8e8')); x += w; }
  // el vecino de la izquierda: ladrillo, cornisa, ventanas y, abajo, un café con toldo, taburetes y botellas
  rect(0, 24, 37, 131, g_hex(viejo ? '#4a2e34' : '#3a3038')); for (let y = 27; y < 64; y += 3) for (let x = ((y / 3) & 1) * 3; x < 38; x += 6) pset(x, y, g_hex(viejo ? '#3e262c' : '#2e262e')); rect(0, 24, 37, 26, g_hex('#6a4a4a')); rect(0, 27, 37, 27, K);
  for (const [wx, wy, k] of [[4, 31, 0], [20, 31, 1], [4, 47, 2], [20, 47, 3]]) { rect(wx, wy, wx + 11, wy + 12, K); rect(wx - 1, wy + 13, wx + 12, wy + 13, g_hex('#7a5a5a')); rect(wx + 1, wy + 1, wx + 10, wy + 11, k === 0 ? g_hex('#f2c878') : k === 3 ? g_hex('#f2d088') : g_hex('#232a50'));
    if (k === 0) { rect(wx + 1, wy + 1, wx + 3, wy + 11, g_hex('#c84a4a')); rect(wx + 8, wy + 1, wx + 10, wy + 11, g_hex('#c84a4a')); } if (k === 3) { rect(wx + 6, wy + 6, wx + 8, wy + 11, g_hex('#3a6a3a')); pset(wx + 7, wy + 5, g_hex('#5a9a4a')); } rect(wx + 5, wy + 1, wx + 6, wy + 11, K); rect(wx + 1, wy + 6, wx + 10, wy + 6, K); }
  for (let x = 0; x < 38; x++) { const a = (x >> 2) & 1; rect(x, 64, x, 71, a ? g_hex('#e8e0c8') : g_hex(viejo ? '#2a7a5a' : '#34566a')); if ((x & 3) === 1) pset(x, 72, a ? g_hex('#e8e0c8') : g_hex('#2a5a4a')); } rect(0, 63, 37, 63, K);
  rect(0, 75, 37, 131, K); rect(2, 77, 35, 124, g_hex('#f0c27a')); rect(2, 77, 35, 79, g_hex('#f8dca0')); rect(2, 96, 35, 96, g_hex('#7a5a3a'));
  for (let k = 0; k < 8; k++) { const x = 4 + k * 4, hh = 3 + (k * 5) % 4; rect(x, 96 - hh, x + 2, 95, g_hex(['#c84a3a', '#e8c040', '#6a9a4a', '#8a5a3a', '#d87a3a', '#4a6aa8', '#c8a060', '#a84a7a'][k])); pset(x, 96 - hh, g_hex('#fff4d8')); }
  rect(3, 108, 35, 112, g_hex('#7a3a2a')); rect(3, 108, 35, 108, g_hex('#a8583a')); for (const x of [8, 18, 28]) { rect(x, 112, x, 122, g_hex('#3a2a2a')); rect(x - 2, 112, x + 2, 113, g_hex('#c83a3a')); }
  linea(3, 77, 14, 124, g_hex('#f8e0b0')); linea(4, 77, 15, 124, g_hex('#f8e0b0')); rect(0, 125, 37, 131, g_hex('#2a1e24'));
  // el vecino de la derecha (más bajo, para dejar tranquila la esquina de Atom): persianas y una tienda con estantes
  rect(283, 52, 319, 131, g_hex(viejo ? '#3a3a52' : '#343846')); for (let y = 56; y < 76; y += 4) rect(283, y, 319, y, g_hex(viejo ? '#323248' : '#2c303c')); rect(283, 52, 319, 54, g_hex('#5a5a72')); rect(283, 55, 319, 55, K);
  rect(296, 57, 312, 68, K); rect(297, 58, 311, 67, g_hex('#232a50')); rect(304, 58, 304, 67, K); rect(295, 69, 313, 70, g_hex('#5a4a3a'));
  for (let x = 283; x < 320; x++) { const a = (x >> 2) & 1; rect(x, 72, x, 78, a ? g_hex('#f0e8e0') : g_hex(viejo ? '#b83a3a' : '#3a5a8a')); } rect(283, 71, 319, 71, K);
  rect(283, 80, 319, 131, K); rect(286, 82, 317, 124, g_hex(viejo ? '#e8b870' : '#e4ecf4')); rect(286, 82, 317, 84, g_hex('#fff4d8'));
  for (let j = 0; j < 3; j++) { rect(286, 95 + j * 11, 317, 95 + j * 11, g_hex('#6a4a2a')); for (let i = 0; i < 8; i++) rect(287 + i * 4, 88 + j * 11, 289 + i * 4, 94 + j * 11, g_hex(['#c83a3a', '#3a6ac8', '#e8c040', '#2a2a36', '#5aa86a', '#e87a3a'][(i * 3 + j * 2) % 6])); }
  linea(288, 82, 298, 124, g_hex('#fff4e0')); rect(283, 125, 319, 131, g_hex('#24242e'));
  // el cine: el pretil escalonado con estrías, la pared con paneles y el zócalo
  rect(38, 28, 282, 34, g_hex('#c8a878')); rect(38, 28, 282, 28, g_hex('#ecd4a0')); rect(112, 24, 208, 28, g_hex('#c8a878')); rect(112, 24, 208, 24, g_hex('#ecd4a0')); rect(136, 21, 184, 24, g_hex('#c8a878')); rect(136, 21, 184, 21, g_hex('#ecd4a0'));
  for (let x = 44; x < 282; x += 8) rect(x, 30, x, 34, g_hex('#a48858')); for (let x = 140; x < 184; x += 6) pset(x, 22, g_hex('#a48858'));
  rect(38, 35, 282, 131, P.pared); for (let x = 46; x < 280; x += 10) rect(x, 62, x, 123, P.paredS); for (let y = 66; y < 124; y += 9) for (let x = 40; x < 282; x += 10) pset(x + 5, y, P.paredS);
  rect(38, 61, 282, 64, P.paredL); for (let y = 65; y < 73; y++) for (let x = 38; x <= 282; x++) if ((73 - y) / 9 > g_b4(x, y) + 0.05) pset(x, y, g_mez(P.pared, P.paredL, 0.6));
  rect(38, 124, 282, 131, P.zoc); rect(38, 124, 282, 124, P.zocL); for (let x = 42; x < 280; x += 22) rect(x, 127, x + 8, 127, g_mez(P.zoc, P.zocL, 0.4));
  // el letrero vertical (sus luces se encienden en vivo) y su soporte
  rect(222, 38, 226, 40, g_hex('#4a4a5a')); rect(217, 2, 231, 39, K); rect(218, 3, 230, 38, viejo ? g_hex('#5a1424') : g_hex('#141a26')); rect(219, 4, 229, 4, viejo ? g_hex('#7a2434') : g_hex('#2a3446'));
  // la marquesina: la caja, el canto y el fondo de los tres paños
  rect(44, 36, 276, 61, K); rect(46, 38, 274, 59, P.marq); rect(46, 38, 274, 38, viejo ? g_hex('#fff6d8') : P.marq); rect(46, 58, 274, 59, P.marqS);
  for (const x of [120, 200]) rect(x, 38, x + 1, 59, viejo ? g_hex('#a88840') : ep === 2021 ? g_hex('#8a94a4') : g_hex('#2a3040'));
  if (ep === 2026) for (let y = 40; y < 58; y += 2) for (let x = 48; x < 274; x += 2) pset(x, y, g_hex('#181e2a'));
  // las vitrinas de los carteles, con su marco
  G_VIT.forEach(([x0, x1], k) => { rect(x0 - 2, 70, x1 + 2, 124, K); rect(x0 - 1, 71, x1 + 1, 123, viejo ? g_hex('#c8a040') : ep === 2021 ? g_hex('#aab4c4') : g_hex('#283848')); g_cartel(R, x0, 72, x1, 122, k < n ? k + 1 : 0, k + (ep === 1984 ? 0 : ep === 2021 ? 1 : 2));
    if (!viejo) { linea(x0 + 2, 86, x0 + 10, 73, g_mez(R.pget(x0 + 6, 80), C.blanco, 0.5)); rect(x0 - 1, 125, x1 + 1, 125, g_mez(P.zoc, P.luz, 0.4)); } });
  // las puertas de cristal con el vestíbulo detrás: lámparas, el mostrador de palomitas, la alfombra y un cordón
  for (const x of G_PUERTAS) { rect(x, 72, x + 32, 131, K);
    for (let y = 73; y <= 131; y++) rect(x + 1, y, x + 31, y, y < 100 ? P.vest[0] : y < 119 ? P.vest[1] : P.vest[2]);
    rect(x + 1, 119, x + 31, 119, g_mez(P.vest[2], C.blanco, 0.3)); for (let i = 0; i < 3; i++) disco(x + 8 + i * 8, 78, 1, C.oroL); rect(x + 5, 76, x + 27, 76, C.oroS);
    for (let i = x + 3; i < x + 30; i += 5) rect(i, 100, i + 2, 100, g_mez(P.vest[1], K, 0.2));
    if (x === G_PUERTAS[0]) { rect(x + 3, 105, x + 14, 118, g_hex('#c8343a')); rect(x + 3, 105, x + 14, 106, g_hex('#f0e0b0')); for (let i = 0; i < 3; i++) rect(x + 4 + i * 4, 108, x + 5 + i * 4, 117, g_hex('#f0e0b0')); rect(x + 5, 96, x + 12, 104, g_hex('#f8f0d8')); rect(x + 5, 96, x + 12, 96, K); rect(x + 20, 108, x + 28, 118, g_hex('#6a4a8a')); rect(x + 21, 104, x + 27, 107, g_hex('#e8e0f0')); }
    else { for (const px of [x + 5, x + 26]) { rect(px, 110, px, 118, C.oro); disco(px, 109, 1, C.oroL); } for (let i = x + 6; i < x + 26; i++) pset(i, 112 + Math.round(Math.sin((i - x - 5) / 21 * Math.PI) * 2), g_hex('#8a2a3a')); rect(x + 10, 84, x + 22, 98, K); g_cartel(R, x + 11, 85, x + 21, 97, 0, 2); }
    rect(x + 15, 73, x + 16, 131, K); rect(x + 4, 104, x + 13, 105, C.oro); rect(x + 19, 104, x + 28, 105, C.oro); disco(x + 12, 105, 1, C.oroL); disco(x + 20, 105, 1, C.oroL);
    for (const d of [2, 18]) { linea(x + d, 90, x + d + 9, 75, g_hex('#fff8e4')); linea(x + d + 1, 92, x + d + 11, 76, g_mez(P.vest[0], C.blanco, 0.5)); } }
  // el friso sobre las puertas: un sol naciente dorado
  rect(112, 63, 184, 71, K); rect(113, 64, 183, 70, viejo ? g_hex('#5a1824') : P.paredS); for (let k = 0; k <= 12; k++) linea(148, 70, 148 + Math.round(Math.cos(Math.PI + k * Math.PI / 12) * 30), 70 + Math.round(Math.sin(Math.PI + k * Math.PI / 12) * 6), k % 2 ? C.oroS : C.oro); disco(148, 70, 3, C.oroL); rect(113, 70, 183, 70, C.oroS);
  // la taquilla: la garita con su arco, el cristal, la rejilla para hablar, la repisa y el zócalo con el precio
  rect(192, 78, 232, 124, K); rect(193, 79, 231, 123, viejo ? g_hex('#c8a040') : g_hex('#8a94a4')); rect(194, 80, 230, 106, g_hex('#f8ecc0')); rect(194, 80, 230, 82, g_hex('#fffae0'));
  for (const [a, b] of [[194, 196], [228, 230]]) { rect(a, 80, b, 81, viejo ? g_hex('#c8a040') : g_hex('#8a94a4')); } pset(197, 80, g_hex('#c8a040')); pset(227, 80, g_hex('#c8a040'));
  rect(198, 84, 226, 84, g_hex('#d8c890')); for (let i = 0; i < 5; i++) rect(199 + i * 6, 85, 202 + i * 6, 87, g_hex(['#c83a3a', '#3a6ac8', '#e8c040', '#5aa86a', '#e87a3a'][i]));
  rect(194, 104, 230, 106, g_hex('#8a6a3a')); rect(197, 105, 208, 105, K); rect(192, 107, 232, 124, viejo ? g_hex('#6a1a2a') : P.paredS); rect(194, 109, 230, 109, C.oro); rect(194, 121, 230, 121, C.oroS);
  linea(196, 96, 204, 82, g_hex('#fffef0')); linea(197, 98, 206, 83, g_hex('#fffef0'));
  // la acera mojada: losas, la luz que cae de la marquesina, los charcos de luz de las puertas y la taquilla, el bordillo
  rect(0, 132, 319, 150, P.acera); rect(40, 133, 280, 135, g_mez(P.acera, P.aceraL, 0.5)); for (let x = 40; x <= 280; x++) for (let y = 136; y < 141; y++) if ((141 - y) / 6 > g_b4(x, y)) pset(x, y, g_mez(P.acera, P.aceraL, 0.35));
  for (const [x0, x1] of [[115, 145], [151, 181], [195, 229]]) { poligono([[x0, 133], [x1 + 1, 133], [x1 + 8, 146], [x0 - 7, 146]], g_mez(P.acera, P.vest[0], 0.22)); poligono([[x0 + 3, 133], [x1 - 2, 133], [x1 + 2, 140], [x0 - 1, 140]], g_mez(P.acera, P.vest[0], 0.42)); }
  for (let x = 0; x < 320; x += 20) rect(x, 132, x, 149, P.aceraS); rect(0, 141, 319, 141, P.aceraS);
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 335) * 320), y = 133 + Math.floor(h(k, 2, 335) * 16); pset(x, y, h(k, 3, 335) < 0.5 ? P.aceraS : P.aceraL); }
  for (const [px, py, pw] of [[92, 145, 9], [214, 147, 7], [30, 138, 6]]) for (let j = -2; j <= 2; j++) for (let i = -pw; i <= pw; i++) if ((i / pw) ** 2 + (j / 2.4) ** 2 < 1) pset(px + i, py + j, g_mez(P.aceraS, P.cielo[4], 0.5));
  rect(0, 150, 319, 150, P.aceraL); rect(0, 151, 319, 152, g_mez(P.acera, P.aceraL, 0.5)); rect(0, 153, 319, 153, g_hex('#16141e'));
  // la calzada mojada, con su grano, la raya discontinua y una tapa de alcantarilla
  rect(0, 154, 319, 179, P.calz); for (let k = 0; k < 110; k++) pset(Math.floor(h(k, 1, 336) * 320), 154 + Math.floor(h(k, 2, 336) * 26), k % 3 ? P.calzL : g_mez(P.calz, K, 0.4));
  for (let x = 4; x < 320; x += 34) { rect(x, 166, x + 17, 167, viejo ? g_hex('#a89a50') : g_hex('#b8bcc8')); rect(x + 3, 167, x + 9, 167, g_mez(P.calz, g_hex('#a89a50'), 0.5)); }
  for (let j = -2; j <= 2; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 2.5) ** 2 < 1) pset(252 + i, 172 + j, (i + j) & 1 ? g_hex('#3a3848') : g_hex('#4a4858'));
  if (ep === 2026) { for (let x = 0; x < 320; x++) { if (h(x >> 1, 7, 337) < 0.7) pset(x, 150, g_hex('#e8f0f8')); if (h(x >> 2, 8, 337) < 0.4) pset(x, 151, g_hex('#c4d4e4')); } for (let x = 44; x <= 276; x++) if (h(x >> 1, 9, 337) < 0.8) pset(x, 35, g_hex('#e8f0f8')); for (let x = 38; x <= 282; x++) if (h(x >> 1, 10, 337) < 0.6) pset(x, 27, g_hex('#e8f0f8')); }
  // las farolas de los extremos (la luz y las polillas, en vivo)
  for (const x of [15, 304]) { rect(x, 68, x + 1, 149, g_hex('#2a2a36')); rect(x + 1, 68, x + 1, 149, g_hex('#4a4a5e')); rect(x - 2, 143, x + 3, 149, g_hex('#2a2a36')); rect(x - 3, 148, x + 4, 149, g_hex('#3a3a4a'));
    if (viejo) { rect(x - 3, 58, x + 4, 59, g_hex('#2a2a36')); rect(x - 2, 60, x + 3, 67, g_hex('#fff2c0')); rect(x - 2, 60, x - 2, 67, g_hex('#f8d890')); rect(x - 3, 68, x + 4, 68, g_hex('#2a2a36')); pset(x, 57, g_hex('#2a2a36')); }
    else { const d = x < 160 ? 1 : -1; rect(x, 60, x + 1, 68, g_hex('#2a2a36')); rect(Math.min(x, x + d * 9), 59, Math.max(x + 1, x + d * 9), 60, g_hex('#2a2a36')); rect(Math.min(x + d * 4, x + d * 9), 61, Math.max(x + d * 4, x + d * 9), 61, g_hex('#f4faff')); } }
}

// la fachada del cine (encuadre 'sala', cámara general): copia lo fijo y anima las luces, el vestíbulo, la taquillera, la
// acera y la cola de detrás. Devuelve la geometría
function g_fachada(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, ep = G_EP[o.epoca] ? +o.epoca : 1984, P = g_ep(ep), n = Math.max(0, Math.min(3, Math.round(o.lunas ?? 0))), viejo = ep === 1984, K = C.k;
  R.copiar(g_capa(R, 'fach' + ep + '_' + n, () => g_fachadaFija(R, ep, P, n)));
  // las estrellas que titilan (lejos de la barra y de Atom), un avión y las ventanas que se encienden y se apagan
  for (let k = 0; k < 14; k++) { const x = Math.round(176 + h(k, 1, 351) * 92), y = Math.round(3 + h(k, 2, 351) * 16), b = Math.sin(t * (1.3 + (k % 3) * 0.7) + k); if (b > -0.2 && !(x > 214 && x < 234)) pset(x, y, b > 0.6 ? g_hex('#ece6fa') : g_hex('#7a7ab8')); }
  { const u = (t / 30 + 0.3) % 1, ax = Math.round(272 - u * 110), ay = Math.round(17 - u * 5); if (ax > 174 && !(ax > 212 && ax < 236)) { pset(ax, ay, g_hex('#5a5a7a')); pset(ax + 1, ay, g_hex('#5a5a7a')); pset(ax + 2, ay, Math.floor(t * 1.5) % 2 ? C.rojo : g_hex('#5a2030')); } }
  for (let k = 0; k < 6; k++) { const x = 286 + Math.round(h(k, 3, 352) * 30), y = 40 + Math.round(h(k, 4, 352) * 8); if (R.pget(x, y) === P.cerca && Math.sin(t * 0.4 + k * 2) > 0.2) pset(x, y, P.vent); }
  // los vecinos: la tele del piso, la lámpara del café, alguien en la barra y el letrero de la tienda
  rect(21, 32, 30, 36, Math.sin(t * 7) > 0.3 ? g_hex('#6a8ad8') : g_hex('#4a5ab0')); rect(21, 37, 30, 37, K);
  { const sorbo = (t % 6) > 4.6; rect(25, 112, 31, 122, g_hex('#3a2a3a')); disco(28, 108, 3, g_hex('#2a1e24')); if (sorbo) { rect(23, 106, 25, 108, C.blanco); pset(22, 107, C.blanco); } }
  { const on = Math.sin(t * 2.1) > -0.5 || Math.floor(t * 9) % 3, c = viejo ? g_hex('#ff7ab8') : P.neon; if (on) { rect(12, 82, 20, 82, c); rect(12, 82, 12, 88, c); rect(20, 82, 20, 88, c); rect(13, 89, 19, 89, c); rect(21, 84, 23, 84, c); rect(23, 84, 23, 86, c); rect(21, 86, 23, 86, c); for (let q = 0; q < 2; q++) pset(14 + q * 3, 80 - Math.round((t * 3 + q) % 2), c); } }
  { const c = Math.floor(t * 1.2) % 4; for (let i = 0; i < 4; i++) disco(292 + i * 7, 76, 1, i === c ? P.luz : g_hex('#5a5a6a')); disco(303, 115, 6, K); disco(303, 115, 5, g_hex('#2a2a32')); disco(303, 115, 1, g_hex('#c83a3a')); pset(Math.round(303 + Math.cos(t * 4) * 4), Math.round(115 + Math.sin(t * 4) * 4), g_hex('#6a6a7a')); }
  // el letrero vertical: las lunas (o rombos, sin o.lunas) que se encienden una a una y el borde de luces que corre
  for (let k = 0; k < 4; k++) { const on = Math.floor(t * 2.5) % 6 > k - 1, cy = 9 + k * 8, c = on ? P.luz : g_mez(P.luzS, K, 0.3);
    if (k < Math.max(n, 1) && n > 0) { disco(224, cy, 3, c); if (on) disco(225, cy - 1, 2, viejo ? g_hex('#5a1424') : g_hex('#141a26')); else disco(224, cy, 2, viejo ? g_hex('#5a1424') : g_hex('#141a26')); }
    else { pset(224, cy - 2, c); rect(223, cy - 1, 225, cy - 1, c); rect(222, cy, 226, cy, c); rect(223, cy + 1, 225, cy + 1, c); pset(224, cy + 2, c); } }
  for (let y = 3; y < 39; y += 2) { const f = Math.floor(t * 8); pset(217, y, ((y >> 1) + f) % 3 === 0 ? P.luz : P.luzS); pset(231, y, ((y >> 1) - f % 3 + 3) % 3 === 0 ? P.luz : P.luzS); }
  // la marquesina: 1984, bombillas que corren y renglones en trazos; 2021, caja de luz con un barrido; 2026, ledes que se desplazan
  if (viejo) { for (let k = 0; k < 58; k++) { const fase = (k + Math.floor(t * 8)) % 4, x = 49 + (k % 29) * 8, y = k < 29 ? 40 : 57; disco(x, y, 1, fase === 0 ? P.luz : fase === 1 ? P.luzM : P.luzS); if (fase === 0) { pset(x, y - 2, g_hex('#fff8e0')); pset(x, y + 2, g_hex('#fff8e0')); } } }
  else if (ep === 2021) { const bx = 46 + Math.round(((t * 0.22) % 1) * 300) - 40; for (let y = 39; y < 58; y++) for (let i = 0; i < 6; i++) { const x = bx + i - Math.round((y - 39) / 2); if (x > 46 && x < 274 && x !== 120 && x !== 121 && x !== 200 && x !== 201) pset(x, y, g_hex('#ffffff')); } rect(46, 60, 274, 60, Math.sin(t * 2) > -0.6 ? P.neon : P.neonS); }
  else { for (let x = 46; x <= 274; x += 2) { const v = Math.sin(x * 0.11 - t * 3); pset(x, 39, v > 0.3 ? P.trazo2 : P.luzS); pset(x, 58, v < -0.3 ? P.trazo2 : P.luzS); } }
  for (const [x0, lado] of [[50, 0], [204, 1]]) for (const [fy, q] of [[45, 0], [50, 1], [55, 2]]) { let x = x0 + 2 + (ep === 2026 ? Math.round((t * 6 + q * 9) % 12) - 6 : 0); const parp = viejo && lado === 1 && q === 1 && (t % 7) < 0.35 && Math.floor(t * 20) % 2; if (parp) continue;
    for (let w = 0; w < 7 && x < x0 + 62; w++) { const L = 3 + Math.floor(h(lado, w + q * 9, 353) * 8), a = Math.max(x, x0), b = Math.min(x + L, x0 + 64); if (b >= a) rect(a, fy, b, fy + (q === 0 ? 2 : 1), q === 1 ? P.trazo2 : P.trazo); x += L + 3; } }
  { const cx = 160, cy = 48; if (n > 0) for (let i = 0; i < n; i++) { const mx = cx + Math.round((i - (n - 1) / 2) * 22), late = 0.5 + 0.5 * Math.sin(t * 2.2 + i * 1.4), r = 7; if (!viejo) R.halo(mx, cy, 10, ep === 2021 ? [g_hex('#e4ecf4'), g_hex('#d4e0ec')] : [g_hex('#1a2a34'), g_hex('#20404a')], 1.0); disco(mx, cy, r, viejo ? g_hex('#2a2230') : ep === 2021 ? g_hex('#1c2030') : P.trazo); disco(mx, cy, r - 1, ep === 2026 ? g_hex('#f8cc70') : late > 0.5 ? g_hex('#e8a040') : g_hex('#d89030')); disco(mx - 1, cy - 1, r - 3, ep === 2026 ? g_hex('#fff0b0') : g_hex('#f8c868')); disco(mx + 3, cy + 2, 1, g_hex('#c07a28')); pset(mx - 3, cy + 3, g_hex('#c07a28')); if (late > 0.8) pset(mx - 3, cy - 3, C.blanco); }
    else for (const [fy, q] of [[44, 3], [49, 4], [54, 5]]) { let x = 128; for (let w = 0; w < 7 && x < 192; w++) { const L = 4 + Math.floor(h(2, w + q * 9, 353) * 9); rect(x, fy, Math.min(x + L, 194), fy + 2, q === 4 ? P.trazo2 : P.trazo); x += L + 3; } }
 }
  // las luces del alero, que bañan la fachada
  for (let x = 50; x < 274; x += 12) { rect(x, 62, x + 1, 62, P.luz); for (let y = 63; y < 68; y++) if (g_b4(x + (y & 1), y) < 0.6 - (y - 63) * 0.1) pset(x + (y & 1), y, g_mez(P.pared, P.luz, 0.45)); }
  // las pilastras de luz: neón rosa que late (1984), tiras ámbar (2021) o turquesa con un punto que sube (2026)
  G_PIL.forEach((x, k) => { const on = !(k === 2 && (t % 5.3) < 0.4 && Math.floor(t * 18) % 2), v = 0.5 + 0.5 * Math.sin(t * 2 + k); if (!on) { rect(x, 66, x + 2, 122, P.neonS); return; }
    for (let y = 66; y < 123; y++) for (const dx of [-1, 3]) if (g_b4(x + dx, y) < 0.3 + v * 0.25) pset(x + dx, y, P.neonS); rect(x, 66, x + 2, 122, P.neon); rect(x + 1, 66, x + 1, 122, P.neonL);
    if (!viejo) { const py = 122 - Math.round(((t * 0.6 + k * 0.23) % 1) * 56); rect(x, py - 2, x + 2, py, C.blanco); } });
  // las vitrinas: bombillas alrededor (1984) o el brillo que recorre el cartel retroiluminado
  G_VIT.forEach(([x0, x1], k) => { if (viejo) { for (let i = 0; i < 20; i++) { const per = i < 5 ? [x0 + i * 6, 69] : i < 10 ? [x1 + 3, 74 + (i - 5) * 11] : i < 15 ? [x1 - (i - 10) * 6, 125] : [x0 - 3, 118 - (i - 15) * 11]; pset(per[0], per[1], (i + Math.floor(t * 4) + k) % 3 === 0 ? P.luz : P.luzS); } }
    else { const u = ((t * 0.35 + k * 0.31) % 1) * 90 - 20; for (let y = 72; y <= 114; y++) { const x = Math.round(x0 + u - (y - 72) * 0.5); if (x >= x0 && x <= x1) pset(x, y, g_mez(R.pget(x, y), C.blanco, 0.45)); } rect(x0 - 1, 125, x1 + 1, 125, g_mez(P.zoc, P.luz, 0.3 + 0.2 * Math.sin(t * 3 + k))); } });
  // el vestíbulo: las palomitas que saltan, alguien que cruza por detrás del cristal y el destello de las lámparas
  { const x = G_PUERTAS[0]; for (let i = 0; i < 5; i++) pset(x + 6 + i, 98 + (Math.floor(t * 6 + i * 1.7) % 5), g_hex('#fff4c8')); for (let i = 0; i < 3; i++) if (Math.sin(t * 3 + i * 2) > 0.5) pset(x + 8 + i * 8, 80, C.blanco); }
  G_PUERTAS.forEach((x, q) => { const p = ((t + q * 4.5) % 9) / 9; if (p < 0.5) { const px = x + 2 + Math.round(p / 0.5 * 26), an = Math.floor(t * 5) % 2; if (px + 2 < x + 15 || px > x + 16) { rect(px, 109, px + 2, 116, q ? g_hex('#3a5a7a') : g_hex('#6a3a3a')); disco(px + 1, 106, 2, g_hex('#e0b890')); rect(px, 104, px + 2, 104, g_hex('#3a2a1a')); pset(px + an * 2, 117, K); pset(px + 2 - an * 2, 118, K); } } });
  // la taquillera, que mira a los lados y parpadea; el precio en el zócalo
  { const mira = Math.sin(t * 0.6) > 0.7 ? -1 : Math.sin(t * 0.6) < -0.8 ? 1 : 0; rect(207, 97, 217, 103, viejo ? C.rojo : g_hex('#2a3a5a')); rect(210, 97, 214, 99, C.blanco); disco(212, 93, 4, g_hex('#e8c8a0')); rect(208, 88, 216, 91, g_hex('#5a3418')); pset(208, 92, g_hex('#5a3418')); pset(216, 92, g_hex('#5a3418')); if ((t % 3.1) > 0.12) { pset(210 + mira, 93, K); pset(214 + mira, 93, K); } rect(211, 96, 213, 96, g_hex('#b85a5a'));
    disco(212, 101, 2, g_hex('#c8a040')); pset(212, 101, g_hex('#6a5a3a')); linea(196, 96, 204, 82, g_hex('#fffef0')); }
  R.numero(P.precio, 216, 119, { color: C.oroL, centro: true, sombra: false }); R.icono('bolsa', 196, 111, C.oro, g_hex('#3a0a14'), 1);
  // las farolas: el halo, el charco de luz a sus pies y las polillas
  for (const x of [15, 304]) { const lx = viejo ? x : x + (x < 160 ? 7 : -7), ly = viejo ? 63 : 62; if (viejo) R.halo(lx, ly, 10, [g_hex('#4a3e62'), g_hex('#7a5e6a'), g_hex('#b88a76')], 1.5); else for (let y = 62; y < 76; y++) for (let i = -(y - 60) >> 1; i <= (y - 60) >> 1; i++) if (g_b4(lx + i, y) < 0.42 - (y - 62) * 0.025) pset(lx + i, y, g_mez(R.pget(lx + i, y), g_hex('#dcecff'), 0.35));
    if (viejo) { rect(x - 2, 60, x + 3, 67, g_hex('#fff2c0')); rect(x - 2, 60, x - 2, 67, g_hex('#f8d890')); }
    for (let j = -2; j <= 2; j++) for (let i = -11; i <= 11; i++) { const e = (i / 11) ** 2 + (j / 2.5) ** 2; if (e < 1 && g_b4(lx + i, 147 + j) < 1.1 - e) pset(lx + i, 147 + j, g_mez(P.acera, viejo ? g_hex('#f8d890') : g_hex('#dcecff'), e < 0.4 ? 0.4 : 0.22)); }
    for (let k = 0; k < 3; k++) { const a = t * (3 + k) + k * 2; pset(Math.round(lx + Math.cos(a) * (5 + k * 2)), Math.round(ly + 2 + Math.sin(a * 1.3) * 4), g_hex('#e8dcc8')); } }
  // la acera: destellos en lo mojado; hojas que corren (2021), nieve que cae (2026) o el vapor de la alcantarilla (1984)
  for (let k = 0; k < 8; k++) { const x = Math.round(h(k, 1, 354) * 300) + 10, y = 135 + Math.round(h(k, 2, 354) * 13); if (Math.sin(t * 3 + k * 2) > 0.4) pset(x, y, g_mez(P.aceraL, P.luz, 0.6)); }
  if (ep === 2021) for (let k = 0; k < 7; k++) { const x = Math.round(((h(k, 1, 355) * 360 + t * (16 + k * 5)) % 360) - 20), y = 136 + Math.round(h(k, 2, 355) * 12 + Math.sin(t * 3 + k) * 1.5), c = g_hex(['#d8802a', '#b8502a', '#e0b040'][k % 3]); pset(x, y, c); if (Math.sin(t * 6 + k) > 0) pset(x + 1, y, c); else pset(x, y - 1, c); }
  // los reflejos de las luces en la calzada mojada, que tiemblan
  { const ref = [[15, 2, viejo ? '#f8d890' : '#dcecff', 0.6], [304, 2, viejo ? '#f8d890' : '#dcecff', 0.6], [130, 6, 0, 0.5], [166, 6, 0, 0.5], [212, 6, 0, 0.42], [60, 5, 1, 0.3], [93, 5, 1, 0.3], [253, 5, 1, 0.3]];
    for (const x of G_PIL) ref.push([x + 1, 1, 2, 0.6]);
    for (const [x, w, c, s] of ref) { const col = c === 0 ? P.vest[0] : c === 1 ? g_mez(P.calz, g_hex('#c88a6a'), 0.7) : c === 2 ? P.neon : g_hex(c);
      for (let y = 155; y < 179; y += 2) { const f = 1 - (y - 155) / 30; if (h(x, y, Math.floor(t * 4 + x * 0.1)) > s * f + 0.12) continue; const ond = Math.round(Math.sin(y * 0.8 + t * 3 + x) * (0.5 + (y - 155) / 14)), L = Math.max(1, Math.round(w * (0.4 + f * 0.6))); rect(x - L + ond, y, x + L + ond, y, y < 162 ? col : g_mez(col, P.calz, 0.4)); } } }
  if (viejo) { g_vapor(R, 252, 169, t, 0.4, g_hex('#8a86a0'), 24); g_vapor(R, 248, 170, t, 2.1, g_hex('#6e6a86'), 18); }
  // la cola de detrás: en fila hacia la taquilla, pegada a la fachada
  const cola = g_cola(o); g_colaPinta(R, t, cola.atras, ep);
  return { suelo: 147, acera: [133, 150], calzada: 174, taquilla: [212, 104], ventanilla: [203, 147], puertas: G_PUERTAS.map((x) => [x, 72, x + 32, 131]), marquesina: [44, 36, 276, 61], lunas: [160, 48], carteles: G_VIT.map(([a, b]) => [a, 72, b, 122]), letrero: [224, 20], farolas: [15, 304], cola };
}

// los puestos de la cola según o.cola (0–1): atras, hasta 12 en fila hacia la taquilla (x: borde izquierdo del
// personaje, pies en y 141, miran a la derecha); delante, hasta 8 que vuelven junto al bordillo (pies en y 151, miran a la izquierda)
function g_cola(o) {
  const c = Math.max(0, Math.min(1, o.cola ?? 0)), n1 = Math.round(Math.min(1, c / 0.6) * 12), n2 = Math.round(Math.max(0, (c - 0.6) / 0.4) * 8), atras = [], delante = [];
  for (let k = 0; k < n1; k++) atras.push([190 - k * 13 - (k % 2), 141, 1, k]);
  for (let k = 0; k < n2; k++) delante.push([22 + k * 14 + (k % 2), 151, -1, k + 12]);
  return { atras, delante };
}

// pinta a los de la cola (extras chibi): charlan a ratos, alguno mira el móvil (2021 y 2026) o lleva bufanda de vaho (2026)
function g_colaPinta(R, t, lista, ep) {
  const G = g_gente(ep === 1984 ? 'sala' : 'calle'); if (!G.length) return;
  for (const [x, y, dir, k] of [...lista].reverse()) { const def = G[(k * 2 + (k >> 2) + (ep % 7)) % G.length], habla = Math.sin(t * 0.7 + k * 1.9) > 0.55, movil = ep !== 1984 && k % 3 === 1;
    const a = R.actor(def, x, y, t + k * 1.3, { dir: k % 4 === 2 ? -dir : dir, habla, sonrisa: k % 3 === 0, sostiene: movil ? true : undefined });
    if (movil && a && a.mano) { R.rect(a.mano[0] - 1, a.mano[1] - 3, a.mano[0] + 1, a.mano[1], C.k); R.pset(a.mano[0], a.mano[1] - 2, Math.sin(t * 5 + k) > -0.5 ? g_hex('#bfe0ff') : g_hex('#7aa8e0')); R.pset(a.mano[0], a.mano[1] - 1, g_hex('#bfe0ff')); }
    if (ep === 2026 && k % 2 === 0 && (t * 0.5 + k * 0.37) % 1 < 0.35) { const u = ((t * 0.5 + k * 0.37) % 1) / 0.35, vx = x + (dir > 0 ? 15 : -1) + Math.round(u * 3 * dir), vy = y - 15 - Math.round(u * 3); R.pset(vx, vy, g_hex('#c8d4e4')); if (u < 0.6) R.pset(vx + dir, vy - 1, g_hex('#aab8cc')); } }
}

// un coche de lado según la época (x: centro; suelo: la base de las ruedas; dir ±1; col: la carrocería): 1984, berlina
// cuadrada con cromados y faros amarillos; 2021, todocamino redondeado con ledes blancos; 2026, eléctrico bajo con barra de luz
function g_coche(R, x, suelo, t, ep, dir, col) {
  const { rect, pset, disco, poligono } = R, K = C.k, X = (i) => Math.round(x + i * dir), rr = (a, y0, b, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), cs = g_mez(col, K, 0.35), cl = g_mez(col, C.blanco, 0.35), w = Math.round(Math.sin(t * 12 + x * 0.1) * 0.5);
  // la sombra y el resplandor de los faros en el asfalto mojado
  for (let i = -22; i <= 22; i++) if ((i & 1) === 0) pset(X(i), suelo + 1, K); for (let i = 0; i < 18; i++) for (let j = 0; j < 3; j++) if (g_b4(X(24 + i), suelo - 2 + j) < 0.6 - i * 0.03) pset(X(24 + i), suelo - 2 + j, ep === 1984 ? g_hex('#b8a060') : g_hex('#aabcd8'));
  if (ep === 1984) { rr(-23, suelo - 12, 23, suelo - 3, K); rr(-22, suelo - 11, 22, suelo - 4, col); rr(-22, suelo - 11, 22, suelo - 11, cl); rr(-22, suelo - 6, 22, suelo - 4, cs); poligono([[X(-13), suelo - 12], [X(11), suelo - 12], [X(8), suelo - 20], [X(-11), suelo - 20]], K); poligono([[X(-12), suelo - 12], [X(10), suelo - 12], [X(7), suelo - 19], [X(-10), suelo - 19]], col); rr(-9, suelo - 18, -2, suelo - 13, g_hex('#8ab8d8')); rr(0, suelo - 18, 6, suelo - 13, g_hex('#8ab8d8')); rr(-9, suelo - 18, -6, suelo - 16, g_hex('#c8e4f4')); rr(-1, suelo - 19, -1, suelo - 12, K); rr(-10, suelo - 20, 7, suelo - 20, cl);
    rr(-24, suelo - 6, -22, suelo - 5, g_hex('#c8d0dc')); rr(22, suelo - 6, 24, suelo - 5, g_hex('#c8d0dc')); rr(21, suelo - 10, 22, suelo - 8, g_hex('#fff0a0')); rr(-22, suelo - 10, -21, suelo - 8, g_hex('#e83a3a')); rr(-18, suelo - 8, 18, suelo - 8, cs); rr(1, suelo - 9, 3, suelo - 9, g_hex('#c8d0dc')); }
  else if (ep === 2021) { rr(-23, suelo - 13, 23, suelo - 3, K); rr(-22, suelo - 12, 22, suelo - 4, col); rr(-22, suelo - 7, 22, suelo - 4, cs); poligono([[X(-21), suelo - 13], [X(15), suelo - 13], [X(8), suelo - 22], [X(-17), suelo - 22]], K); poligono([[X(-20), suelo - 13], [X(14), suelo - 13], [X(7), suelo - 21], [X(-16), suelo - 21]], col); rr(-15, suelo - 20, -6, suelo - 14, g_hex('#3a4a62')); rr(-4, suelo - 20, 6, suelo - 14, g_hex('#3a4a62')); poligono([[X(6), suelo - 20], [X(11), suelo - 14], [X(6), suelo - 14]], g_hex('#3a4a62')); rr(-14, suelo - 19, -11, suelo - 18, g_hex('#7a94b4')); rr(-16, suelo - 22, 7, suelo - 22, g_hex('#8a8a94')); rr(-22, suelo - 12, 20, suelo - 12, cl);
    rr(20, suelo - 11, 22, suelo - 10, C.blanco); rr(-22, suelo - 11, -20, suelo - 10, g_hex('#ff3a3a')); rr(-5, suelo - 13, -5, suelo - 5, cs); rr(-22, suelo - 4, 22, suelo - 4, g_hex('#2a2a32')); rr(-2, suelo - 10, 0, suelo - 10, cs); }
  else { poligono([[X(-23), suelo - 3], [X(-23), suelo - 9], [X(-16), suelo - 13], [X(-8), suelo - 19], [X(6), suelo - 19], [X(16), suelo - 12], [X(23), suelo - 10], [X(23), suelo - 3]], K); poligono([[X(-22), suelo - 4], [X(-22), suelo - 9], [X(-15), suelo - 12], [X(-8), suelo - 18], [X(6), suelo - 18], [X(15), suelo - 11], [X(22), suelo - 9], [X(22), suelo - 4]], col); poligono([[X(-12), suelo - 13], [X(-7), suelo - 17], [X(5), suelo - 17], [X(11), suelo - 13]], g_hex('#243044')); rr(-1, suelo - 17, -1, suelo - 13, col); rr(-9, suelo - 16, -6, suelo - 16, g_hex('#5a7a9a')); rr(-22, suelo - 6, 22, suelo - 4, cs); rr(-14, suelo - 12, 14, suelo - 12, cl);
    rr(22, suelo - 9, 22, suelo - 7, g_hex('#d8fff8')); rr(19, suelo - 9, 21, suelo - 9, g_hex('#d8fff8')); rr(-22, suelo - 9, -22, suelo - 6, g_hex('#ff3a5a')); rr(-22, suelo - 9, -18, suelo - 9, g_hex('#ff3a5a')); rr(-18, suelo - 5, 18, suelo - 5, Math.sin(t * 6) > 0 ? g_hex('#40e0d0') : g_hex('#1e8a88')); }
  for (const i of [-13, 13]) { disco(X(i), suelo - 3 + w, 4, K); disco(X(i), suelo - 3 + w, 2, ep === 2026 ? g_hex('#3a4452') : g_hex('#9aa4b4')); pset(X(i) + Math.round(Math.cos(t * 14)), suelo - 3 + w + Math.round(Math.sin(t * 14)), ep === 2026 ? g_hex('#40e0d0') : g_hex('#4a5262')); }
}

// delante de los personajes en la fachada: la vuelta de la cola junto al bordillo, la nieve que cae (2026) y los coches que pasan
function g_fachadaDelante(R, t, o = {}) {
  const ep = G_EP[o.epoca] ? +o.epoca : 1984, cola = g_cola(o);
  g_colaPinta(R, t, cola.delante, ep);
  if (ep === 2026) for (let k = 0; k < 46; k++) { const y = Math.round((h(k, 1, 361) * 190 + t * (14 + (k % 5) * 4)) % 190) - 5, x = Math.round(h(k, 2, 361) * 330 + Math.sin(t * 1.3 + k) * 4 - y * 0.12); if (y < 46 && (x > 272 || (x > 16 && x < 174 && y < 22))) continue; if (y >= 0 && y < 180 && x >= 0 && x < 320) { R.pset(x, y, k % 3 ? g_hex('#e8f0f8') : g_hex('#b8c8dc')); if (k % 7 === 0) R.pset(x + 1, y, g_hex('#e8f0f8')); } }
  if (o.coches !== false) { const COL = ep === 1984 ? ['#b8862c', '#3a5a8a', '#7a8a6a'] : ep === 2021 ? ['#c8ccd4', '#a82c34', '#2a3444'] : ['#e8ecf0', '#2e4a5a', '#c8a040'];
    for (const [per, fase, dir, suelo, k] of [[11, 0.15, 1, 176, 0], [17, 0.62, -1, 165, 1]].sort((a, b) => a[3] - b[3])) { const u = ((t / per + fase) % 1), x = dir > 0 ? -60 + u * 440 : 380 - u * 440; if (x > -50 && x < 370) g_coche(R, Math.round(x), suelo, t, ep, dir, g_hex(COL[(k + Math.floor(t / per + fase)) % 3])); } }
  return {};
}

// el resplandor de arena ABSTRACTO de la pantalla (nunca una imagen de las películas): bandas cálidas que ondulan
// despacio, una mancha de luz que deriva y granos que cruzan, tramado, en [x0, x1] × [y0, y1]; f 0–1 lo apaga
const G_ARENA = ['#5a2a16', '#8a421e', '#b05e2a', '#d07e3a', '#e8a252', '#f4c67a', '#fbe2a8', '#fff4d4'];

function g_resplandor(R, x0, y0, x1, y1, t, f = 1) {
  const cols = G_ARENA.map(g_hex), n = cols.length - 1, bx = (x0 + x1) / 2 + Math.sin(t * 0.23) * (x1 - x0) * 0.28, by = y0 + (y1 - y0) * (0.42 + 0.12 * Math.sin(t * 0.31)), g = Math.floor(t * 22);
  for (let y = y0; y <= y1; y++) { const sy = 1.5 * Math.sin(y * 0.05 - t * 0.2), s2 = y * 0.09 - t * 0.35, dy = (y - by) * (y - by) * 2.2;
    for (let x = x0; x <= x1; x++) { let v = 3.1 + 2.0 * Math.sin(x * 0.035 + t * 0.5 + sy) + 1.3 * Math.sin(s2 + x * 0.012) + 2.6 * Math.exp(-((x - bx) * (x - bx) + dy) / 1500);
      if (h((x - g) >> 1, y, 371) < 0.035) v += 1; v *= f; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > g_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}

// la pantalla de la sala (cámara 'butacas'): x 34–268, y 24–108
const G_PANT = [34, 24, 268, 108];

// lo fijo de la sala vista desde el fondo: las paredes acolchadas con sus apliques, la salida, la bambalina, el marco de
// la pantalla, el escenario con sus candilejas y la moqueta con las luces del pasillo
function g_butacasFija(R) {
  const { rect, pset, disco, poligono, linea } = R, K = C.k;
  rect(0, 0, 319, 179, g_hex('#140e18'));
  // las paredes laterales: paños acolchados con botones, un friso y el zócalo
  for (let x = 0; x < 320; x++) { if (x > 17 && x < 285) continue; for (let y = 14; y < 124; y++) { const px = (x < 160 ? x : x - 285) % 9, py = (y - 14) % 14; pset(x, y, px === 0 || py === 0 ? g_hex('#1c1220') : (px + py) % 7 === 3 ? g_hex('#2c1a2a') : px < 5 ? g_hex('#261624') : g_hex('#221422')); if (px === 4 && py === 7) pset(x, y, g_hex('#4a2a34')); if (x > 276 && y < 48) pset(x, y, g_hex('#221422')); } }
  for (const [a, b] of [[0, 17], [285, 319]]) { rect(a, 100, b, 101, g_hex('#3a2228')); rect(a, 102, b, 123, g_hex('#1a1016')); for (let x = a + 2; x < b; x += 5) rect(x, 104, x, 121, g_hex('#22141c')); }
  // la puerta de salida a la derecha, con su cortina, y el letrero verde a la izquierda
  rect(296, 62, 317, 123, K); rect(297, 63, 316, 123, g_hex('#3a1420')); for (let x = 298; x < 316; x += 3) rect(x, 64, x, 122, g_hex('#2a0e18')); rect(297, 63, 316, 65, g_hex('#5a3a20')); rect(300, 52, 313, 59, K); rect(301, 53, 312, 58, g_hex('#1e8a4a')); R.icono('flecha', 304, 53, g_hex('#d8ffd8'), g_hex('#0e5a2a'), 1);
  rect(1, 30, 16, 40, K); rect(2, 31, 15, 39, g_hex('#1e8a4a')); R.icono('flecha', 6, 32, g_hex('#d8ffd8'), g_hex('#0e5a2a'), 1); for (let x = 0; x < 18; x++) if (g_b4(x, 41) < 0.5) pset(x, 41, g_hex('#16402a'));
  // la bambalina de terciopelo, con sus pliegues y un fleco apagado (la barra del año va encima: nada que brille)
  for (let x = 0; x < 320; x++) { const pl = Math.sin(x * 0.5) > 0; for (let y = 0; y <= 15; y++) { const luz = Math.abs(x - 151) < 60 + y * 4 && y > 9; pset(x, y, pl ? (luz ? g_hex('#6a1e2a') : g_hex('#521620')) : (luz ? g_hex('#4e141e') : g_hex('#3e0e18'))); } pset(x, 16, (x & 1) ? g_hex('#6a4a24') : g_hex('#4a3218')); if ((x % 3) === 0) pset(x, 17, g_hex('#4a3218')); }
  // el marco de la pantalla y la pantalla en penumbra (el resplandor o lo que pinte la escena, en vivo)
  rect(31, 21, 271, 111, K); rect(32, 22, 270, 110, g_hex('#2a2028')); g_deg(R, G_PANT[0], G_PANT[1], G_PANT[2], G_PANT[3], ['#2e2a36', '#383442', '#42404e'].map(g_hex)); for (let k = 0; k < 60; k++) pset(G_PANT[0] + Math.floor(h(k, 1, 372) * 234), G_PANT[1] + Math.floor(h(k, 2, 372) * 84), g_hex('#34303e'));
  // el escenario bajo la pantalla: el frente de madera con casetones, las candilejas y dos altavoces
  rect(18, 112, 284, 113, g_hex('#5a3a30')); rect(18, 114, 284, 122, g_hex('#2a1a1e')); for (let x = 24; x < 282; x += 26) { rect(x, 116, x + 20, 120, g_hex('#22141a')); rect(x, 116, x + 20, 116, g_hex('#3a2428')); }
  for (let x = 40; x < 270; x += 18) { rect(x, 110, x + 3, 111, g_hex('#3a3440')); pset(x + 1, 109, g_hex('#e8c880')); }
  for (const x of [20, 274]) { rect(x, 96, x + 9, 111, K); rect(x + 1, 97, x + 8, 110, g_hex('#2a2630')); disco(x + 4, 101, 2, g_hex('#18141c')); disco(x + 5, 106, 3, g_hex('#18141c')); pset(x + 4, 101, g_hex('#4a4654')); }
  // la moqueta en cuesta, con su dibujo de rombos y las lucecitas del pasillo
  rect(0, 123, 319, 179, g_hex('#1c0e16')); for (let y = 124; y < 180; y += 3) for (let x = (y % 6) * 2; x < 320; x += 12) { pset(x, y, g_hex('#2c1420')); pset(x + 1, y + 1, g_hex('#2c1420')); pset(x - 1, y + 1, g_hex('#2c1420')); }
  rect(0, 123, 319, 123, g_hex('#3a2228'));
}

// la sala desde el fondo (cámara 'butacas'): la pantalla con su resplandor de arena (o en penumbra con o.pantalla false),
// el telón que se mece, los apliques, el haz del proyector con polvo y la luz de la pantalla en el escenario
function g_butacas(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, luz = Math.max(0, Math.min(1, o.luz ?? 1)), on = o.pantalla !== false && luz > 0.03, par = 0.86 + 0.14 * Math.sin(t * 5.3) * Math.sin(t * 2.1);
  R.copiar(g_capa(R, 'butacas', () => g_butacasFija(R)));
  if (on) { g_resplandor(R, G_PANT[0], G_PANT[1], G_PANT[2], G_PANT[3], t, luz * par);
    // las esquinas de la pantalla, en penumbra, y el reflejo en el marco
    for (const [cx, cy, sx, sy] of [[34, 24, 1, 1], [268, 24, -1, 1], [34, 108, 1, -1], [268, 108, -1, -1]]) for (let j = 0; j < 12; j++) for (let i = 0; i < 16 - j; i++) if (g_b4(cx + i * sx, cy + j * sy) > (i + j * 1.3) / 15) pset(cx + i * sx, cy + j * sy, g_mez(R.pget(cx + i * sx, cy + j * sy), C.k, 0.45)); }
  const LUZ = on ? g_mez(g_hex('#3a2a2a'), g_hex('#f0c078'), luz * par) : g_hex('#4a4654');
  // la luz de la pantalla en el borde del escenario y en la moqueta
  for (let x = 36; x < 268; x++) { if (g_b4(x, 112) < 0.75) pset(x, 112, g_mez(g_hex('#5a3a30'), LUZ, 0.6)); for (let y = 124; y < 130; y++) if (g_b4(x, y) < 0.34 - (y - 124) * 0.05 - Math.abs(x - 151) / 500) pset(x, y, g_mez(g_hex('#1c0e16'), LUZ, 0.4)); }
  // el telón recogido a los lados, con sus pliegues, que se mece un poco, y sus alzapaños dorados
  for (const [x0, d] of [[25, 1], [277, -1]]) { for (let y = 18; y < 112; y++) { const ancho = 15 - Math.round(Math.max(0, 56 - Math.abs(y - 64)) / 9), m = y < 44 ? 0 : Math.round(Math.sin(t * 0.6 + y * 0.04) * 0.8);
      for (let i = 0; i <= ancho; i++) { const x = x0 + d * (i - ancho / 2) + m, f = Math.sin((i + y * 0.02) * 1.3); pset(Math.round(x), y, f > 0.4 ? g_mez(g_hex('#8a2230'), LUZ, 0.12) : f > -0.3 ? g_hex('#6a1a26') : g_hex('#4a1018')); } }
    rect(x0 - 4, 62, x0 + 4, 64, g_hex('#b08a30')); disco(x0 + d * 5, 66, 2, g_hex('#8a6a20')); }
  // los apliques art déco de las paredes, con su halo tenue que late
  for (const [x, y, k] of [[8, 66, 0]]) { if (k === 0) R.halo(x, y - 3, 10, [g_hex('#2a1a22'), g_hex('#3e2828'), g_hex('#5a3a30')], 1.0 + 0.1 * Math.sin(t * 1.7)); poligono([[x - 4, y - 6], [x + 4, y - 6], [x + 2, y], [x - 2, y]], g_hex('#a87820')); rect(x - 3, y - 7, x + 3, y - 6, g_hex('#ffe0a0')); rect(x - 1, y, x + 1, y + 3, g_hex('#a87820')); }
  // el haz del proyector, que llega desde detrás de nosotros, y las motas que bailan en él
  if (on) { for (let y = 18; y < 24; y++) for (let x = 176; x < 262; x++) { const u = (y - 0) / 24, a = 214 - 40 * u, b = 222 + 42 * u; if (x > a && x < b && g_b4(x, y) < 0.16 * par) pset(x, y, g_mez(R.pget(x, y), g_hex('#f4e4c0'), 0.3)); }
    for (let y = 0; y < 18; y++) { const a = 214 - 28 * (y / 18), b = 222 + 30 * (y / 18); for (let x = Math.max(176, Math.round(a)); x < Math.min(270, b); x++) if (g_b4(x, y) < 0.2 * par) pset(x, y, g_mez(R.pget(x, y), g_hex('#f4e4c0'), 0.25)); }
    for (let k = 0; k < 14; k++) { const y = Math.round(1 + ((h(k, 2, 373) * 22 + t * (2 + k % 3)) % 22)), x = Math.round(196 + h(k, 1, 373) * 44 + Math.sin(t * 0.7 + k) * 5); if (Math.sin(t * 1.7 + k * 3) > -0.2) pset(x, y, g_hex('#f4ecd0')); } }
  // las candilejas, que parpadean una a una
  for (let x = 40, k = 0; x < 270; x += 18, k++) if (Math.sin(t * 1.1 + k * 0.9) > 0.2) pset(x + 1, 109, g_hex('#fff0c0'));
  // las lucecitas del pasillo
  for (let x = 8; x < 320; x += 40) { pset(x, 126, g_hex('#e8a040')); pset(x + 1, 126, g_hex('#a86a2a')); }
  return { suelo: 124, pantalla: [...G_PANT], escenario: [18, 112, 284, 122], filas: [132, 149, 166], asiento: (fila, k) => [8 + k * 26 + (fila % 2) * 13, 132 + fila * 17], salida: [306, 123], luz: LUZ };
}

// las tres filas de butacas de espaldas con su público (o.lleno 0–1): cabezas con el filo de luz de la pantalla, hombros,
// respaldos rojos con su ribete; las vacías enseñan el respaldo y el asiento levantado; alguien come palomitas, una
// pareja se arrima, otro se ríe y, si la época no es 1984, un móvil que se enciende un momento
function g_butacasDelante(R, t, o = {}) {
  const { rect, pset, disco } = R, K = C.k, lleno = Math.max(0, Math.min(1, o.lleno ?? 0.5)), on = o.pantalla !== false && (o.luz ?? 1) > 0.03, LUZ = on ? g_hex('#f0c078') : g_hex('#8a8698');
  const PEL = G_PELOS.map(([a, b]) => [g_hex(a), g_hex(b)]), PIE = G_PIELES.map(g_hex), movil = o.epoca && +o.epoca !== 1984 && (t % 11) < 1.6;
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 12; k++) {
    let x = 8 + k * 26 + (fila % 2) * 13; const y0 = 132 + fila * 17, hay = lleno >= 1 || h(k, fila, 374) < lleno, rie = hay && fila === 2 && k === 7 && (t % 7) < 2.2 && Math.sin(t * 11) > 0, y = y0 - (rie ? 1 : 0), tipo = (k * 7 + fila * 3) % 6, pelo = PEL[(k * 5 + fila) % 6], piel = PIE[(k + fila * 2) % 4];
    const junto = fila === 1 && (k === 4 || k === 5) && (lleno >= 1 || (h(4, 1, 374) < lleno && h(5, 1, 374) < lleno)); if (junto) x += k === 4 ? 3 : -3;
    if (hay) { rect(x - 10, y + 5, x + 10, y + 18, g_hex(['#1a141e', '#22202e', '#2a1a1e', '#1a2226'][(k + fila) % 4])); g_cabeza(R, x, y, tipo, pelo, piel, g_mez(pelo[0], LUZ, 0.7));
      // el que come palomitas: la mano sube a la boca
      if (fila === 0 && k === 3) { const u = (t % 3.2) / 3.2, my = u < 0.3 ? y + 6 - Math.round(u / 0.3 * 5) : u < 0.5 ? y + 1 : y + 6; rect(x + 9, my, x + 11, my + 2, piel); pset(x + 10, my - 1, g_hex('#fff4c8')); }
      if (fila === 0 && k === 9 && movil) { rect(x - 2, y + 6, x + 2, y + 9, g_hex('#c8e0ff')); for (let i = -4; i <= 4; i++) pset(x + i, y + 7 - Math.round(Math.sqrt(Math.max(0, 16 - i * i))), g_hex('#8aa8e8')); } }
    // el respaldo de la butaca, por delante de la espalda: el canto con ribete, el paño capitoné y el número
    rect(x - 12, y0 + 8, x + 12, y0 + 19, K); rect(x - 11, y0 + 9, x + 11, y0 + 19, g_hex('#5e1824')); rect(x - 11, y0 + 9, x + 11, y0 + 9, g_mez(g_hex('#9a2e3a'), LUZ, on ? 0.35 : 0.1)); rect(x - 10, y0 + 10, x + 10, y0 + 10, g_hex('#7a222e'));
    pset(x - 11, y0 + 9, K); pset(x + 11, y0 + 9, K); rect(x - 11, y0 + 11, x - 11, y0 + 19, g_hex('#4a101a')); rect(x + 11, y0 + 11, x + 11, y0 + 19, g_hex('#4a101a')); for (const dx of [-6, 0, 6]) pset(x + dx, y0 + 13, g_hex('#46101a')); rect(x - 1, y0 + 16, x + 1, y0 + 17, g_hex('#a88430'));
    if (!hay) { rect(x - 8, y0 + 3, x + 8, y0 + 8, K); rect(x - 7, y0 + 4, x + 7, y0 + 8, g_hex('#6e1c28')); rect(x - 7, y0 + 4, x + 7, y0 + 4, g_mez(g_hex('#9a2e3a'), LUZ, 0.3)); }
    rect(x - 13, y0 + 12, x - 13, y0 + 19, g_hex('#2a1a1e')); rect(x + 13, y0 + 12, x + 13, y0 + 19, g_hex('#2a1a1e'));
  }
  rect(0, 177, 319, 179, g_hex('#2a0a14'));
  return {};
}

// los asientos de la fila de los protagonistas en la sala vista desde la pantalla (o.frente): [x, y de los pies]
const G_ASIENTOS = Array.from({ length: 13 }, (_, k) => [15 + k * 23, 159]);
// lo fijo de la sala vista desde la pantalla (o.frente): el techo de casetones, la pared del fondo acolchada con la luz
// de los apliques, la cabina de proyección, las puertas con ojo de buey y sus letreros de salida, los carteles, el
// extintor, la moqueta de rombos, el pasillo con su alfombra y sus peldaños, y las tres filas de butacas de cara
function g_patioFija(R) {
  const { rect, pset, disco, poligono, linea } = R, K = C.k;
  rect(0, 0, 319, 179, g_hex('#181018'));
  // el techo en penumbra: casetones con sus vigas (un canto claro y otro en sombra), dos ojos de buey apagados y la moldura con dentículos
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) { const v = (x + 12) % 40; pset(x, y, v < 2 ? g_hex('#1c121c') : v === 2 ? g_hex('#2a1c28') : y === 10 ? g_hex('#1c121c') : y === 11 ? g_hex('#281a26') : (x + y * 3) % 11 === 0 ? g_hex('#261a26') : g_hex('#221622')); }
  for (const x of [208, 248]) { rect(x - 3, 16, x + 3, 18, g_hex('#161016')); rect(x - 2, 17, x + 2, 17, g_hex('#4a3430')); pset(x, 17, g_hex('#6a4a38')); }
  rect(0, 22, 319, 23, g_hex('#3a2428')); for (let x = 1; x < 320; x += 4) rect(x, 23, x + 1, 23, g_hex('#5a3a30')); rect(0, 24, 319, 24, K);
  // la pared del fondo: paños acolchados granates con botones, que se aclaran (tramado) alrededor de los dos apliques
  { const P = [['#2a121c', '#34161e', '#401c24'], ['#6a3038', '#7c3c3e', '#905044'], ['#44202a', '#52262e', '#603036'], ['#3a1a26', '#48202a', '#582a32']].map((r) => r.map(g_hex));
    for (let y = 25; y < 98; y++) for (let x = 0; x < 320; x++) { const px = x % 10, py = (y - 25) % 12; if (x > 274 && y < 48) { pset(x, y, px === 0 || py === 0 ? g_hex('#34171f') : P[3][0]); continue; } const g = Math.max(1 - Math.hypot(x - 108, (y - 56) * 1.2) / 46, 1 - Math.hypot(x - 246, (y - 62) * 1.2) / 36), b = g_b4(x, y), l = g > 0.5 && (g - 0.5) * 2.2 > b ? 2 : g > 0 && g * 1.6 > b ? 1 : 0;
      pset(x, y, P[px === 0 || py === 0 ? 0 : px === 5 && py === 6 ? 1 : (px + py) % 9 === 2 ? 2 : 3][l]); } }
  for (const x of [0, 62, 150, 250]) { rect(x, 25, x + 5, 97, g_hex('#2a1a20')); rect(x + 1, 25, x + 1, 97, g_hex('#4a2e30')); rect(x + 4, 25, x + 4, 97, g_hex('#1e1218')); rect(x - 1, 25, x + 6, 27, g_hex('#5a3a30')); rect(x - 1, 28, x + 6, 28, g_hex('#2a1a20')); }
  rect(0, 86, 319, 97, g_hex('#2a1a1c')); rect(0, 86, 319, 86, g_hex('#5a3a30')); for (let x = 4; x < 320; x += 14) { rect(x, 89, x + 9, 95, g_hex('#22141a')); rect(x, 89, x + 9, 89, g_hex('#1a0e14')); rect(x, 95, x + 9, 95, g_hex('#3a2428')); }
  // dos carteles enmarcados en la penumbra (formas abstractas), con su lucecita
  for (const [x0, k] of [[74, 0], [122, 1]]) { rect(x0 - 2, 42, x0 + 22, 74, K); rect(x0 - 1, 43, x0 + 21, 73, g_hex('#8a6a20')); g_cartel(R, x0, 44, x0 + 20, 72, 0, k); for (let y = 44; y <= 72; y++) for (let x = x0; x <= x0 + 20; x++) pset(x, y, g_mez(R.pget(x, y), g_hex('#2a121c'), 0.5)); rect(x0 + 6, 39, x0 + 14, 40, g_hex('#a88430')); pset(x0 + 10, 41, g_hex('#ffe0a0')); for (let x = x0 + 4; x < x0 + 17; x++) if (g_b4(x, 45) < 0.5) pset(x, 45, g_mez(R.pget(x, 45), g_hex('#ffe0a0'), 0.4)); }
  // la cabina de proyección: el cajón con sus remaches y su rejilla, el ventanuco del proyector (su luz, en vivo) y los dos del operador
  rect(170, 26, 240, 44, K); rect(171, 27, 239, 43, g_hex('#22161e')); rect(171, 27, 239, 27, g_hex('#3a2830')); rect(178, 31, 186, 37, K); rect(179, 32, 185, 36, g_hex('#3a3028')); rect(224, 31, 232, 37, K); rect(225, 32, 231, 36, g_hex('#3a3028')); rect(197, 30, 211, 38, K); rect(170, 44, 240, 45, g_hex('#4a2e30'));
  for (let x = 173; x < 238; x += 8) pset(x, 41, g_hex('#3a2830')); for (let y = 31; y < 38; y += 2) { rect(189, y, 194, y, g_hex('#160e14')); rect(214, y, 221, y, g_hex('#160e14')); } rect(171, 43, 239, 43, g_hex('#160e14'));
  // las puertas del fondo, con ojo de buey y barra, y su letrero de salida
  for (const [x, y] of [[26, 52], [272, 54]]) { rect(x - 1, y - 1, x + 25, 97, K); rect(x, y, x + 11, 97, g_hex('#4a2a20')); rect(x + 13, y, x + 24, 97, g_hex('#4a2a20')); rect(x, y, x + 24, y, g_hex('#6a4230')); for (const dx of [5, 18]) { disco(x + dx, y + 11, 3, K); disco(x + dx, y + 11, 2, g_hex('#5a6a7a')); pset(x + dx - 1, y + 10, g_hex('#9ab0c0')); } rect(x + 2, y + 24, x + 9, y + 25, g_hex('#a88430')); rect(x + 15, y + 24, x + 22, y + 25, g_hex('#a88430')); rect(x + 12, y, x + 12, 97, K);
    for (const dx of [1, 14]) { rect(x + dx, y + 30, x + dx + 9, y + 30, g_hex('#38201a')); rect(x + dx, y + 31, x + dx + 9, y + 31, g_hex('#5a3628')); rect(x + dx + 9, y + 2, x + dx + 9, y + 28, g_hex('#3e2218')); }
    rect(x + 5, y - 10, x + 19, y - 3, K); rect(x + 6, y - 9, x + 18, y - 4, g_hex('#1e8a4a')); R.icono('flecha', x + 9, y - 9, g_hex('#d8ffd8'), g_hex('#0e5a2a'), 1); for (let i = x + 2; i < x + 23; i++) if (g_b4(i, y - 2) < 0.45) pset(i, y - 2, g_hex('#16402a')); }
  // el extintor en su soporte, junto a la pilastra
  rect(158, 60, 163, 62, K); rect(159, 61, 162, 61, g_hex('#3a3a44')); rect(158, 63, 163, 75, K); rect(159, 64, 162, 74, g_hex('#a8262c')); rect(159, 64, 159, 74, g_hex('#d04a48')); rect(160, 68, 162, 69, g_hex('#e8dcc0')); pset(164, 62, K); pset(165, 63, K); pset(165, 64, K);
  // la moqueta de rombos y los cantos de los escalones de la grada
  g_moqueta(R, 0, 98, 319, 179);
  for (const y of [100, 118]) { rect(0, y, 319, y, g_hex('#3a2228')); for (let x = 0; x < 320; x += 2) pset(x, y, g_hex('#4a2c30')); rect(0, y + 1, 319, y + 2, g_hex('#140a10')); }
  rect(0, 151, 319, 152, g_hex('#140a10'));
  // el pasillo que baja entre las butacas: la alfombra roja con su ribete de latón y un peldaño cada seis píxeles
  for (let y = 98; y <= 127; y++) { const xa = Math.round(211 - (y - 98) * 0.34), xb = Math.round(237 + (y - 98) * 0.14), pel = (y - 98) % 6;
    for (let x = xa; x <= xb; x++) pset(x, y, pel === 0 ? g_hex('#7a5438') : pel === 1 ? g_hex('#1a0a10') : ((x + (y >> 1)) % 6 === 0 || (x - (y >> 1) + 60) % 6 === 0) ? g_hex('#6a2030') : (x + y) % 2 ? g_hex('#4a1622') : g_hex('#441420'));
    pset(xa, y, g_hex('#8a6a30')); pset(xb, y, g_hex('#8a6a30')); pset(xa - 1, y, g_hex('#120810')); pset(xb + 1, y, g_hex('#120810')); }
  // las tres filas de butacas de cara: las del fondo pequeñas, las del medio y las de los protagonistas, con sus brazos de madera
  for (let k = 0; k < 20; k++) { if (G_HUECO[0].includes(k)) continue; const x = 8 + k * 16; g_butacaCara(R, x, 88, 100, 5, 5, 2); rect(x - 7, 95, x - 7, 100, g_hex('#2a1a1e')); pset(x - 7, 94, g_hex('#4a2e30')); }
  for (let k = 0; k < 16; k++) { if (G_HUECO[1].includes(k)) continue; const x = 10 + k * 20; g_butacaCara(R, x, 103, 118, 7, 7, 3); rect(x - 9, 111, x - 9, 118, g_hex('#2a1a1e')); rect(x - 10, 110, x - 8, 110, g_hex('#4a2e30')); }
  rect(199, 111, 199, 118, g_hex('#2a1a1e')); rect(198, 110, 200, 110, g_hex('#4a2e30'));
  G_ASIENTOS.forEach(([ax]) => { const x = ax + 7; g_butacaCara(R, x, 128, 150, 10, 5, 3, true); });
  for (let k = 0; k <= 13; k++) { const x = 10 + k * 23; rect(x - 1, 140, x + 1, 150, K); rect(x, 141, x, 150, g_hex('#3a2428')); rect(x - 2, 139, x + 2, 140, K); rect(x - 1, 139, x + 1, 139, g_hex('#6a4636')); pset(x - 1, 139, g_hex('#8a6a50')); pset(x, 144, g_hex('#5a3a30')); }
}
// la sala desde la pantalla (o.frente): la luz del proyector que sale de la cabina, con polvo; el público de las filas
// del fondo y del medio (cabezas pequeñas de cara, o.lleno), alumbrado por la pantalla, que parpadea; uno come
// palomitas; el acomodador con su linterna; los extras sentados en la fila de los protagonistas (salvo en
// o.reservados) y los apliques
function g_patio(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, K = C.k, lleno = Math.max(0, Math.min(1, o.lleno ?? 0.5)), luz = Math.max(0, Math.min(1, o.luz ?? 1)), par = luz * (0.8 + 0.2 * Math.sin(t * 5.3) * Math.sin(t * 2.1)), res = o.reservados ?? [4, 7];
  R.copiar(g_capa(R, 'patio2', () => g_patioFija(R)));
  // el ventanuco del proyector y su haz: un cono tenue con rayos tramados que se abren hacia nosotros, y motas de polvo
  rect(198, 31, 210, 37, g_mez(g_hex('#8a7a5a'), g_hex('#fff8e0'), par)); rect(201, 33, 207, 35, g_hex('#ffffff')); if (par > 0.3) { pset(196, 34, g_hex('#b8a480')); pset(212, 34, g_hex('#b8a480')); pset(204, 29, g_hex('#b8a480')); }
  { const HAZ = g_hex('#f4e4c0'); for (let y = 38; y < 100; y++) { const u = (y - 38) / 62, a = 204 - 150 * u, b = 204 + 70 * u; for (let x = Math.max(0, Math.round(a)); x <= Math.min(319, Math.round(b)); x++) { if (x > 276 && y < 46) continue; const ray = Math.sin((x - 204) / (y - 30) * 9 + Math.floor(t * 9) * 0.7), bb = g_b4(x, y); if (ray > 0.2 && bb < (0.56 - u * 0.3) * par) pset(x, y, g_mez(R.pget(x, y), HAZ, 0.34)); else if (bb < (0.3 - u * 0.12) * par) pset(x, y, g_mez(R.pget(x, y), HAZ, 0.14)); } } }
  for (let k = 0; k < 26; k++) { const u = (h(k, 1, 381) + t * (0.04 + (k % 3) * 0.02)) % 1, y = Math.round(40 + u * 56), x = Math.round(204 + (h(k, 2, 381) - 0.68) * 205 * u + Math.sin(t * 0.9 + k) * 2.5), s = Math.sin(t * 1.7 + k * 3); if (s > -0.3 && !(x > 276 && y < 46)) { pset(x, y, s > 0.6 ? g_hex('#fffbe8') : g_hex('#d8c8a0')); if (k % 5 === 0 && s > 0.6) pset(x + 1, y, g_hex('#b8a480')); } }
  { const v = Math.sin(t * 0.8) > 0.6; rect(179, 32, 185, 36, g_hex('#4a3a2a')); disco(182 + (v ? 1 : 0), 35, 2, g_hex('#1a1418')); }   // el operador, que se asoma
  // el acomodador, que recorre el fondo con su linterna (queda detrás de las butacas del fondo; en el pasillo se le ven las piernas)
  { const u = (t / 22) % 1, ida = u < 0.5, x = Math.round(ida ? 60 + u * 2 * 200 : 260 - (u - 0.5) * 2 * 200), d = ida ? 1 : -1, an = Math.floor(t * 4) % 2; rect(x - 2, 74, x + 2, 87, g_hex('#1a1420')); rect(x - 2, 74, x + 2, 74, g_hex('#3a2a3a')); disco(x, 71, 2, g_hex('#c89a78')); rect(x - 2, 68, x + 2, 69, g_hex('#7a1c28')); pset(x + 3 * d, 79, g_hex('#c89a78')); pset(x + 4 * d, 79, g_hex('#fff4c0'));
    for (const i of [-2, -1, 1, 2]) { const px = x + i; if (px > 207 && px < 241) { rect(px, 88, px, 96 - (an && i * d > 0 ? 1 : 0), g_hex('#1a1420')); } } if (x > 209 && x < 239) rect(x - 2, 97, x + 2, 97, g_hex('#0e0810'));
    for (let i = 5; i < 20; i++) for (let j = -(i >> 2); j <= (i >> 2); j++) if (g_b4(x + i * d, 81 + (i >> 1) + j) < 0.5 - i * 0.02) { const px = x + i * d, py = 81 + (i >> 1) + j; if (py < 88) pset(px, py, g_mez(R.pget(px, py), g_hex('#fff4c0'), 0.4)); } if (an) pset(x - d, 88, g_hex('#1a1420')); }
  // los pilotos ámbar de los escalones y del pasillo, que guían en la penumbra
  for (const y of [101, 120]) for (let x = 6 + (y % 7); x < 320; x += 23) pset(x, y, Math.sin(t * 1.5 + x * 0.2) > -0.6 ? g_hex('#e8a040') : g_hex('#8a5a20'));
  for (let y = 104, k = 0; y <= 127; y += 6, k++) { const xa = Math.round(211 - (y - 98) * 0.34), xb = Math.round(237 + (y - 98) * 0.14), c = Math.floor(t * 1.2 + k) % 5 ? g_hex('#e8a040') : g_hex('#fff0c0'); pset(xa + 1, y, c); pset(xb - 1, y, c); }
  // los apliques de la pared, en abanico, con su halo
  for (const [x, y] of [[108, 60], [246, 66]]) { R.halo(x, y - 4, 11, [g_hex('#4a2228'), g_hex('#643030'), g_hex('#84483a')], 1.0 + 0.08 * Math.sin(t * 1.7 + x)); poligono([[x - 5, y - 7], [x + 5, y - 7], [x + 2, y], [x - 2, y]], g_hex('#a87820')); rect(x - 4, y - 8, x + 4, y - 7, g_hex('#ffe0a0')); rect(x - 1, y, x + 1, y + 3, g_hex('#a87820')); pset(x - 3, y - 5, g_hex('#d8a840')); pset(x - 1, y - 3, g_hex('#d8a840')); }
  // el público del fondo y del medio: cabezas de cara, con el reflejo de la pantalla; parpadean, alguno se ríe y otro come palomitas
  const PEL = G_PELOS.map(([a, b]) => [g_hex(a), g_hex(b)]), PIE = G_PIELES.map(g_hex), LUZ = g_mez(g_hex('#6a4a3a'), g_hex('#f4cc88'), par);
  for (let k = 0; k < 20; k++) { if (G_HUECO[0].includes(k) || !(lleno >= 1 || h(k, 5, 382) < lleno * 0.9)) continue; const x = 8 + k * 16, piel = g_mez(PIE[k % 4], LUZ, 0.25), pelo = PEL[(k * 3) % 6]; rect(x - 4, 84, x + 4, 88, g_hex(['#2a2a3a', '#3a2a2a', '#2a3a34'][k % 3])); rect(x - 4, 84, x + 4, 84, g_mez(g_hex('#3a3a4a'), LUZ, 0.35)); disco(x, 81, 3, K); disco(x, 81, 2, piel); rect(x - 2, 78, x + 2, 79, pelo[1]); if ((t * 0.7 + k * 0.37) % 4 > 0.15) { pset(x - 1, 81, K); pset(x + 1, 81, K); } }
  for (let k = 0; k < 16; k++) { if (G_HUECO[1].includes(k) || !(lleno >= 1 || h(k, 6, 382) < lleno)) continue; const x = 10 + k * 20, rie = k % 5 === 2 && (t % 6) < 1.6 && Math.sin(t * 12) > 0, y = 96 - (rie ? 1 : 0), piel = g_mez(PIE[(k + 1) % 4], LUZ, 0.25), pelo = PEL[(k * 5 + 1) % 6];
    rect(x - 6, y + 4, x + 6, y + 8, g_hex(['#2a3a5a', '#5a2a2a', '#3a4a3a', '#4a3a5a'][k % 4])); rect(x - 6, y + 4, x + 6, y + 4, g_mez(g_hex('#3a3a4a'), LUZ, 0.5)); disco(x, y, 5, K); disco(x, y, 4, piel); rect(x - 4, y - 4, x + 4, y - 2, pelo[0]); rect(x - 4, y - 2, x - 4, y, pelo[1]); rect(x + 4, y - 2, x + 4, y, pelo[1]); if (k % 4 === 1) rect(x - 4, y - 2, x - 3, y + 3, pelo[1]);
    if ((t * 0.6 + k * 0.41) % 3.4 > 0.14) { pset(x - 2, y, K); pset(x + 2, y, K); } pset(x - 1, y + 3, g_hex('#8a4a3a')); pset(x, y + 3, g_hex('#8a4a3a')); if (rie) pset(x + 1, y + 3, g_hex('#8a4a3a')); pset(x - 3, y + 1, g_mez(piel, g_hex('#f4cc88'), 0.5));
    // el de las palomitas: el cubo de rayas y la mano que sube a la boca
    if (k % 6 === 1) { const u = (t * 0.5 + k * 0.3) % 1, my = u < 0.25 ? y + 6 - Math.round(u / 0.25 * 3) : u < 0.4 ? y + 3 : y + 6; rect(x + 5, y + 5, x + 9, y + 8, K); rect(x + 6, y + 5, x + 8, y + 8, g_hex('#e8e0d0')); pset(x + 7, y + 6, g_hex('#c8343a')); pset(x + 7, y + 8, g_hex('#c8343a')); pset(x + 6, y + 4, g_hex('#f8eec0')); pset(x + 8, y + 4, g_hex('#f0d890')); pset(x + 4, my, piel); pset(x + 4, my - 1, g_hex('#f8eec0')); } }
  // la luz de la pantalla en lo alto de los respaldos de la fila de los protagonistas
  G_ASIENTOS.forEach(([ax]) => { for (let i = -8; i <= 8; i++) if (g_b4(ax + 7 + i, 129) < 0.35 + par * 0.5) pset(ax + 7 + i, 129, g_mez(g_hex('#a03040'), LUZ, 0.5)); });
  // los extras sentados en la fila de los protagonistas, según o.lleno
  const G = g_gente('sala'), ocupados = [];
  if (G.length) G_ASIENTOS.forEach(([ax, ay], k) => { if (res.includes(k) || !(lleno >= 1 || h(k, 7, 382) < lleno)) return; ocupados.push(k); R.actor(G[(k * 3 + 1) % G.length], ax, ay, t + k * 1.7, { dir: k % 2 ? -1 : 1, sonrisa: k % 3 === 0, sorpresa: k % 5 === 3 && (t % 8) > 6.5 }); });
  return { suelo: 159, asientos: G_ASIENTOS.map((a) => [...a]), reservados: res, ocupados, respaldos: 153, cabina: [204, 34], puertas: [[26, 52, 50, 97], [272, 54, 296, 97]] };
}
// la fila de delante vista desde la pantalla: los respaldos acanalados (por su cara de delante) con el asiento levantado,
// que tapan las piernas de los de detrás; los brazos de madera con su posavasos; un cubo de palomitas, un vaso con su
// pajita y un abrigo colgado; la luz de la pantalla, que parpadea en los cantos
function g_patioDelante(R, t, o = {}) {
  const { rect, pset, disco } = R, K = C.k, luz = Math.max(0, Math.min(1, o.luz ?? 1)), par = luz * (0.8 + 0.2 * Math.sin(t * 5.3) * Math.sin(t * 2.1)), LUZ = g_mez(g_hex('#6a4a3a'), g_hex('#f4cc88'), par), T = G_TERCIO.map(g_hex);
  rect(0, 158, 319, 179, g_hex('#12080e'));
  for (let k = 0; k < 14; k++) { const x = 10 + k * 23;
    g_butacaCara(R, x, 153, 179, 10, 5, 4); rect(x - 11, 153, x - 10, 153, g_hex('#12080e')); rect(x + 10, 153, x + 11, 153, g_hex('#12080e'));
    for (let i = -9; i <= 9; i++) pset(x + i, 154, g_mez(T[6], LUZ, 0.25 + 0.3 * par));
    // el asiento levantado: el cojín con su canto alumbrado, el ribete, dos botones y la sombra que echa en el respaldo
    for (let i = -8; i <= 8; i++) if (g_b4(x + i, 166) < 0.6) pset(x + i, 166, T[1]);
    rect(x - 8, 167, x + 8, 179, K);
    for (let y = 168; y <= 179; y++) for (let i = -7; i <= 7; i++) { let l = y === 168 ? 6 : y === 169 ? 5 : 4; if ((y - 168) / 11 * 1.5 - 0.3 > g_b4(x + i, y)) l--; if (Math.abs(i) === 7) l -= 1; if (Math.abs(i) === 6 && y > 169) l += 1; pset(x + i, y, y === 168 ? g_mez(T[l], LUZ, 0.3 * par) : T[l]); }
    for (const dx of [-3, 3]) { pset(x + dx, 173, T[1]); pset(x + dx, 174, T[5]); } rect(x - 1, 177, x + 1, 177, g_hex('#a88430')); pset(x, 177, g_hex('#e8c860'));
    // el brazo: el canto de madera con su posavasos y el frente con su veta
    rect(x - 14, 162, x - 10, 179, K); rect(x - 13, 163, x - 11, 179, g_hex('#3a2428')); rect(x - 12, 165, x - 12, 179, g_hex('#4a2e30')); rect(x - 13, 162, x - 11, 163, g_hex('#6a4636')); pset(x - 13, 162, g_mez(g_hex('#8a6a50'), LUZ, 0.4)); pset(x - 12, 163, g_hex('#2a1a1e')); pset(x - 12, 170, g_hex('#a88430')); }
  // un cubo de palomitas olvidado en un brazo, un vaso con su pajita en otro y un abrigo colgado de un respaldo
  { const x = 10 + 2 * 23 + 11; rect(x - 3, 155, x + 3, 162, K); rect(x - 2, 156, x + 2, 162, g_hex('#e8e0d0')); rect(x - 1, 156, x - 1, 162, g_hex('#c8343a')); rect(x + 1, 156, x + 1, 162, g_hex('#c8343a')); for (let i = -3; i <= 3; i++) pset(x + i, 154 - (Math.abs(i) < 2 ? 1 : 0), g_hex('#fff4c8')); pset(x - 1, 153, g_hex('#f0d890')); }
  { const x = 10 + 9 * 23 - 12; rect(x - 3, 156, x + 2, 162, K); rect(x - 2, 157, x + 1, 162, g_hex('#d8e4ec')); rect(x - 2, 159, x + 1, 160, g_hex('#3a6ab8')); rect(x - 2, 157, x + 1, 157, g_hex('#f8fcff')); pset(x + 1, 156, g_hex('#e04a4a')); pset(x + 2, 155, g_hex('#e04a4a')); pset(x + 2, 154, g_hex('#f08a8a')); }
  { const x = 10 + 10 * 23; rect(x - 8, 153, x + 6, 166, K); rect(x - 7, 154, x + 5, 165, g_hex('#3a4a5a')); rect(x - 7, 154, x + 5, 154, g_hex('#5a6e82')); rect(x - 2, 155, x - 2, 165, g_hex('#2a3644')); rect(x - 6, 156, x - 6, 164, g_hex('#44566a')); rect(x + 4, 156, x + 4, 164, g_hex('#2e3c4a')); pset(x + 2, 158, g_hex('#c8a040')); pset(x + 2, 162, g_hex('#c8a040')); rect(x - 7, 165, x + 5, 165, g_hex('#2a3644')); }
  return {};
}
// lo fijo de la sala de subastas de París: el techo con su cornisa, la boiserie clara con molduras, el ventanal (el marco;
// la vista, en vivo), los cuadros abstractos, la pantalla (el marco), la puerta, el reloj, el pedestal, los postes con
// cordón, la tarima del subastador y el parqué en espiga
const G_SUB = { pantalla: [100, 33, 198, 65], ventana: [16, 38, 50, 104], pedestal: [160, 120], tribuna: [243, 112], mesa: [6, 127, 94, 139] };

function g_subastaFija(R) {
  const { rect, pset, disco, poligono, linea } = R, K = C.k, W = g_hex('#d9d4c2'), WS = g_hex('#c2bca8'), WL = g_hex('#ebe7d8'), WD = g_hex('#a8a28e');
  // el techo, la cornisa con dentículos y la pared con sus grandes paños de moldura
  rect(0, 0, 319, 21, g_hex('#e4e0d2')); for (let y = 0; y < 21; y++) for (let x = 0; x < 320; x++) if (g_b4(x, y) < (21 - y) / 70) pset(x, y, g_hex('#dcd8ca'));
  rect(0, 22, 319, 23, WL); rect(0, 24, 319, 26, WS); for (let x = 2; x < 276; x += 6) rect(x, 25, x + 2, 26, WD); rect(0, 27, 319, 27, g_hex('#8a8472'));
  rect(0, 28, 319, 139, W); for (let y = 28; y < 110; y++) for (let x = 0; x < 320; x++) { if (x > 272 && y < 50) continue; const v = h(x >> 1, y >> 1, 401); if (v < 0.05) pset(x, y, WS); else if (v > 0.97) pset(x, y, WL); }
  for (const [a, b, y0] of [[4, 62, 31], [66, 92, 31], [96, 202, 31], [206, 236, 31], [240, 272, 31], [280, 316, 50]]) { rect(a, y0, b, y0, WS); rect(a, 106, b, 106, WL); rect(a, y0, a, 106, WS); rect(b, y0, b, 106, WL); rect(a + 2, y0 + 2, b - 2, y0 + 2, WL); rect(a + 2, 104, b - 2, 104, WS); rect(a + 2, y0 + 2, a + 2, 104, WL); rect(b - 2, y0 + 2, b - 2, 104, WS); for (const [cx, cy] of [[a + 2, y0 + 2], [b - 2, y0 + 2], [a + 2, 104], [b - 2, 104]]) pset(cx, cy, WD); }
  // el friso, el arrimadero de madera pintada con casetones y el rodapié
  rect(0, 108, 319, 109, WL); rect(0, 110, 319, 111, WD); rect(0, 112, 319, 139, g_hex('#bdb6a0')); for (let x = 4; x < 320; x += 28) { rect(x, 115, x + 22, 134, g_hex('#b0a992')); rect(x, 115, x + 22, 115, g_hex('#9a937c')); rect(x, 115, x, 134, g_hex('#9a937c')); rect(x + 1, 134, x + 22, 134, g_hex('#d0cab6')); rect(x + 22, 116, x + 22, 134, g_hex('#d0cab6')); }
  rect(0, 136, 319, 139, g_hex('#8e8770')); rect(0, 136, 319, 136, g_hex('#a8a28a'));
  // el ventanal: el marco, la falleba y las cortinas recogidas con su galería (la vista de los tejados va en vivo)
  { const [a, y0, b, y1] = G_SUB.ventana; rect(a - 3, y0 - 3, b + 3, y1 + 3, g_hex('#8a8472')); rect(a - 2, y0 - 2, b + 2, y1 + 2, WL); rect(a - 1, y0 - 1, b + 1, y1 + 1, K); rect(a - 4, y1 + 4, b + 4, y1 + 5, WL); rect(a - 4, y1 + 6, b + 4, y1 + 6, WD);
    rect(a - 7, y0 - 8, b + 7, y0 - 4, g_hex('#6a5a4a')); rect(a - 7, y0 - 8, b + 7, y0 - 8, g_hex('#c8a040')); for (let x = a - 6; x < b + 7; x += 3) pset(x, y0 - 3, g_hex('#c8a040')); }
  // los cuadros de marco dorado (manchas abstractas) y su lucecita de latón
  for (const [x0, y0, x1, y1, k] of [[70, 48, 88, 76, 0], [210, 52, 232, 78, 1]]) { rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, K); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, g_hex('#c8a040')); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, g_hex('#f0d880')); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, g_hex('#8a6a20'));
    if (k === 0) { rect(x0, y0, x1, y1, g_hex('#2a4a6a')); disco(x0 + 6, y0 + 9, 5, g_hex('#e8804a')); rect(x0, y1 - 9, x1, y1, g_hex('#e8d8a0')); rect(x0 + 10, y0 + 12, x1 - 2, y0 + 14, g_hex('#f0e8d0')); poligono([[x0 + 2, y1 - 2], [x0 + 9, y1 - 14], [x0 + 15, y1 - 2]], g_hex('#1c2c40')); }
    else { rect(x0, y0, x1, y1, g_hex('#e8dcc0')); disco(x0 + 8, y0 + 10, 6, g_hex('#3a7a6a')); disco(x0 + 15, y0 + 15, 6, g_hex('#d8904a')); disco(x0 + 11, y0 + 13, 2, g_hex('#8a5a3a')); for (let i = 0; i < 5; i++) pset(x0 + 3 + i * 4, y1 - 3 - (i % 2) * 2, g_hex('#2a2a3a')); linea(x0 + 2, y1 - 6, x1 - 2, y0 + 3, g_hex('#2a2a3a')); }
    rect(((x0 + x1) >> 1) - 4, y0 - 7, ((x0 + x1) >> 1) + 4, y0 - 6, g_hex('#a88430')); pset((x0 + x1) >> 1, y0 - 5, g_hex('#fff0c0')); }
  // la pantalla colgada: el marco negro y sus dos tirantes (la cifra, en vivo)
  { const [a, y0, b, y1] = G_SUB.pantalla; rect(a + 14, 28, a + 14, y0 - 3, g_hex('#5a5a62')); rect(b - 14, 28, b - 14, y0 - 3, g_hex('#5a5a62')); rect(a - 3, y0 - 3, b + 3, y1 + 3, K); rect(a - 2, y0 - 2, b + 2, y1 + 2, g_hex('#2a2c36')); rect(a - 2, y0 - 2, b + 2, y0 - 2, g_hex('#4a4e5c')); rect(a, y0, b, y1, g_hex('#10141e')); pset(b + 1, y1 + 1, g_hex('#3ae06a')); }
  // la puerta de dos hojas con molduras, a la derecha, y el reloj de latón
  rect(283, 62, 311, 139, g_hex('#8a8472')); rect(285, 64, 309, 139, g_hex('#cfc9b4')); rect(297, 64, 297, 139, g_hex('#8a8472')); for (const x of [287, 299]) { rect(x, 68, x + 8, 96, g_hex('#c0baa4')); rect(x, 68, x + 8, 68, WD); rect(x, 68, x, 96, WD); rect(x, 102, x + 8, 134, g_hex('#c0baa4')); rect(x, 102, x + 8, 102, WD); rect(x, 102, x, 134, WD); } rect(294, 100, 295, 103, g_hex('#c8a040')); rect(299, 100, 300, 103, g_hex('#c8a040')); rect(281, 59, 313, 61, WL); rect(281, 62, 313, 62, WD);
  disco(258, 52, 8, K); disco(258, 52, 7, g_hex('#c8a040')); disco(258, 52, 5, g_hex('#f4f0e0')); for (let a = 0; a < 12; a++) pset(Math.round(258 + Math.cos(a * Math.PI / 6) * 4), Math.round(52 + Math.sin(a * Math.PI / 6) * 4), g_hex('#5a5448')); pset(256, 47, g_hex('#f0d880'));
  // el parqué en espiga, con el brillo de la ventana y la alfombra del pasillo
  rect(0, 140, 319, 179, g_hex('#a87a48')); for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const d = ((x >> 3) & 1) ? (x + y) % 8 : (x - y + 800) % 8; if (d === 0) pset(x, y, g_hex('#7e5a34')); else if ((x & 7) === 0) pset(x, y, g_hex('#8e6638')); else if (h(x >> 2, y, 402) < 0.1) pset(x, y, g_hex('#b88a54')); }
  rect(0, 140, 319, 140, g_hex('#5e4226')); for (let y = 141; y < 150; y++) for (let x = 20; x < 80; x++) if (g_b4(x, y) < 0.3 - Math.abs(x - 50) / 110) pset(x, y, g_hex('#d0a468'));
  // el pedestal del lote: la columna con su basa y su capitel, y los postes con cordón granate
  { const [px, py] = G_SUB.pedestal; rect(px - 17, py, px + 17, py + 2, K); rect(px - 16, py, px + 16, py + 1, g_hex('#f4f0e2')); rect(px - 13, py + 3, px + 13, 144, K); rect(px - 12, py + 3, px + 12, 144, g_hex('#e0dccc')); rect(px + 6, py + 3, px + 12, 144, g_hex('#bcb6a2')); rect(px - 12, py + 3, px - 10, 144, g_hex('#f4f0e2')); rect(px - 8, py + 8, px + 4, 138, g_hex('#d2ccba')); rect(px - 8, py + 8, px + 4, py + 8, g_hex('#b0aa96')); rect(px - 8, py + 8, px - 8, 138, g_hex('#b0aa96')); rect(px - 15, 143, px + 15, 146, K); rect(px - 14, 143, px + 14, 145, g_hex('#cfc9b6')); for (let i = -16; i <= 16; i++) if (i & 1) pset(px + i, 147, g_hex('#6e4e2c'));
    for (const sx of [px - 30, px + 30]) { rect(sx - 1, 124, sx + 1, 145, K); rect(sx, 125, sx, 144, g_hex('#c8a040')); disco(sx, 123, 2, K); disco(sx, 123, 1, g_hex('#f0d880')); rect(sx - 3, 145, sx + 3, 146, g_hex('#8a6a20')); }
    for (const [sa, sb] of [[px - 30, px - 14], [px + 14, px + 30]]) for (let x = sa; x <= sb; x++) { const y = 127 + Math.round(Math.sin((x - sa) / (sb - sa) * Math.PI) * 4); pset(x, y, g_hex('#8a2a3a')); pset(x, y + 1, g_hex('#5e1a28')); } }
  // la tarima del subastador (el frente de la tribuna va en salasDelante)
  rect(224, 136, 276, 141, K); rect(225, 137, 275, 140, g_hex('#6a4a2a')); rect(225, 137, 275, 137, g_hex('#8e6a3c'));
}

// la sala de subastas (encuadre 'subasta'): copia lo fijo y anima la vista del ventanal (tejados de zinc, nubes, palomas),
// la pantalla con la cifra y la puja, el foco sobre la vitrina, la lámpara, el reloj y los empleados de los teléfonos
function g_subasta(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, K = C.k;
  R.copiar(g_capa(R, 'subasta', () => g_subastaFija(R)));
  // por el ventanal: el cielo pálido de París, nubes a dos velocidades, los tejados de zinc con sus chimeneas y buhardillas
  { const [a, y0, b, y1] = G_SUB.ventana; R.recorte([a, y0, b, y1]);
    for (let y = y0; y <= y1; y++) for (let x = a; x <= b; x++) pset(x, y, (y - y0) / 50 > g_b4(x, y) ? g_hex('#cfe0ec') : g_hex('#a8c8e4'));
    for (let k = 0; k < 4; k++) { const cx = a - 14 + ((h(k, 1, 411) * 70 + t * (1.2 + k * 0.8)) % 70), cy = y0 + 6 + k * 7; for (let i = -7; i <= 7; i++) for (let j = -2; j <= 1; j++) if ((i / 7) ** 2 + (j / 2.2) ** 2 < 1) pset(Math.round(cx + i), cy + j, j === 1 ? g_hex('#d8dce8') : k % 2 ? g_hex('#f4f4f8') : g_hex('#ffffff')); }
    for (let x = a; x <= b; x++) { const lej = y0 + 40 + Math.round(h(x >> 3, 2, 412) * 6); for (let y = lej; y <= y1; y++) pset(x, y, g_hex('#9aa8b8')); }
    for (let x = a; x <= b; x++) { const top = y0 + 48 + ((x - a) < 14 ? 4 : (x - a) < 26 ? 0 : 7); for (let y = top; y <= y1; y++) pset(x, y, y < top + 10 ? ((x + y) % 4 === 0 ? g_hex('#6a7888') : g_hex('#7c8a9a')) : (y === top + 10 ? g_hex('#e8e0cc') : (x % 9 < 4 && (y - top) % 9 > 3 && (y - top) % 9 < 8) ? g_hex('#3a4658') : g_hex('#d8ceb4'))); pset(x, top, g_hex('#aab6c4')); }
    for (const [cx, cy] of [[a + 8, y0 + 46], [a + 20, y0 + 42], [a + 31, y0 + 50]]) { for (let y = cy; y < cy + 8; y++) { pset(cx, y, g_hex('#b86a4a')); pset(cx + 1, y, g_hex('#b86a4a')); pset(cx + 2, y, g_hex('#8a4a34')); } pset(cx, cy - 1, g_hex('#d88a5a')); pset(cx + 2, cy - 1, g_hex('#d88a5a')); }
    for (let k = 0; k < 2; k++) { const u = ((t / (9 + k * 4) + k * 0.4) % 1), x = Math.round(a - 4 + u * 46), y = Math.round(y0 + 14 + k * 9 + Math.sin(u * 9) * 3), al = Math.sin(t * 11 + k) > 0; pset(x, y, g_hex('#4a4a5a')); pset(x - 1, y + (al ? -1 : 0), g_hex('#4a4a5a')); pset(x + 1, y + (al ? -1 : 0), g_hex('#4a4a5a')); }
    R.recorte(null); const mx = (a + b) >> 1; rect(mx, y0, mx, y1, g_hex('#ebe7d8')); rect(mx + 1, y0, mx + 1, y1, g_hex('#a8a28e')); for (const y of [y0 + 24, y0 + 48]) rect(a, y, b, y, g_hex('#ebe7d8')); rect(mx - 1, y0 + 34, mx + 2, y0 + 40, g_hex('#c8a040'));
    // las cortinas recogidas a los lados, con sus pliegues, que el aire mueve apenas
    for (const [x0, d] of [[a - 5, 1], [b + 5, -1]]) for (let y = y0 - 3; y <= y1 + 8; y++) { const w = y < y0 + 44 ? 7 - Math.round((y - y0) / 14) : 3 + Math.round((y - y0 - 44) / 9), m = Math.round(Math.sin(t * 0.7 + y * 0.06) * 0.6); for (let i = 0; i <= w; i++) { const x = x0 + d * i + (y > y0 + 50 ? m : 0), f = (i + (y >> 3)) % 3; pset(x, y, f === 0 ? g_hex('#8a7a66') : f === 1 ? g_hex('#a4947c') : g_hex('#74644e')); } }
    for (const x of [a - 3, b + 3]) { rect(x - 2, y0 + 43, x + 2, y0 + 44, g_hex('#c8a040')); }
    // la luz de la ventana en el aire, con motas
    for (let k = 0; k < 9; k++) { const u = (h(k, 3, 413) + t * 0.04 * (1 + k % 3)) % 1, x = Math.round(b + 6 + u * 30 + Math.sin(t + k) * 2), y = Math.round(y0 + 30 + u * 70 + h(k, 4, 413) * 20); if (y < 138 && Math.sin(t * 2 + k * 2) > 0) pset(x, y, g_hex('#fffbe8')); } }
  // la pantalla: el icono del lote (un libro abstracto), la cifra, la barra de la puja y el piloto que late
  { const [a, y0, b, y1] = G_SUB.pantalla, cif = o.cifra, puja = Math.max(0, Math.min(1, o.puja ?? 0.5));
    for (let x = a; x <= b; x += 2) for (let y = y0; y <= y1; y += 2) if (h(x, y, 414) < 0.5) pset(x, y, g_hex('#141a28'));
    rect(a + 4, y0 + 5, a + 19, y0 + 22, g_hex('#e8dcc0')); rect(a + 5, y0 + 6, a + 18, y0 + 21, g_hex('#2a3a6a')); disco(a + 12, y0 + 12, 3, g_hex('#e8a040')); rect(a + 5, y0 + 17, a + 18, y0 + 21, g_hex('#c86a3a')); rect(a + 4, y0 + 5, a + 5, y0 + 22, g_hex('#b0a48a'));
    R.icono('bolsa', a + 26, y0 + 5, g_hex('#f0c860'), g_hex('#10141e'), 1);
    if (cif != null) { const s = String(Math.round(cif)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); R.numero(s, a + 36, y0 + 16, { color: g_hex('#f4f8ff'), sombra: false, fina: true }); }
    else for (let i = 0; i < 5; i++) rect(a + 36 + i * 11, y0 + 9, a + 43 + i * 11, y0 + 16, g_hex('#2a3244'));
    rect(a + 4, y1 - 7, b - 4, y1 - 3, g_hex('#222a3a')); const w = Math.round((b - a - 10) * puja); rect(a + 5, y1 - 6, a + 5 + w, y1 - 4, g_hex('#3ae06a')); rect(a + 5, y1 - 6, a + 5 + w, y1 - 6, g_hex('#9af0b0')); if (Math.sin(t * 6) > 0) rect(a + 5 + w, y1 - 6, a + 6 + w, y1 - 4, g_hex('#ffffff'));
    for (let i = 0; i < 6; i++) { const hh = 1 + Math.round((0.5 + 0.5 * Math.sin(t * 2 + i * 1.3)) * 1.5 + i * 0.4); rect(b - 21 + i * 3, y0 + 23 - hh, b - 20 + i * 3, y0 + 23, i === 5 ? g_hex('#f0c860') : g_hex('#5a7ab0')); }
    pset(b - 4, y0 + 4, Math.floor(t * 2) % 2 ? g_hex('#ff4a4a') : g_hex('#5a2030')); linea(a + 1, y0 + 12, a + 12, y0 + 1, g_hex('#2a3244')); }
  // la lámpara de cristal, entre la barra y Atom: brazos de latón y lágrimas que destellan
  { const cx = 222; rect(cx, 0, cx, 8, g_hex('#8a7a4a')); rect(cx - 9, 9, cx + 9, 9, g_hex('#a88430')); rect(cx - 5, 7, cx + 5, 7, g_hex('#a88430')); for (let i = -9; i <= 9; i += 3) { pset(cx + i, 8, g_hex('#fff4c0')); pset(cx + i, 10, g_hex('#d8e8f0')); pset(cx + i, 11 + (Math.abs(i) % 2), g_hex('#b0c8d8')); if (Math.sin(t * 3 + i) > 0.8) pset(cx + i, 10, C.blanco); } pset(cx, 13, g_hex('#d8e8f0')); }
  // el foco del techo sobre la vitrina (un cono tramado tenue)
  { const [px, py] = G_SUB.pedestal; for (let y = 69; y < py; y++) { const w = 6 + (y - 69) * 0.3; for (let x = Math.round(px - w); x <= px + w; x++) if (g_b4(x, y) < 0.14 + 0.03 * Math.sin(t * 2)) pset(x, y, g_mez(R.pget(x, y), g_hex('#fffbe0'), 0.5)); } }
  // el reloj: las agujas
  { const a = t * 0.1 - 1; linea(258, 52, Math.round(258 + Math.cos(a) * 4), Math.round(52 + Math.sin(a) * 4), K); linea(258, 52, 259, 50, K); }
  // los empleados de los teléfonos, detrás de su mesa: uno habla por el auricular, otro teclea y otro levanta la mano
  { const G = g_gente('oficina'), [mx0, my0, mx1, my1] = G_SUB.mesa;
    if (G.length) [[14, 0], [42, 1], [70, 2]].forEach(([x, k]) => { const sube = k === 2 && (t % 5) > 3.6; const a = R.actor(G[k % G.length], x, 135, t + k * 2.1, { dir: 1, habla: k === 0 && Math.sin(t * 1.3) > -0.3, dedo: sube, quieto: !sube });
      if (k === 0) { rect(x + 13, 112, x + 14, 117, K); pset(x + 13, 111, K); pset(x + 13, 118, K); } });
    rect(mx0, my0, mx1, my1, K); rect(mx0 + 1, my0 + 1, mx1 - 1, my1, g_hex('#5e3e22')); rect(mx0, my0 - 1, mx1 + 1, my0, g_hex('#8e6a3c')); rect(mx0, my0 - 2, mx1 + 1, my0 - 2, g_hex('#b08a54')); for (let x = mx0 + 4; x < mx1 - 4; x += 22) { rect(x, my0 + 3, x + 17, my1 - 1, g_hex('#6e4a2a')); rect(x, my0 + 3, x + 17, my0 + 3, g_hex('#4a2e18')); rect(x, my0 + 3, x, my1 - 1, g_hex('#4a2e18')); }
    // sobre la mesa: los teléfonos con su piloto, un portátil encendido y los catálogos
    for (const [x, k] of [[30, 0], [58, 1], [86, 2]]) { rect(x - 4, my0 - 5, x + 3, my0 - 3, K); rect(x - 3, my0 - 6, x + 2, my0 - 5, g_hex('#3a3a44')); pset(x + 2, my0 - 4, Math.sin(t * 5 + k * 2) > 0.2 ? g_hex('#ff5a4a') : g_hex('#5a2030')); }
    rect(46, my0 - 9, 54, my0 - 3, K); rect(47, my0 - 8, 53, my0 - 4, Math.sin(t * 3) > 0 ? g_hex('#bfe0ff') : g_hex('#a8d0f4')); rect(74, my0 - 4, 82, my0 - 3, g_hex('#e8dcc0')); rect(74, my0 - 5, 81, my0 - 5, g_hex('#c8343a')); }
  return { suelo: 141, pedestal: [...G_SUB.pedestal], vitrina: [136, 90, 184, 120], tribuna: [...G_SUB.tribuna], atril: [228, 105, 272, 141], pantalla: [...G_SUB.pantalla], cifra: [136, 49], taco: [238, 101], mesa: [...G_SUB.mesa], ventana: [...G_SUB.ventana], puerta: [285, 64, 309, 139], libres: [[98, 126], [194, 222]], publico: (fila, k) => [12 + k * 25 + (fila % 2) * 12, 153 + fila * 16] };
}

// delante de los personajes en la subasta: el cristal de la vitrina con sus brillos, el frente de la tribuna (casetones, el
// flexo y el taco del mazo) y el público sentado de espaldas en sillas doradas (o.lleno), con paletas numeradas que suben
// y bajan (o.paletas 0–1)
function g_subastaDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, K = C.k, lleno = Math.max(0, Math.min(1, o.lleno ?? 0.85)), pal = Math.max(0, Math.min(1, o.paletas ?? 0.3));
  // la vitrina: aristas de latón, el cristal apenas visible y dos brillos que cruzan
  { const [a, y0, b, y1] = [136, 90, 184, 120]; rect(a, y0, b, y0, g_hex('#c8a040')); rect(a, y0, a, y1, g_hex('#c8a040')); rect(b, y0, b, y1, g_hex('#8a6a20')); rect(a, y0 - 1, b, y0 - 1, K); for (let y = y0 + 1; y < y1; y++) for (let x = a + 1; x < b; x++) if (((x + y) & 3) === 0 && g_b4(x, y) < 0.3) pset(x, y, g_mez(R.pget(x, y), g_hex('#e8f4ff'), 0.35));
    const u = ((t * 0.25) % 1) * 70 - 10; for (let y = y0 + 2; y < y1 - 1; y++) for (const d of [0, 1, 5]) { const x = Math.round(a + u + d - (y - y0) * 0.6); if (x > a && x < b) pset(x, y, g_mez(R.pget(x, y), C.blanco, d === 5 ? 0.35 : 0.6)); } pset(a + 1, y0 + 1, C.blanco); pset(a + 2, y0 + 1, C.blanco); pset(a + 1, y0 + 2, C.blanco); }
  // el frente de la tribuna del subastador
  { const [a, y0, b, y1] = [228, 105, 272, 141]; rect(a - 2, y0 - 2, b + 2, y0, K); rect(a - 1, y0 - 2, b + 1, y0 - 1, g_hex('#a87a44')); rect(a - 1, y0 - 2, b + 1, y0 - 2, g_hex('#c89a5c')); rect(a, y0 + 1, b, y1, K); rect(a + 1, y0 + 1, b - 1, y1 - 1, g_hex('#6a4526')); rect(b - 6, y0 + 1, b - 1, y1 - 1, g_hex('#543418'));
    for (let y = y0 + 2; y < y1 - 1; y++) for (let x = a + 1; x < b - 6; x++) if (h(x >> 2, y, 421) < 0.08) pset(x, y, g_hex('#7a5430'));
    rect(a + 5, y0 + 5, b - 10, y1 - 6, g_hex('#7e5630')); rect(a + 5, y0 + 5, b - 10, y0 + 5, g_hex('#4a2e18')); rect(a + 5, y0 + 5, a + 5, y1 - 6, g_hex('#4a2e18')); rect(a + 6, y1 - 6, b - 10, y1 - 6, g_hex('#9a6e40')); rect(b - 10, y0 + 6, b - 10, y1 - 6, g_hex('#9a6e40'));
    const cx = a + 20, cy = y0 + 18; disco(cx, cy, 7, g_hex('#4a2e18')); disco(cx, cy, 6, g_hex('#c8a040')); disco(cx, cy, 4, g_hex('#7e5630')); rect(cx - 3, cy, cx + 3, cy, g_hex('#f0d880')); rect(cx, cy - 3, cx, cy + 3, g_hex('#f0d880')); rect(a, y1 - 3, b, y1 - 1, g_hex('#4a2e18'));
    // el flexo de latón con su charco de luz y el taco redondo donde golpea el mazo
    rect(b - 6, y0 - 9, b - 6, y0 - 3, g_hex('#a88430')); rect(b - 12, y0 - 10, b - 6, y0 - 9, g_hex('#a88430')); rect(b - 14, y0 - 9, b - 10, y0 - 8, g_hex('#2a5a3a')); pset(b - 12, y0 - 7, g_hex('#fff4c0')); for (let i = -4; i <= 2; i++) if (g_b4(b - 12 + i, y0 - 3) < 0.7) pset(b - 12 + i, y0 - 3, g_hex('#f0d8a0'));
    rect(a + 6, y0 - 4, a + 13, y0 - 3, K); rect(a + 7, y0 - 4, a + 12, y0 - 4, g_hex('#8e6a3c')); }
  // el público de espaldas, en dos filas de sillas doradas; algunos levantan su paleta numerada
  const PEL = G_PELOS.map(([a, b]) => [g_hex(a), g_hex(b)]), PIE = G_PIELES.map(g_hex), LUZ = g_hex('#f4ecd8');
  for (let fila = 0; fila < 2; fila++) for (let k = 0; k < 13; k++) { const x = 12 + k * 25 + (fila % 2) * 12, y = 153 + fila * 16, hay = lleno >= 1 || h(k, fila, 422) < lleno, tipo = (k * 7 + fila * 3 + 1) % 6, pelo = PEL[(k * 5 + fila + 2) % 6], piel = PIE[(k + fila * 2) % 4];
    if (hay) { const sube = h(k, fila, 423) < pal ? Math.max(0, Math.min(1, (Math.sin(t * 0.9 + k * 2.3 + fila * 1.1) + 0.2) * 3)) : 0;
      rect(x - 10, y + 6, x + 10, y + 18, K); rect(x - 9, y + 7, x + 9, y + 18, g_hex(['#2a3048', '#3a3238', '#4a2a30', '#26383a', '#6a6258'][(k * 3 + fila) % 5])); rect(x - 9, y + 7, x + 9, y + 7, g_hex('#6a6a7a'));
      if (sube > 0) { const lado = k % 2 ? 1 : -1, hx = x + lado * 11, hy = y + 6 - Math.round(sube * 16); linea(x + lado * 9, y + 9, hx, hy + 6, K); linea(x + lado * 8, y + 9, hx - lado, hy + 6, g_hex('#3a3a4a')); rect(hx - 1, hy + 3, hx + 1, hy + 6, piel);
        rect(hx, hy - 3, hx, hy + 3, g_hex('#8e6a3c')); disco(hx, hy - 8, 6, K); disco(hx, hy - 8, 5, g_hex('#f8f4e8')); R.numero(String((k * 7 + fila * 13) % 9 + 1), hx + 1, hy - 4, { color: g_hex('#1c2a5a'), centro: true, sombra: false }); }
      g_cabeza(R, x, y, tipo, pelo, piel, g_mez(pelo[0], LUZ, 0.45)); }
    // la silla: el respaldo dorado con su medallón granate
    rect(x - 9, y + 10, x + 9, y + 19, K); rect(x - 8, y + 11, x + 8, y + 19, g_hex('#c8a040')); rect(x - 8, y + 11, x + 8, y + 11, g_hex('#f0d880')); rect(x - 6, y + 13, x + 6, y + 19, g_hex('#8a2a3a')); rect(x - 6, y + 13, x + 6, y + 13, g_hex('#6a1c2a')); pset(x - 8, y + 11, K); pset(x + 8, y + 11, K); if (!hay) { rect(x - 6, y + 14, x + 6, y + 14, g_hex('#a83a4a')); pset(x, y + 16, g_hex('#6a1c2a')); }
  }
  return {};
}

// la arenisca roja del desierto (de la Tierra): luz, medio, sombra, fisura y el filo encendido
const G_ROCA = { L: '#f0a060', l: '#d87a48', m: '#b8562e', s: '#8a3824', d: '#5e2420' };

// una pared de arenisca entre x0 y x1, desde su perfil escalonado (pasos: [[x, y]…], el borde de arriba desde cada x) hasta
// base: caras verticales con luz por la derecha, fisuras, estratos ondulados, repisas y el talud de derrubios al pie
function g_roca(R, x0, x1, base, pasos, k) {
  const P = { L: g_hex(G_ROCA.L), l: g_hex(G_ROCA.l), m: g_hex(G_ROCA.m), s: g_hex(G_ROCA.s), d: g_hex(G_ROCA.d) };
  const top = (x) => { let y = base; for (const [px, py] of pasos) if (x >= px) y = py; return y; };
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const yt = top(x) + Math.round(h(x >> 2, k, 431) * 2), cara = h(Math.floor((x + k * 3) / 11), k, 432), borde = top(x + 1) > top(x) + 3 || x === x1, izq = top(x - 1) > top(x) + 3;
    for (let y = yt; y <= base; y++) { const est = Math.sin(y * 0.5 + Math.sin(x * 0.045 + k) * 2.2); let c = cara > 0.6 ? P.l : cara > 0.28 ? P.m : P.s;
      if ((x + k) % 11 === 0 && h(x, y >> 4, 433) < 0.75) c = P.d; else if ((x + k) % 11 === 1 && cara > 0.28) c = P.L; else if (est > 0.9) c = c === P.s ? P.d : P.s; else if (est < -0.93 && cara > 0.28) c = P.L; else if (h(x >> 1, y >> 1, 434) < 0.06) c = c === P.l ? P.m : P.s;
      if (y - yt < 2) c = y === yt ? P.L : P.l; if (borde && y > yt) c = P.L; if (izq) c = P.d;
      const tal = base - 12 - Math.round(h(x >> 3, k, 435) * 6); if (y > tal && g_b4(x, y) < (y - tal) / (base - tal + 1) + 0.15) c = (x + y) % 3 ? g_hex('#c8683a') : g_hex('#a8502c');
      R.pset(x, y, c); } }
}

// una figurita de 11 px del equipo de rodaje (x: centro; y: los pies): la gorra o el pelo, la camiseta c, el pantalón y su
// sombra corta; o.anda mueve las piernas, o.brazo levanta un brazo, o.dir hacia dónde mira
function g_tipo(R, x, y, t, c, o = {}) {
  const { rect, pset } = R, a = o.anda ? Math.floor(t * 6) % 2 : 0, d = o.dir ?? 1, piel = o.piel ?? g_hex('#e0b088'), pant = o.pant ?? g_hex('#3a3a4a');
  rect(x - 3, y, x + 4, y, g_hex('#a8502c')); rect(x - 1, y - 10, x + 1, y - 8, piel); rect(x - 1, y - 11, x + 1, y - 10, o.gorra ?? g_hex('#3a2a1a')); if (o.gorra) pset(x + 2 * d, y - 10, o.gorra); pset(x + d, y - 9, C.k);
  rect(x - 2, y - 7, x + 2, y - 4, c); rect(x - 2, y - 7, x + 2, y - 7, g_mez(c, C.blanco, 0.35)); rect(x - 2 * d, y - 6, x - 2 * d, y - 4, g_mez(c, C.k, 0.3));
  if (o.brazo) { pset(x + 3 * d, y - 7, c); pset(x + 4 * d, y - 8, piel); } else pset(x + 3 * d, y - 5, piel);
  rect(x - 2, y - 3, x - 1, y - 1 - a, pant); rect(x + 1, y - 3, x + 2, y - 2 + a, pant); pset(x, y - 3, pant);
}

// lo fijo del rodaje en el desierto: el cielo azul tramado con el sol, las mesetas lejanas con su arco de piedra, las dos
// paredes de arenisca, la arena con rizaduras, rodadas, matas y piedras, la carpa de los monitores, el camión, los raíles
// del travelín, la sombrilla, el reflector dorado, el foco y las sillas plegables
function g_rodajeFija(R) {
  const { rect, pset, disco, poligono, linea } = R, K = C.k;
  // el cielo: más hondo arriba, con la calima cálida sobre el horizonte y el halo del sol (uno solo: es la Tierra)
  g_deg(R, 0, 0, 319, 99, ['#2e6cc4', '#3a7ed2', '#5294de', '#74aee8', '#9cc6ee', '#c4dcf0', '#ecdcc8'].map(g_hex), (x, y) => { const d = Math.hypot(x - 232, (y - 22) * 1.2); return d < 46 ? (46 - d) / 26 : 0; }, 1.15);
  disco(232, 22, 7, g_hex('#fff8dc')); disco(232, 22, 5, g_hex('#ffffff')); for (let a = 0; a < 12; a++) pset(Math.round(232 + Math.cos(a * 0.524) * 10), Math.round(22 + Math.sin(a * 0.524) * 10), g_hex('#fff4c8'));
  // las mesetas lejanas, en dos capas de calima, y un arco natural de piedra
  for (let x = 0; x < 320; x++) { const a = 80 + Math.round(Math.sin(x * 0.021 + 1) * 5 + (h(x >> 4, 1, 441) > 0.55 ? -7 : 0) + h(x >> 2, 2, 441) * 1.5); for (let y = a; y < 100; y++) pset(x, y, y === a ? g_hex('#dcb4a8') : (x + y) % 7 === 0 ? g_hex('#c49488') : g_hex('#cea296'));
    const b = 88 + Math.round(Math.sin(x * 0.034 + 4) * 4 + (h(x >> 4, 3, 441) > 0.6 ? -6 : 0)); for (let y = b; y < 100; y++) pset(x, y, y === b ? g_hex('#d09078') : (x * 3 + y) % 5 === 0 ? g_hex('#a8644c') : g_hex('#bc785e')); }
  for (let x = 150; x <= 186; x++) for (let y = 68; y < 96; y++) { const dx = (x - 168) / 18, dy = (y - 96) / 28, fu = dx * dx + dy * dy < 1, de = ((x - 167) / 10) ** 2 + ((y - 96) / 19) ** 2 < 1; if (fu && !de) pset(x, y, y < 71 + Math.abs(x - 168) * 0.2 ? g_hex('#e09a76') : x > 172 ? g_hex('#c8785a') : (x + y) % 6 === 0 ? g_hex('#8e4a36') : g_hex('#a85e44')); }
  // las dos paredes de arenisca: la de la izquierda, altísima; la de la derecha, más baja (la esquina de Atom queda en cielo)
  g_roca(R, 0, 112, 104, [[0, 44], [9, 35], [21, 27], [45, 31], [57, 24], [72, 38], [84, 53], [94, 70], [104, 87]], 1);
  g_roca(R, 232, 319, 104, [[232, 90], [240, 77], [250, 62], [262, 53], [281, 50], [299, 57], [311, 51]], 2);
  // la arena rojiza: degradado tramado, rizaduras que se abren hacia la cámara, las rodadas del camión, matas y piedras
  g_deg(R, 0, 100, 319, 179, ['#c4683a', '#d07642', '#dc864c', '#e69658', '#eca462'].map(g_hex), null, 0.8);
  for (let y = 104, s = 3; y < 180; y += s, s += 0.6) { const yy = Math.round(y); for (let x = 0; x < 320; x++) { const w = Math.sin(x * (0.5 - (yy - 104) * 0.004) + yy * 1.7) + Math.sin(x * 0.07 + yy); if (w > 1.1) pset(x, yy + Math.round(Math.sin(x * 0.05 + yy) * 1.5), g_hex('#b85c34')); else if (w < -1.4) pset(x, yy + Math.round(Math.sin(x * 0.05 + yy) * 1.5), g_hex('#f4b878')); } }
  for (let k = 0; k < 2; k++) for (let i = 0; i < 70; i++) { const u = i / 70, x = Math.round(268 - u * 150 + k * (6 + u * 10)), y = Math.round(134 + u * 44); if (i % 3 !== 2 && y < 180) { pset(x, y, g_hex('#a85230')); pset(x + 1, y, g_hex('#b85c34')); } }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 442) * 316), y = 108 + Math.round(h(k, 2, 442) * 66), s = y > 140 ? 2 : 1; if (k % 2) { rect(x, y, x + 2 * s, y + s, g_hex('#8a4a30')); rect(x, y, x + s, y, g_hex('#d88a5a')); pset(x + 2 * s + 1, y + s, g_hex('#a85230')); } }
  // el primer término de la arena: piedras con su sombra, matas secas, un rastro de pisadas y el cable del generador, que serpentea hasta el borde
  for (const [x, y, w] of [[34, 166, 5], [96, 174, 4], [176, 168, 6], [214, 176, 4], [262, 160, 5], [8, 154, 3], [300, 172, 3]]) { for (let i = -1; i <= w + 2; i++) if (g_b4(x + i, y + 3) < 0.7) pset(x + i, y + 3, g_hex('#a85230')); rect(x, y, x + w, y + 2, K); rect(x + 1, y - 1, x + w - 1, y - 1, K); rect(x + 1, y, x + w - 1, y + 1, g_hex('#9a5236')); rect(x + 1, y, x + (w >> 1), y, g_hex('#d88a5a')); pset(x + w - 1, y + 1, g_hex('#7a3e28')); }
  for (const [x, y, n] of [[18, 172, 6], [128, 177, 5], [246, 170, 6], [70, 158, 4]]) { for (let i = -n; i <= n + 2; i++) if (g_b4(x + i, y + 1) < 0.6) pset(x + i, y + 1, g_hex('#a85230')); for (let i = 0; i < n * 2 + 1; i++) { const a = -Math.PI * (0.12 + 0.76 * i / (n * 2)), l = n + 1 + (i * 5) % 4; linea(x, y, Math.round(x + Math.cos(a) * l), Math.round(y + Math.sin(a) * l), i % 3 === 0 ? g_hex('#5a4a2a') : i % 3 === 1 ? g_hex('#8a7a40') : g_hex('#b8a060')); } pset(x, y, g_hex('#4a3a22')); }
  for (let i = 0; i < 16; i++) { const x = 92 + i * 9, y = 156 + Math.round(Math.sin(i * 0.5) * 2) + (i % 2) * 2; rect(x, y, x + 2, y, g_hex('#b05a32')); pset(x + 1, y + 1, g_hex('#f0b070')); }
  for (let i = 0; i <= 110; i++) { const u = i / 110, x = Math.round(233 - u * 96 + Math.sin(u * 9) * 7), y = Math.round(141 + u * 38 + Math.sin(u * 14) * 1.5); if (y > 179) break; pset(x, y, g_hex('#2a2630')); pset(x, y + 1, i % 4 === 0 ? g_hex('#4a4654') : g_hex('#a85230')); }
  // la carpa de los monitores (el «pueblo del vídeo»): la lona blanca con su sombra, los postes, la mesa y las pantallas (su imagen, en vivo)
  poligono([[24, 110], [84, 110], [78, 102], [30, 102]], K); poligono([[25, 109], [83, 109], [77, 103], [31, 103]], g_hex('#f0ece0')); for (let x = 32; x < 80; x += 8) linea(x, 103, x - 2, 109, g_hex('#d0cab8')); rect(24, 110, 84, 112, g_hex('#d8d2c0')); for (let x = 24; x < 84; x += 4) pset(x + 1, 113, g_hex('#d8d2c0'));
  for (let y = 113; y < 138; y++) for (let x = 27; x < 82; x++) if (g_b4(x, y) < 0.55) pset(x, y, g_mez(R.pget(x, y), g_hex('#6a2e22'), 0.5)); for (const x of [26, 82]) { rect(x, 110, x, 139, g_hex('#6a6a72')); rect(x - 1, 139, x + 1, 139, K); }
  for (let x = 28; x < 82; x += 6) pset(x, 140, g_hex('#a85230')); rect(36, 127, 72, 128, g_hex('#5a4a3a')); rect(36, 129, 37, 138, g_hex('#4a3a2e')); rect(71, 129, 72, 138, g_hex('#4a3a2e')); for (const x of [39, 53]) { rect(x, 116, x + 11, 126, K); rect(x + 5, 126, x + 6, 127, K); }
  // el camión del equipo, con la rampa bajada, el grupo electrógeno y bidones
  rect(250, 110, 302, 134, K); rect(251, 111, 301, 133, g_hex('#e8e4d8')); rect(251, 111, 301, 112, g_hex('#ffffff')); for (let x = 257; x < 300; x += 6) rect(x, 113, x, 132, g_hex('#cfcabc')); rect(251, 128, 301, 133, g_hex('#b8b2a0')); rect(254, 116, 272, 131, g_hex('#2a2630')); rect(255, 117, 271, 131, g_hex('#3e3a46')); rect(257, 122, 262, 131, g_hex('#5a4a3a')); rect(264, 125, 269, 131, g_hex('#8a6a3a'));
  rect(302, 116, 318, 134, K); rect(303, 117, 318, 133, g_hex('#c85a3a')); rect(306, 119, 316, 125, g_hex('#8ac0e0')); rect(306, 119, 309, 121, g_hex('#d0e8f4')); rect(303, 127, 318, 127, g_hex('#8a3a24')); for (const x of [262, 290, 310]) { disco(x, 135, 4, K); disco(x, 135, 2, g_hex('#6a6a72')); }
  poligono([[252, 134], [272, 134], [266, 142], [246, 142]], g_hex('#8a8a94')); linea(246, 142, 252, 134, K); linea(266, 142, 272, 134, K); for (let i = 0; i < 4; i++) linea(248 + i * 2, 141 - i * 2, 268 + i * 2 - 2, 141 - i * 2, g_hex('#6a6a72'));
  rect(226, 128, 240, 138, K); rect(227, 129, 239, 137, g_hex('#d8a030')); rect(227, 129, 239, 130, g_hex('#f0c860')); rect(229, 132, 233, 135, g_hex('#2a2630')); rect(236, 126, 237, 128, g_hex('#4a4a52')); rect(225, 139, 241, 139, g_hex('#a8502c'));
  // los raíles del travelín, con sus traviesas y cuñas (el carro con la cámara, en vivo)
  rect(100, 137, 222, 137, g_hex('#3a3a44')); rect(100, 140, 222, 140, g_hex('#2a2a32')); rect(100, 136, 222, 136, g_hex('#9aa4b4')); rect(100, 139, 222, 139, g_hex('#7a8494')); for (let x = 102; x < 222; x += 10) { rect(x, 136, x + 1, 141, g_hex('#5a4030')); pset(x, 142, g_hex('#a8502c')); pset(x + 1, 142, g_hex('#a8502c')); }
  // la sombrilla a rayas con su nevera, el reflector dorado en su pie y un foco con viseras
  for (let i = -15; i <= 15; i++) { const yy = 106 + Math.round((i * i) / 38); for (let y = yy; y < 113; y++) pset(132 + i, y, ((i + 15) >> 2) % 2 ? g_hex('#f0ece0') : g_hex('#d8503a')); pset(132 + i, yy, ((i + 15) >> 2) % 2 ? g_hex('#ffffff') : g_hex('#f07a5a')); pset(132 + i, 113, K); } rect(132, 113, 132, 136, g_hex('#8a8a94')); rect(131, 104, 133, 105, g_hex('#8a8a94')); rect(138, 130, 146, 136, K); rect(139, 131, 145, 135, g_hex('#3a8ac8')); rect(139, 131, 145, 131, g_hex('#f0f4f8')); for (let x = 120; x < 148; x++) if (g_b4(x, 138) < 0.6) pset(x, 138, g_hex('#a8502c'));
  poligono([[196, 104], [212, 100], [214, 122], [198, 126]], K); poligono([[197, 105], [211, 101], [213, 121], [199, 125]], g_hex('#e8b840')); for (let y = 104; y < 124; y += 4) linea(198, y + 2, 212, y - 2, g_hex('#f8dc80')); linea(205, 124, 205, 136, g_hex('#4a4a52')); linea(205, 136, 200, 139, g_hex('#4a4a52')); linea(205, 136, 210, 139, g_hex('#4a4a52'));
  linea(91, 118, 91, 138, g_hex('#4a4a52')); linea(91, 138, 87, 141, g_hex('#4a4a52')); linea(91, 138, 95, 141, g_hex('#4a4a52')); rect(86, 110, 96, 118, K); rect(87, 111, 95, 117, g_hex('#3a3a44')); rect(96, 108, 98, 120, K); rect(88, 112, 94, 116, g_hex('#fff4c8'));
  // dos sillas plegables de lona y la pértiga del banderín (el banderín, en vivo)
  for (const [x, c] of [[20, '#2a4a8a'], [9, '#8a2a3a']]) { linea(x - 3, 131, x + 4, 141, g_hex('#6a4a2a')); linea(x + 4, 131, x - 3, 141, g_hex('#6a4a2a')); rect(x - 3, 130, x + 4, 131, g_hex(c)); rect(x - 3, 122, x - 3, 131, g_hex('#6a4a2a')); rect(x - 3, 122, x + 1, 125, g_hex(c)); }
  rect(113, 84, 113, 104, g_hex('#6a6a72'));
}
// el rodaje en el desierto (cámara 'rodaje'): copia lo fijo y anima los cirros a tres velocidades, las aves, las pantallas
// de la carpa, el carro del travelín que va y viene con su operador, los técnicos, el banderín, el humo del generador y
// los velos de arena que arrastra el viento
function g_rodaje(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, K = C.k;
  R.copiar(g_capa(R, 'rodaje', () => g_rodajeFija(R)));
  // cirros finos en tres tonos y a tres velocidades (solo sobre cielo, lejos de la barra del año y de Atom) y dos aves que planean
  const CIELOS = new Set(['#2e6cc4', '#3a7ed2', '#5294de', '#74aee8', '#9cc6ee', '#c4dcf0'].map(g_hex));
  for (let k = 0; k < 7; k++) { const v = [2.2, 3.6, 5.5][k % 3], cy = 26 + Math.round(h(k, 1, 451) * 44), L = 16 + Math.round(h(k, 2, 451) * 22), cx = ((h(k, 3, 451) * 420 + t * v) % 420) - 50, col = g_hex(['#ffffff', '#e4eef8', '#cfe0f0'][k % 3]);
    for (let i = 0; i < L; i++) for (let j = 0; j < 3; j++) { const x = Math.round(cx + i + j * 3), y = cy + j - Math.round(Math.sin(i * 0.3 + k) * 1.2); if (x < 0 || x > 319 || (x > 268 && y < 48) || (x < 176 && y < 22)) continue; if ((j === 1 || (i > 3 && i < L - 4)) && h(i, j, k + 452) < 0.8 && CIELOS.has(R.pget(x, y))) pset(x, y, j === 2 ? g_hex('#b4cce4') : col); } }
  for (const [k, cy, w, v] of [[0, 40, 34, 1.6], [1, 62, 46, 2.8], [2, 52, 26, 4.2], [3, 72, 38, 2.1]]) { const cx = ((130 + k * 110 + t * v) % 440) - 60, B = []; for (let i = 0; i < 5; i++) { const u = i / 4, m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.8, cy - 1 - m * (2 + h(k, i, 457) * 3), w * (0.14 + h(k, i, 458) * 0.08), 2.5 + m * 3.5]); }
    const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
    for (let y = cy - 10; y <= cy + 1; y++) for (let x = Math.max(0, Math.floor(cx - w * 0.6)); x <= Math.min(319, Math.ceil(cx + w * 0.6)); x++) { if ((x > 264 && y < 50) || (x < 178 && y < 24) || Math.hypot(x - 232, y - 22) < 14) continue; if (den(x, y) && CIELOS.has(R.pget(x, y))) pset(x, y, !den(x, y + 1) ? g_hex('#b4cce4') : !den(x, y - 1) ? g_hex('#ffffff') : !den(x, y + 2) ? g_hex('#dce8f4') : g_hex('#f2f6fa')); } }
  for (let k = 0; k < 2; k++) { const a = t * 0.35 + k * 2.6, x = Math.round(150 + k * 44 + Math.cos(a) * 16), y = Math.round(44 + k * 8 + Math.sin(a) * 5), al = Math.sin(t * 2 + k) > 0.5 ? 1 : 0; pset(x, y, g_hex('#3a2a2a')); pset(x - 1, y - 1 + al, g_hex('#3a2a2a')); pset(x + 1, y - 1 + al, g_hex('#3a2a2a')); pset(x - 2, y - 1 + al * 2, g_hex('#3a2a2a')); pset(x + 2, y - 1 + al * 2, g_hex('#3a2a2a')); }
  // el banderín de viento en su pértiga
  for (let i = 0; i < 12; i++) { const y = 85 + Math.round(Math.sin(t * 5 - i * 0.7) * (i / 6)); for (let j = 0; j < Math.max(1, 4 - (i >> 2)); j++) pset(114 + i, y + j, (i >> 1) % 2 ? g_hex('#f0ece0') : g_hex('#e85a2a')); }
  // las pantallas de la carpa (formas abstractas que cambian), el director de fotografía sentado y otro que señala
  for (const [x, k] of [[39, 0], [53, 1]]) { const f = Math.floor(t * 0.5 + k * 0.5) % 3; rect(x + 1, 117, x + 10, 125, g_hex('#6a9ad8')); rect(x + 1, 122, x + 10, 125, g_hex(['#d8804a', '#c8683a', '#e8a060'][f])); for (let i = 0; i < 3; i++) pset(x + 2 + ((f * 3 + i * 3) % 8), 121 + (i % 2), g_hex('#b85c34')); if (Math.sin(t * 9 + k) > 0.9) rect(x + 1, 119, x + 10, 119, g_hex('#a8c8f0')); pset(x + 10, 117, Math.floor(t * 2) % 2 ? g_hex('#ff4a4a') : g_hex('#7a2a2a')); }
  g_tipo(R, 46, 139, t, g_hex('#3a5a4a'), { dir: 1, gorra: g_hex('#c8343a'), brazo: Math.sin(t * 0.9) > 0.5 }); g_tipo(R, 64, 139, t, g_hex('#e8e0d0'), { dir: -1, piel: g_hex('#a87050') });
  // un técnico descarga cajas por la rampa del camión y otro vigila el generador, que echa humo
  { const u = (t % 12) / 12, baja = u < 0.5, x = Math.round(baja ? 262 - u * 2 * 34 : 228 + (u - 0.5) * 2 * 34), y = Math.round(baja ? 133 + Math.min(1, u * 4) * 8 : 141 - Math.max(0, (u - 0.75) * 4) * 8); g_tipo(R, x, y, t, g_hex('#d8a030'), { dir: baja ? -1 : 1, anda: true, gorra: g_hex('#2a2a36'), brazo: baja }); if (baja) { rect(x - 6, y - 9, x - 2, y - 5, K); rect(x - 5, y - 8, x - 3, y - 6, g_hex('#8a6a3a')); } }
  g_vapor(R, 237, 125, t, 1.3, g_hex('#d8d0c8'), 14); pset(229 + (Math.floor(t * 8) % 2), 133, g_hex('#3ae06a'));
  // el travelín: el carro con la cámara y su operador sentado va y viene por los raíles; un ayudante lo empuja
  { const cx = Math.round(160 + Math.sin(t * 0.35) * 44), d = Math.cos(t * 0.35) > 0 ? 1 : -1; rect(cx - 12, 131, cx + 12, 135, K); rect(cx - 11, 132, cx + 11, 134, g_hex('#4a4e5c')); rect(cx - 11, 132, cx + 11, 132, g_hex('#7a8090')); for (const i of [-9, 9]) { disco(cx + i, 136, 1, K); }
    rect(cx - 1, 119, cx + 1, 131, g_hex('#3a3a44')); rect(cx - 6, 112, cx + 5, 119, K); rect(cx - 5, 113, cx + 4, 118, g_hex('#2e3240')); rect(cx - 5, 113, cx + 4, 113, g_hex('#5a6074')); rect(cx - 10, 114, cx - 6, 117, K); pset(cx - 11, 115, g_hex('#8ac0e0')); pset(cx - 11, 116, g_hex('#5a98c0')); disco(cx - 2, 110, 2, K); disco(cx + 3, 110, 2, K); pset(cx + 4, 114, Math.floor(t * 2) % 2 ? g_hex('#ff4a4a') : g_hex('#7a2a2a'));
    g_tipo(R, cx + 8, 131, t, g_hex('#4a6a9a'), { dir: -1, gorra: g_hex('#e8e0d0'), brazo: true }); g_tipo(R, cx + 19 * d, 141, t, g_hex('#8a4a6a'), { dir: -d, anda: Math.abs(Math.cos(t * 0.35)) > 0.25, brazo: true }); }
  // la persona del reflector, que lo orienta, y la del guion con su carpeta, que cruza al fondo
  g_tipo(R, 218, 140, t, g_hex('#e8e0d0'), { dir: -1, gorra: g_hex('#3a6a4a'), brazo: Math.sin(t * 1.1) > 0 }); { const u = (t / 26 + 0.2) % 1, x = Math.round(300 - u * 300); if (!(x > 96 && x < 226)) g_tipo(R, x, 146, t, g_hex('#f0ece0'), { dir: -1, anda: true, piel: g_hex('#c89068'), pant: g_hex('#5a6a8a') }); }
  // el brillo del reflector y la luz del foco, que tiemblan con el calor
  if (Math.sin(t * 2.3) > 0.2) { pset(204, 108, C.blanco); pset(205, 107, C.blanco); pset(203, 109, g_hex('#fff4c8')); } for (let k = 0; k < 3; k++) pset(99 + k, 110 + k * 4 + Math.round(Math.sin(t * 4 + k)), g_hex('#fff4c8'));
  // la calima sobre el horizonte y los velos de arena que el viento arrastra a ras de suelo
  for (let x = 112; x < 232; x += 2) { const y = 99 + Math.round(Math.sin(x * 0.2 + t * 2) * 0.6); if (h(x, Math.floor(t * 3), 453) < 0.3) pset(x, y, g_hex('#ecdcc8')); }
  for (let k = 0; k < 10; k++) { const y = 146 + Math.round(h(k, 1, 454) * 32), x0 = ((h(k, 2, 454) * 400 + t * (30 + k * 6)) % 400) - 40, L = 8 + (k % 4) * 4; for (let i = 0; i < L; i++) { const x = Math.round(x0 + i), yy = y + Math.round(Math.sin(i * 0.5 + t * 3 + k) * 1); if (x >= 0 && x < 320 && (i + k) % 3 !== 0) pset(x, yy, g_hex('#f8cc94')); } }
  return { suelo: 150, horizonte: 100, sol: [232, 22], railes: [100, 136, 222, 140], carro: [Math.round(160 + Math.sin(t * 0.35) * 44), 131], carroX: (tt) => Math.round(160 + Math.sin(tt * 0.35) * 44), carpa: [24, 102, 84, 140], camion: [250, 110, 318, 138], reflector: [205, 112], sombrilla: [132, 106], libres: [[96, 240]], camaraDelante: [0, 132, 86, 179], cajas: [262, 150, 319, 179] };
}

// delante de los personajes en el rodaje (o.delante false lo quita): la cámara de cine grande en su trípode, de espaldas, con
// su piloto y el visor encendido; las cajas de material apiladas con cantoneras y pegatinas de formas; cables por la arena
function g_rodajeDelante(R, t, o = {}) {
  if (o.delante === false) return {};
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  // los cables que serpentean por la arena
  for (let x = 52; x < 262; x++) { const y = 172 + Math.round(Math.sin(x * 0.07) * 3 + Math.sin(x * 0.023 + 1) * 2); pset(x, y, g_hex('#2a2630')); pset(x, y + 1, g_hex('#a8502c')); if (x % 9 === 0) pset(x, y - 1, g_hex('#5a5664')); }
  for (let x = 120; x < 250; x++) { const y = 176 + Math.round(Math.sin(x * 0.05 + 2) * 2); pset(x, y, g_hex('#c8343a')); pset(x, y + 1, g_hex('#8a2a24')); }
  // la cámara grande (se pinta en un búfer propio y se baja 28 px: asoma por abajo sin tapar la carpa)
  { let bf = G_CAPAS.get('~camara'); if (!bf) { bf = R.nuevo(); G_CAPAS.set('~camara', bf); } const VACIO = 0x01020304, DY = 28; bf.fill(VACIO); const prev = R.usar(bf);
  // la cámara grande en su trípode: las patas, la cabeza, el cuerpo con sus chasis redondos, el parasol y el visor
  linea(34, 150, 12, 179, K); linea(35, 150, 13, 179, g_hex('#5a5664')); linea(36, 150, 58, 179, K); linea(37, 150, 59, 179, g_hex('#3a3640')); rect(34, 150, 37, 179, K); rect(35, 150, 36, 179, g_hex('#4a4652')); rect(24, 166, 48, 167, g_hex('#3a3640'));
  rect(28, 144, 44, 150, K); rect(29, 145, 43, 149, g_hex('#5a5664')); rect(29, 145, 43, 145, g_hex('#8a8694')); linea(44, 147, 58, 156, K); linea(44, 148, 58, 157, g_hex('#5a5664')); rect(57, 155, 61, 159, K);
  rect(12, 120, 56, 144, K); rect(13, 121, 55, 143, g_hex('#34303c')); rect(13, 121, 55, 122, g_hex('#5e5a6a')); rect(13, 140, 55, 143, g_hex('#24202a')); rect(50, 123, 55, 143, g_hex('#2a2630'));
  disco(24, 113, 9, K); disco(24, 113, 8, g_hex('#3e3a48')); disco(24, 113, 5, g_hex('#2a2630')); disco(24, 113, 1, g_hex('#9aa4b4')); disco(45, 113, 9, K); disco(45, 113, 8, g_hex('#3e3a48')); disco(45, 113, 5, g_hex('#2a2630')); disco(45, 113, 1, g_hex('#9aa4b4'));
  { const a = t * 1.6; for (const cx of [24, 45]) for (let k = 0; k < 3; k++) pset(Math.round(cx + Math.cos(a + k * 2.094) * 6), Math.round(113 + Math.sin(a + k * 2.094) * 6), g_hex('#7a7688')); }
  rect(56, 124, 72, 140, K); rect(57, 125, 71, 139, g_hex('#24202a')); poligono([[72, 121], [84, 117], [84, 147], [72, 143]], K); poligono([[73, 123], [83, 119], [83, 145], [73, 141]], g_hex('#34303c')); linea(74, 124, 82, 121, g_hex('#5e5a6a'));
  rect(17, 126, 34, 137, K); rect(18, 127, 33, 136, g_hex('#8ab4d8')); rect(18, 132, 33, 136, g_hex('#d08a58')); rect(18, 127, 33, 127, g_hex('#c4dcf0')); pset(22 + Math.round(Math.sin(t * 0.35) * 3), 131, g_hex('#3a3a44')); rect(21, 132, 23, 133, g_hex('#3a3a44'));
  pset(38, 127, Math.floor(t * 2) % 2 ? g_hex('#ff4a4a') : g_hex('#7a2a2a')); pset(39, 127, Math.floor(t * 2) % 2 ? g_hex('#ff8a8a') : g_hex('#7a2a2a')); rect(38, 131, 47, 131, g_hex('#5e5a6a')); rect(38, 134, 44, 134, g_hex('#5e5a6a')); for (let i = 0; i < 3; i++) disco(40 + i * 4, 139, 1, g_hex('#9aa4b4'));
  rect(4, 128, 12, 134, K); rect(5, 129, 11, 133, g_hex('#24202a')); rect(0, 130, 4, 132, K);
    R.usar(prev); for (let y = 100; y < 180 - DY; y++) for (let x = 0; x < 90; x++) { const c = bf[y * 320 + x]; if (c !== VACIO) pset(x, y + DY, c); } }
  // las cajas de material: dos apiladas y una de pie, con cantoneras de metal, cierres y pegatinas
  for (const [x0, y0, x1, y1, c] of [[266, 158, 319, 179, '#3a3e4c'], [274, 144, 314, 158, '#4a4e5e'], [246, 164, 266, 179, '#5a4a3a']]) { rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, g_hex(c)); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, g_mez(g_hex(c), C.blanco, 0.3)); for (let x = x0 + 4; x < x1 - 2; x += 4) rect(x, y0 + 3, x, y1 - 2, g_mez(g_hex(c), K, 0.2));
    for (const [cx, cy] of [[x0 + 1, y0 + 1], [x1 - 3, y0 + 1], [x0 + 1, y1 - 3], [x1 - 3, y1 - 3]]) { rect(cx, cy, cx + 2, cy + 2, g_hex('#9aa4b4')); pset(cx + 1, cy + 1, g_hex('#5a6274')); } rect(((x0 + x1) >> 1) - 2, y0, ((x0 + x1) >> 1) + 2, y0 + 3, g_hex('#c8d0dc')); pset((x0 + x1) >> 1, y0 + 2, K); }
  rect(282, 163, 292, 171, g_hex('#f0ece0')); disco(287, 167, 3, g_hex('#e85a2a')); rect(298, 164, 310, 166, g_hex('#e8c040')); rect(298, 168, 306, 169, g_hex('#f0ece0')); rect(280, 148, 288, 154, g_hex('#3a8ac8')); poligono([[281, 153], [284, 149], [287, 153]], g_hex('#f0ece0')); rect(250, 168, 256, 174, g_hex('#e8c040')); linea(251, 173, 255, 169, K);
  // un rollo de cinta y una botella de agua sobre las cajas, y la arena amontonada a su pie
  disco(300, 141, 3, K); disco(300, 141, 2, g_hex('#c8c0b0')); pset(300, 141, K); rect(308, 136, 311, 143, K); rect(309, 137, 310, 142, g_hex('#a8d8f0')); rect(309, 135, 310, 136, g_hex('#3a6ac8'));
  for (let x = 240; x < 320; x++) if (h(x >> 1, 3, 455) < 0.6) pset(x, 179, g_hex('#f4b878'));
  return {};
}

// la paleta de hoy: el estudio de Atom (papel pintado arena con soles, friso verde azulado, nogal, tarima), el campus
// de 1970 (ladrillo, hiedra, césped) y el catálogo sobre su manta
const h_K = pal({
  k: '#1c1222', blanco: '#f6f2ea', pared: '#ecd2a8', paredS: '#dcbc8c', paredL: '#f6e2c0', motivo: '#cf9a68', motivoS: '#b87e52',
  moldura: '#f4ead6', molduraS: '#cdbfa2', friso: '#447674', frisoS: '#2f5a5a', frisoL: '#62948e', frisoD: '#1f3f42',
  tarima: '#b88450', tarimaS: '#93603a', tarimaL: '#d4a066', tarimaD: '#6c4426', sol: '#f2cf88', solL: '#fbe6b0',
  nogal: '#70462a', nogalS: '#50301a', nogalL: '#94623a', nogalD: '#321d10', nogalB: '#b88250',
  cortina: '#c2603a', cortinaS: '#93401f', cortinaL: '#e08a5a', cortinaD: '#6a2a14', marco: '#f4f0e6', marcoS: '#c4bcae',
  cielo0: '#3f8fd8', cielo1: '#58a4e4', cielo2: '#78baee', cielo3: '#9ccef4', cielo4: '#c0e0f6', cielo5: '#e2f0f4',
  nubeL: '#ffffff', nubeM: '#eef4fa', nubeS: '#c8d8ea', nubeD: '#a4b8d4',
  hoja: '#4c9a40', hojaL: '#74bc50', hojaB: '#a4d868', hojaS: '#347a38', hojaD: '#1e4a2c', tronco: '#6a4a30', troncoS: '#46301e',
  cesped: '#62ac48', cespedL: '#86c85a', cespedS: '#468a3a', cespedD: '#2f6a30', senda: '#dcc89a', sendaS: '#b8a070', sendaL: '#eedcb4',
  arena: '#e6d2a0', arenaS: '#c4a870', arenaL: '#f6ecc8', arenaD: '#a08450', duna: '#e09848',
  hierba: '#7a9a52', hierbaS: '#4e7238', hierbaL: '#a8c470', hierbaD: '#345228',
  alfombra: '#2f5e6a', alfombraS: '#20444e', alfombraL: '#e8d4a4', alfombraR: '#c2603a',
  sillon: '#d0883a', sillonS: '#a4622a', sillonL: '#eca858', sillonD: '#6e3e1a', gato: '#8a8e9a', gatoS: '#5e626e', gatoL: '#c4c8d0',
  oro: '#e8b840', oroS: '#a87820', oroL: '#f8e080', rojo: '#d8423a', rojoS: '#96241e', azul: '#3a6ab0', azulS: '#24447a', papel: '#efe6d0', papelS: '#cfc4a8', papelD: '#a89c80',
  barro: '#c8683a', barroS: '#96442a', barroL: '#e89060', metal: '#9aa4b4', metalS: '#6c7688', metalL: '#d0d8e4', metalD: '#4a5262', luz: '#fff0b8',
  ladrillo: '#b05a40', ladrilloS: '#86402c', ladrilloL: '#cc7858', ladrilloD: '#5e2c20', piedra: '#e0d4b8', piedraS: '#b4a688', teja: '#5a626e', tejaS: '#3e4652', tejaL: '#7a8490',
  manta: '#c8483a', mantaS: '#96302a', mantaL: '#f0e0c0', mantaA: '#3a5a8a', noche: '#1c2450', lila: '#9a6ad0', rosa: '#f08aa0', amarillo: '#f0c030',
});

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() que empieza «vacío» y en cada fotograma
// se pega sobre lo que se mueve por detrás (lo que se ve por la ventana); una por encuadre
const H_VACIO = 0x01020304, h_capas = new Map();

function h_capa(R, clave, dibuja) {
  let b = h_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(H_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); h_capas.set(clave, b); }
  return b;
}

// pega una capa fija (solo las filas y0–y1) sobre el búfer en uso, dejando ver lo de detrás por sus huecos
function h_pegar(R, b, y0 = 0, y1 = 179) { const d = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== H_VACIO) d[i] = c; } }

// el umbral de la trama ordenada 4 × 4 (0–1), para degradados y luces tramados
const H_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const h_b4 = (x, y) => (H_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const h_cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const h_mez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo (respeta R.recorte)
function h_degradado(R, x0, y0, x1, y1, cols, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const v = ((y - y0) / alto) ** curva * n, l = Math.floor(v), f = v - l; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.min(n, f > h_b4(x, y) ? l + 1 : l)]); }
}

// una nube de bolas que se solapan, con la base plana: c = [luz, cuerpo, panza, filo de abajo]; (cx, cy) el centro de
// su base, w el ancho, k la semilla; se recorta a [rx0, rx1] y por arriba a ry0
function h_nube(R, cx, cy, w, k, c, rx0 = 0, rx1 = 319, ry0 = 0) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3.4 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.max(rx0, Math.floor(cx - w * 0.62)), x1 = Math.min(rx1, Math.ceil(cx + w * 0.62));
  for (let y = Math.max(ry0, Math.floor(cy - 13)); y <= cy + 1; y++) for (let x = x0; x <= x1; x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 2) ? c[0] : c[1]);
}

// el cielo de día en [x0, x1] × [y0, hor]: degradado tramado y nubes de tres tonos a tres velocidades (lejanas pequeñas
// y lentas, medias, cercanas grandes y rápidas); o.esc: la escala de las nubes; o.calma: sin nubes grandes detrás de
// Atom ni sobre la barra del año
function h_cielo(R, t, x0, y0, x1, hor, o = {}) {
  const K = h_K, w = x1 - x0 + 90, esc = o.esc ?? 1, N = [K.nubeL, K.nubeM, K.nubeS, K.nubeD];
  h_degradado(R, x0, y0, x1, hor, [K.cielo0, K.cielo1, K.cielo2, K.cielo3, K.cielo4, K.cielo5], 0.9);
  for (const [fy, s, v, n, kk] of (o.capas ?? [[0.82, 0.45, 2.2, 5, 0], [0.58, 0.7, 4.5, 4, 1], [0.3, 1, 8, 3, 2]])) for (let i = 0; i < n; i++) {
    const cx = x0 - 45 + (((h(i, kk, 61) * w + t * v + i * w / n) % w) + w) % w, cy = Math.round(y0 + (hor - y0) * (fy + (h(i, kk, 62) - 0.5) * 0.22)), an = Math.round((26 + h(i, kk, 63) * 30) * s * esc);
    if (o.calma && kk > 0 && cy < y0 + 48 && (cx + an * 0.62 > 268 || cx - an * 0.62 < 178)) continue;
    h_nube(R, Math.round(cx), cy, an, i * 7 + kk * 31, kk === 0 ? [N[1], N[1], N[2], N[3]] : N, x0, x1, y0); }
}

// un pájaro pequeño (una uve que aletea), recortado a [x0, x1]
function h_pajaro(R, x, y, t, k, c, x0 = 0, x1 = 319) {
  const a = Math.sin(t * 9 + k * 2.1) > 0 ? 1 : -1; for (const [i, j] of [[0, 0], [-1, -a], [1, -a], [-2, -a * (a > 0 ? 2 : 1)], [2, -a * (a > 0 ? 2 : 1)]]) if (x + i >= x0 && x + i <= x1) R.pset(x + i, y + j, c);
}

// una brizna de hierba de playa que nace en (x, y) y sube «alto» px, curvada y mecida por el viento (k: la semilla;
// g: el grosor); la base oscura, el cuerpo en dos verdes y la punta clara
function h_brizna(R, x, y, alto, t, k, g = 1) {
  if (alto < 1) return; const K = h_K, inc = (h(k, 1, 91) - 0.5) * 0.9 + Math.sin(t * 1.7 + k * 1.3 + x * 0.06) * 0.22, c = h(k, 2, 91) < 0.5 ? K.hierba : K.hierbaS;
  for (let i = 0; i < alto; i++) { const px = Math.round(x + inc * i * i / Math.max(6, alto)), col = i >= alto - 1 - (alto > 8 ? 1 : 0) ? K.hierbaL : i < 2 ? K.hierbaD : c; R.pset(px, y - i, col); if (g > 1 && i < alto - 2) R.pset(px + 1, y - i, i < 2 ? K.hierbaD : K.hierbaS); }
}

// la textura de la arena en (x, y) a d px bajo la cresta: filo claro, ondas de viento, granos y brillos que se mueven
const h_grano = (x, y, d, t, lejos) => { const K = h_K;
  if (d === 0) return K.arenaL; if (d === 1) return lejos ? K.arena : K.arenaL;
  const o = Math.sin(x * 0.21 + d * 0.9 + Math.sin(x * 0.05) * 2);
  if (o > 0.82) return K.arenaS; if (o < -0.9) return K.arenaL;
  const r = h(x, y, 93); if (r < 0.05) return K.arenaD; if (r > 0.97 && h(x, y, Math.floor(t * 3)) > 0.5) return K.blanco;
  return lejos ? ((x + y) & 1 && r < 0.4 ? K.arenaS : K.arena) : r < 0.16 ? K.arenaS : K.arena; };

// un montón de arena con textura sobre una superficie: centro cx, base y, medio ancho w, alto a; asimétrico (la ladera
// de la derecha, en sombra) y con granos que ruedan
function h_monton(R, cx, y, w, a, t) {
  if (a < 1 || w < 2) return; const K = h_K;
  for (let i = -w; i <= w; i++) { const u = i / w, hh = Math.round(a * Math.pow(Math.cos(u * Math.PI / 2), 1.5) + (Math.abs(u) < 0.9 ? h(cx + i, 5, 94) * 1.2 : 0)); if (hh < 1) continue;
    for (let j = 0; j < hh; j++) { const d = hh - 1 - j; let c = h_grano(cx + i, y - j, d, t, false); if (u > 0.18 && d > 0 && d < hh * (0.3 + u * 0.6) && (i + j) % 2 === 0) c = K.arenaS; R.pset(cx + i, y - j, c); } }
  for (let k = 0; k < Math.min(8, a); k++) { const u = (t * 0.7 + h(k, 3, 95)) % 1, s = k % 2 ? 1 : -1, i = Math.round(s * (0.15 + u * 0.8) * w), hh = Math.round(a * Math.pow(Math.cos(i / w * Math.PI / 2), 1.5)); if (hh > 1) R.pset(cx + i, y - hh + 1, K.arenaD); }
}

// LA VISTA DE LA VENTANA del estudio, recortada a su hueco: cielo con nubes de tres tonos, pájaros, los tejados
// lejanos, los árboles del parque que se mecen, el césped con su sendero, una cometa, un paseante y una ciclista
function h_vistaParque(R, t, x0, y0, x1, y1) {
  const K = h_K, hor = y0 + Math.round((y1 - y0) * 0.62);
  R.recorte([x0, y0, x1, y1]);
  h_cielo(R, t, x0, y0, x1, hor, { esc: 0.55, capas: [[0.8, 0.5, 1.2, 3, 0], [0.5, 0.75, 2.4, 3, 1], [0.2, 1, 4.2, 2, 2]] });
  for (let k = 0; k < 3; k++) { const u = ((t * (5 + k * 2) + k * 31) % (x1 - x0 + 30)); h_pajaro(R, Math.round(x1 + 10 - u), y0 + 9 + k * 6 + Math.round(Math.sin(t * 1.3 + k) * 2), t, k, hex('#3a4a6a'), x0, x1); }
  // la cometa, con su cola
  { const cx = x0 + 50 + Math.round(Math.sin(t * 0.7) * 6), cy = y0 + 22 + Math.round(Math.cos(t * 0.9) * 3); R.poligono([[cx, cy - 4], [cx + 3, cy], [cx, cy + 4], [cx - 3, cy]], K.rojo); R.linea(cx, cy - 3, cx, cy + 3, K.oro); for (let i = 1; i < 6; i++) R.pset(cx - i + Math.round(Math.sin(t * 5 + i) * 1), cy + 4 + i, i % 2 ? K.oro : K.rojo); R.linea(cx, cy + 4, x0 + 40, hor + 8, K.nubeD, 2); }
  // tejados lejanos y la hilera de árboles
  for (let x = x0; x <= x1; x++) { const b = Math.floor((x - x0) / 11), a = 5 + Math.round(h(b, 1, 71) * 7), te = (x - x0) % 11; for (let y = hor - a - 4; y <= hor; y++) R.pset(x, y, y === hor - a - 4 ? hex('#a86a5a') : te === 0 ? hex('#a8a4b8') : (te === 4 || te === 7) && (y - hor + a) % 4 === 1 ? hex('#f4e8b8') : hex('#c4c0d0')); }
  for (let x = x0; x <= x1; x++) { const a = Math.round(4 + 2.5 * Math.sin(x * 0.31) + 1.5 * Math.sin(x * 0.83 + 2)); R.linea(x, hor - a, x, hor, hex('#5a9a7a')); R.pset(x, hor - a, hex('#86b89a')); }
  // el césped, el sendero y sus flores
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 51) < 0.12 ? K.cespedL : (y - hor) < 3 ? K.cespedS : ((x + (y - hor) * 2) >> 3) & 1 ? K.cesped : hex('#6cb450'));
  for (let y = hor + 3; y <= y1; y++) { const cx = x0 + 24 + Math.round(Math.sin((y - hor) * 0.2) * 9), w = 2 + ((y - hor) >> 2); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, x === cx - w ? K.sendaS : (x + y) % 5 === 0 ? K.sendaL : K.senda); }
  for (let k = 0; k < 9; k++) R.pset(x0 + 3 + Math.round(h(k, 1, 72) * (x1 - x0 - 6)), hor + 5 + Math.round(h(k, 2, 72) * (y1 - hor - 6)), k % 3 ? K.blanco : K.amarillo);
  // los árboles del parque, que se mecen
  for (const [dx, r, k] of [[8, 8, 0], [40, 10, 1], [64, 7, 2]]) { const m = Math.round(Math.sin(t * 0.9 + k * 2) * 1.2), cx = x0 + dx;
    R.linea(cx, hor - 2, cx, hor + 7, K.troncoS); R.linea(cx + 1, hor - 2, cx + 1, hor + 7, K.tronco); R.disco(cx + m, hor - r, r, K.hojaD); R.disco(cx + m - 1, hor - r - 1, r - 1, K.hojaS); R.disco(cx + m - 2, hor - r - 2, r - 3, K.hoja); R.disco(cx + m - 3, hor - r - 3, Math.max(1, r - 6), K.hojaL);
    for (let j = 0; j < 5; j++) R.pset(cx + m + Math.round((h(k, j, 73) - 0.5) * r * 1.4), hor - r + Math.round((h(k, j, 74) - 0.5) * r * 1.2), K.hojaB); }
  // el paseante y la ciclista
  for (const [v, y, c, k] of [[4.5, hor + 9, '#c8423a', 0], [-9, hor + 15, '#3a5a9a', 1]]) { const an = x1 - x0 + 20, x = Math.round(x0 - 10 + ((((t * v + k * 40) % an) + an) % an)), p = Math.floor(t * 4 + k) % 2;
    R.linea(x, y - 5, x, y - 2, hex(c)); R.pset(x, y - 6, hex('#f0c8a0')); R.pset(x, y - 7, hex('#4a3020'));
    if (k === 0) { R.pset(x - p, y - 1, K.k); R.pset(x + 1 - p, y, K.k); } else { R.disco(x - 3, y - 1, 2, K.k); R.disco(x + 3, y - 1, 2, K.k); R.pset(x - 3, y - 1, K.metalL); R.pset(x + 3, y - 1, K.metalL); R.linea(x - 3, y - 2, x + 3, y - 2, K.rojo); } }
  R.recorte(null);
}

// aclara el píxel (x, y) hacia la luz cálida del flexo (n = 1 o 2: cuánto), para los haces de luz sin trama
const h_claros = [new Map(), new Map(), new Map()];

function h_aclara(R, x, y, n) { if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y), M = h_claros[n]; let v = M.get(c); if (v === undefined) { v = h_mez(c, h_K.luz, n * 0.16); M.set(c, v); } R.pset(x, y, v); }

// el papel pintado del estudio en [x0, x1] × [y0, y1]: fondo arena con rayas finas y, cada «e» × 16 px, un sol con sus
// rayos alternado con una duna (tranquilo, sin motivos, donde calma(x, y) es cierto: la esquina de Atom y el año)
const H_SOL = ['....m....', '.m.....m.', '...mMm...', 'm..MLM..m', '...mMm...', '.m.....m.', '....m....'], H_DUNA = ['.........', '...mm....', '..mLLm...', '.mL..Lmm.', 'mL.....Lm', '.........', '.........'];

function h_papel(R, x0, y0, x1, y1, e = 1, calma = null) {
  const K = h_K, P = { m: K.motivo, M: K.motivoS, L: K.paredL };
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const r = x % (8 * e); R.pset(x, y, r === 0 && (y & 1) ? K.paredS : r === 4 * e && y % 3 === 0 ? K.paredL : h(x, y, 31) < 0.04 ? K.paredL : K.pared); }
  for (let fj = 0, y = y0 + 6 * e; y + 7 * e <= y1; y += 15 * e, fj++) for (let x = x0 + (fj & 1 ? 12 : 4) * e; x + 9 * e <= x1 + 4; x += 16 * e) {
    if (calma && (calma(x, y) || calma(x + 9 * e, y + 7 * e))) continue; const g = fj & 1 ? H_DUNA : H_SOL;
    for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) { const c = P[g[j][i]]; if (c != null) for (let b = 0; b < e; b++) for (let a = 0; a < e; a++) if (x + i * e + a <= x1) R.pset(x + i * e + a, y + j * e + b, c); } }
}

// la tarima: tablas a lo largo con las juntas al tresbolillo, vetas y nudos; las filas se ensanchan hacia la cámara
function h_tarima(R, y0, y1, filas) {
  const K = h_K; let f = 0;
  for (let y = y0; y <= y1; y++) { while (f + 1 < filas.length && y >= filas[f + 1]) f++; const junta = y === filas[f], an = 34 + f * 9, des = Math.round(h(f, 1, 41) * an);
    for (let x = 0; x < 320; x++) { const tb = Math.floor((x + des) / an), r = (x + des) % an, tono = h(tb, f, 42);
      let c = junta ? K.tarimaS : r === 0 ? K.tarimaD : tono < 0.3 ? K.tarimaL : tono > 0.8 ? h_mez(K.tarima, K.tarimaS, 0.5) : K.tarima;
      if (!junta && r > 0) { if (h(x >> 3, y, 43 + tb) < 0.16) c = K.tarimaS; else if (h((x + 3) >> 2, y, 44) < 0.07) c = K.tarimaL; if (Math.hypot(r - an * (0.3 + tono * 0.4), (y - filas[f] - 2) * 2) < 1.6 && tono > 0.55) c = K.tarimaD; }
      R.pset(x, y, c); } }
}

// un lomo de libro de pie en la balda: x, base y, ancho w, alto a, color c (con su tejuelo y su filo de luz)
function h_lomo(R, x, y, w, a, c, k) {
  R.rect(x, y - a, x + w - 1, y, c); R.rect(x, y - a, x, y, h_mez(c, h_K.blanco, 0.3)); R.rect(x + w - 1, y - a + 1, x + w - 1, y, h_mez(c, h_K.k, 0.4)); R.rect(x, y - a, x + w - 1, y - a, h_mez(c, h_K.blanco, 0.45));
  if (w > 2) { R.rect(x + 1, y - a + 3, x + w - 2, y - a + 3, h_K.oro); if (k % 2) R.rect(x + 1, y - 4, x + w - 2, y - 3, h_K.papel); else R.rect(x + 1, y - a + 5, x + w - 2, y - a + 5, h_K.oro); }
}

// LO FIJO DEL ESTUDIO (general): todo menos el hueco de la ventana, que queda vacío para la vista del parque
function h_estudioFijo(R) {
  const K = h_K, { rect, pset, disco, linea, poligono } = R;
  // la pared: papel pintado (tranquilo detrás de Atom y bajo el año), moldura con su sombra
  h_papel(R, 0, 6, 319, 113, 1, (x, y) => (x >= 258 && y <= 54) || (y <= 24 && x >= 10 && x <= 180));
  rect(0, 0, 319, 3, K.moldura); rect(0, 4, 319, 4, K.molduraS); rect(0, 5, 319, 5, K.nogalL); for (let x = 0; x < 320; x++) { pset(x, 6, K.paredS); if (x & 1) pset(x, 7, K.paredS); if (x % 12 === 3) pset(x, 2, K.molduraS); }
  // el friso de cuarterones verde azulado y el rodapié
  rect(0, 114, 319, 152, K.friso); rect(0, 114, 319, 114, K.frisoL); rect(0, 116, 319, 116, K.frisoD); rect(0, 149, 319, 152, K.frisoS); rect(0, 149, 319, 149, K.frisoL); rect(0, 152, 319, 152, K.frisoD);
  for (let x = 4; x < 320; x += 28) { rect(x, 119, x + 22, 146, K.frisoS); rect(x, 119, x + 22, 119, K.frisoD); rect(x, 119, x, 146, K.frisoD); rect(x + 22, 120, x + 22, 146, K.frisoL); rect(x + 1, 146, x + 22, 146, K.frisoL);
    rect(x + 3, 122, x + 19, 143, K.friso); rect(x + 3, 122, x + 19, 122, K.frisoL); rect(x + 3, 122, x + 3, 143, K.frisoL); rect(x + 19, 123, x + 19, 143, K.frisoD); rect(x + 4, 143, x + 19, 143, K.frisoD);
    for (let y = 124; y < 142; y++) for (let i = 5; i < 18; i++) if (h((x + i) >> 1, y >> 2, 32) < 0.12) pset(x + i, y, K.frisoS); }
  // la tarima, con la mancha de sol de la ventana (y la sombra de sus barrotes) y la alfombra
  h_tarima(R, 153, 179, [153, 157, 162, 168, 175]); for (let x = 0; x < 320; x++) { pset(x, 153, K.tarimaD); if ((x & 1) === 0) pset(x, 154, K.tarimaD); }
  { const A = (x, y) => { const u = (y - 159) / 18, xa = 66 - u * 12, xb = 236 + u * 12; return x >= xa && x <= xb ? [(x - xa) / (xb - xa), u] : null; };
    for (let y = 159; y <= 177; y++) for (let x = 50; x <= 250; x++) { const p = A(x, y); if (!p) continue; const [v, u] = p, bx = Math.min(v, 1 - v) * 170, by = Math.min(u, 1 - u) * 18;
      let c = bx < 2 || by < 1 ? K.alfombraL : bx < 6 || by < 2.6 ? K.alfombraR : bx < 8 || by < 3.6 ? K.alfombraL : K.alfombra;
      if (c === K.alfombra) { const dx = (v * 170) % 20 - 10, dy = (u - 0.5) * 22; const d = Math.abs(dx) + Math.abs(dy) * 1.6; c = d < 2 ? K.alfombraL : d < 5 ? K.alfombraR : d < 6.2 ? K.alfombraL : (x + y) % 2 && h(x, y, 33) < 0.3 ? K.alfombraS : K.alfombra; }
      else if (c === K.alfombraR && (x + y) % 4 === 0) c = K.cortinaS;
      pset(x, y, c); }
    for (let y = 160; y <= 177; y += 2) { const u = (y - 159) / 18; pset(Math.round(66 - u * 12) - 1, y, K.alfombraL); pset(Math.round(66 - u * 12) - 2, y, K.papelS); pset(Math.round(236 + u * 12) + 1, y, K.alfombraL); pset(Math.round(236 + u * 12) + 2, y, K.papelS); } }
  for (let y = 155; y <= 179; y++) { const u = (y - 155) / 24, xa = Math.round(204 - u * 40), xb = Math.round(264 - u * 30); for (let x = xa; x <= xb; x++) { const v = (x - xa) / (xb - xa); if (Math.abs(v - 0.5) < 0.03 || Math.abs(u - 0.45) < 0.04) continue; const c = R.pget(x, y); pset(x, y, c === K.tarima ? K.sol : c === K.tarimaL ? K.solL : h_mez(c, K.solL, 0.42)); } }
  // LA LIBRERÍA de nogal (x 6–60, y 34–152): cinco baldas con libros, un globo, un cactus, cajas y, arriba, un helecho
  rect(6, 38, 60, 152, K.k); rect(7, 39, 59, 151, K.nogal); rect(9, 41, 57, 146, K.nogalD); rect(4, 34, 62, 37, K.k); rect(5, 35, 61, 36, K.nogalL); rect(5, 36, 61, 36, K.nogalS); rect(7, 39, 8, 151, K.nogalL); rect(58, 39, 59, 151, K.nogalS); rect(7, 147, 59, 151, K.nogal); rect(7, 147, 59, 147, K.nogalL);
  { const COL = [K.rojo, K.azul, K.oroS, K.friso, K.cortina, K.noche, K.papelS, K.rojoS, K.azulS, K.hojaS, K.lila, K.sillon];
    [59, 81, 103, 125, 146].forEach((by, b) => { if (b < 4) { rect(9, by, 57, by + 1, K.nogalL); rect(9, by + 1, 57, by + 1, K.nogalS); for (let x = 9; x <= 57; x++) if (x % 2) pset(x, by + 2, K.k); }
      let x = 10, n = 0; const y = by - 1;
      while (x < 56) { const hueco = (b === 0 && x > 40) || (b === 2 && x > 20 && x < 34) || (b === 3 && x < 26) || (b === 4 && x > 30); if (hueco) { x++; continue; }
        const w = 2 + Math.floor(h(x, b, 34) * 3), a = 11 + Math.floor(h(x, b, 35) * 7); if (x + w > 56) break;
        if (h(x, b, 36) < 0.1 && x + 6 < 56) { linea(x, y, x + 4, y - a, COL[(n * 5 + b) % 12]); linea(x + 1, y, x + 5, y - a, h_mez(COL[(n * 5 + b) % 12], K.k, 0.3)); x += 7; n++; continue; }
        h_lomo(R, x, y, w, a, COL[(n * 5 + b * 3) % 12], n); x += w; n++; } });
    // el globo terráqueo, el cactus, los libros tumbados y las cajas de abajo
    rect(46, 56, 52, 57, K.oroS); linea(49, 52, 49, 56, K.oroS); disco(49, 48, 5, K.k); disco(49, 48, 4, K.azul); pset(47, 46, K.cielo3); pset(48, 47, K.hoja); pset(49, 47, K.hoja); pset(50, 49, K.hoja); pset(51, 48, K.hoja); pset(48, 50, K.hojaL); linea(44, 44, 54, 52, K.oro);
    rect(24, 98, 30, 101, K.barro); rect(24, 98, 30, 98, K.barroL); rect(26, 90, 28, 97, K.hoja); pset(26, 91, K.hojaL); rect(24, 93, 24, 95, K.hoja); pset(25, 95, K.hoja); rect(30, 92, 30, 94, K.hoja); pset(29, 94, K.hoja); pset(27, 89, K.rosa);
    rect(10, 121, 24, 123, K.rojoS); rect(10, 121, 24, 121, K.rojo); rect(11, 118, 23, 120, K.papel); rect(11, 118, 23, 118, K.azul); rect(12, 115, 22, 117, K.oroS); rect(12, 115, 22, 115, K.oro); disco(17, 111, 3, K.metalS); disco(17, 111, 2, K.metalL); pset(16, 110, K.blanco);
    rect(32, 132, 44, 145, K.papelS); rect(32, 132, 44, 133, K.papel); rect(36, 137, 40, 139, K.nogalD); rect(46, 128, 56, 145, K.frisoS); rect(46, 128, 56, 129, K.frisoL); rect(49, 134, 53, 136, K.papel); }
  // el helecho de encima, con sus hojas que cuelgan
  rect(14, 28, 24, 33, K.barro); rect(13, 27, 25, 28, K.barroL); rect(14, 32, 24, 33, K.barroS);
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.52, l = 9 + (k % 3) * 3; for (let i = 0; i < l; i++) { const x = 19 + Math.cos(a) * i * 1.1, y = 27 + Math.sin(a) * i * 0.5 + i * i * 0.07 - 3; pset(Math.round(x), Math.round(y), i % 3 ? K.hoja : K.hojaL); if (i % 2) pset(Math.round(x), Math.round(y) + 1, K.hojaS); } }
  rect(38, 29, 58, 33, K.papelS); rect(38, 29, 58, 29, K.papel); rect(38, 29, 39, 33, K.nogalL); rect(57, 29, 58, 33, K.nogalL); rect(40, 26, 54, 28, K.cortinaS); rect(40, 26, 54, 26, K.cortina);
  // el cesto de mapas enrollados
  rect(66, 136, 78, 152, K.k); rect(67, 137, 77, 151, K.oroS); for (let y = 137; y <= 151; y++) for (let x = 67; x <= 77; x++) if ((x + (y >> 1)) % 3 === 0) pset(x, y, y % 2 ? K.nogalL : K.oro); rect(67, 137, 77, 137, K.oroL);
  for (const [x, a, c] of [[68, 14, K.papel], [71, 19, K.papelS], [74, 12, K.papel]]) { rect(x, 136 - a, x + 2, 136, c); rect(x + 2, 136 - a, x + 2, 136, K.papelD); rect(x, 136 - a, x + 2, 136 - a, K.k); pset(x + 1, 136 - a, K.rojo); }
  // EL MAPA enmarcado (x 70–124, y 40–84): pergamino con una costa, dunas rayadas, la rosa de los vientos y una ruta
  rect(70, 40, 124, 84, K.k); rect(71, 41, 123, 83, K.nogal); rect(71, 41, 123, 41, K.nogalB); rect(71, 41, 71, 83, K.nogalL); rect(73, 43, 121, 81, K.oroS); rect(74, 44, 120, 80, K.papel); linea(97, 36, 90, 40, K.k); linea(97, 36, 104, 40, K.k); pset(97, 35, K.metal);
  for (let y = 44; y <= 80; y++) for (let x = 74; x <= 120; x++) { const co = 92 + Math.sin(y * 0.3) * 5 + Math.sin(y * 0.11 + 1) * 6; if (x < co - 1) pset(x, y, (x + y) % 4 === 0 && x > co - 7 ? K.cielo3 : h(x >> 1, y >> 1, 37) < 0.1 ? hex('#b8d4d8') : hex('#cfe0dc')); else if (x < co) pset(x, y, K.azulS); else if (h(x, y, 38) < 0.06) pset(x, y, K.papelS); }
  for (let k = 0; k < 6; k++) { const x = 100 + (k % 3) * 6 + (k > 2 ? 3 : 0), y = 52 + Math.floor(k / 3) * 9 + k; linea(x, y, x + 3, y - 2, K.duna); linea(x + 3, y - 2, x + 6, y, K.oroS); }
  for (let i = 0; i < 9; i++) pset(98 + i * 2, 74 - Math.round(Math.sin(i * 0.6) * 3), K.rojoS); linea(115, 70, 117, 72, K.rojo); linea(117, 70, 115, 72, K.rojo);
  disco(81, 73, 4, K.papelS); linea(81, 68, 81, 78, K.k); linea(76, 73, 86, 73, K.k); pset(81, 68, K.rojo); pset(81, 69, K.rojo); rect(76, 46, 88, 46, K.papelD); rect(76, 48, 84, 48, K.papelD);
  // EL RELOJ DE PÉNDULO (la esfera en 146, 50; la caja, y 59–82): las agujas y el péndulo van aparte
  rect(141, 58, 151, 83, K.k); rect(142, 59, 150, 82, K.nogal); rect(142, 59, 142, 82, K.nogalL); rect(144, 62, 148, 80, K.nogalD); poligono([[141, 84], [151, 84], [146, 88]], K.k); pset(146, 85, K.nogalL);
  disco(146, 50, 10, K.k); disco(146, 50, 9, K.nogal); disco(146, 50, 7, K.oroS); disco(146, 50, 6, K.blanco); for (let a = 0; a < 12; a++) pset(146 + Math.round(Math.sin(a * Math.PI / 6) * 5), 50 - Math.round(Math.cos(a * Math.PI / 6) * 5), a % 3 ? K.papelD : K.k); pset(140, 44, K.nogalB); pset(141, 43, K.nogalB);
  // LA VENTANA (los cristales, x 178–250, y 32–98, quedan vacíos): marco, barrotes, alféizar, barra y cortinas recogidas
  rect(173, 27, 255, 103, K.k); rect(174, 28, 254, 102, K.marco); rect(174, 28, 254, 28, K.blanco); rect(253, 29, 254, 102, K.marcoS); rect(177, 31, 251, 99, K.marcoS); rect(178, 32, 250, 98, H_VACIO);
  rect(213, 32, 215, 98, K.marco); rect(215, 32, 215, 98, K.marcoS); rect(178, 60, 250, 61, K.marco); rect(178, 62, 250, 62, K.marcoS);
  rect(169, 100, 259, 104, K.k); rect(170, 101, 258, 102, K.blanco); rect(170, 103, 258, 103, K.marcoS); for (let x = 172; x <= 256; x++) { pset(x, 105, K.paredS); if (x & 1) pset(x, 106, K.paredS); }
  // el cactus y los libritos del alféizar
  rect(238, 94, 244, 99, K.barro); rect(238, 94, 244, 94, K.barroL); rect(240, 86, 242, 93, K.hojaS); rect(240, 86, 240, 93, K.hoja); pset(243, 89, K.hojaS); pset(244, 88, K.hojaS); pset(244, 87, K.hojaS); pset(241, 85, K.amarillo);
  rect(184, 96, 196, 99, K.azulS); rect(184, 96, 196, 96, K.azul); rect(185, 93, 195, 95, K.papel); rect(185, 93, 195, 93, K.rojo);
  rect(158, 23, 270, 24, K.k); rect(159, 23, 269, 23, K.oro); disco(158, 23, 2, K.k); pset(158, 23, K.oroL); disco(270, 23, 2, K.k); pset(270, 23, K.oroL);
  for (const [xa, xb, s] of [[161, 178, 1], [250, 267, -1]]) for (let y = 25; y <= 122; y++) { const rec = y < 84 ? 1 : Math.max(0.55, 1 - (y - 84) * 0.02), at = Math.abs(y - 84) < 3, w = (xb - xa) * (at ? 0.5 : y < 84 ? 1 - (y - 25) * 0.004 : rec);
    for (let i = 0; i <= w; i++) { const x = s > 0 ? xa + i : xb - i, f = Math.sin(i * 1.15 + y * 0.03) + (h(i, 2, 39) - 0.5) * 0.4; let c = at ? (y === 84 ? K.oro : K.oroS) : f > 0.55 ? K.cortinaL : f < -0.5 ? K.cortinaS : K.cortina; if (i === 0 || i >= w - 0.99 || y === 122) c = at ? K.oroS : K.cortinaD; if (y === 25) c = K.k; pset(x, y, c); }
    if (y % 9 === 7 && !at) for (let i = 1; i < w; i += 2) pset(s > 0 ? xa + i : xb - i, y, K.cortinaS); }
  // la lámpara de pie, el cuadro de las dos lunas y EL SILLÓN mostaza con su cojín (el gato lo pinta hoy())
  rect(269, 96, 270, 152, K.k); rect(270, 96, 270, 152, K.oroS); rect(264, 151, 275, 153, K.k); rect(265, 151, 274, 152, K.oroS); poligono([[263, 97], [277, 97], [274, 80], [266, 80]], K.k); poligono([[264, 96], [276, 96], [273, 81], [267, 81]], K.luz); rect(267, 81, 273, 81, K.blanco); for (let y = 83; y < 96; y += 3) rect(265, y, 275, y, K.sol);
  for (let y = 98; y <= 112; y++) for (let x = 258; x <= 282; x++) if (Math.abs(x - 270) < (y - 96) * 0.9 && h_b4(x, y) < 0.3 && R.pget(x, y) === K.pared) pset(x, y, K.paredL);
  rect(280, 60, 314, 90, K.k); rect(281, 61, 313, 89, K.nogalL); rect(281, 61, 313, 61, K.nogalB); rect(283, 63, 311, 87, K.noche); linea(297, 56, 292, 60, K.k); linea(297, 56, 302, 60, K.k);
  for (let k = 0; k < 9; k++) pset(284 + Math.round(h(k, 1, 40) * 26), 64 + Math.round(h(k, 2, 40) * 10), K.blanco); disco(302, 69, 3, K.arenaL); disco(292, 67, 1, K.oro);
  for (let x = 283; x <= 311; x++) { const d1 = 80 - Math.round(Math.sin((x - 283) * 0.16) * 3), d2 = 83 - Math.round(Math.sin((x - 283) * 0.21 + 2) * 2); for (let y = d1; y <= 87; y++) pset(x, y, y === d1 ? hex('#f4c078') : y >= d2 ? hex('#b06a2c') : K.duna); }
  { const x0 = 268, x1 = 314; rect(x0 + 3, 150, x0 + 5, 154, K.k); rect(x1 - 5, 150, x1 - 3, 154, K.k);
    rect(x0 + 4, 108, x1 - 4, 150, K.k); rect(x0 + 5, 109, x1 - 5, 149, K.sillon); rect(x0 + 5, 109, x1 - 5, 110, K.sillonL); for (let y = 112; y < 134; y++) for (let x = x0 + 6; x < x1 - 5; x++) if ((x + y) % 5 === 0 && h(x, y, 45) < 0.5) pset(x, y, K.sillonS); for (const bx of [x0 + 14, x0 + 23, x0 + 32]) pset(bx, 120, K.sillonD);
    rect(x0, 124, x0 + 8, 150, K.k); rect(x0 + 1, 125, x0 + 7, 149, K.sillon); rect(x0 + 1, 125, x0 + 7, 126, K.sillonL); rect(x0 + 7, 127, x0 + 7, 149, K.sillonS); rect(x1 - 8, 124, x1, 150, K.k); rect(x1 - 7, 125, x1 - 1, 149, K.sillon); rect(x1 - 7, 125, x1 - 1, 126, K.sillonL); rect(x1 - 7, 127, x1 - 7, 149, K.sillonS);
    rect(x0 + 9, 136, x1 - 9, 137, K.sillonL); rect(x0 + 9, 138, x1 - 9, 149, K.sillonS); rect(x0 + 9, 143, x1 - 9, 143, K.sillonD); for (let x = x0 + 10; x < x1 - 9; x += 2) pset(x, 149, K.sillonD);
    rect(x1 - 22, 118, x1 - 10, 130, K.k); rect(x1 - 21, 119, x1 - 11, 129, K.friso); for (let y = 119; y <= 129; y++) for (let x = x1 - 21; x <= x1 - 11; x++) if ((x - y) % 4 === 0) pset(x, y, K.alfombraL); }
}

// EL ESTUDIO DE ATOM (general)
function h_estudio(R, t, o = {}) {
  const K = h_K, { pset, linea, disco, poligono } = R, V = [178, 32, 250, 98], a = h_cl(o.arena ?? 0), g = h_cl(o.hierba ?? 0);
  h_vistaParque(R, t, ...V);
  if (o.enVentana) { R.recorte(V); o.enVentana(R, t, V); R.recorte(null); }
  h_pegar(R, h_capa(R, 'estudio', () => h_estudioFijo(R)));
  // los reflejos del cristal: dos brillos en diagonal que cruzan despacio
  { const u = ((t * 0.1) % 1) * 110 - 20; for (let j = 0; j < 67; j++) for (const d of [0, 8]) { const x = Math.round(178 + u + d - j * 0.5), y = 32 + j; if (x >= 178 && x <= 250 && (x < 213 || x > 215) && (y < 60 || y > 62) && (j + d) % 3 === 0) pset(x, y, hex('#eef6fa')); } }
  // el reloj: las agujas y el péndulo
  { const cx = 146, cy = 50, as = Math.floor(t) * Math.PI / 30, am = t * 0.02 + 0.6, ah = 4.1; linea(cx, cy, cx + Math.round(Math.sin(ah) * 3), cy - Math.round(Math.cos(ah) * 3), K.k); linea(cx, cy, cx + Math.round(Math.sin(am) * 4), cy - Math.round(Math.cos(am) * 4), K.k); linea(cx, cy, cx + Math.round(Math.sin(as) * 5), cy - Math.round(Math.cos(as) * 5), K.rojo); pset(cx, cy, K.oro);
    const p = Math.sin(t * Math.PI), px = Math.round(146 + p * 2); linea(146, 62, px, 75, K.oroS); disco(px, 77, 2, K.oro); pset(px - 1, 76, K.oroL); }
  // la luz de la lámpara de pie, que respira
  if (Math.sin(t * 1.3) > -0.2) { pset(270, 98, K.luz); pset(269, 99, K.luz); pset(271, 99, K.luz); }
  // el gato gris dormido en el sillón: respira, mueve una oreja y la punta de la cola
  { const r = Math.sin(t * 1.6) > 0.3 ? 1 : 0, cx = 286, cy = 136;
    for (let i = -9; i <= 9; i++) { const al = Math.round(Math.sqrt(1 - (i / 9.5) ** 2) * (6 + r)); R.rect(cx + i, cy - al - 1, cx + i, cy, K.k); if (Math.abs(i) < 9) R.rect(cx + i, cy - al, cx + i, cy, (i + 20) % 4 === 0 ? K.gatoS : K.gato); if (Math.abs(i) < 7) pset(cx + i, cy - al, K.gatoL); }
    disco(cx - 8, cy - 3, 4, K.k); disco(cx - 8, cy - 3, 3, K.gato); const or = (t % 5.3) < 0.2 ? 1 : 0; poligono([[cx - 12, cy - 5], [cx - 11, cy - 9 - or], [cx - 9, cy - 6]], K.k); poligono([[cx - 7, cy - 6], [cx - 5, cy - 9], [cx - 4, cy - 5]], K.k); pset(cx - 11, cy - 7 - or, K.gato); pset(cx - 5, cy - 7, K.gato);
    pset(cx - 10, cy - 3, K.k); pset(cx - 9, cy - 3, K.k); pset(cx - 6, cy - 3, K.k); pset(cx - 5, cy - 3, K.k); pset(cx - 8, cy - 1, K.rosa); R.rect(cx - 9, cy, cx - 7, cy, K.gatoL);
    const cl = Math.round(Math.sin(t * 2.2) * 1.5); linea(cx + 9, cy - 1, cx + 13, cy - 3 - cl, K.k); linea(cx + 9, cy, cx + 14, cy - 2 - cl, K.gato); pset(cx + 14, cy - 3 - cl, K.gatoL);
    if (Math.floor(t * 0.5) % 3 === 0) { const u = (t * 0.5) % 1; pset(cx - 14 - Math.round(u * 3), cy - 12 - Math.round(u * 6), K.blanco); pset(cx - 13 - Math.round(u * 3), cy - 12 - Math.round(u * 6), K.blanco); } }
  // las motas de polvo en el haz de sol
  for (let k = 0; k < 14; k++) { const u = (t * 0.05 + h(k, 1, 46)) % 1, y = Math.round(104 + u * 70), x = Math.round(250 - u * 60 + Math.sin(t * 0.8 + k) * 6 + h(k, 2, 46) * 30 - 15); if (Math.sin(t * 2 + k * 1.7) > 0 && y > 104) pset(x, y, K.solL); }
  // LA ARENA del fondo (o.arena): dunas que suben desde el suelo y se arriman a los muebles, con granos que ruedan
  if (a > 0.02) for (let x = 0; x < 320; x++) { const y0 = Math.round(h_arenaFondo(x, a)); for (let y = Math.max(140, y0); y <= 179; y++) pset(x, y, h_grano(x, y, y - y0, t, true)); }
  // LA HIERBA del fondo (o.hierba): el tapiz que cubre el suelo y las repisas (h_estudioVerde) y, encima, las matas
  // sueltas que brotan en la arena y al pie de los muebles, en las baldas y en el alféizar
  if (g > 0) { h_estudioVerde(R, t, g); for (let k = 0; k < 34; k++) { const x = Math.round(3 + k * 9.4 + h(k, 1, 47) * 6), al = (5 + h(k, 2, 47) * 9) * h_cl((g - 0.45 - h(k, 3, 47) * 0.35) / 0.2); h_brizna(R, x, Math.min(179, Math.round(a > 0.02 ? Math.min(h_arenaFondo(x, a) + 1, 160) : 154 + h(k, 4, 47) * 4)), Math.round(al), t, k); }
    for (const [x, y, th, k] of [[14, 58, 0.8, 1], [36, 80, 0.86, 2], [22, 124, 0.76, 3], [50, 102, 0.9, 4], [190, 99, 0.82, 5], [226, 99, 0.88, 6], [272, 124, 0.84, 7], [310, 124, 0.9, 8], [84, 39, 0.92, 9], [110, 39, 0.95, 10], [304, 59, 0.96, 11]]) for (let i = -1; i <= 1; i++) h_brizna(R, x + i * 3, y, Math.round((5 + h(k, i, 48) * 5) * h_cl((g - th) / 0.08)), t, k * 3 + i); }
  return { suelo: 162, sueloMin: 158, sueloMax: 174, mesa: { x0: 92, x1: 208, y: 131, pie: 166 }, reloj: [152, 131], relojEscala: 2, monton: [152, 131], plantita: [129, 131], flexo: [183, 104], ventana: V, libreria: [6, 34, 60, 152], mapa: [70, 40, 124, 84], relojPared: [146, 50], sillon: [291, 136], gato: [286, 136], cuadro: [280, 60, 314, 90], libre: [[78, 162], [230, 162]] };
}
// la cresta de la arena del fondo (y) y la de delante en la columna x, para o.arena = a
const h_arenaFondo = (x, a) => 181 - a * (12 + 13 * Math.exp(-(((x - 150) / 120) ** 2)) + 3 * Math.sin(x * 0.06) + 2 * Math.sin(x * 0.17 + 2) + 5 * Math.exp(-(((x - 34) / 22) ** 2)) + 4 * Math.exp(-(((x - 290) / 20) ** 2)));

const h_arenaDelante = (x, a) => 182 - a * (9 + 25 * Math.exp(-(((x - 152) / 66) ** 2)) + 2.5 * Math.sin(x * 0.08 + 1) + 1.5 * Math.sin(x * 0.21));

// el alto del montón de la mesa del estudio en la columna x
const h_arenaMesa = (x, a) => { const w = 5 + a * 49, u = (x - 152) / w; return Math.abs(u) >= 1 ? 0 : Math.round(a * 17 * Math.pow(Math.cos(u * Math.PI / 2), 1.5)); };

// LO FIJO DE DELANTE DEL ESTUDIO: el escritorio de nogal con sus cajones, la pila de libros, el bote de lápices, la
// maceta de la plantita y el flexo
function h_estudioDelanteFijo(R) {
  const K = h_K, { rect, pset, linea, disco } = R;
  for (let x = 90; x <= 212; x++) for (let y = 166; y <= 169; y++) if ((x + y) % 2 === 0 || y < 168) pset(x, y, K.alfombraS);
  rect(95, 135, 205, 166, K.k); rect(96, 136, 204, 165, K.nogal); rect(131, 144, 169, 165, K.nogalD); for (let y = 145; y <= 158; y++) for (let x = 132; x <= 168; x++) if ((x + y) % 2) pset(x, y, K.nogalS); rect(132, 159, 168, 165, K.k);
  for (let y = 136; y <= 165; y++) for (let x = 96; x <= 204; x++) if ((x < 131 || x > 169 || y < 144) && h(x >> 3, y, 49) < 0.14) pset(x, y, K.nogalS);
  for (const [x0, x1] of [[97, 129], [171, 203]]) for (const [y0, y1] of [[137, 145], [147, 155], [157, 164]]) { rect(x0, y0, x1, y1, K.nogalS); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K.nogal); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, K.nogalL); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, K.nogalS); const cx = (x0 + x1) >> 1; rect(cx - 3, y0 + 4, cx + 3, y0 + 4, K.oro); pset(cx - 3, y0 + 5, K.oroS); pset(cx + 3, y0 + 5, K.oroS); for (let x = x0 + 3; x < x1 - 2; x += 5) if (h(x, y0, 50) < 0.5) pset(x, y0 + 3, K.nogalL); }
  rect(132, 137, 168, 143, K.nogalS); rect(133, 138, 167, 142, K.nogal); rect(133, 138, 167, 138, K.nogalL); disco(150, 140, 1, K.oro); pset(150, 141, K.k);
  rect(96, 165, 100, 167, K.k); rect(200, 165, 204, 167, K.k); rect(126, 165, 130, 167, K.k); rect(170, 165, 174, 167, K.k);
  // el tablero: canto, vetas y brillo
  rect(91, 130, 209, 135, K.k); rect(92, 131, 208, 133, K.nogalL); rect(92, 131, 208, 131, K.nogalB); rect(92, 134, 208, 134, K.nogalS); for (let x = 93; x < 208; x++) { if (h(x >> 2, 1, 51) < 0.3) pset(x, 132, K.nogal); if (h(x >> 3, 2, 51) < 0.25) pset(x, 133, K.nogal); }
  // la pila de libros con una manzana, el bote de lápices, los papeles y la maceta de la plantita
  rect(96, 126, 120, 130, K.k); rect(97, 127, 119, 129, K.rojoS); rect(97, 127, 119, 127, K.rojo); rect(117, 128, 119, 129, K.papel); rect(98, 121, 121, 126, K.k); rect(99, 122, 120, 125, K.friso); rect(99, 122, 120, 122, K.frisoL); rect(118, 123, 120, 125, K.papel); rect(104, 123, 110, 123, K.oro);
  rect(97, 117, 117, 121, K.k); rect(98, 118, 116, 120, K.oroS); rect(98, 118, 116, 118, K.oro); rect(114, 119, 116, 120, K.papel); disco(107, 113, 3, K.k); disco(107, 113, 2, K.rojo); pset(106, 112, K.rosa); pset(107, 110, K.troncoS); pset(108, 109, K.hoja);
  rect(124, 123, 134, 130, K.k); rect(125, 124, 133, 129, K.barro); rect(124, 123, 134, 124, K.k); rect(125, 123, 133, 123, K.barroL); rect(132, 125, 133, 129, K.barroS); rect(126, 122, 132, 122, K.troncoS);
  rect(169, 121, 177, 130, K.k); rect(170, 122, 176, 129, K.azul); rect(170, 122, 170, 129, K.cielo2); rect(170, 125, 176, 125, K.azulS); linea(171, 121, 170, 113, K.amarillo); pset(170, 112, K.k); linea(173, 121, 174, 111, K.rojo); pset(174, 110, K.rosa); linea(175, 121, 177, 114, K.hoja); pset(177, 113, K.k);
  // el flexo: base, dos brazos con su codo y la pantalla
  rect(185, 128, 199, 130, K.k); rect(186, 128, 198, 129, K.metalS); rect(186, 128, 198, 128, K.metalL); linea(192, 127, 199, 110, K.k); linea(193, 127, 200, 110, K.metal); disco(200, 109, 2, K.k); pset(200, 109, K.oro); linea(199, 108, 188, 100, K.k); linea(199, 107, 188, 99, K.metal);
  R.poligono([[178, 107], [190, 107], [189, 98], [184, 96], [180, 99]], K.k); R.poligono([[180, 106], [189, 106], [188, 99], [184, 98], [181, 100]], K.friso); rect(181, 100, 182, 104, K.frisoL); rect(180, 107, 189, 107, K.luz);
}

// DELANTE EN EL ESTUDIO (general): el escritorio con lo suyo, el reloj de arena, la luz del flexo y, con o.arena y
// o.hierba, el montón de la mesa, los hilos que caen, la duna de delante y la hierba que se queda con todo
function h_estudioDelante(R, t, o = {}) {
  const K = h_K, { pset, linea } = R, a = h_cl(o.arena ?? 0), g = h_cl(o.hierba ?? 0), am = Math.max(a, o.monton ?? 0);
  h_pegar(R, h_capa(R, 'estudioD', () => h_estudioDelanteFijo(R)), 94, 170);
  // la luz del flexo (tramada, con un parpadeo leve) y su charco en el tablero
  { const f = Math.sin(t * 9) > 0.96 ? 0.8 : 1; for (let y = 108; y <= 130; y++) { const u = (y - 108) / 22, xa = Math.round(180 - u * 12), xb = Math.round(189 + u * 5); for (let x = xa; x <= xb; x++) h_aclara(R, x, y, f < 1 || u > 0.55 ? 1 : 2); } for (let x = 164; x <= 196; x++) if (x % 2 || f === 1) pset(x, 131, K.sol); }
  // la plantita: dos hojas y un brote que se mecen
  { const m = Math.round(Math.sin(t * 1.4) * 1); linea(129, 122, 129 + m, 116, K.hojaS); linea(129, 120, 125 + m, 117, K.hoja); pset(124 + m, 116, K.hojaL); linea(129, 119, 133 + m, 115, K.hoja); pset(134 + m, 114, K.hojaL); pset(129 + m, 115, K.hojaB); }
  // el reloj de arena grande (a escala 2), que corre; con arena, rajado
  if (o.reloj !== false) PIEZAS_DU.relojArena?.(R, 152, 131, { s: 2, t, nivel: o.nivel ?? Math.max(0.2, 1 - t * 0.03), roto: !!o.roto });
  // LA ARENA de la mesa: el montón que crece y se come el tablero, y los hilos que caen por el canto
  if (am > 0.02) { for (let x = 92; x <= 208; x++) { const hh = h_arenaMesa(x, am); for (let j = 0; j < hh; j++) pset(x, 131 - j, (x > 158 && j < hh - 1 && j > hh * 0.4 && (x + j) % 2 === 0) ? K.arenaS : h_grano(x, 131 - j, hh - 1 - j, t, false)); }
    for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1, s = k % 2 ? 1 : -1, x = Math.round(152 + s * u * (12 + am * 36)), hh = h_arenaMesa(x, am); if (hh > 1) pset(x, 131 - hh + 1, K.arenaD); } }
  if (a > 0.18) for (const [x, th] of [[147, 0.18], [163, 0.3], [118, 0.5], [190, 0.62], [104, 0.8]]) if (a > th) { const y1 = Math.min(179, Math.round(h_arenaDelante(x, a))); for (let y = 134; y < y1; y++) { const f = (y * 3 + Math.floor(t * 30) + x) % 5; pset(x, y, f === 0 ? K.arenaL : f === 3 ? K.arenaS : K.arena); if (a - th > 0.25 && f < 3) pset(x + 1, y, K.arena); } for (let k = 0; k < 3; k++) pset(x - 2 + Math.round(h(k, Math.floor(t * 12), x) * 5), y1 - 1 - Math.round(h(k, Math.floor(t * 12), x + 1) * 3), K.arenaL); h_fila(R, x - 2, 134, x + 2, K.arena); }
  // LA ARENA de delante: la duna que entierra las patas del escritorio (y los pies de quien ande por ahí)
  if (a > 0.02) for (let x = 0; x < 320; x++) { const y0 = Math.round(h_arenaDelante(x, a)); for (let y = y0; y <= 179; y++) pset(x, y, h_grano(x, y, y - y0, t, false)); }
  // LA HIERBA: nace en el montón, corre por el tablero, cuelga por los cajones y sale por el suelo
  if (g > 0) {
    h_mesaVerde(R, t, g, am);
    // el tapiz del suelo sigue por encima de la duna de delante (un poco más tarde que en la tarima)
    if (a > 0.02) for (let x = 0; x < 320; x++) { const y0 = Math.max(153, Math.round(h_arenaDelante(x, a))); for (let y = y0; y <= 179; y++) { const s = g - h_umbralSuelo(x, y) - 0.08; if (s > 0 && (s >= 0.05 || !((x + y) & 1))) pset(x, y, h_tonoTapiz(x, y, t)); } if (y0 <= 179) h_mata(R, x, y0, (2 + h(x >> 1, 6, 100) * 4) * h_sube(g, h_umbralSuelo(x, y0) + 0.08, 0.12), t, 9); }
    for (let k = 0; k < 62; k++) { const x = Math.round(93 + k * 1.87 + h(k, 1, 52)), d = Math.abs(x - 152), al = (6 + h(k, 2, 52) * (9 + g * 6)) * h_cl((g - d / 58 * 0.5) / 0.18); h_brizna(R, x, 131 - h_arenaMesa(x, am), Math.round(al), t, k, k % 5 === 0 ? 2 : 1); }
    for (let k = 0; k < 15; k++) { const x = Math.round(96 + k * 7.6 + h(k, 1, 53) * 3), l = Math.round((14 + h(k, 2, 53) * 16) * h_cl((g - 0.38 - Math.abs(x - 152) / 58 * 0.25) / 0.3)); for (let i = 0; i < l; i++) { const px = x + Math.round(Math.sin(i * 0.5 + k) * 1.2 + Math.sin(t * 1.5 + k) * i * 0.03); pset(px, 134 + i, i % 3 ? K.hierbaS : K.hierba); if (i % 4 === 2) { pset(px + (i % 8 < 4 ? 1 : -1), 134 + i, K.hierbaL); pset(px + (i % 8 < 4 ? 2 : -2), 133 + i, K.hierba); } } }
    for (let k = 0; k < 46; k++) { const x = Math.round(4 + k * 6.9 + h(k, 1, 54) * 5), yd = h_arenaDelante(x, a), y = Math.round(a > 0.02 && yd < 178 ? yd + 1 + h(k, 3, 54) * (178 - yd) : 167 + h(k, 3, 54) * 12), al = (7 + h(k, 2, 54) * 11) * h_cl((g - 0.42 - Math.abs(x - 152) / 170 * 0.4) / 0.15); h_brizna(R, x, Math.min(179, y), Math.round(al), t, k + 70, k % 3 === 0 ? 2 : 1); }
    // las flores y la mariposa del final
    if (g > 0.8) for (let k = 0; k < 9; k++) { if (g < 0.8 + (k * 5 % 9) * 0.02) continue; const x = 98 + k * 13 + (k === 4 ? 9 : 0), y = 131 - h_arenaMesa(x, am) - 9 - (k % 3) * 2 + Math.round(Math.sin(t * 1.7 + k) * 1), c = [K.blanco, K.amarillo, K.rosa][k % 3], ce = c === K.amarillo ? K.rojo : K.amarillo; pset(x, y - 1, c); pset(x - 1, y, c); pset(x + 1, y, c); pset(x, y + 1, c); pset(x, y, ce); pset(x, y + 2, K.hierbaS); }
    // las mariposas: una sobre la mesa desde la mitad y, al final, otra junto a la librería y otra sobre el tapiz
    for (const [th, cx, cy, rx, ry, v, c, cl] of [[0.6, 152, 100, 40, 10, 1.1, K.amarillo, K.oroL], [0.82, 78, 124, 14, 12, 0.8, K.blanco, K.cielo2], [0.9, 236, 142, 18, 8, 1.4, K.rosa, K.blanco]]) if (g > th) { const an = t * v + cx, bx = Math.round(cx + Math.cos(an) * rx + Math.sin(an * 2.3) * 6), by = Math.round(cy + Math.sin(an * 1.7) * ry), al = Math.sin(t * 16 + cx) > 0 ? 2 : 1; pset(bx, by, K.k); pset(bx - 1, by - al + 1, c); pset(bx + 1, by - al + 1, c); if (al > 1) { pset(bx - 2, by - 2, cl); pset(bx + 2, by - 2, cl); } } }
  return { mesa: { x0: 92, x1: 208, y: 131 }, reloj: [152, 131], relojEscala: 2 };
}
// un derrame pequeño de arena en el canto (de x0 a x1 en la fila y)
const h_fila = (R, x0, y, x1, c) => { for (let x = x0; x <= x1; x++) R.pset(x, y, c); };

// LO FIJO DE LA MESA DE CERCA: la pared con el papel pintado a doble tamaño, la ventana (el hueco, vacío), la cortina,
// el cuadro de las dos lunas, el canto del friso y el tablero de nogal con sus vetas, el libro abierto, la hoja de
// notas, el bote de lápices, la maceta y el flexo
function h_mesaFijo(R) {
  const K = h_K, { rect, pset, disco, linea, poligono } = R;
  h_papel(R, 0, 6, 319, 97, 2, (x, y) => (x >= 252 && y <= 58) || (y <= 30 && x >= 6 && x <= 186));
  rect(0, 0, 319, 3, K.moldura); rect(0, 4, 319, 4, K.molduraS); rect(0, 5, 319, 5, K.nogalL); for (let x = 0; x < 320; x++) { pset(x, 6, K.paredS); if (x & 1) pset(x, 7, K.paredS); }
  rect(0, 98, 319, 107, K.friso); rect(0, 98, 319, 99, K.frisoL); rect(0, 101, 319, 101, K.frisoD); for (let x = 0; x < 320; x++) if (h(x >> 2, 3, 55) < 0.3) pset(x, 104, K.frisoS);
  // la ventana (cristales x 34–116, y 32–88) con la cortina recogida a la derecha
  rect(27, 26, 123, 95, K.k); rect(28, 27, 122, 94, K.marco); rect(28, 27, 122, 28, K.blanco); rect(120, 29, 122, 94, K.marcoS); rect(32, 30, 118, 90, K.marcoS); rect(34, 32, 116, 88, H_VACIO); rect(73, 32, 76, 88, K.marco); rect(76, 32, 76, 88, K.marcoS); rect(34, 58, 116, 60, K.marco); rect(34, 61, 116, 61, K.marcoS);
  rect(22, 93, 128, 97, K.k); rect(23, 94, 127, 95, K.blanco); rect(23, 96, 127, 96, K.marcoS);
  for (let y = 25; y <= 97; y++) { const at = Math.abs(y - 70) < 4, w = at ? 13 : y < 70 ? 24 - (y - 25) * 0.12 : 16 + (y - 70) * 0.25;
    for (let i = 0; i <= w; i++) { const x = 146 - i, f = Math.sin(i * 0.62 + y * 0.02) + (h(i >> 1, 2, 56) - 0.5) * 0.4; let c = at ? (Math.abs(y - 70) < 2 ? K.oro : K.oroS) : f > 0.55 ? K.cortinaL : f < -0.5 ? K.cortinaS : K.cortina; if (i === 0 || i >= w - 0.99) c = at ? K.oroS : K.cortinaD; pset(x, y, c); } }
  rect(20, 23, 150, 25, K.k); rect(21, 23, 149, 24, K.oro); rect(21, 24, 149, 24, K.oroS); disco(150, 24, 2, K.k); pset(150, 24, K.oro);
  // el cuadro de las dos lunas sobre las dunas (el planeta es el nuestro)
  rect(186, 34, 248, 84, K.k); rect(187, 35, 247, 83, K.nogalL); rect(187, 35, 247, 36, K.nogalB); rect(246, 37, 247, 83, K.nogal); rect(190, 38, 244, 80, K.oroS); rect(191, 39, 243, 79, K.noche); linea(217, 26, 208, 34, K.k); linea(217, 26, 226, 34, K.k); pset(217, 25, K.metal);
  for (let y = 39; y <= 62; y++) for (let x = 191; x <= 243; x++) if (h_b4(x, y) < (y - 39) / 60) pset(x, y, hex('#34448a'));
  for (let k = 0; k < 16; k++) pset(192 + Math.round(h(k, 1, 57) * 50), 40 + Math.round(h(k, 2, 57) * 18), k % 4 ? K.blanco : K.oroL); disco(228, 50, 6, K.arenaL); disco(226, 48, 2, K.arena); pset(231, 52, K.arena); disco(205, 46, 3, K.oro); pset(204, 45, K.oroL);
  for (let x = 191; x <= 243; x++) { const d1 = 66 - Math.round(Math.sin((x - 191) * 0.085) * 6), d2 = 72 - Math.round(Math.sin((x - 191) * 0.11 + 2) * 4); for (let y = d1; y <= 79; y++) pset(x, y, y === d1 ? hex('#f4c078') : y >= d2 ? ((x + y) % 3 === 0 ? hex('#8a4e20') : hex('#b06a2c')) : (x * 2 + y) % 7 === 0 ? hex('#f4c078') : K.duna); }
  // el tablero: tablas a lo largo, vetas largas, nudos, el canto de atrás con su brillo y el charco de luz del flexo
  for (let y = 108; y <= 179; y++) for (let x = 0; x < 320; x++) { const tb = y < 122 ? 0 : y < 144 ? 1 : 2, v = Math.sin(x * 0.045 + tb * 2.1 + Math.sin(x * 0.013 + tb) * 3 + (y - 108) * (0.5 - tb * 0.12)), r = h(x >> 3, y, 58 + tb);
    let c = v > 0.72 ? K.nogalS : v < -0.8 ? K.nogalL : r < 0.1 ? K.nogalS : r > 0.93 ? K.nogalL : K.nogal;
    if (y === 122 || y === 144) c = K.nogalD; else if (y === 123 || y === 145) c = K.nogalL;
    const lu = 1 - Math.hypot((x - 120) / 130, (y - 140) / 34); if (lu > 0 && h_b4(x, y) < lu * 0.75) c = c === K.nogalS ? K.nogal : c === K.nogal ? K.nogalL : c === K.nogalD ? K.nogalS : K.nogalB;
    pset(x, y, c); }
  rect(0, 108, 319, 108, K.nogalB); for (let x = 0; x < 320; x++) if (x % 3 === 0) pset(x, 109, K.nogalB);
  for (const [nx, ny] of [[196, 116], [44, 152], [286, 166], [154, 172]]) { disco(nx, ny, 2, K.nogalS); pset(nx, ny, K.nogalD); for (let a2 = 0; a2 < 6; a2++) pset(nx + Math.round(Math.cos(a2) * 4), ny + Math.round(Math.sin(a2) * 2), K.nogalS); }
  // la hoja de notas (rayas, un dibujo de dunas y una chincheta) y el libro abierto, con su sombra
  poligono([[84, 150], [124, 146], [128, 172], [88, 177]], K.nogalD); poligono([[82, 148], [122, 144], [126, 170], [86, 175]], K.papel); for (let i = 0; i < 6; i++) linea(88 + (i > 3 ? 0 : 0), 153 + i * 3.4, 118 - (i % 3) * 5, 150 + i * 3.4, K.papelD); linea(92, 172, 100, 166, K.duna); linea(100, 166, 108, 171, K.oroS); linea(106, 170, 113, 165, K.duna); linea(113, 165, 121, 168, K.oroS); disco(104, 148, 1, K.rojo);
  for (let x = 12; x <= 90; x++) for (let y = 141; y <= 144; y++) if ((x + y) % 2 === 0 || y < 143) pset(x, y, K.nogalD);
  PIEZAS_DU.libro?.(R, 50, 142, { s: 2, abierto: true });
  // el bote de lápices (a la derecha, al fondo) y la maceta de la plantita
  for (let x = 286; x <= 312; x++) pset(x, 131, K.nogalD); rect(290, 108, 308, 130, K.k); rect(291, 109, 307, 129, K.azul); rect(291, 109, 293, 129, K.cielo2); rect(305, 110, 307, 129, K.azulS); rect(291, 116, 307, 117, K.azulS); rect(291, 109, 307, 110, K.cielo3);
  for (const [x, a2, c, p] of [[294, 22, K.amarillo, K.k], [298, 26, K.rojo, K.rosa], [302, 19, K.hoja, K.k], [305, 23, K.oroS, K.rosa]]) { linea(x, 108, x + 1, 108 - a2, c); linea(x + 1, 108, x + 2, 108 - a2, h_mez(c, K.k, 0.3)); pset(x + 1, 107 - a2, p); pset(x + 2, 107 - a2, p); }
  for (let x = 250; x <= 276; x++) pset(x, 135, K.nogalD); rect(252, 118, 272, 134, K.k); poligono([[253, 119], [272, 119], [270, 134], [255, 134]], K.barro); rect(251, 117, 273, 120, K.k); rect(252, 118, 272, 119, K.barroL); rect(268, 121, 269, 133, K.barroS); rect(255, 122, 256, 131, K.barroL); rect(254, 117, 270, 117, K.troncoS);
  // el flexo, que entra por la izquierda
  for (let x = 2; x <= 36; x++) pset(x, 128, K.nogalD); rect(4, 121, 34, 127, K.k); rect(5, 122, 33, 126, K.metalS); rect(5, 122, 33, 123, K.metalL); rect(17, 118, 21, 121, K.k); rect(18, 119, 20, 121, K.metal);
  for (let d = -1; d <= 1; d++) { linea(19 + d, 118, 8 + d, 66, d ? K.k : K.metal); linea(8 + d, 66, 30, 44 + d, d ? K.k : K.metal); } linea(20, 118, 9, 66, K.metalL); disco(8, 66, 3, K.k); disco(8, 66, 1, K.oro);
  poligono([[24, 36], [38, 34], [52, 52], [50, 60], [30, 60], [22, 46]], K.k); poligono([[26, 38], [37, 36], [50, 53], [48, 58], [31, 58], [24, 46]], K.friso); linea(27, 40, 36, 38, K.frisoL); linea(26, 42, 30, 54, K.frisoL); rect(31, 59, 49, 60, K.luz); rect(34, 61, 46, 61, K.blanco);
}

// la vista desenfocada de la ventana de la mesa: cielo, nubes y copas en manchas tramadas que se mueven
function h_vistaBorrosa(R, t, x0, y0, x1, y1) {
  const K = h_K, hor = y0 + 38;
  R.recorte([x0, y0, x1, y1]);
  h_degradado(R, x0, y0, x1, y1, [K.cielo1, K.cielo2, K.cielo3, K.cielo4, K.cespedL, K.cesped, K.cespedS], 1);
  const mancha = (cx, cy, rx, ry, c, c2) => { for (let y = Math.max(y0, Math.floor(cy - ry)); y <= Math.min(y1, cy + ry); y++) for (let x = Math.max(x0, Math.floor(cx - rx)); x <= Math.min(x1, cx + rx); x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1 && h_b4(x, y) < (1 - d) * 2.2) R.pset(x, y, d < 0.5 && c2 ? c2 : c); } };
  for (let k = 0; k < 3; k++) { const w = x1 - x0 + 60, cx = x0 - 30 + ((t * (2 + k * 1.5) + k * 47) % w); mancha(cx, y0 + 7 + k * 8, 16 + k * 3, 5 + k, K.nubeM, K.nubeL); }
  for (const [dx, r, k] of [[10, 17, 0], [44, 22, 1], [74, 15, 2]]) { const m = Math.sin(t * 0.8 + k * 2) * 1.6; mancha(x0 + dx + m, hor - r * 0.3, r, r * 0.9, K.hojaS, K.hoja); mancha(x0 + dx + m - 4, hor - r * 0.6, r * 0.5, r * 0.45, K.hojaL); }
  for (let k = 0; k < 5; k++) { const x = x0 + 6 + Math.round(h(k, 1, 59) * 70), y = Math.round(y0 + 14 + h(k, 2, 59) * 40 + Math.sin(t * 1.2 + k) * 1.5); if (Math.sin(t * 1.6 + k * 2.2) > 0.2) { R.pset(x, y, K.solL); R.pset(x + 1, y, K.solL); R.pset(x, y + 1, K.blanco); } }
  R.recorte(null);
}

// los dos montones de la mesa de cerca para o.arena = a: [cx, base, medio ancho, alto]
const h_arenasMesa = (a) => [[226, 158, Math.round(2 + a * 91), Math.round(a * 48)], [108, 163, Math.round((a - 0.45) * 150), Math.round((a - 0.45) * 60)]];

const h_altoMonton = (x, [cx, , w, al]) => { const u = (x - cx) / w; return w < 2 || Math.abs(u) >= 1 ? 0 : al * Math.pow(Math.cos(u * Math.PI / 2), 1.5); };

// EL ESCRITORIO DE CERCA (cámara 'mesa'): un inserto para manos y piezas, sin sitio para personajes de pie
function h_mesa(R, t, o = {}) {
  const K = h_K, { pset, linea } = R, V = [34, 32, 116, 88], a = h_cl(o.arena ?? 0), g = h_cl(o.hierba ?? 0);
  h_vistaBorrosa(R, t, ...V);
  if (o.enVentana) { R.recorte(V); o.enVentana(R, t, V); R.recorte(null); }
  h_pegar(R, h_capa(R, 'mesa', () => h_mesaFijo(R)));
  // el haz del flexo sobre el libro (tramado, con un parpadeo leve) y las motas que flotan en él
  { const f = Math.sin(t * 9) > 0.96 ? 0.8 : 1; for (let y = 62; y <= 107; y++) { const u = (y - 62) / 45, xa = Math.round(32 - u * 22), xb = Math.round(48 + u * 60); for (let x = xa; x <= xb; x++) h_aclara(R, x, y, f < 1 || u > 0.6 ? 1 : 2); } }
  for (let k = 0; k < 16; k++) { const u = (t * 0.04 + h(k, 1, 60)) % 1, x = Math.round(20 + h(k, 2, 60) * 110 + Math.sin(t * 0.7 + k) * 5), y = Math.round(64 + u * 60); if (Math.sin(t * 2 + k * 1.7) > 0.1) pset(x, y, K.solL); }
  // la plantita: el tallo y sus hojas, que se mecen
  { const m = Math.sin(t * 1.4), X = (i) => 262 + Math.round(m * i * 0.12); for (let i = 0; i < 16; i++) { pset(X(i), 116 - i, K.hojaS); pset(X(i) + 1, 116 - i, K.hoja); }
    for (const [i, s, l] of [[5, -1, 8], [8, 1, 9], [12, -1, 6], [15, 1, 6]]) for (let j = 0; j < l; j++) { const w = j < l / 2 ? 1 + (j >> 1) : Math.max(1, (l - j) >> 1); for (let q = -w + 1; q < w; q++) pset(X(i) + s * (j + 1), 116 - i - Math.round(j * 0.5) + q, q === -w + 1 ? K.hojaL : j % 3 === 2 && q === 0 ? K.hojaS : K.hoja); }
    pset(X(16), 99, K.hojaB); pset(X(16) + 1, 99, K.hojaB); pset(X(16), 98, K.hojaL); }
  // el reloj de arena grande (a escala 4), con su sombra; con arena, rajado
  if (o.reloj !== false) for (let x = 124; x <= 190; x++) for (let y = 149; y <= 153; y++) if ((x + y) % 2 === 0 && Math.hypot((x - 157) / 33, (y - 151) / 3) < 1) pset(x, y, K.nogalD);
  if (o.reloj !== false) PIEZAS_DU.relojArena?.(R, 150, 151, { s: 4, t, nivel: o.nivel ?? Math.max(0.2, 1 - t * 0.03), roto: !!o.roto });
  // LA ARENA: el montoncito que crece hasta ser una duna de mesa (y, pasada la mitad, otro que entierra el libro)
  const M = h_arenasMesa(Math.max(a, o.monton ?? 0));
  if (a > 0.01 || o.monton) for (const [cx, y, w, al] of M) h_monton(R, cx, y, w, al, t);
  // LA HIERBA: brota en el montón y se queda con el tablero
  if (g > 0) for (let k = 0; k < 84; k++) { const x = Math.round(6 + k * 3.7 + h(k, 1, 61) * 3), d = Math.abs(x - 226), m0 = h_altoMonton(x, M[0]), m1 = h_altoMonton(x, M[1]);
    const y = m0 > 2 ? M[0][1] - Math.round(m0 * (0.35 + h(k, 3, 61) * 0.65)) : m1 > 2 ? M[1][1] - Math.round(m1 * (0.35 + h(k, 3, 61) * 0.65)) : Math.round(128 + h(k, 3, 61) * 44), al = (9 + h(k, 2, 61) * (14 + g * 12)) * h_cl((g - d / 230 * 0.72) / 0.2);
    h_brizna(R, x, y, Math.round(al), t, k, 2); if (g > 0.9 && k % 9 === 4 && al > 12) { const fy = y - Math.round(al) + Math.round(Math.sin(t * 1.7 + k)); R.rect(x - 1, fy - 1, x + 1, fy + 1, k % 2 ? K.blanco : K.amarillo); pset(x, fy, k % 2 ? K.amarillo : K.rojo); } }
  return { mesa: { y0: 108, y1: 179 }, reloj: [150, 151], relojEscala: 4, monton: [226, 158], cimaMonton: [226, 158 - M[0][3]], plantita: [262, 117], libro: [50, 142], hoja: [104, 160], botes: [299, 130], ventana: V, cuadro: [186, 34, 248, 84], entradaMano: [[319, 150], [319, 110]], libre: [[190, 168], [300, 160]] };
}

// DELANTE EN LA MESA DE CERCA: la lupa y el lápiz del borde, la arena que rebosa por delante y las briznas de delante
function h_mesaDelante(R, t, o = {}) {
  const K = h_K, { pset, linea, disco } = R, a = h_cl(o.arena ?? 0), g = h_cl(o.hierba ?? 0);
  // la lupa (con su reflejo que late) y el lápiz
  for (let x = 30; x <= 62; x++) for (let y = 173; y <= 177; y++) if ((x + y) % 2 === 0) pset(x, y, K.nogalD);
  for (let k = 0; k < 20; k++) { linea(57 + k, 170 + Math.round(k * 0.35), 57 + k, 173 + Math.round(k * 0.35), K.k); pset(57 + k, 171 + Math.round(k * 0.35), K.nogalB); pset(57 + k, 172 + Math.round(k * 0.35), K.nogalL); }
  disco(44, 164, 13, K.k); disco(44, 164, 12, K.metalS); disco(44, 164, 11, K.metalL); disco(44, 164, 10, hex('#c8e4ee')); for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) if (i * i + j * j < 82 && (i + j + 40) % 4 === 0) pset(44 + i, 164 + j, hex('#e0f2f6')); { const b = Math.sin(t * 1.5) > 0 ? 1 : 0; R.rect(37, 157, 40 + b, 158, K.blanco); pset(36, 160, K.blanco); pset(50, 171, K.blanco); }
  for (let k = 0; k < 38; k++) { pset(104 + k, 176 - Math.round(k * 0.08), K.k); pset(104 + k, 177 - Math.round(k * 0.08), k < 4 ? K.rosa : k > 34 ? K.papel : K.amarillo); pset(104 + k, 178 - Math.round(k * 0.08), k < 4 ? K.rojoS : k > 34 ? K.papelD : K.oroS); pset(104 + k, 179 - Math.round(k * 0.08), K.k); } pset(142, 174, K.k); pset(143, 174, K.k);
  if (a > 0.3) h_monton(R, 190, 181, Math.round((a - 0.3) * 250), Math.round((a - 0.3) * 40), t);
  if (g > 0.3) for (let k = 0; k < 40; k++) { const x = Math.round(2 + k * 8 + h(k, 1, 62) * 5), al = (12 + h(k, 2, 62) * 20) * h_cl((g - 0.3 - Math.abs(x - 226) / 230 * 0.5) / 0.2); h_brizna(R, x, 181, Math.round(al), t, k + 100, 2); }
  return {};
}

// un paño de ladrillo en [x0, x1] × [y0, y1]: hiladas de 3 px al tresbolillo, ladrillos de tres tonos y la llaga oscura
function h_ladrillo(R, x0, y0, x1, y1, k = 0) {
  const K = h_K;
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / 3), r = (y - y0) % 3; for (let x = x0; x <= x1; x++) { const xx = x + (f & 1 ? 3 : 0), b = Math.floor(xx / 6), tono = h(b, f, 63 + k);
    R.pset(x, y, r === 2 ? K.ladrilloS : xx % 6 === 5 ? K.ladrilloS : tono < 0.2 ? K.ladrilloL : tono > 0.85 ? K.ladrilloD : r === 0 && tono < 0.5 ? h_mez(K.ladrillo, K.ladrilloL, 0.4) : K.ladrillo); } }
}

// una ventana de guillotina con su marco blanco, el dintel de piedra, los cristales con reflejo y el alféizar
function h_ventanaAula(R, x, y, w, a, luz) {
  const K = h_K; R.rect(x - 1, y - 2, x + w, y - 1, K.piedra); R.rect(x - 1, y - 1, x + w, y - 1, K.piedraS); R.rect(x, y, x + w - 1, y + a - 1, K.marco); R.rect(x + 1, y + 1, x + w - 2, y + a - 2, luz ? hex('#f4dc98') : hex('#3a5878'));
  for (let j = 1; j < a - 1; j++) for (let i = 1; i < w - 1; i++) if (!luz && (i + j) % 5 === 0 && j < a * 0.6) R.pset(x + i, y + j, hex('#7aa4c4')); R.rect(x + (w >> 1), y, x + (w >> 1), y + a - 1, K.marco); R.rect(x, y + (a >> 1), x + w - 1, y + (a >> 1), K.marco);
  R.rect(x - 1, y + a, x + w, y + a, K.piedra); R.rect(x, y + a + 1, x + w - 1, y + a + 1, K.ladrilloD);
}

// la hiedra que trepa por un muro: manchas de hojas tramadas con sus brillos, más densa abajo
function h_hiedra(R, x0, y0, x1, y1, k) {
  const K = h_K; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (y1 - y0), v = Math.sin(x * 0.5 + k) * 0.18 + Math.sin(x * 0.17 + y * 0.21 + k) * 0.25 + h(x >> 1, y >> 1, 64 + k) * 0.5;
    if (v + u * 0.7 > 0.72) R.pset(x, y, h(x, y, 65) < 0.18 ? K.hojaL : h(x, y, 66) < 0.3 ? K.hojaD : (x + y) % 3 === 0 ? K.hoja : K.hojaS); }
}

// la copa de un árbol grande: racimos de hojas en cinco tonos con la luz arriba a la izquierda
function h_copa(R, cx, cy, rx, ry, k) {
  const K = h_K, P = [K.hojaD, K.hojaS, K.hoja, K.hojaL, K.hojaB];
  for (let n = 0; n < 16; n++) { const an = h(n, k, 67) * Math.PI * 2, d = Math.sqrt(h(n, k, 68)) * 0.72, bx = cx + Math.cos(an) * rx * d, by = cy + Math.sin(an) * ry * d, r = Math.round(rx * (0.3 + h(n, k, 69) * 0.18));
    R.disco(bx + 1, by + 1, r, K.hojaD); R.disco(bx, by, r - 1, P[1]); R.disco(bx - 1, by - 1, r - 2, P[2]); if (by < cy + ry * 0.2) { R.disco(bx - 2, by - 2, Math.max(1, r - 4), P[3]); R.pset(bx - 3, by - 3, P[4]); R.pset(bx - 2, by - 4, P[4]); } }
  for (let n = 0; n < 40; n++) { const an = h(n, k, 70) * Math.PI * 2, d = Math.sqrt(h(n, k, 71)) * 0.9, x = Math.round(cx + Math.cos(an) * rx * d), y = Math.round(cy + Math.sin(an) * ry * d); R.pset(x, y, y < cy ? P[4] : P[0]); R.pset(x + 1, y, y < cy ? P[3] : P[0]); }
}

// un estudiante pequeño sentado en el césped (8 px): pelo, cara, camiseta y las piernas cruzadas; dir, hacia dónde mira
function h_sentado(R, x, y, c, pelo, dir = 1, largo = false) {
  const K = h_K; R.rect(x - 1, y - 8, x + 1, y - 6, hex('#f0c8a0')); R.rect(x - 1, y - 9, x + 1, y - 8, pelo); R.pset(x - dir, y - 7, pelo); if (largo) R.rect(x - dir * 2, y - 8, x - dir * 2, y - 4, pelo); R.pset(x + dir, y - 7, K.k);
  R.rect(x - 2, y - 5, x + 2, y - 2, c); R.rect(x - 2, y - 5, x - 2, y - 2, h_mez(c, K.k, 0.3)); R.rect(x - 3, y - 1, x + 3, y, hex('#3a4a7a')); R.pset(x + dir * 4, y, hex('#f0c8a0')); R.pset(x - dir * 3, y, hex('#2a3658'));
}

// un paseante pequeño (9 px) que anda: p, el paso
function h_paseante(R, x, y, c, pelo, p, lib = false) {
  const K = h_K; R.rect(x - 1, y - 9, x + 1, y - 7, hex('#f0c8a0')); R.rect(x - 1, y - 10, x + 1, y - 9, pelo); R.rect(x - 1, y - 6, x + 1, y - 3, c); R.pset(x - 2, y - 5 + p, c); R.pset(x + 2, y - 5 + (1 - p), c); if (lib) R.rect(x + 2, y - 5, x + 3, y - 4, K.rojo);
  R.rect(x - 1, y - 2, x - 1, y - p, hex('#3a4a7a')); R.rect(x + 1, y - 2, x + 1, y - (1 - p), hex('#3a4a7a'));
}

// una bici de paseo pequeña, de perfil, aparcada o con su ciclista
function h_bici(R, x, y, c) { const K = h_K; R.disco(x - 4, y - 2, 3, K.k); R.disco(x - 4, y - 2, 2, hex('#8ab08a')); R.pset(x - 4, y - 2, K.metalL); R.disco(x + 4, y - 2, 3, K.k); R.disco(x + 4, y - 2, 2, hex('#8ab08a')); R.pset(x + 4, y - 2, K.metalL); R.linea(x - 4, y - 2, x - 1, y - 6, c); R.linea(x - 1, y - 6, x + 3, y - 6, c); R.linea(x + 4, y - 2, x + 3, y - 8, c); R.linea(x - 1, y - 6, x, y - 2, c); R.rect(x - 3, y - 7, x, y - 7, K.k); R.rect(x + 2, y - 9, x + 4, y - 9, K.k); }

// los tres pictogramas de las pancartas (sin letras): 0 un planeta con su anillo, 1 una hoja, 2 un sol
function h_picto(R, n, x, y) {
  const K = h_K;
  if (n === 0) { R.disco(x, y, 4, K.azulS); R.disco(x, y, 3, K.azul); R.pset(x - 1, y - 1, K.hoja); R.pset(x, y - 1, K.hoja); R.pset(x + 1, y + 1, K.hoja); R.pset(x - 2, y + 1, K.hojaL); R.pset(x - 2, y - 2, K.cielo3); R.linea(x - 6, y + 2, x + 6, y - 2, K.oroS); R.pset(x, y, K.azul); R.pset(x - 1, y, K.azul); R.pset(x + 1, y, K.azul); }
  else if (n === 1) { for (let i = -4; i <= 4; i++) { const w = Math.round((1 - (i / 4.5) ** 2) * 3); R.linea(x + i, y - i * 0.5 - w, x + i, y - i * 0.5 + w, i % 2 ? K.hoja : K.hojaS); } R.linea(x - 5, y + 3, x + 4, y - 2, K.hojaD); R.pset(x - 6, y + 4, K.troncoS); }
  else { R.disco(x, y, 3, K.oroS); R.disco(x, y, 2, K.amarillo); R.pset(x - 1, y - 1, K.oroL); for (let a2 = 0; a2 < 8; a2++) { R.pset(x + Math.round(Math.cos(a2 * Math.PI / 4) * 5), y + Math.round(Math.sin(a2 * Math.PI / 4) * 5), K.oro); } }
}

// LO FIJO DEL CAMPUS: el pabellón de ladrillo con hiedra, la galería, la torre del reloj, la biblioteca, los árboles
// grandes, el césped a franjas con sus sendas, el aparcabicis y los corros (el cielo queda vacío)
function h_campusFijo(R) {
  const K = h_K, { rect, pset, disco, linea, poligono } = R;
  // la arboleda lejana
  for (let x = 0; x < 320; x++) { const a2 = Math.round(7 + 3 * Math.sin(x * 0.13) + 2 * Math.sin(x * 0.41 + 1) + h(x >> 1, 4, 72) * 2); for (let y = 100 - a2; y <= 108; y++) pset(x, y, y === 100 - a2 ? hex('#8ab8a0') : h(x, y, 73) < 0.2 ? hex('#4a8a70') : hex('#62a084')); }
  // LA BIBLIOTECA de piedra (x 224–319): columnas, ventanales de arco, balaustrada y escalinata
  rect(226, 62, 319, 108, K.piedra); for (let y = 62; y <= 108; y++) for (let x = 226; x < 320; x++) if (y % 6 === 2 || ((x + (Math.floor(y / 6) & 1) * 7) % 14 === 0)) pset(x, y, K.piedraS); else if (h(x >> 1, y >> 1, 74) < 0.08) pset(x, y, K.moldura);
  rect(222, 58, 319, 62, K.k); rect(223, 59, 319, 61, K.moldura); rect(223, 61, 319, 61, K.piedraS); for (let x = 226; x < 320; x += 5) { rect(x, 54, x + 1, 58, K.moldura); pset(x + 1, 55, K.piedraS); } rect(224, 53, 319, 53, K.moldura); rect(224, 54, 319, 54, K.piedraS);
  for (let x = 234; x < 318; x += 22) { rect(x, 66, x + 3, 104, K.moldura); rect(x + 3, 66, x + 3, 104, K.piedraS); rect(x - 1, 64, x + 4, 65, K.moldura); rect(x - 1, 104, x + 4, 105, K.piedraS);
    if (x + 20 < 320) { rect(x + 8, 74, x + 17, 100, K.k); rect(x + 9, 75, x + 16, 100, hex('#3a5878')); disco(x + 12.5, 75, 4, K.k); disco(x + 12.5, 75, 3, hex('#3a5878')); rect(x + 12, 72, x + 13, 100, K.marco); rect(x + 9, 84, x + 16, 84, K.marco); for (let j = 76; j < 92; j += 3) pset(x + 10 + (j % 2), j, hex('#7aa4c4')); } }
  rect(222, 105, 319, 108, K.piedraS); rect(222, 105, 319, 105, K.moldura); rect(220, 107, 319, 108, K.piedra);
  // EL PABELLÓN de ladrillo (x 0–124): tejado de pizarra con buhardillas y chimeneas, tres pisos de ventanas, el pórtico
  h_ladrillo(R, 0, 46, 124, 108, 0);
  for (let y = 32; y <= 43; y++) for (let x = 0; x <= 127 - (43 - y) * 0.5; x++) pset(x, y, y === 32 ? K.tejaL : (x + (y & 1) * 2) % 4 === 0 ? K.tejaS : (y % 3 === 0 ? K.tejaS : K.teja));
  rect(0, 44, 127, 46, K.k); rect(0, 44, 126, 45, K.piedra); rect(0, 45, 126, 45, K.piedraS); rect(125, 46, 126, 108, K.piedra); rect(126, 46, 126, 108, K.piedraS); for (let y = 48; y < 108; y += 6) rect(123, y, 124, y + 2, K.piedra);
  for (const x of [22, 62, 102]) { poligono([[x - 7, 36], [x, 27], [x + 7, 36]], K.k); poligono([[x - 5, 36], [x, 29], [x + 5, 36]], K.tejaS); rect(x - 4, 36, x + 4, 43, K.marco); rect(x - 3, 37, x + 3, 42, hex('#3a5878')); rect(x, 37, x, 42, K.marco); pset(x - 2, 38, hex('#7aa4c4')); }
  for (const x of [42, 84]) { rect(x, 24, x + 6, 36, K.k); h_ladrillo(R, x + 1, 25, x + 5, 36, 3); rect(x - 1, 23, x + 7, 24, K.piedraS); }
  for (let f = 0; f < 3; f++) for (let c = 0; c < 8; c++) { const x = 5 + c * 15, y = 51 + f * 19; if (f === 2 && (c === 3 || c === 4)) continue; h_ventanaAula(R, x, y, 9, f === 2 ? 14 : 12, (c * 3 + f * 5) % 11 === 2); }
  rect(0, 65, 124, 65, K.piedraS); rect(0, 84, 124, 84, K.piedraS);
  rect(46, 84, 80, 108, K.k); rect(47, 85, 79, 108, K.piedra); poligono([[44, 85], [63, 76], [82, 85]], K.k); poligono([[47, 84], [63, 78], [79, 84]], K.moldura); disco(63, 82, 1, K.piedraS); rect(49, 87, 52, 106, K.moldura); rect(52, 87, 52, 106, K.piedraS); rect(74, 87, 77, 106, K.moldura); rect(77, 87, 77, 106, K.piedraS);
  rect(55, 89, 71, 106, K.k); rect(56, 90, 70, 106, K.frisoS); rect(63, 90, 63, 106, K.k); rect(57, 91, 62, 97, K.friso); rect(64, 91, 69, 97, K.friso); rect(57, 99, 62, 105, K.friso); rect(64, 99, 69, 105, K.friso); pset(62, 99, K.oro); pset(64, 99, K.oro);
  for (let i = 0; i < 3; i++) { rect(44 - i * 2, 106 + i, 82 + i * 2, 106 + i, i % 2 ? K.piedraS : K.moldura); }
  h_hiedra(R, 0, 50, 30, 108, 1); h_hiedra(R, 92, 60, 122, 108, 2); h_hiedra(R, 30, 92, 46, 108, 3);
  // LA GALERÍA de arcos entre el pabellón y la torre (por dentro pasa gente: lo pinta hoy())
  rect(127, 80, 181, 108, K.piedra); rect(127, 76, 181, 80, K.k); rect(127, 77, 181, 79, K.teja); rect(127, 77, 181, 77, K.tejaL);
  for (let x = 130; x < 178; x += 17) { rect(x, 90, x + 12, 108, hex('#4a4458')); disco(x + 6, 90, 6, hex('#4a4458')); rect(x - 1, 96, x - 1, 108, K.piedraS); for (let j = 92; j < 108; j += 2) pset(x + 1, j, hex('#5e586c')); }
  for (let y = 81; y <= 108; y++) for (let x = 127; x <= 181; x++) if (R.pget(x, y) === K.piedra && (y % 5 === 0 || h(x >> 1, y >> 1, 75) < 0.1)) pset(x, y, K.piedraS);
  // LA TORRE DEL RELOJ (x 182–206): ladrillo con esquinas de piedra, la esfera (193, 52), el campanario y el chapitel
  h_ladrillo(R, 183, 40, 205, 108, 5); rect(182, 40, 182, 108, K.k); rect(206, 40, 206, 108, K.k); for (let y = 42; y < 108; y += 6) { rect(183, y, 185, y + 2, K.piedra); rect(203, y, 205, y + 2, K.piedraS); }
  rect(180, 37, 208, 40, K.k); rect(181, 38, 207, 39, K.moldura); rect(181, 39, 207, 39, K.piedraS); rect(184, 26, 204, 37, K.k); rect(185, 27, 203, 37, K.piedra); for (const x of [188, 194, 200]) { rect(x - 1, 29, x + 1, 36, hex('#4a4458')); pset(x, 28, hex('#4a4458')); for (let j = 30; j < 36; j += 2) pset(x, j, K.piedraS); }
  poligono([[182, 26], [194, 9], [206, 26]], K.k); poligono([[185, 25], [194, 12], [203, 25]], K.teja); for (let y = 14; y < 25; y += 2) for (let x = 186; x < 203; x++) if (Math.abs(x - 194) < (y - 11) * 0.7 && (x + y) % 3 === 0) pset(x, y, K.tejaS); linea(194, 12, 190, 24, K.tejaL); linea(194, 3, 194, 9, K.k); rect(193, 5, 196, 5, K.oro); pset(194, 3, K.oro);
  disco(194, 52, 8, K.k); disco(194, 52, 7, K.piedra); disco(194, 52, 6, K.blanco); for (let a2 = 0; a2 < 12; a2++) pset(194 + Math.round(Math.sin(a2 * Math.PI / 6) * 5), 52 - Math.round(Math.cos(a2 * Math.PI / 6) * 5), a2 % 3 ? K.piedraS : K.k);
  for (const y of [68, 84]) { rect(191, y, 197, y + 9, K.k); rect(192, y + 1, 196, y + 9, hex('#3a5878')); rect(194, y + 1, 194, y + 9, K.marco); pset(193, y + 2, hex('#7aa4c4')); rect(190, y + 10, 198, y + 10, K.piedra); } rect(190, 98, 198, 108, K.k); rect(191, 99, 197, 108, K.nogal); rect(194, 99, 194, 108, K.nogalS);
  h_hiedra(R, 183, 86, 192, 108, 4);
  // el césped: franjas de siega en perspectiva, matas, tréboles y margaritas
  for (let y = 109; y <= 179; y++) { const pr = (y - 109) / 70, an = 14 + pr * 40; for (let x = 0; x < 320; x++) { const fr = Math.floor((x - 160) / an + 40) & 1, r = h(x, y, 76);
    pset(x, y, y < 111 ? K.cespedD : r < 0.07 ? K.cespedL : r > 0.93 ? K.cespedD : h(x >> 1, y, 77) < 0.16 ? K.cespedS : fr ? K.cesped : hex('#6cb450')); } }
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 78) * 319), y = Math.round(114 + h(k, 2, 78) * 64); if (k % 3 === 0) { pset(x, y, K.blanco); pset(x + 1, y, K.amarillo); pset(x, y - 1, K.blanco); } else { pset(x, y, K.cespedD); pset(x, y - 1, K.cespedS); pset(x + 1, y - 2, K.cespedL); } }
  // las sendas: la acera de los edificios y el camino que baja desde el pórtico
  for (let y = 109; y <= 113; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 109 ? K.sendaL : y === 113 ? K.sendaS : (x + y * 3) % 9 === 0 ? K.sendaS : K.senda);
  for (let y = 114; y <= 179; y++) { const u = (y - 114) / 65, cx = 63 - u * 44, w = 9 + u * 16; for (let x = Math.round(cx - w); x <= cx + w; x++) if (x >= 0) pset(x, y, x <= cx - w + 1 || x >= cx + w - 1 ? K.sendaS : (y % 6 === 0 || (x + Math.floor(y / 6) * 5) % 11 === 0) ? K.sendaS : h(x, y, 79) < 0.08 ? K.sendaL : K.senda); }
  // el aparcabicis con tres bicis, una farola y la papelera
  rect(88, 103, 120, 103, K.metalS); for (let x = 88; x <= 120; x += 8) rect(x, 103, x, 110, K.metalS); h_bici(R, 94, 111, K.rojo); h_bici(R, 106, 111, K.azul); h_bici(R, 117, 111, K.oroS);
  rect(214, 82, 214, 112, K.k); rect(215, 82, 215, 112, K.metalS); rect(212, 78, 217, 82, K.k); rect(213, 79, 216, 81, K.luz); rect(211, 77, 218, 77, K.k);
  // LOS DOS ÁRBOLES GRANDES, con su sombra en el césped
  for (const [tx, by, cy, rx, ry, k] of [[146, 118, 76, 24, 21, 1], [300, 124, 84, 22, 20, 2]]) {
    for (let y = by - 2; y <= by + 6; y++) for (let x = tx - rx - 4; x <= tx + rx + 10; x++) if (Math.hypot((x - tx - 4) / (rx + 6), (y - by - 2) / 5) < 1 && (x + y) % 2 === 0 && x < 320) pset(x, y, K.cespedD);
    for (let y = cy; y <= by; y++) { const w = 2 + Math.round((y - cy) / (by - cy) * 2.2 + (y > by - 3 ? 2 : 0)); for (let x = tx - w; x <= tx + w; x++) pset(x, y, x === tx - w ? K.k : x >= tx + w - 1 ? K.troncoS : (x + y * 2) % 5 === 0 ? K.troncoS : K.tronco); }
    linea(tx - 2, cy + 14, tx - 12, cy + 4, K.troncoS); linea(tx + 2, cy + 16, tx + 13, cy + 5, K.troncoS); h_copa(R, tx, cy, rx, ry, k); }
  // el corro de la guitarra (a la izquierda) sobre su manta, y el corro de lectura (a la derecha)
  for (let y = 126; y <= 135; y++) for (let x = 84; x <= 124; x++) if (Math.hypot((x - 104) / 21, (y - 130.5) / 5) < 1) pset(x, y, (x >> 2) % 2 ? K.manta : (y % 3 === 0 ? K.mantaL : K.mantaS));
  h_sentado(R, 90, 131, K.amarillo, K.troncoS, 1, true); h_sentado(R, 100, 128, K.lila, K.k, 1); h_sentado(R, 118, 131, K.cielo2, K.oroS, -1, true); h_sentado(R, 110, 135, K.rojo, K.tronco, -1);
  for (let y = 124; y <= 132; y++) for (let x = 238; x <= 276; x++) if (Math.hypot((x - 257) / 20, (y - 128) / 4.5) < 1) pset(x, y, (x + y) % 4 < 2 ? K.mantaA : K.cielo2);
  h_sentado(R, 244, 128, K.rojoS, K.k, 1); h_sentado(R, 256, 126, K.blanco, K.oroS, 1, true); h_sentado(R, 270, 129, K.hoja, K.troncoS, -1); rect(248, 129, 252, 130, K.papel); rect(248, 131, 252, 131, K.rojo); rect(261, 130, 265, 131, K.papel); pset(263, 130, K.papelD); rect(262, 132, 266, 132, K.azul);
  rect(296, 160, 308, 172, K.k); rect(297, 161, 307, 171, K.sillon); rect(297, 161, 307, 162, K.sillonL); rect(299, 165, 305, 169, K.sillonS); rect(301, 158, 303, 160, K.k); pset(302, 167, K.oro); rect(311, 162, 315, 172, K.k); rect(312, 163, 314, 171, K.rojo); rect(312, 163, 314, 164, K.metalL); for (let x = 294; x <= 317; x++) if (x % 2) pset(x, 173, K.cespedD);
  // la lectora apoyada en el árbol y la pancarta clavada con su hoja
  h_sentado(R, 153, 120, K.sillon, K.k, 1); rect(156, 116, 158, 118, K.libro ?? K.noche); pset(157, 117, K.duna);
  rect(176, 116, 176, 132, K.k); rect(177, 116, 177, 132, K.nogalL); rect(169, 108, 185, 121, K.k); rect(170, 109, 184, 120, K.mantaL); rect(170, 109, 184, 109, K.blanco); h_picto(R, 1, 177, 115);
}

// EL CAMPUS de 1970
function h_campus(R, t, o = {}) {
  const K = h_K, { pset, linea, disco } = R;
  h_cielo(R, t, 0, 0, 319, 100, { calma: true, esc: 0.9 });
  disco(238, 24, 8, K.solL); disco(238, 24, 6, K.blanco); for (let a2 = 0; a2 < 12; a2++) { const r = 11 + (Math.floor(t * 2 + a2) % 2); pset(238 + Math.round(Math.cos(a2 * Math.PI / 6) * r), 24 + Math.round(Math.sin(a2 * Math.PI / 6) * r), K.solL); }
  for (let k = 0; k < 4; k++) { const u = (t * (7 + k * 2) + k * 90) % 300; h_pajaro(R, Math.round(-20 + u), 22 + k * 7 + Math.round(Math.sin(t * 1.3 + k) * 3), t, k, hex('#3a4a6a'), 0, 270); }
  h_pegar(R, h_capa(R, 'campus', () => h_campusFijo(R)));
  // el reloj de la torre
  { const cx = 194, cy = 52, am = t * 0.05 + 2.2, ah = 5.4; linea(cx, cy, cx + Math.round(Math.sin(ah) * 3), cy - Math.round(Math.cos(ah) * 3), K.k); linea(cx, cy, cx + Math.round(Math.sin(am) * 5), cy - Math.round(Math.cos(am) * 5), K.k); pset(cx, cy, K.rojo); }
  // la gente que pasa por dentro de la galería (recortada a sus arcos) y las palomas del tejado
  for (const [v, c, pe, k] of [[5, K.rojo, K.k, 0], [-3.6, K.cielo2, K.oroS, 1]]) { const x = Math.round(128 + ((((t * v + k * 30) % 56) + 56) % 56)), p = Math.floor(t * 4 + k) % 2; for (const ax of [130, 147, 164]) if (x >= ax + 1 && x <= ax + 11) h_paseante(R, x, 108, h_mez(c, hex('#4a4458'), 0.35), pe, p); }
  for (let k = 0; k < 3; k++) { const x = 140 + k * 13, pi = Math.floor(t * 1.5 + k * 0.7) % 4 === 0 ? 1 : 0; pset(x, 75 + pi, K.metalS); pset(x + 1, 75, K.metalS); pset(x + 2, 75, K.metalL); pset(x - 1, 74 + pi, K.metalD); }
  // los que cruzan por la acera: dos paseantes con libros y una ciclista
  for (const [v, c, pe, k] of [[6, K.oroS, K.troncoS, 0], [-4.4, K.lila, K.k, 1], [3.6, K.blanco, K.rojoS, 2]]) { const x = Math.round(-10 + ((((t * v + k * 130) % 340) + 340) % 340)); h_paseante(R, x, 113, c, pe, Math.floor(t * 4 + k) % 2, k !== 1); }
  { const x = Math.round(330 - ((t * 16 + 60) % 380)); h_bici(R, x, 114, K.rojo); R.rect(x - 1, 100, x + 1, 102, hex('#f0c8a0')); R.rect(x - 1, 99, x + 1, 99, K.oroS); R.rect(x - 1, 103, x + 1, 106, K.cielo2); pset(x + 2, 104, K.cielo2); pset(x + (Math.floor(t * 6) % 2), 108, hex('#3a4a7a')); }
  // las copas, que se mecen (brillos que corren) y las hojas que caen
  for (const [tx, cy, rx, ry, k] of [[146, 76, 24, 21, 1], [300, 84, 22, 20, 2]]) { for (let n = 0; n < 12; n++) { const an = h(n, k, 80) * 6.28, d = Math.sqrt(h(n, k, 81)) * 0.85, x = Math.round(tx + Math.cos(an) * rx * d + Math.sin(t * 1.2 + n) * 1.5), y = Math.round(cy + Math.sin(an) * ry * d - 2); pset(x, y, K.hojaB); pset(x + 1, y, K.hojaL); }
    for (let n = 0; n < 3; n++) { const u = (t * 0.14 + n / 3 + k * 0.2) % 1, x = Math.round(tx - 14 + n * 12 + Math.sin(t * 2 + n) * 4), y = Math.round(cy + ry * 0.6 + u * 36); pset(x, y, n % 2 ? K.hojaL : K.amarillo); } }
  // la guitarra del corro: el brazo que rasguea y las notas que suben
  { const s = Math.floor(t * 5) % 2; R.rect(94, 127, 97, 129, K.sillonS); pset(95, 128, K.k); linea(97, 127, 102, 124, K.nogalL); pset(93 + s, 127 + s, hex('#f0c8a0'));
    for (let n = 0; n < 3; n++) { const u = (t * 0.35 + n / 3) % 1, x = Math.round(98 + n * 5 + Math.sin(t * 2 + n * 2) * 3), y = Math.round(120 - u * 22); if (u < 0.85) { R.rect(x, y, x + 1, y + 1, K.k); linea(x + 1, y, x + 1, y - 4, K.k); pset(x + 2, y - 4, K.k); pset(x + 3, y - 3, K.k); } }
    const c2 = Math.floor(t * 2) % 2; pset(119 + c2, 126, hex('#f0c8a0')); pset(109 - c2, 130, hex('#f0c8a0')); }
  // el del corro de lectura que pasa la página, y la pancarta grande entre dos postes, que ondea (planeta, hoja y sol)
  if (Math.floor(t * 0.8) % 2) pset(259, 124, K.papel);
  R.rect(224, 78, 225, 112, K.k); pset(225, 80, K.nogalL); R.rect(281, 84, 282, 116, K.k);
  for (let i = 0; i <= 54; i++) { const x = 226 + i, on = Math.round(Math.sin(i * 0.22 - t * 3) * 1.2 * Math.sin(i / 54 * Math.PI) + i * 0.1 + Math.sin(i / 54 * Math.PI) * 3); for (let j = 0; j <= 15; j++) pset(x, 80 + on + j, j === 0 || j === 15 ? K.k : Math.sin(i * 0.22 - t * 3) > 0.5 && j > 1 ? K.papelS : K.mantaL); }
  for (let n = 0; n < 3; n++) { const i = 10 + n * 17, on = Math.round(Math.sin(i * 0.22 - t * 3) * 1.2 * Math.sin(i / 54 * Math.PI) + i * 0.1 + Math.sin(i / 54 * Math.PI) * 3); h_picto(R, n, 226 + i, 88 + on); }
  // el perro y el disco volador: el estudiante lo lanza, el disco vuela en arco y el perro salta a cogerlo
  { const u = (t % 4) / 4, ida = u < 0.5, f = ida ? u * 2 : 0, px = 190, py = 126, dx = Math.round(ida ? 206 + f * 60 : 268 - (u - 0.5) * 2 * 56), salto = ida && f > 0.75 ? Math.round(Math.sin((f - 0.75) * 4 * Math.PI) * 6) : 0, dy = 140 - salto, dir = ida ? 1 : -1, p = Math.floor(t * 8) % 2;
    h_paseante(R, px, py, K.rojo, K.troncoS, 0); pset(px + 2, py - (ida && f < 0.2 ? 7 : 5), hex('#f0c8a0'));
    for (let x = dx - 5; x <= dx + 5; x++) if (x % 2) pset(x, 141, K.cespedD);
    { const B = hex('#f0e8d8'), M = hex('#b07a44'), put = (i, j, c) => pset(dx + dir * i, dy + j, c), box = (i0, j0, i1, j1, c) => { for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) put(i, j, c); };
      box(-6, -8, 4, -3, K.k); box(-5, -7, 3, -4, B); box(-5, -7, -2, -6, M); box(3, -11, 8, -6, K.k); box(4, -10, 7, -7, B); put(8, -8, K.k); put(9, -8, K.k); put(6, -9, K.k); box(4, -12, 5, -10, M); put(4, -13, K.k);
      put(-7, -9 - p, K.k); put(-8, -10 - p, B); put(-7, -8, B); box(-5, -3, -4, -1 + p - 1, K.k); box(2, -3, 3, -1 - p, K.k); put(-5, -3, B); put(2, -3, B); if (salto > 2 || !ida) put(8, -7, K.rojo); }
    const fx = ida ? Math.round(px + 4 + f * (dx + 9 - px - 4)) : dx + dir * 10, fy = ida ? Math.round(py - 8 - Math.sin(f * Math.PI) * 14 + f * 9) : dy - 8; R.rect(fx - 3, fy, fx + 3, fy, K.rojo); R.rect(fx - 2, fy - 1, fx + 2, fy - 1, K.rosa); pset(fx - 3, fy + 1, K.rojoS); pset(fx + 3, fy + 1, K.rojoS); }
  // mariposas sobre el césped
  for (let k = 0; k < 3; k++) { const an = t * (0.5 + k * 0.13) + k * 2.1, bx = Math.round(40 + k * 110 + Math.cos(an) * 22), by = Math.round(150 + k * 7 + Math.sin(an * 1.7) * 6), al = Math.sin(t * 16 + k) > 0 ? 1 : 0; pset(bx, by, K.k); pset(bx - 1, by - al, k % 2 ? K.blanco : K.amarillo); pset(bx + 1, by - al, k % 2 ? K.blanco : K.amarillo); }
  return { suelo: 160, sueloMin: 152, sueloMax: 174, detrasMesa: 152, mesa: { x0: 114, x1: 206, y: 148, pie: 172 }, libroMesa: [162, 148], vendedores: [[140, 152], [186, 152]], cartel: [99, 145], caja: [222, 174], torre: [194, 52], sol: [238, 24], horizonte: 108, acera: 113, portico: [63, 108], corroGuitarra: [104, 131], corroLectura: [257, 128], perro: [236, 140], pancarta: [226, 80, 280, 98], arboles: [[146, 118], [300, 124]], libre: [[60, 162], [92, 162], [236, 162], [270, 162]] };
}

// DELANTE EN EL CAMPUS: la mesa plegable con sus libros (el nuestro, de pie), la hucha de lata y el cartel con un
// libro, y la caja de cartón con más libros en el césped
function h_campusDelante(R, t, o = {}) {
  const K = h_K;
  h_pegar(R, h_capa(R, 'campusD', () => { const { rect, pset, linea } = R;
    for (let x = 112; x <= 210; x++) for (let y = 167; y <= 170; y++) if ((x + y) % 2 === 0) pset(x, y, K.cespedD);
    // las patas en tijera y el tablero con su mantel corto
    for (const [xa, xb] of [[120, 136], [184, 200]]) { for (let d = 0; d < 2; d++) { linea(xa + d, 148, xb + d, 168, d ? K.metalS : K.k); linea(xb + d, 148, xa + d, 168, d ? K.metalL : K.k); } pset((xa + xb) >> 1, 158, K.oro); }
    rect(113, 143, 207, 148, K.k); rect(114, 144, 206, 145, K.nogalB); rect(114, 146, 206, 147, K.nogalL); rect(114, 147, 206, 147, K.nogalS); for (let x = 116; x < 206; x += 3) if (h(x, 1, 82) < 0.4) pset(x, 145, K.nogalL);
    for (let x = 126; x <= 194; x++) { const a2 = 5 + Math.round(Math.sin(x * 0.4) * 1); for (let j = 0; j <= a2; j++) pset(x, 148 + j, j === a2 ? K.mantaS : (x >> 2) % 2 ? K.manta : K.mantaL); }
    // las pilas de libros, el nuestro de pie, la hucha de lata y el cartel con el dibujo de un libro
    const COL = [K.rojo, K.azul, K.oroS, K.friso, K.lila, K.noche, K.cortina];
    for (const [x, n, w] of [[116, 3, 12], [131, 1, 16], [176, 1, 15]]) for (let i = 0; i < n; i++) { const y = 143 - i * 3, c = COL[(x + i * 3) % 7]; rect(x + (i % 2), y - 3, x + w + (i % 2), y, K.k); rect(x + 1 + (i % 2), y - 2, x + w - 1 + (i % 2), y - 1, c); rect(x + 1 + (i % 2), y - 2, x + w - 3 + (i % 2), y - 2, h_mez(c, K.blanco, 0.35)); rect(x + w - 2 + (i % 2), y - 2, x + w - 1 + (i % 2), y - 1, K.papel); }
    PIEZAS_DU.libro?.(R, 162, 144, { s: 1 });
    rect(196, 137, 205, 143, K.k); rect(197, 138, 204, 142, K.metal); rect(197, 138, 204, 138, K.metalL); rect(199, 136, 202, 136, K.k); rect(199, 140, 202, 140, K.k);
    rect(98, 150, 99, 170, K.k); rect(88, 132, 110, 151, K.k); rect(89, 133, 109, 150, K.mantaL); rect(89, 133, 109, 133, K.blanco); rect(93, 137, 105, 146, K.noche); rect(99, 137, 99, 146, K.k); rect(94, 138, 98, 145, K.papel); rect(100, 138, 104, 145, K.papel); for (let j = 139; j < 145; j += 2) { rect(95, j, 97, j, K.papelD); rect(101, j, 103, j, K.papelD); }
    // la caja de cartón
    rect(212, 156, 234, 171, K.k); rect(213, 157, 233, 170, hex('#c89a5a')); rect(213, 157, 233, 158, hex('#e0b878')); rect(230, 159, 233, 170, hex('#a87a40')); rect(221, 160, 225, 170, hex('#e0c890')); R.poligono([[212, 156], [208, 151], [214, 152], [218, 156]], hex('#a87a40')); R.poligono([[228, 156], [234, 151], [238, 153], [234, 156]], hex('#e0b878'));
    for (const [x, a2, c] of [[215, 6, K.rojo], [219, 8, K.azul], [223, 5, K.oroS], [227, 7, K.friso]]) { rect(x, 156 - a2, x + 3, 156, K.k); rect(x + 1, 157 - a2, x + 2, 156, c); pset(x + 1, 158 - a2, K.oro); }
    // todo 4 px más abajo: el tablero queda en y 148, para que a quien vende detrás se le vean la cabeza y los hombros
    R.buf.copyWithin(4 * 320, 0, 176 * 320); R.buf.fill(H_VACIO, 0, 4 * 320);
  }), 120, 176);
  // las hojas del libro de arriba, que se mueven con el aire, y un brillo en la hucha
  { const s = Math.floor(t * 3) % 2; R.rect(178, 143 - s, 189, 143 - s, K.papel); R.pset(190, 143, K.papelS); if (Math.sin(t * 2.4) > 0.7) R.pset(198, 143, K.blanco); }
  return { mesa: { x0: 114, x1: 206, y: 148 }, libro: [162, 148], hucha: [200, 147], vendedores: [[140, 152], [186, 152]], cartel: [99, 145], caja: [222, 174] };
}

// las doce casillas del catálogo: 0 martillo, 1 serrucho, 2 hacha, 3 tienda de campaña, 4 farol, 5 mochila, 6 sobre de
// semillas, 7 regadera, 8 pala, 9 nuestro libro, 10 cúpula de barras, 11 brújula; (x, y) el centro de la base del dibujo
function h_articulo(R, n, x, y) {
  const K = h_K, { rect, pset, linea, disco, poligono } = R;
  if (n === 0) { for (let d = 0; d < 2; d++) linea(x - 6 + d, y, x + 2 + d, y - 14, K.nogalL); linea(x - 4, y, x + 4, y - 14, K.nogalS); rect(x - 2, y - 18, x + 8, y - 14, K.k); rect(x - 1, y - 17, x + 7, y - 15, K.metalS); rect(x - 1, y - 17, x + 7, y - 17, K.metalL); rect(x + 8, y - 17, x + 9, y - 15, K.k); }
  else if (n === 1) { poligono([[x - 9, y - 12], [x + 5, y - 9], [x + 5, y - 3], [x - 9, y - 10]], K.k); poligono([[x - 8, y - 11], [x + 4, y - 8], [x + 4, y - 5], [x - 8, y - 10]], K.metalL); for (let i = -8; i < 5; i += 2) pset(x + i, y - 9 + Math.round((i + 8) * 0.42), K.metalD); rect(x + 4, y - 13, x + 10, y - 2, K.k); rect(x + 5, y - 12, x + 9, y - 3, K.nogalL); rect(x + 6, y - 9, x + 8, y - 6, K.papel); }
  else if (n === 2) { for (let d = 0; d < 2; d++) linea(x + 5 + d, y, x - 3 + d, y - 16, K.nogalL); linea(x + 7, y, x - 1, y - 16, K.nogalS); poligono([[x - 3, y - 18], [x - 10, y - 16], [x - 11, y - 9], [x - 4, y - 12], [x, y - 13]], K.k); poligono([[x - 3, y - 17], [x - 9, y - 15], [x - 10, y - 11], [x - 4, y - 13]], K.metal); linea(x - 9, y - 15, x - 10, y - 11, K.blanco); }
  else if (n === 3) { poligono([[x - 12, y], [x, y - 16], [x + 12, y]], K.k); poligono([[x - 10, y - 1], [x, y - 14], [x + 10, y - 1]], K.cortina); poligono([[x - 3, y - 1], [x, y - 10], [x + 3, y - 1]], K.cortinaD); linea(x, y - 14, x - 5, y - 1, K.cortinaL); linea(x, y - 16, x, y - 18, K.k); linea(x - 12, y, x - 15, y + 1, K.nogalL); linea(x + 12, y, x + 15, y + 1, K.nogalL); }
  else if (n === 4) { rect(x - 4, y - 3, x + 4, y, K.k); rect(x - 3, y - 2, x + 3, y - 1, K.metalS); rect(x - 4, y - 13, x + 4, y - 3, K.k); rect(x - 3, y - 12, x + 3, y - 4, K.luz); rect(x - 1, y - 9, x + 1, y - 5, K.duna); pset(x, y - 10, K.amarillo); rect(x - 3, y - 15, x + 3, y - 13, K.k); rect(x - 2, y - 14, x + 2, y - 14, K.metalL); linea(x - 4, y - 14, x - 4, y - 18, K.k); linea(x + 4, y - 14, x + 4, y - 18, K.k); rect(x - 4, y - 19, x + 4, y - 19, K.k); }
  else if (n === 5) { rect(x - 7, y - 15, x + 7, y, K.k); rect(x - 6, y - 14, x + 6, y - 1, K.friso); rect(x - 6, y - 14, x + 6, y - 13, K.frisoL); rect(x - 4, y - 7, x + 4, y - 2, K.frisoS); rect(x - 4, y - 7, x + 4, y - 7, K.oro); rect(x - 6, y - 10, x + 6, y - 10, K.frisoD); rect(x - 3, y - 18, x + 3, y - 16, K.k); rect(x - 2, y - 17, x + 2, y - 17, K.nogalL); rect(x + 8, y - 11, x + 9, y - 3, K.k); }
  else if (n === 6) { rect(x - 7, y - 17, x + 7, y, K.k); rect(x - 6, y - 16, x + 6, y - 1, K.papel); rect(x - 6, y - 16, x + 6, y - 13, K.hoja); linea(x, y - 3, x, y - 9, K.hojaS); for (const s of [-1, 1]) { linea(x, y - 6, x + s * 4, y - 9, K.hoja); pset(x + s * 4, y - 10, K.hojaL); linea(x, y - 8, x + s * 3, y - 11, K.hoja); } pset(x, y - 10, K.rojo); pset(x - 1, y - 11, K.rojo); pset(x + 1, y - 11, K.rojo); pset(x, y - 12, K.rosa); for (let i = -4; i <= 4; i += 2) pset(x + i, y - 2, K.troncoS); }
  else if (n === 7) { rect(x - 6, y - 11, x + 5, y, K.k); rect(x - 5, y - 10, x + 4, y - 1, K.cielo2); rect(x - 5, y - 10, x - 4, y - 1, K.cielo4); rect(x + 3, y - 9, x + 4, y - 1, K.azul); linea(x + 5, y - 4, x + 11, y - 12, K.k); linea(x + 5, y - 5, x + 10, y - 12, K.cielo2); rect(x + 9, y - 14, x + 13, y - 12, K.k); for (const s of [-8, -9]) linea(x - 6, y - 9, x + s, y - 5, K.k); linea(x - 9, y - 5, x - 6, y - 2, K.k); for (let i = 0; i < 3; i++) pset(x + 12 + i, y - 10 + i * 2, K.cielo1); }
  else if (n === 8) { for (let d = 0; d < 2; d++) linea(x + d, y - 7, x + d, y - 18, K.nogalL); rect(x - 3, y - 20, x + 4, y - 18, K.k); rect(x - 2, y - 19, x + 3, y - 19, K.nogalL); poligono([[x - 5, y - 8], [x + 6, y - 8], [x + 5, y - 2], [x + 0.5, y + 1], [x - 4, y - 2]], K.k); poligono([[x - 4, y - 7], [x + 5, y - 7], [x + 4, y - 3], [x + 0.5, y], [x - 3, y - 3]], K.metal); linea(x - 3, y - 7, x - 3, y - 3, K.metalL); linea(x + 1, y - 6, x + 1, y - 2, K.metalS); }
  else if (n === 9) { PIEZAS_DU.libro?.(R, x, y + 2, { s: 1 }); }
  else if (n === 10) { for (let a2 = 0; a2 <= 12; a2++) { const an = Math.PI * a2 / 12, px = x + Math.cos(an) * 12, py = y - Math.sin(an) * 14; if (a2 < 12) linea(px, py, x + Math.cos(an + Math.PI / 12) * 12, y - Math.sin(an + Math.PI / 12) * 14, K.k); if (a2 % 2 === 0) { linea(px, py, x + Math.cos(an) * 6 + (a2 === 6 ? 0 : 0), y - Math.sin(an) * 7 - 4, K.metalS); linea(px, py, x + (a2 - 6) * 2, y, K.metalS); } }
    rect(x - 12, y, x + 12, y, K.k); rect(x - 2, y - 7, x + 2, y - 1, K.nogalS); for (let j = y - 13; j < y; j++) for (let i = -11; i <= 11; i++) if (Math.hypot(i / 12, (y - j) / 14) < 0.92 && R.pget(x + i, j) === K.papel && (i + j) % 3 === 0) pset(x + i, j, K.cielo3); }
  else { disco(x, y - 9, 9, K.k); disco(x, y - 9, 8, K.oro); disco(x, y - 9, 6, K.blanco); linea(x, y - 9, x + 3, y - 13, K.rojo); linea(x, y - 9, x - 3, y - 5, K.azulS); pset(x, y - 9, K.k); for (let a2 = 0; a2 < 4; a2++) pset(x + Math.round(Math.cos(a2 * Math.PI / 2) * 5), y - 9 + Math.round(Math.sin(a2 * Math.PI / 2) * 5), K.k); rect(x - 1, y - 20, x + 1, y - 18, K.k); pset(x, y - 19, K.oroL); pset(x - 5, y - 13, K.oroL); }
}

// las casillas del catálogo abierto: [x0, y0, x1, y1] de cada una (seis por página, en dos columnas)
const H_CASILLAS = []; for (let p = 0; p < 2; p++) for (let f = 0; f < 3; f++) for (let c = 0; c < 2; c++) { const x0 = (p ? 164 : 66) + c * 45, y0 = 56 + f * 33; H_CASILLAS.push([x0, y0, x0 + 42, y0 + 30]); }

// LO FIJO DEL CATÁLOGO: el césped visto desde arriba, la manta de cuadros con sus flecos, el catálogo abierto con sus
// doce casillas, el otro ejemplar cerrado (la tapa con la foto de la Tierra), la manzana, el lápiz, las sandalias…
function h_catalogoFijo(R) {
  const K = h_K, { rect, pset, disco, linea, poligono } = R;
  // el césped: briznas cortas, tréboles y margaritas (tranquilo arriba, bajo el año y detrás de Atom)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const r = h(x, y >> 1, 83), b = h(x >> 1, y >> 2, 84), calma = y < 48; pset(x, y, r < (calma ? 0.04 : 0.1) ? K.cespedL : r > (calma ? 0.96 : 0.9) ? K.cespedD : b < 0.3 ? K.cespedS : b > 0.8 ? hex('#6cb450') : K.cesped); }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 85) * 319), y = Math.round(h(k, 2, 85) * 179); if (y < 48 && (x > 262 || (x > 14 && x < 176 && y < 24))) continue; if (k % 3 === 0) { rect(x - 1, y, x + 1, y, K.blanco); rect(x, y - 1, x, y + 1, K.blanco); pset(x, y, K.amarillo); } else if (k % 3 === 1) { disco(x, y, 1, K.cespedD); pset(x - 1, y - 1, K.cespedL); pset(x + 1, y - 1, K.cespedL); pset(x, y + 1, K.cespedL); } else { linea(x, y, x + 2, y - 4, K.cespedD); linea(x + 1, y, x - 1, y - 3, K.cespedL); } }
  // la manta de cuadros (x 8–284, y 30–178), con su sombra, sus flecos y una arruga
  const MA = (x, y) => { const xa = 12 - (y - 30) * 0.04, xb = 272 + (y - 30) * 0.07, ya = 34 - (x - 12) * 0.022, yb = 176 - (x - 12) * 0.012; return x >= xa && x <= xb && y >= ya && y <= yb; };
  for (let y = 26; y < 180; y++) for (let x = 4; x < 292; x++) { if (MA(x, y)) { const cx = (x + Math.round(y * 0.04)) % 24, cy = (y + Math.round(x * 0.02)) % 24, a2 = cx < 12, b2 = cy < 12;
      let c = a2 && b2 ? K.manta : a2 || b2 ? h_mez(K.manta, K.mantaL, 0.5) : K.mantaL; if (cx === 5 || cy === 5) c = K.mantaA; else if (cx === 17 || cy === 17) c = K.mantaS; if ((x + y) % 2 && h(x, y, 86) < 0.3) c = h_mez(c, K.k, 0.14);
      if (Math.abs(x - 22 - (y - 30) * 0.1 - Math.sin(y * 0.1) * 2) < 1) c = h_mez(c, K.k, 0.3); pset(x, y, c); }
    else if (MA(x - 3, y - 3)) pset(x, y, (x + y) % 2 ? K.cespedD : K.cespedS); }
  for (let y = 36; y < 176; y += 3) { const xa = Math.round(12 - (y - 30) * 0.04), xb = Math.round(272 + (y - 30) * 0.07); pset(xa - 1, y, K.mantaL); pset(xa - 2, y, K.mantaL); pset(xa - 3, y + (y % 2), K.papelS); pset(xb + 1, y, K.mantaL); pset(xb + 2, y, K.mantaL); pset(xb + 3, y + (y % 2), K.papelS); }
  // EL CATÁLOGO ABIERTO (x 60–258, y 44–158): el canto de las hojas, las dos páginas, la cabecera y las casillas
  for (let y = 46; y <= 164; y++) for (let x = 62; x <= 264; x++) if ((x + y) % 2 === 0 && (x > 256 || y > 158)) pset(x, y, K.mantaS);
  rect(58, 42, 260, 160, K.k); rect(59, 43, 259, 159, K.papelD); for (let i = 0; i < 3; i++) { rect(60 + i, 157 - i + 2, 258 - i, 157 - i + 2, i % 2 ? K.papelS : K.papel); rect(257 - i + 1, 45, 257 - i + 1, 158, i % 2 ? K.papel : K.papelS); }
  rect(60, 44, 256, 156, K.papel); for (let y = 44; y <= 156; y++) for (let x = 60; x <= 256; x++) { const d = Math.abs(x - 158); if (d < 9 && h_b4(x, y) < (1 - d / 9) * 0.8) pset(x, y, d < 2 ? K.papelD : K.papelS); else if (h(x, y, 87) < 0.03) pset(x, y, K.papelS); }
  rect(158, 44, 158, 156, K.papelD);
  for (const x0 of [66, 164]) { rect(x0, 47, x0 + 87, 52, K.k); rect(x0 + 2, 49, x0 + 30, 50, K.papel); rect(x0 + 34, 49, x0 + 50, 49, K.papelD); rect(x0 + 80, 48, x0 + 85, 51, K.duna); pset(x0 + 82, 49, K.amarillo); }
  H_CASILLAS.forEach(([x0, y0, x1, y1], n) => { rect(x0, y0, x1, y1, K.papelS); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K.papel); rect(x0 + 1, y0 + 1, x0 + 26, y1 - 1, hex('#f8f2e2'));
    h_articulo(R, n, x0 + 14, y1 - 5);
    for (let i = 0; i < 6; i++) rect(x0 + 29, y0 + 4 + i * 3, x0 + 29 + [10, 8, 11, 6, 9, 5][(i + n) % 6], y0 + 4 + i * 3, i === 0 ? K.k : K.papelD); rect(x0 + 29, y1 - 6, x0 + 36, y1 - 3, n % 3 === 0 ? K.rojo : n % 3 === 1 ? K.azul : K.hojaS); pset(x0 + 31, y1 - 5, K.papel); pset(x0 + 33, y1 - 4, K.papel); });
  // EL OTRO EJEMPLAR, cerrado: la tapa con la foto de la Tierra (15, 92–54, 150)
  for (let y = 96; y <= 156; y++) for (let x = 18; x <= 58; x++) if ((x + y) % 2 === 0 && (x > 54 || y > 152)) pset(x, y, K.mantaS);
  rect(14, 92, 55, 153, K.k); rect(15, 93, 54, 152, K.papel); rect(15, 93, 16, 152, K.papelS); rect(53, 94, 54, 152, K.papelD); rect(17, 95, 52, 101, K.k); rect(19, 97, 36, 98, K.papel); rect(19, 99, 30, 99, K.papelD); rect(46, 96, 50, 100, K.duna);
  rect(18, 104, 51, 137, K.k); for (let k = 0; k < 10; k++) pset(19 + Math.round(h(k, 1, 88) * 31), 105 + Math.round(h(k, 2, 88) * 31), K.blanco);
  disco(35, 121, 13, K.azulS); disco(35, 121, 12, K.azul); for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { if (i * i + j * j > 144) continue; const v = Math.sin(i * 0.5 + 1) * Math.cos(j * 0.45 + i * 0.2) + h((i + 20) >> 1, (j + 20) >> 1, 89) * 0.6, n2 = Math.sin(i * 0.3 + j * 0.55 + 2); if (v > 0.75) pset(35 + i, 121 + j, v > 1 ? K.hojaL : K.hoja); if (n2 > 0.86 || (Math.abs(j + 9) < 2 && i < 4)) pset(35 + i, 121 + j, K.blanco); if (i + j > 11 && (i + j) % 2) pset(35 + i, 121 + j, K.azulS); if (i * i + j * j > 121 && i < 0 && j < 0) pset(35 + i, 121 + j, K.cielo3); }
  for (let i = 0; i < 4; i++) rect(18, 140 + i * 3, 18 + [30, 24, 28, 14][i], 140 + i * 3, i ? K.papelD : K.k);
  // la manzana, el lápiz, las cuentas de un collar, la taza y las sandalias en la hierba
  disco(34, 62, 7, K.k); disco(34, 62, 6, K.rojo); disco(32, 60, 2, K.rosa); for (let j = 0; j < 6; j++) pset(38, 60 + j, K.rojoS); linea(34, 56, 36, 52, K.troncoS); poligono([[36, 53], [41, 50], [40, 54]], K.hoja); for (let x = 30; x <= 42; x++) if (x % 2) pset(x, 70, K.mantaS);
  for (let k = 0; k < 30; k++) { pset(196 + k, 166 + Math.round(k * 0.12), K.k); pset(196 + k, 167 + Math.round(k * 0.12), k < 3 ? K.rosa : k > 26 ? K.papel : K.amarillo); pset(196 + k, 168 + Math.round(k * 0.12), k < 3 ? K.rojoS : K.oroS); pset(196 + k, 169 + Math.round(k * 0.12), K.k); }
  for (let k = 0; k < 22; k++) { const an = k / 22 * Math.PI * 2, x = Math.round(100 + Math.cos(an) * 14 + Math.sin(an * 3) * 2), y = Math.round(168 + Math.sin(an) * 5); disco(x, y, 1, [K.amarillo, K.cielo2, K.rojo, K.blanco][k % 4]); pset(x, y + 2, K.mantaS); }
  disco(272, 150, 9, K.mantaS); disco(270, 148, 9, K.k); disco(270, 148, 8, K.blanco); disco(270, 148, 6, hex('#7a4a2a')); disco(269, 147, 3, hex('#9a6a3a')); rect(279, 146, 284, 150, K.k); rect(280, 147, 283, 149, K.blanco); pset(281, 148, K.mantaL);
  // el sombrero de paja en la hierba (visto un poco de lado, para que no parezca una moneda): ala ovalada de paja
  // clara con el borde deshilachado y la trama trenzada, copa alta con su hendidura y su lado en sombra, la cinta roja
  // con el lazo y sus dos colas, y la sombra en el césped
  { const cx = 300, cy = 101, PJ = hex('#f0dc9c'), PJL = hex('#fbf0c4'), PJS = hex('#d2b46c'), PJD = hex('#a8884a');
    for (let j = -13; j <= 14; j++) for (let i = -19; i <= 19; i++) { const x = cx + i + 2, y = cy + j + 3; if (x <= 319 && Math.hypot(i / 18, j / 12.5) < 1 && ((x + y) & 1 || Math.hypot(i / 18, j / 12.5) < 0.9)) pset(x, y, K.cespedD); }
    // el ala: 17 × 12 px de radio, con mellas en el borde y pajas sueltas
    for (let j = -13; j <= 13; j++) for (let i = -18; i <= 18; i++) { const x = cx + i, y = cy + j; if (x > 319) continue; const an = Math.atan2(j * 1.42, i), rr = 17 - (h(Math.round(an * 10), 1, 110) < 0.28 ? 1 : 0), d = Math.hypot(i, j * 1.42), e = d / rr; if (e > 1) continue;
      const anillo = Math.round(d * 1.25) % 3 === 0, tr = (Math.round(an * 16) + Math.round(d * 1.25)) & 1;
      pset(x, y, e > 0.93 ? K.k : e > 0.84 ? (tr ? PJS : PJD) : anillo ? (tr ? PJS : PJ) : i + j * 1.4 < -7 ? PJL : PJ); }
    for (const [an, l] of [[0.5, 3], [2.3, 2], [3.6, 3], [4.6, 2], [5.6, 3]]) for (let q = 0; q < l; q++) { const x = Math.round(cx + Math.cos(an) * (17 + q)), y = Math.round(cy + Math.sin(an) * (12 + q)); if (x <= 319) pset(x, y, q ? PJ : PJD); }
    // la sombra de la copa sobre el ala (a la derecha y abajo)
    for (let j = -7; j <= 8; j++) for (let i = -10; i <= 12; i++) if (Math.hypot((i - 2) / 11, (j - 2) / 6.5) < 1 && (i + j) & 1) pset(cx + i, cy - 1 + j, PJD);
    // la copa: el costado (con la cinta abajo) y la tapa ovalada con su hendidura
    for (let j = 0; j <= 9; j++) { const y = cy - 9 + j, w = j < 2 ? 7 + j : j > 7 ? 9 - (j - 8) : 9; for (let i = -w - 1; i <= w + 1; i++) { const b = Math.abs(i) > w; pset(cx + i, y, b || j === 9 ? K.k : j >= 5 && j <= 8 ? (i > 5 ? K.rojoS : i < -5 && j === 5 ? K.rosa : K.rojo) : i > 5 ? PJS : i < -6 ? PJL : (i + j) % 3 === 0 ? PJS : PJ); } }
    for (let j = -4; j <= 4; j++) for (let i = -9; i <= 9; i++) { const e = Math.hypot(i / 9, j / 4.2); if (e > 1) continue; pset(cx + i, cy - 10 + j, e > 0.8 ? (j < 0 ? K.k : PJS) : Math.hypot((i + 1) / 6, j / 2) < 1 ? ((i + j) & 1 ? PJS : PJD) : i < -3 ? PJL : PJ); }
    rect(cx - 5, cy - 10, cx + 3, cy - 10, PJD); rect(cx - 6, cy - 12, cx - 1, cy - 12, PJL);
    // el lazo de la cinta y sus dos colas sobre el ala
    disco(cx + 9, cy - 2, 3, K.k); disco(cx + 9, cy - 2, 2, K.rojo); pset(cx + 8, cy - 3, K.rosa); disco(cx + 13, cy - 4, 2, K.k); disco(cx + 13, cy - 4, 1, K.rojoS); pset(cx + 11, cy - 3, K.k);
    linea(cx + 10, cy + 1, cx + 14, cy + 6, K.k); linea(cx + 9, cy + 1, cx + 13, cy + 6, K.rojo); linea(cx + 8, cy + 1, cx + 9, cy + 8, K.k); linea(cx + 7, cy + 1, cx + 8, cy + 8, K.rojoS); }
}
// EL CATÁLOGO sobre la manta, visto desde arriba (cámara 'catalogo'): un inserto para manos y piezas
function h_catalogo(R, t, o = {}) {
  const K = h_K, { pset, linea } = R;
  R.copiar(h_capa(R, 'catalogo', () => h_catalogoFijo(R)));
  // las sombras de las hojas de un árbol, que se mecen sobre todo (tramadas)
  for (let k = 0; k < 13; k++) { const cx = Math.round(20 + h(k, 1, 90) * 290 + Math.sin(t * 0.6 + k) * 5), cy = Math.round(52 + h(k, 2, 90) * 124 + Math.cos(t * 0.5 + k * 2) * 3), r = 5 + Math.round(h(k, 3, 90) * 6);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.3) / r; if (d < 1 && cy + j < 180 && cy + j >= 46 && cx + i >= 0 && cx + i < 320 && h_b4(cx + i, cy + j) < (1 - d) * 0.9) { const c = R.pget(cx + i, cy + j); let s = h_sombras.get(c); if (s === undefined) { s = h_mez(c, hex('#1e3a4a'), 0.3); h_sombras.set(c, s); } pset(cx + i, cy + j, s); } } }
  // la esquina de la página que levanta el aire, la mariquita que cruza la página, las hormigas y la mariposa
  { const s = Math.sin(t * 2.2) > 0.2 ? 1 : 0, e = 9 + s * 4; R.poligono([[256 - e, 156], [256, 156 - e], [256, 156]], K.papelD); R.poligono([[256 - e, 156], [256, 156 - e], [256 - e + 2, 156 - e + 2]], K.blanco); linea(256 - e, 156, 256, 156 - e, K.papelS); }
  { const u = (t * 0.045) % 1, x = Math.round(70 + u * 180), y = Math.round(54 + Math.sin(u * 9) * 2), p = Math.floor(t * 6) % 2; R.rect(x - 2, y - 1, x + 2, y + 1, K.k); R.rect(x - 1, y - 1, x + 1, y + 1, K.rojo); pset(x, y - 1, K.k); pset(x - 1, y + 1, K.k); pset(x + 3, y, K.k); pset(x - 2 + p, y + 2, K.k); pset(x + 1 + p, y + 2, K.k); pset(x - 2 + p, y - 2, K.k); pset(x + 1 + p, y - 2, K.k); }
  for (let k = 0; k < 9; k++) { const u = (t * 0.03 + k / 9) % 1, x = Math.round(290 + Math.sin(u * 8) * 5 + u * 14), y = Math.round(178 - u * 62); if (y > 116 || y < 76) { pset(x, y, K.k); pset(x, y + 1, K.k); } }
  { const an = t * 0.8, bx = Math.round(150 + Math.cos(an) * 120), by = Math.round(110 + Math.sin(an * 1.6) * 50), al = Math.sin(t * 14) > 0 ? 3 : 1; if (!(bx > 262 && by < 50) && by > 22) { R.rect(bx, by - 1, bx, by + 1, K.k); for (let i = 1; i <= al; i++) { pset(bx - i, by - 1, K.amarillo); pset(bx + i, by - 1, K.amarillo); pset(bx - i, by + 1, K.oro); pset(bx + i, by + 1, K.oro); } pset(bx + 1, by + 3, hex('#2c642e')); pset(bx + 2, by + 4, hex('#2c642e')); } }
  return { paginas: [[60, 44, 157, 156], [159, 44, 256, 156]], casillas: H_CASILLAS, articulos: H_CASILLAS.map(([x0, , , y1]) => [x0 + 14, y1 - 14]), tapa: [15, 93, 54, 152], tierra: [35, 121], manzana: [34, 62], taza: [270, 148], sombrero: [300, 100], manta: [8, 30, 284, 178], entradaMano: [[319, 170], [200, 179]] };
}

const h_sombras = new Map();

// DELANTE EN EL CATÁLOGO: las briznas altas del borde de abajo, que se mecen por delante de las manos
function h_catalogoDelante(R, t, o = {}) {
  for (let k = 0; k < 26; k++) { const x = Math.round(288 + (k % 9) * 4 + h(k, 1, 92) * 3 - (k > 17 ? 286 : 0)), al = 8 + Math.round(h(k, 2, 92) * 12); if (k > 17 || k < 9) h_brizna(R, x, 181, al, t, k, 2); }
  return {};
}

// lo plano de la pared del estudio, por debajo de las hojas: el resplandor del balcón sobre los dos paños, pruebas de
// color a brocha, un desconchón que deja ver el yeso, una mancha de humedad bajo la cornisa, el arrimadero partido en
// cuarterones y, bajo el paño izquierdo, un radiador de hierro (x 83–102, y 102–121) con su llave y su sombra
function f_parisPared(R) {
  const { rect, pset, linea } = R;
  for (const [xa, xb, s] of [[5, 111, -1], [187, 265, 1]]) for (let y = 21; y <= 96; y++) for (let x = xa; x <= xb; x++) { const d = s < 0 ? 111 - x : x - 187, g = 1 - (d + Math.abs(y - 50) * 0.3) / 58; if (g > 0 && g * 0.7 > f_b4(x, y)) pset(x, y, f_mez(R.pget(x, y), hex('#dfe4d0'), 0.3)); }
  // las pruebas de color: cinco brochazos con su gota
  [[84, 56, 2], [89, 61, 5], [83, 66, 0], [90, 71, 7], [85, 76, 3]].forEach(([x, y, k], i) => { const c = f_mez(f_VIVOS[k], f_P.pared, 0.32);
    for (let j = 0; j < 3; j++) { const w = 11 + Math.floor(h(i, j, 360) * 4), dx = Math.floor(h(i, j, 361) * 3); for (let q = 0; q < w; q++) if (h(x + q, y + j, 362) > 0.1) pset(x + dx + q, y + j, j === 2 ? f_mez(c, f_P.paredD, 0.3) : j === 0 && q % 3 === 0 ? f_mez(c, f_P.bl, 0.25) : c); }
    if (i % 2 === 0) { pset(x + 12, y + 3, c); pset(x + 12, y + 4, f_mez(c, f_P.paredD, 0.3)); } });
  // el desconchón: yeso crema con su borde en sombra y una grieta que sale de él
  for (let y = 70; y <= 94; y++) for (let x = 60; x <= 82; x++) { const r = Math.hypot(x - 71, (y - 83) * 1.15) + (h(x >> 1, y >> 1, 363) - 0.5) * 5; if (r < 6.2) pset(x, y, h(x, y, 364) < 0.14 ? f_P.cremaS : (x + y) % 5 === 0 ? hex('#d8cdb0') : f_P.crema); else if (r < 7.4) pset(x, y, y < 83 ? f_P.paredD : f_P.paredL); }
  { let gx = 76; for (let y = 76; y > 64; y--) { gx += h(y, 3, 365) < 0.4 ? 1 : 0; pset(gx, y, f_P.paredD); } pset(66, 91, f_P.cremaD); pset(70, 86, f_P.cremaD); rect(73, 80, 75, 80, f_P.cremaD); }
  // la humedad bajo la cornisa: un cerco oscuro, el interior tramado y dos chorretones
  for (let y = 21; y <= 44; y++) for (let x = 236; x <= 264; x++) { const r = Math.hypot((x - 252) * 0.8, y - 23) + (h(x >> 1, y >> 1, 366) - 0.5) * 3; if (r < 9 && r > 7.6) pset(x, y, f_P.paredS); else if (r <= 7.6 && (x + y) % 2 === 0 && h(x, y, 367) < 0.6) pset(x, y, f_mez(f_P.pared, f_P.paredS, 0.6)); }
  for (const [x, y1] of [[247, 44], [256, 39]]) for (let y = 31; y <= y1; y++) if (y % 4) pset(x, y, f_P.paredS);
  // a lápiz sobre la pared: los palotes de los días (de cinco en cinco) y un boceto NUESTRO (un planeta con anillo, dos lunas y una duna)
  for (let g = 0; g < 3; g++) { const x = 14 + g * 16, y = 70, n = g === 2 ? 2 : 4; for (let i = 0; i < n; i++) rect(x + i * 3, y + (h(g, i, 368) < 0.3 ? 1 : 0), x + i * 3, y + 7, f_P.paredD); if (n === 4) linea(x - 2, y + 6, x + 11, y + 1, f_P.paredD); }
  for (let k = 0; k < 64; k++) { const an = k / 64 * Math.PI * 2, cx = 212, cy = 79; if (k % 8 !== 3) pset(Math.round(cx + Math.cos(an) * 7), Math.round(cy + Math.sin(an) * 7), f_P.paredD); const ex = Math.round(cx + Math.cos(an) * 13), ey = Math.round(cy + Math.sin(an) * 3.4 - Math.cos(an) * 1.5); if (!(Math.sin(an) < 0 && Math.abs(Math.cos(an)) < 0.55) && k % 5 !== 1) pset(ex, ey, f_P.paredD); }
  for (const [x, y] of [[209, 76], [210, 75], [208, 78]]) pset(x, y, f_P.paredL); for (const [x, y, r] of [[229, 69, 2], [194, 71, 1.4]]) R.anillo(x, y, r, f_P.paredD);
  for (let x = 191; x <= 233; x++) if (x % 7 !== 2) pset(x, 91 + Math.round(Math.sin((x - 191) * 0.16) * 2), f_P.paredD); for (const [x, y] of [[199, 67], [222, 66], [233, 76], [190, 84]]) { pset(x, y, f_P.paredL); pset(x + 1, y, f_P.paredD); }
  // el arrimadero, en cuarterones
  for (const [xa, xb] of [[3, 113], [185, 267]]) for (let x = xa + 22; x < xb - 6; x += 22) { rect(x, 105, x, 112, f_P.paredD); rect(x + 1, 105, x + 1, 112, f_P.paredL); }
  // el radiador
  for (let y = 103; y <= 116; y++) for (let x = 103; x <= 104; x++) if ((x + y) % 2) pset(x, y, f_P.paredD);
  rect(83, 102, 102, 121, f_P.k); rect(84, 102, 101, 102, f_P.metalD);
  for (let c = 0; c < 6; c++) { const x = 84 + c * 3; rect(x, 103, x + 2, 120, f_P.metal); rect(x, 104, x, 119, f_P.metalL); rect(x + 2, 103, x + 2, 120, f_P.metalS); pset(x + 1, 103, f_P.metalL); pset(x + 1, 120, f_P.metalS); pset(x, 103, f_P.metalD); for (const y of [106, 117]) pset(x + 1, y, f_P.metalD); }
  rect(84, 121, 86, 121, f_P.metalD); rect(99, 121, 101, 121, f_P.metalD); rect(103, 117, 104, 118, f_P.oro); pset(103, 117, f_P.oroL); pset(104, 119, f_P.metalD); pset(104, 120, f_P.metalD); pset(104, 121, f_P.metalD);
}

// un gato atigrado dormido (x, y: la esquina de abajo a la izquierda del cuerpo): respira, la cola cuelga y se mece, y
// de vez en cuando mueve una oreja
function f_gato(R, x, y, t) {
  const { rect, pset } = R, c = hex('#d8863a'), s = hex('#a85a20'), l = hex('#f2b468'), r = Math.sin(t * 1.6) > 0 ? 1 : 0, oreja = Math.floor(t * 0.9) % 6 === 0 && Math.floor(t * 8) % 2 ? 1 : 0;
  rect(x + 2, y - 5 - r, x + 13, y, f_P.k); rect(x + 3, y - 4 - r, x + 12, y, c); rect(x + 4, y - 4 - r, x + 11, y - 4 - r, l); for (const d of [5, 8, 11]) rect(x + d, y - 4 - r, x + d, y - 2, s); rect(x + 6, y, x + 10, y, l);
  rect(x - 1, y - 6, x + 4, y, f_P.k); rect(x, y - 5, x + 3, y - 1, c); rect(x, y - 5, x + 3, y - 5, l); pset(x - 1, y - 7 - oreja, f_P.k); pset(x, y - 6, s); pset(x + 4, y - 7, f_P.k); pset(x + 3, y - 6, s);
  pset(x, y - 3, f_P.k); pset(x + 2, y - 3, f_P.k); pset(x + 1, y - 2, hex('#f4a0a0')); pset(x + 1, y - 1, f_P.bl); pset(x + 2, y - 1, f_P.bl); rect(x + 1, y, x + 3, y, l);
  for (let i = 0; i < 7; i++) { const px = x + 14 + Math.round(Math.sin(t * 2.2 + i * 0.55) * i / 3.5), py = y - 2 + i; pset(px, py, i > 4 ? s : c); pset(px + 1, py, f_P.k); pset(px - 1, py, f_P.k); } pset(x + 14 + Math.round(Math.sin(t * 2.2 + 3.85) * 2), y + 5, f_P.k);
}

// calma un rectángulo de pared (la esquina de Atom): acerca cada píxel a la media del rectángulo, con el borde tramado
function f_calmar(R, x0, y0, x1, y1, a) {
  let r = 0, g = 0, b = 0, n = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y); r += c & 255; g += (c >> 8) & 255; b += (c >> 16) & 255; n++; }
  const m = (0xff000000 | (Math.round(b / n) << 16) | (Math.round(g / n) << 8) | Math.round(r / n)) >>> 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const e = Math.min(1, (x - x0 + 1) / 6, (y1 - y + 1) / 6); if (e > f_b4(x, y) * 0.99) R.pset(x, y, f_mez(R.pget(x, y), m, a)); }
}

// el terciopelo de las butacas, de la sombra a la luz
const G_TERCIO = ['#2e0a12', '#3e0e18', '#52141e', '#6a1c28', '#84242f', '#a03040', '#c04a58'];

// las butacas que faltan en las filas del fondo y del medio: por ahí baja el pasillo
const G_HUECO = [[13, 14], [10, 11]];

// una butaca de cara (centro x, de y0 a y1, media anchura w): el respaldo de terciopelo acanalado (canales de c px con
// su costura oscura y su lomo claro), la luz arriba que se apaga tramada hacia abajo, los botones del capitoné en las
// costuras y, con chapa, la chapita apagada del número; n: el tono medio (2–4) de G_TERCIO
function g_butacaCara(R, x, y0, y1, w, c, n, chapa = false) {
  const { rect, pset } = R, K = C.k, T = G_TERCIO.map(g_hex), alto = Math.max(1, y1 - y0 - 1), yb = y0 + 2 + Math.round(alto * 0.36);
  rect(x - w - 1, y0, x + w + 1, y1, K);
  for (let y = y0 + 1; y <= y1; y++) { const v = (y - y0 - 1) / alto;
    for (let i = -w; i <= w; i++) { const m = (i + w) % c, X = x + i; let l = n + (y === y0 + 1 ? 2 : y === y0 + 2 ? 1 : 0) + (m === 0 ? -1 : m === 1 ? 1 : 0);
      if (v * 1.6 - 0.25 > g_b4(X, y)) l--; if (v * 1.6 - 1.0 > g_b4(X, y)) l--; if (Math.abs(i) === w && y > y0 + 2) l = Math.min(l, n - 1);
      pset(X, y, T[l < 0 ? 0 : l > 6 ? 6 : l]); } }
  pset(x - w, y0 + 1, K); pset(x + w, y0 + 1, K);
  if (alto > 10) for (let i = -w + c; i < w; i += c) { pset(x + i, yb, T[Math.max(0, n - 3)]); pset(x + i, yb + 1, T[Math.min(6, n + 1)]); }
  if (chapa) rect(x - 1, y0 + 4, x + 1, y0 + 4, g_hex('#6a4636'));
}

// la moqueta de la sala en [x0, x1] × [y0, y1]: una red de rombos granates con un punto dorado apagado en cada centro
function g_moqueta(R, x0, y0, x1, y1, k = 0) {
  const A = g_hex('#1c0e16'), B = g_hex('#241018'), L = g_hex('#3a1a28'), M = g_hex('#2c1420'), O = g_hex('#5a3a28');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.abs((x + k) % 8 - 4) + Math.abs(y % 8 - 4); R.pset(x, y, d === 4 ? L : d === 0 ? O : d === 1 ? M : (x * 3 + y * 5) % 7 === 0 ? B : A); }
}

// un verde más fresco para las masas de hierba (entre hierba y hierbaL), para que se lean sobre el nogal y el friso
const h_fresco = hex('#8cb850');

// cuánto ha crecido una zona (0–1, suavizado) para o.hierba = g: empieza en el umbral th y tarda w
const h_sube = (g, th, w = 0.2) => { const u = h_cl((g - th) / w); return u * u * (3 - 2 * u); };

// una columna de hierba RELLENA (para masas, no briznas sueltas): desde (x, y) hacia arriba (dir -1) o colgando (dir 1),
// de alto variable por columna, base oscura, cuerpo de tres verdes y punta clara, con un temblor de viento
function h_mata(R, x, y, alto, t, k = 0, dir = -1) {
  if (alto < 0.6) return; const K = h_K, r = h(x, k, 97), al = Math.max(1, Math.round(alto * (0.55 + r * 0.45) + Math.sin(t * 2.1 + x * 0.35 + k) * 0.6)), cu = r < 0.3 ? K.hierbaS : r < 0.72 ? K.hierba : h_fresco;
  for (let i = 0; i < al; i++) R.pset(x, y + dir * i, i === al - 1 && al > 1 ? K.hierbaL : i < al * 0.3 ? ((x + i) & 1 ? K.hierbaD : K.hierbaS) : cu);
}

// una repisa tomada por la hierba: una franja rellena en la fila y (de x0 a x1), matas hacia arriba (hasta `alto` px) y
// flecos que cuelgan (hasta `cuelga` px); f 0–1 es cuánto ha crecido (entra a manchas, no de golpe)
function h_repisaVerde(R, x0, x1, y, f, t, k, alto = 5, cuelga = 6) {
  if (f <= 0) return; const K = h_K;
  for (let x = x0; x <= x1; x++) { const r = h(x >> 1, k, 101), fx = h_cl((f - r * 0.5) / 0.5); if (fx <= 0) continue;
    R.pset(x, y, r < 0.5 ? K.hierbaS : K.hierba); R.pset(x, y + 1, K.hierbaD);
    h_mata(R, x, y - 1, (1 + h(x, k, 102) * alto) * fx, t, k);
    if (cuelga && h(x >> 1, k, 103) < 0.6) h_mata(R, x, y + 2, (1 + h(x >> 1, k, 104) * cuelga) * fx, t, k + 1, 1); }
}

// el umbral de o.hierba a partir del cual el punto (x, y) del suelo del estudio queda cubierto: la hierba nace al pie
// del escritorio y se extiende a manchas hacia las paredes
const h_umbralSuelo = (x, y) => 0.24 + Math.hypot((x - 152) / 190, (y - 168) / 60) * 0.5 + (h(x >> 2, y >> 1, 98) - 0.5) * 0.22;

// el color del tapiz de hierba en (x, y): vetas verticales de 4 px, manchas grandes más oscuras y más frescas, una
// fila de puntas claras cada cuatro y la onda de viento que lo cruza
const h_tonoTapiz = (x, y, t) => { const K = h_K, q = y & 3;
  if (Math.sin(x * 0.11 + y * 0.45 - t * 2.4 + Math.sin(y * 0.3) * 2) > 0.9) return K.hierbaL;
  const b = h_cl(Math.floor(h(x, y >> 2, 99) * 4) + Math.round(Math.sin(x * 0.045 + y * 0.13) * 0.9 + Math.sin(x * 0.021 - y * 0.21 + 1) * 0.7), 0, 4) + (q === 0 ? 2 : q === 3 ? -1 : 0);
  return [K.hierbaD, K.hierbaS, K.hierbaS, K.hierba, K.hierba, h_fresco, K.hierbaL][h_cl(b, 0, 6)]; };

// LA HIERBA QUE SE QUEDA CON EL ESTUDIO (fondo; o.hierba = g): el tapiz relleno del suelo (tapa la tarima y la alfombra,
// con ondas de viento, matas al pie de la pared y flores), las baldas y el techo de la librería, el cesto de mapas, el
// marco del mapa, el canto del friso, el alféizar (corta: el cristal queda libre), el sillón (sin tapar al gato), el
// cuadro y una enredadera que sube por la lámpara de pie. Cada zona entra en su momento, de la mesa hacia fuera.
function h_estudioVerde(R, t, g) {
  const K = h_K, { pset } = R;
  // el tapiz del suelo: vetas verticales de 4 px (briznas), filas de puntas claras y una onda de viento que lo recorre
  for (let y = 153; y <= 179; y++) for (let x = 0; x < 320; x++) { const s = g - h_umbralSuelo(x, y); if (s > 0 && (s >= 0.05 || !((x + y) & 1))) pset(x, y, h_tonoTapiz(x, y, t)); }
  // las matas al pie de la pared y de los muebles (por encima del rodapié)
  for (let x = 0; x < 320; x++) h_mata(R, x, 153, (3 + h(x >> 1, 3, 100) * 6 + (h(x >> 4, 4, 100) < 0.3 ? 5 : 0)) * h_sube(g, h_umbralSuelo(x, 153), 0.12), t, 5);
  // la librería: las baldas (de abajo arriba), el zócalo y el techo
  [125, 103, 81, 59].forEach((by, b) => h_repisaVerde(R, 9, 57, by, h_sube(g, 0.5 + b * 0.08, 0.2), t, 20 + b, 5, 8));
  h_repisaVerde(R, 7, 59, 147, h_sube(g, 0.45, 0.2), t, 24, 3, 0); h_repisaVerde(R, 5, 61, 35, h_sube(g, 0.8, 0.18), t, 25, 3, 7);
  // el cesto de mapas, el marco del mapa, el canto del friso (entre los muebles) y el cuadro
  h_repisaVerde(R, 67, 77, 137, h_sube(g, 0.55, 0.2), t, 26, 3, 6); h_repisaVerde(R, 71, 123, 40, h_sube(g, 0.78, 0.2), t, 27, 3, 6);
  { const f = h_sube(g, 0.68, 0.25); h_repisaVerde(R, 63, 160, 114, f, t, 28, 3, 6); h_repisaVerde(R, 179, 249, 114, f, t, 29, 3, 6); h_repisaVerde(R, 0, 3, 114, f, t, 30, 3, 6); }
  h_repisaVerde(R, 281, 313, 60, h_sube(g, 0.84, 0.16), t, 31, 2, 5);
  // el alféizar: matas solo a los lados (el cristal queda libre) y un fleco que cuelga por debajo
  { const f = h_sube(g, 0.7, 0.2); h_repisaVerde(R, 170, 177, 100, f, t, 32, 4, 0); h_repisaVerde(R, 251, 258, 100, f, t, 33, 3, 0); h_repisaVerde(R, 170, 258, 104, f, t, 34, 0, 7); }
  // el sillón: el respaldo y los brazos (el gato sigue durmiendo a la vista)
  { const f = h_sube(g, 0.76, 0.2); h_repisaVerde(R, 273, 309, 108, f, t, 35, 4, 5); h_repisaVerde(R, 269, 275, 124, f, t, 36, 3, 0); h_repisaVerde(R, 307, 313, 124, f, t, 37, 3, 6); }
  // la enredadera que sube por la lámpara de pie, con sus hojitas
  { const n = Math.round(50 * h_sube(g, 0.72, 0.28)); for (let i = 0; i < n; i++) { const x = 269 + Math.round(Math.sin(i * 0.55) * 1.6), y = 151 - i; pset(x, y, i % 3 ? K.hierba : K.hierbaS); if (i % 5 === 2) { const s = Math.sin(i * 0.55) > 0 ? 1 : -1; pset(x + s, y, h_fresco); pset(x + s * 2, y - 1, K.hierbaL); } } }
  // las flores del tapiz (3 px, se mecen): salen cuando su trozo de suelo ya está bien cubierto
  for (let k = 0; k < 18; k++) { const x = Math.round(8 + k * 17.4 + h(k, 1, 109) * 9), y = Math.round(158 + h(k, 2, 109) * 19); if (g - h_umbralSuelo(x, y) < 0.22) continue;
    const m = Math.sin(t * 1.6 + k * 1.9) > 0.3 ? 1 : 0, c = [K.blanco, K.amarillo, K.rosa, K.blanco, K.lila][k % 5], fx = x + m;
    pset(x, y, K.hierbaD); pset(fx, y - 1, K.hierbaS); pset(fx, y - 4, c); pset(fx - 1, y - 3, c); pset(fx + 1, y - 3, c); pset(fx, y - 2, c); pset(fx, y - 3, c === K.amarillo ? K.rojo : K.amarillo); }
}

// LA HIERBA QUE SE QUEDA CON EL ESCRITORIO (delante; o.hierba = g, am = el montón de arena): una mata rellena sobre el
// tablero (baja junto al reloj de arena, para que se siga viendo), la cortina de bordes rotos que cuelga por el canto
// y los cajones, y el musgo que va cerrando el frente del mueble
function h_mesaVerde(R, t, g, am) {
  const K = h_K, { pset } = R;
  // el musgo del frente, a manchas de 4 px (deja ver el filo claro de cada cajón) y, encima, los tiradores dorados
  if (g > 0.6) { for (let y = 136; y <= 165; y++) { if (y === 138 || y === 148 || y === 158) continue; for (let x = 96; x <= 204; x++) if (g > 0.6 + h((x + (y >> 2)) >> 2, y >> 2, 106) * 0.52 + (h(x, y, 111) < 0.2 ? 0.1 : 0)) { const r = h(x, y >> 2, 107); pset(x, y, (x + y * 2) % 7 === 0 ? K.hierbaL : r < 0.12 ? K.hierbaD : r < 0.4 ? K.hierbaS : r < 0.8 ? K.hierba : h_fresco); } }
    for (const cx of [113, 187]) for (const y of [141, 151, 161]) { R.rect(cx - 3, y, cx + 3, y, K.oro); pset(cx - 3, y + 1, K.oroS); pset(cx + 3, y + 1, K.oroS); pset(cx - 2, y, K.oroL); } R.disco(150, 140, 1, K.oro); }
  for (let x = 92; x <= 208; x++) { const d = Math.abs(x - 152), cerca = d < 15;
    h_mata(R, x, 132, (4 + h(x >> 1, 8, 105) * 6 + (h(x >> 3, 9, 105) < 0.4 ? 8 : 0)) * h_sube(g, 0.25 + d / 58 * 0.2, 0.3), t, 8, 1);
    h_mata(R, x, 131 - h_arenaMesa(x, am), ((cerca ? 2 : 5) + h(x >> 2, 7, 105) * (cerca ? 2 : 7)) * h_sube(g, 0.08 + d / 58 * 0.3, 0.15), t, 7); }
}

// un tronco de deriva blanqueado por el mar, tumbado en la arena (x, y = su esquina de abajo a la izquierda; L de largo,
// al de alto): el corte redondo con sus anillos a la izquierda, la corteza con vetas, grietas y un nudo, una rama seca
// en horquilla, la punta rota a la derecha, su sombra tramada y la arena (o la hierba) que el viento le arrima por
// delante (S = la rampa del suelo)
function a_orTronco(R, x, y, L, al, S, k = 0) {
  const P = a_OR, T = [hex('#4e4038'), hex('#6e5e50'), hex('#92806a'), hex('#b4a288'), hex('#d0c2a8'), hex('#e8dfca')], K = P.k;
  for (let i = 0; i < L + 6; i++) for (let j = 1; j <= 2; j++) if ((i + j) & 1) R.pset(x + i + j, y + j, S[1]);   // la sombra
  // la rama seca en horquilla, por detrás
  { const bx = x + Math.round(L * 0.62), by = y - al; R.linea(bx, by, bx + 3, by - 5, T[1]); R.linea(bx + 1, by, bx + 4, by - 5, T[3]); R.linea(bx + 3, by - 4, bx + 7, by - 6, T[2]); if (L > 20) R.linea(bx + 3, by - 5, bx + 2, by - 9, T[3]); }
  // el cuerpo: un cilindro (luz arriba, sombra abajo) que se estrecha un poco hacia la punta rota
  for (let i = 2; i < L; i++) { const a = al - (i > L * 0.7 ? 1 : 0), rota = i >= L - 2 ? (i + k) % 2 : 0; R.pset(x + i, y - a, K); R.pset(x + i, y + 1, K);
    for (let j = rota; j < a - rota; j++) { const yy = y - j, v = 0.8 + j / (a - 1 || 1) * 3.9 + (h((i + j * 2) >> 2, j, k) - 0.5) * 1.3 + (h(i >> 1, j, k + 1) < 0.1 ? -1.3 : 0); R.pset(x + i, yy, a_orTono(T, v, x + i, yy)); }
    if (rota) { R.pset(x + i, y, K); R.pset(x + i, y - a + 1, K); } }
  R.pset(x + L, y - 1, K); R.pset(x + L, y - 2, K);
  for (let q = 0; q < L / 8; q++) { const cx = x + 7 + q * 8 + Math.round(h(q, 2, k) * 3); if (cx < x + L - 5) R.rect(cx, y - 1 - (q % 2), cx + 3, y - 1 - (q % 2), T[1]); }   // las grietas
  { const nx = x + Math.round(L * 0.42), ny = y - Math.max(1, al >> 1); R.rect(nx, ny - 1, nx + 1, ny, T[0]); R.pset(nx + 2, ny, T[1]); R.pset(nx - 1, ny, T[5]); R.pset(nx, ny - 2, T[5]); }   // el nudo
  // el corte: una elipse clara con el contorno oscuro, dos anillos y el corazón
  for (let j = -1; j <= al + 1; j++) for (let i = -2; i <= 3; i++) { const e = ((i - 0.5) / 2.6) ** 2 + ((j - al / 2) / (al / 2 + 1.1)) ** 2; if (e <= 1) R.pset(x + i, y - j, e > 0.62 ? K : e > 0.3 ? T[4] : e > 0.1 ? T[2] : T[5]); }
  R.pset(x, y - (al >> 1), T[1]);
  // la arena arrimada por delante, a trozos
  for (let i = 5; i < L - 3; i++) { const a = Math.round(1.6 * a_orRu(i * 0.3, k, 77) + (h(i, 3, k) < 0.2 ? 1 : 0)) - 1; for (let j = -1; j < a; j++) R.pset(x + i, y - j, j === a - 1 ? S[5] : S[4]); }
}

// el penacho de arena que el viento arranca de una cresta: sale hacia la derecha, sube un poco y cae en arco, cada vez más
// ancho y más ralo; el ruido corre con el viento y las rachas lo hinchan y lo aflojan. o.largo (px), o.esc (escala del arco y
// del grosor), o.fuerza (0–1.3), o.k (semilla), o.tapa(x, y): dónde no se pinta
function a_orPenacho(R, t, x0, y0, o = {}) {
  const A = a_OR.arena, largo = o.largo ?? 88, esc = o.esc ?? 1, k = o.k ?? 0, f = (o.fuerza ?? 1) * (0.74 + 0.26 * Math.sin(t * 1.7 + k + 2 * Math.sin(t * 0.6 + k))), tapa = o.tapa;
  const yc = (i) => { const u = Math.max(0, i) / largo; return y0 - 1 - 6 * esc * (1 - Math.exp(-Math.max(0, i) / (10 * esc))) + 46 * esc * Math.pow(u, 2.2) + 1.4 * esc * Math.sin(i * 0.11 - t * 5 + k); };
  for (let i = -5; i < largo; i++) { const u = Math.max(0, i) / largo, x = x0 + i; if (x < 0 || x > 319) continue; const c = yc(i), a = (2.4 + Math.max(0, i) * 0.19) * esc;
    for (let j = Math.floor(-a * 0.8); j <= a * 1.25; j++) { const y = Math.round(c + j); if (y < 22 || y > 179 || (x > 268 && y < 50) || (tapa && tapa(x, y))) continue; const jn = j / a;
      const e = Math.pow(1 - u, 0.55) * Math.pow(1 - Math.min(1, Math.abs(jn < 0 ? jn / 0.8 : jn / 1.25)), 0.7) * (0.3 + 1.05 * a_orRu(i * 0.085 - t * 4.4, j * 0.32 + t * 0.6, 48 + k)) * f * (i < 0 ? 0.6 : 1);
      if (e * 2.3 > a_orU(x, y) + 0.3) R.pset(x, y, jn > 0.4 ? (e > 0.5 ? A[3] : A[2]) : e > 0.42 ? A[5] : A[4]); } }
  // las hebras: trazos largos que corren por dentro del penacho y enseñan hacia dónde sopla
  const nh = Math.max(2, Math.round(7 * esc));
  for (let q = 0; q < nh; q++) { const ph = (t * (0.8 + h(q, 1, 47 + k) * 0.5) + q / nh) % 1, i0 = ph * largo * 0.86, jn = (h(q, 2, 47 + k) - 0.4) * 1.3, L = Math.round((7 + h(q, 3, 47 + k) * 9) * Math.max(0.5, esc));
    for (let s = 0; s < L; s++) { const i = i0 + s, x = Math.round(x0 + i), y = Math.round(yc(i) + jn * (2.4 + i * 0.19) * esc); if (x > 319 || y < 22 || (x > 268 && y < 50) || (tapa && tapa(x, y)) || (ph > 0.6 && s % 2)) continue; R.pset(x, y, A[5]); if (s > 1 && s < L - 2 && jn > 0) R.pset(x, y + 1, A[3]); } }
}

// lo fijo de la mesa: ep, la época; nf, cuántas facturas (0–5); nn, cuántas fichas sueltas (0–8)
// más cosas en la mesa de cerca (fijo): el pie de un cuadro en la pared (x 234–262, fuera de la barra del año y lejos
// de la esquina de Atom), el cerco de café, la goma, el sacapuntas y sus virutas, dos clips y el cable del flexo
function b_mesaExtras(R) {
  const { rect, pset, linea } = R;
  b_sombra(R, 237, 9, 264, 10, 0.3); rect(234, 0, 262, 8, C.k); rect(235, 0, 261, 7, hex('#6a4424')); rect(235, 7, 261, 7, hex('#3a2214')); rect(235, 0, 235, 7, hex('#8a5e36')); rect(237, 0, 259, 5, hex('#d8a840')); rect(238, 0, 258, 4, hex('#c4ac84')); for (let x = 238; x <= 258; x++) { pset(x, 3 + ((x >> 2) & 1), hex('#8a6e48')); pset(x, 4, hex('#8a6e48')); }
  for (let a = 0; a < 6.28; a += 0.1) if (h(Math.round(a * 8), 3, 57) > 0.2) pset(Math.round(244 + Math.cos(a) * 5), Math.round(108 + Math.sin(a) * 4), hex('#6a4424'));
  b_sombra(R, 206, 86, 214, 87, 0.3); rect(204, 80, 213, 85, C.k); rect(205, 81, 212, 84, hex('#e88a9a')); rect(205, 81, 212, 81, hex('#f8b8c0')); rect(205, 81, 207, 84, hex('#3a6ab8')); pset(205, 81, hex('#6a9ae0'));
  rect(218, 84, 224, 88, C.k); rect(219, 85, 223, 87, hex('#c8d0dc')); rect(219, 85, 223, 85, C.blanco); pset(221, 86, C.k); pset(222, 86, hex('#5a5a68'));
  for (const [x, y, c] of [[227, 86, '#e8c040'], [228, 85, '#d8b888'], [230, 88, '#d8b888'], [231, 87, '#e8c040'], [226, 89, '#d8b888'], [233, 84, '#c8a070'], [229, 82, '#e8c040'], [230, 81, '#d8b888']]) pset(x, y, hex(c));
  for (const [x, y] of [[2, 100], [4, 110]]) { rect(x, y, x + 5, y, hex('#8a94a4')); rect(x + 1, y + 2, x + 5, y + 2, hex('#8a94a4')); pset(x + 6, y + 1, hex('#8a94a4')); pset(x, y + 1, hex('#8a94a4')); pset(x + 2, y, C.blanco); }
  for (let x = 298; x < 320; x++) { const y = Math.round(93 + (x - 298) * 0.5 + Math.sin((x - 298) * 0.4) * 2); pset(x, y, C.k); pset(x, y + 1, hex('#3a3a44')); }
}

// la altura del cable de la luz en x: el vano de la casa al poste (x 203–252) y el del poste al borde derecho (x 258–
// 319, siempre por debajo de la esquina de Atom)
const b_cableY = (x) => { if (x <= 252) { const u = (x - 203) / 49; return Math.round(36 + 18 * u + 20 * u * (1 - u)); } const u = (x - 258) / 61; return Math.round(54 - 4 * u + 16 * u * (1 - u)); };

// lo que le faltaba a la entrada (fijo): cirros altos, el poste de la luz de la calle de detrás con su travesaño, su
// transformador y los cables, tulipanes al pie de la valla, la manguera hasta el aspersor, una pelota, el sumidero y
// el bordillo rojo de la boca de incendios, y rodadas y grietas en el asfalto
function b_entradaExtras(R, llu, hm, S) {
  const { rect, pset, disco, linea } = R, B = R.buf;
  if (!llu) for (const [cx, cy, len] of [[226, 32, 26], [252, 40, 30], [236, 47, 18], [266, 30, 14]]) for (let i = -len; i <= len; i++) for (let j = 0; j < 2; j++) { const x = cx + i, y = cy + j + Math.round(Math.sin(i * 0.16 + cx) * 1.2), k = S.indexOf(B[y * 320 + x]); if (x > 205 && x < 277 && k >= 0 && k < 3 && b_um(x, y) < 0.75 - Math.abs(i) / len * 0.6 - j * 0.2) B[y * 320 + x] = S[k + 1]; }
  // el poste, el travesaño con sus aisladores, el transformador y los cables (a la casa, al vecino y calle abajo)
  { const po = hm('#4a3424'), poL = hm('#6e5038'), ca = hm('#2e2e3a');
    for (let x = 203; x <= 319; x++) if (x <= 252 || x >= 258) pset(x, b_cableY(x), ca);
    linea(260, 67, 283, 86, ca); rect(202, 34, 204, 37, C.k); pset(203, 35, hm('#c8d0dc'));
    rect(252, 50, 256, 117, C.k); rect(253, 50, 255, 117, po); rect(253, 50, 253, 117, poL); for (let y = 60; y < 116; y += 9) pset(254, y, C.k);
    rect(245, 52, 263, 55, C.k); rect(246, 53, 262, 54, po); rect(246, 53, 262, 53, poL); for (const x of [247, 261]) { rect(x - 1, 50, x + 1, 52, C.k); pset(x, 51, hm('#c8d0dc')); }
    linea(249, 56, 252, 60, C.k); linea(259, 56, 256, 60, C.k);
    rect(257, 60, 262, 69, C.k); rect(258, 61, 261, 68, hm('#8a94a4')); rect(258, 61, 258, 68, hm('#c8d0dc')); pset(260, 64, C.k); }
  // los tulipanes al pie de la valla
  for (let x = 247; x < 319; x += 5) { if (x > 298 && x < 316) continue; const c = [['#e84a5a', '#f8a0a8'], ['#f0d040', '#f8eca0'], ['#f4f0f8', '#ffffff'], ['#b06ad8', '#d8a8f0']][(x * 7) % 4]; pset(x, 131, hm('#2e6a3e')); pset(x, 130, hm('#3a8a4a')); pset(x + 1, 131, hm('#3a8a4a')); rect(x, 128, x + 1, 129, hm(c[0])); pset(x, 128, hm(c[1])); }
  // la manguera, de su rollo al aspersor, y la pelota
  for (let x = 219; x <= 284; x++) pset(x, 147 + Math.round(Math.sin(x * 0.13) * 1.6), hm(x % 5 === 0 ? '#6aba5a' : '#2e6a3e'));
  b_sombra(R, 269, 142, 277, 143, 0.3); disco(272, 139, 3, C.k); disco(272, 139, 2, hm('#e84a4a')); rect(270, 139, 274, 139, hm('#f4f0e8')); pset(271, 137, hm('#f8a0a0'));
  // el bordillo rojo junto a la boca de incendios y el sumidero
  rect(168, 165, 195, 166, hm('#b8443a')); rect(168, 164, 195, 164, hm('#e07a6a'));
  rect(197, 164, 213, 168, C.k); rect(198, 165, 212, 167, hm('#16161c')); for (let x = 200; x < 212; x += 3) rect(x, 165, x, 167, hm('#6e6e7a'));
  // rodadas y grietas en el asfalto
  { const F1 = hm('#4c4c58'), F2 = hm('#565662'), F0 = hm('#3e3e48');
    for (const y of [171, 172, 177]) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if ((B[i] === F1 || B[i] === F2) && h(x >> 2, y, 38) < 0.62 && ((x + y) & 1)) B[i] = F0; }
    for (const q of [[[120, 168], [127, 171], [125, 175], [133, 179]], [[290, 168], [296, 171], [303, 172], [309, 175]], [[22, 173], [30, 175], [36, 179]]]) for (let k = 0; k < q.length - 1; k++) linea(q[k][0], q[k][1], q[k + 1][0], q[k + 1][1], hm('#2a2a34')); }
}

// el suelo de la cocina con más vida (fijo): la sombra del parteluz en el sol del suelo, brillos en las baldosas, las
// esquinas más oscuras, la sombra de la mesa, las botas de agua en su bandeja,
// un fardo de periódicos atado (barras, sin letras) y la bolsa de la compra
function b_cocinaSuelo(R) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf, F = [128, 132, 137, 143, 150, 158, 167, 177, 190];
  b_rayo(R, 173, 128, 175, 168, 0.8, hex('#7a4a44'), 0.3); b_rayo(R, 164, 146, 214, 147, 0.8, hex('#7a4a44'), 0.3);
  for (let v = 0; v < 8; v++) { const y = F[v] + 1, w = 9 + (y - 128) * 0.26; for (let u = -20; u <= 20; u++) if (h(u, v, 22) > 0.7) { const x = Math.round(160 + (u + 0.2) * w); for (let k = 0; k < (v > 2 ? 3 : 2); k++) if (x + k >= 0 && x + k < 320) B[y * 320 + x + k] = b_mez(B[y * 320 + x + k], C.blanco, 0.55); } }
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.abs(x - 176) / 176 * 0.7 + (y - 128) / 52 * 0.5; if (b_um(x, y) < (d - 0.62) * 1.4) B[y * 320 + x] = b_mez(B[y * 320 + x], hex('#3a1a20'), 0.22); }
  b_charco(R, 172, 169, 74, 8, hex('#2a1418'), 0.32);
  // las botas de agua en su bandeja y el fardo de periódicos
  b_sombra(R, 20, 176, 58, 177, 0.3); rect(20, 170, 56, 176, C.k); rect(21, 171, 55, 175, hex('#6a6a74')); rect(21, 171, 55, 171, hex('#9a9aa8')); rect(23, 173, 53, 174, hex('#4a4a56'));
  for (const [x, dy] of [[27, 0], [40, 1]]) { rect(x - 1, 156 + dy, x + 6, 173 + dy, C.k); rect(x - 1, 168 + dy, x + 11, 173 + dy, C.k); rect(x, 157 + dy, x + 5, 172 + dy, hex('#4e7244')); rect(x, 169 + dy, x + 10, 172 + dy, hex('#4e7244')); rect(x, 157 + dy, x + 1, 171 + dy, hex('#7aa066')); rect(x, 157 + dy, x + 5, 158 + dy, hex('#2e4a2a')); rect(x, 172 + dy, x + 10, 172 + dy, hex('#2a2a34')); pset(x + 9, 169 + dy, hex('#7aa066')); }
  b_sombra(R, 64, 176, 92, 177, 0.3); rect(63, 163, 90, 176, C.k); for (let y = 164; y <= 175; y++) rect(64, y, 89, y, y % 3 === 0 ? hex('#b8b0a0') : hex('#e8e0cc')); rect(64, 164, 89, 165, hex('#f4ecd8')); rect(66, 165, 78, 165, hex('#4a4a5a')); rect(81, 165, 87, 165, hex('#8a8a98')); rect(76, 164, 77, 175, hex('#a8743c')); rect(64, 169, 89, 169, hex('#a8743c')); pset(77, 163, hex('#a8743c')); pset(75, 162, hex('#a8743c')); pset(79, 162, hex('#a8743c'));
  // la bolsa de la compra (papel), con el apio y el pan asomando
  b_sombra(R, 280, 177, 300, 178, 0.3); linea(289, 161, 295, 152, C.k); linea(290, 161, 296, 152, hex('#d8a860')); linea(291, 161, 297, 153, hex('#b88440')); linea(292, 161, 298, 153, C.k);
  for (const [dx, dy] of [[-2, -6], [0, -8], [2, -6], [-3, -4]]) { linea(284, 161, 284 + dx, 161 + dy, hex('#3a8a4a')); pset(284 + dx, 160 + dy, hex('#6aba5a')); }
  poligono([[279, 160], [299, 160], [298, 177], [280, 177]], C.k); poligono([[280, 161], [298, 161], [297, 176], [281, 176]], hex('#c89a64')); rect(280, 161, 298, 162, hex('#e0b880')); linea(292, 163, 291, 176, hex('#a87a48')); linea(284, 163, 284, 176, hex('#b88a54')); for (let x = 281; x < 298; x += 3) pset(x, 160, hex('#c89a64')); rect(286, 167, 290, 170, hex('#c83a3a')); rect(287, 168, 289, 169, hex('#f4ecd8'));
}

// el gato de la cocina, sentado de perfil (mira a la derecha): la cabeza y el cuerpo por separado (la cabeza cabecea)
const b_GATO = [['.k..k..', 'kakkak.', 'kaaaak.', 'kaaeakk', 'kallapk', '.kaaak.'], ['....kkkkk..', '...kaaaalk.', '..kaadaalk.', '..kadaaalk.', '..kaadaalk.', '.kkaaaakak.', '.kkkkkkkkk.']];

// el perfil de la loma (0–1) a lo largo de su cuerpo: u = 0 es la proa (a la izquierda, empinada: la arena se levanta
// de golpe), la cima queda a un tercio y de ahí baja hasta la popa (u = 1), donde queda a un quinto de su altura y
// sigue en una cola baja. Nunca queda por debajo de sin(min(1, 1.6·u)·π/2)·√sin(π·u), el perfil con que du-planeta
// repasa el filo de luz a partir de { x, len, alto } (así ese filo cae siempre sobre la arena, no en el aire)
const c_lomaPerfil = (u) => (u <= 0 || u >= 1 ? 0 : Math.max(Math.sin(Math.min(1, u * 1.6) * Math.PI / 2) * Math.sqrt(Math.sin(Math.PI * u)), u < 0.13 ? 0.86 * Math.sqrt(1 - ((u - 0.13) / 0.13) ** 2) : u < 0.32 ? 0.86 + 0.14 * Math.sin((u - 0.13) / 0.19 * Math.PI / 2) : 1 - 0.8 * ((u - 0.32) / 0.68) ** 1.35));

// los remates de las cinco puertas del pasillo (se pinta tras las puertas y antes de los muebles, que tapan lo suyo): la
// sombra que cada marco arroja a su derecha, el dintel, las bisagras de latón y el ojo de la cerradura
function d_pasilloPuertas(R) {
  const { rect, pset } = R, laton = hex('#d8a848');
  for (const cx of D_PUERTAS) {
    for (let y = 82; y <= 139; y++) for (let x = cx + 16; x <= Math.min(319, cx + 18); x++) if (x === cx + 16 || (x + y) % 2 === 0) pset(x, y, d_mezcla(R.pget(x, y), C.k, x === cx + 16 ? 0.3 : 0.18));
    rect(cx - 17, 78, cx + 17, 80, C.k); rect(cx - 16, 78, cx + 16, 78, hex('#96603a')); rect(cx - 16, 79, cx + 16, 79, hex('#7a4a2a'));
    for (const y of [98, 131]) { rect(cx - 12, y, cx - 12, y + 1, laton); pset(cx - 12, y + 2, hex('#9a7028')); }
    pset(cx + 8, 125, C.k); pset(cx + 8, 126, C.k);
  }
}

// el detalle fijo que sube el pasillo al nivel del 11 (se pinta al final del fondo): la cenefa estarcida del friso alto
// (se apaga antes de la esquina de Atom), el tablón de corcho con avisos (rayas, sin letras), el rótulo del ascensor
// (dos triángulos, arriba y abajo) sobre el arco, el interruptor y el reflejo de puertas y muebles en el linóleo encerado
function d_pasilloMas(R) {
  const { rect, pset } = R, alto = hex('#cbbd90'), altoS = hex('#c2b486'), tinta = hex('#b3a374'), madS = hex('#5a3420'), madL = hex('#96603a');
  for (let x = 0; x < 264; x++) { if (x >= 252 && d_bayer(x, 40) <= (x - 252) / 12) continue; const q = x % 10;
    for (let y = 35; y <= 44; y++) { const d = Math.abs(q - 4) + Math.abs(y - 39.5), p = R.pget(x, y); if ((y === 35 || y === 44 || (d < 3 && d > 0.6)) && (p === alto || p === altoS)) pset(x, y, tinta); } }
  // el tablón de corcho (x 91–117, y 53–70: cabe entero tras el bocadillo de du-rechazos)
  { const x0 = 91, y0 = 53, x1 = 117, y1 = 70;
    for (let x = x0 + 1; x <= x1 + 2; x++) for (let y = y1 + 1; y <= y1 + 2; y++) if ((x + y) % 2) pset(x, y, hex('#c8ba8c'));
    rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, madL); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, madS); rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, madS);
    for (let y = y0 + 2; y <= y1 - 2; y++) for (let x = x0 + 2; x <= x1 - 2; x++) { const n = h(x, y, 130); pset(x, y, n < 0.18 ? hex('#a87a44') : n > 0.9 ? hex('#d4a468') : hex('#c08e54')); }
    for (const [x, y, w, a, c, pin] of [[94, 56, 6, 10, '#f6f0e0', '#c03a34'], [102, 56, 5, 4, '#f0dc90', '#3a6ab0'], [109, 56, 5, 7, '#f6f0e0', '#3e8a5a'], [102, 62, 5, 5, '#b8d4e0', '#c03a34'], [109, 65, 4, 2, '#f0dc90', '#d8a848']]) {
      rect(x + 1, y + a + 1, x + w + 1, y + a + 1, hex('#a87a44')); rect(x, y, x + w, y + a, hex(c)); rect(x, y + a, x + w, y + a, d_mezcla(hex(c), C.k, 0.2));
      for (let j = 2; j < a; j += 2) rect(x + 1, y + j, x + w - 1 - (j % 4 ? 1 : 0), y + j, hex('#8a8270')); pset(x + (w >> 1), y, hex(pin)); } }
  // el rótulo esmaltado del ascensor sobre el arco (x 48–68, y 27–37, a la derecha de las cifras del año): dos triángulos, arriba y abajo
  { const q = 21; rect(27 + q, 27, 47 + q, 37, C.k); rect(28 + q, 28, 46 + q, 36, hex('#2e5a4a')); rect(28 + q, 28, 46 + q, 28, hex('#4a7a68')); for (const [x, y] of [[29, 29], [45, 29], [29, 35], [45, 35]]) pset(x + q, y, hex('#d8a848'));
    const cr = hex('#f2ead4'); for (let i = 0; i < 4; i++) { rect(33 + q - i, 30 + i, 33 + q + i, 30 + i, cr); rect(41 + q - i, 34 - i, 41 + q + i, 34 - i, cr); }
    for (let x = 28 + q; x <= 48 + q; x++) if (x % 2) pset(x, 38, hex('#b3a374')); }
  // el interruptor de baquelita junto al arco
  rect(73, 94, 76, 100, C.k); rect(74, 95, 75, 99, hex('#e8dcc0')); pset(74, 96, C.k); pset(75, 98, hex('#a89c80'));
  // el linóleo encerado devuelve las puertas y los muebles (un reflejo suave que se pierde hacia la cámara)
  const refl = (x0, x1, c, a0) => { for (let y = 140; y <= 151; y++) for (let x = x0; x <= x1; x++) { const sx = x + Math.round((x - 160) * (y - 140) / 90); if (sx >= 0 && sx < 320) pset(sx, y, d_mezcla(R.pget(sx, y), c, a0 * 0.7 * (1 - (y - 140) / 12))); } };
  for (const cx of D_PUERTAS) refl(cx - 11, cx + 11, hex('#4a2a1a'), 0.42);
  refl(117, 129, hex('#d8a848'), 0.4); refl(163, 175, hex('#dfe6e2'), 0.4); refl(210, 221, hex('#b8623a'), 0.35); refl(254, 269, hex('#7a2e2e'), 0.3); refl(76, 82, hex('#9a7028'), 0.35);
}

// el detalle fijo que sube el despacho al nivel del 11 (se pinta al final del fondo): la lámpara de techo de cristal
// verde con su halo en el papel (x 188), la balda de pared con libros y una copa de latón (x 210–237, y 80), y el
// barómetro de caoba a la izquierda de la ventana (x 8; la aguja, en cada fotograma)
function d_despachoMas(R) {
  const { rect, pset, disco, linea, poligono } = R, papel = hex('#4e6e5c'), papelS = hex('#466452'), papelL = hex('#58796a'), caoba = hex('#6a3424'), caobaS = hex('#4c2218'), caobaL = hex('#8a4a30'), laton = hex('#d8a848'), latonS = hex('#9a7028'), latonL = hex('#f4d888');
  for (let j = -10; j <= 17; j++) for (let i = -19; i <= 19; i++) { const d = Math.hypot(i, j * 1.1), x = 188 + i, y = 28 + j, p = R.pget(x, y); if (y < 18 || d >= 18 || !(p === papel || p === papelS || p === papelL)) continue; if (d_bayer(x, y) > d / 18 + 0.12) pset(x, y, d < 9 ? hex('#7a9c86') : hex('#62846f')); }
  rect(188, 14, 188, 20, latonS); pset(188, 16, latonL); pset(188, 19, latonL);
  poligono([[184, 20], [192, 20], [196, 27], [180, 27]], C.k); poligono([[185, 21], [191, 21], [194, 26], [182, 26]], (x, y) => (y === 21 ? hex('#7ad89a') : x > 191 ? hex('#1e7a48') : x < 185 ? hex('#4cc07a') : hex('#2e9a5a')));
  rect(181, 27, 195, 28, C.k); rect(182, 27, 194, 27, hex('#fff4c8')); rect(187, 29, 189, 29, hex('#fff4c8'));
  // la balda
  for (let x = 211; x <= 238; x++) for (let y = 83; y <= 85; y++) if ((x + y) % 2) pset(x, y, papelS);
  rect(209, 79, 238, 82, C.k); rect(210, 80, 237, 81, caobaL); rect(210, 81, 237, 81, caobaS);
  for (const [x, d] of [[213, 1], [233, -1]]) { rect(x, 83, x, 87, C.k); pset(x + d, 83, C.k); pset(x + d, 84, C.k); pset(x + d * 2, 83, C.k); }
  { let x = 212; const cols = ['#8a2c2c', '#2c4a6a', '#c89a3a', '#3a5a3a', '#6a3a5a', '#b8562a', '#d8c8a0', '#2c4a6a'];
    for (let i = 0; i < 5; i++) { const w = 2 + (i % 3 === 1 ? 1 : 0), top = 79 - 9 - Math.floor(h(i, 1, 140) * 4), c = hex(cols[i]); rect(x, top, x + w, 78, c); rect(x + w, top, x + w, 78, d_mezcla(c, C.k, 0.45)); rect(x, top, x, 78, d_mezcla(c, C.blanco, 0.25)); rect(x, top + 2, x + w - 1, top + 2, laton); rect(x, top - 1, x + w, top - 1, C.k); x += w + 1; }
    rect(211, 67, 211, 78, C.k); rect(x, 70, x, 78, C.k);
    rect(231, 70, 235, 73, laton); rect(231, 70, 231, 73, latonL); rect(232, 74, 234, 74, latonS); rect(233, 75, 233, 76, latonS); rect(231, 77, 235, 78, latonS); rect(231, 77, 235, 77, laton); pset(230, 71, latonS); pset(236, 71, latonS); pset(230, 72, latonS); pset(236, 72, latonS); }
  // el barómetro
  { const x = 8; for (let y = 50; y <= 86; y++) for (let i = 9; i <= 10; i++) if ((x + i + y) % 2 && y > 62) pset(x + i - 1, y, papelS);
    rect(x - 2, 47, x + 2, 64, C.k); rect(x - 1, 48, x + 1, 63, caobaL); rect(x + 1, 48, x + 1, 63, caoba); rect(x, 50, x, 61, hex('#f2ead4')); rect(x, 56, x, 61, hex('#c03030')); pset(x, 46, C.k);
    disco(x + 0.5, 71.5, 8.2, C.k); disco(x + 0.5, 71.5, 7.2, caoba); disco(x + 0.5, 71.5, 5.8, laton); disco(x + 0.5, 71.5, 4.8, hex('#f4ecd4')); for (let k = 0; k < 8; k++) pset(Math.round(x + Math.cos(k * Math.PI / 4) * 3.8), Math.round(71 + Math.sin(k * Math.PI / 4) * 3.8), hex('#8a8270'));
    disco(x + 0.5, 82.5, 2.8, C.k); disco(x + 0.5, 82.5, 1.8, caobaL); pset(x, 82, laton); }
}

// el detalle fijo que sube la editorial Chilton al nivel del 11 (se pinta al final del fondo): la balda de las maquetas
// sobre la ventana (x 224–266, y 40: dos coches y una copa) y, en el suelo al sol, la caja de manuales recién llegada
// (x 258–288, base y 157) con un fardo atado al lado; quien anda por delante (suelo 160–163) los tapa al pasar
function d_chiltonMas(R) {
  const { rect, pset, disco } = R, paredS = hex('#d6cba8'), robleL = hex('#cca468'), robleS = hex('#8a6638'), laton = hex('#d8a848'), latonS = hex('#9a7028');
  for (let x = 225; x <= 267; x++) for (let y = 43; y <= 44; y++) if ((x + y) % 2) pset(x, y, paredS);
  rect(223, 39, 267, 42, C.k); rect(224, 40, 266, 41, robleL); rect(224, 41, 266, 41, robleS); for (const x of [229, 261]) { rect(x, 43, x, 46, C.k); pset(x + 1, 43, C.k); pset(x - 1, 43, C.k); }
  for (const [x, c] of [[232, '#2e5a9a'], [246, '#c8a030']]) { const col = hex(c);
    rect(x - 6, 34, x + 6, 38, C.k); rect(x - 3, 31, x + 3, 34, C.k); rect(x - 5, 35, x + 5, 37, col); rect(x - 5, 35, x + 5, 35, d_mezcla(col, C.blanco, 0.35)); rect(x - 2, 32, x + 2, 34, col); pset(x - 1, 33, hex('#c4e0ea')); pset(x + 1, 33, hex('#c4e0ea')); pset(x - 3, 38, hex('#8a8a96')); pset(x + 3, 38, hex('#8a8a96')); pset(x + 5, 36, hex('#fff080')); }
  { const x = 259; rect(x - 3, 28, x + 3, 33, C.k); rect(x - 2, 29, x + 2, 32, laton); rect(x - 2, 29, x - 2, 32, hex('#f4d888')); pset(x - 4, 30, latonS); pset(x + 4, 30, latonS); rect(x, 33, x, 35, latonS); rect(x - 2, 36, x + 2, 38, C.k); rect(x - 1, 36, x + 1, 37, latonS); }
  // la caja de cartón y el fardo: la sombra cae hacia la izquierda (la luz entra por la ventana)
  { const x0 = 258, x1 = 288, yb = 157, ct = hex('#c89a5a'), ctS = hex('#a67c42'), ctL = hex('#dcb478');
    for (let y = yb - 2; y <= yb + 3; y++) for (let x = 232; x <= x1; x++) { const sx = x - (y - yb) * 2 - 6; if ((sx + y) % 2 === 0 && sx >= 0) pset(sx, y, d_mezcla(R.pget(sx, y), hex('#5e4424'), 0.5)); }
    for (let i = 0; i < 9; i++) { const x = x0 + 2 + i * 3, c = hex(D_LOMOS[(i * 3) % 8]), top = yb - 19 + (i * 7) % 3; rect(x, top - 1, x + 2, yb - 13, C.k); rect(x, top, x + 1, yb - 13, c); rect(x, top + 2, x + 1, top + 3, hex('#f2ead4')); }
    rect(x0, yb - 13, x1, yb, C.k); rect(x0 + 1, yb - 12, x1 - 1, yb - 1, ct); rect(x0 + 1, yb - 12, x1 - 1, yb - 12, ctL); rect(x0 + 1, yb - 2, x1 - 1, yb - 1, ctS); rect(x1 - 3, yb - 11, x1 - 1, yb - 1, ctS);
    for (let x = x0 + 3; x < x1 - 3; x += 2) if (h(x, 3, 150) < 0.5) pset(x, yb - 4 - Math.floor(h(x, 4, 150) * 6), ctS);
    rect(x0 + 13, yb - 12, x0 + 16, yb - 1, hex('#e8d8a8')); rect(x0 + 13, yb - 12, x0 + 13, yb - 1, hex('#f6ecc8'));
    for (const ax of [x0 + 5, x0 + 22]) { rect(ax, yb - 9, ax, yb - 4, hex('#7a5a2e')); pset(ax - 1, yb - 8, hex('#7a5a2e')); pset(ax + 1, yb - 8, hex('#7a5a2e')); pset(ax - 2, yb - 7, hex('#7a5a2e')); pset(ax + 2, yb - 7, hex('#7a5a2e')); }
    rect(x0 - 4, yb - 13, x0, yb - 6, C.k); rect(x0 - 3, yb - 12, x0 - 1, yb - 7, ctS); rect(x1, yb - 13, x1 + 4, yb - 6, C.k); rect(x1 + 1, yb - 12, x1 + 3, yb - 7, ctL);
    for (let j = 0; j < 4; j++) { const y = yb - j * 3, c = hex(D_LOMOS[[0, 5, 1, 2][j]]), dx = j % 2; rect(240 + dx, y - 3, 254 + dx, y, C.k); rect(241 + dx, y - 2, 253 + dx, y - 1, c); rect(242 + dx, y - 2, 244 + dx, y - 1, hex('#f2ead4')); pset(243 + dx, y - 1, C.k); }
    rect(247, yb - 12, 247, yb, hex('#e8dcc0')); pset(246, yb - 13, hex('#e8dcc0')); pset(248, yb - 13, hex('#e8dcc0')); }
}

// más cosas en la sombra de la balda de arriba del estante (y 22–39, poco contraste; nada bajo Atom): una aceitera,
// un tarro de tornillos y dos cajas de recambios
function d_estanteMas(R) {
  const { rect, pset, linea, disco } = R, n = hex('#140c0a'), osc = (c) => d_mezcla(hex(c), hex('#1c1210'), 0.5);
  rect(5, 29, 17, 39, n); rect(6, 30, 16, 39, osc('#c03a34')); rect(6, 30, 7, 39, osc('#e05a50')); rect(6, 33, 16, 34, osc('#f2ead4')); rect(9, 26, 13, 29, n); rect(10, 27, 12, 29, osc('#8a8a96')); linea(13, 27, 21, 22, osc('#8a8a96')); pset(22, 22, osc('#d8a848'));
  rect(26, 24, 40, 39, n); rect(27, 27, 39, 39, osc('#7aa0a0')); rect(27, 25, 39, 26, osc('#d8a848')); rect(28, 27, 29, 38, osc('#b8d4d4')); for (let i = 0; i < 14; i++) pset(30 + Math.floor(h(i, 1, 160) * 9), 31 + Math.floor(h(i, 2, 160) * 8), osc(i % 2 ? '#c8ccd4' : '#5a5e6c'));
  rect(157, 30, 185, 39, n); rect(158, 31, 184, 39, osc('#c89a5a')); rect(158, 31, 184, 31, osc('#dcb478')); rect(169, 31, 172, 39, osc('#e8d8a8')); rect(161, 23, 179, 30, n); rect(162, 24, 178, 29, osc('#a67c42')); rect(162, 24, 178, 24, osc('#c89a5a')); rect(166, 26, 172, 28, osc('#f2ead4')); disco(169.5, 27, 0.8, n);
  rect(96, 33, 110, 39, n); rect(97, 34, 109, 39, osc('#4a7676')); rect(97, 34, 109, 34, osc('#7aa0a0')); disco(103.5, 37, 1.6, osc('#c8ccd4'));
}
