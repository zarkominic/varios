E = {}

# Ayudas comunes (se copian en cada cuerpo): hh (ruido), mez (mezcla de colores), K (tinta).
AYUDAS = r'''
const K = T.C.k;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// una nota musical: forma 0 negra, 1 dos corcheas unidas, 2 nota fantasma (rombo con cola ondulada); c color, s escala 1–2
const nota = (x, y, forma, c, s = 1, t = 0) => {
  x = Math.round(x); y = Math.round(y); const cs = mez(c, K, 0.45), cl = mez(c, hex('#ffffff'), 0.55);
  if (forma === 2) {
    const r = 3 * s; R.poligono([[x, y - r - 1], [x + r + 1, y], [x, y + r + 1], [x - r - 1, y]], K); R.poligono([[x, y - r], [x + r, y], [x, y + r], [x - r, y]], c);
    R.pset(x - 1, y - 1, cl); for (let k = 0; k < 7 * s; k++) R.pset(x + Math.round(Math.sin(k * 0.9 + t * 8) * 1.5), y + r + 1 + k, k % 2 ? cs : c);
    return;
  }
  const cab = (cx) => { R.disco(cx + 0.5, y + 0.5, 2.6 * s, K); R.disco(cx + 0.5, y + 0.5, 1.9 * s, c); R.pset(cx - 1, y - 1, cl); };
  const palo = (cx) => { R.rect(cx + 2 * s, y - 9 * s, cx + 2 * s + s - 1, y, K); };
  if (forma === 1) { cab(x - 4 * s); cab(x + 4 * s); palo(x - 4 * s); palo(x + 4 * s); R.rect(x - 2 * s, y - 9 * s, x + 6 * s + s - 1, y - 8 * s + s - 1, K); R.rect(x - 2 * s, y - 9 * s + 1, x + 6 * s, y - 9 * s + 1, c); return; }
  cab(x); palo(x); R.rect(x + 3 * s, y - 9 * s, x + 4 * s, y - 8 * s, K); R.pset(x + 4 * s, y - 7 * s, K);
};
'''

E['la-ahogado'] = ('El ahogado', '''// LA-AHOGADO (frases 21–22), 1990 (la primera isla de los piratas). Tres planos:
// 1. (fondo local) la mesa de cartas del camarote: sobre el pergamino de las reglas, la pluma que escribe sola tacha la
//    calavera con una «X» roja en «never dying»; en «exception» añade un único asterisco dorado que parpadea; en «joke» la
//    pluma le hace cosquillas al mono, que bota y aplaude; ojo de buey con el mar y la luna, farol que se mece, vela, reloj
//    de arena y brújula. Corta en «Early».
// 2. isla 'fondo' general: el aspirante baja hundiéndose entre burbujas y se planta en la arena con su cronómetro; en
//    «brags» presume (bota, sonríe) y sale el bocadillo con el reloj y un «10» en «ten minutes»; pulsa el cronómetro en
//    «minutes»; pasa un banco de peces por delante. Corta en «and if you later…».
// 3. isla 'fondo' cerca: el reloj grande de latón cuenta los minutos (1…10, 11 en «more than ten minutes»); el aspirante
//    se va poniendo verde, con las mejillas hinchadas; el tentáculo verde baja nadando con un salvavidas y se lo echa en
//    «drowns»; el aspirante recupera el color, sonríe y los dos suben (gag amable, nada morboso).''', AYUDAS + r'''
const a = (f) => en('excepcion', f), b = (f) => en('ahogado', f);
const P2 = b(0) - 0.4, P3 = b(0.498);
// ── plano 1: el camarote ────────────────────────────────────────────────────────────────────────────────────────
const MAD = ['#2a160c', '#4a2c18', '#5e3a20', '#724828', '#8a5a32', '#a06c3c'].map(hex);
const MES = ['#3a1e10', '#5a3018', '#6e3c20', '#844a28', '#9a5a30', '#b8743e'].map(hex);
const PERG = ['#a8844a', '#c8a468', '#dcbc80', '#ecd49a', '#f6e4b4'].map(hex), TINTA = hex('#3a2414');
const CAL = ['....######....', '..##########..', '.############.', '##############', '###...##...###', '##....##....##', '##....##....##', '###..####..###', '#######.######', '.#####...####.', '..##########..', '..#.#.##.#.#..', '..##########..', '...########...'];
const pintaCamarote = () => {
  const { rect, pset, linea, disco } = R;
  // la pared de tablas (y 0–73), con vetas, juntas y clavos, y la sombra del techo
  for (let y = 0; y < 74; y++) { const j = Math.floor(y / 9), dy = y % 9, jx = 23 + Math.floor(hh(j, 7) * 90);
    for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.07 + j * 2.3 + Math.sin(x * 0.021 + j * 1.3) * 2.6 + dy * 0.55);
      let k = 3 - (j % 2) + (v > 0.84 ? -1 : v < -0.9 ? 1 : 0) + (hh(x >> 1, y, j) < 0.06 ? -1 : 0);
      if (dy === 8 || (x - jx) % 97 === 0) k = 0; else if (dy === 0 || (x - jx) % 97 === 1) k += 1;
      if (y < 12) k -= y < 5 ? 2 : 1;
      pset(x, y, MAD[Math.max(0, Math.min(5, k))]); }
    for (let x = jx; x < 320; x += 97) if (dy === 2 || dy === 6) { pset(x + 3, y, hex('#c8b48a')); pset(x + 3, y + 1, MAD[0]); pset(x - 3, y, hex('#c8b48a')); } }
  // las cuadernas (vigas curvas) con sus pernos
  for (const bx of [0, 178]) { rect(bx, 0, bx + 11, 73, MAD[1]); rect(bx + 1, 0, bx + 2, 73, MAD[4]); rect(bx + 10, 0, bx + 11, 73, MAD[0]);
    for (let y = 2; y < 73; y += 3) if (hh(bx, y) < 0.4) pset(bx + 5 + (y % 4), y, MAD[0]);
    for (const y of [10, 34, 58]) { disco(bx + 6, y, 2, hex('#5a5a62')); pset(bx + 5, y - 1, hex('#a8a8b0')); } }
  // el estante con botellas, un barco en una botella y libros
  rect(16, 42, 100, 45, MAD[5]); rect(16, 46, 100, 47, MAD[0]); rect(16, 42, 100, 42, hex('#c08a50'));
  for (const x of [24, 88]) { rect(x, 48, x + 3, 56, MAD[1]); linea(x, 56, x + 3, 48, MAD[0]); }
  for (let y = 48; y < 53; y++) rect(16, y, 100, y, mez(MAD[2], K, 0.5 - (y - 48) * 0.1));
  const bot = (x, h, c, cl) => { rect(x, 41 - h, x + 5, 41, K); rect(x + 1, 42 - h, x + 4, 41, c); rect(x + 1, 42 - h, x + 1, 40, cl); rect(x + 2, 37 - h, x + 3, 41 - h, K); rect(x + 2, 36 - h, x + 3, 36 - h, hex('#c89a5a')); };
  bot(20, 13, hex('#2a6a3a'), hex('#6ab87a')); bot(28, 10, hex('#6a3a1a'), hex('#b8783a')); bot(35, 15, hex('#2a4a6a'), hex('#7aaad8'));
  // el barco en la botella (tumbada)
  rect(44, 31, 74, 41, K); rect(45, 32, 73, 40, hex('#9ac8d8')); rect(45, 32, 73, 33, hex('#d8f0f8')); rect(74, 34, 78, 38, K); rect(75, 35, 77, 37, hex('#c89a5a'));
  rect(50, 37, 66, 39, hex('#6a3a1a')); rect(51, 39, 65, 39, hex('#3a1e10')); rect(57, 31, 57, 37, K); rect(53, 32, 56, 36, hex('#f2eee2')); rect(58, 33, 62, 36, hex('#f2eee2')); pset(57, 31, hex('#c84a3a'));
  rect(45, 39, 73, 40, hex('#3a7a9a'));
  // los libros
  [[80, 12, '#8a2a2a'], [84, 14, '#2a4a7a'], [88, 11, '#3a6a3a'], [92, 13, '#7a5a2a'], [96, 9, '#5a2a5a']].forEach(([x, h, c]) => { rect(x, 41 - h, x + 3, 41, K); rect(x + 1, 42 - h, x + 2, 41, hex(c)); pset(x + 1, 44 - h, hex('#e8c860')); pset(x + 1, 38, hex('#e8c860')); });
  // un mapa clavado en la pared (sin letras: la costa, una ruta de puntos y una cruz)
  rect(110, 12, 160, 50, K); rect(111, 13, 159, 49, PERG[3]); for (let y = 13; y < 50; y++) for (let x = 111; x < 160; x++) if (hh(x, y, 4) < 0.12) pset(x, y, PERG[2]);
  for (let y = 18; y < 46; y++) { const xc = 126 + Math.round(Math.sin(y * 0.3) * 4 + Math.sin(y * 0.11) * 3); rect(111, y, xc, y, hex('#8ab8c8')); pset(xc, y, hex('#3a6a8a')); }
  linea(132, 40, 150, 22, hex('#a8402a'), 3); linea(147, 19, 153, 25, hex('#a8402a')); linea(153, 19, 147, 25, hex('#a8402a'));
  disco(156, 44, 3, hex('#3a6a8a')); linea(156, 40, 156, 48, PERG[4]); linea(152, 44, 160, 44, PERG[4]);
  pset(135, 12, hex('#c8c8d0')); pset(135, 11, K);
  // el ojo de buey: el aro de latón con sus remaches (el mar se pinta en cada fotograma)
  for (let y = 12; y < 66; y++) for (let x = 198; x < 254; x++) { const d = Math.hypot(x + 0.5 - 226, y + 0.5 - 39), an = Math.atan2(y - 39, x - 226);
    if (d > 19 && d <= 25) pset(x, y, d > 24 ? K : d < 20 ? hex('#5a4210') : [hex('#8a6a20'), hex('#c8a040'), hex('#e8c860'), hex('#fff0a0')][Math.max(0, Math.min(3, Math.round(1.5 - Math.cos(an + 0.8) * 1.6 + (d > 22 ? -0.6 : 0.3))))]); }
  for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2; disco(226 + Math.cos(an) * 22.5, 39 + Math.sin(an) * 22.5, 1.2, hex('#5a4210')); pset(Math.round(226 + Math.cos(an) * 22.5), Math.round(39 + Math.sin(an) * 22.5) - 1, hex('#fff0a0')); }
  // la sombra de la mesa contra la pared y el canto de atrás de la mesa
  rect(0, 70, 319, 73, mez(MAD[1], K, 0.4));
  // la mesa: tablones gruesos de madera rojiza con vetas, nudos y una quemadura
  for (let y = 74; y < 180; y++) { const j = Math.floor((y - 74) / 15), dy = (y - 74) % 15;
    for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.045 + j * 1.9 + Math.sin(x * 0.017 + j * 2.1) * 3 + dy * 0.35);
      let k = 3 + (j % 2 ? 0 : 1) + (v > 0.86 ? -1 : v < -0.88 ? 1 : 0) + (hh(x >> 1, y >> 1, j + 9) < 0.05 ? -1 : 0);
      if (dy === 14) k = 0; else if (dy === 0) k = 5; if (y < 80) k -= 1;
      pset(x, y, MES[Math.max(0, Math.min(5, k))]); } }
  for (const [nx, ny] of [[40, 92], [292, 104], [180, 172], [70, 150]]) for (let k = 0; k < 3; k++) R.anillo(nx, ny, 2 + k * 1.6, MES[1 + k % 2]);
  disco(300, 92, 6, mez(MES[2], K, 0.5)); disco(300, 92, 3, mez(MES[1], K, 0.6));
  // el catalejo en diagonal y un rollo de cabo
  for (let i = 0; i <= 66; i++) { const x = 6 + i, y = 172 - Math.round(i * 0.3), w = i < 22 ? 3 : i < 46 ? 4 : 5;
    for (let s = -w; s <= w; s++) pset(x, y + s, Math.abs(s) === w ? K : s < -w / 2 ? hex('#fff0a0') : s > w / 2 ? hex('#8a6a20') : (i === 22 || i === 46) ? hex('#5a4210') : hex('#c8a040')); }
  disco(73, 152, 5, K); disco(73, 152, 4, hex('#2a3a5a')); pset(72, 150, hex('#aad8f8'));
  for (let k = 6; k >= 0; k--) { R.disco(286, 160, 18 - k * 2.2, K); R.disco(286, 160, 17 - k * 2.2, k % 2 ? hex('#c8a468') : hex('#a8844a')); }
  disco(286, 160, 3, MES[0]);
  for (let k = 0; k < 40; k++) { const an = k * 0.9; pset(286 + Math.round(Math.cos(an) * (6 + k * 0.28)), 160 + Math.round(Math.sin(an) * (6 + k * 0.28)), hex('#8a6a3a')); }
  // monedas desperdigadas
  for (const [mx, my] of [[244, 168], [252, 172], [236, 174], [258, 165], [30, 140]]) { disco(mx, my, 3, K); disco(mx, my, 2.2, hex('#e8b830')); pset(mx - 1, my - 1, hex('#fff0a0')); }
  // el pergamino de las reglas (x 92–228, y 80–166) con sus dos rollos
  for (let y = 84; y < 164; y++) for (let x = 94; x < 227; x++) { const borde = Math.min(x - 94, 226 - x, y - 84, 163 - y), n = hh(x >> 1, y >> 1, 3);
    pset(x, y, PERG[Math.max(0, Math.min(4, 4 - (n < 0.1 ? 1 : 0) - (borde < 2 ? 2 : borde < 5 ? 1 : 0) - (hh(x >> 3, y >> 3, 8) < 0.15 ? 1 : 0)))]); }
  for (const yr of [80, 160]) { rect(90, yr, 230, yr + 7, K); for (let y = yr + 1; y < yr + 7; y++) rect(91, y, 229, y, PERG[[1, 3, 4, 3, 2, 0][y - yr - 1]]); rect(88, yr + 1, 90, yr + 6, MES[0]); rect(230, yr + 1, 232, yr + 6, MES[0]); }
  rect(94, 164, 226, 165, mez(MES[2], K, 0.5));
  // los renglones sin letras: una línea de título y garabatos ondulados, y el número de la regla
  for (let x = 112; x < 210; x++) { pset(x, 95 + Math.round(Math.sin(x * 0.5) * 1.2), TINTA); pset(x, 96 + Math.round(Math.sin(x * 0.5) * 1.2), TINTA); }
  for (const yl of [146, 152]) for (let x = 104; x < (yl === 146 ? 214 : 176); x++) if ((x >> 3) % 5 !== 4) pset(x, yl + Math.round(Math.sin(x * 0.7 + yl) * 1), mez(TINTA, PERG[3], 0.3));
  R.numero('1', 106, 116, { color: TINTA, sombra: false });
  // la calavera de la regla (x 146–173, y 106–133)
  CAL.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') rect(146 + i * 2, 106 + j * 2, 147 + i * 2, 107 + j * 2, TINTA); });
  // el tintero de cristal (la pluma vuelve a él) y la vela en su palmatoria
  rect(232, 88, 246, 102, K); rect(233, 89, 245, 101, hex('#1a1a2a')); rect(234, 90, 236, 99, hex('#4a4a6a')); rect(236, 85, 242, 88, K); rect(237, 86, 241, 87, hex('#3a3a4a'));
  disco(60, 132, 9, K); disco(60, 132, 8, hex('#8a6a20')); disco(59, 131, 5, hex('#c8a040')); rect(56, 108, 64, 130, K); rect(57, 109, 63, 130, hex('#f2e8d0')); rect(57, 109, 58, 130, hex('#fffaf0')); rect(62, 109, 63, 130, hex('#c8bca0'));
  rect(58, 108, 61, 111, hex('#e8dcc0')); rect(69, 130, 72, 133, K);
  // el reloj de arena (x 24–40, y 98–126)
  rect(22, 96, 42, 99, K); rect(23, 97, 41, 98, MAD[4]); rect(22, 125, 42, 128, K); rect(23, 126, 41, 127, MAD[4]); rect(23, 99, 24, 125, MAD[2]); rect(40, 99, 41, 125, MAD[2]);
  // la brújula (centro 250, 136)
  disco(250, 136, 12, K); disco(250, 136, 11, hex('#8a6a20')); disco(249, 135, 10, hex('#c8a040')); disco(250, 136, 9, hex('#f2eee2')); rect(247, 123, 253, 125, K); rect(248, 124, 252, 124, hex('#e8c860'));
  for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; pset(Math.round(250 + Math.cos(an) * 7), Math.round(136 + Math.sin(an) * 7), k % 2 ? hex('#8a8a9a') : TINTA); }
};
let camarote = null;
// la pluma que escribe sola: punta en (x, y), pluma blanca hacia arriba a la derecha
const pluma = (x, y, t, ang = 0) => {
  x = Math.round(x); y = Math.round(y); const dx = 15 + Math.round(Math.sin(ang) * 3), dy = -22;
  R.linea(x + 1, y + 1, x + dx + 1, y + dy + 1, mez(MES[2], K, 0.6));
  for (let i = 6; i <= 24; i++) { const u = i / 24, cx = x + dx * u, cy = y + dy * u, w = Math.sin(u * Math.PI) * 4.5 + 0.5;
    for (let s = -w; s <= w; s += 0.5) { const px = Math.round(cx + s * 0.82), py = Math.round(cy + s * 0.56); R.pset(px, py, Math.abs(s) > w - 0.8 ? hex('#8a8a9a') : s < 0 ? hex('#ffffff') : hex('#d8d8e0')); } }
  R.linea(x, y, x + dx, y + dy, hex('#c8b48a')); R.linea(x, y, x + 3, y - 4, K); R.pset(x, y, TINTA);
};
const p1 = (t) => {
  if (!camarote) { camarote = R.nuevo(); const prev = R.usar(camarote); pintaCamarote(); R.usar(prev); }
  R.copiar(camarote);
  // el mar por el ojo de buey: cielo de noche, la luna, nubes y olas que corren, un barco que pasa
  R.disco(226, 39, 19.5, (x, y) => {
    const hz = 44 + Math.round(Math.sin(t * 1.1) * 2);
    if (y < hz) { if (Math.hypot(x - 234, y - 28) < 5) return Math.hypot(x - 233, y - 27) < 3 ? hex('#fff8d8') : hex('#e8dca8');
      const nb = Math.sin((x + t * 6) * 0.2) + Math.sin((x + t * 6) * 0.07 + 1) - (y - 30) * 0.18; if (nb > 1.3) return hex('#5a6a9a'); if (nb > 1.0) return hex('#3a4a7a');
      if (hh(x, y, 2) < 0.03 && Math.sin(t * 3 + x) > 0) return hex('#f2eee2'); return y < 26 ? hex('#141a3e') : (hh(x, y) < 0.5 ? hex('#1e2650') : hex('#141a3e')); }
    const bx = 196 + ((t * 7) % 70); if (y < hz + 2 && y >= hz - 6 && x > bx && x < bx + 10) return K;
    if (y < hz - 6 && y > hz - 14 && x > bx + 3 && x < bx + 7) return hex('#2a2a3a');
    const w = Math.sin(x * 0.4 - t * 3 + y * 1.3); if (Math.abs(x - 234) < 3 + (y - hz) * 0.3 && w > 0) return hex('#c8d8f0');
    return w > 0.7 ? hex('#3a6a9a') : y > hz + 8 ? hex('#16284a') : hex('#1e3a5a'); });
  // el farol que se mece colgado de la viga, con su halo en la pared
  const an = Math.sin(t * 1.4) * 0.16, lx = 106 + Math.sin(an) * 30, ly = 2 + Math.cos(an) * 30;
  R.halo(lx, ly + 8, 26, [hex('#6a4a28'), hex('#7a5a30'), hex('#8a6a38')], 0.9);
  R.linea(106, 0, lx, ly, hex('#3a3a42'), 2); R.rect(lx - 5, ly, lx + 5, ly + 2, K); R.rect(lx - 4, ly + 3, lx + 4, ly + 13, K);
  R.rect(lx - 3, ly + 4, lx + 3, ly + 12, Math.sin(t * 13) > -0.3 ? hex('#f8d870') : hex('#f0b840')); R.rect(lx - 1, ly + 6, lx + 1, ly + 10, hex('#fff8d0'));
  R.rect(lx - 5, ly + 14, lx + 5, ly + 15, K); R.rect(lx - 4, ly + 3, lx - 4, ly + 13, hex('#3a3a42')); R.rect(lx + 4, ly + 3, lx + 4, ly + 13, hex('#3a3a42'));
  // la vela: la llama que tiembla y su luz
  const fl = Math.sin(t * 17) * 0.5 + Math.sin(t * 11.3) * 0.5;
  R.halo(60, 102, 22, [hex('#b07a3a'), hex('#c8904a'), hex('#e0aa5a')], 0.7);
  R.disco(60, 103, 2.6, hex('#f0a020')); R.poligono([[57, 104], [60 + fl, 96 - Math.abs(fl)], [63, 104]], hex('#f8d050')); R.pset(60, 103, hex('#fff8d0')); R.pset(60, 101, hex('#fff0a0'));
  // el reloj de arena: la arena cae
  const ar = (t * 0.06) % 1;
  for (let y = 100; y < 125; y++) { const m = Math.abs(y - 112.5), w = Math.round(1 + m * 0.55); R.rect(32 - w, y, 32 + w, y, hex('#c8e0f0')); R.pset(32 - w, y, hex('#f2f8ff'));
    if ((y < 112 && y > 101 + ar * 10) || (y > 124 - (1 - ar) * 4 - ar * 8)) R.rect(32 - w + 1, y, 32 + w - 1, y, hex('#e8c070')); }
  if (Math.floor(t * 12) % 2) R.rect(32, 112, 32, 123, hex('#e8c070')); else R.rect(32, 113, 32, 123, hex('#e8c070'));
  // la brújula: la aguja que oscila
  const ag = Math.sin(t * 2.1) * 0.5 + Math.sin(t * 0.7) * 0.3;
  R.linea(250, 136, 250 + Math.sin(ag) * 7, 136 - Math.cos(ag) * 7, hex('#c83a3a')); R.linea(250, 136, 250 - Math.sin(ag) * 6, 136 + Math.cos(ag) * 6, hex('#3a3a4a')); R.pset(250, 136, hex('#e8b830'));
  // la «X» roja que tacha la calavera, trazo a trazo en «never dying»
  const u1 = tramo(t, a(0.1), a(0.16)), u2 = tramo(t, a(0.17), a(0.23));
  const trazo = (x0, y0, x1, y1, u) => { if (u <= 0) return; const xe = lerp(x0, x1, u), ye = lerp(y0, y1, u);
    for (const [ox, oy, c] of [[0, 2, mez(hex('#8a1a1a'), K, 0.3)], [-1, 0, hex('#c82a2a')], [0, 0, hex('#c82a2a')], [1, 0, hex('#e04a3a')], [0, -1, hex('#e04a3a')]]) R.linea(x0 + ox, y0 + oy, xe + ox, ye + oy, c); };
  trazo(138, 102, 182, 140, u1); trazo(182, 102, 138, 140, u2);
  // el asterisco dorado en «exception»: tres trazos, luego late y echa chispas
  const ax = 200, ay = 108, ua = tramo(t, a(0.5), a(0.57));
  if (ua > 0) { const brilla = t > a(0.58) ? (Math.sin(t * 7) > -0.2 ? 1 : 0) : 0;
    if (brilla) R.halo(ax, ay, 13, [hex('#e8cc80'), hex('#f0dc98'), hex('#f8eab8')], 1);
    for (let k = 0; k < 3; k++) { const v = Math.max(0, Math.min(1, ua * 3 - k)); if (v <= 0) continue; const an2 = k * Math.PI / 3 + Math.PI / 2, dx = Math.cos(an2) * 8, dy = Math.sin(an2) * 8;
      for (const [ox, oy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) R.linea(ax - dx + ox, ay - dy + oy, ax - dx + 2 * dx * v + ox, ay - dy + 2 * dy * v + oy, brilla ? hex('#f8c830') : hex('#c89820')); }
    if (brilla) for (let k = 0; k < 4; k++) { const an3 = t * 2 + k * Math.PI / 2, r = 12 + Math.sin(t * 5 + k) * 2; R.pset(Math.round(ax + Math.cos(an3) * r), Math.round(ay + Math.sin(an3) * r), hex('#fff8d0')); } }
  // el mono, sentado en la mesa: come su plátano, mira el asterisco y, con las cosquillas de la pluma, bota y ríe
  const cosq = t > a(0.86) && t < a(1.05);
  const mono = T.bicho(R, 276, 114, t, { quien: 'mono', s: 2, dir: t > a(0.55) ? -1 : 1, platano: t < a(0.5), salta: cosq });
  if (cosq) { R.bocadillo(mono.cabeza[0] + 12, mono.cabeza[1] - 8, { icono: '!' }); }
  // la pluma: del tintero a la X, al asterisco, de vuelta al tintero y, en «joke», a hacerle cosquillas al mono
  const tinta = [238, 86], pasos = [
    [0, tinta], [a(0.06), tinta], [a(0.1), [138, 102]], [a(0.16), [182, 140]], [a(0.17), [182, 102]], [a(0.23), [138, 140]], [a(0.31), tinta], [a(0.42), tinta],
    [a(0.5), [ax, ay - 8]], [a(0.52), [ax, ay + 8]], [a(0.54), [ax + 7, ay - 4]], [a(0.555), [ax - 7, ay + 4]], [a(0.57), [ax - 7, ay - 4]], [a(0.585), [ax + 7, ay + 4]], [a(0.68), tinta], [a(0.8), tinta], [a(0.86), [262, 104]], [9, [262, 104]]];
  let q = pasos[0][1]; for (let k = 1; k < pasos.length; k++) { const [t0, p0] = pasos[k - 1], [t1, p1q] = pasos[k]; if (t >= t0 && t <= t1) { const u = (t - t0) / Math.max(1e-6, t1 - t0); q = [lerp(p0[0], p1q[0], u), lerp(p0[1], p1q[1], u)]; break; } if (t > t1) q = p1q; }
  const reposo = (t < a(0.06) || (t > a(0.31) && t < a(0.42)) || (t > a(0.68) && t < a(0.8))) ? Math.sin(t * 3) * 1.5 : 0;
  pluma(q[0] + (cosq ? Math.sin(t * 30) * 3 : 0), q[1] + reposo, t, cosq ? Math.sin(t * 30) : 0);
  if (t > a(0.06) && t < a(0.1)) R.pset(Math.round(q[0]), Math.round(q[1]) + 3, TINTA);
};
// ── plano 2: el fondo del mar, se hunde y presume ──────────────────────────────────────────────────────────────
const p2 = (t) => {
  T.isla(R, t, { encuadre: 'fondo' });
  const baja = tramo(t, P2 + 0.15, b(0.13)), x = 150, suelo = Math.round(lerp(4, 160, baja));
  const presume = t > b(0.16) && t < b(0.3), pulsa = b(0.403);
  // burbujas que deja al hundirse y las que suelta por la boca
  for (let k = 0; k < 10; k++) { const f = (t * 0.7 + k * 0.1) % 1, by = suelo - 28 - f * 80 - (1 - baja) * 10, bx = x + 7 + Math.sin(t * 3 + k * 2) * 3 + (k % 3 - 1) * 4;
    if (by > 6 && (baja < 1 || k < 3)) R.anillo(bx, by, k % 3 === 0 ? 2 : 1.2, hex('#c8e8f8')); }
  const r = R.actor(EL.aspirante, x, suelo, t, { dir: 1, sostiene: true, quieto: baja < 1, salto: presume ? Math.round(Math.abs(Math.sin((t - b(0.16)) * 7)) * 3) : 0, sonrisa: t > b(0.15), sorpresa: baja > 0 && baja < 0.6 });
  // el cronómetro en la mano (latón, con su corona), que destella al pulsarlo
  const [mx, my] = r.mano; R.disco(mx + 1, my, 3.6, K); R.disco(mx + 1, my, 2.8, hex('#e0e4ea')); R.pset(mx + 1, my - 1, hex('#c83a3a')); R.rect(mx, my - 5, mx + 2, my - 4, K); R.pset(mx + 1, my - 5, hex('#c8a040'));
  if (t > pulsa && t < pulsa + 0.35) for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; R.pset(Math.round(mx + 1 + Math.cos(an) * 6), Math.round(my + Math.sin(an) * 6), hex('#fff8d0')); }
  // el bocadillo: presume de aguantar diez minutos
  if (t > b(0.2) && t < P3) { const bx = x + 22, by = suelo - 50, ab = tramo(t, b(0.2), b(0.2) + 0.25), w = Math.round(18 * ab), hb = Math.round(13 * ab);
    if (ab > 0) { R.rect(bx - 1, by - 1, bx + w + 1, by + hb + 1, K); R.rect(bx, by, bx + w, by + hb, hex('#f6f8fa')); R.rect(bx, by + hb, bx + w, by + hb, hex('#c8d0dc'));
      R.poligono([[bx + 2, by + hb], [bx + 7, by + hb], [bx - 3, by + hb + 7]], K); R.poligono([[bx + 3, by + hb], [bx + 6, by + hb], [bx - 1, by + hb + 5]], hex('#f6f8fa')); }
    if (ab >= 1) { R.icono('reloj', bx + 2, by - 1 + 1, K, hex('#c8d0dc'), 2); if (t > b(0.372)) R.numero('10', bx + w + 6, by + 14, { tam: 16 }); } }
  // un banco de peces cruza por delante
  const pc = tramo(t, P2 + 1.5, P3 - 0.2);
  if (pc > 0 && pc < 1) for (let k = 0; k < 7; k++) { const px = Math.round(lerp(340, -40, pc) + (k % 3) * 9 + k * 5), py = 92 + (k % 4) * 6 + Math.round(Math.sin(t * 4 + k) * 2);
    R.rect(px, py, px + 5, py + 2, K); R.rect(px + 1, py + 1, px + 4, py + 1, hex('#f0a040')); R.pset(px + 1, py, hex('#f8d070')); R.rect(px + 6, py - 1, px + 7, py + 3, hex('#c87a2a')); R.pset(px + 1, py + 1, K); }
};
// ── plano 3: el reloj llega a diez, se pone verde y el tentáculo le echa el salvavidas ─────────────────────────
const salvavidas = (cx, cy, rx, ry, mitad) => {   // mitad: 'atras', 'delante' o 'todo'
  for (let k = 0; k < 64; k++) { const an = k / 64 * Math.PI * 2, s = Math.sin(an); if (mitad === 'atras' && s > 0) continue; if (mitad === 'delante' && s <= 0) continue;
    const px = cx + Math.cos(an) * rx, py = cy + s * ry, c = Math.floor(k / 8) % 2 ? hex('#f2eee2') : hex('#d83a3a'), cs = Math.floor(k / 8) % 2 ? hex('#c8c0b0') : hex('#9a2222');
    R.disco(px, py, 2.6, K); }
  for (let k = 0; k < 64; k++) { const an = k / 64 * Math.PI * 2, s = Math.sin(an); if (mitad === 'atras' && s > 0) continue; if (mitad === 'delante' && s <= 0) continue;
    const px = cx + Math.cos(an) * rx, py = cy + s * ry, c = Math.floor(k / 8) % 2 ? hex('#f2eee2') : hex('#d83a3a');
    R.disco(px, py, 1.8, c); if (s < -0.3) R.pset(Math.round(px), Math.round(py) - 1, mez(c, hex('#ffffff'), 0.5)); }
};
const p3 = (t) => {
  T.isla(R, t, { encuadre: 'fondo', camara: 'cerca' });
  const ini = P3 + 0.3, diez = b(0.778), once = b(0.842), cae = b(0.924), sube = b(0.95);
  const min = t < ini ? 0 : t < diez ? 1 + Math.floor((t - ini) / ((diez - ini) / 9)) : t < once ? 10 : 11;
  // el reloj grande de latón apoyado en el ancla: la aguja da una vuelta por minuto
  const cx = 86, cy = 114;
  R.disco(cx + 2, cy + 15, 10, hex('#1e3a5a'));
  R.disco(cx, cy, 15, K); R.disco(cx, cy, 14, hex('#8a6a20')); R.disco(cx - 1, cy - 1, 12.5, hex('#c8a040')); R.disco(cx, cy, 11, K); R.disco(cx, cy, 10, hex('#f2eee2'));
  R.rect(cx - 2, cy - 19, cx + 2, cy - 15, K); R.rect(cx - 1, cy - 18, cx + 1, cy - 16, hex('#e8c860'));
  for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 - Math.PI / 2; R.pset(Math.round(cx + Math.cos(an) * 8), Math.round(cy + Math.sin(an) * 8), k < min ? hex('#c83a3a') : hex('#5a5a6a')); }
  const fr = t < ini ? 0 : Math.min(1.1, (t - ini) / (diez - ini) * 0.9 + 0.1), ang = fr * Math.PI * 2 * 1 - Math.PI / 2 + (t > ini ? (t - ini) * 9 : 0);
  R.linea(cx, cy, cx + Math.cos(ang) * 8, cy + Math.sin(ang) * 8, hex('#c83a3a')); R.linea(cx, cy, cx + Math.cos(fr * Math.PI * 2 - Math.PI / 2) * 5, cy + Math.sin(fr * Math.PI * 2 - Math.PI / 2) * 5, K); R.pset(cx, cy, hex('#e8b830'));
  if (min > 0) R.numero(String(min), cx, cy - 22, { tam: 16, centro: true, ...(min >= 10 ? { color: Math.floor(t * 6) % 2 ? hex('#f04a3a') : hex('#ffd060') } : {}) });
  // el aspirante: se va poniendo verde; el salvavidas le devuelve el color
  const verde = tramo(t, b(0.68), once) * (1 - tramo(t, cae + 0.25, sube + 0.35));
  const rx = 140, sueloA = Math.round(160 - tramo(t, sube, E.duracion) * 46);
  const piel = { S: mez(hex('#f6c290'), hex('#8ad87a'), verde), s: mez(hex('#d48a5a'), hex('#4a9a4a'), verde) };
  const anillo = t > cae + 0.25, ayr = sueloA - 11;
  if (anillo) salvavidas(rx + 7, ayr, 11, 3, 'atras');
  R.actor(EL.aspirante, rx, sueloA, t, { dir: -1, pal: piel, sorpresa: verde > 0.4 && !anillo, sonrisa: anillo || t < b(0.66), quieto: verde > 0.9 && !anillo, salto: verde > 0.5 && !anillo ? Math.round(Math.abs(Math.sin(t * 9)) * 1) : 0 });
  if (verde > 0.3 && !anillo) { R.disco(rx + 3, sueloA - 16, 1.6, piel.S); R.pset(rx + 2, sueloA - 16, K); }   // la mejilla hinchada
  if (anillo) salvavidas(rx + 7, ayr, 11, 3, 'delante');
  // burbujitas de aire que se le escapan
  for (let k = 0; k < 4; k++) { const f = (t * (verde > 0.5 ? 1.4 : 0.6) + k * 0.25) % 1; R.anillo(rx + 3 + Math.sin(t * 4 + k) * 2, sueloA - 20 - f * 40, 1.2 + (k % 2), hex('#c8e8f8')); }
  // el tentáculo verde baja nadando con el salvavidas y se lo echa
  const nada = tramo(t, diez + 0.3, cae), tx = Math.round(lerp(236, 172, nada) + Math.sin(t * 3) * 4 * (1 - nada)), ty = Math.round(lerp(-6, 138, nada) - tramo(t, sube, E.duracion) * 50);
  if (t > diez + 0.3) {
    for (let k = 0; k < 5; k++) { const f = (t * 1.2 + k * 0.2) % 1; R.anillo(tx + Math.sin(k * 3) * 6, ty - 30 - f * 30, 1.3, hex('#c8e8f8')); }
    const tc = T.tentaculo(R, tx, ty, t, { color: 'verde', dir: -1, brazos: 1, expresion: anillo ? 'feliz' : 'preocupado', anda: nada < 1, inclina: nada < 1 ? -0.2 : 0 });
    if (!anillo) { const [hx, hy] = tc.mano ?? [tx - 8, ty - 16], vuela = tramo(t, cae, cae + 0.25);
      const sx = lerp(hx - 4, rx + 7, vuela), sy = lerp(hy + 2, ayr, vuela); salvavidas(sx, sy, lerp(8, 11, vuela), lerp(8, 3, vuela), 'todo'); }
  }
  // un pez curioso pasa por delante
  const pz = tramo(t, P3 + 0.4, P3 + 3.4); if (pz > 0 && pz < 1) { const px = Math.round(lerp(330, 196, pz)), py = 70 + Math.round(Math.sin(t * 3) * 3);
    R.rect(px, py, px + 9, py + 5, K); R.rect(px + 1, py + 1, px + 8, py + 4, hex('#5ab8d8')); R.rect(px + 1, py + 1, px + 8, py + 1, hex('#9ae0f0')); R.rect(px + 10, py, px + 12, py + 5, hex('#3a8ab0')); R.pset(px + 2, py + 2, K); }
};
const efectos = [[a(0.1), 'lapiz'], [a(0.52), 'lapiz'], [a(0.6), 'brillo'], [a(0.88), 'boing'], [P2 + 0.3, 'burbujas'], [b(0.13), 'golpecito'], [b(0.403), 'tic'], [P3 + 0.3, 'tic'], [b(0.842), 'aviso'], [b(0.84) + 0.3, 'whoosh'], [b(0.924) + 0.25, 'boing'], [b(0.95) + 0.1, 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1990 });
''')

E['la-imuse'] = ('iMUSE', '''// LA-IMUSE (frase 23), 1991, cartela «1991». Tres planos:
// 1. estudio 'musica' general: un músico toca el sintetizador y de él salen notas de colores; el segundo músico entra con
//    un disquete; en «invention» lo levanta y el disquete brilla y echa notas; los dos sonríen. Corta en «by its composers».
// 2. estudio 'musica' 'teclado': la mano del primer músico toca acordes desde el principio; en «Peter» entra la mano del
//    segundo; en «iMUSE» brota del teclado un chorro de notas que cambian de color y de forma, y en la pantalla la onda se
//    transforma sin cortarse. Corta en «The music».
// 3. un travelling de un sitio a otro: el aspirante cruza la selva de noche (isla 'bosque' general), salta a la cubierta del
//    barco fantasma (isla 'barcoFantasma' cerca) mientras la cámara pasa de un decorado al otro tras un tronco en primer
//    término; las notas que flotan en el aire cambian de color y de forma al cruzar la juntura, sin cortarse
//    («seamlessly… from one place to another»); en «movie» el aspirante levanta los brazos, encantado.''', AYUDAS + r'''
const a = (f) => en('imuse', f);
const P2 = a(0.255), P3 = a(0.615);
const PAL2 = { H: hex('#e0b860'), h: hex('#c8984a'), C: hex('#3e7a5a'), c: hex('#2c5a40'), W: hex('#3e7a5a') };
const COLS = ['#f0c040', '#f07a3a', '#e84a8a', '#6ad0f0', '#7ae86a', '#b07af0'].map(hex);
// ── plano 1: el rincón de la música ─────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'musica', anyo: 1990, toca: true });
  const inv = a(0.203), entra = tramo(t, 1.6, a(0.16)), x2 = Math.round(lerp(330, 196, entra));
  // las notas de colores que suben del sintetizador
  for (let k = 0; k < 9; k++) { const f = (t * 0.45 + k / 9) % 1, nx = 84 + (k * 37) % 90 + Math.sin(t * 2 + k) * 4, ny = 136 - f * 70;
    if (ny > 52) nota(nx, ny, k % 2, COLS[k % 6], 1, t); }
  R.actor(EL.musico, g.pies[0], g.sueloSinte, t, { dir: 1, sonrisa: true, salto: Math.floor(t * 4) % 2, sorpresa: t > inv && t < inv + 0.5 });
  // el segundo músico entra con el disquete y lo levanta en «invention»
  const sube = tramo(t, inv - 0.1, inv + 0.3), r = R.actor(EL.musico, x2, g.suelo, t, { dir: -1, pal: PAL2, anda: entra > 0 && entra < 1, sonrisa: t > inv, sostiene: sube > 0 ? [x2 - 4, Math.round(lerp(132, 116, sube))] : true });
  const [mx, my] = r.mano, dx = mx - 5, dy = my - 7;
  if (t > inv) { R.halo(mx, my - 2, 16, [hex('#8a7a5a'), hex('#b8a060'), hex('#e8d080')], 1); for (let k = 0; k < 5; k++) { const f = (t - inv + k * 0.3) % 1.5 / 1.5; nota(mx + Math.cos(k * 1.3 + f * 3) * (6 + f * 22), my - 6 - f * 34, k % 2, COLS[(k + 2) % 6], 1, t); } }
  R.rect(dx, dy, dx + 10, dy + 10, K); R.rect(dx + 1, dy + 1, dx + 9, dy + 9, hex('#2a2a3a')); R.rect(dx + 3, dy + 1, dx + 7, dy + 3, hex('#c8c8d0')); R.rect(dx + 2, dy + 5, dx + 8, dy + 9, hex('#f2eee2'));
  R.rect(dx + 3, dy + 6, dx + 7, dy + 6, COLS[(Math.floor(t * 3)) % 6]); R.rect(dx + 3, dy + 8, dx + 6, dy + 8, hex('#8a8a9a'));
  if (t > inv && t < inv + 1.8) R.bocadillo(g.pies[0] + 18, g.sueloSinte - 32, { icono: '!' });
};
// ── plano 2: el teclado de cerca, las dos manos y la invención ─────────────────────────────────────────────────
const p2 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'musica', camara: 'teclado' });
  const imuse = a(0.531), peter = a(0.421);
  // en la pantalla, la onda que cambia de forma sin cortarse
  if (g.pantalla) { const [x0, y0, x1, y1] = g.pantalla, m = tramo(t, imuse, imuse + 1.2), yc = (y0 + y1) >> 1; R.recorte([x0 + 2, y0 + 2, x1 - 2, y1 - 2]);
    for (let x = x0 + 2; x < x1 - 2; x++) { const ph = (x - x0) * 0.25 - t * 4, sq = Math.sign(Math.sin(ph)), sn = Math.sin(ph), tri = Math.asin(Math.sin(ph)) / 1.57;
      const tramoX = (x - x0) / (x1 - x0), w = m * 3 - tramoX * 2, v = w < 0.5 ? sq : w < 1.5 ? lerp(sq, sn, w - 0.5) : lerp(sn, tri, Math.min(1, w - 1.5));
      const c = m > 0 ? COLS[Math.floor(tramoX * 3 + t) % 6] : hex('#f0b03a'); R.pset(x, Math.round(yc + v * (y1 - y0) * 0.3), c); R.pset(x, Math.round(yc + v * (y1 - y0) * 0.3) + 1, mez(c, K, 0.5)); }
    R.recorte(null); }
  // las teclas que se hunden bajo los dedos
  const hunde = (fx) => { const k = Math.floor((fx + 4) / 15), kx = -4 + k * 15; R.rect(kx + 1, 125, kx + 13, 127, hex('#8a8a96')); R.rect(kx + 2, 128, kx + 12, 129, hex('#c8c8d0')); };
  // antes del invento, unas pocas notas doradas suben de las manos (la música de siempre)
  for (let k = 0; k < 6; k++) { const f = (t * 0.5 + k / 6) % 1; if (t < imuse || f > 0.6) { const nx = 90 + k * 26 + Math.sin(t * 2 + k) * 5, ny = 120 - f * 70; if (ny > 40) nota(nx, ny, k % 2, hex('#f0b03a'), 1, t); } }
  // la mano izquierda (el primer músico, jersey morado) toca acordes
  const ac = Math.floor(t * 2.5) % 4, lx = 64 + [0, 30, 15, 45][ac], prL = (t * 2.5) % 1 < 0.45;
  hunde(lx + 10); hunde(lx + 2);
  T.brazo(R, lx - 34, 196, lx - 2, prL ? 146 : 142, '#5a4a7a', 1, { codo: [lx - 24, 170] });
  // la mano derecha (el segundo, camisa verde) entra en «Peter»
  const en2 = tramo(t, peter - 0.2, peter + 0.4);
  if (en2 > 0) { const ac2 = Math.floor(t * 3.3 + 1) % 3, rx = Math.round(lerp(340, 224 - [0, 30, 15][ac2], en2)), prR = (t * 3.3) % 1 < 0.45;
    if (en2 >= 1) { hunde(rx - 10); hunde(rx - 3); }
    T.brazo(R, rx + 36, 198, rx + 2, prR && en2 >= 1 ? 146 : 142, '#3e7a5a', -1, { codo: [rx + 28, 172] }); }
  // en «iMUSE», el chorro de notas que brota del teclado y cambia de color y de forma mientras sube
  if (t > imuse - 0.1) for (let k = 0; k < 16; k++) { const f = ((t - imuse) * 0.55 + k / 16) % 1, edad = t - imuse - k * 0.06; if (edad < 0) continue;
    const nx = 150 + Math.sin(k * 2.4) * 30 + Math.sin(f * 6 + k) * 18 + f * (k % 2 ? 60 : -50), ny = 124 - f * 110;
    if (ny < 18 || (nx > 270 && ny < 48)) continue;
    const forma = f < 0.33 ? 0 : f < 0.66 ? 1 : 2, c = mez(COLS[k % 6], COLS[(k + 3) % 6], (f * 3) % 1);
    nota(nx, ny, forma, c, f > 0.15 && f < 0.85 ? 2 : 1, t); }
};
// ── plano 3: de la selva a la cubierta del barco fantasma, sin cortar la música ─────────────────────────────────
const bufA = R.nuevo(), bufB = R.nuevo();
const tronco = (sx, t) => {   // un tronco de palmera en primer término tapa la juntura entre los dos sitios
  for (let y = 0; y < 180; y++) { const cx = sx + Math.round(Math.sin(y * 0.02) * 4), w = 7 + (y > 150 ? (y - 150) * 0.2 : 0), anillo = (y + Math.round(sx * 0.3)) % 7;
    for (let x = Math.round(cx - w); x <= cx + w; x++) { const s = (x - cx) / w; R.pset(x, y, Math.abs(s) > 0.86 ? hex('#0a0e0c') : anillo === 0 ? hex('#1a201c') : s < -0.4 ? hex('#3a4a3a') : s > 0.4 ? hex('#141a16') : hex('#26302a')); } }
  // la niebla verde que se cuela por la juntura
  for (let y = 100; y < 180; y++) for (let x = sx - 22; x <= sx + 22; x++) { const d = Math.abs(x - sx) / 22; if (Math.abs(x - sx) > 8 && hh(x, y, Math.floor(t * 4)) > 0.55 + d * 0.4) R.pset(x, y, hex('#8ae8a8')); }
  // un helecho que asoma al pie del tronco
  for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + (k - 2.5) * 0.45 + Math.sin(t * 2 + k) * 0.06; R.linea(sx, 178, sx + Math.cos(an) * 24, 178 + Math.sin(an) * 20, k % 2 ? hex('#2a6a3a') : hex('#3a8a4a')); }
};
const p3 = (t) => {
  const pan = Math.round(320 * tramo(t, a(0.66), a(0.87))), sx = 320 - pan;
  const dest = R.usar(bufA); if (pan < 320) T.isla(R, t, { encuadre: 'bosque' }); R.delante = null;
  R.usar(bufB); if (pan > 0) T.isla(R, t, { encuadre: 'barcoFantasma', camara: 'cerca' }); R.delante = null;
  R.usar(dest);
  for (let y = 0; y < 180; y++) { const o = y * 320; if (pan < 320) dest.set(bufA.subarray(o + pan, o + 320), o); if (pan > 0) dest.set(bufB.subarray(o, o + pan), o + 320 - pan); }
  // las notas que flotan en el aire: cálidas y redondas en la selva, verdes y fantasmales en el barco; cambian al cruzar
  for (let k = 0; k < 22; k++) { const wx = (k * 61 + t * 14) % 660 - 10, x = wx - pan, y = 58 + (k * 23) % 50 + Math.sin(t * 1.6 + k * 1.3) * 6;
    if (x < -8 || x > 328 || (x > 266 && y < 50)) continue;
    const m = Math.max(0, Math.min(1, (x - sx + 20) / 40)), c = mez(COLS[k % 3], [hex('#8ae8a8'), hex('#6ad0f0'), hex('#c8f8e8')][k % 3], m);
    const forma = m < 0.5 ? k % 2 : 2, s = m > 0.35 && m < 0.65 ? 1 : (k % 4 === 0 ? 2 : 1);
    nota(x + (m > 0.5 ? Math.sin(t * 5 + k) * 2 : 0), y + (m < 0.5 ? -Math.abs(Math.sin(t * 4 + k)) * 3 : 0), forma, c, s, t); }
  // el aspirante: anda por el camino, salta a la cubierta al pasar la juntura y llega junto al timón
  const llega = tramo(t, P3 + 0.1, a(0.68)), cruza = a(0.765), salta = tramo(t, cruza - 0.18, cruza + 0.18), fin = tramo(t, a(0.88), a(0.95));
  const x = Math.round(lerp(40, 140, llega) + lerp(0, 52, fin)), suelo = Math.round(lerp(150, 162, salta)), alto = Math.round(Math.sin(salta * Math.PI) * 9);
  const movie = t > a(0.94), anda = (llega > 0 && llega < 1) || (t > a(0.68) && t < a(0.87) && (salta <= 0 || salta >= 1)) || (fin > 0 && fin < 1);
  R.actor(EL.aspirante, x, suelo, t, { dir: 1, anda: anda && alto === 0, salto: alto, sorpresa: t > a(0.87) && t < a(0.92), sonrisa: !(t > a(0.87) && t < a(0.92)), brazos: movie });
  if (sx > -16 && sx < 336) tronco(sx, t);
};
const efectos = [[a(0.2), 'brillo'], [a(0.531), 'brillo'], [a(0.67), 'whoosh'], [a(0.765), 'golpecito'], [a(0.95), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '1991', efectos, año: 1991 });
''')

E['la-tentaculo'] = ('Day of the Tentacle', '''// LA-TENTACULO (frases 24–25), 1993, cartela «1993». Cuatro planos:
// 1. mansion 'fachada' general de día, con rebote: los dos directores jóvenes suben por el camino con el guion; hablan; en
//    «direct a game» uno levanta el guion; en «first time» saltan y chocan las manos, y la casa bota como en los dibujos;
//    el tentáculo morado saluda desde el rellano. Corta en «Day of the Tentacle».
// 2. mansion 'pasillo' general (1993, de día): el tentáculo morado, con bracitos y brillo, sale de la puerta verde en
//    «Day of the Tentacle» y cruza a saltitos hasta el centro; pose de conquistador en «sequel to Maniac Mansion»; entran
//    los tres amigos por la derecha; en «stop the purple tentacle» le señalan, enfadados, y él se sorprende. Corta en «Three».
// 3. epocas 'presente' cerca (el jardín con los tres retretes): los amigos llegan corriendo, abren las puertas y se meten;
//    el morado se cuela a saltitos en el retrete azul justo antes de que se cierre; en «travel through time» los tres
//    tiemblan, se cargan y salen disparados con un destello en «portable toilets»; quedan las marcas y el humo. Corta en
//    «and each one».
// 4. epocas 'triple': la casa en 1793, 1993 y 2193; un retrete llega a cada época con su destello («each one», «different
//    era», «same house») y de cada uno sale un amigo; en 1793 asoma después el morado.''', AYUDAS + r'''
const a = (f) => en('dott', f), b = (f) => en('retretes', f);
const P2 = a(0.6085), P3 = b(0.19), P4 = b(0.619);
// ── plano 1: la fachada que bota ───────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const habla = a(0.203), dirige = a(0.332), primera = a(0.469);
  const rebote = 0.12 + 0.88 * tramo(t, primera - 0.1, primera + 0.4) * (1 - 0.6 * tramo(t, primera + 0.9, P2));
  const g = T.mansion(R, t, { encuadre: 'fachada', luz: 'dia', anyo: 1993, rebote });
  // el tentáculo morado saluda desde el rellano
  const [, , px1, py1] = g.puerta;
  T.tentaculo(R, px1 + 9, py1, t, { color: 'morado', brazos: tramo(t, 1.8, 2.4), pose: t > 2.4 ? 'saluda' : 'normal', expresion: t > primera ? 'malvado' : 'feliz', dir: -1 });
  // los dos directores suben por el camino con el guion
  const anda = tramo(t, 1.4, habla), x1 = Math.round(lerp(-20, 128, anda)), x2 = Math.round(lerp(-44, 152, anda));
  const salto = t > primera && t < primera + 0.45 ? Math.round(Math.sin((t - primera) / 0.45 * Math.PI) * 5) : 0;
  const levanta = tramo(t, dirige - 0.1, dirige + 0.3) * (1 - tramo(t, primera - 0.3, primera));
  const hablan = t > habla && t < primera;
  const r1 = R.actor(EL.disenador, x1, 170, t, { dir: hablan && !levanta ? 1 : 1, anda: anda > 0 && anda < 1, salto, sonrisa: t > primera || levanta > 0, habla: hablan && Math.sin(t * 9) > 0 && t < dirige,
    sostiene: levanta > 0 ? [x1 + 18, Math.round(lerp(152, 132, levanta))] : true });
  R.actor(EL.disenador2, x2, 170, t, { dir: hablan || salto ? -1 : 1, anda: anda > 0 && anda < 1, salto, sonrisa: t > dirige, habla: hablan && Math.sin(t * 9 + 2) > 0 && t > dirige - 0.4, dedo: t > dirige + 0.2 && t < primera - 0.2 });
  // el guion: unas hojas grapadas con renglones sin letras
  const [gx, gy] = r1.mano; R.rect(gx - 4, gy - 9, gx + 5, gy + 2, K); R.rect(gx - 3, gy - 8, gx + 4, gy + 1, hex('#f6f2e6')); R.rect(gx - 3, gy - 8, gx + 4, gy - 7, hex('#c84a3a'));
  for (let k = 0; k < 4; k++) R.rect(gx - 2, gy - 5 + k * 2, gx + (k % 2 ? 1 : 3), gy - 5 + k * 2, hex('#8a8a9a'));
  if (levanta > 0.5 && Math.floor(t * 6) % 2) for (const [ox, oy] of [[-7, -10], [8, -11], [0, -14]]) R.pset(gx + ox, gy + oy, hex('#fff0a0'));
  // en «first time», chocan las manos: un destello entre los dos
  if (t > primera + 0.1 && t < primera + 0.5) { const cx = (x1 + x2 + 14) >> 1, cy = 136 - salto; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r = 3 + (t - primera) * 20; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex('#fff0a0')); } }
};
// ── plano 2: el pasillo: el morado sale y los amigos le plantan cara ───────────────────────────────────────────
const p2 = (t) => {
  T.mansion(R, t, { encuadre: 'pasillo', luz: 'dia', anyo: 1993 });
  const sale = a(0.66), pose = b(-0.2), stop = b(0.012), purple = b(0.059);
  const cruza = tramo(t, sale, a(0.8)), tx = Math.round(lerp(34, 140, cruza)), sorp = t > purple + 0.1;
  if (t > sale - 0.2) {
    const brilla = 1 - tramo(t, sale + 0.6, sale + 1.6);
    if (t < sale + 0.3) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r = 6 + (t - sale + 0.2) * 40; R.pset(Math.round(34 + Math.cos(an) * r), Math.round(130 + Math.sin(an) * r), hex('#b8f070')); }
    T.tentaculo(R, tx, 160, t, { color: 'morado', brazos: 1, brillo: brilla, anda: cruza > 0 && cruza < 1, pose: t > a(0.82) && t < stop ? 'arriba' : 'normal', expresion: sorp ? 'sorpresa' : 'malvado', habla: t > a(0.82) && t < a(0.97), dir: sorp ? 1 : 1 });
  }
  // los tres amigos entran por la derecha y se plantan
  const entra = tramo(t, a(0.8), pose + 0.3);
  [[EL.roquero, 196, 0], [EL.empollon, 218, 1], [EL.chicaRara, 240, 2]].forEach(([d, x0, k]) => { const x = Math.round(lerp(330 + k * 22, x0, entra));
    R.actor(d, x, 160, t, { dir: -1, anda: entra > 0 && entra < 1, enfado: t > stop, dedo: k === 1 && t > stop && t < P3 - 0.2, sorpresa: t < stop && entra >= 1 && k !== 1, habla: k === 1 && t > stop && Math.sin(t * 9) > 0 }); });
  if (t > stop && t < P3) R.bocadillo(232, 124, { icono: '!' });
};
// ── plano 3: el jardín: se meten en los retretes y salen disparados ────────────────────────────────────────────
const RT = [[118, 'azul', EL.roquero], [162, 'verde', EL.empollon], [206, 'rojo', EL.chicaRara]];
const p3 = (t) => {
  T.epocas(R, t, { encuadre: 'presente', camara: 'cerca', retretes: false });
  const llegan = tramo(t, P3, P3 + 0.55), abre = tramo(t, P3 + 0.45, P3 + 0.75), dentro = P3 + 0.95, cierra = tramo(t, b(0.33), b(0.36));
  const viajes = [b(0.36), b(0.385), b(0.41)];
  // el morado llega a saltitos por la izquierda y se cuela en el retrete azul
  const cuela = tramo(t, P3 + 0.5, b(0.32)), mx = Math.round(lerp(-20, 121, cuela)), mDentro = cuela >= 1;
  RT.forEach(([cx, color, d], i) => {
    const puerta = Math.min(abre, 1 - cierra), v = tramo(t, viajes[i], viajes[i] + 1.6);
    const o = { color, puerta, viaje: v > 0 ? v : undefined };
    const r = T.retrete(R, cx, 150, t, { ...o, capa: 'fondo' });
    if (t > dentro && puerta > 0.05) { R.actor(d, cx - 7 - (i === 0 && mDentro ? 2 : 0), 149, t, { dir: 1, sorpresa: i === 0 && mDentro, sonrisa: i !== 0 }); if (i === 0 && mDentro) T.tentaculo(R, cx + 3, 149, t, { color: 'morado', expresion: 'malvado', dir: -1 }); }
    T.retrete(R, cx, 150, t, { ...o, capa: 'frente' });
    // los que aún no han entrado corren hasta su puerta y saltan dentro
    if (t <= dentro) { const sx = Math.round(lerp(-30 - i * 24, cx - 7, llegan)), salto = t > dentro - 0.25 ? Math.round(Math.sin((t - dentro + 0.25) / 0.25 * Math.PI) * 6) : 0;
      R.actor(d, sx, t > dentro - 0.12 ? 150 : 166, t, { dir: 1, anda: llegan > 0 && llegan < 1, salto, sonrisa: true }); }
  });
  if (!mDentro && cuela > 0) { const sj = tramo(t, b(0.32) - 0.3, b(0.32)); T.tentaculo(R, mx, Math.round(lerp(168, 149, sj)), t, { color: 'morado', brazos: 1, expresion: 'malvado', anda: sj === 0, salto: Math.round(Math.sin(sj * Math.PI) * 10), dir: 1 }); }
  // un balón rojo rueda por el césped hacia el aspersor
  const bl = tramo(t, P3, P4); { const bx = Math.round(lerp(40, 250, bl)), by = 172 - Math.round(Math.abs(Math.sin(bl * 9)) * 4 * (1 - bl)); R.disco(bx, by, 4, K); R.disco(bx, by, 3.2, hex('#d83a3a')); R.rect(bx - 3, by, bx + 3, by, hex('#f2eee2')); R.pset(bx - 1, by - 2, hex('#ff9a8a')); }
};
// ── plano 4: las tres épocas: un retrete llega a cada una ──────────────────────────────────────────────────────
const p4 = (t) => {
  const g = T.epocas(R, t, { encuadre: 'triple' });
  const llegadas = [b(0.639), b(0.786), b(0.9)], quien = [EL.roquero, EL.empollon, EL.chicaRara], col = ['azul', 'verde', 'rojo'];
  g.franjas.forEach((f, i) => {
    const t0 = llegadas[i] - 0.35, cx = f.x1 - 26, llega = tramo(t, t0, t0 + 0.55), abre = tramo(t, t0 + 0.65, t0 + 0.9), sal = tramo(t, t0 + 0.85, t0 + 1.4);
    if (t < t0) return;
    T.retrete(R, cx, 150, t, { color: col[i], llega, puerta: abre });
    R.recorte([f.x0, f.y0, f.x1, f.y1]);
    if (abre > 0.6) { const x = Math.round(lerp(cx - 7, f.x0 + 14, sal));
      R.actor(quien[i], x, 150, t, { dir: -1, anda: sal > 0 && sal < 1, sorpresa: sal >= 1 && i !== 1, sonrisa: i === 1 && sal >= 1, dedo: i === 1 && sal >= 1 && t > t0 + 1.6, salto: sal > 0 && sal < 0.25 ? 2 : 0 }); }
    // en 1793, el morado asoma por la puerta del retrete
    if (i === 0 && t > b(0.93)) T.tentaculo(R, cx + 1, 150, t, { color: 'morado', brazos: 1, expresion: 'malvado', dir: -1, salto: Math.round(tramo(t, b(0.93), b(0.97)) * 3) });
    R.recorte(null);
  });
};
const efectos = [[a(0.47), 'palmada'], [a(0.5), 'boing'], [a(0.66), 'puerta'], [a(0.83), 'boing'], [b(0.02), 'golpecito'], [P3 + 0.5, 'puerta'], [b(0.34), 'cerrojo'], [b(0.37), 'zumbido'], [b(0.47), 'flash'], [b(0.639), 'flash'], [b(0.786), 'flash'], [b(0.9), 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1993', efectos, año: 1993 });
''')
