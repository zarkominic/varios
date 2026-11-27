E = {}

# Lo común a las tres escenas del grupo 6 (se antepone a cada cuerpo): el reparto, el búfer de las capas fijas, las texturas
# y las piezas pequeñas que se pintan en la escena (el auricular, los cascos, el magnetófono de bobinas, el dodo con
# corbata, el sobre, los bocadillos con pictogramas, la lluvia, las nubes, la gente diminuta del fondo).
COMUN = r'''
import { ELENCO_NC as NC } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_NC;
const K0 = hex('#1a1420'), BL = hex('#ffffff');
const rp = (...a) => a.map((s) => hex(s));
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c, d, a) => { const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, r2 = d & 255, g2 = (d >>> 8) & 255, b2 = (d >>> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(g + (g2 - g) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
const luz = (cx, cy, r, col, a) => { for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) { const g = 1 - Math.hypot(x - cx, y - cy) / r; if (g > 0) R.pset(x, y, mez(R.pget(x, y), col, a * g * g)); } };
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / Math.max(1e-6, a1 - a0)));
const sm = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en un búfer y en cada fotograma se copia (sin R.usar() a secas)
const capa = (k, f) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const p = R.usar(b); f(); R.usar(p); CAPAS.set(k, b); } R.copiar(b); };
const llena = (x0, y0, x1, y1, ramp, f) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone(ramp, f(x, y), x, y)); };
// rect que respeta R.recorte (R.rect no lo respeta)
const rc = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };
const caja = (x0, y0, x1, y1, c, borde = K0) => { R.rect(x0, y0, x1, y1, borde); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// tablas horizontales con veta, juntas y algún nudo
const tablas = (x0, y0, x1, y1, ramp, alto = 6, k = 0, l = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto === alto - 1;
  for (let x = x0; x <= x1; x++) { const largo = 40 + Math.floor(hh(fila, 3, k) * 40), jx = (x + Math.floor(hh(fila, 7, k) * 60)) % largo === 0;
    if (jy || jx) { R.pset(x, y, ramp[0]); continue; }
    const veta = Math.sin(x * 0.11 + fila * 2.7 + Math.sin(x * 0.03 + fila) * 2 + ((y - y0) % alto) * 0.8) * 0.45;
    const nudo = Math.hypot(((x * 7 + fila * 31) % 97) - 48, (((y - y0) % alto) - alto / 2) * 3) < 3 ? -0.9 : 0;
    R.pset(x, y, R.tone(ramp, 1.6 + veta + nudo + (hh(fila, 1, k) - 0.5) * 0.6 + l, x, y)); } } };
// tablas verticales (paredes de garaje, frisos)
const tablasV = (x0, y0, x1, y1, ramp, ancho = 8, k = 0) => { for (let x = x0; x <= x1; x++) { const col = Math.floor((x - x0) / ancho), jx = (x - x0) % ancho === 0;
  for (let y = y0; y <= y1; y++) { if (jx) { R.pset(x, y, ramp[0]); continue; } const veta = Math.sin(y * 0.13 + col * 2.1 + Math.sin(y * 0.04 + col) * 2 + ((x - x0) % ancho) * 0.9) * 0.4;
    R.pset(x, y, R.tone(ramp, 1.5 + veta + (hh(col, 2, k) - 0.5) * 0.7 + ((x - x0) % ancho === 1 ? 0.5 : 0), x, y)); } } };
// papel pintado de damasco (rombos con flor) en tres tonos
const damasco = (x0, y0, x1, y1, ramp, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = ((x + 8) % 16) - 8, v = ((y + Math.floor(x / 16) * 8) % 16) - 8, d = Math.abs(u) + Math.abs(v);
  const flor = d === 6 || (d < 3 && (u + v) % 2 === 0); R.pset(x, y, R.tone(ramp, 1.2 + (flor ? 0.9 : 0) + (hh(x, y, k) - 0.5) * 0.35, x, y)); } };
// nube de tres tonos (sombra abajo, luz arriba); ok(x, y) recorta
const nube = (cx, cy, w, T3, ok = null) => { const bs = [[0, -w * 0.13, w * 0.24], [-w * 0.27, 0, w * 0.19], [w * 0.27, 0, w * 0.2], [-w * 0.06, 0.02 * w, w * 0.26]];
  const x0 = Math.floor(cx - w * 0.5), x1 = Math.ceil(cx + w * 0.5), y0 = Math.floor(cy - w * 0.4), y1 = Math.ceil(cy + w * 0.12);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let d = 9; for (const [dx, dy, r] of bs) { const q = Math.hypot(x + 0.5 - cx - dx, (y + 0.5 - cy - dy) * 1.35) / r; if (q < d) d = q; }
    if (d > 1 || (ok && !ok(x, y))) continue; R.pset(x, y, R.tone(T3, 2.7 - (y - y0) / Math.max(1, y1 - y0) * 2.4 - (d > 0.82 ? 0.5 : 0), x, y)); } };
// pájaros que cruzan aleteando (ok recorta)
const pajaros = (t, y, c, n = 3, v = 14, x1 = 260, x0 = 0, ok = null) => { for (let k = 0; k < n; k++) { const x = Math.round(x0 + ((t * v + k * 23 + k * k * 9) % (x1 - x0 + 20)) - 10), yy = Math.round(y + k * 5 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k * 2) > 0;
  if (x < x0 || x > x1) continue; for (const [dx, dy] of [[0, 0], [-1, a ? -1 : 0], [1, a ? -1 : 0], [-2, a ? -2 : 1], [2, a ? -2 : 1]]) if (!ok || ok(x + dx, yy + dy)) R.pset(x + dx, yy + dy, c); } };
// lluvia en un hueco (recortada a él)
const lluvia = (t, x0, y0, x1, y1, n, col, v = 120, k = 0) => { for (let i = 0; i < n; i++) { const x = Math.round(x0 + hh(i, 1, k) * (x1 - x0) - ((t * v * 0.25) % 6)), y = Math.round(y0 + ((hh(i, 2, k) * (y1 - y0) + t * v) % (y1 - y0)));
  for (let j = 0; j < 3; j++) { const xx = x - Math.floor(j / 2), yy = y + j; if (xx >= x0 && xx <= x1 && yy >= y0 && yy <= y1) R.pset(xx, yy, col); } } };
// gente diminuta del fondo (5 × 11): ropa, pelo; anda alterna las piernas
const mini = (x, y, ropa, pelo, t, anda = false, k = 0) => { x = Math.round(x); y = Math.round(y); const piel = hex('#e8b088'), f = anda ? Math.floor(t * 6 + k) % 2 : 0;
  R.rect(x + 1, y - 11, x + 3, y - 9, piel); R.rect(x + 1, y - 12, x + 3, y - 11, pelo); R.rect(x, y - 8, x + 4, y - 4, ropa); R.pset(x + 2, y - 8, mez(ropa, 0xffffffff, 0.3));
  R.rect(x + 1, y - 3, x + 1, y - f, hex('#2a2a3a')); R.rect(x + 3, y - 3, x + 3, y - (1 - f), hex('#2a2a3a')); };
// el auricular de un teléfono de los ochenta en la mano (x, y), girado hacia la oreja si oreja
const auricular = (x, y, col = hex('#d8ccb0'), oreja = false) => { x = Math.round(x); y = Math.round(y);
  if (oreja) { R.rect(x - 1, y - 7, x + 1, y + 1, K0); R.rect(x, y - 6, x, y, col); R.rect(x - 2, y - 8, x + 1, y - 6, K0); R.rect(x - 2, y, x + 1, y + 2, K0); R.pset(x - 1, y - 7, col); R.pset(x - 1, y + 1, col); return; }
  R.rect(x - 4, y - 1, x + 4, y + 1, K0); R.rect(x - 3, y, x + 3, y, col); R.rect(x - 5, y - 2, x - 3, y + 2, K0); R.rect(x + 3, y - 2, x + 5, y + 2, K0); R.pset(x - 4, y, col); R.pset(x + 4, y, col); };
// el cordón rizado del teléfono entre dos puntos
const cordon = (x0, y0, x1, y1, col = hex('#8a8070')) => { const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0))); for (let i = 0; i <= n; i++) { const u = i / n; R.pset(Math.round(x0 + (x1 - x0) * u + Math.sin(i * 1.7) * 1.2), Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * 6 + Math.cos(i * 1.7)), col); } };
// los cascos sobre la cabeza de un actor (a = lo que devuelve R.actor; dir del actor)
const cascos = (a, dir = 1) => { const [cx, yH] = a.cabeza, c = hex('#2a2a32'), m = hex('#5a5a66');
  for (let i = -7; i <= 7; i++) { const yy = yH - 1 + Math.round((i * i) / 14); R.pset(cx + i, yy, c); if (Math.abs(i) < 6) R.pset(cx + i, yy - 1, m); }
  for (const s of [-1, 1]) { const x = cx + s * 7; R.rect(x - 1, yH + 4, x + 1, yH + 8, c); R.pset(x, yH + 5, m); } };
// el magnetófono de bobinas (ancho 40·s): (x, y) arriba a la izquierda; on: las bobinas giran; nivel 0–1 mueve las agujas
const magneto = (x, y, s, t, on, nivel = 0.5) => { const W = 40 * s, H = 26 * s, gr = rp('#5a5e6a', '#9aa0aa', '#c8ccd4', '#e8eaee');
  R.rect(x, y, x + W, y + H, K0); for (let j = 1; j < H; j++) for (let i = 1; i < W; i++) R.pset(x + i, y + j, R.tone(gr, 2.2 - j / H * 1.2 + (i < 3 ? 0.8 : 0), x + i, y + j));
  R.rect(x + 1, y + H - 3 * s, x + W - 1, y + H - 1, hex('#3a3e48'));
  const r = 9 * s, ys = y + 10 * s;
  for (const [k, cx] of [[0, x + 10 * s], [1, x + 30 * s]]) { R.disco(cx, ys, r + 1, K0); R.disco(cx, ys, r, hex('#c8ccd4')); R.disco(cx, ys, Math.round(r * (k ? 0.55 : 0.8)), hex('#4a3a2a')); R.disco(cx, ys, Math.round(r * 0.32), hex('#e8eaee')); R.disco(cx, ys, Math.max(1, Math.round(r * 0.12)), K0);
    const a0 = (on ? t * (k ? 5 : 3.5) : 0.3) + k; for (let q = 0; q < 3; q++) { const a = a0 + q * 2.094; for (let d = Math.round(r * 0.36); d < r - 1; d++) R.pset(Math.round(cx + Math.cos(a) * d), Math.round(ys + Math.sin(a) * d), hex('#9aa0aa')); }
    R.pset(cx - Math.round(r * 0.5), ys - Math.round(r * 0.6), BL); }
  // la cinta entre las bobinas por los cabezales
  R.linea(x + 10 * s, ys + Math.round(r * 0.8) - 1, x + 18 * s, y + 21 * s, hex('#3a2a1a')); R.linea(x + 30 * s, ys + Math.round(r * 0.55) - 1, x + 22 * s, y + 21 * s, hex('#3a2a1a'));
  R.rect(x + 17 * s, y + 20 * s, x + 23 * s, y + 22 * s, hex('#c8a040'));
  // los vúmetros con su aguja y el piloto
  for (const [k, vx] of [[0, x + 3 * s], [1, x + W - 11 * s]]) { R.rect(vx, y + 20 * s, vx + 8 * s, y + 24 * s, K0); R.rect(vx + 1, y + 20 * s + 1, vx + 8 * s - 1, y + 24 * s - 1, hex('#f0dc90'));
    const nv = on ? Math.max(0, Math.min(1, nivel + Math.sin(t * 13 + k * 2) * 0.25 + Math.sin(t * 31 + k) * 0.15)) : 0, a = -2.5 + nv * 1.6, px = vx + 4 * s, py = y + 24 * s - 1;
    R.linea(px, py, Math.round(px + Math.cos(a) * 3.5 * s), Math.round(py + Math.sin(a) * 3.5 * s), hex('#c82020')); }
  R.disco(x + W / 2, y + 3 * s, Math.max(1, s), on ? hex('#ff4a3a') : hex('#6a2a2a'));
  for (let i = 0; i < 4; i++) R.rect(x + 12 * s + i * 4 * s, y + H - 2 * s, x + 14 * s + i * 4 * s, y + H - s, i === 1 && on ? hex('#6aff8a') : hex('#c8ccd4')); };
// el dodo de pictograma (16 × 16 · s) con la corbata del «jefe»; (x, y) arriba a la izquierda
const DODO = ['.....kkkk.......', '....kGGGGk......', '...kGGwkGGk.....', '...kGGGGGGkkkk..', '...kGGGGGkYYYYk.', '....kGGGkYYYYYYk', '....kGGGkkYYYkk.', '...kGGGGGkkkk...', '..kGGGGGGGGk....', '.kGGGGgGGGGGk...', 'kWkGGGggGGGGGk..', 'kWWkGGGGgGGGGk..', '.kkkGGGGGGGGk...', '....kGGGGGGk....', '.....kOk.kOk....', '....kOOkkOOk....'];
const dodo = (x, y, s = 1, corbata = true, col = null) => { const P = { k: K0, G: hex('#8a8e9a'), g: hex('#5e6270'), w: BL, Y: hex('#e8c040'), W: hex('#f2eee2'), O: hex('#e8a040') };
  for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) { let ch = DODO[j][i]; if (ch === '.') continue; if (corbata && ((j === 8 && i === 6) || (j >= 9 && j <= 11 && (i === 6 || (j === 10 && i === 7))))) ch = 'R';
    const c = col ?? (ch === 'R' ? hex('#c83030') : P[ch]); R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); } };
// el sobre (w × h) visto de frente con el dodo de destinatario, el sello y el matasellos; dorso: la solapa
const sobre = (x, y, w, h, dorso = false, sello = 0) => { x = Math.round(x); y = Math.round(y); caja(x, y, x + w, y + h, hex('#f2ead6'));
  R.rect(x + 1, y + h - 2, x + w - 1, y + h - 1, hex('#d8ccb0'));
  if (dorso) { R.linea(x + 1, y + 1, x + w / 2, y + h * 0.55, hex('#b8ac90')); R.linea(x + w - 1, y + 1, x + w / 2, y + h * 0.55, hex('#b8ac90')); R.disco(x + w / 2, y + h * 0.55, 2, hex('#a83030')); return; }
  if (w < 26) { R.rect(x + 2, y + h - 5, x + 4, y + h - 3, hex('#8a8e9a')); R.pset(x + 5, y + h - 5, hex('#e8c040')); R.rect(x + w - 4, y + 1, x + w - 2, y + 3, hex('#3a6ad8')); return; }
  const s = Math.max(1, Math.floor(Math.min(w / 22, h / 18))); dodo(x + Math.round(w * 0.12), y + Math.round(h - 16 * s) - 2, s);
  R.rect(x + w - 10, y + 3, x + w - 3, y + 11, hex('#3a6ad8')); R.rect(x + w - 9, y + 4, x + w - 4, y + 10, hex('#7aa0e8')); R.pset(x + w - 7, y + 6, hex('#f0c040'));
  for (let i = 0; i < 3; i++) R.linea(x + w - 26, y + 5 + i * 3, x + w - 13, y + 5 + i * 3, hex('#6a6a74'));
  if (sello > 0) { const r = 5; R.disco(x + w - 20, y + 9, r, mez(hex('#f2ead6'), hex('#c83030'), 0.85 * Math.min(1, sello))); R.disco(x + w - 20, y + 9, r - 2, hex('#f2ead6')); R.icono('X', x + w - 22, y + 7, hex('#c83030'), hex('#f2ead6')); } };
// bocadillo de diálogo grande (w × h) con el pico hacia (px, py)
const globo = (x, y, w, h, px, py) => { const c = hex('#f6f4ee'), s = hex('#c8c4d0'); x = Math.round(x); y = Math.round(y);
  const bx = Math.max(x + 4, Math.min(x + w - 8, px)); R.poligono([[bx, y + h - 2], [bx + 7, y + h - 2], [px, py]], K0); R.poligono([[bx + 1, y + h - 3], [bx + 6, y + h - 3], [px + (px > bx ? -1 : 1), py - 2]], c);
  for (let j = 0; j <= h; j++) for (let i = 0; i <= w; i++) { const cx = Math.min(Math.max(i, 3), w - 3), cy = Math.min(Math.max(j, 3), h - 3), d = Math.hypot(i - cx, j - cy); if (d > 3.4) continue; R.pset(x + i, y + j, d > 2.5 ? K0 : j > h - 3 ? s : c); } };
// corazón (r) entero o roto (abre 0–1: se separan las mitades)
const corazon = (cx, cy, r, col, abre = 0) => { const sep = Math.round(abre * 3);
  for (let j = -r; j <= r; j++) for (let i = -r - 1; i <= r + 1; i++) { const X = i / r, Y = -j / r, q = (X * X + Y * Y - 1) ** 3 - X * X * Y * Y * Y; if (q > 0) continue;
    const lado = i < Math.round(Math.sin(j * 1.3) * 1.5) ? -1 : 1; if (abre > 0 && Math.abs(i - Math.round(Math.sin(j * 1.3) * 1.5)) < 1) continue; R.pset(cx + i + lado * sep, cy + j + (abre > 0 ? Math.abs(lado * sep) * (lado < 0 ? 1 : 0) : 0), (i < -r * 0.3 && j < -r * 0.2) ? mez(col, BL, 0.4) : col); } };
// la botella recta en una mano (s) y su versión que se desvanece (a 0–1 de lo que queda)
const botellaMano = (x, y, s = 0.5, a = 1, k = 0) => { if (a <= 0) return; if (a >= 1) { PZ.botella(R, x, y, { color: 'marron', s }); return; }
  const g = []; for (let j = -26; j <= 2; j++) for (let i = -8; i <= 8; i++) g.push(R.pget(x + i, y + j));
  PZ.botella(R, x, y, { color: 'marron', s });
  let n = 0; for (let j = -26; j <= 2; j++) for (let i = -8; i <= 8; i++) { const c = g[n++]; if (hh(x + i, y + j, k) > a) R.pset(x + i, y + j, c); } };
// un tubo fluorescente del techo (w de largo)
const fluo = (x, y, w, on = 1) => { R.rect(x - 1, y - 1, x + w + 1, y + 3, hex('#5a5a66')); R.rect(x, y, x + w, y + 2, on ? hex('#f6fbff') : hex('#9aa0aa')); if (on) R.rect(x, y + 3, x + w, y + 3, hex('#c8d8e8')); };
// el reloj de pared redondo que anda
const reloj = (cx, cy, r, t, k = 0) => { R.disco(cx, cy, r + 1, K0); R.disco(cx, cy, r, hex('#c8a040')); R.disco(cx, cy, r - 2, hex('#f6f2e4'));
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; R.pset(Math.round(cx + Math.cos(a) * (r - 3)), Math.round(cy + Math.sin(a) * (r - 3)), hex('#3a3440')); }
  const am = (t + k) * 0.6 - Math.PI / 2, ah = (t + k) * 0.05 + 1; R.linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 3)), Math.round(cy + Math.sin(am) * (r - 3)), K0); R.linea(cx, cy, Math.round(cx + Math.cos(ah) * (r - 5)), Math.round(cy + Math.sin(ah) * (r - 5)), K0); R.pset(cx, cy, hex('#c83030')); };
// libros de una balda (x0–x1, de pie sobre y)
const libros = (x0, x1, y, k = 0, alto = 14) => { let x = x0; const cols = rp('#7a2a2a', '#2a4a7a', '#3a6a3a', '#a8843a', '#5a3a6a', '#8a5a3a', '#2a5a5a', '#c8b88a');
  while (x < x1 - 2) { const w = 2 + Math.floor(hh(x, k) * 3), h = alto - Math.floor(hh(x, 3, k) * 5), c = cols[Math.floor(hh(x, 5, k) * 8)], tumba = hh(x, 9, k) > 0.93;
    if (tumba && x + h < x1) { R.rect(x, y - w, x + h, y - 1, c); R.rect(x, y - w, x + h, y - w, mez(c, BL, 0.3)); x += h + 1; continue; }
    R.rect(x, y - h, x + w - 1, y - 1, c); R.rect(x, y - h, x, y - 1, mez(c, BL, 0.25)); R.rect(x + w - 1, y - h, x + w - 1, y - 1, mez(c, K0, 0.35)); if (h > 9) R.rect(x, y - h + 3, x + w - 1, y - h + 3, hex('#e8c860')); x += w; } };
// la lata nueva (banda gris) y la de siempre (lisa)
const lataN = (x, y, s = 1, o = {}) => PZ.lata(R, x, y, { color: 'rojo', franja: true, s, ...o });
const lataV = (x, y, s = 1, o = {}) => PZ.lata(R, x, y, { color: 'rojo', s, ...o });
// una lata pequeña girada (pictograma), para pancartas y octavillas
const lataPicto = (x, y, s, tacha = true) => { R.rect(x, y, x + 5 * s, y + 8 * s, K0); R.rect(x + s, y + s, x + 4 * s, y + 7 * s, hex('#c8382e')); R.rect(x + s, y + 3 * s, x + 4 * s, y + 4 * s, hex('#9a9aa4'));
  if (tacha) for (let i = -s; i <= 6 * s; i++) { R.rect(x + i, y + 8 * s - Math.round(i * 1.4), x + i + s - 1, y + 8 * s - Math.round(i * 1.4) + s - 1, hex('#1a1a20')); } };
'''

# ───────────────────────────────────────── NC-QUEJAS ─────────────────────────────────────────
E['nc-quejas'] = ('Las quejas', r'''// NC-QUEJAS (frase 16, «The complaints came in like a storm…»), sin cartela; barra en 1985. Tres planos:
// 1. «The complaints came in like a storm. The company received more than 40,000 calls»: la centralita (rebelion
//    'centralita', 2.º uso; gag 5): la operadora de la izquierda descuelga en «complaints»; en «storm» cae un rayo tras
//    las persianas y los teléfonos saltan de la mesa; el cuarto teléfono sale volando y lo atrapa el jefe de turno de
//    la derecha, que se lo queda sonando en las manos; el contador sube a 40000 entre «received» y «000» y la operadora
//    de la derecha lo señala.
// 2. Corta en «and letters»: la mesa de las cartas (rebelion 'centralita'/'cartas', 1.er uso): el cartero entra con el
//    saco y lo vuelca en «letters» (las cartas vuelan al montón); en «had to put more people on the phones» entran dos
//    operadoras nuevas con su teléfono y se ponen a contestar; en «Many of them weren't talking about the taste» la
//    del centro lee una carta y le sale un bocadillo con la lengua tachada.
// 3. Corta en «They were talking»: el recuerdo (fondo local: muelle de un lago en verano, a la hora dorada): el abuelo
//    pesca; en «childhood» llega corriendo el niño; en «grandfather» el abuelo le da una botella de la nevera y brindan;
//    en «something of theirs» el recuerdo se destiñe a gris y en «taken away» las botellas se desvanecen de las manos
//    (el niño, triste, con un «?»).
''', COMUN + r'''
const QJ = (f) => en('quejas', f);
const Q2 = QJ(.2951), Q3 = QJ(.6622);

// ── 1 · la centralita (gag 5) ──
const p1 = (t) => {
  const rayo = QJ(.0696), salta = Math.min(lin(t, rayo + 0.05, rayo + 0.6), 1 - 0.7 * lin(t, rayo + 2.4, rayo + 3.2));
  const o = { encuadre: 'centralita', llamadas: Math.round(lerp(400, 40000, sm(lin(t, QJ(.1495), QJ(.2419) + 0.3)))), saltan: salta, sacos: 6 };
  T.rebelion(R, t, o);
  // el rayo detrás de las persianas (dos destellos), recortado a cada ventana
  const fl = (t > rayo && t < rayo + 0.14) ? 1 : (t > rayo + 0.32 && t < rayo + 0.42) ? 0.7 : 0;
  if (fl > 0) { for (const [x0, x1] of [[196, 235], [238, 277]]) for (let y = 27; y <= 72; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), hex('#eef4ff'), 0.6 * fl));
    R.recorte([238, 27, 277, 72]); let x = 262, y = 27; for (let k = 0; k < 6; k++) { const nx = x + (k % 2 ? 5 : -6), ny = y + 8; R.linea(x, y, nx, ny, BL); R.linea(x + 1, y, nx + 1, ny, hex('#c8dcff')); x = nx; y = ny; } R.recorte(null); }
  // la operadora de la izquierda descuelga en «complaints» y habla sin parar; en el rayo da un respingo
  const desc = QJ(.0038), susto = t > rayo && t < rayo + 0.9;
  { const x = 52, a = R.actor(NC.operadora, x, 150, t, { dir: 1, sostiene: t > desc ? [x + 12, 129] : undefined, sorpresa: susto, habla: !susto && t > desc + 0.3 && Math.sin(t * 9) > 0 });
    if (t > desc) { auricular(a.mano[0], a.mano[1] - 2, hex('#d8ccb0'), true); cordon(a.mano[0], a.mano[1] + 1, 44, 148); }
    if (t > desc + 0.4 && t < rayo) R.bocadillo(x + 7, 115, { icono: '!' }); }
  // la operadora de la derecha anota; en «000» mira el contador y lo señala
  const mira = t > QJ(.2419) - 0.2;
  R.actor(NC.operadora, 152, 150, t, { dir: mira ? -1 : 1, pal: { H: '#d8b060', h: '#f0cc80', C: '#4a8a6a', c: '#3a6a52' }, dedo: mira, sorpresa: mira && t < QJ(.2419) + 0.8, sonrisa: false, sostiene: mira ? undefined : [168, 140 + (Math.floor(t * 7) % 2)] });
  // el jefe de turno a la derecha, entre los sacos: el cuarto teléfono le cae en las manos
  const vuela0 = rayo + 0.35, vuela1 = rayo + 1.15, coge = t > vuela1;
  const xj = 270, a = R.actor(NC.presentador, xj, 160, t, { dir: -1, pal: { C: '#6a6e7a', c: '#4e525e', o: '#3a5a8a' }, sostiene: coge ? [xj - 4, 140] : t > vuela0 ? [xj - 2, 136] : undefined, sorpresa: t > vuela0 && t < vuela1 + 1.2, sonrisa: t > vuela1 + 1.2, dedo: !coge && t < vuela0 });
  T.rebelionDelante(R, t, o);
  // el cuarto teléfono: suena en la punta de la mesa, salta en «storm» y vuela a las manos del jefe
  if (!coge) { const q = lin(t, vuela0, vuela1), x = lerp(226, a.mano[0], q), y = lerp(152, a.mano[1] + 6, q) - Math.sin(q * Math.PI) * 38; PZ.telefono(R, Math.round(x), Math.round(y), { suena: true, t, color: '#c8b890' }); }
  else PZ.telefono(R, a.mano[0], a.mano[1] + 6, { suena: true, t, color: '#c8b890' });
};

// ── 2 · la mesa de las cartas ──
const p2 = (t) => {
  const o = { encuadre: 'centralita', camara: 'cartas' };
  T.rebelion(R, t, o);
  // el cartero entra por la derecha con el saco al hombro y lo vuelca en «letters»
  const vuelca = QJ(.3115), w = lin(t, Q2, vuelca - 0.1), xc = Math.round(lerp(330, 236, sm(w))), vete = lin(t, vuelca + 1.0, vuelca + 2.6), xc2 = Math.round(xc + vete * 110);
  { const a = R.actor(EL.cartero ?? NC.voluntario, xc2, 100, t, { dir: vete > 0 ? 1 : -1, anda: (w > 0 && w < 1) || (vete > 0 && vete < 1), sostiene: t < vuelca + 0.6 ? [xc2 - 2, t > vuelca ? 76 : 84] : undefined, sonrisa: vete > 0 });
    if (t < vuelca + 0.6) PZ.sacoCartas(R, a.mano[0] - 4, a.mano[1] + (t > vuelca ? 6 : 14), { cartas: true }); }
  // las operadoras nuevas: entran por la izquierda en «had to put more people» y contestan
  const nuevas = [[NC.operadora, 70, { H: '#2a1c14', h: '#4a3424', C: '#c8a040', c: '#a08030' }, QJ(.3609)], [NC.operadora, 170, { H: '#a8643a', h: '#c8844a', C: '#6a7ac8', c: '#4a5aa8' }, QJ(.3812)]];
  for (const [def, xf, pal, t0] of nuevas) { const q = lin(t, t0, t0 + 1.1), x = Math.round(lerp(-20, xf, sm(q))), habla = q >= 1 && t > QJ(.4483);
    const a = R.actor(def, x, 100, t, { dir: 1, anda: q > 0 && q < 1, pal, sostiene: habla ? [x + 12, 79] : undefined, habla: habla && Math.sin(t * 8 + x) > 0 });
    if (habla) { auricular(a.mano[0], a.mano[1] - 2, hex('#d8ccb0'), true); cordon(a.mano[0], a.mano[1] + 1, x + 16, 96); } }
  // la del centro abre cartas; en «weren't talking about the taste», la lengua tachada
  const lee = QJ(.5116), xl = 118;
  { const abre = Math.floor(t * 1.6) % 2 === 0;
    const a = R.actor(NC.cientifica, xl, 100, t, { dir: 1, pal: { C: '#8a5a7a', c: '#6a4060' }, tocado: '', sostiene: t > lee ? [xl + 14, 80] : [xl + 14, abre ? 86 : 90], sorpresa: t > QJ(.5521) && t < QJ(.5521) + 0.7, triste: t > QJ(.6179) });
    if (t > lee) { caja(a.mano[0] - 2, a.mano[1] - 10, a.mano[0] + 9, a.mano[1] + 3, hex('#f2ead6')); for (let i = 0; i < 4; i++) R.linea(a.mano[0], a.mano[1] - 7 + i * 3, a.mano[0] + 7, a.mano[1] - 7 + i * 3, hex('#8a8478')); }
    else sobre(a.mano[0] - 2, a.mano[1] - 4, 11, 7, true); }
  const r = T.rebelionDelante(R, t, o);
  // las cartas que vuelan del saco al montón
  if (t > vuelca && t < vuelca + 1.0) { const [px, py] = r.pila ?? [133, 140]; for (let k = 0; k < 9; k++) { const q = lin(t, vuelca + k * 0.05, vuelca + 0.45 + k * 0.05); if (q <= 0 || q >= 1) continue;
    const x = lerp(232, px - 20 + k * 6, q), y = lerp(82, py - 6 + (k % 3) * 3, q) - Math.sin(q * Math.PI) * 26; sobre(x, y, 9, 6, k % 2 === 0); } }
  // el bocadillo: la lengua tachada (no hablaban del sabor)
  const b0 = QJ(.5521);
  if (t > b0 && t < Q3) { const sube = Math.round(sm(lin(t, b0, b0 + 0.25)) * 4), gx = 134, gy = 20 - sube + 4;
    globo(gx - 6, gy - 2, 58, 40, xl + 10, 72);
    // la boca abierta con la lengua fuera (el sabor)
    for (let j = 0; j < 14; j++) for (let i = 0; i < 34; i++) { const X = (i - 16.5) / 17, Y = (j - 4) / 10; if (X * X + Y * Y > 1 || j < 0) continue; R.pset(gx + 5 + i, gy + 6 + j, (X * X + Y * Y > 0.8) ? hex('#7a1a2a') : j < 3 ? BL : hex('#3a0a14')); }
    for (let j = 0; j < 18; j++) for (let i = 0; i < 18; i++) { const X = (i - 8.5) / 9, Y = (j - 6) / 12; if (X * X + Y * Y > 1 || j < 4) continue; R.pset(gx + 13 + i, gy + 10 + j, (X * X + Y * Y > 0.82) ? hex('#a8304a') : i === 9 && j < 15 ? hex('#c84a6a') : (i < 6 && j < 12) ? hex('#ffb0c0') : hex('#f07a94')); }
    if (t > QJ(.6179) - 0.1) for (let i = 0; i < 30; i++) { const a = Math.round(i * 0.95); R.rect(gx + 6 + i, gy + 2 + a, gx + 8 + i, gy + 4 + a, hex('#d82a2a')); R.rect(gx + 6 + i, gy + 32 - a, gx + 8 + i, gy + 34 - a, hex('#d82a2a')); } }
};

// ── 3 · el recuerdo: el muelle del lago ──
const AGUA = rp('#3a5a7a', '#4a7090', '#5a86a6', '#7aa2ba', '#e8b878');
const fondoMuelle = () => {
  // el cielo de la hora dorada, tramado
  llena(0, 0, 319, 74, rp('#6a8ac0', '#8aa0c8', '#c8a8b0', '#f0b890', '#f8d0a0'), (x, y) => y / 74 * 4.2 + (hh(x, y, 1) - 0.5) * 0.3);
  // el sol bajo con su halo
  luz(206, 66, 34, hex('#fff0c0'), 0.7); R.disco(206, 66, 9, hex('#fff2c8')); R.disco(206, 66, 7, hex('#fffae8'));
  // las colinas de la otra orilla con pinos
  for (let x = 0; x <= 319; x++) { const h1 = 58 + Math.round(Math.sin(x * 0.02) * 5 + Math.sin(x * 0.07) * 2), h2 = 64 + Math.round(Math.sin(x * 0.03 + 2) * 4);
    for (let y = h1; y <= 76; y++) R.pset(x, y, R.tone(rp('#5a5a8a', '#6a6a9a', '#7a7aa6'), 1.6 - (y - h1) / 18 + (hh(x, y) - 0.5) * 0.3, x, y));
    for (let y = h2; y <= 76; y++) R.pset(x, y, R.tone(rp('#3a4a5a', '#4a5a6a', '#5a6a72'), 1.2 + (hh(x, y, 2) - 0.5) * 0.5, x, y)); }
  for (let k = 0; k < 40; k++) { const x = Math.round(hh(k, 1) * 320), b = 66 + Math.round(Math.sin(x * 0.03 + 2) * 4), h = 6 + Math.floor(hh(k, 2) * 7); if (x > 190 && x < 222) continue;
    for (let j = 0; j < h; j++) { const w = Math.floor(j / 2.5); R.rect(x - w, b - h + j, x + w, b - h + j, hex(j % 3 === 2 ? '#2a3a3a' : '#33463e')); } }
  // la cabaña de la otra orilla con su embarcadero
  R.rect(56, 60, 72, 68, K0); R.rect(57, 61, 71, 67, hex('#8a5a3a')); R.poligono([[54, 61], [64, 54], [74, 61]], hex('#a83a2a')); R.rect(62, 64, 64, 67, hex('#f0c060')); R.rect(66, 57, 67, 60, hex('#5a4a3a'));
  // el lago: ondas, el reflejo del cielo y la columna de sol
  for (let y = 77; y <= 179; y++) for (let x = 0; x <= 319; x++) { const f = (y - 77) / 103, ond = Math.sin(x * 0.18 + y * 1.3) * Math.sin(y * 0.4) > 0.55;
    R.pset(x, y, R.tone(AGUA, 2.6 - f * 2.2 + (ond ? 0.6 : 0) + (hh(x, y, 3) - 0.5) * 0.3, x, y)); }
  for (let y = 77; y <= 79; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, mez(R.pget(x, y), hex('#f0c8a0'), 0.4));
  // los nenúfares y las espadañas de la orilla de delante (las fijas)
  for (const [x, y] of [[240, 118], [262, 126], [290, 112], [306, 130], [222, 132]]) { R.disco(x, y, 3, hex('#3a7a3a')); R.pset(x + 1, y - 1, hex('#5a9a4a')); R.pset(x + 2, y, hex('#2a5a2a')); }
  R.disco(262, 124, 1, hex('#f0a0c0'));
  // el muelle de tablas (de la izquierda a x 232): la cara de arriba, el canto y los pilotes
  for (let y = 126; y <= 141; y++) for (let x = 0; x <= 232 - (y - 126) * 0; x++) { const tab = Math.floor(x / 9), j = x % 9 === 0; R.pset(x, y, j ? hex('#5a3a22') : R.tone(rp('#7a5032', '#946240', '#ae7a50', '#c89466'), 2 + Math.sin(y * 0.9 + tab * 3) * 0.4 + (y < 129 ? 0.8 : 0) + (hh(tab, y) - 0.5) * 0.5, x, y)); }
  for (let x = 0; x <= 232; x++) for (let y = 142; y <= 147; y++) R.pset(x, y, R.tone(rp('#3a2414', '#5a3a22', '#6a4a2a'), 1.2 + (y === 142 ? 1 : 0) + (hh(x, y, 5) - 0.5) * 0.6, x, y));
  for (const px of [6, 60, 114, 168, 226]) { R.rect(px - 3, 142, px + 3, 168, hex('#3a2414')); R.rect(px - 2, 142, px - 1, 168, hex('#6a4a2a'));
    for (let y = 169; y <= 179; y++) for (let x = px - 3; x <= px + 3; x++) if ((y + x) % 3) R.pset(x + Math.round(Math.sin(y) * 1), y, mez(R.pget(x, y), hex('#3a2414'), 0.5)); }
  // la caja de aparejos, la radio de transistores y el cubo con su pez
  caja(14, 116, 38, 127, hex('#3a6a4a')); R.rect(15, 117, 37, 118, hex('#5a8a6a')); R.rect(24, 112, 28, 116, K0);
  caja(186, 114, 200, 127, hex('#9aa0aa')); R.rect(187, 115, 199, 116, hex('#c8ccd4')); R.rect(193, 109, 194, 114, K0); R.poligono([[188, 112], [194, 108], [199, 112]], hex('#d8a040'));
  // la nevera de picnic de cuadros con las botellas
  caja(62, 112, 88, 128, hex('#e8e4d8')); for (let i = 0; i < 26; i += 4) for (let j = 0; j < 16; j += 4) if ((i + j) % 8 === 0) R.rect(63 + i, 113 + j, 64 + i, 114 + j, hex('#3a7a5a'));
  R.rect(61, 110, 89, 112, hex('#3a7a5a')); for (let k = 0; k < 4; k++) { R.rect(66 + k * 6, 104, 67 + k * 6, 110, hex('#5a3418')); R.pset(66 + k * 6, 103, hex('#c8a040')); R.pset(67 + k * 6, 103, hex('#c8a040')); }
  // el soporte de la caña en el pilote 168
  R.rect(164, 112, 166, 128, hex('#4a3a2a'));
};
const p3 = (t) => {
  capa('qj-muelle', fondoMuelle);
  // las nubes de la tarde a tres velocidades y los pájaros
  const NUB = rp('#c890a0', '#f0b8a8', '#ffe0c8');
  nube(((t * 3 + 40) % 380) - 30, 24, 46, NUB); nube(((t * 5 + 200) % 380) - 30, 36, 30, NUB); nube(((t * 1.6 + 120) % 380) - 30, 48, 58, rp('#a888a8', '#d8a8b0', '#f0c8b8'));
  pajaros(t, 30, hex('#3a3040'), 3, 12, 250, 0);
  // el humo de la chimenea de la cabaña
  for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6) % 1); R.disco(Math.round(67 + u * 8 + Math.sin(u * 6 + t) * 2), Math.round(56 - u * 18), 1 + Math.round(u * 2), mez(hex('#d8d0d8'), hex('#f8d0a0'), u)); }
  // el brillo del sol en el agua y las ondas que corren
  for (let k = 0; k < 26; k++) { const y = 80 + Math.floor(hh(k, 1) * 44), w = 3 + Math.floor(hh(k, 2) * 6) - Math.floor((y - 80) / 12), x = Math.round(206 + (hh(k, 3) - 0.5) * (8 + (y - 80) * 0.5) + Math.sin(t * 2 + k) * 2);
    if (Math.sin(t * 4 + k * 1.7) > -0.2) R.rect(x - w, y, x + w, y, hex('#ffe8b0')); }
  for (let k = 0; k < 8; k++) { const x = Math.round(((t * 8 + k * 47) % 340) - 10), y = 150 + (k % 4) * 7; if (x > 236) R.rect(x, y, x + 6, y, hex('#9ac0d0')); }
  // la barca amarrada que se mece
  { const by = 152 + Math.round(Math.sin(t * 1.6) * 1.5), bx = 252; R.poligono([[bx, by - 8], [bx + 50, by - 8], [bx + 44, by], [bx + 6, by]], K0); R.poligono([[bx + 1, by - 7], [bx + 49, by - 7], [bx + 43, by - 1], [bx + 7, by - 1]], hex('#c85a3a'));
    R.rect(bx + 2, by - 8, bx + 48, by - 7, hex('#f0e0c8')); R.rect(bx + 20, by - 10, bx + 30, by - 9, hex('#8a5a3a')); R.linea(bx + 2, by - 7, 232, 140, hex('#d8c8a8')); for (let i = 0; i < 40; i += 3) R.pset(bx + 6 + i, by + 2, hex('#9ac0d0')); }
  // las espadañas de delante que se mecen
  for (let k = 0; k < 12; k++) { const x = 236 + k * 7 + Math.round(hh(k, 4) * 4), h = 18 + Math.floor(hh(k, 5) * 14), sw = Math.sin(t * 1.5 + k) * 2;
    R.linea(x, 179, Math.round(x + sw), 179 - h, hex('#4a7a3a')); if (k % 3 === 0) R.rect(Math.round(x + sw) - 1, 179 - h - 6, Math.round(x + sw), 179 - h, hex('#6a4a2a')); }
  // la libélula
  { const x = Math.round(150 + Math.sin(t * 1.3) * 40), y = Math.round(100 + Math.sin(t * 2.7) * 8), a = Math.floor(t * 20) % 2; R.rect(x, y, x + 4, y, hex('#3a8ab0')); R.pset(x + 1, y - 1 - a, hex('#c8e8f8')); R.pset(x + 3, y - 1 - a, hex('#c8e8f8')); }
  // la caña en su soporte, el sedal y el corcho que cabecea
  { const bob = Math.round(Math.sin(t * 3) * 1.2) + (t > QJ(.80) && t < QJ(.80) + 0.4 ? 2 : 0); R.linea(165, 112, 196, 82, hex('#6a4a2a')); R.linea(196, 82, 214, 154 + bob, hex('#e8e0d0'));
    R.disco(214, 154 + bob, 2, hex('#e83a3a')); R.pset(214, 152 + bob, BL); for (let i = -4; i <= 4; i += 2) R.pset(214 + i, 157, hex('#9ac0d0')); }
  // el perro, que mueve la cola
  if (R.perro) R.perro(150, 134, t, { dir: -1, esc: 0.55 });
  // el abuelo y el niño
  const llega = QJ(.7268), da = QJ(.7837), coge = da + 0.6, brinda = QJ(.82), gris0 = QJ(.8445), quita = QJ(.9407);
  const ABU = { ...NC.senador, delante: null }, abuPal = { C: '#6a8a5a', c: '#4e6a42', o: '#c8a040', F: '#5a4a3a', W: '#e8e0c8' };
  const n = lin(t, llega - 0.4, llega + 0.9), xn = Math.round(lerp(-20, 96, sm(n)));
  const vaCoger = t > da && t < coge, xa = 124;
  const tieneA = t > coge + 0.3, tieneN = t > coge, fuera = lin(t, quita, quita + 0.9);
  const aA = R.actor(ABU, xa, 136, t, { dir: t > llega + 0.4 ? -1 : 1, tocado: 'sombreroPaja', pal: abuPal, sonrisa: t < gris0, triste: t > quita + 0.6,
    sostiene: vaCoger ? [xa - 4, 122] : tieneA ? (t > brinda && t < brinda + 0.5 ? [xa - 3, 116] : [xa - 1, 122]) : t < llega + 0.4 ? [xa + 16, 120] : undefined });
  if ((vaCoger || tieneA) && fuera < 1) botellaMano(aA.mano[0], aA.mano[1] + 4, 0.5, 1 - fuera, 1);
  if (t < llega + 0.4) R.linea(aA.mano[0], aA.mano[1], 165, 112, hex('#6a4a2a'));
  const aN = R.actor(EL.nino57 ?? NC.estudiante, xn, 136, t, { dir: 1, anda: n > 0 && n < 1, sonrisa: t > llega + 0.8 && t < quita, triste: t > quita + 0.3, sorpresa: t > quita && t < quita + 0.3,
    sostiene: tieneN ? (t > brinda && t < brinda + 0.5 ? [xn + 15, 116] : [xn + 13, 122]) : undefined, salto: t > coge && t < coge + 0.3 ? 2 : 0 });
  if (tieneN && fuera < 1) botellaMano(aN.mano[0], aN.mano[1] + 4, 0.5, 1 - fuera, 2);
  if (t > brinda && t < brinda + 0.35) { for (const [dx, dy] of [[-3, -3], [3, -3], [0, -5]]) R.pset(Math.round((aN.mano[0] + aA.mano[0]) / 2) + dx, aN.mano[1] - 6 + dy, BL); }
  if (t > quita + 0.6) { R.bocadillo(xn + 7, 104, { icono: '?' }); }
  // el recuerdo se destiñe (a gris sepia) y la viñeta de foto antigua
  const g = 0.85 * sm(lin(t, gris0, quita + 0.6));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.hypot((x - 160) / 180, (y - 90) / 120), vi = v > 0.78 ? Math.min(0.45, (v - 0.78) * 1.4) : 0;
    if (g <= 0 && vi <= 0) continue; let c = R.pget(x, y); if (g > 0) { const r = c & 255, gg = (c >>> 8) & 255, b = (c >>> 16) & 255, l = Math.round(r * 0.3 + gg * 0.55 + b * 0.15);
      c = mez(c, (0xff000000 | (Math.round(l * 0.86) << 16) | (Math.round(l * 0.95) << 8) | l) >>> 0, g); }
    if (vi > 0) c = mez(c, hex('#3a2a20'), vi); R.pset(x, y, c); }
};

const efectos = [[QJ(.0038), 'ring'], [QJ(.0696), 'trueno'], [QJ(.0696) + 0.4, 'boing'], [QJ(.0696) + 1.15, 'golpecito'], [QJ(.2419), 'tic'], [QJ(.3115), 'papel'], [QJ(.3812), 'ring'], [QJ(.5521), 'pop'], [QJ(.7268), 'tic'], [QJ(.82), 'toc'], [QJ(.9407), 'viento']];
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3]], { efectos, año: 1985 });
''')

# ───────────────────────────────────────── NC-PSIQUIATRA ─────────────────────────────────────────
E['nc-psiquiatra'] = ('El psiquiatra', r'''// NC-PSIQUIATRA (frase 17, «The company even hired a psychiatrist…»), sin cartela; barra en 1985. Cuatro planos:
// 1. «The company even hired a psychiatrist to listen to recordings of the calls»: la consulta del psiquiatra (fondo
//    local: papel de damasco verde, estantería de libros, ventana con lluvia sobre Atlanta, diplomas, reloj de péndulo,
//    diván y lámpara de pie); el psiquiatra saluda tras su mesa; en «listen» se pone los cascos; un empleado de la
//    empresa entra con una caja de cintas y la deja en la mesa en «recordings»; en «calls» las bobinas echan a andar.
// 2. Corta en «what he heard»: inserto de la mesa: el magnetófono grande con las bobinas y los vúmetros; en
//    «surprised» la mano deja las gafas en la mesa; en «People talked» sale un bocadillo con una familia y su botella,
//    en «family» se enmarca y en «died» el corazón se rompe; la mano saca un pañuelo de papel.
// 3. Corta en «Goizueta»: inserto de la sala de correo de la sede: el casillero, la mesa con sobres; en «letter» entra
//    deslizándose un sobre del revés, en «addressed» la mano lo sella, en «Chief Dodo» le da la vuelta (el dodo con
//    corbata, grande) y lo mete en la casilla de la estrella del jefe.
// 4. Corta en «he liked to say»: el despacho de Goizueta (fondo local, ventana a Atlanta al atardecer): la secretaria
//    entra con el sobre y se lo da en «worst part»; él lo abre (el dodo, en grande sobre la ventana) y en «actually
//    reached him» frunce el ceño; ella se encoge de hombros; al final él lo arruga y lo tira a la papelera.
''', COMUN + r'''
const PS = (f) => en('psiquiatra', f);
const S2 = PS(.2705), S3 = PS(.5791), S4 = PS(.8136);
// la caja de cartón con las cintas que asoman
const cajaCintas = (x, y) => { x = Math.round(x); y = Math.round(y); caja(x, y - 12, x + 20, y, hex('#c8a06a')); R.rect(x + 1, y - 11, x + 19, y - 10, hex('#e0b880')); R.rect(x + 9, y - 11, x + 11, y - 1, hex('#d8c8a0'));
  for (let k = 0; k < 3; k++) { R.disco(x + 4 + k * 6, y - 13, 3, K0); R.disco(x + 4 + k * 6, y - 13, 2, hex('#5a5e6a')); R.pset(x + 4 + k * 6, y - 13, hex('#c8ccd4')); } };

// ── 1 · la consulta ──
const fondoConsulta = () => {
  // el papel de damasco verde y la moldura (la esquina de Atom, lisa)
  damasco(0, 6, 319, 112, rp('#24382c', '#2e4a3a', '#3a5a46', '#4a6a52'), 1);
  for (let y = 0; y <= 50; y++) for (let x = 270; x <= 319; x++) R.pset(x, y, R.tone(rp('#2e4a3a', '#34503e'), 0.6 + (hh(x, y) - 0.5) * 0.3, x, y));
  R.rect(0, 0, 319, 5, hex('#e8dcc0')); R.rect(0, 5, 319, 6, hex('#a89c80')); R.rect(0, 2, 319, 2, hex('#f6eedc'));
  // el friso de madera con paneles
  for (let y = 112; y <= 132; y++) for (let x = 0; x <= 319; x++) { const p = x % 40, borde = p < 2 || y === 114 || y === 130; R.pset(x, y, R.tone(rp('#3a2214', '#5a3420', '#6e4228', '#86553a'), borde ? 1 : 2 + Math.sin(x * 0.3 + y * 0.1) * 0.3 + (hh(x, y) - 0.5) * 0.3, x, y)); }
  R.rect(0, 111, 319, 112, hex('#a87a4a'));
  // el parqué y la alfombra persa
  tablas(0, 133, 319, 179, rp('#4a2a16', '#6a4022', '#7e5030', '#96643e'), 5, 2);
  for (let y = 148; y <= 176; y++) for (let x = 40; x <= 230; x++) { const u = (x - 135) / 95, v = (y - 162) / 14, b = Math.max(Math.abs(u), Math.abs(v)); if (b > 1) continue;
    const borde = b > 0.86, dib = (Math.abs(Math.round(u * 12)) + Math.abs(Math.round(v * 6))) % 3 === 0;
    R.pset(x, y, borde ? (b > 0.93 ? hex('#3a1a1a') : hex('#c8a040')) : dib ? hex('#2a3a6a') : R.tone(rp('#6a1a1a', '#8a2a24', '#a83a2a'), 1.4 + (hh(x, y) - 0.5) * 0.6, x, y)); }
  // la estantería de libros (x 4–58)
  caja(4, 22, 58, 132, hex('#4a2a16')); R.rect(6, 24, 56, 130, hex('#2a180c'));
  for (const [k, y] of [[0, 44], [1, 66], [2, 88], [3, 110], [4, 130]]) { libros(7, 56, y, k + 2, 16); R.rect(5, y, 57, y + 1, hex('#6a4022')); }
  R.disco(20, 16, 5, hex('#c8c0b0')); R.rect(16, 18, 24, 22, hex('#a8a090')); R.pset(18, 15, hex('#8a8478'));
  // la ventana con persiana a Atlanta bajo la lluvia (lo de dentro se pinta cada fotograma)
  caja(68, 22, 126, 94, hex('#e8e0d0')); R.rect(70, 24, 124, 92, hex('#7a8a9a'));
  // las cortinas granate
  for (const x0 of [62, 122]) for (let y = 18; y <= 104; y++) for (let x = x0; x <= x0 + 8; x++) R.pset(x, y, R.tone(rp('#4a1418', '#6a1e22', '#8a2a2e'), 1.3 + Math.sin(x * 1.3) * 0.7, x, y));
  R.rect(58, 16, 136, 18, hex('#c8a040'));
  // los diplomas (sin letras: rayas y un sello)
  for (const [x, y] of [[142, 30], [168, 30]]) { caja(x, y, x + 22, y + 18, hex('#e8d8b0'), hex('#3a2414')); R.rect(x + 2, y + 2, x + 20, y + 16, hex('#f6eedc')); for (let i = 0; i < 4; i++) R.rect(x + 5, y + 5 + i * 3, x + 17 - (i % 2) * 3, y + 5 + i * 3, hex('#8a8478')); R.disco(x + 16, y + 14, 2, hex('#c83030')); }
  // el diván de cuero capitoné y la mesita con los pañuelos
  for (let y = 108; y <= 146; y++) for (let x = 232; x <= 316; x++) { const asiento = y > 126, resp = x > 300 || y < 116; if (!asiento && !resp && y < 126) { if (x < 300) continue; }
    R.pset(x, y, R.tone(rp('#3a1e10', '#5a2e18', '#7a4224', '#9a5a34'), 2 + (asiento && y === 127 ? 1 : 0) + ((x * 3 + y * 5) % 11 === 0 ? -1.2 : 0) + (hh(x, y) - 0.5) * 0.4, x, y)); }
  for (let y = 108; y <= 126; y++) for (let x = 300; x <= 316; x++) R.pset(x, y, R.tone(rp('#3a1e10', '#5a2e18', '#7a4224'), 1.6 + (x === 300 ? 1 : 0), x, y));
  R.rect(232, 146, 236, 152, hex('#2a140a')); R.rect(310, 146, 314, 152, hex('#2a140a'));
  R.rect(244, 120, 266, 126, hex('#c8b890')); R.rect(244, 120, 266, 121, hex('#e8dcc0'));
  caja(212, 128, 228, 150, hex('#5a3420')); caja(214, 121, 226, 128, hex('#e8e4f0')); R.rect(218, 118, 222, 121, BL);
  // la lámpara de pie con su pantalla
  R.rect(201, 62, 202, 140, hex('#8a6a3a')); R.rect(196, 140, 207, 142, hex('#5a4a2a')); R.poligono([[192, 64], [211, 64], [207, 50], [196, 50]], hex('#e8d090'));
  luz(201, 64, 26, hex('#fff0b0'), 0.35);
  // el perchero con el abrigo y el sombrero
  R.rect(262, 54, 263, 140, hex('#3a2414')); R.rect(256, 140, 269, 142, hex('#3a2414')); R.poligono([[256, 60], [270, 60], [272, 96], [254, 96]], hex('#5a5a6a')); R.rect(256, 52, 270, 56, hex('#3a3440')); R.rect(259, 49, 267, 52, hex('#3a3440'));
};
const ventanaLluvia = (t) => { R.recorte([70, 24, 124, 92]);
  llena(70, 24, 124, 70, rp('#6a7a8a', '#7a8a9a', '#8a9aaa'), (x, y) => 1.4 + (y - 24) / 50 + (hh(x, y, 4) - 0.5) * 0.3);
  nube(((t * 3) % 90) + 58, 34, 34, rp('#5a6a7a', '#7a8a9a', '#9aa8b8'), (x, y) => x >= 70 && x <= 124 && y >= 24 && y <= 92);
  for (const [x, w, h] of [[72, 10, 30], [84, 8, 42], [94, 12, 26], [108, 9, 36], [118, 8, 22]]) { rc(x, 92 - h, x + w, 92, hex('#4a5666')); for (let j = 92 - h + 3; j < 90; j += 4) for (let i = x + 2; i < x + w - 1; i += 3) if (hh(i, j, Math.floor(t * 0.5)) > 0.55) R.pset(i, j, hex('#f0d890')); }
  lluvia(t, 70, 24, 124, 92, 40, hex('#b8c8d8'), 160, 1); R.recorte(null);
  // la persiana subida a medias: lamas
  for (let y = 24; y <= 46; y += 3) { R.rect(70, y, 124, y + 1, hex('#e8e0c8')); R.rect(70, y + 1, 124, y + 1, hex('#b8ac90')); } R.rect(96, 46, 97, 60, hex('#8a8070'));
  R.rect(96, 24, 98, 92, hex('#e8e0d0')); R.rect(70, 57, 124, 58, hex('#e8e0d0')); };
const relojPendulo = (x, y, t) => { caja(x, y, x + 16, y + 36, hex('#6a4022')); R.disco(x + 8, y + 9, 6, K0); R.disco(x + 8, y + 9, 5, hex('#f6f2e4'));
  const am = t * 0.8, ah = t * 0.07 + 2; R.linea(x + 8, y + 9, Math.round(x + 8 + Math.cos(am) * 4), Math.round(y + 9 + Math.sin(am) * 4), K0); R.linea(x + 8, y + 9, Math.round(x + 8 + Math.cos(ah) * 3), Math.round(y + 9 + Math.sin(ah) * 3), K0);
  R.rect(x + 3, y + 17, x + 13, y + 33, hex('#2a180c')); const a = Math.sin(t * Math.PI) * 0.35, px = Math.round(x + 8 + Math.sin(a) * 12), py = Math.round(y + 18 + Math.cos(a) * 12); R.linea(x + 8, y + 18, px, py, hex('#c8a040')); R.disco(px, py, 2, hex('#e8c060')); };
const p1 = (t) => {
  capa('ps-consulta', fondoConsulta);
  ventanaLluvia(t);
  relojPendulo(196, 70, t);
  const hola = PS(.0906), cascoT = PS(.1498), deja = PS(.1741), play = PS(.2275);
  // el psiquiatra tras su mesa: saluda, se pone los cascos y escucha
  const xp = 146, conCascos = t > cascoT + 0.3;
  const ap = R.actor(NC.psiquiatra, xp, 126, t, { dir: t > deja - 0.4 && t < play + 0.4 ? 1 : 1, dedo: t > hola - 0.2 && t < cascoT, sostiene: t > cascoT && t < cascoT + 0.35 ? [xp + 8, 106] : undefined, sonrisa: t < cascoT, habla: t > hola && t < cascoT && Math.sin(t * 8) > 0 });
  if (conCascos) { cascos(ap); R.linea(ap.cabeza[0] - 7, ap.cabeza[1] + 9, 136, 112, hex('#2a2a32')); }
  else if (t > cascoT) { R.rect(ap.mano[0] - 4, ap.mano[1] - 2, ap.mano[0] + 4, ap.mano[1], hex('#2a2a32')); }
  // el empleado de la empresa entra con la caja de cintas, la deja y se va
  const w = lin(t, 0.3, deja - 0.3), vete = lin(t, deja + 0.5, deja + 2.2), xe = Math.round(lerp(330, 196, sm(w)) + vete * 150);
  { const lleva = t < deja, a = R.actor(NC.presentador, xe, 160, t, { dir: vete > 0 ? 1 : -1, anda: (w > 0 && w < 1) || (vete > 0 && vete < 1), pal: { C: '#6a5a3a', c: '#4e4228', o: '#2a2430' }, sostiene: lleva ? [xe - 2, 134] : undefined, sonrisa: t > deja });
    if (lleva) cajaCintas(a.mano[0] - 10, a.mano[1] + 6); }
  // la mesa (por delante): el magnetófono, las cintas que dejó, la lámpara de banquero
  for (let y = 122; y <= 160; y++) for (let x = 96; x <= 204; x++) { const top = y < 127; R.pset(x, y, top ? R.tone(rp('#6a4022', '#86553a', '#a06a44'), 1.6 + (y === 122 ? 1 : 0) + Math.sin(x * 0.2) * 0.3, x, y) : R.tone(rp('#3a2214', '#4e2e1a', '#643c22'), 1.4 + Math.sin(x * 0.15 + y * 0.05) * 0.4 + ((x - 96) % 36 < 2 ? -1 : 0), x, y)); }
  R.rect(95, 121, 205, 121, K0); for (const x of [112, 148, 184]) { R.rect(x, 136, x + 8, 137, hex('#c8a040')); }
  magneto(98, 96, 1, t, t > play, 0.55);
  if (t > deja) cajaCintas(168, 122); else { for (let k = 0; k < 2; k++) { R.disco(174 + k * 9, 119, 3, K0); R.disco(174 + k * 9, 119, 2, hex('#5a5e6a')); } }
  R.rect(197, 116, 199, 122, hex('#c8a040')); R.poligono([[191, 116], [204, 116], [202, 110], [193, 110]], hex('#2a6a4a')); luz(198, 118, 14, hex('#fff0b0'), 0.25);
  if (t > play) for (let k = 0; k < 3; k++) { const u = ((t * 1.2 + k / 3) % 1); R.pset(Math.round(118 + k * 2), Math.round(94 - u * 10), mez(hex('#c8e0a0'), hex('#3a5a46'), u)); }
};

// ── 2 · inserto: la mesa del psiquiatra ──
const fondoMesaPs = () => {
  damasco(0, 0, 319, 50, rp('#1e3026', '#24382c', '#2e4a3a', '#3a5a46'), 3);
  for (let y = 0; y <= 50; y++) for (let x = 270; x <= 319; x++) R.pset(x, y, R.tone(rp('#24382c', '#2a3e30'), 0.6 + (hh(x, y) - 0.5) * 0.3, x, y));
  for (let y = 50; y <= 62; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#3a2214', '#5a3420', '#6e4228'), 1.6 + (x % 40 < 2 ? -1 : 0) + (hh(x, y) - 0.5) * 0.4, x, y));
  // el tablero de la mesa con su veta y el canto de atrás
  tablas(0, 64, 319, 179, rp('#5a3420', '#6e4228', '#86553a', '#a06a44'), 9, 6);
  R.rect(0, 62, 319, 63, hex('#a87a4a'));
  // el vade de cuero verde
  for (let y = 120; y <= 179; y++) for (let x = 170; x <= 260; x++) R.pset(x, y, R.tone(rp('#1e4a32', '#2a5a3e', '#346a4a'), 1.4 + (x === 170 || y === 120 ? 1 : 0) + (hh(x, y) - 0.5) * 0.4, x, y));
  for (let x = 172; x <= 258; x += 3) { R.pset(x, 122, hex('#6a9a6a')); R.pset(x, 177, hex('#6a9a6a')); } for (let y = 122; y <= 177; y += 3) { R.pset(172, y, hex('#6a9a6a')); R.pset(258, y, hex('#6a9a6a')); }
  // sobre el vade: la carpeta abierta con las fichas de las llamadas, el abrecartas y unos clips
  caja(178, 128, 226, 150, hex('#d8b878')); caja(184, 126, 222, 146, hex('#f6f2e4')); for (let i = 0; i < 6; i++) R.rect(188, 130 + i * 3, 214 - (i % 3) * 4, 130 + i * 3, hex('#7a7a8a')); R.numero('17', 200, 145, { color: hex('#c83030'), sombra: false });
  R.linea(200, 162, 226, 172, hex('#c8ccd4')); R.linea(200, 163, 226, 173, hex('#8a8e9a')); R.rect(196, 160, 201, 164, hex('#c8a040'));
  for (const [x, y] of [[244, 130], [250, 134], [180, 168]]) { R.rect(x, y, x + 4, y, hex('#c8ccd4')); R.rect(x, y + 2, x + 4, y + 2, hex('#c8ccd4')); R.pset(x, y + 1, hex('#c8ccd4')); R.pset(x + 4, y + 1, hex('#c8ccd4')); }
  // el montón de cajas de cintas (con su número en el lomo)
  for (let k = 0; k < 4; k++) { const y = 150 - k * 11; caja(6, y, 44, y + 10, k % 2 ? hex('#e8e0d0') : hex('#d8ccb0')); R.rect(8, y + 2, 14, y + 8, hex('#c83030')); R.numero(String(k + 1), 22, y + 9, { color: hex('#3a3440'), sombra: false }); }
  // la libreta con las notas (rayas) y el lápiz
  caja(182, 76, 236, 112, hex('#f6f2dc')); for (let i = 0; i < 9; i++) R.rect(186, 80 + i * 3, 232, 80 + i * 3, hex('#b8c8d8')); R.rect(190, 77, 190, 111, hex('#e8a0a0'));
  for (let i = 0; i < 5; i++) R.linea(194, 82 + i * 3, 194 + 12 + Math.floor(hh(i, 1) * 24), 82 + i * 3, hex('#3a3a5a'));
  R.linea(238, 106, 258, 88, hex('#e8c040')); R.linea(239, 106, 259, 88, hex('#c8a020')); R.pset(237, 107, K0);
  // la caja de pañuelos de papel
  caja(268, 138, 308, 160, hex('#a8c8e8')); R.rect(270, 140, 306, 142, hex('#c8e0f4')); R.rect(280, 138, 296, 139, hex('#5a7a9a'));
  // el retrato de familia en su marco
  caja(250, 66, 274, 96, hex('#c8a040')); R.rect(253, 69, 271, 93, hex('#9ac0d8')); R.rect(253, 84, 271, 93, hex('#6a9a5a'));
  for (const [x, c] of [[256, '#c83030'], [262, '#3a5aa8'], [267, '#e8c040']]) { R.rect(x, 79, x + 2, 84, hex(c)); R.rect(x, 76, x + 2, 78, hex('#e8b088')); }
};
const p2 = (t) => {
  capa('ps-mesa', fondoMesaPs);
  const gafas = PS(.3065), habla0 = PS(.3785), fam = PS(.4899), muere = PS(.5282), panu = PS(.44);
  magneto(46, 70, 3, t, true, 0.6);
  // el cable de los cascos que sube al psiquiatra (fuera de plano)
  R.linea(160, 140, 170, 168, hex('#2a2a32')); { let px = 170, py = 168; for (let i = 0; i < 10; i++) { const nx = 176 + i * 12, ny = 168 - Math.round(Math.sin(i * 0.5 + t) * 2) - i * 2; R.linea(px, py, nx, ny, hex('#2a2a32')); px = nx; py = ny; } }
  // la taza de té que humea
  { caja(116, 150, 134, 172, hex('#f2eee2')); R.rect(117, 151, 133, 153, hex('#8a5a3a')); R.rect(134, 156, 138, 166, K0); R.rect(135, 157, 137, 165, hex('#f2eee2'));
    for (let k = 0; k < 6; k++) { const u = ((t * 0.6 + k / 6) % 1); R.pset(Math.round(124 + Math.sin(u * 7 + k) * 3), Math.round(148 - u * 26), mez(hex('#e8e8e8'), hex('#86553a'), u)); } }
  // las gafas: la mano las deja en el vade en «surprised»; luego coge un pañuelo
  const gx = 232, gy = 166;
  const fase = t < gafas - 0.6 ? 0 : t < gafas + 0.4 ? 1 : t < panu ? 2 : t < panu + 1.2 ? 3 : 4;
  const dejaU = sm(lin(t, gafas - 0.6, gafas)), sube = sm(lin(t, gafas + 0.1, gafas + 0.4));
  const pc = sm(lin(t, panu, panu + 0.5)), pv = sm(lin(t, panu + 0.6, panu + 1.2));
  const gafasEn = (x, y) => { R.disco(x - 4, y, 3, K0); R.disco(x - 4, y, 2, hex('#c8dcec')); R.disco(x + 4, y, 3, K0); R.disco(x + 4, y, 2, hex('#c8dcec')); R.rect(x - 1, y - 1, x + 1, y - 1, K0); R.linea(x - 7, y - 1, x - 11, y + 2, K0); R.linea(x + 7, y - 1, x + 11, y + 2, K0); R.pset(x - 5, y - 1, BL); R.pset(x + 3, y - 1, BL); };
  if (fase >= 2 || t > gafas) gafasEn(gx, gy);
  if (t > gafas - 0.6 && t < gafas + 0.5) { const wx = lerp(282, gx + 12, dejaU) + sube * 40, wy = lerp(196, gy + 2, dejaU) + sube * 26; T.brazo(R, 300, 232, Math.round(wx), Math.round(wy), '#7a5a3a', -1, { codo: [Math.round(wx + 30), Math.round(wy + 30)] }); if (t < gafas) gafasEn(Math.round(wx - 10), Math.round(wy - 2)); }
  if (t > panu && t < panu + 1.4) { const wx = lerp(312, 292, pc) + pv * 30, wy = lerp(196, 142, pc) - pv * 20 + pv * 60; T.brazo(R, 330, 222, Math.round(wx), Math.round(wy), '#7a5a3a', -1, { codo: [Math.round(wx + 22), Math.round(wy + 34)] });
    if (pc >= 1) { R.poligono([[Math.round(wx) - 12, Math.round(wy) - 4], [Math.round(wx) - 4, Math.round(wy) - 16], [Math.round(wx) + 2, Math.round(wy) - 6]], BL); } }
  else { R.poligono([[284, 138], [288, 130], [292, 138]], BL); }
  // el altavoz vibra: ondas que salen hacia el bocadillo
  if (t > habla0 - 0.3) for (let k = 0; k < 3; k++) { const u = ((t * 1.5 + k / 3) % 1), r = 4 + u * 12; for (let a = -0.8; a <= 0.8; a += 0.12) R.pset(Math.round(106 + Math.cos(a - 1.2) * r), Math.round(70 + Math.sin(a - 1.2) * r), mez(hex('#f0dc90'), hex('#86553a'), u)); }
  // el bocadillo: la familia con su botella; en «family» se enmarca; en «died» el corazón se rompe
  if (t > habla0) { const s = sm(lin(t, habla0, habla0 + 0.25)), bx = 148, by = 16 + Math.round((1 - s) * 6);
    globo(bx, by, 108, 52, 112, 64);
    const fig = (x, y, h, col, cab = hex('#e8b088')) => { R.disco(x, y, 3, K0); R.disco(x, y, 2, cab); R.rect(x - 3, y + 4, x + 3, y + 4 + h, K0); R.rect(x - 2, y + 5, x + 2, y + 3 + h, col); R.rect(x - 2, y + 4 + h, x - 1, y + 7 + h, K0); R.rect(x + 1, y + 4 + h, x + 2, y + 7 + h, K0); };
    fig(bx + 18, by + 18, 10, hex('#3a5aa8')); fig(bx + 32, by + 20, 9, hex('#c84a6a')); fig(bx + 46, by + 26, 5, hex('#e8c040'));
    // la botella, como uno más de la familia
    PZ.botella(R, bx + 62, by + 40, { color: 'marron', s: 1.2 });
    if (t > fam) { const f = sm(lin(t, fam, fam + 0.3)); R.rect(bx + 52, by + 10, bx + 72, by + 12, hex('#c8a040')); R.rect(bx + 52, by + 41, bx + 72, by + 43, hex('#c8a040')); R.rect(bx + 52, by + 10, bx + 54, by + 43, hex('#c8a040')); R.rect(bx + 70, by + 10, bx + 72, by + 43, hex('#c8a040')); if (f < 1) R.rect(bx + 52, by + 10 + Math.round(f * 33), bx + 72, by + 43, hex('#f6f4ee')); }
    corazon(bx + 90, by + 24, 9, hex('#d83a4a'), sm(lin(t, muere, muere + 0.4)));
    if (t > muere) for (let k = 0; k < 3; k++) { const u = lin(t, muere + k * 0.2, muere + 1.4 + k * 0.2); if (u > 0 && u < 1) R.disco(bx + 84 + k * 6, Math.round(by + 34 + u * 10), 1, hex('#6aa0e8')); } }
};

// ── 3 · inserto: la sala de correo de la sede ──
const CASI = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 12; c++) CASI.push([8 + c * 22, 28 + r * 16]);
const fondoCorreo = () => {
  // la pared beis (la esquina de Atom, lisa)
  llena(0, 0, 319, 112, rp('#c8b890', '#d8c8a0', '#e4d6b0'), (x, y) => 1.4 + (hh(x, y, 7) - 0.5) * 0.4);
  // el casillero de madera (12 × 5) con cartas en las casillas
  caja(4, 24, 274, 110, hex('#6a4022')); for (let x = 4; x <= 274; x++) { R.pset(x, 22, hex('#8a5a32')); R.pset(x, 23, hex('#4a2a16')); }
  CASI.forEach(([x, y], k) => { R.rect(x, y, x + 19, y + 13, hex('#2a180c')); R.rect(x, y, x + 19, y, hex('#1a0e06'));
    const n = Math.floor(hh(k, 3) * 4); for (let i = 0; i < n; i++) { const c = ['#f2ead6', '#e8d8b0', '#c8dcec', '#f0c8c8'][Math.floor(hh(k, i) * 4)]; R.rect(x + 2 + i * 2, y + 4 + i, x + 15 + i, y + 12, hex(c)); R.rect(x + 2 + i * 2, y + 4 + i, x + 15 + i, y + 4 + i, mez(hex(c), K0, 0.2)); }
    R.rect(x + 7, y + 14, x + 12, y + 15, hex('#c8a040')); });
  // la casilla del jefe: la placa con la estrella (arriba, la quinta)
  const [sx, sy] = CASI[4]; R.rect(sx - 1, sy - 1, sx + 20, sy + 14, hex('#c8a040')); R.rect(sx, sy, sx + 19, sy + 13, hex('#2a180c'));
  // el reloj y el calendario de la pared de la derecha
  reloj(296, 66, 10, 0); caja(282, 84, 310, 108, hex('#f6f2e4')); R.rect(283, 85, 309, 90, hex('#c83030')); R.numero('23', 288, 102, { color: hex('#3a3440'), sombra: false });
  // la mesa de clasificar: tablero de madera clara
  tablas(0, 114, 319, 179, rp('#8a6a3a', '#a8844a', '#c09a5a', '#d8b47a'), 10, 9);
  R.rect(0, 112, 319, 113, hex('#4a2a16'));
  // el tampón, las gomas, el abrecartas y la báscula de cartas
  caja(60, 160, 84, 172, hex('#3a3a46')); R.rect(62, 162, 82, 170, hex('#5a2a3a')); R.rect(62, 162, 82, 163, hex('#7a3a4a'));
  for (const [x, y, c] of [[96, 166, '#c8a040'], [104, 170, '#c83030'], [110, 164, '#3a8a5a']]) { R.disco(x, y, 3, hex(c)); R.disco(x, y, 1, hex('#b8945a')); }
  R.linea(60, 140, 92, 132, hex('#c8ccd4')); R.linea(60, 141, 92, 133, hex('#8a8e9a')); R.rect(56, 139, 61, 143, hex('#5a3a22'));
  caja(110, 124, 136, 140, hex('#c8ccd4')); R.rect(112, 120, 134, 124, hex('#9aa0aa')); R.disco(123, 132, 5, K0); R.disco(123, 132, 4, hex('#f6f2e4')); R.linea(123, 132, 126, 129, hex('#c83030'));
  // montones de sobres, el tampón y la bandeja de rejilla
  for (let k = 0; k < 6; k++) sobre(14 + (k % 2) * 3, 150 - k * 4, 30, 18, k % 3 === 1);
  caja(250, 150, 290, 170, hex('#3a3a46')); R.rect(253, 153, 287, 167, hex('#5a2a3a'));
  for (let k = 0; k < 4; k++) sobre(256 + k * 2, 120 - k * 3, 34, 20, k % 2 === 0);
  R.rect(244, 116, 300, 118, hex('#9aa0aa')); for (let x = 246; x < 300; x += 6) R.rect(x, 118, x, 140, hex('#9aa0aa')); R.rect(244, 140, 300, 142, hex('#9aa0aa'));
};
const p3 = (t) => {
  capa('ps-correo', fondoCorreo);
  const llega = PS(.6894) - 0.4, sella = PS(.7033), vuelta = PS(.7474), mete = PS(.79);
  // las cartas que caen en las casillas de vez en cuando (la vida del fondo)
  for (let k = 0; k < 4; k++) { const ph = (t * 0.7 + k * 0.37) % 1, [x, y] = CASI[(Math.floor(t * 0.7 + k * 0.37) * 7 + k * 13) % CASI.length]; if (ph < 0.3) R.rect(x + 3, y + 1 + Math.round(ph * 30), x + 16, y + 6 + Math.round(ph * 30), hex('#f2ead6')); }
  // el sobre entra deslizándose del revés y se para en el centro
  const q = sm(lin(t, llega, llega + 0.5)), x0 = Math.round(lerp(-80, 146, q)), y0 = 118;
  const flip = lin(t, vuelta, vuelta + 0.3), sube = sm(lin(t, mete, mete + 0.6));
  const ancho = flip < 0.5 ? Math.round(80 * (1 - flip * 2)) : Math.round(80 * (flip * 2 - 1));
  const [sx, sy] = CASI[4];
  const ex = lerp(x0, sx - 2, sube), ey = lerp(y0, sy - 2, sube) - Math.sin(sube * Math.PI) * 30, sc = 1 - sube * 0.75;
  // la sombra en la mesa
  if (sube < 0.2) R.rect(x0 + 3, y0 + 52, x0 + 82, y0 + 54, mez(hex('#a8844a'), K0, 0.4));
  const W = Math.max(2, Math.round(ancho * sc)), H = Math.round(52 * sc);
  if (sube < 1) sobre(ex + (80 * sc - W) / 2, ey, W, H, flip < 0.5, flip >= 0.5 ? 1 : 0);
  if (flip < 0.5 && t > sella) { const s = lin(t, sella, sella + 0.15); R.disco(Math.round(x0 + 40 + 30 * (1 - flip * 2)), y0 + 32, 6, mez(hex('#f2ead6'), hex('#c83030'), s)); R.disco(Math.round(x0 + 40 + 30 * (1 - flip * 2)), y0 + 32, 4, hex('#f2ead6')); }
  if (sube >= 1) { R.rect(sx + 2, sy + 3, sx + 16, sy + 12, hex('#f2ead6')); R.rect(sx + 3, sy + 5, sx + 6, sy + 8, hex('#8a8e9a')); }
  // el brillo del dodo al darle la vuelta
  if (flip >= 1 && sube <= 0) { const b = Math.floor(t * 6) % 2; for (const [dx, dy] of [[-6, 4], [86, 10], [40, -6]]) { R.pset(x0 + dx, y0 + dy, b ? BL : hex('#f0d860')); R.pset(x0 + dx - 1, y0 + dy, hex('#f0d860')); R.pset(x0 + dx + 1, y0 + dy, hex('#f0d860')); R.pset(x0 + dx, y0 + dy - 1, hex('#f0d860')); R.pset(x0 + dx, y0 + dy + 1, hex('#f0d860')); } }
  // la mano: sella en «addressed» (con el tampón), da la vuelta en «Chief Dodo» y lo sube a la casilla
  const tamp = (x, y) => { R.rect(x - 4, y - 14, x + 4, y - 6, hex('#5a3a22')); R.rect(x - 2, y - 20, x + 2, y - 14, hex('#8a5a3a')); R.disco(x, y - 21, 3, hex('#8a5a3a')); R.rect(x - 6, y - 6, x + 6, y - 4, hex('#3a3440')); };
  if (t > sella - 0.7 && t < sella + 0.5) { const b = sm(lin(t, sella - 0.7, sella)) * (1 - sm(lin(t, sella + 0.1, sella + 0.5))), wx = Math.round(lerp(300, 228, b)), wy = Math.round(lerp(200, 150, b)) - (t < sella ? Math.round(Math.sin(lin(t, sella - 0.3, sella) * Math.PI) * 6) : 0);
    tamp(wx - 12, wy - 2); T.brazo(R, 300, 240, wx, wy, '#3a5a8a', -1, { codo: [wx + 34, wy + 40] }); }
  if (t > vuelta - 0.4 && t < mete + 0.6) { const b = sm(lin(t, vuelta - 0.4, vuelta)) * (1 - sm(lin(t, mete + 0.1, mete + 0.6))), fl = t > mete - 0.1 && t < mete + 0.15 ? -8 : 0, wx = Math.round(lerp(300, 236, b)), wy = Math.round(lerp(200, 160, b)) + fl;
    T.brazo(R, 300, 240, wx, wy, '#3a5a8a', -1, { codo: [wx + 34, wy + 34] }); }
};

// ── 4 · el despacho de Goizueta ──
const fondoDespacho = () => {
  // la pared de paneles de nogal (la esquina de Atom, pared crema lisa)
  for (let y = 0; y <= 120; y++) for (let x = 0; x <= 319; x++) { const p = x % 32, b = p < 2 || (y % 60) < 2; R.pset(x, y, R.tone(rp('#3a2214', '#4e2e1a', '#5e3a22', '#704828'), b ? 0.8 : 2 + Math.sin(y * 0.25 + x * 0.04 + Math.floor(x / 32) * 2) * 0.35 + (hh(x, y) - 0.5) * 0.3, x, y)); }
  for (let y = 0; y <= 54; y++) for (let x = 182; x <= 319; x++) R.pset(x, y, R.tone(rp('#d8c8a8', '#e4d6b8', '#ece0c6'), 1.4 + (hh(x, y, 2) - 0.5) * 0.3 - (y > 50 ? 0.8 : 0), x, y));
  R.rect(182, 54, 319, 56, hex('#a87a4a'));
  // el cuadro del paisaje (debajo de la esquina de Atom, a la izquierda de ella)
  caja(196, 22, 246, 48, hex('#c8a040')); R.rect(199, 25, 243, 45, hex('#9ac0d8')); R.rect(199, 37, 243, 45, hex('#6a8a4a')); R.poligono([[205, 37], [218, 28], [230, 37]], hex('#6a7a9a')); R.disco(236, 30, 3, hex('#f8e8a0'));
  // la puerta de la izquierda (cerrada; la que se abre se pinta en el plano)
  caja(8, 30, 46, 120, hex('#5a3420')); R.rect(10, 32, 44, 118, hex('#3a2010'));
  // la ventana grande a Atlanta (lo de dentro, cada fotograma)
  caja(60, 18, 172, 100, hex('#2a180c')); R.rect(62, 20, 170, 98, hex('#4a3a5a'));
  // la credenza con libros, el trofeo y la planta
  caja(250, 70, 318, 122, hex('#4a2a16')); for (const y of [88, 106]) { libros(252, 316, y, y, 14); R.rect(251, y, 317, y + 1, hex('#6a4022')); }
  R.rect(252, 120, 316, 121, hex('#6a4022')); R.rect(264, 60, 272, 70, hex('#c8a040')); R.rect(262, 58, 274, 60, hex('#e8c060')); R.rect(266, 70, 270, 72, hex('#8a6a24'));
  caja(292, 56, 304, 70, hex('#a84a2a')); for (let k = 0; k < 7; k++) R.linea(298, 56, 292 + k * 2, 44 + (k % 3) * 2, hex('#3a7a3a'));
  // la moqueta granate con dibujo
  for (let y = 121; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#4a1a1e', '#5e2228', '#702a30'), 1.3 + ((x + y * 2) % 14 === 0 ? 1 : 0) + (y - 121) / 80 + (hh(x, y, 3) - 0.5) * 0.4, x, y));
  // la alfombra persa delante de la mesa y los dos sillones de las visitas
  for (let y = 164; y <= 179; y++) for (let x = 60; x <= 300; x++) { const u = (x - 180) / 120, v = (y - 172) / 8, b = Math.max(Math.abs(u), Math.abs(v)); if (b > 1) continue;
    R.pset(x, y, b > 0.88 ? hex('#c8a040') : (Math.abs(Math.round(u * 14)) + Math.abs(Math.round(v * 4))) % 3 === 0 ? hex('#2a3a6a') : R.tone(rp('#6a2a1a', '#8a3a24', '#a84a2a'), 1.4 + (hh(x, y) - 0.5) * 0.6, x, y)); }
  for (const x0 of [64, 272]) { caja(x0, 136, x0 + 26, 170, hex('#5a2a1a')); R.rect(x0 + 2, 138, x0 + 24, 150, hex('#7a3a22')); R.rect(x0 + 2, 152, x0 + 24, 160, hex('#8a4a2a')); R.rect(x0 + 2, 152, x0 + 24, 152, hex('#a85a34')); for (let i = x0 + 5; i < x0 + 24; i += 6) for (let j = 141; j < 150; j += 4) R.pset(i, j, hex('#c8a040')); R.rect(x0 + 2, 170, x0 + 4, 174, K0); R.rect(x0 + 22, 170, x0 + 24, 174, K0); }
  // la papelera de rejilla
  for (let y = 150; y <= 172; y++) for (let x = 252; x <= 270; x++) { const borde = x === 252 || x === 270 || y === 150 || y === 172; R.pset(x, y, borde ? K0 : (x + y) % 3 === 0 ? hex('#9aa0aa') : hex('#3a2a2a')); }
};
const ventanaCiudad = (t) => { R.recorte([62, 20, 170, 98]);
  llena(62, 20, 170, 98, rp('#3a3a6a', '#6a4a7a', '#b86a6a', '#e8945a', '#f0b870'), (x, y) => (y - 20) / 78 * 4.2 + (hh(x, y, 5) - 0.5) * 0.35);
  nube(((t * 2.5) % 140) + 50, 34, 40, rp('#6a4a6a', '#a86a7a', '#e8a088'), (x, y) => x >= 62 && x <= 170 && y >= 20 && y <= 98);
  nube(((t * 4 + 70) % 140) + 50, 48, 26, rp('#7a5a7a', '#c88a8a', '#f0b8a0'), (x, y) => x >= 62 && x <= 170 && y >= 20 && y <= 98);
  for (const [x, w, h] of [[64, 14, 34], [80, 10, 52], [92, 16, 40], [110, 12, 62], [124, 18, 44], [144, 10, 56], [156, 14, 30]]) { rc(x, 98 - h, x + w, 98, hex('#2a2440')); rc(x, 98 - h, x, 98, hex('#3a3456'));
    for (let j = 98 - h + 3; j < 96; j += 4) for (let i = x + 2; i < x + w - 1; i += 3) if (hh(i, j, Math.floor(t * 0.4 + i)) > 0.5) R.pset(i, j, hex('#f8d870')); }
  R.pset(116, 98 - 63, Math.floor(t * 2) % 2 ? hex('#ff3a3a') : hex('#5a1a1a'));
  { const ax = Math.round(((t * 9) % 140) + 50), ay = 28; if (ax > 62 && ax < 170) { R.pset(ax, ay, hex('#e8e8f0')); R.pset(ax + 1, ay, hex('#e8e8f0')); if (Math.floor(t * 3) % 2) R.pset(ax - 1, ay, hex('#ff4a4a')); } }
  R.recorte(null); R.rect(114, 20, 117, 98, hex('#2a180c')); R.rect(62, 58, 170, 60, hex('#2a180c')); };
const p4 = (t) => {
  capa('ps-despacho', fondoDespacho);
  ventanaCiudad(t);
  reloj(296, 104, 0, t);
  const entra = S4, da = PS(.8647), abre = PS(.8798), fea = PS(.9332), tira = PS(.9808) + 0.9;
  // la puerta se abre al entrar la secretaria
  const ab = sm(lin(t, entra - 0.2, entra + 0.3)) * (1 - sm(lin(t, entra + 1.6, entra + 2.2)));
  if (ab > 0.05) { const w = Math.round(36 * (1 - ab)); R.rect(10, 32, 44, 118, hex('#e8d8b0')); R.rect(10, 32, 10 + w, 118, hex('#5a3420')); R.rect(10 + w, 32, 10 + w, 118, K0); }
  else R.rect(38, 74, 40, 78, hex('#c8a040'));
  // Goizueta tras la mesa: lee papeles; coge el sobre, lo abre y frunce el ceño
  const xg = 156, tiene = t > da + 0.2, lanza = t > tira;
  const ag = R.actor(NC.goizueta, xg, 130, t, { dir: -1, sostiene: lanza ? undefined : tiene ? [xg - 6, 110] : [xg - 4, 120 + (Math.floor(t * 1.5) % 2)], enfado: t > fea && t < tira + 0.6, sorpresa: t > abre && t < fea, habla: t > fea + 0.3 && t < tira && Math.sin(t * 7) > 0 });
  // la mesa por delante (con la lata roja lisa, el teléfono, la bandeja y la lámpara)
  for (let y = 124; y <= 162; y++) for (let x = 120; x <= 240; x++) { const top = y < 130; R.pset(x, y, top ? R.tone(rp('#3a2214', '#5a3420', '#704828'), 1.6 + (y === 124 ? 1 : 0) + Math.sin(x * 0.2) * 0.3, x, y) : R.tone(rp('#2a160a', '#3a2214', '#4e2e1a'), 1.4 + Math.sin(x * 0.12 + y * 0.06) * 0.4 + ((x - 120) % 40 < 2 ? -1 : 0), x, y)); }
  R.rect(119, 123, 241, 123, K0); for (const x0 of [124, 184]) { R.rect(x0, 134, x0 + 52, 158, hex('#2a160a')); R.rect(x0 + 2, 136, x0 + 50, 156, hex('#4e2e1a')); R.rect(x0 + 2, 136, x0 + 50, 136, hex('#6e4228')); R.rect(x0 + 6, 140, x0 + 46, 152, hex('#3a2214')); R.rect(x0 + 6, 152, x0 + 46, 152, hex('#5e3a22')); R.rect(x0 + 22, 145, x0 + 30, 147, hex('#c8a040')); }
  R.rect(120, 130, 240, 131, hex('#c8a040')); R.rect(120, 160, 240, 162, hex('#2a160a'));
  lataV(222, 124); PZ.telefono(R, 136, 124, { color: '#3a3440' }); caja(196, 117, 214, 124, hex('#c8a040')); R.rect(198, 117, 212, 119, hex('#f2ead6'));
  R.rect(170, 116, 171, 124, hex('#c8a040')); R.poligono([[164, 116], [178, 116], [175, 110], [167, 110]], hex('#2a6a4a'));
  // la secretaria entra con el sobre, se lo da y se encoge de hombros
  const w = lin(t, entra, da - 0.3), xs = Math.round(lerp(14, 116, sm(w)));
  const as = R.actor(NC.operadora, xs, 162, t, { dir: 1, anda: w > 0 && w < 1, tocado: '', pal: { C: '#2a3a6a', c: '#1e2a52', H: '#3a2418', h: '#5a3a24' }, sostiene: !tiene ? [xs + 14, 136] : undefined, brazos: t > fea + 0.2 && t < tira - 0.2, sonrisa: t > fea + 0.2 });
  if (!tiene) { const q = lin(t, da - 0.2, da + 0.2), x = lerp(as.mano[0], ag.mano[0], q), y = lerp(as.mano[1], ag.mano[1], q); sobre(x - 7, y - 6, 14, 9, false); }
  // el sobre en la mano de Goizueta: cerrado, y abierto con el dodo; el dodo grande sobre la ventana
  if (tiene && !lanza) { const [mx, my] = ag.mano; if (t < abre) sobre(mx - 8, my - 8, 16, 10, false); else { caja(mx - 10, my - 17, mx + 8, my + 2, hex('#f6f2e4')); dodo(mx - 9, my - 16, 1, true); } }
  if (t > abre && !lanza) { const s = sm(lin(t, abre, abre + 0.3)), bx = 74, by = 26 + Math.round((1 - s) * 8); caja(bx, by, bx + 84, by + 66, hex('#f6f2e4')); R.rect(bx + 1, by + 62, bx + 83, by + 65, hex('#d8ccb0'));
    dodo(bx + 6, by + 8, 3, true); for (let i = 0; i < 6; i++) R.linea(bx + 58, by + 12 + i * 7, bx + 78 - (i % 2) * 6, by + 12 + i * 7, hex('#6a6a74'));
    R.linea(bx + 84, by + 66, ag.mano[0] - 2, ag.mano[1] - 10, hex('#c8c4b8')); }
  // lo arruga y lo tira a la papelera
  if (lanza) { const q = lin(t, tira, tira + 0.7); if (q < 1) { const x = lerp(xg - 6, 260, q), y = lerp(108, 156, q) - Math.sin(q * Math.PI) * 30; R.disco(Math.round(x), Math.round(y), 3, K0); R.disco(Math.round(x), Math.round(y), 2, hex('#f2ead6')); } else { R.disco(261, 151, 3, hex('#f2ead6')); R.pset(260, 150, K0); } }
};

const efectos = [[PS(.0906), 'puerta'], [PS(.1741), 'golpecito'], [PS(.2275), 'interruptor'], [PS(.3065), 'toc'], [PS(.3785), 'pop'], [PS(.5282), 'chof'], [PS(.6894) - 0.4, 'papel'], [PS(.7033), 'sello'], [PS(.7474), 'whoosh'], [S4 - 0.1, 'puerta'], [PS(.8798), 'papel'], [PS(.9808) + 1.3, 'papel']];
T.rodar(E, R, [[0, p1], [S2, p2], [S3, p3], [S4, p4]], { efectos, año: 1985 });
''')

# ───────────────────────────────────────── NC-MULLINS ─────────────────────────────────────────
E['nc-mullins'] = ('Mullins', r'''// NC-MULLINS (frase 18, «In Seattle, a man named Gay Mullins…»), sin cartela; barra en 1985. Cinco planos:
// 1. «In Seattle, a man named Gay Mullins founded an association of»: la calle de Seattle con lluvia (rebelion 'calle',
//    2.º uso): Mullins entra por la izquierda y en «founded» grapa una octavilla (la lata tachada) en la farola; una
//    pareja mayor llega bajo el paraguas, la lee y en «association» alza sus latas de siempre.
// 2. Corta en «old cola drinkers»: el garaje de Mullins (fondo local): pancartas apiladas, cajas de la de siempre, el
//    portón entreabierto a la lluvia; en «phone line» los tres teléfonos del banco suenan y Mullins descuelga; una
//    voluntaria pinta una pancarta.
// 3. Corta en «and even sued»: el juzgado (fondo local): Mullins alza la demanda; en «threw it out» el juez da con el
//    mazo, la demanda sale volando a la papelera; en «preferred Pepsi» el juez saca una lata azul y bebe; Mullins, de
//    piedra.
// 4. Corta en «There were rallies»: la concentración en la plaza (fondo local): pancartas que suben y bajan; en
//    «protest songs» el de la guitarra canta y las palomas echan a volar; la multitud de delante se mece.
// 5. Corta en «the new one»: delante de la embotelladora (fondo local): un hombre abre la lata nueva y la vacía por la
//    alcantarilla ante la cámara de la tele, la reportera habla al micro, un fotógrafo dispara el flash y la gente
//    aplaude en «cameras».
''', COMUN + r'''
const MU = (f) => en('mullins', f);
const M2 = MU(.2119), M3 = MU(.4140), M4 = MU(.6627), M5 = MU(.8670);
const ABU = { ...NC.senador, delante: null }, abuPal = { C: '#5a6a8a', c: '#42506a', o: '#a83a2a', F: '#4a4a52' };
// la octavilla: la lata tachada
const octavilla = (x, y) => { caja(x, y, x + 11, y + 14, hex('#f6f2dc')); lataPicto(x + 3, y + 2, 1, true); R.rect(x + 2, y + 12, x + 9, y + 12, hex('#8a8478')); };
// un paraguas abierto en (x, y) = la punta del puño
const paraguas = (x, y, col) => { R.rect(x, y - 16, x, y, hex('#3a3440')); R.poligono([[x - 15, y - 14], [x, y - 24], [x + 15, y - 14]], K0); R.poligono([[x - 13, y - 15], [x, y - 23], [x + 13, y - 15]], col);
  for (let i = -13; i <= 13; i += 6) R.linea(x, y - 23, x + i, y - 15, mez(col, K0, 0.3)); R.pset(x, y - 25, K0); };

// ── 1 · la calle de Seattle ──
const p1 = (t) => {
  const o = { encuadre: 'calle', lluvia: 0.8 };
  T.rebelion(R, t, o);
  const grapa = MU(.125), alza = MU(.1597);
  // Mullins entra y grapa la octavilla en la farola
  const w = lin(t, 0, grapa - 0.4), xm = Math.round(lerp(-18, 96, sm(w)));
  const am = R.actor(NC.mullins, xm, 138, t, { dir: t > grapa + 0.5 ? -1 : 1, anda: w > 0 && w < 1, sostiene: t > grapa - 0.5 && t < grapa + 0.4 ? [xm + 17, 110] : undefined, sonrisa: t > alza, dedo: t > grapa + 0.6 && t < alza });
  if (t > grapa - 0.5 && t < grapa) octavilla(am.mano[0] - 4, am.mano[1] - 8);
  if (t >= grapa) octavilla(111, 100);
  // la pareja mayor bajo un paraguas
  const v = lin(t, MU(.06), alza - 0.3), xp = Math.round(lerp(-60, 40, sm(v))), arriba = t > alza;
  const a1 = R.actor(NC.senora75, xp, 138, t, { dir: 1, anda: v > 0 && v < 1, sonrisa: arriba, sostiene: arriba ? [xp + 14, 108] : [xp + 14, 124] });
  const a2 = R.actor(ABU, xp + 18, 138, t, { dir: 1, anda: v > 0 && v < 1, pal: abuPal, tocado: 'gorraPlana', sonrisa: arriba, sostiene: arriba ? [xp + 32, 106] : [xp + 30, 122] });
  if (arriba) { lataV(a1.mano[0], a1.mano[1] + 6); lataV(a2.mano[0], a2.mano[1] + 6); paraguas(xp + 9, 112, hex('#3a6a9a')); }
  else { paraguas(a1.mano[0], a1.mano[1], hex('#3a6a9a')); }
  if (arriba && t < alza + 0.4) for (const [dx, dy] of [[-2, -4], [8, -6], [18, -4]]) R.pset(xp + 9 + dx, 96 + dy, BL);
  T.rebelionDelante(R, t, o);
};

// ── 2 · el garaje de Mullins ──
const fondoGaraje = () => {
  // la pared de tablas (la esquina de Atom, pared de bloques lisa)
  tablasV(0, 0, 319, 122, rp('#3a2a1e', '#5a4230', '#6e5240', '#82644e'), 9, 3);
  for (let y = 0; y <= 50; y++) for (let x = 268; x <= 319; x++) R.pset(x, y, R.tone(rp('#8a8478', '#9a9488', '#aaa498'), 1.2 + (y % 10 === 0 || (x + Math.floor(y / 10) * 10) % 20 === 0 ? -0.9 : 0) + (hh(x, y) - 0.5) * 0.3, x, y));
  // el portón levadizo entreabierto (fuera, la lluvia y la entrada; se pinta en el plano)
  caja(10, 24, 96, 124, hex('#6a6a74')); R.rect(12, 26, 94, 66, hex('#a8acb8')); for (let y = 28; y < 66; y += 5) { R.rect(12, y, 94, y, hex('#7a7e8a')); R.rect(12, y + 1, 94, y + 1, hex('#c8ccd4')); }
  R.rect(50, 62, 56, 64, hex('#3a3440'));
  // el tablero de herramientas perforado con siluetas
  for (let y = 36; y <= 92; y++) for (let x = 128; x <= 226; x++) R.pset(x, y, (x % 4 === 0 && y % 4 === 0) ? hex('#8a6a3a') : hex('#c8a06a'));
  caja(127, 35, 227, 93, hex('#c8a06a'), hex('#5a3a1a')); R.rect(128, 36, 226, 92, hex('#c8a06a')); for (let y = 38; y < 92; y += 4) for (let x = 130; x < 226; x += 4) R.pset(x, y, hex('#8a6a3a'));
  R.rect(136, 44, 138, 66, hex('#5a5a66')); R.rect(132, 44, 142, 48, hex('#3a3a46'));
  R.poligono([[150, 46], [178, 46], [178, 56], [150, 52]], hex('#9aa0aa')); R.rect(178, 44, 186, 58, hex('#8a4a2a'));
  R.rect(196, 44, 198, 70, hex('#9aa0aa')); R.disco(197, 44, 4, hex('#9aa0aa')); R.disco(197, 44, 2, hex('#c8a06a'));
  R.rect(208, 46, 212, 66, hex('#c83030')); R.rect(207, 66, 213, 70, hex('#3a3a46'));
  for (let a = 0; a < 6.28; a += 0.1) { R.pset(Math.round(160 + Math.cos(a) * 9), Math.round(78 + Math.sin(a) * 7), hex('#3a7a3a')); R.pset(Math.round(160 + Math.cos(a) * 7), Math.round(78 + Math.sin(a) * 5), hex('#2a5a2a')); }
  // la balda con botes de pintura y tarros
  R.rect(232, 60, 266, 62, hex('#6a4a2a')); for (let k = 0; k < 4; k++) { caja(234 + k * 8, 50, 240 + k * 8, 60, hex(['#c83030', '#3a6ad8', '#e8c040', '#e8e4d8'][k])); R.rect(234 + k * 8, 50, 240 + k * 8, 51, hex('#9aa0aa')); }
  // las cajas de latas de la de siempre, apiladas a la derecha (por debajo de la esquina de Atom)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) PZ.cajaLatas(R, 282 + c * 22 - (r % 2) * 4, 150 - r * 15, { color: 'rojo' });
  // el suelo de cemento con la mancha de aceite, grietas y el sumidero
  for (let y = 123; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#6a6a6e', '#7a7a7e', '#8a8a8c', '#9a9a9a'), 1.8 + (y - 123) / 60 + (hh(x, y, 6) - 0.5) * 0.6 + (x % 80 === 0 ? -1 : 0), x, y));
  for (let y = 150; y <= 172; y++) for (let x = 170; x <= 230; x++) { const d = Math.hypot((x - 200) / 30, (y - 161) / 10); if (d < 1) R.pset(x, y, mez(R.pget(x, y), hex('#2a2a30'), 0.5 * (1 - d) + 0.2)); }
  R.linea(30, 140, 70, 150, hex('#5a5a5e')); R.linea(70, 150, 84, 168, hex('#5a5a5e'));
  R.rect(120, 168, 130, 172, hex('#3a3a3e')); for (let x = 121; x < 130; x += 2) R.rect(x, 169, x, 171, hex('#7a7a7e'));
  // en el suelo: el neumático viejo, el bidón de aceite y el cubo con la fregona
  R.disco(20, 162, 11, K0); R.disco(20, 162, 10, hex('#2a2a30')); R.disco(20, 162, 6, hex('#5a5a62')); R.disco(20, 162, 4, hex('#8a8a90')); for (let a = 0; a < 6.28; a += 0.7) R.pset(Math.round(20 + Math.cos(a) * 8), Math.round(162 + Math.sin(a) * 8), hex('#4a4a52'));
  caja(80, 150, 96, 174, hex('#2a6a9a')); R.rect(81, 151, 95, 153, hex('#4a8aba')); R.rect(81, 160, 95, 162, hex('#e8c040')); R.rect(90, 146, 93, 150, hex('#9aa0aa'));
  caja(256, 158, 274, 174, hex('#9aa0aa')); R.rect(257, 159, 273, 161, hex('#c8ccd4')); R.linea(266, 158, 276, 128, hex('#c8a06a')); for (let k = 0; k < 6; k++) R.linea(264 + k, 158, 262 + k * 2, 152, hex('#e8e0d0'));
  // el banco de trabajo (lo de encima se pinta en el plano)
  for (let y = 122; y <= 156; y++) for (let x = 104; x <= 250; x++) { const top = y < 128; R.pset(x, y, top ? R.tone(rp('#6a4a2a', '#8a6038', '#a07448'), 1.6 + (y === 122 ? 1 : 0) + Math.sin(x * 0.4) * 0.3, x, y) : (x < 108 || x > 246 || (x > 170 && x < 174)) ? hex('#4a3420') : y > 150 ? hex('#3a2a1a') : hex('#2a2018')); }
  R.rect(103, 121, 251, 121, K0); for (const [x, y] of [[112, 134], [112, 144], [184, 134], [184, 144]]) caja(x, y, x + 50, y + 8, hex('#6a4a2a'));
  // las pancartas apoyadas en la pared de la izquierda
  PZ.pancarta(R, 108, 120, { dibujo: 'lata' }); PZ.pancarta(R, 232, 122, { dibujo: 'corazon' });
};
const p2 = (t) => {
  capa('mu-garaje', fondoGaraje);
  // fuera del portón: la entrada mojada, la lluvia y un coche que pasa (recortado al hueco)
  R.recorte([12, 66, 94, 122]); llena(12, 66, 94, 122, rp('#4a5a6a', '#5a6a7a', '#7a8a9a'), (x, y) => y < 92 ? 2 - (y - 66) / 30 : 0.6 + (hh(x, y, 2) - 0.5) * 0.6 + ((x + Math.floor(t * 4)) % 7 === 0 ? 0.6 : 0));
  rc(12, 74, 94, 90, hex('#3a4a3a')); for (let x = 14; x < 94; x += 7) R.disco(x, 76 + (x % 3), 4, hex('#2a3a2a'));
  { const cx = Math.round(((t * 40) % 220) - 60); for (let i = 0; i < 30; i++) for (let j = 0; j < 9; j++) R.pset(cx + i, 82 + j, j < 3 && (i < 6 || i > 24) ? hex('#4a5a6a') : j > 6 ? K0 : hex('#a83a2a')); }
  lluvia(t, 12, 66, 94, 122, 40, hex('#c8d8e8'), 160, 2); R.recorte(null);
  // la bombilla que se mece con su luz
  { const a = Math.sin(t * 1.4) * 0.25, bx = Math.round(170 + Math.sin(a) * 26), by = Math.round(4 + Math.cos(a) * 26); R.linea(170, 0, bx, by, K0); R.disco(bx, by + 2, 3, hex('#fff2b0')); R.pset(bx, by - 1, hex('#9aa0aa')); luz(bx, by + 2, 60, hex('#fff0c0'), 0.18); }
  const suena = MU(.3205), coge = MU(.3347) + 0.15, prot = MU(.3651);
  // la voluntaria pinta la pancarta (el pincel va y viene)
  { const x = 30, a = R.actor(NC.manifestante2, x, 160, t, { dir: 1, sostiene: [x + 16 + Math.round(Math.sin(t * 5) * 3), 142 + Math.round(Math.cos(t * 5) * 2)], sonrisa: true, sorpresa: t > suena && t < suena + 0.5 });
    caja(48, 130, 76, 160, hex('#e8dcc0')); R.rect(49, 131, 75, 133, hex('#d8ccb0')); lataPicto(56, 136, 2, t > M2 + 1.6); R.rect(60, 160, 62, 172, hex('#a8743c'));
    R.rect(a.mano[0], a.mano[1] - 1, a.mano[0] + 6, a.mano[1], hex('#a8743c')); R.rect(a.mano[0] + 6, a.mano[1] - 2, a.mano[0] + 8, a.mano[1] + 1, hex('#1a1a20'));
    caja(36, 166, 44, 174, hex('#c8c8d0')); R.rect(37, 167, 43, 168, hex('#1a1a20')); }
  // Mullins ante el banco: ordena octavillas; en «phone line» suena todo y descuelga
  const xm = 146, habla = t > coge;
  const am = R.actor(NC.mullins, xm, 162, t, { dir: 1, sostiene: habla ? [xm + 12, 141] : [xm + 15, 128 + (Math.floor(t * 2) % 2) * 2], sorpresa: t > suena && t < coge, habla: habla && Math.sin(t * 8) > 0, sonrisa: t > prot });
  // encima del banco: los tres teléfonos, el contestador, el termo y las octavillas
  const ph = [[132, 122], [178, 122], [222, 122]];
  ph.forEach(([x, y], k) => { if (k === 0 && habla) { R.rect(x - 9, y - 6, x + 9, y, hex('#c8b890')); R.rect(x - 9, y - 6, x + 9, y - 6, K0); return; } PZ.telefono(R, x, y, { suena: t > suena + k * 0.12 && !(k === 0 && habla), t, color: ['#c8b890', '#c83a3a', '#e8e4d8'][k] }); });
  caja(196, 112, 210, 122, hex('#2a2a32')); R.rect(198, 114, 208, 117, hex('#5a5e6a')); R.pset(199, 119, Math.floor(t * 3) % 2 ? hex('#ff3a3a') : hex('#5a1a1a'));
  caja(240, 106, 246, 122, hex('#3a6a4a')); R.rect(239, 104, 247, 106, hex('#9aa0aa'));
  for (let k = 0; k < 4; k++) octavilla(150 + k * 2, 110 - k * 2);
  if (habla) { auricular(am.mano[0], am.mano[1] - 2, hex('#c8b890'), true); cordon(am.mano[0], am.mano[1] + 2, 132, 120); }
  else octavilla(am.mano[0] - 5, am.mano[1] - 10);
  if (t > prot) { const s = sm(lin(t, prot, prot + 0.25)); globo(156, 62 + Math.round((1 - s) * 5), 34, 30, xm + 12, 112); PZ.pancarta(R, 173, 92 + Math.round((1 - s) * 5), { dibujo: 'lata', s: 0.6 }); }
  // el perro dormido debajo del banco
  if (R.perro) R.perro(222, 166, t, { dir: -1, esc: 0.5, duerme: true });
};

// ── 3 · el juzgado ──
const fondoJuzgado = () => {
  // la pared de yeso crema con pilastras (la esquina de Atom, lisa) y el friso de madera
  llena(0, 0, 319, 70, rp('#c8bca0', '#d8ccb0', '#e4dac0'), (x, y) => 1.4 + (hh(x, y, 8) - 0.5) * 0.35 + ((x % 64) < 4 && x < 270 ? 0.7 : 0) + ((x % 64) === 4 && x < 270 ? -0.8 : 0));
  for (let y = 70; y <= 140; y++) for (let x = 0; x <= 319; x++) { const p = x % 30, b = p < 2 || y === 72 || y === 138; R.pset(x, y, R.tone(rp('#3a2214', '#5a3420', '#6e4228', '#86553a'), b ? 1 : 2 + Math.sin(y * 0.3 + Math.floor(x / 30) * 2) * 0.3 + (hh(x, y) - 0.5) * 0.3, x, y)); }
  R.rect(0, 68, 319, 70, hex('#a87a4a'));
  // el sello con la balanza (sin letras)
  R.disco(196, 34, 16, K0); R.disco(196, 34, 15, hex('#c8a040')); R.disco(196, 34, 12, hex('#2a3a6a')); R.icono('balanza', 189, 28, hex('#e8c060'), hex('#1a2a4a'), 2);
  // la bandera de barras y estrellas en su mástil
  R.rect(140, 14, 141, 92, hex('#c8a040')); R.disco(140, 13, 2, hex('#e8c060'));
  for (let j = 0; j < 26; j++) for (let i = 0; i < 26; i++) { const x = 142 + i, y = 18 + j + Math.round(Math.sin(i * 0.3) * 1.5); R.pset(x, y, i < 11 && j < 13 ? ((i + j) % 3 === 0 ? BL : hex('#2a3a7a')) : Math.floor(j / 2) % 2 === 0 ? hex('#c83030') : hex('#f2eee2')); }
  // las ventanas altas de la izquierda (lo de dentro se pinta en el plano)
  for (const x of [8, 64]) { caja(x, 22, x + 44, 66, hex('#e8e0d0')); R.rect(x + 2, 24, x + 42, 64, hex('#8a9aaa')); }
  // el estrado del juez (lo de delante, en el plano), el reloj y la puerta de la derecha
  caja(286, 74, 316, 138, hex('#4a2a16')); R.rect(288, 76, 314, 136, hex('#3a2010')); R.rect(308, 104, 310, 108, hex('#c8a040'));
  // el suelo de madera
  tablas(0, 141, 319, 179, rp('#4a2a16', '#6a4022', '#7e5030', '#96643e'), 6, 4);
  // la barandilla del público al fondo izquierdo con cabezas
  for (let k = 0; k < 7; k++) { const x = 6 + k * 14; R.disco(x + 4, 122, 4, K0); R.disco(x + 4, 122, 3, hex(['#3a2418', '#c89a4a', '#5a3a24', '#9a9aa4', '#2a1c14', '#a8643a', '#7a6a5e'][k])); R.rect(x, 126, x + 8, 134, hex(['#5a6a8a', '#8a5a3a', '#3a6a4a', '#7a3a3a', '#4a4a5a', '#6a5a3a', '#3a5a7a'][k])); }
  for (let x = 0; x <= 106; x++) { R.pset(x, 132, hex('#8a6038')); R.pset(x, 133, hex('#5a3a22')); } for (let x = 2; x <= 106; x += 8) R.rect(x, 132, x + 1, 140, hex('#6a4a2a'));
};
const p3 = (t) => {
  capa('mu-juzgado', fondoJuzgado);
  // la lluvia en las ventanas altas
  for (const x of [8, 64]) { R.recorte([x + 2, 24, x + 42, 64]); llena(x + 2, 24, x + 42, 64, rp('#6a7a8a', '#7a8a9a', '#9aaab8'), (xx, y) => 1.2 + (y - 24) / 40 + (hh(xx, y) - 0.5) * 0.3); nube(((t * 3 + x * 2) % 70) + x - 10, 38, 28, rp('#5a6a7a', '#7a8a9a', '#a8b4c0'), (xx, y) => xx >= x + 2 && xx <= x + 42 && y >= 24 && y <= 64); lluvia(t, x + 2, 24, x + 42, 64, 24, hex('#c8d8e8'), 150, x); R.recorte(null); R.rect(x + 21, 24, x + 23, 64, hex('#e8e0d0')); R.rect(x + 2, 44, x + 42, 45, hex('#e8e0d0')); }
  reloj(250, 36, 9, t);
  const mazo = MU(.5207), sale = MU(.5435), bebe = MU(.5892);
  // el juez tras el estrado: da con el mazo y luego saca la lata azul y bebe
  const xj = 186, golpe = t > mazo - 0.35 && t < sale, lata = t > bebe - 0.4;
  const g = golpe ? (Math.floor((t - mazo + 0.35) * 6) % 2) : 0;
  const aj = R.actor(EL.juezToga ?? NC.senador, xj, 100, t, { dir: -1, sostiene: lata ? (t > bebe + 0.2 && t < bebe + 1.6 ? [xj + 2, 85] : [xj - 2, 92]) : golpe ? [xj - 6, 86 + g * 6] : undefined, sonrisa: t > bebe + 0.3, enfado: golpe, habla: t > sale && t < bebe - 0.4 && Math.sin(t * 8) > 0 });
  // el estrado (por delante del juez)
  for (let y = 92; y <= 140; y++) for (let x = 150; x <= 250; x++) R.pset(x, y, y < 97 ? R.tone(rp('#4a2a16', '#6a4022', '#86553a'), 1.5 + (y === 92 ? 1 : 0), x, y) : R.tone(rp('#2a160a', '#3a2214', '#4e2e1a', '#5e3a22'), 1.8 + Math.sin(y * 0.4 + Math.floor((x - 150) / 25) * 2) * 0.3 + ((x - 150) % 25 < 2 ? -1 : 0), x, y));
  R.rect(149, 91, 251, 91, K0); R.disco(200, 116, 9, hex('#c8a040')); R.disco(200, 116, 7, hex('#2a3a6a')); R.icono('balanza', 197, 113, hex('#e8c060'), hex('#1a2a4a'));
  R.rect(158, 86, 172, 91, hex('#f2ead6')); R.rect(210, 84, 216, 91, hex('#e8e8f0')); R.rect(209, 84, 217, 84, hex('#9aa0aa'));
  // el mazo en su mano o la lata azul
  if (golpe) { const [mx, my] = aj.mano; R.rect(mx - 6, my - 4, mx + 1, my - 1, hex('#5a3420')); R.rect(mx - 6, my - 4, mx + 1, my - 4, hex('#86553a')); R.rect(mx, my - 3, mx + 4, my - 2, hex('#86553a')); if (g === 1) for (const dx of [-8, 2]) R.pset(mx + dx, my + 1, BL); }
  else if (lata) { const [mx, my] = aj.mano; PZ.lata(R, mx, my + 6, { color: 'azul', abierta: true }); }
  else { R.rect(170, 87, 178, 90, hex('#5a3420')); R.rect(176, 88, 180, 89, hex('#86553a')); R.rect(172, 90, 176, 91, hex('#86553a')); }
  // la taquígrafa al pie del estrado, que teclea sin parar
  { const a = R.actor(NC.periodista2, 216, 154, t, { dir: -1, pal: { C: '#8a5a7a', c: '#6a4060' }, sostiene: [214, 142 + (Math.floor(t * 9) % 2)] });
    caja(200, 140, 234, 158, hex('#4e2e1a')); R.rect(201, 141, 233, 142, hex('#6e4228')); caja(206, 134, 220, 141, hex('#2a2a32')); for (let i = 0; i < 4; i++) R.pset(208 + i * 3, 136, hex('#9aa0aa')); R.rect(210, 128 - (Math.floor(t * 2) % 3), 216, 134, hex('#f6f2e4')); }
  // el alguacil de pie a la derecha
  R.actor(EL.guardia ?? NC.voluntario, 262, 150, t, { dir: -1, sorpresa: t > bebe + 0.2 && t < bebe + 1.2 });
  // Mullins y su abogado tras la mesa de delante
  const xm = 46, alza = t < sale, vuela = lin(t, sale, sale + 0.8);
  const am = R.actor(NC.mullins, xm, 152, t, { dir: 1, sostiene: alza ? [xm + 16, 122] : undefined, dedo: !alza && t < bebe - 0.3, sorpresa: t > sale && t < sale + 0.8, enfado: t > bebe + 0.4 });
  R.actor(NC.abogado1, 74, 152, t, { dir: 1, tocado: '', pal: { C: '#3a3a4a', c: '#2a2a36' }, habla: t < mazo && Math.sin(t * 7) > 0.2, sorpresa: t > bebe + 0.2, sostiene: [90, 136] });
  // la demanda: en su mano; sale volando a la papelera
  const demanda = (x, y) => { caja(x, y, x + 13, y + 17, hex('#f6f2e4')); lataPicto(x + 4, y + 3, 1, false); for (let i = 0; i < 3; i++) R.rect(x + 2, y + 12 + i * 2 - 1, x + 11, y + 12 + i * 2 - 1, hex('#8a8478')); R.rect(x + 7, y + 13, x + 11, y + 15, hex('#c83030')); };
  if (alza) demanda(am.mano[0] - 6, am.mano[1] - 16);
  else if (vuela < 1) { const x = lerp(xm + 10, 128, vuela), y = lerp(112, 160, vuela) - Math.sin(vuela * Math.PI) * 40; demanda(Math.round(x), Math.round(y)); }
  // la mesa de delante con carpetas y la jarra de agua; la papelera
  for (let y = 146; y <= 179; y++) for (let x = 0; x <= 116; x++) R.pset(x, y, y < 151 ? R.tone(rp('#5a3420', '#7a4a2a', '#96643e'), 1.6 + (y === 146 ? 1 : 0), x, y) : R.tone(rp('#2a160a', '#3a2214', '#4e2e1a'), 1.5 + Math.sin(x * 0.1 + y * 0.2) * 0.3 + (x % 38 < 2 ? -1 : 0), x, y));
  R.rect(0, 145, 116, 145, K0); caja(8, 140, 30, 146, hex('#c8a06a')); caja(96, 136, 104, 146, hex('#c8dcec')); R.rect(97, 137, 103, 140, hex('#e8f4fc'));
  for (let y = 152; y <= 176; y++) for (let x = 120; x <= 138; x++) { const borde = x === 120 || x === 138 || y === 152 || y === 176; R.pset(x, y, borde ? K0 : (x + y) % 3 === 0 ? hex('#9aa0aa') : hex('#3a2a2a')); }
  if (vuela >= 1) { caja(124, 148, 134, 156, hex('#f6f2e4')); R.icono('X', 127, 149, hex('#c83030'), hex('#f6f2e4')); }
  // el bocadillo de la lata azul del juez
  if (t > bebe + 0.4 && t < bebe + 2.4) R.bocadillo(xj + 20, 70, { icono: '!' });
};

// ── 4 · la concentración en la plaza ──
const fondoPlaza = () => {
  // el cielo tramado (las nubes y las palomas, en el plano)
  llena(0, 0, 319, 70, rp('#6a8ab8', '#7a9ac4', '#9ab4d4', '#b8cce0'), (x, y) => y / 70 * 3 + (hh(x, y, 2) - 0.5) * 0.3);
  // el ayuntamiento de columnas con su frontón y la escalinata
  for (let y = 26; y <= 104; y++) for (let x = 70; x <= 250; x++) R.pset(x, y, R.tone(rp('#a8a090', '#c0b8a8', '#d4ccbc', '#e4dccc'), 2 + (hh(x, y, 4) - 0.5) * 0.4 + ((y - 26) % 9 === 0 ? -0.8 : 0), x, y));
  R.poligono([[64, 30], [160, 10], [256, 30]], K0); R.poligono([[68, 29], [160, 12], [252, 29]], hex('#d8d0c0')); R.poligono([[96, 27], [160, 16], [224, 27]], hex('#b8b0a0'));
  R.disco(160, 22, 5, hex('#c8a040')); R.disco(160, 22, 3, hex('#e8c060'));
  R.rect(62, 30, 258, 34, hex('#e4dccc')); R.rect(62, 34, 258, 35, hex('#8a8478'));
  for (let k = 0; k < 8; k++) { const x = 80 + k * 22; R.rect(x, 36, x + 8, 92, hex('#ece6d8')); R.rect(x + 6, 36, x + 8, 92, hex('#b8b0a0')); R.rect(x, 36, x + 1, 92, hex('#f6f2e8')); R.rect(x - 2, 34, x + 10, 37, hex('#d8d0c0')); R.rect(x - 2, 90, x + 10, 93, hex('#d8d0c0')); }
  for (let k = 0; k < 7; k++) { const x = 90 + k * 22; R.rect(x, 50, x + 10, 82, hex('#4a4a5a')); R.rect(x + 1, 51, x + 9, 81, hex('#6a7a8a')); R.rect(x + 5, 51, x + 5, 81, hex('#4a4a5a')); }
  for (let j = 0; j < 4; j++) R.rect(62 + j * 4, 94 + j * 3, 258 - j * 4, 96 + j * 3, j % 2 ? hex('#b8b0a0') : hex('#d8d0c0'));
  // los árboles de los lados (la copa se mece en el plano) y los edificios de ladrillo
  for (let y = 30; y <= 104; y++) for (let x = 0; x <= 60; x++) R.pset(x, y, (x % 12 < 2 || y % 10 < 1) ? hex('#5a2a22') : R.tone(rp('#7a3a2a', '#8a4a32', '#9a5a3a'), 1.4 + (hh(x, y) - 0.5) * 0.5, x, y));
  for (let y = 40; y <= 104; y++) for (let x = 260; x <= 319; x++) R.pset(x, y, (x % 12 < 2 || y % 10 < 1) ? hex('#4a2a2a') : R.tone(rp('#6a3a3a', '#7a4a42', '#8a5a4a'), 1.4 + (hh(x, y) - 0.5) * 0.5, x, y));
  for (let k = 0; k < 6; k++) { caja(6 + (k % 3) * 18, 40 + Math.floor(k / 3) * 26, 18 + (k % 3) * 18, 56 + Math.floor(k / 3) * 26, hex('#9ab4d4')); caja(266 + (k % 3) * 18, 54 + Math.floor(k / 3) * 22, 278 + (k % 3) * 18, 68 + Math.floor(k / 3) * 22, hex('#9ab4d4')); }
  // el adoquinado de la plaza
  for (let y = 105; y <= 179; y++) { const f = (y - 105) / 75, lado = 6 + f * 10; for (let x = 0; x <= 319; x++) { const cx = (x - 160) / lado, cy = (y - 105) / (3 + f * 5), jx = Math.abs(cx - Math.round(cx)) < 0.08, jy = Math.abs(cy - Math.round(cy)) < 0.12;
    R.pset(x, y, jx || jy ? hex('#6a6460') : R.tone(rp('#8a8278', '#9a9288', '#aaa298'), 1.4 + (hh(Math.round(cx), Math.round(cy)) - 0.5) * 1.2, x, y)); } }
  // las farolas
  for (const x of [66, 254]) { R.rect(x, 60, x + 1, 112, hex('#2a2a32')); R.rect(x - 3, 54, x + 4, 60, hex('#2a2a32')); R.rect(x - 2, 55, x + 3, 59, hex('#f0e0a0')); R.rect(x - 3, 112, x + 4, 114, hex('#2a2a32')); }
};
const p4 = (t) => {
  capa('mu-plaza', fondoPlaza);
  const NUB = rp('#a8b4c8', '#d0d8e4', '#f2f4f8');
  const cielo = (x, y) => y < ((x < 62) ? 29 : (x > 258) ? 39 : 10 + Math.abs(x - 160) * 20 / 96);
  nube(((t * 4 + 30) % 380) - 30, 16, 36, NUB, cielo); nube(((t * 7 + 230) % 380) - 30, 26, 26, NUB, cielo); nube(((t * 2 + 140) % 380) - 30, 30, 46, rp('#98a4b8', '#c0c8d8', '#e0e4ec'), cielo);
  pajaros(t, 20, hex('#4a4a5a'), 2, 10, 60, 0);
  // las copas de los árboles que se mecen
  for (const [cx, cy] of [[34, 70], [292, 76]]) for (let k = 0; k < 7; k++) { const a = k * 0.9, sw = Math.round(Math.sin(t * 1.6 + k) * 1.5); R.disco(cx + Math.round(Math.cos(a) * 14) + sw, cy + Math.round(Math.sin(a) * 9), 10, hex(k % 2 ? '#3a6a3a' : '#4a7a3a')); }
  for (const [cx, cy] of [[34, 70], [292, 76]]) { R.disco(cx - 4, cy - 6, 8, hex('#5a8a4a')); R.rect(cx - 2, cy + 8, cx + 2, cy + 36, hex('#4a3020')); }
  // la guirnalda de banderines entre las farolas, que ondea
  for (let i = 0; i <= 18; i++) { const u = i / 18, x = Math.round(66 + u * 188), y = Math.round(58 + Math.sin(u * Math.PI) * 10); R.pset(x, y, K0); if (i % 2 === 0 && i < 18) { const c = hex(['#c83030', '#f2eee2', '#3a6ad8'][i / 2 % 3]); R.poligono([[x, y + 1], [x + 8, y + 2], [x + 4 + Math.round(Math.sin(t * 5 + i)), y + 8]], c); } }
  const cancion = MU(.7550), palomas = cancion + 0.1;
  // las palomas de la cornisa echan a volar al empezar la canción
  for (let k = 0; k < 5; k++) { const v = Math.max(0, t - palomas - k * 0.08), x = Math.round(100 + k * 26 + v * (20 + k * 6)), y = Math.round(30 - v * (24 + k * 3)); if (y < -4) continue; const a = v > 0 && Math.sin(t * 16 + k) > 0;
    R.rect(x, y, x + 2, y + 1, hex('#8a8a9a')); R.pset(x - 1, y - (a ? 1 : 0), hex('#6a6a7a')); R.pset(x + 3, y - (a ? 1 : 0), hex('#6a6a7a')); R.pset(x + 2, y - 1, hex('#5a5a6a')); }
  // la gente del fondo (pequeña) con cartelitos que suben y bajan
  for (let k = 0; k < 26; k++) { const x = 10 + k * 12 + Math.round(hh(k, 1) * 5), y = 116 + (k % 2) * 3, up = Math.round(Math.max(0, Math.sin(t * 6 + k * 1.3)) * 2);
    mini(x, y - up, hex(['#c83030', '#3a6a9a', '#e8c040', '#4a8a5a', '#8a5a3a'][k % 5]), hex(['#3a2418', '#c89a4a', '#1c1424', '#7a6a5e'][k % 4]), t, false, k);
    if (k % 3 === 0) { R.rect(x + 2, y - 22 - up, x + 2, y - 12 - up, hex('#8a6038')); caja(x - 2, y - 28 - up, x + 7, y - 20 - up, hex('#f6f2dc')); R.rect(x, y - 26 - up, x + 2, y - 22 - up, hex('#c8382e')); } }
  // el cantante en su caja con la guitarra; las notas que suben
  const xc = 140, toca = t > cancion;
  caja(xc - 6, 140, xc + 22, 156, hex('#a8743c')); R.rect(xc - 5, 147, xc + 21, 147, hex('#7a5028'));
  const ac = R.actor(NC.estudiante ?? NC.voluntario, xc, 140, t, { dir: 1, pal: { C: '#a86a3a', c: '#7a4a28', H: '#6a4426', h: '#8a6040' }, sostiene: [xc + 12, 126 + (toca ? Math.round(Math.sin(t * 12)) : 0)], habla: toca && Math.sin(t * 7) > -0.2, sonrisa: !toca });
  { const [mx, my] = ac.mano; R.disco(mx - 4, my + 3, 5, K0); R.disco(mx - 4, my + 3, 4, hex('#c8843a')); R.disco(mx - 4, my + 3, 1, K0); R.linea(mx - 1, my + 1, mx + 12, my - 7, K0); R.linea(mx, my + 1, mx + 12, my - 6, hex('#8a5a3a')); R.rect(mx + 11, my - 9, mx + 13, my - 6, K0); }
  if (toca) for (let k = 0; k < 4; k++) { const u = ((t - cancion) * 0.8 + k / 4) % 1, x = Math.round(xc + 26 + k * 6 + Math.sin(u * 6 + k) * 4), y = Math.round(118 - u * 50); if (y < 60) continue; R.rect(x, y, x + 1, y + 2, K0); R.rect(x + 1, y - 5, x + 1, y, K0); R.pset(x + 2, y - 5, K0); R.pset(x + 3, y - 4, K0); }
  // la fila de manifestantes con pancartas que suben y bajan (al ritmo)
  const fila = [[NC.manifestante, 24, 'lata', 0], [NC.manifestante2, 64, 'corazon', 0.4], [ABU, 98, 'lata', 0.8], [NC.senora75, 186, 'corazon', 0.2], [NC.manifestante, 222, 'corazon', 0.6], [NC.manifestante2, 262, 'lata', 1.0]];
  fila.forEach(([def, x, dib, d], k) => { const up = Math.round(Math.max(0, Math.sin(t * 5 + d * 4)) * 3);
    const o = { dir: x < 140 ? 1 : -1, habla: Math.sin(t * 6 + k) > 0, sonrisa: Math.sin(t * 6 + k) <= 0, salto: up > 2 ? 1 : 0 };
    if (def === ABU || def === NC.senora75) { const a = R.actor(def, x, 160, t, { ...o, pal: def === ABU ? abuPal : undefined, tocado: def === ABU ? 'gorraPlana' : undefined, sostiene: [x + (o.dir > 0 ? 14 : 0), 134 - up] }); PZ.pancarta(R, a.mano[0], a.mano[1] + 8, { dibujo: dib, s: 0.8 }); }
    else R.actor(def, x, 160, t, { ...o, dibujo: dib }); });
  // la multitud de delante (de espaldas), que se mece: va por delante de todos
  for (let k = 0; k < 18; k++) { const x = -6 + k * 19, sw = Math.round(Math.sin(t * 3 + k * 0.8) * 2), y = 168 + (k % 2) * 4 + Math.abs(sw);
    const ropa = hex(['#3a4a6a', '#6a3a3a', '#3a5a3a', '#5a5a6a', '#7a5a3a'][k % 5]), pelo = hex(['#2a1c14', '#5a3a24', '#8a6a3a', '#1c1424'][k % 4]);
    R.disco(x + 10 + sw, y - 6, 7, K0); R.disco(x + 10 + sw, y - 6, 6, pelo); R.rect(x + sw, y + 1, x + 20 + sw, 179, K0); R.rect(x + 1 + sw, y + 2, x + 19 + sw, 179, ropa); R.rect(x + 1 + sw, y + 2, x + 19 + sw, y + 3, mez(ropa, BL, 0.2));
    if (k % 4 === 1) { const up = Math.round(Math.max(0, Math.sin(t * 5 + k)) * 3); R.rect(x + 18 + sw, y - 30 - up, x + 19 + sw, y, hex('#8a6038')); } }
};

// ── 5 · la alcantarilla, ante las cámaras ──
const fondoEmbotelladora = () => {
  // el cielo gris tramado (las nubes, en el plano)
  llena(0, 0, 319, 40, rp('#7a8494', '#8a94a4', '#9aa4b2'), (x, y) => 0.6 + y / 40 * 2 + (hh(x, y, 9) - 0.5) * 0.3);
  // la nave de ladrillo de la embotelladora con el muelle de carga
  for (let y = 30; y <= 112; y++) for (let x = 0; x <= 319; x++) { const fila = Math.floor(y / 4), jx = (x + (fila % 2) * 5) % 10 === 0, jy = y % 4 === 0;
    R.pset(x, y, jx || jy ? hex('#6a5a52') : R.tone(rp('#7a3a2a', '#8a4632', '#9a523a', '#aa6244'), 1.6 + (hh(Math.floor((x + (fila % 2) * 5) / 10), fila, 2) - 0.5) * 1.2, x, y)); }
  R.rect(0, 30, 319, 33, hex('#5a5a62')); for (let x = 0; x < 320; x += 4) R.pset(x, 29, hex('#5a5a62'));
  // el cartel grande del tejado con la lata nueva (banda gris) y un «!»
  R.rect(186, 8, 188, 30, hex('#4a4a52')); R.rect(258, 8, 260, 30, hex('#4a4a52'));
  // la persiana metálica del muelle y su luz
  caja(176, 50, 262, 112, hex('#9aa0aa')); for (let y = 52; y < 112; y += 3) { R.rect(178, y, 260, y, hex('#7a7e8a')); R.rect(178, y + 1, 260, y + 1, hex('#c8ccd4')); }
  R.rect(170, 44, 268, 48, hex('#3a3a42')); R.rect(214, 40, 224, 44, hex('#2a2a32'));
  // la bajante de agua, la lámpara del muelle y los palés con cajas de la lata nueva
  R.rect(164, 34, 167, 112, hex('#6a6e7a')); R.rect(164, 34, 164, 112, hex('#9aa0aa')); for (const y of [50, 80]) R.rect(162, y, 169, y + 1, hex('#4a4e5a')); R.rect(160, 110, 170, 112, hex('#6a6e7a'));
  for (const [x, n] of [[268, 3], [292, 2]]) { R.rect(x, 108, x + 22, 112, hex('#a8844a')); for (let i = x; i <= x + 22; i += 5) R.rect(i, 108, i + 1, 112, hex('#6a4a2a')); for (let r = 0; r < n; r++) PZ.cajaLatas(R, x + 11, 108 - r * 13, { color: 'rojo', s: 0.8 }); }
  // las ventanas de la nave con rejilla
  for (const x of [34, 84]) { caja(x, 54, x + 30, 80, hex('#5a6a7a')); for (let i = x + 4; i < x + 30; i += 5) R.rect(i, 55, i, 79, hex('#3a4a5a')); R.rect(x + 1, 67, x + 29, 67, hex('#3a4a5a')); }
  // la acera, el bordillo con la alcantarilla, la cuneta y el asfalto
  for (let y = 112; y <= 140; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, ((x + Math.floor(y / 14) * 9) % 26 === 0 || y % 14 === 0) ? hex('#6a6a6e') : R.tone(rp('#8a8a8e', '#9a9a9e', '#aaaaae'), 1.4 + (hh(x, y, 3) - 0.5) * 0.5, x, y));
  for (let y = 141; y <= 148; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, y === 141 ? hex('#c8c8cc') : R.tone(rp('#6a6a70', '#7a7a80', '#8a8a90'), 1.2 + (hh(x, y) - 0.5) * 0.5, x, y));
  caja(136, 141, 178, 149, K0); for (let x = 139; x < 176; x += 4) R.rect(x, 143, x + 1, 147, hex('#3a3a42'));
  for (let y = 149; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#3a3a42', '#4a4a52', '#56565e', '#66666e'), 1.6 + (hh(x, y, 4) - 0.5) * 1.1 + (y < 154 ? -0.6 : 0), x, y));
  for (let x = 20; x < 320; x += 60) R.rect(x, 172, x + 28, 174, hex('#e8d060'));
  // los charcos
  for (const [cx, cy, w] of [[60, 162, 30], [250, 166, 40]]) for (let y = cy - 4; y <= cy + 4; y++) for (let x = cx - w; x <= cx + w; x++) if (((x - cx) / w) ** 2 + ((y - cy) / 4) ** 2 < 1) R.pset(x, y, mez(hex('#7a8494'), hex('#3a3a42'), 0.3 + (y - cy + 4) / 16));
  // la boca de riego y la papelera
  R.rect(20, 120, 26, 138, hex('#c8a040')); R.rect(18, 118, 28, 121, hex('#c8a040')); R.rect(16, 126, 30, 128, hex('#a8802a'));
  caja(296, 116, 312, 138, hex('#3a5a3a')); R.rect(294, 114, 314, 117, hex('#2a4a2a'));
};
const p5 = (t) => {
  capa('mu-embot', fondoEmbotelladora);
  const NUB = rp('#6a7484', '#8a94a4', '#aab2be');
  nube(((t * 3 + 60) % 380) - 30, 12, 50, NUB, (x, y) => y < 30); nube(((t * 6 + 250) % 380) - 30, 20, 30, NUB, (x, y) => y < 30);
  // el cartel grande: la lata nueva y su «!»
  caja(178, 2, 270, 28, hex('#f2eee2')); for (let y = 3; y <= 27; y++) for (let x = 179; x <= 269; x++) R.pset(x, y, R.tone(rp('#c8382e', '#d84a3a', '#e85a4a'), 1 + (x - 179) / 60, x, y));
  lataN(212, 26, 1.2); R.icono('!', 236, 8, hex('#f6e040'), K0, 2); R.rect(178, 2, 270, 3, hex('#f6f2e4')); for (let k = 0; k < 3; k++) R.disco(196 + k * 30, 30, 1, Math.floor(t * 2 + k) % 2 ? hex('#fff2b0') : hex('#8a7a4a'));
  // la luz del muelle que parpadea y la lluvia fina
  R.disco(219, 46, 2, Math.floor(t * 2) % 2 ? hex('#f0c040') : hex('#8a6a24'));
  lluvia(t, 0, 0, 319, 179, 70, hex('#b8c4d4'), 150, 5);
  const abre = M5, vierte = MU(.8974), aplau = MU(.9658);
  // la gente detrás, en la acera, con sus cartelitos; aplauden en «cameras»
  for (let k = 0; k < 14; k++) { const x = 6 + k * 13 + (k > 6 ? 120 : 0), y = 118, sal = t > aplau && Math.sin(t * 12 + k) > 0 ? 2 : 0; if (x > 300) continue;
    mini(x, y - sal, hex(['#3a6a9a', '#c83030', '#e8c040', '#4a8a5a', '#8a5a3a'][k % 5]), hex(['#3a2418', '#c89a4a', '#1c1424'][k % 3]), t, false, k);
    if (k % 2 === 0) { R.rect(x + 2, y - 22 - sal, x + 2, y - 12, hex('#8a6038')); caja(x - 2, y - 28 - sal, x + 7, y - 20 - sal, hex('#f6f2dc')); lataPicto(x, y - 27 - sal, 1, true); } }
  // el fotógrafo con el flash
  const fl = (t > MU(.94) && t < MU(.94) + 0.1) || (t > aplau + 0.3 && t < aplau + 0.4);
  { const a = R.actor(NC.periodista, 40, 138, t, { dir: 1, sostiene: [56, 116], sorpresa: false });
    caja(a.mano[0] - 2, a.mano[1] - 4, a.mano[0] + 8, a.mano[1] + 3, hex('#2a2a32')); R.disco(a.mano[0] + 3, a.mano[1], 2, hex('#5a6a8a')); caja(a.mano[0], a.mano[1] - 8, a.mano[0] + 6, a.mano[1] - 4, hex('#c8ccd4'));
    if (fl) { luz(a.mano[0] + 3, a.mano[1] - 6, 30, BL, 0.8); } }
  // el hombre de la lata: la abre y la vacía por la alcantarilla
  const xh = 136, inclina = sm(lin(t, vierte - 0.2, vierte + 0.2)), vacia = lin(t, vierte + 0.2, vierte + 3.2);
  const ah = R.actor(NC.manifestante, xh, 140, t, { dir: 1, sostiene: [xh + 16, 124 + Math.round(inclina * 4)], sonrisa: t > aplau, enfado: t > abre && t < vierte, sinObjeto: true });
  { const [mx, my] = ah.mano;
    if (inclina < 0.5) lataN(mx + 1, my + 8, 1, { abierta: t > abre + 0.3, espuma: t > abre + 0.3 && t < abre + 0.8 ? 0.4 : 0, t });
    else { // la lata tumbada, con la boca hacia la alcantarilla
      // la lata inclinada, boca abajo hacia la alcantarilla (tapa gris a la derecha, abajo)
      const th = 0.95, ax = Math.cos(th), ay = Math.sin(th), nx = -ay, ny = ax, cx = mx + 5, cy = my - 1;
      const P = (u, v) => [Math.round(cx + ax * u + nx * v), Math.round(cy + ay * u + ny * v)];
      R.poligono([P(-10, -6.5), P(10, -6.5), P(10, 6.5), P(-10, 6.5)], K0); R.poligono([P(-9, -5.5), P(9, -5.5), P(9, 5.5), P(-9, 5.5)], hex('#c8382e'));
      R.poligono([P(-9, 3), P(9, 3), P(9, 5.5), P(-9, 5.5)], hex('#8a2018')); R.poligono([P(-9, -5.5), P(9, -5.5), P(9, -3.5), P(-9, -3.5)], hex('#e2675c'));
      R.poligono([P(-2, -5.5), P(2, -5.5), P(2, 5.5), P(-2, 5.5)], hex('#9a9aa4')); R.poligono([P(8, -5.5), P(10, -5.5), P(10, 5.5), P(8, 5.5)], hex('#c8ccd4')); R.poligono([P(-10, -5), P(-8.5, -5), P(-8.5, 5), P(-10, 5)], hex('#9a9aa4'));
      if (vacia < 1) { // el chorro marrón con brillos y la espuma que salta de la reja
        const fin = vacia > 0.85 ? 0.5 : 1;
        for (let y = my + 9; y <= 145; y++) { const xc = mx + 13 + Math.round((y - my) * 0.18); for (let i = 0; i <= (fin < 1 ? 0 : 2); i++) R.pset(xc + i, y, (y + Math.floor(t * 24) + i) % 5 === 0 ? hex('#c89a6a') : i === 0 ? hex('#3a1a0c') : hex('#6a3a1e')); }
        for (let k = 0; k < 10; k++) { const u = ((t * 2.4 + k / 10) % 1), bx = Math.round(mx + 22 + Math.cos(k * 1.7) * (3 + u * 12)), by = Math.round(143 - Math.sin(u * Math.PI) * (5 + (k % 3) * 2)); R.pset(bx, by, k % 2 ? hex('#f4ece0') : hex('#c89a6a')); if (k % 3 === 0) R.pset(bx + 1, by, hex('#f4ece0')); }
        for (let x = mx + 14; x <= mx + 34; x++) if ((x + Math.floor(t * 10)) % 3) R.pset(x, 141, hex('#e8d8c0')); } } }
  // el charco marrón que se extiende por la cuneta hacia la reja
  if (vacia > 0) { const w = Math.round(6 + vacia * 22); for (let y = 149; y <= 152; y++) for (let x = 166 - w; x <= 166 + w; x++) if (Math.abs(x - 166) / w + (y - 149) / 5 < 1) R.pset(x, y, mez(R.pget(x, y), hex('#4a2414'), 0.7)); }
  // la reportera habla al micro hacia la cámara; el cámara la graba
  const ar = R.actor(NC.periodista2, 204, 140, t, { dir: -1, habla: Math.sin(t * 7) > 0, sonrisa: t > aplau });
  const acm = R.actor(NC.camarografo, 240, 140, t, { dir: -1 });
  R.disco(acm.cabeza[0] - 12, acm.cabeza[1] + 12, 1, Math.floor(t * 3) % 2 ? hex('#ff2a2a') : hex('#5a1a1a'));
  // el coche que pasa por delante (por delante de todos)
  { const cx = Math.round(lerp(-60, 380, lin(t, M5 + 3.2, M5 + 5.6))); if (cx > -50 && cx < 330) { for (let i = 0; i < 46; i++) for (let j = 0; j < 12; j++) { const yy = 176 - j, sl = j > 7 && (i < 8 || i > 38); if (sl) continue; R.pset(cx + i, yy, j === 11 || i === 0 || i === 45 ? K0 : j > 7 ? hex('#9ac8e0') : j < 3 ? hex('#2a3a6a') : hex('#3a5aa8')); }
    for (const wx of [cx + 9, cx + 36]) { R.disco(wx, 177, 4, K0); R.disco(wx, 177, 2, hex('#6a6a74')); } for (let k = 0; k < 8; k++) R.pset(cx - 4 - k, 170 + (k % 3) * 2, hex('#c8d4e4')); } }
};

const efectos = [[MU(.125), 'golpecito'], [MU(.1597), 'pop'], [MU(.3205), 'ring'], [MU(.3347) + 0.15, 'cuelga'], [MU(.5207) - 0.2, 'golpecito'], [MU(.5435), 'papel'], [MU(.5892), 'pop'], [MU(.60), 'burbujas'], [M4 + 0.1, 'publico'], [MU(.7550), 'palmada'], [M5 + 0.3, 'pop'], [MU(.8974) + 0.2, 'burbujas'], [MU(.94), 'flash'], [MU(.9658), 'publico'], [M5 + 3.3, 'coche']];
T.rodar(E, R, [[0, p1], [M2, p2], [M3, p3], [M4, p4], [M5, p5]], { efectos, año: 1985 });
''')
