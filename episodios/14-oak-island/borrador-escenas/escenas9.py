E = {}

# piezas comunes de las dos escenas (se pegan al principio de cada cuerpo)
COMUN = r'''
const K = hex('#1c1424');
const mez = (c1, c2, u) => { u = Math.max(0, Math.min(1, u)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], by4 = (x, y) => (BY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const ha = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ease = (u) => u * u * (3 - 2 * u);
const caja = (x0, y0, x1, y1, col, borde = K) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, borde); R.rect(x0, y0, x1, y1, col); };
const H = (s) => hex(s);
// cifras de 3×5 (solo números)
const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];
const cifras = (txt, x, y, c, s = 1) => { let cx = x; for (const ch of String(txt)) { const g = DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.rect(cx + i * s, y + j * s, cx + i * s + s - 1, y + j * s + s - 1, c); cx += 4 * s; } };
// rampa tramada: v de 0 a 1 sobre una lista de colores, con el tramado de Bayer
const rampa = (cols, v, x, y) => { const f = Math.max(0, Math.min(cols.length - 1.001, v * (cols.length - 1))), i = Math.floor(f); return by4(x, y) < f - i ? cols[i + 1] : cols[i]; };
// nube de tres tonos (sombra, cuerpo, luz)
const nube = (cx, cy, w, sem, [cS, cM, cL]) => {
  const n = 4 + Math.floor(ha(sem, 1) * 3), bolas = [];
  for (let k = 0; k < n; k++) { const dx = (k / (n - 1) - 0.5) * w, r = w * 0.16 + ha(sem, k + 3) * w * 0.12 * (1 - Math.abs(dx) / w); bolas.push([dx, -r * 0.35 * (1 - Math.abs(dx) / w * 1.6), r]); }
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), cS);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy - 1), Math.round(r * 0.86), cM);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx - r * 0.25), Math.round(cy + dy - r * 0.45), Math.round(r * 0.45), cL);
  R.linea(Math.round(cx - w * 0.5), Math.round(cy + 1), Math.round(cx + w * 0.5), Math.round(cy + 1), cS);
};
// zonas tranquilas: la de Atom y la barra del año
const tranquila = (x, y) => (x > 270 && y < 48) || (x > 14 && x < 176 && y < 18);
// gaviotas que cruzan (fuera de las zonas tranquilas)
const gaviotas = (t, n, y0, y1, sem = 0, c = H('#f4f4f0'), cs = H('#3a3a46')) => {
  for (let k = 0; k < n; k++) {
    const v = 7 + ha(k, sem) * 6, x = Math.round(((t * v + ha(k, sem + 1) * 380) % 380) - 30), y = Math.round(y0 + ha(k, sem + 2) * (y1 - y0) + Math.sin(t * 0.8 + k) * 2);
    if (tranquila(x, y)) continue;
    const a = Math.sin(t * 7 + k * 2) > 0 ? 1 : 0;
    R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x - 1, y - a, cs); R.pset(x - 2, y - a - (a ? 1 : 0), cs); R.pset(x + 2, y - a, cs); R.pset(x + 3, y - a - (a ? 1 : 0), cs);
  }
};
// copia una capa con transparencia (0 = vacío) encima de lo que hay
const capa = (L) => { for (let i = 0; i < 57600; i++) { const c = L[i]; if (c) R.pset(i % 320, (i / 320) | 0, c); } };
'''

E['oi-hoy'] = ('Oak Island hoy', '''// OI-HOY (frases 41–42), 2026, cartela «2026». Cuatro planos:
// 1. (fondo local) a pie del tubo gigante: un obrero cava con su pala junto al brocal, la clava en el montón en «anymore»,
//    se aparta y mira arriba; en «Giant cranes» la señalista apunta a la grúa y en «drive» el vibrador amarillo arranca y
//    hunde el tubo de acero (76 px de ancho, tres veces el obrero; marcas de profundidad que bajan, barro que salpica);
//    detrás pasa el geólogo con su caja de muestras, humea el generador, gira la manga de viento y pasan gaviotas;
// 2. la caseta (corta en «wider»): Rick entra; el geólogo señala la pantalla en «Scanners»; el barrido pasa como una
//    ecografía y la cavidad destella en «ultrasound»: los tres se sorprenden; por la ventana el tubo sube y baja;
// 3. la mesa de los hallazgos (corta en «and labs»): una mano sella «1700» en la etiqueta de la madera en «date»; la otra
//    lleva la lupa (que aumenta de verdad) de la madera a la moneda en «coins», al clavo en «nails» y a la otra madera en
//    «wood»;
// 4. (fondo local, corta tras «wood») el cuadro de la granja de colonos de 1760 en la pared del laboratorio cobra vida:
//    la granjera sale por la puerta en «farmers» y echa grano a las gallinas, el colono vuelve del campo con la azada, la
//    vaca pace, humea la chimenea y pasa una balandra; una técnica entra y señala la placa «1760» en «1760s».''', COMUN + r'''
const g = (f) => en('gruas', f), m = (f) => en('monedas', f);
const P2 = g(0.4555), P3 = g(0.8115), P4 = m(0.5001);
const ANYMORE = g(0.2133), GIANT = g(0.2887), DRIVE = g(0.3577);
const SCAN = g(0.5846), ULTRA = g(0.7129), DATE = g(0.8404);
const COINS = m(0.0756), NAILS = m(0.2611), WOOD = m(0.4387), FARMERS = m(0.5615), LIVED = m(0.6555), SESENTA = m(0.8436);

// ── 1 · a pie del tubo ───────────────────────────────────────────────────────────────────────────────────────────────
let C1 = null, F1 = null;
const CIE1 = ['#4a74bc', '#5e88cc', '#7aa2da', '#9abce6', '#bcd4ec', '#d8e6f2'].map(H);
const HOJ = [H('#1a3a2c'), H('#285038'), H('#3a6a44'), H('#5a8a4e')];
const fondo1 = () => {
  C1 = R.nuevo(); let prev = R.usar(C1);
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(CIE1, Math.min(1, y / 80), x, y));
  // cirros finos
  for (let k = 0; k < 7; k++) { const x0 = 20 + ha(k, 3) * 230, y0 = 20 + ha(k, 4) * 14, l = 24 + ha(k, 5) * 30; if (x0 + l > 266 && y0 < 46) continue; for (let i = 0; i < l; i++) if (ha(i, k, 7) > 0.3) R.pset(Math.round(x0 + i), Math.round(y0 + i * 0.08), mez(CIE1[2], H('#f4f8fc'), 0.5)); }
  // el sol pálido con su halo
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j); if (d < 12 && by4(i + 236, j + 30) < (12 - d) / 12 * 0.7) R.pset(236 + i, 30 + j, H('#e8f0f8')); }
  R.disco(236, 30, 6, H('#fff8dc')); R.disco(235, 29, 4, H('#ffffff'));
  R.usar(prev);
  F1 = R.nuevo(); prev = R.usar(F1);
  // la costa de enfrente y la bahía, a la izquierda
  for (let x = 0; x < 130; x++) { const yt = 60 + Math.round(Math.sin(x * 0.07) * 2 + ha(x, 1) * 1.2); for (let y = yt; y < 68; y++) R.pset(x, y, by4(x, y) < 0.3 ? H('#6a8aa0') : H('#7a98ac')); }
  for (let y = 68; y < 90; y++) for (let x = 0; x < 130; x++) R.pset(x, y, ha(x >> 2, y, 2) > 0.86 ? H('#a8cce4') : y < 72 ? H('#5a8ab0') : H('#4a7aa0'));
  // el bosque de la isla: banda oscura, robles de tres tonos y abetos
  for (let y = 72; y < 92; y++) for (let x = 100; x < 320; x++) R.pset(x, y, by4(x, y) < 0.5 ? HOJ[0] : HOJ[1]);
  for (let k = 0; k < 14; k++) { const cx = 104 + k * 16 + Math.round(ha(k, 9) * 8), cy = 66 + Math.round(ha(k, 8) * 6) + (cx > 266 ? 4 : 0), r = 9 + Math.round(ha(k, 7) * 4);
    R.disco(cx, cy + 1, r, HOJ[0]); R.disco(cx - 1, cy, r - 1, HOJ[1]); R.disco(cx - 3, cy - 2, r - 4, HOJ[2]); R.disco(cx - 4, cy - 4, Math.max(1, r - 8), HOJ[3]);
    for (let q = 0; q < 14; q++) R.pset(cx + Math.round((ha(q, k, 3) - 0.5) * r * 1.6), cy + Math.round((ha(q, k, 4) - 0.5) * r * 1.4), q % 3 ? HOJ[3] : HOJ[0]); }
  for (const [x, a] of [[122, 30], [170, 26], [212, 32], [248, 22], [300, 24]]) { const b = 90; for (let j = 0; j < a; j++) { const w = Math.round(1 + j * 0.28) + ((j % 6) < 2 ? 1 : 0); R.rect(x - w, b - a + j, x + w, b - a + j, j % 6 < 2 ? HOJ[2] : HOJ[0]); R.pset(x - w, b - a + j, HOJ[1]); } R.rect(x, b - 4, x + 1, b, H('#3a2418')); }
  // la valla de obra: postes de acero y malla naranja (deja ver el bosque)
  for (let y = 86; y <= 104; y++) for (let x = 0; x < 320; x++) if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) R.pset(x, y, y < 92 ? H('#f08a44') : H('#d86a2a'));
  for (let x = 0; x < 320; x++) { R.pset(x, 86, H('#c85a1a')); R.pset(x, 104, H('#a84a1a')); }
  for (let x = 6; x < 320; x += 26) { R.rect(x - 1, 82, x + 1, 108, K); R.rect(x, 83, x, 107, H('#a8b0b8')); R.rect(x - 3, 106, x + 3, 109, H('#5a6068')); }
  // el contenedor y el generador (por dentro de la valla)
  caja(4, 66, 52, 106, H('#3a5a8a'));
  for (let x = 5; x < 52; x += 3) { R.rect(x, 67, x, 105, H('#2a4a7a')); R.rect(x + 1, 67, x + 1, 105, H('#4a6a9a')); }
  R.rect(4, 66, 52, 67, H('#6a8aba')); R.rect(28, 68, 28, 104, K); for (const x of [16, 22, 34, 40]) { R.rect(x, 70, x, 103, H('#8a9aaa')); R.rect(x - 1, 84, x + 1, 86, H('#5a6a7a')); }
  for (let k = 0; k < 18; k++) R.pset(6 + Math.round(ha(k, 2) * 44), 88 + Math.round(ha(k, 3) * 16), H('#8a5a3a'));
  caja(58, 90, 94, 108, H('#4e6a4a')); R.rect(58, 90, 94, 91, H('#6e8a6a')); for (let x = 62; x < 80; x += 3) R.rect(x, 94, x + 1, 104, H('#2e4a2e'));
  caja(82, 94, 90, 100, H('#c8c8c0')); R.rect(84, 96, 88, 98, H('#3a3a46')); R.rect(88, 80, 89, 90, H('#3a3a46')); R.rect(87, 79, 90, 80, H('#2a2a32'));
  for (const x of [62, 88]) { R.disco(x, 109, 3, K); R.disco(x, 109, 1, H('#8a929c')); }
  // la torre de luz con su remolque
  for (let y = 52; y < 102; y++) { R.pset(258, y, K); R.pset(266, y, K); if ((y - 52) % 8 < 1) R.linea(258, y, 266, y + 8, H('#8a929c')); R.pset(259, y, H('#c8ccd4')); R.pset(265, y, H('#8a929c')); }
  caja(246, 100, 278, 108, H('#e8b830')); R.rect(246, 100, 278, 101, H('#f8d860')); R.disco(252, 110, 3, K); R.disco(272, 110, 3, K);
  caja(250, 44, 274, 52, H('#3a3a46')); for (const x of [253, 259, 265, 271]) { R.rect(x - 1, 46, x + 1, 50, H('#c8ccd4')); R.pset(x, 47, H('#ffffff')); }
  // el suelo: barro tramado con roderas, piedras y charcos
  const BAR = ['#4a3424', '#5a3e2a', '#6a4a32', '#7a583c', '#8a6848'].map(H);
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (y < 109 && (x + y) % 4 && R.pget(x, y)) continue;
    const ru = Math.abs(x - (40 + (y - 104) * 1.6)) < 6 || Math.abs(x - (64 + (y - 104) * 1.9)) < 6;
    const v = 0.55 - (y - 104) / 200 + (ha(x >> 1, y >> 1, 4) - 0.5) * 0.5 - (ru ? 0.25 : 0);
    R.pset(x, y, rampa(BAR, v, x, y));
  }
  for (let k = 0; k < 90; k++) { const x = Math.round(ha(k, 11) * 318), y = 108 + Math.round(ha(k, 12) * 70); R.pset(x, y, H('#a8957a')); R.pset(x + 1, y, H('#c8b8a0')); R.pset(x, y + 1, H('#3a2818')); }
  const charco = (cx, cy, rx, ry) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i * i) / (rx * rx) + (j * j) / (ry * ry); if (d <= 1) R.pset(cx + i, cy + j, d > 0.75 ? H('#3a2818') : j < 0 ? H('#9ac0de') : H('#7aa2c4')); } R.linea(cx - rx + 4, cy - 1, cx - 2, cy - 1, H('#d8eaf6')); };
  charco(110, 122, 16, 3); charco(36, 140, 14, 3); charco(306, 132, 10, 2);
  // la manguera desde el generador
  for (let i = 0; i <= 60; i++) { const u = i / 60, x = Math.round(lerp(92, 176, u)), y = Math.round(108 + u * 34 + Math.sin(u * 7) * 5); R.rect(x, y, x + 1, y + 1, K); if (i % 5 === 0) R.pset(x, y, H('#e8c040')); }
  // la carretilla y los tablones de la derecha
  caja(282, 112, 318, 116, H('#a8784a')); caja(286, 118, 318, 122, H('#8a5a30')); for (let x = 288; x < 318; x += 7) R.pset(x, 114, H('#5a3a1a'));
  R.poligono([[118, 116], [142, 116], [138, 126], [122, 126]], H('#3a6a9a')); R.linea(118, 116, 142, 116, K); R.linea(122, 126, 138, 126, K); R.disco(130, 129, 3, K); R.disco(130, 129, 1, H('#8a929c')); R.linea(142, 118, 152, 124, H('#5a3a1a')); R.linea(118, 118, 110, 126, H('#5a3a1a'));
  // las esteras de madera de la grúa alrededor del brocal
  for (let j = 0; j < 5; j++) { const y = 146 + j * 6; R.rect(126, y, 300, y + 5, j % 2 ? H('#8a6038') : H('#9a6c40')); R.rect(126, y, 300, y, H('#b8885a')); R.rect(126, y + 5, 300, y + 5, H('#4a3018'));
    for (let x = 126 + j * 13 % 40; x < 300; x += 42) { R.rect(x, y + 1, x, y + 4, H('#4a3018')); R.pset(x + 3, y + 2, H('#c8ccd4')); }
    for (let x = 128; x < 300; x += 3) if (ha(x, j, 6) > 0.7) R.pset(x, y + 2 + (x % 2), H('#6a4a28')); }
  // la boca del brocal: el hueco oscuro detrás del tubo
  for (let j = -9; j <= 9; j++) for (let i = -46; i <= 46; i++) { const d = (i * i) / (46 * 46) + (j * j) / 81; if (d <= 1) R.pset(210 + i, 150 + j, d > 0.8 ? H('#5a6068') : j < 0 ? H('#1a1210') : H('#2a1c14')); }
  // el montón de tierra del que cava a mano y su hoyito
  R.poligono([[96, 168], [104, 156], [112, 153], [120, 158], [126, 168]], H('#6a4a30')); R.poligono([[102, 160], [110, 155], [116, 158]], H('#8a6848'));
  for (let k = 0; k < 14; k++) R.pset(98 + Math.round(ha(k, 5) * 26), 158 + Math.round(ha(k, 6) * 9), k % 2 ? H('#3a2818') : H('#a8885a'));
  for (let i = -7; i <= 7; i++) for (let j = -2; j <= 2; j++) if (i * i / 49 + j * j / 4 <= 1) R.pset(84 + i, 170 + j, j < 0 ? H('#2a1c14') : H('#3a2818'));
  R.usar(prev);
};
// la pala: mango de madera con veta y hoja de hierro
const pala = (x, y, ang, larga = 17) => {
  const ux = Math.cos(ang), uy = Math.sin(ang), x1 = x + ux * larga, y1 = y + uy * larga;
  R.linea(Math.round(x), Math.round(y) + 1, Math.round(x1), Math.round(y1) + 1, K); R.linea(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1), H('#a8784a')); R.linea(Math.round(x) - 1, Math.round(y), Math.round(x1) - 1, Math.round(y1), H('#7a5230'));
  R.rect(Math.round(x) - 2, Math.round(y) - 1, Math.round(x) + 1, Math.round(y), K);
  const bx = Math.round(x1), by = Math.round(y1), px = -uy, py = ux;
  const p = [[bx + px * 4, by + py * 4], [bx - px * 4, by - py * 4], [bx - px * 3 + ux * 7, by - py * 3 + uy * 7], [bx + px * 3 + ux * 7, by + py * 3 + uy * 7]].map(([a, b]) => [Math.round(a), Math.round(b)]);
  R.poligono(p, H('#6a7682')); R.linea(p[0][0], p[0][1], p[1][0], p[1][1], K); R.linea(p[2][0], p[2][1], p[3][0], p[3][1], H('#c8d2dc')); R.linea(p[1][0], p[1][1], p[2][0], p[2][1], K); R.linea(p[3][0], p[3][1], p[0][0], p[0][1], K);
  return [Math.round(bx + ux * 4), Math.round(by + uy * 4)];
};
const TUBO = ['#22282e', '#3a4450', '#56626e', '#7a8692', '#a8b4c0', '#dce6ee', '#a8b4c0', '#7a8692', '#56626e', '#3a4450', '#22282e'].map(H);
const p1 = (t) => {
  if (!F1) fondo1();
  R.copiar(C1);
  // nubes a tres velocidades y gaviotas
  const NB = [H('#a8bcd4'), H('#dce6f0'), H('#ffffff')];
  for (let k = 0; k < 6; k++) { const v = [2, 3.5, 5][k % 3], w = [46, 32, 22][k % 3], cy = [56, 44, 30][k % 3] + (k > 2 ? 4 : 0), cx = ((ha(k, 21) * 420 + t * v) % 420) - 50; nube(Math.round(cx), cy, w, k + 2, NB); }
  gaviotas(t, 3, 30, 60, 4);
  // la balandra de la bahía
  { const bx = Math.round(70 + Math.sin(t * 0.1) * 6); R.rect(bx - 6, 78, bx + 6, 79, H('#f4f0e8')); R.rect(bx - 5, 80, bx + 5, 80, H('#3a3a46')); R.poligono([[bx, 66], [bx, 77], [bx + 6, 77]], H('#f8f4ec')); R.linea(bx, 66, bx, 78, K); }
  capa(F1);
  // vida de fondo: el humo del generador, la baliza y la manga de viento de la torre
  for (let k = 0; k < 5; k++) { const u = ((t * 0.6 + k / 5) % 1), x = Math.round(89 + u * 10 + Math.sin(u * 6 + k) * 2), y = Math.round(78 - u * 22), r = u < 0.3 ? 1 : u < 0.7 ? 2 : 3; R.disco(x, y, r, u < 0.5 ? H('#6a6a74') : H('#9a9aa4')); }
  { const a = Math.sin(t * 1.8) * 0.4; R.linea(262, 52, 262, 40, K); for (let i = 0; i < 9; i++) { const x = Math.round(262 - i * Math.cos(a) * 1.1), y = Math.round(42 + i * Math.sin(a) * 0.6 + Math.sin(t * 6 + i) * 0.6); R.rect(x, y, x, y + 2 - (i > 5 ? 1 : 0), i % 4 < 2 ? H('#f06a2a') : H('#f4f4f0')); } }
  if (Math.floor(t * 2.2) % 2) { R.pset(262, 38, H('#ff9a3a')); R.pset(261, 38, H('#ffd890')); R.pset(263, 38, H('#ffd890')); }
  // el geólogo pasa por detrás con su caja de muestras
  { const u = tramo(t, 1.4, P2 - 0.2), x = Math.round(lerp(-18, 132, u)); R.actor(EL.geologo, x, 113, t, { dir: 1, anda: u > 0 && u < 1 }); caja(x + 13, 100, x + 19, 105, H('#c8c8c0')); R.rect(x + 14, 101, x + 18, 101, H('#3a8ac8')); }
  // el tubo gigante que hunde el vibrador
  const corre = t > DRIVE, hunde = ease(tramo(t, DRIVE, P2 - 0.15)), jx = corre && t < P2 - 0.1 ? (Math.floor(t * 30) % 2 ? 1 : -1) : 0;
  const tt = Math.round(lerp(38, 72, hunde)) + (corre ? (Math.floor(t * 30) % 2) : 0), x0 = 172 + jx, x1 = 248 + jx;
  for (let y = tt; y < 150; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0); R.pset(x, y, rampa(TUBO, u, x, y)); }
  R.rect(x0 - 1, tt, x0 - 1, 150, K); R.rect(x1 + 1, tt, x1 + 1, 150, K);
  // soldaduras, churretes de óxido y marcas de profundidad que bajan con el tubo
  for (let k = 0; k < 4; k++) { const ys = tt + 22 + k * 32; if (ys > 146) continue; for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), yy = ys + Math.round(Math.sin(u * Math.PI) * 3); R.pset(x, yy, H('#2a3038')); R.pset(x, yy + 1, mez(rampa(TUBO, u, x, yy), H('#ffffff'), 0.3)); }
    for (const uu of [0.18, 0.5, 0.86]) { const xr = Math.round(x0 + uu * 76 + k * 3); for (let j = 2; j < 9 + k * 2; j++) if (ys + j < 146 && by4(xr, ys + j) < 0.8 - j * 0.05) R.pset(xr, ys + 3 + j, H('#8a5a3a')); } }
  for (let k = 0; k < 6; k++) { const ym = tt + 10 + k * 16; if (ym > 140) continue; R.rect(x0 + 52, ym, x0 + 60, ym + 1, H('#f4f4f0')); if (k % 2 === 0) cifras(String((k / 2 + 1) * 10), x0 + 62, ym - 2, H('#f4f4f0')); }
  // el barro pegado abajo
  for (let x = x0; x <= x1; x++) { const top = 134 + Math.round(ha(x, 3) * 6 + Math.sin(x * 0.3) * 2); for (let y = top; y < 150; y++) R.pset(x, y, y === top ? H('#8a6848') : by4(x, y) < 0.5 ? H('#5a3e2a') : H('#4a3424')); }
  // el labio de delante del brocal
  for (let i = -46; i <= 46; i++) { const yy = 150 + Math.round(Math.sqrt(Math.max(0, 1 - (i * i) / 2116)) * 9); R.pset(210 + i, yy, H('#c8ccd4')); R.pset(210 + i, yy + 1, H('#7a828c')); R.pset(210 + i, yy + 2, K); }
  // el vibrador, el gancho y los cables que suben a la pluma
  const vy = tt - 24, vx = x0 + 8;
  R.linea(205 + jx, 0, 205 + jx, vy - 12, K); R.linea(214 + jx, 0, 214 + jx, vy - 12, K); R.linea(206 + jx, 0, 206 + jx, vy - 12, H('#5a6068')); R.linea(215 + jx, 0, 215 + jx, vy - 12, H('#5a6068'));
  caja(200 + jx, vy - 13, 220 + jx, vy - 5, H('#e8783a')); R.rect(200 + jx, vy - 13, 220 + jx, vy - 12, H('#f8a86a')); R.disco(210 + jx, vy - 9, 2, H('#3a3a46'));
  R.linea(203 + jx, vy - 5, vx + 4, vy, K); R.linea(217 + jx, vy - 5, vx + 56, vy, K);
  caja(vx, vy, vx + 60, vy + 20, H('#e8b830')); R.rect(vx, vy, vx + 60, vy + 1, H('#f8d860')); R.rect(vx, vy + 19, vx + 60, vy + 20, H('#b8861c'));
  for (let x = vx + 6; x < vx + 30; x += 4) R.rect(x, vy + 4, x + 1, vy + 11, H('#8a6418'));
  for (let x = vx; x <= vx + 60; x++) for (let y = vy + 14; y <= vy + 18; y++) R.pset(x, y, ((x + y) >> 2) % 2 ? K : H('#f8d860'));
  caja(vx + 36, vy + 4, vx + 54, vy + 11, H('#3a3a46')); R.rect(vx + 38, vy + 6, vx + 52, vy + 6, corre ? H('#7af07a') : H('#2a6a3a')); if (corre) R.rect(vx + 38, vy + 8, vx + 38 + Math.floor(t * 20) % 14, vy + 8, H('#f8d860'));
  for (const cx of [vx + 2, vx + 50]) { caja(cx, vy + 21, cx + 8, vy + 28, H('#8a929c')); R.rect(cx, vy + 21, cx + 8, vy + 21, H('#c8ccd4')); }
  if (corre && Math.floor(t * 4) % 2) { R.pset(vx + 30, vy - 1, H('#ff9a3a')); R.pset(vx + 29, vy - 1, H('#ffd890')); R.pset(vx + 31, vy - 1, H('#ffd890')); R.pset(vx + 30, vy - 2, H('#ffd890')); }
  // las mangueras hidráulicas que salen por la derecha
  for (const [d, c] of [[0, K], [4, H('#2a2a32')]]) for (let i = 0; i <= 50; i++) { const u = i / 50, x = Math.round(vx + 60 + u * 70), y = Math.round(vy + 6 + d + u * u * (112 - vy) + Math.sin(u * 3 + t * (corre ? 9 : 1)) * (corre ? 1 : 0)); R.rect(x, y, x, y + 2, c); }
  // el barro que salta y las ondas de los charcos cuando vibra
  if (corre && t < P2) { for (let k = 0; k < 18; k++) { const u = ((t * 1.6 + k / 18) % 1), lado = k % 2 ? 1 : -1, x = Math.round(210 + lado * (44 + u * (20 + k % 5 * 6))), y = Math.round(150 - Math.sin(u * Math.PI) * (10 + k % 4 * 4) + u * 8); R.rect(x, y, x + (k % 3 ? 0 : 1), y, k % 2 ? H('#5a3e2a') : H('#8a6848')); }
    for (const [cx, cy, rx] of [[110, 122, 16], [36, 140, 14]]) { const r = ((t * 8) % 6); for (let i = -rx; i <= rx; i++) if (Math.abs(Math.abs(i) - r * rx / 6) < 1) R.pset(cx + i, cy, H('#e8f4fc')); } }
  // el que cavaba con la pala: cava, la clava en el montón en «anymore», se aparta y mira el tubo
  const xo = t < ANYMORE + 0.3 ? 58 : Math.round(lerp(58, 40, tramo(t, ANYMORE + 0.3, ANYMORE + 1.0)));
  const yo = 166;
  R.actor(EL.operario, xo, yo, t, { dir: t > ANYMORE + 0.3 && t < ANYMORE + 1.0 ? -1 : 1, anda: t > ANYMORE + 0.3 && t < ANYMORE + 1.0, sorpresa: t > GIANT && t < P2, salto: corre && t < DRIVE + 0.4 ? 2 : 0, brazos: t > DRIVE + 0.5 && t < DRIVE + 1.0 });
  if (t < ANYMORE) {
    const f = ((t - 1.3) * 0.9) % 1, hx = xo + 13, hy = 155 + (f < 0.35 ? Math.round(f / 0.35 * 2) : 0);
    const ang = f < 0.35 ? 1.05 : f < 0.65 ? lerp(1.05, 0.35, (f - 0.35) / 0.3) : lerp(0.35, -0.35, (f - 0.65) / 0.35);
    const [bx, by] = pala(hx, hy, ang);
    if (f > 0.35 && f < 0.75) { R.rect(bx - 2, by - 2, bx + 1, by, H('#6a4a30')); R.pset(bx - 1, by - 3, H('#8a6848')); }
    if (f > 0.7) { const u = (f - 0.7) / 0.3; for (let k = 0; k < 4; k++) { const x = Math.round(lerp(bx, 104 + k * 4, u)), y = Math.round(lerp(by, 158, u) - Math.sin(u * Math.PI) * (8 + k * 2)); R.rect(x, y, x + 1, y + 1, k % 2 ? H('#6a4a30') : H('#8a6848')); } }
  } else {
    // la pala se queda clavada en el montón, de pie
    pala(106, 140, 1.48, 17);
  }
  // la señalista con la radio: habla con el gruista, señala la grúa en «Giant» y da la señal en «drive»
  const xs = 272;
  R.actor(EL.operaria, xs, 172, t, { dir: -1, habla: t < GIANT && Math.sin(t * 8) > 0, dedo: t > GIANT && t < DRIVE, brazos: t > DRIVE && t < DRIVE + 0.7, sonrisa: t > DRIVE + 0.8 });
  if (!(t > GIANT && t < DRIVE + 0.7)) { caja(xs - 1, 156, xs + 2, 161, H('#2a2a32')); R.linea(xs, 155, xs, 151, K); if (Math.floor(t * 3) % 2) R.pset(xs + 1, 157, H('#ff3a3a')); }
  // por delante: el cono y la manguera enrollada
  for (let j = 0; j < 14; j++) { const w = Math.round(1 + j * 0.45); R.rect(16 - w, 164 + j, 16 + w, 164 + j, (j > 4 && j < 8) ? H('#f4f4f0') : H('#f06a2a')); R.pset(16 - w - 1, 164 + j, K); R.pset(16 + w + 1, 164 + j, K); }
  caja(8, 178, 25, 179, H('#2a2a32'));
};

// ── 2 · la caseta: el escáner como una ecografía ─────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const bar = tramo(t, SCAN, SCAN + (ULTRA - SCAN) / 0.486);
  T.oakHoy(R, t, { encuadre: 'caseta', escaner: bar, hueco: true });
  const ve = t > ULTRA - 0.05;
  // Rick entra por la izquierda y se para ante la pantalla
  const u = tramo(t, P2 + 0.1, P2 + 1.5), xr = Math.round(lerp(-18, 96, ease(u)));
  R.actor(EL.rick, xr, 166, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: ve && t < ULTRA + 0.9, sonrisa: t > ULTRA + 0.9, dedo: t > ULTRA + 1.1 });
  // el geólogo le explica y señala la pantalla en «Scanners»
  R.actor(EL.geologo, 168, 162, t, { dir: t < SCAN ? -1 : 1, habla: t < SCAN && Math.sin(t * 8) > 0, dedo: t > SCAN && t < ULTRA - 0.1, sorpresa: ve });
  // la técnica teclea en el portátil y se vuelve en la cavidad
  R.actor(EL.operaria, 238, 158, t, { dir: ve ? -1 : 1, habla: !ve && Math.sin(t * 11) > 0.3, sorpresa: ve && t < ULTRA + 1, sonrisa: t > ULTRA + 1 });
  if (!ve && Math.floor(t * 9) % 2) { R.pset(252, 128, H('#c8ccd4')); R.pset(256, 127, H('#c8ccd4')); }
  if (ve && t < ULTRA + 1.4) R.bocadillo(176, 130, { icono: '!' });
};

// ── 3 · la mesa de los hallazgos, con la lupa en la mano ─────────────────────────────────────────────────────────────
const LP = [[P3, 232, 137], [COINS - 1.1, 232, 137], [COINS - 0.15, 78, 104], [NAILS - 0.55, 78, 104], [NAILS, 163, 100], [WOOD - 0.6, 163, 100], [WOOD - 0.05, 232, 98]];
const lupaEn = (t) => { let k = 0; while (k < LP.length - 1 && t > LP[k + 1][0]) k++; if (k >= LP.length - 1) return [LP[k][1], LP[k][2]]; const [a, x0, y0] = LP[k], [b, x1, y1] = LP[k + 1], u = ease(tramo(t, a, b)); return [lerp(x0, x1, u), lerp(y0, y1, u)]; };
const p3 = (t) => {
  T.oakHoy(R, t, { encuadre: 'hallazgos', lupa: false });
  // el sello de la etiqueta: «1700» en «date»
  const llega = ease(tramo(t, P3 + 0.05, DATE - 0.15)), baja = tramo(t, DATE - 0.15, DATE) - tramo(t, DATE + 0.15, DATE + 0.4), va = ease(tramo(t, DATE + 0.5, DATE + 1.2));
  if (t > DATE) { R.rect(262, 131, 285, 141, H('#c8283a')); R.rect(263, 132, 284, 140, H('#f4ecdc')); cifras('1700', 266, 134, H('#c8283a')); }
  if (va < 1) {
    const wx = Math.round(lerp(352, 290, llega) + va * 70), wy = Math.round(lerp(117, 126, baja));
    // el sello: taco de madera, pomo y goma
    caja(wx - 15, wy + 3, wx - 5, wy + 8, H('#8a5a30')); R.rect(wx - 15, wy + 3, wx - 5, wy + 3, H('#b8885a')); R.rect(wx - 16, wy + 9, wx - 4, wy + 11, H('#8a1a2a')); R.disco(wx - 10, wy, 3, H('#3a2418')); R.pset(wx - 11, wy - 1, H('#8a6a4a'));
    T.brazo(R, wx + 44, wy + 26, wx, wy + 2, '#e8eef4', -1);
  }
  // la lupa: aumenta al doble lo que tiene debajo
  const [lx0, ly0] = lupaEn(t), lx = Math.round(lx0 + Math.sin(t * 1.7) * 1), ly = Math.round(ly0 + Math.cos(t * 1.3) * 1), r = 14;
  const src = []; for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) src.push(R.pget(lx + i, ly + j));
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) { const c = src[(Math.round(j / 2) + 8) * 17 + Math.round(i / 2) + 8]; R.pset(lx + i, ly + j, (i + j < -10 && (i * i + j * j) > 60) ? mez(c, H('#ffffff'), 0.35) : c); }
  for (let a = 0; a < 6.283; a += 0.03) { for (const [rr, c] of [[r + 1, H('#3a3a46')], [r + 2, H('#8a929c')], [r + 3, K]]) R.pset(Math.round(lx + Math.cos(a) * rr), Math.round(ly + Math.sin(a) * rr), c); if (a > 3.5 && a < 4.6) R.pset(Math.round(lx + Math.cos(a) * (r + 2)), Math.round(ly + Math.sin(a) * (r + 2)), H('#e8eef4')); }
  // el mango y la mano que lo lleva
  for (let i = 0; i < 26; i++) { const x = Math.round(lx + 12 + i * 0.72), y = Math.round(ly + 12 + i * 0.72); R.rect(x - 1, y, x + 1, y + 1, i < 3 ? H('#c8a040') : H('#4a2a18')); R.pset(x - 1, y, i < 3 ? H('#f8d860') : H('#7a4a2a')); }
  T.brazo(R, lx + 72, ly + 70, lx + 40, ly + 34, '#e8eef4', -1);
};

// ── 4 · el cuadro de la granja de 1760 cobra vida ────────────────────────────────────────────────────────────────────
let F4 = null;
const CV = [38, 26, 254, 132];
const PIEL = ['#9ec4e0', '#b8d2e4', '#d4dcd8', '#e8dcc0'].map(H);
const fondo4 = () => {
  F4 = R.nuevo(); const prev = R.usar(F4);
  // la pared del laboratorio: paneles verde salvia tramados, juntas y zócalo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa([H('#9aa894'), H('#aab8a2'), H('#b8c4b0')], 0.7 - y / 400 + (ha(x >> 2, y >> 3, 9) - 0.5) * 0.25, x, y));
  for (let x = 0; x < 320; x += 40) { R.rect(x, 0, x, 156, H('#8a9884')); R.rect(x + 1, 0, x + 1, 156, H('#c8d4c0')); }
  // el cuadro: marco dorado con molduras y su sombra
  R.rect(CV[0] - 6, CV[1] - 4, CV[2] + 12, CV[3] + 12, H('#7a8874'));
  for (let k = 0; k < 9; k++) { const c = [K, H('#8a5a1a'), H('#c8902a'), H('#f8d070'), H('#e8b040'), H('#b07820'), H('#e8b040'), H('#8a5a1a'), K][k]; R.rect(CV[0] - 9 + k, CV[1] - 9 + k, CV[2] + 9 - k, CV[1] - 9 + k, c); R.rect(CV[0] - 9 + k, CV[3] + 9 - k, CV[2] + 9 - k, CV[3] + 9 - k, c); R.rect(CV[0] - 9 + k, CV[1] - 9 + k, CV[0] - 9 + k, CV[3] + 9 - k, c); R.rect(CV[2] + 9 - k, CV[1] - 9 + k, CV[2] + 9 - k, CV[3] + 9 - k, c); }
  for (let x = CV[0] - 6; x < CV[2] + 6; x += 6) { R.pset(x, CV[1] - 6, H('#fff0b0')); R.pset(x + 3, CV[3] + 6, H('#7a4a10')); }
  for (let y = CV[1] - 6; y < CV[3] + 6; y += 6) { R.pset(CV[0] - 6, y, H('#fff0b0')); R.pset(CV[2] + 6, y, H('#7a4a10')); }
  // dentro: el cielo pintado a pinceladas, la costa de enfrente y el mar
  for (let y = CV[1]; y <= 74; y++) for (let x = CV[0]; x <= CV[2]; x++) R.pset(x, y, rampa(PIEL, (y - CV[1]) / 48 + (ha(x >> 3, y, 2) - 0.5) * 0.18, x, y));
  for (let x = 150; x <= CV[2]; x++) { const yt = 68 + Math.round(Math.sin(x * 0.06) * 1.5); for (let y = yt; y < 74; y++) R.pset(x, y, H('#7a9a8a')); }
  for (let y = 74; y < 90; y++) for (let x = 140; x <= CV[2]; x++) R.pset(x, y, ha(x >> 2, y, 3) > 0.82 ? H('#e8f0f0') : y < 80 ? H('#5a8aaa') : H('#4a7a9a'));
  // el prado, el campo arado y la valla de troncos
  for (let y = 72; y <= CV[3]; y++) for (let x = CV[0]; x <= CV[2]; x++) { if (x > 140 && y < 90 - (x - 140) * 0.05) continue; const v = 0.35 + (y - 72) / 140 + (ha(x >> 1, y >> 1, 4) - 0.5) * 0.3; R.pset(x, y, rampa([H('#5a7a3a'), H('#6a8a42'), H('#7a9a4a'), H('#8aa858')], 1 - v, x, y)); }
  for (let y = 96; y < 122; y++) for (let x = 150 + (y - 96); x < 248; x++) R.pset(x, y, (x + y * 2) % 6 < 2 ? H('#6a4a2a') : (x + y * 2) % 6 < 4 ? H('#8a6438') : H('#a07a48'));
  for (let x = 42; x < 150; x += 12) { R.rect(x, 98, x + 1, 108, H('#4a3018')); R.linea(x, 101, x + 12, 99, H('#7a5a38')); R.linea(x, 105, x + 12, 103, H('#7a5a38')); }
  // el roble grande
  R.rect(50, 56, 57, 112, H('#4a3018')); R.rect(51, 56, 52, 112, H('#6a4a2a')); R.linea(54, 70, 66, 58, H('#4a3018')); R.linea(50, 74, 42, 62, H('#4a3018'));
  for (const [cx, cy, r] of [[54, 46, 15], [42, 54, 10], [66, 52, 11], [56, 36, 10]]) { R.disco(cx, cy + 1, r, H('#2a4a2a')); R.disco(cx - 1, cy, r - 1, H('#3a6a3a')); R.disco(cx - 3, cy - 3, r - 5, H('#5a8a4a')); }
  // la casa de troncos: troncos con sus cabezas, tejado de tablillas, puerta y ventana
  for (let y = 66; y < 98; y += 4) { R.rect(72, y, 122, y + 3, H('#7a5230')); R.rect(72, y, 122, y, H('#a8784a')); R.rect(72, y + 3, 122, y + 3, H('#4a3018')); R.disco(71, y + 2, 2, H('#c89a6a')); R.disco(123, y + 2, 2, H('#c89a6a')); R.pset(71, y + 2, H('#8a5a30')); }
  R.poligono([[66, 67], [97, 48], [128, 67]], H('#4a3a3a')); for (let y = 52; y < 67; y += 3) R.linea(Math.round(97 - (y - 48) * 1.6), y, Math.round(97 + (y - 48) * 1.6), y, H('#2e2424')); R.linea(66, 67, 97, 48, K); R.linea(97, 48, 128, 67, K);
  caja(110, 44, 116, 58, H('#8a8a8a')); for (let y = 46; y < 58; y += 3) R.linea(110, y, 116, y, H('#5a5a5a'));
  caja(80, 74, 92, 84, H('#f8d890')); R.rect(86, 74, 86, 84, H('#4a3018')); R.rect(80, 79, 92, 79, H('#4a3018'));
  caja(98, 80, 110, 97, H('#3a2418'));
  // el pozo de agua con su cubo y el corral de las gallinas
  caja(132, 98, 140, 106, H('#8a8a8a')); R.linea(131, 92, 141, 92, H('#4a3018')); R.linea(132, 92, 132, 98, H('#4a3018')); R.linea(140, 92, 140, 98, H('#4a3018'));
  // la textura de óleo: trama de lienzo y craqueladuras
  for (let y = CV[1]; y <= CV[3]; y++) for (let x = CV[0]; x <= CV[2]; x++) if ((x + y) % 3 === 0 && ha(x, y, 8) > 0.6) R.pset(x, y, mez(R.pget(x, y), K, 0.08));
  for (let k = 0; k < 10; k++) { let x = CV[0] + ha(k, 1) * 216, y = CV[1] + ha(k, 2) * 106; for (let i = 0; i < 14; i++) { x += ha(k, i) - 0.4; y += ha(i, k) - 0.5; if (x < CV[2] && y < CV[3]) R.pset(Math.round(x), Math.round(y), mez(R.pget(Math.round(x), Math.round(y)), K, 0.25)); } }
  // la placa de latón «1760» bajo el cuadro, con sus tornillos
  caja(134, 146, 170, 155, H('#c8a040')); R.rect(134, 146, 170, 146, H('#f8e090')); R.rect(134, 155, 170, 155, H('#8a6a20')); cifras('1760', 145, 148, H('#4a3010')); R.pset(136, 150, H('#8a6a20')); R.pset(168, 150, H('#8a6a20'));
  // a la derecha: el reloj, el estante con frascos y la bata colgada a la izquierda
  R.disco(292, 72, 10, K); R.disco(292, 72, 9, H('#f4f4ec')); for (let k = 0; k < 12; k++) R.pset(292 + Math.round(Math.cos(k * 0.5236) * 7), 72 + Math.round(Math.sin(k * 0.5236) * 7), H('#3a3a46'));
  caja(276, 104, 318, 107, H('#8a6a4a')); R.rect(276, 104, 318, 104, H('#b89a74'));
  for (const [x, c, h] of [[280, '#c84a3a', 10], [290, '#3a8ac8', 14], [300, '#e8c040', 8], [310, '#5aa86a', 12]]) { caja(x, 103 - h, x + 6, 103, H('#e8f0f4')); R.rect(x, 103 - Math.round(h * 0.6), x + 6, 103, H(c)); R.rect(x + 1, 103 - h, x + 1, 102, H('#ffffff')); }
  R.rect(14, 54, 16, 58, K); R.poligono([[6, 60], [24, 60], [26, 120], [4, 120]], H('#eef2f4')); R.linea(15, 60, 15, 120, H('#c8d0d4')); R.linea(6, 60, 4, 120, K); R.linea(24, 60, 26, 120, K); R.rect(8, 88, 12, 94, H('#c8d0d4'));
  // la mesa del laboratorio con su encimera, cajones y cosas
  R.rect(0, 158, 319, 179, H('#4a5058')); R.rect(0, 158, 319, 160, H('#6a7480')); R.rect(0, 161, 319, 161, K);
  for (let x = 0; x < 320; x += 64) { R.rect(x, 162, x, 179, H('#2a3038')); R.rect(x + 28, 168, x + 36, 169, H('#a8b0b8')); }
  // el microscopio, la gradilla con tubos y el cuaderno
  caja(40, 152, 60, 157, H('#e8ecf0')); R.rect(48, 128, 52, 152, H('#e8ecf0')); R.linea(50, 128, 58, 138, K); caja(54, 136, 60, 142, H('#3a3a46')); caja(42, 132, 50, 136, H('#3a3a46'));
  caja(222, 148, 250, 157, H('#c8ccd4')); for (let x = 225; x < 250; x += 5) { R.rect(x, 140, x + 2, 152, H('#e8f0f4')); R.rect(x, 146, x + 2, 152, [H('#c84a3a'), H('#3a8ac8'), H('#e8c040'), H('#5aa86a'), H('#a86ac8')][((x - 225) / 5) | 0]); }
  caja(262, 152, 290, 157, H('#f4ecdc')); R.linea(276, 152, 276, 157, H('#c8b898')); for (let y = 154; y < 157; y += 2) R.linea(264, y, 274, y, H('#a8a8b8'));
  R.usar(prev);
};
const p4 = (t) => {
  if (!F4) fondo4();
  R.copiar(F4);
  // dentro del cuadro, recortado a su hueco
  R.recorte(CV);
  for (let k = 0; k < 3; k++) { const cx = ((ha(k, 5) * 260 + t * (1.5 + k)) % 260) + 20; nube(Math.round(cx), 36 + k * 7, 30 - k * 6, k + 9, [H('#d4c8b8'), H('#f4ece0'), H('#fffaf0')]); }
  // la balandra que cruza
  { const bx = Math.round(lerp(236, 170, tramo(t, P4, E.duracion))); R.poligono([[bx - 7, 82], [bx + 7, 82], [bx + 5, 85], [bx - 5, 85]], H('#5a3a1a')); R.poligono([[bx, 66], [bx, 81], [bx + 7, 81]], H('#f4ecdc')); R.poligono([[bx - 1, 69], [bx - 1, 81], [bx - 6, 81]], H('#e8dcc8')); R.linea(bx, 64, bx, 82, K); }
  for (let k = 0; k < 6; k++) { const x = 150 + Math.round(ha(k, 3) * 100 + Math.sin(t + k) * 3), y = 76 + (k % 3) * 4; if (Math.sin(t * 3 + k) > 0.3) R.linea(x, y, x + 3, y, H('#f4f8f8')); }
  // el humo de la chimenea
  for (let k = 0; k < 6; k++) { const u = ((t * 0.4 + k / 6) % 1), x = Math.round(113 + u * 16 + Math.sin(u * 5 + k) * 2), y = Math.round(42 - u * 16); R.disco(x, y, u < 0.4 ? 1 : 2, u < 0.5 ? H('#b8b0a8') : H('#d8d0c8')); }
  // las gallinas que picotean
  for (let k = 0; k < 3; k++) { const x = 118 + k * 9, y = 110 + (k % 2), pica = Math.sin(t * 5 + k * 2) > 0.4 ? 1 : 0; R.rect(x, y - 3, x + 4, y - 1, H('#f4f0e8')); R.pset(x + 4 + (k % 2 ? 0 : 0), y - 4 + pica, H('#f4f0e8')); R.pset(x + 5, y - 4 + pica, H('#e8a030')); R.pset(x + 4, y - 5 + pica, H('#c83a3a')); R.pset(x + 1, y, H('#e8a030')); R.pset(x + 3, y, H('#e8a030')); R.pset(x, y - 4, H('#d8d0c0')); }
  // la vaca que pace y anda despacio
  { const vx = Math.round(lerp(212, 186, tramo(t, P4, E.duracion))), vy = 120, cab = Math.sin(t * 1.5) > 0 ? 1 : 0, pas = Math.floor(t * 2) % 2;
    R.rect(vx, vy - 9, vx + 16, vy - 3, H('#f4ece0')); R.rect(vx, vy - 9, vx + 16, vy - 9, K); R.rect(vx + 3, vy - 8, vx + 7, vy - 5, H('#3a2a20')); R.rect(vx + 11, vy - 7, vx + 14, vy - 4, H('#3a2a20'));
    for (const [lx, d] of [[vx + 1, pas], [vx + 4, 1 - pas], [vx + 12, pas], [vx + 15, 1 - pas]]) R.rect(lx, vy - 3, lx, vy - d, H('#3a2a20'));
    R.rect(vx - 5, vy - 8 + cab * 3, vx, vy - 4 + cab * 3, H('#f4ece0')); R.pset(vx - 5, vy - 5 + cab * 3, H('#e8a0a0')); R.pset(vx - 3, vy - 7 + cab * 3, K); R.pset(vx - 1, vy - 9 + cab * 3, H('#c8b8a0'));
    R.linea(vx + 16, vy - 8, vx + 18, vy - 4 + Math.round(Math.sin(t * 3)), H('#3a2a20')); }
  // la granjera sale por la puerta en «farmers» y echa grano a las gallinas
  const sale = tramo(t, FARMERS - 0.1, LIVED + 0.2), xg = Math.round(lerp(96, 108, ease(sale)));
  if (t > FARMERS - 0.1) {
    R.actor(EL.granjera, xg, 104 + Math.round(lerp(-6, 0, ease(sale))), t, { dir: 1, anda: sale > 0 && sale < 1, sonrisa: t > LIVED, dedo: t > LIVED + 0.2 && Math.sin(t * 5) > 0 });
    if (t > LIVED + 0.2) for (let k = 0; k < 5; k++) { const u = ((t * 1.4 + k / 5) % 1); R.pset(Math.round(xg + 16 + u * 6 + k), Math.round(92 + u * 16), H('#f8d860')); }
  }
  // el colono vuelve del campo con la azada al hombro y saluda en «1760s»
  { const v = tramo(t, P4 + 0.1, SESENTA - 0.2), xc = Math.round(lerp(236, 150, ease(v))), saluda = t > SESENTA;
    R.actor(EL.amigo1, xc, 118, t, { dir: -1, anda: v > 0 && v < 1, sonrisa: saluda, dedo: saluda && Math.sin(t * 6) > -0.4 });
    if (!saluda) { R.linea(xc + 4, 100, xc + 18, 88, H('#6a4a2a')); R.linea(xc + 4, 101, xc + 18, 89, H('#8a6438')); R.rect(xc + 17, 86, xc + 21, 88, H('#5a5a62')); } else { R.linea(xc + 10, 118, xc + 18, 94, H('#6a4a2a')); R.rect(xc + 16, 92, xc + 21, 94, H('#5a5a62')); } }
  R.recorte(null);
  // fuera del cuadro: el brillo que cruza la placa en «1760s» y el segundero del reloj
  if (t > SESENTA && t < SESENTA + 0.9) { const bx = Math.round(lerp(132, 172, (t - SESENTA) / 0.9)); for (let j = 0; j < 10; j++) { const x = bx + (j >> 1); if (x > 133 && x < 171) R.pset(x, 146 + j, H('#fffbe0')); } }
  { const a = t * 1.05 - 1.57; R.linea(292, 72, 292 + Math.round(Math.cos(a) * 7), 72 + Math.round(Math.sin(a) * 7), H('#c83a3a')); R.linea(292, 72, 292, 66, K); R.linea(292, 72, 296, 73, K); }
  // la técnica entra, mira el cuadro y señala la placa en «1760s»
  const w = tramo(t, P4 + 0.2, FARMERS + 0.9), xt = Math.round(lerp(334, 188, ease(w)));
  R.actor(EL.operaria, xt, 179, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: t > LIVED && t < SESENTA, dedo: t > SESENTA, sonrisa: t > SESENTA + 0.4 });
};
const efectos = [[2.41, 'golpecito'], [3.52, 'golpecito'], [ANYMORE, 'golpecito'], [DRIVE, 'maquina'], [P2 + 0.4, 'tecleo'], [ULTRA, 'bip'], [DATE, 'sello'], [COINS, 'brillo'], [FARMERS, 'aldea'], [SESENTA, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2026', efectos, año: 2026 });
''')

E['oi-sigue'] = ('Cada año vuelven', '''// OI-SIGUE (frases 43–44), de 2026 a 2027, y de 1795 a hoy. Tres planos:
// 1. (fondo local) junto a la cabina de la grúa, a media tarde: la boca del tubo sale del agua del brocal y queda
//    colgando, chorreando agua y barro; la operaria lo recoge con la criba; en «Still» el geólogo alumbra la boca con la
//    linterna y se ve el hueco vacío, y en «turned up» la criba se vuelca (solo barro), él se encoge de hombros («?») y el
//    gruista, en su cabina, levanta los brazos;
// 2. la calzada de hoy (corta en «and every year»): la barra pasa a 2027; el banderero gira la paleta a verde en «come
//    back» y entra el convoy (camión con tubos de acero y camioneta con baliza), que pita; en el pantalán un pescador
//    sube una nasa chorreando;
// 3. el claro de 1795 (corta en «The money pit»): uno tira de la soga de la polea y el cubo sale del hoyo en «a hole
//    under a pulley» (Daniel señala la polea); en «to» el mismo claro pasa a hoy con un fundido tramado mientras la barra
//    corre de 1795 a 2026: el tubo de acero baja por el hoyo en «most famous digs», con la valla, la torre de luz, la
//    cámara con su piloto rojo y un dron que llega.''', COMUN + r'''
const s = (f) => en('sigue', f), fa = (f) => en('famoso', f);
const HOJ = [H('#1a3a2c'), H('#285038'), H('#3a6a44'), H('#5a8a4e')];
const TUBO = ['#22282e', '#3a4450', '#56626e', '#7a8692', '#a8b4c0', '#dce6ee', '#a8b4c0', '#7a8692', '#56626e', '#3a4450', '#22282e'].map(H);
const P2 = s(0.6884), P3 = fa(0.3024);
const STILL = s(0.4243), HASNT = s(0.519), YEAR = s(0.7482), MACH = s(0.801), COME = s(0.8644);
const HOLE = fa(0.4937), PULLEY = fa(0.5946), TO = fa(0.6385), MOST = fa(0.7419), DIGS = fa(0.8272), EARTH = fa(0.928);

// ── 1 · (fondo local) la boca del tubo sale vacía, junto a la cabina de la grúa ───────────────────────────────────────
let FS = null, CS = null;
const CIE = ['#4a68a8', '#6a86bc', '#94a8cc', '#c4b8c4', '#e8c4a4', '#f4d8a8'].map(H);
const AM = [H('#8a6418'), H('#b8861c'), H('#e8b830'), H('#f8d860')];
const BOC = [226, 156, 50, 10];   // el brocal: centro, rx, ry
const fondoS = () => {
  CS = R.nuevo(); let prev = R.usar(CS);
  // el cielo de media tarde, tramado, con cirros dorados
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(CIE, Math.min(1, y / 96), x, y));
  for (let k = 0; k < 8; k++) { const x0 = 10 + ha(k, 13) * 270, y0 = 22 + ha(k, 14) * 34, l = 20 + ha(k, 15) * 34; if (x0 + l > 270 && y0 < 48) continue; for (let i = 0; i < l; i++) if (ha(i, k, 17) > 0.35) R.pset(Math.round(x0 + i), Math.round(y0 + i * 0.06), mez(rampa(CIE, y0 / 96, i, 0), H('#fff0d8'), 0.55)); }
  R.usar(prev);
  FS = R.nuevo(); prev = R.usar(FS);
  // la bahía al fondo, con la costa de enfrente
  for (let x = 0; x < 320; x++) { const yt = 82 + Math.round(Math.sin(x * 0.05) * 2 + ha(x, 3) * 1.2); for (let y = yt; y < 90; y++) R.pset(x, y, by4(x, y) < 0.35 ? H('#8a8aa4') : H('#9a96ac')); }
  for (let y = 90; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ha(x >> 2, y, 6) > 0.84 ? H('#f8e0b8') : y < 94 ? H('#6a86ac') : H('#5a7aa0'));
  // el bosque de la isla y los abetos
  for (let y = 98; y < 116; y++) for (let x = 0; x < 320; x++) R.pset(x, y, by4(x, y) < 0.5 ? HOJ[0] : HOJ[1]);
  for (let k = 0; k < 22; k++) { const cx = k * 15 + Math.round(ha(k, 19) * 8), cy = 98 + Math.round(ha(k, 18) * 5), r = 7 + Math.round(ha(k, 17) * 4);
    R.disco(cx, cy + 1, r, HOJ[0]); R.disco(cx - 1, cy, r - 1, HOJ[1]); R.disco(cx - 2, cy - 2, r - 4, HOJ[2]); R.disco(cx - 3, cy - 3, Math.max(1, r - 7), HOJ[3]);
    for (let q = 0; q < 10; q++) R.pset(cx + Math.round((ha(q, k, 13) - 0.5) * r * 1.6), cy + Math.round((ha(q, k, 14) - 0.5) * r * 1.3), q % 3 ? HOJ[3] : HOJ[0]); }
  for (const [x, a] of [[160, 24], [176, 30], [292, 26], [312, 20]]) { const b = 114; for (let j = 0; j < a; j++) { const w = Math.round(1 + j * 0.26) + ((j % 6) < 2 ? 1 : 0); R.rect(x - w, b - a + j, x + w, b - a + j, j % 6 < 2 ? HOJ[2] : HOJ[0]); R.pset(x - w, b - a + j, HOJ[1]); } }
  // la valla de obra con su malla naranja
  for (let y = 108; y <= 122; y++) for (let x = 0; x < 320; x++) if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) R.pset(x, y, y < 113 ? H('#f08a44') : H('#d86a2a'));
  for (let x = 0; x < 320; x++) { R.pset(x, 108, H('#c85a1a')); R.pset(x, 122, H('#a84a1a')); }
  for (let x = 150; x < 320; x += 24) { R.rect(x - 1, 104, x + 1, 124, K); R.rect(x, 105, x, 123, H('#a8b0b8')); }
  // la torre de luz de la derecha (por debajo de la zona de Atom)
  for (let y = 52; y < 122; y++) { R.pset(296, y, K); R.pset(304, y, K); if ((y - 52) % 8 < 1) R.linea(296, y, 304, y + 8, H('#8a929c')); R.pset(297, y, H('#c8ccd4')); }
  caja(288, 46, 312, 53, H('#3a3a46')); for (const x of [291, 297, 303, 309]) { R.rect(x - 1, 48, x + 1, 51, H('#c8ccd4')); R.pset(x, 49, H('#ffffff')); }
  // el suelo: barro tramado con roderas, piedras, charcos que reflejan el cielo
  const BAR = ['#4a3424', '#5a3e2a', '#6a4a32', '#7a583c', '#8a6848'].map(H);
  for (let y = 122; y < 180; y++) for (let x = 0; x < 320; x++) {
    const ru = Math.abs(x - (120 - (y - 122) * 1.4)) < 5 || Math.abs(x - (142 - (y - 122) * 1.1)) < 5;
    R.pset(x, y, rampa(BAR, 0.6 - (y - 122) / 160 + (ha(x >> 1, y >> 1, 7) - 0.5) * 0.5 - (ru ? 0.25 : 0), x, y)); }
  for (let k = 0; k < 80; k++) { const x = Math.round(ha(k, 21) * 318), y = 124 + Math.round(ha(k, 22) * 54); R.pset(x, y, H('#a8957a')); R.pset(x + 1, y, H('#c8b8a0')); R.pset(x, y + 1, H('#3a2818')); }
  const charco = (cx, cy, rx, ry) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i * i) / (rx * rx) + (j * j) / (ry * ry); if (d <= 1) R.pset(cx + i, cy + j, d > 0.75 ? H('#3a2818') : j < 0 ? H('#e8c8a8') : H('#94a8cc')); } R.linea(cx - rx + 3, cy - 1, cx - 2, cy - 1, H('#fff0d8')); };
  charco(70, 172, 18, 3); charco(150, 160, 10, 2);
  // las esteras de madera alrededor del brocal
  for (let j = 0; j < 5; j++) { const y = 140 + j * 7; R.rect(160, y, 318, y + 6, j % 2 ? H('#8a6038') : H('#9a6c40')); R.rect(160, y, 318, y, H('#b8885a')); R.rect(160, y + 6, 318, y + 6, H('#4a3018'));
    for (let x = 166 + (j * 17) % 30; x < 318; x += 38) { R.rect(x, y + 1, x, y + 5, H('#4a3018')); R.pset(x + 3, y + 3, H('#c8ccd4')); }
    for (let x = 162; x < 318; x += 3) if (ha(x, j, 9) > 0.7) R.pset(x, y + 2 + (x % 2), H('#6a4a28')); }
  // la cabina de la grúa, grande a la izquierda: contrapeso, carcasa, rejilla, cabina con su cristal y la oruga
  caja(0, 66, 26, 118, H('#3a3a46')); for (let y = 70; y < 116; y += 8) for (let x = 0; x < 26; x++) R.pset(x, y + ((x >> 2) % 2) * 2, ((x >> 2) % 2) ? H('#e8b830') : K);
  for (let y = 74; y <= 120; y++) for (let x = 24; x <= 132; x++) R.pset(x, y, rampa(AM, 0.9 - (y - 74) / 70 + (x < 30 ? -0.3 : 0), x, y));
  R.rect(24, 73, 132, 73, K); R.rect(24, 74, 132, 75, H('#fff0a0')); R.rect(24, 120, 132, 121, K);
  for (let x = 34; x < 84; x += 4) { R.rect(x, 84, x + 2, 106, H('#5a4010')); R.rect(x, 84, x, 106, H('#2a2010')); R.pset(x + 2, 84, H('#f8d860')); }
  caja(88, 88, 92, 108, H('#c8961c')); for (const [x, y] of [[30, 78], [86, 78], [30, 116], [86, 116]]) { R.pset(x, y, H('#5a4010')); R.pset(x, y - 1, H('#fff0a0')); }
  for (let x = 26; x <= 90; x += 16) R.rect(x, 64, x, 73, H('#c8ccd4')); R.rect(26, 64, 90, 64, H('#c8ccd4')); R.rect(26, 65, 90, 65, H('#6a6a76'));
  caja(56, 52, 60, 73, H('#3a3a46')); R.rect(55, 51, 61, 52, H('#2a2a32'));
  for (let y = 38; y <= 120; y++) for (let x = 94; x <= 146; x++) R.pset(x, y, rampa(AM, 0.95 - (y - 38) / 110 + (x > 142 ? -0.35 : 0), x, y));
  R.rect(94, 37, 146, 37, K); R.rect(93, 37, 93, 120, K); R.rect(147, 37, 147, 120, K); R.rect(95, 38, 145, 39, H('#fff0a0'));
  caja(100, 44, 140, 80, H('#9ac4e0'));
  for (let y = 44; y <= 80; y++) for (let x = 100; x <= 140; x++) R.pset(x, y, rampa([H('#5a7a9a'), H('#7aa0c0'), H('#a8cce4'), H('#d8ecf8')], 0.85 - (y - 44) / 44 + (x - 100) / 90, x, y));
  R.rect(120, 82, 121, 118, H('#8a6418')); caja(124, 96, 128, 98, H('#3a3a46'));
  for (const [y0, y1] of [[106, 114]]) for (let y = y0; y <= y1; y += 4) caja(138, y, 150, y + 1, H('#5a5a62'));
  // la pluma de celosía: sale de la cabina y sube por la derecha hasta perderse (fuera de la barra del año)
  const pluma = (ox) => { R.linea(146 + ox, 70, 238 + ox, -6, K); R.linea(147 + ox, 70, 239 + ox, -6, H('#e8b830')); };
  pluma(0); pluma(-9);
  for (let i = 0; i < 12; i++) { const u0 = i / 12, u1 = (i + 0.5) / 12, a = [146 + u0 * 92, 70 - u0 * 76], b = [137 + u1 * 92, 70 - u1 * 76]; R.linea(Math.round(a[0]), Math.round(a[1]), Math.round(b[0]), Math.round(b[1]), H('#b8861c')); const c = [146 + (i + 1) / 12 * 92, 70 - (i + 1) / 12 * 76]; R.linea(Math.round(b[0]), Math.round(b[1]), Math.round(c[0]), Math.round(c[1]), H('#b8861c')); }
  // la oruga: zapatas, rodillos, rueda dentada y barro pegado
  for (let y = 120; y <= 150; y++) for (let x = 0; x <= 172; x++) { const borde = y < 123 || y > 147 || x > 168; R.pset(x, y, borde ? (((x + (y < 123 ? 0 : 2)) >> 2) % 2 ? H('#2a2a32') : H('#4a4a56')) : H('#3a3a46')); }
  for (let x = 14; x < 160; x += 22) { R.disco(x, 135, 8, K); R.disco(x, 135, 7, H('#5a5a66')); R.disco(x, 135, 3, H('#8a8a96')); R.pset(x - 2, 132, H('#c8ccd4')); }
  for (let k = 0; k < 40; k++) { const x = Math.round(ha(k, 31) * 170), y = 140 + Math.round(ha(k, 32) * 10); R.rect(x, y, x + 1 + (k % 3), y + 1, k % 2 ? H('#6a4a30') : H('#8a6848')); }
  // la parte de atrás del brocal (el hueco oscuro con agua turbia)
  for (let j = -BOC[3]; j <= BOC[3]; j++) for (let i = -BOC[2]; i <= BOC[2]; i++) { const d = (i * i) / (BOC[2] * BOC[2]) + (j * j) / (BOC[3] * BOC[3]); if (d <= 1) R.pset(BOC[0] + i, BOC[1] + j, d > 0.82 ? H('#5a6068') : j < -4 ? H('#1a1210') : by4(i, j) < 0.3 ? H('#5a4430') : H('#3a2a1c')); }
  // delante, a la izquierda: las cajas de muestras apiladas y la manguera
  for (const [x, y, c] of [[2, 158, '#3a7ac8'], [22, 164, '#3a7ac8'], [4, 146, '#e8c040']]) { caja(x, y, x + 18, y + 12, H(c)); R.rect(x, y, x + 18, y + 1, mez(H(c), H('#ffffff'), 0.4)); R.rect(x + 6, y + 4, x + 12, y + 5, K); for (let i = x + 2; i < x + 18; i += 4) R.pset(i, y + 9, mez(H(c), K, 0.4)); }
  for (let i = 0; i <= 50; i++) { const u = i / 50, x = Math.round(lerp(40, 150, u)), y = Math.round(176 - u * 6 + Math.sin(u * 9) * 2); R.rect(x, y, x + 1, y + 1, K); if (i % 6 === 0) R.pset(x, y, H('#e8c040')); }
  R.usar(prev);
};
const p1 = (t) => {
  if (!FS) fondoS();
  R.copiar(CS);
  const NB = [H('#c8a8a0'), H('#f4dccc'), H('#fff8f0')];
  for (let k = 0; k < 6; k++) { const v = [2, 3.5, 5][k % 3], w = [44, 30, 20][k % 3], cy = [70, 56, 36][k % 3] + (k > 2 ? 5 : 0), cx = ((ha(k, 41) * 420 + t * v) % 420) - 50; if (cx > 250 && cy < 48) continue; nube(Math.round(cx), cy, w, k + 6, NB); }
  gaviotas(t, 3, 24, 66, 9);
  capa(FS);
  // el humo del escape de la grúa, la baliza y el operador que mira por el cristal
  for (let k = 0; k < 5; k++) { const u = ((t * 0.7 + k / 5) % 1), x = Math.round(58 + u * 14 + Math.sin(u * 6 + k) * 2), y = Math.round(49 - u * 22), r = u < 0.3 ? 1 : u < 0.7 ? 2 : 3; R.disco(x, y, r, u < 0.5 ? H('#5a5a64') : H('#8a8a94')); }
  { const on = Math.floor(t * 3) % 2; caja(116, 32, 122, 36, on ? H('#ff8a2a') : H('#8a3a1a')); if (on) { R.pset(115, 33, H('#ffd890')); R.pset(123, 33, H('#ffd890')); R.pset(119, 30, H('#ffd890')); } }
  R.recorte([100, 44, 140, 80]);
  R.actor(EL.operario, 112, 92, t, { dir: 1, sorpresa: t > 0.6 && t < STILL, triste: t > HASNT, brazos: t > HASNT + 0.2 && t < HASNT + 0.9 });
  for (let y = 44; y <= 80; y++) for (let x = 100; x <= 140; x++) { const d = x - 100 + (y - 44) * 0.6; if ((d > 8 && d < 12) || (d > 15 && d < 17)) R.pset(x, y, mez(R.pget(x, y), H('#ffffff'), 0.45)); }
  R.recorte(null);
  // el tubo sube: la boca sale del agua del brocal y queda colgando, chorreando
  const sale = ease(tramo(t, 0.1, STILL - 0.5)), my = Math.round(lerp(170, 106, sale)), x0 = 186, x1 = 266, cx = 226, rx = 40, ry = 9;
  const tem = sale > 0 && sale < 1 ? (Math.floor(t * 24) % 2) : 0;
  const tope = BOC[1] - 3;   // el agua del brocal tapa lo que queda dentro
  for (let y = 0; y < Math.min(my, tope); y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0); let c = rampa(TUBO, u, x, y);
    const barro = (y - (my - 70)) / 70 + (ha(x >> 1, (y - my) >> 2, 3) - 0.5) * 0.6; if (barro > 0.35) c = barro > 0.75 ? H('#4a3424') : by4(x, y) < 0.5 ? H('#6a4a32') : mez(c, H('#6a4a32'), 0.6);
    R.pset(x + tem, y, c); }
  R.rect(x0 - 1 + tem, 0, x0 - 1 + tem, Math.min(my, tope), K); R.rect(x1 + 1 + tem, 0, x1 + 1 + tem, Math.min(my, tope), K);
  // los aros soldados y las marcas de profundidad, que suben con el tubo
  for (let k = 0; k < 6; k++) { const ys = my - 22 - k * 28; if (ys < 2 || ys > tope) continue; for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), yy = ys + Math.round(Math.sin(u * Math.PI) * 3); R.pset(x + tem, yy, H('#2a3038')); R.pset(x + tem, yy + 1, mez(rampa(TUBO, u, x, yy), H('#ffffff'), 0.35)); } }
  for (let k = 0; k < 9; k++) { const ym = my - 16 - k * 14; if (ym < 4 || ym > tope - 2) continue; R.rect(x0 + 8 + tem, ym, x0 + 18 + tem, ym + 1, H('#f4f4f0')); if (k % 2 === 1) cifras(String(((k + 1) / 2) * 10), x0 + 21 + tem, ym - 2, H('#f4f4f0')); }
  // la boca abierta: el aro de acero y, dentro, el hueco vacío
  const lin = t > STILL - 0.35 && t < HASNT + 0.3;
  const sx = Math.round(cx - 8 + Math.sin(t * 5) * 9);
  if (my < tope) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i * i) / (rx * rx) + (j * j) / (ry * ry); if (d > 1 || my + j > tope) continue;
    let c = d > 0.72 ? (j > 0 ? H('#c8d2dc') : H('#7a8692')) : j < -2 ? H('#120e0c') : by4(i, j) < 0.4 ? H('#2a201a') : H('#1a1410');
    if (lin && d <= 0.72) { const e = ((cx + i - sx) ** 2) / 196 + ((j + 1) ** 2) / 20; if (e < 1) c = e < 0.45 ? H('#c8c0b0') : H('#8a8478'); if (e < 1 && (i + 40) % 9 === 0) c = H('#5a564e'); }
    R.pset(cx + i + tem, my + j, c); }
  // el agua y el barro que chorrean de la boca al brocal, cada vez menos
  const fl = 1 - tramo(t, STILL - 0.4, P2), sup = BOC[1] - 2;
  if (my < tope) for (const [dx, an, k0] of [[-34, 2, 0], [-20, 3, 1], [-4, 2, 2], [12, 3, 3], [28, 2, 4]]) {
    const yr = my + Math.round(Math.sqrt(Math.max(0, 1 - (dx * dx) / (rx * rx))) * ry);
    for (let y = yr + 1; y < sup; y++) for (let i = 0; i < an; i++) { const ph = ((y - t * 90 + k0 * 13 + i * 5) % 12 + 12) % 12; if (ha(k0, i, 3) + fl * 1.2 < 0.6 + (ph < 6 ? 0 : 0.6)) continue; R.pset(cx + dx + i + tem, y, ph < 3 ? H('#e8f4fc') : ph < 8 ? H('#8ab0cc') : H('#7a5a3c')); }
    for (let q = 0; q < 3; q++) { const u = ((t * 2 + q / 3 + k0 * 0.2) % 1); if (fl > 0.15 || q === 0) R.pset(cx + dx + Math.round((q - 1) * u * 6), sup - Math.round(Math.sin(u * Math.PI) * 4), H('#e8f4fc')); } }
  // las gotas que caen después, ya sin chorro
  if (t > STILL) for (let q = 0; q < 4; q++) { const u = ((t * 1.3 + q * 0.27) % 1), x = cx - 30 + q * 19 + tem, yr = my + 7; R.pset(x, Math.round(lerp(yr, sup, u * u)), H('#a8cce4')); }
  // las ondas en el agua del brocal
  for (let k = 0; k < 2; k++) { const r = ((t * 10 + k * 7) % 14) + 3; for (let i = -r * 2; i <= r * 2; i++) { const x = cx - 10 + k * 22 + i; if (Math.abs(x - BOC[0]) < BOC[2] - 4 && Math.abs(Math.abs(i) - r * 2) < 1.5) R.pset(x, BOC[1] - 1, H('#c8b8a0')); } }
  // el labio de delante del brocal
  for (let i = -BOC[2]; i <= BOC[2]; i++) { const yy = BOC[1] + Math.round(Math.sqrt(Math.max(0, 1 - (i * i) / (BOC[2] * BOC[2]))) * BOC[3]); R.pset(BOC[0] + i, yy, H('#c8ccd4')); R.pset(BOC[0] + i, yy + 1, H('#7a828c')); R.pset(BOC[0] + i, yy + 2, K); }
  // la operaria con la criba bajo el chorro: la sacude en «Still» y la vuelca en «turned up»: solo barro
  const xo = 152, sac = t > STILL && t < HASNT ? Math.round(Math.sin(t * 40) * 2) : 0, vuelca = tramo(t, HASNT, HASNT + 0.5);
  R.actor(EL.operaria, xo, 172, t, { dir: 1, sorpresa: t > 1.0 && t < STILL, triste: t > HASNT + 0.3 });
  { const kx = xo + 30 + sac, ky = 152 + Math.round(vuelca * 3), inc = vuelca * 0.5;
    // el mango que lleva en la mano y el aro de la criba, visto un poco desde arriba, con su rejilla
    R.linea(xo + 13, 157, kx - 11, ky + 1, K); R.linea(xo + 13, 156, kx - 11, ky, H('#a8784a'));
    for (let j = -4; j <= 4; j++) for (let i = -11; i <= 11; i++) { const d = (i * i) / 121 + (j * j) / 16; if (d > 1) continue; const yy = ky + j + Math.round(i * inc);
      R.pset(kx + i, yy, d > 0.62 ? (j < 0 ? H('#c8986a') : H('#8a5a30')) : ((i + j) % 2 === 0 || (i - j) % 4 === 0) ? H('#2a2a32') : H('#8a929c')); }
    for (let i = -11; i <= 11; i++) R.pset(kx + i, ky + 5 + Math.round(i * inc), K);
    if (vuelca < 0.2) for (let k = 0; k < 7; k++) R.rect(kx - 6 + k * 2, ky - 1 - (k % 2), kx - 5 + k * 2, ky, k % 2 ? H('#6a4a30') : H('#8a6848'));
    else if (vuelca < 1) for (let k = 0; k < 6; k++) { const u = (vuelca - 0.2) / 0.8; R.rect(kx + 8 + k, Math.round(ky + 4 + u * (12 + k * 3)), kx + 9 + k, Math.round(ky + 5 + u * (12 + k * 3)), k % 2 ? H('#6a4a30') : H('#8a6848')); }
    if (fl > 0.2 && vuelca === 0) for (let q = 0; q < 3; q++) { const u = ((t * 3 + q / 3) % 1); R.pset(kx - 4 + q * 4, ky + 6 + Math.round(u * 12), H('#a8cce4')); } }
  // el geólogo llega, alumbra la boca con la linterna en «Still» y se encoge de hombros en «turned up»
  const ll = tramo(t, 0.4, 1.7), xg = Math.round(lerp(336, 280, ease(ll))), encoge = t > HASNT + 0.3 && t < HASNT + 1.1;
  const rg = R.actor(EL.geologo, xg, 170, t, { dir: -1, anda: ll > 0 && ll < 1, dedo: lin, brazos: encoge, sorpresa: lin && t < HASNT, triste: t > HASNT + 0.3 });
  if (lin) { const [hx, hy] = rg.mano; caja(hx - 3, hy, hx, hy + 2, H('#3a3a46')); R.pset(hx - 4, hy + 1, H('#fff8c8'));
    const A = [hx - 4, hy + 1], B1 = [sx - 9, my - 1], B2 = [sx + 9, my + 3];
    for (let y = Math.min(B1[1], A[1]) - 1; y <= Math.max(B2[1], A[1]) + 1; y++) for (let x = B1[0]; x <= A[0]; x++) { const u = (A[0] - x) / (A[0] - B1[0] || 1), ya = lerp(A[1], B1[1], u), yb = lerp(A[1], B2[1], u); if (y >= ya && y <= yb) R.pset(x, y, mez(R.pget(x, y), H('#fff8c8'), by4(x, y) < 0.5 ? 0.6 : 0.3)); }
    R.linea(A[0], A[1], B1[0], B1[1], H('#fff8c8')); R.linea(A[0], A[1], B2[0], B2[1], mez(H('#fff8c8'), H('#e8c040'), 0.4)); R.disco(A[0], A[1], 2, H('#fffbe8')); }
  if (t > HASNT + 0.3 && t < P2 - 0.1) R.bocadillo(xg + 4, 124, { icono: '?' });
  // por delante: el cono de la derecha
  for (let j = 0; j < 14; j++) { const w = Math.round(1 + j * 0.45); R.rect(310 - w, 164 + j, 310 + w, 164 + j, (j > 4 && j < 8) ? H('#f4f4f0') : H('#f06a2a')); R.pset(310 - w - 1, 164 + j, K); R.pset(310 + w + 1, 164 + j, K); }
};

// ── 2 · la calzada: cada año vuelven las máquinas ────────────────────────────────────────────────────────────────────
// el camión de plataforma con tres tubos de acero, de perfil hacia la derecha
const camionTubos = (x, S, t) => {
  x = Math.round(x);
  const g = Math.floor(t * 8) % 2;
  // la plataforma y los tubos (de lado: cilindros con brillo, aros y la boca)
  caja(x - 56, S - 9, x - 2, S - 6, H('#3a3a46')); R.rect(x - 56, S - 9, x - 2, S - 9, H('#6a6a76'));
  for (const [j, dx] of [[0, 0], [1, 0], [2, 4]]) { const y0 = S - 16 - j * 6 + (j === 2 ? 0 : 0), xa = x - 54 + (j === 2 ? 6 : 0) + (j === 1 ? 0 : 0), xb = x - 6 - (j === 2 ? 6 : 0);
    const yy = j === 2 ? S - 22 : S - 15; const off = j === 1 ? 26 : 0;
    const a0 = j === 2 ? xa + 2 : j === 1 ? x - 30 : xa, b0 = j === 2 ? xb - 2 : j === 1 ? xb : x - 31;
    if (j === 2) { for (let y = yy - 3; y <= yy + 3; y++) for (let xx = a0; xx <= b0; xx++) R.pset(xx, y, rampa(TUB, (y - yy + 3) / 6, xx, y)); R.rect(a0 - 1, yy - 4, a0 - 1, yy + 4, K); R.rect(b0 + 1, yy - 4, b0 + 1, yy + 4, K); R.rect(a0, yy - 4, b0, yy - 4, K); R.disco(b0 + 1, yy, 3, H('#1a1a20')); R.rect(b0 + 1, yy - 3, b0 + 1, yy + 3, H('#8a96a2')); }
    else { for (let y = yy - 3; y <= yy + 3; y++) for (let xx = a0; xx <= b0; xx++) R.pset(xx, y, rampa(TUB, (y - yy + 3) / 6, xx, y)); R.rect(a0 - 1, yy - 4, a0 - 1, yy + 4, K); R.rect(b0 + 1, yy - 4, b0 + 1, yy + 4, K); R.rect(a0, yy - 4, b0, yy - 4, K); R.rect(b0 + 1, yy - 3, b0 + 1, yy + 3, H('#8a96a2')); R.rect(a0 + 6, yy - 3, a0 + 6, yy + 3, H('#5a6068')); } }
  R.rect(x - 42, S - 24, x - 41, S - 9, H('#e8783a')); R.rect(x - 18, S - 24, x - 17, S - 9, H('#e8783a'));
  // la cabina con su ventanilla, el tubo de escape y la baliza
  caja(x, S - 20, x + 18, S - 6, H('#c83a2a')); R.rect(x, S - 20, x + 18, S - 19, H('#e86a4a')); R.poligono([[x + 18, S - 20], [x + 22, S - 14], [x + 22, S - 6], [x + 18, S - 6]], H('#a82a1a'));
  caja(x + 8, S - 18, x + 18, S - 13, H('#8ac0e0')); R.pset(x + 9, S - 17, H('#e8f4fc')); R.rect(x + 2, S - 25, x + 3, S - 20, H('#3a3a46'));
  for (let k = 0; k < 3; k++) { const u = ((t * 1.5 + k / 3) % 1); R.disco(Math.round(x + 2 - u * 10), Math.round(S - 27 - u * 6), u < 0.5 ? 1 : 2, H('#8a8a94')); }
  R.rect(x + 20, S - 9, x + 22, S - 8, H('#f8e8a0')); R.rect(x - 1, S - 22, x + 4, S - 21, g ? H('#ff9a3a') : H('#8a4a1a'));
  for (const u of [-48, -36, -12, 6, 16]) { R.disco(x + u, S - 2, 3, K); R.disco(x + u, S - 2, 1, H('#8a929c')); R.pset(x + u + (g ? 1 : -1), S - 2, H('#5a6068')); }
};
const TUB = ['#dce6ee', '#a8b4c0', '#7a8692', '#56626e', '#3a4450'].map(H);
const camioneta = (x, S, t) => {
  x = Math.round(x); const g = Math.floor(t * 5) % 2;
  caja(x - 12, S - 8, x + 12, S - 3, H('#f4f4f0')); caja(x - 2, S - 14, x + 8, S - 8, H('#f4f4f0')); caja(x + 1, S - 13, x + 7, S - 9, H('#8ac0e0'));
  R.rect(x - 12, S - 6, x + 12, S - 6, H('#e8783a')); R.rect(x + 1, S - 16, x + 5, S - 15, g ? H('#ff9a3a') : H('#ffd890')); R.pset(x + 12, S - 5, H('#f8e8a0'));
  caja(x - 11, S - 11, x - 4, S - 9, H('#c8c8c0'));
  for (const u of [-7, 7]) { R.disco(x + u, S - 2, 2, K); R.pset(x + u, S - 2, H('#8a929c')); }
};
const p2 = (t) => {
  T.oakHoy(R, t, { encuadre: 'calzada', camiones: false });
  // la baliza de la grúa de la isla
  if (Math.floor(t * 2.4) % 3 === 0) { R.pset(265, 51, H('#ff8a3a')); R.pset(264, 51, H('#ffd890')); R.pset(266, 51, H('#ffd890')); }
  // el pescador del pantalán sube una nasa que chorrea
  const nas = ease(tramo(t, P2 + 0.6, P3 - 0.8)), ny = Math.round(lerp(172, 150, nas)), tira = nas > 0 && nas < 1 && Math.sin(t * 7) > 0;
  R.actor(EL.marinero39, 74, 153, t, { dir: 1, brazos: tira, sonrisa: nas >= 1 });
  R.linea(88, tira ? 132 : 138, 102, ny - 6, H('#c8a46a'));
  if (ny < 168) { for (let j = 0; j <= 8; j++) for (let i = 0; i <= 10; i++) if (i % 3 === 0 || j % 3 === 0 || i === 10 || j === 8) R.pset(97 + i, ny - 8 + j, (i + j) % 2 ? H('#3a3a46') : H('#6a6a76')); R.rect(99, ny - 6, 101, ny - 4, H('#c83a2a'));
    for (let k = 0; k < 4; k++) { const u = ((t * 2 + k / 4) % 1); R.pset(98 + k * 3, Math.round(ny + 1 + u * 10), H('#c8e8f8')); } }
  // el banderero da paso: la paleta pasa de roja a verde en «come back» y saluda al convoy
  const verde = t > COME - 0.15;
  R.actor(EL.operario, 26, 121, t, { dir: 1, habla: !verde && Math.sin(t * 7) > 0.4, sonrisa: verde, brazos: verde && t < COME + 0.6 });
  { const sw = verde ? Math.round(Math.sin(t * 7) * 2) : 0; R.linea(40, 112, 42 + sw, 96, H('#5a5a62')); R.disco(42 + sw, 93, 4, K); R.disco(42 + sw, 93, 3, verde ? H('#3ac85a') : H('#e83a3a')); R.pset(41 + sw, 92, H('#ffffff')); }
  // el convoy que vuelve: el camión con los tubos y la camioneta con su baliza, por delante de la gente
  const xc = lerp(-30, 206, ease(tramo(t, P2 + 0.2, P3 + 0.4))), xk = xc - 92;
  camioneta(xk, 120, t); camionTubos(xc, 120, t);
  if (t > COME && t < COME + 0.5) for (const [dx, dy] of [[26, -24], [29, -20], [27, -16]]) R.pset(Math.round(xc) + dx, 120 + dy, H('#f8e040'));
};

// ── 3 · el claro: de un hoyo bajo una polea a la excavación de hoy ───────────────────────────────────────────────────
const antes = (t) => {
  const g = T.isla1795(R, t, { encuadre: 'claro', cavado: 1 });
  const [, , bx, by] = g.polea || [160, 64, 160, 98];
  // el amigo tira de la soga y el cubo sube del hoyo; Daniel mira y señala la polea en «pulley»
  const sube = ease(tramo(t, P3 + 0.3, HOLE + 0.4)), cy = Math.round(lerp(150, 112, sube)), tira = sube > 0 && sube < 1;
  R.actor(EL.amigo1, 100, 146, t, { dir: 1, brazos: tira && Math.sin(t * 6) > 0, sonrisa: sube >= 1 });
  R.linea(bx - 2, by, 115, tira && Math.sin(t * 6) > 0 ? 118 : 124, H('#c8a46a')); R.linea(bx + 2, by, 160, cy - 10, H('#c8a46a'));
  R.actor(EL.mcginnis, 196, 146, t, { dir: -1, sorpresa: t > HOLE && t < PULLEY, dedo: t > PULLEY, sonrisa: t > PULLEY + 0.3 });
  // el cubo de madera con sus aros, lleno de tierra
  if (cy < 146) { R.linea(154, cy - 8, 160, cy - 10, K); R.linea(166, cy - 8, 160, cy - 10, K); R.poligono([[153, cy - 8], [167, cy - 8], [165, cy + 2], [155, cy + 2]], H('#8a5a30')); R.linea(153, cy - 8, 167, cy - 8, K); R.linea(155, cy + 2, 165, cy + 2, K); R.linea(153, cy - 8, 155, cy + 2, K); R.linea(167, cy - 8, 165, cy + 2, K); R.linea(154, cy - 5, 166, cy - 5, H('#3a3a46')); R.linea(155, cy - 1, 165, cy - 1, H('#3a3a46')); R.rect(155, cy - 10, 165, cy - 9, H('#6a4a30')); }
  T.a_islaDelante(R, t, { encuadre: 'claro' });
};
const hoy = (t) => {
  T.isla1795(R, t, { encuadre: 'claro', cavado: 1, polea: false });
  // la valla de obra por detrás del hoyo
  for (let y = 116; y <= 130; y++) for (let x = 70; x <= 250; x++) if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) R.pset(x, y, H('#f08a44'));
  for (let x = 70; x <= 250; x++) { R.pset(x, 116, H('#c85a1a')); R.pset(x, 130, H('#a84a1a')); }
  for (let x = 72; x <= 250; x += 30) { R.rect(x - 1, 112, x + 1, 134, K); R.rect(x, 113, x, 133, H('#a8b0b8')); }
  // la torre de luz con los focos encendidos
  for (let y = 66; y < 146; y++) { R.pset(258, y, K); R.pset(264, y, K); if ((y - 66) % 8 < 1) R.linea(258, y, 264, y + 8, H('#8a929c')); R.pset(259, y, H('#c8ccd4')); }
  caja(248, 58, 274, 66, H('#3a3a46')); for (const x of [251, 257, 263, 269]) { R.rect(x - 1, 60, x + 1, 64, H('#fff8c8')); R.pset(x, 61, H('#ffffff')); }
  for (let k = 0; k < 40; k++) { const x = 250 + Math.round(ha(k, 2) * 24 - (ha(k, 3) * 50)), y = 68 + Math.round(ha(k, 3) * 40); if (by4(x, y) < 0.3) R.pset(x, y, mez(R.pget(x, y), H('#fff8c8'), 0.4)); }
  // el brocal de acero y las esteras alrededor del hoyo
  for (let j = 0; j < 3; j++) { const y = 148 + j * 5; R.rect(112, y, 208, y + 4, j % 2 ? H('#8a6038') : H('#9a6c40')); R.rect(112, y, 208, y, H('#b8885a')); R.rect(112, y + 4, 208, y + 4, H('#4a3018')); }
  for (let j = -10; j <= 10; j++) for (let i = -34; i <= 34; i++) { const d = (i * i) / 1156 + (j * j) / 100; if (d <= 1 && d > 0.62) R.pset(160 + i, 142 + j, j < 0 ? H('#7a828c') : H('#c8ccd4')); else if (d <= 0.62) R.pset(160 + i, 142 + j, H('#1a1210')); }
  // el tubo de acero que baja por el hoyo en «most famous digs»
  const baja = ease(tramo(t, MOST - 0.3, DIGS + 0.4)), tb = Math.round(lerp(104, 150, baja)), tt = tb - 62, vib = baja > 0 && baja < 1 ? (Math.floor(t * 30) % 2) : 0;
  for (let y = Math.max(tt, 24); y < Math.min(tb, 146); y++) for (let x = 140; x <= 180; x++) R.pset(x + vib, y, rampa(TUBO, (x - 140) / 40, x, y));
  R.rect(139 + vib, tt, 139 + vib, Math.min(tb, 146), K); R.rect(181 + vib, tt, 181 + vib, Math.min(tb, 146), K);
  for (let k = 0; k < 3; k++) { const ys = tt + 14 + k * 20; if (ys < 145) for (let x = 140; x <= 180; x++) R.pset(x + vib, ys + Math.round(Math.sin((x - 140) / 40 * Math.PI) * 2), H('#2a3038')); }
  for (let i = -34; i <= 34; i++) { const yy = 142 + Math.round(Math.sqrt(Math.max(0, 1 - (i * i) / 1156)) * 10); if (Math.abs(i) < 22) { R.pset(160 + i, yy, H('#c8ccd4')); R.pset(160 + i, yy + 1, K); } }
  // el vibrador y el cable que sube y se pierde entre las hojas
  const vy = tt - 16; caja(144 + vib, vy, 176 + vib, vy + 14, H('#e8b830')); R.rect(144 + vib, vy, 176 + vib, vy, H('#f8d860')); for (let x = 144; x <= 176; x++) for (let y = vy + 10; y <= vy + 13; y++) R.pset(x + vib, y, ((x + y) >> 2) % 2 ? K : H('#f8d860'));
  if (Math.floor(t * 4) % 2) R.pset(160 + vib, vy - 1, H('#ff9a3a'));
  R.linea(159, vy - 1, 159, 20, K); R.linea(161, vy - 1, 161, 20, K); R.linea(160, vy - 1, 160, 20, H('#5a6068'));
  for (const [cx, cy, r] of [[160, 18, 6], [152, 21, 4], [168, 20, 5]]) { R.disco(cx, cy, r, H('#1a3a24')); R.disco(cx - 1, cy - 1, r - 2, H('#2a5030')); }
  // la cámara en su trípode con el piloto rojo, y su operador
  { const cx = 226, cy = 140; R.linea(cx + 6, cy, cx - 2, 166, K); R.linea(cx + 6, cy, cx + 14, 166, K); R.linea(cx + 6, cy, cx + 6, 166, H('#4a4a52'));
    caja(cx - 6, cy - 10, cx + 14, cy - 1, H('#3a3a42')); R.rect(cx - 6, cy - 10, cx + 14, cy - 10, H('#5a5a66')); caja(cx - 13, cy - 8, cx - 7, cy - 3, H('#2a2a32')); R.pset(cx - 12, cy - 6, H('#8ac0e0'));
    if (Math.floor(t * 2) % 2) { R.pset(cx - 4, cy - 12, H('#ff3a3a')); R.pset(cx - 4, cy - 13, H('#ff9a8a')); } else R.pset(cx - 4, cy - 12, H('#6a2a2a'));
    R.actor(EL.tecnico, cx + 16, 166, t, { dir: -1 }); }
  // los técnicos: uno guía el tubo con señales, la otra con la tableta
  const guia = t > MOST - 0.2 && t < DIGS + 0.4;
  R.actor(EL.operario, 100, 146, t, { dir: 1, brazos: guia && Math.sin(t * 6) > 0, dedo: !guia && t > TO + 0.3, sonrisa: t > DIGS + 0.4 });
  R.actor(EL.operaria, 196, 148, t, { dir: -1, habla: Math.sin(t * 7) > 0.3 && t < EARTH, sonrisa: t > EARTH });
  caja(192, 134, 197, 139, H('#2a2a32')); R.rect(193, 135, 196, 138, H('#5ac8e8'));
  // el dron que llega con sus luces
  { const u = ease(tramo(t, TO + 0.4, DIGS)), dx = Math.round(lerp(340, 214, u)), dy = Math.round(lerp(58, 84, u) + Math.sin(t * 3) * 2), hel = Math.floor(t * 20) % 2;
    caja(dx - 4, dy - 1, dx + 4, dy + 1, H('#3a3a46')); R.linea(dx - 7, dy - 2, dx + 7, dy - 2, K); R.rect(dx - 9, dy - 3 - hel, dx - 5, dy - 3 - hel, H('#c8ccd4')); R.rect(dx + 5, dy - 3 - (1 - hel), dx + 9, dy - 3 - (1 - hel), H('#c8ccd4'));
    R.pset(dx - 1, dy + 2, K); R.pset(dx, dy + 2, H('#5ac8e8')); if (Math.floor(t * 3) % 2) { R.pset(dx - 4, dy, H('#ff3a3a')); R.pset(dx + 4, dy, H('#3aff6a')); } }
  T.a_islaDelante(R, t, { encuadre: 'claro' });
};
let BM = null;
const p3 = (t) => {
  const u = tramo(t, TO, TO + 0.8);
  if (u <= 0) { antes(t); return; }
  if (u >= 1) { hoy(t); return; }
  BM = BM || R.nuevo(); const prev = R.usar(BM); hoy(t); R.usar(prev);
  antes(t);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (by4(x, y) * 0.6 + ha(x >> 1, y >> 1, 5) * 0.4 < u) R.pset(x, y, BM[y * 320 + x]);
};
const año = (t) => t < P2 ? 2026 : t < P3 ? (t < YEAR ? 2026 : 2027) : t < TO ? 1795 : t < TO + 0.9 ? Math.round(lerp(1795, 2026, ease(tramo(t, TO, TO + 0.9)))) : 2026;
const efectos = [[0.15, 'maquina'], [1.7, 'chof'], [STILL - 0.35, 'interruptor'], [MACH, 'motor'], [COME, 'claxon'], [HOLE, 'golpecito'], [TO, 'whoosh'], [MOST, 'maquina'], [DIGS + 0.3, 'zumbido']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')
