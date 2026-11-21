import re

E = {}

# Marcas de la voz (marcas-ep28.json): inicio y «_fin» de cada frase. En el cuerpo se escribe @c(4.52), @v(…), @g(…)
# con el segundo de la escena en que cae la palabra (linea.json); al generar se convierte en en('marca', fracción).
MARCAS = {'c': ('ciegas', 0.5, 12.504), 'v': ('vuelta', 0.9, 24.947), 'g': ('gracias', 0.5, 23.632)}


def _en(m):
    k, a, b = MARCAS[m.group(1)]
    return "en('%s', %.4f)" % (k, (float(m.group(2)) - a) / (b - a))


def F(s):
    return re.sub(r'@([cvg])\(([\d.]+)\)', _en, s)


# Lo común a las tres escenas del grupo 7 (se antepone a cada cuerpo): el reparto, el búfer de las capas fijas, las
# texturas y las piezas pequeñas que se pintan en la escena.
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
'''

# ───────────────────────────────────────── NC-CIEGAS ─────────────────────────────────────────
E['nc-ciegas'] = ('La cata a ciegas', r'''// NC-CIEGAS (frase 19, «The strangest part is that, in blind taste tests, Mullins himself couldn't tell…»), sin
// cartela; barra en 1985. Tres planos:
// 1. El plató de una tele de Seattle (fondo local): el decorado pintado del skyline al atardecer, la parrilla de focos y el
//    piloto de «en el aire»; Mullins, con la gorra y una venda en los ojos, sentado tras la mesa de cuadros con dos vasos
//    sin marca; el presentador llega con el segundo vaso y lo deja; en «blind» Mullins coge el primero y bebe; el
//    camarógrafo graba con el piloto encendido y la pértiga del micro se mece encima; en «Mullins» el presentador le señala.
// 2. Corta en «couldn't»: inserto de la mesa (fondo local): los dos vasos grandes, la tarjeta de la cata con sus dos
//    casillas y el lápiz; la mano de Mullins duda: va al vaso de la izquierda en «new» y al de la derecha en «old» (salta
//    un «?» sobre cada uno); en «problem» cae sobre la tarjeta y deja un «?» en cada casilla; en «tongues» la venda cae
//    sobre la mesa.
// 3. Corta en «It was»: el despacho de la empresa en Atlanta, de noche (fondo local): Goizueta y Keough ven en la tele de
//    ruedas a Mullins que se quita la venda y se queda de piedra; en «company» sube un «?» grande sobre los dos; Keough
//    se gira y en «realize» se asusta; en «too late» el reloj de péndulo da la hora; por la ventana, la ciudad de noche.
''', COMUN + F(r'''
const P2 = @c(4.52), P3 = @c(8.75);

// ── 1 · el plató de la tele de Seattle ──
const fondoPlato = () => {
  // el techo del plató, oscuro y liso (la esquina de Atom y la barra del año tranquilas)
  llena(0, 0, 319, 24, rp('#0e0e16', '#14141e', '#1a1a26'), (x, y) => 1 + (y > 18 ? 0.6 : 0) + (hh(x, y) - 0.5) * 0.3);
  // la parrilla de focos (celosía de tubos)
  R.rect(0, 16, 262, 17, hex('#4a4a56')); R.rect(0, 22, 262, 22, hex('#3a3a46'));
  for (let x = 0; x < 262; x += 8) { R.linea(x, 17, x + 4, 22, hex('#3a3a46')); R.linea(x + 4, 22, x + 8, 17, hex('#3a3a46')); }
  // la pared del fondo: el ciclorama azul oscuro con su tela
  llena(0, 25, 319, 124, rp('#1a2238', '#222c48', '#2a3656', '#34426a'), (x, y) => 1.2 + (y - 25) / 120 + Math.sin(x * 0.21) * 0.25 + (hh(x, y, 2) - 0.5) * 0.4);
  // el decorado pintado: Seattle al atardecer (x 76–236, y 30–104) con su bastidor
  const X0 = 76, X1 = 236, Y0 = 30, Y1 = 104;
  llena(X0, Y0, X1, Y1, rp('#5a3a7a', '#a24a6a', '#e0704a', '#f0a04a', '#f8d070'), (x, y) => 4.2 - (y - Y0) / (Y1 - Y0) * 4.4 + (hh(x, y, 4) - 0.5) * 0.5);
  R.disco(196, 78, 9, hex('#ffe8a0')); R.disco(196, 78, 7, hex('#fff6d0'));
  nube(110, 46, 26, rp('#c86a6a', '#e89a7a', '#f8c8a0')); nube(170, 40, 20, rp('#c86a6a', '#e89a7a', '#f8c8a0')); nube(224, 50, 18, rp('#c86a6a', '#e89a7a', '#f8c8a0'));
  // el monte nevado al fondo
  for (let x = X0; x <= X1; x++) { const h = 22 - Math.abs(x - 130) * 0.42; for (let y = Math.round(84 - h); y <= 84; y++) R.pset(x, y, y < 84 - h + 5 ? hex('#f0e6f0') : hex('#9a7aa8')); }
  // los rascacielos y la torre de la aguja (siluetas con ventanas encendidas)
  for (let k = 0; k < 14; k++) { const x = X0 + 4 + k * 11 + Math.floor(hh(k, 1) * 4), w = 7 + Math.floor(hh(k, 2) * 5), h = 10 + Math.floor(hh(k, 3) * 18);
    if (x + w > 182 && x < 206) continue; R.rect(x, 96 - h, x + w, 96, hex('#3a2a4a')); for (let j = 96 - h + 2; j < 94; j += 3) for (let i = x + 1; i < x + w; i += 2) if (hh(i, j, k) > 0.55) R.pset(i, j, hex('#f8d070')); }
  R.rect(193, 54, 195, 96, hex('#3a2a4a')); R.rect(186, 56, 202, 58, hex('#3a2a4a')); R.rect(188, 59, 200, 60, hex('#3a2a4a')); R.rect(191, 52, 197, 55, hex('#3a2a4a')); R.rect(194, 44, 194, 52, hex('#3a2a4a'));
  R.rect(X0, 96, X1, Y1, hex('#3a4a7a')); for (let x = X0; x < X1; x += 3) if (hh(x, 1) > 0.5) R.pset(x, 98 + Math.floor(hh(x, 2) * 5), hex('#f0a04a'));
  // el bastidor de madera con sus tornapuntas y los sacos de arena
  R.rect(X0 - 2, Y0 - 2, X1 + 2, Y0 - 1, hex('#6a4a2a')); R.rect(X0 - 2, Y1 + 1, X1 + 2, Y1 + 2, hex('#6a4a2a')); R.rect(X0 - 2, Y0 - 2, X0 - 1, Y1 + 2, hex('#6a4a2a')); R.rect(X1 + 1, Y0 - 2, X1 + 2, Y1 + 2, hex('#6a4a2a'));
  for (const x of [X0 + 8, X1 - 8]) { R.linea(x, Y1 + 2, x + (x < 160 ? -10 : 10), 124, hex('#5a3e24')); caja(x + (x < 160 ? -16 : 6), 118, x + (x < 160 ? -6 : 16), 124, hex('#8a7a5a')); }
  // el foco de pie de la derecha (x 250) y su soporte
  R.rect(256, 70, 257, 124, hex('#5a5a66')); R.linea(256, 124, 246, 128, hex('#5a5a66')); R.linea(257, 124, 268, 128, hex('#5a5a66'));
  caja(246, 60, 266, 74, hex('#3a3a46')); R.rect(244, 62, 245, 72, hex('#2a2a34')); R.rect(247, 61, 265, 62, hex('#6a6a76'));
  // el suelo del plató: gris pintado, con marcas de cinta, rozaduras y cables
  llena(0, 125, 319, 179, rp('#2a2a32', '#34343e', '#3e3e4a', '#4a4a56'), (x, y) => 1.4 + (y - 125) / 60 + (hh(x, y, 5) - 0.5) * 0.6 + (hh(Math.floor(x / 9), Math.floor(y / 3), 6) > 0.92 ? 0.7 : 0));
  for (const [x, y] of [[96, 160], [236, 166], [150, 172]]) { R.rect(x - 4, y, x + 4, y, hex('#e8c040')); R.rect(x, y - 2, x, y + 2, hex('#e8c040')); }
  for (let k = 0; k < 2; k++) for (let x = 0; x < 320; x++) { const y = Math.round(150 + k * 14 + Math.sin(x * 0.05 + k * 2) * 4 + x * 0.04); if (y < 180) { R.pset(x, y, hex('#111118')); R.pset(x, y + 1, hex('#22222a')); } }
  // el monitor de retorno sobre su carro (x 270–304) con la imagen de la mesa
  caja(270, 94, 304, 118, hex('#2a2a32')); R.rect(273, 97, 301, 114, hex('#2a3a6a')); R.rect(273, 108, 301, 114, hex('#6a4a8a'));
  R.rect(285, 119, 288, 150, hex('#4a4a56')); R.rect(276, 150, 297, 152, hex('#3a3a46')); R.disco(278, 154, 2, K0); R.disco(295, 154, 2, K0);
};
// la mesa de la cata (delante de Mullins): mantel de cuadros azules que cae hasta y 160
const mesaPlato = () => {
  for (let y = 136; y <= 160; y++) for (let x = 110; x <= 214; x++) { const fr = y > 139, c = (Math.floor((x - 110) / 6) + Math.floor((y - 136) / (fr ? 6 : 2))) % 2;
    let col = c ? hex('#3a5aa8') : hex('#e8ecf4'); if (fr && ((x - 110) % 14 === 0)) col = mez(col, K0, 0.2); if (y === 160 || x === 110 || x === 214 || y === 136) col = K0; R.pset(x, y, col); }
  for (let x = 111; x < 214; x++) R.pset(x, 140, hex('#1e2a50'));
  R.rect(114, 161, 116, 168, hex('#5a5a66')); R.rect(208, 161, 210, 168, hex('#5a5a66'));
  // la jarra de agua y la servilleta
  caja(198, 120, 208, 137, hex('#c8e0f0')); R.rect(200, 124, 206, 136, hex('#9ac8e8')); R.rect(208, 123, 210, 130, K0); R.pset(201, 122, hex('#ffffff'));
  R.rect(118, 134, 134, 137, K0); R.rect(119, 134, 133, 136, hex('#f6f2e6'));
};
// el número de cada vaso en su pegatina blanca (sin letras)
const pegatina = (x, y, n, s = 1) => { if (s > 1) { caja(x - 9, y - 10, x + 9, y + 9, hex('#ffffff')); R.numero(String(n), x + 1, y + 8, { color: K0, tam: 16, centro: true }); }
  else { caja(x - 4, y - 4, x + 4, y + 5, hex('#ffffff')); R.numero(String(n), x + 1, y + 4, { color: K0, centro: true }); } };
const p1 = (t) => {
  capa('cie-plato', fondoPlato);
  // los focos colgados que se mecen un poco, con su cono de luz hacia la mesa
  for (const [x, k] of [[46, 0], [118, 1], [214, 2]]) { const dx = Math.round(Math.sin(t * 0.9 + k) * 1); R.rect(x - 1, 22, x + 1, 26, hex('#4a4a56')); caja(x - 6 + dx, 26, x + 6 + dx, 34, hex('#2a2a34')); R.rect(x - 4 + dx, 34, x + 4 + dx, 35, hex('#fff2c0')); }
  cono(118, 36, 156, 136, 34, hex('#fff2c8'), 0.22); cono(214, 36, 180, 136, 26, hex('#fff2c8'), 0.16); cono(46, 36, 110, 130, 20, hex('#c8d8ff'), 0.1);
  // el piloto rojo de «en el aire» (caja con una luz, sin letras), encendido y latiendo
  caja(150, 24, 170, 31, hex('#3a1414')); { const on = 0.6 + 0.4 * Math.sin(t * 4); R.rect(152, 26, 168, 29, mez(hex('#7a1414'), hex('#ff4a3a'), on)); luz(160, 28, 14, hex('#ff4a3a'), 0.25 * on); }
  // el tramoyista que cruza por detrás con el rollo de cable
  { const x = Math.round(300 - ((t * 16) % 380)); if (x > -10 && x < 300) { mini(x, 126, hex('#3a3a46'), hex('#2a1e1a'), t, true, 1); R.disco(x - 1, 120, 3, hex('#1a1a1a')); R.disco(x - 1, 120, 1, hex('#3a3a46')); } }
  // el de la pértiga, de pie al fondo a la derecha, con el micro colgado sobre Mullins
  { const x = 228, s = 132, sw = Math.sin(t * 1.3) * 3; const a = R.actor(NC.camarografo, x, s, t, { dir: -1, sostiene: [x - 2, 104], pal: { C: '#5a6a4a', c: '#46523a' } });
    const mx = Math.round(154 + sw), my = 86; R.linea(a.mano[0] + 6, a.mano[1] + 3, mx, my, hex('#8a8a96')); R.linea(a.mano[0] + 6, a.mano[1] + 4, mx, my + 1, hex('#5a5a66'));
    R.linea(mx, my, mx, my + 6, hex('#5a5a66')); for (let j = 0; j < 9; j++) for (let i = -2; i <= 2; i++) if (Math.abs(i) < 2 || (j > 0 && j < 8)) R.pset(mx + i, my + 6 + j, (i + j) % 2 ? hex('#6a6a5a') : hex('#8a8a76')); }
  // Mullins sentado tras la mesa, con la venda blanca; en «blind» coge el vaso 1 y bebe
  const MX = 140, MS = 146, coge = @c(2.12), bebe = @c(2.62), deja = @c(3.5), cA = [162, 137], cB = [184, 137];
  const tieneA = t > coge && t < deja + 0.3;
  let mano = null;
  if (tieneA) { const u = sm(lin(t, coge, bebe)), d = sm(lin(t, deja, deja + 0.3)); mano = [Math.round(lerp(lerp(160, MX + 14, u), 160, d)), Math.round(lerp(lerp(132, 126, u), 132, d))]; }
  const a = R.actor(NC.mullins, MX, MS, t, { dir: 1, sostiene: mano ?? undefined, habla: t > deja + 0.3 && t < deja + 1.0 && Math.sin(t * 9) > 0, sonrisa: t > bebe + 0.2 && t < deja });
  venda(a.cabeza, 1, t);
  mesaPlato();
  // los dos vasos sin marca, con su número (el 1, en la mano mientras bebe)
  const nivelA = 0.8 - 0.3 * lin(t, bebe, deja);
  if (tieneA) PZ.vaso(R, a.mano[0] + 2, a.mano[1] + 6, { lleno: nivelA, s: 0.8 }); else { PZ.vaso(R, cA[0], cA[1], { lleno: nivelA, s: 0.8 }); pegatina(cA[0], cA[1] - 7, 1); }
  // el presentador llega con el vaso 2, lo deja y presenta; en «Mullins» le señala
  const llega = sm(lin(t, 0.15, 1.0)), hx = Math.round(lerp(250, 202, llega)), dejaB = 1.25;
  if (t < dejaB) { const h = R.actor(NC.presentador, hx, 170, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: t > 1.0 ? [cB[0] + 2, 130] : [hx - 2, 148] }); PZ.vaso(R, h.mano[0], h.mano[1] + 7, { lleno: 0.8, s: 0.8 }); }
  else { PZ.vaso(R, cB[0], cB[1], { lleno: 0.8, s: 0.8 }); pegatina(cB[0], cB[1] - 7, 2); R.actor(NC.presentador, hx, 170, t, { dir: -1, habla: t < @c(3.7) && Math.sin(t * 8) > -0.2, dedo: t > @c(3.82), sonrisa: t > @c(3.82) }); }
  // la regidora de rodillas cuenta con los dedos al principio y luego sonríe
  R.actor(NC.estudiante, 86, 176, t, { dir: 1, dedo: t < 1.4 && Math.sin(t * 6) > -0.3, sonrisa: t > 1.4, pal: { C: '#7a3a5a', c: '#5a2a44' } });
  R.rect(87, 150, 89, 156, K0); R.rect(84, 152, 86, 156, hex('#3a3a46'));
  // el camarógrafo detrás de la cámara de estudio, con el piloto rojo que parpadea
  R.actor(NC.camarografo, 6, 152, t, { dir: 1 });
  R.linea(44, 140, 28, 174, hex('#4a4a56')); R.linea(44, 140, 46, 176, hex('#4a4a56')); R.linea(44, 140, 62, 174, hex('#4a4a56')); R.rect(42, 134, 46, 142, hex('#5a5a66'));
  caja(24, 114, 62, 134, hex('#5a5e6a')); R.rect(26, 116, 60, 118, hex('#7a7e8a')); caja(62, 118, 74, 130, hex('#2a2a32')); R.disco(74, 124, 4, K0); R.disco(74, 124, 2, hex('#4a6aa8')); R.pset(73, 123, hex('#c8d8ff'));
  caja(18, 116, 24, 126, hex('#3a3a46')); if (Math.sin(t * 6) > -0.4) { R.rect(54, 110, 57, 113, hex('#ff3a2a')); luz(55, 111, 6, hex('#ff3a2a'), 0.4); } caja(30, 106, 50, 114, hex('#3a3a46'));
  // las cajas de manzana, el rollo de cable, la silla de director y el café que humea (primer término derecho)
  caja(244, 160, 274, 176, hex('#a8784a')); R.rect(246, 165, 272, 165, hex('#7a5430')); caja(250, 148, 270, 160, hex('#b8885a'));
  caja(256, 142, 262, 148, hex('#f2ece0')); for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; R.pset(Math.round(259 + Math.sin(u * 7 + t) * 2), Math.round(140 - u * 12), mez(hex('#c8c8d0'), hex('#34343e'), u)); }
  R.disco(298, 170, 8, K0); R.disco(298, 170, 7, hex('#2a2a2a')); R.disco(298, 170, 4, hex('#4a4a4a')); R.disco(298, 170, 1, K0);
};

// ── 2 · el inserto de la mesa: la mano que duda ──
const fondoMesa = () => {
  // el plató desenfocado detrás: manchas grandes y círculos de luz (bokeh); arriba, liso y oscuro
  llena(0, 0, 319, 70, rp('#10121c', '#181c2c', '#22283c', '#2e3650'), (x, y) => 0.8 + y / 40 + Math.sin(x * 0.03) * 0.3 + (hh(x, y) - 0.5) * 0.3);
  for (let y = 34; y <= 66; y++) for (let x = 40; x <= 250; x++) { const g = 1 - Math.abs(y - 50) / 16; if (g > 0) R.pset(x, y, mez(R.pget(x, y), hex('#c8604a'), g * 0.35 * (0.6 + 0.4 * Math.sin(x * 0.02)))); }
  for (let k = 0; k < 16; k++) { const x = 20 + Math.floor(hh(k, 1) * 240), y = 24 + Math.floor(hh(k, 2) * 40), r = 3 + Math.floor(hh(k, 3) * 5), c = hex(['#f8d070', '#f0a04a', '#c8d8ff', '#ff6a5a'][k % 4]);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d <= 1) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), c, d > 0.75 ? 0.5 : 0.28)); } }
  // la silueta borrosa de la cámara de estudio a la izquierda
  for (let y = 36; y <= 70; y++) for (let x = 0; x <= 34; x++) { const d = Math.hypot((x - 14) / 20, (y - 54) / 14); if (d < 1) R.pset(x, y, mez(R.pget(x, y), hex('#0a0a12'), 0.75 * (1 - d * d))); }
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = Math.hypot(i, j) / 4; if (d <= 1) R.pset(30 + i, 44 + j, mez(R.pget(30 + i, 44 + j), hex('#ff3a2a'), 0.5 * (1 - d))); }
  // el mantel de cuadros en perspectiva (del canto en y 92 hasta abajo), con sus arrugas
  for (let y = 70; y <= 179; y++) { const f = (y - 70) / 109, lado = 7 + f * 16, alto = 3 + f * 9;
    for (let x = 0; x <= 319; x++) { const cx = Math.floor((x - 160) / lado + 100), cy = Math.floor((y - 70) / alto), c = (cx + cy) % 2 ? hex('#3a5aa8') : hex('#e8ecf4'), cz = (cx % 2 === 1 && cy % 2 === 1) ? hex('#2a4488') : c;
      const arruga = Math.sin(x * 0.07 + y * 0.12) > 0.92 ? 0.18 : 0; R.pset(x, y, mez(cz, K0, arruga + (1 - f) * 0.12)); } }
  R.rect(0, 70, 319, 70, hex('#1a2440'));
  // el plato de galletas saladas (para limpiar el paladar) y las servilletas
  for (let j = -18; j <= 18; j++) for (let i = -21; i <= 21; i++) { const d = Math.hypot(i, j * 1.9); if (d < 21) R.pset(48 + i, 96 + Math.round(j * 0.45), d > 19.5 ? K0 : d > 16 ? hex('#c8ccd8') : hex('#f2f2f6')); }
  for (const [x, y] of [[38, 92], [50, 90], [58, 96], [44, 98]]) { caja(x - 5, y - 3, x + 5, y + 3, hex('#e0b060')); R.pset(x - 2, y - 1, hex('#a87a30')); R.pset(x + 2, y + 1, hex('#a87a30')); R.pset(x, y, hex('#a87a30')); }
  for (let k = 0; k < 4; k++) { caja(8 + k, 128 - k * 3, 52 + k, 138 - k * 3, hex('#f6f2e6')); }
  // la jarra de agua con hielo a la derecha
  caja(262, 76, 296, 122, hex('#c8e0f0')); R.rect(265, 84, 293, 120, hex('#9ac8e8')); R.rect(296, 84, 304, 110, K0); R.rect(297, 86, 301, 108, hex('#c8e0f0'));
  for (const [x, y] of [[270, 86], [281, 88], [288, 92], [274, 94]]) { caja(x, y, x + 6, y + 5, hex('#e8f6ff')); }
  R.rect(266, 79, 268, 118, hex('#e8f6ff'));
  // el vaso de agua y la escupidera de la cata
  PZ.vaso(R, 132, 104, { lleno: 0.3, s: 1.4 }); R.disco(108, 116, 9, K0); R.disco(108, 116, 8, hex('#a8acb8')); R.disco(108, 115, 6, hex('#c8ccd8'));
};
const p2 = (t) => {
  capa('cie-mesa', fondoMesa);
  const XA = 100, XB = 222, YB = 172;
  // los dos vasos grandes, a medio beber, con burbujas que suben
  // la silueta borrosa del presentador que espera al fondo
  { const x = Math.round(250 + Math.sin(t * 0.7) * 4); for (let y = 30; y <= 70; y++) for (let i = -9; i <= 9; i++) { const w = y < 44 ? 6 : 10; if (Math.abs(i) <= w && !(y < 44 && Math.hypot(i, y - 37) > 7)) R.pset(x + i, y, mez(R.pget(x + i, y), hex('#0a0a14'), 0.55)); } }
  for (const [x, k] of [[XA, 0], [XB, 1]]) { PZ.vaso(R, x, YB, { lleno: 0.55, s: 2.5 }); pegatina(x, YB - 20, k + 1, 2);
    for (let b = 0; b < 4; b++) { const y = Math.round(YB - 4 - ((t * 9 + b * 5 + k * 3) % 18)), xx = Math.round(x - 9 + hh(b, k) * 18); R.pset(xx, y, hex('#c89a6a')); } }
  // la tarjeta de la cata con dos casillas (un vaso en cada una) y el lápiz
  const tap = @c(6.87);
  caja(128, 134, 192, 164, hex('#f6f2e6')); R.rect(129, 162, 191, 163, hex('#c8c4b8'));
  for (const [x, k] of [[134, 0], [164, 1]]) { caja(x, 142, x + 22, 160, hex('#ffffff')); R.numero(String(k + 1), x + 12, 142, { color: hex('#5a5a66'), centro: true });
    if (t > tap + 0.15 + k * 0.35) R.icono('?', x + 7, 145, hex('#c83a3a'), hex('#f0c0b0'), 2); }
  R.linea(170, 176, 192, 168, K0); R.linea(170, 177, 192, 169, hex('#f0c040')); R.linea(171, 177, 192, 170, hex('#c89a20')); R.pset(169, 177, hex('#3a3a3a'));
  // el cronómetro de la cata, que corre
  R.disco(196, 98, 10, K0); R.disco(196, 98, 9, hex('#c8ccd8')); R.disco(196, 98, 7, hex('#f6f6f0')); R.rect(194, 86, 198, 88, hex('#8a8a96'));
  { const a = t * 1.2; R.linea(196, 98, Math.round(196 + Math.sin(a) * 6), Math.round(98 - Math.cos(a) * 6), hex('#c83030')); } for (let k = 0; k < 12; k++) { const a = k / 6 * Math.PI; R.pset(Math.round(196 + Math.sin(a) * 8), Math.round(98 - Math.cos(a) * 8), K0); }
  // la mano de Mullins (la manga de la cazadora): sube, duda entre los dos vasos y cae sobre la tarjeta
  const sube = sm(lin(t, P2 + 0.1, P2 + 0.6)), nuevo = @c(5.32), viejo = @c(6.04), venda1 = @c(7.85);
  const pts = [[P2, XA - 30], [nuevo - 0.1, XA - 30], [viejo - 0.35, XB - 30], [viejo + 0.25, XB - 30], [viejo + 0.55, XA - 30], [tap - 0.3, XA - 30], [tap, 140]];
  let wx = pts[0][1]; for (let i = 0; i < pts.length - 1; i++) if (t >= pts[i][0]) wx = lerp(pts[i][1], pts[i + 1][1], sm(lin(t, pts[i][0], pts[i + 1][0])));
  let wy = lerp(200, 160, sube); if (t > tap - 0.3) wy = lerp(160, 150 - Math.abs(Math.sin((t - tap) * 9)) * 3 * (t < tap + 0.9 ? 1 : 0), sm(lin(t, tap - 0.3, tap)));
  wy += Math.sin(t * 7) * 1.2 * (t < tap ? 1 : 0); wy = lerp(wy, 210, sm(lin(t, venda1 + 0.1, venda1 + 0.6)));
  if (wy < 200) T.brazo(R, wx - 16, 196, wx, wy, '#7a5a3a', 1, { codo: [wx - 20, (196 + wy) / 2 + 3], puno: '#5e442a' });
  // el «?» que salta sobre el vaso por el que pasa la mano
  for (const [x, t0] of [[XA, nuevo], [XB, viejo]]) { const u = t - t0; if (u > 0 && u < 0.9) { const y = Math.round(130 - Math.min(1, u * 5) * 12 + Math.max(0, u - 0.6) * 24); R.icono('?', x - 7, y - 21, hex('#f6d040'), K0, 3); } }
  // la venda cae del cielo sobre la mesa en «tongues»
  if (t > venda1) { const u = lin(t, venda1, venda1 + 0.5), y = Math.round(lerp(-6, 116, sm(u))), ol = u < 1 ? Math.sin(t * 20) * 3 : 0;
    for (let i = 0; i < 50; i++) { const yy = Math.round(y + Math.sin(i * 0.25 + t * (u < 1 ? 10 : 0)) * (u < 1 ? 3 : 1) + (i > 40 ? (i - 40) * 0.6 : 0) + ol * (i / 50)), xx = 136 + i;
      R.pset(xx, yy - 1, K0); R.pset(xx, yy, hex('#3a3a58')); R.pset(xx, yy + 1, hex('#2a2a40')); R.pset(xx, yy + 2, hex('#2a2a40')); R.pset(xx, yy + 3, K0); } }
};

// ── 3 · el despacho de la empresa de noche ──
const fondoDespacho = () => {
  // el techo y lo alto de la pared, lisos y en penumbra (la esquina de Atom y la barra del año)
  llena(0, 0, 319, 20, rp('#14100e', '#1c1612', '#241c16'), (x, y) => 1 + y / 20 + (hh(x, y) - 0.5) * 0.3);
  R.rect(0, 20, 319, 21, hex('#3a2a1e'));
  // el papel pintado verde con su dibujo de rombos
  llena(0, 22, 319, 104, rp('#1a3026', '#22402e', '#2a4c38', '#34583e'), (x, y) => 1.4 + (((x + y) % 12 === 0 || (x - y + 600) % 12 === 0) ? 0.9 : 0) + (hh(x, y, 2) - 0.5) * 0.4);
  // el ventanal: Atlanta de noche (x 14–130, y 24–100)
  R.recorte([16, 26, 128, 98]);
  llena(16, 26, 128, 98, rp('#0a0e22', '#121a36', '#1c284a', '#2a3a5e'), (x, y) => 0.4 + (y - 26) / 24 + (hh(x, y, 3) - 0.5) * 0.5);
  for (let k = 0; k < 30; k++) R.pset(16 + Math.floor(hh(k, 1) * 112), 26 + Math.floor(hh(k, 2) * 30), hex('#c8d0f0'));
  R.disco(104, 38, 6, hex('#e8e4c8')); R.disco(106, 36, 5, hex('#1c284a'));
  for (let k = 0; k < 11; k++) { const x = 14 + k * 11 + Math.floor(hh(k, 4) * 4), w = 6 + Math.floor(hh(k, 5) * 6), h = 16 + Math.floor(hh(k, 6) * 40);
    rc(x, 98 - h, x + w, 98, hex('#0e1424')); rc(x, 98 - h, x, 98, hex('#1a2238')); if (k === 5) { rc(x + 2, 98 - h - 8, x + w - 2, 98 - h, hex('#0e1424')); R.pset(x + w / 2, 98 - h - 10, hex('#ff3a2a')); }
    for (let j = 98 - h + 3; j < 96; j += 3) for (let i = x + 2; i < x + w; i += 2) if (hh(i, j, k) > 0.6) R.pset(i, j, hex('#e8c870')); }
  R.recorte(null);
  // el zócalo de nogal y la moldura
  paneles(0, 104, 319, 140, rp('#2a1a10', '#4a2e1a', '#5e3a22', '#7a4e2e'), 26, 3);
  R.rect(0, 103, 319, 104, hex('#8a5a32'));
  // la librería de la derecha (x 262–318, y 50–140)
  caja(262, 50, 318, 140, hex('#4a2e1a')); for (const y of [72, 96, 120]) R.rect(263, y, 317, y + 2, hex('#2a1a10'));
  for (const [y0, y1] of [[52, 71], [74, 95], [98, 119], [122, 139]]) { let x = 265; while (x < 314) { const w = 2 + Math.floor(hh(x, y0) * 3), h = (y1 - y0) - Math.floor(hh(x, y0, 2) * 6), c = hex(['#7a2a2a', '#2a4a6a', '#6a5a2a', '#2a5a3a', '#5a3a6a', '#8a6a3a'][Math.floor(hh(x, y0, 3) * 6)]);
    R.rect(x, y1 - h, x + w, y1, c); R.pset(x, y1 - h + 2, hex('#d8c070')); x += w + 1; } }
  R.disco(290, 84, 4, hex('#c8a040')); // un trofeo
  // la moqueta burdeos con su dibujo
  llena(0, 141, 319, 179, rp('#3a1418', '#4a1a1e', '#5a2226', '#6a2a2e'), (x, y) => 1.5 + (((Math.floor(x / 10) + Math.floor((y - 141) / 6)) % 2) ? 0.5 : -0.2) + (hh(x, y, 8) - 0.5) * 0.5);
  // el sillón de cuero junto a la ventana
  caja(62, 118, 108, 160, hex('#5a2a1a')); R.rect(64, 120, 106, 130, hex('#7a3a24')); caja(58, 132, 70, 162, hex('#4a2216')); caja(100, 132, 112, 162, hex('#4a2216')); caja(68, 136, 102, 148, hex('#6a3220'));
  for (const [x, y] of [[72, 124], [84, 124], [96, 124]]) R.pset(x, y, hex('#c8a040')); R.rect(62, 162, 64, 166, K0); R.rect(106, 162, 108, 166, K0);
  // el reloj de péndulo en la pared (caja en x 158–176)
  caja(156, 28, 178, 78, hex('#5a3a22')); R.rect(160, 52, 174, 74, hex('#2a1a10'));
};
const p3 = (t) => {
  capa('cie-despacho', fondoDespacho);
  // la ventana: la ciudad (repinta el hueco cada fotograma para que se encienden las ventanas y pase el avión)
  R.recorte([14, 24, 130, 100]);
  llena(14, 24, 130, 100, rp('#0a0e22', '#121a36', '#1c284a', '#2a3a5e'), (x, y) => 0.4 + (y - 24) / 26 + (hh(x, y, 3) - 0.5) * 0.5);
  for (let k = 0; k < 30; k++) if (Math.sin(t * 3 + k) > -0.6) R.pset(16 + Math.floor(hh(k, 1) * 112), 26 + Math.floor(hh(k, 2) * 30), hex('#c8d0f0'));
  R.disco(104, 38, 6, hex('#e8e4c8')); R.disco(106, 36, 5, hex('#1c284a'));
  nube(((t * 3) % 170) - 20, 50, 30, rp('#1a2238', '#222c48', '#2e3a5a'), (x, y) => x >= 14 && x <= 130 && y >= 24);
  { const ax = Math.round(140 - ((t * 12) % 150)), ay = 44; rc(ax - 3, ay, ax + 3, ay, hex('#4a5068')); R.pset(ax, ay - 1, hex('#4a5068')); if (Math.floor(t * 3) % 2) R.pset(ax - 3, ay, hex('#ff3a2a')); else R.pset(ax + 3, ay, hex('#ffffff')); }
  for (let k = 0; k < 11; k++) { const x = 14 + k * 11 + Math.floor(hh(k, 4) * 4), w = 6 + Math.floor(hh(k, 5) * 6), h = 16 + Math.floor(hh(k, 6) * 40);
    rc(x, 100 - h, x + w, 100, hex('#0e1424')); rc(x, 100 - h, x, 100, hex('#1a2238')); if (k === 5) { rc(x + 2, 100 - h - 8, x + w - 2, 100 - h, hex('#0e1424')); if (Math.floor(t * 2) % 2) R.pset(Math.round(x + w / 2), 100 - h - 10, hex('#ff3a2a')); }
    for (let j = 100 - h + 3; j < 98; j += 3) for (let i = x + 2; i < x + w; i += 2) { const on = hh(i, j, k) > 0.6 !== (hh(i, j, k + 9) > 0.97 && Math.sin(t * 0.8 + i) > 0.6); if (on) R.pset(i, j, hex('#e8c870')); } }
  R.recorte(null);
  R.rect(12, 22, 132, 23, hex('#3a2a1e')); R.rect(12, 101, 132, 102, hex('#3a2a1e')); R.rect(12, 22, 13, 102, hex('#3a2a1e')); R.rect(131, 22, 132, 102, hex('#3a2a1e')); R.rect(71, 24, 72, 100, hex('#3a2a1e')); R.rect(14, 60, 130, 61, hex('#3a2a1e'));
  // las cortinas burdeos a los lados del ventanal
  for (const x0 of [4, 128]) for (let y = 20; y <= 104; y++) for (let x = x0; x <= x0 + 12; x++) R.pset(x, y, R.tone(rp('#3a0e14', '#5a1820', '#7a242a', '#9a3a3a'), 1.6 + Math.sin((x - x0) * 1.1 + Math.sin(y * 0.1 + t * 0.7) * 0.6) * 0.9, x, y));
  // el reloj de péndulo: la esfera y el péndulo; en «too late» la aguja salta a la hora
  const tarde = @c(11.79); reloj(167, 40, 8, 0.99 - (t < tarde ? 0.004 : 0), t < tarde ? 0.95 + (t - P3) * 0.004 : 1.0);
  { const a = Math.sin(t * 3.6) * 0.35, px = Math.round(167 + Math.sin(a) * 14), py = Math.round(54 + Math.cos(a) * 14); R.linea(167, 54, px, py, hex('#c8a040')); R.disco(px, py, 2, hex('#e8c060')); }
  if (t > tarde && t < tarde + 0.6) for (const s of [-1, 1]) { R.linea(167 + s * 11, 36, 167 + s * 15, 33, hex('#f6e6b0')); R.linea(167 + s * 11, 42, 167 + s * 16, 42, hex('#f6e6b0')); }
  // la tele de ruedas (x 186–252): la mesa del plató y Mullins que se quita la venda
  caja(186, 74, 252, 126, hex('#5a4030')); R.rect(188, 76, 250, 78, hex('#7a5a40')); R.rect(244, 82, 249, 120, hex('#3a2a1e')); for (let j = 84; j < 118; j += 4) R.rect(245, j, 248, j + 1, hex('#2a1e14'));
  R.disco(246, 112, 1, hex('#c8a040')); R.disco(246, 104, 1, hex('#c8a040')); R.linea(206, 74, 196, 62, hex('#8a8a96')); R.linea(226, 74, 238, 60, hex('#8a8a96'));
  const SX0 = 190, SY0 = 80, SX1 = 241, SY1 = 120;
  R.recorte([SX0, SY0, SX1, SY1]);
  llena(SX0, SY0, SX1, SY1, rp('#1a2a5a', '#2a3a6a', '#3a4a7a'), (x, y) => 0.6 + (y - SY0) / 22 + (hh(x, y) - 0.5) * 0.5);
  rc(SX0, 92, SX1, 104, hex('#6a3a5a')); for (let x = SX0; x <= SX1; x += 4) rc(x, 96 - (x % 3) * 2, x + 2, 104, hex('#3a2a4a'));
  const quita = sm(lin(t, P3 + 0.2, @c(9.25))), pasma = t > @c(9.4);
  const m = R.actor(NC.mullins, 208, 122, t, { dir: 1, sostiene: quita > 0 && quita < 1 ? [218, 96 - quita * 6] : undefined, sorpresa: pasma });
  venda(m.cabeza, 1, t, quita);
  for (let y = 111; y <= SY1; y++) for (let x = SX0; x <= SX1; x++) R.pset(x, y, ((x >> 2) + (y >> 1)) % 2 ? hex('#3a5aa8') : hex('#e8ecf4'));
  if (pasma && Math.sin(t * 5) > -0.5) R.icono('!', 222, 84, hex('#ffffff'), K0);
  barrido(SX0, SY0, SX1, SY1, t);
  R.recorte(null);
  R.rect(184, 126, 254, 130, hex('#6a6a76')); R.rect(186, 130, 188, 160, hex('#6a6a76')); R.rect(250, 130, 252, 160, hex('#6a6a76')); R.rect(186, 146, 252, 147, hex('#5a5a66'));
  for (const x of [187, 251]) { R.disco(x, 162, 2, K0); R.pset(x, 162, hex('#8a8a96')); }
  // la luz azul de la tele sobre la moqueta y los dos que miran
  luz(214, 120, 70, hex('#6a8ad8'), 0.16 + 0.05 * Math.sin(t * 13));
  // Goizueta y Keough miran la tele; en «company» sube el «?» y Keough se gira; en «realize» se asusta
  const emp = @c(10.07), real = @c(11.19);
  R.actor(NC.goizueta, 140, 162, t, { dir: 1, sorpresa: t > tarde, habla: t > emp + 0.3 && t < real && Math.sin(t * 8) > 0 });
  R.actor(NC.keough, 164, 162, t, { dir: t > emp + 0.25 && t < tarde ? -1 : 1, sorpresa: t > real, dedo: t > real && t < real + 0.8 });
  if (t > emp) { const u = lin(t, emp, emp + 0.5), y = Math.round(lerp(140, 76, sm(u)) + Math.sin(t * 4) * 2), x = 158 + Math.round(Math.sin(t * 2.4) * 2);
    R.disco(x, y + 13, 17, K0); R.disco(x, y + 13, 16, hex('#f6f2e6')); R.icono('?', x - 10, y - 1, hex('#c83a3a'), hex('#7a1a1a'), 4); }
  // la mesita de delante (izquierda) con la lámpara de banquero y el cenicero que humea
  caja(0, 132, 58, 140, hex('#4a2e1a')); R.rect(1, 133, 57, 134, hex('#7a4e2e')); R.rect(4, 140, 54, 179, hex('#3a2414')); R.rect(6, 142, 52, 176, hex('#4a2e1a')); R.rect(26, 146, 32, 150, hex('#c8a040'));
  R.rect(14, 112, 15, 132, hex('#c8a040')); R.rect(8, 130, 22, 132, hex('#c8a040')); caja(4, 104, 28, 112, hex('#1e6a3a')); R.rect(6, 106, 26, 107, hex('#3a9a5a')); luz(16, 118, 26, hex('#f8e0a0'), 0.25);
  caja(36, 128, 50, 132, hex('#8a8a96')); R.rect(42, 127, 48, 127, hex('#e8e0d0'));
  for (let k = 0; k < 7; k++) { const u = ((t * 0.6 + k / 7) % 1), y = Math.round(126 - u * 34), x = Math.round(46 + Math.sin(u * 8 + t) * 3 * u); R.pset(x, y, mez(hex('#3a3a3a'), hex('#c8c8d0'), 1 - u)); R.pset(x + 1, y, mez(hex('#3a3a3a'), hex('#a8a8b0'), 1 - u)); }
};

const efectos = [[1.25, 'golpecito'], [@c(2.62), 'burbujas'], [@c(5.32), 'pop'], [@c(6.04), 'pop'], [@c(6.95), 'lapiz'], [@c(7.95), 'whoosh'], [@c(10.07), 'pop'], [@c(11.79), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1985 });
'''))

# ───────────────────────────────────────── NC-VUELTA ─────────────────────────────────────────
E['nc-vuelta'] = ('La vuelta', r'''// NC-VUELTA (frase 20, «On July 11, 1985, seventy-nine days after the announcement, Coca-Cola backed down…»), sin
// cartela; barra en 1985. Cinco planos:
// 1. Inserto de la mesa de la oficina de prensa en julio (fondo local): una mano enciende el ventilador, que arranca las
//    hojas del calendario de taco una tras otra (del 4·23 al 7·11 en «July 11»); vuelan y se amontonan en la mesa; la nota
//    amarilla las cuenta y en «79» se queda en 79 con un golpe rojo. Por la persiana, el sol de julio.
// 2. Corta en «announcement»: la rueda de prensa de julio en Atlanta (fondo local): telón rojo con guardamalleta dorada,
//    banderas y abanicos de banderines; Keough en el atril; en «backed down» alza las manos; en «original» señala la
//    peana vacía; en «coming back» el presentador entra con la lata roja de siempre, ahora con su banda dorada, y la deja
//    en la peana; Goizueta aplaude; las nucas de los periodistas y sus flashes delante.
// 3. Corta en «under»: inserto de la lata en su peana (fondo local): se enciende el foco; en «Classic» un brillo recorre la
//    banda dorada; en «news spread so fast» entran los micrófonos de las manos de los periodistas y saltan los flashes.
// 4. Corta en «the day before»: el salón de 1985 (anuncio 'rival'/'tele'): la telenovela; el vecino entra con el cuenco
//    de palomitas; en «interrupted» la franja roja barre la pantalla y sale el aviso; las palomitas saltan por los aires;
//    la señora señala la tele en «soap opera» y salta de alegría.
// 5. Corta en «report»: el Senado (fondo local): la tribuna de público, el estrado de mármol, las banderas y las filas de
//    escaños; el senador llega al micrófono y en «celebrated» alza la lata con la banda dorada; en «Congress» levanta el
//    dedo; en «meaningful moment» abre los brazos y sus compañeros aplauden; en «history» el presidente da el mazazo.
''', COMUN + F(r'''
const P2 = @v(4.84), P3 = @v(9.52), P4 = @v(14.03), P5 = @v(18.57);

// ── 1 · el calendario y el ventilador ──
const fondoMesaJulio = () => {
  // la pared: papel de rayas finas color crema (arriba, tranquila)
  llena(0, 0, 319, 96, rp('#c8b890', '#d8c8a0', '#e6d8b4', '#f0e4c4'), (x, y) => 1.8 + (x % 8 < 1 ? -0.7 : 0) + (x % 8 === 4 ? 0.4 : 0) + y / 200 + (hh(x, y) - 0.5) * 0.4);
  // la ventana con la persiana a medio subir (x 12–104, y 22–88): cielo de julio con nubes y el sol
  R.recorte([14, 24, 102, 86]);
  llena(14, 24, 102, 86, rp('#4a8ad8', '#6aa4e6', '#8abcf0', '#b0d4f8'), (x, y) => 3.2 - (y - 24) / 22 + (hh(x, y, 3) - 0.5) * 0.5);
  R.disco(84, 40, 8, hex('#fff6c0')); R.disco(84, 40, 6, hex('#ffffff'));
  for (let x = 14; x <= 102; x++) for (let y = 74; y <= 86; y++) R.pset(x, y, R.tone(rp('#3a6a3a', '#4e8a46', '#6aa85a'), 1 + Math.sin(x * 0.6) * 0.7 + hh(x, y), x, y));
  R.recorte(null);
  for (const [a, b, c, d] of [[10, 20, 106, 21], [10, 87, 106, 90], [10, 20, 13, 90], [103, 20, 106, 90]]) R.rect(a, b, c, d, hex('#e8e0cc'));
  R.rect(8, 88, 108, 91, hex('#d8d0b8')); R.rect(8, 91, 108, 92, hex('#a89e88'));
  // el cuadro de la lata de siempre y el termómetro de pared (rojo, en lo alto)
  caja(198, 22, 228, 52, hex('#7a4e2e')); R.rect(201, 25, 225, 49, hex('#f2ece0')); lataV(213, 46, 1);
  caja(236, 24, 246, 68, hex('#e8e4d8')); R.rect(240, 28, 242, 60, hex('#ffffff')); R.rect(240, 34, 242, 62, hex('#d83030')); R.disco(241, 63, 3, hex('#d83030')); for (let j = 30; j < 60; j += 4) R.pset(244, j, K0);
  // el canto de la mesa y el tablero de madera (de y 96 hasta abajo)
  R.rect(0, 94, 319, 96, hex('#4a2e1a'));
  tablas(0, 97, 319, 179, rp('#4a2a16', '#6a3e22', '#8a5430', '#a86a3e'), 10, 2);
  // la luz de la persiana en la mesa: rayas inclinadas
  for (let y = 98; y <= 179; y++) for (let x = 0; x <= 200; x++) { const b = (x + (y - 98) * 0.9 - 20) % 18; if (b > 0 && b < 7 && x < 40 + (y - 98) * 1.6) R.pset(x, y, mez(R.pget(x, y), hex('#ffe8a0'), 0.18)); }
  // la taza con lápices, el teléfono de la oficina y las gafas
  caja(16, 120, 32, 142, hex('#c83a3a')); for (const [x, c] of [[19, '#f0c040'], [23, '#3a6ad8'], [27, '#2a2a2a']]) { R.linea(x, 120, x - 2, 106, hex(c)); R.pset(x - 2, 105, K0); }
  caja(206, 150, 244, 172, hex('#d8c8a0')); R.rect(208, 152, 242, 156, hex('#b8a880')); for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) R.rect(216 + a * 6, 158 + b * 4, 219 + a * 6, 160 + b * 4, hex('#f6f2e6'));
  caja(204, 144, 246, 150, hex('#c8b890'));
  R.disco(60, 168, 5, K0); R.disco(60, 168, 4, hex('#b8d8f0')); R.disco(74, 168, 5, K0); R.disco(74, 168, 4, hex('#b8d8f0')); R.rect(65, 167, 69, 167, K0);
};
// el día del calendario: n días después del 23 de abril
const fecha = (n) => { const meses = [[4, 30], [5, 31], [6, 30], [7, 31]]; let d = 23 + n, k = 0; while (d > meses[k][1]) { d -= meses[k][1]; k++; } return [meses[k][0], d]; };
const hojaCal = (x, y, mes, dia, rot = 0, s = 1) => { // una hoja suelta (34 × 40 a s 1): x, y su centro
  const c = Math.cos(rot), sn = Math.sin(rot), P = (i, j) => [Math.round(x + (i * c - j * sn) * s), Math.round(y + (i * sn + j * c) * s)];
  R.poligono([P(-17, -20), P(17, -20), P(17, 20), P(-17, 20)], K0); R.poligono([P(-16, -19), P(16, -19), P(16, 19), P(-16, 19)], hex('#f6f2e6'));
  R.poligono([P(-16, -19), P(16, -19), P(16, -11), P(-16, -11)], hex('#c83030')); };
const p1 = (t) => {
  capa('vue-mesa', fondoMesaJulio);
  // la ventana: la persiana (lamas que se mueven con el aire del ventilador)
  R.recorte([14, 24, 102, 86]);
  nube(((t * 6) % 140) - 20, 34, 24, rp('#c8d8ec', '#e8f0fa', '#ffffff'));
  for (let y = 24; y < 62; y += 4) { const ol = Math.round(Math.sin(t * 6 + y) * (t > 0.4 ? 1 : 0)); rc(14, y + ol, 102, y + 1 + ol, hex('#e8e4d8')); rc(14, y + 2 + ol, 102, y + 2 + ol, hex('#b8b4a8')); }
  R.recorte(null);
  R.rect(57, 62, 58, 80, hex('#8a8478')); R.disco(58, 82, 2, hex('#c8c0a8'));
  // el calendario de taco (x 118–196): las hojas vuelan del 4·23 al 7·11 en «July 11»
  const on = 0.25, f0 = 0.45, f1 = @v(1.24), n = Math.round(79 * sm(lin(t, f0, f1))), [mes, dia] = fecha(n);
  caja(114, 136, 200, 142, hex('#3a3a46')); R.poligono([[120, 136], [194, 136], [186, 60], [128, 60]], hex('#2a2a34'));
  caja(122, 52, 192, 132, hex('#f6f2e6')); for (let k = 1; k < 4; k++) R.rect(123, 132 + k - 1, 191, 132 + k - 1, hex(k % 2 ? '#d8d4c8' : '#f0ece0'));
  R.rect(123, 53, 191, 70, hex('#c83030')); R.rect(123, 53, 191, 54, hex('#e85a4a'));
  R.numero(String(mes), 157, 68, { color: hex('#ffffff'), tam: 16, centro: true });
  R.numero(String(dia), 157, 118, { color: K0, tam: 32, centro: true });
  for (let k = 0; k < 7; k++) R.disco(130 + k * 9, 126, 1, k === 0 ? hex('#c83030') : hex('#8a8a96'));
  for (const x of [134, 157, 180]) { R.rect(x - 1, 46, x + 1, 56, hex('#8a8a96')); R.pset(x, 46, hex('#e8e8f0')); }
  // las hojas que vuelan hacia la izquierda, empujadas por el aire
  if (t > f0) for (let k = 0; k < 7; k++) { const tk = f0 + (k + (t * 7.9 % 1)) / 7.9, u = (t - tk) * 1.6 + k * 0.14; if (u < 0 || u > 1 || t > f1 + 1.2) continue;
    hojaCal(lerp(157, -20, u), 92 - Math.sin(u * Math.PI) * 50 + u * 40, 0, 0, u * 6 + k, 0.8 - u * 0.3); }
  // el montón de hojas en la mesa (crece con n)
  for (let k = 0; k < Math.min(14, Math.ceil(n / 6)); k++) { const x = 40 + Math.round(hh(k, 1) * 50), y = 150 + Math.round(hh(k, 2) * 18); hojaCal(x, y, 0, 0, (hh(k, 3) - 0.5) * 1.6, 0.6); }
  // la nota amarilla que cuenta las hojas: en «79» se queda en 79 con su golpe rojo
  const set = @v(3.36), gol = t > set;
  caja(100, 146, 160, 178, hex('#f6e060')); R.rect(101, 147, 159, 150, hex('#e8d040'));
  R.numero(String(n), 130, 172, { color: gol ? hex('#c82020') : K0, tam: 16, centro: true });
  if (gol) { const u = lin(t, set, set + 0.25), r = Math.round(24 - u * 4); for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; R.pset(Math.round(130 + Math.cos(an) * r * 1.3), Math.round(162 + Math.sin(an) * r * 0.62), hex('#c82020')); R.pset(Math.round(130 + Math.cos(an) * (r * 1.3 - 1)), Math.round(162 + Math.sin(an) * (r * 0.62 - 1)), hex('#c82020')); } }
  // el ventilador de mesa (x 240–312): la rejilla, las aspas que giran y la cabeza que oscila
  const gira = t > on ? Math.min(1, (t - on) * 2) : 0, osc = Math.sin(t * 0.9) * 4 * gira, cx = Math.round(272 + osc), cy = 104;
  R.rect(270, 128, 274, 160, hex('#5a6a5a')); caja(248, 158, 300, 170, hex('#4a5a4a')); R.rect(250, 159, 298, 160, hex('#7a8a7a'));
  caja(284, 162, 292, 166, t > on ? hex('#e8c040') : hex('#8a7a40'));
  R.disco(cx, cy, 30, K0); R.disco(cx, cy, 29, hex('#6a7a6a'));
  for (let j = -28; j <= 28; j++) for (let i = -28; i <= 28; i++) { const d = Math.hypot(i, j); if (d > 28) continue; const an = Math.atan2(j, i) - t * 30 * gira, h3 = Math.sin(an * 3);
    R.pset(cx + i, cy + j, d < 6 ? hex('#3a4a3a') : h3 > 0.35 ? (d > 24 ? hex('#8ab0c8') : hex('#a8c8d8')) : hex('#2a342a')); }
  for (let a = 0; a < 16; a++) { const an = a / 16 * Math.PI * 2; R.linea(cx, cy, Math.round(cx + Math.cos(an) * 28), Math.round(cy + Math.sin(an) * 28), hex('#c8d0c8')); }
  for (const r of [10, 20, 28]) { for (let a = 0; a < 90; a++) { const an = a / 90 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex('#c8d0c8')); } }
  R.disco(cx, cy, 4, hex('#c8a040')); R.disco(cx, cy, 2, hex('#8a6a24'));
  // las rayas de aire que salen hacia la izquierda
  if (gira > 0.5) for (let k = 0; k < 6; k++) { const u = (t * 1.4 + k / 6) % 1, x = Math.round(236 - u * 120), y = Math.round(80 + k * 9 + Math.sin(u * 9 + k) * 3); R.linea(x, y, x + 10, y, mez(hex('#ffffff'), R.pget(x, y), 0.5)); }
  // la mano que enciende el ventilador al empezar
  if (t < on + 0.7) { const u = sm(lin(t, 0, on)) * (1 - sm(lin(t, on + 0.2, on + 0.7))); T.brazo(R, 338, 196, lerp(330, 300, u), lerp(190, 160, u), '#e8e4d8', -1, { puno: '#f2f2ea' }); }
};

// ── 2 · la rueda de prensa de julio ──
const fondoJulio = () => {
  // el techo (liso y oscuro: la barra del año) y el telón rojo de terciopelo con sus pliegues
  llena(0, 0, 319, 16, rp('#120a0c', '#1a1012', '#22161a'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.4);
  llena(0, 17, 319, 117, rp('#4a0a10', '#6a141a', '#8a1e24', '#a83034', '#c8484a'), (x, y) => 2 + Math.sin(x * 0.36 + Math.sin(y * 0.03) * 1.2) * 1.3 + (y - 17) / 120 + (hh(x, y, 4) - 0.5) * 0.3);
  // la guardamalleta dorada con su fleco (y 17–30; arriba a la derecha queda lisa para Atom)
  for (let x = 0; x <= 270; x++) { const yb = 26 + Math.round(Math.abs(Math.sin((x % 54) / 54 * Math.PI)) * 6); for (let y = 17; y <= yb; y++) R.pset(x, y, R.tone(rp('#8a6a24', '#c8a040', '#e8c860'), 1.3 + (y - 17) / 12 + Math.sin(x * 0.5) * 0.3, x, y)); if (x % 3 === 0) { R.pset(x, yb + 1, hex('#e8c860')); R.pset(x, yb + 2, hex('#c8a040')); } }
  // los abanicos de banderines en la guardamalleta
  for (const x of [54, 162]) abanico(x, 28, 11);
  // la tarima de tablas y su faldón con abanicos de banderines
  tablas(0, 117, 319, 142, rp('#5a3a22', '#7a5030', '#9a6a3e', '#b8844e'), 5, 1);
  R.rect(0, 142, 319, 158, hex('#2a3a7a')); for (let x = 0; x < 320; x += 4) R.rect(x, 143, x + 1, 157, hex('#22306a'));
  for (const x of [26, 78, 130, 182, 234, 286]) abanico(x, 142, 13);
  // la sala: la moqueta azul hasta abajo (la tapan las nucas)
  llena(0, 159, 319, 179, rp('#1a2238', '#222c48', '#2a3656'), (x, y) => 1.2 + (hh(x, y, 2) - 0.5) * 0.8);
  // la peana de mármol en el centro (x 136–158, tapa en y 98)
  caja(134, 96, 160, 100, hex('#e0d8cc')); for (let y = 101; y <= 136; y++) for (let x = 137; x <= 157; x++) R.pset(x, y, ((x - 137) % 4 === 0) ? hex('#b0a898') : (x > 153 ? hex('#c8c0b4') : hex('#ece6dc')));
  caja(132, 134, 162, 140, hex('#d0c8bc'));
};
const lampara = (cx, t) => { R.rect(cx, 16, cx, 24, hex('#8a6a24')); for (let j = 0; j < 10; j++) { const w = 4 + j; R.rect(cx - w, 24 + j, cx + w, 24 + j, j % 3 === 0 ? hex('#e8c860') : hex('#a8843a')); }
  for (let k = -3; k <= 3; k++) { const x = cx + k * 4, y = 35 + (k % 2 ? 2 : 0); R.pset(x, y, Math.sin(t * 6 + k * 1.7) > 0.6 ? hex('#ffffff') : hex('#f8e8b0')); R.pset(x, y + 1, hex('#c8d8f0')); } luz(cx, 30, 20, hex('#fff2c0'), 0.18); };
const nucas = (t, flashA, flashB) => {
  // dos filas de periodistas de espaldas: nuca, orejas, hombros; alguno alza la cámara y dispara
  const pelo = rp('#2a1e1a', '#5a3a24', '#1a1a1a', '#8a6a3a', '#c8c8d0', '#3a2a1e'), ropa = rp('#3a3a4a', '#5a4a3a', '#2a3a5a', '#6a5a4a', '#4a5a4a', '#7a3a3a');
  for (let fila = 0; fila < 2; fila++) for (let k = 0; k < 9; k++) { const x = Math.round(14 + k * 36 + fila * 18 + hh(k, fila) * 6), y = fila ? 174 : 165, r = fila ? 9 : 6, kk = k + fila * 9;
    if (fila === 0 && (x < 34 || x > 290)) continue;
    R.disco(x, y + r + 6, r + 5, K0); R.disco(x, y + r + 6, r + 4, ropa[kk % 6]); R.disco(x - 3, y + r + 4, 2, mez(ropa[kk % 6], 0xffffffff, 0.2));
    R.disco(x, y, r + 1, K0); R.disco(x, y, r, pelo[kk % 6]); R.pset(x - r - 1, y + 1, hex('#e8b088')); R.pset(x + r + 1, y + 1, hex('#e8b088'));
    const alza = (kk % 4 === 1) && (flashA > 0 || flashB > 0 || Math.sin(t * 1.5 + kk) > 0.4);
    if (alza) { const cy = y - r - 6; caja(x - 6, cy - 5, x + 6, cy + 4, hex('#2a2a2a')); R.disco(x, cy, 2, hex('#4a6aa8')); caja(x - 3, cy - 9, x + 3, cy - 5, hex('#c8c8d0'));
      if ((flashA > 0 && kk % 8 === 1) || (flashB > 0 && kk % 8 === 5)) flash(x, cy - 7, 6); } } };
const p2 = (t) => {
  capa('vue-julio', fondoJulio);
  for (const x of [70, 230]) lampara(x, t);
  // las banderas en sus mástiles (x 30 y 280)
  for (const [x, k] of [[24, 0], [276, 2]]) { R.rect(x, 48, x + 1, 138, hex('#c8a040')); R.disco(x, 46, 2, hex('#e8c860')); bandera(x + 2, 52, 30, 20, t, k); R.rect(x - 4, 136, x + 5, 139, hex('#8a6a24')); }
  // Goizueta junto a la peana, que sonríe y aplaude cuando llega la lata
  const llega = @v(8.9), deja = @v(9.15);
  { const ap = t > deja && Math.sin(t * 14) > 0; R.actor(NC.goizueta, 96, 140, t, { dir: 1, brazos: ap, sonrisa: t > llega, habla: t < @v(6.2) && t > P2 + 0.4 && Math.sin(t * 7) > 0.3 }); }
  // el presentador entra con la lata de la banda dorada y la deja en la peana
  { const u = sm(lin(t, @v(7.9), llega)), x = Math.round(lerp(-20, 116, u)), v = sm(lin(t, deja + 0.2, deja + 1.4)), xs = Math.round(lerp(116, 56, v));
    const tiene = t < deja; const a = R.actor(NC.presentador, tiene ? x : xs, 140, t, { dir: tiene ? 1 : -1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), sostiene: tiene ? [x + 18, 108] : undefined, sonrisa: true });
    if (tiene && x > -16) lataV(a.mano[0] + 1, a.mano[1] + 4, 1.5); }
  if (t >= deja) { lataV(147, 96, 1.5); if (t < deja + 0.8) flash(153, 76, Math.round(7 * (1 - lin(t, deja, deja + 0.8)))); }
  // Keough tras el atril: en «backed down» alza las manos; en «original» señala la peana
  const baja = @v(6.36), orig = @v(7.62);
  R.actor(NC.keough, 224, 140, t, { dir: -1, brazos: t > baja && t < baja + 0.9, dedo: t > orig && t < orig + 1.2, habla: Math.sin(t * 7.5) > -0.1 && !(t > baja && t < baja + 0.9), sonrisa: t > llega });
  // el atril de madera con sus micrófonos
  caja(214, 120, 250, 146, hex('#6a4022')); R.rect(216, 122, 248, 124, hex('#9a6a3e')); R.rect(216, 125, 248, 144, hex('#7a4a28')); for (let y = 128; y < 144; y += 5) R.rect(218, y, 246, y, hex('#5a3418'));
  abanico(232, 128, 8);
  for (const [x, c] of [[220, '#3a3a46'], [228, '#c83030'], [236, '#2a5aa8'], [244, '#3a3a46']]) { R.linea(x, 120, x + (x < 232 ? 2 : -2), 110, hex('#5a5a66')); R.disco(x + (x < 232 ? 2 : -2), 109, 2, hex(c)); }
  // la tele: las dos cámaras en trípode a los lados del foso
  for (const [x, d] of [[2, 1], [318, -1]]) { R.linea(x + d * 12, 150, x + d * 2, 180, hex('#4a4a56')); R.linea(x + d * 12, 150, x + d * 22, 180, hex('#4a4a56')); caja(Math.min(x, x + d * 26), 132, Math.max(x, x + d * 26), 150, hex('#5a5e6a')); R.disco(x + d * 27, 141, 4, K0); R.disco(x + d * 27, 141, 2, hex('#4a6aa8')); if (Math.sin(t * 5 + x) > 0) R.pset(x + d * 4, 134, hex('#ff3a2a')); }
  // las nucas de la prensa, con los flashes en «backed down» y cuando llega la lata
  nucas(t, t > baja && t < baja + 0.5 ? 1 : 0, t > deja && t < deja + 0.5 ? 1 : 0);
  if (t > baja && t < baja + 0.18) T.tinte(R, 17, 158, [255, 255, 255], 0.18);
};

// ── 3 · la lata en su peana ──
const fondoPeana = () => {
  // el telón de cerca (pliegues grandes) y lo alto liso
  llena(0, 0, 319, 12, rp('#120a0c', '#1a1012'), (x, y) => 1);
  llena(0, 13, 319, 179, rp('#3a060c', '#5a1016', '#7a1a20', '#9a282c', '#b83a3c'), (x, y) => 2 + Math.sin(x * 0.16 + Math.sin(y * 0.02) * 1.4) * 1.6 + (hh(x, y, 4) - 0.5) * 0.3);
  // el cordón dorado con su borla a la izquierda
  for (let y = 13; y < 120; y++) { const x = Math.round(36 + Math.sin(y * 0.05) * 3); R.pset(x, y, hex('#e8c860')); R.pset(x + 1, y, hex('#a8843a')); if (y % 4 === 0) R.pset(x + 1, y, hex('#fff2a0')); }
  for (let j = 0; j < 22; j++) for (let i = -6 - Math.floor(j / 4); i <= 6 + Math.floor(j / 4); i++) R.pset(38 + i, 120 + j, (i + j) % 3 === 0 ? hex('#8a6a24') : hex('#c8a040'));
  // el guirnalda de banderines (arriba, sin tocar la esquina de Atom)
  for (let x = 60; x < 262; x++) { const y = Math.round(18 + Math.sin((x - 60) / 202 * Math.PI) * 10); R.pset(x, y, hex('#e8e8f0')); if ((x - 60) % 14 === 0) { const c = hex(['#c83030', '#f0ece0', '#2a3a8a'][((x - 60) / 14) % 3]); for (let j = 1; j <= 8; j++) for (let i = -4 + Math.floor(j / 2); i <= 4 - Math.floor(j / 2); i++) R.pset(x + i, y + j, c); } }
  // la columna de mármol con estrías y el capitel (x 100–220)
  for (let y = 136; y <= 179; y++) for (let x = 112; x <= 208; x++) { const i = (x - 112) % 12; R.pset(x, y, i === 0 ? hex('#a89e90') : R.tone(rp('#b8b0a2', '#d8d0c4', '#ece6dc', '#fbf8f2'), 2.6 - Math.abs(x - 150) / 36 + (i < 3 ? -0.6 : 0) + (hh(x, y) - 0.5) * 0.4, x, y)); }
  caja(100, 128, 220, 137, hex('#e8e2d6')); R.rect(102, 130, 218, 131, hex('#fbf8f2')); R.rect(102, 135, 218, 136, hex('#b8b0a2'));
  // el cojín de terciopelo azul con su fleco dorado
  caja(118, 120, 202, 129, hex('#2a3a7a')); R.rect(120, 121, 200, 122, hex('#4a5aa8')); for (let x = 119; x < 202; x += 2) R.pset(x, 130, hex('#e8c860'));
};
const p3 = (t) => {
  capa('vue-peana', fondoPeana);
  // el foco que se enciende en «under» y su haz con motas
  const fo = sm(lin(t, P3 + 0.05, P3 + 0.35));
  if (fo > 0) { cono(196, 14, 160, 126, 54, hex('#fff2c8'), 0.3 * fo); for (let k = 0; k < 14; k++) { const u = (t * 0.07 + k / 14) % 1, x = Math.round(160 + (hh(k, 1) - 0.5) * 70 * u + 30 * (1 - u)), y = Math.round(20 + u * 100); R.pset(x, y, hex('#fff6d8')); } }
  // la lata grande con su banda dorada; en «Classic» el brillo recorre la banda
  const cl = @v(11.08);
  lataV(160, 124, 3.6);
  { const x0 = 160 - 21, u = lin(t, cl, cl + 0.6); if (u > 0 && u < 1) { const bx = Math.round(x0 + 4 + u * 36); for (let j = -14; j <= 14; j++) { R.pset(bx + Math.round(j * 0.4), 100 + j, hex('#ffffff')); R.pset(bx + 1 + Math.round(j * 0.4), 100 + j, hex('#fff2a0')); } } }
  if (t > cl) for (let k = 0; k < 5; k++) { const ph = (t - cl) * 3 + k * 1.3, r = Math.round(2 + Math.abs(Math.sin(ph)) * 3); if (Math.sin(ph) > 0) flash(Math.round(160 + Math.cos(k * 1.9) * 34), Math.round(92 + Math.sin(k * 2.3) * 30), r); }
  // los micrófonos que entran de las manos de los periodistas en «news spread so fast»
  const mics = [[@v(12.19), -1, 34, '#c83030'], [@v(12.49), 1, 286, '#2a5aa8'], [@v(12.85), -1, 70, '#3a3a46'], [@v(13.11), 1, 252, '#e8c040']];
  for (const [t0, lado, xf, col] of mics) { const u = sm(lin(t, t0, t0 + 0.35)); if (u <= 0) continue;
    const wx = Math.round(lerp(lado < 0 ? -20 : 340, xf, u)), wy = 156, mx = wx - lado * 3, ol = Math.round(Math.sin(t * 5 + xf) * 1);
    // el micrófono de mano: mango negro, el dado de color (sin letras) y la rejilla
    R.rect(mx - 2, wy - 30 + ol, mx + 2, wy, K0); R.rect(mx - 1, wy - 29 + ol, mx + 1, wy, hex('#2a2a2a')); R.rect(mx, wy - 29 + ol, mx, wy, hex('#4a4a4a'));
    caja(mx - 6, wy - 38 + ol, mx + 6, wy - 28 + ol, hex(col)); R.rect(mx - 5, wy - 37 + ol, mx + 5, wy - 36 + ol, mez(hex(col), 0xffffffff, 0.35));
    R.disco(mx, wy - 44 + ol, 6, K0); R.disco(mx, wy - 44 + ol, 5, hex('#5a5a66')); for (let j = -4; j <= 4; j += 2) for (let i = -4; i <= 4; i += 2) if (Math.hypot(i, j) < 5) R.pset(mx + i, wy - 44 + ol + j, hex('#9a9aa6'));
    T.brazo(R, lado < 0 ? wx - 30 : wx + 30, 194, wx, wy, lado < 0 ? '#3a3a4a' : '#6a5a3a', lado < 0 ? 1 : -1, { codo: [lado < 0 ? wx - 18 : wx + 18, 178] }); }
  // los flashes de los fotógrafos
  for (const [t0, x, y] of [[@v(12.3), 60, 50], [@v(12.7), 262, 70], [@v(13.1), 90, 96], [@v(13.5), 236, 40]]) { const u = t - t0; if (u > 0 && u < 0.3) { flash(x, y, Math.round(8 * (1 - u / 0.3))); if (u < 0.08) T.tinte(R, 13, 179, [255, 255, 255], 0.2); } }
};

// ── 4 · el salón: la telenovela interrumpida ──
const p4 = (t) => {
  const ur = @v(15.99), o = { encuadre: 'rival', camara: 'tele', urgente: lin(t, ur, ur + 1.4) };
  T.anuncio(R, t, o);
  // la señora tras la mesita, con su taza; en «interrupted» se queda de piedra, en «soap opera» señala y salta
  const soap = @v(17.45), op = @v(17.89);
  { const sorp = t > ur + 0.2, salta = t > op ? Math.round(Math.abs(Math.sin((t - op) * 7)) * 4) : 0;
    const a = R.actor(NC.senora75, 136, 151, t, { dir: 1, sorpresa: sorp && t < op, sonrisa: !sorp || t > op, dedo: t > soap && t < op, brazos: t > op, salto: salta, sostiene: !sorp ? [150, 136] : undefined });
    if (!sorp) { caja(a.mano[0] - 2, a.mano[1] - 3, a.mano[0] + 3, a.mano[1] + 3, hex('#f2ece0')); R.rect(a.mano[0] + 4, a.mano[1] - 1, a.mano[0] + 5, a.mano[1] + 1, K0); } }
  // el vecino entra con el cuenco de palomitas; con el aviso, las palomitas saltan por los aires
  const vv = sm(lin(t, P4 + 0.1, P4 + 1.4)), x = Math.round(lerp(330, 266, vv)), suelta = ur + 0.35;
  { const a = R.actor(NC.vecinoSotano, x, 164, t, { dir: -1, anda: vv > 0 && vv < 1, sostiene: t < suelta ? [x - 2, 144] : undefined, sorpresa: t > ur + 0.2 && t < soap, dedo: t > soap + 0.2, sonrisa: t > op });
    if (t < suelta) { const [mx, my] = a.mano; R.poligono([[mx - 8, my - 2], [mx + 6, my - 2], [mx + 3, my + 4], [mx - 5, my + 4]], K0); R.poligono([[mx - 7, my - 1], [mx + 5, my - 1], [mx + 2, my + 3], [mx - 4, my + 3]], hex('#c83a3a')); for (let k = 0; k < 6; k++) R.disco(mx - 5 + k * 2, my - 3 - (k % 2), 1, hex('#fff6d8')); } }
  if (t > suelta) { const u = t - suelta; for (let k = 0; k < 18; k++) { const vx = (hh(k, 1) - 0.5) * 60, vy = -50 - hh(k, 2) * 40, px = Math.round(x - 4 + vx * u), py = Math.round(Math.min(164, 142 + vy * u + 130 * u * u)); R.pset(px, py, hex('#fff6d8')); R.pset(px + 1, py, hex('#f0e0a0')); R.pset(px, py - 1, hex('#fff6d8')); }
    const bx = Math.round(x - 4 - u * 10), by = Math.round(Math.min(162, 144 + 120 * u * u)); R.poligono([[bx - 7, by - 2], [bx + 7, by - 2], [bx + 4, by + 3], [bx - 4, by + 3]], hex('#c83a3a')); }
  // el gato del sofá que se despierta con el aviso
  { const cx = 34, cy = 112, desp = t > ur + 0.3; R.disco(cx, cy, 5, hex('#8a6a4a')); R.disco(cx + 6, cy - 3 - (desp ? 2 : 0), 3, hex('#8a6a4a')); R.pset(cx + 5, cy - 6 - (desp ? 2 : 0), hex('#8a6a4a')); R.pset(cx + 8, cy - 6 - (desp ? 2 : 0), hex('#8a6a4a'));
    if (desp) { R.pset(cx + 6, cy - 4, K0); R.pset(cx + 8, cy - 4, K0); } else R.rect(cx + 5, cy - 3, cx + 8, cy - 3, K0); R.linea(cx - 5, cy + 2, cx - 9, cy - 3 + Math.round(Math.sin(t * 3) * 2), hex('#8a6a4a')); }
  T.anuncioDelante(R, t, o);
};

// ── 5 · el Senado ──
const fondoSenado = () => {
  // el techo y la tribuna de público (y 16–56), con su barandilla de mármol; la esquina de Atom, cortina lisa
  llena(0, 0, 319, 15, rp('#14121a', '#1c1a24'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.3);
  llena(0, 16, 319, 50, rp('#2a2430', '#3a3240', '#4a4050'), (x, y) => 1.2 + (y - 16) / 30 + (hh(x, y, 2) - 0.5) * 0.4);
  for (let y = 16; y <= 50; y++) for (let x = 270; x <= 319; x++) R.pset(x, y, R.tone(rp('#3a1a24', '#4a2230', '#5a2a3a'), 1.2 + Math.sin(x * 0.4) * 0.6, x, y));
  R.rect(0, 50, 319, 58, hex('#d8d0c0')); R.rect(0, 50, 319, 51, hex('#f2ece0')); for (let x = 4; x < 320; x += 8) R.rect(x, 53, x + 3, 57, hex('#b8b0a0')); R.rect(0, 58, 319, 59, hex('#8a8478'));
  // la pared del fondo: paneles azul grisáceo y pilastras de mármol
  llena(0, 60, 319, 112, rp('#2a3448', '#344058', '#3e4c66', '#4a5a76'), (x, y) => 1.6 + (((x % 40) < 2 || (y - 60) % 26 < 1) ? -0.8 : 0) + (hh(x, y, 3) - 0.5) * 0.4);
  for (const x of [8, 64, 248, 304]) { for (let y = 60; y <= 112; y++) for (let i = 0; i < 10; i++) R.pset(x + i, y, R.tone(rp('#b8b0a0', '#d8d0c0', '#f0eadc'), 1.4 + (i < 2 ? 0.8 : i > 7 ? -0.8 : 0) + (hh(x + i, y) - 0.5) * 0.4, x + i, y)); R.rect(x - 1, 60, x + 10, 63, hex('#f2ece0')); }
  // el estrado de mármol de tres gradas en el centro (x 104–216)
  for (const [x0, x1, y0, y1] of [[124, 196, 64, 84], [112, 208, 84, 100], [100, 220, 100, 114]]) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone(rp('#a89e8c', '#c8bea8', '#e0d8c4', '#f2ece0'), 2.2 + (y === y0 ? 1 : 0) - (x - x0) / (x1 - x0) * 0.6 + (hh(x, y, 5) - 0.5) * 0.5, x, y)); R.rect(x0, y1, x1, y1, hex('#8a8070')); }
  R.rect(126, 72, 194, 73, hex('#2a3a7a'));
  // el suelo: moqueta azul con estrellitas
  llena(0, 115, 319, 179, rp('#1a2450', '#22306a', '#2a3a7a', '#344888'), (x, y) => 1.5 + (((x * 3 + y * 7) % 23 === 0) ? 1.4 : 0) + (hh(x, y, 6) - 0.5) * 0.6);
};
// un escaño de caoba (x0–x1, tablero en y), con lámpara y papeles
const escano = (x0, x1, y, h = 10) => { caja(x0, y, x1, y + h, hex('#5a2a14')); R.rect(x0 + 1, y + 1, x1 - 1, y + 2, hex('#8a4a24')); R.rect(x0 + 1, y + 3, x1 - 1, y + h - 1, hex('#6a3218')); for (let x = x0 + 4; x < x1 - 2; x += 8) R.rect(x, y + 4, x + 5, y + h - 2, hex('#5a2a14'));
  R.rect(x0 + 3, y - 1, x0 + 9, y, hex('#f6f2e6')); };
const p5 = (t) => {
  capa('vue-senado', fondoSenado);
  // el público de la tribuna (cabecitas que se mueven) y el reloj de la tribuna
  for (let k = 0; k < 26; k++) { const x = 6 + k * 10 + Math.round(hh(k, 1) * 3); if (x > 262) continue; cabecita(x, 40 + (k % 2) * 4, hex(['#3a3a4a', '#6a4a3a', '#2a4a6a', '#7a3a3a', '#4a5a3a'][k % 5]), hex(['#2a1e1a', '#5a3a24', '#c8c8d0', '#1a1a1a'][k % 4]), k, t); }
  reloj(160, 46, 6, 0.42, (t * 0.02) % 1);
  // las banderas a los lados del estrado
  for (const [x, k] of [[90, 0], [226, 1]]) { R.rect(x, 58, x + 1, 114, hex('#c8a040')); R.disco(x, 57, 2, hex('#e8c860')); bandera(x + 2, 62, 18, 13, t, k); }
  // el presidente en lo alto del estrado y los secretarios; en «history» da el mazazo
  const hist = @v(24.39), maz = t > hist && t < hist + 0.25;
  R.actor(NC.abogado2, 152, 76, t, { dir: 1, sostiene: maz ? [170, 70] : [170, 62] }); { const [mx, my] = maz ? [170, 70] : [170, 62]; R.rect(mx, my - 3, mx + 1, my + 3, hex('#6a3a1a')); caja(mx - 3, my - 6, mx + 5, my - 3, hex('#7a4a24')); }
  R.rect(124, 76, 196, 84, hex('#d8d0c0')); R.rect(124, 76, 196, 77, hex('#f2ece0'));
  if (maz) for (const s of [-1, 1]) R.linea(170 + s * 4, 76, 170 + s * 9, 72, hex('#ffffff'));
  for (const [x, k] of [[126, 0], [182, 1]]) mini(x, 99, hex(k ? '#3a3a4a' : '#4a3a2a'), hex(k ? '#c8c8d0' : '#2a1e1a'), t, false, k);
  // las filas de escaños con los senadores sentados (detrás, pequeños)
  for (const [y, xs] of [[122, [20, 74, 128, 182, 236]], [138, [6, 62, 118, 174, 230]]]) for (const x of xs) { for (let k = 0; k < 3; k++) cabecita(x + 6 + k * 14, y - 7, hex(['#2a2a3a', '#3a3a4a', '#4a3a2a'][k]), hex(['#c8c8d0', '#2a1e1a', '#5a3a24'][(k + x) % 3]), k + x, t); escano(x, x + 46, y); }
  // el ujier que cruza con papeles
  { const x = Math.round(-10 + ((t * 18) % 340)); mini(x, 156, hex('#2a2a3a'), hex('#5a3a24'), t, true, 2); R.rect(x + 4, 147, x + 7, 150, hex('#f6f2e6')); }
  // los dos compañeros que aplauden en «meaningful moment»
  const mom = @v(22.89), cel = @v(19.95), con = @v(21.65);
  for (const [def, x, k] of [[NC.abogado1, 34, 0], [NC.periodista2, 70, 1]]) { const ap = t > mom && Math.sin(t * 14 + k) > 0; R.actor(def, x, 170, t, { dir: 1, brazos: ap, sonrisa: t > cel, pal: k ? { C: '#3a3a4a', c: '#2a2a3a' } : undefined }); }
  escano(20, 112, 158, 22);
  // el senador llega a su escaño, alza la lata en «celebrated», levanta el dedo en «Congress» y abre los brazos en «meaningful moment»
  const u = sm(lin(t, P5 + 0.1, P5 + 1.0)), x = Math.round(lerp(150, 196, u)), alza = t > cel && t < con - 0.1;
  luz(x + 8, 150, 34, hex('#fff2c8'), 0.22);
  const a = R.actor(NC.senador, x, 168, t, { dir: 1, anda: u > 0 && u < 1, habla: Math.sin(t * 8) > -0.2 && t > P5 + 1.0, sonrisa: t > cel, sostiene: alza ? [x + 15, 128] : (t <= cel ? [x + 15, 150] : undefined), dedo: t > con && t < mom, brazos: t > mom });
  if (alza) { lataV(a.mano[0] + 1, a.mano[1] + 7, 1.4); if (t < cel + 0.5) flash(a.mano[0] + 1, a.mano[1] - 10, Math.round(5 * (1 - lin(t, cel, cel + 0.5)))); }
  else if (t <= cel) { R.rect(a.mano[0] - 2, a.mano[1] - 4, a.mano[0] + 4, a.mano[1] + 3, hex('#f6f2e6')); R.rect(a.mano[0] - 1, a.mano[1] - 2, a.mano[0] + 3, a.mano[1] - 2, hex('#8a8a96')); }
  // su escaño de delante con el micrófono de cuello de cisne
  escano(214, 300, 156, 24); R.linea(222, 156, 218, 140, hex('#3a3a46')); R.linea(218, 140, 212, 136, hex('#3a3a46')); R.disco(211, 135, 2, hex('#2a2a2a'));
  lataV(272, 155, 1); R.rect(240, 152, 258, 155, hex('#f6f2e6'));
  // flashes de la tribuna en «history»
  if (t > hist && t < hist + 0.3) { flash(60, 36, 5); flash(214, 40, 4); }
};

const efectos = [[0.25, 'interruptor'], [0.6, 'viento'], [@v(1.24), 'papel'], [@v(3.36), 'sello'], [@v(6.36), 'flash'], [@v(8.1), 'publico'], [@v(9.15), 'golpecito'], [@v(9.6), 'interruptor'], [@v(11.08), 'brillo'], [@v(12.3), 'flash'], [@v(13.1), 'flash'],
  [@v(15.99), 'aviso'], [@v(16.4), 'toc'], [@v(17.89), 'palmada'], [@v(19.95), 'brillo'], [@v(22.95), 'publico'], [@v(24.39), 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1985 });
'''))

# ───────────────────────────────────────── NC-GRACIAS ─────────────────────────────────────────
E['nc-gracias'] = ('Las gracias', r'''// NC-GRACIAS (frase 21, «The phone lines filled up again, but this time to say thank you…»), sin cartela; la barra
// del año dice la verdad: 1985, sube a 1990 con la gráfica, de 1990 a 2002 con la balda, y 2019. Seis planos:
// 1. La centralita de las gracias (fondo local): el panel de luces que se llenan de corazones, el contador de llamadas
//    que sube, tres operadoras tras la mesa larga; los teléfonos suenan y saltan, ellas descuelgan una tras otra y sale
//    un corazón de cada auricular; en «thank you» la del centro alza los brazos y el panel entero se pone rosa; delante,
//    el cartero cruza con el carro de cartas con corazones.
// 2. Corta en «Sales»: el súper (colas 'super', 2.º uso): las latas de las baldas se vuelven rojas una a una; el reponedor
//    levanta tras la mesa una pirámide de latas de la banda dorada; un chico entra corriendo con su lata en alto; la señora
//    llega con el carro lleno de rojas.
// 3. Corta en «both»: la sala de reuniones (fondo local): la gráfica de ventas de 1985 a 1990 en la pizarra; la línea roja
//    sube y cruza a la gris de la nueva en «new one» y a la azul del rival en «Pepsi»; Goizueta lo celebra con un salto;
//    Keough la señala con el puntero; con «stayed in stores for years» la gráfica avanza años y la gris se arrastra abajo.
// 4. Corta en «more and more»: el rincón de la tienda con los años pasando (fondo local): por la ventana pasan días y
//    noches y el calendario cuenta los años; las latas de la nueva bajan de la balda de los ojos a la de abajo en
//    «hidden away», el reponedor les pega un «2» en «new name» y en «disappeared» se lleva la última; queda una telaraña.
// 5. Corta en «And»: una tienda de 2019 (fondo local): neveras de cristal con luz de led; en «2019» aparecen en una balda
//    las latas de la nueva; en «came back» un chico abre la puerta (vaho frío) y coge una; en el cristal, el calendario
//    tacha unas semanas en «few weeks»; en «wink» guiña un ojo con la lata en alto.
// 6. Corta en «series»: un salón de 2019 de noche (fondo local): la tele plana echa un atardecer de neón con «1985»; los
//    dos amigos en el sofá: en «set» uno abre la lata nueva (salta un poco de espuma), en «1985» el otro señala la tele
//    y los dos lo celebran.
''', COMUN + F(r'''
const P2 = @g(4.11), P3 = @g(8.05), P4 = @g(12.67), P5 = @g(17.16), P6 = @g(21.18);

// ── 1 · la centralita de las gracias ──
const fondoCentralita = () => {
  // el techo de placas (liso arriba) y la pared verde pálido
  llena(0, 0, 319, 15, rp('#c8c8b8', '#d8d8c8', '#e4e4d6'), (x, y) => 1.4 + (x % 32 === 0 ? -1 : 0) + (hh(x, y) - 0.5) * 0.3);
  R.rect(0, 15, 319, 16, hex('#8a8a7a'));
  llena(0, 17, 319, 118, rp('#8aa890', '#9ab8a0', '#aac8b0', '#bcd8c0'), (x, y) => 1.8 + (y > 96 ? -0.8 : 0) + (y === 96 ? -1.5 : 0) + (hh(x, y, 2) - 0.5) * 0.5);
  // el panel de luces (x 22–214, y 24–80) con su marco y la rejilla de pilotos
  caja(20, 22, 216, 82, hex('#3a3a46')); R.rect(22, 24, 214, 80, hex('#22222c'));
  // el contador de llamadas (x 224–270, y 28–48) y el corcho con las tarjetas de agradecimiento (x 224–270, y 56–94)
  caja(222, 26, 272, 50, hex('#3a3a46')); R.rect(224, 28, 270, 48, hex('#0e1a0e'));
  caja(222, 56, 272, 96, hex('#8a5a32')); for (let y = 58; y < 95; y++) for (let x = 224; x < 271; x++) R.pset(x, y, R.tone(rp('#a8784a', '#c89a6a', '#d8aa7a'), 1.3 + (hh(x, y, 5) - 0.5) * 1.4, x, y));
  for (const [x, y, k] of [[228, 60, 0], [248, 62, 1], [232, 76, 2], [252, 78, 3]]) { caja(x, y, x + 16, y + 12, hex(['#f6f2e6', '#f8e0e8', '#e8f0f8', '#f6f2e6'][k])); corazon(x + 5, y + 3, 1, hex('#e83a5a')); R.pset(x + 8, y, hex('#c83030')); }
  // la ventanilla del pasillo y la fuente de agua (x 286–310, por debajo de la esquina de Atom)
  caja(282, 52, 314, 96, hex('#d8e0e8')); R.rect(284, 54, 312, 94, hex('#b8c8d8')); R.rect(297, 54, 298, 94, hex('#8a9aa8'));
  caja(288, 98, 308, 118, hex('#c8ccd0')); R.disco(298, 96, 4, hex('#9ac8e8'));
  // la fila de cubículos del fondo (mamparas de tela) donde trabajan más operadoras
  for (let y = 100; y <= 124; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, (x % 40 < 2) ? hex('#6a6e7a') : R.tone(rp('#5a6a8a', '#6a7a9a', '#7a8aaa'), 1.4 + (y === 100 ? 1 : 0) + (hh(x, y, 4) - 0.5) * 0.8, x, y));
  // el suelo de detrás (lo tapa la mesa) y el de delante, de terrazo
  llena(0, 125, 319, 179, rp('#8a8478', '#a8a090', '#c0b8a8'), (x, y) => 1.4 + (hh(x, y, 7) > 0.9 ? 0.8 : 0) + (hh(x, y, 8) - 0.5) * 0.5);
};
// el teléfono de mesa (base de 18 × 8 con su teclado); en la base: (x, y) el centro de abajo
const telBase = (x, y, salto = 0) => { y -= salto; caja(x - 9, y - 8, x + 9, y, hex('#d8c8a0')); R.rect(x - 8, y - 7, x + 8, y - 6, hex('#e8dcc0')); for (let a = 0; a < 3; a++) for (let b = 0; b < 2; b++) R.rect(x - 4 + a * 3, y - 5 + b * 2, x - 3 + a * 3, y - 5 + b * 2, hex('#f6f2e6')); };
const telAuric = (x, y) => { caja(x - 9, y - 3, x + 9, y + 1, hex('#d8c8a0')); R.rect(x - 9, y - 4, x - 5, y + 2, hex('#c8b890')); R.rect(x + 5, y - 4, x + 9, y + 2, hex('#c8b890')); };
const p1 = (t) => {
  capa('gra-centralita', fondoCentralita);
  for (const [x, on] of [[20, 1], [120, Math.sin(t * 23) > -0.8 ? 1 : 0], [200, 1]]) fluo(x, 4, 46, on);
  const gr = @g(3.08), cuel = [@g(0.9), @g(1.66), @g(2.4)];
  // el panel de pilotos: corazones rosas que se encienden (todos en «thank you»)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) { const x = 28 + i * 16, y = 29 + j * 13, k = i + j * 12, on = t > gr || hh(k, Math.floor(t * 3 + k * 0.3)) > 0.55;
    if (on) corazon(x, y, 1, t > gr ? hex('#ff5a8a') : hex('#e83a5a'), hex('#22222c')); else { R.rect(x + 2, y + 1, x + 4, y + 3, hex('#4a3a44')); } }
  if (t > gr) luz(118, 52, 90, hex('#ff8ab0'), 0.15 * lin(t, gr, gr + 0.3));
  // las operadoras pequeñas de los cubículos, con sus corazoncitos
  for (let k = 0; k < 8; k++) { const x = 14 + k * 40, y = 98; cabecita(x, y, hex(['#c84a6a', '#4a6aa8', '#e8a040', '#6a8a4a'][k % 4]), hex(['#5a3a24', '#2a1e1a', '#c8a060'][k % 3]), k, t); R.pset(x - 1, y, K0); R.pset(x + 5, y, K0);
    const u = (t * 0.6 + k * 0.37) % 1; if (u < 0.5) corazon(x + 6, Math.round(y - 10 - u * 14), 1, hex('#e83a5a')); }
  // el contador de llamadas que sube
  R.numero(String(1500 + Math.floor(t * 270)), 247, 44, { color: hex('#6aff8a'), centro: true });
  // tres operadoras tras la mesa; descuelgan una tras otra y sale un corazón del auricular
  const ops = [[44, 70, 0], [144, 170, 1], [240, 268, 2]];
  for (const [x, tx, k] of ops) { const habla = t > cuel[k], grande = k === 1 && t > gr;
    const a = R.actor(NC.operadora, x, 146, t, { dir: 1, sonrisa: habla, habla: habla && Math.sin(t * 9 + k) > 0.4, brazos: grande && t < gr + 0.9, sostiene: habla && !(grande && t < gr + 0.9) ? [x + 13, 128] : undefined, salto: grande && t < gr + 0.9 ? Math.round(Math.abs(Math.sin((t - gr) * 7)) * 3) : 0 });
    if (habla && !(grande && t < gr + 0.9)) { telAuric(a.mano[0] + 3, a.mano[1]); for (let i = 0; i < 10; i++) R.pset(Math.round(lerp(a.mano[0] + 8, tx, i / 10)), Math.round(a.mano[1] + 4 + Math.sin(i * 1.4) * 2 + i * 1.2), hex('#3a3a3a')); }
    if (habla) { const u = (t - cuel[k]) % 1.4, y = Math.round(110 - u * 30), s = grande ? 3 : 2; if (u < 1.1) { corazon(x + 14, y - (grande ? 12 : 0), s, hex('#e83a5a')); } } }
  // la mesa larga (delante de ellas): tablero, frente de formica y los teléfonos
  R.rect(0, 138, 319, 144, K0); R.rect(0, 139, 319, 142, hex('#c8b490')); R.rect(0, 139, 319, 139, hex('#e0ceaa'));
  for (let y = 145; y <= 164; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, (x % 64 === 0) ? hex('#5a4a34') : R.tone(rp('#7a6648', '#8a7656', '#9a8664'), 1.2 + (y === 145 ? -1 : 0) + (hh(x, y, 9) - 0.5) * 0.5, x, y));
  for (let x = 28; x < 320; x += 64) { caja(x, 149, x + 30, 160, hex('#6a5a40')); R.rect(x + 12, 154, x + 18, 155, hex('#c8a040')); }
  for (const [x, tx, k] of ops) { const suena = t < cuel[k], salto = suena ? Math.round(Math.abs(Math.sin(t * 22 + k)) * 3) : 0; telBase(tx, 140, salto); if (suena) { telAuric(tx, 132 - salto - Math.round(Math.abs(Math.sin(t * 22 + k + 0.9)) * 3)); if (Math.sin(t * 11 + k) > -0.3) for (const s of [-1, 1]) { R.linea(tx + s * 12, 126, tx + s * 15, 123, K0); R.linea(tx + s * 12, 130, tx + s * 16, 130, K0); } } }
  // la libreta, la taza que humea y el jarrón de flores sobre la mesa
  caja(100, 132, 118, 139, hex('#f6f2e6')); R.rect(102, 134, 116, 134, hex('#8a8a96')); caja(196, 128, 204, 139, hex('#c83a3a'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; R.pset(Math.round(200 + Math.sin(u * 8 + t) * 2), Math.round(126 - u * 12), mez(hex('#ffffff'), hex('#aac8b0'), u)); }
  caja(12, 124, 22, 139, hex('#9ac8e8')); for (const [dx, dy, c] of [[-3, -4, '#e83a5a'], [2, -6, '#f0c040'], [5, -2, '#e85a8a']]) { R.linea(17, 124, 17 + dx, 124 + dy, hex('#3a8a3a')); R.disco(17 + dx, 124 + dy, 2, hex(c)); }
  // el cartero que cruza por delante con el carro de cartas con corazones
  { const x = Math.round(-60 + (t / 4.2) * 400); R.actor(NC.voluntario, x + 36, 180, t, { dir: 1, anda: true, sostiene: [x + 34, 166], pal: { C: '#3a4a7a', c: '#2a3a5a' } });
    caja(x, 164, x + 32, 176, hex('#6a6a76')); for (let k = 0; k < 7; k++) { const cx = x + 3 + k * 4, cy = 157 + (k % 2) * 3; caja(cx, cy, cx + 7, cy + 7, hex(k % 3 ? '#f6f2e6' : '#f8e0e8')); R.pset(cx + 3, cy + 3, hex('#e83a5a')); }
    R.disco(x + 6, 177, 2, K0); R.disco(x + 26, 177, 2, K0); }
};

// ── 2 · el súper: las baldas se vuelven rojas ──
const p2 = (t) => {
  const o = { encuadre: 'super', azul: 0.5 * (1 - sm(lin(t, P2 + 0.3, @g(7.51)))), vasos: false, graba: false };
  T.colas(R, t, o);
  // el reponedor tras la mesa: coge latas de la caja y levanta la pirámide
  const n = Math.min(10, Math.floor((t - P2) * 2.8)), sube = Math.floor((t - P2) * 2.8 * 2) % 2 === 0;
  { const x = 186, a = R.actor(NC.voluntario, x, 138, t, { dir: -1, sonrisa: true, sostiene: sube ? [x - 2, 112] : [x + 2, 122], pal: { C: '#3a7a4a', c: '#2a5a36' } }); if (n < 10) lataV(a.mano[0], a.mano[1] + 5); }
  T.colasDelante(R, t, o);
  // la pirámide de latas de la banda dorada sobre la mesa de la cata
  const pos = []; for (let r = 0; r < 4; r++) for (let k = 0; k < 4 - r; k++) pos.push([150 + k * 13 + r * 6, 126 - r * 17]);
  pos.slice(0, n).forEach(([x, y]) => lataV(x, y)); PZ.cajaLatas(R, 214, 126, { color: 'rojo', abierta: true });
  // el chico que entra corriendo con su lata en alto
  { const u = lin(t, P2 + 0.6, P2 + 2.6), x = Math.round(lerp(-20, 96, sm(u))); const a = R.actor(NC.estudiante, x, 168, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [x + 16, 140], sonrisa: true, salto: u >= 1 ? Math.round(Math.abs(Math.sin(t * 6)) * 3) : 0 }); lataV(a.mano[0] + 1, a.mano[1] + 4); }
  // la señora llega con el carro lleno de latas rojas
  { const u = sm(lin(t, P2 + 0.2, P2 + 2.0)), x = Math.round(lerp(330, 238, u)); const a = R.actor(NC.senora75, x, 160, t, { dir: -1, anda: u > 0 && u < 1, sostiene: [x - 4, 146], sonrisa: true });
    const cx = x - 40; for (let i = 0; i < 6; i++) lataV(cx + 8 + (i % 3) * 9, 148 - Math.floor(i / 3) * 10, 0.8);
    R.rect(cx + 2, 147, cx + 34, 158, K0); for (let xx = cx + 3; xx < cx + 34; xx += 3) R.rect(xx, 148, xx, 157, hex('#b8bcc8')); R.rect(cx + 3, 152, cx + 33, 152, hex('#b8bcc8')); R.rect(cx + 34, 144, cx + 38, 145, hex('#9a9aa4'));
    for (const wx of [cx + 6, cx + 30]) { R.disco(wx, 160, 2, K0); R.pset(wx, 160, hex('#9a9aa4')); } }
};

// ── 3 · la gráfica de ventas ──
const fondoGrafica = () => {
  llena(0, 0, 319, 14, rp('#d8d4cc', '#e4e0d8'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.3);
  // la pared gris cálido con listones de madera abajo
  llena(0, 15, 319, 140, rp('#a8a090', '#b8b0a0', '#c8c0b0', '#d6cebe'), (x, y) => 2 + (y > 118 ? (x % 10 < 1 ? -1.4 : -0.6) : 0) + (hh(x, y, 2) - 0.5) * 0.5);
  R.rect(0, 117, 319, 118, hex('#7a6a50'));
  // la ventana a Atlanta de día (x 8–72, y 22–104)
  R.recorte([10, 24, 70, 102]);
  llena(10, 24, 70, 102, rp('#5a9ae0', '#7ab0e8', '#9ac4f0', '#bad8f8'), (x, y) => 3.2 - (y - 24) / 26 + (hh(x, y, 3) - 0.5) * 0.4);
  for (let k = 0; k < 6; k++) { const x = 12 + k * 10, h = 20 + Math.floor(hh(k, 2) * 40); rc(x, 102 - h, x + 7, 102, hex(['#8a94a8', '#a8b0c0', '#7a8498'][k % 3])); for (let j = 104 - h; j < 100; j += 3) for (let i = x + 1; i < x + 7; i += 2) R.pset(i, j, hex('#c8d8e8')); }
  R.recorte(null);
  for (const [a, b, c, d] of [[6, 20, 74, 23], [6, 103, 74, 106], [6, 20, 9, 106], [71, 20, 74, 106], [39, 24, 40, 102]]) R.rect(a, b, c, d, hex('#e8e4dc'));
  // la planta en su maceta junto a la ventana y el perchero
  R.rect(0, 108, 74, 110, hex('#d8d4cc'));
  // la pizarra blanca (x 82–266, y 20–114) con su marco y la bandeja de rotuladores
  caja(80, 18, 268, 116, hex('#9aa0aa')); R.rect(82, 20, 266, 114, hex('#f6f6f2'));
  for (let k = 0; k < 40; k++) R.pset(84 + Math.floor(hh(k, 1) * 180), 22 + Math.floor(hh(k, 2) * 90), hex('#e6e6e0'));
  R.rect(110, 116, 240, 119, hex('#8a909a')); for (const [x, c] of [[130, '#c83030'], [150, '#2a5aa8'], [170, '#2a2a2a']]) R.rect(x, 114, x + 12, 116, hex(c));
  // los ejes y los años (85 a 90)
  R.rect(98, 26, 99, 100, hex('#3a3a46')); R.rect(98, 99, 258, 100, hex('#3a3a46'));
  for (let k = 0; k <= 5; k++) { const x = 100 + k * 31; R.rect(x, 100, x, 102, hex('#3a3a46')); R.numero(String(85 + k), x, 111, { color: hex('#3a3a46'), centro: true }); }
  for (let j = 30; j < 99; j += 14) for (let x = 100; x < 258; x += 3) R.pset(x, j, hex('#d8d8d8'));
  // el suelo de moqueta
  llena(0, 141, 319, 179, rp('#4a4e5a', '#565a66', '#62666e'), (x, y) => 1.3 + (hh(x, y, 6) - 0.5) * 0.9);
};
// las tres líneas (año → 0–1): la roja (la de siempre), la gris (la nueva) y la azul (el rival)
const rojaF = (a) => a < 85.55 ? null : a < 85.95 ? 0.15 + (a - 85.55) / 0.4 * 0.55 : 0.7 + (a - 85.95) * 0.012;
const grisF = (a) => a < 85.3 ? null : a < 85.9 ? 0.62 - (a - 85.3) / 0.6 * 0.42 : Math.max(0.05, 0.2 - (a - 85.9) * 0.05);
const azulF = (a) => 0.48 + (a - 85) * 0.012 + Math.sin(a * 9) * 0.01;
const gx = (a) => 100 + (a - 85) * 31, gy = (v) => Math.round(98 - v * 70);
const p3 = (t) => {
  capa('gra-grafica', fondoGrafica);
  // por la ventana pasan nubes
  nube(((t * 5) % 90) - 10, 40, 18, rp('#c8d8ec', '#e8f0fa', '#ffffff'), (x, y) => x >= 10 && x <= 70 && y >= 24 && y <= 102);
  // el año al que llega el rotulador
  const nw = @g(8.65), pe = @g(9.53), st = @g(10.43);
  const fin = t < nw ? lerp(85.55, 85.69, lin(t, P3, nw)) : t < pe ? lerp(85.69, 85.80, lin(t, nw, pe)) : t < st ? lerp(85.80, 86.2, lin(t, pe, st)) : lerp(86.2, 90, lin(t, st, P4 - 0.3));
  const traza = (f, col, ancho, hasta) => { let prev = null; for (let a = 85; a <= hasta; a += 0.01) { const v = f(a); if (v == null) { prev = null; continue; } const p = [Math.round(gx(a)), gy(v)]; if (prev) for (let w = 0; w < ancho; w++) R.linea(prev[0], prev[1] + w, p[0], p[1] + w, col); prev = p; } return prev; };
  traza(azulF, hex('#2a5aa8'), 2, Math.max(fin, 86)); traza(grisF, hex('#8a8e9a'), 2, Math.max(fin, 86));
  const tip = traza(rojaF, hex('#c82020'), 3, fin);
  // las etiquetas de cada línea: una lata pequeña al final (sin letras)
  const fa = Math.max(fin, 86); lataA(Math.round(gx(fa)) + 8, gy(azulF(fa)) + 6, 0.5); lataN(Math.round(gx(fa)) + 8, gy(grisF(fa)) + 6, 0.5);
  if (tip) { luz(tip[0], tip[1], 8, hex('#ff6a4a'), 0.5); lataV(tip[0] + 8, tip[1] + 2, 0.6); }
  // los cruces: un destello cuando la roja pasa a la gris y a la azul
  for (const [t0, a] of [[nw, 85.69], [pe, 85.80]]) if (t > t0 && t < t0 + 0.6) flash(Math.round(gx(a)), gy(rojaF(a)), Math.round(6 * (1 - lin(t, t0, t0 + 0.6))));
  // Keough señala la punta con el puntero; Goizueta salta en «Pepsi»
  { const x = 64, a = R.actor(NC.keough, x, 168, t, { dir: 1, sostiene: [x + 16, 132], sonrisa: true, habla: Math.sin(t * 7) > 0.3 });
    const tx = tip ? tip[0] : 120, ty = tip ? tip[1] : 80, d = Math.hypot(tx - a.mano[0], ty - a.mano[1]), L = 30; R.linea(a.mano[0], a.mano[1], Math.round(a.mano[0] + (tx - a.mano[0]) / d * L), Math.round(a.mano[1] + (ty - a.mano[1]) / d * L), hex('#3a2a1e')); }
  { const sal = t > pe && t < pe + 1.4; R.actor(NC.goizueta, 276, 168, t, { dir: -1, brazos: sal, salto: sal ? Math.round(Math.abs(Math.sin((t - pe) * 7)) * 5) : 0, sonrisa: t > nw, habla: t > st && Math.sin(t * 8) > 0.2 }); }
  planta(30, 166, t, 30, 1);
  // la mesita auxiliar con la cafetera que humea, las latas y los papeles
  caja(150, 144, 214, 148, hex('#7a4a2e')); R.rect(154, 148, 156, 166, hex('#5a3420')); R.rect(208, 148, 210, 166, hex('#5a3420'));
  caja(158, 128, 172, 144, hex('#2a2a32')); R.rect(160, 136, 170, 143, hex('#5a3a24')); lataV(182, 144); lataV(194, 144); caja(198, 140, 212, 144, hex('#f6f2e6'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; R.pset(Math.round(165 + Math.sin(u * 8 + t) * 2), Math.round(126 - u * 12), mez(hex('#ffffff'), hex('#b8b0a0'), u)); }
  // los respaldos de dos sillas de oficina en primer término
  for (const x of [100, 236]) { caja(x, 160, x + 34, 180, hex('#2a2a32')); R.rect(x + 3, 163, x + 31, 166, hex('#4a4a56')); R.rect(x + 3, 163, x + 31, 163, hex('#6a6a76')); }
};

// ── 4 · el rincón de la tienda: pasan los años ──
const fondoRincon = () => {
  llena(0, 0, 319, 14, rp('#c8c4b8', '#d8d4c8'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.3);
  // la pared de azulejos crema
  llena(0, 15, 319, 150, rp('#c8bea4', '#d8ceb4', '#e6dcc4', '#f0e8d4'), (x, y) => 2.2 + ((x % 12 === 0 || (y - 15) % 12 === 0) ? -1.2 : 0) + (hh(x >> 2, y >> 2, 2) - 0.5) * 0.4);
  // la estantería (x 36–244, y 24–150): fondo perforado, laterales y cuatro baldas
  for (let y = 24; y <= 150; y++) for (let x = 40; x <= 240; x++) R.pset(x, y, (x % 4 === 0 && y % 4 === 0) ? hex('#6a6e7a') : hex('#a8acb8'));
  R.rect(36, 22, 40, 152, hex('#5a5e6a')); R.rect(240, 22, 244, 152, hex('#5a5e6a')); R.rect(36, 20, 244, 23, hex('#7a7e8a'));
  for (const y of [57, 87, 117, 147]) { R.rect(40, y, 240, y + 3, hex('#9a9eaa')); R.rect(40, y, 240, y, hex('#e8ecf4')); R.rect(40, y + 3, 240, y + 3, hex('#4a4e5a')); for (let x = 46; x < 236; x += 30) R.rect(x, y + 1, x + 9, y + 2, hex('#f6f2e0')); }
  // el suelo de linóleo
  linoleo(0, 151, 319, 179, hex('#d0c8b4'), hex('#a89e88'), 5);
  // la ventana (x 258–312, y 52–108) y el calendario de pared debajo (x 262–308, y 116–146)
  caja(256, 50, 314, 110, hex('#e8e4dc')); caja(260, 114, 310, 148, hex('#f6f2e6')); R.rect(261, 115, 309, 122, hex('#c83030'));
};
const p4 = (t) => {
  capa('gra-rincon', fondoRincon);
  // por la ventana pasan días y noches (los años)
  const ano = lin(t, P4 + 0.2, @g(16.07)), dia = (t - P4) * 2.2;
  R.recorte([258, 52, 312, 108]);
  { const luzD = 0.5 + 0.5 * Math.sin(dia * Math.PI * 2); llena(258, 52, 312, 108, rp('#0a1030', '#2a3a6a', '#5a8ad0', '#9ac4f0'), (x, y) => luzD * 3.2 - (y - 52) / 40 + (hh(x, y, 4) - 0.5) * 0.4);
    const a = dia * Math.PI * 2, sx = Math.round(285 - Math.cos(a) * 30), sy = Math.round(100 - Math.sin(a) * 40); if (Math.sin(a) > 0) R.disco(sx, sy, 5, hex('#fff2a0')); else R.disco(Math.round(285 + Math.cos(a) * 30), Math.round(100 + Math.sin(a) * 40), 4, hex('#e8e8d8'));
    for (let x = 258; x <= 312; x++) for (let y = 96; y <= 108; y++) R.pset(x, y, mez(hex('#3a6a3a'), K0, 0.6 - luzD * 0.5)); }
  R.recorte(null);
  R.rect(284, 52, 285, 108, hex('#e8e4dc')); R.rect(258, 79, 312, 80, hex('#e8e4dc'));
  // el calendario de pared: los años (86 → 02)
  { const yy = 1985 + Math.round(ano * 17); R.numero(String(yy % 100).padStart(2, '0'), 285, 142, { color: K0, tam: 16, centro: true }); }
  // los tubos del techo, que parpadean más con los años
  fluo(60, 4, 50, Math.sin(t * 30) > -0.9 + ano * 0.6 ? 1 : 0); fluo(170, 4, 50, 1);
  // la balda de la de siempre (arriba y en medio) se llena con los años
  const llenas = Math.round(lerp(8, 15, ano));
  for (let k = 0; k < 15; k++) if (k < llenas) lataV(50 + k * 13, 57);
  for (let k = 0; k < 7; k++) lataV(50 + k * 13, 87);
  for (let k = 0; k < 15; k++) if (k < 8 || ano > 0.5) PZ.cajaLatas(R, 56 + k * 29 % 200, 117, { color: 'rojo' });
  // las latas de la nueva: de la balda de los ojos (y 87) a la de abajo en «hidden away»; con un «2» en «new name»
  const hid = @g(13.35), nm = @g(14.97), dis = @g(16.07);
  const baja = sm(lin(t, hid - 0.2, hid + 0.5)), quedan = t < dis ? (t < @g(14.35) ? 6 : t < nm ? 4 : 2) : 0;
  for (let k = 0; k < quedan; k++) { const x0 = 150 + k * 13, x1 = 206 + k * 13, x = Math.round(lerp(x0, x1, baja)), y = Math.round(lerp(87, 147, baja));
    lataN(x, y); if (t > nm + k * 0.25) { R.disco(x, y - 9, 4, K0); R.disco(x, y - 9, 3, hex('#ffffff')); R.numero('2', x + 1, y - 6, { color: hex('#c82020'), centro: true }); } }
  // la caja de cartón que las tapa (desde «even»)
  if (t > @g(14.35)) PZ.cajaLatas(R, 186, 147, { color: 'rojo' });
  // la telaraña y el polvo cuando ya no queda ninguna
  if (t > dis) { const u = lin(t, dis, dis + 0.6); for (let k = 0; k < 5; k++) R.linea(240, 124, Math.round(240 - Math.cos(k * 0.35) * 20 * u), Math.round(124 + Math.sin(k * 0.35) * 22 * u), hex('#e8e8ee')); for (const r of [8, 14]) if (u > r / 20) for (let k = 0; k < 4; k++) R.linea(Math.round(240 - Math.cos(k * 0.35) * r), Math.round(124 + Math.sin(k * 0.35) * r), Math.round(240 - Math.cos((k + 1) * 0.35) * r), Math.round(124 + Math.sin((k + 1) * 0.35) * r), hex('#d8d8e0'));
    if (u < 1) for (let k = 0; k < 8; k++) R.pset(Math.round(222 + Math.cos(k) * (6 + u * 10)), Math.round(140 + Math.sin(k) * (3 + u * 5)), hex('#c8c0b0')); }
  // el gato de la tienda dormido encima de la estantería (mueve la cola)
  { const cx = 70, cy = 17; R.disco(cx, cy, 4, hex('#3a3a3a')); R.disco(cx + 5, cy - 1, 3, hex('#3a3a3a')); R.pset(cx + 4, cy - 4, hex('#3a3a3a')); R.pset(cx + 7, cy - 4, hex('#3a3a3a')); R.linea(cx - 4, cy + 2, cx - 9, cy + 2 + Math.round(Math.sin(t * 3) * 3), hex('#3a3a3a')); }
  // el reponedor: baja las latas, les pega el «2» y en «disappeared» se lleva la última
  const fase = t < hid + 0.6 ? 0 : t < nm - 0.3 ? 1 : t < dis ? 2 : 3, vete = lin(t, dis + 0.1, P5 - 0.1);
  const x = fase === 3 ? Math.round(lerp(196, 330, vete)) : fase === 0 ? 154 : 196;
  const mano = fase === 0 ? [x + 15, t < hid ? 84 : Math.round(lerp(84, 140, baja))] : fase === 2 ? [x + 15, 138] : fase === 3 ? [x + 15, 150] : undefined;
  const a = R.actor(NC.voluntario, x, 172, t, { dir: 1, anda: fase === 3 && vete > 0 && vete < 1, sostiene: mano, dedo: fase === 1 && Math.sin(t * 4) > 0, sonrisa: fase !== 1, pal: { C: '#3a7a4a', c: '#2a5a36' } });
  if (fase === 3) lataN(a.mano[0] + 1, a.mano[1] + 5);
};

// ── 5 · la tienda de 2019: la nevera ──
const fondoNevera = () => {
  llena(0, 0, 319, 14, rp('#2a2c34', '#34363e'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.3);
  for (const x of [30, 130]) { R.rect(x, 6, x + 40, 9, hex('#f6fbff')); R.rect(x, 10, x + 40, 10, hex('#c8d8e8')); }
  // la pared gris oscuro y las cuatro puertas de cristal de las neveras (x 8–264, y 18–150)
  llena(0, 15, 319, 152, rp('#2a2e38', '#343844', '#3e4250'), (x, y) => 1.2 + (hh(x, y, 2) - 0.5) * 0.4);
  // el expositor de patatas de la derecha (x 270–318, y 60–150)
  caja(270, 60, 318, 150, hex('#c8c8d0')); for (const y of [80, 104, 128]) R.rect(271, y, 317, y + 2, hex('#8a8a96'));
  for (const [y0, k0] of [[64, 0], [88, 1], [112, 2], [134, 3]]) for (let k = 0; k < 4; k++) { const c = hex(['#e8c040', '#3ac85a', '#e85a3a', '#5a8ae8', '#c83ac8'][(k + k0) % 5]); caja(273 + k * 11, y0, 282 + k * 11, y0 + 14, c); R.rect(275 + k * 11, y0 + 4, 280 + k * 11, y0 + 8, mez(c, 0xffffffff, 0.4)); }
  // el suelo brillante de baldosas grandes
  for (let y = 153; y <= 179; y++) for (let x = 0; x <= 319; x++) { const f = (y - 153) / 26, j = (Math.floor((x - 160) / (20 + f * 30) + 100) + Math.floor((y - 153) / (4 + f * 6))) % 2; R.pset(x, y, j ? hex('#d8dce4') : hex('#c8ccd4')); }
};
const NEVERA = [8, 72, 136, 200];
const contenido = (x0, t, k) => { // el interior de una nevera: baldas con botellas y latas de colores (sin marcas)
  const cols = ['#e8c040', '#3ac85a', '#e85a3a', '#5a8ae8', '#f0f0f0', '#c83ac8', '#3a3a3a', '#f08a3a'];
  for (let y = 20; y <= 148; y++) for (let x = x0 + 3; x <= x0 + 59; x++) R.pset(x, y, mez(hex('#d8e8f0'), hex('#9ab0c0'), (y - 20) / 140));
  for (const y of [48, 76, 104, 132]) { R.rect(x0 + 3, y, x0 + 59, y + 1, hex('#e8eef4')); for (let i = 0; i < 7; i++) { const c = hex(cols[(i + y + k) % 8]), x = x0 + 7 + i * 8;
    if (k === 1 && y === 76) continue; if ((i + y) % 3) { caja(x - 2, y - 15, x + 3, y, c); R.rect(x - 1, y - 18, x + 2, y - 15, c); R.rect(x, y - 19, x + 1, y - 19, K0); R.rect(x - 1, y - 10, x + 2, y - 7, mez(c, 0xffffffff, 0.5)); }
      else { caja(x - 3, y - 10, x + 3, y, c); R.rect(x - 2, y - 9, x + 2, y - 9, hex('#c8c8d0')); } } } };
const p5 = (t) => {
  capa('gra-nevera', fondoNevera);
  // el interior de las neveras y su luz de led
  NEVERA.forEach((x0, k) => contenido(x0, t, k));
  // en «2019» aparecen las latas de la nueva en la balda de la puerta 2
  const ap = @g(17.36), ab = @g(18.32), coge = @g(18.9), cierra = @g(19.3), wk = @g(20.16), sem = @g(19.16);
  const n = Math.min(6, Math.max(0, Math.floor((t - ap) * 10)));
  if (n > 0) { caja(76, 56, 132, 77, hex('#c82020')); R.rect(77, 57, 131, 58, hex('#e85a4a')); for (let k = 0; k < 5; k++) R.pset(80 + k * 12, 60, hex('#f6d040')); }
  for (let k = 0; k < 6; k++) if (k < n && !(k === 2 && t > coge)) lataN(81 + k * 9, 76, 0.9);
  if (t > ap && t < ap + 0.8) for (let k = 0; k < 3; k++) flash(84 + k * 18, 60, Math.round(4 * (1 - lin(t, ap, ap + 0.8))));
  // los cristales, los marcos y los tiradores (la puerta 2 se abre hacia fuera)
  const abre = sm(lin(t, ab - 0.15, ab + 0.2)) * (1 - sm(lin(t, cierra, cierra + 0.3)));
  NEVERA.forEach((x0, k) => { const ancho = k === 1 ? Math.round(62 * (1 - abre * 0.7)) : 62;
    for (let y = 18; y <= 150; y++) for (let x = x0; x <= x0 + ancho; x++) { const borde = x - x0 < 2 || x0 + ancho - x < 2 || y < 20 || y > 148; if (borde) R.pset(x, y, hex('#5a5e6a')); else if ((x - y * 0.6 + k * 30) % 40 < 3) R.pset(x, y, mez(R.pget(x, y), 0xffffffff, 0.35)); }
    R.rect(x0 + ancho - 6, 70, x0 + ancho - 4, 110, hex('#c8ccd4')); R.rect(x0 + 2, 18, x0 + 3, 150, hex('#f6fbff')); });
  // el calendario de semanas pegado en el cristal: se tachan tres en «few weeks»
  caja(98, 26, 126, 44, hex('#f6f2e6')); R.rect(99, 27, 125, 30, hex('#c83030'));
  for (let k = 0; k < 4; k++) { R.rect(102, 32 + k * 3, 122, 32 + k * 3, hex('#c8c4b8')); if (k < 3 && t > sem + k * 0.18) R.icono('X', 108 + (k % 2) * 6, 31 + k * 3, hex('#c82020'), hex('#c82020')); }
  // el vaho frío que sale al abrir
  if (abre > 0.1) for (let k = 0; k < 10; k++) { const u = ((t - ab) * 0.8 + k / 10) % 1, x = Math.round(118 + u * 24 + Math.sin(k + t * 2) * 4), y = Math.round(70 + k * 6 + Math.sin(u * 6) * 3); luz(x, y, 5, hex('#eef6ff'), 0.4 * (1 - u)); }
  // el otro cliente al fondo, con el móvil encendido
  { const x = 238; R.actor(NC.cientifica, x, 166, t, { dir: -1, sostiene: [x - 2, 146], pal: { C: '#5a3a7a', c: '#46305e' } }); R.rect(x - 4, 141, x, 147, K0); R.rect(x - 3, 142, x - 1, 146, hex('#9ae8ff')); luz(x - 2, 140, 8, hex('#9ae8ff'), 0.4); }
  // el chico llega, abre, coge la lata y guiña un ojo con ella en alto
  const u = sm(lin(t, P5 + 0.2, ab - 0.2)), x = Math.round(lerp(330, 118, u)), tiene = t > coge;
  const mano = t > ab - 0.2 && t < coge ? [x + 2, 92] : tiene ? (t > wk - 0.3 ? [x + 15, 132] : [x + 15, 148]) : undefined;
  const a = R.actor(NC.estudiante, x, 170, t, { dir: t > cierra + 0.2 ? 1 : -1, anda: u > 0 && u < 1, sostiene: mano, sonrisa: tiene, pal: { C: '#3a6aa8', c: '#2a4a7a' } });
  if (tiene) lataN(a.mano[0] + 1, a.mano[1] + 6); if (t > wk && t < wk + 1.1) { guino(x, a.cabeza[1], 1); R.icono('!', x + 18, a.cabeza[1] - 8, hex('#f6d040'), K0); }
};

// ── 6 · el salón de 2019 ──
const fondoSalon19 = () => {
  llena(0, 0, 319, 14, rp('#0e0c18', '#14121e'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.3);
  // la pared añil con la tira de led del techo (hasta x 270) y su resplandor
  llena(0, 15, 319, 150, rp('#1a1a34', '#22224a', '#2a2a5a', '#34346a'), (x, y) => 1.4 + (x % 30 < 1 ? -0.6 : 0) + (hh(x, y, 2) - 0.5) * 0.5);
  for (let x = 0; x <= 270; x++) { R.pset(x, 15, hex('#ff6ad8')); for (let j = 1; j < 10; j++) R.pset(x, 15 + j, mez(R.pget(x, 15 + j), hex('#ff6ad8'), 0.35 * (1 - j / 10))); }
  // la ventana (x 10–92, y 26–104) con su marco
  caja(8, 24, 94, 106, hex('#4a4a6a'));
  // el mueble bajo de la tele, el altavoz y la planta alta (x 250–316, por debajo de la esquina de Atom)
  caja(110, 102, 246, 116, hex('#5a4a3a')); R.rect(112, 104, 244, 105, hex('#7a6a54')); caja(258, 70, 284, 116, hex('#2a2a32')); R.disco(271, 84, 7, hex('#3a3a44')); R.disco(271, 84, 3, hex('#1a1a20')); R.disco(271, 104, 5, hex('#3a3a44'));
  // el suelo de madera clara
  tablas(0, 151, 319, 179, rp('#4a3a30', '#6a5444', '#7a6450', '#8a745c'), 7, 6);
};
const p6 = (t) => {
  capa('gra-salon19', fondoSalon19);
  // la ventana: la ciudad de noche, la luna y el gato en el alféizar
  R.recorte([10, 26, 92, 104]);
  llena(10, 26, 92, 104, rp('#080a1c', '#10142e', '#1a2244'), (x, y) => 0.4 + (y - 26) / 32 + (hh(x, y, 3) - 0.5) * 0.4);
  R.disco(76, 38, 5, hex('#e8e4c8'));
  for (let k = 0; k < 7; k++) { const x = 10 + k * 12, h = 20 + Math.floor(hh(k, 6) * 36); rc(x, 104 - h, x + 9, 104, hex('#0e1424')); for (let j = 106 - h; j < 102; j += 3) for (let i = x + 2; i < x + 9; i += 2) if (hh(i, j, k) > 0.55 !== (Math.sin(t + i * j) > 0.97)) R.pset(i, j, hex('#e8c870')); }
  { const ax = Math.round(100 - ((t * 10) % 110)); R.pset(ax, 46, Math.floor(t * 3) % 2 ? hex('#ff3a2a') : hex('#ffffff')); }
  R.recorte(null);
  R.rect(50, 26, 51, 104, hex('#4a4a6a')); R.rect(8, 104, 94, 108, hex('#6a6a8a'));
  { const cx = 24, cy = 101; R.disco(cx, cy, 4, hex('#c8c8d0')); R.disco(cx + 5, cy - 2, 3, hex('#c8c8d0')); R.pset(cx + 4, cy - 5, hex('#c8c8d0')); R.pset(cx + 7, cy - 5, hex('#c8c8d0')); R.linea(cx - 4, cy + 2, cx - 8, cy - 2 + Math.round(Math.sin(t * 2.5) * 2), hex('#c8c8d0')); }
  // la tele plana (x 116–240, y 30–96): un atardecer de neón con la rejilla que corre y «1985»
  caja(114, 28, 242, 98, hex('#0a0a0e'));
  R.recorte([117, 31, 239, 95]);
  llena(117, 31, 239, 70, rp('#2a0a4a', '#5a1a6a', '#a02a7a', '#e04a7a', '#f8904a'), (x, y) => (y - 31) / 39 * 4.4 + (hh(x, y, 4) - 0.5) * 0.4);
  for (let j = -14; j <= 0; j++) for (let i = -14; i <= 14; i++) if (Math.hypot(i, j) <= 14 && !((j + 14) % 4 === 3 && j > -9)) R.pset(178 + i, 70 + j, R.tone(rp('#f8904a', '#f8c04a', '#fff080'), 2 + j / 7, 178 + i, 70 + j));
  rc(117, 70, 239, 95, hex('#140828'));
  for (let k = 0; k < 6; k++) { const y = Math.round(70 + Math.pow((k + (t * 1.5) % 1) / 6, 2) * 25); rc(117, y, 239, y, hex('#ff3ac8')); }
  for (let k = -8; k <= 8; k++) R.linea(178 + k * 3, 70, 178 + k * 16, 95, hex('#ff3ac8'));
  const brillo = t > @g(22.24) ? 1 : 0.6 + 0.4 * Math.sin(t * 9);
  R.numero('1985', 178, 60, { color: mez(hex('#3a1a5a'), hex('#5af0ff'), brillo), tam: 16, centro: true });
  R.recorte(null);
  luz(178, 64, 110, hex('#c84ad8'), 0.12);
  // los dos amigos sentados en el sofá (asoman por encima del respaldo)
  const set = @g(21.72), y85 = @g(22.24), cel = y85 + 0.5;
  { const x = 120, abre = t > set, bebe = t > cel + 1.2; const a = R.actor(NC.estudiante, x, 146, t, { dir: 1, sostiene: bebe ? [x + 13, 124] : [x + 15, 134], sonrisa: abre, brazos: t > cel && t < cel + 1.0, pal: { C: '#3a6aa8', c: '#2a4a7a' } });
    if (!(t > cel && t < cel + 1.0)) lataN(a.mano[0] + 1, a.mano[1] + 6, 1, { abierta: abre, espuma: abre && t < set + 0.5 ? 0.35 : 0, t }); }
  { const x = 158; R.actor(NC.voluntario, x, 146, t, { dir: -1, dedo: t > y85 && t < cel, brazos: t > cel && t < cel + 1.0, sonrisa: t > y85, habla: t > cel + 1.0 && Math.sin(t * 8) > 0, pal: { C: '#c84a3a', c: '#a03a2a' } }); }
  // el sofá gris (respaldo en y 128) y la mesa baja con las palomitas, el móvil y el mando
  caja(70, 136, 250, 146, hex('#5a5e6a')); R.rect(72, 138, 248, 139, hex('#7a7e8a')); caja(64, 140, 80, 164, hex('#4a4e5a')); caja(240, 140, 256, 164, hex('#4a4e5a'));
  caja(76, 146, 244, 164, hex('#5a5e6a')); R.rect(78, 148, 242, 150, hex('#6a6e7a')); R.rect(159, 147, 160, 163, hex('#4a4e5a'));
  for (const [x, c] of [[90, '#c84a8a'], [228, '#4ac8c8']]) { caja(x - 7, 130, x + 7, 142, hex(c)); R.pset(x - 3, 133, mez(hex(c), 0xffffffff, 0.4)); }
  luz(160, 140, 80, hex('#c84ad8'), 0.1);
  caja(96, 170, 228, 176, hex('#c8a878')); R.rect(98, 176, 100, 179, hex('#8a7050')); R.rect(224, 176, 226, 179, hex('#8a7050'));
  R.poligono([[118, 164], [140, 164], [136, 171], [122, 171]], hex('#c83a3a')); for (let k = 0; k < 9; k++) R.disco(121 + k * 2, 163 - (k % 3), 1, hex('#fff6d8'));
  caja(170, 166, 182, 170, hex('#1a1a20')); R.rect(171, 167, 181, 169, Math.sin(t * 2) > 0 ? hex('#5ac8ff') : hex('#3a8ac8')); caja(196, 166, 212, 169, hex('#2a2a32'));
};

const año = (t) => t < @g(10.43) ? 1985 : t < P4 ? Math.round(1985 + 5 * lin(t, @g(10.43), P4 - 0.3)) : t < P5 ? Math.round(1990 + 12 * lin(t, P4 + 0.2, @g(16.07))) : 2019;
const efectos = [[0.15, 'ring'], [@g(0.9), 'ring'], [@g(1.66), 'ring'], [@g(3.08), 'brillo'], [@g(4.6), 'carro'], [@g(5.55), 'pop'], [@g(7.51), 'brillo'], [@g(8.65), 'bip'], [@g(9.53), 'campana'], [@g(11.93), 'tic'],
  [@g(13.4), 'toc'], [@g(14.97), 'sello'], [@g(16.07), 'whoosh'], [@g(17.36), 'brillo'], [@g(18.32), 'puerta'], [@g(20.16), 'pop'], [@g(21.72), 'pop'], [@g(22.6), 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
'''))
