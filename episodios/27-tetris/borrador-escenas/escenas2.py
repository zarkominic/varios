# Borrador de escenas del ep27 (grupo S2): ts-centro, ts-corchetes, ts-disquetes.
# Formato del 11: E['id'] = (título, cabecera //, cuerpo). El cuerpo tiene a mano T, EL, E, R, M, tramo, lerp, hex y en(k, f).
E = {}

# ── lo común a las tres escenas (se pega delante de cada cuerpo) ──
H = r'''
import { ELENCO_TS as TS } from '/atomo/plato/kits/pixel-chibi.js';
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const li = (t, a, b) => Math.max(0, Math.min(1, (t - a) / Math.max(1e-6, b - a)));
const ez = (u) => u * u * (3 - 2 * u);
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const Q = Object.fromEntries(Object.entries({
  k: '#1a1420', blanco: '#f4f2ea', fos: '#5aff8a', fosS: '#1a6a32', fosM: '#2ea85a', fosL: '#c8ffd8', fosN: '#06120a', fosN2: '#0c2014',
  beige: '#d8ccb0', beigeS: '#a89c80', beigeL: '#ece4d0', beigeD: '#7a705c',
  madera: '#7a4a2a', maderaS: '#4a2a18', maderaL: '#9a6438', maderaD: '#3a2010', nogal: '#5a3420', nogalS: '#3a2014', nogalL: '#7a4a2c',
  verde: '#5e7a6a', verdeS: '#48604f', verdeL: '#78947f', yeso: '#d6cfb6', yesoS: '#c2bb9f', yesoL: '#e4dec8',
  noche0: '#141a3e', noche1: '#1e2650', noche2: '#2c3466', nube: '#3a4270', nubeL: '#4e5a8a', nubeS: '#262c58', ventana: '#1a1e3a', ventanaS: '#232848',
  luzV: '#f0c860', luzC: '#ffe8a0', rojo: '#c8302a', rojoS: '#8a1a18', rojoL: '#e8584a',
  metal: '#9aa4b4', metalS: '#6c7688', metalD: '#4a5262', metalL: '#c8d0dc', gris: '#8a8a84', grisS: '#5a5a56', grisL: '#b4b4ac',
  nieve: '#eef2f8', nieveS: '#b8c4dc', papel: '#f2ecd8', papelS: '#d8ceb0', lapiz: '#4a4a5a', te: '#b8642a', teL: '#d8843a', cristal: '#c8e0e8',
  oro: '#d8a840', oroS: '#9a7020', oroL: '#f0d070', piel: '#f6c290', vapor: '#e8eef4', marco: '#e8e2d2', marcoS: '#b8b0a0',
}).map(([k, v]) => [k, hex(v)]));
const FIJ = new Map();
// un fondo fijo: se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (k, f) => { let b = FIJ.get(k); if (!b) { b = R.nuevo(); const p = R.usar(b); f(); R.usar(p); FIJ.set(k, b); } R.copiar(b); };
const caja = (x0, y0, x1, y1, c, cL, cS) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, Q.k); R.rect(x0, y0, x1, y1, c); if (cL != null) { R.rect(x0, y0, x1, y0, cL); R.rect(x0, y0, x0, y1, cL); } if (cS != null) { R.rect(x0, y1, x1, y1, cS); R.rect(x1, y0, x1, y1, cS); } };
const trama = (x0, y0, x1, y1, c, c2, d = 0.1, k = 1) => { R.rect(x0, y0, x1, y1, c); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (h(x, y, k) < d) R.pset(x, y, c2); };
// madera en tablas horizontales: vetas, nudos y juntas
const madera = (x0, y0, x1, y1, c, cS, cL, alto = 8, k = 3) => {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0; y <= y1; y++) { const j = Math.floor((y - y0) / alto), f = (y - y0) % alto;
    if (f === alto - 1) { R.rect(x0, y, x1, y, cS); continue; }
    const fase = h(j, 0, k) * 300;
    for (let x = x0; x <= x1; x++) { const v = Math.sin((x + fase) * 0.11 + Math.sin((x + fase) * 0.031) * 3 + f * 0.9); if (v > 0.93) R.pset(x, y, cS); else if (v < -0.96 && f < alto - 2) R.pset(x, y, cL); } }
  for (let j = 0; y0 + j * alto <= y1; j++) { let x = x0 + Math.floor(h(j, 5, k) * 90); while (x <= x1) { R.rect(x, y0 + j * alto, x, Math.min(y1, y0 + j * alto + alto - 2), cS); x += 70 + Math.floor(h(j, x, k) * 60); } }
  for (let i = 0; i < Math.floor((x1 - x0) * (y1 - y0) / 2500); i++) { const nx = x0 + Math.floor(h(i, 8, k) * (x1 - x0)), ny = y0 + Math.floor(h(i, 9, k) * (y1 - y0)); R.pset(nx, ny, cS); R.pset(nx + 1, ny, cS); R.pset(nx, ny + 1, cL); }
};
// la ventana de noche a Moscú: cielo tramado, estrellas, nubes de tres tonos a tres velocidades, bloques con luces que se
// encienden, nieve que cae; o.alba (0–1) aclara el cielo hacia el amanecer. Todo queda dentro del hueco.
const ventanaNoche = (x0, y0, x1, y1, t, o = {}) => {
  const al = o.alba ?? 0, A = [Q.noche0, Q.noche1, Q.noche2], B = [hex('#3a3e70'), hex('#8a6a9a'), hex('#e8a07a')], W = x1 - x0, Hh = y1 - y0;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Hh, i = u < 0.4 ? 0 : u < 0.72 ? 1 : 2, c = mez(A[i], B[i], al), c2 = mez(A[Math.min(2, i + 1)], B[Math.min(2, i + 1)], al);
    for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 21) < ((u * 2.5) % 1) * 0.4 ? c2 : c); }
  if (al < 0.7) for (let i = 0; i < 9; i++) { const sx = x0 + 2 + Math.floor(h(i, 1, 22) * (W - 4)), sy = y0 + 2 + Math.floor(h(i, 2, 22) * Hh * 0.35); if (Math.sin(t * 3 + i * 2) > -0.3) R.pset(sx, sy, Q.nieve); }
  for (const [vel, cy, c, k] of [[1.2, 0.2, Q.nubeS, 0], [2.6, 0.32, Q.nube, 1], [4.4, 0.12, Q.nubeL, 2]]) for (let n = 0; n < 2; n++) {
    const cx = x0 + ((n * W * 0.55 + t * vel + k * 37) % (W + 36)) - 18, yy = y0 + Hh * cy + n * 3, cc = mez(c, B[1], al * 0.7);
    for (let dx = -10; dx <= 10; dx++) { const hh = Math.round(3 - Math.abs(dx) / 4 + h(dx, k, 23) * 1.4); for (let dy = -hh; dy <= 0; dy++) { const px = Math.round(cx + dx), py = Math.round(yy + dy); if (px >= x0 && px <= x1 && py >= y0 && py <= y1) R.pset(px, py, cc); } } }
  const base = y1 - 1;
  if (o.torre) { const tx = x0 + Math.round(W * o.torre); for (let y = base - Hh * 0.62; y <= base; y++) { const u = (y - base + Hh * 0.62) / (Hh * 0.62), ww = Math.round(1 + u * 6 + (u > 0.5 ? 3 : 0)); for (let x = tx - ww; x <= tx + ww; x++) if (x >= x0 && x <= x1) R.pset(x, Math.round(y), (x + Math.round(y)) % 5 === 0 && u > 0.3 && h(x, Math.floor(t / 2), 27) < 0.5 ? Q.luzV : hex('#22264a')); }
    const sy = Math.round(base - Hh * 0.62) - 2; R.pset(tx, sy, Q.rojoL); R.pset(tx - 1, sy + 1, Q.rojo); R.pset(tx + 1, sy + 1, Q.rojo); R.pset(tx, sy + 1, Q.rojoL); }
  for (let i = 0; i < 7; i++) { const bx = x0 - 4 + Math.floor(i * W / 5.6), bw = 10 + Math.floor(h(i, 3, 24) * 9), bh = 10 + Math.floor(h(i, 4, 24) * Hh * 0.3);
    for (let y = base - bh; y <= base; y++) for (let x = bx; x < bx + bw; x++) if (x >= x0 && x <= x1 && y >= y0) { const ven = (x - bx) % 3 === 1 && (y - base + bh) % 4 === 2, on = ven && h(Math.floor(x / 3) + Math.floor(t / 2.5 + i), Math.floor(y / 4), 25) < 0.42; R.pset(x, y, on ? Q.luzV : ven ? Q.ventanaS : Q.ventana); }
    for (let x = bx; x < bx + bw; x++) if (x >= x0 && x <= x1) R.pset(x, base - bh, Q.nieveS); }
  for (let i = 0; i < Math.round(W * Hh / 70); i++) { const sx = x0 + ((h(i, 5, 26) * W + Math.sin(t * 1.3 + i) * 3 + t * 5) % W), sy = y0 + ((h(i, 6, 26) * Hh + t * (7 + h(i, 7, 26) * 9)) % Hh); R.pset(Math.round(sx), Math.round(sy), h(i, 8, 26) < 0.3 ? Q.nieveS : Q.nieve); }
};
// marco blanco de doble hoja con travesaño, alféizar con nieve y escarcha en las esquinas
const marcoVentana = (x0, y0, x1, y1) => {
  R.rect(x0 - 3, y0 - 3, x1 + 3, y0 - 1, Q.marco); R.rect(x0 - 3, y1 + 1, x1 + 3, y1 + 3, Q.marcoS); R.rect(x0 - 3, y0 - 3, x0 - 1, y1 + 3, Q.marco); R.rect(x1 + 1, y0 - 3, x1 + 3, y1 + 3, Q.marcoS);
  const mx = Math.round((x0 + x1) / 2), my = Math.round(y0 + (y1 - y0) * 0.28); R.rect(mx - 1, y0, mx + 1, y1, Q.marco); R.rect(mx + 1, y0, mx + 1, y1, Q.marcoS); R.rect(x0, my - 1, x1, my, Q.marco);
  for (const [a, b, c, d] of [[x0 - 4, y0 - 4, x1 + 4, y0 - 4], [x0 - 4, y1 + 4, x1 + 4, y1 + 4], [x0 - 4, y0 - 4, x0 - 4, y1 + 4], [x1 + 4, y0 - 4, x1 + 4, y1 + 4]]) R.rect(a, b, c, d, Q.k);
  R.rect(x0 - 6, y1 + 4, x1 + 6, y1 + 7, Q.marco); R.rect(x0 - 6, y1 + 8, x1 + 6, y1 + 8, Q.k); R.rect(x0 - 6, y1 + 7, x1 + 6, y1 + 7, Q.marcoS);
  for (let x = x0; x <= x1; x++) { const n = Math.round(1 + h(x >> 1, 3, 28) * 2); for (let j = 0; j < n; j++) R.pset(x, y1 - j, j === n - 1 ? Q.nieveS : Q.nieve); }
  for (const [cx, cy, sx, sy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1], [mx - 2, y1, -1, -1], [mx + 2, y1, 1, -1]]) for (let i = 0; i < 6; i++) for (let j = 0; j < 6 - i; j++) if (h(i, j, cx + cy) < 0.55) R.pset(cx + sx * i, cy + sy * j, Q.nieveS);
};
// reloj de pared: esfera crema, aro, marcas, agujas (hora decimal hh)
const reloj = (cx, cy, r, hh, o = {}) => {
  R.disco(cx, cy, r + 1, Q.k); R.disco(cx, cy, r, o.aro ?? Q.metalD); R.disco(cx, cy, r - 1, Q.papel);
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; R.pset(Math.round(cx + Math.sin(a) * (r - 2)), Math.round(cy - Math.cos(a) * (r - 2)), i % 3 ? Q.papelS : Q.k); }
  const am = (hh % 1) * 6.283, ah = (hh % 12) / 12 * 6.283;
  R.linea(cx, cy, Math.round(cx + Math.sin(ah) * (r * 0.5)), Math.round(cy - Math.cos(ah) * (r * 0.5)), Q.k);
  R.linea(cx, cy, Math.round(cx + Math.sin(am) * (r * 0.8)), Math.round(cy - Math.cos(am) * (r * 0.8)), Q.k);
  if (o.seg != null) { const as = (o.seg % 60) / 60 * 6.283; R.linea(cx, cy, Math.round(cx + Math.sin(as) * (r * 0.85)), Math.round(cy - Math.cos(as) * (r * 0.85)), Q.rojo); }
  R.pset(cx, cy, Q.rojo);
};
// vapor que sube (de una taza o un vaso)
const vapor = (x, y, t, n = 3, alto = 10, c = Q.vapor, fuerza = 1) => { for (let i = 0; i < n; i++) { const f = (t * 0.7 + i / n) % 1; if (f > 0.9 * fuerza) continue; const yy = y - f * alto, xx = x + Math.sin(t * 2.2 + i * 2 + f * 5) * 2; R.pset(Math.round(xx), Math.round(yy), c); R.pset(Math.round(xx) + 1, Math.round(yy) - 1, c); if (f < 0.4) R.pset(Math.round(xx), Math.round(yy) - 2, c); } };
// el vaso de té en su posavasos de metal (el podstakánnik), de lado
const vasoTe = (x, y, t, o = {}) => {
  R.rect(x - 5, y - 13, x + 5, y, Q.k); R.rect(x - 4, y - 12, x + 4, y - 1, Q.cristal); R.rect(x - 4, y - 9, x + 4, y - 1, Q.te); R.rect(x - 4, y - 9, x - 3, y - 1, Q.teL);
  R.rect(x - 5, y - 7, x + 5, y, Q.k); R.rect(x - 4, y - 6, x + 4, y - 1, Q.oro); R.rect(x - 4, y - 6, x + 4, y - 6, Q.oroL); for (let i = -3; i <= 3; i += 2) R.pset(x + i, y - 4, Q.oroS); R.rect(x - 4, y - 1, x + 4, y - 1, Q.oroS);
  R.rect(x + 5, y - 6, x + 8, y - 6, Q.k); R.rect(x + 8, y - 6, x + 8, y - 2, Q.k); R.rect(x + 5, y - 2, x + 8, y - 2, Q.k); R.rect(x + 6, y - 5, x + 7, y - 3, Q.oroS);
  R.linea(x + 1, y - 10, x + 3, y - 17, Q.metalL); R.pset(x + 3, y - 17, Q.k);
  if (o.vapor !== false) vapor(x - 1, y - 14, t, 3, 11);
};
// los símbolos del terminal en una rejilla de 3 × 5 (solo símbolos, ninguna letra)
const GL = { '[': ['11.', '1..', '1..', '1..', '11.'], ']': ['.11', '..1', '..1', '..1', '.11'], '+': ['...', '.1.', '111', '.1.', '...'], '*': ['1.1', '.1.', '111', '.1.', '1.1'], '=': ['...', '111', '...', '111', '...'], '#': ['1.1', '111', '1.1', '111', '1.1'], '-': ['...', '...', '111', '...', '...'], '/': ['..1', '..1', '.1.', '1..', '1..'], '(': ['.1.', '1..', '1..', '1..', '.1.'], ')': ['.1.', '..1', '..1', '..1', '.1.'], ':': ['...', '.1.', '...', '.1.', '...'], '<': ['..1', '.1.', '1..', '.1.', '..1'], '>': ['1..', '.1.', '..1', '.1.', '1..'], '.': ['...', '...', '...', '...', '.1.'], '%': ['1.1', '..1', '.1.', '1..', '1.1'], '_': ['...', '...', '...', '...', '111'], '1': ['.1.', '11.', '.1.', '.1.', '111'], '0': ['111', '1.1', '1.1', '1.1', '111'], '6': ['111', '1..', '111', '1.1', '111'] };
const glifo = (x, y, ch, c, s = 1) => { const g = GL[ch]; if (!g) return; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '1') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); };
// un par de corchetes «[ ]» de cw × ch píxeles (la celda de las piezas de 1984), con su halo
const corchetes = (x, y, cw, ch, c, halo) => { const g = (a, b, d) => { R.rect(a, b, a + 1, b + ch - 1, c); R.rect(a + (d > 0 ? 2 : -2), b, a + (d > 0 ? 3 : -1), b + 1, c); R.rect(a + (d > 0 ? 2 : -2), b + ch - 2, a + (d > 0 ? 3 : -1), b + ch - 1, c); };
  if (halo != null) { R.rect(x, y - 1, x + 3, y - 1, halo); R.rect(x + cw - 4, y + ch, x + cw - 1, y + ch, halo); }
  g(x, y, 1); g(x + cw - 2, y, -1); };
// un disquete pequeño (7 × 7) para las manos y los mapas
const disquete = (x, y, c = Q.blanco) => { R.rect(x - 1, y - 1, x + 7, y + 7, Q.k); R.rect(x, y, x + 6, y + 6, hex('#2e2c36')); R.rect(x + 1, y, x + 5, y + 2, c); R.rect(x + 2, y + 1, x + 4, y + 1, Q.papelS); R.rect(x + 3, y + 4, x + 3, y + 5, Q.k); R.pset(x + 3, y + 4, Q.metal); R.pset(x, y, hex('#5a5866')); };
// el disquete grande (11 × 11), para que se lea a 640 px
const disqueteG = (x, y, c = Q.blanco) => { R.rect(x - 1, y - 1, x + 11, y + 11, Q.k); R.rect(x, y, x + 10, y + 10, hex('#2e2c36')); R.rect(x, y, x + 10, y, hex('#5a5866')); R.rect(x + 2, y + 1, x + 8, y + 4, c); R.rect(x + 3, y + 2, x + 7, y + 2, Q.papelS); R.rect(x + 3, y + 3, x + 6, y + 3, Q.papelS); R.disco(x + 5, y + 7, 2, Q.k); R.pset(x + 5, y + 7, Q.metal); R.rect(x + 5, y + 9, x + 5, y + 10, Q.k); R.pset(x + 9, y + 6, Q.k); };
'''

def esc(cab, cuerpo):
    return cab, H + cuerpo


# ═══════════════════════════════════════════════ TS-CENTRO ═══════════════════════════════════════════════
E['ts-centro'] = ('El centro de cálculo', '''// TS-CENTRO (frase 4), junio de 1984, cartela «1984». Cuatro planos:
// 1. el centro de cálculo de noche (centro/centro): Pázhitnov cruza la sala detrás de las mesas con un rollo de listados y
//    llega a su mesa en «Pajitnov»; la científica le saluda desde la otra mesa y el científico del café se vuelve;
// 2. corta en «computing»: inserto del banco de voz (fondo local): el armario de cinta gira, la mano pulsa la grabadora en
//    «He researched», la onda de la voz sale en el osciloscopio con «teach computers to understand speech» y la impresora
//    contesta con un «?» (el ordenador no entiende);
// 3. corta tras «speech»: su rincón a la hora libre (fondo local): la compañera se va, la luz del techo se apaga en «free
//    time», el reloj corre y Pázhitnov escribe rompecabezas que se clavan en el corcho en «puzzles»; en «favorite» se vuelve
//    a la caja de madera de la estantería;
// 4. corta en «with»: el rompecabezas de madera de cerca (fondo local): la mano coloca una pieza, cuenta los cinco
//    cuadrados de la última en «five squares» y la encaja en «fit inside a box»: la caja se completa.''', H + r'''
const a = (f) => en('centro', f);
const P2 = a(0.242), P3 = a(0.574), P4 = a(0.799);
const NOMBRE = a(0.178), INVESTIGA = a(0.421), ENSENA = a(0.47), HABLA_FIN = a(0.553), LIBRE = a(0.623), PUZLES = a(0.68), FAVORITO = a(0.732), CINCO = a(0.856), CUADROS = a(0.874), ENCAJA = a(0.932), CAJA = a(0.971);

// ── 1 · la sala de noche ──
const p1 = (t) => {
  T.centro(R, t, {});
  const u = li(t, 0.15, NOMBRE + 0.15), x = Math.round(lerp(266, 72, u)), llega = u >= 1;
  // la científica teclea en la mesa de la derecha y se vuelve a saludar cuando él pasa
  const saluda = t > 1.2 && t < 3.0;
  R.actor(TS.cientifica, 232, 150, t, { dir: saluda ? -1 : 1, dedo: saluda && t > 1.5, sonrisa: saluda, habla: saluda && Math.sin(t * 9) > 0 });
  // Pázhitnov con el rollo de listados bajo el brazo
  const pz = R.actor(TS.pazhitnov, x, 150, t, { dir: llega ? 1 : -1, anda: u > 0 && !llega, sostiene: !llega || t < NOMBRE + 0.6 ? true : undefined, sonrisa: t > NOMBRE + 0.6, habla: saluda && Math.sin(t * 8 + 1) > 0.2 });
  if (!llega || t < NOMBRE + 0.6) { const [mx, my] = pz.mano; R.rect(mx - 6, my - 3, mx + 3, my + 2, Q.k); R.rect(mx - 5, my - 2, mx + 2, my + 1, Q.papel); R.rect(mx - 5, my, mx + 2, my, hex('#a8d8a8')); R.rect(mx - 5, my - 2, mx - 5, my + 1, Q.papelS); }
  // el científico del café, de pie en el pasillo de la sala: bebe, se vuelve y levanta la taza
  const vuelto = t > 2.2;
  R.actor(TS.cientifico, 166, 168, t, { dir: vuelto ? -1 : 1, habla: t > 2.4 && t < 3.4 && Math.sin(t * 8) > 0, sonrisa: vuelto, dedo: t > NOMBRE + 0.2 && t < NOMBRE + 1.2 });
  if (!(t > NOMBRE + 0.2 && t < NOMBRE + 1.2)) vapor(vuelto ? 166 - 1 : 166 + 15, 168 - 22, t, 3, 9);
  T.centroDelante(R, t, { piezas: llega ? 1 : 0.7 });
  // el rollo de listados ya sobre la mesa
  if (llega && t >= NOMBRE + 0.6) { R.rect(66, 137, 80, 141, Q.k); R.rect(67, 138, 79, 140, Q.papel); R.rect(67, 139, 79, 139, hex('#a8d8a8')); }
};

// ── 2 · el banco de voz: la grabadora, el micrófono, el osciloscopio y la impresora ──
const ONDA = [[a(0.47), a(0.49)], [a(0.495), a(0.52)], [a(0.526), a(0.55)], [a(0.553), a(0.572)]];
const fondo2 = () => {
  trama(0, 0, 319, 70, Q.yeso, Q.yesoS, 0.09, 31);
  for (let y = 0; y < 8; y++) R.rect(0, y, 319, y, y < 6 ? hex('#cfc8ae') : Q.yesoS);
  trama(0, 71, 319, 103, Q.verde, Q.verdeS, 0.12, 32); R.rect(0, 70, 319, 71, Q.verdeS); R.rect(0, 72, 319, 72, Q.verdeL);
  // el armario de cinta (izquierda)
  caja(2, 24, 74, 120, Q.grisL, Q.blanco, Q.gris); R.rect(8, 25, 68, 28, Q.grisS); for (let i = 0; i < 7; i++) R.disco(13 + i * 8, 26, 1, i % 3 ? Q.fosS : Q.rojoS);
  caja(8, 30, 68, 68, hex('#2a2e36'), hex('#3a3e48'), Q.k); caja(8, 74, 68, 112, Q.gris, Q.grisL, Q.grisS); for (let y = 78; y < 110; y += 4) R.rect(12, y, 64, y, Q.grisS);
  // el cartel del dibujo de la voz: una boca, la onda y el ordenador (sin letras)
  caja(92, 24, 146, 56, Q.papel, Q.blanco, Q.papelS); R.rect(91, 23, 147, 23, Q.rojo);
  R.disco(102, 37, 5, Q.k); R.disco(102, 37, 4, Q.piel); R.rect(99, 37, 105, 38, Q.rojo);
  for (let x = 110; x < 126; x++) R.pset(x, Math.round(37 + Math.sin(x * 0.9) * (3 - Math.abs(x - 118) / 4)), Q.k);
  caja(128, 30, 142, 42, Q.beige, Q.beigeL, Q.beigeS); R.rect(130, 32, 140, 39, Q.fosN); glifo(132, 33, '?', Q.fos); R.rect(133, 33, 136, 37, Q.fosN); R.icono('?', 132, 32, Q.fos, Q.fosS); R.rect(132, 43, 138, 44, Q.k);
  // la estantería de carpetas (derecha, bajo la esquina de Atom)
  R.rect(254, 58, 318, 60, Q.maderaS); R.rect(254, 96, 318, 98, Q.maderaS); R.rect(254, 57, 318, 57, Q.maderaL);
  for (let i = 0; i < 9; i++) { const x = 256 + i * 7, c = [Q.rojoS, hex('#3a5a8a'), hex('#5a6a3a'), hex('#8a6a3a')][i % 4], hh = 28 + (i % 3) * 3; R.rect(x, 95 - hh, x + 5, 95, Q.k); R.rect(x + 1, 96 - hh, x + 4, 95, c); R.rect(x + 1, 88, x + 4, 90, Q.papel); }
  // la mesa
  madera(0, 104, 319, 160, Q.madera, Q.maderaS, Q.maderaL, 9, 33); R.rect(0, 104, 319, 104, Q.maderaL);
  R.rect(0, 161, 319, 179, Q.maderaS); R.rect(0, 161, 319, 161, Q.k); for (let x = 6; x < 320; x += 52) R.rect(x, 166, x + 40, 174, Q.maderaD);
  // los cascos y el cuaderno de ondas
  for (let q = 0; q <= 3.14; q += 0.05) { const x = Math.round(32 + Math.cos(q) * 12), y = Math.round(170 - Math.sin(q) * 9); R.rect(x, y - 1, x, y + 1, Q.k); R.pset(x, y, Q.metalD); }
  for (const x of [17, 41]) { caja(x, 164, x + 6, 176, hex('#3a3a44'), hex('#5a5a66'), Q.k); R.rect(x + 1, 166, x + 5, 174, hex('#6a5a4a')); }
  R.linea(47, 172, 70, 168, Q.k); R.linea(70, 168, 90, 158, Q.k);
  caja(186, 140, 232, 158, Q.papel, Q.blanco, Q.papelS); for (let x = 190; x < 228; x++) R.pset(x, Math.round(149 + Math.sin(x * 0.7) * 3 * Math.sin(x * 0.11)), Q.lapiz); R.rect(186, 140, 187, 158, Q.rojoS);
  R.linea(212, 160, 236, 152, Q.k); R.linea(212, 159, 235, 151, Q.oro);
};
const p2 = (t) => {
  fijo('banco', fondo2);
  // las bobinas del armario giran a tirones
  for (const [cx, k] of [[24, 0], [52, 1]]) { const ang = t * (Math.sin(t * 0.8 + k) > 0 ? 2.4 : -1.1); R.disco(cx, 49, 15, Q.k); R.disco(cx, 49, 14, Q.metal); R.disco(cx, 49, 12, hex('#5a4a3a')); R.disco(cx, 49, 4, Q.metalL);
    for (let s = 0; s < 3; s++) { const q = ang + s * 2.094; R.linea(cx, 49, Math.round(cx + Math.cos(q) * 10), Math.round(49 + Math.sin(q) * 10), Q.metalL); } R.disco(cx, 49, 2, Q.k); }
  R.rect(24, 64, 52, 64, hex('#5a4a3a'));
  for (let i = 0; i < 7; i++) if (Math.sin(t * (3 + i) + i * 2) > 0.2) R.disco(13 + i * 8, 26, 1, i % 3 ? Q.fos : Q.rojoL);
  // la grabadora de bobina abierta sobre la mesa
  const graba = t > INVESTIGA;
  caja(12, 120, 96, 154, Q.grisS, Q.gris, Q.k); R.rect(14, 122, 94, 124, Q.gris);
  for (const [cx, k] of [[30, 0], [62, 1]]) { const q0 = graba ? t * 3.2 : 0.3; R.disco(cx, 134, 9, Q.k); R.disco(cx, 134, 8, hex('#5a4a3a')); R.disco(cx, 134, 3, Q.metalL); for (let s = 0; s < 3; s++) { const q = q0 + s * 2.094 + k; R.pset(Math.round(cx + Math.cos(q) * 5), Math.round(134 + Math.sin(q) * 5), Q.metalL); } }
  R.rect(30, 143, 62, 143, hex('#5a4a3a'));
  // el vúmetro con su aguja y las teclas (la roja, la de grabar)
  caja(74, 128, 92, 138, Q.papel, Q.blanco, Q.papelS); const nivel = ONDA.some(([i, f]) => t > i && t < f) ? 0.5 + 0.5 * Math.abs(Math.sin(t * 17)) : graba ? 0.1 : 0;
  R.linea(83, 137, Math.round(83 - 7 + nivel * 14), 130, Q.k);
  const pulsa = li(t, INVESTIGA - 0.35, INVESTIGA) - li(t, INVESTIGA + 0.25, INVESTIGA + 0.6);
  for (let i = 0; i < 4; i++) { const xk = 70 + i * 6, abajo = (i === 3 && graba) ? 1 : 0; R.rect(xk, 145 + abajo, xk + 4, 150, Q.k); R.rect(xk + 1, 146 + abajo, xk + 3, 149, i === 3 ? Q.rojo : Q.metalL); }
  if (graba && Math.sin(t * 6) > 0) R.disco(92, 124, 1, Q.rojoL);
  // el cable del micrófono, el micrófono en su pie y el vaso de té
  R.linea(120, 150, 140, 156, Q.k); R.linea(140, 156, 160, 150, Q.k); R.linea(160, 150, 168, 118, Q.k);
  R.rect(108, 148, 126, 152, Q.k); R.rect(109, 149, 125, 151, Q.metalD); R.rect(116, 96, 118, 148, Q.k); R.rect(117, 96, 117, 147, Q.metalL);
  caja(109, 66, 125, 96, Q.metal, Q.metalL, Q.metalS); for (let y = 69; y < 94; y += 2) R.rect(111, y, 123, y, Q.metalD); R.rect(110, 80, 124, 81, Q.metalS);
  if (nivel > 0.3) for (let r = 0; r < 3; r++) { const rr = 8 + ((t * 20 + r * 5) % 15); for (let q = -0.7; q <= 0.7; q += 0.12) R.pset(Math.round(117 - Math.cos(q) * rr - 8), Math.round(81 + Math.sin(q) * rr), Q.blanco); }
  vasoTe(140, 146, t);
  // el osciloscopio: rejilla, la traza que duerme y la onda de la voz cuando habla
  caja(150, 40, 248, 120, Q.beige, Q.beigeL, Q.beigeS); R.rect(152, 116, 246, 118, Q.beigeD);
  R.rect(159, 50, 225, 104, Q.k); R.rect(160, 51, 224, 103, Q.fosN);
  for (let x = 160; x <= 224; x += 8) for (let y = 51; y <= 103; y += 2) R.pset(x, y, Q.fosN2); for (let y = 51; y <= 103; y += 8) for (let x = 160; x <= 224; x += 2) R.pset(x, y, Q.fosN2);
  const amp = ONDA.reduce((s, [i, f]) => s + Math.sin(Math.PI * li(t, i, f)), 0);
  let py = 77; for (let x = 161; x <= 223; x++) { const y = Math.round(77 + Math.sin(x * 0.5 + t * 14) * amp * 18 * Math.sin((x - 160) / 64 * Math.PI) * (0.6 + 0.4 * Math.sin(x * 0.13 + t * 5)) + Math.sin(x * 0.3 + t * 3) * 0.6); R.linea(x - 1, py, x, y, Q.fos); py = y; }
  if (amp > 0.2) for (let x = 161; x <= 223; x += 3) R.pset(x, 77, Q.fosM);
  for (let i = 0; i < 4; i++) { R.disco(236, 56 + i * 14, 4, Q.k); R.disco(236, 56 + i * 14, 3, Q.metalD); const q = t * 0.3 * (i % 2 ? 1 : -1) + i; R.pset(Math.round(236 + Math.cos(q) * 2), Math.round(56 + i * 14 + Math.sin(q) * 2), Q.blanco); }
  for (let i = 0; i < 6; i++) { R.rect(162 + i * 10, 108, 168 + i * 10, 112, Q.k); R.rect(163 + i * 10, 109, 167 + i * 10, 111, i === 2 ? Q.rojo : Q.grisL); }
  if (Math.sin(t * 5) > -0.5) R.disco(244, 108, 1, Q.fos);
  // la impresora de respuesta: el papel sube línea a línea y al final escribe «?»
  const resp = HABLA_FIN + 0.1, sube = Math.min(40, Math.floor((t - P2) * 3) + (t > resp ? Math.floor(li(t, resp, resp + 0.6) * 14) : 0));
  R.rect(260, 92 - sube, 306, 106, Q.k); R.rect(261, 93 - sube, 305, 106, Q.papel); for (let y = 95 - sube; y < 106; y += 4) R.rect(264, y, 264 + Math.floor(h(y, 1, 34) * 34), y, Q.lapiz); for (let y = 93 - sube; y < 106; y += 3) { R.pset(262, y, Q.papelS); R.pset(304, y, Q.papelS); }
  if (t > resp) { const yq = 92 - sube + 4; R.rect(270, yq - 1, 296, yq + 15, Q.papel); R.icono('?', 277, yq, Q.k, Q.papelS, 2); }
  caja(254, 104, 312, 136, Q.grisL, Q.blanco, Q.gris); R.rect(258, 104, 308, 108, Q.k); R.rect(260, 112, 306, 114, Q.grisS); for (let i = 0; i < 5; i++) R.rect(262 + i * 9, 124, 268 + i * 9, 130, Q.grisS);
  // la mano que pulsa la tecla roja de grabar
  if (pulsa > 0) T.brazo(R, Math.round(lerp(-10, 40, pulsa)), 196, Math.round(lerp(10, 82, pulsa)), Math.round(lerp(196, 148 + (t > INVESTIGA - 0.05 && t < INVESTIGA + 0.25 ? 1 : 0), pulsa)), '#5e6e58', 1, { codo: [Math.round(lerp(0, 52, pulsa)), Math.round(lerp(198, 172, pulsa))] });
};

// ── 3 · su rincón a la hora libre ──
const fondo3 = () => {
  trama(0, 0, 319, 88, Q.yeso, Q.yesoS, 0.08, 41); R.rect(0, 0, 319, 5, hex('#c6bfa4')); R.rect(0, 6, 319, 6, Q.yesoS);
  trama(0, 89, 319, 128, Q.verde, Q.verdeS, 0.12, 42); R.rect(0, 88, 319, 88, Q.verdeL); R.rect(0, 89, 319, 89, Q.verdeS);
  trama(0, 129, 319, 179, hex('#8a6a4a'), hex('#7a5a3c'), 0.15, 43); for (let y = 132; y < 180; y += 8) R.rect(0, y, 319, y, hex('#6a4a30')); R.rect(0, 128, 319, 128, Q.k);
  // la puerta con su perchero
  caja(10, 48, 48, 128, Q.madera, Q.maderaL, Q.maderaS); caja(15, 54, 43, 84, Q.maderaS, Q.madera, Q.maderaD); caja(15, 90, 43, 122, Q.maderaS, Q.madera, Q.maderaD); R.disco(44, 92, 2, Q.oro);
  // la estantería con libros, cajas de rompecabezas y una planta
  caja(176, 30, 234, 128, Q.madera, Q.maderaL, Q.maderaS); for (const y of [56, 82, 108]) { R.rect(178, y, 232, y + 2, Q.maderaS); R.rect(178, y, 232, y, Q.maderaL); }
  for (const [y0, k] of [[34, 0], [60, 1], [86, 2]]) { let x = 179; while (x < 228) { const w = 3 + Math.floor(h(x, k, 44) * 4), hh = 14 + Math.floor(h(x, k + 9, 44) * 7), c = [Q.rojoS, hex('#3a5a8a'), hex('#5a6a3a'), hex('#8a6a3a'), hex('#6a3a5a')][Math.floor(h(x, k, 45) * 5)]; R.rect(x, y0 + 21 - hh, x + w, y0 + 21, Q.k); R.rect(x + 1, y0 + 22 - hh, x + w - 1, y0 + 21, c); R.rect(x + 1, y0 + 24 - hh, x + w - 1, y0 + 24 - hh, Q.oroS); x += w + 1; if (k === 1 && x > 200) break; } }
  for (let i = 0; i < 2; i++) { caja(206 + i * 4, 70 - i * 8, 230, 81 - i * 8, Q.nogal, Q.nogalL, Q.nogalS); }
  caja(182, 98, 200, 107, hex('#b07a4a'), hex('#d09a64'), hex('#7a4a2a')); R.rect(186, 112, 196, 128, Q.k); R.rect(187, 113, 195, 127, hex('#a84a2a')); for (let i = 0; i < 9; i++) R.disco(186 + (i % 3) * 5, 108 - Math.floor(i / 3) * 3, 2, i % 2 ? hex('#3a7a3a') : hex('#5a9a4a'));
  // el corcho (las hojas se clavan en la escena)
  caja(242, 52, 312, 112, hex('#b8875a'), hex('#d0a070'), hex('#8a5a3a')); for (let i = 0; i < 90; i++) R.pset(244 + Math.floor(h(i, 1, 46) * 66), 54 + Math.floor(h(i, 2, 46) * 56), hex('#9a6a44'));
  caja(246, 56, 266, 76, Q.papel, Q.blanco, Q.papelS); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) R.rect(248 + i * 4, 58 + j * 4, 250 + i * 4, 60 + j * 4, (i + j) % 2 ? Q.papelS : Q.lapiz); R.disco(256, 56, 1, Q.rojo);
};
// la mesa (por delante de Pázhitnov: se pinta después de él)
const mesa3 = () => {
  R.rect(56, 129, 262, 129, Q.k); madera(57, 130, 261, 136, Q.nogal, Q.nogalS, Q.nogalL, 7, 47); R.rect(57, 130, 261, 130, Q.nogalL); R.rect(56, 136, 262, 170, Q.k); madera(58, 137, 260, 168, Q.nogalS, Q.maderaD, Q.nogal, 10, 48);
  caja(70, 142, 120, 162, Q.nogalS, Q.nogal, Q.maderaD); caja(198, 142, 248, 162, Q.nogalS, Q.nogal, Q.maderaD); R.rect(92, 151, 98, 152, Q.oro); R.rect(220, 151, 226, 152, Q.oro);
};
const HOJAS = [[LIBRE + 0.35, 270, 58, 0], [PUZLES, 288, 62, 1], [PUZLES + 0.75, 276, 84, 2]];
const hoja = (x, y, k) => { caja(x, y, x + 16, y + 18, Q.papel, Q.blanco, Q.papelS);
  if (k === 0) { for (let i = 0; i < 4; i++) { R.rect(x + 2, y + 3 + i * 4, x + 13, y + 3 + i * 4, Q.lapiz); } R.rect(x + 2, y + 3, x + 2, y + 15, Q.lapiz); R.rect(x + 13, y + 5, x + 13, y + 15, Q.lapiz); R.rect(x + 6, y + 6, x + 6, y + 10, Q.papel); }
  if (k === 1) { for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) R.disco(x + 4 + i * 4, y + 5 + j * 4, 1, Q.lapiz); R.linea(x + 4, y + 5, x + 12, y + 13, Q.rojo); }
  if (k === 2) { for (let i = 0; i < 3; i++) R.rect(x + 3 + i * 4, y + 4, x + 3 + i * 4, y + 13, hex('#c87a3a')); R.rect(x + 3, y + 4, x + 11, y + 4, hex('#c87a3a')); for (let i = 0; i < 3; i++) R.pset(x + 3 + i * 4, y + 3, Q.rojo); }
  R.disco(x + 8, y, 1, Q.rojo); };
const p3 = (t) => {
  fijo('rincon', fondo3);
  const hora = 17 + li(t, P3, P4) * 4.5;
  ventanaNoche(60, 22, 112, 78, t, { torre: 0.7 }); marcoVentana(60, 22, 112, 78);
  reloj(146, 40, 12, hora, { seg: t * 60 * 6 });
  for (const [ti, x, y, k] of HOJAS) if (t > ti + 0.45) hoja(x, y, k);
  // la compañera se despide y se va; la luz del techo se apaga a la hora libre
  const sale = li(t, P3 + 0.3, LIBRE + 0.6);
  // Pázhitnov detrás de la mesa escribe; se vuelve a la caja de madera de la estantería en «favorite»
  const escribe = t < FAVORITO - 0.1, mira = t > FAVORITO;
  const pz = R.actor(TS.pazhitnov, 134, 137, t, { dir: mira ? 1 : -1, sostiene: escribe ? [118 + Math.round(Math.sin(t * 9) * 2), 126 + Math.round(Math.abs(Math.sin(t * 5)))] : undefined, sonrisa: mira, dedo: t > FAVORITO + 0.5, sorpresa: t > FAVORITO && t < FAVORITO + 0.5 });
  mesa3();
  if (sale < 1) R.actor(TS.cientifica, Math.round(lerp(256, -20, sale)), 176, t, { dir: -1, anda: sale > 0, dedo: sale === 0, sonrisa: true });
  const apagada = t > LIBRE;
  if (apagada) T.tinte(R, 0, 179, [16, 20, 44], 0.5);
  // el flexo verde con su charco de luz cálida (por encima de la penumbra)
  const lx = 90; for (let y = 104; y <= 136; y++) { const w = Math.round((y - 104) * 0.9 + 6); for (let x = lx - w; x <= lx + w; x++) { const a0 = (apagada ? 0.42 : 0.16) * (1 - Math.abs(x - lx) / (w + 1)) * (0.6 + 0.4 * (y - 104) / 32); R.pset(x, y, mez(R.pget(x, y), Q.luzC, (x + y) % 2 ? a0 : a0 * 0.8)); } }
  R.rect(84, 122, 96, 130, Q.k); R.rect(85, 123, 95, 129, hex('#2a6a3a')); R.rect(89, 104, 91, 122, Q.oroS); R.poligono([[78, 104], [102, 104], [96, 96], [84, 96]], Q.k); R.poligono([[80, 103], [100, 103], [95, 97], [85, 97]], hex('#2a7a4a')); R.rect(82, 104, 98, 104, Q.luzC);
  // las hojas y el lápiz sobre la mesa; el vaso de té
  caja(108, 126, 128, 132, Q.papel, Q.blanco, Q.papelS); if (escribe) R.linea(pz.mano[0], pz.mano[1], pz.mano[0] - 3, pz.mano[1] - 5, Q.oro);
  vasoTe(240, 131, t);
  // las hojas que vuelan de la mesa al corcho
  for (const [ti, x, y, k] of HOJAS) { const v = li(t, ti, ti + 0.45); if (v > 0 && v < 1) { const fx = lerp(118, x, v), fy = lerp(124, y, v) - Math.sin(v * Math.PI) * 26; hoja(Math.round(fx), Math.round(fy), k); } }
  // la caja de madera de la estantería brilla cuando la mira
  if (mira) { const b = 0.5 + 0.5 * Math.sin(t * 8); for (let i = 0; i < 4; i++) { const q = t * 2 + i * 1.57, r = 6 + b * 3; R.pset(Math.round(219 + Math.cos(q) * r), Math.round(70 + Math.sin(q) * r * 0.6), Q.luzC); } }
};

// ── 4 · el rompecabezas de madera de cerca ──
const SOL = ['FIIIIILVVV', 'FFFLLLLZZV', 'YFNNNUUUZV', 'YNNWTUXUZZ', 'YYWWTXXXPP', 'YWWTTTXPPP'];
const TONOS = { F: '#c89458', I: '#e0b878', L: '#a8603a', V: '#d8a068', Z: '#6a4228', Y: '#a8603a', N: '#e0b878', U: '#6a4228', W: '#c89458', T: '#e0b878', X: '#c89458', P: '#d8a068' };
const CEL = 12, BX = 100, BY = 76;
const celdas = (k) => { const r = []; SOL.forEach((f, j) => [...f].forEach((c, i) => { if (c === k) r.push([i, j]); })); return r; };
const pieza = (k, ox, oy, o = {}) => { const cs = celdas(k), base = hex(TONOS[k]), L = mez(base, Q.blanco, 0.3), S = mez(base, Q.k, 0.35), set = new Set(cs.map(([i, j]) => i + ',' + j));
  const [i0, j0] = cs[0];
  for (const [i, j] of cs) { const x = ox + (i - i0) * CEL, y = oy + (j - j0) * CEL; R.rect(x, y, x + CEL - 1, y + CEL - 1, base);
    for (let q = 0; q < 4; q++) R.rect(x + 1, y + 2 + q * 3, x + CEL - 2, y + 2 + q * 3, h(i * 7 + q, j, 51) < 0.5 ? mez(base, S, 0.4) : base);
    if (!set.has(i + ',' + (j - 1))) R.rect(x, y, x + CEL - 1, y, L); if (!set.has((i - 1) + ',' + j)) R.rect(x, y, x, y + CEL - 1, L);
    if (!set.has(i + ',' + (j + 1))) R.rect(x, y + CEL - 1, x + CEL - 1, y + CEL - 1, S); if (!set.has((i + 1) + ',' + j)) R.rect(x + CEL - 1, y, x + CEL - 1, y + CEL - 1, S);
    if (!set.has(i + ',' + (j - 1))) R.rect(x - 1, y - 1, x + CEL, y - 1, Q.k); if (!set.has(i + ',' + (j + 1))) R.rect(x - 1, y + CEL, x + CEL, y + CEL, Q.k); if (!set.has((i - 1) + ',' + j)) R.rect(x - 1, y - 1, x - 1, y + CEL, Q.k); if (!set.has((i + 1) + ',' + j)) R.rect(x + CEL, y - 1, x + CEL, y + CEL, Q.k);
    if (o.cuenta != null) { const n = cs.findIndex(([a, b]) => a === i && b === j); if (n < o.cuenta) R.numero(String(n + 1), x + 4, y + 9, { color: Q.k, sombra: false }); } }
};
const casa = (k) => { const [i, j] = celdas(k)[0]; return [BX + i * CEL, BY + j * CEL]; };
const fondo4 = () => {
  // la pared de noche detrás de la mesa, la ventana nevada se pinta encima en cada fotograma
  trama(0, 0, 319, 48, hex('#3a4a44'), hex('#33423c'), 0.1, 52); R.rect(0, 46, 319, 48, hex('#2a3632'));
  // el estante con libros y cajas de rompecabezas, y el flexo verde al fondo de la mesa
  R.rect(92, 36, 178, 38, Q.maderaS); R.rect(92, 36, 178, 36, Q.maderaL); let bx = 94; while (bx < 150) { const w = 3 + Math.floor(h(bx, 1, 56) * 3), hh = 12 + Math.floor(h(bx, 2, 56) * 6), c = [Q.rojoS, hex('#3a5a8a'), hex('#5a6a3a'), hex('#8a6a3a')][Math.floor(h(bx, 3, 56) * 4)]; R.rect(bx, 35 - hh, bx + w, 35, Q.k); R.rect(bx + 1, 36 - hh, bx + w - 1, 35, c); bx += w + 1; }
  caja(154, 28, 176, 35, Q.nogal, Q.nogalL, Q.nogalS); caja(156, 20, 174, 27, hex('#b07a4a'), hex('#d09a64'), hex('#7a4a2a'));
  R.rect(18, 58, 50, 62, Q.k); R.rect(19, 59, 49, 61, hex('#2a6a3a')); R.rect(33, 44, 35, 58, Q.oroS); R.poligono([[14, 46], [54, 46], [48, 34], [20, 34]], Q.k); R.poligono([[16, 45], [52, 45], [47, 35], [21, 35]], hex('#2a7a4a')); R.rect(18, 46, 50, 47, Q.luzC); R.rect(22, 36, 46, 37, hex('#4a9a6a'));
  R.linea(50, 60, 70, 56, Q.k);
  madera(0, 49, 319, 179, Q.madera, Q.maderaS, Q.maderaL, 11, 53);
  // la sombra que tira la caja y la luz del flexo en la mesa
  for (let y = 60; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 60) * 0.8, y - 70); if (d < 150 && h(x, y, 54) < (1 - d / 150) * 0.25) R.pset(x, y, hex('#b07a48')); else if (d > 210 && h(x, y, 55) < 0.25) R.pset(x, y, Q.maderaS); }
  // el cuaderno con el dibujo de la caja y el lápiz
  caja(10, 120, 70, 172, Q.papel, Q.blanco, Q.papelS); for (let y = 124; y < 170; y += 4) R.rect(12, y, 68, y, hex('#c8d8e8')); R.rect(16, 120, 16, 172, Q.rojoL);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) { const x = 24 + i * 7, y = 134 + j * 7; R.rect(x, y, x + 7, y, Q.lapiz); R.rect(x, y, x, y + 7, Q.lapiz); } R.rect(24, 155, 66, 155, Q.lapiz); R.rect(66, 134, 66, 155, Q.lapiz);
  R.linea(40, 176, 78, 164, Q.k); R.linea(40, 175, 77, 163, Q.oro); R.linea(41, 176, 78, 165, Q.oroS); R.pset(39, 176, Q.lapiz);
  // la tapa de la caja apoyada a la derecha
  caja(244, 66, 312, 108, Q.nogal, Q.nogalL, Q.nogalS); caja(250, 72, 306, 102, Q.nogalS, Q.nogal, Q.maderaD); for (let i = 0; i < 4; i++) R.rect(258 + i * 12, 82, 266 + i * 12, 90, mez(Q.nogal, Q.oro, 0.4));
  // la caja vacía (bandeja) con su marco
  caja(BX - 7, BY - 7, BX + 10 * CEL + 6, BY + 6 * CEL + 6, Q.nogal, Q.nogalL, Q.nogalS); R.rect(BX - 1, BY - 1, BX + 10 * CEL, BY + 6 * CEL, Q.k); R.rect(BX, BY, BX + 10 * CEL - 1, BY + 6 * CEL - 1, Q.maderaD);
  for (let x = BX; x < BX + 120; x += 2) R.pset(x, BY + 2, hex('#2a1408'));
  R.rect(BX - 7, BY + 6 * CEL + 7, BX + 10 * CEL + 7, BY + 6 * CEL + 9, hex('#4a2a14'));
};
const p4 = (t) => {
  fijo('caja', fondo4);
  ventanaNoche(196, 6, 256, 40, t, {}); R.rect(193, 3, 259, 5, Q.marco); R.rect(193, 41, 259, 44, Q.marco); R.rect(193, 3, 195, 44, Q.marco); R.rect(257, 3, 259, 44, Q.marcoS); R.rect(225, 6, 226, 40, Q.marco);
  // al final, la mano derecha coge el vaso de té y se lo lleva (la pausa satisfecha)
  const toma = li(t, CAJA + 0.5, CAJA + 1.1), lleva = li(t, CAJA + 1.2, E.duracion - 0.2), gxV = 294, gyV = Math.round(162 - Math.sin(lleva * Math.PI) * 30);
  vasoTe(gxV, gyV, t);
  for (const k of 'FIVZYNUWTP') { const [x, y] = casa(k); pieza(k, x, y); }
  // 1) la L: la mano la coge del borde de la mesa y la mete en su hueco
  const uL = li(t, P4 + 0.1, P4 + 1.1), [lx, ly] = casa('L');
  const xL = Math.round(lerp(84, lx, ez(uL))), yL = Math.round(lerp(150, ly, ez(uL)) - Math.sin(uL * Math.PI) * 18);
  pieza('L', xL, yL);
  // 2) la X: la última; la mano la levanta, cuenta sus cinco cuadrados y la encaja en «fit»
  const [xx, xy] = casa('X'), coge = li(t, P4 + 1.4, CINCO - 0.2), baja = li(t, ENCAJA - 0.4, ENCAJA);
  const cxX = Math.round(lerp(lerp(258, 226, ez(coge)), xx, ez(baja))), cyX = Math.round(lerp(lerp(124, 62, ez(coge)), xy, ez(baja)));
  const cuenta = t < CINCO ? 0 : Math.min(5, 1 + Math.floor((t - CINCO) / 0.17));
  if (baja < 1) pieza('X', cxX, cyX + (baja > 0 ? 0 : 0), { cuenta: baja === 0 ? cuenta : 0 }); else pieza('X', xx, xy);
  // el brillo de la caja completa
  if (t > CAJA - 0.1 && t < CAJA + 1.2) { const v = li(t, CAJA - 0.1, CAJA + 1.2); for (let i = 0; i < 10; i++) { const q = i / 10 * 6.283, r = 20 + v * 60; const sx = Math.round(BX + 60 + Math.cos(q) * r * 1.3), sy = Math.round(BY + 36 + Math.sin(q) * r * 0.7); if (sy > 48 && sy < 176) { R.pset(sx, sy, Q.luzC); R.pset(sx + 1, sy, Q.luzV); R.pset(sx, sy + 1, Q.luzV); } } R.rect(BX - 6, BY - 7, BX + 10 * CEL + 5, BY - 7, Q.luzC); }
  // la mano: va por la L, la coloca, vuelve por la X, la sostiene y la encaja; luego se retira
  // la mano izquierda lleva la L (la coge por su cuadrado de abajo a la izquierda) y se retira
  { const v = t < P4 + 1.1 ? 0 : li(t, P4 + 1.1, P4 + 1.7), hx = Math.round(lerp(xL - 40, -40, v)), hy = Math.round(lerp(yL + 18, 200, v));
    if (v < 1) T.brazo(R, Math.round(hx - 50), 214, hx, hy, '#5e6e58', 1, { codo: [hx - 34, Math.min(204, hy + 42)] }); }
  // la mano derecha va por la X, la sostiene, la encaja y se retira
  let mx, my;
  if (t < P4 + 1.4) { const v = li(t, P4 + 0.6, P4 + 1.4); mx = Math.round(lerp(340, cxX + 22, v)); my = Math.round(lerp(200, cyX + 6, v)); }
  else if (t < ENCAJA + 0.25) { mx = cxX + 22; my = cyX + 6; }
  else if (t < CAJA + 0.5) { const v = li(t, ENCAJA + 0.25, ENCAJA + 1.1); mx = Math.round(lerp(xx + 22, 340, v)); my = Math.round(lerp(xy + 6, 200, v)); }
  else if (toma < 1) { mx = Math.round(lerp(340, gxV + 10, toma)); my = Math.round(lerp(200, gyV - 7, toma)); }
  else { mx = gxV + 10; my = gyV - 7; }
  if (mx < 330) T.brazo(R, Math.min(360, mx + 60), 214, mx + 14, my, '#5e6e58', -1, { codo: [mx + 44, Math.min(200, my + 46)] });
};
const efectos = [[NOMBRE + 0.65, 'papel'], [P2 + 0.3, 'zumbido'], [INVESTIGA, 'interruptor'], [HABLA_FIN + 0.15, 'tecleo'], [LIBRE, 'interruptor'], [PUZLES + 0.45, 'papel'], [FAVORITO + 0.1, 'brillo'], [P4 + 1.1, 'toc'], [ENCAJA, 'toc'], [CAJA, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1984', año: 1984, efectos });
''')


# ═══════════════════════════════════════════════ TS-CORCHETES ═══════════════════════════════════════════════
E['ts-corchetes'] = ('Los corchetes', '''// TS-CORCHETES (frase 5), 1984. Cuatro planos:
// 1. el Elektronika 60 (fondo local): el terminal junto a la caja del procesador; las manos teclean, intenta dibujar un
//    círculo y la pantalla lo rompe en «couldn't draw»; luego se llena de símbolos en «letters and symbols» y un «[ ]»
//    se ilumina (la idea);
// 2. corta en «So»: la pantalla de cerca (inserto): cinco «[ ]» forman la pieza en «brackets», uno salta en «cut them
//    down to four» y la pieza cae en «made them fall»;
// 3. corta en «and added»: la mesa de Pázhitnov (centro/terminal): la fila de abajo se llena, parpadea en «row was full»
//    y desaparece en «disappeared»; la compañera de detrás se asombra;
// 4. corta en «He called»: el cuaderno de cuadros (inserto): el lápiz dibuja cuatro cuadrados y un 4 en «Tetra», un
//    templo griego en «Greek», la raqueta en «tennis» (pasa una pelota de verdad) y un corazón en «favorite sport».''', H + r'''
const a = (f) => en('corchetes', f);
const P2 = a(0.289), P3 = a(0.541), P4 = a(0.781);
const NO_DIBUJA = a(0.133), SIMBOLOS = a(0.2), IDEA = a(0.255), CORCH = a(0.348), CORTA = a(0.412), CAE = a(0.495), CAMBIA = a(0.601), FILA = a(0.673), LLENA = a(0.695), DESAP = a(0.73), TETRA = a(0.804), GRIEGO = a(0.868), TENIS = a(0.917), DEPORTE = a(0.949);

// ── 1 · el Elektronika 60 ──
const fondo1 = () => {
  trama(0, 0, 319, 74, hex('#b8c4b0'), hex('#a8b4a0'), 0.1, 61); R.rect(0, 0, 319, 4, hex('#9aa496')); R.rect(0, 5, 319, 5, hex('#8a9486'));
  for (let x = 0; x < 320; x += 14) { R.rect(x, 75, x + 13, 126, Q.madera); R.rect(x, 75, x, 126, Q.maderaL); R.rect(x + 13, 75, x + 13, 126, Q.maderaS); for (let y = 78; y < 126; y += 3) if (h(x, y, 62) < 0.4) R.rect(x + 3, y, x + 3 + Math.floor(h(x, y, 63) * 7), y, Q.maderaS); }
  R.rect(0, 74, 319, 75, Q.maderaD); R.rect(0, 76, 319, 76, Q.maderaL);
  // la ventana (lejos de la esquina de Atom)
  marcoVentana(236, 24, 270, 70);
  // la estantería de manuales a la derecha
  R.rect(280, 56, 319, 58, Q.maderaS); R.rect(280, 90, 319, 92, Q.maderaS); for (let i = 0; i < 6; i++) { const x = 282 + i * 6, c = [hex('#3a5a8a'), Q.rojoS, hex('#5a6a3a')][i % 3]; R.rect(x, 64, x + 4, 89, Q.k); R.rect(x + 1, 65, x + 3, 89, c); R.rect(x + 1, 80, x + 3, 81, Q.oro); }
  // la mesa
  madera(80, 126, 319, 156, Q.nogal, Q.nogalS, Q.nogalL, 8, 64); R.rect(80, 126, 319, 126, Q.nogalL); R.rect(80, 157, 319, 179, Q.nogalS); R.rect(80, 157, 319, 157, Q.k); for (let x = 90; x < 320; x += 60) caja(x, 162, x + 46, 176, Q.nogal, Q.nogalL, Q.maderaD);
  trama(0, 127, 79, 179, hex('#6a5a4a'), hex('#5a4a3c'), 0.2, 65);
  // la caja del procesador Elektronika 60 en su mueble (izquierda), con las disqueteras de 8 pulgadas
  caja(6, 30, 76, 176, Q.beige, Q.beigeL, Q.beigeS); R.rect(10, 36, 72, 64, hex('#4a3a5a')); R.rect(10, 36, 72, 37, hex('#6a5a7a'));
  for (const y of [84, 112]) { caja(12, y, 70, y + 22, Q.beigeL, Q.blanco, Q.beigeS); R.rect(18, y + 9, 64, y + 11, Q.k); R.rect(38, y + 4, 44, y + 7, Q.beigeD); }
  for (let y = 142; y < 172; y += 3) R.rect(12, y, 70, y, Q.beigeS);
  // el listado, la lámpara y el teclado pintado en la escena
  caja(258, 108, 300, 124, hex('#e8f0e0'), Q.blanco, hex('#a8c8a0')); for (let y = 111; y < 124; y += 3) R.rect(262, y, 296, y, hex('#a8d8a8'));
  // el terminal (la caja beis, el marco y la pantalla)
  caja(100, 26, 226, 124, Q.beige, Q.beigeL, Q.beigeS); R.rect(104, 30, 222, 31, Q.beigeL);
  R.rect(110, 34, 214, 108, Q.beigeD); R.rect(113, 37, 211, 105, Q.k);
  for (let i = 0; i < 6; i++) R.rect(128 + i * 12, 112, 136 + i * 12, 113, Q.beigeS); R.disco(206, 116, 3, Q.k); R.disco(206, 116, 2, Q.beigeD);
  R.rect(140, 124, 186, 128, Q.beigeS);
  caja(96, 130, 232, 150, Q.beigeL, Q.blanco, Q.beigeS);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 16; i++) { const x = 102 + i * 8 + (j % 2) * 2, y = 133 + j * 5; R.rect(x, y, x + 5, y + 3, Q.k); R.rect(x, y, x + 5, y + 2, i > 13 ? hex('#8a7a6a') : Q.beigeL); }
};
// la pantalla: el cursor, el intento de círculo que se rompe, y luego las filas de símbolos
const FILAS = ['>[ ]+[ ]=', '#*(:)-<>%', '[ ]/[ ]*[ ]', '::==++--', '(%)(%)<>', '[ ][ ][ ]'];
const pantalla1 = (t, x0, y0, x1, y1) => {
  R.rect(x0, y0, x1, y1, Q.fosN); for (let y = y0; y <= y1; y += 2) R.rect(x0, y, x1, y, Q.fosN2);
  glifo(x0 + 3, y0 + 3, '>', Q.fos); if (Math.floor(t * 3) % 2) R.rect(x0 + 8, y0 + 3, x0 + 10, y0 + 7, Q.fos);
  if (t < SIMBOLOS - 0.1) {
    // el intento de círculo: se traza... y en «couldn't draw» se rompe en escalones y ruido, con la X que parpadea
    const u = li(t, 1.0, NO_DIBUJA), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + 3, rompe = t > NO_DIBUJA;
    for (let q = 0; q < u * 6.283; q += 0.05) { let px = cx + Math.cos(q) * 22, py = cy + Math.sin(q) * 18; if (rompe) { px = Math.round(px / 6) * 6 + (h(Math.round(q * 20), Math.floor(t * 12), 66) - 0.5) * 4; py = Math.round(py / 6) * 6; } R.pset(Math.round(px), Math.round(py), Q.fos); }
    if (rompe) { for (let i = 0; i < 30; i++) R.pset(x0 + Math.floor(h(i, Math.floor(t * 15), 67) * (x1 - x0)), y0 + Math.floor(h(i, Math.floor(t * 15) + 3, 67) * (y1 - y0)), Q.fosM); if (Math.floor(t * 4) % 2) R.icono('X', Math.round(cx) - 5, Math.round(cy) - 5, Q.fosL, Q.fosS, 2); }
  } else {
    const n = li(t, SIMBOLOS - 0.1, SIMBOLOS + 0.9) * FILAS.length;
    FILAS.forEach((f, j) => { const vis = Math.max(0, Math.min(f.length, Math.floor((n - j) * f.length))); for (let i = 0; i < vis; i++) glifo(x0 + 3 + i * 5, y0 + 11 + j * 8, f[i], Q.fos); });
    // la idea: un «[ ]» se ilumina en grande
    if (t > IDEA) { const v = li(t, IDEA, IDEA + 0.3), bx = x0 + 63, by = y0 + 50; R.rect(bx - 2, by - 2, bx + 27, by + 15, Q.fosN); corchetes(bx, by, 26 * v + 1 | 0, 14, Q.fosL, Q.fosM); }
  }
};
const p1 = (t) => {
  fijo('elektronika', fondo1);
  ventanaNoche(236, 24, 270, 70, t, {});
  pantalla1(t, 114, 38, 210, 104);
  // el resplandor de la pantalla en el marco
  if (Math.sin(t * 40) > 0) R.rect(113, 37, 211, 37, Q.fosS);
  // los pilotos de la caja del procesador y de las disqueteras
  for (let i = 0; i < 12; i++) R.disco(15 + i * 5, 50, 1, Math.sin(t * (2 + i * 0.7) + i) > 0 ? (i % 4 ? Q.rojoL : Q.luzV) : hex('#5a4a5a'));
  for (let i = 0; i < 12; i++) { const arriba = h(i, Math.floor(t * 0.5), 68) < 0.5; R.rect(14 + i * 5, 56 + (arriba ? 0 : 3), 15 + i * 5, 60 + (arriba ? 0 : 3), i % 3 ? Q.blanco : Q.rojo); }
  for (const [y, k] of [[84, 0], [112, 1]]) if (Math.sin(t * 5 + k * 2) > 0.3) R.disco(64, y + 5, 1, Q.rojoL);
  // la taza de té con su vapor y la luz del techo que vibra
  vasoTe(250, 128, t);
  if (Math.sin(t * 31) > 0.9) R.rect(0, 0, 319, 1, Q.blanco);
  // las dos manos teclean (antes del intento y para llenar de símbolos); se paran en seco cuando se rompe
  const tec = (t > 0.4 && t < NO_DIBUJA) || (t > SIMBOLOS - 0.2 && t < IDEA);
  const kL = tec ? Math.round(Math.abs(Math.sin(t * 13)) * 2) : 0, kR = tec ? Math.round(Math.abs(Math.cos(t * 11)) * 2) : 0;
  const quieto = t > NO_DIBUJA && t < SIMBOLOS - 0.2;
  T.brazo(R, 92, 214, 140 + (quieto ? -6 : 0), 144 + kL - (quieto ? 2 : 0), '#5e6e58', 1, { codo: [104, 176] });
  T.brazo(R, 252, 214, 190 + (quieto ? 6 : 0), 144 + kR - (quieto ? 2 : 0), '#5e6e58', -1, { codo: [240, 176] });
};

// ── 2 · la pantalla de cerca: la pieza de corchetes ──
const SX0 = 30, SY0 = 18, SX1 = 290, SY1 = 158, CW = 18, CH = 14;
const marco2 = () => {
  // el bisel de plástico beis, con sus tornillos, el piloto y la rejilla
  R.rect(0, 0, 319, 179, Q.beige);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (h(x, y, 71) < 0.06) R.pset(x, y, Q.beigeS);
  R.rect(0, 0, 319, 2, Q.beigeL); R.rect(0, 166, 319, 179, Q.beigeS); R.rect(0, 166, 319, 166, Q.beigeD);
  for (let x = 8; x < 120; x += 4) R.rect(x, 170, x + 1, 176, Q.beigeD);
  R.disco(300, 172, 3, Q.k); R.disco(300, 172, 2, Q.beigeD); R.disco(276, 172, 3, Q.k); R.disco(276, 172, 2, Q.beigeD);
  for (const [x, y] of [[8, 8], [311, 8], [8, 158], [311, 158]]) { R.disco(x, y, 2, Q.beigeD); R.pset(x - 1, y, Q.k); R.pset(x + 1, y, Q.k); }
  // el hueco de la pantalla con las esquinas redondeadas
  R.rect(SX0 - 6, SY0 - 6, SX1 + 6, SY1 + 6, Q.beigeD); R.rect(SX0 - 3, SY0 - 3, SX1 + 3, SY1 + 3, Q.k);
};
const pantalla2 = (t) => {
  for (let y = SY0; y <= SY1; y++) { const d = Math.abs(y - (SY0 + SY1) / 2) / ((SY1 - SY0) / 2); const c = d > 0.85 ? hex('#040a06') : Q.fosN; R.rect(SX0, y, SX1, y, c); if (y % 2) R.rect(SX0, y, SX1, y, mez(c, Q.k, 0.35)); }
  for (const [x, y] of [[SX0, SY0], [SX1, SY0], [SX0, SY1], [SX1, SY1]]) for (let i = 0; i < 5; i++) for (let j = 0; j < 5 - i; j++) R.pset(x + (x === SX0 ? i : -i), y + (y === SY0 ? j : -j), Q.k);
};
// la pila del fondo de la pantalla (filas incompletas a lo ancho de toda la pantalla, sin pozo)
const PILA = [[0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1]];
const celda = (i, j, c = Q.fos, halo = Q.fosS) => corchetes(SX0 + 2 + i * CW, SY0 + 4 + j * CH, CW - 3, CH - 3, c, halo);
const PIEZA5 = [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]], PIEZA4 = [[0, 0], [1, 0], [2, 0], [1, 1]];
const p2 = (t) => {
  fijo('bisel', marco2); pantalla2(t);
  PILA.forEach((f, j) => f.forEach((v, i) => { if (v) celda(i, 8 + j, Q.fosM, Q.fosS); }));
  // la pieza se escribe corchete a corchete
  const escritos = Math.min(5, Math.floor(li(t, P2 + 0.25, CORCH) * 5 + 0.0001) + (t >= CORCH ? 1 : 0));
  const brillo = t > CORCH && t < CORCH + 0.5 && Math.floor(t * 10) % 2;
  const sale = li(t, CORTA, CORTA + 0.7), cae = li(t, CAE, CAE + 0.75), j0 = Math.round(lerp(1, 6, cae * cae));
  const lista = t < CORTA ? PIEZA5.slice(0, escritos) : PIEZA4;
  lista.forEach(([i, j]) => celda(6 + i, j0 + j, brillo ? Q.fosL : Q.fos, Q.fosM));
  // el quinto cuadrado salta y se apaga al cortarla a cuatro
  if (t >= CORTA && sale < 1) { const x = SX0 + 2 + 7 * CW + Math.round(sale * 40), y = SY0 + 4 + (1 + 2) * CH + Math.round(sale * sale * 50 - Math.sin(sale * Math.PI) * 20); if (Math.floor(t * 12) % 2 || sale < 0.3) corchetes(x, y, CW - 3, CH - 3, Q.fosM); }
  // la línea del corte
  if (t > CORTA - 0.15 && t < CORTA + 0.3) for (let x = SX0 + 2 + 6 * CW; x < SX0 + 2 + 9 * CW; x += 2) R.pset(x, SY0 + 4 + 3 * CH - 2, Q.fosL);
  // al caer, otra pieza asoma arriba
  if (t > CAE + 0.75) { const v = li(t, CAE + 0.8, E.duracion); [[0, 0], [0, 1], [1, 1], [1, 2]].forEach(([i, j]) => { const jj = Math.round(lerp(-2, 2, v)) + j; if (jj >= 0) celda(2 + i, jj); }); }
  // el reflejo del cristal: el brillo de la lámpara arriba a la izquierda y la silueta de Pázhitnov abajo a la derecha
  for (let i = 0; i < 40; i++) R.pset(SX0 + 10 + i, SY0 + 10 + Math.round(i * 0.3), mez(Q.fosN, Q.blanco, 0.18));
  for (let y = 108; y < SY1; y++) for (let x = 220; x < 280; x++) { const dx = (x - 249) / 15, dy = (y - 126) / 17; if ((dx * dx + dy * dy < 1 || (y > 140 && Math.abs(x - 249) < 24 + (y - 140))) && (x + y) % 2 === 0) R.pset(x, y, hex('#163a24')); }
  // el reflejo de la ventana del cuarto, arriba a la derecha
  for (let y = 26; y < 70; y++) for (let x = 236; x < 278; x++) if ((x === 236 || x === 277 || y === 26 || y === 69 || x === 256 || y === 40) && (x + y) % 2 === 0) R.pset(x, y, hex('#1a3a2a'));
  // la franja de barrido que baja
  const by = SY0 + ((t * 40) % (SY1 - SY0)); for (let x = SX0; x <= SX1; x += 2) R.pset(x, Math.round(by), Q.fosS);
};

// ── 3 · la mesa de Pázhitnov: la fila que desaparece ──
const p3 = (t) => {
  T.centro(R, t, { camara: 'terminal' });
  const fila = t < FILA ? 0 : t < DESAP ? 0.7 * li(t, FILA, DESAP) : 0.7 + 0.3 * li(t, DESAP, DESAP + 0.35);
  R.actor(TS.cientifica, 190, 125, t, { dir: -1, dedo: t > CAMBIA && t < CAMBIA + 1.2, habla: t > CAMBIA && t < CAMBIA + 1.2 && Math.sin(t * 9) > 0, sorpresa: t > DESAP && t < DESAP + 0.8, sonrisa: t > DESAP + 0.8 });
  const d = T.centroDelante(R, t, { camara: 'terminal', fila });
  // el decorado escribe una cuenta de filas arriba a la derecha de la pantalla: se tapa (parece un marcador)
  for (let y = 40; y <= 52; y++) { const c = R.pget(96, y); R.rect(108, y, 136, y, c); }
  // la fila que se va: un destello blanco a lo ancho de la pantalla y chispas que suben
  if (t > DESAP - 0.05 && t < DESAP + 0.45) { const v = li(t, DESAP - 0.05, DESAP + 0.45); for (let x = 40; x <= 136; x++) for (let y = 96; y <= 102; y++) if ((x + y + Math.floor(t * 20)) % 2 || v < 0.4) R.pset(x, y, mez(R.pget(x, y), Q.blanco, 0.85 * (1 - v))); for (let i = 0; i < 14; i++) R.pset(42 + i * 7, Math.round(98 - v * 22 - (i % 3) * 3), Q.fosL); }
  // el «!» de la compañera
  if (t > DESAP && t < DESAP + 1.0 && Math.floor(t * 6) % 2) R.icono('!', 195, 88, Q.luzV, Q.k, 2);
  // la mano de Pázhitnov teclea y se aparta cuando la fila desaparece
  const ap = li(t, DESAP - 0.2, DESAP + 0.3), k = t < DESAP - 0.2 ? Math.round(Math.abs(Math.sin(t * 12)) * 2) : 0;
  T.brazo(R, Math.round(lerp(40, 20, ap)), 212, Math.round(lerp(92, 70, ap)), Math.round(lerp(142, 158, ap)) + k, '#5e6e58', 1, { codo: [Math.round(lerp(58, 40, ap)), 186] });
};

// ── 4 · el cuaderno de cuadros: tetra y tenis ──
const NX0 = 30, NY0 = 18, NX1 = 268, NY1 = 172;
const fondo4 = () => {
  madera(0, 0, 319, 179, Q.nogal, Q.nogalS, Q.nogalL, 12, 81);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 150, (y - 95) * 1.4); if (d > 170 && h(x, y, 82) < 0.35) R.pset(x, y, Q.nogalS); }
  // la esquina de Atom, en la sombra de la mesa: madera oscura y tranquila
  for (let y = 0; y < 62; y++) for (let x = 270; x < 320; x++) { const a0 = Math.min(1, (x - 270) / 12) * Math.min(1, (62 - y) / 14); R.pset(x, y, mez(R.pget(x, y), hex('#2a1a10'), a0 * 0.85)); }
  // la sombra y las dos páginas de cuadros con su margen rojo
  R.rect(NX0 + 3, NY0 + 3, NX1 + 4, NY1 + 4, hex('#2a1810'));
  caja(NX0, NY0, NX1, NY1, Q.papel, Q.blanco, Q.papelS);
  for (let x = NX0 + 4; x < NX1; x += 6) R.rect(x, NY0 + 1, x, NY1 - 1, hex('#d0dcea')); for (let y = NY0 + 4; y < NY1; y += 6) R.rect(NX0 + 1, y, NX1 - 1, y, hex('#d0dcea'));
  const mid = Math.round((NX0 + NX1) / 2); R.rect(mid - 2, NY0, mid + 2, NY1, Q.papelS); R.rect(mid, NY0, mid, NY1, hex('#b8ae94'));
  for (let y = NY0 + 6; y < NY1; y += 10) { R.disco(mid, y, 1, Q.metalS); }
  R.rect(NX1 - 14, NY0 + 1, NX1 - 14, NY1 - 1, Q.rojoL); R.rect(mid - 14, NY0 + 1, mid - 14, NY1 - 1, Q.rojoL);
  for (let i = 0; i < 6; i++) R.pset(NX0 + 1 + i, NY1 - 6 + i, Q.papelS);
  // lo que hay en la mesa: la regla, la goma, dos lápices y la funda de un disquete
  caja(4, 30, 14, 160, hex('#e8d8a0'), Q.blanco, hex('#b8a870')); for (let y = 34; y < 158; y += 4) R.rect(5, y, y % 20 === 14 ? 10 : 8, y, Q.k);
  caja(282, 120, 300, 130, hex('#e89aa0'), hex('#f8c0c4'), hex('#b86a70'));
  R.linea(276, 160, 314, 140, Q.k); R.linea(276, 159, 313, 139, hex('#3a6ac8')); R.linea(277, 160, 314, 141, hex('#2a4a98'));
  T.PIEZAS_TS.disquete(R, 296, 112, {});
};
// cada dibujo es una lista de trazos [[x, y], …] que el lápiz recorre en su tramo
const TRAZOS = [];
const cuadro = (x, y, s) => [[x, y], [x + s, y], [x + s, y + s], [x, y + s], [x, y]];
const DIB = [
  { t0: TETRA - 0.5, t1: TETRA + 0.55, tr: [cuadro(48, 66, 12), cuadro(66, 66, 12), cuadro(84, 66, 12), cuadro(102, 66, 12)] },
  { t0: GRIEGO - 0.35, t1: GRIEGO + 0.75, tr: [[[52, 128], [80, 112], [108, 128], [52, 128]], [[56, 130], [56, 152]], [[70, 130], [70, 152]], [[90, 130], [90, 152]], [[104, 130], [104, 152]], [[50, 154], [110, 154]]] },
  { t0: TENIS - 0.1, t1: TENIS + 0.85, tr: [Array.from({ length: 21 }, (_, i) => [186 + Math.cos(i / 20 * 6.283) * 18, 66 + Math.sin(i / 20 * 6.283) * 24]), [[186, 90], [186, 128]], [[183, 128], [189, 128]], [[176, 50], [176, 82]], [[186, 44], [186, 88]], [[196, 50], [196, 82]], [[170, 56], [202, 56]], [[168, 66], [204, 66]], [[170, 76], [202, 76]], Array.from({ length: 13 }, (_, i) => [222 + Math.cos(i / 12 * 6.283) * 6, 112 + Math.sin(i / 12 * 6.283) * 6])] },
  { t0: DEPORTE - 0.15, t1: DEPORTE + 0.55, tr: [[[234, 64], [228, 56], [222, 60], [222, 66], [234, 78], [246, 66], [246, 60], [240, 56], [234, 64]]] },
];
const largo = (tr) => tr.reduce((s, l) => s + l.slice(1).reduce((q, p, i) => q + Math.hypot(p[0] - l[i][0], p[1] - l[i][1]), 0), 0);
const traza = (tr, u) => { let resto = u * largo(tr), punta = null;
  for (const l of tr) { for (let i = 1; i < l.length; i++) { const [ax, ay] = l[i - 1], [bx, by] = l[i], d = Math.hypot(bx - ax, by - ay); if (resto <= 0) return punta; const f = Math.min(1, resto / d); const ex = ax + (bx - ax) * f, ey = ay + (by - ay) * f; R.linea(Math.round(ax), Math.round(ay), Math.round(ex), Math.round(ey), Q.lapiz); R.linea(Math.round(ax) + 1, Math.round(ay), Math.round(ex) + 1, Math.round(ey), hex('#6a6a7a')); punta = [ex, ey]; resto -= d; } }
  return punta; };
const p4 = (t) => {
  fijo('cuaderno', fondo4);
  let punta = null;
  for (const d of DIB) { const u = li(t, d.t0, d.t1); if (u > 0) { const p = traza(d.tr, u); if (u < 1) punta = p; } }
  // el 4 junto a los cuatro cuadrados, y el «+» entre las dos páginas al final
  if (t > TETRA + 0.6) R.numero('4', 126, 86, { tam: 16, color: Q.lapiz, sombra: false, contorno: false });
  const pl = li(t, DEPORTE + 0.7, DEPORTE + 1.2); if (pl > 0) { punta = pl < 1 ? [148, 98] : punta; R.rect(140, 97, 140 + Math.round(16 * pl), 98, Q.lapiz); if (pl > 0.5) R.rect(147, 90, 148, 90 + Math.round(16 * (pl - 0.5) * 2), Q.lapiz); }
  // el gag: una pelota de tenis de verdad entra botando en «tennis» y se va
  const b = li(t, TENIS + 0.1, TENIS + 1.7); if (b > 0 && b < 1) { const bx = Math.round(lerp(330, -10, b)), fase = (b * 3) % 1, by = Math.round(150 - Math.abs(Math.sin(fase * Math.PI)) * 40 * (1 - b * 0.6));
    R.disco(bx + 3, 156, 4, hex('#3a2418')); R.disco(bx, by, 5, Q.k); R.disco(bx, by, 4, hex('#d8e840')); R.pset(bx - 2, by - 2, hex('#f4ffa0')); R.linea(bx - 3, by - 1, bx + 1, by + 3, Q.blanco); }
  // la mano con el lápiz: va a la punta del trazo; entre dibujos descansa sobre la página
  const [px, py] = punta ?? (t < TETRA - 0.5 ? [140, 112] : t < GRIEGO - 0.35 ? [118, 92] : t < TENIS - 0.1 ? [120, 150] : t < DEPORTE - 0.15 ? [214, 116] : [236, 92]);
  const lx = Math.round(px), ly = Math.round(py);
  R.linea(lx, ly, lx + 9, ly - 10, Q.k); R.linea(lx + 1, ly, lx + 10, ly - 10, hex('#e8c040')); R.linea(lx + 2, ly, lx + 11, ly - 10, hex('#b88a20')); R.pset(lx, ly, Q.lapiz);
  T.brazo(R, Math.min(360, lx + 90), 214, lx + 22, ly - 6, '#5e6e58', -1, { codo: [lx + 76, Math.min(200, ly + 40)] });
};
const efectos = [[1.0, 'tecleo'], [NO_DIBUJA, 'bip'], [SIMBOLOS, 'tecleo'], [IDEA, 'brillo'], [P2 + 0.3, 'tecleo'], [CORTA, 'golpecito'], [CAE + 0.75, 'toc'], [P3 + 0.2, 'tecleo'], [LLENA, 'bip'], [DESAP, 'brillo'], [TETRA - 0.4, 'lapiz'], [TENIS + 0.3, 'boing'], [DEPORTE - 0.1, 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { año: 1984, efectos });
''')


# ═══════════════════════════════════════════════ TS-DISQUETES ═══════════════════════════════════════════════
E['ts-disquetes'] = ('Los disquetes', '''// TS-DISQUETES (frase 6), 1984–1986. Cinco planos:
// 1. el pasillo del instituto (centro/pasillo): la puerta de la sala de terminales se abre, la científica llama y los que
//    pasan se asombran en «nobody expected» y van hacia ella;
// 2. corta en «Nobody»: detrás del terminal (fondo local): los compañeros se agolpan alrededor de Pázhitnov, el reloj corre
//    y la ventana amanece; el café del científico se enfría hasta la escarcha y al probarlo tirita (gag 2); en «another
//    game» la pantalla vuelve a empezar y aplauden;
// 3. corta en «A 16-year-old»: la sala de ordenadores de oficina (fondo local): Gerásimov entra con el disquete (un «16»
//    sobre él), lo mete en «helped move it» y las tres pantallas se encienden en «IBM computers»;
// 4. corta en «and copies»: el andén del metro de Moscú (fondo local): el disquete pasa de mano en mano por la fila de
//    gente en «hand to hand» mientras el tren llega;
// 5. corta en «and from there»: el mapa de Europa (fondo local): un tren sale de Moscú hacia el oeste y los disquetes se
//    clavan en Varsovia, Berlín Este, Praga, Budapest, Bucarest y Sofía en «eastern block».''', H + r'''
import { equirect, mapaPapel, PAPEL } from '/atomo/plato/escenas/ov-mapas.js';
const a = (f) => en('disquetes', f);
const P2 = a(0.17), P3 = a(0.424), P4 = a(0.676), P5 = a(0.886);
const NADIE = a(0.06), ESPERA = a(0.077), PARAR = a(0.196), PROBAR = a(0.289), OTRA = a(0.371), JUEGO = a(0.385), DIECISEIS = a(0.428), VADIM = a(0.5), MUEVE = a(0.559), IBM = a(0.621), DISQ = a(0.726), PASAN = a(0.779), MANO = a(0.812), MOSCU = a(0.862), CRUZA = a(0.925), ESTE = a(0.962);

// ── 1 · el pasillo ──
const p1 = (t) => {
  T.centro(R, t, { encuadre: 'pasillo' });
  // la puerta entreabierta se abre del todo: la luz verde de las pantallas sale al pasillo
  const ab = li(t, 0.3, 0.9), w = Math.round(3 + ab * 22);
  R.rect(191, 53, 191 + w, 126, hex('#10241a')); for (let y = 56; y < 126; y += 3) if (h(y, Math.floor(t * 8), 91) < 0.6) R.rect(192, y, 190 + w, y, Q.fosS);
  R.rect(191 + w, 52, 194 + w, 127, Q.k); R.rect(192 + w, 53, 193 + w, 126, Q.madera);
  for (let y = 128; y < 156; y++) { const ww = Math.round((y - 128) * 0.8); for (let x = 192 - ww; x <= 190 + w + ww; x++) R.pset(x, y, mez(R.pget(x, y), hex('#5ac88a'), ab * 0.3 * (1 - (y - 128) / 28))); }
  // la científica asoma y llama con la mano
  if (ab > 0.5) R.actor(TS.cientifica, 196, 128, t, { dir: -1, dedo: t > 1.0 && t < 3.6, sonrisa: true, habla: Math.sin(t * 8) > 0.3 });
  if (t > NADIE && t < ESPERA + 1.2 && Math.floor(t * 5) % 2) R.icono('!', 206, 40, Q.luzV, Q.k, 2);
  // el científico del café viene por la izquierda, se para en «expected» y va hacia la puerta
  const u1 = li(t, 0.1, ESPERA), u2 = li(t, ESPERA + 0.5, P2 - 0.1), x1 = Math.round(lerp(-16, 120, u1) + u2 * 54);
  R.actor(TS.cientifico, x1, Math.round(160 - u2 * 6), t, { dir: 1, anda: (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1), sorpresa: t > ESPERA && t < ESPERA + 0.6 });
  // el burócrata con su carpeta viene de la derecha, se vuelve sorprendido
  const u3 = li(t, 0.6, ESPERA + 0.3), x3 = Math.round(lerp(300, 238, u3));
  const bu = R.actor(TS.burocrata, x3, 166, t, { dir: -1, anda: u3 > 0 && u3 < 1, sostiene: true, sorpresa: t > ESPERA, sonrisa: t > ESPERA + 1.2 });
  { const [mx, my] = bu.mano; R.rect(mx - 4, my - 4, mx + 2, my + 3, Q.k); R.rect(mx - 3, my - 3, mx + 1, my + 2, hex('#c8a06a')); }
  // el guardia de la puerta 214 se encoge de hombros
  R.actor(TS.guardia, 26, 152, t, { dir: 1, brazos: t > ESPERA + 0.2 && t < ESPERA + 1.0, sorpresa: t > ESPERA });
  T.centroDelante(R, t, { encuadre: 'pasillo' });
};

// ── 2 · alrededor del terminal: nadie puede dejar de jugar (gag 2: el café frío) ──
const fondo2 = () => {
  trama(0, 0, 319, 72, Q.yeso, Q.yesoS, 0.09, 101); R.rect(0, 0, 319, 6, hex('#c6bfa4')); R.rect(0, 7, 319, 7, Q.yesoS);
  for (const x of [184, 230]) { R.rect(x, 2, x + 40, 5, Q.blanco); R.rect(x, 6, x + 40, 6, Q.metalS); }
  trama(0, 73, 319, 118, Q.verde, Q.verdeS, 0.12, 102); R.rect(0, 72, 319, 72, Q.verdeL); R.rect(0, 73, 319, 73, Q.verdeS);
  for (let y = 119; y < 180; y++) for (let x = 0; x < 320; x++) { const bx = Math.floor((x - (y - 119) * 0.3) / 24), by = Math.floor((y - 119) / 10); R.pset(x, y, h(x, y, 105) < 0.06 ? hex('#7a6a54') : (bx + by) % 2 ? hex('#8a7a62') : hex('#9a8a70')); }
  R.rect(0, 118, 319, 118, Q.k);
  // el cartel de la estrella, el armario de cinta y el perchero con abrigos
  caja(80, 20, 104, 52, Q.rojo, Q.rojoL, Q.rojoS); R.poligono([[92, 26], [95, 34], [102, 34], [96, 39], [98, 47], [92, 42], [86, 47], [88, 39], [82, 34], [89, 34]], Q.oroL);
  caja(214, 22, 268, 118, Q.grisL, Q.blanco, Q.gris); caja(220, 30, 262, 66, hex('#2a2e36'), hex('#3a3e48'), Q.k); for (let y = 74; y < 114; y += 4) R.rect(220, y, 262, y, Q.grisS);
  R.rect(298, 52, 300, 118, Q.maderaS); R.rect(290, 52, 308, 54, Q.maderaS); R.poligono([[286, 56], [296, 56], [298, 84], [284, 84]], hex('#4a3a5a')); R.rect(302, 56, 310, 62, hex('#6a4a2a')); R.rect(301, 62, 311, 63, hex('#4a3420'));
  // la papelera llena de listados arrugados y una silla vacía (a la derecha, en el suelo)
  R.poligono([[280, 178], [306, 178], [309, 150], [277, 150]], Q.k); R.poligono([[281, 177], [305, 177], [307, 151], [279, 151]], Q.metalD); for (let y = 154; y < 176; y += 4) R.rect(281, y, 305, y, Q.metalS);
  for (let i = 0; i < 6; i++) { const x = 280 + i * 5, y = 146 - (i % 3) * 3; R.disco(x, y, 3, Q.k); R.disco(x, y, 2, i % 2 ? Q.papel : hex('#e0f0d8')); }
  R.disco(270, 172, 3, Q.k); R.disco(270, 172, 2, Q.papel); R.disco(250, 176, 3, Q.k); R.disco(250, 176, 2, hex('#e0f0d8'));
};
// el terminal de perfil sobre la mesa: la pantalla mira a la izquierda, a Pázhitnov
const terminalPerfil = (t, flash) => {
  caja(186, 88, 234, 126, Q.beige, Q.beigeL, Q.beigeS); R.poligono([[186, 88], [175, 92], [175, 122], [186, 126]], Q.k); R.poligono([[185, 90], [177, 93], [177, 121], [185, 124]], flash ? Q.fosL : Q.fos);
  for (let y = 94; y < 120; y += 3) R.rect(196, y, 228, y, Q.beigeS); caja(198, 126, 224, 129, Q.beigeS, Q.beige, Q.beigeD);
  caja(146, 126, 178, 130, Q.beigeL, Q.blanco, Q.beigeS); for (let i = 0; i < 6; i++) R.rect(149 + i * 5, 127, 151 + i * 5, 128, Q.beigeD);
};
// la gráfica de la pared (papel milimetrado con una curva) y el estante de carpetas
const paredExtra = () => {
  caja(150, 16, 200, 56, Q.papel, Q.blanco, Q.papelS); for (let x = 152; x < 199; x += 4) R.rect(x, 18, x, 54, hex('#e0d8c0')); for (let y = 18; y < 55; y += 4) R.rect(152, y, 198, y, hex('#e0d8c0'));
  let py = 50; for (let x = 153; x < 198; x++) { const y = Math.round(50 - (x - 153) * 0.6 - Math.sin(x * 0.4) * 3); R.linea(x - 1, py, x, y, Q.rojo); py = y; } R.pset(150, 15, Q.rojo); R.pset(200, 15, Q.rojo);
  R.rect(108, 62, 206, 64, Q.maderaS); R.rect(108, 62, 206, 62, Q.maderaL); for (let i = 0; i < 14; i++) { const x = 110 + i * 7, c = [hex('#3a5a8a'), Q.rojoS, hex('#5a6a3a'), hex('#8a6a3a')][i % 4]; R.rect(x, 44 + (i % 3) * 2, x + 5, 61, Q.k); R.rect(x + 1, 45 + (i % 3) * 2, x + 4, 61, c); R.rect(x + 1, 54, x + 4, 55, Q.papel); }
};
const p2 = (t) => {
  fijo('alrededor', () => { fondo2(); paredExtra(); });
  const al = li(t, P2, P3 - 0.3), flash = t > OTRA && t < OTRA + 0.35;
  ventanaNoche(16, 20, 62, 62, t, { alba: al }); marcoVentana(16, 20, 62, 62);
  reloj(126, 30, 10, 22 + li(t, P2, P3) * 8, { seg: t * 600 });
  for (const [cx, k] of [[230, 0], [252, 1]]) { const q0 = t * (Math.sin(t + k) > 0 ? 3 : -1.4); R.disco(cx, 48, 9, Q.k); R.disco(cx, 48, 8, hex('#5a4a3a')); R.disco(cx, 48, 2, Q.metalL); for (let s = 0; s < 3; s++) { const q = q0 + s * 2.094; R.pset(Math.round(cx + Math.cos(q) * 5), Math.round(48 + Math.sin(q) * 5), Q.metalL); } }
  for (let i = 0; i < 6; i++) if (Math.sin(t * (2 + i) + i) > 0) R.pset(222 + i * 7, 26, i % 2 ? Q.fos : Q.rojoL);
  // los compañeros se agolpan detrás de Pázhitnov para ver la pantalla (las filas de atrás, de puntillas)
  const aplauso = t > JUEGO && t < JUEGO + 1.3, inc = (k) => Math.round(Math.max(0, Math.sin(t * 1.6 + k)) * 1.5), punt = (k) => (Math.sin(t * 3 + k) > 0.5 ? 2 : 0);
  R.actor(TS.operario, 96, 110, t, { dir: 1, salto: punt(4), sonrisa: aplauso, brazos: aplauso });
  R.actor(TS.cientifico, 150, 108, t, { dir: 1, salto: punt(5), sorpresa: t > PARAR && t < PARAR + 0.8, sonrisa: t > PARAR + 0.8, sinObjeto: true });
  R.actor(TS.burocrata, 114 + inc(0), 114, t, { dir: 1, salto: punt(0), sorpresa: t > PARAR && t < PARAR + 0.7, sonrisa: aplauso, brazos: aplauso && Math.floor(t * 6) % 2 === 0 });
  R.actor(TS.guardia, 134 + inc(1), 112, t, { dir: 1, sorpresa: t > PARAR + 0.3 && t < PARAR + 1.2, sonrisa: t > PARAR + 1.2, brazos: aplauso });
  R.actor(TS.cientifica, 80 + inc(2), 122, t, { dir: 1, sonrisa: t > PARAR, brazos: aplauso, habla: !aplauso && Math.sin(t * 6 + 1) > 0.6 });
  R.actor(TS.gerasimov, 102 + inc(3), 124, t, { dir: 1, sonrisa: true, dedo: t > PROBAR && t < PROBAR + 0.8, habla: Math.sin(t * 7) > 0.6 });
  R.actor(TS.publica, 124 + inc(2), 126, t, { dir: 1, sonrisa: t > PARAR, brazos: aplauso, habla: Math.sin(t * 5 + 2) > 0.7 });
  // Pázhitnov, delante de la pantalla: juega, lo cuenta en «He later said» y vuelve a empezar en «another game»
  R.actor(TS.pazhitnov, 156, 136, t, { dir: 1, sonrisa: t < a(0.25) || t > JUEGO, dedo: t > OTRA - 0.2 && t < JUEGO + 0.6, habla: t > a(0.25) && t < PROBAR + 0.4 && Math.sin(t * 9) > 0 });
  // la luz verde de la pantalla sobre las caras (y el destello al volver a empezar)
  for (let y = 80; y < 128; y++) for (let x = 70; x < 176; x++) { const d = Math.hypot((x - 176) / 106, (y - 106) / 28); if (d < 1) { const c = R.pget(x, y); R.pset(x, y, mez(c, flash ? Q.fosL : Q.fos, (1 - d) * (flash ? 0.45 : 0.16))); } }
  terminalPerfil(t, flash);
  // la mesa por delante, con listados, una taza vacía y disquetes
  R.rect(64, 129, 268, 131, Q.k); madera(65, 128, 267, 131, hex('#b88a5a'), hex('#8a6a3a'), hex('#d8aa7a'), 4, 106); R.rect(64, 132, 268, 132, Q.k);
  madera(66, 133, 266, 180, hex('#9a6a3a'), hex('#6a4a2a'), hex('#b88a5a'), 12, 107); for (const x of [80, 194]) { caja(x, 142, x + 58, 168, hex('#9a6a3a'), hex('#b88a5a'), hex('#6a4a2a')); R.rect(x + 26, 154, x + 32, 155, Q.metalL); }
  caja(88, 121, 118, 127, hex('#e8f0e0'), Q.blanco, hex('#a8c8a0')); for (let y = 122; y < 127; y += 2) R.rect(90, y, 116, y, hex('#a8d8a8'));
  R.poligono([[114, 131], [128, 131], [126, 156], [112, 150]], hex('#e8f0e0')); for (let y = 135; y < 152; y += 3) R.rect(115, y, 125, y, hex('#a8d8a8'));
  disqueteG(238, 116); disqueteG(250, 118, hex('#f0d890'));
  // el científico del café (delante, a la izquierda): el vapor se apaga, la taza se escarcha y al probarlo tirita
  const frio = li(t, P2 + 0.5, PROBAR + 0.6), hielo = t > PROBAR + 0.8, bebe = t > a(0.33) && t < a(0.355), tirita = t > a(0.355) && t < JUEGO + 0.4;
  const cx = 26 + (tirita ? (Math.floor(t * 20) % 2) : 0);
  const ci = R.actor(TS.cientifico, cx, 176, t, { dir: 1, sostiene: bebe ? [cx + 12, 150] : true, sorpresa: tirita, triste: tirita, sonrisa: !tirita && !hielo });
  { const [mx, my] = ci.mano, c = hielo ? hex('#c8e8f8') : Q.blanco; R.rect(mx - 2, my - 7, mx + 5, my + 1, Q.k); R.rect(mx - 1, my - 6, mx + 4, my, c); R.rect(mx - 1, my - 6, mx + 4, my - 5, hielo ? hex('#8ab8e8') : Q.te); R.rect(mx + 5, my - 5, mx + 7, my - 1, Q.k); R.pset(mx + 6, my - 3, c);
    if (frio < 1) vapor(mx + 1, my - 8, t, 4, 16 * (1 - frio) + 2, Q.vapor, 1 - frio * 0.9);
    if (hielo) { for (const dx of [0, 2, 4]) R.pset(mx - 1 + dx, my + 1 + (dx % 4 ? 1 : 2), hex('#a8d8f8')); const b = Math.sin(t * 7) > 0.2; for (const [sx, sy] of [[mx + 8, my - 11], [mx - 4, my - 9]]) if (b) { R.pset(sx, sy, Q.blanco); for (let r = 1; r < 3; r++) { R.pset(sx + r, sy, hex('#a8d8f8')); R.pset(sx - r, sy, hex('#a8d8f8')); R.pset(sx, sy + r, hex('#a8d8f8')); R.pset(sx, sy - r, hex('#a8d8f8')); } } }
    if (tirita) for (const s of [-1, 1]) { const bx = cx + 7 + s * 11; R.pset(bx, 152, Q.k); R.pset(bx + s, 154, Q.k); R.pset(bx, 156, Q.k); R.pset(bx + s, 158, Q.k); } }
};

// ── 3 · Gerásimov y los ordenadores de oficina ──
const PCS = [[14, 0], [180, 1], [250, 2]];
const fondo3 = () => {
  trama(0, 0, 319, 130, hex('#b4c0c8'), hex('#a4b0b8'), 0.08, 111); R.rect(0, 0, 319, 5, hex('#9aa6ae')); R.rect(0, 6, 319, 6, hex('#8a969e'));
  for (const x of [184, 232]) { R.rect(x, 1, x + 40, 4, Q.blanco); R.rect(x, 5, x + 40, 5, Q.metalS); }
  R.rect(0, 96, 319, 97, hex('#7a8a94')); trama(0, 98, 319, 133, hex('#8a9aa4'), hex('#7a8a94'), 0.12, 112);
  for (const x of [92, 158]) { caja(x, 108, x + 8, 116, Q.blanco, null, Q.gris); R.pset(x + 3, 111, Q.k); R.pset(x + 5, 111, Q.k); R.linea(x + 4, 117, x + 10, 133, Q.k); }
  // el póster de pictogramas (un ordenador y un disquete)
  caja(100, 26, 140, 62, Q.papel, Q.blanco, Q.papelS); caja(108, 32, 124, 44, Q.beige, Q.beigeL, Q.beigeS); R.rect(110, 34, 122, 41, Q.fosN); R.rect(112, 37, 118, 37, Q.fos); R.rect(105, 46, 127, 50, Q.beigeS); disquete(128, 48);
  // el calendario de 1985 (solo números y la rejilla de los días, con uno rojo)
  caja(150, 22, 178, 60, Q.blanco, null, Q.papelS); R.rect(150, 22, 178, 30, Q.rojo); R.numero('85', 158, 30, { color: Q.blanco, sombra: false });
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) R.rect(152 + i * 4, 34 + j * 5, 153 + i * 4, 35 + j * 5, (i === 4 && j === 2) ? Q.rojo : Q.lapiz);
  // la estantería de manuales con el ventilador encima
  R.rect(196, 72, 270, 74, Q.maderaS); R.rect(196, 98, 270, 100, Q.maderaS); for (let i = 0; i < 11; i++) { const x = 198 + i * 6, c = [hex('#3a5a8a'), Q.rojoS, hex('#c8a040'), hex('#5a6a3a')][i % 4]; R.rect(x, 78, x + 4, 97, Q.k); R.rect(x + 1, 79, x + 3, 97, c); R.rect(x + 1, 88, x + 3, 89, Q.papel); }
  R.rect(226, 52, 236, 72, Q.k); R.rect(229, 56, 233, 71, Q.grisS);
  // el extintor y el ficus (bajo la esquina de Atom)
  caja(280, 104, 286, 126, Q.rojo, Q.rojoL, Q.rojoS); R.rect(281, 101, 285, 103, Q.k);
  R.rect(294, 112, 310, 133, Q.k); R.rect(295, 113, 309, 132, hex('#a84a2a')); for (let i = 0; i < 16; i++) { const q = i / 16 * 6.283; R.disco(Math.round(302 + Math.cos(q) * 9), Math.round(90 + Math.sin(q) * 16), 3, i % 2 ? hex('#3a7a3a') : hex('#5a9a4a')); } R.rect(301, 92, 302, 112, hex('#5a3a2a'));
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (Math.floor(x / 20) + Math.floor((y - 134) / 8)) % 2 ? hex('#6a6a72') : hex('#74747c'));
};
const persiana = (x0, y0, x1, y1, t) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < y0 + (y1 - y0) * 0.68 ? (h(x, y, 113) < 0.1 ? hex('#c8d8e8') : hex('#b0c8e0')) : hex('#e8eef4'));
  for (let i = 0; i < 4; i++) { const bx = x0 + 2 + i * 17, bh = 10 + (i % 2) * 8; R.rect(bx, y0 + Math.round((y1 - y0) * 0.68) - bh, bx + 12, y0 + Math.round((y1 - y0) * 0.68), hex('#8a94a4')); for (let wy = 0; wy < bh - 3; wy += 4) R.rect(bx + 2, y0 + Math.round((y1 - y0) * 0.68) - bh + 2 + wy, bx + 3, y0 + Math.round((y1 - y0) * 0.68) - bh + 3 + wy, h(i, wy + Math.floor(t / 3), 118) < 0.5 ? Q.luzV : hex('#6a7484')); }
  for (let i = 0; i < 18; i++) { const sx = x0 + ((h(i, 1, 114) * (x1 - x0) + t * 4) % (x1 - x0)), sy = y0 + ((h(i, 2, 114) * (y1 - y0) + t * 10) % (y1 - y0)); R.pset(Math.round(sx), Math.round(sy), Q.blanco); }
  for (let y = y0; y <= y1; y += 4) { const sw = Math.round(Math.sin(t * 1.3 + y * 0.1) * 0.6); R.rect(x0, y + sw, x1, y + sw, hex('#e8e4d8')); R.rect(x0, y + sw + 1, x1, y + sw + 1, hex('#b8b4a8')); }
  caja(x0 - 3, y0 - 3, x1 + 3, y0, Q.blanco, null, Q.gris); R.rect(x0 - 4, y1 + 1, x1 + 4, y1 + 3, Q.blanco); R.rect(x0 - 4, y1 + 4, x1 + 4, y1 + 4, Q.k);
};
const pc = (x, k, t, on, luz) => {
  // la unidad central (dos disqueteras con su piloto) y el monitor beis encima; nada de logotipos
  caja(x, 124, x + 48, 140, Q.beige, Q.beigeL, Q.beigeS); for (const dy of [0, 7]) { R.rect(x + 26, 127 + dy, x + 44, 129 + dy, Q.k); R.rect(x + 33, 130 + dy, x + 37, 130 + dy, Q.beigeD); } R.rect(x + 4, 132, x + 14, 133, Q.beigeS);
  R.rect(x + 20, 128, x + 22, 129, luz ? Q.rojoL : hex('#5a2a2a'));
  caja(x + 8, 92, x + 40, 122, Q.beige, Q.beigeL, Q.beigeS); R.rect(x + 11, 95, x + 37, 117, Q.k); R.rect(x + 12, 96, x + 36, 116, Q.fosN); R.rect(x + 18, 122, x + 30, 123, Q.beigeS); R.pset(x + 36, 119, on ? Q.fos : Q.fosS);
  if (on) { // bloques monocromos sueltos que caen (ni pozo ni colores)
    for (let i = 0; i < 4; i++) { const yy = 97 + ((t * 9 + i * 5 + k * 3) % 13), xx = x + 14 + ((i * 6 + k * 3) % 18); R.rect(xx, Math.round(yy), xx + 3, Math.round(yy) + 3, Q.fos); R.pset(xx, Math.round(yy), Q.fosL); }
    R.rect(x + 13, 112, x + 35, 115, Q.fosM); for (let i = 0; i < 5; i++) if ((i + k) % 3) R.rect(x + 13 + i * 5, 108, x + 16 + i * 5, 111, Q.fosM); }
  else if (Math.floor(t * 2) % 2) R.rect(x + 13, 97, x + 15, 99, Q.fosM);
};
const p3 = (t) => {
  fijo('oficina', fondo3);
  persiana(16, 22, 84, 80, t);
  // el ventilador gira sobre la estantería
  { const q0 = t * 9; R.disco(231, 46, 9, Q.k); R.disco(231, 46, 8, Q.metalL); for (let s = 0; s < 3; s++) { const q = q0 + s * 2.094; R.poligono([[231, 46], [Math.round(231 + Math.cos(q) * 7), Math.round(46 + Math.sin(q) * 7)], [Math.round(231 + Math.cos(q + 0.6) * 7), Math.round(46 + Math.sin(q + 0.6) * 7)]], Q.metalD); } R.disco(231, 46, 1, Q.k); }
  // Gerásimov entra por detrás de las mesas con el disquete; el «16» sale sobre él
  const u = li(t, P3 + 0.1, VADIM + 0.3), gx = Math.round(lerp(24, 160, u)), mete = li(t, MUEVE - 0.15, MUEVE + 0.45), dentro = mete >= 1;
  const g = R.actor(TS.gerasimov, gx, 142, t, { dir: 1, anda: u > 0 && u < 1, sostiene: dentro ? undefined : mete <= 0 ? true : [Math.round(lerp(176, 212, mete)), Math.round(lerp(122, 128, mete))], sonrisa: t > IBM, brazos: t > IBM + 0.4 && t < IBM + 1.3 });
  R.actor(TS.cientifica, 233, 142, t, { dir: t > IBM + 0.25 ? -1 : 1, sorpresa: t > IBM + 0.25 && t < IBM + 0.9, sonrisa: t > IBM + 0.9, habla: t < IBM && Math.sin(t * 5) > 0.7 });
  R.actor(TS.burocrata, 72, 142, t, { dir: t > IBM + 0.4 ? 1 : -1, sorpresa: t > IBM + 0.4, habla: t < VADIM && Math.sin(t * 6) > 0.6 });
  // la mesa larga por delante
  madera(0, 134, 319, 146, hex('#b88a5a'), hex('#8a6a3a'), hex('#d8aa7a'), 6, 115); R.rect(0, 134, 319, 134, hex('#d8aa7a')); R.rect(0, 147, 319, 147, Q.k);
  madera(0, 148, 319, 176, hex('#9a6a3a'), hex('#6a4a2a'), hex('#b88a5a'), 14, 116); R.rect(0, 177, 319, 179, Q.k); for (const x of [96, 216]) { caja(x, 152, x + 40, 172, hex('#9a6a3a'), hex('#b88a5a'), hex('#6a4a2a')); R.rect(x + 17, 161, x + 23, 162, Q.metalL); }
  // los tres ordenadores: el del medio arranca con el disquete y luego los otros dos (las copias)
  for (const [x, k] of PCS) pc(x, k, t, k === 1 ? t > IBM : t > IBM + 0.3 + k * 0.15, k === 1 && dentro && t < IBM + 0.6 && Math.floor(t * 8) % 2);
  for (const [x] of PCS) { caja(x + 4, 142, x + 44, 146, Q.beigeL, Q.blanco, Q.beigeS); for (let i = 0; i < 8; i++) R.rect(x + 6 + i * 5, 143, x + 8 + i * 5, 144, Q.beigeD); }
  // la impresora de agujas con su papel que avanza
  caja(104, 122, 140, 136, Q.grisL, Q.blanco, Q.gris); R.rect(108, 130, 136, 131, Q.k); const pa = Math.floor((t * 6) % 6); R.rect(110, 108 - pa, 134, 122, Q.papel); for (let y = 110 - pa; y < 122; y += 3) R.rect(113, y, 113 + Math.floor(h(y, 3, 117) * 18), y, Q.lapiz); for (let y = 109 - pa; y < 122; y += 3) { R.pset(111, y, Q.papelS); R.pset(133, y, Q.papelS); }
  // el disquete en la mano (o entrando en la ranura)
  if (!dentro) { const [mx, my] = g.mano, w = mete > 0.7 ? Math.round((1 - mete) / 0.3 * 7) : 7; R.rect(mx - 3, my - 6, mx - 3 + w + 1, my + 2, Q.k); R.rect(mx - 2, my - 5, mx - 3 + w, my + 1, hex('#2e2c36')); if (w > 3) R.rect(mx - 1, my - 5, mx - 3 + w - 1, my - 3, Q.blanco); }
  // el «16»
  const d = li(t, DIECISEIS - 0.05, DIECISEIS + 0.3) - li(t, VADIM + 0.2, VADIM + 0.6); if (d > 0) R.numero('16', gx + 8, Math.round(lerp(114, 104, d)), { tam: 16, centro: true });
};

// ── 4 · el andén del metro: de mano en mano ──
const fondo4 = () => {
  // la bóveda y los arcos de mármol
  trama(0, 0, 319, 179, hex('#d8c8a8'), hex('#c8b898'), 0.1, 121);
  for (let x = 0; x < 320; x += 80) {
    for (let y = 18; y < 112; y++) for (let xx = x + 16; xx < x + 64; xx++) { const r = Math.hypot(xx - (x + 40), Math.max(0, 40 - y)); if (y > 40 || r < 24) R.pset(xx, y, hex('#2a2a34')); }
    for (let y = 16; y < 44; y++) for (let xx = x + 12; xx < x + 68; xx++) { const r = Math.hypot(xx - (x + 40), 42 - y); if (r >= 24 && r < 28) R.pset(xx, y, (xx + y) % 4 ? hex('#a87a48') : hex('#c8a060')); }
    caja(x + 66, 30, x + 94, 118, hex('#b89a7a'), hex('#d8bc9a'), hex('#8a6a50')); for (let y = 34; y < 116; y += 5) R.pset(x + 72 + Math.floor(h(x, y, 122) * 16), y, hex('#a07a5a'));
    R.rect(x + 64, 28, x + 96, 32, hex('#c8a060')); R.rect(x + 64, 112, x + 96, 118, hex('#8a6a50'));
    // la medalla de mosaico con la estrella sobre el pilar
    R.disco(x + 80, 18, 7, Q.k); R.disco(x + 80, 18, 6, hex('#c8a060')); R.disco(x + 80, 18, 4, Q.rojoS); R.pset(x + 80, 16, Q.oroL); R.rect(x + 79, 17, x + 81, 19, Q.oroL); R.pset(x + 80, 20, Q.oroL);
  }
  // la pared del fondo del túnel (azulejo) y las vías
  for (let y = 60; y < 112; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === hex('#2a2a34')) R.pset(x, y, (x % 8 === 0 || y % 6 === 0) ? hex('#5a6a6a') : hex('#6a7a7a'));
  R.rect(0, 108, 319, 118, hex('#1a1a20')); R.rect(0, 112, 319, 112, Q.metalS); R.rect(0, 116, 319, 116, Q.metalS); for (let x = 2; x < 320; x += 8) R.rect(x, 113, x + 3, 115, hex('#3a2a20'));
  // el andén de granito con la línea del borde
  for (let y = 119; y < 180; y++) for (let x = 0; x < 320; x++) { const c = (Math.floor(x / 26) + Math.floor((y - 119) / 13)) % 2 ? hex('#8a8a8e') : hex('#9a9a9c'); R.pset(x, y, h(x, y, 123) < 0.15 ? hex('#7a7a80') : c); }
  R.rect(0, 119, 319, 121, hex('#e8e4d8')); R.rect(0, 122, 319, 122, Q.k);
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.min(...[40, 120, 200, 280].map((c) => Math.abs(x - c))); if (d < 14 && h(x, y, 124) < 0.2 * (1 - d / 14)) R.pset(x, y, hex('#b0aca0')); }
};
const arana = (x, y, t) => {
  R.rect(x, 0, x, y - 6, Q.oroS);
  for (let i = -2; i <= 2; i++) { const bx = x + i * 6; R.rect(bx - 1, y - 2, bx + 1, y + 1, Q.oroS); R.disco(bx, y - 4, 2, Math.sin(t * 7 + i + x) > 0.85 ? Q.blanco : Q.luzC); }
  R.rect(x - 14, y + 1, x + 14, y + 2, Q.oro); R.rect(x - 14, y + 3, x + 14, y + 3, Q.oroS); R.poligono([[x - 4, y + 3], [x + 4, y + 3], [x, y + 9]], Q.oro);
  for (let i = 0; i < 6; i++) { const q = i / 6 * 6.283 + t * 0.2; R.pset(Math.round(x + Math.cos(q) * 18), Math.round(y + 2 + Math.sin(q) * 4), Q.luzC); }
};
const tren = (x0, t) => {
  for (let c = 0; c < 3; c++) { const x = Math.round(x0 + c * 112); if (x > 330 || x < -120) continue;
    R.rect(x, 62, x + 108, 110, Q.k); R.rect(x + 1, 63, x + 107, 109, hex('#3a6aa8')); R.rect(x + 1, 63, x + 107, 66, hex('#5a8ac8')); R.rect(x + 1, 88, x + 107, 92, hex('#e8dcb8')); R.rect(x + 1, 104, x + 107, 109, hex('#2a4a78'));
    for (let w = 0; w < 4; w++) { const wx = x + 8 + w * 26; R.rect(wx, 68, wx + 18, 84, Q.k); R.rect(wx + 1, 69, wx + 17, 83, hex('#f0e8b0')); if ((w + c) % 2) R.disco(wx + 9, 79, 3, hex('#6a5a4a')); R.rect(wx + 1, 69, wx + 17, 70, Q.blanco); }
    for (let d = 0; d < 3; d++) R.rect(x + 34 + d * 26 - 13, 66, x + 34 + d * 26 - 12, 108, Q.k);
    R.disco(x + 20, 110, 4, Q.k); R.disco(x + 88, 110, 4, Q.k); }
};
const FILA = [[TS.publico, 18], [TS.cientifica, 66], [TS.burocrata, 114], [TS.publica, 162], [TS.adultoJuega, 210], [TS.gerasimov, 258]];
const PASES = [DISQ, a(0.75), a(0.78), MANO, a(0.837), MOSCU - 0.25];
const p4 = (t) => {
  fijo('metro', fondo4);
  // el tren llega por la derecha, frena, espera y se va hacia la izquierda
  const llega = ez(li(t, P4, PASAN)), va = li(t, MOSCU - 0.5, P5 - 0.2); tren(Math.round(lerp(330, -60, llega) - va * va * 420), t);
  R.rect(0, 108, 319, 108, Q.k);
  for (const x of [40, 120, 200]) arana(x, 26, t);
  // la gente que espera detrás (lee el periódico, mira el tren)
  for (const [def, x, k] of [[TS.burocrata, 42, 0], [TS.cientifico, 92, 1], [TS.publica, 140, 2], [TS.operario, 188, 3], [TS.publico, 236, 4]]) { const r = R.actor(def, x, 150, t, { dir: k % 2 ? -1 : 1, sostiene: k % 2 === 0 ? true : undefined, sinObjeto: true, habla: Math.sin(t * 3 + k * 2) > 0.85 }); if (k % 2 === 0) { const [mx, my] = r.mano; R.rect(mx - 5, my - 7, mx + 3, my + 2, Q.k); R.rect(mx - 4, my - 6, mx + 2, my + 1, Q.papel); for (let y = my - 5; y < my + 1; y += 2) R.rect(mx - 3, y, mx + 1, y, Q.papelS); } }
  // la fila de gente; el disquete va de uno a otro (cada uno lo da al de su derecha)
  let k = 0; while (k < PASES.length && t > PASES[k] + 0.35) k++;
  FILA.forEach(([def, x], i) => {
    const tiene = i === k, recibe = i === k + 1 && k < PASES.length && t > PASES[k] - 0.2, da = tiene && k < PASES.length && t > PASES[k] - 0.2;
    const o = { dir: i > k ? -1 : 1, sostiene: tiene || recibe ? true : undefined, sonrisa: i < k || (i === FILA.length - 1 && k >= FILA.length - 1), habla: !tiene && !recibe && Math.sin(t * 4 + i * 2) > 0.7 };
    if (da) o.dir = 1;
    FILA[i].mano = R.actor(def, x, 168, t, o).mano;
  });
  // el disquete: en la mano del que lo tiene o volando hacia el siguiente
  const tk = PASES[k], v = k < PASES.length ? li(t, tk, tk + 0.35) : 0;
  const m0 = FILA[Math.min(k, FILA.length - 1)].mano, m1 = FILA[Math.min(k + 1, FILA.length - 1)].mano ?? m0;
  const dx = lerp(m0[0], m1[0], v), dy = lerp(m0[1], m1[1], v) - Math.sin(v * Math.PI) * 14;
  if (v > 0 && v < 1) for (let i = 1; i < 5; i++) { const w = Math.max(0, v - i * 0.06); R.pset(Math.round(lerp(m0[0], m1[0], w)), Math.round(lerp(m0[1], m1[1], w) - Math.sin(w * Math.PI) * 14), Q.blanco); }
  disqueteG(Math.round(dx) - 5, Math.round(dy) - 9);
  if (k >= FILA.length - 1 && t > MOSCU - 0.2 && Math.floor(t * 5) % 2) R.icono('!', 270, 120, Q.luzV, Q.k, 2);
  // la garita de la encargada del andén (a la derecha) con su lámpara
  caja(286, 128, 318, 178, hex('#7a3a2a'), hex('#9a4a34'), hex('#4a2018')); R.rect(290, 132, 314, 150, hex('#2a2a34')); R.rect(291, 133, 313, 149, hex('#e8d8a0')); R.actor(TS.cientifica, 296, 160, t, { dir: -1, habla: Math.sin(t * 3) > 0.8 }); caja(286, 151, 318, 178, hex('#7a3a2a'), hex('#9a4a34'), hex('#4a2018')); R.rect(290, 158, 314, 172, hex('#6a3222')); R.disco(310, 140, 2, Q.luzC);
};

// ── 5 · el mapa: hacia el oeste por el bloque del Este ──
const P = equirect([10, 8, 310, 172], [-2, 66, 40, 63]);
const CIU = { moscu: [37.6, 55.75], minsk: [27.6, 53.9], varsovia: [21.0, 52.2], berlin: [13.4, 52.5], praga: [14.4, 50.1], budapest: [19.0, 47.5], bucarest: [26.1, 44.4], sofia: [23.3, 42.7] };
const RUTAS = [[['moscu', 'minsk', 'varsovia', 'berlin'], CRUZA - 0.3, ESTE + 0.1], [['varsovia', 'praga'], ESTE - 0.35, ESTE + 0.25], [['minsk', 'budapest'], ESTE - 0.4, ESTE + 0.3], [['budapest', 'bucarest', 'sofia'], ESTE, ESTE + 0.6]];
const PINES = [['varsovia', CRUZA + 0.15], ['berlin', ESTE + 0.1], ['praga', ESTE + 0.25], ['budapest', ESTE + 0.3], ['bucarest', ESTE + 0.45], ['sofia', ESTE + 0.6]];
const TELON = [[10.9, 54.0], [10.7, 52.5], [10.1, 51.2], [12.1, 50.3], [13.8, 48.8], [16.9, 48.1], [16.4, 46.6], [19.0, 46.1], [22.5, 44.5], [22.9, 41.4], [26.3, 41.7], [28.0, 42.0]];
const xy = (k) => P(CIU[k]).map(Math.round);
const fondo5 = () => {
  mapaPapel(R, 0, P, { mundo: true, mesa: 6, reticula: 5, rosa: [168, 148] });
  // los dobleces del papel y un cerco de taza
  for (let y = 7; y < 173; y++) { R.pset(160, y, mez(R.pget(160, y), Q.k, 0.18)); R.pset(161, y, mez(R.pget(161, y), Q.blanco, 0.15)); }
  for (let x = 7; x < 313; x++) { R.pset(x, 90, mez(R.pget(x, 90), Q.k, 0.15)); }
  for (let q = 0; q < 6.283; q += 0.03) { const x = Math.round(270 + Math.cos(q) * 13), y = Math.round(140 + Math.sin(q) * 11); if (h(Math.round(q * 30), 1, 131) < 0.8) R.pset(x, y, hex('#b89a7a')); }
  // otras ciudades (puntos) y el Volga
  for (const c of [[30.3, 59.9], [30.5, 50.45], [24.1, 56.9], [25.3, 54.7], [49.1, 55.8], [44.0, 56.3], [36.2, 50.0], [39.7, 47.2]]) { const [x, y] = P(c).map(Math.round); R.disco(x, y, 2, Q.k); R.pset(x, y, PAPEL.tierra); }
  { let prev = null; for (const c of [[34.5, 57.2], [38.0, 57.6], [40.0, 57.7], [44.0, 56.3], [48.5, 55.8], [49.3, 53.5], [46.0, 51.5], [45.0, 48.7], [47.0, 47.0], [48.0, 46.4]]) { const p = P(c).map(Math.round); if (prev) { R.linea(prev[0], prev[1], p[0], p[1], hex('#4a7aa8')); R.linea(prev[0], prev[1] + 1, p[0], p[1] + 1, hex('#6a9ac0')); } prev = p; } }
  { let prev = null; for (const c of [[33.0, 55.5], [30.5, 52.0], [30.6, 50.4], [32.0, 49.0], [34.0, 48.0], [33.0, 46.8], [32.0, 46.5]]) { const p = P(c).map(Math.round); if (prev) R.linea(prev[0], prev[1], p[0], p[1], hex('#4a7aa8')); prev = p; } }
  // el telón de acero: la raya discontinua
  for (let i = 1; i < TELON.length; i++) { const [ax, ay] = P(TELON[i - 1]), [bx, by] = P(TELON[i]), n = Math.ceil(Math.hypot(bx - ax, by - ay)); for (let s = 0; s <= n; s++) if (Math.floor(s / 3) % 2 === 0) { const x = Math.round(ax + (bx - ax) * s / n), y = Math.round(ay + (by - ay) * s / n); R.pset(x, y, hex('#5a2a2a')); R.pset(x + 1, y, hex('#5a2a2a')); } }
};
const camino = (lista) => { const pts = lista.map(xy), seg = []; let L = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push([pts[i - 1], pts[i], L, d]); L += d; } return { seg, L }; };
const punto = (c, s) => { for (const [p0, p1, l0, d] of c.seg) if (s <= l0 + d) { const f = (s - l0) / d; return [p0[0] + (p1[0] - p0[0]) * f, p0[1] + (p1[1] - p0[1]) * f, Math.atan2(p1[1] - p0[1], p1[0] - p0[0])]; } const [p0, p1] = c.seg[c.seg.length - 1]; return [p1[0], p1[1], 0]; };
const p5 = (t) => {
  fijo('mapa', fondo5);
  R.recorte([7, 7, 312, 172]);
  // las vías que se dibujan detrás del tren (traviesas negras sobre el papel)
  RUTAS.forEach(([lista, t0, t1], r) => { const c = camino(lista), s = li(t, t0, t1) * c.L;
    for (let q = 0; q < s; q += 1) { const [x, y] = punto(c, q); R.pset(Math.round(x), Math.round(y), r ? hex('#6a4a3a') : Q.k); if (r === 0 && Math.floor(q) % 4 === 0) { R.pset(Math.round(x), Math.round(y) - 1, Q.k); R.pset(Math.round(x), Math.round(y) + 1, Q.k); } } });
  // Moscú: la estrella roja y el montón de disquetes
  { const [x, y] = xy('moscu'); R.disco(x, y, 4, Q.k); R.disco(x, y, 3, Q.rojo); R.pset(x, y - 1, Q.oroL); R.pset(x - 1, y, Q.oroL); R.pset(x + 1, y, Q.oroL); R.pset(x, y + 1, Q.oroL);
    for (let i = 0; i < 3; i++) disqueteG(x + 6 + i * 3, y - 16 + i * 4); }
  // el tren hacia el oeste con su humo
  const c0 = camino(RUTAS[0][0]), s0 = li(t, RUTAS[0][1], RUTAS[0][2]) * c0.L;
  if (s0 > 0) { for (let w = 2; w >= 0; w--) { const [x, y] = punto(c0, Math.max(0, s0 - w * 13)); const xx = Math.round(x), yy = Math.round(y); R.rect(xx - 6, yy - 6, xx + 6, yy + 2, Q.k); R.rect(xx - 5, yy - 5, xx + 5, yy + 1, w === 0 ? hex('#2a4a3a') : hex('#4a6a5a')); R.rect(xx - 5, yy - 5, xx + 5, yy - 5, w === 0 ? hex('#4a7a5a') : hex('#6a8a7a')); R.disco(xx - 3, yy + 2, 1, Q.k); R.disco(xx + 3, yy + 2, 1, Q.k); if (w > 0) { R.rect(xx - 4, yy - 3, xx - 1, yy - 1, Q.luzC); R.rect(xx + 1, yy - 3, xx + 4, yy - 1, Q.luzC); } else { R.rect(xx - 4, yy - 10, xx - 2, yy - 6, Q.k); R.rect(xx - 6, yy - 2, xx - 6, yy - 1, Q.luzV); R.pset(xx + 1, yy - 3, Q.rojo); } }
    const [hx, hy] = punto(c0, s0); for (let i = 0; i < 5; i++) { const f = ((t * 2 + i / 5) % 1); R.disco(Math.round(hx - 2 + f * 10), Math.round(hy - 9 - f * 8), Math.round(1 + f * 2), mez(Q.blanco, PAPEL.tierra, f)); } }
  // los disquetes que se clavan en cada ciudad (caen con su sombra)
  for (const [k, ti] of PINES) { const b = li(t, ti, ti + 0.3); if (b <= 0) continue; const [x, y] = xy(k), alto = Math.round((1 - b) * 22); R.disco(x + 2, y + 1, 2, hex('#3a3a46')); disqueteG(x - 5, y - 14 - alto); if (b >= 1 && Math.sin(t * 6 + x) > 0.4) { R.pset(x + 7, y - 15, Q.blanco); R.pset(x + 8, y - 16, Q.blanco); } }
  R.recorte(null);
};
const efectos = [[0.35, 'puerta'], [ESPERA, 'publico'], [P2 + 0.3, 'tecleo'], [PROBAR + 0.8, 'brillo'], [a(0.355), 'boing'], [JUEGO, 'palmada'], [VADIM, 'whoosh'], [MUEVE + 0.4, 'zumbido'], [IBM, 'bip'], [P4 + 0.2, 'motor'], [DISQ + 0.1, 'whoosh'], [MOSCU + 0.15, 'whoosh'], [CRUZA - 0.25, 'silbato'], [ESTE + 0.1, 'pop'], [ESTE + 0.45, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { año: (t) => (t < P3 ? 1984 : t < P5 ? 1985 : 1986), efectos });
''')
