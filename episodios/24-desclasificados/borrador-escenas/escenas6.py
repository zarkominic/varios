E = {}

# Ayudas comunes de pintura (tramas de Bayer, ruido, nubes de tres tonos, bocadillos), repetidas en cada escena.
AYUDAS = r'''
const { rect, pset, linea, disco, poligono } = R;
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const trama = (x, y) => BY[(y & 3) * 4 + (x & 3)] / 16;
const rampa = (cs, v, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(v + trama(x, y))))];
const h2 = (x, y) => { let n = (x * 374761393 + y * 668265263) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const H = (s) => hex(s);
const HS = (a) => a.map(H);
const K = H('#1a1420');
const suave = (u) => u * u * (3 - 2 * u);
// nube de tres tonos (sombra, cuerpo, luz) hecha de bolas; w de ancho
const nube = (x, y, w, [cS, c, cL]) => {
  const r = w / 5, b = [[-0.32, 0.1, 0.75], [-0.1, -0.25, 1], [0.14, -0.15, 0.95], [0.34, 0.12, 0.7], [0, 0.2, 0.9]];
  for (const [dx, dy, kk] of b) disco(x + dx * w, y + dy * r * 2 + 1.5, r * kk, cS);
  for (const [dx, dy, kk] of b) disco(x + dx * w, y + dy * r * 2, r * kk - 0.6, c);
  for (const [dx, dy, kk] of b.slice(1, 3)) disco(x + dx * w - 1, y + dy * r * 2 - 1.2, r * kk * 0.55, cL);
};
// un pájaro que aletea, en (x, y)
const pajaro = (x, y, t, c) => { const f = Math.floor(t * 6 + x * 0.1) % 2; x = Math.round(x); y = Math.round(y);
  pset(x, y, c); if (f) { pset(x - 1, y - 1, c); pset(x + 1, y - 1, c); pset(x - 2, y - 1, c); pset(x + 2, y - 1, c); } else { pset(x - 1, y, c); pset(x + 1, y, c); pset(x - 2, y + 1, c); pset(x + 2, y + 1, c); } };
const fondoFijo = (cache, clave, pinta) => { let b = cache[clave]; if (!b) { b = R.nuevo(); const prev = R.usar(b); R.recorte(null); pinta(); R.recorte(null); R.usar(prev); cache[clave] = b; } R.copiar(b); };
const CACHE = {};
// cielo tramado de y0 a y1 con su rampa (de arriba abajo)
const cieloT = (y0, y1, cs) => { for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(cs, (y - y0) / (y1 - y0) * (cs.length - 1) + (h2(x >> 3, y >> 2) - 0.5) * 0.4, x, y)); };
// bocadillo blanco con borde, de x0..x1 × y0..y1, con el rabito hacia (tx, ty)
const bocadillo = (x0, y0, x1, y1, tx, ty) => {
  const B = H('#fbf8ee'), BS = H('#d8d2c0');
  poligono([[x0 + 4, y1 - 1], [x0 + 10, y1 - 1], [tx, ty]], K); poligono([[x0 + 5, y1 - 2], [x0 + 9, y1 - 2], [tx + 1, ty - 2]], B);
  rect(x0 + 1, y0, x1 - 1, y1, K); rect(x0, y0 + 1, x1, y1 - 1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, B); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, BS);
};
// destello de cuatro puntas en (x, y), de radio r
const destello = (x, y, r, c) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { pset(x + i, y, c); pset(x, y + i, c); } for (let i = 1; i < r / 2; i++) { pset(x + i, y + i, c); pset(x - i, y - i, c); pset(x + i, y - i, c); pset(x - i, y + i, c); } };
// vapor de una taza que sube y se mece
const vapor = (x, y, t, c) => { for (let k = 0; k < 6; k++) { const u = ((t * 0.7 + k / 6) % 1), yy = Math.round(y - u * 16), xx = Math.round(x + Math.sin(u * 7 + t * 2 + k) * 2); if (u < 0.85) pset(xx, yy, c); if (u < 0.5) pset(xx + 1, yy, c); } };
// la taza con su asa (x, y: abajo a la izquierda), w de ancho
const taza = (x, y, w, c, cS) => { rect(x - 1, y - 11, x + w, y, K); rect(x, y - 10, x + w - 1, y - 1, c); rect(x + w - 3, y - 10, x + w - 1, y - 1, cS); rect(x, y - 10, x + w - 1, y - 9, H('#4a2a18')); rect(x + w + 1, y - 8, x + w + 3, y - 3, K); pset(x + w + 1, y - 6, c); pset(x + w + 2, y - 6, c); pset(x + w + 1, y - 5, c); };
// un boceto a lápiz (sin letras): 'base' (barracones y radar), 'barco', 'isla' (con su torre), 'avion'; en la caja
// x, y, w, hh; u (0–1) cuánto se ha dibujado
const boceto = (tipo, x, y, w, hh, col, u = 1) => {
  const L = (a, b, c, d, f) => { if (u >= f) linea(x + a * w, y + b * hh, x + c * w, y + d * hh, col); };
  if (tipo === 'base') {
    L(0.05, 0.85, 0.95, 0.85, 0); L(0.1, 0.85, 0.1, 0.55, 0.1); L(0.1, 0.55, 0.4, 0.55, 0.15); L(0.4, 0.55, 0.4, 0.85, 0.2);
    L(0.45, 0.85, 0.45, 0.6, 0.25); L(0.45, 0.6, 0.7, 0.6, 0.3); L(0.7, 0.6, 0.7, 0.85, 0.35); L(0.8, 0.85, 0.8, 0.4, 0.45);
    L(0.68, 0.22, 0.8, 0.4, 0.55); L(0.92, 0.22, 0.8, 0.4, 0.6); L(0.68, 0.22, 0.92, 0.22, 0.65); L(0.15, 0.62, 0.2, 0.62, 0.7); L(0.25, 0.62, 0.3, 0.62, 0.72);
    for (let i = 0; i < 6; i++) L(0.05 + i * 0.16, 0.9, 0.05 + i * 0.16, 0.97, 0.8); L(0.05, 0.94, 0.9, 0.94, 0.85);
  } else if (tipo === 'barco') {
    L(0.05, 0.6, 0.95, 0.6, 0); L(0.05, 0.6, 0.15, 0.8, 0.1); L(0.15, 0.8, 0.85, 0.8, 0.2); L(0.85, 0.8, 0.95, 0.6, 0.3);
    L(0.35, 0.6, 0.35, 0.42, 0.4); L(0.35, 0.42, 0.6, 0.42, 0.45); L(0.6, 0.42, 0.6, 0.6, 0.5); L(0.48, 0.42, 0.48, 0.18, 0.6); L(0.4, 0.28, 0.56, 0.28, 0.65);
    L(0.7, 0.6, 0.85, 0.5, 0.75); for (let i = 0; i < 5; i++) L(0.02 + i * 0.2, 0.9, 0.12 + i * 0.2, 0.86, 0.85);
  } else if (tipo === 'isla') {
    L(0.05, 0.8, 0.25, 0.62, 0); L(0.25, 0.62, 0.5, 0.58, 0.1); L(0.5, 0.58, 0.75, 0.64, 0.2); L(0.75, 0.64, 0.95, 0.8, 0.3);
    L(0.55, 0.6, 0.55, 0.2, 0.45); L(0.5, 0.6, 0.55, 0.2, 0.5); L(0.6, 0.6, 0.55, 0.2, 0.55); L(0.47, 0.32, 0.63, 0.32, 0.6);
    for (let i = 0; i < 4; i++) L(0.1 + i * 0.22, 0.9, 0.2 + i * 0.22, 0.88, 0.75); L(0.15, 0.25, 0.3, 0.2, 0.85); L(0.3, 0.2, 0.38, 0.26, 0.9);
  } else {
    L(0.1, 0.5, 0.9, 0.5, 0); L(0.45, 0.2, 0.55, 0.5, 0.2); L(0.45, 0.8, 0.55, 0.5, 0.35); L(0.1, 0.35, 0.18, 0.5, 0.5); L(0.1, 0.65, 0.18, 0.5, 0.6); L(0.9, 0.5, 0.82, 0.45, 0.7);
  }
};
// la X roja de rotulador que se traza en dos trazos (u 0–1) sobre la caja x0..x1 × y0..y1
const equisRoja = (x0, y0, x1, y1, u) => {
  const R1 = H('#d0282c'), R2 = H('#8a1a1e');
  const tr = (ax, ay, bx, by, v) => { if (v <= 0) return; const n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay))); for (let i = 0; i <= n * Math.min(1, v); i++) { const px = Math.round(ax + (bx - ax) * i / n), py = Math.round(ay + (by - ay) * i / n); rect(px - 1, py - 1, px + 1, py + 1, R1); pset(px + 1, py + 1, R2); } };
  tr(x0, y0, x1, y1, u * 2); tr(x1, y0, x0, y1, u * 2 - 1);
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-fortmeade'] = ('Fort Meade', '''// DC-FORTMEADE (frase 13), 1978 → 1995, sin cartela. Cinco planos:
// 1. (fondo local: Fort Meade por fuera) el jeep llega a la puerta del barracón de ladrillo; el vidente se baja y va
//    hacia la puerta («a small military intelligence unit at Fort Meade»); el oficial le señala dentro y la puerta se
//    abre; a lo lejos, el obelisco y la cúpula de Washington, con su destello en «near Washington»;
// 2. (la oficina) corta en «which»: el oficial sella la carpeta tres veces y en su bocadillo pasan los nombres en clave
//    (barco, ojo…) hasta la estrella dorada en «Stargate»; el vidente dibuja; el científico de pie lo apunta;
// 3. (inserto local: la pared con el calendario) corta en «Counting»: el calendario arranca años de 1972 a 1994, fuera el
//    árbol cambia de estación, la pila de carpetas y la planta crecen; en «20 years» se pega la escarapela del «20»;
// 4. (el corcho de cerca) corta en «a handful»: el rotulador rojo rodea la base («bases»), el barco («ships») y el avión
//    («missing planes»); GAG 5: en «quiet office» un boceto nuevo se dibuja solo… y es el gato espía; el gato de verdad
//    asoma por abajo, lo ve y «!»;
// 5. (inserto local: la mesa con fajos) corta en «In total»: caen fajos de billetes en cuatro pilas, la sumadora saca
//    cinta y el contador sube hasta $20,000,000 en «$20 million»; el gato espía mira la montaña de billetes.''', AYUDAS + r'''
const a = (f) => en('stargate', f);
const P2 = a(0.2558), P3 = a(0.4241), P4 = a(0.6233), P5 = a(0.8867);
const UNIDAD = a(0.1337), FORT = a(0.1624), WASH = a(0.2082);
const CLAVE1 = a(0.2998), CLAVE2 = a(0.3307), STAR = a(0.3769);
const TEMPRANO = a(0.4456), VEINTE = a(0.5739);
const BOCETA = a(0.6906), BASES = a(0.7211), BARCOS = a(0.7552), AVIONES = a(0.7884), QUIETA = a(0.8279), OFICINA = a(0.8432);
const COSTO = a(0.9175), DOLAR = a(0.9390), MILLON = a(0.9534);

// ── 1 · Fort Meade por fuera (fondo local) ──────────────────────────────────────────────────────────────────────────
const LAD = HS(['#5a2418', '#74301f', '#8c3e2a', '#a24e36', '#b86044']);
const ventanaFM = (x, y, w, hh, pers) => {
  rect(x - 2, y - 2, x + w + 1, y + hh + 1, H('#d8d4c8')); rect(x - 3, y + hh + 1, x + w + 2, y + hh + 2, H('#ece8dc')); rect(x - 3, y + hh + 3, x + w + 2, y + hh + 3, H('#5a3424'));
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) { const r = (i + j * 0.8) % 22; pset(x + i, y + j, r < 3 ? H('#a8c4e0') : j < 2 ? H('#2a3a52') : H((i + j) % 2 ? '#3a5072' : '#42587a')); }
  for (let j = 0; j < pers; j++) rect(x, y + j, x + w - 1, y + j, j % 2 ? H('#c8c0a8') : H('#ece4cc'));
  if (pers) pset(x + w - 3, y + pers + 1, H('#8a8070'));
  rect(x + (w >> 1), y, x + (w >> 1), y + hh - 1, H('#d8d4c8')); rect(x, y + (hh >> 1), x + w - 1, y + (hh >> 1), H('#c8c4b8'));
};
const deposito = () => {   // el depósito de agua (se pinta encima de las nubes)
  const M = H('#c8ccd0'), ML = H('#eef0f2'), MS = H('#8a9098');
  for (const [x0, x1] of [[18, 22], [40, 36]]) linea(x0, 104, x1, 52, MS);
  linea(29, 104, 29, 52, MS); for (let y = 62; y < 104; y += 12) { linea(20, y + 8, 38, y, H('#9aa0a8')); linea(20, y, 38, y + 8, H('#9aa0a8')); }
  rect(14, 40, 44, 52, K); rect(15, 41, 43, 51, M); rect(15, 41, 20, 51, ML); rect(37, 41, 43, 51, MS); rect(15, 46, 43, 46, H('#a8aeb6'));
  poligono([[13, 41], [29, 31], [45, 41]], K); poligono([[15, 40], [29, 32], [43, 40]], H('#9aa0a8')); linea(16, 40, 29, 32, ML);
  pset(29, 30, H('#d83030')); rect(14, 52, 44, 53, MS);
};
const antena = () => { linea(232, 34, 232, 60, H('#3a3a40')); linea(226, 40, 238, 40, H('#3a3a40')); linea(228, 46, 236, 46, H('#3a3a40')); linea(230, 52, 234, 52, H('#3a3a40')); };
const fondoFM = () => fondoFijo(CACHE, 'fm', () => {
  cieloT(0, 104, HS(['#3a6ab8', '#4a7ac4', '#5c8ccf', '#709fd9', '#86b2e2', '#a2c8ea']));
  // la arboleda azulada del horizonte
  for (let x = 0; x < 320; x++) { const top = 88 + Math.round(4 * Math.sin(x * 0.13) + 3 * Math.sin(x * 0.051 + 1) + h2(x >> 1, 7) * 2);
    for (let y = top; y < 108; y++) pset(x, y, rampa(HS(['#3e5e52', '#4c6e5c', '#5c7e68']), 2.2 - (y - top) * 0.12 + (h2(x >> 1, y >> 1) - 0.5), x, y)); }
  // los prados de detrás, a los lados del barracón, con una valla y una fila de barracones bajos
  for (let y = 104; y < 142; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(HS(['#4a6e3a', '#5a8244', '#6a9450']), 1.1 + (y - 104) * 0.03 + (h2(x >> 2, y >> 1) - 0.5) * 0.9, x, y));
  for (const [x0, x1] of [[0, 60], [258, 320]]) { rect(x0, 100, x1, 112, H('#8a6a5a')); rect(x0, 98, x1, 99, H('#5a4a44')); for (let x = x0 + 3; x < x1; x += 7) rect(x, 103, x + 3, 106, H('#c8d4e0')); }
  for (let x = 0; x < 320; x += 5) { rect(x, 122, x, 128, H('#c8c8c0')); } rect(0, 123, 319, 123, H('#b8b8b0')); rect(0, 126, 319, 126, H('#b8b8b0'));
  // Washington a lo lejos, a la derecha: el obelisco y la cúpula, azulados por la bruma
  const LJ = H('#8494b4'), LJL = H('#a8b6ce'), LJS = H('#6e7e9e');
  rect(297, 60, 301, 94, LJ); rect(297, 60, 297, 94, LJL); rect(301, 60, 301, 94, LJS); pset(298, 58, LJ); pset(299, 57, LJ); pset(300, 58, LJ); pset(299, 56, LJL);
  rect(258, 88, 280, 95, LJS); rect(261, 80, 275, 88, LJ); disco(268, 79, 6, LJ); disco(266, 77, 3, LJL); rect(267, 69, 269, 73, LJ); pset(268, 68, LJL);
  for (let x = 262; x < 275; x += 3) rect(x, 82, x, 87, LJS);
  // el barracón de ladrillo de dos plantas
  for (let y = 66; y < 142; y++) for (let x = 64; x < 256; x++) { const fila = (y - 66) >> 2, off = (fila % 2) * 4, jv = ((x - 64 + off) % 8) === 0, jh = ((y - 66) % 4) === 3;
    pset(x, y, jh || jv ? LAD[1] : rampa(LAD, 2.5 + (h2((x + off) >> 3, fila) - 0.5) * 1.4 - (x > 248 ? 1 : 0) + (x < 70 ? 0.6 : 0), x, y)); }
  rect(60, 60, 259, 66, H('#c8c0b0')); rect(60, 60, 259, 60, H('#ece6d8')); rect(60, 66, 259, 67, H('#4a3428'));
  for (let x = 62; x < 258; x += 6) pset(x, 63, H('#a8a090'));
  rect(64, 98, 141, 99, H('#c8c0b0')); rect(179, 98, 255, 99, H('#c8c0b0')); rect(64, 100, 141, 100, H('#5a3424')); rect(179, 100, 255, 100, H('#5a3424'));
  for (const x0 of [86, 196]) { rect(x0, 52, x0 + 16, 60, H('#8a8e94')); rect(x0, 52, x0 + 16, 52, H('#b8bcc2')); for (let x = x0 + 2; x < x0 + 15; x += 3) rect(x, 54, x, 58, H('#5a5e64')); }
  const pers = [6, 0, 12, 4, 9, 0, 3, 14, 0, 7, 5, 11];
  [72, 94, 116, 190, 212, 234].forEach((x, i) => { ventanaFM(x, 74, 14, 18, pers[i]); ventanaFM(x, 106, 14, 18, pers[i + 6]); });
  // la portada de hormigón con la escarapela de la estrella (sin letras), la marquesina y los escalones
  rect(142, 66, 178, 142, H('#d8d0c0')); rect(142, 66, 143, 142, H('#f0eadc')); rect(177, 66, 178, 142, H('#a89e8c'));
  for (let y = 70; y < 142; y += 9) rect(144, y, 176, y, H('#c4bcac'));
  disco(160, 82, 10, K); disco(160, 82, 9, H('#2a3a7a')); R.anillo(160, 82, 7, H('#c8a040')); R.icono('estrella', 154, 78, H('#f6f0d8'), H('#1a2450'), 2);
  rect(136, 96, 184, 100, K); rect(137, 96, 183, 99, H('#e8e2d4')); rect(137, 99, 183, 99, H('#a8a090')); rect(138, 101, 182, 103, H('#7a5a48'));
  rect(149, 105, 171, 142, K);
  for (let s = 0; s < 3; s++) rect(140 - s * 3, 142 + s * 2, 180 + s * 3, 143 + s * 2, s % 2 ? H('#a8a090') : H('#d0c8b8'));
  // los setos junto a la fachada
  for (const [x0, x1] of [[64, 138], [182, 256]]) for (let x = x0; x < x1; x++) { const top = 128 + Math.round(2 * Math.sin(x * 0.7) + h2(x, 3) * 2);
    for (let y = top; y < 143; y++) pset(x, y, rampa(HS(['#2a4a24', '#3a5e2e', '#4e763a', '#6a9048']), 2.6 - (y - top) * 0.18 + (h2(x >> 1, y >> 1) - 0.5) * 1.4, x, y)); }
  // el césped, el camino a la puerta, la acera, el bordillo y el aparcamiento
  for (let y = 142; y < 156; y++) for (let x = 0; x < 320; x++) { if (y < 143 && x > 63 && x < 257) continue; pset(x, y, rampa(HS(['#3a6a2a', '#4a7e34', '#5c9440', '#78ac52']), 1.6 + (h2(x >> 1, y) - 0.5) * 1.6 + (y - 142) * 0.04, x, y)); if (h2(x, y + 9) > 0.93) pset(x, y - 1, H('#8ac060')); }
  poligono([[148, 146], [172, 146], [176, 156], [144, 156]], H('#cfc7b6')); for (let y = 149; y < 156; y += 3) linea(146, y, 174, y, H('#b4ac9c'));
  rect(0, 156, 319, 160, H('#c8c4bc')); for (let x = 6; x < 320; x += 18) rect(x, 156, x, 160, H('#a8a49c')); rect(0, 160, 319, 161, H('#e8e4dc')); rect(0, 162, 319, 162, H('#5a5a60'));
  for (let y = 163; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(HS(['#3a3c44', '#46484f', '#52545b']), 1.2 + (h2(x >> 1, y >> 1) - 0.5) * 1.2, x, y));
  for (const x0 of [210, 246, 282]) linea(x0, 164, x0 + 10, 179, H('#d8d8d0'));
  for (const [cx, cy] of [[226, 172], [262, 168], [120, 176]]) for (let i = -5; i <= 5; i++) for (let j = -2; j <= 2; j++) if (i * i / 25 + j * j / 4 < 1 && h2(cx + i, cy + j) > 0.3) pset(cx + i, cy + j, H('#2c2e34'));
  // la farola y el cartel de la base (una estrella y rayas, sin letras)
  rect(118, 104, 120, 156, H('#3a3a40')); rect(118, 104, 118, 156, H('#6a6a72')); rect(114, 98, 124, 104, K); rect(115, 99, 123, 102, H('#f0e8c0')); rect(116, 154, 122, 156, H('#2a2a30'));
  for (const x of [22, 52]) rect(x, 128, x + 2, 156, H('#4a3424'));
  rect(16, 116, 60, 134, K); rect(17, 117, 59, 133, H('#3a4a2a')); rect(17, 117, 59, 118, H('#5a6a3e')); R.icono('estrella', 21, 120, H('#e8d070'), K, 1);
  for (const y of [121, 125, 129]) rect(31, y, 55, y + 1, H('#d8d0b0'));
});
const banderaEEUU = (x, y, w, hh, t) => {
  const RJ = [H('#c8303a'), H('#9a2028')], BL = [H('#f2eee6'), H('#c8c4bc')], AZ = [H('#2a3a7a'), H('#1c2858')];
  for (let i = 0; i < w; i++) { const ph = Math.sin(t * 5 - i * 0.5), dy = Math.round(ph * 1.6 * (i / w)), sh = ph < -0.45 ? 1 : 0;
    for (let j = 0; j < hh; j++) { let c = Math.floor(j * 7 / hh) % 2 ? BL[sh] : RJ[sh]; if (i < w * 0.45 && j < hh * 0.55) c = (i % 3 === 1 && j % 2 === 1) ? BL[0] : AZ[sh]; pset(x + i, y + j + dy, c); } }
};
const jeep = (x, base, t, anda, dentro) => {
  const O = H('#5a6438'), OL = H('#7a8650'), OS = H('#3e4628'), b = anda ? (Math.sin(t * 22) > 0.5 ? -1 : 0) : 0;
  for (const wx of [x + 9, x + 38]) { disco(wx, base - 6, 6.5, K); disco(wx, base - 6, 5, H('#2a2a2e')); disco(wx, base - 6, 2.5, H('#6a6e5a')); const g = anda ? t * 14 : 0.6; pset(wx + Math.round(Math.cos(g) * 3.5), base - 6 + Math.round(Math.sin(g) * 3.5), H('#8a8e7a')); }
  disco(x - 1, base - 16 + b, 5.5, K); disco(x - 1, base - 16 + b, 4.5, H('#2a2a2e')); disco(x - 1, base - 16 + b, 2, O);
  if (dentro) dentro(b);
  poligono([[x + 1, base - 23 + b], [x + 30, base - 23 + b], [x + 33, base - 17 + b], [x + 48, base - 17 + b], [x + 49, base - 8 + b], [x + 1, base - 8 + b]], K);
  poligono([[x + 2, base - 22 + b], [x + 30, base - 22 + b], [x + 33, base - 16 + b], [x + 47, base - 16 + b], [x + 48, base - 9 + b], [x + 2, base - 9 + b]], O);
  rect(x + 2, base - 22 + b, x + 30, base - 21 + b, OL); rect(x + 33, base - 16 + b, x + 47, base - 15 + b, OL); rect(x + 2, base - 10 + b, x + 48, base - 9 + b, OS);
  for (const wx of [x + 9, x + 38]) { rect(wx - 8, base - 13 + b, wx + 8, base - 12 + b, OS); }
  R.icono('estrella', x + 14, base - 19 + b, H('#ecece0'), OS, 1);
  linea(x + 30, base - 22 + b, x + 27, base - 34 + b, K); linea(x + 31, base - 22 + b, x + 28, base - 34 + b, H('#a8b0b8')); rect(x + 26, base - 35 + b, x + 30, base - 34 + b, K);
  rect(x + 46, base - 16 + b, x + 49, base - 12 + b, K); pset(x + 47, base - 14 + b, H('#f8f0c0')); pset(x + 48, base - 14 + b, H('#f8f0c0'));
  if (anda) for (let kk = 0; kk < 3; kk++) { const u = ((t * 2 + kk / 3) % 1); pset(Math.round(x - 4 - u * 10), Math.round(base - 6 - u * 4), u < 0.5 ? H('#9a9a9a') : H('#c8c8c8')); }
};
const p1 = (t) => {
  fondoFM();
  // nubes de tres tonos a tres velocidades y pájaros, por encima del tejado (recortadas al cielo)
  R.recorte([0, 0, 319, 57]);
  const NB = HS(['#9ab4d4', '#d8e4f0', '#ffffff']), NB2 = HS(['#8aa4c8', '#c4d4e6', '#eef4fa']);
  nube(((t * 2.2 + 60) % 400) - 40, 34, 44, NB); nube(((t * 3.4 + 210) % 400) - 40, 22, 30, NB2); nube(((t * 1.2 + 330) % 400) - 40, 48, 56, NB2);
  R.recorte(null);
  for (let kk = 0; kk < 3; kk++) pajaro((t * 9 + kk * 14 + 40) % 360 - 20, 42 + kk * 3 + Math.sin(t * 2 + kk) * 2, t + kk, H('#2a3040'));
  deposito(); antena();
  // el mástil y la bandera
  rect(265, 46, 267, 156, H('#d8dce0')); rect(265, 46, 265, 156, H('#f2f4f6')); rect(267, 46, 267, 156, H('#8a9098')); disco(266, 44, 2, H('#e8c860'));
  banderaEEUU(268, 47, 22, 13, t);
  // «near Washington»: la cúpula lejana brilla
  const w = tramo(t, WASH - 0.1, WASH + 0.7); if (w > 0 && w < 1) destello(268, 72, Math.round(2 + 4 * Math.sin(w * Math.PI)), H('#fff8d8'));
  // la puerta de cristal que se abre (deja ver el pasillo encendido)
  const ab = tramo(t, FORT + 0.5, FORT + 0.95);
  rect(150, 106, 170, 141, H('#f0d890')); for (let y = 108; y < 140; y += 3) rect(151, y, 169, y, H('#e0c070'));
  rect(150, 120, 170, 141, H('#c8a868')); rect(156, 112, 164, 140, H('#a88850'));
  const wh = Math.round(10 * (1 - ab));
  for (const [x0, d] of [[150, 1], [170, -1]]) { if (wh <= 0) break; const xa = d > 0 ? x0 : x0 - wh + 1, xb = d > 0 ? x0 + wh - 1 : x0;
    rect(xa, 106, xb, 141, H('#3a4a5a')); rect(xa + 1, 108, xb - 1, 139, H('#5a7898')); if (xb - xa > 3) rect(xa + 2, 109, xa + 3, 138, H('#9ab8d4')); rect(d > 0 ? xb : xa, 106, d > 0 ? xb : xa, 141, H('#c8ccd0')); }
  // otro jeep aparcado a la derecha
  jeep(290, 178, t, false, null);
  // dos soldados pasan corriendo por la acera, al fondo
  for (const [d, dx] of [[EL.soldadoGA2, 0], [EL.soldadoGA3, 18]]) { const x = Math.round(330 + dx - t * 34); if (x > -20 && x < 330) R.actor(d, x, 158, t, { dir: -1, anda: true }); }
  // el jeep llega y para; el vidente se baja y va a la puerta; el oficial lo recibe y señala dentro
  const lle = suave(tramo(t, 0.3, 2.3)), jx = Math.round(lerp(-60, 30, lle)), baja = 2.5;
  const vi = tramo(t, baja + 0.2, FORT + 1.1), vx = Math.round(lerp(jx + 44, 153, vi)), vs = Math.round(lerp(170, 145, vi));
  const of = tramo(t, P2 - 0.9, P2), dentroOf = of >= 1;
  if (!dentroOf) R.actor(EL.generalAF, Math.round(lerp(176, 160, of)), Math.round(lerp(146, 141, of)), t, { dir: -1, habla: t > UNIDAD - 0.6 && t < FORT && Math.sin(t * 9) > 0, dedo: t > FORT && t < P2 - 0.9, sonrisa: t > baja + 1, anda: of > 0 && of < 1 });
  if (vi < 1) R.actor(EL.videnteFM, vx, vs, t, { dir: 1, anda: vi > 0 && vi < 1 });
  jeep(jx, 172, t, lle > 0 && lle < 1, (b) => {
    R.actor(EL.soldadoGA, jx + 16, 164 + b, t, { dir: 1, quieto: lle < 1 ? true : false, habla: t > baja && t < baja + 1 && Math.sin(t * 8) > 0 });
    if (t < baja) R.actor(EL.videnteFM, jx + 2, 164 + b, t, { dir: 1 });
  });
};

// ── 2 · la oficina: los nombres en clave hasta «Stargate» ─────────────────────────────────────────────────────────
const p2 = (t) => {
  const O = { encuadre: 'fortmeade' };
  T.psiquicos(R, t, O);
  // el científico de pie con su tablilla
  const ci = R.actor(EL.cientificoSRI2, 252, 150, t, { dir: -1, sostiene: [246, 132], habla: t < P2 + 0.8 && Math.sin(t * 9) > 0, sorpresa: t > STAR && t < STAR + 0.6, sonrisa: t > STAR + 0.6 });
  // el vidente dibuja con los ojos cerrados en la mesa B
  const lp = [184 + Math.round(Math.sin(t * 9) * 2), 133 + Math.round(Math.cos(t * 7))];
  const vi = R.actor(EL.videnteFM, 186, 147, t, { dir: -1, sostiene: lp });
  // el oficial sella: tres golpes (dos nombres en clave y la estrella)
  const golpes = [CLAVE1, CLAVE2, STAR], abajo = golpes.some((g) => t > g - 0.1 && t < g + 0.12);
  const of = R.actor(EL.generalAF, 62, 146, t, { dir: 1, sostiene: abajo ? [90, 136] : [88, 128], sonrisa: t > STAR });
  T.psiquicosDelante(R, t, O);
  // la carpeta en la mesa A y las marcas del sello
  rect(78, 136, 106, 140, K); rect(79, 137, 105, 139, H('#d8c08a')); rect(79, 137, 105, 137, H('#ecd8a8')); rect(86, 135, 94, 136, H('#c8ac70'));
  golpes.forEach((g, i) => { if (t > g) { rect(82 + i * 8, 137, 86 + i * 8, 139, H('#c8282a')); pset(83 + i * 8, 138, H('#f0a0a0')); } });
  // el sello en la mano del oficial
  const [mx, my] = of.mano; T.PIEZAS_DC.sello(R, mx + 1, my + 7);
  // la tablilla del científico y el lápiz del vidente
  { const [cx, cy] = ci.mano; rect(cx - 7, cy - 6, cx + 1, cy + 5, K); rect(cx - 6, cy - 5, cx, cy + 4, H('#a8743c')); rect(cx - 5, cy - 3, cx - 1, cy + 3, H('#f2eee2')); for (let y = cy - 2; y < cy + 3; y += 2) linea(cx - 4, y, cx - 2, y, H('#6a6a78')); rect(cx - 4, cy - 6, cx - 2, cy - 5, H('#9aa0a8')); }
  rect(166, 138, 184, 140, H('#f2eee2')); rect(166, 138, 184, 138, H('#ffffff')); for (let x = 168; x < 182; x += 3) pset(x, 139, H('#6a6a78'));
  { const [lx, ly] = vi.mano; linea(lx - 1, ly + 1, lx - 5, ly + 5, H('#e8c040')); pset(lx - 6, ly + 6, H('#3a3a3a')); }
  // el bocadillo con el nombre en clave del momento (sin letras: un símbolo cada vez) y la estrella final
  const ic = t > STAR ? 'estrella' : t > CLAVE2 ? 'ojo' : t > CLAVE1 ? 'barco' : null;
  if (ic) {
    const g = t > STAR ? tramo(t, STAR, STAR + 0.25) : 1;
    bocadillo(94, 96, 122, 120, 84, 126);
    const col = ic === 'estrella' ? H('#e8b830') : ic === 'ojo' ? H('#3a6aa8') : H('#5a6a7a');
    R.icono(ic, 101, 101, col, K, 2);
    if (ic === 'estrella') { const r = Math.round(3 + 3 * g); destello(124, 98, r, H('#fff4b0')); destello(92, 112, Math.max(1, r - 2), H('#fff4b0')); }
  }
};

// ── 3 · la pared con el calendario: veinte años (inserto local) ────────────────────────────────────────────────────
const AÑO3 = (t) => Math.round(lerp(1972, 1994, suave(tramo(t, P3 + 0.25, P4 - 0.35))));
const fondo3 = () => fondoFijo(CACHE, 'cal', () => {
  // pared de bloque pintado crema con sus juntas, y el zócalo caqui
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const fila = y >> 3, off = (fila % 2) * 8, jv = ((x + off) % 16) === 0, jh = (y % 8) === 7;
    pset(x, y, jh || jv ? H('#c8bc9c') : rampa(HS(['#d8ccac', '#e4d8bc', '#eee4ca']), 1.4 + (h2((x + off) >> 4, fila) - 0.5) * 0.9 + (jh || (y % 8) === 0 ? -0.6 : 0), x, y)); }
  for (let y = 112; y < 132; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(HS(['#4e5636', '#5e6842', '#6e7a4e']), 1.3 + (h2(x >> 3, y >> 2) - 0.5) * 0.6 + (y < 114 ? 1 : 0), x, y));
  rect(0, 111, 319, 111, H('#3a4026'));
  // el marco de aluminio de la ventana y su alféizar
  rect(16, 24, 120, 114, H('#8a9098')); rect(17, 25, 119, 113, H('#c8ccd2')); rect(17, 25, 18, 113, H('#e8eaee')); rect(12, 112, 124, 117, H('#d8dce0')); rect(12, 117, 124, 118, H('#7a8088'));
  // el calendario: clavo, cordel, encuadernación roja con anillas y la hoja
  disco(189, 20, 1.5, H('#5a5a60')); linea(189, 20, 152, 28, H('#6a5a48')); linea(189, 20, 226, 28, H('#6a5a48'));
  rect(147, 27, 231, 119, K); rect(148, 36, 230, 118, H('#f6f2e6')); rect(149, 116, 230, 118, H('#d8d2c0')); rect(229, 36, 230, 118, H('#d8d2c0'));
  rect(148, 28, 230, 35, H('#b83034')); rect(148, 28, 230, 29, H('#d8545a')); rect(148, 35, 230, 35, H('#7a1a1e'));
  for (let x = 154; x < 228; x += 8) { rect(x, 25, x + 1, 30, H('#3a3a40')); pset(x, 25, H('#9aa0a8')); }
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const x = 158 + c * 10, y = 76 + r * 10; rect(x, y, x + 8, y + 7, H('#c8c2b0')); rect(x + 1, y + 1, x + 7, y + 6, H('#fbf8ee')); }
  rect(158, 70, 226, 71, H('#3a3a5a'));
  // el reloj de pared
  disco(258, 70, 13, K); disco(258, 70, 12, H('#e8e4d8')); disco(258, 70, 10, H('#fbf8f0')); for (let i = 0; i < 12; i++) { const g = i / 12 * Math.PI * 2; pset(Math.round(258 + Math.cos(g) * 9), Math.round(70 + Math.sin(g) * 9), K); }
  // la mesa de madera con vetas
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.6) * 2 + y * 0.3) * 0.5;
    pset(x, y, y < 134 ? H('#c89a60') : rampa(HS(['#5a3418', '#6e4222', '#84532c', '#9a6436']), 2.2 + v + (h2(x >> 3, y) - 0.5) * 0.8 - (y - 134) * 0.02, x, y)); }
  rect(0, 134, 319, 134, H('#4a2a14'));
  // el bote de lápices y el teléfono
  rect(86, 140, 98, 158, K); rect(87, 141, 97, 157, H('#3a5a8a')); rect(87, 141, 89, 157, H('#5a7aaa'));
  for (const [x, c] of [[89, '#e8c040'], [92, '#c83030'], [95, '#e8c040']]) { rect(x, 130, x, 140, H(c)); pset(x, 129, H('#3a3a3a')); }
  // un cuadrito con un reactor (sin letras) y el termostato
  rect(284, 82, 314, 106, K); rect(285, 83, 313, 105, H('#a8743c')); rect(287, 85, 311, 103, H('#a8c8e8')); poligono([[290, 96], [306, 90], [308, 92], [294, 98]], H('#5a6a7a')); linea(296, 96, 300, 100, H('#5a6a7a'));
  rect(292, 114, 302, 124, K); rect(293, 115, 301, 123, H('#e8e4d8')); disco(297, 119, 3, H('#c8c4b8')); pset(297, 117, H('#c82828'));
  rect(12, 150, 38, 162, K); rect(13, 151, 37, 161, H('#2a2a30')); rect(14, 144, 36, 150, K); rect(15, 145, 35, 149, H('#3a3a42')); disco(25, 156, 4, H('#e8e4d8')); disco(25, 156, 1.5, H('#2a2a30'));
});
const p3 = (t) => {
  fondo3();
  const año = AÑO3(t), n = año - 1972, est = ((t - P3) * 1.1) % 4;   // la estación: 0 primavera … 3 invierno
  // fuera de la ventana (recortado a su hueco): el cielo, los barracones, el árbol que cambia de estación
  R.recorte([19, 26, 118, 111]);
  const inv = est >= 3, oto = est >= 2 && est < 3;
  const SKY = inv ? HS(['#8a96a8', '#a0aab8', '#b8c0cc']) : HS(['#5a8ad0', '#78a2dc', '#a2c4ea']);
  for (let y = 26; y < 112; y++) for (let x = 19; x < 119; x++) pset(x, y, y > 92 ? (inv ? rampa(HS(['#d8e0e8', '#f2f6fa']), 1 + h2(x >> 1, y) - 0.4, x, y) : rampa(HS(['#4a7a34', '#5e9040', '#78a852']), 1.2 + h2(x >> 1, y) - 0.5, x, y)) : y > 80 ? (x > 70 ? H('#9a5a44') : H('#8a8e94')) : rampa(SKY, (y - 26) / 54 * 2.2, x, y));
  for (let x = 74; x < 119; x += 9) { linea(x, 80, x, 92, H('#6a3a2c')); rect(x + 2, 83, x + 5, 86, H('#c8d8e8')); }
  rect(20, 76, 68, 80, H('#6a6e74')); for (let x = 22; x < 68; x += 6) rect(x, 82, x + 3, 86, H('#c8d8e8'));
  nube(((t * 6) % 140) + 10, 40, 22, inv ? HS(['#9aa2ae', '#c8ced6', '#e8ecf0']) : HS(['#9ab4d4', '#dce8f2', '#ffffff']));
  rect(54, 64, 58, 98, H('#4a3020')); rect(54, 64, 55, 98, H('#6a4a30')); linea(56, 72, 42, 56, H('#4a3020')); linea(56, 70, 72, 52, H('#4a3020')); linea(56, 66, 58, 44, H('#4a3020'));
  if (!inv) { const C3 = oto ? HS(['#8a3a14', '#c86a20', '#e8a040']) : est < 1 ? HS(['#4a8a34', '#7ab848', '#f0b8c8']) : HS(['#2a5a24', '#3e7a30', '#5e9a3e']);
    for (const [cx, cy, r] of [[56, 50, 14], [44, 56, 10], [70, 54, 11], [58, 40, 9]]) disco(cx, cy, r, C3[0]);
    for (const [cx, cy, r] of [[55, 48, 12], [44, 54, 8], [69, 52, 9], [57, 39, 7]]) disco(cx, cy, r, C3[1]);
    for (let kk = 0; kk < 26; kk++) { const x = 40 + Math.round(h2(kk, 3) * 36), y = 34 + Math.round(h2(kk, 7) * 28); pset(x, y, C3[2]); }
    if (oto) for (let kk = 0; kk < 5; kk++) { const u = ((t * 0.8 + kk / 5) % 1); pset(Math.round(48 + kk * 6 + Math.sin(u * 9) * 3), Math.round(56 + u * 40), C3[1]); } }
  else for (let kk = 0; kk < 18; kk++) { const u = ((t * 0.4 + kk / 18) % 1); pset(Math.round(22 + h2(kk, 1) * 94 + Math.sin(u * 8 + kk) * 2), Math.round(26 + u * 86), H('#ffffff')); }
  R.recorte(null);
  // la persiana a medio bajar y su cordón que se mece
  for (let y = 26; y < 56; y += 3) { rect(19, y, 118, y + 1, H('#ece4cc')); rect(19, y + 1, 118, y + 1, H('#c8c0a8')); }
  rect(19, 56, 118, 57, H('#b8b098')); const cu = Math.round(Math.sin(t * 1.7) * 2); linea(112, 57, 112 + cu, 80, H('#a89a78')); disco(112 + cu, 81, 1.5, H('#c8b890'));
  // la hoja del calendario con el año que pasa, y un día marcado
  R.numero(String(año), 190, 62, { tam: 16, centro: true, rampa: HS(['#24243a', '#34345a', '#4a4a78']) });
  const dia = Math.floor(h2(año, 5) * 28), dx = 158 + (dia % 7) * 10, dy = 76 + Math.floor(dia / 7) * 10; R.anillo(dx + 4, dy + 3, 6, H('#c8282a'));
  // las hojas arrancadas que vuelan hacia la mesa
  for (let kk = Math.max(0, n - 4); kk <= n; kk++) {
    const t0 = P3 + 0.25 + (P4 - 0.6 - P3) * (kk / 22), u = (t - t0) / 0.9; if (u <= 0 || u >= 1 || kk === 0) continue;
    const x = Math.round(190 + u * 70 + Math.sin(u * 8 + kk) * 8), y = Math.round(70 + u * u * 90), w = Math.round(20 - u * 6), hh = Math.round(14 - Math.abs(Math.sin(u * 9 + kk)) * 8);
    poligono([[x - w, y - hh], [x + w, y - hh + 3], [x + w - 2, y + hh], [x - w + 2, y + hh - 3]], H('#f6f2e6')); linea(x - w, y - hh, x + w, y - hh + 3, H('#c8c2b0')); linea(x - w + 4, y, x + w - 6, y + 1, H('#b8b2a0'));
  }
  // el reloj: las agujas corren
  const gm = (t - P3) * 9, gh = (t - P3) * 0.8;
  linea(258, 70, Math.round(258 + Math.sin(gm) * 8), Math.round(70 - Math.cos(gm) * 8), K); linea(258, 70, Math.round(258 + Math.sin(gh) * 5), Math.round(70 - Math.cos(gh) * 5), K); pset(258, 70, H('#c8282a'));
  // la pila de carpetas que crece con los años, la planta que crece y la taza que humea
  for (let i = 0; i < n; i++) { const y = 158 - i * 2, s = Math.round((h2(i, 2) - 0.5) * 4); rect(238 + s, y - 2, 296 + s, y, K); rect(239 + s, y - 1, 295 + s, y - 1, i % 2 ? H('#d8c08a') : H('#c8a870')); if (i % 3 === 0) rect(286 + s, y - 2, 292 + s, y - 1, H('#e8d8a8')); }
  rect(234, 158, 300, 160, H('#3a2010'));
  const alto = 6 + Math.round(n * 1.4); rect(122, 146, 136, 158, K); rect(123, 147, 135, 157, H('#b8603a')); rect(123, 147, 135, 148, H('#d8805a'));
  linea(129, 146, 129, 146 - alto, H('#3a6a2a'));
  for (let j = 4; j < alto; j += 5) { const yy = 146 - j, sd = (j / 5) % 2 ? 1 : -1; rect(Math.min(129, 129 + sd * 5), yy - 1, Math.max(129, 129 + sd * 5), yy, H('#4e8a34')); pset(129 + sd * 5, yy - 1, H('#7ab848')); }
  taza(42, 158, 11, H('#e8e4d8'), H('#b8b4a8')); vapor(47, 145, t, H('#f2f2f2'));
  // «more than 20 years»: la escarapela dorada con el 20 se pega en el calendario
  const v = tramo(t, VEINTE - 0.05, VEINTE + 0.2);
  if (v > 0) { const r = Math.round(4 + 10 * v), cx = 232, cy = 44;
    for (let i = 0; i < 16; i++) { const g = i / 16 * Math.PI * 2 + 0.2; poligono([[cx, cy], [cx + Math.cos(g) * (r + 3), cy + Math.sin(g) * (r + 3)], [cx + Math.cos(g + 0.3) * r, cy + Math.sin(g + 0.3) * r]], H('#b88a20')); }
    disco(cx, cy, r, H('#e8b830')); disco(cx, cy, r - 2, H('#f6d860')); if (v >= 1) { R.numero('20', cx + 1, cy + 4, { color: H('#5a3a10'), sombra: false }); destello(cx + 14, cy - 10, 3, H('#fff8d0')); } }
};

// ── 4 · el corcho de cerca: bases, barcos, aviones… y el gato (gag 5) ───────────────────────────────────────────────
const circulo = (cx, cy, rx, ry, u) => { if (u <= 0) return; const n = Math.round(160 * Math.min(1, u)); for (let i = 0; i < n; i++) { const g = -2.2 + i / 150 * Math.PI * 2, w = 1 + 0.06 * Math.sin(i * 0.3); const x = Math.round(cx + Math.cos(g) * rx * w), y = Math.round(cy + Math.sin(g) * ry * w); rect(x, y, x + 1, y + 1, H('#d0282c')); pset(x + 1, y + 1, H('#8a1a1e')); } };
const GATO0 = AVIONES + 0.25, GATO1 = QUIETA + 0.2;
const p4 = (t) => {
  T.psiquicos(R, t, { encuadre: 'fortmeade', camara: 'pared', gato: t > GATO0 });
  // el rotulador rojo rodea lo que dibujaron: bases, barcos, aviones desaparecidos
  circulo(53, 47, 38, 25, tramo(t, BOCETA, BASES));
  circulo(140, 36, 34, 18, tramo(t, BARCOS - 0.4, BARCOS));
  circulo(229, 85, 33, 30, tramo(t, AVIONES - 0.4, AVIONES));
  // el boceto nuevo se va dibujando de arriba abajo (lo que falta queda en blanco), con el polvo de grafito
  const g = tramo(t, GATO0, GATO1);
  if (g > 0 && g < 1) { const pap = R.pget(137, 64), yb = Math.round(lerp(64, 118, g)); rect(136, yb, 184, 117, pap);
    const xs = Math.round(160 + Math.sin(t * 30) * 20); for (let i = 0; i < 4; i++) pset(xs + Math.round(h2(i, Math.floor(t * 15)) * 6) - 3, yb - Math.round(h2(i, 9) * 3), H('#4a4a58')); }
  // el gato espía de verdad asoma por abajo, se ve en el dibujo y se le pone el «!»
  const s = tramo(t, GATO1 - 0.3, GATO1 + 0.15), sal = tramo(t, P5 - 0.2, P5 + 0.1);
  if (s > 0) { const y = Math.round(lerp(200, 175, s) + sal * 26); T.gatoEspia(R, 168, y, t, { cara: t > GATO1 + 0.9 ? 'travieso' : 'normal' });
    if (t > GATO1 + 0.25 && t < P5 - 0.2) { bocadillo(176, 140, 190, 160, 176, 166); R.icono('!', 181, 144, H('#c8282a'), K, 2); } }
};

// ── 5 · la mesa con los fajos: $20,000,000 (inserto local) ───────────────────────────────────────────────────────────
const fondo5 = () => fondoFijo(CACHE, 'billetes', () => {
  // la pared de bloque a media luz, con la estantería de archivadores (lomos de colores, sin letras) y un paisaje
  for (let y = 0; y < 68; y++) for (let x = 0; x < 320; x++) { const fila = y >> 3, off = (fila % 2) * 8, jv = ((x + off) % 16) === 0, jh = (y % 8) === 7;
    pset(x, y, jh || jv ? H('#9a8e74') : rampa(HS(['#a89c80', '#b8ac90', '#c8bc9e']), 1.3 + (h2((x + off) >> 4, fila) - 0.5) * 0.8 - Math.abs(x - 60) / 300, x, y)); }
  rect(14, 52, 128, 55, K); rect(15, 52, 127, 53, H('#a8743c')); rect(15, 54, 127, 54, H('#5a3418'));
  const LOM = ['#2a4a7a', '#7a2a2a', '#3a6a3a', '#c8a040', '#4a4a5a', '#2a4a7a', '#8a5a2a', '#3a3a6a'];
  for (let i = 0; i < 15; i++) { const x = 18 + i * 7, hh = 18 + Math.round(h2(i, 4) * 6); rect(x, 52 - hh, x + 5, 51, K); rect(x + 1, 53 - hh, x + 4, 51, H(LOM[i % 8])); rect(x + 1, 53 - hh, x + 1, 51, H('#e8e0d0')); rect(x + 2, 44 - Math.round(hh / 3), x + 3, 46 - Math.round(hh / 3), H('#e8e0d0')); }
  rect(176, 18, 246, 58, K); rect(177, 19, 245, 57, H('#c89a40')); rect(180, 22, 242, 54, H('#f0e8d0'));
  for (let y = 23; y < 54; y++) for (let x = 181; x < 242; x++) pset(x, y, y < 38 ? rampa(HS(['#78a2d0', '#a8c6e6']), (y - 23) / 15 * 1.6, x, y) : y < 44 ? H('#6a8a5a') : rampa(HS(['#a8964a', '#c8b060']), 0.6 + h2(x >> 1, y) * 0.8, x, y));
  poligono([[181, 40], [200, 30], [216, 38], [232, 28], [241, 38], [241, 44], [181, 44]], H('#5a7a8a'));
  // la mesa en perspectiva: vetas, el canto de delante, la luz del flexo
  for (let y = 68; y < 180; y++) for (let x = 0; x < 320; x++) {
    const v = Math.sin(x * 0.04 + Math.sin(y * 0.5) * 1.6 + y * 0.22) * 0.5, luz = Math.max(0, 1 - Math.hypot(x - 70, (y - 120) * 1.6) / 120);
    pset(x, y, y > 171 ? (y === 172 ? H('#c89058') : H('#3a2010')) : rampa(HS(['#4a2a14', '#5e3a1e', '#744a28', '#8c5c34', '#a8743e']), 1.6 + v + luz * 1.8 + (h2(x >> 3, y >> 1) - 0.5) * 0.6, x, y)); }
  rect(0, 68, 319, 69, H('#2a1808'));
  // el cartapacio de piel verde con sus esquinas
  poligono([[88, 94], [232, 94], [250, 166], [70, 166]], K); poligono([[89, 95], [231, 95], [248, 165], [72, 165]], H('#2e5a3a'));
  for (let y = 96; y < 165; y++) for (let x = 72; x < 248; x++) if (h2(x, y) > 0.9) pset(x, y, H('#3a6a46'));
  for (const s of [-1, 1]) { const xa = s < 0 ? 89 : 231, xb = s < 0 ? 72 : 248; poligono([[xa, 95], [xa + s * -18, 95], [xb + s * -20, 165], [xb, 165]], H('#5a3418')); linea(xa + s * -18, 95, xb + s * -20, 165, H('#8a5a30')); }
  // el flexo, el teléfono, las gafas y el lápiz
  disco(36, 126, 9, K); disco(36, 126, 8, H('#2a5a3a')); disco(34, 124, 3, H('#4a8a5a')); linea(36, 124, 44, 88, H('#3a3a40')); linea(37, 124, 45, 88, H('#6a6a72'));
  poligono([[38, 76], [60, 76], [64, 92], [34, 92]], K); poligono([[39, 77], [59, 77], [62, 91], [36, 91]], H('#2a6a44')); rect(37, 90, 61, 91, H('#f8f0c0'));
  rect(8, 142, 36, 158, K); rect(9, 143, 35, 157, H('#22222a')); rect(10, 136, 34, 142, K); rect(11, 137, 33, 141, H('#33333c')); disco(22, 150, 5, H('#d8d4c8')); disco(22, 150, 2, H('#22222a'));
  for (const gx of [262, 276]) R.anillo(gx, 166, 5, H('#2a2a30')); linea(267, 166, 271, 166, H('#2a2a30'));
  linea(92, 170, 130, 162, H('#e8c040')); pset(91, 170, H('#3a3a3a'));
  // la sumadora de manivela
  rect(256, 108, 306, 150, K); rect(257, 109, 305, 149, H('#c8c0a8')); rect(257, 109, 305, 111, H('#e8e0c8')); rect(257, 144, 305, 149, H('#8a8270'));
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const x = 261 + c * 7, y = 118 + r * 6; rect(x, y, x + 4, y + 3, K); rect(x, y, x + 4, y + 2, c === 5 ? H('#c83030') : H('#f2eee2')); }
  rect(306, 120, 309, 124, K); linea(308, 124, 314, 136, K); rect(312, 134, 316, 138, H('#a8743c'));
  rect(262, 102, 300, 108, K); rect(263, 103, 299, 107, H('#8a8a90'));
});
const BILL = 34, fajo = (x, y) => { rect(x - 11, y - 4, x + 11, y, K); rect(x - 10, y - 3, x + 10, y - 1, H('#5a8a5a')); rect(x - 10, y - 3, x + 10, y - 3, H('#8ab88a')); rect(x - 2, y - 4, x + 2, y, H('#e8e0c8')); pset(x - 7, y - 2, H('#3a6a3a')); pset(x + 7, y - 2, H('#3a6a3a')); };
const p5 = (t) => {
  fondo5();
  // la cinta de la sumadora sale y se riza por detrás
  const ci = tramo(t, P5 + 0.4, MILLON + 0.3), alto = Math.round(ci * 40);
  if (alto > 0) { rect(272, 102 - alto, 290, 102, H('#f6f2e6')); rect(272, 102 - alto, 272, 102, H('#d8d2c0')); for (let y = 100; y > 102 - alto; y -= 3) linea(276, y, 286, y, H('#8a8a9a')); if (alto > 30) { disco(281, 102 - alto, 6, H('#e8e2d0')); disco(281, 102 - alto, 3, H('#f6f2e6')); } }
  // los fajos caen en cuatro pilas sobre el cartapacio
  const XS = [118, 144, 170, 196];
  for (let i = 0; i < BILL; i++) {
    const tl = lerp(P5 + 0.25, MILLON - 0.05, suave(i / (BILL - 1))), x = XS[i % 4] + ((i >> 2) % 2 ? 1 : -1), yd = 150 - Math.floor(i / 4) * 4, u = (t - tl) / 0.3;
    if (u <= 0) continue; const y = u >= 1 ? yd : Math.round(lerp(-6, yd, u * u)); fajo(x, y);
  }
  // el flexo deja su halo encima de todo (las motas brillan) y la taza humea
  taza(48, 168, 12, H('#c8282a'), H('#8a1a1e')); vapor(54, 154, t, H('#e8e4dc'));
  for (let kk = 0; kk < 5; kk++) { const u = ((t * 0.15 + kk / 5) % 1); pset(Math.round(44 + kk * 7 + Math.sin(u * 6) * 3), Math.round(96 + u * 40), H('#fff0b0')); }
  // el contador
  const c = suave(tramo(t, P5 + 0.3, MILLON)), val = Math.round(c * 20000) * 1000;
  R.numero('$' + val.toLocaleString('en-US'), 160, 42, { tam: 16, centro: true });
  if (t > MILLON) { const s = tramo(t, MILLON, MILLON + 0.6); for (const [x, y] of [[66, 24], [252, 28], [160, 12 + 6]]) destello(x, y + 4, Math.round(1 + 3 * Math.sin(s * Math.PI)), H('#fff4c0')); }
  // el gato espía, sentado en el canto de la mesa, sigue los fajos con la cabeza
  T.gatoEspia(R, 240, 170, t, { cara: t > MILLON + 0.3 ? 'travieso' : 'normal' });
};

const año = (t) => t < P3 ? 1978 : t < P4 ? AÑO3(t) : t < P5 ? 1994 : 1995;
const efectos = [[0.5, 'motor'], [FORT + 0.5, 'puerta'], [CLAVE1, 'sello'], [CLAVE2, 'sello'], [STAR, 'sello'], [STAR + 0.3, 'brillo'],
  [P3 + 0.4, 'papel'], [P3 + 1.6, 'tic'], [VEINTE, 'brillo'], [BASES - 0.3, 'lapiz'], [AVIONES - 0.3, 'lapiz'], [GATO0 + 0.1, 'lapiz'], [GATO1 + 0.3, 'miau'],
  [P5 + 0.35, 'papel'], [P5 + 0.9, 'tecleo'], [MILLON, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-cierre95'] = ('El cierre', '''// DC-CIERRE95 (frase 14), 1995 → 2017, cartela «1995». Cuatro planos:
// 1. (la sala de reuniones de 1995) el retroproyector proyecta un boceto de los videntes; el hombre de la CIA lo explica
//    («the CIA asked») y el experto entra por la puerta con su pila de carpetas («outside experts»), se sienta y la
//    puerta se cierra; en «review» la diapositiva pasa al boceto del barco; la experta lo señala;
// 2. (inserto local: la mesa de la revisión) corta en «Their conclusion»: tres bocetos (base, barco, isla) reciben su X
//    roja de sello en «remote viewers», «never» y «produced»; en «single piece» cae el sello del «0»; la bandeja de los
//    analistas sigue vacía y una mosca le da vueltas («analysts could actually use»);
// 3. (fondo local: el pasillo) corta en «The program»: la puerta de la placa de la estrella se abre, el experto sale con
//    la caja de los expedientes, apaga la luz («shut») y cierra («down»); el gato espía se escabulle justo antes; la
//    placa se tuerce («that same year»); en «declassified» sale el candado abierto verde sobre la caja;
// 4. (el ordenador de 2017) corta en «2017»: miles de páginas pasan solas y el contador sube en «thousands of pages»;
//    la mano hace clic en «online»; el gato espía lee la pantalla.''', AYUDAS + r'''
const r = (f) => en('revision', f);
const P2 = r(0.2541), P3 = r(0.5773), P4 = r(0.7585);
const CIA = r(0.0729), EXPERTOS = r(0.1420), REVISA = r(0.1859), TODO = r(0.2149);
const VIDENTES = r(0.3045), NUNCA = r(0.3540), PRODUJO = r(0.3662), UNA = r(0.3970), ANALISTAS = r(0.4764), USAR = r(0.5343);
const CIERRA = r(0.6128), ABAJO = r(0.6249), MISMO = r(0.6520), DESCLAS = r(0.6941);
const CIA2 = r(0.8100), MILES = r(0.8519), PAGINAS = r(0.8930), LINEA = r(0.9108), CUALQUIERA = r(0.9482);

// ── 1 · la sala de reuniones ────────────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const O = { encuadre: 'revision', luz: 1, puerta: tramo(t, EXPERTOS + 0.15, EXPERTOS + 0.55), cruces: 0 };
  T.psiquicos(R, t, O);
  // la diapositiva del retroproyector: un boceto de los videntes (la base, y en «review» el barco)
  const PAP = HS(['#e8e0c4', '#f2ecd6', '#fbf6e6']);
  for (let y = 31; y < 86; y++) for (let x = 104; x < 195; x++) pset(x, y, rampa(PAP, 2.2 - Math.hypot(x - 150, (y - 56) * 1.5) / 60, x, y));
  const cam = t > REVISA ? tramo(t, REVISA, REVISA + 0.25) : 1;
  if (cam > 0.5 || t < REVISA) boceto(t > REVISA ? 'barco' : 'base', 120, 36, 60, 44, H('#4a4a5a'), 1);
  if (t > REVISA && cam < 1) for (let y = 31; y < 86; y++) if ((y + Math.floor(cam * 8)) % 3 === 0) linea(104, y, 194, y, H('#fffef4'));
  // el hombre de la CIA explica y señala la pantalla; la experta toma notas y señala; el experto entra con las carpetas
  R.actor(EL.ingenieroCIA, 18, 168, t, { dir: 1, habla: t > CIA - 0.2 && t < EXPERTOS && Math.sin(t * 9) > 0, dedo: t > REVISA - 0.3 && t < P2 - 0.3 });
  R.actor(EL.expertoAIR2, 106, 154, t, { dir: 1, habla: t > REVISA + 0.3 && t < TODO + 0.4 && Math.sin(t * 8) > 0, dedo: t > TODO - 0.3 });
  const ent = suave(tramo(t, 1.6, EXPERTOS + 0.2)), ex = Math.round(lerp(244, 210, ent)), ey = Math.round(lerp(146, 154, tramo(t, EXPERTOS - 0.2, EXPERTOS + 0.4)));
  const lleva = t < EXPERTOS + 0.3;
  const e1 = R.actor(EL.expertoAIR, ex, ey, t, { dir: -1, anda: ent > 0 && ent < 1, sostiene: lleva ? true : undefined, sonrisa: t > REVISA });
  T.psiquicosDelante(R, t, O);
  // la pila de carpetas: en la mano y luego en la mesa
  const pila = (x, y) => { for (let i = 0; i < 4; i++) { rect(x - 7, y - 2 - i * 2, x + 7, y - i * 2, K); rect(x - 6, y - 1 - i * 2, x + 6, y - 1 - i * 2, i % 2 ? H('#d8c08a') : H('#c8a870')); } rect(x + 2, y - 9, x + 5, y - 8, H('#c8282a')); };
  if (lleva) pila(e1.mano[0], e1.mano[1] + 3); else pila(206, 140);
};

// ── 2 · la mesa de la revisión (inserto local) ──────────────────────────────────────────────────────────────────────
const F2 = [[12, 60, 'base'], [116, 64, 'barco'], [220, 58, 'isla']], XT = [VIDENTES, NUNCA - 0.05, PRODUJO + 0.25];
const fondo2 = () => fondoFijo(CACHE, 'mesa95', () => {
  // la pared de papel pintado beige con rayas finas, las rayas de luz de la persiana y la moldura malva
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) { const raya = (x % 10) < 5, luz = ((x + y * 1.2) % 70) < 9 && x > 40 && x < 260;
    pset(x, y, rampa(raya ? HS(['#cdbf9e', '#d8cbac', '#e4d8bc']) : HS(['#d4c6a6', '#ded2b4', '#eae0c6']), 1 + (luz ? 1.3 : 0) + (h2(x >> 2, y >> 2) - 0.5) * 0.5, x, y)); if (x % 10 === 7 && y % 6 === 3) pset(x, y, H('#c4b08c')); }
  rect(0, 42, 319, 50, H('#7a5a6a')); rect(0, 42, 319, 43, H('#a88a9a')); rect(0, 49, 319, 50, H('#4a3440')); for (let x = 2; x < 320; x += 6) pset(x, 46, H('#9a7a8a'));
  // el ficus de la esquina
  for (let kk = 0; kk < 30; kk++) { const x = Math.round(h2(kk, 1) * 22), y = 14 + Math.round(h2(kk, 2) * 30); disco(x, y, 3, kk % 3 ? H('#3a6a2e') : H('#5a8a3e')); pset(x - 1, y - 1, H('#7aaa52')); }
  // la mesa de roble claro con sus tablas y vetas
  for (let y = 50; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 50) / 14), v = Math.sin(x * 0.06 + tabla * 2.3 + Math.sin(x * 0.013 + tabla) * 3) * 0.6;
    pset(x, y, (y - 50) % 14 === 13 ? H('#8a6038') : rampa(HS(['#a87848', '#bc8c58', '#cc9e68', '#dcb27c']), 2 + v - (y - 50) / 130 + (h2(x >> 2, y) - 0.5) * 0.5, x, y)); }
  rect(0, 50, 319, 51, H('#f0d8a8')); rect(0, 52, 319, 52, H('#6a4428'));
  // las tres carpetas abiertas con sus bocetos
  for (const [x, y, b] of F2) {
    rect(x - 1, y - 1, x + 88, y + 62, H('#6a4a28')); rect(x, y, x + 87, y + 61, H('#d8c08a')); rect(x, y, x + 87, y + 1, H('#ecd8a8')); rect(x + 43, y, x + 44, y + 61, H('#b89a68'));
    rect(x + 4, y - 4, x + 20, y, H('#d8c08a')); rect(x + 4, y - 4, x + 20, y - 4, H('#ecd8a8'));
    rect(x + 47, y + 3, x + 84, y + 58, H('#a89a80')); rect(x + 46, y + 2, x + 83, y + 57, H('#f8f4e8'));
    for (let j = y + 8; j < y + 54; j += 5) linea(x + 5, j, x + 38, j, H('#b8a478'));
    rect(x + 6, y + 6, x + 18, y + 16, H('#e8e0d0')); rect(x + 7, y + 7, x + 17, y + 15, H('#9aa8b8'));
    boceto(b, x + 48, y + 6, 34, 46, H('#4a4a5a'), 1);
  }
  // el vaso de agua, la grapadora, la calculadora, los lápices y unas gafas
  rect(70, 140, 78, 158, K); rect(71, 141, 77, 157, H('#b8d0dc')); rect(71, 148, 77, 157, H('#8ab4cc')); rect(72, 142, 72, 156, H('#e8f4f8'));
  linea(96, 136, 150, 128, H('#c83030')); pset(95, 136, H('#3a3a3a')); linea(100, 142, 146, 140, H('#e8c040')); pset(99, 142, H('#3a3a3a'));
  for (const gx of [204, 216]) R.anillo(gx, 134, 5, H('#2a2a30')); linea(209, 134, 211, 134, H('#2a2a30'));
  rect(120, 164, 150, 176, K); rect(121, 165, 149, 175, H('#3a3a44')); rect(123, 166, 147, 169, H('#a8b890')); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) rect(123 + i * 7, 171 + j * 2, 127 + i * 7, 171 + j * 2, H('#d8d4c8'));
  rect(60, 168, 92, 174, K); rect(61, 169, 91, 172, H('#2a2a30')); rect(61, 169, 91, 169, H('#5a5a64'));
  // la bandeja de los analistas (vacía), de rejilla
  poligono([[232, 138], [304, 138], [312, 174], [226, 174]], K); poligono([[234, 140], [302, 140], [309, 172], [229, 172]], H('#5a5e66'));
  for (let x = 238; x < 304; x += 6) linea(x, 141, x + Math.round((x - 266) * 0.12), 171, H('#3a3e46')); for (let y = 146; y < 172; y += 6) linea(232, y, 307, y, H('#3a3e46'));
  rect(226, 168, 312, 174, H('#7a7e86')); rect(226, 168, 312, 168, H('#a8acb4'));
});
const p2 = (t) => {
  fondo2();
  // las X rojas de sello sobre cada boceto
  F2.forEach(([x, y], i) => { const u = tramo(t, XT[i] - 0.08, XT[i] + 0.1); if (u > 0) { const g = Math.round((1 - u) * 6); equisRoja(x + 48 - g, y + 6 - g, x + 82 + g, y + 54 + g, 1); } });
  // el «0» sellado en «single piece»
  const z = tramo(t, UNA - 0.1, UNA + 0.1);
  if (z > 0) { const rr = Math.round(15 + (1 - z) * 8); R.anillo(176, 150, rr, H('#d0282c')); R.anillo(176, 150, rr - 1, H('#d0282c')); R.anillo(176, 150, rr - 3, H('#a8202a'));
    R.numero('0', 176, 158, { tam: 16, centro: true, rampa: HS(['#e8484c', '#d0282c', '#a01c22']) }); }
  // la mosca que da vueltas sobre la bandeja vacía
  const g = t * 5, mx = Math.round(268 + Math.cos(g) * 22 + Math.sin(g * 2.3) * 4), my = Math.round(150 + Math.sin(g) * 10 - (t > ANALISTAS ? 6 : 0));
  pset(mx, my, K); pset(mx + 1, my, K); if (Math.floor(t * 20) % 2) { pset(mx, my - 1, H('#c8d8e8')); pset(mx + 1, my - 1, H('#c8d8e8')); }
  // la taza de café que humea y las rayas de luz que se mueven despacio
  taza(28, 172, 14, H('#f2eee2'), H('#c8c4b8')); vapor(35, 158, t, H('#f4f4f0'));
  // en «use», la bandeja vacía se queda con su «?»
  const q = tramo(t, USAR - 0.15, USAR + 0.15); if (q > 0) { bocadillo(282, 112, 302, 134, 284, 142); R.icono('?', 288, 116, H('#3a6aa8'), K, 2); }
};

// ── 3 · el pasillo de 1995 (fondo local) ────────────────────────────────────────────────────────────────────────────
const fondo3 = () => fondoFijo(CACHE, 'pasillo', () => {
  // techo de placas con su rejilla
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || y % 9 === 8) ? H('#a8aca4') : rampa(HS(['#c8ccc4', '#d8dcd4', '#e4e8e0']), 1.2 + (h2(x, y) - 0.5) * 0.8, x, y));
  rect(0, 18, 319, 19, H('#8a8e86'));
  // la pared verde pálido, la moldura de madera y el zócalo más oscuro
  for (let y = 20; y < 140; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 96 ? rampa(HS(['#a8b49c', '#b8c4ac', '#c6d0ba']), 1.4 + (h2(x >> 2, y >> 2) - 0.5) * 0.6 - (y < 26 ? 0.8 : 0), x, y) : rampa(HS(['#7a8a6e', '#8a9a7c', '#98a88a']), 1.3 + (h2(x >> 2, y >> 2) - 0.5) * 0.6, x, y));
  rect(0, 94, 319, 97, H('#8a6038')); rect(0, 94, 319, 94, H('#b88a58')); rect(0, 97, 319, 97, H('#4a3018'));
  rect(0, 136, 319, 140, H('#3a3a34')); rect(0, 136, 319, 136, H('#6a6a5e'));
  // el suelo de linóleo a cuadros con su brillo
  for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = Math.floor((x + (y - 141) * 0.4) / 16), cy = Math.floor((y - 141) / 8), cl = (cx + cy) % 2;
    pset(x, y, rampa(cl ? HS(['#8a7a5e', '#9a8a6c', '#a89a7a']) : HS(['#c8bc9e', '#d6caac', '#e2d8bc']), 1.2 + (((x - y * 2) % 90) < 6 ? 1 : 0) + (h2(x >> 1, y) - 0.5) * 0.5, x, y)); }
  // el tablón de anuncios con hojas (rayas, sin letras) y chinchetas
  rect(14, 34, 94, 86, H('#6a4a28')); rect(16, 36, 92, 84, H('#b88a52'));
  for (let y = 37; y < 84; y++) for (let x = 17; x < 92; x++) if (h2(x, y) > 0.7) pset(x, y, H('#a07440'));
  for (const [x, y, w, hh, c] of [[20, 40, 22, 28, '#f6f2e6'], [46, 38, 18, 20, '#f6e8a0'], [68, 42, 20, 26, '#f6f2e6'], [24, 70, 26, 12, '#d8e8f6'], [56, 62, 16, 20, '#f6f2e6']]) {
    rect(x + 1, y + 1, x + w + 1, y + hh + 1, H('#7a5a30')); rect(x, y, x + w, y + hh, H(c)); for (let j = y + 4; j < y + hh - 2; j += 3) linea(x + 3, j, x + w - 3 - (j % 2) * 4, j, H('#8a8a9a')); disco(x + (w >> 1), y + 1, 1.5, H(['#c83030', '#3a6ac8', '#e8c040'][x % 3])); }
  // un cuadro con el paisaje de la bahía (sin letras) y la alarma de incendios
  rect(98, 36, 122, 58, K); rect(99, 37, 121, 57, H('#a8743c')); for (let y = 39; y < 56; y++) for (let x = 101; x < 120; x++) pset(x, y, y < 47 ? H('#9ac0e0') : y < 50 ? H('#5a7a9a') : H('#6a8a4a'));
  rect(186, 50, 194, 60, K); rect(187, 51, 193, 59, H('#c83030')); disco(190, 55, 2, H('#e8e4d8'));
  // la fuente de agua de pared
  rect(100, 104, 120, 122, K); rect(101, 105, 119, 121, H('#c8ccd0')); rect(101, 105, 119, 107, H('#e8ecf0')); rect(103, 108, 117, 112, H('#8a9098')); rect(108, 122, 112, 136, H('#8a9098')); rect(116, 106, 118, 108, H('#5a5e64'));
  // el marco de la puerta
  rect(126, 44, 182, 141, H('#4a3018')); rect(128, 46, 180, 141, H('#7a5430')); rect(128, 46, 129, 141, H('#a87a48'));
  // el extintor, el reloj y la otra puerta con su ventanuco
  rect(200, 70, 208, 78, K); rect(201, 71, 207, 77, H('#c83030')); rect(196, 104, 210, 108, H('#5a5a60'));
  rect(198, 106, 208, 132, K); rect(199, 107, 207, 131, H('#c83030')); rect(200, 108, 201, 130, H('#e86060')); rect(201, 101, 205, 106, K); linea(205, 103, 210, 112, K);
  disco(232, 40, 10, K); disco(232, 40, 9, H('#f6f2e8')); for (let i = 0; i < 12; i++) { const g = i / 12 * Math.PI * 2; pset(Math.round(232 + Math.cos(g) * 7), Math.round(40 + Math.sin(g) * 7), K); }
  rect(240, 52, 316, 141, H('#4a3018')); rect(242, 54, 314, 141, H('#7a5430'));
  rect(250, 60, 306, 100, K); rect(251, 61, 305, 99, H('#2a3a5a'));
  for (let y = 61; y < 100; y++) for (let x = 251; x < 306; x++) pset(x, y, rampa(HS(['#3a4a7a', '#7a6a9a', '#d8886a', '#f0b878']), (y - 61) / 38 * 3.2, x, y));
  rect(251, 88, 305, 99, H('#2a3020')); for (let x = 254; x < 304; x += 7) rect(x, 84 - (x % 3) * 2, x + 4, 88, H('#3a4630'));
  rect(277, 61, 278, 99, H('#7a5430')); rect(251, 80, 305, 80, H('#7a5430'));
  disco(306, 116, 2, H('#d8b860'));
});
const p3 = (t) => {
  fondo3();
  const ab = tramo(t, P3 + 0.05, P3 + 0.4) * (1 - tramo(t, ABAJO - 0.2, ABAJO + 0.05)), luz = t < CIERRA ? 1 : 0;
  // el fluorescente del techo que parpadea
  const fl = Math.sin(t * 37) > 0.93 ? 0 : 1; rect(198, 6, 262, 12, K); rect(199, 7, 261, 11, fl ? H('#fbfaf0') : H('#b8bcb0')); rect(199, 11, 261, 11, H('#c8ccc4'));
  // la puerta: abierta deja ver la oficina (encendida o a oscuras); cerrada, el cristal esmerilado
  if (ab > 0.02) {
    const IN = luz ? HS(['#8a7a50', '#b8a068', '#e8d090']) : HS(['#1a1a24', '#24242e', '#2e2e3a']);
    for (let y = 46; y < 141; y++) for (let x = 130; x < 180; x++) pset(x, y, rampa(IN, 1.4 + (y > 110 ? -0.6 : 0) + (h2(x >> 2, y >> 2) - 0.5) * 0.5, x, y));
    rect(150, 112, 178, 116, luz ? H('#6a4a2a') : H('#141418')); rect(156, 116, 158, 140, luz ? H('#5a3a20') : H('#101014'));
    if (luz) { rect(136, 60, 150, 80, H('#a87a48')); rect(137, 61, 149, 79, H('#d8b880')); rect(162, 98, 168, 112, H('#2a5a3a')); rect(160, 96, 170, 98, H('#3a8a5a')); }
    const w = Math.round(46 * (1 - ab)); if (w > 0) { rect(130, 48, 130 + w, 140, H('#9a6e40')); rect(130 + w - 1, 48, 130 + w, 140, H('#5a3a1e')); }
    if (luz) for (let x = 132; x < 180; x++) for (let y = 141; y < 150; y++) if ((x + y) % 2 && h2(x, y) > (y - 141) / 9) pset(x, y, H('#e8d8a8'));
  } else {
    rect(130, 48, 178, 140, H('#9a6e40')); rect(130, 48, 131, 140, H('#b8885a')); rect(177, 48, 178, 140, H('#6a4828'));
    for (let y = 50; y < 140; y++) for (let x = 132; x < 177; x++) if (Math.sin(x * 0.4 + y * 0.12) > 0.7) pset(x, y, H('#8a6038'));
    rect(139, 57, 169, 97, K); for (let y = 58; y < 97; y++) for (let x = 140; x < 169; x++) pset(x, y, luz ? rampa(HS(['#d8c898', '#ece0b4', '#f8f0d0']), 1.4 + (h2(x, y) - 0.5), x, y) : rampa(HS(['#4a5060', '#5a6070', '#6a7080']), 1 + (h2(x, y) - 0.5), x, y));
    rect(132, 128, 176, 138, H('#c8a050')); rect(132, 128, 176, 128, H('#e8c878'));
    disco(172, 116, 2, H('#e8c860')); pset(171, 115, H('#fff0b0'));
    if (luz) for (let x = 132; x < 178; x++) if (x % 2) pset(x, 141, H('#e8d8a8'));
  }
  // la placa de latón con la estrella; en «that same year» se tuerce
  const tor = tramo(t, MISMO - 0.1, MISMO + 0.2), dy = Math.round(tor * 3);
  if (ab <= 0.02) { poligono([[146, 102], [162, 102 + dy], [162, 110 + dy], [146, 110]], K); poligono([[147, 103], [161, 103 + dy], [161, 109 + dy], [147, 109]], H('#c8a040')); R.icono('estrella', 151, 103 + Math.round(dy / 2), H('#5a3a10'), H('#e8c860'), 1); pset(147, 104, H('#fff0b0')); }
  // el gato espía se escabulle por la puerta justo antes de que se cierre
  const ga = tramo(t, CIERRA - 0.15, ABAJO + 0.5); if (ga > 0 && ga < 1) T.gatoEspia(R, Math.round(lerp(150, 110, ga)), 152, t, { anda: true, dir: -1 });
  // el experto sale con la caja, apaga, cierra y se queda mirando la caja
  const sale = suave(tramo(t, P3 + 0.3, CIERRA - 0.1)), sigue = suave(tramo(t, ABAJO + 0.1, DESCLAS - 0.2));
  const ex = Math.round(lerp(lerp(146, 168, sale), 214, sigue)), ey = Math.round(lerp(lerp(140, 152, sale), 160, sigue));
  const e = R.actor(EL.expertoAIR, ex, ey, t, { dir: t < ABAJO ? -1 : 1, anda: (sale > 0 && sale < 1) || (sigue > 0 && sigue < 1), sostiene: true, sonrisa: t > DESCLAS + 0.3 });
  const [cx, cy] = e.mano; rect(cx - 8, cy - 6, cx + 8, cy + 4, K); rect(cx - 7, cy - 5, cx + 7, cy + 3, H('#d8c8a0')); rect(cx - 7, cy - 5, cx + 7, cy - 4, H('#ece0c0')); rect(cx - 3, cy - 2, cx + 3, cy, H('#a8946a'));
  // «declassified»: el candado abierto verde con su destello
  const d = tramo(t, DESCLAS - 0.1, DESCLAS + 0.2);
  if (d > 0) { const x0 = cx - 5, y0 = cy - 30 - Math.round((1 - d) * 6); bocadillo(x0 - 5, y0 - 4, x0 + 17, y0 + 18, cx, cy - 8);
    rect(x0 + 1, y0 + 6, x0 + 11, y0 + 15, H('#2a8a3a')); rect(x0 + 1, y0 + 6, x0 + 11, y0 + 7, H('#5ac86a')); rect(x0 + 5, y0 + 9, x0 + 7, y0 + 12, K);
    for (const [i, j] of [[3, 5], [3, 4], [3, 3], [4, 2], [5, 1], [6, 1], [7, 1], [8, 2], [9, 3]]) pset(x0 + i - 2, y0 + j - 1, H('#3a3a40'));
    if (d >= 1) destello(x0 + 16, y0 - 2, 3, H('#fff8c0')); }
};

// ── 4 · el ordenador de 2017 ────────────────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const pg = 1 + Math.round(12000 * suave(tramo(t, MILES - 0.2, PAGINAS + 0.6)));
  T.psiquicos(R, t, { encuadre: 'revision', camara: 'pantalla2017', velocidad: 6, paginas0: pg - t * 6 });
  // el gato espía, sentado en la mesa, lee; en «anyone to read» se acerca
  const ac = tramo(t, CUALQUIERA - 0.2, CUALQUIERA + 0.4);
  T.gatoEspia(R, Math.round(lerp(46, 56, ac)), 147, t, { cara: t > CUALQUIERA ? 'travieso' : 'normal' });
  // la mano en el ratón: hace clic en «online»
  const cl = t > LINEA - 0.05 && t < LINEA + 0.12 ? 1 : 0, dx = Math.round(Math.sin(t * 1.3) * 2);
  T.brazo(R, 324, 186, 288 + dx, 160 + cl, '#4a5a7a', -1, { codo: [306, 176] });
};

const año = (t) => t < P4 ? 1995 : 2017;
const efectos = [[1.9, 'puerta'], [EXPERTOS + 0.5, 'puerta'], [REVISA, 'interruptor'],
  [VIDENTES, 'sello'], [NUNCA - 0.05, 'sello'], [PRODUJO + 0.25, 'sello'], [UNA, 'golpecito'], [ANALISTAS, 'zumbido'],
  [P3 + 0.1, 'puerta'], [CIERRA, 'interruptor'], [ABAJO, 'puerta'], [MISMO, 'toc'], [DESCLAS, 'brillo'],
  [P4 + 0.3, 'bip'], [MILES, 'whoosh'], [LINEA, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1995', efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-fantasma'] = ('El Ejército Fantasma', '''// DC-FANTASMA (frase 15), 1944, cartela «1944». Cuatro planos, sin combate:
// 1. (fondo local: el puerto de Nueva York) el transporte gris zarpa ante la estatua de la Libertad, con el remolcador;
//    en cubierta un soldado pinta la estatua en su caballete y otro dice adiós («the United States»); la sirena suelta
//    vapor en «1944»; gaviotas;
// 2. (fondo local: un muelle de Europa) corta en «sent»: por la pasarela bajan soldados con caballetes, cajas de
//    pintura, una bocina y un magnetofón; el oficial los cuenta y señala el pueblo («to Europe»); el contador sube hasta
//    1100 en «About 1,100 men»;
// 3. (el campo de Francia al atardecer, sin tanque grande) corta en «many of them»: el pintor dibuja un tanque en su
//    cuaderno («painters»), el diseñador despliega la tela de camuflaje («designers»), el técnico pone en marcha el
//    magnetofón («sound engineers»); el oficial explica la misión («mission») y señala al horizonte («the Germans»);
// 4. (la mesa de mapas) corta en «there were thousands»: la flecha falsa crece hacia la nada y aparecen fichas
//    («thousands of soldiers»); en «none» se vuelven transparentes; en «Ghost Army» sube un tanque fantasma de puntos;
//    el gato espía cruza por la esquina.''', AYUDAS + r'''
const g = (f) => en('fantasma', f);
const P2 = g(0.2416), P3 = g(0.4666), P4 = g(0.7663);
const FALLO = g(0.0646), AÑO44 = g(0.1222), EEUU = g(0.2018), ESPECIAL = g(0.2707), EUROPA = g(0.3374), MIL = g(0.3858), HOMBRES = g(0.4267);
const PINTORES = g(0.4924), DISENA = g(0.5344), SONIDO = g(0.5754), MISION = g(0.6576), ALEMANES = g(0.7200);
const MILES = g(0.7953), SOLDADOS = g(0.8373), NINGUNO = g(0.9008), FANTASMA = g(0.9546);

// ── 1 · el puerto de Nueva York (fondo local) ──────────────────────────────────────────────────────────────────────
const fondo1 = () => fondoFijo(CACHE, 'nyc', () => {
  cieloT(0, 102, HS(['#4e7cc0', '#6290cc', '#7aa4d8', '#96b8e0', '#b8cce4', '#dcd4c8']));
  // Manhattan a lo lejos, azulado por la bruma, con su rascacielos de aguja
  const LJ = HS(['#7a88a8', '#8a98b6', '#9aa8c2']);
  for (const [x0, x1, y0] of [[0, 14, 70], [12, 26, 62], [24, 36, 74], [62, 76, 66], [74, 90, 72], [104, 116, 64], [114, 132, 76], [130, 140, 82], [86, 94, 78]]) {
    for (let y = y0; y < 100; y++) for (let x = x0; x <= x1; x++) pset(x, y, rampa(LJ, 1.2 + (x - x0) / (x1 - x0 + 1) * -0.6 + (h2(x, y) - 0.5) * 0.3, x, y));
    for (let y = y0 + 3; y < 98; y += 4) for (let x = x0 + 2; x < x1 - 1; x += 3) pset(x, y, h2(x, y) > 0.7 ? H('#d8dce8') : H('#6a7898')); }
  for (const [x0, x1, y0] of [[94, 106, 54], [97, 103, 46], [99, 101, 40]]) for (let y = y0; y < 100; y++) for (let x = x0; x <= x1; x++) pset(x, y, rampa(LJ, 1.4 - (x - x0) * 0.08, x, y));
  rect(100, 32, 100, 40, H('#7a88a8'));
  // el agua de la bahía (la que se mueve va encima) y la isla con la estatua
  poligono([[22, 104], [36, 97], [70, 97], [84, 104]], H('#4a6a3a')); rect(30, 98, 76, 100, H('#5a7a46'));
  poligono([[38, 98], [44, 92], [62, 92], [68, 98]], H('#a8a090')); rect(46, 80, 60, 92, H('#b8b0a0')); rect(46, 80, 47, 92, H('#d8d0c0')); rect(44, 78, 62, 80, H('#c8c0b0'));
  const VE = H('#5a9a86'), VEL = H('#7ab8a2'), VES = H('#3a7a6a');
  poligono([[48, 78], [50, 64], [56, 64], [58, 78]], VE); linea(50, 64, 48, 78, VEL); linea(56, 66, 58, 78, VES);
  disco(53, 61, 3, VE); pset(52, 60, VEL); for (const [i, j] of [[-4, -3], [-2, -5], [0, -6], [2, -5], [4, -3]]) pset(53 + i, 61 + j, VE);
  linea(55, 63, 58, 52, VE); linea(56, 63, 59, 52, VES); rect(57, 49, 60, 51, H('#c8a040')); rect(49, 68, 51, 72, VEL);
});
const ola = (x, y, t) => Math.sin(x * 0.09 + y * 0.8 - t * 2.2) * Math.sin(x * 0.031 - y * 0.35 + t * 1.1);
const aguaPuerto = (t, y0, CS) => { for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) { const w = ola(x, y, t); pset(x, y, rampa(CS, 1.6 + (y - y0) / (180 - y0) * -1.2 + w * 0.9, x, y)); if (w > 0.82 && (x + y) % 3 === 0) pset(x, y, H('#e8f0f6')); } };
const transporte = (x, t) => {   // x = la popa; la proa a x + 200
  const G = H('#6a7480'), GL = H('#8a949e'), GS = H('#4e5662'), BLC = H('#c8ccd0');
  // reflejo bajo el casco
  for (let y = 153; y < 166; y++) for (let xx = x + 4; xx < x + 196; xx++) if ((xx + y + Math.floor(t * 4)) % 3 === 0) pset(xx + Math.round(Math.sin(y * 0.9 + t * 3) * 2), y, H('#3a4c62'));
  poligono([[x, 120], [x + 192, 116], [x + 204, 116], [x + 196, 152], [x + 6, 152], [x - 2, 132]], K);
  poligono([[x + 1, 121], [x + 192, 117], [x + 202, 117], [x + 195, 151], [x + 7, 151], [x, 132]], G);
  rect(x + 2, 121, x + 194, 123, GL); rect(x + 6, 146, x + 196, 151, H('#2a2a30')); rect(x + 6, 145, x + 196, 145, H('#d8d8d0'));
  for (let xx = x + 10; xx < x + 186; xx += 9) { disco(xx, 129, 1.4, K); pset(xx, 128, H('#c8d8e8')); }
  for (let xx = x + 30; xx < x + 190; xx += 40) for (let y = 133; y < 144; y += 2) pset(xx + ((y >> 1) % 2), y, H('#7a5a44'));
  rect(x + 186, 125, x + 190, 131, K); linea(x + 188, 131, x + 188, 140, H('#3a3a40'));
  // superestructura, puente, botes salvavidas y chimenea
  rect(x + 56, 96, x + 134, 117, K); rect(x + 57, 97, x + 133, 116, BLC); rect(x + 57, 97, x + 133, 98, H('#eef0f2'));
  for (let xx = x + 60; xx < x + 130; xx += 6) rect(xx, 102, xx + 3, 105, H('#3a4a5a'));
  rect(x + 110, 84, x + 138, 96, K); rect(x + 111, 85, x + 137, 95, BLC); for (let xx = x + 113; xx < x + 136; xx += 5) rect(xx, 88, xx + 3, 91, H('#2a3a4a'));
  for (const bx of [x + 62, x + 96]) { rect(bx, 90, bx + 16, 95, K); rect(bx + 1, 91, bx + 15, 94, H('#f2eee6')); rect(bx + 1, 94, bx + 15, 94, H('#c86a3a')); linea(bx, 96, bx, 88, K); linea(bx + 16, 96, bx + 16, 88, K); }
  rect(x + 80, 60, x + 96, 96, K); rect(x + 81, 61, x + 95, 95, G); rect(x + 81, 61, x + 84, 95, GL); rect(x + 81, 61, x + 95, 67, H('#2a2a30'));
  // mástiles con sus jarcias
  for (const [mx, my] of [[x + 26, 66], [x + 166, 60]]) { rect(mx, my, mx + 1, 120, H('#5a4a3a')); rect(mx - 5, my + 8, mx + 6, my + 8, H('#5a4a3a')); }
  linea(x + 26, 66, x + 2, 120, H('#3a3a40')); linea(x + 167, 60, x + 200, 117, H('#3a3a40')); linea(x + 27, 66, x + 80, 62, H('#3a3a40')); linea(x + 96, 62, x + 166, 60, H('#3a3a40'));
  // el humo de la chimenea
  for (let kk = 0; kk < 8; kk++) { const u = ((t * 0.35 + kk / 8) % 1), sx = Math.round(x + 88 - u * 70), sy = Math.round(56 - u * 26 + Math.sin(u * 6 + kk) * 3), rr = 3 + u * 6; disco(sx, sy, rr, u < 0.5 ? H('#5a5a62') : H('#8a8a92')); }
  // ola de proa
  for (let i = 0; i < 10; i++) { const w = Math.sin(t * 6 + i); pset(x + 196 + i, 150 - Math.round(Math.abs(w) * 2) + (i >> 2), H('#f2f6f8')); pset(x + 194 - i * 3, 152, H('#e8f0f4')); }
};
const remolcador = (x, t) => {
  for (let y = 158; y < 164; y++) for (let xx = x; xx < x + 34; xx++) if ((xx + y) % 3 === 0) pset(xx, y, H('#3a4c62'));
  poligono([[x, 148], [x + 34, 148], [x + 30, 158], [x + 4, 158]], K); poligono([[x + 1, 149], [x + 33, 149], [x + 29, 157], [x + 5, 157]], H('#2a2a30')); rect(x + 1, 149, x + 33, 150, H('#b83030'));
  rect(x + 10, 140, x + 24, 148, K); rect(x + 11, 141, x + 23, 147, H('#e8e2d0')); rect(x + 13, 143, x + 16, 145, H('#3a4a5a')); rect(x + 18, 143, x + 21, 145, H('#3a4a5a'));
  rect(x + 14, 132, x + 19, 140, K); rect(x + 15, 133, x + 18, 139, H('#b83030')); rect(x + 15, 133, x + 18, 134, H('#2a2a30'));
  for (let kk = 0; kk < 4; kk++) { const u = ((t * 0.6 + kk / 4) % 1); disco(Math.round(x + 16 - u * 14), Math.round(128 - u * 14), 1.5 + u * 3, H('#9a9aa2')); }
  for (let i = 0; i < 4; i++) disco(x + 34 + i, 151, 1, H('#5a4a3a'));
};
const caballete = (x, y, u) => {   // x, y = la esquina de arriba del lienzo; u: cuánto se ha pintado
  linea(x + 2, y + 14, x - 1, y + 24, H('#6a4422')); linea(x + 12, y + 14, x + 15, y + 24, H('#6a4422')); linea(x + 7, y - 2, x + 7, y + 24, H('#8a5a30'));
  rect(x - 1, y - 1, x + 15, y + 14, K); rect(x, y, x + 14, y + 13, H('#f6f2e6')); rect(x - 1, y + 14, x + 15, y + 15, H('#8a5a30'));
  if (u > 0) { for (let yy = y + 1; yy < y + 13; yy++) for (let xx = x + 1; xx < x + 14; xx++) if ((xx - x) < u * 16) pset(xx, yy, yy < y + 8 ? H('#9ac0e0') : H('#4a7aa0'));
    if (u > 0.5) { rect(x + 6, y + 4, x + 8, y + 10, H('#5a9a86')); pset(x + 8, y + 3, H('#c8a040')); } }
};
const p1 = (t) => {
  fondo1();
  // nubes de tres tonos a tres velocidades, por encima de la ciudad
  R.recorte([0, 0, 319, 50]);
  nube(((t * 2 + 40) % 400) - 40, 30, 46, HS(['#a8b8d0', '#e0e8f2', '#ffffff'])); nube(((t * 3.2 + 230) % 400) - 40, 20, 30, HS(['#9aacc8', '#d0dcea', '#f4f8fc'])); nube(((t * 1.3 + 150) % 400) - 40, 44, 54, HS(['#b0bcd0', '#dce4ee', '#f8fafc']));
  R.recorte(null);
  aguaPuerto(t, 102, HS(['#2a4a6a', '#3a5e82', '#4e7498', '#6a8eb0']));
  for (let kk = 0; kk < 4; kk++) pajaro((t * 12 + kk * 37) % 360 - 20, 30 + kk * 6 + Math.sin(t * 2 + kk) * 3, t + kk, H('#f2f2f2'));
  const dx = Math.round((t - 1.3) * 1.8), x = 108 + dx;
  remolcador(70 + dx, t);
  // los soldados en cubierta (pies en y 117): el pintor y su caballete en popa; dos en proa
  const pi = R.actor(EL.pintorGA, x + 8, 118, t, { dir: -1, sostiene: [x + 4 + Math.round(Math.sin(t * 7) * 2), 104] });
  const ad = t > EEUU - 0.3 && t < P2;
  R.actor(EL.soldadoGA, x + 150, 117, t, { dir: -1, dedo: ad && Math.sin(t * 10) > -0.2, brazos: ad && Math.sin(t * 10) <= -0.2, sonrisa: ad });
  R.actor(EL.soldadoGA3, x + 176, 117, t, { dir: 1, habla: t > FALLO && t < AÑO44 && Math.sin(t * 8) > 0 });
  transporte(x, t);
  // vuelvo a pintar lo de cubierta que va delante del casco: la borda con sus candeleros
  for (const [a, b] of [[x + 2, x + 54], [x + 136, x + 196]]) { linea(a, 112, b, 111, H('#d8d8d0')); linea(a, 115, b, 114, H('#a8a8a0')); for (let xx = a; xx < b; xx += 6) linea(xx, 112, xx, 118, H('#a8a8a0')); }
  caballete(x - 14, 92, tramo(t, 1.4, P2 - 0.4));
  { const [mx, my] = pi.mano; linea(mx, my, mx - 4, my - 2, H('#8a5a30')); pset(mx - 5, my - 2, H('#c83030')); }
  // la sirena: un chorro de vapor junto a la chimenea en «1944»
  const v = tramo(t, AÑO44, AÑO44 + 1.2); if (v > 0 && v < 1) for (let kk = 0; kk < 6; kk++) disco(Math.round(x + 98 + kk * 2 - v * 6), Math.round(60 - kk * 3 - v * 8), 2 + kk * 0.6 * (1 - v), H('#f4f4f4'));
};

// ── 2 · un muelle de Europa (fondo local) ───────────────────────────────────────────────────────────────────────────
const casa = (x, w, y0, c, cS) => {
  for (let y = y0; y < 120; y++) for (let xx = x; xx < x + w; xx++) pset(xx, y, rampa([cS, c, H('#efe6d0')], 1.1 + (h2(xx >> 1, y >> 2) - 0.5) * 0.7 + (xx === x ? 0.8 : 0), xx, y));
  poligono([[x - 2, y0], [x + (w >> 1), y0 - Math.round(w * 0.7)], [x + w + 1, y0]], H('#3a4250')); linea(x - 2, y0, x + (w >> 1), y0 - Math.round(w * 0.7), H('#5a6474'));
  for (let y = y0 - Math.round(w * 0.5); y < y0; y += 3) linea(x + (w >> 1) - Math.round((y - y0 + w * 0.7) / 1.4), y, x + (w >> 1) + Math.round((y - y0 + w * 0.7) / 1.4), y, H('#2e3440'));
  rect(x + w - 6, y0 - Math.round(w * 0.6), x + w - 3, y0 - 4, H('#7a4a3a'));
  for (let y = y0 + 6; y < 112; y += 12) for (let xx = x + 3; xx < x + w - 5; xx += 8) { rect(xx - 1, y, xx + 5, y + 7, H('#5a6a3a')); rect(xx + 1, y, xx + 3, y + 7, H('#2a3448')); pset(xx + 1, y + 1, H('#8aa0c0')); }
};
const fondo2 = () => fondoFijo(CACHE, 'muelle', () => {
  cieloT(0, 96, HS(['#5a86c4', '#6e96cc', '#88aad6', '#a4bede', '#c6d4e4']));
  // el pueblo de piedra con sus tejados de pizarra y el campanario
  const C2 = [['#d8c8a4', '#a89a7a'], ['#c8b490', '#988666'], ['#e2d6bc', '#b0a488'], ['#c4beb0', '#948e80']];
  [[110, 22, 70], [130, 24, 62], [152, 20, 74], [170, 26, 66], [194, 22, 72], [246, 24, 64], [268, 22, 74], [288, 32, 66]].forEach(([x, w, y0], i) => casa(x, w, y0, H(C2[i % 4][0]), H(C2[i % 4][1])));
  rect(220, 46, 240, 120, K); for (let y = 47; y < 120; y++) for (let x = 221; x < 240; x++) pset(x, y, rampa(HS(['#8a8678', '#a8a494', '#c4c0ae']), 1.2 + (h2(x >> 1, y >> 1) - 0.5) * 0.8 + (x < 224 ? 0.8 : 0), x, y));
  poligono([[218, 47], [230, 22], [242, 47]], H('#3a4250')); linea(218, 47, 230, 22, H('#5a6474')); rect(229, 16, 230, 22, H('#3a3a40')); rect(227, 18, 232, 18, H('#3a3a40'));
  rect(225, 56, 235, 68, K); rect(226, 57, 234, 67, H('#2a2a34')); disco(230, 80, 5, H('#e8e4d8')); R.anillo(230, 80, 5, K); linea(230, 80, 230, 77, K); linea(230, 80, 232, 80, K);
  // la grúa del puerto
  for (let y = 40; y < 120; y += 6) { linea(156, y, 166, y + 6, H('#3a3a40')); linea(166, y, 156, y + 6, H('#3a3a40')); } rect(155, 40, 156, 120, H('#2a2a30')); rect(166, 40, 167, 120, H('#2a2a30'));
  linea(156, 40, 196, 46, H('#2a2a30')); linea(156, 44, 196, 46, H('#2a2a30')); linea(196, 46, 196, 76, H('#4a4a50')); rect(192, 76, 200, 82, H('#8a6a3a'));
  // el muelle de adoquines (de y 118 a 158) y su borde de piedra con argollas y defensas
  for (let y = 118; y < 158; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 118) / 4), off = (fy % 2) * 3, jn = (x + off) % 6 === 0 || (y - 118) % 4 === 3;
    pset(x, y, jn ? H('#5a5248') : rampa(HS(['#7a7064', '#8a8072', '#9a9082', '#aaa092']), 1.6 + (h2((x + off) / 6 | 0, fy) - 0.5) * 1.4 - (y - 118) * 0.01, x, y)); }
  rect(0, 118, 319, 119, H('#4a443c'));
  for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 158) / 7), jn = ((x + (fy % 2) * 10) % 20) === 0 || (y - 158) % 7 === 6;
    pset(x, y, jn ? H('#3a342e') : rampa(HS(['#5a544a', '#6a6458', '#7a7466']), 1.3 + (h2(x >> 2, fy) - 0.5) * 1.2, x, y)); }
  rect(0, 158, 319, 159, H('#aaa092'));
  for (const x of [60, 220]) { disco(x, 170, 4, K); disco(x, 170, 3, H('#2a2a30')); disco(x, 170, 1.5, H('#5a5a60')); }
  // cajas al fondo del muelle y barriles
  for (const [x, y, w, hh] of [[272, 104, 22, 16], [294, 108, 20, 12], [278, 92, 16, 12]]) { rect(x, y, x + w, y + hh, K); rect(x + 1, y + 1, x + w - 1, y + hh - 1, H('#a87a48')); for (let j = y + 4; j < y + hh; j += 4) rect(x + 1, j, x + w - 1, j, H('#7a5430')); linea(x + 1, y + 1, x + w - 1, y + hh - 1, H('#7a5430')); }
  // el casco del barco a la izquierda, con remaches, ojos de buey y la puerta del costado
  for (let y = 24; y < 119; y++) for (let x = 0; x < 98; x++) pset(x, y, rampa(HS(['#4a525e', '#5a6470', '#6a7480']), 1.4 + (x > 92 ? -1 : 0) + (h2(x >> 2, y >> 3) - 0.5) * 0.6, x, y));
  for (let y = 32; y < 118; y += 16) rect(0, y, 97, y, H('#46505c')); for (let x = 10; x < 98; x += 12) for (let y = 34; y < 118; y += 4) pset(x, y, H('#7a8490'));
  rect(0, 22, 99, 25, K); rect(0, 22, 99, 22, H('#8a949e')); for (let x = 2; x < 98; x += 6) linea(x, 16, x, 22, H('#a8a8a0')); linea(0, 16, 98, 16, H('#c8c8c0')); linea(0, 19, 98, 19, H('#a8a8a0'));
  for (const x of [14, 36, 58]) { disco(x, 40, 3.5, K); disco(x, 40, 2.5, H('#8aa8c4')); pset(x - 1, 39, H('#e8f0f8')); }
  for (const [x, l] of [[8, 30], [30, 22], [52, 36], [78, 18], [44, 14]]) for (let y = 44; y < 44 + l; y++) if (h2(x, y) > 0.25) pset(x + (y % 3 === 0 ? 1 : 0), y, H('#8a5a3a'));
  for (let x = 4; x < 94; x += 1) for (const y of [58, 59]) pset(x, y, x % 4 < 3 ? H('#c8ccd0') : H('#9aa0a8'));
  R.numero('25', 30, 112, { color: H('#e8e8e0') });
  rect(66, 70, 88, 98, K); rect(67, 71, 87, 97, H('#2a2e36')); rect(67, 71, 87, 72, H('#4a4e56'));
});
const pasarela = (x) => x <= 136 ? Math.round(96 + (x - 76) * 44 / 60) : 140 + Math.round((x - 136) * 0.04);
const p2 = (t) => {
  fondo2();
  R.recorte([0, 0, 319, 60]);
  nube(((t * 2.5 + 120) % 400) - 40, 30, 40, HS(['#a8b8d0', '#e0e8f2', '#ffffff'])); nube(((t * 1.4 + 300) % 400) - 40, 20, 52, HS(['#a0b2cc', '#d8e2ee', '#f8fafc']));
  R.recorte(null);
  // humo de las chimeneas y gaviotas
  for (const [cx, cy] of [[127, 46], [191, 42], [311, 40]]) for (let kk = 0; kk < 4; kk++) { const u = ((t * 0.5 + kk / 4) % 1); pset(Math.round(cx + u * 10 + Math.sin(u * 5) * 2), Math.round(cy - u * 16), u < 0.5 ? H('#c8ccd4') : H('#e4e8ee')); }
  for (let kk = 0; kk < 3; kk++) pajaro((t * 14 + kk * 70) % 360 - 20, 50 + kk * 8 + Math.sin(t * 3 + kk) * 3, t + kk, H('#f6f6f6'));
  // la pasarela del costado al muelle, con su barandilla
  poligono([[74, 98], [80, 96], [140, 140], [134, 142]], K); poligono([[76, 98], [80, 97], [138, 140], [135, 141]], H('#8a6a44'));
  for (let i = 0; i < 10; i++) { const x = 78 + i * 6; linea(x, pasarela(x), x + 2, pasarela(x) - 1, H('#5a4028')); }
  // el oficial los cuenta con su tablilla y señala el pueblo en «to Europe»
  const of = R.actor(EL.oficialAliado2, 182, 148, t, { dir: t > EUROPA - 0.3 && t < MIL ? 1 : -1, dedo: t > EUROPA - 0.3 && t < MIL, sostiene: t > EUROPA - 0.3 && t < MIL ? undefined : [178, 134], habla: t > MIL && Math.sin(t * 9) > 0 });
  if (!(t > EUROPA - 0.3 && t < MIL)) { const [cx, cy] = of.mano; rect(cx - 7, cy - 6, cx + 1, cy + 5, K); rect(cx - 6, cy - 5, cx, cy + 4, H('#a8743c')); rect(cx - 5, cy - 3, cx - 1, cy + 3, H('#f2eee2')); }
  // bajan los soldados, cada uno con lo suyo
  const FILA = [[EL.pintorGA, 'cuaderno'], [EL.soldadoGA, 'caballete'], [EL.soldadoGA2, 'pinturas'], [EL.soldadoGA3, 'bocina'], [EL.operadorRadio, 'magnetofon']];
  FILA.forEach(([d, obj], i) => {
    const t0 = P2 + 0.05 + i * 0.75, u = t - t0; if (u < 0) return;
    const x = u < 1.6 ? Math.round(68 + u * 42) : Math.round(136 + (u - 1.6) * 52); if (x > 330) return;
    const suelo = pasarela(x + 7) + 2, a = R.actor(d, x, suelo, t, { dir: 1, anda: true, sostiene: obj === 'cuaderno' ? undefined : true, sonrisa: i === 0 });
    if (obj === 'cuaderno') return;
    const [mx, my] = a.mano;
    if (obj === 'caballete') { linea(mx - 2, my + 6, mx + 6, my - 16, H('#6a4422')); linea(mx + 2, my + 6, mx + 6, my - 16, H('#8a5a30')); linea(mx + 6, my + 6, mx + 6, my - 16, H('#6a4422')); rect(mx + 1, my - 6, mx + 7, my - 5, H('#8a5a30')); }
    else if (obj === 'pinturas') { rect(mx - 6, my - 4, mx + 6, my + 4, K); rect(mx - 5, my - 3, mx + 5, my + 3, H('#8a5a30')); rect(mx - 5, my - 3, mx + 5, my - 3, H('#b07a48')); for (const [j, c] of [[-3, '#c83030'], [0, '#3a6ac8'], [3, '#e8c040']]) pset(mx + j, my, H(c)); }
    else if (obj === 'bocina') { poligono([[mx - 2, my - 2], [mx + 10, my - 8], [mx + 10, my + 6], [mx - 2, my + 2]], K); poligono([[mx - 1, my - 1], [mx + 9, my - 6], [mx + 9, my + 4], [mx - 1, my + 1]], H('#7a7e70')); rect(mx + 8, my - 6, mx + 9, my + 4, H('#3a3e34')); }
    else { rect(mx - 6, my - 5, mx + 6, my + 3, K); rect(mx - 5, my - 4, mx + 5, my + 2, H('#4a4a52')); const g2 = t * 6; for (const cx of [mx - 3, mx + 3]) { disco(cx, my - 2, 2, H('#c8c8d0')); pset(cx + Math.round(Math.cos(g2)), my - 2 + Math.round(Math.sin(g2)), K); } }
  });
  // la barandilla de cuerda de la pasarela, por delante
  linea(76, 88, 138, 130, H('#c8b080')); for (const x of [80, 104, 128]) linea(x, pasarela(x) - 1, x, pasarela(x) - 10, H('#6a4a28'));
  // delante: el noray con la amarra que sube al barco y una gaviota encima; barriles y un rollo de cuerda a la derecha
  const nx = 106; linea(nx, 148, 94, 108, H('#a89060')); linea(nx + 1, 148, 95, 108, H('#7a6440')); rect(nx - 6, 146, nx + 6, 158, K); rect(nx - 5, 147, nx + 5, 157, H('#2a2a30')); rect(nx - 7, 145, nx + 7, 147, K); rect(nx - 6, 145, nx + 6, 146, H('#4a4a52'));
  const gv = Math.sin(t * 3) > 0.6; rect(nx - 3, 140, nx + 3, 144, H('#f2f2f2')); rect(nx - 3, 143, nx + 3, 144, H('#c8ccd0')); pset(gv ? nx + 4 : nx + 3, 139, H('#f2f2f2')); pset(gv ? nx + 5 : nx + 4, 139, H('#e8a030')); pset(nx - 4, 141, H('#5a5a62'));
  for (const bx of [292, 308]) { rect(bx - 7, 150, bx + 7, 172, K); rect(bx - 6, 151, bx + 6, 171, H('#7a4a2a')); rect(bx - 6, 151, bx - 4, 171, H('#9a6a3a')); for (const y of [155, 166]) rect(bx - 6, y, bx + 6, y + 1, H('#3a3a40')); }
  for (let i = 0; i < 4; i++) R.anillo(264, 170, 8 - i * 2, i % 2 ? H('#8a7448') : H('#b8a070'));
  // «About 1,100 men»: el contador sube
  const c = tramo(t, MIL - 0.3, MIL + 0.25);
  if (c > 0) { R.numero(String(Math.round(suave(c) * 1100)), 226, 46, { tam: 16, centro: true }); if (c >= 1 && t < MIL + 0.9) destello(262, 30, 3, H('#fff4c0')); }
};

// ── 3 · el campo de Francia al atardecer ────────────────────────────────────────────────────────────────────────────
const p3 = (t) => {
  const O = { encuadre: 'campo44', noche: 0, tanque: false, altavoz: 0 };
  T.guerra(R, t, O);
  // el técnico de sonido con su magnetofón sobre una caja
  const so = t > SONIDO - 0.1;
  R.actor(EL.operadorRadio, 92, 160, t, { dir: -1, dedo: t > SONIDO - 0.3 && t < SONIDO + 0.5, sonrisa: so });
  rect(66, 146, 90, 162, K); rect(67, 147, 89, 161, H('#8a6a3a')); for (let j = 151; j < 161; j += 4) rect(67, j, 89, j, H('#6a4a28'));
  rect(68, 136, 88, 146, K); rect(69, 137, 87, 145, H('#4a4a52')); rect(69, 137, 87, 138, H('#6a6a74'));
  for (const cx of [73, 83]) { disco(cx, 141, 3, H('#c8c8d0')); disco(cx, 141, 1, K); if (so) pset(cx + Math.round(Math.cos(t * 8) * 2), 141 + Math.round(Math.sin(t * 8) * 2), K); }
  if (so) for (let kk = 0; kk < 3; kk++) { const u = ((t * 1.2 + kk / 3) % 1); R.anillo(78, 134, 3 + u * 10, u < 0.6 ? H('#f8e8b0') : H('#d8c890'), 3); }
  // el pintor dibuja un tanque en su cuaderno
  R.actor(EL.pintorGA, 116, 154, t, { dir: 1, habla: false });
  // el diseñador despliega la tela de camuflaje
  const te = tramo(t, DISENA - 0.2, DISENA + 0.5), di = R.actor(EL.soldadoGA3, 146, 156, t, { dir: 1, sostiene: true, sonrisa: te >= 1 });
  { const [mx, my] = di.mano, L = Math.round(4 + te * 16); rect(mx - 1, my - 1, mx + 12, my + L, K); for (let y = my; y < my + L; y++) for (let x = mx; x < mx + 12; x++) { const v = h2(Math.floor((x - mx) / 3), Math.floor((y - my) / 3)); pset(x, y, v < 0.35 ? H('#5a6a3a') : v < 0.7 ? H('#7a6a44') : H('#3a4626')); } rect(mx - 1, my - 2, mx + 12, my - 1, H('#a89a70')); }
  // el oficial explica la misión y señala al horizonte
  const se = t > ALEMANES - 0.2;
  R.actor(EL.oficialAliado2, 172, 150, t, { dir: se ? 1 : -1, habla: t > MISION - 0.1 && t < ALEMANES && Math.sin(t * 9) > 0, dedo: se });
  T.guerraDelante(R, t, O);
  // el bocadillo del pintor: su boceto del tanque se dibuja
  const b = tramo(t, PINTORES - 0.2, PINTORES + 0.9);
  if (b > 0) { bocadillo(104, 92, 146, 122, 122, 128); const L = (x0, y0, x1, y1, f) => { if (b >= f) linea(x0, y0, x1, y1, H('#4a4a5a')); };
    L(110, 114, 140, 114, 0); L(110, 114, 113, 118, 0.1); L(113, 118, 137, 118, 0.2); L(137, 118, 140, 114, 0.3); L(116, 114, 118, 107, 0.4); L(118, 107, 132, 107, 0.5); L(132, 107, 134, 114, 0.6); L(132, 109, 143, 106, 0.75);
    for (let i = 0; i < 5; i++) if (b > 0.85) R.anillo(115 + i * 5, 116, 1.5, H('#4a4a5a')); }
  if (se) { const u = (t - ALEMANES) % 1; for (let i = 0; i < 3; i++) pset(Math.round(196 + u * 30 + i * 6), 132 - i, H('#fff0b0')); }
};

// ── 4 · la mesa de mapas: soldados donde no hay nadie ───────────────────────────────────────────────────────────────
const FICHAS = [[150, 48], [160, 40], [166, 54], [176, 44], [146, 32], [184, 56], [170, 30], [190, 40], [156, 62], [196, 50]];
const p4 = (t) => {
  T.guerra(R, t, { encuadre: 'rin', camara: 'mapa', falsa: tramo(t, P4 + 0.1, MILES + 0.3), real: 0 });
  const nada = tramo(t, NINGUNO - 0.1, NINGUNO + 0.3);
  FICHAS.forEach(([x, y], i) => { const t0 = lerp(MILES, SOLDADOS + 0.2, i / (FICHAS.length - 1)), u = tramo(t, t0, t0 + 0.15); if (u <= 0) return;
    const yy = y - Math.round((1 - u) * 6);
    if (nada < 1 || i % 2) { rect(x - 4, yy - 3, x + 4, yy + 3, K); rect(x - 3, yy - 2, x + 3, yy + 2, H('#c89a5a')); rect(x - 3, yy - 2, x + 3, yy - 2, H('#e8c088')); linea(x - 2, yy, x + 2, yy, H('#5a3a1a')); pset(x + 1, yy - 1, H('#5a3a1a')); }
    if (nada > 0) for (let a = -4; a <= 4; a++) for (const bb of [-3, 3]) { if ((a + bb + Math.floor(t * 6)) % 2) { pset(x + a, yy + bb, H('#f8f8ff')); pset(x + bb, yy + Math.round(a * 0.75), H('#f8f8ff')); } }
  });
  // «Ghost Army»: un tanque de puntos blancos sube del sitio vacío y se mece
  const f = tramo(t, FANTASMA - 0.15, FANTASMA + 0.6);
  if (f > 0) { const cx = 128 + Math.round(Math.sin(t * 2.4) * 3), cy = Math.round(lerp(112, 98, suave(f)) + Math.sin(t * 3) * 2), BL = H('#f4f8ff'), BS = H('#c8d4ee');
    const casco = [[-26, 8], [26, 8], [20, 16], [-20, 16]], cuerpo = [[-30, -2], [30, -2], [26, 8], [-26, 8]], torre = [[-12, -14], [10, -14], [12, -2], [-14, -2]];
    for (const pol of [casco, cuerpo, torre]) { const P = pol.map(([a, bb]) => [cx + a, cy + bb]); poligono(P, (x, y) => ((x + y + Math.floor(t * 4)) % 2 ? BS : R.pget(x, y)));
      for (let i = 0; i < P.length; i++) { const [ax, ay] = P[i], [bx, by] = P[(i + 1) % P.length]; linea(ax, ay, bx, by, BL); } }
    linea(cx + 10, cy - 9, cx + 34, cy - 12, BL); linea(cx + 10, cy - 8, cx + 34, cy - 11, BL);
    for (let i = 0; i < 6; i++) R.anillo(cx - 20 + i * 8, cy + 12, 2.5, BL);
    disco(cx - 4, cy - 9, 1.5, K); disco(cx + 3, cy - 9, 1.5, K);
    for (let i = 0; i < 5; i++) { const u = ((t * 0.8 + i / 5) % 1); pset(cx - 24 + i * 12 + Math.round(Math.sin(u * 6 + i) * 2), cy + 18 + Math.round(u * 8), BS); }
    if (f > 0.3 && f < 0.95) destello(cx + 36, cy - 18, 3, H('#fffef0')); }
  // el gato espía cruza por la esquina de abajo y se sienta junto a la taza
  const gc = tramo(t, NINGUNO, FANTASMA + 0.8);
  if (gc > 0) { const x = Math.round(lerp(336, 268, gc)); T.gatoEspia(R, x, 178, t, gc < 1 ? { anda: true, dir: -1 } : { cara: 'travieso' }); }
};

const efectos = [[AÑO44, 'vapor'], [EEUU, 'ola'], [P2 + 0.3, 'silbato'], [EUROPA, 'carro'], [MIL + 0.25, 'brillo'],
  [PINTORES - 0.1, 'lapiz'], [DISENA, 'papel'], [SONIDO, 'zumbido'], [ALEMANES, 'whoosh'],
  [MILES, 'pop'], [NINGUNO, 'whoosh'], [FANTASMA, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1944', efectos, año: 1944 });
''')
