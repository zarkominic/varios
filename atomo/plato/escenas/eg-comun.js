// Fontanería y decorados del episodio 8 (antiguo Egipto) en el estilo canónico pixel chibi (episodios/GUIA-ESTILO.md):
// colores planos, contorno limpio y nada de ruido. Cinco decorados que se repiten con variantes (A nilo, B guiza,
// C trono, D tumba, E alejandria) y el mapa de Egipto con el Nilo. El kit es pixel-roma (mapas y barra de tiempo) con
// lo de pixel-chibi encima (reparto, caras, bustos), así que una escena puede mezclar mapa y personajes.
//
//   import { preparar, rodar, nilo, EL } from '/atomo/plato/escenas/eg-comun.js';
//   const { E, R, M } = await preparar('eg-crecida');
//   rodar(E, R, [[0, (t) => nilo(R, t, { nivel: 2 })]], { año: -2600 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, P, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';

export const EL = ELENCO_CHIBI;
export { P, tela };
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
// colores de Egipto (3–4 tonos por material)
export const C = pal({
  k: '#1c1222', cielo1: '#4aa6ea', cielo2: '#74bef2', cielo3: '#a8daf4', bruma: '#f2e2bc', sol: '#fff4c8', solL: '#ffe28a',
  tarde1: '#3a3a7a', tarde2: '#a0507a', tarde3: '#e88a5a', tarde4: '#f8c870',
  arena: '#e8c88a', arenaS: '#c9a264', arenaL: '#f6dca6', arenaD: '#a8824c',
  roca: '#d08250', rocaS: '#a25a32', rocaL: '#e8a66c', rocaD: '#7a3e22',
  agua1: '#2a64b0', agua2: '#3678c4', agua3: '#4f94d8', aguaL: '#cfe8ff', aguaT: '#8a7450',
  verde: '#5aa83a', verdeS: '#3a7a28', verdeL: '#8ad05a', verdeD: '#24521a', trigo: '#e8c040', trigoS: '#b8901c',
  barro: '#3a2a24', barroL: '#5a4438', barroB: '#8a7a6a', grieta: '#8a6a44', camino: '#c8a87a', caminoS: '#a8885a', caminoL: '#dcc092',
  adobe: '#c8a070', adobeS: '#9a7448', adobeL: '#e4c08c', puerta: '#4a3020',
  tronco: '#8a5a30', troncoS: '#5e3a1e', hoja: '#3a8a3a', hojaS: '#246a2a', hojaL: '#6ab84a',
  caliza: '#ece2c8', calizaS: '#c8b894', calizaD: '#a08a64', calizaL: '#fbf6e8', oro: '#e8b830', oroS: '#a87a18', oroL: '#fff0a0',
  pared: '#e4c890', paredS: '#c4a46a', paredL: '#f2dcaa', azul: '#2a4fa8', azulL: '#4a78d0', rojo: '#c83a3a', rojoS: '#8e2424',
  turq: '#2aa8a0', turqS: '#1a7a74', negro: '#2a2430', suelo: '#b8946a', sueloS: '#8a6a44', sueloL: '#d4b088',
  tumba: '#4a3022', tumbaS: '#2e1c14', tumbaL: '#6a4630', ocre: '#d8a050', ocreS: '#a87430', vendas: '#efe6cc', vendasS: '#c4b898',
  madera: '#83552c', maderaS: '#5e3a1e', maderaL: '#a8743c', blanco: '#f6f2ea', gris: '#8c8ca0',
});

export async function preparar(id) {
  const E = await escena(id, 'ep08');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  R.tramosTiempo([[-3100, -2181, R.PALA.ORO, 'piramide'], [-2181, -1077, R.PALA.AZUL, 'carro'], [-1077, -30, R.PALA.MORADO, 'corona']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}

// Desde el episodio 8, Atom va arriba a la derecha, un 50 % más grande y solo: sin caja ni bocadillo (el público no
// entendía la caja y el bocadillo se veía mal). Las escenas pueden seguir llamando a R.caja(...): no dibuja nada.
const ATOM = [297, 24];
function conAtomGrande(R) {
  const { pset } = R;
  R.companero = (t, e = 0) => {
    const x = ATOM[0], y = ATOM[1] + Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)), r = 13 + 2.4 * e;
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0.35) pset(x + i, y + j, g > 0.75 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
    R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: e });
  };
  R.caja = () => {};
}

// igual que en los episodios 5–7: cartela, planos, caja, barra de tiempo arriba a la izquierda y Atom
export function rodar(E, R, planos, o = {}) {
  const dc = o.durCartela ?? 1.3;
  const lista = o.cartela
    ? [[0, (t) => R.cartela(Math.min(1, t / dc), o.cartela)], ...planos.map(([a, f, modo], i) => [i === 0 ? dc : a, f, modo ?? (i === 0 ? 'corte' : undefined)])]
    : planos;
  E.iniciar((t) => {
    R.secuencia(t, lista, { fundido: o.fundido ?? 0.35 });
    const e = E.energia(t);
    if (o.caja) o.caja(t, e);
    const año = typeof o.año === 'function' ? o.año(t) : o.año;
    const bo = typeof o.barra === 'function' ? o.barra(t) : o.barra;
    if (año != null && (!o.cartela || t > dc) && t >= (o.barraDesde ?? 0)) R.barraTiempo(t, año, { x0: 22, x1: 168, y: 5, alto: 2, ...(bo || {}) });
    if (!o.cartela || t > dc + 0.1) R.companero(t, e);
    R.presentar();
  }, { paso: 1 / 15 });
}

// ── piezas comunes ────────────────────────────────────────────────────────────────────────────────────────────────
// cielo: día (tres bandas y bruma en el horizonte), tarde (atardecer) o noche (estrellas); o.sol = [x, y, r]
export function cieloEg(R, t, o = {}) {
  const hor = o.hor ?? 92;
  if (o.noche) { R.cielo(t, { luna: o.luna ?? [250, 30, 10], hor, semilla: 8 }); if (o.aves !== false) fugaz(R, t); return; }
  const bandas = o.tarde ? [C.tarde1, C.tarde2, C.tarde3, C.tarde4] : [C.cielo1, C.cielo2, C.cielo3, C.bruma];
  for (let y = 0; y < hor; y++) R.rect(0, y, 319, y, bandas[Math.min(3, Math.floor((y / hor) * (y > hor - 8 ? 4 : 3.4)))]);
  const sol = o.sol ?? (o.tarde ? [250, hor - 18, 12] : [226, 26, 9]);
  if (sol) { R.disco(sol[0], sol[1], sol[2] + 2, o.tarde ? C.tarde4 : C.solL); R.disco(sol[0], sol[1], sol[2], C.sol); }
  if (!o.tarde && o.nubes !== false) for (const [x0, y, w, v] of [[40, 24, 34, 1.5], [170, 14, 44, 1], [120, 44, 22, 2]]) R.nube(((x0 + t * v) % 380) - 30, y, w);
  if (o.aves !== false) { halcon(R, t, 130, Math.min(28, hor - 30)); bandada(R, t, { tipo: o.tarde ? 'ibis' : 'golondrina', n: o.tarde ? 3 : 4, y: Math.min(40, hor - 22), cada: 8 }); }
}

// ── ambiente: que ningún decorado se quede quieto ni vacío ──────────────────────────────────────────────────────────
// Todo plano y de un píxel (sin tramas): aves, viento con arena, bichos del río, peces, un gato, motas en la luz.
const azar = (k) => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const AVE = pal({ gol: '#28304e', golB: '#f2ece0', ibis: '#f4f0e6', ibisS: '#c8c0b0', halcon: '#7a4a26', halconS: '#4e2e16', halconL: '#c89a5a', pez: '#c8d4dc', pezS: '#7a8aa0' });

// un ave en (x, y) con aleteo; tipo 'golondrina', 'ibis' o 'halcon' (este planea en círculo); d = 1 a la derecha
export function ave(R, x, y, t, tipo = 'golondrina', d = 1, k = 0) {
  const { pset } = R, X = (i) => Math.round(x + i * d); y = Math.round(y);
  const a = Math.sin(t * (tipo === 'ibis' ? 7 : 12) + k * 1.7) > 0;
  if (tipo === 'golondrina') {
    pset(X(0), y, AVE.gol); pset(X(1), y, AVE.gol); pset(X(0), y + 1, AVE.golB); pset(X(-1), y, AVE.gol); pset(X(-2), y + 1, AVE.gol); pset(X(-2), y - 1, AVE.gol);
    if (a) { pset(X(0), y - 1, AVE.gol); pset(X(-1), y - 2, AVE.gol); pset(X(-1), y - 3, AVE.gol); } else { pset(X(-1), y + 1, AVE.gol); pset(X(-1), y + 2, AVE.gol); }
  } else if (tipo === 'ibis') {
    for (let i = -1; i <= 3; i++) pset(X(i), y, AVE.ibis); pset(X(-2), y, AVE.gol); pset(X(-3), y + 1, AVE.gol); pset(X(-4), y + 1, AVE.gol);
    pset(X(4), y - 1, AVE.gol); pset(X(5), y - 1, AVE.gol); pset(X(6), y, AVE.gol); pset(X(7), y + 1, AVE.gol);
    if (a) { pset(X(1), y - 1, AVE.ibis); pset(X(2), y - 2, AVE.ibis); pset(X(2), y - 3, AVE.gol); } else { pset(X(1), y + 1, AVE.ibisS); pset(X(2), y + 2, AVE.ibisS); pset(X(2), y + 3, AVE.gol); }
  } else {
    const b = Math.round(Math.sin(t * 2 + k));
    for (let i = -5; i <= 5; i++) pset(X(i), y - (Math.abs(i) > 2 ? b : 0), Math.abs(i) > 3 ? AVE.halconS : AVE.halcon);
    pset(X(0), y + 1, AVE.halconL); pset(X(-1), y + 1, AVE.halconL); pset(X(1), y - 1, AVE.halconS); pset(X(2), y - 1, AVE.halconS); pset(X(-2), y + 1, AVE.halconS); pset(X(-3), y + 1, AVE.halconS);
  }
}

// bandada que cruza la pantalla cada cierto tiempo; o.tipo, o.n, o.y, o.v (px/s), o.d, o.cada (s entre pasadas)
export function bandada(R, t, o = {}) {
  const tipo = o.tipo ?? 'golondrina', n = o.n ?? 4, v = o.v ?? (tipo === 'ibis' ? 26 : 48), d = o.d ?? 1, cada = o.cada ?? 9, sem = o.semilla ?? 0;
  const ciclo = Math.max(cada, 380 / v + 1), u = (t + sem * 3.1) % ciclo, x0 = -30 + u * v;
  for (let k = 0; k < n; k++) {
    const x = x0 - (k % 2 ? 7 : 0) * k - k * 3, y = (o.y ?? 30) + (k % 2 ? 4 : -2) * Math.ceil(k / 2) + (tipo === 'golondrina' ? Math.sin(t * 3 + k) * 3 : 0);
    ave(R, d === 1 ? x : 319 - x, y, t, tipo, d, k + sem);
  }
}

// halcón que planea en círculos (Horus vigila desde arriba)
export function halcon(R, t, cx = 230, cy = 26, r = 22) {
  const a = t * 0.45; ave(R, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.35, t, 'halcon', Math.sin(a) > 0 ? -1 : 1);
}

// viento: rachas de arena que barren el suelo entre y0 e y1; o.fuerza (0–2), o.color
export function viento(R, t, o = {}) {
  const y0 = o.y0 ?? 120, y1 = o.y1 ?? 145, f = (o.fuerza ?? 1) * (0.6 + 0.4 * Math.sin(t * 0.7)), n = Math.round(10 * f);
  for (let k = 0; k < n; k++) {
    const v = 90 + azar(k) * 70, x = ((azar(k + 50) * 400 + t * v) % 420) - 50, y = Math.round(y0 + azar(k + 9) * (y1 - y0) + Math.sin(t * 4 + k) * 1.2), L = 4 + Math.round(azar(k + 3) * 8);
    R.rect(Math.round(x), y, Math.round(x + L), y, o.color ?? C.arenaL); if (L > 8) R.rect(Math.round(x + L + 3), y, Math.round(x + L + 5), y, o.color ?? C.arenaL);
  }
  for (let k = 0; k < Math.round(6 * f); k++) {   // granos que saltan
    const v = 70 + azar(k + 20) * 40, x = ((azar(k + 70) * 400 + t * v) % 400) - 40, fase = (t * 2 + azar(k)) % 1;
    R.pset(Math.round(x), Math.round(y1 - Math.sin(fase * Math.PI) * 4), o.grano ?? C.arenaS);
  }
}

// libélulas que se paran y salen disparadas cerca de los juncos
export function libelulas(R, t, zonas) {
  zonas.forEach(([x0, y0], k) => {
    const paso = Math.floor(t / 1.1 + k), u = Math.min(1, ((t / 1.1 + k) % 1) * 4);
    const ax = x0 + (azar(paso + k * 9) - 0.5) * 30, ay = y0 + (azar(paso + k * 9 + 1) - 0.5) * 10, bx = x0 + (azar(paso + k * 9 + 2) - 0.5) * 30, by = y0 + (azar(paso + k * 9 + 3) - 0.5) * 10;
    const x = Math.round(ax + (bx - ax) * u), y = Math.round(ay + (by - ay) * u), ala = Math.floor(t * 20) % 2;
    R.rect(x - 2, y, x + 1, y, C.turqS); R.pset(x + 1, y, C.turq); R.pset(x - 1, y - 1 + ala, C.aguaL); R.pset(x, y - 1 + ala, C.aguaL);
  });
}

// pez que salta del agua cada `cada` segundos en (x, y), con salpicón
export function pez(R, t, x, y, cada = 5, k = 0) {
  const u = ((t + k * 1.9) % cada) / 0.9;
  if (u < 1) {
    const px = Math.round(x + u * 12), py = Math.round(y - Math.sin(u * Math.PI) * 9), d = u < 0.5 ? -1 : 1;
    R.rect(px - 1, py, px + 1, py, AVE.pez); R.pset(px + 2, py, AVE.pez); R.pset(px - 2, py - d, AVE.pezS); R.pset(px - 2, py + d, AVE.pezS); R.pset(px, py + 1, AVE.pezS);
  }
  for (const [s, xx] of [[0, x], [1, x + 12]]) { const w = u - s; if (w > -0.05 && w < 0.35) { R.pset(xx - 1, y - 1, C.aguaL); R.pset(xx + 1, y - 1, C.aguaL); R.pset(xx, y - 2, C.aguaL); R.rect(xx - 2, y, xx + 2, y, C.aguaL); } }
}

// hipopótamo que asoma la cabeza (ojos, orejas y narices) y vuelve a hundirse
export function hipo(R, t, x, y, cada = 11) {
  const u = (t % cada) / cada; if (u > 0.45) return;
  const h = Math.round(Math.min(1, Math.sin(u / 0.45 * Math.PI) * 1.6) * 4), c = pal({ a: '#8a7a8e', s: '#5e5266', l: '#b4a4b4' });
  if (h <= 0) return;
  for (let i = 0; i < 14; i++) for (let j = 0; j < h; j++) R.pset(x + i, y - j, j === h - 1 ? c.l : i > 10 ? c.s : c.a);
  if (h >= 3) { R.pset(x + 1, y - h, c.s); R.pset(x + 3, y - h, c.s); R.pset(x + 2, y - h + 1, C.k); R.pset(x + 11, y - h + 1, C.k); R.pset(x + 13, y - h + 1, C.k); }
  if (h >= 4 && Math.floor(t * 3) % 7 !== 0) R.pset(x + 4, y - h + 2, C.k);
  R.rect(x - 2, y + 1, x + 16, y + 1, C.aguaL);
}

// ibis de pie en el agua que pica con el pico
export function ibisPie(R, t, x, suelo, k = 0) {
  const pica = Math.sin(t * 0.9 + k) > 0.6;
  R.rect(x, suelo - 5, x, suelo, AVE.gol); R.rect(x + 2, suelo - 5, x + 2, suelo, AVE.gol);
  R.rect(x - 2, suelo - 9, x + 3, suelo - 6, AVE.ibis); R.rect(x - 2, suelo - 6, x + 3, suelo - 6, AVE.ibisS); R.pset(x - 3, suelo - 8, AVE.gol); R.pset(x - 3, suelo - 7, AVE.gol);
  if (pica) { R.pset(x + 4, suelo - 7, AVE.gol); R.pset(x + 5, suelo - 5, AVE.gol); R.pset(x + 5, suelo - 6, AVE.gol); R.pset(x + 6, suelo - 3, AVE.gol); R.pset(x + 6, suelo - 4, AVE.gol); }
  else { R.rect(x + 3, suelo - 13, x + 3, suelo - 9, AVE.gol); R.pset(x + 4, suelo - 14, AVE.gol); R.pset(x + 5, suelo - 14, AVE.gol); R.pset(x + 6, suelo - 13, AVE.gol); R.pset(x + 7, suelo - 12, AVE.gol); R.pset(x + 8, suelo - 11, AVE.gol); }
}

// gato egipcio sentado de perfil, con la cola que se mueve, parpadeo y, de vez en cuando, un bostezo
export function gato(R, x, suelo, t, o = {}) {
  const c = pal({ a: '#c8a060', s: '#8e6a38', r: '#5a4024', l: '#e4c890', ojo: '#3a8a3a' }), d = o.dir ?? 1, X = (i) => x + i * d;
  for (let j = 0; j < 7; j++) R.rect(Math.min(X(-3), X(3 - (j < 2 ? 1 : 0))), suelo - j, Math.max(X(-3), X(3 - (j < 2 ? 1 : 0))), suelo - j, j % 3 === 1 ? c.r : c.a);
  R.rect(Math.min(X(0), X(3)), suelo - 11, Math.max(X(0), X(3)), suelo - 7, c.a); R.pset(X(4), suelo - 8, c.l); R.pset(X(4), suelo - 9, c.a);
  R.pset(X(0), suelo - 12, c.s); R.pset(X(3), suelo - 12, c.s); R.pset(X(0), suelo - 13, c.r); R.pset(X(3), suelo - 13, c.r);
  const bosteza = (t % 9) < 0.8, parpadea = (t % 3.3) < 0.15;
  R.pset(X(2), suelo - 10, parpadea || bosteza ? c.r : c.ojo); if (bosteza) { R.pset(X(4), suelo - 8, C.rojoS); R.pset(X(4), suelo - 7, C.rojoS); }
  for (let i = 1; i <= 6; i++) R.pset(X(-3 - i), Math.round(suelo - Math.max(0, i - 2) * (0.6 + 0.5 * Math.sin(t * 2.2 + i * 0.4))), i > 4 ? c.r : c.a);
  R.pset(X(2), suelo, c.l); R.pset(X(3), suelo, c.l);
}

// motas de polvo que flotan en la luz (interiores)
export function motas(R, t, x0, x1, y0, y1, n = 14, color = C.paredL) {
  for (let k = 0; k < n; k++) { const x = x0 + ((azar(k) * (x1 - x0) + Math.sin(t * 0.4 + k) * 6 + t * 1.5) % (x1 - x0)), y = y1 - ((azar(k + 30) * (y1 - y0) + t * (2 + azar(k + 5) * 2)) % (y1 - y0)); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(Math.round(x), Math.round(y), color); }
}

// araña que baja y sube de su hilo (techos de las tumbas)
export function arana(R, t, x, y0, largo = 30) {
  const u = (Math.sin(t * 0.5) + 1) / 2, y = Math.round(y0 + u * largo);
  R.rect(x, y0, x, y - 2, C.calizaD); R.disco(x, y, 1, C.k); for (const s of [-1, 1]) { R.pset(x + 2 * s, y - 1, C.k); R.pset(x + 2 * s, y + 1, C.k); R.pset(x + 3 * s, y + (Math.floor(t * 4) % 2), C.k); }
}

// estrella fugaz cada `cada` segundos (cielos de noche)
export function fugaz(R, t, cada = 6) {
  const u = (t % cada) / 0.6, k = Math.floor(t / cada); if (u > 1) return;
  const x = 40 + azar(k) * 200 + u * 50, y = 10 + azar(k + 1) * 30 + u * 18;
  for (let i = 0; i < 7; i++) R.pset(Math.round(x - i * 1.6), Math.round(y - i * 0.6), i < 2 ? C.blanco : C.calizaS);
}

// burro con alforjas, de perfil (mirando a la derecha), que trota; x = grupa
export function burro(R, x, suelo, t, o = {}) {
  const c = pal({ a: '#8c8494', s: '#5e5866', l: '#b4acb8', h: '#2a2430' }), d = o.dir ?? 1, X = (i) => Math.round(x + i * d), f = Math.floor(t * 6 + x) % 2;
  for (let i = 0; i <= 10; i++) R.rect(Math.min(X(i), X(i)), suelo - 9, X(i), suelo - 5, i % 4 === 3 ? c.s : c.a);
  for (let i = 0; i <= 10; i++) R.pset(X(i), suelo - 5, c.l);
  R.rect(Math.min(X(10), X(13)), suelo - 13, Math.max(X(10), X(13)), suelo - 9, c.a); R.pset(X(14), suelo - 10, c.a); R.pset(X(14), suelo - 9, c.s); R.pset(X(12), suelo - 12, c.h);
  R.pset(X(10), suelo - 15, c.a); R.pset(X(10), suelo - 14, c.a); R.pset(X(11), suelo - 15, c.s); R.pset(X(11), suelo - 14, c.s);   // orejas largas
  for (const [i, ff] of [[1, f], [3, 1 - f], [8, 1 - f], [10, f]]) { R.rect(X(i + (ff ? 1 : 0)), suelo - 4, X(i + (ff ? 1 : 0)), suelo, c.s); }
  R.pset(X(-1), suelo - 8, c.h); R.pset(X(-2), suelo - 7, c.h);
  if (o.carga !== false) { R.rect(Math.min(X(3), X(8)), suelo - 12, Math.max(X(3), X(8)), suelo - 9, C.blanco); R.rect(Math.min(X(4), X(7)), suelo - 8, Math.max(X(4), X(7)), suelo - 6, C.calizaS); }
}

// caravana lejana: un arriero y burros cargados que cruzan las dunas del fondo
export function caravana(R, t, y, o = {}) {
  const v = o.v ?? 7, x0 = ((t * v + (o.desfase ?? 0)) % 420) - 60, d = o.dir ?? 1;
  const X = (i) => (d === 1 ? x0 + i : 319 - x0 - i);
  mini(R, X(0), y, t, { anda: true, ropa: C.blanco });
  for (let k = 1; k <= (o.n ?? 2); k++) burro(R, X(-k * 18), y, t + k, { dir: d });
}

// ocas del Nilo en fila: la madre delante y los pollitos detrás
export function ocas(R, t, x, suelo, d = 1) {
  const c = pal({ a: '#a88a6a', s: '#6e5a44', b: '#f2ece0', p: '#e89a3a', po: '#e8d070' });
  const paso = Math.floor(t * 6) % 2;
  const pato = (px, s) => { px = Math.round(px);
    if (s) { R.rect(px - 2, suelo - 4, px + 2, suelo - 1, c.a); R.rect(px - 2, suelo - 1, px + 2, suelo - 1, c.b); R.rect(px + 2 * d, suelo - 7, px + 2 * d, suelo - 4, c.a); R.pset(px + 3 * d, suelo - 7, c.p); R.pset(px + 2 * d, suelo - 7, c.s); R.pset(px - 1, suelo, c.p); R.pset(px + 1 - paso, suelo, c.p); }
    else { R.rect(px - 1, suelo - 2, px + 1, suelo - 1, c.po); R.pset(px + d, suelo - 3, c.po); R.pset(px + 2 * d, suelo - 3, c.p); R.pset(px, suelo, c.p); }
  };
  pato(x, true); for (let k = 1; k <= 3; k++) pato(x - d * (6 + k * 5), false);
}

// ── gags: piezas cortas para los momentos graciosos ────────────────────────────────────────────────────────────────
// estrellitas que giran sobre la cabeza de alguien que se ha dado un golpe (x, y = coronilla)
export function mareo(R, x, y, t) {
  for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.1, px = Math.round(x + Math.cos(a) * 7), py = Math.round(y - 3 + Math.sin(a) * 2); R.pset(px, py, C.oroL); R.pset(px - 1, py, C.oro); R.pset(px + 1, py, C.oro); R.pset(px, py - 1, C.oro); R.pset(px, py + 1, C.oro); }
}
// polvareda (o nube de sal) que crece y se deshace: u 0–1
export function polvareda(R, x, y, u, color = C.arenaL, grande = 1) {
  if (u <= 0 || u >= 1) return;
  for (let k = 0; k < 6; k++) { const a = Math.PI * (k / 5), d = (4 + u * 12) * grande, r = Math.round((4 - u * 3.5) * grande); if (r > 0) R.disco(Math.round(x + Math.cos(a) * d * (k % 2 ? 1 : 0.7)), Math.round(y - Math.sin(a) * d * 0.5), r, color); }
}
// saltitos de ir corriendo (para el salto de R.actor)
export const trote = (t) => Math.round(Math.abs(Math.sin(t * 14)) * 2);
// gota de sudor junto a la cabeza
export function gotaSudor(R, x, y, t) { const dy = Math.round((t * 6) % 4); R.pset(x, y + dy, C.aguaL); R.pset(x, y + dy + 1, C.agua3); R.pset(x - 1, y + dy + 1, C.aguaL); }
// hogaza de pan
export function pan(R, x, y) { R.rect(x - 3, y - 2, x + 3, y, C.ocre); R.rect(x - 2, y - 3, x + 2, y - 3, C.ocre); R.rect(x - 2, y - 2, x + 2, y - 2, C.oroL); R.pset(x - 3, y, C.ocreS); R.pset(x + 3, y, C.ocreS); }

// palmera datilera: tronco con anillos y penacho de hojas que se mece
export function palmera(R, x, suelo, s = 1, t = 0) {
  const h = Math.round(30 * s), mece = Math.round(Math.sin(t * 1.2 + x) * 1.5);
  for (let j = 0; j < h; j++) { const xx = Math.round(x + Math.sin(j / h * 1.6) * 3 * s + (j > h * 0.7 ? mece * (j - h * 0.7) / (h * 0.3) : 0)); R.rect(xx - 1, suelo - j, xx + 1, suelo - j, j % 3 === 0 ? C.troncoS : C.tronco); R.pset(xx - 2, suelo - j, C.k); R.pset(xx + 2, suelo - j, C.k); }
  const cx = Math.round(x + Math.sin(1.6) * 3 * s + mece), cy = suelo - h;
  for (let k = 0; k < 7; k++) {
    const a = -Math.PI / 2 + (k - 3) * 0.55 + Math.sin(t * 1.4 + k) * 0.05, L = (11 + (k % 2) * 3) * s;
    for (let i = 0; i <= L; i++) { const px = Math.round(cx + Math.cos(a) * i), py = Math.round(cy + Math.sin(a) * i + (i * i) / (L * 2.2)); R.pset(px, py, i < L * 0.3 ? C.hojaS : k % 2 ? C.hoja : C.hojaL); R.pset(px, py + 1, C.hojaS); if (i % 2 === 0 && i > 2) R.pset(px + (Math.cos(a) > 0 ? 0 : 0), py + 2, C.hojaS); }
  }
  R.disco(cx, cy + 1, 2, C.troncoS); R.pset(cx - 1, cy + 3, C.rojoS); R.pset(cx + 1, cy + 3, C.rojoS);   // dátiles
}

// casa de adobe de techo plano con escalera exterior, puerta y ventanucos
export function casaAdobe(R, x, suelo, w = 26, h = 18, o = {}) {
  R.rect(x, suelo - h, x + w, suelo, C.adobe); R.rect(x, suelo - h, x + w, suelo - h + 1, C.adobeL); R.rect(x + w - 3, suelo - h, x + w, suelo, C.adobeS);
  R.rect(x - 1, suelo - h - 1, x + w + 1, suelo - h - 1, C.k); R.rect(x - 1, suelo - h, x - 1, suelo, C.k); R.rect(x + w + 1, suelo - h, x + w + 1, suelo, C.k);
  R.rect(x + 4, suelo - 9, x + 9, suelo, C.puerta); R.rect(x + 3, suelo - 10, x + 10, suelo - 10, C.k);
  R.rect(x + w - 10, suelo - h + 5, x + w - 7, suelo - h + 7, C.puerta);
  if (o.escalera) for (let k = 0; k < 6; k++) R.rect(x + w + 2 + k * 2, suelo - h + k * 3, x + w + 3 + k * 2, suelo - h + k * 3 + 2, C.adobeS);
  if (o.toldo) { R.rect(x + 2, suelo - h - 6, x + w - 8, suelo - h - 5, o.toldo); R.rect(x + 2, suelo - h - 5, x + 2, suelo - h - 1, C.madera); R.rect(x + w - 8, suelo - h - 5, x + w - 8, suelo - h - 1, C.madera); }
  if (o.jarra) { R.disco(x + w - 4, suelo - h - 3, 2, C.rocaS); R.pset(x + w - 4, suelo - h - 6, C.rocaS); }
}

// silo de barro en forma de cúpula
export function silo(R, x, suelo, r = 7, lleno = 1) {
  for (let y = -r * 2; y <= 0; y++) for (let xx = -r; xx <= r; xx++) { const yy = y + r; if (y < -r && Math.hypot(xx, yy) > r) continue; R.pset(x + xx, suelo + y, xx > r * 0.4 ? C.adobeS : xx < -r * 0.5 ? C.adobeL : C.adobe); }
  R.rect(x - 2, suelo - r * 2 - 1, x + 2, suelo - r * 2, C.k); R.rect(x - 2, suelo - 6, x + 2, suelo, C.puerta);
  if (lleno > 0) for (let k = 0; k < Math.round(lleno * 3); k++) R.disco(x - 4 + k * 4, suelo + 1, 2, C.trigo);
}

// junco de papiro: tallo verde con la umbela arriba
export function juncos(R, x0, suelo, n, t, o = {}) {
  for (let k = 0; k < n; k++) {
    const x = x0 + k * (o.paso ?? 4) + (k % 3), h = 10 + ((k * 7) % 6) + (o.alto ?? 0), m = Math.round(Math.sin(t * 1.5 + k) * 1);
    for (let j = 0; j < h; j++) R.pset(Math.round(x + (j > h * 0.6 ? m : 0)), suelo - j, k % 2 ? C.verdeS : C.verde);
    const tx = x + m, ty = suelo - h; R.pset(tx - 2, ty, C.verdeL); R.pset(tx - 1, ty - 1, C.verdeL); R.pset(tx, ty - 1, C.verdeL); R.pset(tx + 1, ty - 1, C.verdeL); R.pset(tx + 2, ty, C.verdeL); R.pset(tx, ty, C.verde);
  }
}

// figurita lejana (6 × 9): para gente al fondo (obreros en la rampa, campesinos en el campo); o.tira (inclinada)
export function mini(R, x, suelo, t, o = {}) {
  const piel = o.piel ?? hex('#d0905e'), ropa = o.ropa ?? C.blanco, pelo = o.pelo ?? C.negro, f = Math.floor(t * 6 + x) % 2, inc = o.tira ? 1 : 0;
  x = Math.round(x); suelo = Math.round(suelo);
  R.rect(x - 1 + inc, suelo - 9, x + 1 + inc, suelo - 7, piel); R.rect(x - 1 + inc, suelo - 9, x + 1 + inc, suelo - 9, pelo);
  R.rect(x - 1, suelo - 6, x + 1, suelo - 5, piel); R.rect(x - 1, suelo - 4, x + 1, suelo - 3, ropa);
  R.pset(x - 1 + (o.anda ? f : 0), suelo - 2, piel); R.pset(x - 1 + (o.anda ? f : 0), suelo - 1, piel); R.pset(x + 1 - (o.anda ? f : 0), suelo - 2, piel); R.pset(x + 1 - (o.anda ? f : 0), suelo - 1, piel);
  if (o.brazo) { R.pset(x + 2, suelo - 6 - (o.brazo === 'arriba' ? 2 : 0), piel); R.pset(x + 3, suelo - 7 - (o.brazo === 'arriba' ? 3 : 0), piel); }
}

// barca de papiro (atada en haces) con un pescador y la pértiga
export function barcaPapiro(R, x, y, t, o = {}) {
  const b = Math.round(Math.sin(t * 1.8 + x) * 0.7);
  y += b;
  for (let i = -12; i <= 12; i++) { const top = y - Math.round(Math.pow(Math.abs(i) / 12, 3) * 6); R.rect(x + i, top, x + i, y + 2, Math.abs(i) % 3 === 0 ? C.trigoS : C.trigo); R.pset(x + i, y + 3, C.k); }
  for (let i = -12; i <= 12; i += 4) R.rect(x + i, y - 1, x + i, y + 2, C.verdeS);
  if (o.vela) { R.rect(x - 1, y - 22, x, y - 1, C.madera); R.poligono([[x + 1, y - 21], [x + 11, y - 18], [x + 9, y - 4], [x + 1, y - 4]], C.blanco); R.linea(x + 1, y - 4, x + 9, y - 4, C.calizaS); }
  if (o.pescador !== false) { mini(R, x - 4, y - 1, t, { ropa: C.blanco }); R.linea(x - 2, y - 7, x + 6, y + 6, C.madera); }
}

// el Nilo de frente para el mapa: polilínea de sur a norte (lon, lat), con el delta
export const NILO = [[33.4, 16.6], [32.9, 17.6], [31.9, 18.5], [30.6, 19.4], [30.5, 20.6], [31.3, 21.8], [32.5, 22.6], [32.9, 23.9], [32.9, 24.6], [32.6, 25.7], [32.0, 26.2], [31.0, 27.2], [30.8, 28.0], [31.0, 29.0], [31.25, 30.05]];
export const DELTA = [[[31.25, 30.05], [30.6, 30.7], [30.3, 31.4]], [[31.25, 30.05], [31.4, 30.8], [31.8, 31.5]], [[31.25, 30.05], [31.0, 30.9], [31.0, 31.55]]];

// ── mapa de Egipto: o.vista, o.nilo (0–1, se dibuja de sur a norte), o.verde (la franja), o.rojo (desierto en rojo),
//    o.trozos (Egipto partido en colores), o.imperio (0–1, de Nubia a Siria), o.fuegos (0–1)
export function mapaEg(R, t, o = {}) {
  const v = o.vista ?? R.VISTAS.egipto;
  R.mapa(t, { vista: v });
  const L = (p) => R.lugar(p, undefined, v);
  // repintado plano, al estilo chibi: mar en dos azules con destellos, tierra de arena con la costa marcada
  const esMar = new Uint8Array(R.W * R.H), MARC = new Set(R.PR.MAR);
  for (let y = 0; y < R.H; y++) for (let x = 0; x < R.W; x++) esMar[y * R.W + x] = MARC.has(R.pget(x, y)) ? 1 : 0;
  for (let y = 0; y < R.H; y++) for (let x = 0; x < R.W; x++) {
    const i = y * R.W + x, costa = !esMar[i] && ((x > 0 && esMar[i - 1]) || (x < R.W - 1 && esMar[i + 1]) || (y > 0 && esMar[i - R.W]) || (y < R.H - 1 && esMar[i + R.W]));
    const orilla = esMar[i] && ((x > 0 && !esMar[i - 1]) || (y > 0 && !esMar[i - R.W]) || (y < R.H - 1 && !esMar[i + R.W]) || (x < R.W - 1 && !esMar[i + 1]));
    R.pset(x, y, esMar[i] ? (orilla ? C.agua3 : C.agua2) : costa ? C.k : o.rojo ? C.roca : C.arena);
  }
  for (let k = 0; k < 30; k++) { const x = ((k * 53 + t * 3) % 330) - 5, y = (k * 37) % R.H; if (esMar[y * R.W + Math.max(0, Math.min(R.W - 1, Math.round(x)))]) R.rect(Math.round(x), y, Math.round(x) + 3, y, C.aguaL); }
  if (o.imperio) {
    const pol = [[29.5, 31.5], [33, 31.3], [35, 33], [36.6, 35.6], [38.5, 36], [37.5, 33], [34.8, 30], [33.8, 27.8], [34.5, 23], [33.8, 18.6], [31.8, 17.8], [30.2, 18.6], [29.5, 22], [29.2, 26], [28.8, 29.5]].map(L);
    const [cx, cy] = L([32, 27]);
    for (let y = 0; y < R.H; y++) for (let x = 0; x < R.W; x++) { if (esMar[y * R.W + x] || !R.dentro(pol, x, y)) continue; if (Math.hypot(x - cx, (y - cy) * 0.7) > o.imperio * 140) continue; if (R.pget(x, y) !== C.k) R.pset(x, y, C.ocre); }
  }
  const pts = NILO.map(L), n = pts.length - 1, hasta = (o.nilo ?? 1) * n;
  const tramo = (a, b, f, ancho, c) => { const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 2)); for (let s = 0; s <= steps * f; s++) { const x = a[0] + (b[0] - a[0]) * s / steps, y = a[1] + (b[1] - a[1]) * s / steps; R.disco(Math.round(x), Math.round(y), ancho, c); } };
  if (o.verde) for (let i = 0; i < Math.min(n, hasta); i++) tramo(pts[i], pts[i + 1], Math.min(1, hasta - i), 3, o.negro ? C.barro : C.verde);
  if (o.verde && hasta >= n) for (const d of DELTA) { const q = d.map(L); for (let i = 0; i < q.length - 1; i++) tramo(q[i], q[i + 1], 1, 3, o.negro ? C.barro : C.verde); }
  for (let i = 0; i < Math.min(n, hasta); i++) tramo(pts[i], pts[i + 1], Math.min(1, hasta - i), 1, C.agua2);
  if (hasta >= n) for (const d of DELTA) { const q = d.map(L); for (let i = 0; i < q.length - 1; i++) tramo(q[i], q[i + 1], 1, 0, C.agua2); }
  if (o.trozos) {
    const cortes = [[31.25, 30.05, C.rojo], [30.9, 28.2, C.turq], [32.2, 26.0, C.oro], [32.9, 24.2, C.azulL]];
    cortes.forEach(([lo, la, c], k) => { if (o.trozos < 0.25 * k) return; const [x, y] = L([lo, la]); const dx = Math.round(Math.sin(t * 3 + k) * o.trozos * 2); R.disco(x + dx + (k % 2 ? 4 : -4) * o.trozos, y, 4, c); R.anillo(x + dx + (k % 2 ? 4 : -4) * o.trozos + 0.5, y + 0.5, 5, C.k); });
  }
  if (o.ciudades !== false && (o.nilo ?? 1) >= 1) for (const c of ['alejandria', 'menfis', 'luxor']) { const [x, y] = L(c); R.disco(x, y, 2, C.k); R.disco(x, y, 1, C.oro); }
  return L;
}

// ── A · la orilla del Nilo ────────────────────────────────────────────────────────────────────────────────────────
// o.nivel: 0 (sequía), 1 (normal), 2 (crecida: el agua cubre los campos); o.barro (0–1: campos de barro negro);
// o.seco (campos agrietados); o.silos; o.nilometro (0–1: nivel en el pozo de la izquierda); o.aldea (true por defecto);
// o.desierto (orilla sin campos ni aldea, para los carros y los soldados franceses); o.cocodrilo; o.barcas; o.tarde
export function nilo(R, t, o = {}) {
  const { rect, pset } = R;
  const nivel = o.nivel ?? 1;
  cieloEg(R, t, { ...o, hor: 72 });
  // acantilados de la orilla de enfrente
  for (let x = 0; x < 320; x++) {
    const top = Math.round(60 + 5 * Math.sin(x * 0.045) + 3 * Math.sin(x * 0.13 + 1));
    for (let y = top; y < 84; y++) pset(x, y, y === top ? C.k : y < top + 3 ? C.rocaL : (x % 23 < 2 && y < 78) ? C.rocaS : y > 79 ? C.rocaS : C.roca);
  }
  // orilla de enfrente: franja verde con palmeras pequeñas
  rect(0, 82, 319, 87, C.verdeS); rect(0, 82, 319, 82, C.verde);
  for (let x = 6; x < 320; x += 19) { const h = 6 + (x % 3); rect(x, 82 - h, x, 82, C.troncoS); for (let i = -3; i <= 3; i++) pset(x + i, 82 - h - (Math.abs(i) === 3 ? 0 : 1), C.hojaS); }
  // el río
  const fondo = nivel === 0 ? 98 : nivel === 1 ? 104 : 104 + Math.round(22 * Math.min(1, nivel - 1));
  const arriba = nivel === 0 ? 92 : 88;
  if (nivel === 0) { rect(0, 88, 319, 91, C.barroL); rect(0, 99, 319, 104, C.barroL); }
  for (let y = arriba; y < fondo; y++) rect(0, y, 319, y, y < arriba + 3 ? C.agua3 : y < arriba + 9 ? C.agua2 : nivel >= 2 && y > 104 ? C.aguaT : C.agua1);
  if (nivel >= 2) for (let k = 0; k < 10; k++) { const y = 106 + (k * 7) % 18, x = ((k * 53 + t * 4) % 340) - 10; rect(Math.round(x), y, Math.round(x + 5), y, C.arenaS); }
  for (let k = 0; k < 18; k++) { const y = arriba + 1 + (k * 5) % Math.max(2, fondo - arriba - 2), x = ((k * 61 + t * (5 + (k % 3) * 2)) % 340) - 10; rect(Math.round(x), y, Math.round(x + 3 + (k % 3)), y, C.aguaL); }
  // campos de la orilla de acá (si el agua no los cubre)
  if (!o.desierto && fondo < 128) for (let y = fondo; y < 130; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - fondo) / 3), c = o.barro ? (y % 3 === 0 ? C.barro : (x + y * 3) % 17 === 0 && o.barro > 0.5 ? C.barroB : C.barroL)
      : o.seco ? ((x * 13 + y * 7) % 23 === 0 || (y - fondo) % 7 === 0 && x % 9 < 4 ? C.grieta : C.caminoL)
      : (Math.floor(x / 40) + Math.floor((y - fondo) / 9)) % 3 === 0 ? (fila % 2 ? C.trigo : C.trigoS) : fila % 2 ? C.verde : C.verdeS;
    pset(x, y, c);
  }
  if (o.desierto) for (let y = fondo; y < 130; y++) rect(0, y, 319, y, y < fondo + 3 ? C.arenaS : C.arena);
  if (o.barro && fondo < 128) for (let k = 0; k < 10; k++) { const x = (k * 37 + 11) % 320, y = fondo + 4 + (k * 7) % 20; if (Math.sin(t * 3 + k) > 0.4) pset(x, y, C.aguaL); }
  // juncos al borde del agua
  if (nivel < 2 && !o.desierto) { juncos(R, 4, fondo + 2, 9, t); juncos(R, 92, fondo + 2, 6, t); juncos(R, 196, fondo + 2, 5, t); }
  // aldea, silos y palmeras
  if (o.aldea !== false && !o.desierto) {
    const s = 124;
    casaAdobe(R, 214, s, 24, 16, { escalera: true, jarra: true }); casaAdobe(R, 252, s - 2, 30, 20, { toldo: C.blanco }); casaAdobe(R, 290, s, 26, 15);
    if (o.silos) { silo(R, 176, s, 7, o.silos); silo(R, 194, s, 6, o.silos); }
    palmera(R, 206, s, 0.9, t); palmera(R, 302, s - 2, 1, t); palmera(R, 150, s + 2, 0.8, t);
  }
  if (o.desierto) { palmera(R, 40, 128, 0.8, t); palmera(R, 290, 128, 0.9, t); }
  // cigüeñal (shaduf) para subir agua al campo
  if (!o.desierto && nivel === 1) {
    const sx = 64, sy = fondo + 4, a = Math.sin(t * 1.4) * 0.35;
    rect(sx, sy - 16, sx + 1, sy, C.madera); rect(sx - 1, sy - 17, sx + 2, sy - 16, C.k);
    const bx = Math.round(sx + Math.cos(Math.PI + 0.5 + a) * 16), by = Math.round(sy - 16 + Math.sin(Math.PI + 0.5 + a) * -10);
    const cx2 = Math.round(sx + Math.cos(0.5 + a) * 10), cy2 = Math.round(sy - 16 - Math.sin(0.5 + a) * -6);
    R.linea(bx, by, cx2, cy2, C.maderaS); R.disco(cx2, cy2, 2, C.barroL); R.linea(bx, by, bx, by + 7, C.k); R.rect(bx - 1, by + 7, bx + 1, by + 9, C.rocaS);
    mini(R, sx + 6, sy, t, { brazo: true });
  }
  // barcas y cocodrilo
  if (o.barcas !== false && nivel >= 1) { barcaPapiro(R, ((t * 6 + 40) % 380) - 30, arriba + 6, t, {}); barcaPapiro(R, 330 - ((t * 4 + 90) % 380), arriba + 4, t, { vela: true, pescador: true }); }
  if (o.cocodrilo) R.cocodrilo(110 + Math.round(Math.sin(t * 0.4) * 6), arriba + 6, t, { dir: -1 });
  // camino (el escenario) y el canal de delante
  for (let y = 130; y < 146; y++) rect(0, y, 319, y, y === 130 ? C.k : y < 133 ? C.caminoL : (y - 133) % 5 === 0 ? C.caminoS : C.camino);
  for (let x = 7; x < 320; x += 29) { pset(x, 137, C.caminoS); pset(x + 1, 137, C.caminoS); pset(x + 11, 142, C.caminoL); }
  rect(0, 146, 319, 147, C.caminoS);
  for (let y = 148; y < 180; y++) rect(0, y, 319, y, y < 152 ? C.verdeS : y < 160 ? (nivel === 0 ? C.barroL : C.agua2) : C.verdeD);
  if (nivel !== 0) for (let k = 0; k < 8; k++) { const x = ((k * 47 + t * 7) % 340) - 10; rect(Math.round(x), 155, Math.round(x + 4), 155, C.aguaL); }
  juncos(R, 0, 180, 14, t, { paso: 7, alto: 6 }); juncos(R, 210, 180, 16, t, { paso: 7, alto: 4 });
  // nilómetro: un pozo de piedra con escalera y marcas; el agua sube con o.nilometro
  if (o.nilometro != null) {
    const x0 = 6, x1 = 58, y0 = 112, y1 = 178;
    rect(x0, y0, x1, y1, C.calizaD); rect(x0 + 3, y0 + 3, x1 - 3, y1, C.calizaS);
    for (let k = 0; k < 10; k++) { const y = y0 + 6 + k * 6; rect(x0 + 4 + k * 4, y, x1 - 4, y + 2, C.caliza); rect(x0 + 4 + k * 4, y, x1 - 4, y, C.calizaL); }
    for (let k = 0; k < 9; k++) { const y = y0 + 8 + k * 7; rect(x1 - 8, y, x1 - 4, y, C.k); }
    const ny = Math.round(y1 - o.nilometro * (y1 - y0 - 10));
    for (let y = ny; y <= y1; y++) for (let x = x0 + 3; x <= x1 - 3; x++) if ((x + y) % 2 === 0 || y > ny + 1) pset(x, y, y === ny ? C.aguaL : C.agua2);
    rect(x0 - 1, y0 - 1, x1 + 1, y0, C.k); rect(x0 - 1, y0, x0, y1, C.k); rect(x1, y0, x1 + 1, y1, C.k);
  }
  // ambiente del río: ibis, peces, hipopótamo, libélulas, un ibis pescando en el canal y, si no hay agua, viento con polvo
  if (nivel >= 1) { pez(R, t, 118, arriba + 8, 5); pez(R, t, 252, arriba + 11, 7, 1); bandada(R, t, { tipo: 'ibis', n: 3, y: 62, d: -1, cada: 13, semilla: 2 }); }
  if (nivel === 1 && !o.cocodrilo && o.hipo !== false) hipo(R, t, 160, arriba + 9);
  if (nivel !== 0 && o.desierto !== true) { libelulas(R, t, [[34, 150], [244, 151]]); if (o.ibis !== false) ibisPie(R, t, 278, 158); }
  if (nivel === 1 && !o.desierto && o.ocas !== false) { const f = (t % 16) / 16; ocas(R, t, R.lerp(340, -40, f), 157, -1); }
  if (nivel === 0 || o.seco || o.desierto) viento(R, t, { y0: o.desierto ? 108 : 100, y1: 129, fuerza: 1.4, color: C.caminoL, grano: C.grieta });
}

// ── B · Guiza en obras ────────────────────────────────────────────────────────────────────────────────────────────
// o.fase: 'nada', 'escalonada' (o.p 0–1: escalones que aparecen), 'obra' (o.p 0–1: altura de la Gran Pirámide, con
// rampa y obreros), 'terminada' (blanca y con el remate de oro), 'vieja' (gastada, sin revestimiento); o.pueblo (el
// pueblo de los obreros a la izquierda); o.tarde, o.noche; o.esfinge
export function piramide(R, cx, base, alto, o = {}) {
  const p = o.p ?? 1, top = Math.round(base - alto * p), fase = o.fase ?? 'terminada';
  const luz = fase === 'terminada' ? C.calizaL : fase === 'vieja' ? C.arenaL : C.caliza;
  const sombra = fase === 'terminada' ? C.calizaS : fase === 'vieja' ? C.arenaS : C.calizaS;
  const ap = base - alto;
  for (let y = top; y <= base; y++) {
    const hw = Math.round((y - ap) * 0.82);
    for (let x = cx - hw; x <= cx + hw; x++) {
      const hilada = fase !== 'terminada' && (y - ap) % 3 === 0, piedra = fase !== 'terminada' && ((x + Math.floor((y - ap) / 3) * 2) % 5 === 0);
      R.pset(x, y, x < cx ? (hilada || piedra ? sombra : luz) : (hilada || piedra ? C.calizaD : sombra));
    }
    R.pset(cx - hw - 1, y, C.k); R.pset(cx + hw + 1, y, C.k);
  }
  if (p < 1) R.rect(cx - Math.round((top - ap) * 0.82), top - 1, cx + Math.round((top - ap) * 0.82), top - 1, C.k);
  if (fase === 'terminada' && p >= 1) { R.poligono([[cx, ap - 1], [cx - 5, ap + 5], [cx + 5, ap + 5]], C.oro); R.poligono([[cx, ap - 1], [cx + 5, ap + 5], [cx, ap + 5]], C.oroS); R.pset(cx - 1, ap + 1, C.oroL); }
  if (fase === 'vieja') for (let k = 0; k < 14; k++) { const y = ap + 8 + (k * 13) % (alto - 10), hw = Math.round((y - ap) * 0.82); R.pset(cx - hw + (k % 3), y, C.arenaD); R.pset(cx + hw - 1 - (k % 2), y, C.arenaD); }
  R.rect(cx - Math.round(alto * 0.82) - 1, base + 1, cx + Math.round(alto * 0.82) + 1, base + 1, C.k);
}
export function escalonada(R, cx, base, p = 1) {
  const n = Math.max(1, Math.ceil(p * 6));
  for (let k = 0; k < n; k++) {
    const w = 46 - k * 7, h = 9, y1 = base - k * h, y0 = y1 - h + 1, f = k === n - 1 ? Math.min(1, p * 6 - k) : 1, yy0 = Math.round(y1 - (h - 1) * f);
    R.rect(cx - w, yy0, cx + w, y1, C.caliza); R.rect(cx + Math.round(w * 0.35), yy0, cx + w, y1, C.calizaS); R.rect(cx - w, yy0, cx + w, yy0, C.calizaL);
    for (let x = cx - w + 3; x < cx + w; x += 6) R.pset(x, Math.round((yy0 + y1) / 2), C.calizaD);
    R.rect(cx - w - 1, yy0 - 1, cx + w + 1, yy0 - 1, C.k); R.rect(cx - w - 1, yy0, cx - w - 1, y1, C.k); R.rect(cx + w + 1, yy0, cx + w + 1, y1, C.k);
  }
}
export function guiza(R, t, o = {}) {
  const { rect, pset } = R;
  cieloEg(R, t, { ...o, hor: 104 });
  // dunas lejanas
  for (let x = 0; x < 320; x++) { const top = Math.round(98 + 4 * Math.sin(x * 0.03 + 1) + 2 * Math.sin(x * 0.11)); for (let y = top; y < 132; y++) pset(x, y, o.noche ? (y === top ? C.arenaS : C.arenaD) : y === top ? C.arenaL : y < top + 6 ? C.arena : C.arenaS); }
  const fase = o.fase ?? 'terminada';
  if (fase === 'terminada' || fase === 'vieja') { piramide(R, 92, 122, 34, { fase }); piramide(R, 296, 124, 26, { fase }); }
  if (fase === 'escalonada') escalonada(R, 196, 126, o.p ?? 1);
  if (fase === 'obra' || fase === 'terminada' || fase === 'vieja') piramide(R, 196, 126, 86, { fase: fase === 'obra' ? 'obra' : fase, p: fase === 'obra' ? (o.p ?? 0.5) : 1 });
  if (o.noche) for (let y = 0; y < 132; y++) for (let x = (y % 2); x < 320; x += 2) { const c = R.pget(x, y); if (c === C.calizaL || c === C.caliza || c === C.arenaL || c === C.arena) pset(x, y, C.calizaD); }
  // rampa y obreros que suben bloques
  if (fase === 'obra') {
    const p = o.p ?? 0.5, top = Math.round(126 - 86 * p), x0 = 60, x1 = 196 - Math.round((top - 40) * 0.82) + 2;
    R.poligono([[x0, 126], [x1, top], [x1 + 6, top], [x1 + 6, 126]], C.adobe); R.linea(x0, 126, x1, top, C.k); R.linea(x0 + 1, 126, x1 + 1, top, C.adobeL);
    for (let k = 0; k < 4; k++) {
      const f = ((t * 0.05 + k / 4) % 1), bx = x0 + (x1 - x0) * f, by = 126 + (top - 126) * f;
      R.rect(Math.round(bx), Math.round(by) - 5, Math.round(bx) + 5, Math.round(by) - 1, C.caliza); R.rect(Math.round(bx), Math.round(by) - 5, Math.round(bx) + 5, Math.round(by) - 5, C.calizaL); R.pset(Math.round(bx) + 5, Math.round(by) - 3, C.k);
      for (let j = 0; j < 3; j++) mini(R, bx + 9 + j * 4, by - 3 - j * 2.6, t + j, { tira: true, anda: true });
    }
  }
  // la esfinge (de perfil, mirando a la derecha)
  if (o.esfinge) {
    const x = 104, sb = 130;
    rect(x, sb - 9, x + 34, sb, C.arenaS); rect(x, sb - 9, x + 34, sb - 8, C.arenaL); rect(x - 1, sb - 10, x + 35, sb - 10, C.k);   // lomo
    rect(x + 34, sb - 4, x + 46, sb, C.arenaS); rect(x + 34, sb - 4, x + 46, sb - 4, C.arenaL);                                 // patas delanteras
    rect(x + 28, sb - 22, x + 40, sb - 9, C.arenaS);                                                                          // pecho y cuello
    for (let j = 0; j < 12; j++) rect(x + 26, sb - 30 + j, x + 31, sb - 30 + j, j % 2 ? C.azul : C.arenaL);                    // nemes a rayas
    rect(x + 31, sb - 30, x + 40, sb - 19, C.arenaL); rect(x + 26, sb - 31, x + 40, sb - 31, C.k); rect(x + 41, sb - 30, x + 41, sb - 19, C.k);
    R.pset(x + 37, sb - 26, C.k); R.pset(x + 38, sb - 26, C.k); R.pset(x + 41, sb - 24, C.arenaS); rect(x + 36, sb - 22, x + 38, sb - 22, C.arenaD);
  }
  // pueblo de los obreros: hornos de pan con humo, jarras de cerveza, panes en conos
  if (o.pueblo) {
    for (const [x, w] of [[4, 30], [40, 26]]) casaAdobe(R, x, 128, w, 14, {});
    for (const x of [78, 96]) { R.disco(x, 124, 6, C.adobeS); R.disco(x, 124, 5, C.adobe); R.rect(x - 6, 124, x + 6, 128, C.adobe); R.rect(x - 2, 123, x + 2, 127, C.puerta); R.pset(x, 125, Math.sin(t * 9 + x) > 0 ? C.oroL : C.rojo); for (let j = 0; j < 9; j++) R.pset(x + Math.round(Math.sin(t * 2 + j * 0.6) * 2), 116 - j - Math.floor((t * 4) % 3), j % 2 ? C.blanco : C.gris); }
    for (let k = 0; k < 5; k++) { const x = 110 + k * 5; R.poligono([[x - 2, 128], [x + 2, 128], [x + 1, 121], [x - 1, 121]], C.rocaS); R.pset(x, 121, C.rocaD); }
  }
  // suelo de arena del escenario, con bloques y herramientas; arena de delante
  for (let y = 132; y < 146; y++) rect(0, y, 319, y, o.noche ? C.arenaD : y === 132 ? C.k : y < 135 ? C.arenaL : C.arena);
  if (!o.noche) for (let x = 3; x < 320; x += 17) { pset(x, 138 + (x % 3), C.arenaS); pset(x + 1, 138 + (x % 3), C.arenaS); }
  if (o.bloques !== false) for (const [x, w] of [[250, 14], [266, 10], [16, 12]]) { rect(x, 136, x + w, 145, C.caliza); rect(x, 136, x + w, 136, C.calizaL); rect(x + w - 2, 137, x + w, 145, C.calizaS); rect(x - 1, 135, x + w + 1, 135, C.k); rect(x - 1, 136, x - 1, 145, C.k); rect(x + w + 1, 136, x + w + 1, 145, C.k); }
  for (let y = 146; y < 180; y++) rect(0, y, 319, y, o.noche ? C.arenaD : y < 148 ? C.arenaS : (y + Math.floor(Math.sin(y) * 2)) % 6 === 0 ? C.arenaL : C.arena);
  if (!o.noche) { viento(R, t, { y0: 134, y1: 145, fuerza: o.viento ?? 0.8 }); if (o.caravana !== false) caravana(R, t, 128, { v: 9, n: 2, dir: -1, desfase: 140 }); }
}

// ── C · la sala del trono ─────────────────────────────────────────────────────────────────────────────────────────
// o.abanicos (dos abanicos de plumas), o.sol (disco de Atón con rayos que acaban en manos, 0–1), o.escribas (n),
// o.trono (true por defecto), o.borrar (0–1: un cincel borra el cartucho de la pared), o.oscuro
export function trono(R, t, o = {}) {
  const { rect, pset } = R;
  // techo azul con estrellas, friso de flores de loto y pared pintada
  rect(0, 0, 319, 7, C.azul); for (let x = 4; x < 320; x += 9) pset(x + ((x / 9) % 2 ? 3 : 0), 3, C.oro);
  for (let x = 0; x < 320; x++) { const m = x % 10; pset(x, 8, C.k); for (let y = 9; y < 17; y++) pset(x, y, m < 2 ? C.paredS : y < 11 ? C.rojo : m < 6 ? (y < 14 ? C.turq : C.azul) : C.oro); pset(x, 17, C.k); }
  for (let y = 18; y < 132; y++) rect(0, y, 319, y, y > 124 ? C.paredS : C.pared);
  // pinturas: dos registros de figuras de perfil y símbolos
  for (const yr of [44, 78]) {
    rect(0, yr - 16, 319, yr - 16, C.ocreS); rect(0, yr + 1, 319, yr + 1, C.ocreS);
    for (let x = 6; x < 320; x += 22) {
      const k = Math.floor(x / 22) % 4, piel = k % 2 ? C.rocaS : C.ocre;
      if (k === 3) { R.icono(['ankh', 'ojo', 'pluma'][Math.floor(x / 88) % 3], x, yr - 10, C.azul, undefined, 1); continue; }
      R.rect(x + 2, yr - 14, x + 4, yr - 12, C.negro); R.rect(x + 2, yr - 12, x + 4, yr - 10, piel); R.pset(x + 5, yr - 11, piel);
      R.rect(x + 1, yr - 9, x + 5, yr - 6, piel); R.rect(x + 1, yr - 5, x + 5, yr - 3, C.blanco); R.pset(x + 1, yr - 2, piel); R.pset(x + 1, yr - 1, piel); R.pset(x + 5, yr - 2, piel); R.pset(x + 5, yr - 1, piel);
      if (k === 1) { R.rect(x + 6, yr - 9, x + 7, yr - 8, piel); R.rect(x + 8, yr - 12, x + 8, yr - 1, C.oroS); }
    }
  }
  // cartucho real en la pared (se puede borrar con un cincel)
  if (o.cartucho !== false) {
    const cx0 = 150, cy0 = 26; R.rect(cx0, cy0, cx0 + 22, cy0 + 9, C.paredL); R.rect(cx0 - 1, cy0 - 1, cx0 + 23, cy0 - 1, C.k); R.rect(cx0 - 1, cy0 + 10, cx0 + 23, cy0 + 10, C.k); R.rect(cx0 - 1, cy0, cx0 - 1, cy0 + 9, C.k); R.rect(cx0 + 23, cy0, cx0 + 23, cy0 + 9, C.k); R.rect(cx0 + 24, cy0 + 2, cx0 + 24, cy0 + 7, C.k);
    const borrado = Math.round((o.borrar ?? 0) * 22);
    for (let i = 0; i < 3; i++) if (i * 7 + 4 > borrado) R.icono(['ojo', 'ankh', 'pluma'][i], cx0 + 2 + i * 7, cy0 + 1, C.rojo, undefined, 1);
    for (let k = 0; k < borrado; k += 2) { pset(cx0 + 1 + k, cy0 + 2 + ((k * 3) % 6), C.paredS); pset(cx0 + 2 + k, cy0 + 4 + ((k * 5) % 4), C.ocreS); }
  }
  // haces de luz desde ventanas altas
  for (const xv of [60, 250]) for (let y = 18; y < 132; y++) for (let x = xv + Math.round((y - 18) * 0.4); x < xv + 12 + Math.round((y - 18) * 0.4); x++) { const c = R.pget(x, y); if (c === C.pared || c === C.paredS) pset(x, y, C.paredL); }
  // columnas de papiro pintadas
  for (const x of [22, 86, 234, 298]) {
    rect(x - 6, 30, x + 6, 131, C.paredL); rect(x + 2, 30, x + 6, 131, C.paredS); rect(x - 7, 30, x - 7, 131, C.k); rect(x + 7, 30, x + 7, 131, C.k);
    for (const yb of [44, 46, 100, 102]) rect(x - 6, yb, x + 6, yb, yb % 4 ? C.azul : C.rojo);
    R.poligono([[x - 6, 30], [x - 11, 19], [x + 11, 19], [x + 6, 30]], C.turq); R.poligono([[x + 2, 30], [x + 6, 19], [x + 11, 19], [x + 6, 30]], C.turqS);
    for (let i = -9; i <= 9; i += 3) R.linea(x + Math.round(i * 0.55), 29, x + i, 20, C.verdeD);
    rect(x - 12, 18, x + 12, 18, C.k); rect(x - 8, 131, x + 8, 131, C.calizaD);
  }
  // suelo de losas pulidas
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 132) / 6), col = Math.floor((x + (fila % 2) * 10) / 20); pset(x, y, y === 132 ? C.k : (y - 132) % 6 === 0 || (x + (fila % 2) * 10) % 20 === 0 ? C.sueloS : (col + fila) % 2 ? C.suelo : C.sueloL); }
  // estrado y trono
  if (o.trono !== false) {
    rect(128, 124, 216, 131, C.caliza); rect(128, 124, 216, 124, C.calizaL); rect(136, 118, 208, 124, C.calizaL); rect(127, 123, 217, 123, C.k); rect(135, 117, 209, 117, C.k);
    const tx = 176; rect(tx, 92, tx + 4, 117, C.oro); rect(tx + 4, 92, tx + 5, 117, C.oroS); rect(tx - 14, 106, tx + 4, 109, C.oro); rect(tx - 14, 110, tx - 13, 117, C.oroS); pset(tx - 15, 116, C.oroS);
    rect(tx - 1, 91, tx + 6, 91, C.k); R.icono('ankh', tx - 6, 96, C.azul, undefined, 1);
  }
  // abanicos de plumas a los lados del trono
  if (o.abanicos) for (const [x, d] of [[132, -1], [222, 1]]) {
    const a = Math.sin(t * 1.6 + x) * 0.15;
    const fx = Math.round(x + Math.sin(a) * 30 * d), fy = Math.round(118 - Math.cos(a) * 30);
    R.linea(x, 128, fx, fy, C.maderaS);
    for (let k = -4; k <= 4; k++) { const aa = a - Math.PI / 2 + k * 0.18; for (let r = 0; r < 9; r++) pset(Math.round(fx + Math.cos(aa) * r), Math.round(fy + Math.sin(aa) * r), r > 6 ? C.blanco : k % 2 ? C.rojo : C.blanco); }
  }
  // disco de Atón con rayos que acaban en manitas
  if (o.sol) {
    const sx = 176, sy = 58, rr = 11;
    R.disco(sx, sy, rr + 1, C.k); R.disco(sx, sy, rr, C.oro); R.disco(sx - 3, sy - 3, 4, C.oroL); R.disco(sx, sy, rr - 1, C.oro);
    for (let k = 0; k < 9; k++) { const a = Math.PI * (0.15 + k * 0.0875); const L = Math.round((40 + (k % 2) * 8) * o.sol); const ex = Math.round(sx + Math.cos(a) * (rr + L)), ey = Math.round(sy + Math.sin(a) * (rr + L)); R.linea(Math.round(sx + Math.cos(a) * rr), Math.round(sy + Math.sin(a) * rr), ex, ey, C.oro); if (o.sol > 0.8) { pset(ex, ey, C.oroL); pset(ex - 1, ey + 1, C.oroL); pset(ex + 1, ey + 1, C.oroL); } }
  }

  if (o.gato !== false) gato(R, o.gato ?? 304, 145, t, { dir: -1 });
  motas(R, t, 0, 319, 22, 128, 16, C.paredL);
}

// ── D · la tumba ──────────────────────────────────────────────────────────────────────────────────────────────────
// o.modo: 'taller' (embalsamar), 'juicio' (la balanza; o.inclina −1…1), 'valle' (fuera, el Valle de los Reyes),
// 'tesoro' (la tumba de Tutankamón; o.luz 0–1), 'pared' (jeroglíficos que se cubren de arena: o.arena 0–1)
export function antorcha(R, x, y, t) {
  const fl = 0.5 + 0.5 * Math.sin(t * 17 + x) * Math.sin(t * 5 + y), r = 30 + Math.round(fl * 2);
  for (let yy = y - 3 - r; yy <= y - 3 + r; yy++) for (let xx = x - r; xx <= x + r; xx++) { const d = Math.hypot(xx - x, (yy - y + 3) * 1.1); if (d > r) continue; const c = R.pget(xx, yy), cerca = d < r * 0.55; if (c === C.tumba) R.pset(xx, yy, cerca ? C.tumbaL : hex('#5a3a2a')); else if (c === C.ocre) R.pset(xx, yy, cerca ? hex('#ecba6a') : hex('#e2ac5c')); }
  R.rect(x - 1, y, x + 1, y + 8, C.madera); R.rect(x - 2, y - 1, x + 2, y, C.k);
  R.pset(x, y - 2, C.oroL); R.pset(x, y - 3, fl > 0.5 ? C.oroL : C.oro); R.pset(x - 1, y - 2, C.rojo); R.pset(x + 1, y - 2, C.oro); R.pset(x, y - 4 - (fl > 0.6 ? 1 : 0), C.rojo);
}
function paredPintada(R, t, oscuro = true) {
  const { rect, pset } = R;
  for (let y = 0; y < 132; y++) rect(0, y, 319, y, y < 6 ? C.azul : y < 8 ? C.k : C.tumba);
  for (let x = 3; x < 320; x += 11) pset(x + ((x / 11) % 2 ? 4 : 0), 3, C.oro);
  rect(0, 30, 319, 86, C.ocre); rect(0, 30, 319, 31, C.k); rect(0, 86, 319, 87, C.k);
  for (let x = 8; x < 320; x += 26) {
    const k = Math.floor(x / 26) % 3;
    R.rect(x + 3, 44, x + 6, 47, C.negro); R.rect(x + 3, 48, x + 6, 51, C.rocaS); R.pset(x + 7, 49, C.rocaS);
    R.rect(x + 2, 52, x + 7, 62, k === 1 ? C.turq : C.blanco); R.rect(x + 3, 63, x + 4, 72, C.rocaS); R.rect(x + 6, 63, x + 7, 72, C.rocaS);
    if (k === 2) { R.rect(x + 8, 50, x + 9, 51, C.rocaS); R.icono('ankh', x + 10, 46, C.azul, undefined, 1); }
    if (k !== 1) R.icono(['ojo', 'pluma', 'ankh', 'corazon'][Math.floor(x / 26) % 4], x + 14, 46, [C.azul, C.rojoS, C.verdeD][k], undefined, 1);
  }

}
export function tumba(R, t, o = {}) {
  const { rect, pset, poligono, linea, disco } = R;
  const modo = o.modo ?? 'taller';
  if (modo === 'valle') {
    cieloEg(R, t, { hor: 70, nubes: false });
    for (let x = 0; x < 320; x++) { const top = Math.round(20 + Math.abs(x - 160) * 0.35 + 6 * Math.sin(x * 0.07)); for (let y = top; y < 132; y++) pset(x, y, y === top ? C.k : y < top + 3 ? C.rocaL : (x % 17 < 2) ? C.rocaS : (y > 110 ? C.rocaS : C.roca)); }
    for (const [x, y] of [[54, 96], [130, 110], [214, 108], [282, 92]]) { rect(x - 7, y - 16, x + 7, y, C.tumbaS); rect(x - 9, y - 18, x + 9, y - 16, C.calizaS); rect(x - 9, y - 18, x + 9, y - 18, C.calizaL); rect(x - 10, y - 19, x + 10, y - 19, C.k); rect(x - 8, y - 16, x - 8, y, C.calizaS); rect(x + 8, y - 16, x + 8, y, C.calizaD); }
    for (let y = 132; y < 146; y++) rect(0, y, 319, y, y === 132 ? C.k : y < 135 ? C.arenaL : C.arena);
    for (let y = 146; y < 180; y++) rect(0, y, 319, y, y % 7 === 0 ? C.arenaS : C.arena);
    for (const [x, w] of [[30, 6], [250, 9], [300, 5]]) { disco(x, 146, w, C.rocaS); disco(x - 1, 145, w - 1, C.roca); }
    viento(R, t, { y0: 134, y1: 145, fuerza: 1 });
    return;
  }
  paredPintada(R, t, modo !== 'pared');
  // suelo de la tumba
  for (let y = 132; y < 180; y++) rect(0, y, 319, y, y === 132 ? C.k : y < 146 ? (y % 4 === 0 ? C.tumbaS : C.tumbaL) : C.tumbaS);
  if (modo !== 'pared') { antorcha(R, 40, 96, t); antorcha(R, 280, 96, t); }
  if (modo === 'taller') {
    // mesa de embalsamar con la momia
    rect(96, 112, 196, 116, C.madera); rect(96, 112, 196, 112, C.maderaL); rect(100, 116, 103, 131, C.maderaS); rect(189, 116, 192, 131, C.maderaS);
    for (const xp of [100, 189]) { rect(xp - 1, 128, xp + 4, 131, C.oroS); }
    rect(104, 104, 188, 111, C.vendas); disco(104, 107, 4, C.vendas);
    for (let x = 106; x < 188; x += 4) linea(x, 104, x + 3, 111, C.vendasS);
    rect(103, 103, 189, 103, C.k); rect(103, 112, 189, 112, C.k);
    if (o.mascara) { disco(102, 106, 5, C.oro); rect(100, 104, 104, 106, C.azul); pset(104, 105, C.k); }
    // vasos canopos: humano, babuino, chacal, halcón
    for (let k = 0; k < 4; k++) {
      const x = 216 + k * 16; rect(x - 4, 116, x + 4, 131, C.caliza); rect(x + 2, 116, x + 4, 131, C.calizaS); rect(x - 5, 115, x + 5, 115, C.k); rect(x - 5, 116, x - 5, 131, C.k); rect(x + 5, 116, x + 5, 131, C.k);
      const cab = [C.ocre, C.rocaS, C.negro, C.verdeS][k]; disco(x, 111, 4, cab); rect(x - 4, 111, x + 4, 115, cab);
      if (k === 2) { pset(x - 2, 106, C.negro); pset(x + 2, 106, C.negro); pset(x - 2, 105, C.negro); pset(x + 2, 105, C.negro); }
      if (k === 3) { pset(x + 5, 111, C.oro); }
      pset(x + 1, 110, C.k);
    }
    // montón de sal (natrón), gancho y cesta
    poligono([[40, 131], [52, 118], [64, 131]], C.blanco); poligono([[52, 118], [64, 131], [56, 131]], C.vendasS);
    rect(70, 120, 84, 131, C.trigoS); for (let x = 71; x < 84; x += 3) rect(x, 121, x, 130, C.trigo); rect(69, 119, 85, 119, C.k);
    if (o.gancho) { linea(140, 92, 152, 100, C.gris); pset(139, 91, C.gris); pset(139, 92, C.gris); }
  }
  if (modo === 'juicio') {
    const cx = 160, inc = (o.inclina ?? 0) * 0.25 + Math.sin(t * 2) * 0.03;
    rect(cx - 2, 60, cx + 2, 131, C.oro); rect(cx + 1, 60, cx + 2, 131, C.oroS); rect(cx - 8, 128, cx + 8, 131, C.oroS);
    disco(cx, 58, 3, C.oro); R.icono('pluma', cx - 3, 46, C.blanco, undefined, 1);
    const L = 44, ax = Math.round(cx - Math.cos(inc) * L), ay = Math.round(60 - Math.sin(inc) * L), bx = Math.round(cx + Math.cos(inc) * L), by = Math.round(60 + Math.sin(inc) * L);
    linea(ax, ay, bx, by, C.oro); linea(ax, ay + 1, bx, by + 1, C.oroS);
    for (const [px, py, k] of [[ax, ay, 0], [bx, by, 1]]) {
      linea(px, py, px - 10, py + 24, C.oroS); linea(px, py, px + 10, py + 24, C.oroS); rect(px - 13, py + 24, px + 13, py + 26, C.oro); rect(px - 13, py + 26, px + 13, py + 26, C.oroS);
      if (k === 0) { disco(px, py + 19, 4, C.rojo); disco(px - 1, py + 18, 1, C.rojoS); rect(px - 2, py + 14, px + 2, py + 15, C.rojoS); }
      else R.icono('pluma', px - 3, py + 15, C.blanco, C.k, 1);
    }
    // Ammit: cabeza de cocodrilo, cuerpo de león y patas de hipopótamo
    if (o.monstruo !== false) {
      const mx = 252, my = 131, boca = Math.sin(t * 3) > 0 ? 2 : 0;
      rect(mx - 14, my - 14, mx + 6, my - 4, C.trigoS); rect(mx - 14, my - 14, mx + 6, my - 14, C.trigo); rect(mx - 12, my - 4, mx - 8, my, C.rocaD); rect(mx, my - 4, mx + 4, my, C.rocaD);
      rect(mx - 26, my - 22, mx - 12, my - 15 + boca, C.verdeS); rect(mx - 26, my - 22, mx - 12, my - 22, C.verde); rect(mx - 26, my - 15 + boca, mx - 14, my - 13 + boca, C.verdeS);
      for (let i = -24; i < -14; i += 3) pset(mx + i, my - 15 + boca, C.blanco);
      pset(mx - 15, my - 20, C.oro); rect(mx - 27, my - 23, mx - 11, my - 23, C.k);
    }
  }
  if (modo === 'tesoro') {
    const luz = o.luz ?? 1;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (Math.hypot(x - 70, y - 40) > 60 + luz * 160) pset(x, y, C.tumbaS); }
    for (let k = 0; k < 14; k++) { const x = 110 + (k * 37) % 190, y = 120 + (k * 13) % 12; disco(x, y, 3 + (k % 3), C.oro); disco(x - 1, y - 1, 1, C.oroL); }
    for (const x of [96, 276]) { rect(x - 4, 92, x + 4, 131, C.negro); disco(x, 88, 5, C.negro); rect(x - 4, 108, x + 4, 116, C.oro); disco(x, 88, 3, C.oro); pset(x + 2, 88, C.k); }
    const sx = 190, sy = 100; rect(sx - 26, sy, sx + 26, 131, C.oroS); rect(sx - 26, sy, sx + 26, sy + 2, C.oro); rect(sx - 27, sy - 1, sx + 27, sy - 1, C.k);
    disco(sx, sy - 12, 10, C.oro); rect(sx - 10, sy - 12, sx + 10, sy - 2, C.oro); for (let y = sy - 18; y < sy - 2; y += 3) { rect(sx - 10, y, sx - 7, y, C.azul); rect(sx + 7, y, sx + 10, y, C.azul); }
    rect(sx - 5, sy - 15, sx + 5, sy - 8, C.oroL); pset(sx - 3, sy - 13, C.k); pset(sx + 3, sy - 13, C.k); pset(sx - 4, sy - 13, C.k); pset(sx + 4, sy - 13, C.k); rect(sx - 1, sy - 6, sx + 1, sy, C.azul);
    for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1; if (f < 0.2) { const x = 120 + (k * 31) % 150, y = 96 + (k * 17) % 30; pset(x, y, C.oroL); pset(x - 1, y, C.oro); pset(x + 1, y, C.oro); pset(x, y - 1, C.oro); pset(x, y + 1, C.oro); } }
  }
  if (modo === 'pared') {
    const ar = o.arena ?? 0, apaga = o.apaga ?? 0;
    if (apaga > 0) R.rect(0, 32, Math.round(apaga * 320), 85, C.ocreS);
    const top = Math.round(132 - ar * 100);
    for (let x = 0; x < 320; x++) { const yy = top + Math.round(3 * Math.sin(x * 0.08 + t)); for (let y = yy; y < 132; y++) pset(x, y, y === yy ? C.arenaL : C.arena); }
  }
  if (o.bichos !== false) { arana(R, t, 252, 18, 24); motas(R, t, 20, 300, 40, 128, 12, C.oroL); }
}

// ── E · el puerto de Alejandría ───────────────────────────────────────────────────────────────────────────────────
// el faro a la derecha, un templo griego, palmeras; o.barca (el barco real de Cleopatra, x), o.trirreme (x),
// o.bandera ('griega' o 'roma')
export function alejandria(R, t, o = {}) {
  const { rect, pset, poligono, linea, disco } = R;
  cieloEg(R, t, { hor: 92, tarde: o.tarde });
  // el faro de Alejandría: base cuadrada, cuerpo octogonal, torre redonda y fuego
  const fx = 272;
  rect(fx - 18, 46, fx + 18, 92, C.calizaL); rect(fx + 6, 46, fx + 18, 92, C.calizaS); for (let y = 52; y < 90; y += 8) for (let x = fx - 14; x < fx + 16; x += 8) rect(x, y, x + 2, y + 3, C.calizaD);
  rect(fx - 12, 22, fx + 12, 45, C.calizaL); rect(fx + 4, 22, fx + 12, 45, C.calizaS); rect(fx - 7, 8, fx + 7, 21, C.calizaL); rect(fx + 2, 8, fx + 7, 21, C.calizaS);
  rect(fx - 19, 45, fx + 19, 46, C.k); rect(fx - 13, 21, fx + 13, 22, C.k); rect(fx - 8, 7, fx + 8, 7, C.k);
  R.halo(fx, 4, 16, [C.oro, C.oroL], 0.8); for (let k = 0; k < 6; k++) R.linea(fx - 3 + k, 6, fx - 3 + k, 6 - Math.round(3 + 3 * Math.abs(Math.sin(t * 8 + k))), k % 2 ? C.oroL : C.rojo);
  // templo griego y palmeras al fondo
  rect(20, 70, 90, 92, C.calizaL); poligono([[16, 70], [55, 58], [94, 70]], C.calizaL); linea(16, 70, 55, 58, C.k); linea(55, 58, 94, 70, C.k);
  for (let x = 24; x < 90; x += 9) { rect(x, 72, x + 3, 92, C.blanco); rect(x + 3, 72, x + 3, 92, C.calizaS); }
  palmera(R, 110, 92, 0.8, t); palmera(R, 130, 92, 0.6, t); palmera(R, 230, 92, 0.7, t);
  // mar
  for (let y = 92; y < 132; y++) rect(0, y, 319, y, y < 100 ? C.agua3 : y < 114 ? C.agua2 : C.agua1);
  for (let k = 0; k < 20; k++) { const y = 94 + (k * 7) % 36, x = ((k * 53 + t * (6 + (k % 3) * 3)) % 340) - 10; rect(Math.round(x), y, Math.round(x + 3 + (k % 4)), y, C.aguaL); }
  // el barco real de Cleopatra: casco dorado, vela morada, toldo
  if (o.barca != null) {
    const bx = o.barca, by = 118 + Math.round(Math.sin(t * 1.4));
    poligono([[bx - 50, by - 12], [bx - 40, by + 2], [bx + 36, by + 2], [bx + 48, by - 14], [bx + 40, by - 6], [bx - 40, by - 6]], C.oro);
    poligono([[bx - 40, by - 2], [bx + 36, by - 2], [bx + 36, by + 2], [bx - 40, by + 2]], C.oroS); linea(bx - 40, by + 2, bx + 36, by + 2, C.k);
    rect(bx - 2, by - 54, bx, by - 6, C.madera); poligono([[bx + 1, by - 52], [bx + 26, by - 46], [bx + 24, by - 14], [bx + 1, by - 14]], hex('#8050b8')); poligono([[bx + 1, by - 52], [bx + 10, by - 50], [bx + 9, by - 14], [bx + 1, by - 14]], hex('#52287e'));
    rect(bx - 30, by - 20, bx - 6, by - 18, C.rojo); rect(bx - 30, by - 18, bx - 30, by - 7, C.oroS); rect(bx - 6, by - 18, bx - 6, by - 7, C.oroS);
    for (let k = 0; k < 8; k++) linea(bx - 36 + k * 9, by, bx - 42 + k * 9, by + 10, C.maderaL);
  }
  if (o.trirreme != null) {
    const tx = o.trirreme, ty = 116 + Math.round(Math.sin(t * 1.6 + 1));
    poligono([[tx - 40, ty - 10], [tx - 34, ty], [tx + 34, ty], [tx + 42, ty - 6]], C.madera); rect(tx - 34, ty - 4, tx + 34, ty - 3, C.rojo); linea(tx - 34, ty, tx + 34, ty, C.k);
    rect(tx, ty - 36, tx + 1, ty - 4, C.maderaS); poligono([[tx - 14, ty - 34], [tx + 15, ty - 34], [tx + 13, ty - 12], [tx - 12, ty - 12]], C.blanco); poligono([[tx + 2, ty - 34], [tx + 15, ty - 34], [tx + 13, ty - 12], [tx + 2, ty - 12]], C.vendas);
    disco(tx + 36, ty - 3, 2, C.blanco); pset(tx + 36, ty - 3, C.k);
  }
  // muelle de piedra (el escenario) y agua de delante
  for (let y = 132; y < 146; y++) rect(0, y, 319, y, y === 132 ? C.k : y < 135 ? C.calizaL : (y - 135) % 5 === 0 ? C.calizaD : C.caliza);
  for (let x = 0; x < 320; x += 16) rect(x, 136, x, 145, C.calizaD);
  for (let y = 146; y < 180; y++) rect(0, y, 319, y, y < 149 ? C.calizaD : y < 162 ? C.agua1 : C.agua1);
  for (let k = 0; k < 12; k++) { const x = ((k * 71 - t * 8) % 340 + 340) % 340 - 10; rect(Math.round(x), 158 + (k * 5) % 16, Math.round(x + 4), 158 + (k * 5) % 16, C.agua3); }
  // bandera en el muelle
  if (o.bandera) {
    const bx = 214; rect(bx, 92, bx + 1, 131, C.maderaS);
    if (o.bandera === 'roma') { rect(bx - 6, 92, bx + 7, 94, C.oro); R.disco(bx, 89, 3, C.oro); pset(bx - 3, 88, C.oro); pset(bx + 3, 88, C.oro); rect(bx - 5, 96, bx + 6, 108, C.rojo); rect(bx - 5, 108, bx + 6, 109, C.oro); }
    else for (let i = 0; i < 16; i++) { const y = 93 + Math.round(Math.sin(t * 6 - i * 0.5) * 1.5); rect(bx + 2 + i, y, bx + 2 + i, y + 7, i % 4 < 2 ? C.azulL : C.blanco); }
  }
  if (o.aves !== false) for (let k = 0; k < 3; k++) R.gaviota(Math.round(((t * (14 + k * 4) + k * 110) % 380) - 30), Math.round(30 + k * 9 + Math.sin(t * 1.3 + k) * 4), t, k);
}
