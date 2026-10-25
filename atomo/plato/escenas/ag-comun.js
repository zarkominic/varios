// Fontanería y decorados del episodio 9 (Acción de Gracias y Black Friday) en el estilo canónico pixel chibi
// (episodios/GUIA-ESTILO.md): colores planos, contorno limpio, nada de tramas, ambiente de serie y Atom arriba a la
// derecha. Cinco decorados que se repiten (A plymouth, B comedor, C calle, D filadelfia, E hoy) y los mapas.
// El ambiente (aves, viento, motas, gato…) y los gags (mareo, polvareda, trote…) se toman del episodio 8.
//
//   import { preparar, rodar, plymouth, EL } from '/atomo/plato/escenas/ag-comun.js';
//   const { E, R, M } = await preparar('ag-cena');
//   rodar(E, R, [[0, (t) => plymouth(R, t, { estacion: 'otono', mesa: true })]], { año: 1621 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, P, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { bandada, halcon, viento, motas, gato, fugaz, mareo, polvareda, trote, gotaSudor, pan, mini } from '/atomo/plato/escenas/eg-comun.js';

export const EL = ELENCO_CHIBI;
export { P, tela, mareo, polvareda, trote, gotaSudor, pan, mini, gato, motas };
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = pal({
  k: '#1c1222', blanco: '#f6f2ea', gris: '#8c8ca0', grisS: '#5e5e70', grisL: '#b8bccc',
  cielo1: '#4aa6ea', cielo2: '#74bef2', cielo3: '#a8daf4', bruma: '#f2e2bc', sol: '#fff4c8', solL: '#ffe28a',
  tarde1: '#3a3a7a', tarde2: '#a0507a', tarde3: '#e88a5a', tarde4: '#f8c870',
  inv1: '#8a9ab8', inv2: '#a8b6cc', inv3: '#c8d2e0', nieve: '#f2f6fa', nieveS: '#c8d4e4',
  mar1: '#2a64b0', mar2: '#3678c4', mar3: '#4f94d8', marL: '#cfe8ff', marI: '#4a6a8a', marIL: '#8aa4c0',
  hierba: '#5aa83a', hierbaS: '#3a7a28', hierbaL: '#8ad05a', hierbaD: '#24521a', pino: '#2a5a3a', pinoS: '#1a3e28',
  rojo: '#c83a3a', rojoS: '#8e2424', naranja: '#e8803a', naranjaS: '#b05a24', amarillo: '#e8c040', amarilloS: '#b8901c', ocre: '#d8a050', ocreS: '#a87430',
  tierra: '#8a6a44', tierraS: '#6a4e30', tierraL: '#a8885a', camino: '#c8a87a', caminoS: '#a8885a', caminoL: '#dcc092',
  madera: '#83552c', maderaS: '#5e3a1e', maderaL: '#a8743c', maderaD: '#3a2214', paja: '#d8b45a', pajaS: '#a8843a', pajaL: '#ecd08a',
  corteza: '#9a8a7a', cortezaS: '#6e6050', piedra: '#9a96a0', piedraS: '#6e6a78',
  ladrillo: '#a84a3a', ladrilloS: '#7a3226', ladrilloL: '#c8664e', fachada: '#d8c8a8', fachadaS: '#b0a080', cristal: '#8ac8e8', cristalS: '#5a98c0',
  asfalto: '#4a4a5a', asfaltoS: '#3a3a48', acera: '#a8a4b0', aceraS: '#8a8694', linea: '#e8d84a',
  papel: '#e8d8b4', papelS: '#c8b48a', pared: '#c8a46a', paredS: '#a8844a', paredL: '#e0c088', alfombra: '#8a3a3a',
  oro: '#e8b830', oroS: '#a87a18', oroL: '#fff0a0', azul: '#2a4fa8', azulL: '#4a78d0', verde: '#3a8a4a', verdeL: '#5aaa5a',
  morado: '#6a3a8a', rosa: '#e87a9a', calabaza: '#e8803a', calabazaS: '#b8582a', maiz: '#f0c840', maizS: '#c89a20',
  pavo: '#7a4a2a', pavoS: '#4e2e16', pavoL: '#a87040', moco: '#d83a3a',
});

const ATOM = [297, 24];
// Atom arriba a la derecha, un 50 % más grande y solo (GUIA-ESTILO.md, desde el episodio 8)
function conAtomGrande(R) {
  R.companero = (t, e = 0) => {
    const x = ATOM[0], y = ATOM[1] + Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)), r = 13 + 2.4 * e;
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0.35) R.pset(x + i, y + j, g > 0.75 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
    R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: e });
  };
  R.caja = () => {};
}

export async function preparar(id) {
  const E = await escena(id, 'ep09');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  R.tramosTiempo([[1620, 1776, R.PALA.AZUL, 'barco'], [1863, 1941, R.PALA.ORO, 'corona'], [1950, 2026, R.PALA.ROJO, 'moneda']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}

// Efectos de sonido: o.efectos = [[t, nombre, opciones], …], en tiempo de escena.
// - Se calculan con las mismas variables que el dibujo, así imagen y sonido no pueden separarse.
// - render-escenas.mjs los recoge en efectos.json y herramientas/efectos.cjs los sintetiza.
// primerT da el primer instante del paso de dibujo (1/15 s) en que se cumple una condición del dibujo.
export const primerT = (f, a, b, paso = 1 / 15) => { for (let k = Math.ceil(a / paso - 1e-6); k * paso <= b; k++) if (f(k * paso)) return k * paso; return null; };

export function rodar(E, R, planos, o = {}) {
  window.__efectos = (o.efectos ?? []).filter((e) => e[0] != null);
  const dc = o.durCartela ?? 1.3;
  const lista = o.cartela
    ? [[0, (t) => R.cartela(Math.min(1, t / dc), o.cartela)], ...planos.map(([a, f, modo], i) => [i === 0 ? dc : a, f, modo ?? (i === 0 ? 'corte' : undefined)])]
    : planos;
  // lo que un decorado deja para delante (R.delante: coches, público) se pinta al acabar el plano, encima de los personajes
  const conDelante = lista.map(([a, f, modo]) => [a, (t) => { R.delante = null; f(t); if (R.delante) { R.delante(); R.delante = null; } }, modo]);
  E.iniciar((t) => {
    R.secuencia(t, conDelante, { fundido: o.fundido ?? 0.35 });
    const e = E.energia(t);
    const año = typeof o.año === 'function' ? o.año(t) : o.año;
    if (año != null && (!o.cartela || t > dc) && t >= (o.barraDesde ?? 0)) R.barraTiempo(t, año, { x0: 22, x1: 168, y: 5, alto: 2 });
    if (!o.cartela || t > dc + 0.1) R.companero(t, e);
    R.presentar();
  }, { paso: 1 / 15 });
}

// ── piezas comunes ────────────────────────────────────────────────────────────────────────────────────────────────
// cielo en tres bandas: día, tarde, invierno (gris) o noche; con nubes, sol y aves
export function cielo(R, t, o = {}) {
  const hor = o.hor ?? 90;
  if (o.noche) {   // plano, sin tramas: dos azules, estrellas que titilan, luna llena con dos cráteres
    for (let y = 0; y < hor; y++) R.rect(0, y, 319, y, y < hor * 0.6 ? hex('#141a3e') : hex('#1e2650'));
    for (let k = 0; k < 40; k++) { const x = (k * 71) % 320, y = (k * 37) % Math.max(10, hor - 10); R.pset(x, y, Math.sin(t * 2 + k) > 0.5 ? C.blanco : C.grisL); }
    const [lx, ly, lr] = o.luna ?? [230, 30, 9]; R.disco(lx, ly, lr + 1, C.k); R.disco(lx, ly, lr, C.papel); R.disco(lx + 3, ly - 2, 2, C.papelS); R.disco(lx - 3, ly + 3, 1, C.papelS);
    fugaz(R, t, 7); return;
  }
  const b = o.tarde ? [C.tarde1, C.tarde2, C.tarde3, C.tarde4] : o.invierno ? [C.inv1, C.inv2, C.inv3, C.nieve] : [C.cielo1, C.cielo2, C.cielo3, C.bruma];
  for (let y = 0; y < hor; y++) R.rect(0, y, 319, y, b[Math.min(3, Math.floor((y / hor) * (y > hor - 8 ? 4 : 3.4)))]);
  const sol = o.sol === null ? null : o.sol ?? (o.tarde ? [210, hor - 16, 12] : o.invierno ? null : [226, 26, 9]);
  if (sol) { R.disco(sol[0], sol[1], sol[2] + 2, o.tarde ? C.tarde4 : C.solL); R.disco(sol[0], sol[1], sol[2], C.sol); }
  if (o.nubes !== false) for (const [x0, y, w, v] of [[40, 22, 34, 1.5], [170, 14, 44, 1], [120, 42, 22, 2]]) R.nube(((x0 + t * v) % 380) - 30, y, w);
  if (o.aves !== false && !o.invierno) { halcon(R, t, 120, Math.min(26, hor - 30)); gansos(R, t, Math.min(40, hor - 24)); }
}

// bandada de gansos en uve que cruza hacia el sur
export function gansos(R, t, y, cada = 11) {
  const u = (t % cada) / cada, x0 = 360 - u * 420;
  for (let k = 0; k < 7; k++) {
    const lado = k % 2 ? 1 : -1, n = Math.ceil(k / 2), x = Math.round(x0 + n * 7), yy = Math.round(y + lado * n * 4), a = Math.sin(t * 9 + k) > 0;
    R.rect(x - 1, yy, x + 2, yy, C.pavoS); R.pset(x - 2, yy, C.k); R.pset(x - 3, yy, C.k);
    if (a) { R.pset(x + 1, yy - 1, C.grisS); R.pset(x + 1, yy - 2, C.grisS); } else { R.pset(x + 1, yy + 1, C.grisS); R.pset(x + 1, yy + 2, C.grisS); }
  }
}

// hojas de otoño que caen y se mecen
export function hojas(R, t, n = 16, y0 = 20, y1 = 145) {
  for (let k = 0; k < n; k++) {
    const v = 10 + (k % 4) * 3, y = y0 + ((k * 41 + t * v) % (y1 - y0)), x = ((k * 67 + t * 6) % 340) - 10 + Math.sin(t * 2 + k) * 5;
    const c = [C.rojo, C.naranja, C.amarillo, C.ocre][k % 4], f = Math.floor(t * 4 + k) % 2;
    R.pset(Math.round(x), Math.round(y), c); R.pset(Math.round(x) + (f ? 1 : -1), Math.round(y), c); R.pset(Math.round(x), Math.round(y) + 1, c);
  }
}

// nieve que cae
export function nevada(R, t, n = 50) {
  for (let k = 0; k < n; k++) {
    const v = 8 + (k % 5) * 3, y = (k * 29 + t * v) % 190 - 5, x = ((k * 53 + Math.sin(t + k) * 8) % 330) - 5;
    R.pset(Math.round(x), Math.round(y), C.nieve); if (k % 3 === 0) R.pset(Math.round(x) + 1, Math.round(y), C.nieveS);
  }
}

// humo que sube de una chimenea, en bolitas que crecen
export function humo(R, x, y, t, c = C.grisL) {
  for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k / 4) % 1), r = u < 0.4 ? 1 : 2, xx = Math.round(x + Math.sin(u * 5 + k) * 2 + u * 5), yy = Math.round(y - u * 18); if (r === 1) { R.pset(xx, yy, c); R.pset(xx + 1, yy, c); R.pset(xx, yy - 1, c); } else R.disco(xx, yy, r, u > 0.75 ? C.blanco : c); }
}

// árbol de otoño (copa redonda de color), pino o árbol pelado de invierno
export function arbol(R, x, suelo, t, o = {}) {
  const tipo = o.tipo ?? 'otono', s = o.s ?? 1, h = Math.round(22 * s), m = Math.round(Math.sin(t * 1.1 + x) * 1);
  R.rect(x - 1, suelo - h, x + 1, suelo, C.maderaS); R.pset(x - 2, suelo - 1, C.maderaS); R.pset(x + 2, suelo - 1, C.maderaS);
  if (tipo === 'pino') {
    for (let j = 0; j < 4; j++) { const w = Math.round((10 - j * 2) * s), y = suelo - h * 0.4 - j * 7 * s; R.poligono([[x + m, y - 9 * s], [x - w, y], [x + w, y]], j % 2 ? C.pino : C.pinoS); }
    return;
  }
  if (tipo === 'pelado' || tipo === 'invierno') {
    for (const [dx, dy] of [[-6, -8], [6, -10], [-3, -14], [4, -5]]) R.linea(x, suelo - h + 6, x + dx * s, suelo - h + dy * s, C.maderaS);
    if (tipo === 'invierno') R.rect(x - 4, suelo - h - 1, x + 4, suelo - h, C.nieve);
    return;
  }
  const verde = tipo === 'verde', cols = verde ? [C.hierba, C.verdeL, C.hierbaL] : [C.rojo, C.naranja, C.amarillo];
  const c0 = cols[Math.abs(Math.round(x)) % cols.length], c1 = verde ? C.hierbaS : c0 === C.rojo ? C.rojoS : c0 === C.naranja ? C.naranjaS : C.amarilloS;
  const cy = suelo - h - 4 * s;
  R.disco(x + m, cy, Math.round(11 * s), C.k); R.disco(x + m, cy, Math.round(10 * s), c1); R.disco(x - 2 + m, cy - 2, Math.round(8 * s), c0);
  R.disco(x - 4 + m, cy - 4, Math.round(3 * s), verde ? C.hierbaL : c0 === C.amarillo ? C.oroL : C.amarillo);
  for (let k = 0; k < 4; k++) if (Math.sin(t * 3 + x + k * 1.7) > 0.4) R.pset(Math.round(x + m - 6 + k * 4), Math.round(cy - 6 + (k % 2) * 7), k % 2 ? c1 : (verde ? C.hierbaL : C.oroL));
}

// ── animales ─────────────────────────────────────────────────────────────────────────────────────────────────────
// pavo salvaje de perfil (mirando a la derecha; dir −1 lo voltea), dibujado a mano: cola en abanico con puntas
// claras, cuerpo pardo, cabeza azul con moco rojo. o.corre (patas y saltitos), o.suda (gota de sudor)
const PAVO = [
  '...kkkk...........',
  '..kwwwwk..........',
  '.kwTtTtwk.........',
  'kwTtTtTtwk...kk...',
  'kwtTtTtTwk..kHHk..',
  'kwTtTtTtTwk.kHkHk.',
  'kwtTtTtTtwk.kHHHYk',
  '.kwTtTtTkkk.kRHHk.',
  '.kwtTtkBBBBkkRRk..',
  '..kwkBBBBBBBkHk...',
  '...kBBBBBBBBBk....',
  '...kBbBBBBBBBk....',
  '...kbBbBBBBBbk....',
  '....kbbbbbbbk.....',
  '.....kkkkkkk......',
];
const PATAS = [['......kL..kL......', '......kL..kL......', '.....kLLk.kLLk....'], ['.....kL....kL.....', '......kL..kL......', '......kLLkLLk.....']];
const PAVO_PAL = pal({ k: '#1c1222', w: '#f2eee2', T: '#a87040', t: '#5e3a1e', B: '#7a4a2a', b: '#4e2e16', H: '#4a78d0', R: '#d83a3a', Y: '#e8b830', L: '#c88a2a' });
export function pavo(R, x, suelo, t, o = {}) {
  const d = o.dir ?? 1, sy = o.corre ? Math.round(Math.abs(Math.sin(t * 16)) * 3) : 0, f = o.corre ? Math.floor(t * 12) % 2 : 0;
  const y0 = suelo - 18 - sy;
  R.dibujo(PAVO, x - 9, y0, d, PAVO_PAL); R.dibujo(PATAS[f], x - 9, y0 + 15, d, PAVO_PAL);
  if (o.suda) gotaSudor(R, x + 9 * d, y0 + 1, t);
}

// gallina (con su huevo) y vaca (con su cubo de leche): tranquilas
export function gallina(R, x, suelo, t) {
  const b = Math.floor(t * 2) % 2;
  R.disco(x, suelo - 5, 4, C.k); R.disco(x, suelo - 5, 3, C.blanco); R.disco(x + 4, suelo - 9, 2, C.blanco); R.pset(x + 4, suelo - 12, C.rojo); R.pset(x + 5, suelo - 12, C.rojo);
  R.pset(x + 7, suelo - 9 + b, C.oro); R.pset(x + 5, suelo - 10, C.k); R.rect(x - 1, suelo - 1, x - 1, suelo, C.oroS); R.rect(x + 1, suelo - 1, x + 1, suelo, C.oroS);
}
export function huevo(R, x, suelo) { R.disco(x, suelo - 2, 2, C.k); R.rect(x - 1, suelo - 4, x + 1, suelo - 1, C.blanco); R.pset(x, suelo - 4, C.papel); }
export function vaca(R, x, suelo, t) {
  const c = pal({ a: '#f6f2ea', n: '#2a2430', r: '#e8a0a0' }), m = Math.round(Math.sin(t * 1.5));
  R.rect(x - 12, suelo - 16, x + 8, suelo - 6, C.k); R.rect(x - 11, suelo - 15, x + 7, suelo - 7, c.a);
  R.rect(x - 8, suelo - 15, x - 4, suelo - 11, c.n); R.rect(x + 1, suelo - 12, x + 4, suelo - 8, c.n);
  R.rect(x + 8, suelo - 18 + m, x + 14, suelo - 11 + m, C.k); R.rect(x + 9, suelo - 17 + m, x + 13, suelo - 12 + m, c.a); R.rect(x + 12, suelo - 14 + m, x + 14, suelo - 12 + m, c.r);
  R.pset(x + 10, suelo - 16 + m, C.k); R.pset(x + 9, suelo - 19 + m, C.papel); R.pset(x + 13, suelo - 19 + m, C.papel);
  for (const px of [x - 10, x - 7, x + 3, x + 6]) R.rect(px, suelo - 6, px + 1, suelo, C.k);
  R.pset(x - 13, suelo - 13 + m, C.k); R.pset(x - 14, suelo - 12 + m, C.k); R.rect(x - 2, suelo - 7, x, suelo - 5, c.r);
}
export function cubo(R, x, suelo) { R.rect(x - 3, suelo - 6, x + 3, suelo, C.k); R.rect(x - 2, suelo - 5, x + 2, suelo - 1, C.grisL); R.rect(x - 2, suelo - 5, x + 2, suelo - 5, C.blanco); }

// ciervo (de pie o llevado entre dos)
export function ciervo(R, x, suelo, t, o = {}) {
  const d = o.dir ?? 1, X = (i) => Math.round(x + i * d), c = pal({ a: '#a8743c', s: '#83552c', l: '#e8d0a8' });
  R.rect(Math.min(X(-8), X(6)), suelo - 14, Math.max(X(-8), X(6)), suelo - 8, c.a); R.rect(Math.min(X(-8), X(6)), suelo - 8, Math.max(X(-8), X(6)), suelo - 8, c.s);
  R.rect(Math.min(X(6), X(8)), suelo - 20, Math.max(X(6), X(8)), suelo - 13, c.a); R.rect(Math.min(X(8), X(11)), suelo - 21, Math.max(X(8), X(11)), suelo - 18, c.a);
  R.pset(X(9), suelo - 20, C.k); R.pset(X(11), suelo - 19, C.k); R.linea(X(7), suelo - 22, X(5), suelo - 27, c.s); R.linea(X(8), suelo - 22, X(10), suelo - 27, c.s); R.pset(X(4), suelo - 25, c.s); R.pset(X(11), suelo - 25, c.s);
  R.pset(X(-9), suelo - 13, c.l); for (const i of [-7, -5, 3, 5]) R.rect(X(i), suelo - 7, X(i), suelo, c.s);
}

// cordero (el de «María tenía un corderito»)
export function cordero(R, x, suelo, t) {
  const b = Math.floor(t * 3) % 2;
  R.disco(x, suelo - 6, 5, C.k); R.disco(x, suelo - 6, 4, C.blanco); R.disco(x - 3, suelo - 8, 2, C.blanco); R.disco(x + 2, suelo - 9, 2, C.blanco);
  R.rect(x + 4, suelo - 10, x + 7, suelo - 6, C.k); R.pset(x + 6, suelo - 9, C.blanco); R.pset(x + 7, suelo - 8 + b, C.rosa);
  for (const px of [x - 3, x + 2]) R.rect(px, suelo - 2, px, suelo, C.k);
}

// pescado (el abono del maíz), con salto si o.salta (u 0–1)
export function pescado(R, x, y, o = {}) {
  const d = o.dir ?? 1; R.rect(x - 3, y - 1, x + 2, y, C.grisL); R.pset(x + 3 * d, y, C.grisL); R.pset(x - 4 * d, y - 2, C.gris); R.pset(x - 4 * d, y + 1, C.gris); R.pset(x + 2 * d, y - 1, C.k);
}

// ── A · Plymouth ─────────────────────────────────────────────────────────────────────────────────────────────────
// o.estacion: 'otono' (por defecto), 'invierno', 'primavera'; o.mayflower (x del barco en la bahía, o false);
// o.mesa (la mesa larga de la cosecha: 0–1 la llena), o.maiz (0–1 los campos), o.tarde, o.wetu (cabaña wampanoag)
export function plymouth(R, t, o = {}) {
  const { rect, pset } = R, est = o.estacion ?? 'otono', inv = est === 'invierno', pri = est === 'primavera';
  cielo(R, t, { hor: 96, invierno: inv, tarde: o.tarde, aves: o.aves });
  // la bahía a la izquierda, con el Mayflower anclado
  bahia(R, t, { x1: 140, y0: 78, y1: 97, inv, tarde: o.tarde, barca: o.barca !== false && !inv });
  if (o.mayflower !== false) { const mx = o.mayflower ?? 62; reflejo(R, mx, 91, t, 26, inv ? C.marI : hex('#1e4a8a')); mayflower(R, mx, 88, t, { s: 0.55, nieve: inv }); }
  // colinas con el bosque detrás
  for (let x = 120; x < 320; x++) { const top = Math.round(74 + 6 * Math.sin(x * 0.03) + 3 * Math.sin(x * 0.11 + 2)); for (let y = top; y < 100; y++) pset(x, y, y === top ? C.k : inv ? (y < top + 4 ? C.nieve : C.nieveS) : y < top + 3 ? C.hierbaL : C.hierbaS); }
  for (let k = 0; k < 14; k++) { const x = 128 + k * 14 + (k % 3) * 3, s = 0.55 + (k % 3) * 0.1; arbol(R, x, 86 + (k % 2) * 4, t, { tipo: inv ? 'invierno' : k % 4 === 1 ? 'pino' : pri ? 'verde' : 'otono', s }); }
  // la orilla y el suelo
  for (let y = 96; y < 132; y++) rect(0, y, 319, y, inv ? (y < 98 ? C.nieveS : C.nieve) : y < 98 ? C.hierbaL : pri ? C.tierraL : C.hierba);
  if (!inv) {   // prado con matas, flores y piedrecitas
    for (let k = 0; k < 60; k++) { const x = (k * 53 + 7) % 320, y = 100 + (k * 29) % 30; pset(x, y, C.hierbaS); pset(x + 1, y - 1, C.hierbaS); pset(x + 2, y, C.hierbaS); if (k % 5 === 0) pset(x + 1, y - 2, [C.amarillo, C.blanco, C.rosa][k % 3]); }
    for (const [x, y, r] of [[96, 112, 5], [140, 122, 4], [286, 104, 4], [60, 104, 3]]) { R.disco(x, y, r, C.k); R.disco(x, y, r - 1, C.hierbaS); R.disco(x - 1, y - 1, r - 2, C.hierba); }
  } else {      // nieve con montículos y sombras azules al pie de las cosas
    for (const [x, y, r] of [[96, 112, 6], [140, 122, 5], [286, 104, 5], [60, 106, 4], [30, 118, 5]]) { for (let j = -r; j <= 0; j++) { const w = Math.round(Math.sqrt(r * r - j * j) * 1.6); rect(x - w, y + j, x + w, y + j, C.nieve); pset(x - w - 1, y + j, C.nieveS); } rect(x - Math.round(r * 1.6), y + 1, x + Math.round(r * 1.6) + 2, y + 1, C.nieveS); }
    rect(150, 112, 319, 114, C.nieveS); for (let x = 0; x < 150; x += 9) pset(x, 99 + (x % 4), C.nieveS);
  }
  // empalizada y cabañas
  for (let x = 150; x < 320; x += 4) { rect(x, 96, x + 2, 112, C.madera); rect(x, 96, x, 112, C.maderaL); pset(x + 1, 94, C.maderaS); pset(x, 95, C.madera); pset(x + 2, 95, C.madera); rect(x + 3, 95, x + 3, 112, C.k); if ((x / 4) % 3 === 0) pset(x + 1, 104, C.maderaS); if (inv) { rect(x, 95, x + 2, 95, C.nieve); pset(x + 1, 94, C.nieve); } }
  rect(150, 101, 319, 101, C.maderaS); rect(150, 108, 319, 108, C.maderaS);
  for (const [cx, w] of [[176, 30], [222, 34], [270, 30]]) cabana(R, cx, 124, w, t, { nieve: inv, luz: o.luces?.(cx) });
  if (o.wetu !== false) wetu(R, 120, 124, t, { nieve: inv });
  // campos de maíz y calabazas
  if (!inv && (o.maiz ?? 0) > 0) for (let k = 0; k < 18; k++) { const x = 10 + k * 7, h = Math.round(o.maiz * (10 + (k % 3) * 2)); if (h > 0) { rect(x, 128 - h, x, 128, C.hierbaS); pset(x + 1, 128 - h + 2, C.hierba); pset(x - 1, 128 - h + 4, C.hierba); if (o.maiz > 0.8 && !pri) { rect(x + 1, 128 - h + 5, x + 2, 128 - h + 7, C.maiz); } } }
  if (est === 'otono' && o.calabazas !== false) for (const [x, r] of [[26, 3], [44, 4], [70, 3], [300, 4]]) { R.disco(x, 129, r, C.k); R.disco(x, 129, r - 1, C.calabaza); pset(x - 1, 128, C.naranja); pset(x, 129 - r, C.hierbaS); }
  // el camino (el escenario)
  for (let y = 132; y < 146; y++) rect(0, y, 319, y, y === 132 ? C.k : inv ? (y < 135 ? C.nieve : y > 142 ? C.nieveS : C.nieve) : y < 135 ? C.caminoL : C.camino);
  if (inv) { for (let k = 0; k < 18; k++) { const x = 8 + k * 17 + (k % 2) * 4, y = 137 + (k % 2) * 3; rect(x, y, x + 1, y + 1, C.nieveS); } for (let x = 0; x < 320; x += 40) { R.disco(x + 20, 133, 3, C.nieve); R.disco(x + 22, 134, 2, C.nieveS); } }
  else { rect(0, 138, 319, 138, C.caminoS); rect(0, 142, 319, 142, C.caminoS); for (let k = 0; k < 26; k++) { const x = (k * 37 + 5) % 318, y = 134 + (k * 7) % 11; rect(x, y, x + 1, y, k % 3 ? C.caminoS : C.piedra); if (k % 4 === 0) pset(x, y - 1, C.caminoL); } }
  for (let y = 146; y < 180; y++) rect(0, y, 319, y, inv ? (y % 6 === 0 ? C.nieveS : C.nieve) : y < 148 ? C.hierbaS : (y % 7 === 0 ? C.hierbaD : C.hierba));
  primerPlano(R, t, { invierno: inv, otono: est === 'otono' });
  if (o.vida !== false) vidaColonia(R, t, { inv });
  // atrezo en los extremos del escenario (donde no suele haber personajes)
  for (let k = 0; k < 9; k++) { const x = 292 + (k % 4) * 6 + (Math.floor(k / 4) % 2) * 3, y = 130 - Math.floor(k / 4) * 5; R.disco(x, y, 3, C.k); R.disco(x, y, 2, C.madera); R.pset(x, y, C.maderaL); R.pset(x - 1, y - 1, C.maderaS); }
  if (inv) rect(290, 119, 318, 120, C.nieve);
  rect(6, 130, 15, 131, C.k); rect(5, 120, 16, 130, C.k); rect(6, 121, 15, 129, C.madera); rect(6, 123, 15, 123, C.grisS); rect(6, 127, 15, 127, C.grisS); rect(13, 121, 14, 129, C.maderaS); if (inv) rect(5, 119, 16, 120, C.nieve);
  if (!inv) { rect(20, 126, 27, 131, C.k); rect(21, 127, 26, 131, C.madera); rect(21, 127, 26, 127, C.maderaL); R.linea(24, 126, 29, 121, C.maderaS); rect(27, 120, 30, 122, C.grisL); }
  if (o.mesa) mesaCosecha(R, 160, 145, o.mesa, t);
  if (est === 'otono') hojas(R, t, 12);
  if (inv) nevada(R, t, 60);
  if (!inv) viento(R, t, { y0: 134, y1: 145, fuerza: 0.4, color: C.caminoL, grano: C.caminoS });
}

// primer plano: valla de troncos, matas con bayas, piedras y hierba alta que se mece (o nieve amontonada)
export function primerPlano(R, t, o = {}) {
  for (let x = 0; x < 320; x += 22) { R.rect(x, 152, x + 2, 166, C.madera); R.rect(x + 2, 152, x + 2, 166, C.maderaS); R.rect(x - 1, 151, x + 3, 151, C.k); if (o.invierno) R.rect(x - 1, 150, x + 3, 150, C.nieve); }
  R.rect(0, 156, 319, 157, C.maderaL); R.rect(0, 158, 319, 158, C.maderaS); R.rect(0, 161, 319, 162, C.maderaL); R.rect(0, 163, 319, 163, C.maderaS);
  if (o.invierno) { for (let x = 0; x < 320; x += 30) { R.disco(x + 12, 176, 9, C.nieveS); R.disco(x + 12, 177, 8, C.nieve); } return; }
  for (const [x, r] of [[34, 7], [120, 6], [214, 8], [292, 6]]) { R.disco(x, 172, r, C.k); R.disco(x, 172, r - 1, C.hierbaS); R.disco(x - 2, 170, r - 3, C.hierba); for (let k = 0; k < 4; k++) R.pset(x - 3 + k * 2, 169 + (k % 2) * 3, o.otono ? C.rojo : C.rosa); }
  for (const [x, r] of [[78, 4], [168, 3], [256, 5]]) { R.disco(x, 176, r, C.k); R.disco(x, 176, r - 1, C.piedra); R.pset(x - 1, 174, C.grisL); }
  for (let x = 2; x < 320; x += 5) { const m = Math.round(Math.sin(t * 1.5 + x * 0.3)); R.linea(x, 180, x + m, 172 + (x % 3), x % 2 ? C.hierbaS : C.hierbaL); }
}

// ── agua viva: bandas, olas en tres profundidades a distinta velocidad, destellos que titilan y espuma en la orilla
export function bahia(R, t, o = {}) {
  const { rect, pset } = R, x0 = o.x0 ?? 0, x1 = o.x1 ?? 319, y0 = o.y0, y1 = o.y1, inv = o.inv;
  const c = inv ? [C.marIL, C.marI, hex('#3e5a78'), C.marIL] : o.tarde ? [C.tarde3, hex('#4a5a9a'), hex('#3a4a8a'), C.tarde4] : [C.mar3, C.mar2, C.mar1, C.marL];
  for (let y = y0; y <= y1; y++) rect(x0, y, x1, y, y < y0 + 2 ? c[0] : y < y0 + 8 ? c[1] : c[2]);
  // olas: arquitos que avanzan, más lentas y pequeñas cuanto más lejos
  [[y0 + 3, 3, 9, 2], [y0 + 8, 5, 13, 3], [y0 + 13, 8, 17, 4]].forEach(([y, v, paso, w], fila) => {
    if (y > y1 - 1) return;
    for (let x = x0 - paso + ((t * v) % paso); x < x1; x += paso) { const xx = Math.round(x + (fila % 2) * 4); if (xx < x0 || xx + w > x1) continue; pset(xx, y, c[3]); for (let i = 1; i < w; i++) pset(xx + i, y - 1, c[3]); pset(xx + w, y, c[3]); }
  });
  // destellos de luz
  for (let k = 0; k < 8; k++) { const x = x0 + ((k * 41 + Math.floor(t * 0.7 + k) * 13) % (x1 - x0)), y = y0 + 2 + (k * 5) % Math.max(1, y1 - y0 - 3); const f = (t * 2 + k * 0.37) % 1; if (f < 0.35) { pset(x, y, C.blanco); if (f < 0.15) { pset(x - 1, y, c[3]); pset(x + 1, y, c[3]); pset(x, y - 1, c[3]); } } }
  // espuma que va y viene en la orilla
  const e = Math.round(Math.sin(t * 1.3) * 2);
  for (let x = x0; x <= x1; x++) if ((x + Math.floor(t * 3)) % 7 < 5) pset(x, y1 + (x % 2) - (e > 0 ? 1 : 0), inv ? C.nieve : C.blanco);
  // una barca de pesca que cruza remando
  if (o.barca) { const bx = Math.round(x0 + ((t * 5) % (x1 - x0 + 60)) - 30), by = y0 + 11 + Math.round(Math.sin(t * 2) * 0.6); if (bx > x0 - 20 && bx < x1 + 10) { rect(bx - 7, by, bx + 7, by + 2, C.maderaS); rect(bx - 8, by - 1, bx + 8, by - 1, C.madera); rect(bx - 6, by + 3, bx + 6, by + 3, c[2]); mini(R, bx, by - 1, t, { ropa: C.maderaL }); const r = Math.sin(t * 4) > 0; R.linea(bx - 2, by - 3, bx - 9, by + (r ? 3 : 1), C.maderaD); R.linea(bx + 2, by - 3, bx + 9, by + (r ? 3 : 1), C.maderaD); } }
}

// reflejo de un barco: franjas oscuras que ondulan bajo el casco
export function reflejo(R, cx, y, t, w, col) {
  for (let j = 0; j < 7; j++) { if (j % 2) continue; const off = Math.round(Math.sin(t * 3 + j) * 1.5), ww = Math.round(w * (1 - j / 10)); R.rect(cx - ww + off, y + j, cx + ww + off, y + j, col); }
  for (const dx of [-11, 2, 14]) for (let j = 0; j < 9; j += 2) R.pset(cx + dx + Math.round(Math.sin(t * 3 + j)), y + 6 + j, col);
}

// vida de fondo en la colonia: un leñador junto a la leña, un colono que va al pozo y vuelve, gallinas que picotean
export function vidaColonia(R, t, o = {}) {
  // el pozo
  R.rect(244, 120, 258, 126, R.hex('#6e6a78')); R.rect(245, 121, 257, 125, C.piedra); for (let x = 246; x < 257; x += 4) R.pset(x, 123, C.piedraS);
  R.rect(245, 110, 246, 120, C.maderaS); R.rect(256, 110, 257, 120, C.maderaS); R.poligono([[242, 110], [260, 110], [251, 104]], o.inv ? C.nieve : C.paja); R.linea(251, 110, 251, 116, C.k);
  // leñador: levanta el hacha y la baja sobre el tocón; saltan astillas
  const g = (t * 0.9) % 1, arriba = g < 0.55, lx = 282;
  R.rect(lx + 6, 126, lx + 12, 130, C.maderaS); R.rect(lx + 6, 126, lx + 12, 126, C.maderaL);
  mini(R, lx, 130, t, { brazo: arriba ? 'arriba' : true, ropa: hex('#2a2430') });
  if (arriba) { R.linea(lx + 3, 120, lx + 4, 114, C.maderaS); R.rect(lx + 4, 113, lx + 6, 114, C.grisL); } else { R.linea(lx + 3, 124, lx + 8, 124, C.maderaS); R.rect(lx + 8, 123, lx + 9, 125, C.grisL); if (g < 0.7) { R.pset(lx + 10, 122, C.maderaL); R.pset(lx + 12, 120, C.maderaL); } }
  // el del cubo: va de la cabaña al pozo, se para a sacar agua y vuelve
  const ciclo = (t * 0.08) % 1, ida = ciclo < 0.4, para = ciclo >= 0.4 && ciclo < 0.55;
  const f = ida ? ciclo / 0.4 : para ? 1 : 1 - (ciclo - 0.55) / 0.45, ax = Math.round(186 + f * 52);
  mini(R, ax, 130, t, { anda: !para, ropa: hex('#4a3a5a') }); R.rect(ax + 2, 125, ax + 4, 128, para || !ida ? C.mar2 : C.grisS); R.rect(ax + 2, 125, ax + 4, 125, C.grisS);
  // gallinas
  if (!o.inv) for (const [x0, k] of [[110, 0], [126, 1]]) { const x = Math.round(x0 + Math.sin(t * 0.3 + k * 2) * 8), pica = Math.sin(t * 4 + k) > 0.3; R.disco(x, 127, 2, C.blanco); R.pset(x + 2, pica ? 127 : 125, C.blanco); R.pset(x + 3, pica ? 128 : 125, C.oro); R.pset(x + 2, pica ? 126 : 124, C.rojo); R.pset(x - 1, 130, C.oroS); R.pset(x + 1, 130, C.oroS); }
}

// cabaña de troncos con techo de paja, chimenea con humo y ventana (o.luz: false = ventana apagada)
export function cabana(R, cx, suelo, w, t, o = {}) {
  const x0 = cx - w / 2, x1 = cx + w / 2, h = 14;
  for (let y = suelo - h; y <= suelo; y++) R.rect(x0, y, x1, y, (y - suelo) % 3 === 0 ? C.maderaS : C.madera);
  R.rect(x0 - 1, suelo - h, x0 - 1, suelo, C.k); R.rect(x1 + 1, suelo - h, x1 + 1, suelo, C.k);
  R.poligono([[x0 - 4, suelo - h], [cx, suelo - h - 12], [x1 + 4, suelo - h]], o.nieve ? C.nieve : C.paja);
  R.linea(x0 - 4, suelo - h, cx, suelo - h - 12, C.k); R.linea(cx, suelo - h - 12, x1 + 4, suelo - h, C.k);
  if (!o.nieve) for (let k = 0; k < 4; k++) R.linea(cx - 2 + k * 3, suelo - h - 9 + k * 2, cx + 6 + k * 3, suelo - h - 1, C.pajaS);
  R.rect(x1 - 7, suelo - h - 14, x1 - 4, suelo - h - 4, C.piedraS); R.rect(x1 - 7, suelo - h - 14, x1 - 4, suelo - h - 14, C.piedra);
  humo(R, x1 - 5, suelo - h - 16, t + cx);
  for (let y = suelo - h + 1; y <= suelo; y += 3) { R.disco(x0 - 1, y, 1, C.maderaL); R.pset(x0 - 1, y, C.maderaS); R.disco(x1 + 1, y, 1, C.maderaL); R.pset(x1 + 1, y, C.maderaS); }
  R.rect(x0 + 3, suelo - 10, x0 + 10, suelo, C.k); R.rect(x0 + 4, suelo - 9, x0 + 9, suelo, C.maderaD); R.rect(x0 + 6, suelo - 9, x0 + 6, suelo, C.k); R.pset(x0 + 8, suelo - 5, C.oro);
  R.rect(x1 - 12, suelo - 11, x1 - 5, suelo - 5, C.k); R.rect(x1 - 11, suelo - 10, x1 - 6, suelo - 6, o.luz === false ? C.maderaD : C.oroL); R.rect(x1 - 9, suelo - 10, x1 - 8, suelo - 6, C.k);
  R.rect(x1 - 14, suelo - 11, x1 - 13, suelo - 5, C.maderaS); R.rect(x1 - 4, suelo - 11, x1 - 3, suelo - 5, C.maderaS); R.rect(x1 - 12, suelo - 4, x1 - 5, suelo - 4, C.maderaL);
}

// wetu: cabaña wampanoag en forma de cúpula, de corteza y esteras
export function wetu(R, cx, suelo, t, o = {}) {
  for (let y = -14; y <= 0; y++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - (y / 14) ** 2)) * 13); R.rect(cx - w, suelo + y, cx + w, suelo + y, (y + 14) % 4 === 0 ? C.cortezaS : C.corteza); R.pset(cx - w - 1, suelo + y, C.k); R.pset(cx + w + 1, suelo + y, C.k); }
  R.rect(cx - 13, suelo - 15, cx + 13, suelo - 15, C.k);
  if (o.nieve) R.rect(cx - 9, suelo - 15, cx + 9, suelo - 13, C.nieve);
  R.rect(cx - 3, suelo - 7, cx + 3, suelo, C.maderaD); humo(R, cx, suelo - 16, t + 7);
}

// el Mayflower: casco de madera con castillos de popa y proa, tres palos con velas cuadradas, bauprés y jarcia; s = escala
export function mayflower(R, x, y, t, o = {}) {
  const s = o.s ?? 1, b = Math.round(Math.sin(t * 1.4) * 1), Y = (v) => Math.round(y + (v * s) + b), X = (u) => Math.round(x + u * s);
  // casco
  R.poligono([[X(-42), Y(-14)], [X(42), Y(-16)], [X(36), Y(4)], [X(-34), Y(4)]], C.maderaS);
  R.poligono([[X(-42), Y(-14)], [X(-22), Y(-14)], [X(-22), Y(-24)], [X(-42), Y(-26)]], C.madera);
  R.poligono([[X(30), Y(-16)], [X(42), Y(-16)], [X(44), Y(-24)], [X(30), Y(-22)]], C.madera);
  R.linea(X(-42), Y(-14), X(42), Y(-16), C.maderaL); R.linea(X(-34), Y(4), X(36), Y(4), C.k); R.linea(X(-42), Y(-26), X(-42), Y(-14), C.k);
  for (let u = -30; u < 30; u += 10) R.rect(X(u), Y(-8), X(u) + 1, Y(-7), C.maderaD);   // portillas
  R.linea(X(42), Y(-18), X(60), Y(-26), C.maderaD);                                      // bauprés
  // palos y velas
  for (const [u, h, w] of [[-20, 46, 12], [4, 56, 15], [26, 40, 11]]) {
    const top = -14 - h;
    R.linea(X(u), Y(-14), X(u), Y(top), C.maderaD);
    for (const [f0, f1, ww] of [[0.18, 0.52, w], [0.58, 0.86, w * 0.75]]) {
      const y0 = Y(top + h * f0), y1 = Y(top + h * f1), x0 = X(u - ww), x1 = X(u + ww), hinche = Math.round(Math.sin(t * 1.2 + u) * 0.6 + 1);
      R.rect(x0, y0, x1, y1, o.nieve ? C.nieveS : C.papel); R.rect(x1 - hinche, y0, x1, y1, C.papelS);
      R.rect(x0, y0 - 1, x1, y0 - 1, C.maderaD); R.rect(x0 - 1, y0, x0 - 1, y1, C.k); R.rect(x1 + 1, y0, x1 + 1, y1, C.k); R.rect(x0, y1 + 1, x1, y1 + 1, C.k);
    }
    R.linea(X(u), Y(top), X(u - 22), Y(-14), C.maderaS); R.linea(X(u), Y(top), X(u + 22), Y(-15), C.maderaS);
  }
  R.rect(X(4), Y(-76), X(4) + Math.round(6 * s) + 1, Y(-73), C.rojo);
}

// la mesa larga de la cosecha al aire libre: p 0–1 la va llenando de comida (patos, maíz, pan, calabazas, venado)
export function mesaCosecha(R, cx, suelo, p, t) {
  const x0 = cx - 70, x1 = cx + 70, y = suelo - 12;
  R.rect(x0, y, x1, y + 2, C.maderaL); R.rect(x0, y + 3, x1, y + 3, C.maderaS); R.rect(x0, y, x1, y, C.k);
  for (const px of [x0 + 4, cx, x1 - 6]) R.rect(px, y + 4, px + 2, suelo, C.maderaS);
  const platos = [['pato', -60], ['maiz', -44], ['pan', -30], ['calabaza', -14], ['ganso', 4], ['maiz', 22], ['venado', 40], ['pan', 58]];
  platos.forEach(([q, dx], k) => {
    if (p < k / platos.length) return;
    const x = cx + dx;
    R.rect(x - 5, y - 1, x + 5, y - 1, C.blanco);
    if (q === 'pato' || q === 'ganso') { R.disco(x, y - 4, 4, C.k); R.disco(x, y - 4, 3, C.pavoL); R.pset(x - 1, y - 6, C.oroL); }
    if (q === 'maiz') for (let i = -3; i <= 3; i += 3) { R.rect(x + i, y - 6, x + i + 1, y - 2, C.maiz); R.pset(x + i, y - 2, C.hierbaS); }
    if (q === 'pan') { R.rect(x - 3, y - 4, x + 3, y - 2, C.ocre); R.rect(x - 2, y - 5, x + 2, y - 5, C.ocre); R.pset(x, y - 4, C.oroL); }
    if (q === 'calabaza') { R.disco(x, y - 4, 3, C.k); R.disco(x, y - 4, 2, C.calabaza); R.pset(x, y - 7, C.hierbaS); }
    if (q === 'venado') { R.rect(x - 4, y - 5, x + 4, y - 2, C.rojoS); R.rect(x - 4, y - 5, x + 4, y - 5, C.maderaL); R.rect(x + 4, y - 6, x + 6, y - 5, C.blanco); }
  });
}

// ── B · el comedor ───────────────────────────────────────────────────────────────────────────────────────────────
// o.epoca: 'xix' (papel de rayas verdes, quinqué) u 'hoy' (pared cálida, lámpara); o.noche (ventana de noche con nieve);
// o.mesa (0–1: la cena va apareciendo), o.sofa (el sofá a la izquierda), o.escritorio (el de Sarah Hale), o.recogida
// (la mesa sin comida), o.cal (función que dibuja el calendario de la pared: (x, y) => …)
export function comedor(R, t, o = {}) {
  const { rect, pset } = R, xix = o.epoca === 'xix';
  // pared con papel pintado y zócalo de madera
  const p1 = xix ? hex('#8aa880') : hex('#e0b878'), p2 = xix ? hex('#a8c49a') : hex('#ecc890');
  for (let x = 0; x < 320; x++) rect(x, 0, x, 120, Math.floor(x / 6) % 2 ? p1 : p2);
  if (xix) for (let y = 10; y < 118; y += 16) for (let x = 3; x < 320; x += 12) pset(x + ((y / 16) % 2 ? 6 : 0), y, C.oro);
  rect(0, 100, 319, 120, C.madera); rect(0, 100, 319, 101, C.maderaL); rect(0, 120, 319, 121, C.k);
  for (let x = 8; x < 320; x += 24) { rect(x, 104, x + 18, 116, C.maderaS); rect(x + 1, 105, x + 17, 115, C.madera); }
  // ventana con cortinas: fuera, de día un árbol de otoño; de noche, nieve y estrellas
  const wx0 = 22, wx1 = 82, wy0 = 26, wy1 = 86;
  for (let y = wy0; y <= wy1; y++) rect(wx0, y, wx1, y, o.noche ? hex('#1c2350') : y < 60 ? C.cielo2 : C.cielo3);
  if (o.noche) { for (let k = 0; k < 12; k++) pset(wx0 + 3 + (k * 17) % 56, wy0 + 3 + (k * 11) % 54, C.blanco); for (let k = 0; k < 14; k++) { const yy = wy0 + ((k * 13 + t * 9) % 60), xx = wx0 + (k * 23 + Math.sin(t + k) * 3) % 60; pset(Math.round(xx), Math.round(yy), C.nieve); } rect(wx0, wy1 - 6, wx1, wy1, C.nieve); }
  else { arbol(R, 52, wy1, t, { s: 1.1 }); rect(wx0, wy1 - 4, wx1, wy1, C.hierba); }
  rect(wx0 - 2, wy0 - 2, wx1 + 2, wy0 - 1, C.k); rect(wx0 - 2, wy1 + 1, wx1 + 2, wy1 + 3, C.blanco); rect(wx0 - 2, wy0, wx0 - 1, wy1, C.k); rect(wx1 + 1, wy0, wx1 + 2, wy1, C.k);
  rect(Math.round((wx0 + wx1) / 2), wy0, Math.round((wx0 + wx1) / 2) + 1, wy1, C.blanco); rect(wx0, Math.round((wy0 + wy1) / 2), wx1, Math.round((wy0 + wy1) / 2) + 1, C.blanco);
  for (const [x0, s] of [[wx0 - 10, 1], [wx1 + 2, -1]]) { for (let x = 0; x < 10; x++) rect(x0 + x, wy0 - 6, x0 + x, wy1 + 8 - Math.round(Math.abs(x - (s > 0 ? 9 : 0)) * 0.3), x % 3 === 0 ? C.rojoS : C.rojo); }
  rect(wx0 - 12, wy0 - 8, wx1 + 12, wy0 - 6, C.maderaD);
  // chimenea con fuego, repisa con velas y calabazas, y un cuadro encima
  const cx = 226;
  rect(cx - 30, 70, cx + 30, 120, C.ladrilloS); for (let y = 72; y < 120; y += 4) for (let x = cx - 29 + ((y / 4) % 2) * 3; x < cx + 29; x += 7) rect(x, y, x + 5, y + 2, C.ladrillo);
  rect(cx - 34, 66, cx + 34, 70, C.maderaL); rect(cx - 34, 70, cx + 34, 70, C.maderaS); rect(cx - 16, 92, cx + 16, 120, C.maderaD); rect(cx - 15, 93, cx + 15, 120, hex('#2a1810'));
  for (let k = 0; k < 6; k++) { const h = 8 + Math.round(Math.abs(Math.sin(t * 7 + k * 1.3)) * 8), xx = cx - 10 + k * 4; rect(xx, 118 - h, xx + 2, 118, k % 2 ? C.naranja : C.amarillo); pset(xx + 1, 117 - h, C.oroL); }
  rect(cx - 12, 117, cx + 12, 119, C.maderaS);
  for (const dx of [-26, 24]) { rect(cx + dx, 58, cx + dx + 2, 66, C.blanco); pset(cx + dx + 1, 56 + Math.round(Math.sin(t * 9 + dx)), C.oroL); pset(cx + dx + 1, 57, C.naranja); }
  for (const [dx, r] of [[-12, 3], [10, 4]]) { R.disco(cx + dx, 63, r, C.k); R.disco(cx + dx, 63, r - 1, C.calabaza); pset(cx + dx, 63 - r, C.hierbaS); }
  rect(cx - 18, 18, cx + 18, 50, C.oroS); rect(cx - 16, 20, cx + 16, 48, xix ? hex('#3a4a3a') : hex('#4a6a9a'));
  if (xix) { R.disco(cx, 32, 6, C.papel); rect(cx - 8, 38, cx + 8, 48, C.k); } else { for (let x = cx - 16; x <= cx + 16; x++) rect(x, 40 - Math.round(Math.sin(x * 0.2) * 3), x, 48, C.hierba); R.disco(cx + 8, 28, 3, C.sol); }
  // lámpara o quinqué
  if (xix) { rect(150, 8, 151, 30, C.oroS); R.disco(150, 34, 5, C.oroL); R.disco(150, 34, 3, C.sol); } else { rect(150, 0, 150, 22, C.k); R.poligono([[142, 30], [158, 30], [154, 22], [146, 22]], C.ocre); }
  // alacena con platos entre la ventana y la chimenea
  if (!o.cal) { rect(108, 44, 160, 100, C.maderaS); rect(110, 46, 158, 98, C.madera); for (const y of [62, 80]) rect(110, y, 158, y + 1, C.maderaS);
    for (const [y, n] of [[56, 4], [74, 4], [92, 3]]) for (let k = 0; k < n; k++) { const xx = 118 + k * 12; R.disco(xx, y, 4, C.k); R.disco(xx, y, 3, C.blanco); R.disco(xx, y, 1, C.azulL); }
    rect(106, 42, 162, 44, C.maderaL); }
  if (o.cal) o.cal(110, 30);
  // suelo de tablas y alfombra
  for (let y = 121; y < 180; y++) rect(0, y, 319, y, (y - 121) % 7 === 0 ? C.maderaS : C.maderaL);
  for (let y = 121; y < 180; y += 7) for (let x = ((y / 7) % 2) * 20; x < 320; x += 40) { rect(x, y, x, y + 6, C.maderaS); pset(x + 9, y + 3, C.maderaS); pset(x + 10, y + 3, C.maderaS); pset(x + 24, y + 2, C.madera); }
  rect(39, 149, 281, 177, C.k); rect(40, 150, 280, 176, C.alfombra); rect(44, 153, 276, 173, C.rojoS); rect(48, 156, 272, 170, C.alfombra);
  for (let x = 46; x < 276; x += 6) { pset(x, 151, C.oro); pset(x + 3, 175, C.oro); }
  for (let x = 60; x < 262; x += 20) { pset(x, 163, C.oro); pset(x - 1, 162, C.oroS); pset(x + 1, 164, C.oroS); }
  for (let x = 40; x <= 280; x += 3) { pset(x, 148, C.papel); pset(x, 178, C.papel); }
  // reloj de pared con péndulo que oscila
  { const rx = 292, ry = 34; rect(rx - 7, ry - 8, rx + 7, ry + 40, C.k); rect(rx - 6, ry - 7, rx + 6, ry + 39, C.maderaD); R.disco(rx, ry, 5, C.k); R.disco(rx, ry, 4, C.papel);
    const hh = (t * 0.02) % 1, mm = (t * 0.25) % 1; R.linea(rx, ry, rx + Math.round(Math.sin(hh * 6.28) * 2), ry - Math.round(Math.cos(hh * 6.28) * 2), C.k); R.linea(rx, ry, rx + Math.round(Math.sin(mm * 6.28) * 3), ry - Math.round(Math.cos(mm * 6.28) * 3), C.k);
    rect(rx - 4, ry + 8, rx + 4, ry + 36, hex('#2a1810')); const a = Math.sin(t * 3.1) * 0.35, px = Math.round(rx + Math.sin(a) * 20), py = Math.round(ry + 10 + Math.cos(a) * 20); R.linea(rx, ry + 10, px, py, C.oroS); R.disco(px, py, 2, C.oro); }
  // chispas que suben del fuego
  for (let k = 0; k < 5; k++) { const u = (t * 0.7 + k / 5) % 1; if (u < 0.8) pset(Math.round(226 - 8 + k * 4 + Math.sin(u * 9 + k) * 2), Math.round(110 - u * 22), u < 0.4 ? C.amarillo : C.naranja); }
  // pájaros que cruzan por la ventana (de día)
  if (!o.noche) { const u = (t % 9) / 9, x = Math.round(20 + u * 70), y = 40 + Math.round(Math.sin(u * 9) * 3); if (x > 22 && x < 80) { const a = Math.sin(t * 12) > 0; pset(x, y, C.k); pset(x - 1, y - (a ? 1 : 0), C.k); pset(x + 1, y - (a ? 1 : 0), C.k); pset(x - 2, y - (a ? 2 : 0), C.k); pset(x + 2, y - (a ? 2 : 0), C.k); } }
  if (o.escritorio) escritorio(R, 92, 145, t);
  if (o.sofa) sofa(R, 70, 145, t);
  if (o.mesa) mesaCena(R, 168, 145, o.mesa, t, { recogida: o.recogida });
  if (o.gato !== false) gato(R, 262, 120, t, { dir: -1 });
  motas(R, t, 20, 300, 20, 118, 10, C.paredL);
}

// la mesa de Acción de Gracias con mantel: el pavo asado en el centro, puré, maíz, salsa de arándanos, tarta de calabaza y velas
export function mesaCena(R, cx, suelo, p, t, o = {}) {
  const x0 = cx - 62, x1 = cx + 62, y = suelo - 16;
  for (const dx of [-70, 70]) { const xs = cx + dx; R.rect(xs - 4, suelo - 26, xs + 4, suelo - 12, C.maderaS); R.rect(xs - 3, suelo - 25, xs + 3, suelo - 13, C.madera); R.rect(xs - 5, suelo - 12, xs + 5, suelo - 10, C.maderaL); R.rect(xs - 4, suelo - 9, xs - 3, suelo, C.maderaS); R.rect(xs + 3, suelo - 9, xs + 4, suelo, C.maderaS); }
  R.rect(x0, y, x1, y + 6, C.blanco); R.rect(x0, y + 6, x1, y + 7, C.grisL); R.rect(x0, y - 1, x1, y - 1, C.k);
  for (let x = x0; x <= x1; x += 6) R.pset(x, y + 7, C.blanco);
  for (const px of [x0 + 4, x1 - 6]) R.rect(px, y + 8, px + 2, suelo, C.maderaS);
  if (o.recogida) return;
  const items = [['vela', -50], ['pure', -38], ['maiz', -24], ['pavo', 0], ['arandanos', 24], ['tarta', 38], ['vela', 50]];
  if (p >= 0.6) for (const dx of [-38, 0, 38]) for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3 + dx * 0.01) % 1; R.pset(Math.round(cx + dx + Math.sin(u * 8 + k) * 2), Math.round(y - 10 - (dx === 0 ? 10 : 0) - u * 14), u < 0.6 ? C.blanco : C.grisL); }
  items.forEach(([q, dx], k) => {
    if (p < (k + 1) / items.length - 0.01) return;
    const x = cx + dx;
    if (q !== 'vela' && q !== 'pavo') { R.rect(x - 6, y - 1, x + 6, y - 1, C.grisL); R.rect(x - 5, y - 2, x + 5, y - 2, C.blanco); }
    if (q === 'pavo') {   // pavo asado: cuerpo dorado ovalado, dos muslos hacia arriba con sus puntas de papel
      R.rect(x - 15, y - 2, x + 15, y - 1, C.grisL); R.rect(x - 14, y - 3, x + 14, y - 3, C.blanco);
      for (let j = 0; j < 10; j++) { const w = Math.round(Math.sqrt(1 - ((j - 5) / 5.5) ** 2) * 12); R.rect(x - w, y - 4 - j, x + w, y - 4 - j, j > 6 ? C.ocre : C.ocreS); R.pset(x - w - 1, y - 4 - j, C.k); R.pset(x + w + 1, y - 4 - j, C.k); }
      R.rect(x - 9, y - 15, x + 9, y - 15, C.k); R.disco(x - 4, y - 11, 2, C.oroL);
      for (const s2 of [-1, 1]) { R.disco(x + s2 * 9, y - 12, 3, C.k); R.disco(x + s2 * 9, y - 12, 2, C.ocreS); R.rect(x + s2 * 11, y - 18, x + s2 * 11 + s2, y - 13, C.k); R.rect(x + s2 * 11 - 1, y - 20, x + s2 * 11 + 1, y - 18, C.blanco); }
    }
    if (q === 'pure') { R.disco(x, y - 4, 3, C.blanco); R.disco(x, y - 5, 2, C.papel); R.pset(x, y - 6, C.amarillo); }
    if (q === 'maiz') for (let i = -3; i <= 3; i += 3) R.rect(x + i, y - 6, x + i + 1, y - 2, C.maiz);
    if (q === 'arandanos') { R.disco(x, y - 4, 3, C.rojoS); R.disco(x - 1, y - 5, 1, C.rojo); }
    if (q === 'tarta') { R.poligono([[x - 5, y - 2], [x + 5, y - 2], [x + 4, y - 5], [x - 4, y - 5]], C.calabaza); R.rect(x - 5, y - 6, x + 5, y - 6, C.ocre); }
    if (q === 'vela') { R.rect(x - 1, y - 10, x, y - 1, C.blanco); R.pset(x, y - 12 + Math.round(Math.sin(t * 9 + dx)), C.oroL); R.pset(x, y - 11, C.naranja); }
  });
}

// sofá de tres plazas (para la familia dormida)
export function sofa(R, x, suelo, t) {
  const c = hex('#4a6a9a'), cs = hex('#34507a'), cl = hex('#6a8ab8');
  R.rect(x - 34, suelo - 30, x + 34, suelo - 6, C.k); R.rect(x - 33, suelo - 29, x + 33, suelo - 18, cs); R.rect(x - 33, suelo - 17, x + 33, suelo - 7, c);
  for (const dx of [-11, 11]) R.rect(x + dx, suelo - 28, x + dx, suelo - 18, C.k);
  R.rect(x - 38, suelo - 22, x - 32, suelo - 6, C.k); R.rect(x - 37, suelo - 21, x - 33, suelo - 7, cl); R.rect(x + 32, suelo - 22, x + 38, suelo - 6, C.k); R.rect(x + 33, suelo - 21, x + 37, suelo - 7, cl);
  R.rect(x - 33, suelo - 17, x + 33, suelo - 17, cl); for (const dx of [-30, 28]) R.rect(x + dx, suelo - 5, x + dx + 2, suelo, C.maderaD);
}

// escritorio con pila de cartas, tintero y pluma (Sarah Josepha Hale)
export function escritorio(R, x, suelo, t) {
  R.rect(x - 22, suelo - 18, x + 22, suelo - 15, C.maderaL); R.rect(x - 22, suelo - 15, x + 22, suelo - 14, C.maderaS); R.rect(x - 22, suelo - 19, x + 22, suelo - 19, C.k);
  R.rect(x - 20, suelo - 14, x - 17, suelo, C.maderaS); R.rect(x + 17, suelo - 14, x + 20, suelo, C.maderaS); R.rect(x + 4, suelo - 14, x + 16, suelo - 6, C.madera);
  for (let k = 0; k < 6; k++) R.rect(x - 16 + (k % 2), suelo - 21 - k * 2, x - 6 + (k % 2), suelo - 20 - k * 2, k % 2 ? C.papel : C.blanco);
  R.rect(x + 8, suelo - 23, x + 12, suelo - 20, C.k); R.linea(x + 10, suelo - 24, x + 15, suelo - 31, C.blanco); R.pset(x + 15, suelo - 32, C.grisL);
}

// ── C, D, E · la ciudad ──────────────────────────────────────────────────────────────────────────────────────────
// Una calle con edificios de ladrillo y unos grandes almacenes con escaparates. o.epoca: '1924', '1939' (Nueva York),
// '1950' (Filadelfia: el ayuntamiento con su torre al fondo) u 'hoy' (tienda con carteles de «%»); o.tarde, o.noche,
// o.madrugada; o.luces (0–1: luces de Navidad en los escaparates), o.coches (n), o.atasco, o.desfile (0–1: el desfile
// cruza), o.gente (público con bustos en la acera de delante), o.estrella (estrella dorada en el escaparate)
export function ciudad(R, t, o = {}) {
  const { rect, pset } = R, ep = o.epoca ?? '1924', hoy = ep === 'hoy';
  R.delante = null;
  cielo(R, t, { hor: 100, tarde: o.tarde, noche: o.noche || o.madrugada, sol: o.madrugada ? null : undefined, aves: false, nubes: !o.noche && !o.madrugada });
  if (o.madrugada) for (let y = 70; y < 100; y++) rect(0, y, 319, y, y < 85 ? C.tarde1 : C.tarde2);
  if (o.nubesNegras) { const n = o.nubesNegras; for (let k = 0; k < 6; k++) { const x = 20 + k * 52, y = 18 + (k % 2) * 8; R.disco(x, y, Math.round(14 * n), C.k); R.disco(x - 3, y - 2, Math.round(12 * n), hex('#3a3a48')); } }
  // el fondo: rascacielos (Nueva York) o el ayuntamiento de Filadelfia
  if (ep === '1950') ayuntamiento(R, 236, 100, t);
  else for (const [x, w, h] of [[10, 26, 60], [44, 18, 74], [70, 30, 52], [238, 24, 70], [266, 34, 58], [300, 20, 80]]) { rect(x, 100 - h, x + w, 100, hex('#8a94b0')); rect(x + w - 4, 100 - h, x + w, 100, hex('#6e7896')); for (let y = 100 - h + 4; y < 98; y += 6) for (let xx = x + 3; xx < x + w - 4; xx += 5) rect(xx, y, xx + 1, y + 2, o.noche || o.madrugada ? C.oroL : hex('#b8c2dc')); }
  // edificios de ladrillo de la calle: aparejo de ladrillo, cornisa con ménsulas, ventanas con dintel, alféizar, marco y
  // cortinas, y escaleras de incendios de hierro en los de ladrillo rojo
  const luz = o.noche || o.madrugada;
  for (const [x0, x1, h, col, colS, esc] of [[0, 70, 66, C.ladrillo, C.ladrilloS, true], [70, 110, 74, hex('#b8865a'), hex('#94683e'), false], [216, 260, 70, hex('#b8865a'), hex('#94683e'), false], [260, 320, 62, C.ladrillo, C.ladrilloS, true]]) {
    const y0 = 128 - h;
    rect(x0, y0, x1, 128, col);
    for (let y = y0 + 6; y < 128; y += 3) { rect(x0, y, x1, y, colS); for (let x = x0 + ((y / 3) % 2 ? 0 : 3); x < x1; x += 6) pset(x, y + 1, colS); pset(x0 + ((y * 7) % (x1 - x0)), y + 2, C.ladrilloL); }
    rect(x0, y0, x1, y0 + 1, C.k); rect(x0, y0 + 2, x1, y0 + 4, C.fachada); rect(x0, y0 + 5, x1, y0 + 5, C.fachadaS);
    for (let x = x0 + 2; x < x1; x += 5) rect(x, y0 + 6, x + 1, y0 + 7, C.fachadaS);
    rect(x1 - 1, y0, x1, 128, C.k);
    for (let y = y0 + 12; y < 110; y += 15) for (let x = x0 + 5; x < x1 - 9; x += 12) {
      rect(x - 1, y - 2, x + 7, y - 1, C.fachada); rect(x, y, x + 6, y + 9, C.k); rect(x + 1, y + 1, x + 5, y + 8, luz ? C.oroL : C.cristal);
      if (!luz) { pset(x + 1, y + 1, C.blanco); pset(x + 2, y + 2, C.blanco); }
      rect(x + 3, y + 1, x + 3, y + 8, C.k); rect(x + 1, y + 4, x + 5, y + 4, C.k);
      if ((x + y) % 3 === 0) { rect(x + 1, y + 1, x + 2, y + 6, luz ? C.naranja : C.rojoS); }
      rect(x - 1, y + 10, x + 7, y + 11, C.fachada); rect(x - 1, y + 11, x + 7, y + 11, C.fachadaS);
      if ((x * 3 + y) % 5 === 0 && !luz) { pset(x + 1, y + 9, C.hierba); pset(x + 3, y + 9, C.rojo); pset(x + 5, y + 9, C.hierbaL); }
    }
    if (esc) {   // escalera de incendios: rellanos y escalas de hierro
      const ex = x0 + Math.round((x1 - x0) / 2) - 9;
      for (let y = y0 + 22; y < 112; y += 15) { rect(ex, y, ex + 18, y, C.k); rect(ex, y - 4, ex, y, C.k); rect(ex + 18, y - 4, ex + 18, y, C.k); rect(ex, y - 4, ex + 18, y - 4, C.k); for (let k = 0; k < 5; k++) pset(ex + 4 + k * 2, y + 2 + k * 2, C.k); }
    }
    rect(x0, 112, x1, 128, colS); rect(x0, 112, x1, 112, C.k);   // zócalo con puerta
    rect(x0 + 6, 114, x0 + 15, 128, C.maderaD); rect(x0 + 7, 115, x0 + 14, 128, C.madera); pset(x0 + 13, 121, C.oro);
  }
  // los grandes almacenes en el centro: piedra con sillares, ventanas con arco, cornisa, toldos a rayas y escaparates
  const ax0 = 110, ax1 = 216;
  rect(ax0, 40, ax1, 128, C.fachada);
  for (let y = 44; y < 100; y += 6) { rect(ax0, y, ax1, y, C.fachadaS); for (let x = ax0 + ((y / 6) % 2 ? 6 : 0); x < ax1; x += 12) rect(x, y, x, y + 5, C.fachadaS); }
  rect(ax0 - 3, 36, ax1 + 3, 40, C.fachada); rect(ax0 - 3, 36, ax1 + 3, 36, C.k); rect(ax0 - 3, 40, ax1 + 3, 41, C.fachadaS);
  for (let x = ax0; x < ax1; x += 6) rect(x, 41, x + 2, 43, C.fachadaS);
  for (let y = 50; y < 96; y += 14) for (let x = ax0 + 6; x < ax1 - 8; x += 14) {
    rect(x, y, x + 8, y + 9, C.k); rect(x + 1, y + 1, x + 7, y + 8, luz ? C.oroL : C.cristal); pset(x + 4, y - 1, C.k); rect(x + 2, y - 1, x + 6, y - 1, C.k);
    if (!luz) { pset(x + 2, y + 2, C.blanco); pset(x + 3, y + 3, C.blanco); }
    rect(x + 4, y + 1, x + 4, y + 8, C.k); rect(x - 1, y + 10, x + 9, y + 10, C.fachadaS);
  }
  const toldo = hoy ? [C.rojo, C.blanco] : [C.verde, C.blanco];
  for (let x = ax0; x < ax1; x++) { const c = Math.floor((x - ax0) / 5) % 2 ? toldo[1] : toldo[0]; rect(x, 98, x, 103, c); if ((x - ax0) % 10 < 5) pset(x, 104, c); }
  rect(ax0, 97, ax1, 97, C.k);
  for (const [x0, x1] of [[ax0 + 4, ax0 + 44], [ax1 - 44, ax1 - 4]]) {
    rect(x0 - 1, 105, x1 + 1, 127, C.k); rect(x0, 106, x1, 126, hoy ? hex('#f2e2c0') : C.cristalS); rect(x0, 126, x1, 127, C.fachadaS);
    if (!hoy) { R.linea(x0 + 2, 107, x0 + 10, 115, C.cristal); R.linea(x0 + 5, 107, x0 + 13, 115, C.cristal); }
    if (hoy) { R.numero('%', Math.round((x0 + x1) / 2), 121, { centro: true, color: C.rojo }); }
    else for (let k = 0; k < 3; k++) {   // maniquíes con vestido y sombrero
      const xx = x0 + 9 + k * 11; R.disco(xx, 113, 2, C.k); R.disco(xx, 113, 1, C.papel); R.rect(xx - 3, 111, xx + 3, 111, C.k);
      R.poligono([[xx - 1, 116], [xx + 1, 116], [xx + 4, 124], [xx - 4, 124]], [C.rojo, C.verde, C.oro][k]); R.rect(xx, 124, xx, 126, C.k);
    }
    if (o.luces) for (let x = x0; x <= x1; x += 4) { const on = o.luces > (x - x0) / (x1 - x0) && Math.sin(t * 6 + x) > -0.3; pset(x, 105, on ? [C.rojo, C.oroL, C.verdeL, C.azulL][x % 4] : C.grisS); }
  }
  rect(ax0 + 47, 105, ax1 - 47, 128, C.k); rect(ax0 + 48, 106, ax1 - 48, 128, C.maderaD); rect(ax0 + 50, 108, ax1 - 50, 128, hoy ? C.oroL : C.cristalS);
  rect(ax0 + 52, 108, ax0 + 52, 128, C.k); pset(ax0 + 56, 118, C.oro); pset(ax1 - 56, 118, C.oro);
  if (o.estrella) { const cx = ax0 + 24, cy = 114; R.icono('estrella', cx - 3, cy - 3, C.oro, undefined, 1); }
  // acera de baldosas con juntas, bordillo de piedra, farolas de hierro y mobiliario: boca de incendios, banco, papelera
  rect(0, 128, 319, 128, C.k);
  for (let y = 129; y < 146; y++) rect(0, y, 319, y, y > 141 ? C.aceraS : C.acera);
  for (let y = 129; y < 142; y += 6) rect(0, y, 319, y, C.aceraS);
  for (let y = 129; y < 142; y += 6) for (let x = (y / 6) % 2 ? 0 : 10; x < 320; x += 20) rect(x, y, x, y + 5, C.aceraS);
  for (let k = 0; k < 14; k++) pset((k * 47) % 320, 131 + (k * 5) % 10, C.grisL);
  rect(0, 142, 319, 142, C.grisL); rect(0, 146, 319, 146, C.k);
  for (const x of [40, 280]) {
    rect(x - 2, 126, x + 3, 128, C.k); rect(x, 92, x + 1, 126, C.k); rect(x - 1, 100, x + 2, 101, C.k);
    R.poligono([[x - 4, 86], [x + 5, 86], [x + 3, 92], [x - 2, 92]], C.k); rect(x - 2, 87, x + 3, 91, luz ? C.oroL : C.grisL); rect(x - 1, 84, x + 2, 85, C.k);
  }
  if (!o.gente) {
    // boca de incendios
    rect(298, 135, 302, 142, C.k); rect(299, 136, 301, 142, C.rojo); rect(297, 138, 303, 139, C.k); pset(300, 134, C.k); pset(300, 137, C.rojoS);
    // banco de madera y papelera
    rect(14, 136, 34, 137, C.madera); rect(14, 133, 34, 134, C.madera); rect(14, 135, 34, 135, C.k); rect(15, 138, 16, 142, C.k); rect(32, 138, 33, 142, C.k);
    rect(250, 134, 256, 142, C.k); rect(251, 135, 255, 141, C.grisS); for (let y = 136; y < 141; y += 2) rect(251, y, 255, y, C.gris);
  }
  // calzada: asfalto con parches, alcantarilla y marcas
  for (let y = 147; y < 180; y++) rect(0, y, 319, y, C.asfalto);
  for (let k = 0; k < 10; k++) { const x = (k * 71) % 310, y = 150 + (k * 13) % 26; rect(x, y, x + 6, y + 1, C.asfaltoS); }
  R.disco(112, 172, 4, C.k); R.disco(112, 172, 3, C.asfaltoS); rect(110, 172, 114, 172, C.k);
  if (ep !== 'hoy') for (let x = 0; x < 320; x += 24) rect(x, 162, x + 12, 163, ep === '1950' ? C.linea : C.blanco);
  if (ep === '1924' || ep === '1939') { rect(0, 168, 319, 168, C.grisS); rect(0, 172, 319, 172, C.grisS); for (let x = 4; x < 320; x += 8) rect(x, 169, x + 1, 171, C.maderaS); }
  if (hoy) for (let x = 240; x < 300; x += 6) rect(x, 150, x + 3, 176, C.blanco);   // paso de cebra
  vidaCiudad(R, t, { ep, luz, hoy, ax0, ax1 });
  if (o.desfile != null) desfile(R, t, o.desfile);
  // los coches y el público están más cerca de la cámara que la acera: se dibujan después de los personajes
  // (rodar llama a R.delante al acabar cada plano). Los carriles van abajo, para que ningún techo llegue a la acera.
  const antes = R.delante;
  R.delante = () => {
    antes?.();
    const n = o.coches ?? 0;
    for (let k = 0; k < n; k++) {
      const v = o.atasco ? 0 : 18 + (k % 3) * 6, base = o.atasco ? 8 + k * 46 : ((k * 97 + t * v) % 420) - 50;
      coche(R, Math.round(base + (o.atasco ? Math.sin(t * 2 + k) : 0)), k % 2 ? 165 : 178, t, { epoca: ep, color: [C.rojo, C.azulL, C.verde, C.amarillo, C.morado, C.naranja][k % 6], dir: k % 2 ? -1 : 1, humo: o.atasco });
    }
    if (hoy && n === 0) for (const [x, c] of [[40, C.azulL], [282, C.rojo]]) coche(R, x, 168, 0, { epoca: 'hoy', color: c });
    if (o.gente) publico(R, t, o.gente);
  };
}

// la vida de la calle: siluetas que pasan tras las cortinas, palomas en la cornisa que echan a volar, vapor de la
// alcantarilla, una bandera que ondea, el semáforo, el tranvía (1924–1939), un letrero de neón (hoy) y papeles al viento
export function vidaCiudad(R, t, o) {
  const { rect, pset } = R;
  // siluetas tras las ventanas de los almacenes
  for (let k = 0; k < 3; k++) { const y = 51 + k * 14, x = Math.round(o.ax0 + 8 + (((t * (4 + k)) + k * 30) % 90)); if (x < o.ax1 - 12) { rect(x, y + 3, x + 2, y + 8, o.luz ? hex('#8a5a2a') : C.cristalS); pset(x + 1, y + 2, o.luz ? hex('#8a5a2a') : C.cristalS); } }
  // palomas en la cornisa: a ratos levantan el vuelo, dan una vuelta y vuelven
  const ciclo = (t % 14) / 14;
  for (let k = 0; k < 4; k++) {
    const xb = o.ax0 + 14 + k * 22, yb = 35;
    if (ciclo < 0.6) { pset(xb, yb, C.gris); pset(xb + 1, yb, C.gris); pset(xb + 2, yb - 1, C.grisS); pset(xb, yb + 1, C.grisS); if (Math.sin(t * 5 + k * 2) > 0.7) pset(xb + 3, yb, C.grisS); }
    else { const u = (ciclo - 0.6) / 0.4, x = Math.round(xb + Math.sin(u * 6.28) * 30), y = Math.round(yb - Math.sin(u * 3.14) * 20), a = Math.sin(t * 14 + k) > 0; pset(x, y, C.gris); pset(x - 1, y - (a ? 1 : -1), C.grisS); pset(x + 1, y - (a ? 1 : -1), C.grisS); }
  }
  // vapor de la alcantarilla
  for (let k = 0; k < 4; k++) { const u = (t * 0.4 + k / 4) % 1; R.disco(Math.round(112 + Math.sin(u * 6 + k) * 3), Math.round(170 - u * 22), u < 0.5 ? 1 : 2, u < 0.7 ? C.grisL : C.blanco); }
  // bandera en un mástil sobre los almacenes
  { const bx = o.ax1 - 6; rect(bx, 14, bx, 36, C.k); for (let i = 0; i < 14; i++) { const y = 15 + Math.round(Math.sin(t * 5 - i * 0.6) * 1.2); for (let j = 0; j < 8; j++) pset(bx + 1 + i, y + j, i < 6 && j < 4 ? C.azul : j % 2 ? C.blanco : C.rojo); if (i < 6) for (let j = 0; j < 4; j += 2) pset(bx + 2 + i, y + j, i % 2 ? C.blanco : C.azul); } }
  // semáforo en la esquina (1950 y hoy)
  if (o.ep === '1950' || o.hoy) { const sx = 234; rect(sx, 108, sx + 1, 141, C.k); rect(sx - 3, 98, sx + 4, 112, C.k); const f = Math.floor(t / 3) % 3; for (let k = 0; k < 3; k++) R.disco(sx, 101 + k * 4, 1, f === k ? [C.rojo, C.amarillo, C.verdeL][k] : C.grisS); }
  // tranvía que cruza (Nueva York, 1924 y 1939), por delante como los coches
  if (o.ep === '1924' || o.ep === '1939') {
    const prev = R.delante, tx = Math.round(((t * 22) % 700) - 120);
    R.delante = () => { prev?.(); if (tx > -80 && tx < 360) { rect(tx, 150, tx + 70, 168, C.k); rect(tx + 1, 151, tx + 69, 167, hex('#c8a040')); rect(tx + 1, 160, tx + 69, 162, C.rojoS); for (let x = tx + 5; x < tx + 66; x += 10) { rect(x, 153, x + 6, 158, luzT(o)); } R.linea(tx + 35, 150, tx + 35, 120, C.k); rect(tx + 30, 119, tx + 40, 120, C.k); for (const w of [tx + 12, tx + 58]) { R.disco(w, 169, 3, C.k); R.disco(w, 169, 1, C.grisL); } } };
  }
  // letrero de neón que parpadea (hoy)
  if (o.hoy) { const on = Math.sin(t * 7) > -0.4 || Math.floor(t * 3) % 7 !== 0; R.rect(o.ax0 + 34, 86, o.ax1 - 34, 94, C.k); R.numero('%', Math.round((o.ax0 + o.ax1) / 2), 93, { centro: true, color: on ? C.rosa : C.grisS }); }
  // papeles y hojas que arrastra el viento por la acera
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (30 + k * 12) + k * 140) % 380) - 30), y = 138 + k * 2 + Math.round(Math.abs(Math.sin(t * 6 + k)) * -3); rect(x, y, x + 2, y + 1, k === 1 ? C.ocre : C.blanco); }
}
const luzT = (o) => (o.luz ? C.oroL : C.cristal);

// el ayuntamiento de Filadelfia: cuerpo de piedra y torre con reloj y la estatua de William Penn arriba
export function ayuntamiento(R, cx, base, t) {
  const p = hex('#d8ccb0'), ps = hex('#b0a488');
  R.rect(cx - 50, base - 26, cx + 50, base, p); R.rect(cx + 30, base - 26, cx + 50, base, ps); R.rect(cx - 50, base - 27, cx + 50, base - 27, C.k);
  for (let x = cx - 46; x < cx + 46; x += 8) R.rect(x, base - 22, x + 3, base - 6, ps);
  R.rect(cx - 10, base - 70, cx + 10, base - 26, p); R.rect(cx + 4, base - 70, cx + 10, base - 26, ps); R.rect(cx - 7, base - 90, cx + 7, base - 70, p);
  R.disco(cx, base - 62, 5, C.k); R.disco(cx, base - 62, 4, C.blanco); R.linea(cx, base - 62, cx, base - 65, C.k); R.linea(cx, base - 62, cx + 2, base - 62, C.k);
  R.poligono([[cx - 6, base - 90], [cx + 6, base - 90], [cx, base - 100]], C.verde); R.rect(cx - 1, base - 106, cx + 1, base - 100, C.verde); R.disco(cx, base - 107, 1, C.verde);
}

// coche de cada época: '1924'/'1939' (negro, cuadrado, con estribos), '1950' (redondeado, de colores) u 'hoy'
export function coche(R, x, suelo, t, o = {}) {
  const d = o.dir ?? 1, X = (i) => Math.round(x + i * d), ep = o.epoca ?? '1950', viejo = ep === '1924' || ep === '1939', col = viejo ? hex('#2a2430') : o.color ?? C.rojo;
  const w = Math.round(Math.sin(t * 12) * 0.5);
  if (viejo) {
    R.rect(Math.min(X(-14), X(14)), suelo - 10, Math.max(X(-14), X(14)), suelo - 4, col); R.rect(Math.min(X(-8), X(6)), suelo - 18, Math.max(X(-8), X(6)), suelo - 10, col);
    R.rect(Math.min(X(-6), X(4)), suelo - 16, Math.max(X(-6), X(4)), suelo - 12, C.cristal); R.rect(Math.min(X(10), X(14)), suelo - 9, Math.max(X(10), X(14)), suelo - 7, C.grisL);
  } else {
    for (let j = 0; j < 8; j++) { const ww = j < 3 ? 16 : 18; R.rect(Math.min(X(-ww), X(ww)), suelo - 12 + j, Math.max(X(-ww), X(ww)), suelo - 12 + j, j === 0 ? C.blanco : col); }
    R.poligono([[X(-9), suelo - 12], [X(9), suelo - 12], [X(6), suelo - 19], [X(-6), suelo - 19]], col); R.rect(Math.min(X(-5), X(5)), suelo - 17, Math.max(X(-5), X(5)), suelo - 13, C.cristal);
    R.pset(X(18), suelo - 8, C.oroL); R.rect(Math.min(X(-18), X(18)), suelo - 5, Math.max(X(-18), X(18)), suelo - 5, C.grisL);
  }
  for (const i of [-10, 10]) { R.disco(X(i), suelo - 3 + w, 3, C.k); R.disco(X(i), suelo - 3 + w, 1, C.grisL); }
  if (o.humo && Math.round(x) % 3 === 0) humo(R, X(-16), suelo - 4, t + x, C.grisL);
}

// el desfile de 1924: un globo de pavo gigante, otro de estrella, una banda y, al final, Santa en su trineo; p 0–1 cruza
export function desfile(R, t, p) {
  const x0 = Math.round(400 - p * 620);
  const globo = (x, y, tipo) => {
    for (let k = 0; k < 3; k++) R.linea(x - 6 + k * 6, y + 18, x - 14 + k * 10, 146, C.grisS);
    if (tipo === 'pavo') { R.disco(x, y, 18, C.k); R.disco(x, y, 17, C.pavo); R.disco(x - 4, y - 4, 12, C.pavoL); for (let k = -2; k <= 2; k++) R.disco(x - 18 + Math.abs(k) * 2, y - 6 + k * 7, 6, [C.rojo, C.naranja, C.amarillo, C.naranja, C.rojo][k + 2]); R.disco(x + 16, y - 10, 6, C.azulL); R.pset(x + 18, y - 12, C.k); R.rect(x + 18, y - 6, x + 19, y - 2, C.moco); }
    else { R.icono('estrella', x - 3, y - 3, C.oro, undefined, 4); }
  };
  globo(x0, 54 + Math.round(Math.sin(t * 1.3) * 3), 'pavo');
  globo(x0 + 120, 60 + Math.round(Math.sin(t * 1.1 + 1) * 3), 'estrella');
  for (let k = 0; k < 4; k++) { const x = x0 + 60 + k * 12; R.rect(x - 2, 132, x + 2, 145, k % 2 ? C.rojo : C.blanco); R.disco(x, 129, 3, C.ocre); R.rect(x - 3, 126, x + 3, 127, C.rojo); R.rect(x + 2, 134, x + 5, 136, C.oro); }
  // Santa en su trineo
  const sx = x0 + 230;
  R.poligono([[sx - 18, 132], [sx + 16, 132], [sx + 20, 144], [sx - 20, 144]], C.rojo); R.rect(sx - 20, 145, sx + 22, 146, C.oro); R.rect(sx + 22, 140, sx + 23, 145, C.oro);
  R.actor(ELENCO_CHIBI.santa, sx - 8, 140, t, { brazos: Math.sin(t * 4) > 0, sonrisa: true });
}

// público en la acera de delante: una fila de bustos (9 × 12) que asoman, de colores variados, que ríen y saludan
export function publico(R, t, o = {}) {
  const tipos = ['rizos', 'calvo', 'mujer', 'marinero', 'rizos', 'mujer'], ropas = [[C.rojo, C.rojoS], [C.azulL, C.azul], [C.verdeL, C.verde], [C.amarillo, C.amarilloS], [C.morado, hex('#4a2864')], [C.naranja, C.naranjaS]];
  const n = o.n ?? 14;
  // valla de madera de las de desfile, detrás de la cual asoma el público
  R.rect(0, 170, 319, 180, C.maderaS); R.rect(0, 170, 319, 172, C.maderaL); R.rect(0, 169, 319, 169, C.k);
  for (let x = 6; x < 320; x += 40) R.rect(x, 173, x + 2, 180, C.maderaD);
  for (let k = 0; k < n; k++) {
    const x = Math.round(4 + k * (312 / n) + (k % 2) * 3), y = 158 + (k % 3) * 2 - (o.saltan && Math.sin(t * 6 + k) > 0.6 ? 2 : 0);
    R.busto(tipos[k % tipos.length], { C: ropas[k % ropas.length][0], c: ropas[k % ropas.length][1] }, x, y, t + k, { rie: o.rie && k % 2 === 0, saluda: o.saluda && k % 3 === 1 });
  }
}

// ── mapas ────────────────────────────────────────────────────────────────────────────────────────────────────────
export const LUG = { plymouth: [-70.67, 41.96], boston: [-71.06, 42.36], malaga: [-4.42, 36.72], londres: [-0.13, 51.5], nuevayork: [-74.0, 40.7], filadelfia: [-75.16, 39.95] };
export const NUEVA_INGLATERRA = [-73.8, -68.2, 40.7, 43.85];
// Nueva Inglaterra dibujada a mano (los datos del mapa son gruesos a esta escala): la costa de Nueva York a Maine con
// el cabo Cod y su gancho, la bahía de Plymouth, Boston y el cabo Ann; y las islas (Long Island, Martha's Vineyard, Nantucket)
const NI_TIERRA = [[-73.9, 40.85], [-73.6, 40.95], [-73.0, 41.15], [-72.4, 41.27], [-71.85, 41.32], [-71.4, 41.45], [-71.2, 41.48], [-71.1, 41.65], [-70.95, 41.52],
  [-70.65, 41.53], [-70.45, 41.55], [-70.0, 41.65], [-69.94, 41.8], [-69.93, 41.97], [-70.05, 42.08], [-70.22, 42.07], [-70.12, 41.98], [-70.05, 41.85], [-70.15, 41.75],
  [-70.5, 41.77], [-70.58, 41.85], [-70.66, 41.96], [-70.75, 42.15], [-70.95, 42.25], [-71.05, 42.36], [-70.9, 42.45], [-70.62, 42.6], [-70.62, 42.68],
  [-70.82, 42.85], [-70.73, 43.1], [-70.55, 43.25], [-70.2, 43.6], [-69.8, 43.75], [-69.4, 43.85], [-69.0, 43.95], [-73.95, 43.95]];
const NI_ISLAS = [[[-73.9, 40.58], [-73.2, 40.62], [-72.4, 40.85], [-71.86, 41.07], [-72.3, 41.0], [-72.9, 40.95], [-73.9, 40.78]],
  [[-70.82, 41.43], [-70.6, 41.47], [-70.45, 41.36], [-70.75, 41.33]], [[-70.22, 41.3], [-69.96, 41.3], [-69.96, 41.24], [-70.2, 41.24]]];
export const ALDEAS = [[-71.0, 42.9], [-70.9, 42.15], [-71.5, 41.75], [-70.3, 41.68], [-71.9, 41.45], [-70.8, 41.6], [-71.3, 42.45], [-70.05, 41.9], [-72.3, 41.8], [-71.1, 41.9], [-72.6, 42.3], [-70.6, 41.4]];
// o.vista; o.aldeas (0–1: aldeas wampanoag que se encienden por la costa); o.ruta (0–1: el viaje de Tisquantum);
// o.ofertas (0–1: puntos de oferta que se encienden en Europa y las Américas); o.plymouth (marca la colonia)
export function mapaAg(R, t, o = {}) {
  const v = o.vista ?? R.VISTAS.atlantico, ni = v === NUEVA_INGLATERRA;
  const L = (p) => R.lugar(p, undefined, v);
  const esMar = new Uint8Array(R.W * R.H);
  if (ni) {
    const pols = [NI_TIERRA, ...NI_ISLAS].map((q) => q.map(L));
    for (let y = 0; y < R.H; y++) for (let x = 0; x < R.W; x++) esMar[y * R.W + x] = pols.some((q) => R.dentro(q, x, y)) ? 0 : 1;
  } else {
    R.mapa(t, { vista: v });
    const MARC = new Set(R.PR.MAR);
    for (let y = 0; y < R.H; y++) for (let x = 0; x < R.W; x++) esMar[y * R.W + x] = MARC.has(R.pget(x, y)) ? 1 : 0;
  }
  for (let y = 0; y < R.H; y++) for (let x = 0; x < R.W; x++) {
    const i = y * R.W + x, costa = !esMar[i] && ((x > 0 && esMar[i - 1]) || (x < R.W - 1 && esMar[i + 1]) || (y > 0 && esMar[i - R.W]) || (y < R.H - 1 && esMar[i + R.W]));
    const orilla = esMar[i] && ((x > 0 && !esMar[i - 1]) || (y > 0 && !esMar[i - R.W]) || (y < R.H - 1 && !esMar[i + R.W]) || (x < R.W - 1 && !esMar[i + 1]));
    R.pset(x, y, esMar[i] ? (orilla ? C.mar3 : C.mar2) : costa ? C.k : C.hierba);
  }
  for (let k = 0; k < 30; k++) { const x = ((k * 53 + t * 3) % 330) - 5, y = (k * 37) % R.H; if (esMar[y * R.W + Math.max(0, Math.min(R.W - 1, Math.round(x)))]) R.rect(Math.round(x), y, Math.round(x) + 3, y, C.marL); }
  // sombras de nubes que pasan despacio sobre tierra y mar
  for (let k = 0; k < 3; k++) {
    const cx = ((k * 140 + t * 6) % 460) - 70, cy = 30 + k * 50, rx = 34 + k * 6, ry = 14;
    for (let y = Math.max(0, cy - ry); y < Math.min(R.H, cy + ry); y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2))); for (let x = Math.max(0, Math.round(cx - w)); x < Math.min(R.W, Math.round(cx + w)); x++) { const i = y * R.W + x, c = R.pget(x, y); if (c === C.hierba) R.pset(x, y, C.hierbaS); else if (c === C.mar2) R.pset(x, y, C.mar1); } }
  }
  // el Mayflower cruza el Atlántico (de Plymouth, en Inglaterra, al cabo Cod)
  if (o.barco != null) {
    const pts = [[-4.14, 50.37], [-30, 46], [-55, 43], [-70.0, 42.0]].map(L), f = Math.min(1, Math.max(0, o.barco)) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), u = f - i;
    const x = Math.round(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u), y = Math.round(pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u) + Math.round(Math.sin(t * 2));
    R.ruta(pts, o.barco, C.blanco);
    R.rect(x - 5, y, x + 5, y + 2, C.maderaS); R.rect(x - 6, y - 1, x + 6, y - 1, C.madera); R.rect(x, y - 9, x, y - 1, C.maderaD); R.rect(x - 4, y - 8, x + 4, y - 3, C.papel); R.rect(x - 4, y - 8, x + 4, y - 8, C.k); R.pset(x, y - 10, C.rojo);
  }
  if (o.aldeas) {
    ALDEAS.forEach((p, k) => { if (o.aldeas * ALDEAS.length < k + 0.5) return; const [x, y] = L(p); R.disco(x, y - 2, 3, C.k); R.disco(x, y - 2, 2, C.corteza); R.pset(x, y - 5 - (Math.floor(t * 3 + k) % 2), C.grisL); });
  }
  if (o.plymouth) { const [x, y] = L(LUG.plymouth); R.disco(x, y, 3 + (Math.sin(t * 5) > 0 ? 1 : 0), C.k); R.disco(x, y, 2, C.oro); }
  if (o.ruta != null) {
    const pts = [LUG.plymouth, [-40, 38], LUG.malaga, [-6, 44], LUG.londres, [-35, 50], LUG.plymouth].map(L);
    R.ruta(pts, o.ruta, C.rojo);
    for (const p of [LUG.malaga, LUG.londres]) { const [x, y] = L(p); R.disco(x, y, 2, C.k); R.disco(x, y, 1, C.oroL); }
  }
  if (o.ofertas) {
    const pts = [[-74, 40.7], [-87.6, 41.9], [-80.2, 25.8], [-66.1, 18.4], [-3.7, 40.4], [2.35, 48.85], [-0.13, 51.5], [13.4, 52.5], [12.5, 41.9], [-9.1, 38.7], [2.17, 41.4], [4.9, 52.4], [-77, 18.2]];
    pts.forEach((p, k) => { if (o.ofertas * pts.length < k + 0.5) return; const [x, y] = L(p); if (x < 0 || x > 319 || y < 0 || y > 179) return; const b = Math.sin(t * 6 + k) > 0; R.disco(x, y, b ? 4 : 3, C.k); R.disco(x, y, b ? 3 : 2, C.rojo); R.pset(x, y, C.oroL); });
    if (o.ofertas > 0.5) for (const [p, dx] of [[[-72, 20], -1], [[-68, 19], 1]]) { const [x, y] = L(p); for (let k = 0; k < 6; k++) R.pset(x + dx * 0, y + k, C.rojo); R.pset(x - 1, y + 5, C.rojo); R.pset(x + 1, y + 5, C.rojo); }
  }
  return L;
}

// ── calendario de noviembre (y diciembre): o.empieza (día de la semana del día 1, 0 = lunes), o.dias, o.jueves (resalta
// los jueves), o.marca ({día: color}), o.pavo (día con un pavito), o.arrastra ([desde, hasta, p]: el pavito se mueve)
export function calendario(R, x0, y0, t, o = {}) {
  const cw = o.cw ?? 16, ch = o.ch ?? 12, emp = o.empieza ?? 2, dias = o.dias ?? 30, filas = Math.ceil((emp + dias) / 7);
  R.rect(x0 - 3, y0 - 14, x0 + cw * 7 + 2, y0 + ch * filas + 2, C.k); R.rect(x0 - 2, y0 - 13, x0 + cw * 7 + 1, y0 + ch * filas + 1, C.blanco);
  R.rect(x0 - 2, y0 - 13, x0 + cw * 7 + 1, y0 - 3, o.color ?? C.naranjaS);
  for (const dx of [12, cw * 7 - 14]) { R.rect(x0 + dx, y0 - 17, x0 + dx + 2, y0 - 10, C.grisS); }
  for (let c = 0; c < 7; c++) R.rect(x0 + c * cw + 3, y0 - 9, x0 + c * cw + cw - 4, y0 - 7, c === 3 && o.jueves ? C.oroL : C.blanco);
  const pos = (d) => { const i = emp + d - 1; return [x0 + (i % 7) * cw, y0 + Math.floor(i / 7) * ch]; };
  for (let d = 1; d <= dias; d++) {
    const [x, y] = pos(d), jue = (emp + d - 1) % 7 === 3, col = o.marca?.[d];
    if (col) R.rect(x + 1, y + 1, x + cw - 1, y + ch - 1, col); else if (jue && o.jueves) R.rect(x + 1, y + 1, x + cw - 1, y + ch - 1, C.oroL);
    R.numero(String(d), x + Math.round(cw / 2), y + ch - 2, { fina: true, color: C.k, centro: true });
  }
  for (let c = 0; c <= 7; c++) R.rect(x0 + c * cw, y0, x0 + c * cw, y0 + ch * filas, C.grisL);
  for (let f = 0; f <= filas; f++) R.rect(x0, y0 + f * ch, x0 + cw * 7, y0 + f * ch, C.grisL);
  let pd = o.pavo;
  if (o.arrastra) { const [a, b, p] = o.arrastra; const [xa, ya] = pos(a), [xb, yb] = pos(b), e = R.easeIO(p); pd = null; pavito(R, Math.round(xa + (xb - xa) * e + cw / 2), Math.round(ya + (yb - ya) * e + ch / 2 - Math.sin(e * Math.PI) * 10), t); }
  if (pd) { const [x, y] = pos(pd); pavito(R, x + cw / 2, y + ch / 2, t); }
  return pos;
}
// pavito-icono para el calendario
export function pavito(R, x, y, t) {
  x = Math.round(x); y = Math.round(y);
  for (let k = -2; k <= 2; k++) R.disco(x - 2 + Math.abs(k), y - 2 + k * 2, 2, [C.rojo, C.naranja, C.amarillo, C.naranja, C.rojo][k + 2]);
  R.disco(x + 1, y + 1, 3, C.k); R.disco(x + 1, y + 1, 2, C.pavo); R.disco(x + 4, y - 2, 1, C.azulL); R.pset(x + 5, y - 1, C.moco);
}

// ── la molécula de triptófano (C11H12N2O2: 27 átomos), de bolas y palos; p 0–1 la va montando
export function triptofano(R, cx, cy, t, p = 1, e = 1) {
  const A = [   // [x, y, tipo]: anillo de seis, anillo de cinco con su N, cadena con el C alfa, el N del amino y el COOH
    [-30, 0, 'C'], [-22, -12, 'C'], [-8, -12, 'C'], [0, 0, 'C'], [-8, 12, 'C'], [-22, 12, 'C'],
    [12, -8, 'C'], [14, 6, 'N'], [3, 13, 'C'],
    [24, -16, 'C'], [36, -10, 'C'], [38, 4, 'N'], [48, -20, 'C'], [58, -14, 'O'], [48, -32, 'O'],
    [-38, -6, 'H'], [-26, -22, 'H'], [-4, -22, 'H'], [-4, 22, 'H'], [-26, 22, 'H'], [20, 14, 'H'], [24, -26, 'H'], [16, -22, 'H'], [32, -20, 'H'], [46, 10, 'H'], [32, 10, 'H'], [66, -18, 'H'],
  ];
  const E = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [3, 6], [6, 7], [7, 8], [8, 4], [6, 9], [9, 10], [10, 11], [10, 12], [12, 13], [12, 14], [0, 15], [1, 16], [2, 17], [4, 18], [5, 19], [7, 20], [9, 21], [9, 22], [10, 23], [11, 24], [11, 25], [13, 26]];
  const col = { C: [C.grisS, C.gris], N: [C.azul, C.azulL], O: [C.rojoS, C.rojo], H: [C.grisL, C.blanco] };
  const n = Math.round(p * A.length), b = Math.round(Math.sin(t * 1.5) * 1);
  const X = (v) => Math.round(cx + v * e), Y = (v) => Math.round(cy + v * e + b);
  for (const [i, j] of E) if (i < n && j < n) { R.linea(X(A[i][0]), Y(A[i][1]), X(A[j][0]), Y(A[j][1]), C.k); if (e > 1.2) R.linea(X(A[i][0]) + 1, Y(A[i][1]), X(A[j][0]) + 1, Y(A[j][1]), C.k); }
  A.slice(0, n).forEach(([x, y, q], k) => { const r = Math.round((q === 'H' ? 2 : 4) * e); R.disco(X(x), Y(y), r + 1, C.k); R.disco(X(x), Y(y), r, col[q][0]); R.disco(X(x) - Math.round(r / 3), Y(y) - Math.round(r / 3), Math.max(0, Math.round(r / 3)), col[q][1]); });
}
