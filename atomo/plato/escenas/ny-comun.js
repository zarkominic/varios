// Fontanería y decorados del episodio 15 (Nueva York, de isla de bosques a ciudad de rascacielos) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Ocho decorados (guion.md): A la bahía 1524–1609, B Nueva Ámsterdam
// 1624–1664, C Nueva York colonial 1765–1789 (y C2, la guerra de 1776), D el puerto y el canal 1811–1860, E los que
// llegaron 1840–1898, F la feria y la obra 1854–1916, G la carrera al cielo 1929–1931, H la ciudad de hoy; más el mapa de
// papel (mapaNY). Los lenapes, con respeto y según las fuentes; las guerras, sin violencia en la imagen; sin letras ni
// marcas reales. Reutiliza del 10 la paleta, rodar, la mano, el brazo y la silla.
//
//   import * as T from '/atomo/plato/escenas/ny-comun.js';
//   const { E, R, M } = await T.preparar('ny-gancho');
//   T.rodar(E, R, [[0, (t) => T.bahia1524(R, t, { encuadre: 'estrecho' })]], { año: 1524 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { equirect, mapaPapel, chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el puerto: el agua de la bahía, las marismas, el bosque de 1524
    bahia: '#3a6e8e', bahiaS: '#28506a', bahiaL: '#6aa0be', espuma: '#e8f0f0', marisma: '#8a9a5a', marismaS: '#6a7a42',
    bosque: '#3a6a3a', bosqueS: '#28502c', bosqueL: '#5a8a4a',
    // la ciudad: el ladrillo holandés, la piedra rojiza de las brownstones, la piedra caliza y el acero
    ladrillo: '#a84a34', ladrilloS: '#7a3424', ladrilloL: '#c86a4a', brown: '#7a4a3a', brownS: '#5a3428', brownL: '#9a6450',
    caliza: '#d8d0bc', calizaS: '#b0a890', calizaL: '#ece6d6', acero: '#8a96a2', aceroS: '#5e6a76', aceroL: '#c8d2dc',
    // el cristal de la posguerra, el art déco del Chrysler, el cobre verde de la estatua
    cristal: '#6aa0b8', cristalS: '#3e6a80', cristalL: '#b8dcea', deco: '#c8ccd4', decoS: '#8a909c', cobre: '#5aa898', cobreS: '#3a7a6c',
    // las banderas (holandesa, inglesa y la de las barras y estrellas de 1783) y el oro
    rojoBandera: '#c8303a', azulBandera: '#2a3a7a', naranja: '#e8783a', oro: '#e8b830', oroS: '#a8801c',
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
  const E = await escena(id, 'ep15');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: el barco de vela (el puerto), el barril (el canal y los que llegaron) y el rascacielos
  Object.assign(R.ICONOS, {
    barco: ['...#...', '...##..', '...###.', '...#...', '#######', '.#####.', '.......'],
    barril: ['.#####.', '#.....#', '#######', '#.....#', '#######', '#.....#', '.#####.'],
    rascacielos: ['...#...', '...#...', '..###..', '..###..', '.#####.', '.#####.', '#######'],
  });
  // la barra de tiempo: el puerto (1524–1824), el canal y los que llegaron (1825–1899) y los rascacielos (1900–2026)
  R.tramosTiempo([[1524, 1824, R.PALA.ORO, 'barco'], [1825, 1899, R.PALA.AZUL, 'barril'], [1900, 2026, R.PALA.ROJO, 'rascacielos']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// sitios ([lon, lat]) para las chinchetas del mapa
export const LUGARES = {
  nuevaYork: [-74.0, 40.71], dieppe: [1.08, 49.92], madeira: [-16.9, 32.65], albany: [-73.76, 42.65], buffalo: [-78.88, 42.89],
  londres: [-0.13, 51.5], amsterdam: [4.9, 52.37], cork: [-8.47, 51.9],
};
// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ── A · La bahía, 1524–1613 ───────────────────────────────────────────────────────────────────────────────────────────
// La bahía de Nueva York antes de la ciudad, en primavera: bosque de robles, castaños y pinos en tres términos (la sierra
// lejana azulada, las colinas con copas redondas de tres tonos, salpicadas de verde tierno, cornejos en flor blancos y
// ciclamores rosas, y los árboles cercanos que se mecen), marismas con juncos y espadañas que el viento dobla y garzas que
// pescan, playas, rocas con percebes; el agua viva: degradado tramado por profundidad, el reflejo ondulado de las colinas y
// del cielo, olas en perspectiva que avanzan (más grandes cerca), el camino de brillos del sol y la espuma de la orilla;
// el cielo tramado con cirros quietos, cúmulos de tres tonos a tres velocidades, gaviotas y cormoranes. o.encuadre:
//   'estrecho': desde el mar, el estrecho (los Narrows) entre la colina de Staten Island (izquierda, x 0–158) y la de
//     Brooklyn (derecha, x 160–319); en el hueco, la bahía que se abre con Manhattan baja y la sierra azul al fondo; delante,
//     mar abierto con olas grandes y la roca de las gaviotas (abajo a la derecha, x 262–319) con la espuma que revienta.
//     El sitio del barco fondeado (T.dauphine) a la izquierda y el carril del bote que entra hacia el estrecho.
//   'bahia': dentro de la bahía: agua tranquila, el cabo de bosque de la izquierda con el poblado lenape (dos casas largas
//     de corteza, el humo, gente pequeña junto al fuego y canoas varadas), las marismas con garzas en la punta del cabo, la
//     isla larga de Manhattan con sus colinas al fondo a la derecha, la playa de arena delante a la izquierda (con un
//     tronco varado y conchas) y espadañas en la esquina de abajo a la derecha; el agua del centro, para las canoas.
//   'rio': el gran río (el Hudson de 1609) entre los acantilados de roca en columnas de las Palisades (izquierda, con un
//     hilo de cascada y bosque arriba) y las colinas boscosas de la otra orilla (derecha); la sierra azul de las Highlands
//     al fondo; el agua corre hacia nosotros en vetas; un águila planea, patos en el agua; rocas y matas delante a la
//     izquierda. Sitio en el centro para el Halve Maen.
//   'orilla': la orilla de Manhattan de 1613, desde tierra: la linde del bosque (troncos con corteza, helechos), la cabaña
//     de troncos a medio hacer (cuatro hiladas con las esquinas cruzadas, el hueco de la puerta y las vigas del tejado al
//     aire), los fardos de pieles de castor, un fuego con su humo, la playa con troncos y piedras y el tocón con el hacha
//     clavada (o.hacha false lo quita), el río con un castor que nada y la otra orilla azul al fondo; el barco que se va lo
//     pone la escena (T.dauphine pequeño en la línea del horizonte).
// o.viento (0–1, por defecto 0,2): dobla las copas de la cresta y las espadañas, riza el agua (olas más altas y
// borreguillos), corre las nubes y levanta espuma en la roca. o.luz: 'dia' (por defecto), 'tarde' (dorada, sol bajo) o
// 'anochecer' (cielo malva, estrellas y luna, el poblado con el fuego encendido). Cada encuadre y luz se pinta una vez en
// dos búferes (el cielo y la tierra, R.nuevo) y en cada fotograma se copia y encima va lo vivo: un recorrido de pantalla
// para el agua con reflejos más las olas, nubes, aves, humo y juncos. Devuelve { suelo, hor, pies: [x0, x1],
// agua: [x0, y0, x1, y1], ... } con los puntos de cada encuadre (ver la geometría de cada uno en a_ENC).
export function bahia1524(R, t, o = {}) {
  const enc = a_ENC[o.encuadre] ? o.encuadre : 'estrecho', luz = a_CIELOS[o.luz] ? o.luz : 'dia', v = Math.max(0, Math.min(1, o.viento ?? 0.2));
  const E = a_ENC[enc], d = a_bahiaFija(R, enc, luz);
  R.copiar(d.cielo);
  a_cieloVivo(R, t, d, v);
  a_aguaCapa(R, t, d, v);
  E.vivo(R, t, d, v, o);
  return { ...E.geo, hor: d.hor };
}
// La Dauphine (la nao francesa de 1524: tres palos, velas cuadras con la flor de lis insinuada en la mayor, castillo de
// popa alto con sus ventanas, castillo de proa, bauprés con la cebadera, el casco de tablas de roble con las cintas
// oscuras y la franja azul, jarcia con obenques y estays, gallardete largo y la bandera blanca con lises de oro) o, con
// o.barco 'halveMaen', el Halve Maen de Hudson (más pequeño, casco oscuro con la popa alta pintada de verde y oro, la
// bandera tricolor holandesa naranja, blanca y azul). Se mece con las olas (cabeceo y subida) y se refleja en el agua
// (o.reflejo false lo quita). o.s escala (1: ~62 px de eslora; 2 para ver la cubierta con los personajes encima);
// o.dir 1 (proa a la derecha) o −1; o.viento (0–1) hincha las velas, ondea las banderas y lo mece más; o.ancla true:
// fondeada, con las velas aferradas en las vergas y el cable del ancla que baja al agua; o.leva (0–1): el ancla sube y
// las velas se sueltan (de aferradas a hinchadas); o.avanza true: el bigote de espuma en la proa y la estela.
// (x, y): la línea de flotación en el centro. Devuelve { x, y, cubierta, proa, popa, castillo, borda: [x0, x1],
// delante() } (cubierta: la y donde se plantan los pies en la cubierta del medio; castillo: la del castillo de popa;
// delante(): repinta la borda por delante de los personajes de la cubierta).
export function dauphine(R, x, y, t, o = {}) {
  const hm = o.barco === 'halveMaen', s = (o.s ?? 1) * (hm ? 0.82 : 1), dir = o.dir ?? 1, v = Math.max(0, Math.min(1, o.viento ?? 0.3));
  const leva = o.leva != null ? Math.max(0, Math.min(1, o.leva)) : o.ancla ? 0 : 1, a = Math.sin(t * 1.1 + x * 0.1) * 0.022 * (1 + v * 1.5), bob = Math.sin(t * 1.35 + x * 0.07) * (0.5 + v * 0.8) * Math.min(1.5, s);
  const ca = Math.cos(a), sa = Math.sin(a), y0 = y + bob;
  const q = (u, w) => [x + (u * dir * ca - w * sa) * s, y0 + (u * dir * sa + w * ca) * s];
  const tmp = a_tmp(R), bx0 = Math.max(0, Math.floor(x - 46 * s)), bx1 = Math.min(319, Math.ceil(x + 46 * s)), by0 = Math.max(0, Math.floor(y - 64 * s)), by1 = Math.min(179, Math.ceil(y + 4 * s));
  for (let yy = by0; yy <= by1; yy++) tmp.fill(0, yy * 320 + bx0, yy * 320 + bx1 + 1);
  const prev = R.usar(tmp); a_barco(R, q, t, s, dir, v, leva, hm, false); R.usar(prev);
  const B = R.buf;
  // el reflejo: la imagen del barco al revés, ondulada y rota en franjas, mezclada con el agua
  if (o.reflejo !== false) { const yw = Math.round(y), largo = Math.round(26 * s);
    for (let k = 1; k <= largo && yw + k < 180; k++) { const sy = yw - k + 1, wob = Math.round(Math.sin(k * 0.8 - t * 2.6) * (0.5 + k / largo * 1.6)); if (sy < 0 || h(k, Math.floor(t * 5), 981) < 0.12 + k / largo * 0.3) continue;
      for (let xx = bx0; xx <= bx1; xx++) { const c = tmp[sy * 320 + xx], dx = xx + wob; if (!c || dx < 0 || dx > 319) continue; const j = (yw + k) * 320 + dx; B[j] = a_mezcla(c, B[j], 0.45 + 0.45 * k / largo); } } }
  for (let yy = by0; yy <= by1; yy++) for (let xx = bx0; xx <= bx1; xx++) { const c = tmp[yy * 320 + xx]; if (c) B[yy * 320 + xx] = c; }
  // la línea de agua contra el casco y, si avanza, el bigote de espuma y la estela
  const esp = hex('#f0f6f4'), espS = hex('#c4d8dc');
  for (let u = -27; u <= 28; u += 1) { const [px, py] = q(u, 0.6); if (h(u, Math.floor(t * 4), 982) < 0.6) R.pset(Math.round(px), Math.round(py), esp); }
  if (o.avanza) { const [px, py] = q(30, 0); for (let k = 0; k < 8; k++) { const f = ((t * 2 + k / 8) % 1); R.pset(Math.round(px + dir * (1 - f * 3)), Math.round(py - 1 - f * 2), esp); R.pset(Math.round(px - dir * f * 8 * s), Math.round(py + f * 2), espS); }
    for (let k = 0; k < 30; k++) { const f = k / 30, [ex, ey] = q(-28 - k * 2, 0); if (h(k, Math.floor(t * 6), 983) < 0.5) { R.pset(Math.round(ex), Math.round(ey + f * 3 * s), espS); R.pset(Math.round(ex), Math.round(ey - f * 2 * s), esp); } } }
  // el ancla: el cable de la proa al agua
  if (leva < 1 && (o.ancla || o.leva != null)) { const [ax, ay] = q(29, -7), largo = (1 - leva) * 16 * s; for (let k = 0; k < largo; k++) R.pset(Math.round(ax + dir * k * 0.55), Math.round(ay + k * 0.5), k % 2 ? hex('#5a4a32') : hex('#7a6648')); }
  const [cx, cy] = q(0, -7), [pr, prY] = q(30, -10), [po, poY] = q(-26, -17), [b0] = q(-18, -10), [b1] = q(14, -10);
  return { x, y, cubierta: Math.round(cy), proa: [Math.round(pr), Math.round(prY)], popa: [Math.round(po), Math.round(poY)], castillo: Math.round(q(-24, -14)[1]), borda: [Math.min(b0, b1), Math.max(b0, b1)].map(Math.round),
    delante: () => a_barco(R, q, t, s, dir, v, leva, hm, true) };
}
// Una canoa lenape de tronco vaciado (un tronco de tulípero quemado y raspado por dentro: la madera oscura con las vetas,
// el borde claro, los extremos romos que suben un poco) con o.n remeros pequeños (0–3, por defecto 2; 0 la deja vacía para
// poner chibis) con plumas de colores en el pelo y mantos de piel de ciervo, que reman a la par por un costado y otro con
// las palas que entran y salen del agua y gotean; se mece y deja una estela en V. o.dir 1 (hacia la derecha) o −1; o.s
// escala (1: 34 px; 0,5–0,7 para las lejanas, 2 de cerca); o.rema false: quietos (con las palas en alto, saludando);
// o.fase desfasa las paladas; o.alterna true: los remeros reman a contratiempo; o.carga true: fardos de pieles en el centro. (x, y): la línea del agua en el centro.
// Devuelve { x, y, asientos: [[x, y]…] } (los pies de los remeros, para poner chibis sentados encima con o.n 0).
export function canoa(R, x, y, t, o = {}) {
  const s = o.s ?? 1, dir = o.dir ?? 1, n = o.n ?? 2, rema = o.rema !== false, f0 = o.fase ?? x * 0.13, bob = Math.round(Math.sin(t * 1.8 + f0) * 0.6 * Math.max(0.5, s));
  const L = 17 * s, yy = y + bob, P = a_CANOA, esp = hex('#eef6f4'), espS = hex('#b8d0d8');
  // la estela en V y las ondas
  if (rema) for (let k = 1; k < 14; k++) { const u = k / 14, bx = Math.round(x - dir * (L + k * 2.4 * s)); if (h(k, Math.floor(t * 5), 991) < 0.3) continue; R.pset(bx, Math.round(y + 1 + u * 4 * s), espS); R.pset(bx, Math.round(y - u * 1.5 * s), esp); }
  // el casco: el tronco vaciado, visto un poco desde arriba: el borde claro, el hueco quemado por dentro, el costado con
  // las vetas y la quilla en sombra; los extremos romos suben
  const borde = (u) => yy - Math.round((2.6 + Math.pow(Math.abs(u), 4) * 2.6) * s);
  for (let i = -Math.round(L); i <= Math.round(L); i++) { const u = i / L, top = borde(u), bot = yy + Math.round((1 - u * u) * 1.3 * s), px = x + i * dir, hueco = Math.abs(u) < 0.86 ? Math.max(1, Math.round(s)) : 0;
    for (let j = top; j <= bot; j++) { const q = j - top, r = (j - top - hueco - 1) / Math.max(1, bot - top - hueco - 1);
      R.pset(px, j, q === 0 ? (Math.abs(u) > 0.86 ? P.bordeL : P.borde) : q <= hueco ? P.hueco : q === hueco + 1 ? P.borde : r > 0.7 ? P.s : (h(i >> 1, j, 992) < 0.22 ? P.veta : P.c)); }
    R.pset(px, bot + 1, a_mezcla(R.pget(px, bot + 1), P.s, 0.5)); if (s >= 0.8) R.pset(px, bot + 2, a_mezcla(R.pget(px, bot + 2), P.s, 0.3)); }
  // la espuma: en la proa y algo a lo largo
  for (let i = -Math.round(L) + 2; i < Math.round(L); i++) if (h(i, Math.floor(t * 4), 993) < (i * dir > L * 0.6 ? 0.8 : 0.12)) R.pset(x + i * dir, yy + Math.round((1 - (i / L) ** 2) * 1.3 * s) + 1, esp);
  if (o.carga) { R.rect(x - 4 * s, yy - 6 * s, x + 4 * s, yy - 3 * s, hex('#6a4426')); R.rect(x - 4 * s, yy - 6 * s, x + 4 * s, yy - 6 * s, hex('#8a5e36')); R.linea(x, yy - 6 * s, x, yy - 3 * s, hex('#c8b088')); }
  // los remeros
  const asientos = [], pos = n === 1 ? [0] : n === 2 ? [-0.45, 0.45] : [-0.55, 0, 0.55];
  pos.forEach((p, k) => {
    const px = Math.round(x + p * L * dir), base = yy - Math.round(3 * s); asientos.push([px - 7, base]);
    if (n === 0) return;
    const fase = t * 2.6 + f0 + (o.alterna ? k * Math.PI : 0), lado = k % 2 ? 1 : -1;
    a_remero(R, px, base, s, dir, rema ? fase : null, k + Math.round(x), lado, t);
  });
  if (n === 0) [-0.45, 0.45].forEach((p) => asientos.push([Math.round(x + p * L * dir) - 7, yy - Math.round(3 * s)]));
  return { x, y, asientos: n === 0 ? asientos.slice(-2) : asientos };
}
// ── B · Nueva Ámsterdam, 1624–1664 ───────────────────────────────────────────────────────────────────────────────────
// El pueblo holandés en la punta sur de Manhattan, con cielo tramado (nubes de tres tonos a tres velocidades, cirros y
// gaviotas). o.encuadre:
//   'puerto' (por defecto): desde el agua. Al fondo, las colinas boscosas de la isla; en medio, el fuerte de tierra con
//     bastiones, empalizada, la iglesia de dos tejados y el mástil con la bandera (holandesa: naranja, blanca y azul); las
//     casas en fila junto al camino de la orilla (de ladrillo con gablete escalonado o con tejado de tejas rojas, con
//     humo en las chimeneas), el molino (T.molino) que gira en su loma, la granja y el bosque a la derecha; colonos
//     pequeños que pasan por el camino (uno rueda una barrica). En el agua, un fluyt holandés fondeado junto a la orilla y
//     otro grande delante a la derecha, amarrado con un cabo; delante a la izquierda, el muelle de tablas (va por delante
//     de los barcos) con barricas, fardos y la grúa de madera con la red de carga que se balancea.
//     o.crece (0–1): 0 = 1625 (el fuerte a medio hacer con colonos que acarrean tierra, chozas de corteza y paja, tocones);
//     1 = 1660 (ocho casas de ladrillo, el fuerte terminado con la iglesia). Las casas pasan de corteza a ladrillo una a
//     una. o.ingleses (0–1): entran por la derecha tres barcos de guerra ingleses con las portas abiertas y los cañones
//     asomados (bandera de la cruz roja) y se quedan quietos con las velas recogidas; o.bandera / o.cambio como 'fuerte'.
//   'calle': una calle del pueblo con la calle que se aleja por el centro hasta los campos (perspectiva): a los lados,
//     casas grandes de ladrillo con gabletes escalonados (contraventanas, anclas de hierro, viga de izar, bancos en la
//     puerta) y otras con tejado de tejas rojas y chimeneas que humean; adoquines y barro, el canal delante con un
//     puente de tablas, una barca y patos; cerdos y gallinas que andan; al fondo, los campos, el bosque y el molino
//     pequeño que gira. o.molino: 'fondo' (por defecto), 'cerca' (un molino grande a la derecha, con las aspas que bajan
//     hasta la altura de la cabeza de un personaje: el gag del sombrero; devuelve molino.puntas y molino.baja) o false.
//     o.muro (0–1): el muro de troncos afilados que se levanta, tronco a tronco, de izquierda a derecha al fondo de la
//     calle. o.hoy (0–1): el mismo sitio se disuelve en la calle de hoy (fachadas altas de piedra con cornisas, rascacielos
//     al fondo, asfalto con paso de cebra, una alcantarilla que echa vapor, un semáforo, gente pequeña y coches que
//     cruzan al fondo, la acera con una boca de riego donde estaba el canal y el letrero verde de la calle con el
//     pictograma de un muro de troncos, sin letras).
//   'fuerte': dentro del fuerte: la muralla de tierra con su parapeto, troneras, cestones y cañones, la escalera de
//     tablas para subir; detrás, el puerto con los barcos ingleses quietos y la otra orilla; la casa del gobernador a la
//     izquierda (ladrillo, gablete escalonado, puerta con escalones), el cuartel bajo a la derecha, el patio de tierra con
//     charcos, balas apiladas, barricas, un pozo, una carretilla con su pala y el camino de losas; la garita y un
//     centinela pequeño que pasea por la muralla. El mástil alto con la
//     driza: o.bandera 'holandesa' (por defecto), 'blanca' o 'inglesa' (cruz roja de San Jorge); con o.cambio (0–1) la
//     que ondea baja (0–0,5) y sube o.nueva (por defecto, la inglesa) (0,5–1). o.ingleses (por defecto 1).
//   'mesa': el despacho de un comerciante: pared de yeso con vigas y friso de madera, la ventana emplomada con el puerto
//     detrás (agua que se mueve, un barco que se mece, gaviotas; recortado al hueco), la estantería con jarras y libros,
//     el mapa clavado, la vela que parpadea; la mesa de roble con la carta de 1626 (papel con renglones sin letras y el
//     sello rojo), la pluma en el tintero, los rollos de tela roja y azul, las hachas, los cazos de cobre que brillan y
//     las sartas de cuentas de colores. Un personaje puede ponerse detrás de la mesa (pies en mesa.detras = 138: asoma
//     la cabeza): la mesa se vuelve a pintar por delante de él al acabar el plano (R.delante, que rodar pinta al final;
//     o.delante: false lo quita, y entonces la escena llama a T.b_mesaDelante(R, t) cuando quiera).
// Devuelve { suelo, pies: [x0, x1], ... } con los puntos útiles de cada encuadre (ver la geometría al final de cada uno).
export function nuevaAmsterdam(R, t, o = {}) {
  const enc = o.encuadre ?? 'puerto';
  if (enc === 'calle') return b_calle(R, t, o);
  if (enc === 'fuerte') return b_fuerte(R, t, o);
  if (enc === 'mesa') return b_mesa(R, t, o);
  return b_puerto(R, t, o);
}
// El molino de viento holandés de Nueva Ámsterdam (x, y: el pie de la torre): la torre ochavada de tablas que se
// estrecha hacia arriba, con tres caras a la vista (la de la izquierda al sol, la de delante y la de la derecha en
// sombra), los postes de las esquinas, las tablas solapadas con su filo de luz y su sombra, los clavos, las manchas de
// la intemperie y el musgo de abajo; el zócalo de ladrillo, la puerta de tablas con sus herrajes, dos ventanucos con su
// reflejo y la galería con su tablazón, sus tornapuntas y su barandilla; la caperuza de paja peinada con su caballete y
// su ventanuco, el eje con su cubo de hierro y las cuatro aspas con el armazón de listones, el larguero con luz y sombra
// y la lona que ondea; la sombra de las aspas que barre la torre. A partir de o.s 0,8, la vida: un saco de harina que
// sube con la garrucha desde el pie hasta la galería y una nube de harina que sale por la puerta. Las aspas giran con t
// (o.vel, en rad/s; o.giro fija el ángulo). o.s escala (1: torre de 34 px y aspas de 24 px); o.lona (0–1: cuánta lona
// llevan); o.base: una loma de hierba al pie con matas y flores y la sombra del molino; o.tn: el tinte de todos los
// colores, como función (c) => color, o como número (0–1): cuánto se mezclan con el azul de la lejanía (o.tinteCol, por
// defecto '#8aaabc'); o.saco: false quita el saco; o.mascara(x, y): solo pinta donde devuelve true (para que quede por
// detrás de lo que tenga delante). Devuelve { x, y, eje: [x, y], puntas: [[x, y] ×4], baja: la punta más baja, r: el
// largo de las aspas } en cada instante (para el gag del sombrero).
export function molino(R, x, y, t, o = {}) {
  const s = o.s ?? 1, M = o.mascara, lonaF = o.lona ?? 1;
  const tn = typeof o.tn === 'number' ? b_tinte(o.tinteCol ?? hex('#8aaabc'), Math.max(0, Math.min(1, o.tn))) : o.tn ?? b_id;
  const vale = (px, py) => px >= 0 && px < 320 && py >= 0 && py < 180 && (!M || M(px, py));
  const ps = (px, py, c) => { px = Math.round(px); py = Math.round(py); if (vale(px, py)) R.pset(px, py, c); };
  // oscurece (k < 1) o aclara (k > 1) lo que ya está pintado
  const sombra = (px, py, k) => { px = Math.round(px); py = Math.round(py); if (!vale(px, py)) return; const i = py * 320 + px; R.buf[i] = a_luz(R.buf[i], k); };
  const C0 = [hex('#8a7458'), hex('#5e4c3a'), hex('#b09a78'), hex('#2e2018'), hex('#6e5a44'), hex('#c8a45a'), hex('#94743a'), hex('#e4c47a'), hex('#4a3422'), hex('#ece0c4'), hex('#bcae90'), hex('#fff8e8'), hex('#2a3646'),
    hex('#a04a32'), hex('#7a3424'), hex('#c46a4a'), hex('#b8ac98'), hex('#5a6a3a'), hex('#8aaac0'), hex('#3e2c1c'), hex('#2a2a30'), hex('#7a7a84'), hex('#d8cdb4'), hex('#9a8466')].map(tn);
  const [tor, torS, torL, k, tab, paja, pajaS, pajaL, aspa, lona, lonaS, lonaL, vid, lad, ladS, ladL, morte, musgo, vidL, pue, hie, hieL, saco, tabL] = C0;
  const grande = s >= 0.8;
  // la loma de hierba con matas, flores y la sombra del molino hacia la derecha
  if (o.base) { const lw = Math.round(20 * s), la = 4 * s;
    for (let i = -lw; i <= lw; i++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - (i / (20 * s)) ** 2)) * la);
      for (let j = 0; j <= a; j++) { const n = h(x + i, y - j, 71); ps(x + i, y - j + 1, tn(j === a ? (n < 0.3 ? hex('#a8d46a') : hex('#8aba56')) : n < 0.18 ? hex('#4a7a2e') : n > 0.9 ? hex('#7aaa48') : hex('#6a9a3e'))); }
      if (grande && h(i, 3, 72) < 0.22) { const fy = y - a; ps(x + i, fy, tn(hex('#4a7a2e'))); ps(x + i, fy - 1, tn(h(i, 4, 72) < 0.5 ? hex('#f4e8a0') : hex('#e88a8a'))); } }
    for (let j = 0; j <= Math.round(3 * s); j++) for (let i = 0; i < Math.round(26 * s); i++) { const e = Math.hypot((i - 12 * s) / (14 * s), (j - 1.5 * s) / (2.2 * s)); if (e < 1 && a_um(x + i, y + j) < (1 - e) * 1.6) sombra(x + Math.round(4 * s) + i, y - Math.round(1 * s) + j, 0.8); } }
  // la torre ochavada: tres caras, postes de esquina, tablas solapadas, clavos, intemperie y musgo; el zócalo de ladrillo
  const H = Math.round(34 * s), bw = 9 * s, tw = 5 * s, zH = grande ? Math.round(4 * s) : 0, paso = Math.max(2, Math.round(2.6 * s));
  for (let j = 0; j <= H; j++) { const yy = y - j, hw = bw + (tw - bw) * (j / H), r = Math.round(hw);
    for (let i = -r - 1; i <= r + 1; i++) { let c; const e = i / (hw + 0.01), cara = e < -0.42 ? 0 : e > 0.42 ? 2 : 1;
      if (Math.abs(i) > r) c = k;
      else if (j < zH) { // el zócalo de ladrillo con sus juntas a soga
        const fila = Math.floor(j / 2), junta = j % 2 === 1 || (i + 40 + (fila % 2) * 2) % 4 === 0;
        c = junta ? (cara === 2 ? tn(hex('#6a5a4a')) : morte) : cara === 0 ? ladL : cara === 2 ? ladS : (h(i, j, 73) < 0.25 ? ladS : lad); if (j === zH - 1) c = cara === 2 ? k : morte; }
      else { const q = (j - zH) % paso;
        c = cara === 0 ? torL : cara === 2 ? torS : tor;
        if (q === 0) c = cara === 2 ? k : torS;                                       // la sombra bajo el filo de cada tabla
        else if (q === 1 && cara !== 2 && grande) c = cara === 0 ? tabL : torL;       // el filo de luz de la tabla de encima
        if (Math.abs(Math.abs(e) - 0.42) < 0.5 / (hw + 0.01) * 1.2) c = cara === 2 ? k : torS;   // los postes de las esquinas
        if (grande && q === 2 && (i + 40) % Math.max(3, Math.round(4 * s)) === 0 && cara !== 2) c = torS;   // los clavos
        if (grande && h((i + 40) >> 1, j >> 2, 74) < 0.08 && q > 0) c = cara === 2 ? k : torS;          // la intemperie
        if (grande && j < zH + 3 * s && h(i, j, 75) < 0.35 - (j - zH) / (10 * s)) c = musgo; }        // el musgo de abajo
      ps(x + i, yy, c); } }
  // la puerta de tablas con su marco, los herrajes y la argolla; los dos ventanucos de delante con su reflejo
  if (s >= 0.6) { const pw = Math.round(3 * s), pa = Math.round(7 * s);
    for (let j = 0; j < pa; j++) for (let i = -pw; i <= pw; i++) { let c = Math.abs(i) === pw || j === pa - 1 ? k : (i + pw) % Math.max(2, Math.round(1.6 * s)) === 0 ? hex('#2a1c12') : pue;
      if (grande && (j === Math.round(pa * 0.25) || j === Math.round(pa * 0.7)) && Math.abs(i) < pw && i < 1) c = tn(hex('#1a1a1e'));
      ps(x + i, y - j, c); }
    if (grande) { ps(x + pw - 2, y - Math.round(pa * 0.45), hieL); ps(x - pw, y - pa, tabL); ps(x - pw + 1, y - pa, tabL); }
    const ven = grande ? [[0, Math.round(20 * s)], [0, Math.round(27 * s)]] : [[0, Math.round(20 * s)]];
    for (const [vx, vy] of ven) { const ww = grande ? Math.max(1, Math.round(1.2 * s)) : 1, wa = grande ? Math.round(2.4 * s) : 2;
      for (let j = -1; j <= wa; j++) for (let i = -ww - 1; i <= ww + 1; i++) { const borde = Math.abs(i) === ww + 1 || j === -1 || j === wa; ps(x + vx + i, y - vy - j, borde ? (grande ? tabL : k) : (i === -ww && j === wa - 1 ? vidL : vid)); }
      if (grande) for (let i = -ww - 1; i <= ww + 1; i++) ps(x + vx + i, y - vy + 2, k); } }
  // la galería: la tablazón con las cabezas de las tablas, la sombra que echa en la torre, las tornapuntas y la barandilla
  const yg = y - Math.round(11 * s), gw = Math.round(bw + 4 * s);
  if (s >= 0.45) {
    if (grande) for (let j = 2; j <= Math.round(2 * s) + 1; j++) for (let i = -Math.round(bw); i <= Math.round(bw); i++) sombra(x + i, yg + j, 0.72);
    for (let i = -gw; i <= gw; i++) { ps(x + i, yg, (i + 40) % 3 === 0 ? tab : tabL); ps(x + i, yg + 1, k); if (grande) ps(x + i, yg + 2, (i + 40) % 3 === 0 ? k : torS);
      ps(x + i, yg - Math.round(4 * s), tabL); if (grande) ps(x + i, yg - Math.round(4 * s) + 1, tab);
      if (i % Math.max(2, Math.round(3 * s)) === 0) for (let j = 1; j < Math.round(4 * s); j++) ps(x + i, yg - j, j === 1 ? tab : i < 0 ? tabL : tab); }
    for (const d of [-1, 1]) for (let j = 0; j < Math.round(10 * s); j++) { ps(x + d * (gw - Math.round(j * 0.4)), yg + 1 + j, k); if (grande) ps(x + d * (gw - Math.round(j * 0.4)) - d, yg + 1 + j, tab); } }
  // el saco de harina que sube con la garrucha (desde el pie hasta la galería) y la nube de harina de la puerta
  if (grande && o.saco !== false) {
    const bx = x + gw - Math.round(2 * s), top = yg - Math.round(6 * s), cic = (t * 0.16 + 0.3) % 1, sube = Math.min(1, Math.max(0, (cic - 0.1) / 0.6)), ease = sube * sube * (3 - 2 * sube);
    for (let i = 0; i <= Math.round(3 * s); i++) ps(bx - i, top, tab); ps(bx, top + 1, k);                           // el pescante
    const sy = Math.round(y - 1 - (y - 1 - (yg - Math.round(1 * s))) * ease), vis = cic < 0.85;
    for (let j = top + 1; j < (vis ? sy - Math.round(3 * s) : yg + 4); j++) ps(bx, j, tn(hex('#d8c8a0')));            // la cuerda
    if (vis) { const sw = Math.round(1.6 * s), sa = Math.round(3.2 * s), bal = Math.round(Math.sin(t * 3) * (sube > 0 && sube < 1 ? 1 : 0));
      for (let j = 0; j <= sa; j++) for (let i = -sw; i <= sw; i++) { const borde = Math.abs(i) === sw || j === sa || j === 0; ps(bx + i + bal, sy - j, borde ? tn(hex('#8a7a5a')) : i < 0 ? tn(hex('#fffaf0')) : saco); }
      ps(bx + bal, sy - sa - 1, tn(hex('#8a7a5a'))); }
    const nb = (t * 0.4) % 1; if (nb < 0.35) for (let q = 0; q < 5; q++) { const u = nb / 0.35, a = q * 1.3 + 0.4; ps(x + Math.round(3 * s) + Math.cos(a) * u * 4 * s + u * 3 * s, y - 2 - u * 3 * s - Math.sin(a) * u * 2 * s, u < 0.6 ? lonaL : lona); } }
  // la caperuza de paja peinada, con su caballete, su ventanuco y el alero
  const yc = y - H, cw = tw + 3 * s, ch = 7 * s;
  for (let j = 0; j <= ch; j++) { const w = Math.round(cw * Math.sqrt(Math.max(0, 1 - (j / (ch + 0.5)) ** 2)));
    for (let i = -w - 1; i <= w + 1; i++) { const e = i / (w + 0.5);
      let c = Math.abs(i) > w || j === Math.round(ch) ? k : (Math.round(i * 1.4 + j * 0.5 * Math.sign(i || 1)) % 3 === 0) ? pajaS : e < -0.4 ? pajaL : e > 0.5 ? pajaS : paja;
      if (grande && j > ch - 1.6 && Math.abs(i) <= w) c = tn(hex('#5a4a30'));
      ps(x + i, yc - j, c); } }
  if (grande) { const vy = yc - Math.round(ch * 0.2), vx = x - Math.round(cw * 0.55); for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) ps(vx + i, vy - j, i === 0 && j === 1 ? vidL : vid); }
  for (let i = -Math.round(cw) - 1; i <= Math.round(cw) + 1; i++) { ps(x + i, yc + 1, k); if (grande) ps(x + i, yc + 2, torS); }
  // las aspas: primero se marca su forma, luego su sombra en la torre y después se pintan
  const hx = x, hy = yc - Math.round(ch * 0.45), a0 = o.giro ?? t * (o.vel ?? 0.9), Lr = 24 * s, an = 5.5 * s, puntas = [];
  const box = Math.ceil(Lr + an + 2), lado = box * 2 + 1, forma = new Int8Array(lado * lado).fill(-1);
  const arms = [0, 1, 2, 3].map((q) => { const a = a0 + q * Math.PI / 2; return [Math.cos(a), Math.sin(a)]; });
  for (let j = -box; j <= box; j++) for (let i = -box; i <= box; i++) {
    let c = -1;
    for (const [ca, sa] of arms) { const u = i * ca + j * sa, v = -i * sa + j * ca; if (u < -1 || u > Lr + 0.5) continue;
      if (Math.abs(v) <= 0.75 * Math.max(1, s)) { c = v < 0 ? 1 : 0; break; }                               // el larguero (0 luz, 1 sombra)
      if (u > Lr * 0.18 && v > 0.75 && v < an) { const borde = v > an - 1 || u > Lr - 0.8, liston = Math.round(u) % Math.max(2, Math.round(3 * s)) === 0;
        if (borde || liston) { c = 2; break; }
        if (lonaF > 0 && v < 0.75 + (an - 0.75) * lonaF) { const ond = Math.sin(u * 0.7 / Math.max(1, s * 0.7) - t * 5); c = v < 2.2 ? 4 : v > an - 2 ? 5 : ond > 0.55 ? 4 : ond < -0.6 ? 5 : 3; break; }
        c = -2; }
      if (u > Lr * 0.18 && v < -0.75 && v > -1.9 * Math.max(1, s * 0.8)) { c = 6; break; } }
    forma[(j + box) * lado + i + box] = c; }
  // la sombra de las aspas sobre la torre (abajo a la derecha), solo donde hay torre y no hay aspa
  if (grande) { const dx = Math.round(2 * s), dy = Math.round(2 * s);
    for (let j = -box; j <= box; j++) for (let i = -box; i <= box; i++) { const c = forma[(j + box) * lado + i + box]; if (c < 0 && c !== -2) continue;
      const si = i + dx, sj = j + dy; if (si >= -box && si <= box && sj >= -box && sj <= box && forma[(sj + box) * lado + si + box] !== -1) continue;
      const px = hx + si, py = hy + sj, jj = y - py; if (jj < zH || jj > H) continue; const hw = bw + (tw - bw) * (jj / H); if (Math.abs(px - x) > hw) continue;
      if (py === yg || py === yg + 1) continue; sombra(px, py, 0.7); } }
  const COL = [aspa, k, aspa, lona, lonaL, lonaS, tab];
  for (let j = -box; j <= box; j++) for (let i = -box; i <= box; i++) { const c = forma[(j + box) * lado + i + box]; if (c >= 0) ps(hx + i, hy + j, c === 0 && grande ? tn(hex('#6a4e34')) : COL[c]); }
  for (const [ca, sa] of arms) puntas.push([Math.round(hx + ca * Lr), Math.round(hy + sa * Lr)]);
  // el cubo de hierro del eje con su brillo
  if (grande) { const rr = Math.max(1.5, 1.4 * s); for (let j = -Math.ceil(rr); j <= Math.ceil(rr); j++) for (let i = -Math.ceil(rr); i <= Math.ceil(rr); i++) { const d = Math.hypot(i, j); if (d <= rr) ps(hx + i, hy + j, d > rr - 0.8 ? k : i + j < -1 ? hieL : hie); } }
  else { ps(hx, hy, k); ps(hx + 1, hy, aspa); ps(hx, hy - 1, aspa); ps(hx - 1, hy, aspa); ps(hx, hy + 1, aspa); }
  const baja = puntas.reduce((a, b) => (b[1] > a[1] ? b : a));
  return { x, y, eje: [hx, hy], puntas, baja, r: Lr };
}
// ── C · Nueva York colonial, 1765–1789 ───────────────────────────────────────────────────────────────────────────────
// La ciudad británica y georgiana del siglo XVIII: ladrillo rojo con esquinas de piedra, ventanas de guillotina con
// contraventanas, tejados de pizarra con buhardillas y chimeneas que humean, adoquines y faroles de aceite. Cada encuadre
// pinta los 320×180 en cada fotograma: un fondo fijo (búfer R.nuevo, pintado una vez) más el cielo y la vida. o.encuadre:
//   'wallStreet': Wall Street con el ayuntamiento al fondo, de frente. Con o.anyo < 1789 (por defecto 1765), el City Hall
//     de ladrillo: arcada de cinco arcos abajo, una fila de ventanas, balconcillo de hierro, tejado con buhardillas y
//     cúpula con campana. Con o.anyo ≥ 1789, el Federal Hall de piedra clara: el piso de arcadas (tres arcos, el del
//     centro con la puerta), el balcón corrido con barandilla de hierro, cuatro columnas dóricas, las cortinas rojas, el
//     friso con trece estrellas, el frontón con el águila, la cúpula y dos banderas de las barras y estrellas. A los lados,
//     casas georgianas en dos términos (la del fondo con una tienda y su muestra colgante que se mece), la torre de la
//     Trinidad por detrás a la izquierda, tejados lejanos con mástiles, la bomba de agua, faroles, adoquines con la
//     acera de losas y un carro con barriles que cruza al fondo. o.multitud (0–1): gente pequeña llena la calle delante
//     del edificio, dejando libre el pasillo del arco central (o.pasillo: false lo llena); en 1789 además saludan con el
//     sombrero, hay gente en los tejados y asomada a las ventanas. o.carro (por defecto, solo si la multitud es < 0,4).
//   'taberna': el interior de una taberna: techo de vigas con manojos de hierbas y un farol colgado, pared de yeso con
//     entramado, chimenea de piedra con fuego, perol que humea y un gato que duerme, el cuadro de un barco, dos ventanas a
//     la calle (por ellas pasa gente y un carro, recortados al hueco), un tablón con papeles clavados (barras, sin
//     letras), banco corrido, barril y el mostrador con barricas, jarras de peltre, botellas y pipas; suelo de tablones
//     en perspectiva con serrín. La mesa de los naipes va delante: la pinta colonialDelante.
//   'bateria': la punta de la isla en noviembre de 1783: el mástil alto de la bandera (grueso, oscuro y brillante de
//     grasa, con gotas y un brillo que resbala), libre de arriba abajo sobre su peana; el puerto con islas, molino de
//     Brooklyn que gira, barcos británicos de tres palos que se van a vela y botes de remos; el parapeto de piedra con dos
//     cañones viejos (una gaviota en uno), la explanada con hierba de otoño, árboles con hojas que caen, un banco y un
//     farol. o.bandera: 'britanica' (la Union de 1707, sin el aspa roja de 1801; por defecto), 'barras' (13 barras y 13 estrellas en círculo) o
//     'ninguna'; o.altura (0–1, por defecto 1): dónde está la bandera en el mástil; o.salen (0–1): los barcos se alejan
//     hacia el estrecho y se achican; o.multitud (0–1): gente pequeña mirando en el muelle del fondo.
//   'salon': un interior del Federal Hall: pared con pilastras, molduras y cornisa de dentículos, zócalo, dos ventanas
//     altas de arco con cortinas rojas (el cielo pasa recortado) y luz que entra. o.sala: 'congreso' (estrado con el sillón
//     del presidente bajo un dosel rojo con el águila y trece estrellas, pupitres con plumas a los lados; la mesa larga de
//     paño verde con el pergamino va delante), 'tribunal' (cortinajes rojos, seis sillones altos de respaldo; el estrado
//     va delante) o 'cena' (de noche: la chimenea encendida, un aparador, la ventana con luna; la mesa con mantel y tres
//     velas va delante).
// o.luz: 'dia' (por defecto), 'tarde' o 'noche' (wallStreet y bateria): cambia el cielo, enciende faroles y ventanas.
// Devuelve { suelo, pies: [x0, x1], ... } y, según el encuadre, balcon, puerta, mastil, bandera, mesa, ventanas (ver
// la geometría al final de cada rama). Lo que va por delante de los personajes lo pinta colonialDelante(R, t, o).
export function colonial(R, t, o = {}) {
  const enc = o.encuadre || 'wallStreet';
  if (enc === 'taberna') return c_taberna(R, t, o);
  if (enc === 'bateria') return c_bateria(R, t, o);
  if (enc === 'salon') return c_salon(R, t, o);
  return c_wallStreet(R, t, o);
}
// ── C2 · La guerra de 1776 (sin violencia en la imagen) ──────────────────────────────────────────────────────────────
// Cielos tramados con nubes de tres tonos a tres velocidades (de noche, estrellas que titilan y la luna), agua viva y
// gente pequeña de fondo. Ningún disparo, ningún herido: velas, tiendas, humo de cocinas, niebla. o.encuadre:
//   'flota': el puerto en el verano de 1776 lleno de velas británicas en tres términos (más de cien puntitos de vela en el
//     horizonte, barcos medianos fondeados y siete grandes delante que se mecen con la bandera roja y humo de sus
//     cocinas), Staten Island y Brooklyn a los lados, gaviotas; delante, la colina de Manhattan con hierba que ondea,
//     flores, la cerca de troncos, un roble grande y una granja con humo (va por delante de los barcos).
//   'campamento' (por defecto): Brooklyn junto al río Este: filas de tiendas de lona del ejército continental, la tienda
//     grande de Washington con su banderín azul de estrellas, hogueras con su olla, un carro con toldo, tambores,
//     barricas y leña, soldados pequeños junto al fuego y paseando; detrás, el río con Manhattan al otro lado (casas,
//     la aguja de la iglesia de la Trinidad, un molino). o.vacio (0–1; desde 0,5 se ve vacío): sin nadie, sin el carro (solo
//     sus roderas), las hogueras apagadas que humean, una tienda caída, la olla olvidada y las huellas que van al
//     río. o.niebla (0–1). o.luz: 'dia' (por defecto) o 'alba' (la luz rosada y fría del amanecer).
//   'rio': el río Este de noche: cielo con estrellas y la luna con su halo, el reflejo de la luna que tiembla en el agua
//     oscura, la orilla de Manhattan al fondo con ventanas encendidas que parpadean y se reflejan, la orilla de Brooklyn
//     delante a la derecha con el embarcadero de tablas, los faroles tapados, las hogueras que se apagan y soldados que
//     esperan en silueta; el carril de las barcas de remos (las pone la escena con T.barcaRemos). o.luz 'noche' (por
//     defecto) o 'alba' (el cielo clarea, las luces se apagan, el agua gris); o.niebla (0–1).
//   'altos': los altos de Harlem en otoño: una loma de roca gris con líquenes, arces y robles rojos, naranjas y amarillos
//     que se mecen y sueltan hojas, el campo de alforfón en flor, la cerca; abajo, el río Hudson con barcos británicos
//     lejanos que navegan despacio y los acantilados de las Palisades al otro lado con su bosque.
// o.niebla (0–1), en 'campamento' y 'rio' (y también en 'flota' y 'altos'): niebla en tres bancos que se mueven a
// distinta velocidad (uno bajo y espeso pegado al agua y al suelo, uno medio y uno alto y fino), con la cresta abultada,
// el canto claro, jirones y vetas, tramada; al bajar o.niebla, se aclara y sube (se levanta). La niebla se pinta al
// acabar el plano (R.delante, que rodar pinta encima de todo), así tapa también las barcas y a los personajes; con
// o.nieblaDelante: false se pinta enseguida, por detrás de ellos (la escena puede llamar a T.b_niebla(R, t, n, r.niebla)
// cuando quiera). Devuelve { suelo, pies: [x0, x1], rio: [y0, y1], niebla: {…}, ... }.
export function guerra1776(R, t, o = {}) {
  const enc = o.encuadre ?? 'campamento';
  let r;
  if (enc === 'flota') r = b_flota(R, t, o);
  else if (enc === 'rio') r = b_rioEste(R, t, o);
  else if (enc === 'altos') r = b_altos(R, t, o);
  else r = b_campamento(R, t, o);
  const n = b_lim(o.niebla ?? 0);
  if (n > 0) { const pinta = () => b_niebla(R, t, n, r.niebla ?? {}); if (o.nieblaDelante === false) pinta(); else R.delante = pinta; }
  return r;
}
// Una barca de remos de 1776 (x, y: la línea del agua en el centro; unos 64 px de eslora con o.s 1,3, por defecto) con
// o.n soldados pequeños (de 2 a 7; unos 10 px por encima de la borda: tricornio, cara, casaca azul con el correaje
// blanco o de caza parda) que reman a la vez y en silencio: los remos entran en el agua, empujan y salen, con un
// remolino donde muerden; el patrón a popa con la caña del timón; el farol tapado con una rendija de luz en la proa; la
// estela en uve que se abre detrás y el balanceo. o.dir (-1: hacia la izquierda, por defecto, de Brooklyn a Manhattan);
// o.noche (0–1, por defecto 1: todo en la penumbra azul, con el canto de luna en la borda); o.remo (false: los remos
// quietos, levantados); o.carga: barricas en la proa en vez del primer remero. La escena pone delante a los personajes
// chibi si hace falta (o el gallo, en un asiento). Devuelve { x, y, proa, popa, asientos: [[x, y]…] } (asientos: la
// cintura de cada remero, a la altura de la borda).
export function barcaRemos(R, x, y, t, o = {}) {
  const n = Math.max(2, Math.min(7, o.n ?? 5)), d = o.dir ?? -1, s = o.s ?? 1.3, noche = b_lim(o.noche ?? 1), tn = b_tinte(hex('#0c1430'), noche * 0.55), rema = o.remo !== false;
  const L = Math.round(25 * s), hd = Math.round(6 * s), bal = Math.round(Math.sin(t * 1.7 + x * 0.05) * 0.8), Y = Math.round(y) + bal, X = (u) => Math.round(x + d * u * L);
  const fase = rema ? (t * 1.1) % 1 : 0.85, k0 = tn(hex('#1c1222'));
  // la estela en uve y los rizos a lo largo del casco
  for (let k = 1; k < 11; k++) { const u = k / 10, xx = X(-1) - d * k * 5, ab = Math.round(u * 9); if (((k + Math.floor(t * 3)) & 1) === 0 || k < 3) { R.pset(xx, Y + 1 + ab, tn(hex('#9ab0c8'))); R.pset(xx - d, Y + 1 + ab, tn(hex('#6a80a0'))); if (k < 7) { R.pset(xx, Y + 1 - Math.round(ab * 0.25), tn(hex('#9ab0c8'))); R.pset(xx + d, Y + 1 - Math.round(ab * 0.25), tn(hex('#6a80a0'))); } } }
  for (let i = -L; i <= L; i += 3) R.pset(x + i + Math.round(Math.sin(t * 2 + i) * 1), Y + 2, tn(hex('#2a3a5a')));
  for (let j = 1; j <= 3; j++) for (let i = -L + 4; i <= L - 4; i += 2) if (((i + j) & 3) === 0) R.pset(x + i + Math.round(Math.sin(t * 3 + j) * 1), Y + 2 + j, tn(hex('#1e2a44')));
  // los remeros (por detrás de la borda) y sus remos
  const asientos = [], gun = Y - hd;
  for (let k = 0; k < n; k++) { const u = 0.62 - k * (1.36 / Math.max(1, n - 1)), sx = X(u), sy = gun + 1; asientos.push([sx, sy]);
    if (o.carga && k === 0) { for (const dx of [-3, 2]) { R.rect(sx + dx - 2, sy - 6, sx + dx + 2, sy, tn(hex('#8a5a32'))); R.rect(sx + dx - 2, sy - 4, sx + dx + 2, sy - 4, tn(hex('#4a4a52'))); R.pset(sx + dx - 1, sy - 6, tn(hex('#a87040'))); } continue; }
    const tira = Math.sin(fase * Math.PI * 2), inc = Math.round(tira * 1.4) * -d, cx = sx + inc;
    const caza = k % 3 === 2, casaca = tn(hex(caza ? '#6a5a3a' : '#2a3a6a')), casacaL = tn(hex(caza ? '#8a7a52' : '#3e5288')), piel = tn(hex(['#f0c8a0', '#d8a078', '#a87050'][k % 3])), som = k0, pelo = tn(hex(['#5a3418', '#2a1a10', '#8a8a8a'][k % 3]));
    R.rect(cx - 2, sy - 6, cx + 2, sy, casaca); R.rect(cx - 2, sy - 6, cx - 2, sy, casacaL); R.linea(cx - 2, sy - 6, cx + 2, sy - 1, tn(hex('#e8e0cc'))); R.pset(cx, sy - 6, tn(hex('#e8e0cc')));
    R.rect(cx - 1, sy - 9, cx + 1, sy - 7, piel); R.pset(cx + d, sy - 8, som); R.pset(cx - d, sy - 8, pelo); R.pset(cx - d, sy - 7, pelo);
    R.rect(cx - 3, sy - 10, cx + 3, sy - 10, som); R.rect(cx - 1, sy - 11, cx + 1, sy - 11, som); R.pset(cx - 3, sy - 11, som); R.pset(cx + 3, sy - 11, som);
    // el remo: del puño al tolete y a la pala, que entra en el agua, empuja y sale
    const ang = fase < 0.55 ? lerp(-0.7, 0.6, fase / 0.55) : lerp(0.6, -0.7, (fase - 0.55) / 0.45), dentro = fase < 0.55, tx = sx + d * 3, ty = gun;
    const px = Math.round(tx + Math.sin(ang) * 15 * -d), py = dentro ? Y + 3 : Y;
    R.linea(cx + d, sy - 3, tx, ty, tn(hex('#8a6a44'))); R.linea(tx, ty, px, py, tn(hex('#a07a52'))); R.rect(px - 1, py, px + 1, py + (dentro ? 1 : 0), tn(hex('#7a5a3a'))); R.pset(cx + d * 2, sy - 3, piel);
    if (dentro && fase > 0.15) { R.pset(px - d * 2, py, tn(hex('#c8d8e8'))); R.pset(px - d * 3, py + 1, tn(hex('#9ab0c8'))); R.pset(px + d * 2, py + 1, tn(hex('#9ab0c8'))); } }
  // el casco: tablas solapadas, la borda clara, la proa alta, la popa con el patrón y el farol tapado
  R.poligono([[X(-1), gun], [X(1.06), gun - 1], [X(0.9), Y], [X(-0.88), Y + 1]], k0);
  const xs0 = Math.min(X(-1), X(1.06)), xs1 = Math.max(X(-1), X(1.06));
  for (let yy = gun; yy <= Y + 1; yy++) for (let xx = xs0; xx <= xs1; xx++) { if (R.pget(xx, yy) !== k0) continue; const c = yy <= gun ? hex('#b08a5a') : (yy - gun) % 2 === 1 ? hex('#5a3a20') : hex('#6e4a2a'); R.pset(xx, yy, tn(c)); }
  R.linea(X(-1), gun, X(1.06), gun - 1, tn(hex('#d0a870'))); R.linea(X(-1), gun + 1, X(1.06), gun, tn(hex('#7a5a3a'))); R.linea(X(1.06), gun - 1, X(0.9), Y, k0); R.linea(X(-0.88), Y + 1, X(0.9), Y, k0); R.linea(X(-1), gun, X(-0.88), Y + 1, k0);
  for (let u = -0.7; u <= 0.8; u += 0.3) R.pset(X(u), gun, tn(hex('#5a3a20')));
  if (noche > 0) R.linea(X(-0.9), gun, X(0.8), gun - 1, b_mezcla(tn(hex('#b08a5a')), hex('#c8d0e8'), 0.4 * noche));
  { const px = X(-0.9), py = gun + 1; R.rect(px - 2, py - 7, px + 2, py - 1, tn(hex('#5a3a6a'))); R.rect(px - 1, py - 10, px + 1, py - 8, tn(hex('#f0c8a0'))); R.rect(px - 3, py - 11, px + 3, py - 11, k0); R.rect(px - 1, py - 12, px + 1, py - 12, k0); R.linea(px - d * 2, py - 3, px - d * 7, py + 3, tn(hex('#8a6a44'))); }
  { const fx = X(0.96), fy = gun - 2; R.rect(fx - 1, fy - 4, fx + 1, fy, tn(hex('#2a2a2a'))); R.rect(fx - 2, fy - 5, fx + 2, fy - 5, tn(hex('#3a3a3a'))); R.pset(fx, fy - 6, tn(hex('#4a4a4a'))); if (Math.sin(t * 6) > -0.5) R.pset(fx, fy - 2, noche > 0.5 ? hex('#f0b050') : hex('#c89040')); }
  return { x, y: Y, proa: [X(1.06), gun - 1], popa: [X(-1), gun], asientos };
}
// ── D · El puerto y el canal, 1811–1860 ──────────────────────────────────────────────────────────────────────────────
// Cada encuadre pinta los 320×180 en cada fotograma (capas fijas en búferes de R.nuevo() más el cielo, el agua y la vida).
// o.encuadre:
//   'planos': la sala de los comisionados de 1811 (papel pintado, friso, ventana con la ciudad y gato dormido, cuadros,
//     reloj de pie con péndulo, librería, globo, cesto de planos) y la mesa de nogal vista desde arriba con el plano de la
//     isla a tinta: colinas en hachures, arroyos azules, granjas, bosques, caminos viejos torcidos y la ciudad vieja en la
//     punta; candelabros, tintero con pluma, compás, regla y lupa. o.cuadricula (0–1): primero se trazan en rojo las 7
//     avenidas de sur a norte (hasta 0,35) y luego las 31 calles una a una, con la regla y la pluma en la punta del trazo
//     (o.pluma false: sin ellas). o.casas (0–1): las manzanas se llenan de casitas de sur a norte. o.detras(t): se llama
//     antes de pintar la mesa, para poner a quien está detrás de ella (los pies en y 100, x 96–224).
//   'canal': el canal del Erie con colinas de campos a cuadros, granja con granero y silo, vacas, sauces, la casa del
//     esclusero (que va y viene), la esclusa de piedra con sus compuertas y vigas, y dentro un barco de pasajeros que sube
//     con el agua (o.esclusa 0–1 llena la cámara, con remolinos mientras se llena); la barcaza de trigo (o.barcaza 0–1 la
//     lleva de izquierda a derecha; si no, avanza sola) tirada por dos mulas con el muchacho por el camino de sirga;
//     orilla de hierba con aneas, flores, mariposas, senda, mojón y poste indicador.
//   'boda': la bahía el 4 de noviembre de 1825 desde la cubierta del barco del gobernador: la Batería con su gente que
//     agita sombreros, Castle Garden, torres de iglesia, la isla del Gobernador, los altos de Brooklyn; veleros
//     empavesados, el vapor de ruedas con humo, botes de remos, salvas de cañón; la cubierta con borda, palo, cañoncito,
//     cabrestante, cabos, la bandera de popa. o.barril: el barril verde del lago Erie sobre la borda; o.vierte (0–1) lo
//     inclina y el agua cae a la bahía con su salpicadura.
//   'muelles' (por omisión): South Street a lo largo (fuga en 196, 104): veleros amarrados con los bauprés por encima de la
//     calle, mástiles y vergas en fuga, gallardetes; almacenes de ladrillo con contraventanas, puertas de carga, rótulos
//     de barras y vigas de izar; adoquines con rodadas y un charco, barriles, fardos de algodón, cajas y sacos, la grúa que
//     sube un fardo, el carro con su caballo, estibadores que ruedan barriles, paseantes, palomas y gaviotas.
//   'brownstones': cuatro casas de piedra rojiza (cornisa con ménsulas, ventanas con frontón y visillos, puerta en arco con
//     tejadillo, escalinata alta con barandillas de hierro y voluta, sótano con rejas y verja), árboles jóvenes, farolas
//     de gas (o.luz 'tarde': encendidas), palomas, una vecina que sacude un trapo; a la derecha la bocacalle con el tren
//     elevado (o.tren 0–1 lo hace cruzar; si no, pasa cada 14 s); o.coche (0–1, o false) el coche de caballos que pasa
//     por la calzada (si no, pasa de vez en cuando).
//   'parque': Central Park; o.obra 0 = la obra de 1858 (tierra removida en terrazas, hoyo del lago con un charco, cimbra
//     del puente, grúa con una roca, carretillas, cavadores, carro de tierra, voladura lejana, caseta de herramientas,
//     arbolitos con tutor), 1 = el parque terminado (césped, olmos, lago con barcas y cisnes, puente de piedra, camino de
//     grava, banco, farola, flores, paseantes con sombrilla, un coche por el paseo); entre medias brota a manchas.
// Devuelve { suelo, pies: [x0, x1], ... } y los puntos útiles de cada encuadre (ver cada función d_…D).
export function puerto(R, t, o = {}) {
  const e = o.encuadre ?? 'muelles';
  if (e === 'planos') return d_planosD(R, t, o);
  if (e === 'canal' && typeof d_canalD === 'function') return d_canalD(R, t, o);
  if (e === 'boda' && typeof d_bodaD === 'function') return d_bodaD(R, t, o);
  if (e === 'brownstones' && typeof d_brownD === 'function') return d_brownD(R, t, o);
  if (e === 'parque' && typeof d_parqueD === 'function') return d_parqueD(R, t, o);
  if (typeof d_muellesD === 'function') return d_muellesD(R, t, o);
  provisional(R, t, C.bahia, C.brown);
  return { suelo: 150, pies: [40, 260] };
}
// ── E · Los que llegaron, 1840–1898 ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cubierta' (por omisión): la cubierta de un vapor de emigrantes: chimenea con humo, bote salvavidas, palo con la vela
//     aferrada, ventiladores, borda blanca, baúles con etiquetas de colores (las banderas, en barras), maletas, hatillos,
//     un rollo de cabo, la jaula del canario; delante, la bahía con remolcador, ferry y goleta. o.estatua (0–1): la
//     Estatua de la Libertad entra por la derecha hasta su sitio (cobre verde, corona de siete rayos, tabla, antorcha que
//     brilla, pedestal y fuerte en estrella); o.ciudad: la punta de Manhattan de 1890 con la cúpula dorada, la aguja de la
//     Trinidad y el puente de Brooklyn lejano.
//   'ellis': la gran sala de registro: bóveda de azulejos en espiga, ventanal en arco, ventanas altas, la galería con gente
//     asomada, banderas, arañas de globos, bancos, suelo de baldosa roja, luz con motas; filas de gente pequeña con bultos
//     entre barandillas de hierro; la mesa alta del funcionario con el libro de registro. o.detras(t): se llama antes de
//     pintar la mesa (el funcionario, con los pies en y 150 y x 210–240).
//   'puente': el puente de Brooklyn de costado (la torre de granito con sus dos arcos góticos, cables con péndolas, tirantes
//     en abanico, la pasarela con paseantes, la calzada de tablones y la viga de celosía), el río Este con barcos y la orilla
//     de Manhattan; o.inauguracion: banderas en la torre, guirnaldas, gallardetes y la multitud en la pasarela. Por la
//     calzada pasa el carruaje (T.carruaje) con las ruedas en y 148. Con o.ventana: el cuarto de Brooklyn Heights de
//     Washington Roebling (papel pintado, cortinas, mesa de dibujo con planos y lámpara, sillón con manta) con el ventanal
//     por el que se ve el puente lejano y un carruaje diminuto que lo cruza.
// Devuelve { suelo, pies, ... } con los puntos útiles de cada encuadre.
export function llegada(R, t, o = {}) {
  const e = o.encuadre ?? 'cubierta';
  if (e === 'ellis' && typeof d_ellisD === 'function') return d_ellisD(R, t, o);
  if (e === 'puente' && typeof d_puenteD === 'function') return o.ventana ? d_ventanaD(R, t, o) : d_puenteD(R, t, o);
  if (typeof d_cubiertaD === 'function') return d_cubiertaD(R, t, o);
  provisional(R, t, C.cobre, C.caliza);
  return { suelo: 150, pies: [40, 260] };
}
// Un carruaje abierto (una victoria de 1883) de lado, con su caballo al trote: caja de laca con filete, respaldo acolchado,
// capota plegada (o.capota: levantada), pescante, farol, ruedas de radios que giran al avanzar (según x) y varas.
// (x, y): el asiento del pasajero en x y las ruedas en el suelo y. o.dir (1 a la derecha); o.quieto (parado); o.color,
// o.filete, o.caballo colores; o.cochero: un personaje del elenco sentado en el pescante (tapado de cintura para abajo
// por la caja del pescante) con las riendas hasta la boca del caballo; o.gallo: el gallo que Emily llevó
// en el regazo, en el asiento. o.parte: 'detras' (caballo, capota, respaldo, pescante y cochero), 'delante' (el costado
// que tapa las piernas del pasajero, ruedas, farol y gallo) o, si no se da, todo: la escena pinta 'detras', el
// pasajero con R.actor en .asiento y luego 'delante'. Devuelve { asiento, pescante, gallo, ruedas, caballo }.
export function carruaje(R, x, y, t, o = {}) {
  const { rect, pset, linea, disco } = R, d = o.dir ?? 1, X = (i) => Math.round(x + i * d), parte = o.parte ?? 'todo', b = o.quieto ? 0 : (Math.sin(t * 14) > 0.6 ? 1 : 0), yb = y - b;
  const laca = o.color ?? CD.laca, lacaL = d_mezclaD(laca, 0xffffffff, 0.22), filete = o.filete ?? hex('#a8303a');
  const rueda = (cx, cy, r) => { const g = (x / r) * d; for (let a = 0; a < 36; a++) { const an = a / 36 * Math.PI * 2; pset(cx + Math.round(Math.cos(an) * r), cy + Math.round(Math.sin(an) * r), hex('#1a1a20')); pset(cx + Math.round(Math.cos(an) * (r - 1)), cy + Math.round(Math.sin(an) * (r - 1)), CD.ruedaS); }
    for (let k = 0; k < 8; k++) { const an = g + k * Math.PI / 4; linea(cx, cy, cx + Math.round(Math.cos(an) * (r - 1)), cy + Math.round(Math.sin(an) * (r - 1)), CD.rueda); } disco(cx, cy, 1, CD.laton); };
  const asiento = [X(0), yb - 12], pescante = [X(17), yb - 21];
  if (parte !== 'delante') {
    // el caballo que tira, con los tirantes y las varas
    const cab = d_caballoD(R, X(48), y, t, d, { trote: !o.quieto, quieto: !!o.quieto, c: o.caballo ?? CD.caballo });
    linea(X(14), yb - 12, cab.pecho[0], cab.pecho[1] + 2, hex('#5a3e24')); linea(X(14), yb - 13, cab.pecho[0] - d * 2, cab.pecho[1], hex('#7a5634'));
    linea(cab.pecho[0], cab.pecho[1], cab.lomo[0], cab.lomo[1], hex('#2a1a12')); rect(Math.min(cab.lomo[0], cab.lomo[0] + 3 * d), cab.lomo[1] - 1, Math.max(cab.lomo[0], cab.lomo[0] + 3 * d), cab.lomo[1] + 3, hex('#2a1a12'));
    // la capota: plegada en acordeón detrás del asiento, o levantada (o.capota)
    if (o.capota) { for (let j = 0; j < 16; j++) { const w = Math.round(Math.sqrt(1 - (j / 16) ** 2) * 13); for (let i = 0; i <= w; i++) pset(X(-10 + i), yb - 18 - (16 - j) + 1, i === w ? hex('#0e0e12') : (i % 4 === 0 ? hex('#3a3a44') : hex('#22222a'))); } rect(Math.min(X(-11), X(4)), yb - 34, Math.max(X(-11), X(4)), yb - 33, hex('#0e0e12')); }
    else for (let k = 0; k < 4; k++) { rect(Math.min(X(-16 + k), X(-14 + k)), yb - 26 + k * 2, Math.max(X(-16 + k), X(-14 + k)), yb - 18, k % 2 ? hex('#22222a') : hex('#3a3a44')); }
    // el respaldo acolchado del asiento
    rect(Math.min(X(-11), X(-8)), yb - 27, Math.max(X(-11), X(-8)), yb - 17, hex('#5a1e22')); for (let yy = yb - 26; yy < yb - 17; yy += 3) pset(X(-10), yy, hex('#8a3a3a'));
    // el pescante: el cojín de cuero sobre su caja, más alto que el asiento del pasajero
    rect(Math.min(X(17), X(32)), yb - 23, Math.max(X(17), X(32)), yb - 21, hex('#3a2a24')); rect(Math.min(X(17), X(32)), yb - 23, Math.max(X(17), X(32)), yb - 23, hex('#6a4a3a'));
    // el cochero, sentado en el pescante (las piernas quedan dentro de la caja), con las riendas en las manos
    let mano = null;
    if (o.cochero) { const cx = X(26) - 7, my = yb - 25 + (Math.sin(t * 7) > 0.3 && !o.quieto ? 1 : 0);
      mano = R.actor(o.cochero, cx, yb - 17, t, { dir: d, sostiene: [X(35), my] }).mano; }
    // la caja del pescante, que tapa al cochero de cintura para abajo: laca con filete, cantonera de latón y el
    // salpicadero de cuero curvado hacia delante, donde apoya los pies
    for (let i = 16; i <= 33; i++) { const top = yb - 21 + (i > 30 ? i - 30 : 0); for (let yy = top; yy <= yb - 12; yy++) pset(X(i), yy, yy === top ? lacaL : yy === yb - 12 ? hex('#0e0e12') : i === 33 ? d_mezclaD(laca, 0xff000000, 0.35) : laca);
      pset(X(i), yb - 17, i > 17 && i < 32 ? filete : laca); }
    for (let j = 0; j < 7; j++) { pset(X(34 + Math.round(j * 0.45)), yb - 18 - j, hex('#1a1414')); pset(X(33 + Math.round(j * 0.45)), yb - 18 - j, hex('#3a2a24')); }
    pset(X(37), yb - 25, CD.laton); pset(X(16), yb - 21, CD.latonL); pset(X(16), yb - 13, CD.latonS);
    // las riendas: de las manos a la boca del caballo, con su comba; se tensan y aflojan con el trote
    if (mano) { const [ax, ay] = mano, [bx, by] = cab.cabeza, n = 16, sag = 3 + (o.quieto ? 1 : Math.round(Math.sin(t * 7)));
      for (const dy of [0, 1]) { let px = ax, py = ay + dy; for (let i = 1; i <= n; i++) { const f = i / n, x2 = ax + (bx - ax) * f, y2 = ay + dy + (by + 2 - ay) * f + Math.sin(f * Math.PI) * sag; linea(Math.round(px), Math.round(py), Math.round(x2), Math.round(y2), dy ? hex('#2a1a12') : hex('#6a4a2a')); px = x2; py = y2; } } }
  }
  if (parte !== 'detras') {
    // la caja: el costado curvo de laca con su filete, el guardabarros, el estribo, el farol y el salpicadero de delante
    for (let i = -12; i <= 11; i++) { const top = yb - 18 + (i > 6 ? Math.round((i - 6) * 0.8) : 0), bot = yb - 9 + (i < -8 ? -1 : 0); for (let yy = top; yy <= bot; yy++) pset(X(i), yy, yy === top ? lacaL : yy === bot ? hex('#0e0e12') : laca); pset(X(i), top + 3, i > -11 && i < 6 ? filete : laca); }
    for (let i = 12; i <= 18; i++) { rect(X(i), yb - 15, X(i), yb - 12, laca); pset(X(i), yb - 15, lacaL); }   // el pie del pescante
    rect(Math.min(X(-3), X(2)), yb - 8, Math.max(X(-3), X(2)), yb - 7, hex('#2a2a32')); pset(X(-3), yb - 6, hex('#2a2a32'));   // el estribo
    rect(Math.min(X(24), X(26)), yb - 20, Math.max(X(24), X(26)), yb - 16, CD.laton); rect(Math.min(X(24), X(25)), yb - 19, Math.max(X(24), X(25)), yb - 18, hex('#fff0b0')); pset(X(25), yb - 21, hex('#2a2a32')); pset(X(25), yb - 15, hex('#2a2a32'));   // el farol, en el costado de la caja
    rueda(X(-6), y - 8, 8); rueda(X(15), y - 6, 6);
    for (let a = 0; a < 9; a++) { const an = Math.PI + a / 8 * Math.PI; pset(X(-6) + Math.round(Math.cos(an) * 10), y - 8 + Math.round(Math.sin(an) * 10) - 1, laca); }   // el guardabarros
    // el gallo (Emily cruzó el puente con un gallo en el regazo, por la victoria): picotea, mira y sacude la cresta
    if (o.gallo) { const gx = X(7), gy = yb - 18, p = Math.sin(t * 3) > 0.7 ? 1 : 0;
      rect(Math.min(gx - 3 * d, gx + 2 * d), gy - 4, Math.max(gx - 3 * d, gx + 2 * d), gy - 1, hex('#c8783a')); rect(Math.min(gx - 2 * d, gx + 1 * d), gy - 3, Math.max(gx - 2 * d, gx + 1 * d), gy - 3, hex('#e8a050'));
      for (let k = 0; k < 4; k++) pset(gx - (3 + (k > 1 ? 1 : 0)) * d, gy - 5 - k + (k > 2 ? 1 : 0), k % 2 ? hex('#2a6a4a') : hex('#1a3a3a'));
      const hx = gx + 3 * d, hy = gy - 7 + p; rect(Math.min(hx - d, hx), hy, Math.max(hx - d, hx), hy + 3, hex('#e8a050')); pset(hx, hy - 1, hex('#e83030')); pset(hx - d, hy - 1, hex('#e83030')); pset(hx, hy - 2, hex('#e83030')); pset(hx + d, hy + 1, hex('#f0c040')); pset(hx, hy + 1, C.k); pset(hx, hy + 3, hex('#e83030')); }
  }
  return { x, y, asiento, pescante, gallo: [X(7), yb - 22], ruedas: [[X(-6), y - 8], [X(15), y - 6]], caballo: [X(48), y] };
}
// ── F · La feria y la obra, 1854–1916 ────────────────────────────────────────────────────────────────────────────────
// La arquitectura es la protagonista. Pinta los 320×180 en cada fotograma: un cielo vivo (nubes de tres tonos a tres
// velocidades y pájaros), una capa fija (R.nuevo, una vez por encuadre) y la vida encima. o.encuadre:
//   'palacio' (1854): el interior del Palacio de Cristal: la cúpula de costillas de hierro y cristal por la que pasan las
//     nubes, la bóveda de la nave, galerías con barandilla, público pequeño y banderas tricolores que ondean, columnas de
//     hierro fundido, una máquina de vapor con su volante que gira y echa vapor, una estatua ecuestre de mármol, vitrinas,
//     palmeras en tiestos y el suelo de tablas con la alfombra roja. En el centro, la torre del ascensor de Otis: dos postes
//     con cremallera de dientes, la polea arriba, el torno a la derecha y la plataforma con barandilla y el muelle de
//     ballesta del freno. o.plataforma (0–1): la altura de la plataforma (0 en el suelo, 1 arriba); o.cuerda (0: entera;
//     > 0: cortada: el cabo de arriba cuelga y se balancea, el muelle se suelta y los trinquetes muerden los dientes);
//     o.chispas (0–1): chispas en los trinquetes (el instante del frenazo).
//   'obra' (1900): una obra con el esqueleto de acero pintado al minio que crece (o.pisos 0–1, 12 plantas), la grúa de
//     pluma en lo alto que sube una viga, la cuadrilla de remaches (la fragua, el remache al rojo que vuela en arco y el
//     que lo coge con el cubo), chispas de los martillos, obreros pequeños por las vigas, la valla de tablas con carteles
//     sin letras; detrás, el perfil de 1900 en bruma; delante, la calle de adoquines con el tranvía y un carro de caballos,
//     y la acera.
//   'flatiron' (1902): el cruce de Broadway y la Quinta Avenida con el Flatiron en el centro (la proa redonda, las dos
//     fachadas de caliza que se alejan en cuña, el zócalo rústico con toldos, la tienda baja de la punta, la corona con su
//     cornisa), edificios a
//     los lados, el viento que se lleva un sombrero y agita la bandera de al lado, tranvía, coche de caballos y gente; a la izquierda, delante, el
//     escaparate de una ferretería (para la plancha del gag) con cacharros a los lados y el centro de la balda libre.
//   'calle1915': una calle de Downtown con una torre enorme y recta delante del sol; o.ley (0–1): la torre se va estrechando
//     en escalones, el sol asoma y una cuña de luz baja a la calle; la gente pequeña va con abrigo en la sombra y en mangas
//     de camisa en la luz; vapor de la alcantarilla, un limpiacristales en la torre, Ford T y tranvía.
//   'pasteleria': la fachada de una pastelería (ladrillo arriba con jardineras, toldo de rayas, escaparate con la luz
//     cálida, estantes con pan, el pastelero que va y viene) con la tarta de boda de seis pisos en el centro del escaparate
//     y, al otro lado de la calle, el rascacielos en escalones con la misma silueta (y su reflejo tenue en el cristal);
//     palomas en el toldo, coches y gente en la acera de enfrente.
// Devuelve { suelo, pies: [x0, x1], hor, … } con los puntos de cada encuadre (ver la geometría en cada e_*).
export function alturas(R, t, o = {}) {
  const e = o.encuadre ?? 'palacio';
  if (e === 'obra') return e_obra(R, t, o);
  if (e === 'flatiron') return e_flatiron(R, t, o);
  if (e === 'calle1915') return e_calle1915(R, t, o);
  if (e === 'pasteleria') return e_pasteleria(R, t, o);
  return e_palacio(R, t, o);
}
// ── G · La carrera al cielo, 1929–1931 ───────────────────────────────────────────────────────────────────────────────
// El Chrysler (la corona de arcos de acero inoxidable con ventanas triangulares y la aguja) y el Empire State se reconocen
// por su silueta. Pinta los 320×180 en cada fotograma (cielo vivo, una capa fija por encuadre y la vida). o.encuadre:
//   'carrera' (1929, otoño): el perfil de Manhattan al atardecer desde una azotea (depósito de agua, chimenea con humo,
//     ropa tendida, palomas en el pretil); el Chrysler (izquierda, x 110) y el rival de Wall Street (derecha, x 220, con su
//     pirámide de cobre y el farol) crecen a la vez con o.alturas [a, b] (0–1): las últimas plantas en esqueleto con su
//     grúa; con a > 0,85 se monta la corona; o.aguja (0–1) saca la aguja (a la vez, el Chrysler pasa al rival).
//   'cupula': dentro de la corona del Chrysler: los arcos de acero con las ventanas triangulares por las que entra la luz
//     en haces, vigas cruzadas, el andamio de dos pisos con escaleras y, en el hueco del centro, la aguja montada por
//     piezas (o.piezas 0–1: cuántas de las cuatro están puestas; la siguiente cuelga del polipasto); la cuadrilla de
//     remaches (fragua, remaches al rojo, chispas) y obreros pequeños; el suelo de tablas con herramientas y un farol.
//   'aguja': la corona del Chrysler por fuera (siete arcos de acero inoxidable con sus ventanas triangulares, las águilas
//     de las esquinas) y, con o.aguja (0–1), la aguja que sube como un periscopio con un destello; la ciudad muy abajo en
//     bruma; a la derecha, en primer término, la azotea del rival (pretil, mástil con bandera, caja de herramientas,
//     fiambrera) para el obrero del bocadillo.
//   'empire' (1930–1931): el Empire State que crece con o.pisos (0–1): abajo ya revestido (caliza y montantes de metal),
//     arriba el esqueleto con grúas y obreros pequeños sentados en las vigas; el Chrysler al lado, más bajo; un biplano que
//     pasa; delante, una viga enorme (x 0–150, ala de arriba en y 150) para que la escena siente a los obreros; con
//     o.inauguracion (0–1) banderas en el mástil y en los escalones y lluvia de papelitos.
//   'oficinas': una planta vacía del Empire State: ventanales con la ciudad abajo (el Chrysler, el río, nubes que pasan),
//     persianas, columnas, lámparas, mesas tapadas con sábanas y sillas patas arriba, polvo que flota en los haces de luz,
//     telarañas, el reloj que avanza, la fuente de agua que burbujea, el ventilador del techo que gira, una hoja de papel que
//     arrastra la corriente, la única lámpara encendida que parpadea; una sola mesa destapada con máquina de escribir y teléfono.
// Devuelve { suelo, pies, … } con los puntos de cada encuadre (ver la geometría en cada e_*).
export function cielo1930(R, t, o = {}) {
  const e = o.encuadre ?? 'carrera';
  if (e === 'cupula') return e_cupula(R, t, o);
  if (e === 'aguja') return e_aguja(R, t, o);
  if (e === 'empire') return e_empire(R, t, o);
  if (e === 'oficinas') return e_oficinas(R, t, o);
  return e_carrera(R, t, o);
}
// ── H · La ciudad de hoy ─────────────────────────────────────────────────────────────────────────────────────────────
// La ciudad de hoy, al nivel del 11 final: cielos tramados con nubes de tres tonos a varias velocidades, el agua con los
// reflejos de lo que tiene encima, ventanas que se encienden una a una y vida pequeña por todas partes. Sin letras ni marcas.
// o.encuadre:
//   'muelle': el muelle de tablas de Brooklyn frente al bajo Manhattan (el perfil de torres de piedra y de cristal, la torre
//     más alta con su aguja, una pirámide de cobre, la torre gótica, el puente de piedra con sus arcos ojivales y sus
//     cables); el río con un ferry naranja de dos puentes que pasa (o.ferry: su x fija; si no, cruza cada 30 s), un
//     remolcador con su barcaza, un velero, gaviotas y un helicóptero; delante, la barandilla de hierro, los prismáticos de
//     moneda, la papelera, la farola con sus banderolas, el banco y las palomas. Suelo y = 160.
//   'onu': la explanada de las Naciones Unidas a orillas del río Este, vista desde abajo: la torre de cristal alta y estrecha
//     (de arriba abajo, con su canto de mármol, las plantas de máquinas y un limpiacristales que sube y baja; las nubes se
//     reflejan y se mueven en el cristal), el edificio bajo de la asamblea con su tejado cóncavo y su cúpula, el río con
//     barcos a la izquierda y la otra orilla con chimeneas, la fila de mástiles con banderas lisas de colores (franjas,
//     cruces y discos, sin escudos) que ondean, turistas pequeños en la barandilla, la esfera de bronce y el césped.
//     Suelo y = 164.
//   'capas': una calle de hoy con todas las épocas a la vez, de izquierda a derecha: la casa holandesa del tejado en
//     escalera, la casa federal de ladrillo con buhardillas, tres brownstones con su escalinata y el depósito de agua en el
//     tejado, el rascacielos art déco en escalones con su corona y su aguja, y la torre de cristal; en la acera, el carrito
//     de comida con su sombrilla y su vapor, la boca de riego, la boca de metro con sus farolas verdes, el buzón, los
//     árboles; en la calzada, taxis amarillos y la chimenea naranja del vapor de la alcantarilla. o.resalta (0–4): resalta
//     una época (0 holandesa, 1 federal, 2 brownstones, 3 art déco, 4 cristal) y apaga un poco las demás. Suelo y = 152.
//   'puente': el puente colgante sobre el estrecho visto desde la bahía (las dos torres de acero, los cables con sus
//     péndolas, la calzada doble con coches), las dos colinas con casas y árboles, el mar abierto al fondo; un barco
//     portacontenedores grande que entra de frente y crece al acercarse (o.barco 0–1: 0 bajo el puente, 1 cerca; si no se da,
//     entra solo cada 22 s); delante, el paseo de baldosas hexagonales con su barandilla, las rocas con espuma, una caña de
//     pescar apoyada con su cubo. o.fantasma (0–1): la bahía de 1524 superpuesta, como un recuerdo pálido y tramado (las
//     colinas cubiertas de bosque, tres canoas que reman, el bote de Verrazzano y La Dauphine al fondo). Suelo y = 172.
// o.luz ('dia', 'tarde', 'anochecer'): la luz de todo el decorado (en 'tarde' el sol se pone; en 'anochecer', cielo de
//   estrellas y farolas encendidas). o.encender (0–1): cuántas ventanas están encendidas (por defecto 0 de día, 0,25 por la
//   tarde y 0,9 al anochecer); se puede animar con t para que se enciendan una a una. o.fantasma (0–1) también en 'muelle':
//   el bosque y las marismas de 1524 sobre la isla. Pinta los 320×180 en cada fotograma (lo fijo en búferes de R.nuevo()).
// Devuelve { suelo, pies: [x0, x1], hor, ... } con los puntos útiles de cada encuadre (ver «geometria» del encargo).
export function hoy(R, t, o = {}) {
  const luz = o.luz ?? 'dia', en = Math.max(0, Math.min(1, o.encender ?? (luz === 'anochecer' ? 0.9 : luz === 'tarde' ? 0.25 : 0)));
  switch (o.encuadre ?? 'muelle') {
    case 'onu': return f_hoyOnu(R, t, o, luz, en);
    case 'capas': return f_hoyCapasCalle(R, t, o, luz, en);
    case 'puente': return f_hoyPuente(R, t, o, luz, en);
    default: return f_hoyMuelle(R, t, o, luz, en);
  }
}
// ── El mapa de papel ─────────────────────────────────────────────────────────────────────────────────────────────────
// Un mapa antiguo grabado sobre la mesa de madera, como el del 13. El papel: el mar con su aguada verdosa, las líneas de
// agua de buril que siguen la costa y las ondas «~» en mar abierto; la tierra color pergamino con la costa entintada y
// sombreada por dentro, arbolitos de bosque, montes en «^» y matas de marisma; y el papel viejo (tono desigual, fibras,
// cercos de taza, manchas, los dobleces y los bordes oscurecidos), con las chinchetas de latón en las esquinas y la
// mesa de madera alrededor. Cada vista quieta se pinta una vez en un búfer; encima, en cada fotograma, la vida: un rayo de
// sol con motas de polvo que cruza despacio y lo propio de cada vista. Sin letras: los sitios con chinchetas (T.chincheta)
// y pictogramas. o.vista:
//   'atlantico': el Atlántico de Francia (Dieppe) a la costa de América; la ruta de La Dauphine en línea de puntos que
//     avanza con o.u (0–1) por Madeira hasta la bahía, con el barquito que la recorre; con o.china (0–1), una flecha de
//     trazos sale de la bahía hacia el oeste, cruza la tierra y se queda en el aire ante una pagoda y una «?» (la China
//     que no estaba ahí); una serpiente de mar nada en medio del océano y la rosa de los vientos va al sur.
//   'noreste': el mapa del 13 (T.mapa, fa-comun.js) encuadrado en el estado de Nueva York, con el Hudson de la bahía a
//     Albany y, con o.canal (0–1), el canal del Erie que se dibuja de Albany a Buffalo, con sus esclusas; con el canal
//     hecho, barcazas tiradas por mulas que van y vienen y un barco que baja por el Hudson. Encima, los montes grabados en
//     «^» (Adirondacks, Catskills, las tierras altas del Hudson, los Shawangunks y los Taconic) y destellos que bajan por
//     el río. o.zoom y o.centro ([lon, lat]) cambian el encuadre (por defecto, 5,4 y [−76,2, 42,2]).
//   'hudson': la misma vista del noreste, más cerrada sobre el valle del Hudson (zoom 12, centro [−73,95, 41,72]): el río
//     de la bahía a Albany ocupa casi todo el alto del papel (unos 130 px) y se dibuja más ancho, con los bosques del valle
//     grabados en arbolitos; mismas opciones.
//   'bahia': la bahía de Nueva York dibujada a mano como un plano antiguo: Manhattan larga y con colinas, Nueva Jersey, el
//     Bronx, Queens, Brooklyn con su bahía de marismas y Staten Island; el Hudson, el río Este, la bahía de arriba, el
//     estrecho y la de abajo; bosques, colinas, marismas, casas largas lenapes y un barco. o.isla (0–1): la isla se
//     enciende con un contorno de oro que late y aparece una llave de oro al lado (la isla como llave); o.velas (0–1): la
//     bahía se llena de velas británicas (hasta ~150); o.puerto (0–1): un círculo de trazos que late marca el puerto.
//   'distritos': los cinco distritos (Manhattan rosa, el Bronx amarillo, Queens verde, Brooklyn azul y Staten Island
//     naranja) como piezas de puzle de cartón con su canto y su sombra, que llegan desde fuera y encajan con o.u (0–1),
//     con un destello al encajar; sus huecos se ven punteados mientras tanto. Llegan en el orden de la voz (Manhattan,
//     Brooklyn, Queens, el Bronx y Staten Island; o.orden: otra lista de nombres) desde fuera del papel, y cada una se
//     posa en su o.llegadas[i] (valores de u; por defecto 0,1, 0,275, 0,45, 0,625 y 0,8; vuelan 0,22 antes) y destella:
//     se aclara y se abre un anillo de estrellas. Con Manhattan y Brooklyn puestas, el puente de Brooklyn con un carruaje
//     que lo cruza; en el agua, el ferri de Staten Island que va y viene, un velero que entra por el estrecho, un
//     remolcador en el río Este y un vapor que sale a mar abierto.
//   'mundo': el mundo de Natural Earth grabado igual, con Londres y Nueva York unidos por una ruta de puntos y barquitos que
//     cruzan; con o.copias (0–1), torres de cristal (la de la ONU en Nueva York, más grande, y sus copias) que brotan por
//     el mundo una tras otra; con o.globo true, un globo terráqueo grabado en su meridiano de latón, que gira despacio
//     sobre el mapa con su sombra, con Londres y Nueva York marcados y el arco entre los dos. El giro: o.lon0 (longitud
//     central al empezar, por defecto −40) y o.giro (grados por segundo, por defecto 5; 0 lo deja quieto); se frena solo
//     entre −75 y −5 para que Nueva York y Londres no salgan nunca de la cara de delante (o.libre lo deja girar sin freno).
//     Con lo de por defecto, hasta t ≈ 4 s la longitud es exactamente −40 + 5t. P.globo da { lon0, lat0, cx, cy, r }
//     del instante, para poner cosas encima.
// Devuelve la proyección P([lon, lat]) → [x, y] para las chinchetas (en 'bahia' y 'distritos', aproximada) con los sitios
// del plano en P.sitios ([x, y] de cada cosa importante).
export function mapaNY(R, t, o = {}) {
  const vista = ['atlantico', 'noreste', 'bahia', 'distritos', 'mundo'].includes(o.vista) ? o.vista : 'atlantico';
  if (vista === 'noreste' || o.vista === 'hudson') return a_mapaNoreste(R, t, o);
  const V = a_VISTAS[vista], d = a_mapaFijo(R, vista);
  R.copiar(d.buf);
  V.vivo(R, t, d, o);
  a_mapaVida(R, t);
  return d.P;
}
// umbral de Bayer 4×4 (0–1) para tramar entre dos tonos
const a_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_um = (x, y) => (a_BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function a_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// un color más claro (k > 1) o más oscuro (k < 1)
function a_luz(c, k) {
  const f = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
  return (0xff000000 | (f((c >>> 16) & 255) << 16) | (f((c >>> 8) & 255) << 8) | f(c & 255)) >>> 0;
}

// el tinte de cada luz sobre los colores de la tierra: [color, mezcla, brillo]
const a_LUCES = { dia: null, tarde: [hex('#ff9a50'), 0.2, 0.94], anochecer: [hex('#3a2a64'), 0.42, 0.74] };

// devuelve tn(c): el color c con el tinte de la luz (con su caché)
function a_tinte(luz) {
  const L = a_LUCES[luz]; if (!L) return (c) => c;
  const m = new Map();
  return (c) => { let r = m.get(c); if (r === undefined) { r = a_luz(a_mezcla(c, L[0], L[1]), L[2]); m.set(c, r); } return r; };
}

const a_pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));

// los cielos de arriba abajo (del cénit al horizonte), tramados entre bandas
const a_CIELOS = a_pal({
  dia: ['#3a78c4', '#4686ce', '#5694d6', '#68a4de', '#7cb2e4', '#94c2ea', '#b0d2ec', '#cde0ea'],
  tarde: ['#33488c', '#465698', '#6462a2', '#8c6ea2', '#b87c98', '#dc928a', '#f0ac82', '#f8c890'],
  anochecer: ['#121634', '#1a1f48', '#252a5c', '#363470', '#523c7a', '#7a4880', '#a85a7c', '#d07a70'],
});

// las nubes de cada luz: [sombra, cuerpo, luz]
const a_NUBESC = { dia: a_pal({ s: '#a6bcd8', c: '#dce8f4', l: '#ffffff' }), tarde: a_pal({ s: '#8a6492', c: '#dc9c9c', l: '#ffdcb8' }), anochecer: a_pal({ s: '#2e2448', c: '#5e3c66', l: '#b86a72' }) };

// el sol (x, y, radio) de cada luz; al anochecer, la luna
const a_SOL = { dia: [232, 30, 6], tarde: [222, 50, 8], anochecer: null };

// los bosques de primavera (sin tinte): sombra, cuerpo, luz
const a_BOSQ = {
  cerca: a_pal({ s: '#22462c', c: '#336a36', l: '#5a9446' }),
  medio: a_pal({ s: '#2c5634', c: '#42763e', l: '#68a050' }),
  fresco: a_pal({ s: '#4a7a30', c: '#78a844', l: '#aacd68' }),
  pino: a_pal({ s: '#173426', c: '#244a30', l: '#3a663c' }),
  cornejo: a_pal({ s: '#3a6a3a', c: '#5a8a4a', l: '#86ae5a', flor: '#f6f2e4' }),
  ciclamor: a_pal({ s: '#9a5684', c: '#c87aa8', l: '#eab2cc' }),
  roble: a_pal({ s: '#2e5228', c: '#4a7a34', l: '#7aa648' }),
  tronco: a_pal({ s: '#3a2a20', c: '#5a4434', l: '#7e6650' }),
  roca: a_pal({ s: '#5a5450', c: '#7e7670', l: '#a8a098' }),
  rocaP: a_pal({ s: '#383436', c: '#57514f', l: '#7e7670' }),   // la roca rojiza de las Palisades
  arena: a_pal({ s: '#c4ac80', c: '#dcc89a', l: '#efe2bc' }),
  marisma: a_pal({ s: '#6a7a42', c: '#8a9a5a', l: '#b0b878' }),
  barro: a_pal({ s: '#5a4a34', c: '#7a6648', l: '#9a8664' }),
};

// el agua, del horizonte a lo hondo, y sus crestas
const a_AGUA = ['#a8cada', '#80b2c8', '#5e98b6', '#4a84a6', '#3c7294', '#306282', '#265270'].map(hex);

const a_AGUAC = a_pal({ cresta: '#c4e0ea', osc: '#1e4460', espuma: '#f0f6f4', espumaS: '#c4d8dc' });

const a_DATOS = new Map();

// lo fijo de un encuadre y una luz: el cielo (con el sol, los cirros y las estrellas) y la tierra (con transparencia), y
// por columna el eje del reflejo (la base de la tierra que toca el horizonte)
function a_bahiaFija(R, enc, luz) {
  const clave = enc + '|' + luz; let d = a_DATOS.get(clave); if (d) return d;
  const E = a_ENC[enc], tn = a_tinte(luz), hor = E.hor, neblina = a_CIELOS[luz][a_CIELOS[luz].length - 1];
  const P = {}; for (const [k, pal] of Object.entries(a_BOSQ)) P[k] = Object.fromEntries(Object.entries(pal).map(([kk, c]) => [kk, tn(c)]));
  const lejos = (pal, a) => Object.fromEntries(Object.entries(pal).map(([k, c]) => [k, a_mezcla(c, neblina, a)]));
  const W = a_AGUA.map((c, i) => a_mezcla(tn(c), neblina, i === 0 ? 0.45 : 0.08));
  d = { enc, luz, hor, tn, P, lejos, neblina, W, rmax: E.rmax, sol: a_SOL[luz], refl: new Int16Array(320), playa: null, cielo: R.nuevo(), capa: R.nuevo() };
  for (const k in a_AGUAC) d[k] = tn(a_AGUAC[k]);
  let prev = R.usar(d.cielo); a_cieloFijo(R, d); R.usar(prev);
  prev = R.usar(d.capa); E.fijo(R, d); R.usar(prev);
  const L = d.capa;
  for (let x = 0; x < 320; x++) { let y = hor; if (L[y * 320 + x]) { while (y < 179 && L[(y + 1) * 320 + x]) y++; d.refl[x] = y; } else d.refl[x] = hor - 1; }
  a_DATOS.set(clave, d); return d;
}

// la zona de Atom (para dejarla tranquila)
const a_atom = (x, y) => x > 272 && y < 48;

// el cielo fijo: bandas tramadas, cirros, el sol con su halo o, al anochecer, la luna y las estrellas
function a_cieloFijo(R, d) {
  const B = R.buf, P = a_CIELOS[d.luz], n = P.length - 1, hor = d.hor;
  for (let y = 0; y < 180; y++) { const f = Math.min(0.999, y / hor) * n, i = Math.floor(f), p = f - i, a = P[i], b = P[Math.min(n, i + 1)];
    for (let x = 0; x < 320; x++) B[y * 320 + x] = a_um(x, y) < p ? b : a; }
  // los cirros: velos finos y altos, en dos tonos
  const cl = a_NUBESC[d.luz].l;
  for (let k = 0; k < 10; k++) { const x0 = h(k, 1, 821) * 380 - 50, y = Math.round(18 + h(k, 2, 821) * hor * 0.5), w = 26 + h(k, 3, 821) * 54;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), yy = y + Math.round(Math.sin(i * 0.11 + k) * 1.5 - i * 0.04); if (x < 0 || x > 319 || yy < 0 || yy >= hor || a_atom(x, yy) || h(i >> 1, k, 822) < 0.3) continue;
      const e = Math.sin(i / w * Math.PI); B[yy * 320 + x] = a_mezcla(B[yy * 320 + x], cl, e * 0.42); if (e > 0.6 && i % 4 === 1 && yy > 0) B[(yy - 1) * 320 + x] = a_mezcla(B[(yy - 1) * 320 + x], cl, 0.22); } }
  if (d.sol) { const [sx, sy, sr] = d.sol, R2 = sr + 16, tarde = d.luz === 'tarde', halo = tarde ? hex('#ffd890') : hex('#fff4d4');
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = sx - R2; x <= sx + R2; x++) { const q = Math.hypot(x - sx, y - sy); if (q <= sr || q > R2) continue; const k = 1 - (q - sr) / (R2 - sr); if (a_um(x, y) < k * k * 0.9) B[y * 320 + x] = a_mezcla(B[y * 320 + x], halo, 0.5); }
    R.disco(sx, sy, sr + 1, tarde ? hex('#ffb860') : hex('#ffe9a0')); R.disco(sx, sy, sr, tarde ? hex('#ffe0a0') : hex('#fff6d0')); R.disco(sx - 2, sy - 2, 2, hex('#fffef4')); }
  else { // estrellas y la luna creciente
    for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 823) * 320), y = Math.floor(h(k, 2, 823) * hor * 0.6); if (a_atom(x, y) || (x > 18 && x < 172 && y < 16)) continue; B[y * 320 + x] = h(k, 3, 823) < 0.3 ? hex('#fff8e0') : hex('#a8a8d0'); }
    R.disco(206, 30, 6, hex('#fff4d0')); R.disco(209, 28, 6, P[1]); R.pset(201, 30, hex('#fffef0')); }
}

// un disco que, dentro de la zona de Atom, se queda casi transparente (las nubes pasan por detrás sin contraste)
function a_discoSuave(R, cx, cy, r, c) {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
    const dx = x + 0.5 - cx, dy = y + 0.5 - cy; if (dx * dx + dy * dy > r * r || x < 0 || x > 319 || y < 0 || y > 179) continue;
    R.pset(x, y, a_atom(x, y) || (x > 16 && x < 174 && y < 15) ? a_mezcla(R.pget(x, y), c, 0.18) : c);
  }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = { s, c, l }
function a_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) a_discoSuave(R, x, y + 1, r, c.s);
  for (const [x, y, r] of bolas) a_discoSuave(R, x, y, r, c.c);
  for (const [x, y, r] of bolas) a_discoSuave(R, x - 1, y - 2, r * 0.68, c.l);
  const y0 = Math.round(cy + w * 0.08); for (let x = Math.round(cx - w * 0.45); x <= Math.round(cx + w * 0.45); x++) { if (x < 0 || x > 319 || a_atom(x, y0)) continue; R.pset(x, y0, c.s); R.pset(x, y0 + 1, c.s); }
}

// las nubes (tres capas: lejanas, pequeñas y lentas junto al horizonte; medias; cercanas, grandes y rápidas) y las aves
function a_cieloVivo(R, t, d, v) {
  const N = a_NUBESC[d.luz], hor = d.hor, vel = 0.5 + v * 2.4, NL = { s: a_mezcla(N.s, d.neblina, 0.45), c: a_mezcla(N.c, d.neblina, 0.4), l: a_mezcla(N.l, d.neblina, 0.3) };
  const capas = [[5, 10, 0.8, 0.78], [4, 18, 2, 0.52], [3, 30, 4, 0.3]];
  capas.forEach(([n, w0, v0, fy], c) => { for (let k = 0; k < n; k++) {
    const span = 460, w = Math.round(w0 * (0.75 + 0.5 * h(k, c, 831))), x = (((h(k, c, 832) * span - t * v0 * vel) % span) + span) % span - 70, y = Math.round(hor * fy + (h(k, c, 833) - 0.5) * hor * 0.16);
    if (y > hor - 5 || y < 22) continue; a_nube(R, Math.round(x), y, w, k + c * 7, c === 0 ? NL : N); } });
  a_gaviotas(R, t, d, 5, hor * 0.42);
}

// gaviotas que cruzan el cielo batiendo las alas y planeando (n, a la altura y0)
function a_gaviotas(R, t, d, n, y0) {
  const c = d.tn(hex('#f4f2ec')), cs = d.tn(hex('#5a6470'));
  for (let k = 0; k < n; k++) { const v = 6 + h(k, 1, 841) * 6, span = 400, x = Math.round((((h(k, 2, 841) * span + t * v * (k % 2 ? 1 : -1)) % span) + span) % span - 40), y = Math.round(y0 + (h(k, 3, 841) - 0.5) * 30 + Math.sin(t * 0.8 + k) * 3);
    if (a_atom(x, y) || (x > 16 && x < 174 && y < 16) || y >= d.hor - 2) continue;
    const ala = Math.sin(t * 6 + k * 2) > 0 ? -1 : 0, lejos = k > 2;
    if (lejos) { R.pset(x - 1, y + ala, cs); R.pset(x, y, cs); R.pset(x + 1, y + ala, cs); continue; }
    R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x - 1, y + ala, c); R.pset(x - 2, y + ala, cs); R.pset(x + 2, y + ala, c); R.pset(x + 3, y + ala, cs); R.pset(x + 2, y + 1, cs);
  }
}

// la tierra y el agua en un recorrido: la tierra fija se copia encima del cielo; donde no hay tierra por debajo del
// horizonte, el agua: degradado tramado por la profundidad y, cerca de la orilla, el reflejo de la tierra y del cielo que
// ondula y se rompe en franjas
function a_aguaCapa(R, t, d, v) {
  const B = R.buf, L = d.capa, S = d.cielo, W = d.W, hor = d.hor, nW = W.length - 1, rmax = d.rmax, tq = Math.floor(t * 5), k = 0.5 + v * 1.8;
  for (let y = 0; y < 180; y++) {
    const f = y * 320, prof = y < hor ? 0 : Math.pow((y - hor) / (180 - hor), 0.75) * nW, iw = Math.min(nW - 1, Math.floor(prof)), pw = prof - iw;
    for (let x = 0; x < 320; x++) {
      const i = f + x, l = L[i]; if (l) { B[i] = l; continue; } if (y < hor) continue;
      let c = a_um(x, y) < pw ? W[iw + 1] : W[iw];
      const ax = d.refl[x], dist = y - ax;
      if (dist > 0 && dist < rmax) { const q = dist / rmax, wob = Math.round(Math.sin(y * 0.9 + x * 0.05 - t * 2.4) * k * (0.3 + q * 1.4)), sx = x + wob, sy = ax - dist;
        if (sy >= 0 && sx >= 0 && sx < 320 && h(x >> 3, y, tq) > 0.1 + 0.25 * q * (0.4 + v)) { const j = sy * 320 + sx, src = L[j] || S[j]; c = a_mezcla(src, c, 0.32 + q * 0.55); } }
      B[i] = c;
    }
  }
}

// escribe solo en el agua (debajo del horizonte y donde no hay tierra)
const a_psAgua = (R, d) => (x, y, c) => { x |= 0; y |= 0; if (x < 0 || x > 319 || y < d.hor || y > 179 || d.capa[y * 320 + x]) return; R.buf[y * 320 + x] = c; };

// las olas en perspectiva: filas de crestas (claras arriba, el seno oscuro debajo) que avanzan de lado y se mecen, más
// grandes y separadas cuanto más cerca; con viento, borreguillos de espuma. calma (0–1) las aplana
function a_olas(R, t, d, v, ps, calma = 0) {
  const hor = d.hor, W = d.W, filas = 18, al0 = (1 - calma * 0.7);
  for (let r = 0; r < filas; r++) { const f = (r + 1) / filas, y0 = hor + 2 + (178 - hor) * f ** 1.5, paso = 10 + 36 * f, vel = (1.5 + 6 * f) * (0.4 + v);
    for (let k = -1; k < 340 / paso + 1; k++) { const a = h(k, r, 801), b = h(k, r, 802); if (a < 0.42) continue;
      const xx = Math.round(k * paso + (b - 0.5) * paso * 0.8 + ((t * vel + r * 17) % paso)) - paso, w = Math.round((2 + 18 * f) * (0.5 + a * 0.7)), yy = Math.round(y0 + Math.sin(t * 1.3 + k + r) * f * (0.6 + v)), al = Math.max(1, Math.round(f * (1 + v * 2.5) * a * al0));
      for (let i = 0; i < w; i++) { const yc = yy - Math.round(Math.sin(i / w * Math.PI) * al); ps(xx + i, yc, i < w * 0.55 ? (f > 0.45 ? d.cresta : W[1]) : W[f > 0.45 ? 1 : 2]); ps(xx + i, yc + 1, d.osc); if (f > 0.6 && i < w * 0.5) ps(xx + i, yc + 2, W[W.length - 1]); }
      if (f > 0.25 && h(k, r, Math.floor(t * 1.3 + a * 7)) < 0.015 + v * 0.2 * (1 - calma)) { const bx = xx + (w >> 1); for (let i = -2; i <= 2; i++) ps(bx + i, yy - al - 1, d.espuma); ps(bx, yy - al - 2, d.espuma); ps(bx - 1, yy - al, d.espumaS); ps(bx + 2, yy - al, d.espumaS); }
    } }
}

// el camino de brillos del sol (o de la luna) en el agua, que titila
function a_brillos(R, t, d, ps, x0) {
  const s = d.sol, sx = x0 ?? (s ? s[0] : 206), c = d.luz === 'tarde' ? hex('#ffe4a8') : d.luz === 'anochecer' ? hex('#d8c8d8') : hex('#fffbe8');
  for (let y = d.hor + 1; y < 180; y += 2) { const f = (y - d.hor) / (180 - d.hor), w = 2 + f * 13;
    for (let k = 0; k < 1 + f * 3; k++) { if (h(k, y, Math.floor(t * 5)) < 0.5) continue; const x = Math.round(sx + (h(k, y, Math.floor(t * 4) + 9) - 0.5) * 2 * w); ps(x, y, c); if (f > 0.45) ps(x + 1, y, c); } }
}

// la espuma que lame la orilla de la tierra del fondo (en el eje del reflejo)
function a_espumaOrilla(R, t, d, ps, x0 = 0, x1 = 319) {
  for (let x = x0; x <= x1; x++) { const y = d.refl[x]; if (y < d.hor || y > 170) continue; const u = Math.sin(t * 2 + x * 0.33 + h(x >> 2, 0, 851) * 5);
    if (u > -0.1) ps(x, y + 1, d.espuma); if (u > 0.5) ps(x, y + 2, d.espumaS); if (u > 0.85) ps(x, y + 3, d.cresta); }
}

// un perfil suave entre puntos [x, y] (interpolación de coseno); fuera de los extremos, el más cercano
function a_perfil(pts) {
  return (x) => { if (x <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], u = (x - ax) / (bx - ax), e = (1 - Math.cos(u * Math.PI)) / 2; return ay + (by - ay) * e; } return pts[pts.length - 1][1]; };
}

// una copa redonda de tres tonos (sombra abajo a la derecha, cuerpo, luz arriba a la izquierda) con motas de hojas; con
// P.flor, flores (el cornejo)
function a_copa(R, x, y, r, P, sem) {
  x = Math.round(x); y = Math.round(y);
  R.disco(x + 0.6, y + 0.8, r, P.s); R.disco(x, y, r - 0.6, P.c);
  if (r >= 2) R.disco(x - r * 0.3, y - r * 0.35, Math.max(1, r * 0.48), P.l);
  for (let k = 0; k < r * 1.6; k++) { const a = h(k, sem, 811) * 6.28, q = h(k, sem, 812) * r * 0.9; R.pset(Math.round(x + Math.cos(a) * q), Math.round(y + Math.sin(a) * q), h(k, sem, 813) < 0.55 ? P.s : P.l); }
  if (P.flor) for (let k = 0; k < r * 0.7; k++) { const a = h(k, sem, 814) * 6.28, q = h(k, sem, 815) * r * 0.85; R.pset(Math.round(x + Math.cos(a) * q), Math.round(y + Math.sin(a) * q - 0.5), P.flor); }
}

// un pino (pisos de ramas que se ensanchan hacia abajo, con la luz a la izquierda) con la base en (x, yb)
function a_pino(R, x, yb, alto, P) {
  x = Math.round(x); yb = Math.round(yb);
  for (let j = 0; j < alto; j++) { const piso = (j % 4) / 3, w = Math.round(1 + (j / alto) * alto * 0.26 * (0.65 + 0.35 * piso)), y = yb - alto + j;
    R.rect(x - w, y, x - 1, y, piso > 0.6 ? P.l : P.c); R.rect(x, y, x + w, y, P.s); if (piso === 1) { R.pset(x - w - 1, y, P.s); R.pset(x + w + 1, y, P.s); } }
  R.pset(x, yb - alto - 1, P.c);
}

// una colina de bosque entre x0 y x1: el cuerpo con textura de hojas (más oscuro hacia la base) y filas de copas que bajan
// por la ladera (pinos, robles, verde tierno, cornejos en flor y ciclamores), con la orilla de arena y piedras en la base.
// pal: la paleta de la colina ('cerca', o una ya con neblina); o.r el radio de las copas, o.ymin(x) el techo (zona de Atom),
// o.orilla false sin orilla, o.flores (0–1) cuántas flores, o.sem
function a_bosque(R, d, top, base, x0, x1, o = {}) {
  const { P } = d, sem = o.sem ?? 0, ymin = o.ymin ?? (() => 0), pal = o.pal ?? P.cerca, r0 = o.r ?? 4, fl = o.flores ?? 1, neb = o.neblina ?? 0;
  const tono = (p) => (neb ? d.lejos(p, neb) : p);
  const PC = tono(pal), PF = tono(P.fresco), PP = tono(P.pino), PCo = tono(P.cornejo), PCi = tono(P.ciclamor), PR = tono(P.roble);
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const yt = Math.max(ymin(x), Math.round(top(x))), yb = Math.round(base(x));
    for (let y = yt; y <= yb; y++) { const q = (y - yt) / Math.max(1, yb - yt), n = h(x >> 1, y >> 1, sem); R.pset(x, y, n < 0.3 + q * 0.45 ? PC.s : n > 0.92 - q * 0.2 ? PC.l : PC.c); } }
  for (let j = 0; j < 40; j++) { let alguna = false;
    for (let x = x0 + (j % 2) * r0; x <= x1 + r0; x += Math.round(r0 * 1.45)) {
      const xx = Math.round(x + (h(x, j, sem + 40) - 0.5) * r0), yt = top(xx), yb = base(xx), y = Math.round(yt + j * r0 * 1.05 + (h(x, j, sem + 41) - 0.5) * 2);
      if (y > yb - r0 * 0.6) continue; alguna = true;
      const r = Math.max(2, Math.round(r0 * (0.75 + 0.5 * h(x, j, sem + 42)))); if (y - r < ymin(xx)) continue;
      const q = h(x, j, sem + 43);
      if (q < 0.1) a_pino(R, xx, y + r, Math.round(r * 3.2), PP);
      else a_copa(R, xx, y, q < 0.3 * fl + 0.1 && q >= 0.28 * fl + 0.1 ? Math.max(2, r - 1) : r, q < 0.22 * fl + 0.1 ? PF : q < 0.26 * fl + 0.1 ? PCo : q < 0.28 * fl + 0.1 ? PCi : q < 0.6 ? PR : PC, x * 7 + j + sem);
    }
    if (!alguna && j > 2) break; }
  if (o.orilla === false) return;
  const A = tono(P.arena), Rk = tono(P.roca);
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const yb = Math.round(base(x)), alto = 1 + Math.round(h(x >> 3, 1, sem + 50) * 2);
    for (let y = yb - alto; y <= yb; y++) R.pset(x, y, y === yb - alto ? A.l : a_um(x, y) < 0.5 ? A.c : A.s);
    if (h(x, 2, sem + 51) < 0.12) { R.pset(x, yb - 1, Rk.c); R.pset(x + 1, yb - 1, Rk.s); R.pset(x, yb - 2, Rk.l); } }
}

// unas rocas de la orilla (el polígono pts) con grietas, luz arriba, percebes, algas oscuras y la línea mojada abajo
function a_rocas(R, d, pts, Pk) {
  const P = Pk ?? d.P.roca, ys = pts.map(([, y]) => y), y0 = Math.min(...ys), y1 = Math.max(...ys);
  R.poligono(pts, (x, y) => { const n = h(x >> 1, y >> 1, 861), q = (y - y0) / Math.max(1, y1 - y0); return q > 0.75 ? (n < 0.5 ? d.tn(hex('#2e3a30')) : d.tn(hex('#3e4a36'))) : n < 0.25 + q * 0.4 ? P.s : n > 0.8 - q * 0.3 ? P.l : P.c; });
  for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1]; if (by < y1 - 2 || ay < y1 - 2) R.linea(ax, ay, bx, by, P.l); }
  for (let k = 0; k < 14; k++) { const x = Math.round(pts[0][0] + h(k, 1, 862) * (pts[pts.length - 2][0] - pts[0][0])), y = Math.round(y0 + 4 + h(k, 2, 862) * (y1 - y0 - 6)); R.linea(x, y, x + 2, y + 3, P.s); if (k % 3 === 0) { R.pset(x + 3, y, d.tn(hex('#e8e2d4'))); R.pset(x + 4, y + 1, d.tn(hex('#c8c0b0'))); } }
}

// la gente pequeña de fondo (unos 8 px): una figura lenape (piel cobriza, pelo negro, manto de piel de ciervo) que anda,
// se agacha o está de pie; k cambia los colores
function a_figura(R, x, yb, t, k, d, modo = 'pie') {
  const tn = d.tn, piel = tn(hex('#a8683c')), pelo = tn(hex('#1e1614')), ropa = tn([hex('#b8895a'), hex('#9a6a40'), hex('#c89a64')][k % 3]), ropaS = tn(hex('#6a4a2a')), pluma = tn([hex('#d84a3a'), hex('#e8c040'), hex('#f4f0e4')][k % 3]);
  x = Math.round(x); yb = Math.round(yb);
  if (modo === 'agacha') { R.rect(x, yb - 4, x + 2, yb - 1, ropa); R.rect(x - 1, yb - 1, x + 3, yb, ropaS); R.rect(x + 1, yb - 6, x + 2, yb - 5, piel); R.pset(x + 1, yb - 7, pelo); R.pset(x + 2, yb - 7, pelo); R.pset(x + 3, yb - 3, piel); return; }
  const paso = modo === 'anda' ? Math.floor(t * 5 + k) % 2 : 0;
  R.pset(x + paso, yb, ropaS); R.pset(x + 2 - paso, yb, ropaS); R.rect(x, yb - 2, x + 2, yb - 1, piel);
  R.rect(x, yb - 6, x + 2, yb - 3, ropa); R.pset(x + 2, yb - 5, ropaS); R.rect(x, yb - 8, x + 2, yb - 7, piel); R.rect(x, yb - 9, x + 2, yb - 9, pelo); R.pset(x, yb - 8, pelo);
  if (k % 2 === 0) R.pset(x + 1, yb - 10, pluma);
}

// humo que sube en bolitas que crecen, se aclaran y se tuercen con el viento
function a_humo(R, x, y, t, v, d, n = 6) {
  const c = d.tn(hex('#e4e0d8'));
  for (let k = 0; k < n; k++) { const u = (t * 0.3 + k / n) % 1, r = 1 + u * 3.2, xx = x + Math.sin(u * 5 + k) * 1.5 + u * u * (8 + v * 30), yy = y - u * 34, a = 0.55 * (1 - u) + 0.1;
    for (let j = Math.floor(yy - r); j <= yy + r; j++) for (let i = Math.floor(xx - r); i <= xx + r; i++) { if ((i - xx) ** 2 + (j - yy) ** 2 > r * r || i < 0 || i > 319 || j < 0 || j > 179 || a_atom(i, j)) continue; const q = j > yy + r * 0.3 ? a * 0.7 : a; R.pset(i, j, a_mezcla(R.pget(i, j), c, q)); } }
}

// juncos y espadañas que se mecen: n tallos entre x0 y x1 con la base en yb(x), alto máximo al; el viento v los dobla
function a_juncos(R, t, d, x0, x1, yb, al, v, n, sem = 0) {
  const c = d.tn(hex('#6a8a3a')), cl = d.tn(hex('#9ab858')), cs = d.tn(hex('#4a6a2a')), esp = d.tn(hex('#6a3e22')), espL = d.tn(hex('#8a5a32'));
  for (let k = 0; k < n; k++) { const x = Math.round(x0 + h(k, 1, 881 + sem) * (x1 - x0)), b = Math.round(yb(x)), a = Math.round(al * (0.5 + 0.5 * h(k, 2, 881 + sem))), sway = Math.sin(t * (1.6 + v) + x * 0.21) * (0.6 + v * 1.6) + v * 3, col = k % 3 === 0 ? cl : k % 3 === 1 ? c : cs;
    let px = x, py = b; for (let j = 1; j <= a; j++) { const u = j / a, nx = Math.round(x + sway * u * u), ny = b - j; R.pset(nx, ny, col); px = nx; py = ny; }
    if (k % 4 === 0 && a > 8) { R.rect(px - 1 + (sway > 0 ? 0 : 0), py + 2, px, py + 5, esp); R.pset(px - 1, py + 2, espL); R.pset(px, py + 1, col); }
    else if (k % 4 === 1) { R.pset(px + 1, py + 1, col); R.pset(px + 2, py + 3, cs); } }
}

// una garza: 'blanca' (garceta grande) o 'azul' (garza azulada), de pie en el agua somera, que de vez en cuando baja el pico
// a pescar (y saca un pez); (x, yb) los pies
function a_garza(R, x, yb, t, d, tipo = 'blanca', fase = 0) {
  const tn = d.tn, blanca = tipo === 'blanca', c = tn(blanca ? hex('#f6f4ee') : hex('#7a8aa0')), cs = tn(blanca ? hex('#c8ccd0') : hex('#4e5a6e')), pico = tn(hex('#e8b830')), pata = tn(hex('#2a2a2a'));
  x = Math.round(x); yb = Math.round(yb); const ciclo = (t + fase) % 7, pesca = ciclo > 5.2 && ciclo < 6.4, pez = ciclo > 6 && ciclo < 6.4;
  R.linea(x, yb, x, yb - 4, pata); R.linea(x + 2, yb, x + 2, yb - 4, pata);
  R.rect(x - 1, yb - 8, x + 3, yb - 5, c); R.rect(x - 2, yb - 7, x - 1, yb - 5, cs); R.pset(x - 3, yb - 5, cs); R.rect(x, yb - 5, x + 3, yb - 5, cs);
  if (pesca) { R.linea(x + 3, yb - 8, x + 6, yb - 3, c); R.pset(x + 7, yb - 2, pico); R.pset(x + 8, yb - 1, pico); if (pez) { R.pset(x + 8, yb - 2, tn(hex('#c8d0d8'))); R.pset(x + 9, yb - 2, tn(hex('#9aa8b4'))); } }
  else { R.pset(x + 3, yb - 9, c); R.pset(x + 4, yb - 10, c); R.pset(x + 4, yb - 11, c); R.pset(x + 3, yb - 12, c); R.rect(x + 3, yb - 14, x + 5, yb - 13, c); R.pset(x + 4, yb - 14, tn(hex('#1a1a1a')));
    R.pset(x + 6, yb - 13, pico); R.pset(x + 7, yb - 13, pico); if (!blanca) { R.pset(x + 3, yb - 14, tn(hex('#2a2a3a'))); R.pset(x + 2, yb - 13, tn(hex('#2a2a3a'))); } }
  R.pset(x - 1, yb + 1, d.cresta); R.pset(x + 3, yb + 1, d.cresta);
}

// una garza que cruza volando despacio, con el cuello recogido y las patas atrás
function a_garzaVuela(R, t, d, y0, cada = 16, fase = 0) {
  const u = ((t + fase) % cada) / cada, x = Math.round(-20 + u * 360), y = Math.round(y0 + Math.sin(u * 6) * 4), ala = Math.sin(t * 3.4) > 0, c = d.tn(hex('#f2f0ea')), cs = d.tn(hex('#b8bcc4'));
  if (a_atom(x, y)) return;
  R.rect(x - 2, y, x + 2, y + 1, c); R.pset(x + 3, y, c); R.pset(x + 4, y, d.tn(hex('#e8b830'))); R.linea(x - 3, y + 1, x - 6, y + 1, d.tn(hex('#2a2a2a')));
  if (ala) { R.linea(x - 1, y - 1, x - 4, y - 5, c); R.linea(x + 1, y - 1, x - 1, y - 5, cs); } else { R.linea(x - 1, y + 2, x - 4, y + 5, cs); R.linea(x + 1, y + 2, x, y + 5, c); }
}

// cormoranes negros que pasan en fila rozando el agua
function a_cormoranes(R, t, d, y, cada = 13, n = 4) {
  const u = (t % cada) / cada, x0 = 340 - u * 420, c = d.tn(hex('#1e2226')), cs = d.tn(hex('#3a4044'));
  for (let k = 0; k < n; k++) { const x = Math.round(x0 + k * 11), yy = Math.round(y + Math.sin(t * 1.4 + k) * 1.2 + k * 0.5), bate = Math.sin(t * 9 + k * 1.3) > 0;
    R.rect(x, yy, x + 4, yy, c); R.pset(x - 1, yy - 1, c); R.pset(x - 2, yy - 1, cs); R.pset(x + 5, yy, cs);
    if (bate) { R.pset(x + 1, yy - 1, cs); R.pset(x + 2, yy - 2, cs); R.pset(x + 3, yy - 2, c); } else { R.pset(x + 1, yy + 1, cs); R.pset(x + 2, yy + 2, c); } }
}

// árboles de la cresta que se doblan con el viento (por fotograma): lista de [x, y base, radio, tipo]
function a_crestaViva(R, t, d, lista, v) {
  const P = d.P;
  for (const [x, yb, r, tipo, neb] of lista) { const sw = Math.sin(t * (1.4 + v * 1.4) + x * 0.23) * (0.4 + v * 1.4) + v * 2.6, pal = neb ? d.lejos(tipo === 'pino' ? P.pino : P.roble, neb) : tipo === 'pino' ? P.pino : P.roble;
    if (tipo === 'pino') { const al = Math.round(r * 3.4); for (let j = 0; j < al; j++) { const u = 1 - j / al, dx = Math.round(sw * u * u), w = Math.round(1 + (j / al) * r * 0.9 * (0.65 + 0.35 * ((j % 4) / 3))), y = yb - al + j; R.rect(x + dx - w, y, x + dx - 1, y, j % 4 === 3 ? pal.l : pal.c); R.rect(x + dx, y, x + dx + w, y, pal.s); } }
    else { R.linea(x, yb, x + Math.round(sw * 0.4), yb - r, d.P.tronco.s); a_copa(R, x + sw, yb - r - r * 0.6, r, pal, x); a_copa(R, x + sw * 1.3 + r * 0.6, yb - r * 1.8, r * 0.7, pal, x + 1); } }
}

// la espuma que revienta contra una roca cada pocos segundos (en x0–x1, a la altura y)
function a_rompe(R, t, d, v, x0, x1, y) {
  const T = 3.4 - v, u = (t % T) / T;
  if (u < 0.45) { const s = u / 0.45, alto = Math.round(4 + s * (8 + v * 10));
    for (let k = 0; k < 26; k++) { const x = Math.round(x0 + h(k, Math.floor(t / T), 891) * (x1 - x0)), dy = Math.round(alto * (0.4 + 0.6 * h(k, 2, 891)) * Math.sin(s * Math.PI * 0.9)); R.pset(x, y - dy, d.espuma); if (k % 2) R.pset(x + 1, y - dy + 1, d.espumaS); } }
  for (let x = x0; x <= x1; x++) if (h(x, Math.floor(t * 4), 892) < 0.6) { R.pset(x, y + 1, d.espuma); if (h(x, 3, 892) < 0.4) R.pset(x, y + 2, d.espumaS); }
}

// el sitio (geometría) y lo propio de cada encuadre
const a_ENC = {
  // ── el estrecho, desde el mar ──
  estrecho: {
    hor: 82, rmax: 34,
    geo: { suelo: 132, pies: [40, 250], agua: [0, 83, 319, 179], barco: [70, 128], estrecho: [168, 84], bote: [[240, 172], [168, 92]], roca: [262, 152, 319, 179], colinaIzq: [0, 34, 158, 104], colinaDer: [160, 48, 319, 100] },
    fijo(R, d) {
      const { P, hor } = d;
      a_bosque(R, d, a_perfil([[86, 76], [108, 72], [130, 74], [152, 69], [176, 72], [200, 68], [226, 71], [254, 69], [276, 74]]), () => hor - 1, 86, 276, { pal: P.medio, neblina: 0.72, r: 2, sem: 1, orilla: false, flores: 0 });
      a_bosque(R, d, a_perfil([[116, 79], [134, 76], [150, 77], [170, 74], [192, 76], [214, 78]]), () => hor - 1, 116, 214, { pal: P.medio, neblina: 0.5, r: 2, sem: 2, flores: 0.4 });
      a_bosque(R, d, a_perfil([[-4, 38], [22, 33], [46, 36], [72, 44], [100, 56], [126, 68], [146, 78], [160, 83]]), (x) => hor + (160 - x) / 160 * 22, -4, 160, { sem: 3, r: 4 });
      a_bosque(R, d, a_perfil([[158, 83], [176, 76], [196, 66], [222, 58], [250, 53], [276, 51], [300, 50], [324, 49]]), (x) => hor + Math.max(0, x - 158) / 162 * 16, 158, 319, { sem: 4, r: 4, ymin: (x) => (x > 266 ? 48 : 0) });
      a_rocas(R, d, [[258, 180], [264, 166], [276, 158], [290, 153], [304, 155], [319, 150], [319, 180]]);
      a_rocas(R, d, [[244, 180], [248, 172], [256, 170], [262, 176], [262, 180]]);
    },
    vivo(R, t, d, v) {
      const ps = a_psAgua(R, d);
      a_olas(R, t, d, v, ps); a_brillos(R, t, d, ps); a_espumaOrilla(R, t, d, ps);
      a_crestaViva(R, t, d, [[8, 40, 4, 'pino'], [30, 36, 5, 'roble'], [52, 40, 4, 'pino'], [96, 58, 4, 'roble'], [118, 67, 3, 'pino'], [206, 64, 4, 'roble'], [232, 58, 3, 'pino'], [258, 56, 4, 'roble']], v);
      a_cormoranes(R, t, d, 98, 14);
      a_rompe(R, t, d, v, 262, 318, 156); a_rompe(R, t + 1.7, d, v, 246, 262, 172);
      // las gaviotas posadas en la roca, que miran y a veces abren las alas
      for (const [x, y, k] of [[284, 155, 0], [300, 153, 1]]) { const c = d.tn(hex('#f4f2ec')), cs = d.tn(hex('#6a7480')), abre = Math.sin(t * 0.9 + k * 3) > 0.85; R.rect(x, y - 3, x + 3, y - 1, c); R.rect(x + 1, y - 2, x + 3, y - 2, cs); R.pset(x + (k ? -1 : 4), y - 4, c); R.pset(x + (k ? -2 : 5), y - 4, d.tn(hex('#e8b830'))); R.pset(x + 1, y, d.tn(hex('#e8a040'))); R.pset(x + 2, y, d.tn(hex('#e8a040'))); if (abre) { R.linea(x, y - 3, x - 3, y - 6, cs); R.linea(x + 3, y - 3, x + 6, y - 6, cs); } }
      a_garzaVuela(R, t, d, 70, 19, 6);
    },
  },
  // ── dentro de la bahía ──
  bahia: {
    hor: 76, rmax: 40,
    geo: { suelo: 166, pies: [16, 140], agua: [120, 96, 319, 179], canoas: [130, 104, 300, 172], poblado: [40, 98, 110, 104], humo: [[64, 92], [94, 90]], marisma: [104, 98, 186, 116], garzas: [[134, 110], [160, 106]], manhattan: [150, 58, 319, 76], playa: [0, 140, 200, 179] },
    fijo(R, d) {
      const { P, hor, tn } = d;
      a_bosque(R, d, a_perfil([[100, 72], [130, 70], [150, 72]]), () => hor - 1, 100, 150, { pal: P.medio, neblina: 0.7, r: 2, sem: 11, orilla: false, flores: 0 });
      // Manhattan: la isla de muchas colinas, larga, al fondo a la derecha
      a_bosque(R, d, a_perfil([[146, 75], [160, 68], [176, 70], [192, 63], [210, 66], [228, 60], [246, 64], [262, 59], [282, 62], [300, 58], [324, 61]]), () => hor - 1, 146, 319, { pal: P.medio, neblina: 0.45, r: 2, sem: 12, flores: 0.6 });
      // el cabo de bosque de la izquierda, con el claro del poblado
      const top = a_perfil([[-4, 52], [24, 50], [50, 56], [80, 62], [104, 72], [122, 84], [130, 92]]), base = (x) => 112 - x * 0.14;
      a_bosque(R, d, top, base, -4, 130, { sem: 13, r: 5 });
      // el claro: tierra pisada y hierba
      R.poligono([[30, 106], [44, 94], [104, 92], [116, 100], [110, 107]], (x, y) => h(x >> 1, y, 901) < 0.3 ? P.barro.c : h(x, y, 902) < 0.5 ? P.marisma.c : P.marisma.l);
      a_casaLarga(R, d, 40, 102, 34); a_casaLarga(R, d, 84, 99, 24);
      // el fuego del poblado: el cerco de piedras
      for (let i = -2; i <= 2; i++) R.pset(70 + i * 2, 104, P.roca.c);
      // canoas varadas en la orilla del poblado
      a_canoaVarada(R, d, 104, 107, 1); a_canoaVarada(R, d, 118, 104, -1);
      // la marisma en la punta del cabo: islas de hierba con canales
      R.poligono([[96, 110], [120, 104], [150, 102], [186, 106], [176, 112], [140, 114], [110, 116]], (x, y) => { const n = h(x >> 1, y, 903); return (y + (x >> 3)) % 4 === 0 ? P.marisma.s : n < 0.3 ? P.marisma.s : n > 0.75 ? P.marisma.l : P.marisma.c; });
      for (let k = 0; k < 7; k++) { const x = 110 + k * 10, y = 108 + (k % 3); R.linea(x, y, x + 6, y - 1, d.W[2]); }
      // la playa de delante, con conchas, guijarros y el tronco varado
      const playa = a_perfil([[-4, 140], [40, 144], [90, 150], [140, 158], [180, 168], [210, 182]]);
      d.playa = new Int16Array(320).fill(999);
      for (let x = 0; x < 214; x++) { const yt = Math.round(playa(x)); d.playa[x] = yt; for (let y = yt; y < 180; y++) { const q = (y - yt), n = h(x >> 1, y, 904); R.pset(x, y, q < 2 ? P.arena.s : q < 4 ? (a_um(x, y) < 0.5 ? P.arena.s : P.arena.c) : n < 0.12 ? P.arena.s : n > 0.9 ? P.arena.l : P.arena.c); } }
      for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 905) * 190), y = Math.round(playa(x) + 6 + h(k, 2, 905) * 30); if (y > 178) continue; R.pset(x, y, k % 3 ? P.roca.c : tn(hex('#f4ece0'))); if (k % 3 === 0) R.pset(x + 1, y, tn(hex('#d8a8a0'))); }
      a_troncoVarado(R, d, 30, 164, 40);
      for (let k = 0; k < 12; k++) { const x = 4 + k * 3 + Math.round(h(k, 1, 906) * 3); R.linea(x, 146 + (k % 4), x + 1, 150 + (k % 4), P.marisma.s); }
    },
    vivo(R, t, d, v) {
      const ps = a_psAgua(R, d), vv = v * 0.6;
      a_olas(R, t, d, vv, ps, 0.6); a_brillos(R, t, d, ps); a_espumaOrilla(R, t, d, ps, 96, 319);
      // la ola que sube y baja por la playa
      const fase = (t / 5.6) % 1, sube = fase < 0.45 ? fase / 0.45 : 1 - (fase - 0.45) / 0.55;
      for (let x = 0; x < 214; x++) { const y0 = d.playa[x], e = y0 + Math.round(sube * 3 + Math.sin(x * 0.11 + t) * 0.8); for (let y = y0; y < e; y++) R.pset(x, y, y === e - 1 ? d.espuma : a_mezcla(d.W[1], d.P.arena.c, 0.4)); R.pset(x, y0 - 1, (x + Math.floor(t * 3)) % 5 ? d.espumaS : d.espuma); }
      a_humo(R, 70, 100, t, v, d, 7); a_humo(R, 50, 88, t + 1.7, v, d, 5); a_humo(R, 92, 92, t + 0.9, v, d, 5);
      // el fuego
      const fl = Math.floor(t * 9) % 3; R.pset(70, 103, d.tn(hex('#f8c040'))); R.pset(69 + fl % 2, 102, d.tn(hex('#f07a30'))); R.pset(71, 102 - (fl === 2 ? 1 : 0), d.tn(hex('#f8e080')));
      // la gente del poblado: una mujer junto al fuego, uno que anda, otro que sube una canoa
      a_figura(R, 74, 104, t, 1, d, 'agacha');
      const ax = 40 + ((t * 5) % 60); a_figura(R, ax < 70 ? ax : 130 - ax, 103, t, 0, d, 'anda');
      a_figura(R, 112, 106, t, 2, d, Math.sin(t * 1.3) > 0 ? 'agacha' : 'pie');
      a_garza(R, 134, 110, t, d, 'blanca'); a_garza(R, 160, 106, t, d, 'azul', 3); a_garza(R, 176, 109, t, d, 'blanca', 5.1);
      a_juncos(R, t, d, 96, 186, (x) => 108 + Math.sin(x * 0.2) * 2, 7, v, 34, 1);
      a_garzaVuela(R, t, d, 54, 21);
      a_cormoranes(R, t + 5, d, 86, 15, 3);
      // un pez que salta en el centro y su anillo
      const pf = (t % 6.5); if (pf < 1.2) { const xx = 232, yy = 130; if (pf < 0.4) { R.pset(xx + Math.round(pf * 10), yy - Math.round(Math.sin(pf / 0.4 * Math.PI) * 4), d.tn(hex('#c8d0d8'))); } const r = 1 + pf * 6; for (let a = 0; a < 6.28; a += 0.35) ps(xx + 2 + Math.cos(a) * r, yy + Math.sin(a) * r * 0.35, d.cresta); }
      // espadañas de delante a la derecha
      a_juncos(R, t, d, 284, 319, () => 180, 34, v, 22, 2);
    },
  },
  // ── el gran río ──
  rio: {
    hor: 72, rmax: 46,
    geo: { suelo: 128, pies: [110, 230], agua: [80, 73, 300, 179], barco: [160, 126], acantilado: [0, 26, 112, 112], otraOrilla: [214, 50, 319, 106], cascada: [44, 40, 46, 98] },
    fijo(R, d) {
      const { P, hor, tn } = d;
      // las Highlands, azules al fondo
      a_bosque(R, d, a_perfil([[80, 60], [104, 50], [126, 56], [150, 46], [172, 54], [196, 48], [222, 56], [246, 60]]), () => hor - 1, 80, 246, { pal: P.medio, neblina: 0.78, r: 2, sem: 21, orilla: false, flores: 0 });
      a_bosque(R, d, a_perfil([[96, 68], [120, 64], [150, 66], [176, 62], [204, 66], [224, 70]]), () => hor - 1, 96, 224, { pal: P.medio, neblina: 0.55, r: 2, sem: 22, flores: 0.3 });
      // la otra orilla, a la derecha
      a_bosque(R, d, a_perfil([[206, 72], [222, 64], [246, 58], [270, 54], [296, 52], [324, 50]]), (x) => hor + Math.max(0, x - 206) / 114 * 32, 206, 319, { sem: 23, r: 4, ymin: (x) => (x > 266 ? 48 : 0) });
      // las Palisades: la roca en columnas, con el bosque encima, el talud y su orilla
      const cima = a_perfil([[-4, 30], [40, 32], [80, 40], [104, 50], [116, 58]]), pie = (x) => 96 - x * 0.2, orilla = (x) => 114 - x * 0.32;
      for (let x = 0; x <= 116; x++) { const yt = Math.round(cima(x)) + 4, yb = Math.round(pie(x)); const col = Math.floor((x + Math.round(h(x >> 3, 1, 911) * 2)) / 5), cx = (x + 1) % 5;
        for (let y = yt; y <= yb; y++) { const n = h(col, y >> 2, 912), junta = cx === 0 || (y + col * 3) % 17 === 0, luz = cx === 1 || cx === 2;
          R.pset(x, y, junta ? P.rocaP.s : n < 0.2 ? P.rocaP.s : luz ? (n > 0.6 ? P.rocaP.l : P.rocaP.c) : (n > 0.85 ? P.rocaP.c : a_mezcla(P.rocaP.c, P.rocaP.s, 0.5))); }
        if (h(x, 3, 913) < 0.07) for (let y = yt + 6; y < yb; y += 9 + Math.floor(h(x, y, 914) * 8)) a_copa(R, x, y, 2, P.fresco, x + y); }
      a_bosque(R, d, (x) => cima(x) - 4, (x) => cima(x) + 5, -4, 116, { sem: 24, r: 4, orilla: false });
      a_bosque(R, d, (x) => pie(x) - 2, orilla, -4, 124, { sem: 25, r: 4, flores: 1.4 });
      // delante a la izquierda: rocas grandes de la orilla
      a_rocas(R, d, [[0, 180], [0, 156], [12, 150], [30, 152], [46, 160], [58, 170], [64, 180]]);
    },
    vivo(R, t, d, v) {
      const ps = a_psAgua(R, d);
      a_olas(R, t, d, v * 0.7, ps, 0.5); a_brillos(R, t, d, ps); a_espumaOrilla(R, t, d, ps);
      // las vetas de la corriente, que bajan hacia nosotros y se abren en perspectiva
      for (let k = 0; k < 24; k++) { const u = ((t * 0.07 + h(k, 1, 921)) % 1), s = h(k, 2, 921) * 2 - 1, y = Math.round(d.hor + 2 + (178 - d.hor) * u ** 1.7), x = Math.round(166 + s * (24 + 150 * u)), l = Math.round(1 + u * 9);
        for (let i = 0; i < l; i++) ps(x + Math.round(s * i * 0.4), y + Math.round(i * 0.5), i < l / 3 ? d.cresta : d.W[1]); }
      // el hilo de la cascada que baja por la roca y su espuma
      for (let y = 40; y < 96; y++) { const on = (y + Math.floor(t * 14)) % 5; R.pset(44 + (y > 70 ? 1 : 0), y, on ? d.tn(hex('#e8f2f4')) : d.tn(hex('#a8c8d4'))); if (on === 2) R.pset(45 + (y > 70 ? 1 : 0), y, d.tn(hex('#c8dce4'))); }
      for (let k = 0; k < 5; k++) { const a = t * 3 + k * 1.3, r = (a % 1) * 4; R.pset(Math.round(45 + Math.cos(k * 2) * r), Math.round(97 - (a % 1) * 2), d.espuma); }
      a_crestaViva(R, t, d, [[10, 30, 4, 'pino'], [36, 30, 4, 'roble'], [66, 36, 3, 'pino'], [90, 44, 3, 'roble'], [236, 62, 4, 'roble'], [262, 56, 3, 'pino']], v);
      // el águila que planea en círculos
      { const a = t * 0.5, x = Math.round(178 + Math.cos(a) * 34), y = Math.round(34 + Math.sin(a) * 9), c = d.tn(hex('#3a2a1e')), w = d.tn(hex('#f4f0e4')); R.rect(x - 6, y, x + 6, y, c); R.pset(x - 7, y - 1, c); R.pset(x + 7, y - 1, c); R.rect(x - 1, y - 1, x + 1, y + 1, c); R.pset(x + (Math.cos(a) > 0 ? -2 : 2), y, w); R.pset(x, y + 2, w); }
      // patos en el agua, cerca de la otra orilla
      for (let k = 0; k < 3; k++) { const x = Math.round(240 + k * 7 - (t * 2) % 40), y = 112 + k; const c = d.tn(hex('#5a4a3a')), g = d.tn(hex('#2a6a3a')); R.rect(x, y - 1, x + 3, y, c); R.pset(x, y - 2, g); R.pset(x - 1, y - 2, d.tn(hex('#e8b830'))); ps(x + 4, y + 1, d.cresta); ps(x + 6, y + 1, d.cresta); }
      a_gaviotas(R, t + 3, d, 3, 96);
      a_juncos(R, t, d, 30, 80, () => 180, 18, v, 16, 3);
    },
  },
  // ── la orilla de Manhattan, 1613 ──
  orilla: {
    hor: 96, rmax: 18,
    geo: { suelo: 160, pies: [120, 270], agua: [150, 97, 319, 132], cabana: [30, 118, 102, 146], puerta: [52, 128, 62, 146], fardos: [104, 136, 128, 150], tocon: [252, 166], fuego: [136, 150], barcoLejos: [250, 96] },
    fijo(R, d) {
      const { P, hor, tn } = d;
      // la otra orilla, azul y baja
      a_bosque(R, d, a_perfil([[140, 90], [170, 86], [200, 88], [232, 84], [262, 86], [292, 83], [324, 86]]), () => hor - 1, 140, 319, { pal: P.medio, neblina: 0.6, r: 2, sem: 31, orilla: false, flores: 0.3 });
      // el suelo: hierba y tierra a la izquierda, la playa a la derecha, y el agua del río en medio
      const orillaY = a_perfil([[150, 120], [190, 128], [240, 132], [290, 130], [324, 134]]);
      for (let x = 0; x < 320; x++) { const yt = x < 150 ? 108 : Math.round(orillaY(x)); for (let y = yt; y < 180; y++) { const n = h(x >> 1, y, 931), q = (x - 120) / 60;
        const arena = n < q + (y - 140) * 0.01; R.pset(x, y, arena ? (n < 0.1 ? P.arena.s : n > 0.92 ? P.arena.l : (y - yt < 2 && x >= 150 ? P.arena.s : P.arena.c)) : (n < 0.2 ? P.barro.s : n < 0.5 ? P.marisma.s : n < 0.8 ? P.marisma.c : P.marisma.l)); } }
      // la penumbra del bosque: troncos lejanos, matas y la luz que se cuela
      const sombra = tn(hex('#1e3222')), sombraL = tn(hex('#2c4a2e'));
      R.poligono([[-2, 40], [150, 46], [160, 112], [-2, 112]], (x, y) => { const n = h(x >> 1, y >> 2, 935); return (x % 9 === 3 && n < 0.7) ? tn(hex('#3a3026')) : n < 0.35 ? sombra : n > 0.93 ? tn(hex('#5a7a3a')) : sombraL; });
      for (let k = 0; k < 9; k++) { const x = 8 + k * 17 + Math.round(h(k, 1, 936) * 6); R.rect(x, 56, x + 1 + (k % 2), 110, tn(hex('#3e3428'))); R.pset(x, 70 + k * 3, tn(hex('#5a4a38'))); }
      // los árboles grandes: copas en racimos con huecos de cielo, ramas y troncos con corteza
      const arboles = [[14, 18, 34, 6], [64, 28, 30, 7], [112, 34, 26, 5], [146, 58, 16, 4]];
      for (const [x, yc, r, w] of arboles) a_troncoPie(R, d, x, yc + r - 4, 110, w);
      for (const [x, yc, r, w] of arboles) { // ramas que salen del tronco hacia los racimos
        for (const s2 of [-1, 1]) { R.linea(x, yc + r, x + s2 * r * 0.6, yc + r * 0.35, P.tronco.s); R.linea(x + s2, yc + r, x + s2 * (r * 0.6 + 1), yc + r * 0.35, P.tronco.c); } }
      for (const [x, yc, r, w] of arboles) { const n = 9 + Math.round(r / 4);
        for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2 + h(k, x, 937), q = r * (0.25 + 0.55 * h(k, x, 938)), cx = x + Math.cos(a) * q * 1.15, cy = Math.max(20 + r * 0.25, yc + r * 0.25 + Math.sin(a) * q * 0.7), rr = r * (0.3 + 0.18 * h(k, x, 939));
          a_copa(R, cx, cy, rr, k % 5 === 0 ? P.fresco : k % 3 === 0 ? P.cerca : P.roble, x + k); } }
      // la cabaña de troncos a medio hacer
      a_cabana(R, d, 30, 146);
      // los fardos de pieles de castor
      for (const [x, y] of [[104, 150], [116, 150], [110, 143]]) a_fardo(R, d, x, y);
      // troncos y piedras en la playa
      a_troncoVarado(R, d, 196, 170, 46); a_troncoVarado(R, d, 152, 127, 24);
      for (let k = 0; k < 18; k++) { const x = 150 + Math.floor(h(k, 1, 932) * 168), y = 136 + Math.floor(h(k, 2, 932) * 42); R.disco(x, y, 1 + (k % 2), P.roca.c); R.pset(x - 1, y - 1, P.roca.l); R.pset(x + 1, y + 1, P.roca.s); }
      // helechos y matas al pie del bosque
      for (let k = 0; k < 26; k++) { const x = Math.floor(h(k, 1, 933) * 156), y = 108 + Math.floor(h(k, 2, 933) * 8); if (k % 2) a_helecho(R, d, x, y + 2, 5 + (k % 3)); else a_copa(R, x, y, 3, k % 3 ? P.fresco : P.cerca, k); }
      // el fuego de Rodríguez: piedras y leña
      for (let i = -2; i <= 2; i++) R.pset(136 + i * 2, 152, P.roca.c); R.linea(132, 151, 140, 149, P.tronco.c);
    },
    vivo(R, t, d, v, o) {
      const ps = a_psAgua(R, d);
      a_olas(R, t, d, v * 0.6, ps, 0.6); a_brillos(R, t, d, ps); a_espumaOrilla(R, t, d, ps, 140, 319);
      // el agua que lame la playa
      for (let x = 150; x < 320; x++) { let y = 120; while (y < 179 && !d.capa[y * 320 + x]) y++; if (y < d.hor) continue; const u = Math.sin(t * 1.4 + x * 0.12); if (u > -0.3) ps(x, y - 1, d.espuma); if (u > 0.4) R.pset(x, y, a_mezcla(d.espumaS, d.P.arena.c, 0.5)); }
      // el castor que cruza nadando, con su estela en V
      { const x = Math.round(330 - ((t * 7) % 200)), y = 112, c = d.tn(hex('#5a3a22')); R.rect(x, y - 1, x + 3, y, c); R.pset(x - 1, y - 1, d.tn(hex('#3a2414'))); for (let i = 1; i < 10; i++) { ps(x + 3 + i, y + Math.round(i * 0.4), d.cresta); ps(x + 3 + i, y - Math.round(i * 0.25), d.cresta); } }
      a_humo(R, 136, 146, t, v, d, 6);
      const fl = Math.floor(t * 9) % 3; R.pset(136, 150, d.tn(hex('#f8c040'))); R.pset(135 + fl % 2, 149, d.tn(hex('#f07a30'))); R.pset(137, 148 + (fl === 2 ? 1 : 0), d.tn(hex('#f8e080'))); R.pset(136, 148, d.tn(hex('#f8a040'))); R.pset(135, 151, d.tn(hex('#f8a040')));
      if (o.hacha !== false) a_tocon(R, d, 252, 166, true); else a_tocon(R, d, 252, 166, false);
      // las hojas de la linde que se mecen y las motas de polen al sol
      a_crestaViva(R, t, d, [[156, 74, 4, 'roble'], [128, 46, 5, 'roble'], [40, 22, 5, 'roble']], v);
      for (let k = 0; k < 10; k++) { const x = Math.round((h(k, 1, 934) * 150 + t * (3 + k % 3)) % 170), y = Math.round(70 + h(k, 2, 934) * 60 + Math.sin(t + k) * 4); R.pset(x, y, d.tn(hex('#f8f0c0'))); }
      // un cardenal rojo que salta sobre el tronco
      { const s = Math.floor(t * 1.6) % 4, x = 206 + s * 4, y = 162 - (Math.sin(t * 1.6 * Math.PI) > 0.7 ? 2 : 0), c = d.tn(hex('#d8302a')); R.rect(x, y - 2, x + 2, y, c); R.pset(x + 1, y - 3, c); R.pset(x + 3, y - 2, d.tn(hex('#e8a040'))); R.pset(x - 1, y - 1, d.tn(hex('#a82020'))); }
      a_gaviotas(R, t, d, 3, 72);
      a_garzaVuela(R, t, d, 80, 18, 4);
    },
  },
};

// una casa larga lenape de corteza: el tejado en bóveda con tiras de corteza, los postes, la puerta del extremo y el
// agujero del humo; (x, base) la esquina de abajo a la izquierda, w de largo
function a_casaLarga(R, d, x, base, w) {
  const tn = d.tn, c = tn(hex('#8a6a4a')), cs = tn(hex('#5a4430')), cl = tn(hex('#b8946a')), cll = tn(hex('#d0b088')), k = tn(hex('#2a1e16')), piel = tn(hex('#c89a64')), al = 11;
  for (let i = 0; i <= w; i++) { const e = Math.min(i, w - i), rnd = e < 4 ? [5, 3, 1, 0][e] : 0, yt = base - al + rnd;
    for (let y = yt; y <= base; y++) { const fila = Math.floor((y - yt + (Math.floor(i / 5) % 2) * 2) / 3), junta = (y - yt + (Math.floor(i / 5) % 2) * 2) % 3 === 2, poste = i % 5 === 0 && y > yt + 2, q = (y - yt) / (base - yt);
      R.pset(x + i, y, y === yt ? cll : junta || poste ? cs : q < 0.3 ? (h(i, fila, 941) < 0.3 ? cll : cl) : q > 0.75 ? cs : h(i, fila, 942) < 0.25 ? cl : c); }
    R.pset(x + i, base + 1, tn(hex('#3a3020'))); }
  // la puerta del extremo con su cortina de piel, y el agujero del humo
  R.rect(x + w - 6, base - 6, x + w - 2, base, k); R.rect(x + w - 6, base - 6, x + w - 4, base - 1, piel); R.pset(x + w - 4, base - 2, cs);
  R.rect(x + Math.round(w / 2) - 1, base - al - 1, x + Math.round(w / 2) + 1, base - al + 1, k);
  // las cuerdas que atan la corteza
  for (let i = 3; i < w - 2; i += 7) R.linea(x + i, base - al + 1, x + i + 1, base - 1, tn(hex('#d8c098')));
}

// una canoa de tronco varada en la orilla (vista de lado, pequeña)
function a_canoaVarada(R, d, x, y, dir) {
  const c = d.tn(hex('#5a3a22')), cl = d.tn(hex('#8a6038')), k = d.tn(hex('#2a1a10'));
  R.rect(x - 6, y - 1, x + 6, y, c); R.rect(x - 5, y - 2, x + 5, y - 2, cl); R.pset(x + 7 * dir, y - 2, cl); R.pset(x - 6 * dir, y - 2, k); R.rect(x - 5, y + 1, x + 5, y + 1, k);
}

// un tronco varado de la playa, pelado y gris por el sol, con sus nudos y una rama rota
function a_troncoVarado(R, d, x, y, l) {
  const c = d.tn(hex('#a89a86')), cl = d.tn(hex('#d0c4ae')), cs = d.tn(hex('#6a5e50')), k = d.tn(hex('#4a4038'));
  for (let i = 0; i < l; i++) { const yy = y - Math.round(i * 0.12); R.pset(x + i, yy - 3, cl); R.pset(x + i, yy - 2, i % 7 === 3 ? cs : c); R.pset(x + i, yy - 1, h(i, 1, 951) < 0.3 ? cs : c); R.pset(x + i, yy, cs); R.pset(x + i, yy + 1, k); }
  R.disco(x, y - 1, 2, cs); R.pset(x, y - 1, cl); R.linea(x + Math.round(l * 0.6), y - 5, x + Math.round(l * 0.6) + 4, y - 9, c); R.pset(x + Math.round(l * 0.6) + 4, y - 10, cl);
}

// el pie de un árbol grande de la linde: el tronco con corteza en surcos, la luz a la izquierda y las raíces
function a_troncoPie(R, d, x, y0, y1, w) {
  const P = d.P.tronco;
  for (let y = y0; y <= y1; y++) for (let i = -w; i <= w; i++) { const surco = (i + w + Math.round(Math.sin(y * 0.3 + i) * 0.6)) % 3 === 0, q = (i + w) / (2 * w); R.pset(x + i, y, surco ? P.s : q < 0.3 ? P.l : q > 0.7 ? P.s : h(i, y >> 1, 961) < 0.2 ? P.l : P.c); }
  for (const s of [-1, 1]) { R.linea(x + s * w, y1, x + s * (w + 4), y1 + 2, P.c); R.linea(x + s * w, y1 - 1, x + s * (w + 3), y1 + 1, P.s); }
  R.rect(x - w - 3, y1 + 1, x + w + 3, y1 + 2, d.tn(hex('#2a3a20')));
}

// la cabaña de troncos a medio hacer: cuatro hiladas con las esquinas cruzadas, el hueco de la puerta, las vigas del
// tejado al aire y troncos sueltos al lado; (x, base) la esquina de abajo a la izquierda (72 px de ancho)
function a_cabana(R, d, x, base) {
  const c = d.tn(hex('#8a6a46')), cl = d.tn(hex('#b48e60')), cs = d.tn(hex('#5a4228')), k = d.tn(hex('#2a1e14')), aro = d.tn(hex('#d8b880')), aroS = d.tn(hex('#a88858')), w = 50, lado = 18, hil = 4, al = 5;
  // el interior en penumbra (se ve por la puerta y por encima de la pared de delante)
  R.poligono([[x + 2, base - hil * al - 4], [x + w, base - hil * al - 4], [x + w + lado, base - hil * al - 12], [x + w + lado, base - 8], [x + w, base], [x + 2, base]], d.tn(hex('#2e2418')));
  // la pared del lado, en escorzo y en sombra: los troncos suben hacia el fondo
  for (let j = 0; j < hil; j++) for (let i = 0; i <= lado; i++) { const y = base - 1 - j * al - Math.round(i * 8 / lado);
    R.pset(x + w + i, y - 4, a_luz(cl, 0.8)); for (let q = 1; q <= 3; q++) R.pset(x + w + i, y - 4 + q, h(i, j * 5 + q, 973) < 0.2 ? k : a_luz(c, 0.72)); R.pset(x + w + i, y, k); }
  // la pared de delante: troncos con su luz arriba, la veta, las marcas del hacha y el hueco de la puerta
  for (let j = 0; j < hil; j++) { const y = base - 1 - j * al;
    for (let i = 0; i <= w; i++) { const puerta = i > 20 && i < 32 && j < 3; if (puerta) continue; R.pset(x + i, y - 4, cl); R.pset(x + i, y - 3, h(i >> 1, j, 974) < 0.15 ? cl : c); R.pset(x + i, y - 2, (i + j * 3) % 11 === 0 ? cs : c); R.pset(x + i, y - 1, cs); R.pset(x + i, y, k); }
    // las cabezas redondas de los troncos en la esquina, con sus anillos
    for (const ex of [x - 1, x + w + 1]) { R.disco(ex, y - 2, 2.6, cs); R.disco(ex, y - 2.5, 2.2, aro); R.pset(Math.round(ex), y - 2, aroS); R.pset(Math.round(ex) - 1, y - 3, aroS); } }
  // el dintel de la puerta y la luz de dentro
  R.rect(x + 19, base - 3 * al - 2, x + 33, base - 3 * al, c); R.rect(x + 19, base - 3 * al - 2, x + 33, base - 3 * al - 2, cl);
  // las tijeras del tejado y la cumbrera, al aire
  const yt = base - hil * al - 2;
  for (const vx of [x + 2, x + w - 2]) { R.linea(vx, yt, vx + 10, yt - 16, cs); R.linea(vx + 1, yt, vx + 11, yt - 16, c); R.linea(vx + 20, yt, vx + 10, yt - 16, cs); }
  R.linea(x + 12, yt - 16, x + w + 10, yt - 18, c); R.linea(x + 12, yt - 15, x + w + 10, yt - 17, cs);
  // un tronco a medio subir, apoyado en la pared, y las virutas
  R.linea(x + w + lado + 4, base + 2, x + w - 6, yt - 3, cs); R.linea(x + w + lado + 4, base + 1, x + w - 6, yt - 4, cl); R.linea(x + w + lado + 5, base + 1, x + w - 5, yt - 3, c);
  for (let k2 = 0; k2 < 12; k2++) R.pset(x + 6 + Math.floor(h(k2, 1, 972) * 70), base + 2 + Math.floor(h(k2, 2, 972) * 5), cl);
}

// un helecho: hojas en abanico que se arquean (x, yb), de alto al
function a_helecho(R, d, x, yb, al) {
  const c = d.tn(hex('#5a8a3a')), cl = d.tn(hex('#8ab854')), cs = d.tn(hex('#3a5a28'));
  for (let k = -2; k <= 2; k++) { for (let j = 0; j < al; j++) { const u = j / al, px = Math.round(x + k * u * 3 + k * u * u * 2), py = Math.round(yb - j + u * u * Math.abs(k) * 2); R.pset(px, py, j % 2 ? cl : c); if (j % 2 === 0) R.pset(px + (k < 0 ? -1 : 1), py + 1, cs); } }
}

// un fardo de pieles de castor atado con correas (x, base)
function a_fardo(R, d, x, base) {
  const c = d.tn(hex('#6a4426')), cl = d.tn(hex('#8a5e36')), cs = d.tn(hex('#4a2e18')), cuerda = d.tn(hex('#c8b088'));
  R.rect(x, base - 7, x + 10, base, c); R.rect(x, base - 7, x + 10, base - 7, cl); R.rect(x + 10, base - 6, x + 10, base, cs); R.rect(x, base, x + 10, base, cs);
  for (let i = 0; i < 10; i += 2) R.pset(x + i, base - 5 + (i % 4 ? 1 : 0), cl);
  R.linea(x + 3, base - 7, x + 3, base, cuerda); R.linea(x + 7, base - 7, x + 7, base, cuerda); R.pset(x + 11, base - 3, c); R.pset(x + 12, base - 2, cl);
}

// el tocón con el hacha clavada (o sin ella), con sus anillos y la corteza
function a_tocon(R, d, x, base, hacha) {
  const P = d.P.tronco, aro = d.tn(hex('#c8a878')), aroS = d.tn(hex('#a08058'));
  R.rect(x - 6, base - 8, x + 6, base, P.c); for (let i = -6; i <= 6; i += 2) R.linea(x + i, base - 7, x + i, base, P.s); R.rect(x - 6, base - 8, x - 5, base, P.l);
  R.rect(x - 6, base - 10, x + 6, base - 9, aro); R.rect(x - 4, base - 10, x + 4, base - 10, aroS); R.pset(x, base - 10, aro); R.rect(x - 8, base, x + 8, base + 1, d.tn(hex('#3a3020')));
  if (hacha) { const m = d.tn(hex('#8a6a40')), ml = d.tn(hex('#b08a58')), hi = d.tn(hex('#9aa4ac')), hiL = d.tn(hex('#d8e0e6'));
    R.linea(x + 1, base - 11, x + 9, base - 22, m); R.linea(x + 2, base - 11, x + 10, base - 22, ml); R.rect(x - 3, base - 13, x + 3, base - 10, hi); R.rect(x - 3, base - 13, x - 1, base - 13, hiL); }
}

// el búfer de trabajo de los barcos (uno por lienzo)
const a_TMPS = new WeakMap();

function a_tmp(R) { let b = a_TMPS.get(R); if (!b) a_TMPS.set(R, (b = R.nuevo())); return b; }

// los colores de los dos barcos
const a_BARCO = {
  dauphine: a_pal({ casco: '#7a5232', cascoL: '#a07048', cascoS: '#4e3220', cinta: '#2e1e14', franja: '#2a4a8a', franjaL: '#4a6aaa', fondo: '#3a4a3a', popa: '#8a5a36', vela: '#eee4ca', velaS: '#c8b894', velaL: '#fffaec', palo: '#5a3a22', jarcia: '#3a2a20', oro: '#e8b830', ventana: '#f8d870', bandera: '#f4f0e4', lis: '#e0b030', gallardete: '#2a4a8a' }),
  halveMaen: a_pal({ casco: '#5a3a26', cascoL: '#7a5236', cascoS: '#3a2418', cinta: '#1e140e', franja: '#3a6a3a', franjaL: '#5a8a4a', fondo: '#30402e', popa: '#3a6a3a', vela: '#e6dcc0', velaS: '#c0b08c', velaL: '#f8f2e0', palo: '#5a3a22', jarcia: '#3a2a20', oro: '#e8b830', ventana: '#f8d870', bandera: '#f4f0e4', lis: '#e8783a', gallardete: '#e8783a' }),
};

// el barco en coordenadas propias (u a lo largo, hacia la proa; w hacia abajo, 0 la flotación), pasadas por q; con solo
// la borda (los personajes de la cubierta quedan dentro)
function a_barco(R, q, t, s, dir, v, leva, hm, soloBorda) {
  const C2 = a_BARCO[hm ? 'halveMaen' : 'dauphine'], Q = (u, w) => q(u, w).map((n) => Math.round(n)), pol = (pts, c) => R.poligono(pts.map(([u, w]) => q(u, w)), c), lin = (u0, w0, u1, w1, c) => R.linea(...Q(u0, w0), ...Q(u1, w1), c);
  const popaAlta = hm ? -19 : -16;
  if (soloBorda) { pol([[-18, -10], [14, -10], [14, -7.4], [-18, -7.4]], C2.casco); lin(-18, -10, 14, -10, C2.cascoL); for (let u = -16; u < 14; u += 4) lin(u, -10, u, -8, C2.cascoS); return; }
  // los palos: trinquete, mayor y mesana; el bauprés
  const palos = [[16, -40], [-2, -52], [-20, -34]];
  for (const [u, top] of palos) { lin(u, -8, u, top, C2.palo); if (s >= 1.5) lin(u + 0.6, -8, u + 0.6, top, a_luz(C2.palo, 1.3)); }
  lin(26, -11, 44, -20, C2.palo);
  // la jarcia: obenques a las bordas, estays de proa a popa (por detrás de las velas)
  for (const [u, top] of palos) { for (const du of [-5, -3, 3, 5]) lin(u, top + 4, u + du, -10, C2.jarcia); }
  lin(16, -40, 44, -20, C2.jarcia); lin(-2, -52, 16, -36, C2.jarcia); lin(-20, -34, -2, -40, C2.jarcia); lin(-2, -52, -30, popaAlta - 1, C2.jarcia);
  // la cofa de la mayor
  pol([[-5, -42], [1, -42], [0, -40], [-4, -40]], C2.palo);
  // el casco: la popa alta, el combés, el castillo de proa y la proa con su beque
  const casco = [[-30, popaAlta], [-18, popaAlta], [-18, -10], [14, -10], [14, -12.5], [26, -12.5], [31, -11], [33, -9], [28, 0], [-25, 0], [-29, -6]];
  pol(casco, (px, py) => { const w = a_wDe(q, px, py), ww = Math.round(w); if (ww === -4 || ww === -7) return C2.cinta; if (ww <= -1 && ww >= -2) return C2.fondo; if (ww === -9 || ww === -11) return C2.franja; return (Math.round(w * 2) % 3 === 0) ? C2.cascoS : h(px >> 1, Math.round(w), 984) < 0.15 ? C2.cascoL : C2.casco; });
  // la luz de la borda, las cintas y las tablas
  lin(-30, popaAlta, -18, popaAlta, C2.cascoL); lin(-18, -10, 14, -10, C2.cascoL); lin(14, -12.5, 26, -12.5, C2.cascoL); lin(26, -12.5, 31, -11, C2.cascoL);
  lin(-28, -4, 30, -4, C2.cinta); lin(-29, -7, 31, -7, C2.cinta);
  // la popa: ventanas encendidas, la balaustrada, el farol; en el Halve Maen, la popa verde con adornos de oro
  for (const u of [-28, -25, -22]) { const [wx, wy] = Q(u, popaAlta + 3); R.pset(wx, wy, C2.ventana); if (s >= 1.5) R.pset(wx + 1, wy, C2.ventana); }
  for (let u = -30; u <= -18; u += 2) lin(u, popaAlta, u, popaAlta - 2, C2.cascoL); lin(-30, popaAlta - 2, -18, popaAlta - 2, C2.cascoL);
  if (hm) { pol([[-31, popaAlta], [-27, popaAlta], [-27, -9], [-30, -9]], C2.popa); for (let w = popaAlta + 1; w < -9; w += 2) { const [ox, oy] = Q(-29, w); R.pset(ox, oy, C2.oro); } const [fx, fy] = Q(-31, popaAlta - 4); R.disco(fx, fy, 1.2 * s, C2.oro); }
  else { const [fx, fy] = Q(-31, popaAlta - 3); R.pset(fx, fy, C2.oro); R.pset(fx, fy - 1, C2.ventana); }
  // portas de cañón y el timón
  for (const u of [-12, -4, 4]) { const [px, py] = Q(u, -6); R.pset(px, py, C2.cinta); R.pset(px + dir, py, C2.cinta); }
  lin(-28, -4, -30, 1, C2.cascoS);
  // las velas
  const hinch = (0.3 + v * 0.7) * leva;
  const cuadra = (u, wTop, ancho, alto, lis) => {
    const wB = wTop + alto * (0.15 + 0.85 * leva), b = hinch * 3.2;
    lin(u - ancho / 2, wTop, u + ancho / 2, wTop, C2.palo);
    if (leva < 0.15) { for (let k = -ancho / 2 + 1; k < ancho / 2; k += 1) { const [vx, vy] = Q(u + k, wTop + 1); R.pset(vx, vy, C2.velaS); R.pset(vx, vy - 1, C2.vela); } for (let k = -ancho / 2 + 2; k < ancho / 2; k += 4) { const [vx, vy] = Q(u + k, wTop + 1); R.pset(vx, vy, C2.jarcia); } return; }
    const pts = [[u - ancho / 2, wTop + 0.5], [u + ancho / 2, wTop + 0.5], [u + ancho / 2 + b * 0.6, wTop + (wB - wTop) * 0.55], [u + ancho / 2 + b * 0.3, wB], [u, wB + b * 0.25], [u - ancho / 2 + b * 0.3, wB], [u - ancho / 2 + b * 0.6, wTop + (wB - wTop) * 0.55]];
    pol(pts, (px, py) => { const uu = a_uDe(q, px, py, dir) - u, rel = uu / (ancho / 2), costura = Math.round(uu * s) % Math.max(2, Math.round(3 * s)) === 0; const sombra = rel > 0.55 ? C2.velaS : rel < -0.55 ? C2.velaL : C2.vela; return costura && s >= 1 ? a_mezcla(sombra, C2.velaS, 0.5) : sombra; });
    // la panza: una sombra curva
    for (let k = -ancho / 2 + 2; k < ancho / 2 - 1; k++) { const [vx, vy] = Q(u + k + b * 0.4, wB - 1 + Math.round(Math.cos(k / ancho * 3) * 0)); R.pset(vx, vy, C2.velaS); }
    if (lis) { const [lx, ly] = Q(u + b * 0.3, wTop + (wB - wTop) * 0.5), m = Math.max(1, Math.round(s)); for (const [i, j] of [[0, -2], [-1, -1], [0, -1], [1, -1], [-2, 0], [0, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]]) R.rect(lx + i * m, ly + j * m, lx + i * m + m - 1, ly + j * m + m - 1, C2.lis); }
  };
  cuadra(-2, -28, 30, 15, !hm); cuadra(-2, -44, 19, 11, false); cuadra(16, -26, 24, 13, false); cuadra(16, -38, 15, 9, false);
  // la cebadera bajo el bauprés
  if (leva > 0.15) pol([[34, -16], [42, -19], [42 + hinch * 2, -13], [35 + hinch * 2, -11]], C2.vela); else lin(34, -16, 42, -19, C2.velaS);
  // la mesana latina
  if (leva > 0.15) { pol([[-20, -33], [-32, -15], [-20 + hinch * 2, -15], [-20, -20]], (px, py) => (a_uDe(q, px, py, dir) < -26 ? C2.velaS : C2.vela)); lin(-32, -14, -12, -38, C2.palo); }
  else { lin(-32, -14, -12, -38, C2.palo); lin(-31, -15, -13, -38, C2.velaS); }
  // las banderas: gallardete largo en la mayor y la bandera en la mesana, que ondean con el viento
  const fl = (u0, w0, largo, alto, cols) => { for (let i = 0; i < largo; i++) { const ond = Math.sin(t * (4 + v * 4) - i * 0.6) * (0.4 + i * 0.08), al = Math.max(1, Math.round(alto * (1 - i / largo * (cols.length === 1 ? 0.85 : 0)))); for (let j = 0; j < al; j++) { const [fx, fy] = Q(u0 - i * (0.6 + v * 0.4), w0 + j / s + ond); R.pset(fx, fy, cols[Math.min(cols.length - 1, Math.floor(j / al * cols.length))]); } } };
  fl(-2, -53, 14, 2, [C2.gallardete]);
  if (hm) fl(-20, -35, 7, 5, [C2.lis, C2.bandera, C2.franja === undefined ? C2.gallardete : hex('#2a3a8a')]);
  else { fl(-20, -35, 7, 5, [C2.bandera]); const [bx, by] = Q(-23, -33); R.pset(bx, by, C2.lis); R.pset(bx - 2 * dir, by + 1, C2.lis); }
  // los marineros pequeños en las jarcias y la cofa (vida), si el barco es pequeño
  if (s < 1.6) { const cp = hex('#e0b090'), cr = hex('#8a3a2a'); const sube = (t * 0.25) % 1, [mx, my] = Q(-6 + sube * 2, -12 - sube * 26); R.pset(mx, my, cr); R.pset(mx, my - 1, cp); const [cx2, cy2] = Q(-2, -43); R.pset(cx2, cy2, cp); }
}

// la coordenada u (a lo largo del barco) de un punto de la pantalla, deshaciendo q (para las tramas de las velas)
function a_uDe(q, px, py, dir) { const [x0, y0] = q(0, 0), [x1, y1] = q(1, 0), dx = x1 - x0, dy = y1 - y0, n = dx * dx + dy * dy; return ((px - x0) * dx + (py - y0) * dy) / n; }

// la coordenada w (hacia abajo) de un punto de la pantalla
function a_wDe(q, px, py) { const [x0, y0] = q(0, 0), [x1, y1] = q(0, 1), dx = x1 - x0, dy = y1 - y0, n = dx * dx + dy * dy; return ((px - x0) * dx + (py - y0) * dy) / n; }

const a_CANOA = a_pal({ c: '#6a4026', s: '#3e2414', veta: '#7e5032', borde: '#b88454', bordeL: '#d0a070', hueco: '#22140c' });

// un remero sentado (unos 9 px por s): el manto, la cabeza con el pelo negro y la pluma, y la pala que entra en el agua
// por delante, tira hacia atrás y sale goteando; fase null: la pala en alto (saluda)
function a_remero(R, x, yb, s, dir, fase, k, lado, t) {
  const piel = hex('#a8683c'), pielS = hex('#7a4a28'), pelo = hex('#1e1614'), manto = [hex('#dab482'), hex('#c89a64'), hex('#e6c896')][k % 3], mantoS = hex('#9a7046'), pluma = [hex('#d84a3a'), hex('#e8c040'), hex('#3e9ad4'), hex('#f4f0e4')][k % 4], remo = hex('#8a6038'), remoL = hex('#b08a58');
  const S = (v) => Math.round(v * s), px = (i) => x + Math.round(i * s) * dir;
  // de lejos (s < 0,8): la figura en cuatro píxeles, la pluma y la pala que sube y baja
  if (s < 0.8) { R.rect(x, yb - 2, x + 1, yb - 1, manto); R.pset(x + (dir > 0 ? 1 : 0), yb - 2, mantoS); R.rect(x, yb - 4, x + 1, yb - 3, piel); R.rect(x, yb - 4, x + 1, yb - 4, pelo); R.pset(x + (dir > 0 ? 0 : 1), yb - 5, pluma);
    const c = fase == null ? 0.75 : (fase % (Math.PI * 2)) / (Math.PI * 2), dentro = c < 0.5, ax = x + dir * Math.round(dentro ? 3 - c * 10 : -2 + (c - 0.5) * 10), ay = dentro ? yb + 2 : yb;
    R.linea(x + dir, yb - 2, ax, ay, remo); if (dentro && c > 0.1) R.pset(ax, yb + 2, hex('#eef6f4')); return; }
  // el cuerpo
  R.poligono([[px(-2), yb], [px(-2), yb - S(5)], [px(2), yb - S(5)], [px(2.5), yb]].map(([a, b]) => [a, b]), manto); R.linea(px(dir > 0 ? 2 : -2), yb - S(4), px(dir > 0 ? 2 : -2), yb, mantoS);
  R.rect(Math.min(px(-1.5), px(1.5)), yb - S(8), Math.max(px(-1.5), px(1.5)), yb - S(5) - 1, piel); R.pset(px(1.5), yb - S(6), pielS);
  R.rect(Math.min(px(-1.5), px(1.5)), yb - S(9), Math.max(px(-1.5), px(1.5)), yb - S(8), pelo); R.pset(px(-1.5), yb - S(7), pelo);
  R.linea(px(-0.5), yb - S(9), px(-1.5), yb - S(12), pluma); if (s >= 1) R.pset(px(-1.5), yb - S(12), a_luz(pluma, 1.25));
  // la pala
  if (fase == null) { const ondea = Math.sin(t * 5 + k) > 0 ? 1 : 0; R.linea(px(1), yb - S(5), px(4), yb - S(14) - ondea, remo); R.linea(px(4), yb - S(14) - ondea, px(5), yb - S(17) - ondea, remoL); R.pset(px(1), yb - S(5), piel); return; }
  const c = (fase % (Math.PI * 2)) / (Math.PI * 2), dentro = c < 0.5, u = dentro ? c / 0.5 : (c - 0.5) / 0.5;
  const ax = dentro ? 7 - u * 12 : -5 + u * 12, ay = dentro ? 4 : 4 - Math.sin(u * Math.PI) * 5, mx = 1.5, my = -5;
  R.linea(px(mx), yb + S(my), px(ax), yb + S(ay), remo); R.linea(px(ax), yb + S(ay), px(ax - 1), yb + S(ay + 3), remoL); R.pset(px(mx), yb + S(my), piel); R.pset(px(mx + 1), yb + S(my + 1), piel);
  if (dentro) { R.pset(px(ax), yb + S(3.5), hex('#eef6f4')); R.pset(px(ax + 1), yb + S(3.5), hex('#b8d0d8')); }
  else if (u < 0.5) for (let g = 0; g < 2; g++) R.pset(px(ax - 1), yb + S(ay + 4 + g * 2 + u * 3), hex('#c8e0ea'));
}

const a_MP = a_pal({ mar: '#b2cac8', marS: '#a2bcbc', linea: '#5e7e88', lineaL: '#86a2a8', tierra: '#ecdcb4', tierraS: '#d8c69a', tierraL: '#f6ecd2', costa: '#4a3a2c', costaS: '#b49e74', bosque: '#6a7e4a', bosqueS: '#4a5e36', monte: '#8a7656', monteL: '#c0ac86', marisma: '#7a8a5a', mesa: '#5a3a22', mesaS: '#462c18', mesaL: '#74502e', oro: '#e8b830', oroS: '#a8801c', oroL: '#fff0a0', tinta: '#3a2e24', rojo: '#b83a2a' });

// las vistas de papel quietas: la clasificación de la tierra y el mar (0 mar, 2 tierra) y el búfer pintado
const a_MAPAS = new Map();

function a_mapaFijo(R, vista) {
  let d = a_MAPAS.get(vista); if (d) return d;
  const V = a_VISTAS[vista], cl = new Uint8Array(320 * 180), P = V.proy();
  // la tierra: de Natural Earth (mapaPapel en un búfer, clasificado por color) o de los polígonos del plano
  const tmp = R.nuevo(), prev = R.usar(tmp);
  if (V.natural) { mapaPapel(R, 0, P, { mundo: true, relieve: false, reticula: 400 });
    for (let i = 0; i < tmp.length; i++) { const c = tmp[i], r = c & 255, b = (c >>> 16) & 255; cl[i] = (r > b || b - r > 57) ? 2 : 0; } }
  else { V.tierra(R); for (let i = 0; i < tmp.length; i++) cl[i] = tmp[i] ? 2 : 0; }
  R.usar(prev);
  d = { vista, P, cl, buf: R.nuevo() };
  P.sitios = V.sitios ?? {};
  const p2 = R.usar(d.buf); a_grabado(R, cl, V, P); V.fijo?.(R, d); a_papelViejo(R); R.usar(p2);
  a_MAPAS.set(vista, d); return d;
}

// la distancia (en píxeles, hasta 14) de cada píxel a la otra clase: en el mar, a la costa; en la tierra, al mar
function a_distancias(cl) {
  const D = new Uint8Array(320 * 180).fill(255), cola = [];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, c = cl[i];
    if ((x > 0 && cl[i - 1] !== c) || (x < 319 && cl[i + 1] !== c) || (y > 0 && cl[i - 320] !== c) || (y < 179 && cl[i + 320] !== c)) { D[i] = 1; cola.push(i); } }
  for (let k = 0; k < cola.length; k++) { const i = cola[k], dd = D[i]; if (dd >= 14) continue; const x = i % 320;
    for (const j of [x > 0 ? i - 1 : -1, x < 319 ? i + 1 : -1, i - 320, i + 320]) if (j >= 0 && j < D.length && D[j] === 255 && cl[j] === cl[i]) { D[j] = dd + 1; cola.push(j); } }
  return D;
}

// el grabado: el mar con su aguada y las líneas de agua, la tierra con la costa entintada, el sombreado por dentro del
// lado de abajo a la derecha, los bosques de arbolitos y los montes; la retícula punteada si la vista tiene proyección
function a_grabado(R, cl, V, P) {
  const B = R.buf, D = a_distancias(cl), M = a_MP;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, dd = D[i];
    if (!cl[i]) { let c = h(x >> 2, y, 1001) < 0.12 || (y % 2 === 0 && h(x >> 3, y, 1002) < 0.15) ? M.marS : M.mar;
      if (dd === 2) c = M.linea; else if (dd === 4 && (x + y) % 2 === 0) c = M.lineaL; else if (dd === 7 && (x + 2 * y) % 3 === 0) c = M.lineaL; else if (dd === 11 && (x + y) % 4 === 0) c = M.lineaL;
      B[i] = c; }
    else { const sur = (y < 179 && !cl[i + 320]) || (x < 319 && !cl[i + 1]);
      B[i] = dd === 1 ? M.costa : dd === 2 && sur ? M.costaS : dd <= 3 && (x + y) % 2 === 0 && h(x, y, 1003) < 0.6 ? M.tierraS : h(x >> 1, y >> 1, 1004) < 0.1 ? M.tierraS : h(x, y, 1005) < 0.04 ? M.tierraL : M.tierra; } }
  // la retícula
  if (V.reticula && P) { const g = V.reticula;
    for (let lon = -180; lon <= 180; lon += g) for (let lat = -80; lat <= 85; lat += 0.4) { const [x, y] = P([lon, lat]).map(Math.round); if (x >= 0 && x < 320 && y >= 0 && y < 180 && (Math.round(lat * 2.5) % 3 === 0)) B[y * 320 + x] = a_mezcla(B[y * 320 + x], M.linea, 0.45); }
    for (let lat = -60; lat <= 80; lat += g) for (let lon = -180; lon <= 180; lon += 0.4) { const [x, y] = P([lon, lat]).map(Math.round); if (x >= 0 && x < 320 && y >= 0 && y < 180 && (Math.round(lon * 2.5) % 3 === 0)) B[y * 320 + x] = a_mezcla(B[y * 320 + x], M.linea, 0.45); } }
  // las ondas de buril en mar abierto
  for (let j = 0, y = 14; y < 170; j++, y += 9) for (let x = 14 + (j % 2) * 8; x < 306; x += 16) { const X = x + Math.round((h(x, y, 1006) - 0.5) * 4); if (a_atom(X, y)) continue;
    let ok = true; for (let i = -4; i <= 4 && ok; i += 2) for (let k = -2; k <= 3; k++) { const q = (y + k) * 320 + X + i; if (cl[q] || D[q] < 6) { ok = false; break; } } if (!ok) continue;
    for (const [dx, dy] of [[-3, 1], [-2, 0], [-1, 0], [0, 1], [1, 1], [2, 0], [3, 0]]) B[(y + dy) * 320 + X + dx] = M.linea; }
  // bosques de arbolitos y montes, donde la tierra queda lejos de la costa
  const dens = V.bosques ?? 0.5;
  for (let y = 8; y < 172; y += 4) for (let x = 8 + ((y >> 2) % 2) * 2; x < 312; x += 5) { const i = y * 320 + x; if (!cl[i] || D[i] < 3 || a_atom(x, y)) continue; const n = h(x, y, 1007), zona = h(x >> 4, y >> 4, 1008);
    if (zona < dens && n < 0.55) { B[i - 640] = M.bosque; B[i - 320 - 1] = M.bosque; B[i - 320] = M.bosque; B[i - 320 + 1] = M.bosqueS; B[i] = M.monte; }
    else if (zona > 0.88 && n < 0.5) { B[i - 1] = M.monteL; B[i - 321] = M.monteL; B[i - 642 + 1] = M.monte; B[i - 320 + 1] = M.monte; B[i + 2] = M.monte; } }
}

// el papel viejo y la mesa: tono desigual, fibras, cercos de taza, manchas de humedad, los dobleces, los bordes oscuros,
// las chinchetas de latón de las esquinas y la mesa de madera con sus vetas alrededor
function a_papelViejo(R) {
  const B = R.buf, M = a_MP;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, e = Math.max(Math.abs(x - 160) / 154, Math.abs(y - 90) / 84), n = h(x >> 3, y >> 3, 1011), m = h(x >> 4, (y >> 4) + 7, 1012);
    let c = B[i]; if (m < 0.2) c = a_mezcla(c, hex('#c8a870'), 0.12); if (n < 0.06) c = a_mezcla(c, hex('#a88050'), 0.18); if (e > 0.84 && h(x, y, 1013) < (e - 0.84) * 5) c = a_luz(c, 0.82); if (h(x, y, 1014) < 0.006) c = a_luz(c, 0.75); B[i] = c; }
  // fibras
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 1015) * 300) + 10, y = Math.floor(h(k, 2, 1015) * 160) + 10, l = 2 + Math.floor(h(k, 3, 1015) * 4); for (let i = 0; i < l; i++) B[(y + (i >> 2)) * 320 + x + i] = a_mezcla(B[(y + (i >> 2)) * 320 + x + i], hex('#fff8e0'), 0.35); }
  // un cerco de taza y una mancha
  for (let a = 0; a < 6.28; a += 0.04) { const x = Math.round(64 + Math.cos(a) * 13), y = Math.round(140 + Math.sin(a) * 11); if (h(Math.round(a * 20), 1, 1016) < 0.75) B[y * 320 + x] = a_mezcla(B[y * 320 + x], hex('#8a6a40'), 0.35); }
  for (let y = 28; y < 52; y++) for (let x = 226; x < 254; x++) if (Math.hypot((x - 240) / 14, (y - 40) / 12) < 0.9 + h(x >> 2, y >> 2, 1017) * 0.2) B[y * 320 + x] = a_mezcla(B[y * 320 + x], hex('#c0a070'), 0.12);
  // los dobleces
  for (let y = 6; y < 174; y++) for (const x of [108, 214]) { B[y * 320 + x] = a_mezcla(B[y * 320 + x], hex('#fff8e8'), 0.25); B[y * 320 + x + 1] = a_mezcla(B[y * 320 + x + 1], hex('#3a2a1a'), 0.14); }
  for (let x = 6; x < 314; x++) { B[91 * 320 + x] = a_mezcla(B[91 * 320 + x], hex('#fff8e8'), 0.25); B[92 * 320 + x] = a_mezcla(B[92 * 320 + x], hex('#3a2a1a'), 0.14); }
  // la mesa
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (x < 6 || x > 313 || y < 6 || y > 173) { const v = (y + Math.round(Math.sin(x * 0.05 + y * 0.02) * 2)) % 6; B[y * 320 + x] = v < 2 ? M.mesaS : v === 5 ? M.mesaL : M.mesa; }
  for (let x = 5; x <= 314; x++) { B[5 * 320 + x] = M.tinta; B[174 * 320 + x] = a_mezcla(M.tinta, M.mesa, 0.4); }
  for (let y = 5; y <= 174; y++) { B[y * 320 + 5] = M.tinta; B[y * 320 + 314] = a_mezcla(M.tinta, M.mesa, 0.4); }
  for (const [x, y] of [[11, 168], [308, 168]]) { R.disco(x + 1, y + 1, 2.4, hex('#3a2a1a')); R.disco(x, y, 2.4, M.oroS); R.disco(x, y, 1.6, M.oro); R.pset(x - 1, y - 1, M.oroL); }
}

// la rosa de los vientos grabada (unos 25 px), con el norte rojo
function a_rosaMapa(R, x, y, r = 11) {
  const M = a_MP, papel = M.tierra;
  for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), M.tinta); if (k % 2 === 0) R.pset(Math.round(x + Math.cos(a) * (r - 2)), Math.round(y + Math.sin(a) * (r - 2)), M.costaS); }
  for (let k = 7; k >= 0; k--) { const a = k * Math.PI / 4 - Math.PI / 2, l = k % 2 ? r * 0.55 : r * 1.1, w = k % 2 ? 1.5 : 2.5, px = -Math.sin(a) * w, py = Math.cos(a) * w, tx = x + Math.cos(a) * l, ty = y + Math.sin(a) * l, norte = k === 0;
    R.poligono([[x + px, y + py], [tx, ty], [x, y]].map(([u, v]) => [Math.round(u), Math.round(v)]), norte ? M.rojo : k % 2 ? hex('#cbbd9a') : hex('#f6eed8'));
    R.poligono([[x - px, y - py], [tx, ty], [x, y]].map(([u, v]) => [Math.round(u), Math.round(v)]), norte ? hex('#7a2418') : k % 2 ? hex('#8a7a5a') : hex('#6a5a42')); }
  R.pset(x, y - Math.round(r * 1.1) - 2, M.rojo); R.disco(x, y, 1, M.tinta); R.pset(x, y, papel);
}

// un barquito de vela de mapa (casco y vela), que cabecea; c la vela
function a_barquito(R, x, y, t, dir = 1, c = hex('#f6f0e0'), k = 0) {
  x = Math.round(x); y = Math.round(y + Math.sin(t * 2 + k) * 0.6);
  R.rect(x - 3, y, x + 3, y, a_MP.tinta); R.rect(x - 2, y + 1, x + 2, y + 1, a_MP.tinta); R.linea(x, y - 1, x, y - 6, a_MP.tinta);
  R.poligono([[x + 1, y - 6], [x + 1 + 3 * dir, y - 2], [x + 1, y - 1]], c); R.pset(x, y - 7, a_MP.rojo);
}

// la vida de la mesa: un rayo de sol que cruza despacio con motas de polvo que brillan
function a_mapaVida(R, t) {
  const B = R.buf, x0 = 40 + ((t * 6) % 300) - 60, luz = hex('#fff6dc');
  for (let y = 6; y < 174; y += 1) { const xa = Math.round(x0 + y * 0.5); for (let x = Math.max(6, xa); x < Math.min(314, xa + 36); x++) { if (a_atom(x, y)) continue; const i = y * 320 + x, e = Math.sin((x - xa) / 36 * Math.PI); if (a_um(x, y) < e * 0.5) B[i] = a_mezcla(B[i], luz, 0.16); } }
  for (let k = 0; k < 12; k++) { const y = Math.round(10 + ((h(k, 1, 1021) * 160 + t * (2 + k % 3)) % 160)), x = Math.round(x0 + y * 0.5 + h(k, 2, 1021) * 34 + Math.sin(t + k) * 3); if (x > 6 && x < 314 && !a_atom(x, y) && Math.sin(t * 3 + k) > 0) R.pset(x, y, luz); }
}

// la serpiente de mar de los mapas antiguos: asoma sus jorobas y la cabeza y vuelve a hundirse
function a_serpiente(R, x, y, t) {
  const u = (t % 9) / 9, sale = Math.sin(Math.min(1, u * 1.4) * Math.PI), c = hex('#4a7a6a'), cl = hex('#8ab8a0'), cs = hex('#2e4e44');
  if (sale <= 0.05) return; const al = Math.round(sale * 4), xx = Math.round(x + u * 14);
  for (let k = 0; k < 3; k++) { const bx = xx + k * 6; for (let i = -2; i <= 2; i++) { const yy = y - Math.round(Math.sqrt(Math.max(0, 4 - i * i)) * al / 2); R.pset(bx + i, yy, c); R.pset(bx + i, yy - 1, i < 0 ? cl : c); } R.pset(bx - 3, y + 1, a_MP.linea); R.pset(bx + 3, y + 1, a_MP.linea); }
  const hx = xx + 18, hy = y - al - 2; R.rect(hx, hy, hx + 3, hy + 2, c); R.pset(hx + 4, hy + 1, c); R.pset(hx + 2, hy, cs); R.pset(hx + 1, hy - 1, hex('#c84a3a')); R.rect(hx - 1, hy + 2, hx, y, c);
  if (Math.sin(t * 6) > 0.6) { R.pset(hx + 5, hy + 2, hex('#c84a3a')); }
}

// una flecha de trazos de (x0, y0) a (x1, y1) que se dibuja con u (0–1), con la punta
function a_flechaTrazos(R, x0, y0, x1, y1, u, c) {
  const n = Math.round(Math.hypot(x1 - x0, y1 - y0)), m = Math.round(n * u);
  for (let k = 0; k <= m; k++) { if (k % 6 > 3) continue; const x = Math.round(x0 + (x1 - x0) * k / n), y = Math.round(y0 + (y1 - y0) * k / n); R.pset(x, y, c); R.pset(x, y + 1, a_luz(c, 0.7)); }
  if (u > 0.02) { const xe = x0 + (x1 - x0) * u, ye = y0 + (y1 - y0) * u, a = Math.atan2(y1 - y0, x1 - x0); for (const s of [-1, 1]) R.linea(Math.round(xe), Math.round(ye), Math.round(xe - Math.cos(a + s * 0.6) * 5), Math.round(ye - Math.sin(a + s * 0.6) * 5), c); }
}

// una torre de cristal (la de la ONU y sus copias): la losa con sus franjas de ventanas que brillan, el canto claro, la
// base y su sombra; crece con u (0–1)
function a_torreCristal(R, x, yb, alto, u, t, k = 0) {
  if (u <= 0) return; const al = Math.max(1, Math.round(alto * Math.min(1, u))), w = Math.max(3, Math.round(alto * 0.38)), c = hex('#5aa0b8'), cs = hex('#3a6a80'), cl = hex('#b8e0ec'), k2 = hex('#2a3a44');
  R.linea(x + w, yb, x + w + 3, yb + 1, hex('#8a7a5a'));
  R.rect(x - 1, yb - al - 1, x + w + 1, yb, k2);
  for (let y = yb - al; y < yb; y++) for (let i = 0; i <= w; i++) R.pset(x + i, y, i === 0 ? cl : i === w ? cs : (y % 2 === 0 ? (h(i, y, 1031 + Math.floor(t * 2) + k) < 0.08 ? hex('#fff4c0') : c) : a_luz(c, 0.85)));
  R.rect(x - 2, yb, x + w + 2, yb + 1, hex('#8a8478'));
}

// una pagoda pequeña de pictograma (la China soñada)
function a_pagoda(R, x, y, c = hex('#b83a2a')) {
  for (let j = 0; j < 3; j++) { const yy = y - j * 4, w = 5 - j; R.rect(x - w, yy, x + w, yy, a_MP.tinta); R.pset(x - w - 1, yy - 1, a_MP.tinta); R.pset(x + w + 1, yy - 1, a_MP.tinta); R.rect(x - w + 1, yy + 1, x + w - 1, yy + 3, c); }
  R.linea(x, y - 12, x, y - 15, a_MP.tinta);
}

// una llave de oro de pictograma: el ojo redondo, la caña y los dientes (centro del ojo en x, y; s escala)
function a_llave(R, x, y, s, t) {
  const M = a_MP, b = Math.round(Math.sin(t * 2) * 1.2);
  y += b; R.disco(x + 1, y + 1, 5 * s, M.oroS); R.disco(x, y, 5 * s, M.oro); R.disco(x, y, 2.4 * s, M.mar); R.pset(Math.round(x - 3 * s), Math.round(y - 3 * s), M.oroL);
  R.rect(x + 4 * s, y - 1, x + 20 * s, y + 1, M.oro); R.rect(x + 4 * s, y + 1, x + 20 * s, y + 1, M.oroS); R.rect(x + 4 * s, y - 1, x + 20 * s, y - 1, M.oroL);
  R.rect(x + 14 * s, y + 2, x + 16 * s, y + 6 * s, M.oro); R.rect(x + 18 * s, y + 2, x + 20 * s, y + 5 * s, M.oro); R.pset(x + 16 * s, y + 6 * s, M.oroS);
  const g = (t * 1.5) % 3; if (g < 0.4) { const sx = Math.round(x + 10 * s + g * 20), sy = y - 2; R.pset(sx, sy, M.oroL); R.pset(sx, sy - 1, hex('#ffffff')); }
}

// los polígonos del plano de la bahía (coordenadas de pantalla, el norte arriba)
const a_PLANO = {
  jersey: [[0, 0], [196, 0], [192, 8], [180, 20], [166, 44], [152, 74], [140, 102], [130, 124], [118, 134], [96, 138], [70, 140], [44, 142], [0, 146]],
  jerseySur: [[0, 152], [40, 150], [52, 156], [44, 168], [36, 180], [0, 180]],
  staten: [[56, 158], [84, 148], [112, 145], [140, 147], [160, 152], [166, 160], [158, 170], [140, 178], [110, 180], [70, 180], [52, 170]],
  manhattan: [[147, 122], [141, 114], [144, 100], [152, 82], [162, 60], [172, 40], [182, 24], [190, 13], [197, 8], [201, 13], [197, 26], [187, 46], [177, 70], [167, 94], [157, 114]],
  bronx: [[205, 0], [266, 0], [268, 10], [262, 20], [250, 26], [236, 30], [222, 30], [208, 22], [204, 10]],
  queens: [[190, 82], [194, 68], [204, 50], [216, 42], [242, 44], [270, 48], [296, 50], [320, 49], [320, 112], [270, 106], [232, 94], [206, 88]],
  brooklyn: [[177, 126], [173, 112], [181, 96], [190, 82], [206, 88], [232, 94], [270, 106], [320, 112], [320, 156], [296, 158], [262, 160], [228, 164], [198, 164], [176, 160], [170, 148]],
  jamaica: [[236, 150], [262, 142], [296, 146], [300, 154], [270, 156], [244, 158]],
};

// los sitios del plano (para las escenas)
const a_SITIOS = { manhattan: [170, 66], punta: [147, 120], estrecho: [166, 158], bahiaArriba: [140, 136], bahiaAbajo: [190, 172], hudson: [150, 40], rioEste: [184, 100], brooklyn: [228, 128], queens: [262, 70], bronx: [236, 14], staten: [110, 164], jersey: [60, 70], llave: [70, 92], mar: [250, 172] };

// las vistas del mapa
const a_VISTAS = {
  atlantico: { natural: true, reticula: 10, bosques: 0.45,
    proy: () => equirect([6, 6, 314, 174], [-84, 12, 14, 66]),
    fijo(R, d) { a_rosaMapa(R, 150, 146, 12); },
    vivo(R, t, d, o) {
      const P = d.P, u = Math.max(0, Math.min(1, o.u ?? 1)), ruta = [[1.08, 49.92], [-8, 44], [-16.9, 32.65], [-40, 31], [-62, 32], [-77.9, 33.9], [-75.5, 37.5], [-74.02, 40.5]].map((p) => P(p));
      const largos = []; let tot = 0; for (let i = 1; i < ruta.length; i++) { const l = Math.hypot(ruta[i][0] - ruta[i - 1][0], ruta[i][1] - ruta[i - 1][1]); largos.push(l); tot += l; }
      let resto = tot * u, punta = ruta[0], ang = 0;
      for (let i = 1; i < ruta.length && resto > 0; i++) { const [ax, ay] = ruta[i - 1], [bx, by] = ruta[i], l = largos[i - 1], f = Math.min(1, resto / l); for (let k = 0; k <= l * f; k += 1) if (Math.floor(k + i * 7) % 4 < 2) R.pset(Math.round(ax + (bx - ax) * k / l), Math.round(ay + (by - ay) * k / l), a_MP.rojo); punta = [ax + (bx - ax) * f, ay + (by - ay) * f]; ang = Math.atan2(by - ay, bx - ax); resto -= l; }
      a_serpiente(R, 96, 120, t);
      const [nx, ny] = P([-74.0, 40.7]), [fx, fy] = P([1.08, 49.92]), [mx, my] = P([-16.9, 32.65]);
      chincheta(R, Math.round(fx), Math.round(fy), t, hex('#2a4a8a'));
      chincheta(R, Math.round(mx), Math.round(my), t, hex('#e8b830'), { baja: Math.max(0, Math.min(1, (u - 0.2) * 6)) });
      if (u > 0.98) chincheta(R, Math.round(nx), Math.round(ny), t, a_MP.rojo, { baja: Math.min(1, (u - 0.98) * 50), pulso: true });
      a_barquito(R, punta[0], punta[1] - 1, t, Math.cos(ang) >= 0 ? 1 : -1, hex('#f6f0e0'));
      // la flecha que busca China al oeste y se queda en el aire
      const ch = Math.max(0, Math.min(1, o.china ?? 0)); if (ch > 0) { a_flechaTrazos(R, Math.round(nx) - 4, Math.round(ny) - 2, 18, Math.round(ny) - 22, ch, a_MP.rojo); if (ch >= 1) { const b = Math.round(Math.sin(t * 3) * 1.5); a_pagoda(R, 20, Math.round(ny) - 34 + b); R.icono('?', 30, Math.round(ny) - 52 + b, hex('#fff4d0'), a_MP.tinta, 2); } }
    },
  },
  bahia: { natural: false, bosques: 0.6, sitios: a_SITIOS,
    proy: () => { const P = ([lon, lat]) => [147 + (lon + 74.015) * 560, 120 - (lat - 40.70) * 640]; return P; },
    tierra(R) { const c = hex('#ffffff'); for (const k of ['jersey', 'jerseySur', 'staten', 'manhattan', 'bronx', 'queens', 'brooklyn']) R.poligono(a_PLANO[k], c); R.poligono(a_PLANO.jamaica, 0); },
    fijo(R, d) { a_planoDetalle(R, d); a_rosaMapa(R, 52, 100, 11); },
    vivo(R, t, d, o) {
      const isla = Math.max(0, Math.min(1, o.isla ?? 0)), velas = Math.max(0, Math.min(1, o.velas ?? 0)), puerto = Math.max(0, Math.min(1, o.puerto ?? 0));
      a_serpiente(R, 236, 170, t + 3);
      // los barcos del plano: uno que entra por el estrecho y otro en el Hudson
      { const u = (t * 0.04) % 1; a_barquito(R, 200 - u * 50, 174 - u * 34, t, -1); a_barquito(R, 132 + Math.sin(t * 0.3) * 3, 60 + ((t * 2) % 40), t, 1, hex('#f6f0e0'), 2); }
      if (velas > 0) { const n = Math.round(velas * 150); for (let k = 0; k < n; k++) { const x = Math.round(118 + h(k, 1, 1041) * 180), y = Math.round(126 + h(k, 2, 1041) * 42); if (d.cl[y * 320 + x] || d.cl[(y - 6) * 320 + x] || d.cl[y * 320 + x + 3] || d.cl[y * 320 + x - 3]) continue; const b = Math.min(1, velas * 150 / Math.max(1, k + 1) * 0.6); if (b < 0.2) continue; a_barquito(R, x, y, t, -1, hex('#f8f4ea'), k); R.pset(x + 2, y - 4, hex('#c83a3a')); } }
      if (puerto > 0) { const r = 22 + Math.sin(t * 3) * 1.5; for (let a = 0; a < 6.28; a += 0.05) if (Math.floor(a * 12) % 2 && a / 6.28 < puerto) R.pset(Math.round(150 + Math.cos(a) * r), Math.round(146 + Math.sin(a) * r * 0.7), a_MP.rojo); }
      if (isla > 0) { const g = 0.5 + 0.5 * Math.sin(t * 4), c = a_mezcla(a_MP.oro, a_MP.oroL, g); const pts = a_PLANO.manhattan; for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length]; if (i / pts.length <= isla) { R.linea(ax, ay, bx, by, c); R.linea(ax + 1, ay, bx + 1, by, a_MP.oroS); } }
        if (isla > 0.5) { const e = Math.min(1, (isla - 0.5) * 2); a_llave(R, 60, 92, e < 1 ? 1 : 1.3, t); a_flechaTrazos(R, 92, 92, 142, 84, e, a_MP.oro); } }
    },
  },
  distritos: { natural: false, bosques: 0.3, sitios: a_SITIOS,
    proy: () => { const P = ([lon, lat]) => [147 + (lon + 74.015) * 560, 120 - (lat - 40.70) * 640]; return P; },
    tierra(R) { const c = hex('#ffffff'); for (const k of ['jersey', 'jerseySur']) R.poligono(a_PLANO[k], c); },
    fijo(R, d) { a_rosaMapa(R, 52, 100, 11); for (const k of ['manhattan', 'bronx', 'queens', 'brooklyn', 'staten']) { const p = a_PLANO[k]; for (let i = 0; i < p.length; i++) { const [ax, ay] = p[i], [bx, by] = p[(i + 1) % p.length]; R.linea(ax, ay, bx, by, a_MP.lineaL, 3); } } },
    vivo(R, t, d, o) {
      const u = Math.max(0, Math.min(1, o.u ?? 1)), vuelo = 0.22;
      const orden = Array.isArray(o.orden) ? o.orden.filter((k) => a_DISTRITOS[k]) : ['manhattan', 'brooklyn', 'queens', 'bronx', 'staten'];
      const lleg = orden.map((_, i) => (Array.isArray(o.llegadas) && o.llegadas[i] != null ? o.llegadas[i] : 0.1 + i * 0.175));
      // la vida del agua va por debajo de las piezas que vuelan
      a_distritosVida(R, t, d);
      const desp = {}, puesto = {}, flashes = [];
      orden.forEach((k, i) => { const [dx, dy, col] = a_DISTRITOS[k], a = Math.max(0, Math.min(1, (u - lleg[i] + vuelo) / vuelo)), e = 1 - (1 - a) * (1 - a) * (1 - a);
        const ox = Math.round(dx * 2.2 * (1 - e)), oy = Math.round(dy * 2.2 * (1 - e)), alto = Math.round((1 - e) * 6), f = u - lleg[i], fl = a >= 1 && f < 0.14 ? 1 - f / 0.14 : 0;
        a_pieza(R, a_PLANO[k], ox, oy, alto, col, k === 'brooklyn' ? a_PLANO.jamaica : null, fl); desp[k] = [ox, oy, col]; puesto[k] = a >= 1;
        if (fl > 0) flashes.push([k, fl, col]); });
      // las pestañas, encima de todas las piezas
      for (const k in desp) { const [ox, oy, col] = desp[k]; for (const [px, py, r] of a_PESTANAS[k]) a_pestana(R, px + ox, py + oy, r, col); }
      // el puente de Brooklyn, cuando las dos orillas están puestas, con un carruaje que lo cruza
      if (puesto.manhattan && puesto.brooklyn) a_puenteBrooklyn(R, t);
      // el destello de cada pieza al encajar: un anillo de estrellas que se abre desde su centro
      for (const [k, fl, col] of flashes) a_destelloPieza(R, a_SITIOS[k], fl, col);
    },
  },
  mundo: { natural: true, reticula: 30, bosques: 0.4,
    proy: () => equirect([6, 10, 314, 170], [-130, 150, -58, 80]),
    fijo(R, d) { a_rosaMapa(R, 40, 138, 11); },
    vivo(R, t, d, o) {
      const P = d.P, [lx, ly] = P([-0.13, 51.5]).map(Math.round), [nx, ny] = P([-74.0, 40.7]).map(Math.round);
      if (o.globo) { const lon = a_globo(R, t, o); P.globo = { lon0: lon, lat0: 28, cx: 160, cy: 94, r: 62 }; return; }
      // la ruta de Londres a Nueva York y los barquitos que cruzan
      for (let k = 0; k <= 40; k++) { const f = k / 40, x = Math.round(nx + (lx - nx) * f), y = Math.round(ny + (ly - ny) * f - Math.sin(f * Math.PI) * 10); if (k % 2) R.pset(x, y, a_MP.rojo); }
      for (let k = 0; k < 2; k++) { const f = ((t * 0.05 + k * 0.5) % 1), x = nx + (lx - nx) * f, y = ny + (ly - ny) * f - Math.sin(f * Math.PI) * 10; a_barquito(R, x, y - 1, t, k ? 1 : 1, hex('#f6f0e0'), k); }
      chincheta(R, lx, ly, t, hex('#2a4a8a')); chincheta(R, nx, ny, t, a_MP.rojo, { pulso: !o.copias });
      const cp = Math.max(0, Math.min(1, o.copias ?? 0)); if (cp > 0) { a_torreCristal(R, nx - 6, ny - 4, 16, cp * 4, t, 0);
        a_COPIAS.forEach(([lon, lat], i) => { const [x, y] = P([lon, lat]).map(Math.round), f = cp * (a_COPIAS.length + 2) - 1.5 - i; if (f > 0 && !a_atom(x, y - 12)) a_torreCristal(R, x - 2, y, 9, f, t, i + 1); }); }
    },
  },
};
// las ciudades con torres de cristal copiadas de la de la ONU ([lon, lat])
const a_COPIAS = [[6.14, 46.2], [-43.2, -22.9], [139.7, 35.7], [-58.4, -34.6], [37.6, 55.75], [103.8, 1.35], [-99.1, 19.4], [28.0, -26.2], [77.2, 28.6], [-79.4, 43.7], [55.3, 25.2], [121.5, 31.2]];

// los detalles del plano de la bahía: las colinas de Manhattan en «^» con sus arroyos, las marismas, los bosques, las
// casas largas lenapes de pictograma y la playa de Coney
function a_planoDetalle(R, d) {
  const M = a_MP;
  for (let k = 0; k < 9; k++) { const f = (k + 0.5) / 9, x = Math.round(150 + (194 - 150) * f + Math.sin(k) * 3), y = Math.round(112 - (112 - 18) * f); R.linea(x - 3, y + 2, x, y - 1, M.monte); R.linea(x, y - 1, x + 3, y + 2, M.monteL); R.pset(x, y - 1, M.tinta); }
  for (const [x0, y0, x1, y1] of [[162, 70, 168, 74], [176, 44, 182, 48], [150, 100, 156, 102]]) R.linea(x0, y0, x1, y1, M.linea);
  // marismas: matas en los bordes de la bahía de Jamaica, de Jersey y de Staten Island
  for (let k = 0; k < 60; k++) { const zonas = [[230, 140, 70, 22], [90, 120, 40, 18], [60, 150, 30, 10]], [zx, zy, zw, zh] = zonas[k % 3], x = Math.round(zx + h(k, 1, 1051) * zw), y = Math.round(zy + h(k, 2, 1051) * zh); if (!d.cl[y * 320 + x]) continue; R.pset(x, y, M.marisma); R.pset(x - 1, y - 1, M.marisma); R.pset(x + 1, y - 1, M.marisma); R.pset(x, y - 2, M.bosqueS); }
  // casas largas lenapes (pictogramas) y su humo
  for (const [x, y] of [[226, 60], [120, 166], [250, 124], [60, 40], [176, 30]]) { R.rect(x - 3, y - 2, x + 3, y, M.monte); R.rect(x - 2, y - 3, x + 2, y - 3, M.monte); R.pset(x + 2, y - 1, M.tinta); R.pset(x, y - 5, M.lineaL); R.pset(x + 1, y - 6, M.lineaL); }
  // la playa de Coney: punteado de arena
  for (let x = 190; x < 296; x++) if ((x * 7) % 3 === 0) R.pset(x, 162 + Math.round(Math.sin(x * 0.1)), M.monteL);
}

// una pieza de puzle de cartón: el polígono pts desplazado (ox, oy), con su canto oscuro (alto, px) y su sombra, el
// color de aguada, la trama, el contorno y, si hay, un hueco (la bahía de Jamaica); luz (0–1) la aclara (el destello
// al encajar)
function a_pieza(R, pts, ox, oy, alto, col, hueco, luz = 0) {
  const M = a_MP, P2 = pts.map(([x, y]) => [x + ox, y + oy]);
  if (luz > 0) col = a_mezcla(col, hex('#fffbe8'), Math.min(1, luz) * 0.7);
  R.poligono(P2.map(([x, y]) => [x + 2 + alto, y + 2 + alto]), hex('#6a5a44'));
  for (let k = alto + 1; k >= 1; k--) R.poligono(P2.map(([x, y]) => [x + k, y + k]), a_luz(col, 0.62));
  R.poligono(P2, (x, y) => (h(x >> 1, y >> 1, 1061) < 0.12 ? a_luz(col, 0.9) : (x + y) % 7 === 0 ? a_luz(col, 1.08) : col));
  if (hueco) R.poligono(hueco.map(([x, y]) => [x + ox, y + oy]), (x, y) => ((x + y) % 3 ? M.mar : M.lineaL));
  for (let i = 0; i < P2.length; i++) { const [ax, ay] = P2[i], [bx, by] = P2[(i + 1) % P2.length]; R.linea(ax, ay, bx, by, M.tinta); }
  // el grabado de cada pieza: arbolitos y colinas en «^» repartidos por dentro, y un brillo en el canto de arriba
  const tinta = a_luz(col, 0.55);
  for (let y = 4; y < 178; y += 7) for (let x = 4 + ((y / 7) % 2) * 4; x < 316; x += 9) { const X = x + Math.round((h(x, y, 1062) - 0.5) * 4), Y = y + Math.round((h(x, y, 1063) - 0.5) * 3);
    if (!a_dentro(P2, X, Y) || !a_dentro(P2, X - 3, Y - 3) || !a_dentro(P2, X + 3, Y + 2) || h(X, Y, 1064) < 0.35) continue;
    if (h(X, Y, 1065) < 0.6) { R.pset(X, Y - 2, tinta); R.rect(X - 1, Y - 1, X + 1, Y - 1, tinta); R.pset(X, Y, a_luz(col, 0.7)); } else { R.linea(X - 2, Y + 1, X, Y - 1, tinta); R.linea(X, Y - 1, X + 2, Y + 1, a_luz(col, 1.12)); } }
  for (let i = 0; i < P2.length; i++) { const [ax, ay] = P2[i], [bx, by] = P2[(i + 1) % P2.length]; if (bx < ax) R.linea(ax, ay + 1, bx, by + 1, a_luz(col, 1.15)); }
}
// ¿está (x, y) dentro del polígono pts? (regla par-impar)
function a_dentro(pts, x, y) {
  let d = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) d = !d; } return d;
}

// las pestañas de puzle: un saliente redondo de la pieza (cx, cy el centro, r) con su contorno, hacia la vecina
const a_PESTANAS = { manhattan: [[167, 96, 3]], bronx: [[226, 31, 3]], queens: [[195, 63, 3]], brooklyn: [[250, 98, 3]], staten: [[166, 154, 3]] };

function a_pestana(R, cx, cy, r, col) {
  R.disco(cx + 1, cy + 1, r, a_luz(col, 0.62)); R.disco(cx, cy, r, col); R.disco(cx - 1, cy - 1, r * 0.45, a_luz(col, 1.12));
  for (let a = 0; a < 6.28; a += 0.12) R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), a_MP.tinta);
}

// la vista del noreste: el mapa del 13 (T.mapa) en el estado de Nueva York, con el Hudson, el canal del Erie que se dibuja
// con o.canal (0–1), sus esclusas, las barcazas con mulas y las chinchetas de Nueva York, Albany y Buffalo; o.vista
// 'hudson' (o o.zoom y o.centro) la encuadra más cerca
function a_mapaNoreste(R, t, o) {
  const hud0 = o.vista === 'hudson', libre = hud0 || o.zoom != null || o.centro != null;
  const zoom = o.zoom ?? (hud0 ? 12 : 5.4), centro = o.centro ?? (hud0 ? [-73.95, 41.72] : [-76.2, 42.2]);
  const P = mapa(R, t, { zoom, centro, rosa: libre ? o.rosa : o.rosa ?? [270, 150] }), c = Math.max(0, Math.min(1, o.canal ?? 1));
  a_montesNoreste(R, P, zoom);
  if (zoom > 8) a_bosquesValle(R, P, centro, zoom);
  const hud = [[-74.02, 40.69], [-74.0, 40.9], [-73.93, 41.2], [-73.95, 41.5], [-73.94, 41.75], [-73.95, 42.1], [-73.8, 42.4], [-73.75, 42.65]].map((p) => P(p).map(Math.round));
  const rio = hex('#4a7aa8'), rioL = hex('#7aa4c8');
  const ancho = zoom > 8 ? 2 : 1;
  for (let i = 1; i < hud.length; i++) { for (let w = -ancho + 1; w <= 0; w++) R.linea(hud[i - 1][0] + w, hud[i - 1][1], hud[i][0] + w, hud[i][1], rio); R.linea(hud[i - 1][0] + 1, hud[i - 1][1], hud[i][0] + 1, hud[i][1], rioL); if (ancho > 1) R.linea(hud[i - 1][0] - 2, hud[i - 1][1], hud[i][0] - 2, hud[i][1], hex('#2a4a7a')); }
  // el agua que baja: destellos que corren río abajo
  { let tot = 0; const lg = []; for (let i = 1; i < hud.length; i++) { const l = Math.hypot(hud[i][0] - hud[i - 1][0], hud[i][1] - hud[i - 1][1]); lg.push(l); tot += l; }
    for (let q = 0; q < 10; q++) { let pos = (1 - ((q / 10 + t * 0.025) % 1)) * tot, i = 1; while (i < hud.length - 1 && pos > lg[i - 1]) { pos -= lg[i - 1]; i++; } const f = Math.min(1, pos / lg[i - 1]), x = Math.round(hud[i - 1][0] + (hud[i][0] - hud[i - 1][0]) * f), y = Math.round(hud[i - 1][1] + (hud[i][1] - hud[i - 1][1]) * f);
      if (Math.sin(t * 5 + q * 2) > -0.3 && x > 20 && x < 300 && y > 14 && y < 170) R.pset(x, y, hex('#d8ecf8')); } }
  const canal = [[-73.75, 42.68], [-74.2, 42.85], [-74.9, 42.95], [-75.23, 43.1], [-75.8, 43.08], [-76.15, 43.05], [-76.9, 43.1], [-77.6, 43.16], [-78.2, 43.12], [-78.7, 43.0], [-78.88, 42.89]].map((p) => P(p).map(Math.round));
  const lg = []; let tot = 0; for (let i = 1; i < canal.length; i++) { const l = Math.hypot(canal[i][0] - canal[i - 1][0], canal[i][1] - canal[i - 1][1]); lg.push(l); tot += l; }
  let resto = tot * c, punta = canal[0];
  for (let i = 1; i < canal.length && resto > 0; i++) { const [ax, ay] = canal[i - 1], [bx, by] = canal[i], l = lg[i - 1], f = Math.min(1, resto / l);
    for (let k = 0; k <= l * f; k++) { const x = Math.round(ax + (bx - ax) * k / l), y = Math.round(ay + (by - ay) * k / l); R.pset(x, y - 1, hex('#2a4a7a')); R.pset(x, y, hex('#5a9ad0')); R.pset(x, y + 1, hex('#2a4a7a')); }
    if (f >= 1 && i % 2 === 0) { R.rect(bx - 1, by - 3, bx + 1, by - 2, a_MP.tinta); R.rect(bx - 1, by + 2, bx + 1, by + 3, a_MP.tinta); }
    punta = [ax + (bx - ax) * f, ay + (by - ay) * f]; resto -= l; }
  if (c < 1 && c > 0) { const [px, py] = punta.map(Math.round); R.disco(px, py, 2, a_MP.oroL); R.pset(px, py, hex('#ffffff')); }
  // las barcazas con su mula que tira por el camino de sirga
  if (c >= 1) for (let k = 0; k < 3; k++) { const f = ((t * 0.035 + k / 3) % 1), back = k % 2 === 1, ff = back ? 1 - f : f, pos = ff * tot; let acc = 0, i = 1; while (i < canal.length - 1 && acc + lg[i - 1] < pos) { acc += lg[i - 1]; i++; }
    const [ax, ay] = canal[i - 1], [bx, by] = canal[i], q = Math.min(1, (pos - acc) / lg[i - 1]), x = Math.round(ax + (bx - ax) * q), y = Math.round(ay + (by - ay) * q), dir = back ? -1 : 1;
    R.rect(x - 3, y - 1, x + 3, y, hex('#7a5232')); R.rect(x - 2, y - 2, x + 1, y - 2, hex('#e8c87a')); R.linea(x + 3 * dir, y - 1, x + 9 * dir, y - 4, hex('#c8b088')); R.rect(x + 9 * dir - 1, y - 6, x + 9 * dir + 1, y - 5, hex('#5a4a3a')); R.pset(x + 10 * dir, y - 7, hex('#5a4a3a')); const p = Math.floor(t * 6 + k) % 2; R.pset(x + 9 * dir - 1 + p, y - 4, hex('#3a2a1a')); R.pset(x + 9 * dir + 1 - p, y - 4, hex('#3a2a1a')); }
  if (c >= 1) { const f = (t * 0.06) % 1, i = Math.floor(f * (hud.length - 1)), q = f * (hud.length - 1) - i, [ax, ay] = hud[hud.length - 1 - i], [bx, by] = hud[Math.max(0, hud.length - 2 - i)]; a_barquito(R, ax + (bx - ax) * q + 3, ay + (by - ay) * q, t, 1); }
  const [nx, ny] = P([-74.0, 40.71]).map(Math.round), [ax2, ay2] = P([-73.76, 42.65]).map(Math.round), [bx2, by2] = P([-78.88, 42.89]).map(Math.round);
  chincheta(R, nx, ny, t, a_MP.rojo, { pulso: c >= 1 }); chincheta(R, ax2, ay2, t, hex('#2a4a8a')); chincheta(R, bx2, by2, t, hex('#e8b830'), { baja: c >= 1 ? 1 : Math.max(0, (c - 0.9) * 10) });
  P.sitios = { nuevaYork: [nx, ny], albany: [ax2, ay2], buffalo: [bx2, by2], punta: punta.map(Math.round) };
  return P;
}
// el globo terráqueo grabado que gira despacio sobre el mapa: la esfera con la tierra de pergamino y el mar verdoso, la
// retícula, la luz por la izquierda y la sombra por la derecha, el meridiano de latón alrededor, su sombra en el papel,
// y Londres y Nueva York con su arco cuando miran hacia nosotros. Devuelve la longitud central (ver a_lonGlobo)
const a_GLOBO = { tex: null };
function a_globo(R, t, o) {
  const B = R.buf, cx = 160, cy = 94, r = 62, M = a_MP;
  if (!a_GLOBO.tex) { const tmp = R.nuevo(), prev = R.usar(tmp); mapaPapel(R, 0, equirect([0, 0, 319, 179], [-180, 180, -90, 90]), { mundo: true, relieve: false, reticula: 400 }); R.usar(prev); const cl = new Uint8Array(320 * 180); for (let i = 0; i < tmp.length; i++) { const c = tmp[i], rr = c & 255, b = (c >>> 16) & 255; cl[i] = (rr > b || b - rr > 57) ? 2 : 0; } a_GLOBO.tex = cl; }
  const lonC = a_lonGlobo(t, o), T = a_GLOBO.tex, l0 = lonC * Math.PI / 180, f0 = 28 * Math.PI / 180, sf0 = Math.sin(f0), cf0 = Math.cos(f0);
  // la sombra en el papel
  for (let y = cy - 10; y < Math.min(173, cy + r + 14); y++) for (let x = cx - r + 8; x < Math.min(313, cx + r + 30); x++) { const e = Math.hypot((x - cx - 18) / (r + 4), (y - cy - 12) / (r + 2)); if (e < 1 && a_um(x, y) < (1 - e) * 1.8) B[y * 320 + x] = a_luz(B[y * 320 + x], 0.72); }
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const X = (x + 0.5 - cx) / r, Y = (y + 0.5 - cy) / r, q = X * X + Y * Y; if (q > 1 || a_atom(x, y)) continue;
    const Z = Math.sqrt(1 - q), lat = Math.asin(-Y * cf0 + Z * sf0), lon = l0 + Math.atan2(X, Z * cf0 + Y * sf0), la = lat * 180 / Math.PI, lo = ((lon * 180 / Math.PI + 540) % 360) - 180;
    const tx = Math.min(319, Math.max(0, Math.round((lo + 180) / 360 * 319))), ty = Math.min(179, Math.max(0, Math.round((90 - la) / 180 * 179))), tierra = T[ty * 320 + tx];
    const luz = Math.max(0, -X * 0.55 - Y * 0.45 + Z * 0.7), ret = Math.abs(la % 15) < 0.7 || Math.abs(lo % 15) < 0.7 * (1 / Math.max(0.2, Math.cos(lat)));
    let c = tierra ? (h(tx, ty, 1071) < 0.12 ? M.tierraS : M.tierra) : (h(tx >> 1, ty, 1072) < 0.15 ? M.marS : M.mar);
    if (tierra && (T[ty * 320 + tx + 1] !== tierra || T[(ty + 1) * 320 + tx] !== tierra || T[ty * 320 + tx - 1] !== tierra || T[(ty - 1) * 320 + tx] !== tierra)) c = M.costa;
    if (ret && (x + y) % 2 === 0) c = a_mezcla(c, M.linea, 0.6);
    c = luz > 0.8 ? a_mezcla(c, hex('#fffbe8'), 0.25) : luz < 0.3 ? a_luz(c, 0.62 + luz) : c;
    if (q > 0.92) c = a_luz(c, 0.75);
    B[y * 320 + x] = c; }
  // el brillo del barniz
  R.disco(cx - 24, cy - 26, 5, (x, y) => a_mezcla(B[y * 320 + x], hex('#ffffff'), 0.35));
  // el meridiano de latón y su soporte
  for (let a = 0; a < 6.28; a += 0.01) { const x = Math.round(cx + Math.cos(a) * (r + 4)), y = Math.round(cy + Math.sin(a) * (r + 4)); if (a_atom(x, y)) continue; R.pset(x, y, Math.sin(a) < -0.3 ? M.oroL : M.oro); const x2 = Math.round(cx + Math.cos(a) * (r + 5)), y2 = Math.round(cy + Math.sin(a) * (r + 5)); if (!a_atom(x2, y2)) R.pset(x2, y2, M.oroS); }
  R.rect(cx - 2, cy + r + 5, cx + 2, cy + r + 10, M.oroS); R.rect(cx - 16, cy + r + 10, cx + 16, Math.min(172, cy + r + 13), M.oro); R.rect(cx - 16, Math.min(172, cy + r + 13), cx + 16, Math.min(173, cy + r + 13), M.oroS);
  // Londres y Nueva York si se ven, y el arco entre los dos
  const pr = (lo, la) => { const lam = lo * Math.PI / 180 - l0, phi = la * Math.PI / 180, cz = cf0 * Math.cos(phi) * Math.cos(lam) + sf0 * Math.sin(phi); return [cx + r * Math.cos(phi) * Math.sin(lam), cy - r * (cf0 * Math.sin(phi) - sf0 * Math.cos(phi) * Math.cos(lam)), cz]; };
  const L = pr(-0.13, 51.5), N = pr(-74.0, 40.7);
  if (L[2] > 0.1 && N[2] > 0.1) for (let k = 0; k <= 30; k++) { const f = k / 30, p = pr(-74 + 73.87 * f, 40.7 + 10.8 * f + Math.sin(f * Math.PI) * 9); if (k % 2) R.pset(Math.round(p[0]), Math.round(p[1]), M.rojo); }
  if (L[2] > 0.1) chincheta(R, Math.round(L[0]), Math.round(L[1]), t, hex('#2a4a8a'));
  if (N[2] > 0.1) chincheta(R, Math.round(N[0]), Math.round(N[1]), t, M.rojo, { pulso: true });
  return lonC;
}
// los colores propios de Nueva Ámsterdam y de 1776
const b_P = pal({
  teja: '#c4543a', tejaS: '#8a3226', tejaL: '#e27a56', tejaD: '#5e2420',
  lad: '#a84a34', ladS: '#80382a', ladL: '#c46848', ladO: '#943e2c', ladJ: '#bca08a', borde: '#3a1c18',
  piedra: '#d8d0bc', piedraS: '#a8a08c', piedraL: '#f0eadc',
  contra: '#3a6a4a', contraS: '#24452e', contraL: '#5a8a62', rojoC: '#b8402e', blancoC: '#ece4d0',
  vidrio: '#2a3646', vidrioL: '#8aaac0', marco: '#e8e0cc', puerta: '#2e4a36', puertaS: '#1e3224',
  paja: '#c8a45a', pajaS: '#94743a', pajaL: '#e4c47a', corteza: '#7a6650', cortezaS: '#54443a', cortezaL: '#9a8668',
  cesped: '#6a9a3e', cespedS: '#4a7a2e', cespedL: '#8aba56', tierraT: '#8a6a44', tierraTS: '#6a4e30', tierraTL: '#a8885a',
  barro: '#7a6248', barroS: '#5e4a36', barroL: '#9a8060', adoq: '#8a8278', adoqS: '#6a645c', adoqL: '#aaa298',
  tronco: '#7a5a3a', troncoS: '#523c26', troncoL: '#a07a52',
  lona: '#ece4cc', lonaS: '#c4b898', lonaL: '#fbf6e8', lonaD: '#9a8e70',
  cobre: '#c8783a', cobreS: '#8a4a22', cobreL: '#f4b878', hierro: '#4a4a52', hierroL: '#8a8a96',
});

const b_id = (c) => c;

const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// el umbral de la trama ordenada 4×4 en (x, y)
const b_um = (x, y) => b_BAYER[((y & 3) << 2) | (x & 3)];

const b_lim = (u) => Math.max(0, Math.min(1, u));

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function b_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// un tinte con memoria: mezcla cada color con col en la proporción a (para la noche, el alba o la lejanía)
function b_tinte(col, a) {
  if (a <= 0) return b_id;
  const m = new Map();
  return (c) => { let v = m.get(c); if (v === undefined) { v = b_mezcla(c, col, a); m.set(c, v); } return v; };
}

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma. Mientras
// se pinta, marca() guarda una foto: al acabar, cada píxel recibe en la máscara el número de la primera foto con la que
// aún coincide (1 = el cielo, 2 = lo que se pintó después: agua, campo…), para pintar luego nubes, olas y lo lejano solo
// por detrás de lo demás; delante() abre lo que va por delante de lo que se pinta en cada fotograma (máscara 255, que
// b_delante vuelve a copiar encima); post(c): un retoque de color que se aplica al final a todo (y a las fotos)
const b_capas = new Map();

function b_capa(R, clave, dibuja, post = null) {
  let c = b_capas.get(clave);
  if (!c) {
    const b = R.nuevo(), prev = R.usar(b), fotos = []; let fd = null;
    const info = dibuja(() => fotos.push(b.slice()), () => { fd = b.slice(); }) || {};
    R.usar(prev);
    if (post) for (const a of [b, fd, ...fotos]) if (a) for (let i = 0; i < 57600; i++) a[i] = post(a[i]);
    const m = new Uint8Array(57600); let d0 = 180, d1 = -1;
    for (let i = 0; i < 57600; i++) {
      if (fd && b[i] !== fd[i]) { m[i] = 255; const y = (i / 320) | 0; if (y < d0) d0 = y; if (y > d1) d1 = y; continue; }
      for (let k = 0; k < fotos.length; k++) if (fotos[k][i] === b[i]) { m[i] = k + 1; break; }
    }
    c = { b, m, info, d: [d0, d1] }; b_capas.set(clave, c);
  }
  return c;
}

// vuelve a copiar encima lo que la capa tiene por delante
function b_delante(R, cap) {
  const B = R.buf, { b, m } = cap;
  for (let i = cap.d[0] * 320, f = (cap.d[1] + 1) * 320; i < f; i++) if (m[i] === 255) B[i] = b[i];
}

// pset solo donde la máscara vale v (o cumple v si es una función)
function b_psM(B, m, v, x, y, c) {
  x |= 0; y |= 0; if (x < 0 || x > 319 || y < 0 || y > 179) return; const k = m[y * 320 + x];
  if (typeof v === 'function' ? v(k) : k === v) B[y * 320 + x] = c;
}

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, color], …]
function b_degradado(R, y0, y1, P, x0 = 0, x1 = 319) {
  const B = R.buf, alto = y1 - y0, tr = 3, lim = P.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; for (let x = x0; x <= x1; x++) B[f + x] = b >= 0 && b_um(x, y) < p ? b : a;
  }
}

const b_hx = (P) => P.map(([f, c]) => [f, hex(c)]);

const b_CIELOS = {
  dia: b_hx([[0, '#3a86d6'], [0.2, '#4a9ee6'], [0.42, '#6cb6ee'], [0.64, '#8ec8f0'], [0.82, '#b0daf2'], [0.95, '#d8eaee']]),
  otono: b_hx([[0, '#4a8ad0'], [0.25, '#62a2e0'], [0.5, '#86bae8'], [0.72, '#aacfee'], [0.9, '#d4e2e8']]),
  alba: b_hx([[0, '#3c4a78'], [0.25, '#5e6290'], [0.48, '#9a86a6'], [0.68, '#d2a2a4'], [0.84, '#eec2a4'], [0.95, '#f6dcb4']]),
  noche: b_hx([[0, '#080c22'], [0.3, '#0e1430'], [0.58, '#161e40'], [0.8, '#202a52'], [0.94, '#2a3460']]),
};

const b_NUBES = { dia: ['#a8c8e6', '#d8ecfa', '#ffffff'].map(hex), otono: ['#b0c8e0', '#e0ecf6', '#ffffff'].map(hex), alba: ['#9a7a96', '#d8a4a4', '#f8d8bc'].map(hex), noche: ['#1a2040', '#2a3258', '#6a76a8'].map(hex) };

// el sol con su halo tramado (en la capa fija)
function b_sol(R, x, y, r, c = hex('#fff4c8'), halo = hex('#fff0b0')) {
  for (let j = -r * 3; j <= r * 3; j++) for (let i = -r * 3; i <= r * 3; i++) { const d = Math.hypot(i, j); if (d > r && d < r * 3 && b_um(x + i, y + j) < 0.5 * (1 - (d - r) / (r * 2))) { const p = R.pget(x + i, y + j); R.pset(x + i, y + j, b_mezcla(p, halo, 0.45)); } }
  R.disco(x, y, r + 1, b_mezcla(c, halo, 0.5)); R.disco(x, y, r, c);
}

// un disco solo en la máscara
function b_discoM(B, m, v, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x] === v) B[f + x] = x > 270 && y < 48 ? b_mezcla(B[f + x], c, 0.35) : c; } }   // detrás de Atom, la nube apenas se nota
}

// cúmulo de tres tonos (sombra, cuerpo, luz) con la base plana, solo en la máscara v; ap < 1 lo aplasta
function b_nubeM(B, m, v, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) b_discoM(B, m, v, x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) b_discoM(B, m, v, x, y, r, c[1]);
  for (const [x, y, r] of bolas) b_discoM(B, m, v, x - 1, y - 2, r * 0.66, c[2]);
  const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.47); x <= Math.round(cx + w * 0.47); x++) { b_psM(B, m, v, x, y0, c[0]); b_psM(B, m, v, x, y0 + 1, c[0]); }
}

// el cielo que se mueve (solo en la máscara 1): cirros altos casi quietos, cúmulos lejanos pequeños y lentos junto al
// horizonte, medianos y grandes más deprisa; de noche, estrellas que titilan y nubes oscuras con el canto de luna
function b_cieloVivo(R, t, m, hor, modo = 'dia', viento = 0.4) {
  const B = R.buf, cn = b_NUBES[modo] ?? b_NUBES.dia, v = 0.6 + viento * 2.4;
  if (modo === 'noche') for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 620) * 319), y = Math.round(h(k, 2, 620) ** 1.3 * (hor - 6)); if (x > 272 && y < 48) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 620) * 2) + k * 1.7); if (tw > -0.3) b_psM(B, m, 1, x, y, tw > 0.55 ? hex('#f4f0e0') : hex('#7a84b0')); if (k % 11 === 0 && tw > 0.8) for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) b_psM(B, m, 1, x + i, y + j, hex('#7a84b0')); }
  for (let k = 0; k < 4; k++) { const w = 40 + Math.round(h(k, 5, 622) * 50), x0 = ((h(k, 6, 622) * 440 + t * (0.5 + k * 0.2)) % 480) - 90, y = 14 + k * 7 + Math.round(h(k, 7, 622) * 4);
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = Math.sin(i / w * Math.PI), yy = y - Math.round((i / w) ** 2 * 3); if ((x > 270 && yy < 48) || h(i >> 2, k, 623) < 0.22 || yy >= hor - 4) continue; b_psM(B, m, 1, x, yy, e > 0.4 ? cn[1] : cn[0]); if (e > 0.6 && i % 3) b_psM(B, m, 1, x + 2, yy - 1, cn[2]); } }
  const cap = [[3, 0.9, hor - 14, 12, 18], [3, 2.2, Math.max(30, hor - 34), 22, 34], [2, 4.2, Math.max(40, hor - 50), 40, 56]];
  cap.forEach(([n, vel, y, w0, w1], c) => { for (let k = 0; k < n; k++) { const w = w0 + Math.round(h(k, c, 630) * (w1 - w0)), x = ((h(k, c + 4, 630) * 470 + t * vel * v) % 520) - 100, yy = y + Math.round(h(k, c + 8, 630) * 8) - 4; b_nubeM(B, m, 1, x, yy, w, k + c * 5 + 3, cn, c === 0 ? 0.7 : 1); } });
}

// gaviotas que planean en círculos amplios y aletean de vez en cuando (n, en la franja y0–y1; c: su color)
function b_gaviotas(R, t, n, y0, y1, c = hex('#f4f2ec'), cS = hex('#5a5e6a'), tn = b_id) {
  for (let k = 0; k < n; k++) { const v = 8 + h(k, 1, 640) * 10, d = k % 2 ? 1 : -1, x = Math.round(d > 0 ? ((t * v + h(k, 2, 640) * 400) % 400) - 40 : 360 - ((t * v + h(k, 2, 640) * 400) % 400)), y = Math.round(y0 + h(k, 3, 640) * (y1 - y0) + Math.sin(t * 0.8 + k) * 4);
    if (x > 270 && y < 48) continue; const ala = Math.sin(t * (5 + k) + k * 2) > 0.2 ? -1 : 1;
    R.pset(x, y, tn(c)); R.pset(x - 1, y + (ala < 0 ? -1 : 0), tn(c)); R.pset(x + 1, y + (ala < 0 ? -1 : 0), tn(c)); R.pset(x - 2, y + ala, tn(cS)); R.pset(x + 2, y + ala, tn(cS)); R.pset(x + d, y + 1, tn(hex('#e8a040'))); }
}

// el agua viva: rizos claros con su sombra que corren por las filas (más largos y separados cuanto más cerca), y
// destellos que se encienden; solo en la máscara v (P: [claro, oscuro, destello])
function b_aguaViva(R, t, m, v, y0, y1, P, dens = 1, vel = 1) {
  const B = R.buf;
  for (let y = y0; y <= y1; y += 2) { const u = (y - y0) / Math.max(1, y1 - y0), n = Math.round((6 + u * 4) * dens), L = 2 + Math.round(u * 7), sp = (4 + u * 10) * vel;
    for (let k = 0; k < n; k++) { const x0 = Math.round(((h(k, y, 650) * 360 + t * sp * (k % 2 ? 1 : 0.6) + Math.sin(t * 1.3 + k + y) * 3) % 360) - 20), ola = Math.sin(t * 2 + k * 1.7 + y * 0.3);
      if (ola < -0.3) continue; for (let i = 0; i < L; i++) { b_psM(B, m, v, x0 + i, y, P[0]); if (i > 0 && i < L - 1) b_psM(B, m, v, x0 + i, y + 1, P[1]); } } }
  for (let k = 0; k < 18 * dens; k++) { const x = Math.round(h(k, 1, 651) * 319), y = Math.round(y0 + h(k, 2, 651) * (y1 - y0)); if (Math.sin(t * 4 + k * 2.3) > 0.85) { b_psM(B, m, v, x, y, P[2]); b_psM(B, m, v, x + 1, y, P[0]); b_psM(B, m, v, x - 1, y, P[0]); } }
}

// el agua de la capa fija: degradado tramado con vetas horizontales claras y oscuras (más cortas a lo lejos)
function b_aguaFija(R, y0, y1, P, k = 0) {
  b_degradado(R, y0, y1 + 1, P);
  for (let y = y0 + 1; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), n = 5 + Math.round(u * 6);
    for (let i = 0; i < n; i++) { const x = Math.round(h(i, y, 660 + k) * 330) - 5, L = 3 + Math.round(u * 12 * h(i, y, 661 + k)), c = R.pget(Math.max(0, Math.min(319, x)), y); R.rect(x, y, x + L, y, b_mezcla(c, i % 3 ? hex('#ffffff') : hex('#0a1a2a'), i % 3 ? 0.12 : 0.18)); } }
}

// ladrillo visto: hiladas de 3 px (2 de pieza y 1 de junta), con medio desfase, piezas más claras y más oscuras y la
// mancha de hollín bajo el alero; esc < 0.6: hiladas de 2 px con la junta oscura (de lejos)
function b_ladrillos(R, x0, y0, x1, y1, P, k = 0, esc = 1) {
  const B = R.buf; x0 = Math.max(0, Math.round(x0)); x1 = Math.min(319, Math.round(x1)); y0 = Math.max(0, Math.round(y0)); y1 = Math.min(179, Math.round(y1));
  const ah = esc < 0.6 ? 2 : 3, an = esc < 0.6 ? 4 : 6, jun = esc < 0.6 ? P.ladS : P.ladJ;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor(y / ah), jy = y % ah === ah - 1, off = (fila & 1) * (an >> 1), f = y * 320;
    for (let x = x0; x <= x1; x++) { let c;
      if (jy) c = esc < 0.6 && (x & 1) ? P.ladO : jun;
      else { const px = Math.floor((x + off) / an); if ((x + off) % an === 0 && esc >= 0.6) c = jun; else { const r = h(px, fila, 700 + k); c = r < 0.14 ? P.ladS : r < 0.3 ? P.ladL : r < 0.4 ? P.ladO : P.lad; } }
      B[f + x] = c; } }
}

// una ventana holandesa: marco claro, vidrio emplomado con su brillo, dintel de piedra, alféizar y las contraventanas
// (abiertas a los lados, con tablas en diagonal rojas y blancas o verdes); luz: el cristal encendido
function b_ventana(R, x, y, w, a, P, o = {}) {
  const { rect, pset } = R, luz = o.luz, cv = o.contra ?? 'verde';
  rect(x - 1, y - 2, x + w, y - 1, P.piedraL); rect(x - 1, y - 1, x + w, y - 1, P.piedraS);   // el dintel
  rect(x - 1, y, x + w, y + a, P.borde); rect(x, y, x + w - 1, y + a - 1, P.marco);
  rect(x + 1, y + 1, x + w - 2, y + a - 2, luz ? hex('#f0c060') : P.vidrio);
  if (w > 4) { for (let j = y + 2; j < y + a - 2; j += 2) for (let i = x + 1 + (j & 2 ? 1 : 0); i < x + w - 1; i += 2) pset(i, j, luz ? hex('#f8dc90') : hex('#38465a')); rect(x + (w >> 1), y + 1, x + (w >> 1), y + a - 2, P.marco); }
  if (a > 6) rect(x + 1, y + (a >> 1), x + w - 2, y + (a >> 1), P.marco);
  if (!luz) { pset(x + 1, y + 1, P.vidrioL); if (w > 3) pset(x + 2, y + 1, P.vidrioL); }
  rect(x - 1, y + a, x + w, y + a, P.piedraL); rect(x - 1, y + a + 1, x + w, y + a + 1, P.ladS);   // el alféizar
  if (cv && w > 3) { const cw = Math.max(2, (w >> 1)), [c0, c1] = cv === 'roja' ? [P.rojoC, P.blancoC] : [P.contra, P.contraL];
    for (const [sx, d] of [[x - 1 - cw, 1], [x + w + 1, -1]]) { rect(sx, y, sx + cw - 1, y + a - 1, P.borde); for (let j = y + 1; j < y + a - 1; j++) for (let i = sx + 1; i < sx + cw - 1 || (cw <= 2 && i < sx + cw); i++) pset(i, j, ((i * d + j) >> 1) & 1 ? c0 : c1); if (cw > 2) rect(d > 0 ? sx + cw - 1 : sx, y, d > 0 ? sx + cw - 1 : sx, y + a - 1, P.contraS); } }
}

// una casa de ladrillo con gablete escalonado (frente a la calle): el gablete en o.pasos escalones con su albardilla de
// piedra, la ventanita del desván con la viga de izar y su gancho, las ventanas de cada piso con contraventanas, las
// anclas de hierro, la puerta partida con su banco de piedra y la sombra del lado derecho; esc: tamaño (0,4–1,4)
function b_casaEsc(R, x0, x1, base, alero, cima, P, k, o = {}) {
  const { rect, pset } = R, esc = o.esc ?? 1, n = o.pasos ?? 4, w = x1 - x0, sh = (alero - cima) / (n + 1), dx = (w / 2 - Math.max(1.5, w * 0.13)) / n;
  const bandas = []; for (let i = 0; i <= n; i++) bandas.push([Math.round(x0 + i * dx), Math.round(alero - (i + 1) * sh), Math.round(x1 - i * dx), Math.round(alero - i * sh) - 1]);
  rect(x0 - 1, alero, x1 + 1, base, P.borde); for (const [xa, ya, xb, yb] of bandas) rect(xa - 1, ya - 1, xb + 1, yb, P.borde);
  b_ladrillos(R, x0, alero, x1, base, P, k, esc); for (const [xa, ya, xb, yb] of bandas) b_ladrillos(R, xa, ya, xb, yb, P, k, esc);
  bandas.forEach(([xa, ya, xb], i) => { const nx = i < n ? bandas[i + 1][0] - 1 : xb, mx = i < n ? bandas[i + 1][2] + 1 : xa; rect(xa - 1, ya - 1, nx, ya - 1, P.piedraL); rect(mx, ya - 1, xb + 1, ya - 1, P.piedraL); if (esc >= 0.6) { rect(xa, ya, nx, ya, P.piedraS); rect(mx, ya, xb, ya, P.piedraS); } });
  const top = bandas[n]; rect(top[0] - 1, top[1] - 2, top[2] + 1, top[1] - 1, P.piedraL); const cx = Math.round((x0 + x1) / 2);
  if (esc >= 0.6) { rect(cx, top[1] - 5, cx, top[1] - 3, P.hierro); pset(cx - 1, top[1] - 5, P.hierro); pset(cx + 1, top[1] - 6, P.hierro); }
  // la ventanita del desván y la viga de izar con su gancho
  const yv = Math.round(alero - sh * 2.4), wv = Math.max(2, Math.round(4 * esc));
  rect(cx - (wv >> 1) - 1, yv - 1, cx + (wv >> 1), yv + Math.round(5 * esc), P.borde); rect(cx - (wv >> 1), yv, cx + (wv >> 1) - 1, yv + Math.round(5 * esc) - 1, esc >= 0.6 ? P.puerta : P.vidrio);
  if (esc >= 0.6) { rect(cx - 1, top[1] + 1, cx + 1, top[1] + 2, P.tronco); pset(cx, top[1] + 3, P.hierro); pset(cx, top[1] + 4, P.hierro); }
  // los pisos: ventanas con contraventanas y anclas de hierro
  const pisoH = Math.max(7, Math.round(15 * esc)), ww = Math.max(2, Math.round(6 * esc)), wa = Math.max(3, Math.round(8 * esc)), nV = w > 30 * esc ? 3 : 2;
  let fila = 0;
  for (let y = alero + Math.round(3 * esc); y + wa < base - pisoH + 2; y += pisoH, fila++) for (let i = 0; i < nV; i++) {
    const vx = Math.round(x0 + (w * (i + 0.5)) / nV - ww / 2); b_ventana(R, vx, y, ww, wa, P, { contra: esc >= 0.6 ? ((k + i + fila) % 3 === 0 ? 'roja' : 'verde') : null, luz: o.luces && h(k, i + fila * 3, 710) < 0.4 });
    if (esc >= 0.6 && i < nV - 1) { const ax = Math.round(x0 + (w * (i + 1)) / nV); rect(ax, y + wa + 3, ax, y + wa + 5, P.borde); pset(ax - 1, y + wa + 3, P.borde); pset(ax + 1, y + wa + 5, P.borde); }
  }
  // la puerta partida, el montante, el banco de piedra y el escalón
  const pw = Math.max(3, Math.round(8 * esc)), pa = Math.max(5, Math.round(13 * esc)), px = o.puertaX ?? (Math.round(x0 + w * 0.3) - (pw >> 1));
  rect(px - 1, base - pa - 1, px + pw, base, P.borde); rect(px, base - pa, px + pw - 1, base - 1, P.puerta); rect(px + pw - 2, base - pa, px + pw - 1, base - 1, P.puertaS);
  if (esc >= 0.6) { rect(px, base - pa + Math.round(pa * 0.45), px + pw - 1, base - pa + Math.round(pa * 0.45), P.puertaS); pset(px + pw - 3, base - Math.round(pa * 0.4), P.oro ?? hex('#e8b830')); rect(px, base - pa - 3, px + pw - 1, base - pa - 2, hex('#f0d080')); rect(px - 3, base - 3, px - 2, base, P.piedraS); rect(px + pw + 1, base - 3, px + pw + 2, base, P.piedraS); rect(px - 3, base - 4, px - 2, base - 4, P.piedraL); rect(px + pw + 1, base - 4, px + pw + 2, base - 4, P.piedraL); }
  rect(x0, base - Math.max(1, Math.round(2 * esc)), x1, base, P.piedraS); rect(x0, base - Math.max(1, Math.round(2 * esc)), x1, base - Math.max(1, Math.round(2 * esc)), P.piedra);
  // la sombra del lado derecho y del alero
  const somb = (xb, y0, y1) => { for (let y = y0; y <= y1; y++) for (let x = xb - Math.max(1, Math.round(3 * esc)); x <= xb; x++) { const c = R.pget(x, y); if (c !== P.borde && ((x + y) & 1 || x > xb - 2)) pset(x, y, b_mezcla(c, P.borde, 0.3)); } };
  somb(x1, alero, base); for (const [, ya, xb, yb] of bandas) somb(xb, ya, yb);
  return { cx, top: top[1] - 2, puerta: [px, base - pa, px + pw - 1, base] };
}

// una casa de ladrillo con tejado de tejas rojas (el alero a la calle): la fachada, las hiladas de tejas curvas con su
// canto de luz y su sombra, alguna teja oscura o con musgo, la cumbrera, la buhardilla y dos chimeneas de ladrillo
function b_casaTeja(R, x0, x1, base, alero, cumbre, P, k, o = {}) {
  const { rect, pset } = R, esc = o.esc ?? 1, w = x1 - x0, B = R.buf;
  rect(x0 - 1, alero, x1 + 1, base, P.borde); b_ladrillos(R, x0, alero + 1, x1, base, P, k + 5, esc);
  const ah = esc < 0.6 ? 2 : 3;
  for (let y = cumbre; y < alero; y++) { const ins = Math.floor((y - cumbre) / 3), xa = Math.max(0, x0 - 2 + Math.round((alero - y) * 0.25)), xb = Math.min(319, x1 + 2 - Math.round((alero - y) * 0.25)), fila = Math.floor((y - cumbre) / ah), r = (y - cumbre) % ah;
    for (let x = xa; x <= xb; x++) { let c; const q = (x - x0 + fila * 2 + 400) % 4;
      if (x === xa || x === xb || y === cumbre) c = P.borde; else if (y === cumbre + 1) c = P.tejaD; else if (r === ah - 1) c = P.tejaS; else c = q === 0 ? P.tejaS : q === 2 ? P.tejaL : P.teja;
      if (c === P.teja && h(Math.floor((x - x0) / 4), fila, 720 + k) < 0.08) c = h(x, fila, 721) < 0.5 ? P.tejaD : hex('#7a7a4a');
      B[y * 320 + x] = c; } void ins; }
  rect(x0 - 2, alero, x1 + 2, alero, P.tronco); rect(x0 - 2, alero + 1, x1 + 2, alero + 1, P.troncoS);   // el canalón de madera
  const ch = [];
  for (const cxh of o.chimeneas ?? [x0 + Math.round(w * 0.18), x1 - Math.round(w * 0.22)]) { const cw = Math.max(2, Math.round(5 * esc)), ca = Math.max(4, Math.round(9 * esc));
    rect(cxh - 1, cumbre - ca - 1, cxh + cw, cumbre + 2, P.borde); b_ladrillos(R, cxh, cumbre - ca, cxh + cw - 1, cumbre + 2, P, k + 9, esc); rect(cxh - 1, cumbre - ca - 1, cxh + cw, cumbre - ca, P.piedraS); ch.push([cxh + (cw >> 1), cumbre - ca - 2]); }
  if (o.buhardilla !== false && esc >= 0.6) { const bx = Math.round(x0 + w * 0.5) - 4, by = Math.round((cumbre + alero) / 2) - 2; rect(bx - 1, by - 2, bx + 8, by + 7, P.borde); rect(bx, by, bx + 7, by + 7, P.marco); rect(bx + 1, by + 1, bx + 6, by + 6, P.vidrio); rect(bx + 4, by + 1, bx + 4, by + 6, P.marco); pset(bx + 1, by + 1, P.vidrioL); rect(bx - 2, by - 3, bx + 9, by - 2, P.tejaS); rect(bx - 1, by - 4, bx + 8, by - 4, P.teja); }
  const pisoH = Math.max(7, Math.round(15 * esc)), ww = Math.max(2, Math.round(6 * esc)), wa = Math.max(3, Math.round(8 * esc)), nV = Math.max(2, Math.round(w / (14 * esc)));
  for (let y = alero + Math.round(4 * esc), f = 0; y + wa < base - pisoH + 2; y += pisoH, f++) for (let i = 0; i < nV; i++) { const vx = Math.round(x0 + (w * (i + 0.5)) / nV - ww / 2); if (o.puertaI === i && y + wa >= base - pisoH - 2) continue; b_ventana(R, vx, y, ww, wa, P, { contra: esc >= 0.6 ? ((k + i + f) % 2 ? 'verde' : 'roja') : null, luz: o.luces && h(k, i + f * 5, 712) < 0.4 }); }
  const pw = Math.max(3, Math.round(8 * esc)), pa = Math.max(5, Math.round(13 * esc)), px = Math.round(x0 + w * (o.puertaF ?? 0.62));
  rect(px - 1, base - pa - 1, px + pw, base, P.borde); rect(px, base - pa, px + pw - 1, base - 1, k % 2 ? P.puerta : hex('#6a3a2a')); if (esc >= 0.6) { rect(px, base - Math.round(pa * 0.55), px + pw - 1, base - Math.round(pa * 0.55), P.borde); pset(px + 1, base - Math.round(pa * 0.4), hex('#e8b830')); }
  rect(x0, base - 1, x1, base, P.piedraS);
  for (let y = alero; y <= base; y++) for (let x = x1 - Math.max(1, Math.round(2 * esc)); x <= x1; x++) if ((x + y) & 1) pset(x, y, b_mezcla(R.pget(x, y), P.borde, 0.3));
  return { chimeneas: ch, puerta: [px, base - pa, px + pw - 1, base] };
}

// una choza de los primeros colonos (1625): paredes bajas de tablas de corteza y tejado empinado de paja con sus
// manojos, el agujero del humo y la puerta de tablas
function b_choza(R, x0, x1, base, P, k, esc = 0.5) {
  const { rect, pset } = R, hp = Math.max(4, Math.round(9 * esc)), ht = Math.max(5, Math.round(12 * esc)), cx = (x0 + x1) / 2;
  rect(x0 - 1, base - hp - 1, x1 + 1, base, P.borde);
  for (let y = base - hp; y <= base; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x + (y >> 2)) % 3 === 0) ? P.cortezaS : h(x, y >> 1, 730 + k) < 0.3 ? P.cortezaL : P.corteza);
  for (let j = 0; j <= ht; j++) { const y = base - hp - j, hw = Math.round((x1 - x0) / 2 + 2 - j * ((x1 - x0) / 2 + 2) / (ht + 1)); for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) pset(x, y, x === Math.round(cx - hw) || x === Math.round(cx + hw) ? P.pajaS : ((x * 3 + j * 2) % 5 === 0 ? P.pajaS : (x + j) % 7 === 0 ? P.pajaL : P.paja)); }
  rect(Math.round(cx) - 1, base - hp - ht - 1, Math.round(cx), base - hp - ht, P.borde);
  const pw = Math.max(2, Math.round(4 * esc)); rect(Math.round(cx) - 1, base - Math.max(3, Math.round(7 * esc)), Math.round(cx) - 1 + pw, base, P.cortezaS);
  return [Math.round(cx), base - hp - ht - 2];
}

// humo de chimenea: bolitas de tres tonos que suben, crecen, se deshacen y se tuercen con el viento
function b_humo(R, x, y, t, k = 0, o = {}) {
  const alto = o.alto ?? 22, vto = o.viento ?? 0.6, cs = o.cols ?? [hex('#9a9aa6'), hex('#c4c4cc'), hex('#e8e8ec')], tn = o.tn ?? b_id;
  for (let i = 0; i < 6; i++) { const u = ((t * (o.vel ?? 0.35) + i / 6 + h(k, i, 740) * 0.1) % 1), r = 0.6 + u * (o.r ?? 3), xx = x + u * alto * vto + Math.sin(u * 6 + k + t) * 1.5, yy = y - u * alto;
    if (u > 0.92) continue; R.disco(Math.round(xx), Math.round(yy) + 1, r, tn(cs[0])); R.disco(Math.round(xx), Math.round(yy), r * 0.85, tn(cs[1])); if (r > 1.5) R.disco(Math.round(xx - r * 0.3), Math.round(yy - r * 0.3), r * 0.45, tn(cs[2])); }
}

// una bandera que ondea, colgada de (x, y) hacia dir: 'holandesa' (naranja, blanca y azul), 'inglesa' (blanca con la
// cruz roja de San Jorge), 'blanca', 'britanica' (la enseña roja con el cantón de la Union de 1707, sin aspa roja), 'barras' (trece barras y el cantón
// azul con estrellas) o 'cuartel' (azul con estrellas blancas: el banderín de la tienda de Washington)
function b_bandera(R, x, y, t, tipo, w = 14, a = 9, o = {}) {
  const d = o.dir ?? 1, tn = o.tn ?? b_id, amp = o.amp ?? 1.6, vel = o.vel ?? 6;
  const col = { naranja: hex('#e8783a'), blanco: hex('#f4f0e6'), azul: hex('#2a3a7a'), rojo: hex('#c8303a') };
  for (let i = 0; i < w; i++) { const fase = t * vel - i * 0.55, dy = Math.round(Math.sin(fase) * amp * (i / w)), sombra = Math.cos(fase) < -0.45, luz = Math.cos(fase) > 0.7, xx = x + d * (i + 1), corta = i > w - 3 && (i + Math.floor(t * 4)) % 2 ? 1 : 0;
    for (let j = corta; j < a - corta; j++) { const v = j / a; let c;
      if (tipo === 'holandesa') c = v < 1 / 3 ? col.naranja : v < 2 / 3 ? col.blanco : col.azul;
      else if (tipo === 'inglesa') c = Math.abs(j - (a - 1) / 2) < a * 0.14 || Math.abs(i - (w - 1) / 2.2) < w * 0.09 ? col.rojo : col.blanco;
      else if (tipo === 'blanca') c = col.blanco;
      else if (tipo === 'britanica') { c = col.rojo; if (i < w * 0.45 && j < a * 0.55) { const ci = i / (w * 0.45), cj = j / (a * 0.55); c = Math.abs(ci - 0.5) < 0.12 || Math.abs(cj - 0.5) < 0.16 ? col.rojo : Math.abs(ci - cj) < 0.14 || Math.abs(ci + cj - 1) < 0.14 ? col.blanco : col.azul; } }
      else if (tipo === 'barras') { c = Math.floor(v * 13) % 2 ? col.blanco : col.rojo; if (i < w * 0.42 && j < a * 0.54) c = (i + j) % 3 === 0 && i > 0 && j > 0 ? col.blanco : col.azul; }
      else c = (i % 3 === 1 && j % 3 === 1) ? col.blanco : col.azul;
      if (sombra) c = b_mezcla(c, hex('#1c1222'), 0.28); else if (luz) c = b_mezcla(c, hex('#ffffff'), 0.18);
      R.pset(xx, y + j + dy, tn(c)); }
    R.pset(xx, y + a - corta + dy, tn(hex('#1c1222'))); }
}
// gente pequeña de fondo (de 7 a 9 px): sombrero, cara, casaca, calzas y piernas que andan; k elige la ropa; o.carga:
// 'saco' (al hombro), 'barrica' (la rueda delante) o 'cesto' (tierra para el fuerte); o.quieto; o.tn: tinte
function b_figurita(R, x, y, t, k, o = {}) {
  const tn = o.tn ?? b_id, d = o.dir ?? 1, ps = (i, j, c) => R.pset(Math.round(x + i * d), Math.round(y - j), tn(c)), anda = !o.quieto, p = anda ? Math.floor(t * 6 + k) % 2 : 0;
  const ropa = o.ropa ?? [['#3a3a4a', '#6a3a2a'], ['#2a3a5a', '#8a6a3a'], ['#5a2a2a', '#3a3a3a'], ['#4a4a2a', '#2a2a3a'], ['#2a2a2a', '#c8b48a'], ['#6a4a8a', '#3a2a2a']][k % 6].map(hex);
  const piel = hex(['#f0c8a0', '#d8a078', '#a87050', '#f4d0b0'][k % 4]), som = hex(k % 3 ? '#2a1e1a' : '#1a1a1a');
  ps(0, 0, som); ps(2, 0, som); if (p) { ps(0, 1, ropa[1]); ps(2, 1, som); } else { ps(0, 1, som); ps(2, 1, ropa[1]); }
  for (let j = 2; j <= 5; j++) for (let i = 0; i <= 2; i++) ps(i, j, j === 2 ? ropa[1] : ropa[0]);
  if (k % 2 === 0) ps(1, 3, hex('#e8e0cc'));
  ps(1, 6, piel); ps(2, 6, piel); ps(0, 6, piel); ps(0, 7, som); ps(1, 7, som); ps(2, 7, som); ps(-1, 7, k % 3 === 2 ? hex('#e8e0cc') : som); ps(3, 7, som); ps(1, 8, som);
  if (o.carga === 'saco') { ps(0, 7, hex('#c8b48a')); ps(-1, 7, hex('#c8b48a')); ps(-1, 6, hex('#a8946a')); ps(0, 8, hex('#c8b48a')); ps(-1, 8, hex('#a8946a')); }
  else if (o.carga === 'barrica') { const g = Math.floor(t * 6) % 3; for (let j = 0; j <= 3; j++) for (let i = 4; i <= 6; i++) ps(i, j, (j === 1 || j === 3) && i !== 5 ? hex('#4a4a52') : (i + g) % 3 === 0 ? hex('#6a4426') : hex('#8a5a32')); ps(3, 3, piel); }
  else if (o.carga === 'cesto') { ps(3, 4, piel); for (let i = 3; i <= 5; i++) { ps(i, 5, hex('#a8843a')); ps(i, 6, hex('#7a6248')); } }
}

// Nueva Ámsterdam desde el agua (o.encuadre 'puerto')
function b_puerto(R, t, o) {
  const P = b_P, crece = b_lim(o.crece ?? 1), ing = b_lim(o.ingleses ?? 0), hechas = Math.round(crece * 8), fase = crece < 0.12 ? 0 : 1;
  const ORDEN = [3, 1, 5, 0, 6, 2, 7, 4], hechaK = (k) => ORDEN.indexOf(k) < hechas, chozaK = (k) => !hechaK(k) && (crece > 0.03 || k % 2 === 0);
  const SLOT = [[121, 134], [135, 149], [150, 162], [163, 178], [179, 192], [193, 207], [208, 221], [222, 236]];
  const AGUA = [hex('#9ac4d8'), hex('#6aa0be'), hex('#4a82a6'), hex('#3a6e8e'), hex('#2c5a78')];
  const cap = b_capa(R, 'na-puerto|' + hechas + '|' + fase, (marca, delante) => {
    const { rect, pset, disco, linea, poligono } = R;
    b_degradado(R, 0, 100, b_CIELOS.dia); b_sol(R, 214, 30, 7); marca();
    // las colinas lejanas de la isla y sus bosques, en dos términos
    for (let x = 0; x < 320; x++) { const y1 = 80 + Math.round(Math.sin(x / 41) * 4 + Math.sin(x / 13 + 1) * 1.5), y2 = 88 + Math.round(Math.sin(x / 29 + 2) * 3 + Math.sin(x / 9) * 1.2);
      for (let y = y1; y < 104; y++) pset(x, y, y < y2 ? (b_um(x, y) < 0.3 ? hex('#7a9ab0') : hex('#8aa8ba')) : hex('#5a8064'));
      for (let y = y2; y < 104; y++) pset(x, y, (h(x >> 1, y >> 1, 750) < 0.3 ? hex('#4a7056') : h(x, y, 751) < 0.15 ? hex('#6a9070') : hex('#557a5c'))); }
    for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 752) * 320), y = 90 + Math.round(h(k, 2, 752) * 12); disco(x, y, 2 + h(k, 3, 752) * 2, hex('#456a50')); disco(x - 1, y - 1, 1.2, hex('#6a9474')); }
    marca();
    // la tierra del pueblo: prado, el camino de la orilla con roderas y el muro de tablas del muelle
    for (let y = 100; y <= 123; y++) for (let x = 0; x < 320; x++) { let c = (h(x >> 1, y, 753) < 0.25 ? P.cespedS : h(x, y, 754) < 0.1 ? P.cespedL : P.cesped);
      if (y >= 116 && y <= 120) c = y === 118 && (x % 9 < 6) ? P.tierraTS : h(x, y, 755) < 0.2 ? P.tierraTL : P.tierraT; if (y >= 121) c = y === 121 ? P.troncoL : (x % 7 === 0 ? P.troncoS : P.tronco); pset(x, y, c); }
    for (let x = 3; x < 320; x += 7) rect(x, 121, x, 123, P.troncoS);
    // el fuerte: murallas de tierra con césped, bastiones en punta, empalizada; dentro, la iglesia de dos tejados
    if (fase) { const [x0, x1] = [56, 92]; rect(x0 - 1, 72, x1 + 1, 98, P.borde); rect(x0, 82, x1, 98, P.piedra); for (let y = 82; y < 98; y += 3) for (let x = x0; x <= x1; x++) if ((x + (y >> 1)) % 5 === 0) pset(x, y, P.piedraS);
      for (const [a, b] of [[x0, 74], [74, x1]]) { poligono([[a - 1, 82], [(a + b) / 2, 69], [b + 1, 82]], P.borde); poligono([[a + 1, 82], [(a + b) / 2, 71], [b - 1, 82]], P.tejaS); for (let y = 73; y < 82; y += 2) linea((a + b) / 2 - (y - 71) * 0.9, y, (a + b) / 2 + (y - 71) * 0.9, y, P.teja); }
      rect(72, 60, 76, 72, P.borde); rect(73, 61, 75, 72, P.piedraS); poligono([[71, 61], [74, 54], [77, 61]], P.borde); pset(74, 53, P.hierro); pset(74, 52, P.hierro); for (const vx of [62, 70, 80, 88]) rect(vx, 86, vx + 1, 90, P.vidrio);
      b_casaTeja(R, 96, 112, 98, 88, 82, P, 3, { esc: 0.45, buhardilla: false, chimeneas: [99] }); }
    const fx0 = 14, fx1 = 122, fy = 100;
    poligono([[fx0, 121], [fx0 + 6, fy + (fase ? 0 : 8)], [fx1 - 6, fy + (fase ? 0 : 8)], [fx1, 121]], P.borde);
    for (let y = fy + (fase ? 1 : 9); y < 121; y++) { const u = (y - fy) / 21; for (let x = Math.round(fx0 + 6 - u * 6) + 1; x < Math.round(fx1 - 6 + u * 6); x++) pset(x, y, y < fy + 4 && fase ? (h(x, y, 756) < 0.3 ? P.cespedL : P.cesped) : ((x + y * 2) % 7 === 0 ? P.tierraTS : h(x >> 1, y, 757) < 0.2 ? P.tierraTL : P.tierraT)); }
    for (const bx of [fx0 + 3, fx1 - 3, 68]) { poligono([[bx - 9, 121], [bx, fy - 3 + (fase ? 0 : 8)], [bx + 9, 121]], P.borde); poligono([[bx - 7, 121], [bx, fy - 1 + (fase ? 0 : 8)], [bx + 7, 121]], P.tierraT); for (let y = fy + 1; y < 121; y += 3) linea(bx - (y - fy) * 0.35, y, bx + (y - fy) * 0.35, y, P.tierraTS); poligono([[bx - 3, fy + 4 + (fase ? 0 : 8)], [bx, fy - 1 + (fase ? 0 : 8)], [bx + 3, fy + 4 + (fase ? 0 : 8)]], P.cesped); }
    const yP = fy - (fase ? 4 : -6); for (let x = fx0 + 6; x < fx1 - 6; x += 2) { if (!fase && x > 70) break; rect(x, yP, x, yP + 4, P.troncoS); pset(x, yP - 1, P.troncoL); }
    if (!fase) for (let k = 0; k < 7; k++) { const x = 74 + k * 6; rect(x, fy + 6 - (k % 3), x + 3, fy + 8, P.tierraTL); }   // los montones de tierra de la obra
    rect(69, 60, 69, 100, P.borde); rect(70, 60, 70, 100, P.troncoL);   // el mástil de la bandera
    // las casas de la orilla: ladrillo (gablete o tejas), chozas de corteza o tocones
    const chim = [];
    SLOT.forEach(([x0, x1], k) => {
      if (hechaK(k)) { if (k % 3 === 1) { const r = b_casaTeja(R, x0, x1, 115, 101, 93, P, k, { esc: 0.45, buhardilla: false, chimeneas: [x0 + 2] }); chim.push(...r.chimeneas); }
        else { const r = b_casaEsc(R, x0, x1, 115, 100 - (k % 2) * 4, 84 - (k % 2) * 4, P, k, { esc: 0.45, pasos: 3 }); chim.push([r.cx + 2, r.top - 1]); } }
      else if (chozaK(k)) chim.push(b_choza(R, x0 + 2, x1 - 2, 115, P, k, 0.5));
      else for (const dx of [3, 9]) { rect(x0 + dx, 112, x0 + dx + 2, 115, P.troncoS); rect(x0 + dx, 112, x0 + dx + 2, 112, P.troncoL); } });
    // la loma del molino, la granja con su cerca y el bosque de la derecha
    for (let x = 238; x < 272; x++) { const top = 119 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 254) / 17) ** 2)) * 5); for (let y = top; y < 121; y++) pset(x, y, y === top ? P.cespedL : P.cesped); }
    b_casaTeja(R, 282, 306, 115, 104, 97, P, 11, { esc: 0.45, buhardilla: false, chimeneas: [300] }); chim.push([301, 94]);
    for (let x = 270; x < 320; x += 4) { rect(x, 111, x, 116, P.troncoS); } rect(270, 112, 319, 112, P.tronco); rect(270, 114, 319, 114, P.tronco);
    for (let k = 0; k < 9; k++) { const x = 266 + k * 7 + Math.round(h(k, 1, 758) * 3), y = 112 - Math.round(h(k, 2, 758) * 6); rect(x, y, x + 1, y + 6, P.troncoS); disco(x, y - 4, 5, hex('#3a6a3a')); disco(x - 1, y - 6, 3.4, hex('#4e8248')); pset(x - 2, y - 8, hex('#6aa45a')); }
    marca();   // el agua
    b_aguaFija(R, 124, 179, [[0, AGUA[0]], [0.12, AGUA[1]], [0.38, AGUA[2]], [0.7, AGUA[3]], [0.95, AGUA[4]]]);
    for (let x = 0; x < 320; x++) if (h(x, 1, 759) < 0.5) pset(x, 124, b_mezcla(AGUA[1], P.tronco, 0.4));   // el reflejo del muelle de la orilla
    // los reflejos fijos de las casas y del fuerte en el agua quieta de la orilla
    for (let y = 125; y < 134; y++) for (let x = 0; x < 320; x++) if (b_um(x, y) < 0.35 - (y - 125) * 0.035) { const c = R.pget(x, 121 - (y - 124) * 2); if (c) pset(x, y, b_mezcla(R.pget(x, y), c, 0.35)); }
    marca();   // 4: el agua
    delante();
    // el muelle de tablas de delante: la cubierta, el canto, los pilotes con algas, barricas, fardos y la grúa
    for (let y = 146; y <= 157; y++) for (let x = 0; x <= 172 - Math.round((157 - y) * 0.3); x++) { const tab = (x + (y > 151 ? 5 : 0)) % 16 === 0; pset(x, y, y === 146 ? P.troncoL : tab ? P.troncoS : h(x >> 2, y, 760) < 0.15 ? P.troncoL : (y + (x >> 3)) % 4 === 0 ? hex('#6e5034') : P.tronco); }
    rect(0, 158, 172, 163, P.troncoS); for (let x = 0; x < 172; x += 2) pset(x, 160 + (x % 4 ? 0 : 1), hex('#3e2c1c')); rect(0, 158, 172, 158, P.tronco);
    for (const px of [6, 34, 62, 90, 118, 146, 168]) { rect(px - 2, 158, px + 2, 179, hex('#3e2c1c')); rect(px - 1, 158, px + 1, 179, P.troncoS); for (let y = 168; y < 180; y++) if (h(px, y, 761) < 0.6) pset(px - 2 + (y % 3), y, hex('#3a5a3a')); rect(px - 2, 166, px + 2, 166, hex('#2a4a5a')); }
    rect(0, 164, 172, 165, hex('#3e2c1c'));
    for (const [bx, by] of [[4, 146], [13, 146], [8, 137]]) { rect(bx - 1, by - 10, bx + 8, by, P.borde); rect(bx, by - 9, bx + 7, by - 1, hex('#8a5a32')); rect(bx + 5, by - 9, bx + 7, by - 1, hex('#6a4426')); rect(bx, by - 7, bx + 7, by - 7, P.hierro); rect(bx, by - 3, bx + 7, by - 3, P.hierro); rect(bx + 1, by - 9, bx + 2, by - 1, hex('#a87040')); }
    for (const [fx, fy2, c] of [[24, 146, hex('#c8b48a')], [36, 146, hex('#9a7a52')], [30, 139, hex('#b8a47a')]]) { rect(fx - 1, fy2 - 8, fx + 10, fy2, P.borde); rect(fx, fy2 - 7, fx + 9, fy2 - 1, c); rect(fx, fy2 - 7, fx + 9, fy2 - 7, b_mezcla(c, hex('#ffffff'), 0.3)); rect(fx + 4, fy2 - 7, fx + 4, fy2 - 1, P.cortezaS); rect(fx, fy2 - 4, fx + 9, fy2 - 4, P.cortezaS); }
    rect(150, 108, 152, 146, P.borde); rect(151, 109, 151, 146, P.troncoL); linea(151, 110, 170, 116, P.borde); linea(151, 111, 170, 117, P.tronco); linea(146, 146, 151, 128, P.troncoS); rect(148, 142, 156, 146, P.troncoS); disco(151, 138, 3, P.borde); disco(151, 138, 2, P.tronco); pset(151, 138, P.hierro);
    rect(166, 142, 170, 146, P.borde); rect(167, 141, 169, 145, P.hierro);   // el noray
    return { chim };
  });
  R.copiar(cap.b);
  const B = R.buf, m = cap.m;
  b_cieloVivo(R, t, m, 100, 'dia', 0.4); b_gaviotas(R, t, 5, 40, 92);
  b_aguaViva(R, t, m, 4, 126, 179, [hex('#a8d0e4'), hex('#2a5470'), hex('#ffffff')]);
  // el humo de las chimeneas y la bandera del fuerte
  cap.info.chim.forEach(([x, y], k) => b_humo(R, x, y, t, k, { alto: 16, r: 2.2, viento: 0.8 }));
  const bt = b_cambioBandera(o, t); if (bt) b_bandera(R, 70, 60 + bt.baja * 30, t, bt.tipo, 13, 8);
  const mol = molino(R, 254, 115, t, { s: 0.9 });
  // los colonos que pasan por el camino de la orilla (y, en 1625, los que acarrean tierra al fuerte)
  for (let k = 0; k < 5; k++) { const d = k % 2 ? -1 : 1, v = 4 + k * 1.3, x = d > 0 ? ((t * v + k * 80) % 360) - 20 : 340 - ((t * v + k * 70) % 360); if (x > 14 && x < 122 && fase) continue; b_figurita(R, x, 120, t, k, { dir: d, carga: k === 1 ? 'barrica' : k === 3 ? 'saco' : null }); }
  if (!fase) for (let k = 0; k < 3; k++) { const u = (t * 0.12 + k / 3) % 1, x = 120 - u * 40; b_figurita(R, x, 119, t, k + 2, { dir: -1, carga: 'cesto' }); }
  // los barcos: el fluyt de la orilla, los ingleses que entran y el fluyt grande de delante amarrado al noray
  b_barco(R, 196, 134, t, { s: 0.62, tipo: 'fluyt', velas: 0, bandera: 'holandesa', reflejo: hex('#2e5e7e') });
  const fin = [[110, 146], [188, 143], [300, 147]];
  if (ing > 0) fin.forEach(([fx, fy2], k) => { const u = b_lim(ing * 1.25 - k * 0.12), e = 1 - (1 - u) ** 2, x = lerp(400 + k * 60, fx, e); if (u > 0) b_barco(R, x, fy2, t, { s: 0.82, tipo: 'guerra', dir: -1, velas: 1 - u * 0.8, bandera: 'inglesa', canones: true, reflejo: hex('#244e6a') }); });
  b_barco(R, 262, 170, t, { s: 1.12, tipo: 'fluyt', velas: 0, bandera: 'holandesa', reflejo: hex('#1e4660') });
  b_delante(R, cap);
  { const sw = Math.sin(t * 1.2) * 3; R.linea(170, 117, 170 + sw, 128, hex('#3e2c1c')); const nx = Math.round(170 + sw), ny = 130; R.disco(nx, ny, 4, hex('#3e2c1c')); R.disco(nx, ny, 3, hex('#b8a47a')); R.pset(nx - 1, ny - 1, hex('#e0cca0')); R.linea(nx - 3, ny, nx + 3, ny, hex('#7a6248')); R.linea(nx, ny - 3, nx, ny + 3, hex('#7a6248')); }   // la red de carga de la grúa
  { const bx = 251, by = 152, ys = (x) => 142 + ((x - 168) * (bx - x)) / 700; for (let x = 169; x < bx; x++) R.pset(x, Math.round(ys(x) + Math.sin(t * 1.4) * 0.6), hex('#5a4630')); }   // el cabo de amarre
  return { suelo: 154, pies: [44, 140], hor: 100, molino: mol, mastil: [70, 60, 100], muelle: [0, 146, 172, 157], fuerte: [14, 96, 122, 121], camino: 120, barcos: fin, agua: [0, 124, 319, 179] };
}

// qué bandera ondea y a qué altura (o.bandera, y con o.cambio 0–1: la que hay baja y sube o.nueva)
function b_cambioBandera(o, t) {
  const tipo = o.bandera ?? 'holandesa', c = o.cambio;
  if (c == null) return { tipo, baja: 0 };
  if (c < 0.5) return { tipo, baja: c * 2 };
  return { tipo: o.nueva ?? 'inglesa', baja: 1 - (c - 0.5) * 2 };
}

// la calle que se aleja por el centro (punto de fuga en (166, 100)): s es la escala de la profundidad (1 en la esquina de
// delante, cerca de 0 en el horizonte); x del borde izquierdo y derecho y el suelo a esa profundidad
const b_VX = 166, b_VY = 100;

const b_xIz = (s) => b_VX - 50 * s, b_xDe = (s) => b_VX + 48 * s, b_yS = (s) => b_VY + 38 * s;

// las fachadas que se alejan a los lados de la calle, columna a columna (lado -1 izquierda, 1 derecha), de s = 1 a s =
// sFin: ladrillo de hiladas que encogen, ventanas y puertas en perspectiva, gabletes escalonados (izquierda) o tejados
// de tejas (derecha), y la luz: el lado izquierdo da al sol y el derecho queda en sombra; hoy: fachadas de piedra altas
function b_fachadasFuga(R, lado, P, hoy = false, sFin = 0.55) {
  const xa = lado < 0 ? b_xIz(1) : b_xDe(sFin), xb = lado < 0 ? b_xIz(sFin) : b_xDe(1), B = R.buf;
  const casas = lado < 0 ? [[1, 1.4, 64, 24], [1.4, 1.82, 56, 30]] : [[1, 1.38, 60, 14], [1.38, 1.82, 66, 14]];
  for (let x = Math.ceil(xa); x <= Math.floor(xb); x++) {
    const s = lado < 0 ? (b_VX - x) / 50 : (x - b_VX) / 48, z = 1 / s, yg = b_yS(s), ci = casas.findIndex(([z0, z1]) => z >= z0 && z < z1); if (ci < 0) continue;
    const [z0, z1, alero, gab] = casas[ci], fz = (z - z0) / (z1 - z0), borde = fz < 0.03 || fz > 0.97;
    let top;
    if (hoy) top = Math.max(lado < 0 ? 17 : 0, yg - s * (ci === 0 ? 200 : 160));
    else if (lado < 0) { const st = Math.min(4, Math.floor((1 - Math.abs(2 * fz - 1)) * 5)); top = yg - s * (alero + gab * st / 4); }
    else top = yg - s * alero;
    const luz = lado < 0 ? 0 : 0.3;
    for (let y = Math.max(0, Math.round(top)); y <= Math.round(yg); y++) {
      const v = (yg - y) / s; let c;
      if (hoy) { const fila = Math.floor(v / 24), vv = v - fila * 24, piso = v > 16;
        c = h(Math.floor(fz * 9), Math.floor(v / 3), 770 + ci) < 0.2 ? hex('#b8ae98') : hex(ci ? '#c8bea4' : '#d4ccb6');
        if (Math.abs(vv - 22) < 1.2 && piso) c = hex('#ece6d6'); else if (piso && vv > 5 && vv < 18 && (fz * 6) % 1 > 0.25 && (fz * 6) % 1 < 0.72) c = (vv < 7 ? hex('#ece6d6') : (fz * 6) % 1 < 0.33 ? hex('#5a7a90') : hex('#34495c'));
        if (!piso && (fz * 3) % 1 > 0.2 && (fz * 3) % 1 < 0.8 && v < 13) c = v > 11 ? hex('#3a3a44') : hex('#4a6a7a');
      } else {
        const fila = Math.floor(v / 3), jy = v % 3 < 0.9 && s > 0.6, pieza = h(Math.floor(fz * 12 + (fila & 1) * 0.5), fila, 771 + ci);
        c = jy ? P.ladJ : pieza < 0.15 ? P.ladS : pieza < 0.3 ? P.ladL : P.lad;
        const ventana = (v > 20 && v < 32) || (v > 38 && v < 50) || (lado < 0 && v > alero + 4 && v < alero + 12 && Math.abs(fz - 0.5) < 0.08);
        const col = (fz * 3) % 1, enHueco = col > 0.3 && col < 0.62;
        if (ventana && enHueco) c = (v > 20 && v < 22) || (v > 38 && v < 40) ? P.piedraL : col < 0.36 || col > 0.57 ? P.marco : (Math.floor(v) % 4 === 0 ? P.marco : P.vidrio);
        else if (ventana && (col > 0.18 && col <= 0.3 || col >= 0.62 && col < 0.74) && Math.floor(v) % 2) c = (ci + Math.floor(fz * 3)) % 2 ? P.contra : P.rojoC;
        if (v < 15 && fz > 0.12 && fz < 0.26) c = v > 14 ? P.borde : P.puerta;
        if (v < 2) c = P.piedraS;
        if (!hoy && lado > 0 && y < Math.round(yg - s * alero) + 1) c = P.borde;
      }
      if (borde || y === Math.max(0, Math.round(top))) c = P.borde;
      if (luz > 0) c = b_mezcla(c, hex('#2a1a2a'), luz);
      B[y * 320 + x] = c;
    }
    if (!hoy && lado > 0) { const tt = Math.round(top), alto = Math.max(2, Math.round(s * gab)); for (let j = 1; j <= alto; j++) { const y = tt - j; if (y < 0) break; B[y * 320 + x] = j === alto ? P.borde : (Math.floor(fz * 30) + j) % 3 === 0 ? P.tejaS : j % 3 === 0 ? P.tejaD : b_mezcla(P.teja, hex('#2a1a2a'), 0.2); } }
    if (!hoy && lado < 0) { const y = Math.round(top); if (y >= 1) B[(y - 1) * 320 + x] = P.piedraL; }
  }
}

// el empedrado en perspectiva (de y0 a y1): adoquines que encogen hacia el fondo, juntas, charcos y barro
function b_empedrado(R, y0, y1, P, hoy = false) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const s = (y - b_VY) / 38, z = 1 / s, fila = Math.floor(z * 9), f = y * 320;
    for (let x = 0; x < 320; x++) { const X = (x - b_VX) / s, col = Math.floor(X / 9 + (fila & 1) * 0.5); let c;
      if (hoy) { c = h(x >> 1, y, 780) < 0.25 ? hex('#4a4a56') : h(x, y, 781) < 0.06 ? hex('#6a6a76') : hex('#54545e'); if (Math.abs(X) < 1.5 && Math.floor(z * 4) % 2 === 0) c = hex('#e8d84a'); }
      else { const junta = (z * 9) % 1 < 0.16 || ((X / 9 + (fila & 1) * 0.5) % 1 + 1) % 1 < 0.14, r = h(col, fila, 782);
        c = junta ? P.adoqS : r < 0.2 ? P.adoqL : r < 0.35 ? hex('#7a7268') : P.adoq;
        const barro = h(Math.floor(X / 30), Math.floor(z * 3), 783); if (Math.abs(X) < 22 && barro < 0.5 && !junta) c = b_mezcla(c, P.barro, 0.55);
        if (h(Math.floor(X / 18), Math.floor(z * 5), 784) < 0.06 && (y & 1)) c = hex('#8ab0c8'); }
      B[f + x] = c; } }
}

// una calle de Nueva Ámsterdam (o.encuadre 'calle')
function b_calle(R, t, o) {
  const P = b_P, muro = b_lim(o.muro ?? 0), hoy = b_lim(o.hoy ?? 0), molT = o.molino ?? 'fondo';
  const viejo = b_capa(R, 'na-calle', (marca) => {
    const { rect, pset, disco, linea } = R;
    b_degradado(R, 0, 101, b_CIELOS.dia); b_sol(R, 178, 30, 7); marca();
    // lejos: las colinas azuladas con sus lomas, el bosque de copas redondas, los campos en parcelas (trigo, prado,
    // tierra arada con surcos), setos, almiares, cercas, árboles sueltos y una granja
    for (let x = 0; x < 320; x++) { const y1 = 82 + Math.round(Math.sin(x / 33) * 3 + Math.sin(x / 11) * 1.2), y2 = 91 + Math.round(Math.sin(x / 19 + 1) * 2);
      for (let y = y1; y <= 121; y++) { let c;
        if (y < y2) c = y === y1 ? hex('#a0bccc') : (x + y * 2) % 9 === 0 ? hex('#6e90a4') : b_um(x, y) < 0.35 ? hex('#7a9cae') : hex('#88a8ba');
        else if (y < 99) c = h(x >> 1, y >> 1, 785) < 0.3 ? hex('#3e6a4c') : h(x, y, 789) < 0.2 ? hex('#6a9a6a') : hex('#4e7a5a');
        else { const pa = Math.floor((x + (y - 99) * 3) / 26), tipo = Math.floor(h(pa, 0, 786) * 3);
          c = tipo === 0 ? ((y % 2) ? hex('#c8b45a') : hex('#d8c46a')) : tipo === 1 ? (h(x, y, 787) < 0.15 ? hex('#8aaa4a') : hex('#7a9a42')) : ((x + y) % 3 === 0 ? hex('#7a5a3a') : hex('#9a7a52'));
          if ((x + (y - 99) * 3) % 26 === 0) c = hex('#4a6a3a'); }
        pset(x, y, c); } }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 788) * 320), y = 90 + Math.round(h(k, 2, 788) * 8); disco(x, y, 2.2, hex('#355e44')); pset(x - 1, y - 1, hex('#6a9a6a')); }
    for (let k = 0; k < 14; k++) { const x = 120 + k * 7, y = 100 + (k % 3); rect(x, y - 5, x, y, P.troncoS); disco(x, y - 7, 3, hex('#3e6a46')); disco(x - 1, y - 8, 1.6, hex('#5a8a5a')); pset(x - 1, y - 9, hex('#7aaa6a')); }
    for (const [hx, hy] of [[136, 108], [178, 106], [152, 111]]) { R.poligono([[hx - 3, hy], [hx, hy - 5], [hx + 3, hy]], hex('#b89a4a')); pset(hx, hy - 4, hex('#d8c47a')); pset(hx - 1, hy - 2, hex('#8a7a3a')); }
    for (let x = 100; x < 230; x += 3) rect(x, 113, x, 116, P.troncoS); rect(100, 114, 230, 114, P.tronco);
    b_choza(R, 196, 210, 112, P, 4, 0.6); rect(150, 104, 182, 104, hex('#7a8a3e'));
    marca();
    // el suelo, las fachadas que se alejan y las casas de delante
    b_empedrado(R, 117, 165, P);
    b_fachadasFuga(R, -1, P); b_fachadasFuga(R, 1, P);
    for (let y = 136; y <= 141; y++) for (let x = 0; x < 320; x++) { const s = (y - b_VY) / 38; if (x > b_xIz(s) && x < b_xDe(s)) continue; pset(x, y, y === 136 ? P.piedraS : ((x + (y & 1) * 3) % 6 === 0 || y === 139) ? P.ladS : h(x >> 1, y, 787) < 0.2 ? P.ladL : P.ladO); }
    b_casaEsc(R, 0, 56, 136, 70, 22, P, 1, { esc: 1, pasos: 4, puertaX: 12 });
    const l2 = b_casaTeja(R, 58, 115, 136, 74, 50, P, 2, { esc: 1, puertaF: 0.66 });
    b_casaEsc(R, 215, 270, 136, 76, 32, P, 7, { esc: 1, pasos: 4, puertaX: 248 });
    const r2 = b_casaTeja(R, 272, 319, 136, 88, 64, P, 8, { esc: 0.9, puertaF: 0.2, chimeneas: [304], buhardilla: false });
    // un banco con un cubo, un barril de agua de lluvia y una carretilla junto a las casas
    rect(20, 128, 32, 129, P.tronco); rect(21, 130, 22, 135, P.troncoS); rect(30, 130, 31, 135, P.troncoS); rect(26, 124, 30, 127, P.hierroL); rect(26, 124, 30, 124, P.hierro);
    rect(98, 124, 108, 136, P.borde); rect(99, 125, 107, 135, hex('#8a5a32')); rect(99, 127, 107, 127, P.hierro); rect(99, 132, 107, 132, P.hierro); rect(100, 125, 101, 135, hex('#a87040')); rect(99, 125, 107, 125, hex('#4a6a8a'));
    // el bordillo del canal, el agua con el reflejo y el puente de tablas
    rect(0, 165, 319, 168, P.piedra); for (let x = 0; x < 320; x += 11) rect(x, 165, x, 168, P.piedraS); rect(0, 165, 319, 165, P.piedraL); rect(0, 168, 319, 168, P.piedraS);
    marca();
    b_aguaFija(R, 169, 179, [[0, hex('#3a5a6a')], [0.5, hex('#2e4e5e')], [1, hex('#28424e')]], 3);
    for (let y = 169; y < 180; y++) for (let x = 0; x < 320; x++) if (b_um(x, y) < 0.3) { const c = R.pget(x, 169 - (y - 168) * 3); pset(x, y, b_mezcla(R.pget(x, y), c, 0.3)); }
    marca();   // 4: el agua del canal
    rect(146, 150, 150, 150, P.hierro); disco(160, 166, 2, P.hierro); disco(160, 166, 1, P.piedraS);   // la argolla de amarre
    for (let y = 163; y < 180; y++) { const xa = 34 - Math.round((y - 163) * 0.4), xb = 76 + Math.round((y - 163) * 0.4); rect(xa, y, xb, y, (y - 163) % 4 === 3 ? P.troncoS : h(y, 1, 788) < 0.5 ? P.tronco : P.troncoL); }
    for (const [x0, d] of [[34, -1], [76, 1]]) { for (let y = 156; y < 180; y++) pset(x0 + Math.round((y - 156) * 0.4 * d) , y, P.borde); rect(x0 - 1, 155, x0 + 1, 157, P.troncoS); linea(x0, 156, x0 + 10 * d, 180, P.troncoL); }
    return { l2, r2 };
  });
  // el fotograma de 1653
  R.copiar(viejo.b);
  let B = R.buf, m = viejo.m;
  b_cieloVivo(R, t, m, 101, 'dia', 0.4); b_gaviotas(R, t, 3, 30, 80);
  const lejos = (k) => k === 1 || k === 2, mk = (x, y) => lejos(m[y * 320 + x]);
  let mol = null;
  if (molT === 'fondo' || molT === 'cerca') mol = molino(R, 188, 112, t, { s: 0.5, mascara: mk, tn: b_tinte(hex('#8aaabc'), 0.25) });
  if (muro > 0) b_muro(R, t, m, muro);
  b_aguaViva(R, t, m, 4, 170, 179, [hex('#6a8a9a'), hex('#1e3440'), hex('#c8e0e8')], 0.8, 0.5);
  [...viejo.info.l2.chimeneas, ...viejo.info.r2.chimeneas].forEach(([x, y], k) => b_humo(R, x, y, t, k, { alto: 26, r: 3, viento: 0.7 }));
  for (let k = 0; k < 3; k++) { const u = (t * 0.05 + k * 0.37) % 1, d = k % 2 ? 1 : -1, s = 0.62 + k * 0.08, x = d > 0 ? lerp(b_xIz(s) + 4, b_xDe(s) - 4, u) : lerp(b_xDe(s) - 4, b_xIz(s) + 4, u); b_figurita(R, x, b_yS(s), t, k + 1, { dir: d, carga: k === 0 ? 'saco' : null }); }
  b_cerdo(R, (t * 6) % 420 - 50, 160, t, 1); b_cerdo(R, 300 - ((t * 4 + 200) % 420), 152, t, -1, 0.8);
  for (let k = 0; k < 4; k++) b_gallina(R, 122 + k * 23 + Math.sin(t * 0.7 + k) * 8, 147 + (k % 2) * 6, t + k * 0.7, k % 2 ? 1 : -1);
  b_barquita(R, 200, 172, t); b_patos(R, t, 172);
  if (molT === 'cerca') mol = molino(R, 262, 146, t, { s: 1.25, base: true });
  // hoy: el mismo sitio, que se disuelve con la trama
  if (hoy > 0) {
    const nuevo = b_capa(R, 'na-calle-hoy', (marca) => b_calleHoyFija(R, P, marca));
    if (!b_calle.tmp) b_calle.tmp = R.nuevo();
    const prev = R.usar(b_calle.tmp); R.copiar(nuevo.b); b_calleHoyViva(R, t, nuevo.m); R.usar(prev);
    B = R.buf; const T2 = b_calle.tmp;
    for (let y = 0; y < 180; y++) { const f = y * 320; for (let x = 0; x < 320; x++) if (b_um(x, y) < hoy) B[f + x] = T2[f + x]; }
  }
  return { suelo: 158, pies: [40, 250], hor: b_VY, calle: { fondo: [b_xIz(0.55), b_yS(0.55), b_xDe(0.55)], perspectiva: 'y = 100 + 38·s; x de 166 − 50·s a 166 + 48·s' }, muro: { y: b_yS(0.45), x: [b_xIz(0.55), b_xDe(0.55)] }, molino: mol, canal: [0, 169, 319, 179], puente: [34, 163, 76, 179], puertas: { izq: [12, 123, 20, 136], der: [248, 123, 256, 136] }, letrero: [92, 90, 118, 100] };
}

// el muro de troncos afilados de 1653 que se levanta tronco a tronco de izquierda a derecha al fondo de la calle (solo
// en lo lejano, por detrás de las casas), con los puntales y el polvo de cada tronco que cae; u: cuánto lleva (0–1)
function b_muro(R, t, m, u) {
  const B = R.buf, s = 0.45, y0 = Math.round(b_yS(s)), alto = 15, ok = (k) => k === 1 || k === 2, n = 60;
  for (let i = 0; i < n; i++) { const x = 60 + i * 3.4, ui = b_lim(u * n - i * 0.85); if (ui <= 0) break;
    const ya = Math.round(y0 - alto * Math.min(1, ui * 1.4) - (i % 3 === 1 ? 1 : 0));
    for (let y = ya; y <= y0; y++) for (let dx = 0; dx < 3; dx++) { const xx = Math.round(x) + dx; let c = dx === 0 ? P_MURO[0] : dx === 2 ? P_MURO[2] : P_MURO[1]; if (y === ya && dx !== 1) continue; if ((y + i) % 5 === 0 && dx === 1) c = P_MURO[2]; b_psM(B, m, ok, xx, y, c); }
    b_psM(B, m, ok, Math.round(x) + 1, ya - 1, P_MURO[2]);
    if (ui < 1 && ui > 0.5) for (let k = 0; k < 4; k++) b_psM(B, m, ok, Math.round(x) - 2 + k * 2, y0 - Math.round((ui - 0.5) * 8) - (k % 2), hex('#c8b89a')); }
  for (let i = 0; i < n * u - 2; i += 6) { const x = Math.round(60 + i * 3.4); b_psM(B, m, ok, x, y0 - 6, P_MURO[3]); b_psM(B, m, ok, x + 1, y0 - 6, P_MURO[3]); }
  for (let x = 60; x < 60 + n * 3.4 * u; x++) b_psM(B, m, ok, x, y0 - 5, P_MURO[3]);
}

const P_MURO = ['#6a4a2c', '#8a6a44', '#3e2c1c', '#5a4028'].map(hex);

// un cerdo que hoza y anda (d: hacia dónde; e: tamaño)
function b_cerdo(R, x, y, t, d = 1, e = 1) {
  x = Math.round(x); const { rect, pset } = R, cR = hex('#e8a8a0'), cS = hex('#c08078'), cL = hex('#f8c8c0'), p = Math.floor(t * 4) % 2, ho = Math.sin(t * 3) > 0.5 ? 1 : 0, w = Math.round(9 * e);
  rect(x - 1, y - 6, x + w + 1, y - 1, hex('#5a2a2a')); rect(x, y - 5, x + w, y - 2, cR); rect(x, y - 5, x + w, y - 5, cL); rect(x, y - 2, x + w, y - 2, cS);
  const hx = d > 0 ? x + w + 1 : x - 4; rect(hx, y - 5 + ho, hx + 3, y - 2 + ho, cR); pset(d > 0 ? hx + 3 : hx, y - 3 + ho, hex('#d08888')); pset(d > 0 ? hx + 1 : hx + 2, y - 4 + ho, hex('#1c1222')); pset(d > 0 ? hx : hx + 3, y - 6 + ho, cS);
  for (const [lx, q] of [[x + 1, p], [x + w - 1, 1 - p]]) rect(lx, y - 1, lx, y - q, cS); pset(d > 0 ? x - 1 : x + w + 1, y - 5, cS); pset(d > 0 ? x - 2 : x + w + 2, y - 6 + p, cS);
  if (ho) pset(d > 0 ? hx + 4 : hx - 1, y, hex('#6a5038'));
}

// una gallina que picotea
function b_gallina(R, x, y, t, d = 1) {
  x = Math.round(x); y = Math.round(y); const { rect, pset } = R, pic = Math.sin(t * 5) > 0.4 ? 2 : 0, c = hex('#f0e8d8'), cS = hex('#c8bca8');
  rect(x - 2, y - 4, x + 2, y - 1, c); rect(x - 2, y - 1, x + 2, y - 1, cS); pset(x - 3 * d, y - 4, cS); pset(x - 3 * d, y - 5, cS);
  pset(x + 2 * d, y - 5 + pic, c); pset(x + 3 * d, y - 5 + pic, c); pset(x + 3 * d, y - 6 + pic, hex('#d83a3a')); pset(x + 4 * d, y - 5 + pic, hex('#e8a040')); pset(x + 3 * d, y - 5 + pic, hex('#1c1222'));
  pset(x, y, hex('#e8a040')); pset(x + 1, y, hex('#e8a040'));
}

// la barca amarrada en el canal, que se mece
function b_barquita(R, x, y, t) {
  const b = Math.round(Math.sin(t * 1.6) * 0.8); y += b;
  R.poligono([[x - 16, y - 4], [x + 16, y - 4], [x + 12, y + 1], [x - 12, y + 1]], hex('#3e2c1c')); R.rect(x - 14, y - 3, x + 14, y - 3, hex('#8a5a32')); R.rect(x - 12, y - 2, x + 12, y - 1, hex('#6a4426'));
  R.rect(x - 4, y - 4, x + 4, y - 4, hex('#a07a52')); R.linea(x - 15, y - 4, x - 30, y - 9 + b, hex('#5a4630'));
  for (let i = -12; i <= 12; i += 2) R.pset(x + i + Math.round(Math.sin(t * 2 + i) * 1), y + 3, hex('#1a2a34'));
}

// dos patos que nadan por el canal con su estela
function b_patos(R, t, y) {
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 5 + k * 9) % 380) - 30) + k * 8, yy = y + 2 + k + Math.round(Math.sin(t * 2 + k)); if (x > 180 && x < 222) continue;
    R.rect(x, yy - 2, x + 4, yy, hex('#8a6a4a')); R.rect(x + 4, yy - 4, x + 5, yy - 2, k ? hex('#2a6a3a') : hex('#8a6a4a')); R.pset(x + 6, yy - 3, hex('#e8a040')); R.pset(x + 5, yy - 3, hex('#1c1222')); R.pset(x, yy - 3, hex('#5a4a3a'));
    for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 4)) % 2) R.pset(x - i * 2, yy + 1 + (i > 3 ? 1 : 0), hex('#6a8a9a')); }
}

// la capa fija de la calle de hoy: el cañón de piedra con rascacielos al fondo, la acera, el asfalto con el paso de
// cebra, la alcantarilla, el semáforo, la farola y el letrero de la calle con el pictograma del muro
function b_calleHoyFija(R, P, marca) {
  const { rect, pset, disco, linea } = R;
  b_degradado(R, 0, 101, b_CIELOS.dia); marca();
  // los rascacielos del fondo, en la bruma, en tres términos: lejos, torres claras sin detalle; en medio, torres con
  // la retícula de ventanas, retranqueos y antenas, una de cristal que refleja el cielo y la del Empire con su aguja
  for (let y = 92; y < 119; y++) for (let x = 100; x < 232; x++) pset(x, y, (x + y) % 4 === 0 ? hex('#9ab0c2') : hex('#a8bccc'));
  for (let k = 0; k < 12; k++) { const x0 = 98 + k * 12 + Math.round(h(k, 4, 790) * 5), w = 8 + Math.round(h(k, 5, 790) * 6), top = 40 + Math.round(h(k, 6, 790) * 40);
    for (let y = top; y < 100; y++) for (let x = x0; x < x0 + w; x++) pset(x, y, x === x0 + w - 1 ? hex('#a4b6c6') : (y - top) % 4 === 0 ? hex('#bccad6') : hex('#b4c4d2')); }
  for (let k = 0; k < 16; k++) { const x0 = 102 + k * 8 + Math.round(h(k, 1, 790) * 4), w = 7 + Math.round(h(k, 2, 790) * 7), top = 26 + Math.round(h(k, 3, 790) * 52), lej = k % 2, vidrio = k === 9;
    const ret = h(k, 7, 790) < 0.4 ? top + 10 : -1;
    for (let y = top; y < 118; y++) for (let x = x0; x < x0 + w; x++) { if (y < ret && (x === x0 || x === x0 + w - 1)) continue;
      let c = lej ? hex('#a0b4c6') : hex('#8aa0b4');
      if (vidrio) c = b_mezcla(hex('#7a9ab8'), hex('#d8e8f4'), b_lim(((x - x0) * 2 - (y - top) * 0.5 + 40) % 18 / 18));
      else if ((x - x0) % 3 === 1 && (y - top) % 3 === 1) c = h(x, y, 791) < 0.08 ? hex('#f0e0a0') : lej ? hex('#c4d4e0') : hex('#b8ccdc');
      if (x === x0 + w - 1) c = b_mezcla(c, hex('#5a6a7a'), 0.3); if (x === x0 && !vidrio) c = b_mezcla(c, hex('#ffffff'), 0.15); if (y === ret) c = hex('#c8d4de');
      pset(x, y, c); }
    if (k % 5 === 2) { rect(x0 + (w >> 1), top - 8, x0 + (w >> 1), top, hex('#8a9aaa')); pset(x0 + (w >> 1), top - 9, hex('#e85a4a')); }
    if (k === 4 || k === 12) { const cx = x0 + (w >> 1), y0 = 104 + (k % 3); rect(cx - 3, y0 - 6, cx + 3, y0 - 2, hex('#8a6a52')); rect(cx - 3, y0 - 5, cx + 3, y0 - 5, hex('#6a4e3a')); R.poligono([[cx - 4, y0 - 6], [cx, y0 - 10], [cx + 4, y0 - 6]], hex('#5a4a40')); rect(cx - 3, y0 - 1, cx - 3, y0 + 2, hex('#4a4a52')); rect(cx + 3, y0 - 1, cx + 3, y0 + 2, hex('#4a4a52')); } }
  // el Empire State: los retranqueos escalonados, la retícula de ventanas y la aguja con la luz roja
  { const cx = 160; for (const [hw, y0, y1] of [[9, 60, 118], [7, 48, 60], [5, 40, 48], [3, 34, 40], [2, 28, 34]]) for (let y = y0; y < y1; y++) for (let x = cx - hw; x <= cx + hw; x++) pset(x, y, x === cx + hw ? hex('#6e8296') : x === cx - hw ? hex('#b8c8d6') : (x - cx) % 2 === 0 && y % 3 === 1 ? hex('#c8d6e2') : x > cx + 2 ? hex('#8296aa') : hex('#94a8bc'));
    rect(cx, 17, cx, 28, hex('#7a8a9a')); }
  marca();
  b_empedrado(R, 117, 168, P, true);
  // la acera de delante (donde estaba el canal, que se cubrió): losas de hormigón con juntas, el bordillo y una boca de riego
  for (let y = 166; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 166 ? hex('#8a8a92') : y === 167 ? hex('#d0d0d4') : (x + (y > 173 ? 13 : 0)) % 26 === 0 || y === 173 ? hex('#a0a0a8') : h(x >> 1, y, 792) < 0.08 ? hex('#b4b4bc') : hex('#c4c4ca'));
  rect(262, 160, 268, 172, hex('#5a1a1a')); rect(263, 161, 267, 171, hex('#c83a3a')); rect(261, 164, 269, 165, hex('#a82a2a')); rect(264, 158, 266, 160, hex('#c83a3a')); pset(264, 162, hex('#f07070'));
  for (let y = 146; y <= 153; y++) { const s = (y - b_VY) / 38; for (let x = 0; x < 320; x++) { const X = (x - b_VX) / s; if (((X / 8) % 2 + 2) % 2 < 1.1) pset(x, y, hex('#e8e8e4')); } }
  b_fachadasFuga(R, -1, P, true); b_fachadasFuga(R, 1, P, true);
  for (let y = 134; y <= 141; y++) for (let x = 0; x < 320; x++) { const s = (y - b_VY) / 38; if (x > b_xIz(s) && x < b_xDe(s)) continue; pset(x, y, y === 141 ? hex('#7a7a84') : y === 140 ? hex('#a8a8b0') : (x % 12 === 0 || y === 137) ? hex('#a0a0a8') : hex('#c4c4c8')); }
  // las fachadas de piedra de delante: zócalo, ventanas altas con su marco, cornisas y la entrada de arco
  for (const [x0, x1, top, k] of [[0, 115, 20, 0], [215, 319, 50, 1]]) {
    for (let y = top; y < 134; y++) for (let x = x0; x <= x1; x++) { let c = h(x >> 2, y >> 1, 791 + k) < 0.12 ? hex('#c0b69c') : hex(k ? '#cfc4aa' : '#dcd4bc'); const vy = (y - top) % 22, col = (x - x0) % 19;
      if (vy < 2) c = vy === 0 ? hex('#f2ecdc') : hex('#a89e86'); else if (vy > 5 && vy < 18 && col > 4 && col < 14 && y < 112) c = vy < 7 || col === 5 || col === 13 ? hex('#ece6d6') : col === 9 ? hex('#5a6a78') : (vy < 11 ? hex('#7a98ae') : hex('#3a4e60'));
      if (y >= 112) c = (x - x0) % 30 < 4 ? hex('#a89e86') : y < 114 ? hex('#ece6d6') : hex(k ? '#b0a68e' : '#bcb29a');
      if (x === x1 || x === x0) c = hex('#5a5048'); pset(x, y, c); }
    rect(x0, top - 3, x1, top - 1, hex('#f2ecdc')); rect(x0, top - 1, x1, top - 1, hex('#8a826e')); }
  for (let y = 114; y < 134; y++) for (let x = 44; x < 66; x++) { const d = Math.hypot(x - 55, Math.max(0, 121 - y)); if (d < 11) pset(x, y, d > 9.5 ? hex('#ece6d6') : y > 120 ? hex('#2a2a32') : hex('#5a7a90')); }
  // los detalles de las fachadas: el almohadillado de la piedra en la planta baja, los alféizares con su sombra, las
  // persianas, las cortinas y las macetas de algunas ventanas, los aparatos de aire en otras
  for (const [x0, x1, top, k] of [[0, 115, 20, 0], [215, 319, 50, 1]]) {
    for (let y = 114; y < 134; y += 4) for (let x = x0 + 1; x < x1; x++) if (R.pget(x, y) === hex(k ? '#b0a68e' : '#bcb29a')) pset(x, y, hex(k ? '#9a907a' : '#a89e86'));
    for (let fy = top + 6; fy < 112; fy += 22) for (let wx = x0 + 5; wx + 9 <= x1; wx += 19) { const q = h(wx, fy, 793);
      rect(wx - 1, fy + 12, wx + 9, fy + 12, hex('#f2ecdc')); rect(wx - 1, fy + 13, wx + 9, fy + 13, hex('#8a826e'));
      if (q < 0.25) { for (let j = fy + 1; j < fy + 6; j++) rect(wx + 1, j, wx + 7, j, j % 2 ? hex('#e8dcc0') : hex('#c8bca0')); }
      else if (q < 0.45) { rect(wx + 1, fy + 1, wx + 2, fy + 11, hex('#c86a5a')); rect(wx + 6, fy + 1, wx + 7, fy + 11, hex('#c86a5a')); }
      else if (q < 0.6 && fy + 18 < 112) { rect(wx + 1, fy + 14, wx + 7, fy + 18, hex('#8a8a92')); rect(wx + 1, fy + 14, wx + 7, fy + 14, hex('#c4c4cc')); for (let i = wx + 2; i < wx + 7; i += 2) rect(i, fy + 15, i, fy + 17, hex('#5a5a62')); }
      else if (q < 0.72) { rect(wx, fy + 10, wx + 8, fy + 11, hex('#9a5a3a')); for (let i = 0; i < 4; i++) pset(wx + 1 + i * 2, fy + 9, hex(i % 2 ? '#e85a6a' : '#4a9a4a')); } } }
  // la escalera de incendios de hierro negro en la fachada de la derecha: rellanos con barandilla y escalas en zigzag
  { const k = hex('#1e1e24'), kL = hex('#4a4a56');
    for (const [y, d] of [[69, 1], [91, -1]]) { rect(232, y, 292, y + 1, k); rect(232, y - 5, 292, y - 5, k); for (let x = 232; x <= 292; x += 4) rect(x, y - 5, x, y, k); rect(232, y, 292, y, kL); pset(292, y + 2, k); pset(232, y + 2, k);
      const xa = d > 0 ? 238 : 286, xb = d > 0 ? 270 : 254; for (let i = 0; i <= 20; i++) { const xx = Math.round(lerp(xa, xb, i / 20)), yy = y + 2 + i; pset(xx, yy, k); pset(xx + 3, yy, k); if (i % 3 === 0) { pset(xx + 1, yy, kL); pset(xx + 2, yy, kL); } } }
    for (let j = 0; j < 14; j++) { pset(262, 93 + j, k); pset(265, 93 + j, k); if (j % 3 === 0) { pset(263, 93 + j, kL); pset(264, 93 + j, kL); } } }
  // las tiendas de la planta baja: el toldo de rayas con su faldón festoneado, el escaparate con la mercancía (cajas,
  // tarros, fruta) y la puerta de cristal; a la derecha, la tienda de ultramarinos con su toldo verde y los cajones de fruta
  for (const [x0, x1, cA, cB, k] of [[3, 40, '#c83a3a', '#f4ece0', 0], [232, 300, '#2a7a4a', '#e8e4d8', 1]]) {
    for (let y = 116; y < 133; y++) for (let x = x0; x <= x1; x++) pset(x, y, x === x0 || x === x1 || y === 116 ? hex('#3a3a44') : y > 129 ? hex('#5a5a62') : b_mezcla(hex('#5a7a90'), hex('#d8e4ec'), b_lim(((x - x0) - (y - 116) + 30) % 16 / 22)));
    for (let i = x0 + 3; i < x1 - 3; i += 5) { const c = hex(['#e8c040', '#c83a3a', '#4a8a4a', '#e8e0d0', '#3a6aa8'][(i + k) % 5]); rect(i, 125, i + 2, 128, c); pset(i, 125, b_mezcla(c, hex('#ffffff'), 0.4)); rect(i + 1, 121, i + 2, 123, hex(['#f0a040', '#a8c84a', '#d8d0c0'][(i >> 2) % 3])); }
    rect(x0 + 1, 129, x1 - 1, 129, hex('#c8c0b0')); const pd = k ? x1 - 14 : x0 + 22; rect(pd, 118, pd + 8, 133, hex('#2a2a30')); rect(pd + 1, 119, pd + 7, 133, hex('#6a8aa0')); rect(pd + 6, 125, pd + 6, 127, hex('#e8d8a0'));
    for (let y = 108; y < 115; y++) { const yy = y - 108; for (let x = x0 - 2 - Math.round(yy * 0.4); x <= x1 + 2 + Math.round(yy * 0.4); x++) pset(x, y, Math.floor((x - x0) / 4) % 2 ? hex(cB) : b_mezcla(hex(cA), hex('#000000'), yy > 4 ? 0.2 : 0)); }
    for (let x = x0 - 5; x <= x1 + 5; x++) { const f = ((x - x0 + 40) % 4); if (f < 3) pset(x, 115, Math.floor((x - x0) / 4) % 2 ? hex(cB) : hex(cA)); if (f === 1) pset(x, 116, Math.floor((x - x0) / 4) % 2 ? hex(cB) : hex(cA)); } }
  for (const [bx, c] of [[238, '#e8c040'], [250, '#c83a3a'], [262, '#7aa83a']]) { rect(bx, 134, bx + 9, 139, hex('#7a5a3a')); rect(bx, 134, bx + 9, 134, hex('#a07a52')); for (let i = 1; i < 9; i += 2) { pset(bx + i, 133, hex(c)); pset(bx + i + 1, 132, b_mezcla(hex(c), hex('#ffffff'), 0.3)); } }
  // el árbol de la acera con su alcorque, el cubo de basura y la papelera
  rect(14, 140, 17, 166, hex('#4a3a2a')); rect(15, 140, 15, 166, hex('#6a5a44')); rect(8, 166, 24, 167, hex('#5a4a3a'));
  for (const [cx, cy, r] of [[16, 128, 10], [8, 134, 7], [24, 133, 7], [14, 120, 6]]) { disco(cx, cy, r, hex('#3a6a32')); disco(cx - 2, cy - 2, r * 0.7, hex('#4e8a3e')); disco(cx - 3, cy - 4, r * 0.35, hex('#7ab05a')); }
  rect(302, 156, 311, 168, hex('#2a3a2a')); rect(303, 157, 310, 167, hex('#4a6a4a')); for (let x = 304; x < 310; x += 2) rect(x, 158, x, 166, hex('#3a5a3a')); rect(301, 155, 312, 156, hex('#2a3a2a'));
  // la farola, el semáforo y el poste con el letrero verde del pictograma del muro
  rect(84, 66, 85, 136, hex('#2a3a2a')); rect(80, 62, 89, 66, hex('#2a3a2a')); rect(81, 66, 88, 67, hex('#f0e0a0'));
  rect(104, 92, 105, 136, hex('#3a4a3a')); rect(91, 89, 119, 99, hex('#f0f0f0')); rect(92, 90, 118, 98, hex('#2a7a4a'));
  for (let i = 0; i < 6; i++) { const x = 99 + i * 2; rect(x, 92, x, 97, hex('#f0f0f0')); pset(x, 91, i % 2 ? hex('#2a7a4a') : hex('#f0f0f0')); } rect(98, 94, 110, 94, hex('#2a7a4a'));
  rect(226, 70, 227, 136, hex('#2a2a2a')); rect(222, 70, 231, 90, hex('#1c1c1c'));
  rect(116, 157, 126, 159, hex('#3a3a40')); rect(117, 157, 125, 157, hex('#6a6a74'));
}
// lo que se mueve hoy: nubes, vapor de la alcantarilla, el semáforo, gente y coches
function b_calleHoyViva(R, t, m) {
  b_cieloVivo(R, t, m, 101, 'dia', 0.4);
  const luz = Math.floor(t / 3) % 2; R.disco(226.5, 75, 2, luz ? hex('#3a1a1a') : hex('#e83a3a')); R.disco(226.5, 84, 2, luz ? hex('#3ae86a') : hex('#1a3a1a'));
  b_humo(R, 121, 156, t, 3, { alto: 26, r: 4, viento: 0.3, vel: 0.5, cols: [hex('#c8c8cc'), hex('#e0e0e4'), hex('#f4f4f6')] });
  for (let k = 0; k < 2; k++) { const u = (t * 0.09 + k * 0.5) % 1, x = Math.round(lerp(b_xIz(0.55) - 40, b_xDe(0.55) + 40, k ? 1 - u : u)), y = 120; R.rect(x - 7, y - 5, x + 7, y, k ? hex('#e8c040') : hex('#3a5a8a')); R.rect(x - 4, y - 8, x + 4, y - 5, k ? hex('#e8c040') : hex('#3a5a8a')); R.rect(x - 3, y - 7, x + 3, y - 6, hex('#8ac0e0')); R.pset(x - 4, y + 1, hex('#1c1c1c')); R.pset(x + 4, y + 1, hex('#1c1c1c')); }
  const ropa = [['#2a2a3a', '#3a5a8a'], ['#c83a3a', '#2a2a3a'], ['#e8c040', '#3a3a3a'], ['#4a8a5a', '#2a2a3a'], ['#8a5aa8', '#4a4a4a']];
  for (let k = 0; k < 5; k++) { const d = k % 2 ? -1 : 1, v = 6 + k, x = d > 0 ? ((t * v + k * 70) % 360) - 20 : 340 - ((t * v + k * 50) % 360); b_figurita(R, x, 139, t, k, { dir: d, ropa: ropa[k].map(hex) }); }
}

// dentro del fuerte (o.encuadre 'fuerte')
function b_fuerte(R, t, o) {
  const P = b_P, ing = b_lim(o.ingleses ?? 1);
  const cap = b_capa(R, 'na-fuerte', (marca, delante) => {
    const { rect, pset, disco, linea, poligono } = R;
    b_degradado(R, 0, 97, b_CIELOS.dia); b_sol(R, 150, 34, 7); marca();
    for (let x = 0; x < 320; x++) { const y1 = 86 + Math.round(Math.sin(x / 27 + 1) * 2.5 + Math.sin(x / 8) * 0.8); for (let y = y1; y < 97; y++) pset(x, y, y < y1 + 2 ? hex('#7a9a8a') : h(x >> 1, y, 800) < 0.3 ? hex('#5a7a66') : hex('#6a8a74')); }
    for (let k = 0; k < 8; k++) { const x = 20 + k * 40 + Math.round(h(k, 1, 801) * 10); rect(x, 89, x + 4, 93, hex('#9a8a7a')); rect(x, 88, x + 4, 88, hex('#8a5a4a')); }
    b_aguaFija(R, 97, 116, [[0, hex('#8ab8d0')], [0.4, hex('#6aa0be')], [1, hex('#4a86a8')]], 5); marca();
    delante();
    // la muralla de tierra: el parapeto con troneras y cestones, el talud de césped con el revestimiento de tablas
    for (let y = 103; y <= 137; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 110) { const tr = [40, 104, 168, 296].some((tx) => Math.abs(x - tx) < 7); if (tr && y < 107) continue; c = y === 103 || (tr && y === 107) ? P.cespedL : h(x >> 1, y, 802) < 0.3 ? P.cespedS : P.cesped; }
      else if (y < 113) c = y === 110 ? P.troncoL : (x % 9 === 0 ? P.troncoS : P.tronco);
      else if (y < 128) { c = h(x >> 1, y >> 1, 803) < 0.25 ? P.cespedS : h(x, y, 804) < 0.08 ? P.cespedL : P.cesped; if ((x * 2 + y * 3) % 23 === 0) c = hex('#8aa850'); }
      else c = y === 128 ? P.troncoL : (x % 12 === 0 || y === 133) ? P.troncoS : h(x >> 2, y, 805) < 0.2 ? P.troncoL : P.tronco;
      pset(x, y, c); }
    for (const tx of [40, 104, 168, 296]) { rect(tx - 7, 103, tx - 7, 107, P.cespedS); rect(tx + 7, 103, tx + 7, 107, P.cespedS); }
    for (const cx of [12, 72, 136, 232, 262]) { rect(cx - 5, 96, cx + 5, 109, P.borde); for (let y = 97; y < 109; y++) for (let x = cx - 4; x <= cx + 4; x++) pset(x, y, ((x + y) % 3 === 0) ? P.pajaS : (x + y * 2) % 4 === 0 ? P.pajaL : P.paja); rect(cx - 4, 96, cx + 4, 97, P.tierraT); }   // los cestones de mimbre
    // los cañones en sus cureñas, vistos desde atrás, apuntando por las troneras
    for (const tx of [40, 104, 168, 296]) { rect(tx - 6, 104, tx + 6, 110, P.borde); rect(tx - 5, 105, tx + 5, 109, P.tronco); rect(tx - 5, 105, tx + 5, 105, P.troncoL);
      for (const wx of [tx - 7, tx + 6]) { disco(wx + 0.5, 109, 3, P.borde); disco(wx + 0.5, 109, 2, P.troncoS); pset(wx, 108, P.troncoL); }
      disco(tx, 103, 3.5, P.borde); disco(tx, 103, 2.6, P.hierro); pset(tx - 1, 102, P.hierroL); rect(tx - 2, 98, tx + 2, 102, P.hierro); rect(tx - 1, 97, tx + 1, 98, P.hierro); pset(tx - 1, 99, P.hierroL); pset(tx, 105, P.hierro); }
    // la escalera de tablas
    for (let k = 0; k < 9; k++) { const x = 116 + k * 3.4, y = 136 - k * 3; rect(x, y, x + 8, y, P.troncoL); rect(x, y + 1, x + 8, y + 1, P.troncoS); }
    linea(114, 137, 144, 110, P.borde); linea(124, 137, 154, 110, P.borde);
    // el patio: tierra pisada con roderas, piedras, charcos con el cielo y matas de hierba
    for (let y = 137; y < 180; y++) for (let x = 0; x < 320; x++) { let c = h(x >> 1, y >> 1, 806) < 0.25 ? P.tierraTS : h(x, y, 807) < 0.06 ? P.tierraTL : P.tierraT;
      if (Math.abs(((x - 160) * 0.3 + (y - 137) * 1.6) % 40 - 20) < 1 && y > 150) c = P.tierraTS;
      for (const [cx, cy, rx] of [[190, 170, 18], [70, 166, 12]]) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / (rx * 0.25)) ** 2; if (e < 1) c = e > 0.75 ? P.barroS : (x + y) % 5 === 0 ? hex('#d8ecf6') : hex('#8ab8d8'); }
      pset(x, y, c); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 808) * 319), y = 140 + Math.round(h(k, 2, 808) * 38); pset(x, y, P.piedraS); pset(x + 1, y, P.piedra); pset(x, y - 1, P.piedraL); }
    for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 3, 808) * 319), y = 138 + (k % 3); for (let i = -2; i <= 2; i++) linea(x + i, y, x + i * 2, y - 3 - (i & 1), P.cespedS); }
    // la casa del gobernador, el cuartel y el pozo
    const casa = b_casaEsc(R, 0, 92, 152, 84, 34, P, 12, { esc: 1.1, pasos: 4, puertaX: 36 });
    rect(-1, 150, 94, 152, P.piedraS);
    const cu = b_casaTeja(R, 244, 319, 150, 124, 110, P, 13, { esc: 0.75, buhardilla: false, chimeneas: [262, 304], puertaF: 0.3 });
    rect(98, 150, 116, 156, P.borde); for (let y = 151; y < 156; y++) for (let x = 99; x < 116; x++) pset(x, y, (x + (y & 1) * 2) % 4 === 0 ? P.piedraS : P.piedra); rect(98, 150, 116, 150, P.piedraL);
    rect(100, 134, 101, 150, P.troncoS); rect(113, 134, 114, 150, P.troncoS); rect(98, 132, 116, 134, P.tejaS); rect(99, 131, 115, 131, P.teja); rect(101, 139, 113, 139, P.tronco);
    // las balas apiladas y las barricas de pólvora
    for (let f = 0; f < 4; f++) for (let i = 0; i < 4 - f; i++) { const x = 176 + i * 5 + f * 2.5, y = 151 - f * 4; disco(x, y, 2.6, P.borde); disco(x, y, 2, P.hierro); pset(Math.round(x) - 1, y - 1, P.hierroL); }
    for (const [bx, by] of [[226, 152], [235, 152], [230, 143]]) { rect(bx - 1, by - 10, bx + 8, by, P.borde); rect(bx, by - 9, bx + 7, by - 1, hex('#8a5a32')); rect(bx + 5, by - 9, bx + 7, by - 1, hex('#6a4426')); rect(bx, by - 7, bx + 7, by - 7, P.hierro); rect(bx, by - 3, bx + 7, by - 3, P.hierro); rect(bx + 1, by - 9, bx + 2, by - 1, hex('#a87040')); }
    // matas y flores en el talud, la garita del centinela, la carretilla con la pala y el camino de losas
    for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 809) * 319), y = 114 + Math.round(h(k, 2, 809) * 12); if (x < 98 || (x > 112 && x < 158) || x > 240) continue; for (let i = -1; i <= 1; i++) linea(x + i, y, x + i * 2, y - 2 - (i & 1), k % 2 ? P.cespedS : P.cespedL); if (k % 5 === 0) pset(x, y - 3, k % 2 ? hex('#e8c040') : hex('#f0e8d8')); }
    rect(282, 91, 296, 110, P.borde); rect(283, 93, 295, 110, P.tronco); for (let x = 285; x < 295; x += 3) rect(x, 93, x, 110, P.troncoS); rect(286, 97, 292, 108, hex('#2e2014')); R.poligono([[280, 93], [289, 84], [298, 93]], P.borde); R.poligono([[282, 92], [289, 86], [296, 92]], P.tejaS); linea(289, 86, 296, 92, P.teja);
    rect(150, 152, 166, 156, P.borde); rect(151, 153, 165, 155, P.tronco); disco(148, 157, 3, P.borde); disco(148, 157, 2, P.troncoS); linea(166, 154, 172, 158, P.troncoS); linea(166, 153, 172, 157, P.borde); rect(152, 151, 164, 152, P.tierraTL);
    linea(170, 138, 176, 156, P.troncoL); rect(175, 155, 178, 158, P.hierro);
    for (let k = 0; k < 16; k++) { const u = k / 15, x = Math.round(lerp(44, 206, u) + (h(k, 1, 799) - 0.5) * 4), y = Math.round(158 + Math.sin(u * 3) * 3 + (k % 2) * 2), w = 3 + Math.round(h(k, 2, 799) * 2); rect(x - w, y - 1, x + w, y + 1, P.tierraTS); rect(x - w + 1, y - 1, x + w - 1, y, b_mezcla(P.piedra, P.tierraT, 0.35)); rect(x - w + 1, y - 1, x - 1, y - 1, P.piedra); }
    // el mástil con su base de piedra, la cornamusa y la verga
    rect(209, 146, 219, 152, P.borde); rect(210, 147, 218, 151, P.piedra); rect(210, 147, 218, 147, P.piedraL);
    rect(212, 26, 215, 147, P.borde); rect(213, 27, 214, 147, P.troncoL); rect(214, 27, 214, 147, P.tronco); rect(206, 40, 221, 41, P.borde); disco(213.5, 25, 2, P.oro ?? hex('#e8b830'));
    rect(216, 132, 218, 133, P.hierro);
    return { casa, cu };
  });
  R.copiar(cap.b);
  const m = cap.m;
  b_cieloVivo(R, t, m, 97, 'dia', 0.5); b_gaviotas(R, t, 4, 44, 88);
  b_aguaViva(R, t, m, 2, 98, 116, [hex('#b8dcec'), hex('#3a6e8e'), hex('#ffffff')], 0.7, 0.6);
  // los barcos de guerra ingleses, grandes y fondeados en la bahía, con el casco entero por encima del parapeto: dos
  // filas de troneras con los cañones asomando, tres palos con las velas a medio aferrar, la bandera de San Jorge en
  // la popa y el gallardete; un bote de remos va y viene entre el barco grande y la orilla
  if (ing > 0) {
    [[118, 98, 0.78, 0.55], [252, 99, 0.9, 0.7], [180, 100, 1.1, 0.6]].forEach(([x, y, s, v], k) => { const u = b_lim(ing * 1.2 - k * 0.1), xx = lerp(400 + k * 40, x, 1 - (1 - u) ** 2);
      b_barco(R, xx, y, t, { s, tipo: 'guerra', dir: -1, velas: v + (1 - u) * 0.3, bandera: 'inglesa', canones: true, reflejo: hex('#2e5e7e') }); });
    if (ing >= 1) { const u = (t * 0.05) % 1, ida = u < 0.5, bx = Math.round(lerp(202, 146, ida ? u * 2 : 2 - u * 2)), by = 101, rem = Math.sin(t * 5) > 0 ? 1 : 0;
      R.rect(bx - 6, by - 2, bx + 6, by, hex('#1c1222')); R.rect(bx - 5, by - 2, bx + 5, by - 1, hex('#6a4a2a')); R.rect(bx - 5, by - 2, bx + 5, by - 2, hex('#9a7040'));
      for (const dx of [-3, 1]) { R.rect(bx + dx, by - 5, bx + dx + 1, by - 3, hex('#c8303a')); R.pset(bx + dx, by - 6, hex('#e8b890')); R.pset(bx + dx + 1, by - 6, hex('#1c1222')); R.linea(bx + dx, by - 3, bx + dx - 2 + rem * 3, by + 1, hex('#8a6a3a')); } }
  }
  b_delante(R, cap);
  // el centinela que pasea por la muralla, la driza de la bandera y el humo de las chimeneas del cuartel
  { const u = (t * 0.06) % 2, x = 150 + (u < 1 ? u : 2 - u) * 120; b_figurita(R, x, 109, t, 1, { dir: u < 1 ? 1 : -1 }); }
  const bt = b_cambioBandera(o, t), yb = 30 + Math.round(bt.baja * 88);
  R.linea(216, 29, 216, 132, hex('#d8d0bc')); b_bandera(R, 216, yb, t, bt.tipo, 22, 14, { amp: 2 });
  cap.info.cu.chimeneas.forEach(([x, y], k) => b_humo(R, x, y, t, k, { alto: 22, r: 3 }));
  return { suelo: 162, pies: [120, 250], hor: 97, mastil: { x: 214, y0: 26, y1: 147, bandera: [216, yb] }, muralla: { y: 110, x: [0, 319], escalera: [[118, 136], [150, 110]] }, casa: { puerta: cap.info.casa.puerta }, pozo: [98, 132, 116, 156], balas: [174, 138, 194, 154] };
}
// el despacho del comerciante con la carta de 1626 (o.encuadre 'mesa')
function b_mesa(R, t, o) {
  const P = b_P, cap = b_mesaCapa(R);
  R.copiar(cap.b);
  // por la ventana: el cielo y el agua que se mueven, el barco que se mece y las gaviotas (recortado al hueco)
  const [vx0, vy0, vx1, vy1] = [184, 20, 262, 92];
  R.recorte([vx0, vy0, vx1, vy1]);
  b_cieloVivo(R, t, cap.m, 70, 'dia', 0.3);
  b_aguaViva(R, t, cap.m, 2, 72, 92, [hex('#b8dcec'), hex('#3a6e8e'), hex('#ffffff')], 0.5, 0.5);
  b_barco(R, 232, 84, t, { s: 0.6, tipo: 'fluyt', velas: 0, bandera: 'holandesa', reflejo: hex('#2e5e7e') });
  b_gaviotas(R, t, 2, 30, 60);
  R.recorte(null);
  b_emplomado(R, vx0, vy0, vx1, vy1, t);
  b_mesaDelante(R, t);
  if (o.delante !== false) R.delante = () => b_mesaDelante(R, t);   // rodar la vuelve a pintar al acabar el plano, por delante de quien esté detrás
  return { suelo: 138, pies: [100, 200], mesa: { y: 128, detras: 138, x: [0, 319] }, carta: [118, 136, 178, 166], sello: [158, 158], pluma: [196, 140], telas: [8, 132, 66, 160], hachas: [70, 136, 118, 174], cazos: [214, 132, 256, 160], cuentas: [262, 140, 310, 170], ventana: [vx0, vy0, vx1, vy1], vela: [100, 128] };
}

// la capa fija del despacho
function b_mesaCapa(R) {
  const P = b_P;
  return b_capa(R, 'na-mesa', (marca) => {
    const { rect, pset, disco, linea } = R;
    // lo que se ve por la ventana: cielo, la otra orilla y el agua
    b_degradado(R, 0, 70, b_CIELOS.dia); marca();
    for (let x = 180; x < 266; x++) { const y1 = 64 + Math.round(Math.sin(x / 9) * 1.5); for (let y = y1; y < 71; y++) pset(x, y, h(x, y, 810) < 0.3 ? hex('#5a8064') : hex('#6a9070')); }
    b_aguaFija(R, 71, 93, [[0, hex('#8ab8d0')], [0.5, hex('#6aa0be')], [1, hex('#4a86a8')]], 7); marca();
    // la pared de yeso encalado con manchas y grietas, las vigas del techo y el friso de madera
    for (let y = 0; y < 106; y++) for (let x = 0; x < 320; x++) { if (x >= 184 && x <= 262 && y >= 20 && y <= 92) continue; let c = h(x >> 2, y >> 2, 811) < 0.2 ? hex('#e0d6c0') : h(x, y, 812) < 0.05 ? hex('#cfc4ac') : hex('#ece4d0');
      if (y < 9) c = y === 8 ? hex('#2e1e14') : (x + y * 3) % 17 === 0 ? hex('#4a3020') : hex('#5e3e26'); pset(x, y, c); }
    for (const bx of [0, 150, 290]) { rect(bx, 9, bx + 9, 106, hex('#4a3020')); rect(bx + 1, 9, bx + 2, 106, hex('#6e4a2e')); for (let y = 14; y < 106; y += 13) rect(bx + 4, y, bx + 6, y, hex('#2e1e14')); }
    linea(30, 20, 60, 22, hex('#c8bea8')); linea(60, 22, 64, 30, hex('#c8bea8')); linea(272, 40, 276, 56, hex('#c8bea8'));
    for (let y = 106; y < 128; y++) for (let x = 0; x < 320; x++) { const pan = x % 40, c = y === 106 ? hex('#8a5a32') : y === 107 ? hex('#3e2614') : pan < 2 || y === 112 || y === 124 ? hex('#4a3020') : pan === 2 || y === 113 ? hex('#8a5a32') : h(x >> 1, y, 813) < 0.2 ? hex('#5e3e26') : hex('#6e4a2e'); pset(x, y, c); }
    // el hueco de la ventana con su derrame en sombra
    for (let y = 16; y <= 96; y++) for (let x = 180; x <= 266; x++) { if (x >= 184 && x <= 262 && y >= 20 && y <= 92) continue; pset(x, y, x === 180 || x === 266 || y === 16 || x === 183 || x === 263 || y === 19 || y === 93 ? hex('#2e1e14') : y < 19 || x > 263 ? hex('#a89e88') : hex('#d4cab4')); }
    rect(178, 96, 268, 99, hex('#6e4a2e')); rect(178, 96, 268, 96, hex('#a87040'));
    // la estantería con jarras, platos de peltre, libros y la balanza
    rect(14, 46, 132, 48, hex('#3e2614')); rect(14, 46, 132, 46, hex('#8a5a32')); rect(14, 80, 132, 82, hex('#3e2614')); rect(14, 80, 132, 80, hex('#8a5a32'));
    for (const [x, y, w, a, c] of [[18, 46, 10, 14, '#3a5a8a'], [32, 46, 8, 11, '#c8b48a'], [44, 46, 9, 16, '#7a4a2a'], [80, 80, 5, 14, '#8a2a2a'], [86, 80, 4, 12, '#2a5a3a'], [91, 80, 5, 15, '#5a3a6a'], [97, 80, 4, 11, '#8a6a2a'], [102, 80, 5, 14, '#2a3a6a'], [108, 80, 4, 13, '#6a2a2a']]) {
      rect(x - 1, y - a - 1, x + w, y - 1, hex('#2e1e14')); rect(x, y - a, x + w - 1, y - 1, hex(c)); rect(x, y - a, x, y - 1, b_mezcla(hex(c), hex('#ffffff'), 0.3)); if (y === 80) rect(x, y - a + 3, x + w - 1, y - a + 3, hex('#e8b830')); else { rect(x + 2, y - a - 2, x + w - 3, y - a, hex(c)); } }
    for (const px of [60, 74]) { disco(px, 38, 7, hex('#4a4a52')); disco(px, 38, 6, hex('#9a9aa6')); disco(px, 38, 4, hex('#b8b8c4')); pset(px - 3, 34, hex('#f0f0f4')); }
    for (const px of [20, 36, 52]) { rect(px - 1, 66, px + 9, 80, hex('#2e1e14')); rect(px, 67, px + 8, 79, px === 36 ? hex('#4a6a8a') : hex('#c8a46a')); rect(px + 2, 64, px + 6, 67, hex('#2e1e14')); rect(px + 1, 70, px + 7, 70, hex('#f0e8d8')); }
    rect(118, 64, 119, 79, hex('#4a4a52')); rect(110, 64, 127, 64, hex('#4a4a52')); for (const sx of [110, 126]) { linea(sx, 64, sx - 3, 72, hex('#8a8a96')); linea(sx, 64, sx + 3, 72, hex('#8a8a96')); rect(sx - 4, 72, sx + 4, 73, hex('#c8783a')); } rect(114, 79, 124, 80, hex('#4a4a52'));
    // el mapa clavado: costa, ríos, la rosa de los vientos (sin letras)
    rect(156, 18, 176, 92, hex('#2e1e14')); rect(157, 19, 175, 91, hex('#e8d8b4')); for (let y = 19; y < 92; y++) for (let x = 157; x < 176; x++) if (h(x, y, 814) < 0.08) pset(x, y, hex('#d0bc94'));
    for (let y = 24; y < 88; y++) { const x = 164 + Math.round(Math.sin(y / 7) * 3 + Math.sin(y / 3) * 1); pset(x, y, hex('#6a5a3a')); for (let x2 = x + 1; x2 < 176; x2++) if ((x2 + y) % 3 === 0) pset(x2, y, hex('#9ab4c0')); }
    linea(160, 40, 165, 52, hex('#4a7aa0')); linea(158, 66, 166, 70, hex('#4a7aa0')); disco(168, 80, 3, hex('#8a2a2a')); pset(168, 76, hex('#2e1e14')); pset(168, 84, hex('#2e1e14')); pset(164, 80, hex('#2e1e14')); pset(172, 80, hex('#2e1e14'));
    for (const [x, y] of [[157, 19], [175, 19], [157, 91], [175, 91]]) pset(x, y, hex('#8a8a96'));
    // la mesa de roble: el tablero con las vetas en perspectiva y el canto de luz
    for (let y = 128; y < 180; y++) { const s = (y - 40) / 140; for (let x = 0; x < 320; x++) { const X = (x - 160) / s, tabla = Math.floor((X + 400) / 34), en = ((X + 400) % 34);
        let c = en < 1 / s ? hex('#4a2c18') : h(tabla, Math.floor(y / 2 + Math.sin(X / 9) * 1.5), 815) < 0.25 ? hex('#7a4a28') : h(tabla, Math.floor(X / 3), 816) < 0.1 ? hex('#a8703c') : hex('#8e5a30');
        if (y === 128) c = hex('#c8905a'); else if (y === 129) c = hex('#a87040'); pset(x, y, c); } }
    // los rollos de tela roja y azul
    for (const [x, y, c0, c1, cS] of [[10, 158, '#c83a3a', '#e86a5a', '#8a2424'], [14, 146, '#2a4a8a', '#4a6aaa', '#1a2a5a']]) { for (let j = 0; j < 12; j++) for (let i = 0; i < 52; i++) pset(x + i, y - j, j < 2 ? hex(cS) : j > 9 ? hex(c1) : (i + j * 2) % 7 === 0 ? hex(cS) : hex(c0)); disco(x + 52, y - 6, 6, hex(cS)); disco(x + 52, y - 6, 5, hex(c0)); disco(x + 52, y - 6, 3, hex(cS)); disco(x + 52, y - 6, 1.5, hex(c1)); }
    // las hachas de hierro con su mango
    for (const [x, y] of [[70, 156], [84, 172]]) { for (let k = 0; k < 3; k++) linea(x, y + k - 1, x + 26, y - 8 + k - 1, k === 1 ? hex('#a8743c') : k === 0 ? hex('#c89058') : hex('#2e1e14'));
      R.poligono([[x + 21, y - 18], [x + 29, y - 20], [x + 33, y - 9], [x + 29, y - 2], [x + 22, y - 6]], hex('#2e1e14')); R.poligono([[x + 22, y - 17], [x + 28, y - 19], [x + 32, y - 9], [x + 28, y - 3], [x + 23, y - 7]], hex('#7a7a86'));
      linea(x + 29, y - 18, x + 32, y - 9, hex('#e8e8f0')); linea(x + 32, y - 9, x + 28, y - 3, hex('#d8d8e0')); rect(x + 24, y - 14, x + 26, y - 9, hex('#5a5a66')); pset(x + 25, y - 16, hex('#a8a8b4')); }
    // los cazos de cobre que brillan
    for (const [x, y, r] of [[222, 156, 9], [244, 150, 7]]) { disco(x, y, r + 1, hex('#3e1e10')); disco(x, y, r, P.cobre); disco(x + 2, y + 2, r - 2, P.cobreS); disco(x - 2, y - 2, r - 3, P.cobre); rect(x - r - 1, y - r + 1, x + r + 1, y - r + 2, P.cobreS); rect(x - r - 1, y - r + 1, x + r + 1, y - r + 1, P.cobreL); rect(x - 3, y - 4, x - 2, y + 2, P.cobreL); linea(x - r, y - r, x, y - r - 6, hex('#2e1e14')); linea(x, y - r - 6, x + r, y - r, hex('#2e1e14')); }
    // las sartas de cuentas de colores
    for (let k = 0; k < 3; k++) for (let i = 0; i < 15; i++) { const x = 264 + i * 3, y = 146 + k * 9 + Math.round(Math.sin(i / 2.6 + k) * 3), cc = hex(['#e8e0d0', '#2a4a8a', '#c83a3a', '#e8b830', '#4a8a5a', '#8a3a8a'][(i + k * 2) % 6]); disco(x, y, 2, hex('#2e1e14')); disco(x, y, 1.4, cc); pset(x - 1, y - 1, b_mezcla(cc, hex('#ffffff'), 0.6)); }
    rect(296, 142, 312, 152, hex('#2e1e14')); rect(297, 143, 311, 151, hex('#8a5a32')); rect(297, 143, 311, 144, hex('#a87040')); for (let i = 0; i < 6; i++) disco(299 + i * 2.4, 141 + (i % 2), 1.3, hex(['#2a4a8a', '#e8e0d0', '#c83a3a'][i % 3]));
    // la carta de 1626: papel con renglones sin letras, el sello rojo y la cinta; la pluma en el tintero
    rect(117, 135, 179, 167, hex('#5a4630')); rect(118, 136, 178, 166, hex('#ece0c0')); rect(118, 136, 178, 137, hex('#f8f0dc')); for (let y = 136; y < 167; y++) for (let x = 118; x < 179; x++) if (h(x, y, 817) < 0.05) pset(x, y, hex('#dccca4'));
    for (let k = 0; k < 8; k++) { const y = 140 + k * 3, L = k === 7 ? 18 : 44 - Math.round(h(k, 1, 818) * 12); for (let x = 122; x < 122 + L; x++) if (h(x >> 1, k, 819) > 0.18) pset(x, y, hex('#5a4a3a')); }
    rect(150, 158, 156, 166, hex('#c83a3a')); disco(160, 160, 4, hex('#6a1a1a')); disco(160, 160, 3, hex('#c8303a')); pset(159, 159, hex('#f07070')); pset(161, 161, hex('#8a2020'));
    rect(192, 140, 202, 148, hex('#1c1222')); rect(193, 141, 201, 147, hex('#3a3a46')); rect(194, 140, 200, 140, hex('#8a8a96')); pset(194, 142, hex('#8a8a96'));
    linea(197, 141, 212, 116, hex('#d8d0c0')); linea(198, 141, 214, 117, hex('#f4f0e6')); for (let k = 0; k < 7; k++) linea(205 + k, 128 - k * 2, 210 + k, 127 - k * 2, hex('#e8e0d0'));
    // el candelero (la llama se pinta en b_mesaDelante)
    rect(96, 140, 104, 141, hex('#4a4a52')); rect(99, 128, 101, 140, hex('#f0e8d4')); rect(101, 128, 101, 140, hex('#c8bca8'));
  });
}

// la ventana emplomada: el marco, el parteluz y la hoja izquierda con vidrio de rombos (la derecha, abierta)
function b_emplomado(R, x0, y0, x1, y1, t) {
  const xm = Math.round((x0 + x1) / 2), B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x < xm; x++) { const i = y * 320 + x; if (((x - y + 400) % 7 === 0) || ((x + y) % 7 === 0)) B[i] = hex('#4a4a52'); else B[i] = b_mezcla(B[i], hex('#c8d8c0'), 0.28); }
  R.rect(xm - 1, y0, xm + 1, y1, hex('#4a3020')); R.rect(x0, Math.round((y0 + y1) / 2) - 1, x1, Math.round((y0 + y1) / 2), hex('#4a3020'));
  R.rect(x1 - 1, y0, x1, y1, hex('#4a3020'));
  for (let y = y0 + 4; y < y1; y += 12) { R.pset(x0 + 3, y, hex('#f4f8ff')); R.pset(x0 + 4, y + 1, hex('#f4f8ff')); }
}

// la mesa del despacho por delante de quien esté detrás (pies en y 138): el tablero y lo que hay encima, y la llama
// de la vela que parpadea con su halo
export function b_mesaDelante(R, t) {
  const cap = b_mesaCapa(R), B = R.buf;
  for (let i = 128 * 320; i < 57600; i++) B[i] = cap.b[i];
  const f = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5, lx = 100 + (f > 0.6 ? 1 : 0);
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j * 1.2); if (d < 9 && b_um(lx + i, 124 + j) < (1 - d / 9) * 0.5) { const x = lx + i, y = 124 + j, c = R.pget(x, y); R.pset(x, y, b_mezcla(c, hex('#fff0a0'), 0.35)); } }
  R.pset(lx, 127, hex('#2e1e14')); R.rect(lx - 1, 123, lx + 1, 126, hex('#f0a040')); R.rect(lx, 121 + (f < -0.5 ? 1 : 0), lx, 125, hex('#fff4c0')); R.pset(lx, 120, hex('#f0a040'));
}

// un barco de vela de 1625–1776 (x, y: la línea de flotación en el centro): el casco de tablas con la luz arriba y la
// sombra abajo, la popa alta con sus ventanas, la cinta de color, los palos con las vergas, las velas (o.velas 0:
// recogidas en las vergas; 1: desplegadas e hinchadas), el foque, la jarcia, la bandera de popa y el gallardete; o.tipo
// 'fluyt' (holandés de carga, panzudo y marrón), 'guerra' (negro y ocre con dos filas de portas; o.canones asoma los
// cañones) o 'britanico' (como guerra, con la bandera roja); o.s escala (0,3–1,4); o.dir; o.tn: tinte (noche, bruma);
// o.reflejo: el color del reflejo en el agua; o.luces: las ventanas de popa encendidas
function b_barco(R, x, y, t, o = {}) {
  const s = o.s ?? 1, d = o.dir ?? 1, tipo = o.tipo ?? 'fluyt', vel = b_lim(o.velas ?? 0), tn = o.tn ?? b_id, guerra = tipo !== 'fluyt';
  const Y = Math.round(y + (o.quieto ? 0 : Math.sin(t * 1.4 + x * 0.07) * 0.8 * s)), L = 22 * s, X = (u) => Math.round(x + d * u * L), S = (v) => Math.round(v * s);
  const cH = tn(hex(guerra ? '#3a2a22' : '#7a4e2a')), cHS = tn(hex(guerra ? '#22181a' : '#54341c')), cHL = tn(hex(guerra ? '#5a4434' : '#9a6a3a')), cB = tn(hex(guerra ? '#c8a040' : '#3a5a3a')), k = tn(hex('#1c1222'));
  const lona = tn(hex('#f2ead6')), lonaS = tn(hex('#c8bca0')), lonaL = tn(hex('#fffaf0')), palo = tn(hex('#5a3a22'));
  // el reflejo, que tiembla
  if (o.reflejo != null) for (let j = 1; j <= S(6) + 1; j++) { const w = Math.round(L * (1 - j / (S(7) + 2))), off = Math.round(Math.sin(t * 3 + j) * 1.2); for (let i = -w; i <= w; i++) if (((i + j) & 1) === 0) R.pset(x + i + off, Y + 1 + j, tn(o.reflejo)); }
  // los palos, las vergas y las velas (por detrás del casco)
  const palos = [[-0.42, 30], [0.04, 36], [0.5, 27]];
  const cub = Y - S(5);
  if (s >= 0.4) { R.linea(X(0.9), cub - S(2), X(1.45), cub - S(9), palo); if (vel > 0.3) R.poligono([[X(0.56), cub - S(30)], [X(1.4), cub - S(8)], [X(0.62), cub - S(7)]], lonaS); }
  for (const [u, H] of palos) { const px = X(u), top = cub - S(H);
    R.rect(px, top, px + (s > 0.7 ? 1 : 0), cub, palo);
    for (const [f0, f1, ww] of [[0.3, 0.62, 9], [0.66, 0.92, 7]]) { const ya = Math.round(cub - S(H) * f1), yb = Math.round(cub - S(H) * f0), w = Math.max(2, S(ww));
      R.rect(px - w - 1, ya, px + w + 1, ya, palo);
      if (vel > 0.05) { const yv = Math.round(ya + (yb - ya) * vel); for (let yy = ya + 1; yy <= yv; yy++) { const panza = Math.round(Math.sin(((yy - ya) / Math.max(1, yv - ya)) * Math.PI) * s * 1.2); for (let xx = px - w - panza; xx <= px + w + panza; xx++) { const e = (xx - px) / (w + panza + 0.01); R.pset(xx, yy, yy === yv || Math.abs(e) > 0.86 ? lonaS : e * d > 0.3 ? lonaS : e * d < -0.35 ? lonaL : lona); } } }
      else { R.rect(px - w, ya + 1, px + w, ya + 1, lona); R.rect(px - w, ya + 2, px + w, ya + 2, lonaS); for (let xx = px - w; xx <= px + w; xx += 3) R.pset(xx, ya + 3, lonaS); } }
    if (s >= 0.45) { R.linea(px, top, X(-1), cub - S(4), tn(hex('#6a6a6a'))); R.linea(px, top + S(4), X(1.02), cub - S(2), tn(hex('#6a6a6a'))); } }
  // el gallardete en lo alto del palo mayor
  { const px = X(0.04), top = cub - S(36); for (let i = 0; i < S(12); i++) R.pset(px + d * (i + 1), top + 1 + Math.round(Math.sin(t * 7 - i * 0.6) * 1.2 * i / 10), tn(i % 4 < 2 ? hex(guerra ? '#c8303a' : '#e8783a') : hex(guerra ? '#f4f0e6' : '#2a3a7a'))); }
  // el casco: el contorno, el relleno y después las tablas, la luz y la sombra
  const pts = [[X(-1), Y - S(guerra ? 12 : 11)], [X(-0.74), Y - S(guerra ? 12 : 11)], [X(-0.72), cub - S(2)], [X(0.6), cub - S(1)], [X(1.08), cub - S(3)], [X(0.94), Y - S(1)], [X(0.7), Y + S(1)], [X(-0.8), Y + S(1)], [X(-0.98), Y - S(3)]];
  R.poligono(pts, cH);
  const xs = pts.map((p) => p[0]), xa = Math.min(...xs), xb = Math.max(...xs), ya = Math.min(...pts.map((p) => p[1]));
  for (let yy = ya; yy <= Y + S(1); yy++) for (let xx = xa; xx <= xb; xx++) { if (R.pget(xx, yy) !== cH) continue;
    const vy = (yy - cub) / Math.max(1, S(6)); let c = vy < 0.15 ? cHL : vy > 0.75 ? cHS : (yy - cub) % 2 ? cH : b_mezcla(cH, cHS, 0.35);
    if (guerra && (Math.abs(yy - cub - S(2)) < Math.max(1, s) || (s > 0.6 && Math.abs(yy - cub - S(4.5)) < Math.max(1, s * 0.6)))) c = cB;
    if (!guerra && yy - cub === S(2)) c = cB;
    if (guerra && s >= 0.5 && Math.abs(yy - cub - S(3.3)) <= Math.max(0, s * 0.8) && Math.round((xx - x) / Math.max(2, S(4.4))) % 2 === 0 && ((xx - x) % Math.max(2, S(4.4)) + Math.max(2, S(4.4))) % Math.max(2, S(4.4)) < Math.max(1, S(1.6))) c = k;
    R.pset(xx, yy, c); }
  for (let i = 0; i < pts.length; i++) { const [a, b] = [pts[i], pts[(i + 1) % pts.length]]; R.linea(a[0], a[1], b[0], b[1], k); }
  if (guerra && o.canones && s >= 0.5) for (let u = -0.6; u <= 0.6; u += 4.4 / 22) { const cx = Math.round(x + u * L * d); R.pset(cx, cub + S(3.3), tn(hex('#4a4a52'))); R.pset(cx, cub + S(3.3) + 1, k); }
  // la popa: ventanas (encendidas de noche) y el farol
  if (s >= 0.5) { for (let i = 0; i < 3; i++) R.pset(X(-0.94) + d * i * Math.max(1, S(2)), Y - S(9), o.luces ? tn(hex('#f8d070')) : tn(hex('#c8a040'))); R.pset(X(-1) - d, Y - S(13), o.luces ? hex('#ffe080') : tn(hex('#c8a040'))); }
  // la bandera de popa en su asta
  { const ax = X(-1) - d * S(1), at = Y - S(19); R.linea(ax, Y - S(11), ax, at, palo); if (o.bandera) b_bandera(R, ax, at, t, o.bandera, Math.max(4, S(10)), Math.max(3, S(7)), { dir: -d, tn, amp: s }); }
  return { x, y: Y, popa: [X(-1), Y - S(12)], proa: [X(1.08), cub - S(3)], cubierta: cub };
}

// la niebla en tres bancos que se mueven (una sola pasada por la pantalla), de lejos a cerca: uno alto y fino, uno
// medio y uno bajo y espeso pegado al agua o al suelo que llega hasta abajo. Cada banco tiene la cresta abultada como
// un cúmulo tumbado (bultos de anchos distintos que corren con t a su velocidad, los de cerca más deprisa), el canto
// de arriba más claro, jirones sueltos por encima que se deshilachan y, dentro, vetas más espesas que se mueven; la
// densidad se trama en cinco escalones con la trama 4×4. Al bajar n, los bancos se aclaran y suben (se levanta).
// o: { y0 (la cresta del banco alto), y1 (la del banco bajo), col, colL }
export function b_niebla(R, t, n, o = {}) {
  const B = R.buf, y1 = o.y1 ?? 150, y0 = o.y0 ?? 60, col = o.col ?? hex('#c8ccd4'), colL = o.colL ?? hex('#eef0f2'), sube = (1 - n) * 18;
  const capas = [
    { c: y0 + 4 - sube * 1.3, a: 5, w: 44, v: 2.5, d: 0.55, g: 12, ph: 0 },
    { c: (y0 + y1) / 2 - sube * 1.1, a: 8, w: 31, v: 6, d: 0.72, g: 20, ph: 17 },
    { c: y1 - 8 - sube * 0.7, a: 10, w: 23, v: 11, d: 0.94, g: 999, ph: 41 },
  ].map((L, k) => { const T = new Float32Array(320), F = new Float32Array(320);
    for (let x = 0; x < 320; x++) { const X = x + t * L.v + L.ph, b1 = Math.sqrt(Math.abs(Math.sin(Math.PI * X / L.w))), b2 = Math.sqrt(Math.abs(Math.sin(Math.PI * (X * 0.73 + 11) / (L.w * 1.7))));
      T[x] = L.c - L.a * (0.55 * b1 + 0.45 * b2) + 2.5 * Math.sin(X / 61 + k); F[x] = L.c + L.g * (0.6 + 0.4 * Math.sin(X / 37 + k * 2)); }
    return { ...L, T, F, cc: k === 0 ? b_mezcla(col, hex('#5a6080'), 0.12) : col, cl: k === 0 ? b_mezcla(colL, col, 0.35) : colL }; });
  const N = [0, 0.25, 0.48, 0.7, 0.88];
  let yA = 179; for (const L of capas) for (let x = 0; x < 320; x += 8) yA = Math.min(yA, Math.floor(L.T[x] - 9)); yA = Math.max(0, yA);
  for (let y = yA; y < 180; y++) { const f = y * 320;
    for (let x = 0; x < 320; x++) { let c = B[f + x], toca = false;
      for (const L of capas) { const dy = y - L.T[x]; let a = 0, borde = false;
        if (dy >= 0) { a = Math.min(1, (dy + 1) / 4) * (L.g > 900 ? 1 : b_lim((L.F[x] - y) / 9 + 0.15)); borde = dy < 2.5;
          a *= 0.82 + 0.18 * Math.sin(x / 9 + y / 4 + t * L.v * 0.12) * Math.sin(x / 23 - t * 0.3 + y / 11); }
        else if (dy > -8) { const j = Math.sin((x + t * L.v * 1.6) / 7 + y * 1.7 + L.ph) * Math.sin((x - t * L.v) / 19 + y); if (j > 0.45) a = (j - 0.45) * 0.9 * (1 + dy / 8); }
        a *= L.d * Math.min(1, n * 1.25); if (a <= 0.03) continue;
        const q = Math.min(3.999, a * 4), i = Math.floor(q), lv = N[Math.min(4, i + (b_um(x, y) < q - i ? 1 : 0))];
        if (lv > 0) { c = b_mezcla(c, borde ? L.cl : L.cc, lv); toca = true; } }
      if (toca) B[f + x] = c; } }
}

// el puerto lleno de velas británicas (o.encuadre 'flota')
function b_flota(R, t, o) {
  const P = b_P;
  const cap = b_capa(R, 'g-flota', (marca, delante) => {
    const { rect, pset, disco, linea } = R;
    b_degradado(R, 0, 89, b_CIELOS.dia); b_sol(R, 60, 34, 7); marca();
    for (let x = 0; x < 320; x++) { const yl = x < 130 ? 80 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 40) / 95) ** 2)) * 8 + Math.sin(x / 7) * 0.8) : x > 214 ? 82 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 290) / 80) ** 2)) * 7 + Math.sin(x / 6) * 0.8) : 89;
      for (let y = yl; y < 89; y++) pset(x, y, y === yl ? hex('#7a9a92') : h(x >> 1, y, 830) < 0.3 ? hex('#6a8a7c') : hex('#7a988a')); }
    marca();
    b_aguaFija(R, 89, 142, [[0, hex('#b8d8e8')], [0.15, hex('#8ab8d0')], [0.45, hex('#6aa0be')], [0.8, hex('#4a86a8')], [1, hex('#3e7698')]], 9); marca();
    // más de cien velas en el horizonte y, más cerca, los barcos fondeados
    for (let k = 0; k < 150; k++) { const x = Math.round(h(k, 1, 831) * 318), y = 89 + Math.round(h(k, 2, 831) ** 1.6 * 9), a = 2 + Math.round((y - 88) * 0.35 + h(k, 3, 831) * 2); if (x > 120 && x < 214 || h(k, 4, 831) < 0.6) {
      rect(x - 1, y, x + 2, y, hex('#3a3a46')); rect(x, y - a, x, y - 1, hex('#6a6a76')); rect(x - 1, y - a + 1, x + 1, y - 2, hex('#f4f0e6')); if (k % 3) { rect(x + 2, y - a + 2, x + 3, y - 2, hex('#e8e0d0')); } } }
    for (let k = 0; k < 34; k++) { const x = Math.round(h(k, 5, 832) * 330) - 5, y = 97 + Math.round(h(k, 6, 832) ** 1.2 * 18), s = 0.24 + (y - 97) * 0.009;
      b_barco(R, x, y, 0, { s, tipo: 'guerra', dir: k % 2 ? 1 : -1, velas: h(k, 7, 832) < 0.5 ? 1 : 0, quieto: true, bandera: 'britanica', reflejo: hex('#5a8aa8') }); }
    delante();
    // la colina de Manhattan: hierba, flores, la cerca, el roble y la granja
    const cresta = (x) => 134 + Math.round(Math.sin(x / 50) * 4 + Math.sin(x / 17) * 1.5 + (x > 230 ? (x - 230) * -0.12 : 0));
    for (let x = 0; x < 320; x++) { const c0 = cresta(x); for (let y = c0; y < 180; y++) { let c = h(x >> 1, y >> 1, 833) < 0.25 ? P.cespedS : h(x, y, 834) < 0.08 ? P.cespedL : P.cesped; if (y === c0) c = P.cespedL; if (y > 165 && (x * 3 + y * 7) % 19 === 0) c = hex('#8a6a3a'); pset(x, y, c); } }
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 835) * 319), y = cresta(x) + 4 + Math.round(h(k, 2, 835) * 40); pset(x, y, hex(['#f0e8d8', '#e8c040', '#c86a9a', '#e86a3a'][k % 4])); pset(x, y + 1, P.cespedS); }
    for (let x = 4; x < 320; x += 26) { const y = cresta(x) + 14; rect(x, y - 13, x + 2, y, P.borde); rect(x + 1, y - 12, x + 1, y, P.troncoL); }
    for (let x = 4; x < 300; x += 26) { const ya = cresta(x) + 14, yb = cresta(x + 26) + 14; linea(x + 2, ya - 10, x + 26, yb - 10, P.troncoS); linea(x + 2, ya - 11, x + 26, yb - 11, P.troncoL); linea(x + 2, ya - 5, x + 26, yb - 5, P.troncoS); linea(x + 2, ya - 6, x + 26, yb - 6, P.troncoL); }
    // el roble grande de la izquierda
    for (let j = 0; j < 62; j++) { const w = 3 + Math.round(j < 6 ? 6 - j : 0); for (let i = -w; i <= w; i++) pset(26 + i, 168 - j, i === -w || i === w ? P.borde : i < -1 ? P.troncoL : i > 1 ? P.troncoS : (j * 3 + i) % 7 === 0 ? P.troncoS : P.tronco); }
    linea(26, 120, 10, 104, P.tronco); linea(26, 118, 46, 100, P.tronco); linea(27, 119, 47, 101, P.troncoS);
    const copa = [[24, 92, 22], [6, 102, 16], [46, 98, 17], [28, 76, 16], [0, 84, 12]];
    for (const [cx, cy, r] of copa) disco(cx, cy + 1, r + 1, hex('#1e3a1e')); for (const [cx, cy, r] of copa) disco(cx, cy, r, hex('#2e5a2a')); for (const [cx, cy, r] of copa) disco(cx - 3, cy - 3, r * 0.68, hex('#3e7a36')); for (const [cx, cy, r] of copa) disco(cx - 5, cy - 6, r * 0.35, hex('#5a9a46'));
    for (let k = 0; k < 120; k++) { const cx = Math.round(h(k, 1, 836) * 66) - 12, cy = 64 + Math.round(h(k, 2, 836) * 50); if (R.pget(cx, cy) === hex('#3e7a36') || R.pget(cx, cy) === hex('#2e5a2a')) pset(cx, cy, k % 3 ? hex('#1e3a1e') : hex('#6aaa52')); }
    // la granja con su chimenea
    b_casaTeja(R, 262, 306, 132, 114, 102, P, 21, { esc: 0.6, buhardilla: false, chimeneas: [296] });
  });
  R.copiar(cap.b);
  const m = cap.m;
  b_cieloVivo(R, t, m, 89, 'dia', 0.5); b_gaviotas(R, t, 6, 40, 86);
  b_aguaViva(R, t, m, 3, 90, 142, [hex('#c8e4f0'), hex('#3e7698'), hex('#ffffff')], 0.9, 0.7);
  const cerca = [[70, 128, 0.62, 1], [118, 124, 0.5, -1], [168, 131, 0.7, 1], [210, 126, 0.55, -1], [250, 135, 0.82, -1], [292, 129, 0.6, 1], [20, 133, 0.75, -1]];
  cerca.forEach(([x, y, s, d], k) => { const b = b_barco(R, x, y, t, { s, tipo: 'guerra', dir: d, velas: k % 3 === 0 ? 0.9 : 0, bandera: 'britanica', canones: true, reflejo: hex('#2e6688') }); if (k % 2 === 0) b_humo(R, b.x - d * 4, b.cubierta - 3, t, k, { alto: 14, r: 1.6, viento: 0.6, vel: 0.5 }); });
  b_delante(R, cap);
  // la hierba de la cresta que ondea, las hojas del roble que brillan y el humo de la granja
  for (let x = 1; x < 320; x += 3) { const c0 = 134 + Math.round(Math.sin(x / 50) * 4 + Math.sin(x / 17) * 1.5 + (x > 230 ? (x - 230) * -0.12 : 0)), w = Math.round(Math.sin(t * 2.4 + x * 0.15) * 1.6); R.linea(x, c0, x + w, c0 - 3 - (x % 2), x % 2 ? b_P.cespedL : b_P.cespedS); }
  for (let x = 2; x < 320; x += 5) { const y = 166 + (x % 4), w = Math.round(Math.sin(t * 2 + x * 0.1) * 2); R.linea(x, y + 6, x + w, y, b_P.cespedS); R.pset(x + w, y - 1, b_P.cespedL); }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 837) * 60) - 8, y = 70 + Math.round(h(k, 2, 837) * 40); if (Math.sin(t * 3 + k * 1.9) > 0.6) R.pset(x, y, hex('#9ad07a')); }
  b_humo(R, 297, 92, t, 4, { alto: 24, r: 3, viento: 0.6 });
  return { suelo: 164, pies: [60, 240], hor: 89, agua: [0, 89, 319, 142], cerca: 'postes cada 26 px desde x 4, y ≈ 136–148', roble: [26, 168], niebla: { y0: 70, y1: 140 } };
}

// el campamento de Brooklyn junto al río Este (o.encuadre 'campamento')
const b_CIELO_ALBA = new Set([...b_CIELOS.alba.map((p) => p[1]), hex('#fff0d0'), hex('#f8c8a0')]);

function b_campamento(R, t, o) {
  const P = b_P, alba = (o.luz ?? 'dia') === 'alba', vacio = b_lim(o.vacio ?? 0) >= 0.5;
  const tn = alba ? b_tinte(hex('#6a6488'), 0.24) : b_id;
  const tiendas = [];
  for (let k = 0; k < 11; k++) tiendas.push([4 + k * 29 + (k % 2) * 5, 92, 0.36]);
  for (let k = 0; k < 9; k++) tiendas.push([12 + k * 34 + (k % 2) * 6, 100, 0.5]);
  for (let k = 0; k < 5; k++) tiendas.push([20 + k * 38, 117, 0.75]);
  const caida = 20 + 1;
  const cap = b_capa(R, 'g-camp|' + alba + '|' + vacio, (marca) => {
    const { rect, pset, disco, linea } = R;
    b_degradado(R, 0, 67, alba ? b_CIELOS.alba : b_CIELOS.dia); if (alba) b_sol(R, 250, 62, 6, hex('#fff0d0'), hex('#f8c8a0')); marca();
    // Manhattan al otro lado, velada por la distancia: las lomas con árboles, la fila de casas de ladrillo y de piedra
    // con sus tejados y chimeneas, la aguja de la Trinidad, un molino, el muelle y los mástiles de los barcos amarrados
    const bruma = (c, a = 0.42) => b_mezcla(hex(c), hex('#b8cad6'), a);
    for (let x = 0; x < 320; x++) { const y = 52 + Math.round(Math.sin(x / 41) * 3 + Math.sin(x / 13) * 1.2); for (let yy = y; yy < 67; yy++) pset(x, yy, yy === y ? bruma('#8aa088', 0.5) : h(x >> 1, yy, 840) < 0.35 ? bruma('#5e7a62', 0.5) : bruma('#6e8a6e', 0.5)); }
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 847) * 320), y = 54 + Math.round(Math.sin(x / 41) * 3) + Math.round(h(k, 2, 847) * 4), r = 2 + h(k, 3, 847) * 2; disco(x, y, r, bruma('#4a6a4e', 0.48)); pset(Math.round(x - r * 0.4), Math.round(y - r * 0.5), bruma('#8aaa7a', 0.45)); }
    const FACH = ['#a8584a', '#8a5048', '#b8a890', '#9a6a52', '#c0b4a0'], TEJ = ['#5a4a4e', '#6a4a42', '#4e4a56'];
    for (const [x0, w, alto, tipo] of b_RIO.casas) { const top = 65 - alto, x1 = x0 + w, f = FACH[(x0 + alto) % 5], tj = TEJ[tipo];
      for (let y = top; y < 66; y++) for (let x = x0; x <= x1; x++) pset(x, y, x === x1 ? bruma(f, 0.62) : x === x0 ? bruma('#5a4a4a', 0.5) : bruma(f));
      for (let fl = 0; fl < (alto > 9 ? 2 : 1); fl++) for (let i = 2; i < w - 1; i += 3) pset(x0 + i, top + 2 + fl * 4, bruma('#3a3a4a', 0.38));
      if (tipo === 0) { const a = Math.max(3, Math.round(w / 2.4)); for (let j = 1; j <= a; j++) { const e = Math.round(j * (w / 2) / a); rect(x0 + e, top - j, x1 - e, top - j, bruma(tj)); pset(x0 + e, top - j, bruma('#8a7a7a', 0.45)); } }
      else if (tipo === 1) { for (let s = 1; s <= 3; s++) { const e = s * Math.round(w / 7); rect(x0 + e, top - s * 2, x1 - e, top - s * 2 + 1, bruma(f)); pset(x0 + e, top - s * 2, bruma('#e0d0c0', 0.4)); } }
      else { rect(x0, top - 1, x1, top - 1, bruma('#d8d0c0', 0.4)); rect(x0 + 1, top - 2, x1 - 1, top - 2, bruma(tj)); }
      if (w > 9 || tipo === 2) { const cx = x0 + 2 + Math.round(h(x0, 5, 859) * (w - 4)); rect(cx, top - 4, cx + 1, top - 1, bruma('#6a4a42')); } }
    rect(129, 44, 137, 66, bruma('#b0a898')); rect(137, 44, 137, 66, bruma('#8a8478')); rect(131, 48, 132, 52, bruma('#4a4a56')); rect(134, 48, 135, 52, bruma('#4a4a56')); rect(128, 43, 138, 43, bruma('#d8d0c0', 0.4));
    for (let j = 0; j < 18; j++) { const w = Math.round(3 - j * 0.17); rect(133 - w, 42 - j, 133 + w, 42 - j, bruma('#a09888')); pset(133 - w, 42 - j, bruma('#d0c8b8', 0.4)); } rect(133, 20, 133, 24, bruma('#c8a040', 0.3));
    for (const [mx, my] of [[64, 50], [262, 52]]) { rect(mx - 2, my, mx + 2, 63, bruma('#8a7a6a')); for (const [dx, dy] of [[-6, -6], [6, 6], [-6, 6], [6, -6]]) linea(mx, my, mx + dx, my + dy, bruma('#5a4e44')); }
    for (let x = 0; x < 320; x++) { pset(x, 66, bruma('#7a7a7a', 0.45)); pset(x, 67, (x % 7) ? bruma('#5a5a60', 0.45) : bruma('#3a3a40', 0.4)); }
    for (const [mx, ma] of [[30, 22], [44, 18], [182, 24], [196, 19], [296, 22]]) { rect(mx, 66 - ma, mx, 66, bruma('#4a3e36', 0.4)); rect(mx - 4, 66 - ma + 5, mx + 4, 66 - ma + 5, bruma('#4a3e36', 0.4)); linea(mx, 66 - ma, mx + 9, 64, bruma('#6a6460', 0.5)); rect(mx - 5, 63, mx + 6, 65, bruma('#4a3a30', 0.4)); }
    marca();
    b_aguaFija(R, 68, 88, [[0, hex('#a8c8d8')], [0.4, hex('#7aa8c0')], [1, hex('#5a8aa6')]], 11);
    for (let y = 68; y < 74; y++) for (let x = 0; x < 320; x++) if (b_um(x, y) < 0.5 - (y - 68) * 0.08) pset(x, y, b_mezcla(R.pget(x, y), R.pget(x, 66 - (y - 68) * 2), 0.45));
    marca();
    // la orilla de Brooklyn: barro con juncos y, arriba, el campo: hierba pisada en manchas, la tierra desnuda alrededor
    // de las hogueras y de la tienda grande, los caminos con roderas y las huellas
    const fuegos = [[110, 146], [182, 120], [60, 124]];
    for (let y = 86; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 90) c = y === 86 ? P.barroL : h(x, y, 842) < 0.3 ? P.barroS : (x + y) % 9 === 0 ? hex('#8aa0a8') : P.barro;
      else { const n = h(x >> 2, y >> 2, 848); c = h(x >> 1, y >> 1, 843) < 0.25 ? P.cespedS : h(x, y, 844) < 0.07 ? P.cespedL : n < 0.18 ? hex('#8a9a4a') : P.cesped;
        if ((x * 5 + y * 3) % 17 === 0 && n > 0.5) c = P.cespedL;
        for (const [fx, fy] of fuegos) { const e = ((x - fx) / 16) ** 2 + ((y - fy) / 6) ** 2; if (e < 1) c = e < 0.4 ? (h(x, y, 849) < 0.3 ? hex('#4a4038') : P.barroS) : h(x, y, 849) < 1 - e ? P.barro : c; }
        if (((x - 236) / 40) ** 2 + ((y - 134) / 7) ** 2 < 1) c = h(x, y, 850) < 0.4 ? P.barroL : P.barro;
        const camino = Math.abs(x - 150 - (y - 90) * 0.6 + Math.sin(y / 9) * 4) < 4 + (y - 90) * 0.08 || Math.abs(y - 134 - Math.sin(x / 30) * 3) < 3;
        if (camino) { c = h(x, y, 845) < 0.2 ? P.barroS : P.barroL; if (Math.abs(y - 134 - Math.sin(x / 30) * 3) < 3 && Math.abs(y - 134 - Math.sin(x / 30) * 3) > 1.6 && x % 3) c = P.barroS; } }
      pset(x, y, c); }
    for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 846) * 319), sw = (k % 3) - 1; for (let j = 0; j < 4 + (k % 3); j++) pset(x + (j > 2 ? sw : 0), 88 - j, k % 2 ? hex('#6a7a3a') : hex('#8a9a4a')); if (k % 4 === 0) pset(x + sw, 83 - (k % 3), hex('#7a5a3a')); }
    for (let k = 0; k < 120; k++) { const x = Math.round(h(k, 4, 846) * 319), y = 92 + Math.round(h(k, 5, 846) * 86); if (R.pget(x, y) !== P.cesped && R.pget(x, y) !== P.cespedS) continue; linea(x, y, x - 1, y - 2, P.cespedS); linea(x + 1, y, x + 2, y - 3, P.cespedL); }
    // las tiendas en tres filas, cada vez más grandes; vacío: una caída
    tiendas.forEach(([x, base, e], k) => { if (vacio && k === caida) b_tiendaCaida(R, x, base, e, P); else b_tienda(R, x, base, e, P, k); });
    // los tendederos entre tiendas (los postes; la ropa se mueve con el viento) y la leña apilada junto a cada fila
    for (const [x0, x1, y] of [[47, 80, 104], [270, 308, 112]]) { rect(x0, y - 9, x0, y, P.troncoS); rect(x1, y - 9, x1, y, P.troncoS); }
    for (const [lx, ly] of [[86, 121], [200, 104], [292, 116]]) for (let f = 0; f < 3; f++) for (let i = 0; i < 4 - f; i++) { const x = lx + i * 4 + f * 2, y = ly - f * 3; disco(x, y, 1.8, P.troncoS); pset(x, y, P.troncoL); }
    // la tienda de Washington: toldo grande con faldón festoneado y el mástil del banderín
    b_tiendaMayor(R, 210, 132, P);
    // hogueras (piedras y troncos), la olla, tambores, barricas, la leña y el carro (o sus roderas)
    for (const [fx, fy] of fuegos) { for (let a = 0; a < 8; a++) { const px = Math.round(fx + Math.cos(a * 0.8) * 6), py = Math.round(fy + Math.sin(a * 0.8) * 2.2); rect(px - 1, py - 1, px + 1, py, P.piedraS); pset(px, py - 1, P.piedra); pset(px + 1, py, hex('#5a5048')); } linea(fx - 4, fy, fx + 4, fy - 1, P.troncoS); linea(fx - 3, fy - 1, fx + 3, fy + 1, P.tronco); rect(fx - 2, fy - 1, fx + 2, fy, hex('#2a2222')); pset(fx - 1, fy, hex('#6a2a1a')); }
    if (!vacio) { linea(106, 146, 110, 132, P.hierro); linea(114, 146, 110, 132, P.hierro); }
    for (const [dx, dy] of [[150, 150], [158, 152]]) { rect(dx - 4, dy - 7, dx + 4, dy, P.borde); rect(dx - 3, dy - 6, dx + 3, dy - 1, hex('#e8e0d0')); rect(dx - 3, dy - 6, dx + 3, dy - 6, hex('#c83a3a')); rect(dx - 3, dy - 1, dx + 3, dy - 1, hex('#c83a3a')); for (let i = -3; i <= 3; i += 2) pset(dx + i, dy - 4 + (i & 2 ? 1 : 0), hex('#2a3a6a')); rect(dx + 2, dy - 6, dx + 3, dy - 1, hex('#c8bca8')); rect(dx - 5, dy + 1, dx + 5, dy + 1, b_mezcla(P.cesped, P.borde, 0.4)); }
    for (const [bx, by] of [[284, 150], [293, 150], [288, 141]]) { rect(bx - 1, by - 10, bx + 8, by, P.borde); rect(bx, by - 9, bx + 7, by - 1, hex('#8a5a32')); rect(bx + 5, by - 9, bx + 7, by - 1, hex('#6a4426')); rect(bx, by - 7, bx + 7, by - 7, P.hierro); rect(bx, by - 3, bx + 7, by - 3, P.hierro); rect(bx + 1, by - 9, bx + 2, by - 1, hex('#a87040')); }
    rect(282, 151, 302, 151, b_mezcla(P.cesped, P.borde, 0.45));
    for (let k = 0; k < 6; k++) { const y = 162 - (k % 3) * 3 - (k > 2 ? 3 : 0), x = 270 + (k % 3) * 5 + (k > 2 ? 2 : 0); disco(x, y, 2.5, P.borde); disco(x, y, 1.8, P.tronco); pset(x, y, P.troncoL); pset(x - 1, y - 1, P.troncoS); }
    // los sacos de harina y una carretilla junto a la tienda grande; el cubo y el banco de troncos junto al fuego del centro
    for (const [sx, sy] of [[196, 132], [202, 133], [199, 128]]) { disco(sx, sy - 2, 3, P.borde); disco(sx, sy - 2, 2.3, hex('#d8c8a0')); pset(sx - 1, sy - 3, hex('#f0e4c4')); pset(sx, sy - 5, P.borde); }
    rect(122, 150, 140, 151, P.troncoS); rect(122, 149, 140, 149, P.troncoL); for (const lx of [124, 138]) rect(lx, 152, lx + 1, 154, P.borde);
    if (!vacio) b_carro(R, 14, 160, P); else { for (const dx of [0, 22]) for (let x = 0; x < 80; x++) if (x % 3) pset(x + dx * 0.2, 158 + Math.round(dx * 0.25) - Math.round(x * 0.05), P.barroS); }
    if (vacio) { // las huellas que bajan al río, la olla olvidada, la manta tirada, el cubo volcado y un tambor abandonado
      for (let k = 0; k < 28; k++) { const u = k / 28, x = Math.round(lerp(140, 196, u) + (k % 2 ? 3 : -3) * (1 - u)), y = Math.round(lerp(176, 92, u)); pset(x, y, P.barroS); if (u < 0.6) pset(x + 1, y, P.barroS); }
      disco(124, 162, 4, P.borde); disco(124, 161, 3, P.hierro); rect(120, 158, 128, 158, P.borde); pset(122, 159, P.hierroL); linea(119, 157, 116, 154, P.hierro);
      for (let j = 0; j < 4; j++) for (let i = 0; i < 14; i++) pset(36 + i + j, 140 + j, (i + j) % 4 === 0 ? hex('#4a5a7a') : j === 0 ? hex('#8a98b8') : hex('#6a7a9a'));
      rect(172, 152, 177, 156, P.borde); rect(173, 153, 176, 155, hex('#7a7a84')); rect(173, 153, 173, 155, hex('#a8a8b4'));
      disco(250, 164, 4, P.borde); disco(250, 164, 3, hex('#e8e0d0')); rect(247, 163, 253, 163, hex('#c83a3a')); }
  }, alba ? (c) => (b_CIELO_ALBA.has(c) ? c : tn(c)) : null);
  R.copiar(cap.b);
  const m = cap.m;
  b_cieloVivo(R, t, m, 67, alba ? 'alba' : 'dia', 0.3); b_gaviotas(R, t, 3, 24, 50, hex('#f4f2ec'), hex('#5a5e6a'), tn);
  b_aguaViva(R, t, m, 3, 69, 87, [tn(hex('#c8e0ec')), tn(hex('#4a7a96')), tn(hex('#ffffff'))], 0.8, 0.5);
  // una balandra que baja por el río y un bote de remos que cruza (recortados al agua por su línea)
  { const x = ((t * 3 + 40) % 380) - 30; R.rect(x - 6, 77, x + 6, 78, tn(hex('#3a2a22'))); R.rect(x - 5, 77, x + 5, 77, tn(hex('#6a4a2a'))); R.rect(x, 64, x, 76, tn(hex('#4a3a2a'))); R.poligono([[x + 1, 65], [x + 7, 75], [x + 1, 75]], tn(hex('#f2ead6'))); R.poligono([[x - 1, 67], [x - 6, 75], [x - 1, 75]], tn(hex('#d8ccb0'))); for (let i = -5; i <= 5; i += 2) R.pset(x + i, 79, tn(hex('#8ab0c8'))); }
  { const x = 320 - ((t * 5 + 100) % 380), r = Math.sin(t * 4) > 0 ? 1 : -1; R.rect(x - 4, 83, x + 4, 84, tn(hex('#5a3a22'))); R.pset(x - 1, 82, tn(hex('#2a3a6a'))); R.pset(x + 1, 82, tn(hex('#2a3a6a'))); R.pset(x - 1, 81, tn(hex('#e8b890'))); R.pset(x + 1, 81, tn(hex('#e8b890'))); R.linea(x - 2, 83, x - 4 + r, 85, tn(hex('#a07a52'))); R.linea(x + 2, 83, x + 4 + r, 85, tn(hex('#a07a52'))); }
  // la ropa tendida que ondea (también en el campamento vacío: se fueron con prisa)
  for (const [x0, x1, y, k0] of [[47, 80, 104, 0], [270, 308, 112, 3]]) { const n = Math.round((x1 - x0) / 7); R.linea(x0, y - 9, x1, y - 8, tn(hex('#d8d0c0')));
    for (let i = 0; i < n; i++) { const x = x0 + 3 + i * 7, yy = y - 8 + Math.round((x - x0) / (x1 - x0)), col = tn(hex(['#f0ece0', '#c8d0e0', '#e8d8b8', '#a8b8d8'][(i + k0) % 4])), sw = Math.round(Math.sin(t * 3 + i * 1.3 + k0) * 1.5);
      for (let j = 0; j < 5; j++) for (let q = 0; q < 4; q++) R.pset(x + q + Math.round(sw * j / 5), yy + j, j === 4 || q === 3 ? b_mezcla(col, hex('#5a5a6a'), 0.25) : col); } }
  // el banderín de Washington, el fuego, el humo y la gente pequeña del campamento
  b_bandera(R, 237, 74, t, 'cuartel', 14, 9, { tn });
  for (const [fx, fy] of [[110, 146], [182, 120], [60, 124]]) { if (!vacio) b_fuego(R, fx, fy - 1, t, tn); else if (Math.sin(t * 3 + fx) > 0.2) R.pset(fx + (fx % 3) - 1, fy - 1, tn(hex('#e86a2a'))); b_humo(R, fx, fy - (vacio ? 2 : 8), t, fx, { alto: vacio ? 30 : 26, r: vacio ? 2 : 3, viento: 0.5, vel: vacio ? 0.25 : 0.4, tn }); }
  if (!vacio) { R.disco(110, 138, 3, tn(hex('#2a2a2a'))); R.rect(107, 136, 113, 136, tn(hex('#4a4a52'))); b_humo(R, 110, 134, t, 9, { alto: 8, r: 1, viento: 0.2, cols: [hex('#e0e0e4'), hex('#f0f0f4'), hex('#ffffff')], tn });
    const azul = [hex('#2a3a6a'), hex('#e8e0cc')], caz = [hex('#5a4a3a'), hex('#c8b48a')];
    [[96, 148, 1], [124, 148, -1], [170, 122, 1], [72, 126, -1], [48, 126, 1]].forEach(([x, y, d], k) => b_figurita(R, x, y, t, k, { dir: d, quieto: true, ropa: k % 2 ? caz : azul, tn }));
    for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, x = d > 0 ? ((t * (4 + k) + k * 90) % 360) - 20 : 340 - ((t * (4 + k) + k * 60) % 360); b_figurita(R, x, 106 + k * 12, t, k + 2, { dir: d, ropa: [hex('#2a3a6a'), hex('#e8e0cc')], carga: k === 1 ? 'saco' : null, tn }); } }
  // las matas de hierba alta de delante que se mecen, con flores de trébol y de diente de león
  for (let x = 3; x < 320; x += 7) { if (x > 40 && x < 170 && x % 2) continue; const y = 172 + (x * 7) % 8, w = Math.round(Math.sin(t * 2 + x * 0.13) * 1.6); R.linea(x, y + 6, x + w, y, tn(b_P.cespedS)); R.linea(x + 2, y + 6, x + 2 + w, y + 1, tn(b_P.cesped)); R.pset(x + w, y - 1, tn(b_P.cespedL)); if (x % 3 === 0) R.pset(x + w + 1, y - 1, tn(hex(x % 2 ? '#f0e8f0' : '#e8c840'))); }
  if (vacio) { // los cuervos que picotean entre las tiendas vacías (saltan y alzan el vuelo de vez en cuando)
    for (let k = 0; k < 4; k++) { const ciclo = (t * 0.25 + k * 0.31) % 1, x0 = [86, 166, 214, 300][k], y0 = [132, 140, 150, 124][k];
      if (ciclo < 0.78) { const pic = Math.sin(t * 6 + k * 2) > 0.3, x = x0 + Math.round(Math.sin(t * 0.8 + k) * 4); R.rect(x, y0 - 3, x + 3, y0 - 1, tn(hex('#1a1a22'))); R.pset(pic ? x + 4 : x + 4, pic ? y0 - 1 : y0 - 3, tn(hex('#1a1a22'))); R.pset(pic ? x + 5 : x + 5, pic ? y0 : y0 - 3, tn(hex('#5a5a5a'))); R.pset(x + 1, y0, tn(hex('#3a3a3a'))); R.pset(x + 2, y0, tn(hex('#3a3a3a'))); R.pset(x - 1, y0 - 2, tn(hex('#1a1a22'))); }
      else { const u = (ciclo - 0.78) / 0.22, x = x0 + Math.round(u * 50), y = y0 - 3 - Math.round(u * 60), al = Math.floor(t * 10 + k) % 2; R.pset(x, y, tn(hex('#1a1a22'))); R.pset(x + 1, y, tn(hex('#1a1a22'))); R.pset(x - 1, y - al, tn(hex('#1a1a22'))); R.pset(x + 2, y - al, tn(hex('#1a1a22'))); } } }
  return { suelo: 166, pies: [80, 200], hor: 67, rio: [67, 88], tienda: { x: [210, 262], base: 132, puerta: [230, 112, 242, 132] }, banderin: [237, 74], hogueras: [[110, 146], [182, 120], [60, 124]], olla: vacio ? [124, 162] : [110, 138], niebla: { y0: 54, y1: 150, col: alba ? hex('#d8ccd0') : hex('#d0d4da'), colL: alba ? hex('#f8ece4') : hex('#f0f2f4') } };
}
// una tienda de lona de dos aguas vista de frente un poco de lado: el frente triangular con la puerta abierta (el
// interior en sombra, con la manta y la mochila) o cerrada con sus lazos, el costado del tejado con sus costuras y la
// luz en la cumbrera, la sombra en el suelo, los vientos y las estacas (e: tamaño)
function b_tienda(R, x, base, e, P, k) {
  const { rect, pset, linea, poligono } = R, w = Math.round(12 * e), a = Math.round(16 * e), fondo = Math.round(10 * e);
  poligono([[x + 2 * w, base], [x + 2 * w + fondo + Math.round(4 * e), base], [x + 2 * w + fondo, base - Math.round(3 * e)]], b_mezcla(P.cesped, P.borde, 0.35));
  poligono([[x + w, base - a], [x + w + fondo, base - a - Math.round(3 * e)], [x + 2 * w + fondo, base - Math.round(3 * e)], [x + 2 * w, base]], P.lonaS);
  for (let i = 1; i < 4; i++) linea(x + w + Math.round(fondo * i / 4), base - a - Math.round(3 * e * i / 4), x + 2 * w + Math.round(fondo * i / 4), base - Math.round(3 * e * i / 4), P.lonaD);
  for (let j = 2; j < a; j += 2) pset(x + w + Math.round(fondo * 0.5) + Math.round(w * j / a), base - a + j - Math.round(1.5 * e), b_mezcla(P.lonaS, P.lonaD, 0.4));
  poligono([[x, base], [x + w, base - a], [x + 2 * w, base]], P.lona);
  for (let j = 1; j < a; j++) { const hw = Math.round(w * j / a); pset(x + w + hw - 1, base - a + j, b_mezcla(P.lona, P.lonaS, 0.5)); }
  linea(x, base, x + w, base - a, P.borde); linea(x + w, base - a, x + 2 * w, base, P.lonaD); linea(x + w, base - a, x + w + fondo, base - a - Math.round(3 * e), P.borde); linea(x + w + 1, base - a, x + w + fondo, base - a - Math.round(3 * e) + 1, P.lonaL);
  for (let j = 2; j < a; j += 3) { const hw = Math.round(w * j / a); pset(x + w - hw + 1, base - a + j, P.lonaL); }
  if (k % 3 !== 2) { poligono([[x + w - Math.round(4 * e), base], [x + w, base - Math.round(a * 0.6)], [x + w + Math.round(3 * e), base]], hex('#3a3428'));
    if (e > 0.45) { rect(x + w - 1, base - 2, x + w + 1, base - 1, hex('#6a5a8a')); pset(x + w - 2, base - 1, hex('#8a6a3a')); }
    linea(x + w - Math.round(4 * e), base, x + w - Math.round(1 * e), base - Math.round(a * 0.45), P.lonaD); }
  else { linea(x + w, base - a + 2, x + w, base, P.lonaD); for (let j = base - a + 4; j < base; j += 3) { pset(x + w - 1, j, P.borde); pset(x + w + 1, j, P.borde); } }
  rect(x + w, base - a - 2, x + w, base - a - 1, P.troncoS);
  linea(x - Math.round(4 * e), base, x + Math.round(3 * e), base - Math.round(a * 0.45), hex('#8a7a5a')); linea(x + 2 * w + Math.round(4 * e), base, x + 2 * w - Math.round(3 * e), base - Math.round(a * 0.45), hex('#8a7a5a'));
  rect(x - Math.round(4 * e), base - 1, x - Math.round(4 * e), base, P.troncoS); rect(x + 2 * w + Math.round(4 * e), base - 1, x + 2 * w + Math.round(4 * e), base, P.troncoS);
  rect(x - 1, base, x + 2 * w + fondo, base, b_mezcla(P.cesped, P.borde, 0.4));
}
// una tienda caída (el campamento vacío): la lona arrugada en el suelo con un palo torcido
function b_tiendaCaida(R, x, base, e, P) {
  const w = Math.round(24 * e); for (let i = 0; i < w; i++) { const a = Math.round(3 + Math.sin(i / 3) * 2); for (let j = 0; j < a; j++) R.pset(x + i, base - j, j === a - 1 ? P.lonaL : (i + j) % 5 === 0 ? P.lonaD : P.lona); }
  R.linea(x + 6, base - 3, x + 14, base - 10, P.troncoS);
}

// la tienda grande de Washington: el toldo a dos aguas con faldón festoneado de rojo, las paredes de lona con la
// entrada recogida, el interior con la mesa y la silla, y el mástil del banderín
function b_tiendaMayor(R, x, base, P) {
  const { rect, pset, linea, poligono } = R, w = 52;
  rect(x, base - 20, x + w, base, P.lona); for (let i = x + 4; i < x + w; i += 6) rect(i, base - 20, i, base, P.lonaS); rect(x + w - 3, base - 20, x + w, base, P.lonaS);
  rect(x + 18, base - 18, x + 34, base, hex('#4a3e2e')); rect(x + 20, base - 8, x + 30, base - 7, P.tronco); rect(x + 21, base - 6, x + 21, base, P.troncoS); rect(x + 29, base - 6, x + 29, base, P.troncoS); rect(x + 24, base - 9, x + 26, base - 9, hex('#f0e8d4'));
  linea(x + 18, base - 18, x + 14, base, P.lonaD); linea(x + 34, base - 18, x + 38, base, P.lonaD);
  poligono([[x - 4, base - 20], [x + w / 2, base - 38], [x + w + 4, base - 20]], P.lona); linea(x - 4, base - 20, x + w / 2, base - 38, P.borde); linea(x + w / 2, base - 38, x + w + 4, base - 20, P.lonaD);
  for (let j = 0; j < 16; j += 3) linea(x + w / 2 - j * 1.6, base - 38 + j, x + w / 2 + j * 1.6, base - 38 + j, P.lonaL);
  for (let i = x - 4; i <= x + w + 4; i++) { const f = (i - x + 40) % 6; rect(i, base - 20, i, base - 18 + (f < 3 ? 1 : 0), P.rojoC); }
  rect(x + w / 2, base - 58, x + w / 2 + 1, base - 38, P.troncoS); pset(x + w / 2, base - 59, hex('#e8b830'));
  linea(x - 4, base - 20, x - 12, base, hex('#8a7a5a')); linea(x + w + 4, base - 20, x + w + 12, base, hex('#8a7a5a'));
  rect(x - 2, base, x + w + 2, base, b_mezcla(P.cesped, P.borde, 0.4));
}

// un carro con toldo de lona (el carro de intendencia), con sus ruedas de radios
function b_carro(R, x, base, P) {
  const { rect, disco, linea, pset } = R;
  rect(x, base - 12, x + 40, base - 6, P.borde); rect(x + 1, base - 11, x + 39, base - 7, P.tronco); rect(x + 1, base - 11, x + 39, base - 11, P.troncoL);
  for (let i = 0; i <= 40; i++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - ((i - 20) / 21) ** 2)) * 14); for (let j = 0; j < a; j++) pset(x + i, base - 12 - j, j === a - 1 ? P.borde : i % 8 === 0 ? P.lonaD : j > a - 4 ? P.lonaL : P.lona); }
  for (const wx of [x + 8, x + 32]) { disco(wx, base - 4, 5, P.borde); disco(wx, base - 4, 4, P.tronco); disco(wx, base - 4, 3, P.borde); for (let a = 0; a < 6; a++) linea(wx, base - 4, wx + Math.round(Math.cos(a) * 3), base - 4 + Math.round(Math.sin(a) * 3), P.troncoL); }
  linea(x + 40, base - 8, x + 56, base - 2, P.troncoS);
}

// el fuego de una hoguera: llamas de tres tonos que bailan y chispas que suben
function b_fuego(R, x, y, t, tn = b_id) {
  const c = [hex('#c83a1a'), hex('#f08a2a'), hex('#ffe08a')].map(tn);
  for (let k = 0; k < 5; k++) { const fx = x - 3 + k * 1.5, a = 3 + Math.round((Math.sin(t * 9 + k * 2.1) + 1) * 2 + (k === 2 ? 2 : 0)); for (let j = 0; j < a; j++) { const w = j < a * 0.5 ? 1 : 0; R.rect(Math.round(fx) - w, y - j, Math.round(fx), y - j, j > a * 0.7 ? c[0] : j > a * 0.35 ? c[1] : c[2]); } }
  for (let k = 0; k < 3; k++) { const u = (t * 0.9 + k / 3) % 1; R.pset(Math.round(x + Math.sin(t * 3 + k * 2) * 3), Math.round(y - 6 - u * 14), u < 0.6 ? c[2] : c[1]); }
}

function b_rioEste(R, t, o) {
  const P = b_P, alba = (o.luz ?? 'noche') === 'alba', N = (n, a) => hex(alba ? a : n);
  const LUCES = b_RIO.ven.filter((v, k) => h(k, 9, 858) < 0.6);
  const lineaB = (x) => Math.round(160 - (x - 196) * 0.26 + Math.sin(x / 7) * 1.2);
  const cap = b_capa(R, 'g-rio|' + alba, (marca, delante) => {
    const { rect, pset, disco, linea, poligono } = R;
    b_degradado(R, 0, 81, alba ? b_CIELOS.alba : b_CIELOS.noche);
    if (!alba) { for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i, j); if (d > 8 && d < 16 && b_um(238 + i, 30 + j) < (1 - (d - 8) / 8) * 0.45) pset(238 + i, 30 + j, b_mezcla(R.pget(238 + i, 30 + j), hex('#5a6aa0'), 0.6)); }
      disco(238, 30, 7, hex('#e8e4d0')); disco(238, 30, 6, hex('#f8f4e4')); disco(236, 28, 1.5, hex('#d8d4c0')); disco(241, 32, 1, hex('#d8d4c0')); pset(240, 27, hex('#e0dcc8')); }
    marca();
    // la orilla de Manhattan: lomas con árboles detrás, la fila de casas (a dos aguas, de piñón escalonado y georgianas)
    // con chimeneas, la aguja de la Trinidad, el muelle de piedra con sus embarcaderos y los mástiles de los barcos
    // amarrados; la luz de la luna (o del alba) les da en el canto derecho
    const sil = N('#141a2c', '#4a4a66'), silL = N('#222a42', '#5e5c7a'), silD = N('#0c1020', '#3c3c56'), techo = N('#1a2034', '#56506c'), loma = N('#10162a', '#545474');
    for (let x = 0; x < 320; x++) { const y = 66 + Math.round(Math.sin(x / 41) * 3 + Math.sin(x / 13) * 1.2); for (let yy = y; yy < 80; yy++) pset(x, yy, yy === y ? N('#1c2440', '#62607e') : b_um(x, yy) < 0.2 ? N('#141c34', '#5a5876') : loma); }
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 859) * 320), y = 67 + Math.round(Math.sin(x / 41) * 3) + Math.round(h(k, 2, 859) * 4), r = 2 + h(k, 3, 859) * 2.5; disco(x, y, r, N('#0e1426', '#4c4c6a')); pset(Math.round(x + r * 0.5), Math.round(y - r * 0.6), N('#1e2844', '#666482')); }
    for (const [x0, w, alto, tipo] of b_RIO.casas) { const top = 79 - alto, x1 = x0 + w;
      for (let y = top; y < 81; y++) for (let x = x0; x <= x1; x++) pset(x, y, x === x1 ? silL : x === x0 ? silD : (y - top) % 4 === 0 && b_um(x, y) < 0.3 ? silD : sil);
      for (let f = 0; f < (alto > 9 ? 2 : 1); f++) for (let i = 2; i < w - 1; i += 3) pset(x0 + i, top + 3 + f * 4, silD);
      if (tipo === 0) { const a = Math.max(3, Math.round(w / 2.4)); for (let j = 1; j <= a; j++) { const e = Math.round(j * (w / 2) / a); rect(x0 + e, top - j, x1 - e, top - j, techo); pset(x1 - e, top - j, silL); } }
      else if (tipo === 1) { for (let s = 1; s <= 3; s++) { const e = s * Math.round(w / 7); rect(x0 + e, top - s * 2, x1 - e, top - s * 2 + 1, sil); pset(x1 - e, top - s * 2, silL); } }
      else { rect(x0, top - 1, x1, top - 1, silL); rect(x0 + 1, top - 2, x1 - 1, top - 2, techo); }
      if (w > 9 || tipo === 2) { const cx = x0 + 2 + Math.round(h(x0, 5, 859) * (w - 4)); rect(cx, top - 4, cx + 1, top - 1, silD); pset(cx + 1, top - 4, silL); } }
    // la aguja de la Trinidad, con su torre de campanario
    rect(129, 58, 137, 80, sil); rect(137, 58, 137, 80, silL); rect(130, 62, 131, 66, silD); rect(134, 62, 135, 66, silD); rect(128, 57, 138, 57, silL);
    for (let j = 0; j < 20; j++) { const w = Math.round(3 - j * 0.15); rect(133 - w, 56 - j, 133 + w, 56 - j, sil); pset(133 + w, 56 - j, silL); } rect(133, 30, 133, 36, silL); rect(132, 33, 134, 33, silL);
    // el muelle de piedra y los embarcaderos, con los mástiles de los barcos amarrados
    for (let x = 0; x < 320; x++) { pset(x, 81, N('#2a3450', '#706c88')); pset(x, 82, (x % 6) ? N('#1a2034', '#56526e') : silD); pset(x, 83, silD); }
    for (const px of [22, 70, 160, 214, 286]) { rect(px, 82, px + 14, 84, N('#1e2438', '#5a546e')); rect(px, 82, px + 14, 82, N('#323c58', '#7a7690')); for (let i = 0; i < 15; i += 4) rect(px + i, 85, px + i, 86, silD); }
    for (const [mx, ma, d] of [[28, 30, 1], [40, 26, -1], [76, 34, 1], [166, 28, -1], [220, 33, 1], [231, 26, 1], [292, 29, -1]]) { const yb = 82; rect(mx, yb - ma, mx, yb, silD); rect(mx - 5, yb - ma + 6, mx + 5, yb - ma + 6, silD); rect(mx - 4, yb - ma + 14, mx + 4, yb - ma + 14, silD); linea(mx, yb - ma, mx + d * 10, yb - 2, N('#1a2036', '#5a5872')); linea(mx, yb - ma, mx - d * 8, yb - 2, N('#1a2036', '#5a5872')); rect(mx - 6 - d, yb - 4, mx + 7, yb - 1, sil); pset(mx + 7, yb - 4, silL); }
    marca();
    // el agua con el reflejo de la orilla (oscuro y tramado, que se deshace hacia abajo)
    b_aguaFija(R, 84, 179, alba ? [[0, hex('#8a8aa6')], [0.3, hex('#6a6c8a')], [1, hex('#3e4260')]] : [[0, hex('#1e2a4a')], [0.25, hex('#16203c')], [0.6, hex('#111a32')], [1, hex('#0c1228')]], 13);
    for (let y = 85; y < 100; y++) { const a = 0.75 - (y - 85) * 0.05; for (let x = 0; x < 320; x++) { const ys = 84 - Math.round((y - 84) * 1.25); if (ys < 50) continue; const c = R.pget(x + Math.round(Math.sin(y * 1.7) * 1.5), ys); if (b_um(x, y) < a) pset(x, y, b_mezcla(R.pget(x, y), c, 0.55)); } }
    marca();
    delante();
    // la orilla de Brooklyn: el talud de tierra con su capa de hierba, vetas de barro paralelas a la cuesta, piedras
    // con el canto de luz, la franja mojada junto al agua; el árbol grande, la tienda, las barricas, los remos
    // apoyados y la barca varada boca abajo
    const os = N('#0e1220', '#3a3a50'), osL = N('#1c2232', '#5a5468'), osM = N('#141a2a', '#46445c'), hier = N('#121c1a', '#3e4a46'), hierL = N('#1e2c26', '#56645a'), luz = N('#2c3448', '#7a748c');
    for (let x = 192; x < 320; x++) { const y = lineaB(x); for (let yy = y; yy < 180; yy++) { const d = yy - y; let c;
        if (d < 1) c = luz; else if (d < 5) c = h(x, yy, 851) < 0.3 ? hierL : hier;
        else { c = h(x >> 1, yy >> 1, 851) < 0.3 ? osM : os; if ((d + Math.round(h(x >> 3, 0, 860) * 3)) % 7 === 0) c = osL; if (h(x, yy, 861) < 0.03) c = luz; }
        if (x < 200 + (yy - 150) * 0.2 && x - 192 < 10) c = b_mezcla(c, N('#2a3a5a', '#7a7c98'), 0.35);
        pset(x, yy, c); } }
    for (let k = 0; k < 18; k++) { const x = 200 + Math.round(h(k, 1, 862) * 116), y = lineaB(x) + 8 + Math.round(h(k, 2, 862) * 20), r = 1.5 + h(k, 3, 862) * 1.8; if (x > 204 && x < 264 && y < 158) continue; disco(x, y, r, osM); pset(Math.round(x + r * 0.4), Math.round(y - r * 0.6), luz); pset(Math.round(x - r), y + 1, os); }
    // la barca varada boca abajo, con la quilla al cielo
    { const bx = 270, by = 166; for (let i = -16; i <= 16; i++) { const a = Math.round(Math.sqrt(1 - (i / 17) ** 2) * 6); for (let j = 0; j <= a; j++) pset(bx + i, by - j, j === a ? luz : (j + 1) % 3 === 0 ? N('#2a2018', '#5a4a40') : N('#3a2a1c', '#6a5444')); } rect(bx - 17, by + 1, bx + 17, by + 1, os); rect(bx - 15, by - 7, bx + 15, by - 7, luz); }
    // los remos apoyados y las barricas
    for (let k = 0; k < 4; k++) { const x = 300 + k * 3; linea(x, 152, x + 6, 132, N('#3a3024', '#7a6a58')); rect(x + 5, 132, x + 7, 135, N('#4a3c2c', '#8a7a64')); }
    for (const [bx, by] of [[284, 152], [292, 154]]) { rect(bx - 3, by - 7, bx + 3, by, N('#2a1e16', '#5a4a3e')); rect(bx - 3, by - 5, bx + 3, by - 5, N('#1a1a22', '#4a4a56')); rect(bx - 3, by - 2, bx + 3, by - 2, N('#1a1a22', '#4a4a56')); rect(bx + 2, by - 7, bx + 3, by, N('#36281c', '#6a5a4c')); }
    // el embarcadero de tablas sobre pilotes, con sus juntas y la luz en el canto
    for (const px of [208, 224, 240, 258]) { rect(px, 150, px + 1, 172, N('#1a1612', '#5a4a3a')); rect(px + 1, 150, px + 1, 172, N('#2a2218', '#6a5a4a')); }
    for (let y = 150; y < 156; y++) for (let x = 204; x <= 264; x++) pset(x, y, y === 150 ? N('#4a4030', '#9a8a74') : (x - 204) % 9 === 0 ? N('#120e0c', '#4a3e34') : y === 155 ? N('#1a1410', '#544638') : h(x, y, 863) < 0.2 ? N('#2e2620', '#7a6a58') : N('#241e1a', '#6a5a4a'));
    linea(206, 156, 224, 162, N('#1a1612', '#5a4a3a')); linea(242, 156, 258, 162, N('#1a1612', '#5a4a3a'));
    // el árbol grande de la orilla (silueta con el canto de luna) y la tienda de los que esperan
    rect(311, 98, 315, 132, silD); rect(315, 100, 315, 130, N('#1a2230', '#4a5462')); linea(312, 110, 300, 100, silD); linea(313, 106, 319, 96, silD);
    const copa = [[306, 92, 11], [295, 102, 8], [316, 84, 11], [302, 80, 8], [314, 100, 9], [289, 108, 5]];
    for (const [cx, cy, r] of copa) disco(cx, cy, r, N('#0a1018', '#36404a'));
    for (const [cx, cy, r] of copa) for (let k = 0; k < 40; k++) { const a = h(cx, k, 864) * Math.PI * 2, rr = r * Math.sqrt(h(cy, k, 865)), px = Math.round(cx + Math.cos(a) * rr), py = Math.round(cy + Math.sin(a) * rr); pset(px, py, py < cy - r * 0.3 && px > cx - 2 ? N('#22303a', '#56626c') : N('#121c26', '#424c56')); }
    poligono([[282, 136], [292, 122], [302, 134]], N('#2a2c34', '#7a7684')); linea(292, 122, 302, 134, N('#3a3c46', '#9a96a2')); poligono([[289, 136], [292, 128], [295, 136]], os);
  });
  R.copiar(cap.b);
  const m = cap.m, B = R.buf;
  b_cieloVivo(R, t, m, 66, alba ? 'alba' : 'noche', 0.2);
  // el reflejo de la luna que tiembla y los rizos del agua
  if (!alba) for (let y = 86; y < 180; y += 2) { const u = (y - 86) / 94, w = 3 + Math.round(u * 14), n = 2 + Math.round(u * 3); for (let k = 0; k < n; k++) { const x0 = Math.round(238 + (h(k, y, 853) - 0.5) * w * 2 + Math.sin(t * 2 + y * 0.4 + k) * 2), L = 1 + Math.round(u * 5 * h(k, y, 854)); if (Math.sin(t * 3 + k * 2 + y) > -0.2) for (let i = 0; i < L; i++) b_psM(B, m, 3, x0 + i, y, i === 0 || i === L - 1 ? hex('#8a90b0') : hex('#e8e4d0')); } }
  b_aguaViva(R, t, m, 3, 86, 179, alba ? [hex('#a8aac0'), hex('#3a3e5c'), hex('#d8d8e8')] : [hex('#2e3e66'), hex('#080c1e'), hex('#5a6a9a')], 0.7, 0.4);
  // las ventanas de Manhattan que se encienden y se apagan, y su reflejo largo en el agua; al alba se apagan
  if (!alba) LUCES.forEach(([x, y], k) => { const on = Math.sin(t * (0.25 + h(k, 6, 850) * 0.5) + k * 3) > -0.5, fl = Math.sin(t * 7 + k) > 0.85; if (!on) return; R.pset(x, y, fl ? hex('#ffe8a0') : hex('#f0b050'));
    for (let j = 0; j < 16; j += 2) { const yy = 86 + j + (k % 3), xx = x + Math.round(Math.sin(t * 2.5 + j + k) * 1); if (h(k, j, 855) < 0.7) b_psM(B, m, 3, xx, yy, j < 6 ? hex('#a87a3a') : hex('#5a4a3a')); } });
  else LUCES.forEach(([x, y], k) => { if (k % 9 === 0 && Math.sin(t * 2 + k) > 0) R.pset(x, y, hex('#c8a070')); });
  // los faroles de los barcos amarrados al otro lado, que se mecen
  if (!alba) for (const [mx, k] of [[28, 0], [76, 1], [166, 2], [220, 3], [292, 4]]) { const y = 72 + Math.round(Math.sin(t * 1.3 + k) * 0.6); R.pset(mx + 6, y, Math.sin(t * 4 + k * 2) > -0.3 ? hex('#f8c860') : hex('#a87030')); }
  // los pilotes del embarcadero con el agua que rompe alrededor
  for (const px of [208, 224]) { const f = Math.floor(t * 3 + px) % 3; R.pset(px - 1 - f % 2, 160 + f, alba ? hex('#c8c8d8') : hex('#5a6a9a')); R.pset(px + 2 + f % 2, 161, alba ? hex('#c8c8d8') : hex('#5a6a9a')); }
  // los faroles tapados del embarcadero (una rendija de luz), los rescoldos y los soldados que esperan en silueta
  for (const [lx, ly] of [[226, 146], [252, 146]]) { R.rect(lx - 1, ly - 3, lx + 1, ly, alba ? hex('#3a3a3a') : hex('#1a1a1a')); R.pset(lx, ly - 4, alba ? hex('#2a2a2a') : hex('#121212')); if (!alba || Math.sin(t) > 0) R.pset(lx, ly - 1, Math.sin(t * 5 + lx) > 0 ? hex('#f0b050') : hex('#a87030')); }
  if (!alba) for (let k = 0; k < 2; k++) { const x = 282 + k * 18, y = 150 - k * 5; R.pset(x, y, Math.sin(t * 4 + k) > 0 ? hex('#e86a2a') : hex('#a83a1a')); R.pset(x + 1, y, hex('#a83a1a')); R.pset(x - 1, y + 1, hex('#5a2010')); b_humo(R, x, y - 2, t, k, { alto: 16, r: 1.6, viento: 0.3, vel: 0.25, cols: [hex('#2a2e40'), hex('#3a3e52'), hex('#4a4e62')] }); }
  else for (let k = 0; k < 2; k++) b_humo(R, 282 + k * 18, 148 - k * 5, t, k, { alto: 18, r: 1.8, viento: 0.3, vel: 0.2, cols: [hex('#6a6a80'), hex('#8a8aa0'), hex('#aaaabc')] });
  const sombra = alba ? [hex('#2a2a3c'), hex('#3a3a50')] : [hex('#06080e'), hex('#10141e')];
  for (let k = 0; k < 6; k++) { const x = 270 + k * 8 - (k > 2 ? 30 : 0), y = lineaB(x) - (k % 2); b_figurita(R, x, y, t + k, k, { quieto: true, ropa: sombra, dir: -1, tn: (c) => (c === hex('#e8e0cc') ? sombra[1] : b_mezcla(c, sombra[0], 0.85)) }); }
  // los juncos de la orilla que se mecen y, de noche, las luciérnagas de agosto
  for (let k = 0; k < 16; k++) { const x = 198 + Math.round(h(k, 1, 852) * 118); if (x > 204 && x < 266) continue; const y = lineaB(x) + 1, sw = Math.sin(t * 1.8 + k) * 1.2; for (let j = 0; j < 5 + (k % 4); j++) R.pset(Math.round(x + sw * j / 6), y - j, alba ? hex('#4a5a4a') : hex('#18241e')); R.pset(Math.round(x + sw), y - 5 - (k % 4), alba ? hex('#6a6a4a') : hex('#2a3226')); }
  if (!alba) for (let k = 0; k < 7; k++) { const x = Math.round(270 + Math.sin(t * 0.4 + k * 2.3) * 40 + h(k, 1, 866) * 10), y = Math.round(118 + Math.sin(t * 0.7 + k) * 10 + k * 3); if (Math.sin(t * 2.2 + k * 1.7) > 0.5 && y < lineaB(x) - 2) R.pset(x, y, hex('#d8f080')); }
  return { suelo: 150, pies: [206, 262], hor: 84, rio: [84, 179], carril: [118, 162], embarcadero: [206, 150, 262, 156], luna: alba ? null : [238, 30], orillaBrooklyn: 'de (196, 160) a (319, 128)', niebla: { y0: 58, y1: 168, col: alba ? hex('#a8a8bc') : hex('#3a4460'), colL: alba ? hex('#d8d6e2') : hex('#6a7494') } };
}
// los altos de Harlem en otoño (o.encuadre 'altos')
function b_altos(R, t, o) {
  const P = b_P, OTO = ['#c83a1a', '#e8782a', '#e8b830', '#a8502a', '#d86a2a'].map(hex);
  const cap = b_capa(R, 'g-altos', (marca, delante) => {
    const { rect, pset, disco, linea } = R;
    b_degradado(R, 0, 60, b_CIELOS.otono); b_sol(R, 196, 26, 7); marca();
    // las Palisades: el acantilado de columnas de basalto (cada columna con su canto de luz, su cara y su sombra, las
    // juntas, los líquenes y algún arbusto en las repisas), el canchal de piedras con árboles al pie, la orilla y,
    // encima, el bosque de otoño en tres tonos; todo velado por la distancia
    const vel = (c) => b_mezcla(c, hex('#b8c8d8'), 0.28);
    const colX = []; { let x = 0, k = 0; while (x < 330) { const w = 4 + Math.round(h(k, 1, 874) * 4); colX.push([x, w, k]); x += w; k++; } }
    for (const [x0, w, k] of colX) for (let x = x0; x < x0 + w && x < 320; x++) {
      const top = 48 + Math.round(Math.sin(x / 31) * 2.5 + Math.sin(x / 9) * 0.8 + (h(k, 2, 874) < 0.2 ? 2 : 0)), pie = 68 + Math.round(Math.sin(x / 17 + 2) * 2 + h(k, 3, 874) * 2), i = x - x0;
      for (let y = top; y < 82; y++) { let c;
        if (y < top + 5) c = h(x >> 1, y >> 1, 860) < 0.35 ? hex('#a8502a') : h(x, y, 868) < 0.3 ? hex('#e8a040') : hex('#c8783a');
        else if (y < pie) { c = i === 0 ? hex('#c0b2b0') : i === w - 1 ? hex('#4e4654') : i < w / 2 ? hex('#9a8c90') : hex('#7a6e76');
          if ((y + Math.round(h(k, 4, 874) * 9)) % (9 + (k % 4)) === 0) c = i === 0 ? hex('#8a7c80') : hex('#4e4654');
          if (h(k, y >> 2, 861) < 0.08 && i > 0 && i < w - 1) c = (x + y) % 2 ? hex('#7a8a5a') : hex('#94a46a');
          if (h(k, y >> 1, 875) < 0.025) { c = hex('#c8603a'); } }
        else if (y < 80) { const r = h(x >> 1, y >> 1, 869); c = r < 0.3 ? hex('#6a6070') : r < 0.55 ? hex('#8a7e84') : r < 0.62 ? hex('#a8a0a4') : (x + y) % 5 === 0 ? hex('#c86a2a') : hex('#7a6e5a'); }
        else c = y === 80 ? hex('#a89a80') : hex('#5a6a4a');
        pset(x, y, vel(c)); } }
    for (let k = 0; k < 120; k++) { const x = Math.round(h(k, 1, 870) * 320), y = 47 + Math.round(Math.sin(x / 31) * 2.5) + Math.round(h(k, 2, 870) * 3), r = 1.5 + h(k, 3, 870) * 2.2; disco(x, y + 1, r, vel(hex('#6a2a1a'))); disco(x, y, r * 0.85, vel(OTO[k % 5])); pset(Math.round(x - r * 0.4), Math.round(y - r * 0.5), vel(hex('#f8d070'))); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 4, 870) * 320), y = 71 + Math.round(h(k, 5, 870) * 7), r = 1.2 + h(k, 6, 870) * 1.6; disco(x, y, r, vel(OTO[(k + 2) % 5])); pset(x, Math.round(y + r), vel(hex('#4a3a2a'))); }
    marca();
    b_aguaFija(R, 82, 108, [[0, hex('#9ac0d8')], [0.5, hex('#7aa8c8')], [1, hex('#6a98b8')]], 15); marca();
    delante();
    // la loma: roca de esquisto gris con líquenes, hierba seca, el campo de alforfón, la cerca y los árboles de otoño
    const loma = (x) => 104 + Math.round(Math.sin(x / 40) * 5 + Math.sin(x / 13) * 1.5 + (x < 80 ? (80 - x) * -0.2 : 0));
    for (let x = 0; x < 320; x++) { const y0 = loma(x); for (let y = y0; y < 180; y++) { let c = h(x >> 1, y >> 1, 862) < 0.3 ? hex('#a89a4a') : h(x, y, 863) < 0.1 ? hex('#c8ba6a') : hex('#b8a85a'); if (y === y0) c = hex('#d8c87a'); if (x > 170 && x < 300 && y > 124 && y < 148) c = (x + y * 3) % 4 === 0 ? hex('#f0d8e0') : (x * 7 + y) % 5 === 0 ? hex('#e8b8c8') : hex('#8a7a4a'); pset(x, y, c); } }
    // los surcos del rastrojo que siguen la loma y las gavillas de maíz atadas en tienda, con su sombra
    for (let x = 0; x < 170; x++) { const y0 = loma(x); for (let y = y0 + 6; y < 150; y++) { const f = (y - y0 + Math.round(x * 0.12)) % 6; if (f === 0 && h(x, y, 876) < 0.85) pset(x, y, (x & 1) ? hex('#8a7a34') : hex('#9a8a3e')); else if (f === 1 && (x & 1) && h(x, y, 877) < 0.6) pset(x, y, hex('#d8c87a')); } }
    for (const [gx, gy, e] of [[60, 125, 1.4], [86, 118, 1.15], [202, 114, 1.05], [40, 119, 1.1]]) { const a = Math.round(16 * e), w = Math.round(6 * e);
      R.poligono([[gx + 2, gy], [gx + w + 8, gy + 2], [gx + w + 2, gy - 1]], hex('#8a7a3a'));
      for (let j = 0; j < a; j++) { const hw = Math.round(w * (j / a) ** 0.8); for (let i = -hw; i <= hw; i++) pset(gx + i, gy - a + j, i === -hw || i === hw ? hex('#7a6428') : (i + j) % 3 === 0 ? hex('#a8883a') : i < 0 ? hex('#e8cc78') : hex('#c8a850')); }
      rect(gx - Math.round(3 * e), gy - Math.round(a * 0.55), gx + Math.round(3 * e), gy - Math.round(a * 0.55), hex('#6a4a22'));
      for (let k = 0; k < 3; k++) { const dx = (k - 1) * 2; linea(gx + dx, gy - a, gx + dx * 2, gy - a - 3, hex('#d8b858')); } }
    for (const [rx, ry, rw, ra] of [[30, 150, 40, 18], [252, 168, 54, 16], [120, 128, 26, 9], [300, 132, 22, 10]]) { for (let j = 0; j < ra; j++) { const w = Math.round(rw / 2 * Math.sqrt(1 - (j / ra) ** 2)); for (let i = -w; i <= w; i++) { let c = (i + j * 2) % 7 === 0 ? hex('#5a5a66') : i < -w * 0.3 ? hex('#a8a8b4') : hex('#8a8a96'); if (j === ra - 1 || Math.abs(i) === w) c = hex('#3a3a46'); if (h(rx + i, j, 864) < 0.08) c = hex('#b8c86a'); pset(rx + i, ry - j, c); } } }
    for (let x = 160; x < 316; x += 22) { const y = loma(x) + 22; rect(x, y - 11, x + 1, y, P.troncoS); } for (let x = 160; x < 300; x += 22) { linea(x + 1, loma(x) + 13, x + 22, loma(x + 22) + 13, P.tronco); linea(x + 1, loma(x) + 17, x + 22, loma(x + 22) + 17, P.troncoS); }
    for (const [tx, ty, r] of [[14, 120, 20], [92, 110, 13], [300, 116, 17], [286, 178, 24]]) { rect(tx - 2, ty - r, tx + 2, ty + 8, P.borde); rect(tx - 1, ty - r, tx + 1, ty + 8, P.troncoS); linea(tx, ty - r * 0.6, tx - r * 0.7, ty - r * 1.3, P.troncoS); linea(tx, ty - r * 0.7, tx + r * 0.7, ty - r * 1.4, P.troncoS); }
    for (let k = 0; k < 140; k++) { const x = Math.round(h(k, 1, 865) * 319), y = loma(x) + 2 + Math.round(h(k, 2, 865) * 70); pset(x, y, OTO[k % 5]); }
    // matas de hierba seca, el sendero, los zumaques rojos y las piedras sueltas
    for (let k = 0; k < 160; k++) { const x = Math.round(h(k, 4, 871) * 319), y = loma(x) + 6 + Math.round(h(k, 5, 871) * 70); if (x > 170 && x < 300 && y > 122 && y < 150) continue; for (let i = -2; i <= 2; i++) linea(x + i, y, x + i * 2, y - 3 - (i & 1), i & 1 ? hex('#8a7a3a') : hex('#d8c87a')); }
    for (let y = 112; y < 180; y++) { const x = Math.round(150 + Math.sin(y / 13) * 10 - (y - 112) * 0.5); for (let i = -2 - ((y - 112) >> 4); i <= 2 + ((y - 112) >> 4); i++) pset(x + i, y, h(x + i, y, 872) < 0.25 ? hex('#8a6a44') : hex('#a8885a')); }
    for (const [bx, by] of [[62, 128], [206, 118], [236, 160]]) { for (let k = 0; k < 6; k++) disco(bx + (k - 3) * 3, by - (k % 2) * 2, 3, hex('#8a2a1a')); for (let k = 0; k < 6; k++) disco(bx + (k - 3) * 3 - 1, by - (k % 2) * 2 - 1, 1.8, hex('#d8402a')); }
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 6, 873) * 319), y = loma(x) + 10 + Math.round(h(k, 7, 873) * 66); rect(x, y, x + 2, y + 1, hex('#6a6a76')); rect(x, y, x + 1, y, hex('#a8a8b4')); }
    for (let y = 126; y < 148; y += 3) for (let x = 172; x < 298; x++) if (R.pget(x, y) !== hex('#3a3a46')) pset(x, y, (x & 1) ? hex('#6a7a3a') : hex('#5a6a32'));
  });
  R.copiar(cap.b);
  const m = cap.m;
  b_cieloVivo(R, t, m, 60, 'otono', 0.4); b_gaviotas(R, t, 3, 20, 46, hex('#3a3a3a'), hex('#2a2a2a'));
  b_aguaViva(R, t, m, 3, 83, 107, [hex('#c8e0ec'), hex('#4a7a9a'), hex('#ffffff')], 0.8, 0.5);
  for (let k = 0; k < 4; k++) { const x = ((t * 1.6 + k * 90) % 400) - 40; b_barco(R, x, 92 + k * 4, t, { s: 0.3 + k * 0.03, tipo: 'britanico', velas: 1, bandera: 'britanica', reflejo: hex('#5a88a8') }); }
  b_delante(R, cap);
  // las copas de otoño que se mecen y las hojas que caen
  for (const [tx, ty, r, k] of [[14, 120, 20, 0], [92, 110, 13, 1], [300, 116, 17, 2], [286, 178, 24, 3]]) { const sw = Math.round(Math.sin(t * 1.2 + k) * 1.5), B0 = [[0, -r * 1.3, r * 0.8], [-r * 0.7, -r, r * 0.6], [r * 0.7, -r * 1.05, r * 0.6], [-r * 0.2, -r * 1.85, r * 0.55], [r * 0.4, -r * 1.7, r * 0.5]];
    for (const [dx, dy, rr] of B0) R.disco(tx + dx + sw, ty + dy + 1, rr, hex('#7a2a1a')); for (const [dx, dy, rr] of B0) R.disco(tx + dx + sw - 0.5, ty + dy, rr * 0.86, OTO[(k * 2) % 5]); for (const [dx, dy, rr] of B0) R.disco(tx + dx + sw - 1.5, ty + dy - 1.5, rr * 0.48, OTO[(k * 2 + 2) % 5]);
    for (let i = 0; i < 9; i++) if (Math.sin(t * 3 + i * 2.1 + k) > 0.3) R.pset(Math.round(tx + sw + (h(i, k, 866) - 0.5) * r * 1.8), Math.round(ty - r * 1.3 + (h(i, k, 867) - 0.5) * r * 1.4), OTO[(i + k) % 5]); }
  for (let k = 0; k < 22; k++) { const v = 10 + (k % 4) * 3, y = Math.round(40 + ((k * 41 + t * v) % 140)), x = Math.round(((k * 67 + t * 7) % 340) - 10 + Math.sin(t * 2 + k) * 5); if (x > 272 && y < 48) continue; R.pset(x, y, OTO[k % 5]); R.pset(x + (Math.floor(t * 4 + k) % 2 ? 1 : -1), y, OTO[(k + 1) % 5]); }
  return { suelo: 158, pies: [60, 240], hor: 82, rio: [82, 108], alforfon: [170, 124, 300, 148], rocas: [[30, 150], [252, 168], [120, 128], [300, 132]], niebla: { y0: 60, y1: 130 } };
}
// Lo que va por delante de los personajes en cada encuadre de colonial (se llama después de pintar a los que quedan
// detrás, con las mismas opciones): en 'wallStreet', la barandilla de hierro del balcón (tapa las piernas de quien está
// en él); en 'taberna', la mesa de los naipes con su tablero y sus patas (los naipes se ponen encima, y = 139); en
// 'salon', la mesa del pergamino ('congreso'), el estrado de los jueces ('tribunal') o la mesa de la cena con las velas
// ('cena'). En 'bateria' no hay nada delante.
export function colonialDelante(R, t, o = {}) {
  const enc = o.encuadre || 'wallStreet';
  if (enc === 'wallStreet') c_balconDelante(R, t, (o.anyo ?? 1765) >= 1789);
  else if (enc === 'taberna') c_mesaNaipes(R, t);
  else if (enc === 'salon') c_salonDelante(R, t, o.sala || 'congreso');
}

// la paleta propia del decorado colonial
const c_K = pal({
  mortero: '#c4ab98', morteroS: '#9a8070', ladrilloM: '#963e2e', pizarra: '#5c6272', pizarraS: '#40444f', pizarraL: '#7c8494',
  vidrio: '#28324a', vidrioL: '#56709a', vidrioR: '#a4c0d8', marco: '#f2eee2', marcoS: '#bab6aa', postigo: '#2e5a46', postigoS: '#1c3a2c', postigoL: '#46785e',
  puerta: '#2a3a5a', puertaS: '#1a263e', puertaL: '#3e5276', hierro: '#24202a', hierroL: '#5a5664', sombra: '#1c1424',
  adoquin: '#8a8274', adoquinS: '#5e5850', adoquinL: '#aca492', junta: '#443e38', losa: '#a69e8e', losaS: '#7e7668', losaL: '#c2baa8',
  piel: '#f0c8a0', pielS: '#c89870', pielM: '#a8724a', cortina: '#b42a32', cortinaS: '#781a22', cortinaL: '#dc4c4a',
  torre: '#8e6e5c', torreS: '#6a4e44', torreL: '#ac8a72', lejos: '#a2b4c6', lejosS: '#8a9cb2', lejosL: '#bccad8',
  yeso: '#e6dac0', yesoS: '#c8b898', yesoL: '#f4ecd8', viga: '#4a3020', vigaS: '#2c1a10', vigaL: '#6e4a30',
  tabla: '#8a5a34', tablaS: '#643e22', tablaL: '#ac784c', tablaD: '#4a2c16', peltre: '#a6aab2', peltreS: '#6a6e7a', peltreL: '#e2e6ec',
  fuego: '#ffb040', fuegoL: '#fff0a0', brasa: '#e0501a', hollin: '#2a2224', piedraG: '#8c8880', piedraGS: '#625e5a', piedraGL: '#b0aca2',
  hierba: '#8e8c4a', hierbaS: '#686a36', hierbaL: '#b0aa62', hoja: '#d0782a', hojaL: '#e8a040', tierraE: '#9a8466', tierraES: '#7a664c',
  agua: '#3c6c8c', aguaS: '#2a5272', aguaL: '#78a8c4', aguaB: '#c8e0ec', vela: '#ece4cc', velaS: '#c2b696', casco: '#4a3426', cascoS: '#2c1e16',
  pared: '#d8dcd2', paredS: '#b0b6ac', paredL: '#eef0e8', pano: '#2e6a4a', panoS: '#1e4a34', panoL: '#448a62',
  perg: '#eedcae', pergS: '#c8ae7e', mantel: '#f2eee4', mantelS: '#c8c2b4', alfombra: '#7a2a2e', alfombraS: '#5a1c22', alfombraL: '#a8a050',
  gato: '#d08a3a', gatoS: '#9a5e24', paloma: '#8a8c9c', palomaS: '#5e6070', caballo: '#7a4a2a', caballoS: '#4e2e18',
});

const c_VACIO = 0x01020304;

const c_CAPAS = new WeakMap();

// la capa fija de un encuadre: se pinta una sola vez en un búfer de R.nuevo() (lo que queda vacío se marca) y se guarda
// por clave; devuelve el búfer
function c_capa(R, clave, dibuja) {
  let m = c_CAPAS.get(R); if (!m) c_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); b.fill(c_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega una capa sobre lo que ya hay, saltándose lo vacío (un recorrido de la pantalla)
function c_pegar(R, b) { const B = R.buf; for (let i = 0; i < b.length; i++) { const c = b[i]; if (c !== c_VACIO) B[i] = c; } }

// mezcla dos colores: a = 0 deja c, a = 1 da d
function c_mezcla(c, d, a) { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; }

// oscurece (o tiñe) un rectángulo de lo ya pintado
function c_tinte(R, x0, y0, x1, y1, a, col = c_K.sombra) {
  const B = R.buf;
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, Math.round(y1)); y++) for (let x = Math.max(0, Math.round(x0)); x <= Math.min(319, Math.round(x1)); x++) { const c = B[y * 320 + x]; if (c !== c_VACIO) B[y * 320 + x] = c_mezcla(c, col, a); }
}

// la trama ordenada de 4×4 para los degradados
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_um = (x, y) => (c_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// un rectángulo que respeta R.recorte (R.rect no lo respeta)
function c_rr(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(x0, y, x1, y, c); }

const c_lim = (u) => Math.max(0, Math.min(1, u));

// los cielos: cuatro tonos tramados de arriba abajo, las nubes (sombra, cuerpo, luz) y el astro
const c_CIELOS = {
  dia: { tonos: pal({ a: '#5e9cd8', b: '#7cb4e6', c: '#a0ccee', d: '#cce4f2' }), nube: pal({ s: '#b4c8de', c: '#e2edf6', l: '#ffffff' }), ave: hex('#3a3a4a') },
  tarde: { tonos: pal({ a: '#4c4c8c', b: '#985a8a', c: '#de8a6c', d: '#f4c27c' }), nube: pal({ s: '#946686', c: '#e6a08a', l: '#fad2a4' }), ave: hex('#3a2a3a') },
  noche: { tonos: pal({ a: '#0c1230', b: '#141e46', c: '#1e2c5a', d: '#2c3c6a' }), nube: pal({ s: '#222c50', c: '#34426a', l: '#4e5c86' }), ave: hex('#0a0c1a') },
};
for (const k in c_CIELOS) c_CIELOS[k].tonos = Object.values(c_CIELOS[k].tonos), c_CIELOS[k].nube = Object.values(c_CIELOS[k].nube);

// el cielo de las filas 0..y1: degradado tramado con vetas, estrellas de noche, el sol o la luna, nubes de tres tonos en
// tres capas a tres velocidades y pájaros que cruzan aleteando (fuera de la zona de Atom)
function c_cielo(R, t, y1, o = {}) {
  const luz = o.luz || 'dia', P = c_CIELOS[luz], B = R.buf, T = P.tonos, n = T.length;
  for (let y = 0; y < y1; y++) for (let x = 0; x < 320; x++) {
    const v = (y / y1) * (n - 1) + (h(x >> 4, y >> 1, 9) - 0.5) * 0.3, i = Math.max(0, Math.min(n - 2, Math.floor(v)));
    B[y * 320 + x] = v - i > c_um(x, y) ? T[i + 1] : T[i];
  }
  if (luz === 'noche') for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 31) * 320), y = Math.floor(h(k, 2, 31) * y1 * 0.8); if (x > 270 && y < 48) continue; if (Math.sin(t * (1 + h(k, 3, 31) * 2) + k) > -0.6) R.pset(x, y, k % 5 ? hex('#c8d0f0') : C.blanco); }
  const sol = o.sol;
  if (sol) { const [sx, sy, sr] = sol, c0 = luz === 'noche' ? hex('#f4f0dc') : luz === 'tarde' ? hex('#ffe08a') : hex('#fff6d0');
    for (let j = -sr - 6; j <= sr + 6; j++) for (let i = -sr - 6; i <= sr + 6; i++) { const d = Math.hypot(i, j); if (d > sr && d < sr + 6 && (d - sr) / 6 < c_um(sx + i, sy + j) * 0.9) R.pset(sx + i, sy + j, c_mezcla(T[Math.min(n - 1, Math.floor(sy / y1 * n))], c0, 0.45)); }
    R.disco(sx, sy, sr, c0); if (luz === 'noche') { R.disco(sx + 2, sy - 1, sr - 1, c_mezcla(T[0], T[1], 0.5)); } else R.disco(sx - 1, sy - 1, sr - 2, C.blanco); }
  const nubes = o.nubes ?? 1, N = P.nube;
  for (const [capa, cuantas, ya, yb, wa, wb, v] of [[0, 4, 0.18, 0.42, 9, 14, 1.6], [1, 3, 0.3, 0.6, 14, 22, 3.2], [2, 2, 0.42, 0.72, 20, 30, 5.4]]) {
    for (let k = 0; k < Math.round(cuantas * nubes); k++) {
      const w = wa + h(k, capa, 41) * (wb - wa), L = 320 + w * 2 + 40, x = ((h(k, capa, 42) * L + t * v) % L + L) % L - w - 20, y = y1 * (ya + h(k, capa, 43) * (yb - ya));
      const T3 = capa === 0 ? [c_mezcla(N[0], T[1], 0.4), c_mezcla(N[1], T[1], 0.35), c_mezcla(N[2], T[1], 0.3)] : N;
      c_nube(R, x, y, w, T3);
    }
  }
  if (o.aves !== false) c_aves(R, t, o.nAves ?? 4, Math.max(18, y1 * 0.25), y1 * 0.7, P.ave, 7);
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba a la izquierda) con la base plana
function c_nube(R, cx, cy, w, T) {
  const P = [[0, 0, 0.3], [-0.32, 0.08, 0.2], [0.32, 0.07, 0.22], [-0.1, -0.14, 0.24], [0.16, -0.09, 0.2], [0.46, 0.12, 0.13]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of P) R.disco(cx + dx * w, cy + dy * w + 1.5, r(f), T[0]);
  for (const [dx, dy, f] of P) R.disco(cx + dx * w, cy + dy * w, r(f), T[1]);
  for (const [dx, dy, f] of P) R.disco(cx + dx * w - 1, cy + dy * w - 1.5, r(f * 0.62), T[2]);
  R.linea(cx - w * 0.5, cy + w * 0.27 + 1, cx + w * 0.58, cy + w * 0.27 + 1, T[0]);
}

// pájaros (gaviotas) que cruzan aleteando entre y0 e y1; no entran en la zona de Atom ni en la barra del año
function c_aves(R, t, n, y0, y1, col, k = 0) {
  for (let i = 0; i < n; i++) {
    const v = 9 + h(i, k, 51) * 9, L = 420, x = Math.round(((h(i, k, 52) * L + t * v * (i % 2 ? 1 : -1)) % L + L) % L - 50), y = Math.round(y0 + h(i, k, 53) * (y1 - y0) + Math.sin(t * 0.8 + i) * 3);
    if ((x > 270 && y < 50) || (x < 176 && y < 18)) continue;
    const a = Math.sin(t * 7 + i * 2.1) > 0, d = i % 2 ? 1 : -1;
    R.pset(x, y, col); R.pset(x + d, y, col);
    if (a) { R.pset(x - 1, y - 1, col); R.pset(x - 2, y - 2, col); R.pset(x + 2, y - 1, col); R.pset(x + 3, y - 2, col); }
    else { R.pset(x - 1, y, col); R.pset(x - 2, y + 1, col); R.pset(x + 2, y, col); R.pset(x + 3, y + 1, col); }
  }
}

// muro de ladrillo a soga con juntas claras de cal, ladrillos de tres tonos, alguno quemado y el borde de luz arriba;
// o.s: escala (1 lejos, 2 cerca), o.osc: sombra encima (0–1), o.k: semilla
function c_ladrillo(R, x0, y0, x1, y1, o = {}) {
  const s = o.s || 1, bw = 6 * s, bh = 3 * s, k = o.k || 0, B = R.buf, osc = o.osc || 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / bh), yy = (y - y0) % bh;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      const xx = x - x0 + (fila % 2) * (bw >> 1) + 40, col = Math.floor(xx / bw), xi = xx % bw;
      let c;
      if (yy === bh - 1 || xi === bw - 1) c = (yy === bh - 1 && xi === bw - 1) || h(x, y, k + 3) < 0.2 ? c_K.morteroS : c_K.mortero;
      else { const q = h(col, fila, k); c = q < 0.16 ? C.ladrilloS : q > 0.88 ? C.ladrilloL : q > 0.58 ? c_K.ladrilloM : C.ladrillo;
        if (yy === 0 && q > 0.3 && q < 0.88) c = c_mezcla(c, C.ladrilloL, 0.45); if (h(x, y, k + 5) < 0.05) c = C.ladrilloS; }
      const sucio = y > y1 - 8 ? (y - (y1 - 8)) / 8 * 0.22 : 0;
      if (osc + sucio > 0) c = c_mezcla(c, c_K.sombra, Math.min(0.8, osc + sucio));
      B[y * 320 + x] = c;
    } }
}

// sillería de piedra caliza: hiladas con juntas, piezas de tres tonos, poros, el borde de luz arriba y, con o.rust,
// almohadillado (juntas hundidas con su sombra); o.osc: sombra encima
function c_sillar(R, x0, y0, x1, y1, o = {}) {
  const s = o.s || 1, bw = (o.bw || 14) * s, bh = (o.bh || 5) * s, k = o.k || 0, B = R.buf, osc = o.osc || 0, rust = !!o.rust;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / bh), yy = (y - y0) % bh;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      const xx = x - x0 + (fila % 2) * (bw >> 1) + 60, col = Math.floor(xx / bw), xi = xx % bw, q = h(col, fila, k + 11);
      let c = q < 0.25 ? C.calizaS : q > 0.8 ? C.calizaL : C.caliza;
      if (h(x, y, k + 12) < 0.06) c = C.calizaS; else if (h(x, y, k + 13) < 0.03) c = C.calizaL;
      if (yy === bh - 1 || xi === bw - 1) c = rust ? c_K.sombra : c_mezcla(C.calizaS, c_K.sombra, 0.3);
      else if (rust && (yy === bh - 2 || xi === bw - 2)) c = c_mezcla(C.calizaS, c_K.sombra, 0.25);
      else if (yy === 0) c = C.calizaL;
      if (osc) c = c_mezcla(c, c_K.sombra, osc);
      B[y * 320 + x] = c;
    } }
}

// las esquinas de piedra (cadenas) de una casa de ladrillo: sillares alternos largos y cortos, con su sombra
function c_esquinas(R, x, y0, y1, w, dir, s = 1) {
  const bh = 5 * s;
  for (let y = y1, k = 0; y > y0; y -= bh, k++) { const ww = k % 2 ? w - 3 * s : w, xa = dir > 0 ? x : x - ww + 1, xb = dir > 0 ? x + ww - 1 : x, ya = Math.max(y0, y - bh + 1);
    R.rect(xa, ya, xb, y, C.caliza); R.rect(xa, ya, xb, ya, C.calizaL); R.rect(xa, y, xb, y, C.calizaS); R.rect(dir > 0 ? xb : xa, ya, dir > 0 ? xb : xa, y, C.calizaS);
    if (h(k, x, 5) < 0.5) R.pset(xa + 2, ya + 2, C.calizaS); }
}

// cornisa de piedra con dentículos y la sombra que echa sobre la pared
function c_cornisa(R, x0, x1, y, s = 1) {
  R.rect(x0, y, x1, y + 4 * s - 1, C.caliza); R.rect(x0, y, x1, y, C.calizaL); R.rect(x0 - 1, y - 1, x1 + 1, y - 1, c_K.sombra);
  for (let x = x0; x <= x1; x += 2 * s) R.rect(x, y + 2 * s, x + s - 1, y + 3 * s - 1, C.calizaS);
  R.rect(x0, y + 4 * s - 1, x1, y + 4 * s - 1, C.calizaS); c_tinte(R, x0, y + 4 * s, x1, y + 4 * s + s, 0.4);
}

// ventana de guillotina georgiana: dintel con clave, alféizar, marco blanco, dos hojas (6 sobre 6 o 4 sobre 4) con el
// reflejo del cielo en diagonal; o.postigos: contraventanas verdes con lamas; o.cortina: cortina dentro; o.luz: encendida
function c_ventana(R, x, y, w, hh, o = {}) {
  const { rect, pset } = R, s = o.s || 1;
  rect(x - 2 * s, y - 3 * s, x + w + 2 * s - 1, y - 1, C.caliza); rect(x - 2 * s, y - 3 * s, x + w + 2 * s - 1, y - 3 * s, C.calizaL); rect(x - 2 * s, y - 1, x + w + 2 * s - 1, y - 1, C.calizaS);
  { const cx = x + (w >> 1); rect(cx - s, y - 4 * s, cx + s, y - 1, C.calizaL); rect(cx + s, y - 4 * s, cx + s, y - 1, C.calizaS); }
  rect(x - s, y + hh, x + w + s - 1, y + hh + s, C.caliza); rect(x - s, y + hh, x + w + s - 1, y + hh, C.calizaL); c_tinte(R, x - s, y + hh + s + 1, x + w + s - 1, y + hh + s + 1, 0.35);
  rect(x, y, x + w - 1, y + hh - 1, c_K.marco);
  const cuer = o.luz ? [hex('#f8d888'), hex('#e8a850')] : null;
  for (let j = s; j < hh - s; j++) for (let i = s; i < w - s; i++) {
    const d = (i + j * 1.3 + x) % 11; let c;
    if (cuer) c = j < hh * 0.5 ? cuer[0] : cuer[1];
    else c = d < 1.6 && j < hh * 0.75 ? c_K.vidrioR : j < 2 * s + 1 ? c_K.vidrioL : (i + j) % 7 === 0 ? c_mezcla(c_K.vidrio, c_K.vidrioL, 0.3) : c_K.vidrio;
    pset(x + i, y + j, c);
  }
  if (o.cortina && !cuer) for (let j = s; j < hh - s; j++) { const ww = Math.max(1, Math.round((w * 0.28) * (0.6 + j / hh * 0.5))); for (let i = s; i < s + ww; i++) pset(x + i, y + j, (i + j) % 3 ? o.cortina : c_mezcla(o.cortina, c_K.sombra, 0.3)); }
  const cols = w >= 9 * s ? 3 : 2, mid = y + (hh >> 1);
  for (let c = 1; c < cols; c++) { const mx = x + Math.round(w * c / cols); rect(mx, y, mx + s - 1, y + hh - 1, c_K.marco); }
  for (const f of [0.25, 0.75]) { const my = y + Math.round(hh * f); rect(x, my, x + w - 1, my + s - 1, c_K.marco); }
  rect(x, mid - (s > 1 ? 1 : 0), x + w - 1, mid + s - 1, c_K.marco); rect(x, mid + s, x + w - 1, mid + s, c_K.marcoS); rect(x + w - 1, y, x + w - 1, y + hh - 1, c_K.marcoS);
  if (o.postigos) for (const d of [-1, 1]) { const pw = Math.max(3, Math.round(w * 0.45)), xa = d < 0 ? x - pw - s : x + w + s, xb = xa + pw - 1;
    rect(xa, y, xb, y + hh - 1, c_K.postigo); rect(d < 0 ? xa : xb, y, d < 0 ? xa : xb, y + hh - 1, c_K.postigoS); rect(xa, y, xb, y, c_K.postigoL);
    for (let j = y + 2; j < y + hh - 1; j += 2) rect(xa + 1, j, xb - 1, j, c_K.postigoS); rect(xa + 1, y + (hh >> 1), xb - 1, y + (hh >> 1), c_K.postigoL); }
}

// puerta georgiana: pilastras, montante en abanico, puerta de seis cuarterones con su aldaba y escalinata de piedra
function c_puertaG(R, x, y, w, hh, o = {}) {
  const { rect, pset, disco } = R, r = Math.floor(w / 2), cx = x + r, col = o.color || c_K.puerta;
  rect(x - 3, y - r - 2, x + w + 2, y + hh - 1, C.caliza); rect(x - 3, y - r - 2, x - 3, y + hh - 1, C.calizaL); rect(x + w + 2, y - r - 2, x + w + 2, y + hh - 1, C.calizaS);
  disco(cx + 0.5, y, r + 1, C.calizaS); disco(cx + 0.5, y, r, c_K.marco); disco(cx + 0.5, y, r - 1, c_K.vidrio);
  for (let k = 1; k < 5; k++) { const a = Math.PI + k * Math.PI / 5; R.linea(cx, y, cx + Math.cos(a) * (r - 1), y + Math.sin(a) * (r - 1), c_K.marco); }
  rect(x - 1, y, x + w, y + hh - 1, c_K.sombra); rect(x, y + 1, x + w - 1, y + hh - 1, col);
  const pw = Math.floor((w - 3) / 2);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) { const px = x + 1 + i * (pw + 1), py = y + 2 + j * Math.floor((hh - 3) / 3), ph = Math.floor((hh - 3) / 3) - 2;
    rect(px, py, px + pw - 1, py + ph, c_K.puertaS); rect(px + 1, py + 1, px + pw - 1, py + ph, col); rect(px + 1, py + 1, px + pw - 1, py + 1, c_K.puertaL); }
  pset(cx, y + (hh >> 1) - 2, C.oro); pset(cx, y + (hh >> 1) - 1, C.oroS); pset(x + w - 3, y + (hh >> 1) + 2, C.oro);
  if (o.escalones) for (let e = 0; e < o.escalones; e++) { const ey = y + hh + e * 2, ex = e * 2; rect(x - 4 - ex, ey, x + w + 3 + ex, ey + 1, C.caliza); rect(x - 4 - ex, ey, x + w + 3 + ex, ey, C.calizaL); rect(x - 4 - ex, ey + 1, x + w + 3 + ex, ey + 1, C.calizaS); }
}

// tejado de pizarra visto de frente (hileras de lajas escalonadas, cumbrera, alero en sombra), con buhardillas y
// chimeneas de ladrillo con sus caperuzas
function c_tejado(R, x0, x1, yb, yt, o = {}) {
  const B = R.buf, k = o.k || 0, entra = o.entra ?? 4;
  for (let y = yt; y < yb; y++) { const f = (y - yt) / (yb - yt), xa = Math.round(x0 + entra * (1 - f)), xb = Math.round(x1 - entra * (1 - f)), fila = Math.floor((y - yt) / 3), yy = (y - yt) % 3;
    for (let x = xa; x <= xb; x++) { if (x < 0 || x > 319 || y < 0) continue; const xi = (x + fila * 2) % 5, q = h(Math.floor((x + fila * 2) / 5), fila, k + 21);
      let c = yy === 2 ? c_K.pizarraS : xi === 0 ? c_K.pizarraS : q > 0.8 ? c_K.pizarraL : q < 0.2 ? c_mezcla(c_K.pizarra, c_K.pizarraS, 0.5) : c_K.pizarra;
      if (x === xa || x === xb || y === yt) c = c_K.sombra; if (yy === 0 && xi === 1) c = c_mezcla(c, c_K.pizarraL, 0.5);
      B[y * 320 + x] = c; } }
  for (const bx of o.buhard || []) { const bw = o.bw || 10, by = yt + Math.round((yb - yt) * 0.2), bh = yb - by - 2;
    R.poligono([[bx - 1, by + 3], [bx + bw / 2, by - 2], [bx + bw + 1, by + 3]], C.caliza); R.linea(bx - 1, by + 3, bx + bw / 2, by - 2, C.calizaL); R.linea(bx + bw / 2, by - 2, bx + bw + 1, by + 3, C.calizaS);
    R.rect(bx, by + 3, bx + bw, by + bh, C.calizaS); R.rect(bx + 1, by + 3, bx + bw - 1, by + bh, c_K.marco);
    for (let j = by + 4; j < by + bh; j++) for (let i = bx + 2; i < bx + bw - 1; i++) R.pset(i, j, (i + j) % 6 === 0 ? c_K.vidrioR : c_K.vidrio);
    R.rect(bx + 1, by + 3 + ((bh - 3) >> 1), bx + bw - 1, by + 3 + ((bh - 3) >> 1), c_K.marco); R.rect(bx + (bw >> 1), by + 3, bx + (bw >> 1), by + bh, c_K.marco); }
  for (const [cx, alto] of o.chim || []) { const cw = o.cw || 6;
    c_ladrillo(R, cx, yt - alto, cx + cw - 1, yb - 1, { k: cx }); R.rect(cx + cw - 1, yt - alto, cx + cw - 1, yb - 1, C.ladrilloS);
    R.rect(cx - 1, yt - alto - 2, cx + cw, yt - alto, C.caliza); R.rect(cx - 1, yt - alto - 2, cx + cw, yt - alto - 2, C.calizaL);
    R.rect(cx + 1, yt - alto - 5, cx + 2, yt - alto - 3, C.ladrilloS); R.rect(cx + cw - 3, yt - alto - 4, cx + cw - 2, yt - alto - 3, C.ladrilloS); }
}

// humo de chimenea: bocanadas que suben, se ensanchan, se tuercen con el viento y se deshacen en trama
function c_humo(R, x, y, t, k = 0, col = hex('#d8d4d0'), dir = 1) {
  for (let i = 0; i < 7; i++) { const u = ((t * 0.35 + i / 7 + h(k, 1, 61)) % 1), py = y - u * 30, px = x + dir * u * u * 14 + Math.sin(t * 1.3 + i + k) * 1.5, r = 1.5 + u * 4;
    for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) if (ii * ii + j * j <= r * r && c_um(Math.round(px + ii), Math.round(py + j)) > u * 0.95) R.pset(Math.round(px + ii), Math.round(py + j), j < 0 ? col : c_mezcla(col, hex('#8a8690'), 0.35)); }
}

// farol de aceite sobre su poste de hierro: peana, poste con anillas, travesaño para la escalera, la linterna de cuatro
// cristales con su caperuza y, con luz, la llama que tiembla y el halo
function c_farol(R, x, base, alto, t, luz = false) {
  const { rect, pset } = R, y0 = base - alto;
  rect(x - 3, base - 4, x + 3, base, c_K.hierro); rect(x - 2, base - 4, x + 2, base - 4, c_K.hierroL);
  rect(x - 1, y0 + 8, x + 1, base - 4, c_K.hierro); rect(x - 1, y0 + 8, x - 1, base - 4, c_K.hierroL);
  for (const ay of [base - 12, y0 + 20]) rect(x - 2, ay, x + 2, ay + 1, c_K.hierro);
  rect(x - 5, y0 + 10, x + 5, y0 + 10, c_K.hierro); pset(x - 5, y0 + 9, c_K.hierro); pset(x + 5, y0 + 9, c_K.hierro);
  R.poligono([[x - 4, y0 + 8], [x + 4, y0 + 8], [x + 2, y0 + 1], [x - 2, y0 + 1]], c_K.hierro); rect(x - 1, y0 - 1, x + 1, y0 + 1, c_K.hierro); pset(x, y0 - 2, c_K.hierro);
  R.poligono([[x - 4, y0 + 8], [x + 4, y0 + 8], [x + 3, y0 + 2], [x - 3, y0 + 2]], c_K.hierro);
  const fl = Math.sin(t * 13) + Math.sin(t * 7.3) > 0.5;
  for (let j = y0 + 3; j <= y0 + 7; j++) for (let i = x - 2; i <= x + 2; i++) pset(i, j, luz ? (i === x && j >= y0 + 4 + (fl ? 1 : 0) ? c_K.fuegoL : hex('#f0c070')) : (i - x + j) % 4 === 0 ? c_K.vidrioR : hex('#4a5266'));
  rect(x, y0 + 2, x, y0 + 8, c_K.hierro);
  if (luz) for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 5 && d < 9 + (fl ? 1 : 0) && c_um(x + i, y0 + 5 + j) > d / 10) { const p = R.pget(x + i, y0 + 5 + j); R.pset(x + i, y0 + 5 + j, c_mezcla(p, hex('#ffd890'), 0.4)); } }
}

// una persona pequeña de fondo (unos 12 px): tricornio o cofia, cara, casaca de colores y piernas; respira y, con
// o.vitorea, salta y levanta el sombrero; o.espalda: de espaldas (mira al fondo)
const c_ROPA = pal({ a: '#3a4a6a', b: '#7a3a2a', c: '#5a5a3a', d: '#2a2a32', e: '#8a6a3a', f: '#4a6a5a', g: '#6a3a5a', i: '#a8483a', j: '#c8b890' });

const c_ROPAS = Object.values(c_ROPA), c_PIELES = [c_K.piel, hex('#d8a878'), c_K.pielM, hex('#8a5a3a')];

function c_gente(R, x, s, t, k, o = {}) {
  if (o.mini) { const ropa = c_ROPAS[k % c_ROPAS.length], y = s - (o.vitorea && Math.sin(t * 7 + k * 1.9) > 0.55 ? 1 : 0);
    R.rect(x - 1, y - 4, x + 1, y, ropa); R.pset(x + 1, y - 4, c_mezcla(ropa, c_K.sombra, 0.4)); R.pset(x, y - 5, c_PIELES[k % 4]); R.rect(x - 1, y - 6, x + 1, y - 6, h(k, 3, 71) < 0.35 ? c_K.marco : c_K.sombra);
    if (o.vitorea && Math.sin(t * 5 + k * 1.3) > 0) R.pset(x + 2, y - 6, c_K.sombra); return; }
  const { rect, pset } = R, ropa = c_ROPAS[k % c_ROPAS.length], piel = c_PIELES[Math.floor(h(k, 2, 71) * 4)], mujer = h(k, 3, 71) < 0.35, esp = o.espalda;
  const salto = o.vitorea && Math.sin(t * 7 + k * 1.9) > 0.55 ? 1 : 0, y = s - salto, oscura = c_mezcla(ropa, c_K.sombra, 0.4);
  if (mujer) { rect(x - 2, y - 6, x + 2, y - 1, ropa); rect(x + 2, y - 6, x + 2, y - 1, oscura); rect(x - 2, y - 1, x + 2, y - 1, oscura); rect(x - 1, y - 4, x + 1, y - 4, c_K.marco); }
  else { rect(x - 1, y - 2, x - 1, y, c_K.sombra); rect(x + 1, y - 2, x + 1, y, c_K.sombra); rect(x - 2, y - 7, x + 2, y - 3, ropa); rect(x + 2, y - 7, x + 2, y - 3, oscura); if (!esp) pset(x, y - 6, c_K.marco); }
  rect(x - 1, y - 10, x + 1, y - 8, esp ? (mujer ? hex('#6a4a2a') : hex('#d8d4cc')) : piel); if (!esp) pset(x + 1, y - 9, c_mezcla(piel, c_K.sombra, 0.3));
  const brazo = o.vitorea && Math.sin(t * 5 + k * 1.3) > -0.2;
  if (mujer) { rect(x - 2, y - 11, x + 2, y - 11, c_K.marco); rect(x - 2, y - 10, x - 2, y - 9, c_K.marco); }
  else if (!brazo) { rect(x - 2, y - 11, x + 2, y - 11, c_K.sombra); pset(x, y - 12, c_K.sombra); pset(x - 2, y - 12, c_K.sombra); pset(x + 2, y - 12, c_K.sombra); }
  else { rect(x - 1, y - 11, x + 1, y - 11, hex('#d8d4cc')); }
  if (brazo) { R.linea(x + 2, y - 6, x + 4, y - 11, ropa); if (!mujer) { rect(x + 3, y - 14, x + 6, y - 13, c_K.sombra); pset(x + 4, y - 15, c_K.sombra); } else pset(x + 4, y - 12, piel); }
}

// una paloma que picotea y da pasitos
function c_paloma(R, x, y, t, k) {
  const pic = Math.sin(t * 5 + k * 3) > 0.4, d = k % 2 ? 1 : -1, px = Math.round(x + Math.sin(t * 0.5 + k) * 3);
  R.rect(px - 2, y - 2, px + 1, y - 1, c_K.paloma); R.pset(px - 2 * d, y - 2, c_K.palomaS); R.pset(px - 1, y - 1, c_K.palomaS);
  const hx = px + 2 * d, hy = pic ? y - 1 : y - 3; R.pset(hx, hy, c_K.palomaS); R.pset(hx + d, hy, C.naranja); R.pset(px, y, C.naranja);
}

// bandera ondeante de w×hh desde (x, y) hacia dir: 'barras' (13 barras y el cantón azul con 13 estrellas en círculo) o
// 'britanica' (la Union de 1707: aspa blanca de San Andrés y cruz roja de San Jorge con filete blanco sobre azul,
// sin el aspa roja de San Patricio, que es de 1801); las sombras siguen la onda
function c_bandera(R, x, y, w, hh, t, tipo, dir = 1) {
  const az = C.azulBandera, rj = C.rojoBandera, bl = C.blanco, cw = Math.round(w * 0.42), ch = Math.round(hh * 7 / 13), cx0 = cw / 2, cy0 = ch / 2, rr = Math.min(cw, ch) * 0.34;
  const est = new Set(); if (tipo === 'barras') for (let k = 0; k < 13; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 13; est.add(Math.round(cx0 - 0.5 + Math.cos(a) * rr) + ',' + Math.round(cy0 - 0.5 + Math.sin(a) * rr)); }
  for (let i = 0; i < w; i++) {
    const f = Math.sin(i * 0.45 - t * 6), oy = Math.round(f * 1.2 * (i / w)), sh = Math.cos(i * 0.45 - t * 6);
    for (let j = 0; j < hh; j++) {
      let c;
      if (tipo === 'barras') c = i < cw && j < ch ? (est.has(i + ',' + j) ? bl : az) : Math.floor(j * 13 / hh) % 2 ? bl : rj;
      else { // la Union de 1707 (antes de 1801): cruz roja de San Jorge con su filete blanco sobre el aspa blanca de San
        // Andrés en azul; sin el aspa roja de San Patricio. Distancias en píxeles, para que el aspa se lea igual de ancha
        const cxp = (w - 1) / 2, cyp = (hh - 1) / 2, L = Math.hypot(w, hh), dd = Math.min(Math.abs((i - cxp) * hh - (j - cyp) * w), Math.abs((i - cxp) * hh + (j - cyp) * w)) / L;
        const ax = Math.abs(i - cxp), ay = Math.abs(j - cyp), rc = Math.max(0.8, hh * 0.1), fb = rc + Math.max(0.9, hh * 0.09);
        c = ax < rc || ay < rc ? rj : ax < fb || ay < fb ? bl : dd < Math.max(0.9, hh * 0.12) ? bl : az; }
      if (sh > 0.55) c = c_mezcla(c, C.blanco, 0.18); else if (sh < -0.55) c = c_mezcla(c, c_K.sombra, 0.25);
      R.pset(x + i * dir, y + j + oy, c);
    }
    R.pset(x + i * dir, y + hh + oy, c_mezcla(rj, c_K.sombra, 0.5));
  }
}
// un águila de relieve con las alas alzadas, la cabeza de perfil, el escudo liso en el pecho y la cola en abanico;
// cols = [sombra, cuerpo, luz]
function c_aguila(R, cx, cy, cols) {
  const [S, O, L] = cols;
  for (const d of [-1, 1]) {
    R.poligono([[cx + d * 2, cy], [cx + d * 13, cy - 8], [cx + d * 12, cy - 4], [cx + d * 10, cy - 1], [cx + d * 8, cy + 2], [cx + d * 3, cy + 4]], O);
    for (let k = 0; k < 4; k++) R.linea(cx + d * (4 + k * 2), cy + 3 - k * 0.5, cx + d * (6 + k * 2), cy - 2 - k * 1.5, S);
    R.linea(cx + d * 3, cy - 1, cx + d * 12, cy - 7, L);
  }
  R.disco(cx, cy + 2, 3, O); R.rect(cx - 2, cy + 1, cx + 2, cy + 5, S); R.rect(cx - 1, cy + 1, cx + 1, cy + 4, L); R.pset(cx, cy + 2, S);
  R.poligono([[cx - 4, cy + 9], [cx + 4, cy + 9], [cx + 1, cy + 5], [cx - 1, cy + 5]], O); R.linea(cx, cy + 6, cx, cy + 9, S);
  R.rect(cx - 1, cy - 4, cx + 1, cy - 1, O); R.rect(cx - 1, cy - 5, cx + 2, cy - 3, L); R.pset(cx + 3, cy - 4, C.oroS); R.pset(cx + 1, cy - 4, S);
  R.pset(cx - 3, cy + 6, S); R.pset(cx + 3, cy + 6, S);
}

// el Federal Hall de 1789 (piedra clara) en la capa fija
function c_federal89(R) {
  const { rect, pset, linea, poligono, disco } = R, K = c_K.sombra;
  // la cúpula de detrás: tambor con arcos, cúpula de cobre oscuro y remate
  rect(150, 22, 170, 34, K); c_sillar(R, 151, 23, 169, 34, { bw: 6, bh: 3, k: 90 }); for (const ax of [153, 159, 165]) { rect(ax, 25, ax + 2, 31, K); pset(ax + 1, 24, K); }
  for (let j = 0; j < 7; j++) { const w = Math.round(Math.sqrt(1 - (j / 7) ** 2) * 11); rect(160 - w, 22 - j, 160 + w, 22 - j, j === 6 ? K : (160 - w + j) % 3 ? hex('#5a7a74') : hex('#7a9a90')); pset(160 - w, 22 - j, K); pset(160 + w, 22 - j, K); }
  rect(159, 15, 161, 16, C.oroS); pset(160, 15, C.oro);
  // las alas: tejado de pizarra, balaustrada, cornisa, piso noble con ventanas con frontoncillo y planta baja almohadillada
  for (const [x0, x1] of [[80, 116], [204, 240]]) {
    c_tejado(R, x0, x1, 52, 40, { k: x0, entra: 6 });
    rect(x0 - 1, 52, x1 + 1, 57, C.caliza); rect(x0 - 1, 52, x1 + 1, 52, C.calizaL); rect(x0 - 1, 57, x1 + 1, 57, C.calizaS);
    for (let x = x0; x <= x1; x += 3) { rect(x, 53, x + 1, 56, C.calizaS); pset(x, 54, C.calizaL); }
    c_sillar(R, x0, 58, x1, 104, { k: x0 }); c_cornisa(R, x0 - 1, x1 + 1, 58);
    c_sillar(R, x0, 105, x1, 138, { rust: true, bh: 6, k: x0 + 7 });
    rect(x0, 103, x1, 104, C.calizaL); rect(x0, 105, x1, 105, C.calizaS);
    for (const wx of [x0 + 6, x1 - 14]) {
      poligono([[wx - 3, 70], [wx + 4.5, 65], [wx + 12, 70]], C.caliza); linea(wx - 3, 70, wx + 4.5, 65, C.calizaL); linea(wx + 4.5, 65, wx + 12, 70, C.calizaS); rect(wx - 3, 70, wx + 12, 70, C.calizaS);
      c_ventana(R, wx, 74, 9, 22, { cortina: c_K.cortina });
      rect(wx - 1, 114, wx + 9, 132, K); disco(wx + 4, 116, 5, K); rect(wx, 116, wx + 8, 132, c_K.vidrio); disco(wx + 4, 116, 4, c_K.vidrio);
      for (let j = 113; j < 132; j += 4) rect(wx, j, wx + 8, j, c_K.marco); rect(wx + 4, 112, wx + 4, 132, c_K.marco); pset(wx + 2, 118, c_K.vidrioR); pset(wx + 6, 122, c_K.vidrioR);
      rect(wx - 2, 133, wx + 10, 134, C.calizaL); rect(wx + 3, 108, wx + 5, 111, C.calizaL);
    }
  }
  // el cuerpo central: planta baja de tres arcos sobre cuatro machones almohadillados
  c_sillar(R, 112, 105, 208, 138, { rust: true, bh: 6, bw: 9, k: 77 });
  for (const [a0, a1] of [[124, 140], [149, 171], [180, 196]]) { const cx = (a0 + a1) / 2, r = (a1 - a0) / 2;
    for (let y = 106; y <= 140; y++) for (let x = a0; x <= a1; x++) { const dy = y - (114 + r * 0.2), dd = dy < 0 ? Math.hypot(x - cx, dy * 1.4) : Math.abs(x - cx); if (dd > r + 0.5) continue;
      pset(x, y, dd > r - 1 ? K : y < 120 ? hex('#3a3040') : (x + y) % 9 === 0 ? hex('#4a3e4a') : hex('#2e2834')); }
    for (let k = -2; k <= 2; k++) { const a = -Math.PI / 2 + k * 0.32, kx = Math.round(cx + Math.sin(k * 0.32) * (r + 1)), ky = Math.round(114 + r * 0.2 - Math.cos(k * 0.32) * (r + 1) * 0.72); rect(kx - 1, ky - 2, kx + 1, ky, k ? C.calizaL : C.caliza); } }
  // la puerta de dentro del arco central (doble, con montante) y las losas del zaguán
  rect(152, 118, 168, 140, hex('#241c22')); rect(153, 120, 167, 140, hex('#5a3a26')); rect(160, 120, 160, 140, hex('#3a2418')); disco(160, 121, 6, hex('#3a2418')); disco(160, 121, 5, hex('#c8a858'));
  for (let k = 0; k < 5; k++) linea(160, 121, 160 + Math.cos(Math.PI + k * Math.PI / 4) * 5, 121 + Math.sin(Math.PI + k * Math.PI / 4) * 5, hex('#3a2418'));
  rect(153, 121, 167, 125, hex('#5a3a26')); for (const px of [154, 162]) { rect(px, 127, px + 4, 132, hex('#4a2e1e')); rect(px, 134, px + 4, 139, hex('#4a2e1e')); rect(px, 127, px + 4, 127, hex('#7a5232')); rect(px, 134, px + 4, 134, hex('#7a5232')); }
  // el balcón corrido: losa con su sombra (la barandilla de hierro va en colonialDelante)
  rect(110, 101, 210, 104, C.caliza); rect(110, 101, 210, 101, C.calizaL); rect(110, 104, 210, 104, C.calizaS); c_tinte(R, 112, 105, 208, 107, 0.45);
  for (let x = 114; x <= 206; x += 8) { rect(x, 105, x + 2, 108, C.calizaS); pset(x, 105, C.caliza); }
  // el piso noble en sombra detrás de las columnas: la puerta grande con cortinas rojas recogidas y dos ventanas altas
  c_sillar(R, 112, 58, 208, 100, { bw: 10, bh: 5, k: 78, osc: 0.32 });
  const cortinaje = (x0, x1, y0, y1) => {
    rect(x0 - 1, y0 - 1, x1 + 1, y1, K); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x + y) % 5 === 0 ? hex('#3a3a4e') : hex('#2a2a3a'));
    const w = x1 - x0, cx = (x0 + x1) / 2;
    for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), ab = u < 0.55 ? w * 0.5 * (1 - u / 0.55) * 0.95 : w * 0.06 + (u - 0.55) * w * 0.25;
      for (const d of [-1, 1]) for (let i = 0; i <= Math.round(ab); i++) { const x = Math.round(d < 0 ? x0 + i : x1 - i); const pl = (i + Math.round(u * 3)) % 4; pset(x, y, pl === 0 ? c_K.cortinaS : pl === 2 ? c_K.cortinaL : c_K.cortina); } }
    rect(x0, y0, x1, y0 + 2, c_K.cortina); for (let x = x0; x <= x1; x += 2) pset(x, y0 + 3, C.oro); rect(x0, y0, x1, y0, c_K.cortinaL);
    void cx;
  };
  cortinaje(151, 169, 64, 100); cortinaje(127, 137, 70, 100); cortinaje(183, 193, 70, 100);
  // cuatro columnas dóricas: basa, fuste con estrías y luz a la izquierda, collarino, equino y ábaco
  for (const cx of [119, 144, 175, 200]) {
    rect(cx - 4, 98, cx + 4, 100, C.caliza); rect(cx - 4, 98, cx + 4, 98, C.calizaL); rect(cx - 4, 100, cx + 4, 100, C.calizaS);
    for (let y = 62; y < 98; y++) { const ent = y < 70 ? 0 : 0; for (let i = -3 + ent; i <= 3 - ent; i++) pset(cx + i, y, i === -3 ? C.calizaL : i === 3 ? c_K.sombra : i === 2 ? C.calizaS : i % 2 ? C.caliza : (i === -2 ? C.calizaL : c_mezcla(C.caliza, C.calizaS, 0.4))); }
    rect(cx - 4, 61, cx + 4, 62, C.calizaL); rect(cx - 5, 58, cx + 5, 60, C.caliza); rect(cx - 5, 58, cx + 5, 58, C.calizaL); rect(cx - 5, 60, cx + 5, 60, C.calizaS);
    c_tinte(R, cx + 4, 63, cx + 6, 97, 0.35);
  }
  // el entablamento: arquitrabe, friso con triglifos y trece estrellas doradas, cornisa
  c_sillar(R, 110, 50, 210, 57, { bw: 20, bh: 8, k: 79 }); rect(110, 55, 210, 55, C.calizaS); rect(110, 56, 210, 57, C.caliza); rect(110, 57, 210, 57, C.calizaS);
  for (let k = 0; k < 13; k++) { const sx = 116 + k * 7.4; const x = Math.round(sx); pset(x, 52, C.oro); pset(x - 1, 53, C.oro); pset(x, 53, C.oroL); pset(x + 1, 53, C.oro); pset(x, 54, C.oroS); if (k < 12) { rect(x + 3, 51, x + 4, 54, C.calizaS); pset(x + 3, 51, C.calizaL); } }
  rect(108, 47, 212, 49, C.caliza); rect(108, 47, 212, 47, C.calizaL); rect(108, 49, 212, 49, C.calizaS); for (let x = 109; x < 212; x += 2) pset(x, 49, K);
  // el frontón con el águila de relieve dorado y sus rayos
  poligono([[106, 47], [160, 26], [214, 47]], K); poligono([[109, 46], [160, 28], [211, 46]], C.caliza);
  linea(107, 46, 160, 26, C.calizaL); linea(160, 26, 213, 46, C.calizaS); linea(112, 46, 160, 29, C.calizaS); linea(160, 29, 208, 46, C.calizaL);
  for (let y = 31; y < 46; y++) for (let x = 120; x < 200; x++) if (Math.abs(x - 160) < (y - 28) * 2.5 && (x * 7 + y * 3) % 13 === 0) pset(x, y, C.calizaS);
  for (let k = 0; k < 9; k++) { const a = Math.PI + 0.25 + k * (Math.PI - 0.5) / 8; linea(160 + Math.cos(a) * 14, 45 + Math.sin(a) * 14, 160 + Math.cos(a) * 17, 45 + Math.sin(a) * 17, C.calizaL); }
  c_aguila(R, 160, 37, [C.oroS, C.oro, C.oroL]);
}

// el City Hall de 1765 (ladrillo, arcada de cinco arcos, cúpula con campana) en la capa fija
function c_cityHall(R) {
  const { rect, pset, poligono, disco, linea } = R, K = c_K.sombra;
  rect(150, 18, 170, 36, K); rect(151, 19, 169, 36, c_K.marco); for (const ax of [153, 158, 163]) { rect(ax, 22, ax + 3, 33, K); pset(ax + 1, 21, K); pset(ax + 2, 21, K); }
  disco(160, 28, 2, C.oroS); pset(160, 26, C.oro); rect(152, 35, 168, 36, c_K.marcoS);
  for (let j = 0; j < 5; j++) { const w = 11 - j * 2; rect(160 - w, 18 - j, 160 + w, 18 - j, j === 4 ? K : c_K.pizarra); pset(160 - w, 18 - j, K); pset(160 + w, 18 - j, K); }
  rect(160, 13, 160, 15, K); rect(158, 14, 162, 14, K); pset(163, 13, K);
  c_tejado(R, 84, 236, 50, 34, { k: 66, entra: 14, buhard: [104, 134, 176, 206], bw: 10 });
  c_ladrillo(R, 84, 50, 236, 140, { k: 65 });
  c_esquinas(R, 84, 50, 140, 6, 1); c_esquinas(R, 236, 50, 140, 6, -1); c_esquinas(R, 134, 50, 104, 5, 1); c_esquinas(R, 186, 50, 104, 5, -1);
  c_cornisa(R, 82, 238, 50); rect(84, 102, 236, 104, C.caliza); rect(84, 102, 236, 102, C.calizaL); rect(84, 104, 236, 104, C.calizaS);
  for (const wx of [92, 112, 140, 171, 200, 220]) c_ventana(R, wx, 64, 9, 26, { postigos: wx < 130 || wx > 190, cortina: c_K.cortina });
  for (let k = 0; k < 5; k++) { const cx = 100 + k * 30, r = 10;
    for (let y = 108; y <= 140; y++) for (let x = cx - r; x <= cx + r; x++) { const dy = y - 118, dd = dy < 0 ? Math.hypot(x - cx, dy * 1.2) : Math.abs(x - cx); if (dd > r + 0.5) continue; pset(x, y, dd > r - 1 ? K : y < 124 ? hex('#3a3040') : (x + y) % 9 === 0 ? hex('#4a3e4a') : hex('#2e2834')); }
    for (let k2 = -2; k2 <= 2; k2++) { const kx = Math.round(cx + Math.sin(k2 * 0.4) * (r + 2)), ky = Math.round(118 - Math.cos(k2 * 0.4) * (r + 2) * 0.85); rect(kx - 1, ky - 1, kx + 1, ky + 1, k2 ? C.caliza : C.calizaL); } }
  rect(152, 122, 168, 140, hex('#5a3a26')); rect(160, 122, 160, 140, hex('#3a2418')); for (const px of [154, 162]) rect(px, 126, px + 4, 136, hex('#4a2e1e'));
  rect(134, 100, 186, 102, C.caliza); rect(134, 100, 186, 100, C.calizaL); c_tinte(R, 136, 103, 184, 105, 0.4);
  void linea; void poligono;
}

// la barandilla de hierro del balcón (por delante de quien esté en él)
function c_balconDelante(R, t, en89) {
  const { rect, pset } = R, x0 = en89 ? 111 : 135, x1 = en89 ? 209 : 185, y0 = 91, y1 = 100;
  rect(x0, y0, x1, y0 + 1, c_K.hierro); rect(x0, y0, x1, y0, c_K.hierroL); rect(x0, y1, x1, y1, c_K.hierro);
  for (let x = x0; x <= x1; x += 3) { rect(x, y0 + 2, x, y1, c_K.hierro); if ((x / 3) % 2 === 0) { pset(x - 1, y0 + 5, c_K.hierro); pset(x + 1, y0 + 5, c_K.hierro); pset(x, y0 + 4, c_K.hierroL); } }
  for (let x = x0 + 1; x < x1; x += 6) { pset(x + 1, y0 + 6, c_K.hierro); pset(x + 2, y0 + 7, c_K.hierro); pset(x + 1, y0 + 8, c_K.hierro); }
  for (const x of en89 ? [x0, 144, 176, x1] : [x0, x1]) { rect(x - 1, y0 - 1, x + 1, y1, c_K.hierro); pset(x, y0 - 2, c_K.hierroL); }
  if (en89) { rect(x0 + 40, y0 + 2, x1 - 40, y0 + 7, c_K.cortina); for (let x = x0 + 40; x <= x1 - 40; x++) { pset(x, y0 + 8 + Math.round(Math.sin((x - x0) * 0.35) * 1 + 1), c_K.cortinaS); if (x % 3 === 0) pset(x, y0 + 3, c_K.cortinaL); } rect(x0 + 40, y0 + 2, x1 - 40, y0 + 2, C.oro); }
  void t;
}

// una casa georgiana de ladrillo vista de frente: pisos (de abajo arriba), ventanas, cadenas de piedra, impostas,
// cornisa, tejado con buhardillas y chimeneas y, abajo, la puerta con escalones o una tienda con escaparate y muestra
function c_casa(R, o) {
  const { x0, x1, base, pisos, cols, ww, s = 1, k = 0 } = o, top = base - pisos.reduce((a, b) => a + b, 0), ventanas = [];
  c_tejado(R, x0 - 1, x1 + 1, top, top - o.tejado, { k, buhard: o.buhard, bw: 8 * s, chim: o.chim, cw: 5 * s, entra: 3 * s });
  c_ladrillo(R, x0, top, x1, base - 1, { s, k: k + 1, osc: o.osc || 0 });
  c_esquinas(R, x0, top, base - 1, 5 * s, 1, s); c_esquinas(R, x1, top, base - 1, 5 * s, -1, s);
  c_cornisa(R, x0 - 2, x1 + 2, top, s);
  let y = base;
  pisos.forEach((ph, i) => {
    const ya = y - ph; if (i > 0) { R.rect(x0, y - s, x1, y, C.caliza); R.rect(x0, y - s, x1, y - s, C.calizaL); }
    const vh = Math.round(ph * 0.6), vy = ya + Math.round(ph * 0.22);
    for (let c = 0; c < cols; c++) { const cx = Math.round(x0 + (x1 - x0) * (c + 0.5) / cols), vx = cx - (ww >> 1);
      if (i === 0 && o.puerta != null && c === o.puerta) { const pw = ww + 2 * s, ph2 = Math.round(ph * 0.62); c_puertaG(R, cx - (pw >> 1), base - ph2 - 2 * (o.escalones || 0), pw, ph2, { escalones: o.escalones || 0, color: o.colorPuerta }); continue; }
      if (i === 0 && o.tienda && c === o.tiendaCol) continue;
      c_ventana(R, vx, vy, ww, vh, { s: 1, postigos: o.postigos, cortina: h(c, i, k) < 0.5 ? c_K.marcoS : c_K.cortina }); ventanas.push([vx, vy, ww, vh]); }
    y = ya;
  });
  if (o.tienda) { const cx = Math.round(x0 + (x1 - x0) * (o.tiendaCol + 0.5) / cols), ph = pisos[0], tx0 = cx - 11 * s, tx1 = cx + 11 * s, ty0 = base - Math.round(ph * 0.78), ty1 = base - 4 * s;
    R.rect(tx0 - 1, ty0 - 4, tx1 + 1, ty1 + 2, hex('#2a3a2a')); R.rect(tx0 - 1, ty0 - 4, tx1 + 1, ty0 - 2, hex('#4a6a4a')); R.rect(tx0, ty0, tx1, ty1, c_K.vidrio);
    for (let x = tx0; x <= tx1; x += 4) R.rect(x, ty0, x, ty1, hex('#3a5a3a')); for (let yy = ty0; yy <= ty1; yy += 5) R.rect(tx0, yy, tx1, yy, hex('#3a5a3a'));
    for (let i = 0; i < 6; i++) { const gx = tx0 + 2 + i * 4, gy = ty1 - 3; R.rect(gx, gy, gx + 1, ty1 - 1, [C.oro, c_K.peltreL, hex('#6a8a4a'), C.ladrilloL, c_K.perg, C.oro][i]); }
    R.rect(tx0 - 2, ty1 + 1, tx1 + 2, ty1 + 2, C.caliza); }
  return ventanas;
}

const c_META = new WeakMap();

// la capa fija de Wall Street (todo lo que no se mueve)
function c_wallFijo(R, en89) {
  const { rect, pset, linea, poligono } = R, K = c_K.sombra, meta = { ventanas: [] };
  // los tejados lejanos de la ciudad, con chimeneas y los mástiles del río Este, en la bruma
  for (let x = 0; x < 320; x++) { const alto = 70 + Math.floor(h(Math.floor(x / 11), 1, 81) * 14) - (Math.floor(x / 11) % 3 === 0 ? 5 : 0);
    for (let y = alto; y < 146; y++) pset(x, y, y === alto ? c_K.lejosL : (x % 11 === 3 && (y - alto) % 5 === 2) ? c_K.lejosL : (x + y) % 7 === 0 ? c_K.lejosS : c_K.lejos); }
  for (const mx of [96, 104, 214, 226]) { linea(mx, 46, mx, 72, c_K.lejosS); linea(mx - 4, 52, mx + 4, 52, c_K.lejosS); linea(mx - 3, 60, mx + 3, 60, c_K.lejosS); }
  // la torre de la Trinidad: fuste de piedra rojiza con ventanas góticas, el campanario con lamas y la aguja
  { const x0 = 52, x1 = 70, cx = 61;
    poligono([[cx - 6, 34], [cx + 0.5, 16], [cx + 7, 34]], K); poligono([[cx - 5, 34], [cx + 0.5, 18], [cx + 6, 34]], c_K.torre); linea(cx + 1, 18, cx + 6, 34, c_K.torreS); linea(cx, 19, cx - 4, 33, c_K.torreL);
    for (let y = 22; y < 34; y += 3) pset(cx + 1, y, c_K.torreS);
    rect(x0 - 1, 34, x1 + 1, 37, K); rect(x0, 34, x1, 36, c_K.torreL);
    for (const px of [x0 - 1, x1 - 1]) { rect(px, 29, px + 2, 34, c_K.torre); pset(px + 1, 28, c_K.torreS); }
    for (let y = 37; y < 90; y++) for (let x = x0; x <= x1; x++) pset(x, y, x === x0 ? c_K.torreL : x >= x1 - 2 ? c_K.torreS : (y % 5 === 0 || (x + Math.floor(y / 5) * 4) % 8 === 0) ? c_K.torreS : h(x, y, 82) < 0.1 ? c_K.torreL : c_K.torre);
    for (const [wy, wh] of [[40, 10], [58, 12]]) { rect(cx - 3, wy, cx + 3, wy + wh, K); for (let j = wy + 2; j < wy + wh; j += 2) rect(cx - 2, j, cx + 2, j, c_K.torreS); pset(cx - 3, wy, c_K.torre); pset(cx + 3, wy, c_K.torre); }
    R.disco(cx, 77, 4, K); R.disco(cx, 77, 3, c_K.marco); pset(cx, 75, K); pset(cx, 76, K); pset(cx + 1, 77, K); }
  // el ayuntamiento al fondo de la calle
  if (en89) c_federal89(R); else c_cityHall(R);
  // las casas de en medio, a los dos lados, con su acera
  meta.ventanas.push(...c_casa(R, { x0: 26, x1: 86, base: 146, pisos: [26, 22, 20], cols: 3, ww: 8, k: 11, tejado: 13, buhard: [38, 64], chim: [[30, 7], [76, 9]], tienda: true, tiendaCol: 1, puerta: 2, postigos: true }));
  meta.ventanas.push(...c_casa(R, { x0: 236, x1: 292, base: 146, pisos: [26, 22, 20], cols: 3, ww: 8, k: 23, tejado: 12, buhard: [252], chim: [[262, 6]], puerta: 0, colorPuerta: hex('#6a2a2a'), postigos: true }));
  // la muestra colgante de la tienda: el brazo de hierro (la tabla con el pictograma se mece en cada fotograma)
  rect(56, 112, 70, 112, c_K.hierro); linea(58, 112, 64, 107, c_K.hierro); pset(56, 111, c_K.hierroL);
  // la calle: acera de losas, bordillo y adoquines en perspectiva con el arroyo en medio
  for (let y = 140; y < 180; y++) { const f = (y - 140) / 40;
    for (let x = 0; x < 320; x++) {
      let c;
      if (y < 147) { const lx = (x + (y > 143 ? 7 : 0)) % 14, q = h(Math.floor((x + (y > 143 ? 7 : 0)) / 14), y > 143 ? 1 : 0, 83); c = lx === 0 || y === 143 ? c_K.losaS : q > 0.7 ? c_K.losaL : c_K.losa; if (y === 140) c = c_K.losaL; }
      else if (y < 149) c = y === 147 ? C.calizaL : C.calizaS;
      else { const ph = 2 + Math.floor(f * 5), fila = Math.floor(Math.pow(y - 149, 0.78)), yy = (y - 149) % (ph + 1);
        const pw = ph * 2 + 2, xx = x + (fila % 2) * (pw >> 1) + Math.round((x - 160) * f * 0.08), col = Math.floor(xx / pw), xi = ((xx % pw) + pw) % pw, q = h(col, fila, 84);
        c = xi === 0 || yy === 0 ? c_K.junta : q < 0.25 ? c_K.adoquinS : q > 0.78 ? c_K.adoquinL : c_K.adoquin;
        if (xi === 1 && yy === 1) c = c_K.adoquinL; if (Math.abs(x - 160) < 2 + f * 5 && c !== c_K.junta) c = c_mezcla(c, c_K.junta, 0.35);
        }
      pset(x, y, c); } }
  // dos charcos en los adoquines, con el cielo reflejado y su borde oscuro
  for (const [px, py, rx] of [[128, 162, 9], [206, 171, 13]]) for (let y = py - 3; y <= py + 3; y++) for (let x = px - rx; x <= px + rx; x++) { const d = ((x - px) / rx) ** 2 + ((y - py) / 3.2) ** 2; if (d > 1) continue; pset(x, y, d > 0.75 ? c_K.adoquinS : y < py ? c_mezcla(C.cielo3, c_K.adoquin, 0.25) : (x + y) % 5 === 0 ? C.blanco : C.cielo2); }
  // las casas de delante, que enmarcan la calle (más grandes, más cerca)
  meta.ventanas.push(...c_casa(R, { x0: -10, x1: 30, base: 174, pisos: [36, 32, 30], cols: 1, ww: 12, s: 2, k: 31, tejado: 16, chim: [[8, 12]], puerta: 0, escalones: 2, postigos: false }));
  meta.ventanas.push(...c_casa(R, { x0: 290, x1: 330, base: 174, pisos: [36, 32, 30], cols: 1, ww: 12, s: 2, k: 41, tejado: 12, postigos: false }));
  for (let y = 174; y < 180; y++) for (let x = 0; x < 320; x++) if (x < 36 || x > 284) pset(x, y, (x % 12 === 0 || y === 174) ? c_K.losaS : y === 175 ? c_K.losaL : c_K.losa);
  c_tinte(R, 30, 150, 34, 179, 0.3); c_tinte(R, 286, 150, 290, 179, 0.3);
  // la bomba de agua del barrio (de madera, con su palanca y el pilón) y un barril con un poste de amarrar
  { const bx = 262; rect(bx - 3, 120, bx + 3, 146, c_K.tablaD); rect(bx - 2, 120, bx + 2, 146, c_K.tabla); rect(bx - 2, 120, bx - 2, 146, c_K.tablaL); rect(bx - 4, 118, bx + 4, 120, c_K.tablaS);
    rect(bx + 3, 128, bx + 7, 129, c_K.hierro); pset(bx + 7, 130, c_K.hierro); rect(bx - 9, 141, bx + 9, 147, c_K.tablaS); rect(bx - 8, 141, bx + 8, 142, c_K.aguaL); rect(bx - 8, 143, bx + 8, 146, c_K.tabla); rect(bx - 9, 141, bx + 9, 141, c_K.tablaD); }
  { const bx = 222; rect(bx - 5, 132, bx + 5, 147, c_K.tablaD); for (let y = 133; y < 147; y++) rect(bx - 4, y, bx + 4, y, (y - 133) % 4 === 0 ? c_K.tablaS : c_K.tabla); rect(bx - 5, 136, bx + 5, 136, c_K.hierro); rect(bx - 5, 143, bx + 5, 143, c_K.hierro); rect(bx - 3, 133, bx - 3, 146, c_K.tablaL); }
  // los dos faroles de la calle (la linterna se pinta en cada fotograma)
  meta.faroles = [[42, 176, 54], [278, 176, 54]];
  return meta;
}

// el carro tirado por un caballo que cruza al fondo, recortado entre las casas de en medio
function c_carro(R, x, suelo, t) {
  const { pset, disco, linea } = R, pas = Math.floor(t * 6) % 2;
  c_rr(R, x - 14, suelo - 9, x + 6, suelo - 5, c_K.tabla); c_rr(R, x - 14, suelo - 9, x + 6, suelo - 9, c_K.tablaL); c_rr(R, x - 14, suelo - 5, x + 6, suelo - 5, c_K.tablaD);
  for (const bx of [-11, -5, 1]) { c_rr(R, x + bx, suelo - 15, x + bx + 4, suelo - 10, c_K.tabla); c_rr(R, x + bx, suelo - 13, x + bx + 4, suelo - 13, c_K.hierro); c_rr(R, x + bx + 4, suelo - 15, x + bx + 4, suelo - 10, c_K.tablaS); }
  disco(x - 6, suelo - 3, 3, c_K.hierro); disco(x - 6, suelo - 3, 2, c_K.tabla); pset(x - 6, suelo - 3, c_K.hierro); linea(x - 6 + (pas ? 1 : -1), suelo - 5, x - 6 - (pas ? 1 : -1), suelo - 1, c_K.tablaD);
  linea(x + 6, suelo - 7, x + 10, suelo - 8, c_K.tablaD);
  const cx = x + 16; c_rr(R, cx - 6, suelo - 11, cx + 5, suelo - 6, c_K.caballo); c_rr(R, cx - 6, suelo - 6, cx + 5, suelo - 6, c_K.caballoS);
  c_rr(R, cx + 4, suelo - 15, cx + 7, suelo - 10, c_K.caballo); c_rr(R, cx + 6, suelo - 14, cx + 9, suelo - 12, c_K.caballo); pset(cx + 9, suelo - 12, c_K.caballoS); pset(cx + 6, suelo - 14, c_K.sombra); linea(cx + 3, suelo - 15, cx + 4, suelo - 10, c_K.caballoS);
  for (const [lx, f] of [[cx - 5, pas], [cx - 3, 1 - pas], [cx + 2, 1 - pas], [cx + 4, pas]]) linea(lx, suelo - 6, lx + (f ? 1 : -1), suelo, c_K.caballoS);
  linea(cx - 6, suelo - 10, cx - 8, suelo - 5 + Math.round(Math.sin(t * 3)), c_K.caballoS);
  // el carretero
  c_rr(R, x + 2, suelo - 17, x + 5, suelo - 10, c_ROPA.b); c_rr(R, x + 2, suelo - 20, x + 4, suelo - 18, c_K.piel); c_rr(R, x + 1, suelo - 21, x + 5, suelo - 21, c_K.sombra); linea(x + 5, suelo - 15, cx + 6, suelo - 13, c_K.sombra);
}

function c_wallStreet(R, t, o) {
  const anyo = o.anyo ?? 1765, en89 = anyo >= 1789, luz = o.luz || 'dia', multi = c_lim(o.multitud ?? 0), noche = luz === 'noche', tarde = luz === 'tarde';
  const b = c_capa(R, 'ws' + (en89 ? 89 : 65) + luz, () => {
    const m = c_wallFijo(R, en89); c_META.set(R, { ...(c_META.get(R) || {}), ['ws' + en89]: m });
    if (noche) c_tinte(R, 0, 0, 319, 179, 0.5, hex('#101838')); else if (tarde) c_tinte(R, 0, 0, 319, 179, 0.16, hex('#e07a40'));
  });
  const meta = c_META.get(R)['ws' + en89];
  c_cielo(R, t, 112, { luz, sol: noche ? [206, 24, 6] : tarde ? [212, 62, 10] : [206, 22, 8], nAves: 4 });
  c_pegar(R, b);
  // el humo de las chimeneas
  for (const [hx, hy, k] of [[11, 52, 1], [33, 64, 2], [79, 62, 3], [264, 66, 4]]) c_humo(R, hx, hy, t, k, noche ? hex('#4a4e66') : undefined, hx > 200 ? -1 : 1);
  // las banderas sobre las alas (1789) o la británica en el asta del tejado (1765), y la muestra de la tienda que se mece
  if (en89) for (const [fx, d] of [[90, -1], [230, 1]]) { R.rect(fx, 22, fx, 52, c_K.hierro); R.pset(fx, 21, C.oro); c_bandera(R, fx + d, 23, 20, 13, t + fx, 'barras', d); }
  else { R.rect(98, 18, 98, 46, c_K.hierro); R.pset(98, 17, C.oro); c_bandera(R, 99, 19, 20, 12, t, 'britanica', 1); }
  { const a = Math.sin(t * 1.6) * 1.2, sx = 63 + Math.round(a); R.linea(60, 112, sx - 3, 115, c_K.hierro); R.linea(66, 112, sx + 3, 115, c_K.hierro); R.rect(sx - 5, 115, sx + 5, 124, c_K.tablaD); R.rect(sx - 4, 116, sx + 4, 123, hex('#2a4a3a'));
    R.rect(sx - 2, 117, sx + 2, 122, C.oro); R.rect(sx - 1, 118, sx + 1, 121, c_K.peltreL); R.rect(sx + 3, 118, sx + 3, 120, C.oro); R.pset(sx - 4, 116, hex('#4a6a5a')); }
  // las ventanas encendidas al anochecer y la gente asomada (más en 1789)
  meta.ventanas.forEach(([vx, vy, vw, vh], i) => {
    if ((noche || tarde) && h(i, 1, 91) < (noche ? 0.6 : 0.35)) { const fl = Math.sin(t * 3 + i) > 0.9 ? 0.15 : 0; for (let j = vy + 1; j < vy + vh - 1; j++) for (let x = vx + 1; x < vx + vw - 1; x++) { const p = R.pget(x, j); if (p !== c_K.marco && p !== c_K.marcoS) R.pset(x, j, c_mezcla(hex('#f8c870'), hex('#e89040'), (j - vy) / vh + fl)); } }
    if (en89 && multi > 0.3 && h(i, 2, 91) < 0.45 && vw <= 9) { const cy = vy + (vh >> 1) + 1, cx = vx + (vw >> 1), up = Math.sin(t * 4 + i) > 0.2;
      R.rect(cx - 1, cy - 3, cx + 1, cy - 1, c_PIELES[i % 4]); R.rect(cx - 2, cy - 4, cx + 2, cy - 4, c_K.sombra); R.rect(cx - 2, cy, cx + 2, cy + 2, c_ROPAS[i % 9]); if (up) { R.pset(cx + 2, cy - 2, c_ROPAS[i % 9]); R.pset(cx + 3, cy - 3, c_PIELES[i % 4]); } }
  });
  // las linternas de los faroles
  for (const [fx, fb, fa] of meta.faroles) c_farol(R, fx, fb, fa, t + fx, noche || tarde);
  // el carro que cruza al fondo
  if (o.carro ?? multi < 0.4) { R.recorte([87, 0, 235, 179]); const L = 220, x = 250 - ((t * 14) % L); c_carro(R, Math.round(x), 146, t); R.recorte(null); }
  // la multitud delante del edificio, en tres filas, dejando libre el pasillo del arco central
  if (multi > 0) {
    const pasillo = o.pasillo !== false, filas = [[147, 6, 0.9], [151, 5, 1], [155, 6, 1]];
    filas.forEach(([fy, paso, _], f) => { for (let x = 30 + f * 3; x < 292; x += paso) { const k = x * 7 + f * 131; if (h(k, f, 92) > multi * 1.15) continue; if (pasillo && x > 146 && x < 174) continue;
      c_gente(R, x + Math.round(h(k, 4, 92) * 3), fy, t, k, { vitorea: en89 && multi > 0.5, espalda: true }); } });
    // gente en los tejados (1789)
    if (en89) for (let k = 0; k < Math.round(10 * multi); k++) { const x = [84, 92, 100, 108, 212, 220, 228, 236, 40, 70][k], y = k < 8 ? 52 : 59; c_gente(R, x, y, t, k + 300, { vitorea: true }); }
  }
  // las palomas de la calle (se van cuando hay mucha gente)
  if (multi < 0.6) for (let k = 0; k < 4; k++) c_paloma(R, 70 + k * 53 + (k % 2) * 9, 171 + (k % 2) * 4, t, k);
  return {
    suelo: 168, pies: [40, 280], hor: 112, anyo: en89 ? 1789 : 1765,
    balcon: en89 ? { suelo: 101, x0: 113, x1: 207, centro: [149, 171], lados: [[124, 140], [180, 196]] } : { suelo: 101, x0: 136, x1: 184, centro: [148, 172] },
    puerta: { x: 160, suelo: 140, arco: [150, 170] }, calle: [149, 179], multitud: [146, 156], farol: [[42, 122], [278, 122]], bomba: [262, 146],
  };
}

// la capa fija de la taberna (a la escala del chibi: el suelo de la pared del fondo en y = 129)
function c_tabernaFija(R) {
  const { rect, pset, linea, disco, poligono } = R, K = c_K.sombra;
  // el techo de tablas y la viga maestra con sus vetas
  for (let y = 0; y < 13; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 16 === 0 ? c_K.vigaS : y % 4 === 3 && (x + y) % 11 < 6 ? c_K.vigaS : h(x >> 1, y, 101) < 0.12 ? c_K.vigaL : c_K.viga);
  for (let y = 12; y < 20; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 12 ? c_K.vigaL : y === 19 ? c_K.vigaS : (Math.sin(x * 0.07 + y * 1.7 + Math.sin(x * 0.013) * 4) > 0.75 ? c_K.vigaS : h(x >> 2, y, 102) < 0.1 ? c_K.vigaL : c_mezcla(c_K.viga, c_K.vigaL, 0.3)));
  rect(0, 20, 319, 21, c_mezcla(c_K.vigaS, K, 0.4));
  // la pared de yeso con manchas, grietas, el humo de años arriba y el entramado de madera
  for (let y = 22; y < 116; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 2, y >> 2, 103), q2 = h(x, y, 104); pset(x, y, q2 < 0.04 ? c_K.yesoS : q < 0.15 ? c_mezcla(c_K.yeso, c_K.yesoS, 0.5) : q > 0.85 ? c_K.yesoL : c_K.yeso); }
  for (let y = 22; y < 40; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) > (y - 22) / 18) pset(x, y, c_mezcla(R.pget(x, y), c_K.vigaS, 0.18));
  linea(250, 64, 256, 74, c_K.yesoS); linea(256, 74, 254, 82, c_K.yesoS); linea(30, 100, 36, 92, c_K.yesoS); linea(206, 30, 203, 38, c_K.yesoS);
  for (const px of [94, 212]) { rect(px, 20, px + 6, 114, c_K.viga); rect(px, 20, px, 114, c_K.vigaL); rect(px + 6, 20, px + 6, 114, c_K.vigaS); for (let y = 24; y < 114; y += 9) pset(px + 2 + (y % 3), y, c_K.vigaS); }
  // el zócalo de tablas verticales con el pasamanos
  for (let y = 115; y < 130; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 9 === 0 ? c_K.tablaD : x % 9 === 1 ? c_K.tablaL : h(x, y >> 2, 105) < 0.08 ? c_K.tablaS : c_K.tabla);
  rect(0, 112, 319, 115, c_K.tablaL); rect(0, 115, 319, 115, c_K.tablaD); rect(0, 128, 319, 130, c_K.tablaD);
  // los ganchos del poste con un tricornio y una casaca colgados
  { const px = 212; rect(px - 2, 56, px - 1, 57, c_K.hierro); rect(px + 7, 56, px + 8, 57, c_K.hierro);
    poligono([[px - 8, 58], [px + 4, 58], [px + 2, 78], [px - 7, 78]], c_ROPA.b); linea(px - 8, 58, px - 7, 78, c_mezcla(c_ROPA.b, K, 0.4)); linea(px - 2, 60, px - 2, 76, c_mezcla(c_ROPA.b, K, 0.4)); for (let y = 62; y < 76; y += 4) pset(px, y, C.oro);
    rect(px + 4, 52, px + 13, 54, c_K.sombra); rect(px + 6, 50, px + 11, 52, c_K.sombra); pset(px + 8, 49, c_mezcla(K, C.blanco, 0.2)); }
  // el suelo de tablones en perspectiva, con algo de serrín
  for (let y = 130; y < 180; y++) { const d = y - 64; for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 4.4, tab = Math.floor(u), fr = u - tab, q = h(tab, Math.floor((y - 130) / (8 + (tab & 3))), 106);
    let c = fr < 0.06 ? c_K.tablaD : q < 0.3 ? c_K.tablaS : q > 0.8 ? c_K.tablaL : c_K.tabla; if (Math.sin(u * 14 + y * 0.25) > 0.93) c = c_mezcla(c, c_K.tablaD, 0.4);
    if (h(x, y, 107) < 0.008) c = c_K.pergS; if (Math.floor((y - 130) / (8 + (tab & 3))) !== Math.floor((y - 129) / (8 + (tab & 3))) && fr > 0.06) c = c_K.tablaD; pset(x, y, c); } }
  for (let y = 130; y < 136; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) > (y - 130) / 6) pset(x, y, c_mezcla(R.pget(x, y), K, 0.3));
  // la chimenea de piedra: jambas, dintel, repisa con peltre, el hueco con el fondo de ladrillo ennegrecido y el hogar
  c_sillar(R, 6, 64, 82, 130, { bw: 10, bh: 6, k: 108 }); for (let y = 64; y < 130; y++) for (let x = 6; x <= 82; x++) R.pset(x, y, c_mezcla(R.pget(x, y), hex('#8c8478'), 0.5));
  rect(2, 60, 86, 65, c_K.tabla); rect(2, 60, 86, 60, c_K.tablaL); rect(2, 65, 86, 65, c_K.tablaD); c_tinte(R, 6, 66, 82, 68, 0.4);
  for (let y = 80; y < 130; y++) for (let x = 20; x <= 68; x++) { const dy = y - 94, dd = dy < 0 ? Math.hypot(x - 44, dy * 2) : Math.abs(x - 44); if (dd > 24.5) continue;
    pset(x, y, dd > 23.5 ? K : y > 116 ? c_K.hollin : (y % 3 === 0 || (x + (Math.floor(y / 3) % 2) * 3) % 6 === 0) ? c_K.hollin : c_mezcla(C.ladrilloS, c_K.hollin, 0.3 + (130 - y) / 120)); }
  rect(0, 130, 88, 136, c_K.piedraGS); for (let x = 0; x < 88; x += 11) rect(x, 130, x, 136, K); rect(0, 130, 88, 130, c_K.piedraGL); for (let x = 3; x < 88; x += 7) pset(x, 133, c_K.piedraG);
  // los morillos y el pescante del perol
  for (const mx of [28, 58]) { rect(mx, 118, mx + 1, 128, c_K.hierro); rect(mx - 2, 127, mx + 3, 128, c_K.hierro); disco(mx + 0.5, 117, 1.5, c_K.hierroL); }
  linea(64, 88, 64, 104, c_K.hierro); linea(64, 90, 50, 90, c_K.hierro);
  // en la repisa: platos de peltre de canto, jarras, un candelero y un reloj pequeño
  for (const [px, r] of [[16, 6], [72, 6]]) { disco(px, 53, r, c_K.peltreS); disco(px, 53, r - 1, c_K.peltre); disco(px - 1, 52, r - 3, c_K.peltreL); disco(px, 53, 1, c_K.peltreS); }
  for (const jx of [28, 36, 58]) { rect(jx, 52, jx + 5, 59, c_K.peltreS); rect(jx, 52, jx + 4, 59, c_K.peltre); rect(jx + 1, 53, jx + 1, 58, c_K.peltreL); rect(jx + 5, 54, jx + 6, 57, c_K.peltreS); rect(jx - 1, 51, jx + 5, 51, c_K.peltreL); }
  rect(46, 48, 52, 59, c_K.tablaD); rect(47, 49, 51, 58, c_K.tabla); disco(49, 52, 2, c_K.marco); pset(49, 51, K); pset(50, 52, K); rect(47, 59, 51, 59, C.oroS);
  rect(66, 55, 68, 59, C.oroS); rect(65, 59, 69, 59, C.oro); rect(67, 50, 67, 54, c_K.marco);
  // el cuadro del barco encima (el mar se pinta en cada fotograma)
  rect(16, 28, 72, 46, C.oroS); rect(16, 28, 72, 28, C.oro); rect(17, 29, 71, 45, c_K.tablaD); c_tinte(R, 16, 47, 72, 48, 0.25);
  // el tablón de los papeles clavados (barras, sin letras) entre las ventanas
  rect(150, 50, 164, 84, c_K.tablaS); rect(151, 51, 163, 83, c_K.tabla);
  for (const [px, py, pw, ph2, gira] of [[152, 53, 10, 13, 0], [153, 68, 9, 13, 1]]) { rect(px, py, px + pw, py + ph2, c_K.perg); rect(px + pw, py + 1, px + pw, py + ph2, c_K.pergS);
    for (let j = py + 2; j < py + ph2 - 1; j += 2) rect(px + 1, j, px + pw - 2 - ((j + gira) % 3), j, c_K.pergS); pset(px + (pw >> 1), py, C.rojo); }
  rect(155, 56, 159, 59, c_K.sombra); R.disco(158, 75, 2, C.rojo);
  // las dos ventanas a la calle: hueco vacío (la calle se pinta en cada fotograma), parteluces y alféizar hondo
  for (const wx of [110, 168]) {
    rect(wx - 3, 41, wx + 39, 99, c_K.tablaD); rect(wx - 2, 42, wx + 38, 98, c_K.tablaS);
    for (let y = 44; y <= 96; y++) for (let x = wx; x <= wx + 36; x++) R.buf[y * 320 + x] = c_VACIO;
    for (let x = wx; x <= wx + 36; x += 9) rect(x, 44, x, 96, c_K.marcoS); for (let y = 44; y <= 96; y += 9) rect(wx, y, wx + 36, y, c_K.marcoS); rect(wx, 70, wx + 36, 71, c_K.tablaS);
    for (const [gx, gy] of [[wx + 3, 47], [wx + 22, 75]]) { pset(gx, gy, C.blanco); pset(gx + 1, gy + 1, c_K.vidrioR); }
    rect(wx - 4, 98, wx + 40, 102, c_K.tablaL); rect(wx - 4, 102, wx + 40, 103, c_K.tablaD); c_tinte(R, wx - 4, 104, wx + 40, 106, 0.3);
    rect(wx + 30, 95, wx + 34, 97, c_K.peltre); rect(wx + 31, 89, wx + 33, 95, c_K.marco); rect(wx + 4, 91, wx + 9, 97, hex('#6a8a4a')); rect(wx + 5, 92, wx + 5, 96, hex('#9aba6a')); rect(wx + 5, 89, wx + 8, 91, hex('#4a6a3a'));
  }
  // el banco corrido bajo las ventanas, con un periódico doblado (barras) y una pipa
  rect(100, 118, 210, 121, c_K.tabla); rect(100, 118, 210, 118, c_K.tablaL); rect(100, 121, 210, 121, c_K.tablaD); for (const bx of [104, 154, 204]) rect(bx, 122, bx + 3, 129, c_K.tablaS);
  rect(124, 115, 140, 117, c_K.perg); for (let x = 125; x < 139; x += 3) pset(x, 116, c_K.pergS); rect(124, 117, 140, 117, c_K.pergS); linea(180, 117, 188, 115, c_K.marco); rect(178, 116, 180, 117, c_K.marco);
  // el mostrador: estantes con botellas y jarras, barricas tumbadas en su soporte, el frente de cuarterones
  for (const sy of [38, 56]) { rect(222, sy, 274, sy + 2, c_K.tabla); rect(222, sy, 274, sy, c_K.tablaL); rect(222, sy + 2, 274, sy + 2, c_K.tablaD); c_tinte(R, 222, sy + 3, 274, sy + 4, 0.3); }
  for (let k = 0; k < 8; k++) { const bx = 224 + k * 6, tipo = k % 3, bh = 10 - (k % 2) * 2, by = 37 - bh;
    if (tipo === 0) { rect(bx, by + 3, bx + 3, 37, hex('#2a5a3a')); rect(bx + 1, by, bx + 2, by + 3, hex('#2a5a3a')); pset(bx + 1, by + 4, hex('#6aa07a')); rect(bx + 1, by, bx + 2, by, C.oroS); }
    else if (tipo === 1) { rect(bx, by + 2, bx + 4, 37, c_K.peltreS); rect(bx, by + 2, bx + 3, 37, c_K.peltre); pset(bx + 1, by + 3, c_K.peltreL); }
    else { rect(bx, by + 4, bx + 3, 37, hex('#6a3a1a')); rect(bx + 1, by + 1, bx + 2, by + 4, hex('#6a3a1a')); pset(bx + 1, by + 5, hex('#a86a3a')); } }
  for (let k = 0; k < 7; k++) { const jx = 225 + k * 7; rect(jx, 47, jx + 4, 55, c_K.peltreS); rect(jx, 47, jx + 3, 55, c_K.peltre); rect(jx + 1, 48, jx + 1, 54, c_K.peltreL); rect(jx + 4, 49, jx + 5, 52, c_K.peltreS); }
  rect(220, 64, 300, 66, c_K.tablaD); rect(222, 66, 226, 104, c_K.tablaD); rect(294, 66, 298, 104, c_K.tablaD); rect(220, 104, 300, 106, c_K.tablaD);
  for (const [bx, by] of [[240, 77], [266, 77], [253, 93]]) { disco(bx, by, 11, c_K.tablaD); disco(bx, by, 10, (x, y) => (Math.floor(Math.hypot(x - bx, y - by)) % 3 === 0 ? c_K.tablaS : c_K.tabla)); R.anillo(bx, by, 10, c_K.hierro); R.anillo(bx, by, 6, c_K.hierroL); disco(bx, by, 2, c_K.tablaD); rect(bx - 1, by + 2, bx + 1, by + 5, c_K.peltre); pset(bx, by + 6, c_K.peltreL); }
  for (let y = 120; y < 143; y++) for (let x = 226; x < 320; x++) { const px = (x - 226) % 24, py = (y - 124) % 18; let c = c_K.tabla; if (y >= 123 && y < 141 && px > 2 && px < 21 && py > 1 && py < 15) c = px === 3 || py === 2 ? c_K.tablaD : px === 20 || py === 14 ? c_K.tablaL : c_mezcla(c_K.tabla, c_K.tablaS, 0.3); if (h(x >> 1, y, 109) < 0.06) c = c_K.tablaS; pset(x, y, c); }
  rect(222, 116, 319, 120, c_K.tablaL); rect(222, 116, 319, 116, c_mezcla(c_K.tablaL, C.blanco, 0.3)); rect(222, 120, 319, 121, c_K.tablaD); rect(226, 120, 226, 142, c_K.tablaD); c_tinte(R, 226, 139, 319, 142, 0.3); c_tinte(R, 222, 143, 319, 145, 0.35);
  // en el mostrador: jarras, el cuenco y la gradilla de las pipas de barro
  for (const jx of [236, 248]) { rect(jx, 108, jx + 5, 115, c_K.peltreS); rect(jx, 108, jx + 4, 115, c_K.peltre); rect(jx + 1, 109, jx + 1, 114, c_K.peltreL); rect(jx + 5, 110, jx + 6, 113, c_K.peltreS); rect(jx, 107, jx + 4, 107, c_K.marco); }
  rect(300, 110, 316, 115, c_K.tablaS); for (let k = 0; k < 4; k++) linea(302 + k * 4, 109, 306 + k * 3, 100, c_K.marco);
  poligono([[262, 111], [276, 111], [273, 115], [265, 115]], hex('#c8a060')); rect(263, 110, 275, 110, hex('#e0c080'));
}

// la mesa de los naipes, por delante (tablero visto desde arriba, canto, patas torneadas y dos taburetes), y el frente
// del mostrador vuelto a pegar por encima de quien esté detrás de él
function c_mesaNaipes(R, t) {
  const { rect, poligono } = R, K = c_K.sombra, b = c_capa(R, 'taberna', () => c_tabernaFija(R)), B = R.buf;
  for (let y = 116; y < 146; y++) for (let x = 222; x < 320; x++) { const c = b[y * 320 + x]; if (c !== c_VACIO) B[y * 320 + x] = c; }
  for (const [sx, sy] of [[96, 156], [216, 156]]) { rect(sx - 8, sy, sx + 8, sy + 3, c_K.tablaD); rect(sx - 8, sy, sx + 8, sy, c_K.tablaL); for (const lx of [sx - 6, sx + 5]) rect(lx, sy + 4, lx + 1, sy + 18, c_K.tablaS); }
  poligono([[114, 133], [206, 133], [214, 145], [106, 145]], K);
  poligono([[115, 134], [205, 134], [212, 144], [108, 144]], (x, y) => { const q = h(x >> 3, y, 111); return Math.sin(x * 0.3 + y * 2.1) > 0.85 ? c_K.tablaS : q > 0.85 ? c_K.tablaL : y < 136 ? c_mezcla(c_K.tabla, c_K.tablaS, 0.3) : c_K.tabla; });
  R.linea(108, 144, 212, 144, c_K.tablaL); rect(106, 145, 214, 149, c_K.tablaS); rect(106, 145, 214, 145, c_K.tablaD); rect(106, 149, 214, 149, c_K.tablaD);
  for (const lx of [110, 207]) { rect(lx, 150, lx + 3, 172, c_K.tablaD); rect(lx + 1, 150, lx + 2, 172, c_K.tablaS); for (const by of [154, 162]) rect(lx - 1, by, lx + 4, by + 1, c_K.tabla); rect(lx - 1, 171, lx + 4, 172, c_K.tablaD); }
  c_tinte(R, 104, 173, 216, 175, 0.35);
  // en el tablero: una jarra, una vela encendida y el mazo de naipes por estrenar
  rect(196, 132, 201, 139, c_K.peltreS); rect(196, 132, 200, 139, c_K.peltre); rect(197, 133, 197, 138, c_K.peltreL);
  rect(120, 136, 124, 138, c_K.peltre); rect(121, 130, 123, 136, c_K.marco); const fl = Math.sin(t * 11) > 0; R.pset(122, 128 + (fl ? 1 : 0), c_K.fuegoL); R.pset(122, 129, c_K.fuego); R.pset(fl ? 121 : 123, 129, c_K.fuego);
  rect(128, 138, 133, 141, c_K.marco); rect(128, 141, 133, 141, c_K.marcoS); R.pset(130, 139, C.rojo);
}

function c_taberna(R, t, o) {
  const b = c_capa(R, 'taberna', () => c_tabernaFija(R)), { pset, rect, disco, linea } = R;
  // la calle de enfrente por las ventanas: cielo, casas de ladrillo, gente y un carro que pasan, recortados al hueco
  for (const wx of [110, 168]) {
    R.recorte([wx, 44, wx + 36, 96]);
    for (let y = 44; y < 58; y++) for (let x = wx; x <= wx + 36; x++) pset(x, y, c_um(x, y) > (y - 44) / 14 ? C.cielo2 : C.cielo3);
    c_nube(R, wx + ((t * 2 + wx) % 60) - 10, 50, 10, c_CIELOS.dia.nube);
    for (let y = 56; y < 86; y++) for (let x = wx; x <= wx + 36; x++) { const xx = x + 3, c = (y % 3 === 2 || (xx + (Math.floor(y / 3) % 2) * 3) % 6 === 5) ? c_K.mortero : h(xx >> 1, y, 112) < 0.2 ? C.ladrilloS : C.ladrillo; pset(x, y, c); }
    for (let k = 0; k < 3; k++) { const vx = wx + 3 + k * 13; for (let y = 60; y < 72; y++) for (let x = vx; x < vx + 6; x++) pset(x, y, x === vx || y === 65 ? c_K.marco : c_K.vidrio); }
    for (let y = 86; y < 97; y++) for (let x = wx; x <= wx + 36; x++) pset(x, y, y < 89 ? c_K.losa : (x + y) % 5 === 0 ? c_K.adoquinS : c_K.adoquin);
    for (let k = 0; k < 3; k++) { const px = Math.round(((t * (9 + k * 4) + k * 37) % 150) - 15 + 100); c_gente(R, px, 94, t * 1.5, k * 5 + 1, {}); }
    { const cx = Math.round(260 - ((t * 11) % 220)); c_carro(R, cx, 97, t); }
    R.recorte(null);
  }
  c_pegar(R, b);
  // el fuego: troncos, llamas que bailan y brasas que saltan; el perol que humea
  rect(26, 122, 62, 126, c_K.tablaD); rect(30, 119, 58, 122, c_K.tablaS); pset(34, 120, c_K.brasa); pset(50, 121, c_K.brasa);
  for (let k = 0; k < 9; k++) { const fx = 30 + k * 3.3, alto = 7 + Math.abs(Math.sin(t * 6 + k * 1.7) * 8) + (k % 3 === 1 ? 4 : 0);
    for (let j = 0; j < alto; j++) { const w = Math.max(0, 2 - j / alto * 2.4), x = Math.round(fx + Math.sin(t * 9 + j * 0.5 + k) * (j / alto) * 2); const c = j < alto * 0.35 ? c_K.fuegoL : j < alto * 0.7 ? c_K.fuego : c_K.brasa; for (let i = -Math.round(w); i <= Math.round(w); i++) pset(x + i, 119 - j, c); } }
  for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k * 0.27) % 1; pset(Math.round(36 + k * 6 + Math.sin(t * 3 + k) * 3), Math.round(112 - u * 24), u < 0.6 ? c_K.fuegoL : c_K.brasa); }
  for (let y = 96; y < 136; y++) for (let x = 6; x < 96; x++) { const d = Math.hypot(x - 44, (y - 118) * 1.4); if (d < 44 && c_um(x, y) > 0.5 + d / 70 + Math.sin(t * 8) * 0.03 && (x < 20 || x > 68 || y > 128)) pset(x, y, c_mezcla(R.pget(x, y), hex('#ffb060'), 0.22)); }
  linea(52, 90, 52, 104, c_K.hierro);
  disco(52, 109, 6, c_K.hierro); disco(52, 108, 5, hex('#3a3a40')); rect(46, 103, 58, 104, c_K.hierroL); pset(49, 106, c_K.hierroL); linea(58, 106, 61, 104, c_K.hierro);
  c_humo(R, 60, 102, t * 1.4, 7, hex('#e8e4e0'));
  // el gato que duerme junto al hogar: respira, mueve la cola y una oreja
  { const cx = 80, cy = 129, r = Math.sin(t * 2.2) > 0 ? 1 : 0; R.poligono([[cx - 7, cy], [cx - 6, cy - 4 - r], [cx + 4, cy - 5 - r], [cx + 7, cy]], c_K.gato); rect(cx - 6, cy - 1, cx + 6, cy, c_K.gatoS);
    for (let i = -4; i < 4; i += 3) pset(cx + i, cy - 3 - r, c_K.gatoS); rect(cx + 4, cy - 6, cx + 8, cy - 2, c_K.gato); pset(cx + 5, cy - 7, c_K.gato); pset(cx + 7, cy - 7 + (Math.sin(t * 0.9) > 0.92 ? 1 : 0), c_K.gato); pset(cx + 6, cy - 4, c_K.gatoS); pset(cx + 8, cy - 4, c_K.gatoS);
    const cola = Math.round(Math.sin(t * 1.4) * 2); linea(cx - 7, cy, cx - 11, cy - 1 + cola, c_K.gato); pset(cx - 11, cy - 2 + cola, c_K.gatoS); }
  // el cuadro del barco: el cielo, el mar que se mueve y el barco que cabecea
  for (let y = 30; y < 45; y++) for (let x = 18; x < 71; x++) pset(x, y, y < 38 ? (c_um(x, y) > (y - 30) / 8 ? C.cielo2 : C.cielo3) : (x + Math.floor(t * 3) + y) % 5 === 0 ? c_K.aguaL : c_K.agua);
  { const by = 37 + Math.round(Math.sin(t * 1.5)); rect(36, by, 52, by + 2, c_K.casco); rect(38, by + 3, 50, by + 3, c_K.cascoS); for (const [mx, mh] of [[40, 8], [45, 10], [49, 7]]) { rect(mx, by - mh, mx, by - 1, c_K.cascoS); rect(mx - 2, by - mh + 1, mx + 2, by - mh + 3, c_K.vela); rect(mx - 2, by - mh + 5, mx + 2, by - mh + 6, c_K.vela); } }
  // las velas del alféizar y la del candelero, que tiemblan
  for (const [vx, vy] of [[142, 88], [200, 88], [67, 49]]) { const fl = Math.sin(t * 12 + vx) > 0.2; pset(vx, vy - (fl ? 1 : 0), c_K.fuegoL); pset(vx, vy, c_K.fuego); }
  // el farol colgado de la viga, que se mece
  { const a = Math.sin(t * 0.9) * 2, fx = 160 + Math.round(a); linea(160, 20, fx, 30, c_K.hierro); rect(fx - 3, 30, fx + 3, 31, c_K.hierro); rect(fx - 3, 32, fx + 3, 38, hex('#f0c070')); rect(fx - 3, 32, fx - 3, 38, c_K.hierro); rect(fx + 3, 32, fx + 3, 38, c_K.hierro); rect(fx, 32, fx, 38, c_K.hierro); rect(fx - 4, 39, fx + 4, 40, c_K.hierro);
    pset(fx - 1, 35 + (Math.sin(t * 9) > 0 ? 1 : 0), c_K.fuegoL); }
  // los manojos de hierbas secas colgados, que se mecen un poco
  for (const [hx, k] of [[70, 0], [80, 1], [250, 2]]) { const a = Math.round(Math.sin(t * 1.1 + k) * 1); linea(hx, 20, hx + a, 26, c_K.tablaD); for (let j = 0; j < 8; j++) for (let i = -2; i <= 2; i++) if (Math.abs(i) <= 1 + j / 4 && h(i, j, k + 120) > 0.25) pset(hx + a + i, 26 + j, j % 2 ? hex('#6a7a3a') : hex('#8a9a4a')); }
  return { suelo: 172, pies: [20, 300], mesa: { x0: 108, x1: 212, tablero: 139, detras: 140, delante: 172, taburetes: [96, 216] }, mostrador: { x0: 226, x1: 319, alto: 116, detras: 126 }, chimenea: [6, 82], banco: [100, 210, 118], ventanas: [[110, 44, 146, 96], [168, 44, 204, 96]], fuego: [44, 118] };
}

function c_bateriaFija(R) {
  const { rect, pset, linea, disco, poligono } = R, K = c_K.sombra;
  // la tierra lejana: Staten Island a la izquierda, la isla del Gobernador en medio y Brooklyn a la derecha con su molino
  for (let x = 0; x < 320; x++) {
    const si = x < 130 ? 80 + Math.round(Math.sin(x * 0.05) * 3 + (x / 130) ** 2 * 10) : 999, bk = x > 214 ? 92 - Math.round(Math.min(1, (x - 214) / 40) * 14 + Math.sin(x * 0.08) * 1.5) : 999, gi = x > 138 && x < 186 ? 89 - Math.round(Math.sin((x - 138) / 48 * Math.PI) * 3) : 999;
    const y0 = Math.min(si, bk, gi);
    for (let y = y0; y < 92; y++) pset(x, y, y === y0 ? c_K.lejosL : (x + y * 3) % 7 === 0 ? c_mezcla(c_K.lejosS, hex('#6a8a6a'), 0.3) : c_mezcla(c_K.lejos, hex('#7a9a7a'), 0.25 + (y - y0) * 0.02));
  }
  rect(156, 84, 168, 87, c_K.lejosS); rect(158, 82, 166, 84, c_K.lejosS); pset(162, 80, c_K.lejosS);
  for (let k = 0; k < 9; k++) { const hx = 230 + k * 9, hy = 80 + Math.round(Math.min(1, (hx - 214) / 40) * -2); rect(hx, hy, hx + 4, hy + 3, k % 2 ? c_K.lejosL : c_mezcla(C.ladrilloL, c_K.lejos, 0.55)); poligono([[hx - 1, hy], [hx + 2, hy - 2], [hx + 5, hy]], c_K.lejosS); }
  rect(300, 70, 302, 79, c_K.lejosS); poligono([[299, 70], [301, 66], [303, 70]], c_K.lejosS);
  // el parapeto de piedra de la Batería con sus troneras y la albardilla
  c_sillar(R, 0, 128, 319, 142, { bw: 16, bh: 5, k: 130 }); rect(0, 124, 319, 128, C.caliza); rect(0, 124, 319, 124, C.calizaL); rect(0, 128, 319, 128, C.calizaS);
  for (let x = 0; x < 320; x += 13) rect(x, 125, x, 127, C.calizaS);
  for (const tx of [34, 268]) { rect(tx - 7, 122, tx + 7, 130, K); rect(tx - 6, 122, tx + 6, 129, c_mezcla(c_K.agua, K, 0.4)); rect(tx - 8, 120, tx + 8, 122, C.calizaL); }
  c_tinte(R, 0, 141, 319, 143, 0.35);
  // los dos cañones viejos y callados en sus cureñas, mirando al mar
  for (const [cx, d] of [[34, 1], [268, -1]]) { rect(cx - 9, 128, cx + 9, 136, c_K.tablaS); rect(cx - 9, 128, cx + 9, 128, c_K.tabla); disco(cx - 6, 137, 3, c_K.tablaD); disco(cx + 6, 137, 3, c_K.tablaD); pset(cx - 6, 137, c_K.hierroL); pset(cx + 6, 137, c_K.hierroL);
    for (let i = -10; i <= 10; i++) { const r = 3 - (i + 10) / 20 * 1.2; for (let j = -Math.round(r); j <= Math.round(r); j++) pset(cx + i, 125 + j, j < 0 ? c_K.hierroL : c_K.hierro); } disco(cx, 125, 4, c_K.hierro); rect(cx - 2, 122, cx + 2, 122, c_K.hierroL); }
  // la explanada: hierba de otoño en matas (luz arriba, sombra abajo), hojas caídas en montones, el camino de grava con
  // rodadas y piedras de borde, y dos charcos con el cielo
  for (let y = 143; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y, 131), mancha = h(x >> 3, y >> 2, 138), borde = Math.abs(x - 150 - (y - 143) * 0.9) - (18 + (y - 143) * 0.9), camino = borde < 0;
    let c;
    if (camino) { c = q < 0.2 ? c_K.tierraES : q > 0.88 ? hex('#b8a484') : c_K.tierraE; const rx = Math.abs(Math.abs(x - 150 - (y - 143) * 0.9) - (8 + (y - 143) * 0.4)); if (rx < 1.2) c = c_K.tierraES; if (h(x, y, 139) < 0.06) c = hex('#c8b898'); }
    else { c = mancha < 0.3 ? (q < 0.4 ? c_K.hierbaS : c_K.hierba) : mancha > 0.75 ? (q < 0.3 ? c_K.hierba : hex('#a8a058')) : (q < 0.3 ? c_K.hierbaS : q > 0.75 ? c_K.hierbaL : c_K.hierba);
      const mata = (x * 7 + Math.floor(y / 4) * 13) % 23; if (mata < 3 && y % 4 === 0) { c = c_K.hierbaL; pset(x, y - 1, c_K.hierbaL); } else if (mata < 3 && y % 4 === 1) c = c_K.hierbaS;
      if (h(x >> 1, y >> 1, 132) < 0.05 + (mancha > 0.8 ? 0.1 : 0)) c = h(x, y, 133) < 0.5 ? c_K.hoja : c_K.hojaL; }
    if (borde > 0 && borde < 2.5 && (x + y * 3) % 7 < 4) c = (x + y) % 3 ? c_K.piedraG : c_K.piedraGL;
    pset(x, y, c); }
  for (const [px, py, pw] of [[90, 170, 16], [196, 176, 12]]) for (let y = py - 2; y <= py + 2; y++) for (let x = px - pw / 2; x <= px + pw / 2; x++) { const d = ((x - px) / (pw / 2)) ** 2 + ((y - py) / 2.4) ** 2; if (d <= 1) pset(Math.round(x), y, d > 0.7 ? c_K.tierraES : y < py ? C.cielo3 : (x + y) % 4 ? C.cielo2 : C.blanco); }
  // el muelle de madera del fondo, a la derecha, sobre pilotes, con un bote amarrado
  rect(214, 110, 319, 113, c_K.tabla); rect(214, 110, 319, 110, c_K.tablaL); for (let x = 216; x < 320; x += 4) pset(x, 111, c_K.tablaS); for (let x = 218; x < 320; x += 12) rect(x, 114, x + 1, 120, c_K.tablaD);
  rect(214, 114, 319, 114, c_K.tablaD); for (const bx of [226, 270]) { rect(bx - 1, 104, bx + 1, 110, c_K.tablaD); }
  rect(236, 118, 252, 120, c_K.casco); rect(238, 121, 250, 121, c_K.cascoS); linea(236, 118, 230, 113, c_K.marcoS);
  // el parapeto: manchas de humedad, musgo en las juntas de abajo
  for (let y = 129; y < 142; y++) for (let x = 0; x < 320; x++) { const m = h(x >> 2, y >> 1, 137); if (m < 0.12) pset(x, y, c_mezcla(R.pget(x, y), hex('#5a6a3a'), 0.35)); else if (y > 136 && m > 0.9) pset(x, y, c_mezcla(R.pget(x, y), hex('#4a5a2e'), 0.45)); }
  for (let x = 0; x < 320; x++) if (h(x >> 2, 1, 140) < 0.3) pset(x, 125, C.caliza);
  // el árbol pelado de la izquierda, con las últimas hojas
  { const tx = 14; rect(tx - 3, 70, tx + 3, 168, c_K.tablaD); rect(tx - 3, 70, tx - 2, 168, c_K.tablaS); for (let y = 72; y < 168; y += 5) pset(tx + 1, y, c_K.vigaS);
    for (const [ax, ay, bx, by] of [[tx, 110, 40, 82], [tx, 96, -8, 70], [tx, 84, 36, 50], [tx, 76, 4, 34], [30, 92, 50, 70], [24, 66, 44, 46], [tx, 120, 44, 106]]) { linea(ax, ay, bx, by, c_K.tablaD); linea(ax + 1, ay, bx + 1, by, c_K.tablaS); }
    for (let k = 0; k < 26; k++) { const lx = Math.round(4 + h(k, 1, 133) * 46), ly = Math.round(40 + h(k, 2, 133) * 70); pset(lx, ly, k % 3 ? c_K.hoja : c_K.hojaL); }
    rect(tx - 6, 166, tx + 6, 168, c_K.vigaS); }
  // el banco y el farol de la derecha
  rect(236, 150, 266, 152, c_K.tabla); rect(236, 150, 266, 150, c_K.tablaL); rect(236, 143, 266, 145, c_K.tabla); rect(236, 143, 266, 143, c_K.tablaL); for (const lx of [238, 263]) { rect(lx, 143, lx + 1, 160, c_K.hierro); }
  c_tinte(R, 234, 160, 270, 162, 0.3);
  // la peana del mástil: dos cuerpos de piedra con su moldura
  rect(180, 158, 212, 170, K); c_sillar(R, 181, 159, 211, 169, { bw: 8, bh: 5, k: 134 }); rect(184, 153, 208, 158, K); c_sillar(R, 185, 154, 207, 158, { bw: 6, bh: 5, k: 135 }); rect(184, 153, 208, 153, C.calizaL); rect(180, 158, 212, 158, C.calizaL);
  c_tinte(R, 212, 160, 220, 170, 0.35); c_tinte(R, 176, 170, 216, 172, 0.4);
  // el mástil alto: grueso, de madera oscura y brillante de grasa, con gotas, el remate con la polea y la driza
  for (let y = 20; y < 154; y++) { const g = 4; for (let i = 0; i < g; i++) pset(194 + i, y, i === 0 ? hex('#1a1210') : i === 1 ? (h(0, y >> 1, 136) < 0.5 ? hex('#a8845a') : hex('#c8a878')) : i === 2 ? hex('#5a3a22') : hex('#2a1a12')); }
  for (let k = 0; k < 9; k++) { const gy = 40 + Math.floor(h(k, 1, 137) * 108), gl = 2 + Math.floor(h(k, 2, 137) * 3); for (let j = 0; j < gl; j++) pset(197 + (k % 2), gy + j, hex('#7a6040')); pset(197 + (k % 2), gy + gl, hex('#e8d8a0')); }
  rect(192, 152, 199, 154, hex('#3a2818')); disco(195.5, 19, 3, c_K.sombra); disco(195.5, 19, 2, C.oro); pset(195, 18, C.oroL);
  rect(193, 22, 198, 23, c_K.hierro);
  for (let y = 24; y < 150; y++) pset(199 + (y > 140 ? 1 : 0), y, hex('#c8b890'));
  rect(199, 146, 201, 147, c_K.hierro);
}

// un barco británico de tres palos que navega hacia la izquierda: casco oscuro con la franja amarilla y portas, bauprés,
// jarcia, tres palos con gavias infladas por el viento (luz a barlovento, sombra a sotavento), gallardete y la enseña
// roja en popa; s: escala (1 ≈ 31 px de eslora)
function c_barco(R, x, y, s, t, k) {
  s *= 1.4; const { pset, linea } = R, L = 22 * s, yb = y + Math.sin(t * 1.4 + k) * s * 0.5;
  for (let i = -L / 2; i <= L / 2; i++) { const pr = (i + L / 2) / L, hh = Math.max(2, Math.round((3.2 + (pr > 0.75 ? (pr - 0.75) * 6 : 0)) * s * 0.8)), sube = pr < 0.12 ? (0.12 - pr) * 10 * s * 0.5 : 0;
    for (let j = 0; j < hh; j++) { const yy = Math.round(yb - hh + j + 1 - sube * (j < hh - 1 ? 1 : 0)); pset(Math.round(x + i), yy, j === 0 ? c_K.cascoS : j === 1 ? hex('#c8a040') : j === 2 && s > 1.2 && Math.round(i) % 3 === 0 ? c_K.sombra : j > hh - 2 ? c_K.cascoS : c_K.casco); } }
  linea(x - L / 2, yb - 2 * s, x - L / 2 - 5 * s, yb - 4.5 * s, c_K.cascoS);
  const palos = [[-0.28, 14], [0.02, 17], [0.3, 12]], tops = [];
  for (const [mx, alto] of palos) { const px = Math.round(x + mx * L), base = Math.round(yb - 2.4 * s), top = Math.round(base - alto * s); tops.push([px, top]);
    for (let yy = top; yy < base; yy++) pset(px, yy, c_K.cascoS);
    for (const f of [0.1, 0.4, 0.7]) { const vy = Math.round(top + f * alto * s), vh = Math.max(2, Math.round(alto * s * 0.22)), vw = Math.max(2, Math.round((2.4 + f * 1.6) * s * 0.7));
      linea(px - vw - 1, vy - 1, px + vw + 1, vy - 1, c_K.cascoS);
      for (let j = 0; j < vh; j++) { const panza = j > 0 && j < vh - 1 ? -1 : 0; for (let i = -vw; i <= vw; i++) pset(px + i + panza, vy + j, i > vw * 0.35 ? c_K.velaS : j === 0 ? C.blanco : j === vh - 1 ? c_mezcla(c_K.vela, c_K.velaS, 0.5) : c_K.vela); } }
    const ond = Math.floor(t * 4 + k + mx * 3) % 2; for (let i = 1; i <= Math.max(2, Math.round(3 * s)); i++) pset(px + i, top - 1 + (i + ond) % 2, C.rojoBandera); }
  if (s > 0.9) { linea(tops[0][0], tops[0][1], x - L / 2 - 4 * s, yb - 4 * s, c_mezcla(c_K.cascoS, c_K.agua, 0.4)); linea(tops[2][0], tops[2][1], x + L / 2, yb - 3 * s, c_mezcla(c_K.cascoS, c_K.agua, 0.4)); }
  { const ex = Math.round(x + L / 2 + 1), ey = Math.round(yb - 4 * s), ew = Math.max(2, Math.round(2.4 * s)), eh = Math.max(1, Math.round(1.6 * s)); for (let j = 0; j < eh; j++) for (let i = 0; i < ew; i++) pset(ex + i, ey + j + (i > ew / 2 && Math.sin(t * 5 + k) > 0 ? 1 : 0), i < ew / 2 && j < eh / 2 ? c_K.marco : C.rojoBandera); }
  if (s > 0.7) for (let i = -L / 2; i <= L / 2; i += 2) pset(Math.round(x + i + (t * 2 % 2)), Math.round(yb + 1), c_K.aguaB);
}

function c_bateria(R, t, o) {
  const luz = o.luz || 'dia', salen = c_lim(o.salen ?? 0), multi = c_lim(o.multitud ?? 0), band = o.bandera || 'britanica', alt = c_lim(o.altura ?? 1);
  const b = c_capa(R, 'bateria' + luz, () => { c_bateriaFija(R); if (luz === 'tarde') c_tinte(R, 0, 0, 319, 179, 0.16, hex('#e07a40')); });
  c_cielo(R, t, 92, { luz, sol: luz === 'tarde' ? [120, 62, 9] : [110, 30, 8], nAves: 5, nubes: 1 });
  // el agua del puerto: bandas tramadas, crestas que corren, destellos y el reflejo del sol
  const B = R.buf;
  for (let y = 88; y < 128; y++) { const f = (y - 88) / 40, per = 6 + Math.round(f * 14);
    for (let x = 0; x < 320; x++) { const v = f * 2.2 + (h(x >> 3, y, 141) - 0.5) * 0.4; let c = v > 1.4 + c_um(x, y) * 0.6 ? c_K.aguaS : v > 0.5 + c_um(x, y) * 0.6 ? c_K.agua : c_mezcla(c_K.agua, c_K.aguaL, 0.35);
      const ola = (x + Math.floor(t * (6 + f * 10)) + Math.floor(h(0, y, 142) * 40)) % per; if (ola < 1 + f * 2 && (y + Math.floor(x / per)) % 3 === 0) c = c_K.aguaL;
      if (Math.abs(x - 110) < 8 + f * 18 && y % 2 === 0 && (x * 3 + Math.floor(t * 4 + h(0, y, 143) * 9) * 5) % 11 < 2) c = c_K.aguaB;
      B[y * 320 + x] = c; } }
  // los barcos británicos que se van (los de lejos, despacio, hacia el estrecho) y dos botes de remos
  const barcos = [[96, 115, 1.7, 0], [238, 104, 1.0, 1], [168, 101, 0.75, 2], [34, 98, 0.6, 3], [130, 95, 0.5, 4], [272, 95, 0.45, 5]];
  for (const [bx, by, s, k] of barcos.sort((a, b) => a[1] - b[1])) { const u = c_lim(salen * 1.3 - k * 0.06), x = bx + (78 - bx) * u * 0.9 - t * 0.6 * s, y = by + (92 - by) * u, ss = s * (1 - u * 0.75); if (u < 1) c_barco(R, x, y, ss, t, k); }
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * (5 + k * 3) + k * 150) % 360) - 20), y = 116 + k * 6, r = Math.sin(t * 4 + k) > 0;
    R.rect(x - 5, y, x + 5, y + 1, c_K.casco); R.rect(x - 4, y + 2, x + 4, y + 2, c_K.cascoS); R.rect(x - 1, y - 3, x + 1, y - 1, c_ROPAS[k + 1]); R.pset(x, y - 4, c_K.piel); R.linea(x - 2, y - 1, x - 6 + (r ? 1 : 0), y + 3, c_K.tablaS); R.linea(x + 2, y - 1, x + 6 - (r ? 1 : 0), y + 3, c_K.tablaS); R.pset(x - 7, y + 3, c_K.aguaB); }
  c_pegar(R, b);
  // el molino de Brooklyn, que gira
  { const mx = 301, my = 68, a = t * 1.2; for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2; R.linea(mx, my, mx + Math.cos(an) * 6, my + Math.sin(an) * 6, c_K.lejosS); } }
  // la gente que mira desde el muelle del fondo, a la derecha
  if (multi > 0) for (let k = 0; k < Math.round(24 * multi); k++) { const x = 218 + k * 4 + (k % 3), y = 109 + (k % 2); c_gente(R, x, y, t, k + 40, { mini: true, vitorea: band === 'barras' && alt > 0.9 }); }
  // la gaviota posada en el cañón de la derecha
  { const gx = 266, gy = 120, pic = Math.sin(t * 0.7) > 0.8; R.rect(gx - 2, gy - 2, gx + 2, gy, C.blanco); R.rect(gx + 1, gy - 1, gx + 2, gy, c_K.paredS); R.pset(gx - 2, gy - 3, C.blanco); R.pset(gx - 3, gy - 3 + (pic ? 1 : 0), C.amarillo); R.pset(gx - 1, gy - 3, c_K.sombra); R.pset(gx + 3, gy - 1, c_K.hierroL); R.pset(gx, gy + 1, C.amarillo); }
  // el brillo de la grasa que resbala por el mástil
  for (let k = 0; k < 2; k++) { const u = ((t * 0.25 + k * 0.5) % 1), gy = Math.round(30 + u * 120); R.pset(195, gy, hex('#fff4c8')); R.pset(195, gy + 1, hex('#e8d8a0')); R.pset(196, gy - 1, hex('#e8d8a0')); }
  // la bandera en el mástil
  const fy = Math.round(150 - (150 - 24) * alt) - (alt < 1 ? 0 : 0);
  if (band !== 'ninguna') { const w = 36, hh = 22; c_bandera(R, 200, Math.min(fy, 152 - hh), w, hh, t, band, 1); }
  // las hojas que caen del árbol
  for (let k = 0; k < 5; k++) { const u = (t * 0.12 + k * 0.2) % 1, x = Math.round(10 + k * 9 + u * 40 + Math.sin(t * 2 + k) * 4), y = Math.round(50 + u * 120); R.pset(x, y, k % 2 ? c_K.hoja : c_K.hojaL); R.pset(x + (Math.sin(t * 5 + k) > 0 ? 1 : -1), y, c_K.hoja); }
  return { suelo: 168, pies: [30, 290], hor: 92, mastil: { x: 194, x1: 197, cima: 22, pie: 153, peana: [180, 212, 158], driza: 199 }, bandera: { x: 200, y: Math.min(fy, 130), w: 36, h: 22 }, banco: [236, 266, 150], parapeto: 124, muelle: [214, 319, 110] };
}

// la capa fija del salón (por sala)
function c_salonFijo(R, sala) {
  const { rect, pset, linea, disco, poligono } = R, K = c_K.sombra, noche = sala === 'cena';
  // el techo de yeso con casetones suaves y la cornisa de dentículos
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 40 === 0 || y === 6) ? c_K.paredS : h(x >> 2, y, 151) < 0.12 ? c_mezcla(c_K.pared, c_K.paredS, 0.5) : c_K.pared);
  rect(0, 14, 319, 21, c_K.paredL); rect(0, 14, 319, 14, c_K.paredS); for (let x = 0; x < 320; x += 3) rect(x, 17, x + 1, 19, c_K.paredS); rect(0, 21, 319, 21, c_K.paredS); c_tinte(R, 0, 22, 319, 24, 0.25);
  // la pared: paneles con molduras entre pilastras acanaladas, el zócalo y el rodapié
  const pared = sala === 'tribunal' ? pal({ a: '#c8cfc2', b: '#a6ae9e', c: '#e0e6da' }) : pal({ a: '#cdd6dc', b: '#a8b2bc', c: '#e4eaee' }), P = Object.values(pared);
  for (let y = 22; y < 116; y++) for (let x = 0; x < 320; x++) { const r1 = (x + y) % 12, r2 = (x - y + 1200) % 12, flor = (x % 12 === 6 && y % 12 === 6) || ((x + 6) % 12 === 6 && (y + 6) % 12 === 6); pset(x, y, flor ? P[2] : r1 === 0 || r2 === 0 ? c_mezcla(P[0], P[1], 0.5) : h(x >> 1, y >> 1, 152) < 0.06 ? P[1] : P[0]); }
  for (const [x0, x1] of [[78, 118], [202, 242]]) { rect(x0, 34, x1, 98, P[1]); rect(x0 + 1, 35, x1 - 1, 97, P[0]); rect(x0 + 1, 35, x1 - 1, 35, P[2]); rect(x0 + 3, 37, x1 - 3, 95, P[1]); rect(x0 + 4, 38, x1 - 4, 94, P[0]); }
  for (const px of [6, 70, 124, 190, 244, 310]) { rect(px, 22, px + 7, 116, c_K.paredL); for (let i = 1; i < 7; i += 2) rect(px + i, 28, px + i, 110, c_K.paredS); rect(px - 1, 22, px + 8, 27, c_K.paredL); rect(px - 1, 27, px + 8, 27, c_K.paredS); rect(px - 1, 110, px + 8, 116, c_K.paredL); rect(px + 7, 22, px + 7, 116, c_K.paredS); }
  rect(0, 112, 319, 113, c_K.paredL); rect(0, 113, 319, 113, c_K.paredS);
  for (let y = 114; y < 130; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || x % 32 === 31 || y === 116 || y === 127) ? c_K.paredS : P[2]);
  rect(0, 128, 319, 131, hex('#6a4a34')); rect(0, 128, 319, 128, hex('#8a6a4a'));
  // el suelo: tablas de roble en perspectiva y la alfombra con cenefa
  for (let y = 132; y < 180; y++) { const d = y - 100; for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 8, tab = Math.floor(u), fr = u - tab, q = h(tab, Math.floor((y - 132) / 9), 154);
    const ax = Math.abs(x - 160) - (y - 132) * 1.2, alf = ax < 100 && y > 136;
    let c = fr < 0.07 ? c_K.tablaD : q < 0.3 ? c_K.tablaS : q > 0.8 ? c_K.tablaL : c_K.tabla;
    if (alf) { const bx = 100 - ax, by = y - 136; c = bx < 3 || by < 2 ? c_K.alfombraS : bx < 6 || by < 5 ? ((x + y) % 4 < 2 ? c_K.alfombraL : c_K.alfombra) : ((x + y * 2) % 14 === 0 || (x - y * 2) % 14 === 0) ? c_K.alfombraS : c_K.alfombra; }
    pset(x, y, c); } }
  c_tinte(R, 0, 132, 319, 135, 0.3);
  // las dos ventanas altas de arco (hueco vacío: el cielo se pinta en cada fotograma) con cortinas rojas recogidas; la
  // galería queda por debajo de y = 44 para no tocar la zona de Atom
  for (const wx of [20, 262]) {
    rect(wx - 3, 54, wx + 39, 112, c_K.paredL); rect(wx - 3, 112, wx + 39, 114, c_K.paredS);
    for (let y = 52; y <= 110; y++) for (let x = wx; x <= wx + 36; x++) { const dy = y - 70, dd = dy < 0 ? Math.hypot(x - wx - 18, dy) : 0; if (dd > 18) continue; R.buf[y * 320 + x] = c_VACIO; }
    for (let x = wx + 6; x < wx + 36; x += 6) for (let y = 56; y <= 110; y++) { const dy = y - 70; if (dy < 0 && Math.hypot(x - wx - 18, dy) > 17) continue; pset(x, y, c_K.marco); }
    for (let y = 70; y <= 110; y += 8) rect(wx, y, wx + 36, y, c_K.marco); rect(wx, 89, wx + 36, 90, c_K.marco);
    for (let a = Math.PI; a <= Math.PI * 2; a += 0.02) { pset(Math.round(wx + 18 + Math.cos(a) * 18), Math.round(70 + Math.sin(a) * 18), c_K.marcoS); pset(Math.round(wx + 18 + Math.cos(a) * 19), Math.round(70 + Math.sin(a) * 19), c_K.paredS); }
    rect(wx, 70, wx, 110, c_K.marcoS); rect(wx + 36, 70, wx + 36, 110, c_K.marcoS);
    for (const d of [-1, 1]) for (let y = 48; y < 116; y++) { const u = (y - 48) / 68, w = y < 82 ? 9 - u * 6 : 4 + (y - 82) * 0.14, x0 = d < 0 ? wx - 6 : wx + 42 - Math.round(w);
      for (let i = 0; i < Math.round(w); i++) pset(x0 + i, y, (i + Math.round(u * 4)) % 4 === 0 ? c_K.cortinaS : (i + Math.round(u * 4)) % 4 === 2 ? c_K.cortinaL : c_K.cortina); }
    rect(wx - 8, 46, wx + 44, 50, c_K.cortina); for (let x = wx - 8; x <= wx + 44; x += 2) pset(x, 51, C.oro); rect(wx - 8, 46, wx + 44, 46, c_K.cortinaL); rect(wx - 9, 44, wx + 45, 45, C.oroS);
    for (const d of [-1, 1]) { const tx = d < 0 ? wx - 3 : wx + 39; rect(tx - 1, 82, tx + 1, 84, C.oro); }
  }
  // la luz que entra por las ventanas y cae en el suelo (de día)
  if (!noche) for (const wx of [20, 262]) for (let y = 116; y < 176; y++) for (let x = 0; x < 320; x++) { const s = wx < 160 ? 1 : -1, x0 = wx + 4 + (y - 116) * 0.9 * s, x1 = wx + 34 + (y - 116) * 0.9 * s; if (x >= Math.min(x0, x1) && x <= Math.max(x0, x1) && (x + y) % 2 === 0) { const p = R.pget(x, y); pset(x, y, c_mezcla(p, hex('#fff2d0'), 0.16)); } }
  if (sala === 'congreso') {
    // el dosel rojo con el águila y las trece estrellas, el estrado con escalones y el sillón del presidente
    rect(128, 24, 192, 30, C.oroS); rect(128, 24, 192, 24, C.oro); for (let x = 128; x <= 192; x += 2) pset(x, 31, C.oro);
    for (let y = 30; y < 100; y++) for (let x = 130; x <= 190; x++) { const pl = (x - 130 + Math.round(Math.sin(y * 0.1) * 1)) % 6; pset(x, y, pl === 0 ? c_K.cortinaS : pl === 3 ? c_K.cortinaL : c_K.cortina); }
    for (let k = 0; k < 13; k++) { const a = Math.PI + 0.3 + k * (Math.PI - 0.6) / 12; const sx = Math.round(160 + Math.cos(a) * 20), sy = Math.round(56 + Math.sin(a) * 16); pset(sx, sy, C.oroL); pset(sx - 1, sy, C.oro); pset(sx + 1, sy, C.oro); pset(sx, sy - 1, C.oro); pset(sx, sy + 1, C.oro); }
    c_aguila(R, 160, 40, [C.oroS, C.oro, C.oroL]);
    rect(150, 60, 170, 104, K); rect(151, 61, 169, 104, hex('#6a3a26')); rect(153, 64, 167, 98, c_K.cortina); rect(153, 64, 167, 64, c_K.cortinaL); for (let y = 68; y < 98; y += 6) for (let x = 155; x < 166; x += 5) pset(x, y, C.oroS);
    disco(160, 59, 6, hex('#6a3a26')); disco(160, 59, 4, C.oroS); pset(160, 57, C.oroL);
    for (let k = 0; k < 3; k++) { const y = 104 + k * 6, x0 = 108 - k * 8, x1 = 212 + k * 8; rect(x0, y, x1, y + 5, c_K.tabla); rect(x0, y, x1, y, c_K.tablaL); rect(x0, y + 5, x1, y + 5, c_K.tablaD); for (let x = x0 + 6; x < x1; x += 12) rect(x, y + 1, x, y + 4, c_K.tablaS); }
    rect(118, 92, 202, 103, c_K.tablaS); rect(118, 92, 202, 92, c_K.tablaL); for (let x = 122; x < 200; x += 10) { rect(x, 95, x + 7, 101, c_K.tabla); rect(x, 95, x + 7, 95, c_K.tablaD); }
    // dos cuadros en los paneles: el río entre colinas y un barco en el puerto
    for (const [fx, k] of [[84, 0], [208, 1]]) { rect(fx, 44, fx + 28, 72, C.oroS); rect(fx, 44, fx + 28, 44, C.oro); rect(fx + 2, 46, fx + 26, 70, hex('#4a3a2a'));
      for (let y = 47; y < 70; y++) for (let x = fx + 3; x < fx + 26; x++) { const sky = y < 56 + Math.sin((x - fx) * 0.3 + k) * 2; pset(x, y, sky ? (y < 51 ? hex('#8ab0c8') : hex('#c8d8d0')) : k ? (y > 64 ? hex('#3a6a8a') : (x + y) % 5 ? hex('#4a7a9a') : hex('#8ab0c8')) : y > 64 ? hex('#4a7a9a') : (x + y * 2) % 7 ? hex('#4a6a3a') : hex('#3a5a2a')); }
      if (k) { rect(fx + 9, 60, fx + 19, 62, c_K.casco); for (const mx of [fx + 11, fx + 15]) { rect(mx, 50, mx, 59, c_K.cascoS); rect(mx - 2, 51, mx + 2, 53, c_K.vela); rect(mx - 2, 55, mx + 2, 57, c_K.vela); } } else { disco(fx + 20, 50, 2, hex('#f0e8c0')); for (let i = 0; i < 4; i++) pset(fx + 6 + i * 4, 52 + (i % 2), hex('#3a3a4a')); }
      c_tinte(R, fx, 73, fx + 28, 74, 0.2); }
    // los pupitres de los lados con sus plumas y tinteros
    for (const [dx, d] of [[44, 1], [276, -1]]) for (let r = 0; r < 2; r++) { const x0 = dx - 20 + r * 6 * d, y0 = 110 + r * 10, x1 = x0 + 38;
      R.poligono([[x0, y0], [x1, y0], [x1 + 2, y0 + 4], [x0 - 2, y0 + 4]], c_K.tabla); rect(x0 - 2, y0 + 4, x1 + 2, y0 + 10, c_K.tablaS); rect(x0 - 2, y0 + 4, x1 + 2, y0 + 4, c_K.tablaL); rect(x0 - 2, y0 + 10, x1 + 2, y0 + 10, c_K.tablaD);
      for (let k = 0; k < 2; k++) { const px = x0 + 8 + k * 18; rect(px, y0 + 1, px + 6, y0 + 3, c_K.perg); rect(px + 8, y0, px + 9, y0 + 2, K); linea(px + 9, y0, px + 12, y0 - 6, C.blanco); pset(px + 11, y0 - 5, c_K.marcoS); } }
  } else if (sala === 'tribunal') {
    // los cortinajes rojos detrás del estrado, el águila dorada y los seis sillones altos
    rect(60, 26, 260, 30, C.oroS); rect(60, 26, 260, 26, C.oro);
    for (let y = 30; y < 116; y++) for (let x = 62; x <= 258; x++) { const pl = (x + Math.round(Math.sin(y * 0.08 + x * 0.02) * 1.5)) % 7; pset(x, y, pl === 0 ? c_K.cortinaS : pl === 4 ? c_K.cortinaL : c_K.cortina); }
    for (let x = 62; x <= 258; x++) { const fes = 30 + Math.round(Math.abs(Math.sin((x - 62) / 196 * Math.PI * 4)) * 8); for (let y = 30; y < fes; y++) pset(x, y, y === fes - 1 ? C.oro : c_K.cortinaS); }
    c_aguila(R, 160, 50, [C.oroS, C.oro, C.oroL]);
    for (let k = 0; k < 6; k++) { const cx = 88 + k * 29; rect(cx - 8, 82, cx + 8, 118, K); rect(cx - 7, 83, cx + 7, 118, hex('#5a3420')); rect(cx - 5, 85, cx + 5, 116, hex('#3a2a4a')); rect(cx - 5, 85, cx + 5, 85, hex('#5a4a6a')); for (let y = 89; y < 114; y += 5) for (let x = cx - 3; x <= cx + 3; x += 3) pset(x, y, hex('#2a1e36')); disco(cx, 81, 4, hex('#5a3420')); pset(cx, 79, C.oroS); }
    rect(40, 116, 280, 132, c_K.tablaS); rect(40, 116, 280, 116, c_K.tablaL);
  } else {
    // la cena, de noche: la chimenea encendida con su repisa, un espejo, el aparador con la sopera y un cuadro
    c_sillar(R, 192, 60, 252, 130, { bw: 9, bh: 5, k: 160 }); rect(186, 56, 258, 60, c_K.paredL); rect(186, 56, 258, 56, C.blanco); rect(186, 60, 258, 61, c_K.paredS);
    rect(206, 88, 238, 130, c_K.hollin); for (let y = 88; y < 130; y += 4) rect(208, y, 236, y, hex('#3a2a28'));
    rect(198, 26, 246, 54, C.oroS); rect(200, 28, 244, 52, hex('#3a4a5a')); for (let k = 0; k < 8; k++) linea(203 + k * 5, 30, 207 + k * 5, 50, hex('#4a5a6a'));
    for (const cx of [192, 252]) { rect(cx - 2, 46, cx + 2, 56, C.oroS); rect(cx - 1, 40, cx + 1, 46, c_K.marco); }
    rect(68, 92, 120, 96, c_K.tabla); rect(68, 92, 120, 92, c_K.tablaL); rect(68, 96, 120, 116, c_K.tablaS); for (const px of [72, 94]) { rect(px, 99, px + 20, 113, c_K.tabla); rect(px, 99, px + 20, 99, c_K.tablaD); disco(px + 10, 106, 1, C.oro); }
    rect(70, 116, 72, 128, c_K.tablaD); rect(116, 116, 118, 128, c_K.tablaD);
    disco(86, 86, 6, c_K.peltreS); disco(86, 85, 5, C.blanco); rect(81, 84, 91, 91, C.blanco); rect(80, 91, 92, 92, c_K.mantelS); rect(104, 82, 110, 91, c_K.peltre); rect(105, 83, 105, 90, c_K.peltreL);
    rect(84, 40, 114, 70, C.oroS); rect(86, 42, 112, 68, hex('#3a4a3a')); for (let y = 42; y < 68; y++) for (let x = 86; x < 112; x++) if (y > 56 + Math.sin(x * 0.3) * 2) pset(x, y, hex('#4a6a3a')); disco(100, 50, 3, hex('#e8d8a0'));
  }
  if (noche) c_tinte(R, 0, 0, 319, 179, 0.55, hex('#141430'));
}

// la mesa o el estrado del salón, por delante de los personajes
function c_salonDelante(R, t, sala) {
  const { rect, pset, linea, poligono } = R, K = c_K.sombra;
  if (sala === 'congreso') {
    poligono([[84, 139], [236, 139], [244, 150], [76, 150]], K); poligono([[85, 140], [235, 140], [242, 149], [78, 149]], (x, y) => (h(x >> 1, y, 161) < 0.1 ? c_K.panoS : y < 142 ? c_mezcla(c_K.pano, c_K.panoS, 0.4) : c_K.pano));
    rect(76, 150, 244, 162, c_K.pano); rect(76, 150, 244, 150, c_K.panoL); for (let x = 80; x < 244; x += 12) rect(x, 151, x, 162, c_K.panoS); rect(76, 162, 244, 163, C.oroS);
    for (const lx of [82, 236]) { rect(lx, 164, lx + 3, 176, c_K.tablaD); rect(lx - 1, 175, lx + 4, 176, c_K.tablaD); }
    c_tinte(R, 74, 177, 246, 179, 0.3);
    // el pergamino largo, con los dos rollos colgando por delante, el tintero y las plumas
    rect(108, 141, 212, 147, c_K.perg); rect(108, 147, 212, 147, c_K.pergS); for (let y = 142; y < 147; y += 2) for (let x = 112; x < 208; x += 3) if (h(x, y, 162) < 0.7) pset(x, y, c_K.pergS);
    for (const rx of [104, 212]) { rect(rx, 140, rx + 4, 147, c_K.pergS); rect(rx + 1, 141, rx + 3, 146, c_K.perg); rect(rx + 1, 148, rx + 3, 156, c_K.perg); rect(rx + 3, 148, rx + 3, 156, c_K.pergS); rect(rx, 156, rx + 4, 158, c_K.pergS); }
    for (const [ix, k] of [[94, 0], [222, 1]]) { rect(ix, 141, ix + 4, 145, K); rect(ix + 1, 140, ix + 3, 140, c_K.peltre); const a = Math.round(Math.sin(t * 2 + k) * 1); linea(ix + 3, 140, ix + 7 + a, 131, C.blanco); linea(ix + 4, 140, ix + 8 + a, 132, c_K.marcoS); }
  } else if (sala === 'tribunal') {
    rect(40, 116, 280, 120, c_K.tablaL); rect(40, 116, 280, 116, c_mezcla(c_K.tablaL, C.blanco, 0.3)); rect(40, 120, 280, 121, c_K.tablaD);
    for (let y = 122; y < 146; y++) for (let x = 42; x <= 278; x++) { const px = (x - 42) % 26, py = (y - 124) % 22; let c = c_K.tabla; if (px > 2 && px < 24 && py > 1 && py < 19) c = px === 3 || py === 2 ? c_K.tablaD : px === 23 || py === 18 ? c_K.tablaL : c_mezcla(c_K.tabla, c_K.tablaS, 0.25); if (h(x >> 1, y, 163) < 0.05) c = c_K.tablaS; pset(x, y, c); }
    rect(36, 146, 284, 150, c_K.tablaS); rect(36, 146, 284, 146, c_K.tablaL); rect(30, 150, 290, 154, c_K.tabla); rect(30, 150, 290, 150, c_K.tablaL); rect(30, 154, 290, 155, c_K.tablaD);
    c_tinte(R, 28, 156, 292, 158, 0.3);
    for (const [px, k] of [[90, 0], [200, 1]]) { rect(px, 113, px + 14, 115, c_K.perg); rect(px, 115, px + 14, 115, c_K.pergS); rect(px + 18, 112, px + 21, 115, K); linea(px + 20, 112, px + 23, 106 + Math.round(Math.sin(t * 2 + k)), C.blanco); }
    { const cx = 160; rect(cx - 4, 112, cx + 4, 115, c_K.tablaD); rect(cx - 2, 110, cx + 2, 111, c_K.tabla); }
  } else {
    // la mesa de la cena: mantel con caída y pliegues, platos, copas, la licorera, el pan y el candelabro de tres velas
    poligono([[100, 136], [220, 136], [230, 148], [90, 148]], c_K.mantel); linea(100, 136, 220, 136, c_K.mantelS);
    rect(90, 148, 230, 164, c_K.mantel); for (let x = 94; x < 230; x += 9) { rect(x, 149, x, 164, c_K.mantelS); pset(x + 4, 156, c_K.mantelS); } rect(90, 164, 230, 165, c_K.mantelS);
    for (const lx of [96, 222]) rect(lx, 166, lx + 3, 177, c_K.tablaD); c_tinte(R, 88, 178, 232, 179, 0.4);
    for (const px of [116, 160, 204]) { R.disco(px, 143, 6, c_K.mantelS); R.disco(px, 143, 5, C.blanco); R.disco(px, 143, 3, c_K.marcoS); R.disco(px, 143, 2, C.blanco); }
    for (const gx of [126, 170, 194]) { rect(gx, 136, gx + 2, 139, hex('#8a2a3a')); rect(gx, 135, gx + 2, 135, c_K.vidrioR); pset(gx + 1, 140, c_K.vidrioR); rect(gx, 141, gx + 2, 141, c_K.vidrioR); }
    rect(138, 133, 142, 141, hex('#5a1a2a')); rect(139, 130, 141, 133, c_K.vidrioR); pset(139, 135, c_K.vidrioR); poligono([[176, 139], [188, 139], [186, 143], [178, 143]], hex('#c8904a')); rect(179, 138, 185, 139, hex('#e0b070'));
    rect(154, 140, 166, 142, C.oroS); rect(159, 129, 161, 141, C.oro); rect(152, 129, 168, 130, C.oro);
    for (const [cx, k] of [[153, 0], [160, 1], [167, 2]]) { rect(cx - 1, 121, cx + 1, 128, c_K.marco); const fl = Math.sin(t * 10 + k * 2); pset(cx, 118 + (fl > 0.3 ? 1 : 0), c_K.fuegoL); pset(cx, 119, c_K.fuegoL); pset(cx, 120, c_K.fuego); if (fl < -0.5) pset(cx + 1, 119, c_K.fuego); }
  }
}

function c_salon(R, t, o) {
  const sala = o.sala || 'congreso', noche = sala === 'cena', b = c_capa(R, 'salon' + sala, () => c_salonFijo(R, sala));
  // el cielo por las ventanas (con luna de noche), recortado al hueco
  for (const wx of [20, 262]) { R.recorte([wx, 52, wx + 36, 110]);
    for (let y = 52; y <= 110; y++) for (let x = wx; x <= wx + 36; x++) { const v = (y - 52) / 58; R.pset(x, y, noche ? (v > c_um(x, y) * 0.5 + 0.5 ? hex('#1e2a50') : hex('#121a3a')) : v > c_um(x, y) * 0.5 + 0.55 ? C.cielo3 : v > c_um(x, y) * 0.5 + 0.1 ? C.cielo2 : C.cielo1); }
    if (noche) { R.disco(wx + 24, 66, 5, hex('#f4f0dc')); R.disco(wx + 26, 65, 4, hex('#121a3a')); for (let k = 0; k < 6; k++) R.pset(wx + 4 + k * 6, 56 + (k * 7) % 30, (Math.sin(t * 2 + k) > 0) ? C.blanco : hex('#8a90b0')); }
    else { c_nube(R, wx + ((t * 2.5 + wx) % 70) - 15, 72, 12, c_CIELOS.dia.nube); c_nube(R, wx + ((t * 1.2 + wx * 2) % 80) - 20, 61, 8, c_CIELOS.dia.nube); }
    for (let y = 96; y <= 110; y++) for (let x = wx; x <= wx + 36; x++) R.pset(x, y, noche ? hex('#0e1428') : (x + y) % 4 ? hex('#5a8a4a') : hex('#4a7a3a'));
    for (let k = 0; k < 2; k++) { const x = wx + ((t * 7 + k * 20) % 50) - 6, y = 66 + k * 8; if (!noche) { R.pset(x, y, hex('#3a3a4a')); R.pset(x - 1, y - (Math.sin(t * 8 + k) > 0 ? 1 : 0), hex('#3a3a4a')); R.pset(x + 1, y - (Math.sin(t * 8 + k) > 0 ? 1 : 0), hex('#3a3a4a')); } }
    R.recorte(null); }
  c_pegar(R, b);
  // motas de polvo en la luz (día) o el fuego y el resplandor de las velas (noche)
  if (!noche) for (let k = 0; k < 12; k++) { const wx = k % 2 ? 262 : 20, s = wx < 160 ? 1 : -1, u = (t * 0.05 + h(k, 1, 171)) % 1, y = Math.round(116 + u * 50), x = Math.round(wx + 8 + h(k, 2, 171) * 24 + (y - 116) * 0.9 * s + Math.sin(t + k) * 2); R.pset(x, y, hex('#fff6e0')); }
  else {
    for (let k = 0; k < 9; k++) { const fx = 208 + k * 3.2, alto = 6 + Math.abs(Math.sin(t * 6 + k * 1.7) * 8); for (let j = 0; j < alto; j++) { const x = Math.round(fx + Math.sin(t * 9 + j * 0.5 + k) * (j / alto) * 2); R.pset(x, 128 - j, j < alto * 0.35 ? c_K.fuegoL : j < alto * 0.7 ? c_K.fuego : c_K.brasa); R.pset(x + 1, 128 - j, j < alto * 0.5 ? c_K.fuego : c_K.brasa); } }
    R.rect(206, 126, 238, 129, c_K.tablaD);
    const fl = Math.sin(t * 9) * 0.04; for (const [cx, cy, r, a] of [[160, 124, 70, 0.22], [222, 112, 46, 0.18]]) for (let y = Math.max(0, cy - r); y < Math.min(180, cy + r); y++) for (let x = Math.max(0, cx - r); x < Math.min(320, cx + r); x++) { const d = Math.hypot(x - cx, (y - cy) * 1.2) / r; if (d < 1 && c_um(x, y) > d + fl) R.pset(x, y, c_mezcla(R.pget(x, y), hex('#ffc070'), a * (1 - d) * 2.2)); }
  }
  // las dos arañas de velas colgadas del techo (congreso y tribunal): se mecen un poco y las llamas tiemblan
  if (!noche) for (const [ax, k] of [[98, 0], [222, 1]]) { const m = Math.round(Math.sin(t * 0.8 + k) * 1), y0 = 26;
    R.linea(ax, 14, ax + m, y0, C.oroS); R.rect(ax + m - 1, y0, ax + m + 1, y0 + 6, C.oro); R.pset(ax + m, y0 + 7, C.oroS);
    for (const d of [-9, -5, 5, 9]) { const bx = ax + m + d, by = y0 + 4 + (Math.abs(d) > 6 ? -1 : 1); R.linea(ax + m, y0 + 5, bx, by + 1, C.oroS); R.rect(bx - 1, by, bx + 1, by, C.oro); R.rect(bx, by - 3, bx, by - 1, c_K.marco); const fl = Math.sin(t * 11 + d + k * 3) > 0.2; R.pset(bx, by - 4 - (fl ? 1 : 0), c_K.fuegoL); R.pset(bx, by - 4, c_K.fuego); }
    for (let j = 0; j < 4; j++) R.pset(ax + m + (j % 2 ? 1 : -1), y0 + 8 + j, j % 2 ? c_K.vidrioR : C.blanco); }
  const g = { congreso: { suelo: 146, mesa: { x0: 78, x1: 242, tablero: 140, delante: 176 }, sillon: [160, 104], estrado: [100, 220, 104] }, tribunal: { suelo: 120, estrado: { x0: 40, x1: 280, tablero: 116 }, sillones: [88, 117, 146, 175, 204, 233] }, cena: { suelo: 140, mesa: { x0: 90, x1: 230, tablero: 136, delante: 176 }, velas: [160, 119], chimenea: [192, 252] } }[sala];
  return { suelo: g.suelo, pies: [20, 300], ventanas: [[20, 52, 56, 110], [262, 52, 298, 110]], sala, ...g };
}

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1: transiciones tramadas limpias
const d_BAYERD = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umbralD = (x, y) => d_BAYERD[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (los de hex(): 0xAABBGGRR) en la proporción a (0–1)
function d_mezclaD(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la paleta propia de los decorados D y E
const CD = pal({
  papel: '#ecdcb4', papelS: '#d2bd8c', papelL: '#f7ecd2', papelB: '#bca06c', tinta: '#4a3424', tintaR: '#b8402a', tintaRL: '#e0704e',
  colina: '#a07c50', colinaS: '#7a5a38', arroyo: '#3e72a8', arroyoL: '#86aed2', granja: '#c4cc90', granjaS: '#a0aa6c', aguaMapa: '#c4d2c8', aguaMapaS: '#9eb4aa', bosqueMapa: '#6a8a4a', ciudadMapa: '#b07850',
  nogal: '#5a341c', nogalS: '#3e2210', nogalL: '#7c4c2a', nogalB: '#a06a3a', tapiz: '#8a9c78', tapizS: '#6e8060', tapizL: '#a8b894',
  friso: '#6a4428', frisoS: '#4a2c18', frisoL: '#8e6038', tarima: '#8a5a34', tarimaS: '#6a4226', tarimaL: '#a8703e',
  laton: '#c8a040', latonS: '#8a6a24', latonL: '#f4d878', vela: '#f2ead2', velaS: '#cfc3a4', llama: '#ffd25a', llamaL: '#fff8d0', llamaR: '#ff8a34',
  cortina: '#8a2a2a', cortinaS: '#5e1a1e', cortinaL: '#b44a3a', alfombra: '#7a2a24', alfombraS: '#521a18', alfombraA: '#2a3a5a', alfombraO: '#c8983a',
  agua: '#4a7e9a', aguaS: '#34607a', aguaL: '#7aaec4', aguaB: '#c8e4ee', aguaV: '#5a8a7a', aguaVS: '#3e6a5e', aguaVL: '#86b2a0',
  piedra: '#a8a090', piedraS: '#7e786a', piedraL: '#ccc4b0', piedraM: '#5e5a50', granito: '#b8ae9c', granitoS: '#8c8270', granitoL: '#dcd2bc',
  casco: '#2a2630', cascoS: '#1a1820', cascoL: '#4a4452', franja: '#e8e0c8', mastil: '#8a6a44', mastilS: '#5e4a30', vela2: '#efe6cc', vela2S: '#cdbf9e', cabo: '#4a3a2a',
  ladrillo: '#a24a34', ladrilloS: '#7a3424', ladrilloL: '#c66a4a', junta: '#c8b8a0', brown: '#7a4a38', brownS: '#583428', brownL: '#9a6450', brownD: '#3e2218',
  hierro: '#2a2a32', hierroL: '#5a5a66', cobre: '#5aa898', cobreS: '#3a7a6c', cobreL: '#8ad0bc', cobreD: '#2a5a50', oroT: '#ffd040', azulej: '#e2d4b4', azulejS: '#c8b48c', azulejL: '#f2e8cc', azulejJ: '#a8946c',
  rojoB: '#c8303a', azulB: '#2a3a7a', blancoB: '#f2eee4', caballo: '#6a3e24', caballoS: '#4a2a16', caballoL: '#8a5634', crin: '#2a1a12', laca: '#24202a', lacaL: '#4a4456', rueda: '#c8902a', ruedaS: '#8a6018',
  hierba: '#6a9a3e', hierbaS: '#4a7a2e', hierbaL: '#8aba4e', tierra: '#8a6a44', tierraS: '#6a4e30', tierraL: '#a8865a', barro: '#6e5236', grava: '#c8b896', gravaS: '#a89676',
});

const d_VACIOD = 0x01020304;   // «transparente» en las capas fijas

const d_CAPASD = new WeakMap();

// una capa fija (se pinta una sola vez con dibuja() y se guarda): empieza transparente; devuelve el búfer
function d_capaD(R, clave, dibuja) {
  let m = d_CAPASD.get(R); if (!m) d_CAPASD.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); b.fill(d_VACIOD); const prev = R.usar(b); R.recorte(null); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// copia una capa sobre el lienzo entre las filas y0 e y1, saltando lo transparente (un recorrido de esa franja)
function d_ponerD(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== d_VACIOD) B[i] = c; } }

// la luz que entra: aclara (o con a < 0 oscurece) tramado lo que ya hay en la zona que dice dentro(x, y)
function d_luzD(R, x0, y0, x1, y1, dentro, a, col = 0xffffffff) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const f = dentro(x, y); if (f <= 0) continue; const i = y * 320 + x; B[i] = d_mezclaD(B[i], col, a * f); }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function d_nubeD(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// los cielos (de arriba abajo: [fracción de la altura hasta el horizonte, color]) y los tres tonos de sus nubes
const d_CIELOSD = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']],
  fiesta: [[0, '#4a8ad8'], [0.22, '#5ea6e6'], [0.46, '#84c0ee'], [0.7, '#a8d2f0'], [0.88, '#d4e6ea'], [0.96, '#f0e8d4']],
  bruma: [[0, '#6a9ac8'], [0.25, '#86b0d6'], [0.5, '#a4c4de'], [0.75, '#c2d6e4'], [0.92, '#dce4e6']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const d_NUBESD = { dia: ['#a8d6f2', '#d2ecfc', '#ffffff'].map(hex), fiesta: ['#b4d4ec', '#e0eefa', '#ffffff'].map(hex), bruma: ['#a8bccc', '#ccdae4', '#eef2f4'].map(hex) };

// cielo rico: bandas con transición tramada, el halo del sol, cirros casi quietos y cúmulos a dos velocidades (la
// esquina de Atom queda sin nubes). o.hor; o.modo 'dia' | 'fiesta' | 'bruma'; o.sol [x, y, r] o null; o.cumulos (5); o.x0, o.x1:
// solo entre esas columnas (para cielos vistos por una ventana, con R.recorte puesto); o.y0 la fila de arriba
function d_cieloD(R, t, o = {}) {
  const { pset } = R, hor = o.hor ?? 96, modo = o.modo ?? 'dia', B = R.buf, P = d_CIELOSD[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  const x0 = o.x0 ?? 0, x1 = o.x1 ?? 319, y0 = o.y0 ?? 0;
  for (let y = y0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f + x0, f + x1 + 1); else for (let x = x0; x <= x1; x++) B[f + x] = d_umbralD(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48, cn = d_NUBESD[modo];
  const sol = o.sol === undefined ? [226, 22, 8] : o.sol;
  if (sol) { const [sx, sy, sr] = sol, R2 = sr + 10;
    for (let y = Math.max(y0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(x0, sx - R2); x <= Math.min(x1, sx + R2); x++) {
      const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (d_umbralD(x, y) < q * q) B[y * 320 + x] = d_mezclaD(B[y * 320 + x], hex('#fff8dc'), 0.42); } }
  // cirros: velos finos y lejanos que apenas se mueven
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), xa = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(y0 + 6, Math.round(hor * (0.16 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(xa + i); if (x < x0 || x > x1 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(32, hor * 0.3) + k * hor * 0.14 : Math.max(28, hor * (0.45 + (k - 2) * 0.1))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    if (x > 250 && y < 54) continue;   // ninguna nube grande detrás de Atom
    d_nubeD(R, Math.round(x), Math.min(hor - 6, y), w, k, cn); }
  if (sol) { const [sx, sy, sr] = sol; R.disco(sx, sy, sr + 1, C.solL); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }
}

// una gaviota que planea (o aletea) en (x, y); d = 1 hacia la derecha; k desfasa el aleteo
function d_gaviotaD(R, x, y, t, d = 1, k = 0) {
  const { pset } = R, X = (i) => Math.round(x + i * d), Y = Math.round(y), a = Math.sin(t * 6 + k * 2.1), b = a > 0.3 ? -1 : a < -0.3 ? 1 : 0, cb = hex('#f4f4f0'), cs = hex('#9aa0a8'), cn = hex('#3a3a42');
  pset(X(0), Y, cb); pset(X(1), Y, cb); pset(X(2), Y, cn); pset(X(-1), Y, cs);
  for (let i = 1; i <= 4; i++) { const yy = Y + (i < 3 ? b : b * 2) - (i === 2 ? 1 : 0); pset(X(-i + 1), yy, i === 4 ? cn : cs); pset(X(i), yy, i === 4 ? cn : cs); }
}

// varias gaviotas que dan vueltas sobre una zona (cx, cy, radio rx, ry)
function d_gaviotasD(R, t, cx, cy, rx, ry, n = 3, sem = 0) {
  for (let k = 0; k < n; k++) { const a = t * (0.35 + 0.08 * k) + k * 2.2 + sem, x = cx + Math.cos(a) * rx * (0.6 + 0.4 * h(k, sem, 2)), y = cy + Math.sin(a) * ry; if (x > 270 && y < 48) continue; d_gaviotaD(R, x, y, t, Math.sin(a) > 0 ? -1 : 1, k + sem); }
}

// una persona pequeña de fondo (6–12 px de alto): o.alto, o.dir, o.anda, o.ropa, o.piel, o.pelo, o.sombrero ('copa', 'gorra',
// 'cofia', 'pañuelo' o null), o.bulto (un hatillo o una maleta en la mano), o.falda; (x, suelo): sus pies
function d_genteD(R, x, suelo, t, k, o = {}) {
  const { rect, pset } = R, A = o.alto ?? 10, d = o.dir ?? 1, cab = Math.max(2, Math.round(A * 0.26)), cuerpo = Math.round(A * 0.42), pierna = A - cab - cuerpo;
  const ropas = ['#5a3a2a', '#3a4a6a', '#6a2a2a', '#4a5a3a', '#7a6a4a', '#2a2a34', '#8a5a3a', '#5a4a6a'].map(hex), pieles = ['#f0c8a0', '#e0aa80', '#c8905e', '#a87048'].map(hex);
  const ropa = o.ropa ?? ropas[k % ropas.length], piel = o.piel ?? pieles[(k * 3) % pieles.length], pelo = o.pelo ?? [hex('#3a2418'), hex('#6a4224'), hex('#a8743a'), hex('#1a1414')][(k * 5) % 4];
  const paso = o.anda ? Math.floor(t * 6 + k) % 2 : 0, w = Math.max(2, Math.round(A * 0.3)), xs = Math.round(x), sy = Math.round(suelo);
  const pie = hex('#2a2024');
  if (o.falda) { for (let j = 0; j < pierna + 1; j++) rect(xs - w + (j < 2 ? 0 : 0), sy - j, xs + w - 1, sy - j, j === 0 ? pie : ropa); }
  else { rect(xs - 1 - paso, sy - pierna + 1, xs - 1 - paso, sy, hex('#3a3442')); rect(xs + paso, sy - pierna + 1, xs + paso, sy, hex('#3a3442')); }
  const yb = sy - pierna; rect(xs - w + 1, yb - cuerpo + 1, xs + w - 2, yb, ropa); pset(xs - w + 1, yb, d_mezclaD(ropa, 0xff000000, 0.3));
  rect(xs - 1, yb - cuerpo - cab + 1, xs, yb - cuerpo, piel); if (cab > 2) rect(xs - 1, yb - cuerpo - cab + 1, xs, yb - cuerpo - cab + 1, pelo);
  const ys = yb - cuerpo - cab;
  if (o.sombrero === 'copa') { rect(xs - 2, ys + 1, xs + 1, ys + 1, hex('#1a1a20')); rect(xs - 1, ys - 1, xs, ys, hex('#1a1a20')); }
  else if (o.sombrero === 'gorra') rect(xs - 1, ys + 1, xs + (d > 0 ? 1 : 0), ys + 1, hex('#3a3a3a'));
  else if (o.sombrero === 'cofia' || o.sombrero === 'pañuelo') rect(xs - 1, ys + 1, xs, ys + 1, o.sombrero === 'cofia' ? hex('#f0ece0') : hex('#a83a3a'));
  if (o.bulto) { const bx = xs + d * w; rect(bx - 1, yb - 2, bx + 1, yb, o.bulto === 'maleta' ? hex('#6a4a2a') : hex('#c8b890')); pset(bx, yb - 3, hex('#3a2a1a')); }
}

// agua viva entre las filas y0 e y1: bandas tramadas de cols (de lejos a cerca), rizos que se mueven y destellos; o.v
// velocidad, o.x0/o.x1; o.quieta: rizos finos (agua de canal)
function d_aguaD(R, t, y0, y1, cols, o = {}) {
  const B = R.buf, x0 = o.x0 ?? 0, x1 = o.x1 ?? 319, n = cols.length, quieta = !!o.quieta, v = o.v ?? 6;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), fi = u * (n - 1), i0 = Math.min(n - 2, Math.floor(fi)), p = fi - i0, f = y * 320, a = cols[i0], b = cols[i0 + 1];
    for (let x = x0; x <= x1; x++) B[f + x] = d_umbralD(x, y) < p ? b : a; }
  const L = cols[n - 1] === undefined ? 0 : 1;
  for (let k = 0; k < (o.n ?? 60); k++) { const u = h(k, 1, 401) ** 1.3, y = Math.round(y0 + 1 + u * (y1 - y0 - 1)), w = Math.round((quieta ? 2 : 3) + u * (quieta ? 5 : 9)), sp = v * (0.3 + u),
      x = Math.round(((h(k, 2, 401) * (x1 - x0 + 40) + t * sp * (k % 2 ? 1 : -1)) % (x1 - x0 + 40) + (x1 - x0 + 40)) % (x1 - x0 + 40)) + x0 - 20, vis = Math.sin(t * (1.2 + h(k, 3, 401)) + k) > -0.3;
    if (!vis) continue; const cl = o.luz ?? hex('#d8eef4'), cs = o.sombra ?? d_mezclaD(cols[Math.min(n - 1, Math.floor(u * (n - 1)) + 1)], 0xff000000, 0.25);
    for (let i = 0; i < w; i++) { const xx = x + i; if (xx < x0 || xx > x1) continue; B[y * 320 + xx] = i === 0 || i === w - 1 ? cs : (k % 3 ? cl : cs); if (!quieta && u > 0.5 && i > 1 && i < w - 2 && y + 1 <= y1) B[(y + 1) * 320 + xx] = cs; } }
  void L;
}

// un humo que sube en bolitas que crecen y se aclaran; (x, y) la boca; o.alto, o.viento (px hacia la derecha), o.c
function d_humoD(R, x, y, t, o = {}) {
  const alto = o.alto ?? 26, vi = o.viento ?? 8, n = o.n ?? 6, c0 = o.c ?? hex('#8a8a90'), c1 = d_mezclaD(c0, hex('#f2f2f2'), 0.55);
  for (let k = 0; k < n; k++) { const u = (t * (o.v ?? 0.45) + k / n) % 1, r = Math.round(1 + u * (o.r ?? 4)), xx = Math.round(x + u * vi + Math.sin(u * 6 + k) * 1.5), yy = Math.round(y - u * alto);
    if (xx > 268 && yy < 50) continue; R.disco(xx, yy + 1, r, d_mezclaD(c0, 0xff000000, 0.15)); R.disco(xx, yy, r, u > 0.6 ? c1 : c0); if (r > 1) R.pset(xx - 1, yy - r + 1, c1); }
}

// una bandera que ondea en un mástil: (x, y) el tope del asta; o.w, o.hh tamaño, o.tipo 'barras' (barras y estrellas de
// colores, sin escudos), 'banderin' (un gallardete), o un color; o.dir hacia dónde ondea
function d_banderaD(R, x, y, t, o = {}) {
  const w = o.w ?? 12, hh = o.hh ?? 7, d = o.dir ?? 1, tipo = o.tipo ?? 'barras';
  for (let i = 0; i < w; i++) { const dy = Math.round(Math.sin(t * 5 - i * 0.6) * (i / w) * 1.6), xx = x + 1 + i * d;
    if (tipo === 'banderin') { const hj = Math.max(1, Math.round(hh * (1 - i / w))); for (let j = 0; j < hj; j++) R.pset(xx, y + dy + j, o.c ?? CD.rojoB); continue; }
    for (let j = 0; j < hh; j++) { let c;
      if (tipo === 'barras') { c = ((j % 2) === 0) ? CD.rojoB : CD.blancoB; if (i < w * 0.42 && j < hh * 0.55) c = (i + j) % 2 === 0 && i > 0 ? CD.blancoB : CD.azulB; }
      else c = Array.isArray(tipo) ? tipo[Math.floor(i / w * tipo.length)] : tipo;
      if (dy + j > 0 && i % 3 === 2 && j === hh - 1) c = d_mezclaD(c, 0xff000000, 0.25);
      R.pset(xx, y + dy + j, c); } }
  R.rect(x, y - 1, x, y + (o.asta ?? 0), C.k);
}

// un caballo de lado, al paso o al trote (tamaño de escena: ~24 px de largo); (x, y): los cascos de delante en el suelo;
// d dirección; o.trote; o.c, o.cS, o.cL colores; devuelve el arnés { pecho: [x, y], lomo: [x, y] }
function d_caballoD(R, x, y, t, d = 1, o = {}) {
  const { rect, pset, linea } = R, c = o.c ?? CD.caballo, cS = o.cS ?? CD.caballoS, cL = o.cL ?? CD.caballoL, cr = o.crin ?? CD.crin, X = (i) => Math.round(x + i * d), Y = Math.round(y);
  const f = (o.quieto ? 0 : t * (o.trote ? 7 : 4)), a = Math.sin(f), b = Math.round(o.trote && !o.quieto ? Math.abs(Math.sin(f)) : 0);
  const yb = Y - 10 - b;   // la línea del vientre
  // las patas: pares en diagonal que se adelantan y se atrasan
  const pata = (px, fase, lejos) => { const s = Math.sin(f + fase), dx = Math.round(s * 2), lev = Math.max(0, Math.round(Math.cos(f + fase) * (o.trote ? 2 : 1))), col = lejos ? cS : c;
    linea(X(px), yb, X(px + dx * 0.5), Y - 5 - lev, col); linea(X(px + dx * 0.5), Y - 5 - lev, X(px + dx), Y - 1 - lev, col); pset(X(px + dx), Y - lev, C.k); pset(X(px + dx) + d, Y - lev, C.k); };
  pata(-8, Math.PI, true); pata(-1, 0, true); pata(-10, 0, false); pata(1, Math.PI, false);
  // el cuerpo: tronco ovalado con su luz arriba y su sombra abajo
  for (let i = -12; i <= 3; i++) { const e = Math.sqrt(Math.max(0, 1 - ((i + 4.5) / 8.5) ** 2)), top = Math.round(yb - 6 * e - (i < -9 ? 1 : 0)); for (let yy = top; yy <= yb; yy++) pset(X(i), yy, yy === top ? cL : yy >= yb - 1 ? cS : c); pset(X(i), top - 1, C.k); pset(X(i), yb + 1, C.k); }
  // el cuello y la cabeza, que cabecea al paso
  const cab = Math.round(Math.sin(f * 2) * 0.7);
  for (let j = 0; j < 9; j++) { const xx = 2 + Math.round(j * 0.55), yy = yb - 4 - j + cab; rect(Math.min(X(xx), X(xx + 3)), yy, Math.max(X(xx), X(xx + 3)), yy, j > 6 ? cL : c); pset(X(xx - 1), yy, cr); pset(X(xx + 4), yy, C.k); }
  const hy = yb - 13 + cab; rect(Math.min(X(6), X(11)), hy, Math.max(X(6), X(11)), hy + 3, c); rect(Math.min(X(9), X(11)), hy + 3, Math.max(X(9), X(11)), hy + 4, cS); pset(X(11), hy + 4, C.k); pset(X(8), hy + 1, C.k); pset(X(6), hy - 1, c); pset(X(6), hy - 2, cS);
  rect(Math.min(X(7), X(10)), hy + 1, Math.max(X(7), X(10)), hy + 1, o.brida ?? hex('#2a1a12'));
  // la cola que se mueve
  const sw = Math.round(Math.sin(t * 3) * 1.5);
  for (let j = 0; j < 7; j++) pset(X(-13 - Math.round(j * 0.3)) + (j > 3 ? sw * d : 0), yb - 5 + j, cr);
  return { pecho: [X(3), yb - 3], lomo: [X(-5), yb - 6], cabeza: [X(9), hy] };
}

// la mesa vista desde arriba: borde de atrás en y 94 (x 72–248) y de delante en y 162 (x 28–292); el papel ocupa u 0,06–0,94
// y v 0,08–0,94 del tablero; las coordenadas del papel (px, py) van de 0 a 1 (px de sur a norte, py de oeste a este)
const d_MESA_D = { y0: 94, y1: 162, a0: 72, b0: 248, a1: 28, b1: 292 };

function d_mesaPD(u, v) { const M = d_MESA_D, y = M.y0 + (M.y1 - M.y0) * v, a = M.a0 + (M.a1 - M.a0) * v, b = M.b0 + (M.b1 - M.b0) * v; return [a + (b - a) * u, y]; }

const d_papelPD = (px, py) => d_mesaPD(0.06 + 0.88 * px, 0.08 + 0.86 * py);

function d_dePantallaD(x, y) { const M = d_MESA_D, v = (y - M.y0) / (M.y1 - M.y0), a = M.a0 + (M.a1 - M.a0) * v, b = M.b0 + (M.b1 - M.b0) * v, u = (x - a) / (b - a); return [(u - 0.06) / 0.88, (v - 0.08) / 0.86, u, v]; }

// la isla de Manhattan en el papel: su eje y su media anchura en cada px (null fuera)
function d_islaD(px) {
  const s = (px - 0.03) / 0.94; if (s < 0 || s > 1) return null;
  let hw = s < 0.13 ? 0.06 + 0.26 * Math.sqrt(s / 0.13) : s > 0.83 ? 0.1 + 0.22 * Math.sqrt((1 - s) / 0.17) : 0.32;
  hw += 0.018 * Math.sin(s * 23) + 0.012 * Math.sin(s * 57 + 1);
  return [0.53 - 0.05 * Math.sin(s * 2.6), hw];
}

const d_enIslaD = (px, py) => { const r = d_islaD(px); return !!r && Math.abs(py - r[0]) < r[1] + (py > r[0] ? 0.012 * Math.sin(px * 80) : 0.012 * Math.sin(px * 67 + 2)); };

// las avenidas (py) y las calles (px) de la cuadrícula, rectas
const d_AVENIDAS_D = [0, 1, 2, 3, 4, 5, 6].map((k) => 0.27 + k * 0.088);

const d_CALLES_D = Array.from({ length: 31 }, (_, j) => 0.17 + j * 0.026);

// un trazo de tinta en el papel de (ax, ay) a (bx, by) (coordenadas del papel), solo dentro de la isla si dentro; hasta la fracción f
function d_trazoD(R, ax, ay, bx, by, c, f = 1, dentro = true) {
  const [x0, y0] = d_papelPD(ax, ay), [x1, y1] = d_papelPD(bx, by), n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 1.6 * f) + 1; let ult = null;
  for (let i = 0; i <= n; i++) { const u = (i / n) * f, px = ax + (bx - ax) * u, py = ay + (by - ay) * u; if (dentro && !d_enIslaD(px, py)) continue; const x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u); R.pset(x, y, c); ult = [x, y]; }
  return ult;
}

function d_planosD(R, t, o) {
  const { rect, pset, disco, linea } = R;
  const sala = d_capaD(R, 'planosSala', () => d_planosFijoD(R)), mesa = d_capaD(R, 'planosMesa', () => d_planosMesaD(R));
  // la ventana: el cielo con nubes que pasan y el humo de las chimeneas de 1811 (por detrás de los tejados de la capa)
  R.recorte([18, 20, 52, 75]);
  d_cieloD(R, t, { hor: 76, y0: 20, x0: 18, x1: 52, sol: null, modo: 'dia', cumulos: 0 });
  for (let k = 0; k < 3; k++) { const x = Math.round(((h(k, 1, 520) * 60 + t * (1.5 + k)) % 70) + 4), y = 28 + k * 9; for (const [dx, r] of [[0, 3], [4, 4], [8, 3]]) { disco(x + dx, y + 1, r, hex('#b8d8ee')); disco(x + dx, y, r, hex('#eef6fc')); } }
  for (const [cx, cy] of [[26, 58], [43, 54]]) d_humoD(R, cx, cy, t, { alto: 22, viento: 6, r: 2, c: hex('#b8b8c0') });
  { const a = t * 0.9, gx = Math.round(35 + Math.cos(a) * 12), gy = Math.round(36 + Math.sin(a * 1.3) * 5); d_gaviotaD(R, gx, gy, t, Math.sin(a) > 0 ? -1 : 1); }
  R.recorte(null);
  d_ponerD(R, sala);
  // las llamas de las velas (la del candelabro de la pared y las dos de la mesa), que tiemblan
  const llama = (x, y, k) => { const f = Math.sin(t * 9 + k * 2) + Math.sin(t * 13.7 + k), dx = f > 1.1 ? 1 : f < -1.1 ? -1 : 0, alto = 4 + (Math.sin(t * 7 + k) > 0.3 ? 1 : 0);
    for (let j = 0; j < 9; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, (j - 4) * 1.2); if (d < 5 && d > 2 && d_umbralD(x + i, y - j) < (5 - d) / 9) pset(x + i, y - j, d_mezclaD(R.pget(x + i, y - j), CD.llamaL, 0.35)); }
    pset(x, y, CD.llamaR); pset(x, y - 1, CD.llama); pset(x + dx, y - 2, CD.llama); for (let j = 3; j < alto; j++) pset(x + dx, y - j, j === alto - 1 ? CD.llamaR : CD.llamaL); pset(x - 1, y - 1, CD.llamaR); pset(x + 1, y - 1, CD.llamaR); };
  llama(79, 33, 0);
  // el péndulo del reloj de pie, que va y viene detrás de su cristal
  { const a = Math.sin(t * Math.PI) * 0.22, px = 262 + Math.round(Math.sin(a) * 14), py = 72 + Math.round(Math.cos(a) * 14); R.recorte([258, 58, 266, 86]); linea(262, 58, px, py - 3, CD.latonS); disco(px, py, 2, CD.laton); pset(px - 1, py - 1, CD.latonL); R.recorte(null); }
  // el gato dormido en el alféizar: respira y mueve la cola
  { const r = Math.sin(t * 2.2) > 0 ? 1 : 0, cx = 22; rect(cx, 75 - r, cx + 9, 78, hex('#6a6a72')); rect(cx + 1, 75 - r, cx + 8, 75 - r, hex('#8a8a92')); rect(cx + 8, 73, cx + 12, 78, hex('#6a6a72')); pset(cx + 9, 72, hex('#6a6a72')); pset(cx + 12, 72, hex('#6a6a72')); pset(cx + 10, 75, C.k); pset(cx + 11, 76, hex('#e8a0a0'));
    const ca = Math.sin(t * 1.7); for (let i = 0; i < 6; i++) pset(cx - i, 78 - Math.round(Math.max(0, ca) * Math.sin(i / 5 * Math.PI) * 3), hex('#5a5a62')); }
  // las motas de polvo que flotan en la luz de la ventana
  for (let k = 0; k < 14; k++) { const u = (h(k, 1, 530) + t * 0.02 * (1 + k % 3)) % 1, x = Math.round(56 + u * 120 + Math.sin(t * 0.7 + k) * 4), y = Math.round(28 + u * 70 + Math.cos(t * 0.5 + k * 2) * 5); if (Math.sin(t * 2 + k) > -0.2) pset(x, y, d_mezclaD(R.pget(x, y), CD.llamaL, 0.6)); }
  // quien está detrás de la mesa (la escena pone ahí a los comisionados), y la mesa por delante
  if (typeof o.detras === 'function') o.detras(t);
  d_ponerD(R, mesa, 80, 179);
  llama(86, 85, 1); llama(234, 85, 2);
  // la cuadrícula: primero las avenidas, de sur a norte; luego las calles, una tras otra; y las casas que encajan
  const q = Math.max(0, Math.min(1, o.cuadricula ?? 0)), qa = Math.min(1, q / 0.35), qc = Math.max(0, (q - 0.35) / 0.65), cas = Math.max(0, Math.min(1, o.casas ?? 0));
  const pxF = 0.17 + (0.95 - 0.17) * qa;
  let punta = null;
  if (cas > 0) for (let j = 0; j < d_CALLES_D.length - 1; j++) for (let k = 0; k < d_AVENIDAS_D.length - 1; k++) {
    if (cas * 31 < j + h(k, j, 540) * 1.5) continue;
    const a0 = d_CALLES_D[j], a1 = d_CALLES_D[j + 1], b0 = d_AVENIDAS_D[k], b1 = d_AVENIDAS_D[k + 1];
    if (!d_enIslaD(a0, b0) || !d_enIslaD(a1, b0) || !d_enIslaD(a0, b1) || !d_enIslaD(a1, b1)) continue;
    const [x0, y0] = d_papelPD(a0, b0), [x1, y1] = d_papelPD(a1, b1), c = [CD.ladrillo, CD.brown, CD.ladrilloL, hex('#8a7a6a')][Math.floor(h(j, k, 541) * 4)];
    const xa = Math.round(x0) + 1, xb = Math.round(x1) - 1, ya = Math.round(y0) + 1, yb = Math.round(y1) - 1;
    for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) pset(x, y, y === ya ? d_mezclaD(c, 0xff000000, 0.35) : (x + y) % 3 === 0 && y > ya + 1 ? CD.papelL : c);
  }
  for (const av of d_AVENIDAS_D) { if (qa <= 0) break; const p = d_trazoD(R, 0.17, av, pxF, av, CD.tintaR); if (qa < 1 && p) punta = p; }
  if (qa >= 1) for (let j = 0; j < d_CALLES_D.length; j++) { const f = Math.max(0, Math.min(1, qc * d_CALLES_D.length - j)); if (f <= 0) break; const p = d_trazoD(R, d_CALLES_D[j], 0.18, d_CALLES_D[j], 0.9, CD.tintaR, f); if (f < 1 && p) punta = p; }
  // la pluma y la regla en la punta del trazo
  if (punta && o.pluma !== false) { const [x, y] = punta; linea(x - 30, y + (qa < 1 ? 1 : 0), x + 6, y + (qa < 1 ? 1 : 0), CD.nogalB); pset(x, y, CD.tintaRL);
    linea(x, y, x + 7, y - 9, hex('#f4f0e4')); linea(x + 1, y - 1, x + 9, y - 10, hex('#d8d2c4')); linea(x + 3, y - 4, x + 9, y - 12, hex('#f4f0e4')); pset(x, y - 1, C.k); }
  return { suelo: 100, pies: [96, 224], mesa: { y0: 94, y1: 162, x0: 28, x1: 292 }, papel: d_papelPD, punta, isla: [d_papelPD(0.03, 0.53), d_papelPD(0.97, 0.5)] };
}

// la capa fija de la sala: pared con papel pintado y friso, ventana con su vista, cortinas, cuadros, reloj, librería,
// globo terráqueo, cesto de planos, suelo de tablas y alfombra
function d_planosFijoD(R) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf;
  // la pared: papel pintado con un dibujo menudo, el friso de madera con sus paneles, el rodapié y el suelo de tablas
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 56) { const mx = x % 12, my = (y + (Math.floor(x / 12) % 2) * 7) % 14, rombo = Math.abs(mx - 6) + Math.abs(my - 7); c = rombo === 4 ? CD.tapizS : rombo < 2 ? CD.tapizL : (x % 12 === 0 ? d_mezclaD(CD.tapiz, CD.tapizS, 0.4) : CD.tapiz); if (h(x, y, 501) < 0.04) c = CD.tapizS; }
    else if (y < 60) c = y === 56 ? CD.frisoL : y === 59 ? CD.frisoS : CD.friso;
    else if (y < 90) { const px = (x + 4) % 36, pane = px > 3 && px < 33 && y > 63 && y < 86, borde = pane && (px === 4 || y === 64), bordeS = pane && (px === 32 || y === 85); c = borde ? CD.frisoS : bordeS ? CD.frisoL : pane ? (h(x >> 1, y, 502) < 0.12 ? CD.frisoL : CD.friso) : (h(x, y >> 2, 503) < 0.1 ? CD.frisoS : d_mezclaD(CD.friso, CD.frisoS, 0.3)); }
    else if (y < 93) c = y === 90 ? CD.frisoL : CD.frisoS;
    else c = (x + Math.round((y - 93) * 0.3)) % 14 === 0 ? CD.tarimaS : CD.tarima;
    B[y * 320 + x] = c; }
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const ux = (x - 160) / (y - 40) * 6, tab = Math.floor(ux + 40), c = ((ux % 1) + 1) % 1 < 0.08 ? CD.tarimaS : h(tab, y >> 3, 504) < 0.3 ? CD.tarimaL : CD.tarima; B[y * 320 + x] = c; }
  // la alfombra turca bajo la mesa
  for (let y = 152; y < 180; y++) for (let x = 10; x < 310; x++) { const bx = Math.min(x - 10, 309 - x, y - 152), c = bx < 2 ? CD.alfombraO : bx < 5 ? ((x + y) % 4 < 2 ? CD.alfombraA : CD.alfombraS) : ((Math.abs((x % 16) - 8) + Math.abs((y % 10) - 5)) === 4 ? CD.alfombraO : (x * 3 + y) % 11 === 0 ? CD.alfombraS : CD.alfombra); B[y * 320 + x] = c; }
  // la ventana: marco, vidrios de guillotina, la vista de 1811 (tejados de ladrillo, una torre de iglesia, mástiles), cortinas
  rect(14, 16, 56, 80, CD.frisoS); rect(15, 17, 55, 79, hex('#e8e0cc'));
  for (let y = 20; y <= 75; y++) for (let x = 18; x <= 52; x++) B[y * 320 + x] = d_VACIOD;   // el cielo, vivo, se pinta detrás
  const tejado = (x0, x1, yt, c) => { for (let x = x0; x <= x1; x++) for (let y = yt; y <= 75; y++) if (x >= 18 && x <= 52) B[y * 320 + x] = y === yt ? d_mezclaD(c, 0xff000000, 0.4) : (y - yt) % 3 === 0 && x % 4 === 0 ? CD.ladrilloL : c; };
  tejado(18, 30, 60, CD.ladrillo); tejado(31, 40, 63, hex('#8a6a5a')); tejado(41, 52, 58, CD.ladrilloS); tejado(18, 24, 66, CD.brownS); tejado(44, 52, 68, hex('#6a5a5a'));
  rect(25, 55, 27, 60, CD.ladrilloS); rect(42, 51, 44, 58, CD.ladrilloS);   // chimeneas
  rect(34, 38, 37, 63, hex('#d8d0c0')); poligono([[33, 38], [35, 26], [38, 38]], hex('#8a9098')); rect(35, 42, 36, 46, hex('#3a3a44')); pset(35, 25, CD.laton);   // la torre de la iglesia
  for (const mx of [21, 48]) { rect(mx, 44, mx, 66, CD.mastilS); rect(mx - 3, 50, mx + 3, 50, CD.mastilS); }
  for (let y = 20; y <= 75; y++) for (let x = 18; x <= 52; x++) if (x === 35 || y === 38 || y === 57 || (x === 26 || x === 44) && y > 38) { if (B[y * 320 + x] !== d_VACIOD || true) B[y * 320 + x] = hex('#e8e0cc'); }
  rect(15, 47, 55, 48, hex('#d8d0bc')); rect(12, 79, 58, 81, hex('#d8d0bc')); rect(12, 82, 58, 82, CD.frisoS);
  for (const [x0, x1, d] of [[4, 16, 1], [54, 66, -1]]) for (let x = x0; x <= x1; x++) for (let y = 10; y < 90; y++) { const f = (x - x0 + y * 0.1) % 4, c = f < 1 ? CD.cortinaS : f < 2.5 ? CD.cortina : CD.cortinaL; if (y > 54 && Math.abs(x - (d > 0 ? x1 : x0)) < (y - 54) * 0.12) continue; B[y * 320 + x] = c; }
  rect(2, 8, 68, 10, CD.laton); rect(2, 11, 68, 11, CD.latonS); disco(2, 9, 2, CD.laton); disco(68, 9, 2, CD.laton);
  // el candelabro de pared con su vela
  rect(77, 34, 81, 42, CD.vela); rect(80, 34, 81, 42, CD.velaS); rect(74, 42, 84, 44, CD.laton); rect(78, 44, 80, 50, CD.latonS); rect(76, 50, 82, 52, CD.laton); pset(75, 42, CD.latonL);
  // el cuadro del barco en el puerto, con su marco dorado
  rect(94, 18, 152, 50, CD.latonS); rect(96, 20, 150, 48, CD.laton); rect(98, 22, 148, 46, hex('#9ab8c8'));
  for (let y = 36; y < 47; y++) for (let x = 98; x <= 148; x++) B[y * 320 + x] = (x + y) % 5 === 0 ? hex('#8ab0c0') : hex('#4a7a8a');
  for (let y = 22; y < 30; y++) for (let x = 98; x <= 148; x++) if (h(x >> 2, y >> 1, 505) < 0.3) B[y * 320 + x] = hex('#c8dce4');
  poligono([[112, 38], [138, 38], [134, 42], [116, 42]], hex('#3a2a20')); rect(124, 24, 124, 38, hex('#3a2a20')); rect(130, 27, 130, 38, hex('#3a2a20'));
  poligono([[118, 26], [124, 26], [124, 36], [117, 36]], hex('#f4ecd8')); poligono([[125, 28], [130, 28], [130, 36], [125, 36]], hex('#e4dcc8')); rect(150, 18, 152, 50, CD.latonS);
  // la carta del puerto enmarcada (costas y rumbos, sin letras)
  rect(178, 16, 238, 52, CD.nogalS); rect(180, 18, 236, 50, CD.papel);
  for (let y = 19; y < 50; y++) for (let x = 181; x < 236; x++) { const tierra = (x - 181) * 0.6 + Math.sin(y * 0.4) * 4 < 12 || (y > 38 && x > 214 + Math.sin(x * 0.3) * 2); if (tierra) B[y * 320 + x] = (x + y) % 3 ? CD.papelS : CD.papelB; else if ((y % 3) === 0 && h(x, y, 506) < 0.5) B[y * 320 + x] = CD.aguaMapaS; }
  for (let a = 0; a < 16; a++) linea(208, 33, 208 + Math.round(Math.cos(a * Math.PI / 8) * (a % 2 ? 5 : 9)), 33 + Math.round(Math.sin(a * Math.PI / 8) * (a % 2 ? 4 : 7)), a % 4 ? CD.tinta : CD.tintaR);
  disco(208, 33, 1, CD.tintaR);
  // el reloj de pie: caja de caoba, la esfera con sus horas en puntos, la puerta de cristal del péndulo
  rect(252, 28, 272, 96, CD.nogalS); rect(253, 30, 271, 96, CD.nogal); rect(250, 26, 274, 30, CD.nogalL); poligono([[252, 26], [262, 19], [272, 26]], CD.nogalL); pset(262, 18, CD.laton);
  disco(262, 40, 7, CD.laton); disco(262, 40, 6, hex('#f4ecd8')); for (let k = 0; k < 12; k++) pset(262 + Math.round(Math.cos(k * Math.PI / 6) * 5), 40 + Math.round(Math.sin(k * Math.PI / 6) * 5), CD.tinta);
  linea(262, 40, 262, 36, CD.tinta); linea(262, 40, 265, 41, CD.tinta);
  rect(257, 56, 267, 88, CD.nogalS); rect(258, 57, 266, 87, hex('#3a2418')); rect(258, 57, 258, 87, hex('#5a3a22')); pset(259, 58, CD.latonL);
  for (let y = 30; y < 96; y += 6) pset(270, y, CD.nogalB);
  // la librería de abajo (por debajo de la esquina de Atom): lomos de libros, un rollo de mapas, una botella de tinta
  rect(276, 52, 319, 96, CD.nogalS); for (const sy of [62, 76, 90]) rect(277, sy, 319, sy + 1, CD.nogalL);
  for (const [y0, y1] of [[54, 61], [68, 75], [82, 89]]) { let x = 278; let k = 0; while (x < 318) { const w = 2 + Math.floor(h(x, y0, 507) * 3), alto = y1 - y0 - Math.floor(h(x, y0, 508) * 3), c = [CD.cortina, CD.alfombraA, hex('#2a5a3a'), hex('#8a6a2a'), CD.brown][Math.floor(h(x, y1, 509) * 5)];
    if (k === 4 && y0 === 68) { rect(x, y1 - 3, x + 8, y1, CD.papel); rect(x, y1 - 3, x, y1, CD.papelS); x += 10; k++; continue; }
    rect(x, y1 - alto + 1, x + w - 1, y1, c); pset(x, y1 - alto + 2, CD.oroT); rect(x + w - 1, y1 - alto + 1, x + w - 1, y1, d_mezclaD(c, 0xff000000, 0.3)); x += w + 1; k++; } }
  // el globo terráqueo en su pie de madera
  { const gx = 300, gy = 120; rect(gx - 1, gy + 12, gx + 1, 168, CD.nogal); rect(gx - 8, 168, gx + 8, 171, CD.nogalS); rect(gx - 6, 167, gx + 6, 167, CD.nogalL); linea(gx - 6, 171, gx - 10, 176, CD.nogalS); linea(gx + 6, 171, gx + 10, 176, CD.nogalS);
    for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) { const d = Math.hypot(i, j); if (d > 11) continue; const tierra = Math.sin(i * 0.5 + 1) + Math.cos(j * 0.6) > 0.9 || (i > 2 && j > -2 && j < 6); let c = tierra ? hex('#c8b070') : hex('#6a9ab0'); if (d > 9) c = d_mezclaD(c, 0xff000000, 0.3); if (i < -3 && j < -3 && d < 7) c = d_mezclaD(c, 0xffffffff, 0.35); pset(gx + i, gy + j, c); }
    for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; pset(gx + Math.round(Math.cos(an) * 13), gy + Math.round(Math.sin(an) * 13), CD.laton); } }
  // el cesto con planos enrollados
  { rect(2, 150, 22, 176, CD.paja ?? hex('#c8a060')); for (let y = 150; y <= 176; y++) for (let x = 2; x <= 22; x++) B[y * 320 + x] = (x + y) % 3 === 0 ? hex('#a07a40') : (y % 4 === 0 ? hex('#8a6a34') : hex('#c8a060'));
    for (const [rx, ry, a] of [[6, 130, 0], [12, 126, 1], [17, 134, 2]]) { rect(rx - 1, ry, rx + 2, 152, CD.papel); rect(rx + 2, ry, rx + 2, 152, CD.papelS); rect(rx - 1, ry, rx + 2, ry, CD.papelL); pset(rx, ry, CD.papelB); if (a === 1) rect(rx - 1, ry + 8, rx + 2, ry + 9, CD.cortina); } }
  // la luz de la ventana que cae en diagonal sobre la pared
  d_luzD(R, 56, 16, 200, 92, (x, y) => { const s = x - 56 - (y - 16) * 0.9; return s > 0 && s < 50 && d_umbralD(x, y) < 0.5 ? 0.6 : 0; }, 0.18, hex('#fff4d0'));
}

// la capa fija de la mesa (va por delante de quien está detrás): el tablero de nogal con vetas, el canto, el faldón con
// sus cajones y las patas torneadas, el plano de la isla y los objetos de encima
function d_planosMesaD(R) {
  const { rect, pset, disco, linea } = R, B = R.buf, M = d_MESA_D;
  rect(26, 162, 294, 170, CD.nogalS); rect(26, 162, 294, 163, CD.nogalB); rect(26, 170, 294, 171, CD.nogalS);
  for (let x = 28; x < 292; x++) for (let y = 164; y < 170; y++) if (h(x >> 2, y, 510) < 0.25) pset(x, y, CD.nogal);
  for (const [x0, x1] of [[60, 140], [180, 260]]) { rect(x0, 164, x1, 169, CD.nogal); rect(x0, 164, x1, 164, CD.nogalL); rect(x1, 164, x1, 169, CD.nogalS); rect((x0 + x1) / 2 - 3, 166, (x0 + x1) / 2 + 3, 167, CD.laton); pset((x0 + x1) / 2 - 3, 166, CD.latonL); }
  for (const lx of [30, 284]) { for (let y = 171; y < 180; y++) { const w = y < 173 ? 4 : y < 176 ? 3 : 2; rect(lx - w + 3, y, lx + w + 3, y, y === 174 ? CD.nogalL : CD.nogal); pset(lx - w + 3, y, CD.nogalS); } }
  for (let y = M.y0; y <= M.y1; y++) { const [, , , v] = d_dePantallaD(0, y), a = Math.round(M.a0 + (M.a1 - M.a0) * v), b = Math.round(M.b0 + (M.b1 - M.b0) * v);
    for (let x = a; x <= b; x++) { const [px, py] = d_dePantallaD(x, y); let c;
      if (x === a || x === b || y === M.y0) c = CD.nogalB;
      else if (px < 0 || px > 1 || py < 0 || py > 1) { const veta = Math.sin(((x - 160) / (y + 60)) * 40 + h(Math.floor((x - 160) / (y + 60) * 25), 0, 511) * 6 + y * 0.05); c = veta > 0.85 ? CD.nogalL : veta < -0.7 ? CD.nogalS : CD.nogal; }
      else { const r = d_islaD(px), tierra = d_enIslaD(px, py), borde = px < 0.012 || px > 0.988 || py < 0.02 || py > 0.98;
        if (borde) c = CD.papelS;
        else if (tierra) { c = h(x, y, 512) < 0.06 ? CD.papelS : CD.papelL; if (!d_enIslaD(px + 0.008, py) || !d_enIslaD(px - 0.008, py) || !d_enIslaD(px, py + 0.025) || !d_enIslaD(px, py - 0.025)) c = CD.tinta; }
        else { const costa = r ? Math.abs(Math.abs(py - r[0]) - r[1]) : 1, otra = py < 0.1 || py > 0.92; c = otra ? (h(x, y, 513) < 0.1 ? CD.papelS : CD.granja) : CD.aguaMapa; if (!otra && y % 2 === 0 && (costa < 0.06 || h(x >> 3, y, 514) < 0.25)) c = CD.aguaMapaS; if (otra && (Math.abs(py - 0.1) < 0.012 || Math.abs(py - 0.92) < 0.012)) c = CD.tinta; }
        if (y % 7 === 0 && (x * 3 + y) % 5 === 0 && !tierra) c = d_mezclaD(c, CD.papelB, 0.3);
      }
      B[y * 320 + x] = c; } }
  // la sombra de los dobleces del papel
  for (const fx of [0.5]) { for (let y = M.y0 + 6; y < M.y1 - 4; y++) { const [px] = d_dePantallaD(0, y); void px; const [x] = d_papelPD(fx, (y - M.y0) / (M.y1 - M.y0) / 0.86 - 0.093); pset(Math.round(x), y, d_mezclaD(R.pget(Math.round(x), y), CD.papelB, 0.4)); } }
  // las colinas (hachures de grabado), los bosques, las granjas con sus casitas y sus campos, los caminos viejos y los arroyos
  const P = d_papelPD, dentro = (x, y) => { const [px, py] = d_dePantallaD(x, y); return d_enIslaD(px, py); };
  for (const [px, py, r] of [[0.24, 0.42, 7], [0.31, 0.66, 6], [0.43, 0.48, 9], [0.52, 0.34, 6], [0.6, 0.62, 8], [0.7, 0.42, 7], [0.8, 0.58, 9], [0.88, 0.45, 7], [0.37, 0.36, 5], [0.66, 0.74, 5]]) {
    const [cx, cy] = P(px, py);
    for (let a = 0; a < 18; a++) { const an = a / 18 * Math.PI * 2, r0 = r * 0.35, x0 = cx + Math.cos(an) * r0, y0 = cy + Math.sin(an) * r0 * 0.6, x1 = cx + Math.cos(an) * r, y1 = cy + Math.sin(an) * r * 0.6;
      linea(x0, y0, x1, y1, (xx, yy) => (dentro(xx, yy) ? (Math.sin(an) > 0.2 ? CD.colinaS : CD.colina) : null)); }
    pset(Math.round(cx), Math.round(cy), CD.colinaS); }
  for (let k = 0; k < 70; k++) { const px = 0.18 + h(k, 1, 515) * 0.76, py = 0.25 + h(k, 2, 515) * 0.56; if (!d_enIslaD(px, py) || h(k, 3, 515) < 0.35) continue; const [x, y] = P(px, py); const xx = Math.round(x), yy = Math.round(y); pset(xx, yy, CD.bosqueMapa); pset(xx + 1, yy, CD.bosqueMapa); pset(xx, yy - 1, d_mezclaD(CD.bosqueMapa, 0xffffffff, 0.3)); pset(xx + 1, yy + 1, CD.tinta); }
  for (let k = 0; k < 16; k++) { const px = 0.2 + h(k, 4, 516) * 0.7, py = 0.3 + h(k, 5, 516) * 0.45; if (!d_enIslaD(px, py)) continue; const [x, y] = P(px, py), xx = Math.round(x), yy = Math.round(y);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) if (dentro(xx + i, yy + j)) pset(xx + i, yy + j, (i + j * 2) % 3 === 0 ? CD.granjaS : CD.granja);
    pset(xx - 1, yy - 1, CD.ladrillo); pset(xx, yy - 1, CD.ladrillo); pset(xx - 1, yy - 2, CD.tinta); pset(xx, yy - 2, CD.tinta); }
  const camino = (pts, c) => { for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = P(...pts[i]), [bx, by] = P(...pts[i + 1]); linea(ax, ay, bx, by, (xx, yy, k) => (k % 3 < 2 ? c : null)); } };
  camino([[0.14, 0.52], [0.25, 0.47], [0.38, 0.42], [0.5, 0.38], [0.62, 0.36], [0.74, 0.4], [0.86, 0.38], [0.94, 0.45]], CD.colinaS);
  camino([[0.16, 0.6], [0.3, 0.62], [0.42, 0.67], [0.55, 0.64], [0.68, 0.7], [0.8, 0.66], [0.9, 0.6]], CD.colinaS);
  const arroyo = (pts) => { for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = P(...pts[i]), [bx, by] = P(...pts[i + 1]), n = Math.ceil(Math.hypot(bx - ax, by - ay));
    for (let s = 0; s <= n; s++) { const u = s / n, x = ax + (bx - ax) * u, y = ay + (by - ay) * u + Math.sin((i + u) * 5) * 1.2; pset(Math.round(x), Math.round(y), CD.arroyo); pset(Math.round(x), Math.round(y) - 1, CD.arroyoL); } } };
  arroyo([[0.26, 0.46], [0.24, 0.38], [0.22, 0.3], [0.2, 0.25]]); arroyo([[0.48, 0.52], [0.5, 0.62], [0.52, 0.72], [0.53, 0.8]]); arroyo([[0.62, 0.48], [0.6, 0.38], [0.6, 0.29]]);
  arroyo([[0.8, 0.52], [0.84, 0.62], [0.88, 0.72], [0.9, 0.79]]); arroyo([[0.36, 0.55], [0.34, 0.64], [0.33, 0.74]]);
  { const [cx, cy] = P(0.165, 0.55); disco(Math.round(cx), Math.round(cy), 3, CD.arroyo); pset(Math.round(cx) - 1, Math.round(cy) - 1, CD.arroyoL); }   // el estanque del Collect
  // la ciudad vieja en la punta sur: calles torcidas y manzanas apretadas
  for (let k = 0; k < 40; k++) { const px = 0.05 + h(k, 6, 517) * 0.1, py = 0.4 + h(k, 7, 517) * 0.28; if (!d_enIslaD(px, py)) continue; const [x, y] = P(px, py); pset(Math.round(x), Math.round(y), k % 3 ? CD.ciudadMapa : CD.ladrilloS); pset(Math.round(x) + 1, Math.round(y), CD.ciudadMapa); }
  for (let k = 0; k < 9; k++) { const a = h(k, 8, 518) * 3, px = 0.06 + h(k, 9, 518) * 0.08, py = 0.44 + h(k, 10, 518) * 0.2; d_trazoD(R, px, py, px + Math.cos(a) * 0.04, py + Math.sin(a) * 0.1, CD.tinta, 1, true); }
  // la rosa de los vientos y las orillas de enfrente (Nueva Jersey arriba, Brooklyn abajo) con sus árboles
  { const [rx, ry] = P(0.9, 0.16); for (let a = 0; a < 8; a++) linea(rx, ry, rx + Math.round(Math.cos(a * Math.PI / 4) * (a % 2 ? 3 : 6)), ry + Math.round(Math.sin(a * Math.PI / 4) * (a % 2 ? 2 : 4)), a === 6 ? CD.tintaR : CD.tinta); }
  for (let k = 0; k < 40; k++) { const px = h(k, 11, 519), py = k % 2 ? 0.02 + h(k, 12, 519) * 0.06 : 0.94 + h(k, 12, 519) * 0.04; const [x, y] = P(px, py); pset(Math.round(x), Math.round(y), CD.bosqueMapa); }
  // los objetos sobre la mesa: los candelabros en las esquinas de atrás (sujetan el papel), el tintero con la pluma, el
  // salvadera, el compás, la regla y la lupa
  for (const cx of [86, 234]) { R.disco(cx, 96, 5, CD.latonS); R.disco(cx, 95, 4, CD.laton); pset(cx - 2, 94, CD.latonL); rect(cx - 1, 88, cx + 1, 95, CD.laton); rect(cx - 2, 87, cx + 2, 87, CD.latonL); rect(cx - 1, 80 + 6, cx + 1, 86, CD.vela); rect(cx + 1, 80 + 6, cx + 1, 86, CD.velaS); }
  { const ix = 268, iy = 152; disco(ix, iy, 5, hex('#1a1a24')); disco(ix, iy - 2, 4, hex('#2a2a3a')); disco(ix, iy - 2, 2, hex('#0a0a12')); pset(ix - 2, iy - 4, hex('#8a8aa0')); linea(ix + 1, iy - 3, ix + 9, iy - 18, hex('#f4f0e4')); linea(ix + 2, iy - 4, ix + 11, iy - 17, hex('#d8d2c4')); linea(ix + 4, iy - 9, ix + 12, iy - 20, hex('#f4f0e4'));
    rect(252, 148, 257, 156, CD.laton); rect(252, 148, 257, 148, CD.latonL); rect(256, 149, 257, 156, CD.latonS); }
  { const x0 = 52, y0 = 150; linea(x0, y0, x0 + 18, y0 - 6, CD.latonS); linea(x0 + 1, y0, x0 + 19, y0 - 5, CD.laton); linea(x0, y0 + 1, x0 + 17, y0 + 3, CD.latonS); disco(x0 + 18, y0 - 5, 1, CD.latonL); }
  { linea(40, 158, 150, 156, CD.nogalB); linea(40, 159, 150, 157, CD.tarimaS); for (let x = 44; x < 150; x += 4) pset(x, 158 - Math.round((x - 40) / 55), CD.tinta); }
  { const lx = 206, ly = 150; for (let a = 0; a < 30; a++) { const an = a / 30 * Math.PI * 2; pset(lx + Math.round(Math.cos(an) * 5), ly + Math.round(Math.sin(an) * 3), CD.laton); } for (let j = -2; j <= 2; j++) for (let i = -4; i <= 4; i++) if ((i / 4.5) ** 2 + (j / 2.5) ** 2 < 1) pset(lx + i, ly + j, d_mezclaD(R.pget(lx + i, ly + j), 0xffffffff, 0.3)); pset(lx - 2, ly - 1, 0xffffffff); linea(lx + 5, ly + 2, lx + 12, ly + 5, CD.nogal); }
}

// el agua alta (aguas arriba) llega a y 100, la baja a y 106; la cámara de la esclusa va de x 218 a 286 entre sus compuertas
function d_canalD(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const fondo = d_capaD(R, 'canalFondo', () => d_canalFondoD(R)), delante = d_capaD(R, 'canalDelante', () => d_canalDelanteD(R));
  d_cieloD(R, t, { hor: 80, sol: [210, 26, 7], cumulos: 5 });
  d_gaviotasD(R, t, 120, 34, 70, 6, 2, 3);
  d_ponerD(R, fondo, 0, 124);
  // el agua: aguas arriba, la cámara (que se llena con o.esclusa) y aguas abajo
  const L = Math.round(106 - 6 * Math.max(0, Math.min(1, o.esclusa ?? 0))), cols = [hex('#6a9a8a'), hex('#5a8a7c'), hex('#4a7a6e'), hex('#3e6a60')];
  d_aguaD(R, t, 100, 124, cols, { x0: 0, x1: 213, quieta: true, v: 2, n: 40, luz: hex('#a8d0c4') });
  d_aguaD(R, t, L, 124, cols, { x0: 219, x1: 285, quieta: true, v: 2, n: 14, luz: hex('#a8d0c4') });
  d_aguaD(R, t, 106, 124, cols, { x0: 291, x1: 319, quieta: true, v: 2, n: 8, luz: hex('#a8d0c4') });
  for (let x = 219; x <= 285; x++) for (let y = 96; y < L; y++) pset(x, y, (y + (x >> 2)) % 5 === 0 ? CD.piedraS : y > L - 3 ? hex('#5e6a5a') : CD.piedra);   // la pared mojada de la cámara
  if ((o.esclusa ?? 0) > 0 && (o.esclusa ?? 0) < 1) { for (let k = 0; k < 10; k++) { const x = 222 + Math.round(h(k, 1, 550) * 60), y = L + 1 + Math.round(((t * 3 + k) % 1) * 6); pset(x, y, CD.aguaB); pset(x + 1, y, hex('#e8f4f0')); }   // el agua que entra
    for (let j = 0; j < 3; j++) for (let k = 0; k < 4; k++) { const u = (t * 2 + k / 4) % 1; pset(219 + Math.round(u * 6), 104 + j * 4 + Math.round(u * u * 3), CD.aguaB); } }
  // el barco de pasajeros dentro de la cámara de la esclusa, que sube con el agua: casco, la cabina blanca con ventanas y
  // viajeros en el techo
  { const wy = L + 11, bx = 226; rect(bx, wy - 4, bx + 52, wy, hex('#5a3a22')); rect(bx, wy - 4, bx + 52, wy - 4, hex('#c89a5a')); rect(bx + 6, wy - 11, bx + 46, wy - 5, hex('#f0ead8')); rect(bx + 6, wy - 11, bx + 46, wy - 11, hex('#a83a2a'));
    for (let i = bx + 9; i < bx + 44; i += 5) rect(i, wy - 9, i + 2, wy - 7, hex('#3a4a5a')); for (let k = 0; k < 4; k++) d_genteD(R, bx + 12 + k * 9, wy - 12, t, k + 2, { alto: 8, sombrero: k % 2 ? 'copa' : 'cofia', falda: k % 2 === 0 }); }
  // los reflejos de los sauces de la otra orilla
  for (const sx of [24, 118, 184]) for (let y = 101; y < 110; y++) for (let x = sx - 9; x <= sx + 9; x++) if (Math.abs(x - sx) < 10 - (y - 100) && d_umbralD(x, y) < 0.4 && (y + Math.floor(t * 2)) % 3) pset(x + Math.round(Math.sin(t * 2 + y) * 0.6), y, hex('#3e6a4e'));
  // la barcaza de trigo (o.barcaza 0–1 la lleva de izquierda a derecha; si no, avanza sola) y su timonel
  const u = o.barcaza != null ? o.barcaza : ((t * 0.035 + 0.3) % 1), bx = Math.round(-70 + u * 270), by = 116 + Math.round(Math.sin(t * 1.3) * 0.5);
  const barc = d_barcazaD(R, bx, by, t);
  d_ponerD(R, delante, 94, 179);
  // las mulas tiran por el camino de sirga, con el muchacho detrás; la sirga va de la proa a la collera
  const mx = bx + 110, my = 140;
  const m1 = d_caballoD(R, mx, my, t, 1, { c: hex('#7a6a5a'), cS: hex('#5a4a3e'), cL: hex('#9a8a78'), crin: hex('#3a2e26') }), m2 = d_caballoD(R, mx - 26, my, t + 0.4, 1, { c: hex('#6a5a4a'), cS: hex('#4a3e32'), cL: hex('#8a7a66'), crin: hex('#2e2620') });
  for (const m of [m1, m2]) { const [hx, hy] = m.cabeza; pset(hx - 2, hy - 2, hex('#5a4a3e')); pset(hx - 2, hy - 3, hex('#5a4a3e')); pset(hx - 1, hy - 3, hex('#5a4a3e')); pset(hx - 1, hy - 4, hex('#3a2e26')); rect(m.pecho[0] - 2, m.pecho[1] - 2, m.pecho[0], m.pecho[1] + 2, hex('#3a2418')); }   // orejas largas y collera
  linea(m2.pecho[0], m2.pecho[1], m1.lomo[0] - 4, m1.lomo[1] + 3, hex('#3a2a1a'));
  { const [ax, ay] = barc.proa, [cx, cy] = m2.lomo, n = 24; let px = ax, py = ay; for (let i = 1; i <= n; i++) { const f = i / n, x = ax + (cx - ax) * f, y = ay + (cy - ay) * f + Math.sin(f * Math.PI) * 3; linea(px, py, x, y, hex('#4a3a28')); px = x; py = y; } }
  d_genteD(R, mx - 46, 141, t, 3, { alto: 11, anda: true, sombrero: 'gorra', ropa: hex('#5a4a3a') });
  // el esclusero que va y viene por la pasarela de la compuerta
  { const v = Math.sin(t * 0.5), x = Math.round(262 + v * 18); d_genteD(R, x, 94, t, 5, { alto: 10, anda: Math.abs(Math.cos(t * 0.5)) > 0.2, dir: Math.cos(t * 0.5) > 0 ? 1 : -1, sombrero: 'copa', ropa: hex('#3a4a6a') }); }
  // la racha de viento que cruza el prado de izquierda a derecha cada 9 s: dobla más la hierba y le saca brillo
  const racha = (x) => { const g = ((t * 34) % 300) - 60 - x; return g > -30 && g < 0 ? Math.sin(-g / 30 * Math.PI) : 0; };
  // la hierba alta y las flores de la orilla de delante, que mueve el viento
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 551) * 319), y = 150 + Math.round(h(k, 2, 551) * 28), r = racha(x), a = Math.round(Math.sin(t * 2.1 + x * 0.13) * 1.5 + r * 3), l = 4 + Math.round(h(k, 3, 551) * 5);
    linea(x, y, x + a, y - l, r > 0.4 ? CD.hierbaL : k % 3 ? CD.hierbaS : CD.hierba); if (k % 5 === 0) { pset(x + a, y - l - 1, [hex('#f0d040'), hex('#f4f0f0'), hex('#c060c0')][k % 3]); } }
  // las espigas silvestres de la orilla (gramíneas con la cabeza de grano), que cabecean con la racha
  for (let k = 0; k < 14; k++) { const x = Math.round(8 + h(k, 5, 551) * 304), y = 151 + Math.round(h(k, 6, 551) * 8), r = racha(x), a = Math.sin(t * 1.8 + k) * 1.2 + r * 3, l = 8 + Math.round(h(k, 7, 551) * 4), tx = Math.round(x + a), ty = y - l;
    if (Math.abs(x - 158) < 12) continue; linea(x, y, tx, ty, hex('#8a9a4a')); pset(tx, ty, hex('#d8c878')); pset(tx + Math.sign(a || 1), ty + 1, hex('#c8b468')); pset(tx, ty + 1, hex('#b8a458')); }
  // las aneas de la orilla, que se mecen
  for (let k = 0; k < 18; k++) { const x = Math.round(30 + h(k, 4, 551) * 260), y = 148 + (k % 3), a = Math.sin(t * 1.6 + x * 0.2) * 1.2; if (Math.abs(x - 150) < 10) continue;
    linea(x, y, x + Math.round(a), y - 9, CD.hierbaS); rect(Math.round(x + a * 0.8), y - 9, Math.round(x + a * 0.8), y - 7, hex('#6a3e24')); linea(x + 1, y, x + 2 + Math.round(a), y - 6, CD.hierba); }
  // las mariposas
  for (let k = 0; k < 2; k++) { const x = Math.round(80 + k * 140 + Math.sin(t * 0.8 + k) * 30), y = Math.round(150 + Math.sin(t * 1.7 + k * 2) * 6), a = Math.sin(t * 14 + k) > 0; pset(x, y, hex('#f4d040')); pset(x + 1, y, hex('#f4d040')); if (a) { pset(x, y - 1, hex('#f8e070')); pset(x + 1, y - 1, hex('#f8e070')); } }
  // las abejas que van de flor en flor
  for (let k = 0; k < 3; k++) { const fx = [70, 238, 124][k], fy = [154, 158, 170][k], u = t * (0.9 + k * 0.3) + k * 2, x = Math.round(fx + Math.sin(u) * 14 + Math.sin(u * 3.1) * 3), y = Math.round(fy + Math.cos(u * 1.3) * 4 + Math.sin(u * 5) * 1);
    pset(x, y, hex('#f0c020')); pset(x + 1, y, hex('#1a1a1a')); if (Math.floor(t * 20 + k) % 2) pset(x, y - 1, hex('#e8f0f8')); }
  // el saltamontes, que salta en arco de vez en cuando
  { const c = (t + 1.3) % 4.2, sx = 108 + Math.floor((t + 1.3) / 4.2) % 3 * 34; let x = sx, y = 158;
    if (c > 3.4) { const u = (c - 3.4) / 0.8; x = Math.round(sx + u * 22); y = Math.round(158 - Math.sin(u * Math.PI) * 9); }
    pset(x, y, hex('#6aa83a')); pset(x + 1, y, hex('#6aa83a')); pset(x + 2, y - 1, hex('#8ac84a')); pset(x - 1, y + 1, hex('#4a7a2a')); pset(x + 1, y + 1, hex('#4a7a2a')); }
  // el conejo junto a la topera: mordisquea, levanta las orejas y da un saltito
  { const c = t % 7, sal = c > 5.6 && c < 6.1 ? Math.round(Math.sin((c - 5.6) / 0.5 * Math.PI) * 3) : 0, x = 212 + (c > 5.85 ? 2 : 0), y = 165 - sal, alerta = c > 3 && c < 5.6, mord = !alerta && Math.floor(t * 6) % 2;
    const co = hex('#8a6a4a'), coS = hex('#6a4e34'), coL = hex('#a88a64');
    rect(x - 3, y - 3, x + 2, y, co); rect(x - 3, y, x + 2, y, coS); pset(x - 4, y - 2, hex('#f4f0e8')); pset(x - 4, y - 1, hex('#e8e0d4'));   // el cuerpo y el rabo de algodón
    rect(x + 2, y - 5 + (mord ? 1 : 0), x + 4, y - 2 + (mord ? 1 : 0), co); pset(x + 4, y - 4 + (mord ? 1 : 0), C.k); pset(x + 5, y - 3 + (mord ? 1 : 0), hex('#d89a8a'));
    const oy = y - 5 + (mord ? 1 : 0); if (alerta) { rect(x + 2, oy - 4, x + 2, oy - 1, coL); rect(x + 3, oy - 4, x + 3, oy - 1, co); } else { linea(x + 2, oy - 1, x, oy - 3, coL); linea(x + 3, oy - 1, x + 1, oy - 3, co); }
    pset(x - 2, y + 1, coS); pset(x + 2, y + 1, coS); pset(x - 2, y - 3, coL); }
  // los vilanos de los dientes de león que se lleva el viento
  for (let k = 0; k < 6; k++) { const u = (t * 0.07 + k / 6) % 1, x = Math.round(-10 + u * 340), y = Math.round(160 - u * 38 + Math.sin(t * 2 + k * 2) * 3 + h(k, 9, 551) * 10); if (y < 104 || (x > 272 && y < 48)) continue; pset(x, y, hex('#f8f8f0')); pset(x - 1, y, hex('#d8d8d0')); }
  // las matas grandes del primer término, que se mecen y se doblan con la racha
  for (const [x, l, n] of [[120, 13, 7], [204, 11, 6], [246, 15, 8], [6, 12, 6]]) { const r = racha(x);
    for (let b = 0; b < n; b++) { const a = (b / (n - 1) - 0.5) * 1.4, sw = Math.sin(t * 1.9 + x + b * 0.4) * 1.3 + r * 4, ll = l - Math.abs(b - n / 2) * 1.2, tx = Math.round(x + Math.sin(a) * ll * 0.8 + sw), ty = Math.round(180 - Math.cos(a) * ll);
      linea(x, 180, tx, ty, (xx, yy, j) => (j < 3 ? hex('#3e6a26') : b % 2 ? CD.hierbaS : CD.hierba)); pset(tx, ty, r > 0.4 ? hex('#c8d878') : CD.hierbaL); }
    pset(x + 2, 180 - l + 2, hex('#f8f6f0')); pset(x + 3, 180 - l + 2, hex('#f0c040')); }
  return { suelo: 168, pies: [24, 300], camino: 140, agua: [100, 124], nivel: L, barcaza: [bx, by], proa: barc.proa, mulas: [mx, my], esclusa: [218, 286], compuertas: [216, 288] };
}
// la barcaza: casco de tablas con su franja, la carga de sacos de trigo, la cabina de popa con la chimenea humeante, el
// timón y el poste de la sirga en la proa; (x, y): el extremo de popa en la línea de flotación
function d_barcazaD(R, x, y, t) {
  const { rect, pset, linea, poligono } = R, L = 74;
  // el casco
  for (let i = 0; i <= L; i++) { const xx = x + i, curva = i < 4 ? 4 - i : i > L - 5 ? i - (L - 5) : 0, top = y - 9 + Math.round(curva * 0.3), bot = y + 1 - Math.round(curva * 0.8);
    for (let yy = top; yy <= bot; yy++) pset(xx, yy, yy === top ? hex('#c89a5a') : yy === top + 1 ? hex('#3a2a1e') : (yy - top) % 3 === 0 ? hex('#5a3a22') : yy > bot - 2 ? hex('#4a2e1a') : hex('#7a5232')); }
  rect(x + 3, y - 6, x + L - 4, y - 6, hex('#d8c070'));   // la franja pintada
  for (let i = 6; i < L - 4; i += 8) pset(x + i, y - 4, hex('#3a2a1e'));
  // la carga de sacos, en tres filas
  for (let r = 0; r < 3; r++) for (let i = 0; i < 9 - r * 2; i++) { const sx = x + 22 + r * 6 + i * 5, sy = y - 12 - r * 4; rect(sx, sy, sx + 4, sy + 3, hex('#d8c48a')); rect(sx, sy + 3, sx + 4, sy + 3, hex('#a8945a')); pset(sx + 1, sy, hex('#f0e0b0')); pset(sx + 4, sy + 1, hex('#b8a46a')); }
  // la cabina de popa con su ventanita, la chimenea y el humo
  rect(x + 4, y - 17, x + 19, y - 9, hex('#3a2a1e')); rect(x + 5, y - 16, x + 18, y - 9, hex('#c84a34')); rect(x + 5, y - 16, x + 18, y - 16, hex('#e86a4a')); rect(x + 9, y - 14, x + 12, y - 12, hex('#f0d890')); rect(x + 3, y - 18, x + 20, y - 17, hex('#2a2018'));
  rect(x + 15, y - 22, x + 16, y - 18, hex('#2a2a2a')); d_humoD(R, x + 15, y - 23, t, { alto: 16, viento: -10, r: 2, n: 5, c: hex('#9a9a9a') });
  // el timón y el timonel
  linea(x + 1, y - 9, x - 4, y - 4, hex('#5a3a22')); linea(x + 2, y - 10, x - 5, y - 13, hex('#3a2a1e'));
  d_genteD(R, x + 2, y - 10, t, 6, { alto: 9, sombrero: 'copa', ropa: hex('#4a3a5a'), dir: 1 });
  // el poste de la sirga en la proa
  rect(x + L - 9, y - 16, x + L - 8, y - 9, hex('#3a2a1e')); pset(x + L - 9, y - 17, hex('#c89a5a'));
  return { proa: [x + L - 8, y - 15] };
}

// la capa del fondo del canal: colinas con campos de cultivo a cuadros, la granja con su granero rojo y su silo, las vacas,
// los sauces, la casa del esclusero, el muro de piedra de la otra orilla y las paredes de la esclusa
function d_canalFondoD(R) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf;
  // dos filas de colinas: la lejana azulada y la cercana con campos a cuadros, setos y árboles
  for (let x = 0; x < 320; x++) { const y1 = Math.round(66 - 8 * Math.sin(x * 0.017 + 1) - 4 * Math.sin(x * 0.05)), y2 = Math.round(80 - 6 * Math.sin(x * 0.022 + 3) - 3 * Math.sin(x * 0.07 + 1));
    for (let y = y1; y < 80; y++) B[y * 320 + x] = y < y1 + 1 ? hex('#8aa4b4') : d_umbralD(x, y) < (y - y1) / 18 ? hex('#7a9aa0') : hex('#8aa8b4');
    for (let y = y2; y < 96; y++) { const cx = Math.floor((x + (y - y2) * 1.4) / 22), cy = Math.floor((y - y2) / 5), k = h(cx, cy, 552), c = k < 0.3 ? hex('#8aaa4a') : k < 0.55 ? hex('#c8b85a') : k < 0.8 ? hex('#6a9a3e') : hex('#a8a24a');
      B[y * 320 + x] = y === y2 ? hex('#5a7a3a') : ((x + Math.round((y - y2) * 1.4)) % 22 === 0 || (y - y2) % 5 === 0) ? hex('#4a6a34') : (k > 0.3 && k < 0.55 && x % 2 === 0) ? hex('#b0a04a') : c; }
    if (h(x, 1, 553) < 0.08) { const yy = y2 + 1 + Math.floor(h(x, 2, 553) * 8); rect(x - 1, yy - 2, x + 1, yy, hex('#3e6a2e')); pset(x, yy - 3, hex('#4e7a3a')); } }
  // la granja: la casa blanca de tablas con su chimenea, el granero rojo con su tejado a dos aguas y el silo
  { const gx = 136; rect(gx, 78, gx + 22, 95, hex('#e8e0cc')); for (let y = 80; y < 95; y += 2) rect(gx, y, gx + 22, y, hex('#c8c0ac')); poligono([[gx - 2, 78], [gx + 11, 68], [gx + 24, 78]], hex('#5a4a44')); linea(gx - 2, 78, gx + 11, 68, hex('#3a2e2a'));
    for (const wx of [gx + 3, gx + 15]) { rect(wx, 82, wx + 3, 86, hex('#3a4a5a')); pset(wx, 82, hex('#8ab0c8')); } rect(gx + 9, 87, gx + 12, 95, hex('#6a3a24')); rect(gx + 17, 64, gx + 19, 72, CD.ladrilloS);
    const bx = 162; rect(bx, 76, bx + 26, 95, hex('#a83a2a')); for (let x = bx; x <= bx + 26; x += 3) rect(x, 77, x, 95, hex('#8a2a20')); poligono([[bx - 2, 77], [bx + 13, 64], [bx + 28, 77]], hex('#6a4a3a')); rect(bx + 9, 82, bx + 17, 95, hex('#5a1e18')); linea(bx + 9, 82, bx + 17, 95, hex('#e8e0cc')); linea(bx + 17, 82, bx + 9, 95, hex('#e8e0cc')); rect(bx + 11, 70, bx + 15, 73, hex('#e8e0cc'));
    rect(bx + 28, 66, bx + 34, 95, hex('#b8b0a0')); disco(bx + 31, 66, 3, hex('#8a8a92')); for (let y = 70; y < 95; y += 4) rect(bx + 28, y, bx + 34, y, hex('#9a9284'));
    for (let x = 120; x < 210; x += 4) { rect(x, 92, x, 96, hex('#8a7a5a')); } rect(120, 93, 210, 93, hex('#a8987a')); }
  // las vacas que pastan en el prado
  for (const [vx, vy, k] of [[92, 86, 0], [104, 88, 1], [214, 84, 2]]) { rect(vx, vy - 3, vx + 6, vy - 1, k === 1 ? hex('#6a3e24') : hex('#f0ece0')); pset(vx + 2, vy - 3, C.k); pset(vx + 4, vy - 2, C.k); rect(vx + 6, vy - 3, vx + 7, vy - 2, k === 1 ? hex('#6a3e24') : hex('#f0ece0')); pset(vx + 7, vy - 1, hex('#e8a0a0')); pset(vx, vy, C.k); pset(vx + 5, vy, C.k); }
  // la orilla de enfrente: la hierba, el murete de piedra y los sauces llorones
  for (let y = 94; y < 100; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y < 96 ? (h(x, y, 554) < 0.3 ? CD.hierbaS : CD.hierba) : ((x + (y % 2) * 3) % 6 === 0 || y === 99) ? CD.piedraS : h(x >> 1, y, 555) < 0.2 ? CD.piedraL : CD.piedra;
  for (const sx of [24, 118, 184]) { rect(sx - 1, 76, sx + 1, 96, hex('#5a4a34')); for (let k = 0; k < 40; k++) { const a = (k / 40) * Math.PI, l = 6 + Math.round(h(k, sx, 556) * 12), x0 = sx + Math.round(Math.cos(a) * (6 + h(k, sx, 557) * 6)), y0 = 70 + Math.round(Math.sin(a) * -4); for (let j = 0; j < l; j++) pset(x0 + Math.round(j * 0.15 * Math.cos(a)), y0 + j, j < 2 ? hex('#a8c86a') : (k + j) % 3 ? hex('#7aa04a') : hex('#5a8a3a')); }
    disco(sx, 70, 6, hex('#8ab05a')); disco(sx - 2, 68, 3, hex('#a8c86a')); }
  // la casa del esclusero y las paredes de piedra de la esclusa (con la cámara entre las compuertas)
  { rect(240, 78, 264, 93, hex('#f0e8d4')); for (let y = 80; y < 93; y += 2) rect(240, y, 264, y, hex('#d0c8b4')); poligono([[238, 79], [252, 70], [266, 79]], hex('#4a5a6a')); rect(250, 84, 254, 93, hex('#3a5a7a')); rect(243, 82, 247, 86, hex('#3a4a5a')); rect(257, 82, 261, 86, hex('#3a4a5a')); pset(244, 83, hex('#a8d0e8'));
    rect(258, 66, 260, 74, CD.ladrilloS); rect(270, 84, 271, 93, CD.mastil); rect(266, 86, 275, 88, hex('#e8e0cc')); }
  for (let y = 90; y < 100; y++) for (let x = 210; x < 296; x++) B[y * 320 + x] = ((x + ((y >> 2) % 2) * 4) % 8 === 0 || y % 4 === 0) ? CD.piedraS : h(x >> 2, y >> 2, 558) < 0.25 ? CD.piedraL : CD.piedra;
  rect(210, 89, 296, 89, CD.piedraL);
  for (let x = 286; x < 320; x++) for (let y = 100; y < 106; y++) B[y * 320 + x] = (x % 7 === 0 || y === 103) ? CD.piedraS : CD.piedra;   // aguas abajo se ve más muro
  for (let y = 100; y < 125; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (x <= 213 || (x >= 219 && x <= 285 && y >= 94) || (x >= 291 && y >= 106)) B[i] = d_VACIOD; }
}

// la capa de delante del canal: las compuertas de madera con sus vigas de maniobra y la pasarela, el bordillo de piedra,
// el camino de sirga con rodadas y huellas, la orilla de hierba con flores, un mojón y piedras
function d_canalDelanteD(R) {
  const { rect, pset, linea } = R, B = R.buf;
  for (const gx of [214, 286]) { for (let y = 92; y <= 124; y++) for (let x = gx; x <= gx + 4; x++) B[y * 320 + x] = x === gx ? hex('#2a1e14') : (y % 6 === 0) ? hex('#4a3420') : x === gx + 4 ? hex('#5a3e24') : hex('#7a5634');
    rect(gx - 1, 98, gx + 5, 99, CD.hierro); rect(gx - 1, 112, gx + 5, 113, CD.hierro); rect(gx - 3, 90, gx + 7, 91, hex('#8a6a44')); rect(gx - 3, 85, gx - 3, 90, hex('#5a3e24')); rect(gx + 7, 85, gx + 7, 90, hex('#5a3e24')); rect(gx - 3, 85, gx + 7, 85, hex('#8a6a44')); }
  // el bordillo de piedra del canal y el camino de sirga
  for (let y = 124; y < 150; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 128) c = y === 124 ? CD.piedraL : (x + (y % 2) * 5) % 10 === 0 ? CD.piedraS : CD.piedra;
    else if (y < 146) { const rod = Math.abs(y - 134) < 1 || Math.abs(y - 141) < 1, hue = (y === 137 || y === 140) && (x * 7 + y) % 9 === 0; c = rod ? CD.tierraS : hue ? CD.tierraS : h(x, y, 559) < 0.08 ? CD.tierraL : h(x >> 1, y, 560) < 0.12 ? CD.tierraS : CD.tierra; if (y < 130 && h(x, y, 561) < 0.4) c = CD.hierbaS; }
    else c = h(x, y, 562) < 0.3 ? CD.hierbaS : CD.hierba;
    B[y * 320 + x] = c; }
  // las vigas de maniobra de las compuertas, que salen sobre el camino
  for (const gx of [216, 288]) { for (let i = 0; i < 26; i++) { const x = gx + i, y = 124 + Math.round(i * 0.2); rect(x, y, x, y + 2, i % 7 === 0 ? hex('#4a3420') : hex('#7a5634')); pset(x, y, hex('#a07a4a')); } }
  // el prado de delante (y 150–179): manchas grandes de hierba más oscura, más jugosa y más agostada, con el trazo vertical
  // de las briznas, que se hace más largo cuanto más cerca
  const PR = { osc: hex('#4e7e2e'), mid: hex('#5e8e36'), sec: hex('#8aa04a'), seca: hex('#a8a456'), trebol: hex('#3e6e2a'), treboL: hex('#5a9a3a') };
  for (let y = 150; y < 180; y++) { const L = 2 + Math.floor((y - 150) / 7);
    for (let x = 0; x < 320; x++) { const m = h(x >> 4, (y - 146) >> 3, 570) * 0.55 + h(x >> 3, y >> 2, 571) * 0.45, k = h(x, y, 563);
      let c = m < 0.3 ? PR.mid : m < 0.66 ? CD.hierba : m < 0.84 ? PR.sec : PR.seca;
      const col = h(x, Math.floor((y + (x % 5)) / L), 572);   // las briznas: trazos verticales de largo L
      if (col < 0.22) c = d_mezclaD(c, 0xff000000, 0.2); else if (col > 0.86) c = d_mezclaD(c, 0xffffffff, 0.16);
      if (k < 0.05) c = PR.osc; else if (k > 0.975) c = CD.hierbaL;
      B[y * 320 + x] = c; } }
  // los corros de trébol con sus florecillas blancas
  for (const [cx, cy, rx, ry] of [[66, 156, 14, 3], [232, 160, 16, 3], [112, 174, 18, 4], [300, 154, 10, 2], [20, 166, 10, 3]])
    for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e > 1 || h(x, y, 573) < e * 0.6) continue;
      B[y * 320 + x] = (x + y * 2) % 3 === 0 ? PR.treboL : PR.trebol; if (h(x, y, 574) < 0.05) B[y * 320 + x] = hex('#f4f0e4'); }
  // una calva de tierra con una topera recién hecha
  { const tx = 226, ty = 170; for (let y = ty - 3; y <= ty + 2; y++) for (let x = tx - 9; x <= tx + 9; x++) { const e = ((x - tx) / 9) ** 2 + ((y - ty + 0.5) / 2.6) ** 2; if (e < 1 && h(x, y, 575) > e * 0.5) B[y * 320 + x] = h(x, y, 576) < 0.3 ? CD.tierraS : CD.tierra; }
    for (let j = 0; j < 4; j++) for (let i = -4 + j; i <= 4 - j; i++) B[(ty - 1 - j) * 320 + tx + i] = j === 3 || i === -4 + j ? CD.tierraL : h(i, j, 577) < 0.3 ? CD.barro : CD.tierra; }
  for (let x = 0; x < 320; x++) { const y = 146 + Math.round(Math.sin(x * 0.2) * 1.2); for (let yy = y; yy < 150; yy++) B[yy * 320 + x] = CD.hierba; }
  // el mojón de piedra y la cerca de troncos del primer término
  rect(20, 140, 27, 156, CD.piedraS); rect(21, 139, 26, 155, CD.piedra); rect(21, 139, 26, 140, CD.piedraL); rect(22, 145, 25, 145, CD.piedraS); rect(22, 148, 24, 148, CD.piedraS);
  // la senda pisada que baja en diagonal por la orilla, con guijarros
  for (let y = 150; y < 180; y++) { const xc = 150 + (y - 150) * 1.6, w = 6 + (y - 150) * 0.25; for (let x = Math.round(xc - w); x <= Math.round(xc + w); x++) { const borde = Math.abs(x - xc) > w - 1.5; B[y * 320 + x] = borde ? (h(x, y, 565) < 0.5 ? CD.hierbaS : CD.tierraL) : h(x, y, 566) < 0.1 ? CD.gravaS : h(x >> 1, y, 567) < 0.2 ? CD.tierraL : hex('#b49a6e'); } }
  // las matas de briznas en abanico (más grandes cuanto más cerca), con su sombra; las flores del prado en corros:
  // dientes de león, margaritas, amapolas y campanillas, y algunas piedras sueltas; la senda queda limpia
  const senda = (x, y) => { const xc = 150 + (y - 150) * 1.6, w = 6 + (y - 150) * 0.25; return Math.abs(x - xc) < w + 3; };
  for (let y = 153; y < 180; y += 3) for (let k = 0; k < 15; k++) { const x = Math.round(h(k, y, 578) * 319), s = 1 + (y - 150) / 10; if (senda(x, y) || h(k, y, 579) < 0.3) continue;
    for (let i = -3; i <= 3; i++) B[Math.min(179, y + 1) * 320 + Math.max(0, Math.min(319, x + i))] = PR.osc;
    const nb = 3 + Math.floor(s); for (let b = 0; b < nb; b++) { const a = (b / (nb - 1) - 0.5) * 1.6, l = Math.round(s * (3 + h(b, k + y, 580) * 2)), tx = x + Math.round(Math.sin(a) * l * 0.7), ty = y - Math.round(Math.cos(a) * l);
      linea(x, y, tx, ty, (xx, yy, j) => (j < 2 ? PR.osc : j < l * 0.6 ? CD.hierbaS : CD.hierba)); if (ty >= 0) B[ty * 320 + tx] = b % 2 ? CD.hierbaL : PR.sec; } }
  const flor = (x, y, tipo) => { if (senda(x, y) || y > 179) return; const P = (xx, yy, c) => { if (xx >= 0 && xx < 320 && yy >= 150 && yy < 180) B[yy * 320 + xx] = c; };
    P(x, y + 1, CD.hierbaS); P(x, y + 2, CD.hierbaS);
    if (tipo === 0) { P(x, y, hex('#f0c828')); P(x + 1, y, hex('#f8e060')); P(x, y - 1, hex('#f8e060')); P(x - 1, y, hex('#d8a818')); }   // diente de león
    else if (tipo === 1) { P(x, y, hex('#f0c040')); for (const [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) P(x + i, y + j, hex('#f8f6f0')); }   // margarita
    else if (tipo === 2) { P(x, y, hex('#d83a2a')); P(x + 1, y, hex('#e85a3a')); P(x, y - 1, hex('#f07a4a')); P(x + 1, y + 1, hex('#2a1a1a')); }   // amapola
    else { P(x, y, hex('#7a6ad0')); P(x, y - 1, hex('#9a8ae8')); P(x - 1, y + 1, CD.hierbaS); } };   // campanilla
  for (let g = 0; g < 16; g++) { const cx = Math.round(h(g, 1, 581) * 319), cy = 154 + Math.round(h(g, 2, 581) * 24), tipo = g % 4, n = 3 + Math.floor(h(g, 3, 581) * 5);
    for (let k = 0; k < n; k++) flor(cx + Math.round((h(g, k, 582) - 0.5) * 16), cy + Math.round((h(g, k, 583) - 0.5) * 6), (tipo + (k % 5 === 4 ? 1 : 0)) % 4); }
  for (const [px, py] of [[132, 160], [206, 176], [244, 154], [96, 178], [38, 170]]) { if (senda(px, py)) continue; for (let i = -2; i <= 2; i++) B[py * 320 + px + i] = CD.piedraS; for (let i = -1; i <= 1; i++) B[(py - 1) * 320 + px + i] = CD.piedra; B[(py - 1) * 320 + px - 1] = CD.piedraL; B[(py + 1) * 320 + px] = PR.osc; }
  // el poste indicador con sus dos tablas en flecha (un barco y una casita, sin letras)
  { const px = 44; rect(px, 128, px + 1, 160, hex('#6a4a2e')); for (const [y, d, ic] of [[130, 1, 0], [138, -1, 1]]) { const x0 = d > 0 ? px + 2 : px - 17; rect(x0, y, x0 + 15, y + 5, hex('#c8a46a')); rect(x0, y + 5, x0 + 15, y + 5, hex('#8a6a3e')); pset(d > 0 ? x0 + 16 : x0 - 1, y + 2, hex('#c8a46a')); pset(d > 0 ? x0 + 16 : x0 - 1, y + 3, hex('#c8a46a'));
      if (ic === 0) { rect(x0 + 4, y + 3, x0 + 11, y + 3, hex('#3a2a1a')); rect(x0 + 7, y + 1, x0 + 7, y + 2, hex('#3a2a1a')); } else { rect(x0 + 5, y + 2, x0 + 10, y + 4, hex('#3a2a1a')); pset(x0 + 7, y + 1, hex('#3a2a1a')); pset(x0 + 8, y + 1, hex('#3a2a1a')); } } }
  // unas piedras y una mata de cardos en el primer término (los pies de los personajes van en y 168)
  for (const [px, py, r] of [[292, 176, 4], [300, 178, 3], [8, 177, 3]]) for (let j = -r; j <= 0; j++) for (let i = -r - 1; i <= r + 1; i++) if ((i / (r + 1.5)) ** 2 + (j / r) ** 2 < 1) pset(px + i, py + j, j === -r || i < -r + 1 ? CD.piedraL : j > -2 ? CD.piedraS : CD.piedra);
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 564) * 319), y = 152 + Math.round(h(k, 2, 564) * 26); pset(x, y, [hex('#f0d040'), hex('#f4f0f0'), hex('#c060c0'), hex('#e85a4a')][k % 4]); pset(x, y + 1, CD.hierbaS); }
}
// la borda de atrás va de (0, 136) a (210, 140); la de la derecha baja de (210, 140) a (252, 180); por fuera, el agua
const d_bordaD = (y) => 210 + (y - 140) * 1.05;

function d_bodaD(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const fondo = d_capaD(R, 'bodaFondo', () => d_bodaFondoD(R)), cubierta = d_capaD(R, 'bodaCubierta', () => d_bodaCubiertaD(R));
  d_cieloD(R, t, { hor: 96, modo: 'fiesta', sol: [52, 26, 7], cumulos: 4 });
  d_aguaD(R, t, 96, 179, [hex('#7aa8c0'), hex('#5a8eaa'), hex('#4a7e9a'), hex('#3a6a88'), hex('#2e5a78')], { v: 7, n: 90 });
  d_ponerD(R, fondo, 60, 99);
  // la gente de la Batería, que agita sombreros y pañuelos
  for (let k = 0; k < 44; k++) { const x = 6 + Math.round(h(k, 1, 570) * 120), y = 93 + (k % 2), sube = Math.sin(t * 6 + k * 1.3) > 0.6 ? 1 : 0; pset(x, y - sube, [hex('#2a2a34'), hex('#a83a3a'), hex('#f0ece0'), hex('#3a4a7a')][k % 4]); if (k % 5 === 0 && sube) pset(x, y - 2, hex('#f4f0e4')); }
  // los barcos engalanados: un velero grande, el vapor de ruedas con su humo, un bergantín al fondo y botes de remos
  d_veleroD(R, 286, 106, t, { s: 0.55, banderas: true, dir: -1 });
  d_vaporD(R, 150, 118, t);
  d_veleroD(R, 70, 128, t, { s: 1, banderas: true, dir: 1 });
  for (const [bx, by, k] of [[196, 132, 0], [128, 140, 1], [268, 150, 2]]) { const x = Math.round(bx + Math.sin(t * 0.3 + k) * 6), y = by + Math.round(Math.sin(t * 1.4 + k)); rect(x - 7, y - 2, x + 7, y, hex('#5a3a22')); rect(x - 6, y - 2, x + 6, y - 2, hex('#8a6a44')); pset(x - 8, y - 2, hex('#5a3a22'));
    for (let p = 0; p < 3; p++) d_genteD(R, x - 4 + p * 4, y - 2, t, k * 3 + p, { alto: 6 }); const r = Math.sin(t * 3 + k) > 0 ? 1 : 0; linea(x - 2, y - 3, x - 6 - r * 2, y + 2, hex('#c8a060')); linea(x + 2, y - 3, x + 6 + r * 2, y + 2, hex('#c8a060')); }
  // las salvas de cañón: un fogonazo y una bola de humo que crece y se deshace (desde el velero y desde el fuerte)
  for (const [sx, sy, fase] of [[96, 122, 0], [162, 92, 1.7], [36, 92, 3.1]]) { const u = ((t + fase) % 4.4) / 2.2; if (u > 1) continue;
    if (u < 0.08) { disco(sx, sy, 2, hex('#fff0a0')); pset(sx, sy, 0xffffffff); }
    for (let k = 0; k < 5; k++) { const r = Math.round(2 + u * (5 + k)), xx = Math.round(sx + (k - 2) * u * 5 + u * 6), yy = Math.round(sy - k * u * 2 - u * 4); disco(xx, yy, r, d_mezclaD(hex('#e8e8ec'), hex('#b8bcc8'), u)); if (r > 2) pset(xx - 1, yy - r + 1, 0xffffffff); } }
  d_gaviotasD(R, t, 170, 62, 60, 8, 3, 1);
  d_ponerD(R, cubierta, 100, 179);
  // la bandera de popa y los gallardetes del cabo del palo
  d_banderaD(R, 168, 66, t, { w: 22, hh: 13 });
  for (let i = 0; i < 9; i++) { const x = 10 + i * 6, y = 20 + i * 5 + Math.round(Math.sin(t * 4 + i) * 0.6), c = [CD.rojoB, hex('#f0d040'), CD.azulB, CD.blancoB, hex('#3a8a4a')][i % 5]; pset(x, y, c); pset(x + 1, y, c); pset(x, y + 1, c); pset(x + 1 + (Math.sin(t * 6 + i) > 0 ? 1 : 0), y + 1, c); }
  // el barril de agua del lago Erie sobre la borda; con o.vierte (0–1) se inclina y el agua cae a la bahía
  const v = Math.max(0, Math.min(1, o.vierte ?? 0)), bx = 222, by = 147;
  if (o.barril) { const a = v * 1.3, c = Math.cos(a), s = Math.sin(a);
    for (let j = -5; j <= 5; j++) for (let i = -4; i <= 4; i++) { const xx = Math.round(bx + i * c - j * s), yy = Math.round(by - 5 + i * s + j * c); const aro = Math.abs(j) === 3 || Math.abs(j) === 5, col = aro ? hex('#3a3a42') : Math.abs(i) > 3 ? hex('#2e6a3a') : i < -1 ? hex('#5aa060') : hex('#3e8a4a'); pset(xx, yy, col); pset(xx + 1, yy, col); }
    const bocaX = Math.round(bx + 5 * s * 1 + 5 * c * 0), bocaY = Math.round(by - 5 - 5 * c);
    if (v > 0.25) { const caudal = Math.min(1, (v - 0.25) / 0.2), ex = bocaX + 3, ey = bocaY;
      for (let k = 0; k < 40; k++) { const u = k / 40, x = ex + u * 34, y = ey + u * u * 32 + u * 2, w = Math.sin(t * 30 + k) > 0 ? 1 : 0; if (h(k, Math.floor(t * 10), 571) > caudal) continue; pset(Math.round(x), Math.round(y), k % 3 ? hex('#a8d8f0') : 0xffffffff); pset(Math.round(x) + w, Math.round(y) + 1, hex('#7ab8dc')); }
      const sx = ex + 34, sy = ey + 34; for (let k = 0; k < 6; k++) { const u = (t * 2.2 + k / 6) % 1; pset(sx - 3 + Math.round(k * 1.2), Math.round(sy - Math.sin(u * Math.PI) * 4), 0xffffffff); }
      for (let a = 0; a < 24; a++) { const r = 2 + ((t * 6) % 6), an = a / 24 * Math.PI * 2; pset(Math.round(sx + Math.cos(an) * r * 1.6), Math.round(sy + 2 + Math.sin(an) * r * 0.5), hex('#c8e4f0')); } } }
  return { suelo: 168, pies: [24, 196], gobernador: [200, 168], barril: [bx, by], caida: [bx + 37, by + 30], horizonte: 96, borda: 140 };
}

// un velero de tres palos visto de costado: casco negro con la franja clara y las portas, las velas recogidas en las
// vergas, la jarcia, y con o.banderas el empavesado (una cuerda de banderitas de proa a popa por los topes); (x, y): el
// centro en la línea de flotación; o.s escala; o.dir hacia dónde mira la proa
function d_veleroD(R, x, y, t, o = {}) {
  const { rect, pset, linea } = R, s = o.s ?? 1, d = o.dir ?? 1, L = Math.round(54 * s), H = Math.max(4, Math.round(8 * s)), X = (i) => Math.round(x + i * d), b = Math.round(Math.sin(t * 1.2 + x) * s * 0.8);
  // el casco con su arrufo
  for (let i = -L / 2; i <= L / 2; i++) { const u = i / (L / 2), top = Math.round(y - H - Math.abs(u) ** 2 * 3 * s) + b, bot = Math.round(y + 1 - (Math.abs(u) > 0.8 ? (Math.abs(u) - 0.8) * 10 * s : 0)) + b;
    for (let yy = top; yy <= bot; yy++) pset(X(i), yy, yy === top ? hex('#8a6a44') : yy === top + Math.round(H * 0.4) ? CD.franja : yy > bot - 1 ? CD.cascoS : CD.casco);
    if (s > 0.7 && i % 5 === 0 && Math.abs(u) < 0.8) pset(X(i), top + Math.round(H * 0.4), CD.cascoS); }
  // el bauprés
  linea(X(L / 2), y - H + b, X(L / 2 + 16 * s), y - H - 8 * s + b, CD.mastilS);
  const palos = [-0.28, 0.06, 0.34].map((f) => X(f * L)), alto = [40, 48, 42].map((a) => Math.round(a * s));
  palos.forEach((px, k) => { const top = y - H - alto[k] + b; rect(px, top, px, y - H + b, CD.mastilS); if (s > 0.7) rect(px + 1, top + 4, px + 1, y - H + b, CD.mastil);
    for (let j = 0; j < 3; j++) { const vy = top + 4 + j * Math.round(alto[k] * 0.28), w = Math.round((12 - j * 2) * s); linea(px - w, vy, px + w, vy, CD.mastilS); rect(px - w + 1, vy + 1, px + w - 1, vy + 1 + Math.max(1, Math.round(s)), CD.vela2); pset(px - w + 2, vy + 1, CD.vela2S); }
    linea(px, top, X(L / 2 + 16 * s), y - H - 8 * s + b, CD.cabo); linea(px, top + 2, px - Math.round(10 * s), y - H + b, CD.cabo); });
  if (o.banderas) { const pts = [[X(L / 2 + 16 * s), y - H - 8 * s + b], ...palos.map((px, k) => [px, y - H - alto[k] + b]), [X(-L / 2), y - H + b - 2]];
    const cs = [CD.rojoB, hex('#f0d040'), CD.azulB, CD.blancoB, hex('#3a8a4a'), hex('#e8783a')];
    for (let p = 0; p + 1 < pts.length; p++) { const [ax, ay] = pts[p], [bx2, by2] = pts[p + 1], n = Math.max(3, Math.round(Math.hypot(bx2 - ax, by2 - ay) / 3));
      for (let i = 0; i < n; i++) { const u = i / n, xx = Math.round(ax + (bx2 - ax) * u), yy = Math.round(ay + (by2 - ay) * u + Math.sin(u * Math.PI) * 3 * s); pset(xx, yy, CD.cabo); const c = cs[(i + p * 2) % cs.length]; pset(xx, yy + 1, c); if (s > 0.7) { pset(xx + 1, yy + 1, c); pset(xx + (Math.sin(t * 6 + i) > 0 ? 1 : 0), yy + 2, c); } } }
    for (const [k, px] of palos.entries()) d_banderaD(R, px, y - H - alto[k] + b - 5, t + k, { w: Math.round(8 * s), hh: Math.max(2, Math.round(3 * s)), tipo: 'banderin', c: [CD.rojoB, CD.azulB, hex('#f0d040')][k], asta: 4 }); }
}

// el vapor de ruedas de 1825: casco largo y bajo, la caja de la rueda con sus palas que giran, dos chimeneas con humo
// negro, la toldilla y banderas; (x, y): el centro en la línea de flotación
function d_vaporD(R, x, y, t) {
  const { rect, pset, linea, disco } = R, b = Math.round(Math.sin(t * 1.1) * 0.6);
  rect(x - 36, y - 6 + b, x + 34, y + b, CD.casco); rect(x - 36, y - 6 + b, x + 34, y - 6 + b, hex('#e8e0cc')); rect(x - 36, y - 3 + b, x + 34, y - 3 + b, hex('#a83a2a')); pset(x + 35, y - 5 + b, CD.casco); pset(x + 36, y - 6 + b, CD.casco);
  rect(x - 26, y - 12 + b, x + 18, y - 7 + b, hex('#f0ead8')); for (let i = -24; i < 18; i += 4) rect(x + i, y - 11 + b, x + i + 1, y - 9 + b, hex('#3a4a5a')); rect(x - 28, y - 13 + b, x + 20, y - 13 + b, hex('#8a6a44'));
  disco(x - 2, y - 7 + b, 9, hex('#c8b890')); disco(x - 2, y - 7 + b, 8, hex('#e8e0cc')); for (let a = 0; a < 6; a++) { const an = a / 6 * Math.PI + t * 2; linea(x - 2, y - 7 + b, x - 2 + Math.round(Math.cos(an) * 7), y - 7 + b + Math.round(Math.sin(an) * 7), hex('#8a7a5a')); }
  rect(x - 11, y - 7 + b, x + 7, y - 7 + b, hex('#8a6a44'));
  for (const cx of [x - 14, x + 8]) { rect(cx, y - 30 + b, cx + 2, y - 13 + b, hex('#2a2a2a')); rect(cx - 1, y - 31 + b, cx + 3, y - 30 + b, hex('#4a4a4a')); d_humoD(R, cx + 1, y - 32 + b, t + cx, { alto: 26, viento: -18, c: hex('#4a4a50'), r: 4 }); }
  rect(x + 26, y - 26 + b, x + 26, y - 7 + b, CD.mastilS); d_banderaD(R, x + 26, y - 26 + b, t, { w: 9, hh: 5 }); rect(x - 34, y - 18 + b, x - 34, y - 6 + b, CD.mastilS); d_banderaD(R, x - 34, y - 18 + b, t + 1, { w: 7, hh: 3, tipo: 'banderin', c: hex('#f0d040') });
  // los invitados en la toldilla
  for (let k = 0; k < 7; k++) d_genteD(R, x - 22 + k * 6, y - 13 + b, t, k + 3, { alto: 6, sombrero: k % 2 ? 'copa' : null });
  // la estela y la espuma de la rueda
  for (let k = 0; k < 8; k++) { const u = (t * 0.8 + k / 8) % 1; pset(x - 2 - Math.round(u * 40), y + 1 + Math.round(u * 2), 0xffffffff); pset(x - 2 - Math.round(u * 40) + 3, y + 1, hex('#c8e4f0')); }
}

// la capa del fondo de la bahía de 1825: la punta de Manhattan con los árboles de la Batería, el fuerte redondo de Castle
// Garden, las casas de ladrillo y las torres de las iglesias; la isla del Gobernador con su fuerte; los altos de Brooklyn
function d_bodaFondoD(R) {
  const { rect, pset, disco, poligono } = R, B = R.buf;
  // Manhattan: casas de ladrillo con tejados y chimeneas, las torres de la Trinidad y de San Pablo
  for (let x = 0; x < 150; x++) { const alto = 6 + Math.floor(h(Math.floor(x / 7), 1, 572) * 8), top = 92 - alto; for (let y = top; y < 94; y++) { const c = x % 7 === 0 ? CD.ladrilloS : (y - top) % 3 === 1 && x % 3 === 1 && y > top + 1 ? hex('#3a3a4a') : [CD.ladrillo, hex('#b8a088'), CD.brown, hex('#d8ccb4')][Math.floor(h(Math.floor(x / 7), 2, 572) * 4)]; B[y * 320 + x] = y === top ? d_mezclaD(c, 0xff000000, 0.4) : c; }
    if (x % 7 === 3 && h(x, 3, 572) < 0.5) rect(x, top - 2, x, top - 1, CD.ladrilloS); }
  for (const [tx, alto] of [[34, 24], [62, 18]]) { rect(tx - 2, 92 - alto, tx + 2, 92, hex('#c8bca8')); rect(tx + 1, 92 - alto, tx + 2, 92, hex('#a89c88')); poligono([[tx - 2, 92 - alto], [tx, 92 - alto - 10], [tx + 3, 92 - alto]], hex('#8a8e98')); pset(tx, 91 - alto - 10, CD.laton); rect(tx - 1, 92 - alto + 3, tx, 92 - alto + 5, hex('#3a3a44')); }
  for (let k = 0; k < 18; k++) { const x = 4 + k * 7 + Math.round(h(k, 4, 572) * 3); disco(x, 90, 3, k % 2 ? hex('#4a7a3a') : hex('#3e6a32')); pset(x - 1, 88, hex('#6a9a4a')); }
  { const fx = 104; for (let y = 88; y < 96; y++) for (let x = fx - 12; x <= fx + 12; x++) { const e = ((x - fx) / 12) ** 2; if (e < 1) B[y * 320 + x] = y === 88 ? hex('#d8c8a8') : (x - fx) > 6 ? hex('#9a7a5a') : (y === 91 && x % 3 === 0) ? hex('#3a3030') : hex('#b8987a'); } rect(fx, 80, fx, 88, CD.mastilS); }
  for (let x = 0; x < 140; x++) B[95 * 320 + x] = CD.piedraS;
  // la isla del Gobernador con su castillo redondo de piedra roja
  for (let x = 150; x < 186; x++) { const top = 92 - Math.round(Math.sin((x - 150) / 36 * Math.PI) * 4); for (let y = top; y < 96; y++) B[y * 320 + x] = y === top ? hex('#6a9a4a') : hex('#4a7a3a'); }
  for (let y = 86; y < 94; y++) for (let x = 156; x < 172; x++) { const e = ((x - 164) / 8) ** 2; if (e < 1) B[y * 320 + x] = y === 86 ? hex('#c87a5a') : y % 3 === 0 && x % 2 === 0 ? hex('#5a2e22') : hex('#a85a42'); }
  // los altos de Brooklyn con sus casas blancas y un molino
  for (let x = 196; x < 320; x++) { const top = Math.round(86 - 5 * Math.sin((x - 196) * 0.03) - 2 * Math.sin(x * 0.11)); for (let y = top; y < 96; y++) B[y * 320 + x] = y === top ? hex('#7aa05a') : d_umbralD(x, y) < (y - top) / 14 ? hex('#5a8a4a') : hex('#6a964e');
    if (h(x, 5, 572) < 0.1) { rect(x, top + 3, x + 3, top + 6, hex('#f0ead8')); pset(x, top + 2, CD.ladrilloS); pset(x + 1, top + 2, CD.ladrilloS); } }
  rect(256, 74, 258, 82, hex('#e8e0cc')); for (const [a, b] of [[-5, -5], [5, 5], [-5, 5], [5, -5]]) R.linea(257, 74, 257 + a, 74 + b, hex('#8a6a44'));
  for (let y = 96; y < 100; y++) for (let x = 0; x < 320; x++) if (B[y * 320 + x] === d_VACIOD && y === 96 && x % 5 === 0) B[y * 320 + x] = hex('#9ac0d4');
}

// la capa de la cubierta del barco del gobernador: la borda con su regala, los candeleros y la cara interior de tablas,
// el casco por fuera a la derecha, la cubierta de tablas con sus juntas, el palo con la jarcia, un cañoncito de salvas,
// el cabrestante, rollos de cabo, cubos y la caja de banderas
function d_bodaCubiertaD(R) {
  const { rect, pset, linea, disco } = R, B = R.buf;
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) {
    const yCap = 136 + x * 4 / 210, xr = d_bordaD(y); let c = null;
    if (x <= xr - 1 || (x < 214 && y >= yCap)) {
      if (x < 214 && y < yCap) continue;
      if (x < xr - 9 && y >= yCap + 9) { const f = Math.floor((y - 140) / 4.5), junta = (y - 140) % 4.5 < 1 || ((x + f * 23) % 46 === 0), clavo = (x + f * 23) % 46 === 3 && (y - 140) % 4.5 < 2; c = junta ? hex('#8a6a44') : clavo ? hex('#5a4a3a') : h(x >> 2, f, 573) < 0.25 ? hex('#d8b47a') : hex('#c8a46a'); }   // la cubierta
      else if (y < yCap + 2 || x > xr - 2) c = x > xr - 2 ? hex('#5a3e24') : hex('#8a5a32');   // la regala
      else c = (x % 14 < 2 || (y > 0 && xr - x < 11 && (y % 10) < 2)) ? hex('#5a3a22') : (y - yCap) % 3 === 0 ? hex('#6a4428') : hex('#7a5232');   // la cara de dentro de la borda
    } else if (x >= xr && x < xr + 10 && x > 200) c = (x - xr) < 1 ? hex('#8a5a32') : (x - xr) < 4 ? CD.franja : CD.casco;   // el casco por fuera
    if (c != null) B[y * 320 + x] = c;
  }
  // los candeleros y el pasamanos de la borda
  for (let x = 2; x < 212; x += 14) { const y = Math.round(136 + x * 4 / 210); rect(x, y - 6, x + 1, y, hex('#5a3e24')); }
  for (let x = 0; x < 212; x++) { const y = Math.round(136 + x * 4 / 210) - 6; pset(x, y, hex('#a87a4a')); pset(x, y + 1, hex('#6a4428')); }
  // el palo con sus obenques que bajan a la borda
  rect(6, 0, 13, 150, hex('#7a5634')); rect(6, 0, 7, 150, hex('#a07a4a')); rect(12, 0, 13, 150, hex('#5a3e24')); for (let y = 10; y < 150; y += 22) { rect(5, y, 14, y + 1, CD.hierro); }
  for (const [ax, ay] of [[14, 20], [14, 40]]) for (let k = 0; k < 4; k++) linea(ax, ay, 30 + k * 10, 137, CD.cabo);
  for (let y = 60; y < 132; y += 6) linea(14 + Math.round((y - 20) / 117 * 16), y, 14 + Math.round((y - 20) / 117 * 46), y, hex('#6a5a44'));
  // el cañoncito de salvas asomado por la borda
  { const cx = 60; rect(cx - 8, 146, cx + 8, 152, hex('#5a3a22')); disco(cx - 6, 153, 3, hex('#3a2a1a')); disco(cx + 6, 153, 3, hex('#3a2a1a')); rect(cx - 6, 140, cx + 14, 144, hex('#2a2a32')); rect(cx - 6, 140, cx + 14, 140, hex('#5a5a66')); rect(cx + 12, 139, cx + 14, 145, hex('#3a3a44')); }
  // el cabrestante, los rollos de cabo, los cubos y la caja de las banderas
  { const cx = 126, cy = 160; rect(cx - 6, cy - 10, cx + 6, cy + 4, hex('#6a4428')); rect(cx - 6, cy - 10, cx + 6, cy - 9, hex('#a07a4a')); for (let x = cx - 5; x <= cx + 5; x += 3) rect(x, cy - 8, x, cy + 3, hex('#4a2e18')); rect(cx - 8, cy - 12, cx + 8, cy - 11, hex('#8a6a44')); linea(cx - 14, cy - 13, cx + 14, cy - 11, hex('#c8a46a')); }
  for (const [rx, ry] of [[96, 172], [150, 174]]) { for (let r = 7; r > 0; r -= 2) for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; pset(rx + Math.round(Math.cos(an) * r), ry + Math.round(Math.sin(an) * r * 0.45), r % 4 === 1 ? hex('#a8946a') : hex('#c8b48a')); } pset(rx, ry, hex('#6a5a44')); }
  for (const bx of [36, 44]) { rect(bx, 160, bx + 5, 168, hex('#7a5a3a')); rect(bx, 160, bx + 5, 160, hex('#a07a4a')); rect(bx, 163, bx + 5, 163, CD.hierro); rect(bx + 1, 161, bx + 4, 161, hex('#4a7a9a')); }
  rect(186, 150, 200, 158, hex('#5a3a22')); rect(186, 150, 200, 151, hex('#8a5a32')); for (let k = 0; k < 4; k++) rect(188 + k * 3, 148, 189 + k * 3, 150, [CD.rojoB, hex('#f0d040'), CD.azulB, CD.blancoB][k]);
  rect(167, 66, 169, 156, hex('#7a5634')); rect(167, 66, 167, 156, hex('#a07a4a')); rect(165, 154, 171, 157, hex('#5a3a22')); pset(168, 65, CD.laton); pset(168, 64, CD.latonL);
}

// perspectiva de un punto: fuga en (196, 104), cámara a 4 m del suelo; X (m) de lado (el borde del muelle en −9, las
// fachadas en +5), Y (m) de alto, Z (m) de fondo; el suelo del primer término (Z ≈ 8,5) está en y 180
const d_MX_D = (X, Z) => 196 + X * 160 / Z, d_MY_D = (Y, Z) => 104 - (Y - 4) * 160 / Z;

const d_BARCOS_D = [86, 72, 58, 46, 34, 22, 10.5];   // la Z de cada velero amarrado, de lejos a cerca

const d_ALMACENES_D = [[6, 15, 6.2, 0], [15, 23, 13, 1], [23, 30, 10.5, 2], [30, 40, 14, 3], [40, 52, 12, 1], [52, 66, 14, 4], [66, 90, 12, 0], [90, 160, 10, 2]];

function d_muellesD(R, t, o) {
  const { rect, pset, linea } = R;
  const capa = d_capaD(R, 'muelles', () => d_muellesFijoD(R));
  d_cieloD(R, t, { hor: 104, sol: [250, 64, 6], cumulos: 4 });
  d_ponerD(R, capa);
  // los gallardetes de los topes, que ondean
  for (const [k, Z] of d_BARCOS_D.entries()) { if (Z < 20) continue; for (const [i, X] of [-16, -26].entries()) { const x = Math.round(d_MX_D(X, Z)), y = Math.round(d_MY_D(31, Z)); if (y < 16 && x > 20 && x < 172) continue; if (x < 0 || x > 300) continue; const L = Math.max(3, Math.round(40 / Z * 2.2));
    for (let j = 0; j < L; j++) pset(x + 1 + j, y + Math.round(Math.sin(t * 5 + j * 0.8 + k) * (j / L) * 1.5), [CD.rojoB, CD.azulB, hex('#f0d040'), CD.blancoB][(k + i) % 4]); } }
  // la grúa de madera del muelle sube y baja un fardo
  { const Z = 17, mx = d_MX_D(-8.4, Z), tipX = d_MX_D(-13, Z), tipY = d_MY_D(10, Z), u = (Math.sin(t * 0.6) + 1) / 2, ly = d_MY_D(2.5 + u * 5, Z);
    linea(tipX, tipY, tipX, ly - 4, CD.cabo); rect(Math.round(tipX) - 4, Math.round(ly) - 4, Math.round(tipX) + 4, Math.round(ly) + 2, hex('#e0d4b0')); rect(Math.round(tipX) - 4, Math.round(ly) - 1, Math.round(tipX) + 4, Math.round(ly) - 1, hex('#8a6a44')); rect(Math.round(tipX) - 4, Math.round(ly) + 2, Math.round(tipX) + 4, Math.round(ly) + 2, hex('#b8a888'));
    const hx = Math.round(mx) + 3, hy = Math.round(d_MY_D(0, Z)); d_genteD(R, hx, hy, t, 2, { alto: 15, sombrero: 'gorra', ropa: hex('#6a4a3a') }); linea(hx + 2, hy - 9, Math.round(mx), hy - 12 + Math.round(Math.sin(t * 2) * 2), hex('#e0aa80')); }
  // los estibadores pequeños que ruedan barriles del muelle al almacén, y paseantes al fondo
  for (let k = 0; k < 4; k++) { const Z = [26, 31, 40, 55][k], s = 160 / Z, u = ((t * (0.07 + k * 0.012) + h(k, 1, 580)) % 1), X = -7 + u * 10.5, x = d_MX_D(X, Z), y = d_MY_D(0, Z), d = 1;
    const r = Math.max(2, Math.round(0.35 * s)), bx = Math.round(x + 0.7 * s), by = Math.round(y - r), g = t * 6 + k;
    R.disco(bx, by, r, hex('#7a5232')); for (let a = 0; a < 2; a++) { const an = g + a * Math.PI / 2; pset(bx + Math.round(Math.cos(an) * (r - 1)), by + Math.round(Math.sin(an) * (r - 1)), CD.hierro); } pset(bx - 1, by - r + 1, hex('#a07a4a'));
    d_genteD(R, x, y, t, k + 1, { alto: Math.round(1.7 * s), anda: true, dir: d, sombrero: k % 2 ? 'gorra' : null, ropa: [hex('#5a4a3a'), hex('#3a4a6a'), hex('#6a2a2a'), hex('#4a5a3a')][k] }); }
  for (let k = 0; k < 5; k++) { const Z = 62 + k * 9, s = 160 / Z, u = ((t * 0.05 + h(k, 2, 580)) % 1), X = k % 2 ? -6 + u * 9 : 3 - u * 9; d_genteD(R, d_MX_D(X, Z), d_MY_D(0, Z), t, k + 4, { alto: Math.max(5, Math.round(1.7 * s)), anda: true, dir: k % 2 ? 1 : -1, sombrero: k % 3 === 0 ? 'copa' : k % 3 === 1 ? 'cofia' : null, falda: k % 3 === 1 }); }
  // el caballo del carro, parado: cabecea y mueve la cola
  d_caballoD(R, 172, 152, t, -1, { quieto: true, c: hex('#5a3a24') });
  // las palomas que picotean entre los adoquines
  for (let k = 0; k < 4; k++) { const x = 132 + k * 9 + Math.round(Math.sin(t * 0.4 + k) * 3), y = 166 + (k % 2) * 3, p = Math.sin(t * 5 + k * 2) > 0.5 ? 1 : 0; rect(x, y - 2, x + 3, y - 1, hex('#7a7e8e')); pset(x + (k % 2 ? 0 : 3), y - 3 + p, hex('#5a5e6e')); pset(x + 1, y, hex('#e88a6a')); pset(x + 2, y - 2, hex('#9aa0b0')); }
  d_gaviotasD(R, t, 150, 40, 60, 10, 4, 2);
  return { suelo: 166, pies: [60, 262], fuga: [196, 104], acera: 5, proy: { x: d_MX_D, y: d_MY_D }, baupres: [[d_MX_D(-9.5, 10.5), d_MY_D(5.5, 10.5)], [d_MX_D(2, 10.5), d_MY_D(10.5, 10.5)]], carro: [214, 152] };
}

// un barril en perspectiva (escala s px/m) con sus aros; (x, y): el centro de la base
function d_barrilD(R, x, y, s, c = hex('#8a5a32')) {
  const w = Math.max(2, Math.round(0.32 * s)), hh = Math.max(3, Math.round(0.9 * s)), x0 = Math.round(x), y0 = Math.round(y);
  for (let j = 0; j < hh; j++) { const ww = w + (Math.sin(j / hh * Math.PI) > 0.5 ? 1 : 0); R.rect(x0 - ww, y0 - j, x0 + ww, y0 - j, (j === Math.round(hh * 0.2) || j === Math.round(hh * 0.8)) ? CD.hierro : c); R.pset(x0 - ww, y0 - j, d_mezclaD(c, 0xffffffff, 0.25)); R.pset(x0 + ww, y0 - j, d_mezclaD(c, 0xff000000, 0.35)); }
  R.rect(x0 - w, y0 - hh, x0 + w, y0 - hh, d_mezclaD(c, 0xffffffff, 0.2));
}

// la capa fija de South Street: los adoquines con rodadas y charcos, el larguero y los norays del muelle, el agua entre
// los cascos, los almacenes de ladrillo con ventanas, contraventanas, puertas de carga, rótulos de barras, vigas de izar
// y cornisas, los veleros amarrados (cascos, mástiles, vergas con las velas recogidas, jarcia y bauprés sobre la calle),
// la grúa, barriles, fardos de algodón, cajas, sacos y el carro de reparto
function d_muellesFijoD(R) {
  const { rect, pset, linea, poligono } = R, B = R.buf;
  // el suelo: agua, larguero del muelle, adoquines y la acera
  for (let y = 105; y < 180; y++) { const Z = 640 / (y - 104), s = 160 / Z;
    for (let x = 0; x < 320; x++) { const X = (x - 196) * Z / 160; let c;
      if (X < -9) { c = (y + Math.floor(x / 4)) % 5 === 0 ? hex('#5a8aa0') : hex('#2e5266'); }
      else if (X < -8.5) c = (Math.floor(Z / 0.9) % 6 === 0) ? hex('#3a2a1a') : X < -8.8 ? hex('#5a3e24') : hex('#8a6a44');
      else if (X < 3.4) { const u = X / 0.36, v = Z / 0.3 + (Math.floor(X / 0.36) % 2) * 0.5, fu = u - Math.floor(u), fv = v - Math.floor(v), junta = fu < 0.14 || fv < 0.14 * (s / 8 + 0.5), k = h(Math.floor(u), Math.floor(v), 581);
        c = junta ? hex('#4a4440') : k < 0.3 ? hex('#8a8278') : k < 0.6 ? hex('#7a7268') : k < 0.9 ? hex('#9a9286') : hex('#6a5a4a');
        if (!junta && fv > 0.6 && fu > 0.3) c = d_mezclaD(c, 0xffffffff, 0.15);
        if (Math.abs(X + 3.5) < 0.18 || Math.abs(X - 0.4) < 0.18) c = d_mezclaD(c, hex('#3a342e'), 0.45);
        const ch = ((X + 4.6) / 1.2) ** 2 + ((Z - 15) / 1.6) ** 2; if (ch < 1) c = ch > 0.75 ? hex('#5a6a74') : (y % 3 === 0 && (x + y) % 7 < 3) ? hex('#d8eaf4') : hex('#8ab4d0'); }
      else if (X < 3.6) c = hex('#c8c0b0');
      else { const fu = (Z / 1.2) % 1; c = fu < 0.08 ? hex('#7a7268') : hex('#aaa294'); }
      B[y * 320 + x] = c; } }
  // los norays del muelle
  for (let Z = 9; Z < 90; Z += 6) { const x = Math.round(d_MX_D(-8.7, Z)), y = Math.round(d_MY_D(0, Z)), w = Math.max(1, Math.round(0.25 * 160 / Z)), hh = Math.max(2, Math.round(0.6 * 160 / Z)); rect(x - w, y - hh, x + w, y, hex('#2a2a2e')); rect(x - w, y - hh, x + w, y - hh, hex('#5a5a62')); }
  // las fachadas de los almacenes (el plano X = 5)
  for (let x = 197; x < 320; x++) { const Z = 5 * 160 / (x - 196); if (Z > 160) continue;
    const ed = d_ALMACENES_D.find(([a, b]) => Z >= a && Z < b); if (!ed) continue; const [Z0, , top, tipo] = ed;
    for (let y = 0; y < 180; y++) { const Y = 4 - (y - 104) * Z / 160; if (Y < 0 || Y > top + 0.6) continue; const lz = Z - Z0;
      const ladr = [[CD.ladrillo, CD.ladrilloS, CD.ladrilloL], [CD.brown, CD.brownS, CD.brownL], [hex('#a8a090'), hex('#7e786a'), hex('#c8c0b0')], [hex('#b05a3a'), hex('#80402a'), hex('#d07a5a')], [hex('#c09a5a'), hex('#9a7a44'), hex('#d8b878')]][tipo];
      let c = (Math.floor(Y * 4) + Math.floor(lz * 2)) % 7 === 0 ? ladr[1] : h(Math.floor(lz * 3), Math.floor(Y * 4), 582) < 0.15 ? ladr[2] : ladr[0];
      if (Math.floor(Y * 4) % 2 === 0 && (Y * 4) % 1 < 0.25) c = d_mezclaD(c, CD.junta, 0.35);
      if (Y > top - 0.1) c = Y > top + 0.3 ? ladr[2] : hex('#3a2a24');   // la cornisa con su sombra
      if (lz < 0.12) c = ladr[1];
      const bay = lz % 2.4, piso = Y % 3;
      if (Y > 3.4 && Y < top - 0.6 && bay > 0.7 && bay < 1.7 && piso > 0.8 && piso < 2.5) { c = piso < 0.95 || piso > 2.35 ? hex('#d8d0c0') : (bay > 1.15 && bay < 1.25) ? hex('#5a4a3a') : (piso > 1.6 && piso < 1.7) ? hex('#5a4a3a') : (h(Math.floor(lz / 2.4), Math.floor(Y / 3), 583) < 0.3 ? hex('#8ab0c8') : hex('#2e3a46')); }
      else if (Y > 3.4 && Y < top - 0.6 && (bay > 0.4 && bay < 0.7 || bay > 1.7 && bay < 2.0) && piso > 0.8 && piso < 2.5) c = tipo === 2 ? hex('#3a5a3a') : hex('#2a3a2e');   // las contraventanas de hierro
      if (Y < 3) { const pb = lz % 4.8; if (pb > 1 && pb < 3.4 && Y < 2.6) c = Y > 2.45 ? hex('#d8d0c0') : (pb > 2.15 && pb < 2.25) ? hex('#3a2a1a') : hex('#3a2a20');   // las puertas de carga
        else if (pb > 3.8 && pb < 4.6 && Y > 0.9 && Y < 2.2) c = hex('#2e3a46'); }
      if (Y > 3.05 && Y < 3.55 && lz > 0.6 && lz < (ed[1] - Z0) - 0.6) c = (Y > 3.25 && Y < 3.35 && lz % 0.5 < 0.32) ? hex('#e8d890') : hex('#2a2a34');   // el rótulo (barras, sin letras)
      B[y * 320 + x] = c; } }
  // los bultos que asoman por las puertas de carga y las vigas de izar con su polea
  for (const [Z0, Z1, top] of d_ALMACENES_D) { if (Z0 > 70) continue; const Z = (Z0 + Z1) / 2, x = Math.round(d_MX_D(5, Z)), y = Math.round(d_MY_D(top - 0.7, Z)), s = 160 / Z;
    linea(x, y, x - Math.round(0.9 * s), y, hex('#4a3420')); linea(x - Math.round(0.9 * s), y, x - Math.round(0.9 * s), y + Math.round(2 * s), CD.cabo); pset(x - Math.round(0.9 * s), y + 1, CD.hierro); }
  // los veleros amarrados, de lejos a cerca
  for (const Z of d_BARCOS_D) d_barcoMuelleD(R, Z);
  // la grúa de madera del muelle
  { const Z = 17, mx = Math.round(d_MX_D(-8.4, Z)); rect(mx - 1, Math.round(d_MY_D(10.5, Z)), mx + 1, Math.round(d_MY_D(0, Z)), hex('#6a4a2a')); rect(mx - 1, Math.round(d_MY_D(10.5, Z)), mx - 1, Math.round(d_MY_D(0, Z)), hex('#9a7a4a'));
    linea(mx, d_MY_D(1.5, Z), d_MX_D(-13, Z), d_MY_D(10, Z), hex('#7a5a34')); linea(mx + 1, d_MY_D(1.5, Z), d_MX_D(-13, Z) + 1, d_MY_D(10, Z), hex('#5a3e24')); linea(mx, d_MY_D(10.5, Z), d_MX_D(-13, Z), d_MY_D(10, Z), CD.cabo); rect(mx - 3, Math.round(d_MY_D(1.2, Z)), mx + 3, Math.round(d_MY_D(0.4, Z)), hex('#5a3e24')); }
  // la mercancía: barriles en pirámide, fardos de algodón, cajas y sacos (de lejos a cerca)
  const cosas = [[-7.6, 44, 'barriles'], [3.9, 36, 'cajas'], [-7.4, 30, 'fardos'], [3.8, 24, 'sacos'], [-7.2, 19.5, 'barriles'], [-7.5, 13, 'fardos'], [4.0, 11, 'barriles'], [-6.8, 9.6, 'cajas']].sort((a, b) => b[1] - a[1]);
  for (const [X, Z, tipo] of cosas) { const s = 160 / Z, x = d_MX_D(X, Z), y = d_MY_D(0, Z);
    if (tipo === 'barriles') { for (const [dx, dy] of [[-0.7, 0], [0, 0], [0.7, 0], [-0.35, 0.9], [0.35, 0.9]]) d_barrilD(R, x + dx * s, y - dy * s, s, h(dx, dy, Z) < 0.5 ? hex('#8a5a32') : hex('#7a4a2a')); }
    else if (tipo === 'fardos') { for (const [dx, dy] of [[-0.6, 0], [0.6, 0], [0, 1]]) { const x0 = Math.round(x + (dx - 0.55) * s), x1 = Math.round(x + (dx + 0.55) * s), y1 = Math.round(y - dy * s), y0 = Math.round(y - (dy + 0.95) * s);
      rect(x0, y0, x1, y1, hex('#ece4d0')); rect(x0, y0, x1, y0, 0xffffffff); rect(x1, y0, x1, y1, hex('#c8bca4')); for (const f of [0.3, 0.7]) rect(x0, Math.round(y0 + (y1 - y0) * f), x1, Math.round(y0 + (y1 - y0) * f), hex('#8a7a5a')); } }
    else if (tipo === 'cajas') { for (const [dx, dy, w] of [[-0.5, 0, 0.9], [0.5, 0, 0.8], [0, 0.85, 0.75]]) { const x0 = Math.round(x + (dx - w / 2) * s), x1 = Math.round(x + (dx + w / 2) * s), y1 = Math.round(y - dy * s), y0 = Math.round(y - (dy + w) * s);
      rect(x0, y0, x1, y1, hex('#b8925a')); rect(x0, y0, x1, y0, hex('#d8b47a')); rect(x1, y0, x1, y1, hex('#8a6a3a')); linea(x0, y0, x1, y1, hex('#8a6a3a')); linea(x0, y1, x1, y0, hex('#8a6a3a')); } }
    else { for (let k = 0; k < 5; k++) { const cx = Math.round(x + (k - 2) * 0.5 * s), cy = Math.round(y - (k % 2) * 0.3 * s), r = Math.max(2, Math.round(0.32 * s)); R.disco(cx, cy - r, r, hex('#c8b48a')); pset(cx - 1, cy - 2 * r + 1, hex('#e8dcb8')); R.rect(cx - r, cy, cx + r, cy, hex('#9a8a62')); } } }
  // el carro de reparto con barriles (el caballo, vivo, lo pone la función)
  { const x0 = 196, y0 = 152; rect(x0, y0 - 12, x0 + 34, y0 - 9, hex('#7a5232')); rect(x0, y0 - 12, x0 + 34, y0 - 12, hex('#a07a4a')); for (const wx of [x0 + 6, x0 + 28]) { for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2; pset(wx + Math.round(Math.cos(an) * 6), y0 - 6 + Math.round(Math.sin(an) * 6), hex('#3a2a1a')); } for (let a = 0; a < 6; a++) linea(wx, y0 - 6, wx + Math.round(Math.cos(a) * 5), y0 - 6 + Math.round(Math.sin(a) * 5), hex('#c8902a')); }
    for (const bx of [x0 + 7, x0 + 16, x0 + 25]) d_barrilD(R, bx, y0 - 13, 12, hex('#8a5a32')); linea(x0, y0 - 11, x0 - 14, y0 - 8, hex('#5a3e24')); }
}

// un velero amarrado de costado en el plano Z, con la proa contra el muelle: casco negro con la franja de portas pintadas,
// el mascarón, el bauprés y el botalón que salen por encima de la calle, tres palos con sus vergas (en fuga) y las velas
// recogidas, y la jarcia
function d_barcoMuelleD(R, Z) {
  const cascos = { 10.5: [CD.casco, CD.cascoL], 22: [hex('#5a2e22'), hex('#7a4a34')], 34: [hex('#2e3e34'), hex('#4a5e4e')], 46: [hex('#2a3448'), hex('#46506a')] }, [cK, cKL] = cascos[Z] ?? [CD.casco, CD.cascoL];
  const { pset, linea } = R, s = 160 / Z, X = (v) => d_MX_D(v, Z), Y = (v) => d_MY_D(v, Z), B = R.buf;
  // el casco: de popa (X −48) a la proa (X −9.6), con su arrufo
  const xa = Math.max(0, Math.round(X(-48))), xb = Math.round(X(-9.6));
  for (let x = xa; x <= xb; x++) { const Xm = (x - 196) * Z / 160, u = (Xm + 48) / 38.4, tv = 4.6 + (u > 0.85 ? (u - 0.85) * 12 : 0) + (u < 0.1 ? (0.1 - u) * 8 : 0), bv = -1.6 + Math.max(0, u - 0.9) * 22, top = Y(tv), bot = Y(bv);
    for (let y = Math.max(0, Math.round(top)); y <= Math.min(179, Math.round(bot)); y++) { const Yv = 4 - (y - 104) * Z / 160; let c;
      if (Yv > tv - 0.32) c = Yv > tv - 0.12 ? hex('#b08a5a') : hex('#7a5a38');   // la regala
      else if (Yv > 2.6 && Yv < 3.3) c = (Xm % 1.8 + 1.8) % 1.8 < 0.7 ? cK : CD.franja;   // la franja de portas pintadas
      else if (Yv < -0.5) c = (Math.floor(Xm * 2) + Math.floor(Yv * 4)) % 5 === 0 ? hex('#4a6a5a') : hex('#5e8a72');   // el forro de cobre verdoso
      else { const tabla = (Yv * 2.2) % 1; c = tabla < 0.12 ? cKL : Yv > 3.3 ? d_mezclaD(cK, 0xffffffff, 0.08) : cK; if (h(Math.floor(Xm * 0.7), Math.floor(Yv * 3), 584) < 0.06) c = hex('#4a3a34'); }
      if (Yv > 1.2 && Yv < 1.7 && (Xm % 3 + 3) % 3 < 0.35) c = hex('#c8b070');   // los portillos
      if (x === xb || x === xb - 1) c = d_mezclaD(c, 0xff000000, 0.35);
      B[y * 320 + x] = c; } }
  // el mascarón dorado y el bauprés con el botalón
  pset(xb + 1, Math.round(Y(4.2)), CD.oroT); pset(xb + 1, Math.round(Y(3.9)), CD.laton);
  { const gw = Math.max(1, Math.round(0.14 * s)); for (let k = 0; k < gw; k++) linea(X(-9.6), Y(5.4) + k, X(-1), Y(8.8) + k, k === 0 ? CD.mastil : k === gw - 1 ? hex('#3a2a1a') : CD.mastilS); } linea(X(-1), Y(8.8), X(2.4), Y(10.4), CD.mastilS);
  linea(X(-9.6), Y(4.2), X(-1), Y(8.6), CD.cabo);   // el moco del bauprés
  // los palos, con sus vergas en fuga y las velas recogidas
  for (const [k, Xm] of [-16, -27, -38].entries()) { const xm = Math.round(X(Xm)); if (xm < -20 || xm > 330) continue; const alto = [31, 34, 28][k], w = Math.max(1, Math.round(0.18 * s));
    R.rect(xm - w + 1, Math.max(0, Math.round(Y(alto))), xm + w - 1, Math.round(Y(4.5)), CD.mastilS); if (w > 1) R.rect(xm - w + 1, Math.max(0, Math.round(Y(alto))), xm - w + 1, Math.round(Y(4.5)), CD.mastil);
    for (const [j, Yv] of [9, 16, 22, 27].entries()) { if (Yv > alto - 1) break; const L = Math.min(9 - j * 1.6, Z * 0.3); linea(d_MX_D(Xm, Z - L), d_MY_D(Yv, Z - L), d_MX_D(Xm, Z + L), d_MY_D(Yv, Z + L), CD.mastilS);
      linea(d_MX_D(Xm, Z - L * 0.95), d_MY_D(Yv - 0.35, Z - L * 0.95), d_MX_D(Xm, Z + L * 0.95), d_MY_D(Yv - 0.35, Z + L * 0.95), CD.vela2); }
    linea(xm, Y(alto - 1), X(k === 0 ? 2.4 : Xm + 11), Y(k === 0 ? 10.4 : alto - 4), CD.cabo);   // los estays
    linea(xm, Y(alto * 0.65), X(Xm - 3), Y(4.6), CD.cabo); linea(xm, Y(alto * 0.65), X(Xm + 3), Y(4.6), CD.cabo); }
}

// cuatro casas de 64 px (x 0–255): cornisa en y 26–37, ventanas en tres pisos, la puerta arriba de la escalinata (rellano en
// y 116, ocho peldaños de 4 px hasta la acera en y 150); acera y 150–160, bordillo y 160–162, calzada y 162–180
function d_brownD(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const capa = d_capaD(R, 'brown', () => d_brownFijoD(R));
  d_cieloD(R, t, { hor: 110, sol: [292, 70, 6], cumulos: 4 });
  // la bocacalle: el tren elevado que cruza por su puente de hierro (o.tren 0–1; si no, pasa de vez en cuando)
  d_ponerD(R, capa);
  R.recorte([256, 0, 319, 149]);
  const u = o.tren != null ? o.tren : ((t % 14) / 6), tx = Math.round(352 - u * 150);
  if (u > 0 && u < 1.5) d_trenD(R, tx, 90, t);
  R.recorte(null);
  // el humo de las chimeneas
  d_humoD(R, 235, 14, t, { alto: 13, viento: 12, r: 3, c: hex('#a8a8b0') }); d_humoD(R, 238, 14, t + 1.3, { alto: 11, viento: 14, r: 2, c: hex('#b8b8c0') });
  // los árboles jóvenes de la acera, que se mecen, con su protector de hierro
  for (const ax of [62, 190]) { const m = Math.sin(t * 1.1 + ax) * 1.2; rect(ax, 100, ax + 1, 150, hex('#5a4030')); rect(ax + 1, 100, ax + 1, 150, hex('#3e2c20'));
    for (let k = 0; k < 26; k++) { const a = h(k, ax, 590) * Math.PI * 2, r = h(k, ax + 1, 590) * 12, x = Math.round(ax + Math.cos(a) * r * 1.1 + m * (1 - r / 14)), y = Math.round(94 + Math.sin(a) * r * 0.8); disco(x, y, 3, k % 3 ? hex('#5a9a3e') : hex('#3e7a2e')); if (k % 4 === 0) pset(x - 1, y - 2, hex('#8aca5a')); }
    for (let y = 138; y < 150; y++) for (const dx of [-4, -2, 3, 5]) pset(ax + dx, y, CD.hierro); rect(ax - 4, 138, ax + 5, 138, CD.hierroL); rect(ax - 4, 149, ax + 5, 149, CD.hierro); }
  // las palomas de la cornisa
  for (const [px, k] of [[72, 0], [80, 1], [150, 2], [214, 3]]) { const p = Math.sin(t * 4 + k * 2) > 0.6 ? 1 : 0; rect(px, 23, px + 3, 25, hex('#7a7e8e')); pset(px + 3 + p, 22 + p, hex('#5a5e6e')); pset(px + 4 + p, 22 + p, hex('#e88a3a')); pset(px, 24, hex('#9aa0b0')); }
  // en una ventana, una vecina que sacude un trapo; en otra, el visillo que mueve el aire
  { const x0 = 64 + 28, s = Math.sin(t * 6) > 0 ? 1 : -1; R.recorte([x0, 42, x0 + 8, 56]); rect(x0 + 2, 48, x0 + 6, 56, hex('#6a3a5a')); rect(x0 + 3, 44, x0 + 5, 47, hex('#f0c8a0')); rect(x0 + 3, 43, x0 + 5, 43, hex('#5a3418')); R.recorte(null); rect(x0 + 6, 52 + s, x0 + 12, 54 + s, hex('#f0ece0')); }
  { const x0 = 128 + 46, f = Math.sin(t * 1.3); for (let y = 66; y < 80; y++) { const w = Math.round(3 + f * 2 * (y - 66) / 14); rect(x0, y, x0 + w, y, hex('#f4f0e4')); } }
  // las farolas de gas
  for (const lx of [124, 252]) { rect(lx, 112, lx + 1, 150, CD.hierro); rect(lx - 2, 146, lx + 3, 150, CD.hierro); rect(lx - 3, 104, lx + 4, 112, CD.hierro); rect(lx - 2, 105, lx + 3, 110, o.luz === 'tarde' ? hex('#ffe8a0') : hex('#d8e4e8')); rect(lx - 4, 103, lx + 5, 103, CD.hierro); pset(lx, 101, CD.hierro); pset(lx + 1, 102, CD.hierro); if (o.luz !== 'tarde') pset(lx - 1, 106, 0xffffffff); }
  // el coche de caballos que pasa por la calzada (o.coche 0–1; si no, de vez en cuando; false: ninguno)
  if (o.coche !== false) { const v = typeof o.coche === 'number' ? o.coche : ((t + 5) % 18) / 7; if (v > 0 && v < 1) { const cx = Math.round(-60 + v * 440); carruaje(R, cx, 178, t, { cochero: ELENCO_CHIBI.neoyorquino2 ?? null, capota: true }); } }
  const escalones = [0, 1, 2, 3].map((k) => ({ x: k * 64 + 15, ys: [116, 120, 124, 128, 132, 136, 140, 144, 148] }));
  return { suelo: 156, pies: [30, 250], escalones, puertas: escalones.map((e) => [e.x, 116]), acera: [150, 160], calle: 176, bocacalle: [256, 320] };
}

// la locomotora de vapor (4-4-0) con su chimenea de embudo, el quitapiedras y un vagón, sobre la vía del puente; (x, y): la
// vía bajo la rueda delantera; humo que sale de la chimenea. Solo pset, linea y disco (respetan R.recorte)
function d_trenD(R, x, y, t) {
  const { pset, linea, disco } = R, caja = (x0, y0, x1, y1, c) => { for (let yy = y0; yy <= y1; yy++) linea(x0, yy, x1, yy, c); };
  caja(x - 2, y - 10, x + 22, y - 4, hex('#2a3a2a')); caja(x - 2, y - 10, x + 22, y - 10, hex('#4a6a4a')); caja(x + 6, y - 10, x + 7, y - 5, hex('#c8a040'));
  caja(x + 14, y - 16, x + 24, y - 4, hex('#7a2a24')); caja(x + 16, y - 14, x + 18, y - 11, hex('#f0d890')); caja(x + 13, y - 17, x + 25, y - 17, hex('#2a2a2a'));
  caja(x + 1, y - 17, x + 4, y - 11, hex('#2a2a2a')); caja(x - 1, y - 19, x + 6, y - 18, hex('#2a2a2a')); caja(x + 10, y - 13, x + 11, y - 11, hex('#c8a040'));
  linea(x - 2, y - 4, x - 6, y, hex('#a83a2a')); linea(x - 2, y - 2, x - 5, y, hex('#a83a2a')); pset(x - 3, y - 8, hex('#fff0a0'));
  for (const [wx, r] of [[x + 2, 2], [x + 7, 2], [x + 15, 3], [x + 21, 3]]) { disco(wx, y - r, r, hex('#2a2a2a')); pset(wx + Math.round(Math.cos(t * 9) * (r - 1)), y - r + Math.round(Math.sin(t * 9) * (r - 1)), hex('#c8a040')); }
  caja(x + 27, y - 12, x + 52, y - 3, hex('#8a5a2a')); caja(x + 27, y - 13, x + 52, y - 13, hex('#3a2a1a')); for (let k = 0; k < 5; k++) caja(x + 30 + k * 5, y - 10, x + 32 + k * 5, y - 7, hex('#f0d890'));
  for (const wx of [x + 31, x + 48]) disco(wx, y - 2, 2, hex('#2a2a2a'));
  for (let k = 0; k < 7; k++) { const u = (t * 0.9 + k / 7) % 1, r = Math.round(1 + u * 5), xx = Math.round(x + 2 + u * 34), yy = Math.round(y - 20 - u * 16 + Math.sin(u * 7 + k) * 2); disco(xx, yy, r, u > 0.5 ? hex('#d8d8dc') : hex('#9a9aa2')); }
}

// la capa fija de las brownstones: las cuatro casas con su piedra rojiza (sillares, desgaste), la cornisa con ménsulas y
// dentículos, ventanas de guillotina con dinteles, frontones y visillos, la puerta de doble hoja con su arco y su
// tejadillo, la escalinata con barandillas de hierro y volutas, el sótano con rejas y la verja del patio inglés; las
// chimeneas; la bocacalle con casas lejanas y el puente de hierro del tren elevado; la acera de losas, el bordillo y los
// adoquines de la calzada
function d_brownFijoD(R) {
  const { rect, pset, linea, poligono, disco } = R, B = R.buf;
  const tonos = [[CD.brown, CD.brownS, CD.brownL], [hex('#84503c'), hex('#5e382a'), hex('#a46a52')], [hex('#744434'), hex('#543026'), hex('#94604a')], [hex('#80523e'), hex('#5a3a2c'), hex('#a06e56')]];
  // la bocacalle: casas lejanas con bruma, la calle que se aleja y el puente del tren
  for (let x = 256; x < 320; x++) { const top = 70 + Math.floor(h(Math.floor(x / 9), 1, 591) * 18); for (let y = top; y < 112; y++) B[y * 320 + x] = (x % 9 === 0) ? hex('#9a8a90') : ((y - top) % 5 === 2 && x % 3 === 1) ? hex('#7a7a8a') : hex('#b0a2a6'); }
  for (let y = 112; y < 150; y++) for (let x = 256; x < 320; x++) { const fila = Math.floor((y - 112) / 3), k = h(Math.floor((x + fila * 2) / 5), fila, 598); B[y * 320 + x] = y < 115 ? hex('#a8a29a') : ((y - 112) % 3 === 0 || (x + fila * 2) % 5 === 0) ? hex('#6a645e') : k < 0.4 ? hex('#8a847c') : hex('#9a948a'); }
  // el puente del tren elevado: la viga de celosía y los pilares de hierro con sus cartelas
  for (let x = 256; x < 320; x++) { for (let y = 91; y <= 97; y++) { const m = (x - 256) % 8, d1 = (y - 91) === m || (y - 91) === 8 - m - 1; B[y * 320 + x] = y === 91 || y === 97 ? CD.hierro : d1 ? hex('#4a4a56') : d_VACIOD; } pset(x, 90, CD.hierroL); }
  for (const px of [262, 286, 310]) { rect(px, 98, px + 2, 150, CD.hierro); rect(px, 98, px, 150, CD.hierroL); linea(px - 5, 98, px, 103, CD.hierro); linea(px + 7, 98, px + 2, 103, CD.hierro); rect(px - 1, 147, px + 3, 150, CD.hierro); }
  // las casas
  for (let k = 0; k < 4; k++) { const x0 = k * 64, [c0, cS, cL] = tonos[k];
    for (let y = 26; y < 150; y++) for (let x = x0; x < x0 + 64; x++) { let c;
      const fila = Math.floor((y - 38) / 8), junta = (y - 38) % 8 === 0 || (x - x0 + (fila % 2) * 16) % 32 === 0;
      c = junta ? cS : h(x, y, 592 + k) < 0.07 ? cS : h(x >> 1, y >> 1, 596 + k) < 0.06 ? cL : c0;
      if (y < 38) { const ly = y - 26; c = ly < 2 ? cL : ly < 5 ? c0 : ly === 5 ? hex('#2a1a14') : ly < 9 ? (((x - x0) % 6) < 3 ? cL : hex('#2a1a14')) : ly < 10 ? cS : ((x - x0) % 3 === 0 ? cS : c0); }
      if (x === x0 || x === x0 + 63) c = d_mezclaD(c, 0xff000000, 0.25);
      if (y >= 116 && y < 150 && x >= x0 + 28 && x <= x0 + 62) c = (y - 116) % 6 === 0 ? cS : c0;   // el zócalo del sótano
      B[y * 320 + x] = c; }
    // las ventanas: el piso de arriba, el segundo (con frontón) y la planta noble (alta)
    const ventana = (x, y0, y1, w, tipo) => { rect(x - 1, y0 - 3, x + w, y0 - 1, cL); rect(x - 1, y0 - 1, x + w, y0 - 1, cS);
      if (tipo === 'fronton') { poligono([[x - 2, y0 - 3], [x + w / 2 - 0.5, y0 - 8], [x + w + 1, y0 - 3]], cL); linea(x - 2, y0 - 3, x + w / 2 - 0.5, y0 - 8, cS); }
      rect(x, y0, x + w - 1, y1, hex('#2a2a36')); for (let y = y0 + 1; y < y1; y++) for (let xx = x + 1; xx < x + w - 1; xx++) { const arriba = y < (y0 + y1) / 2; B[y * 320 + xx] = (xx + y) % 9 === 0 || (xx - x === 1 && y < y0 + 4) ? hex('#a8c8dc') : arriba ? hex('#3e5a70') : hex('#34485a'); }
      rect(x, Math.round((y0 + y1) / 2), x + w - 1, Math.round((y0 + y1) / 2), hex('#e8e0d0')); rect(x + Math.floor(w / 2), y0, x + Math.floor(w / 2), y1, hex('#e8e0d0'));
      for (let y = y0 + 1; y < y1; y += 2) { pset(x + 1, y, hex('#f0ece0')); pset(x + w - 2, y, hex('#f0ece0')); }   // los visillos de encaje
      rect(x - 2, y1 + 1, x + w + 1, y1 + 2, cL); rect(x - 2, y1 + 3, x + w + 1, y1 + 3, hex('#2a1a14')); };
    for (const wx of [x0 + 10, x0 + 28, x0 + 46]) { ventana(wx, 42, 56, 9, 'plano'); ventana(wx, 66, 82, 9, 'fronton'); }
    ventana(x0 + 32, 92, 112, 10, 'fronton'); ventana(x0 + 48, 92, 112, 10, 'fronton');
    if (k % 2 === 0) { rect(x0 + 31, 115, x0 + 42, 117, hex('#6a3a24')); for (let i = 0; i < 5; i++) { pset(x0 + 32 + i * 2, 114, [hex('#e84a4a'), hex('#f0d040'), hex('#e86aa0')][i % 3]); pset(x0 + 33 + i * 2, 113, hex('#4a8a3a')); } }   // la jardinera
    // la puerta de doble hoja con su arco, el montante y el tejadillo sobre ménsulas
    { const dx = x0 + 9; rect(dx - 3, 84, dx + 15, 87, cL); rect(dx - 3, 87, dx + 15, 88, hex('#2a1a14')); rect(dx - 2, 88, dx - 1, 92, cL); rect(dx + 13, 88, dx + 14, 92, cL);
      for (let y = 90; y < 116; y++) for (let x = dx; x < dx + 12; x++) { const arco = y < 96 && Math.hypot(x - dx - 5.5, y - 96) > 6.2; if (arco) continue; let c = y < 96 ? (Math.hypot(x - dx - 5.5, y - 96) > 5 ? hex('#3a2418') : (x + y) % 2 ? hex('#e8d890') : hex('#c8b070')) : (x === dx + 5 || x === dx + 6) ? hex('#2a160c') : ((y - 97) % 9 < 1 || x === dx || x === dx + 11 || x === dx + 4 || x === dx + 7) ? hex('#3a2010') : hex('#5a3420'); B[y * 320 + x] = c; }
      pset(dx + 4, 106, CD.laton); pset(dx + 7, 106, CD.laton); rect(dx + 2, 98, dx + 3, 98, CD.laton); }
    // la escalinata: peldaños que se ensanchan hacia abajo, con su huella clara y su tabica en sombra
    for (let i = 0; i <= 8; i++) { const y = 116 + i * 4, a = x0 + 6 - Math.round(i * 0.4), b = x0 + 24 + Math.round(i * 0.4); rect(a, y, b, y + 1, cL); rect(a, y + 2, b, y + 3, cS); pset(a, y, c0); }
    rect(x0 + 5, 112, x0 + 25, 116, c0);
    // las barandillas de hierro con balaustres y la voluta de abajo, a los dos lados
    for (const [lx, dd] of [[x0 + 4, -1], [x0 + 26, 1]]) { const bx = lx + dd * 4;
      linea(lx, 106, bx, 140, CD.hierro); linea(lx, 107, bx, 141, CD.hierroL);
      for (let i = 0; i < 9; i++) { const y = 108 + i * 4, x = Math.round(lx + (bx - lx) * (i / 8.5)); rect(x, y, x, y + 4 + (i > 6 ? 2 : 0), CD.hierro); }
      rect(lx - 1, 102, lx + 1, 116, CD.hierro); disco(lx, 101, 1, CD.hierro); rect(bx - 2, 140, bx + 2, 150, CD.hierro); rect(bx - 1, 140, bx + 1, 140, CD.hierroL); disco(bx, 137, 2, CD.hierro); pset(bx - 1, 136, CD.hierroL);
      for (let a = 0; a < 10; a++) pset(bx + dd * Math.round(2 + Math.cos(a * 0.6) * 2), 144 + Math.round(Math.sin(a * 0.6) * 2), CD.hierro); }
    // el sótano: dos ventanas con reja; la verja del patio inglés con lanzas y su puertecita
    for (const wx of [x0 + 34, x0 + 50]) { rect(wx, 122, wx + 8, 136, hex('#2a2a36')); rect(wx + 1, 123, wx + 7, 129, hex('#3e5a70')); pset(wx + 2, 124, hex('#a8c8dc')); for (let x = wx; x <= wx + 8; x += 2) rect(x, 122, x, 136, CD.hierro); }
    for (let x = x0 + 30; x <= x0 + 62; x += 3) { rect(x, 136, x, 150, CD.hierro); pset(x, 135, CD.hierro); pset(x - 1, 136, CD.hierro); pset(x + 1, 136, CD.hierro); }
    rect(x0 + 30, 139, x0 + 62, 139, CD.hierro); rect(x0 + 30, 147, x0 + 62, 147, CD.hierro);
    // las chimeneas del tejado (con humo solo las dos de la derecha)
    rect(x0 + 40, 18, x0 + 47, 26, cS); rect(x0 + 41, 18, x0 + 46, 25, c0); rect(x0 + 39, 17, x0 + 48, 18, cL); for (const px of [x0 + 42, x0 + 45]) { rect(px, 15, px + 1, 16, hex('#a85a3a')); pset(px, 15, hex('#c87a5a')); }
  }
  // la acera de losas azuladas, el bordillo de granito y la calzada de adoquines
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 160) { const lx = (x + (Math.floor((y - 150) / 5) % 2) * 11) % 22; c = (y - 150) % 5 === 0 || lx === 0 ? hex('#6a7078') : h(Math.floor((x + (Math.floor((y - 150) / 5) % 2) * 11) / 22), Math.floor((y - 150) / 5), 593) < 0.3 ? hex('#9aa2aa') : hex('#8a929a'); if (h(x, y, 594) < 0.05) c = hex('#7a828a'); }
    else if (y < 163) c = y === 160 ? hex('#c8c4bc') : hex('#8a8680');
    else { const fila = Math.floor((y - 163) / 3), bx = (x + fila * 3) % 7, k = h(Math.floor((x + fila * 3) / 7), fila, 595); c = (y - 163) % 3 === 0 || bx === 0 ? hex('#3e3a36') : k < 0.3 ? hex('#6a6460') : k < 0.6 ? hex('#7a746e') : hex('#5e5854'); if (y === 163) c = hex('#2e2a28'); }
    B[y * 320 + x] = c; }
  for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 1, 597) * 300), y = 166 + Math.round(h(k, 2, 597) * 12); rect(x, y, x + 2, y, hex('#a8a29a')); }
}

// el lago en el centro (elipse de centro (160, 118), 92 × 16 px), el puente de piedra sobre su extremo derecho (x 214–266,
// tablero en y 102), las rocas de esquisto a los lados; el primer término (y 140–180) es el sitio de los personajes
const d_LAGO_D = [160, 118, 92, 16];

function d_parqueD(R, t, o) {
  const { rect, pset, linea, disco } = R, B = R.buf;
  const obra = d_capaD(R, 'parqueObra', () => d_parqueFijoD(R, false)), fin = d_capaD(R, 'parqueFin', () => d_parqueFijoD(R, true));
  const u = Math.max(0, Math.min(1, o.obra ?? 0));
  d_cieloD(R, t, { hor: 92, sol: [70, 30, 7], cumulos: 5 });
  // la mezcla de las dos capas: el parque va brotando a manchas, desde el lago hacia fuera
  for (let y = 40; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, m = 0.55 * h(x >> 3, y >> 3, 600) + 0.45 * Math.min(1, Math.hypot((x - 160) / 170, (y - 118) / 70)), c = (m < u * 1.02 - 0.01 ? fin : obra)[i]; if (c !== d_VACIOD) B[i] = c; }
  const [lx, ly, lrx, lry] = d_LAGO_D, dentroLago = (x, y, k = 1) => ((x - lx) / (lrx * k)) ** 2 + ((y - ly) / (lry * k)) ** 2 < 1;
  // el agua: en la obra, un charco en el fondo del hoyo; terminado, el lago entero con reflejos y rizos
  for (let k = 0; k < 40; k++) { const x = Math.round(lx - lrx + h(k, 1, 601) * lrx * 2 + Math.sin(t * 0.8 + k) * 3), y = Math.round(ly - lry + 2 + h(k, 2, 601) * (lry * 2 - 4)); if (!dentroLago(x, y, u > 0.5 ? 0.95 : 0.42)) continue; if (Math.sin(t * 1.5 + k * 1.7) > -0.2) { pset(x, y, hex('#c8e4f0')); pset(x + 1, y, hex('#a8d0e4')); } }
  if (u < 0.6) {   // ── la vida de la obra: carretillas, cavadores, la grúa con la roca, el carro de tierra y una voladura lejana
    const vis = (k) => h(k, 9, 602) > u * 1.6;
    for (let k = 0; k < 4; k++) { if (!vis(k)) continue; const v = (t * 0.06 + k * 0.27) % 1, ida = v < 0.5, f = ida ? v * 2 : 2 - v * 2, x = Math.round(40 + f * 90 + k * 40), y = 138 + (k % 2) * 4, d = ida ? 1 : -1;
      d_genteD(R, x, y, t, k, { alto: 12, anda: true, dir: d, sombrero: 'gorra', ropa: [hex('#6a5a4a'), hex('#4a5a6a'), hex('#7a4a3a'), hex('#5a6a4a')][k] });
      const bx = x + d * 7; rect(Math.min(bx - 3 * d, bx + 3 * d), y - 5, Math.max(bx - 3 * d, bx + 3 * d), y - 3, hex('#7a5a3a')); if (ida) rect(Math.min(bx - 2 * d, bx + 2 * d), y - 6, Math.max(bx - 2 * d, bx + 2 * d), y - 6, hex('#6a4a2e')); disco(bx + 3 * d, y - 1, 1, hex('#2a2a2a')); linea(x + d, y - 6, bx - 3 * d, y - 4, hex('#5a3e24')); }
    for (let k = 0; k < 3; k++) { if (!vis(k + 5)) continue; const x = [104, 196, 232][k], y = [124, 120, 128][k], p = Math.sin(t * 3 + k * 2), arriba = p > 0; d_genteD(R, x, y, t, k + 2, { alto: 10, dir: k % 2 ? -1 : 1, sombrero: 'gorra' });
      const d = k % 2 ? -1 : 1; linea(x + d, y - 6, x + d * 5, y - (arriba ? 9 : 1), hex('#8a6a44')); rect(x + d * 5 - 1, y - (arriba ? 10 : 1), x + d * 5 + 1, y - (arriba ? 9 : 0), hex('#5a5a62')); if (!arriba) { pset(x + d * 6, y - 2, hex('#8a6a44')); pset(x + d * 7, y - 3, hex('#8a6a44')); } }
    if (vis(8)) { const v = (Math.sin(t * 0.7) + 1) / 2, ry = Math.round(96 + v * 10); linea(244, 76, 244, ry - 4, CD.cabo); for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) if ((i / 4.5) ** 2 + (j / 3.5) ** 2 < 1) pset(244 + i, ry + j, j < -1 ? hex('#a8a8b0') : (i + j) % 3 === 0 ? hex('#5a5a66') : hex('#7a7a86')); }
    if (vis(9)) { const v = (t * 0.04) % 1, x = Math.round(20 + v * 120); d_caballitoD(R, x + 16, 94, t, 1, hex('#6a4a34')); rect(x - 4, 87, x + 8, 91, hex('#6a4a2e')); rect(x - 3, 86, x + 7, 87, hex('#8a6a44')); for (const wx of [x - 1, x + 6]) disco(wx, 92, 2, hex('#3a2a1a')); d_genteD(R, x + 8, 91, t, 2, { alto: 6, sombrero: 'gorra' }); }
    { const k = Math.floor(t / 6), w = (t % 6) / 1.4; if (w < 1 && vis(12)) { const bx = 40 + Math.round(h(k, 1, 603) * 40), by = 96; for (let j = 0; j < 6; j++) { const r = Math.round(2 + w * (3 + j)), xx = Math.round(bx + (j - 3) * w * 3), yy = Math.round(by - j * w * 3); disco(xx, yy, r, d_mezclaD(hex('#c8b48a'), hex('#e8e0d0'), w)); } } }
  }
  if (u > 0.4) {   // ── la vida del parque: barcas de remos, cisnes, paseantes, un coche por el paseo de arriba y una niña con su aro
    const vis = (k) => h(k, 8, 604) < (u - 0.4) * 2;
    for (let k = 0; k < 3; k++) { if (!vis(k)) continue; const v = (t * (0.02 + k * 0.006) + k * 0.33) % 1, x = Math.round(lx - lrx + 20 + Math.abs(v * 2 - 1) * (lrx * 2 - 60)), y = ly - 6 + k * 6, d = v < 0.5 ? 1 : -1, r = Math.sin(t * 3 + k) > 0;
      rect(x - 7, y - 1, x + 7, y + 1, [hex('#a83a2a'), hex('#3a5a8a'), hex('#e8e0cc')][k]); rect(x - 7, y - 1, x + 7, y - 1, hex('#f0e8d4')); pset(x + 8 * d, y - 1, [hex('#a83a2a'), hex('#3a5a8a'), hex('#e8e0cc')][k]);
      d_genteD(R, x - 2 * d, y - 1, t, k + 4, { alto: 7, sombrero: k === 1 ? 'copa' : 'cofia' }); d_genteD(R, x + 3 * d, y - 1, t, k + 7, { alto: 6, falda: true });
      linea(x - 2 * d, y - 4, x - (r ? 9 : 6) * d, y + 2, hex('#c8a060')); for (let i = 0; i < 4; i++) pset(x - (10 + i * 3) * d, y + 1, hex('#e0f0f8')); }
    for (let k = 0; k < 2; k++) { if (!vis(k + 3)) continue; const x = Math.round(lx - 40 + k * 22 + Math.sin(t * 0.25 + k) * 14), y = ly + 6 + k * 3, d = Math.cos(t * 0.25 + k) > 0 ? 1 : -1;
      rect(x - 2, y - 1, x + 2, y, 0xffffffff); pset(x - 3 * d, y - 2, 0xffffffff); linea(x + 2 * d, y - 1, x + 3 * d, y - 4, 0xffffffff); pset(x + 4 * d, y - 4, hex('#e8783a')); pset(x + 3 * d, y - 4, C.k); pset(x, y + 1, hex('#c8e4f0')); }
    for (let k = 0; k < 4; k++) { if (!vis(k + 5)) continue; const v = (t * 0.03 + k * 0.25) % 1, d = k % 2 ? 1 : -1, x = d > 0 ? Math.round(-10 + v * 340) : Math.round(330 - v * 340), y = 145 + (k % 2) * 4;
      d_genteD(R, x, y, t, k + 2, { alto: 12, anda: true, dir: d, sombrero: k % 2 ? 'copa' : null, falda: !(k % 2), ropa: [hex('#7a3a5a'), hex('#2a2a34'), hex('#3a6a6a'), hex('#4a3a2a')][k] });
      if (!(k % 2)) { linea(x, y - 9, x + 2 * d, y - 13, hex('#5a3e24')); for (let i = -3; i <= 3; i++) pset(x + 2 * d + i, y - 14 + Math.round(Math.abs(i) * 0.5), hex('#f0e0e8')); } }
    if (vis(9)) { const v = (t * 0.05) % 1, x = Math.round(330 - v * 360); d_caballitoD(R, x, 96, t, -1, hex('#e8e0d0')); rect(x + 9, 89, x + 18, 93, hex('#24202a')); rect(x + 15, 85, x + 18, 89, hex('#24202a')); disco(x + 16, 94, 2, hex('#c8902a')); disco(x + 11, 95, 1, hex('#c8902a')); d_genteD(R, x + 11, 89, t, 3, { alto: 6, sombrero: 'copa' }); }
    if (vis(10)) { const v = (t * 0.08) % 1, x = Math.round(20 + v * 260), y = 170; d_genteD(R, x, y, t, 6, { alto: 9, anda: true, falda: true, ropa: hex('#c84a5a') }); const ax = x + 6; for (let a = 0; a < 20; a++) { const an = a / 20 * Math.PI * 2; pset(ax + Math.round(Math.cos(an) * 3), y - 3 + Math.round(Math.sin(an) * 3), hex('#8a6a44')); } linea(x + 2, y - 5, ax, y - 3, hex('#5a3e24')); }
  }
  d_gaviotasD(R, t, 160, 50, 80, 8, 2, 4);
  return { suelo: 166, pies: [30, 290], lago: [...d_LAGO_D], puente: [240, 102], obra: u };
}

// un caballito lejano (unos 9 px) al paso, de lado; (x, y) los cascos de delante; d dirección; c su color
function d_caballitoD(R, x, y, t, d, c) {
  const X = (i) => Math.round(x + i * d), p = Math.floor(t * 5) % 2, cS = d_mezclaD(c, 0xff000000, 0.3);
  R.rect(Math.min(X(-8), X(-1)), y - 5, Math.max(X(-8), X(-1)), y - 3, c); R.rect(Math.min(X(-1), X(0)), y - 7, Math.max(X(-1), X(0)), y - 4, c); R.pset(X(1), y - 6, c); R.pset(X(1), y - 5, cS); R.pset(X(-9), y - 4, cS);
  for (const [px, f] of [[-7, p], [-2, 1 - p]]) { R.pset(X(px + f), y - 2, cS); R.pset(X(px + f), y - 1, cS); R.pset(X(px + 1 - f), y - 1, c); }
}

// una roca de esquisto de Manhattan: lomo redondeado, vetas inclinadas brillantes y su sombra; (x, y): la base, w × hh
function d_rocaD(R, x, y, w, hh, sem) {
  for (let j = 0; j < hh; j++) for (let i = -w; i <= w; i++) { const e = (i / w) ** 2 + ((hh - j) / hh) ** 2 * 0.9 + 0.12 * h(i >> 2, sem, 605); if (e > 1) continue; const veta = (i + j * 2 + sem) % 7 === 0, luz = i < -w * 0.3 && j > hh * 0.5;
    R.pset(x + i, y - j, veta ? hex('#b8bcc8') : e > 0.82 ? hex('#4a4a56') : luz ? hex('#9a9eaa') : (h(i, j, sem) < 0.15 ? hex('#6a6e7a') : hex('#7e828e'))); }
}

// un olmo grande del parque: tronco con su corteza, copa en racimos de tres verdes; (x, suelo), r el radio de la copa
function d_olmoD(R, x, suelo, r, sem) {
  R.rect(x - 2, suelo - r * 1.6, x + 2, suelo, hex('#5a4030')); R.rect(x + 1, suelo - r * 1.6, x + 2, suelo, hex('#3e2c20')); R.linea(x, suelo - r * 1.2, x - r * 0.6, suelo - r * 1.8, hex('#5a4030')); R.linea(x, suelo - r * 1.3, x + r * 0.5, suelo - r * 1.9, hex('#5a4030'));
  for (let k = 0; k < 14; k++) { const a = h(k, sem, 606) * Math.PI * 2, d = h(k, sem, 607) * r * 0.8, cx = Math.round(x + Math.cos(a) * d * 1.2), cy = Math.round(suelo - r * 2 + Math.sin(a) * d * 0.7), rr = Math.round(r * 0.45);
    R.disco(cx, cy + 1, rr, hex('#2e5a26')); R.disco(cx, cy, rr, hex('#4a8a36')); R.disco(cx - 1, cy - 2, Math.max(1, Math.round(rr * 0.55)), hex('#6aaa48')); }
}

// la capa fija de Central Park, en la obra (fin false) o terminado (fin true): el fondo con la ciudad lejana y el depósito
// de agua de muros de piedra, las lomas (tierra removida o césped con olmos), el lago (hoyo con charco y terrazas de
// tierra, o lleno), el puente (con su cimbra de madera o terminado), las rocas, y el primer término (tablones, carretillas,
// piedras, arbolitos con tutor y la caseta de herramientas; o el césped con el camino de grava, el banco y la farola)
function d_parqueFijoD(R, fin) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, [lx, ly, lrx, lry] = d_LAGO_D;
  // el fondo: la ciudad baja y lejana con torres de iglesia, y el depósito de agua de muros inclinados
  for (let x = 0; x < 320; x++) { const top = 80 - Math.floor(h(Math.floor(x / 6), 1, 608) * 7); for (let y = top; y < 104; y++) B[y * 320 + x] = (x % 6 === 0) ? hex('#9a9ab0') : ((y - top) % 3 === 1 && x % 2) ? hex('#8a8aa0') : hex('#aeb0c4'); }
  for (const tx of [46, 132, 210]) { rect(tx, 66, tx + 2, 80, hex('#9a9ab0')); poligono([[tx - 1, 66], [tx + 1, 58], [tx + 3, 66]], hex('#8a8aa0')); }
  for (let x = 236; x < 320; x++) for (let y = 78; y < 92; y++) { const m = Math.min(x - 236, 319 - x); if (y < 92 - Math.min(14, m * 1.5)) continue; B[y * 320 + x] = y === 78 ? hex('#d8d0c0') : (y % 3 === 0 || (x + Math.floor(y / 3) * 4) % 8 === 0) ? hex('#a8a090') : hex('#c4bcac'); }
  // las lomas de en medio
  for (let x = 0; x < 320; x++) { const top = Math.round(92 - 5 * Math.sin(x * 0.02 + 1) - 3 * Math.sin(x * 0.07)); for (let y = top; y < 140; y++) { let c;
      if (fin) c = y === top ? hex('#7ab04a') : h(x, y, 609) < 0.1 ? hex('#4a8a34') : ((x >> 1) + (y >> 1)) % 9 === 0 ? hex('#6aa040') : hex('#5c9a3c');
      else { const capa = Math.floor((y - top + Math.sin(x * 0.1) * 2) / 4); c = y === top ? hex('#a8865a') : capa % 3 === 0 ? hex('#8a6a44') : capa % 3 === 1 ? hex('#9a7a50') : hex('#7a5a3a'); if (h(x, y, 610) < 0.06) c = hex('#6a6e7a'); if (h(x >> 2, y >> 2, 611) < 0.08) c = hex('#5a7a3a'); }
      B[y * 320 + x] = c; } }
  if (fin) { for (const [ax, ay, r, k] of [[30, 104, 9, 1], [64, 100, 7, 2], [100, 98, 6, 3], [262, 104, 8, 4], [296, 102, 9, 5], [228, 98, 6, 6]]) d_olmoD(R, ax, ay, r, k); }
  else { for (let k = 0; k < 7; k++) { const x = 20 + k * 44; rect(x, 92, x, 97, hex('#7a5a3a')); pset(x - 1, 92, hex('#5a8a3a')); pset(x + 1, 91, hex('#5a8a3a')); }   // tocones y arbolitos
    rect(100, 86, 116, 92, hex('#8a7a6a')); poligono([[98, 86], [108, 80], [118, 86]], hex('#6a5a4a')); rect(106, 88, 109, 92, hex('#3a2a20'));   // la caseta del capataz
    for (let k = 0; k < 6; k++) { const x = 200 + k * 7; rect(x, 88, x + 4, 92, hex('#c8b48a')); rect(x, 88, x + 4, 88, hex('#e0d0a8')); } }   // tablones apilados
  // el lago: lleno con su orilla de piedras, o el hoyo con terrazas de tierra y un charco en el fondo
  for (let y = ly - lry - 2; y <= ly + lry + 2; y++) for (let x = lx - lrx - 2; x <= lx + lrx + 2; x++) { const e = ((x - lx) / lrx) ** 2 + ((y - ly) / lry) ** 2; if (e > 1.06) continue; let c;
    if (fin) { c = e > 0.94 ? (h(x, y, 612) < 0.5 ? hex('#a8a090') : hex('#7e786a')) : y < ly - lry * 0.3 ? hex('#5a92b4') : y < ly + lry * 0.3 ? hex('#4a82a6') : hex('#3e7296'); if (e < 0.94 && y < ly - 4 && Math.abs(x - 40 - (y - ly) * 0) < 0 ) c = hex('#3a6a4a'); }
    else { const e2 = ((x - lx) / (lrx * 0.42)) ** 2 + ((y - ly) / (lry * 0.42)) ** 2; c = e2 < 1 ? (y < ly ? hex('#6a8a8a') : hex('#5a7a7a')) : Math.floor(e * 6) % 2 ? hex('#7a5a3a') : hex('#8a6a44'); if (e > 0.94) c = hex('#a8865a'); if (!(e2 < 1) && h(x >> 1, y, 613) < 0.05) c = hex('#5a3e24'); }
    B[y * 320 + x] = c; }
  if (fin) for (const [cx, w] of [[30 + 10, 9], [64 + 10, 7], [262 - 50, 8]]) for (let y = ly - lry + 3; y < ly - lry + 3 + w; y++) for (let x = cx - w; x <= cx + w; x++) if (((x - lx) / lrx) ** 2 + ((y - ly) / lry) ** 2 < 0.9 && d_umbralD(x, y) < 0.3) B[y * 320 + x] = hex('#3a6a5a');   // reflejos de los árboles
  // el puente de piedra sobre el extremo derecho del lago (o su cimbra de madera con medio arco puesto)
  { const x0 = 214, x1 = 266, yt = 102, cx = 240;
    for (let y = yt; y <= ly + 4; y++) for (let x = x0; x <= x1; x++) { const arco = ((x - cx) / 14) ** 2 + ((y - (ly + 4)) / 13) ** 2 < 1; let c = null;
      if (fin) { if (arco) { if (((x - cx) / 14) ** 2 + ((y - (ly + 4)) / 13) ** 2 > 0.8) c = hex('#8a8478'); else continue; } else c = y < yt + 2 ? hex('#d8d0bc') : y === yt + 2 ? hex('#5a5448') : ((x + (Math.floor(y / 3) % 2) * 3) % 6 === 0 || y % 3 === 0) ? hex('#9a9282') : hex('#bcb4a2'); }
      else { if (arco) continue; const hecho = x < cx - 4 && y > yt + 4; c = hecho ? ((x + (Math.floor(y / 3) % 2) * 3) % 6 === 0 || y % 3 === 0 ? hex('#9a9282') : hex('#bcb4a2')) : null; }
      if (c != null) B[y * 320 + x] = c; }
    if (fin) { for (let x = x0; x <= x1; x += 4) { rect(x, yt - 4, x, yt, hex('#c8c0ae')); } rect(x0, yt - 5, x1, yt - 5, hex('#e0d8c4')); }
    else { for (let a = 0; a <= 20; a++) { const an = Math.PI + a / 20 * Math.PI, xx = Math.round(cx + Math.cos(an) * 14), yy = Math.round(ly + 4 + Math.sin(an) * 13); pset(xx, yy, hex('#a07a4a')); if (a % 3 === 0) linea(xx, yy, xx, ly + 4, hex('#8a6a3e')); }
      for (const px of [x0 + 2, x1 - 2]) rect(px - 1, yt - 26, px + 1, ly + 4, hex('#7a5a34')); linea(x0 + 2, yt - 26, 244, 76, hex('#7a5a34')); linea(x0 + 2, yt - 26, 244, 76, hex('#7a5a34')); rect(242, 74, 246, 76, hex('#5a3e24')); } }
  // las rocas de esquisto (las dejaron en el parque)
  d_rocaD(R, 28, 132, 22, 14, 1); d_rocaD(R, 52, 128, 12, 8, 2); d_rocaD(R, 292, 140, 24, 16, 3); d_rocaD(R, 276, 134, 10, 7, 4);
  // el primer término
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (fin) { const xc = 160 + Math.sin((y - 136) * 0.08) * 40 - (y - 136) * 0.6, w = 8 + (y - 136) * 0.3, camino = Math.abs(x - xc) < w;
      c = camino ? (Math.abs(x - xc) > w - 1.5 ? hex('#a89676') : h(x, y, 614) < 0.12 ? hex('#a89676') : hex('#d4c4a0')) : (h(x, y, 615) < 0.12 ? hex('#4a8a34') : ((x >> 2) + (y >> 1)) % 5 === 0 ? hex('#6aaa48') : hex('#5c9a3c')); }
    else { const tablon = Math.abs(y - 150 - (x - 100) * 0.05) < 2 && x > 60 && x < 250; c = tablon ? (Math.abs(y - 150 - (x - 100) * 0.05) < 1 ? hex('#c8a46a') : hex('#8a6a3e')) : (h(x, y, 616) < 0.08 ? hex('#6a4e30') : (y + Math.floor(x / 9)) % 6 === 0 ? hex('#7a5a3a') : h(x >> 2, y >> 2, 617) < 0.2 ? hex('#a07e54') : hex('#8e6c46')); if (h(x, y, 618) < 0.03) c = hex('#8a8e9a'); }
    B[y * 320 + x] = c; }
  if (fin) {
    d_olmoD(R, 18, 178, 16, 7);
    { const bx = 228, by = 160; rect(bx, by - 6, bx + 22, by - 5, hex('#5a3e24')); rect(bx, by - 3, bx + 22, by - 2, hex('#8a6a44')); rect(bx, by - 6, bx + 22, by - 6, hex('#a8845a')); for (const lx2 of [bx + 2, bx + 19]) rect(lx2, by - 6, lx2 + 1, by + 2, CD.hierro); }
    { const fx = 266; rect(fx, 128, fx + 1, 162, CD.hierro); rect(fx - 2, 120, fx + 3, 128, CD.hierro); rect(fx - 1, 121, fx + 2, 126, hex('#e8eef0')); rect(fx - 3, 119, fx + 4, 119, CD.hierro); rect(fx - 2, 160, fx + 3, 162, CD.hierro); }
    for (let k = 0; k < 24; k++) { const x = 60 + Math.round(h(k, 1, 619) * 40), y = 170 + Math.round(h(k, 2, 619) * 8); pset(x, y, [hex('#e84a4a'), hex('#f0d040'), hex('#f4f0f0'), hex('#c060c0')][k % 4]); pset(x, y + 1, hex('#3e7a2e')); }
  } else {
    for (const [bx, by, d] of [[54, 166, 1], [268, 172, -1]]) { rect(bx - 6, by - 6, bx + 6, by - 3, hex('#7a5a3a')); rect(bx - 6, by - 6, bx + 6, by - 6, hex('#a07a4a')); rect(bx - 5, by - 7, bx + 5, by - 7, hex('#8a6a44')); disco(bx + 7 * d, by - 2, 2, hex('#2a2a2a')); linea(bx - 6 * d, by - 4, bx - 12 * d, by - 8, hex('#5a3e24')); linea(bx - 6 * d, by - 3, bx - 6 * d, by, hex('#5a3e24')); }
    for (let k = 0; k < 9; k++) { const x = 286 + (k % 3) * 7 - Math.floor(k / 3) * 3, y = 160 - Math.floor(k / 3) * 5; for (let j = -2; j <= 2; j++) for (let i = -3; i <= 3; i++) if ((i / 3.5) ** 2 + (j / 2.5) ** 2 < 1) pset(x + i, y + j, j < 0 ? hex('#a8acb8') : hex('#7a7e8a')); }   // el montón de piedras
    for (let k = 0; k < 5; k++) { const x = 120 + k * 26, y = 176; rect(x, y - 12, x, y, hex('#7a5a34')); pset(x + 1, y - 13, hex('#7a5a34')); rect(x + 2, y - 10, x + 2, y, hex('#5a4030')); for (const [dx, dy] of [[1, -10], [3, -9], [2, -12], [4, -11], [0, -8]]) pset(x + dx, y + dy, hex('#6aaa48')); pset(x + 2, y - 11, hex('#4a8a34')); }   // los arbolitos con su tutor
    { const sx = 6; rect(sx, 140, sx + 26, 162, hex('#8a7a5a')); for (let x = sx; x <= sx + 26; x += 3) rect(x, 140, x, 162, hex('#6a5a40')); poligono([[sx - 3, 141], [sx + 13, 130], [sx + 29, 141]], hex('#5a4a3a')); rect(sx + 9, 148, sx + 16, 162, hex('#3a2a1e'));
      for (const [tx, tt] of [[sx + 28, 0], [sx + 31, 1], [sx + 34, 2]]) { linea(tx, 162, tx + 1, 146, hex('#8a6a44')); if (tt === 0) rect(tx - 1, 160, tx + 2, 162, hex('#6a6e7a')); else if (tt === 1) { linea(tx + 1, 146, tx - 2, 144, hex('#6a6e7a')); linea(tx + 1, 146, tx + 4, 144, hex('#6a6e7a')); } else rect(tx, 144, tx + 2, 146, hex('#6a6e7a')); } }   // la caseta de herramientas con pico, pala y azada
  }
}

// la borda (barandilla blanca) tiene el pasamanos en y 134 y llega a la cubierta en y 146; la cubierta de tablas va de y 146
// a 180 (los pies de los personajes en y 160); por encima de la borda, la bahía (horizonte en y 100)
function d_cubiertaD(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const barco = d_capaD(R, 'cubierta', () => d_cubiertaFijoD(R)), ciudad = d_capaD(R, 'cubiertaCiudad', () => d_ciudad1890D(R));
  d_cieloD(R, t, { hor: 100, modo: 'bruma', sol: [150, 26, 7], cumulos: 5 });
  if (o.ciudad) d_ponerD(R, ciudad, 50, 100);
  else for (let x = 0; x < 320; x++) { const y = 97 - Math.round(2 + Math.sin(x * 0.03) * 2); for (let yy = y; yy < 100; yy++) pset(x, yy, hex('#9aaab4')); }
  d_aguaD(R, t, 100, 146, [hex('#8ab0c4'), hex('#6a96b0'), hex('#5684a0'), hex('#467490')], { v: 9, n: 70 });
  // la Estatua de la Libertad que asoma por la proa (o.estatua 0–1: de fuera de cuadro a su sitio) en su isla
  const e = Math.max(0, Math.min(1, o.estatua ?? 0)), sx = Math.round(372 - (1 - (1 - e) ** 2) * 162);
  if (e > 0) d_estatuaD(R, sx, 100, t);
  // barcos de la bahía: un remolcador con su humo, un ferry de ruedas y una goleta
  { const x = Math.round(((t * 4) % 400) - 40), y = 112; rect(x - 9, y - 3, x + 9, y, hex('#3a2a24')); rect(x - 9, y - 3, x + 9, y - 3, hex('#a83a2a')); rect(x - 4, y - 8, x + 4, y - 4, hex('#e8e0cc')); rect(x - 1, y - 13, x + 1, y - 8, hex('#2a2a2a')); rect(x - 1, y - 12, x + 1, y - 12, hex('#c83a2a')); d_humoD(R, x, y - 14, t, { alto: 16, viento: -12, c: hex('#5a5a62'), r: 3 }); for (let k = 0; k < 5; k++) pset(x - 10 - k * 3, y + (k % 2), 0xffffffff); }
  { const x = Math.round(300 - ((t * 2.5) % 380)), y = 104; rect(x - 14, y - 3, x + 14, y, hex('#f0ead8')); rect(x - 12, y - 6, x + 12, y - 4, hex('#e0d8c4')); for (let i = -10; i < 12; i += 3) pset(x + i, y - 5, hex('#3a4a5a')); rect(x - 2, y - 10, x - 1, y - 7, hex('#2a2a2a')); d_humoD(R, x - 1, y - 11, t + 1, { alto: 12, viento: 8, c: hex('#6a6a72'), r: 2 }); }
  { const x = Math.round(90 + Math.sin(t * 0.15) * 30), y = 124, b = Math.round(Math.sin(t * 1.5)); rect(x - 10, y - 2 + b, x + 10, y + b, hex('#4a3a2a')); linea(x, y - 22 + b, x, y - 2 + b, CD.mastilS); for (let j = 0; j < 18; j++) rect(x + 1, y - 21 + j + b, x + 1 + Math.round(j * 0.5), y - 21 + j + b, j % 6 === 0 ? CD.vela2S : CD.vela2); }
  d_gaviotasD(R, t, 180, 70, 90, 12, 4, 5);
  d_ponerD(R, barco);
  // el humo de la chimenea del vapor, que se va hacia atrás
  d_humoD(R, 27, 34, t, { alto: 20, viento: -16, c: hex('#4a4a52'), r: 5, n: 8, v: 0.35 });
  // los banderines de la jarcia y el pañuelo que alguien agita al fondo de la borda
  for (let i = 0; i < 8; i++) { const x = 266 + i * 4, y = 22 + i * 12, c = [CD.rojoB, hex('#f0d040'), CD.azulB, CD.blancoB][i % 4]; if (x > 276 && y < 46) continue; pset(x, y, c); pset(x + 1 + (Math.sin(t * 6 + i) > 0 ? 1 : 0), y + 1, c); }
  { const p = Math.sin(t * 7); d_genteD(R, 236, 146, t, 4, { alto: 13, falda: true, sombrero: 'pañuelo', ropa: hex('#5a3a5a') }); linea(237, 137, 240, 129, hex('#f0c8a0')); rect(240 + (p > 0 ? 1 : 0), 126, 243 + (p > 0 ? 1 : 0), 128, 0xffffffff); }
  // la jaula con el canario, que salta de palo en palo
  { const jx = 124, jy = 172, sal = Math.floor(t * 1.3) % 2; rect(jx - 6, jy, jx + 6, jy + 1, hex('#8a6a24')); for (let x = jx - 6; x <= jx + 6; x += 2) linea(x, jy - 1, x, jy - 12 + Math.round(Math.abs(x - jx) * 0.4), CD.laton); pset(jx, jy - 14, CD.laton); linea(jx - 5, jy - 5, jx + 5, jy - 5, CD.latonS);
    const bx = jx - 2 + sal * 4, by = sal ? jy - 6 : jy - 2; rect(bx - 1, by - 2, bx + 1, by, hex('#f4d030')); pset(bx + (sal ? 2 : -2), by - 2, hex('#e88a2a')); pset(bx + (sal ? 1 : -1), by - 2, C.k); if (Math.sin(t * 9) > 0.5) pset(bx, by - 3, hex('#f8e070')); }
  return { suelo: 160, pies: [60, 250], borda: 134, cubierta: 146, horizonte: 100, estatua: e > 0 ? [sx - 4, 30] : null, isla: [sx, 100] };
}

// la Estatua de la Libertad de cobre verde en su isla: el fuerte en estrella, el pedestal de granito con sus pilastras y
// la logia, la figura con los pliegues de la túnica, la tabla en el brazo izquierdo, la corona de siete rayos y el brazo
// derecho en alto con la antorcha dorada que brilla; (x, y): el centro de la base en el agua
function d_estatuaD(R, x, y, t) {
  const { rect, pset, linea, poligono, disco } = R, cb = CD.cobre, cS = CD.cobreS, cL = CD.cobreL, cD = CD.cobreD;
  // la isla, los árboles y el fuerte en estrella
  for (let i = -30; i <= 30; i++) { const top = y - 2 - Math.round(Math.cos(i / 30 * Math.PI / 2) * 3); rect(x + i, top, x + i, y, i % 5 === 0 ? hex('#4a7a3a') : hex('#5a8a44')); }
  for (let i = -16; i <= 16; i++) { const pico = 4 - Math.abs(((i + 16) % 8) - 4); rect(x + i, y - 8 - Math.round(pico * 0.6), x + i, y - 3, i > 8 ? hex('#a89a80') : hex('#c8b89a')); pset(x + i, y - 8 - Math.round(pico * 0.6), hex('#e0d4b8')); }
  for (const tx of [-24, -20, 22, 26]) { disco(x + tx, y - 5, 2, hex('#3e6a32')); pset(x + tx - 1, y - 6, hex('#6a9a4a')); }
  // el pedestal: el zócalo, el cuerpo con pilastras, la logia y el remate
  rect(x - 9, y - 30, x + 9, y - 8, hex('#c8bca4')); rect(x + 4, y - 30, x + 9, y - 8, hex('#a89c84')); rect(x - 10, y - 12, x + 10, y - 8, hex('#d8ccb4'));
  for (const px of [-7, -2, 3]) rect(x + px, y - 26, x + px + 1, y - 14, hex('#e0d6c0')); rect(x - 7, y - 22, x + 6, y - 21, hex('#8a7e68')); for (const px of [-5, 0, 5]) rect(x + px, y - 20, x + px, y - 16, hex('#5a5448'));
  rect(x - 10, y - 32, x + 10, y - 30, hex('#e0d6c0')); rect(x - 7, y - 34, x + 7, y - 33, hex('#c8bca4'));
  // la figura: la túnica con sus pliegues, de cobre verde con luz a la izquierda
  const by = y - 34;
  for (let j = 0; j < 22; j++) { const w = Math.round(5 - j * 0.12 + (j < 3 ? 1 : 0)); for (let i = -w; i <= w; i++) { const pl = (i + j * 0.3 + 10) % 3 < 1; pset(x + i, by - j, i < -w + 2 ? cL : i > w - 2 ? cD : pl ? cS : cb); } }
  // la tabla en el brazo izquierdo
  rect(x + 3, by - 17, x + 6, by - 10, cS); rect(x + 3, by - 17, x + 3, by - 10, cL); pset(x + 6, by - 9, cD);
  // la cabeza, la corona de siete rayos y el brazo derecho en alto con la antorcha
  const hy = by - 24; disco(x, hy, 2, cb); pset(x - 1, hy - 1, cL); pset(x + 1, hy + 1, cS);
  for (let k = 0; k < 7; k++) { const an = -Math.PI * (0.15 + k * 0.7 / 6), l = 3; linea(x, hy - 1, x + Math.round(Math.cos(an) * l * 1.3), hy - 1 + Math.round(Math.sin(an) * l), cL); }
  linea(x - 3, by - 20, x - 4, by - 31, cb); linea(x - 2, by - 20, x - 3, by - 31, cS); linea(x - 4, by - 21, x - 5, by - 31, cL);
  rect(x - 5, by - 33, x - 2, by - 32, cS); rect(x - 5, by - 34, x - 2, by - 34, C.oro);
  const fl = Math.sin(t * 8) > 0 ? 1 : 0; pset(x - 4, by - 35, CD.oroT); pset(x - 3, by - 35, CD.oroT); pset(x - 4 + fl, by - 36, hex('#fff8c0')); pset(x - 4, by - 37, CD.oroT);
  for (let a = 0; a < 16; a++) { const an = a / 16 * Math.PI * 2, r = 4 + (Math.sin(t * 3 + a) > 0.6 ? 1 : 0); if ((a + Math.floor(t * 4)) % 3 === 0) pset(x - 4 + Math.round(Math.cos(an) * r), by - 35 + Math.round(Math.sin(an) * r), hex('#fff4b0')); }
}

// la punta de Manhattan hacia 1890, vista desde la bahía: edificios de oficinas de 8–12 pisos con ventanas, la cúpula
// dorada de un periódico, la aguja de la iglesia de la Trinidad, chimeneas, los muelles con mástiles y, a la derecha, el
// puente de Brooklyn lejano
function d_ciudad1890D(R) {
  const { rect, pset, linea, poligono, disco } = R, B = R.buf;
  for (let x = 20; x < 196; x++) { const k = Math.floor(x / 8), alto = 8 + Math.floor(h(k, 1, 620) * 18) + (x > 90 && x < 140 ? 8 : 0), top = 98 - alto, c = [hex('#b8a898'), hex('#a89488'), hex('#c4b8a8'), hex('#9a8a84')][Math.floor(h(k, 2, 620) * 4)];
    for (let y = top; y < 100; y++) B[y * 320 + x] = x % 8 === 0 ? d_mezclaD(c, 0xff000000, 0.25) : ((y - top) % 3 === 1 && x % 2 === 1) ? d_mezclaD(c, hex('#3a4a5a'), 0.5) : c;
    if (x % 8 === 3 && h(k, 3, 620) < 0.4) rect(x, top - 3, x + 1, top - 1, hex('#7a6a64')); }
  rect(118, 60, 126, 82, hex('#c8b8a0')); disco(122, 59, 4, C.oro); pset(121, 57, CD.latonL); rect(122, 52, 122, 55, hex('#8a6a24'));   // la cúpula dorada
  rect(78, 64, 82, 84, hex('#8a7a70')); poligono([[78, 64], [80, 48], [83, 64]], hex('#7a6a64')); pset(80, 47, CD.laton);   // la aguja de la Trinidad
  for (let x = 20; x < 196; x += 14) { rect(x, 86, x, 98, CD.mastilS); rect(x - 2, 89, x + 2, 89, CD.mastilS); }
  // el puente de Brooklyn lejano: dos torres, los cables y el tablero
  for (const tx of [212, 262]) { rect(tx - 2, 74, tx + 2, 99, hex('#a89c90')); pset(tx - 1, 84, hex('#7a7068')); pset(tx + 1, 84, hex('#7a7068')); rect(tx - 1, 82, tx - 1, 88, hex('#8a8078')); rect(tx + 1, 82, tx + 1, 88, hex('#8a8078')); }
  for (let x = 196; x < 300; x++) { const u = (x - 212) / 50, y = x < 212 ? 75 + (212 - x) * 1.1 : x > 262 ? 75 + (x - 262) * 1.1 : 75 + Math.round(u * (1 - u) * 4 * 12); pset(x, Math.round(y), hex('#6a6a72')); pset(x, 90, hex('#7a7a82')); if (x % 3 === 0 && y < 90) for (let yy = Math.round(y); yy < 90; yy += 2) pset(x, yy, hex('#9a9aa2')); }
  for (let x = 196; x < 320; x++) { const top = 94 + Math.round(Math.sin(x * 0.1) * 1); for (let y = top; y < 100; y++) if (B[y * 320 + x] === d_VACIOD) B[y * 320 + x] = hex('#9a9090'); }
}

// la capa fija del vapor: la chimenea negra con su franja roja y los vientos, el bote salvavidas en sus pescantes, el palo
// con la verga y la vela aferrada, los ventiladores de bocina, la borda de barandilla blanca, la cubierta de tablas y el
// equipaje de los emigrantes: baúles con correas y etiquetas de colores, maletas, hatillos, una jaula con un canario
// (que vive en la función) y un rollo de cabo
function d_cubiertaFijoD(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // la chimenea y sus vientos
  rect(14, 34, 40, 146, hex('#1e1e24')); rect(14, 34, 17, 146, hex('#3a3a44')); rect(37, 34, 40, 146, hex('#121216')); rect(14, 46, 40, 54, hex('#b8302a')); rect(14, 46, 17, 54, hex('#d8504a')); rect(12, 32, 42, 35, hex('#2a2a32'));
  for (let y = 60; y < 140; y += 18) rect(14, y, 40, y, hex('#2e2e36'));
  linea(16, 40, 0, 120, hex('#3a3a40')); linea(38, 40, 64, 134, hex('#3a3a40'));
  // el bote salvavidas en sus pescantes
  for (const px of [52, 96]) { linea(px, 134, px, 92, hex('#e8e4dc')); linea(px, 92, px + 6, 88, hex('#e8e4dc')); linea(px + 6, 88, px + 6, 96, CD.cabo); }
  for (let i = 0; i < 52; i++) { const x = 50 + i, u = (i - 26) / 26, top = 96 + Math.round(u * u * 2), bot = 104 - Math.round(u * u * 4); for (let y = top; y <= bot; y++) pset(x, y, y === top ? hex('#8a6a44') : y < top + 3 ? 0xffffffff : hex('#d8d4cc')); }
  // el palo con la verga y la vela aferrada, y la jarcia
  rect(260, 0, 263, 146, hex('#8a6a44')); rect(260, 0, 260, 146, hex('#b08a5a')); rect(244, 30, 276, 31, CD.mastilS); rect(245, 32, 275, 34, CD.vela2); rect(245, 34, 275, 34, CD.vela2S);
  for (let k = 0; k < 4; k++) linea(261, 6, 226 + k * 10, 134, CD.cabo);
  for (let y = 40; y < 134; y += 7) { const f = (y - 6) / 128; linea(261 - Math.round(f * 35), y, 261 - Math.round(f * 5), y, hex('#6a5a44')); }
  // los ventiladores de bocina
  for (const [vx, s] of [[200, 1], [296, 0.8]]) { const w = Math.round(5 * s); rect(vx - w, 116, vx + w, 146, hex('#e8e4dc')); rect(vx + w - 1, 116, vx + w, 146, hex('#b8b4ac')); disco(vx + 2, 113, w + 3, hex('#e8e4dc')); disco(vx + 3, 113, w + 1, hex('#a83a2a')); disco(vx + 4, 113, w - 1, hex('#5a1a18')); }
  // la borda: el pasamanos de madera, los candeleros y los barrotes blancos, y la regala
  for (let x = 0; x < 320; x++) { rect(x, 134, x, 135, hex('#a07a4a')); pset(x, 133, hex('#c8a070')); pset(x, 136, hex('#6a4a2e')); if (x % 16 === 0) rect(x, 136, x + 1, 146, hex('#f0ece4')); else if (x % 4 === 0) rect(x, 137, x, 145, hex('#d8d4cc')); rect(x, 145, x, 146, hex('#c8c4bc')); }
  // la cubierta de tablas, con sus juntas y clavos
  for (let y = 147; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 120) * 10, f = Math.floor(u), junta = (u - f) < 0.08, k = h(f, y >> 3, 621); B[y * 320 + x] = junta ? hex('#7a5a3a') : (y % 9 === 0 && (f * 7) % 5 === 0) ? hex('#6a4e32') : k < 0.3 ? hex('#c8a876') : k < 0.6 ? hex('#bc9a68') : hex('#b0905e'); }
  // el equipaje: baúles con correas y etiquetas de colores (las banderitas de los países, en barras), maletas y hatillos
  const baul = (x, y, w, hh, c, tags) => { rect(x, y - hh, x + w, y, hex('#2a1e14')); rect(x + 1, y - hh + 1, x + w - 1, y - 1, c); rect(x + 1, y - hh + 1, x + w - 1, y - hh + 2, d_mezclaD(c, 0xffffffff, 0.25)); for (const sx of [x + 3, x + w - 4]) rect(sx, y - hh, sx + 1, y, hex('#5a3a20')); rect(x, y - Math.round(hh / 2), x + w, y - Math.round(hh / 2), CD.laton);
    tags.forEach((tg, i) => { const tx = x + 6 + i * 6, ty = y - hh + 3; tg.forEach((cc, j) => rect(tx, ty + j, tx + 3, ty + j, cc)); }); };
  baul(14, 176, 26, 14, hex('#6a4a2e'), [[hex('#3a8a4a'), 0xffffffff, hex('#e8783a')], [hex('#1a1a1a'), hex('#c8303a'), hex('#f0c030')]]);
  baul(18, 162, 20, 10, hex('#3a4a6a'), [[hex('#3a8a4a'), 0xffffffff, hex('#c8303a')]]);
  baul(270, 174, 30, 16, hex('#7a3a2a'), [[0xffffffff, hex('#c8303a'), 0xffffffff], [hex('#2a5aa8'), hex('#f0d040'), hex('#2a5aa8')], [hex('#c8303a'), 0xffffffff, hex('#2a3a7a')]]);
  for (const [mx, my, c] of [[84, 172, hex('#8a5a32')], [96, 174, hex('#5a3a2a')], [252, 160, hex('#6a5a3a')]]) { rect(mx, my - 8, mx + 11, my, hex('#2a1e14')); rect(mx + 1, my - 7, mx + 10, my - 1, c); rect(mx + 4, my - 10, mx + 7, my - 9, hex('#2a1e14')); pset(mx + 2, my - 7, d_mezclaD(c, 0xffffffff, 0.3)); }
  for (const [hx, hy, c] of [[60, 170, hex('#c8b890')], [206, 176, hex('#a85a4a')], [232, 166, hex('#8a9a6a')]]) { disco(hx, hy - 4, 5, hex('#2a1e14')); disco(hx, hy - 4, 4, c); pset(hx - 2, hy - 7, d_mezclaD(c, 0xffffffff, 0.4)); linea(hx - 1, hy - 9, hx + 2, hy - 12, hex('#5a3e24')); pset(hx, hy - 9, hex('#5a3e24')); }
  // un rollo de cabo
  for (let r = 7; r > 0; r -= 2) for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; pset(150 + Math.round(Math.cos(an) * r), 176 + Math.round(Math.sin(an) * r * 0.4), r % 4 === 1 ? hex('#a8946a') : hex('#c8b48a')); }
}

// perspectiva con fuga en (160, 92): la pared del fondo va de x 100 a 220 (arranque de la bóveda en y 63, suelo en y 106);
// cada «anillo» s de la sala (s = 1 en el fondo, más grande hacia la cámara) tiene el suelo en y = 92 + 14 s, la galería en
// y = 92 − 13 s y el arranque de la bóveda en y = 92 − 29 s; X lateral de −1 (pared izquierda) a 1 (derecha) en x = 160 + 60 s X
const d_ES_D = { suelo: (s) => 92 + 14 * s, galeria: (s) => 92 - 13 * s, arranque: (s) => 92 - 29 * s, x: (X, s) => 160 + 60 * s * X };

function d_ellisD(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const sala = d_capaD(R, 'ellisSala', () => d_ellisFijoD(R)), mesa = d_capaD(R, 'ellisMesa', () => d_ellisMesaFijaD(R));
  d_ponerD(R, sala);
  // la luz que entra por el ventanal del fondo, con motas que flotan
  for (let k = 0; k < 18; k++) { const u = (h(k, 1, 630) + t * 0.015 * (1 + k % 3)) % 1, x = Math.round(140 + u * 60 + Math.sin(t * 0.6 + k) * 6), y = Math.round(60 + u * 70 + Math.cos(t * 0.4 + k) * 4); if (Math.sin(t * 2 + k) > 0) pset(x, y, d_mezclaD(R.pget(x, y), 0xffffffff, 0.6)); }
  // las lámparas de globos de las arañas, que titilan un poco
  for (const [cx, cy] of [[96, 40], [224, 40], [160, 30]]) for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI * 2, gx = cx + Math.round(Math.cos(an) * 7), gy = cy + Math.round(Math.sin(an) * 2); disco(gx, gy, 1, Math.sin(t * 3 + k + cx) > 0.8 ? 0xffffffff : hex('#fff0c0')); }
  // la gente de la galería que se asoma por la barandilla
  for (let k = 0; k < 16; k++) { const lado = k % 2 ? 1 : -1, s = 1.08 + (k >> 1) * 0.11, x = Math.round(d_ES_D.x(lado * 0.98, s)), y = Math.round(d_ES_D.galeria(s)) - 1, b = Math.sin(t * 1.5 + k) > 0.7 ? 1 : 0;
    pset(x, y - 1 - b, [hex('#f0c8a0'), hex('#d8a880'), hex('#c89068')][k % 3]); pset(x, y - 2 - b, [hex('#3a2a1a'), hex('#1a1a20'), hex('#8a5a2a')][k % 3]); pset(x + lado * -1, y - b, [hex('#3a4a6a'), hex('#6a3a3a'), hex('#4a4a3a')][k % 3]); }
  // las filas de los que esperan, entre las barandillas de hierro: avanzan a pasitos hacia las mesas
  const fila = [];
  for (let k = 0; k < 34; k++) { const carril = k % 4, X = [-0.62, -0.31, 0.0, 0.31][carril] + 0.15, s = 1.08 + ((h(k, 1, 631) + t * 0.012) % 1) * 0.95; fila.push([s, X, k]); }
  fila.sort((a, b) => a[0] - b[0]);
  for (const [s, X, k] of fila) { const x = d_ES_D.x(X, s), y = d_ES_D.suelo(s), alto = Math.round(6.4 * s), anda = Math.sin(t * 0.8 + k) > 0.6;
    d_genteD(R, x, y, t, k, { alto, anda, dir: k % 3 ? 1 : -1, falda: k % 3 === 0, sombrero: ['gorra', 'pañuelo', null, 'copa', 'cofia'][k % 5], bulto: k % 2 ? 'hatillo' : 'maleta', ropa: [hex('#5a3a2a'), hex('#3a4a6a'), hex('#6a2a2a'), hex('#4a5a3a'), hex('#7a6a4a'), hex('#2a2a34')][k % 6] }); }
  // las barandillas de los carriles (por delante de la gente de cada carril, en tramos)
  for (const X of [-0.78, -0.47, -0.16, 0.15, 0.46]) { for (let s = 1.05; s < 2.05; s += 0.01) { const x = Math.round(d_ES_D.x(X + 0.15 - 0.15, s)), y = Math.round(d_ES_D.suelo(s) - 3.9 * s); pset(x, y, CD.hierroL); pset(x, y + 1, CD.hierro); }
    for (let s = 1.1; s < 2.05; s += 0.18) { const x = Math.round(d_ES_D.x(X, s)), y0 = Math.round(d_ES_D.suelo(s)); rect(x, Math.round(y0 - 3.9 * s), x, y0, CD.hierro); } }
  // quien está detrás de la mesa del funcionario (la escena lo pone aquí) y la mesa por delante
  if (typeof o.detras === 'function') o.detras(t);
  d_ponerD(R, mesa, 110, 179);
  // la pluma del registro que tiembla en su tintero y la hoja que se levanta un poco
  { const p = Math.round(Math.sin(t * 2) * 0.6); linea(290, 132, 294 + p, 122, hex('#f4f0e4')); pset(295 + p, 121, hex('#d8d2c4')); }
  return { suelo: 168, pies: [20, 200], mesa: [204, 138, 300, 176], funcionario: [226, 150], fila: [186, 168], galeria: d_ES_D.galeria(1), ventanal: [160, 50] };
}

// la capa fija de la gran sala: la bóveda de azulejos en espiga con sus bandas, el ventanal en arco del fondo con sus
// parteluces, las ventanas altas de los lados, la galería con su barandilla de hierro, las banderas colgadas, las puertas
// en arco de abajo, los bancos de madera, el suelo de baldosa roja en espiga y la luz que cae del ventanal
function d_ellisFijoD(R) {
  const { rect, pset, linea, disco } = R, B = R.buf, E = d_ES_D;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const ax = Math.abs(x - 160); let c;
    const yFloor = ax > 60 ? 106 + (ax - 60) * 0.233 : 106, ySpring = ax > 60 ? 63 - (ax - 60) * 0.483 : 63;
    if (y >= yFloor) {   // el suelo de baldosa roja
      const s = (y - 92) / 14, X = (x - 160) / (60 * s), Z = 1 / s, u = X * 14, v = Z * 40, a = Math.floor(u), b = Math.floor(v), her = (a + b) % 2 === 0, fu = u - a, fv = v - b;
      c = (her ? fu < 0.12 : fv < 0.14) ? hex('#7a3a2a') : h(a, b, 632) < 0.2 ? hex('#b8604a') : (her ? hex('#a85440') : hex('#9a4a38')); if (Math.abs(X) > 0.98) c = hex('#6a5a4a');
    } else if (ax <= 60 && y >= ySpring) {   // la pared del fondo: el ventanal, la galería y las puertas
      c = (y % 6 === 0 || (x + (Math.floor(y / 6) % 2) * 6) % 12 === 0) ? hex('#c8b89a') : hex('#e2d6bc');
      const wx = x - 160; if (Math.abs(wx) < 26 && y < 77) c = d_umbralD(x, y) < 0.15 ? hex('#a8c8dc') : hex('#e8f4f8');
      if (y >= 79 && y < 83) c = y === 79 ? hex('#e8dcc4') : hex('#8a7a62');
      if (y >= 92 && Math.abs(((wx + 60) % 24) - 12) < 5) c = y < 95 && Math.abs(((wx + 60) % 24) - 12) > 3 ? hex('#c8b89a') : hex('#4a3a30');
    } else if (ax > 60 && y >= ySpring) {   // las paredes de los lados
      const s = ax / 60 * ((y >= E.galeria(1)) ? 1 : 1), sw = (92 - y) / 29, sx = ax / 60;
      // la profundidad s de la pared en esta columna es sx; la galería, las ventanas altas y las puertas de abajo
      const yg = E.galeria(sx), ya = E.arranque(sx), yf = E.suelo(sx);
      c = (y % 5 === 0 || (Math.round(sx * 40) % 6 === 0)) ? hex('#c8b89a') : hex('#dccfb2');
      const ventana = Math.abs(((sx * 9) % 1) - 0.5) < 0.22 && y > ya + (yg - ya) * 0.12 && y < yg - (yg - ya) * 0.1; if (ventana) { const arc = y < ya + (yg - ya) * 0.3; c = arc && Math.abs(((sx * 9) % 1) - 0.5) > 0.14 ? hex('#c8b89a') : d_umbralD(x, y) < 0.2 ? hex('#a8c8dc') : hex('#e4f0f6'); }
      if (y >= yg && y < yg + 3 * sx) c = y < yg + sx ? hex('#e8dcc4') : (x % 2 ? hex('#3a3a42') : hex('#8a7a62'));
      if (y > yg + 3 * sx && Math.abs(((sx * 6) % 1) - 0.5) < 0.2 && y > yg + (yf - yg) * 0.3) c = hex('#4a3a30');
      void s; void sw;
    } else {   // la bóveda de azulejos en espiga
      const dx = (x - 160) / 60; let lo = Math.max(1, Math.abs(dx) + 1e-3), hi = 4;
      for (let i = 0; i < 18; i++) { const m = (lo + hi) / 2, yy = 92 - 29 * m - 23 * Math.sqrt(Math.max(0, m * m - dx * dx)); if (yy > y) lo = m; else hi = m; }
      const s = (lo + hi) / 2, a = Math.acos(Math.max(-1, Math.min(1, dx / s))), p = a * 34, q = Math.log(s) * 60, ia = Math.floor(p / 2), iq = Math.floor(q / 4), her = (ia + iq) % 2 === 0, fp = p / 2 - ia, fq = q / 4 - iq;
      c = (her ? fp < 0.18 : fq < 0.2) ? CD.azulejJ : h(ia, iq, 633) < 0.15 ? CD.azulejS : h(ia, iq, 634) < 0.12 ? CD.azulejL : CD.azulej;
      if ((q % 18) < 1.4) c = hex('#b8a47a');
      if (a < 0.5 || a > Math.PI - 0.5) c = d_mezclaD(c, hex('#8a7a5a'), 0.25);
    }
    B[y * 320 + x] = c; }
  // los parteluces del ventanal del fondo y su arco
  for (let y = 46; y < 77; y++) for (const mx of [-26, -13, 0, 13, 26]) pset(160 + mx, y, hex('#8a8a92'));
  for (let x = 134; x <= 186; x++) { for (const yy of [56, 66]) pset(x, yy, hex('#8a8a92')); }
  for (let a = 0; a <= 40; a++) { const an = Math.PI + a / 40 * Math.PI; pset(160 + Math.round(Math.cos(an) * 26), 47 + Math.round(Math.sin(an) * 6), hex('#8a8a92')); }
  // la barandilla de la galería del fondo
  for (let x = 100; x <= 220; x++) { if (x % 3 === 0) rect(x, 75, x, 78, hex('#3a3a42')); pset(x, 74, hex('#3a3a42')); }
  // las banderas colgadas de la galería (barras y estrellas, sin escudos)
  for (const fx of [106, 200]) for (let j = 0; j < 22; j++) for (let i = 0; i < 14; i++) { let c = (i % 3 === 2) ? CD.blancoB : CD.rojoB; if (i < 8 && j < 9) c = (i + j) % 2 === 0 ? CD.blancoB : CD.azulB; if (j > 18 && (i + j) % 2) c = d_mezclaD(c, 0xff000000, 0.2); pset(fx + i, 83 + j, c); }
  // las arañas: varillas desde la bóveda y el aro
  for (const [cx, cy] of [[96, 40], [224, 40], [160, 30]]) { linea(cx, cy - 26, cx, cy - 2, hex('#3a3a42')); for (let a = 0; a < 30; a++) { const an = a / 30 * Math.PI * 2; pset(cx + Math.round(Math.cos(an) * 7), cy + Math.round(Math.sin(an) * 2), hex('#3a3a42')); } }
  // los bancos de madera junto a las paredes
  for (const [lado, s0] of [[-1, 1.5], [1, 1.5], [-1, 2.2], [1, 2.2]]) { const x0 = d_ES_D.x(lado * 0.9, s0), x1 = d_ES_D.x(lado * 0.9, s0 + 0.5); for (let i = 0; i <= 30; i++) { const u = i / 30, s = s0 + 0.5 * u, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(d_ES_D.suelo(s) - 2 * s); rect(x, y, x, y + Math.round(1.5 * s), hex('#7a5232')); pset(x, y, hex('#a07a4a')); } }
  // la luz del ventanal que cae sobre el suelo
  d_luzD(R, 100, 60, 230, 179, (x, y) => { const c = 160 + (y - 60) * 0.25, w = 18 + (y - 60) * 0.35; return Math.abs(x - c) < w && y > 106 && d_umbralD(x, y) < 0.5 ? 1 : 0; }, 0.14, hex('#fff4d0'));
}

// la capa de la mesa del funcionario (va por delante de quien está detrás): el pupitre alto de roble con sus paneles, el
// libro de registro abierto con renglones (sin letras), el tintero, el sello y un taburete; y en primer término, el poste y
// el tramo de barandilla donde empieza la fila
function d_ellisMesaFijaD(R) {
  const { rect, pset, linea } = R;
  rect(204, 138, 300, 176, hex('#4a2e18')); rect(206, 140, 298, 176, hex('#7a5232')); rect(204, 136, 302, 139, hex('#a07a4a')); rect(204, 139, 302, 139, hex('#5a3a20'));
  for (const px of [210, 240, 270]) { rect(px, 144, px + 24, 170, hex('#6a4428')); rect(px, 144, px + 24, 144, hex('#a07a4a')); rect(px, 144, px, 170, hex('#a07a4a')); rect(px + 24, 144, px + 24, 170, hex('#4a2e18')); rect(px + 4, 148, px + 20, 166, hex('#7a5232')); }
  rect(204, 174, 302, 176, hex('#3a2414'));
  // el libro de registro abierto con sus renglones
  rect(248, 128, 284, 136, hex('#e8e0cc')); rect(266, 128, 266, 136, hex('#a8a090')); rect(248, 135, 284, 136, hex('#c8c0ac')); for (let y = 130; y < 135; y += 2) { rect(251, y, 263, y, hex('#9a9aa8')); rect(269, y, 281, y, hex('#9a9aa8')); }
  rect(247, 136, 285, 136, hex('#5a2a20'));
  rect(288, 132, 293, 136, hex('#1a1a24')); pset(289, 132, hex('#6a6a80'));
  rect(210, 130, 214, 136, hex('#3a2a1a')); rect(209, 129, 215, 130, hex('#8a2a2a'));
  // el poste y el tramo de barandilla del primer término, donde empieza la fila
  rect(150, 140, 152, 176, CD.hierro); rect(150, 140, 150, 176, CD.hierroL); rect(149, 138, 153, 140, CD.hierro); rect(148, 175, 154, 177, CD.hierro);
  for (let x = 0; x < 150; x++) { const y = 152 - Math.round(x * 0.08); pset(x, y, CD.hierroL); pset(x, y + 1, CD.hierro); }
  for (const px of [40, 96]) { const y = 152 - Math.round(px * 0.08); rect(px, y, px + 1, 178, CD.hierro); }
}

// el cable principal baja de la silla de la torre (74, 33) hacia el centro del vano (fuera de cuadro, a la derecha);
// la torre ocupa x 34–114 (cornisa en y 30, arcos góticos de x 43–65 y 83–105 con la clave en y 54); la calzada pasa por
// delante con su firme en y 140–148 (las ruedas del carruaje en y 148) y la viga de celosía en y 149–163; el río debajo
const d_cableD = (x) => (x >= 74 ? 138 - 105 * ((400 - x) / 326) ** 2 : 33 + (74 - x) * 0.9 + (74 - x) ** 2 * 0.004);

function d_puenteD(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const fondo = d_capaD(R, 'puenteFondo', () => d_puenteFondoD(R)), puente = d_capaD(R, 'puente', () => d_puenteFijoD(R));
  d_cieloD(R, t, { hor: 118, sol: [196, 40, 7], cumulos: 5 });
  d_aguaD(R, t, 118, 179, [hex('#7aa0b4'), hex('#5a86a0'), hex('#48748e'), hex('#3a6480')], { v: 6, n: 80 });
  d_ponerD(R, fondo, 80, 124);
  // barcos del río: una goleta y un ferry al fondo (por encima de la calzada) y un remolcador por debajo del puente
  { const x = Math.round(340 - ((t * 3) % 420)), y = 128; rect(x - 10, y - 2, x + 10, y, hex('#3a2a20')); for (const m of [-4, 4]) { linea(x + m, y - 18, x + m, y - 2, CD.mastilS); for (let j = 0; j < 14; j++) rect(x + m + 1, y - 17 + j, x + m + 1 + Math.round(j * 0.35), y - 17 + j, CD.vela2); } }
  { const x = Math.round(((t * 5) % 420) - 50), y = 174; rect(x - 12, y - 3, x + 12, y, hex('#2a2a30')); rect(x - 12, y - 3, x + 12, y - 3, hex('#a83a2a')); rect(x - 5, y - 8, x + 5, y - 4, hex('#e8e0cc')); rect(x + 1, y - 13, x + 3, y - 8, hex('#2a2a2a')); d_humoD(R, x + 2, y - 14, t, { alto: 8, viento: -10, c: hex('#5a5a62'), r: 2 }); for (let k = 0; k < 6; k++) pset(x - 13 - k * 3, y + (k % 2) - 1, 0xffffffff); }
  // los reflejos de la torre en el agua de abajo
  for (let y = 166; y < 180; y++) for (let x = 36; x < 112; x++) if (d_umbralD(x, y) < 0.3 && (y + Math.floor(t * 3)) % 4) pset(x + Math.round(Math.sin(t * 2 + y) * 0.7), y, hex('#6a7a8a'));
  // los paseantes pequeños de la pasarela elevada (por detrás de la calzada)
  for (let k = 0; k < 7; k++) { const d = k % 2 ? 1 : -1, v = (t * (0.025 + k * 0.004) + h(k, 1, 640)) % 1, x = d > 0 ? Math.round(116 + v * 210) : Math.round(326 - v * 210); d_genteD(R, x, 131, t, k, { alto: 8, anda: true, dir: d, sombrero: k % 3 === 0 ? 'copa' : k % 3 === 1 ? 'cofia' : null, falda: k % 3 === 1 }); }
  d_ponerD(R, puente);
  // la inauguración: banderas en lo alto de la torre, guirnaldas en los arcos, gallardetes en los tirantes y la multitud
  if (o.inauguracion) {
    for (const fx of [46, 102]) { rect(fx, 18, fx, 30, CD.hierro); d_banderaD(R, fx, 18, t + fx, { w: 12, hh: 7 }); }
    for (const [a, b] of [[43, 65], [83, 105], [34, 114]]) { const y0 = a === 34 ? 36 : 60; for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(y0 + Math.sin(u * Math.PI * (a === 34 ? 4 : 2)) ** 2 * 4); pset(x, y, [CD.rojoB, CD.blancoB, CD.azulB][Math.floor(u * 9) % 3]); pset(x, y + 1, [CD.rojoB, CD.blancoB, CD.azulB][Math.floor(u * 9) % 3]); } }
    for (let k = 0; k < 9; k++) { const tx = 126 + k * 12, u = 0.55, x = Math.round(74 + (tx - 74) * u), y = Math.round(36 + (140 - 36) * u); const c = [CD.rojoB, hex('#f0d040'), CD.azulB][k % 3]; pset(x, y + 1, c); pset(x + 1 + (Math.sin(t * 6 + k) > 0 ? 1 : 0), y + 2, c); pset(x + 1, y + 1, c); }
    for (let k = 0; k < 60; k++) { const x = 118 + Math.round(h(k, 1, 641) * 200), b = Math.sin(t * 5 + k) > 0.7 ? 1 : 0; pset(x, 126 - b, [hex('#f0c8a0'), hex('#d8a880')][k % 2]); pset(x, 127 - b, [hex('#2a2a34'), hex('#6a2a3a'), hex('#3a4a6a'), hex('#f0ece0')][k % 4]); if (k % 7 === 0 && b) pset(x, 124, 0xffffffff); }
  }
  // las farolas de la calzada que brillan un poco
  for (let x = 140; x < 320; x += 60) { pset(x, 133, Math.sin(t * 2 + x) > 0.5 ? hex('#fff4c0') : hex('#e8e0b0')); }
  d_gaviotasD(R, t, 200, 70, 70, 14, 3, 6);
  return { suelo: 148, calzada: 148, pies: [118, 310], torre: [74, 30], arcos: [[54, 54], [94, 54]], pasarela: 131, cable: d_cableD };
}

// la capa del fondo del río Este: la orilla de Manhattan de 1883 con almacenes, torres de iglesia, la torre del periódico
// con su aguja, chimeneas, y los mástiles de los muelles
function d_puenteFondoD(R) {
  const { rect, pset, poligono } = R, B = R.buf;
  for (let x = 0; x < 320; x++) { const k = Math.floor(x / 7), top = 112 - Math.floor(h(k, 1, 642) * 14), c = [hex('#b0a49c'), hex('#a09088'), hex('#c0b4a8'), hex('#988a86')][Math.floor(h(k, 2, 642) * 4)];
    for (let y = top; y < 120; y++) B[y * 320 + x] = x % 7 === 0 ? d_mezclaD(c, 0xff000000, 0.2) : ((y - top) % 3 === 1 && x % 2) ? d_mezclaD(c, hex('#3a4a5a'), 0.4) : c; }
  for (const [tx, alto] of [[150, 36], [196, 28], [252, 40]]) { rect(tx - 2, 112 - alto, tx + 2, 112, hex('#9a8c84')); poligono([[tx - 2, 112 - alto], [tx, 100 - alto], [tx + 3, 112 - alto]], hex('#7a6e68')); }
  for (let x = 4; x < 320; x += 11) { rect(x, 106, x, 120, CD.mastilS); rect(x - 2, 109, x + 2, 109, CD.mastilS); }
  for (let x = 0; x < 320; x++) B[120 * 320 + x] = hex('#6a5a50');
}

// la capa del puente: la pasarela de atrás con su barandilla y sus farolas, la torre de granito (sillares, molduras, los
// nichos ciegos de arriba, los dos arcos góticos abiertos y la base que entra en el agua con su espuma), los cables
// principales con sus péndolas, los tirantes en abanico, la calzada de tablones con los raíles del funicular y la viga de
// celosía de hierro con su sombra
function d_puenteFijoD(R) {
  const { rect, pset, linea } = R, B = R.buf;
  // la pasarela de atrás
  for (let x = 0; x < 320; x++) { pset(x, 128, hex('#5a5a62')); pset(x, 132, hex('#4a4a52')); if (x % 4 === 0) rect(x, 128, x, 132, hex('#5a5a62')); }
  for (let x = 140; x < 320; x += 60) { rect(x, 132 - 0, x, 136, CD.hierro); rect(x, 133, x, 140, CD.hierro); }
  // las péndolas y los cables principales (dos, uno detrás de otro)
  for (let x = 0; x < 320; x += 5) { if (x > 30 && x < 118) continue; const yc = Math.round(d_cableD(x)); if (yc < 139) linea(x, yc + 2, x, 139, hex('#6a6a74')); }
  // los tirantes en abanico desde lo alto de la torre
  for (let k = 0; k < 10; k++) { linea(76, 38, 124 + k * 12, 140, hex('#4a4a54')); }
  for (let k = 0; k < 4; k++) linea(72, 38, 26 - k * 9, 140, hex('#4a4a54'));
  for (let x = 0; x < 320; x++) { if (x > 34 && x < 114) continue; const y = Math.round(d_cableD(x)); pset(x, y - 1, hex('#8a8a96')); pset(x, y, hex('#3a3a44')); pset(x, y + 1, hex('#2a2a32')); pset(x, y + 3, hex('#5a5a66')); }
  // la torre de granito
  const arco = (x, y, cx) => { const dx = Math.abs(x - cx), r = 22; return dx <= 11 && (y >= 74 || Math.hypot(x - (cx + (x < cx ? 11 - r : r - 11)), y - 74) <= r) && y >= 54 && y < 141; };
  for (let y = 30; y < 180; y++) for (let x = 34; x <= 114; x++) { if (arco(x, y, 54) || arco(x, y, 94)) continue;
    const fila = Math.floor((y - 30) / 4), junta = (y - 30) % 4 === 0 || (x + (fila % 2) * 5) % 10 === 0, k = h(Math.floor((x + (fila % 2) * 5) / 10), fila, 643);
    let c = junta ? CD.granitoS : k < 0.2 ? CD.granitoL : k < 0.35 ? hex('#a8a08e') : CD.granito;
    if (x > 108 || (x > 60 && x < 66) || (x > 100 && x < 106)) c = d_mezclaD(c, 0xff000000, 0.18);
    if (x < 38) c = d_mezclaD(c, 0xffffffff, 0.15);
    if (y < 36) c = y < 32 ? CD.granitoL : y === 35 ? hex('#5a5448') : CD.granito;   // la cornisa
    if (y >= 46 && y < 48) c = y === 46 ? CD.granitoL : hex('#6a6252');   // la imposta
    if (y >= 38 && y < 46 && ((x - 34) % 10 > 3 && (x - 34) % 10 < 8)) c = hex('#7a7262');   // los nichos ciegos
    if (y > 165) c = d_mezclaD(c, hex('#4a6a7a'), 0.25);
    B[y * 320 + x] = c; }
  for (const cx of [54, 94]) for (let a = 0; a <= 30; a++) { const t2 = a / 30, x = Math.round(cx - 11 + t2 * 22), dx = Math.abs(x - cx), r = 22, y = Math.round(74 - Math.sqrt(Math.max(0, r * r - (r - 11 + dx) ** 2))); pset(x, y - 1, CD.granitoL); pset(x, y - 2, hex('#6a6252')); }
  rect(31, 28, 117, 30, CD.granitoL); rect(31, 30, 117, 30, hex('#6a6252'));
  for (const sx of [44, 104]) { rect(sx - 3, 24, sx + 3, 28, hex('#5a5a66')); rect(sx - 3, 24, sx + 3, 24, hex('#8a8a96')); }   // las sillas de los cables
  for (let x = 34; x <= 114; x++) { pset(x, 178, 0xffffffff); if (x % 3) pset(x, 177, hex('#c8e4f0')); }
  // la calzada: el firme de tablones con los raíles del funicular, el bordillo y la viga de celosía
  for (let y = 140; y < 164; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 149) c = y === 140 ? hex('#c8b890') : y === 144 || y === 146 ? hex('#7a7a84') : (x + (y % 2) * 3) % 9 === 0 ? hex('#8a7a5a') : hex('#a8946c');
    else if (y < 151) c = y === 149 ? hex('#3a3a44') : hex('#8a8a96');
    else { const m = (x % 12), d1 = Math.abs((y - 151) - m) < 1 || Math.abs((y - 151) - (12 - m)) < 1; c = y === 162 || y === 163 ? hex('#3a3a44') : d1 || m === 0 ? hex('#5a5a66') : d_VACIOD; }
    if (c !== d_VACIOD) B[y * 320 + x] = c; }
}

// con su catalejo: papel pintado victoriano y friso, el ventanal con cortinas recogidas y la vista del puente lejano (con un
// carruaje diminuto que lo cruza), la mesa de dibujo con los planos, el sillón con la manta, la alfombra
function d_ventanaD(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const cuarto = d_capaD(R, 'ventanaCuarto', () => d_ventanaFijaD(R));
  // la vista: cielo, río y el puente lejano con su carruaje
  R.recorte([124, 24, 256, 124]);
  d_cieloD(R, t, { hor: 96, x0: 124, x1: 256, y0: 24, sol: [236, 40, 5], cumulos: 0 });
  for (let k = 0; k < 3; k++) { const x = Math.round(((h(k, 3, 650) * 160 + t * (1.5 + k)) % 170) + 110), y = 36 + k * 12; for (const [dx, r] of [[0, 3], [4, 4], [8, 3]]) { disco(x + dx, y + 1, r, hex('#b8d8ee')); disco(x + dx, y, r, hex('#f4f8fc')); } }
  d_aguaD(R, t, 96, 124, [hex('#7aa0b4'), hex('#5a86a0'), hex('#48748e')], { x0: 124, x1: 256, v: 4, n: 24 });
  for (let x = 124; x <= 256; x++) { const top = 90 - Math.floor(h(Math.floor(x / 5), 1, 651) * 8); for (let y = top; y < 96; y++) pset(x, y, x % 5 === 0 ? hex('#9a8c86') : hex('#b4a8a0')); }
  for (const tx of [150, 226]) { for (let y = 56; y < 110; y++) for (let x = tx - 4; x <= tx + 4; x++) { const ar = (Math.abs(x - tx + 2) < 1.5 || Math.abs(x - tx - 2) < 1.5) && y > 62 && y < 78; pset(x, y, ar ? hex('#a8c4d8') : x > tx + 2 ? hex('#a89c90') : hex('#c8bcae')); } }
  for (let x = 124; x <= 256; x++) { const yc = x < 150 ? 58 + (150 - x) * 0.9 : x > 226 ? 58 + (x - 226) * 0.9 : 58 + Math.round(((x - 150) / 76) * (1 - (x - 150) / 76) * 4 * 14); pset(x, Math.round(yc), hex('#4a4a54')); if (x % 3 === 0) for (let y = Math.round(yc) + 1; y < 76; y += 2) pset(x, y, hex('#8a8a94')); pset(x, 76, hex('#5a5a62')); pset(x, 77, hex('#7a7a84')); }
  { const u = (t * 0.06) % 1, cx = Math.round(130 + u * 120); pset(cx, 75, hex('#2a2430')); pset(cx + 1, 75, hex('#2a2430')); pset(cx + 2, 74, hex('#6a3e24')); pset(cx + 3, 74, hex('#6a3e24')); pset(cx, 74, hex('#4a2a4a')); }
  d_gaviotaD(R, 150 + Math.sin(t * 0.7) * 30, 44, t, 1, 3);
  R.recorte(null);
  d_ponerD(R, cuarto);
  // las cortinas que mueve el aire de la ventana entreabierta y la lámpara de la mesa
  { const f = Math.sin(t * 1.2); for (let y = 30; y < 70; y++) { const w = Math.round(2 + f * 1.5 * (y - 30) / 40); rect(126, y, 126 + w, y, hex('#f0ece0')); } }
  { const g = Math.sin(t * 7) > 0.85 ? 1 : 0; for (let j = -6; j <= 6; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j); if (d > 3 && d < 8 && d_umbralD(50 + i, 108 + j) < (8 - d) / 10) pset(50 + i, 108 + j, d_mezclaD(R.pget(50 + i, 108 + j), hex('#fff0b0'), 0.3)); } pset(50, 108 - g, hex('#fff8d0')); }
  return { suelo: 162, pies: [84, 116], ventana: [124, 24, 256, 124], alfeizar: 128, mesa: [18, 116, 80, 162], sillon: [290, 160] };
}

// la capa fija del cuarto de Brooklyn Heights (con el hueco de la ventana transparente)
function d_ventanaFijaD(R) {
  const { rect, pset, linea, disco } = R, B = R.buf;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 120) { const mx = x % 14, my = (y + (Math.floor(x / 14) % 2) * 9) % 18, fl = Math.abs(mx - 7) + Math.abs(my - 9) * 0.7; c = fl < 2 ? hex('#a8823a') : fl < 3 ? hex('#5a2226') : (mx === 0 ? hex('#5a1e22') : hex('#6e2a2c')); if (x > 270 && y < 48) c = (mx + my) % 9 === 0 ? hex('#7a3030') : hex('#6e2a2c'); }
    else if (y < 124) c = y === 120 ? hex('#a07a4a') : hex('#5a3a20');
    else if (y < 150) { const p = x % 30; c = (p === 2 || y === 126) ? hex('#4a2e18') : (p === 28 || y === 147) ? hex('#a07a4a') : hex('#6a4428'); }
    else if (y < 154) c = y === 150 ? hex('#a07a4a') : hex('#3a2414');
    else { const m = (Math.abs((x % 20) - 10) + Math.abs((y % 12) - 6)); c = x < 10 || x > 310 || y > 176 ? hex('#3a2a4a') : m === 6 ? hex('#c8983a') : m < 3 ? hex('#2a3a5a') : (x + y) % 9 === 0 ? hex('#521a18') : hex('#7a2a24'); }
    B[y * 320 + x] = c; }
  // el ventanal: marco, parteluz, alféizar y el hueco (transparente: la vista se pinta detrás)
  rect(118, 18, 262, 132, hex('#e8e0cc')); rect(118, 18, 262, 19, hex('#c8c0ac')); rect(116, 128, 264, 132, hex('#f0ead8')); rect(116, 132, 264, 133, hex('#a8a090'));
  for (let y = 24; y <= 124; y++) for (let x = 124; x <= 256; x++) B[y * 320 + x] = d_VACIOD;
  for (let y = 24; y <= 124; y++) { B[y * 320 + 190] = hex('#e8e0cc'); B[y * 320 + 191] = hex('#c8c0ac'); } for (let x = 124; x <= 256; x++) { B[74 * 320 + x] = hex('#e8e0cc'); B[75 * 320 + x] = hex('#c8c0ac'); }
  // las cortinas de terciopelo verde recogidas con sus alzapaños
  for (const [x0, x1, d] of [[104, 124, 1], [256, 276, -1]]) for (let y = 10; y < 150; y++) { const cint = y > 84 && y < 92, w = cint ? 6 : y > 92 ? Math.min(20, 6 + (y - 92) * 0.5) : 20 - Math.max(0, 84 - y) * 0.05;
    for (let i = 0; i < w; i++) { const x = d > 0 ? x0 + i : x1 - i, f = (i + y * 0.05) % 4; B[y * 320 + x] = cint ? hex('#c8983a') : f < 1 ? hex('#1e4a32') : f < 2.5 ? hex('#2e6a46') : hex('#4a8a5e'); } }
  rect(100, 8, 280, 10, hex('#c8983a')); rect(100, 11, 280, 11, hex('#8a6a24')); disco(100, 9, 2, hex('#c8983a')); disco(280, 9, 2, hex('#c8983a'));
  // la mesa de dibujo inclinada con los planos del puente, el compás y la lámpara de aceite
  { rect(18, 120, 82, 124, hex('#6a4428')); linea(18, 124, 82, 116, hex('#a07a4a')); for (let k = 0; k < 4; k++) linea(18, 125 + k, 82, 117 + k, hex('#6a4428')); rect(22, 128, 24, 162, hex('#4a2e18')); rect(76, 122, 78, 162, hex('#4a2e18')); rect(22, 150, 78, 151, hex('#4a2e18'));
    for (let i = 0; i < 46; i++) { const x = 26 + i, y = 118 - Math.round(i * 0.12); rect(x, y, x, y + 6, hex('#e8e4f0')); }
    for (const tx of [34, 60]) rect(tx, 113, tx + 1, 121, hex('#3a4a8a')); linea(26, 116, 70, 112, hex('#3a4a8a')); for (let x = 36; x < 60; x += 3) linea(x, 114, x, 120, hex('#6a7aaa'));
    rect(46, 104, 54, 114, hex('#c8983a')); rect(47, 102, 53, 104, hex('#f4f0e0')); rect(48, 98, 52, 102, hex('#e8e4d0')); linea(66, 116, 72, 120, hex('#8a8a96')); }
  // el sillón con la manta de cuadros y un bastón
  { const sx = 286; rect(sx - 18, 120, sx + 18, 162, hex('#4a1e22')); rect(sx - 18, 120, sx + 18, 122, hex('#7a3a3a')); rect(sx - 22, 136, sx - 16, 162, hex('#5a2226')); rect(sx + 16, 136, sx + 22, 162, hex('#5a2226'));
    for (let y = 138; y < 156; y++) for (let x = sx - 14; x <= sx + 14; x++) B[y * 320 + x] = ((x >> 2) + (y >> 2)) % 2 ? hex('#3a5a7a') : hex('#c8b890'); linea(sx + 24, 120, sx + 20, 162, hex('#5a3a20')); }
  // la regla de cálculo y los libros del alféizar
  for (let k = 0; k < 4; k++) rect(232 + k * 4, 122 - (k % 2) * 2, 235 + k * 4, 127, [hex('#3a4a6a'), hex('#7a2a24'), hex('#3a5a3a'), hex('#6a5a3a')][k]);
}

// umbral de Bayer 4×4 (0–1) para tramar
const e_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_bay = (x, y) => (e_BAY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const e_cl = (v) => Math.max(0, Math.min(1, v));

// mezcla de dos colores (k = 0: a; k = 1: b)
function e_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// la paleta propia de los rascacielos
const EC = {
  dia: [hex('#3e7cc8'), hex('#5a96dc'), hex('#7ab0e8'), hex('#a4cbee'), hex('#d4e4ee')],
  otono: [hex('#3a5ea8'), hex('#6680c0'), hex('#a0a2cc'), hex('#dcb4a2'), hex('#f2cc96')],
  nubeDia: [hex('#a8bed6'), hex('#dce8f2'), hex('#ffffff')],
  nubeOtono: [hex('#b4949e'), hex('#eec8b4'), hex('#fff0d8')],
  sol: hex('#fff8dc'), solL: hex('#ffe08a'), halo: hex('#fff2c0'), ave: hex('#2e3446'),
  lejos: [hex('#a6b4cc'), hex('#909eba'), hex('#c6d0de'), hex('#bac6da')],
  medio: [hex('#7c8aa8'), hex('#64708e'), hex('#a8b6cc'), hex('#98a6c0')],
  lejosT: [hex('#c8a8a8'), hex('#b0909a'), hex('#e0c4b4'), hex('#d8b8b0')],
  medioT: [hex('#8a7890'), hex('#6e6078'), hex('#f0c880'), hex('#a08ca0')],
  minio: hex('#a84a3a'), minioS: hex('#743026'), minioL: hex('#d07050'),
  hierro: hex('#46525e'), hierroS: hex('#2c343e'), hierroL: hex('#76848e'), hierroT: hex('#a8c0d0'),
  inox: hex('#d8dee6'), inoxS: hex('#8e98a6'), inoxL: hex('#ffffff'), inoxM: hex('#b4bcc8'), inoxD: hex('#5e6876'),
  brasa: hex('#ff6a2a'), brasaL: hex('#ffd060'), brasaS: hex('#b83a1a'),
  vidrio: hex('#2e3e58'), vidrioM: hex('#46607e'), vidrioL: hex('#8aa8c4'), calido: hex('#f8d070'), calidoS: hex('#d89a40'),
  camisa: hex('#f2eee2'), camisaS: hex('#c8c0b0'), pantalon: hex('#3a3a48'),
  adoquin: hex('#6e6a72'), adoquinS: hex('#4e4a56'), adoquinL: hex('#8e8a92'),
  tranvia: hex('#3a6a4a'), tranviaS: hex('#28503a'), crema: hex('#e8dcb8'), cremaS: hex('#c4b690'),
  tabla: hex('#b08a5a'), tablaS: hex('#8a6a40'), tablaL: hex('#cca878'), tablaD: hex('#5e4428'),
  sombra: hex('#2a3048'), alfombra: hex('#9a2a2e'), alfombraS: hex('#6e1c22'),
};

const E_ROPA = [[hex('#2e3a5a'), hex('#1e2840'), hex('#2a2a36')], [hex('#6a4a34'), hex('#4a3224'), hex('#3a3030')], [hex('#5e6068'), hex('#44464e'), hex('#2e2e38')],
  [hex('#7a2e38'), hex('#561e28'), hex('#2a2a36')], [hex('#3e5a3a'), hex('#2c4028'), hex('#2e2e36')], [hex('#26262e'), hex('#141418'), hex('#24242e')], [hex('#4a4a7a'), hex('#34345a'), hex('#2a2a36')]];

const E_PIEL = [hex('#e8b890'), hex('#c8906a'), hex('#8a5a3a'), hex('#f0c8a0')];

const E_SOMB = [hex('#1c1c24'), hex('#3a2e26'), hex('#d8c070'), hex('#4a4a56')];

const E_SOMBM = [hex('#8a3a5a'), hex('#3a4a7a'), hex('#e8d8b0')];

// gente pequeña: hombre (bombín o canotier) y mujer (falda larga y sombrero); 5 × 11 px
const E_FIG = {
  hombre: ['.HHH.', 'HHHHH', '.ppp.', '.ppp.', 'ccccc', 'cccCc', 'ccccc', '.ccc.', '.l.l.', '.l.l.', '.z.z.'],
  mujer: ['.HHH.', 'HHHHH', '.ppp.', '.ppp.', '.ccc.', 'ccccc', '.cCc.', 'ccccc', 'ccccc', 'cccCc', '.z.z.'],
};

const e_CACHE = new WeakMap();

// una capa fija de fondo transparente (0 = nada): se dibuja una vez por clave en un búfer de R.nuevo() y en cada
// fotograma se copia encima de lo que ya hay (un recorrido de la pantalla)
function e_capa(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  const b = m[clave], B = R.buf; for (let i = 0; i < b.length; i++) if (b[i]) B[i] = b[i];
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba) de ancho w
function e_nube(R, cx, cy, w, [cS, cB, cL]) {
  const P = [[0, 0, 0.28], [-0.3, 0.07, 0.2], [0.3, 0.06, 0.22], [-0.1, -0.13, 0.23], [0.15, -0.09, 0.19], [0.48, 0.12, 0.12], [-0.48, 0.13, 0.11]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of P) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 2), r(f), cS);
  for (const [dx, dy, f] of P) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), cB);
  for (const [dx, dy, f] of P) if (dy < 0.05) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), r(f * 0.55), cL);
  R.linea(Math.round(cx - w * 0.55), Math.round(cy + w * 0.13 + 2), Math.round(cx + w * 0.55), Math.round(cy + w * 0.13 + 2), cS);
}

// el cielo tramado (orden de Bayer) de cols[0] arriba a cols[n] en el horizonte, el sol con su halo, nubes de tres tonos
// en tres capas (las lejanas pequeñas, altas y lentas: 1,5, 4 y 8 px/s) y pájaros que cruzan aleteando (fuera de la zona
// de Atom). o: { hor, cols, nubes: [sombra, cuerpo, luz], sol: [x, y, r], aves, sem, yN: y de la primera capa }
function e_cielo(R, t, o = {}) {
  const B = R.buf, hor = Math.min(180, o.hor ?? 120), cols = o.cols ?? EC.dia, n = cols.length - 1, sem = o.sem ?? 0, nub = o.nubes ?? EC.nubeDia;
  for (let y = 0; y < hor; y++) { const p = Math.min(n - 1e-6, (y / hor) * n), i = Math.floor(p), f = p - i, a = cols[i], b = cols[i + 1], f0 = y * 320;
    for (let x = 0; x < 320; x++) B[f0 + x] = e_bay(x, y) < f ? b : a; }
  if (o.sol) { const [sx, sy, sr] = o.sol;
    R.disco(sx, sy, sr + 9, (x, y) => (e_bay(x, y) < 0.3 ? e_mez(R.pget(x, y), EC.halo, 0.5) : R.pget(x, y)));
    R.disco(sx, sy, sr + 4, (x, y) => (e_bay(x, y) < 0.6 ? EC.halo : R.pget(x, y)));
    R.disco(sx, sy, sr, EC.solL); R.disco(sx - 1, sy - 1, sr - 2, EC.sol); }
  const y0 = o.yN ?? 18;
  [[1.5, 3, y0, 0.55], [4, 2, y0 + 18, 0.8], [8, 2, y0 + 34, 1.05]].forEach(([v, nn, yb, s], L) => {
    for (let k = 0; k < nn; k++) { const w = Math.round((16 + h(k, L, 501 + sem) * 14) * s), per = 320 + w * 2 + 60,
      x = ((h(k, L, 502 + sem) * per + t * v) % per) - w - 30, y = Math.round(yb + h(k, L, 503 + sem) * 12 * s);
      if (y + w * 0.2 < hor) e_nube(R, x, y, w, L === 0 ? nub.map((c) => e_mez(c, cols[1], 0.4)) : nub); } });
  for (let k = 0; k < (o.aves ?? 3); k++) { const per = 420, x = Math.round(((h(k, 9, 504 + sem) * per + t * (11 + k * 3)) % per) - 50),
    y = Math.round((o.yAves ?? 40) + h(k, 8, 505 + sem) * 30 + Math.sin(t * 0.8 + k) * 3), a = Math.sin(t * 9 + k * 2) > 0;
    if ((x > 270 && y < 50) || y >= hor) continue;
    R.pset(x, y, EC.ave); R.pset(x - 1, y - (a ? 1 : 0), EC.ave); R.pset(x + 1, y - (a ? 1 : 0), EC.ave); R.pset(x - 2, y - (a ? 2 : -1), EC.ave); R.pset(x + 2, y - (a ? 2 : -1), EC.ave); }
}

// gente pequeña de fondo (13 px con el sombrero, sin cara): k elige ropa, piel y sombrero; o.anda (por defecto), o.mujer,
// o.camisa (mangas de camisa: sin abrigo), o.ropa ([abrigo, sombra, pantalón]), o.som (color del sombrero o la gorra),
// o.sentado (sentado en una viga: las piernas cuelgan por delante)
function e_gente(R, x, suelo, t, k, o = {}) {
  const muj = o.mujer ?? (k % 3 === 2), T = muj ? E_FIG.mujer : E_FIG.hombre, paso = o.anda !== false && !o.sentado ? Math.floor(t * 5 + k * 1.7) % 2 : 0;
  const ropa = o.ropa ?? E_ROPA[k % E_ROPA.length], piel = E_PIEL[(k >> 1) % E_PIEL.length], som = o.som ?? (muj ? E_SOMBM[k % 3] : E_SOMB[(k >> 2) % E_SOMB.length]);
  const col = { H: som, p: piel, c: o.camisa ? EC.camisa : ropa[0], C: o.camisa ? EC.camisaS : ropa[1], l: ropa[2], z: C.k };
  x = Math.round(x); const y0 = suelo - 11 - (paso && !muj ? 0 : 0);
  const fila = (j) => (o.sentado ? (j >= 8 ? (j === 8 ? 'll.ll' : j === 9 ? '.l.l.' : '.z.z.') : T[j]) : !muj && paso && j >= 8 && j <= 9 ? ['..ll.', '.l..l'][j - 8] : T[j]);
  const dy = (j) => (o.sentado && j >= 8 ? 1 : 0);
  for (let j = 0; j < 11; j++) { const f = fila(j); for (let i = 0; i < 5; i++) if (f[i] !== '.') { const yy = y0 + j + dy(j); if (f[i - 1] === undefined || f[i - 1] === '.') R.pset(x + i - 1, yy, C.k); if (f[i + 1] === undefined || f[i + 1] === '.') R.pset(x + i + 1, yy, C.k); if (j === 0) R.pset(x + i, yy - 1, C.k); } }
  for (let j = 0; j < 11; j++) { const f = fila(j); for (let i = 0; i < 5; i++) if (f[i] !== '.') R.pset(x + i, y0 + j + dy(j), col[f[i]]); }
}

// una paloma (8 px): gris azulado con el cuello irisado; o.picotea (baja la cabeza a ratos), o.dir, o.vuela (alas arriba y
// abajo); x, y: las patas. La usan los decorados y la pueden poner las escenas (el gag de la tarta y el del ascensor).
export function e_paloma(R, x, y, t, o = {}) {
  const { pset, rect } = R, d = o.dir ?? 1, X = (i) => Math.round(x + i * d); x = Math.round(x); y = Math.round(y);
  const g = hex('#8a92a4'), gS = hex('#5e6678'), gL = hex('#b4bcc8'), iri = hex('#5a9a8a'), pico = hex('#e8a06a');
  if (o.vuela) { const a = Math.sin(t * 16) > 0; rect(Math.min(X(-3), X(3)), y - 4, Math.max(X(-3), X(3)), y - 3, g); for (let i = -5; i <= 5; i++) pset(X(i), y - 4 + (Math.abs(i) > 2 ? (a ? -2 : 1) : 0), Math.abs(i) > 3 ? gS : gL); pset(X(4), y - 5, gS); pset(X(5), y - 5, pico); return; }
  const baja = o.picotea && Math.sin(t * 5 + x) > 0.4 ? 2 : 0;
  rect(Math.min(X(-3), X(2)), y - 4, Math.max(X(-3), X(2)), y - 2, g); pset(X(-4), y - 3, gS); pset(X(-4), y - 4, gS); rect(Math.min(X(-2), X(1)), y - 4, Math.max(X(-2), X(1)), y - 4, gL); pset(X(-1), y - 3, gS); pset(X(0), y - 3, gS);
  pset(X(2), y - 5 + baja, iri); pset(X(3), y - 6 + baja, g); pset(X(3), y - 5 + baja, iri); pset(X(4), y - 6 + baja, C.k); pset(X(4), y - 5 + baja, pico);
  pset(X(0), y - 1, pico); pset(X(1), y - 1, pico); pset(X(0), y, pico); pset(X(1), y, pico);
}

// el perfil lejano de la ciudad (va en una capa fija): edificios de alturas al azar con hileras de ventanas tenues, algún
// depósito de agua, aguja o remate en escalón; cols = [cuerpo, sombra, ventana, luz]; o.x0, o.x1, o.alto [min, max],
// o.sem, o.ancho [min, max]; respeta la zona de Atom y la barra del año (no sube por encima de y 50 / 18 ahí)
function e_skyline(R, base, cols, o = {}) {
  const { rect, pset, poligono } = R, [cB, cS, cV, cL] = cols, sem = o.sem ?? 0, [amin, amax] = o.alto ?? [30, 70], [wmin, wmax] = o.ancho ?? [10, 26];
  let x = o.x0 ?? -4, k = 0; const x1 = o.x1 ?? 324;
  while (x < x1) { const w = wmin + Math.floor(h(k, 1, 600 + sem) * (wmax - wmin)); let top = base - Math.round(amin + h(k, 2, 600 + sem) * (amax - amin));
    if (x + w > 268 && top < 52) top = 52; if (x < 174 && x + w > 16 && top < 20) top = 20;
    rect(x, top, x + w - 1, base, cB); rect(x + w - 2, top, x + w - 1, base, cS); rect(x, top, x, base, cL);
    for (let y = top + 3; y < base - 1; y += 4) for (let i = x + 2; i < x + w - 3; i += 3) if (h(i, y, 610 + sem) < 0.72) pset(i, y, cV);
    const r = h(k, 3, 600 + sem), cx = x + (w >> 1);
    if (r < 0.16 && w > 9) { rect(x + 3, top - 7, x + 8, top - 3, cS); poligono([[x + 2, top - 7], [x + 5.5, top - 11], [x + 9, top - 7]], cS); pset(x + 3, top - 2, cS); pset(x + 8, top - 2, cS); pset(x + 3, top - 1, cS); pset(x + 8, top - 1, cS); }
    else if (r < 0.27 && top > (cx > 268 ? 62 : cx < 174 ? 32 : 14)) { poligono([[cx - 3, top], [cx, top - 12], [cx + 3, top]], cB); pset(cx, top - 13, cS); }
    else if (r < 0.42) { rect(x + 2, top - 5, x + w - 3, top, cB); rect(x + 4, top - 9, x + w - 5, top - 5, cB); rect(x + w - 4, top - 9, x + w - 3, top, cS); }
    x += w - (h(k, 4, 600 + sem) < 0.3 ? 3 : 0); k++; }
}

// una ventana de fachada de w × hh: dintel y alféizar claros, cristal que refleja el cielo en diagonal, el travesaño y el
// parteluz; r (0–1) decide si tiene la luz encendida o la persiana a medias; o.dintel, o.marco
function e_ventana(R, x, y, w, hh, r, o = {}) {
  const { rect, pset } = R, lit = r < (o.encendidas ?? 0.1), pers = r > 0.78, pf = 0.25 + (r - 0.78) * 2.5;
  rect(x - 1, y - 2, x + w, y - 1, o.dintel ?? C.calizaL); rect(x - 1, y + hh, x + w, y + hh, o.dintel ?? C.calizaL); rect(x - 1, y + hh + 1, x + w, y + hh + 1, e_mez(o.dintel ?? C.calizaL, C.k, 0.55));
  rect(x - 1, y, x - 1, y + hh - 1, o.marco ?? C.k); rect(x + w - 1, y, x + w - 1, y + hh - 1, o.marco ?? C.k);
  for (let j = 0; j < hh; j++) for (let i = 0; i < w - 1; i++) { let c = lit ? (j < hh / 2 ? EC.calido : EC.calidoS) : (i + j) % 7 < 2 ? EC.vidrioL : j < hh * 0.45 ? EC.vidrioM : EC.vidrio; if (pers && j < hh * pf) c = j % 2 ? hex('#d8ccb0') : hex('#c4b896'); pset(x + i, y + j, c); }
  if (w >= 5) rect(x + ((w - 1) >> 1), y, x + ((w - 1) >> 1), y + hh - 1, o.marco ?? hex('#e8e0d0')); if (hh >= 7) rect(x, y + (hh >> 1), x + w - 2, y + (hh >> 1), o.marco ?? hex('#e8e0d0'));
}

// un edificio de fachada (fijo) de x0 a x1 y de y0 (cornisa) a y1 (calle): ladrillo o piedra con su aparejo y ruido, canto
// de luz a la izquierda y sombra a la derecha, rejilla de ventanas (o.ventanas [w, h, pasoX, pasoY], o.ox, o.oy, o.bajo: lo
// que queda sin ventanas abajo), cornisa con dentículos y su sombra; o.pared [c, sombra, luz], o.tipo 'piedra' | 'ladrillo',
// o.escalera: escalera de incendios negra en zigzag; o.deposito: depósito de agua en el tejado
function e_edificio(R, x0, x1, y0, y1, o = {}) {
  const { rect, pset, linea, poligono } = R, B = R.buf, [c, cS, cL] = o.pared ?? [C.ladrillo, C.ladrilloS, C.ladrilloL], piedra = o.tipo === 'piedra', sem = o.sem ?? 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let col; const q = h(x >> 1, y, 620 + sem);
    if (piedra) { const fila = Math.floor((y - y0) / 5), jy = (y - y0) % 5 === 4, jx = (x - x0 + fila * 7) % 14 === 0; col = jy || jx ? cS : q < 0.14 ? cL : q > 0.9 ? cS : c; }
    else { const fila = (y - y0) >> 1, jy = (y - y0) % 2 === 1, jx = (x - x0 + (fila & 1) * 2) % 4 === 0; col = jy ? e_mez(cS, c, 0.4) : jx ? cS : q < 0.12 ? cL : q > 0.93 ? cS : c; }
    if (x === x0) col = cL; else if (x >= x1 - 1) col = cS;
    B[y * 320 + x] = col; }
  const [vw, vh, px, py] = o.ventanas ?? [6, 9, 12, 14], ox = o.ox ?? 5, oy = o.oy ?? 8;
  for (let y = y0 + oy, j = 0; y + vh < y1 - (o.bajo ?? 14); y += py, j++) for (let x = x0 + ox, i = 0; x + vw < x1 - 2; x += px, i++) e_ventana(R, x, y, vw, vh, h(i + sem, j, 630), o);
  if (o.escalera) { const ex = o.escalera; for (let y = y0 + oy + vh; y < y1 - 14; y += py) { rect(ex - 2, y, ex + 16, y, C.k); for (let i = ex - 2; i <= ex + 16; i += 2) pset(i, y - 1, C.k); rect(ex - 2, y - 4, ex - 2, y, C.k); rect(ex + 16, y - 4, ex + 16, y, C.k); linea(ex + 1, y, ex + 13, y + py, C.k); } }
  if (o.cornisa !== false) { const cc = o.cornisaCol ?? [C.calizaL, C.calizaS];
    rect(x0 - 2, y0 - 4, x1 + 2, y0 - 1, cc[0]); rect(x0 - 2, y0 - 1, x1 + 2, y0 - 1, cc[1]); for (let x = x0 - 1; x <= x1 + 1; x += 3) pset(x, y0 - 2, cc[1]); rect(x0 - 3, y0 - 5, x1 + 3, y0 - 5, e_mez(cc[0], C.blanco, 0.4));
    for (let x = x0; x <= x1; x++) { const i = y0 * 320 + x; if (x >= 0 && x < 320 && y0 < 180) B[i] = e_mez(B[i], C.k, 0.35); } }
  if (o.deposito) { const dx = o.deposito; for (const lx of [dx, dx + 10]) rect(lx, y0 - 13, lx, y0 - 5, C.k); linea(dx, y0 - 6, dx + 10, y0 - 12, C.k);
    rect(dx - 2, y0 - 24, dx + 12, y0 - 13, EC.tablaS); for (let x = dx - 1; x <= dx + 11; x += 2) rect(x, y0 - 24, x, y0 - 13, EC.tablaD); rect(dx - 2, y0 - 24, dx - 1, y0 - 13, EC.tabla);
    for (const yy of [y0 - 21, y0 - 16]) rect(dx - 2, yy, dx + 12, yy, C.k); poligono([[dx - 3, y0 - 24], [dx + 5, y0 - 31], [dx + 13, y0 - 24]], C.k); poligono([[dx - 1, y0 - 25], [dx + 5, y0 - 30], [dx + 11, y0 - 25]], EC.tablaD); }
}

// un tranvía eléctrico (1895–1930, 58 px): caja verde con franja crema, ventanillas con viajeros, techo con linternón,
// faro, ruedas que giran y la pértiga al cable aéreo con chispas; x: centro, suelo, dir (hacia dónde va), o.cable (y)
function e_tranvia(R, x, suelo, t, dir = 1, o = {}) {
  const { rect, pset, linea, disco } = R; x = Math.round(x); const x0 = x - 29, x1 = x + 29, y = suelo;
  rect(x0 + 2, y, x1 - 2, y + 1, e_mez(EC.adoquinS, C.k, 0.5));
  rect(x0 + 4, y - 25, x1 - 4, y - 22, C.k); rect(x0 + 5, y - 24, x1 - 5, y - 23, EC.cremaS); for (let i = x0 + 8; i < x1 - 6; i += 5) pset(i, y - 24, hex('#f8f0d0'));
  rect(x0, y - 22, x1, y - 4, C.k); rect(x0 + 1, y - 21, x1 - 1, y - 20, EC.tranviaS); rect(x0 + 1, y - 19, x1 - 1, y - 5, EC.tranvia); rect(x0 + 1, y - 18, x1 - 1, y - 11, EC.crema);
  for (let wx = x0 + 3, k = 0; wx < x1 - 5; wx += 7, k++) { rect(wx, y - 17, wx + 4, y - 12, EC.vidrio); pset(wx, y - 17, EC.vidrioL); pset(wx + 1, y - 16, EC.vidrioL);
    if (h(k, x0 >> 6, 640) < 0.7) { const ph = E_PIEL[k % 4]; pset(wx + 2, y - 13, ph); pset(wx + 3, y - 13, ph); pset(wx + 2, y - 14, ph); pset(wx + 3, y - 14, ph); rect(wx + 1, y - 15, wx + 4, y - 15, E_SOMB[k % 4]); } }
  rect(x0 + 1, y - 10, x1 - 1, y - 10, EC.tranviaS); for (let i = x0 + 6; i < x1 - 4; i += 12) rect(i, y - 9, i + 7, y - 6, EC.tranviaS); rect(x0 + 1, y - 5, x1 - 1, y - 5, EC.oroS ?? C.oroS);
  const fx = dir > 0 ? x1 : x0; rect(fx - (dir > 0 ? 0 : 2), y - 9, fx + (dir > 0 ? 2 : 0), y - 6, C.k); pset(fx + dir, y - 8, EC.brasaL);
  for (const wx of [x0 + 11, x1 - 11]) { disco(wx, y - 2, 3, C.k); disco(wx, y - 2, 2, C.metalS); const a = t * 9 * dir; pset(Math.round(wx + Math.cos(a) * 1.6), Math.round(y - 2 + Math.sin(a) * 1.6), C.metalL); }
  if (o.cable != null) { const bx = x - dir * 12, tx = x + dir * 4; linea(bx, y - 25, tx, o.cable + 1, C.k); if (Math.sin(t * 23 + x) > 0.86) { pset(tx, o.cable, EC.brasaL); pset(tx + 1, o.cable - 1, C.blanco); pset(tx - 1, o.cable + 1, EC.solL); } }
}

// un coche de caballos (1854–1910, 46 px): el caballo que trota (patas alternas, cola, crin), el coche negro con el
// cochero de chistera y las ruedas amarillas que giran; x: centro, suelo, dir
function e_carro(R, x, suelo, t, dir = 1, o = {}) {
  const { rect, pset, linea, disco } = R; x = Math.round(x); const y = suelo, X = (i) => x + i * dir, s = Math.floor(t * 8) % 2, cab = o.caballo ?? hex('#7a4a2a'), cabS = hex('#4e2e18');
  rect(Math.min(X(-20), X(16)), y, Math.max(X(-20), X(16)), y + 1, e_mez(EC.adoquinS, C.k, 0.5));
  // el coche
  for (const [a, b, c] of [[-20, -4, C.k]]) rect(Math.min(X(a), X(b)), y - 16, Math.max(X(a), X(b)), y - 6, c);
  rect(Math.min(X(-19), X(-5)), y - 15, Math.max(X(-19), X(-5)), y - 7, hex('#2a2430')); rect(Math.min(X(-17), X(-9)), y - 14, Math.max(X(-17), X(-9)), y - 10, EC.vidrioM); pset(X(-16), y - 13, EC.vidrioL);
  rect(Math.min(X(-21), X(-3)), y - 17, Math.max(X(-21), X(-3)), y - 17, hex('#4a4450'));
  rect(Math.min(X(-4), X(-1)), y - 12, Math.max(X(-4), X(-1)), y - 11, C.k); rect(Math.min(X(-3), X(-1)), y - 18, Math.max(X(-3), X(-1)), y - 13, hex('#3a3a48')); pset(X(-2), y - 19, E_PIEL[0]); pset(X(-1), y - 19, E_PIEL[0]); rect(Math.min(X(-3), X(0)), y - 23, Math.max(X(-3), X(0)), y - 20, C.k); rect(Math.min(X(-4), X(1)), y - 20, Math.max(X(-4), X(1)), y - 20, C.k);
  for (const [wx, r] of [[-16, 4], [-6, 3]]) { disco(X(wx), y - 3 - (r - 3), r, C.k); disco(X(wx), y - 3 - (r - 3), r - 1, hex('#c8a040')); disco(X(wx), y - 3 - (r - 3), r - 2, C.k); const a = t * 7 * dir; for (let q = 0; q < 2; q++) pset(Math.round(X(wx) + Math.cos(a + q * 1.6) * (r - 1)), Math.round(y - 3 - (r - 3) + Math.sin(a + q * 1.6) * (r - 1)), C.k); }
  linea(X(-1), y - 9, X(6), y - 9, C.k);
  // el caballo
  rect(Math.min(X(4), X(13)), y - 13, Math.max(X(4), X(13)), y - 8, C.k); rect(Math.min(X(5), X(12)), y - 12, Math.max(X(5), X(12)), y - 9, cab); rect(Math.min(X(5), X(12)), y - 12, Math.max(X(5), X(12)), y - 12, hex('#9a6a40'));
  rect(Math.min(X(12), X(14)), y - 17, Math.max(X(12), X(14)), y - 11, cab); rect(Math.min(X(14), X(17)), y - 18, Math.max(X(14), X(17)), y - 15, cab); pset(X(17), y - 16, cabS); pset(X(15), y - 17, C.k); pset(X(13), y - 19, cabS); pset(X(12), y - 18, cabS); for (let j = 0; j < 5; j++) pset(X(11), y - 16 + j, cabS);
  pset(X(3), y - 12, cabS); pset(X(2), y - 11 + s, cabS); pset(X(2), y - 10 + s, cabS);
  for (const [lx, f] of [[5, 0], [7, 1], [10, 1], [12, 0]]) { const up = (f ^ s) ? 1 : 0, sx = up ? dir : 0; rect(Math.min(X(lx), X(lx) + sx), y - 7, Math.max(X(lx), X(lx) + sx), y - 1 - up, cabS); pset(X(lx) + sx, y - up, C.k); }
}

// un Ford T negro (1910–1927, 26 px): capota, parabrisas, faros de latón, ruedas de radios que giran; x: centro, suelo, dir
function e_fordT(R, x, suelo, t, dir = 1, col = hex('#24242c')) {
  const { rect, pset, disco } = R; x = Math.round(x); const y = suelo, X = (i) => x + i * dir, R2 = (a, b, y0, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
  rect(x - 13, y, x + 13, y + 1, e_mez(EC.adoquinS, C.k, 0.5));
  R2(-12, 12, y - 8, y - 4, C.k); R2(-11, 11, y - 7, y - 5, col); R2(4, 11, y - 9, y - 5, col); R2(5, 10, y - 8, y - 8, hex('#4a4a56'));
  R2(-10, 2, y - 16, y - 15, C.k); R2(-10, -9, y - 15, y - 8, C.k); R2(1, 2, y - 15, y - 8, hex('#8aa8c4')); R2(-8, 0, y - 14, y - 9, hex('#3a3a46'));
  pset(X(-5), y - 11, E_PIEL[1]); pset(X(-4), y - 11, E_PIEL[1]); R2(-6, -3, y - 13, y - 12, E_SOMB[0]);
  pset(X(12), y - 8, C.oro); pset(X(12), y - 7, EC.solL);
  for (const wx of [-8, 8]) { disco(X(wx), y - 3, 3, C.k); disco(X(wx), y - 3, 2, hex('#5a5a66')); pset(X(wx), y - 3, C.k); const a = t * 10 * dir; pset(Math.round(X(wx) + Math.cos(a) * 1.5), Math.round(y - 3 + Math.sin(a) * 1.5), C.metalL); }
}

// una viga en doble T horizontal de x0 a x1 con el ala de arriba en la luz y la de abajo en sombra, y sus remaches
function e_viga(R, x0, x1, y, c = EC.minio, cS = EC.minioS, cL = EC.minioL) {
  const { rect, pset } = R; rect(x0, y - 2, x1, y + 2, C.k); rect(x0, y - 1, x1, y - 1, cL); rect(x0, y, x1, y, c); rect(x0, y + 1, x1, y + 1, cS);
  for (let x = x0 + 2; x < x1; x += 5) pset(x, y, cS);
}

// una columna en doble T vertical de y0 a y1 (x: canto izquierdo, 3 px): luz a la izquierda, sombra a la derecha, remaches
function e_pilar(R, x, y0, y1, c = EC.minio, cS = EC.minioS, cL = EC.minioL) {
  const { rect, pset } = R; rect(x - 1, y0, x + 3, y1, C.k); rect(x, y0, x, y1, cL); rect(x + 1, y0, x + 1, y1, c); rect(x + 2, y0, x + 2, y1, cS);
  for (let y = y0 + 2; y < y1; y += 4) pset(x + 1, y, cS);
}

// una grúa de pluma (derrick) de 1900–1931 sobre (x, y): el mástil con sus vientos, la pluma que gira despacio, el cable y
// la carga (una viga) que sube y baja; o.largo, o.fase, o.col; devuelve la punta de la pluma y la carga
function e_grua(R, x, y, t, o = {}) {
  const { rect, pset, linea } = R, L = o.largo ?? 34, f = o.fase ?? 0, col = o.col ?? hex('#3a3a46'), a = -2.3 + Math.sin(t * 0.35 + f) * 0.5, mh = o.alto ?? 22;
  linea(x, y - mh, x - 16, y, C.k); linea(x, y - mh, x + 14, y, C.k); rect(x - 1, y - mh, x + 1, y, C.k); rect(x, y - mh, x, y, col); pset(x, y - mh - 1, col);
  const px = Math.round(x + Math.cos(a) * L), py = Math.round(y - 3 + Math.sin(a) * L * 0.55);
  linea(x, y - 3, px, py, C.k); linea(x + 1, y - 3, px + 1, py, col); linea(x, y - mh, px, py, hex('#5a5a66'));
  for (let k = 1; k < 6; k++) { const u = k / 6; pset(Math.round(x + (px - x) * u), Math.round(y - 3 + (py - y + 3) * u) - 1, C.k); }
  const cuelga = Math.round(10 + (Math.sin(t * 0.5 + f) * 0.5 + 0.5) * (o.baja ?? 16)), cy = py + cuelga;
  linea(px, py, px, cy, hex('#2a2a36')); pset(px, cy + 1, C.k);
  if (o.carga !== false) e_viga(R, px - 7, px + 7, cy + 3);
  return { punta: [px, py], carga: [px, cy + 3] };
}

// una fragua de remaches: el brasero con las brasas que laten y las chispas que suben (x, y: la base)
function e_fragua(R, x, y, t) {
  const { rect, pset } = R; rect(x - 4, y - 5, x + 4, y, C.k); rect(x - 3, y - 4, x + 3, y - 1, hex('#3a3a46')); pset(x - 3, y + 1, C.k); pset(x + 3, y + 1, C.k);
  for (let i = -3; i <= 3; i++) pset(x + i, y - 5, Math.sin(t * 7 + i * 2) > 0.2 ? EC.brasaL : EC.brasa);
  for (let k = 0; k < 3; k++) { const u = (t * 1.3 + k / 3) % 1; pset(Math.round(x - 1 + k + Math.sin(t * 3 + k) * 1.5), Math.round(y - 6 - u * 9), u < 0.5 ? EC.brasaL : EC.brasa); }
}

// el remache al rojo que vuela en arco de (x0, y0) a (x1, y1) cada «cada» segundos, con su estela
function e_remache(R, t, x0, y0, x1, y1, cada = 2.2, fase = 0) {
  const u = ((t + fase) % cada) / 0.8; if (u > 1) return;
  for (let s = 0; s < 4; s++) { const v = Math.max(0, u - s * 0.05), x = Math.round(x0 + (x1 - x0) * v), y = Math.round(y0 + (y1 - y0) * v - Math.sin(v * Math.PI) * 14); R.pset(x, y, s === 0 ? EC.brasaL : s === 1 ? EC.brasa : EC.brasaS); }
}

// chispas de un martillo neumático: destellos que saltan en abanico a ratos
function e_chispas(R, t, x, y, k = 0, f = 1) {
  if (Math.sin(t * 11 + k * 3) < 0.35 * f) return;
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (h(i, Math.floor(t * 8), 650 + k) - 0.5) * 2.4, r = 1 + h(i, Math.floor(t * 8), 651 + k) * 4; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), i % 2 ? EC.brasaL : C.blanco); }
}

// Geometría: suelo de la sala 148–180 (los pies del público y de los personajes, 156–176); la torre: postes en x 138–142 y
// 178–182, de y 26 al suelo (150); polea en (160, 24); torno a la derecha en (198, 146); la plataforma (cubierta de
// x 144 a 176) con su y = 146 (abajo) … 64 (arriba). Devuelve { suelo: 166, pies: [20, 300], plataforma: { x0, x1, y, cx },
// polea, torno, maquina: [x, y] (la máquina de vapor), estatua }.
function e_palacio(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  const up = e_cl(o.plataforma ?? 0), cortada = (o.cuerda ?? 0) > 0, py = Math.round(146 - up * 82), chis = o.chispas ?? 0;
  e_cielo(R, t, { hor: 112, cols: EC.dia, aves: 2, sem: 3, yN: 20 });
  e_capa(R, 'palacio', () => e_palacioFijo(R));
  // las banderas de las naciones que cuelgan de la galería y ondean
  [[28, 0], [70, 1], [110, 2], [214, 3], [252, 4]].forEach(([fx, k]) => { const cols = [[C.rojoBandera, C.blanco, C.azulBandera], [hex('#2a8a4a'), C.blanco, C.rojoBandera], [C.azulBandera, C.blanco, C.rojoBandera], [hex('#e8b830'), C.rojoBandera, hex('#e8b830')], [C.blanco, C.rojoBandera, C.blanco]][k];
    rect(fx, 76, fx, 92, C.k); pset(fx, 75, C.oro);
    for (let i = 0; i < 14; i++) for (let j = 0; j < 9; j++) { const w = Math.round(Math.sin(t * 4 - i * 0.5 + k) * (i / 14) * 1.6); R.pset(fx + 1 + i, 77 + j + w, j === 0 || j === 8 ? e_mez(cols[Math.floor(j / 3)], C.k, 0.2) : cols[Math.floor(j / 3)]); } });
  // el público en la galería: cabezas y sombreros que se asoman tras la barandilla
  for (let k = 0; k < 26; k++) { const x = 6 + k * 12 + (k % 3) * 2; if (x > 126 && x < 194) continue; const y = 90 + Math.round(Math.sin(t * 1.3 + k) > 0.8 ? -1 : 0), ph = E_PIEL[k % 4];
    rect(x, y + 3, x + 3, y + 6, E_ROPA[k % 7][0]); rect(x + 1, y, x + 2, y + 2, ph); rect(x, y - 1, x + 3, y - 1, k % 3 === 2 ? E_SOMBM[k % 3] : E_SOMB[k % 4]); rect(x + 1, y - 2, x + 2, y - 2, k % 3 === 2 ? E_SOMBM[k % 3] : E_SOMB[k % 4]); }
  e_palacioBaranda(R);
  // el público de abajo, pequeño, delante de los expositores; alguno pasea
  for (let k = 0; k < 9; k++) { const x0 = [12, 98, 120, 200, 226, 262, 286, 30, 236][k], anda = k > 6, x = anda ? ((x0 + t * (k % 2 ? 6 : -6)) % 320 + 320) % 320 : x0; if (anda && x > 120 && x < 200) continue; e_gente(R, x, 147, t, k + 2, { anda }); }
  // la máquina de vapor: el volante que gira, la biela, el émbolo y el vapor
  { const cx = 66, cy = 124, r = 15, a = t * 3.2;
    disco(cx, cy, r + 1, C.k); disco(cx, cy, r, EC.hierro); disco(cx, cy, r - 2, C.k); disco(cx, cy, r - 3, hex('#3a3440'));
    for (let k = 0; k < 6; k++) { const b = a + k * Math.PI / 3; linea(cx, cy, Math.round(cx + Math.cos(b) * (r - 2)), Math.round(cy + Math.sin(b) * (r - 2)), EC.hierroL); }
    for (let k = 0; k < 24; k++) { const b = k / 24 * Math.PI * 2; if (Math.cos(b - 2.3) > 0.4) pset(Math.round(cx + Math.cos(b) * (r - 0.5)), Math.round(cy + Math.sin(b) * (r - 0.5)), EC.hierroT); }
    disco(cx, cy, 3, C.oro); pset(cx - 1, cy - 1, EC.solL);
    const mx = Math.round(cx + Math.cos(a) * 8), my = Math.round(cy + Math.sin(a) * 8), ex = 32 + Math.round(Math.cos(a) * 4);
    linea(mx, my, ex + 10, 124, C.k); linea(mx, my - 1, ex + 10, 123, C.oro); rect(ex - 2, 123, ex + 10, 124, EC.inoxM); disco(mx, my, 1, C.oroS);
    for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1, sx = Math.round(26 + Math.sin(t + k) * 2 - u * 6), sy = Math.round(100 - u * 26); disco(sx, sy, 1 + u * 4, u > 0.6 ? e_mez(C.blanco, EC.dia[3], 0.5) : C.blanco); } }
  // la torre del ascensor de Otis (dinámica: la plataforma, la cuerda, el muelle)
  e_otis(R, t, py, cortada, chis);
  return { suelo: 166, pies: [20, 300], hor: 148, plataforma: { x0: 145, x1: 175, y: py, cx: 160 }, polea: [160, 24], torno: [198, 146], maquina: [66, 124], estatua: [240, 96] };
}

// la parte fija del Palacio de Cristal (capa): la cúpula de costillas y anillos con montantes finos y el cristal tramado
// (deja ver el cielo que pasa), la bóveda de la nave con cerchas, el gran arco de hierro con rosetas, la galería, el fondo
// de expositores, el suelo de tablas en perspectiva con la alfombra, las columnas de hierro fundido, la estatua, la vitrina,
// las palmeras, la base de la máquina de vapor y los postes de la torre del ascensor con su cremallera y la polea
function e_palacioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, PI = Math.PI;
  const tinte = hex('#e4f2f8'), tinte2 = hex('#c8e0ec');
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) {
    const dx = x - 160, dy = (122 - y) * 1.45, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx); let c = 0;
    const calma = (x > 266 && y < 50) || (x < 176 && y < 16);
    if (d > 157) { const gx = (x + 1000) % 16, gy = y % 12;
      c = gy === 0 ? EC.hierroS : gx === 0 ? EC.hierro : gx === 8 ? EC.hierroL : e_bay(x, y) < 0.2 ? tinte : 0;
      if (((x + y) % 48 === 0) || ((x - y + 960) % 48 === 0)) c = EC.hierroS;
      if (!c && h(x >> 4, Math.floor(y / 12), 660) < 0.2 && e_bay(x, y) < 0.55) c = tinte2; }
    else if (d > 147) { c = d > 155 ? C.k : d < 149 ? EC.hierroT : EC.hierro; const s = (a * d) % 9; if (d > 149 && d < 154 && s < 2.5) c = d < 151.5 ? C.oro : C.oroS; }
    else if (d < 18) c = d > 16 ? C.k : d > 13 ? EC.hierroL : e_bay(x, y) < 0.5 ? C.blanco : tinte;
    else { const step = PI / 18, fa = a / step, dist = Math.abs(fa - Math.round(fa)) * step * d, dist2 = Math.abs(fa - 0.5 - Math.round(fa - 0.5)) * step * d;
      const ring = [42, 78, 112, 136].some((r) => Math.abs(d - r) < 1.4), ringF = Math.abs(((d - 18) % 9) - 4.5) < 0.5;
      if (dist < 1.1) c = dist < 0.5 ? EC.hierroS : EC.hierro; else if (ring) c = Math.abs([42, 78, 112, 136].reduce((m, r) => (Math.abs(d - r) < Math.abs(d - m) ? r : m)) - d) < 0.6 ? EC.hierro : EC.hierroL;
      else if (dist2 < 0.5 || ringF) c = EC.hierroL;
      else { const cel = h(Math.round(fa), Math.floor(d / 9), 661); c = cel < 0.18 ? (e_bay(x, y) < 0.7 ? tinte2 : tinte) : e_bay(x, y) < 0.22 ? tinte : 0; } }
    if (c && calma) c = e_mez(c, EC.dia[1], 0.78);
    if (c) B[y * 320 + x] = c; }
  // el fondo de abajo: la pared de cristal del fondo, arcos y columnas finas, expositores con telas, jarrones y un órgano
  for (let y = 100; y < 148; y++) for (let x = 0; x < 320; x++) { const gx = x % 26; B[y * 320 + x] = gx === 0 ? EC.hierroS : gx === 1 ? EC.hierro : y < 118 ? (e_bay(x, y) < 0.5 ? hex('#c8dce6') : hex('#b0c8d6')) : (y + (x >> 3)) % 9 === 0 ? hex('#8a7a6a') : hex('#a89a86'); }
  for (let x = 0; x < 320; x += 26) for (let i = 0; i < 26; i++) { const yy = 100 + Math.round(8 - Math.sin(i / 26 * PI) * 8); pset(x + i, yy, EC.hierroS); pset(x + i, yy + 1, EC.hierroL); }
  // los expositores del fondo: telas colgadas, baldas con jarrones, un piano, un órgano de tubos, un carruaje de exposición
  const tela = [C.rojoBandera, hex('#e8b830'), hex('#3a6ab8'), hex('#2a8a4a'), hex('#8a3a8a'), C.blanco];
  for (let k = 0; k < 12; k++) { const x0 = 4 + k * 26; if (x0 > 120 && x0 < 196) continue; const tipo = k % 4;
    if (tipo === 0) for (let i = 0; i < 4; i++) { rect(x0 + 3 + i * 5, 120, x0 + 6 + i * 5, 140, tela[(k + i) % 6]); rect(x0 + 6 + i * 5, 120, x0 + 6 + i * 5, 140, e_mez(tela[(k + i) % 6], C.k, 0.3)); rect(x0 + 2, 119, x0 + 23, 119, EC.tablaD); }
    else if (tipo === 1) { for (const by of [126, 134, 142]) { rect(x0 + 2, by, x0 + 23, by, EC.tablaD); for (let i = 0; i < 5; i++) { const vx = x0 + 3 + i * 4, vc = [hex('#3a6ab8'), C.blanco, hex('#c8603a'), hex('#e8b830'), hex('#2a8a4a')][(i + by) % 5]; rect(vx, by - 5, vx + 2, by - 1, vc); pset(vx + 1, by - 6, vc); pset(vx, by - 4, C.blanco); } } }
    else if (tipo === 2) { for (let i = 0; i < 9; i++) { const ph = 10 + (i < 5 ? i : 8 - i) * 3; rect(x0 + 3 + i * 2, 132 - ph, x0 + 3 + i * 2, 132, i % 2 ? C.oro : C.oroS); } rect(x0 + 1, 132, x0 + 23, 146, EC.tablaD); rect(x0 + 2, 133, x0 + 22, 134, EC.tablaS); }
    else { rect(x0 + 2, 128, x0 + 22, 138, hex('#2a2430')); rect(x0 + 2, 127, x0 + 22, 127, C.oro); for (const wx of [x0 + 6, x0 + 18]) { disco(wx, 141, 4, C.k); disco(wx, 141, 3, hex('#c8a040')); disco(wx, 141, 1, C.k); } rect(x0 + 6, 130, x0 + 12, 134, EC.vidrioM); } }
  // la galería: el canto de hierro con su friso y la barandilla se pintan delante (e_palacioBaranda), aquí el forjado
  for (let x = 0; x < 320; x++) { for (let y = 92; y <= 100; y++) B[y * 320 + x] = y === 92 ? EC.hierroL : y === 100 ? C.k : (y === 96 && x % 6 < 3) ? C.oroS : y < 96 ? EC.hierro : EC.hierroS; }
  // el suelo de tablas en perspectiva (punto de fuga en 160, 70), con la alfombra roja hasta la torre y vetas
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 70), tb = Math.floor(u * 10 + 100), fr = u * 10 + 100 - tb, q = h(tb, y >> 1, 662);
    let c = fr < 0.08 ? EC.tablaD : q < 0.25 ? EC.tablaS : q > 0.88 ? EC.tablaL : EC.tabla; if ((y + tb * 7) % 23 === 0) c = EC.tablaD;
    if (Math.abs(u) < 0.22) c = Math.abs(u) > 0.19 ? C.oro : Math.abs(u) > 0.17 ? EC.alfombraS : (h(x >> 1, y >> 1, 663) < 0.15 ? EC.alfombraS : EC.alfombra);
    if (y === 148) c = EC.tablaD; B[y * 320 + x] = c; }
  for (let y = 149; y < 180; y++) for (let x = 0; x < 320; x++) { const w = (y - 148) * 0.08; if (Math.abs(x - 160) < 26 + w * 20 && e_bay(x, y) < 0.18 * (1 - (y - 148) / 40)) B[y * 320 + x] = e_mez(B[y * 320 + x], C.blanco, 0.25); }
  // las columnas de hierro fundido de delante, con capitel, anillos, basa y las ménsulas caladas
  for (const cx of [6, 264]) { rect(cx - 1, 52, cx + 9, 180, C.k); rect(cx, 52, cx + 8, 180, EC.hierro); rect(cx + 1, 52, cx + 2, 180, EC.hierroL); rect(cx + 6, 52, cx + 8, 180, EC.hierroS);
    for (const ry of [70, 110, 150]) { rect(cx - 1, ry, cx + 9, ry + 2, C.k); rect(cx - 1, ry, cx + 9, ry, EC.hierroT); }
    rect(cx - 4, 48, cx + 12, 54, C.k); rect(cx - 3, 49, cx + 11, 53, EC.hierro); rect(cx - 3, 49, cx + 11, 49, EC.hierroT); for (let i = cx - 2; i < cx + 11; i += 3) pset(i, 51, C.oroS);
    rect(cx - 3, 172, cx + 11, 180, C.k); rect(cx - 2, 173, cx + 10, 179, EC.hierro); rect(cx - 2, 173, cx + 10, 173, EC.hierroT);
    const d = cx < 160 ? 1 : -1; for (let i = 0; i < 18; i++) { const yy = 54 + Math.round(Math.sqrt(i) * 4); pset(cx + 4 + d * (6 + i), yy, C.k); pset(cx + 4 + d * (6 + i), yy + 1, EC.hierroL); } }
  // la estatua ecuestre de mármol sobre su pedestal (a la derecha), y la vitrina con cacharros de plata
  { const sx = 240; rect(sx - 12, 120, sx + 12, 150, C.k); rect(sx - 11, 121, sx + 11, 150, hex('#b8b0a4')); rect(sx - 11, 121, sx - 8, 150, hex('#d8d2c8')); rect(sx + 8, 121, sx + 11, 150, hex('#8e877c')); rect(sx - 14, 118, sx + 14, 121, hex('#d8d2c8')); rect(sx - 14, 121, sx + 14, 121, hex('#8e877c'));
    rect(sx - 6, 130, sx + 6, 140, hex('#a8a094')); rect(sx - 5, 131, sx + 5, 139, hex('#c8c0b4'));
    const m = hex('#e8e4dc'), mS = hex('#b4aea4'); rect(sx - 9, 104, sx + 8, 111, m); rect(sx - 9, 109, sx + 8, 111, mS); rect(sx + 7, 98, sx + 11, 106, m); rect(sx + 10, 96, sx + 13, 100, m); pset(sx + 13, 99, mS);
    for (const lx of [sx - 8, sx - 5, sx + 3, sx + 6]) rect(lx, 111, lx + 1, 117, lx % 2 ? m : mS); rect(sx - 11, 104, sx - 10, 110, mS);
    rect(sx - 3, 93, sx + 1, 104, m); rect(sx + 1, 94, sx + 1, 104, mS); disco(sx - 1, 90, 2.5, m); rect(sx - 4, 87, sx + 2, 87, mS); linea(sx + 1, 96, sx + 6, 92, m); }
  { const vx = 196; rect(vx, 124, vx + 22, 150, C.k); rect(vx + 1, 125, vx + 21, 138, hex('#cfe4ec')); rect(vx + 1, 139, vx + 21, 150, EC.tablaS); rect(vx + 1, 139, vx + 21, 139, EC.tablaL);
    for (let i = 0; i < 4; i++) { rect(vx + 3 + i * 5, 132, vx + 5 + i * 5, 137, EC.inoxM); pset(vx + 3 + i * 5, 132, C.blanco); pset(vx + 4 + i * 5, 130, EC.inoxM); } linea(vx + 2, 126, vx + 8, 136, C.blanco); }
  // las palmeras en sus tiestos, junto a la torre
  for (const [px, d] of [[118, -1], [204, 1]]) { rect(px - 5, 138, px + 5, 148, C.k); rect(px - 4, 139, px + 4, 148, hex('#c8703a')); rect(px - 4, 139, px + 4, 140, hex('#e8904a')); rect(px - 1, 116, px + 1, 138, EC.tablaS);
    for (let k = 0; k < 7; k++) { const an = -PI / 2 + (k - 3) * 0.45; for (let r = 0; r < 14; r++) { const xx = Math.round(px + Math.cos(an) * r * 1.2), yy = Math.round(116 + Math.sin(an) * r * 0.8 + r * r * 0.05); pset(xx, yy, C.k); pset(xx, yy - 1, r < 7 ? C.hierbaS : C.hierba); if (r % 3 === 1) pset(xx + 1, yy + 1, C.hierbaL); } } }
  // la base de la máquina de vapor: la caldera con remaches, la bancada, el cilindro y la chimenea
  rect(14, 104, 30, 147, C.k); rect(15, 105, 29, 146, hex('#5a4a40')); rect(15, 105, 17, 146, hex('#7a6a5a')); for (let y = 108; y < 146; y += 5) for (let x = 18; x < 29; x += 3) pset(x, y, C.oroS); rect(13, 100, 31, 104, C.k); rect(14, 101, 30, 103, C.oroS); rect(20, 86, 24, 100, C.k); rect(21, 86, 23, 100, hex('#4a3e38'));
  rect(30, 118, 46, 128, C.k); rect(31, 119, 45, 127, EC.hierro); rect(31, 119, 45, 120, EC.hierroL); rect(12, 146, 96, 150, C.k); rect(13, 146, 95, 148, hex('#6a5a4a')); rect(60, 128, 72, 146, C.k); rect(61, 129, 71, 146, hex('#5a4a40'));
  // la torre del ascensor: dos postes de madera con la cremallera de dientes, crucetas por detrás, el travesaño y la polea
  for (const [px, d] of [[138, 1], [178, -1]]) { rect(px, 26, px + 4, 150, C.k); rect(px + 1, 26, px + 3, 150, EC.tabla); rect(px + 1, 26, px + 1, 150, EC.tablaL); for (let y = 30; y < 150; y += 7) pset(px + 2, y, EC.tablaS);
    const ix = d > 0 ? px + 5 : px - 1; for (let y = 30; y < 148; y += 3) { pset(ix, y, EC.hierroS); pset(ix + d, y + 1, EC.hierro); pset(ix, y + 1, EC.hierroL); pset(ix, y + 2, EC.hierro); } }
  for (const [ya, yb] of [[34, 70], [70, 106], [106, 146]]) { linea(143, ya, 177, yb, e_mez(EC.tablaS, EC.dia[3], 0.3)); linea(177, ya, 143, yb, e_mez(EC.tablaS, EC.dia[3], 0.3)); }
  rect(132, 26, 188, 31, C.k); rect(133, 27, 187, 30, EC.tabla); rect(133, 27, 187, 27, EC.tablaL); rect(133, 30, 187, 30, EC.tablaS);
  disco(160, 24, 6, C.k); disco(160, 24, 5, EC.hierro); disco(160, 24, 3, EC.hierroS); disco(160, 24, 1, C.oro);
  // el torno de la cuerda a la derecha, con su manivela
  rect(192, 138, 206, 148, C.k); rect(193, 139, 205, 147, EC.tablaS); disco(199, 140, 4, C.k); disco(199, 140, 3, EC.tabla); rect(196, 140, 202, 140, hex('#c8b090')); rect(206, 136, 207, 141, C.k);
}

// la barandilla de la galería (se pinta encima del público de la galería): pasamanos y balaustres de hierro
function e_palacioBaranda(R) {
  const { rect, pset } = R; rect(0, 86, 319, 87, C.k); rect(0, 86, 319, 86, EC.hierroL);
  for (let x = 2; x < 320; x += 4) { rect(x, 88, x, 91, EC.hierroS); pset(x, 89, EC.hierro); } rect(0, 91, 319, 91, EC.hierroS);
}

// la torre de Otis por delante: la cuerda (entera o cortada), la plataforma con la barandilla, los montantes, el muelle de
// ballesta y los trinquetes que muerden los dientes; py: la cubierta de la plataforma
function e_otis(R, t, py, cortada, chis) {
  const { rect, pset, linea, disco } = R, cuerda = hex('#c8a870'), cuerdaS = hex('#8a7044');
  const top = py - 34;
  // la cuerda que baja del torno a la polea (lado derecho)
  if (!cortada) { linea(166, 25, 199, 139, cuerdaS); linea(165, 25, 198, 139, cuerda); for (let y = 29; y < top; y++) { pset(160, y, (y >> 1) % 2 ? cuerda : cuerdaS); pset(161, y, cuerdaS); } }
  else { // el cabo de arriba cuelga de la polea y se balancea; el de abajo, deshilachado, sobre el muelle; la del torno, floja
    const sw = Math.sin(t * 2.6) * 3; for (let j = 0; j < 22; j++) { const x = Math.round(160 + sw * (j / 22) ** 1.5), y = 29 + j; pset(x, y, (y >> 1) % 2 ? cuerda : cuerdaS); pset(x + 1, y, cuerdaS); }
    pset(Math.round(160 + sw) - 1, 51, cuerda); pset(Math.round(160 + sw) + 2, 51, cuerda);
    for (let k = 0; k <= 30; k++) { const u = k / 30, x = Math.round(166 + 33 * u), y = Math.round(25 + 114 * u + Math.sin(u * Math.PI) * 10); pset(x, y, cuerda); }
    for (let y = top - 5; y < top; y++) { pset(160, y, cuerda); pset(161, y, cuerdaS); } pset(159, top - 6, cuerda); pset(162, top - 6, cuerda); }
  // la plataforma: los montantes, el travesaño con el muelle de ballesta y los trinquetes en la cremallera
  for (const x of [145, 174]) { rect(x, top, x + 1, py, C.k); pset(x, top + 2, EC.hierroL); }
  rect(143, top - 1, 177, top + 1, C.k); rect(144, top, 176, top, EC.hierroL);
  const comba = cortada ? 0 : 3; for (let i = 0; i <= 28; i++) { const u = i / 28, y = Math.round(top - 2 - Math.sin(u * Math.PI) * comba); pset(146 + i, y, C.k); pset(146 + i, y - 1, EC.inoxM); }
  const muerde = cortada ? 2 : 0; for (const [x, d] of [[143, -1], [177, 1]]) { rect(Math.min(x, x + d * muerde), top - 1, Math.max(x, x + d * muerde), top + 2, C.k); pset(x + d * muerde, top + 2, EC.hierroL); }
  if (chis > 0) for (const x of [142 + 0, 178]) e_chispas(R, t, x, top + 1, x, 2 * chis);
  // la barandilla de la plataforma (por detrás de quien sube, solo a los lados) y la cubierta de tablas con su canto
  for (const x of [145, 174]) { rect(x - 1, py - 11, x + 2, py - 11, EC.tablaS); }
  rect(140, py, 180, py + 4, C.k); rect(141, py + 1, 179, py + 2, EC.tabla); rect(141, py + 1, 179, py + 1, EC.tablaL); rect(141, py + 3, 179, py + 3, EC.tablaS); for (let x = 145; x < 178; x += 6) pset(x, py + 2, EC.tablaD);
  rect(146, py + 5, 174, py + 6, C.k); linea(148, py + 6, 158, py + 10, C.k); linea(172, py + 6, 162, py + 10, C.k);
}

// Geometría: la calle (tranvía y carros) en y 132–150, por detrás de los personajes; la acera de delante 152–180 (los pies,
// 160–176); el solar: base del esqueleto en y 130, columnas x 104–232, plantas cada 8 px (12 con o.pisos = 1: techo en
// y 34); la valla de tablas de x 96 a 240, de y 112 a 131. Devuelve { suelo: 168, pies: [10, 300], hor, techo (y de la última
// viga), vigas: [{ y, x0, x1 }] de arriba abajo (para poner obreros sentados), grua: { punta, carga } }.
function e_obra(R, t, o) {
  const { rect, pset, linea, disco } = R, p = e_cl(o.pisos ?? 0.7), base = 130;
  e_cielo(R, t, { hor: 132, cols: EC.dia, sol: [58, 42, 9], aves: 4, sem: 5 });
  e_capa(R, 'obra', () => {
    e_skyline(R, 132, EC.lejos, { alto: [26, 64], sem: 2, ancho: [12, 26] });
    e_skyline(R, 132, EC.medio, { alto: [14, 40], sem: 7, ancho: [14, 30] });
    // a la izquierda, un edificio de ladrillo con su escalera de incendios y depósito; a la derecha, uno de piedra
    e_edificio(R, -2, 92, 54, 132, { tipo: 'ladrillo', ventanas: [6, 9, 13, 14], ox: 6, oy: 9, escalera: 56, deposito: 18, sem: 1, encendidas: 0.06 });
    e_edificio(R, 244, 322, 72, 132, { tipo: 'piedra', pared: [C.caliza, C.calizaS, C.calizaL], ventanas: [6, 10, 12, 15], ox: 7, sem: 2 });
    // los toldos de las tiendas de los bajos y sus escaparates
    for (const [x0, x1, c] of [[2, 40, C.rojoBandera], [48, 90, hex('#2a7a5a')], [248, 318, hex('#c8903a')]]) { rect(x0, 112, x1, 120, C.k); rect(x0 + 1, 113, x1 - 1, 119, (x0 >> 1) % 2 ? c : c); for (let x = x0 + 1; x < x1; x += 4) rect(x, 113, x + 1, 119, C.blanco); for (let x = x0 + 1; x < x1; x += 4) pset(x + 1, 120, C.k);
      rect(x0 + 2, 121, x1 - 2, 131, C.k); rect(x0 + 3, 122, x1 - 3, 130, EC.vidrioM); for (let x = x0 + 4; x < x1 - 3; x += 7) { rect(x, 126, x + 3, 130, [hex('#e8b830'), C.blanco, hex('#c8603a')][x % 3]); } linea(x0 + 4, 122, x0 + 10, 130, EC.vidrioL); }
    // el solar al fondo: tierra apisonada con montones de vigas y el cobertizo de los obreros
    for (let y = 122; y < 131; y++) for (let x = 94; x < 242; x++) R.pset(x, y, h(x, y, 670) < 0.2 ? C.tierraS : C.tierra);
    // la calle: adoquines en hiladas con los raíles del tranvía, el bordillo y la acera de losas de delante
    for (let y = 131; y < 152; y++) for (let x = 0; x < 320; x++) { const fila = (y - 131) >> 1, jx = (x + fila * 3) % 6 === 0, q = h(x >> 1, fila, 671); let c = (y - 131) % 2 === 1 || jx ? EC.adoquinS : q < 0.18 ? EC.adoquinL : q > 0.9 ? EC.adoquinS : EC.adoquin; if (y === 141 || y === 146) c = (x & 1) ? C.metalL : C.metal; if (y === 142 || y === 147) c = C.k; R.pset(x, y, c); }
    rect(0, 150, 319, 151, hex('#b8b0a8')); rect(0, 152, 319, 152, hex('#6a6670'));
    for (let y = 153; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = x % 20 === 0, jy = (y - 153) % 9 === 0, q = h(x >> 1, y >> 1, 672); R.pset(x, y, jx || jy ? C.aceraS : q < 0.1 ? hex('#bcb8c2') : q > 0.94 ? C.aceraS : C.acera); }
    for (const [x0, y0] of [[40, 160], [212, 170], [300, 158]]) for (let i = 0; i < 6; i++) pset(x0 + i, y0 + (i >> 1), C.aceraS);
    // las farolas de gas y la boca de riego
    for (const lx of [24, 292]) { rect(lx, 120, lx + 1, 151, C.k); rect(lx - 3, 114, lx + 4, 120, C.k); rect(lx - 2, 115, lx + 3, 119, hex('#f0e0a0')); rect(lx - 3, 113, lx + 4, 113, C.k); pset(lx, 112, C.k); }
    rect(270, 144, 273, 151, C.k); rect(271, 145, 272, 151, C.rojoBandera); rect(269, 147, 274, 147, C.rojoBandera);
  });
  // el esqueleto de acero: plantas que crecen con o.pisos (ver c_esqueleto)
  const { nf, yTop, AL, grua: g } = c_esqueleto(R, t, p);
  // la valla de tablas de la obra con carteles sin letras y la puerta del solar
  for (let x = 96; x <= 240; x++) for (let y = 112; y <= 131; y++) { const tb = Math.floor((x - 96) / 5), fr = (x - 96) % 5, q = h(tb, y >> 2, 674); pset(x, y, fr === 0 ? EC.tablaD : y === 112 ? EC.tablaL : q < 0.2 ? EC.tablaS : EC.tabla); }
  for (const [x0, c] of [[104, hex('#e8d8b0')], [146, hex('#c8603a')], [206, hex('#3a6ab8')]]) { rect(x0, 115, x0 + 20, 127, C.k); rect(x0 + 1, 116, x0 + 19, 126, c); for (const yy of [118, 121, 124]) rect(x0 + 3, yy, x0 + 3 + ((yy * 7 + x0) % 12) + 4, yy, C.k); }
  rect(172, 114, 196, 131, C.k); rect(173, 115, 195, 131, EC.tablaS); linea(173, 115, 195, 131, EC.tablaD); linea(195, 115, 173, 131, EC.tablaD);
  // la calle: el tranvía que pasa y un carro de caballos en sentido contrario
  { const u = (t * 22) % 520 - 60; e_tranvia(R, u, 146, t, 1, { cable: 102 }); }
  { const u = 380 - (t * 15 + 200) % 460; e_carro(R, u, 140, t, -1); }
  for (let x = 0; x < 320; x++) if (x % 3 === 0) pset(x, 102, C.k);
  // la gente que pasa por la acera de enfrente, delante de la valla
  for (let k = 0; k < 4; k++) { const u = ((t * (5 + k) + k * 90) % 360) - 20, x = k % 2 ? u : 320 - u; e_gente(R, x, 131, t, k + 1); }
  const vigas = []; for (let f = nf; f >= Math.max(1, nf - 3); f--) vigas.push({ y: base - f * AL, x0: 102, x1: 237 });
  return { suelo: 168, pies: [10, 300], hor: 132, techo: yTop, vigas, grua: g };
}
// Geometría: el Flatiron: proa en x 157–163 (base y 152, cornisa y 18), fachada izquierda hasta x 94 y derecha hasta x 234;
// el escaparate de la ferretería: cristal de x 10 a 66, y 112–148, con la balda en y 146 (centro libre: x 26–50); la calle
// (tranvía y coches) en y 150–162, por detrás; la acera de delante y 164–180 (los pies, 168–178). Devuelve { suelo: 172,
// pies: [6, 300], hor, escaparate: [x0, y0, x1, y1], balda: [x0, x1, y], proa: [160, 152], cima: [160, 18] }.
function e_flatiron(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  e_cielo(R, t, { hor: 150, cols: EC.dia, sol: [52, 38, 9], aves: 4, sem: 8, yN: 22 });
  e_capa(R, 'flatiron', () => e_flatironFijo(R));
  // la bandera del edificio de la derecha, que ondea al viento que siempre sopla en la esquina
  rect(300, 70, 300, 96, C.k); pset(300, 69, C.oro); for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) pset(299 - i, 71 + j + Math.round(Math.sin(t * 7 + i * 0.7) * (i / 10) * 1.5), j < 3 && i < 4 ? (j + i) % 2 ? C.blanco : C.azulBandera : j % 2 ? C.blanco : C.rojoBandera);
  // las palomas de la cornisa
  e_paloma(R, 128, 28, t, { picotea: true, dir: 1 }); e_paloma(R, 196, 28, t + 1, { picotea: true, dir: -1 });
  // la calle: el tranvía, un coche de caballos y la gente que cruza (por detrás de los personajes)
  { const u = 400 - ((t * 20) % 520); e_tranvia(R, u, 160, t, -1, {}); }
  { const u = (t * 16 + 60) % 460 - 50; e_carro(R, u, 154, t, 1); }
  for (let k = 0; k < 5; k++) { const v = 4 + k, u = ((t * v + k * 70) % 380) - 30, x = k % 2 ? u : 340 - u; if (x > 76 || k > 1) e_gente(R, x, 150, t, k + 3); }
  e_capa(R, 'flatironTienda', () => e_flatironTienda(R));
  // el viento de la esquina: un sombrero que rueda y vuela cada pocos segundos
  { const c = t % 7, u = c / 2.4; if (u < 1) { const x = Math.round(90 + u * 150), y = Math.round(148 - Math.sin(u * Math.PI) * 26), a = Math.floor(t * 10) % 2; rect(x - 2, y - 1, x + 2, y, C.k); rect(x - 1, y - 2 - a, x + 1, y - 1, hex('#2a2a36')); pset(x, y - 2 - a, hex('#5a5a66')); } }
  return { suelo: 172, pies: [6, 300], hor: 150, escaparate: [10, 112, 66, 148], balda: [12, 64, 146], libre: [26, 50], proa: [160, 152], cima: [160, 18] };
}

// la parte fija del encuadre del Flatiron (capa)
function e_flatironFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  e_skyline(R, 150, EC.lejos, { alto: [20, 50], sem: 12 });
  // los edificios que bordean las avenidas, en fuga: a la izquierda (Broadway) y a la derecha (la Quinta)
  e_edificio(R, 40, 94, 84, 150, { tipo: 'piedra', pared: [hex('#c8b8a0'), hex('#a8987e'), hex('#e0d4c0')], ventanas: [5, 8, 9, 12], ox: 4, sem: 4 });
  e_edificio(R, 234, 276, 78, 150, { tipo: 'ladrillo', pared: [C.brown, C.brownS, C.brownL], ventanas: [5, 8, 10, 12], ox: 5, sem: 5, deposito: 252 });
  e_edificio(R, 276, 322, 96, 150, { tipo: 'piedra', pared: [C.caliza, C.calizaS, C.calizaL], ventanas: [6, 9, 12, 13], ox: 6, sem: 6 });
  // el Flatiron: la proa estrecha y redonda y dos fachadas de caliza que se alejan en fuga muy marcada (la cuña); plantas,
  // ventanas en hileras que se apretan al alejarse, zócalo rústico, las tres plantas de la corona con ornamento y la cornisa
  const F = 21, P0 = 160, YT = 20, YB = 152;
  const cara = (x0, x1, lado) => { const n = Math.abs(x1 - x0);
    for (let i = 0; i <= n; i++) { const x = x0 + i * Math.sign(x1 - x0), u = i / n, yt = Math.round(YT + u * 38), yb = Math.round(YB - u * 12), luz = lado < 0;
      for (let y = yt; y <= yb; y++) { const v = (y - yt) / (yb - yt), fl = v * F, fi = Math.floor(fl), ff = fl - fi, s = Math.pow(u, 1.35) * 11, si = Math.floor(s), sf = s - si;
        const base = luz ? C.caliza : hex('#9a927c'), cara0 = luz ? C.calizaL : hex('#b0a890'); let c = cara0;
        if (ff < 0.12) c = base; else if (h(x >> 1, y, 680) < 0.1) c = base;
        const ventana = sf > 0.28 && sf < 0.74 && ff > 0.3 && ff < 0.86;
        if (fi < 3) { c = (y - yt) % 3 === 0 || sf < 0.08 ? base : cara0; if (fi === 0 && sf > 0.18 && sf < 0.86 && ff > 0.15) c = luz ? EC.vidrioM : EC.vidrio; }
        else if (ventana) c = (si + fi) % 6 === 0 ? (luz ? EC.vidrioL : EC.vidrioM) : ff < 0.55 ? EC.vidrioM : EC.vidrio;
        if (fi >= F - 3 && !ventana && (x + y) % 3 === 0) c = luz ? hex('#c8b898') : hex('#8a826e');
        if (fi === F - 3 && ff < 0.25) c = luz ? C.calizaS : hex('#7a725e');
        if (fi === 3 && ff < 0.18) c = luz ? C.calizaS : hex('#7a725e');
        B[y * 320 + x] = c; }
      // la cornisa que vuela sobre cada fachada, con su sombra
      pset(x, yt - 1, C.k); pset(x, yt - 2, luz ? hex('#f4ecd8') : C.calizaS); pset(x, yt - 3, C.k); pset(x, yt, e_mez(luz ? C.caliza : hex('#9a927c'), C.k, 0.45)); if (x % 3 === 0) pset(x, yt + 1, e_mez(C.caliza, C.k, 0.3)); } };
  cara(P0 - 3, 94, -1); cara(P0 + 3, 234, 1);
  // la proa redonda, de 6 px, con sus ventanas en una sola hilera
  for (let y = YT; y <= YB; y++) for (let x = P0 - 2; x <= P0 + 2; x++) { const v = (y - YT) / (YB - YT), fl = v * F, ff = fl - Math.floor(fl), w = (x - P0 + 2) / 4; let c = w < 0.3 ? hex('#f4ecd8') : w < 0.7 ? C.caliza : C.calizaS; if (ff < 0.12) c = e_mez(c, C.k, 0.2); if (x === P0 && ff > 0.3 && ff < 0.8 && Math.floor(fl) > 2) c = EC.vidrioM; B[y * 320 + x] = c; }
  rect(P0 - 4, YT - 3, P0 + 4, YT - 1, C.k); rect(P0 - 3, YT - 2, P0 + 3, YT - 2, hex('#f4ecd8')); linea(P0 - 3, YT, P0 - 3, YB, e_mez(C.caliza, C.k, 0.25)); linea(P0 + 3, YT, P0 + 3, YB, hex('#7a725e'));
  // la tienda baja de cristal de la punta (la «proa» de una planta) con su toldo
  rect(P0 - 9, 140, P0 + 9, 153, C.k); rect(P0 - 8, 141, P0 + 8, 153, hex('#3a4a5a')); for (let x = P0 - 7; x <= P0 + 7; x += 4) rect(x, 143, x + 2, 152, EC.vidrioM); for (let x = P0 - 9; x <= P0 + 9; x++) { pset(x, 139, (x >> 1) % 2 ? hex('#2a7a5a') : C.blanco); pset(x, 138, C.k); }
  // los toldos de las tiendas del zócalo, que siguen la fuga
  for (let i = 4; i < 56; i++) for (const d of [-1, 1]) { const x = P0 + d * (3 + i), u = i / (d < 0 ? 66 : 74), y = Math.round(YB - 14 - u * 8); if (i % 14 > 10) continue; rect(x, y, x, y + 3, (i >> 1) % 2 ? (d < 0 ? hex('#2a7a5a') : C.rojoBandera) : C.blanco); pset(x, y + 4, C.k); }
  // la calle: adoquines con los raíles; la acera de delante
  for (let y = 150; y < 164; y++) for (let x = 0; x < 320; x++) { if (y < 153 && x > 94 && x < 234) continue; const q = h(x >> 1, y, 681), fila = (y - 150) >> 1; B[y * 320 + x] = (y - 150) % 2 && (x + fila) % 5 === 0 ? EC.adoquinS : q < 0.15 ? EC.adoquinL : q > 0.9 ? EC.adoquinS : EC.adoquin; }
  for (let x = 0; x < 320; x++) { pset(x, 156, C.metalL); pset(x, 157, C.k); pset(x, 160, C.metalL); pset(x, 161, C.k); }
  rect(0, 164, 319, 165, hex('#b8b0a8')); rect(0, 166, 319, 166, hex('#6a6670'));
  for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = x % 22 === 0, jy = (y - 167) % 7 === 0, q = h(x >> 1, y >> 1, 682); B[y * 320 + x] = jx || jy ? C.aceraS : q < 0.1 ? hex('#bcb8c2') : C.acera; }
  for (const lx of [110, 214]) { rect(lx, 128, lx + 1, 164, C.k); rect(lx - 2, 122, lx + 3, 128, C.k); rect(lx - 1, 123, lx + 2, 127, hex('#f0e0a0')); }
}

// la ferretería de delante a la izquierda (capa por delante de la calle: tapa el tranvía y los coches que pasan detrás):
// fachada de madera pintada, rótulo de barras sin letras, toldo, el escaparate con cacharros y el centro de la balda libre
function e_flatironTienda(R) {
  const { rect, pset, linea, disco } = R;
  rect(0, 88, 76, 166, C.k); rect(0, 89, 75, 166, hex('#2a4a6a')); rect(0, 89, 75, 90, hex('#4a6a8a'));
  rect(4, 92, 72, 100, C.k); rect(5, 93, 71, 99, hex('#e8c860')); for (const [a, b] of [[10, 24], [28, 50], [54, 66]]) rect(a, 95, b, 97, hex('#2a4a6a'));
  for (let x = 2; x < 75; x++) { const y = 102 + ((x >> 2) & 1); rect(x, 101, x, y + 5, (x >> 2) % 2 ? hex('#2a7a5a') : C.blanco); pset(x, y + 6, C.k); }
  rect(8, 110, 68, 150, C.k); rect(10, 112, 66, 148, hex('#3a4a5a'));
  for (let y = 112; y <= 148; y++) for (let x = 10; x <= 66; x++) if (e_bay(x, y) < 0.3) pset(x, y, hex('#4a5e72'));
  rect(10, 146, 66, 148, EC.tablaS); rect(10, 146, 66, 146, EC.tablaL); rect(10, 128, 66, 129, EC.tablaS); rect(10, 128, 66, 128, EC.tablaL);
  for (const [x, c] of [[14, C.metalL], [56, hex('#c8703a')]]) { rect(x, 139, x + 7, 145, C.k); rect(x + 1, 140, x + 6, 145, c); pset(x + 1, 140, C.blanco); rect(x + 7, 141, x + 10, 141, C.k); }
  disco(62, 122, 4, C.k); disco(62, 122, 3, hex('#5a5a66')); rect(61, 116, 63, 118, C.k);
  for (const x of [16, 30, 44]) { disco(x + 3, 120, 4, C.k); disco(x + 3, 120, 3, EC.hierro); pset(x + 2, 119, EC.hierroL); rect(x + 3, 113, x + 3, 116, C.k); }
  rect(52, 136, 54, 145, C.k); rect(51, 134, 55, 136, C.k); pset(53, 138, EC.solL);
  linea(12, 113, 30, 147, hex('#6a7e92')); linea(16, 113, 34, 147, hex('#6a7e92'));
  rect(0, 150, 76, 166, C.k); rect(1, 151, 75, 165, hex('#22405e')); for (let x = 4; x < 74; x += 12) rect(x, 154, x + 8, 162, hex('#2e4e6e'));
}

// Geometría: el sol en (118, 30), detrás de la torre (x 92–262) con o.ley = 0; con o.ley = 1 la torre queda en escalones
// (corona en x 160–194, y 16) y una cuña de luz cae en la calle de x ≈ 8 a 178 abajo. La calle (Ford T, tranvía) en
// y 140–160, por detrás; la acera de delante y 162–180 (los pies, 168–178). Devuelve { suelo: 172, pies: [6, 300], sol,
// luz: [x0, x1] (lo que alumbra la cuña en el suelo), torre: [x0, x1] }.
function e_calle1915(R, t, o) {
  const { rect, pset, linea, disco } = R, B = R.buf, ley = e_cl(o.ley ?? 0);
  e_cielo(R, t, { hor: 140, cols: EC.dia, sol: [118, 30, 9], aves: 3, sem: 9, yN: 22 });
  // la torre: de un bloque recto que tapa el sol a escalones (los tramos se estrechan con la ley)
  const T = [[118, 140, 92, 262, 92, 262], [86, 118, 92, 262, 108, 246], [58, 86, 92, 262, 124, 230], [34, 58, 92, 262, 142, 212], [16, 34, 92, 262, 160, 194]];
  const top = Math.round(-2 + ley * 18), anchoEn = (y) => { for (const [a, b, l0, r0, l1, r1] of T) if (y >= a && y < b) return [Math.round(l0 + (l1 - l0) * ley), Math.round(r0 + (r1 - r0) * ley)]; return y < 16 ? [Math.round(92 + 68 * ley), Math.round(262 - 68 * ley)] : null; };
  for (let y = Math.max(0, top); y < 140; y++) { const w = anchoEn(y); if (!w) continue; const [x0, x1] = w, f0 = y * 320, calma = y < 16;
    for (let x = x0; x <= x1; x++) { const lx = x - 92, pier = lx % 10 < 2, piso = y % 6, q = h(x >> 1, y, 690); let c;
      if (pier) c = lx % 10 === 0 ? hex('#8a8aa0') : hex('#6e6e86'); else if (piso === 0) c = hex('#62627a'); else c = piso < 4 ? ((x + y) % 9 === 0 ? hex('#4a5a7a') : hex('#2e3650')) : hex('#3a3e56');
      if (q < 0.025 && !pier && piso > 0 && piso < 4) c = hex('#e8c060');   // alguna oficina con la luz encendida
      if (x === x0) c = e_mez(c, C.blanco, 0.35); else if (x === x1) c = e_mez(c, C.k, 0.4);
      if (calma) c = e_mez(c, hex('#6a6e88'), 0.6); B[f0 + x] = c; } }
  // las cornisas de cada escalón (y la corona con su tejado a cuatro aguas cuando ya hay escalones)
  if (ley > 0.05) { for (const [a] of T) { const w = anchoEn(a); if (!w || a <= top) continue; const wp = anchoEn(a - 1); if (wp && wp[0] === w[0]) continue; rect(w[0] - 1, a - 1, w[1] + 1, a, C.calizaS); rect(w[0] - 1, a - 1, w[1] + 1, a - 1, C.calizaL); }
    const w = anchoEn(16); R.poligono([[w[0], top + 1], [(w[0] + w[1]) / 2, top - 6 * ley], [w[1] + 1, top + 1]], e_mez(C.cobre, C.k, 0.2)); }
  e_capa(R, 'calle1915', () => e_calleFijo(R));
  // vida: el limpiacristales en su tabla, que baja por la torre
  { const w = anchoEn(100); if (w) { const x = w[0] + 30, y = 70 + Math.round((t * 3) % 40); linea(x - 4, Math.max(0, top), x - 4, y, C.k); linea(x + 8, Math.max(0, top), x + 8, y, C.k); rect(x - 5, y, x + 9, y + 1, EC.tabla); e_gente(R, x, y, t, 4, { anda: false, ropa: [EC.camisa, EC.camisaS, hex('#3a3a48')], som: hex('#3a3a48') }); if (Math.sin(t * 6) > 0) pset(x + 6, y - 7, C.blanco); } }
  // la calle: el Ford T y el tranvía
  { const u = (t * 26) % 480 - 40; e_fordT(R, u, 152, t, 1); }
  { const u = 420 - ((t * 18 + 140) % 520); e_tranvia(R, u, 158, t, -1, { cable: 118 }); }
  for (let x = 0; x < 320; x++) if (x % 3 === 0) pset(x, 118, C.k);
  // la luz y la sombra: una cuña de luz baja del sol con la ley; lo demás, a la sombra fría
  const sx = 118, sy = 30, a0 = -0.95 * ley, a1 = 0.55 * ley, lit = (x, y) => { if (ley < 0.02 || y < 40) return 0; const r = (x - sx) / (y - sy); return r > a0 && r < a1 ? 1 : 0; };
  const gente = [];
  for (let k = 0; k < 6; k++) { const v = 5 + k * 1.3, u = ((t * v + k * 61) % 360) - 20, x = k % 2 ? u : 340 - u; gente.push([Math.round(x), k]); }
  for (const [x, k] of gente) e_gente(R, x, 140, t, k + 1, { camisa: !!lit(x + 2, 136) });
  for (let y = 44; y < 180; y++) { const f0 = y * 320; for (let x = 0; x < 320; x++) { const i = f0 + x, c = B[i];
      if ((y < 118 && x >= 92 && x <= 262) || (x < 92 && y < 60) || (x > 262 && y < 72)) continue;   // el cielo y la torre
      const l = lit(x, y), borde = l && (() => { const r = (x - sx) / (y - sy); return Math.min(r - a0, a1 - r) * (y - sy) < 3; })();
      if (l) B[i] = borde ? (e_bay(x, y) < 0.5 ? e_mez(c, EC.solL, 0.18) : c) : e_mez(c, EC.solL, 0.14);
      else B[i] = e_mez(c, EC.sombra, 0.42 * (1 - ley * 0.35)); } }
  // el vapor de la alcantarilla (delante de la sombra)
  for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1, x = Math.round(214 + Math.sin(t * 1.4 + k) * 3 + u * 6), y = Math.round(150 - u * 34); disco(x, y, 1 + u * 4, (x + y) % 2 ? hex('#e8ecf0') : hex('#c8ced8')); }
  return { suelo: 172, pies: [6, 300], hor: 140, sol: [118, 30], luz: [Math.round(sx + a0 * 150), Math.round(sx + a1 * 150)], torre: [92, 262] };
}

// la parte fija de la calle de 1915 (capa): los edificios bajos de la izquierda y de la derecha, la calle con raíles, la
// tapa de la alcantarilla, el quiosco de periódicos (barras), las farolas y la acera de delante
function e_calleFijo(R) {
  const { rect, pset, linea, disco } = R, B = R.buf;
  e_edificio(R, -2, 90, 64, 140, { tipo: 'ladrillo', pared: [C.brown, C.brownS, C.brownL], ventanas: [6, 9, 12, 13], ox: 5, oy: 8, escalera: 40, sem: 7 });
  e_edificio(R, 264, 322, 76, 140, { tipo: 'piedra', pared: [C.caliza, C.calizaS, C.calizaL], ventanas: [6, 9, 12, 13], ox: 6, sem: 8 });
  for (const [x0, x1, c] of [[4, 44, hex('#2a7a5a')], [50, 88, C.rojoBandera], [268, 318, hex('#3a5a9a')]]) { for (let x = x0; x <= x1; x++) { rect(x, 120, x, 125, (x >> 2) % 2 ? c : C.blanco); pset(x, 126, C.k); } rect(x0 + 2, 127, x1 - 2, 139, C.k); rect(x0 + 3, 128, x1 - 3, 139, EC.vidrioM); linea(x0 + 4, 128, x0 + 10, 139, EC.vidrioL); }
  // la entrada de la torre: columnas y puertas de bronce
  rect(150, 118, 204, 140, C.k); rect(152, 120, 202, 140, hex('#4a4a5e')); for (let x = 154; x < 202; x += 8) { rect(x, 122, x + 2, 140, hex('#8a8aa0')); rect(x, 122, x, 140, hex('#a8a8bc')); } for (const x of [166, 182]) { rect(x, 128, x + 6, 140, hex('#8a6a30')); pset(x + 5, 134, C.oro); }
  for (let y = 140; y < 162; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y, 691), fila = (y - 140) >> 1; B[y * 320 + x] = (y - 140) % 2 && (x + fila * 2) % 5 === 0 ? EC.adoquinS : q < 0.14 ? EC.adoquinL : q > 0.92 ? EC.adoquinS : EC.adoquin; }
  for (let x = 0; x < 320; x++) { pset(x, 153, C.metalL); pset(x, 154, C.k); pset(x, 158, C.metalL); pset(x, 159, C.k); }
  disco(214, 150, 4, C.k); disco(214, 150, 3, hex('#4a4a56')); for (let i = -2; i <= 2; i += 2) pset(214 + i, 150, hex('#6a6a76'));
  rect(0, 162, 319, 163, hex('#b8b0a8')); rect(0, 164, 319, 164, hex('#6a6670'));
  for (let y = 165; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = x % 22 === 0, jy = (y - 165) % 8 === 0, q = h(x >> 1, y >> 1, 692); B[y * 320 + x] = jx || jy ? C.aceraS : q < 0.1 ? hex('#bcb8c2') : C.acera; }
  // el quiosco de periódicos (sin letras: barras de titulares) y las farolas
  rect(232, 120, 256, 140, C.k); rect(233, 121, 255, 140, hex('#5a3a2a')); rect(231, 118, 257, 120, hex('#2a4a3a')); for (let i = 0; i < 4; i++) { rect(235 + i * 5, 124, 238 + i * 5, 132, C.blanco); rect(235 + i * 5, 125, 238 + i * 5, 125, C.k); rect(235 + i * 5, 127, 237 + i * 5, 127, hex('#8a8a96')); }
  for (const lx of [36, 300]) { rect(lx, 128, lx + 1, 162, C.k); rect(lx - 2, 122, lx + 3, 128, C.k); rect(lx - 1, 123, lx + 2, 127, hex('#f0e0a0')); }
}

// Geometría: el escaparate: cristal de x 14 a 150, y 66–150; la tarta de boda (6 pisos) centrada en x 84, base y 140, cima
// (el remate) en y 99; la puerta de la tienda x 156–182, y 72–158; el rascacielos de enfrente centrado en x 250, base 136,
// cima de la aguja y 50; la acera de delante y 158–180 (los pies, 166–178). Devuelve { suelo: 172, pies: [6, 300], tarta:
// [84, 99] (donde se posa la paloma), rascacielos: [250, 50], escaparate: [14, 66, 150, 150], puerta: [156, 72, 182, 158] }.
const e_PISOS = [[44, 9], [34, 8], [25, 7], [17, 6], [10, 5], [5, 4]];

function e_pasteleria(R, t, o) {
  const { rect, pset, linea, disco } = R;
  e_cielo(R, t, { hor: 140, cols: EC.dia, aves: 3, sem: 11, yN: 24 });
  e_capa(R, 'pasteleria', () => e_pasteleriaFijo(R));
  // el pastelero que va y viene detrás del mostrador (recortado al cristal) y el vapor de un horno
  R.recorte([15, 67, 149, 149]);
  { const u = (Math.sin(t * 0.5) + 1) / 2, x = Math.round(24 + u * 40); e_gente(R, x, 116, t, 0, { anda: Math.abs(Math.cos(t * 0.5)) > 0.2, mujer: false, ropa: [C.blanco, hex('#d8d0c8'), hex('#3a3a48')], som: C.blanco }); R.rect(x - 1, 103, x + 5, 104, C.blanco); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.4 + k / 3) % 1; R.disco(Math.round(132 + Math.sin(t + k) * 2), Math.round(84 - u * 14), 1 + u * 2, e_mez(C.blanco, EC.calido, 0.4)); }
  R.recorte(null);
  // la muestra que cuelga del brazo de hierro (un pastel de tres pisos dorado sobre verde), que se mece con el aire
  { const d = Math.round(Math.sin(t * 1.1) * 1.2); linea(169, 18, 169 + d, 21, C.k); linea(181, 18, 181 + d, 21, C.k); rect(166 + d, 21, 184 + d, 37, C.k); rect(167 + d, 22, 183 + d, 36, hex('#2a5a4a')); rect(167 + d, 22, 183 + d, 22, hex('#3e7a64')); rect(168 + d, 23, 182 + d, 35, hex('#244e40')); rect(169 + d, 24, 181 + d, 34, hex('#2a5a4a'));
    for (const [w, y] of [[10, 31], [7, 28], [4, 25]]) { rect(175 + d - (w >> 1), y, 175 + d + (w >> 1), y + 2, C.oro); rect(175 + d - (w >> 1), y, 175 + d + (w >> 1), y, EC.solL); pset(175 + d + (w >> 1), y + 2, C.oroS); }
    pset(175 + d, 24, C.rojo); if (Math.sin(t * 2.3) > 0.7) pset(170 + d, 23, C.blanco); }
  // las lámparas del escaparate, que tiemblan un poco
  for (const lx of [44, 120]) { const f = Math.sin(t * 13 + lx) > 0.9 ? EC.calidoS : EC.calido; disco(lx, 72, 3, f); pset(lx, 71, C.blanco); }
  // palomas en el toldo y en la acera
  e_paloma(R, 40 + Math.round(Math.sin(t * 0.3) * 14), 54, t, { picotea: true, dir: Math.cos(t * 0.3) > 0 ? 1 : -1 });
  e_paloma(R, 214, 166, t + 2, { picotea: true, dir: -1 });
  // la calle de enfrente: coches de los años veinte y gente en la otra acera
  { const u = (t * 24) % 440 + 150; if (u < 340) e_fordT(R, u, 152, t, 1, hex('#2a3a5a')); }
  { const u = 340 - ((t * 19 + 90) % 440); if (u > 160) e_fordT(R, u, 156, t, -1, hex('#5a2a2a')); }
  R.recorte([188, 0, 319, 179]); for (let k = 0; k < 3; k++) { const u = ((t * (5 + k) + k * 50) % 170), x = 186 + (k % 2 ? u : 150 - u); e_gente(R, x, 142, t, k + 2); } R.recorte(null);
  return { suelo: 172, pies: [6, 300], hor: 140, tarta: [84, 99], rascacielos: [250, 50], escaparate: [14, 66, 150, 150], puerta: [156, 72, 182, 158] };
}
// la tarta de boda o el rascacielos con la misma silueta (los pisos de e_PISOS a escala s), centrada en cx con la base en y
function e_escalones(R, cx, y, s, cada) { let yy = y; e_PISOS.forEach(([w, hh], k) => { const W = Math.round(w * s), H = Math.round(hh * s), x0 = Math.round(cx - W / 2); cada(x0, yy - H, x0 + W, yy, k); yy -= H; }); return yy; }

// la parte fija de la pastelería (capa)
function e_pasteleriaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // enfrente: el perfil lejano, los edificios bajos y el rascacielos en escalones (con la misma silueta que la tarta)
  e_skyline(R, 140, EC.lejos, { x0: 186, alto: [20, 50], sem: 21 });
  const sk = (x0, y0, x1, y1, k) => { for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) { const lx = x - x0, c = lx === 0 ? C.calizaL : x >= x1 - 1 ? C.calizaS : lx % 4 === 1 && (y - y0) % 4 > 0 ? EC.vidrioM : h(x, y, 700) < 0.1 ? C.calizaS : C.caliza; B[y * 320 + x] = c; } rect(x0 - 1, y0, x1 + 1, y0, C.calizaL); rect(x0 - 1, y0 + 1, x1 + 1, y0 + 1, C.calizaS); };
  const cima = e_escalones(R, 250, 136, 1.9, sk); rect(249, cima - 8, 250, cima, C.calizaS); pset(249, cima - 9, C.oro);
  e_edificio(R, 190, 214, 104, 140, { tipo: 'ladrillo', ventanas: [5, 7, 8, 10], ox: 4, sem: 22, cornisa: true });
  e_edificio(R, 290, 322, 98, 140, { tipo: 'ladrillo', pared: [C.brown, C.brownS, C.brownL], ventanas: [5, 7, 8, 10], ox: 4, sem: 23 });
  for (let y = 140; y < 158; y++) for (let x = 186; x < 320; x++) { const q = h(x >> 1, y, 701); B[y * 320 + x] = y < 144 ? (x % 12 === 0 ? C.aceraS : C.acera) : y === 144 ? hex('#6a6670') : q < 0.1 ? C.asfaltoS : C.asfalto; }
  for (let x = 190; x < 320; x += 16) rect(x, 151, x + 8, 151, C.linea);
  // la fachada de la pastelería: ladrillo arriba con dos ventanas con jardineras, el toldo de rayas y el escaparate
  // (las ventanas empiezan en y 22: la franja de arriba, detrás de la barra del año, queda de ladrillo tranquilo)
  e_edificio(R, -2, 188, -4, 46, { tipo: 'ladrillo', ventanas: [12, 12, 40, 30], ox: 22, oy: 26, bajo: 2, sem: 24, cornisa: false });
  for (const x of [20, 60, 100, 140]) { rect(x - 2, 36, x + 14, 39, C.k); rect(x - 1, 36, x + 13, 38, hex('#7a4a2a')); rect(x - 1, 38, x + 13, 38, hex('#5a3420')); for (let i = 0; i < 7; i++) { pset(x + i * 2, 35, [C.rojo, C.rosa, C.amarillo, C.blanco][i % 4]); pset(x + i * 2 + 1, 34, C.hierba); pset(x + i * 2, 34, C.hierbaS); } }
  // el brazo de hierro del que cuelga la muestra de la pastelería (la muestra se mueve: va en e_pasteleria)
  rect(164, 17, 187, 17, C.k); linea(166, 18, 172, 18, C.k); pset(165, 16, C.k); pset(164, 15, C.k); linea(180, 18, 186, 23, C.k); rect(187, 15, 188, 25, C.k);
  rect(0, 44, 188, 46, C.k);
  for (let x = 0; x <= 188; x++) { const ola = (x % 10) < 5 ? 0 : 1; for (let y = 47; y <= 58 + ola; y++) pset(x, y, ((x / 8) | 0) % 2 ? hex('#c83a4a') : hex('#f4ece0')); pset(x, 59 + ola, C.k); pset(x, 47, e_mez(((x / 8) | 0) % 2 ? hex('#c83a4a') : hex('#f4ece0'), C.k, 0.3)); }
  for (let x = 0; x <= 188; x++) pset(x, 49, e_mez(((x / 8) | 0) % 2 ? hex('#c83a4a') : hex('#f4ece0'), C.blanco, 0.3));
  // el marco del escaparate (madera verde con filete de oro) y el zócalo
  rect(0, 60, 188, 158, C.k); rect(1, 61, 187, 157, hex('#2a5a4a')); rect(1, 61, 187, 62, hex('#3e7a64')); rect(4, 63, 184, 63, C.oro);
  rect(12, 64, 152, 152, C.oroS); rect(13, 65, 151, 151, C.k);
  // el interior cálido: pared con baldas de pan, el mostrador, las lámparas
  for (let y = 66; y <= 150; y++) for (let x = 14; x <= 150; x++) { const q = h(x >> 1, y >> 1, 702); B[y * 320 + x] = y < 118 ? (q < 0.2 ? hex('#d8a868') : (x + y) % 11 === 0 ? hex('#c8985a') : hex('#e8bc78')) : hex('#a8784a'); }
  for (const by of [82, 98]) { rect(14, by, 150, by + 1, EC.tablaD); for (let x = 18; x < 146; x += 7) { const k = (x + by) % 3; if (k === 0) { disco(x + 2, by - 2, 2.5, hex('#c8803a')); pset(x + 1, by - 3, hex('#e8a860')); } else if (k === 1) { rect(x, by - 3, x + 5, by - 1, hex('#d8984a')); for (let i = 0; i < 3; i++) pset(x + 1 + i * 2, by - 3, hex('#f0c080')); } else { rect(x + 1, by - 5, x + 4, by - 1, hex('#e8d8c0')); rect(x + 1, by - 5, x + 4, by - 5, C.rosa); } } }
  rect(14, 116, 150, 120, C.k); rect(14, 117, 150, 118, hex('#e8dcc8')); for (const lx of [44, 120]) { rect(lx, 66, lx, 69, C.k); }
  // la peana del escaparate, con un paño de encaje, y los dulces a los lados
  rect(14, 140, 150, 150, hex('#f2e8d8')); for (let x = 14; x <= 150; x += 3) { pset(x, 141, hex('#d8c8b0')); pset(x + 1, 142, hex('#d8c8b0')); } rect(14, 140, 150, 140, C.blanco);
  for (const [x, tipo] of [[20, 0], [36, 1], [118, 2], [134, 0]]) {
    if (tipo === 0) { rect(x - 1, 138, x + 11, 139, C.metalL); rect(x + 4, 133, x + 6, 138, C.metal); rect(x - 1, 132, x + 11, 132, C.metalL); for (let i = 0; i < 4; i++) { rect(x + i * 3, 128, x + i * 3 + 2, 131, [hex('#e87a9a'), hex('#8a5a3a'), hex('#f0e0a0'), hex('#9ac86a')][i]); pset(x + i * 3 + 1, 127, C.rojo); } }
    else if (tipo === 1) { for (let i = 0; i < 3; i++) { rect(x + i * 5, 134, x + i * 5 + 3, 139, hex('#c8784a')); rect(x + i * 5, 132, x + i * 5 + 3, 134, hex('#f4e0e8')); pset(x + i * 5 + 1, 131, C.rojo); } }
    else { rect(x, 135, x + 12, 139, hex('#c8803a')); rect(x, 135, x + 12, 135, hex('#e8a860')); for (let i = 0; i < 6; i++) pset(x + 1 + i * 2, 136, hex('#8a3a4a')); rect(x + 2, 132, x + 10, 134, C.blanco); } }
  // la tarta de boda: seis pisos con volantes de glaseado, perlas, rosas y el remate
  const T0 = hex('#f6f0e6'), TS = hex('#d8ccbc'), TL = C.blanco, rosa = hex('#e87a9a');
  rect(62, 140, 106, 141, C.metalS); rect(64, 139, 104, 139, C.metalL);
  const cimaT = e_escalones(R, 84, 139, 1, (x0, y0, x1, y1, k) => { rect(x0 - 1, y0 - 1, x1 + 1, y1, C.k); for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, x - x0 < 2 ? TL : x1 - x < 2 ? TS : T0);
    for (let x = x0; x <= x1; x += 2) pset(x, y0 + ((x >> 1) & 1), TS); for (let x = x0 + 1; x < x1; x += 3) pset(x, y1 - 1, hex('#e8dcd0')); if (k < 4) for (let x = x0 + 3; x < x1 - 1; x += 7) { pset(x, y0 + 2, rosa); pset(x + 1, y0 + 2, hex('#c85a7a')); pset(x, y0 + 3, C.hierbaS); } });
  disco(84, cimaT - 2, 2, C.k); disco(84, cimaT - 2, 1, rosa); pset(83, cimaT - 3, C.blanco);
  // el cristal: brillos en diagonal, el reflejo tenue del rascacielos de enfrente y el filete de oro sin letras
  for (let y = 66; y <= 150; y++) for (let x = 14; x <= 150; x++) { const d = (x + y * 0.6) % 70; if ((d < 3 || (d > 6 && d < 8)) && e_bay(x, y) < 0.6) B[y * 320 + x] = e_mez(B[y * 320 + x], C.blanco, 0.45); }
  e_escalones(R, 132, 128, 0.62, (x0, y0, x1, y1) => { for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) if (e_bay(x, y) < 0.35) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#dce8f0'), 0.4); });
  for (let a = 0; a <= 1; a += 0.01) { const x = Math.round(28 + a * 108), y = Math.round(74 - Math.sin(a * Math.PI) * 4); pset(x, y, C.oro); if (a > 0.1 && a < 0.9 && Math.round(a * 100) % 9 === 0) pset(x, y + 2, C.oroS); }
  // la puerta con su cristal, el tirador de latón y el felpudo
  rect(156, 70, 182, 158, C.k); rect(157, 71, 181, 157, hex('#2a5a4a')); rect(160, 74, 178, 120, EC.vidrioM); linea(162, 74, 172, 120, EC.vidrioL); rect(160, 124, 178, 154, hex('#245044')); rect(161, 125, 177, 125, hex('#3e7a64')); pset(160, 122, C.oro); pset(161, 122, C.oroS); rect(178, 110, 179, 114, C.oro);
  disco(169, 66, 3, C.oro); pset(168, 65, EC.solL);
  // la acera de delante: losas con juntas y manchas, el bordillo y la tapa de un sótano de hierro
  rect(0, 158, 319, 158, hex('#6a6670'));
  for (let y = 159; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = (x + (((y - 159) / 10) | 0) * 11) % 24 === 0, jy = (y - 159) % 10 === 0, q = h(x >> 1, y >> 1, 703); B[y * 320 + x] = jx || jy ? C.aceraS : q < 0.1 ? hex('#bcb8c2') : q > 0.95 ? C.aceraS : C.acera; }
  rect(196, 164, 222, 172, C.k); for (let x = 197; x < 222; x += 3) rect(x, 165, x + 1, 171, hex('#5a5a66'));
  rect(186, 148, 189, 158, C.k); rect(187, 120, 188, 158, C.k); rect(184, 116, 191, 121, C.k); rect(185, 117, 190, 120, hex('#f0e0a0'));
}
// la corona del Chrysler de frente (centro cx, base yb, escala s): seis arcos de acero inoxidable apilados, cada uno más
// estrecho y más alto, con la luz a la izquierda, el canto oscuro, las ventanas triangulares en abanico (encendidas con
// o.luces) y, con aguja (0–1), la aguja que sale de la cima con un destello que la recorre. Devuelve la punta [x, y].
function e_corona(R, cx, yb, s, aguja, t, o = {}) {
  const { pset, disco, poligono, linea } = R, n = o.tiers ?? 6, DY = 12, DR = 4, ven = o.luces ? EC.calido : hex('#1e2a42'), venL = hex('#46608a');
  const cuerpo = (x, y, r, d) => { const u = (x - cx) / r, q = h(x, y, 710), v = u + (d > 0.7 ? 0 : 0.35); if (s >= 0.6 && d < 0.66 && Math.round(x - cx + 100) % 5 === 2 && y % 4) return u > 0.5 ? hex('#3a4256') : EC.vidrio; return v < -0.5 ? EC.inoxL : v < 0.05 ? (q < 0.08 ? EC.inoxL : EC.inox) : v < 0.55 ? EC.inoxM : v < 0.95 ? EC.inoxS : EC.inoxD; };
  // de atrás (el piso más alto y estrecho) a delante: cada arco tapa la parte baja del de detrás, que asoma por encima
  for (let k = n - 1; k >= 0; k--) { const r = (36 - k * DR) * s, y0 = yb - k * DY * s;
    // el arco (semicírculo) y su costado vertical hasta la base: así cada piso es un escalón redondeado
    disco(cx, y0, r + 1, (x, y) => (y <= y0 ? C.k : R.pget(x, y)));
    for (let y = Math.round(y0); y <= yb; y++) { pset(Math.round(cx - r) - 1, y, C.k); pset(Math.round(cx + r) + 1, y, C.k); for (let x = Math.round(cx - r); x <= Math.round(cx + r); x++) { const lx = x - Math.round(cx - r); pset(x, y, s >= 0.6 && y > y0 + 3 && lx > 2 && x < cx + r - 2 && lx % 5 === 2 && y % 4 ? (x > cx + r * 0.5 ? hex('#3a4256') : EC.vidrio) : cuerpo(x, y, r, 0.5)); } }
    disco(cx, y0, r, (x, y, d) => (y > y0 ? R.pget(x, y) : cuerpo(x, y, r, d)));
    // las ventanas triangulares en abanico, oscuras, con la punta hacia fuera (el sol naciente del Chrysler)
    const nv = Math.max(5, Math.round(r / (s > 0.6 ? 3.6 : 3))), tam = Math.max(1.6, 4 * s);
    for (let i = 1; i < nv; i++) { const a = Math.PI + (i / nv) * Math.PI, ca = Math.cos(a), sa = Math.sin(a), r1 = r - 1, r0 = r - 1 - tam * 1.5, w = tam * 0.62;
      const col = o.luces && h(i, k, 711) < 0.6 ? EC.calido : ven;
      if (s < 0.6) { pset(Math.round(cx + ca * (r - 2)), Math.round(y0 + sa * (r - 2)), col); continue; }
      poligono([[cx + ca * r1, y0 + sa * r1], [cx + ca * r0 - sa * w, y0 + sa * r0 + ca * w], [cx + ca * r0 + sa * w, y0 + sa * r0 - ca * w]], col);
      if (ca < -0.3) pset(Math.round(cx + ca * (r0 + 1.5)), Math.round(y0 + sa * (r0 + 1.5)), venL); }
    if (s >= 0.6) for (let x = Math.round(cx - r); x <= Math.round(cx + r); x += 3) pset(x, Math.round(y0) + 2, EC.inoxD); }
  const yt = yb - (n - 1) * DY * s - (36 - (n - 1) * DR) * s, L = 46 * s * e_cl(aguja);
  if (L > 0.5) { const yTip = Math.round(yt - L);
    for (let y = yTip; y <= Math.round(yt) + 1; y++) { const u = (y - yTip) / Math.max(1, yt - yTip), w = Math.max(0, u * 2.6 * s); for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) pset(x, y, x < cx ? EC.inoxL : x > cx ? EC.inoxS : EC.inox); if (w < 0.5) pset(cx, y, EC.inoxM); }
    const g = (t * 0.7) % 1, gy = Math.round(yTip + g * (yt - yTip)); pset(cx, gy, C.blanco); if (s > 0.6) { pset(cx - 1, gy, C.blanco); pset(cx, gy - 1, C.blanco); }
    return [cx, yTip]; }
  pset(Math.round(cx), Math.round(yt) - 1, EC.inoxM); return [cx, Math.round(yt)];
}

// el fuste del Chrysler (de x0 a x1 y de y0 a y1): ladrillo blanco con las tiras de ventanas oscuras, bandas grises y las
// esquinas con luz y sombra; s: escala (las tiras cada 3 px a escala pequeña)
function e_fusteChrysler(R, x0, x1, y0, y1, o = {}) {
  const B = R.buf, paso = o.paso ?? 4;
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const lx = x - x0, u = lx / (x1 - x0); let c = u < 0.12 ? hex('#f0ece4') : u > 0.85 ? hex('#a8a4a0') : hex('#dcd8d0');
    if (lx % paso === Math.floor(paso / 2) && u > 0.06 && u < 0.94 && (y % 3) !== 0) c = u > 0.85 ? hex('#3a4256') : EC.vidrio;
    if (y % 22 === 0) c = hex('#6a6e7a'); if (o.luces && lx % paso === Math.floor(paso / 2) && h(x, y >> 1, 712) < 0.12) c = EC.calido;
    B[y * 320 + x] = c; }
}

// Geometría: la azotea de delante: pretil de y 146 a 154 y el suelo de tela asfáltica de 154 a 180 (los pies, 164–178); el
// depósito de agua (x 232–266, y 86–150), la chimenea (x 18–30, y 120–152) y la cuerda de la ropa de 30 a 96. El Chrysler
// centrado en x 110 (fuste de 96 a 124) y el rival en x 220 (fuste de 208 a 232). Devuelve { suelo: 170, pies: [8, 300],
// hor, chrysler: [110, cima], rival: [220, cima] }.
function e_carrera(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, [a, b] = (o.alturas ?? [0.6, 0.6]).map(e_cl), ag = e_cl(o.aguja ?? 0);
  e_cielo(R, t, { hor: 150, cols: EC.otono, nubes: EC.nubeOtono, sol: [60, 52, 10], aves: 3, sem: 13, yN: 18 });
  e_capa(R, 'carrera0', () => { e_skyline(R, 152, EC.lejosT, { alto: [26, 70], sem: 31, ancho: [10, 22] }); });
  // el Chrysler: fuste que crece, alas en escalón abajo, las últimas plantas en esqueleto con la grúa, y la corona
  const yA = Math.round(150 - a * 84);
  if (a > 0.3) e_fusteChrysler(R, 86, 134, Math.max(yA, 112), 152, { paso: 4, luces: true });
  e_fusteChrysler(R, 96, 124, yA + 6, 152, { paso: 4, luces: true });
  for (let y = yA; y < yA + 6; y += 2) e_viga(R, 96, 124, y, EC.hierro, EC.hierroS, EC.hierroL); for (const x of [96, 109, 121]) e_pilar(R, x, yA - 1, yA + 6, EC.hierro, EC.hierroS, EC.hierroL);
  let cimaA = yA;
  if (a > 0.85) { const tiers = Math.max(1, Math.round((a - 0.85) / 0.15 * 6)); cimaA = e_corona(R, 110, yA + 1, 0.39, ag, t, { tiers, luces: true })[1]; }
  else e_grua(R, 112, yA - 1, t, { largo: 16, alto: 10, baja: 8, fase: 0 });
  // el rival de Wall Street: fuste de caliza y ladrillo con escalones, la pirámide de cobre verde y el farol
  const yB = Math.round(150 - b * 94);
  for (let y = Math.max(0, yB); y <= 152; y++) for (let x = 200; x <= 240; x++) { const w = y < 104 ? 12 : y < 124 ? 16 : 20; if (Math.abs(x - 220) > w) continue; const lx = x - 220 + w, u = lx / (2 * w);
    let c = u < 0.12 ? hex('#e8d8c0') : u > 0.82 ? hex('#a08a70') : hex('#c8b496'); if (lx % 3 === 1 && y % 3 !== 0 && u > 0.08 && u < 0.92) c = h(x, y >> 1, 713) < 0.14 ? EC.calido : EC.vidrio; R.pset(x, y, c); }
  let cimaB = yB;
  if (b > 0.88) { const pu = Math.min(1, (b - 0.88) / 0.08); poligono([[208, yB + 1], [220, yB - 16 * pu], [233, yB + 1]], C.k); poligono([[209, yB], [220, yB - 15 * pu], [220, yB]], hex('#6ab8a4')); poligono([[220, yB - 15 * pu], [232, yB], [220, yB]], C.cobreS);
    for (let j = 2; j < 15 * pu; j += 3) R.linea(220 - (15 * pu - j) * 0.75, yB - 15 * pu + j, 220 + (15 * pu - j) * 0.75, yB - 15 * pu + j, e_mez(C.cobre, C.k, 0.2));
    cimaB = Math.round(yB - 15 * pu); if (b > 0.96) { rect(219, cimaB - 9, 221, cimaB, C.k); rect(220, cimaB - 9, 220, cimaB, EC.inoxM); pset(220, cimaB - 10, EC.solL); cimaB -= 10; } }
  else { for (let y = yB - 6; y < yB; y += 2) e_viga(R, 208, 232, y, EC.hierro, EC.hierroS, EC.hierroL); e_grua(R, 222, yB - 7, t, { largo: 16, alto: 10, baja: 8, fase: 2 }); }
  e_capa(R, 'carrera1', () => e_azoteaFijo(R));
  // vida: el humo de la chimenea, la ropa tendida que ondea, las palomas del pretil
  for (let k = 0; k < 6; k++) { const u = (t * 0.35 + k / 6) % 1, x = Math.round(24 + u * 20 + Math.sin(t + k) * 2), y = Math.round(116 - u * 40); disco(x, y, 1.5 + u * 4, u > 0.5 ? hex('#a89aa8') : hex('#c8bcc4')); }
  for (let k = 0; k < 5; k++) { const x0 = 38 + k * 12, cy = 128 + Math.round(Math.sin((x0 - 30) / 66 * Math.PI) * 4), w = Math.round(Math.sin(t * 4 + k) * 1.5), c = [C.blanco, hex('#c84a4a'), hex('#4a6ab8'), C.blanco, hex('#e8c040')][k];
    rect(x0, cy + 1, x0 + 7, cy + 2, c); for (let j = 3; j < 10; j++) { const sx = Math.round(w * (j / 10)); rect(x0 + sx + (j > 6 ? 1 : 0), cy + j, x0 + 7 + sx - (j > 6 ? 1 : 0), cy + j, j === 9 ? e_mez(c, C.k, 0.25) : c); } pset(x0 + 1, cy, C.k); pset(x0 + 6, cy, C.k); }
  e_paloma(R, 150, 146, t, { picotea: true, dir: 1 }); e_paloma(R, 180, 146, t + 3, { picotea: true, dir: -1 });
  { const c = t % 11; if (c < 3) e_paloma(R, Math.round(196 + c * 30), Math.round(146 - Math.sin(c / 3 * Math.PI) * 30), t, { vuela: true, dir: 1 }); else e_paloma(R, 206, 146, t, { picotea: true, dir: -1 }); }
  return { suelo: 170, pies: [8, 300], hor: 152, chrysler: [110, cimaA], rival: [220, cimaB] };
}

// la azotea de delante (capa): el pretil de ladrillo con su albardilla, la tela asfáltica con grava, la claraboya, la
// chimenea, el depósito de agua de madera con sus aros y la escalerilla, y los palos de la cuerda de tender
function e_azoteaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, B = R.buf;
  for (let y = 146; y < 155; y++) for (let x = 0; x < 320; x++) { const fila = (y - 146) >> 1, jx = (x + (fila & 1) * 2) % 5 === 0; B[y * 320 + x] = y < 148 ? (y === 146 ? hex('#d8d0c4') : hex('#a8a098')) : (y - 146) % 2 === 1 ? hex('#6a3a2e') : jx ? hex('#6a3a2e') : h(x, y, 720) < 0.15 ? C.ladrilloL : C.ladrillo; }
  for (let y = 155; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 721); B[y * 320 + x] = (y - 155) % 9 === 0 ? hex('#26262e') : q < 0.08 ? hex('#6a6a72') : q > 0.93 ? hex('#22222a') : hex('#3c3c46'); }
  for (let y = 155; y < 159; y++) for (let x = 0; x < 320; x++) if (e_bay(x, y) < 0.5) B[y * 320 + x] = hex('#2a2a32');
  // la claraboya de cristal armado
  rect(276, 158, 312, 172, C.k); poligono([[277, 166], [294, 158], [311, 166]], hex('#8aa8c4')); rect(277, 166, 311, 171, hex('#5a6a7a')); for (let x = 281; x < 310; x += 6) linea(x, 166, 294, 159, C.k); linea(284, 162, 290, 159, C.blanco);
  // la chimenea de ladrillo con su sombrerete
  rect(17, 120, 31, 152, C.k); for (let y = 121; y < 152; y++) for (let x = 18; x < 31; x++) B[y * 320 + x] = (y % 3 === 0 || (x + ((y / 3) | 0) * 2) % 5 === 0) ? hex('#6a3a2e') : x < 21 ? C.ladrilloL : C.ladrillo;
  rect(15, 117, 33, 120, C.k); rect(16, 118, 32, 119, hex('#8a8a96'));
  // los palos de la cuerda de tender y la cuerda
  rect(32, 122, 33, 152, C.k); rect(96, 122, 97, 152, C.k); for (let x = 33; x < 97; x++) pset(x, 124 + Math.round(Math.sin((x - 33) / 64 * Math.PI) * 4), hex('#4a4a56'));
  // el depósito de agua: patas de hierro, cuba de duelas con aros, tejadillo cónico y escalerilla
  for (const lx of [236, 262]) rect(lx, 122, lx + 1, 150, C.k); linea(236, 148, 262, 124, C.k); linea(262, 148, 236, 124, C.k); rect(233, 120, 266, 122, C.k);
  for (let y = 92; y < 121; y++) for (let x = 232; x <= 267; x++) { const lx = x - 232; B[y * 320 + x] = lx % 3 === 0 ? EC.tablaD : lx < 7 ? EC.tablaL : lx > 28 ? EC.tablaS : EC.tabla; }
  for (const y of [96, 104, 112, 118]) rect(232, y, 267, y, C.k); rect(231, 91, 268, 92, C.k);
  poligono([[230, 92], [249.5, 76], [269, 92]], C.k); poligono([[232, 91], [249.5, 78], [267, 91]], hex('#5a4a3a')); poligono([[232, 91], [249.5, 78], [242, 91]], hex('#7a6a54')); pset(249, 75, C.k);
  for (let y = 92; y < 150; y += 3) rect(270, y, 273, y, C.k); rect(270, 92, 270, 150, C.k); rect(273, 92, 273, 150, C.k);
}

// Geometría: el suelo de tablas de y 152 a 180 (los pies, 162–178); la aguja en el hueco del centro (x 150–170, de y 150 a
// 30); el andamio: tablones en y 112 (x 108–212) y y 76 (x 120–200), escaleras en x 116 y 204; la fragua en (126, 112).
// Devuelve { suelo: 170, pies: [8, 300], aguja: { x: 160, base: 150, cima }, andamios: [{ y, x0, x1 }], fragua }.
function e_cupula(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, piezas = e_cl(o.piezas ?? 0.5);
  e_cielo(R, t, { hor: 150, cols: EC.dia, aves: 0, sem: 17, yN: 30 });
  e_capa(R, 'cupula', () => e_cupulaFijo(R));
  // la aguja: cuatro piezas que se montan de abajo arriba (la siguiente cuelga del polipasto y se mece)
  const P = [[150, 112, 7], [112, 82, 5.5], [82, 56, 4], [56, 30, 2.5]], np = Math.max(1, Math.ceil(piezas * 4 - 0.001));
  const pieza = (y1, y0, w, dx = 0) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), ww = Math.round(w * (0.75 + 0.25 * u)); for (let x = -ww; x <= ww; x++) pset(160 + x + dx, y, x === -ww || x === ww ? C.k : x < -ww * 0.4 ? EC.inoxL : x < ww * 0.2 ? EC.inox : x < ww * 0.7 ? EC.inoxM : EC.inoxS); } rect(160 - w + dx, y1, 160 + w + dx, y1, C.k); for (let y = y0 + 3; y < y1; y += 5) pset(160 + dx, y, EC.inoxS); };
  for (let k = 0; k < np; k++) pieza(...P[k]);
  const g = (t * 0.5) % 1, gy = Math.round(P[np - 1][1] + g * (150 - P[np - 1][1])); pset(158, gy, C.blanco); pset(158, gy + 1, C.blanco);
  if (np < 4) { const [y1, y0, w] = P[np], sube = (Math.sin(t * 0.6) + 1) * 4, dx = Math.round(Math.sin(t * 1.3) * 2), off = Math.round(-(y1 - y0) - 10 - sube + (y1 - P[np - 1][1]) + 0);
    const yy1 = P[np - 1][1] - 8 - Math.round(sube), yy0 = yy1 - (y1 - y0); linea(160, 18, 160 + dx, yy0 - 3, hex('#3a3a46')); rect(158 + dx, yy0 - 3, 162 + dx, yy0 - 2, C.k); pieza(yy1, yy0, w, dx); }
  rect(154, 14, 166, 18, C.k); rect(155, 15, 165, 17, EC.hierro); disco(160, 20, 2, C.k);
  // la cuadrilla: el calentador en la fragua, el remache que vuela, el que lo coge, el remachador con chispas
  e_fragua(R, 126, 111, t); e_remache(R, t, 128, 104, 146, 104, 2.4);
  e_gente(R, 118, 111, t, 0, { anda: false, ropa: [hex('#3e5a8a'), hex('#2c4468'), hex('#3e5a8a')], som: hex('#5a4030') });
  e_gente(R, 140, 111, t, 1, { anda: false, ropa: [hex('#c84a3a'), hex('#8a2a24'), hex('#3e5a8a')], som: hex('#3a3a46') });
  e_gente(R, 176, 75, t, 2, { anda: false, mujer: false, ropa: [hex('#3e5a8a'), hex('#2c4468'), hex('#3e5a8a')], som: hex('#5a4030') }); e_chispas(R, t, 172, 64, 3);
  e_gente(R, 188, 111, t, 3, { anda: false, mujer: false, ropa: [hex('#5a5a4a'), hex('#3e3e34'), hex('#3e5a8a')], som: hex('#3a3a46') }); e_chispas(R, t, 186, 100, 5, 0.8);
  { const u = (Math.sin(t * 0.4) + 1) / 2, y = Math.round(112 - u * 36); e_gente(R, 202, y, t, 4, { anda: false, ropa: [hex('#3e5a8a'), hex('#2c4468'), hex('#3e5a8a')], som: hex('#5a4030') }); }
  // las motas de polvo que brillan en los haces de luz
  for (let k = 0; k < 18; k++) { const x = Math.round(70 + h(k, 1, 730) * 190 + Math.sin(t * 0.5 + k) * 6), y = Math.round(40 + ((h(k, 2, 730) * 110 + t * (2 + k % 3)) % 110)); if (e_luzCupula(x, y)) pset(x, y, hex('#fff4d0')); }
  // el farol del suelo, que tiembla
  { const f = Math.sin(t * 9) > 0.5 ? 1 : 0; R.disco(238, 160, 6 + f, (x, y) => (e_bay(x, y) < 0.4 ? e_mez(R.pget(x, y), EC.calido, 0.4) : R.pget(x, y))); rect(236, 158, 240, 164, C.k); rect(237, 159, 239, 163, EC.calido); rect(236, 156, 240, 157, C.k); }
  return { suelo: 170, pies: [8, 300], aguja: { x: 160, base: 150, cima: P[np - 1][1] }, andamios: [{ y: 112, x0: 108, x1: 212 }, { y: 76, x0: 120, x1: 200 }], fragua: [126, 112] };
}

// ¿cae ahí un haz de luz de las ventanas triangulares? (bandas inclinadas)
const e_luzCupula = (x, y) => { const d = (x - 160) * 0.55 + y; return [[60, 74], [100, 112], [146, 160]].some(([a, b]) => d > a && d < b) && y < 152; };

// la parte fija de la cúpula (capa): la oscuridad del interior, los arcos de acero con las ventanas triangulares
// (transparentes: dejan ver el cielo que pasa), vigas cruzadas, los haces de luz, el andamio y el suelo con herramientas
function e_cupulaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, cx = 160, cy = 158;
  const oscuro = hex('#262a36'), oscuro2 = hex('#2e3442'), viga = hex('#4a5262'), vigaL = hex('#6a7484');
  for (let y = 0; y < 152; y++) for (let x = 0; x < 320; x++) { const dx = x - cx, dy = (cy - y) * 1.18, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
    let c = (x + y) % 23 === 0 ? oscuro2 : h(x >> 2, y >> 2, 731) < 0.3 ? oscuro2 : oscuro;
    for (const r of [54, 84, 114, 142]) { if (Math.abs(d - r) < 3) c = Math.abs(d - r) < 1 ? vigaL : viga; }
    // las ventanas triangulares de cada anillo (con la punta hacia fuera): huecos al cielo
    for (const [r0, r1, n] of [[60, 78, 9], [90, 108, 13], [120, 137, 17]]) if (d > r0 && d < r1 && y < 150) { const fa = (a / Math.PI) * n, fr = fa - Math.floor(fa), u = (d - r0) / (r1 - r0), w = (1 - u) * 0.36; if (Math.abs(fr - 0.5) < w) c = 0; else if (Math.abs(fr - 0.5) < w + 0.06) c = C.k; }
    if (Math.abs(((a / Math.PI) * 16) % 1 - 0.5) > 0.46 && d > 50 && d < 145) c = viga;
    if (x > 266 && y < 50 && c === 0) c = e_mez(oscuro, EC.dia[2], 0.25);
    B[y * 320 + x] = c; }
  // vigas cruzadas oscuras por delante de los arcos (en diagonal) y la viga del polipasto
  for (const [x0, y0, x1, y1] of [[0, 30, 120, 150], [320, 30, 200, 150], [0, 96, 60, 150], [320, 96, 260, 150]]) { for (let k = -2; k <= 2; k++) linea(x0, y0 + k, x1, y1 + k, Math.abs(k) === 2 ? C.k : k === -1 ? vigaL : viga); }
  rect(0, 12, 319, 18, C.k); rect(0, 13, 319, 17, viga); rect(0, 13, 319, 13, vigaL); for (let x = 3; x < 320; x += 6) pset(x, 15, C.k);
  // los haces de luz en diagonal (tramados)
  for (let y = 20; y < 152; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (B[i] && e_luzCupula(x, y) && e_bay(x, y) < 0.45) B[i] = e_mez(B[i], hex('#fff0c0'), 0.28); }
  // el andamio: tablones, pies derechos y escaleras
  for (const [y, x0, x1] of [[112, 108, 212], [76, 120, 200]]) { rect(x0, y, x1, y + 3, C.k); rect(x0, y + 1, x1, y + 1, EC.tablaL); rect(x0, y + 2, x1, y + 2, EC.tabla); for (let x = x0 + 8; x < x1; x += 14) pset(x, y + 2, EC.tablaD); }
  for (const x of [110, 132, 188, 210]) { rect(x, 76, x + 1, 152, C.k); rect(x, 76, x, 152, EC.tablaS); }
  for (const [x, y0, y1] of [[114, 112, 152], [202, 76, 112]]) { rect(x, y0, x, y1, EC.tablaS); rect(x + 6, y0, x + 6, y1, EC.tablaS); for (let y = y0 + 3; y < y1; y += 4) rect(x, y, x + 6, y, EC.tabla); }
  // el suelo de tablas con clavos, la caja de herramientas, el cubo de remaches y el rollo de cuerda
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor((y - 152) / 4), fr = (y - 152) % 4, q = h(x >> 2, tb, 732); B[y * 320 + x] = fr === 0 ? EC.tablaD : ((x + tb * 37) % 53 === 0) ? EC.tablaD : q < 0.25 ? EC.tablaS : q > 0.85 ? EC.tablaL : EC.tabla; }
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) if (e_luzCupula(x, 150) && e_bay(x, y) < 0.25) B[y * 320 + x] = e_mez(B[y * 320 + x], C.blanco, 0.2);
  rect(40, 158, 64, 168, C.k); rect(41, 159, 63, 167, hex('#a83a2a')); rect(41, 159, 63, 160, hex('#c85a3a')); rect(48, 155, 56, 158, C.k); rect(50, 156, 54, 157, EC.hierroL);
  rect(76, 160, 86, 170, C.k); rect(77, 161, 85, 169, EC.hierro); for (let i = 0; i < 4; i++) pset(78 + i * 2, 161, EC.brasaS);
  for (let k = 0; k < 4; k++) R.anillo?.(272, 166, 7 - k, k % 2 ? hex('#a8884a') : hex('#c8a870'));
  for (let x = 140; x < 180; x++) { pset(x, 151, C.k); }
}

// Geometría: la corona centrada en x 110 con la base de los arcos en y 134 (los arcos de x 76 a 144), su cima en y 62 y la
// punta de la aguja en y 62 − 44·o.aguja (y 18 entera); el fuste de 134 a 180 con las águilas en (66, 160) y (154, 160).
// La azotea del rival a la derecha: suelo de x 190 a 320, de y 150 a 180 (los pies del obrero, 160–172), pretil del fondo
// en y 140–150, el mástil en x 296 y la caja de herramientas en (206, 162). Devuelve { suelo: 166, pies: [196, 296],
// punta: [110, y], corona: [110, 70], azotea: [190, 150, 320, 180] }.
function e_aguja(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, ag = e_cl(o.aguja ?? 0);
  e_cielo(R, t, { hor: 160, cols: EC.dia, aves: 4, sem: 19, yN: 20 });
  e_capa(R, 'aguja0', () => {
    // la ciudad muy abajo, en bruma, y el río a lo lejos
    e_skyline(R, 180, EC.lejos, { alto: [8, 30], sem: 41, ancho: [8, 18] }); e_skyline(R, 180, EC.medio, { alto: [4, 18], sem: 42, ancho: [10, 20] });
    for (let y = 132; y < 136; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === EC.dia[4] || e_bay(x, y) < 0.3) R.pset(x, y, e_mez(EC.dia[4], C.bahiaL, 0.5));
    e_fusteChrysler(R, 76, 144, 134, 180, { paso: 6 });
    // las águilas de acero de las esquinas
    for (const [x, d] of [[76, -1], [144, 1]]) { const X = (i) => x + i * d; poligono([[X(0), 156], [X(14), 158], [X(18), 161], [X(12), 163], [X(0), 164]], C.k); poligono([[X(1), 157], [X(13), 159], [X(16), 161], [X(1), 162]], EC.inoxM); pset(X(15), 159, C.k); rect(Math.min(X(14), X(17)), 158, Math.max(X(14), X(17)), 160, EC.inoxL); pset(X(18), 160, EC.oro); for (let i = 2; i < 12; i += 3) pset(X(i), 160, EC.inoxS); }
    // la azotea del rival, delante a la derecha: el pretil del fondo, el suelo, la cornisa que cae y el mástil
    for (let y = 140; y < 180; y++) for (let x = 190; x < 320; x++) { const q = h(x, y, 740); R.pset(x, y, y < 150 ? (y === 140 ? hex('#e8dcc8') : (x % 6 === 0 || y % 4 === 3) ? hex('#a8987e') : hex('#c8b89c')) : (y - 150) % 7 === 0 ? hex('#5a5048') : q < 0.1 ? hex('#8a8078') : hex('#726860')); }
    for (let y = 140; y < 180; y++) { R.pset(190, y, C.k); R.pset(191, y, hex('#e8dcc8')); } for (let y = 150; y < 180; y++) for (let x = 192; x < 196; x++) if (e_bay(x, y) < 0.5) R.pset(x, y, hex('#5a5048'));
    rect(206, 158, 226, 166, C.k); rect(207, 159, 225, 165, hex('#a83a2a')); rect(207, 159, 225, 159, hex('#c85a3a')); rect(213, 156, 219, 158, C.k);
    rect(240, 160, 248, 166, C.k); rect(241, 161, 247, 165, EC.inoxM); rect(241, 161, 247, 161, EC.inoxL); rect(242, 158, 246, 159, C.k);
    rect(296, 74, 297, 150, C.k); rect(296, 74, 296, 150, EC.inoxM); disco(296.5, 73, 1.5, C.oro);
  });
  // la corona y la aguja que sube como un periscopio
  const punta = e_corona(R, 110, 134, 0.95, ag, t, {});
  if (ag > 0 && ag < 1) for (let k = 0; k < 4; k++) { const a = t * 6 + k * 1.6; pset(Math.round(110 + Math.cos(a) * 6), Math.round(62 + Math.sin(a) * 2), C.blanco); }
  // la bandera del mástil del rival
  for (let i = 0; i < 14; i++) for (let j = 0; j < 8; j++) pset(297 - i - 1, 75 + j + Math.round(Math.sin(t * 6 + i * 0.6) * (i / 14) * 2), j < 4 && i < 6 ? ((i + j) % 2 ? C.blanco : C.azulBandera) : j % 2 ? C.blanco : C.rojoBandera);
  e_paloma(R, 270, 140, t, { picotea: true, dir: -1 });
  return { suelo: 166, pies: [196, 296], punta, corona: [110, 62], azotea: [190, 150, 320, 180] };
}

// Geometría: el Empire centrado en x 200 (fuste de 166 a 234, base en y 176), su cima (mástil) en y 8 con o.pisos = 1; el
// Chrysler a la izquierda (x 70, punta de la aguja en y 38); la viga de delante: ala de arriba en y 150 de x 0 a 150 (los
// obreros de la escena se sientan o se plantan ahí: suelo 150), con el pilar en x 2–12. Devuelve { suelo: 150, pies:
// [16, 140], cima: [200, y], obra: y del esqueleto, chrysler: [70, 38] }.
const e_EMPIRE = [[140, 176, 146, 254], [92, 140, 162, 238], [56, 92, 172, 228], [44, 56, 180, 220], [36, 44, 187, 213], [28, 36, 192, 208]];

function e_empire(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, p = e_cl(o.pisos ?? 0.6), ina = e_cl(o.inauguracion ?? 0);
  e_cielo(R, t, { hor: 176, cols: EC.dia, sol: [250, 70, 8], aves: 3, sem: 23, yN: 22, yAves: 60 });
  e_capa(R, 'empire0', () => { e_skyline(R, 180, EC.lejos, { alto: [30, 80], sem: 51, ancho: [10, 22] });
    e_fusteChrysler(R, 56, 84, 80, 180, { paso: 3 }); e_fusteChrysler(R, 50, 90, 120, 180, { paso: 3 });
    e_corona(R, 70, 81, 0.4, 1, 0, {}); e_skyline(R, 180, EC.medio, { alto: [16, 50], sem: 52, ancho: [12, 26], x0: -4, x1: 140 }); e_skyline(R, 180, EC.medio, { alto: [10, 30], sem: 53, ancho: [12, 26], x0: 140, x1: 324 }); });
  // el edificio: revestido abajo, esqueleto arriba; con o.pisos = 1, la corona y el mástil
  const yF = Math.round(176 - p * 148), yC = Math.min(176, yF + Math.round(20 * e_cl((1 - p) / 0.12))), ancho = (y) => { for (const [a, b, x0, x1] of e_EMPIRE) if (y >= a && y < b) return [x0, x1]; return null; };
  for (let y = Math.max(28, yF); y < 176; y++) { const w = ancho(y); if (!w) continue; const [x0, x1] = w, xc = x0 + (x1 - x0) * 0.68;
    for (let x = x0; x <= x1; x++) { const lado = x > xc; let c;
      if (y >= yC) { const m = (x - x0) % 4; c = m === 0 ? (lado ? hex('#a8a090') : hex('#e8e0cc')) : m === 3 ? (lado ? hex('#8e8678') : hex('#ccc4b0')) : (y % 4 === 0 ? (lado ? hex('#5a6070') : hex('#a8b0bc')) : lado ? hex('#2a3044') : EC.vidrioM);
        if (m === 0 && !lado && (y + x) % 7 === 0) c = C.blanco; if (x === x0) c = hex('#f4eedc'); }
      else { const m = (x - x0) % 6, f = (y - yF) % 5; c = m === 0 || m === 1 ? (m === 0 ? EC.hierroL : EC.hierro) : f === 0 ? EC.hierro : 0; }
      if (c) B[y * 320 + x] = c; }
    const wp = ancho(y - 1); if (y >= yC && (!wp || wp[0] !== x0)) { rect(x0 - 1, y, x1 + 1, y, C.calizaL); } }
  if (yF <= 28) { rect(195, 18, 205, 28, C.k); rect(196, 19, 204, 28, hex('#d8d0bc')); for (let x = 197; x < 204; x += 2) rect(x, 20, x, 27, EC.vidrioM);
    poligono([[196, 18], [200, 4], [204, 18]], C.k); poligono([[197, 18], [200, 6], [200, 18]], EC.inoxL); poligono([[200, 6], [203, 18], [200, 18]], EC.inoxS); rect(199, 8, 200, 8, EC.inoxM); pset(200, 3, C.k); }
  else { // las grúas y los obreros pequeños sentados en las vigas de arriba, y chispas
    const w = ancho(yF) ?? [176, 224]; e_viga(R, w[0], w[1], yF, EC.hierro, EC.hierroS, EC.hierroL);
    e_grua(R, w[0] + 8, yF - 2, t, { largo: 22, alto: 14, baja: 10, fase: 0, carga: true }); e_grua(R, w[1] - 8, yF - 2, t, { largo: 20, alto: 12, baja: 12, fase: 2 });
    for (let k = 0; k < 3; k++) { const x = w[0] + 16 + k * 10; if (x > w[1] - 14) continue; e_gente(R, x, yF - 2, t, k + 1, { sentado: true, ropa: [hex('#3e5a8a'), hex('#2c4468'), hex('#3e5a8a')], som: k % 2 ? hex('#5a4030') : hex('#3a3a46') }); }
    e_chispas(R, t, w[0] + 4, yF + 8, 7); e_chispas(R, t, w[1] - 6, yF + 14, 8, 0.7); e_remache(R, t, w[0] + 12, yF + 10, w[1] - 12, yF + 10, 2.6); }
  // la inauguración: banderas en el mástil y en los escalones, guirnaldas y papelitos
  if (ina > 0) { for (const [fx, fy, d] of [[200, 6, 1], [172, 56, -1], [228, 56, 1], [162, 92, -1], [238, 92, 1]]) { rect(fx, fy - 8, fx, fy, C.k); for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++) pset(fx + d * (i + 1), fy - 8 + j + Math.round(Math.sin(t * 7 - i * 0.7) * (i / 8) * 1.5), j < 2 && i < 3 ? C.azulBandera : j % 2 ? C.blanco : C.rojoBandera); }
    for (let k = 0; k < 60 * ina; k++) { const x = Math.round((h(k, 1, 750) * 360 + Math.sin(t * 2 + k) * 8) % 340) - 10, y = Math.round((h(k, 2, 750) * 200 + t * (14 + (k % 5) * 3)) % 200) - 10; if (x > 270 && y < 48) continue; pset(x, y, [C.blanco, hex('#f0e8c0'), hex('#e8c8d8')][k % 3]); if (Math.sin(t * 8 + k) > 0) pset(x + 1, y, hex('#d8d0b0')); } }
  // un biplano que da vueltas por la ciudad
  { const c = t % 18, u = c / 9; if (u < 1) { const x = Math.round(-20 + u * 300), y = Math.round(92 + Math.sin(u * 6) * 4); rect(x - 6, y, x + 5, y + 1, hex('#c8a040')); rect(x - 3, y - 2, x + 2, y - 2, hex('#e8c060')); rect(x - 3, y + 3, x + 2, y + 3, hex('#a88030')); pset(x + 6, y, C.k); pset(x + 6, y + (Math.floor(t * 20) % 2 ? -1 : 2), hex('#5a5a66')); rect(x - 7, y - 2, x - 6, y - 1, hex('#c8a040')); } }
  // la viga de delante, con su pilar a la izquierda y la ciudad que se ve muy abajo
  rect(2, 0, 12, 180, C.k); rect(3, 0, 4, 180, EC.minioL); rect(5, 0, 9, 180, EC.minio); rect(10, 0, 11, 180, EC.minioS); for (let y = 4; y < 180; y += 6) { pset(4, y, EC.minioS); pset(10, y, EC.minioS); }
  rect(0, 149, 152, 162, C.k); rect(0, 150, 151, 151, EC.minioL); rect(0, 152, 151, 152, EC.minio); rect(0, 153, 151, 159, EC.minio); rect(0, 156, 151, 156, EC.minioS); rect(0, 160, 151, 161, EC.minioS);
  for (let x = 6; x < 150; x += 7) { pset(x, 154, EC.minioS); pset(x, 158, EC.minioS); pset(x - 1, 153, EC.minioL); }
  rect(150, 148, 153, 163, C.k); rect(12, 140, 14, 170, C.k);
  return { suelo: 150, pies: [16, 140], cima: [200, yF <= 28 ? 4 : yF], obra: yF, chrysler: [70, 38] };
}

// Geometría: el suelo de y 130 a 180 (los pies, 160–176); la mesa destapada de x 112 a 160 (tablero en y 146, patas hasta
// y 162) con la silla a la derecha (x 164–176); ventanales (x 22–96, 120–200, 224–276; y 34–112) con la ciudad abajo;
// columnas en x 104–112 y 208–216; la fuente de agua en (296, 128); el reloj en (298, 74). Devuelve { suelo: 168, pies:
// [8, 300], mesa: [112, 146, 160], silla: [164, 176, 160], ventanas: [[x0, y0, x1, y1], …] }.
function e_oficinas(R, t, o) {
  const { rect, pset, linea, disco } = R;
  e_cielo(R, t, { hor: 96, cols: EC.dia, aves: 3, sem: 29, yN: 36, yAves: 44 });
  e_capa(R, 'oficinas', () => e_oficinasFijo(R));
  // vida: la paloma en la cornisa de fuera (recortada a la ventana), el polvo en los haces, el reloj, la fuente que burbujea
  R.recorte([120, 34, 200, 112]); e_paloma(R, 150 + Math.round(Math.sin(t * 0.4) * 10), 110, t, { picotea: true, dir: Math.cos(t * 0.4) > 0 ? 1 : -1 }); R.recorte(null);
  for (let k = 0; k < 24; k++) { const x = Math.round(20 + h(k, 1, 760) * 280 + Math.sin(t * 0.3 + k) * 5), y = Math.round(40 + ((h(k, 2, 760) * 130 + t * (1.5 + (k % 3))) % 130)); if (e_luzOficina(x, y)) pset(x, y, hex('#fff6dc')); }
  { const cx = 298, cy = 74, am = -Math.PI / 2 + (t / 60) * Math.PI * 2, ah = -Math.PI / 2 + 3.1 + t / 720 * Math.PI * 2; linea(cx, cy, Math.round(cx + Math.cos(am) * 6), Math.round(cy + Math.sin(am) * 6), C.k); linea(cx, cy, Math.round(cx + Math.cos(ah) * 4), Math.round(cy + Math.sin(ah) * 4), C.k); pset(cx, cy, C.rojo); }
  { const c = t % 5; if (c < 0.8) { const y = Math.round(118 - c * 10); pset(296, y, C.blanco); pset(297, y - 1, hex('#c8e4f4')); } }
  // el ventilador del techo que gira despacio, la hoja de papel que arrastra la corriente por el suelo y el cordón de la persiana
  { const a0 = t * 4; for (let k = 0; k < 3; k++) { const b = a0 + k * 2.094, x1 = Math.round(250 + Math.cos(b) * 11), y1 = Math.round(10 + Math.sin(b) * 2.5); linea(250, 10, x1, y1, hex('#5a4a3a')); pset(x1, y1, hex('#3a2e24')); } rect(249, 0, 250, 9, C.k); disco(250, 10, 1.5, C.oroS); }
  { const c = t % 9, u = c / 5; if (u < 1) { const x = Math.round(20 + u * 260), y = Math.round(172 - Math.abs(Math.sin(u * 9)) * 6), f = Math.floor(t * 6) % 2; rect(x, y - (f ? 1 : 0), x + 4, y, C.blanco); pset(x + (f ? 4 : 0), y - 2 + f, hex('#d8d0c0')); } }
  { const sw = Math.round(Math.sin(t * 1.7) * 1.5); linea(90, 64, 90 + sw, 76, C.k); disco(90 + sw, 77, 1, hex('#c8b890')); }
  // una lámpara que parpadea, la única encendida
  { const on = Math.sin(t * 3.1) > -0.7 || Math.sin(t * 17) > 0.5, lx = 186; disco(lx, 22, 3, on ? EC.calido : hex('#c8c0a8')); if (on) disco(lx, 22, 6, (x, y) => (e_bay(x, y) < 0.3 ? e_mez(R.pget(x, y), EC.calido, 0.5) : R.pget(x, y))); disco(lx, 22, 3, on ? EC.calido : hex('#c8c0a8')); pset(lx - 1, 21, C.blanco); }
  return { suelo: 168, pies: [8, 300], mesa: [112, 146, 160], silla: [164, 176, 160], ventanas: [[22, 34, 96, 112], [120, 34, 200, 112], [224, 34, 276, 112]] };
}
// ¿cae ahí la luz de los ventanales? (paralelogramos en el suelo y en el aire)
const e_luzOficina = (x, y) => { if (y < 112) return false; const d = x - (y - 112) * 0.7; return (d > 22 && d < 96) || (d > 120 && d < 200) || (d > 224 && d < 276); };

// la parte fija de la oficina vacía (capa): techo con lámparas, pared de yeso con zócalo de madera, los ventanales con la
// ciudad abajo (el cielo de arriba queda transparente), persianas, columnas, el suelo de baldosas con polvo y la luz, las
// mesas tapadas con sábanas y las sillas patas arriba, la mesa destapada, el perchero, la fuente, el reloj y telarañas
function e_oficinasFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  const pared = hex('#d8ccb0'), paredS = hex('#bcae90'), paredL = hex('#e8dec6');
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 761); B[y * 320 + x] = y < 18 ? (y % 6 === 0 ? hex('#c8bea8') : hex('#e4dccc')) : y < 22 ? (y === 21 ? paredS : paredL) : y >= 114 ? (y === 114 ? hex('#5a3a22') : (x % 24 === 0 ? hex('#5a3a22') : y < 118 ? hex('#8a5a34') : q < 0.2 ? hex('#6a4428') : hex('#7a4e2e'))) : q < 0.12 ? paredS : q > 0.94 ? paredL : pared; }
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) if (x % 40 === 0) B[y * 320 + x] = hex('#b8ae98');
  // los ventanales: marco de metal, montantes, la ciudad de abajo, persianas
  for (const [x0, x1] of [[22, 96], [120, 200], [224, 276]]) {
    for (let y = 34; y <= 112; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = 0;
    // la ciudad, muy abajo: el horizonte en y 96 con el río, azoteas y el Chrysler en el ventanal del centro
    R.recorte([x0, 34, x1, 112]);
    for (let y = 96; y <= 112; y++) for (let x = x0; x <= x1; x++) { const q = h(x >> 1, y, 762 + x0); R.pset(x, y, y < 98 ? hex('#a8c0d0') : (x + y * 3) % 9 === 0 ? hex('#7a86a0') : q < 0.4 ? hex('#8a96ae') : q < 0.6 ? hex('#a8b0c0') : hex('#9aa4b8')); }
    if (x0 === 120) { e_fusteChrysler(R, 152, 166, 70, 112, { paso: 3 }); e_corona(R, 159, 71, 0.2, 1, 0, {}); }
    for (let k = 0; k < 8; k++) { const bx = x0 + 4 + k * 9, bh = 4 + Math.round(h(k, x0, 763) * 10); rect(bx, 100 - bh, bx + 6, 112, hex('#8a92a8')); rect(bx + 5, 100 - bh, bx + 6, 112, hex('#727a92')); for (let y = 100 - bh + 2; y < 112; y += 3) for (let i = bx + 1; i < bx + 5; i += 2) pset(i, y, hex('#a8b4c8')); }
    R.recorte(null);
    rect(x0 - 3, 31, x1 + 3, 33, hex('#6a6e7a')); rect(x0 - 3, 113, x1 + 3, 116, hex('#8a8e9a')); rect(x0 - 3, 113, x1 + 3, 113, hex('#b8bcc8')); rect(x0 - 3, 31, x0 - 1, 116, hex('#6a6e7a')); rect(x1 + 1, 31, x1 + 3, 116, hex('#5a5e6a'));
    for (let x = x0 + 18; x < x1; x += 19) rect(x, 34, x + 1, 112, hex('#5a5e6a')); rect(x0, 72, x1, 73, hex('#5a5e6a'));
  }
  // la persiana bajada a medias en el ventanal de la izquierda (con sus lamas) y el cordón
  for (let y = 34; y < 64; y++) for (let x = 22; x <= 96; x++) B[y * 320 + x] = y % 3 === 2 ? hex('#b8ae96') : hex('#e4dcc8'); rect(22, 64, 96, 65, hex('#8a826e')); rect(90, 34, 90, 63, C.k);
  // las columnas con capitel de líneas art déco
  for (const cx of [104, 208]) { rect(cx, 18, cx + 8, 130, C.k); rect(cx + 1, 18, cx + 7, 130, pared); rect(cx + 1, 18, cx + 2, 130, paredL); rect(cx + 6, 18, cx + 7, 130, paredS); for (const y of [22, 25, 28]) rect(cx - 1, y, cx + 9, y, hex('#a8987a')); rect(cx, 114, cx + 8, 130, hex('#6a4428')); }
  // el suelo de baldosas en perspectiva, con polvo y la luz que entra por los ventanales
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 96), tx = Math.floor(u * 8 + 100), ty = Math.floor(400 / (y - 96)), c0 = (tx + ty) % 2 ? hex('#8a7e6a') : hex('#a89a80');
    let c = Math.abs(u * 8 + 100 - tx - 0.5) > 0.47 ? hex('#6a604e') : c0; if (h(x, y, 764) < 0.06) c = hex('#c8bea8'); if (e_luzOficina(x, y)) c = e_mez(c, hex('#fff0c8'), 0.3); B[y * 320 + x] = c; }
  // las mesas tapadas con sábanas y las sillas patas arriba encima (al fondo y delante)
  const tapada = (x0, x1, yb, alto) => { const yt = yb - alto; rect(x0 - 1, yt - 1, x1 + 1, yb, C.k); for (let y = yt; y < yb; y++) for (let x = x0; x <= x1; x++) pset(x, y, y < yt + 3 ? hex('#f2eee4') : (x - x0 + (y > yb - 3 ? 1 : 0)) % 5 === 0 ? hex('#c8c2b4') : x - x0 < 3 ? hex('#ffffff') : hex('#e4ded0')); for (let x = x0; x <= x1; x += 4) pset(x, yb, C.k);
    const sx = x0 + ((x1 - x0) >> 1) - 4; rect(sx, yt - 4, sx + 8, yt - 2, C.k); rect(sx + 1, yt - 3, sx + 7, yt - 3, EC.tablaS); for (const lx of [sx + 1, sx + 7]) rect(lx, yt - 10, lx, yt - 4, EC.tablaD); rect(sx + 1, yt - 10, sx + 7, yt - 10, EC.tablaD); };
  tapada(30, 62, 140, 9); tapada(232, 266, 140, 9); tapada(70, 96, 137, 8); tapada(10, 50, 170, 13); tapada(244, 292, 172, 13);
  // la mesa destapada: tablero de nogal, cajonera, la máquina de escribir, el teléfono, la lámpara y un montón de papeles
  rect(110, 145, 162, 149, C.k); rect(111, 146, 161, 147, hex('#8a5a34')); rect(111, 146, 161, 146, hex('#a87444')); rect(112, 149, 116, 162, C.k); rect(140, 149, 160, 162, C.k); rect(141, 150, 159, 161, hex('#6a4428')); for (const y of [154, 158]) { rect(141, y, 159, y, hex('#4a2e1a')); pset(150, y - 2, C.oro); }
  rect(118, 139, 134, 145, C.k); rect(119, 140, 133, 144, hex('#2a2a36')); for (let x = 120; x < 133; x += 2) pset(x, 142, hex('#c8c8d0')); rect(121, 136, 131, 139, C.k); rect(122, 137, 130, 137, C.blanco);
  rect(140, 141, 146, 145, C.k); rect(141, 142, 145, 144, hex('#2a2a36')); rect(139, 139, 147, 140, C.k);
  rect(154, 132, 155, 145, C.k); poligono([[150, 134], [154, 128], [160, 134]], hex('#2a6a4a')); rect(151, 144, 158, 145, C.k);
  for (let i = 0; i < 4; i++) rect(148 - i, 144 - i, 152 - i, 144 - i, i % 2 ? C.blanco : hex('#e8e0d0'));
  // la silla vacía de la mesa (de madera curvada)
  rect(164, 150, 176, 152, C.k); rect(165, 150, 175, 151, hex('#8a5a34')); rect(174, 136, 176, 152, C.k); rect(175, 137, 175, 150, hex('#a87444')); for (const lx of [165, 175]) rect(lx, 152, lx, 162, C.k);
  // el perchero vacío, la fuente de agua con su garrafa, el reloj de pared y una papelera
  rect(276, 92, 277, 150, C.k); for (const d of [-1, 1]) linea(277, 94, 277 + d * 4, 98, C.k); rect(272, 150, 282, 151, C.k);
  rect(290, 130, 302, 152, C.k); rect(291, 131, 301, 151, hex('#c8ccd4')); rect(291, 131, 292, 151, C.blanco); disco(296, 120, 6, C.k); disco(296, 120, 5, hex('#a8d8f0')); pset(293, 117, C.blanco); rect(294, 126, 298, 130, C.k);
  disco(298, 74, 8, C.k); disco(298, 74, 7, hex('#f2eee2')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(298 + Math.cos(a) * 5.5), Math.round(74 + Math.sin(a) * 5.5), C.k); }
  rect(98, 160, 104, 168, C.k); rect(99, 161, 103, 168, hex('#7a7a86'));
  // las telarañas de las esquinas y las lámparas apagadas que cuelgan
  for (let k = 0; k < 5; k++) { linea(0, 18 + k * 4, k * 5, 18, hex('#f8f8f8')); } for (let r = 4; r < 20; r += 5) for (let a = 0; a < 1.57; a += 0.12) pset(Math.round(Math.cos(a) * r), Math.round(18 + Math.sin(a) * r), hex('#e8e8e8'));
  // (ninguna en x 20–170: el techo de detrás de la barra del año queda tranquilo)
  for (const lx of [186, 250]) { rect(lx, 0, lx, 18, C.k); disco(lx, 22, 4, C.k); disco(lx, 22, 3, hex('#c8c0a8')); pset(lx - 1, 21, C.blanco); }
}
// los colores propios de la ciudad de hoy
const f_hoyK = pal({
  ventana: '#4a5868', ventanaL: '#8aa8c0', luz1: '#ffe6a0', luz2: '#f8c870', luz3: '#fff4d8', luz4: '#b8d4f0', tele: '#7aa8f0',
  aguaT: '#6a4a6a', aguaTS: '#3a2a4a', aguaN: '#1e2448', aguaNS: '#121630', aguaS: '#1e4a68', brillo: '#e8f4f8', brilloT: '#ffd890', brilloN: '#f8e0a0',
  piedra: '#d4cab4', piedraS: '#a89e8a', piedraL: '#ece4d2', bruma: '#a8bccc', brumaS: '#8ea4b8', brumaL: '#c0d0dc',
  puente: '#b4a68e', puenteS: '#8a7c66', puenteL: '#d4c8b0', cable: '#3e4250',
  tabla: '#9a7a58', tablaS: '#7a5e42', tablaL: '#b8966c', tablaD: '#4e3a28', hierro: '#2a3038', hierroL: '#5a6470',
  ferry: '#e8783a', ferryS: '#b8562a', ferryL: '#f8a060', crema: '#f0e8d4', cremaS: '#c8bca4',
  taxi: '#f0c020', taxiS: '#b88a10', taxiL: '#fff080', verdeMetro: '#2a6a4a', verdeMetroL: '#5aaa7a', farolaL: '#ffe8a0',
  cesped: '#5a9a3a', cespedS: '#3e7a2a', cespedL: '#86c058', granito: '#b8b4ac', granitoS: '#94908a', granitoL: '#d4d0c8',
  marmol: '#ece8e0', marmolS: '#c8c2b6', vidrioU: '#5a9a96', vidrioUS: '#2e6a6a', vidrioUL: '#a8dcd4',
  acero: '#7c8a9a', aceroS: '#56626e', aceroL: '#aab6c2', fantasma: '#a8f0d0', fantasmaS: '#5ab890',
});

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const f_hoyBAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const f_hoyU = (x, y) => f_hoyBAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function f_hoyMezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la luz de la hora sobre un color de día: la tarde lo calienta; el anochecer lo apaga hacia el azul
const f_hoyLUCES = { tarde: new Map(), anochecer: new Map() };

function f_hoyCol(c, luz) {
  if (luz !== 'tarde' && luz !== 'anochecer') return c;
  const m = f_hoyLUCES[luz]; let v = m.get(c); if (v !== undefined) return v;
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, cl = (n) => Math.max(0, Math.min(255, Math.round(n)));
  v = luz === 'tarde' ? (0xff000000 | (cl(b * 0.7 + 22) << 16) | (cl(g * 0.76 + 16) << 8) | cl(r * 0.86 + 36)) >>> 0
    : (0xff000000 | (cl(b * 0.52 + 46) << 16) | (cl(g * 0.36 + 20) << 8) | cl(r * 0.36 + 20)) >>> 0;
  m.set(c, v); return v;
}

// la capa fija de un decorado: se pinta una vez en un búfer de R.nuevo() (con el hueco VACIO donde no hay nada) y se
// guarda con lo que devuelva dibuja (las ventanas, por ejemplo); al pintarla se le aplica la luz de la hora
const f_hoyVACIO = 0x01020304, f_hoyCache = new Map();

function f_hoyCapa(R, clave, luz, dibuja) {
  let e = f_hoyCache.get(clave);
  if (!e) {
    const b = R.nuevo(); b.fill(f_hoyVACIO); const prev = R.usar(b); const extra = dibuja() ?? {}; R.usar(prev);
    if (luz === 'tarde' || luz === 'anochecer') for (let i = 0; i < b.length; i++) if (b[i] !== f_hoyVACIO) b[i] = f_hoyCol(b[i], luz);
    e = { b, ...extra }; f_hoyCache.set(clave, e);
  }
  return e;
}

// copia una capa fija sobre el lienzo entre las filas y0 e y1, saltando el hueco VACIO (una pasada)
function f_hoyPegar(R, b, y0 = 0, y1 = 180) { const B = R.buf; for (let i = y0 * 320, n = y1 * 320; i < n; i++) { const c = b[i]; if (c !== f_hoyVACIO) B[i] = c; } }

// las ventanas que se encienden: cada una [x, y, ancho, alto, umbral, tono]; se enciende cuando en pasa su umbral, y
// alguna parpadea con la luz azul de una tele
function f_hoyLuces(R, t, V, en) {
  if (!V || en <= 0) return;
  const cols = [f_hoyK.luz1, f_hoyK.luz2, f_hoyK.luz3, f_hoyK.luz1, f_hoyK.luz4, f_hoyK.luz2];
  for (const [x, y, w, hh, thr, k] of V) { if (en <= thr) continue; let c = cols[k % 6]; if (k % 17 === 0 && Math.sin(t * 7 + x) > 0.3) c = f_hoyK.tele; R.rect(x, y, x + w - 1, y + hh - 1, c); }
}

// cielos ricos (como los del 11): bandas con transición tramada, el sol con su halo, la estela de un avión, cirros lentos y
// cúmulos de tres tonos a distinta velocidad; al anochecer, estrellas que titilan arriba y la luna. o.hor; o.modo:
// 'dia' | 'tarde' | 'anochecer'; o.sol [x, y, r] (null: sin sol); o.luna [x, y, r]; o.estela [y en x = 0, pendiente] o null;
// o.nubesBaja: px que bajan los cúmulos (para que no pasen por la esquina de Atom)
const f_hoyCIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']],
  tarde: [[0, '#2a2a66'], [0.16, '#46408a'], [0.32, '#7a4a8a'], [0.47, '#b85a7a'], [0.6, '#dc6e64'], [0.72, '#f0925a'], [0.84, '#f8c070'], [0.95, '#fde4a4']],
  anochecer: [[0, '#0e1236'], [0.22, '#1a1e4e'], [0.42, '#2e2a62'], [0.6, '#563a74'], [0.75, '#8e4a76'], [0.87, '#c8646a'], [0.96, '#e8946a']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));
const f_hoyNUBES = Object.fromEntries(Object.entries({ dia: ['#a8d6f2', '#d2ecfc', '#ffffff'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], anochecer: ['#2a224e', '#4e3462', '#a85a72'] }).map(([k, v]) => [k, v.map(hex)]));

function f_hoyNube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

function f_hoyCielo(R, t, o = {}) {
  const { pset } = R, hor = o.hor ?? 100, modo = o.modo ?? 'dia', B = R.buf, P = f_hoyCIELOS[modo] ?? f_hoyCIELOS.dia, tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = f_hoyU(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48;
  if (modo === 'anochecer') {
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 601) * 319), y = Math.round(h(k, 2, 601) ** 1.6 * hor * 0.55); if (atom(x, y) || y < 0) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 601) * 2.2) + k * 1.7);
      if (tw > -0.4) B[y * 320 + x] = tw > 0.5 ? C.blanco : hex('#8a94c0'); }
    const [lx, ly, lr] = o.luna ?? [236, 30, 5];
    for (let y = ly - lr - 4; y <= ly + lr + 4; y++) for (let x = lx - lr - 4; x <= lx + lr + 4; x++) { if (y < 0 || y >= hor || x < 0 || x > 319) continue; const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
      if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? hex('#c8c0a8') : hex('#f4ecd0'); else if (d > lr && d < lr + 4 && f_hoyU(x, y) < (lr + 4 - d) / 8) B[y * 320 + x] = f_hoyMezcla(B[y * 320 + x], hex('#f4ecd0'), 0.25); }
  }
  const sol = o.sol;
  if (sol && modo !== 'anochecer') {
    const [sx, sy, sr] = sol, gl = modo === 'tarde' ? hex('#ffe6a0') : hex('#fff8dc'), R2 = sr + (modo === 'tarde' ? 22 : 10);
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
      const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (f_hoyU(x, y) < q * q) B[y * 320 + x] = f_hoyMezcla(B[y * 320 + x], gl, 0.42); }
    if (modo === 'tarde') f_hoySolDisco(R, sol, modo);
  }
  if (o.estela && modo !== 'anochecer') {
    const [e0, pe] = o.estela, u = ((t + 3) % 44) * 10 - 40, ax = Math.round(u), ay = Math.round(e0 + u * pe), ce = modo === 'tarde' ? hex('#ffd8b4') : hex('#f4f8fc'), ce2 = modo === 'tarde' ? hex('#f0a888') : hex('#cfe4f4');
    for (let i = 3; i < 190; i++) { const x = ax - i, y = Math.round(ay - i * pe + (i > 60 ? Math.sin(i * 0.15 + t * 0.2) * 0.8 : 0)); if (x < 0 || x > 319 || y < 16 || y >= hor - 1 || atom(x, y)) continue; const d = i < 40 ? 1 : i < 120 ? 0.95 - (i - 40) / 130 : 0.33 - (i - 120) / 240;
      if (f_hoyU(x, y) < d) B[y * 320 + x] = ce; if (i > 18 && f_hoyU(x, y + 1) < d * 0.75) B[(y + 1) * 320 + x] = ce2; }
    if (ax >= 0 && ax < 320 && ay >= 16 && !atom(ax, ay)) { R.rect(ax - 2, ay, ax + 1, ay, C.blanco); pset(ax - 1, ay - 1, C.grisL); if (Math.floor(t * 2.5) % 2) pset(ax + 1, ay, C.rojo); }
  }
  if (modo === 'anochecer' && o.avion !== false) { const u = ((t + 11) % 36) / 36, x = Math.round(-10 + u * 340), y = Math.round(hor * 0.22 + u * 8); if (!atom(x, y) && y > 15) { pset(x, y, Math.floor(t * 3) % 2 ? C.rojo : C.blanco); pset(x - 3, y, hex('#8a94c0')); } }
  const cn = f_hoyNUBES[modo] ?? f_hoyNUBES.dia;
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 602) * 46), x0 = ((h(k, 6, 602) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(18, Math.round(hor * (0.16 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 603) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(40, hor * 0.32) + k * hor * 0.12 : Math.max(36, hor * (0.45 + (k - 2) * 0.1))) + (o.nubesBaja ?? 0), x = ((h(k, 7, 602) * 470 + t * v) % 500) - 90;
    f_hoyNube(R, Math.round(x), y, w, k, cn); }
  if (sol && modo === 'dia') f_hoySolDisco(R, sol, modo);
}
// el disco del sol, con su borde y su brillo
function f_hoySolDisco(R, [sx, sy, sr], modo) { R.disco(sx, sy, sr + 1, modo === 'tarde' ? hex('#ffd890') : C.solL); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }

// el agua viva entre las filas y0 e y1 (y entre x0 y x1): refleja, ondulado, lo que hay encima (el cielo, las torres, las
// ventanas encendidas), con el color del agua más hondo hacia abajo, crestas claras y senos oscuros que corren y, si se da
// o.sol (x), el camino de destellos del sol o de la luna
function f_hoyAgua(R, t, y0, y1, luz, o = {}) {
  const B = R.buf, x0 = o.x0 ?? 0, x1 = o.x1 ?? 319, n = y1 - y0;
  const [c0, c1, cb] = luz === 'tarde' ? [f_hoyK.aguaT, f_hoyK.aguaTS, f_hoyK.brilloT] : luz === 'anochecer' ? [f_hoyK.aguaN, f_hoyK.aguaNS, f_hoyK.brilloN] : [C.bahia, f_hoyK.aguaS, f_hoyK.brillo];
  for (let y = y0; y < y1; y++) {
    const d = y - y0, u = d / n, sy = Math.max(0, y0 - 1 - Math.floor(d * (o.comp ?? 1.15))), a = (o.refl ?? 0.42) + u * 0.38, fondo = f_hoyMezcla(c0, c1, u * 0.8);
    const ox = Math.round(Math.sin(y * 0.9 + t * 2.4) * (0.6 + u * 2.2)), cresta = f_hoyMezcla(fondo, cb, 0.35), seno = f_hoyMezcla(fondo, C.k, 0.22), per = 19 + (y % 5) * 3, mov = Math.floor(t * (5 + u * 9) * (y % 2 ? 1 : -1));
    for (let x = x0; x <= x1; x++) {
      const xs = Math.min(319, Math.max(0, x + ox)); let c = f_hoyMezcla(B[sy * 320 + xs], fondo, a);
      const m = ((x + mov + y * 7) % per + per) % per;
      if (m < 2 + u * 3 && f_hoyU(x, y) < 0.55) c = cresta; else if (m > per - 3 && f_hoyU(x, y) < 0.4) c = seno;
      if (o.sol != null) { const ds = Math.abs(x - o.sol), an = 3 + d * 0.9; if (ds < an && h(x >> 1, y, Math.floor(t * 4 + (x >> 3))) < (luz === 'dia' ? 0.1 : 0.3) * (1 - ds / an)) c = f_hoyMezcla(c, cb, luz === 'dia' ? 0.5 : 0.85); }
      B[y * 320 + x] = c;
    }
  }
}

// una figura de fondo pequeña (unos 9 px): cabeza, cuerpo de color y piernas que andan; dir ±1; anda: si mueve las piernas
function f_hoyPersonita(R, x, suelo, t, sem, k, anda = true, alto = 9) {
  const piel = [hex('#e8b890'), hex('#c88a5a'), hex('#8a5a3a'), hex('#f0c8a0')][sem % 4], ropa = [hex('#c83a3a'), hex('#2a4fa8'), hex('#3a8a4a'), hex('#e8b830'), hex('#6a3a8a'), hex('#e87a9a'), hex('#4a4a5a')][sem % 7], pant = [hex('#2a3448'), hex('#3a3a46'), hex('#5a4a3a')][sem % 3];
  const p = anda ? Math.floor(t * 6 + sem) % 2 : 0, top = suelo - alto;
  R.rect(x - 1, top, x, top + 1, k(piel)); R.pset(x - 1, top - 1, k(hex('#2a1e1a'))); R.pset(x, top - 1, k(hex('#2a1e1a')));
  R.rect(x - 1, top + 2, x + 1, top + 5, k(ropa)); R.pset(x + 1, top + 2, k(f_hoyMezcla(ropa, C.k, 0.3)));
  R.rect(x - 1, top + 6, x - 1, suelo - (p ? 1 : 0), k(pant)); R.rect(x + 1, top + 6, x + 1, suelo - (p ? 0 : 1), k(pant));
}

// gaviotas que vuelan en círculos amplios (n), a la altura y, con aleteo
function f_hoyGaviotas(R, t, n, y, sem = 0) { for (let k = 0; k < n; k++) { const a = t * (0.32 + k * 0.05) + k * 2.1 + sem, x = Math.round(160 + Math.cos(a) * (90 + k * 26) + Math.sin(t * 0.1 + k) * 20), yy = Math.round(y + Math.sin(a) * 10 + k * 4); if (x > 272 && yy < 48) continue; R.gaviota(x, yy, t, k); } }

// el bajo Manhattan desde el muelle de Brooklyn: los edificios (x0, x1, techo, tipo, extra), del más alto al más bajo
const f_hoyMANHATTAN = [
  [186, 208, 24, 'aguja', {}], [122, 136, 46, 'piedra', { corona: 'gotico' }], [206, 220, 42, 'piedra', { corona: 'piramide' }], [244, 262, 56, 'cristal', {}],
  [164, 186, 52, 'cristal', { oscuro: 1 }], [220, 236, 54, 'cristal', { oscuro: 1 }], [136, 152, 58, 'cristal', {}], [96, 110, 60, 'piedra', { corona: 'piramide' }],
  [234, 246, 62, 'ladrillo', { tanque: 1 }], [260, 272, 66, 'piedra', {}], [150, 164, 66, 'piedra', { tanque: 1 }], [110, 124, 68, 'ladrillo', { tanque: 1 }],
  [268, 286, 76, 'cristal', {}], [70, 84, 72, 'piedra', {}], [84, 96, 76, 'cristal', {}], [284, 302, 84, 'ladrillo', { tanque: 1 }], [58, 70, 80, 'ladrillo', {}], [300, 320, 88, 'piedra', {}],
];
// un edificio del perfil entre x0 y x1, del techo top a la base: piedra caliza, ladrillo o cristal, con su lado de sombra,
// su rejilla de ventanas (que guarda en V para encenderlas), cornisas, y en el tejado depósito de agua, máquinas, antena o
// corona (pirámide de cobre, gótica); 'aguja' es la torre más alta, de cristal facetado que se estrecha, con su aguja
function f_hoyEdificio(R, x0, x1, top, tipo, V, sem, base = 98, ex = {}) {
  const { rect, pset, linea, poligono } = R, w = x1 - x0, B = R.buf;
  if (tipo === 'aguja') {
    // la torre facetada: se estrecha hacia arriba; la cara izquierda refleja el cielo, la derecha queda en sombra
    for (let y = top; y <= base; y++) { const u = (y - top) / (base - top), m = Math.round((1 - Math.min(1, u * 1.6)) * w * 0.22), a = x0 + m, b = x1 - m, mid = Math.round((a + b) / 2);
      for (let x = a; x <= b; x++) { const iz = x < mid, g = (y - top) / (base - top); let c = iz ? f_hoyMezcla(C.cristalL, C.cristal, g * 0.9) : f_hoyMezcla(C.cristal, C.cristalS, 0.4 + g * 0.5);
        if ((x - a) % 3 === 0) c = f_hoyMezcla(c, C.cristalS, 0.3); if ((y - top) % 3 === 0) c = f_hoyMezcla(c, C.k, 0.08); if (iz && ((x * 2 - y) % 37 + 37) % 37 < 3) c = f_hoyMezcla(c, C.blanco, 0.45);
        if (x === mid) c = f_hoyMezcla(C.cristalL, C.blanco, 0.4); B[y * 320 + x] = c;
        if ((y - top) % 3 === 1 && (x - a) % 3 === 1 && y > top + 4) V.push([x, y, 2, 1, h(x, y, 640) * 0.95, Math.floor(h(x, y, 641) * 6)]); } }
    const cx = Math.round((x0 + x1) / 2); rect(cx - 3, top - 3, cx + 3, top, C.aceroS); rect(cx - 2, top - 3, cx + 2, top - 3, C.aceroL);
    linea(cx, top - 4, cx, top - 18, C.aceroL); linea(cx + 1, top - 4, cx + 1, top - 12, C.aceroS); pset(cx, top - 19, C.rojo);
    return;
  }
  const P = tipo === 'ladrillo' ? [C.ladrillo, C.ladrilloS, C.ladrilloL] : tipo === 'cristal' ? (ex.oscuro ? [hex('#4a6a84'), hex('#2e4458'), hex('#7a9ab4')] : [C.cristal, C.cristalS, C.cristalL]) : [f_hoyK.piedra, f_hoyK.piedraS, f_hoyK.piedraL];
  const sombra = x1 - Math.max(2, Math.round(w * 0.28));
  for (let y = top; y <= base; y++) { const g = (y - top) / Math.max(1, base - top);
    for (let x = x0; x <= x1; x++) { const fx = x - x0, fy = y - top; let c;
      if (tipo === 'cristal') { c = f_hoyMezcla(P[2], P[0], Math.min(1, g * 1.6)); if (x >= sombra) c = f_hoyMezcla(c, P[1], 0.6); if (fx % 3 === 0) c = f_hoyMezcla(c, P[1], 0.45); if (fy % 3 === 0) c = f_hoyMezcla(c, P[1], 0.2);
        if (x < sombra && ((x * 2 + y) % 41) < 3) c = f_hoyMezcla(c, C.blanco, 0.4);
        if (fx % 3 === 1 && fy % 3 === 1) V.push([x, y, 2, 1, h(x, y, 642), Math.floor(h(x, y, 643) * 6)]); }
      else { c = x >= sombra ? P[1] : P[0]; if (tipo === 'ladrillo' && h(x, y, 644 + sem) < 0.12) c = f_hoyMezcla(c, C.k, 0.12);
        if (fy > 2 && (fy - 3) % 4 < 2 && fx % 2 === 1 && fx < w) { c = (fy - 3) % 4 === 0 && h(x, y, 645) < 0.45 ? f_hoyK.ventanaL : f_hoyK.ventana; if (x >= sombra) c = f_hoyMezcla(c, C.k, 0.2); if ((fy - 3) % 4 === 0) V.push([x, y, 1, 2, h(x, y, 646), Math.floor(h(x, y, 647) * 6)]); }
        if (fy > 0 && fy % 16 === 0) c = x >= sombra ? P[1] : P[2]; }
      if (x === x0) c = f_hoyMezcla(c, C.blanco, 0.25); if (x === x1) c = f_hoyMezcla(c, C.k, 0.3);
      B[y * 320 + x] = c; } }
  rect(x0, top, x1, top, f_hoyMezcla(P[2], C.blanco, 0.2)); rect(x0 - (tipo === 'cristal' ? 0 : 1), top + 1, x1 + (tipo === 'cristal' ? 0 : 1), top + 1, f_hoyMezcla(P[1], C.k, 0.2));
  // lo del tejado: máquinas, antena, depósito de agua de madera sobre sus patas
  rect(x0 + 2, top - 2, x0 + 5, top - 1, C.grisS); pset(x0 + 3, top - 2, C.grisL);
  if (h(sem, 1, 648) < 0.5) { linea(x1 - 3, top - 1, x1 - 3, top - 7, C.grisS); pset(x1 - 3, top - 8, C.rojo); }
  if (ex.tanque) { const tx = Math.round(x0 + w * 0.45); rect(tx - 1, top - 3, tx - 1, top - 1, C.maderaD); rect(tx + 4, top - 3, tx + 4, top - 1, C.maderaD); rect(tx - 2, top - 9, tx + 5, top - 4, C.maderaS); rect(tx - 2, top - 9, tx + 1, top - 4, C.madera); rect(tx - 2, top - 7, tx + 5, top - 7, C.maderaD); poligono([[tx - 3, top - 9], [tx + 1, top - 13], [tx + 6, top - 9]], C.grisS); pset(tx + 1, top - 12, C.grisL); }
  if (ex.corona === 'piramide') { const cx = (x0 + x1) / 2; for (let j = 0; j < Math.round(w * 0.7); j++) { const a = Math.round(x0 + 1 + j * 0.7), b = Math.round(x1 - 1 - j * 0.7); if (a > b) break; rect(a, top - 1 - j, b, top - 1 - j, j % 3 === 0 ? C.cobreS : C.cobre); pset(b, top - 1 - j, C.cobreS); pset(a, top - 1 - j, hex('#8ad0c0')); }
    linea(Math.round(cx), top - Math.round(w * 0.5), Math.round(cx), top - Math.round(w * 0.5) - 8, C.grisL); }
  if (ex.corona === 'gotico') { const cx = Math.round((x0 + x1) / 2); rect(x0 + 2, top - 6, x1 - 2, top - 1, f_hoyK.piedra); rect(x1 - 4, top - 6, x1 - 2, top - 1, f_hoyK.piedraS); for (const px of [x0 + 2, x1 - 2]) { rect(px, top - 9, px, top - 6, f_hoyK.piedraL); }
    for (let j = 0; j < 12; j++) { const a = cx - Math.round(4 - j / 3), b = cx + Math.round(4 - j / 3); rect(a, top - 7 - j, b, top - 7 - j, j % 2 ? C.cobre : C.cobreS); } linea(cx, top - 19, cx, top - 24, C.grisL);
    for (let y = top - 5; y < top - 1; y += 2) for (let x = x0 + 3; x < x1 - 3; x += 2) pset(x, y, f_hoyK.ventana); }
}

// el fondo fijo del muelle: el Midtown lejano entre la bruma (con la torre de los escalones y su mástil), el perfil del bajo
// Manhattan, la orilla con el muro de piedra, los árboles, los cobertizos de los muelles y la autovía; y delante el
// puente de piedra con sus dos torres de arcos ojivales, sus cables, las péndolas y los tirantes en abanico
function f_hoyMuelleFondo(R) {
  const { rect, pset, linea, poligono, disco } = R, V = [];
  // la bruma de Midtown: siluetas lejanas con filas de ventanas apenas marcadas
  for (let x = 40, k = 0; x < 320; k++) { const w = 6 + Math.floor(h(k, 1, 650) * 10), top = 66 + Math.floor(h(k, 2, 650) * 20); rect(x, top, x + w, 98, f_hoyK.bruma); rect(x + w - 2, top, x + w, 98, f_hoyK.brumaS); rect(x, top, x + w, top, f_hoyK.brumaL);
    for (let y = top + 3; y < 98; y += 3) for (let i = x + 1; i < x + w - 1; i += 2) if (h(i, y, 651) < 0.5) { pset(i, y, f_hoyK.brumaS); if (h(i, y, 652) < 0.4) V.push([i, y, 1, 1, h(i, y, 653), 2]); } x += w + 1; }
  // la torre de los escalones a lo lejos, con su mástil
  { const cx = 78, c = f_hoyK.brumaS, l = f_hoyK.brumaL; for (const [w, y0] of [[10, 52], [7, 44], [5, 38], [3, 33]]) { rect(cx - w, y0, cx + w, 98, c); rect(cx - w, y0, cx - w + 1, 98, l); }
    linea(cx, 32, cx, 22, c); pset(cx, 21, C.rojo); for (let y = 54; y < 98; y += 3) for (let x = cx - 9; x < cx + 10; x += 2) if (h(x, y, 654) < 0.5) V.push([x, y, 1, 1, h(x, y, 655), 0]); }
  // el bajo Manhattan
  f_hoyMANHATTAN.forEach(([x0, x1, top, tipo, ex], k) => f_hoyEdificio(R, x0, x1, top, tipo, V, k, 98, ex));
  // la orilla: árboles del parque, cobertizos de los muelles, la autovía elevada y el muro de piedra
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 3, 656) * 320), r = 2 + Math.floor(h(k, 4, 656) * 3); disco(x, 96 - r + 2, r, C.hierbaS); disco(x - 1, 95 - r + 2, Math.max(1, r - 1), C.hierba); pset(x - 1, 94 - r + 2, C.hierbaL); }
  for (const [a, b] of [[124, 160], [214, 248]]) { rect(a, 92, b, 99, hex('#c8b89a')); rect(a, 92, b, 92, hex('#e0d4bc')); for (let x = a + 3; x < b; x += 5) rect(x, 94, x + 2, 98, hex('#5a5048')); rect(a - 1, 91, b + 1, 91, hex('#8a6a4a')); }
  rect(0, 97, 319, 99, hex('#6a6a74')); rect(0, 97, 319, 97, hex('#9a9aa4')); for (let x = 0; x < 320; x += 6) rect(x, 99, x + 1, 100, hex('#4a4a54'));
  rect(0, 100, 319, 103, f_hoyK.piedraS); for (let x = 0; x < 320; x += 4) pset(x + ((x >> 2) % 2) * 2, 101, f_hoyMezcla(f_hoyK.piedraS, C.k, 0.25)); rect(0, 103, 319, 103, f_hoyMezcla(f_hoyK.piedraS, C.k, 0.35));
  // el puente de piedra: la torre lejana, la cercana, la calzada y los cables
  const torre = (x0, x1, top, base, aw, arcoTop, arcoBase) => { const w = x1 - x0, P = f_hoyK, m = Math.round((x0 + x1) / 2), g = Math.max(2, Math.round(w * 0.1)), arcos = [x0 + g, m + Math.round(g / 2)];
    // los dos arcos ojivales quedan huecos: se ve lo de detrás
    const hueco = (x, y) => y >= arcoTop && y <= arcoBase && arcos.some((ax) => { const u = (y - arcoTop) / (aw * 0.9), half = u < 1 ? aw / 2 * Math.sqrt(Math.max(0, 1 - (1 - u) * (1 - u))) : aw / 2; return Math.abs(x - (ax + aw / 2 - 0.5)) < half; });
    for (let y = top; y <= base; y++) for (let x = x0; x <= x1; x++) { if (hueco(x, y)) continue; const fx = x - x0; let c = fx > w * 0.72 ? P.puenteS : P.puente; if ((y - top) % 4 === 0 || (fx + ((y - top) >> 2) * 3) % 7 === 0) c = f_hoyMezcla(c, C.k, 0.14); if (h(x, y, 657) < 0.06) c = P.puenteL;
      if (hueco(x - 1, y) || hueco(x, y - 1)) c = P.puenteS; else if (hueco(x + 1, y)) c = P.puenteL; pset(x, y, c); }
    rect(x0 - 1, top, x1 + 1, top + 2, P.puenteL); rect(x0 - 1, top + 3, x1 + 1, top + 3, P.puenteS); rect(x0, arcoBase + 1, x1, arcoBase + 2, P.puenteS); };
  torre(98, 108, 62, 98, 3, 68, 84);
  // los cables principales y los de la orilla, las péndolas y los tirantes
  const cab = (xa, ya, xb, yb, sag) => { const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([xa + (xb - xa) * u, ya + (yb - ya) * u + sag * 4 * u * (1 - u)]); } return pts; };
  const deck = (x) => Math.round(x < 98 ? 88 + (x / 98) * 3 : 91 + (x - 98) / 22 * 5);
  for (const dy of [0, 2]) { const p = cab(30, 37 + dy, 102, 63 + dy, 24); for (let i = 1; i < p.length; i++) linea(p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], f_hoyK.cable);
    if (dy === 0) for (let i = 2; i < p.length - 1; i += 2) { const [x, y] = p[i]; linea(x, y + 1, x, deck(x) - 1, hex('#6a6e7a')); } }
  for (let k = 0; k < 6; k++) linea(40, 40, 46 + k * 9, deck(46 + k * 9) - 1, hex('#7a7e8a'));
  { const p = cab(18, 38, -10, 72, 6); for (let i = 1; i < p.length; i++) linea(p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], f_hoyK.cable); for (let i = 3; i < p.length; i += 3) { const [x, y] = p[i]; if (x >= 0) linea(x, y + 1, x, deck(x) - 1, hex('#6a6e7a')); } }
  for (let x = 0; x <= 120; x++) { const y = deck(x); pset(x, y - 1, hex('#5a5e6a')); pset(x, y, hex('#d8d0c0')); pset(x, y + 1, hex('#8a8478')); pset(x, y + 2, hex('#5a5048')); if (x % 3 === 0) pset(x, y + 3, hex('#5a5048')); }
  torre(14, 44, 34, 104, 7, 50, 80);
  return { V };
}

// el muelle de delante, fijo: la barandilla de hierro con su pasamanos de madera, las tablas en perspectiva con sus vetas,
// juntas y clavos, la sombra de los postes, la papelera, los prismáticos de moneda, el amarre con su cabo, el banco de
// listones y la farola (sin la luz, que va viva)
function f_hoyMuelleMuelle(R) {
  const { rect, pset, linea, disco } = R, K = f_hoyK, B = R.buf;
  const filas = [142, 145, 148, 151, 155, 159, 164, 169, 175, 181];
  for (let r = 0; r < filas.length - 1; r++) { const y0 = filas[r], y1 = filas[r + 1] - 1, L = 34 + r * 9, off = Math.floor(h(r, 1, 660) * L), tono = r % 3 === 1 ? K.tablaL : r % 3 === 2 ? f_hoyMezcla(K.tabla, K.tablaS, 0.4) : K.tabla;
    for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const j = (x + off) % L; let c = y === y1 ? K.tablaD : y === y0 ? f_hoyMezcla(tono, C.blanco, 0.12) : tono;
      if (j === 0) c = K.tablaD; else if (h((x + off) >> 3, y, 661 + r) < 0.09) c = K.tablaS; else if (h(x, y, 662) < 0.03) c = K.tablaL;
      if (y !== y1 && (j === 2 || j === L - 2) && (y - y0) === Math.floor((y1 - y0) / 2)) c = K.hierroL; B[y * 320 + x] = c; } }
  // la barandilla: postes, pasamanos y barras, y su sombra en las tablas
  for (let x = 6; x < 320; x += 26) { for (let j = 0; j < 4; j++) rect(x + 3 + j, 142 + j, x + 5 + j, 142 + j, f_hoyMezcla(K.tabla, C.k, 0.35)); rect(x, 126, x + 2, 142, K.hierro); rect(x, 126, x, 142, K.hierroL); rect(x - 1, 141, x + 3, 142, K.hierro); disco(x + 1, 125, 1, K.hierroL); }
  rect(0, 127, 319, 128, K.tablaS); rect(0, 127, 319, 127, K.tablaL); rect(0, 129, 319, 129, K.tablaD);
  for (const y of [134, 139]) { rect(0, y, 319, y, K.hierro); for (let x = 0; x < 320; x += 4) pset(x, y, K.hierroL); }
  // el salvavidas colgado de la barandilla, con su cabo
  { const x = 292, y = 134; for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d > 6.2 || d < 2.8) continue; const an = Math.atan2(j, i), seg = Math.floor((an + Math.PI) / (Math.PI / 2) + 0.5) % 2; pset(x + i, y + j, d > 5.4 || d < 3.5 ? C.k : seg ? C.blanco : C.naranja); }
    pset(x - 2, y - 3, hex('#ffb070')); linea(x - 6, y, x - 9, y + 6, hex('#e8e0c8')); linea(x + 6, y, x + 8, y + 6, hex('#e8e0c8')); }
  // la papelera de rejilla con su bolsa
  { const x = 16; rect(x - 6, 136, x + 6, 152, C.k); rect(x - 5, 137, x + 5, 151, hex('#3a5a4a')); for (let y = 139; y < 151; y += 2) for (let i = x - 4; i < x + 5; i += 2) pset(i + ((y >> 1) % 2), y, hex('#1e3a2e')); rect(x - 6, 136, x + 6, 137, hex('#5a7a6a')); rect(x - 4, 134, x + 4, 135, hex('#2a2a32')); pset(x - 2, 134, hex('#5a5a66')); rect(x - 7, 152, x + 7, 153, f_hoyMezcla(K.tabla, C.k, 0.4)); }
  // los prismáticos de moneda sobre su pie
  { const x = 64; rect(x - 4, 151, x + 4, 152, C.k); rect(x - 3, 150, x + 3, 151, hex('#2a5a5a')); rect(x - 1, 142, x + 1, 150, hex('#2a5a5a')); pset(x - 1, 143, hex('#5a9a9a'));
    rect(x - 6, 134, x + 6, 142, C.k); rect(x - 5, 135, x + 5, 141, hex('#3a7a78')); rect(x - 5, 135, x + 5, 136, hex('#6ab0a8')); rect(x - 2, 138, x + 1, 139, hex('#2a4a4a')); pset(x + 3, 139, C.oro);
    for (const dx of [-5, 3]) { rect(x + dx - 1, 133, x + dx + 2, 136, C.k); pset(x + dx, 134, hex('#8ac8e8')); } rect(x - 7, 153, x + 7, 154, f_hoyMezcla(K.tabla, C.k, 0.35)); }
  // el amarre de hierro con su cabo enrollado
  { const x = 112; rect(x - 3, 140, x + 3, 147, C.k); rect(x - 2, 141, x + 2, 147, K.hierroL); rect(x - 4, 139, x + 4, 140, K.hierro); pset(x - 1, 142, hex('#8a94a0'));
    for (let a = 0; a < 6.28; a += 0.3) { pset(Math.round(x + 9 + Math.cos(a) * 4), Math.round(148 + Math.sin(a) * 1.6), hex('#c8a870')); pset(Math.round(x + 9 + Math.cos(a) * 2), Math.round(148 + Math.sin(a) * 0.8), hex('#a88a50')); }
    linea(x + 2, 143, x + 6, 147, hex('#c8a870')); }
  // el banco de listones con sus patas de hierro y su sombra
  { const a = 228, b = 276; rect(a + 2, 152, b + 2, 154, f_hoyMezcla(K.tabla, C.k, 0.4));
    for (const y of [132, 135, 138]) { rect(a, y, b, y + 1, C.maderaS); rect(a, y, b, y, C.maderaL); }
    rect(a - 1, 144, b + 1, 146, C.maderaS); rect(a - 1, 144, b + 1, 144, C.maderaL); for (let x = a + 3; x < b; x += 6) pset(x, 145, C.maderaD);
    for (const x of [a + 2, b - 2]) { rect(x, 130, x + 1, 152, K.hierro); linea(x, 146, x - 2, 152, K.hierro); linea(x + 1, 146, x + 3, 152, K.hierro); rect(x - 1, 141, x + 2, 142, K.hierroL); } }
  // la farola con su poste de fundición y sus banderolas (la luz y las banderolas que ondean van vivas)
  { const x = 196; rect(x - 3, 140, x + 3, 143, K.hierro); rect(x - 2, 132, x + 2, 140, K.hierro); pset(x - 1, 133, K.hierroL); rect(x - 1, 74, x + 1, 132, K.hierro); rect(x - 1, 74, x - 1, 132, K.hierroL); for (const y of [100, 116]) rect(x - 2, y, x + 2, y + 1, K.hierroL);
    rect(x - 4, 72, x + 4, 73, K.hierro); rect(x - 3, 62, x + 3, 71, C.k); rect(x - 2, 63, x + 2, 70, hex('#e8e0c8')); pset(x - 1, 64, C.blanco); rect(x - 4, 60, x + 4, 61, K.hierro); pset(x, 58, K.hierro); pset(x, 59, K.hierro); }
  return {};
}

// el ferry naranja de doble proa (x: el centro, y: la línea de flotación), con sus dos cubiertas de ventanas, las timoneras
// de los dos extremos, la gente pequeña en la borda, la bandera y la estela; k: la luz de la hora; en: ventanas encendidas
function f_hoyFerry(R, x, y, t, k, en, dir = -1) {
  const { rect, pset } = R, L = 30, K = f_hoyK;
  for (let i = 0; i < 46; i++) { const xx = Math.round(x - dir * (L + 2 + i)), a = 1 - i / 46; if (h(i, Math.floor(t * 4), 663) < a * 0.8) pset(xx, y + (i % 3 === 0 ? 0 : 1), k(f_hoyK.brillo)); if (i % 4 === 0 && a > 0.3) pset(xx, y - 1, k(f_hoyK.brillo)); }
  for (let i = -3; i <= 3; i++) pset(x + dir * (L + 1) + i, y + 1, k(f_hoyK.brillo));
  rect(x - L, y - 6, x + L, y, k(C.k)); rect(x - L + 1, y - 5, x + L - 1, y - 1, k(K.ferry)); rect(x - L + 1, y - 2, x + L - 1, y - 1, k(K.ferryS)); rect(x - L + 1, y - 5, x + L - 1, y - 5, k(K.ferryL));
  for (const s of [-1, 1]) { rect(x + s * L - (s > 0 ? 1 : 0), y - 6, x + s * L + (s > 0 ? 0 : 1), y - 3, k(C.k)); }
  rect(x - L + 4, y - 11, x + L - 4, y - 6, k(C.k)); rect(x - L + 5, y - 10, x + L - 5, y - 7, k(K.ferry)); rect(x - L + 5, y - 10, x + L - 5, y - 10, k(K.ferryL));
  for (let i = x - L + 6; i < x + L - 5; i += 3) { const lit = en > h(i, 1, 664) * 0.8; rect(i, y - 9, i + 1, y - 8, lit ? K.luz2 : k(K.ventana)); }
  rect(x - L + 9, y - 15, x + L - 9, y - 11, k(C.k)); rect(x - L + 10, y - 14, x + L - 10, y - 12, k(K.crema)); for (let i = x - L + 11; i < x + L - 10; i += 3) { const lit = en > h(i, 2, 664) * 0.8; pset(i, y - 13, lit ? K.luz1 : k(K.ventana)); pset(i + 1, y - 13, lit ? K.luz1 : k(K.ventana)); }
  for (const s of [-1, 1]) { const cx = x + s * (L - 12); rect(cx - 3, y - 19, cx + 3, y - 15, k(C.k)); rect(cx - 2, y - 18, cx + 2, y - 16, k(K.crema)); rect(cx - 2, y - 17, cx + 2, y - 17, en > 0.2 ? K.luz3 : k(K.ventana)); }
  for (let i = 0; i < 9; i++) { const px = x - L + 12 + i * 4 + (i % 3), bob = Math.floor(t * 2 + i) % 5 === 0 ? 1 : 0; pset(px, y - 16 + bob, k([hex('#e8b890'), hex('#8a5a3a'), hex('#c88a5a')][i % 3])); pset(px, y - 15, k([C.rojo, C.azul, C.blanco, C.amarillo][i % 4])); }
  rect(x, y - 24, x, y - 19, k(C.k)); for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) pset(x + 1 + i, y - 24 + j + Math.round(Math.sin(t * 6 - i * 0.7) * (i > 2 ? 1 : 0)), k(j === 1 ? C.blanco : C.azul));
  if (en > 0.1) { pset(x - L, y - 4, C.verde); pset(x + L, y - 4, C.rojo); }
}

// el remolcador rojo que empuja su barcaza de grava (x: la proa de la barcaza; y: flotación; va a la derecha)
function f_hoyRemolcador(R, x, y, t, k) {
  const { rect, pset, disco, poligono } = R;
  // la barcaza: casco de hierro oxidado con su borda y el montón de arena
  rect(x - 32, y - 3, x, y, k(C.k)); rect(x - 31, y - 2, x - 1, y - 1, k(hex('#8a4a32'))); rect(x - 31, y - 2, x - 1, y - 2, k(hex('#a86a4a'))); for (let i = x - 29; i < x - 1; i += 5) pset(i, y - 1, k(hex('#5a3022')));
  poligono([[x - 29, y - 3], [x - 20, y - 8], [x - 12, y - 7], [x - 3, y - 3]], k(hex('#c8a870'))); poligono([[x - 20, y - 8], [x - 12, y - 7], [x - 9, y - 4], [x - 18, y - 4]], k(hex('#a8885a'))); pset(x - 20, y - 8, k(hex('#e8d0a0'))); pset(x - 19, y - 8, k(hex('#e8d0a0')));
  // el remolcador que empuja: casco rojo, defensas de goma, la caseta de dos pisos, la chimenea con su humo
  const tx = x - 41; rect(tx - 7, y - 4, tx + 8, y, k(C.k)); rect(tx - 6, y - 3, tx + 7, y - 1, k(C.rojo)); rect(tx - 6, y - 3, tx + 7, y - 3, k(hex('#e86a5a'))); rect(tx + 8, y - 4, tx + 9, y - 1, k(hex('#2a2a2a')));
  rect(tx - 4, y - 8, tx + 4, y - 4, k(C.k)); rect(tx - 3, y - 7, tx + 3, y - 5, k(C.blanco)); for (let i = tx - 2; i < tx + 3; i += 2) pset(i, y - 6, k(f_hoyK.ventana));
  rect(tx - 2, y - 11, tx + 3, y - 8, k(C.k)); rect(tx - 1, y - 10, tx + 2, y - 9, k(C.blanco)); rect(tx - 1, y - 10, tx + 2, y - 10, k(f_hoyK.ventanaL));
  rect(tx - 5, y - 12, tx - 4, y - 8, k(C.k)); pset(tx - 5, y - 11, k(C.rojo)); pset(tx - 4, y - 11, k(C.rojo));
  for (let i = 0; i < 4; i++) { const u = (t * 0.5 + i / 4) % 1; disco(Math.round(tx - 5 - u * 10), Math.round(y - 14 - u * 9), u < 0.35 ? 1 : 2, k(u > 0.6 ? hex('#a8a8b0') : hex('#d0d0d4'))); }
  for (let i = 0; i < 5; i++) { pset(x + 1 + i, y + (i % 2), k(f_hoyK.brillo)); pset(tx - 9 - i * 2, y + (i % 2), k(f_hoyK.brillo)); }
}

// un velero pequeño que cabecea (x, y: flotación)
function f_hoyVelero(R, x, y, t, k) { const { rect, pset, poligono, linea } = R, b = Math.round(Math.sin(t * 1.8) * 0.6); rect(x - 6, y - 1 + b, x + 6, y + b, k(C.blanco)); rect(x - 5, y + b, x + 5, y + b, k(C.azul)); linea(x, y - 1 + b, x, y - 14 + b, k(C.k)); poligono([[x + 1, y - 13 + b], [x + 1, y - 2 + b], [x + 7, y - 2 + b]], k(C.blanco)); poligono([[x - 1, y - 11 + b], [x - 1, y - 2 + b], [x - 5, y - 2 + b]], k(hex('#e8e0d0'))); pset(x - 2, y - 2 + b, k(C.rojo)); }

function f_hoyMuelle(R, t, o, luz, en) {
  const { rect, pset, disco, linea } = R, hor = 104, k = (c) => f_hoyCol(c, luz), K = f_hoyK;
  const sol = luz === 'tarde' ? [64, 74, 12] : luz === 'dia' ? [240, 36, 8] : null;
  f_hoyCielo(R, t, { hor, modo: luz, sol, luna: [240, 30, 5], estela: [34, 0.07], nubesBaja: 22 });   // los cúmulos, bajos: no pasan por detrás de Atom
  const capa = f_hoyCapa(R, 'muelle|' + luz, luz, () => f_hoyMuelleFondo(R));
  f_hoyPegar(R, capa.b, 0, hor);
  f_hoyLuces(R, t, capa.V, en);
  if (luz !== 'dia') for (const [x0, y0] of [[197, 5], [213, 16], [78, 21], [26, 30]]) if (Math.floor(t * 1.4 + x0) % 2) { pset(x0, y0, C.rojo); if (luz === 'anochecer') pset(x0, y0 - 1, hex('#ff8a8a')); }
  // los coches de la autovía de la orilla (de noche, faros blancos y pilotos rojos)
  for (let i = 0; i < 14; i++) { const v = i % 2 ? 22 : -26, x = Math.round(((h(i, 1, 665) * 360 + t * v) % 360 + 360) % 360) - 20, y = i % 2 ? 98 : 97; if (luz === 'anochecer') pset(x, y, i % 2 ? hex('#fff4d0') : C.rojo); else { pset(x, y, k([C.rojo, C.blanco, C.azul, hex('#3a3a46'), C.amarillo][i % 5])); pset(x + 1, y, k(hex('#3a3a46'))); } }
  // el helicóptero que cruza despacio sobre las torres
  { const u = ((t + 6) % 40) / 40, x = Math.round(330 - u * 360), y = Math.round(58 + Math.sin(t * 0.7) * 2); if (!(x > 270 && y < 50)) { rect(x - 2, y, x + 2, y + 2, k(hex('#3a3e4a'))); pset(x - 1, y, k(hex('#8ac0e0'))); rect(x + 3, y + 1, x + 7, y + 1, k(hex('#3a3e4a'))); pset(x + 7, y, k(hex('#3a3e4a'))); rect(x - 2, y + 3, x + 2, y + 3, k(hex('#3a3e4a')));
      const r = Math.floor(t * 20) % 2 ? 4 : 2; rect(x - r, y - 1, x + r, y - 1, k(hex('#6a6e7a'))); if (Math.floor(t * 2) % 2) pset(x + 7, y + 1, C.rojo); } }
  // el agua, con el reflejo del perfil y el camino del sol (o de la luna)
  f_hoyAgua(R, t, hor, 142, luz, { sol: sol ? sol[0] : luz === 'anochecer' ? 240 : null });
  // los barcos: el remolcador lejos, el velero y el ferry, que cruza cada 30 s (o.ferry: x fija)
  f_hoyRemolcador(R, Math.round(((t * 4 + 120) % 420) - 50), 110, t, k);
  f_hoyVelero(R, Math.round(268 - ((t * 2.2) % 60)), 116, t, k);
  const fx = o.ferry ?? Math.round(350 - ((t + 8) % 30) / 30 * 440); f_hoyFerry(R, fx, 124, t, k, en, -1);
  // la bahía de 1524 superpuesta: el bosque y las colinas sobre la isla, las marismas y una canoa
  if (o.fantasma > 0) f_hoyFantasmaIsla(R, t, Math.min(1, o.fantasma), hor);
  f_hoyGaviotas(R, t, 3, 70);
  // el muelle de delante
  const muelle = f_hoyCapa(R, 'muelleP|' + luz, luz, () => f_hoyMuelleMuelle(R));
  f_hoyPegar(R, muelle.b, 124, 180);
  // la farola: encendida por la tarde y al anochecer (halo tramado y cono en las tablas); sus banderolas ondean
  { const x = 196, on = luz !== 'dia'; if (on) { rect(x - 2, 63, x + 2, 70, K.farolaL); for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d > 4 && d < 11 && f_hoyU(x + i, 66 + j) < (11 - d) / 14) pset(x + i, 66 + j, f_hoyMezcla(R.pget(x + i, 66 + j), K.farolaL, 0.5)); }
      if (luz === 'anochecer') for (let y = 141; y < 160; y++) for (let xx = x - 34; xx <= x + 34; xx++) { const e = ((xx - x) / 34) ** 2 + ((y - 148) / 11) ** 2; if (e < 1 && f_hoyU(xx, y) < 0.55 * (1 - e)) pset(xx, y, f_hoyMezcla(R.pget(xx, y), K.farolaL, 0.3)); } }
    for (const [y0, c] of [[80, C.azul], [104, hex('#2a8a6a')]]) for (let i = 0; i < 8; i++) for (let j = 0; j < 11; j++) { const dx = Math.round(Math.sin(t * 4 - i * 0.6 + y0) * (i / 8) * 1.5); pset(x + 2 + i, y0 + j + dx, k(j === 0 || j === 10 ? f_hoyMezcla(c, C.k, 0.3) : j === 3 || j === 4 ? f_hoyMezcla(c, C.blanco, 0.45) : i === 7 ? f_hoyMezcla(c, C.k, 0.2) : c)); } }
  // la gaviota de la barandilla (gira la cabeza; cada 14 s se va y vuelve) y las palomas que picotean en las tablas
  { const s = t % 14, x = 150, vuela = s > 10; if (!vuela) { rect(x - 2, 123, x + 2, 126, k(C.blanco)); rect(x + 1, 124, x + 3, 125, k(hex('#b8c4d4'))); const m = Math.sin(t * 1.3) > 0 ? -1 : 1; rect(x + (m > 0 ? 2 : -3), 121, x + (m > 0 ? 3 : -2), 122, k(C.blanco)); pset(x + (m > 0 ? 4 : -4), 122, k(C.amarillo)); pset(x - 1, 127, k(C.amarillo)); pset(x + 1, 127, k(C.amarillo)); }
    else R.gaviota(Math.round(x + (s - 10) * 20), Math.round(122 - (s - 10) * 14), t, 7); }
  for (const [x0, sem] of [[126, 0], [140, 1], [292, 2]]) { const x = Math.round(x0 + Math.sin(t * 0.4 + sem * 2) * 6), pica = Math.floor(t * 3 + sem) % 4 === 0, d = Math.cos(t * 0.4 + sem * 2) > 0 ? 1 : -1;
    rect(x - 2, 164, x + 2, 166, k(hex('#7a7e8e'))); rect(x - 2, 164, x, 164, k(hex('#9a9eae'))); pset(x - 2 * d, 167, k(C.naranja)); pset(x + 2 * d, 167, k(C.naranja)); const hx = x + 3 * d, hy = pica ? 166 : 163; rect(Math.min(hx, hx + d), hy, Math.max(hx, hx + d), hy + 1, k(hex('#5a6a7a'))); pset(hx + 2 * d, hy + 1, k(hex('#c8a060'))); pset(x - 3 * d, 165, k(hex('#4a4e5e'))); }
  return { suelo: 160, pies: [24, 300], hor, agua: [0, hor, 319, 141], baranda: 127, banco: [230, 274, 152], prismaticos: [64, 138], farola: [196, 66], ferry: [fx, 124], papelera: [16, 152], amarre: [112, 147], sol };
}
// la bahía de 1524 sobre la isla (a: 0–1): colinas con bosque pálido y tramado, las marismas y una canoa con dos remeros
function f_hoyFantasmaIsla(R, t, a, hor) {
  const { pset, pget } = R, K = f_hoyK;
  for (let x = 40; x < 320; x++) { const yc = Math.round(70 + 9 * Math.sin(x * 0.028 + 1) + 5 * Math.sin(x * 0.09) + 3 * Math.sin(x * 0.23)); for (let y = Math.max(44, yc - 4); y < hor; y++) {
      const copa = y < yc ? (Math.hypot((x % 7) - 3, y - yc + 2) < 3.5) : true; const c = y > hor - 5 ? K.fantasma : y < yc + 2 || (x * 3 + y * 5) % 11 === 0 ? K.fantasma : K.fantasmaS; pset(x, y, f_hoyMezcla(pget(x, y), c, copa ? (f_hoyU(x, y) < a * 0.9 ? 0.75 : 0.35) * a : 0)); } }
  const cx = Math.round(80 + ((t * 6) % 220)), cy = 118; for (let i = -9; i <= 9; i++) if (f_hoyU(cx + i, cy) < a) { pset(cx + i, cy, K.fantasma); pset(cx + i, cy + 1, K.fantasmaS); }
  for (const dx of [-4, 4]) { if (f_hoyU(cx + dx, cy - 3) < a) { pset(cx + dx, cy - 2, K.fantasma); pset(cx + dx, cy - 3, K.fantasma); pset(cx + dx, cy - 4, K.fantasma); } const r = Math.sin(t * 4 + dx) > 0 ? 1 : -1; pset(cx + dx + 2 * r, cy - 1, K.fantasmaS); pset(cx + dx + 3 * r, cy + 1, K.fantasmaS); }
}

// las nubes que se reflejan en un muro de cortina (x0, y0, x1, y1): tres manchas claras que bajan despacio por el cristal
// sin borrar la rejilla (mezcla sobre lo que hay); luz: la hora
function f_hoyReflejos(R, t, x0, y0, x1, y1, luz, f = 0.32) {
  const B = R.buf, cl = luz === 'tarde' ? hex('#ffd0a0') : luz === 'anochecer' ? hex('#6a5a8a') : C.blanco, w = x1 - x0, hh = y1 - y0;
  const M = [0, 1, 2].map((k) => [x0 + ((h(k, 1, 670) * w + t * (1.2 + k * 0.5)) % (w + 30)) - 15, y0 + ((h(k, 2, 670) * hh + t * (2 + k)) % (hh + 40)) - 20, 9 + k * 4, 5 + k * 2]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let q = 0; for (const [cx, cy, rx, ry] of M) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e < 1) q = Math.max(q, 1 - e); }
    if (q > 0 && f_hoyU(x, y) < q * 1.4) B[y * 320 + x] = f_hoyMezcla(B[y * 320 + x], cl, f * Math.min(1, q * 2)); }
}

// una bandera lisa de mástil (x, y: la esquina del asta; 12 × 8) que ondea: franjas, cruz nórdica o disco, sin escudos
const f_hoyBANDERAS = [
  ['v', '#3a8a4a', '#f6f2ea', '#c83a3a'], ['h', '#1c1c24', '#c83a3a', '#e8b830'], ['d', '#f6f2ea', '#c8303a'], ['x', '#c8303a', '#f6f2ea'], ['v', '#2a3a8a', '#e8c040', '#c83a3a'],
  ['h', '#f6f2ea', '#2a4fa8', '#c83a3a'], ['d', '#2a7a4a', '#c8303a'], ['x', '#2a5aa8', '#e8c040'], ['v', '#e8783a', '#f6f2ea', '#3a8a4a'], ['h', '#6ab0e8', '#f6f2ea', '#6ab0e8'],
  ['2', '#f6f2ea', '#c8303a'], ['h', '#c83a3a', '#f6f2ea', '#3a8a4a'], ['2', '#2a4fa8', '#e8c040'], ['v', '#1c1c24', '#e8c040', '#c83a3a'], ['d', '#e8c040', '#2a5aa8'],
].map(([tipo, ...c]) => [tipo, ...c.map(hex)]);

function f_hoyBandera(R, x, y, t, i, k, w = 12, hh = 8) {
  const [tipo, a, b, c] = f_hoyBANDERAS[i % f_hoyBANDERAS.length];
  for (let u = 0; u < w; u++) { const fu = u / w, dy = Math.round(Math.sin(t * 4.2 - u * 0.55 + i) * fu * 1.6), sl = Math.cos(t * 4.2 - u * 0.55 + i);
    for (let v = 0; v < hh; v++) { let col;
      if (tipo === 'v') col = u < w / 3 ? a : u < 2 * w / 3 ? b : c;
      else if (tipo === 'h') col = v < hh / 3 ? a : v < 2 * hh / 3 ? b : c;
      else if (tipo === '2') col = v < hh / 2 ? a : b;
      else if (tipo === 'd') col = Math.hypot(u - w * 0.42, (v - hh / 2 + 0.5) * 1.1) < hh * 0.3 ? b : a;
      else col = (u >= 3 && u <= 4) || (v >= 3 && v <= 4) ? b : a;
      if (sl < -0.4 && fu > 0.15) col = f_hoyMezcla(col, C.k, 0.22); else if (sl > 0.6 && fu > 0.15) col = f_hoyMezcla(col, C.blanco, 0.18);
      R.pset(x + 1 + u, y + v + dy, k(col)); } }
}

// el fondo lejano de la ONU, fijo: la otra orilla del río (naves, bloques bajos, la central con sus cuatro chimeneas de
// franjas) y, detrás de la asamblea, las torres de Midtown en la bruma con la corona de arcos y su aguja
function f_hoyOnuFondo(R) {
  const { rect, pset, linea, disco } = R, K = f_hoyK, V = [];
  for (let x = 96, k = 0; x < 200; k++) { const w = 7 + Math.floor(h(k, 1, 671) * 9), top = 40 + Math.floor(h(k, 2, 671) * 34); rect(x, top, x + w, 110, K.bruma); rect(x + w - 2, top, x + w, 110, K.brumaS); rect(x, top, x + w, top, K.brumaL);
    for (let y = top + 3; y < 108; y += 3) for (let i = x + 1; i < x + w - 1; i += 2) if (h(i, y, 672) < 0.55) { pset(i, y, K.brumaS); V.push([i, y, 1, 1, h(i, y, 673), 0]); } x += w + 1; }
  // la torre de la corona de arcos, en la bruma
  { const cx = 132; rect(cx - 7, 50, cx + 7, 110, K.brumaS); rect(cx - 7, 50, cx - 5, 110, K.brumaL); for (let j = 0; j < 4; j++) { const r = 6 - j * 1.4, yb = 50 - j * 5; for (let a = Math.PI; a <= 2 * Math.PI; a += 0.08) pset(Math.round(cx + Math.cos(a) * r), Math.round(yb + Math.sin(a) * r * 0.9), K.brumaL); for (let y = yb - Math.round(r * 0.8); y <= yb; y++) for (let x = cx - Math.round(r) + 1; x < cx + r; x++) if ((x + y) % 2) pset(x, y, f_hoyMezcla(K.brumaS, K.brumaL, 0.4)); }
    linea(cx, 30, cx, 18, K.brumaL); }
  // la otra orilla: naves, bloques, la central con sus chimeneas de franjas rojas y blancas y su humo quieto
  for (let x = 0, k = 0; x < 124; k++) { const w = 8 + Math.floor(h(k, 3, 674) * 12), top = 94 + Math.floor(h(k, 4, 674) * 10), c = [hex('#9a8a7a'), hex('#8a9098'), hex('#a8907a'), hex('#7a8088')][k % 4];
    rect(x, top, x + w, 109, c); rect(x + w - 2, top, x + w, 109, f_hoyMezcla(c, C.k, 0.25)); rect(x, top, x + w, top, f_hoyMezcla(c, C.blanco, 0.3)); for (let y = top + 2; y < 108; y += 3) for (let i = x + 1; i < x + w - 1; i += 2) { pset(i, y, f_hoyMezcla(c, C.k, 0.35)); if (h(i, y, 675) < 0.5) V.push([i, y, 1, 1, h(i, y, 676), 1]); } x += w; }
  rect(16, 86, 70, 109, hex('#8a7a70')); rect(16, 86, 70, 87, hex('#a8988a')); for (let x = 20; x < 68; x += 4) rect(x, 90, x + 1, 104, hex('#5a4e48'));
  for (const cx of [24, 36, 48, 60]) { for (let y = 56; y < 86; y++) { const c = Math.floor((y - 56) / 5) % 2 ? C.blanco : C.rojo; rect(cx - 1, y, cx + 1, y, f_hoyMezcla(c, K.bruma, 0.3)); pset(cx + 1, y, f_hoyMezcla(c, C.k, 0.2)); } pset(cx, 56, C.rojo); }
  rect(0, 109, 123, 110, hex('#6a6a70'));
  return { V };
}

// lo de delante de la ONU, fijo: la torre de cristal con su canto de mármol, sus plantas de máquinas y su vestíbulo; la
// asamblea con su tejado cóncavo, su cúpula y su gran ventanal; el edificio de la derecha; la balaustrada del río; el
// césped con su parterre, los mástiles, el pavimento de granito en perspectiva, una jardinera y la esfera de bronce
function f_hoyOnuDelante(R) {
  const { rect, pset, linea, disco, poligono } = R, K = f_hoyK, B = R.buf, V = [];
  // el edificio de la derecha: un bloque de los cincuenta con ventanas corridas
  for (let y = 70; y <= 136; y++) for (let x = 262; x < 320; x++) { let c = (y - 72) % 5 < 2 ? hex('#4a6a78') : hex('#c8ccc4'); if (x > 306) c = f_hoyMezcla(c, C.k, 0.18); if ((y - 72) % 5 < 2 && (x - 262) % 6 === 0) c = hex('#3a4a54'); B[y * 320 + x] = c; if ((y - 72) % 5 === 0 && (x - 262) % 3 === 1) V.push([x, y, 2, 1, h(x, y, 677), 4]); }
  rect(262, 68, 319, 70, hex('#e0e4dc')); rect(270, 64, 286, 68, hex('#9aa0a0'));
  // la torre: el canto de mármol y la fachada de cristal verdeazulado de arriba abajo
  for (let y = 0; y <= 136; y++) { for (let x = 196; x <= 203; x++) { let c = x > 201 ? K.marmolS : K.marmol; if ((y + (x - 196) * 7) % 12 === 0 || x === 199) c = f_hoyMezcla(c, K.marmolS, 0.6); if (h(x, y, 678) < 0.05) c = f_hoyMezcla(c, C.blanco, 0.5); B[y * 320 + x] = c; } pset(203, y, f_hoyMezcla(K.marmolS, C.k, 0.3));
    const g = y / 136, maq = (y >= 44 && y <= 49) || (y >= 92 && y <= 97) || y <= 3;
    for (let x = 204; x <= 262; x++) { let c;
      if (maq) c = (x - 204) % 2 ? hex('#3a4a4a') : hex('#6a7a78');
      else { c = f_hoyMezcla(K.vidrioUL, K.vidrioU, Math.min(1, g * 1.4)); if (y % 3 === 0) c = f_hoyMezcla(c, K.vidrioUS, 0.55); if ((x - 204) % 4 === 0) c = f_hoyMezcla(c, K.vidrioUS, 0.35); if (x > 250) c = f_hoyMezcla(c, K.vidrioUS, 0.3); if (((x * 2 + y) % 53) < 4) c = f_hoyMezcla(c, C.blanco, 0.3);
        if (y % 3 === 1 && (x - 204) % 4 === 1 && y < 122) V.push([x, y, 3, 1, h(x, y, 679), 4]); }
      B[y * 320 + x] = c; } }
  rect(196, 0, 262, 0, hex('#2a3434'));
  // el vestíbulo: columnas, cristal oscuro y la marquesina
  rect(204, 122, 262, 136, hex('#2a3a40')); for (let x = 206; x < 262; x += 7) rect(x, 122, x + 1, 136, K.marmolS); rect(202, 120, 264, 121, K.marmol); rect(202, 121, 264, 121, K.marmolS);
  // la asamblea: el tejado cóncavo, la cúpula, el mármol, el gran ventanal y la entrada
  const yr = (x) => Math.round(80 + 10 * (1 - ((x - 150) / 42) ** 2));
  for (let x = 108; x <= 192; x++) { const y0 = yr(x), lado = Math.abs(x - 150) / 42; for (let y = y0; y <= 132; y++) { let c = lado > 0.8 ? K.marmolS : K.marmol; if ((x - 108) % 6 === 0) c = f_hoyMezcla(c, K.marmolS, 0.5); if (y === y0) c = C.blanco; if (y === y0 + 1) c = K.marmolS; B[y * 320 + x] = c; } }
  for (let j = -7; j <= 0; j++) for (let i = -11; i <= 11; i++) { const e = (i / 11) ** 2 + (j / 7) ** 2; if (e > 1) continue; let c = i < -3 ? hex('#e0e6e6') : i > 4 ? hex('#8a9496') : hex('#b8c2c4'); if (i % 4 === 0) c = f_hoyMezcla(c, C.k, 0.15); if (e > 0.85) c = hex('#6a7476'); pset(150 + i, 89 + j, c); }
  rect(148, 79, 152, 82, hex('#9aa4a6')); rect(148, 79, 149, 82, hex('#d0d8d8')); rect(149, 77, 151, 78, hex('#6a7476')); pset(150, 76, C.oro);
  for (let y = 100; y <= 126; y++) for (let x = 126; x <= 174; x++) { let c = f_hoyMezcla(K.vidrioUL, K.vidrioUS, (y - 100) / 30); if ((x - 126) % 6 === 0 || (y - 100) % 5 === 0) c = hex('#e8ecec'); B[y * 320 + x] = c; if ((x - 126) % 6 === 3 && (y - 100) % 5 === 2) V.push([x - 1, y, 3, 2, h(x, y, 680) * 0.5, 2]); }
  rect(124, 98, 176, 99, K.marmolS); rect(132, 126, 168, 128, hex('#5a6a6a')); rect(132, 126, 168, 126, hex('#8a9a9a')); for (let x = 138; x < 166; x += 7) rect(x, 129, x + 4, 132, hex('#2a3434'));
  // la balaustrada del río, con sus balaustres
  rect(0, 119, 110, 121, K.marmol); rect(0, 119, 110, 119, C.blanco); rect(0, 122, 110, 122, K.marmolS);
  for (let x = 1; x < 110; x += 3) { rect(x, 123, x + 1, 129, K.marmol); pset(x + 1, 125, K.marmolS); pset(x, 126, K.marmolS); } rect(0, 130, 110, 132, K.marmolS); rect(0, 130, 110, 130, K.marmol);
  // el césped con el parterre y los mástiles (las banderas van vivas)
  for (let y = 133; y <= 140; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 681) < 0.15 ? K.cespedL : h(x, y, 682) < 0.1 ? K.cespedS : K.cesped; if (y >= 136 && y <= 138 && (x % 9) < 5) c = [C.rojo, C.amarillo, hex('#e87a9a'), C.blanco][(x / 9 | 0) % 4]; if (y >= 136 && y <= 138 && (x % 9) >= 5) c = K.cespedS; B[y * 320 + x] = c; }
  rect(0, 133, 319, 133, K.cespedS);
  for (const x of f_hoyMASTILES) { rect(x, 96, x, 138, hex('#d0d4d8')); rect(x + 1, 98, x + 1, 138, hex('#8a9096')); pset(x, 95, C.oro); pset(x + 1, 95, C.oroS); rect(x - 1, 137, x + 2, 138, hex('#6a6e74')); }
  // el pavimento de granito en perspectiva: hiladas cada vez más altas y juntas que fugan hacia el centro
  const filas = [141, 144, 147, 151, 155, 160, 166, 173, 181]; rect(0, 140, 319, 140, K.granitoL);
  for (let r = 0; r < filas.length - 1; r++) for (let y = filas[r]; y < filas[r + 1]; y++) for (let x = 0; x < 320; x++) {
    const s = (x - 160) / ((y - 96) / 45), j = ((Math.round(s) + (r % 2) * 9) % 18 + 18) % 18; let c = (r + ((s + 900) / 18 | 0)) % 3 === 0 ? K.granitoL : K.granito; if (h(x, y, 683) < 0.12) c = f_hoyMezcla(c, K.granitoS, 0.5);
    if (y === filas[r + 1] - 1 || j === 0) c = K.granitoS; B[y * 320 + x] = c; }
  // una jardinera de piedra con su arbusto
  { const x = 14; rect(x - 10, 150, x + 10, 162, K.granitoS); rect(x - 10, 150, x + 10, 151, K.granitoL); rect(x - 9, 152, x + 7, 161, K.granito); for (const [dx, dy, r] of [[-5, 146, 5], [3, 145, 6], [-1, 141, 5], [6, 148, 4]]) disco(x + dx, dy, r, K.cespedS); for (const [dx, dy, r] of [[-6, 144, 3], [2, 142, 4], [-2, 139, 2]]) disco(x + dx, dy, r, K.cesped); for (let i = 0; i < 6; i++) pset(x - 6 + i * 2, 140 + (i % 3), K.cespedL); rect(x - 11, 163, x + 11, 164, f_hoyMezcla(K.granito, C.k, 0.3)); }
  // la esfera de bronce rota sobre su pedestal
  { const cx = 300, cy = 136, r = 11; rect(cx - 7, 148, cx + 7, 168, K.granitoS); rect(cx - 7, 148, cx - 5, 168, K.granitoL); rect(cx - 9, 167, cx + 9, 170, K.granito); rect(cx - 10, 171, cx + 10, 172, f_hoyMezcla(K.granito, C.k, 0.3));
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const grieta = Math.abs(i - j * 0.4 - 2) < 1.5 && d < r - 1, l = (-i - j) / r; let c = l > 0.5 ? hex('#d8a860') : l > -0.2 ? hex('#a87a3a') : hex('#6a4a24');
      if (grieta) c = Math.hypot(i - 1, j) < 6 ? hex('#c89a50') : hex('#3a2a18'); if (d > r - 1) c = hex('#4a3418'); pset(cx + i, cy + j, c); }
    for (let k = 0; k < 4; k++) linea(cx - 9 + k * 5, cy - 4 + k, cx - 7 + k * 5, cy + 6 - k, hex('#8a6a34')); }
  return { V };
}

const f_hoyMASTILES = [8, 22, 36, 50, 64, 78, 92, 106, 120, 134, 148, 162, 176, 190, 212, 230, 248];

function f_hoyOnu(R, t, o, luz, en) {
  const { rect, pset, linea } = R, k = (c) => f_hoyCol(c, luz), K = f_hoyK;
  f_hoyCielo(R, t, { hor: 110, modo: luz, sol: luz === 'tarde' ? [80, 70, 12] : luz === 'dia' ? [84, 40, 8] : null, luna: [84, 36, 5], estela: [40, 0.05] });
  const f = f_hoyCapa(R, 'onuF|' + luz, luz, () => f_hoyOnuFondo(R));
  f_hoyPegar(R, f.b, 0, 111); f_hoyLuces(R, t, f.V, en);
  // el río: reflejos y barcos (el remolcador con su barcaza, el taxi de agua amarillo y un velero)
  f_hoyAgua(R, t, 110, 120, luz, { x1: 124, comp: 1.4 });
  f_hoyRemolcador(R, Math.round(((t * 5 + 40) % 200) - 20), 116, t, k);
  { const x = Math.round(150 - ((t * 9) % 190)), y = 118; rect(x - 8, y - 3, x + 8, y, k(C.k)); rect(x - 7, y - 2, x + 7, y - 1, k(C.amarillo)); rect(x - 4, y - 6, x + 4, y - 3, k(C.k)); rect(x - 3, y - 5, x + 3, y - 4, k(f_hoyK.ventanaL)); pset(x - 2, y - 7, k(C.k)); for (let i = 0; i < 12; i++) if (h(i, Math.floor(t * 4), 684) < 0.6) pset(x + 9 + i, y + (i % 2), k(K.brillo)); }
  f_hoyVelero(R, Math.round(30 + Math.sin(t * 0.2) * 10), 114, t, k);
  const d = f_hoyCapa(R, 'onuD|' + luz, luz, () => f_hoyOnuDelante(R));
  f_hoyPegar(R, d.b, 0, 180); f_hoyLuces(R, t, d.V, en);
  // las nubes que pasan reflejadas en la torre, y el limpiacristales que sube y baja con sus dos operarios
  f_hoyReflejos(R, t, 204, 4, 262, 120, luz);
  { const y = Math.round(16 + (Math.sin(t * 0.25) * 0.5 + 0.5) * 80), a = 222, b = 238; linea(a + 1, 0, a + 1, y - 2, k(hex('#2a2e34'))); linea(b - 1, 0, b - 1, y - 2, k(hex('#2a2e34')));
    rect(a, y - 1, b, y + 2, k(C.k)); rect(a + 1, y, b - 1, y + 1, k(hex('#d8dce0'))); for (const [px, c] of [[a + 4, C.naranja], [b - 5, C.amarillo]]) { const m = Math.round(Math.sin(t * 3 + px) * 1); rect(px, y - 4, px + 1, y - 1, k(c)); pset(px, y - 5, k(hex('#e8b890'))); pset(px + 2 + m, y - 3, k(hex('#8a9096'))); } }
  // las banderas de los mástiles
  f_hoyMASTILES.forEach((x, i) => f_hoyBandera(R, x, 96, t, i, k));
  // los turistas pequeños por delante de la balaustrada: pasean, se paran y uno hace fotos con flash
  for (let i = 0; i < 4; i++) { const per = 40, u = ((t + i * 11) % per) / per, x = Math.round(i % 2 ? 4 + u * 100 : 104 - u * 100), para = Math.sin(t * 0.7 + i * 2) > 0.6; f_hoyPersonita(R, x, 132, t, i + 3, k, !para, 9);
    if (i === 1 && para && Math.floor(t * 2) % 5 === 0) { pset(x + 2, 125, C.blanco); pset(x + 3, 124, C.blanco); pset(x + 3, 126, C.blanco); } }
  // las palomas del granito y las gaviotas del río
  for (const [x0, s] of [[90, 0], [168, 1]]) { const x = Math.round(x0 + Math.sin(t * 0.5 + s * 3) * 8), dd = Math.cos(t * 0.5 + s * 3) > 0 ? 1 : -1, pica = Math.floor(t * 3 + s) % 4 === 0; rect(x - 2, 170, x + 2, 172, k(hex('#7a7e8e'))); pset(x - 2 * dd, 173, k(C.naranja)); pset(x + 2 * dd, 173, k(C.naranja)); const hy = pica ? 172 : 169; rect(x + 3 * dd, hy, x + 3 * dd, hy + 1, k(hex('#5a6a7a'))); }
  f_hoyGaviotas(R, t, 2, 66, 1);
  return { suelo: 164, pies: [30, 280], hor: 110, torre: [196, 262, 0, 136], cristal: [204, 4, 262, 120], asamblea: [108, 192, 80], cupula: [150, 82], mastiles: f_hoyMASTILES.slice(), banderas: 96, rio: [0, 110, 124, 120], balaustrada: [0, 110, 119], esfera: [300, 136], jardinera: [14, 162] };
}

// la calle de las capas, fija: la casa holandesa, la federal, las tres brownstones, el rascacielos art déco, la torre de
// cristal y el bloque de los sesenta con la boca de metro; la acera, el bordillo, la calzada y el paso de cebra; y los
// muebles de la calle (los árboles, la boca de riego, el buzón, la farola, el carrito, el semáforo); res: la época resaltada
function f_hoyCapasFijo(R, res) {
  const { rect, pset, linea, disco, poligono } = R, K = f_hoyK, B = R.buf, V = [];
  const ventana = (x, y, w, hh, marco, pan = true, cort = null) => { rect(x - 1, y - 1, x + w, y + hh, marco); for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) B[(y + j) * 320 + x + i] = j < hh * 0.4 ? f_hoyK.ventanaL : (i + j) % 7 === 0 ? f_hoyK.ventanaL : f_hoyK.ventana;
    if (pan) { rect(x + Math.floor(w / 2), y, x + Math.floor(w / 2), y + hh - 1, marco); rect(x, y + Math.floor(hh / 2), x + w - 1, y + Math.floor(hh / 2), marco); }
    if (cort) { rect(x, y, x + 1, y + hh - 1, cort); rect(x + w - 2, y, x + w - 1, y + hh - 1, cort); }
    V.push([x, y, w, hh, h(x, y, 690), Math.floor(h(x, y, 691) * 6)]); };
  // 0 · la casa holandesa del tejado en escalera (ladrillo anaranjado, piedra blanca en los peldaños, viga de polea)
  { const cx = 21; const pasos = [[92, 2, 40], [88, 6, 36], [84, 10, 32], [80, 14, 28], [76, 17, 25]];
    for (const [y0, a, b] of pasos) for (let y = y0; y < 141; y++) for (let x = a; x <= b; x++) { let c = (y % 3 === 0) ? hex('#e8c8a8') : ((x + (y / 3 | 0) * 2) % 5 === 0 ? hex('#e8c8a8') : x > 32 ? hex('#a85a3a') : hex('#c8704a')); if (h(x, y, 692) < 0.08) c = hex('#e08a5a'); B[y * 320 + x] = c; }
    for (const [y0, a, b] of pasos) { rect(a - 1, y0 - 1, b + 1, y0, hex('#f0ece0')); rect(a - 1, y0, b + 1, y0, hex('#c8c0b0')); }
    rect(cx - 2, 72, cx + 2, 75, hex('#f0ece0')); pset(cx, 70, C.k); pset(cx, 71, C.k); rect(cx - 1, 82, cx + 9, 83, C.maderaD); linea(cx + 9, 84, cx + 9, 88, C.k); pset(cx + 8, 88, C.k);
    disco(cx, 87, 2, C.k); pset(cx, 87, f_hoyK.ventanaL);
    for (const [y, hh] of [[96, 10], [112, 10]]) for (const x of [6, 28]) { ventana(x, y, 8, hh, C.blanco); rect(x - 4, y - 1, x - 2, y + hh, hex('#3a6a4a')); rect(x + 9, y - 1, x + 11, y + hh, hex('#3a6a4a')); for (let j = y; j < y + hh; j += 2) { pset(x - 3, j, hex('#2a4a34')); pset(x + 10, j, hex('#2a4a34')); } }
    for (const [ax, ay] of [[4, 108], [37, 108], [4, 93], [37, 93]]) { pset(ax, ay, C.k); pset(ax, ay + 1, C.k); pset(ax + 1, ay - 1, C.k); }
    for (let x = 1; x <= 41; x++) { const c = Math.floor(x / 4) % 2 ? hex('#3a7a4a') : hex('#e8e0c8'); rect(x, 124, x, 127, c); pset(x, 128, Math.floor(x / 4) % 2 ? hex('#2a5a34') : hex('#c8c0a8')); }
    rect(14, 129, 28, 140, C.k); rect(15, 130, 27, 134, hex('#2a5a3a')); rect(15, 135, 27, 140, hex('#2a5a3a')); rect(15, 134, 27, 134, C.k); pset(25, 136, C.oro); rect(17, 131, 25, 133, hex('#e8c880'));
    ventana(4, 130, 7, 8, hex('#2a5a3a'), true); ventana(32, 130, 7, 8, hex('#2a5a3a'), true);
    for (let i = 0; i < 5; i++) { pset(3 + i * 2, 139, [C.rojo, C.amarillo, hex('#e87a9a'), C.rojo, C.blanco][i]); pset(3 + i * 2, 140, C.hierbaS); pset(31 + i * 2, 139, [C.amarillo, C.rojo, C.blanco, hex('#e87a9a'), C.rojo][i]); pset(31 + i * 2, 140, C.hierbaS); } }
  // 1 · la casa federal: ladrillo en aparejo flamenco, dinteles de mármol con su clave, buhardillas en el tejado de pizarra
  { const a = 42, b = 88; rect(46, 58, 50, 70, C.ladrilloS); rect(80, 58, 84, 70, C.ladrilloS); rect(45, 57, 51, 58, C.grisS); rect(79, 57, 85, 58, C.grisS);
    for (let y = 66; y < 80; y++) { const m = Math.round((80 - y) * 0.4); for (let x = a + m; x <= b - m; x++) B[y * 320 + x] = (y - 66) % 3 === 2 ? hex('#3a3e4a') : (x + (y / 3 | 0) * 3) % 6 === 0 ? hex('#3a3e4a') : hex('#5a5e6a'); }
    for (const dx of [54, 70]) { rect(dx, 67, dx + 8, 79, hex('#f0ece0')); poligono([[dx - 1, 68], [dx + 4, 63], [dx + 9, 68]], hex('#5a5e6a')); ventana(dx + 2, 70, 5, 7, hex('#f0ece0')); }
    rect(a - 1, 79, b + 1, 81, C.blanco); rect(a - 1, 81, b + 1, 81, hex('#c8c0b0'));
    for (let y = 82; y < 141; y++) for (let x = a; x <= b; x++) { let c = (y % 3 === 0) ? hex('#c8b8a8') : ((x + (y / 3 | 0) * 2) % 4 === 0 ? C.ladrilloS : C.ladrillo); if (x > b - 6) c = f_hoyMezcla(c, C.k, 0.15); B[y * 320 + x] = c; }
    for (const y of [86, 102]) for (const x of [47, 61, 75]) { ventana(x, y, 7, 11, C.blanco); rect(x - 2, y - 3, x + 8, y - 2, hex('#e8e4d8')); rect(x + 3, y - 4, x + 4, y - 2, hex('#f8f4ec')); rect(x - 4, y, x - 2, y + 10, C.k); rect(x + 8, y, x + 10, y + 10, C.k); }
    for (const x of [47, 75]) { ventana(x, 120, 7, 10, C.blanco); rect(x - 2, 117, x + 8, 118, hex('#e8e4d8')); }
    rect(59, 114, 70, 140, hex('#f0ece0')); for (let i = 0; i <= 10; i++) { const yy = Math.round(119 - Math.sqrt(Math.max(0, 25 - (i - 5) ** 2))); pset(59 + i, yy, hex('#f0ece0')); } for (let j = 0; j < 4; j++) for (let i = 61 + j; i <= 68 - j; i++) pset(i, 118 - j, j % 2 ? f_hoyK.ventanaL : hex('#c8c0a8'));
    rect(61, 120, 68, 140, hex('#1c1c24')); rect(62, 121, 67, 139, hex('#2a2a36')); rect(62, 129, 67, 129, hex('#1c1c24')); pset(66, 130, C.oro); rect(59, 120, 60, 136, f_hoyK.ventanaL); rect(69, 120, 70, 136, f_hoyK.ventanaL);
    for (let s = 0; s < 3; s++) rect(57 - s * 2, 137 + s, 72 + s * 2, 137 + s, s % 2 ? hex('#d8d0c0') : hex('#f0ece0')); }
  // 2 · las tres brownstones: piedra rojiza con sus hiladas, cornisa de ménsulas, escalinata con barandilla de hierro,
  // mirador, jardineras; y el depósito de agua de madera en el tejado
  for (let k = 0; k < 3; k++) { const a = 88 + k * 26, b = a + 25, dx = a + 15;
    for (let y = 58; y < 141; y++) for (let x = a; x <= b; x++) { let c = (y - 58) % 6 === 0 ? C.brownS : C.brown; if (x === a) c = C.brownL; if (x > b - 3) c = f_hoyMezcla(c, C.k, 0.15); if (h(x, y, 693 + k) < 0.1) c = f_hoyMezcla(c, C.brownL, 0.6); B[y * 320 + x] = c; }
    rect(a - 1, 52, b + 1, 57, hex('#3a2a24')); rect(a - 1, 52, b + 1, 52, hex('#6a5044')); for (let x = a; x <= b; x += 3) { rect(x, 56, x, 58, hex('#3a2a24')); pset(x + 1, 55, hex('#6a5044')); } rect(a - 1, 57, b + 1, 57, hex('#1c1418'));
    for (const y of [62, 78]) for (const x of [a + 4, a + 15]) { ventana(x, y, 6, 10, hex('#f0e8d8'), true, k === 1 && y === 62 ? hex('#c8a0c8') : null); rect(x - 1, y - 2, x + 6, y - 2, C.brownL); rect(x - 1, y + 11, x + 6, y + 11, C.brownL); }
    if (k === 1) { rect(a + 2, 92, a + 13, 110, C.brownS); rect(a + 2, 92, a + 13, 92, C.brownL); ventana(a + 4, 95, 3, 12, hex('#f0e8d8'), false); ventana(a + 9, 95, 3, 12, hex('#f0e8d8'), false); rect(a + 1, 111, a + 14, 112, C.brownL); }
    else { ventana(a + 4, 94, 6, 14, hex('#f0e8d8')); rect(a + 3, 108, a + 11, 110, hex('#5a3a28')); for (let i = 0; i < 4; i++) pset(a + 4 + i * 2, 107, [C.rojo, C.amarillo, hex('#e87a9a'), C.blanco][(i + k) % 4]); }
    rect(dx, 92, dx + 8, 112, C.brownS); disco(dx + 4, 93, 4, C.brownS); rect(dx + 1, 95, dx + 7, 112, hex('#4a2a1e')); rect(dx + 1, 95, dx + 7, 97, f_hoyK.ventanaL); pset(dx + 6, 104, C.oro); rect(dx + 4, 98, dx + 4, 112, hex('#3a2016'));
    // la escalinata que baja a la acera, con sus peldaños y la barandilla
    for (let s = 0; s < 14; s++) { const y = 113 + s * 2, x0 = dx - 2 - s, x1 = dx + 10; rect(x0, y, x1, y + 1, s % 2 ? C.brownS : C.brown); rect(x0, y, x1, y, C.brownL); }
    linea(dx - 3, 111, dx - 17, 139, C.k); linea(dx - 3, 108, dx - 17, 136, C.k); for (let i = 0; i < 5; i++) linea(dx - 3 - i * 3, 108 + i * 6, dx - 3 - i * 3, 111 + i * 6, C.k); disco(dx - 17, 136, 1, C.k);
    ventana(a + 3, 128, 5, 7, C.k, false); for (let x = a + 2; x < a + 9; x += 2) rect(x, 127, x, 136, C.k); }
  { const tx = 119; rect(tx, 46, tx, 52, C.maderaD); rect(tx + 10, 46, tx + 10, 52, C.maderaD); linea(tx, 48, tx + 10, 51, C.maderaD); rect(tx - 1, 32, tx + 11, 45, C.madera); rect(tx + 7, 32, tx + 11, 45, C.maderaS); for (const y of [35, 39, 43]) rect(tx - 1, y, tx + 11, y, hex('#3a3a46')); for (let x = tx; x < tx + 11; x += 2) pset(x, 33 + (x % 4), C.maderaL);
    poligono([[tx - 2, 32], [tx + 5, 25], [tx + 12, 32]], hex('#5a5e6a')); linea(tx + 5, 25, tx + 12, 32, hex('#3a3e4a')); pset(tx + 5, 24, C.grisL); }
  // 3 · el rascacielos art déco en escalones: pilares de caliza, columnas de ventanas, frisos dorados en zigzag, la corona
  // de arcos de acero con sus ventanas triangulares y la aguja; abajo, la gran puerta de bronce
  { const tiers = [[166, 234, 84], [172, 228, 62], [180, 220, 44], [188, 212, 30]];
    for (const [a, b, top] of tiers) { for (let y = top; y < 141; y++) for (let x = a; x <= b; x++) { const fx = x - a; let c = fx % 3 === 1 ? f_hoyMezcla(hex('#5a6470'), C.deco, (y - top) % 3 === 0 ? 0.6 : 0) : C.deco; if (x > b - 6) c = f_hoyMezcla(c, C.decoS, 0.6); if (x === a) c = C.blanco; B[y * 320 + x] = c;
        if (fx % 3 === 1 && (y - top) % 3 === 1 && y < 108) V.push([x, y, 1, 2, h(x, y, 694), 1]); }
      for (let x = a; x <= b; x++) { pset(x, top, C.blanco); pset(x, top + 1, (x % 4 < 2) ? C.oro : C.oroS); pset(x, top + 2, (x % 4 === 1) ? C.oro : C.decoS); } }
    const cx = 200; for (let j = 0; j < 4; j++) { const r = 11 - j * 2.6, yb = 30 - j * 4; for (let y = Math.round(yb - r); y <= yb; y++) for (let x = Math.round(cx - r); x <= Math.round(cx + r); x++) { const d = Math.hypot(x - cx, (y - yb) * 1.25); if (d > r) continue; let c = d > r - 1.2 ? hex('#f0f4f8') : x > cx + r * 0.4 ? hex('#8a96a4') : hex('#c8d2dc'); if (d < r - 2 && d > r - 4 && (Math.round(Math.atan2(y - yb, x - cx) * 6)) % 2 === 0) { c = hex('#2a3440'); if (y < yb - 1) V.push([x, y, 1, 1, 0.1 + j * 0.05, 0]); } pset(x, y, c); } }
    linea(cx, 17, cx, 4, hex('#e8ecf0')); linea(cx + 1, 16, cx + 1, 8, hex('#8a96a4'));
    rect(192, 112, 208, 140, hex('#5a4a2a')); for (let j = 0; j < 10; j++) { const r = Math.round(Math.sqrt(Math.max(0, 64 - (j - 8) ** 2 * 0.8))); rect(200 - r, 104 + j, 200 + r, 104 + j, hex('#c8a040')); } rect(194, 114, 206, 140, hex('#2a2016')); for (let x = 196; x < 206; x += 3) rect(x, 116, x + 1, 139, hex('#8a6a30')); for (let i = 0; i < 7; i++) linea(200, 112, 194 + i * 2, 104, hex('#e8c860'));
    rect(166, 108, 234, 109, C.oro); rect(166, 110, 234, 110, C.oroS); for (const x of [172, 220]) ventana(x, 118, 10, 16, hex('#8a6a30'));
    rect(236, 96, 236, 100, C.k); }
  // 4 · la torre de cristal: muro de cortina azul oscuro con aletas verticales y el remate en bisel
  for (let y = 18; y < 141; y++) for (let x = 236; x <= 276; x++) { if (y < 18 + Math.round((x - 236) * 0.3)) continue; const g = (y - 18) / 122; let c = f_hoyMezcla(hex('#5a8ab8'), hex('#1e3a5a'), Math.min(1, g * 1.3)); if ((x - 236) % 3 === 0) c = f_hoyMezcla(c, hex('#a8c8e0'), 0.35); if (y % 4 === 0) c = f_hoyMezcla(c, C.k, 0.2);
    if (x > 268) c = f_hoyMezcla(c, C.k, 0.25); if ((x * 2 - y + 400) % 61 < 5) c = f_hoyMezcla(c, C.blanco, 0.32); B[y * 320 + x] = c; if (y % 4 === 2 && (x - 236) % 3 === 1 && y < 126) V.push([x, y, 2, 1, h(x, y, 695), 4]); }
  for (let x = 236; x <= 276; x++) pset(x, 18 + Math.round((x - 236) * 0.3), hex('#d8ecf8'));
  rect(236, 126, 276, 140, hex('#1c2a38')); for (let x = 238; x < 276; x += 6) rect(x, 126, x, 140, hex('#8aa8c0')); rect(236, 125, 276, 125, hex('#c8d8e4'));
  // el bloque de los sesenta a la derecha
  for (let y = 96; y < 141; y++) for (let x = 277; x < 320; x++) { let c = (y - 96) % 6 < 3 ? hex('#3a5a7a') : hex('#d8d8d0'); if ((x - 277) % 7 === 0) c = hex('#8a8e90'); B[y * 320 + x] = c; if ((y - 96) % 6 === 1 && (x - 277) % 7 === 3) V.push([x - 2, y, 5, 1, h(x, y, 696), 4]); }
  rect(277, 94, 319, 95, hex('#e8e8e0')); rect(290, 88, 304, 93, hex('#8a8e90')); for (let x = 291; x < 304; x += 2) pset(x, 90, hex('#5a5e60'));
  // la época resaltada: las demás se apagan un poco hacia el gris azulado
  if (res != null) { const R5 = [[0, 41], [42, 88], [88, 165], [166, 235], [236, 276]], [ra, rb] = R5[res] ?? [-1, -1]; for (let y = 0; y < 141; y++) for (let x = 0; x < 320; x++) { if (x >= ra && x <= rb) continue; const i = y * 320 + x; if (B[i] !== f_hoyVACIO) B[i] = f_hoyMezcla(B[i], hex('#6a7488'), 0.45); } }
  // la acera de losas con sus juntas y manchas, el bordillo de granito, la cuneta y la calzada con el paso de cebra
  for (let y = 141; y < 157; y++) for (let x = 0; x < 320; x++) { let c = C.acera; if ((x + Math.round((y - 141) * (x - 160) / 90)) % 20 === 0 || y === 148) c = C.aceraS; else if (h(x, y, 697) < 0.04) c = hex('#8a8694'); else if (h(x >> 1, y, 698) < 0.03) c = hex('#c0bcc8'); B[y * 320 + x] = c; }
  rect(0, 141, 319, 141, hex('#7a7684')); rect(0, 156, 319, 157, hex('#c8c4cc')); rect(0, 158, 319, 158, C.aceraS); rect(0, 159, 319, 159, hex('#34343e'));
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 699); B[y * 320 + x] = q < 0.06 ? C.asfaltoS : q > 0.965 ? hex('#5a5a6c') : C.asfalto; }
  for (let y = 161; y < 180; y++) for (let x = 0; x < 34; x++) if ((x + Math.round((y - 160) * 0.2)) % 8 < 4) B[y * 320 + x] = h(x, y, 700) < 0.1 ? hex('#c8c8c8') : hex('#e8e8e4');
  for (let x = 40; x < 320; x += 30) rect(x, 169, x + 14, 169, C.linea);
  for (const [x0, y0] of [[60, 175], [230, 164]]) for (let i = 0; i < 16; i++) pset(x0 + i, y0 + Math.round(Math.sin(i * 0.7 + x0) * 1.5), hex('#2e2e3a'));
  { const mx = 118, my = 175; for (let j = -2; j <= 2; j++) for (let i = -7; i <= 7; i++) { const e = (i / 7.5) ** 2 + (j / 2.6) ** 2; if (e < 1) pset(mx + i, my + j, e > 0.65 ? C.k : (i + j) % 3 ? hex('#5a5a66') : hex('#46464e')); } }
  // los árboles de la acera con su alcorque (por delante de las fachadas)
  for (const [ax, sem] of [[96, 0], [264, 1]]) { rect(ax - 6, 149, ax + 6, 151, hex('#5a4a3a')); rect(ax - 6, 149, ax + 6, 149, hex('#3a3a3a')); for (let i = ax - 5; i < ax + 6; i += 2) pset(i, 150, hex('#3a3a3a'));
    rect(ax - 1, 104, ax + 1, 150, C.cortezaS); rect(ax - 1, 104, ax - 1, 150, C.corteza); linea(ax, 112, ax - 7, 102, C.cortezaS); linea(ax, 108, ax + 8, 98, C.cortezaS); }
  // la boca de riego, el buzón azul, el poste del semáforo, la farola y la boca de metro con su barandilla verde
  rect(110, 143, 114, 150, C.k); rect(111, 144, 113, 150, hex('#c83a3a')); rect(110, 142, 114, 143, hex('#e85a4a')); rect(109, 145, 115, 146, hex('#a82a2a')); pset(111, 144, hex('#f08a7a'));
  rect(52, 136, 60, 150, C.k); rect(53, 137, 59, 149, hex('#2a4fa8')); rect(52, 135, 60, 137, hex('#3a62c0')); rect(54, 140, 58, 140, hex('#1c3478')); rect(53, 149, 54, 150, C.k); rect(58, 149, 59, 150, C.k);
  rect(36, 92, 37, 150, hex('#3a3e46')); rect(36, 92, 36, 150, hex('#6a6e7a')); rect(33, 92, 40, 106, C.k); rect(34, 93, 39, 105, hex('#e8b830')); rect(35, 148, 38, 150, hex('#2a2e34'));
  { const x = 232; rect(x, 70, x + 1, 150, hex('#4a5058')); rect(x, 70, x, 150, hex('#7a808a')); linea(x + 1, 70, x - 10, 66, hex('#4a5058')); rect(x - 15, 64, x - 8, 66, C.k); rect(x - 14, 66, x - 9, 66, hex('#c8ccd4')); rect(x - 1, 147, x + 2, 150, C.k); }
  { rect(282, 132, 318, 150, hex('#1c1c24')); for (let s = 0; s < 6; s++) rect(284, 140 + s * 2, 316, 140 + s * 2, hex('#3a3a46')); rect(282, 132, 318, 133, K.verdeMetro); for (let x = 282; x < 319; x += 4) rect(x, 133, x, 140, K.verdeMetro); rect(282, 136, 318, 136, K.verdeMetro); rect(282, 132, 318, 132, K.verdeMetroL);
    for (const x of [284, 316]) { rect(x - 1, 118, x, 132, K.verdeMetro); } }
  return { V };
}

// el carrito de comida con su sombrilla a franjas, la plancha y el vapor (x: el centro; base: la acera)
function f_hoyCarrito(R, x, base, t, k) {
  const { rect, pset, linea, disco } = R;
  for (let i = 0; i < 4; i++) { const u = (t * 0.5 + i / 4) % 1, sx = Math.round(x + 4 + Math.sin(t * 1.3 + i) * 2 + u * 3), sy = Math.round(base - 22 - u * 18); if (u < 0.85) disco(sx, sy, u < 0.3 ? 1 : 2, k(u > 0.55 ? hex('#d8dce0') : hex('#f4f6f8'))); }
  linea(x, base - 36, x, base - 18, k(hex('#8a8e96'))); for (let j = 0; j < 8; j++) { const w = 4 + j * 2; for (let i = -w; i <= w; i++) pset(x + i, base - 44 + j, k(Math.floor((i + 40) / 5) % 2 ? C.amarillo : C.azul)); } rect(x - 18, base - 36, x + 18, base - 36, k(f_hoyMezcla(C.azul, C.k, 0.3)));
  rect(x - 13, base - 18, x + 13, base - 4, k(C.k)); rect(x - 12, base - 17, x + 12, base - 5, k(hex('#d8dce0'))); rect(x - 12, base - 17, x + 12, base - 16, k(C.blanco)); rect(x - 12, base - 11, x + 12, base - 10, k(C.rojo)); for (let i = x - 10; i < x + 11; i += 4) pset(i, base - 14, k(hex('#a8acb4')));
  rect(x - 10, base - 20, x + 2, base - 18, k(hex('#5a5e66'))); for (let i = 0; i < 3; i++) rect(x - 9 + i * 4, base - 21, x - 7 + i * 4, base - 20, k(hex('#c87a4a')));
  rect(x + 4, base - 21, x + 6, base - 18, k(C.rojo)); rect(x + 8, base - 21, x + 10, base - 18, k(C.amarillo));
  disco(x - 8, base - 2, 2, k(C.k)); disco(x + 8, base - 2, 2, k(C.k)); pset(x - 8, base - 2, k(C.grisL)); pset(x + 8, base - 2, k(C.grisL)); rect(x + 13, base - 14, x + 17, base - 13, k(hex('#8a8e96')));
}

// un taxi amarillo de lado (x: centro; suelo: la calzada; dir ±1), con su luz en el techo, ruedas que giran y faros
function f_hoyTaxi(R, x, suelo, dir, t, k, noche) {
  const { rect, pset, disco } = R, P = f_hoyK;
  rect(x - 18, suelo - 2, x + 18, suelo - 1, k(f_hoyMezcla(C.asfalto, C.k, 0.4)));
  rect(x - 17, suelo - 9, x + 17, suelo - 3, k(C.k)); rect(x - 16, suelo - 8, x + 16, suelo - 4, k(P.taxi)); rect(x - 16, suelo - 8, x + 16, suelo - 8, k(P.taxiL)); rect(x - 16, suelo - 5, x + 16, suelo - 4, k(P.taxiS));
  rect(x - 10, suelo - 14, x + 9, suelo - 8, k(C.k)); rect(x - 9, suelo - 13, x + 8, suelo - 9, k(P.taxi)); rect(x - 8, suelo - 12, x - 1, suelo - 9, k(f_hoyK.ventanaL)); rect(x + 1, suelo - 12, x + 7, suelo - 9, k(f_hoyK.ventana)); pset(x - 7, suelo - 12, k(C.blanco));
  rect(x - 3, suelo - 16, x + 2, suelo - 15, k(C.k)); rect(x - 2, suelo - 16, x + 1, suelo - 16, noche ? P.luz1 : k(C.blanco));
  rect(x - 16, suelo - 6, x + 16, suelo - 6, k(C.k)); for (let i = x - 14; i < x + 15; i += 4) pset(i, suelo - 6, k(C.blanco));
  const fr = x + dir * 16; rect(fr - (dir > 0 ? 1 : 0), suelo - 7, fr + (dir > 0 ? 0 : 1), suelo - 6, noche ? P.luz3 : k(hex('#f8f0c0'))); pset(x - dir * 16, suelo - 7, C.rojo);
  for (const dx of [-10, 10]) { disco(x + dx, suelo - 2, 3, k(C.k)); disco(x + dx, suelo - 2, 1, k(C.grisL)); const a = t * 9 * dir; pset(Math.round(x + dx + Math.cos(a) * 2), Math.round(suelo - 2 + Math.sin(a) * 2), k(C.grisS)); }
}

function f_hoyCapasCalle(R, t, o, luz, en) {
  const { rect, pset, disco, linea } = R, k = (c) => f_hoyCol(c, luz), K = f_hoyK, res = o.resalta ?? null, noche = luz === 'anochecer';
  f_hoyCielo(R, t, { hor: 142, modo: luz, sol: luz === 'tarde' ? [140, 70, 12] : luz === 'dia' ? [70, 36, 8] : null, luna: [70, 34, 5], estela: [30, 0.06], cumulos: 4 });
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 48, cada: 12, v: 40, semilla: 3 });
  const c = f_hoyCapa(R, 'capas|' + luz + '|' + res, luz, () => f_hoyCapasFijo(R, res));
  f_hoyPegar(R, c.b, 0, 180); f_hoyLuces(R, t, c.V, en);
  f_hoyReflejos(R, t, 237, 30, 275, 124, luz, 0.25);
  // la vida de las ventanas: alguien pasa por detrás de una cortina, un gato que mueve la cola en una ventana de brownstone
  { const u = (t % 9) / 9; if (u > 0.2 && u < 0.8) { R.recorte([139, 78, 144, 87]); const sx = Math.round(136 + (u - 0.2) / 0.6 * 12); rect(sx, 82, sx + 2, 87, k(hex('#4a5a6a'))); disco(sx + 1, 81, 1, k(hex('#4a5a6a'))); R.recorte(null); }
    const gx = 93, gy = 107; rect(gx, gy - 3, gx + 3, gy, k(hex('#2a2a2a'))); pset(gx, gy - 4, k(hex('#2a2a2a'))); pset(gx + 2, gy - 4, k(hex('#2a2a2a'))); pset(gx + 1, gy - 2, k(C.amarillo)); const cola = Math.sin(t * 2) > 0 ? 1 : 0; pset(gx + 4, gy - 1 - cola, k(hex('#2a2a2a'))); pset(gx + 5, gy - 2 - cola, k(hex('#2a2a2a'))); }
  // la luz del semáforo, que cambia; las farolas verdes del metro; la farola de la calle
  { const f = t % 12, cl = f < 5 ? 2 : f < 6.5 ? 1 : 0; for (let i = 0; i < 3; i++) disco(36, 96 + i * 4, 1, i === cl ? [C.rojo, C.amarillo, hex('#4ae87a')][i] : k(hex('#4a4030'))); }
  for (const x of [284, 316]) { disco(x, 116, 3, C.k); disco(x, 116, 2, noche || luz === 'tarde' ? hex('#8af0a0') : k(hex('#4aa86a'))); pset(x - 1, 115, k(hex('#c8f8d0'))); }
  if (luz !== 'dia') { rect(218, 66, 223, 66, K.farolaL); for (let j = 0; j < 12; j++) for (let i = -6; i <= 6; i++) if (f_hoyU(220 + i, 68 + j) < 0.4 * (1 - j / 12)) pset(220 + i, 68 + j, f_hoyMezcla(R.pget(220 + i, 68 + j), K.farolaL, 0.4)); }
  // las copas de los árboles de la acera, que se mecen y sueltan alguna hoja
  for (const [ax, sem] of [[96, 0], [264, 1]]) { const m = Math.round(Math.sin(t * 0.9 + sem * 2) * 1.2), bolas = [[0, 86, 13], [-11, 92, 9], [11, 91, 10], [-5, 80, 9], [6, 79, 8]];
    for (const [dx, y, r] of bolas) disco(ax + dx + m, y, r + 1, k(hex('#2a4a1e'))); for (const [dx, y, r] of bolas) disco(ax + dx + m, y, r, k(hex('#5a9a3a'))); for (const [dx, y, r] of bolas) disco(ax + dx - 2 + m, y - 2, Math.round(r * 0.62), k(hex('#7aba4a'))); for (const [dx, y, r] of bolas) disco(ax + dx - 3 + m, y - 4, Math.round(r * 0.28), k(hex('#a8d870')));
    for (let i = 0; i < 12; i++) { const a = h(i, sem, 701) * 6.28, r = 4 + h(i, sem, 702) * 12; if (Math.sin(t * 3 + i * 1.3) > 0.3) pset(Math.round(ax + m + Math.cos(a) * r), Math.round(86 + Math.sin(a) * r * 0.7), k(hex('#a8d870'))); }
    const u = ((t * 0.12 + sem * 0.5) % 1), lx = Math.round(ax - 6 + u * 24 + Math.sin(t * 2) * 3), ly = Math.round(92 + u * 56); pset(lx, ly, k(hex('#c8b040'))); }
  // el carrito de comida
  f_hoyCarrito(R, 140, 150, t, k);
  // la chimenea naranja y blanca de la alcantarilla, con su vapor que sube y se deshace
  { const x = 300, b = 168; for (let i = 0; i < 7; i++) { const u = (t * 0.35 + i / 7) % 1, sx = Math.round(x + Math.sin(t * 1.1 + i * 2) * (2 + u * 6) + u * 6), sy = Math.round(b - 16 - u * 60); if (sy > 0) disco(sx, sy, Math.round(2 + u * 5), k(u > 0.6 ? hex('#c8ccd4') : hex('#eef0f4'))); }
    for (let y = b - 16; y <= b; y++) { const w = Math.round(2 + (y - b + 16) * 0.25), c = Math.floor((y - b + 16) / 3) % 2 ? C.blanco : C.naranja; rect(x - w, y, x + w, y, k(c)); pset(x + w, y, k(f_hoyMezcla(c, C.k, 0.25))); } }
  // los taxis: dos carriles, cada uno a su ritmo; la bici del repartidor
  for (const [v, y, dir, fase] of [[38, 168, 1, 0], [-46, 179, -1, 5], [30, 168, 1, 9]]) { const x = Math.round(((fase * 40 + t * v) % 420 + 420) % 420) - 50; f_hoyTaxi(R, x, y, dir, t, k, noche); }
  { const x = Math.round(330 - ((t * 24 + 100) % 400)), y = 178; disco(x - 4, y - 2, 2, k(C.k)); disco(x + 4, y - 2, 2, k(C.k)); linea(x - 4, y - 2, x, y - 6, k(C.rojo)); linea(x, y - 6, x + 4, y - 2, k(C.rojo)); f_hoyPersonita(R, x, y - 5, t, 2, k, false, 9); rect(x + 1, y - 13, x + 4, y - 10, k(C.verde)); }
  // las palomas de la acera
  for (const [x0, s] of [[70, 0], [180, 1]]) { const x = Math.round(x0 + Math.sin(t * 0.5 + s * 3) * 6), dd = Math.cos(t * 0.5 + s * 3) > 0 ? 1 : -1, pica = Math.floor(t * 3 + s) % 4 === 0; rect(x - 2, 152, x + 2, 154, k(hex('#7a7e8e'))); pset(x - 2 * dd, 155, k(C.naranja)); pset(x + 2 * dd, 155, k(C.naranja)); const hy = pica ? 154 : 151; rect(x + 3 * dd, hy, x + 3 * dd, hy + 1, k(hex('#5a6a7a'))); }
  return { suelo: 152, pies: [44, 300], epocas: { holandesa: [0, 41], federal: [42, 88], brownstones: [88, 165], deco: [166, 235], cristal: [236, 276] }, puertas: { holandesa: [21, 140], federal: [65, 140], brownstones: [[103, 112], [129, 112], [155, 112]], deco: [200, 140] }, escalinatas: [[103, 112, 89, 140], [129, 112, 115, 140], [155, 112, 141, 140]], carrito: [140, 150], bocaRiego: [112, 150], buzon: [56, 150], metro: [282, 318, 150], arboles: [96, 264], calzada: [160, 180], taxis: [168, 179], vapor: [300, 168] };
}

// la geometría del puente: las torres, el tablero y los cables
const f_hoyPT = { L: 53, Rr: 268, top: 20, base: 101 };

const f_hoyDeck = (x) => Math.round(74 - 4 * Math.sin(Math.PI * x / 320));

const f_hoyCable = (x) => { const { L, Rr, top } = f_hoyPT; if (x >= L && x <= Rr) { const u = (x - (L + Rr) / 2) / ((Rr - L) / 2); return Math.round(top + 2 + 44 * (1 - u * u)); } const d = x < L ? L - x : x - Rr; return Math.min(f_hoyDeck(x) - 1, Math.round(top + 2 + d * 1.5)); };

// el fondo fijo del puente: el mar abierto al fondo, las dos colinas con casas, bloques, árboles y el fuerte de piedra, y
// el puente entero (torres de acero con sus traviesas, cables, péndolas y el tablero de celosía)
function f_hoyPuenteFondo(R) {
  const { rect, pset, linea, disco } = R, K = f_hoyK, B = R.buf, V = [];
  // la colina de la izquierda (Staten Island) y la de la derecha (Brooklyn), con su linde tramada de árboles
  const yl = (x) => Math.round(56 + 44 * Math.pow(Math.min(1, x / 120), 1.5) + Math.sin(x * 0.2) * 1.5), yd = (x) => Math.round(100 - 38 * Math.pow(Math.max(0, (x - 200) / 120), 0.8) + Math.sin(x * 0.25) * 1.5);
  for (let x = 0; x < 320; x++) { const y0 = x < 160 ? yl(x) : yd(x); for (let y = y0; y <= 101; y++) { const p = (y - y0) / 12; let c = h(x, y, 703) < 0.18 ? hex('#4a7a3a') : h(x, y, 704) < 0.12 ? hex('#2e5a2a') : hex('#3e6a34'); if (y === y0) c = hex('#6a9a4a'); if (p > 4 && f_hoyU(x, y) < 0.3) c = hex('#5a7a5a'); B[y * 320 + x] = c; } }
  // casas y bloques entre los árboles (sus ventanas se encienden)
  for (let k = 0; k < 46; k++) { const left = k % 2 === 0, x = left ? Math.round(4 + h(k, 1, 705) * 104) : Math.round(214 + h(k, 1, 705) * 104), y0 = left ? yl(x) : yd(x), y = Math.round(y0 + 4 + h(k, 2, 705) * Math.max(1, 96 - y0 - 6)); if (y > 98) continue;
    const alto = !left && k % 5 === 1, w = alto ? 8 : 5, hh = alto ? 14 : 4, c = [hex('#e8e0d0'), hex('#c8b8a0'), hex('#d8c8b8'), hex('#b8a088')][k % 4];
    rect(x, y - hh, x + w, y, c); rect(x + w - 1, y - hh, x + w, y, f_hoyMezcla(c, C.k, 0.25)); if (!alto) { rect(x - 1, y - hh - 2, x + w + 1, y - hh - 1, k % 3 ? hex('#8a4a3a') : hex('#5a5e6a')); }
    for (let j = y - hh + 1; j < y - 1; j += 3) for (let i = x + 1; i < x + w - 1; i += 2) { pset(i, j, f_hoyK.ventana); V.push([i, j, 1, 1, h(i, j, 706), k]); } }
  for (let k = 0; k < 70; k++) { const left = k % 2 === 0, x = left ? Math.round(h(k, 3, 707) * 118) : Math.round(204 + h(k, 3, 707) * 116), y0 = left ? yl(x) : yd(x), y = Math.round(y0 + 2 + h(k, 4, 707) * Math.max(1, 98 - y0 - 3)); const r = 2 + (k % 3); disco(x, y, r, hex('#2e5a2a')); disco(x - 1, y - 1, r - 1, hex('#4a8a3a')); pset(x - 1, y - r + 1, hex('#7aba5a')); }
  // los fuertes de piedra a la orilla, con su muro y sus troneras
  for (const [a, b] of [[86, 120], [206, 236]]) { rect(a, 92, b, 101, hex('#a8a090')); rect(a, 92, b, 92, hex('#c8c0b0')); for (let x = a + 2; x < b; x += 5) rect(x, 95, x + 1, 97, hex('#4a463e')); for (let y = 94; y < 101; y += 3) for (let x = a; x < b; x += 6) pset(x + (y % 2) * 3, y, hex('#8a8272')); }
  // el puente: las péndolas, el tablero de celosía, los cables y las dos torres de acero (delante del tablero)
  for (let x = 0; x < 320; x += 4) { const yc = f_hoyCable(x) + 1, yd2 = f_hoyDeck(x) - 1; if (yd2 > yc) linea(x, yc, x, yd2, hex('#9aa4b0')); }
  for (let x = 0; x < 320; x++) { const y = f_hoyDeck(x); pset(x, y - 1, hex('#e0e4e8')); pset(x, y, hex('#b8c0c8')); pset(x, y + 1, hex('#6a7480')); const z = (x % 8); for (let j = 2; j < 7; j++) pset(x, y + j, (z === j || 8 - z === j) ? hex('#8a94a0') : hex('#3e4652')); pset(x, y + 7, hex('#7a8490')); pset(x, y + 8, hex('#2e343e')); }
  for (let x = 0; x < 320; x++) { const y = f_hoyCable(x); if (y >= f_hoyDeck(x) - 1) continue; pset(x, y, hex('#5a6470')); pset(x, y + 1, hex('#8a94a0')); }
  for (const cx of [f_hoyPT.L, f_hoyPT.Rr]) { const top = f_hoyPT.top, base = f_hoyPT.base;
    for (const s of [-1, 1]) for (let y = top; y <= base; y++) { const ens = Math.round((y - top) / (base - top) * 1.5), x0 = cx + s * 5 - 2 - (s < 0 ? ens : 0), x1 = cx + s * 5 + 1 + (s > 0 ? ens : 0); for (let x = x0; x <= x1; x++) { let c = x === x0 ? K.aceroL : x === x1 ? K.aceroS : K.acero; if ((y - top) % 7 === 0) c = f_hoyMezcla(c, C.k, 0.15); pset(x, y, c); } }
    for (const [y0, hh] of [[top, 4], [top + 20, 3], [top + 38, 3], [f_hoyDeck(cx) + 9, 3]]) { rect(cx - 7, y0, cx + 7, y0 + hh - 1, K.acero); rect(cx - 7, y0, cx + 7, y0, K.aceroL); rect(cx - 7, y0 + hh - 1, cx + 7, y0 + hh - 1, K.aceroS); }
    rect(cx - 10, 99, cx + 10, 101, hex('#8a8478')); rect(cx - 10, 99, cx + 10, 99, hex('#b0a898')); }
  return { V };
}

// lo de delante del puente, fijo: las rocas de la escollera, la barandilla verde del paseo, las baldosas hexagonales, la
// farola, el banco y la caña de pescar apoyada con su cubo y su caja de aparejos
function f_hoyPuenteDelante(R) {
  const { rect, pset, linea, disco } = R, B = R.buf;
  for (let k = 0; k < 30; k++) { const x = Math.round(k * 11 + h(k, 1, 708) * 6), y = 146 + Math.round(h(k, 2, 708) * 4), r = 5 + Math.round(h(k, 3, 708) * 3); for (let j = -r; j <= r; j++) for (let i = -r - 2; i <= r + 2; i++) { const e = (i / (r + 2)) ** 2 + (j / r) ** 2; if (e > 1) continue; const l = (-i * 0.6 - j) / r; pset(x + i, y + j, e > 0.8 ? hex('#4a4a52') : l > 0.4 ? hex('#a8a4a8') : l > -0.2 ? hex('#8a868e') : hex('#62606a')); } }
  for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const q = y - 154, s = 6 + q * 0.12, hx = x / (s * 1.5), hy = (q + 2) / s, col = Math.floor(hx), fy = hy + (col % 2) * 0.5, row = Math.floor(fy), dx = hx - col, dy = fy - row;
    let c = (col + row) % 3 === 0 ? hex('#a89e8e') : hex('#b8ae9e'); if (dy < 0.12 || (dx < 0.12)) c = hex('#6a6458'); else if (h(col, row, 709) < 0.15) c = hex('#9a9080'); else if (dy < 0.3 && dx > 0.2) c = f_hoyMezcla(c, C.blanco, 0.12); B[y * 320 + x] = c; }
  rect(0, 154, 319, 154, hex('#d0c8b8'));
  for (const y of [143, 149]) { rect(0, y, 319, y + 1, f_hoyK.verdeMetro); rect(0, y, 319, y, f_hoyK.verdeMetroL); }
  for (let x = 10; x < 320; x += 24) { rect(x, 142, x + 1, 155, f_hoyK.verdeMetro); pset(x, 142, f_hoyK.verdeMetroL); rect(x - 1, 154, x + 2, 155, hex('#1e4a34')); }
  { const x = 22; rect(x - 1, 92, x + 1, 155, hex('#2a3038')); rect(x - 1, 92, x - 1, 155, hex('#5a6470')); rect(x - 3, 150, x + 3, 155, hex('#2a3038')); rect(x - 4, 88, x + 4, 91, hex('#2a3038')); disco(x, 84, 4, C.k); disco(x, 84, 3, hex('#e8e0c8')); pset(x - 1, 82, C.blanco); rect(x - 1, 79, x + 1, 80, hex('#2a3038')); }
  { const a = 278, b = 314; for (const y of [150, 153]) { rect(a, y, b, y + 1, C.maderaS); rect(a, y, b, y, C.maderaL); } rect(a - 1, 159, b + 1, 161, C.maderaS); rect(a - 1, 159, b + 1, 159, C.maderaL); for (const x of [a + 2, b - 2]) { rect(x, 149, x + 1, 167, hex('#2a3038')); } rect(a, 167, b + 2, 168, hex('#7a7466')); }
  { linea(236, 168, 250, 128, hex('#3a3a46')); linea(237, 168, 251, 128, hex('#5a5a66')); rect(239, 158, 242, 161, C.k); pset(240, 159, C.grisL); R.poligono([[221, 160], [233, 160], [231, 170], [223, 170]], C.k); R.poligono([[222, 161], [232, 161], [230, 169], [224, 169]], hex('#8a96a4')); rect(222, 161, 232, 161, hex('#c8d2dc')); rect(223, 162, 231, 162, hex('#2a4a6a')); pset(226, 162, hex('#c8d2dc')); for (let i = 0; i <= 10; i++) pset(222 + i, Math.round(158 - Math.sin(i / 10 * Math.PI) * 4), C.k); for (let y = 164; y < 169; y += 2) pset(224 + (y % 4), y, hex('#6a7686')); rect(244, 164, 256, 170, C.k); rect(245, 165, 255, 169, hex('#3a7a4a')); rect(245, 167, 255, 167, hex('#2a5a34')); pset(250, 166, C.oro); rect(222, 171, 256, 172, hex('#8a8272')); }
  return {};
}

// el portacontenedores visto de frente que entra y crece (cx: centro; y: flotación; s: escala), con su ola de proa,
// las pilas de contenedores de colores, el puente de mando blanco con sus ventanas y la chimenea
function f_hoyBarco(R, cx, y, s, t, k, en) {
  const { rect, pset, poligono, disco } = R, W = Math.max(8, Math.round(96 * s)), hc = Math.max(3, Math.round(16 * s)), cc = Math.max(2, Math.round(14 * s)), bb = Math.max(3, Math.round(18 * s));
  // la ola de proa y la espuma, que se abren a los lados
  for (let i = 0; i < W * 0.8; i++) for (const sd of [-1, 1]) { const x = Math.round(cx + sd * (W * 0.12 + i)), yy = Math.round(y + 1 + i * 0.08 * s * 2 + Math.sin(t * 6 + i * 0.5) * s); if (h(i, Math.floor(t * 5), 710) < 1 - i / (W * 0.8)) pset(x, yy, k(f_hoyK.brillo)); }
  // la superestructura detrás (asoma por encima), la chimenea y su humo
  const sw = Math.round(W * 0.38); rect(cx - sw, y - hc - cc - bb, cx + sw, y - hc - cc, k(C.k)); rect(cx - sw + 1, y - hc - cc - bb + 1, cx + sw - 1, y - hc - cc, k(C.blanco)); rect(cx + Math.round(sw * 0.6), y - hc - cc - bb + 1, cx + sw - 1, y - hc - cc, k(hex('#c8ccd4')));
  for (let j = y - hc - cc - bb + 2; j < y - hc - cc - 1; j += Math.max(2, Math.round(3 * s))) for (let i = cx - sw + 2; i < cx + sw - 1; i += Math.max(2, Math.round(3 * s))) pset(i, j, en > h(i, j, 711) ? f_hoyK.luz1 : k(f_hoyK.ventana));
  rect(cx - sw - Math.round(4 * s), y - hc - cc - bb + Math.round(2 * s), cx + sw + Math.round(4 * s), y - hc - cc - bb + Math.round(4 * s), k(C.blanco));
  const fx = cx + Math.round(sw * 0.3), fh = Math.round(8 * s); rect(fx - Math.round(3 * s), y - hc - cc - bb - fh, fx + Math.round(3 * s), y - hc - cc - bb, k(C.k)); rect(fx - Math.round(2 * s), y - hc - cc - bb - fh + 1, fx + Math.round(2 * s), y - hc - cc - bb, k(C.rojo));
  for (let i = 0; i < 3; i++) { const u = (t * 0.4 + i / 3) % 1; disco(Math.round(fx + u * 12 * s), Math.round(y - hc - cc - bb - fh - 2 - u * 10 * s), Math.max(1, Math.round((1 + u * 2) * s)), k(hex('#b8b8c0'))); }
  // las pilas de contenedores
  const cw = Math.max(2, Math.round(6 * s)), cols = [C.rojo, C.azul, hex('#3a8a4a'), C.naranja, hex('#c8ccd4'), hex('#8a3a5a'), C.amarillo];
  for (let i = cx - Math.round(W * 0.44), n = 0; i < cx + Math.round(W * 0.44); i += cw, n++) { const top = y - hc - cc - (n % 3 === 1 ? Math.round(2 * s) : 0); const c = cols[(n * 3 + 1) % cols.length]; rect(i, top, i + cw - 1, y - hc, k(f_hoyMezcla(c, C.k, 0.35))); rect(i, top, i + cw - 2, y - hc - 1, k(c)); for (let j = top + 1; j < y - hc; j += Math.max(2, Math.round(4 * s))) rect(i, j, i + cw - 2, j, k(f_hoyMezcla(c, C.k, 0.2))); }
  // el casco en V de la proa: obra muerta oscura, la franja roja de la flotación y el ancla
  poligono([[cx - W / 2, y - hc], [cx + W / 2, y - hc], [cx + W * 0.1, y], [cx - W * 0.1, y]], k(hex('#1e2a44')));
  poligono([[cx - W / 2, y - hc], [cx, y - hc], [cx, y], [cx - W * 0.1, y]], k(hex('#2a3a5a')));
  rect(Math.round(cx - W / 2), y - hc, Math.round(cx + W / 2), y - hc, k(C.blanco)); rect(Math.round(cx - W * 0.12), y - Math.max(1, Math.round(2 * s)), Math.round(cx + W * 0.12), y, k(C.rojo));
  if (s > 0.4) { const ax = cx - Math.round(W * 0.2), ay = y - Math.round(hc * 0.6); disco(ax, ay, Math.max(1, Math.round(s * 1.5)), k(C.k)); }
  if (en > 0.2) { pset(cx, y - hc - cc - bb - fh - 1, C.blanco); pset(Math.round(cx - W / 2), y - hc - 1, C.rojo); pset(Math.round(cx + W / 2), y - hc - 1, hex('#4ae87a')); }
}

// la bahía de 1524 sobre el estrecho (a: 0–1): bosque pálido y tramado en las colinas, La Dauphine al fondo, tres
// canoas que reman y el bote de Verrazzano con sus marineros
function f_hoyFantasmaEstrecho(R, t, a) {
  const { pset, pget } = R, K = f_hoyK, F = (x, y, c, f = 0.7) => { if (x >= 0 && x < 320 && y >= 0 && y < 180 && f_hoyU(x, y) < a * 0.95) pset(x, y, f_hoyMezcla(pget(x, y), c, f * a + 0.15)); };
  const yl = (x) => Math.round(54 + 44 * Math.pow(Math.min(1, x / 120), 1.5)), yd = (x) => Math.round(98 - 38 * Math.pow(Math.max(0, (x - 200) / 120), 0.8));
  for (let x = 0; x < 320; x++) { if (x > 122 && x < 200) continue; const y0 = (x < 160 ? yl(x) : yd(x)) - 3; for (let y = y0; y <= 101; y++) { const copa = y > y0 + 2 || Math.hypot((x % 6) - 3, y - y0 - 3) < 3.2; if (copa) F(x, y, (x * 3 + y * 5) % 9 === 0 || y < y0 + 4 ? K.fantasma : K.fantasmaS, 0.6); } }
  // La Dauphine al fondo, bajo el puente
  { const x = 160 + Math.round(Math.sin(t * 0.3) * 2), y = 99; for (let i = -7; i <= 7; i++) { F(x + i, y, K.fantasmaS, 0.8); if (Math.abs(i) < 6) F(x + i, y - 1, K.fantasmaS, 0.8); } for (const [mx, hh] of [[-4, 9], [0, 12], [4, 8]]) { for (let j = 2; j < hh; j++) F(x + mx, y - j, K.fantasmaS, 0.8); for (let j = 3; j < hh - 1; j++) for (let i = -2; i <= 2; i++) F(x + mx + i, y - j, K.fantasma, 0.85); } }
  // las tres canoas y el bote de remos con los marineros
  for (let c = 0; c < 3; c++) { const x = Math.round(40 + c * 100 + ((t * (5 + c)) % 60) - 30), y = 116 + c * 6; for (let i = -8; i <= 8; i++) { F(x + i, y, K.fantasma, 0.85); F(x + i, y + 1, K.fantasmaS, 0.8); }
    for (const dx of [-4, 3]) { F(x + dx, y - 1, K.fantasma, 0.9); F(x + dx, y - 2, K.fantasma, 0.9); F(x + dx, y - 3, K.fantasma, 0.9); const r = Math.sin(t * 4 + dx + c) > 0 ? 1 : -1; F(x + dx + r, y - 1, K.fantasmaS, 0.9); F(x + dx + 2 * r, y + 1, K.fantasmaS, 0.9); } }
  { const x = 120, y = 132 + Math.round(Math.sin(t * 1.5)); for (let i = -12; i <= 12; i++) { F(x + i, y, K.fantasma, 0.9); F(x + i, y + 1, K.fantasmaS, 0.9); if (Math.abs(i) < 10) F(x + i, y + 2, K.fantasmaS, 0.9); }
    for (let m = 0; m < 4; m++) { const mx = x - 8 + m * 5; for (let j = 1; j < 5; j++) F(mx, y - j, K.fantasma, 0.95); F(mx, y - 6, K.fantasma, 0.95); const r = Math.sin(t * 3 + m) > 0 ? 1 : -1; F(mx + 2 * r, y + 1, K.fantasmaS, 0.9); F(mx + 3 * r, y + 2, K.fantasmaS, 0.9); } }
}

function f_hoyPuente(R, t, o, luz, en) {
  const { rect, pset, disco, linea } = R, k = (c) => f_hoyCol(c, luz), K = f_hoyK;
  const sol = luz === 'tarde' ? [160, 92, 13] : luz === 'dia' ? [226, 34, 8] : null;
  f_hoyCielo(R, t, { hor: 102, modo: luz, sol, luna: [226, 34, 5], estela: [30, 0.05] });
  // el mar abierto al fondo, entre las colinas: una franja clara con el horizonte
  for (let y = 98; y < 102; y++) for (let x = 100; x < 230; x++) if (f_hoyU(x, y) < 0.7) pset(x, y, k(y === 98 ? hex('#8ab8d0') : hex('#5a8aaa')));
  const f = f_hoyCapa(R, 'puenteF|' + luz, luz, () => f_hoyPuenteFondo(R));
  f_hoyPegar(R, f.b, 0, 102); f_hoyLuces(R, t, f.V, en * 0.9);
  // los coches del tablero (de noche, faros y pilotos), las luces del collar de los cables y las de las torres
  for (let i = 0; i < 18; i++) { const dir = i % 2 ? 1 : -1, x = Math.round(((h(i, 1, 712) * 340 + t * dir * (20 + (i % 3) * 6)) % 340 + 340) % 340) - 10, y = f_hoyDeck(x) - 2;
    if (luz === 'anochecer') { pset(x, y, dir > 0 ? hex('#fff4d0') : C.rojo); } else { pset(x, y, k([C.rojo, C.blanco, C.azul, hex('#3a3a46'), C.amarillo, hex('#c8ccd4')][i % 6])); pset(x + 1, y, k(hex('#3a3a46'))); } }
  if (luz !== 'dia') { for (let x = 2; x < 320; x += 7) { const y = f_hoyCable(x); if (y >= f_hoyDeck(x) - 1) continue; if (Math.sin(t * 2 + x * 0.3) > -0.7) pset(x, y - 1, en > 0.1 ? hex('#fff0b0') : k(C.blanco)); } }
  for (const cx of [f_hoyPT.L, f_hoyPT.Rr]) if (Math.floor(t * 1.2) % 2) { pset(cx - 5, f_hoyPT.top - 1, C.rojo); pset(cx + 5, f_hoyPT.top - 1, C.rojo); }
  // el agua del estrecho con el reflejo del puente y el camino del sol
  f_hoyAgua(R, t, 102, 150, luz, { sol: sol ? sol[0] : luz === 'anochecer' ? 226 : null, comp: 1.3 });
  // el barco grande que entra (o.barco 0–1; si no, entra solo cada 22 s) y un velero
  const u = Math.max(0, Math.min(1, o.barco ?? ((t % 22) / 22))), s = 0.18 + u * 0.82, bx = Math.round(166 - u * 26), by = Math.round(101 + u * 40);
  f_hoyVelero(R, Math.round(60 + ((t * 3) % 60)), 120, t, k);
  f_hoyBarco(R, bx, by, s, t, k, luz === 'dia' ? 0 : Math.max(en, 0.5));
  if (o.fantasma > 0) f_hoyFantasmaEstrecho(R, t, Math.min(1, o.fantasma));
  f_hoyGaviotas(R, t, 3, 60, 2);
  const d = f_hoyCapa(R, 'puenteD|' + luz, luz, () => f_hoyPuenteDelante(R));
  f_hoyPegar(R, d.b, 138, 180);
  // la espuma que rompe en las rocas, el corcho de la caña que cabecea, el cormorán que seca las alas y la farola
  for (let i = 0; i < 40; i++) { const x = (i * 8 + Math.round(h(i, 1, 713) * 6)) % 320, ola = Math.sin(t * 1.6 + i * 0.7); if (ola > 0.2) { pset(x, 140 + Math.round(h(i, 2, 713) * 3), k(f_hoyK.brillo)); pset(x + 1, 140 + Math.round(h(i, 2, 713) * 3), k(f_hoyK.brillo)); if (ola > 0.7) pset(x, 138, k(f_hoyK.brillo)); } }
  { const fy = 132 + Math.round(Math.sin(t * 2.1) * 1); linea(251, 128, 262, fy, k(hex('#c8ccd4'))); pset(262, fy, k(C.rojo)); pset(262, fy + 1, k(C.blanco)); }
  { const x = 196, y = 141, ab = Math.sin(t * 0.8) > 0.2; rect(x - 1, y - 6, x + 1, y, k(C.k)); pset(x + 1, y - 7, k(C.k)); pset(x + 2, y - 7, k(C.amarillo)); pset(x - 1, y + 1, k(C.k)); pset(x + 1, y + 1, k(C.k));
    if (ab) { const a = Math.round(Math.sin(t * 5) * 1); linea(x - 1, y - 5, x - 6, y - 8 + a, k(C.k)); linea(x + 1, y - 5, x + 6, y - 8 + a, k(C.k)); linea(x - 1, y - 4, x - 5, y - 6 + a, k(hex('#2a2a3a'))); linea(x + 1, y - 4, x + 5, y - 6 + a, k(hex('#2a2a3a'))); } }
  if (luz !== 'dia') { disco(22, 84, 3, K.farolaL); for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const dd = Math.hypot(i, j); if (dd > 4 && dd < 10 && f_hoyU(22 + i, 84 + j) < (10 - dd) / 12) pset(22 + i, 84 + j, f_hoyMezcla(R.pget(22 + i, 84 + j), K.farolaL, 0.5)); } }
  return { suelo: 172, pies: [34, 270], hor: 102, torres: [f_hoyPT.L, f_hoyPT.Rr], tablero: (x) => f_hoyDeck(x), cable: (x) => f_hoyCable(x), agua: [0, 102, 319, 141], barco: [bx, by, s], baranda: [143, 155], banco: [278, 314, 167], cana: [236, 168], farola: [22, 84], sol };
}

// el esqueleto de acero de la obra (1889–1901) sobre el solar de x 102 a 236, con la base en y 130: una retícula de pilares
// y vigas finas (2 px) de minio, con las dos plantas de arriba aún de acero gris sin pintar, la cara de atrás más pálida y
// desplazada (la profundidad) y el cielo y la ciudad a la vista entre ellas; cartelas con remaches en cada nudo, cruces de
// tirantes, tablones, escaleras de mano y el montacargas que sube y baja; abajo, las primeras plantas ya revestidas de
// ladrillo con ventanas (y la siguiente a medias); arriba, la grúa de pluma, la fragua y los remachadores, obreros en las
// vigas y la bandera. p (0–1): cuántas plantas hay (de 1 a 9, de 10 px). Devuelve { nf, yTop, AL, grua }.
function c_esqueleto(R, t, p) {
  const { rect, pset, linea, disco } = R, N = 9, AL = 10, base = 130, X0 = 102, X1 = 237, cols = [102, 124, 146, 168, 190, 212, 235];
  const nf = Math.max(1, Math.round(p * N)), yTop = base - nf * AL, yF = (f) => base - f * AL;
  const clad = Math.max(0, Math.min(4, nf - 4)), medias = clad > 0 ? (clad === 4 ? 4 : 2) : 0;
  const col = (f) => (f > nf - 2 ? [EC.hierro, EC.hierroS, EC.hierroL] : [EC.minio, EC.minioS, EC.minioL]);
  const atras = (c) => e_mez(c, EC.medio[2], 0.55);
  const gente = { ropa: [hex('#3e5a8a'), hex('#2c4468'), hex('#3e5a8a')], som: hex('#5a4030') };
  // 1 · la cara de atrás (5 px a la derecha y 4 arriba): vigas y pilares pálidos de 1 px, y los cantos que la unen
  for (let f = clad + 1; f <= nf; f++) { const y = yF(f) - 4; linea(X0 + 5, y, X1 + 5, y, atras(col(f)[0])); for (let x = X0 + 7; x < X1 + 5; x += 4) pset(x, y + 1, atras(col(f)[1])); }
  for (const cx of cols) for (let f = clad + 1; f <= nf; f++) linea(cx + 5, yF(f) - 4, cx + 5, yF(f - 1) - 4, atras(col(f)[0]));
  for (const cx of [cols[0], cols[6]]) for (let f = clad + 1; f <= nf; f++) linea(cx, yF(f), cx + 5, yF(f) - 4, atras(col(f)[1]));
  // 2 · las plantas revestidas: antepecho de ladrillo, ventana con su dintel y alféizar de piedra, y el pilar forrado
  const bahia = (f, i) => { const x0 = cols[i] + 2, x1 = cols[i + 1] - 1, y0 = yF(f) + 2, y1 = yF(f - 1) - 1;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = (y - y0) >> 1, jx = (x + (fila & 1) * 2) % 4 === 0, q = h(x >> 1, y, 680 + f);
      pset(x, y, (y - y0) % 2 === 1 ? e_mez(C.ladrilloS, C.ladrillo, 0.4) : jx ? C.ladrilloS : q < 0.14 ? C.ladrilloL : C.ladrillo); }
    const wx0 = x0 + 3, wx1 = x1 - 3; rect(wx0 - 1, y0, wx1 + 1, y0, C.calizaL);
    for (let y = y0 + 1; y <= y1 - 3; y++) for (let x = wx0; x <= wx1; x++) pset(x, y, (x + y * 2) % 9 < 2 ? EC.vidrioL : y < y0 + 3 ? EC.vidrioM : EC.vidrio);
    if (h(i, f, 681) < 0.3) rect(wx0, y0 + 1, wx1, y0 + 2, hex('#d8ccb0'));
    rect((wx0 + wx1) >> 1, y0 + 1, (wx0 + wx1) >> 1, y1 - 3, hex('#e8e0d0')); rect(wx0 - 1, y1 - 2, wx1 + 1, y1 - 2, C.calizaL); rect(wx0 - 1, y1 - 1, wx1 + 1, y1 - 1, C.calizaS); };
  for (let f = 1; f <= clad; f++) for (let i = 0; i < 6; i++) bahia(f, i);
  if (medias) for (let i = 0; i < medias; i++) bahia(clad + 1, i);
  for (let f = 1; f <= clad; f++) { const y = yF(f); rect(X0, y, X1, y + 1, C.caliza); rect(X0, y, X1, y, C.calizaL); for (const cx of cols) { rect(cx - 1, y, cx + 2, yF(f - 1), C.calizaS); rect(cx - 1, y, cx, yF(f - 1), C.calizaL); rect(cx + 1, y, cx + 1, yF(f - 1), C.caliza); } }
  // el andamio de tablas delante de la planta a medias
  if (medias) { const y = yF(clad + 1); for (const x of [cols[medias] - 3, cols[0] + 4]) linea(x, y + 2, x, yF(clad) + 1, EC.tablaD); rect(cols[0] + 2, yF(clad) - 3, cols[medias] - 1, yF(clad) - 3, EC.tabla); for (let x = cols[0] + 3; x < cols[medias] - 1; x += 5) pset(x, yF(clad) - 3, EC.tablaD); }
  // 3 · los tirantes en cruz (acero gris de 1 px) en las bahías de los extremos, una planta sí y otra no
  for (let f = clad + 1; f <= nf; f++) if (f % 2 === 0) for (const i of [0, 4]) { if (f === clad + 1 && i < medias) continue; const x0 = cols[i] + 2, x1 = cols[i + 1] - 1, y0 = yF(f) + 2, y1 = yF(f - 1) - 1; linea(x0, y0, x1, y1, EC.hierroS); linea(x1, y0, x0, y1, EC.hierroS); pset((x0 + x1) >> 1, (y0 + y1) >> 1, EC.hierroL); }
  // 4 · las escaleras de mano de una planta a otra, y el montacargas (guías, cable, polea y la jaula con vigas)
  for (let f = Math.max(clad, 1); f < nf; f++) { const x = f % 2 ? 176 : 222, y0 = yF(f) - 1, y1 = yF(f + 1) + 2; linea(x, y0, x + 2, y1, EC.tablaS); linea(x + 3, y0, x + 5, y1, EC.tablaS); for (let y = y0 - 2; y > y1; y -= 2) { const u = (y0 - y) / (y0 - y1); linea(Math.round(x + u * 2), y, Math.round(x + 3 + u * 2), y, EC.tabla); } }
  { const gx0 = 129, gx1 = 141, cx = 135, alto = Math.max(0, (nf - 1) * AL - 4), yc = Math.round(base - 3 - (Math.sin(t * 0.55) * 0.5 + 0.5) * alto);
    linea(gx0, yTop - 2, gx0, base, EC.hierroS); linea(gx1, yTop - 2, gx1, base, EC.hierroS);
    rect(cx - 3, yTop - 5, cx + 3, yTop - 4, EC.hierroS); disco(cx, yTop - 5, 1.5, EC.hierroL); linea(cx, yTop - 4, cx, yc - 7, hex('#2a2a36'));
    rect(gx0 + 1, yc - 7, gx1 - 1, yc, C.k); rect(gx0 + 2, yc - 6, gx1 - 2, yc - 1, e_mez(EC.medio[2], C.k, 0.15)); for (let x = gx0 + 3; x < gx1 - 1; x += 3) linea(x, yc - 6, x, yc - 1, EC.hierroS);
    rect(gx0 + 1, yc, gx1 - 1, yc, EC.tabla); rect(gx0 + 2, yc - 3, gx1 - 2, yc - 3, EC.minioL); rect(gx0 + 2, yc - 2, gx1 - 2, yc - 1, EC.minio); }
  // 5 · la retícula de delante: pilares de 2 px (con su empalme que asoma por encima de la última planta) y vigas de 2 px
  for (const [k, cx] of cols.entries()) { const yS = yTop - (k % 3 === 1 ? 9 : 4);
    for (let y = yS; y <= yF(clad); y++) { const f = Math.min(nf, Math.max(clad + 1, Math.ceil((base - y) / AL))), [c, cS, cL] = col(f); pset(cx, y, (y - yS) % 3 === 1 ? cL : c); pset(cx + 1, y, cS); } }
  for (let f = clad + 1; f <= nf; f++) { const y = yF(f), [c, cS, cL] = col(f); rect(X0, y, X1, y, c); rect(X0, y + 1, X1, y + 1, cS); for (let x = X0 + 2; x < X1; x += 4) pset(x, y, cL); pset(X0 - 1, y, cS); pset(X1 + 1, y, cS);
    for (const cx of cols) { rect(cx - 1, y - 1, cx + 2, y + 2, cS); rect(cx, y, cx + 1, y + 1, c); for (const [dx, dy] of [[-1, -1], [2, -1], [-1, 2], [2, 2]]) pset(cx + dx, y + dy, cL); } }
  // los tablones de la última planta y un montón de vigas en la de abajo
  for (let x = cols[2] + 3; x < cols[4] - 2; x++) pset(x, yTop - 1, (x % 6) === 0 ? EC.tablaD : (x & 1) ? EC.tabla : EC.tablaL);
  if (nf > 1) { const y = yF(nf - 1) - 1; for (let j = 0; j < 3; j++) { rect(cols[5] + 3 + j, y - j * 2 - 1, cols[5] + 16 - j, y - j * 2, j % 2 ? EC.minioS : EC.minio); pset(cols[5] + 3 + j, y - j * 2 - 1, EC.minioL); } }
  // 6 · la vida de arriba: la grúa de pluma, la fragua, el remache al rojo que vuela al del cubo, el remachador con sus chispas
  const g = e_grua(R, 206, yTop - 1, t, { largo: 40, alto: 18, baja: 14, fase: 1 });
  e_fragua(R, 116, yTop - 2, t); e_remache(R, t, 118, yTop - 9, 158, yTop - 10, 2.2);
  e_gente(R, 107, yTop, t, 0, { anda: false, ...gente });
  e_gente(R, 157, yTop, t, 1, { anda: false, ...gente, som: hex('#3a3a46') }); rect(162, yTop - 8, 164, yTop - 6, hex('#5a5a66')); pset(162, yTop - 9, hex('#8a8a96'));
  e_gente(R, 180, yTop, t, 2, { anda: false, mujer: false, ropa: [hex('#c84a3a'), hex('#8a2a24'), hex('#3e5a8a')], som: hex('#5a4030') }); linea(185, yTop - 6, 188, yTop - 4, hex('#5a5a66'));
  e_chispas(R, t, 189, yTop - 4, 1);
  // la bandera en el pilar más alto de la derecha, que ondea
  { const px = cols[6] + 1, py = yTop - 16; linea(px, py, px, yTop - 4, C.k); for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++) { const yy = py + j + Math.round(Math.sin(t * 6 - i * 0.8) * (i / 8)); pset(px - 1 - i, yy, i < 4 && j < 3 ? hex('#3a4a8a') : j % 2 ? C.blanco : C.rojoBandera); } }
  // en la planta de abajo, el que lleva un tablón del montacargas a la izquierda y vuelve a por otro; el del bocadillo sentado
  if (nf > 1) { const y = yF(nf - 1), u = (t * 0.07) % 1, va = u < 0.5, x = Math.round(va ? 196 - u * 2 * 84 : 112 + (u - 0.5) * 2 * 84);
    e_gente(R, x, y, t, 3, gente); if (va) { rect(x - 5, y - 10, x + 9, y - 10, EC.tablaL); rect(x - 5, y - 9, x + 9, y - 9, EC.tablaS); } }
  if (nf > 2) { const y = yF(nf - 2); e_gente(R, 225, y + 3, t, 5, { sentado: true, ropa: [hex('#c84a3a'), hex('#8a2a24'), hex('#3e5a8a')], som: hex('#3a3a46') }); rect(231, y - 3, 233, y - 1, hex('#8a8a96')); if (Math.sin(t * 1.3) > 0.3) pset(230, y - 6, hex('#e8d8b0')); }
  if (nf > 3) e_chispas(R, t, 150, yF(nf - 2) - 2, 2);
  return { nf, yTop, AL, grua: g };
}

// los cinco distritos: de dónde llegan (dirección de vuelo, px) y el color de aguada de cada pieza
const a_DISTRITOS = { manhattan: [-60, -40, hex('#e8a0a0')], brooklyn: [60, 70, hex('#9ab8e0')], queens: [80, -20, hex('#a8cc88')], bronx: [30, -60, hex('#e8d070')], staten: [-70, 30, hex('#e8b070')] };

// la vida del agua del plano de 1898: el ferri de Staten Island que va y viene con su humo, un velero que entra por el
// estrecho, un remolcador que sube por el río Este y un vapor de línea que sale por la bahía de abajo
function a_distritosVida(R, t, d) {
  const M = a_MP, k = M.tinta;
  const vapor = (x, y, dir, l, hum, c) => { x = Math.round(x); y = Math.round(y + Math.sin(t * 2 + x) * 0.5);
    R.rect(x - l, y, x + l, y, k); R.rect(x - l + 1, y + 1, x + l - 1, y + 1, k); R.rect(x - l + 1, y - 1, x + l - 2, y - 1, c); R.rect(x - l + 2, y - 2, x + l - 3, y - 2, hex('#f6f0e0'));
    const fx = x - dir; R.rect(fx, y - 4, fx, y - 3, M.rojo); R.pset(fx, y - 5, k);
    for (let q = 0; q < 4; q++) { const f = ((t * 0.9 + q / 4) % 1), sx = Math.round(fx - dir * f * 6), sy = Math.round(y - 6 - f * 5); if (hum && !a_atom(sx, sy)) R.pset(sx, sy, f < 0.5 ? hex('#8a8478') : hex('#c8c0b0')); }
    for (let q = 1; q <= 3; q++) R.pset(x - dir * (l + q * 2), y + 1, (Math.floor(t * 4) + q) % 2 ? M.lineaL : hex('#e4eeee')); };
  // el ferri: de la punta de Manhattan a Staten Island y vuelta, con paradas en cada orilla
  { const c = (t / 14) % 1, ida = c < 0.5, q = ida ? c * 2 : (c - 0.5) * 2, f = Math.max(0, Math.min(1, (q - 0.1) / 0.8)), e = f * f * (3 - 2 * f);
    vapor(146 - 4 * (ida ? e : 1 - e), 127 + 15 * (ida ? e : 1 - e), ida ? -1 : 1, 3, true, hex('#e8a040')); }
  // el velero que entra por el estrecho
  { const f = (t * 0.035) % 1, x = f < 0.6 ? 212 - f / 0.6 * 44 : 168 - (f - 0.6) / 0.4 * 12, y = f < 0.6 ? 171 - f / 0.6 * 15 : 156 - (f - 0.6) / 0.4 * 16; a_barquito(R, x, y, t, -1, hex('#f6f0e0'), 5); }
  // el remolcador del río Este
  { const f = (t * 0.05) % 1; vapor(171 + 12 * f, 101 - 27 * f, 1, 2, true, hex('#3a5a7a')); }
  // el vapor de línea que sale a mar abierto
  { const f = (t * 0.02 + 0.3) % 1; vapor(300 - f * 110, 169, -1, 5, true, hex('#2a2a2a')); }
}

// el puente de Brooklyn de pictograma sobre el río Este: las dos torres de piedra con sus arcos, el tablero, los cables
// colgados y un carruaje que lo cruza
function a_puenteBrooklyn(R, t) {
  const k = a_MP.tinta, pie = hex('#d8ccb0'), y = 109;
  for (let x = 158; x <= 175; x++) { R.pset(x, y, k); R.pset(x, y + 1, a_luz(a_MP.tinta, 1.6)); }
  for (const tx of [162, 171]) { R.rect(tx - 1, y - 6, tx + 1, y - 1, k); R.rect(tx, y - 5, tx, y - 1, pie); R.pset(tx, y - 3, k); }
  for (let x = 158; x <= 175; x++) { const cy = x < 162 ? y - 1 - Math.round((x - 158) / 4 * 4) : x > 171 ? y - 5 + Math.round((x - 171) / 4 * 4) : y - 5 + Math.round(Math.sin((x - 162) / 9 * Math.PI) * 3); if (x !== 162 && x !== 171) R.pset(x, cy, k); }
  const cx = 158 + Math.round(((t * 2.5) % 17)); R.pset(cx, y - 1, a_MP.rojo); R.pset(cx + 1, y - 1, k);
}

// el destello de una pieza al encajar (fl de 1 a 0): un anillo de estrellas de ocho puntas que se abre desde su centro
function a_destelloPieza(R, c, fl, col) {
  if (!c) return; const r = 4 + (1 - fl) * 16, cl = hex('#fffbe8'), oro = hex('#f0c040');
  for (let q = 0; q < 8; q++) { const a = q * Math.PI / 4 + (1 - fl) * 0.6, x = Math.round(c[0] + Math.cos(a) * r), y = Math.round(c[1] + Math.sin(a) * r * 0.8); if (a_atom(x, y) || y < 2) continue;
    R.pset(x, y, cl); if (fl > 0.4) { R.pset(x - 1, y, oro); R.pset(x + 1, y, oro); R.pset(x, y - 1, oro); R.pset(x, y + 1, oro); } }
  if (fl > 0.6) { const [x, y] = c; R.rect(x - 3, y, x + 3, y, cl); R.rect(x, y - 3, x, y + 3, cl); R.pset(x, y, a_luz(col, 1.2)); }
}

// las sierras del noreste ([lon, lat, radio en lon, radio en lat, cuántos montes]) para grabarlas en «^»
const a_SIERRAS = [[-74.3, 43.95, 0.8, 0.45, 30], [-74.3, 42.15, 0.32, 0.17, 14], [-74.02, 41.36, 0.2, 0.07, 6], [-74.33, 41.72, 0.1, 0.14, 5], [-73.45, 42.25, 0.1, 0.35, 8]];

// los montes grabados en «^» de las sierras, con la ladera de la izquierda al sol y la de la derecha en sombra; su tamaño
// crece con el zoom y no pisan el marco, ni la barra del año, ni la zona de Atom
function a_montesNoreste(R, P, zoom) {
  const m = Math.max(2, Math.min(4, Math.round(zoom * 0.32))), M = a_MP, tinta = a_mezcla(M.tinta, M.monte, 0.45), puestos = [];
  a_SIERRAS.forEach(([lo, la, rl, ra, n], s) => { for (let q = 0; q < n; q++) { const a = h(q, s, 1081) * Math.PI * 2, r = Math.sqrt(h(q, s, 1082));
    const [x, y] = P([lo + Math.cos(a) * rl * r, la + Math.sin(a) * ra * r]).map(Math.round), mm = m + (h(q, s, 1083) < 0.3 ? 1 : 0);
    if (x - mm < 22 || x + mm > 298 || y - mm < 16 || y > 168 || a_atom(x + mm, y - mm) || puestos.some(([px, py]) => Math.abs(px - x) < mm * 2 + 2 && Math.abs(py - y) < mm + 2)) continue;
    puestos.push([x, y]);
    for (let r = 1; r < mm; r++) for (let i = -r + 1; i <= r - 1; i++) R.pset(x + i, y - mm + r, i < 0 ? M.monteL : i === 0 ? M.tierra : M.monte);
    for (let i = 0; i <= mm; i++) { R.pset(x - mm + i, y - i, tinta); R.pset(x + i, y - mm + i, i === 0 ? tinta : a_luz(tinta, 0.8)); }
    R.pset(x + mm + 1, y, M.monte); R.pset(x + mm + 2, y, M.tierraS); } });
}

// los bosques del valle en los encuadres cercanos: arbolitos grabados (copa de tres tonos y tronco) repartidos por la
// tierra alrededor de centro, atados al mapa (lon, lat); solo se plantan donde el papel es tierra, no en el agua
function a_bosquesValle(R, P, centro, zoom) {
  const B = R.buf, M = a_MP, rl = 260 / zoom / 11, ra = 160 / zoom / 14;
  const tierra = (x, y) => { if (x < 22 || x > 297 || y < 18 || y > 167 || a_atom(x, y)) return false; const c = B[y * 320 + x], r = c & 255, b = (c >>> 16) & 255; return r > b + 25; };
  for (let q = 0; q < 150; q++) { const lo = centro[0] + (h(q, 1, 1091) - 0.5) * 2 * rl, la = centro[1] + (h(q, 2, 1091) - 0.5) * 2 * ra;
    if (h(Math.floor(lo * 4), Math.floor(la * 4), 1092) < 0.35) continue;
    const [x, y] = P([lo, la]).map(Math.round); if (!tierra(x, y) || !tierra(x - 2, y - 3) || !tierra(x + 2, y - 3) || !tierra(x, y + 1)) continue;
    R.pset(x, y - 3, M.bosque); R.pset(x - 1, y - 2, M.bosque); R.pset(x, y - 2, a_luz(M.bosque, 1.15)); R.pset(x + 1, y - 2, M.bosqueS); R.pset(x - 1, y - 1, M.bosque); R.pset(x, y - 1, M.bosqueS); R.pset(x + 1, y - 1, M.bosqueS); R.pset(x, y, M.monte); R.pset(x + 1, y, M.tierraS); }
}

// la longitud del meridiano central del globo (grados) en t: o.lon0 (por defecto −40) + o.giro (grados/s, por defecto 5) × t;
// sin o.libre, se frena con suavidad entre −75 y −5 para que Nueva York y Londres queden siempre a la vista (hasta
// t ≈ 4 s, con lo de por defecto, es exactamente −40 + 5t)
function a_lonGlobo(t, o) {
  const v = (o.lon0 ?? -40) + (o.giro ?? 5) * t; if (o.libre) return v;
  const hi = -5, lo = -75, k = 15;
  if (v > hi - k) return hi - k * Math.exp(-(v - (hi - k)) / k);
  if (v < lo + k) return lo + k * Math.exp((v - (lo + k)) / k);
  return v;
}

// el río Este de noche (o.encuadre 'rio')
// las casas de la orilla de Manhattan en 1776, vistas desde Brooklyn (se calculan una vez): [x0, ancho, alto, tipo]
// con tipo 0 a dos aguas, 1 de piñón escalonado holandés y 2 georgiana de tejado plano con pretil; y sus ventanas
const b_RIO = (() => { const casas = [], ven = []; let x = -4, k = 0;
  while (x < 322) { const w = 7 + Math.round(h(k, 1, 856) * 8), alto = 5 + Math.round(h(k, 2, 856) * 8) + (x > 100 && x < 170 ? 2 : 0), tipo = Math.floor(h(k, 3, 856) * 3);
    if (!(x > 126 && x < 140)) { casas.push([x, w, alto, tipo]); for (let f = 0; f < (alto > 9 ? 2 : 1); f++) for (let i = 2; i < w - 1; i += 3) if (h(k, i * 7 + f, 857) < 0.55) ven.push([x + i, 79 - alto + 3 + f * 4, k]); }
    x += w + (h(k, 4, 856) < 0.25 ? 3 : 0); k++; }
  return { casas, ven }; })();
