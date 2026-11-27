E = {}

# piezas comunes de wo-wow y wo-escala: tramas, mezclas, búferes de fondo fijo, cielos con nubes de tres tonos, un lápiz
# en la mano canónica, polillas, luciérnagas y un gato atigrado pequeño (sin cara de persona)
PRE = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea');
const cl01 = (u) => Math.max(0, Math.min(1, u)), ease = (u) => { u = cl01(u); return u * u * (3 - 2 * u); };
const hs = (a, b, k = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const tono = (cs, f, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(cl01(f) * (cs.length - 1) + bay(x, y))))];
const mez = (a, b, k) => { let r = 0; for (const sh of [0, 8, 16]) r |= Math.round(((a >>> sh) & 255) * (1 - k) + ((b >>> sh) & 255) * k) << sh; return (r | 0xff000000) >>> 0; };
const tine = (x, y, c, a) => R.pset(x, y, mez(R.pget(x, y), c, a));
const tranquila = (x, y) => (x >= 274 && y <= 48) || (x >= 16 && x <= 174 && y <= 22);
// un fondo fijo se pinta una vez en su búfer y luego se copia (prev = R.usar(b) … R.usar(prev))
const CAPAS = new Map();
const capa = (k, fn) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); CAPAS.set(k, b); } R.copiar(b); };
// degradado vertical tramado
const degradado = (x0, y0, x1, y1, cs) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(cs, (y - y0) / Math.max(1, y1 - y0), x, y)); };
// una nube de tres tonos (sombra, cuerpo, luz) de bolas tramadas; no entra en las zonas tranquilas
const nube = (cx, cy, w, h, cs, k) => {
  const n = Math.max(3, Math.round(w / 9));
  for (let i = 0; i < n; i++) { const bx = cx - w / 2 + (i + 0.5) * w / n, br = h * (0.55 + 0.45 * Math.sin((i + 0.5) / n * Math.PI)) * (0.8 + hs(i, k, 7) * 0.3), by = cy - br * 0.35;
    for (let y = Math.floor(by - br); y <= by + br; y++) for (let x = Math.floor(bx - br * 1.3); x <= bx + br * 1.3; x++) {
      if (y > cy + h * 0.35 || tranquila(x, y)) continue; const d = ((x - bx) / (br * 1.3)) ** 2 + ((y - by) / br) ** 2; if (d > 1) continue;
      const f = (y - (by - br)) / (2 * br) + (d > 0.8 ? 0.15 : 0); R.pset(x, y, tono(cs, 1 - f, x, y)); } } };
// el lápiz amarillo (punta en tx, ty; ang: hacia dónde va el cuerpo): goma rosa, virola, cuerpo de tres tonos y la mina
const lapiz = (tx, ty, ang, L = 22, desde = 0, col = ['#f0c040', '#c89020', '#fff0a0']) => {
  const ux = Math.cos(ang), uy = Math.sin(ang), nx = -uy, ny = ux;
  for (let i = Math.round(desde * L); i <= L; i++) for (let s = -1.5; s <= 1.5; s += 0.5) { const x = Math.round(tx + ux * i + nx * s), y = Math.round(ty + uy * i + ny * s);
    let c = i < 3 ? hex('#3a3a44') : i < 6 ? hex('#e8c89a') : i > L - 3 ? hex('#e88a98') : i > L - 5 ? hex('#b8b8c0') : hex(Math.abs(s) > 1.1 ? col[1] : s < -0.4 ? col[2] : col[0]);
    if (Math.abs(s) > 1.4 && i >= 3) c = K; R.pset(x, y, c); } };
// una polilla que da vueltas a una luz
const polilla = (cx, cy, t, k, r = 6) => { const a = t * (5 + k) + k * 2.1, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a * 1.3) * r * 0.6); R.pset(x, y, hex('#e8dcc0')); if (Math.sin(t * 40 + k) > 0) { R.pset(x - 1, y - 1, hex('#bfb090')); R.pset(x + 1, y - 1, hex('#bfb090')); } };
// luciérnagas que se encienden y se apagan
const luciernagas = (t, x0, x1, y0, y1, n, sem = 1) => { for (let k = 0; k < n; k++) { const ph = (t * 0.6 + hs(k, sem, 3)) % 1; if (ph > 0.45) continue; const a = Math.sin(ph / 0.45 * Math.PI);
  const x = Math.round(x0 + hs(k, sem, 4) * (x1 - x0) + Math.sin(t * 0.7 + k) * 5), y = Math.round(y0 + hs(k, sem, 5) * (y1 - y0) + Math.cos(t * 0.9 + k * 2) * 3);
  tine(x, y, hex('#e8ff70'), 0.4 + a * 0.6); if (a > 0.6) { tine(x + 1, y, hex('#c8f050'), 0.5); tine(x - 1, y, hex('#c8f050'), 0.5); tine(x, y - 1, hex('#c8f050'), 0.4); } } };
// un gato atigrado gris (dir 1 mira a la derecha), sentado, tumbado (o.duerme) o andando (o.anda con la fase)
const gatito = (x, y, dir, t, o = {}) => { x = Math.round(x); y = Math.round(y);
  const G = hex('#d8883a'), GL = hex('#f0b060'), GS = hex('#a85a20'), RY = hex('#8a4a1a'), P = hex('#e89aa0'), OJ = hex('#9ac850');
  const sc = o.s ?? 1, px = (i, j, c) => { for (let a = 0; a < sc; a++) for (let b = 0; b < sc; b++) R.pset(x + (i * sc + a) * dir, y + j * sc + b, c); };
  if (o.duerme) {   // ovillo con la cola alrededor; o.bosteza 0–1 levanta la cabeza y abre la boca
    const b = o.bosteza ?? 0, sube = Math.round(Math.sin(cl01(b) * Math.PI) * 3), resp = Math.sin(t * 2.4) > 0.6 ? 1 : 0;
    for (let i = -8; i <= 8; i++) for (let j = -7; j <= 0; j++) { const d = (i / 8.5) ** 2 + ((j + 3) / (4 + resp * 0.5)) ** 2; if (d <= 1) px(i, j, d > 0.82 ? K : (i + 20) % 4 === 0 && j < -2 ? RY : j > -2 ? GS : j < -5 ? GL : G); }
    for (let i = -9; i <= 4; i++) { const j = -1 + Math.round(Math.sin(i * 0.4 + t * 1.5) * 0.6); px(i, j, (i & 2) ? RY : G); px(i, j + 1, K); }   // la cola
    const hx = 6, hy = -5 - sube;
    for (let i = -4; i <= 4; i++) for (let j = -3; j <= 3; j++) { const d = (i / 4.2) ** 2 + (j / 3.4) ** 2; if (d <= 1) px(hx + i, hy + j, d > 0.75 ? K : j < -1 ? GL : G); }
    px(hx - 3, hy - 4, K); px(hx - 2, hy - 4, GS); px(hx + 2, hy - 4, GS); px(hx + 3, hy - 4, K);   // las orejas
    if (b > 0.15 && b < 0.85) { px(hx + 1, hy - 1, K); px(hx + 3, hy - 1, K); px(hx + 2, hy + 1, P); px(hx + 2, hy + 2, P); px(hx + 1, hy + 2, K); px(hx + 3, hy + 2, K); }
    else { px(hx + 1, hy, K); px(hx + 3, hy, K); px(hx + 2, hy + 2, P); }
    return; }
  const anda = o.anda, f = anda ? Math.floor(o.fase ?? t * 8) % 2 : 0;
  for (const [i, u] of [[-5, f], [-3, 1 - f], [3, f], [5, 1 - f]]) { const up = anda ? u : 0; px(i, -1 - up, K); px(i, -2 - up, GS); px(i, -3, G); }
  for (let i = -7; i <= 6; i++) for (let j = -9; j <= -3; j++) { const d = (i / 7) ** 2 + ((j + 6) / 3.4) ** 2; if (d <= 1.05) px(i, j, d > 0.8 ? K : (i & 3) === 1 && j < -5 ? RY : j < -7 ? GL : j > -4 ? GS : G); }
  for (let i = 1; i <= 7; i++) px(-7 - i, -7 - Math.round(i * 0.6 + Math.sin(t * 4 + i * 0.5) * 1.2), i & 2 ? RY : G);
  const hx = 8, hy = -10;
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) { const d = (i / 3.4) ** 2 + (j / 3) ** 2; if (d <= 1.05) px(hx + i, hy + j, d > 0.78 ? K : j < -1 ? GL : G); }
  px(hx - 2, hy - 4, K); px(hx - 1, hy - 4, GS); px(hx + 2, hy - 4, K); px(hx + 1, hy - 4, GS);
  const parp = (t + x * 0.1) % 3.1 < 0.12; px(hx + 1, hy - 1, parp ? K : OJ); px(hx + 3, hy, P); };
// una caja de cartón de listados (x, y: la esquina de abajo a la izquierda)
const cajaListados = (x, y, w = 16, h = 10) => { x = Math.round(x); y = Math.round(y);
  R.rect(x, y - h, x + w, y, K); R.rect(x + 1, y - h + 1, x + w - 1, y - 1, hex('#c89a5a')); R.rect(x + 1, y - h + 1, x + w - 1, y - h + 2, hex('#e0b878')); R.rect(x + w - 3, y - h + 2, x + w - 1, y - 1, hex('#a07840'));
  R.rect(x + 2, y - h - 2, x + w - 2, y - h, hex('#f4efe0')); for (let i = x + 2; i <= x + w - 2; i += 3) R.pset(i, y - h - 1, hex('#a8c8a0')); R.pset(x + 2, y - h - 2, hex('#8a8478')); R.pset(x + w - 2, y - h - 2, hex('#8a8478'));
  R.rect(x + 3, y - 5, x + w - 4, y - 5, hex('#8a6a3a')); };
// cifras pequeñas de 3×5 (para esferas y escalas): solo números
const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];
const cifras = (txt, x, y, c, esc = 1) => { let cx = Math.round(x - (txt.length * 4 - 1) * esc / 2); for (const ch of String(txt)) { const d = DIG[+ch]; if (d) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (d[j * 3 + i] === '1') for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) R.pset(cx + i * esc + a, Math.round(y) + j * esc + b, c); cx += 4 * esc; } };
// el anillo rojo que late al cerrar el golpe
const aro = (cx, cy, rx, ry, p) => { for (let k = 0; k < 2; k++) { const q = Math.min(1, p * 1.4 - k * 0.25); if (q <= 0) continue; const s = 1 + q * 0.7;
  for (let a = 0; a < 6.283; a += 0.03) if ((Math.round(a * 30) + k) % 3 !== 0) { const X = Math.round(cx + Math.cos(a) * (rx + 3) * s), Y = Math.round(cy + Math.sin(a) * (ry + 3) * Math.min(s, 1.25)); R.pset(X, Y, q < 0.6 ? hex('#ff5a3a') : hex('#f09a80')); } } };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['wo-wow'] = ('Wow!', r'''// WO-WOW (frases 10–11), año 1977, sin cartela. EL momento del episodio. Seis planos:
// 1. (0) la casa de Jerry Ehman de noche, un barrio de Ohio en agosto: el familiar con paneles de madera aparcado, un
//    voluntario sube por el camino con una caja de listados, llama («toc»); en «Jerry» se abre la puerta, sale la luz y
//    aparece Ehman, que sonríe; polillas en la luz del porche, luciérnagas en el césped, la tele azul del vecino, un
//    gato que pasa por la valla y se para a mirar, la luz roja del depósito de agua, nubes de tres tonos y la luna.
// 2. («one of the volunteers», 4,50) la cocina de noche (listado mesa general): el voluntario deja la caja en el suelo,
//    se despide con la mano y se va; Ehman, detrás de la mesa, le da las gracias, levanta una hoja y la lee.
// 3. («and letters», 8,73) a ras de suelo bajo la mesa: el papel continuo cae por el borde y se pliega en un montón que
//    crece; el gato duerme encima y sube con el montón; en «the usual noise» bosteza y se estira. Solo unos y espacios.
// 4. («And suddenly», 13,38) el listado de cerca, en alto, sostenido por las dos manos delante de la lámpara: en
//    «suddenly» el papel tiembla y la secuencia se enciende (halo); en «saw» las manos lo suben hacia la luz y una marca
//    ámbar baja carácter a carácter mientras la voz dice 6, E, Q, U, J, 5; la polilla da vueltas a la lámpara.
// 5. («He took», 18,47 = golpe «wow2») EL GAG 4 desde arriba (listado mesa 'listado'): el lápiz se rompe, el bolígrafo
//    azul no pinta, el rojo rodea la línea en «circled» y escribe «Wow!» en el margen, que acaba en «Wow!» con un aro.
// 6. («The signal», 24,70) a la mañana siguiente, el corcho de la oficina de la gran oreja: la hoja del «Wow!» clavada
//    entre la foto de la gran oreja, el mapa de estrellas, la tabla de turnos y una postal; una mano clava la última
//    chincheta; la luz de la persiana se mueve, el aire levanta la esquina de la hoja, una mosca se posa en la foto; en
//    «called that ever since» el «Wow!» brilla una vez.''', PRE + r'''
// la voz: frase 10 (listado) y frase 11 (wow2), en segundos de la escena
const S = (s) => s < 18.3 ? en('listado', (s - 0.5) / 17.474) : en('wow2', (s - 18.474) / 9.146);
const P2 = S(4.50), P3 = S(8.73), P4 = S(13.38), P5 = S(18.47), P6 = S(24.70);
const JERRY = S(3.38), TOC = S(2.30), GRACIAS = S(4.82), CHECK = S(6.18), RUIDO = S(12.11), DEPRONTO = S(13.48), VIO = S(14.0);
const CH = [S(15.68), S(16.22), S(16.56), S(17.02), S(17.26), S(17.54)];
const LAPIZ = S(18.62), AZUL = S(19.45), ROJO = S(20.30), CIRCLED = S(20.65), WROTE = S(21.65), WOW = S(24.05), SIGNAL = S(25.11);

// ── 1 · la casa de Ehman de noche ──────────────────────────────────────────────────────────────────────────────────
const casaFondo = () => {
  degradado(0, 0, 319, 104, [hex('#0c0f26'), hex('#121836'), hex('#1a2246'), hex('#242e58'), hex('#323d6c')]);
  for (let k = 0; k < 110; k++) { const x = Math.floor(hs(k, 1, 11) * 320), y = Math.floor(hs(k, 2, 11) * 92); if (tranquila(x, y)) continue; R.pset(x, y, hs(k, 3, 11) > 0.7 ? hex('#c8d0f0') : hex('#6a74a0')); }
  // la luna con su halo
  for (let y = 12; y < 50; y++) for (let x = 204; x < 244; x++) { const d = Math.hypot(x - 224, y - 30) / 18; if (d < 1 && bay(x, y) < (1 - d) * 0.7) R.pset(x, y, mez(R.pget(x, y), hex('#6a76a8'), 0.5)); }
  R.disco(224, 30, 7, hex('#f2ecd0')); R.disco(226, 29, 6.2, hex('#fffbe8')); R.pset(221, 28, hex('#d8d0b0')); R.pset(222, 32, hex('#d8d0b0')); R.pset(225, 33, hex('#e0d8b8')); R.pset(220, 31, hex('#d8d0b0'));
  // el depósito de agua del pueblo y los árboles del fondo
  for (const lx of [22, 30, 38, 46]) R.linea(lx, 98, 34 + (lx - 34) * 0.4, 72, hex('#1c2640'));
  R.linea(24, 86, 44, 86, hex('#1c2640')); R.linea(26, 80, 42, 92, hex('#1c2640'));
  for (let y = 58; y <= 72; y++) { const w = 13 - Math.max(0, y - 68) * 1.6 - Math.max(0, 61 - y) * 2; R.rect(Math.round(34 - w), y, Math.round(34 + w), y, y < 63 ? hex('#26324e') : hex('#1e2844')); }
  R.rect(33, 54, 35, 58, hex('#1e2844'));
  for (let x = 0; x < 320; x++) { const top = Math.round(84 + Math.sin(x * 0.09) * 4 + Math.sin(x * 0.23 + 1) * 3 + hs(x >> 2, 3, 12) * 3);
    for (let y = top; y <= 106; y++) R.pset(x, y, y === top ? hex('#24304c') : (hs(x, y, 13) > 0.85 ? hex('#1e2a44') : hex('#172036'))); }
  // las casas vecinas (izquierda y derecha) y los postes de la luz
  const casita = (x0, x1, yt, yb, techo) => { R.poligono([[x0 - 4, yt + 2], [(x0 + x1) / 2, yt - 14], [x1 + 4, yt + 2]], hex(techo));
    for (let y = yt + 2; y <= yb; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (y - yt) % 4 === 0 ? hex('#262c42') : hex('#30374f'));
    R.linea(x0 - 4, yt + 2, x1 + 4, yt + 2, hex('#454c66')); };
  casita(-4, 66, 100, 140, '#1e1c2a'); casita(266, 330, 104, 140, '#221e2c');
  R.rect(14, 112, 30, 126, K); R.rect(15, 113, 29, 125, hex('#e8b05a')); R.rect(15, 113, 29, 115, hex('#f6d290')); R.rect(22, 113, 22, 125, hex('#8a5a2a')); R.rect(15, 119, 29, 119, hex('#8a5a2a'));
  R.rect(42, 114, 58, 126, K); R.rect(286, 114, 300, 126, K); R.rect(287, 115, 299, 125, hex('#d89a4a')); R.rect(293, 115, 293, 125, hex('#6a4220'));
  R.rect(250, 46, 252, 140, hex('#2a2230')); R.rect(244, 50, 258, 51, hex('#2a2230'));
  for (const [a, b] of [[[0, 58], [244, 50]], [[258, 50], [319, 60]]]) for (let i = 0; i <= 40; i++) { const u = i / 40, x = Math.round(a[0] + (b[0] - a[0]) * u), y = Math.round(a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * 5); if (!tranquila(x, y)) R.pset(x, y, hex('#0a0c18')); }
  // los árboles de los lados de la casa (tapan el patio)
  for (const [cx, cy, r] of [[78, 112, 15], [258, 116, 11]]) { R.rect(cx - 1, cy, cx + 2, 146, hex('#2a1e18'));
    for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r - 3; x <= cx + r + 3; x++) { const d = ((x - cx) / (r + 3)) ** 2 + ((y - cy) / r) ** 2; if (d > 1) continue; const n = hs(x >> 1, y >> 1, 23);
      R.pset(x, y, d > 0.86 ? hex('#0e1a16') : n > 0.72 ? hex('#2a4a36') : n < 0.3 ? hex('#12221c') : hex('#1c3428')); } }
  // la casa de Ehman: tejado de tejas, tablas de la fachada, ventanas encendidas con visillos, la chimenea
  R.rect(204, 58, 216, 80, hex('#5a2e28')); for (let y = 60; y < 80; y += 3) for (let x = 204; x <= 216; x++) if (((x + (y % 6 ? 2 : 0)) % 6) === 0) R.pset(x, y, hex('#3a1e1a')); R.rect(202, 56, 218, 58, hex('#6a3a32'));
  R.poligono([[84, 88], [170, 58], [256, 88]], (x, y) => ((y - 58) % 4 === 0 || ((x + (Math.floor((y - 58) / 4) & 1) * 3) % 7 === 0 && (y - 58) % 4 === 1)) ? hex('#231c2a') : hs(x, y, 14) > 0.9 ? hex('#3c3248') : hex('#2e2638'));
  R.linea(84, 88, 170, 58, hex('#4a4060')); R.linea(170, 58, 256, 88, hex('#1a1420')); R.rect(86, 88, 254, 90, hex('#a8a6a0')); R.rect(86, 91, 254, 91, hex('#3a3a44'));
  for (let y = 92; y <= 146; y++) for (let x = 92; x <= 248; x++) { const r = (y - 92) % 5; R.pset(x, y, r === 0 ? hex('#3e4660') : r === 1 ? hex('#6a7392') : hex('#58617e')); }
  R.rect(92, 92, 95, 146, hex('#8a90a4')); R.rect(245, 92, 248, 146, hex('#8a90a4'));
  const ventana = (x0, y0, x1, y1, k) => { R.rect(x0 - 6, y0, x0 - 2, y1, hex('#1e3a2e')); R.rect(x1 + 2, y0, x1 + 6, y1, hex('#1e3a2e')); for (let y = y0 + 2; y < y1; y += 3) { R.linea(x0 - 6, y, x0 - 2, y, hex('#163024')); R.linea(x1 + 2, y, x1 + 6, y, hex('#163024')); }
    R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#d8d4c8')); degradado(x0, y0, x1, y1, [hex('#f8d890'), hex('#f0c070'), hex('#e0a050')]);
    R.rect(x0, y0, x0 + 6, y1, hex('#d87a3a')); R.rect(x1 - 6, y0, x1, y1, hex('#d87a3a')); for (let y = y0; y <= y1; y += 2) { R.pset(x0 + 3, y, hex('#b85a2a')); R.pset(x1 - 3, y, hex('#b85a2a')); }
    R.rect((x0 + x1) >> 1, y0, (x0 + x1) >> 1, y1, hex('#d8d4c8')); R.rect(x0, (y0 + y1) >> 1, x1, (y0 + y1) >> 1, hex('#d8d4c8')); R.rect(x0 - 3, y1 + 2, x1 + 3, y1 + 3, hex('#b0aca0'));
    if (k === 1) { R.rect(x0 + 12, y1 - 10, x0 + 14, y1, hex('#6a4a30')); R.poligono([[x0 + 8, y1 - 10], [x0 + 18, y1 - 10], [x0 + 16, y1 - 16], [x0 + 10, y1 - 16]], hex('#f8f0d0')); }
    else { R.rect(x1 - 18, y1 - 6, x1 - 12, y1, hex('#8a4a2a')); for (let i = 0; i < 6; i++) R.pset(x1 - 15 + Math.round(Math.sin(i) * 3), y1 - 7 - i, hex('#3a7a3a')); } };
  ventana(104, 100, 136, 124, 0); ventana(198, 100, 232, 124, 1);
  // el porche, la puerta (cerrada en el fondo: se abre en la escena), los escalones, la luz del porche
  R.rect(147, 100, 173, 146, hex('#d8d4c8')); R.rect(150, 103, 170, 146, hex('#6a2e24')); for (const [a, b] of [[106, 120], [125, 142]]) { R.rect(153, a, 159, b, hex('#5a2620')); R.rect(161, a, 167, b, hex('#5a2620')); R.rect(153, a, 159, a, hex('#7a3e30')); R.rect(161, a, 167, a, hex('#7a3e30')); }
  R.rect(166, 124, 167, 125, hex('#e8c060'));
  R.rect(138, 146, 182, 149, hex('#9a9890')); R.rect(138, 146, 182, 146, hex('#c0beb4')); R.rect(142, 150, 178, 153, hex('#8a8880')); R.rect(142, 150, 178, 150, hex('#b0aea4')); R.rect(146, 154, 174, 157, hex('#7a7870')); R.rect(146, 154, 174, 154, hex('#a09e94'));
  R.rect(176, 104, 180, 110, K); R.rect(177, 105, 179, 109, hex('#fff0b0'));
  // el césped, los arbustos, el camino, la acera, el bordillo y la calle
  for (let y = 106; y <= 162; y++) for (let x = 0; x < 320; x++) { if (y < 140 && (x < 66 || x > 266)) continue; if (y < 146 && x >= 92 && x <= 248) continue; const n = hs(x, y, 15); R.pset(x, y, n > 0.82 ? hex('#2e4e34') : n < 0.15 ? hex('#12221a') : hex('#1c3424')); }
  for (let y = 146; y <= 162; y++) for (let x = 66; x <= 266; x++) { const n = hs(x, y, 15); R.pset(x, y, n > 0.82 ? hex('#2e4e34') : n < 0.15 ? hex('#12221a') : hex('#1c3424')); }
  for (let k = 0; k < 160; k++) { const x = Math.floor(hs(k, 4, 16) * 320), y = 141 + Math.floor(hs(k, 5, 16) * 20); R.pset(x, y, hex('#36603e')); R.pset(x, y - 1, hex('#2a4a30')); }
  for (let y = 157; y <= 162; y++) R.rect(150 - (y - 157), y, 170 + (y - 157), y, (y & 1) ? hex('#7a7a7e') : hex('#8a8a8e'));
  const mata = (cx, cy, rx, ry) => { for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d > 1) continue; const n = hs(x >> 1, y >> 1, 17);
    R.pset(x, y, d > 0.85 ? hex('#0e1c14') : n > 0.7 ? hex('#33583c') : n < 0.3 ? hex('#16281c') : hex('#22402a')); } };
  for (const [cx, rx] of [[102, 10], [122, 12], [140, 6], [188, 7], [206, 12], [228, 11], [244, 6]]) mata(cx, 140, rx, 9);
  for (let x = 0; x < 320; x++) { for (let y = 163; y <= 168; y++) R.pset(x, y, (x % 22 === 0) ? hex('#5a5c62') : y === 163 ? hex('#9a9ca2') : hex('#7e8086')); R.pset(x, 169, hex('#b0b2b6')); R.pset(x, 170, hex('#6a6c70'));
    for (let y = 171; y <= 179; y++) R.pset(x, y, hs(x, y, 18) > 0.9 ? hex('#3e4048') : hs(x, y, 19) < 0.05 ? hex('#1a1c22') : hex('#2a2c34')); }
  // el buzón
  R.rect(238, 146, 239, 163, hex('#4a3a2a')); R.rect(233, 139, 244, 146, K); R.rect(234, 140, 243, 145, hex('#3a4a6a')); R.rect(234, 140, 243, 140, hex('#5a6a8a')); R.rect(244, 140, 245, 143, hex('#c83a2a'));
  // la valla blanca de la derecha
  for (let x = 262; x < 320; x += 5) { R.rect(x, 132, x + 2, 150, hex('#9a9ca8')); R.pset(x + 1, 131, hex('#9a9ca8')); R.rect(x + 2, 133, x + 2, 150, hex('#6a6c78')); }
  R.rect(262, 136, 319, 137, hex('#8a8c98')); R.rect(262, 145, 319, 146, hex('#8a8c98'));
};
// el familiar de los setenta con paneles de madera (morro a la derecha)
const familiar = (x, y) => { x = Math.round(x); y = Math.round(y);
  R.poligono([[x + 14, y - 22], [x + 70, y - 22], [x + 78, y - 13], [x + 88, y - 12], [x + 90, y - 2], [x, y - 2], [x, y - 13]], hex('#2a3a5a'));
  R.rect(x + 1, y - 13, x + 89, y - 3, hex('#3a4c70')); R.rect(x + 1, y - 13, x + 89, y - 13, hex('#5a6e94'));
  for (let i = x + 4; i <= x + 84; i++) for (let j = y - 11; j <= y - 5; j++) R.pset(i, j, (j === y - 11 || j === y - 5) ? hex('#d8c8a0') : ((i * 3 + j * 7) % 11 === 0) ? hex('#5a3418') : hex('#7a4a24'));
  R.poligono([[x + 16, y - 21], [x + 68, y - 21], [x + 74, y - 14], [x + 4, y - 14]], hex('#16203a'));
  R.linea(x + 18, y - 20, x + 24, y - 15, hex('#4a5a86')); R.linea(x + 50, y - 20, x + 56, y - 15, hex('#4a5a86'));
  for (const wx of [x + 34, x + 58]) R.rect(wx, y - 21, wx + 1, y - 14, hex('#2a3a5a'));
  R.rect(x - 1, y - 4, x + 91, y - 2, hex('#c8ccd4')); R.rect(x - 1, y - 2, x + 91, y - 2, hex('#7a7e86'));
  for (const rx of [x + 18, x + 72]) { R.disco(rx, y, 6, K); R.disco(rx, y, 4, hex('#3a3a40')); R.disco(rx, y, 2, hex('#a8acb4')); }
  R.rect(x + 88, y - 11, x + 90, y - 8, hex('#e8e0b0')); R.rect(x, y - 11, x + 1, y - 7, hex('#a82a2a')); };
const p1 = (t) => {
  capa('casa', casaFondo);
  // nubes de noche a tres velocidades (lejos, en medio, cerca)
  const NN = [hex('#2a335a'), hex('#3a4672'), hex('#56628e')];
  for (const [x0, y, w, h, v, k] of [[40, 30, 46, 7, 0.8, 1], [190, 18, 40, 6, 1.2, 2], [120, 56, 60, 9, 2.0, 3], [300, 44, 54, 8, 2.6, 4], [-20, 66, 70, 8, 3.4, 5]]) {
    const x = ((x0 + t * v) % 400 + 400) % 400 - 40; nube(x, y, w, h, NN, k); }
  // estrellas que titilan y la luz roja del depósito
  for (let k = 0; k < 24; k++) { const x = Math.floor(hs(k, 7, 21) * 320), y = Math.floor(hs(k, 8, 21) * 80); if (tranquila(x, y) || Math.sin(t * (3 + k % 4) + k) < 0.5) continue; R.pset(x, y, BL); }
  if (Math.floor(t * 1.5) % 2) { R.pset(34, 53, hex('#ff4a3a')); R.pset(33, 53, hex('#a8302a')); R.pset(35, 53, hex('#a8302a')); }
  // la tele del vecino (azul que cambia)
  { const f = hs(Math.floor(t * 6), 1, 22); R.rect(43, 115, 57, 125, f > 0.5 ? hex('#6a9ad8') : f > 0.2 ? hex('#4a6ab0') : hex('#9ac0f0')); R.rect(43, 121, 57, 125, hex('#2a3a6a')); }
  // la puerta: se abre en «Jerry» y sale la luz
  const abre = ease(cl01((t - (JERRY - 0.25)) / 0.4));
  if (abre > 0) {
    degradado(150, 103, 170, 146, [hex('#f8dc98'), hex('#f0c070'), hex('#d8a050')]);
    R.rect(152, 110, 157, 118, hex('#8a5a3a')); R.rect(153, 111, 156, 117, hex('#d8a868'));   // un cuadro del recibidor
    R.rect(166, 106, 167, 132, hex('#6a4a30')); R.rect(164, 108, 169, 109, hex('#6a4a30'));   // el perchero
    const w = Math.round(20 * (1 - abre)), px = 170 - Math.max(3, w);
    R.rect(px, 103, 170, 146, hex('#5a2620')); R.rect(px, 103, px, 146, hex('#7a3e30'));
    // la luz que sale al porche y al camino
    for (let y = 146; y <= 162; y++) { const a = (y - 146) / 16, x0 = 150 - a * 18, x1 = 170 + a * 18; for (let x = Math.round(x0); x <= x1; x++) if (bay(x, y) < 0.55 * abre * (1 - a * 0.6)) tine(x, y, hex('#f0c070'), 0.55); }
  }
  // la luz del porche con sus polillas
  for (let y = 96; y < 124; y++) for (let x = 164; x < 194; x++) { const d = Math.hypot(x - 178, (y - 107) * 1.2) / 15; if (d < 1 && bay(x, y) < (1 - d) * 0.5) tine(x, y, hex('#fff0b0'), 0.35); }
  polilla(178, 106, t, 1, 7); polilla(178, 108, t, 3, 5);
  // Ehman aparece en la puerta y sonríe
  if (abre > 0.6) R.actor(EL.ehmanWO, 153, 146, t, { dir: -1, sonrisa: t < JERRY + 0.6 || t > P2 - 0.6, habla: t > JERRY + 0.6 && t < P2 - 0.6 && Math.sin(t * 14) > 0 });
  // el voluntario: del coche a la puerta con la caja; llama; se la ofrece
  const v = ease(cl01((t - 0.1) / (TOC - 0.2))), vx = Math.round(lerp(100, 128, v)), vy = Math.round(lerp(165, 153, cl01(v * 1.6 - 0.6)));
  const tiende = t > JERRY + 0.3, llama = t > TOC && t < TOC + 0.6;
  const A = R.actor(EL.voluntario1WO, vx, vy, t, { dir: 1, anda: v > 0 && v < 1, sostiene: llama ? undefined : tiende ? [vx + 22, vy - 13] : [vx + 17, vy - 12], dedo: llama, sonrisa: tiende });
  if (!llama && A.mano) cajaListados(A.mano[0] - 6, A.mano[1] + 4, 14, 9);
  else cajaListados(vx + 2, vy, 14, 9);   // mientras llama, la caja en el escalón
  if (llama && Math.sin(t * 30) > 0) { R.pset(vx + 24, vy - 22, BL); R.pset(vx + 25, vy - 24, BL); }
  // el gato que pasa por la valla y se para a mirar la puerta
  const gx = lerp(312, 276, ease(cl01(t / 3.0))); gatito(gx, 131, -1, t, { anda: t < 3.0, fase: t * 7 });
  // las luciérnagas del césped y el familiar aparcado (delante de todo)
  luciernagas(t, 10, 310, 136, 160, 14, 1);
  familiar(4, 176);
};

// ── 2 · la cocina: el voluntario deja la caja y se va; Ehman empieza a repasar ───────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'mesa', luz: 'noche' };
  T.listado(R, t, o);
  const a = t - P2;
  const deja = cl01((a - 0.7) / 0.5), sale = ease(cl01((a - 2.0) / 2.2)), vx = Math.round(lerp(58, -22, sale));
  if (deja < 1) { const A = R.actor(EL.voluntario1WO, vx, 160, t, { dir: 1, sostiene: [vx + 18, 146 + Math.round(deja * 10)], habla: a < 0.6 && Math.sin(t * 13) > 0 }); if (A.mano) cajaListados(A.mano[0] - 6, A.mano[1] + 5, 14, 9); }
  else R.actor(EL.voluntario1WO, vx, 160, t, { dir: sale > 0 ? -1 : 1, anda: sale > 0 && sale < 1, dedo: a > 1.25 && a < 2.0, sonrisa: a > 1.2 });
  if (deja >= 1) cajaListados(72, 160, 14, 9);
  // Ehman: da las gracias (mira al voluntario), luego vuelve al papel y lo repasa con la mano
  const mira = a < 1.9, repasa = !mira;
  const hx = 172 + Math.round(Math.sin(t * 2.2) * 7);
  const E1 = R.actor(EL.ehmanWO, 162, 152, t, { dir: mira ? -1 : 1, sonrisa: a > 0.2 && a < 1.9, habla: a > 0.3 && a < 1.0 && Math.sin(t * 12) > 0, sostiene: repasa ? [hx, 136 + Math.round(Math.sin(t * 1.3) * 2)] : undefined });
  if (repasa && E1.mano) { const [mx, my] = E1.mano; R.rect(mx - 1, my - 12, mx + 8, my + 1, K); R.rect(mx, my - 11, mx + 7, my, hex('#f4efe0')); for (let j = my - 9; j < my; j += 2) R.rect(mx + 1, j, mx + 6, j, (j & 2) ? hex('#a8c8a0') : hex('#8a8478')); R.rect(mx - 1, my - 1, mx + 1, my + 1, hex('#f6c290')); }
  T.listadoDelante(R, t, o);
};

// ── 3 · a ras de suelo: el papel cae y se apila; el gato duerme encima ──────────────────────────────────────────────
const sueloFondo = () => {
  // el tablero visto desde abajo (tranquilo arriba), el canto cromado y la pared del fondo con los muebles bajos
  degradado(0, 0, 319, 22, [hex('#3a2a20'), hex('#463428'), hex('#523e30')]);
  for (let k = 0; k < 8; k++) { const y = 3 + k * 2 + Math.round(hs(k, 1, 31) * 2); for (let x = 180; x < 270; x++) if (hs(x >> 3, k, 32) > 0.4) R.pset(x, y, hex('#4a382c')); }
  R.rect(0, 23, 266, 23, hex('#7a7e86')); R.rect(0, 24, 266, 25, hex('#e8ecf0')); R.rect(0, 26, 266, 27, hex('#a8acb4')); R.rect(0, 28, 266, 28, hex('#5a5e66')); R.rect(267, 23, 268, 28, hex('#5a5e66'));
  for (let x = 0; x < 266; x += 37) R.pset(x, 25, hex('#ffffff'));
  // la pared y los armarios bajos al fondo
  for (let y = 0; y <= 112; y++) for (let x = 0; x < 320; x++) { if (y < 29 && x < 269) continue; const calma = x >= 269 && y <= 50; const p = !calma && ((x + 4) % 16 < 2 || (y - 29) % 16 < 2) ? 1 : 0; R.pset(x, y, y < 70 ? (p ? hex('#c8b48a') : hex('#dcc89c')) : hex('#5a3e28')); }
  for (let x = 0; x < 320; x += 48) { R.rect(x + 2, 72, x + 45, 110, hex('#6a4a30')); R.rect(x + 4, 74, x + 43, 108, hex('#7a5638')); R.rect(x + 4, 74, x + 43, 74, hex('#9a7450')); R.rect(x + 22, 86, x + 25, 88, hex('#c8a060'));
    for (let y = 76; y < 108; y += 3) for (let i = x + 6; i < x + 42; i++) if (hs(i >> 2, y, 33) > 0.6) R.pset(i, y, hex('#6a4a2e')); }
  R.rect(0, 70, 319, 71, hex('#3a2818')); R.rect(0, 110, 319, 112, hex('#2a1c12'));
  // la nevera verde a la izquierda (abajo), con su rejilla
  R.rect(0, 40, 36, 118, K); R.rect(0, 42, 34, 116, hex('#5a7a3a')); R.rect(28, 42, 34, 116, hex('#3e5a28')); R.rect(0, 104, 32, 112, hex('#3a4a2a')); for (let x = 2; x < 32; x += 3) R.rect(x, 105, x, 111, hex('#2a3420')); R.rect(0, 60, 34, 61, hex('#3a4a2a'));
  // el linóleo a cuadros en perspectiva
  for (let y = 113; y <= 179; y++) { const z = (y - 100) / 80, fila = Math.floor(Math.log(y - 100) * 6); for (let x = 0; x < 320; x++) { const col = Math.floor(((x - 160) / (8 + z * 30)) + 100);
    let c = ((fila + col) & 1) ? hex('#c8b48a') : hex('#8a5a34'); if (hs(x, y, 34) > 0.94) c = mez(c, K, 0.2); R.pset(x, y, c); } }
  // la pata cromada de la mesa, la pata de la silla naranja y el cuenco del gato
  R.rect(214, 28, 219, 160, hex('#c8ccd4')); R.rect(214, 28, 215, 160, hex('#f4f6f8')); R.rect(218, 28, 219, 160, hex('#7a7e86')); R.rect(210, 158, 223, 162, hex('#5a5e66'));
  R.rect(244, 60, 296, 66, hex('#e07a2a')); R.rect(244, 60, 296, 60, hex('#f8a050')); R.rect(244, 66, 296, 68, hex('#a04a1a'));
  for (const lx of [250, 290]) { R.rect(lx, 68, lx + 3, 168, hex('#b8bcc4')); R.rect(lx, 68, lx, 168, hex('#eef0f4')); R.rect(lx + 3, 68, lx + 3, 168, hex('#6a6e76')); }
  R.poligono([[228, 166], [248, 166], [245, 172], [231, 172]], hex('#c83a3a')); R.rect(230, 165, 246, 166, hex('#e86a5a')); R.rect(233, 164, 243, 165, hex('#8a6a40'));
  // el cable de la radio que baja por la pared
  for (let y = 40; y < 112; y++) R.pset(186 + Math.round(Math.sin(y * 0.12) * 3), y, hex('#2a2a30'));
};
const p3 = (t) => {
  capa('suelo', sueloFondo);
  const a = t - P3, dur = P4 - P3;
  // el papel que cae por el borde de la mesa (corre hacia abajo) y el montón que crece
  const crece = cl01(a / dur), cima = Math.round(lerp(148, 124, crece));
  const corre = Math.round(a * 16);
  T.piezaListado(R, 40, 28, { s: 2, w: 150, hh: cima - 30, desplaza: 420 - corre, linea: 3, margen: 6, calido: 0.3, sombra: false });
  // la hoja que se dobla al llegar al montón: el pliegue y su sombra
  R.rect(40, cima - 3, 189, cima - 2, hex('#e8e0cc')); R.rect(40, cima - 1, 189, cima - 1, hex('#a8a090'));
  // el montón en zigzag: cada hoja doblada deja su canto claro, su cara y su sombra; las tiras perforadas a los lados
  for (let y = cima; y <= 168; y++) { const k = y - cima, capa3 = Math.floor(k / 3), off = (capa3 & 1) ? 3 : -2, w0 = 32 + off, w1 = 194 + off, r = k % 3;
    for (let x = w0; x <= w1; x++) { const band = (Math.floor((x - w0 - 14) / 12) & 1) && x > w0 + 13 && x < w1 - 13;
      let c = r === 0 ? hex('#fffbf0') : r === 1 ? (band ? hex('#cfe4c6') : hex('#efe8d6')) : hex('#b8ae98');
      if ((x === w0 + 5 || x === w1 - 5) && r === 1) c = hex('#5a5048');
      if (x === w0 || x === w1) c = K; if (r === 2 && (x - w0) % 7 === 0) c = hex('#9a9080'); R.pset(x, y, c); } }
  // una hoja suelta que asoma y la sombra del montón en el suelo
  R.poligono([[188, 158], [214, 166], [206, 170], [184, 164]], hex('#f4efe0')); R.linea(188, 158, 214, 166, hex('#c8bea8'));
  for (let x = 26; x <= 210; x++) for (let y = 169; y <= 173; y++) if (bay(x, y) < 0.6 - (y - 169) * 0.12) tine(x, y, K, 0.35);
  // el gato, dormido encima del montón; en «the usual noise» bosteza y se estira
  gatito(104, cima + 1, 1, t, { duerme: true, s: 2, bosteza: cl01((t - (RUIDO - 0.2)) / 1.1) });
  // la luz y las motas
  for (let y = 28; y < 170; y++) for (let x = 40; x < 190; x++) { const d = Math.abs(x - 102) / (40 + (y - 28) * 0.4); if (d < 1 && bay(x, y) < (1 - d) * 0.35) tine(x, y, hex('#fff2c0'), 0.18); }
  for (let k = 0; k < 9; k++) { const x = Math.round(60 + hs(k, 1, 35) * 90 + Math.sin(t * 0.7 + k) * 5), y = Math.round(40 + ((hs(k, 2, 35) * 120 + t * (3 + k % 3)) % 120)); if (Math.sin(t * 2 + k) > -0.2) tine(x, y, hex('#fff8e0'), 0.6); }
  // la sombra de la polilla que cruza
  { const u = ((t - P3) % 3.2) / 3.2, mx = lerp(-10, 330, u), my = 120 + Math.sin(u * 12) * 10; for (let i = -4; i <= 4; i++) for (let j = -1; j <= 1; j++) tine(Math.round(mx + i), Math.round(my + j - Math.abs(i) * 0.3 * Math.sin(t * 40)), K, 0.25); }
};

// ── 4 · el listado en alto, delante de la lámpara: de pronto, 6EQUJ5 ──────────────────────────────────────────────
const paredFondo = () => {
  // el papel pintado de los setenta (crema con flores naranjas), tranquilo arriba a la derecha y en la barra del año
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = (y < 52 && x > 250) || (y < 24 && x < 180) ? hex('#ece0c4') : hex('#f0e4c8');
    const cx = ((x + (Math.floor(y / 22) & 1) * 11) % 22) - 11, cy = (y % 22) - 11, d = Math.hypot(cx, cy);
    if (!((y < 52 && x > 250) || (y < 24 && x < 180))) { if (d < 6 && d > 3.5) c = hex('#e09a4a'); else if (d <= 3.5 && d > 2) c = hex('#c86a2a'); else if (d <= 2) c = hex('#8a4a1a'); else if (hs(x, y, 41) > 0.95) c = hex('#e4d6b8'); }
    R.pset(x, y, c); }
  // el zócalo de madera abajo y el borde de la mesa
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 154 ? hex('#5a3e28') : hs(x >> 2, y, 42) > 0.7 ? hex('#6a4a30') : hex('#7a5638'));
  // el teléfono de pared naranja con su cordón (derecha)
  R.rect(276, 64, 298, 100, K); R.rect(277, 65, 297, 99, hex('#d86a2a')); R.rect(277, 65, 297, 66, hex('#f09a5a')); R.disco(287, 84, 7, hex('#f4e8d8')); R.disco(287, 84, 3, hex('#d86a2a'));
  for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283; R.pset(Math.round(287 + Math.cos(a) * 5), Math.round(84 + Math.sin(a) * 5), K); }
  R.rect(274, 62, 280, 102, K); R.rect(275, 63, 279, 101, hex('#c85a1a'));
  // el reloj de cocina (izquierda, abajo)
  R.disco(30, 118, 14, K); R.disco(30, 118, 13, hex('#f8a040')); R.disco(30, 118, 10, hex('#fff8e8')); for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; R.pset(Math.round(30 + Math.cos(a) * 8), Math.round(118 + Math.sin(a) * 8), K); }
};
const p4 = (t) => {
  capa('pared', paredFondo);
  // la lámpara de pinza arriba a la izquierda: pantalla verde y su luz
  for (let y = 24; y < 120; y++) for (let x = 0; x < 120; x++) { const d = Math.hypot(x - 40, y - 50) / 70; if (d < 1 && bay(x, y) < (1 - d) * 0.6) tine(x, y, hex('#fff4c8'), 0.4); }
  R.poligono([[22, 48], [56, 48], [50, 34], [28, 34]], hex('#2a7a5a')); R.linea(28, 34, 50, 34, hex('#4aa07a')); R.rect(22, 48, 56, 50, hex('#fff8d0')); R.rect(37, 25, 41, 34, hex('#2a5a44')); R.rect(37, 30, 41, 30, K);
  polilla(40, 54, t, 2, 9);
  // las agujas del reloj (el segundero salta)
  R.linea(30, 118, 30 + Math.round(Math.cos(-1.2) * 6), 118 + Math.round(Math.sin(-1.2) * 6), K); R.linea(30, 118, 34, 117, K);
  { const s = Math.floor(t) / 60 * 6.283 - 1.57; R.linea(30, 118, 30 + Math.round(Math.cos(s) * 9), 118 + Math.round(Math.sin(s) * 9), hex('#c83a2a')); }
  // el cordón del teléfono que se mece
  for (let y = 102; y < 150; y++) { const k = y - 102; R.pset(Math.round(277 + Math.sin(k * 0.9) * 2 + Math.sin(t * 1.5) * k * 0.08), y, (k & 1) ? hex('#c85a1a') : hex('#8a3a10')); }
  // el papel: sube despacio hasta «suddenly»; ahí se para y tiembla; el halo y la marca ámbar carácter a carácter
  const a = t - P4, para = DEPRONTO + 0.1, sube = Math.round(ease(cl01((t - VIO) / 1.5)) * 10), alza = Math.round(Math.sin(t * 2.2) * 1.2);
  const tiembla = t > para && t < para + 0.5 ? Math.round(Math.sin(t * 60)) : 0;
  const X0 = 60 + tiembla, Y0 = 26;
  const g = T.piezaListado(R, X0, Y0, { s: 3, w: 200, hh: 160, desplaza: 30 + sube, linea: 3, margen: 18, calido: 0.25, resalta: ease(cl01((t - DEPRONTO) / 0.6)) });
  // la marca ámbar baja por la secuencia mientras la voz la dice
  if (g.seq && t > CH[0] - 0.15) { const ph = g.paso ? g.paso[1] : 18, x = g.seq[0] - 14, y0 = g.seq[1] - ph * 2.5;
    let k = 0; for (let i = 0; i < 6; i++) if (t > CH[i] - 0.1) k = i;
    const yy = Math.round(y0 + k * ph + Math.sin(t * 10) * 0.5);
    R.poligono([[x - 7, yy - 4], [x, yy], [x - 7, yy + 4]], hex('#e89020')); R.linea(x - 7, yy - 4, x, yy, hex('#a85a10')); R.linea(x - 7, yy + 4, x, yy, hex('#a85a10'));
  }
  // las dos manos que sostienen el papel por los bordes (brazos canónicos desde abajo)
  T.brazo(R, 34, 192, 58 + tiembla, 146 - Math.round(sube * 0.5) + alza, '#5a6a3a', 1);
  T.brazo(R, 292, 192, 262 + tiembla, 146 - Math.round(sube * 0.5) - alza, '#5a6a3a', -1);
};

// ── 5 · desde arriba: el lápiz roto, el azul seco y el rojo; el círculo y el «Wow!» (golpe) ─────────────────────────
const p5 = (t) => {
  const boli = t < LAPIZ ? 0 : t < AZUL ? 1 : t < ROJO ? 2 : 3;
  const g = T.listado(R, t, { encuadre: 'mesa', camara: 'listado', luz: 'noche', boli, resalta: t < P5 + 0.9 ? 1 - ease(cl01((t - P5 - 0.2) / 0.7)) * 0.4 : 0.6,
    rodea: ease(cl01((t - CIRCLED) / 0.95)), wow: cl01((t - WROTE) / (WOW - WROTE)) });
  // el lápiz que se rompe: la punta salta
  if (t > LAPIZ + 0.35 && t < LAPIZ + 0.9 && g.anillo) { const q = (t - LAPIZ - 0.35) / 0.55, x = g.anillo[0] - 60 - q * 20, y = g.anillo[1] + 26 - Math.sin(q * Math.PI) * 14; R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#3a3a44')); R.pset(Math.round(x) + 2, Math.round(y), hex('#e8c89a')); }
  // el golpe del «Wow!»: el círculo y la palabra laten con un aro que se abre
  const p = cl01((t - WOW + 0.05) / 0.9);
  if (p > 0 && p < 1 && g.anillo) { const [cx, cy, rx, ry] = g.anillo; aro(cx, cy, rx, ry, p);
    if (g.wow && p < 0.6) for (let k = 0; k < 6; k++) { const an = k * 1.047 + p * 2, q = 6 + p * 22; R.pset(Math.round(g.wow[0] + Math.cos(an) * q), Math.round(g.wow[1] - 8 + Math.sin(an) * q * 0.6), hex('#ffd890')); } }
};

// ── 6 · a la mañana siguiente: la hoja del «Wow!» clavada en el corcho de la oficina ───────────────────────────────
const corchoFondo = () => {
  // la pared verde clara arriba (tranquila) y a la derecha, con el calendario de agosto y el interruptor
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 26 && x > 274 && y > 52 && ((y - 52) % 12 === 0 || (x + ((y - 52) / 12 & 1) * 10) % 20 === 0) ? hex('#a4b89c') : hex('#b8ccb0'));
  R.rect(282, 60, 314, 104, K); R.rect(283, 61, 313, 103, hex('#f8f4e8')); R.rect(283, 61, 313, 70, hex('#3a6ac8'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { const x = 285 + i * 5, y = 74 + j * 7; R.rect(x, y, x + 2, y + 2, (j === 2 && i === 1) ? hex('#c83a2a') : hex('#8a8478')); }
  R.rect(292, 120, 300, 132, hex('#e8e4d8')); R.rect(295, 123, 297, 129, hex('#c8c4b8'));
  // el marco de madera y el corcho
  R.rect(4, 24, 272, 174, hex('#5a3a20')); R.rect(4, 24, 272, 25, hex('#8a6038')); R.rect(4, 172, 272, 174, hex('#3a2414'));
  for (let y = 30; y <= 168; y++) for (let x = 10; x <= 266; x++) { const n = hs(x, y, 53), m = hs(x >> 1, y >> 1, 54); R.pset(x, y, n > 0.78 ? hex('#d8a468') : n < 0.2 ? hex('#9a6a38') : m > 0.6 ? hex('#c08a50') : hex('#b47e46')); }
  // lo que ya hay clavado: la foto de la gran oreja, el mapa de estrellas, la tabla de turnos, una nota, una postal
  const chin = (x, y, c) => { R.disco(x, y, 2, hex(c)); R.pset(x - 1, y - 1, BL); R.pset(x + 1, y + 2, K); };
  // la foto (polaroid) de la gran oreja
  R.rect(18, 36, 66, 92, hex('#4a3a2a')); R.rect(16, 34, 64, 90, hex('#f8f6ee')); degradado(20, 38, 60, 72, [hex('#7ab0e0'), hex('#a8cce8'), hex('#d8e8f0')]);
  R.rect(20, 66, 60, 74, hex('#6a9a3a')); R.poligono([[22, 70], [32, 52], [35, 54], [26, 72]], hex('#c8ccd4')); R.poligono([[44, 72], [58, 62], [60, 66], [47, 74]], hex('#b0b6c0')); R.rect(26, 72, 47, 73, hex('#e0e4ec')); chin(40, 37, '#3a8a3a');
  // el mapa de estrellas (papel azul con constelaciones)
  R.rect(20, 104, 70, 156, hex('#16204a')); for (let k = 0; k < 40; k++) R.pset(21 + Math.floor(hs(k, 1, 55) * 48), 105 + Math.floor(hs(k, 2, 55) * 50), hs(k, 3, 55) > 0.6 ? BL : hex('#8a9ad0'));
  for (const [a1, b1, a2, b2] of [[28, 114, 40, 120], [40, 120, 50, 116], [50, 116, 58, 126], [32, 140, 44, 146], [44, 146, 60, 140]]) R.linea(a1, b1, a2, b2, hex('#5a6ab0'));
  R.anillo(52, 134, 5, hex('#e8c040'), 3); chin(45, 106, '#e8c040');
  // la tabla de turnos de los voluntarios (rejilla con cifras pequeñas: rayas)
  R.rect(212, 36, 258, 96, hex('#f4f0e4')); for (let j = 0; j < 7; j++) R.rect(214, 44 + j * 7, 256, 44 + j * 7, hex('#a8b0c0')); for (const x of [226, 240]) R.rect(x, 40, x, 94, hex('#a8b0c0'));
  R.rect(212, 36, 258, 41, hex('#3a8a5a')); for (let j = 0; j < 7; j++) for (const x of [216, 230, 244]) if (hs(j, x, 56) > 0.35) R.rect(x, 46 + j * 7, x + 6 + Math.floor(hs(j, x, 57) * 4), 47 + j * 7, hex('#3a3a6a')); chin(235, 37, '#c83a2a');
  // la nota amarilla y la postal del granero
  R.rect(214, 108, 240, 132, hex('#f4e870')); for (let j = 113; j < 130; j += 4) R.rect(217, j, 236, j, hex('#a89a40')); chin(227, 109, '#3a6ac8');
  R.rect(218, 140, 262, 166, hex('#f8f6ee')); degradado(220, 142, 260, 154, [hex('#f0c070'), hex('#f8e0a0')]); R.rect(220, 154, 260, 164, hex('#7a9a3a'));
  R.poligono([[230, 156], [238, 148], [246, 156]], hex('#a83a2a')); R.rect(231, 156, 245, 163, hex('#c84a3a')); R.rect(236, 158, 240, 163, hex('#5a2a1a')); chin(240, 141, '#e8c040');
  // la bandeja del marco con tiza y chinchetas
  R.rect(4, 174, 272, 179, hex('#6a4a2a')); R.rect(4, 174, 272, 174, hex('#9a7048')); for (let k = 0; k < 9; k++) R.pset(30 + k * 7, 176, hex(['#c83a2a', '#3a6ac8', '#e8c040'][k % 3])); R.rect(180, 175, 196, 176, BL);
  R.rect(273, 174, 319, 179, hex('#8a9a82'));
};
const p6 = (t) => {
  capa('corcho', corchoFondo);
  // la luz de la mañana entra por la persiana: franjas en diagonal que se mueven poco a poco
  for (let y = 30; y <= 168; y++) for (let x = 10; x <= 266; x++) { const q = ((x + y * 0.8 + t * 3) % 34); if (q < 12 && bay(x, y) < 0.35) tine(x, y, hex('#fff2c8'), 0.28); }
  // la hoja del «Wow!»: el aire del ventilador le mueve la esquina de abajo
  const g = T.piezaListado(R, 84, 32, { s: 1, w: 120, hh: 132, rodea: 1, wow: 1, linea: 5, margen: 26, sombra: true });
  const ond = Math.sin(t * 5.3) * 0.5 + 0.5, cx0 = 204, cy0 = 164;
  R.poligono([[cx0 - 14 - ond * 4, cy0], [cx0, cy0 - 12 - ond * 4], [cx0, cy0]], hex('#b47e46'));
  R.poligono([[cx0 - 14 - ond * 4, cy0], [cx0, cy0 - 12 - ond * 4], [cx0 - 9, cy0 - 5]], hex('#e8e0cc')); R.linea(cx0 - 14 - ond * 4, cy0, cx0, cy0 - 12 - ond * 4, hex('#a8a090'));
  R.disco(88, 36, 2, hex('#c83a2a')); R.pset(87, 35, BL);
  // «ever since»: el «Wow!» se enciende una vez
  const brilla = cl01((t - (SIGNAL + 0.3)) / 1.2);
  if (brilla > 0 && brilla < 1 && g.cajaWow) { const [x0, y0, x1, y1] = g.cajaWow; for (let y = y0 - 3; y <= y1 + 3; y++) for (let x = x0 - 3; x <= x1 + 3; x++) if (bay(x, y) < Math.sin(brilla * Math.PI) * 0.35) tine(x, y, hex('#ffe0a0'), 0.4); }
  // la mano que clava la última chincheta arriba a la derecha (entra, aprieta y se va)
  const clava = S(25.5), e = ease(cl01((t - (P6 + 0.15)) / 0.6)) - ease(cl01((t - (clava + 0.45)) / 0.7));
  const pinX = 199, pinY = 36;
  if (t > clava) { R.disco(pinX, pinY, 2, hex('#3a6ac8')); R.pset(pinX - 1, pinY - 1, hex('#a8c8f8')); R.pset(pinX + 1, pinY + 2, K); }
  if (e > 0.01) { const aprieta = t > clava - 0.25 && t < clava + 0.15 ? 2 : 0, wx = Math.round(lerp(pinX + 30, pinX + 13, e)) - aprieta, wy = Math.round(lerp(-30, pinY + 8, e));
    if (t < clava) { R.disco(wx - 13, wy - 7, 2, hex('#3a6ac8')); R.pset(wx - 14, wy - 8, hex('#a8c8f8')); }
    T.brazo(R, wx + 16, wy - 50, wx, wy, '#8a5a3a', -1); }
  // una mosca que se posa en la foto, camina y se va
  { const u = ((t - P6) % 3.6) / 3.6, fx = u < 0.25 ? lerp(-6, 40, u / 0.25) : u < 0.7 ? 40 + Math.sin(u * 30) * 2 : lerp(40, 120, (u - 0.7) / 0.3), fy = u < 0.25 ? 20 + u * 200 : u < 0.7 ? 70 : 70 - (u - 0.7) * 160;
    R.pset(Math.round(fx), Math.round(fy), K); R.pset(Math.round(fx) + 1, Math.round(fy), K); if (u < 0.25 || u > 0.7 || Math.sin(t * 50) > 0) { R.pset(Math.round(fx), Math.round(fy) - 1, hex('#c8d8e8')); R.pset(Math.round(fx) + 1, Math.round(fy) - 1, hex('#c8d8e8')); } }
};

const efectos = [[TOC, 'toc'], [JERRY - 0.25, 'puerta'], [P2 + 1.15, 'papel'], [P3 + 0.4, 'papel'], [RUIDO + 0.1, 'miau'], [DEPRONTO + 0.05, 'brillo'],
  [LAPIZ + 0.35, 'golpecito'], [AZUL + 0.15, 'lapiz'], [CIRCLED, 'lapiz'], [WROTE + 0.2, 'lapiz'], [WOW, 'brillo'], [S(25.5), 'golpecito'], [SIGNAL + 0.4, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1977 });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['wo-escala'] = ('La escala', r'''// WO-ESCALA (frases 12–13), año 1977, sin cartela. Seis planos:
// 1. (0) en la sala de los receptores: la tira del listado con 6EQUJ5 pegada con cinta junto al medidor de aguja del
//    receptor; cada carácter se enciende cuando la voz lo dice; en «It's a scale» una mano gira el mando de ganancia y
//    la aguja recorre el 1…9 (cada cifra se enciende al pasar); en «then letters for anything above nine» entra en la
//    zona roja, se enciende el piloto y en la tira se encienden las letras E, Q, U, J; el 6 y el 5 se quedan en ámbar.
// 2. («nine… Each character», 7,04) la escala (listado 'escala' general): un dedo toca cada carácter y su barra crece
//    encima, una tras otra (6, E, Q, la U a medias); la calculadora cuenta; en «background noise» el dedo vuelve a la
//    línea azul del ruido de fondo.
// 3. («And in the middle», 12,82) la feria del condado al atardecer: el martillo de fuerza. Una niña da un golpe flojo
//    (el disco apenas sube a 1: el ruido); en «U» el granjero da el mazazo, el disco sube hasta el 30 en «thirty» y
//    suena la campana; la niña salta, el granjero levanta los brazos; la noria gira, las banderitas se mueven, la gente
//    pasa al fondo; luego el disco baja despacio.
// 4. («What mattered», 18,46) la curva en el monitor de fósforo (listado escala 'curva'): una mano pone en marcha un
//    cronómetro en «rose»; la campana de seis escalones se dibuja y la mano lo para en «seconds».
// 5. («the same shape», 24,16) el cruce de cerca (oreja cinta 'haz'): la campana se dibuja sobre el papel milimetrado
//    mientras el punto cruza el haz en la tarjeta; la mano marca con el lápiz cada lectura de 12 s en el eje del tiempo.
// 6. («A transmitter», 30,08) el campo al atardecer: la gran oreja a la izquierda con su haz que mira al cielo; a la
//    derecha, en una loma, el mástil de una emisora del pueblo que emite anillos siempre iguales que corren a ras de
//    suelo y nunca entran en el haz; un tractor vuelve a casa por el camino, las vacas pastan, salen las primeras
//    estrellas.''', PRE + r'''
// la voz: frase 12 (escala) y frase 13 (curva), en segundos de la escena
const S = (s) => s < 17.5 ? en('escala', (s - 0.9) / 14.632) : en('curva', (s - 18.457) / 14.191);
const P2 = S(7.04), P3 = S(12.82), P4 = S(18.46), P5 = S(24.16), P6 = S(30.08);
const LETRA = [S(0.9), S(1.17), S(1.42), S(1.66), S(1.92), S(2.24)], MENSAJE = S(2.38), ESCALA = S(3.58), NUMEROS = S(4.72), NUEVE = S(5.32), LETRAS = S(5.94), ENCIMA = S(7.04);
const RUIDO = S(10.68), U = S(13.60), TREINTA = S(14.34), ROSE = S(19.96), SEGUNDOS = S(23.08), PASA = S(24.82), GIRA = S(29.14);

// ── 1 · el medidor del receptor y la tira del listado ──────────────────────────────────────────────────────────────
const MC = [185, 124], MR = 66, A0 = -2.76, A1 = -0.38;   // el centro de la aguja, el radio y los ángulos del 0 y del final
const angulo = (v) => A0 + (A1 - A0) * Math.min(13, v) / 13;   // 0…9 y la zona roja hasta 13
const rackFondo = () => {
  // la pared del rack: chapa gris con juntas y tornillos; arriba, tranquila
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = y < 24 ? hex('#4a4e56') : hex('#6a7078'); if (x >= 270 && y <= 48) { R.pset(x, y, c); continue; } if (y >= 24 && ((y - 24) % 40 === 0)) c = hex('#3a3e46'); else if (y >= 24 && (y - 24) % 40 === 1) c = hex('#8a9098'); else if (y >= 24 && hs(x, y, 61) > 0.96) c = hex('#767c84'); R.pset(x, y, c); }
  for (let y = 30; y < 160; y += 40) for (const x of [108, 262]) { R.disco(x, y, 1.6, hex('#9aa0a8')); R.pset(x, y, hex('#3a3e46')); }
  // el medidor grande: bisel negro, esfera crema, arco de 1 a 9 con sus cifras y la zona roja
  R.rect(116, 36, 256, 132, K); R.rect(118, 38, 254, 130, hex('#2a2a30')); R.rect(122, 42, 250, 126, hex('#f2ead0')); R.rect(122, 42, 250, 46, hex('#fffbe8'));
  for (let k = 0; k <= 13; k++) { const a = angulo(k), r0 = k % 1 === 0 ? MR - 7 : MR - 4; R.linea(MC[0] + Math.cos(a) * r0, MC[1] + Math.sin(a) * r0, MC[0] + Math.cos(a) * MR, MC[1] + Math.sin(a) * MR, k > 9 ? hex('#c83a2a') : K); }
  for (let a = angulo(9); a <= A1; a += 0.004) for (let r = MR - 3; r <= MR + 2; r++) R.pset(Math.round(MC[0] + Math.cos(a) * r), Math.round(MC[1] + Math.sin(a) * r), hex('#d83a2a'));
  for (let a = A0; a <= angulo(9); a += 0.004) R.pset(Math.round(MC[0] + Math.cos(a) * (MR + 1)), Math.round(MC[1] + Math.sin(a) * (MR + 1)), K);
  for (let k = 0; k <= 9; k++) { const a = angulo(k); cifras(String(k), MC[0] + Math.cos(a) * (MR - 15), MC[1] + Math.sin(a) * (MR - 15) - 4, hex('#2a2a30'), 2); }
  R.rect(123, 116, 249, 125, hex('#e4dcc0')); R.disco(MC[0], MC[1], 6, K); R.disco(MC[0], MC[1], 4, hex('#3a3a44'));
  // el piloto rojo (apagado) a la derecha del medidor y los mandos de abajo
  R.disco(270, 60, 6, K); R.disco(270, 60, 5, hex('#6a2020'));
  R.rect(116, 134, 256, 158, hex('#5a5e66')); R.rect(116, 134, 256, 134, hex('#8a9098'));
  for (const [x, r] of [[140, 6], [230, 6]]) { R.disco(x, 146, r + 1, K); R.disco(x, 146, r, hex('#3a3a40')); R.pset(x - 2, 143, hex('#8a8a90')); }
  for (const x of [160, 168, 202, 210]) { R.rect(x, 140, x + 4, 152, K); R.rect(x + 1, 141, x + 3, 146, hex('#c8ccd4')); }
  // la mesa de madera con la regla de cálculo, la taza y el cuaderno de guardia
  for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 158 ? hex('#a87a4a') : hs(x >> 3, y, 62) > 0.65 ? hex('#7a5232') : hex('#8a5e3a'));
  R.rect(150, 166, 262, 172, K); R.rect(151, 167, 261, 171, hex('#f0e4c0')); for (let x = 154; x < 260; x += 4) R.rect(x, 167, x, x % 12 === 2 ? 170 : 168, K); R.rect(196, 167, 206, 171, hex('#c8d8e8'));
  R.rect(272, 150, 290, 170, K); R.rect(273, 151, 289, 169, hex('#d8d0c0')); R.rect(273, 151, 289, 153, hex('#5a3a20')); R.rect(290, 156, 294, 164, K);
  R.rect(298, 160, 319, 179, hex('#3a5a8a')); R.rect(298, 160, 319, 161, hex('#5a7aaa'));
  // la cinta de pintor que sujeta la tira
  R.rect(16, 24, 104, 172, hex('#4a4e56'));
};
const p1 = (t) => {
  capa('rack', rackFondo);
  // la tira del listado (ya rodeada), pegada con cinta
  const g = T.piezaListado(R, 18, 32, { s: 2, w: 84, hh: 140, linea: 4, col: 0, margen: 4, rodea: 1, sombra: true });
  for (const [x, y] of [[26, 32], [84, 32], [26, 168], [84, 168]]) { R.rect(x - 7, y - 3, x + 7, y + 3, hex('#e8dcb0')); R.rect(x - 7, y - 3, x + 7, y - 3, hex('#f8f0d0')); }
  // cada carácter se enciende cuando la voz lo dice; después, las letras en rojo y las cifras en ámbar
  if (g.seq) { const ph = g.paso ? g.paso[1] : 12;
    for (let k = 0; k < 6; k++) { const y = Math.round(g.seq[1] + (k - 2.5) * ph), x = g.seq[0];
      const dicho = t > LETRA[k] - 0.05 && t < LETRA[k] + 0.35, letra = k >= 1 && k <= 4, rojo = letra && t > LETRAS;
      const amb = !letra && t > NUMEROS;
      if (dicho || rojo || amb) { const c = rojo ? hex('#e83a2a') : hex('#f0a020'), r = dicho ? 7 : 6;
        for (let i = -r; i <= r; i++) { R.pset(x + i, y - r, c); R.pset(x + i, y + r - 1, c); } for (let j = -r; j < r; j++) { R.pset(x - r, y + j, c); R.pset(x + r, y + j, c); }
        if (dicho) for (let j = -r + 1; j < r - 1; j++) for (let i = -r + 1; i < r; i++) if (bay(x + i, y + j) < 0.3) tine(x + i, y + j, hex('#ffe080'), 0.5); } } }
  // la aguja: tiembla en el ruido; con el mando sube por las cifras y, en «letters», entra en la zona roja
  const gira = ease(cl01((t - ESCALA) / (NUEVE + 0.3 - ESCALA))), roja = ease(cl01((t - LETRAS) / 0.9));
  const v = 0.6 + Math.sin(t * 23) * 0.15 + Math.sin(t * 7) * 0.1 + gira * 8.4 + roja * 3.2;
  for (let k = 1; k <= 9; k++) if (v > k - 0.2 && t > ESCALA) { const a = angulo(k); cifras(String(k), MC[0] + Math.cos(a) * (MR - 15), MC[1] + Math.sin(a) * (MR - 15) - 4, hex('#e07a10'), 2); }
  const a = angulo(v); R.linea(MC[0], MC[1], MC[0] + Math.cos(a) * (MR - 2), MC[1] + Math.sin(a) * (MR - 2), K); R.linea(MC[0] + 1, MC[1], MC[0] + 1 + Math.cos(a) * (MR - 4), MC[1] + Math.sin(a) * (MR - 4), hex('#3a3a44'));
  R.disco(MC[0], MC[1], 3, hex('#c83a2a'));
  // el reflejo del cristal
  for (let i = 0; i < 26; i++) { R.pset(130 + i, 50 + Math.round(i * 0.3), hex('#fffcf0')); }
  // el piloto rojo: se enciende y parpadea en la zona roja
  if (roja > 0.5 && Math.floor(t * 5) % 2) { R.disco(270, 60, 5, hex('#ff4a3a')); R.pset(268, 58, BL); for (let y = 50; y < 71; y++) for (let x = 260; x < 281; x++) if (Math.hypot(x - 270, y - 60) < 10 && bay(x, y) < 0.3) tine(x, y, hex('#ff8a6a'), 0.4); }
  // pilotos pequeños del rack que parpadean y la bobina que da tirones (vida)
  for (let k = 0; k < 6; k++) { const on = Math.sin(t * (2 + k) + k) > 0; R.rect(274 + (k % 3) * 10, 90 + Math.floor(k / 3) * 10, 277 + (k % 3) * 10, 93 + Math.floor(k / 3) * 10, on ? hex(['#4ae84a', '#e8c040', '#4ae84a'][k % 3]) : hex('#2a3a2a')); }
  // el mando: la mano entra en «isn't a message» y lo gira en «It's a scale»
  const ang = -2.4 + gira * 2.6 + roja * 0.9;
  R.linea(230, 146, 230 + Math.round(Math.cos(ang) * 5), 146 + Math.round(Math.sin(ang) * 5), hex('#f4f0e8'));
  const e = ease(cl01((t - MENSAJE) / 0.9));
  if (e > 0) { const wx = Math.round(lerp(300, 243, e) + Math.sin(gira * 9) * 1), wy = Math.round(lerp(196, 150, e)); T.brazo(R, wx + 30, wy + 40, wx, wy, '#3a5a7a', -1); }
  // el vapor de la taza
  for (let k = 0; k < 5; k++) { const q = (t * 0.7 + k / 5) % 1, x = Math.round(281 + Math.sin(q * 7 + k) * 2), y = Math.round(149 - q * 14); tine(x, y, BL, 0.45 * (1 - q)); }
};

// ── 2 · la escala: un dedo toca cada carácter y su barra crece ─────────────────────────────────────────────────────
const p2 = (t) => {
  const u = Math.min(0.35, cl01((t - (P2 + 0.2)) / (S(12.4) - P2 - 0.2)) * 0.35);
  const g = T.listado(R, t, { encuadre: 'escala', u });
  const cols = g.cols || [73, 103, 133, 163, 193, 223], base = g.base || 133;
  // la barra que está creciendo y el dedo que toca su carácter; en «background noise», la línea del ruido
  const k = Math.min(3, Math.floor(u / 0.1 + 0.001));
  let tx = cols[k], ty = base + 12;
  const ruido = cl01((t - (RUIDO - 0.3)) / 0.4) * (1 - cl01((t - (RUIDO + 0.9)) / 0.4));
  if (ruido > 0) { tx = lerp(tx, 236, ruido); ty = lerp(ty, base - 4, ruido); }
  const golpe = Math.abs(Math.sin(t * 7)) < 0.3 ? 1 : 0;
  T.brazo(R, Math.round(tx) + 44, 204, Math.round(tx) + 10, Math.round(ty) + 8 + golpe, '#3a5a7a', -1);
  if (ruido > 0.6) for (let x = 226; x < 246; x++) if ((x >> 1) & 1) R.pset(x, base - Math.round(96 / 30), hex('#7aa0f8'));
};

// ── 3 · la feria del condado: el martillo de fuerza llega al 30 ────────────────────────────────────────────────────
const TORRE = [247, 38, 148];   // x del canal, y de arriba (30), y de abajo (0)
const yNivel = (v) => Math.round(TORRE[2] - (TORRE[2] - TORRE[1]) * v / 30);
const feriaFondo = () => {
  degradado(0, 0, 319, 104, [hex('#2a2452'), hex('#4a3470'), hex('#7a4a7a'), hex('#c06a6a'), hex('#f09a5a'), hex('#f8c070')]);
  for (let k = 0; k < 30; k++) { const x = Math.floor(hs(k, 1, 71) * 320), y = Math.floor(hs(k, 2, 71) * 40); if (!tranquila(x, y)) R.pset(x, y, hex('#b8a8d8')); }
  // el sol que se pone detrás de los árboles
  R.disco(196, 100, 12, hex('#f8d890')); R.disco(196, 100, 10, hex('#fff0c0'));
  for (let x = 0; x < 320; x++) { const top = Math.round(96 + Math.sin(x * 0.07) * 4 + hs(x >> 2, 1, 72) * 4); for (let y = top; y <= 112; y++) R.pset(x, y, y === top ? hex('#5a3a5a') : hex('#3a2a44')); }
  // la grada de madera y el granero al fondo
  R.poligono([[100, 112], [104, 92], [150, 92], [154, 112]], hex('#4a3a4a')); for (let y = 95; y < 112; y += 3) R.linea(103, y, 151, y, hex('#6a5260'));
  R.rect(268, 92, 312, 112, hex('#7a2a2a')); R.poligono([[264, 92], [290, 78], [316, 92]], hex('#4a2a2a')); R.rect(284, 98, 296, 112, hex('#5a1a1a')); R.linea(284, 98, 296, 112, hex('#e8d8c0')); R.linea(296, 98, 284, 112, hex('#e8d8c0'));
  // el suelo: hierba pisada, tierra, paja, conos de palomitas y entradas tiradas
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hs(x, y, 73), m = hs(x >> 3, y >> 2, 74); R.pset(x, y, m > 0.62 ? (n > 0.5 ? hex('#8a6a4a') : hex('#7a5a3a')) : n > 0.85 ? hex('#7a8a3a') : n < 0.1 ? hex('#3a4a20') : hex('#566a2c')); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(hs(k, 3, 75) * 320), y = 116 + Math.floor(hs(k, 4, 75) * 62); R.linea(x, y, x + 2, y - 1, hex('#e8c860')); }
  for (const [x, y, c] of [[60, 166, '#e83a3a'], [140, 172, '#f4f0e0'], [176, 150, '#e8c040'], [96, 140, '#f4f0e0']]) { R.rect(x, y, x + 3, y + 2, hex(c)); R.pset(x, y, BL); }
  // la carpa de rayas
  R.poligono([[150, 120], [158, 86], [210, 86], [218, 120]], (x, y) => ((x >> 3) & 1) ? hex('#e8e0d0') : hex('#c83a3a'));
  R.poligono([[154, 88], [184, 66], [214, 88]], (x, y) => ((x >> 3) & 1) ? hex('#f4ece0') : hex('#d84a4a')); R.rect(183, 58, 184, 66, K); R.poligono([[184, 58], [192, 60], [184, 62]], hex('#3a6ac8'));
  R.rect(176, 100, 192, 120, hex('#3a2020')); R.rect(176, 100, 192, 101, hex('#5a3030'));
  // el martillo de fuerza: el tablero blanco con las marcas, el 10, el 20 y el 30, la línea azul del 1, la campana y la base
  R.rect(240, 34, 254, 150, K); R.rect(241, 35, 253, 149, hex('#f4f0e4')); R.rect(241, 35, 253, 52, hex('#e83a3a')); R.rect(246, 36, 248, 148, hex('#a8a090'));
  for (let v = 0; v <= 30; v += 2) { const y = yNivel(v); R.rect(241, y, v % 10 === 0 ? 245 : 243, y, K); }
  for (const v of [10, 20, 30]) R.numero(String(v), 236, yNivel(v) + 4, { centro: true, rampa: [hex('#f8e8c0'), hex('#e8c060')] });
  R.rect(238, yNivel(1), 256, yNivel(1), hex('#3a6ac8')); R.rect(238, yNivel(1) + 1, 256, yNivel(1) + 1, hex('#7aa0f8'));
  R.rect(244, 26, 250, 34, hex('#5a4a2a')); R.disco(247, 28, 6, K); R.disco(247, 28, 5, hex('#e8b040')); R.pset(245, 26, hex('#fff0a0')); R.rect(242, 28, 252, 30, hex('#c89020'));
  R.rect(226, 150, 268, 158, hex('#6a4a2a')); R.rect(226, 150, 268, 150, hex('#9a7048')); R.rect(238, 146, 256, 150, K); R.rect(239, 147, 255, 149, hex('#3a3a40'));
  // la bala de paja delante a la izquierda
  R.rect(2, 150, 50, 176, hex('#c8a040')); for (let y = 152; y < 176; y += 2) for (let x = 3; x < 50; x++) if (hs(x, y, 76) > 0.4) R.pset(x, y, hex('#e0c060')); R.rect(2, 158, 50, 159, hex('#8a6a2a')); R.rect(2, 168, 50, 169, hex('#8a6a2a'));
};
// el mazo (o la mazuela de la niña): el mango sale de la mano hacia ang; la cabeza al final
const mazo = (x, y, ang, L, cab) => { const ex = x + Math.cos(ang) * L, ey = y + Math.sin(ang) * L; R.linea(x, y, ex, ey, hex('#8a5a2a')); R.linea(x + 1, y, ex + 1, ey, hex('#c8955a'));
  const nx = -Math.sin(ang), ny = Math.cos(ang); R.poligono([[ex + nx * cab, ey + ny * cab], [ex - nx * cab, ey - ny * cab], [ex - nx * cab + Math.cos(ang) * 5, ey - ny * cab + Math.sin(ang) * 5], [ex + nx * cab + Math.cos(ang) * 5, ey + ny * cab + Math.sin(ang) * 5]], hex('#6a3a1a'));
  R.linea(ex + nx * cab, ey + ny * cab, ex - nx * cab, ey - ny * cab, hex('#9a6a3a')); };
const p3 = (t) => {
  capa('feria', feriaFondo);
  // nubes rosadas a tres velocidades y vencejos
  const NC = [hex('#7a4a7a'), hex('#c87a8a'), hex('#f8b8a0')];
  for (const [x0, y, w, h, v, k] of [[20, 34, 50, 7, 1.0, 1], [200, 22, 40, 6, 1.6, 2], [110, 56, 64, 8, 2.4, 3]]) nube(((x0 + t * v) % 380) - 30, y, w, h, NC, k);
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 22 + k * 70) % 360) - 20), y = 60 + k * 9 + Math.round(Math.sin(t * 3 + k) * 3), ar = Math.sin(t * 18 + k) > 0 ? -1 : 1; if (!tranquila(x, y)) { R.linea(x - 3, y + ar, x, y, K); R.linea(x, y, x + 3, y + ar, K); } }
  // la noria que gira con sus luces y sus barquillas
  const [nx, ny, nr] = [64, 70, 40];
  R.linea(nx, ny, nx - 22, 118, hex('#5a4a6a')); R.linea(nx, ny, nx + 22, 118, hex('#5a4a6a')); R.linea(nx - 1, ny, nx - 23, 118, hex('#7a6a8a'));
  for (let a = 0; a < 6.283; a += 0.01) R.pset(Math.round(nx + Math.cos(a) * nr), Math.round(ny + Math.sin(a) * nr), hex('#e8e0f0'));
  for (let k = 0; k < 12; k++) { const a = t * 0.35 + k / 12 * 6.283, x = nx + Math.cos(a) * nr, y = ny + Math.sin(a) * nr; R.linea(nx, ny, x, y, hex('#b8a8c8'));
    if (Math.sin(t * 4 + k * 1.3) > 0) R.pset(Math.round(nx + Math.cos(a + 0.26) * nr), Math.round(ny + Math.sin(a + 0.26) * nr), hex(['#ffe070', '#ff7a7a', '#7ae0ff'][k % 3]));
    if (k % 2 === 0) { const bx = Math.round(x), by = Math.round(y) + 2; R.rect(bx - 3, by, bx + 3, by + 5, K); R.rect(bx - 2, by + 1, bx + 2, by + 4, hex(['#e84a4a', '#3a8ae8', '#e8c040'][k % 3])); } }
  R.disco(nx, ny, 3, hex('#f8f0d0'));
  // las banderitas que se mecen
  for (let i = 0; i <= 26; i++) { const u = i / 26, x = Math.round(lerp(100, 236, u)), y = Math.round(80 + Math.sin(u * Math.PI) * 8 + Math.sin(t * 2 + u * 6) * 1); R.pset(x, y, hex('#3a2a3a'));
    if (i % 2 === 0 && i < 26) { const fl = Math.sin(t * 5 + i) > 0 ? 1 : 0; R.poligono([[x, y + 1], [x + 4, y + 1], [x + 2 + fl, y + 6]], hex(['#e83a3a', '#e8c040', '#3a8ae8', '#4ab84a'][(i / 2) % 4])); } }
  // la gente que pasa al fondo (pequeña)
  for (let k = 0; k < 6; k++) { const d = k % 2 ? 1 : -1, x = Math.round((((d > 0 ? t * 8 : -t * 8) + k * 61) % 340 + 340) % 340) - 10, y = 124 + (k % 3) * 3; if (x > 140 && x < 220) continue;
    const c = hex(['#3a6ac8', '#c83a3a', '#e8c040', '#4a9a4a', '#8a4ac8', '#e87a3a'][k]); R.rect(x - 1, y - 9, x + 1, y - 7, hex('#f0c090')); R.rect(x - 2, y - 6, x + 2, y - 2, c); const p = Math.floor(t * 6 + k) % 2; R.pset(x - 1, y - 1 + p, K); R.pset(x + 1, y - p, K); }
  // el disco rojo del martillo: la niña lo sube a 1; el granjero, a 30 en «thirty»; luego baja despacio
  const NI = P3 + 0.25, cayo = NI + 0.6;
  let v = 0; if (t > NI && t < cayo) v = Math.sin(cl01((t - NI) / 0.6) * Math.PI) * 1.4;
  if (t >= U) { const sube = 1 - (1 - cl01((t - U) / (TREINTA - U))) ** 2, baja = ease(cl01((t - (TREINTA + 1.6)) / 2.4)); v = 30 * sube * (1 - baja); }
  const py = yNivel(v); R.rect(243, py - 3, 251, py + 1, K); R.rect(244, py - 2, 250, py, hex('#e83a3a')); R.pset(244, py - 2, hex('#ff9a8a'));
  // la campana: destello, ondas y el 30 que se enciende
  const ding = cl01((t - TREINTA) / 1.4);
  if (ding > 0 && ding < 1) { for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283, r0 = 8 + ding * 6, r1 = 12 + ding * 12; R.linea(247 + Math.cos(a) * r0, 28 + Math.sin(a) * r0, 247 + Math.cos(a) * r1, 28 + Math.sin(a) * r1, hex('#fff0a0')); }
    R.numero('30', 208, 56, { tam: 16, centro: true }); }
  // las luces de la carpa que corren
  for (let i = 0; i < 9; i++) { const on = (Math.floor(t * 6) + i) % 3 === 0 || (ding > 0 && ding < 1); R.pset(158 + i * 6, 86, on ? hex('#fff070') : hex('#8a7a40')); }
  // la niña: golpe flojo; luego mira arriba, salta y sonríe cuando suena la campana
  const salta = t > TREINTA && t < TREINTA + 1.2 ? Math.round(Math.abs(Math.sin((t - TREINTA) * 7)) * 4) : 0;
  const nGolpe = cl01((t - (NI - 0.25)) / 0.25), nAng = t < NI ? lerp(-2.2, -0.2, nGolpe) : t < cayo + 0.3 ? -0.15 : -1.6;
  const Nn = R.actor(EL.nina, 214, 160, t, { dir: 1, sostiene: t < cayo + 0.3 ? [228, 148 - Math.round((1 - nGolpe) * 6)] : undefined, salto: salta, sonrisa: t > TREINTA, sorpresa: t > U + 0.2 && t < TREINTA });
  if (t < cayo + 0.3 && Nn.mano) mazo(Nn.mano[0], Nn.mano[1], nAng, 9, 2); else mazo(206, 160, 0, 9, 2);
  // el granjero: levanta el mazo, da el mazazo en «U» y levanta los brazos cuando suena
  const alza = ease(cl01((t - (U - 0.55)) / 0.35)), baja = cl01((t - (U - 0.12)) / 0.12), arriba = t > TREINTA + 0.1 && t < TREINTA + 1.4;
  const gAng = t < U - 0.12 ? lerp(-1.9, -0.6, 1 - alza) * -1 - 3.14 * alza * 0 : 0;
  const G = R.actor(EL.granjero, 264, 160, t, { dir: -1, brazos: arriba, sonrisa: t > TREINTA, habla: t > TREINTA + 1.6 && t < TREINTA + 2.4 && Math.sin(t * 11) > 0, sostiene: arriba ? undefined : t < U - 0.12 ? [262 - Math.round(alza * 2), 140 - Math.round(alza * 10)] : [258, 148] });
  if (arriba) mazo(276, 160, 3.14, 14, 3);
  if (!arriba && G.mano) { const ang = t < U - 0.12 ? lerp(3.4, 4.6, alza) : lerp(4.6, 2.75, baja); mazo(G.mano[0], G.mano[1], t > U + 0.4 ? 2.4 : ang, 15, 3); }
  if (t > U - 0.02 && t < U + 0.25) for (let k = 0; k < 6; k++) { const a = -2.6 + k * 0.4; R.linea(247 + Math.cos(a) * 6, 146 + Math.sin(a) * 6, 247 + Math.cos(a) * 12, 146 + Math.sin(a) * 12, hex('#fff0a0')); }
  // una vecina que mira desde la carpa y aplaude en la campana
  R.actor(EL.vecina, 168, 136, t, { dir: 1, sorpresa: ding > 0 && ding < 0.5, sonrisa: ding >= 0.5, brazos: ding > 0.1 && ding < 0.6 && Math.sin(t * 16) > 0 });
};

// ── 4 · la curva en el monitor y el cronómetro ────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const u = cl01((t - ROSE) / (SEGUNDOS - ROSE));
  T.listado(R, t, { encuadre: 'escala', camara: 'curva', u });
  // el cronómetro en la mano (abajo a la derecha): se pone en marcha en «rose» y se para en «seconds»
  const e = ease(cl01((t - P4) / 0.7)), wx = Math.round(lerp(330, 292, e)), wy = Math.round(lerp(200, 160, e));
  T.brazo(R, wx + 34, wy + 40, wx, wy, '#3a5a7a', -1);
  const cx = wx - 12, cy = wy - 9, corre = t > ROSE && t < SEGUNDOS, aguja = (t < ROSE ? 0 : Math.min(t, SEGUNDOS) - ROSE) / (SEGUNDOS - ROSE) * 72 / 60 * 6.283 - 1.571;
  R.disco(cx, cy, 10, K); R.disco(cx, cy, 9, hex('#c8ccd4')); R.disco(cx, cy, 7, hex('#f8f6ee')); R.rect(cx - 1, cy - 14, cx + 1, cy - 10, hex('#a8acb4')); R.rect(cx - 2, cy - 15, cx + 2, cy - 14, K);
  for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; R.pset(Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), K); }
  R.linea(cx, cy, cx + Math.round(Math.cos(aguja) * 6), cy + Math.round(Math.sin(aguja) * 6), hex('#c83a2a')); R.pset(cx, cy, K);
  if (Math.abs(t - ROSE) < 0.15 || Math.abs(t - SEGUNDOS) < 0.15) { R.rect(cx - 1, cy - 16, cx + 1, cy - 16, hex('#fff0a0')); R.pset(cx - 3, cy - 17, hex('#fff0a0')); R.pset(cx + 3, cy - 17, hex('#fff0a0')); }
  // dedo del pulgar sobre el botón
  R.rect(cx + 2, cy - 15, cx + 4, cy - 13, hex('#f6c290')); R.pset(cx + 4, cy - 15, K);
  if (corre && Math.floor(t * 2) % 2) R.pset(cx + 7, cy - 7, hex('#e83a3a'));
};

// ── 5 · el cruce de cerca: la mano marca cada lectura en el eje ─────────────────────────────────────────────────────
const p5 = (t) => {
  const u = cl01((t - (P5 + 0.2)) / (GIRA - P5 - 0.2));
  const g = T.oreja(R, t, { encuadre: 'cinta', camara: 'haz', u });
  const [x0, , x1, y1] = g.curva || [40, 36, 226, 150];
  const px = g.punta ? g.punta[0] : lerp(x0, x1, u);
  // las marcas de lápiz que ya ha hecho en el eje (cada 30 px = 12 s)
  for (let k = 0; k <= 6; k++) { const mx = 44 + k * 30; if (mx <= px) { R.linea(mx - 2, y1 + 3, mx + 2, y1 + 5, hex('#3a3a44')); R.linea(mx + 2, y1 + 3, mx - 2, y1 + 5, hex('#3a3a44')); } }
  // el lápiz sigue a la punta por el eje y da un golpecito en cada marca
  const cerca = Math.min(...[0, 1, 2, 3, 4, 5, 6].map((k) => Math.abs(px - (44 + k * 30)))), toque = cerca < 3 ? 2 : 0;
  const tx = Math.round(px), ty = y1 + 3 + toque;
  lapiz(tx, ty, 0.9, 22, 0);
  T.brazo(R, tx + 40, ty + 46, tx + 13, ty + 16, '#3a5a7a', -1);
  lapiz(tx, ty, 0.9, 9, 0);
};

// ── 6 · el campo al atardecer: la gran oreja mira al cielo; la emisora del pueblo emite a ras de suelo ───────────────
const campoFondo = () => {
  degradado(0, 0, 319, 112, [hex('#1e2250'), hex('#2e2e66'), hex('#4a3a7a'), hex('#8a5a8a'), hex('#d0806a'), hex('#f0b070')]);
  for (let k = 0; k < 40; k++) { const x = Math.floor(hs(k, 1, 81) * 320), y = Math.floor(hs(k, 2, 81) * 50); if (!tranquila(x, y)) R.pset(x, y, hex('#a8b0e0')); }
  // colinas lejanas y bosquecillos
  for (let x = 0; x < 320; x++) { const top = Math.round(104 + Math.sin(x * 0.03) * 5 + Math.sin(x * 0.11) * 2); for (let y = top; y <= 120; y++) R.pset(x, y, y === top ? hex('#6a5a7a') : hex('#4a4a6a')); }
  for (let x = 0; x < 320; x++) { const top = Math.round(114 + Math.sin(x * 0.05 + 2) * 4 + (hs(x >> 2, 1, 82) > 0.7 ? -4 : 0)); for (let y = top; y <= 124; y++) R.pset(x, y, hex('#3a4a3a')); }
  // los campos: maizal a franjas, pradera, el camino de tierra
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 124) / 56; let c = ((Math.floor((x + y * 1.5) / (4 + z * 10))) & 1) ? hex('#6a8a3a') : hex('#5a7a32'); if (y > 150) c = hs(x, y, 83) > 0.8 ? hex('#8aa04a') : hex('#729040'); if (hs(x, y, 84) > 0.95) c = hex('#a8b860'); R.pset(x, y, c); }
  for (let y = 148; y < 160; y++) for (let x = 0; x < 320; x++) R.pset(x, y + Math.round(Math.sin(x * 0.02) * 2), hs(x, y, 85) > 0.85 ? hex('#a88a5a') : hex('#c0a070'));
  // la gran oreja a la izquierda: el plano inclinado de celosía, el suelo de metal que brilla y el curvo; la caseta
  R.poligono([[10, 132], [24, 92], [34, 92], [22, 134]], hex('#b8bcc6'));
  for (let i = 0; i <= 8; i++) { const u = i / 8; R.linea(10 + u * 14, 132 - u * 40, 22 + u * 12, 134 - u * 42, hex('#e8ecf2')); }
  for (let i = 0; i < 5; i++) R.linea(12 + i * 2.5, 128 - i * 9, 26 + i * 2, 120 - i * 7, hex('#8a8e98'));
  R.linea(10, 132, 24, 92, hex('#f4f6fa')); R.linea(34, 92, 22, 134, hex('#6a6e78'));
  R.rect(22, 132, 96, 136, hex('#d8dee8')); for (let x = 24; x < 96; x += 6) R.pset(x, 134, hex('#f8fbff')); R.rect(22, 137, 96, 137, hex('#7a808a'));
  for (let y = 112; y <= 136; y++) { const w = 3 + (136 - y) * 0.15; const x0 = 96 - Math.pow((136 - y) / 24, 2) * 8; R.rect(Math.round(x0), y, Math.round(x0 + w), y, (y & 3) ? hex('#a8aeb8') : hex('#7a808a')); }
  R.rect(100, 128, 110, 136, hex('#c8c0a8')); R.rect(100, 127, 110, 127, hex('#8a8478')); R.pset(104, 131, hex('#f8d070'));
  // el pueblo en la loma de la derecha: casitas con luz, el silo, árboles y el mástil de celosía de la emisora
  R.poligono([[188, 126], [232, 108], [300, 110], [319, 120], [319, 126]], hex('#4a5a3a'));
  for (const [x, h] of [[206, 6], [216, 8], [276, 7], [288, 5]]) { R.rect(x, 116 - h, x + 7, 116, hex('#6a5a6a')); R.poligono([[x - 1, 116 - h], [x + 3, 112 - h], [x + 8, 116 - h]], hex('#3a2a3a')); R.pset(x + 3, 114, hex('#f8d070')); R.pset(x + 5, 114, hex('#f8d070')); }
  R.rect(300, 94, 306, 116, hex('#8a8a96')); R.disco(303, 94, 3, hex('#9a9aa8')); R.rect(301, 98, 301, 116, hex('#a8a8b4'));
  for (const [x, r] of [[196, 6], [230, 5], [266, 6], [316, 5]]) { R.disco(x, 112, r, hex('#2e3e2e')); R.disco(x - 1, 111, r - 2, hex('#3e5236')); R.rect(x, 112, x + 1, 118, hex('#3a2a20')); }
  // el mástil: celosía triangular a franjas rojas y blancas, más ancha abajo, con sus vientos y la caseta de la emisora
  for (let y = 50; y <= 114; y++) { const w = 1 + (y - 50) * 0.075, sec = Math.floor((y - 50) / 8) & 1, c1 = sec ? hex('#f4ece4') : hex('#d83a2a'), c2 = sec ? hex('#b8b0a8') : hex('#9a2a20');
    R.pset(Math.round(254 - w), y, c1); R.pset(Math.round(254 + w), y, c2); if ((y - 50) % 4 === 0) R.linea(Math.round(254 - w), y, Math.round(254 + w), y, c1); else if ((y - 50) % 4 === 2) R.pset(254, y, c2); }
  for (const [x2, y2] of [[226, 116], [282, 116], [236, 118], [272, 118]]) R.linea(254, 66 + (x2 === 236 || x2 === 272 ? 22 : 0), x2, y2, hex('#5a5a66'));
  R.rect(244, 110, 264, 118, hex('#c8c0b0')); R.rect(244, 110, 264, 110, hex('#e8e0d0')); R.rect(250, 113, 254, 118, hex('#6a5a4a')); R.pset(258, 113, hex('#f8d070')); R.pset(259, 113, hex('#f8d070'));
  // la granja con su molino (el molino gira en el plano), postes de la luz por el camino y rollos de heno
  R.rect(140, 112, 166, 126, hex('#e8e0d0')); R.poligono([[136, 112], [153, 102], [170, 112]], hex('#5a3a3a')); R.rect(146, 116, 150, 120, hex('#f8d070')); R.rect(156, 116, 160, 120, hex('#f8d070')); R.rect(150, 120, 154, 126, hex('#6a4a3a'));
  R.rect(172, 106, 178, 126, hex('#a83a2a')); R.disco(175, 106, 3, hex('#c8c8d0'));
  R.linea(186, 126, 188, 92, hex('#6a6a72')); R.linea(192, 126, 188, 92, hex('#6a6a72')); for (let y = 100; y < 126; y += 6) R.linea(187 - (126 - y) * 0.02, y, 190 + (126 - y) * 0.03, y + 3, hex('#6a6a72'));
  for (let x = 30; x < 320; x += 64) { R.rect(x, 128, x + 1, 150, hex('#4a3a2a')); R.rect(x - 3, 130, x + 4, 130, hex('#4a3a2a')); }
  for (let i = 0; i < 4; i++) { const a = 30 + i * 64, b = a + 64; for (let k = 0; k <= 32; k++) { const u = k / 32, x = Math.round(a + 64 * u), y = Math.round(130 + Math.sin(u * Math.PI) * 3); if (x < 320) R.pset(x, y, hex('#2a2a30')); } }
  for (const [x, y] of [[112, 142], [214, 138], [292, 146]]) { R.disco(x, y, 5, hex('#8a6a2a')); R.disco(x, y, 4, hex('#c8a040')); R.anillo(x, y, 2.5, hex('#9a7a30')); R.rect(x - 5, y, x + 5, y + 4, hex('#a8842a')); R.disco(x + 5, y + 2, 4, hex('#e0c060')); }
  // la cerca de alambre en primer término
  for (let x = 6; x < 320; x += 30) { R.rect(x, 160, x + 2, 178, hex('#5a4a3a')); R.rect(x, 160, x + 2, 160, hex('#8a7a5a')); }
  for (const y of [164, 170]) for (let x = 0; x < 320; x++) if ((x + y) % 3) R.pset(x, y + Math.round(Math.sin((x % 30) / 30 * Math.PI) * 1.5), hex('#3a3a40'));
};
// un tractor pequeño de los setenta (morro a la derecha) con su granjero
const tractor = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 2, y - 18, x + 8, y - 6, K); R.rect(x - 1, y - 17, x + 7, y - 7, hex('#c83a2a')); R.rect(x + 8, y - 12, x + 22, y - 6, K); R.rect(x + 9, y - 11, x + 21, y - 7, hex('#d84a2a')); R.rect(x + 9, y - 11, x + 21, y - 11, hex('#f87a5a'));
  R.rect(x + 16, y - 16, x + 17, y - 12, K); if (Math.sin(t * 12) > 0) tine(x + 16, y - 18, hex('#c8c8c8'), 0.6);
  R.disco(x + 2, y - 3, 6, K); R.disco(x + 2, y - 3, 4.5, hex('#3a3a3a')); R.disco(x + 2, y - 3, 2, hex('#e8c040'));
  R.disco(x + 19, y - 2, 3.5, K); R.disco(x + 19, y - 2, 2.2, hex('#3a3a3a')); R.pset(x + 19, y - 2, hex('#e8c040'));
  const sp = Math.floor(t * 8) % 2; R.pset(x + 2 + (sp ? 3 : -3), y - 3, hex('#8a8a8a'));
  R.rect(x, y - 24, x + 4, y - 19, hex('#f0c090')); R.rect(x - 1, y - 26, x + 5, y - 24, hex('#c8a040')); R.rect(x - 2, y - 24, x + 6, y - 24, hex('#c8a040')); R.pset(x + 3, y - 22, K); };
const vaca = (x, y, t, k) => { x = Math.round(x); y = Math.round(y); const B = hex('#f4f0e8'), N = hex('#2a2a2a'); R.rect(x - 6, y - 7, x + 5, y - 3, K); R.rect(x - 5, y - 6, x + 4, y - 4, B); R.rect(x - 3, y - 6, x - 1, y - 5, N); R.rect(x + 2, y - 5, x + 3, y - 4, N);
  const come = Math.sin(t * 1.3 + k) > 0; R.rect(x + 5, y - (come ? 4 : 8), x + 8, y - (come ? 1 : 5), N); for (const lx of [-5, -3, 2, 4]) R.rect(x + lx, y - 3, x + lx, y, N); R.pset(x - 7, y - 6 + (Math.sin(t * 3 + k) > 0 ? 1 : 0), N); };
const p6 = (t) => {
  capa('campo', campoFondo);
  // las primeras estrellas que se encienden y una nube alargada de tres tonos
  for (let k = 0; k < 12; k++) { const x = Math.floor(hs(k, 5, 86) * 320), y = Math.floor(hs(k, 6, 86) * 60); if (tranquila(x, y)) continue; if (t - P6 > k * 0.3 && Math.sin(t * 4 + k) > -0.3) R.pset(x, y, BL); }
  nube(((60 + t * 1.5) % 380) - 30, 70, 80, 6, [hex('#6a4a7a'), hex('#b07a8a'), hex('#f0b090')], 1);
  nube(((220 + t * 2.4) % 380) - 30, 84, 60, 5, [hex('#7a5a7a'), hex('#c8888a'), hex('#f8c0a0')], 2);
  // el haz de la gran oreja: un cono tenue que sube al cielo (y se queda arriba)
  for (let y = 24; y < 132; y++) { const w = 5 + (132 - y) * 0.2, cx = 58 + (132 - y) * 0.1; for (let x = Math.round(cx - w); x <= cx + w; x++) if (!tranquila(x, y) && bay(x, y) < 0.22) tine(x, y, hex('#c8e0ff'), 0.35); }
  // el molino de la granja que gira
  for (let k = 0; k < 4; k++) { const an = t * 3 + k * 1.571; R.linea(188, 92, 188 + Math.round(Math.cos(an) * 7), 92 + Math.round(Math.sin(an) * 7), hex('#d8d8e0')); }
  R.pset(188, 92, K);
  // los anillos de la emisora, siempre iguales: corren a ras de suelo hacia los lados y nunca suben al haz
  for (let k = 0; k < 4; k++) { const r = ((t - P6) * 20 + k * 28) % 112 + 6; for (let a = 0; a < 6.283; a += 0.5 / r) { const x = Math.round(254 + Math.cos(a) * r), y = Math.round(114 + Math.sin(a) * r * 0.16) - (Math.sin(a) < 0 ? 0 : 0);
      if (x < 100 || x > 319 || ((Math.round(a * r * 0.9)) & 1)) continue; R.pset(x, y, mez(R.pget(x, y), hex('#ffe0c8'), Math.max(0, 0.95 - r / 130))); } }
  if (Math.floor(t * 1.6) % 2) { R.disco(254, 49, 1.6, hex('#ff3a2a')); R.pset(254, 82, hex('#ff3a2a')); for (let y = 44; y < 55; y++) for (let x = 249; x < 260; x++) if (Math.hypot(x - 254, y - 49) < 5 && bay(x, y) < 0.3) tine(x, y, hex('#ff8a7a'), 0.5); }
  // las vacas que pastan
  vaca(70, 146, t, 1); vaca(132, 142, t, 2); vaca(238, 144, t, 3);
  // el tractor que vuelve a casa por el camino, con su polvo
  const tx = lerp(-30, 330, cl01((t - P6) / 5.6));
  for (let k = 0; k < 6; k++) { const q = ((t * 2 + k / 6) % 1), x = Math.round(tx - 4 - q * 16), y = Math.round(154 - q * 6); tine(x, y, hex('#d8c8a0'), 0.45 * (1 - q)); }
  tractor(tx, 157, t);
};

const efectos = [[LETRA[0], 'tic'], [ESCALA + 0.1, 'interruptor'], [LETRAS, 'zumbido'], [P2 + 0.4, 'tic'], [RUIDO, 'golpecito'],
  [P3 + 0.25, 'golpecito'], [U, 'boom'], [TREINTA, 'campana'], [TREINTA + 0.4, 'publico'], [ROSE, 'tic'], [SEGUNDOS, 'tic'], [P5 + 0.6, 'lapiz'], [S(27.4), 'lapiz'], [P6 + 0.3, 'motor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1977 });
''')
