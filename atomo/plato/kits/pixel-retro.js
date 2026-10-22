// Kit «pixel retro»: el estilo 17 del muestrario tal cual (estilos/17-pixel-art.html), para las escenas del episodio 4.
//
//   import { crearRetro } from '/atomo/plato/kits/pixel-retro.js';
//   const R = await crearRetro(document.getElementById('lienzo'));
//   … dibujar en R (320 × 180 píxeles reales) … ; R.presentar();
//
// Lo que se toma del estilo 17 sin cambios: el lienzo de 320 × 180 escalado ×6 sin suavizado, las paletas cerradas, el
// tramado Bayer (2 × 2 y 4 × 4), las siluetas con luz de borde, la caja de diálogo con marco de latón y el átomo narrador.
// Todo pasa de noche o a la luz de una vela: no hay paletas de día.
//
// Zona segura (CONTRATO.md, en píxeles reales): x 17–303, y 10–170; lo importante, por encima de y ≈ 147 (subtítulos).
// Sin palabras en pantalla: solo números y símbolos (R.numero) e iconos (R.icono).

const W = 320, H = 180, TAU = Math.PI * 2;

const hex = (h) => { const n = parseInt(h.slice(1), 16); return (0xff000000 | ((n & 255) << 16) | (n & 0xff00) | (n >> 16)) >>> 0; };
const pal = (a) => a.map(hex);

// ── Paletas: las del estilo 17 y, con sus mismos tonos, las de barcos, pergamino y velas ──────────────────────────
export const PAL = {
  SKY: pal(['#06071a', '#0a0d24', '#0e1330', '#13193c', '#182048', '#1e2855', '#253162', '#2d3b6d', '#374678', '#425182', '#4f5d8d', '#5e6a97']),
  MOON: pal(['#7d6a62', '#b9996f', '#dcc18a', '#f1dfae', '#fff7df']),
  EARTH: pal(['#1c2349', '#252e5a', '#2f3968', '#3d4879']),
  STAR: pal(['#3c4a7e', '#5f6ea3', '#9fb2e0', '#dbe6ff', '#ffffff']),
  WARM: pal(['#7a5a6a', '#d9a27a', '#ffd9a8']),
  COOL: pal(['#4a6aa8', '#9cc4ff', '#e6f3ff']),
  FARC: pal(['#161d42', '#1d2650', '#28336a', '#4a5590', '#7781b4', '#a9b2da']),
  MIST: pal(['#33406f', '#425083']),
  MIDC: pal(['#0f1431', '#141a3b', '#232d5c', '#34427a']),
  FGC: pal(['#05060f', '#080a1b', '#0c0f25', '#1a234c', '#33427a', '#5a6aa3']),
  OBS: pal(['#05060f', '#8e97c8', '#c94558', '#8a2c45', '#ff7d6e']),
  TITLE: pal(['#fffbe9', '#ffeaa8', '#ffd36a', '#f6a94f', '#e07b45']),
  TBACK: pal(['#d9ccf7', '#ae9fe0', '#8676c6', '#6656a8', '#4b3d8c']),
  UI: pal(['#05060f', '#0b0e24', '#131a3c', '#1d2650', '#9a8063', '#e4cf96', '#fff6dc', '#ffcf5a', '#8fb8ff', '#3a4a86']),
  ATOM: pal(['#ff7a5c', '#ffcf5a', '#fff3d0', '#2c4380', '#e8f4ff', '#7fa6f0', '#c94558', '#8ea6dc']),
  GLOW: pal(['#3a4a86', '#5e72b4']),
  WATER: pal(['#05071a', '#0a1029', '#111a3b', '#1b2750', '#293a6b', '#40548b', '#6d80b6']),
  // derivadas (con los tonos de arriba)
  SAIL: pal(['#2f3968', '#7d6a62', '#b9996f', '#dcc18a', '#f1dfae', '#fff7df']),
  HULL: pal(['#05060f', '#140f26', '#231a3a', '#3a2a4e', '#5a4260', '#7a5a6a']),
  FIRE: pal(['#7a5a6a', '#e07b45', '#f6a94f', '#ffd36a', '#fffbe9']),
  // pergamino a la luz de una vela: de la sombra al papel iluminado
  PERG: pal(['#3a2a4e', '#7a5a6a', '#9a8063', '#b9996f', '#dcc18a', '#f1dfae']),
  TINTA: hex('#3a2a4e'), ROJO: hex('#c94558'), INK: hex('#05060f'), SHADOW: hex('#2a1f55'),
  ORO: pal(['#7a5a6a', '#9a8063', '#e07b45', '#f6a94f', '#ffd36a', '#fffbe9']),
  PLATA: pal(['#3a4a86', '#7781b4', '#a9b2da', '#dbe6ff', '#ffffff']),
};
export { hex, pal };

// ── Utilidades (las del estilo 17) ───────────────────────────────────────────────────────────────────────────────
export function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export function hash2(ix, iy) { let h = (Math.imul(ix | 0, 374761393) + Math.imul(iy | 0, 668265263)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
export function vnoise(x, y) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const v00 = hash2(x0, y0), v10 = hash2(x0 + 1, y0), v01 = hash2(x0, y0 + 1), v11 = hash2(x0 + 1, y0 + 1);
  const top = v00 + (v10 - v00) * sx, bot = v01 + (v11 - v01) * sx;
  return top + (bot - top) * sy;
}
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
export const b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const B2 = [0, 2, 3, 1];
export const b2 = (x, y) => (B2[((y & 1) << 1) | (x & 1)] + 0.5) / 4;
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export const smooth = (a, b, v) => { const p = clamp((v - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
export const easeIO = (p) => p <= 0 ? 0 : p >= 1 ? 1 : p < 0.5 ? 4 * p * p * p : 1 - Math.pow(2 - 2 * p, 3) / 2;
export const sale = (p) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
export const lerp = (a, b, p) => a + (b - a) * p;
// avance 0→1 entre a y b (suavizado)
export const tramo = (t, a, b) => easeIO(clamp((t - a) / Math.max(1e-6, b - a), 0, 1));
export const tone = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b2(x, y)) l++; return ramp[clamp(l, 0, ramp.length - 1)]; };
export const tone4 = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[clamp(l, 0, ramp.length - 1)]; };

// punto dentro de un polígono [[x, y], …] (regla par-impar)
export function dentro(pts, x, y) {
  let c = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}

// ── Mapas del mundo de baja resolución (lon, lat), para pergaminos y globos ──────────────────────────────────────
export const CONTINENTES = {
  norteamerica: [[-166, 66], [-140, 70], [-120, 72], [-95, 72], [-80, 66], [-62, 58], [-56, 50], [-66, 44], [-76, 35], [-81, 30], [-80, 25], [-84, 30], [-90, 29], [-97, 26], [-97, 21], [-87, 21], [-88, 16], [-83, 10], [-79, 8], [-85, 11], [-92, 15], [-105, 20], [-110, 24], [-114, 31], [-117, 33], [-124, 40], [-124, 48], [-135, 58], [-152, 59], [-165, 61]],
  sudamerica: [[-79, 8], [-72, 12], [-62, 11], [-52, 5], [-35, -5], [-39, -15], [-48, -25], [-58, -35], [-65, -42], [-68, -52], [-72, -54], [-75, -45], [-73, -35], [-70, -18], [-77, -12], [-81, -5], [-80, 1]],
  groenlandia: [[-55, 60], [-42, 60], [-20, 70], [-18, 80], [-40, 83], [-62, 80], [-68, 76], [-58, 68]],
  eurasia: [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [3, 51], [8, 54], [12, 56], [5, 59], [6, 62], [15, 69], [28, 71], [40, 67], [60, 70], [80, 73], [105, 78], [140, 72], [170, 70], [180, 66], [170, 60], [160, 55], [142, 52], [140, 40], [128, 35], [122, 31], [121, 24], [108, 21], [109, 12], [104, 9], [100, 14], [98, 8], [103, 1], [98, 3], [92, 20], [80, 15], [77, 8], [72, 20], [66, 25], [57, 25], [52, 28], [48, 29], [56, 17], [44, 12], [40, 20], [34, 28], [36, 34], [27, 37], [22, 40], [16, 40], [12, 44], [8, 44], [3, 42], [0, 39], [-6, 37]],
  africa: [[-6, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [40, -2], [40, -15], [35, -25], [20, -35], [17, -29], [12, -17], [13, -5], [9, 4], [-8, 4], [-17, 14], [-17, 21], [-13, 28]],
  australia: [[114, -22], [122, -17], [131, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [140, -38], [131, -31], [116, -35], [114, -28]],
  japon: [[130, 31], [135, 34], [140, 36], [142, 40], [141, 43], [145, 44], [140, 45], [139, 38], [132, 34]],
  britania: [[-5, 50], [1, 51], [2, 53], [-2, 56], [-3, 58], [-6, 58], [-5, 54], [-3, 53], [-5, 52]],
  madagascar: [[44, -25], [48, -24], [50, -15], [49, -12], [44, -16]],
  indonesia: [[95, 5], [105, -6], [115, -8], [120, -9], [118, -5], [110, -2], [104, 1]],
};

// ── Fuentes: Press Start 2P y Silkscreen, como el estilo 17 (solo para números y símbolos) ────────────────────────
async function cargarFuentes() {
  if (!document.querySelector('link[data-retro]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.dataset.retro = '1';
    l.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen&display=block';
    const cargada = new Promise((r) => { l.onload = r; l.onerror = r; setTimeout(r, 10000); });
    document.head.appendChild(l);
    await cargada;
  }
  const fs = ["32px 'Press Start 2P'", "16px 'Press Start 2P'", "8px 'Press Start 2P'", '8px Silkscreen'];
  const espera = Promise.all(fs.map((f) => document.fonts.load(f, '0123456789°£×−+?%½ GPS')));
  await Promise.race([espera, new Promise((r) => setTimeout(r, 10000))]);
  await document.fonts.ready;
}

export async function crearRetro(lienzo) {
  const captura = new URLSearchParams(location.search).has('captura');
  await cargarFuentes();
  const ctx = lienzo.getContext('2d');
  const bajo = document.createElement('canvas'); bajo.width = W; bajo.height = H;
  const bctx = bajo.getContext('2d');
  const imagen = bctx.createImageData(W, H);
  const PANT = new Uint32Array(imagen.data.buffer);
  let B = PANT;
  const nuevo = () => new Uint32Array(W * H);
  const usar = (b) => { const a = B; B = b ?? PANT; return a; };
  // recorte: lo que se dibuja con pset, linea, poligono y disco queda dentro de [x0, y0, x1, y1] (para mapas)
  let CL = null;
  const recorte = (r) => { CL = r ? r.map(Math.round) : null; };
  const pset = (x, y, c) => { x |= 0; y |= 0; if (CL && (x < CL[0] || x > CL[2] || y < CL[1] || y > CL[3])) return; if (x >= 0 && x < W && y >= 0 && y < H) B[y * W + x] = c; };
  const pget = (x, y) => (x >= 0 && x < W && y >= 0 && y < H ? B[(y | 0) * W + (x | 0)] : 0);
  const rect = (x0, y0, x1, y1, c) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(H - 1, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(W - 1, x1 | 0); x++) B[y * W + x] = c; };
  const llenar = (c) => B.fill(c);
  const copiar = (de) => B.set(de);
  const linea = (x0, y0, x1, y1, c, punteado = 0) => {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let e = dx + dy, k = 0;
    for (;;) {
      if (!punteado || (k % punteado) < punteado / 2) { const col = typeof c === 'function' ? c(x0, y0, k) : c; if (col != null) pset(x0, y0, col); }
      k++;
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * e;
      if (e2 >= dy) { e += dy; x0 += sx; }
      if (e2 <= dx) { e += dx; y0 += sy; }
    }
  };
  // polígono relleno (regla par-impar, por filas); c puede ser función (x, y) → color
  const poligono = (pts, c) => {
    let y0 = Infinity, y1 = -Infinity;
    for (const [, y] of pts) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    for (let y = Math.max(0, Math.ceil(y0)); y <= Math.min(H - 1, Math.floor(y1)); y++) {
      const xs = [];
      for (let i = 0; i < pts.length; i++) {
        const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length];
        if ((ay <= y + 0.5 && by > y + 0.5) || (by <= y + 0.5 && ay > y + 0.5)) xs.push(ax + (y + 0.5 - ay) / (by - ay) * (bx - ax));
      }
      xs.sort((a, b) => a - b);
      if (CL && (y < CL[1] || y > CL[3])) continue;
      for (let k = 0; k + 1 < xs.length; k += 2)
        for (let x = Math.max(CL ? CL[0] : 0, Math.round(xs[k])); x < Math.min(CL ? CL[2] + 1 : W, Math.round(xs[k + 1])); x++) B[y * W + x] = typeof c === 'function' ? c(x, y) : c;
    }
  };
  const disco = (cx, cy, r, c) => {
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
      if (dx * dx + dy * dy <= r * r) pset(x, y, typeof c === 'function' ? c(x, y, Math.sqrt(dx * dx + dy * dy) / r) : c);
    }
  };
  const anillo = (cx, cy, r, c, punteado = 0) => {
    const n = Math.max(12, Math.round(r * 7));
    for (let k = 0; k < n; k++) { if (punteado && (k % punteado) >= punteado / 2) continue; const a = k / n * TAU; pset(Math.round(cx + r * Math.cos(a) - 0.5), Math.round(cy + r * Math.sin(a) - 0.5), c); }
  };
  // halo tramado (luz de vela, farol, Luna)
  const halo = (cx, cy, r, rampa, fuerza = 1.2) => {
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
      const g = 1 - Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r;
      if (g > 0 && g * fuerza > b4(x, y) + 0.25) pset(x, y, rampa[Math.min(rampa.length - 1, Math.floor(g * rampa.length * 0.999))]);
    }
  };
  // sprite de texto: filas de caracteres; dic: carácter → color (o null para transparente)
  const sprite = (filas, x, y, dic, espejo = false) => {
    const w = filas[0].length;
    for (let j = 0; j < filas.length; j++) for (let i = 0; i < w; i++) {
      const c = dic[filas[j][espejo ? w - 1 - i : i]];
      if (c != null) pset(x + i, y + j, c);
    }
  };
  // silueta con luz de borde (como el observador del estilo 17): m es una máscara (0 vacío, 1 cuerpo, 2 acento,
  // 3 acento oscuro, 4 oro, 5 piel/latón claro); la luz viene del lado `luz` (−1 izquierda, 1 derecha)
  const silueta = (m, mw, mh, ox, oy, o = {}) => {
    const cuerpo = o.cuerpo ?? PAL.OBS[0], borde = o.borde ?? PAL.OBS[1], luz = o.luz ?? -1;
    for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) {
      const v = m[y * mw + x]; if (!v) continue;
      const lado = x - luz >= 0 && x - luz < mw ? m[y * mw + x - luz] : 0, up = y > 0 ? m[(y - 1) * mw + x] : 0;
      let c;
      if (v === 1) c = (!lado || !up) ? borde : cuerpo;
      else if (v === 2) c = !up ? PAL.OBS[4] : PAL.OBS[2];
      else if (v === 3) c = PAL.OBS[3];
      else if (v === 4) c = !up ? PAL.ORO[5] : PAL.ORO[4];
      else if (v === 5) c = !up ? PAL.MOON[3] : PAL.MOON[1];
      else if (v === 6) c = PAL.FARC[2];
      pset(ox + x, oy + y, c);
    }
  };

  // ── Texto: solo números y símbolos (máscaras de 1 bit, contorno y sombra; mascara() del estilo 17) ─────────────
  const cache = new Map();
  const mascara = (texto, fuente, size) => {
    const k = fuente + '|' + texto;
    if (cache.has(k)) return cache.get(k);
    const c = document.createElement('canvas'), g = c.getContext('2d');
    g.font = fuente;
    const adv = Math.ceil(g.measureText(texto).width);
    c.width = adv + 6; c.height = size * 2 + 4;
    g.font = fuente; g.textBaseline = 'alphabetic'; g.fillStyle = '#fff';
    const BL = Math.round(size * 1.5);
    g.fillText(texto, 2, BL);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    const w = c.width, h = c.height, m = new Uint8Array(w * h);
    for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 110 ? 1 : 0;
    const at = (x, y) => x >= 0 && x < w && y >= 0 && y < h && m[y * w + x] === 1;
    const o = new Uint8Array(w * h), sh = new Uint8Array(w * h);
    let top = h, bot = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (at(x, y)) { top = Math.min(top, y); bot = Math.max(bot, y); continue; }
      let n = 0;
      for (let j = -1; j <= 1 && !n; j++) for (let i = -1; i <= 1; i++) if (at(x + i, y + j)) { n = 1; break; }
      if (n) o[y * w + x] = 1; else if (at(x - 1, y - 2) || at(x - 2, y - 2) || at(x - 1, y - 3)) sh[y * w + x] = 1;
    }
    const r = { w, h, m, o, sh, BL, adv, top, bot };
    cache.set(k, r);
    return r;
  };
  // número grande (cartelas, 16 px) o pequeño (8 px), con la rampa dorada del título del estilo 17
  const numero = (texto, x, base, o = {}) => {
    const tam = o.tam ?? 8, fuente = tam >= 16 ? `${tam}px 'Press Start 2P'` : o.fina ? '8px Silkscreen' : "8px 'Press Start 2P'";
    const mk = mascara(texto, fuente, tam >= 16 ? tam : 8);
    if (o.centro) x -= Math.round(mk.adv / 2);
    const rampa = o.rampa ?? PAL.TITLE, capTop = base - (mk.BL - mk.top), alto = Math.max(1, mk.bot - mk.top);
    const n = o.n ?? Infinity;   // cuántas columnas se ven (para escribir de izquierda a derecha)
    for (let j = 0; j < mk.h; j++) for (let i = 0; i < Math.min(mk.w, n); i++) {
      const k = j * mk.w + i, X = x + i - 2, Y = base + j - mk.BL;
      const grande = tam >= 16 || o.contorno === true;
      if (mk.m[k]) {
        if (!grande && o.sombra !== false && !mk.m[k + mk.w]) pset(X, Y + 1, PAL.UI[0]);
        pset(X, Y, o.color ?? (grande ? tone(rampa, clamp((Y - capTop) / alto, 0, 1) * (rampa.length - 1) * 0.85, X, Y) : (Y - capTop < alto * 0.5 ? rampa[1] : rampa[2])));
      } else if (grande && o.contorno !== false && mk.o[k]) pset(X, Y, PAL.INK);
      else if (grande && o.sombra !== false && mk.sh[k]) pset(X, Y, PAL.SHADOW);
    }
    return mk.adv;
  };

  // ── Iconos 7 × 7 (para la caja de diálogo) ─────────────────────────────────────────────────────────────────────
  const ICONOS = {
    '?': ['.###.', '#...#', '...#.', '..#..', '..#..', '.....', '..#..'],
    X: ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
    reloj: ['..###..', '.#...#.', '#..#..#', '#..##.#', '#.....#', '.#...#.', '..###..'],
    candado: ['..###..', '.#...#.', '.#...#.', '#######', '###.###', '###.###', '#######'],
    calavera: ['.#####.', '#######', '#..#..#', '#######', '.##.##.', '.#.#.#.'],
    pila: ['.##.', '####', '#..#', '#..#', '#..#', '####'],
    barco: ['...#...', '..##...', '.###...', '####...', '...#...', '#######', '.#####.'],
    satelite: ['##.#.##', '##.#.##', '..###..', '..###..', '##.#.##', '##.#.##'],
    corona: ['#.#.#', '#####', '#####'],
    factura: ['#####.', '#...##', '#.##.#', '#....#', '#.##.#', '#....#', '######'],
    globo: ['..###..', '.#.#.#.', '#..#..#', '#######', '#..#..#', '.#.#.#.', '..###..'],
    mano: ['..#.#.', '.##.##', '######', '######', '.####.', '..##..'],
    luna: ['..##.', '.#...', '#....', '#....', '.#...', '..##.'],
  };
  // icono(nombre, x, y, color, sombra, escala): escala 2 para los iconos solos de la caja
  const icono = (nombre, x, y, c = PAL.UI[7], sombra = PAL.UI[0], esc = 1) => {
    const f = ICONOS[nombre];
    const px = (i, j, col) => { for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) pset(x + i * esc + a, y + j * esc + b, col); };
    for (let j = 0; j < f.length; j++) for (let i = 0; i < f[j].length; i++) if (f[j][i] === '#') px(i, j + 1 / esc, sombra);
    for (let j = 0; j < f.length; j++) for (let i = 0; i < f[j].length; i++) if (f[j][i] === '#') px(i, j, c);
    return f[0].length * esc;
  };

  // ── El átomo narrador (los dos del estilo 17: el del retrato y el compañero) ───────────────────────────────────
  const atomo = (cx, cy, t, o = {}) => {
    const R = o.r ?? 8.4, r2 = R * 0.345, vel = o.vel ?? 1, e = o.energia ?? 0;
    const orbs = [0, Math.PI / 3, -Math.PI / 3], els = [];
    orbs.forEach((a, i) => {
      const ca = Math.cos(a), sa = Math.sin(a);
      const n = Math.round(R * 8.6);
      for (let k = 0; k < n; k++) {
        const p = k / n * TAU, ex = R * Math.cos(p), ey = r2 * Math.sin(p);
        const X = Math.round(cx + ex * ca - ey * sa), Y = Math.round(cy + ex * sa + ey * ca);
        if (((X + Y) & 1) === 0) pset(X, Y, o.orbita ?? PAL.ATOM[3]);
      }
      const p = TAU * (0.9 + i * 0.2) * vel * t + i * 2.1;
      const ex = R * Math.cos(p), ey = r2 * Math.sin(p);
      els.push([Math.round(cx + ex * ca - ey * sa), Math.round(cy + ex * sa + ey * ca), Math.sin(p) > 0]);
    });
    const dib = (front) => { for (const [X, Y, f] of els) if (f === front) { pset(X - 1, Y, PAL.ATOM[5]); pset(X + 1, Y, PAL.ATOM[5]); if (R > 7) { pset(X, Y - 1, PAL.ATOM[5]); pset(X, Y + 1, PAL.ATOM[5]); } pset(X, Y, PAL.ATOM[4]); } };
    dib(false);
    const nuc = ['.ab.', 'abba', 'baab', '.ba.'], bob = e > 0.45 ? 1 : 0;
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
      const ch = nuc[j][i]; if (ch === '.') continue;
      let c = ch === 'a' ? PAL.ATOM[0] : PAL.ATOM[1];
      if (i + j === 1) c = PAL.ATOM[2];
      if (j === 3 || i === 3) c = ch === 'a' ? PAL.ATOM[6] : PAL.ATOM[0];
      pset(Math.round(cx) - 2 + i, Math.round(cy) - 2 + j - bob, c);
    }
    dib(true);
  };
  // el compañero: flota con halo, late con la voz. Sitio fijo por defecto (abajo a la izquierda, sobre los subtítulos)
  const SITIO = [24, 128];
  const companero = (t, energia = 0, x = SITIO[0], y = SITIO[1]) => {
    y += Math.round(1.4 * Math.sin(TAU * t / 2.6));
    const r = 9.2 + 1.6 * energia;
    for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) {
      const g = 1 - Math.hypot(i, j) / r; if (g <= 0) continue;
      const X = x + i, Y = y + j;
      if (g * (1.1 + 0.5 * energia) > b4(X, Y) + 0.2) pset(X, Y, g > 0.75 ? PAL.GLOW[1] : PAL.GLOW[0]);
    }
    atomo(x, y, t, { r: 6.6, orbita: PAL.ATOM[7], energia });
  };

  // ── Caja de diálogo del estilo 17: marco de latón, retrato de Atom y contenido (iconos y números) ─────────────
  const marco = (x0, y0, x1, y1, fill0, fill1) => {
    const U = PAL.UI;
    rect(x0 + 1, y0, x1 - 1, y0, U[0]); rect(x0 + 1, y1, x1 - 1, y1, U[0]);
    rect(x0, y0 + 1, x0, y1 - 1, U[0]); rect(x1, y0 + 1, x1, y1 - 1, U[0]);
    rect(x0 + 2, y0 + 1, x1 - 2, y0 + 1, U[5]); rect(x0 + 1, y0 + 2, x0 + 1, y1 - 2, U[5]);
    rect(x0 + 2, y1 - 1, x1 - 2, y1 - 1, U[4]); rect(x1 - 1, y0 + 2, x1 - 1, y1 - 2, U[4]);
    pset(x0 + 1, y0 + 1, U[0]); pset(x1 - 1, y0 + 1, U[0]); pset(x0 + 1, y1 - 1, U[0]); pset(x1 - 1, y1 - 1, U[0]);
    rect(x0 + 2, y0 + 2, x1 - 2, y0 + 2, U[0]); rect(x0 + 2, y0 + 2, x0 + 2, y1 - 2, U[0]);
    rect(x0 + 2, y1 - 2, x1 - 2, y1 - 2, U[0]); rect(x1 - 2, y0 + 2, x1 - 2, y1 - 2, U[0]);
    for (let y = y0 + 3; y <= y1 - 3; y++) {
      const v = fill0 + (fill1 - fill0) * (y - y0 - 3) / Math.max(1, y1 - y0 - 6);
      for (let x = x0 + 3; x <= x1 - 3; x++) pset(x, y, tone(U, v, x, y));
    }
  };
  // caja(t, p, contenido): p ∈ [0,1] la abre (baja desde arriba con un barrido); contenido(x, y) dibuja dentro.
  // Sitio por defecto: arriba a la derecha, como en el estilo 17.
  const caja = (t, p, contenido, o = {}) => {
    if (p <= 0) return;
    const x0 = o.x0 ?? 196, x1 = o.x1 ?? 302, h = 28, y0 = o.y ?? 14;
    const ver = Math.round(lerp(4, h, sale(p)));
    const y1 = y0 + ver;
    marco(x0, y0, x1, y1, 2.6, 1.0);
    if (ver < h) return;
    const px0 = x0 + 4, py0 = y0 + 3;
    rect(px0, py0, px0 + 21, py0 + 21, PAL.UI[4]);
    rect(px0 + 1, py0 + 1, px0 + 20, py0 + 20, PAL.UI[0]);
    for (const [sx, sy] of [[3, 4], [16, 3], [18, 15], [5, 17], [11, 2]]) pset(px0 + sx, py0 + sy, PAL.UI[9]);
    atomo(px0 + 11, py0 + 11, t, { energia: o.energia ?? 0 });
    if (contenido) contenido(x0 + 30, y0 + 6, x1 - 4);
  };

  // ── Cartela de capítulo: el año (o un número, o un icono) en grande, con el brillo del título del estilo 17 ────
  const cartela = (t, texto, o = {}) => {
    const fondo = o.fondo;  // función que dibuja el fondo (si no, cielo nocturno liso)
    if (fondo) fondo(); else for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) B[y * W + x] = tone(PAL.SKY, 0.5 + 2.6 * (y / H), x, y);
    const base = 98;
    const brillo = t > 0.15 && t < 0.85 ? -14 + (t - 0.15) / 0.7 * 140 : null;
    const mk = mascara(texto, "32px 'Press Start 2P'", 32);
    const x0 = Math.round(W / 2 - mk.adv / 2), capTop = base - (mk.BL - mk.top), alto = mk.bot - mk.top;
    const ap = sale(clamp(t / 0.25, 0, 1));
    for (let j = 0; j < mk.h; j++) for (let i = 0; i < mk.w; i++) {
      const k = j * mk.w + i, X = x0 + i - 2, Y = base + j - mk.BL - Math.round((1 - ap) * 6);
      if (hash2(X, Y) > ap * 1.2) continue;
      if (mk.m[k]) {
        let c = tone(PAL.TITLE, clamp((Y - capTop) / alto, 0, 1) * 4.2, X, Y);
        if (brillo != null) { const dd = i - (j - mk.top) * 0.7 - brillo; if (dd > -2 && dd < 2) c = PAL.TITLE[0]; }
        pset(X, Y, c);
      } else if (mk.o[k]) pset(X, Y, PAL.INK);
      else if (mk.sh[k]) { pset(X, Y, PAL.SHADOW); pset(X + 1, Y + 1, PAL.SHADOW); }
    }
    if (o.icono) icono(o.icono, Math.round(W / 2 - 3), base + 10, PAL.UI[7]);
  };

  // ── Transiciones: fundido tramado entre dos lienzos (cada píxel es de uno o de otro) ────────────────────────────
  const fundido = (a, b, p, modo = 'bayer') => {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const u = modo === 'barrido' ? (x / W) * 0.7 + b4(x, y) * 0.3 : modo === 'iris' ? Math.hypot(x - W / 2, (y - H / 2) * 1.6) / 190 * 0.75 + b4(x, y) * 0.25 : b4(x, y) * 0.6 + hash2(x >> 1, y >> 1) * 0.4;
      PANT[y * W + x] = u < p ? b[y * W + x] : a[y * W + x];
    }
  };

  // secuencia(t, planos): planos = [[desde, dibuja(t), modo?], …]; entre plano y plano, fundido tramado de o.fundido s
  // (el plano anterior sigue animándose mientras se funde). Modos: 'bayer', 'barrido', 'iris'; 'corte' sin fundido.
  const bufA = new Uint32Array(W * H), bufB = new Uint32Array(W * H);
  const secuencia = (t, planos, o = {}) => {
    const fx = o.fundido ?? 0.35;
    let i = 0;
    for (let k = 0; k < planos.length; k++) if (t >= planos[k][0]) i = k;
    const [t0, f, modo] = planos[i];
    if (i > 0 && t - t0 < fx && modo !== 'corte') {
      usar(bufA); planos[i - 1][1](t); usar(bufB); f(t); usar(null);
      fundido(bufA, bufB, (t - t0) / fx, modo ?? o.modo ?? 'bayer');
    } else f(t);
    return i;
  };

  // ── Cielo nocturno: degradado, halo de la Luna, estrellas que titilan, nubes ────────────────────────────────────
  const estrellasCache = new Map();
  const cielo = (t, o = {}) => {
    const hor = o.hor ?? 121, luna = o.luna, sem = o.semilla ?? 1715, brillo = o.brillo ?? 0;
    const lx = luna ? luna[0] : -999, ly = luna ? luna[1] : -999, lr = luna ? luna[2] : 0;
    for (let y = 0; y < Math.min(H, hor); y++) for (let x = 0; x < W; x++) {
      let v = 6.6 * Math.pow((y + 0.5) / hor, 1.6) + 0.15 + brillo;
      if (luna) { const e = Math.max(0, Math.hypot(x + 0.5 - lx, y + 0.5 - ly) - lr); v += 2.4 * Math.exp(-e / 7) + 1.6 * Math.exp(-e / 30); }
      B[y * W + x] = tone(PAL.SKY, v, x, y);
    }
    const k = sem + '|' + hor;
    if (!estrellasCache.has(k)) {
      const rnd = mulberry32(sem), s = [];
      while (s.length < (o.n ?? 260)) {
        const q = rnd();
        s.push({ x: (rnd() * W) | 0, y: (rnd() * (hor - 6)) | 0, type: q < 0.7 ? 0 : q < 0.93 ? 1 : 2, tint: rnd() < 0.15 ? 1 : rnd() < 0.12 ? 2 : 0, k: 1 + Math.floor(rnd() * 3), ph: rnd() * TAU });
      }
      estrellasCache.set(k, s);
    }
    const dx = o.giro ? o.giro : 0;
    for (const s of estrellasCache.get(k)) {
      const sx = ((s.x + Math.round(dx)) % W + W) % W, sy = s.y;
      if (luna && Math.hypot(sx - lx, sy - ly) < lr + 6) continue;
      const tw = 0.5 + 0.5 * Math.sin(TAU * s.k * t / 5 + s.ph);
      const R = s.tint === 1 ? PAL.WARM : s.tint === 2 ? PAL.COOL : null;
      if (s.type === 0) { if (tw > 0.25) pset(sx, sy, PAL.STAR[tw > 0.75 ? 1 : 0]); }
      else if (s.type === 1) pset(sx, sy, R ? R[tw > 0.5 ? 2 : 1] : PAL.STAR[tw > 0.6 ? 3 : 2]);
      else {
        pset(sx, sy, R ? R[2] : PAL.STAR[4]);
        if (tw > 0.4) { const g = R ? R[0] : PAL.STAR[1]; pset(sx - 1, sy, g); pset(sx + 1, sy, g); pset(sx, sy - 1, g); pset(sx, sy + 1, g); }
      }
    }
    if (luna) lunaLlena(lx, ly, lr, o.fase ?? 1);
    if (o.nubes) nubes(t, o.nubes === true ? {} : o.nubes, luna);
  };
  const lunaTex = new Map();
  const lunaLlena = (LX, LY, LR, fase = 1) => {
    if (!lunaTex.has(LR)) {
      const N = LR * 2 + 2, tx = new Float32Array(N * N);
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
        const u = (i - LR - 1) / LR, w = (j - LR - 1) / LR;
        tx[j * N + i] = 0.9 * smooth(0.55, 0.8, vnoise(u * 2.6 + 4, w * 2.6 + 1)) + 0.4 * (vnoise(u * 9, w * 9 + 7) - 0.5);
      }
      lunaTex.set(LR, tx);
    }
    const tx = lunaTex.get(LR), N = LR * 2 + 2;
    for (let y = LY - LR; y <= LY + LR; y++) for (let x = LX - LR; x <= LX + LR; x++) {
      const dx = x + 0.5 - LX, dy = y + 0.5 - LY, r = Math.hypot(dx, dy);
      if (r > LR - 0.15) continue;
      const m = tx[(y - LY + LR + 1) * N + (x - LX + LR + 1)];
      const u = dx / LR, q = Math.sqrt(Math.max(0, 1 - (dy / LR) ** 2));
      const lit = fase >= 1 || (u > (1 - 2 * fase) * q);
      let v = lit ? 3.6 - 1.3 * m - 0.9 * Math.pow(r / LR, 3) + 0.4 * (-dx - dy) / LR : -1;
      if (lit && r > LR - 1.1) v = Math.min(v, 2.4);
      pset(x, y, lit ? tone(PAL.MOON, v, x, y) : tone(PAL.EARTH, 1.2 - 0.9 * m, x, y));
    }
  };
  const nubes = (t, o = {}, luna) => {
    const y0 = o.y0 ?? 18, y1 = o.y1 ?? 100, vel = o.vel ?? 7, dens = o.densidad ?? 0;
    const bandas = o.bandas ?? [[34, 10, 1], [80, 8, 0.8]];
    for (let y = y0; y < y1; y++) for (let x = 0; x < W; x++) {
      const X = (x + t * vel) / 46, Y = y / 9;
      const d = 0.65 * vnoise(X, Y) + 0.35 * vnoise(X * 2.3 + 9, Y * 2.1);
      let banda = 0; for (const [c, s, f] of bandas) banda += f * Math.exp(-(((y - c) / s) ** 2));
      const v = d * banda + dens;
      if (v > 0.52 + 0.12 * b4(x, y)) {
        const borde = luna ? 0.4 * Math.exp(-Math.max(0, Math.hypot(x - luna[0], y - luna[1]) - luna[2]) / 26) : 0;
        B[y * W + x] = v > 0.62 ? (borde > 0.15 ? PAL.MIST[1] : PAL.MIST[0]) : (borde > 0.2 ? PAL.MIST[0] : PAL.FARC[2]);
      }
    }
  };
  // niebla a ras de agua (bandas tramadas que se mueven)
  const niebla = (t, y0, y1, fuerza = 1, vel = 5) => {
    for (let y = y0; y < y1; y++) for (let x = 0; x < W; x++) {
      const d = 0.7 * vnoise((x + t * vel) / 30, y / 5) + 0.3 * vnoise((x - t * vel * 0.6) / 11, y / 3 + 7);
      const f = d * fuerza * Math.sin(Math.PI * (y - y0) / (y1 - y0));
      if (f > 0.35 + 0.3 * b4(x, y)) B[y * W + x] = f > 0.62 ? PAL.MIST[1] : PAL.MIST[0];
    }
  };

  // ── Mar nocturno con estela de la Luna (el lago del estilo 17, con olas) ───────────────────────────────────────
  const ola = (x, y, t) => Math.sin(x * 0.11 + y * 0.9 - t * 2.4) * Math.sin(x * 0.037 - y * 0.4 + t * 1.3);
  const mar = (t, o = {}) => {
    const hor = o.hor ?? 121, lx = o.luzX ?? -999, oleaje = o.oleaje ?? 1, y1 = o.y1 ?? H;
    for (let y = hor; y < y1; y++) {
      const dy = y - hor, rs = Math.floor(hash2(y, 41) * 5);
      for (let x = 0; x < W; x++) {
        let v = 2.2 + dy * 0.035 + (lx > -900 ? 1.6 * Math.exp(-(((x - lx) / 26) ** 2)) * Math.exp(-dy / 40) : 0) + (o.brillo ?? 0);
        const w = ola(x * (o.escala ?? 1), dy / (o.escala ?? 1), t * oleaje);
        if (w > 0.6) v += 1.4; else if (w < -0.55) v -= 0.9;
        let l = Math.floor(v);
        if (v - l > hash2((x + rs) >> 2, y * 3 + 11)) l++;
        B[y * W + x] = PAL.WATER[clamp(l, 0, PAL.WATER.length - 1)];
      }
      if (lx < -900) continue;
      const L = Math.round(4 + dy * 0.5), slot = Math.floor(t * 5 + hash2(y, 3) * 7);
      if ((dy & 1) || hash2(slot, y) > 0.55) {
        const x0 = Math.round(lx - L / 2 + (hash2(slot * 7, y) - 0.5) * (3 + dy * 0.2));
        for (let i = 0; i < L; i++) {
          if (hash2(x0 + i + slot * 3, y) < 0.25) continue;
          const r = Math.abs(i + 0.5 - L / 2) / (L / 2);
          pset(x0 + i, y, r < 0.3 ? PAL.MOON[3] : r < 0.7 ? PAL.MOON[2] : PAL.WATER[6]);
        }
      }
    }
    for (let x = 0; x < W; x++) if (b2(x, hor) > 0.3) pset(x, hor, PAL.WATER[4]);
  };

  // ── Barcos (sprites procedurales). Tipos: galeon, balandro, carabela, guerra, canoa ─────────────────────────────
  // barco(x, wl, t, o): x = centro, wl = línea de flotación; o.dir 1 mira a la derecha (proa a la derecha), −1 a la
  // izquierda; o.esc escala (1 ≈ 90 px de eslora en el galeón); o.bandera: 'pirata', 'ingles', 'espana', 'negra',
  // 'estandarte', null; o.farol; o.cabeceo (0–2); o.silueta: todo en sombra (para lo lejano o la niebla).
  const TIPOS = {
    galeon: { L: 42, popa: 22, alto: 9, castillo: 6, mastiles: [[-20, 46, 3], [8, 56, 4], [30, 30, 1]], velaAncho: 16 },
    guerra: { L: 46, popa: 24, alto: 11, castillo: 7, mastiles: [[-22, 50, 3], [6, 60, 4], [30, 36, 2]], velaAncho: 17, troneras: 2 },
    balandro: { L: 26, popa: 14, alto: 6, castillo: 2, mastiles: [[0, 42, 0]], velaAncho: 0, cangreja: true },
    carabela: { L: 24, popa: 10, alto: 7, castillo: 4, mastiles: [[-10, 28, 0], [6, 34, 0]], velaAncho: 0, latina: true },
    canoa: { L: 22, popa: 0, alto: 3, castillo: 0, mastiles: [[0, 26, 0]], velaAncho: 0, pinza: true, doble: true },
  };
  const barco = (x0, wl0, t, o = {}) => {
    const T = TIPOS[o.tipo ?? 'galeon'], s = o.esc ?? 1, dir = o.dir ?? 1, sil = o.silueta ?? 0;
    const fase = o.fase ?? 0;
    const bob = Math.round((o.bob ?? 1.6) * s * Math.sin(TAU * t / 2.5 + fase));
    const cab = (o.cabeceo ?? 1) * Math.sin(TAU * t / 2.5 + 0.9 + fase);
    const wl = Math.round(wl0) + bob, L = T.L * s;
    const X = (i) => Math.round(x0 + dir * i);
    const tilt = (i) => Math.round(cab * i / 40 * s);
    const HULL = PAL.HULL;
    const col = (c) => (sil ? (sil > 1 ? PAL.MIST[0] : HULL[1]) : c);
    // casco
    for (let ii = -Math.round(L) - 2; ii <= Math.round(L) + 2; ii++) {
      const i = ii, a = Math.abs(i) / L;
      if (a > 1.05) continue;
      let top = wl - Math.round(T.alto * s) - (i > (T.L - T.popa) * s ? Math.round(T.castillo * s) : 0) - (i < -(T.L - 8) * s ? Math.round(3 * s) : 0) + tilt(i);
      if (a > 0.95) top += Math.round((a - 0.95) * 40);
      const fondo = wl + Math.round(4 * s) - Math.round(4 * s * Math.pow(a, 2)) + tilt(i);
      for (let y = top; y <= fondo; y++) {
        let v = 2.2 + 0.06 * (-i * dir) / 4 - (y - top) * 0.1;
        if (y === top) v = 4.6;
        const franja = T.alto > 4 && (y === top + 3 || y === top + 4);
        if (franja) v += 0.9;
        let c = tone(HULL, v, X(i), y);
        if (franja && s >= 0.6) c = (ii + 400) % 9 < 3 ? PAL.INK : (o.franja ?? PAL.OBS[3]);
        if (T.troneras && y === top + 7 && s >= 0.6) c = (ii + 400) % 9 < 3 ? PAL.INK : (o.franja ?? PAL.OBS[3]);
        pset(X(i), y, col(c));
      }
      if (T.doble) { // segundo casco de la canoa, detrás
        for (let y = wl - 2 + tilt(i) - 3; y <= wl + tilt(i) - 2; y++) if (y >= wl - 5 + tilt(i)) pset(X(i) + 2, y - 2, col(HULL[2]));
      }
    }
    if (T.doble) for (const k of [-0.5, 0, 0.5]) linea(X(k * L), wl - 4 + tilt(k * L), X(k * L) + 3, wl - 7 + tilt(k * L), col(HULL[3]));
    // ventanas de popa y farol
    const fl = 0.5 + 0.5 * Math.sin(t * 23 + fase) * Math.sin(t * 7.3);
    if (!sil && T.popa && s >= 0.5) for (const [i, j] of [[T.L - 8, -11], [T.L - 4, -11], [T.L - 8, -8]]) {
      const y = wl + Math.round(j * s) + tilt(i * s);
      pset(X(i * s), y, PAL.FIRE[3]); pset(X(i * s) + dir, y, PAL.FIRE[fl > 0.4 ? 4 : 2]);
    }
    if (o.farol && T.popa) {
      const fx = X((T.L + 3) * s), fy = wl - Math.round((T.alto + T.castillo + 7) * s) + tilt(T.L * s);
      halo(fx, fy, 7.5 * Math.max(0.6, s) + fl, [PAL.FIRE[0], PAL.FIRE[1]]);
      pset(fx, fy, PAL.FIRE[4]); pset(fx, fy - 1, PAL.FIRE[3]); pset(fx, fy + 1, PAL.FIRE[2]);
    }
    // mástiles y velas
    for (const [mi0, alto0, nv] of T.mastiles) {
      const mi = mi0 * s, alto = alto0 * s;
      const base = wl - Math.round(T.alto * s) + tilt(mi);
      const lean = cab * 1.2;
      const xm = (y) => X(mi) + Math.round(lean * (base - y) / alto);
      const tope = Math.round(base - alto);
      for (let y = tope; y < base; y++) pset(xm(y), y, col(HULL[1]));
      const hinch = (1.5 + 0.8 * Math.sin(TAU * t / 1.7 + mi0 + fase)) * s;
      const vela = (xx, yy, q, p, borde) => {
        let v = 4.4 - 2.6 * q - 0.9 * p + 0.6 * Math.sin(Math.PI * p);
        if (borde) v -= 1.2;
        const c = o.velaNegra ? tone([PAL.INK, HULL[1], HULL[2], HULL[3]], v * 0.6, xx, yy) : tone(PAL.SAIL, v, xx, yy);
        pset(xx, yy, sil ? col(c) : c);
      };
      if (nv > 0) {
        const paso = Math.floor((alto - 10 * s) / nv);
        for (let k = 0; k < nv; k++) {
          const y0 = Math.round(tope + 4 * s + k * paso), hv = paso - Math.max(1, Math.round(2 * s));
          const ancho = Math.round((T.velaAncho - k * 3) * s * (nv === 1 ? 0.6 : 1));
          for (let i = -ancho - 1; i <= ancho + 1; i++) pset(xm(y0) + i, y0 - 1, col(HULL[2]));
          for (let j = 0; j < hv; j++) {
            const yy = y0 + j, p = j / hv, curva = Math.round(hinch * Math.sin(Math.PI * p)) * dir;
            for (let i = -ancho; i <= ancho; i++) {
              const q = dir > 0 ? (i + ancho) / (2 * ancho) : (ancho - i) / (2 * ancho);
              vela(xm(yy) + i + curva, yy, q, p, i === -ancho || i === ancho);
            }
          }
        }
      } else if (T.latina || T.cangreja) {
        // vela triangular (latina) o cangreja: hacia popa del mástil
        const hy = Math.round(alto * 0.85);
        for (let j = 0; j < hy; j++) {
          const yy = tope + 3 + j, p = j / hy;
          const w = Math.round((T.latina ? 4 + 14 * p : 3 + 16 * p) * s);
          const curva = Math.round(hinch * 0.6 * Math.sin(Math.PI * p));
          for (let i = 0; i <= w; i++) vela(xm(yy) - dir * (i + 1) + dir * curva, yy, i / Math.max(1, w), p, i === w);
        }
        if (T.cangreja) for (let i = 0; i < 14 * s; i++) pset(xm(tope + 4) + dir * Math.round(i * 1.1), tope + 4 - Math.round(i * 0.25) + Math.round(alto * 0.15), col(HULL[2])); // foque
      } else if (T.pinza) {
        // vela de pinza de cangrejo polinesia
        for (let j = 0; j < alto; j++) {
          const p = j / alto, yy = tope + j;
          const w = Math.round((2 + 10 * Math.sin(Math.PI * p * 0.95)) * s);
          for (let i = -w; i <= Math.round(w * 0.4); i++) vela(xm(yy) + i * dir - Math.round(p * 6 * s) * dir, yy, (i + w) / (1.4 * w + 1), p, i === -w);
        }
      }
      // jarcia punteada
      if (!sil && s >= 0.5) for (const ex of [-T.L - 2, T.L]) {
        const ax = xm(tope), ay = tope, bx = X(ex * s), by = wl - Math.round((T.alto + 3) * s) + tilt(ex * s);
        const n = Math.hypot(bx - ax, by - ay) | 0;
        for (let k = 0; k < n; k += 2) pset(Math.round(ax + (bx - ax) * k / n), Math.round(ay + (by - ay) * k / n), HULL[3]);
      }
      // bandera en el palo mayor (el más alto)
      if (o.bandera && alto0 === Math.max(...T.mastiles.map((m) => m[1]))) bandera(xm(tope), tope, t, o.bandera, -dir, s);
    }
    // espuma
    if (!sil && (o.espuma ?? true)) {
      for (let i = -Math.round(L) - 3; i <= Math.round(L) + 3; i++) {
        const h = hash2(i + Math.floor(t * 10) * 31, 5);
        if (h > 0.55) pset(X(i), wl + Math.round(4 * s) - Math.round(4 * s * Math.pow(Math.min(1, Math.abs(i) / L), 2)) + tilt(i) + 1, h > 0.85 ? PAL.STAR[4] : PAL.WATER[6]);
      }
      for (let k = 0; k < 7; k++) {
        const p = (t * 1.4 + k / 7) % 1;
        pset(X(L + 2 + p * 10 * s), wl - 2 - Math.round(4 * s * Math.sin(Math.PI * p)), p < 0.5 ? PAL.STAR[4] : PAL.STAR[2]);
      }
    }
    return { x: x0, wl, tope: wl - Math.round(60 * s) };
  };
  // bandera ondeando: hacia `lado` (−1 izquierda)
  const bandera = (bx, by, t, tipo, lado = -1, s = 1) => {
    const ancho = Math.max(5, Math.round(13 * s)), alto = Math.max(4, Math.round(8 * s));
    for (let i = 1; i <= ancho; i++) {
      const off = Math.round(1.2 * s * Math.sin(i * 0.7 - t * 9) * (i / ancho));
      for (let j = 0; j < alto; j++) {
        let c;
        const u = i / ancho, v = j / alto;
        if (tipo === 'pirata' || tipo === 'negra') c = j === 0 || i === ancho ? PAL.HULL[3] : PAL.INK;
        else if (tipo === 'ingles') c = (Math.abs(v - 0.5) < 0.18 || Math.abs(u - 0.4) < 0.14) ? PAL.OBS[2] : PAL.MOON[4];
        else if (tipo === 'espana') c = Math.abs(u - v) < 0.16 || Math.abs(u + v - 1) < 0.16 ? PAL.OBS[2] : PAL.MOON[3];  // aspa de Borgoña
        else if (tipo === 'estandarte') c = v < 0.5 ? (u < 0.5 ? PAL.OBS[2] : PAL.TITLE[2]) : (u < 0.5 ? PAL.TITLE[2] : PAL.OBS[2]);
        else c = PAL.MOON[3];
        pset(bx + lado * i, by + j + off, c);
      }
    }
    if (tipo === 'pirata' && s >= 0.7) {
      const cal = ['.###.', '#.#.#', '#####', '.#.#.', '#...#', '.#.#.'];
      const off = Math.round(1.2 * s * Math.sin(5 * 0.7 - t * 9) * (5 / ancho));
      for (let j = 0; j < 6; j++) for (let i = 0; i < 5; i++) if (cal[j][i] === '#') pset(bx + lado * (ancho - 9 + (lado < 0 ? 4 - i : i)) + (lado < 0 ? 0 : 0), by + 1 + j + off, j < 3 ? PAL.MOON[4] : PAL.MOON[3]);
    }
  };

  // ── Figuras: siluetas con luz de borde y acentos de color ──────────────────────────────────────────────────────
  // figura(x, suelo, h, o): x = centro, suelo = y de los pies, h = altura (px). o.sombrero: 'tricornio', 'corona',
  // 'gorro', 'pañuelo', 'turbante', 'calvo', 'pelo'; o.faja: color de acento (2 rojo); o.pose: 'pie', 'senala',
  // 'brazos' (arriba), 'rodilla', 'ofrece', 'sentado', 'mide' (sextante a la cara), 'pala', 'canta';
  // o.capa; o.pata (pata de palo); o.dir (−1 mira a la izquierda); o.anda (fase de paso).
  const figura = (cx, suelo, h, o = {}) => {
    const mw = Math.ceil(h * 1.4) + 8, mh = Math.ceil(h * 1.25) + 6, m = new Uint8Array(mw * mh);
    const ox = Math.round(mw / 2), oy = mh - 2;   // origen: pies
    const dir = o.dir ?? 1;
    const put = (x, y, v) => { x = Math.round(ox + x * dir); y = Math.round(oy + y); if (x >= 0 && x < mw && y >= 0 && y < mh) m[y * mw + x] = v; };
    const seg = (x0, y0, x1, y1, g, v) => {
      const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2));
      for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n; for (let a = -g / 2; a < g / 2; a += 0.5) for (let b = -g / 2; b < g / 2; b += 0.5) put(x + a, y + b, v); }
    };
    const rod = o.pose === 'rodilla', sent = o.pose === 'sentado';
    const H_ = h, cab = H_ * 0.13, hombro = -H_ * (rod ? 0.62 : 0.79), cadera = -H_ * (rod ? 0.34 : 0.47);
    const ancho = H_ * 0.14, g = Math.max(2, H_ * 0.12);
    // piernas
    const an = o.anda != null ? Math.sin(o.anda) * H_ * 0.12 : 0;
    if (rod) { seg(-ancho * 0.5, cadera, -H_ * 0.22, -H_ * 0.06, g, 1); seg(-H_ * 0.22, -H_ * 0.06, -H_ * 0.32, 0, g, 1); seg(ancho * 0.5, cadera, H_ * 0.12, 0, g, 1); }
    else if (sent) { seg(-ancho * 0.4, cadera, H_ * 0.18, cadera, g, 1); seg(H_ * 0.18, cadera, H_ * 0.18, 0, g, 1); }
    else {
      seg(-ancho * 0.45, cadera, -ancho * 0.45 + an, 0, g, 1);
      if (o.pata) { seg(ancho * 0.45, cadera, ancho * 0.45 - an * 0.6, cadera + H_ * 0.25, g, 1); seg(ancho * 0.45 - an * 0.6, cadera + H_ * 0.25, ancho * 0.45 - an, 0, 1, 5); }
      else seg(ancho * 0.45, cadera, ancho * 0.45 - an, 0, g, 1);
    }
    // tronco
    for (let y = hombro; y <= cadera; y += 0.5) { const w = lerp(ancho * 1.05, ancho * 0.85, (y - hombro) / (cadera - hombro)); for (let x = -w; x <= w; x += 0.5) put(x, y, 1); }
    if (o.capa) for (let y = hombro; y <= cadera + H_ * 0.25; y += 0.5) { const w = ancho * 1.3 + (y - hombro) * 0.25; put(-w, y, 1); put(-w + 0.5, y, 1); for (let x = -w; x < -ancho; x += 0.5) put(x, y, 1); }
    if (o.faja != null) for (let x = -ancho * 0.9; x <= ancho * 0.9; x += 0.5) { put(x, cadera - 1, 2); put(x, cadera - 0.2, 2); }
    if (o.delantal) for (let y = hombro + 2; y <= cadera + H_ * 0.15; y += 0.5) for (let x = -ancho * 0.7; x <= ancho * 0.7; x += 0.5) put(x, y, 6);
    // brazos
    const brazo = (lado, pose) => {
      const sx = lado * ancho * 0.95, sy = hombro + 1;
      let ex, ey, hx, hy;
      const L1 = H_ * 0.18, L2 = H_ * 0.2;
      switch (pose) {
        case 'senala': ex = sx + lado * L1 * 0.7; ey = sy + L1 * 0.3; hx = ex + lado * L2; hy = ey - L2 * 0.25; break;
        case 'arriba': ex = sx + lado * L1 * 0.3; ey = sy - L1 * 0.9; hx = ex + lado * L2 * 0.1; hy = ey - L2; break;
        case 'ofrece': ex = sx + lado * L1 * 0.5; ey = sy + L1 * 0.7; hx = ex + lado * L2 * 0.9; hy = ey - L2 * 0.2; break;
        case 'cara': ex = sx + lado * L1 * 0.6; ey = sy + L1 * 0.4; hx = sx + lado * L1 * 0.4; hy = hombro - cab * 0.6; break;
        case 'pala': ex = sx + lado * L1 * 0.5; ey = sy + L1 * 0.8; hx = ex + lado * L2 * 0.5; hy = ey + L2 * 0.6; break;
        default: ex = sx + lado * 1; ey = sy + L1; hx = ex + lado * 0.5; hy = ey + L2;
      }
      seg(sx, sy, ex, ey, g * 0.8, 1); seg(ex, ey, hx, hy, g * 0.75, 1);
      return [hx, hy];
    };
    const p = o.pose ?? 'pie';
    const manoD = brazo(1, p === 'senala' ? 'senala' : p === 'brazos' ? 'arriba' : p === 'ofrece' || p === 'rodilla' ? 'ofrece' : p === 'mide' ? 'cara' : p === 'pala' ? 'pala' : o.brazoD ?? 'abajo');
    const manoI = brazo(-1, p === 'brazos' ? 'arriba' : p === 'pala' ? 'pala' : o.brazoI ?? 'abajo');
    // cuello y cabeza
    seg(0, hombro, 0, hombro - cab * 0.5, g * 0.7, 1);
    const hy = hombro - cab * 1.25;
    for (let y = -cab; y <= cab; y += 0.5) for (let x = -cab * 0.85; x <= cab * 0.85; x += 0.5) if ((x / (cab * 0.85)) ** 2 + (y / cab) ** 2 <= 1) put(x + cab * 0.15, hy + y, 1);
    // sombreros
    const sb = o.sombrero;
    if (sb === 'tricornio') { for (let x = -cab * 1.9; x <= cab * 1.9; x += 0.5) { put(x, hy - cab * 0.7, 1); put(x, hy - cab * 0.9 + Math.abs(x) * 0.25, 1); } for (let y = hy - cab * 1.6; y < hy - cab * 0.7; y += 0.5) for (let x = -cab * 0.9; x <= cab * 0.9; x += 0.5) put(x, y, 1); }
    else if (sb === 'corona') { for (let x = -cab * 0.9; x <= cab * 0.9; x += 0.5) { put(x, hy - cab * 0.8, 4); put(x, hy - cab * 1.2, 4); } for (const x of [-cab * 0.8, 0, cab * 0.8]) { put(x, hy - cab * 1.6, 4); put(x, hy - cab * 1.9, 4); } }
    else if (sb === 'gorro') { for (let y = hy - cab * 1.6; y < hy - cab * 0.5; y += 0.5) for (let x = -cab * 0.95; x <= cab * 0.95 - (hy - cab * 0.5 - y) * 0.4; x += 0.5) put(x, y, 1); }
    else if (sb === 'pañuelo') { for (let y = hy - cab * 1.1; y < hy - cab * 0.4; y += 0.5) for (let x = -cab * 0.95; x <= cab * 0.95; x += 0.5) put(x, y, 2); put(-cab * 1.3, hy - cab * 0.5, 2); put(-cab * 1.6, hy - cab * 0.2, 3); }
    else if (sb === 'sombrero') { for (let x = -cab * 1.7; x <= cab * 1.7; x += 0.5) put(x, hy - cab * 0.8, 1); for (let y = hy - cab * 1.7; y < hy - cab * 0.8; y += 0.5) for (let x = -cab * 0.8; x <= cab * 0.8; x += 0.5) put(x, y, 1); }
    else if (sb === 'pelo') { for (let y = hy - cab * 1.05; y < hy + cab * 0.6; y += 0.5) { put(-cab * 0.95, y, 1); put(-cab * 1.1, y + 1, 1); } }
    else if (sb === 'moño') { for (let y = hy - cab * 1.7; y < hy - cab * 0.9; y += 0.5) for (let x = -cab * 0.5; x <= cab * 0.5; x += 0.5) put(x - cab * 0.2, y, 1); }
    // objetos en la mano
    if (o.objeto === 'libro') { for (let y = -3; y <= 1; y++) for (let x = 0; x <= 4; x++) put(manoD[0] + x - 1, manoD[1] + y, x === 0 ? 3 : 5); }
    if (o.objeto === 'sextante') { const [x, y] = manoD; for (let k = 0; k < 5; k++) { put(x + 1 + k * 0.6, y - 1 + k * 0.3, 4); put(x + 1, y - 1 + k * 0.5, 4); } }
    if (o.objeto === 'espada') { const [x, y] = manoD; for (let k = 0; k < H_ * 0.45; k += 0.5) put(x + k * 0.9, y - k * 0.45, 5); }
    if (o.objeto === 'pala') { const [x, y] = manoD; for (let k = 0; k < H_ * 0.3; k += 0.5) put(x + k * 0.1, y + k, 6); for (let k = -1.5; k <= 1.5; k += 0.5) for (let j = 0; j < 3; j++) put(x + H_ * 0.03 + k, y + H_ * 0.3 + j, 6); }
    if (o.objeto === 'pergamino') { const [x, y] = manoD; for (let k = 0; k < 6; k++) { put(x, y - k, 5); put(x + 1, y - k, 5); } }
    if (o.objeto === 'saco') { const [x, y] = manoD; for (let j = 0; j < 6; j++) for (let k = -3; k <= 3; k++) if (k * k + (j - 3) * (j - 3) < 12) put(x + k, y + j, 4); }
    if (o.objeto === 'bolsa') { const [x, y] = manoD; for (let j = 0; j < 4; j++) for (let k = -2; k <= 2; k++) if (k * k + (j - 2) * (j - 2) < 6) put(x + k, y + j, 4); }
    silueta(m, mw, mh, Math.round(cx - ox), Math.round(suelo - oy), { luz: o.luz ?? -1, cuerpo: o.cuerpo, borde: o.borde });
    return { manoD: [cx + (manoD[0]) * dir, suelo + manoD[1]], cabeza: [cx, suelo + hy] };
  };

  // ── Pergamino (la mesa del cartógrafo), costas, cuadrícula y la X ──────────────────────────────────────────────
  // pergamino(x0, y0, x1, y1, o): papel a la luz de una vela (luz desde o.luz = [x, y]), bordes oscuros y rotos
  const pergamino = (x0, y0, x1, y1, o = {}) => {
    const [lx, ly] = o.luz ?? [x0 + (x1 - x0) * 0.3, y0 - 20];
    const sem = o.semilla ?? 3;
    for (let y = Math.max(0, y0 - 2); y <= Math.min(H - 1, y1 + 2); y++) for (let x = Math.max(0, x0 - 2); x <= Math.min(W - 1, x1 + 2); x++) {
      const borde = Math.min(x - x0, x1 - x, y - y0, y1 - y) + 2.2 * (vnoise(x * 0.4 + sem, y * 0.4) - 0.5) * 2;
      if (borde < 0) continue;
      const d = Math.hypot(x - lx, y - ly) / Math.max(x1 - x0, y1 - y0);
      let v = 4.6 - 1.8 * d + 0.7 * (vnoise(x * 0.15 + sem, y * 0.15) - 0.5) + 0.35 * (vnoise(x * 0.7, y * 0.7 + sem) - 0.5);
      if (borde < 2.5) v -= (2.5 - borde) * 0.9;
      B[y * W + x] = tone(PAL.PERG, v, x, y);
    }
  };
  // proyecta (lon, lat) en un rectángulo del pergamino
  const proyector = (x0, y0, x1, y1, lon0 = -180, lon1 = 180, lat0 = -60, lat1 = 80) =>
    (lon, lat) => [x0 + (lon - lon0) / (lon1 - lon0) * (x1 - x0), y0 + (lat1 - lat) / (lat1 - lat0) * (y1 - y0)];
  // costa: tierra en tono de pergamino más oscuro y contorno de tinta; o.p = avance del trazo (0–1)
  const costa = (pts, o = {}) => {
    const p = o.p ?? 1;
    if (p >= 1 && o.relleno !== false) poligono(pts, (x, y) => tone(PAL.PERG, (o.tierra ?? 2.6) + 0.5 * (vnoise(x * 0.3, y * 0.3) - 0.5), x, y));
    const n = pts.length, hasta = p * n;
    for (let i = 0; i < Math.floor(hasta); i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % n];
      linea(ax, ay, bx, by, o.tinta ?? PAL.TINTA);
    }
    if (p < 1 && Math.floor(hasta) < n) {
      const i = Math.floor(hasta), f = hasta - i, [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % n];
      linea(ax, ay, ax + (bx - ax) * f, ay + (by - ay) * f, o.tinta ?? PAL.TINTA);
    }
  };
  const mundo = (proj, o = {}) => {
    for (const [k, pts] of Object.entries(CONTINENTES)) {
      if (o.solo && !o.solo.includes(k)) continue;
      if (o.sin && o.sin.includes(k)) continue;
      costa(pts.map(([a, b]) => proj(a, b)), o);
    }
  };
  // la X roja del mapa (tamaño r); clavada = con un aro
  const equis = (x, y, r = 3, c = PAL.ROJO) => {
    x = Math.round(x); y = Math.round(y);
    for (let k = -r; k <= r; k++) { pset(x + k, y + k, c); pset(x + k, y - k, c); pset(x + k + 1, y + k, c); pset(x + k + 1, y - k, c); }
  };
  // rosa de los vientos
  const rosa = (cx, cy, r, c = PAL.TINTA, acento = PAL.ROJO) => {
    for (let k = 0; k < 16; k++) {
      const a = k / 16 * TAU, L = k % 4 === 0 ? r : k % 2 === 0 ? r * 0.6 : r * 0.4;
      linea(cx, cy, cx + Math.cos(a) * L, cy + Math.sin(a) * L, k === 12 ? acento : c);
    }
    anillo(cx + 0.5, cy + 0.5, r * 0.35, c);
  };
  // EL ANCLA DEL EPISODIO: el mapa de la X. Mesa, pergamino con el mundo y su cuadrícula; la latitud (línea firme) y la
  // longitud (punteada, tiembla según o.tiembla 0–1); la X en el cruce, que baila con la longitud; o.clavada (0–1) la
  // fija con un aro. o.lat / o.lon: dónde está el barco; o.lineas: [latitud, longitud] visibles (0–1, avance del trazo).
  const ancla = (t, o = {}) => {
    const x0 = o.x0 ?? 40, y0 = o.y0 ?? 16, x1 = o.x1 ?? 284, y1 = o.y1 ?? 146;
    mesa(t, { luz: [x0 + 10, y0] });
    pergamino(x0, y0, x1, y1, { luz: [x0 + 10, y0], semilla: 11 });
    const pj = proyector(x0 + 10, y0 + 8, x1 - 10, y1 - 8);
    recorte([x0 + 3, y0 + 3, x1 - 3, y1 - 3]);
    if (o.mundo !== false) mundo(pj, { tierra: 2.4 });
    recorte(null);
    const [gx0, gy0] = pj(-180, 80), [gx1, gy1] = pj(180, -60);
    if (o.cuadricula !== false) {
      for (let k = -150; k < 180; k += 30) { const [x] = pj(k, 0); linea(x, gy0, x, gy1, PAL.PERG[1], 3); }
      for (let k = -40; k <= 60; k += 20) { const [, y] = pj(0, k); linea(gx0, y, gx1, y, PAL.PERG[1], 3); }
    }
    const lat = o.lat ?? 25, lon0 = o.lon ?? -45, tb = o.tiembla ?? 1, cl = o.clavada ?? 0;
    const lon = lon0 + tb * (14 * Math.sin(t * 2.3) + 9 * Math.sin(t * 5.1 + 1));
    const [lx, ly] = pj(lon, lat);
    const [la, lo] = o.lineas ?? [1, 1];
    if (la > 0) { const xe = gx0 + (gx1 - gx0) * la; linea(gx0, ly, xe, ly, PAL.ROJO); linea(gx0, ly + 1, xe, ly + 1, PAL.OBS[3]); }
    if (lo > 0) {
      const ye = gy0 + (gy1 - gy0) * lo;
      const sac = tb * (cl < 1 ? 1 : 0);
      for (let y = Math.round(gy0); y <= ye; y++) {
        const dx = Math.round(sac * 1.5 * Math.sin(y * 0.5 + t * 20));
        if (cl >= 1 || (y + Math.floor(t * 8)) % 4 < 2) { pset(lx + dx, y, PAL.ROJO); if (cl >= 1) pset(lx + 1, y, PAL.OBS[3]); }
      }
    }
    if (o.x !== false && la > 0 && lo > 0) { equis(lx, ly, 3); if (cl > 0) anillo(lx + 0.5, ly + 0.5, 6 - 2 * cl, PAL.ROJO); }
    return { pj, lx, ly };
  };
  // la mesa de madera bajo el pergamino, a la luz de una vela
  const mesa = (t, o = {}) => {
    const [lx, ly] = o.luz ?? [60, 40];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const veta = 0.5 * Math.sin(y * 0.9 + 3 * vnoise(x * 0.02, y * 0.15)) + 0.4 * (vnoise(x * 0.05, y * 0.6) - 0.5);
      const d = Math.hypot(x - lx, (y - ly) * 1.2) / 220;
      B[y * W + x] = tone(PAL.HULL, 3.3 - 3.2 * d + veta, x, y);
    }
  };
  // vela encendida con su halo; devuelve su luz
  const vela = (x, y, t, o = {}) => {
    const fl = 0.5 + 0.5 * Math.sin(t * 17 + x) * Math.sin(t * 5.3 + y);
    if (o.halo !== false) halo(x, y - 4, (o.r ?? 18) + fl * 2, [PAL.HULL[3], PAL.FIRE[0], PAL.FIRE[1]], 0.9);
    rect(x - 1, y, x + 1, y + (o.alto ?? 6), PAL.MOON[3]); pset(x + 1, y + 1, PAL.MOON[1]); pset(x + 1, y + 3, PAL.MOON[1]);
    pset(x, y - 1, PAL.FIRE[3]); pset(x, y - 2, PAL.FIRE[fl > 0.5 ? 4 : 3]); pset(x, y - 3, PAL.FIRE[2]); if (fl > 0.6) pset(x + (fl > 0.8 ? 1 : 0), y - 4, PAL.FIRE[1]);
    pset(x - 1, y - 1, PAL.FIRE[1]); pset(x + 1, y - 1, PAL.FIRE[1]);
  };
  // interior de piedra o madera a la luz de las velas (fondo)
  const interior = (t, o = {}) => {
    const luces = o.luces ?? [[160, 60]], tipo = o.tipo ?? 'piedra';
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let l = 0; for (const [lx, ly] of luces) l = Math.max(l, 1 - Math.hypot(x - lx, (y - ly) * 1.15) / (o.radio ?? 150));
      let tex;
      if (tipo === 'piedra') { const fila = Math.floor(y / 9), bx = Math.floor((x + (fila & 1) * 9) / 18); tex = ((y % 9 === 0) || ((x + (fila & 1) * 9) % 18 === 0) ? -0.9 : 0) + 0.5 * (hash2(bx, fila) - 0.5); }
      else tex = (x % 14 === 0 ? -0.9 : 0) + 0.3 * Math.sin(y * 0.8 + vnoise(x * 0.1, y * 0.05) * 4);
      B[y * W + x] = tone(PAL.HULL, 0.5 + 3.4 * l * l + tex * l, x, y);
    }
    if (o.suelo != null) for (let y = o.suelo; y < H; y++) for (let x = 0; x < W; x++) {
      let l = 0; for (const [lx, ly] of luces) l = Math.max(l, 1 - Math.hypot(x - lx, (y - ly) * 1.6) / (o.radio ?? 150));
      B[y * W + x] = tone(PAL.HULL, 0.3 + 2.6 * l + (((x + y * 3) % 23 === 0) ? -0.6 : 0), x, y);
    }
  };

  // ── Objetos que se repiten ─────────────────────────────────────────────────────────────────────────────────────
  // cofre (lleno de oro o plata), abierto o cerrado
  const cofre = (x, suelo, t, o = {}) => {
    const w = o.w ?? 22, h = Math.round(w * 0.55), abierto = o.abierto ?? true, metal = o.metal === 'plata' ? PAL.PLATA : PAL.ORO;
    const x0 = Math.round(x - w / 2), y0 = suelo - h;
    for (let y = y0; y <= suelo; y++) for (let xx = x0; xx <= x0 + w; xx++) {
      let v = 3.2 - (xx - x0) / w * 1.6 - (y - y0) / h * 0.8;
      let c = tone(PAL.HULL, v + 1, xx, y);
      if (y === y0 || y === suelo || xx === x0 || xx === x0 + w || (xx - x0) === Math.round(w / 2)) c = PAL.ORO[1];
      pset(xx, y, c);
    }
    if (abierto) {
      for (let k = 0; k < 7; k++) for (let xx = x0 + 1; xx < x0 + w; xx++) {
        const yy = y0 - 1 - Math.round(2.2 * Math.sin(Math.PI * (xx - x0) / w) * 1.8) + k * 0;
        if (k === 0) for (let j = yy; j <= y0; j++) pset(xx, j, tone(metal, 3.2 + 1.5 * (hash2(xx, j) - 0.5) - (xx - x0) / w, xx, j));
      }
      const tp = o.tapa ?? 1;
      for (let xx = x0; xx <= x0 + w; xx++) for (let j = 0; j < Math.round(h * 0.7 * tp); j++) pset(xx, y0 - 3 - j - Math.round(h * 0.15), tone(PAL.HULL, 2.4 - j * 0.1, xx, j));
      // destellos
      for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k * 0.37) % 1; if (ph < 0.25) { const sx = x0 + 3 + Math.floor(hash2(k, Math.floor(t * 0.8)) * (w - 6)), sy = y0 - 3; pset(sx, sy, PAL.STAR[4]); pset(sx - 1, sy, metal[3]); pset(sx + 1, sy, metal[3]); pset(sx, sy - 1, metal[3]); } }
    } else {
      for (let xx = x0; xx <= x0 + w; xx++) for (let j = 0; j < Math.round(h * 0.45); j++) pset(xx, y0 - 1 - j, tone(PAL.HULL, 3 - (xx - x0) / w - j * 0.15, xx, j));
      rect(Math.round(x) - 1, y0 - 2, Math.round(x) + 1, y0 + 2, PAL.ORO[4]);
    }
  };
  // libro de cartas abierto (con costas dibujadas)
  const libro = (cx, cy, w, t, o = {}) => {
    const h = Math.round(w * 0.62), x0 = Math.round(cx - w / 2), y0 = Math.round(cy - h / 2);
    rect(x0 - 2, y0 - 1, x0 + w + 2, y0 + h + 3, PAL.HULL[2]);
    pergamino(x0, y0, Math.round(cx) - 1, y0 + h, { luz: o.luz, semilla: 5 });
    pergamino(Math.round(cx) + 1, y0, x0 + w, y0 + h, { luz: o.luz, semilla: 9 });
    linea(cx, y0, cx, y0 + h, PAL.HULL[3]);
    const p = o.p ?? 1, rnd = mulberry32(o.semilla ?? 21);
    for (const lado of [0, 1]) {
      const ax = lado ? Math.round(cx) + 3 : x0 + 3, aw = Math.round(w / 2) - 6;
      // costa irregular
      const pts = [], ah = h - 6, izq = lado === 0;
      for (let k = 0; k <= 12; k++) {
        const f = 0.2 + 0.32 * vnoise(k * 0.9 + lado * 9, 3) + 0.08 * Math.sin(k * 2.3);
        pts.push([izq ? ax + aw * f : ax + aw * (1 - f), y0 + 3 + k / 12 * ah]);
      }
      pts.push(izq ? [ax, y0 + 3 + ah] : [ax + aw, y0 + 3 + ah], izq ? [ax, y0 + 3] : [ax + aw, y0 + 3]);
      costa(pts, { p: clamp(p * 1.3 - lado * 0.3, 0, 1), tierra: 2.4 });
      // sondas (puntitos) y rocas (cruces)
      for (let k = 0; k < 12; k++) { const sx = izq ? ax + aw * (0.6 + rnd() * 0.35) : ax + aw * (0.05 + rnd() * 0.35), sy = y0 + 4 + rnd() * (h - 8); if (p > 0.5 + k * 0.05) pset(sx, sy, PAL.TINTA); }
      for (let k = 0; k < 3; k++) { const sx = Math.round(izq ? ax + aw * (0.55 + rnd() * 0.2) : ax + aw * (0.3 + rnd() * 0.2)), sy = Math.round(y0 + 6 + rnd() * (h - 12)); if (p > 0.7) { pset(sx, sy, PAL.ROJO); pset(sx - 1, sy, PAL.ROJO); pset(sx + 1, sy, PAL.ROJO); pset(sx, sy - 1, PAL.ROJO); pset(sx, sy + 1, PAL.ROJO); } }
      if (p > 0.9) rosa(izq ? ax + aw - 7 : ax + 7, y0 + h - 9, 4);
    }
  };
  // reloj de esfera (cara) con agujas; o.parado
  const esfera = (cx, cy, r, t, o = {}) => {
    disco(cx, cy, r + 1, PAL.ORO[1]);
    disco(cx, cy, r, (x, y, d) => tone(PAL.MOON, 4 - d * 1.6, x, y));
    for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; pset(Math.round(cx + Math.cos(a) * (r - 1.5) - 0.5), Math.round(cy + Math.sin(a) * (r - 1.5) - 0.5), PAL.TINTA); }
    const hm = o.hora ?? (t * (o.vel ?? 1) / 60), hh = hm / 12;
    linea(cx, cy, cx + Math.sin(hh * TAU) * r * 0.5, cy - Math.cos(hh * TAU) * r * 0.5, PAL.INK);
    linea(cx, cy, cx + Math.sin(hm * TAU) * r * 0.8, cy - Math.cos(hm * TAU) * r * 0.8, PAL.ROJO);
    pset(Math.round(cx), Math.round(cy), PAL.ORO[4]);
  };
  // teléfono con el mapa y el punto azul
  const telefono = (cx, cy, h, t, o = {}) => {
    const w = Math.round(h * 0.5), x0 = Math.round(cx - w / 2), y0 = Math.round(cy - h / 2);
    rect(x0, y0, x0 + w, y0 + h, PAL.INK);
    rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + h - 1, PAL.FGC[3]);
    const sx0 = x0 + 2, sy0 = y0 + 4, sx1 = x0 + w - 2, sy1 = y0 + h - 4;
    for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) {
      const tierra = vnoise((x - sx0) * 0.18 + (o.semilla ?? 2), (y - sy0) * 0.18) > 0.55;
      B[y * W + x] = tierra ? tone(PAL.EARTH, 2.6 + (hash2(x, y) - 0.5), x, y) : tone(PAL.WATER, 3.6, x, y);
    }
    const px = Math.round(cx + (o.dx ?? 0)), py = Math.round(cy + (o.dy ?? 0)), lat = 0.5 + 0.5 * Math.sin(t * 4);
    halo(px, py, 4 + lat * 2, [PAL.COOL[0], PAL.COOL[1]], 1);
    disco(px + 0.5, py + 0.5, 1.6, PAL.COOL[2]); pset(px, py, hex('#ffffff'));
    rect(Math.round(cx) - 2, y0 + 2, Math.round(cx) + 2, y0 + 2, PAL.FGC[1]);
  };
  // globo terráqueo pixelado que gira (giro en grados)
  const globo = (cx, cy, r, giro, o = {}) => {
    const proj = (lon, lat) => [lon, lat];
    // máscara de tierra por punto (lon, lat): dentro de algún continente
    const dentro = (lon, lat) => {
      for (const pts of Object.values(CONTINENTES)) {
        let c = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
          const [xi, yi] = pts[i], [xj, yj] = pts[j];
          if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c;
        }
        if (c) return true;
      }
      return false;
    };
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
      const u = (x + 0.5 - cx) / r, v = (y + 0.5 - cy) / r, d2 = u * u + v * v;
      if (d2 > 1) continue;
      const z = Math.sqrt(1 - d2), lat = Math.asin(-v) * 180 / Math.PI;
      let lon = Math.atan2(u, z) * 180 / Math.PI + giro; lon = ((lon + 180) % 360 + 360) % 360 - 180;
      const luz = clamp(0.35 + 0.65 * (-u * 0.5 - v * 0.4 + z * 0.75), 0, 1);
      const tierra = dentro(lon, lat);
      const pergaminoG = o.pergamino;
      let c;
      if (pergaminoG) c = tierra ? tone(PAL.PERG, 1.2 + 2.2 * luz, x, y) : tone(PAL.PERG, 2.2 + 2.6 * luz, x, y);
      else c = tierra ? tone(PAL.EARTH, 0.5 + 3 * luz, x, y) : tone(PAL.WATER, 1.5 + 4.5 * luz, x, y);
      const tol = 0.8 * 180 / (Math.PI * r) / Math.max(z, 0.25);
      if (o.meridianos && ((((lon % 30) + 30) % 30) < tol || Math.abs(lat % 30) < tol * 0.8)) c = o.pergamino ? PAL.TINTA : PAL.FARC[3];
      pset(x, y, c);
    }
    anillo(cx, cy, r + 0.5, o.pergamino ? PAL.TINTA : PAL.FARC[2]);
  };

  // ── Presentación (la del estilo 17: escalado entero sin suavizado) ──────────────────────────────────────────────
  let vista = null, medio = null, mctx = null;
  const ajustar = () => {
    const dpr = captura ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth, vh = window.innerHeight;
    const cw = Math.max(1, Math.round(vw * dpr)), ch = Math.max(1, Math.round(vh * dpr));
    lienzo.width = cw; lienzo.height = ch;
    lienzo.style.width = vw + 'px'; lienzo.style.height = vh + 'px';
    const s = Math.min(cw / W, ch / H);
    const w = Math.round(W * s), h = Math.round(H * s);
    vista = { s, w, h, x: Math.floor((cw - w) / 2), y: Math.floor((ch - h) / 2), cw, ch };
    const k = Math.ceil(s - 1e-6);
    if (Math.abs(s - Math.round(s)) < 1e-6 || s < 1) medio = null;
    else { medio = document.createElement('canvas'); medio.width = W * k; medio.height = H * k; mctx = medio.getContext('2d'); }
  };
  ajustar();
  if (!captura) window.addEventListener('resize', ajustar);
  const presentar = () => {
    bctx.putImageData(imagen, 0, 0);
    ctx.fillStyle = '#04050d';
    ctx.fillRect(0, 0, vista.cw, vista.ch);
    if (!medio) { ctx.imageSmoothingEnabled = false; ctx.drawImage(bajo, 0, 0, W, H, vista.x, vista.y, vista.w, vista.h); }
    else {
      mctx.imageSmoothingEnabled = false; mctx.drawImage(bajo, 0, 0, medio.width, medio.height);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(medio, 0, 0, medio.width, medio.height, vista.x, vista.y, vista.w, vista.h);
    }
  };

  return {
    W, H, TAU, PAL, captura, get buf() { return B; }, PANT, nuevo, usar, pset, pget, rect, llenar, copiar, linea, poligono, disco, anillo, halo,
    recorte, dentro, sprite, silueta, mascara, numero, icono, ICONOS, atomo, companero, SITIO, marco, caja, cartela, fundido, secuencia,
    cielo, lunaLlena, nubes, niebla, mar, barco, bandera, figura, pergamino, proyector, costa, mundo, equis, rosa,
    mesa, ancla, vela, interior, cofre, libro, esfera, telefono, globo, presentar,
    tone, tone4, b2, b4, hash2, vnoise, clamp, smooth, easeIO, sale, lerp, tramo, mulberry32, hex,
  };
}
