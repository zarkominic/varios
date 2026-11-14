import re

E = {}

# Marcas de la voz (marcas-ep28.json): inicio y «_fin» de cada frase. En el cuerpo se escribe @t(4.0), @s(…), @e(…)
# con el segundo de la escena en que cae la palabra (linea.json); al generar se convierte en en('marca', fracción).
MARCAS = {'t': ('truco', 0.5, 12.352), 's': ('sorbos', 0.9, 17.511), 'e': ('escaner', 1.5, 19.071)}


def _en(m):
    k, a, b = MARCAS[m.group(1)]
    return "en('%s', %.4f)" % (k, (float(m.group(2)) - a) / (b - a))


def F(s):
    return re.sub(r'@([tse])\(([\d.]+)\)', _en, s)


# Lo común a las tres escenas del grupo 8 (se antepone a cada cuerpo): el reparto, el búfer de las capas fijas, las
# texturas y las piezas pequeñas que se pintan en la escena (las de escenas7.py y las propias del grupo).
COMUN = r'''
import { ELENCO_NC as NC } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_NC;
const K0 = hex('#1a1420');
const rp = (...a) => a.map((s) => hex(s));
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c, d, a) => { const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255, r2 = d & 255, g2 = (d >>> 8) & 255, b2 = (d >>> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(g + (g2 - g) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
const luz = (cx, cy, r, col, a) => { for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) { const g = 1 - Math.hypot(x - cx, y - cy) / r; if (g > 0) R.pset(x, y, mez(R.pget(x, y), col, a * g * g)); } };
// cono de luz de un foco: del punto (x0, y0) hacia abajo, abierto hasta ancho w en y1
const cono = (x0, y0, x1, y1, w, col, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0), cx = x0 + (x1 - x0) * u, hw = 2 + w * u;
  for (let x = Math.max(0, Math.floor(cx - hw)); x <= Math.min(319, Math.ceil(cx + hw)); x++) { const g = 1 - Math.abs(x - cx) / hw; if (g > 0 && hh(x, y, 9) < 0.5 + g * 0.5) R.pset(x, y, mez(R.pget(x, y), col, a * g * (1 - u * 0.4))); } } };
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / Math.max(1e-6, a1 - a0)));
const sm = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en un búfer y en cada fotograma se copia (sin R.usar() a secas)
const capa = (k, f) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const p = R.usar(b); f(); R.usar(p); CAPAS.set(k, b); } R.copiar(b); };
const llena = (x0, y0, x1, y1, ramp, f) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone(ramp, f(x, y), x, y)); };
// rect que respeta R.recorte (R.rect no lo respeta)
const rc = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };
const caja = (x0, y0, x1, y1, c, b = K0) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// tablas horizontales con veta, juntas y algún nudo
const tablas = (x0, y0, x1, y1, ramp, alto = 6, k = 0, l = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto === alto - 1;
  for (let x = x0; x <= x1; x++) { const largo = 40 + Math.floor(hh(fila, 3, k) * 40), jx = (x + Math.floor(hh(fila, 7, k) * 60)) % largo === 0;
    if (jy || jx) { R.pset(x, y, ramp[0]); continue; }
    const veta = Math.sin(x * 0.11 + fila * 2.7 + Math.sin(x * 0.03 + fila) * 2 + ((y - y0) % alto) * 0.8) * 0.45;
    const nudo = Math.hypot(((x * 7 + fila * 31) % 97) - 48, (((y - y0) % alto) - alto / 2) * 3) < 3 ? -0.9 : 0;
    R.pset(x, y, R.tone(ramp, 1.6 + veta + nudo + (hh(fila, 1, k) - 0.5) * 0.6 + l, x, y)); } } };
// paneles verticales de madera (zócalo, estrado) con veta y moldura
const paneles = (x0, y0, x1, y1, ramp, ancho = 24, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = (x - x0) % ancho, borde = i === 0 || i === ancho - 1 || y === y0 || y === y1, marco = i < 3 || i > ancho - 4 || y - y0 < 3 || y1 - y < 3;
  R.pset(x, y, borde ? ramp[0] : R.tone(ramp, (marco ? 2.3 : 1.4) + Math.sin(y * 0.5 + Math.sin(x * 0.3 + k) * 2) * 0.35 + (hh(x, y, k) - 0.5) * 0.4, x, y)); } };
// nube de tres tonos (sombra abajo, luz arriba); ok(x, y) recorta
const nube = (cx, cy, w, T3, ok = null) => { const bs = [[0, -w * 0.13, w * 0.24], [-w * 0.27, 0, w * 0.19], [w * 0.27, 0, w * 0.2], [-w * 0.06, 0.02 * w, w * 0.26]];
  const x0 = Math.floor(cx - w * 0.5), x1 = Math.ceil(cx + w * 0.5), y0 = Math.floor(cy - w * 0.4), y1 = Math.ceil(cy + w * 0.12);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let d = 9; for (const [dx, dy, r] of bs) { const q = Math.hypot(x + 0.5 - cx - dx, (y + 0.5 - cy - dy) * 1.35) / r; if (q < d) d = q; }
    if (d > 1 || (ok && !ok(x, y))) continue; R.pset(x, y, R.tone(T3, 2.7 - (y - y0) / Math.max(1, y1 - y0) * 2.4 - (d > 0.82 ? 0.5 : 0), x, y)); } };
// pájaros que cruzan aleteando (x0–x1)
const pajaros = (t, y, c, n = 3, v = 14, x0 = 0, x1 = 260) => { for (let k = 0; k < n; k++) { const x = Math.round(x0 + ((t * v + k * 23 + k * k * 9) % (x1 - x0 + 20)) - 10), yy = Math.round(y + k * 5 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k * 2) > 0;
  if (x < x0 || x > x1) continue; R.pset(x, yy, c); R.pset(x - 1, yy - (a ? 1 : 0), c); R.pset(x + 1, yy - (a ? 1 : 0), c); R.pset(x - 2, yy - (a ? 2 : -1), c); R.pset(x + 2, yy - (a ? 2 : -1), c); } };
// gente diminuta del fondo (5 × 11): ropa, pelo; anda alterna las piernas
const mini = (x, y, ropa, pelo, t, anda = false, k = 0) => { x = Math.round(x); y = Math.round(y); const piel = hex(['#e8b088', '#c08860', '#8a5a3a'][k % 3]), f = anda ? Math.floor(t * 6 + k) % 2 : 0;
  rc(x + 1, y - 11, x + 3, y - 9, piel); rc(x + 1, y - 12, x + 3, y - 11, pelo); rc(x, y - 8, x + 4, y - 4, ropa); R.pset(x + 2, y - 8, mez(ropa, 0xffffffff, 0.3));
  rc(x + 1, y - 3, x + 1, y - f, hex('#2a2a3a')); rc(x + 3, y - 3, x + 3, y - (1 - f), hex('#2a2a3a')); };
// cabeza diminuta de público sentado (5 × 6), sin piernas
const cabecita = (x, y, ropa, pelo, k = 0, t = 0) => { x = Math.round(x); y = Math.round(y - (Math.sin(t * 1.3 + k * 2.1) > 0.92 ? 1 : 0)); const piel = hex(['#e8b088', '#c08860', '#8a5a3a', '#f0c8a0'][k % 4]);
  rc(x + 1, y, x + 3, y + 2, piel); rc(x + 1, y - 1, x + 3, y - 1, pelo); if (k % 3 === 0) rc(x, y, x, y + 1, pelo); rc(x, y + 3, x + 4, y + 5, ropa); };
// linóleo a cuadros en perspectiva con su brillo
const linoleo = (x0, y0, x1, y1, a, b, kb = 0) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0), lado = 6 + f * 10;
  for (let x = x0; x <= x1; x++) { const cx = Math.floor((x - 160) / lado + 100), cy = Math.floor((y - y0) / (3 + f * 6)), c = (cx + cy) % 2 ? a : b; R.pset(x, y, hh(x, y, kb) > 0.94 ? mez(c, 0xff000000, 0.12) : c); } } };
// tubo fluorescente del techo (w de largo); on: 1 encendido, 0 apagado
const fluo = (x, y, w, on = 1) => { R.rect(x - 1, y - 1, x + w + 1, y + 3, hex('#5a5a66')); R.rect(x, y, x + w, y + 2, on ? hex('#f6fbff') : hex('#9aa0aa')); if (on) R.rect(x, y + 3, x + w, y + 3, hex('#c8d8e8')); };
// el corazón (7 × 6 celdas a escala s) con su contorno y su brillo
const CORA = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
const corazon = (x, y, s, c, borde = K0) => { x = Math.round(x); y = Math.round(y);
  for (let j = -1; j <= 6; j++) for (let i = -1; i <= 7; i++) { const en1 = (a, b) => (CORA[b] || '')[a] === '#'; if (en1(i, j)) continue; if (en1(i + 1, j) || en1(i - 1, j) || en1(i, j + 1) || en1(i, j - 1)) rc(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, borde); }
  CORA.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') rc(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, (i === 1 && j === 1) ? hex('#ffd0d8') : (i > 4 || j > 3) ? mez(c, K0, 0.25) : c); }); };
// la bandera de EE. UU. que ondea (sin escudos): barras rojas y blancas, el cantón azul con puntitos blancos
const bandera = (x, y, w, h, t, k = 0) => { for (let i = 0; i < w; i++) { const ola = Math.sin(i * 0.35 - t * 5 + k) * 1.6 * (i / w), sh = Math.cos(i * 0.35 - t * 5 + k) * 0.5;
  for (let j = 0; j < h; j++) { const yy = Math.round(y + j + ola), canton = i < w * 0.42 && j < h * 0.54; let c;
    if (canton) c = ((i + j) % 3 === 0 && (j % 2 === 0)) ? hex('#f6f6ee') : hex('#2a3a7a'); else c = Math.floor(j / Math.max(1, h / 7)) % 2 ? hex('#f0ece0') : hex('#b82a2a');
    R.pset(x + i, yy, sh > 0.3 ? mez(c, 0xffffffff, 0.18) : sh < -0.3 ? mez(c, K0, 0.22) : c); } } };
// el abanico de banderines del 4 de julio (medio disco con anillos azul, blanco y rojo), centro arriba en (cx, y)
const abanico = (cx, y, r) => { for (let j = 0; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.4) continue; const f = d / r;
  const pl = Math.floor((Math.atan2(j, i) / Math.PI) * 10) % 2; R.pset(cx + i, y + j, d > r - 0.6 ? K0 : f < 0.36 ? (hh(i, j, 3) > 0.8 ? hex('#ffffff') : hex('#2a3a8a')) : f < 0.66 ? (pl ? hex('#f0ece0') : hex('#d8d4c8')) : (pl ? hex('#c83030') : hex('#a82424'))); } };
// reloj de pared redondo con sus horas y agujas (h y m en vueltas)
const reloj = (cx, cy, r, h, m, cara = hex('#f2ecd8')) => { R.disco(cx, cy, r + 1, K0); R.disco(cx, cy, r, hex('#7a5a2a')); R.disco(cx, cy, r - 1, cara);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.sin(a) * (r - 2)), Math.round(cy - Math.cos(a) * (r - 2)), K0); }
  R.linea(cx, cy, Math.round(cx + Math.sin(h * Math.PI * 2) * (r * 0.5)), Math.round(cy - Math.cos(h * Math.PI * 2) * (r * 0.5)), K0);
  R.linea(cx, cy, Math.round(cx + Math.sin(m * Math.PI * 2) * (r - 2)), Math.round(cy - Math.cos(m * Math.PI * 2) * (r - 2)), hex('#3a2a2a')); R.pset(cx, cy, hex('#c83030')); };
// planta en maceta (hojas que se mecen)
const planta = (x, y, t, h = 22, k = 0) => { for (let i = 0; i < 9; i++) { const a = -1.2 + i * 0.3 + Math.sin(t * 1.4 + i + k) * 0.08, l = h * (0.6 + hh(i, k) * 0.4);
  for (let s = 0; s < l; s++) { const px = Math.round(x + Math.sin(a) * s), py = Math.round(y - 8 - Math.cos(a) * s); R.pset(px, py, s > l - 3 ? hex('#7ac85a') : (s + i) % 4 === 0 ? hex('#2a6a32') : hex('#3e8a3e')); R.pset(px + 1, py, hex('#2a5a2a')); } }
  R.rect(x - 6, y - 9, x + 6, y, K0); R.rect(x - 5, y - 8, x + 5, y - 1, hex('#b8643a')); R.rect(x - 5, y - 8, x + 5, y - 7, hex('#d8844a')); R.rect(x + 3, y - 6, x + 5, y - 1, hex('#8a4428')); };
// la venda de los ojos sobre la cabeza de un chibi (cab = [x + 7, yH] que devuelve R.actor); sube = 0–1 se la quita
const venda = (cab, dir, t, sube = 0) => { const [cx, yH] = cab, y = Math.round(yH + 5 - sube * 14), x0 = cx - 6, x1 = cx + 7;
  if (sube >= 1) return;
  for (let x = x0; x <= x1; x++) { R.pset(x, y - 1, K0); R.pset(x, y, hex('#ffffff')); R.pset(x, y + 1, hex('#ece8dc')); R.pset(x, y + 2, hex('#c8c4b8')); R.pset(x, y + 3, K0); if ((x + Math.floor(t * 3)) % 5 === 0) R.pset(x, y + 1, hex('#d8d4c8')); }
  const nx = dir > 0 ? x0 - 1 : x1 + 1, s = dir > 0 ? -1 : 1; R.rect(nx - 1, y - 1, nx + 1, y + 3, K0); R.rect(nx, y, nx, y + 2, hex('#ece8dc'));
  for (let k = 0; k < 6; k++) { const ol = Math.round(Math.sin(t * 7 + k * 0.8) * (k / 3)); R.pset(nx + s * (1 + k), y + 2 + k + ol, hex('#ece8dc')); R.pset(nx + s * (1 + k), y + 3 + k + ol, K0); } };
// guiño: el ojo de delante se cierra en una rayita (personajes de 12 de cabeza, ojos en la fila 6)
const guino = (x, yH, dir, piel = hex('#f0c098')) => { const ex = dir > 0 ? x + 12 : x + 2; R.pset(ex, yH + 6, piel); R.pset(ex, yH + 7, piel); R.pset(ex - 1, yH + 6, K0); R.pset(ex, yH + 6, K0); R.pset(ex + 1, yH + 6, K0); };
// destello de flash (estrella de cuatro puntas)
const flash = (x, y, r) => { if (r <= 0) return; luz(x, y, r * 3, hex('#ffffff'), 0.5); for (let k = -r; k <= r; k++) { R.pset(x + k, y, hex('#ffffff')); R.pset(x, y + k, hex('#ffffff')); } R.pset(x + 1, y + 1, hex('#fff6c0')); R.pset(x - 1, y - 1, hex('#fff6c0')); };
// la lata nueva lleva la banda gris (o.franja); la de siempre que vuelve, la banda dorada (o.banda)
const lataN = (x, y, s = 1, o = {}) => PZ.lata(R, x, y, { color: 'rojo', franja: true, s, ...o });
const lataV = (x, y, s = 1, o = {}) => PZ.lata(R, x, y, { color: 'rojo', banda: true, s, ...o });
const lataA = (x, y, s = 1) => PZ.lata(R, x, y, { color: 'azul', s });
// pantalla de tele: líneas de barrido y un brillo en la esquina sobre lo que haya en [x0, y0, x1, y1]
const barrido = (x0, y0, x1, y1, t) => { for (let y = y0; y <= y1; y++) if ((y + Math.floor(t * 20)) % 3 === 0) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), K0, 0.18));
  for (let k = 0; k < 6; k++) R.pset(x0 + 2 + k, y0 + 2, mez(R.pget(x0 + 2 + k, y0 + 2), 0xffffffff, 0.5)); };
// ── lo propio del grupo 8 ──
// Atom dentro del plano, con su halo
const ondaAtom = (ax, ay, t, e = 0.3) => {
  for (let j = -22; j <= 22; j++) for (let i = -22; i <= 22; i++) { const g = 1 - Math.hypot(i, j) / 21; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(ax, ay, t, { r: 15, orbita: R.PAL.ATOM[7], energia: e });
};
// bocadillo blanco con un icono dentro (o vacío, para pintar otra cosa dentro)
const bocadillo = (x, y, icono, col) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 1, y - 1, x + 19, y + 17, K0); R.rect(x, y, x + 18, y + 16, hex('#fbf6ea')); R.rect(x + 1, y + 15, x + 17, y + 16, hex('#c8c0b0'));
  R.rect(x + 3, y + 17, x + 6, y + 18, K0); R.rect(x + 4, y + 17, x + 5, y + 17, hex('#fbf6ea')); R.rect(x + 2, y + 19, x + 3, y + 19, K0);
  if (icono) R.icono(icono, x + 3, y + 2, col, K0, 2); };
// la bombilla (7 × 10 celdas a escala s) con su contorno; on 0–1 la enciende y le saca rayos
const BOMB = ['..###..', '.#####.', '#######', '#######', '#######', '.#####.', '..###..', '..===..', '..===..', '...=...'];
const bombilla = (x, y, on, s = 1) => { x = Math.round(x); y = Math.round(y); const vid = mez(hex('#7a7a6a'), hex('#fff27a'), on), cel = (i, j) => (BOMB[j] || '')[i] && BOMB[j][i] !== '.';
  for (let j = -1; j <= 10; j++) for (let i = -1; i <= 7; i++) if (!cel(i, j) && (cel(i + 1, j) || cel(i - 1, j) || cel(i, j + 1) || cel(i, j - 1))) rc(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, K0);
  BOMB.forEach((f, j) => { for (let i = 0; i < 7; i++) { const ch = f[i]; if (ch === '.') continue; rc(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, ch === '=' ? (j === 8 ? hex('#5a5a66') : hex('#9a9aa6')) : (i === 2 && j === 2) ? hex('#ffffff') : (i >= 5 || j >= 5) ? mez(vid, K0, 0.2) : vid); } });
  if (on > 0.55) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 - Math.PI / 2, c0 = [x + 3.5 * s, y + 3.5 * s]; if (Math.sin(a) > 0.5) continue; R.linea(Math.round(c0[0] + Math.cos(a) * 6 * s), Math.round(c0[1] + Math.sin(a) * 6 * s), Math.round(c0[0] + Math.cos(a) * 8 * s), Math.round(c0[1] + Math.sin(a) * 8 * s), hex('#fff27a')); } };
// el hilo rojo del tablero, con su comba; u 0–1 lo va tendiendo (con la punta brillante)
const hilo = (x0, y0, x1, y1, u = 1) => { if (u <= 0) return; const n = Math.max(2, Math.ceil(Math.hypot(x1 - x0, y1 - y0))), m = Math.round(n * Math.min(1, u)), comba = Math.min(7, n * 0.07);
  let px = x0, py = y0; for (let i = 0; i <= m; i++) { const f = i / n; px = x0 + (x1 - x0) * f; py = y0 + (y1 - y0) * f + Math.sin(f * Math.PI) * comba; R.pset(Math.round(px), Math.round(py), hex('#e8302e')); R.pset(Math.round(px), Math.round(py) + 1, hex('#7a1214')); }
  if (u < 1) { R.disco(Math.round(px), Math.round(py), 2, hex('#ff8a6a')); R.pset(Math.round(px), Math.round(py), hex('#ffffff')); } };
// chincheta roja con su brillo
const pincho = (x, y, c = hex('#e83a3a')) => { R.disco(x, y, 2, K0); R.disco(x, y, 1, c); R.pset(x - 1, y - 1, hex('#ffd0c8')); };
// paloma de la acera: picotea; vuela (0–1) hacia arriba a la izquierda aleteando
const paloma = (x, y, t, k, vuela = 0) => { const dx = -vuela * 140 - vuela * vuela * 40, dy = -vuela * 90; x = Math.round(x + dx); y = Math.round(y + dy);
  if (vuela > 0) { const a = Math.sin(t * 30 + k) > 0; rc(x - 3, y - 3, x + 3, y - 1, hex('#7a7a86')); rc(x + 3, y - 4, x + 5, y - 2, hex('#5a5a66')); R.pset(x + 6, y - 3, hex('#e8a03a'));
    if (a) { rc(x - 5, y - 7, x - 1, y - 4, hex('#9a9aa6')); rc(x + 1, y - 7, x + 3, y - 4, hex('#8a8a96')); } else { rc(x - 5, y, x - 1, y + 2, hex('#9a9aa6')); } return; }
  const pica = Math.sin(t * 7 + k * 2.3) > 0.4 ? 2 : 0;
  rc(x - 4, y - 5, x + 2, y - 1, hex('#8a8a96')); rc(x - 3, y - 4, x + 1, y - 3, hex('#a2a2ae')); rc(x - 6, y - 4, x - 4, y - 3, hex('#4a4a56'));
  rc(x + 2, y - 7 + pica, x + 4, y - 5 + pica, hex('#6a6a7a')); R.pset(x + 3, y - 6 + pica, hex('#4a8a6a')); R.pset(x + 5, y - 6 + pica, hex('#e8a03a')); R.pset(x + 4, y - 7 + pica, K0);
  R.pset(x - 1, y, hex('#d86a5a')); R.pset(x + 1, y, hex('#d86a5a')); };
// escarapela dorada con un número (premio)
const escarapela = (x, y, n) => { x = Math.round(x); y = Math.round(y);
  for (const [dx, c] of [[-3, hex('#2a5ab8')], [2, hex('#2a5ab8')]]) { rc(x + dx, y + 6, x + dx + 3, y + 16, K0); rc(x + dx + 1, y + 7, x + dx + 2, y + 15, c); }
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.disco(Math.round(x + Math.cos(a) * 7), Math.round(y + Math.sin(a) * 7), 2, hex('#c89a2a')); }
  R.disco(x, y, 7, K0); R.disco(x, y, 6, hex('#f2c84a')); R.disco(x, y, 4, hex('#ffe08a')); R.numero(String(n), x + 1, y + 4, { centro: true, color: K0, sombra: false }); };
// gato atigrado sentado de perfil (mira a dir); pata 0–1 da un zarpazo; cola que se mece
const gatito = (x, y, t, dir = 1, pata = 0) => { x = Math.round(x); y = Math.round(y); const G = hex('#c8823a'), GS = hex('#9a5a24'), GL = hex('#e8a85a'), X = (i) => x + i * dir;
  for (let j = 0; j < 9; j++) for (let i = -4; i <= 4; i++) { if (Math.hypot(i, (j - 5) * 0.9) > 4.6) continue; R.pset(X(i), y - j, (j + i) % 3 === 0 ? GS : G); }
  for (let j = 0; j < 7; j++) for (let i = -3; i <= 3; i++) if (Math.hypot(i, j - 3) < 3.6) R.pset(X(4 + i), y - 9 - j, (i === 2 && j === 3) ? K0 : j === 5 && i < 0 ? GS : G);
  R.pset(X(2), y - 16, G); R.pset(X(2), y - 17, GS); R.pset(X(6), y - 16, G); R.pset(X(6), y - 17, GS); R.pset(X(7), y - 11, hex('#e88a8a'));
  for (let i = -3; i <= 3; i++) R.pset(X(i), y - 4, GL);
  const px = Math.round(pata * 5); rc(Math.min(X(3), X(3 + px)), y - 3 - Math.round(pata * 4), Math.max(X(4), X(4 + px)), y - 1 - Math.round(pata * 4), GL);
  for (let k = 0; k < 9; k++) { const a = Math.sin(t * 2.2 + k * 0.4) * 0.8; R.pset(X(-4 - Math.round(k * 0.7)), Math.round(y - 1 - k * 0.9 - Math.sin(a) * 2), k % 3 ? G : GS); } };
// el grillo (7 × 4) con sus antenas; salta en arco
const grillo = (x, y, t, s = 2) => { x = Math.round(x); y = Math.round(y); const P = (i, j, c) => rc(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c);
  for (let i = -3; i <= 2; i++) for (let j = -3; j <= -1; j++) P(i, j, j === -3 ? hex('#6a8a2a') : hex('#3a4a1e')); P(3, -2, hex('#2a3414')); P(3, -3, hex('#2a3414')); P(2, -3, K0);
  for (let k = 0; k < 3; k++) { P(-2 - k, -1 + k, hex('#2a3414')); P(-1, 0, hex('#2a3414')); } P(1, 0, hex('#2a3414')); P(0, 0, hex('#2a3414'));
  const an = Math.sin(t * 9) > 0 ? 1 : 0; for (let k = 1; k <= 4; k++) { P(3 + k, -3 - Math.round(k * 0.7) - an, hex('#5a6a3a')); } };
'''

# ───────────────────────────────────────── NC-TRUCO ─────────────────────────────────────────
E['nc-truco'] = ('El truco', r'''// NC-TRUCO (frase 22, «Some people believe the whole thing had been a master plan…»), sin cartela; barra en 1985.
// Dos planos:
// 1. El cuarto del aficionado a los misterios, de noche (fondo local): pared de yeso verde oscuro, zócalo de nogal, la
//    ventana con la persiana a la ciudad (neón que parpadea, coches que pasan), la bombilla que se mece; el tablero de
//    corcho con las fotos de la lata de siempre y de la nueva, el plano azul del «plan» (camino de puntos, X y diana), el
//    calendario con el 79, el billete y el recorte con «?». El vecino entra y en «believe» mira el tablero; en «master
//    plan» señala y los hilos rojos se tienden solos de foto en foto hasta el plan; en «trick» se sobresalta («!»); en
//    «original» el último hilo vuelve a la lata de siempre y sale un corazón. En la mesa, el gato da un zarpazo al ovillo.
// 2. Corta en «One of»: la entrada de la sede (fondo local): granito, la puerta giratoria de bronce, la bandera, el reloj;
//    Keough sale por la puerta giratoria y baja la escalinata hasta los micrófonos; los periodistas preguntan (flashes);
//    en «answered with humor» sonríe y habla; en «dumb» se encoge de hombros y sale un bocadillo con la bombilla a medias;
//    en «smart» la bombilla parpadea y se queda a medio gas; los periodistas se ríen y las palomas salen volando.
''', COMUN + F(r'''
const P2 = @t(6.3);
const comp0 = R.companero;

// ── 1 · el tablero del aficionado a los misterios ──
const AV = [110, 31], BN = [236, 31], PL = [173, 42], CA = [110, 83], DO = [236, 83], PE = [141, 93];
const fondoTablero = () => {
  // la pared de yeso verde oscuro (arriba, tranquila), el zócalo de nogal y su moldura
  llena(0, 0, 319, 100, rp('#141e26', '#1a2830', '#20323a', '#283c44', '#30484e'), (x, y) => 1.1 + y / 70 + (hh(x, y) - 0.5) * 0.35 + (hh(x >> 2, y >> 2, 3) - 0.5) * 0.25);
  paneles(0, 104, 319, 140, rp('#2a180c', '#3e2614', '#54361e', '#6a4628'), 26, 2);
  R.rect(0, 101, 319, 103, hex('#5a3a22')); R.rect(0, 101, 319, 101, hex('#7a5232'));
  // el marco de la ventana (x 6–66, y 24–98) y el alféizar
  caja(5, 23, 67, 99, hex('#4a3422')); R.rect(3, 99, 69, 103, hex('#6a4a2e')); R.rect(3, 99, 69, 99, hex('#8a6440'));
  // el suelo de tablas y la alfombra oval
  tablas(0, 141, 319, 179, rp('#1e1208', '#30200e', '#422c16', '#523820'), 6, 4);
  R.rect(0, 140, 319, 140, hex('#120a04'));
  for (let y = 150; y <= 178; y++) for (let x = 30; x <= 200; x++) { const d = Math.hypot((x - 115) / 84, (y - 164) / 14); if (d > 1) continue; const an = Math.floor(d * 5);
    R.pset(x, y, d > 0.95 ? hex('#2a0e0e') : [hex('#7a2a24'), hex('#a8743a'), hex('#6a2420'), hex('#2a4a5a'), hex('#7a2a24')][an]); if (an === 2 && (x + y) % 4 === 0) R.pset(x, y, hex('#c89a4a')); if (an === 0 && (x * 3 + y) % 7 === 0) R.pset(x, y, hex('#c8a060')); }
  // el marco del corcho (x 82–264, y 20–126) y el corcho moteado
  caja(82, 20, 264, 126, hex('#6a4426')); R.rect(83, 21, 263, 22, hex('#8a5c34')); R.rect(84, 23, 262, 124, hex('#3a2412'));
  llena(86, 25, 260, 122, rp('#6a4628', '#866034', '#9c723e', '#b0844a'), (x, y) => 1.8 + (hh(x, y, 7) - 0.5) * 1.6 + (hh(x >> 1, y >> 1, 8) > 0.86 ? -0.9 : 0) + (hh(x >> 3, y >> 3, 9) - 0.5) * 0.4);
  R.rect(84, 127, 264, 128, hex('#0e1418'));
  // las fotos (polaroids) clavadas
  const pol = (x0, y0, x1, y1, f, g) => { R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#3a2410')); caja(x0, y0, x1, y1, hex('#f4f0e2')); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 7, f); g(); R.rect(x0 + 2, y1 - 5, x1 - 2, y1 - 2, hex('#e6e0cc')); };
  pol(96, 30, 124, 60, hex('#6a2a22'), () => { for (let y = 33; y < 53; y++) R.pset(99 + (y % 3), y, hex('#7a3a2a')); lataV(110, 52); });
  pol(222, 30, 250, 60, hex('#2a2e44'), () => { for (let y = 33; y < 53; y++) R.pset(225 + (y % 3), y, hex('#3a3e54')); lataN(236, 52); });
  // el plan: el plano azul con su rejilla, la casilla de salida, el camino de puntos, la X y la diana
  R.rect(148, 44, 203, 88, hex('#2a1a0a')); caja(146, 42, 201, 86, hex('#2a5a9a'), hex('#e8ecf4'));
  for (let x = 152; x < 200; x += 6) for (let y = 44; y < 85; y++) R.pset(x, y, hex('#3e6eae')); for (let y = 48; y < 85; y += 6) for (let x = 148; x < 200; x++) R.pset(x, y, hex('#3e6eae'));
  R.disco(189, 55, 8, hex('#e8ecf4')); R.disco(189, 55, 6, hex('#d83a3a')); R.disco(189, 55, 4, hex('#e8ecf4')); R.disco(189, 55, 2, hex('#d83a3a'));
  for (let k = 0; k <= 26; k++) { const u = k / 26, x = Math.round(156 + (181 - 156) * u + Math.sin(u * Math.PI * 1.6) * 9), y = Math.round(78 - (78 - 60) * u); if (k % 2 === 0) { R.pset(x, y, hex('#ffffff')); R.pset(x + 1, y, hex('#ffffff')); } }
  R.linea(178, 60, 183, 58, hex('#ffffff')); R.linea(181, 62, 183, 58, hex('#ffffff'));
  R.disco(156, 78, 4, hex('#ffffff')); R.disco(156, 78, 2, hex('#2a5a9a'));
  for (let k = -3; k <= 3; k++) for (const d of [0, 1]) { R.pset(168 + k + d, 70 + k, hex('#ffd84a')); R.pset(168 + k + d, 70 - k, hex('#ffd84a')); }
  // el calendario con el 79
  R.rect(98, 84, 126, 114, hex('#3a2410')); caja(96, 82, 124, 112, hex('#f6f2e6')); R.rect(97, 83, 123, 90, hex('#c83a32')); for (let x = 99; x < 122; x += 4) R.pset(x, 86, hex('#f6f2e6'));
  R.numero('79', 111, 108, { centro: true, color: K0, sombra: false });
  // el billete
  R.rect(224, 87, 252, 109, hex('#3a2410')); caja(222, 85, 250, 107, hex('#9ac88a'), hex('#2a4a2a')); R.rect(225, 88, 247, 104, hex('#7ab06a')); R.disco(236, 96, 6, hex('#c8e4b8'));
  R.numero('$', 237, 100, { centro: true, color: hex('#2a4a2a'), sombra: false }); for (const [x, y] of [[227, 90], [245, 90], [227, 102], [245, 102]]) R.disco(x, y, 1, hex('#4a7a3a'));
  // el recorte de periódico (rayas, sin letras) con su «?»
  R.rect(132, 95, 154, 121, hex('#3a2410')); caja(130, 93, 152, 119, hex('#e2dccb')); R.rect(132, 96, 150, 99, hex('#4a4a4a'));
  for (let y = 102; y < 117; y += 3) R.rect(144, y, 150 - ((y * 7) % 4), y, hex('#8a8478')); R.icono('?', 133, 103, hex('#c83a32'), hex('#e2dccb'));
  // las notas amarillas con «!» y «?»
  for (const [x, y, ic] of [[204, 97, '!'], [128, 27, '?'], [238, 64, '?'], [92, 64, '!']]) { R.rect(x + 1, y + 1, x + 13, y + 13, hex('#3a2410')); caja(x, y, x + 12, y + 12, hex('#f2dc5a'), hex('#a88a2a')); R.icono(ic, x + 3, y + 3, hex('#3a2a10'), hex('#f2dc5a')); }
  // la mesa de delante (x 196–319, y 146–180): tablero claro, frente de cajones
  R.rect(196, 145, 319, 145, K0); tablas(197, 146, 319, 151, rp('#5a3a1e', '#7a5230', '#94683e', '#a87a4a'), 6, 9); R.rect(196, 152, 319, 153, hex('#2a1a0c'));
  paneles(196, 154, 319, 179, rp('#2a180c', '#3e2614', '#54361e', '#6a4628'), 40, 5);
  for (const x of [214, 254, 294]) { R.rect(x, 164, x + 10, 166, hex('#c8a060')); R.rect(x, 166, x + 10, 166, hex('#7a5a2a')); }
  // la máquina de escribir y la hoja (rayas, sin letras)
  caja(244, 132, 286, 146, hex('#4a5a52')); R.rect(246, 134, 284, 135, hex('#6a7a72')); for (let r = 0; r < 3; r++) for (let k = 0; k < 9; k++) R.disco(250 + k * 4 + r, 139 + r * 2, 1, hex('#1e2420'));
  caja(250, 114, 278, 133, hex('#f6f2e6')); for (let y = 118; y < 131; y += 3) R.rect(253, y, 275 - ((y * 5) % 7), y, hex('#a8a498')); caja(242, 128, 288, 132, hex('#2a2e2a'));
  // las carpetas
  for (let k = 0; k < 3; k++) caja(200 + k, 140 - k * 2, 232 + k, 145 - k * 2, [hex('#c8a858'), hex('#a87a3a'), hex('#d8b868')][k]);
};
// la ventana: noche con edificios, neón y coches; la persiana por delante
const ventana = (t) => {
  R.recorte([8, 26, 64, 96]);
  llena(8, 26, 64, 96, rp('#0a0e22', '#121a36', '#1a2648', '#24305a'), (x, y) => 0.6 + (y - 26) / 30 + (hh(x, y, 2) - 0.5) * 0.3);
  for (let k = 0; k < 9; k++) { const x = 10 + Math.floor(hh(k, 4) * 52), y = 28 + Math.floor(hh(k, 5) * 20); if (Math.sin(t * 3 + k * 1.7) > -0.6) R.pset(x, y, hex('#e8ecf8')); }
  for (let k = 0; k < 6; k++) { const x0 = 8 + k * 10, h = 22 + Math.floor(hh(k, 6) * 26); rc(x0, 92 - h, x0 + 8, 92, hex('#0c0e1a')); for (let j = 92 - h + 2; j < 90; j += 3) for (let i = x0 + 1; i < x0 + 8; i += 2) if (hh(i, j, k) > 0.62) R.pset(i, j, Math.sin(t * 0.7 + i * 3 + j) > 0.95 ? hex('#3a3a2a') : hex('#e8c860')); }
  const neon = Math.sin(t * 5) > -0.3 || Math.floor(t * 11) % 7 === 0; rc(40, 54, 56, 58, K0); rc(41, 55, 55, 57, neon ? hex('#5af0a8') : hex('#1a4a3a')); if (neon) luz(48, 56, 10, hex('#5af0a8'), 0.25);
  rc(8, 92, 64, 96, hex('#1a1a24'));
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 30 + k * 40) % 90) - 15); rc(x, 93, x + 1, 94, hex('#fff2b0')); rc(x + 6, 93, x + 7, 94, hex('#fff2b0')); rc(x - 1, 95, x + 8, 95, hex('#c84a3a')); }
  for (let y = 26; y <= 96; y++) if ((y - 26) % 6 < 2) for (let x = 8; x <= 64; x++) R.pset(x, y, (y - 26) % 6 === 0 ? hex('#b8b2a0') : hex('#7e786a'));
  R.recorte(null);
  R.rect(35, 26, 35, 96, hex('#4a3422'));
};
const p1 = (t) => {
  capa('tru-tablero', fondoTablero);
  ventana(t);
  // la bombilla del techo que se mece, con su cono de luz sobre el tablero
  const sw = Math.sin(t * 1.1) * 3, bx = Math.round(198 + sw);
  R.linea(198, 0, bx, 12, hex('#2a2a2a'));
  cono(bx, 18, 172, 126, 70, hex('#ffe6a8'), 0.12);
  for (let i = -7; i <= 7; i++) R.rect(bx + i, 12 + Math.round(Math.abs(i) * 0.5), bx + i, 18, Math.abs(i) > 5 ? K0 : hex('#2a5a3a')); R.rect(bx - 5, 13, bx + 3, 13, hex('#4a8a5a'));
  R.disco(bx, 19, 2, hex('#fff2c0'));
  // los hilos que ya estaban, los que se tienden con la voz y las chinchetas encima
  hilo(PE[0], PE[1], CA[0], CA[1]); hilo(PE[0], PE[1], PL[0], PL[1]);
  const S = [[AV, PL, @t(2.7), @t(3.2)], [BN, PL, @t(3.2), @t(3.7)], [PL, CA, @t(3.95), @t(4.4)], [PL, DO, @t(4.4), @t(4.9)], [CA, AV, @t(5.4), @t(5.9)]];
  for (const [a, b, t0, t1] of S) hilo(a[0], a[1], b[0], b[1], lin(t, t0, t1));
  for (const p of [AV, BN, PL, CA, DO, PE]) pincho(p[0], p[1]);
  for (const [x, y] of [[134, 28], [244, 65], [210, 98], [98, 65]]) pincho(x, y, hex('#3a8ae8'));
  // el plan se ilumina cuando le llegan los hilos; la lata de siempre, al final
  const brPlan = lin(t, @t(3.15), @t(3.4)) * (1 - lin(t, @t(4.9), @t(5.4)));
  if (brPlan > 0) for (let x = 145; x <= 202; x++) for (const y of [41, 87]) R.pset(x, y, mez(hex('#2a5a9a'), hex('#fff6a0'), brPlan));
  const cor = lin(t, @t(5.85), @t(6.05));
  if (cor > 0) { for (let x = 95; x <= 125; x++) for (const y of [29, 61]) R.pset(x, y, hex('#ff8a8a')); corazon(126, Math.round(40 - cor * 4 + Math.sin(t * 6)), 2, hex('#e83a4a')); }
  // el vecino entra, mira, señala, se sobresalta y sonríe
  const ent = sm(lin(t, 0.1, @t(0.8))), mx = Math.round(lerp(-18, 122, ent));
  const plan = t > @t(2.65) && t < @t(4.95), truco = t > @t(3.95) && t < @t(4.45);
  R.actor(NC.vecinoSotano, mx, 168, t, { dir: 1, anda: ent > 0 && ent < 1, dedo: plan && !truco, sorpresa: truco, sonrisa: t > @t(5.5), habla: t > @t(4.5) && t < @t(5.4) && Math.sin(t * 9) > 0 });
  if (t > @t(0.95) && t < @t(2.6)) R.icono('?', mx + 4, 128 - Math.round(Math.sin(t * 5) * 2), hex('#ffe890'), K0, 2);
  if (truco) R.icono('!', mx + 5, 126, hex('#ffd36a'), K0, 2);
  // el ovillo rojo en la mesa y el gato que le da un zarpazo
  const zarpa = Math.max(0, Math.sin(lin(t, @t(1.3), @t(2.1)) * Math.PI)), rueda = lin(t, @t(1.6), @t(2.6));
  const ox = Math.round(232 + rueda * 6); R.disco(ox, 141, 4, K0); R.disco(ox, 141, 3, hex('#c82a2a')); R.linea(ox - 2, 139, ox + 2, 143, hex('#e85a4a')); R.linea(ox - 3, 142, ox + 1, 138, hex('#8a1a1a'));
  R.linea(ox + 3, 143, ox + 12, 145, hex('#c82a2a'));
  gatito(214, 145, t, 1, zarpa);
  // la taza que humea
  caja(296, 136, 306, 145, hex('#e8e0cc')); R.rect(307, 138, 309, 142, K0); for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(Math.round(300 + Math.sin(u * 6 + t) * 2), Math.round(134 - u * 14), mez(hex('#c8c8c0'), hex('#30484e'), u)); }
};

// ── 2 · la entrada de la sede: Keough ante los periodistas ──
const fondoSede = () => {
  // la cornisa lisa de arriba (tranquila) y el granito rosado en sillares
  llena(0, 0, 319, 40, rp('#8a7a70', '#988878', '#a69686', '#b4a494'), (x, y) => 2.2 - y / 60 + (hh(x, y, 11) - 0.5) * 0.35);
  R.rect(0, 40, 319, 45, hex('#c8b8a6')); R.rect(0, 46, 319, 47, hex('#6a5a50')); for (let x = 2; x < 320; x += 6) R.rect(x, 41, x + 2, 43, hex('#a89888'));
  for (let y = 48; y <= 131; y++) for (let x = 0; x <= 319; x++) { const fila = Math.floor((y - 48) / 14), jx = (x + (fila % 2) * 22) % 44 === 0, jy = (y - 48) % 14 === 0;
    R.pset(x, y, jx || jy ? hex('#6a5a54') : R.tone(rp('#86726a', '#988478', '#aa968a', '#bca89a'), 1.8 + (hh(x, y, 11) - 0.5) * 0.9 + (hh(Math.floor(x / 44), fila, 2) - 0.5) * 0.6 + (hh(x >> 1, y, 4) > 0.97 ? -0.8 : 0), x, y)); }
  // las ventanas altas (cristal oscuro con marcos de bronce)
  for (const x0 of [8, 40, 236, 268]) { caja(x0 - 2, 52, x0 + 26, 128, hex('#5a4024')); R.rect(x0 + 12, 54, x0 + 13, 126, hex('#7a5a30')); R.rect(x0, 88, x0 + 24, 89, hex('#7a5a30')); R.rect(x0 - 3, 128, x0 + 27, 131, hex('#c8b8a6')); }
  // la marquesina de bronce, el marco de la puerta y las puertas laterales de cristal
  R.rect(92, 50, 208, 60, K0); R.rect(93, 51, 207, 57, hex('#8a6a34')); R.rect(93, 51, 207, 52, hex('#c8a060')); R.rect(93, 58, 207, 59, hex('#4a3418'));
  for (let x = 98; x < 204; x += 8) R.disco(x, 59, 1, hex('#fff2c0'));
  caja(100, 61, 200, 132, hex('#3a2a16')); R.rect(102, 62, 198, 131, hex('#2a2a30'));
  for (const x0 of [103, 174]) { R.rect(x0, 63, x0 + 22, 131, hex('#4a6a7a')); R.rect(x0, 63, x0, 131, hex('#7a5a30')); R.rect(x0 + 22, 63, x0 + 22, 131, hex('#7a5a30')); R.rect(x0 + 2, 64, x0 + 20, 130, hex('#3a5868'));
    for (let k = 0; k < 18; k++) R.pset(x0 + 4 + k, 120 - k * 3, hex('#7a9aaa')); R.rect(x0 + 4, 98, x0 + 18, 99, hex('#c8a060')); }
  // el reloj de bronce sobre la marquesina va en p2 (anda)
  // la escalinata de granito claro (x 80–220, y 132–146)
  for (let k = 0; k < 3; k++) { const y0 = 132 + k * 5, x0 = 84 - k * 4, x1 = 216 + k * 4; R.rect(x0, y0, x1, y0 + 4, hex('#b4a494')); R.rect(x0, y0, x1, y0, hex('#d8cab8')); R.rect(x0, y0 + 4, x1, y0 + 4, hex('#7a6a5e'));
    for (let x = x0; x <= x1; x++) if (hh(x, y0, 6) > 0.9) R.pset(x, y0 + 2, hex('#9a8a7c')); }
  // la acera de losas con juntas, manchas y un chicle
  for (let y = 147; y <= 179; y++) { const f = (y - 147) / 33; for (let x = 0; x <= 319; x++) { const jx = Math.round((x - 160) / (34 + f * 20)) !== Math.round((x - 160 + 1) / (34 + f * 20)), jy = y === 158 || y === 172;
    R.pset(x, y, jx || jy ? hex('#7a7672') : R.tone(rp('#9a9690', '#a8a49e', '#b6b2ac', '#c4c0ba'), 1.8 + f * 0.6 + (hh(x, y, 13) - 0.5) * 0.7, x, y)); } }
  for (const [x, y, r] of [[60, 168, 4], [210, 176, 3], [280, 160, 5]]) for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if (Math.hypot(i / 2, j) < r && hh(x + i, y + j, 2) > 0.3) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), K0, 0.12));
  R.disco(120, 174, 1, hex('#e8a0b0'));
  // las jardineras de hormigón con arbustos y flores
  for (const x0 of [6, 252]) { caja(x0, 138, x0 + 60, 152, hex('#a8a49c')); R.rect(x0 + 1, 139, x0 + 59, 140, hex('#c8c4bc'));
    for (let k = 0; k < 16; k++) { const x = x0 + 4 + Math.floor(hh(k, x0) * 52), y = 128 + Math.floor(hh(k, x0 + 1) * 10); R.disco(x, y, 4, hex('#2a5a2a')); R.disco(x - 1, y - 1, 2, hex('#4a8a3a')); }
    for (let k = 0; k < 10; k++) { const x = x0 + 5 + Math.floor(hh(k, x0 + 3) * 50), y = 126 + Math.floor(hh(k, x0 + 4) * 10); R.pset(x, y, hex('#e84a5a')); R.pset(x + 1, y, hex('#ff8a9a')); } }
  // el mástil
  R.rect(72, 22, 73, 146, hex('#c8ccd4')); R.rect(74, 22, 74, 146, hex('#8a8e96')); R.disco(73, 21, 2, hex('#e8c860')); R.rect(69, 144, 76, 147, hex('#6a6e76'));
};
const p2 = (t) => {
  capa('tru-sede', fondoSede);
  // las ventanas: el cielo y las nubes reflejados, y la gente que pasa por dentro
  for (const x0 of [8, 40, 236, 268]) { R.recorte([x0, 54, x0 + 24, 126]);
    llena(x0, 54, x0 + 24, 126, rp('#1e2c40', '#2a3c54', '#3a5068', '#4e6880'), (x, y) => 1.4 + (126 - y) / 50 + ((x + y * 0.6 + t * 4) % 30 < 4 ? 0.9 : 0));
    nube(Math.round(x0 + ((t * 3 + x0) % 50) - 12), 64, 18, rp('#5a7088', '#7890a8', '#98aec4'));
    for (let k = 0; k < 2; k++) { const mx = Math.round(x0 - 8 + ((t * (8 + k * 3) + k * 17 + x0) % 44)); mini(mx, 124, hex(['#3a4a6a', '#6a3a3a'][k]), hex('#2a1e1a'), t, true, k); }
    R.recorte(null); R.rect(x0 + 12, 54, x0 + 13, 126, hex('#7a5a30')); R.rect(x0, 88, x0 + 24, 89, hex('#7a5a30')); }
  // la bandera que ondea y el reloj de la fachada
  bandera(75, 24, 32, 18, t);
  reloj(150, 32, 7, (10 + t / 3600) / 12, (t / 60 + 0.25) % 1, hex('#f2ecd8'));
  // la puerta giratoria: las hojas de detrás, Keough dentro y las hojas de delante
  const gira = t * 0.9 + 2.4 * sm(lin(t, P2, @t(7.3))), sale = lin(t, @t(6.7), @t(7.9));
  R.rect(128, 63, 172, 131, hex('#1e2a32'));
  const hojas = (delante) => { for (let k = 0; k < 4; k++) { const a = gira + k * Math.PI / 2, d = Math.cos(a), x = Math.round(150 + Math.sin(a) * 20); if ((d > 0) !== delante) continue;
    R.rect(x, 64, x + 1, 130, delante ? hex('#c8a060') : hex('#6a5030')); if (delante) for (let y = 66; y < 130; y += 7) R.pset(x + (Math.sin(a) > 0 ? -1 : 2), y, hex('#9ac0d0')); } };
  hojas(false);
  const kx = Math.round(lerp(142, 150, sale)), ks = sale <= 0 ? 132 : Math.round(sale < 0.45 ? 132 + Math.floor(sale / 0.15) * 5 : lerp(147, 162, (sale - 0.45) / 0.55));
  const hablaK = (t > @t(8.26) && t < @t(9.4)) || (t > @t(9.82) && t < @t(10.5)) || (t > @t(11.1) && t < @t(11.9)), hombros = (t > @t(10.3) && t < @t(10.85)) || (t > @t(11.65) && t < @t(12.15));
  const kO = { dir: 1, anda: sale > 0 && sale < 1, sonrisa: t > @t(7.95), habla: hablaK && Math.sin(t * 10) > -0.2, brazos: hombros };
  if (sale < 0.2) { R.actor(NC.keough, kx, ks, t, kO); for (let y = 64; y < 131; y++) for (let x = 128; x <= 172; x++) if ((x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#9ac0d0'), 0.22)); }
  hojas(true);
  caja(126, 61, 174, 64, hex('#8a6a34'));
  // los fotógrafos del fondo (pequeños, al pie de la escalinata) y sus flashes
  mini(86, 150, hex('#5a5a6a'), hex('#3a2a1a'), t, false, 1); mini(222, 150, hex('#6a5a3a'), hex('#1a1a1a'), t, false, 2);
  const fl1 = [@t(6.95), @t(8.05), @t(9.2), @t(11.95)], fl2 = [@t(7.5), @t(8.5), @t(12.1)];
  for (const f of fl1) if (t > f && t < f + 0.12) flash(88, 139, 3); for (const f of fl2) if (t > f && t < f + 0.12) flash(224, 139, 3);
  // las palomas: picotean y salen volando con la risa
  const vuela = lin(t, @t(11.95), @t(12.9));
  for (const [x, y, k] of [[28, 172, 0], [44, 176, 1], [58, 169, 2]]) paloma(x, y, t, k, Math.max(0, vuela - k * 0.08));
  // Keough fuera, ya en la acera
  if (sale >= 0.2) R.actor(NC.keough, kx, ks, t, kO);
  // el pie de micrófonos delante de él
  R.rect(167, 150, 168, 176, hex('#3a3a46')); R.linea(162, 177, 173, 177, hex('#3a3a46'));
  for (const [x, y, c] of [[163, 148, '#3a3a46'], [168, 146, '#5a2a2a'], [173, 149, '#2a3a5a']]) { R.linea(167, 152, x, y + 3, hex('#2a2a2a')); R.disco(x, y, 2, K0); R.disco(x, y, 1, hex(c)); R.pset(x - 1, y - 1, hex('#c8c8d0')); }
  // los periodistas: preguntan, apuntan y se ríen
  const rie = t > @t(11.95);
  R.actor(NC.periodista2, 102, 168, t, { dir: 1, habla: t > @t(7.4) && t < @t(8.15) && Math.sin(t * 9) > 0, sonrisa: rie, sorpresa: t > @t(10.4) && t < @t(10.8), salto: rie && Math.sin(t * 14) > 0 ? 1 : 0 });
  R.actor(NC.periodista, 194, 168, t, { dir: -1, sonrisa: rie || (t > @t(8.4) && t < @t(9.2)), habla: t > @t(9.2) && t < @t(9.7), salto: rie && Math.sin(t * 13 + 1) > 0 ? 1 : 0 });
  R.actor(NC.camarografo, 222, 176, t, { dir: -1, sonrisa: rie });
  // dos periodistas más, al fondo, con libreta y micro
  R.actor(NC.periodista, 74, 160, t, { dir: 1, pal: { C: '#5a6a4a', c: '#46523a', H: '#2a1a10' }, habla: t > @t(9.3) && t < @t(9.8) && Math.sin(t * 9) > 0, sonrisa: rie });
  R.actor(NC.periodista2, 248, 162, t, { dir: -1, pal: { C: '#8a3a4a', c: '#6a2a3a', H: '#c8a060' }, sonrisa: rie || (t > @t(8.5) && t < @t(9.0)) });
  // el bocadillo de la bombilla: a medias en «dumb», parpadea en «smart»
  if (t > @t(9.95)) { const bx = kx + 18, by = ks - 66, u = lin(t, @t(9.95), @t(10.15));
    if (u >= 1) { R.rect(bx - 1, by - 1, bx + 31, by + 33, K0); R.rect(bx, by, bx + 30, by + 32, hex('#fbf6ea')); R.rect(bx + 1, by + 30, bx + 29, by + 32, hex('#c8c0b0'));
      R.rect(bx + 2, by + 33, bx + 6, by + 35, K0); R.rect(bx + 3, by + 33, bx + 5, by + 34, hex('#fbf6ea')); R.rect(bx - 1, by + 36, bx + 1, by + 37, K0);
      const ap = lin(t, @t(10.3), @t(10.5)), pp = t > @t(11.6) ? (Math.floor(t * 9) % 3 === 0 ? 0.1 : 0.62) : 0.12 + ap * 0.5; bombilla(bx + 8, by + 6, pp, 2); } }
};

const efectos = [[@t(1.5), 'miau'], [@t(3.2), 'golpecito'], [@t(4.0), 'aviso'], [@t(4.4), 'golpecito'], [@t(5.9), 'brillo'],
  [P2 + 0.15, 'puerta'], [@t(8.05), 'flash'], [@t(10.4), 'pop'], [@t(11.95), 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 1985 });
'''))

# ───────────────────────────────────────── NC-SORBOS ─────────────────────────────────────────
E['nc-sorbos'] = ('Sorbos', r'''// NC-SORBOS (frase 23, «And now, the question you've always wondered about…»), sin cartela; barra en 2026 y en 1984
// para las dos explicaciones. Tres planos:
// 1. El escritorio de Atom (hoy/estudio/mesa, 2.º uso): Atom entra flotando en «And now» y en «question» gira con sus
//    «?»; cuelga del techo un marcador que en «200,000» cuenta hasta 200000 mientras Atom lanza vasitos de cata que
//    forman una pirámide en la mesa; en «wrong?» el marcador tiembla y sale un «?» grande; en «First» Atom saca el «1».
// 2. Corta en «they were sips»: la encimera de una cocina de 1984 (fondo local): un vasito de cata y su azucarillo que
//    brilla a la izquierda, el medidor de dulzor en el centro y sitio para la lata a la derecha. En «single sip» una mano
//    coge el vasito y da un sorbo: la aguja sube al verde y en «win» sale la escarapela del 1. En «whole can» otra mano
//    trae una lata entera; en «sweetness» la aguja sube al rojo mientras se apilan azucarillos y en «tiring» se pasa de
//    rosca: da la vuelta, salta el muelle y el medidor tiembla.
// 3. Corta en «And second»: dos cuadros en la pared (fondo local): a la izquierda, la cata a ciegas del súper, con la
//    venda, que tantea los vasos en «blind»; a la derecha, la mesa de una casa al atardecer: en «nobody drinks» la señora
//    coge su lata, bebe en «blind at home» y sale un corazón; el perro mueve la cola y ladra. Arriba sale el «2».
''', COMUN + F(r'''
const P2 = @s(7.05), P3 = @s(13.85);
const comp0 = R.companero;
R.companero = (t, e) => { if (t >= P2) comp0(t, e); };   // Atom está en el primer plano: la esquina queda tranquila

// ── 1 · el escritorio de Atom: la pregunta de los 200.000 ──
const VASOS = [[72, 141], [87, 141], [102, 141], [79, 126], [94, 126], [86, 111]];
const p1 = (t) => {
  const o = { encuadre: 'estudio', camara: 'mesa', latas: true, lataX: 168 };
  T.hoy(R, t, o);
  // el marcador que cuelga del techo: cuenta en «200,000» y tiembla en «wrong?»
  const sw = Math.round(Math.sin(t * 1.2) * 1), tiembla = t > @s(5.6) && t < @s(6.4) ? Math.round(Math.sin(t * 50) * 1) : 0, mx = 222 + sw + tiembla, my = 4;
  R.linea(184, 0, mx - 44, 22 + my, hex('#3a3a3a')); R.linea(262, 0, mx + 44, 22 + my, hex('#3a3a3a'));
  R.rect(mx - 52, 23 + my, mx + 54, 49 + my, hex('#2a2a2e')); caja(mx - 53, 22 + my, mx + 53, 48 + my, hex('#14141a'), hex('#5a5a66')); R.rect(mx - 51, 24 + my, mx + 51, 25 + my, hex('#3a3a46'));
  for (let x = mx - 50; x <= mx + 50; x += 2) R.pset(x, 46 + my, hex('#2a2a34'));
  const n = Math.round(200000 * sm(lin(t, @s(3.85), @s(4.95))) / 1000) * 1000;
  R.numero(String(n).padStart(6, '0'), mx + 1, 44 + my, { tam: 16, centro: true });
  if (t > @s(4.95) && t < @s(5.5) && Math.floor(t * 8) % 2) for (let x = mx - 52; x <= mx + 52; x++) { R.pset(x, 22 + my, hex('#ffe890')); R.pset(x, 48 + my, hex('#ffe890')); }
  // Atom entra, gira con los «?», lanza los vasitos, se inclina en «wrong?» y saca el «1»
  const ent = sm(lin(t, @s(0.95), @s(1.7))), lanza = lin(t, @s(3.85), @s(4.95)), duda = t > @s(5.6) && t < @s(6.6);
  let ax = Math.round(lerp(-24, 118, ent) - sm(lanza) * 6), ay = Math.round(86 + Math.sin(t * 2.6) * 2 - (lanza > 0 && lanza < 1 ? 6 : 0));
  if (duda) ax += Math.round(Math.sin(t * 7) * 3);
  ondaAtom(ax, ay, t, t > @s(1.6) && t < @s(3.0) ? 0.9 : lanza > 0 && lanza < 1 ? 0.8 : 0.4);
  if (t > @s(1.6) && t < @s(3.2)) for (let i = 0; i < 3; i++) { if (t < @s(1.6) + i * 0.25) continue; R.icono('?', ax - 26 + i * 18, ay - 34 - (i & 1) * 6 - Math.round(Math.sin(t * 4 + i) * 2), hex('#ffe890'), K0, 2); }
  T.hoyDelante(R, t, o);
  // los vasitos de cata que caen uno a uno en la pirámide (y el que vuela)
  VASOS.forEach(([x, y], k) => { const t0 = @s(3.85) + k * 0.17, u = lin(t, t0, t0 + 0.22); if (u <= 0) return;
    const vx = Math.round(lerp(ax, x, u)), vy = Math.round(lerp(ay, y, u) - Math.sin(u * Math.PI) * 14); PZ.vaso(R, vx, vy, { lleno: 0.7 }); });
  if (duda) { bocadillo(ax + 14, ay - 46, '?', hex('#c83a32')); }
  const uno = lin(t, @s(6.6), @s(6.8)); if (uno > 0) { R.disco(ax + 24, ay - 20, 11, K0); R.disco(ax + 24, ay - 20, 10, hex('#ffe890')); R.numero('1', ax + 25, Math.round(ay - 12 - (1 - uno) * 4), { tam: 16, centro: true, color: K0, sombra: false }); }
};

// ── 2 · la encimera de 1984: un sorbo frente a la lata entera ──
const fondoCocina = () => {
  llena(0, 0, 319, 45, rp('#d0bc80', '#dccb92', '#e8daa6', '#f2e6ba'), (x, y) => 2.0 - y / 90 + (hh(x, y) - 0.5) * 0.3);
  // los armarios altos de la izquierda, con vetas y tiradores
  R.rect(0, 0, 152, 15, hex('#e2d4a8')); R.rect(0, 15, 152, 15, hex('#b8a878')); R.rect(0, 16, 152, 42, K0);
  for (let k = 0; k < 4; k++) { const x0 = 1 + k * 38, x1 = x0 + 35; R.rect(x0, 17, x1, 38, hex('#9a6a36')); R.rect(x0 + 3, 19, x1 - 3, 35, hex('#b8844a'));
    for (let y = 19; y < 35; y++) for (let x = x0 + 4; x < x1 - 3; x++) if (Math.sin(x * 0.9 + Math.sin(y * 0.2 + k) * 2) > 0.85) R.pset(x, y, hex('#a87640'));
    R.rect(k % 2 ? x0 + 5 : x1 - 7, 26, k % 2 ? x0 + 6 : x1 - 6, 31, hex('#e8d8a0')); R.pset(k % 2 ? x0 + 5 : x1 - 7, 26, hex('#ffffff')); }
  R.rect(0, 38, 152, 42, hex('#6a4420'));
  // los azulejos blancos con la cenefa de colores (y 46–103)
  for (let y = 46; y <= 103; y++) for (let x = 0; x <= 319; x++) { const jx = x % 9 === 0, jy = (y - 46) % 9 === 0, cen = y >= 64 && y < 73;
    R.pset(x, y, jx || jy ? hex('#b0ac9c') : cen ? ((Math.floor(x / 9) % 2) ? hex('#4a7ab0') : hex('#e8a83a')) : R.tone(rp('#d6d4c8', '#e4e2d8', '#f0eee6', '#fafaf4'), 2.1 + (hh(x, y, 3) - 0.5) * 0.4 - ((x % 9) + ((y - 46) % 9)) * 0.05, x, y)); }
  for (let x = 4; x < 320; x += 18) { R.pset(x + 4, 68, hex('#ffffff')); R.pset(x + 13, 68, hex('#2a4a7a')); }
  // la ventana (x 222–310, y 50–100): marco, visillo de cuadros y alféizar con la albahaca
  caja(219, 48, 313, 103, hex('#f2f0ea')); R.rect(218, 100, 314, 104, hex('#e8e4d8')); R.rect(218, 100, 314, 100, hex('#ffffff'));
  // la encimera de formica moteada con los bumeranes, el canto cromado
  for (let y = 104; y <= 179; y++) for (let x = 0; x <= 319; x++) { const h = hh(x, y, 5); R.pset(x, y, h > 0.975 ? hex('#3a7a6a') : h > 0.95 ? hex('#f6fff8') : R.tone(rp('#6aa894', '#7cb8a4', '#8ec6b2', '#a2d4c2'), 2.2 - (y - 104) / 70 + (hh(x >> 2, y >> 2, 6) - 0.5) * 0.4, x, y)); }
  for (let k = 0; k < 18; k++) { const cx = 6 + hh(k, 1) * 308, cy = 112 + hh(k, 2) * 64; if (cx > 60 && cx < 110 && cy > 135) continue; for (let i = -5; i <= 5; i++) { R.pset(Math.round(cx + i), Math.round(cy - Math.abs(i) * 0.6), [hex('#e8784a'), hex('#3a4a8a'), hex('#f0c83a')][k % 3]); } }
  R.rect(0, 104, 319, 106, hex('#c8ccd0')); R.rect(0, 104, 319, 104, hex('#f6f8fa')); R.rect(0, 107, 319, 107, hex('#4a7a6a'));
  // la tostadora cromada, los botes y el rollo de cocina
  caja(8, 80, 44, 104, hex('#c8ccd4')); R.rect(10, 82, 42, 84, hex('#f2f4f8')); R.rect(14, 80, 22, 81, K0); R.rect(28, 80, 36, 81, K0); R.rect(44, 90, 47, 92, K0); R.rect(12, 96, 40, 97, hex('#9aa0aa'));
  for (const [x0, w, h, c] of [[54, 14, 26, '#c84a3a'], [70, 12, 21, '#c84a3a'], [84, 10, 16, '#c84a3a']]) { caja(x0, 104 - h, x0 + w, 103, hex(c)); R.rect(x0 + 1, 104 - h, x0 + w - 1, 104 - h + 2, hex('#e8e0d0')); R.rect(x0 + 2, 104 - h + 6, x0 + 3, 100, hex('#e8786a')); }
  caja(198, 70, 212, 103, hex('#f6f4ee')); R.rect(203, 66, 207, 104, hex('#a87a4a')); for (let y = 74; y < 100; y += 6) R.rect(199, y, 211, y, hex('#d8d4c8'));
};
const dial = (cx, cy, r, v, t, sacude) => {
  if (sacude) cx += Math.round(Math.sin(t * 60) * 2);
  R.rect(cx - 3, cy + r - 2, cx + 3, cy + r + 32, K0); R.rect(cx - 2, cy + r - 2, cx + 2, cy + r + 32, hex('#8a8e96')); R.rect(cx - 1, cy + r - 2, cx - 1, cy + r + 32, hex('#d8dce4'));
  for (let i = -16; i <= 16; i++) { const h = Math.round(Math.sqrt(256 - i * i) * 0.25); R.rect(cx + i, cy + r + 32 - h, cx + i, cy + r + 34, Math.abs(i) > 14 ? K0 : i < -6 ? hex('#a8acb4') : hex('#7a7e86')); }
  R.disco(cx, cy, r + 3, K0); R.disco(cx, cy, r + 2, hex('#c8ccd4')); R.disco(cx, cy, r + 1, hex('#8a8e96')); R.disco(cx, cy, r, hex('#f6f2e4'));
  for (let j = -r + 2; j <= 2; j++) for (let i = -r + 2; i <= r - 2; i++) { const d = Math.hypot(i, j); if (d < r - 10 || d > r - 3) continue; const a = Math.atan2(i, -j) / (Math.PI / 2);
    R.pset(cx + i, cy + j, a < -0.3 ? hex('#4ab04a') : a < 0.35 ? hex('#f0c83a') : hex('#e04a3a')); }
  for (let k = -4; k <= 4; k++) { const a = k / 4 * Math.PI / 2; R.linea(Math.round(cx + Math.sin(a) * (r - 3)), Math.round(cy - Math.cos(a) * (r - 3)), Math.round(cx + Math.sin(a) * (r - 12)), Math.round(cy - Math.cos(a) * (r - 12)), K0); }
  // el azucarillo pintado bajo el eje
  caja(cx - 6, cy + 9, cx + 6, cy + 19, hex('#ffffff'), hex('#8a8a8a')); R.rect(cx - 5, cy + 10, cx + 5, cy + 11, hex('#f0f0f0')); R.pset(cx - 2, cy + 14, hex('#d8d8d8')); R.pset(cx + 2, cy + 16, hex('#d8d8d8'));
  const a = v * Math.PI / 2, L = r - 5;
  R.linea(cx + 1, cy + 1, Math.round(cx + 1 + Math.sin(a) * L), Math.round(cy + 1 - Math.cos(a) * L), hex('#9a9480'));
  R.linea(cx, cy, Math.round(cx + Math.sin(a) * L), Math.round(cy - Math.cos(a) * L), hex('#c82a2a')); R.linea(cx - 1, cy, Math.round(cx - 1 + Math.sin(a) * L), Math.round(cy - Math.cos(a) * L), hex('#8a1a1a'));
  R.disco(cx, cy, 4, K0); R.disco(cx, cy, 3, hex('#c8a040')); R.pset(cx - 1, cy - 1, hex('#ffe8a0'));
  for (let k = 0; k < 7; k++) R.pset(cx - r + 9 + k, cy - r + 14 - k, hex('#ffffff'));
};
const p2 = (t) => {
  capa('sor-cocina', fondoCocina);
  // la ventana: el cielo con nubes de tres tonos, la valla, el árbol que se mece y los pájaros
  R.recorte([222, 50, 310, 99]);
  llena(222, 50, 310, 99, rp('#6aa6dc', '#86b8e4', '#a2caec', '#c0dcf2'), (x, y) => 3.2 - (y - 50) / 18 + (hh(x, y, 4) - 0.5) * 0.4);
  for (const [v, y, w] of [[3, 60, 26], [5, 70, 18], [8, 56, 14]]) nube(Math.round(214 + ((t * v + y * 3) % 110)), y, w, rp('#b4c6da', '#e2ecf6', '#ffffff'));
  pajaros(t, 58, hex('#3a3a46'), 2, 16, 222, 310);
  for (let x = 222; x <= 310; x++) for (let y = 86; y <= 99; y++) R.pset(x, y, y < 90 ? ((x % 6 < 4) ? hex('#f0ece0') : hex('#5a8a3a')) : R.tone(rp('#3a6a2a', '#4a7a32', '#5a8a3a'), 1 + hh(x, y, 9), x, y));
  { const sw = Math.sin(t * 1.3) * 2; for (let k = 0; k < 40; k++) { const a = hh(k, 1) * Math.PI * 2, d = hh(k, 2) * 12; R.disco(Math.round(286 + Math.cos(a) * d * 1.2 + sw * (d / 12)), Math.round(70 + Math.sin(a) * d), 3, k % 3 ? hex('#3a7a32') : hex('#5a9a3a')); } rc(284, 78, 287, 99, hex('#5a3a22')); }
  R.recorte(null);
  R.rect(265, 50, 266, 99, hex('#f2f0ea')); R.rect(222, 74, 310, 75, hex('#f2f0ea'));
  for (let x = 219; x <= 313; x++) for (let y = 48; y <= 57; y++) R.pset(x, y, (Math.floor(x / 3) + Math.floor(y / 3)) % 2 ? hex('#d84a4a') : hex('#f6f0e6'));
  for (let x = 219; x <= 313; x += 3) R.pset(x, 58 + (x % 2), hex('#d84a4a'));
  rc(232, 92, 242, 100, hex('#c8643a')); for (let k = 0; k < 8; k++) R.disco(233 + k + Math.round(Math.sin(t * 2 + k) * 0.6), 88 - (k % 3) * 2, 2, hex('#4a9a3a'));
  // el reloj de pared de la cocina
  reloj(178, 24, 9, (2 + t / 3600) / 12, (t / 60 + 0.4) % 1, hex('#f6f0e0'));
  // la aguja del medidor: quieta y baja; sube al verde con el sorbo; al rojo con la lata; se pasa de rosca en «tiring»
  const sorbo = @s(8.74), lata = @s(11.5), cansa = @s(12.94);
  let v = -0.65 + Math.sin(t * 3) * 0.02 + 0.75 * sm(lin(t, @s(8.5), sorbo + 0.2)) - 0.3 * sm(lin(t, @s(10.6), @s(11.2))) + 1.1 * sm(lin(t, lata, cansa - 0.05));
  const pasa = lin(t, cansa, cansa + 0.7);
  if (pasa > 0) v = 0.95 + sm(pasa) * 5.05 + (pasa >= 1 ? Math.sin((t - cansa) * 5) * 0.1 : 0);
  dial(160, 76, 30, v, t, pasa > 0 && pasa < 1);
  // el cristal rajado y el humo cuando se pasa de rosca
  if (pasa > 0.4) { for (const [a, b, c, d] of [[146, 58, 156, 70], [156, 70, 150, 82], [156, 70, 170, 66], [170, 66, 178, 56]]) { R.linea(a, b, c, d, hex('#5a5a66')); R.linea(a + 1, b, c + 1, d, hex('#ffffff')); }
    for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4) % 1; R.disco(Math.round(150 + k * 7 + Math.sin(u * 5 + k) * 3), Math.round(44 - u * 20), 2 + Math.round(u * 2), mez(hex('#d8d8d8'), hex('#e8daa6'), u)); } }
  // el muelle que salta del medidor
  if (pasa > 0.15) { const u = Math.min(1, (pasa - 0.15) * 2), sx = 190, sy = Math.round(54 - u * 16 + (u >= 1 ? Math.sin(t * 6) * 2 : 0));
    for (let j = 0; j < 18; j++) { const x = Math.round(sx + Math.sin(j * 1.4) * 5), y = sy + j; R.pset(x - 1, y, K0); R.pset(x, y, hex('#b8bec8')); R.pset(x + 1, y, hex('#eef0f6')); R.pset(x + 2, y, K0); } R.icono('!', sx + 10, sy - 4, hex('#ffd36a'), K0, 2); }
  // el vasito de cata en su platito y el azucarillo que brilla
  for (let i = -14; i <= 14; i++) R.rect(78 + i, 150 - Math.round(Math.sqrt(196 - i * i) * 0.22), 78 + i, 151 + Math.round(Math.sqrt(196 - i * i) * 0.12), Math.abs(i) > 12 ? hex('#a8aca8') : hex('#f2f4f0'));
  const brilla = 0.5 + 0.5 * Math.sin(t * 5) + (t > @s(8.6) && t < @s(9.3) ? 1 : 0);
  caja(100, 140, 108, 148, hex('#ffffff'), hex('#9a9a9a')); R.rect(101, 141, 107, 142, hex('#fffef0'));
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + t * 1.5, r = 7 + brilla * 3; R.linea(Math.round(104 + Math.cos(a) * 6), Math.round(144 + Math.sin(a) * 6), Math.round(104 + Math.cos(a) * r), Math.round(144 + Math.sin(a) * r), hex('#fff6a0')); }
  // la mano del sorbo: entra, coge el vasito, lo sube, lo deja y se va
  const ag = @s(8.2), lev = @s(8.4), baja = @s(9.0), suelta = @s(9.25);
  let cup = [78, 150], lleno = 0.7 - 0.25 * lin(t, lev, baja);
  if (t > @s(7.7) && t < @s(9.8)) {
    const e1 = sm(lin(t, @s(7.7), ag)), s1 = sm(lin(t, suelta, @s(9.8))), up = sm(lin(t, lev, sorbo)) - sm(lin(t, baja, suelta));
    const wx = Math.round(lerp(lerp(30, 62, e1), 28, s1)), wy = Math.round(lerp(lerp(200, 146, e1), 200, s1) - up * 12);
    const coge = t > ag && t < suelta; if (coge) cup = [wx + 15, wy + 6];
    T.brazo(R, wx - 20, 206, wx, wy, '#3a6a9a', 1, { codo: [wx - 16, Math.round((206 + wy) / 2 + 4)] });
    PZ.vaso(R, cup[0], cup[1], { lleno });
    T.mano(R, wx, wy, 1, '#3a6a9a', { sinManga: true });
  } else PZ.vaso(R, cup[0], cup[1], { lleno });
  // la escarapela del 1 sobre el vasito («win»)
  const gana = lin(t, @s(9.6), @s(9.8)); if (gana > 0) escarapela(78, Math.round(114 - (1 - gana) * 8 + Math.sin(t * 4)), 1);
  // los azucarillos que se apilan junto a la lata
  const nAz = Math.floor(lin(t, lata, cansa) * 10);
  for (let k = 0; k < nAz; k++) { const x = 232 + (k % 3) * 8, y = 172 - Math.floor(k / 3) * 7; caja(x, y - 6, x + 7, y, hex('#ffffff'), hex('#8a8a8a')); R.pset(x + 2, y - 3, hex('#d8d8d8')); }
  // la lata entera: la trae una mano por la derecha
  const ce = sm(lin(t, @s(10.85), @s(11.4))), cs = sm(lin(t, @s(11.6), @s(12.1))), canX = Math.round(lerp(352, 278, ce));
  if (ce > 0) { lataN(canX, 171, 3, { abierta: true });
    for (let k = 0; k < 3; k++) { const u = (t * 1.3 + k / 3) % 1; R.pset(canX - 6 + k * 5, Math.round(116 - u * 10), hex('#c8ecff')); }
    if (cs < 1) { const wx = Math.round(lerp(canX + 30, 346, cs)), wy = Math.round(lerp(158, 196, cs)); T.brazo(R, 344, 206, wx, wy, '#8a4a3a', -1, {}); } }
};

// ── 3 · los dos cuadros: la cata a ciegas y la mesa de casa ──
const fondoCuadros = () => {
  // la pared azul noche con su textura de ladrillo pintado
  for (let y = 0; y <= 179; y++) for (let x = 0; x <= 319; x++) { const f = Math.floor(y / 6), jx = (x + (f % 2) * 8) % 16 === 0, jy = y % 6 === 0; R.pset(x, y, jx || jy ? hex('#161828') : R.tone(rp('#1c1e32', '#22263c', '#2a2e46'), 1 + (hh(x, y, 2) - 0.5) * 0.6 + (hh(Math.floor(x / 16), f, 3) - 0.5) * 0.5, x, y)); }
  // la repisa de abajo
  tablas(0, 164, 319, 179, rp('#3a2414', '#54361e', '#6a4628', '#7a5432'), 5, 6); R.rect(0, 163, 319, 163, K0);
  // los marcos
  for (const x0 of [8, 164]) { R.rect(x0 + 3, 49, x0 + 151, 161, hex('#0c0c14')); caja(x0 - 2, 44, x0 + 148, 158, hex('#6a4a2a')); R.rect(x0 - 1, 45, x0 + 147, 46, hex('#9a7040')); R.rect(x0 + 1, 47, x0 + 145, 155, hex('#2a1a0e')); }
  // ── el cuadro izquierdo: el súper de 1984 (x 10–154, y 48–154) ──
  llena(10, 48, 154, 154, rp('#c8ccc0', '#d8dccf', '#e4e8dc'), (x, y) => 1.6 + (hh(x, y) - 0.5) * 0.3);
  for (const y0 of [54, 74, 94]) { R.rect(10, y0 + 16, 154, y0 + 18, hex('#8a8e96')); R.rect(10, y0 + 16, 154, y0 + 16, hex('#c8ccd4'));
    for (let x = 12; x < 152; x += 5) { const h = 8 + Math.floor(hh(x, y0) * 7), c = [hex('#e8a83a'), hex('#5a9a4a'), hex('#d86a3a'), hex('#e8d86a'), hex('#8a6ab0'), hex('#4ab0a8')][Math.floor(hh(x, y0, 1) * 6)]; rc(x, y0 + 16 - h, x + 3, y0 + 15, c); R.pset(x, y0 + 16 - h, mez(c, 0xffffffff, 0.4)); } }
  for (let y = 114; y <= 154; y++) for (let x = 10; x <= 154; x++) R.pset(x, y, ((Math.floor((x - 82) / (6 + (y - 114) * 0.2) + 100) + Math.floor((y - 114) / 5)) % 2) ? hex('#d8d0c0') : hex('#b8b0a0'));
  // ── el cuadro derecho: la cocina de casa al atardecer (x 166–310) ──
  llena(166, 48, 310, 154, rp('#c89a8a', '#d8aa96', '#e8bca4'), (x, y) => 1.4 + (Math.sin(x * 0.5) > 0.6 ? 0.5 : 0) + ((x % 12 === 6 && y % 10 === 5) ? 1 : 0));
  for (let x = 166; x <= 310; x += 12) for (let y = 52; y < 120; y += 10) { R.pset(x + 6, y + 5, hex('#e8786a')); R.pset(x + 5, y + 5, hex('#e8786a')); R.pset(x + 6, y + 4, hex('#5a8a4a')); }
  caja(176, 56, 214, 92, hex('#f2ece0')); // marco de la ventana
  R.rect(166, 118, 310, 120, hex('#7a5a3a')); for (let y = 121; y <= 154; y++) for (let x = 166; x <= 310; x++) R.pset(x, y, (Math.floor(x / 8) + Math.floor(y / 8)) % 2 ? hex('#c8b090') : hex('#e0cca8'));
  // la nevera con sus imanes
  caja(278, 62, 306, 140, hex('#f2f0e6'), hex('#5a5a5a')); R.rect(279, 96, 305, 96, hex('#8a8a8a')); R.rect(300, 72, 302, 88, hex('#b8b8b8')); R.rect(300, 102, 302, 120, hex('#b8b8b8'));
  for (const [x, y, c] of [[284, 70, '#e84a4a'], [292, 78, '#4a8ae8'], [286, 108, '#e8c84a'], [290, 120, '#4ab04a']]) R.rect(x, y, x + 3, y + 3, hex(c));
  caja(282, 100, 296, 116, hex('#ffffff')); for (let y = 103; y < 114; y += 3) R.pset(284 + (y % 5), y, hex('#e84a4a'));
};
const p3 = (t) => {
  capa('sor-cuadros', fondoCuadros);
  // la guirnalda de bombillas sobre los cuadros
  for (let x = 0; x <= 270; x++) { const y = Math.round(26 + Math.sin(x / 270 * Math.PI * 3) * 4 + 4); R.pset(x, y, hex('#3a3a3a')); if (x % 18 === 9) { const on = Math.sin(t * 3 + x) > -0.4; R.disco(x, y + 3, 2, on ? hex(['#ffd86a', '#ff8a6a', '#8ae0ff'][(x / 18 | 0) % 3]) : hex('#5a5040')); if (on) luz(x, y + 3, 6, hex('#ffe8a0'), 0.25); } }
  // el «2»
  const dos = lin(t, @s(14.1), @s(14.3)); if (dos > 0) { R.disco(160, 30, 12, K0); R.disco(160, 30, 11, hex('#ffe890')); R.numero('2', 161, Math.round(38 - (1 - dos) * 4), { tam: 16, centro: true, color: K0, sombra: false }); }
  // ── el súper: la cata a ciegas ──
  R.recorte([10, 48, 154, 154]);
  // el fluorescente y la gente que pasa al fondo
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * (12 + k * 5) + k * 70) % 180) - 14); mini(x, 112, hex(['#6a4a8a', '#3a6a5a'][k]), hex('#3a2a1a'), t, true, k); }
  // la catadora con la venda (detrás de la mesa), el empleado con la bandeja
  const tantea = t > @s(15.0) && t < @s(17.4), hx = tantea ? Math.round(Math.sin((t - @s(15.0)) * 4) * 4) : 0;
  const cat = R.actor(NC.estudiante, 66, 136, t, { dir: 1, sostiene: tantea ? [86 + hx, 127] : undefined, habla: t > @s(16.2) && t < @s(16.8) && Math.sin(t * 9) > 0 });
  venda(cat.cabeza, 1, t);
  if (tantea) R.icono('?', 70, 98 - Math.round(Math.sin(t * 5) * 2), hex('#ffe890'), K0, 2);
  R.actor(NC.empleadoPepsi, 118, 152, t, { dir: -1, sonrisa: true, dedo: t > @s(15.1) && t < @s(15.8) });
  // la mesa de la cata con su faldón blanco y los dos vasos
  for (let y = 124; y <= 146; y++) for (let x = 36; x <= 112; x++) R.pset(x, y, y === 124 || x === 36 || x === 112 ? K0 : y < 128 ? hex('#ffffff') : ((x - 36) % 8 < 1 ? hex('#d8d8e0') : hex('#f2f2f6')));
  const ga = tantea && Math.abs((86 + hx) - 82) < 4 ? Math.round(Math.sin(t * 30)) : 0, gb = tantea && Math.abs((86 + hx) - 96) < 5 ? Math.round(Math.sin(t * 30)) : 0;
  PZ.vaso(R, 82 + ga, 126, { lleno: 0.7 }); PZ.vaso(R, 98 + gb, 126, { lleno: 0.7 });
  rc(48, 112, 60, 124, hex('#f2f2f6')); R.icono('?', 51, 115, hex('#c83a32'), hex('#f2f2f6'));
  R.recorte(null);
  // ── la cocina de casa ──
  R.recorte([166, 48, 310, 154]);
  // la ventana al atardecer con el sol que baja
  llena(178, 58, 212, 90, rp('#f0a04a', '#f6b860', '#fad080', '#fde6a8'), (x, y) => 3.4 - (y - 58) / 9 + (hh(x, y) - 0.5) * 0.3);
  R.disco(196, Math.round(84 + Math.sin(t * 0.2)), 5, hex('#fff2c0')); for (let x = 178; x <= 212; x++) rc(x, 86, x, 90, hex('#6a4a5a'));
  R.rect(194, 58, 195, 90, hex('#f2ece0')); R.rect(178, 73, 212, 74, hex('#f2ece0'));
  luz(196, 80, 30, hex('#ffd8a0'), 0.15);
  // la tele pequeña que parpadea en la encimera del fondo
  rc(222, 98, 248, 118, hex('#5a4a3a')); rc(224, 100, 242, 116, Math.sin(t * 7) > 0 ? hex('#7ab0d8') : hex('#5a90c0')); rc(244, 102, 246, 104, hex('#c8a060'));
  // la señora coge su lata, bebe y sonríe; el marido lee el periódico; el perro
  const coge = @s(15.85), bebe = @s(16.4), deja = @s(17.2);
  const alza = sm(lin(t, coge, bebe)) * (1 - sm(lin(t, deja, deja + 0.3)));
  const se = R.actor(NC.senora75, 206, 140, t, { dir: 1, sostiene: t > coge - 0.05 ? [lerp(228, 220, alza), lerp(136, 124, alza)] : undefined, sonrisa: t > bebe + 0.2, habla: t > @s(14.4) && t < @s(15.4) && Math.sin(t * 8) > 0 });
  R.actor(NC.vecinoSotano, 262, 140, t, { dir: -1, sostiene: [256, 130], habla: t > @s(17.3) && Math.sin(t * 8) > 0, sonrisa: t > @s(17.2) });
  caja(244, 116, 258, 134, hex('#e8e2d0')); for (let y = 119; y < 132; y += 3) R.rect(246, y, 256, y, hex('#8a8478'));
  // la mesa de cuadros
  for (let y = 132; y <= 152; y++) for (let x = 190; x <= 286; x++) R.pset(x, y, y === 132 || x === 190 || x === 286 ? K0 : (Math.floor((x - 190) / 5) + Math.floor((y - 132) / (y < 136 ? 2 : 5))) % 2 ? hex('#d83a3a') : hex('#f6f0e6'));
  for (let x = 191; x < 286; x++) R.pset(x, 136, hex('#8a2424'));
  if (t > coge - 0.05) lataV(se.mano[0] + 2, se.mano[1] + 8); else lataV(230, 134);
  PZ.vaso(R, 270, 134, { lleno: 0.5 });
  caja(236, 127, 252, 134, hex('#f2e0b0')); for (let k = 0; k < 4; k++) R.disco(238 + k * 4, 128, 1, hex('#c86a3a'));
  // el perro bajo la mesa: mueve la cola y ladra
  { const dx = 214, dy = 154, cola = Math.sin(t * 14) * 3, ladra = t > @s(17.15) && t < @s(17.5);
    rc(dx, dy - 8, dx + 16, dy - 2, hex('#8a5a2a')); rc(dx + 14, dy - 13, dx + 22, dy - 6, hex('#9a6a32')); rc(dx + 21, dy - 10, dx + 24, dy - (ladra ? 5 : 7), hex('#9a6a32')); R.pset(dx + 19, dy - 11, K0); R.pset(dx + 24, dy - 10, K0);
    rc(dx + 14, dy - 13, dx + 15, dy - 8, hex('#5a3a1a')); rc(dx + 1, dy - 1, dx + 2, dy + 1, hex('#5a3a1a')); rc(dx + 12, dy - 1, dx + 13, dy + 1, hex('#5a3a1a'));
    R.linea(dx, dy - 7, Math.round(dx - 4), Math.round(dy - 11 + cola), hex('#8a5a2a'));
    if (ladra) R.icono('!', dx + 26, dy - 22, hex('#ffd36a'), K0); }
  const cor = lin(t, @s(17.05), @s(17.25)); if (cor > 0) corazon(Math.round(se.cabeza[0] - 3), Math.round(se.cabeza[1] - 18 - cor * 3 + Math.sin(t * 6)), 2, hex('#e83a4a'));
  R.recorte(null);
  // la luz fría del súper y la cálida de casa
  for (let y = 48; y <= 154; y++) { for (let x = 10; x <= 154; x += 1) if ((x + y) % 7 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#d8f0ff'), 0.15)); }
  // la planta y los libros de la repisa
  planta(160, 164, t, 18);
  for (let k = 0; k < 5; k++) caja(20 + k * 6, 150 + (k % 2) * 3, 25 + k * 6, 163, [hex('#8a3a2a'), hex('#2a5a7a'), hex('#c8a040'), hex('#3a6a3a'), hex('#6a3a6a')][k]);
};

const efectos = [[@s(0.95), 'whoosh'], [@s(1.7), 'boing'], [@s(3.9), 'pop'], [@s(4.95), 'campana'], [@s(5.65), 'boing'], [@s(6.62), 'pop'],
  [@s(8.45), 'burbujas'], [@s(9.62), 'brillo'], [@s(11.35), 'toc'], [@s(12.95), 'boing'],
  [@s(14.12), 'pop'], [@s(15.2), 'golpecito'], [@s(16.45), 'burbujas'], [@s(17.2), 'guau']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => t < P2 ? 2026 : 1984 });
'''))

# ───────────────────────────────────────── NC-ESCANER ─────────────────────────────────────────
E['nc-escaner'] = ('El escáner', r'''// NC-ESCANER (frase 24, «In 2004, scientists in Texas saw it with a brain scanner…»), cartela «2004» y barra en 2004.
// Cinco planos:
// 1. La sala del escáner de Houston (hoy/escaner): el voluntario tumbado con la cabeza en el túnel; el investigador
//    entra en «scientists», en «saw it» pulsa la bomba y el refresco corre por el tubito; en «brain scanner» la máquina
//    zumba y vibra; la científica habla por el intercomunicador y sonríe.
// 2. Corta en «With unmarked cups»: inserto de la mesa del laboratorio (fondo local): la balanza de platillos con un vaso
//    sin marca; una mano enguantada deja el otro vaso en «cups»; la balanza oscila y en «split» queda nivelada («=»);
//    detrás, la ventana a Houston, el microscopio, la gradilla, la centrífuga que gira y el monitor con el trazado.
// 3. Corta en «But when»: la sala de reuniones (fondo local): el investigador le enseña la lata roja al voluntario en
//    «knew»; él la coge y bebe en «drinking», y en «preferred it» sale un corazón; la científica señala el rotafolio, donde
//    la barra roja (con su lata encima) sube muy por encima de la azul.
// 4. Corta en «and the scanner»: la sala de control (hoy/escaner/pantalla, gag 7): en «lit up» el cerebro de la lata roja
//    se enciende como un árbol de Navidad (zonas, guirnalda de luces y la estrella); la científica alza los brazos y el
//    investigador señala; en «Pepsi brand» el recuadro pasa al cerebro de la lata azul: nada.
// 5. Corta en «nothing»: inserto de la consola (fondo local): el osciloscopio plano junto a la foto de la lata azul y el
//    contador en 0; una mano da golpecitos en el cristal y gira el mando: nada; un grillo cruza la consola de un salto.
''', COMUN + F(r'''
const P2 = @e(5.7), P3 = @e(9.62), P4 = @e(13.85), P5 = @e(18.0);

// ── 1 · la sala del escáner ──
const p1 = (t) => {
  const o = { encuadre: 'escaner', tumbado: true, bebe: lin(t, @e(3.85), @e(5.2)), ruido: t > @e(4.75) };
  T.hoy(R, t, o);
  // el investigador entra por la puerta blindada, pulsa la bomba y mira a la ventana de control
  const ent = sm(lin(t, @e(2.4), @e(3.5))), ix = Math.round(lerp(10, 66, ent));
  R.actor(NC.investigador, ix, 166, t, { dir: t > @e(4.6) ? 1 : -1, anda: ent > 0 && ent < 1, dedo: (t > @e(3.75) && t < @e(4.3)) || t > @e(4.85), sonrisa: t > @e(4.85) });
  if (t > @e(3.8) && t < @e(4.3)) R.icono('!', 56, 70, hex('#ffd36a'), K0);
  // la científica al intercomunicador, con su tablilla
  R.actor(NC.cientifica, 214, 164, t, { dir: -1, habla: t > @e(2.8) && t < @e(4.0) && Math.sin(t * 9) > 0, sorpresa: t > @e(4.8) && t < @e(5.2), sonrisa: t > @e(5.2) });
  T.hoyDelante(R, t, o);
};

// ── 2 · la balanza de la mesa del laboratorio ──
const fondoMesaLab = () => {
  // la pared de bloques pintados de verde pálido (arriba, lisa y tranquila)
  llena(0, 0, 319, 34, rp('#b8c6bc', '#c4d2c8', '#d0ded4'), (x, y) => 1.6 + (hh(x, y) - 0.5) * 0.3);
  for (let y = 35; y <= 121; y++) for (let x = 0; x <= 319; x++) { const f = Math.floor((y - 35) / 9), jx = (x + (f % 2) * 12) % 24 === 0, jy = (y - 35) % 9 === 0; R.pset(x, y, jx || jy ? hex('#9aa8a0') : R.tone(rp('#b0beb4', '#bccac0', '#c8d6cc'), 1.6 + (hh(x, y, 3) - 0.5) * 0.4, x, y)); }
  R.rect(0, 34, 319, 34, hex('#9aa8a0'));
  // la ventana a Houston (x 10–86, y 22–88): marco
  caja(8, 20, 88, 90, hex('#e8ece8'), hex('#5a6a62')); R.rect(6, 90, 90, 93, hex('#d8dcd8'));
  // la balda con los cerebros de escayola y las carpetas
  R.rect(96, 44, 204, 46, hex('#8a8e96')); R.rect(96, 47, 204, 47, hex('#5a5e66'));
  PZ.cerebro(R, 112, 44, {}); PZ.cerebro(R, 140, 44, {});
  for (let k = 0; k < 7; k++) caja(158 + k * 6, 26 + (k % 3), 163 + k * 6, 43, [hex('#3a5a9a'), hex('#c84a3a'), hex('#e8c84a'), hex('#3a7a4a'), hex('#5a5a6a'), hex('#3a5a9a'), hex('#8a4a8a')][k]);
  // el póster del cerebro con sus zonas (sin letras) y el tablero perforado pequeño con el vidrio
  caja(98, 54, 132, 80, hex('#f6f2e6'), hex('#5a6a62')); PZ.cerebro(R, 115, 76, { zonas: 0.6 }); for (const [x, y] of [[102, 58], [128, 58]]) R.pset(x, y, hex('#c83a32'));
  caja(140, 52, 206, 80, hex('#c8b48a'), hex('#6a5a3a')); for (let y = 56; y < 78; y += 4) for (let x = 144; x < 204; x += 4) R.pset(x, y, hex('#8a7a5a'));
  for (const [x, k] of [[150, 0], [164, 1], [178, 0], [194, 1]]) { const y = 56;
    if (k) { caja(x - 3, y, x + 3, y + 18, hex('#d8eef4'), hex('#5a7a8a')); R.rect(x - 2, y + 10, x + 2, y + 17, hex('#8ac8e8')); }
    else { R.rect(x - 1, y, x + 1, y + 6, hex('#5a7a8a')); for (let j = 0; j < 10; j++) R.rect(x - 1 - (j >> 1), y + 6 + j, x + 1 + (j >> 1), y + 6 + j, j === 9 ? hex('#5a7a8a') : j > 4 ? hex('#e8a8c8') : hex('#d8eef4')); } }
  // la mesa de resina negra (y 122–134) y los cajones grises
  for (let y = 122; y <= 134; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#1a1c20', '#24272c', '#30333a', '#3e424a'), 1.5 + (y - 122) / 10 + ((x + y * 2) % 40 < 3 ? 1 : 0) + (hh(x, y, 4) - 0.5) * 0.3, x, y));
  R.rect(0, 122, 319, 122, hex('#5a5e66'));
  for (let x0 = 0; x0 < 320; x0 += 54) { caja(x0, 136, x0 + 52, 179, hex('#9aa0a8'), hex('#4a4e56')); R.rect(x0 + 2, 137, x0 + 50, 138, hex('#c8ccd4')); R.rect(x0 + 18, 150, x0 + 34, 152, hex('#5a5e66')); R.rect(x0 + 18, 150, x0 + 34, 150, hex('#d8dce4')); R.rect(x0 + 1, 160, x0 + 51, 160, hex('#6a6e76')); R.rect(x0 + 18, 168, x0 + 34, 170, hex('#5a5e66')); }
  R.rect(0, 135, 319, 135, K0);
  // las pegatinas de peligro biológico de los cajones (pictogramas) y la bata colgada
  for (const x of [80, 188]) { R.disco(x, 144, 3, hex('#e8c83a')); R.disco(x, 144, 1, K0); }
  // la papelera de delante
  caja(132, 152, 154, 179, hex('#e8c83a'), hex('#5a4a1a')); R.rect(130, 150, 156, 153, hex('#c8a82a')); R.disco(143, 165, 5, hex('#3a3a2a')); R.disco(143, 165, 3, hex('#e8c83a')); R.disco(143, 165, 1, hex('#3a3a2a'));
  // el microscopio
  caja(20, 116, 46, 123, hex('#e8e8ec')); R.rect(30, 90, 34, 116, hex('#e8e8ec')); R.rect(30, 90, 30, 116, K0); R.rect(34, 90, 34, 116, K0);
  for (let k = 0; k < 14; k++) R.rect(28 + Math.round(k * 0.5), 76 + k, 33 + Math.round(k * 0.5), 76 + k, k === 0 ? K0 : hex('#3a3a46')); R.rect(26, 102, 40, 104, hex('#5a5a66')); R.disco(38, 98, 3, hex('#5a5a66'));
  // la gradilla de tubos de ensayo
  caja(52, 108, 90, 122, hex('#d8d0b8')); for (let k = 0; k < 6; k++) { const x = 56 + k * 6, c = [hex('#e84a4a'), hex('#4a8ae8'), hex('#e8c84a'), hex('#4ab04a'), hex('#c84ae8'), hex('#e8884a')][k]; R.rect(x, 96, x + 3, 112, K0); R.rect(x + 1, 97, x + 2, 111, hex('#e8f4f8')); R.rect(x + 1, 104, x + 2, 111, c); }
  // el monitor beis (x 140–196) con su teclado
  caja(140, 84, 196, 122, hex('#d8d0b8')); R.rect(144, 88, 192, 114, hex('#0e1a12')); R.rect(150, 117, 186, 119, hex('#a89a80'));
};
const BX = 250;
const balanza = (t, th, cupDer) => {
  const cx = BX, py = 58, L = 34, dx = Math.cos(th) * L, dy = Math.sin(th) * L;
  for (let i = -16; i <= 16; i++) R.rect(cx + i, 116 + Math.round(Math.abs(i) * 0.25), cx + i, 122, Math.abs(i) > 14 ? K0 : i < -6 ? hex('#d8b860') : hex('#b8943a'));
  R.rect(cx - 3, py, cx + 3, 117, K0); R.rect(cx - 2, py, cx + 2, 117, hex('#c8a048')); R.rect(cx - 2, py, cx - 2, 117, hex('#f0d080'));
  for (let k = -3; k <= 3; k++) R.pset(cx + k * 3, 46 - Math.round(Math.abs(k) * 0.4), hex('#6a5a2a')); R.pset(cx, 45, hex('#c83a32')); R.pset(cx, 44, hex('#c83a32'));
  R.linea(cx, py, Math.round(cx + Math.sin(th) * 12), Math.round(py - Math.cos(th) * 12), hex('#2a2a2a'));
  const ex = [Math.round(cx - dx), Math.round(py - dy)], ed = [Math.round(cx + dx), Math.round(py + dy)];
  R.linea(ex[0], ex[1] - 1, ed[0], ed[1] - 1, K0); R.linea(ex[0], ex[1], ed[0], ed[1], hex('#e0b850')); R.linea(ex[0], ex[1] + 1, ed[0], ed[1] + 1, hex('#8a6a24')); R.linea(ex[0], ex[1] + 2, ed[0], ed[1] + 2, K0);
  R.disco(cx, py, 4, K0); R.disco(cx, py, 3, hex('#f0d080')); R.pset(cx, py, K0);
  for (const [e, conVaso] of [[ex, true], [ed, cupDer]]) { const yP = e[1] + 34;
    for (const s of [-11, 0, 11]) for (let j = 0; j <= 30; j += 2) R.pset(Math.round(e[0] + s * j / 30), e[1] + 2 + j, hex('#8a6a24'));
    for (let i = -13; i <= 13; i++) { const h = Math.round(Math.sqrt(169 - i * i) * 0.28); R.rect(e[0] + i, yP, e[0] + i, yP + h, Math.abs(i) > 11 ? K0 : i < -4 ? hex('#f0d080') : hex('#c8a048')); } R.rect(e[0] - 13, yP - 1, e[0] + 13, yP - 1, K0);
    if (conVaso) PZ.vaso(R, e[0], yP - 1, { lleno: 0.75 }); }
  return [ex, ed];
};
const p2 = (t) => {
  capa('esc-mesalab', fondoMesaLab);
  // la ventana: el cielo de Houston con nubes y los rascacielos
  R.recorte([10, 22, 86, 88]);
  llena(10, 22, 86, 88, rp('#5a9ad8', '#76aee2', '#94c2ec', '#b8d8f4'), (x, y) => 3.2 - (y - 22) / 22 + (hh(x, y, 2) - 0.5) * 0.3);
  for (const [v, y, w] of [[2, 34, 26], [4, 44, 16], [6, 30, 12]]) nube(Math.round(((t * v + y * 7) % 110) - 12), y, w, rp('#b4c6da', '#e2ecf6', '#ffffff'));
  for (let k = 0; k < 8; k++) { const x0 = 10 + k * 10, h = 18 + Math.floor(hh(k, 3) * 30); rc(x0, 88 - h, x0 + 8, 88, hex(['#5a6a7a', '#6a7a8a', '#4a5a6a'][k % 3])); for (let j = 88 - h + 3; j < 88; j += 4) for (let i = x0 + 1; i < x0 + 8; i += 3) R.pset(i, j, hex('#a8c8e0')); }
  pajaros(t, 30, hex('#3a3a46'), 2, 12, 10, 86);
  R.recorte(null);
  R.rect(47, 22, 48, 88, hex('#e8ece8')); R.rect(10, 55, 86, 56, hex('#e8ece8'));
  // la centrífuga que gira y el trazado del monitor
  caja(98, 106, 126, 122, hex('#e8e8ec')); { const a = t * 18; R.disco(112, 106, 9, K0); R.disco(112, 106, 8, hex('#9aa0aa')); for (let k = 0; k < 4; k++) { const b = a + k * Math.PI / 2; R.disco(Math.round(112 + Math.cos(b) * 5), Math.round(106 + Math.sin(b) * 2), 1, hex('#e84a4a')); } R.pset(122, 116, Math.sin(t * 8) > 0 ? hex('#4ae84a') : hex('#2a6a2a')); }
  R.recorte([144, 88, 192, 114]);
  for (let x = 144; x <= 192; x++) { const y = Math.round(101 + Math.sin((x + t * 40) * 0.3) * 3 + (hh(Math.floor(x + t * 40), 1) - 0.5) * 4); R.pset(x, y, hex('#5af08a')); }
  R.recorte(null);
  // la taza que humea
  caja(204, 110, 216, 122, hex('#ffffff')); R.rect(205, 112, 215, 113, hex('#3a6ac8')); for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(Math.round(209 + Math.sin(u * 6 + t) * 2), Math.round(108 - u * 12), mez(hex('#ffffff'), hex('#c4d2c8'), u)); }
  // la balanza: inclinada con un vaso; la mano deja el otro en «cups»; oscila y se nivela en «split»
  const deja = @e(6.55), nivela = @e(7.8);
  let th = -0.32;
  if (t > deja) { const s = t - deja; th = -0.32 * Math.exp(-s * 2.3) * Math.cos(s * 8); }
  if (t > nivela) th *= Math.max(0, 1 - (t - nivela) * 3);
  const [, ed] = balanza(t, th, t > deja);
  // la mano enguantada entra por la derecha con el segundo vaso, lo deja en el platillo y se va
  const e1 = sm(lin(t, P2 + 0.1, deja)), s1 = sm(lin(t, deja + 0.15, deja + 0.7));
  if (s1 < 1) { const destX = ed[0] + 16, destY = ed[1] + 26, wx = Math.round(lerp(lerp(340, destX, e1), 344, s1)), wy = Math.round(lerp(lerp(destY + 10, destY, e1), destY + 14, s1));
    T.brazo(R, wx + 32, wy + 18, wx, wy, '#f2f2f6', -1, { puno: '#8ac8e8' });
    if (t <= deja) { PZ.vaso(R, wx - 16, wy + 7, { lleno: 0.75 }); T.mano(R, wx, wy, -1, '#f2f2f6', { sinManga: true }); } }
  // el «=» cuando se nivela
  const ig = lin(t, nivela, nivela + 0.2); if (ig > 0) { const y = Math.round(94 - (1 - ig) * 4); R.disco(BX, y, 9, K0); R.disco(BX, y, 8, hex('#ffe890')); R.rect(BX - 5, y - 3, BX + 5, y - 2, K0); R.rect(BX - 5, y + 2, BX + 5, y + 3, K0); }
};

// ── 3 · la sala de reuniones: la lata roja y la barra que sube ──
const fondoReunion = () => {
  // la pared beis con zócalo; arriba, lisa
  llena(0, 0, 319, 136, rp('#c8b496', '#d4c0a2', '#dfccb0', '#e8d8be'), (x, y) => 2.4 - y / 120 + (hh(x, y) - 0.5) * 0.35 + (hh(x >> 3, y >> 3, 5) - 0.5) * 0.2);
  R.rect(0, 124, 319, 136, hex('#8a6a4a')); R.rect(0, 124, 319, 124, hex('#a8845a')); R.rect(0, 136, 319, 136, K0);
  // la moqueta azul con su trama
  for (let y = 137; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#2a3448', '#323e54', '#3a4860', '#44526c'), 1.6 + (y - 137) / 40 + (((x >> 1) + (y >> 1)) % 4 === 0 ? 0.6 : 0) + (hh(x, y, 7) - 0.5) * 0.4, x, y));
  // la estantería de la izquierda con libros y un cerebro de escayola
  caja(4, 40, 62, 136, hex('#7a5232'), hex('#3a2414')); for (const y of [64, 88, 112]) R.rect(5, y, 61, y + 2, hex('#5a3a22'));
  for (const y0 of [44, 68, 92, 116]) for (let k = 0; k < 9; k++) { const x = 8 + k * 6, h = 14 + Math.floor(hh(k, y0) * 6); if (y0 === 68 && k > 4) continue; caja(x, y0 + 20 - h, x + 5, y0 + 19, [hex('#8a3a2a'), hex('#2a5a7a'), hex('#c8a040'), hex('#3a6a3a'), hex('#6a3a6a'), hex('#c8c0a8')][(k + y0) % 6]); }
  PZ.cerebro(R, 48, 87, {});
  // el dispensador de agua
  caja(70, 70, 88, 124, hex('#e8e8ec'), hex('#5a5a66')); caja(71, 46, 87, 70, hex('#9ad0f0'), hex('#3a7aa8')); R.rect(72, 52, 86, 69, hex('#7ab8e0')); R.rect(77, 92, 81, 96, hex('#3a7aa8'));
  // la ventana a Houston al atardecer (x 196–270, y 30–96): marco y persiana subida
  caja(194, 28, 272, 98, hex('#f2ece0'), hex('#6a5a4a')); R.rect(192, 98, 274, 101, hex('#e8e0d0')); R.rect(196, 30, 270, 34, hex('#d8d0c0')); for (let x = 198; x < 270; x += 4) R.pset(x, 32, hex('#a8a090'));
  // el cuadro de la neurona (sin letras) y el reloj
  caja(100, 30, 140, 60, hex('#1a2238'), hex('#6a4a2a')); for (let k = 0; k < 7; k++) { const a = k * 0.9; R.linea(120, 45, Math.round(120 + Math.cos(a) * 14), Math.round(45 + Math.sin(a) * 10), hex('#e8a0c8')); } R.disco(120, 45, 3, hex('#f8c8e0'));
};
const p3 = (t) => {
  capa('esc-reunion', fondoReunion);
  // la ventana: el cielo del atardecer, los rascacielos y un avión que cruza
  R.recorte([196, 35, 270, 96]);
  llena(196, 35, 270, 96, rp('#e8784a', '#f09a5a', '#f6bc72', '#fad89a'), (x, y) => 3.4 - (y - 35) / 18 + (hh(x, y, 2) - 0.5) * 0.3);
  for (const [v, y, w] of [[2, 46, 20], [4, 56, 14]]) nube(Math.round(186 + ((t * v + y * 5) % 100)), y, w, rp('#c86a6a', '#e89a7a', '#f8c8a0'));
  for (let k = 0; k < 8; k++) { const x0 = 196 + k * 10, h = 16 + Math.floor(hh(k, 9) * 30); rc(x0, 96 - h, x0 + 8, 96, hex('#4a3a4a')); for (let j = 96 - h + 3; j < 95; j += 4) for (let i = x0 + 1; i < x0 + 8; i += 3) if (hh(i, j) > 0.4) R.pset(i, j, hex('#f8d070')); }
  { const x = Math.round(((t * 9) % 100) + 186); rc(x, 42, x + 6, 43, hex('#f2ece0')); R.pset(x + 2, 41, hex('#f2ece0')); if (Math.sin(t * 6) > 0) R.pset(x - 1, 42, hex('#ff4a3a')); }
  R.recorte(null);
  R.rect(232, 35, 233, 96, hex('#f2ece0'));
  // las burbujas del dispensador
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; R.disco(76 + k * 3, Math.round(68 - u * 18), 1, hex('#e8f8ff')); }
  reloj(178, 50, 8, (5 + t / 3600) / 12, (t / 60 + 0.1) % 1, hex('#f6f0e0'));
  // el rotafolio en su caballete con las dos barras (y las latas encima)
  R.linea(130, 104, 120, 170, hex('#5a5a66')); R.linea(166, 104, 176, 170, hex('#5a5a66')); R.linea(148, 104, 148, 168, hex('#4a4a56'));
  caja(124, 92, 172, 150, hex('#f6f6f2'), hex('#3a3a46')); R.rect(124, 92, 172, 95, hex('#3a3a46'));
  for (let y = 100; y < 148; y += 6) for (let x = 126; x < 171; x += 2) R.pset(x, y, hex('#d8dce4'));
  R.linea(130, 146, 168, 146, K0); R.linea(130, 100, 130, 146, K0);
  const sube = sm(lin(t, @e(12.0), @e(13.1))), hR = Math.round(14 + sube * 26), hA = 14;
  caja(136, 146 - hR, 148, 146, hex('#d83a32')); R.rect(137, 147 - hR, 138, 145, hex('#f06a5a'));
  caja(152, 146 - hA, 164, 146, hex('#3a6ac8')); R.rect(153, 147 - hA, 154, 145, hex('#6a9ae8'));
  // la científica señala el rotafolio
  R.actor(NC.cientifica, 102, 168, t, { dir: 1, dedo: t > @e(11.9) && t < @e(13.4), habla: t > @e(12.2) && t < @e(12.9) && Math.sin(t * 9) > 0, sonrisa: t > @e(13.0) });
  // el voluntario recibe la lata, bebe y sonríe; el investigador se la da
  const da = @e(10.1), coge = @e(10.55), bebe = @e(10.95), baja = @e(11.6);
  const alza = sm(lin(t, bebe, bebe + 0.25)) * (1 - sm(lin(t, baja, baja + 0.25)));
  const vo = R.actor(NC.voluntario, 208, 168, t, { dir: 1, sostiene: t > coge ? [lerp(226, 218, alza), lerp(150, 140, alza)] : [224, 152], sonrisa: t > bebe + 0.3, sorpresa: t > da && t < coge });
  const inv = R.actor(NC.investigador, 252, 168, t, { dir: -1, sostiene: t > da - 0.3 && t < coge ? [244, 148] : undefined, sonrisa: t > coge, habla: t > @e(9.7) && t < da && Math.sin(t * 9) > 0 });
  if (t > coge) lataV(vo.mano[0] + 2, vo.mano[1] + 8); else if (t > da - 0.3) lataV(inv.mano[0] - 1, inv.mano[1] + 8); else lataV(296, 168);
  if (t <= coge) PZ.vaso(R, vo.mano[0] + 3, vo.mano[1] + 7, { lleno: 0.5 });
  if (t > da && t < coge) R.icono('!', 214, 128, hex('#ffd36a'), K0, 2);
  const cor = lin(t, @e(12.8), @e(13.0)); if (cor > 0) corazon(212, Math.round(122 - cor * 4 + Math.sin(t * 6)), 2, hex('#e83a4a'));
  // las latas encima de las barras
  lataV(142, 145 - hR); lataA(158, 145 - hA);
  // la mesita con el vaso que deja y una planta
  caja(278, 150, 310, 154, hex('#8a6a4a')); R.rect(282, 155, 284, 170, hex('#5a3a22')); R.rect(304, 155, 306, 170, hex('#5a3a22'));
  if (t > coge) PZ.vaso(R, 290, 150, { lleno: 0.5 });
  planta(300, 150, t, 16);
};

// ── 4 · la sala de control: el cerebro se ilumina (gag 7) ──
const p4 = (t) => {
  const luces = lin(t, @e(14.24), @e(15.7)), azul = t > @e(17.3);
  const o = { encuadre: 'escaner', camara: 'pantalla', marcaIzq: 'azul', marcaDer: 'rojo', zonas: luces, zonasIzq: 0 };
  T.hoy(R, t, o);
  // la guirnalda de bombillas de colores alrededor del cerebro de la derecha y la estrella
  R.recorte([99, 25, 259, 109]);
  if (luces > 0) { const n = 22; for (let k = 0; k < n; k++) { if (k / n > luces * 1.2) continue; const a = k / n * Math.PI * 2 - Math.PI / 2, x = Math.round(220 + Math.cos(a) * 40), y = Math.round(60 + Math.sin(a) * 30);
      const on = Math.sin(t * 7 + k * 1.9) > -0.2, c = hex(['#ff4a4a', '#ffd84a', '#4ae86a', '#4aa8ff', '#ff8ae8'][k % 5]); R.disco(x, y, 2, K0); R.disco(x, y, 1, on ? c : mez(c, K0, 0.5)); if (on) luz(x, y, 5, c, 0.3); }
    if (luces > 0.6) { const s = 3 + Math.round(Math.sin(t * 8)); for (let k = -s; k <= s; k++) { R.pset(220 + k, 30, hex('#fff27a')); R.pset(220, 30 + k, hex('#fff27a')); } R.pset(219, 29, hex('#ffffff')); R.pset(221, 31, hex('#ffffff')); } }
  // el recuadro que pasa al cerebro de la lata azul: nada
  if (azul) { const on = Math.floor(t * 4) % 2 === 0; if (on) for (let x = 102; x <= 178; x++) { R.pset(x, 28, hex('#ffe890')); R.pset(x, 106, hex('#ffe890')); } if (on) for (let y = 28; y <= 106; y++) { R.pset(102, y, hex('#ffe890')); R.pset(178, y, hex('#ffe890')); } }
  R.recorte(null);
  // la científica alza los brazos; el investigador señala la de la derecha y luego la de la izquierda
  R.actor(NC.cientifica, 150, 172, t, { dir: 1, brazos: t > @e(14.4) && t < @e(15.6), sorpresa: t > @e(14.25) && t < @e(14.6), sonrisa: t > @e(14.6) && !azul, habla: azul && t > @e(17.6) && Math.sin(t * 8) > 0 });
  R.actor(NC.investigador, 60, 172, t, { dir: 1, dedo: (t > @e(15.4) && t < @e(16.6)) || t > @e(17.35), sonrisa: t > @e(15.4) && !azul, habla: t > @e(15.6) && t < @e(16.4) && Math.sin(t * 9) > 0 });
  if (azul) R.icono('?', 66, 120 - Math.round(Math.sin(t * 5) * 2), hex('#ffe890'), K0, 2);
  T.hoyDelante(R, t, o);
};

// ── 5 · la consola: el osciloscopio no se mueve ──
const fondoConsola = () => {
  // la sala de control a oscuras y el ventanal a la sala del escáner (azul y desenfocado)
  llena(0, 0, 319, 70, rp('#0a0c14', '#10141e', '#161c28'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.3);
  caja(14, 8, 262, 64, hex('#1a3048'), hex('#3a3e48')); llena(16, 10, 260, 62, rp('#14283c', '#1c3650', '#264664', '#30567a'), (x, y) => 1.4 + Math.sin(x * 0.04) * 0.6 + (hh(x, y, 3) - 0.5) * 0.4);
  for (let j = 0; j < 22; j++) for (let i = 0; i < 70; i++) { const d = Math.hypot((i - 35) / 35, (j - 11) / 11); if (d < 1) R.pset(100 + i, 30 + j, mez(R.pget(100 + i, 30 + j), hex('#c8d8e8'), 0.35 * (1 - d))); }
  // la máquina vista por el cristal: la carcasa con su franja, la boca iluminada, la camilla y la bomba
  R.rect(76, 22, 140, 60, hex('#8aa0b8')); R.rect(78, 24, 138, 58, hex('#a8bccc')); R.rect(78, 40, 138, 43, hex('#3a5a8a')); R.disco(100, 41, 11, hex('#5a7088')); R.disco(100, 41, 8, hex('#0e1a26')); R.disco(100, 41, 5, hex('#5a8ac8'));
  R.rect(30, 46, 90, 49, hex('#7a8ea4')); R.rect(40, 50, 44, 60, hex('#5a6e84')); R.rect(70, 50, 74, 60, hex('#5a6e84')); R.rect(40, 44, 66, 46, hex('#9aaec2'));
  R.rect(22, 24, 26, 60, hex('#4a5e74')); caja(18, 22, 30, 32, hex('#6a7e94'));
  R.rect(200, 20, 240, 58, hex('#1e3854')); for (let y = 24; y < 56; y += 6) R.rect(202, y, 238, y + 1, hex('#2e4e70'));
  for (let k = 0; k < 3; k++) for (let i = 0; i < 40; i++) { const x = 40 + k * 80 + i, y = 60 - i; if (y > 10 && x < 260) R.pset(x, y, mez(R.pget(x, y), hex('#ffffff'), 0.12)); }
  // la consola inclinada beis con mandos y botones
  for (let y = 70; y <= 132; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#a89c84', '#b8ac94', '#c8bca4', '#d8ccb4'), 1.4 + (y - 70) / 50 + (hh(x, y, 5) - 0.5) * 0.3, x, y));
  R.rect(0, 70, 319, 71, hex('#5a5244')); R.rect(0, 132, 319, 133, hex('#5a5244'));
  for (let k = 0; k < 6; k++) { const x = 210 + k * 16; R.disco(x, 124, 4, K0); R.disco(x, 124, 3, hex('#3a3a3a')); R.pset(x, 121, hex('#e8e8e8')); }
  for (let k = 0; k < 10; k++) { const x = 8 + k * 6; caja(x, 76, x + 4, 80, [hex('#e84a4a'), hex('#e8c84a'), hex('#4ab04a'), hex('#4a8ae8')][k % 4]); }
  // el escritorio de delante: teclado, ratón, papeles y notas
  for (let y = 134; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#4a4a52', '#56565e', '#62626a'), 1.4 + (y - 134) / 50 + (hh(x, y, 6) - 0.5) * 0.3, x, y));
  caja(170, 150, 262, 170, hex('#d8d0b8')); for (let r = 0; r < 3; r++) for (let k = 0; k < 14; k++) caja(173 + k * 6 + r, 153 + r * 5, 177 + k * 6 + r, 156 + r * 5, hex('#ece6d2'));
  caja(276, 154, 290, 168, hex('#d8d0b8')); R.rect(282, 154, 283, 158, hex('#8a8478'));
  caja(14, 150, 52, 176, hex('#f6f2e6')); for (let y = 154; y < 174; y += 3) R.rect(18, y, 48 - ((y * 3) % 6), y, hex('#a8a498'));
  for (const [x, y, ic] of [[34, 86, '?'], [192, 138, '!']]) { caja(x, y, x + 12, y + 12, hex('#f2dc5a'), hex('#a88a2a')); R.icono(ic, x + 3, y + 3, hex('#3a2a10'), hex('#f2dc5a')); }
};
const p5 = (t) => {
  capa('esc-consola', fondoConsola);
  // las luces del escáner que laten por el ventanal
  for (let k = 0; k < 5; k++) { const on = Math.sin(t * 3 + k * 1.3) > 0; R.rect(180 + k * 12, 16, 183 + k * 12, 17, on ? hex('#8ad0ff') : hex('#2a4a6a')); }
  // los vúmetros y los botones que parpadean
  for (let k = 0; k < 4; k++) { const h = Math.round(4 + Math.abs(Math.sin(t * (3 + k) + k)) * 12); caja(206 + k * 10, 80, 213 + k * 10, 110, hex('#1a1a1a')); for (let j = 0; j < h; j++) R.rect(208 + k * 10, 108 - j * 2, 211 + k * 10, 108 - j * 2, j > 10 ? hex('#e84a4a') : j > 7 ? hex('#e8c84a') : hex('#4ae84a')); }
  for (let k = 0; k < 10; k++) if (Math.sin(t * 4 + k * 2.1) > 0.3) R.rect(9 + k * 6, 77, 11 + k * 6, 79, hex('#ffffff'));
  // el osciloscopio: el trazado plano que corre
  caja(62, 82, 154, 146, hex('#c8bca4'), hex('#3a3a3a')); R.rect(64, 84, 152, 86, hex('#e0d6c0'));
  R.rect(70, 92, 146, 138, hex('#0a1a10'));
  R.recorte([71, 93, 145, 137]);
  for (let x = 71; x <= 145; x += 8) for (let y = 93; y <= 137; y += 2) R.pset(x, y, hex('#1a3a24')); for (let y = 95; y <= 137; y += 8) for (let x = 71; x <= 145; x += 2) R.pset(x, y, hex('#1a3a24'));
  const toque = [@e(18.15), @e(18.5)].some((f) => t > f && t < f + 0.1);
  for (let x = 71; x <= 145; x++) { const y = 115 + (toque && x > 100 && x < 108 ? -1 : 0); R.pset(x, y, hex('#6aff9a')); R.pset(x, y + 1, hex('#2a8a4a')); }
  { const x = 71 + Math.floor((t * 50) % 75); R.disco(x, 115, 1, hex('#e0ffe8')); }
  R.recorte(null);
  for (let k = 0; k < 6; k++) R.pset(73 + k, 95 + k, hex('#4a6a54'));
  // la foto de la lata azul pinzada al lado y el contador en 0
  caja(160, 84, 186, 116, hex('#f4f0e2')); R.rect(163, 87, 183, 108, hex('#2a3048')); lataA(173, 106); R.rect(170, 81, 176, 86, hex('#9aa0aa'));
  caja(160, 120, 186, 136, hex('#1a1a1a')); R.numero('0', 174, 133, { centro: true, color: hex('#ff4a3a'), sombra: false });
  // el monitor de la derecha: el cerebro de la lata roja sigue encendido
  caja(236, 62, 314, 124, hex('#c8bca4'), hex('#3a3a3a')); R.rect(240, 66, 310, 118, hex('#0a0e1a'));
  for (let x = 241; x < 310; x += 6) for (let y = 67; y < 118; y += 2) R.pset(x, y, hex('#141e2e'));
  PZ.cerebro(R, 275, 112, { s: 2, zonas: 1, t }); lataV(300, 116); R.rect(242, 68, 244, 70, hex('#d83a32'));
  // los mandos: la mano da golpecitos en el cristal y gira el mando
  const mano = lin(t, P5, @e(18.1)), sal = lin(t, @e(19.6), @e(20.0));
  if (sal < 1) {
    let wx = 116, wy = 140;
    const go = sm(lin(t, @e(18.75), @e(19.0)));
    wx = Math.round(lerp(116, 152, go)); wy = Math.round(lerp(140, 156, go));
    const tap = [@e(18.15), @e(18.5)].some((f) => t > f - 0.08 && t < f + 0.08) ? -3 : 0;
    wx = Math.round(lerp(lerp(70, wx, sm(mano)), 40, sm(sal))); wy = Math.round(lerp(lerp(214, wy + tap, sm(mano)), 214, sm(sal)));
    T.brazo(R, wx - 22, 214, wx, wy, '#f2f2f6', 1, { codo: [wx - 16, Math.round((214 + wy) / 2 + 4)] });
  }
  // el mando grande que gira
  { const a = lin(t, @e(19.0), @e(19.5)) * Math.PI * 1.5; R.disco(172, 160, 7, K0); R.disco(172, 160, 6, hex('#3a3a3a')); R.disco(172, 160, 4, hex('#5a5a5a')); R.linea(172, 160, Math.round(172 + Math.sin(a) * 5), Math.round(160 - Math.cos(a) * 5), hex('#f2f2f2')); }
  // la taza que humea
  caja(296, 126, 308, 138, hex('#e8e0cc')); for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(Math.round(302 + Math.sin(u * 6 + t) * 2), Math.round(124 - u * 12), mez(hex('#c8c8c0'), hex('#10141e'), u)); }
  // el grillo cruza la consola a saltos
  const g = lin(t, @e(19.9), @e(21.6)); if (g > 0 && g < 1) { const x = lerp(318, 190, g), salto = Math.abs(Math.sin(g * Math.PI * 4)) * 14; grillo(x, Math.round(132 - salto), t); }
};

const efectos = [[@e(2.6), 'puerta'], [@e(3.85), 'bip'], [@e(4.8), 'zumbido'],
  [@e(6.55), 'toc'], [@e(7.8), 'tic'],
  [@e(10.2), 'pop'], [@e(10.95), 'burbujas'], [@e(12.1), 'lapiz'],
  [@e(14.25), 'brillo'], [@e(14.7), 'campana'], [@e(17.35), 'bip'],
  [@e(18.15), 'golpecito'], [@e(18.5), 'golpecito'], [@e(19.05), 'interruptor'], [@e(20.0), 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '2004', año: 2004 });
'''))
