E = {}

# Lo común a las tres escenas del grupo 5 (se antepone a cada cuerpo): el reparto, el búfer de las capas fijas, las texturas
# y las piezas pequeñas que se pintan en la escena (globo, confeti, coche de los ochenta, tubo fluorescente, bocadillo de
# pensar, gente diminuta del fondo, periódico de rayas, linóleo).
COMUN = r'''
import { ELENCO_NC as NC } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_NC;
const K0 = hex('#1a1420');
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
// tablas horizontales con veta, juntas y algún nudo
const tablas = (x0, y0, x1, y1, ramp, alto = 6, k = 0, l = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto === alto - 1;
  for (let x = x0; x <= x1; x++) { const largo = 40 + Math.floor(hh(fila, 3, k) * 40), jx = (x + Math.floor(hh(fila, 7, k) * 60)) % largo === 0;
    if (jy || jx) { R.pset(x, y, ramp[0]); continue; }
    const veta = Math.sin(x * 0.11 + fila * 2.7 + Math.sin(x * 0.03 + fila) * 2 + ((y - y0) % alto) * 0.8) * 0.45;
    const nudo = Math.hypot(((x * 7 + fila * 31) % 97) - 48, (((y - y0) % alto) - alto / 2) * 3) < 3 ? -0.9 : 0;
    R.pset(x, y, R.tone(ramp, 1.6 + veta + nudo + (hh(fila, 1, k) - 0.5) * 0.6 + l, x, y)); } } };
// nube de tres tonos (sombra abajo, luz arriba); ok(x, y) recorta
const nube = (cx, cy, w, T3, ok = null) => { const bs = [[0, -w * 0.13, w * 0.24], [-w * 0.27, 0, w * 0.19], [w * 0.27, 0, w * 0.2], [-w * 0.06, 0.02 * w, w * 0.26]];
  const x0 = Math.floor(cx - w * 0.5), x1 = Math.ceil(cx + w * 0.5), y0 = Math.floor(cy - w * 0.4), y1 = Math.ceil(cy + w * 0.12);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let d = 9; for (const [dx, dy, r] of bs) { const q = Math.hypot(x + 0.5 - cx - dx, (y + 0.5 - cy - dy) * 1.35) / r; if (q < d) d = q; }
    if (d > 1 || (ok && !ok(x, y))) continue; R.pset(x, y, R.tone(T3, 2.7 - (y - y0) / Math.max(1, y1 - y0) * 2.4 - (d > 0.82 ? 0.5 : 0), x, y)); } };
// pájaros que cruzan aleteando
const pajaros = (t, y, c, n = 3, v = 14, x1 = 260) => { for (let k = 0; k < n; k++) { const x = Math.round(((t * v + k * 23 + k * k * 9) % (x1 + 20)) - 10), yy = Math.round(y + k * 5 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k * 2) > 0;
  if (x < 0 || x > x1) continue; R.pset(x, yy, c); R.pset(x - 1, yy - (a ? 1 : 0), c); R.pset(x + 1, yy - (a ? 1 : 0), c); R.pset(x - 2, yy - (a ? 2 : -1), c); R.pset(x + 2, yy - (a ? 2 : -1), c); } };
// un globo de fiesta (6 × 8) en (x, y) = el centro, con su brillo, el nudo y el cordel que ondea hasta (ax, ay)
const globo = (x, y, col, t, k = 0, ax = null, ay = null) => { x = Math.round(x); y = Math.round(y);
  const [c0, c1, c2] = col;
  if (ax != null) { const n = Math.max(2, Math.round(Math.hypot(ax - x, ay - y - 5))); for (let i = 0; i <= n; i++) { const u = i / n; R.pset(Math.round(x + (ax - x) * u + Math.sin(u * 7 + t * 4 + k) * 1.2 * (1 - u)), Math.round(y + 5 + (ay - y - 5) * u), hex('#d8d8e0')); } }
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const q = (i / 3.6) ** 2 + ((j + 0.4) / 4.4) ** 2; if (q > 1.15) continue; R.pset(x + i, y + j, q > 0.86 ? K0 : i + j < -3 ? c2 : i > 1 || j > 2 ? c0 : c1); }
  R.pset(x - 2, y - 2, hex('#ffffff')); R.pset(x - 1, y - 3, hex('#ffffff')); R.pset(x, y + 4, c0); R.pset(x - 1, y + 5, K0); R.pset(x, y + 5, c0); R.pset(x + 1, y + 5, K0); };
const AZG = rp('#22489a', '#3a6ad8', '#9ac0ff'), PLG = rp('#7a7e90', '#c8ccd8', '#ffffff'), ROG = rp('#a02828', '#d84040', '#ff9a8a');
// confeti que cae y gira (desde t0), en la franja x0–x1
const confeti = (t, t0, n, x0, x1, y1 = 180, k = 0) => { if (t < t0) return; const u = t - t0, cols = rp('#3a6ad8', '#f0c040', '#e8e8f0', '#5ac0e8', '#e85a8a');
  for (let i = 0; i < n; i++) { const vy = 26 + hh(i, 1, k) * 30, y = Math.round(-6 + u * vy + hh(i, 2, k) * 40 - 40 * (1 - Math.min(1, u * 2)) * hh(i, 5, k)); if (y > y1 || y < 0) continue;
    const x = Math.round(x0 + hh(i, 3, k) * (x1 - x0) + Math.sin(u * 3 + i) * 5), g = Math.floor(u * 8 + i) % 3, c = cols[i % 5];
    R.pset(x, y, c); if (g === 0) R.pset(x + 1, y, c); else if (g === 1) R.pset(x, y + 1, c); } };
// coche de los ochenta (36 × 13): x el borde de atrás si dir 1; y el suelo; col [oscuro, medio, claro]
const coche = (x, y, col, dir, t, gira = true) => { x = Math.round(x); y = Math.round(y); const X = (i) => dir > 0 ? x + i : x + 35 - i;
  const [c0, c1, c2] = col, cri = hex('#9ac8e0'), crS = hex('#5a7a9a'), cro = hex('#e8e8f0');
  for (let i = 0; i < 36; i++) { for (let j = 0; j < 7; j++) { const yy = y - 4 - j, borde = i === 0 || i === 35 || j === 6; R.pset(X(i), yy, borde ? K0 : j === 5 ? c2 : j < 2 ? c0 : c1); } }
  for (let i = 8; i < 28; i++) for (let j = 0; j < 6; j++) { const yy = y - 11 - j, sl = i - 8 < 5 - j || 27 - i < 5 - j; if (sl) continue; const borde = j === 5 || i - 8 === 5 - j || 27 - i === 5 - j;
    R.pset(X(i), yy, borde ? K0 : (i === 17 || i === 18) ? c1 : j > 3 ? crS : cri); }
  for (let i = 0; i < 36; i++) R.pset(X(i), y - 6, i % 9 === 0 ? c0 : cro);
  R.pset(X(34), y - 8, hex('#fff2a0')); R.pset(X(1), y - 8, hex('#e83a3a'));
  for (const wx of [7, 28]) { const cx = X(wx); R.disco(cx, y - 3, 3, K0); R.disco(cx, y - 3, 2, hex('#4a4a54')); R.pset(cx, y - 3, hex('#c8c8d0')); if (gira) { const a = t * 12 * dir; R.pset(Math.round(cx + Math.cos(a) * 2), Math.round(y - 3 + Math.sin(a) * 2), hex('#9a9aa4')); } } };
// tubo fluorescente del techo (w de largo); on: 1 encendido, 0 apagado
const fluo = (x, y, w, on = 1) => { R.rect(x - 1, y - 1, x + w + 1, y + 3, hex('#5a5a66')); R.rect(x, y, x + w, y + 2, on ? hex('#f6fbff') : hex('#9aa0aa')); if (on) { R.rect(x, y + 3, x + w, y + 3, hex('#c8d8e8')); } R.pset(x - 1, y - 2, K0); R.pset(x + w + 1, y - 2, K0); };
// bocadillo de pensar (w × h) con las bolitas hacia (bx, by)
const pensar = (x, y, w, h, bx, by) => { const c = hex('#f6f4ee'), s = hex('#c8c4d0');
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) { const cx = Math.min(Math.max(i, 3), w - 4), cy = Math.min(Math.max(j, 3), h - 4), d = Math.hypot(i - cx, j - cy); if (d > 4.2) continue; R.pset(x + i, y + j, d > 3.3 ? K0 : j > h - 4 ? s : c); }
  for (const [u, r] of [[0.35, 2.4], [0.7, 1.6]]) { const px = Math.round(x + w / 2 + (bx - x - w / 2) * u), py = Math.round(y + h + (by - y - h) * u); R.disco(px, py, r + 1, K0); R.disco(px, py, r, c); } };
// gente diminuta del fondo (5 × 11): ropa, pelo; anda alterna las piernas
const mini = (x, y, ropa, pelo, t, anda = false, k = 0) => { x = Math.round(x); y = Math.round(y); const piel = hex('#e8b088'), f = anda ? Math.floor(t * 6 + k) % 2 : 0;
  R.rect(x + 1, y - 11, x + 3, y - 9, piel); R.rect(x + 1, y - 12, x + 3, y - 11, pelo); R.rect(x, y - 8, x + 4, y - 4, ropa); R.pset(x + 2, y - 8, mez(ropa, 0xffffffff, 0.3));
  R.rect(x + 1, y - 3, x + 1, y - f, hex('#2a2a3a')); R.rect(x + 3, y - 3, x + 3, y - (1 - f), hex('#2a2a3a')); };
// linóleo a cuadros con su brillo
const linoleo = (x0, y0, x1, y1, a, b, kb = 0) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0), lado = 6 + f * 10;
  for (let x = x0; x <= x1; x++) { const cx = Math.floor((x - 160) / lado + 100), cy = Math.floor((y - y0) / (3 + f * 6)), c = (cx + cy) % 2 ? a : b; R.pset(x, y, hh(x, y, kb) > 0.94 ? mez(c, 0xff000000, 0.12) : c); } } };
// el periódico de rayas (sin letras) visto de frente, que sostiene alguien: (x, y) esquina de arriba a la izquierda; w el ancho
const hojaPeriodico = (x, y, w, h) => { x = Math.round(x); y = Math.round(y); w = Math.round(w);
  R.rect(x - 1, y - 1, x + w, y + h, K0); R.rect(x, y, x + w - 1, y + h - 1, hex('#efe8d6')); R.rect(x + w - 2, y, x + w - 1, y + h - 1, hex('#cfc6b0'));
  R.rect(x + 1, y + 1, x + w - 2, y + 3, hex('#1c1820'));
  for (let j = 6; j < h - 2; j += 2) { const lg = w - 4 - Math.floor(hh(j, w, 3) * 5); R.rect(x + 2, y + j, x + 2 + lg - 1, y + j, j < 10 ? hex('#3a3440') : hex('#8a8478')); }
  if (w > 12) { R.rect(x + 3, y + 11, x + 5, y + 16, hex('#c83030')); R.rect(x + w - 7, y + 11, x + w - 5, y + 16, hex('#2a5ad8')); R.rect(x + 3, y + 11, x + 5, y + 11, hex('#9a9aa4')); R.rect(x + w - 7, y + 11, x + w - 5, y + 11, hex('#9a9aa4')); } };
'''

# ───────────────────────────────────────── NC-PEPSI ─────────────────────────────────────────
E['nc-pepsi'] = ('La fiesta del rival', r'''// NC-PEPSI (frase 13, «At Pepsi, they couldn't believe it…»), sin cartela; barra en 1985. Tres planos:
// 1. «At Pepsi, they couldn't believe it. Its president ran a full-page ad in the newspapers»: la oficina del rival de
//    fiesta (anuncio 'rival'): el ejecutivo de traje azul se queda boquiabierto con el periódico y, en «full-page», lo
//    despliega y se ríe; la secretaria aplaude en «believe it», un empleado sopla el matasuegras tras la mesa y otro sale por
//    la puerta con su globo azul.
// 2. Corta en «saying»: inserto del escritorio con el periódico abierto (página entera de rayas, sin letras, con dos latas
//    pictograma: la roja con los ojos cerrados, la azul con los ojos abiertos); en «blinked» una mano con rotulador azul
//    rodea la lata roja; en «the day off» arranca la hoja del calendario de mesa (debajo, un gorro de fiesta); en
//    «celebrate» estalla el confeti, sale el matasuegras y sube un globo.
// 3. Corta en «If»: el campus de la sede del rival al mediodía (fondo local): los empleados salen con globos y gorros por
//    las puertas de cristal hacia el aparcamiento; en «changing» un coche sale y pita; en «Pepsi was winning» el ejecutivo,
//    en la escalinata, alza los brazos y suelta el ramillete de globos, que sube al cielo.
''', COMUN + r'''
const PA = (f) => en('pepsi', f);
const P2 = PA(.3402), P3 = PA(.7199);

// ── 1 · la oficina de fiesta ──
const p1 = (t) => {
  const o = { encuadre: 'rival', puerta: 1 };
  T.anuncio(R, t, o);
  const S = 150;
  // el empleado que sale con su globo hacia la puerta (detrás de los demás)
  const ve = lin(t, PA(.12), PA(.33)), xe = Math.round(lerp(196, 306, ve));
  { const a = R.actor(NC.empleadoPepsi, xe, S, t, { dir: 1, anda: ve > 0 && ve < 1, sostiene: [xe + 14, S - 22], sonrisa: true, salto: ve === 0 && t > PA(.04) && t < PA(.1) ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0 });
    globo(a.mano[0] + 2 + Math.sin(t * 2.2) * 1.5, a.mano[1] - 20 + Math.sin(t * 3) * 1.2, AZG, t, 1, a.mano[0], a.mano[1]); }
  // la secretaria de la rebeca azul: boquiabierta y luego aplaude en «believe it»
  const ap = t > PA(.045) && t < PA(.2);
  R.actor(NC.operadora, 246, S, t, { dir: -1, tocado: '', pal: { C: '#4a7ad0', c: '#30589e', H: '#3a2418', h: '#5a3a24' }, sorpresa: t < PA(.045), sonrisa: t >= PA(.045), brazos: ap && Math.floor(t * 7) % 2 === 0 });
  // el ejecutivo: boquiabierto con el periódico; en «Its president» lo levanta; en «full-page» lo despliega y se ríe
  const sube = sm(lin(t, PA(.12), PA(.16))), abre = sm(lin(t, PA(.205), PA(.24)));
  const ex = R.actor(NC.ejecutivoPepsi, 128, S, t, { dir: 1, sorpresa: t < PA(.1), sonrisa: t >= PA(.1), habla: t > PA(.25) && Math.sin(t * 15) > 0, sostiene: [146, Math.round(lerp(S - 12, S - 22, sube))] });
  { const [hx, hy] = ex.mano, w = Math.round(lerp(11, 24, abre)), h = 30; hojaPeriodico(hx - 3, hy - h + 6, w, h); R.pset(hx - 2, hy + 1, hex('#f6c290')); }
  if (t > PA(.25) && t < PA(.33)) R.bocadillo(136, S - 30, { icono: '!' });
  // el empleado de detrás de la mesa de delante: sopla el matasuegras
  { const xb = 50, a = R.actor(NC.empleadoPepsi, xb, S, t, { dir: 1, pal: { H: '#3a2418', h: '#5a3a24' }, sonrisa: true }), mx = a.cabeza[0] + 7, my = a.cabeza[1] + 9, sopla = Math.sin(t * 3.1) > 0.1;
    const L = sopla ? 9 : 3; for (let i = 0; i < L; i++) { const c = i % 2 ? hex('#3a6ad8') : hex('#f0f0f6'); R.pset(mx + i, my, c); R.pset(mx + i, my + 1, i % 2 ? hex('#22489a') : hex('#c8c8d8')); }
    if (!sopla) { R.pset(mx + 3, my - 1, hex('#3a6ad8')); R.pset(mx + 4, my, hex('#f0f0f6')); } else { R.pset(mx + 9, my - 1, hex('#f0c040')); R.pset(mx + 10, my + 2, hex('#e85a8a')); } }
  T.anuncioDelante(R, t, o);
};

// ── 2 · el escritorio con el periódico ──
const fondoMesa = () => {
  // la pared de paneles de tela azul grisácea con sus costuras, al fondo y desenfocada
  llena(0, 0, 319, 45, rp('#3e4a66', '#4a5876', '#566684', '#62738f'), (x, y) => 1.4 + Math.sin(x * 0.9 + y * 0.4) * 0.25 + (hh(x, y, 4) - 0.5) * 0.5 + (x % 46 === 0 ? -1.3 : 0) + y / 120);
  // la ventana desenfocada con la persiana (deja la barra del año tranquila)
  for (let y = 17; y <= 42; y++) for (let x = 12; x <= 96; x++) { const borde = x < 15 || x > 93 || y < 20 || y > 39;
    R.pset(x, y, borde ? hex('#c8ccd4') : (y % 4 === 0 ? hex('#a8bcd2') : R.tone(rp('#8ab4dc', '#a8c8e6', '#c8dcf0'), 1 + (y - 20) / 18 + Math.sin(x * 0.2) * 0.3, x, y))); }
  for (let y = 26; y <= 39; y++) for (let x = 60; x <= 92; x++) { const d = Math.hypot(x - 76, (y - 36) * 1.3); if (d < 14 && y % 4) R.pset(x, y, R.tone(rp('#3e6a3a', '#5a8a4a', '#7aa860'), 1.5 - d / 10 + hh(x, y) * 0.5, x, y)); }
  // la gráfica de barras azules enmarcada (desenfocada)
  R.rect(198, 12, 246, 40, hex('#c8ccd4')); R.rect(201, 15, 243, 37, hex('#eef0f2'));
  [8, 11, 15, 18, 21].forEach((v, i) => R.rect(206 + i * 7, 34 - v, 210 + i * 7, 34, hex('#4a6ab8')));
  R.rect(204, 34, 241, 34, hex('#6a6e7a'));
  // el escritorio de nogal
  tablas(0, 46, 319, 179, rp('#3a2214', '#5a3420', '#6e422a', '#865234', '#9a6440'), 10, 7);
  R.rect(0, 45, 319, 46, hex('#a87450')); R.rect(0, 47, 319, 47, hex('#2a1810'));
  // el vade de cuero verde con sus esquinas y el pespunte
  for (let y = 66; y <= 179; y++) for (let x = 54; x <= 270; x++) { const borde = x === 54 || x === 270 || y === 66, esq = (x - 54) + (y - 66) < 16 || (270 - x) + (y - 66) < 16;
    R.pset(x, y, borde ? hex('#1c2a20') : esq ? R.tone(rp('#4a2a1a', '#6a3e26', '#86522e'), 1.4 + hh(x, y, 2) * 0.6, x, y) : R.tone(rp('#1e4434', '#2a5a44', '#356a52'), 1.2 + hh(x, y, 9) * 0.7 - (x - 54) / 400, x, y)); }
  for (let x = 60; x <= 264; x += 3) R.pset(x, 70, hex('#4a7a62'));
  // el periódico abierto: página entera de rayas (sin letras) con las dos latas pictograma
  const px0 = 78, px1 = 226, py0 = 50, py1 = 179;
  R.rect(px0 + 3, py0 + 3, px1 + 3, py1, hex('#13301f'));
  for (let y = py0; y <= py1; y++) for (let x = px0; x <= px1; x++) R.pset(x, y, R.tone(rp('#cfc6b0', '#ddd5c0', '#ebe4d2', '#f4eee0'), 2.2 + (hh(x, y, 5) - 0.5) * 0.8 - (Math.abs(x - 152) < 1 ? 1.4 : 0), x, y));
  R.rect(px0, py0, px1, py0, hex('#9a9282')); R.rect(px0, py0, px0, py1, hex('#9a9282')); R.rect(px1, py0, px1, py1, hex('#8a8272'));
  // la esquina que se levanta
  for (let j = 0; j < 9; j++) for (let i = 0; i < 9 - j; i++) R.pset(px1 - i, py0 + j, i === 8 - j ? hex('#8a8272') : hex('#fbf6ea'));
  // la cabecera: barra negra y doble filete
  R.rect(88, 52, 216, 61, hex('#18141c')); for (let x = 92; x < 214; x += 5) R.rect(x, 54, x + 2, 59, hex('#2a2430'));
  R.rect(86, 64, 218, 64, hex('#3a3440')); R.rect(86, 66, 218, 66, hex('#3a3440'));
  for (let x = 88; x < 216; x += 7) R.rect(x, 68, x + 3 + Math.floor(hh(x, 1) * 3), 68, hex('#8a8478'));
  // el anuncio a toda página, con su marco
  R.rect(84, 72, 220, 179, hex('#18141c')); R.rect(86, 74, 218, 179, hex('#f2ecdc'));
  for (let y = 75; y <= 179; y++) for (let x = 87; x <= 217; x++) if (hh(x, y, 8) > 0.86) R.pset(x, y, hex('#e4dccb'));
  // el titular: tres barras gruesas centradas
  [[94, 210, 78], [104, 200, 84], [116, 188, 90]].forEach(([a, b, y]) => { R.rect(a, y, b, y + 3, hex('#18141c')); for (let x = a + 6; x < b; x += 11) R.pset(x, y + 1, hex('#3a3440')); });
  // las rayas del texto en dos columnas
  for (let y = 97; y <= 125; y += 2) { R.rect(92, y, 148 - (y % 6 === 1 ? 10 : 0), y, hex('#7a7468')); R.rect(156, y, 212 - (y % 10 === 5 ? 14 : 0), y, hex('#7a7468')); }
  R.rect(92, 127, 212, 127, hex('#3a3440'));
  // la lata roja (ojos cerrados) y la azul (ojos abiertos), a doble tamaño
  PZ.lata(R, 124, 174, { color: 'rojo', s: 2 }); PZ.lata(R, 184, 174, { color: 'azul', s: 2 });
  for (const ex of [118, 128]) { R.rect(ex - 2, 152, ex + 2, 152, hex('#1c1222')); R.pset(ex - 3, 151, hex('#1c1222')); R.pset(ex + 3, 151, hex('#1c1222')); }
  for (const ex of [178, 188]) { R.rect(ex - 2, 149, ex + 2, 153, hex('#1c1222')); R.rect(ex - 1, 150, ex + 1, 152, hex('#ffffff')); R.pset(ex + 1, 151, hex('#1c1222')); }
  R.rect(180, 159, 186, 159, hex('#1c1222')); R.pset(179, 158, hex('#1c1222')); R.pset(187, 158, hex('#1c1222'));
  // rayitas de «guiño» de la azul y gotita de la roja
  R.linea(198, 142, 202, 138, hex('#3a3440')); R.linea(199, 146, 204, 145, hex('#3a3440'));
  R.pset(134, 146, hex('#5a9ad8')); R.rect(133, 147, 135, 149, hex('#5a9ad8'));
  // a la izquierda: el bote de lápices y la taza
  for (let y = 70; y <= 98; y++) for (let x = 18; x <= 40; x++) R.pset(x, y, x === 18 || x === 40 || y === 98 ? K0 : R.tone(rp('#5a5e6a', '#8a8e9a', '#b8bcc8', '#e0e4ec'), 2.4 - Math.abs(x - 25) / 6, x, y));
  for (const [x, c, h] of [[22, '#f0c030', 62], [27, '#3a6ad8', 58], [32, '#f0c030', 64], [36, '#d84a4a', 60]]) { R.rect(x, h, x + 2, 70, hex(c)); R.rect(x, h - 2, x + 2, h - 1, hex('#e88aa0')); R.pset(x + 1, h - 3, K0); }
  R.disco(28, 122, 13, K0); R.rect(14, 112, 40, 134, K0); R.rect(15, 112, 39, 133, hex('#eef0f2')); R.rect(15, 120, 39, 123, hex('#3a6ad8')); R.rect(15, 112, 39, 114, hex('#4a2414')); R.rect(16, 112, 38, 112, hex('#7a4a2a'));
  R.rect(40, 116, 44, 128, K0); R.rect(41, 118, 42, 126, hex('#eef0f2')); R.rect(30, 126, 38, 131, hex('#c8ccd4'));
  // a la derecha: la grapadora y el montón de papeles con su clip
  R.rect(272, 96, 308, 106, K0); R.rect(273, 97, 307, 100, hex('#5a5e6a')); R.rect(273, 101, 307, 105, hex('#3a3e4a')); R.rect(274, 97, 300, 97, hex('#9a9eaa'));
  for (let k = 0; k < 5; k++) { R.rect(272 + k, 132 - k * 2, 314 - k, 176 - k * 2, K0); R.rect(273 + k, 133 - k * 2, 313 - k, 175 - k * 2, k % 2 ? hex('#e8e4da') : hex('#f4f0e6')); }
  for (let y = 128; y < 160; y += 3) R.rect(282, y, 304 - (y % 9), y, hex('#9a968c'));
  R.rect(298, 120, 300, 128, hex('#c8c8d0'));
  // el teléfono beis abajo a la izquierda
  PZ.telefono(R, 30, 176, { s: 2 });
  // la luz cálida del flexo (de arriba a la izquierda)
  luz(110, 70, 150, hex('#fff2c8'), 0.16);
};
// el calendario de mesa (x 230–266, y 96–134): la hoja del «23» se arranca hacia arriba (q 0–1) y debajo sale el gorro
const calendario = (t, q) => {
  const x0 = 230, x1 = 266, y0 = 118, y1 = 156;
  R.rect(x0 - 2, y1, x1 + 2, y1 + 4, K0); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 3, hex('#5a3a24'));
  R.rect(x0, y0, x1, y1, K0); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#f6f2ea'));
  // la hoja de debajo: el gorro de fiesta azul con lunares
  const gx = 248, gy = 150; for (let j = 0; j < 22; j++) { const w = Math.round(j * 0.45); for (let i = -w; i <= w; i++) R.pset(gx + i, gy - 22 + j, Math.abs(i) === w ? K0 : (i + j) % 5 === 0 ? hex('#f0c040') : i < 0 ? hex('#5a8ae8') : hex('#3a6ad8')); }
  R.disco(gx, gy - 23, 2, hex('#f0c040')); R.rect(gx - 11, gy, gx + 11, gy + 1, K0);
  for (let k = 0; k < 4; k++) { const a = t * 3 + k * 1.6; R.pset(Math.round(gx + Math.cos(a) * 14), Math.round(gy - 12 + Math.sin(a) * 9), hex('#f0c040')); }
  // la hoja del día, que se va
  if (q < 1) { const yb = Math.round(lerp(y1 - 1, y0 + 1, q)), lev = Math.round(q * 14);
    R.rect(x0 + 1, y0 + 1 - lev, x1 - 1, yb - lev, hex('#f6f2ea')); R.rect(x0 + 1, y0 + 1 - lev, x1 - 1, Math.min(yb - lev, y0 + 8 - lev), hex('#c83a3a'));
    R.rect(x0, yb - lev, x1, yb - lev, K0); if (yb - lev > y0 + 16) R.numero('23', x0 + 9, y0 + 26 - lev, { color: hex('#1c1222') }); }
  R.rect(x0 + 4, y0 - 2, x0 + 6, y0 + 2, hex('#9a9aa4')); R.rect(x1 - 6, y0 - 2, x1 - 4, y0 + 2, hex('#9a9aa4'));
};
const p2 = (t) => {
  capa('pep-mesa', fondoMesa);
  // el vapor de la taza y el piloto del teléfono
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1, x = Math.round(26 + k * 3 + Math.sin(u * 8 + k) * 2), y = Math.round(108 - u * 24); R.pset(x, y, mez(R.pget(x, y), 0xffffffff, 0.6 * (1 - u))); R.pset(x, y - 1, mez(R.pget(x, y - 1), 0xffffffff, 0.4 * (1 - u))); }
  if (Math.floor(t * 3) % 2) { R.rect(40, 160, 41, 161, hex('#e83a3a')); }
  // el círculo de rotulador alrededor de la lata roja, en «blinked»
  const c0 = PA(.43), c1 = PA(.5), cu = lin(t, c0, c1), cx = 124, cy = 152, rx = 22, ry = 25;
  const pt = (u) => { const a = -Math.PI * 0.6 + u * Math.PI * 2.08; return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; };
  for (let i = 0; i <= Math.round(cu * 160); i++) { const [x, y] = pt(i / 160); R.disco(Math.round(x), Math.round(y), 1, hex('#2a5ad8')); }
  // la hoja del calendario, en «the day off»
  const q = sm(lin(t, PA(.6), PA(.635)));
  calendario(t, q);
  // la mano con el rotulador: entra por abajo, rodea la lata, va al calendario, arranca la hoja y se va
  const kf = [[P2, 160, 205], [PA(.42), 132, 176], [c0, ...pt(0)], [c1, ...pt(1)], [PA(.55), 214, 170], [PA(.6), 250, 152], [PA(.635), 252, 122], [PA(.68), 300, 205]];
  if (t > P2 && t < PA(.68)) {
    let i = 0; while (i < kf.length - 2 && t > kf[i + 1][0]) i++;
    const [ta, xa, ya] = kf[i], [tb, xb, yb] = kf[i + 1];
    let px, py;
    if (t >= c0 && t <= c1) [px, py] = pt(cu); else { const u = sm(lin(t, ta, tb)); px = lerp(xa, xb, u); py = lerp(ya, yb, u); }
    const enCal = t > PA(.55);
    if (!enCal) { // el rotulador: la punta en (px, py)
      R.linea(Math.round(px), Math.round(py), Math.round(px + 8), Math.round(py + 7), K0); R.linea(Math.round(px + 1), Math.round(py), Math.round(px + 8), Math.round(py + 6), hex('#2a5ad8')); R.pset(Math.round(px), Math.round(py), hex('#1a2a6a')); }
    T.brazo(R, Math.round(px + 44), 200, Math.round(px + 10), Math.round(py + 9), '#eef0f4', -1);
  }
  // «celebrate»: el confeti, el matasuegras desde la izquierda y el globo que sube
  const ce = PA(.654);
  if (t > ce) { const u = t - ce, L = Math.round(Math.min(1, u * 5) * 26 * (0.75 + 0.25 * Math.sin(t * 6)));
    for (let i = 0; i < L; i++) { const y = 146 - Math.round(Math.sin(i * 0.18) * 2); R.rect(i, y, i, y + 2, i % 4 < 2 ? hex('#3a6ad8') : hex('#f0f0f6')); R.pset(i, y - 1, K0); R.pset(i, y + 3, K0); }
    if (L > 22) { R.pset(L, 145, hex('#f0c040')); R.pset(L + 1, 143, hex('#e85a8a')); R.pset(L + 2, 147, hex('#5ac0e8')); }
    const gy = Math.round(lerp(196, 92, sm(u / 1.4)) + Math.sin(t * 3) * 2); globo(56 + Math.sin(t * 1.7) * 3, gy, AZG, t, 2, 50, 196);
    confeti(t, ce, 80, 0, 319, 179, 3); }
};

// ── 3 · el campus de la sede del rival ──
const fondoSede = () => {
  // el cielo tramado
  llena(0, 0, 319, 80, rp('#4a86cc', '#5e98d8', '#78ace2', '#94c0ea', '#b4d4f0'), (x, y) => 0.4 + y / 22 + (hh(x, y, 1) - 0.5) * 0.4);
  // los árboles del fondo, en tres tonos
  for (let x = 0; x <= 319; x++) { const h = 8 + Math.sin(x * 0.13) * 3 + Math.sin(x * 0.41) * 2 + hh(x, 1) * 2; for (let y = Math.round(80 - h); y <= 86; y++) R.pset(x, y, R.tone(rp('#2e5a34', '#3e7040', '#548a4a', '#6ea25a'), 1.6 + (80 - y) / 6 + Math.sin(x * 0.7 + y) * 0.4, x, y)); }
  // los setos y arbustos a los lados del edificio
  for (let y = 80; y <= 118; y++) for (let x = 0; x <= 319; x++) if (x < 18 || x > 302) R.pset(x, y, R.tone(rp('#24502c', '#2e5a34', '#3e7040', '#548a4a'), 1.2 + Math.sin(x * 0.9 + y * 0.6) * 0.6 + (hh(x, y, 8) - 0.5) * 0.8 + (y - 80) / 60, x, y));
  // el edificio bajo de la sede: losa de hormigón, cintas de cristal y paneles azules, sin ningún letrero
  const bx0 = 18, bx1 = 302;
  for (let y = 58; y <= 118; y++) for (let x = bx0; x <= bx1; x++) {
    let c; const b = (y - 58);
    if (b < 4) c = R.tone(rp('#a8a49a', '#c8c4b8', '#e2ded2'), b === 0 ? 2.6 : 1.6 + hh(x, y) * 0.5, x, y);
    else if (b < 18) c = (x % 14 === 0) ? hex('#2a3448') : R.tone(rp('#2e4060', '#40587e', '#5a7aa2', '#8ab0d4'), 1 + (18 - b) / 8 + ((x + b * 2) % 37 < 4 ? 1.4 : 0), x, y);
    else if (b < 22) c = R.tone(rp('#a8a49a', '#c8c4b8', '#e2ded2'), 1.6 + hh(x, y) * 0.5, x, y);
    else if (b < 36) c = (x % 14 === 0) ? hex('#2a3448') : R.tone(rp('#2e4060', '#40587e', '#5a7aa2', '#8ab0d4'), 0.8 + (36 - b) / 9 + ((x + b * 2) % 41 < 4 ? 1.4 : 0), x, y);
    else if (b < 40) c = R.tone(rp('#2a4a8a', '#3a62a8', '#5a82c8'), 1.4 + hh(x, y) * 0.4, x, y);
    else c = (x % 14 === 0) ? hex('#2a3448') : R.tone(rp('#2a3a58', '#384c70', '#4e6a92', '#7a9cc4'), 0.6 + (60 - b) / 12 + ((x + b) % 47 < 3 ? 1.2 : 0), x, y);
    R.pset(x, y, c); }
  R.rect(bx0 - 1, 57, bx1 + 1, 57, K0); R.rect(bx0 - 1, 57, bx0 - 1, 118, K0); R.rect(bx1 + 1, 57, bx1 + 1, 118, K0);
  // las oficinas de dentro: gente diminuta tras el cristal de la planta alta
  for (let k = 0; k < 9; k++) { const x = 30 + k * 31 + Math.floor(hh(k, 2) * 10); R.rect(x, 86, x + 2, 88, hex('#e8b088')); R.rect(x - 1, 89, x + 3, 93, k % 2 ? hex('#eef0f4') : hex('#3a5aa8')); }
  // la marquesina y las puertas de cristal del centro
  R.rect(130, 94, 190, 97, hex('#e2ded2')); R.rect(130, 98, 190, 98, K0);
  for (let y = 99; y <= 118; y++) for (let x = 138; x <= 182; x++) R.pset(x, y, (x - 138) % 11 === 0 ? hex('#c8ccd4') : R.tone(rp('#1e2a40', '#2e4060', '#4a6488', '#9ab8d8'), 1 + (x + y) % 13 / 5, x, y));
  // la escalinata
  for (let k = 0; k < 4; k++) { R.rect(124 - k * 6, 119 + k * 2, 196 + k * 6, 120 + k * 2, k % 2 ? hex('#c8c4b8') : hex('#e2ded2')); R.rect(124 - k * 6, 121 + k * 2, 196 + k * 6, 121 + k * 2, hex('#8a867c')); }
  // el césped con franjas de corte y los caminos
  llena(0, 119, 319, 150, rp('#3e7a34', '#4e8e3e', '#62a24a', '#7ab45a'), (x, y) => 1.4 + (Math.floor((x + y * 2) / 18) % 2 ? 0.5 : -0.2) + (hh(x, y, 6) - 0.5) * 0.9);
  for (let y = 127; y <= 150; y++) { const w = 6 + (y - 127) * 0.8; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) R.pset(x, y, R.tone(rp('#a8a090', '#c8c0ae', '#ded6c4'), 1.4 + hh(x, y, 3) * 0.6, x, y)); }
  for (let x = 0; x <= 319; x++) for (let y = 144; y <= 150; y++) R.pset(x, y, R.tone(rp('#a8a090', '#c8c0ae', '#ded6c4'), 1.3 + hh(x, y, 4) * 0.7, x, y));
  // la escultura de bronce (un arco abstracto) y el cubo blanco
  for (let a = 0; a <= 60; a++) { const ang = Math.PI * a / 60, x = Math.round(62 + Math.cos(ang) * 16), y = Math.round(136 - Math.sin(ang) * 22); R.disco(x, y, 3, K0); }
  for (let a = 0; a <= 60; a++) { const ang = Math.PI * a / 60, x = Math.round(62 + Math.cos(ang) * 16), y = Math.round(136 - Math.sin(ang) * 22); R.disco(x, y, 2, a < 30 ? hex('#c88a3a') : hex('#8a5a24')); R.pset(x - 1, y - 1, hex('#f0c070')); }
  R.rect(40, 136, 84, 139, hex('#8a867c')); R.rect(40, 136, 84, 136, hex('#c8c4b8'));
  R.rect(232, 112, 252, 132, K0); R.rect(233, 113, 251, 131, hex('#eceae4')); R.rect(243, 113, 251, 131, hex('#c8c6c0')); R.rect(233, 113, 251, 114, hex('#ffffff'));
  // el aparcamiento de asfalto con sus rayas, manchas y el bordillo
  llena(0, 151, 319, 179, rp('#3a3a44', '#4a4a54', '#5a5a64', '#6a6a74'), (x, y) => 1.6 + (hh(x, y, 7) - 0.5) * 1.2 + (hh(Math.floor(x / 9), Math.floor(y / 5), 2) > 0.92 ? -1 : 0));
  R.rect(0, 151, 319, 152, hex('#c8c4b8')); R.rect(0, 153, 319, 153, hex('#2a2a34'));
  for (let x = 6; x < 320; x += 40) R.rect(x, 154, x + 1, 166, hex('#e8e4d8'));
  for (let x = 0; x < 320; x += 16) R.rect(x, 172, x + 8, 173, hex('#d8c040'));
  // los coches aparcados
  [[12, rp('#7a2a2a', '#a83a3a', '#d06a5a')], [92, rp('#4a5a3a', '#6a7a4a', '#9aa86a')], [214, rp('#6a6a74', '#9a9aa4', '#c8c8d0')], [254, rp('#8a6a2a', '#b88a3a', '#e0b860')]].forEach(([x, c]) => coche(x, 166, c, 1, 0, false));
  // las farolas del aparcamiento
  for (const x of [84, 244]) { R.rect(x, 118, x + 1, 152, hex('#4a4a54')); R.rect(x - 4, 116, x + 5, 118, hex('#4a4a54')); R.rect(x - 3, 119, x + 4, 119, hex('#f6f2d8')); }
};
const p3 = (t) => {
  capa('pep-sede', fondoSede);
  const u = t - P3;
  // las nubes a tres velocidades (lejos de la esquina de Atom) y los pájaros
  const ok = (x, y) => !(x > 268 && y < 48);
  for (const [k, v, y, w, T3] of [[0, 3, 18, 46, rp('#c8d4e4', '#e2eaf4', '#ffffff')], [1, 5, 34, 34, rp('#b8c8dc', '#d8e2ee', '#f4f8fc')], [2, 8, 46, 26, rp('#a8bcd2', '#cad8e8', '#eef4fa')]]) {
    for (let r = 0; r < 2; r++) { const x = ((u * v + k * 97 + r * 170 + 40) % 380) - 40; nube(x, y + r * 4, w, T3, ok); } }
  pajaros(t, 26, hex('#2a3448'), 3, 16, 250);
  // la bandera azul lisa que ondea en su mástil
  R.rect(110, 34, 111, 94, hex('#c8c8d0'));
  for (let j = 0; j < 9; j++) for (let i = 0; i < 16; i++) { const y = 35 + j + Math.round(Math.sin(i * 0.5 - t * 6) * 1.2 * i / 16); R.pset(112 + i, y, j === 0 || j === 8 ? hex('#22489a') : i % 5 === 0 ? hex('#2e58b8') : hex('#3a6ad8')); }
  // los árboles del césped que se mecen
  for (const [x, y, r, k] of [[16, 130, 13, 0], [300, 128, 12, 1], [208, 132, 9, 2]]) { const sw = Math.sin(t * 1.6 + k) * 1.5;
    R.rect(x - 1, y - 2, x + 1, y + 14, hex('#5a3a20'));
    for (const [dx, dy, rr, c] of [[0, -r * 0.6, r, '#2e6a2e'], [-r * 0.4, -r * 0.4, r * 0.7, '#3e8236'], [r * 0.3, -r * 0.8, r * 0.6, '#5aa046'], [-r * 0.2, -r, r * 0.4, '#7ab85a']]) R.disco(Math.round(x + dx + sw * (1 + dy / -r * 0.4)), Math.round(y + dy - 4), Math.round(rr), hex(c)); }
  // el estanque con su chorro
  for (let j = -3; j <= 3; j++) for (let i = -18; i <= 18; i++) if ((i / 18) ** 2 + (j / 3.4) ** 2 < 1) R.pset(276 + i, 139 + j, Math.sin(i * 0.6 + t * 4 + j) > 0.6 ? hex('#a8d8f0') : hex('#4a8ac8'));
  for (let k = 0; k < 12; k++) { const q = (t * 1.5 + k / 12) % 1, h = 18 * Math.sin(q * Math.PI), x = 276 + Math.round((k % 3 - 1) * q * 5); R.pset(x, Math.round(137 - h), hex('#e8f6ff')); }
  // la gente: el ejecutivo en la escalinata, saluda y en «winning» alza los brazos y suelta los globos
  const W = PA(.9663), suelta = t > W;
  const ex = R.actor(NC.ejecutivoPepsi, 152, 121, t, { dir: 1, sonrisa: true, brazos: suelta && t < W + 1.2, dedo: !suelta && Math.floor(t * 1.4) % 3 === 0, sostiene: suelta ? undefined : [168, 108], habla: !suelta && t > PA(.78) && Math.sin(t * 11) > 0 });
  for (let k = 0; k < 6; k++) { const up = suelta ? (t - W) * (22 + k * 4) : 0, gx = (suelta ? 168 + (k - 2.5) * 6 + Math.sin(t * 2 + k) * 3 - (t - W) * 10 : 166 + (k - 2.5) * 4 + Math.sin(t * 2 + k)) , gy = 82 - (k % 2) * 6 - up;
    if (gy < 22) continue; globo(gx, gy, k % 3 === 1 ? PLG : AZG, t, k, suelta ? null : ex.mano[0], suelta ? null : ex.mano[1]); }
  // los empleados que salen con globos y gorros hacia el aparcamiento (por el camino, de dentro afuera)
  const salen = [[0.0, -1, {}], [0.9, 1, { H: '#3a2418', h: '#5a3a24' }], [1.7, -1, { C: '#f0e6c8', c: '#c8bc9a', H: '#8a4a24' }], [2.6, 1, { H: '#1c1418', h: '#3a3036' }]];
  for (const [d, dir, pal] of salen) { const v = u - d; if (v < 0) continue;
    const x = v < 1 ? lerp(156, 156 + dir * 8, v) : 156 + dir * 8 + dir * (v - 1) * 26, s = v < 1 ? Math.round(lerp(121, 146, v)) : 146;
    if (x < -20 || x > 330) continue; const a = R.actor(NC.empleadoPepsi, Math.round(x), s, t, { dir, anda: true, pal, sonrisa: true, sostiene: [Math.round(x) + (dir > 0 ? 14 : 0), s - 20] });
    globo(a.mano[0] + Math.sin(t * 2.5 + d) * 2, a.mano[1] - 18, d % 2 ? PLG : AZG, t, d * 3, a.mano[0], a.mano[1]); }
  // el coche que sale del aparcamiento y pita en «changing» (por delante de la gente)
  const cs = PA(.76), cx = lerp(150, 360, sm(lin(t, cs, cs + 3.4)) * 0.6 + lin(t, cs, cs + 3.4) * 0.4);
  coche(cx, 172, rp('#2a3a6a', '#3a5aa8', '#7a9ae0'), 1, t);
  if (t > PA(.787) && t < PA(.787) + 0.5) { const hx = Math.round(cx + 38); for (const dy of [-2, 0, 2]) R.linea(hx, 164 + dy * 2, hx + 4, 164 + dy * 3, hex('#fff2a0')); }
};

const efectos = [[PA(.075), 'palmada'], [PA(.2113), 'papel'], [PA(.44), 'lapiz'], [PA(.611), 'papel'], [PA(.654), 'pop'], [PA(.787), 'claxon'], [PA(.9663), 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1985 });
''')

# ───────────────────────────────────────── NC-PREGUNTA ─────────────────────────────────────────
E['nc-pregunta'] = ('La pregunta', r'''// NC-PREGUNTA (frase 14, «Goizueta called it one of the easiest decisions…»), sin cartela; barra en 1985. Cuatro planos:
// 1. «Goizueta called it one of the easiest decisions the company had ever made»: la rueda de prensa (anuncio 'prensa',
//    2.º uso, la lata ya destapada): Goizueta habla seguro tras el atril; en «easiest» alza el dedo y sale su bocadillo con
//    el visto; Keough, en la tarima, aplaude; los periodistas apuntan y disparan flashes.
// 2. Corta en «But»: el pasillo lateral del foso (fondo local): los periodistas de pie miran al escenario (a la izquierda);
//    un hombre de corbata azul pasa por detrás de la fila y les va dando papelitos azules («slipped questions»); los
//    periodistas los alzan, con un «?» en «questions»; el cámara de la tele, en su tarima, gira la cámara.
// 3. Corta en «and Goizueta»: el escenario desde el bastidor (fondo local): Goizueta de perfil en el atril busca palabras
//    para el sabor: bocadillos con pictogramas (la nube, el terrón, las burbujas) que se tachan con una X roja en
//    «struggled», «describe» y «taste»; suda; en «the real question» una periodista del foso se levanta con su papelito y
//    un «?».
// 4. Corta en «why»: la sala desde el fondo (fondo local): filas de nucas, el escenario lejos con la lata en la pantalla;
//    un «?» enorme sube sobre la sala en «why» y late en «broken»; en «didn't have a good answer» el Goizueta pequeño del
//    escenario se encoge de hombros, las cabezas se giran y se alzan manos con papelitos; un acomodador baja por el pasillo.
''', COMUN + r'''
const PR = (f) => en('pregunta', f);
const Q2 = PR(.266), Q3 = PR(.4927), Q4 = PR(.7656);
const PAPEL_AZ = hex('#5a8ae8');
const papelAz = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 3, y - 3, x + 3, y + 1, K0); R.rect(x - 2, y - 2, x + 2, y, PAPEL_AZ); R.rect(x - 2, y - 2, x + 2, y - 2, hex('#9ac0ff')); };

// ── 1 · la rueda de prensa: Goizueta, seguro ──
const p1 = (t) => {
  const o = { encuadre: 'prensa', destapada: true, flashes: 0.8 };
  const g = T.anuncio(R, t, o);
  const S = 118, SS = 158;
  // Keough en la tarima, a la derecha de la mesa: sonríe y aplaude en «easiest»
  const ap = t > PR(.08) && t < PR(.2);
  R.actor(NC.keough, 210, S, t, { dir: 1, sonrisa: true, brazos: ap && Math.floor(t * 7) % 2 === 0 });
  // Goizueta tras el atril
  const dedo = t > PR(.06) && t < PR(.16);
  R.actor(NC.goizueta, 250, S, t, { dir: -1, sonrisa: true, dedo, habla: t < PR(.23) && Math.sin(t * 10) > -0.1 });
  if (t > PR(.0879) && t < PR(.23)) { const s = sm(lin(t, PR(.0879), PR(.0879) + 0.25)); pensar(Math.round(244 - s * 14), Math.round(78 - s * 16), Math.round(8 + s * 20), Math.round(6 + s * 14), 254, 92); if (s > 0.8) T.visto(R, 233, 63, 2); }
  // los periodistas de pie del foso: apuntan, uno alza la libreta, la periodista adelanta el micro
  R.actor(NC.periodista, 66, SS, t, { dir: 1, habla: Math.sin(t * 6) > 0.6 });
  R.actor(NC.periodista2, 116, SS, t, { dir: 1, sostiene: [136, SS - 22] });
  R.actor(NC.presentador, 178, SS, t, { dir: 1, dedo: t > PR(.19), sorpresa: t > PR(.22) });
  T.anuncioDelante(R, t, o);
};

// ── 2 · el pasillo lateral del foso ──
const fondoLateral = () => {
  // el techo acústico oscuro con los focos empotrados (la esquina de Atom, lisa)
  llena(0, 0, 319, 22, rp('#141424', '#1c1c30', '#24243a'), (x, y) => 1 + (hh(x, y) - 0.5) * 0.4 + (x % 24 === 0 && x < 260 ? -1 : 0));
  for (let x = 188; x < 260; x += 34) { R.disco(x, 16, 2, hex('#f6f0c8')); R.pset(x - 1, 15, hex('#ffffff')); }
  // la cornisa lisa
  R.rect(0, 23, 319, 46, hex('#2a2238')); R.rect(0, 23, 319, 24, hex('#3a3248')); R.rect(0, 46, 319, 47, hex('#1a1424'));
  // la pared de listones acústicos de roble
  for (let y = 48; y <= 132; y++) for (let x = 0; x <= 319; x++) { const l = x % 5; R.pset(x, y, l === 4 ? hex('#4a2a18') : R.tone(rp('#6a3e22', '#86522e', '#a06a3a', '#b8824a'), 1.6 + (l === 0 ? 0.9 : 0) + Math.sin(y * 0.3 + x) * 0.2 + (hh(Math.floor(x / 5), y >> 3, 2) - 0.5) * 0.6 - y / 200, x, y)); }
  // el zócalo
  R.rect(0, 126, 319, 132, hex('#2a1810')); R.rect(0, 126, 319, 126, hex('#5a3a24'));
  // los apliques con su luz
  for (const x of [118, 214]) { R.rect(x - 4, 64, x + 4, 72, K0); R.rect(x - 3, 65, x + 3, 71, hex('#f6e6b0')); R.rect(x - 3, 65, x + 3, 66, hex('#ffffff')); luz(x, 72, 34, hex('#ffe8b0'), 0.32); }
  // las fotos enmarcadas en blanco y negro (el auditorio, un concierto) y el cartel de la orquesta con su pictograma
  for (const [x0, k] of [[140, 0], [176, 1]]) { R.rect(x0, 70, x0 + 28, 94, K0); R.rect(x0 + 1, 71, x0 + 27, 93, hex('#d8c8a0')); R.rect(x0 + 3, 73, x0 + 25, 91, hex('#3a3a40'));
    for (let y = 74; y <= 90; y++) for (let x = x0 + 4; x <= x0 + 24; x++) R.pset(x, y, R.tone(rp('#2a2a30', '#5a5a60', '#8a8a90', '#c8c8cc'), k ? 1 + Math.sin(x * 0.8) * (y > 82 ? 1.2 : 0.3) + (y < 80 ? 1 : 0) : 1.4 + (Math.abs(x - x0 - 14) < 6 && y < 86 ? 1.2 : 0) + (y > 86 ? -0.6 : 0) + (x - x0 - 4 + y) % 7 / 6, x, y)); }
  // la mesa del café de la prensa: termo, tazas y la caja de rosquillas
  R.rect(48, 112, 104, 115, K0); R.rect(49, 112, 103, 113, hex('#f2ece0')); R.rect(49, 114, 103, 126, hex('#e6dccc')); for (let x = 52; x < 103; x += 6) R.rect(x, 116, x, 126, hex('#c8bca8'));
  R.rect(56, 96, 66, 111, K0); R.rect(57, 97, 65, 110, hex('#b8bcc8')); R.rect(57, 97, 58, 110, hex('#e0e4ec')); R.rect(66, 104, 68, 105, K0);
  for (const x of [72, 78, 84]) { R.rect(x, 106, x + 4, 111, K0); R.rect(x + 1, 107, x + 3, 110, hex('#f6f6f2')); }
  R.rect(88, 104, 102, 111, K0); R.rect(89, 105, 101, 110, hex('#f0e0c0')); for (const x of [91, 96]) { R.disco(x + 1, 107, 2, hex('#c88a4a')); R.pset(x + 1, 107, hex('#f0e0c0')); R.pset(x, 106, hex('#e85a8a')); }
  // la puerta lateral con su pictograma de salida verde (sin letras)
  R.rect(280, 62, 316, 132, K0); R.rect(282, 64, 314, 131, hex('#5a3a28')); R.rect(297, 64, 298, 131, hex('#3a2418'));
  for (const x of [284, 300]) { R.rect(x, 70, x + 11, 96, hex('#6e4a34')); R.rect(x, 104, x + 11, 124, hex('#6e4a34')); }
  R.rect(293, 98, 296, 99, hex('#c8a040')); R.rect(299, 98, 302, 99, hex('#c8a040'));
  R.rect(286, 50, 310, 59, K0); R.rect(287, 51, 309, 58, hex('#2a8a4a'));
  R.rect(291, 52, 292, 53, hex('#e8fff0')); R.rect(290, 54, 293, 55, hex('#e8fff0')); R.pset(289, 57, hex('#e8fff0')); R.pset(294, 57, hex('#e8fff0')); R.rect(297, 53, 305, 56, hex('#e8fff0')); R.rect(303, 52, 305, 57, hex('#e8fff0'));
  // a la izquierda, el canto de la tarima con su faldón plisado y la tira de luz
  for (let y = 92; y <= 140; y++) for (let x = 0; x <= 44; x++) { const top = y < 98; R.pset(x, y, top ? R.tone(rp('#4a2a18', '#6a3e22', '#86522e'), 1.4 + (x % 9 === 0 ? -1 : 0) + hh(x, y) * 0.5, x, y) : R.tone(rp('#2a1a3e', '#3a2852', '#4e3a6a', '#6a5288'), 1.4 + Math.sin(x * 0.9) * 0.9 - (y - 98) / 60, x, y)); }
  for (let x = 0; x <= 44; x += 3) R.pset(x, 99, hex('#fff2b0'));
  R.rect(44, 92, 45, 140, K0);
  // el pie del micrófono de la tarima y la esquina del mantel
  R.rect(8, 60, 9, 92, hex('#6a6a78')); R.rect(4, 91, 13, 92, hex('#3a3a46')); R.disco(9, 58, 2, hex('#3a3a46'));
  R.rect(22, 76, 44, 92, hex('#f2ece0')); R.rect(22, 76, 44, 77, hex('#ffffff')); for (let x = 24; x < 44; x += 4) R.rect(x, 80, x, 92, hex('#d8d0c0'));
  // el haz del foco que cae sobre la tarima
  for (let y = 24; y <= 92; y++) for (let x = 0; x <= 60; x++) { const c = 18 + y * 0.25, w = 6 + y * 0.18; if (Math.abs(x - c) < w) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d0'), 0.16)); }
  // la tarima del cámara de la tele, al fondo a la derecha
  R.rect(226, 112, 278, 134, K0); R.rect(227, 113, 277, 133, hex('#3a3a46')); R.rect(227, 113, 277, 114, hex('#6a6a78'));
  for (let x = 230; x < 276; x += 8) R.rect(x, 116, x + 4, 131, hex('#2e2e38'));
  // la moqueta roja con su dibujo de rombos dorados
  for (let y = 133; y <= 179; y++) for (let x = 0; x <= 319; x++) { const f = (y - 133) / 46, s = 8 + f * 8, u = ((x - 160) / s + 100) % 1, v = ((y - 133) / (4 + f * 5)) % 1, rombo = Math.abs(u - 0.5) + Math.abs(v - 0.5) < 0.16;
    R.pset(x, y, rombo ? hex('#c8a040') : R.tone(rp('#4a141e', '#64202a', '#7e2c36', '#983a44'), 1.5 + f * 0.8 + (hh(x, y, 3) - 0.5) * 0.6, x, y)); }
  // los cables por el suelo
  for (let x = 40; x < 320; x++) { const y = Math.round(142 + Math.sin(x * 0.05) * 3 + x * 0.02); R.pset(x, y, hex('#141018')); R.pset(x, y + 1, hex('#2a2430')); }
};
// la fila de sillas plegables de delante, con abrigos, un maletín y la bolsa de la cámara (después de los actores)
const sillasDelante = (t) => {
  for (let k = 0; k < 6; k++) { const x = 30 + k * 50;
    R.rect(x, 156, x + 30, 166, K0); R.rect(x + 1, 157, x + 29, 165, hex('#5a5e6a')); R.rect(x + 1, 157, x + 29, 158, hex('#8a8e9a'));
    R.rect(x + 2, 166, x + 3, 179, hex('#3a3e4a')); R.rect(x + 27, 166, x + 28, 179, hex('#3a3e4a'));
    if (k % 2 === 0) { R.rect(x + 4, 154, x + 20, 172, K0); R.rect(x + 5, 155, x + 19, 171, k === 2 ? hex('#6a5a3a') : hex('#3a4a5a')); R.rect(x + 11, 155, x + 12, 171, k === 2 ? hex('#4a3e28') : hex('#2a3644')); } }
  R.rect(150, 166, 174, 179, K0); R.rect(151, 167, 173, 179, hex('#3a2a1e')); R.rect(158, 163, 166, 167, K0); R.rect(151, 170, 173, 170, hex('#5a4030')); R.rect(160, 172, 164, 174, hex('#c8a040'));
  R.rect(276, 168, 300, 179, K0); R.rect(277, 169, 299, 179, hex('#2a2a30')); R.rect(282, 172, 294, 176, hex('#4a4a54'));
};
const p2 = (t) => {
  capa('preg-lateral', fondoLateral);
  const u = t - Q2, S = 150;
  // el cámara de la tele en su tarima, gira la cámara siguiendo la sala
  R.actor(NC.camarografo, 244, 113, t, { dir: -1 });
  { const ang = Math.sin(t * 0.8) * 0.12; R.rect(236, 100, 239, 113, hex('#3a3a46')); R.linea(232, 113, 238, 100, hex('#3a3a46')); R.linea(244, 113, 238, 100, hex('#3a3a46')); if (Math.floor(t * 2) % 2) R.pset(254, 101, hex('#e83a3a')); }
  // el hombre de la corbata azul pasa por detrás de la fila repartiendo papelitos
  const xm = Math.round(lerp(236, 44, lin(u, 0.2, 3.7)));
  { const a = R.actor(NC.empleadoPepsi, xm, 141, t, { dir: -1, tocado: '', anda: u > 0.2 && u < 3.7, sostiene: [xm - 4, 126] }); for (let k = 0; k < 3; k++) R.rect(a.mano[0] - 3, a.mano[1] - 3 - k, a.mano[0] + 2, a.mano[1] - 3 - k, k % 2 ? PAPEL_AZ : hex('#9ac0ff')); }
  // los periodistas de pie, mirando al escenario; cada uno recibe su papelito cuando pasa el hombre, y lo alza
  const fila = [[214, NC.periodista, { H: '#2a1e1a', h: '#4a3630', C: '#6a6a74', c: '#52525c' }], [166, NC.periodista2, {}], [118, NC.presentador, {}], [70, NC.periodista, {}]];
  fila.forEach(([x, def, pal], k) => { const recibe = (lerp(236, 44, lin(u, 0.2, 3.7)) < x + 6) && u > 0.2; const tq = PR(.3886);
    const arriba = recibe && (k < 2 ? true : t > tq - 0.1);
    const a = R.actor(def, x, S, t, { dir: -1, pal, sostiene: recibe ? (arriba ? [x - 6, S - 28] : [x - 4, S - 16]) : undefined, sorpresa: recibe && k === 1 && t > tq && t < tq + 0.6, sonrisa: recibe && k !== 1, habla: !recibe && Math.sin(t * 5 + k) > 0.7 });
    if (recibe) { papelAz(a.mano[0], a.mano[1] - 3); }
    if (k === 1 && t > tq && t < tq + 1.4) R.bocadillo(x + 7, S - 34, { icono: '?' }); });
  sillasDelante(t);
};

// ── 3 · el escenario desde el bastidor ──
const fondoBastidor = () => {
  // el peine del escenario: oscuro, con la vara de focos (la esquina de Atom, lisa)
  R.rect(0, 0, 319, 30, hex('#100c18'));
  for (let y = 0; y <= 30; y++) for (let x = 0; x <= 260; x++) if (hh(x, y, 9) > 0.97) R.pset(x, y, hex('#1e1a2a'));
  R.rect(40, 12, 240, 13, hex('#3a3a46'));
  for (let x = 56; x <= 226; x += 34) { R.rect(x - 4, 14, x + 4, 22, K0); R.rect(x - 3, 15, x + 3, 21, hex('#2a2a34')); R.rect(x - 2, 21, x + 2, 22, hex('#fff2c0')); R.rect(x, 9, x, 12, hex('#6a6a78')); }
  // el telón de fondo azul con pliegues y el círculo de luz con la lata pictograma
  for (let y = 30; y <= 114; y++) for (let x = 56; x <= 200; x++) R.pset(x, y, R.tone(rp('#141e3a', '#1e2c52', '#2a3c6a', '#3a5288'), 1.4 + Math.sin(x * 0.55) * 0.8 + (y - 30) / 120, x, y));
  for (let y = 36; y <= 104; y++) for (let x = 90; x <= 190; x++) { const d = Math.hypot(x - 142, (y - 70) * 1.3) / 44; if (d < 1) R.pset(x, y, mez(R.pget(x, y), hex('#a8c0ff'), 0.28 * (1 - d))); }
  PZ.lata(R, 168, 92, { color: 'rojo', s: 2 });
  // al fondo a la derecha, la sala en penumbra: filas de butacas que suben y la salida verde
  for (let y = 30; y <= 114; y++) for (let x = 201; x <= 319; x++) R.pset(x, y, R.tone(rp('#0e0a16', '#161020', '#20182c'), 1 + ((y - 30) % 9 < 3 ? 1 : 0) + hh(x, y) * 0.3, x, y));
  for (let r = 0; r < 8; r++) for (let x = 204 + r * 2; x < 268; x += 7) { const y = 104 - r * 9; R.rect(x, y, x + 4, y + 2, hex('#3a1a24')); if (hh(x, r) > 0.55) { R.rect(x + 1, y - 3, x + 3, y - 1, hh(x, r, 2) > 0.5 ? hex('#3a2a20') : hex('#8a6a40')); } }
  R.rect(280, 60, 300, 68, hex('#2a8a4a')); R.rect(283, 62, 285, 66, hex('#e8fff0')); R.rect(289, 63, 297, 65, hex('#e8fff0'));
  // el bastidor de terciopelo rojo a la izquierda, con su cuerda y el saco de contrapeso
  for (let y = 0; y <= 150; y++) for (let x = 0; x <= 56; x++) R.pset(x, y, R.tone(rp('#4a0e16', '#6a1620', '#8a222c', '#ac3640'), 1.5 + Math.sin(x * 0.7 + Math.sin(y * 0.05)) * 1.1 - (x > 50 ? 0.8 : 0), x, y));
  R.rect(56, 0, 57, 150, hex('#2a0a10'));
  R.rect(20, 30, 21, 140, hex('#c8a870')); for (let y = 32; y < 140; y += 4) R.pset(21, y, hex('#8a6a40'));
  R.rect(14, 136, 28, 150, K0); R.rect(15, 137, 27, 149, hex('#8a7a5a')); R.rect(15, 137, 27, 139, hex('#a89a7a')); R.rect(20, 132, 21, 136, hex('#c8a870'));
  // las tablas del escenario con la cinta de marcas y el cable
  for (let y = 114; y <= 150; y++) for (let x = 57; x <= 200; x++) { const f = (y - 114) / 36, jx = Math.floor((x - 57) / (12 + f * 6)); R.pset(x, y, (x - 57) % Math.round(12 + f * 6) === 0 ? hex('#2a1a10') : R.tone(rp('#3a2416', '#523422', '#6a442c', '#82563a'), 1.4 + f + Math.sin(x * 0.3 + jx * 3) * 0.3, x, y)); }
  R.rect(170, 138, 178, 139, hex('#e8d040')); R.rect(173, 135, 174, 142, hex('#e8d040'));
  for (let x = 57; x <= 200; x++) R.pset(x, Math.round(146 + Math.sin(x * 0.08) * 2), K0);
  // el canto del escenario con la tira de luz, y el foso a la derecha
  for (let y = 150; y <= 179; y++) for (let x = 0; x <= 200; x++) R.pset(x, y, R.tone(rp('#14101a', '#1e1826', '#2a2234'), 1 + (x % 22 === 0 ? -1 : 0) + hh(x, y) * 0.4, x, y));
  for (let x = 0; x <= 200; x += 3) R.pset(x, 151, hex('#fff2b0'));
  R.rect(200, 114, 203, 179, hex('#1a1220')); for (let y = 114; y <= 179; y += 3) R.pset(201, y, hex('#fff2b0'));
  for (let y = 114; y <= 179; y++) for (let x = 204; x <= 319; x++) R.pset(x, y, R.tone(rp('#1a1424', '#241c30', '#30263e'), 1 + (y % 16 < 2 ? 1 : 0) + hh(x, y, 4) * 0.4, x, y));
};
// el atril de perfil, delante de Goizueta (x 128–150)
const atrilLado = () => { R.poligono([[130, 118], [150, 112], [150, 150], [134, 150]], K0); R.poligono([[131, 119], [149, 114], [149, 149], [135, 149]], hex('#6a4428'));
  for (let y = 120; y < 148; y += 4) R.rect(137, y, 147, y, hex('#86562e')); R.rect(130, 116, 150, 118, hex('#86562e')); R.rect(130, 116, 150, 116, hex('#a8744a'));
  R.linea(136, 116, 128, 104, hex('#3a3a46')); R.disco(127, 103, 2, hex('#3a3a46')); R.pset(126, 102, hex('#8a8a9a')); };
const PICT = { nube: (x, y) => { R.disco(x - 6, y + 2, 5, hex('#5a7aa8')); R.disco(x + 3, y - 1, 7, hex('#5a7aa8')); R.disco(x + 9, y + 3, 4, hex('#5a7aa8')); R.disco(x - 6, y + 2, 4, hex('#c8d8f0')); R.disco(x + 3, y - 1, 6, hex('#e8f0ff')); R.disco(x + 9, y + 3, 3, hex('#c8d8f0')); R.rect(x - 9, y + 4, x + 11, y + 6, hex('#a8bcd8')); },
  terron: (x, y) => { R.rect(x - 8, y - 7, x + 8, y + 7, K0); R.rect(x - 7, y - 6, x + 7, y + 6, hex('#ffffff')); R.rect(x + 2, y - 6, x + 7, y + 6, hex('#d8dce8')); R.rect(x - 7, y + 4, x + 7, y + 6, hex('#c8ccd8')); for (const [a, b] of [[-4, -2], [-1, 2], [4, -3], [0, -4]]) R.pset(x + a, y + b, hex('#b8bcc8')); },
  burbujas: (x, y, t) => { for (let k = 0; k < 5; k++) { const by = y + 7 - ((t * 12 + k * 4) % 14), bx = x - 8 + k * 4; R.disco(bx, Math.round(by), 2 + (k % 2), hex('#3a6ab8')); R.disco(bx, Math.round(by), 1 + (k % 2), hex('#9ac0ff')); R.pset(bx - 1, Math.round(by) - 1, hex('#ffffff')); } } };
const p3 = (t) => {
  capa('preg-bastidor', fondoBastidor);
  const u = t - Q3, S = 148;
  // el foso: bustos de periodistas con papelitos azules que se alzan (de fondo)
  const bp = [[214, 120, 'rizos'], [236, 128, 'calvo'], [258, 120, 'mujer'], [282, 130, 'rizos'], [300, 118, 'calvo'], [224, 146, 'mujer'], [250, 150, 'calvo'], [276, 148, 'rizos'], [300, 146, 'mujer']];
  bp.forEach(([x, y, tp], k) => { const pal = { H: hex(['#2a1e1a', '#8a6040', '#c89a4a', '#3a2418'][k % 4]), C: hex(['#5a5e6a', '#8a6a4a', '#2a6a6a', '#6a3a3a'][k % 4]), V: hex('#3a2418') };
    R.busto(tp, pal, x, y, t); const alza = (k % 3 === 0 && u > 0.6) || (k % 3 === 1 && u > 2.2) || u > 3.4;
    if (alza) { const hy = y - 4 - Math.round(Math.abs(Math.sin(t * 3 + k)) * 2); R.rect(x + 8, hy, x + 9, y + 2, pal.C); R.rect(x + 7, hy - 2, x + 9, hy, hex('#f0c09a')); papelAz(x + 9, hy - 3); }
    if (Math.floor(t * 3 + k * 1.7) % 9 === 0) { R.pset(x + 4, y - 2, hex('#ffffff')); R.pset(x + 3, y - 2, hex('#fff2a0')); R.pset(x + 5, y - 2, hex('#fff2a0')); R.pset(x + 4, y - 3, hex('#fff2a0')); } });
  // el regidor con cascos en el bastidor y Keough, que se muerde las uñas
  R.actor(NC.camarografo, 24, 150, t, { dir: 1, habla: Math.sin(t * 7) > 0.5 });
  R.actor(NC.keough, 64, S, t, { dir: 1, triste: u > 1.2, sorpresa: u > 3.6, sostiene: u > 1.2 ? [76, 124] : undefined });
  // Goizueta en el atril, de perfil: busca palabras, suda
  const dudas = [[PR(.5297), 'nube'], [PR(.5933), 'terron'], [PR(.6407), 'burbujas']];
  R.actor(NC.goizueta, 117, S, t, { dir: 1, habla: Math.sin(t * 7) > 0.3 && u < 3.3, triste: u > 1.2, sorpresa: t > PR(.7136), dedo: u < 0.9 });
  if (u > 1) for (let k = 0; k < 2; k++) { const q = (t * 1.3 + k * 0.5) % 1; R.pset(112 + k * 12, Math.round(118 + q * 8), hex('#9ad8ff')); R.pset(112 + k * 12, Math.round(119 + q * 8), hex('#5a9ad8')); }
  atrilLado();
  // los bocadillos con pictogramas que no encajan: aparecen, se tachan y revientan
  dudas.forEach(([t0, nom], k) => { const v = t - t0; if (v < 0 || v > 1.3) return; const x = 116 + k * 34, y = 66 - k * 6, s = sm(v / 0.2);
    pensar(Math.round(x - 6 - s * 14), Math.round(y - 4 - s * 12), Math.round(12 + s * 28), Math.round(8 + s * 22), 128, 106);
    if (s > 0.9) PICT[nom](x, y, t);
    if (v > 0.55) { const c = v > 1.05 ? hex('#f0a0a0') : hex('#e02828'); R.icono('X', x - 7, y - 8, c, K0, 3); } });
  // en «the real question» una periodista del foso se levanta con su papelito y su «?»
  const rq = PR(.7136);
  if (t > rq - 0.3) { const s = Math.round(lerp(196, 176, sm(lin(t, rq - 0.3, rq + 0.1)))); const a = R.actor(NC.periodista2, 230, s, t, { dir: -1, sostiene: [226, s - 30], habla: true }); papelAz(a.mano[0], a.mano[1] - 3); if (t > rq) R.bocadillo(244, s - 34, { icono: '?' }); }
};

// ── 4 · la sala desde el fondo ──
const NUCAS = [];
const fondoSala = () => {
  // el techo artesonado oscuro con las luces en perspectiva (la esquina de Atom, lisa)
  llena(0, 0, 319, 44, rp('#120e1c', '#1a1426', '#221a30'), (x, y) => 1 + ((Math.floor((x - 160) / (8 + (44 - y) * 0.5)) + Math.floor(y / 7)) % 2 ? 0.6 : 0) + hh(x, y) * 0.3);
  for (let r = 0; r < 3; r++) for (let k = -3; k <= 3; k++) { const y = 20 + r * 9, x = Math.round(160 + k * (16 + (36 - y) * 1.2)); if (x > 264 && y < 46) continue; R.disco(x, y, r > 1 ? 1 : 2, hex('#f6e8b0')); }
  // las paredes laterales en perspectiva, con apliques
  for (let y = 0; y <= 179; y++) for (let x = 0; x <= 319; x++) { const izq = x < 60 - y * 0.2 + 30 && x < 72 - (179 - y) * 0.08 && y > 30, der = x > 260 + y * 0.2 - 30 && y > 30;
    if (izq || der) R.pset(x, y, R.tone(rp('#3a2236', '#4e2e46', '#643c58', '#7a4c6a'), 1.4 + Math.sin(y * 0.5) * 0.4 + (hh(x, y) - 0.5) * 0.4 - (der ? 0.3 : 0), x, y)); }
  for (const [x, y] of [[20, 70], [40, 56], [300, 70], [284, 58]]) { R.rect(x - 2, y - 3, x + 2, y + 2, hex('#f6e6b0')); luz(x, y, 18, hex('#ffe8b0'), 0.3); }
  R.rect(14, 92, 28, 98, hex('#2a8a4a')); R.rect(17, 94, 19, 96, hex('#e8fff0')); R.rect(22, 95, 26, 95, hex('#e8fff0'));
  R.rect(292, 92, 306, 98, hex('#2a8a4a')); R.rect(295, 94, 297, 96, hex('#e8fff0')); R.rect(300, 95, 304, 95, hex('#e8fff0'));
  // el escenario lejos: el arco, el telón azul, la pantalla con la lata y el atril diminuto
  R.rect(84, 30, 236, 96, hex('#2a1a2a'));
  for (let y = 34; y <= 88; y++) for (let x = 90; x <= 230; x++) R.pset(x, y, R.tone(rp('#162244', '#203060', '#2c4078', '#3c5490'), 1.4 + Math.sin(x * 0.7) * 0.6, x, y));
  R.rect(132, 38, 188, 66, K0); R.rect(133, 39, 187, 65, hex('#e8eef6'));
  PZ.lata(R, 160, 63, { color: 'rojo', s: 1 }); T.visto(R, 170, 46, 1);
  R.rect(84, 88, 236, 96, hex('#4a2a18')); for (let x = 86; x < 236; x += 3) R.pset(x, 89, hex('#fff2b0'));
  for (let y = 74; y <= 88; y++) for (let x = 172; x <= 230; x++) if (Math.abs(x - 186) < (y - 60) * 0.5) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d0'), 0.25));
  // el pasillo central de moqueta y las filas de butacas con las nucas
  for (let y = 96; y <= 179; y++) for (let x = 0; x <= 319; x++) { const f = (y - 96) / 83, aw = 8 + f * 22; if (Math.abs(x - 160) < aw) R.pset(x, y, R.tone(rp('#4a141e', '#64202a', '#7e2c36'), 1.2 + f + ((y + Math.floor(x / 4)) % 5 === 0 ? 0.8 : 0), x, y)); }
  for (let r = 0; r < 9; r++) { const f = r / 8, y = Math.round(100 + f * f * 70 + f * 6), hb = Math.round(3 + f * 8), paso = 6 + f * 12, aw = 8 + ((y - 96) / 83) * 22;
    for (let x = -8; x < 330; x += paso) { const x0 = Math.round(x), x1 = Math.round(x + paso - 2); if (Math.abs((x0 + x1) / 2 - 160) < aw + paso * 0.4) continue;
      R.rect(x0, y, x1, y + hb, hex('#3a0e18')); R.rect(x0, y, x1, y, hex('#8a2a3a')); R.rect(x0 + 1, y + 1, x1 - 1, y + 1, hex('#6a1a28'));
      if (hh(x0, r) > 0.22) NUCAS.push([Math.round((x0 + x1) / 2), y - 1, Math.max(2, Math.round(1.5 + f * 4)), r, hh(x0, r, 5)]); } }
};
const p4 = (t) => {
  capa('preg-sala', fondoSala);
  const u = t - Q4, sh = PR(.9183), resp = t > sh;
  // el Goizueta diminuto en el atril del escenario: en «didn't have a good answer» se encoge de hombros
  { const x = 186, y = 88; R.rect(x - 4, y - 7, x + 4, y, hex('#6a4428')); R.rect(x - 4, y - 7, x + 4, y - 7, hex('#a8744a'));
    R.rect(x - 2, y - 15, x + 2, y - 8, hex('#22283a')); R.rect(x - 1, y - 18, x + 1, y - 16, hex('#e8b088')); R.rect(x - 1, y - 19, x + 1, y - 19, hex('#1a1418'));
    if (resp && Math.floor((t - sh) * 2) % 4 !== 3) { R.pset(x - 4, y - 16, hex('#22283a')); R.pset(x - 5, y - 17, hex('#e8b088')); R.pset(x + 4, y - 16, hex('#22283a')); R.pset(x + 5, y - 17, hex('#e8b088')); R.pset(x - 3, y - 15, hex('#22283a')); R.pset(x + 3, y - 15, hex('#22283a')); } }
  // los flashes de la sala
  for (let k = 0; k < 3; k++) { const ph = (t * 1.7 + k * 0.37) % 1; if (ph < 0.08) { const x = Math.round(40 + hh(Math.floor(t * 1.7), k) * 240), y = Math.round(110 + hh(Math.floor(t * 1.7), k, 2) * 50); if (Math.abs(x - 160) > 30) { R.disco(x, y, 2, hex('#fff8d8')); R.pset(x, y, hex('#ffffff')); R.rect(x - 4, y, x + 4, y, hex('#fff8d8')); R.rect(x, y - 4, x, y + 4, hex('#fff8d8')); } } }
  // las nucas: se giran a cuchichear y algunas alzan la mano con el papelito
  for (const [x, y, r, fila, h] of NUCAS) { const gira = (t > PR(.85) && h > 0.6) ? (Math.sin(t * 2 + x) > 0 ? 1 : -1) : 0;
    const pelo = h < 0.3 ? hex('#2a1e1a') : h < 0.55 ? hex('#5a3a24') : h < 0.8 ? hex('#c89a4a') : hex('#9a9aa4');
    R.disco(x, y - r, r, K0); R.disco(x, y - r, r - 1, pelo); if (gira) { R.pset(x + gira * (r - 1), y - r, hex('#e8b088')); R.pset(x + gira * (r - 1), y - r + 1, hex('#e8b088')); }
    if (r >= 4) R.rect(x - r, y - 1, x + r, y, hex('#3a3a48'));
    const mano = (h > 0.82 && t > PR(.8)) || (h > 0.7 && resp); if (mano && r >= 3) { const hy = y - r * 2 - 4 - Math.round(Math.abs(Math.sin(t * 3 + x)) * 2); R.rect(x + r, hy, x + r + 1, y - r, hex('#3a3a48')); R.rect(x + r - 1, hy - 2, x + r + 1, hy, hex('#e8b088')); if (r >= 4) papelAz(x + r + 1, hy - 3); } }
  // el acomodador baja por el pasillo con su linterna
  { const y = Math.round(lerp(104, 176, sm(u / 7))), x = 166, sc = (y - 96) / 83; const a = R.actor(NC.presentador, x - 7, y, t, { dir: -1, anda: true, pal: { C: '#6a1a28', c: '#4a1020', F: '#2a2a34' }, sostiene: [x - 8, y - 12] });
    for (let k = 1; k < 18; k++) { const bx = a.mano[0] - 1, by = a.mano[1] - k; for (let w = -Math.floor(k / 4); w <= Math.floor(k / 4); w++) R.pset(bx + w, by, mez(R.pget(bx + w, by), hex('#fff6c0'), 0.3)); } }
  // el «?» enorme que sube sobre la sala en «why» y late en «broken»
  { const s = sm(lin(u, 0, 0.6)), late = Math.max(0, Math.sin((t - PR(.8524)) * 7)) * (t > PR(.8524) && t < PR(.8524) + 1 ? 1 : 0), esc = resp ? 7 : 6 + Math.round(late);
    const x = Math.round(160 - 2.5 * esc + Math.sin(t * 2) * 2), y = Math.round(lerp(130, 44, s) + Math.sin(t * 2.6) * 2);
    if (s > 0) { for (const [dx, dy] of [[-2, 0], [2, 0], [0, -2], [0, 2], [-2, -2], [2, 2], [2, -2], [-2, 2]]) R.icono('?', x + dx, y + dy, K0, K0, esc);
      R.icono('?', x, y, hex('#f6c844'), hex('#a8741a'), esc); R.icono('?', x - 1, y - 1, hex('#ffe890'), hex('#f6c844'), Math.max(1, esc - 6)); } }
};

const efectos = [[PR(.03), 'flash'], [PR(.0879), 'brillo'], [PR(.18), 'flash'], [PR(.3724), 'papel'], [PR(.3886), 'pop'], [PR(.5297), 'pop'], [PR(.565), 'toc'], [PR(.5933), 'pop'], [PR(.625), 'toc'], [PR(.6407), 'pop'], [PR(.675), 'toc'], [PR(.7656), 'whoosh'], [PR(.86), 'publico'], [PR(.9183), 'boing']];
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3], [Q4, p4]], { efectos, año: 1985 });
''')

# ───────────────────────────────────────── NC-SOTANO ─────────────────────────────────────────
E['nc-sotano'] = ('El sótano', r'''// NC-SOTANO (frase 15, «At first, sales went well…»), sin cartela; barra en 1985. Tres planos:
// 1. «At first sales went well, people wanted to try it. But soon something started that no taste test had measured»:
//    la caja de un supermercado de 1985 (fondo local): la cajera cobra la lata nueva (con la banda gris) a una señora que
//    sonríe; la registradora suma; en «try it» un cliente la abre y bebe; en «But soon» la señora se va y entra el vecino
//    empujando un carro hasta arriba de cajas de la vieja; en «measured» la cajera se queda de piedra («!»).
// 2. Corta en «Some»: el sótano (rebelion 'calle'/'sotano', gag 6): el vecino baja la escalera con otra caja; en «cases»
//    la lanza a lo alto de la torre, que en «old one» aterriza y empieza a tambalearse; él se asusta y alza los brazos;
//    en «disappeared» una lata cae de arriba y rueda por el suelo; la torre se queda quieta.
// 3. Corta en «in stores»: el pasillo de refrescos (fondo local): la balda de la de siempre (latas rojas lisas) se vacía
//    caja a caja con los clientes que se las llevan en sus carros; la de la nueva (con la banda gris y su oferta) sigue
//    llena; en «emptying out» se llevan la última y una bola de polvo rueda por la balda vacía.
''', COMUN + r'''
const SO = (f) => en('sotano', f);
const S2 = SO(.4373), S3 = SO(.7588);
const ROJO = rp('#7a1414', '#a82020', '#d03434', '#f06a5a');
// la lata nueva lleva la banda gris lisa (o.franja); la de siempre, lisa
const lataN = (x, y, s = 1) => PZ.lata(R, x, y, { color: 'rojo', franja: true, s });
const lataV = (x, y, s = 1) => PZ.lata(R, x, y, { color: 'rojo', s });

// ── 1 · la caja del supermercado ──
const fondoCaja = () => {
  // el techo de placas con los tubos (la esquina de Atom, placa lisa)
  llena(0, 0, 319, 20, rp('#c8c4b8', '#d8d4c8', '#e6e2d6'), (x, y) => 1.4 + (x % 30 === 0 || y % 10 === 0 ? -1.2 : 0) + hh(x, y) * 0.4);
  R.rect(0, 20, 319, 21, hex('#8a867c'));
  // la pared del fondo: el escaparate grande a la izquierda (al aparcamiento) y las góndolas de los pasillos a la derecha
  for (let y = 22; y <= 110; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#c8b890', '#d8caa4', '#e6dab8'), 1.4 + (hh(x, y, 3) - 0.5) * 0.5, x, y));
  // el escaparate: cielo, el aparcamiento, coches y el sol, recortado al cristal
  R.recorte([6, 26, 118, 102]);
  llena(6, 26, 118, 70, rp('#7ab0e0', '#94c0e8', '#b4d4f0'), (x, y) => 0.6 + (y - 26) / 20 + (hh(x, y) - 0.5) * 0.4);
  nube(40, 40, 30, rp('#d8e2ee', '#eef4fa', '#ffffff')); nube(96, 34, 22, rp('#d8e2ee', '#eef4fa', '#ffffff'));
  for (let x = 6; x <= 118; x++) for (let y = 66; y <= 72; y++) R.pset(x, y, R.tone(rp('#3e7040', '#548a4a'), 1 + hh(x, y), x, y));
  llena(6, 73, 118, 102, rp('#4a4a54', '#5a5a64', '#6a6a74'), (x, y) => 1.4 + (hh(x, y, 2) - 0.5));
  for (let x = 10; x < 118; x += 22) rc(x, 84, x + 1, 96, hex('#e8e4d8'));
  coche(14, 96, rp('#7a2a2a', '#a83a3a', '#d06a5a'), 1, 0, false); coche(70, 98, rp('#4a5a7a', '#6a7aa8', '#9aaad8'), -1, 0, false);
  R.recorte(null);
  for (let x = 4; x <= 120; x += 38) R.rect(x, 24, x + 2, 104, hex('#9a9690'));
  R.rect(4, 24, 120, 25, hex('#9a9690')); R.rect(4, 102, 120, 104, hex('#9a9690'));
  // los carteles del escaparate: lata con «99» y el «!» de la oferta
  R.rect(46, 30, 74, 52, K0); R.rect(47, 31, 73, 51, hex('#f6e040')); lataN(56, 48); R.numero('99', 62, 46, { color: hex('#c82020') });
  // las góndolas de los pasillos: baldas de colores con su número colgado
  for (const [x0, n] of [[132, '1'], [184, '2'], [234, '3']]) {
    for (let y = 40; y <= 110; y++) for (let x = x0; x <= x0 + 44; x++) { const b = (y - 40) % 14; R.pset(x, y, b < 2 ? hex('#8a8e9a') : R.tone(rp('#3a5aa8', '#c83a3a', '#e8c040', '#4a9a4a', '#e8e4dc', '#c86a2a'), hh(Math.floor(x / 3), Math.floor((y - 40) / 14), x0) * 6, x, y)); }
    R.rect(x0 + 21, 22, x0 + 22, 26, hex('#6a6a74')); R.rect(x0 + 13, 26, x0 + 31, 36, K0); R.rect(x0 + 14, 27, x0 + 30, 35, hex('#2a5aa8')); R.numero(n, x0 + 20, 34, { color: hex('#ffffff') }); }
  // la cabecera de oferta con la pirámide de latas nuevas
  for (let r = 0; r < 3; r++) for (let k = 0; k <= 3 - r; k++) lataN(262 + k * 13 + r * 6, 108 - r * 17);
  R.rect(244, 108, 318, 132, K0); R.rect(245, 109, 317, 131, hex('#c83030')); R.rect(245, 109, 317, 110, hex('#e85a4a'));
  R.rect(268, 114, 294, 126, hex('#f6e040')); R.numero('99', 272, 124, { color: hex('#c82020') });
  // el suelo de linóleo
  linoleo(0, 111, 319, 179, hex('#d8d0bc'), hex('#a89e88'), 4);
  // la máquina de chicles junto a la puerta
  R.rect(124, 96, 128, 132, hex('#c83a3a')); R.disco(126, 90, 7, K0); R.disco(126, 90, 6, hex('#d8eef6'));
  for (let k = 0; k < 9; k++) R.disco(122 + (k % 3) * 4, 87 + Math.floor(k / 3) * 3, 1, hex(['#e83a3a', '#3a8ae8', '#f0c040', '#3ac85a'][k % 4]));
};
// la caja: el mostrador con la cinta que corre, la registradora y el expositor de chucherías (después de la cajera)
const mostrador = (t, cifra, salta) => {
  // el expositor de chucherías
  R.rect(58, 102, 74, 162, K0); R.rect(59, 103, 73, 161, hex('#8a8e9a'));
  for (let r = 0; r < 5; r++) for (let k = 0; k < 3; k++) R.rect(60 + k * 5, 105 + r * 11, 63 + k * 5, 111 + r * 11, hex(['#e83a3a', '#3a8ae8', '#f0c040', '#3ac85a', '#e85a8a'][(r + k) % 5]));
  // el mostrador
  R.rect(74, 128, 206, 166, K0); R.rect(75, 133, 205, 165, hex('#7a5a3a'));
  for (let x = 76; x < 205; x += 9) R.rect(x, 136, x + 7, 163, hex('#86663e')); R.rect(75, 133, 205, 134, hex('#a8845a')); R.rect(75, 164, 205, 165, hex('#4a3420'));
  // la cinta que corre
  R.rect(75, 128, 168, 132, hex('#2a2a30')); for (let x = 75; x < 168; x++) if ((x + Math.floor(t * 18)) % 8 === 0) R.rect(x, 128, x, 132, hex('#4a4a54'));
  R.rect(75, 128, 168, 128, hex('#5a5a64'));
  // los paquetes de seis de latas nuevas que avanzan por la cinta
  for (let k = 0; k < 3; k++) { const x = Math.round(78 + ((t * 14 + k * 18) % 50)); for (let i = 0; i < 3; i++) lataN(x + i * 4, 128, 0.5); }
  // la registradora (x 170–206) con su visor de cifras
  R.rect(170, 104, 206, 132, K0); R.rect(171, 105, 205, 131, hex('#c8c4b8')); R.rect(171, 105, 205, 106, hex('#e6e2d6'));
  for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) R.rect(174 + k * 6, 114 + r * 5, 177 + k * 6, 116 + r * 5, hex(k === 3 ? '#c83a3a' : '#5a5a64'));
  R.rect(174, 92, 206, 104, K0); R.rect(175, 93, 205, 103, hex('#1a2a1a')); R.numero(String(cifra), 177, 102, { color: salta ? hex('#ff6a4a') : hex('#6aff8a') });
  { const caj = salta ? 4 : Math.floor(t * 2) % 5 === 0 ? 2 : 0; R.rect(171, 128 + caj, 205, 131 + caj, hex('#8a867c')); R.rect(186, 129 + caj, 190, 130 + caj, hex('#5a5a64')); }
  // las cestas apiladas y el cono de suelo mojado (pictograma, sin letras)
  for (let k = 0; k < 4; k++) { R.rect(222, 166 - k * 3, 250, 168 - k * 3, K0); R.rect(223, 166 - k * 3, 249, 167 - k * 3, hex('#c83a3a')); } R.rect(222, 166, 250, 178, K0); R.rect(223, 167, 249, 177, hex('#a82a2a')); for (let x = 225; x < 248; x += 4) R.rect(x, 168, x + 1, 176, hex('#7a1a1a'));
  R.poligono([[292, 152], [304, 178], [280, 178]], K0); R.poligono([[292, 155], [302, 177], [282, 177]], hex('#f6d020')); R.disco(292, 164, 1, K0); R.linea(292, 166, 289, 172, K0); R.linea(292, 168, 296, 170, K0); R.linea(287, 175, 297, 175, hex('#3a8ae8'));
};
const p1 = (t) => {
  capa('sot-caja', fondoCaja);
  const SC = 178;
  // la cajera, detrás del mostrador (asoma de cintura arriba)
  const sor = t > SO(.3749) - 0.1;
  R.actor(NC.voluntario, 140, 134, t, { dir: -1, pal: { H: '#c89a4a', h: '#e0b464', C: '#3a7a4a', c: '#2a5a36' }, sonrisa: !sor, sorpresa: sor, habla: !sor && Math.sin(t * 6) > 0.5 });
  const cifra = t < SO(.0222) ? 0 : t < SO(.3749) ? Math.min(299, Math.floor((t - SO(.0222)) * 40) + 99) : 9999;
  mostrador(t, cifra, sor);
  if (sor && t < SO(.3749) + 1) R.bocadillo(148, 104, { icono: '!' });
  // la señora paga con su lata nueva y sonríe; en «But soon» se va hacia la derecha
  const vs = lin(t, SO(.2044), SO(.36)), xs = Math.round(lerp(126, 330, vs));
  if (xs < 325) { const a = R.actor(NC.senora75, xs, SC, t, { dir: 1, anda: vs > 0 && vs < 1, sonrisa: true, sostiene: vs > 0 ? [xs + 14, SC - 18] : [xs + 16, SC - 22] }); lataN(a.mano[0], a.mano[1] + 3); }
  // el cliente de la camiseta azul abre la suya en «try it» y bebe
  const ab = SO(.1427), mira = t > SO(.3749) - 0.2;
  { const x = 94, bebe = t > ab + 0.2 && t < ab + 1.4, a = R.actor(NC.empleadoPepsi, x, SC, t, { dir: mira ? -1 : 1, tocado: '', pal: { C: '#d8a040', c: '#b08020', o: '#5a3a24', H: '#2a1e1a', h: '#4a3630' }, sostiene: mira ? undefined : bebe ? [x + 12, SC - 24] : [x + 15, SC - 16], sonrisa: t > ab && !mira, sorpresa: mira });
    if (!mira) { PZ.lata(R, a.mano[0], a.mano[1] + 3, { color: 'rojo', franja: true, abierta: t > ab, espuma: t > ab && t < ab + 0.35 ? 0.4 : 0, t }); } }
  // el vecino entra empujando el carro lleno de cajas de la vieja
  const vv = lin(t, SO(.215), SO(.33)), xv = Math.round(lerp(-70, 22, sm(vv)));
  { const a = R.actor(NC.vecinoSotano, xv, SC, t, { dir: 1, anda: vv > 0 && vv < 1, sostiene: [xv + 20, SC - 14], sonrisa: t > SO(.34) });
    const cx = xv + 22; R.rect(cx, SC - 16, cx + 34, SC - 15, hex('#9a9aa4')); R.rect(cx, SC - 16, cx + 1, SC - 13, hex('#9a9aa4'));
    for (let r = 0; r < 4; r++) for (let k = 0; k < (r === 3 ? 1 : 2); k++) PZ.cajaLatas(R, cx + 12 + k * 18 + (r === 3 ? 9 : (r % 2) * 2), SC - 12 - r * 11, { color: 'rojo', s: 0.65 });
    R.rect(cx + 2, SC - 13, cx + 36, SC - 2, K0); for (let x = cx + 3; x < cx + 36; x += 3) R.rect(x, SC - 12, x, SC - 3, hex('#b8bcc8')); R.rect(cx + 3, SC - 8, cx + 35, SC - 8, hex('#b8bcc8'));
    for (const wx of [cx + 6, cx + 32]) { R.disco(wx, SC - 1, 2, K0); R.pset(wx, SC - 1, hex('#9a9aa4')); } }
};

// ── 2 · el sótano (gag 6) ──
const p2 = (t) => {
  const u = t - S2, cae = SO(.5634), aterriza = SO(.6174);
  const nc = t >= aterriza ? 8 : 7, tam = t < aterriza ? 0 : Math.max(0, Math.min(1, (t - aterriza) / 0.3)) * Math.max(0, 1 - Math.max(0, t - aterriza - 1.6) / 1.2);
  const g = T.rebelion(R, t, { encuadre: 'calle', camara: 'sotano', cajas: nc, tambalea: tam });
  // el vecino baja la escalera con la caja en brazos
  const bajaFin = S2 + 1.3, x0 = 7 + 11 * 4, s0 = 34 + 13 * 4;
  let x, s, anda = false;
  if (t < bajaFin) { const q = lin(t, S2, bajaFin), i = 4 + q * 5; x = Math.round(7 + 11 * i); s = Math.round(34 + 13 * i); anda = true; }
  else { const q = sm(lin(t, bajaFin, bajaFin + 0.5)); x = Math.round(lerp(106, 124, q)); s = Math.round(lerp(151, 156, q)); anda = q < 1; }
  const lanza = t >= cae - 0.15, susto = t > aterriza && t < aterriza + 2.6;
  const a = R.actor(NC.vecinoSotano, x, s, t, { dir: 1, anda, sinObjeto: lanza, sostiene: lanza && t < cae + 0.1 ? [x + 18, s - 30] : undefined, brazos: susto, sorpresa: susto, sonrisa: t > aterriza + 2.6 });
  // la caja que vuela hasta lo alto de la torre
  if (t >= cae && t < aterriza) { const q = lin(t, cae, aterriza), [tx, ty] = g.torre.tope, xa = x + 18, ya = s - 30;
    const bx = lerp(xa, tx, q), by = lerp(ya, ty + 1, q) - Math.sin(q * Math.PI) * 30; PZ.cajaLatas(R, Math.round(bx), Math.round(by + 16 - 16), { color: 'rojo' }); }
  // en «disappeared» se cae una lata de arriba y rueda por el suelo
  const lc = SO(.6909);
  if (t > lc) { const v = t - lc, [tx, ty] = g.torre.tope; let lx, ly;
    if (v < 0.55) { lx = tx + 10 + v * 30; ly = ty + 4 + 0.5 * 420 * v * v; if (ly > 154) ly = 154; } else { lx = tx + 26 + (v - 0.55) * 30 * Math.max(0, 1 - (v - 0.55) / 1.6); ly = 154; }
    ly = Math.min(154, ly); PZ.lata(R, Math.round(Math.min(lx, 236)), Math.round(ly + 2), { color: 'rojo' }); }
  if (t > aterriza && t < aterriza + 0.2) for (const dx of [-16, 16]) { const [tx, ty] = g.torre.tope; R.linea(tx + dx, ty + 6, tx + dx * 1.4, ty + 2, hex('#e8e0c8')); }
};

// ── 3 · el pasillo de refrescos ──
const fondoPasillo = () => {
  // el techo con los tubos (la esquina de Atom, placa lisa)
  llena(0, 0, 319, 18, rp('#c8c4b8', '#d8d4c8', '#e6e2d6'), (x, y) => 1.4 + (x % 32 === 0 || y % 9 === 0 ? -1.2 : 0) + hh(x, y) * 0.4);
  for (const x of [20, 120, 220]) fluo(x, 8, 40);
  // la pared de encima de la góndola con el cartel colgante (lata y burbujas, sin letras)
  for (let y = 19; y <= 40; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(rp('#d8c49a', '#e6d4ac', '#f0e2c0'), 1.2 + (y > 36 ? -0.8 : 0) + (hh(x, y, 2) - 0.5) * 0.5, x, y));
  for (let x = 0; x <= 319; x++) { R.pset(x, 37, hex('#c8603a')); R.pset(x, 38, hex('#e8a040')); }
  for (let y = 19; y <= 36; y++) for (let x = 0; x <= 270; x++) if ((x + y * 3) % 23 === 0 && hh(x, y, 4) > 0.5) R.pset(x, y, hex('#c8b48a'));
  // el banderín de fiesta del súper (triángulos de colores) y el cartel colgante con la lata y las burbujas
  for (let x = 4; x < 262; x++) { const y = Math.round(22 + Math.sin((x - 4) / 129 * Math.PI) * 6); R.pset(x, y, hex('#5a5e6a')); if ((x - 4) % 12 === 0) { const c = hex(['#c83a3a', '#f0c040', '#3a6ad8', '#3ac85a'][((x - 4) / 12) % 4]); for (let j = 1; j <= 6; j++) for (let i = -3 + Math.floor(j / 2); i <= 3 - Math.floor(j / 2); i++) R.pset(x + i + 3, y + j, c); } }
  R.rect(128, 19, 128, 24, hex('#6a6a74')); R.rect(152, 19, 152, 24, hex('#6a6a74')); R.rect(118, 24, 162, 36, K0); R.rect(119, 25, 161, 35, hex('#c82020')); R.rect(119, 25, 161, 26, hex('#e85a4a'));
  lataV(140, 35, 0.5); for (const [x, y] of [[126, 30], [130, 33], [150, 29], [155, 32], [134, 28]]) { R.disco(x, y, 1, hex('#ffd8d0')); }
  // la góndola: el fondo perforado y las baldas metálicas con su tira de precios
  for (let y = 41; y <= 140; y++) for (let x = 6; x <= 314; x++) R.pset(x, y, (x % 4 === 0 && y % 4 === 0) ? hex('#6a6e7a') : hex('#b8bcc8'));
  R.rect(4, 41, 6, 140, hex('#5a5e6a')); R.rect(314, 41, 316, 140, hex('#5a5e6a')); R.rect(159, 41, 162, 140, hex('#5a5e6a'));
  for (const y of [70, 104, 138]) { R.rect(6, y, 314, y + 3, hex('#9a9eaa')); R.rect(6, y, 314, y, hex('#e8ecf4')); R.rect(6, y + 3, 314, y + 3, hex('#4a4e5a')); for (let x = 10; x < 312; x += 26) { R.rect(x, y + 1, x + 9, y + 2, hex('#f6f2e0')); } }
  // los rótulos de cada mitad (sin letras): la botella recta de siempre a la izquierda; el «!» de oferta a la derecha
  R.rect(56, 44, 104, 54, K0); R.rect(57, 45, 103, 53, hex('#a82020')); PZ.botella(R, 80, 54, { color: 'marron', s: 0.4 });
  R.rect(212, 44, 262, 54, K0); R.rect(213, 45, 261, 53, hex('#f6e040')); R.icono('!', 236, 46, hex('#c82020'), hex('#7a1414'));
  // el suelo de linóleo con el reflejo de las baldas
  linoleo(0, 142, 319, 179, hex('#e0d8c4'), hex('#b0a690'), 7);
  R.rect(0, 141, 319, 142, hex('#5a5e6a'));
};
// la balda llena de la nueva (siempre llena; la oferta con «99»)
const nuevaLlena = () => { for (const y of [69, 103, 137]) for (let k = 0; k < 11; k++) lataN(170 + k * 13, y); for (let k = 0; k < 5; k++) PZ.cajaLatas(R, 182 + k * 29, 66, { color: 'rojo', s: 0.9 });
  R.rect(286, 108, 308, 118, K0); R.rect(287, 109, 307, 117, hex('#f6e040')); R.numero('99', 289, 116, { color: hex('#c82020') }); };
const CAJAS_V = []; for (const y of [69, 103, 137]) for (let k = 0; k < 5; k++) CAJAS_V.push([22 + k * 29, y]);
const p3 = (t) => {
  capa('sot-pasillo', fondoPasillo);
  const u = t - S3, fin = SO(.9708);
  // la nueva, llena
  nuevaLlena();
  // la de siempre: quedan menos cajas cada vez (la última, en «emptying out»)
  const quedan = Math.max(0, Math.round(15 * (1 - lin(t, S3 + 0.2, fin))));
  CAJAS_V.forEach(([x, y], k) => { const orden = [12, 3, 7, 0, 14, 9, 5, 1, 11, 6, 2, 13, 8, 4, 10][k]; if (orden < quedan) PZ.cajaLatas(R, x, y, { color: 'rojo' }); });
  if (quedan === 0) { const v = t - fin; const bx = Math.round(10 + v * 50); if (bx < 150) { for (let k = 0; k < 9; k++) { const a = v * 9 + k * 0.7; R.pset(Math.round(bx + Math.cos(a) * 3), Math.round(98 + Math.sin(a) * 3), hex('#8a8478')); } R.disco(bx, 98, 2, hex('#a8a090')); } }
  else for (let k = 0; k < 3; k++) { const x = Math.round(20 + hh(k, 1) * 130); R.pset(x, 104, hex('#c8c4b8')); }
  // la etiqueta de precio que cuelga y se mece en la balda vacía
  { const a = Math.sin(t * 3) * 0.3, x = 80, y = 107; R.linea(x, y, Math.round(x + Math.sin(a) * 8), Math.round(y + Math.cos(a) * 8), hex('#5a5e6a')); R.rect(Math.round(x + Math.sin(a) * 8) - 3, Math.round(y + Math.cos(a) * 8), Math.round(x + Math.sin(a) * 8) + 3, Math.round(y + Math.cos(a) * 8) + 4, hex('#f6f2e0')); }
  // los clientes que cogen las cajas y las cargan en el carro
  const SC = 172;
  const gente = [[NC.senora75, 30, {}, 0], [NC.presentador, 92, { C: '#6a5a3a', c: '#4e4228', o: '#2a2430' }, 0.5], [NC.voluntario, 130, {}, 1.0]];
  gente.forEach(([def, x0, pal, d], k) => {
    const vete = lin(t, fin - 0.2 + k * 0.15, fin + 1.6), x = Math.round(x0 - vete * 170);
    const coge = Math.floor((u + d) * 1.6) % 2 === 0 && vete === 0;
    const a = R.actor(def, x, SC, t, { dir: vete > 0 ? -1 : 1, anda: vete > 0 && vete < 1, pal, sostiene: coge ? [x + 14, SC - 34] : [x + 14, SC - 14], sonrisa: true });
    if (coge || vete > 0) PZ.cajaLatas(R, a.mano[0] + 2, a.mano[1] + 4, { color: 'rojo', s: 0.6 });
    // el carro, con las cajas que se van amontonando (por delante de su dueño)
    const cx = x + (vete > 0 ? -38 : 18), n = Math.min(5, Math.floor((u + d) * 1.4));
    for (let i = 0; i < n; i++) PZ.cajaLatas(R, cx + 10 + (i % 2) * 12, SC - 12 - Math.floor(i / 2) * 9, { color: 'rojo', s: 0.5 });
    R.rect(cx + 2, SC - 13, cx + 30, SC - 2, K0); for (let xx = cx + 3; xx < cx + 30; xx += 3) R.rect(xx, SC - 12, xx, SC - 3, hex('#b8bcc8')); R.rect(cx + 3, SC - 8, cx + 29, SC - 8, hex('#b8bcc8'));
    R.rect(vete > 0 ? cx + 30 : cx, SC - 16, vete > 0 ? cx + 34 : cx + 2, SC - 15, hex('#9a9aa4'));
    for (const wx of [cx + 6, cx + 26]) { R.disco(wx, SC - 1, 2, K0); R.pset(wx, SC - 1, hex('#9a9aa4')); } });
  // una mosca da vueltas sobre la balda llena de la nueva
  { const a = t * 5, x = Math.round(236 + Math.cos(a) * 18 + Math.sin(a * 2.3) * 6), y = Math.round(88 + Math.sin(a) * 8); R.pset(x, y, K0); R.pset(x - 1, y - (Math.floor(t * 30) % 2), hex('#c8d8f0')); R.pset(x + 1, y - (Math.floor(t * 30) % 2), hex('#c8d8f0')); }
};

const efectos = [[SO(.0222), 'bip'], [SO(.1427), 'pop'], [SO(.228), 'carro'], [SO(.3749), 'campana'], [SO(.5634), 'whoosh'], [SO(.6174), 'golpecito'], [SO(.64), 'boing'], [SO(.6909), 'toc'], [S3 + 0.4, 'carro'], [SO(.9708), 'viento']];
T.rodar(E, R, [[0, p1], [S2, p2], [S3, p3]], { efectos, año: 1985 });
''')
