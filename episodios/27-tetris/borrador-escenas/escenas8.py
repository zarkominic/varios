E = {}

# Grupo 8 del ep27: ts-cerebro (por qué no se puede soltar), ts-efecto (el efecto Tetris, Harvard 2000) y ts-gibson
# (Oklahoma 2023 y el contador que vuelve a cero). Lo común (cada .html es una página aparte): el reparto, el ruido, los
# búferes, las texturas, los cielos tramados con nubes de tres tonos y las piezas pequeñas (las helpers del grupo 7,
# copiadas tal cual, y las de este grupo: estrellas, ladrillo, papel de rayas, libros, bloques, reloj, nube de idea).
COMUN = r'''
import { ELENCO_TS as TS } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_TS, K = hex('#0c0a12'), BL = hex('#ffffff'), P = (s) => hex(s), Ri = Math.round;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const capa = (() => { const m = {}; return (clave, dibuja) => { if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; } R.copiar(m[clave]); }; })();
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tin = (x, y, c, a) => { x = Ri(x); y = Ri(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, a)); };
const zona = (x0, y0, x1, y1, c, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) tin(x, y, c, a); };
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const suave = (u) => u * u * (3 - 2 * u), sale = (u) => 1 - (1 - u) ** 3;
const osc = (c, a = 0.3) => mez(c, K, a), cla = (c, a = 0.3) => mez(c, BL, a);
// un relleno con grano: el color con motas de luz y sombra
const grano = (x0, y0, x1, y1, c, k = 0, a = 0.07) => { const L = cla(c, 0.12), S = osc(c, 0.14);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const n = h(x, y, k); R.pset(x, y, n < a ? S : n > 1 - a ? L : c); } };
// madera: tablas con vetas, juntas escalonadas y algún nudo; c = [medio, luz, sombra, junta]; o.hz false: tablas verticales
const madera = (x0, y0, x1, y1, c, o = {}) => { const [M, L, S, D] = c.map(P), alto = o.alto ?? 9, hz = o.hz !== false, k0 = o.k ?? 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const a = hz ? y - y0 : x - x0, b = hz ? x : y, tb = Math.floor(a / alto), r = a - tb * alto, off = Math.floor(h(tb, k0, 3) * 200), corte = Math.floor((b + off) / 96);
    if (r === alto - 1 || (b + off) % 96 === 0) { R.pset(x, y, D); continue; }
    const v = Math.sin(b * 0.05 + tb * 2.3 + corte * 1.7 + Math.sin(b * 0.017 + tb + corte) * 2.6 + r * 0.7), n = h(x >> 1, y, tb + k0);
    const nudo = Math.hypot(((b + off) % 96) - 48, r - alto / 2) < 2.2 && h(tb, corte, 8) > 0.6;
    R.pset(x, y, nudo ? D : v > 0.86 ? S : (v < -0.93 || r === 0) ? L : n > 0.95 ? S : n < 0.03 ? L : M);
  } };
// cielo tramado en bandas (c0 arriba, c1 abajo)
const cieloT = (x0, y0, x1, y1, c0, c1) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0);
  for (let x = x0; x <= x1; x++) { const v = u + (h(x, y, 4) - 0.5) * 0.2; R.pset(x, y, mez(c0, c1, Math.max(0, Math.min(1, Math.round(v * 7) / 7)))); } } };
// una nube de tres tonos (luz arriba, medio, sombra abajo) y un grupo que pasa a tres velocidades, recortado a su hueco
const NUBES = [P('#ffffff'), P('#e4ecf6'), P('#b0bed6')];
const nube = (cx, cy, w, hh, cs, k) => { for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) { const d = (i * i) / (w * w) + (j * j) / (hh * hh);
  if (d > 1 - h(i >> 2, j, k) * 0.35) continue; R.pset(Ri(cx + i), cy + j, j >= hh * 0.4 ? cs[2] : (j <= -hh * 0.3 || (i < -w * 0.4 && j < 1)) ? cs[0] : cs[1]); } };
const nubes = (x0, y0, x1, y1, t, cs = NUBES, n = 5, k = 0) => { R.recorte([x0, y0, x1, y1]);
  for (let i = 0; i < n; i++) { const c3 = i % 3, v = [1.4, 3, 5.5][c3], w = [7, 11, 15][c3] + Ri(h(i, k) * 5), hh = Ri(w * 0.36) + 1, ancho = x1 - x0 + 2 * w + 24;
    const cx = x0 - w + ((h(i, k, 2) * ancho + t * v) % ancho), cy = y0 + 3 + Ri(h(i, k, 3) * Math.max(1, (y1 - y0) * 0.5));
    nube(cx, cy, w, hh, cs, i + k); }
  R.recorte(null); };
// pájaros (gaviotas) que cruzan entre x0 y x1 (fuera de la zona de Atom)
const pajaros = (x0, y0, x1, t, n = 3, k = 0) => { for (let i = 0; i < n; i++) { const w = x1 - x0, x = x0 + ((h(i, k) * w + t * (8 + i * 3)) % w), y = y0 + Ri(h(i, k, 5) * 14 + Math.sin(t * 1.3 + i) * 2); R.gaviota(Ri(x), y, t, i + k); } };
// destello en cruz (lo que aparece brilla un momento)
const destello = (x, y, u, c = P('#fff4c0')) => { if (u <= 0 || u >= 1) return; const r = Ri(2 + u * 6), a = 1 - u;
  for (let i = -r; i <= r; i++) { const f = a * (1 - Math.abs(i) / (r + 1)); tin(x + i, y, c, f); tin(x, y + i, c, f); } tin(x, y, BL, a); };
// la consola de bolsillo en la mano de un chibi (11 × 7), centrada en (x, y)
const consolita = (x, y, t, on = true) => { const x0 = Ri(x - 5), y0 = Ri(y - 3);
  R.rect(x0, y0, x0 + 10, y0 + 6, K); R.rect(x0 + 1, y0 + 1, x0 + 9, y0 + 5, P('#c8ccd8')); R.rect(x0 + 1, y0 + 5, x0 + 9, y0 + 5, P('#8c90a4'));
  R.rect(x0 + 3, y0 + 1, x0 + 7, y0 + 4, P('#26302a'));
  if (on) { R.rect(x0 + 4, y0 + 2, x0 + 6, y0 + 3, P('#8ae89a')); R.pset(x0 + 4 + (Math.floor(t * 3) % 3), y0 + 2 + (Math.floor(t * 2) % 2), P('#2a6a3a')); }
  R.pset(x0 + 2, y0 + 3, P('#3a6ad8')); R.pset(x0 + 8, y0 + 2, P('#d83a3a')); R.pset(x0 + 8, y0 + 4, P('#d83a3a')); };
// la caja de la consola (19 × 16, sin letras): azul con franjas, el dibujo de la consola; abre 0–1: las solapas se abren
// y la consola sube encendida. (x, y) = abajo en el centro
const cajaCons = (x, y, abre = 0, t = 0) => { const x0 = Ri(x - 9), y0 = Ri(y - 16);
  if (abre > 0) { consolita(x, y0 + 5 - Ri(sale(abre) * 8), t, true);
    const a = sale(abre); R.poligono([[x0, y0], [x0 + 8, y0], [x0 + 6 - Ri(a * 8), y0 - Ri(a * 5)], [x0 - Ri(a * 4), y0 - Ri(a * 4)]], P('#2a46b0'));
    R.poligono([[x0 + 10, y0], [x0 + 18, y0], [x0 + 22, y0 - Ri(a * 4)], [x0 + 12 + Ri(a * 8), y0 - Ri(a * 5)]], P('#2a46b0')); }
  caja(x0, y0, x0 + 18, y0 + 16, P('#3a5ad8')); R.rect(x0 + 1, y0 + 1, x0 + 17, y0 + 3, P('#f0c040')); R.rect(x0 + 1, y0 + 13, x0 + 17, y0 + 15, P('#e04a7a'));
  R.rect(x0 + 17, y0 + 4, x0 + 17, y0 + 12, P('#2a46b0'));
  R.rect(x0 + 4, y0 + 5, x0 + 14, y0 + 11, K); R.rect(x0 + 5, y0 + 6, x0 + 13, y0 + 10, P('#c8ccd8')); R.rect(x0 + 7, y0 + 6, x0 + 11, y0 + 8, P('#8ae89a'));
  R.pset(x0 + 6, y0 + 9, P('#3a6ad8')); R.pset(x0 + 12, y0 + 9, P('#d83a3a')); R.pset(x0 + 2, y0 + 2, P('#fff8d0')); };
// el sobre (11 × 7, centrado), con su solapa; abierto: la nómina asoma
const sobre = (x, y, abierto = 0) => { const x0 = Ri(x - 5), y0 = Ri(y - 3);
  if (abierto > 0) { const s = Ri(abierto * 5); R.rect(x0 + 2, y0 - s, x0 + 8, y0 + 2, K); R.rect(x0 + 3, y0 + 1 - s, x0 + 7, y0 + 2, P('#f6f2e6')); R.rect(x0 + 4, y0 + 2 - s, x0 + 6, y0 + 2 - s, P('#8a8a96')); }
  R.rect(x0, y0, x0 + 10, y0 + 6, K); R.rect(x0 + 1, y0 + 1, x0 + 9, y0 + 5, P('#e8d8b0'));
  R.linea(x0 + 1, y0 + 1, x0 + 5, y0 + 4, P('#b8a478')); R.linea(x0 + 9, y0 + 1, x0 + 5, y0 + 4, P('#b8a478')); R.pset(x0 + 5, y0 + 4, P('#c83a2a')); };
// una taza (7 × 7, abajo en el centro) que humea
const taza = (x, y, c, t, vapor = true) => { const x0 = Ri(x - 3), y0 = Ri(y - 7);
  R.rect(x0, y0, x0 + 6, y0 + 7, K); R.rect(x0 + 1, y0 + 1, x0 + 5, y0 + 6, c); R.rect(x0 + 1, y0 + 1, x0 + 5, y0 + 1, P('#5a3018')); R.pset(x0 + 1, y0 + 2, cla(c, 0.5));
  R.rect(x0 + 7, y0 + 2, x0 + 8, y0 + 2, K); R.rect(x0 + 8, y0 + 3, x0 + 8, y0 + 5, K); R.rect(x0 + 7, y0 + 6, x0 + 7, y0 + 6, K);
  if (vapor) for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1); tin(x + Math.sin(t * 2.4 + k * 2) * 2 * u, y0 - 2 - u * 10, BL, 0.6 * (1 - u)); } };
'''

COMUN += r'''
// ── las helpers de este grupo ──
// estrellas que titilan dentro de [x0,y0,x1,y1]
const estrellas = (x0, y0, x1, y1, t, n = 20, k = 0) => { for (let i = 0; i < n; i++) { const x = x0 + Ri(h(i, k, 1) * (x1 - x0)), y = y0 + Ri(h(i, k, 2) * (y1 - y0)), b = Math.sin(t * (1.5 + h(i, k, 3) * 3) + i) ;
  R.pset(x, y, b > 0.6 ? BL : b > -0.3 ? P('#c8d0f0') : P('#6a74a8')); if (b > 0.92 && h(i, k, 4) > 0.6) { tin(x + 1, y, BL, 0.5); tin(x - 1, y, BL, 0.5); tin(x, y - 1, BL, 0.5); tin(x, y + 1, BL, 0.5); } } };
// ladrillo: hiladas de 4 px, juntas escalonadas, ladrillos de tono distinto; c = [medio, luz, sombra, junta]
const ladrillo = (x0, y0, x1, y1, c, k = 0) => { const [M, L, S, J] = c.map(P);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fil = Math.floor((y - y0) / 4), r = (y - y0) % 4;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const off = fil % 2 ? 4 : 0, col = Math.floor((x - x0 + off) / 8), q = (x - x0 + off) % 8;
      if (r === 3 || q === 7) { R.pset(x, y, J); continue; } const v = h(col, fil, k), n = h(x, y, k + 9);
      R.pset(x, y, v < 0.18 ? S : v > 0.85 ? L : n < 0.06 ? S : r === 0 && n > 0.7 ? L : M); } } };
// papel pintado de rayas verticales con grano (c1 la banda ancha, c2 la estrecha)
const rayas = (x0, y0, x1, y1, c1, c2, ancho = 10, k = 0) => { const A = P(c1), B = P(c2), A2 = osc(A, 0.1), B2 = osc(B, 0.1);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const q = (x - x0) % ancho, n = h(x, y, k);
    R.pset(x, y, q < 3 ? (n < 0.12 ? B2 : B) : (n < 0.08 ? A2 : n > 0.97 ? cla(A, 0.1) : A)); } };
// un libro de canto (x0..x0+w-1, de y0 a y1) con sus bandas, el lomo con luz y el tejuelo
const libro = (x0, y0, x1, y1, c, k = 0) => { const M = P(c); caja(x0, y0, x1, y1, M, osc(M, 0.55)); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, cla(M, 0.25));
  if (y1 - y0 > 8) { R.rect(x0 + 1, y0 + 2, x1 - 1, y0 + 2, P('#e8c860')); R.rect(x0 + 1, y1 - 3, x1 - 1, y1 - 3, P('#e8c860')); }
  if (x1 - x0 >= 3 && y1 - y0 > 12) R.rect(x0 + 1, y0 + Ri((y1 - y0) * 0.45), x1 - 1, y0 + Ri((y1 - y0) * 0.45) + 2, h(x0, k) > 0.5 ? P('#f2ead6') : osc(M, 0.3)); };
// un bloque monocromo (s × s) con su luz y su sombra
const bloque = (x, y, s, c) => { const M = typeof c === 'number' ? c : P(c); caja(Ri(x), Ri(y), Ri(x) + s - 1, Ri(y) + s - 1, M, osc(M, 0.55)); R.rect(Ri(x) + 1, Ri(y) + 1, Ri(x) + s - 2, Ri(y) + 1, cla(M, 0.4)); R.rect(Ri(x) + 1, Ri(y) + 1, Ri(x) + 1, Ri(y) + s - 2, cla(M, 0.25)); };
// reloj de pared redondo (centro, radio); ang = vueltas del minutero
const reloj = (x, y, r, vueltas, c = '#f4ecd8') => { R.disco(x, y, r + 1, K); R.disco(x, y, r, P('#8a5a2a')); R.disco(x, y, r - 1, P(c));
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R.pset(Ri(x + Math.sin(a) * (r - 2)), Ri(y - Math.cos(a) * (r - 2)), P('#4a4a54')); }
  const am = vueltas * Math.PI * 2, ah = am / 12; R.linea(x, y, Ri(x + Math.sin(ah) * (r - 4)), Ri(y - Math.cos(ah) * (r - 4)), K); R.linea(x, y, Ri(x + Math.sin(am) * (r - 2)), Ri(y - Math.cos(am) * (r - 2)), P('#c83a2a')); R.pset(x, y, K); };
// nube de pensamiento (elipse con bultos y las dos burbujas hacia (bx, by)); a = 0–1 aparece
const nubeIdea = (x, y, w, hh, bx, by, a = 1) => { if (a <= 0) return; const s = suave(Math.min(1, a)), W = Math.max(2, Ri(w * s)), H = Math.max(2, Ri(hh * s));
  for (const [dx, dy, r] of [[-0.55, 0.1, 0.5], [0.55, 0.1, 0.5], [0, -0.35, 0.55], [-0.3, 0.4, 0.45], [0.3, 0.4, 0.45]]) R.disco(Ri(x + dx * W), Ri(y + dy * H), Ri(r * H) + 1, K);
  for (const [dx, dy, r] of [[-0.55, 0.1, 0.5], [0.55, 0.1, 0.5], [0, -0.35, 0.55], [-0.3, 0.4, 0.45], [0.3, 0.4, 0.45]]) R.disco(Ri(x + dx * W), Ri(y + dy * H), Ri(r * H), P('#f6f4fc'));
  R.rect(x - W + 3, y, x + W - 3, y + Ri(H * 0.3), P('#f6f4fc'));
  if (s > 0.5) { R.disco(Ri(lerp(x, bx, 0.6)), Ri(lerp(y + H * 0.7, by, 0.6)), 3, K); R.disco(Ri(lerp(x, bx, 0.6)), Ri(lerp(y + H * 0.7, by, 0.6)), 2, P('#f6f4fc')); R.disco(bx, by, 2, K); R.disco(bx, by, 1, P('#f6f4fc')); } };
// el foco de luz (cono translúcido desde (x, y0) hasta un ancho w en y1)
const cono = (x, y0, y1, w0, w1, c, a) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), ww = lerp(w0, w1, u);
  for (let xx = Ri(x - ww); xx <= Ri(x + ww); xx++) tin(xx, y, c, a * (0.6 + 0.4 * (1 - Math.abs(xx - x) / (ww + 1)))); } };
// el mando de juego genérico (14 × 7, sin la forma de ningún mando real: asas redondas, cruceta y dos botones en diagonal)
const mandoJ = (x, y, t = 0) => { const x0 = Ri(x - 7), y0 = Ri(y - 3); R.disco(x0 + 2, y0 + 4, 3, K); R.disco(x0 + 12, y0 + 4, 3, K); R.rect(x0 + 2, y0, x0 + 12, y0 + 6, K);
  R.disco(x0 + 2, y0 + 4, 2, P('#4a4a56')); R.disco(x0 + 12, y0 + 4, 2, P('#4a4a56')); R.rect(x0 + 2, y0 + 1, x0 + 12, y0 + 5, P('#4a4a56')); R.rect(x0 + 3, y0 + 1, x0 + 11, y0 + 1, P('#6a6a78'));
  R.rect(x0 + 2, y0 + 3, x0 + 4, y0 + 3, K); R.rect(x0 + 3, y0 + 2, x0 + 3, y0 + 4, K); R.pset(x0 + 11, y0 + 2, P('#d84a3a')); R.pset(x0 + 12, y0 + 4, P('#e8b830')); };
'''

# ──────────────────────────────────────────────────────────────────
E['ts-cerebro'] = ('El cerebro', '''// TS-CEREBRO (frase 22), hoy (2026). Cuatro planos:
// 1. el dormitorio de noche: el niño, sentado en la cama, juega con la consola de bolsillo (el reloj corre, los faros
//    de un coche barren el techo); en «so hard» la deja en la mesilla, se da la vuelta… y en «down?» la vuelve a
//    coger con una sonrisa. Corta en «Part».
// 2. el museo: un mueble enorme con forma de cabeza de perfil y baldas de libros dentro; en «brain» se encienden los
//    focos (el vigilante se despierta) y el visitante la señala; en «unfinished» los huecos laten y sale un «?» en
//    cada uno. Corta en «Every».
// 3. la biblioteca dentro de la cabeza: las filas con hueco parpadean (en «pending», el relojito en cada hueco);
//    la bibliotecaria sube en la escalera con el último libro, lo mete en «disappears», la fila se ilumina y en
//    «reward» se deshace en chispas y las de encima bajan una; ella salta. Corta en «So».
// 4. el puzle en la mesita (cenital): la mano lleva la última pieza y en «finish» queda justo encima del hueco… y el
//    gato le da con la pata y la pieza sale volando.''', COMUN + r'''
const c = (f) => en('cerebro', f);
const P2 = c(.2551), P3 = c(.5035), P4 = c(.8334);
const MARAVILLA = c(.0895), SO = c(.1693), DURO = c(.1962), ABAJO = c(.2264);
const CEREBRO = c(.3306), SIN = c(.4330);
const FILA = c(.5175), HUECO = c(.5477), PEND = c(.6350), CADA = c(.6889), DESAP = c(.7353), PREMIO = c(.8075);
const SIEMPRE = c(.8765), JUSTO = c(.9283), TERMINA = c(.9681);

// ── 1 · el dormitorio de noche
const VENT = [16, 26, 76, 90];
const fondoDorm = () => {
  for (let y = 0; y <= 111; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 1); R.pset(x, y, n < 0.05 ? P('#222a50') : n > 0.97 ? P('#3a4676') : P('#2c3662')); }
  for (let j = 0; j < 9; j++) for (let i = 0; i < 27; i++) { const x = 6 + i * 12 + (j % 2) * 6, y = 6 + j * 12; if (x > 262 && y < 52) continue;
    R.pset(x, y, P('#6a7ab0')); for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.pset(x + a, y + b, P('#46548c')); }
  R.rect(0, 110, 319, 112, P('#d8d0bc')); R.rect(0, 112, 319, 112, P('#8a826e'));
  for (let y = 113; y <= 139; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 26 === 0 ? P('#2a3460') : x % 26 === 1 ? P('#5a6aa0') : h(x, y, 2) < 0.06 ? P('#3a4878') : P('#44548a'));
  R.rect(0, 137, 319, 139, P('#2a3054'));
  madera(0, 140, 319, 179, ['#8a5a34', '#a87444', '#6a4228', '#4a2c18'], { alto: 6, k: 3 });
  // la alfombra
  for (let y = 150; y <= 174; y++) for (let x = 84; x <= 252; x++) { const d = ((x - 168) / 84) ** 2 + ((y - 162) / 12) ** 2; if (d > 1) continue;
    R.pset(x, y, d > 0.86 ? P('#7a2a2a') : d > 0.7 ? P('#e8b860') : d > 0.5 ? P('#c84a3a') : (Math.floor((x + y) / 3) % 4 === 0 ? P('#e8b860') : P('#b83a32'))); }
  // la ventana: marco, alféizar y cortinas (el hueco lo pinta cada fotograma)
  caja(VENT[0] - 4, VENT[1] - 4, VENT[2] + 4, VENT[3] + 4, P('#e8e0cc')); R.rect(VENT[0] - 3, VENT[3] + 3, VENT[2] + 3, VENT[3] + 3, P('#b8b09c'));
  caja(VENT[0] - 8, VENT[3] + 4, VENT[2] + 8, VENT[3] + 8, P('#f0e8d4')); R.rect(VENT[0] - 7, VENT[3] + 7, VENT[2] + 7, VENT[3] + 7, P('#b8b09c'));
  R.rect(0, 14, 96, 15, P('#c8a040')); R.disco(1, 14, 2, P('#e8c860')); R.disco(95, 14, 2, P('#e8c860'));
  for (const [x0, x1] of [[2, 14], [78, 92]]) for (let y = 16; y <= 104; y++) for (let x = x0; x <= x1; x++) { const q = (x - x0 + Ri(Math.sin(y * 0.15) * 1)) % 4;
    R.pset(x, y, q === 0 ? P('#8a3a2a') : q === 1 ? P('#e88a6a') : h(x, y, 5) < 0.05 ? P('#a84a38') : P('#c8604a')); }
  for (const x0 of [2, 78]) { R.rect(x0, 100, x0 + 14, 104, P('#a84a38')); for (let x = x0; x <= x0 + 14; x += 3) R.pset(x, 104, P('#f0c060')); }
  // la balda con juguetes y libros
  R.rect(102, 46, 160, 48, P('#a87444')); R.rect(102, 48, 160, 48, P('#6a4228')); R.rect(106, 49, 108, 54, P('#6a4228')); R.rect(154, 49, 156, 54, P('#6a4228'));
  [['#c83a3a', 8], ['#3a7ac8', 10], ['#e8b830', 7], ['#3a9a5a', 9]].forEach(([cc, hh], i) => libro(104 + i * 4, 46 - hh, 107 + i * 4, 45, cc, i));
  { const x = 124; caja(x, 36, x + 8, 45, P('#a8b0c0')); R.rect(x + 2, 38, x + 3, 39, P('#f0d040')); R.rect(x + 5, 38, x + 6, 39, P('#f0d040')); R.rect(x + 3, 42, x + 5, 42, K); R.rect(x + 4, 33, x + 4, 35, K); R.pset(x + 4, 32, P('#e83a3a')); }
  { const x = 142; R.poligono([[x, 45], [x + 2, 30], [x + 4, 45]], P('#f2eee2')); R.poligono([[x + 2, 26], [x, 32], [x + 4, 32]], P('#d83a3a')); R.rect(x - 2, 41, x - 1, 45, P('#d83a3a')); R.rect(x + 5, 41, x + 6, 45, P('#d83a3a')); R.pset(x + 2, 36, P('#3a8ae8')); }
  // el póster del dinosaurio (sin letras)
  caja(166, 20, 190, 54, P('#f0d070')); R.rect(167, 21, 189, 24, P('#e8a040'));
  R.poligono([[170, 48], [172, 38], [178, 34], [182, 26], [186, 26], [186, 30], [183, 31], [182, 38], [186, 44], [184, 48], [180, 48], [179, 44], [175, 44], [174, 48]], P('#3a8a4a'));
  R.pset(184, 27, K); R.disco(168, 21, 1, P('#d83a3a')); R.disco(188, 21, 1, P('#d83a3a'));
  // la puerta (de y 58 al suelo) con la luz del pasillo por debajo
  caja(262, 56, 304, 140, P('#e8e0cc')); madera(266, 60, 300, 139, ['#b8885a', '#d0a070', '#8a6038', '#6a4428'], { hz: false, alto: 7, k: 8 });
  R.rect(270, 66, 296, 94, P('#a07448')); R.rect(271, 67, 295, 93, P('#c0905e')); R.rect(270, 102, 296, 132, P('#a07448')); R.rect(271, 103, 295, 131, P('#c0905e'));
  R.disco(270, 100, 2, P('#e8c860')); R.pset(269, 99, BL); R.rect(266, 140, 300, 141, P('#f0d890'));
  // la cama: cabecero, colchón, patas y piecero
  R.rect(88, 94, 98, 148, K); R.rect(89, 95, 97, 148, P('#a06a3a')); R.disco(93, 94, 5, K); R.disco(93, 94, 4, P('#b87a44')); R.rect(90, 100, 90, 146, P('#c8905a'));
  R.rect(98, 124, 214, 142, K); R.rect(99, 125, 213, 141, P('#f2f0ea')); R.rect(99, 138, 213, 141, P('#d0ccc4'));
  R.rect(98, 142, 214, 148, P('#6a4228')); R.rect(100, 148, 103, 152, P('#4a2c18')); R.rect(208, 148, 211, 152, P('#4a2c18'));
  caja(100, 114, 126, 126, P('#f6f6fa')); R.rect(102, 123, 124, 125, P('#d4d4e0')); R.linea(104, 116, 122, 116, P('#ffffff'));
  // la mesilla
  caja(218, 124, 246, 150, P('#b8885a')); R.rect(219, 125, 245, 126, P('#d0a070')); caja(221, 130, 243, 139, P('#a07448')); R.disco(232, 134, 1, P('#e8c860'));
  R.rect(220, 150, 222, 154, P('#6a4428')); R.rect(242, 150, 244, 154, P('#6a4428'));
  // la cama del perro y los juguetes del suelo
  for (let y = 154; y <= 172; y++) for (let x = 14; x <= 72; x++) { const d = ((x - 43) / 29) ** 2 + ((y - 163) / 9) ** 2; if (d <= 1) R.pset(x, y, d > 0.75 ? P('#6a3a2a') : d > 0.55 ? P('#8a5a3a') : P('#c8a070')); }
  bloque(82, 166, 6, '#d83a3a'); bloque(88, 166, 6, '#3a7ac8'); bloque(85, 160, 6, '#e8b830');
  R.disco(262, 166, 5, K); R.disco(262, 166, 4, P('#e84a4a')); R.rect(258, 165, 266, 166, BL); R.pset(260, 163, BL);
};
const p1 = (t) => {
  capa('dorm', fondoDorm);
  // la noche por la ventana: cielo tramado, estrellas, luna, nubes a tres velocidades y los tejados con ventanas
  R.recorte(VENT); cieloT(VENT[0], VENT[1], VENT[2], VENT[3], P('#0a1030'), P('#2a3466')); estrellas(VENT[0], VENT[1], VENT[2], 66, t, 18, 3);
  R.disco(62, 36, 6, P('#f6f0d0')); R.disco(65, 34, 5, P('#1c2450')); R.pset(58, 38, P('#d8d0a8'));
  nubes(VENT[0], VENT[1] + 6, VENT[2], 60, t, [P('#6a74a0'), P('#4a5482'), P('#323a66')], 4, 2);
  R.poligono([[16, 76], [26, 70], [36, 76], [36, 72], [48, 64], [60, 72], [60, 70], [76, 66], [76, 90], [16, 90]], P('#141832'));
  for (let i = 0; i < 9; i++) { const x = 20 + i * 6 + (i % 2), y = 78 + (i % 3) * 4, on = Math.sin(t * 0.7 + i * 2.3) > -0.3; if (on) { R.pset(x, y, P('#f0c860')); R.pset(x + 1, y, P('#f0c860')); } }
  R.recorte(null);
  R.rect(46, VENT[1], 46, VENT[3], P('#e8e0cc')); R.rect(VENT[0], 58, VENT[2], 58, P('#e8e0cc'));
  // los faros de un coche barren la pared cada 4,5 s
  { const u = (t % 4.5) / 1.6; if (u < 1) { const x0 = lerp(-60, 300, u); for (let y = 0; y <= 108; y++) for (let x = Ri(x0 + y * 0.4); x < x0 + 34 + y * 0.4; x++) { if (x > 258 && y < 54) continue; if (x >= VENT[0] - 4 && x <= VENT[2] + 4 && y >= VENT[1] - 4 && y <= VENT[3] + 4) continue; tin(x, y, P('#f8e8b0'), 0.1); } } }
  // el reloj corre deprisa mientras juega; cuando suelta la consola, despacio
  reloj(206, 38, 9, t < DURO ? 0.1 + t * 1.3 : 0.1 + DURO * 1.3 + (t - DURO) * 0.05);
  // la lámpara de lava en la mesilla
  { const x = 238; R.poligono([[x - 4, 123], [x + 4, 123], [x + 3, 117], [x - 3, 117]], P('#7a7a88')); caja(x - 3, 103, x + 3, 117, P('#5a2a6a'));
    for (let k = 0; k < 3; k++) { const yy = Ri(110 + Math.sin(t * 0.8 + k * 2.1) * 5); R.disco(x, yy, 1 + (k % 2), P('#f08a3a')); } R.pset(x - 2, 105, P('#c87ad8')); R.rect(x - 2, 101, x + 2, 102, P('#7a7a88')); tin(x, 110, P('#f08a3a'), 0.2); }
  // el perro duerme y respira; la cola se mueve de vez en cuando
  { const r = Math.sin(t * 2) > 0 ? 1 : 0; for (let y = 152; y <= 166; y++) for (let x = 26; x <= 60; x++) { const d = ((x - 43) / 15) ** 2 + ((y - 160 + r * 0.5) / (6 + r)) ** 2; if (d <= 1) R.pset(x, y, d > 0.8 ? P('#6a4a2a') : y < 157 ? P('#d8a868') : P('#c08a50')); }
    R.disco(28, 158, 5, P('#c08a50')); R.disco(28, 158, 4, P('#d8a868')); R.rect(25, 157, 27, 157, K); R.rect(23, 159, 24, 160, P('#3a2418')); R.poligono([[30, 153], [34, 152], [33, 160]], P('#8a5a30'));
    const cola = Math.sin(t * 9) * (Math.sin(t * 0.9) > 0.5 ? 3 : 0.5); R.linea(59, 162, 64, Ri(158 + cola), P('#8a5a30')); }
  // el niño en la cama: juega; en «so hard» deja la consola en la mesilla y se da la vuelta; en «down?» la vuelve a coger
  const x = 194, suelo = 131, MESA = [224, 121];
  const deja = tramo(t, SO, DURO), coge = tramo(t, ABAJO - 0.05, ABAJO + 0.3);
  let obj, dir = 1, cara = { sonrisa: true };
  if (t < SO) obj = [x + 15, 126 + Ri(Math.sin(t * 6) * 0.6)];
  else if (t < DURO) obj = [Ri(lerp(x + 15, MESA[0], suave(deja))), Ri(lerp(126, MESA[1], suave(deja)))];
  else if (t < ABAJO - 0.05) { obj = undefined; dir = -1; cara = { triste: true }; }
  else if (coge < 0.5) obj = [Ri(lerp(x + 15, MESA[0], coge * 2)), Ri(lerp(126, MESA[1], coge * 2))];
  else obj = [Ri(lerp(MESA[0], x + 15, (coge - 0.5) * 2)), Ri(lerp(MESA[1], 126, (coge - 0.5) * 2))];
  if (t > MARAVILLA && t < MARAVILLA + 0.7) cara = { sorpresa: true };   // un bostezo
  const enMano = t < DURO || coge >= 0.5;
  const nj = R.actor(TS.ninoJuega, x, suelo, t, { dir, sostiene: obj, ...cara, sinObjeto: true });
  const cp = enMano ? [nj.mano[0] + 1, nj.mano[1] - 2] : MESA;
  consolita(cp[0], cp[1], t, true);
  // la manta por delante (cubre las piernas)
  for (let y = 128; y <= 142; y++) for (let x2 = 99; x2 <= 213; x2++) { const q = (Math.floor((x2 - 99) / 9) + Math.floor((y - 128) / 7)) % 2; R.pset(x2, y, y === 128 ? K : y < 131 ? P('#f2f0ea') : q ? P('#3a6ab8') : P('#5a8ad0')); }
  for (let x2 = 99; x2 <= 213; x2 += 9) for (let y = 131; y <= 142; y++) R.pset(x2, y, P('#2a4a8a'));
  R.rect(99, 142, 213, 143, P('#2a4a8a')); R.rect(212, 112, 218, 148, K); R.rect(213, 113, 217, 148, P('#a06a3a')); R.disco(215, 112, 3, K); R.disco(215, 112, 2, P('#b87a44'));
  // la habitación a oscuras: solo la luz verde de la pantalla (en la cara, la manta y la pared) y la lámpara de lava
  for (let y = 0; y <= 179; y++) for (let xx = 0; xx < 320; xx++) { if (xx >= VENT[0] && xx <= VENT[2] && y >= VENT[1] && y <= VENT[3]) continue;
    const d1 = Math.hypot(xx - cp[0], (y - cp[1] + 4) * 1.2), d2 = Math.hypot(xx - 238, y - 110), l = Math.max(0, 1 - d1 / 34) * 1.0 + Math.max(0, 1 - d2 / 22) * 0.6;
    if (l < 0.95) tin(xx, y, P('#06081a'), 0.7 * (1 - Math.min(1, l))); }
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d < 14) tin(cp[0] + i, cp[1] - 5 + j, P('#8ae8b0'), 0.3 * (1 - d / 14)); }
  // lo que piensa: el relojito cuando la deja (a dormir) y el «!» cuando la vuelve a coger
  if (t > DURO + 0.05 && t < ABAJO - 0.05) R.bocadillo(nj.cabeza[0], nj.cabeza[1] - 4, { icono: 'reloj' });
  if (t > ABAJO + 0.05 && t < ABAJO + 0.5) R.bocadillo(nj.cabeza[0], nj.cabeza[1] - 4 - Ri(sale(tramo(t, ABAJO + 0.05, ABAJO + 0.2)) * 3), { icono: '!' });
};

// ── 2 · el museo: la cabeza-estantería
const CAB = [[100, 96], [98, 70], [106, 48], [120, 32], [140, 22], [166, 19], [190, 24], [208, 36], [218, 52], [222, 66], [221, 74], [232, 90], [233, 94], [224, 97], [226, 104], [222, 107], [225, 113], [220, 117], [217, 126], [204, 132], [190, 132], [188, 146], [128, 146], [126, 124], [110, 114]];
const HC = [160, 62], HR = [46, 38], BALDAS = [44, 62, 80, 98];
const dentro = (x, y) => ((x - HC[0]) / HR[0]) ** 2 + ((y - HC[1]) / HR[1]) ** 2 <= 1 && y <= 98;
const HUECOS = [];   // [x0, y0, x1, y1] de cada hueco (los rellena fondoMuseo)
const fondoMuseo = () => {
  for (let y = 0; y <= 129; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 11), arriba = y < 32;
    R.pset(x, y, y < 9 ? P('#3a3430') : arriba ? (n < 0.05 ? P('#9a8c7a') : P('#a89a88')) : x % 54 === 0 && !(x > 262 && y < 50) ? P('#a0927e') : n < 0.04 ? P('#aa9c88') : n > 0.98 ? P('#c8bcaa') : P('#bcae9a')); }
  R.rect(0, 30, 319, 32, P('#7a6a58')); R.rect(0, 30, 319, 30, P('#d8ccb8'));
  R.rect(0, 9, 262, 10, P('#d8d8e0')); R.rect(0, 11, 262, 11, P('#6a6a74'));
  R.rect(0, 108, 319, 129, P('#6a5848')); R.rect(0, 108, 319, 109, P('#a08a70'));
  for (let x = 6; x < 320; x += 40) { R.rect(x, 112, x + 32, 126, P('#5a4a3c')); R.rect(x + 1, 113, x + 31, 125, P('#74604e')); R.rect(x + 1, 113, x + 31, 113, P('#8a745e')); }
  // el parqué en espiga
  for (let y = 130; y <= 179; y++) for (let x = 0; x < 320; x++) { const col = Math.floor(x / 8), xx = x % 8, a = col % 2 ? (y + xx) : (y - xx + 8), r = ((a % 6) + 6) % 6, tb = Math.floor(a / 6);
    R.pset(x, y, r === 0 || xx === 0 ? P('#6a4628') : h(col, tb, 4) < 0.3 ? P('#a8743e') : h(x, y, 6) < 0.05 ? P('#8a5a30') : P('#b8844a')); }
  for (let x = 0; x < 320; x++) tin(x, 130, K, 0.4);
  // los cuadros: un paisaje a la izquierda y uno de círculos a la derecha
  caja(14, 42, 66, 82, P('#c8a040')); R.rect(17, 45, 63, 79, P('#8ac0e8')); R.poligono([[17, 72], [30, 58], [42, 70], [52, 60], [63, 72], [63, 79], [17, 79]], P('#4a8a4a')); R.disco(54, 52, 4, P('#f8e070')); R.rect(17, 74, 63, 79, P('#3a6aa8'));
  caja(228, 48, 262, 86, P('#2a2a30')); R.rect(231, 51, 259, 83, P('#f2ead6')); R.disco(240, 62, 6, P('#d84a3a')); R.disco(250, 72, 7, P('#3a6ab8')); R.disco(242, 76, 3, P('#e8b830'));
  for (const [x0, x1] of [[30, 50], [236, 254]]) { R.rect(x0, 92 - (x0 > 100 ? -2 : 0), x1, 94 - (x0 > 100 ? -2 : 0), P('#d8ccb0')); R.rect(x0 + 2, 93, x1 - 2, 93, P('#8a7a68')); }
  // la salida (una flecha y un monigote, sin letras)
  caja(244, 14, 262, 22, P('#2a9a5a')); R.linea(248, 18, 258, 18, BL); R.linea(255, 15, 258, 18, BL); R.linea(255, 21, 258, 18, BL);
  // la planta, el banco y el atril con su placa
  R.poligono([[290, 150], [306, 150], [303, 164], [293, 164]], P('#c86a3a')); R.rect(290, 150, 306, 151, P('#e88a5a'));
  for (let k = 0; k < 9; k++) { const a = -1.2 + k * 0.3; R.linea(298, 150, Ri(298 + Math.sin(a) * 14), Ri(150 - Math.cos(a) * 22), k % 2 ? P('#3a8a3a') : P('#5aa84a')); }
  caja(16, 140, 70, 145, P('#8a5a30')); R.rect(18, 145, 21, 156, P('#4a2c18')); R.rect(65, 145, 68, 156, P('#4a2c18'));
  // la peana de mármol
  caja(108, 146, 208, 160, P('#e8e4dc')); R.rect(109, 147, 207, 148, BL); for (let i = 0; i < 6; i++) R.linea(112 + i * 16, 150, 120 + i * 16, 158, P('#c8c0b4'));
  // la cabeza: el mueble de nogal con su veta y su contorno
  const enCab = (x, y) => { let d = false; for (let i = 0, j = CAB.length - 1; i < CAB.length; j = i++) { const [xi, yi] = CAB[i], [xj, yj] = CAB[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) d = !d; } return d; };
  for (let y = 16; y <= 148; y++) for (let x = 94; x <= 236; x++) { if (!enCab(x + 0.5, y + 0.5)) continue;
    const borde = !enCab(x + 1.5, y + 0.5) || !enCab(x - 0.5, y + 0.5) || !enCab(x + 0.5, y + 1.5) || !enCab(x + 0.5, y - 0.5);
    const v = Math.sin(y * 0.22 + Math.sin(x * 0.05) * 3), luzL = !enCab(x - 2.5, y + 0.5) || !enCab(x + 0.5, y - 2.5);
    R.pset(x, y, borde ? K : luzL ? P('#a8784a') : v > 0.85 ? P('#5a3418') : v < -0.9 ? P('#9a6a3e') : h(x, y, 7) < 0.04 ? P('#6a3e20') : P('#7a4a28')); }
  // el hueco de las baldas (el fondo de tablas oscuras) y su canto claro
  for (let y = 22; y <= 99; y++) for (let x = 112; x <= 210; x++) if (dentro(x, y)) {
    const borde = !dentro(x - 1, y) || !dentro(x + 1, y) || !dentro(x, y - 1); R.pset(x, y, borde ? P('#c8945a') : x % 9 === 0 ? P('#2a180c') : P('#3a2416')); }
  for (let x = 112; x <= 210; x++) if (dentro(x, 99)) R.pset(x, 99, P('#c8945a'));
  // las baldas y los libros (con un hueco en las tres de abajo)
  const COL = ['#c83a3a', '#3a6ab8', '#e8b830', '#3a9a5a', '#8a4ab0', '#e87a3a', '#2a8a9a', '#f2ead6'];
  const hueco = [-1, 150, 176, 140];
  BALDAS.forEach((yb, r) => { const yt = r === 0 ? 26 : BALDAS[r - 1] + 2;
    for (let x = 112; x <= 210; x++) if (dentro(x, yb) || dentro(x, yb - 1)) { R.pset(x, yb, P('#c8945a')); if (dentro(x, yb + 1)) R.pset(x, yb + 1, P('#5a3418')); }
    let x = 112; while (x < 210) { const w = 3 + Math.floor(h(x, r, 3) * 3), hh = yb - yt - 1 - Math.floor(h(x, r, 4) * 4);
      if (hueco[r] >= 0 && x >= hueco[r] && x < hueco[r] + 6) { HUECOS.push([x, yb - 13, x + 5, yb - 1]); x += 6; continue; }
      const y0 = yb - hh; if (dentro(x, y0) && dentro(x + w - 1, y0) && dentro(x, yb - 1) && dentro(x + w - 1, yb - 1)) libro(x, y0, x + w - 1, yb - 1, COL[Math.floor(h(x, r, 5) * 8)], x);
      x += w; } });
  // la oreja, el ojo tallado, la ceja y la boca
  for (let a = -1.6; a <= 1.6; a += 0.05) { R.pset(Ri(140 + Math.cos(a) * 6), Ri(112 + Math.sin(a) * 9), P('#4a2810')); R.pset(Ri(141 + Math.cos(a) * 3), Ri(112 + Math.sin(a) * 5), P('#9a6a3e')); }
  R.linea(208, 70, 216, 69, P('#4a2810')); R.linea(206, 64, 216, 62, P('#9a6a3e')); R.pset(213, 71, K); R.pset(212, 71, K); R.linea(218, 110, 223, 110, P('#4a2810'));
};
const p2 = (t) => {
  capa('museo', fondoMuseo);
  const luz = tramo(t, CEREBRO - 0.05, CEREBRO + 0.15);
  // los focos del raíl: apagados hasta «brain»; luego, conos y motas
  for (const fx of [136, 196]) { R.rect(fx - 3, 11, fx + 3, 16, P('#2a2a30')); R.rect(fx - 2, 16, fx + 2, 18, luz > 0 ? P('#fff6c8') : P('#5a5a64'));
    if (luz > 0) { cono(fx, 19, 145, 3, 34, P('#fff2c0'), 0.16 * luz); for (let k = 0; k < 5; k++) { const u = (t * 0.12 + k / 5) % 1; tin(Ri(fx - 14 + h(k, fx) * 28 + Math.sin(t + k) * 3), Ri(30 + u * 100), BL, 0.6 * luz); } } }
  // los huecos laten en dorado desde «unfinished» y sale un «?» encima de cada uno
  HUECOS.forEach(([x0, y0, x1, y1], i) => { const u = tramo(t, SIN + i * 0.25, SIN + i * 0.25 + 0.3); if (u <= 0) return;
    const a = 0.35 + 0.35 * Math.sin((t - SIN) * 8); zona(x0, y0, x1, y1, P('#ffd860'), a * u); R.rect(x0, y1, x1, y1, P('#ffe890'));
    R.bocadillo(Ri((x0 + x1) / 2), y0 - 2 - Ri((1 - sale(u)) * 4), { icono: '?' }); });
  // el vigilante dormido en su silla se despierta con los focos
  { const sx = 22; R.rect(sx + 1, 150, sx + 14, 152, P('#3a3a44')); R.rect(sx + 2, 152, sx + 3, 162, P('#2a2a30')); R.rect(sx + 12, 152, sx + 13, 162, P('#2a2a30')); R.rect(sx + 13, 138, sx + 15, 152, P('#3a3a44'));
    R.actor(TS.publico, sx, 152, t, { dir: 1, sorpresa: t > CEREBRO && t < CEREBRO + 0.9, quieto: t < CEREBRO, pal: { C: '#2a3a5a', c: '#1c2a44', H: '#8a8a94', h: '#a8a8b0' } }); }
  // la cuerda de terciopelo y sus postes
  for (const px of [84, 232]) { R.rect(px - 1, 136, px + 1, 152, P('#c8a040')); R.rect(px - 3, 152, px + 3, 154, P('#8a6a2a')); R.disco(px, 135, 2, P('#e8c860')); }
  for (let x = 86; x <= 230; x++) { const u = (x - 86) / 144, y = Ri(139 + Math.sin(u * Math.PI) * 6); R.pset(x, y, P('#a8202a')); R.pset(x, y + 1, P('#6a1018')); }
  // el visitante entra, se para y en «brain» señala la cabeza
  const e1 = tramo(t, P2 + 0.1, CEREBRO - 0.4), xv = Ri(lerp(-16, 70, sale(e1)));
  R.actor(TS.publico, xv, 170, t, { dir: 1, anda: e1 > 0 && e1 < 1, dedo: t > CEREBRO && t < SIN + 0.4, habla: t > CEREBRO && t < SIN && Math.sin(t * 8) > 0, sorpresa: t > SIN + 0.4 });
  // la visitante con su hijo: mira, se lleva la mano a la boca en «unfinished»; el niño tira de su mano
  R.actor(TS.publica, 246, 170, t, { dir: -1, sorpresa: t > SIN, sostiene: t < SIN ? [244, 158] : undefined });
  R.actor(TS.ninoJuega, 232, 172, t, { dir: 1, salto: t > SIN + 0.3 ? Ri(Math.abs(Math.sin((t - SIN) * 7)) * 3) : 0, brazos: t > SIN + 0.3, sinObjeto: true, pal: { C: '#d84a6a', c: '#a83a52' } });
  if (luz < 1) zona(0, 0, 319, 179, P('#0c0a18'), 0.38 * (1 - luz));
};

// ── 3 · la biblioteca dentro de la cabeza
const BB = [44, 60, 76, 92, 108, 124];   // el borde de abajo de cada fila de libros
const SECC = [18, 90, 162, 234, 302];
const HB = [[0, 60], [1, 236], [2, 128], [3, 270], [5, 92], [4, 196]];   // [fila, x] de cada hueco; el último se completa
const COLB = ['#c83a3a', '#3a6ab8', '#e8b830', '#3a9a5a', '#8a4ab0', '#e87a3a', '#2a8a9a', '#d8c8a8', '#a83a5a'];
const fondoBiblio = () => {
  // el techo: los pliegues rosas del cerebro (suaves arriba a la derecha)
  for (let y = 0; y <= 27; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.11 + Math.sin(y * 0.3 + x * 0.02) * 2.4 + y * 0.25), calma = x > 262 ? 0.5 : 1;
    R.pset(x, y, v > 0.82 && calma > 0.6 ? P('#8a3a52') : v > 0.55 ? P('#b86078') : v < -0.85 && calma > 0.6 ? P('#f0b0c0') : P('#d88aa0')); }
  R.rect(0, 26, 319, 29, P('#5a2a3a')); R.rect(0, 26, 319, 26, P('#a85a72'));
  // la pared-estantería: madera oscura, montantes, baldas
  madera(0, 30, 319, 133, ['#5a3420', '#7a4a2c', '#40220f', '#2a1608'], { hz: false, alto: 8, k: 21 });
  for (const yb of BB) { R.rect(10, yb, 310, yb + 2, P('#a8703e')); R.rect(10, yb, 310, yb, P('#d0965a')); R.rect(10, yb + 3, 310, yb + 3, P('#2a1608')); }
  for (const sx of SECC) { R.rect(sx - 3, 30, sx + 1, 128, P('#8a5a30')); R.rect(sx - 3, 30, sx - 3, 128, P('#b07a44')); R.rect(sx + 1, 30, sx + 1, 128, P('#3a200c')); }
  R.rect(0, 30, 319, 31, P('#3a200c')); R.rect(0, 126, 319, 133, P('#6a4024')); R.rect(0, 126, 319, 126, P('#a8703e'));
  // el raíl de la escalera
  R.rect(10, 33, 310, 34, P('#c8a040')); R.rect(10, 35, 310, 35, P('#6a5020'));
  // la alfombra granate con su greca
  for (let y = 134; y <= 179; y++) for (let x = 0; x < 320; x++) { const g = (y === 140 || y === 174) ? 1 : (y > 140 && y < 174 && ((x + y) % 12 === 0 || (x - y + 400) % 12 === 0)) ? 2 : 0;
    R.pset(x, y, y === 134 ? K : g === 1 ? P('#e8b860') : g === 2 ? P('#8a2a32') : h(x, y, 9) < 0.06 ? P('#6a1a22') : P('#7a222a')); }
  // la mesa de lectura con su lámpara verde (a la izquierda, por delante)
};
const librosFila = (r, dy, sinHueco, brilla) => { const yb = BB[r] + dy, yt = yb - 14;
  for (let s = 0; s < 4; s++) { let x = SECC[s] + 3; const fin = SECC[s + 1] - 4;
    while (x < fin) { const w = 3 + Math.floor(h(x, r, 3) * 3), hh = 9 + Math.floor(h(x, r, 4) * 5);
      const hu = HB.find(([rr, hx]) => rr === r && x >= hx - 1 && x < hx + 6); if (hu && !(sinHueco && r === 4)) { x = hu[1] + 6; continue; }
      if (x + w - 1 >= fin) { if (fin - x >= 2) libro(x, yb - hh, fin - 1, yb - 1, COLB[Math.floor(h(x, r, 5) * 9)], x); break; }
      libro(x, yb - hh, x + w - 1, yb - 1, COLB[Math.floor(h(x, r, 5) * 9)], x); x += w; } }
  if (brilla > 0) zona(SECC[0], yt, SECC[4], yb - 1, P('#ffe070'), brilla); };
const p3 = (t) => {
  capa('biblio', fondoBiblio);
  // las neuronas: chispas que corren por los pliegues del techo
  for (let k = 0; k < 4; k++) { const u = (t * 0.35 + k * 0.27) % 1, x = Ri(u * 260), y = Ri(12 + Math.sin(x * 0.11 + k) * 8); tin(x, y, P('#fff8e0'), 0.9); tin(x - 1, y, P('#fff0c0'), 0.5); tin(x - 2, y, P('#ffe8b0'), 0.25); }
  // la fila de abajo-centro se completa en «disappears», brilla y en «reward» se deshace; las de encima bajan
  const lleno = t > DESAP, brillo = lleno && t < PREMIO ? 0.25 + 0.25 * Math.sin((t - DESAP) * 12) : 0, ida = tramo(t, PREMIO - 0.05, PREMIO + 0.2), baja = sale(tramo(t, PREMIO + 0.2, PREMIO + 0.42));
  for (let r = 0; r < 6; r++) { if (r === 4 && ida >= 1) continue; const dy = r < 4 ? Ri(baja * 16) : 0; if (r === 0 && baja > 0) { R.recorte([0, 36, 319, 133]); }
    librosFila(r, dy, r === 4 && lleno, r === 4 ? brillo : 0); R.recorte(null); }
  if (ida > 0 && ida < 1) zona(SECC[0], 95, SECC[4], 107, P('#fff4c0'), 0.8 * (1 - ida));
  if (ida > 0) for (let k = 0; k < 26; k++) { const u = tramo(t, PREMIO - 0.05 + h(k, 2) * 0.1, PREMIO + 0.3 + h(k, 3) * 0.1); if (u <= 0 || u >= 1) continue;
    const x = 24 + h(k, 4) * 272, y = 100 - sale(u) * (20 + h(k, 5) * 40) + u * u * 30; destello(Ri(x), Ri(y), u, h(k, 6) > 0.5 ? P('#ffe070') : P('#fff8e0')); }
  // los huecos pendientes laten desde «row»; en «pending» sale el relojito en cada uno
  HB.forEach(([r, hx], i) => { if (r === 4 && lleno) return; const yb = BB[r] + (r < 4 ? Ri(baja * 16) : 0); if (t < FILA) return; if (r === 0 && baja > 0) return;
    const a = 0.25 + 0.3 * Math.max(0, Math.sin((t - FILA) * 6 + i)); zona(hx, yb - 13, hx + 5, yb - 1, P('#ffd860'), a);
    if (t > PEND + i * 0.12 && t < CADA + 0.3) R.icono('reloj', hx - 1, yb - 23, P('#2a1608'), P('#ffe890')); });
  // la escalera rueda por el raíl con la bibliotecaria encima: sube el último libro y lo mete en el hueco en «disappears»
  const rueda = tramo(t, CADA - 0.9, DESAP - 0.35), lx = Ri(lerp(150, 180, suave(rueda)));
  for (const xx of [lx, lx + 12]) R.linea(xx, 35, xx + 6, 134, P('#6a4024'));
  for (const xx of [lx + 1, lx + 13]) R.linea(xx, 35, xx + 6, 134, P('#b07a44'));
  for (let y = 44; y <= 130; y += 9) { const dx = (y - 35) / 99 * 6; R.rect(Ri(lx + dx), y, Ri(lx + 12 + dx), y + 1, P('#c8945a')); }
  R.disco(lx + 6, 134, 2, K); R.disco(lx + 18, 134, 2, K);
  const sube = tramo(t, P3 + 0.2, FILA + 0.8), suelo = Ri(lerp(161, 116, suave(sube)));
  const mete = tramo(t, DESAP - 0.35, DESAP), objL = t < DESAP ? [Ri(lerp(lx + 22, 199, mete)), Ri(lerp(110, 101, mete))] : undefined;
  const bi = R.actor(TS.cientifica, lx + 6 + Ri((suelo - 116) / 99 * 6), suelo, t, { dir: 1, anda: sube > 0 && sube < 1, sostiene: t < DESAP ? objL : undefined,
    salto: t > PREMIO ? Ri(Math.abs(Math.sin((t - PREMIO) * 8)) * 3) : 0, sonrisa: t > DESAP, brazos: t > PREMIO });
  if (t < DESAP) { const [mx, my] = bi.mano; libro(mx - 2, my - 9, mx + 3, my + 2, '#d83a3a', 7); }
  // el bibliotecario empuja el carrito de libros por delante y se para a mirar
  const ec = tramo(t, P3, CADA), xc = Ri(lerp(330, 236, sale(ec)));
  R.actor(TS.operario, xc + 30, 172, t, { dir: -1, anda: ec > 0 && ec < 1, sorpresa: t > DESAP && t < PREMIO, sonrisa: t > PREMIO, sostiene: t < CADA ? [xc + 27, 160] : undefined });
  caja(xc, 150, xc + 26, 166, P('#8a5a30')); R.rect(xc + 1, 151, xc + 25, 152, P('#b07a44')); R.rect(xc + 1, 158, xc + 25, 158, P('#5a3418'));
  for (let i = 0; i < 6; i++) libro(xc + 2 + i * 4, 140 + (i % 2) * 2, xc + 5 + i * 4, 150, COLB[(i * 3) % 9], i);
  R.disco(xc + 4, 168, 2, K); R.disco(xc + 22, 168, 2, K);
  // el lector a la izquierda: lee, levanta la vista con los huecos y aplaude al final
  R.actor(TS.cientifico, 34, 168, t, { dir: 1, sostiene: t < PREMIO ? [50, 156] : undefined, sorpresa: t > FILA && t < FILA + 0.8, sonrisa: t > PREMIO, brazos: t > PREMIO + 0.2, sinObjeto: true });
  if (t < PREMIO) { caja(47, 151, 56, 158, P('#3a6ab8')); R.rect(51, 152, 51, 157, P('#f2ead6')); }
};

// ── 4 · el puzle en la mesita (cenital)
const PZX = 50, PZY = 26, LADO = 16, NC = 11, NF = 8, HCOL = 8, HFIL = 4;
const fondoPuzle = () => {
  madera(0, 0, 267, 179, ['#9a6a40', '#b4844e', '#7a4e2c', '#5a3418'], { hz: false, alto: 12, k: 31 });
  for (let y = 0; y <= 179; y++) { R.pset(268, y, K); R.pset(267, y, P('#5a3418')); R.pset(266, y, P('#c8945a')); }
  for (let y = 0; y <= 179; y++) for (let x = 269; x < 320; x++) { const n = h(x >> 1, y >> 1, 12); R.pset(x, y, x < 274 ? osc(P('#2a4a3a'), 0.4) : n < 0.1 ? P('#244234') : P('#2a4a3a')); }
  // la imagen del puzle: cielo, montañas con nieve, el lago, los abetos y la cabaña
  const X1 = PZX + NC * LADO - 1, Y1 = PZY + NF * LADO - 1;
  R.rect(PZX - 2, PZY - 2, X1 + 2, Y1 + 2, K);
  cieloT(PZX, PZY, X1, PZY + 50, P('#6aa8e8'), P('#c8e0f4'));
  R.poligono([[PZX, PZY + 70], [PZX + 30, PZY + 36], [PZX + 52, PZY + 56], [PZX + 88, PZY + 22], [PZX + 120, PZY + 52], [PZX + 146, PZY + 34], [X1, PZY + 58], [X1, PZY + 80], [PZX, PZY + 80]], P('#6a7a9a'));
  R.poligono([[PZX + 80, PZY + 30], [PZX + 88, PZY + 22], [PZX + 96, PZY + 30], [PZX + 90, PZY + 33]], BL); R.poligono([[PZX + 140, PZY + 39], [PZX + 146, PZY + 34], [PZX + 152, PZY + 40]], BL);
  R.rect(PZX, PZY + 72, X1, PZY + 92, P('#4a8a4a')); R.rect(PZX, PZY + 92, X1, Y1, P('#3a78b8'));
  for (let i = 0; i < 40; i++) { const x = PZX + Ri(h(i, 1) * 170), y = PZY + 96 + Ri(h(i, 2) * 28); R.rect(x, y, x + 3, y, P('#8ac0e8')); }
  for (let i = 0; i < 14; i++) { const x = PZX + 6 + i * 12 + Ri(h(i, 3) * 5), y = PZY + 74 + Ri(h(i, 4) * 10); R.poligono([[x, y - 12], [x - 4, y], [x + 4, y]], P('#2a5a32')); R.rect(x, y, x, y + 2, P('#5a3418')); }
  R.rect(PZX + 60, PZY + 80, PZX + 72, PZY + 88, P('#a85a32')); R.poligono([[PZX + 58, PZY + 80], [PZX + 66, PZY + 74], [PZX + 74, PZY + 80]], P('#7a2a1a')); R.rect(PZX + 64, PZY + 84, PZX + 66, PZY + 88, P('#f0c860'));
  R.disco(PZX + 150, PZY + 12, 6, P('#fff4b0'));
  // las juntas de las piezas, con sus lengüetas
  for (let j = 0; j <= NF; j++) for (let x = PZX; x <= X1; x++) { const y = PZY + j * LADO; if (j > 0 && j < NF) tin(x, y, K, 0.35); }
  for (let i = 0; i <= NC; i++) for (let y = PZY; y <= Y1; y++) { const x = PZX + i * LADO; if (i > 0 && i < NC) tin(x, y, K, 0.35); }
  for (let j = 1; j < NF; j++) for (let i = 0; i < NC; i++) { const s = h(i, j, 7) > 0.5 ? 1 : -1; for (let a = 0; a < 6.3; a += 0.4) tin(PZX + i * LADO + 8 + Ri(Math.cos(a) * 2), PZY + j * LADO + s * 2 + Ri(Math.sin(a) * 2), K, 0.3); }
  // el hueco: la mesa se ve por él
  const hx = PZX + HCOL * LADO, hy = PZY + HFIL * LADO; madera(hx + 1, hy + 1, hx + LADO - 1, hy + LADO - 1, ['#9a6a40', '#b4844e', '#7a4e2c', '#5a3418'], { hz: false, alto: 12, k: 31 });
  R.rect(hx, hy, hx + LADO, hy, K); R.rect(hx, hy, hx, hy + LADO, K); R.rect(hx + 1, hy + 1, hx + LADO - 1, hy + 2, osc(P('#9a6a40'), 0.35));
  // la tapa de la caja con la misma imagen en pequeño, las gafas, el mando de la tele y el plato de galletas
  caja(6, 118, 44, 170, P('#e8e0cc')); R.rect(9, 121, 41, 140, P('#8ac0e8')); R.poligono([[9, 136], [20, 126], [30, 134], [41, 128], [41, 140], [9, 140]], P('#6a7a9a')); R.rect(9, 141, 41, 167, P('#3a78b8')); R.rect(9, 140, 41, 142, P('#4a8a4a'));
  for (const gx of [16, 30]) { R.anillo(gx, 12 + 18, 5, K); R.anillo(gx, 30, 4, P('#a8c8e8')); } R.linea(21, 30, 25, 30, K); R.linea(11, 28, 4, 22, K); R.linea(35, 28, 42, 22, K);
  caja(10, 62, 20, 100, P('#3a3a44')); for (let k = 0; k < 4; k++) R.disco(15, 70 + k * 7, 1, k === 0 ? P('#d84a3a') : P('#8a8a96'));
  R.disco(244, 156, 14, K); R.disco(244, 156, 13, P('#f2f0ea')); R.disco(244, 156, 10, P('#d8d4cc'));
  for (const [gx, gy] of [[238, 152], [249, 154], [242, 162]]) { R.disco(gx, gy, 4, P('#7a4a20')); R.disco(gx, gy, 3, P('#c88a4a')); R.pset(gx - 1, gy, P('#5a3418')); R.pset(gx + 1, gy + 1, P('#5a3418')); }
};
const pieza = (cx, cy, giro = 0) => { const s = LADO / 2, ca = Math.cos(giro), sa = Math.sin(giro), pt = (x, y) => [Ri(cx + x * ca - y * sa), Ri(cy + x * sa + y * ca)];
  R.poligono([pt(-s - 1, -s - 1), pt(s + 1, -s - 1), pt(s + 1, s + 1), pt(-s - 1, s + 1)], K); R.poligono([pt(-s, -s), pt(s, -s), pt(s, s), pt(-s, s)], P('#4a8a4a'));
  R.poligono([pt(-s, -s), pt(s, -s), pt(s, -2), pt(-s, -1)], P('#6a7a9a')); R.disco(...pt(0, -s - 2), 3, K); R.disco(...pt(0, -s - 2), 2, P('#6a7a9a'));
  const [a, b] = pt(-3, 3), [c2, d] = pt(3, 0); R.poligono([[a, b - 6], [a - 3, b], [a + 3, b]], P('#2a5a32')); R.poligono([[c2, d - 6], [c2 - 3, d], [c2 + 3, d]], P('#2a5a32')); };
const p4 = (t) => {
  capa('puzle', fondoPuzle);
  // la taza que humea
  { R.disco(236, 34, 11, K); R.disco(236, 34, 10, P('#d84a3a')); R.disco(236, 34, 7, P('#5a3018')); R.pset(233, 31, P('#8a5a30')); R.rect(246, 31, 251, 37, K); R.rect(247, 32, 250, 36, P('#d84a3a'));
    for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; tin(Ri(236 + Math.sin(t * 2 + k * 2) * 3 * u), Ri(34 - u * 22), BL, 0.5 * (1 - u)); } }
  // el gato en la alfombra: duerme hecho una bola, mueve la cola, abre un ojo con la mano y en «finish» da el zarpazo
  const gx = 294, gy = 112, zarpa = tramo(t, TERMINA + 0.1, TERMINA + 0.3), vuelve = tramo(t, TERMINA + 0.5, TERMINA + 1.0);
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j * 1.1); if (d > 14) continue; R.pset(gx + i, gy + j, d > 13 ? K : (Math.floor((Math.atan2(j, i) + 3.2) * 3) % 2 ? P('#e8963a') : P('#c8762a'))); }
  R.disco(gx - 6, gy - 4, 7, K); R.disco(gx - 6, gy - 4, 6, P('#f0a848')); R.poligono([[gx - 12, gy - 8], [gx - 12, gy - 14], [gx - 7, gy - 10]], P('#e8963a')); R.poligono([[gx - 4, gy - 10], [gx - 1, gy - 15], [gx, gy - 8]], P('#e8963a'));
  const ojo = t > JUSTO; R.rect(gx - 9, gy - 4, gx - 8, gy - 4, ojo ? P('#8ad84a') : K); if (ojo) R.pset(gx - 8, gy - 4, K); R.rect(gx - 4, gy - 4, gx - 3, gy - 4, K); R.pset(gx - 6, gy - 1, P('#e87a8a'));
  { const sw = Math.sin(t * 2.2) * 6; for (let k = 0; k < 12; k++) { const u = k / 11; R.disco(Ri(gx + 12 + u * 6), Ri(gy + 8 + u * 12 + Math.sin(u * 3) * sw * u), 2, P('#c8762a')); } }
  // la mano trae la última pieza desde abajo: en «finish» queda justo encima del hueco… y el gato le da
  const hx = PZX + HCOL * LADO + LADO / 2, hy = PZY + HFIL * LADO + LADO / 2;
  const llega = tramo(t, P4 + 0.3, TERMINA), pz = [Ri(lerp(160, hx, sale(llega))), Ri(lerp(200, hy - 5, sale(llega)))];
  let piezaXY = pz, giro = (1 - llega) * 0.6;
  if (zarpa > 0) { const u = tramo(t, TERMINA + 0.25, TERMINA + 1.2); piezaXY = [Ri(lerp(hx, 120, sale(u))), Ri(lerp(hy - 5, -30, sale(u)) - Math.sin(u * Math.PI) * 10)]; giro = u * 9; }
  // la zarpa
  if (zarpa > 0) { const u = zarpa * (1 - vuelve), px = Ri(lerp(gx - 14, hx + 10, u)), py = Ri(lerp(gy - 2, hy - 2, u));
    for (let k = 0; k <= 10; k++) { const q = k / 10; R.disco(Ri(lerp(gx - 12, px, q)), Ri(lerp(gy, py, q)), 3, K); } for (let k = 0; k <= 10; k++) { const q = k / 10; R.disco(Ri(lerp(gx - 12, px, q)), Ri(lerp(gy, py, q)), 2, P('#e8963a')); }
    R.disco(px, py, 4, K); R.disco(px, py, 3, P('#f0a848')); for (const [a, b] of [[-3, -2], [-1, -4], [2, -4]]) R.pset(px + a, py + b, P('#f6c8c8')); }
  if (piezaXY[1] > -20) pieza(piezaXY[0], piezaXY[1], giro);
  const mw = zarpa > 0 ? [Ri(lerp(hx - 14, hx - 24, vuelve)), Ri(lerp(hy - 4, hy + 8, vuelve))] : [pz[0] - 14, pz[1] + 1];
  T.brazo(R, mw[0] - 40, mw[1] + 110, mw[0], mw[1], '#3a6aa8', 1, { codo: [mw[0] - 30, mw[1] + 50] });
  if (zarpa > 0.5) { R.icono('!', hx + 2, hy - 30, P('#d83a2a'), K, 2); destello(hx + 10, hy - 6, tramo(t, TERMINA + 0.25, TERMINA + 0.7)); }
  // el hueco brilla un poco mientras la pieza se acerca
  if (llega > 0.6 && zarpa <= 0) { const xx = PZX + HCOL * LADO, yy = PZY + HFIL * LADO; zona(xx + 1, yy + 1, xx + LADO - 1, yy + LADO - 1, P('#ffe890'), 0.25 + 0.15 * Math.sin(t * 10)); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  efectos: [[0.6, 'bip'], [DURO - 0.05, 'golpecito'], [ABAJO + 0.1, 'whoosh'], [CEREBRO, 'interruptor'], [SIN + 0.05, 'bip'],
    [FILA, 'tic'], [DESAP - 0.02, 'golpecito'], [PREMIO, 'brillo'], [PREMIO + 0.4, 'boing'], [TERMINA + 0.12, 'miau'], [TERMINA + 0.3, 'whoosh']],
  año: 2026,
});
''')

# ──────────────────────────────────────────────────────────────────
E['ts-efecto'] = ('El efecto Tetris', '''// TS-EFECTO (frase 23), Harvard, 2000. Cuatro planos:
// 1. el edificio de ladrillo del campus al anochecer: la investigadora abre la puerta y saluda; llegan dos voluntarios
//    con la almohada y el saco; en «Tetris Effect» se encienden las ventanas una tras otra. Corta en «researchers».
// 2. el laboratorio del sueño: tres voluntarios juegan en sus taburetes; la investigadora cruza y los señala en
//    «volunteers»; en «several days» el calendario de mesa pasa hojas, la ventana pasa del día a la noche y el
//    reloj corre; uno se estira. Corta en «and many».
// 3. la habitación de noche (gag 7): el voluntario duerme; en «pieces falling» caen los bloques sobre la almohada;
//    la mano de la investigadora los dibuja en su carpeta, uno por uno. Corta en «It even».
// 4. la sala de día del hospital: el paciente dormita en el sillón y en «happened» le sale la nube con bloques que
//    caen; entra la investigadora, señala el ordenador en «didn't remember» y él se encoge con «?».''', COMUN + r'''
const e = (f) => en('efecto', f);
const P2 = e(.2450), P3 = e(.4824), P4 = e(.7455);
const NOMBRE = e(.0698), EFECTO = e(.1040), A2000 = e(.1875);
const VOLUNT = e(.3307), JUEGAN = e(.3662), DIAS = e(.4090);
const VIERON = e(.5253), PIEZAS = e(.5424), CAEN = e(.5657), CIERRAN = e(.6220), NOCHE = e(.6966);
const PASO = e(.7675), AMNESIA = e(.8446), NO = e(.9034), RECUERDA = e(.9217), TODO = e(.9780);

// ── 1 · el edificio del campus al anochecer
const VENTANAS = []; for (const y of [50, 90]) for (let i = 0; i < 6; i++) { const x = 50 + i * 34 + (i >= 3 ? 12 : 0); if (x > 236) continue; VENTANAS.push([x, y]); }
const fondoCampus = () => {
  cieloT(0, 0, 319, 96, P('#2a2a6a'), P('#f0a070'));
  // los árboles lejanos y las casas del fondo
  for (let x = 0; x < 320; x++) { const hh = 84 + Ri(Math.sin(x * 0.13) * 3 + Math.sin(x * 0.41) * 2 + h(x, 1) * 2); R.rect(x, hh, x, 100, P('#5a3a5a')); }
  // el edificio de ladrillo
  R.rect(36, 24, 262, 30, P('#3a3a48')); R.rect(36, 24, 262, 24, P('#6a6a7a'));
  ladrillo(40, 31, 258, 150, ['#a84a32', '#c8644a', '#7a3222', '#d8c0b0'], 3);
  R.rect(38, 30, 260, 35, P('#f2ead6')); R.rect(38, 35, 260, 35, P('#a8a090')); R.rect(38, 72, 260, 74, P('#e8e0cc')); R.rect(38, 74, 260, 74, P('#a8a090'));
  // el pórtico: columnas blancas, frontón y la puerta doble
  R.poligono([[118, 80], [149, 64], [180, 80]], P('#f2ead6')); R.poligono([[124, 78], [149, 68], [174, 78]], P('#d8d0bc')); R.rect(116, 80, 182, 84, P('#f2ead6')); R.rect(116, 84, 182, 84, P('#a8a090'));
  for (const cx of [122, 134, 164, 176]) { R.rect(cx - 2, 85, cx + 2, 144, P('#f2ead6')); R.rect(cx + 1, 85, cx + 2, 144, P('#c8c0b0')); R.rect(cx - 3, 85, cx + 3, 86, P('#e8e0cc')); R.rect(cx - 3, 142, cx + 3, 144, P('#e8e0cc')); }
  caja(138, 104, 160, 144, P('#2a5a3a')); R.rect(149, 105, 149, 143, P('#1a3a24')); R.poligono([[138, 104], [149, 96], [160, 104]], P('#f0d890'));
  R.disco(146, 124, 1, P('#e8c860')); R.disco(152, 124, 1, P('#e8c860'));
  for (let k = 0; k < 4; k++) R.rect(112 - k * 4, 144 + k * 2, 186 + k * 4, 145 + k * 2, k % 2 ? P('#b8b0a0') : P('#d8d0c0'));
  // el césped, el camino y el banco
  for (let y = 152; y <= 179; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 3); R.pset(x, y, n < 0.08 ? P('#3a6a2a') : n > 0.94 ? P('#7ab04a') : (x + y * 3) % 7 === 0 ? P('#4a7a32') : P('#5a8a3a')); }
  for (let y = 152; y <= 179; y++) { const a = 120 - (y - 152) * 1.2, b = 178 + (y - 152) * 1.2; for (let x = Ri(a); x <= Ri(b); x++) R.pset(x, y, (y - 152) % 6 === 0 || (x - Ri(a)) % 14 === 0 ? P('#a89a86') : h(x, y, 2) < 0.1 ? P('#c8bca8') : P('#d8ccb8')); }
  for (let k = 0; k < 18; k++) { const x = Ri(h(k, 7) * 310), y = 156 + Ri(h(k, 8) * 20); if (x > 100 && x < 200) continue; R.pset(x, y, P('#e8963a')); R.pset(x + 1, y, P('#c85a2a')); }
  // el árbol de otoño de la izquierda y el de la derecha (copas naranjas de tres tonos)
  for (const [tx, ty, r] of [[16, 70, 30], [292, 92, 24]]) { R.rect(tx - 3, ty + 10, tx + 3, 154, P('#4a2c18')); R.rect(tx - 3, ty + 10, tx - 2, 154, P('#6a4228'));
    for (let j = -r; j <= r; j++) for (let i = -r - 6; i <= r + 6; i++) { const d = (i / (r + 6)) ** 2 + (j / r) ** 2; if (d > 1 - h(i >> 2, j >> 2, tx) * 0.2) continue; const n = h(i, j, tx);
      R.pset(tx + i, ty + j, j < -r * 0.3 && n > 0.4 ? P('#f8b040') : j > r * 0.4 ? P('#a83a1a') : n < 0.3 ? P('#c85a2a') : P('#e8803a')); } }
  // las farolas y el aparcabicis con su bici
  for (const fx of [96, 202]) { R.rect(fx, 120, fx + 1, 156, P('#2a2a30')); R.rect(fx - 2, 116, fx + 3, 120, P('#2a2a30')); R.rect(fx - 1, 118, fx + 2, 119, P('#5a5a64')); }
  R.rect(212, 150, 248, 151, P('#8a8a96')); for (let x = 214; x <= 246; x += 8) R.rect(x, 144, x, 150, P('#8a8a96'));
  R.anillo(222, 152, 5, K); R.anillo(240, 152, 5, K); R.linea(222, 152, 230, 146, P('#3a7ac8')); R.linea(230, 146, 240, 152, P('#3a7ac8')); R.linea(228, 146, 236, 146, P('#3a7ac8')); R.linea(236, 146, 240, 152, P('#3a7ac8')); R.rect(226, 144, 230, 144, K);
};
const p1 = (t) => {
  capa('campus', fondoCampus);
  nubes(0, 2, 262, 40, t, [P('#f8c8b0'), P('#c88a9a'), P('#7a5a8a')], 5, 4); pajaros(30, 18, 250, t, 3, 2);
  // las ventanas: oscuras y, desde «Tetris Effect», se encienden una tras otra (con una silueta en alguna)
  VENTANAS.forEach(([x, y], i) => { const on = t > EFECTO + h(i, 3) * 0.9;
    caja(x - 1, y - 1, x + 16, y + 20, P('#f2ead6')); R.rect(x + 1, y + 1, x + 14, y + 18, on ? P('#f8d878') : P('#3a3a5a')); R.rect(x + 1, y + 9, x + 14, y + 9, P('#f2ead6')); R.rect(x + 7, y + 1, x + 8, y + 18, P('#f2ead6'));
    if (on) { R.rect(x + 1, y + 1, x + 6, y + 3, P('#fff0b0')); if (h(i, 5) > 0.55) { R.disco(x + 11, y + 13, 2, P('#6a5a3a')); R.rect(x + 9, y + 15, x + 13, y + 18, P('#6a5a3a')); } }
    else R.linea(x + 2, y + 2, x + 5, y + 5, P('#5a5a7a')); });
  // las farolas se encienden con las ventanas
  for (const fx of [96, 202]) if (t > EFECTO + 0.3) { R.rect(fx - 1, 118, fx + 2, 119, P('#fff0b0')); cono(fx + 0.5, 120, 156, 2, 14, P('#fff0b0'), 0.12); }
  // hojas que caen del árbol
  for (let k = 0; k < 7; k++) { const u = (t * 0.18 + h(k, 9)) % 1, x = Ri(8 + h(k, 3) * 40 + Math.sin(t * 2 + k) * 4 + u * 20), y = Ri(60 + u * 96); R.pset(x, y, k % 2 ? P('#e8963a') : P('#c85a2a')); R.pset(x + 1, y, P('#f8b040')); }
  // la ardilla cruza el césped a saltitos
  { const u = (t * 0.22) % 1, x = Ri(lerp(250, 196, u)), y = 168 - Ri(Math.abs(Math.sin(t * 9)) * 3); R.rect(x, y, x + 4, y + 2, P('#8a5a30')); R.disco(x, y - 1, 1, P('#8a5a30')); R.pset(x - 1, y - 1, K); R.linea(x + 5, y + 1, x + 7, y - 4, P('#a8743e')); R.pset(x + 6, y - 5, P('#a8743e')); }
  // la investigadora abre la puerta y saluda; los voluntarios llegan por el camino
  const abre = tramo(t, 0.2, 0.8); if (abre > 0) { R.rect(150, 105, Ri(150 + abre * 9), 143, P('#f8d878')); R.rect(Ri(150 + abre * 9), 105, 159, 143, P('#2a5a3a')); }
  const inv = R.actor(TS.investigadora, 142, 146, t, { dir: -1, dedo: t > NOMBRE && t < EFECTO + 0.6, sonrisa: t > A2000 - 0.3, habla: t > A2000 - 0.2 && t < P2 && Math.sin(t * 8) > 0 });
  const e1 = tramo(t, 0.1, A2000 - 0.1), e2 = tramo(t, 0.5, A2000 + 0.4);
  const xa = Ri(lerp(-20, 112, sale(e1))), ya = Ri(lerp(178, 152, sale(e1)));
  const xb = Ri(lerp(-40, 92, sale(e2))), yb = Ri(lerp(178, 156, sale(e2)));
  const vb = R.actor(TS.publico, xb, yb, t, { dir: 1, anda: e2 > 0 && e2 < 1, sostiene: true, sonrisa: true });
  // el saco de dormir enrollado
  { const [mx, my] = vb.mano; caja(mx - 2, my - 4, mx + 10, my + 3, P('#3a7a5a')); R.rect(mx + 1, my - 3, mx + 1, my + 2, P('#2a5a3a')); R.rect(mx + 6, my - 3, mx + 6, my + 2, P('#2a5a3a')); R.rect(mx - 1, my - 3, mx + 9, my - 3, P('#5a9a7a')); }
  const va = R.actor(TS.voluntario, xa, ya, t, { dir: 1, anda: e1 > 0 && e1 < 1, sostiene: true, sorpresa: t > EFECTO && t < EFECTO + 0.6 });
  // la almohada bajo el brazo
  { const [mx, my] = va.mano; caja(mx - 3, my - 5, mx + 9, my + 2, P('#f6f6fa')); R.rect(mx - 2, my + 1, mx + 8, my + 1, P('#c8c8d8')); R.pset(mx - 3, my - 5, P('#f6f6fa')); }
};

// ── 2 · el laboratorio del sueño (el decorado, de día al principio)
const O2 = { encuadre: 'sueno', durmiente: false };
const VENT2 = [17, 22, 96, 66];
const p2 = (t) => {
  T.hoy(R, t, O2);
  // los días pasan en «several days»: la ventana va de la tarde a la noche y vuelve, dos veces
  { const u = tramo(t, DIAS - 0.1, DIAS + 1.4); if (u > 0 && u < 1) { const noche = 0.5 - 0.5 * Math.cos(u * Math.PI * 4); zona(VENT2[0], VENT2[1], VENT2[2], VENT2[3], P('#0a1030'), 0.65 * noche); } }
  // el reloj de la pared corre (encima del del decorado)
  reloj(172, 70, 6, 0.3 + t * 0.05 + tramo(t, DIAS - 0.1, DIAS + 1.4) * 3);
  // el calendario de mesa entre las pantallas: pasa del 1 al 3
  { const x0 = 50, y0 = 88, hoja = t < DIAS ? 1 : t < DIAS + 0.6 ? 2 : 3, gira = (t - DIAS) % 0.6 / 0.6;
    R.poligono([[x0, y0 + 16], [x0 + 3, y0], [x0 + 18, y0], [x0 + 21, y0 + 16]], P('#8a8a96')); caja(x0 + 2, y0 - 1, x0 + 19, y0 + 14, P('#f6f2e6')); R.rect(x0 + 3, y0, x0 + 18, y0 + 3, P('#d83a3a'));
    R.numero(String(hoja), x0 + 11, y0 + 13, { centro: true, color: P('#2a2a34'), sombra: false });
    if (t > DIAS && t < DIAS + 1.2 && gira < 0.5) { const hh = Ri(14 * (1 - gira * 2)); R.rect(x0 + 3, y0 + 4, x0 + 18, y0 + 3 + hh, P('#e8e4d8')); R.rect(x0 + 3, y0 + 3 + hh, x0 + 18, y0 + 3 + hh, P('#a8a496')); }
    R.rect(x0 + 6, y0 - 2, x0 + 7, y0, K); R.rect(x0 + 14, y0 - 2, x0 + 15, y0, K); }
  // los tres voluntarios en sus taburetes, de perfil ante su pantalla, con las manos en el teclado
  [[0, TS.voluntario, {}], [58, TS.publico, { pal: { C: '#c8603a', c: '#a04a2a' } }], [118, TS.publica, {}]].forEach(([x, def, ex], i) => {
    R.rect(x + 3, 122, x + 13, 124, P('#3a3a44')); R.rect(x + 7, 124, x + 8, 150, P('#5a5a64')); R.rect(x + 3, 150, x + 13, 151, P('#3a3a44'));
    const estira = i === 2 && t > DIAS + 0.5 && t < DIAS + 1.4, tec = Math.abs(Math.sin(t * (14 + i * 3))) > 0.5 ? 1 : 0, mira = t > JUEGAN && t < JUEGAN + 0.5;
    const a = R.actor(def, x, 122, t, { dir: 1, ...ex, brazos: estira, sorpresa: estira, sostiene: estira ? undefined : [x + 21, 108 - tec + (mira ? -1 : 0)], sinObjeto: true });
    if (!estira) { R.rect(x + 17, 106, x + 26, 108, P('#d8d0bc')); R.rect(x + 17, 108, x + 26, 108, P('#8a8270')); for (let k = 0; k < 4; k++) R.pset(x + 18 + k * 2, 107, P('#8a8270')); } });
  // la investigadora sale de la mesa de control, cruza y los señala en «volunteers»; luego apunta en su carpeta
  const e1 = tramo(t, P2 + 0.2, VOLUNT - 0.1), xi = Ri(lerp(232, 182, suave(e1)));
  R.actor(TS.investigadora, xi, 158, t, { dir: -1, anda: e1 > 0 && e1 < 1, dedo: t > VOLUNT && t < JUEGAN + 0.4, sonrisa: t > JUEGAN + 0.4, habla: t > VOLUNT && t < JUEGAN && Math.sin(t * 8) > 0 });
  T.hoyDelante(R, t, O2);
};

// ── 3 · la habitación de noche (gag 7)
const O3 = { encuadre: 'sueno', camara: 'cama' };
const p3 = (t) => {
  const suena = tramo(t, PIEZAS - 0.15, CIERRAN + 0.5);
  T.hoy(R, t, { ...O3, suena });
  // las ondas del carro saltan cuando ve los bloques
  if (t > VIERON && t < CIERRAN + 0.8) for (let k = 0; k < 3; k++) { const x = 296 + ((Ri(t * 30) + k * 7) % 18); R.linea(x, 76, x, 84 - Ri(h(k, Ri(t * 10)) * 6), P('#ffe070')); }
  // la carpeta de la investigadora por delante, abajo a la izquierda: su mano dibuja cada bloque que cae
  const cx0 = 6, cy0 = 134; caja(cx0, cy0, cx0 + 50, cy0 + 48, P('#a8784a')); caja(cx0 + 3, cy0 + 4, cx0 + 47, cy0 + 47, P('#f6f4ee'));
  R.rect(cx0 + 18, cy0 - 2, cx0 + 32, cy0 + 4, P('#8a8a96')); R.rect(cx0 + 19, cy0 - 1, cx0 + 31, cy0 + 1, P('#c8c8d0'));
  for (let k = 0; k < 4; k++) R.rect(cx0 + 6, cy0 + 9 + k * 9, cx0 + 44, cy0 + 9 + k * 9, P('#a8c0e0'));
  const marcas = [PIEZAS + 0.1, CAEN + 0.1, CIERRAN, NOCHE - 0.1], pos = [[14, 12], [24, 12], [19, 20], [34, 16]];
  let pluma = [cx0 + 38 + Ri(Math.sin(t * 1.3) * 2), cy0 + 30];
  marcas.forEach((tm, i) => { const u = tramo(t, tm, tm + 0.35); if (u <= 0) return; const [px, py] = pos[i], n = Ri(u * 5);
    for (let a = 0; a < n; a++) R.rect(cx0 + px, cy0 + py + a, cx0 + px + 4, cy0 + py + a, a === 0 || a === 4 ? P('#3a4a8a') : P('#c8b8f0'));
    R.rect(cx0 + px, cy0 + py, cx0 + px, cy0 + py + n - 1, P('#3a4a8a')); R.rect(cx0 + px + 4, cy0 + py, cx0 + px + 4, cy0 + py + n - 1, P('#3a4a8a'));
    if (u < 1) pluma = [cx0 + px + 2 + Ri(Math.sin(t * 30) * 2), cy0 + py + n]; });
  const mx = pluma[0] + 6, my = pluma[1] + 6;
  T.brazo(R, mx + 46, 200, mx, my, '#f2f2f6', -1, { codo: [mx + 30, my + 30] });
  R.linea(mx - 8, my - 4, mx - 13, my - 10, K); R.linea(mx - 7, my - 4, mx - 12, my - 10, P('#2a4ab0'));
};

// ── 4 · la sala de día del hospital
const VH = [22, 24, 104, 88];
const fondoHospital = () => {
  for (let y = 0; y <= 97; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 21); R.pset(x, y, n < 0.05 ? P('#bcd8c6') : n > 0.97 ? P('#e0f0e6') : P('#cfe6d8')); }
  for (let y = 98; y <= 139; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 12 === 0 || (y - 98) % 12 === 0) ? P('#c8d0cc') : h(x, y, 22) < 0.05 ? P('#dfe8e4') : P('#eef4f0'));
  R.rect(0, 94, 319, 97, P('#b08458')); R.rect(0, 94, 319, 94, P('#d0a070')); R.rect(0, 97, 319, 97, P('#7a5a38'));
  for (let y = 140; y <= 179; y++) for (let x = 0; x < 320; x++) { const q = (Math.floor(x / 20) + Math.floor((y - 140) / 10)) % 2, n = h(x, y, 23); R.pset(x, y, n < 0.08 ? P('#a8a088') : n > 0.95 ? P('#e8e0cc') : q ? P('#d0c8b0') : P('#c4bca4')); }
  R.rect(0, 139, 319, 141, P('#8a9a90'));
  // la ventana con persiana a medio subir (el cielo lo pinta cada fotograma)
  caja(VH[0] - 4, VH[1] - 4, VH[2] + 4, VH[3] + 4, P('#f2f2ee')); caja(VH[0] - 7, VH[3] + 4, VH[2] + 7, VH[3] + 7, P('#f6f6f2'));
  // la puerta con su ventanuco (a la derecha, por debajo de la zona de Atom)
  caja(268, 50, 306, 140, P('#a8b8b0')); caja(271, 53, 303, 139, P('#e8d8b0')); R.rect(273, 55, 301, 137, P('#dcc8a0')); caja(280, 62, 294, 86, P('#6a7a8a')); R.rect(274, 100, 276, 104, P('#8a8a96'));
  // el cuadro del velero y el dispensador
  caja(124, 30, 162, 58, P('#3a6a8a')); R.rect(127, 33, 159, 46, P('#a8d0f0')); R.rect(127, 47, 159, 55, P('#3a78b8')); R.poligono([[140, 46], [146, 34], [146, 46]], BL); R.poligono([[147, 46], [147, 37], [153, 46]], P('#f2e6c8')); R.rect(138, 46, 155, 48, P('#a84a32'));
  caja(250, 66, 260, 82, P('#f2f2f6')); R.rect(253, 82, 257, 84, P('#8a8a96')); R.rect(252, 70, 258, 72, P('#3a8ae8'));
  // el mueble bajo con la pecera (el agua la pinta cada fotograma)
  caja(190, 124, 254, 152, P('#c8a070')); R.rect(191, 125, 253, 126, P('#e0b880')); R.rect(222, 128, 222, 150, P('#8a6a40')); R.disco(216, 138, 1, P('#5a4a2a')); R.disco(228, 138, 1, P('#5a4a2a'));
  caja(194, 92, 250, 123, P('#4a5a6a')); R.rect(194, 92, 250, 94, P('#2a3a4a'));
  // la mesita con el jarrón de flores
  caja(36, 128, 62, 132, P('#c8a070')); R.rect(40, 132, 42, 156, P('#8a6a40')); R.rect(56, 132, 58, 156, P('#8a6a40'));
  R.poligono([[44, 128], [54, 128], [52, 116], [46, 116]], P('#5a8ac8')); for (const [fx, fy, c] of [[46, 108, '#e84a6a'], [52, 106, '#f0d040'], [49, 102, '#e8e8f0'], [43, 112, '#c84ac8']]) { R.linea(49, 116, fx, fy, P('#3a8a3a')); R.disco(fx, fy, 2, P(c)); R.pset(fx, fy, P('#f8e070')); }
  // el sillón reclinable (respaldo; los brazos van por delante)
  R.rect(68, 104, 112, 146, K); R.rect(69, 105, 111, 145, P('#2a8a8a')); R.rect(72, 108, 108, 140, P('#3aa0a0')); R.rect(72, 108, 74, 140, P('#5ac0b8'));
  for (let y = 112; y <= 136; y += 8) R.rect(76, y, 104, y, P('#2a7a7a'));
  R.rect(72, 146, 74, 156, P('#3a3a44')); R.rect(106, 146, 108, 156, P('#3a3a44'));
  // el carro del ordenador beis con su teclado
  caja(146, 112, 186, 116, P('#8a8a96')); R.rect(150, 116, 152, 154, P('#6a6a74')); R.rect(180, 116, 182, 154, P('#6a6a74')); R.rect(146, 136, 186, 138, P('#8a8a96'));
  for (const wx of [151, 181]) R.disco(wx, 156, 2, K);
  caja(150, 82, 182, 110, P('#d8d0b8')); R.rect(153, 85, 179, 104, P('#1a2a24')); R.rect(162, 110, 170, 112, P('#c8c0a8')); caja(152, 110, 182, 113, P('#e0d8c0'));
  caja(156, 128, 178, 136, P('#d8d0b8')); R.rect(158, 130, 176, 134, P('#a8a090'));
};
const p4 = (t) => {
  capa('hospital', fondoHospital);
  // por la ventana: el cielo con nubes, la rama que se mece con sus hojas y un pájaro; la persiana arriba
  R.recorte(VH); cieloT(VH[0], VH[1], VH[2], VH[3], P('#5a9ae0'), P('#c8e4f8')); nubes(VH[0], VH[1] + 8, VH[2], VH[3] - 20, t, NUBES, 4, 7);
  R.poligono([[VH[0], VH[3]], [VH[0], 70], [40, 66], [62, 74], [84, 70], [VH[2], 76], [VH[2], VH[3]]], P('#7ab858'));
  { const sw = Math.sin(t * 1.3) * 2; R.linea(VH[2], 48, 70, Ri(56 + sw), P('#5a3a24')); R.linea(VH[2], 49, 70, Ri(57 + sw), P('#5a3a24'));
    for (let k = 0; k < 14; k++) { const x = Ri(72 + h(k, 2) * 32), y = Ri(44 + h(k, 3) * 18 + sw * (1 - (x - 70) / 34)); R.disco(x, y, 2, k % 3 ? P('#3a8a3a') : P('#5aaa4a')); } }
  pajaros(VH[0] + 4, VH[1] + 6, VH[2] - 4, t, 1, 5);
  R.recorte(null);
  for (let y = VH[1]; y <= VH[1] + 16; y += 2) R.rect(VH[0], y, VH[2], y, P('#f2f2ee')); R.rect(VH[0], VH[1] + 17, VH[2], VH[1] + 17, P('#c8c8c0'));
  R.rect(Ri((VH[0] + VH[2]) / 2), VH[1], Ri((VH[0] + VH[2]) / 2) + 1, VH[3], P('#f2f2ee'));
  // la pecera: agua, plantas que se mecen, burbujas y dos peces
  R.recorte([195, 95, 249, 122]); for (let y = 95; y <= 122; y++) for (let x = 195; x <= 249; x++) R.pset(x, y, y > 118 ? P('#d8c890') : (x + y + Ri(t * 6)) % 23 === 0 ? P('#8ad0f0') : P('#4aa0d0'));
  for (let k = 0; k < 4; k++) { const bx = 200 + k * 14; for (let j = 0; j < 12; j++) R.pset(Ri(bx + Math.sin(t * 2 + j * 0.4 + k) * 1.5), 118 - j, P('#3a9a4a')); }
  for (let k = 0; k < 2; k++) { const u = (t * (0.12 + k * 0.05) + k * 0.4) % 1, d = Math.sin(u * Math.PI * 2) > 0 ? 1 : -1, x = Ri(205 + (0.5 + 0.5 * Math.sin(u * Math.PI * 2 - Math.PI / 2)) * 36), y = 102 + k * 8;
    R.rect(x - 3, y - 1, x + 2, y + 1, k ? P('#f0c040') : P('#f07a3a')); R.poligono([[x - 3 * d, y], [x - 6 * d, y - 2], [x - 6 * d, y + 2]], k ? P('#f0c040') : P('#f07a3a')); R.pset(x + 2 * d, y - 1, K); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; R.pset(240, Ri(118 - u * 22), BL); }
  R.recorte(null);
  // la pantalla del carro: bloques sueltos que caen
  for (let k = 0; k < 4; k++) { const u = (t * 0.4 + k * 0.27) % 1; bloque(155 + k * 6, Ri(86 + u * 14), 4, P('#8ae8a0')); }
  // el reloj de la pared
  reloj(186, 34, 8, 0.2 + t * 0.02);
  // el paciente dormita (ojos cerrados) y desde «happened» sueña con bloques; despierta en «didn't» y se encoge con «?»
  const despierto = t > NO - 0.2, encoge = t > RECUERDA && t < TODO + 0.3;
  R.actor(TS.publico, 82, 142, t, { dir: 1, parpadea: !despierto, sorpresa: t > NO - 0.2 && t < NO + 0.3, brazos: encoge, sonrisa: t > TODO + 0.3, pal: { C: '#a8c8e8', c: '#88a8c8', H: '#8a8a94', h: '#a8a8b0' } });
  if (encoge) R.bocadillo(90, 108 - Ri(sale(tramo(t, RECUERDA, RECUERDA + 0.2)) * 3), { icono: '?' });
  // los brazos del sillón por delante
  for (const ax of [66, 106]) { R.rect(ax, 130, ax + 8, 142, K); R.rect(ax + 1, 131, ax + 7, 141, P('#2a8a8a')); R.rect(ax + 1, 131, ax + 7, 132, P('#5ac0b8')); }
  R.rect(66, 141, 114, 147, K); R.rect(67, 142, 113, 146, P('#2a7a7a'));
  // la nube de pensamiento con los bloques que caen
  const nb = tramo(t, PASO - 0.1, PASO + 0.4);
  if (nb > 0) { nubeIdea(108, 62, 32, 22, 98, 102, nb);
    if (nb >= 1) { R.recorte([82, 46, 134, 78]); for (let k = 0; k < 5; k++) { const u = (t * 0.6 + k * 0.21) % 1; bloque(84 + k * 9 + (k % 2) * 2, Ri(38 + u * 40), 7, ['#8a6ad8', '#3a8ae8', '#e85a7a', '#3ab86a', '#e8a83a'][k]); } R.recorte(null); } }
  // la investigadora entra por la puerta, cruza y en «didn't remember» señala el ordenador
  const pu = tramo(t, P4 - 0.1, P4 + 0.3) * (1 - tramo(t, PASO + 0.8, PASO + 1.2));
  if (pu > 0) { R.rect(271, 53, Ri(271 + pu * 26), 139, P('#7a8a84')); R.rect(Ri(271 + pu * 26), 53, Ri(271 + pu * 26) + 2, 139, P('#b8a880')); }
  const e1 = tramo(t, P4 + 0.2, AMNESIA), xi = Ri(lerp(282, 192, suave(e1)));
  R.actor(TS.investigadora, xi, 166, t, { dir: -1, anda: e1 > 0 && e1 < 1, dedo: t > NO && t < TODO, habla: t > AMNESIA && t < RECUERDA && Math.sin(t * 8) > 0, sonrisa: t > TODO });
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  efectos: [[0.3, 'puerta'], [EFECTO, 'interruptor'], [VOLUNT, 'tecleo'], [DIAS, 'papel'], [DIAS + 0.7, 'tic'],
    [PIEZAS, 'pop'], [CAEN + 0.1, 'pop'], [CIERRAN + 0.1, 'lapiz'], [P4 - 0.05, 'puerta'], [PASO, 'brillo'], [RECUERDA, 'pop']],
  año: 2000,
});
''')

# ──────────────────────────────────────────────────────────────────
E['ts-gibson'] = ('Gibson', '''// TS-GIBSON (frase 24), Oklahoma, diciembre de 2023, cartela «2023». Cinco planos:
// 1. la calle de Oklahoma de noche: nieva, casas con luces de Navidad, la ventana del salón parpadea con la tele; la
//    barra corre de 2000 a 2023 en «40 years later»; pasa una camioneta; la vecina con el perro se para a mirar en
//    «surprises» y el perro ladra. Corta en «In December».
// 2. el salón: Gibson entra con los cascos, coge el mando del suelo en «13-year-old» y se pone a jugar; en «Willis
//    Gibson» da un saltito. Corta en «played».
// 3. la tele de cerca: sus dos manos aporrean el mando; en «froze» la imagen se para y entran las rayas; las manos se
//    levantan. Corta en «No one».
// 4. el rincón visto desde la tele: Gibson se lleva las manos a la cabeza y grita en «No one», salta en «beating
//    Tetris»; en la pantalla de su emisión suben corazones; la madre asoma por la cocina y aplaude; el gato salta del
//    rascador. Corta en «And a year later».
// 5. un sótano de 2024: otro chico y su equipo ante la tele de tubo; el número sube a 255 y en «zero» vuelve a 0;
//    saltan los tres.''', COMUN + r'''
const g = (f) => en('gibson', f);
const P2 = g(.1560), P3 = g(.3917), P4 = g(.5779), P5 = g(.7873);
const CUARENTA = g(.0170), LATER = g(.0490), SORPRESA = g(.0971);
const TRECE = g(.2399), OKLA = g(.2975), WILLIS = g(.3474);
const LEJOS = g(.4813), CONGELA = g(.5275);
const ANTES = g(.6335), JUGADORES = g(.6712), GANAR = g(.7221);
const OTRO = g(.8325), EQUIPO = g(.8429), LEJOS2 = g(.8862), EMPEZO = g(.9324), CERO = g(.9730);
const NIEVE = (t, x0, y0, x1, y1, n = 40, k = 0) => { for (let i = 0; i < n; i++) { const u = (t * (0.08 + h(i, k) * 0.06) + h(i, k, 2)) % 1, x = Ri(x0 + h(i, k, 3) * (x1 - x0) + Math.sin(t * 1.5 + i) * 3), y = Ri(y0 + u * (y1 - y0));
  if (x > 270 && y < 48) continue; R.pset(x, y, h(i, k, 4) > 0.5 ? BL : P('#c8d4f0')); } };

// ── 1 · la calle de Oklahoma de noche
const CASAS = [[0, 92, 76, 140], [96, 214, 70, 140], [232, 320, 88, 140]];
const LUCES = ['#e83a3a', '#3ac85a', '#f0d040', '#3a8ae8', '#e87ad8'];
const fondoCalle = () => {
  cieloT(0, 0, 319, 100, P('#0a0e2a'), P('#2a3060'));
  // las casas: paredes de tablas, tejados con nieve
  CASAS.forEach(([x0, x1, yt, yb], i) => { const cw = ['#c8b898', '#8aa0b8', '#b88a6a'][i], tech = ['#4a3a3a', '#3a3a4a', '#4a3a2a'][i];
    for (let y = yt + 10; y <= yb; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (y - yt) % 4 === 0 ? osc(P(cw), 0.25) : h(x, y, i) < 0.05 ? osc(P(cw), 0.1) : P(cw));
    R.poligono([[x0 - 6, yt + 12], [(x0 + x1) / 2, yt - 14], [x1 + 6, yt + 12]], P(tech));
    for (let k = 0; k < 6; k++) R.linea(x0 - 4 + k * 2, yt + 11 - k, (x0 + x1) / 2, yt - 13 + k * 0, osc(P(tech), 0.2));
    R.poligono([[x0 - 6, yt + 12], [(x0 + x1) / 2, yt - 14], [x1 + 6, yt + 12], [x1 + 4, yt + 14], [(x0 + x1) / 2, yt - 10], [x0 - 4, yt + 14]], P('#f6f8ff'));
    R.poligono([[(x0 + x1) / 2 - 10, yt - 9], [(x0 + x1) / 2, yt - 14], [(x0 + x1) / 2 + 10, yt - 9]], P('#e8ecf8'));
    for (let x = x0; x <= x1; x++) R.pset(x, yt + 12 + (x % 9 === 0 ? 1 : 0), P('#d8e0f0')); });
  // la casa del centro: la ventana grande del salón (la luz la pinta cada fotograma), la puerta y el porche
  caja(124, 92, 176, 124, P('#f2ead6')); caja(186, 94, 204, 140, P('#6a2a2a')); R.disco(200, 118, 1, P('#e8c860')); R.disco(195, 104, 4, P('#2a6a3a')); R.disco(195, 104, 2, P('#6a2a2a')); R.pset(195, 100, P('#d83a3a'));
  // las otras ventanas, oscuras o con luz cálida
  for (const [x, y, on] of [[14, 98, 1], [50, 98, 0], [244, 104, 1], [276, 104, 0]]) { caja(x, y, x + 20, y + 16, P('#f2ead6')); R.rect(x + 1, y + 1, x + 19, y + 15, on ? P('#f0c060') : P('#2a2a44')); R.rect(x + 10, y + 1, x + 10, y + 15, P('#f2ead6')); }
  // la chimenea (lejos de la zona de Atom)
  R.rect(236, 54, 246, 80, P('#7a3a2a')); R.rect(234, 52, 248, 55, P('#5a2a1a')); R.rect(235, 51, 247, 52, P('#f6f8ff'));
  // el jardín nevado, la acera y la calle
  for (let y = 140; y <= 157; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 31); R.pset(x, y, n < 0.08 ? P('#b8c4e0') : n > 0.97 ? BL : P('#dce4f6')); }
  for (let y = 158; y <= 163; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 22 === 0 ? P('#7a7e8a') : y === 158 ? P('#c8ccd8') : P('#a8acb8'));
  for (let y = 164; y <= 179; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 32); R.pset(x, y, y < 166 ? P('#e8ecf8') : (y === 171 && x % 16 < 8) ? P('#e8c860') : (y === 168 || y === 176) && n > 0.4 ? P('#3a3e4a') : n < 0.06 ? P('#4a4e5a') : P('#2a2e38')); }
  // el buzón, el muñeco de nieve hinchable y la farola
  R.rect(96, 140, 97, 156, P('#3a3a44')); caja(91, 133, 103, 141, P('#2a4a8a')); R.rect(103, 134, 104, 137, P('#d83a3a'));
  R.disco(64, 146, 9, P('#f6f8ff')); R.disco(64, 132, 6, P('#f6f8ff')); R.anillo(64, 146, 9, P('#a8b0c8')); R.pset(62, 131, K); R.pset(66, 131, K); R.rect(64, 133, 66, 134, P('#f08a3a'));
  R.rect(57, 138, 71, 139, P('#d83a3a')); R.rect(60, 123, 68, 126, K); R.rect(58, 126, 70, 127, K); R.rect(60, 125, 68, 125, P('#d83a3a'));
  R.rect(20, 92, 21, 163, P('#2a2a30')); R.rect(16, 88, 25, 92, P('#2a2a30'));
};
const p1 = (t) => {
  capa('calle', fondoCalle);
  estrellas(0, 0, 262, 60, t, 26, 9); R.disco(220, 26, 7, P('#f6f0d0')); R.disco(223, 24, 6, P('#1a2048')); 
  nubes(0, 6, 262, 44, t, [P('#5a6490'), P('#424c7a'), P('#2e3664')], 4, 8);
  // la ventana del salón: la luz de la tele que cambia y, en «surprises», un fogonazo
  { const fl = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 3.1), fg = t > SORPRESA && t < SORPRESA + 0.5;
    R.rect(125, 93, 175, 123, fg ? P('#f0f4ff') : mez(P('#3a5aa8'), P('#a8c8f0'), fl)); R.rect(150, 93, 150, 123, P('#f2ead6')); R.rect(125, 108, 175, 108, P('#f2ead6'));
    R.rect(126, 116, 136, 123, P('#3a8a4a')); R.poligono([[131, 100], [126, 116], [136, 116]], P('#2a6a3a')); R.pset(131, 99, P('#f0d040'));
    if (fg) cono(150, 124, 157, 26, 40, P('#e8f0ff'), 0.2); }
  // las luces de Navidad de los aleros parpadean
  CASAS.forEach(([x0, x1, yt], i) => { for (let x = x0 + 2; x <= x1 - 2; x += 5) { const k = Math.floor(x / 5 + t * 3 + i) % 5; if (x > 270 && yt + 13 < 48) continue; R.pset(x, yt + 14, P(LUCES[k])); tin(x, yt + 15, P(LUCES[k]), 0.4); } });
  // el humo de la chimenea
  for (let k = 0; k < 5; k++) { const u = (t * 0.25 + k / 5) % 1; tin(Ri(241 - u * 12 + Math.sin(t + k) * 2), Ri(48 - u * 30), P('#c8ccd8'), 0.5 * (1 - u)); }
  // el reno de luces del jardín asiente
  { const x = 226, y = 140, cab = Ri(Math.sin(t * 1.5) * 2); const L = P('#f8f0b0'); R.linea(x, y - 10, x + 14, y - 10, L); R.linea(x, y - 10, x, y, L); R.linea(x + 3, y - 10, x + 3, y, L); R.linea(x + 11, y - 10, x + 11, y, L); R.linea(x + 14, y - 10, x + 14, y, L);
    R.linea(x + 14, y - 10, x + 18, y - 16 + cab, L); R.linea(x + 18, y - 16 + cab, x + 21, y - 15 + cab, L); R.linea(x + 18, y - 16 + cab, x + 16, y - 21 + cab, L); R.linea(x + 18, y - 16 + cab, x + 20, y - 21 + cab, L); R.pset(x + 21, y - 15 + cab, P('#e83a3a')); }
  NIEVE(t, 0, 0, 319, 179, 60, 1);
  // la vecina pasea el perro: se para delante de la casa y mira en «surprises»; el perro ladra
  const e1 = tramo(t, 0, SORPRESA - 0.3), xv = Ri(lerp(300, 150, sale(e1)));
  const vec = R.actor(TS.publica, xv, 162, t, { dir: -1, anda: e1 > 0 && e1 < 1, sorpresa: t > SORPRESA && t < SORPRESA + 0.9, sostiene: [xv - 6, 152], pal: { C: '#2a6a5a', c: '#1c4a3e' } });
  const dx = xv - 22 + (e1 >= 1 ? Ri(Math.sin(t * 3) * 2) : 0), dy = 162, lad = t > SORPRESA + 0.15 && t < SORPRESA + 1.0 && Math.sin(t * 16) > 0;
  R.linea(vec.mano[0], vec.mano[1], dx + 9, dy - 7, P('#d83a3a'));
  { const pa = e1 > 0 && e1 < 1 ? Math.floor(t * 8) % 2 : 0; R.rect(dx + 2, dy - 7, dx + 11, dy - 3, K); R.rect(dx + 3, dy - 6, dx + 10, dy - 4, P('#c8a070')); R.rect(dx + 3, dy - 3, dx + 3, dy - pa, K); R.rect(dx + 9, dy - 3, dx + 9, dy - 1 + pa, K); R.rect(dx + 5, dy - 3, dx + 5, dy - 1 + pa, K);
    R.disco(dx + 1, dy - 8 - (lad ? 1 : 0), 3, K); R.disco(dx + 1, dy - 8 - (lad ? 1 : 0), 2, P('#c8a070')); R.pset(dx - 2, dy - 8 - (lad ? 1 : 0), K); R.rect(dx + 2, dy - 11, dx + 3, dy - 9, P('#8a6a40')); R.linea(dx + 11, dy - 6, dx + 14, dy - 9 + Ri(Math.sin(t * 12)), K);
    if (lad) R.icono('!', dx - 2, dy - 20, P('#d83a3a'), K); }
  // la camioneta pasa por delante, con los faros
  { const u = tramo(t, 0.6, 3.4), x = Ri(lerp(-70, 340, u)); if (u > 0 && u < 1) { const y = 164;
    cono(x + 66, y - 2, y + 2, 1, 1, P('#fff4c0'), 0); for (let k = 0; k < 30; k++) tin(x + 66 + k, y + 2 + Ri(k * 0.15), P('#fff4c0'), 0.35 * (1 - k / 30));
    caja(x, y - 6, x + 64, y + 6, P('#8a2a2a')); caja(x + 34, y - 16, x + 54, y - 5, P('#8a2a2a')); R.rect(x + 37, y - 14, x + 51, y - 7, P('#6a8ab8')); R.rect(x + 38, y - 13, x + 41, y - 11, P('#a8c8e8'));
    R.rect(x + 1, y - 5, x + 63, y - 5, P('#b84a4a')); R.rect(x + 2, y - 8, x + 30, y - 6, P('#f6f8ff')); R.rect(x + 62, y - 3, x + 64, y, P('#fff4c0')); R.rect(x, y - 3, x + 1, y, P('#e83a3a'));
    for (const wx of [x + 12, x + 50]) { R.disco(wx, y + 6, 5, K); R.disco(wx, y + 6, 3, P('#8a8a96')); R.pset(wx, y + 6, K); } } }
};

// ── 2 · el salón
const p2 = (t) => {
  const e1 = tramo(t, P2 + 0.1, TRECE - 0.4), xg = Ri(lerp(300, 144, sale(e1)));
  const coge = tramo(t, TRECE - 0.3, TRECE + 0.2), juega = t > TRECE + 0.2;
  const tec = juega ? Ri(Math.abs(Math.sin(t * 13)) * 1.5) : 0;
  const mano = coge <= 0 ? null : coge < 0.5 ? [Ri(lerp(150, 138, coge * 2)), Ri(lerp(146, 153, coge * 2))] : [Ri(lerp(138, 140, (coge - 0.5) * 2)), Ri(lerp(153, 143, (coge - 0.5) * 2)) - tec];
  const MANDO = mano ?? [138, 153];
  T.hoy(R, t, { encuadre: 'salon23', mando: [MANDO[0] - 4, MANDO[1]] });
  const salto = t > WILLIS && t < WILLIS + 0.5 ? Ri(Math.sin((t - WILLIS) / 0.5 * Math.PI) * 4) : 0;
  const gi = R.actor(TS.gibson, xg, 156, t, { dir: -1, anda: e1 > 0 && e1 < 1, sostiene: mano ?? undefined, salto, sonrisa: t > OKLA, sorpresa: t > WILLIS + 0.6 && t < WILLIS + 0.9 });
  mandoJ(mano ? gi.mano[0] - 3 : MANDO[0], mano ? gi.mano[1] : MANDO[1], t);
  if (t > TRECE + 0.2 && t < TRECE + 0.6) destello(gi.mano[0] - 3, gi.mano[1] - 2, tramo(t, TRECE + 0.2, TRECE + 0.6));
  T.hoyDelante(R, t, { encuadre: 'salon23' });
};

// ── 3 · la tele de cerca
const p3 = (t) => {
  const congela = tramo(t, CONGELA - 0.05, CONGELA + 0.25);
  T.hoy(R, t, { encuadre: 'salon23', camara: 'tele', congela });
  // el mando grande y las dos manos que lo aporrean; en «froze» se levantan
  const sube = sale(tramo(t, CONGELA + 0.1, CONGELA + 0.5)), ab = (k) => (congela > 0 ? 0 : Ri(Math.abs(Math.sin(t * (17 + k * 5))) * 2));
  const mx = 38, my = 158 - Ri(sube * 2);
  R.linea(mx + 18, my - 2, 96, 150, K); R.linea(mx + 18, my - 3, 96, 149, P('#3a3a44'));
  R.disco(mx - 14, my + 2, 7, K); R.disco(mx + 14, my + 2, 7, K); R.rect(mx - 14, my - 6, mx + 14, my + 7, K);
  R.disco(mx - 14, my + 2, 6, P('#4a4a56')); R.disco(mx + 14, my + 2, 6, P('#4a4a56')); R.rect(mx - 14, my - 5, mx + 14, my + 6, P('#4a4a56')); R.rect(mx - 12, my - 5, mx + 12, my - 4, P('#6a6a78'));
  R.rect(mx - 18, my, mx - 10, my + 1, K); R.rect(mx - 15, my - 3, mx - 13, my + 4, K); R.disco(mx + 12, my - 1, 2, P('#d84a3a')); R.disco(mx + 17, my + 3, 2, P('#e8b830')); R.rect(mx - 3, my + 1, mx + 1, my + 1, P('#2a2a30'));
  T.brazo(R, -14, 196, mx - 18, my + 2 - ab(0) - Ri(sube * 14), '#3a6aa8', 1, { codo: [mx - 30, my + 26] });
  T.brazo(R, 82, 198, mx + 18, my + 2 - ab(1) - Ri(sube * 14), '#3a6aa8', -1, { codo: [mx + 34, my + 28] });
  if (congela > 0) { R.icono('!', 236, 96, P('#e83a3a'), K, 2); destello(242, 118, tramo(t, CONGELA, CONGELA + 0.6)); }
};

// ── 4 · el rincón visto desde la tele
const fondoRincon = () => {
  rayas(0, 0, 319, 145, '#e8d8b8', '#d4c09c', 12, 41);
  for (let y = 0; y <= 50; y++) for (let x = 266; x < 320; x++) R.pset(x, y, h(x, y, 42) < 0.05 ? P('#dccca8') : P('#e8d8b8'));
  R.rect(0, 140, 319, 145, P('#f2ead6')); R.rect(0, 145, 319, 145, P('#a89a7a'));
  for (let y = 146; y <= 179; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 43); R.pset(x, y, n < 0.1 ? P('#7a6a8a') : n > 0.93 ? P('#a898b0') : (x + y) % 9 === 0 ? P('#8a7a98') : P('#94849e')); }
  // la puerta de la cocina, con su luz, la nevera con imanes y los armarios
  caja(16, 50, 64, 146, P('#f2ead6')); R.rect(19, 53, 61, 145, P('#f0d890')); R.rect(19, 53, 61, 80, P('#e8c878')); for (let x = 22; x < 60; x += 9) caja(x, 56, x + 7, 74, P('#c8905a'));
  caja(22, 84, 40, 145, P('#e8eef4')); R.rect(23, 106, 39, 106, P('#a8b0b8')); R.rect(37, 90, 37, 100, P('#8a929a')); for (const [a, b, cc] of [[26, 88, '#e83a3a'], [30, 94, '#3a8ae8'], [27, 112, '#f0d040']]) R.rect(a, b, a + 2, b + 2, P(cc));
  R.rect(42, 110, 61, 145, P('#c8905a')); R.rect(42, 110, 61, 112, P('#e8e0d0'));
  // la estantería de juegos (cajas de colores sin letras) con las copas
  caja(74, 54, 120, 146, P('#8a5a30')); for (const yb of [78, 102, 126]) R.rect(75, yb, 119, yb + 2, P('#a8743e'));
  [56, 80, 104, 128].forEach((y0, r) => { let x = 77; while (x < 116) { const w = 3 + Math.floor(h(x, r, 44) * 3), hh = 14 + Math.floor(h(x, r, 45) * 6); if (r === 0 && x > 98) break; libro(x, y0 + 20 - hh + 2, Math.min(117, x + w - 1), y0 + 21, ['#d83a3a', '#3a6ab8', '#e8b830', '#3a9a5a', '#8a4ab0', '#2a2a30'][Math.floor(h(x, r, 46) * 6)], x); x += w; } });
  for (const cx of [104, 112]) { R.poligono([[cx - 3, 68], [cx + 3, 68], [cx + 1, 74], [cx - 1, 74]], P('#e8c040')); R.rect(cx - 1, 74, cx + 1, 76, P('#c8a030')); R.rect(cx - 2, 76, cx + 2, 77, P('#8a6a20')); R.pset(cx - 2, 69, P('#fff4b0')); }
  // las fotos de familia
  for (const [x, y, cc] of [[132, 40, '#8ac0e8'], [158, 46, '#e8b878'], [140, 66, '#a8d8a8']]) { caja(x, y, x + 18, y + 16, P('#6a4a2a')); R.rect(x + 2, y + 2, x + 16, y + 14, P(cc)); R.disco(x + 8, y + 9, 3, P('#e8a080')); R.rect(x + 5, y + 12, x + 11, y + 14, P('#5a6aa8')); }
  // el reloj de pared y el póster del cohete
  R.disco(212, 52, 9, K); R.disco(212, 52, 8, P('#f6f2e6')); R.linea(212, 52, 212, 46, K); R.linea(212, 52, 216, 54, K); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R.pset(Ri(212 + Math.sin(a) * 6), Ri(52 - Math.cos(a) * 6), P('#8a8a96')); }
  caja(186, 30, 200, 76, P('#2a3a6a')); R.poligono([[193, 36], [189, 48], [197, 48]], P('#f2eee2')); R.rect(189, 48, 197, 62, P('#f2eee2')); R.rect(187, 58, 188, 64, P('#d83a3a')); R.rect(198, 58, 199, 64, P('#d83a3a')); R.rect(191, 63, 195, 68, P('#f0a040')); R.disco(193, 52, 1, P('#3a8ae8'));
  // la mesa con la pantalla de la emisión
  caja(178, 118, 236, 122, P('#3a3a44')); R.rect(182, 122, 184, 146, P('#2a2a30')); R.rect(230, 122, 232, 146, P('#2a2a30'));
  caja(186, 88, 228, 116, P('#2a2a30')); R.rect(205, 116, 209, 118, P('#2a2a30'));
  // el rascador del gato
  R.rect(250, 96, 254, 146, P('#c8b080')); for (let y = 98; y < 146; y += 3) R.rect(250, y, 254, y, P('#a89060')); caja(240, 92, 266, 97, P('#8a6a9a')); caja(244, 120, 262, 124, P('#8a6a9a')); caja(242, 144, 264, 148, P('#8a6a9a'));
  // la lámpara de pie con su pantalla y la planta (a la derecha, por debajo de la zona de Atom)
  R.rect(291, 70, 292, 144, P('#3a3a44')); R.rect(286, 144, 297, 146, P('#2a2a30')); R.poligono([[282, 70], [301, 70], [297, 56], [286, 56]], P('#f0dca0')); R.rect(286, 56, 297, 57, P('#d8c080')); R.rect(282, 70, 301, 70, P('#c8a860'));
  R.poligono([[296, 146], [312, 146], [310, 132], [298, 132]], P('#c86a3a')); for (let k = 0; k < 7; k++) { const a = -1 + k * 0.33; R.linea(304, 132, Ri(304 + Math.sin(a) * 10), Ri(132 - Math.cos(a) * 16), k % 2 ? P('#3a8a3a') : P('#5aa84a')); }
  // el puf rojo
  for (let y = 128; y <= 162; y++) for (let x = 112; x <= 176; x++) { const d = ((x - 144) / 32) ** 2 + ((y - 148) / 16) ** 2; if (d > 1) continue; R.pset(x, y, d > 0.85 ? P('#7a1a22') : y < 140 && x < 140 ? P('#e85a5a') : (x + y) % 11 === 0 ? P('#a82a32') : P('#c83a42')); }
};
const p4 = (t) => {
  capa('rincon', fondoRincon);
  // la luz cálida de la lámpara de pie
  cono(291, 71, 144, 8, 22, P('#fff0b0'), 0.08);
  // la guirnalda con luces (hasta antes de la zona de Atom)
  for (let x = 0; x <= 262; x++) { const y = 20 + Ri(Math.abs(Math.sin(x * 0.05)) * 5); R.pset(x, y, P('#2a6a3a')); if (x % 7 === 0) { const k = Math.floor(x / 7 + t * 2) % 5; R.disco(x, y + 2, 1, P(LUCES[k])); tin(x, y + 4, P(LUCES[k]), 0.4); } }
  // la pantalla de la emisión: el juego en pequeño a la izquierda y los corazones que suben (más desde «No one»)
  { R.rect(188, 90, 226, 114, P('#14182a')); R.rect(189, 91, 206, 113, P('#1a1a22')); for (let k = 0; k < 4; k++) bloque(191 + k * 4, 100 + (k % 2) * 6, 3, P('#a8b8c8'));
    for (let k = 0; k < 5; k++) R.rect(209, 94 + k * 4, 209 + 6 + Ri(h(k, 1) * 10), 95 + k * 4, P(['#8a8ab8', '#6a9a8a', '#b88a6a', '#8a8ab8', '#7a7a9a'][k]));
    const n = t > P4 ? 8 : 2; R.recorte([207, 90, 226, 114]); for (let k = 0; k < n; k++) { const u = (t * 0.9 + k / n) % 1, x = 210 + Ri(h(k, 3) * 12), y = Ri(114 - u * 26); R.pset(x, y, P('#e84a6a')); R.pset(x + 2, y, P('#e84a6a')); R.rect(x, y + 1, x + 2, y + 1, P('#e84a6a')); R.pset(x + 1, y + 2, P('#e84a6a')); } R.recorte(null); }
  // el gato salta del rascador con el grito
  { const u = tramo(t, P4 + 0.25, P4 + 0.85), x = Ri(lerp(248, 290, u)), y = Ri(lerp(90, 160, u) - Math.sin(u * Math.PI) * 18), cuerpo = u > 0 && u < 1;
    if (cuerpo) { R.rect(x - 5, y - 2, x + 5, y + 1, P('#e8963a')); R.disco(x + 6, y - 3, 3, P('#e8963a')); R.pset(x + 5, y - 7, P('#e8963a')); R.pset(x + 8, y - 7, P('#e8963a')); R.linea(x - 5, y - 1, x - 10, y - 6, P('#c8762a')); for (const lx of [x - 4, x + 3]) R.linea(lx, y + 1, lx - 2, y + 4, P('#c8762a')); }
    else if (u <= 0) { R.disco(252, 88, 6, P('#e8963a')); R.disco(258, 85, 4, P('#f0a848')); R.poligono([[255, 82], [256, 77], [258, 81]], P('#e8963a')); R.poligono([[259, 81], [261, 77], [262, 82]], P('#e8963a')); R.pset(257, 85, K); R.pset(260, 85, K); R.linea(246, 90, 242, 98 + Ri(Math.sin(t * 3) * 2), P('#c8762a')); }
    else { R.disco(296, 158, 5, P('#e8963a')); R.disco(301, 154, 3, P('#f0a848')); R.pset(300, 154, K); R.pset(302, 154, K); } }
  if (t > P4 + 0.3 && t < P4 + 0.9) R.icono('!', 280, 74, P('#e83a3a'), K);
  // la madre asoma por la puerta de la cocina en «before» y aplaude
  const em = tramo(t, ANTES - 0.3, ANTES + 0.4), xm = Ri(lerp(6, 34, sale(em)));
  if (em > 0) { R.recorte([19, 53, 61, 146]); R.actor(TS.publica, xm, 146, t, { dir: 1, anda: em < 1, sorpresa: t > ANTES && t < JUGADORES, sonrisa: t > JUGADORES, brazos: t > JUGADORES && Math.sin(t * 12) > 0, pal: { C: '#8a3a5a', c: '#6a2a44' } }); R.recorte(null); }
  // Gibson: manos a la cabeza y grita en «No one»; salta en «beating Tetris»
  const salto = t > GANAR ? Ri(Math.abs(Math.sin((t - GANAR) * 7)) * 6) : t > P4 + 0.1 && t < ANTES ? Ri(Math.abs(Math.sin((t - P4) * 5)) * 2) : 0;
  R.actor(TS.gibson, 136, 168, t, { dir: 1, brazos: true, sorpresa: t < JUGADORES, sonrisa: t >= JUGADORES, salto, habla: t > JUGADORES && t < GANAR && Math.sin(t * 9) > 0 });
  // el cable del mando que cuelga hacia la tele (abajo)
  R.linea(150, 152, 168, 179, K);
  // por delante: el cuenco de palomitas y los calcetines
  R.poligono([[14, 170], [40, 170], [36, 179], [18, 179]], P('#d83a3a')); for (let k = 0; k < 9; k++) R.disco(17 + k * 3, 169 - (k % 2), 2, P('#fff4d0'));
  R.rect(278, 172, 290, 175, P('#f2ead6')); R.rect(286, 168, 290, 172, P('#f2ead6')); R.rect(278, 174, 290, 174, P('#a8a090'));
};

// ── 5 · el sótano de 2024
const fondoSotano = () => {
  for (let y = 0; y <= 13; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 20 < 4 ? P('#6a4a2a') : P('#3a2a1c'));
  for (let y = 14; y <= 145; y++) for (let x = 0; x < 320; x++) { const fil = Math.floor((y - 14) / 9), off = fil % 2 ? 9 : 0, col = Math.floor((x + off) / 18), q = (x + off) % 18, r = (y - 14) % 9;
    R.pset(x, y, r === 8 || q === 17 ? P('#8a929c') : h(col, fil, 51) < 0.2 ? P('#aab2bc') : h(x, y, 52) < 0.05 ? P('#9aa2ac') : P('#b8c0ca')); }
  // el conducto plateado (no entra en la zona de Atom)
  R.rect(0, 14, 262, 22, P('#a8b0b8')); R.rect(0, 14, 262, 15, P('#d8e0e8')); R.rect(0, 22, 262, 22, P('#6a727a')); for (let x = 20; x < 262; x += 40) R.rect(x, 14, x + 1, 22, P('#7a828a'));
  R.rect(262, 12, 266, 24, P('#7a828a'));
  // el ventanuco a ras de suelo de la calle (nieve)
  caja(196, 28, 246, 46, P('#f2f2ee'));
  // el suelo de cemento con manchas y la alfombra trenzada
  for (let y = 146; y <= 179; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 53); R.pset(x, y, n < 0.06 ? P('#6a6e74') : n > 0.94 ? P('#9a9ea4') : P('#80848a')); }
  R.rect(0, 145, 319, 146, P('#5a5e64'));
  for (let y = 150; y <= 176; y++) for (let x = 40; x <= 230; x++) { const d = ((x - 135) / 95) ** 2 + ((y - 163) / 13) ** 2; if (d > 1) continue; const a = Math.floor(Math.sqrt(d) * 8); R.pset(x, y, [P('#c84a3a'), P('#e8b860'), P('#3a7a9a'), P('#c84a3a'), P('#8a5a3a'), P('#e8b860'), P('#3a7a9a'), P('#6a2a2a')][a]); }
  // la caja de madera y la tele de tubo
  caja(26, 124, 104, 150, P('#b88a5a')); for (let y = 130; y < 150; y += 6) R.rect(27, y, 103, y, P('#8a6038')); R.rect(27, 125, 103, 126, P('#d8a870'));
  caja(30, 70, 100, 124, P('#4a4a52')); R.rect(31, 71, 99, 72, P('#6a6a74')); R.rect(90, 80, 97, 118, P('#3a3a42')); for (let y = 82; y < 116; y += 3) R.rect(91, y, 96, y, P('#2a2a30'));
  R.disco(93, 120, 1, P('#d83a3a')); R.linea(50, 70, 40, 52, P('#8a8a96')); R.linea(80, 70, 92, 54, P('#8a8a96'));
  // la consola encima de la caja y el cable
  caja(40, 140, 76, 148, P('#2a2a30')); R.rect(48, 138, 66, 140, P('#3a3a44')); R.pset(70, 143, P('#d83a3a'));
  // los pósters, la balda de refrescos, la lavadora y el calentador
  caja(116, 34, 140, 66, P('#2a3a6a')); R.disco(128, 48, 7, P('#e8a83a')); R.anillo(128, 48, 10, P('#f0d890')); for (let k = 0; k < 6; k++) R.pset(118 + k * 4, 38 + (k % 3) * 9, BL);
  caja(150, 30, 174, 62, P('#f0e8d0')); R.poligono([[152, 60], [162, 40], [172, 60]], P('#4a6a8a')); R.poligono([[158, 48], [162, 40], [166, 48]], BL);
  R.rect(116, 84, 186, 86, P('#8a6038')); for (let k = 0; k < 9; k++) { const x = 118 + k * 7; caja(x, 74, x + 5, 84, P(['#d83a3a', '#3a8ae8', '#e8b830', '#3ab86a'][k % 4])); R.rect(x + 1, 75, x + 4, 75, P('#c8ccd8')); }
  caja(252, 102, 288, 146, P('#e8ecf0')); R.rect(253, 103, 287, 110, P('#c8ccd4')); R.disco(260, 106, 1, P('#3a8ae8')); R.rect(266, 105, 282, 107, P('#2a2a30'));
  R.disco(270, 128, 12, K); R.disco(270, 128, 11, P('#a8b0b8'));
  R.rect(294, 64, 316, 146, K); R.rect(295, 65, 315, 146, P('#d8dce0')); R.rect(295, 65, 297, 146, P('#f2f4f6')); R.rect(311, 65, 315, 146, P('#a8acb0')); R.rect(299, 56, 301, 64, P('#c87a3a')); R.rect(309, 56, 311, 64, P('#3a7ac8'));
  R.rect(299, 120, 311, 128, P('#3a3a44')); R.rect(301, 122, 304, 124, P('#e8b830'));
};
const p5 = (t) => {
  capa('sotano', fondoSotano);
  // por el ventanuco: nieve en el suelo de fuera y copos
  R.recorte([197, 29, 245, 45]); R.rect(197, 29, 245, 45, P('#1a2448')); for (let x = 197; x <= 245; x++) for (let y = 40 + Ri(Math.sin(x * 0.3)); y <= 45; y++) R.pset(x, y, P('#e8ecf8')); NIEVE(t, 197, 29, 245, 45, 10, 4); R.recorte(null); R.rect(221, 29, 221, 45, P('#f2f2ee'));
  // la bombilla que se balancea y las luces de colores de la pared
  { const a = Math.sin(t * 1.4) * 0.15, bx = Ri(182 + Math.sin(a) * 18), by = Ri(14 + Math.cos(a) * 18); R.linea(182, 22, bx, by, K); R.disco(bx, by + 2, 3, P('#fff4b0')); R.rect(bx - 1, by - 1, bx + 1, by, P('#8a8a96')); cono(bx, by + 4, 140, 3, 30, P('#fff4c0'), 0.06); }
  for (let x = 110; x <= 240; x++) { const y = 70 + Ri(Math.abs(Math.sin(x * 0.07)) * 4); R.pset(x, y, P('#2a2a30')); if (x % 8 === 0) { const k = Math.floor(x / 8 + t * 2.5) % 5; R.disco(x, y + 2, 1, P(LUCES[k])); } }
  // la lavadora centrifuga
  for (let k = 0; k < 5; k++) { const a = t * 6 + k * 1.26; R.disco(Ri(270 + Math.cos(a) * 6), Ri(128 + Math.sin(a) * 6), 2, P(['#d83a3a', '#3a8ae8', '#f0d040', '#3ab86a', '#f2f2f6'][k])); } R.anillo(270, 128, 9, P('#6a7a8a'));
  // la pantalla: bloques que caen y el número grande: sube a 255 y en «zero» vuelve a 0
  const S = [34, 76, 89, 120]; R.rect(S[0], S[1], S[2], S[3], P('#0c0e16'));
  const n = t < EQUIPO ? 253 : t < LEJOS2 ? 254 : t < CERO - 0.4 ? 255 : t < CERO ? -1 : 0;
  R.recorte(S); if (n !== -1) for (let k = 0; k < 5; k++) { const u = (t * (0.8 + k * 0.1) + k * 0.23) % 1; bloque(37 + k * 10, Ri(78 + u * 40), 5, P('#a8b8c8')); }
  else for (let y = S[1]; y <= S[3]; y += 2) { const c = P(LUCES[Math.floor(h(y, Ri(t * 20)) * 5)]); R.linea(S[0], y, S[0] + Ri(h(y, 3, Ri(t * 20)) * 55), y, c); }
  R.recorte(null);
  if (n >= 0) { const fl = n === 0 && Math.sin((t - CERO) * 14) < 0 && t < CERO + 1.6; if (!fl) R.numero(String(n), 62, 106, { tam: 16, centro: true }); }
  if (t > CERO && t < CERO + 0.4) zona(S[0], S[1], S[2], S[3], BL, 0.6 * (1 - tramo(t, CERO, CERO + 0.4)));
  // el equipo: el que juega, el del portátil y la que apunta en su cuaderno; en «zero» saltan los tres
  const fiesta = t > CERO, salta = (k) => (fiesta ? Ri(Math.abs(Math.sin((t - CERO) * 8 + k)) * 5) : 0);
  const tec = Ri(Math.abs(Math.sin(t * 15)) * 1.5);
  const j1 = R.actor(TS.ninoJuega, 112, 164, t, { dir: -1, sinObjeto: true, sostiene: fiesta ? undefined : [110, 152 - tec], brazos: fiesta, salto: salta(0), sonrisa: fiesta, sorpresa: t > CERO - 0.4 && t < CERO, pal: { C: '#3a9a5a', c: '#2a7a44', F: '#3a3a4a' } });
  if (!fiesta) mandoJ(j1.mano[0] - 3, j1.mano[1], t); else mandoJ(100, 172, t);
  R.linea(fiesta ? 104 : j1.mano[0] - 9, fiesta ? 172 : j1.mano[1], 74, 146, K);
  const j2 = R.actor(TS.publico, 146, 166, t, { dir: -1, sostiene: fiesta ? undefined : [144, 154], dedo: t > LEJOS2 && t < EMPEZO, brazos: fiesta, salto: salta(1.3), sonrisa: fiesta, habla: t > LEJOS2 && t < EMPEZO && Math.sin(t * 9) > 0, pal: { C: '#e8963a', c: '#c8762a', H: '#2a1c14' } });
  if (!fiesta && !(t > LEJOS2 && t < EMPEZO)) { const [mx, my] = j2.mano; R.rect(mx - 7, my - 6, mx + 1, my, K); R.rect(mx - 6, my - 5, mx, my - 1, P('#3a5a8a')); R.pset(mx - 4, my - 3, P('#8ae8a0')); R.rect(mx - 8, my, mx + 2, my + 1, P('#8a8a96')); }
  const j3 = R.actor(TS.investigadora, 178, 166, t, { dir: -1, sinObjeto: fiesta, brazos: fiesta, salto: salta(2.1), sonrisa: fiesta, sorpresa: t > EMPEZO && t < CERO });
  if (fiesta) for (let k = 0; k < 3; k++) destello(Ri(50 + k * 12), Ri(84 + (k % 2) * 16), tramo(t, CERO + k * 0.15, CERO + 0.6 + k * 0.15));
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], {
  efectos: [[0.8, 'coche'], [SORPRESA + 0.15, 'guau'], [TRECE - 0.05, 'pop'], [WILLIS, 'boing'], [P3 + 0.3, 'tecleo'], [CONGELA, 'zumbido'],
    [P4 + 0.05, 'publico'], [P4 + 0.35, 'miau'], [JUGADORES, 'palmada'], [GANAR + 0.1, 'boing'], [EQUIPO, 'tic'], [LEJOS2, 'tic'], [CERO, 'campana'], [CERO + 0.3, 'publico']],
  cartela: '2023',
  año: (t) => (t < P2 ? Math.round(lerp(2000, 2023, tramo(t, CUARENTA, LATER + 0.4))) : t < P5 ? 2023 : 2024),
});
''')
