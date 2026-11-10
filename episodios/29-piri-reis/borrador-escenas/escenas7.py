import re

E = {}

# Grupo 7 del ep29: pr-daniken, pr-hielo y pr-drake. Lo común (COMUN) se antepone a cada cuerpo: el búfer de las capas
# fijas, el tramado, cielos de ventana, libros y estanterías, el globo terráqueo en proyección ortográfica (con las
# tierras, la Antártida, la piel que resbala de Hapgood y el paso de Drake), el mapa polar y el mapita de 1513.
# En los cuerpos, @s@ es un instante en segundos de la voz inglesa (de linea.json) y se escribe en('marca', fracción).
MARCAS = {'pr-daniken': ('daniken', 0.5, 18.236), 'pr-hielo': ('hielo', 1.5, 25.467), 'pr-drake': ('drake', 0.5, 19.697)}


def _en(id_, cuerpo):
    k, a, b = MARCAS[id_]
    return re.sub(r'@([\d.]+)@', lambda m: f"en('{k}', {(float(m.group(1)) - a) / (b - a):.4f})", cuerpo)


COMUN = r'''
const K0 = hex('#1a1420');
const rp = (...a) => a.map((s) => hex(s));
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c, d, a) => { const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, r2 = d & 255, g2 = (d >>> 8) & 255, b2 = (d >>> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(g + (g2 - g) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
const luz = (cx, cy, r, col, a) => { for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) { const g = 1 - Math.hypot(x - cx, y - cy) / r; if (g > 0) R.pset(x, y, mez(R.pget(x, y), col, a * g * g)); } };
const velo = (x0, y0, x1, y1, col, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), col, a)); };
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / Math.max(1e-6, a1 - a0)));
const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en un búfer y en cada fotograma se copia (con R.usar(prev), nunca R.usar())
const capa = (k, f) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const p = R.usar(b); f(); R.usar(p); CAPAS.set(k, b); } R.copiar(b); };
// recorte: R.recorte para pset/linea/poligono/disco y rr, un rect que también lo respeta
let CLP = null;
const clip = (r) => { CLP = r; R.recorte(r); };
const rr = (x0, y0, x1, y1, c) => { if (CLP) { x0 = Math.max(x0, CLP[0]); y0 = Math.max(y0, CLP[1]); x1 = Math.min(x1, CLP[2]); y1 = Math.min(y1, CLP[3]); } if (x1 >= x0 && y1 >= y0) R.rect(x0, y0, x1, y1, c); };
const llena = (x0, y0, x1, y1, ramp, f) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, R.tone(ramp, f(x, y), x, y)); };
const vn = (x, y, k = 0) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = hh(xi, yi, k), b = hh(xi + 1, yi, k), c = hh(xi, yi + 1, k), d = hh(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const caja = (x0, y0, x1, y1, c, b = K0) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// tablas con veta, juntas y nudos; vert: tablas verticales (friso, lamas)
const tablas = (x0, y0, x1, y1, ramp, alto = 6, k = 0, vert = false) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const a = vert ? x - x0 : y - y0, b = vert ? y : x, fila = Math.floor(a / alto), j = a % alto, junta = j === alto - 1;
  const largo = 50 + Math.floor(hh(fila, 3, k) * 50), jx = (b + Math.floor(hh(fila, 7, k) * 60)) % largo === 0;
  if (junta || jx) { R.pset(x, y, ramp[0]); continue; }
  const veta = Math.sin(b * 0.11 + fila * 2.7 + Math.sin(b * 0.03 + fila) * 2 + j * 0.8) * 0.45, nudo = Math.hypot(((b * 7 + fila * 31) % 97) - 48, (j - alto / 2) * 3) < 3 ? -0.9 : 0;
  R.pset(x, y, R.tone(ramp, 1.7 + veta + nudo + (hh(fila, 1, k) - 0.5) * 0.6 + (j === 0 ? 0.6 : 0), x, y)); } };
// nube de tres tonos (sombra abajo, luz arriba); ok(x, y) la recorta
const nube = (cx, cy, w, T3, ok = null) => { const bs = [[0, -w * 0.13, w * 0.24], [-w * 0.27, 0, w * 0.19], [w * 0.27, 0, w * 0.2], [-w * 0.06, 0.02 * w, w * 0.26]];
  const x0 = Math.floor(cx - w * 0.5), x1 = Math.ceil(cx + w * 0.5), y0 = Math.floor(cy - w * 0.4), y1 = Math.ceil(cy + w * 0.12);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let d = 9; for (const [dx, dy, r] of bs) { const q = Math.hypot(x + 0.5 - cx - dx, (y + 0.5 - cy - dy) * 1.35) / r; if (q < d) d = q; }
    if (d > 1 || (ok && !ok(x, y))) continue; R.pset(x, y, R.tone(T3, 2.7 - (y - y0) / Math.max(1, y1 - y0) * 2.4 - (d > 0.82 ? 0.5 : 0), x, y)); } };
// pájaros que cruzan aleteando entre x0 y x1
const aves = (t, x0, x1, y, c, n = 3, v = 12, k = 0) => { for (let i = 0; i < n; i++) { const L = x1 - x0 + 30, x = Math.round(x0 - 15 + ((((t * v + i * 19 + k * 37) % L) + L) % L)), yy = Math.round(y + i * 4 + Math.sin(t * 1.7 + i) * 2), a = Math.sin(t * 9 + i * 2) > 0;
  for (const [dx, dy] of [[0, 0], [-1, a ? -1 : 0], [1, a ? -1 : 0], [-2, a ? -2 : 1], [2, a ? -2 : 1]]) { const px = x + dx; if (px >= x0 && px <= x1) R.pset(px, yy + dy, c); } } };
// el cielo de una ventana (o de un hueco): tramado, nubes de tres tonos a tres velocidades y pájaros; o.noche con
// estrellas que titilan y o.luna [x, y]; o.invierno; o.ok(x, y) recorta además
const cieloCaja = (x0, y0, x1, y1, t, o = {}) => {
  const N = o.noche, ramp = N ? rp('#0a0e2a', '#121a40', '#1c2856', '#2a3a6c') : o.gris ? rp('#3e4656', '#545e70', '#6e788c', '#8c96a8') : o.invierno ? rp('#7c8eae', '#98a8c4', '#b8c6da', '#d8e0ec') : rp('#3a7ad0', '#5a96e0', '#86b8ee', '#b8d8f6');
  const ok = (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1 && (!o.ok || o.ok(x, y));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (!o.ok || o.ok(x, y)) R.pset(x, y, R.tone(ramp, 0.3 + 3 * (y - y0) / Math.max(1, y1 - y0) + (hh(x >> 1, y >> 1, 3) - 0.5) * 0.35, x, y));
  if (N) { const n = Math.round((x1 - x0) * (y1 - y0) / 50); for (let i = 0; i < n; i++) { const sx = x0 + Math.floor(hh(i, 1, 7) * (x1 - x0 + 1)), sy = y0 + Math.floor(hh(i, 2, 7) * (y1 - y0) * 0.85); if (!ok(sx, sy)) continue; const tw = Math.sin(t * (2 + hh(i, 4)) * 2 + i); if (tw > -0.5) R.pset(sx, sy, hh(i, 3, 7) > 0.75 && tw > 0.5 ? hex('#ffffff') : hex('#8a9ad8')); }
    if (o.luna) { const [lx, ly] = o.luna; for (let y = ly - 7; y <= ly + 7; y++) for (let x = lx - 7; x <= lx + 7; x++) { const d = Math.hypot(x - lx, y - ly); if (!ok(x, y)) continue; if (d < 6) R.pset(x, y, Math.hypot(x - lx - 2, y - ly + 1) < 1.6 || Math.hypot(x - lx + 2, y - ly - 2) < 1.2 ? hex('#c8c4b0') : hex('#f2eedc')); else if (d < 8 && hh(x, y) > 0.5) R.pset(x, y, hex('#3a4a7a')); } } }
  else { const T3 = o.gris ? rp('#2a303c', '#4a5262', '#6e7688') : o.invierno ? rp('#8e98ac', '#c4cad8', '#eef0f6') : rp('#8aa4c8', '#d0def0', '#ffffff');
    const n = o.nubes ?? 3; for (let k = 0; k < n; k++) { const v = [2.2, 4, 6.5][k % 3] * (o.viento ?? 1), w = (o.tamNube ?? 22) * (0.7 + 0.3 * (k % 3)), L = x1 - x0 + w * 2; const cx = x0 - w + ((((t * v + k * 61 + (o.k ?? 0) * 13) % L) + L) % L); nube(cx, y0 + 6 + k * (o.dyNube ?? 9), w, T3, ok); }
    if (o.aves !== false) aves(t, x0, x1, y0 + 8, hex('#2a2838'), 3, 11, o.k ?? 0); }
};
// libros en una balda (de x0 a x1, apoyados en y): lomos de colores, alturas distintas, alguno tumbado
const LIBROS = rp('#8a2a2a', '#2a4a7a', '#3a6a3a', '#c89a3a', '#6a3a6a', '#a8643a', '#2a6a6a', '#d8c8a0', '#4a3a2a', '#9a3a4a');
const libros = (x0, x1, y, hmax, k = 0, cols = LIBROS) => { let x = x0, i = 0; const cr = hex('#f0e0b0');
  while (x < x1 - 2) { const w = 2 + Math.floor(hh(i, 1, k) * 3), hb = Math.max(4, hmax - Math.floor(hh(i, 2, k) * hmax * 0.45)), c = cols[Math.floor(hh(i, 3, k) * cols.length)];
    if (hh(i, 9, k) > 0.88 && x + hb + 1 < x1) { R.rect(x, y - w - 1, x + hb, y - 1, K0); R.rect(x + 1, y - w, x + hb - 1, y - 2, c); R.rect(x + 1, y - w, x + hb - 1, y - w, mez(c, cr, 0.4)); x += hb + 2; i++; continue; }
    if (x + w > x1) break;
    R.rect(x, y - hb, x + w, y - 1, K0); R.rect(x + 1, y - hb + 1, x + w - 1, y - 1, c); R.rect(x + w - 1, y - hb + 1, x + w - 1, y - 1, mez(c, K0, 0.35));
    if (w >= 3) { R.rect(x + 1, y - hb + 3, x + w - 2, y - hb + 3, mez(c, cr, 0.55)); R.rect(x + 1, y - 4, x + w - 2, y - 4, mez(c, cr, 0.4)); }
    x += w + 1; i++; } };
const MAD = rp('#3a2214', '#5e3a1e', '#83552c', '#a8743c', '#c8945a');
const estanteria = (x0, y0, x1, y1, k = 0, o = {}) => { const M = o.ramp ?? MAD, paso = o.paso ?? 20;
  R.rect(x0, y0, x1, y1, K0); llena(x0 + 1, y0 + 1, x1 - 1, y1 - 1, M, (x, y) => 0.4 + vn(x * 0.2, y * 0.05, k) * 0.7);
  for (let y = y0 + paso; y <= y1 - 2; y += paso) { libros(x0 + 4, x1 - 4, y - 1, paso - 5, k + y, o.cols); R.rect(x0 + 1, y, x1 - 1, y + 2, M[2]); R.rect(x0 + 1, y, x1 - 1, y, M[3]); R.rect(x0 + 1, y + 3, x1 - 1, y + 3, M[0]); }
  for (const xs of [x0 + 1, x1 - 3]) { R.rect(xs, y0 + 1, xs + 2, y1 - 1, M[2]); R.rect(xs, y0 + 1, xs, y1 - 1, M[3]); }
  R.rect(x0, y0, x1, y0 + 2, M[3]); R.rect(x0, y0 + 3, x1, y0 + 3, M[1]); };
// marco de madera de 3 px (luz arriba a la izquierda)
const marco = (x0, y0, x1, y1, M = MAD) => { R.rect(x0, y0, x1, y1, K0); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, M[2]); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, M[4]); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, M[3]); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, M[1]); R.rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, M[1]); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, K0); };
// una planta en maceta (hojas que se mecen)
const planta = (x, y, t, s = 1) => { R.rect(x - 5, y - 9, x + 5, y, K0); R.rect(x - 4, y - 8, x + 4, y - 1, hex('#b0583a')); R.rect(x - 4, y - 8, x + 4, y - 7, hex('#d07a52')); R.rect(x + 2, y - 6, x + 3, y - 2, hex('#8a3e28'));
  for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.36 + Math.sin(t * 1.3 + i) * 0.06, L = (10 + hh(i, 2) * 8) * s; for (let r = 0; r < L; r++) { const px = Math.round(x + Math.cos(a) * r), py = Math.round(y - 9 + Math.sin(a) * r + (r / L) ** 2 * 3); R.pset(px, py, r > L - 2 ? hex('#8ac85a') : i % 2 ? hex('#3a7a2a') : hex('#2a5a1e')); R.pset(px + 1, py, hex('#5a9a3a')); } } };

// ── el globo terráqueo (proyección ortográfica) ──
const D2R = Math.PI / 180;
const TIERRAS = [
  [[-80, 10], [-75, 11], [-62, 10], [-52, 5], [-50, 0], [-44, -2], [-35, -5], [-35, -9], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-63, -41], [-65, -45], [-68, -50], [-69, -53], [-66, -55], [-72, -54], [-75, -50], [-74, -44], [-73, -37], [-71, -30], [-71, -18], [-76, -14], [-81, -6], [-80, -2], [-78, 2], [-78, 7]],
  [[-17, 21], [-16, 28], [-10, 31], [-6, 36], [10, 37], [11, 33], [20, 31], [32, 31], [34, 28], [43, 12], [51, 12], [42, -1], [40, -10], [40, -16], [35, -24], [33, -28], [27, -34], [20, -35], [18, -32], [15, -27], [12, -18], [13, -12], [9, -1], [9, 4], [5, 6], [-4, 5], [-8, 4], [-13, 8], [-17, 14]],
  [[-168, 66], [-140, 70], [-95, 72], [-80, 63], [-64, 60], [-55, 52], [-66, 45], [-70, 42], [-76, 35], [-81, 31], [-80, 25], [-82, 29], [-90, 30], [-97, 27], [-97, 22], [-87, 21], [-83, 15], [-77, 8], [-80, 8], [-86, 12], [-92, 15], [-105, 20], [-110, 24], [-117, 32], [-124, 40], [-124, 48], [-133, 56], [-150, 60], [-165, 60]],
  [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [8, 54], [10, 57], [18, 60], [22, 65], [28, 71], [60, 70], [80, 73], [105, 77], [140, 72], [170, 70], [179, 66], [160, 60], [140, 55], [135, 43], [122, 40], [121, 31], [110, 20], [105, 10], [100, 13], [98, 8], [92, 22], [80, 15], [77, 8], [72, 20], [66, 25], [57, 26], [50, 30], [56, 25], [52, 17], [44, 12], [38, 20], [34, 28], [36, 36], [27, 37], [26, 40], [22, 36], [20, 40], [13, 45], [16, 38], [10, 44], [3, 43], [-2, 37]],
  [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [141, -38], [131, -31], [115, -34]],
  [[-50, 60], [-42, 60], [-20, 70], [-20, 80], [-60, 82], [-70, 77], [-55, 68]],
];
const CAJAS = TIERRAS.map((P) => P.reduce((a, [x, y]) => [Math.min(a[0], x), Math.min(a[1], y), Math.max(a[2], x), Math.max(a[3], y)], [999, 999, -999, -999]));
const enPol = (lon, lat, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) c = !c; } return c; };
const bordeAnt = (lon) => { let e = -69 + 2.5 * Math.sin(lon * D2R * 2 + 1) + 1.5 * Math.sin(lon * D2R * 5);
  e -= 9 * Math.exp(-(((((lon - 180 + 540) % 360) - 180) / 18) ** 2)); e -= 7 * Math.exp(-(((lon + 45) / 14) ** 2));
  if (lon > -76 && lon < -46) e = Math.max(e, -63.2 - Math.abs(lon + 60) * 0.9); return e; };
// 0 mar, 1 tierra, 2 hielo de la Antártida
const sueloG = (lon, lat) => { lon = ((lon + 540) % 360) - 180; if (lat < bordeAnt(lon)) return 2; for (let i = 0; i < TIERRAS.length; i++) { const b = CAJAS[i]; if (lon < b[0] || lon > b[2] || lat < b[1] || lat > b[3]) continue; if (enPol(lon, lat, TIERRAS[i])) return 1; } return 0; };
const G_OC = rp('#0a1e40', '#123466', '#1a4c8a', '#2466aa', '#3e84c8', '#6aa6dc');
const G_VE = rp('#1a3416', '#2a5222', '#3e7030', '#5a8c3c', '#7aa84c');
const G_AR = rp('#4a3420', '#7a5a34', '#a8824a', '#c8a462', '#e0c48a');
const G_HI = rp('#5a6e8e', '#8aa2c2', '#b8cce2', '#e0eaf6', '#ffffff');
const G_MA = rp('#4a1008', '#9a2410', '#d8501a', '#ff8a2a', '#ffd070');
// globo(cx, cy, r, lon0, lat0, o): o.desliza (grados: la piel resbala hacia el norte y abajo asoma el manto naranja),
// o.deshielo 0–1 (la Antártida que queda fuera del frío pierde el hielo), o.atm (el halo de la atmósfera, en el
// espacio), o.nubes (t: nubes que se mueven), o.drake 0–1 (el mar entre Sudamérica y la Antártida brilla), o.oro 0–1
// (la costa de Sudamérica en oro), o.reticula (true). Devuelve { P(lon, lat) → [x, y] | null }.
const globo = (cx, cy, r, lon0, lat0, o = {}) => {
  const c0 = Math.cos(lat0 * D2R), s0 = Math.sin(lat0 * D2R), d = o.desliza ?? 0;
  const X0 = Math.max(0, Math.floor(cx - r - 1)), X1 = Math.min(319, Math.ceil(cx + r + 1)), Y0 = Math.max(0, Math.floor(cy - r - 1)), Y1 = Math.min(179, Math.ceil(cy + r + 1));
  const W = X1 - X0 + 1, Hh = Y1 - Y0 + 1; if (W <= 0 || Hh <= 0) return { P: () => null };
  const tipo = new Int8Array(W * Hh).fill(-1), LA = new Float32Array(W * Hh), LO = new Float32Array(W * Hh), SH = new Float32Array(W * Hh);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
    const nx = (x + 0.5 - cx) / r, ny = (y + 0.5 - cy) / r, q = nx * nx + ny * ny; if (q > 1) continue;
    const z = Math.sqrt(1 - q), Yv = -ny, lat = Math.asin(cl(Yv * c0 + z * s0, -1, 1)) / D2R, lon = lon0 + Math.atan2(nx, z * c0 - Yv * s0) / D2R, ls = lat - d;
    let k; if (ls < -90) k = 4; else { k = sueloG(lon, ls); if (k === 2 && o.deshielo && lat > -24 - 36 * o.deshielo) k = 3; if (k === 1 && Math.abs(ls) > 14 && Math.abs(ls) < 32 && vn(lon * 0.1, ls * 0.1, 3) > 0.45) k = 5; }
    const i = (y - Y0) * W + (x - X0); tipo[i] = k; LA[i] = ls; LO[i] = lon; SH[i] = -0.45 * nx + 0.5 * Yv + 0.74 * z;
  }
  const ORO = hex('#ffd84a'), pulso = 0.5 + 0.5 * Math.sin((o.t ?? 0) * 6);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
    const i = (y - Y0) * W + (x - X0), k = tipo[i]; if (k < 0) continue;
    const at = (dx, dy) => { const xx = x + dx - X0, yy = y + dy - Y0; if (xx < 0 || yy < 0 || xx >= W || yy >= Hh) return -1; return tipo[yy * W + xx]; };
    const s = SH[i], lat = LA[i], lon = LO[i]; let c;
    const vecMar = k !== 0 && k !== 4 && (at(1, 0) === 0 || at(-1, 0) === 0 || at(0, 1) === 0 || at(0, -1) === 0);
    const vecTie = k === 0 && (at(1, 0) > 0 || at(-1, 0) > 0 || at(0, 1) > 0 || at(0, -1) > 0);
    if (k === 0) { c = R.tone(G_OC, 0.6 + s * 4.2 + (hh(x, y, 2) - 0.5) * 0.4, x, y); if (vecTie) c = o.oro && lon > -90 && lon < -30 && lat < 12 && lat > -60 ? mez(c, ORO, o.oro * (0.55 + 0.35 * pulso)) : mez(c, hex('#bfe4f4'), 0.55);
      if (o.drake && lat < -54 && lat > -64 && lon > -72 && lon < -54) { const ola = Math.sin(lon * 1.3 + lat * 2 + (o.t ?? 0) * 5) > 0.6; c = mez(c, ola ? hex('#ffffff') : hex('#6ae0f0'), o.drake * (ola ? 0.7 : 0.35 + 0.25 * pulso)); } }
    else if (k === 1) c = R.tone(G_VE, 0.6 + s * 3.6 + (vn(lon * 0.3, lat * 0.3, 5) - 0.5) * 1.2, x, y);
    else if (k === 5) c = R.tone(G_AR, 0.6 + s * 3.6 + (vn(lon * 0.3, lat * 0.3, 6) - 0.5) * 1.0, x, y);
    else if (k === 2) c = R.tone(G_HI, 0.4 + s * 4.4 + (hh(x, y, 4) - 0.5) * 0.3, x, y);
    else if (k === 3) c = R.tone(vn(lon * 0.4, lat * 0.4, 8) > 0.5 ? G_VE : G_AR, 0.8 + s * 3.4, x, y);
    else { const m = vn(lon * 0.12 + (o.t ?? 0) * 0.4, lat * 0.2, 9); c = R.tone(G_MA, 0.8 + m * 2.6 + s * 1.2, x, y); if (lat > -91.6) c = K0; }
    if (vecMar) c = o.oro && sueloG(lon, lat) === 1 && lon > -90 && lon < -30 && lat < 12 ? mez(K0, ORO, o.oro * (0.6 + 0.4 * pulso)) : mez(c, K0, 0.55);
    if (o.reticula !== false && k !== 4) { const g = 2.2 * 57 / r, a = ((lat % 30) + 30) % 30, b = ((((lon - (o.giroRet ?? 0)) % 30) + 30) % 30); if (a < g * 0.5 || b < g * 0.5) c = mez(c, hex('#e8f0ff'), 0.22); }
    if (o.nubes != null && k !== 4) { const n = vn(lon * 0.09 + o.nubes * 0.25, lat * 0.16, 11) * 0.7 + vn(lon * 0.3, lat * 0.4, 12) * 0.3; if (n > 0.62) c = mez(c, hex('#ffffff'), Math.min(0.85, (n - 0.62) * 4)); }
    const q = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (q > 1 - 1.6 / r) c = mez(c, K0, 0.6); else if (q > 0.86) c = mez(c, hex('#0a0a20'), (q - 0.86) * 1.6);
    if (Math.hypot(x - (cx - r * 0.38), y - (cy - r * 0.42)) < r * 0.12) c = mez(c, hex('#ffffff'), 0.28);
    R.pset(x, y, c);
  }
  if (o.atm) for (let a = 0; a < 360; a += 0.7) { const ca = Math.cos(a * D2R), sa = Math.sin(a * D2R), lit = 0.5 + 0.5 * (-0.6 * ca - 0.8 * sa); for (let j = 1; j <= 3; j++) { const px = Math.round(cx + (r + j) * ca), py = Math.round(cy + (r + j) * sa); if (j === 3 && lit < 0.5) continue; R.pset(px, py, mez(R.pget(px, py), j === 1 ? hex('#8ad0ff') : hex('#3a7ae0'), (j === 1 ? 0.85 : 0.5) * (0.4 + 0.6 * lit))); } }
  const P = (lon, lat) => { const l = (lon - lon0) * D2R, f = lat * D2R, cc = s0 * Math.sin(f) + c0 * Math.cos(f) * Math.cos(l); if (cc < 0) return null; return [cx + r * Math.cos(f) * Math.sin(l), cy - r * (c0 * Math.sin(f) - s0 * Math.cos(f) * Math.cos(l))]; };
  return { P };
};
// el meridiano de latón y el pie de un globo de mesa (detrás: el aro; delante, el pie)
const aroGlobo = (cx, cy, r) => { for (let a = -150; a <= 150; a += 0.6) { const px = Math.round(cx + (r + 3) * Math.sin(a * D2R)), py = Math.round(cy - (r + 3) * Math.cos(a * D2R)); R.pset(px, py, K0); R.pset(px + (a > 0 ? 1 : -1), py, hex('#c8962a')); R.pset(px + (a > 0 ? 2 : -2), py, a > 0 ? hex('#8a5a14') : hex('#f0c860')); } };
// el mapita de 1513 (la costa de Sudamérica que se tuerce hacia el este), en la caja (x0, y0, w, h); o.oro 0–1 la costa
// en oro; o.costa false: sin tierra (solo el pergamino); o.sinBorde. Se recorta con clip() desde fuera si hace falta.
const PERG = rp('#7a5a34', '#b8965e', '#d8bc84', '#ead6a4', '#f6e8c4');
const TIE = rp('#8a6a3a', '#a8864a', '#b8a060', '#9aa868');
const COSTA_PIRI = [[0.12, 0], [0.3, 0.08], [0.52, 0.22], [0.56, 0.3], [0.44, 0.46], [0.36, 0.6], [0.28, 0.7], [0.3, 0.78], [0.44, 0.84], [0.62, 0.86], [0.8, 0.88], [1, 0.9]];
const mapita = (x0, y0, w, h, t, o = {}) => {
  const X = (u) => x0 + u * w, Y = (v) => y0 + v * h, Xi = Math.round(x0), Yi = Math.round(y0), Xf = Math.round(x0 + w), Yf = Math.round(y0 + h);
  for (let y = Yi; y <= Yf; y++) for (let x = Xi; x <= Xf; x++) { const e = Math.min(x - Xi, Xf - x, y - Yi, Yf - y); R.pset(x, y, R.tone(PERG, 2.5 + (hh(x >> 1, y >> 1, 9) - 0.5) * 0.7 - (e < 2 && !o.sinBorde ? 1.2 : 0) - vn(x * 0.12, y * 0.12, 4) * 0.6, x, y)); }
  if (o.costa === false) return;
  const pol = [[0, 0], ...COSTA_PIRI, [1, 1], [0, 1]].map(([u, v]) => [X(u), Y(v)]);
  R.poligono(pol, (x, y) => R.tone(TIE, 1.2 + vn(x * 0.2, y * 0.2, 6) * 1.6, x, y));
  if (w > 40) { for (let i = 0; i < 6; i++) { const mx = X(0.06 + hh(i, 1, 3) * 0.2), my = Y(0.15 + i * 0.12); R.pset(mx, my, hex('#5a3a22')); R.pset(mx - 1, my + 1, hex('#5a3a22')); R.pset(mx + 1, my + 1, hex('#5a3a22')); }
    const rx = X(0.76), ry = Y(0.42), rr0 = Math.max(3, w * 0.07); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(rx, ry, rx + Math.cos(a) * rr0 * (k % 2 ? 0.6 : 1), ry + Math.sin(a) * rr0 * (k % 2 ? 0.6 : 1), k % 4 === 0 ? hex('#a83224') : hex('#2a4a7a')); }
    for (let k = 0; k < 4; k++) { const lx0 = X(0.58 + k * 0.08), ly0 = Y(0.08 + (k % 2) * 0.05); R.linea(lx0, ly0, lx0 + w * 0.05, ly0, hex('#a83224')); }
    const bx = X(0.7) + Math.sin(t * 1.5) * 1, by = Y(0.66); R.linea(bx - 3, by, bx + 3, by, hex('#5a3a22')); R.linea(bx - 2, by + 1, bx + 2, by + 1, hex('#5a3a22')); R.linea(bx, by - 4, bx, by, hex('#5a3a22')); R.pset(bx + 1, by - 3, hex('#f6f0de')); R.pset(bx + 1, by - 2, hex('#f6f0de')); }
  const tin = o.oro ? mez(hex('#2a2018'), hex('#ffd84a'), o.oro) : hex('#2a2018');
  for (let i = 0; i + 1 < COSTA_PIRI.length; i++) { const [a, b] = COSTA_PIRI[i], [c, dd] = COSTA_PIRI[i + 1]; R.linea(X(a), Y(b), X(c), Y(dd), tin); if (w > 60 || o.oro) R.linea(X(a) + 1, Y(b), X(c) + 1, Y(dd), o.oro ? tin : mez(tin, hex('#3a6a8a'), 0.5)); if (o.oro) R.linea(X(a), Y(b) + 1, X(c), Y(dd) + 1, tin); }
};
// el mapa polar (proyección azimutal desde el polo sur) en la caja [x0, y0, x1, y1], centro (cx, cy), k px por grado;
// lon = ángulo − giro. Mar de papel azul claro con los círculos de latitud a trazos; la Antártida blanca con su filo
// azul; Sudamérica ocre. o.ilumina(lon, lat) → 0–1 hace brillar la tierra (la punta, la península).
const polar = (x0, y0, x1, y1, cx, cy, k, giro, o = {}) => {
  const W = x1 - x0 + 1, Hh = y1 - y0 + 1, tp = new Int8Array(W * Hh);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx, dy = y + 0.5 - cy, rho = Math.hypot(dx, dy) / k, th = Math.atan2(dx, -dy) / D2R; tp[(y - y0) * W + (x - x0)] = rho > 52 ? 0 : sueloG(th - giro, -90 + rho); }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = (y - y0) * W + (x - x0), q = tp[i], dx = x + 0.5 - cx, dy = y + 0.5 - cy, rho = Math.hypot(dx, dy) / k;
    const vec = (a, b) => { const xx = x + a - x0, yy = y + b - y0; return xx < 0 || yy < 0 || xx >= W || yy >= Hh ? q : tp[yy * W + xx]; }, borde = q !== vec(1, 0) || q !== vec(0, 1) || q !== vec(-1, 0) || q !== vec(0, -1);
    let c; if (q === 0) { c = (o.mar ?? hex('#a8d0ea')); if (Math.abs(rho % 10) < 0.6 / k * 2 && (Math.atan2(dx, -dy) * 20 | 0) % 2) c = hex('#7aa8cc'); if (hh(x, y, 5) > 0.92) c = mez(c, hex('#ffffff'), 0.3); }
    else if (q === 2) c = hh(x, y, 6) > 0.85 ? hex('#e4eef8') : hex('#f6fafe'); else c = R.tone(rp('#a8864a', '#c8a462', '#d8bc7a'), 1.2 + vn(x * 0.2, y * 0.2) * 1.2, x, y);
    if (borde) c = q === 0 ? hex('#6a9ac8') : hex('#2a4a7a');
    if (o.ilumina && q !== 0) { const th = Math.atan2(dx, -dy) / D2R, g = o.ilumina(th - giro, -90 + rho); if (g > 0) c = mez(c, hex('#ffd84a'), g); }
    R.pset(x, y, c); } };
'''


def cuerpo(id_, txt):
    return COMUN + _en(id_, txt)


# ─────────────────────────────────────────── PR-DANIKEN ───────────────────────────────────────────
E['pr-daniken'] = ('El mapa imposible', '''// PR-DANIKEN (frase 18), 1968 → 1973 → 2026. Cuatro planos (todos con fondo local):
// 1. «From there the legend grew. In 1968, a Swiss writer…»: una firma de libros de 1968; el escritor de las gafas grandes
//    firma, entrega el libro a una lectora que se va contenta, la cola avanza y, en «Erich von Däniken», el flash del
//    fotógrafo; detrás, el caballete con la portada (una nave sobre un mapa), lámparas de bola y una dependienta en la escalera;
// 2. corte en «claimed»: su idea, contada como la portada: en el espacio, una nave saca una foto de la Tierra (flash en
//    «photo») y de ella sale una foto que es el mapa; la costa de la foto y la de Sudamérica brillan a la vez («from space»);
// 3. corte en «and that this pointed…»: un salón de 1973; la tele se enciende con el documental: el mapa y luces en el
//    cielo; en «planets» el niño da un salto y las palomitas saltan del bol;
// 4. corte en «websites»: hoy, de noche, un chico en su cuarto; en el monitor, vídeos con flechas y círculos rojos que
//    suben; en «the impossible map» hace clic: el mapa a pantalla completa con el círculo rojo, y el contador que sube.''', cuerpo('pr-daniken', r'''
const P2 = @6.06@, P3 = @10.52@, P4 = @14.70@;
// ── 1 · la firma de libros de 1968 ──
const fondoFirma = () => {
  llena(0, 0, 319, 14, rp('#c8b890', '#d8c8a0', '#e4d6b0'), (x, y) => 1.2 + y * 0.05 + (hh(x >> 2, y >> 2) - 0.5) * 0.3);
  R.rect(0, 15, 319, 15, hex('#a8946a')); R.rect(0, 16, 319, 16, hex('#f2e6c4'));
  llena(0, 17, 319, 150, rp('#b89a6a', '#cdb07e', '#dcc292', '#e8d2a6'), (x, y) => 1.6 + vn(x * 0.06, y * 0.06, 1) * 0.6 - y * 0.004);
  // el friso de lamas de teca detrás de la mesa
  R.rect(62, 56, 252, 150, K0); tablas(63, 57, 251, 150, rp('#3a2214', '#6a3e1e', '#8a5428', '#a86a34', '#c4844a'), 5, 3, true);
  R.rect(62, 56, 252, 58, hex('#5a3418')); R.rect(62, 56, 252, 56, hex('#c88a50'));
  estanteria(0, 22, 60, 150, 1, { paso: 21 }); estanteria(254, 52, 319, 150, 5, { paso: 20 });
  // el reloj de sol de los sesenta
  const rx = 226, ry = 36; for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; R.linea(rx, ry, rx + Math.cos(a) * (k % 2 ? 9 : 12), ry + Math.sin(a) * (k % 2 ? 9 : 12), k % 2 ? hex('#a87a18') : hex('#e8b830')); }
  R.disco(rx, ry, 5, K0); R.disco(rx, ry, 4, hex('#f6f2ea')); R.linea(rx, ry, rx, ry - 3, K0); R.linea(rx, ry, rx + 2, ry + 1, K0);
  // el caballete con la portada: el espacio, la nave y su haz sobre un mapa
  R.linea(160, 100, 140, 150, K0); R.linea(161, 100, 141, 150, hex('#8a5a2e')); R.linea(160, 100, 180, 150, K0); R.linea(161, 100, 181, 150, hex('#a8743c')); R.linea(160, 104, 160, 150, hex('#5e3a1c'));
  R.rect(126, 30, 194, 106, K0); R.rect(127, 31, 193, 105, hex('#f6f0de'));
  llena(129, 33, 191, 103, rp('#0a0c24', '#141a44', '#1e2a5e', '#2a3a74'), (x, y) => 0.4 + (y - 33) / 30 + (hh(x, y, 4) - 0.5) * 0.4);
  for (let i = 0; i < 40; i++) R.pset(129 + Math.floor(hh(i, 1, 9) * 62), 37 + Math.floor(hh(i, 2, 9) * 40), hh(i, 3) > 0.7 ? hex('#ffffff') : hex('#8a9ad8'));
  R.rect(129, 33, 191, 36, hex('#e8803a')); R.rect(129, 37, 191, 37, hex('#b05a24'));
  R.poligono([[154, 56], [166, 56], [182, 94], [138, 94]], (x, y) => mez(R.pget(x, y), hex('#fff0a0'), 0.35 + (hh(x, y) > 0.7 ? 0.15 : 0)));
  for (let x = 147; x <= 173; x++) for (let y = 47; y <= 56; y++) { const d = ((x - 160) / 13) ** 2 + ((y - 52) / 4.5) ** 2; if (d <= 1) R.pset(x, y, y < 51 ? hex('#e0e4ec') : y < 54 ? hex('#a8b0c0') : hex('#6a7284')); }
  for (let x = 154; x <= 166; x++) for (let y = 42; y <= 48; y++) if (((x - 160) / 6) ** 2 + ((y - 48) / 5.5) ** 2 <= 1) R.pset(x, y, y < 45 ? hex('#c8f0f8') : hex('#6ab8d0'));
  for (const lx of [150, 156, 164, 170]) R.pset(lx, 53, hex('#ffd84a'));
  mapita(146, 82, 28, 16, 0, { sinBorde: false });
  R.rect(129, 99, 191, 103, hex('#3a2a4a')); for (let x = 132; x < 190; x += 4) R.rect(x, 100, x + 2, 102, hex('#8a4a8a'));
  // la alfombra roja de la cola y el suelo de terrazo
  llena(0, 151, 319, 179, rp('#a89a80', '#c8b89a', '#dccdae', '#ecdfc4'), (x, y) => 1.6 + (y - 151) * 0.03 + (hh(x, y, 2) > 0.93 ? -1.2 : 0) + (hh(x, y, 5) > 0.96 ? 1.2 : 0));
  for (let y = 151; y <= 179; y += 7) R.rect(0, y, 319, y, hex('#b0a080'));
  for (let x = 0; x <= 319; x += 22) R.linea(x, 151, x + (x - 160) * 0.25, 179, hex('#b0a080'));
  R.poligono([[198, 156], [319, 156], [319, 176], [190, 176]], (x, y) => R.tone(rp('#6a1a1a', '#8e2424', '#b03030'), 1.2 + (hh(x, y >> 1, 3) - 0.5) * 0.6, x, y));
  R.rect(190, 156, 319, 156, hex('#d8a040')); R.rect(190, 176, 319, 176, hex('#d8a040'));
  planta(244, 150, 0, 1.1);
};
const banderines = (t) => { for (let i = 0; i < 21; i++) { const u = i / 20, x = Math.round(66 + u * 184), y = Math.round(26 + Math.sin(u * Math.PI) * 5 + Math.sin(t * 2 + i) * 0.7); R.pset(x, y, K0);
  if (i < 20) { const c = [hex('#e8803a'), hex('#2a8a8a'), hex('#f2e6c4'), hex('#c83a3a')][i % 4], sw = Math.round(Math.sin(t * 2.4 + i * 0.9) * 1.2); R.poligono([[x + 1, y], [x + 8, y + 0.5], [x + 4 + sw, y + 7]], c); R.linea(x + 1, y, x + 8, y, K0); } } };
const lamparas = (t) => { for (const [lx, f] of [[104, 0], [214, 1.3]]) { const a = Math.sin(t * 1.4 + f) * 0.07, bx = Math.round(lx + Math.sin(a) * 26), by = 17 + 24;
  R.linea(lx, 17, bx, by - 6, K0); R.disco(bx, by, 6, K0); R.disco(bx, by, 5, hex('#e89040')); R.disco(bx - 1, by - 1, 3, hex('#ffd890')); R.pset(bx - 2, by - 3, hex('#ffffff')); luz(bx, by + 6, 24, hex('#ffe0a0'), 0.16); } };
const mesaFirma = (t, libroPadre) => {
  // las pirámides de libros con la nave en la portada y el libro abierto
  const tapa = (x, y) => { R.rect(x, y, x + 10, y + 3, K0); R.rect(x + 1, y + 1, x + 9, y + 2, hex('#1e2a5e')); R.pset(x + 5, y + 1, hex('#c8ccd8')); R.pset(x + 4, y + 2, hex('#ffd84a')); R.rect(x + 1, y + 3, x + 9, y + 3, hex('#f2eee2')); };
  R.rect(62, 139, 198, 146, K0); llena(63, 140, 197, 145, rp('#5a3418', '#8a5428', '#a86a34', '#c88a50'), (x, y) => 2.4 - (y - 140) * 0.35 + Math.sin(x * 0.2 + y) * 0.3);
  R.rect(62, 147, 198, 166, K0); llena(63, 147, 197, 165, rp('#1e4a4a', '#2a6464', '#3a7a78', '#4e928e'), (x, y) => 2 + Math.sin(x * 0.45) * 0.6 - (y - 147) * 0.02);
  for (let x = 64; x < 197; x += 3) { R.pset(x, 165, hex('#e8b830')); R.pset(x + 1, 166, hex('#a87a18')); }
  R.disco(130, 156, 6, hex('#f2e6c4')); R.disco(130, 156, 5, hex('#1e2a5e')); R.rect(126, 156, 134, 156, hex('#c8ccd8')); R.pset(130, 155, hex('#c8f0f8'));
  for (const [x0, n] of [[68, 3], [168, 3]]) for (let f = 0; f < n; f++) for (let k = 0; k < n - f; k++) tapa(x0 + k * 9 + f * 4, 135 - f * 4);
  R.rect(128, 137, 147, 141, K0); R.rect(129, 138, 137, 140, hex('#f6f2ea')); R.rect(138, 138, 146, 140, hex('#ece6d6')); R.rect(137, 138, 137, 140, hex('#b8b0a0'));
  for (let x = 130; x < 136; x += 2) R.pset(x, 139, hex('#8a8a9a'));
  R.rect(102, 130, 106, 138, K0); R.rect(103, 131, 105, 137, hex('#d8e0e8')); R.pset(104, 129, hex('#e83a3a')); R.pset(103, 128, hex('#e8c040')); R.pset(105, 128, hex('#e83a8a')); R.linea(104, 130, 104, 129, hex('#3a7a2a'));
  R.rect(112, 134, 117, 138, K0); R.rect(113, 135, 116, 137, hex('#f6f2ea')); R.pset(114, 135, hex('#5a3418'));
  if (libroPadre) tapa(184, 136);
};
const p1 = (t) => {
  capa('d1', fondoFirma);
  banderines(t); lamparas(t);
  // la dependienta en la escalera coloca un libro en la balda
  R.linea(44, 58, 52, 150, K0); R.linea(45, 58, 53, 150, hex('#a8743c')); R.linea(56, 58, 62, 150, K0); R.linea(57, 58, 63, 150, hex('#a8743c')); for (let y = 66; y < 150; y += 12) R.rect(46 + (y - 58) * 0.09, y, 57 + (y - 58) * 0.07, y, hex('#83552c'));
  const coloca = Math.sin(t * 1.6) > 0.2; const dep = R.actor(EL.senora30, 44, 102, t, { dir: -1, sostiene: coloca ? [34, 80] : true });
  if (dep.mano) { R.rect(dep.mano[0] - 2, dep.mano[1] - 5, dep.mano[0] + 1, dep.mano[1], K0); R.rect(dep.mano[0] - 1, dep.mano[1] - 4, dep.mano[0], dep.mano[1] - 1, hex('#2a6a6a')); }
  // el escritor: firma, entrega el libro, mira al flash y sonríe
  const FL = @4.64@, entrega = t > 1.3 && t < 1.9, firma = t < 1.3 || (t > 2.7 && t < FL - 0.1), mira = t >= FL && t < FL + 0.9;
  const dan = R.actor(EL.daniken, 124, 146, t, { dir: mira ? -1 : 1, sostiene: entrega ? [150, 129] : firma ? [137, 134] : false, sonrisa: t > FL, habla: t > FL + 1 && Math.sin(t * 9) > 0, dedo: t > FL + 1.1 });
  mesaFirma(t, t > 5.7);
  if (firma && dan.mano) { const [mx, my] = dan.mano, gx = mx + Math.round(Math.sin(t * 14) * 1.5), gy = my + Math.round(Math.cos(t * 11)); R.linea(gx, gy, gx + 3, gy + 3, K0); R.pset(gx + 1, gy + 1, hex('#e8b830')); R.pset(gx + 3, gy + 3, hex('#2a2a3a')); R.rect(mx - 1, my - 1, mx + 1, my + 1, K0); R.pset(mx, my, hex('#f6c290')); }
  if (entrega && dan.mano) { const [mx, my] = dan.mano; R.rect(mx, my - 6, mx + 6, my, K0); R.rect(mx + 1, my - 5, mx + 5, my - 1, hex('#1e2a5e')); R.pset(mx + 3, my - 3, hex('#c8ccd8')); }
  // la cola avanza un puesto; el primero deja su libro en la mesa
  const av = tramo(t, 2.4, 3.3), andan = t > 2.4 && t < 3.3;
  const pone = t > 5.0 && t < 5.8; const pa = R.actor(EL.padre62, Math.round(lerp(222, 202, av)), 166, t, { dir: -1, anda: andan, sostiene: pone ? [190, 137] : true, sonrisa: t > 5.6 });
  if (pa.mano && t <= 5.7) { const [mx, my] = pa.mano; R.rect(mx - 6, my - 6, mx, my, K0); R.rect(mx - 5, my - 5, mx - 1, my - 1, hex('#1e2a5e')); R.pset(mx - 3, my - 3, hex('#c8ccd8')); }
  R.actor(EL.madre62, Math.round(lerp(244, 224, av)), 166, t, { dir: -1, anda: andan, habla: t > 3.6 && t < 4.4 && Math.sin(t * 8) > 0 });
  R.actor(EL.nino62, Math.round(lerp(266, 246, av)), 166, t, { dir: -1, anda: andan, salto: t > FL && t < FL + 0.4 ? 2 : 0, sorpresa: t > FL && t < FL + 0.6 });
  R.actor(EL.alumno2, Math.round(lerp(290, 270, av)), 166, t, { dir: -1, anda: andan });
  // la lectora coge su libro firmado y se va contenta por delante de la mesa
  const sale = tramo(t, 2.0, 4.8), lx = Math.round(lerp(196, -24, sale)), ls = Math.round(lerp(166, 178, tramo(t, 2.0, 2.5)));
  const lec = R.actor(EL.alumna1, lx, ls, t, { dir: -1, anda: t > 2.0 && t < 4.8, sostiene: t > 1.6 ? true : false, sonrisa: t > 1.8 });
  if (t > 1.85 && lec.mano) { const [mx, my] = lec.mano; R.rect(mx - 6, my - 6, mx, my, K0); R.rect(mx - 5, my - 5, mx - 1, my - 1, hex('#1e2a5e')); R.pset(mx - 3, my - 3, hex('#c8ccd8')); }
  // el fotógrafo con su cámara de flash
  const fo = R.actor(EL.senor30, 22, 178, t, { dir: 1, sostiene: [42, 150], sorpresa: false });
  const [cx, cy] = fo.mano; R.rect(cx - 2, cy - 6, cx + 6, cy, K0); R.rect(cx - 1, cy - 5, cx + 5, cy - 1, hex('#3a3a46')); R.disco(cx + 3, cy - 3, 1.6, hex('#8ac0e0')); R.rect(cx - 1, cy - 11, cx + 3, cy - 7, K0); R.disco(cx + 1, cy - 9, 2, hex('#e8e8f0')); R.pset(cx + 1, cy - 9, hex('#ffffff'));
  // los postes de latón con el cordón de terciopelo, por delante de la cola
  for (const px of [200, 258, 316]) { R.rect(px - 1, 158, px + 1, 176, K0); R.rect(px, 159, px, 175, hex('#e8b830')); R.disco(px, 157, 2, hex('#e8b830')); R.rect(px - 3, 176, px + 3, 178, K0); R.rect(px - 2, 176, px + 2, 177, hex('#a87a18')); }
  for (const [a, b] of [[200, 258], [258, 316]]) for (let x = a + 1; x < b; x++) { const u = (x - a) / (b - a), y = Math.round(159 + Math.sin(u * Math.PI) * 6); R.pset(x, y, hex('#8e2424')); R.pset(x, y + 1, hex('#5a1414')); }
  const k = tramo(t, FL, FL + 0.5); if (t > FL - 0.02 && k < 1) { R.disco(cx + 1, cy - 9, 9 * (1 - k) + 2, hex('#ffffff')); luz(132, 128, 60, hex('#ffffff'), 0.5 * (1 - k)); }
};
// ── 2 · la idea de la portada: la nave saca una foto de la Tierra desde el espacio ──
const fondoEspacio = () => {
  const NB = rp('#04050e', '#080a1c', '#0e1230', '#181a46', '#2a2058');
  llena(0, 0, 319, 179, NB, (x, y) => cl(vn(x * 0.025, y * 0.045, 2) * 1.9 + vn(x * 0.08, y * 0.08, 5) * 0.7 - 0.9, 0, 4) * 1.6);
  for (let i = 0; i < 300; i++) { const x = Math.floor(hh(i, 1, 3) * 320), y = Math.floor(hh(i, 2, 3) * 180); if (x > 272 && y < 48) continue; R.pset(x, y, hh(i, 3, 3) > 0.8 ? hex('#ffffff') : hh(i, 4, 3) > 0.5 ? hex('#8a9ad8') : hex('#5a5a8a')); }
  for (const [x, y] of [[30, 120], [248, 160], [118, 22], [300, 96]]) { R.pset(x, y, hex('#ffffff')); R.pset(x - 1, y, hex('#8ab0ff')); R.pset(x + 1, y, hex('#8ab0ff')); R.pset(x, y - 1, hex('#8ab0ff')); R.pset(x, y + 1, hex('#8ab0ff')); }
  // la Luna a lo lejos
  for (let y = 26; y <= 50; y++) for (let x = 20; x <= 44; x++) { const d = Math.hypot(x - 32, y - 38); if (d > 10) continue; const lit = d < 10 && Math.hypot(x - 36, y - 36) < 11; R.pset(x, y, !lit ? hex('#2a2a3a') : Math.hypot(x - 29, y - 40) < 2.4 || Math.hypot(x - 34, y - 33) < 1.6 ? hex('#9a9690') : hex('#d8d4c4')); }
};
const nave = (x, y, t, lente) => { x = Math.round(x); y = Math.round(y);
  for (let j = -6; j <= 6; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + ((j + 1) / 6) ** 2 <= 1 && j < 0) R.pset(x + i, y + j - 3, (i / 9) ** 2 + ((j + 1) / 6) ** 2 > 0.8 ? K0 : i < -2 && j < -3 ? hex('#e8faff') : hex('#7ac8e0'));
  for (let j = -6; j <= 6; j++) for (let i = -22; i <= 22; i++) { const d = (i / 22) ** 2 + (j / 6) ** 2; if (d > 1) continue; R.pset(x + i, y + j, d > 0.82 ? K0 : j < -1 ? (i < -8 ? hex('#f2f4f8') : hex('#c8ccd8')) : j < 2 ? hex('#9aa0b4') : hex('#5e6478')); }
  for (let k = 0; k < 7; k++) { const i = -18 + k * 6, on = (Math.floor(t * 5) + k) % 3 === 0; R.pset(x + i, y + 1, on ? [hex('#ff5a4a'), hex('#ffd84a'), hex('#6af0e0')][k % 3] : hex('#3a3e4e')); }
  R.rect(x - 3, y + 5, x + 3, y + 8, K0); R.rect(x - 2, y + 5, x + 2, y + 7, hex('#4a4e5e')); R.disco(x + 1, y + 7, 1.6, lente ? hex('#ffffff') : hex('#6ab8f0'));
};
const p2 = (t) => {
  capa('d2', fondoEspacio);
  const FOTO = @7.28@, ALTO = @8.68@, ESP = @9.56@;
  const g = globo(206, 108, 56, -52 + (t - P2) * 2.2, -24, { atm: true, nubes: t, t, oro: tramo(t, ESP - 0.3, ESP + 0.2) });
  void g;
  // la nave llega y apunta a la Tierra
  const llega = tramo(t, P2, P2 + 1.2), nx = lerp(-30, 92, llega) + Math.sin(t * 1.3) * 2, ny = 54 + Math.sin(t * 2.1) * 2;
  const disparo = t > FOTO && t < FOTO + 0.25;
  nave(nx, ny, t, disparo);
  if (llega > 0.3 && llega < 1) for (let k = 1; k < 5; k++) R.pset(Math.round(nx - 24 - k * 5), Math.round(ny + (k % 2)), hex('#6a7aa8'));
  // el haz del objetivo hacia la Tierra, mientras toma la foto
  const haz = tramo(t, FOTO - 0.5, FOTO) * (1 - tramo(t, FOTO + 0.4, FOTO + 0.8));
  if (haz > 0) for (let k = 0; k < 40; k++) { const u = k / 40, x = Math.round(nx + 1 + (170 - nx) * u), y = Math.round(ny + 8 + (82 - ny - 8) * u); for (let w = -Math.round(u * 7); w <= Math.round(u * 7); w++) if (hh(k, w, Math.floor(t * 20)) > 0.45) R.pset(x, y + w, mez(R.pget(x, y + w), hex('#c8f0ff'), 0.45 * haz)); }
  if (disparo) { R.disco(Math.round(nx + 1), Math.round(ny + 7), 7, hex('#ffffff')); luz(Math.round(nx), Math.round(ny + 7), 46, hex('#ffffff'), 0.5); }
  // la foto sale de la nave, crece y se queda: es el mapa
  const sal = tramo(t, FOTO + 0.25, ALTO), w = lerp(8, 66, sal), h = lerp(6, 50, sal), fx = lerp(nx - 4, 18, sal), fy = lerp(ny + 8, 104, sal) + Math.sin(t * 1.6) * 1.5;
  if (t > FOTO + 0.25) { const X0 = Math.round(fx), Y0 = Math.round(fy), X1 = Math.round(fx + w), Y1 = Math.round(fy + h);
    R.rect(X0 + 2, Y0 + 2, X1 + 2, Y1 + 2, hex('#04050e')); R.rect(X0 - 1, Y0 - 1, X1 + 1, Y1 + 1, K0); R.rect(X0, Y0, X1, Y1, hex('#f6f4ee'));
    const bo = Math.max(1, Math.round(w * 0.05)); clip([X0 + bo, Y0 + bo, X1 - bo, Y1 - bo * 3]); mapita(X0 + bo, Y0 + bo, X1 - X0 - 2 * bo, Y1 - Y0 - 4 * bo, t, { oro: tramo(t, ESP - 0.3, ESP + 0.2) * (0.6 + 0.4 * Math.sin(t * 6)) }); clip(null);
    R.rect(X0 + bo, Y1 - bo * 3 + 1, X1 - bo, Y1 - bo, hex('#e8e4da')); }
  // la Tierra también se ilumina en la costa de Sudamérica: «se parece»
};
// ── 3 · el salón de 1973 con la tele del documental ──
const fondoSalon = () => {
  llena(0, 0, 319, 56, rp('#c8b088', '#d8c49c', '#e4d2ac'), (x, y) => 1.4 + (hh(x >> 1, y >> 1) - 0.5) * 0.4 + (x % 24 < 2 ? -0.5 : 0));
  R.rect(0, 56, 319, 58, hex('#5a3418')); R.rect(0, 56, 319, 56, hex('#a8743c'));
  tablas(0, 59, 319, 132, rp('#3a2214', '#5a3418', '#7a4a24', '#94603a', '#ae7a4c'), 8, 2, true);
  R.rect(0, 133, 319, 135, hex('#3a2214'));
  // la ventana con cortinas naranjas: noche, la luna y casas con luces
  R.rect(12, 14, 84, 96, K0); cieloCaja(14, 16, 82, 94, 0, { noche: true, luna: [66, 30] });
  for (const [x0, w, h, k] of [[14, 22, 22, 1], [36, 26, 16, 2], [62, 20, 26, 3]]) { R.rect(x0, 94 - h, x0 + w, 94, hex('#141a30')); R.poligono([[x0 - 2, 94 - h], [x0 + w / 2, 94 - h - 9], [x0 + w + 2, 94 - h]], hex('#1a2038')); for (let i = 0; i < 3; i++) if (hh(i, k) > 0.3) R.rect(x0 + 3 + i * 7, 94 - h + 5, x0 + 6 + i * 7, 94 - h + 8, hex('#f8d070')); }
  R.rect(46, 16, 48, 94, hex('#e8e4da')); R.rect(14, 54, 82, 56, hex('#e8e4da'));
  for (const [x0, x1] of [[4, 22], [74, 92]]) llena(x0, 10, x1, 104, rp('#8a3a14', '#b8581e', '#d8782a', '#ec9a4a'), (x, y) => 1.8 + Math.sin(x * 1.1) * 0.9);
  R.rect(2, 8, 94, 10, hex('#5a3418'));
  // el cuadro del velero y el aplique
  marco(104, 22, 138, 48); llena(107, 25, 135, 45, rp('#4a7ab8', '#7aa8d8', '#a8c8e8'), (x, y) => 2.4 - (y - 25) * 0.08); R.rect(107, 38, 135, 45, hex('#2a5a8a')); R.poligono([[118, 28], [118, 38], [126, 38]], hex('#f6f2ea')); R.rect(114, 38, 128, 40, hex('#7a3a24'));
  // las fotos de familia y la balda con cosas de los setenta
  for (const [x0, y0, w, h, c] of [[164, 22, 18, 22, '#d8a050'], [188, 26, 14, 16, '#7aa8d8'], [208, 20, 20, 26, '#a8c070'], [234, 28, 14, 14, '#e8807a']]) { marco(x0, y0, x0 + w, y0 + h); llena(x0 + 3, y0 + 3, x0 + w - 3, y0 + h - 3, rp(c, '#f6f2ea'), (x, y) => (y - y0) / h * 1.4); R.disco(x0 + w / 2, y0 + h * 0.45, 2, hex('#6a4a3a')); R.rect(x0 + w / 2 - 2, y0 + h * 0.45 + 2, x0 + w / 2 + 2, y0 + h - 4, hex('#3a5a8a')); }
  R.rect(160, 72, 260, 74, K0); R.rect(161, 72, 259, 73, hex('#a8743c'));
  R.rect(166, 62, 172, 72, K0); R.rect(167, 63, 171, 71, hex('#3a8a6a')); R.disco(184, 68, 4, K0); R.disco(184, 68, 3, hex('#e8b830')); R.rect(196, 60, 200, 72, K0); R.rect(197, 61, 199, 71, hex('#c83a3a')); R.disco(198, 59, 2, hex('#ffd84a'));
  for (let i = 0; i < 5; i++) { R.rect(214 + i * 4, 64 - (i % 2) * 3, 216 + i * 4, 72, K0); R.rect(215 + i * 4, 65 - (i % 2) * 3, 215 + i * 4, 71, LIBROS[i]); } R.rect(240, 66, 254, 72, K0); R.rect(241, 67, 253, 71, hex('#e8803a')); R.rect(244, 64, 250, 66, hex('#5a8a3a'));
  // la alfombra de pelo largo
  llena(0, 136, 319, 179, rp('#6a3a14', '#8a5418', '#a8701e', '#c88a2a', '#e0a83a'), (x, y) => 2 + (hh(x, y, 6) - 0.5) * 2.2 + (y - 136) * 0.02);
  for (let i = 0; i < 260; i++) { const x = Math.floor(hh(i, 1, 8) * 320), y = 138 + Math.floor(hh(i, 2, 8) * 40); R.pset(x, y, hex('#f0c060')); R.pset(x, y + 1, hex('#5a3010')); }
  // la consola de la tele, de madera, con su antena de cuernos y una planta
  R.rect(190, 96, 292, 158, K0); tablas(191, 97, 291, 157, rp('#3a2214', '#5e3a1e', '#83552c', '#a06a38', '#b8844e'), 6, 7);
  R.rect(198, 102, 252, 146, K0); R.rect(199, 103, 251, 145, hex('#2a2a30')); R.rect(256, 104, 286, 140, K0); llena(257, 105, 285, 139, rp('#3a2a1e', '#5a4430', '#7a5e44'), (x, y) => (x + y) % 3 === 0 ? 0.4 : 1.6);
  for (const [kx, ky] of [[264, 146], [278, 146]]) { R.disco(kx, ky, 3, K0); R.disco(kx, ky, 2, hex('#c8c8d0')); R.pset(kx, ky - 1, K0); }
  R.rect(194, 158, 200, 166, K0); R.rect(282, 158, 288, 166, K0);
  R.rect(232, 92, 246, 96, K0); R.rect(233, 93, 245, 95, hex('#3a3a46')); R.linea(236, 92, 218, 62, K0); R.linea(242, 92, 262, 60, K0); R.pset(218, 62, hex('#c8c8d0')); R.pset(262, 60, hex('#c8c8d0'));
  planta(204, 96, 0, 0.8);
  R.rect(270, 82, 284, 96, K0); R.rect(271, 83, 283, 95, hex('#e8b830')); R.rect(273, 85, 281, 93, hex('#7aa8d8')); R.rect(273, 90, 281, 93, hex('#5a8a3a'));
};
const tele = (t, x0, y0, x1, y1) => {   // lo de dentro de la pantalla: se enciende, el mapa, luces en el cielo, el mapa con las luces
  clip([x0, y0, x1, y1]);
  const on = tramo(t, P3 + 0.05, P3 + 0.45), LUC = @11.44@, PL = @12.36@, DOC = @13.36@;
  if (on < 1) { rr(x0, y0, x1, y1, hex('#14161c')); const r = on * 30; if (on > 0) { rr(Math.round((x0 + x1) / 2 - r), Math.round((y0 + y1) / 2), Math.round((x0 + x1) / 2 + r), Math.round((y0 + y1) / 2), hex('#ffffff')); } clip(null); return; }
  if (t < LUC - 0.1 || t > DOC) { const z = 1 + (t - P3) * 0.04; mapita(x0 - (z - 1) * 30, y0 - (z - 1) * 20, (x1 - x0) * z, (y1 - y0) * z, t, { sinBorde: true }); }
  else { cieloCaja(x0, y0, x1, y1, t, { noche: true }); R.poligono([[x0, y1], [x0 + 10, y1 - 14], [x0 + 22, y1 - 8], [x0 + 34, y1 - 18], [x1, y1 - 6], [x1, y1]], hex('#0a0a14')); }
  if (t > LUC - 0.1) for (let k = 0; k < 3; k++) { const a = t * 1.4 + k * 2.1, lx = Math.round((x0 + x1) / 2 + Math.cos(a) * 14 + (k - 1) * 6), ly = Math.round(y0 + 12 + Math.sin(a * 1.3) * 5 + k * 3); R.disco(lx, ly, 3, (x, y) => mez(R.pget(x, y), hex('#ffffff'), 0.4)); R.disco(lx, ly, 1.5, hex('#ffffa0')); }
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), hex('#000000'), 0.22));
  for (let x = x0; x <= x1; x++) R.pset(x, Math.round(y0 + ((t * 30) % (y1 - y0))), mez(R.pget(x, Math.round(y0 + ((t * 30) % (y1 - y0)))), hex('#ffffff'), 0.15));
  clip(null);
};
const p3 = (t) => {
  capa('d3', fondoSalon);
  const PL = @12.36@;
  tele(t, 201, 105, 249, 143);
  // la lámpara de arco
  R.linea(156, 166, 156, 66, K0); R.linea(157, 166, 157, 66, hex('#c8c8d0')); for (let a = 0; a <= 1; a += 0.02) { const x = Math.round(156 - 30 * a), y = Math.round(66 - Math.sin(a * Math.PI) * 14); R.pset(x, y, hex('#c8c8d0')); R.pset(x, y - 1, K0); }
  R.poligono([[118, 64], [134, 64], [130, 56], [122, 56]], hex('#e8b830')); R.rect(118, 64, 134, 64, K0); luz(126, 76, 40, hex('#ffd890'), 0.2); R.rect(150, 166, 162, 168, K0);
  // el resplandor azul de la tele sobre la familia
  const fl = 0.16 + 0.06 * Math.sin(t * 13) * (t > P3 + 0.4 ? 1 : 0); if (t > P3 + 0.3) luz(225, 124, 120, hex('#8ab0ff'), fl);
  // el sofá de pana, la familia y la mesita con el bol de palomitas
  R.rect(14, 108, 146, 140, K0); llena(15, 109, 145, 139, rp('#5a2a10', '#8a4418', '#a85a22', '#c8763a'), (x, y) => 2 + Math.sin(x * 0.9) * 0.5 - (y - 109) * 0.02);
  for (const x of [56, 100]) R.rect(x, 110, x, 136, hex('#5a2a10'));
  const salta = tramo(t, PL, PL + 0.25) - tramo(t, PL + 0.35, PL + 0.6);
  R.actor(EL.padre77, 34, 144, t, { dir: 1, dedo: t > @11.6@ && t < @12.9@, habla: t > @11.6@ && t < @12.6@ && Math.sin(t * 8) > 0 });
  R.actor(EL.madre77, 66, 144, t, { dir: 1, sonrisa: t > PL + 0.5, sorpresa: t > PL && t < PL + 0.5 });
  R.actor(EL.nino77, 104, 144, t, { dir: 1, salto: Math.round(salta * 10), sorpresa: t > PL - 0.05 && t < PL + 1.4, brazos: t > PL && t < PL + 0.7 });
  if (t > PL && t < PL + 1.4) R.icono('!', 114, 102 - Math.round(salta * 10), hex('#ffd84a'), K0, 2);
  R.rect(10, 136, 150, 152, K0); llena(11, 137, 149, 151, rp('#5a2a10', '#8a4418', '#a85a22', '#c8763a'), (x, y) => 2.2 + Math.sin(x * 0.9) * 0.5 - (y - 137) * 0.06);
  for (const x of [10, 146]) { R.rect(x - 2, 112, x + 6, 152, K0); llena(x - 1, 113, x + 5, 151, rp('#5a2a10', '#8a4418', '#a85a22'), (xx, y) => 1.6 + (y < 116 ? 0.8 : 0)); }
  R.rect(104, 156, 186, 160, K0); R.rect(105, 157, 185, 159, hex('#a8743c')); R.rect(105, 157, 185, 157, hex('#c8945a')); R.rect(108, 160, 110, 172, K0); R.rect(180, 160, 182, 172, K0);
  R.rect(126, 150, 142, 156, K0); R.rect(127, 151, 141, 155, hex('#e83a3a')); R.rect(127, 151, 141, 151, hex('#ffffff')); for (let i = 0; i < 6; i++) R.pset(128 + i * 2, 150 - (i % 2), hex('#fff4c8'));
  R.rect(150, 150, 154, 156, K0); R.rect(151, 151, 153, 155, hex('#c8c8d0')); R.rect(158, 150, 162, 156, K0); R.rect(159, 151, 161, 155, hex('#3a8a4a'));
  if (t > PL) for (let i = 0; i < 7; i++) { const u = (t - PL) * 1.6, x = Math.round(134 + (i - 3) * 6 * u * 2), y = Math.round(148 - 40 * u + 60 * u * u + hh(i, 1) * 4); if (y < 170 && u < 1.2) { R.disco(x, y, 1.5, hex('#fff4c8')); R.pset(x, y, hex('#ffffff')); } }
  T.gato(R, 214, 176, t, { dir: -1 });
};
// ── 4 · hoy: el cuarto del chico y los vídeos con flechas y círculos rojos ──
const fondoCuarto = () => {
  llena(0, 0, 319, 140, rp('#141832', '#1c2240', '#252c50', '#2e3660'), (x, y) => 1.6 + vn(x * 0.05, y * 0.05, 3) * 0.6 + (x % 32 === 0 ? -0.6 : 0));
  R.rect(0, 140, 319, 142, hex('#0e1024'));
  llena(0, 143, 319, 179, rp('#1a1420', '#2a2030', '#3a2c40', '#4a3a50'), (x, y) => 1.6 + Math.sin(x * 0.3) * 0.2 + (y % 6 === 0 ? -0.8 : 0));
  // la ventana con la ciudad de noche
  R.rect(4, 22, 52, 104, K0); cieloCaja(6, 24, 50, 102, 0, { noche: true, luna: [40, 34] });
  for (let i = 0; i < 6; i++) { const x0 = 6 + i * 8, h = 18 + Math.floor(hh(i, 3) * 30); R.rect(x0, 102 - h, x0 + 7, 102, hex('#0c1020')); for (let j = 0; j < h - 4; j += 5) for (let k = 0; k < 2; k++) if (hh(i * 9 + j, k) > 0.55) R.rect(x0 + 1 + k * 3, 102 - h + 3 + j, x0 + 2 + k * 3, 102 - h + 4 + j, hex('#f8d070')); }
  R.rect(27, 24, 28, 102, hex('#3a3e58')); R.rect(6, 62, 50, 63, hex('#3a3e58'));
  // los pósteres: un planeta con anillos y una nave (sin letras)
  R.rect(60, 30, 90, 70, K0); llena(61, 31, 89, 69, rp('#0a0c24', '#141a44', '#1e2a5e'), (x, y) => 1 + (hh(x, y) > 0.95 ? 2 : 0)); R.disco(75, 50, 8, hex('#e0a050')); R.disco(73, 48, 4, hex('#f0c070')); for (let x = 61; x <= 89; x++) { const y = Math.round(50 + (x - 75) * 0.25); if (Math.abs(x - 75) > 6 || y > 52) R.pset(x, y, hex('#f6e0b0')); }
  R.rect(94, 34, 118, 66, K0); llena(95, 35, 117, 65, rp('#1a3a2a', '#2a5a3a', '#3a7a4a'), (x, y) => 0.6 + (y - 35) * 0.05); R.disco(106, 46, 6, hex('#c8ccd8')); R.rect(100, 46, 112, 47, hex('#8a90a0')); R.poligono([[103, 49], [109, 49], [114, 64], [98, 64]], (x, y) => mez(R.pget(x, y), hex('#e0ffa0'), 0.4));
  // el escritorio con el monitor grande, el teclado y la lámpara
  R.rect(56, 120, 266, 125, K0); llena(57, 121, 265, 124, rp('#3a3a46', '#5a5a6a', '#7a7a8a'), (x, y) => 2 - (y - 121) * 0.4);
  R.rect(60, 126, 64, 166, K0); R.rect(258, 126, 262, 166, K0); R.rect(206, 126, 256, 160, K0); llena(207, 127, 255, 159, rp('#2a2a36', '#3a3a46', '#4a4a58'), (x, y) => 1.2 + (y === 142 ? -1 : 0)); R.rect(228, 134, 234, 135, hex('#8a8a9a')); R.rect(228, 150, 234, 151, hex('#8a8a9a'));
  R.rect(150, 112, 160, 120, K0); R.rect(153, 108, 157, 114, K0); R.rect(154, 109, 156, 113, hex('#4a4a58'));
  R.rect(112, 115, 196, 119, K0); for (let x = 114; x < 195; x += 3) R.rect(x, 116, x + 1, 117, hex('#5a5a6a'));
  R.rect(242, 92, 244, 120, K0); R.linea(244, 92, 232, 84, K0); R.rect(226, 80, 236, 86, K0); R.rect(227, 81, 235, 85, hex('#3a3a46'));
  // la balda con figuras, una maceta y el reloj
  R.rect(222, 64, 270, 66, K0); R.rect(223, 64, 269, 65, hex('#5a5a6a'));
  R.disco(230, 58, 4, K0); R.disco(230, 58, 3, hex('#7ae08a')); R.pset(229, 57, K0); R.pset(231, 57, K0); R.rect(228, 61, 232, 64, hex('#3aa86a'));
  R.rect(240, 52, 248, 63, K0); R.rect(241, 53, 247, 62, hex('#c8c8d0')); R.rect(243, 50, 245, 52, hex('#c83a3a'));
  for (let i = 0; i < 4; i++) { R.rect(254 + i * 3, 54 + (i % 2) * 2, 256 + i * 3, 63, K0); R.rect(255 + i * 3, 55 + (i % 2) * 2, 255 + i * 3, 62, LIBROS[i + 3]); }
  R.disco(244, 86, 8, K0); R.disco(244, 86, 7, hex('#e8e4da')); R.linea(244, 86, 244, 81, K0); R.linea(244, 86, 248, 88, K0);
  // la alfombra redonda, la mochila y las zapatillas
  for (let y = 160; y <= 178; y++) for (let x = 120; x <= 220; x++) { const q = ((x - 170) / 50) ** 2 + ((y - 169) / 9) ** 2; if (q <= 1) R.pset(x, y, q > 0.8 ? hex('#6a3a8a') : q > 0.5 ? hex('#3a8a8a') : hex('#8a3a6a')); }
  R.rect(70, 150, 86, 168, K0); R.rect(71, 151, 85, 167, hex('#c84a3a')); R.rect(73, 156, 83, 162, hex('#a83a2a')); R.rect(76, 146, 80, 151, K0);
  for (const x of [232, 244]) { R.rect(x, 170, x + 9, 174, K0); R.rect(x + 1, 171, x + 8, 173, hex('#f6f2ea')); R.rect(x + 1, 173, x + 8, 173, hex('#e83a3a')); }
  // la cama a la derecha con el edredón
  R.rect(270, 118, 319, 160, K0); llena(271, 119, 319, 159, rp('#3a2a5a', '#4a3a72', '#5e4a8a', '#7a64a8'), (x, y) => 2 + Math.sin(x * 0.3 + y * 0.2) * 0.6 - (y - 119) * 0.02);
  R.rect(272, 108, 300, 120, K0); R.rect(273, 109, 299, 119, hex('#d8d4e8')); R.rect(273, 116, 299, 119, hex('#a8a4c0'));
};
const pantallaVideos = (t, x0, y0, x1, y1) => {
  const CLIC = @17.02@, MIL = @15.92@;
  clip([x0, y0, x1, y1]); rr(x0, y0, x1, y1, hex('#14141c'));
  if (t < CLIC + 0.15) {
    const sube = (t - P4) * 6; rr(x0, y0, x1, y0 + 4, hex('#2a2a36')); rr(x0 + 2, y0 + 1, x0 + 12, y0 + 3, hex('#e83a3a'));
    for (let i = 0; i < 12; i++) { const c = i % 3, f = Math.floor(i / 3), tx = x0 + 3 + c * 31, ty = Math.round(y0 + 7 + f * 26 - (sube % 26) - (Math.floor(sube / 26) % 1)); if (ty > y1 || ty + 22 < y0) continue;
      mapita(tx, ty, 28, 16, t, { sinBorde: true }); const k = i + Math.floor(sube / 26) * 3; const ox = tx + 8 + (k % 3) * 4, oy = ty + 11;
      for (let a = 0; a < 360; a += 12) R.pset(Math.round(ox + 6 * Math.cos(a * D2R)), Math.round(oy + 4 * Math.sin(a * D2R)), hex('#ff2a2a'));
      R.linea(tx + 25, ty + 2, ox + 5, oy - 3, hex('#ff2a2a')); R.linea(tx + 26, ty + 2, ox + 6, oy - 3, hex('#ff2a2a')); R.pset(ox + 5, oy - 4, hex('#ff2a2a')); R.pset(ox + 7, oy - 3, hex('#ff2a2a'));
      rr(tx, ty + 17, tx + 20, ty + 18, hex('#5a5a6a')); rr(tx, ty + 20, tx + 12, ty + 20, hex('#3a3a46')); }
    if (t > CLIC - 1.0) { const cx = Math.round(lerp(x1 - 6, x0 + 40, tramo(t, CLIC - 1.0, CLIC - 0.2))), cy = Math.round(lerp(y1 - 4, y0 + 20, tramo(t, CLIC - 1.0, CLIC - 0.2))); for (let j = 0; j < 6; j++) { R.linea(cx, cy + j, cx + Math.floor(j / 2), cy + j, j === 5 ? K0 : hex('#ffffff')); R.pset(cx - 1, cy + j, K0); } }
  } else {
    const ab = tramo(t, CLIC + 0.15, CLIC + 0.5); mapita(x0 + 2, y0 + 2, (x1 - x0 - 4), (y1 - y0 - 12), t, { sinBorde: true });
    const dib = tramo(t, CLIC + 0.5, CLIC + 1.6), ox = x0 + 30, oy = y0 + 38;
    for (let a = 0; a < 360 * dib; a += 3) for (const dr of [0, 1]) R.pset(Math.round(ox + (18 + dr) * Math.cos(a * D2R)), Math.round(oy + (11 + dr) * Math.sin(a * D2R)), hex('#ff2a2a'));
    const ba = Math.round(Math.sin(t * 8) * 2); for (let k = 0; k < 3; k++) R.linea(x1 - 14 + k, y0 + 6 + ba, ox + 18 + k, oy - 8 + ba, hex('#ff2a2a'));
    R.poligono([[ox + 16, oy - 12 + ba], [ox + 24, oy - 8 + ba], [ox + 16, oy - 4 + ba]], hex('#ff2a2a'));
    rr(x0, y1 - 8, x1, y1, hex('#22222c')); rr(x0 + 2, y1 - 5, x0 + 2 + Math.round((x1 - x0 - 50) * tramo(t, CLIC + 0.3, E.duracion)), y1 - 4, hex('#e83a3a'));
    if (ab < 1) velo(x0, y0, x1, y1, hex('#ffffff'), 0.6 * (1 - ab));
  }
  clip(null);
  if (t > MIL) { const n = Math.round(1000 * Math.pow(1000, tramo(t, MIL, E.duracion - 0.5))), s = String(n); R.rect(x1 - 6 - s.length * 8 - 12, y0 - 13, x1, y0 - 3, K0); R.numero(s, x1 - 2 - s.length * 8, y0 - 4, { color: hex('#ff6a5a') }); R.icono('reloj', x1 - 14 - s.length * 8, y0 - 12, hex('#ff6a5a'), K0); }
};
const p4 = (t) => {
  capa('d4', fondoCuarto);
  // las lucecitas de la guirnalda
  for (let i = 0; i < 26; i++) { const x = 60 + i * 8, y = Math.round(20 + Math.sin(i * 0.5) * 2); R.pset(x, y - 1, hex('#3a3e58')); const on = Math.sin(t * 3 + i * 1.7) > -0.2; const c = [hex('#ffd84a'), hex('#ff6a8a'), hex('#6af0e0'), hex('#a8ff6a')][i % 4]; R.pset(x, y, on ? c : mez(c, K0, 0.6)); if (on) R.pset(x, y + 1, mez(c, K0, 0.5)); }
  // el monitor grande con los vídeos
  R.rect(100, 50, 210, 112, K0); R.rect(101, 51, 209, 111, hex('#2a2a36')); pantallaVideos(t, 104, 54, 206, 108);
  luz(155, 82, 90, hex('#6a8aff'), 0.16 + 0.04 * Math.sin(t * 7));
  // el chico, de pie junto a la mesa, mira los vídeos, hace clic y se asombra
  const CLIC = @17.02@;
  const ch = R.actor(EL.chicoHoy, 214, 140, t, { dir: -1, sostiene: t < CLIC + 0.2 ? [204, 116] : false, sorpresa: t > CLIC + 0.5 && t < CLIC + 1.6, dedo: t > CLIC + 1.6, habla: t > CLIC + 2.2 && Math.sin(t * 8) > 0 });
  if (t < CLIC + 0.2 && ch.mano) { const [mx, my] = ch.mano; R.rect(mx - 3, my - 1, mx + 1, my + 2, K0); R.rect(mx - 2, my, mx, my + 1, hex('#8a8a9a')); if (t > CLIC - 0.1 && t < CLIC + 0.15) R.pset(mx - 1, my - 1, hex('#ffffff')); }
  // la hermana pequeña en la cama, con el mismo vídeo en el móvil
  const he = R.actor(EL.chicaHoy, 290, 132, t, { dir: -1, sostiene: true, sonrisa: Math.sin(t * 0.8) > 0.3 });
  if (he.mano) { const [mx, my] = he.mano; R.rect(mx - 5, my - 7, mx, my, K0); R.rect(mx - 4, my - 6, mx - 1, my - 1, hex('#3a4a8a')); R.pset(mx - 3, my - 4, hex('#ff2a2a')); R.pset(mx - 2, my - 3, hex('#d8bc84')); luz(mx - 2, my - 4, 8, hex('#8ab0ff'), 0.3); }
  R.rect(270, 140, 319, 160, K0); llena(270, 141, 319, 159, rp('#3a2a5a', '#4a3a72', '#5e4a8a', '#7a64a8'), (x, y) => 2.2 + Math.sin(x * 0.3) * 0.5 - (y - 141) * 0.05);
  // el móvil que vibra en la mesa con avisos
  const vib = Math.floor(t * 2) % 3 === 0; const mx = 80 + (vib ? Math.round(Math.sin(t * 60)) : 0); R.rect(mx, 115, mx + 10, 119, K0); R.rect(mx + 1, 116, mx + 9, 118, vib ? hex('#6ab8f0') : hex('#2a2a36'));
  if (vib) { R.pset(mx - 2, 114, hex('#6ab8f0')); R.pset(mx + 12, 114, hex('#6ab8f0')); }
  R.rect(184, 108, 190, 115, K0); R.rect(185, 109, 189, 114, hex('#3aa86a')); R.disco(187, 106, 3, K0); R.disco(187, 106, 2, hex('#7ae08a')); R.pset(186, 105, K0); R.pset(188, 105, K0);
  R.rect(166, 104, 172, 115, K0); R.rect(167, 105, 171, 114, hex('#3a6ac8')); R.rect(167, 105, 171, 106, hex('#c8c8d0'));
};
const efectos = [[0.4, 'firma'], [@4.64@, 'flash'], [@7.28@, 'flash'], [@8.0@, 'papel'], [P3 + 0.08, 'interruptor'], [@12.36@, 'pop'], [@15.0@, 'tecleo'], [@17.02@, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P3 ? 1968 : t < P4 ? 1973 : 2026) });
'''))


# ──────────────────────────────────────────── PR-HIELO ────────────────────────────────────────────
E['pr-hielo'] = ('El hielo guarda su historia', '''// PR-HIELO (frase 19), cartela «1820». Seis planos:
// 1. «But let's look at it calmly. Hapgood believed…»: su despacho de 1958 en invierno (nieva tras la ventana, el radiador
//    echa vaho, la pipa humea); Hapgood llega al globo de pie, lo hace girar en «believed» y señala el sur;
// 2. corte en «the Earth's crust had shifted»: el globo de cerca en su mesa; la mano lo empuja y la piel resbala hacia el
//    norte como la de una naranja (abajo asoma el manto naranja); en «free of ice», la Antártida que ha subido pierde el hielo;
// 3. corte en «But Antarctica's ice keeps its own record»: el laboratorio frío de hoy; el testigo de hielo en la mesa de
//    luz; una luz lo recorre «layer by layer» y van saliendo las cuentas; entra un compañero con otro testigo y vaho;
// 4. corte en «and it says that coast…»: a cámara rápida, la costa verde se cubre de nieve y de hielo y queda enterrada;
//    el contador de años llega a 34.000.000 en «millions of years»;
// 5. corte en «Nobody saw it until 1820»: la Antártida con el bergantín de 1820; en un bote, el capitán mira con el
//    catalejo y, en «1820», señala la costa blanca (campana);
// 6. corte en «wasn't known until the 20th century with radar and soundings»: el corte del hielo; el avión del radar
//    cruza y dibuja el perfil de la roca; la investigadora lo señala en el monitor y, en «soundings», el técnico golpea
//    la placa y las ondas bajan por el hielo.''', cuerpo('pr-hielo', r'''
const P2 = @5.76@, P3 = @10.17@, P4 = @13.99@, P5 = @17.61@, P6 = @21.35@;
// ── 1 · el despacho de Hapgood en el invierno de 1958 ──
const fondoHapgood = () => {
  llena(0, 0, 319, 96, rp('#6a7a5a', '#7e8e6a', '#92a27c', '#a6b48e'), (x, y) => 1.7 + vn(x * 0.07, y * 0.07, 2) * 0.5 + (y < 6 ? 0.6 : 0));
  R.rect(0, 6, 319, 7, hex('#5a3418')); R.rect(0, 6, 319, 6, hex('#a8743c'));
  R.rect(0, 96, 319, 98, hex('#3a2214')); R.rect(0, 96, 319, 96, hex('#a8743c'));
  for (let x0 = 0; x0 < 320; x0 += 40) { R.rect(x0, 99, x0 + 39, 150, hex('#3a2214')); llena(x0 + 1, 100, x0 + 38, 149, MAD, (x, y) => 1.6 + Math.sin(y * 0.4 + x * 0.05) * 0.25); R.rect(x0 + 5, 104, x0 + 34, 145, hex('#4a2a18')); llena(x0 + 6, 105, x0 + 33, 144, MAD, (x, y) => 2.0 + Math.sin(y * 0.3) * 0.2); R.rect(x0 + 6, 105, x0 + 33, 105, MAD[4]); }
  estanteria(0, 14, 56, 150, 2, { paso: 22 });
  // la ventana de invierno: abedules, la capilla blanca y la nieve
  R.rect(66, 18, 134, 94, K0); R.rect(67, 19, 133, 93, hex('#f2eee2'));
  cieloCaja(70, 22, 130, 90, 0, { invierno: true, aves: false });
  R.poligono([[70, 74], [90, 66], [112, 70], [130, 64], [130, 90], [70, 90]], hex('#eef2f8')); R.poligono([[70, 82], [130, 78], [130, 90], [70, 90]], hex('#dce4ee'));
  R.rect(100, 50, 112, 74, hex('#f6f6f6')); R.poligono([[98, 50], [106, 40], [114, 50]], hex('#c8ccd8')); R.rect(105, 30, 107, 42, hex('#f6f6f6')); R.poligono([[104, 30], [106, 22], [108, 30]], hex('#8a90a0')); R.rect(104, 58, 108, 66, hex('#4a3a2a')); R.rect(102, 52, 110, 53, hex('#ffffff'));
  for (const bx of [78, 88, 122]) { R.rect(bx, 46, bx + 1, 84, hex('#f2f2f2')); for (let y = 48; y < 84; y += 5) R.pset(bx, y, K0); for (let k = 0; k < 4; k++) R.linea(bx, 50 + k * 6, bx + (k % 2 ? 5 : -5), 46 + k * 6, hex('#6a5a4a')); }
  R.rect(99, 19, 101, 93, hex('#f2eee2')); R.rect(67, 55, 133, 57, hex('#f2eee2')); R.rect(64, 94, 136, 97, hex('#e4ddd0'));
  // el radiador bajo la ventana
  R.rect(70, 102, 130, 120, K0); for (let x = 71; x < 130; x += 4) { R.rect(x, 103, x + 2, 119, hex('#c8c4b8')); R.rect(x, 103, x, 119, hex('#e8e4da')); R.rect(x + 2, 103, x + 2, 119, hex('#8a8678')); }
  // el mapa de la Antártida en la pared, con chinchetas
  R.rect(146, 22, 204, 76, K0); polar(147, 23, 203, 75, 175, 50, 0.9, 28, {}); for (const [px, py] of [[148, 24], [202, 24], [148, 74], [202, 74]]) { R.pset(px, py, hex('#e83a3a')); }
  // el escritorio con la máquina de escribir y la lámpara de banquero
  R.rect(212, 118, 314, 124, K0); llena(213, 119, 313, 123, MAD, (x, y) => 3 - (y - 119) * 0.4 + Math.sin(x * 0.3) * 0.2); R.rect(216, 124, 222, 150, K0); R.rect(304, 124, 310, 150, K0); R.rect(240, 124, 300, 146, K0); llena(241, 125, 299, 145, MAD, (x, y) => 2 + (y === 135 ? -1 : 0)); R.rect(268, 128, 272, 129, hex('#e8b830')); R.rect(268, 139, 272, 140, hex('#e8b830'));
  R.rect(226, 104, 252, 118, K0); R.rect(227, 105, 251, 117, hex('#3a3e46')); for (let x = 229; x < 250; x += 3) R.pset(x, 114, hex('#c8c8d0')); R.rect(232, 96, 246, 106, hex('#f6f2ea')); R.rect(232, 96, 246, 96, K0); for (let y = 99; y < 105; y += 2) R.rect(234, y, 244, y, hex('#9a9aaa'));
  R.rect(286, 116, 296, 118, K0); R.rect(290, 100, 292, 116, hex('#c8962a')); R.poligono([[280, 98], [302, 98], [298, 92], [284, 92]], hex('#2a6a3a')); R.rect(280, 98, 302, 98, K0);
  R.rect(260, 112, 278, 117, K0); R.rect(261, 113, 277, 116, hex('#f6f2ea')); R.rect(262, 108, 276, 112, K0); R.rect(263, 109, 275, 111, hex('#ece6d6'));
  // el reloj de pared con péndulo y el suelo de parqué con alfombra
  R.rect(234, 30, 250, 76, K0); llena(235, 31, 249, 75, MAD, (x, y) => 2.4); R.disco(242, 40, 6, K0); R.disco(242, 40, 5, hex('#f6f2ea')); R.linea(242, 40, 242, 36, K0); R.linea(242, 40, 245, 41, K0); R.rect(237, 50, 247, 72, hex('#2a1a10'));
  for (let y = 151; y <= 179; y++) for (let x = 0; x <= 319; x++) { const bx = Math.floor((x + (Math.floor((y - 151) / 6) % 2) * 10) / 20), j = (y - 151) % 6 === 5 || (x + (Math.floor((y - 151) / 6) % 2) * 10) % 20 === 0; R.pset(x, y, j ? MAD[0] : R.tone(MAD, 2 + (hh(bx, Math.floor((y - 151) / 6)) - 0.5) * 1.2 + Math.sin(x * 0.4) * 0.15, x, y)); }
  for (let y = 158; y <= 178; y++) for (let x = 70; x <= 250; x++) { const e = Math.min(x - 70, 250 - x, y - 158, 178 - y); R.pset(x, y, e < 2 ? hex('#d8b060') : e < 4 ? hex('#2a3a6a') : ((x >> 2) + (y >> 2)) % 3 === 0 ? hex('#c8a050') : hex('#8a2a2a')); }
};
const vaho = (x, y, t, n = 4, c = hex('#e8eef4')) => { for (let k = 0; k < n; k++) { const u = ((t * 0.5 + k / n) % 1), px = Math.round(x + Math.sin(t * 2 + k * 2) * 3 * u + u * 4), py = Math.round(y - u * 18); if (u < 0.9) R.disco(px, py, 1 + u * 2, (xx, yy) => mez(R.pget(xx, yy), c, 0.5 * (1 - u))); } };
const p1 = (t) => {
  capa('h1', fondoHapgood);
  // la nieve que cae tras el cristal
  clip([70, 22, 130, 90]); for (let i = 0; i < 26; i++) { const x = 70 + ((hh(i, 1) * 60 + Math.sin(t + i) * 3 + t * 4) % 60), y = 22 + ((hh(i, 2) * 68 + t * 10 * (0.6 + hh(i, 3))) % 68); R.pset(Math.round(x), Math.round(y), hex('#ffffff')); } clip(null);
  vaho(100, 100, t, 5); vaho(84, 100, t + 0.7, 3);
  // el péndulo del reloj
  const pa = Math.sin(t * 3.1) * 0.35; R.linea(242, 52, Math.round(242 + Math.sin(pa) * 16), Math.round(52 + Math.cos(pa) * 16), hex('#c8962a')); R.disco(Math.round(242 + Math.sin(pa) * 16), Math.round(52 + Math.cos(pa) * 16), 2, hex('#e8b830'));
  // la pipa humea en el cenicero
  R.rect(298, 113, 306, 117, K0); R.rect(299, 114, 305, 116, hex('#8a8a9a')); R.rect(300, 110, 303, 113, hex('#5a3418')); R.linea(303, 112, 309, 110, hex('#3a2214')); vaho(301, 108, t, 3, hex('#c8c8d0'));
  // el globo de pie y Hapgood: llega, lo hace girar en «believed» y señala el sur
  const CREE = @3.12@, GIRA = CREE + 0.25, PARA = @4.92@;
  const giro = t < GIRA ? 0 : t < PARA ? (t - GIRA) * 140 - (t - GIRA) ** 2 * 20 : (PARA - GIRA) * 140 - (PARA - GIRA) ** 2 * 20;
  R.rect(162, 136, 186, 150, K0); R.linea(174, 136, 162, 150, hex('#83552c')); R.linea(174, 136, 186, 150, hex('#83552c')); R.rect(172, 128, 176, 138, K0); R.rect(173, 129, 175, 137, hex('#a8743c'));
  aroGlobo(174, 106, 20); globo(174, 106, 20, -70 + giro, -30, { t });
  const llega = tramo(t, 1.5, CREE - 0.1), hx = Math.round(lerp(40, 138, llega));
  const ha = R.actor(EL.hapgood, hx, 156, t, { dir: 1, anda: llega > 0 && llega < 1, sostiene: t > CREE - 0.1 && t < PARA - 0.2 ? [155, 112 + Math.round(Math.sin(t * 9) * 2)] : false, dedo: t > PARA, sonrisa: t > PARA, habla: t > 2.0 && t < 3.0 && Math.sin(t * 8) > 0 });
  void ha; if (t > PARA) { const pt = [174, 122]; R.anillo(pt[0], pt[1], 3 + Math.sin(t * 6), hex('#ffd84a')); }
  T.gato(R, 30, 172, t, { dir: 1 });
};
// ── 2 · el globo de cerca: la piel resbala y la Antártida pierde el hielo ──
const fondoMesaH = () => {
  llena(0, 0, 319, 139, rp('#1e2a22', '#26362c', '#2e4234', '#3a503e'), (x, y) => 1.6 + vn(x * 0.04, y * 0.04, 4) * 0.8 + ((x + y * 0.3) % 18 < 1 ? 0.4 : 0));
  marco(16, 18, 72, 66); llena(19, 21, 69, 63, rp('#d8ccb0', '#ece4d0', '#f6f0e2'), (x, y) => 1.4 + (hh(x, y) - 0.5) * 0.4); R.disco(44, 38, 7, hex('#a83224')); R.disco(44, 38, 5, hex('#c8962a')); for (let y = 50; y < 60; y += 3) R.rect(28, y, 60, y, hex('#9a9080'));
  R.rect(0, 139, 319, 141, K0); tablas(0, 142, 319, 179, rp('#3a2214', '#5e3a1e', '#83552c', '#a06a38', '#bc8650'), 7, 9);
  R.rect(0, 139, 319, 139, hex('#c8945a'));
  // la lámpara de banquero, los libros y los papeles con bocetos del globo
  R.rect(26, 136, 52, 140, K0); R.rect(37, 112, 40, 136, hex('#c8962a')); R.poligono([[18, 112], [60, 112], [54, 102], [24, 102]], hex('#2a7a3a')); R.rect(18, 112, 60, 113, K0); R.rect(26, 103, 52, 104, hex('#5ab86a'));
  for (let i = 0; i < 4; i++) { R.rect(70, 132 - i * 5, 112 - i * 3, 136 - i * 5, K0); R.rect(71, 133 - i * 5, 111 - i * 3, 135 - i * 5, LIBROS[i * 2]); R.rect(71, 133 - i * 5, 111 - i * 3, 133 - i * 5, mez(LIBROS[i * 2], hex('#f0e0b0'), 0.4)); }
  R.poligono([[92, 150], [140, 146], [146, 172], [96, 176]], hex('#f2ece0')); R.anillo(118, 161, 9, hex('#5a5a6a')); R.linea(109, 161, 127, 161, hex('#5a5a6a')); R.linea(118, 152, 118, 170, hex('#5a5a6a')); R.linea(112, 170, 124, 152, hex('#c83a3a'));
  R.rect(20, 152, 34, 160, K0); R.rect(21, 153, 33, 159, hex('#2a2a3a')); R.rect(25, 148, 29, 152, K0); R.rect(26, 149, 28, 151, hex('#3a3a5a'));
  R.linea(40, 166, 66, 158, K0); R.linea(40, 165, 66, 157, hex('#2a3a6a')); R.pset(66, 157, hex('#e8b830'));
  R.rect(280, 150, 316, 162, K0); R.rect(281, 151, 315, 161, hex('#ece6d6')); for (let y = 153; y < 160; y += 2) R.rect(284, y, 312, y, hex('#9a9aaa'));
};
const p2 = (t) => {
  capa('h2', fondoMesaH);
  luz(40, 126, 46, hex('#ffe8a0'), 0.18);
  const DES = tramo(t, @6.18@, @7.62@), DEH = tramo(t, @8.6@, @9.6@), cx = 212, cy = 82, r = 56;
  // el pie del globo y su sombra en la mesa
  for (let x = cx - 40; x <= cx + 40; x++) for (let y = 141; y <= 150; y++) if (((x - cx - 6) / 40) ** 2 + ((y - 145) / 5) ** 2 <= 1) R.pset(x, y, mez(R.pget(x, y), K0, 0.45));
  R.rect(cx - 18, 140, cx + 18, 146, K0); llena(cx - 17, 141, cx + 17, 145, MAD, (x, y) => 2.6 - (y - 141) * 0.4); R.rect(cx - 3, 134, cx + 3, 140, K0); R.rect(cx - 2, 134, cx + 2, 139, hex('#c8962a'));
  aroGlobo(cx, cy, r);
  globo(cx, cy, r, -60, -42, { desliza: 24 * DES, deshielo: DEH, t });
  if (DES > 0) luz(cx, cy + r - 8, 30, hex('#ff8a2a'), 0.25 * DES);
  // la mano de Hapgood empuja el globo hacia arriba y luego se retira
  const sal = tramo(t, @9.7@, @10.15@), wy = Math.round(lerp(128, 112, DES) + sal * 50), wx = Math.round(276 + sal * 20);
  if (sal < 1) T.brazo(R, wx + 46, wy + 30, wx, wy, '#7a6a4a', -1);
  // las gotas del deshielo
  if (DEH > 0 && DEH < 1) for (let i = 0; i < 8; i++) { const u = ((t * 1.3 + i / 8) % 1), x = Math.round(cx - 30 + i * 8), y = Math.round(cy + 30 + u * 20); R.pset(x, y, hex('#8ad0ff')); R.pset(x, y + 1, hex('#ffffff')); }
};
// ── 3 · el laboratorio frío con el testigo de hielo ──
const fondoLab = () => {
  llena(0, 0, 319, 140, rp('#8a9cb0', '#a2b4c6', '#b8c8d8', '#ccdae6'), (x, y) => 2 + vn(x * 0.05, y * 0.05, 3) * 0.4 + (x % 30 === 0 ? -1.2 : 0) + (x % 30 === 1 ? 0.6 : 0) + (y % 46 === 0 ? -1 : 0));
  for (let x = 6; x < 320; x += 30) for (let y = 8; y < 140; y += 23) R.pset(x, y, hex('#6a7c90'));
  R.rect(0, 140, 319, 142, hex('#4a5a6a'));
  llena(0, 143, 319, 179, rp('#4a5462', '#5e6a7a', '#748294', '#8a98aa'), (x, y) => 2 + (hh(x >> 3, y >> 2) - 0.5) * 0.5 + ((x + (y - 143) * 2) % 24 === 0 ? -1 : 0));
  // la puerta de la cámara congeladora con escarcha
  R.rect(8, 40, 58, 142, K0); llena(9, 41, 57, 141, rp('#7a8698', '#9aa6b6', '#b8c2d0', '#d0d8e2'), (x, y) => 2.2 + (x - 9) * 0.01 + (hh(x, y, 2) > 0.9 ? 1 : 0)); R.rect(50, 84, 54, 100, K0); R.rect(51, 85, 53, 99, hex('#e8eef4'));
  for (let i = 0; i < 60; i++) { const x = 9 + Math.floor(hh(i, 1) * 48), y = Math.random ? 41 + Math.floor(hh(i, 2) * 8) : 0; R.pset(x, y, hex('#ffffff')); R.pset(9 + Math.floor(hh(i, 3) * 48), 133 + Math.floor(hh(i, 4) * 8), hex('#ffffff')); }
  // las estanterías de acero con los tubos de los testigos
  R.rect(232, 52, 316, 140, K0); for (let y = 60; y < 140; y += 20) { R.rect(233, y, 315, y + 2, hex('#a8b0bc')); R.rect(233, y, 315, y, hex('#e0e6ee')); for (let k = 0; k < 4; k++) { const ty = y - 6 - (k % 2) * 7; R.rect(236, ty, 312, ty + 5, K0); R.rect(237, ty + 1, 311, ty + 4, hex('#c8d0dc')); R.rect(237, ty + 1, 311, ty + 1, hex('#f0f4f8')); R.rect(237, ty + 1, 240, ty + 4, [hex('#e83a3a'), hex('#3a8ae8'), hex('#e8c040'), hex('#3aa86a')][(k + y) % 4]); if (k > 1) break; } }
  for (const x of [233, 314]) R.rect(x, 52, x + 1, 140, hex('#8a94a4'));
  // el termómetro del cuarto (bajo cero) y el tubo fluorescente
  R.rect(180, 30, 216, 44, K0); R.rect(181, 31, 215, 43, hex('#0e1a14')); R.numero('-25', 184, 41, { color: hex('#6af0a0'), sombra: false });
  R.rect(80, 6, 160, 9, K0); R.rect(81, 7, 159, 8, hex('#f6fbff'));
  // la mesa de luz
  R.rect(56, 118, 220, 126, K0); R.rect(57, 119, 219, 121, hex('#f0f8ff')); R.rect(57, 122, 219, 125, hex('#a8b0bc')); for (const x of [60, 212]) R.rect(x, 126, x + 4, 160, K0);
  R.rect(66, 136, 210, 152, K0); llena(67, 137, 209, 151, rp('#6a7484', '#8a94a4', '#a8b2c0'), (x, y) => 1.4 + (x % 36 === 0 ? -1 : 0)); for (let x = 70; x < 206; x += 36) { R.rect(x + 2, 140, x + 30, 148, K0); R.rect(x + 3, 141, x + 29, 147, hex('#e8eef4')); }
};
const testigo = (x0, y0, x1, t, scan, cuenta) => {   // el testigo de hielo tumbado, con sus capas, iluminado desde abajo
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y0 + 11; y++) { const e = Math.abs(y - y0 - 5.5) / 5.5, cap = Math.sin(x * 0.9 + Math.sin(x * 0.13) * 2) > 0.55 || (x % 37 === 0), ceniza = x % 53 === 7 || x % 53 === 8;
    let c = ceniza ? hex('#6a7484') : cap ? hex('#a8d0e8') : hex('#dceef8'); if (e > 0.85) c = hex('#2a3a4e'); else if (y - y0 < 3) c = mez(c, hex('#ffffff'), 0.5);
    if (Math.abs(x - scan) < 3) c = mez(c, hex('#ffffff'), 0.6); R.pset(x, y, c); }
  R.disco(x0, y0 + 5.5, 5.5, (x, y, d) => d > 0.85 ? hex('#2a3a4e') : hex('#c8e4f4')); R.disco(x1, y0 + 5.5, 5.5, (x, y, d) => d > 0.85 ? hex('#2a3a4e') : x > x1 ? hex('#e8f6ff') : hex('#c8e4f4'));
  for (let k = 0; k < cuenta; k++) { const px = x0 + 6 + k * 14; R.linea(px, y0 - 2, px, y0 - 5, hex('#e83a3a')); R.numero(String(k + 1), px - 2, y0 - 7, { color: hex('#e83a3a') }); }
};
const p3 = (t) => {
  capa('h3', fondoLab);
  const CAPA = @12.89@, scan = Math.round(lerp(64, 212, tramo(t, P3 + 0.4, P4 - 0.2))), cuenta = Math.min(10, Math.floor(Math.max(0, scan - 64) / 14));
  luz(138, 116, 70, hex('#e0f4ff'), 0.22);
  testigo(66, 106, 210, t, scan, cuenta);
  // la científica con la lupa sobre el testigo; el compañero entra de la cámara con otro testigo al hombro
  const ci = R.actor(EL.cientifica, 222, 160, t, { dir: -1, sostiene: [214, 112], sonrisa: t > CAPA, habla: t > CAPA + 0.4 && Math.sin(t * 8) > 0 });
  if (ci.mano) T.PIEZAS_PR.lupa(R, ci.mano[0] - 2, ci.mano[1] + 4, { dir: -1 });
  const ent = tramo(t, P3 + 0.2, P3 + 2.6), ix = Math.round(lerp(30, 120, ent));
  const iv = R.actor(EL.investigador ?? EL.tecnico, ix, 172, t, { dir: 1, anda: ent > 0 && ent < 1, sostiene: true, sorpresa: t > CAPA && t < CAPA + 0.6 });
  if (iv.mano) { const [mx, my] = iv.mano; R.rect(mx - 14, my - 4, mx + 6, my + 1, K0); R.rect(mx - 13, my - 3, mx + 5, my, hex('#c8d0dc')); R.rect(mx - 13, my - 3, mx + 5, my - 3, hex('#f0f4f8')); R.rect(mx - 13, my - 3, mx - 11, my, hex('#3a8ae8')); }
  vaho(ix + 10, 148, t, 3); vaho(226, 136, t + 0.4, 3);
  // el vaho frío que sale por la puerta
  for (let i = 0; i < 6; i++) { const u = (t * 0.4 + i / 6) % 1; R.disco(Math.round(58 + u * 30), Math.round(132 + Math.sin(i + t) * 4), 3 + u * 4, (x, y) => mez(R.pget(x, y), hex('#ffffff'), 0.35 * (1 - u))); }
};
// ── 4 · a cámara rápida: la costa verde queda enterrada bajo el hielo ──
const suelo4 = (x) => x < 200 ? 64 + x * 0.32 + Math.sin(x * 0.07) * 10 + Math.sin(x * 0.19) * 4 : 128 + (x - 200) * 0.05;
const p4 = (t) => {
  const MIL = @16.73@, u = tramo(t, P4 + 0.1, MIL), dia = (t * 0.9) % 1;
  cieloCaja(0, 0, 319, 140, t * 6, { invierno: u > 0.5, nubes: 3, viento: 1.8, aves: false });
  const sx = Math.round(lerp(20, 300, dia)), sy = Math.round(70 - Math.sin(dia * Math.PI) * 50); if (!(sx > 270 && sy < 48)) { R.disco(sx, sy, 6, hex('#fff4c8')); R.disco(sx, sy, 4, hex('#ffe28a')); }
  // el mar
  for (let y = 130; y <= 179; y++) for (let x = 200; x <= 319; x++) R.pset(x, y, R.tone(rp('#1a3a5a', '#2a5a7a', '#3a7a9a'), 1.8 - (y - 130) * 0.03 + (Math.sin(x * 0.5 + y + t * 4) > 0.8 ? 1 : 0), x, y));
  // la tierra antigua y el hielo que crece encima en capas
  const techo = (x) => x < 200 ? Math.min(suelo4(x), lerp(suelo4(x), 40 + (x / 200) ** 2 * 66, u)) : 126 - Math.max(0, (Math.min(1, u * 1.3) * 90 - (x - 200))) * 0.0 + (x - 200 < u * 100 ? -6 * Math.min(1, u * 1.2) : 4);
  for (let x = 0; x <= 319; x++) { const g = Math.round(suelo4(x)), top = Math.round(techo(x));
    for (let y = Math.min(g, top); y <= 179; y++) { let c;
      if (x >= 200 && y > g + 2 && !(x - 200 < u * 100 && y < 128)) continue;
      if (y < g) { const d = (y - top), banda = Math.floor(d / 4) % 2; c = R.tone(G_HI, 3.2 - d * 0.03 - banda * 0.5, x, y); if (y === top) c = hex('#ffffff'); }
      else if (x >= 200) { if (x - 200 < u * 100 && y >= 120 && y < 128) c = R.tone(G_HI, 2.6 - (y - 120) * 0.15, x, y); else continue; }
      else { const prof = y - g; c = prof < 3 && u < 0.6 ? R.tone(G_VE, 2.4 - u * 2, x, y) : R.tone(rp('#3a3036', '#54484c', '#6e6062'), 1.4 + (hh(x >> 1, y >> 1) - 0.5) + Math.sin(y * 0.6 + x * 0.05) * 0.4, x, y); if (u >= 0.6 && prof < 2) c = hex('#2a4a3a'); }
      R.pset(x, y, c); } }
  if (u < 0.55) for (let i = 0; i < 12; i++) { const x = 70 + i * 11, g = Math.round(suelo4(x)); if (techo(x) < g - 4) continue; R.rect(x, g - 6, x, g - 1, hex('#4a3020')); R.disco(x, g - 7, 2.5, hex('#3a7a2a')); R.pset(x - 1, g - 8, hex('#6aa84a')); }
  if (u > 0.6) for (let x = 60; x < 200; x += 2) { const g = Math.round(suelo4(x)); if (hh(x, 1) > 0.4) R.pset(x, g - 1, hex('#7a9ab8')); }
  // la nieve a cámara rápida
  for (let i = 0; i < 70; i++) { const x = Math.round((hh(i, 1) * 320 + t * 40) % 320), y = Math.round((hh(i, 2) * 180 + t * 160 * (0.6 + hh(i, 3))) % 180); if (x > 272 && y < 48) continue; R.pset(x, y, hex('#ffffff')); }
  // al final, un pingüino sobre el hielo
  if (u > 0.95) { const px = Math.round(lerp(120, 150, tramo(t, MIL, P5))), py = Math.round(techo(px)); R.rect(px, py - 7, px + 3, py - 1, K0); R.rect(px + 1, py - 6, px + 2, py - 2, hex('#f6f6f6')); R.pset(px + 3, py - 6, hex('#e8b830')); }
  // el contador de años
  const n = Math.round(34000000 * u ** 1.6); R.rect(6, 158, 108, 176, K0); R.rect(7, 159, 107, 175, hex('#1a2030')); R.icono('reloj', 10, 162, hex('#ffd84a'), K0); R.numero(String(n), 24, 172, { color: hex('#ffd84a') });
};
// ── 5 · 1820: el bergantín entre los hielos y el capitán que avista la costa ──
const p5 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'antartida', nieva: true }); void g;
  const AV = @18.89@, bob = Math.round(Math.sin(t * 2) * 1.5);
  const ma = R.actor(EL.marinero ?? EL.marineroEspanol, 236, 162 + bob, t, { dir: 1 }); void ma;
  const ca = R.actor(EL.capitan1820, 208, 162 + bob, t, { dir: -1, dedo: t > AV, sorpresa: t > AV - 0.3 && t < AV + 0.4, habla: t > AV + 0.6 && Math.sin(t * 8) > 0 });
  if (t > AV && t < AV + 2.4) R.icono('!', 214, 122 + bob - Math.round(tramo(t, AV, AV + 0.3) * 4), hex('#ffd84a'), K0, 2);
  // el bote: casco de tablas, la borda y los remos que bogan
  const by = 158 + bob, rem = Math.sin(t * 3); R.linea(244, by, Math.round(262 + rem * 6), by + 12, K0); R.linea(245, by, Math.round(263 + rem * 6), by + 12, hex('#a8743c'));
  R.poligono([[194, by - 1], [264, by - 1], [258, by + 11], [200, by + 11]], K0); for (let y = by; y <= by + 10; y++) for (let x = 196; x <= 262; x++) { if (x < 196 + (y - by) * 0.55 || x > 262 - (y - by) * 0.55) continue; R.pset(x, y, R.tone(MAD, (y - by) % 4 === 0 ? 0.6 : 2.4 - (y - by) * 0.12, x, y)); }
  R.rect(194, by - 2, 264, by - 1, hex('#c8945a')); for (let x = 196; x < 262; x += 2) R.pset(x, by + 12 + (x % 4 === 0 ? 1 : 0), hex('#e8f0f0'));
  T.hoyDelante(R, t, { encuadre: 'antartida' });
};
// ── 6 · el radar y los sondeos: el perfil de la roca bajo el hielo ──
const p6 = (t) => {
  const pr = lin(t, P6, E.duracion - 0.3), SON = @24.71@, S1 = @23.2@;
  const g = T.hoy(R, t, { encuadre: 'antartida', camara: 'radar', avionX: Math.round(lerp(-40, 340, pr)), perfil: pr, testigo: true }); void g;
  // las ondas de los sondeos bajan por el hielo
  for (const ts of [S1, SON]) { const u = t - ts; if (u > 0 && u < 1.2) { const rad = u * 90; for (let a = 10; a <= 170; a += 2) { const x = Math.round(48 + Math.cos(a * D2R) * rad), y = Math.round(100 + Math.sin(a * D2R) * rad * 0.8); if (y > 100 && y < 179 && x >= 0 && x < 320) R.pset(x, y, mez(R.pget(x, y), hex('#ffd84a'), 0.8 * (1 - u / 1.2))); } } }
  const MUESTRA = @22.6@;
  const iv = R.actor(EL.investigadora, 118, 98, t, { dir: 1, dedo: t > MUESTRA, sonrisa: t > MUESTRA + 0.6, habla: t > MUESTRA + 1 && t < MUESTRA + 2.2 && Math.sin(t * 8) > 0 }); void iv;
  const golpe = (ts) => { const u = t - ts; return u > -0.35 && u < 0 ? 'alto' : u >= 0 && u < 0.25 ? 'bajo' : null; };
  const g1 = golpe(S1) || golpe(SON), te = R.actor(EL.tecnico, 30, 98, t, { dir: 1, sostiene: g1 === 'alto' ? [50, 70] : g1 === 'bajo' ? [50, 92] : [48, 84], sorpresa: false });
  R.rect(44, 96, 56, 98, K0); R.rect(45, 96, 55, 97, hex('#c8ccd8'));
  if (te.mano) { const [mx, my] = te.mano; R.linea(mx, my, mx + 2, my + 6, K0); R.rect(mx - 1, my + 5, mx + 5, my + 8, K0); R.rect(mx, my + 6, mx + 4, my + 7, hex('#8a8a9a')); }
  for (const ts of [S1, SON]) if (t > ts && t < ts + 0.3) { R.icono('!', 52, 74, hex('#ffd84a'), K0); }
};
const efectos = [[@3.4@, 'whoosh'], [@6.3@, 'avalancha'], [@9.0@, 'brillo'], [P3 + 0.15, 'zumbido'], [@12.9@, 'tic'], [P4 + 0.15, 'viento'], [P5 + 0.2, 'ola'], [@18.89@, 'campana'], [P6 + 0.3, 'motor'], [@23.2@, 'golpecito'], [@24.71@, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1820', efectos, año: (t) => (t < P3 ? 1958 : t < P5 ? 2026 : t < P6 ? 1820 : 1967) });
'''))


# ──────────────────────────────────────────── PR-DRAKE ────────────────────────────────────────────
E['pr-drake'] = ('El mar que no está', '''// PR-DRAKE (frase 20), hoy (2026). Cuatro planos:
// 1. «And the map doesn't look much like Antarctica either. Between South America and Antarctica»: la mesa de luz,
//    desde arriba, con un mapa polar de hoy; una mano desliza el calco de la costa de 1513 encima y no encaja (X roja en
//    «either»); la retira; en «South America» brilla la punta y en «Antarctica» la península, y una línea a trazos las une;
// 2. corte en «there's a sea about 500 miles wide»: el paso de Drake con temporal: el cabo de Hornos a la izquierda, el
//    hielo a lo lejos, un buque de investigación que cabecea, el albatros; «500» sobre la cota en «500 miles»; en
//    «Drake Passage» una ola rompe por la proa;
// 3. corte en «and on the map it doesn't exist»: en la mesa, el globo (con el mar de Drake que brilla) y la copia del mapa
//    en su atril; en «doesn't exist», un «?» rojo donde debería estar el mar; en «carries on», el dedo sigue la costa hacia el este;
// 4. corte en «The experts who have studied it carefully»: el despacho del historiador; McIntosh entra con la lupa,
//    estudia el globo, en «McIntosh» se vuelve y en «see something simpler» sonríe y levanta el dedo (visto bueno); su
//    ayudante sube a la escalera de la librería a por un libro.''', cuerpo('pr-drake', r'''
const P2 = @5.74@, P3 = @9.80@, P4 = @13.87@;
// ── 1 · la mesa de luz con el mapa polar y el calco de 1513 ──
const fondoMesaLuz = () => {
  tablas(0, 0, 319, 179, rp('#2a1a10', '#4a2e1a', '#6a4426', '#865a34', '#a07246'), 9, 4);
  // el vade de fieltro (arriba a la derecha queda tranquilo)
  R.rect(258, 0, 319, 70, K0); llena(259, 0, 319, 69, rp('#1e3a2a', '#26463a', '#2e5244'), (x, y) => 1.2 + (hh(x >> 1, y >> 1) - 0.5) * 0.4); for (let x = 262; x < 320; x += 3) R.pset(x, 66, hex('#5a8a6a')); for (let y = 0; y < 66; y += 3) R.pset(262, y, hex('#5a8a6a'));
  // la caja de luz de aluminio y el mapa polar encima
  R.rect(52, 14, 254, 166, K0); llena(53, 15, 253, 165, rp('#6a7280', '#8a94a4', '#aab4c2', '#c8d0dc'), (x, y) => 2 + (x === 53 || y === 15 ? 1 : 0) - (x === 253 || y === 165 ? 1.4 : 0));
  R.rect(58, 20, 248, 160, hex('#f4faff'));
  R.rect(68, 26, 238, 154, hex('#9aa4b4')); polar(69, 27, 237, 153, 154, 96, 2, 28, {});
  for (const [px, py] of [[70, 28], [236, 28], [70, 152], [236, 152]]) { R.rect(px - 2, py - 2, px + 2, py + 2, hex('#e8e0c8')); }
  // los lápices, la goma, las gafas, la taza y la libreta
  R.rect(14, 30, 40, 66, K0); R.rect(15, 31, 39, 65, hex('#f2ece0')); for (let y = 36; y < 64; y += 4) R.rect(18, y, 36, y, hex('#9aa4c8')); R.rect(15, 31, 39, 33, hex('#c83a3a'));
  for (const [x, c] of [[18, '#e8c040'], [24, '#3a8a4a'], [30, '#2a4fa8']]) { R.linea(x, 80, x + 6, 120, K0); R.linea(x + 1, 80, x + 7, 120, hex(c)); R.pset(x + 7, 121, K0); }
  R.rect(14, 136, 26, 142, K0); R.rect(15, 137, 25, 141, hex('#e87a9a')); R.rect(15, 137, 18, 141, hex('#2a4fa8'));
  R.disco(284, 120, 11, K0); R.disco(284, 120, 10, hex('#f6f2ea')); R.disco(284, 120, 7, hex('#5a3418')); R.disco(282, 118, 3, hex('#7a4a24')); R.rect(294, 117, 299, 123, K0); R.rect(295, 118, 298, 122, hex('#f6f2ea'));
  R.anillo(274, 160, 6, K0); R.anillo(290, 160, 6, K0); R.linea(280, 160, 284, 160, K0); R.linea(268, 158, 262, 152, K0); R.linea(296, 158, 302, 152, K0);
  R.rect(270, 82, 314, 96, K0); R.rect(271, 83, 313, 95, hex('#e8d8b0')); for (let x = 274; x < 312; x += 4) R.rect(x, 83, x, 87, hex('#5a3418'));
};
const p1 = (t) => {
  capa('k1', fondoMesaLuz);
  luz(154, 90, 120, hex('#ffffff'), 0.08);
  const NO = @2.4@, SA = @3.7@, ANT = @4.88@;
  // el vapor de la taza
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; R.pset(Math.round(284 + Math.sin(t * 2 + k) * 3), Math.round(112 - u * 16), mez(R.pget(284, 112), hex('#ffffff'), 0.7 * (1 - u))); }
  // el calco con la costa de 1513 entra, no encaja, y sale
  const entra = tramo(t, 0.5, 1.8), sale = tramo(t, NO + 0.6, SA - 0.1), sx = Math.round(lerp(330, 110, entra) + lerp(0, 150, sale)), sy = 62, w = 92, h = 80;
  if (sx < 320) { for (let y = sy; y <= sy + h; y++) for (let x = sx; x <= sx + w; x++) { if (x > 319) continue; const e = Math.min(x - sx, sx + w - x, y - sy, sy + h - y); R.pset(x, y, e < 1 ? hex('#b8a888') : mez(R.pget(x, y), hex('#f6ecd0'), 0.5)); }
    for (let i = 0; i + 1 < COSTA_PIRI.length; i++) { const [a, b] = COSTA_PIRI[i], [c, d] = COSTA_PIRI[i + 1]; for (const dd of [0, 1]) R.linea(sx + a * w + dd, sy + b * h, sx + c * w + dd, sy + d * h, hex('#7a3a1a')); }
    for (let k = 0; k < 5; k++) R.pset(sx + 10 + k * 3, sy + 16 + (k % 2) * 3, hex('#7a3a1a'));
    const wx = sx + w + 2, wy = sy + h + 4; T.brazo(R, wx + 18, 200, wx, wy, '#4a6a4a', -1); }
  // la X roja: no se parece
  if (t > NO && t < NO + 1.4) { const k = tramo(t, NO, NO + 0.15); R.icono('X', 136, 82, hex('#ff2a2a'), K0, Math.round(2 + k * 3)); }
  // la punta de Sudamérica y la península brillan; la línea a trazos del paso
  const pul = 0.5 + 0.5 * Math.sin(t * 7), a = tramo(t, SA, SA + 0.3), b = tramo(t, ANT, ANT + 0.3);
  const pSA = [154 + 70 * Math.sin(-40 * D2R), 96 - 70 * Math.cos(-40 * D2R)], pAN = [154 + 54 * Math.sin(-32 * D2R), 96 - 54 * Math.cos(-32 * D2R)];
  if (a > 0) R.anillo(pSA[0], pSA[1], 6 + pul, hex('#ffb020'));
  if (b > 0) R.anillo(pAN[0], pAN[1], 6 + pul, hex('#ffb020'));
  const L = tramo(t, ANT + 0.2, P2 - 0.2); if (L > 0) { const n = 14; for (let k = 0; k < n * L; k++) if (k % 2 === 0) { const u = k / n, v = (k + 1) / n; R.linea(pSA[0] + (pAN[0] - pSA[0]) * u, pSA[1] + (pAN[1] - pSA[1]) * u, pSA[0] + (pAN[0] - pSA[0]) * v, pSA[1] + (pAN[1] - pSA[1]) * v, hex('#e83a3a')); } }
};
// ── 2 · el paso de Drake con temporal ──
const p2 = (t) => {
  const MIL = @6.62@, DRK = @8.66@;
  llena(0, 0, 319, 100, rp('#3a4252', '#4a5466', '#5e687c', '#748094'), (x, y) => 0.4 + y * 0.03 + (hh(x >> 1, y >> 1, 2) - 0.5) * 0.4);
  const ok = (x, y) => y <= 98 && !(x > 266 && y < 50);
  for (let k = 0; k < 6; k++) { const v = [6, 10, 15][k % 3], w = 40 + (k % 3) * 14, L = 360 + w * 2, cx = -w + ((t * v + k * 71) % L); nube(cx, 30 + (k % 3) * 16 + Math.floor(k / 3) * 8, w, rp('#2a303c', '#4a5262', '#6e7688'), ok); }
  // la lluvia sesgada
  for (let i = 0; i < 70; i++) { const x = Math.round((hh(i, 1) * 360 + t * 120) % 360) - 20, y = Math.round((hh(i, 2) * 180 + t * 200) % 180); if (x > 266 && y < 50) continue; R.linea(x, y, x - 2, y + 4, mez(R.pget(x, y), hex('#c8d0dc'), 0.5)); }
  // el hielo a lo lejos y el cabo de Hornos
  R.poligono([[236, 98], [246, 92], [270, 93], [294, 90], [319, 92], [319, 100], [236, 100]], hex('#e8f0f8')); R.rect(236, 97, 319, 100, hex('#a8c4d8'));
  for (let y = 98; y <= 179; y++) for (let x = 0; x <= 319; x++) { const ola = Math.sin(x * 0.08 + y * 0.35 - t * 2.4 + Math.sin(x * 0.03 + t) * 2) + Math.sin(x * 0.21 - t * 3.1 + y * 0.1) * 0.5;
    let c = R.tone(rp('#0e2234', '#163448', '#20485e', '#2e5e76', '#4a7e96'), 1.2 + (y - 98) * 0.02 + ola * 0.7, x, y); if (ola > 1.25) c = hex('#e8f4f8'); else if (ola > 1.05) c = hex('#a8c8d8'); R.pset(x, y, c); }
  R.poligono([[0, 56], [18, 48], [34, 50], [52, 64], [62, 86], [70, 104], [72, 120], [0, 120]], K0);
  llena(0, 49, 70, 120, rp('#2a2630', '#3e3844', '#544c58', '#6a6070'), (x, y) => 1.4 + (hh(x >> 1, y >> 1) - 0.5) * 1.2 + Math.sin(y * 0.5 + x * 0.1) * 0.4);
  R.poligono([[0, 120], [72, 120], [70, 104], [62, 86], [52, 64], [34, 50], [18, 48], [0, 56], [-1, 56], [-1, 121]], (x, y) => { const c = R.pget(x, y); return c; });
  for (let x = 0; x < 52; x++) { const y = Math.round(50 + Math.abs(x - 22) * 0.25); R.pset(x, y, hex('#4a6a3a')); R.pset(x, y + 1, hex('#3a5a2a')); }
  R.rect(24, 38, 28, 50, K0); R.rect(25, 39, 27, 49, hex('#f6f2ea')); R.rect(24, 36, 28, 38, hex('#c83a3a')); if (Math.sin(t * 4) > 0.3) luz(26, 37, 14, hex('#fff4c8'), 0.5);
  for (let k = 0; k < 6; k++) { const u = (t * 1.6 + k / 6) % 1; R.disco(Math.round(70 + k * 2 + u * 10), Math.round(118 - Math.sin(u * Math.PI) * 14), 2 + u * 2, (x, y) => mez(R.pget(x, y), hex('#ffffff'), 0.7 * (1 - u))); }
  // el buque que cabecea
  const ang = Math.sin(t * 1.6) * 0.14, bx = 168, by = 132 + Math.round(Math.sin(t * 1.6 + 1) * 3);
  const Y = (x, y) => Math.round(by + y + (x) * Math.tan(ang));
  for (let x = -38; x <= 38; x++) { const proa = x > 30 ? (x - 30) * 1.4 : 0, h0 = -2 - (x > 30 ? (x - 30) * 0.6 : 0); for (let y = Math.round(h0); y <= 8 - proa * 0.5; y++) R.pset(bx + x, Y(x, y), y < 0 ? hex('#f6f2ea') : y < 3 ? hex('#c83a2a') : hex('#8a2418')); R.pset(bx + x, Y(x, Math.round(h0) - 1), K0); }
  for (let x = -26; x <= 4; x++) for (let y = -14; y <= -3; y++) R.pset(bx + x, Y(x, y), x === -26 || x === 4 || y === -14 ? K0 : y === -10 && x % 3 ? hex('#2a3a5a') : hex('#f2eee2'));
  for (let x = -20; x <= -14; x++) for (let y = -22; y <= -15; y++) R.pset(bx + x, Y(x, y), hex('#f2eee2')); R.linea(bx - 17, Y(-17, -22), bx - 17, Y(-17, -30), K0);
  for (let i = 0; i < 18; i++) R.pset(bx + 10 + Math.round(i * 0.8), Y(10 + i * 0.8, -3 - i), hex('#e8b830'));
  for (let x = -30; x <= 30; x += 10) R.pset(bx + x, Y(x, -4), hex('#3a3a46'));
  // la ola que rompe en la proa en «Drake Passage»
  const ola = tramo(t, DRK - 0.1, DRK + 0.3) * (1 - tramo(t, DRK + 0.8, DRK + 1.4));
  if (ola > 0) for (let i = 0; i < 26; i++) { const a = -Math.PI / 2 + (hh(i, 1) - 0.5) * 2.2, r = ola * (8 + hh(i, 2) * 22); R.disco(Math.round(bx + 40 + Math.cos(a) * r), Math.round(by - 4 + Math.sin(a) * r), 1.5 + hh(i, 3) * 2, hex('#ffffff')); }
  for (let x = -40; x <= 44; x++) if (hh(x, Math.floor(t * 8)) > 0.4) R.pset(bx + x, Y(x, 9), hex('#e8f4f8'));
  // el albatros
  const ax = Math.round(260 - ((t * 22) % 300)), ay = Math.round(80 + Math.sin(t * 1.3) * 6), al = Math.sin(t * 2) * 2; if (ax > 0) { R.linea(ax - 9, Math.round(ay - al), ax, ay, hex('#f6f2ea')); R.linea(ax, ay, ax + 9, Math.round(ay - al), hex('#f6f2ea')); R.linea(ax - 9, Math.round(ay - al) + 1, ax - 5, ay + 1, hex('#2a2a3a')); R.linea(ax + 5, ay + 1, ax + 9, Math.round(ay - al) + 1, hex('#2a2a3a')); R.pset(ax - 1, ay, hex('#e8b830')); }
  // la cota de 500 millas entre el cabo y el hielo
  const c = tramo(t, MIL - 0.3, MIL + 0.2); if (c > 0) { const x0 = 74, x1 = Math.round(lerp(74, 238, c)), y = 70; for (let x = x0; x <= x1; x += 4) R.linea(x, y, x + 2, y, hex('#ffffff')); R.linea(x0, y - 3, x0, y + 3, hex('#ffffff')); if (c > 0.95) { R.linea(x1, y - 3, x1, y + 3, hex('#ffffff')); R.linea(x0 + 1, y, x0 + 4, y - 3, hex('#ffffff')); R.linea(x0 + 1, y, x0 + 4, y + 3, hex('#ffffff')); R.linea(x1 - 1, y, x1 - 4, y - 3, hex('#ffffff')); R.linea(x1 - 1, y, x1 - 4, y + 3, hex('#ffffff')); R.rect(136, 54, 178, 74, K0); R.rect(137, 55, 177, 73, hex('#1a2030')); R.numero('500', 157, 71, { tam: 16, centro: true }); } }
};
// ── 3 · el globo y la copia del mapa en la mesa ──
const fondoMesaG = () => {
  llena(0, 0, 319, 112, rp('#1a2238', '#222c46', '#2a3654', '#344264'), (x, y) => 1.6 + vn(x * 0.05, y * 0.05, 7) * 0.6 + (x % 26 === 0 ? -0.6 : 0));
  R.rect(0, 100, 319, 112, K0); tablas(0, 101, 319, 111, rp('#3a2214', '#5e3a1e', '#83552c', '#a06a38'), 11, 5); R.rect(0, 100, 319, 100, hex('#c8945a'));
  marco(26, 20, 66, 54); llena(29, 23, 63, 51, rp('#b8965e', '#d8bc84', '#ead6a4'), (x, y) => 1.6 + (hh(x, y) - 0.5) * 0.6); R.anillo(46, 37, 9, hex('#5a3a22')); for (let k = 0; k < 8; k++) R.linea(46, 37, 46 + Math.cos(k * Math.PI / 4) * 9, 37 + Math.sin(k * Math.PI / 4) * 9, hex('#a83224'));
  marco(150, 16, 196, 46); llena(153, 19, 193, 43, rp('#4a7ab8', '#7aa8d8', '#a8c8e8'), (x, y) => 2.2 - (y - 19) * 0.06); R.poligono([[160, 43], [172, 30], [184, 43]], hex('#e8f0f8')); R.poligono([[176, 43], [186, 34], [193, 43]], hex('#c8d8e8'));
  R.rect(0, 112, 319, 179, K0); llena(0, 113, 319, 179, rp('#1a3a2a', '#24503a', '#2e6448', '#3a7a58'), (x, y) => 2 + (hh(x >> 1, y >> 1) - 0.5) * 0.5 - (y - 113) * 0.01); R.rect(0, 113, 319, 114, hex('#c8a050'));
  // la taza, la regla, el lápiz y la lupa
  R.rect(126, 130, 138, 146, K0); R.rect(127, 131, 137, 145, hex('#f6f2ea')); R.rect(127, 131, 137, 133, hex('#5a3418')); R.rect(138, 134, 142, 141, K0);
  R.rect(110, 160, 160, 165, K0); R.rect(111, 161, 159, 164, hex('#d8b46a')); for (let x = 113; x < 158; x += 4) R.rect(x, 161, x, 162, hex('#5a3418'));
  R.linea(20, 166, 52, 156, K0); R.linea(20, 165, 52, 155, hex('#e8c040')); R.pset(52, 155, hex('#2a2a2a'));
};
const p3 = (t) => {
  capa('k3', fondoMesaG);
  const NOEX = @10.94@, SIGUE = @12.22@;
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; R.pset(Math.round(132 + Math.sin(t * 2 + k) * 3), Math.round(126 - u * 16), mez(R.pget(132, 126), hex('#ffffff'), 0.7 * (1 - u))); }
  // el globo con el mar de Drake que brilla en «doesn't exist»
  R.rect(56, 146, 104, 152, K0); llena(57, 147, 103, 151, MAD, (x, y) => 2.4 - (y - 147) * 0.3); R.rect(78, 140, 82, 146, K0); R.rect(79, 140, 81, 145, hex('#c8962a'));
  aroGlobo(80, 88, 48); globo(80, 88, 48, -64, -46, { t, drake: tramo(t, NOEX - 0.3, NOEX + 0.2) });
  // la copia del mapa de 1513 en su atril
  R.linea(186, 170, 200, 70, K0); R.linea(296, 170, 282, 70, K0); R.rect(170, 62, 304, 154, K0); R.rect(171, 63, 303, 153, hex('#8a5a2e'));
  clip([174, 66, 300, 150]); mapita(174, 66, 126, 84, t, { sinBorde: true, oro: tramo(t, SIGUE, SIGUE + 0.8) }); clip(null);
  R.rect(170, 154, 304, 158, K0); R.rect(171, 155, 303, 157, hex('#a8743c'));
  // el «?» rojo donde tendría que estar el mar
  if (t > NOEX && t < SIGUE + 0.6) { const k = tramo(t, NOEX, NOEX + 0.2); R.icono('?', 214, 116, hex('#ff2a2a'), K0, Math.round(1 + 2 * k)); for (let x = 196; x < 300; x += 3) R.pset(x, 140 + Math.round(Math.sin(x * 0.3 + t * 4)), hex('#3a8ae8')); }
  // el dedo sigue la costa hacia el este
  const u = tramo(t, SIGUE - 0.2, @13.04@ + 0.3), sal = tramo(t, P4 - 0.6, P4 - 0.1);
  const pts = COSTA_PIRI.slice(6).map(([a, b]) => [174 + a * 126, 66 + b * 84]); const f = u * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), fr = f - i;
  const px = Math.round(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * fr), py = Math.round(pts[i][1] + (pts[i + 1][1] - pts[i][1]) * fr);
  if (t > SIGUE - 0.6 && sal < 1) { const wy = py + 6 + Math.round(sal * 40), wx = px - 14; T.brazo(R, wx + 10, 200, wx, wy, '#4a6a4a', 1); }
};
// ── 4 · el despacho del historiador ──
const p4 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'despacho', gira: 6 }); void g;
  const CUID = @14.75@, MC = @17.16@, SIMPLE = @18.4@;
  // la ayudante sube a la escalera de la librería, coge un libro y baja
  const sube = tramo(t, P4 + 0.2, P4 + 1.4) - tramo(t, MC, MC + 1.1), ay = Math.round(lerp(158, 120, sube));
  const as = R.actor(EL.visitante2, 60, ay, t, { dir: -1, sostiene: t > P4 + 1.6 ? true : t > P4 + 1.3 ? [50, ay - 30] : false, sonrisa: t > MC });
  if (t > P4 + 1.6 && as.mano) { const [mx, my] = as.mano; R.rect(mx - 6, my - 6, mx, my, K0); R.rect(mx - 5, my - 5, mx - 1, my - 1, hex('#8a2a2a')); R.rect(mx - 5, my - 5, mx - 1, my - 5, hex('#c8945a')); }
  // McIntosh entra con la lupa, estudia el globo, se vuelve y sonríe
  const entra = tramo(t, P4, CUID), mx0 = Math.round(lerp(300, 206, entra)), mira = t > CUID && t < MC;
  const mc = R.actor(EL.mcintosh, mx0, 158, t, { dir: t < MC ? 1 : -1, anda: entra > 0 && entra < 1, sostiene: t < SIMPLE - 0.1 ? (mira ? [224, 124 + Math.round(Math.sin(t * 2) * 2)] : true) : false, dedo: t > SIMPLE, sonrisa: t > MC, habla: t > MC + 0.3 && t < SIMPLE + 1.2 && Math.sin(t * 8) > 0 });
  if (t < SIMPLE - 0.1 && mc.mano) T.PIEZAS_PR.lupa(R, mc.mano[0] + 2, mc.mano[1] + 5, {});
  if (t > SIMPLE) { const k = tramo(t, SIMPLE, SIMPLE + 0.3); T.visto(R, mx0 + 2, Math.round(116 - 4 * k), 2); }
  T.hoyDelante(R, t, { encuadre: 'despacho' });
};
const efectos = [[0.6, 'papel'], [@2.4@, 'aviso'], [@4.9@, 'lapiz'], [P2 + 0.2, 'viento'], [@8.66@, 'ola'], [@10.94@, 'golpecito'], [@12.3@, 'lapiz'], [@14.8@, 'papel'], [@18.4@, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
'''))
