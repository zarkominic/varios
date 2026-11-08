E = {}

# ── piezas comunes a las dos escenas (cielo tramado, nubes de tres tonos, pájaros, el perfil de Praga y el de Roma) ──
COMUN = r'''
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const by = (x, y) => (BY[((y & 3) << 2) + (x & 3)] + 0.5) / 16;
const cl = (v) => Math.max(0, Math.min(1, v));
const K = hex('#16121c');
const H = (...l) => l.map(hex);
// un fondo fijo se pinta una vez en su búfer y se copia en cada fotograma
const capas = {};
const capa = (k, f) => { let b = capas[k]; if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); capas[k] = b; } R.copiar(b); };
// un rectángulo que respeta R.recorte (R.rect no lo respeta)
const caja = (x0, y0, x1, y1, c) => R.poligono([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]], c);
// degradado vertical tramado entre varios colores (con un poco de grano)
const degr = (x0, y0, x1, y1, cols, ruido = 0.25) => { const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.max(0, Math.min(n - 0.001, (y - y0) / Math.max(1, y1 - y0) * n + (hh(x >> 3, y >> 2, 7) - 0.5) * ruido)), i = Math.floor(f); R.pset(x, y, f - i > by(x, y) ? cols[i + 1] : cols[i]); } };
// nube de tres tonos (c = [sombra, cuerpo, luz])
const NUBE = [[-1.6, 0.5, 0.72], [-0.7, -0.2, 1.0], [0.4, -0.45, 1.15], [1.5, 0.35, 0.82], [2.3, 0.7, 0.5]];
const nube = (cx, cy, w, c) => { const r = w / 5.5;
  for (const [dx, dy, k] of NUBE) R.disco(cx + dx * r, cy + dy * r + 1.6, r * k, c[0]);
  for (const [dx, dy, k] of NUBE) R.disco(cx + dx * r, cy + dy * r, r * k, c[1]);
  for (const [dx, dy, k] of NUBE) R.disco(cx + dx * r - r * 0.3, cy + dy * r - r * 0.4, r * k * 0.55, c[2]); };
// pinta f() en un búfer de borrador con el origen en (8, 8) y lo copia al doble de tamaño con su esquina en (X, Y)
const BORR = R.nuevo();
const doble = (f, X, Y, w, h) => { BORR.fill(0); const prev = R.usar(BORR); f(8, 8); R.usar(prev);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const c = BORR[(j + 8) * 320 + i + 8]; if (c) R.rect(X + i * 2, Y + j * 2, X + i * 2 + 1, Y + j * 2 + 1, c); } };
const nubes = (t, lista, c) => { for (const [x0, y, w, v] of lista) { const L = 320 + 3 * w, x = (((x0 + t * v) % L) + L) % L - 1.5 * w; nube(x, y, w, c); } };
// pájaros que cruzan aleteando
const pajaros = (t, n, y0, v, c, k = 0) => { for (let i = 0; i < n; i++) { const L = 380, x = Math.round((((i * 83 + k * 37 + t * v * (0.8 + 0.4 * hh(i, k))) % L) + L) % L - 30), y = Math.round(y0 + Math.sin(t * 1.3 + i * 2) * 2 + hh(i, k, 3) * 12), a = Math.sin(t * 11 + i * 1.7) > 0;
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y + (a ? -2 : 1), c); R.pset(x + 2, y + (a ? -2 : 1), c); } };
// el perfil de Praga: la loma del castillo con el palacio largo y la catedral de agujas, San Nicolás y los tejados de abajo
const praga = (x0, base, s, P) => {
  const X = (v) => x0 + v * s, Y = (v) => base - v * s, w1 = Math.max(1, s * 1.6);
  R.poligono([[X(-40), base + 1], [X(-8), Y(18)], [X(28), Y(27)], [X(152), Y(28)], [X(200), Y(15)], [X(250), base + 1]], P.monte);
  for (let i = 0; i < 34; i++) { const a = -30 + i * 8.2; R.disco(X(a), Y(8 + hh(i, 3) * 12), Math.max(1.3, 3.6 * s), hh(i, 4) > 0.5 ? P.arbol : P.monte); }
  R.poligono([[X(23), Y(46)], [X(28), Y(52)], [X(146), Y(52)], [X(151), Y(46)]], P.techo);
  caja(X(25), Y(46), X(149), Y(27), P.muro);
  for (let f = 0; f < 3; f++) for (let c = 0; c < 20; c++) { const wx = X(29 + c * 6), wy = Y(43 - f * 6); const on = hh(c, f, 9) > 0.66; caja(wx, wy, wx + w1 - 1, wy + Math.max(1, 2.4 * s) - 1, on ? P.ventana : P.vent0); }
  caja(X(64), Y(64), X(124), Y(46), P.muro2);
  R.poligono([[X(62), Y(64)], [X(94), Y(80)], [X(126), Y(64)]], P.techo2);
  const aguja = (cx, y0, alto, w) => { R.poligono([[cx - w, Y(y0)], [cx, Y(y0 + alto)], [cx + w, Y(y0)]], P.aguja); for (let k = 1; k < 5; k++) { const yy = Y(y0 + alto * k / 6), ww = w * (1 - k / 6) + 1; R.pset(cx - ww, yy, P.aguja); R.pset(cx + ww, yy, P.aguja); } };
  caja(X(68), Y(86), X(79), Y(64), P.muro2); caja(X(83), Y(86), X(94), Y(64), P.muro2);
  aguja(X(73.5), 86, 30, 5.5 * s); aguja(X(88.5), 86, 30, 5.5 * s);
  R.disco(X(89), Y(74), Math.max(1, 2.5 * s), P.ventana);
  caja(X(102), Y(94), X(116), Y(64), P.muro2);
  R.disco(X(109), Y(97), 6.5 * s, P.cupula); caja(X(107.5), Y(108), X(110.5), Y(97), P.cupula); R.disco(X(109), Y(108), 2.2 * s, P.cupula); caja(X(108.6), Y(116), X(109.4), Y(108), P.aguja);
  for (let k = 0; k < 3; k++) caja(X(104 + k * 4), Y(88), X(105 + k * 4), Y(80), P.vent0);
  caja(X(132), Y(70), X(140), Y(46), P.muro2); R.poligono([[X(131), Y(70)], [X(136), Y(84)], [X(141), Y(70)]], P.techo);
  caja(X(168), Y(34), X(186), Y(8), P.muro2); R.disco(X(177), Y(36), 9 * s, P.cupula); caja(X(176), Y(52), X(178), Y(44), P.cupula); R.disco(X(177), Y(53), 1.8 * s, P.cupula);
  caja(X(192), Y(52), X(199), Y(10), P.muro2); R.disco(X(195.5), Y(54), 4 * s, P.cupula); caja(X(195), Y(64), X(196), Y(56), P.aguja);
  for (let i = 0; i < 26; i++) { const a = -34 + i * 11, w = 5 + hh(i, 5) * 4, ht = 5 + hh(i, 6) * 6;
    caja(X(a - w + 1), Y(5 + ht * 0.4), X(a + w - 1), base, P.muro);
    R.poligono([[X(a - w), Y(5 + ht * 0.4)], [X(a), Y(5 + ht * 0.4 + w * 0.9)], [X(a + w), Y(5 + ht * 0.4)]], hh(i, 7) > 0.5 ? P.techo : P.techo2);
    if (hh(i, 8) > 0.45) caja(X(a - 1), Y(4 + ht * 0.3), X(a - 1) + w1 - 1, Y(4 + ht * 0.3) + Math.max(1, 2 * s) - 1, P.ventana); }
};
// el perfil de Roma: la cúpula grande, campanarios, tejados, pinos de copa y cipreses
const roma = (x0, base, s, P) => {
  const X = (v) => x0 + v * s, Y = (v) => base - v * s;
  for (let i = 0; i < 22; i++) { const a = -10 + i * 10, w = 6 + hh(i, 21) * 4, ht = 8 + hh(i, 22) * 10;
    caja(X(a - w), Y(ht), X(a + w), base, hh(i, 23) > 0.5 ? P.muro : P.muro2);
    R.poligono([[X(a - w - 1), Y(ht)], [X(a), Y(ht + w * 0.45)], [X(a + w + 1), Y(ht)]], P.techo);
    for (let k = 0; k < 2; k++) caja(X(a - w + 2 + k * 5), Y(ht - 3), X(a - w + 3 + k * 5), Y(ht - 5), P.vent0); }
  R.disco(X(80), Y(44), 15 * s, P.cupula);
  for (let k = 0; k < 5; k++) { const cx = 80 + (k - 2) * 5.5, hgt = Math.sqrt(Math.max(0, 225 - (cx - 80) ** 2)); caja(X(cx), Y(44 + hgt - 1), X(cx) + Math.max(0, s - 1), Y(44), P.costilla); }
  R.disco(X(74), Y(52), 4 * s, P.luzCupula);
  caja(X(64), Y(44), X(96), Y(18), P.muro); caja(X(60), Y(46), X(100), Y(43), P.muro2);
  for (let k = 0; k < 6; k++) caja(X(66 + k * 5), Y(38), X(67 + k * 5), Y(30), P.vent0);
  caja(X(77), Y(66), X(83), Y(58), P.muro); R.poligono([[X(76), Y(66)], [X(80), Y(72)], [X(84), Y(66)]], P.cupula); caja(X(79.6), Y(76), X(80.4), Y(72), P.muro2);
  caja(X(130), Y(62), X(140), Y(10), P.muro); R.poligono([[X(129), Y(62)], [X(135), Y(70)], [X(141), Y(62)]], P.techo);
  for (let k = 0; k < 3; k++) { caja(X(132), Y(56 - k * 12), X(133), Y(52 - k * 12), P.vent0); caja(X(137), Y(56 - k * 12), X(138), Y(52 - k * 12), P.vent0); }
  const pino = (px, ht, ww) => { caja(X(px), Y(ht), X(px + 1.4), base, P.tronco); R.linea(X(px), Y(ht - 4), X(px - ww * 0.4), Y(ht), P.tronco); R.linea(X(px + 1), Y(ht - 3), X(px + ww * 0.45), Y(ht), P.tronco);
    for (const [dx, dy, r] of [[-0.6, 1, 0.42], [-0.15, 3, 0.5], [0.35, 2, 0.45], [0.7, 0.5, 0.35]]) R.disco(X(px + dx * ww), Y(ht + dy), r * ww * s * 0.8, P.pino);
    for (const [dx, dy, r] of [[-0.4, 3.5, 0.28], [0.15, 5, 0.32], [0.5, 3.5, 0.24]]) R.disco(X(px + dx * ww), Y(ht + dy), r * ww * s * 0.8, P.pinoL);
    caja(X(px - ww), Y(ht - 0.5), X(px + ww), Y(ht - 1.5), P.pino); };
  pino(18, 34, 14); pino(112, 30, 12); pino(170, 38, 15);
  const cipres = (px, ht) => R.poligono([[X(px - 3), base], [X(px - 2.5), Y(ht * 0.6)], [X(px), Y(ht)], [X(px + 2.5), Y(ht * 0.6)], [X(px + 3), base]], P.cipres);
  cipres(46, 36); cipres(152, 30); cipres(188, 28);
};
'''

E['vm-marci'] = ('Marci', '''// VM-MARCI (frase 7), Praga y Roma, 1665, cartela «1665». Cinco planos:
// 1. (fondo local) el estudio de Marci en Praga de noche: escribe la carta a la luz de la vela y en «letter» la levanta
//    y la lee sonriendo; la luna y Praga por la ventana emplomada, el gato del alféizar, la lechuza del armario, el reloj;
// 2. (fondo local, inserto) su mesa de cerca: firma («Marci»), dobla la carta, deja caer el lacre y la sella en «Prague»;
//    en «send the book» la arrima al libro y la ata con el cordón rojo;
// 3. (fondo local) el viaje: el correo galopa con el libro y la carta de los Alpes a la campiña de Roma; en «Rome»
//    aparece la cúpula y suenan las campanas;
// 4. pragua/colegio: Kircher toca los jeroglíficos del obelisco (brillan en «hieroglyphs»); entra el correo con el paquete;
//    en «letter» Kircher coge la carta, rompe el lacre y la lee; el ayudante copia detrás del escritorio;
// 5. pragua/colegio/carta: la carta se abre, el dedo recorre un renglón y sale el recuerdo: la corona (Rodolfo II), en
//    «paid» el «600» que cuenta, la bolsa de monedas que llueven de oro sobre la mesa y en «book» el libro.''', COMUN + r'''
const m = (f) => en('marci', f);
// cortes: «Johannes» · «Athanasius» · «decipher» · «that Emperor»
const P2 = m(0.1785), P3 = m(0.3677), P4 = m(0.5776), P5 = m(0.8058);
const C = {};
Object.entries({ papel: '#f2ead2', papelS: '#c8bc9c', papelL: '#fffaea', tinta: '#2a2234', lacre: '#c0282a', lacreL: '#f05a4a', lacreS: '#7a1418',
  laton: '#c89a3a', latonL: '#f0d070', latonS: '#7a5a20', llama: '#ffe890', llamaN: '#ff9a2a', llamaR: '#e8502a', vela: '#f4ecd8', velaS: '#c8bca0',
  cordon: '#d03030', oro: '#f0c040', oroL: '#fff0a0', oroS: '#a87018', manga: '#24202c', sotana: '#1e1a24', libreaR: '#2e4a8a' }).forEach(([k, v]) => { C[k] = hex(v); });
const PW = H('#211820', '#352628', '#4e3a34', '#6a503e', '#8a6a4c', '#a8865c');   // el yeso, de la penumbra a la luz de la vela
const PM = H('#170e0c', '#2a1a12', '#432a1a', '#603c22', '#7e522c', '#9a6a38');   // nogal
const tonoDe = (luz) => (pal, x, y, d = 0) => pal[Math.max(0, Math.min(pal.length - 1, Math.floor(luz(x, y) * (pal.length - 0.01) + by(x, y) - 0.5 + d)))];
const PNOCHE = { monte: hex('#0a0c1e'), arbol: hex('#0e1428'), muro: hex('#1c2038'), muro2: hex('#232846'), techo: hex('#141830'), techo2: hex('#1a1a34'), ventana: hex('#f0c060'), vent0: hex('#121830'), cupula: hex('#2a4450'), aguja: hex('#1e2240') };
const llama = (x, y, t, k = 1) => { const f = Math.sin(t * 23) * 0.5 + Math.sin(t * 37 + 1) * 0.5, a = Math.round(f * k);
  R.disco(x + a * 0.5, y - 2 * k, 2.2 * k, C.llamaR); R.disco(x + a * 0.5, y - 2.4 * k, 1.7 * k, C.llamaN); R.disco(x + a * 0.3, y - 2.2 * k, 1 * k, C.llama);
  R.pset(x + a, y - 4.6 * k, C.llamaN); R.pset(x + a, y - 5.4 * k, C.llama); };
const pluma = (x, y) => T.PIEZAS_VM.pluma(R, x, y);

// ── 1 · el estudio de Marci (fondo local) ──
const luz1 = (x, y) => cl(1.12 - Math.hypot(x - 206, (y - 116) * 1.25) / 205);
const t1 = tonoDe(luz1);
const VCX = 47, VCY = 41, VR = 23, VX0 = 24, VX1 = 70, VY1 = 96;
const enVentana = (x, y) => x >= VX0 && x <= VX1 && y <= VY1 && (y >= VCY || Math.hypot(x - VCX, y - VCY) <= VR);
const estudioFondo = () => {
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) { let d = (hh(x >> 4, y, 1) - 0.5) * 0.4 - 1.1;
    if (y >= 13) d = y === 13 ? -0.1 : y === 17 ? -1.6 : -0.6 + (hh(x >> 2, y, 2) - 0.5) * 0.7; else if (x % 34 < 4) d = x % 34 === 0 ? -1.6 : -0.5;
    R.pset(x, y, t1(PM, x, y + 40, d)); }
  for (let y = 18; y < 108; y++) for (let x = 0; x < 320; x++) R.pset(x, y, t1(PW, x, y, (hh(x >> 2, y >> 2, 3) - 0.5) * 0.8 + (hh(x, y, 4) > 0.94 ? -0.7 : 0)));
  for (const [x, y, n] of [[104, 90, 10], [186, 22, 8], [256, 92, 9], [8, 66, 9], [150, 84, 6]]) { let px = x; for (let i = 0; i < n; i++) { R.pset(px, y + i, t1(PW, px, y + i, -1.4)); if (hh(i, x) > 0.6) px++; else if (hh(i, x) < 0.25) px--; } }
  for (let y = 108; y < 124; y++) for (let x = 0; x < 320; x++) { const fx = x % 40, borde = y === 108 || y === 123 || fx === 0, marco = fx < 4 || fx > 36 || y < 111 || y > 120;
    R.pset(x, y, t1(PM, x, y, borde ? -1.5 : marco ? 0.2 : -0.5 + (hh(x >> 1, y >> 3, 5) - 0.5) * 0.6 + (fx === 4 || y === 111 ? -0.8 : 0))); }
  for (let y = 124; y < 180; y++) { const k = (y - 124) / 56; for (let x = 0; x < 320; x++) { const u = (x - 170) / (0.5 + k * 0.6), tb = Math.floor(u / 17), fu = ((u % 17) + 17) % 17;
    R.pset(x, y, t1(PM, x, y - 12, fu < 1 ? -1.6 : -0.3 + (hh(tb, Math.floor((y - 124) / 3), 6) - 0.5) * 0.5 + (hh(tb, 9) - 0.5) * 0.6 + (hh(Math.floor(u), y, 2) > 0.92 ? -0.6 : 0))); } }
  // la alfombra roja con su cenefa de oro
  const AL = H('#3a0e12', '#5a161a', '#7a2024', '#9a2e2a'), OR = H('#6a4a18', '#a87c2a', '#d0a040');
  for (let y = 154; y <= 177; y++) { const a = Math.round(44 - (y - 154) * 0.7), b = Math.round(262 + (y - 154) * 0.7);
    for (let x = a; x <= b; x++) { const dx = Math.min(x - a, b - x), dy = Math.min(y - 154, 177 - y), ff = dx < 1 || dy < 1, cen = dx < 5 || dy < 3;
      const mot = ((Math.floor((x - a) / 7) + Math.floor((y - 154) / 4)) % 3 === 0) && (x + y) % 2 === 0;
      R.pset(x, y, ff ? K : cen ? t1(OR, x, y - 30, (x + y) % 3 === 0 ? -1 : 0) : mot ? t1(OR, x, y - 30, -0.6) : t1(AL, x, y - 30, (hh(x >> 1, y, 3) - 0.5) * 0.6)); } }
  // la ventana emplomada: la noche, la luna, Praga, el emplomado y el parteluz
  for (let y = 14; y <= VY1 + 4; y++) for (let x = VX0 - 4; x <= VX1 + 4; x++) { const ex = x <= VX1 + 3 && x >= VX0 - 3 && (y >= VCY || Math.hypot(x - VCX, y - VCY) <= VR + 3); if (ex && !enVentana(x, y)) R.pset(x, y, t1(PM, x, y, Math.hypot(x - VCX, y - VCY) > VR + 2 || x < VX0 - 2 ? -1 : 0.6)); }
  const NO = H('#0a0e26', '#141c44', '#222c5e', '#2e3a6e');
  for (let y = 18; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) if (enVentana(x, y)) { const f = (y - 18) / 78 * 3; R.pset(x, y, NO[Math.min(3, Math.floor(f + by(x, y) - 0.3))]); }
  for (let i = 0; i < 16; i++) { const x = VX0 + Math.floor(hh(i, 1, 11) * 46), y = 20 + Math.floor(hh(i, 2, 11) * 40); if (enVentana(x, y)) R.pset(x, y, hex(i % 3 ? '#c8d0f0' : '#ffffff')); }
  R.disco(37, 34, 5.5, hex('#e8e0c0')); R.disco(36, 33, 4, hex('#f8f2dc')); R.pset(38, 35, hex('#c8c0a0')); R.pset(35, 36, hex('#d0c8a8'));
  R.recorte([VX0, 50, VX1, VY1]); praga(VX0 - 4, VY1, 0.28, PNOCHE); R.recorte(null);
  for (let y = 18; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) if (enVentana(x, y) && ((x + y) % 7 === 0 || (x - y + 700) % 7 === 0)) R.pset(x, y, hex('#3a3a46'));
  for (let y = 18; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) if (enVentana(x, y) && (Math.abs(x - VCX) <= 1 || y === 62 || y === 63)) R.pset(x, y, t1(PM, x, y, x === VCX - 1 || y === 62 ? 0.6 : -0.4));
  for (let y = VY1 + 1; y <= VY1 + 5; y++) for (let x = VX0 - 7; x <= VX1 + 7; x++) R.pset(x, y, y === VY1 + 1 ? hex('#8a7a6a') : y === VY1 + 5 ? K : t1(H('#3a3230', '#5a4e46', '#6e6256'), x, y, (hh(x, y) - 0.5) * 0.5));
  // la maceta de romero del alféizar
  caja(28, 90, 35, 96, hex('#8a4a2a')); caja(27, 89, 36, 90, hex('#a85a32')); for (let i = 0; i < 9; i++) R.linea(31, 89, 27 + i, 80 + (i % 3) * 2, hex(i % 2 ? '#3a6a3a' : '#2a4a2a'));
  // el mapa de la pared (sin letras: costas, ríos, una rosa y un camino de puntos)
  caja(89, 25, 147, 69, K); for (let y = 26; y <= 68; y++) for (let x = 90; x <= 146; x++) R.pset(x, y, t1(PM, x, y, (x === 90 || y === 26) ? 0.8 : -0.2));
  for (let y = 29; y <= 65; y++) for (let x = 93; x <= 143; x++) { const mar = (x - 93) * 0.6 + Math.sin(y * 0.4) * 4 + Math.sin(y * 0.13 + 2) * 6 < 9 || y > 58 + Math.sin(x * 0.3) * 2; R.pset(x, y, t1(mar ? H('#3a4a46', '#56685e', '#7a8a76', '#98a88a') : H('#5a4a34', '#8a7450', '#b09a6a', '#c8b484'), x, y, (hh(x >> 1, y >> 1, 12) - 0.5) * 0.7)); }
  for (let y = 30; y <= 64; y++) { const x = Math.round(93 + 15 - Math.sin(y * 0.4) * 6.6 - Math.sin(y * 0.13 + 2) * 10); R.pset(x, y, hex('#3a2a1a')); }
  R.linea(118, 34, 124, 48, hex('#3a5a6a')); R.linea(124, 48, 121, 56, hex('#3a5a6a')); R.linea(132, 31, 134, 44, hex('#3a5a6a'));
  for (let k = 0; k < 8; k++) R.pset(127 + Math.round(Math.sin(k) * 2) - k, 36 + k * 3, hex('#a02a20'));
  R.disco(127, 36, 1.6, hex('#a02a20')); R.disco(120, 58, 1.6, hex('#a02a20'));
  R.linea(100, 62, 100, 54, hex('#3a2a1a')); R.linea(96, 58, 104, 58, hex('#3a2a1a')); R.pset(100, 53, hex('#a02a20'));
  // la balda con frascos y el mortero bajo el mapa
  caja(88, 76, 152, 79, t1(PM, 120, 76, 0.6)); caja(88, 80, 152, 80, K); for (const [x, c, hgt] of [[93, '#2a6a4a', 9], [101, '#8a5a1a', 7], [109, '#3a4a8a', 11], [117, '#6a2a4a', 6]]) { caja(x, 75 - hgt, x + 5, 75, hex(c)); caja(x + 2, 73 - hgt, x + 3, 75 - hgt, hex(c)); R.pset(x + 1, 74 - hgt + 3, hex('#e8f0f0')); }
  caja(128, 70, 140, 75, hex('#8a6a3a')); caja(129, 69, 139, 70, hex('#b08a4a')); R.linea(136, 69, 142, 62, hex('#6a4a2a'));
  // el reloj de péndulo de pared (la esfera; el péndulo se mueve)
  R.disco(168, 37, 8, K); R.disco(168, 37, 7, t1(PM, 168, 37, 0.8)); R.disco(168, 37, 5, hex('#e8dcc0')); for (let k = 0; k < 12; k++) R.pset(168 + Math.round(Math.cos(k * 0.52) * 4), 37 + Math.round(Math.sin(k * 0.52) * 4), K);
  caja(161, 45, 175, 66, K); caja(162, 46, 174, 65, t1(PM, 168, 50, 0.6)); caja(164, 48, 172, 63, hex('#1a1414'));
  // el armario de boticario: libros, albarelos azules, el astrolabio, el reloj de arena, frascos de color y cajones
  caja(207, 16, 275, 119, K); for (let y = 17; y <= 118; y++) for (let x = 208; x <= 274; x++) R.pset(x, y, t1(PM, x, y, (hh(x >> 1, y >> 3, 13) - 0.5) * 0.6 + (x === 208 || y === 17 ? 0.8 : 0)));
  caja(205, 14, 277, 18, t1(PM, 240, 16, 0.9)); caja(205, 19, 277, 19, K);
  const tablas = [22, 44, 66, 88];
  for (const y0 of tablas) { caja(212, y0, 270, y0 + 19, hex('#120c0a')); caja(212, y0 + 19, 270, y0 + 21, t1(PM, 240, y0 + 20, 0.7)); }
  { let x = 213; let i = 0; while (x < 266) { const w = 3 + Math.floor(hh(i, 1, 14) * 3), hg = 13 + Math.floor(hh(i, 2, 14) * 5), cs = ['#6a1e1e', '#2a3a6a', '#4a5a2a', '#7a4a1a', '#3a2a2a', '#8a6a3a'][i % 6];
    caja(x, 41 - hg, x + w - 1, 40, t1(H('#100808', cs, cs), x, 30)); R.linea(x, 41 - hg + 3, x + w - 1, 41 - hg + 3, hex('#c8a040')); R.linea(x, 37, x + w - 1, 37, hex('#c8a040')); R.pset(x + w - 1, 41 - hg + 1, K); x += w + (hh(i, 3) > 0.8 ? 3 : 0); i++; } }
  for (let k = 0; k < 5; k++) { const x = 215 + k * 11; caja(x, 50, x + 8, 63, hex('#d8d4c8')); caja(x + 1, 48, x + 7, 50, hex('#3a4a8a')); R.linea(x, 55, x + 8, 55, hex('#2a4aa8')); R.linea(x, 58, x + 8, 58, hex('#2a4aa8')); caja(x + 2, 56, x + 6, 57, hex('#4a6ac8')); R.pset(x + 1, 51, hex('#ffffff')); caja(x, 63, x + 8, 63, K); }
  for (let k = 0; k < 3; k++) { caja(214, 84 - k * 4, 230, 87 - k * 4, hex(['#5a2a1a', '#2a3a5a', '#6a5a2a'][k])); R.linea(214, 84 - k * 4, 230, 84 - k * 4, hex('#c8a040')); }
  R.disco(246, 77, 7, C.latonS); R.disco(246, 77, 6, C.laton); R.disco(246, 77, 4, hex('#3a2a1a')); R.linea(242, 77, 250, 77, C.latonL); R.linea(246, 73, 246, 81, C.latonL); R.disco(246, 69, 1.5, C.laton);
  caja(258, 72, 266, 73, C.latonS); caja(258, 86, 266, 87, C.latonS); R.linea(259, 74, 262, 79, hex('#d8e8f0')); R.linea(265, 74, 263, 79, hex('#d8e8f0')); R.linea(262, 80, 259, 85, hex('#d8e8f0')); R.linea(263, 80, 265, 85, hex('#d8e8f0'));
  for (let k = 0; k < 6; k++) { const x = 214 + k * 9, c = ['#2a7a4a', '#a87a1a', '#3a5ab0', '#8a2a4a', '#4a8a8a', '#7a4ab0'][k], hgt = 8 + (k % 3) * 3; caja(x, 107 - hgt, x + 6, 107, hex(c)); caja(x + 2, 104 - hgt, x + 4, 107 - hgt, hex(c)); R.pset(x + 1, 109 - hgt, hex('#f0f8ff')); R.pset(x + 2, 103 - hgt, hex('#c8a060')); }
  caja(209, 111, 273, 118, t1(PM, 240, 114, 0.3)); for (const x of [222, 240, 258]) { caja(x - 6, 112, x + 6, 117, K); caja(x - 5, 113, x + 5, 116, t1(PM, x, 114, 0.6)); R.pset(x, 114, C.latonL); }
  for (let k = 0; k < 4; k++) { const x = 216 + k * 15; R.linea(x, 20, x, 24, hex('#4a3a20')); R.disco(x, 27, 2.5, hex(k % 2 ? '#4a6a2a' : '#6a7a3a')); R.pset(x - 1, 30, hex('#3a5a2a')); R.pset(x + 1, 31, hex('#3a5a2a')); }
  // el perchero con la capa negra y el sombrero
  caja(296, 66, 298, 156, t1(PM, 297, 100, 0.3)); caja(290, 154, 304, 157, K); caja(291, 66, 303, 68, t1(PM, 297, 66, 0.4));
  R.poligono([[288, 72], [306, 72], [310, 124], [284, 124]], hex('#1a1620')); R.linea(290, 76, 288, 122, hex('#2e2836')); R.linea(300, 78, 304, 122, hex('#2e2836')); caja(288, 72, 306, 73, hex('#2e2836'));
  R.poligono([[286, 66], [308, 66], [303, 62], [291, 62]], hex('#1a1620')); caja(291, 56, 303, 62, hex('#1a1620')); R.linea(291, 61, 303, 61, hex('#5a2a2a'));
  // el maletín de médico en el suelo
  R.poligono([[252, 147], [276, 147], [279, 162], [249, 162]], hex('#4a2a14')); R.poligono([[254, 147], [274, 147], [272, 143], [256, 143]], hex('#6a3a1a')); R.linea(258, 141, 270, 141, hex('#3a2010')); R.pset(257, 142, hex('#3a2010')); R.pset(271, 142, hex('#3a2010')); caja(262, 149, 266, 151, C.laton); caja(248, 163, 280, 164, hex('#120a08'));
};
// el atril de escribir (Marci escribe de pie) y la mesita redonda con el libro y la vela
const atril = () => {
  const M1 = hex('#4a2e18'), M2 = hex('#7a4e2a'), M3 = hex('#a8743c'), M4 = hex('#e0a868');
  caja(159, 139, 166, 151, K); caja(160, 140, 165, 150, M2); caja(160, 140, 161, 150, M3); caja(165, 140, 165, 150, M1);
  caja(151, 150, 174, 153, K); caja(152, 150, 173, 152, M2); caja(152, 150, 173, 150, M3); caja(149, 154, 177, 155, hex('#120a08'));
  R.poligono([[144, 139], [182, 130], [184, 136], [146, 146]], K);
  R.poligono([[145, 140], [181, 131], [182, 134], [146, 143]], M3); R.linea(145, 140, 181, 131, M4);
  R.poligono([[146, 143], [182, 134], [183, 136], [146, 145]], M1); R.linea(146, 146, 183, 137, K);
};
const mesita = () => {
  const M1 = hex('#4a2e18'), M2 = hex('#7a4e2a'), M3 = hex('#a8743c'), M4 = hex('#e0a868');
  for (let y = 135; y <= 142; y++) for (let x = 185; x <= 231; x++) { const d = Math.hypot((x - 208) / 23, (y - 138.5) / 3.5); if (d <= 1) R.pset(x, y, d > 0.86 ? K : y < 137 ? M4 : (hh(x >> 2, y, 17) > 0.7 ? M2 : M3)); }
  caja(187, 141, 229, 143, M1); caja(186, 144, 230, 144, K);
  caja(204, 144, 211, 152, K); caja(205, 144, 210, 151, M2); caja(205, 144, 206, 151, M3); caja(197, 151, 219, 154, K); caja(198, 151, 218, 153, M2); caja(198, 151, 218, 151, M3); caja(195, 155, 221, 156, hex('#120a08'));
};
const p1 = (t) => {
  capa('estudio', estudioFondo);
  // las nubes que tapan la luna y las ventanas de Praga que se encienden y apagan, dentro del cristal
  R.recorte([VX0, 18, VX1, 60]); { const x = 14 + ((t * 4) % 70); for (const [dx, r] of [[0, 3.5], [5, 4.5], [10, 3]]) R.disco(x + dx, 36, r, hex('#3a4270')); for (const [dx, r] of [[0, 2.5], [5, 3.4], [10, 2]]) R.disco(x + dx - 1, 35, r, hex('#56608e')); } R.recorte(null);
  for (const [x, y, k] of [[34, 86, 0], [52, 84, 1], [60, 88, 2]]) R.pset(x, y, Math.sin(t * 0.9 + k * 2.3) > -0.2 ? hex('#ffd070') : PNOCHE.vent0);
  // el gato negro del alféizar (mueve la cola) y la lechuza del armario (parpadea y gira la cabeza)
  { const g = hex('#14101a'); R.disco(60, 92, 3.5, g); caja(57, 92, 63, 96, g); R.disco(60, 87, 2.6, g); R.pset(58, 84, g); R.pset(62, 84, g); R.pset(59, 87, hex('#c8d040')); R.pset(61, 87, hex('#c8d040'));
    const c = Math.sin(t * 2.2); R.linea(63, 95, 66, 94 - Math.round(c * 2), g); R.linea(66, 94 - Math.round(c * 2), 67 + Math.round(c), 90 - Math.round(c * 2), g); }
  { const ox = 240, oy = 12, gira = Math.sin(t * 0.7) > 0.6 ? 1 : 0, ojos = (t % 3.1) < 0.15; R.disco(ox, oy + 2, 4, hex('#6a4a2a')); R.disco(ox, oy - 3, 3.5, hex('#7a5a34')); R.pset(ox - 3, oy - 7, hex('#4a3020')); R.pset(ox + 3, oy - 7, hex('#4a3020'));
    for (const d of [-1.5, 1.5]) { R.disco(ox + d + gira, oy - 3, 1.4, ojos ? hex('#5a3a20') : hex('#f0d040')); if (!ojos) R.pset(ox + d + gira, oy - 3, K); } R.pset(ox + gira, oy - 1, hex('#e0a030')); R.linea(ox - 2, oy + 2, ox + 2, oy + 2, hex('#a07a4a')); R.pset(ox - 2, oy + 6, hex('#e0a030')); R.pset(ox + 2, oy + 6, hex('#e0a030')); }
  { const a = Math.sin(t * 3.1) * 3; R.linea(168, 46, 168 + Math.round(a), 59, C.latonL); R.disco(168 + a, 60, 2, C.laton); R.linea(168, 37, 168 + Math.round(Math.cos(t * 0.2) * 3), 37 - 3, K); R.linea(168, 37, 170, 39, K); }
  // la mesita con el libro cerrado y la vela (halo y polilla)
  mesita();
  T.PIEZAS_VM.libroVoynich(R, 196, 139); R.linea(189, 139, 203, 139, K);
  caja(214, 137, 222, 139, C.latonS); caja(213, 136, 223, 137, C.laton); caja(216, 124, 220, 136, C.vela); caja(220, 124, 220, 136, C.velaS); R.pset(216, 127, C.velaS);
  R.halo(218, 118, 12, H('#5a3a20', '#8a5a2a', '#c88a3a', '#f0b850'), 0.7); llama(218, 123, t);
  { const a = t * 4.3; const mx = Math.round(218 + Math.cos(a) * 11), my = Math.round(112 + Math.sin(a * 1.6) * 6), ala = Math.sin(t * 30) > 0; R.pset(mx, my, hex('#c8b8a0')); R.pset(mx - 1, my - (ala ? 1 : 0), hex('#e8dcc8')); R.pset(mx + 1, my - (ala ? 1 : 0), hex('#e8dcc8')); }
  T.motas(R, t, 180, 250, 90, 134, 7, hex('#f0c870'));
  // Marci escribe de pie en el atril; en «letter» deja la pluma, levanta la carta y la lee
  const lev = m(0.0457), x = 128, escribe = t < lev;
  const marci = R.actor(EL.marci, x, 152, t, { dir: 1, sostiene: escribe ? [158 + Math.round(Math.sin(t * 7) * 3), 137] : [x + 24, 122], sonrisa: !escribe, habla: !escribe && t > lev + 0.8 && Math.sin(t * 8) > 0 });
  atril();
  if (escribe) {
    R.poligono([[150, 139], [172, 134], [173, 137], [151, 142]], C.papel); R.linea(151, 142, 173, 137, C.papelS);
    const n = cl((t - 1.3) / (lev - 1.3)); for (let r = 0; r < 3; r++) for (let i = 0; i < 18; i++) if ((r * 18 + i) / 54 < n && hh(i >> 1, r, 5) > 0.3) R.pset(152 + i + r * 0.3, Math.round(139 - i * 0.24 + r * 1.1), C.tinta);
    pluma(marci.mano[0] + 3, marci.mano[1] + 2);
  } else {
    T.PIEZAS_VM.cartaLacre(R, marci.mano[0] + 5, marci.mano[1] + 8, { abierta: true });
    T.PIEZAS_VM.pluma(R, 176, 134);
  }
};

// ── 2 · la mesa de Marci de cerca (fondo local, inserto) ──
const luz2 = (x, y) => cl(1.15 - Math.hypot(x - 46, (y - 92) * 1.1) / 260);
const t2 = tonoDe(luz2);
const mesaFondo = () => {
  for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) R.pset(x, y, t2(PW, x, y, (hh(x >> 2, y >> 2, 21) - 0.5) * 0.8 + (hh(x, y, 22) > 0.95 ? -0.7 : 0)));
  // el canto de la ventana emplomada a la izquierda, con la noche
  for (let y = 10; y < 98; y++) for (let x = 0; x < 26; x++) R.pset(x, y, (x + y) % 8 === 0 || (x - y + 800) % 8 === 0 ? hex('#3a3a46') : hex(y < 40 ? '#0e1430' : y < 70 ? '#182250' : '#24305e'));
  for (let i = 0; i < 6; i++) R.pset(3 + i * 4, 14 + (i * 7) % 20, hex('#d0d8f0'));
  caja(26, 6, 31, 100, t2(PM, 28, 50, 0.4)); caja(0, 6, 31, 9, t2(PM, 10, 8, 0.4)); caja(0, 98, 33, 103, hex('#5a4e46')); caja(0, 98, 33, 98, hex('#8a7a6a'));
  // el grabado de una planta enmarcado y el manojo de hierbas colgado
  caja(64, 20, 108, 78, K); caja(65, 21, 107, 77, t2(PM, 86, 40, 0.8)); caja(69, 25, 103, 73, hex('#e8dcc0')); for (let j = 26; j < 73; j++) for (let i = 70; i < 103; i++) if (hh(i, j, 29) > 0.92) R.pset(i, j, hex('#c8b898'));
  R.linea(86, 70, 86, 34, hex('#3a5a2a')); for (let k = 0; k < 5; k++) { const y = 62 - k * 7, d = k % 2 ? 1 : -1; R.poligono([[86, y], [86 + d * 10, y - 4], [86 + d * 13, y - 1], [86 + d * 4, y + 2]], hex(k % 2 ? '#4a7a3a' : '#5a8a46')); }
  R.disco(86, 32, 3.5, hex('#4a6ab0')); R.disco(86, 32, 1.5, hex('#e8c040')); for (const [x, y] of [[80, 70], [86, 72], [92, 70], [78, 72], [94, 72]]) R.linea(86, 70, x, y + 1, hex('#6a4a2a'));
  R.linea(72, 75, 100, 75, hex('#8a7a5a'));
  R.linea(120, 10, 120, 22, hex('#3a2a14')); for (let k = 0; k < 7; k++) R.linea(120, 22, 114 + k * 2, 44 + (k % 3) * 3, hex(k % 2 ? '#5a7a3a' : '#7a8a4a')); caja(117, 21, 123, 24, hex('#8a6a3a'));
  // el astrolabio colgado
  R.disco(150, 40, 15, C.latonS); R.disco(150, 40, 14, C.laton); R.disco(150, 40, 11, hex('#5a4020')); R.disco(150, 40, 10, hex('#3a2a14'));
  for (let k = 0; k < 24; k++) R.pset(150 + Math.round(Math.cos(k * 0.2618) * 12.5), 40 + Math.round(Math.sin(k * 0.2618) * 12.5), C.latonL);
  for (let k = 0; k < 12; k++) R.pset(150 + Math.round(Math.cos(k * 0.5236) * 8), 40 + Math.round(Math.sin(k * 0.5236) * 8), hex('#a88a4a'));
  R.disco(150, 24, 3, C.laton); R.disco(150, 24, 1.5, hex('#3a2a14')); R.linea(150, 21, 150, 12, hex('#3a2a14'));
  // el armario grande: libros con nervios, albarelos azules y frascos
  caja(186, 8, 274, 104, K); for (let y = 9; y <= 103; y++) for (let x = 187; x <= 273; x++) R.pset(x, y, t2(PM, x, y, (hh(x >> 1, y >> 3, 23) - 0.5) * 0.6 + 0.3));
  for (const y0 of [12, 46, 78]) caja(191, y0, 269, y0 + 30, hex('#100a08'));
  for (const y0 of [42, 76]) { caja(189, y0, 271, y0 + 3, t2(PM, 230, y0, 0.9)); caja(189, y0 + 4, 271, y0 + 4, K); }
  { let x = 192, i = 0; while (x < 266) { const w = 6 + Math.floor(hh(i, 1, 24) * 4), hg = 22 + Math.floor(hh(i, 2, 24) * 7), cs = ['#6a1e1e', '#2a3a6a', '#4a5a2a', '#7a4a1a', '#4a2a3a', '#8a6a3a', '#2a4a4a'][i % 7];
    if (hh(i, 9, 24) > 0.82) { R.poligono([[x, 42], [x + 3, 42], [x + 14, 42 - hg + 4], [x + 11, 42 - hg + 2]], hex(cs)); x += 12; i++; continue; }
    caja(x, 42 - hg, x + w - 1, 41, hex(cs)); caja(x, 42 - hg, x, 41, hex('#120808')); caja(x + w - 1, 42 - hg, x + w - 1, 41, hex('#0c0606'));
    for (const yy of [42 - hg + 4, 42 - hg + 6, 36, 38]) R.linea(x + 1, yy, x + w - 2, yy, hex('#c8a040'));
    caja(x + 2, 42 - hg + 10, x + w - 3, 42 - hg + 14, hex('#1a1414')); x += w; i++; } }
  for (let k = 0; k < 5; k++) { const x = 194 + k * 15; caja(x, 56, x + 11, 75, hex('#e0dccc')); caja(x + 1, 53, x + 10, 56, hex('#2a3a7a')); caja(x, 52, x + 11, 53, hex('#1a2a5a'));
    R.linea(x, 62, x + 11, 62, hex('#2a4aa8')); R.linea(x, 69, x + 11, 69, hex('#2a4aa8')); for (let i = 0; i < 4; i++) R.pset(x + 2 + i * 3, 65 + (i % 2), hex('#3a5ac0')); caja(x + 1, 57, x + 1, 74, hex('#ffffff')); caja(x + 11, 56, x + 11, 75, hex('#b0ac9c')); }
  for (let k = 0; k < 6; k++) { const x = 193 + k * 12, c = ['#2a7a4a', '#a87a1a', '#3a5ab0', '#8a2a4a', '#4a8a8a', '#7a4ab0'][k], hg = 12 + (k % 3) * 4;
    R.disco(x + 4, 106 - 4, 5, hex(c)); caja(x + 2, 100 - hg, x + 6, 102, hex(c)); caja(x + 2, 99 - hg, x + 6, 99 - hg, hex('#c8a060')); R.pset(x + 2, 101, hex('#f0f8ff')); R.pset(x + 3, 104 - hg, hex('#f0f8ff')); }
  // la mesa: tablas de nogal con vetas y el paño granate con fleco de oro
  for (let y = 104; y < 180; y++) { const k = (y - 104) / 76; for (let x = 0; x < 320; x++) { const tb = Math.floor((y - 104) / (6 + k * 14)), j = (y - 104) % Math.round(6 + k * 14);
    const veta = Math.sin(x * 0.05 * (1 - k * 0.5) + tb * 3 + Math.sin(x * 0.013 + tb) * 3) > 0.82;
    R.pset(x, y, t2(PM, x, y - 20, j === 0 ? -1.4 : (veta ? -0.7 : 0) + (hh(x >> 3, tb, 25) - 0.5) * 0.5 + 0.2)); } }
  for (let y = 112; y < 180; y++) { const a = Math.round(76 - (y - 112) * 0.5), b = Math.round(196 + (y - 112) * 0.5); for (let x = a; x <= b; x++) { const borde = x - a < 2 || b - x < 2;
    R.pset(x, y, borde ? ((x + y) % 2 ? C.oro : C.oroS) : t2(H('#2a0a10', '#4a1018', '#6a1a22', '#8a2a2a', '#a83a34'), x, y - 20, (hh(x >> 1, y >> 1, 26) - 0.5) * 0.5 + ((x * 3 + y) % 11 === 0 ? 0.6 : 0))); }
    if (y % 2 === 0) { R.pset(a - 1, y, C.oroS); R.pset(b + 1, y, C.oroS); } }
  caja(0, 103, 319, 104, hex('#0e0806'));
};
const cartaAbierta = (x, y, n, firma, t) => {
  caja(x + 2, y + 2, x + 47, y + 57, hex('#3a0e14')); caja(x, y, x + 45, y + 55, K); caja(x + 1, y + 1, x + 44, y + 54, C.papel);
  for (let j = 2; j < 54; j++) for (let i = 2; i < 44; i++) if (hh(i, j, 27) > 0.93) R.pset(x + i, y + j, C.papelS);
  R.linea(x + 1, y + 19, x + 44, y + 19, C.papelS); R.linea(x + 1, y + 37, x + 44, y + 37, C.papelS); caja(x + 1, y + 1, x + 44, y + 1, C.papelL);
  for (let r = 0; r < 12; r++) for (let i = 0; i < 34; i++) if (r * 34 + i < n * 408 && hh(i >> 1, r, 28) > 0.22) R.pset(x + 5 + i, y + 6 + Math.round(r * 3.3 + Math.sin(i * 0.9 + r) * 0.6), C.tinta);
  const nf = Math.round(firma * 22); for (let i = 0; i < nf; i++) R.pset(x + 18 + i, y + 48 + Math.round(Math.sin(i * 0.8) * 2.2 + (i > 15 ? (i - 15) * 0.4 : 0)), C.tinta);
  if (nf > 3) R.linea(x + 18, y + 52, x + 18 + nf, y + 51, C.tinta);
};
const cartaCerrada = (x, y, lacre, sello) => {
  caja(x + 2, y + 2, x + 47, y + 27, hex('#3a0e14')); caja(x, y, x + 45, y + 25, K); caja(x + 1, y + 1, x + 44, y + 24, C.papel); caja(x + 1, y + 1, x + 44, y + 2, C.papelL);
  R.linea(x + 1, y + 1, x + 22, y + 13, C.papelS); R.linea(x + 44, y + 1, x + 23, y + 13, C.papelS); R.linea(x + 2, y + 23, x + 43, y + 23, C.papelS);
  if (lacre > 0) { const r = 2 + lacre * 3.5; R.disco(x + 23, y + 14, r + 0.8, C.lacreS); R.disco(x + 23, y + 14, r, C.lacre); R.disco(x + 22, y + 13, r * 0.45, C.lacreL);
    if (sello) { R.disco(x + 23, y + 14, 3.2, C.lacreS); R.disco(x + 23, y + 14, 2.4, C.lacre); R.pset(x + 23, y + 12, C.lacreL); R.pset(x + 21, y + 14, C.lacreL); R.pset(x + 25, y + 14, C.lacreL); R.pset(x + 23, y + 16, C.lacreL); R.pset(x + 23, y + 14, C.lacreS); } }
};
const p2 = (t) => {
  capa('mesaMarci', mesaFondo);
  // la vela grande con la llama, el humo y el halo; el reloj de arena
  R.halo(46, 90, 16, H('#6a4428', '#9a6a34', '#d09a44', '#f8c860'), 0.75);
  caja(30, 150, 62, 156, C.latonS); caja(32, 148, 60, 150, C.laton); caja(34, 147, 58, 147, C.latonL); caja(42, 140, 50, 148, C.laton); caja(42, 140, 43, 148, C.latonL);
  caja(40, 100, 52, 140, C.vela); caja(50, 100, 52, 140, C.velaS); caja(40, 100, 41, 140, hex('#fffaf0')); for (const [dx, l] of [[3, 9], [8, 14]]) caja(40 + dx, 100, 41 + dx, 100 + l, hex('#e8e0c8'));
  llama(46, 99, t, 2.2); R.linea(46, 98, 46, 99, K);
  for (let k = 0; k < 5; k++) { const v = (t * 0.8 + k * 0.2) % 1; R.pset(Math.round(46 + Math.sin(v * 9 + k) * (2 + v * 5)), Math.round(82 - v * 40), hex(v < 0.5 ? '#8a7a72' : '#5e5048')); }
  T.motas(R, t, 20, 110, 50, 100, 8, hex('#f0c870'));
  { const u = (t * 0.12) % 1, x0 = 254, y0 = 80; caja(x0 - 6, y0 - 12, x0 + 6, y0 - 11, C.latonS); caja(x0 - 6, y0 + 12, x0 + 6, y0 + 13, C.latonS);
    R.poligono([[x0 - 5, y0 - 10], [x0 + 6, y0 - 10], [x0 + 1, y0], [x0, y0]], hex('#8aa0b0')); R.poligono([[x0, y0 + 1], [x0 + 1, y0 + 1], [x0 + 6, y0 + 11], [x0 - 5, y0 + 11]], hex('#8aa0b0'));
    R.poligono([[x0 - 4 + u * 3, y0 - 9 + u * 9], [x0 + 5 - u * 3, y0 - 9 + u * 9], [x0 + 1, y0], [x0, y0]], hex('#e0b860')); R.poligono([[x0 - 4 + u * 3, y0 + 11 - u * 9], [x0 + 5 - u * 3, y0 + 11 - u * 9], [x0 + 6, y0 + 11], [x0 - 5, y0 + 11]], hex('#e0b860')); R.linea(x0, y0, x0, y0 + 10, hex('#f0d080')); }
  // el libro grande, de pie, y el tintero
  const atado = tramo(t, m(0.3533), m(0.3533) + 0.35);
  T.PIEZAS_VM.libroVoynich(R, 238, 160, { s: 3 });
  T.PIEZAS_VM.tintero(R, 168, 132, { s: 2, pluma: t > m(0.24) });
  // la barra de lacre y el sello de latón, en la mesa hasta que se cogen
  const firma = tramo(t, m(0.2040), m(0.2340)), dobla = tramo(t, m(0.2440), m(0.2601)), gota = tramo(t, m(0.2700), m(0.2840)), sella = t > m(0.3000);
  const coge = t > m(0.2860) && t < m(0.3150), lleva = tramo(t, m(0.3363), m(0.3533));
  const lx = Math.round(lerp(96, 172, lleva)), ly = Math.round(lerp(132, 134, lleva));
  if (dobla < 0.5) cartaAbierta(96, 104, 1, firma, t);
  else { cartaCerrada(lx, ly, gota, sella); }
  if (dobla > 0 && dobla < 1) { const k = Math.sin(dobla * Math.PI); caja(97, Math.round(104 + 30 * dobla), 141, Math.round(110 + 30 * dobla), C.papelL); R.linea(97, Math.round(104 + 30 * dobla), 141, Math.round(104 + 30 * dobla), C.papelS); if (k > 0.5) R.linea(96, 132, 142, 132, K); }
  if (atado > 0) { const c = C.cordon; R.linea(lx + 46, ly + 12, 258, ly + 12, c); R.linea(lx + 46, ly + 13, 258, ly + 13, hex('#8a1a1a')); if (atado > 0.5) { R.linea(236, 110, 236, 158, c); R.linea(237, 110, 237, 158, hex('#8a1a1a')); R.disco(236, 148, 2.5, c); R.linea(234, 150, 230, 157, c); R.linea(238, 150, 241, 157, c); } }
  if (!coge && !sella) { caja(172, 152, 180, 160, C.latonS); caja(173, 151, 179, 158, C.laton); R.disco(176, 148, 3, hex('#5a3418')); R.disco(175, 147, 1.3, hex('#8a5a30')); }
  if (sella && lleva === 0) { caja(186, 152, 194, 160, C.latonS); caja(187, 151, 193, 158, C.laton); R.disco(190, 148, 3, hex('#5a3418')); }
  if (gota === 0) { R.poligono([[129, 166], [157, 159], [159, 164], [131, 171]], K); R.poligono([[130, 166], [156, 160], [158, 163], [132, 169]], C.lacre); R.linea(131, 166, 156, 161, C.lacreL); caja(155, 160, 158, 164, hex('#3a2a20')); }
  // las manos (el brazo canónico): firma con la pluma, dobla, el lacre (izquierda), el sello, y arrima la carta al libro
  const MANGA = '#24202c', brD = (wx, wy) => T.brazo(R, wx + 46, 214, wx, wy, MANGA, -1, { codo: [wx + 34, wy + 28] });
  if (t < m(0.2420)) { const u = cl((t - m(0.2040)) / 0.9), wx = Math.round(118 + u * 20 + Math.sin(t * 14) * 1.5), wy = Math.round(146 + Math.sin(u * 9) * 1.5) + (t < m(0.2040) ? -6 : 0);
    brD(wx + 8, wy + 6); pluma(wx + 2, wy + 2); }
  else if (t < m(0.2640)) { const u = dobla, wx = Math.round(lerp(130, 128, u)), wy = Math.round(lerp(160, 128, u)); brD(wx + 8, wy + 4); }
  else if (t < m(0.2860)) { const u = tramo(t, m(0.2640), m(0.2720)), wx = Math.round(lerp(150, 116, u)), wy = Math.round(lerp(172, 128, u));
    T.brazo(R, wx - 52, 214, wx - 8, wy + 4, MANGA, 1, { codo: [wx - 40, wy + 30] }); R.poligono([[wx + 2, wy - 2], [wx + 16, wy - 14], [wx + 19, wy - 11], [wx + 5, wy + 1]], C.lacre); R.linea(wx + 3, wy - 2, wx + 17, wy - 13, C.lacreL);
    if (gota > 0 && gota < 1) R.disco(119, Math.round(lerp(122, 145, gota)), 1.6, C.lacre); }
  else if (coge) { const baja = t < m(0.3000) ? tramo(t, m(0.2860), m(0.2990)) : 1 - tramo(t, m(0.3020), m(0.3150)), wx = Math.round(lerp(176, 119, Math.min(1, (t - m(0.2860)) / 0.3))), wy = Math.round(lerp(128, 138, baja));
    brD(wx + 9, wy + 6); caja(wx - 4, wy + 6, wx + 4, wy + 13, C.latonS); caja(wx - 3, wy + 5, wx + 3, wy + 12, C.laton); R.disco(wx, wy + 2, 3, hex('#5a3418')); }
  else if (t < m(0.3700)) { const u = tramo(t, m(0.3300), m(0.3363)) * (1 - tramo(t, m(0.3560), m(0.3680))), wx = lx + 24, wy = ly + 8;
    if (u > 0.05) brD(Math.round(wx + (1 - u) * 50), Math.round(wy + (1 - u) * 40)); }
};

// ── 3 · el viaje (fondo local): de los Alpes a la campiña de Roma; el correo galopa con el libro y la carta ──
const cieloDia = () => { degr(0, 0, 319, 128, H('#3a6ac0', '#5a8ad4', '#7aa6e0', '#a8c4ea', '#d8dcd0', '#f0dcb0'), 0.3); };
const alpes = (w) => cl(1.35 - w / 360) * (42 + 16 * Math.sin(w * 0.047) + 11 * Math.sin(w * 0.13 + 1) + 9 * Math.abs(Math.sin(w * 0.29 + 2))) + 10;
const colina = (w) => 24 + 7 * Math.sin(w * 0.028) + 4 * Math.sin(w * 0.083 + 1) + 2 * Math.sin(w * 0.21);
const p3 = (t) => {
  const u = cl((t - P3) / (P4 - P3)), ue = u * u * (3 - 2 * u), cam = lerp(0, 420, ue * 0.5 + u * 0.5);
  capa('cieloDia', cieloDia);
  nubes(t, [[20, 24, 40, 1.2], [180, 18, 30, 1.6], [260, 40, 22, 2.4], [110, 46, 18, 3.4]].map(([a, b, c, d]) => [a - cam * 0.05, b, c, d]), H('#9ab0d0', '#e6eef8', '#ffffff'));
  pajaros(t, 4, 30, 14, hex('#2a2a3a'), 1);
  // los Alpes al fondo (nieve, roca en sombra y al sol)
  const ca = cam * 0.2, RO = H('#5a6a90', '#7486a8', '#91a2c0'), NI = H('#c8d4ea', '#eef4ff');
  for (let x = 0; x < 320; x++) { const w = x + ca, h0 = alpes(w), sol = alpes(w + 1) - h0 < 0, top = Math.round(122 - h0);
    for (let y = top; y < 124; y++) { const prof = y - top, nieve = prof < h0 * 0.28 - 3 + Math.sin(w * 0.7) * 2 && h0 > 34;
      R.pset(x, y, nieve ? NI[sol ? 1 : 0] : RO[Math.min(2, Math.max(0, (sol ? 2 : 1) - (prof > 18 ? 1 : 0) + (by(x, y) > 0.7 ? -1 : 0)))]); } }
  // las colinas de en medio, con pueblos, viñas, cipreses y al final Roma
  const cm = cam * 0.5, VE = H('#4a7a3a', '#5e9446', '#76aa52', '#8ebe62');
  for (let x = 0; x < 320; x++) { const w = x + cm, top = Math.round(140 - colina(w));
    for (let y = top; y < 142; y++) { const p = y - top, viña = (Math.floor(w / 3) % 4 === 0) && p > 4 && (Math.floor(w / 60) % 3 === 1);
      R.pset(x, y, p === 0 ? VE[3] : viña ? hex('#3a5a2a') : VE[Math.max(0, Math.min(3, 2 - Math.floor(p / 7) + (by(x, y) > 0.75 ? -1 : 0) + (hh(Math.floor(w / 4), y >> 2, 31) > 0.85 ? 1 : 0)))]); } }
  const pueblo = (wx, n, campanario) => { const sx = wx - cm; if (sx < -40 || sx > 360) return; const base = Math.round(140 - colina(wx)) + 4;
    for (let i = 0; i < n; i++) { const hx = sx + i * 7 - n * 3, hg = 5 + (i % 3) * 2; caja(hx, base - hg, hx + 5, base, hex(i % 2 ? '#e8dcc0' : '#d8c8a8')); R.poligono([[hx - 1, base - hg], [hx + 3, base - hg - 3], [hx + 7, base - hg]], hex('#b0503a')); R.pset(hx + 2, base - hg + 2, hex('#3a2a2a')); }
    if (campanario) { caja(sx - 2, base - 18, sx + 2, base, hex('#e0d4b8')); R.poligono([[sx - 3, base - 18], [sx, base - 24], [sx + 3, base - 18]], hex('#9a4030')); R.pset(sx, base - 15, hex('#3a2a2a')); } };
  pueblo(70, 5, true); pueblo(190, 4, false); pueblo(300, 6, true); pueblo(400, 3, false);
  for (const wx of [40, 110, 150, 240, 270, 350, 380]) { const sx = wx - cm; if (sx < -6 || sx > 326) continue; const b = Math.round(140 - colina(wx)) + 3; R.poligono([[sx - 2, b], [sx, b - 13], [sx + 2, b]], hex('#2a4a2a')); R.linea(sx, b - 12, sx, b - 2, hex('#3a5a3a')); }
  { const sx = 520 - cm, base = 138; if (sx < 420) { R.recorte([0, 0, 319, 179]); roma(sx - 90, base, 0.62, { muro: hex('#e0c49a'), muro2: hex('#c8a47a'), techo: hex('#b05a3a'), vent0: hex('#5a3a2a'), cupula: hex('#9aaab4'), costilla: hex('#c8d4dc'), luzCupula: hex('#c0ccd4'), tronco: hex('#5a3a2a'), pino: hex('#3a5a2a'), pinoL: hex('#5a7a3a'), cipres: hex('#2a4024') }); R.recorte(null); } }
  // el camino, la hierba con flores, los árboles y los mojones que pasan
  const GR = H('#3e6a2a', '#52823a', '#68984a'), CA = H('#a07a4a', '#b8925a', '#cca870');
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const w = x + cam, camino = y >= 152 && y <= 166, rodada = camino && (y === 156 || y === 162);
    R.pset(x, y, camino ? (rodada ? CA[0] : CA[(hh(w >> 1, y, 32) > 0.8 ? 0 : (y < 155 ? 1 : 2))]) : (hh(w, y, 33) > 0.94 ? hex(['#f0e060', '#e86a6a', '#ffffff'][Math.floor(hh(w, y, 34) * 3)]) : GR[Math.min(2, Math.max(0, Math.floor(by(x, y) * 1.5 + (y < 152 ? 1 : 0.3) + (hh(w >> 1, y >> 1, 35) - 0.5))))])); }
  for (let k = 0; k < 14; k++) { const wx = k * 62 + 30, sx = Math.round(wx - cam); if (sx < -30 || sx > 350) continue; const pino = wx > 520, b = 150;
    if (pino) { caja(sx, b - 26, sx + 2, b, hex('#5a3a2a')); R.poligono([[sx - 14, b - 24], [sx - 8, b - 34], [sx + 10, b - 35], [sx + 16, b - 25]], hex('#2a4a22')); R.poligono([[sx - 8, b - 31], [sx, b - 36], [sx + 9, b - 33]], hex('#4a6a32')); }
    else { caja(sx, b - 14, sx + 2, b, hex('#5a3a22')); R.disco(sx + 1, b - 20, 9, hex('#2a5a26')); R.disco(sx - 1, b - 22, 6.5, hex('#3e7432')); R.disco(sx - 3, b - 25, 3.5, hex('#5a9444')); } }
  for (let k = 0; k < 6; k++) { const sx = Math.round(k * 150 + 90 - cam); if (sx < -10 || sx > 330) continue; caja(sx, 158, sx + 5, 167, hex('#c8c0b0')); R.disco(sx + 2.5, 158, 3, hex('#d8d0c0')); caja(sx + 5, 160, sx + 5, 167, hex('#8a8478')); }
  // el correo a caballo, con el libro y la carta atados a la silla, y el polvo
  const rx = Math.round(lerp(30, 200, u)), suelo = 164;
  for (let k = 0; k < 8; k++) { const v = ((t * 2.6 + k / 8) % 1); R.disco(rx + 4 - v * 26, suelo - 3 - v * 7, 1.5 + v * 3.4, hex(v < 0.5 ? '#d8c09a' : '#e8d8bc')); }
  // el caballo, al doble de tamaño (el del kit es de 26 px), con el jinete y el fardo del libro y la carta en la grupa
  const Y = suelo - 37;
  doble((ox, oy) => R.caballo(ox, oy + 18, t, { galopa: true, dir: 1, color: hex('#8a5430'), sombra: hex('#5a3418') }), rx, Y, 28, 20);
  R.linea(rx + 36, Y + 13, rx + 47, Y + 9, hex('#3a2010')); R.linea(rx + 22, Y + 21, rx + 22, Y + 27, hex('#3a2010'));
  caja(rx + 3, Y + 7, rx + 15, Y + 16, K); caja(rx + 4, Y + 8, rx + 14, Y + 15, hex('#c8b48a')); caja(rx + 4, Y + 13, rx + 14, Y + 15, hex('#a08a64'));
  R.linea(rx + 9, Y + 7, rx + 9, Y + 16, C.cordon); R.linea(rx + 3, Y + 11, rx + 15, Y + 11, C.cordon); caja(rx + 11, Y + 5, rx + 16, Y + 8, C.papel); R.pset(rx + 13, Y + 7, C.lacre);
  const sube = Math.floor(t * 8) % 2;
  R.actor(EL.criado, rx + 13, Y + 22 - sube, t, { dir: 1, quieto: true, sonrisa: t > m(0.49), dedo: t > m(0.5031) && t < m(0.5031) + 1.2 });
  // matas del primer término que pasan deprisa
  for (let k = 0; k < 10; k++) { const sx = Math.round(((k * 47 - cam * 1.4) % 470 + 470) % 470 - 60); for (let i = 0; i < 7; i++) R.linea(sx + i * 2, 179, sx + i * 2 + (i % 3) - 1, 171 - (i % 3) * 3, hex(i % 2 ? '#2e5a22' : '#447a30')); }
};

// ── 4 · el Colegio Romano: Kircher y los jeroglíficos; llega el correo y rompe el lacre ──
const p4 = (t) => {
  const o = { encuadre: 'colegio' }; T.pragua(R, t, o);
  const brilla = t > m(0.5991) && t < m(0.6717);
  if (brilla) for (let k = 0; k < 6; k++) { const v = (t * 2 + k / 6) % 1, y = Math.round(lerp(106, 46, (k + v) / 6)); if (v < 0.6) { R.pset(80 + (k % 3) * 6, y, C.oroL); R.pset(79 + (k % 3) * 6, y, C.oro); R.pset(81 + (k % 3) * 6, y, C.oro); R.pset(80 + (k % 3) * 6, y - 1, C.oro); R.pset(80 + (k % 3) * 6, y + 1, C.oro); } }
  // el ayudante copia detrás del escritorio
  const ay = R.actor(EL.copista, 214, 130, t, { dir: -1, sostiene: [210 + Math.round(Math.sin(t * 8) * 2), 123] });
  pluma(ay.mano[0] - 2, ay.mano[1] + 1);
  // el correo entra con el paquete
  const lleg = tramo(t, m(0.6450), m(0.6930)), cx = Math.round(lerp(-18, 70, lleg)), entrega = t > m(0.6991);
  const kircherCarta = entrega, abierta = t > m(0.7080);
  const co = R.actor(EL.criado, cx, 150, t, { dir: 1, anda: lleg > 0 && lleg < 1, sostiene: [cx + 18, 132], sonrisa: entrega });
  T.PIEZAS_VM.libroVoynich(R, co.mano[0] + 3, co.mano[1] + 8);
  if (!entrega) { T.PIEZAS_VM.cartaLacre(R, co.mano[0] + 3, co.mano[1] - 7); R.linea(co.mano[0] - 3, co.mano[1] - 6, co.mano[0] + 9, co.mano[1] - 6, C.cordon); }
  const kx = 96, toca = t > m(0.5880) && t < m(0.6717);
  const ki = R.actor(EL.kircher, kx, 150, t, { dir: -1, dedo: toca, sostiene: kircherCarta ? [kx - 10, abierta ? 124 : 132] : undefined, sorpresa: t > m(0.7650), sonrisa: abierta && t < m(0.7650), habla: toca && Math.sin(t * 7) > 0 });
  if (kircherCarta) T.PIEZAS_VM.cartaLacre(R, ki.mano[0] - 2, ki.mano[1] + (abierta ? 8 : 5), { abierta });
  if (abierta && t < m(0.7080) + 0.6) { const v = (t - m(0.7080)) / 0.6; R.pset(ki.mano[0] - 4, Math.round(ki.mano[1] + 4 + v * 20), C.lacre); R.pset(ki.mano[0] + 1, Math.round(ki.mano[1] + 6 + v * 24), C.lacre); }
  T.praguaDelante(R, t, o);
};

// ── 5 · la carta en el escritorio de Kircher: se abre y sale el recuerdo de las 600 monedas ──
const recuerdo = (cx, cy, rx, ry, e) => {
  if (e <= 0) return; const ex = rx * e, ey = ry * e;
  for (let y = Math.floor(cy - ey - 2); y <= cy + ey + 2; y++) for (let x = Math.floor(cx - ex - 2); x <= cx + ex + 2; x++) { const d = Math.hypot((x - cx) / ex, (y - cy) / ey) + Math.sin(Math.atan2(y - cy, x - cx) * 7) * 0.05;
    if (d <= 1) R.pset(x, y, d > 0.9 ? (d > 0.96 ? K : C.oroS) : d > 0.8 ? (by(x, y) > 0.5 ? hex('#f0d890') : hex('#f8ecc4')) : hex(hh(x >> 1, y >> 1, 41) > 0.9 ? '#f4e6bc' : '#fbf3da')); }
};
const p5 = (t) => {
  const abre = tramo(t, P5 + 0.45, P5 + 0.95);
  T.pragua(R, t, { encuadre: 'colegio', camara: 'carta', abre });
  // el dedo de Kircher recorre el renglón que lo dice
  const dedo = tramo(t, P5 + 0.9, P5 + 1.3) * (1 - tramo(t, m(0.8850), m(0.9000)));
  if (dedo > 0) { const lee = cl((t - P5 - 1.3) / 1.0), wx = Math.round(lerp(96, 152, lee)), wy = Math.round(lerp(196, 112, dedo)); T.brazo(R, 40, 214, wx, wy, '#1e1a24', 1, { codo: [52, 170] }); }
  // el recuerdo: la corona del emperador, la cuenta hasta 600, la bolsa y el libro
  const e = tramo(t, P5 + 1.0, P5 + 1.35), cx = 234, cy = 82;
  if (e > 0) { R.disco(168, 108, 2 * e, K); R.disco(168, 108, 1.4 * e, hex('#fbf3da')); R.disco(178, 101, 3 * e, K); R.disco(178, 101, 2.3 * e, hex('#fbf3da')); }
  recuerdo(cx, cy, 44, 31, e);
  if (e >= 1) {
    const cor = tramo(t, P5 + 1.35, P5 + 1.6); if (cor > 0) { const y = Math.round(54 + (1 - cor) * 6); R.icono('corona', cx - 7, y, C.oro, C.oroS, 2); if (Math.sin(t * 6) > 0.6) R.pset(cx - 5, y + 2, C.oroL); }
    const cuenta = tramo(t, m(0.8848), m(0.9050)); if (cuenta > 0) R.numero(String(Math.round(cuenta * 600 / 10) * 10), cx, 88, { tam: 16, centro: true });
    const bolsa = tramo(t, m(0.8800), m(0.8930)); if (bolsa > 0) T.PIEZAS_VM.bolsaMonedas(R, cx - 12, Math.round(lerp(94, 110, bolsa)), { abierta: bolsa >= 1 });
    const libro = tramo(t, m(0.9780), m(0.9880)); if (libro > 0) { R.linea(cx + 2, 102, cx + 7, 102, K); R.linea(cx + 2, 105, cx + 7, 105, K); T.PIEZAS_VM.libroVoynich(R, cx + 18, 112, { brilla: true }); if (libro < 1) R.disco(cx + 18, 104, (1 - libro) * 9, C.oroL); }
  }
  // las monedas de oro que caen del recuerdo y se apilan en la mesa
  const cae = cl((t - m(0.9152)) / 2.4);
  if (cae > 0) for (let k = 0; k < 18; k++) { const t0 = k * 0.05, v = cl((cae - t0) / 0.3); if (v <= 0) continue; const pila = k % 3, alto = Math.floor(k / 3), px = 244 + pila * 12, py = 160 - alto * 2;
    const y = Math.round(lerp(112, py, v * v)), x = Math.round(lerp(cx - 12 + (k % 5) * 3, px, v));
    R.rect(x - 3, y - 1, x + 3, y + 1, C.oroS); R.rect(x - 3, y - 2, x + 3, y - 1, C.oro); R.pset(x - 1, y - 2, C.oroL); }
  if (t > m(0.9152) && t < m(0.9152) + 1.2 && Math.sin(t * 9) > 0.3) for (const [x, y] of [[cx - 30, 70], [cx + 32, 64], [cx + 26, 104]]) { R.pset(x, y, C.oroL); R.pset(x - 1, y, C.oro); R.pset(x + 1, y, C.oro); R.pset(x, y - 1, C.oro); R.pset(x, y + 1, C.oro); }
};
const efectos = [[m(0.0040), 'lapiz'], [m(0.0480), 'papel'], [m(0.2050), 'lapiz'], [m(0.2460), 'papel'], [m(0.3000), 'sello'], [m(0.5031), 'campana'], [m(0.5991), 'brillo'], [m(0.7080), 'papel'], [P5 + 0.5, 'papel'], [P5 + 1.4, 'pop'], [m(0.9152), 'brillo'], [m(0.9800), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '1665', año: 1665 });
''')


E['vm-baresch'] = ('Baresch', '''// VM-BARESCH (frase 8), Praga y Roma hacia 1639. Cinco planos:
// 1. (fondo local) una calle de Praga al anochecer: el año retrocede de 1665 a 1639; Baresch llega con el libro bajo el
//    brazo y entra en su casa de alquimista (humo de colores por la chimenea); un niño con su aro, palomas que vuelan,
//    una criada sacude una alfombra;
// 2. pragua/alquimista: Baresch mira el libro con la lupa; en «years» arruga una hoja y la tira (el gato se despierta);
//    en «read it» se queda con un «?»;
// 3. pragua/alquimista/copia: copia unas páginas (los renglones se llenan); en «sent» la copia se dobla, se sella y sale
//    hacia Roma; Baresch la señala;
// 4. (fondo local) el claustro del Colegio Romano: el correo se va, Kircher lee la copia; la idea de Baresch (en
//    «medical» un frasco que burbujea, en «east» un sol que sale con un camello); en «didn't know» Kircher se rasca la
//    cabeza y le salen tres «?» (gag);
// 5. (fondo local) el puente de Carlos al atardecer: en «died» doblan las campanas y vuelan las palomas; Marci cruza con
//    el libro y en «friend» lo mira sonriendo.''', COMUN + r'''
const b = (f) => en('baresch', f);
// cortes: «an alchemist» · «Around» · «Rome asking» · «and when»
const P2 = b(0.1617), P3 = b(0.3436), P4 = b(0.5473), P5 = b(0.8550);
const C = {};
Object.entries({ papel: '#f2ead2', papelS: '#c8bc9c', tinta: '#2a2234', lacre: '#c0282a', lacreL: '#f05a4a', oro: '#f0c040', oroL: '#fff0a0', oroS: '#a87018' }).forEach(([k, v]) => { C[k] = hex(v); });
const libro = (x, y, o = {}) => T.PIEZAS_VM.libroVoynich(R, x, y, o);

// ── 1 · la calle de Praga al anochecer (fondo local) ──
const PDUSK = { monte: hex('#3a2a52'), arbol: hex('#33264a'), muro: hex('#4e3a62'), muro2: hex('#5a4470'), techo: hex('#44304e'), techo2: hex('#503658'), ventana: hex('#ffc860'), vent0: hex('#3a2c4c'), cupula: hex('#4a6070'), aguja: hex('#48345e') };
const fachada = (x0, y0, x1, y1, base, osc) => { const P = H(...base); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, P[Math.max(0, Math.min(P.length - 1, Math.floor(1.6 - osc + (hh(x >> 2, y >> 2, 51) - 0.5) * 0.9 + by(x, y) - 0.5 + (hh(x, y, 52) > 0.95 ? -1 : 0))))]); };
const ventanaCasa = (x, y, w, h, luz, P) => { caja(x - 2, y - 2, x + w + 1, y + h + 2, P.marco); caja(x - 3, y + h + 1, x + w + 2, y + h + 3, P.alf); caja(x, y, x + w - 1, y + h - 1, luz ? hex('#ffc868') : hex('#2a2440'));
  if (luz) { caja(x, y + h - 3, x + w - 1, y + h - 1, hex('#f09a40')); caja(x + 1, y + 1, x + 2, y + 2, hex('#fff0b0')); }
  R.linea(x + (w >> 1), y, x + (w >> 1), y + h - 1, P.marco); R.linea(x, y + (h >> 1), x + w - 1, y + (h >> 1), P.marco); };
const calleFondo = () => {
  degr(0, 0, 319, 120, H('#1e2050', '#2e2a62', '#4a3672', '#7a4676', '#b45a6e', '#e07a5a', '#f4a45e'), 0.35);
  for (let i = 0; i < 10; i++) R.pset(Math.floor(hh(i, 1, 53) * 320), Math.floor(hh(i, 2, 53) * 26), hex('#d8d8f8'));
  praga(70, 112, 0.62, PDUSK);
  // las casas de la izquierda: la alta con frontón escalonado y su soportal
  const PL = { marco: hex('#3a2a2a'), alf: hex('#8a7a6a') };
  fachada(0, 30, 92, 150, ['#4a3a4a', '#6a5462', '#8a6e74', '#a08480'], 0);
  R.poligono([[0, 30], [10, 30], [10, 22], [20, 22], [20, 14], [34, 14], [34, 22], [44, 22], [44, 30], [92, 30], [92, 34], [0, 34]], hex('#6a5462'));
  caja(0, 34, 92, 36, hex('#3a2a32')); caja(0, 29, 44, 30, hex('#a08480')); caja(20, 13, 34, 14, hex('#a08480')); R.disco(27, 22, 3, hex('#3a2a32'));
  for (const [x, y] of [[8, 46], [30, 46], [56, 46], [8, 74], [56, 74]]) ventanaCasa(x, y, 12, 16, hh(x, y, 54) > 0.4, PL);
  caja(30, 74, 41, 89, hex('#1a1426')); caja(28, 72, 43, 73, PL.marco); caja(27, 90, 44, 92, PL.alf);
  for (let k = 0; k < 2; k++) { const ax = 6 + k * 44; R.disco(ax + 18, 118, 18, hex('#2a1e2e')); caja(ax, 118, ax + 36, 150, hex('#2a1e2e')); for (let a = 0; a < 40; a++) { const g = a / 40 * Math.PI; R.pset(Math.round(ax + 18 - Math.cos(g) * 19), Math.round(118 - Math.sin(g) * 19), hex('#a08480')); }
    caja(ax + 4, 128, ax + 12, 150, hex('#3a2e3a')); R.disco(ax + 26, 136, 3, hex('#5a4a3a')); }
  caja(92, 30, 94, 150, hex('#2a1e2a'));
  // las casas lejanas del hueco
  for (let i = 0; i < 8; i++) { const x = 94 + i * 7, hg = 96 + (i % 3) * 6; caja(x, hg, x + 7, 150, hex(i % 2 ? '#5a4258' : '#4e3a4e')); R.poligono([[x - 1, hg], [x + 3.5, hg - 7], [x + 8, hg]], hex('#3a2638')); if (i % 2) caja(x + 3, hg + 6, x + 4, hg + 8, hex('#ffc868')); }
  // la casa del alquimista: tejado empinado de tejas, chimenea, ventanas de colores y la puerta
  R.poligono([[144, 74], [205, 34], [266, 74]], hex('#7a2e26'));
  for (let y = 36; y < 74; y++) { const a = 205 - (y - 34) * 1.53, bb = 205 + (y - 34) * 1.53; for (let x = Math.ceil(a); x < bb; x++) { const fila = Math.floor((y - 34) / 3), j = (x + fila * 2) % 5; R.pset(x, y, (y - 34) % 3 === 0 ? hex('#4a1a16') : j === 0 ? hex('#5a2018') : hex(hh(x >> 1, fila, 55) > 0.7 ? '#9a3e30' : '#7a2e26')); } }
  R.linea(144, 74, 205, 34, hex('#3a1210')); R.linea(205, 34, 266, 74, hex('#3a1210'));
  caja(228, 34, 238, 58, hex('#5a3e3a')); caja(226, 32, 240, 35, hex('#3a2a2a')); for (let y = 36; y < 58; y += 3) R.linea(228, y, 238, y, hex('#4a302c'));
  caja(196, 54, 214, 66, hex('#3a2a2a')); R.poligono([[194, 56], [205, 46], [216, 56]], hex('#5a2018')); caja(199, 57, 211, 65, hex('#b070e0')); caja(200, 58, 202, 60, hex('#e8c0ff')); R.linea(205, 57, 205, 65, hex('#3a2a2a'));
  fachada(148, 74, 262, 150, ['#3a4440', '#56625a', '#6e7c70', '#8a9686'], 0.1);
  caja(146, 74, 264, 77, hex('#2a3230')); caja(148, 140, 262, 150, hex('#4a524a')); for (let x = 150; x < 262; x += 9) R.linea(x, 140, x, 150, hex('#3a403a'));
  for (const [x, y, c] of [[158, 86, '#70e090'], [232, 86, '#b070e0'], [232, 112, '#70e090'], [158, 112, '#f0c060']]) { caja(x - 3, y - 3, x + 14, y + 19, hex('#2a3230')); caja(x - 2, y - 2, x + 13, y + 18, hex('#9aa494')); caja(x, y, x + 11, y + 16, hex(c)); caja(x + 1, y + 1, x + 2, y + 3, hex('#ffffff')); R.linea(x + 5, y, x + 5, y + 16, hex('#2a3230')); R.linea(x, y + 8, x + 11, y + 8, hex('#2a3230')); caja(x - 4, y + 17, x + 15, y + 19, hex('#a8b0a0')); }
  // la puerta (la pinta el fotograma) con su arco de piedra, los escalones
  for (let a = 0; a < 40; a++) { const g = a / 40 * Math.PI; R.disco(Math.round(205 - Math.cos(g) * 14), Math.round(114 - Math.sin(g) * 14), 2, hex('#a8b0a0')); }
  caja(189, 114, 193, 150, hex('#a8b0a0')); caja(217, 114, 221, 150, hex('#a8b0a0')); caja(186, 150, 224, 153, hex('#8a8a80')); caja(184, 153, 226, 155, hex('#6a6a62'));
  // la casa de la derecha con su soportal (bajo la zona de Atom, tejado más bajo)
  fachada(266, 66, 319, 150, ['#4a3a30', '#6a5444', '#8a6e56', '#a8886a'], 0);
  R.poligono([[262, 66], [292, 52], [320, 66]], hex('#6a2a22')); caja(262, 66, 319, 68, hex('#3a2622'));
  ventanaCasa(274, 80, 10, 14, true, PL); ventanaCasa(300, 80, 10, 14, false, PL);
  R.disco(292, 124, 16, hex('#2a1e1e')); caja(276, 124, 308, 150, hex('#2a1e1e')); caja(266, 104, 274, 150, hex('#8a6e56')); caja(310, 104, 319, 150, hex('#8a6e56'));
  // los adoquines con la reguera y el charco que refleja el cielo
  for (let y = 150; y < 180; y++) { const fila = Math.floor((y - 150) / (3 + (y - 150) / 12)); for (let x = 0; x < 320; x++) { const w = 6 + (y - 150) / 5, i = Math.floor((x + fila * w / 2) / w), jx = (x + fila * w / 2) % w;
    const junta = jx < 1 || (y - 150) % Math.round(3 + (y - 150) / 12) === 0; R.pset(x, y, junta ? hex('#2a2430') : hex(['#5a5060', '#6a5e6c', '#4e4656', '#7a6e76'][Math.floor(hh(i, fila, 56) * 4)])); } }
  for (let x = 0; x < 320; x++) R.pset(x, 164 + Math.round(Math.sin(x * 0.05)), hex('#2a2430'));
  for (let y = 166; y < 174; y++) for (let x = 92; x < 140; x++) if (Math.hypot((x - 116) / 24, (y - 170) / 4) + (hh(x >> 2, y, 57) - 0.5) * 0.15 < 1) R.pset(x, y, hex(['#4a3a6a', '#7a4676', '#b45a6e', '#e07a5a', '#f4a45e'][Math.max(0, Math.min(4, Math.floor((173 - y) / 1.8 + by(x, y) - 0.5)))]));
  // los toneles junto a la pared y el carro de mano con sacos
  for (const x of [4, 22]) { R.poligono([[x, 128], [x + 15, 128], [x + 17, 139], [x + 15, 150], [x, 150], [x - 2, 139]], hex('#6a4426')); for (let i = 0; i < 4; i++) R.linea(x + 2 + i * 4, 129, x + 2 + i * 4, 149, hex('#4a2e1a')); for (const yy of [131, 139, 147]) R.linea(x - 1, yy, x + 16, yy, hex('#2a2a32')); R.linea(x, 128, x + 15, 128, hex('#8a6038')); }
  R.poligono([[236, 160], [292, 160], [296, 168], [232, 168]], hex('#6a4426')); R.linea(232, 168, 296, 168, hex('#3a2416')); R.linea(296, 162, 316, 150, hex('#4a2e1a')); R.linea(297, 163, 317, 151, hex('#4a2e1a'));
  for (const [x, y, r] of [[246, 154, 7], [260, 152, 8], [276, 155, 7]]) { R.disco(x, y, r, hex('#b8a07a')); R.disco(x - 2, y - 2, r * 0.5, hex('#d8c49a')); R.linea(x - 2, y - r + 1, x + 2, y - r + 1, hex('#8a7050')); }
  for (const wx of [244, 284]) { R.anillo(wx, 171, 7, hex('#3a2416')); R.anillo(wx, 171, 6, hex('#7a5030')); for (let k = 0; k < 4; k++) R.linea(wx, 171, wx + Math.round(Math.cos(k * 0.785) * 6), 171 + Math.round(Math.sin(k * 0.785) * 6), hex('#5a3a22')); R.disco(wx, 171, 1.5, hex('#3a2416')); }
};
const p1 = (t) => {
  capa('calle', calleFondo);
  nubes(t, [[40, 30, 34, 1.4], [200, 18, 26, 2.2], [150, 50, 18, 3.2]], H('#7a4a7a', '#c8708a', '#f4a88a'));
  pajaros(t, 3, 26, 12, hex('#2a1e3a'), 2);
  // el humo de colores de la chimenea
  for (let k = 0; k < 8; k++) { const v = (t * 0.35 + k / 8) % 1; R.disco(Math.round(233 + Math.sin(v * 6 + k) * 3 + v * 14), Math.round(30 - v * 30), 2 + v * 4, hex(k % 2 ? '#9a6ad0' : '#6ac890')); }
  // el farol del soportal y el letrero de hierro con el frasco que se mece
  { const f = Math.sin(t * 13) > 0.7; R.linea(94, 98, 102, 98, K); R.linea(100, 98, 100, 101, K); caja(97, 101, 103, 109, K); caja(98, 102, 102, 108, f ? hex('#fff0a0') : hex('#ffd060')); R.halo(100, 105, 9, H('#7a5a5a', '#c8945a'), 0.5); }
  { const a = Math.sin(t * 1.8) * 2; R.linea(168, 92, 182, 92, K); R.linea(172, 92, 172 + Math.round(a), 96, K); R.linea(180, 92, 180 + Math.round(a), 96, K);
    caja(169 + Math.round(a), 96, 183 + Math.round(a), 108, K); caja(170 + Math.round(a), 97, 182 + Math.round(a), 107, hex('#c8a040')); R.disco(176 + a, 104, 2.6, hex('#3a8a5a')); caja(175 + Math.round(a), 98, 177 + Math.round(a), 101, hex('#3a8a5a')); }
  // la criada sacude la alfombra en la ventana de arriba
  { const sac = Math.sin(t * 9) * 2; R.actor(EL.criada, 32, 90, t, { dir: 1, sostiene: [52, 80] }); caja(28, 88, 45, 92, hex('#8a7a6a'));
    R.poligono([[46, 80 + sac], [62, 79 - sac], [64, 96 + sac], [48, 98 - sac]], hex('#8a2a2a')); R.linea(48, 86, 62, 85, hex('#d0a040')); R.linea(48, 92, 63, 91, hex('#d0a040'));
    for (let k = 0; k < 4; k++) { const v = (t * 1.5 + k / 4) % 1; R.pset(Math.round(60 + v * 12 + k), Math.round(96 + v * 10), hex('#c8b8a8')); } }
  // Baresch llega con el libro, abre la puerta y entra
  const anda = tramo(t, 0.1, b(0.112)), x = Math.round(lerp(-18, 197, anda)), abre = tramo(t, b(0.100), b(0.118)) - tramo(t, b(0.158), b(0.170));
  const entra = tramo(t, b(0.140), b(0.158));
  caja(194, 114, 216, 150, hex('#140e14')); if (abre > 0) { R.halo(205, 140, 10, H('#3a2a20', '#7a5030'), 0.6); caja(196, 136, 214, 150, hex('#3a2a20')); }
  if (entra < 1) { if (entra > 0) R.recorte([194, 100, 216, 150]); const yy = Math.round(150 - entra * 4);
    const ba = R.actor(EL.baresch, x, yy, t, { dir: entra > 0 || anda >= 1 ? (t > b(0.118) && t < b(0.138) ? -1 : 1) : 1, anda: anda > 0 && anda < 1, sostiene: true, sonrisa: t > b(0.118) });
    libro(ba.mano[0] + 2, ba.mano[1] + 8); R.recorte(null); }
  { const w = Math.round(22 * (1 - abre)); for (let y = 114; y <= 150; y++) for (let xx = 194; xx < 194 + w; xx++) { const arc = y < 114 + 0 ? false : true; if (arc) R.pset(xx, y, (xx - 194) % 5 === 0 ? hex('#2a1a12') : hex(y % 9 === 0 ? '#4a2e1c' : '#6a4228')); }
    if (w > 4) { R.disco(194 + w - 4, 132, 1.5, hex('#c8a040')); R.pset(196, 120, K); R.pset(196, 144, K); } }
  // las palomas que picotean y salen volando cuando pasa
  const vuela = tramo(t, b(0.040), b(0.040) + 1.4);
  for (let k = 0; k < 4; k++) { const px = 120 + k * 9, py = 160 + (k % 2) * 4; const x0 = Math.round(px - vuela * 40 * (1 + k * 0.3)), y0 = Math.round(py - vuela * 70 * (1 + k * 0.2)), pica = vuela === 0 && Math.sin(t * 6 + k) > 0.5;
    const g = hex('#8a8a9a'), gs = hex('#5a5a6a'); R.disco(x0, y0, 2, g); R.pset(x0 + 2, y0 - 2 + (pica ? 2 : 0), gs); R.pset(x0 + 3, y0 - 2 + (pica ? 2 : 0), hex('#e0a040'));
    if (vuela > 0) { const a = Math.sin(t * 30 + k) > 0; R.linea(x0 - 3, y0 - (a ? 3 : -1), x0, y0, gs); R.linea(x0 + 3, y0 - (a ? 3 : -1), x0, y0, gs); } else { R.pset(x0 - 2, y0 + 1, gs); R.pset(x0, y0 + 2, hex('#c86a4a')); } }
  // el niño con su aro, por delante
  { const v = tramo(t, 0.6, 4.1), nx = Math.round(lerp(330, -30, v)), ax = nx - 12, rod = t * 8;
    R.actor(EL.ninoBarroco, nx, 176, t, { dir: -1, anda: v > 0 && v < 1, sonrisa: true, dedo: true });
    R.anillo(ax, 169, 6, hex('#8a5a2a')); R.anillo(ax, 169, 5, hex('#c8904a')); R.linea(ax, 169, Math.round(ax + Math.cos(rod) * 5), Math.round(169 + Math.sin(rod) * 5), hex('#8a5a2a')); R.linea(nx + 1, 160, ax + 3, 166, hex('#5a3a1a')); }
};

// ── 2 · el laboratorio: Baresch se pelea con el libro ──
const bola = (x, y, k = 1) => { R.disco(x, y, 2.6 * k, hex('#a89c80')); R.disco(x, y, 2 * k, C.papel); R.pset(x - 1, y - 1, hex('#ffffff')); R.pset(x + 1, y, C.papelS); R.pset(x, y + 1, C.papelS); };
const p2 = (t) => {
  const o = { encuadre: 'alquimista' }; T.pragua(R, t, o);
  // el fuego se aviva en «alchemist»
  const aviva = tramo(t, b(0.1652), b(0.1652) + 0.3) * (1 - tramo(t, b(0.1652) + 0.8, b(0.1652) + 1.6));
  if (aviva > 0) for (let k = 0; k < 10; k++) { const v = (t * 1.6 + k / 10) % 1; R.pset(Math.round(43 + Math.sin(k * 3 + t * 4) * 8), Math.round(98 - v * 30 * aviva), hex(v < 0.4 ? '#fff0a0' : '#f08a30')); }
  // las bolas de papel de años de intentos
  for (const [x, y] of [[104, 152], [112, 160], [96, 166], [120, 170], [86, 158], [140, 176]]) bola(x, y);
  const tira = t > b(0.2693), vuelo = cl((t - b(0.2693) - 0.25) / 0.7);
  const bx = 178, sd = tira && vuelo === 0;
  const ba = R.actor(EL.baresch, bx, 130, t, { dir: -1, sostiene: tira ? (vuelo === 0 ? [bx - 4, 112] : undefined) : [bx - 6 + Math.round(Math.sin(t * 1.4) * 4), 116], enfado: t > b(0.2350) && t < b(0.3000), sorpresa: t > b(0.3068), dedo: tira && vuelo > 0 && vuelo < 0.6 });
  if (!tira) T.PIEZAS_VM.lupa(R, ba.mano[0] - 2, ba.mano[1] + 4);
  if (sd) bola(ba.mano[0], ba.mano[1] - 1);
  if (vuelo > 0) { const v = vuelo, x = Math.round(lerp(176, 80, v)), y = Math.round(lerp(110, 124, v) - Math.sin(v * Math.PI) * 26 + (v > 0.85 ? Math.sin((v - 0.85) * 40) * 3 : 0)); bola(x, y); }
  if (vuelo >= 1 && t < b(0.3068) + 0.8) R.bocadillo(66, 110, { icono: '!' });
  if (t > b(0.3068)) { const u = cl((t - b(0.3068)) / 0.3); R.bocadillo(ba.cabeza[0], ba.cabeza[1] - 4 - Math.round(u * 2), { icono: '?' }); }
  T.praguaDelante(R, t, o);
};

// ── 3 · la copia: los renglones se llenan, la copia se dobla, se sella y sale hacia Roma ──
const p3 = (t) => {
  const sale = tramo(t, b(0.4869), b(0.5158)), nueva = t > b(0.5158);
  const cp = nueva ? tramo(t, b(0.5200), b(0.5473)) * 0.25 : tramo(t, b(0.4000), b(0.4800));
  const o = { encuadre: 'alquimista', camara: 'copia', copia: cp }; T.pragua(R, t, o);
  // el ratón que corre por la balda del fondo
  { const v = ((t - P3) * 0.4) % 1, mx = Math.round(lerp(8, 116, v)); R.disco(mx, 76, 2, hex('#6a5a5a')); R.pset(mx + 2, 75, hex('#8a7a7a')); R.linea(mx - 2, 76, mx - 6, 75 + Math.round(Math.sin(t * 9)), hex('#4a3a3a')); R.pset(mx + 3, 76, K); }
  const mira = cp > 0 && cp < 1 ? (Math.floor(t * 1.6) % 2 === 0 ? -1 : 1) : 1;
  const ba = R.actor(EL.baresch, 150, 115, t, { dir: nueva ? 1 : mira, sostiene: nueva ? undefined : [168 + Math.round(Math.sin(t * 9) * 2), 108], dedo: nueva, sonrisa: nueva });
  if (!nueva) T.PIEZAS_VM.pluma(R, ba.mano[0] + 3, ba.mano[1] + 2);
  T.praguaDelante(R, t, o);
  // la copia doblada y sellada que se va
  if (t > b(0.4800) && !nueva) { const k = tramo(t, b(0.4800), b(0.4869)), x = Math.round(lerp(190, 340, sale)), y = Math.round(140 - Math.sin(sale * Math.PI) * 16);
    caja(x - 1, y - 1, x + 29, y + 17, K); caja(x, y, x + 28, y + 16, C.papel); R.linea(x, y, x + 14, y + 8, C.papelS); R.linea(x + 28, y, x + 14, y + 8, C.papelS);
    if (k >= 1) { R.disco(x + 14, y + 9, 3.6, hex('#7a1418')); R.disco(x + 14, y + 9, 3, C.lacre); R.pset(x + 13, y + 8, C.lacreL); }
    if (sale > 0) for (let i = 1; i < 4; i++) R.linea(x - i * 6, y + 4 + i * 3, x - i * 6 - 5, y + 4 + i * 3, hex('#e8dcc0')); }
};

// ── 4 · el claustro del Colegio Romano (fondo local): Kircher lee la copia y no sabe qué contestar ──
const OC = H('#8a5a34', '#a8723e', '#c88e4e', '#dcaa64', '#ecc684');
const claustroFondo = () => {
  degr(0, 0, 319, 64, H('#4a7ed0', '#689ade', '#8cb6e8', '#b8d2ee', '#e8e2c8'), 0.3);
  roma(-6, 66, 0.9, { muro: hex('#d8b48a'), muro2: hex('#c49c74'), techo: hex('#a85a3a'), vent0: hex('#6a4a3a'), cupula: hex('#8a9aa6'), costilla: hex('#b4c4d0'), luzCupula: hex('#c8d4dc'), tronco: hex('#5a3a2a'), pino: hex('#2e5226'), pinoL: hex('#4a7236'), cipres: hex('#244020') });
  R.rect(278, 0, 319, 46, 0); degr(278, 0, 319, 46, H('#4a7ed0', '#689ade', '#8cb6e8', '#b8d2ee'), 0.3);
  // el tejado del claustro y el muro de arriba
  for (let y = 56; y < 64; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x + (y % 2) * 3) % 6 === 0 ? hex('#6a2a1e') : hex(y === 56 ? '#c86a4a' : y > 61 ? '#7a3424' : '#a8503a'));
  for (let y = 64; y < 78; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 64 || y === 77 ? hex('#7a4a2a') : OC[Math.max(0, Math.min(4, Math.floor(3 + (hh(x >> 2, y >> 2, 61) - 0.5) + by(x, y) - 0.5)))]);
  caja(0, 76, 319, 78, hex('#e8d0a0')); caja(0, 79, 319, 79, hex('#6a4024'));
  // la galería: arcos de medio punto; dentro, la sombra, frescos desvaídos y puertas
  for (let y = 80; y < 134; y++) for (let x = 0; x < 320; x++) R.pset(x, y, OC[Math.max(0, Math.min(4, Math.floor(2.4 + (hh(x >> 2, y >> 2, 62) - 0.5) * 0.8 + by(x, y) - 0.5)))]);
  for (let k = 0; k < 7; k++) { const cx = 25 + k * 48; for (let y = 82; y < 132; y++) for (let x = cx - 18; x <= cx + 18; x++) { const dentro = y >= 100 || Math.hypot(x - cx, y - 100) <= 18; if (!dentro) continue;
      const fondo = y < 124; R.pset(x, y, fondo ? (Math.abs(x - cx) < 6 && y > 104 && k % 2 ? hex('#3a2418') : hex(by(x, y) > 0.8 ? '#5a3a24' : '#6e4a2e')) : hex(y === 124 ? '#3a2418' : (x + y) % 4 === 0 ? '#8a6a4a' : '#9a7a54')); }
    for (let a = 0; a <= 36; a++) { const g = a / 36 * Math.PI; R.pset(Math.round(cx - Math.cos(g) * 19), Math.round(100 - Math.sin(g) * 19), hex('#e8d0a0')); R.pset(Math.round(cx - Math.cos(g) * 20), Math.round(100 - Math.sin(g) * 20), hex('#7a4a2a')); }
    if (k % 2 === 0) { caja(cx - 8, 104, cx + 8, 116, hex('#8a6a5a')); caja(cx - 7, 105, cx + 7, 115, hex('#7a8aa0')); R.disco(cx, 110, 3, hex('#c8a060')); } }
  // el patio: grava, setos de boj, el banco de piedra
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const camino = Math.abs(x - 160) < 18 + (y - 134) * 0.6 || Math.abs(y - 160) < 4; R.pset(x, y, camino ? hex(hh(x, y, 63) > 0.8 ? '#b8a07a' : hh(x, y, 64) > 0.5 ? '#d8c4a0' : '#ccb690') : hex(hh(x, y, 65) > 0.9 ? '#6a7a3a' : by(x, y) > 0.6 ? '#7a8a46' : '#8a9a52')); }
  caja(0, 133, 319, 134, hex('#5a3a24'));
  for (const [x0, x1] of [[8, 120], [200, 312]]) for (let y = 140; y < 152; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y === 140 ? hex('#5a8a3a') : y === 151 ? hex('#1e3a1a') : hex(hh(x >> 1, y >> 1, 66) > 0.6 ? '#2e5a26' : hh(x, y, 67) > 0.8 ? '#4a7a36' : '#244a20'));
  caja(36, 163, 86, 167, hex('#c8b8a0')); caja(36, 163, 86, 163, hex('#e8dcc8')); caja(40, 168, 46, 176, hex('#a89a84')); caja(76, 168, 82, 176, hex('#a89a84')); caja(34, 177, 88, 178, hex('#6a5a4a'));
  // los naranjos en macetas de barro
  for (const x of [22, 298]) { R.poligono([[x - 9, 152], [x + 9, 152], [x + 7, 170], [x - 7, 170]], hex('#a8503a')); caja(x - 10, 151, x + 10, 153, hex('#c86a4a')); R.linea(x - 8, 160, x + 8, 160, hex('#8a3a2a')); caja(x - 1, 134, x + 1, 151, hex('#5a3a22')); }
  // la fuente: el pilón octogonal
  R.poligono([[132, 152], [140, 146], [180, 146], [188, 152], [188, 160], [180, 166], [140, 166], [132, 160]], hex('#c8bca8'));
  R.poligono([[136, 152], [142, 148], [178, 148], [184, 152], [178, 156], [142, 156]], hex('#4a86a8'));
  R.linea(132, 152, 188, 152, hex('#e8e0d0')); R.linea(132, 160, 188, 160, hex('#9a8e7a')); caja(156, 132, 164, 150, hex('#c8bca8')); caja(152, 130, 168, 133, hex('#e0d6c4'));
};
const p4 = (t) => {
  capa('claustro', claustroFondo);
  nubes(t, [[20, 22, 30, 1.5], [170, 34, 22, 2.4], [110, 14, 16, 3.6]], H('#a8bcd8', '#eef2f8', '#ffffff'));
  pajaros(t, 4, 18, 22, hex('#2a2a3a'), 4);
  // el fraile que pasa por la galería, tapado por los pilares
  { const v = ((t - P4) / 9) % 1, mx = Math.round(lerp(-10, 330, v)); R.actor(EL.monje, mx, 124, t, { dir: 1, anda: true }); }
  for (let k = 0; k <= 7; k++) { const px = 25 + k * 48 - 24; caja(px - 4, 96, px + 4, 133, OC[2]); caja(px - 4, 96, px - 3, 133, OC[4]); caja(px + 3, 96, px + 4, 133, OC[0]); caja(px - 6, 94, px + 6, 96, hex('#e8d0a0')); caja(px - 6, 131, px + 6, 133, hex('#7a4a2a')); }
  // la fuente: el chorro y las ondas
  for (let k = 0; k < 10; k++) { const v = (t * 1.4 + k / 10) % 1, x = Math.round(160 + (k % 2 ? 1 : -1) * v * 14), y = Math.round(126 + v * v * 26 - v * 14); R.pset(x, y, hex('#d8eef8')); R.pset(x, y + 1, hex('#8ac4e0')); }
  caja(159, 120, 161, 128, hex('#a8d8f0')); R.pset(160, 119, hex('#ffffff'));
  for (let k = 0; k < 3; k++) { const r = ((t * 6 + k * 6) % 18); R.anillo(160, 152, r * 0.9, hex('#8ac4e0')); }
  R.recorte([136, 148, 184, 156]); for (let k = 0; k < 3; k++) { const r = ((t * 6 + k * 6) % 18); for (let a = 0; a < 30; a++) R.pset(Math.round(160 + Math.cos(a * 0.21) * r * 1.4), Math.round(152 + Math.sin(a * 0.21) * r * 0.25), hex('#8ac4e0')); } R.recorte(null);
  // los naranjos se mecen
  for (const x of [22, 298]) { const m2 = Math.round(Math.sin(t * 1.3 + x) * 1.2); R.disco(x + m2, 124, 12, hex('#2e5a26')); R.disco(x - 3 + m2, 121, 8, hex('#3e7432')); R.disco(x - 5 + m2, 118, 4, hex('#5a9444'));
    for (let k = 0; k < 7; k++) { const ox = x + m2 + Math.round(Math.cos(k * 0.9) * 8), oy = 124 + Math.round(Math.sin(k * 0.9) * 7); R.disco(ox, oy, 1.4, hex('#f08a1a')); R.pset(ox - 1, oy - 1, hex('#ffc060')); } }
  // las palomas junto a la fuente (una sale volando)
  for (let k = 0; k < 3; k++) { const vu = k === 1 ? tramo(t, b(0.700), b(0.700) + 1.6) : 0; const px = Math.round(120 + k * 44 + vu * 60), py = Math.round(170 - vu * 80), pica = vu === 0 && Math.sin(t * 5 + k * 2) > 0.4;
    R.disco(px, py, 2.2, hex('#8a8a9a')); R.pset(px + 2, py - 2 + (pica ? 2 : 0), hex('#5a5a6a')); R.pset(px + 3, py - 2 + (pica ? 2 : 0), hex('#e0a040')); R.pset(px - 3, py, hex('#5a5a6a'));
    if (vu > 0) { const a = Math.sin(t * 28) > 0; R.linea(px - 4, py - (a ? 3 : -1), px, py, hex('#5a5a6a')); R.linea(px + 4, py - (a ? 3 : -1), px, py, hex('#5a5a6a')); } }
  // el correo que se va
  { const v = tramo(t, P4, P4 + 1.6); if (v < 1) R.actor(EL.criado, Math.round(lerp(190, -20, v)), 164, t, { dir: -1, anda: true }); }
  // Kircher lee la copia
  const kx = 214, rasca = t > b(0.7789), rr = rasca && Math.floor(t * 7) % 2 === 0;
  const ki = R.actor(EL.kircher, kx, 166, t, { dir: -1, sostiene: rasca ? undefined : [kx - 8, 146], dedo: rr, sorpresa: t > b(0.5612) && t < b(0.6000), habla: false, sonrisa: t > b(0.6758) && t < b(0.7600) });
  if (!rasca) { const hx = ki.mano[0], hy = ki.mano[1]; caja(hx - 10, hy - 6, hx + 1, hy + 8, K); caja(hx - 9, hy - 5, hx, hy + 7, C.papel); R.linea(hx - 6, hy + 5, hx - 6, hy - 2, hex('#3a7a3a')); R.pset(hx - 7, hy - 1, hex('#5aa04a')); R.pset(hx - 5, hy - 3, hex('#5aa04a')); for (let r = 0; r < 4; r++) R.linea(hx - 4, hy - 3 + r * 3, hx - 1, hy - 3 + r * 3, C.tinta); }
  if (t > b(0.5612) && t < b(0.5936) + 0.4) R.bocadillo(kx - 16, 128, { icono: '?' });
  // la idea de Baresch: un frasco que burbujea (medicina) y el sol que sale por oriente con un camello
  const id = tramo(t, b(0.6600), b(0.6758)) * (1 - tramo(t, b(0.7700), b(0.7789)));
  if (id > 0) { const cx = 176, cy = 96, rx = 34 * id, ry = 20 * id;
    for (const [px, py, r] of [[206, 136, 1.5], [200, 128, 2.2], [192, 120, 3]]) { R.disco(px, py, r * id + 0.7, K); R.disco(px, py, r * id, hex('#ffffff')); }
    for (let y = Math.floor(cy - ry - 3); y <= cy + ry + 3; y++) for (let x = Math.floor(cx - rx - 3); x <= cx + rx + 3; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry) - Math.abs(Math.sin(Math.atan2(y - cy, x - cx) * 5)) * 0.1; if (d <= 1) R.pset(x, y, d > 0.92 ? K : hex('#ffffff')); }
    if (id >= 1) { const fr = t > b(0.6758); if (fr) { R.disco(162, 102, 7, K); R.disco(162, 102, 6, hex('#d8eef0')); R.disco(162, 103, 5, hex('#3ac86a')); caja(160, 88, 164, 96, K); caja(161, 89, 163, 96, hex('#d8eef0')); caja(160, 87, 164, 88, hex('#8a5a2a'));
        for (let k = 0; k < 3; k++) { const v = (t * 1.5 + k / 3) % 1; R.pset(161 + k, Math.round(100 - v * 16), hex('#7aea9a')); } R.pset(159, 100, hex('#ffffff')); }
      const sol = tramo(t, b(0.7422) - 0.2, b(0.7422) + 0.4); if (sol > 0) { const sy = Math.round(lerp(110, 96, sol)); R.recorte([170, 80, 206, 108]); R.disco(194, sy, 6, hex('#ffc040')); R.disco(194, sy, 4, hex('#fff0a0')); R.recorte(null);
        R.poligono([[172, 108], [184, 101], [196, 106], [206, 102], [208, 108]], hex('#e8c47a')); R.linea(172, 108, 208, 108, hex('#c8a060'));
        const cxm = Math.round(lerp(204, 180, cl((t - b(0.7422)) / 1.6))), cam = hex('#8a5a2a'); caja(cxm, 101, cxm + 6, 103, cam); R.pset(cxm + 2, 100, cam); R.pset(cxm + 4, 100, cam); caja(cxm - 2, 98, cxm - 1, 102, cam); R.pset(cxm - 3, 98, cam); R.pset(cxm, 104, cam); R.pset(cxm + 6, 104, cam); R.pset(cxm, 105, cam); R.pset(cxm + 6, 105, cam); } } }
  // el gag: se rasca la cabeza y le salen tres «?»
  if (rasca) for (let k = 0; k < 3; k++) { const ti = b(0.7789) + 0.15 + k * 0.45; if (t > ti) { const u = cl((t - ti) / 0.2); R.icono('?', kx - 16 + k * 13, Math.round(ki.cabeza[1] - 20 - k * 5 - u * 3), hex('#ffffff'), K, 2); } }
};

// ── 5 · el puente de Carlos al atardecer (fondo local): las campanas y Marci con el libro ──
const PSUN = { monte: hex('#4a2e54'), arbol: hex('#42284c'), muro: hex('#5a3a62'), muro2: hex('#664270'), techo: hex('#4e3058'), techo2: hex('#5a3462'), ventana: hex('#ffd070'), vent0: hex('#42304e'), cupula: hex('#4e6676'), aguja: hex('#52385e') };
const puenteFondo = () => {
  degr(0, 0, 319, 112, H('#2a2a66', '#4e3a7a', '#86487e', '#c8607a', '#ee8a62', '#f8b46a', '#fcd486'), 0.35);
  R.halo(70, 88, 26, H('#f8b46a', '#fcd486', '#fde8a8'), 1.1); R.disco(70, 88, 8, hex('#fff2c0')); R.disco(70, 88, 6.5, hex('#fffbe8'));
  praga(112, 108, 0.82, PSUN);
  // la torre de la iglesia con su campanario abierto (la campana la pinta el fotograma)
  caja(92, 44, 108, 108, hex('#5e3e66')); caja(90, 42, 110, 44, hex('#7a5480')); R.poligono([[90, 42], [100, 24], [110, 42]], hex('#4a3050')); caja(99, 16, 101, 24, hex('#4a3050'));
  caja(95, 48, 105, 60, hex('#2a1a30')); caja(96, 70, 98, 76, hex('#ffd070')); caja(102, 70, 104, 76, hex('#3a2a40'));
  // el río con los reflejos del cielo
  for (let y = 108; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex(['#5a3a6a', '#8a4a74', '#c8607a', '#7a4a74'][Math.floor(hh(x >> 3, y, 71) * 4)]));
  // la torre del puente a la izquierda
  for (let y = 18; y < 150; y++) for (let x = 0; x < 42; x++) R.pset(x, y, hex((y % 8 === 0 || (x + Math.floor(y / 8) * 6) % 12 === 0) ? '#2e2232' : hh(x >> 1, y >> 1, 72) > 0.5 ? '#4a3a4a' : '#544252'));
  R.poligono([[-4, 30], [20, 18], [46, 30]], hex('#2a3a44')); caja(-2, 30, 44, 33, hex('#3a2a3a'));
  for (const x of [8, 26]) { caja(x, 44, x + 7, 62, hex('#ffd070')); R.disco(x + 3.5, 44, 3.5, hex('#ffd070')); R.linea(x + 3, 44, x + 3, 62, hex('#3a2a3a')); }
  R.disco(20, 112, 16, hex('#1e1622')); caja(4, 112, 36, 150, hex('#1e1622'));
  // el pretil de piedra con los pedestales y las estatuas
  for (let y = 120; y < 142; y++) for (let x = 42; x < 320; x++) { const fila = Math.floor((y - 120) / 7), j = (x + fila * 9) % 18; R.pset(x, y, y === 120 ? hex('#c8a090') : y < 123 ? hex('#a07a74') : (j === 0 || (y - 120) % 7 === 0) ? hex('#3e2e38') : hex(hh(x >> 1, y >> 1, 73) > 0.6 ? '#7a5e62' : '#6a5058')); }
  for (const x of [60, 176, 290]) { caja(x - 10, 100, x + 10, 142, hex('#4e3a46')); caja(x - 12, 98, x + 12, 101, hex('#8a6a6a')); caja(x - 9, 102, x - 8, 140, hex('#6a5058'));
    const S = hex('#2a1e2e'); R.poligono([[x - 7, 98], [x - 5, 76], [x + 5, 76], [x + 7, 98]], S); R.disco(x, 72, 4, S); R.linea(x + 5, 80, x + 11, 70, S); R.linea(x + 6, 80, x + 12, 70, S); R.anillo(x, 70, 6, hex('#c89a4a')); }
  // el adoquinado del puente
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 142) / 4), w = 7 + (y - 142) / 6, i = Math.floor((x + fila * w / 2) / w), jx = (x + fila * w / 2) % w;
    R.pset(x, y, jx < 1 || (y - 142) % 4 === 0 ? hex('#2a2030') : hex(['#6a5060', '#7a5e6a', '#5a4654', '#866a72'][Math.floor(hh(i, fila, 74) * 4)])); }
  for (let x = 0; x < 320; x++) R.pset(x, 143, hex('#d08a7a'));
  // el farol del puente
  caja(250, 96, 252, 146, hex('#1e1622')); caja(246, 144, 256, 147, hex('#1e1622')); caja(245, 84, 257, 86, hex('#1e1622')); caja(246, 87, 256, 96, hex('#1e1622'));
};
const p5 = (t) => {
  capa('puente', puenteFondo);
  nubes(t, [[150, 30, 36, 1.2], [260, 50, 26, 2], [40, 20, 20, 3]], H('#8a4a7a', '#e88a7a', '#ffd0a0'));
  // los destellos del sol en el agua y la barca
  for (let k = 0; k < 18; k++) { const x = Math.round(50 + hh(k, 1, 75) * 60 + Math.sin(t * 2 + k) * 3), y = 109 + Math.floor(hh(k, 2, 75) * 10); if (Math.sin(t * 4 + k * 1.7) > 0.2) R.linea(x, y, x + 2, y, hex('#ffe0a0')); }
  { const bx = Math.round(180 + (t - P5) * 6); R.poligono([[bx, 115], [bx + 20, 115], [bx + 17, 118], [bx + 3, 118]], hex('#2a1a22')); caja(bx + 8, 109, bx + 10, 114, hex('#2a1a22')); R.disco(bx + 9, 108, 1.6, hex('#2a1a22')); R.linea(bx + 11, 110, bx + 16 + Math.round(Math.sin(t * 2)), 118, hex('#4a2e22')); R.linea(bx - 4, 119, bx + 24, 119, hex('#f8b46a')); }
  R.rect(42, 120, 319, 121, hex('#c8a090'));
  for (let y = 120; y < 122; y++) for (let x = 42; x < 320; x++) R.pset(x, y, y === 120 ? hex('#c8a090') : hex('#a07a74'));
  // la campana que dobla en «died»
  const dobla = t > b(0.8882) ? Math.sin((t - b(0.8882)) * 5) * Math.exp(-(t - b(0.8882)) * 0.3) : 0;
  { const a = dobla * 0.6, cx = 100, cy = 50; R.linea(cx, cy - 1, cx + Math.round(Math.sin(a) * 6), cy + 5, hex('#3a2a14')); const bx = cx + Math.round(Math.sin(a) * 6), by2 = cy + 6; R.poligono([[bx - 3, by2 - 3], [bx + 3, by2 - 3], [bx + 5, by2 + 3], [bx - 5, by2 + 3]], hex('#c89a3a')); R.linea(bx - 5, by2 + 3, bx + 5, by2 + 3, hex('#f0d070')); R.pset(bx, by2 + 4, hex('#3a2a14'));
    if (Math.abs(dobla) > 0.4) for (const s of [-1, 1]) for (let k = 0; k < 3; k++) R.pset(cx + s * (10 + k * 3), cy - 2 + k * 2, hex('#fff0c0')); }
  // las palomas del pretil que se van con las campanas
  const vu = tramo(t, b(0.8882), b(0.8882) + 1.8);
  for (let k = 0; k < 5; k++) { const px = Math.round(110 + k * 18 - vu * (30 + k * 10)), py = Math.round(118 - vu * (60 + k * 8)); R.disco(px, py, 2, hex('#7a7088')); R.pset(px + 2, py - 2, hex('#5a5068'));
    if (vu > 0) { const a = Math.sin(t * 30 + k) > 0; R.linea(px - 3, py - (a ? 3 : -1), px, py, hex('#5a5068')); R.linea(px + 3, py - (a ? 3 : -1), px, py, hex('#5a5068')); } }
  pajaros(t, 3, 40, 10, hex('#3a2040'), 5);
  // hojas secas que el viento lleva por el adoquinado
  for (let k = 0; k < 7; k++) { const v = ((t * 0.22 + k / 7) % 1), x = Math.round(330 - v * 360), y = Math.round(150 + (k * 13) % 26 + Math.sin(t * 5 + k) * 2); R.pset(x, y, hex(k % 2 ? '#d88a3a' : '#a85a2a')); R.pset(x + 1, y - (Math.sin(t * 9 + k) > 0 ? 1 : 0), hex('#e8a04a')); }
  // la luz del farol
  { const f = Math.sin(t * 11) > 0.6; caja(247, 88, 255, 95, f ? hex('#fff0a0') : hex('#ffd060')); R.halo(251, 91, 9, H('#c8707a', '#f0a070'), 0.55); }
  // una paseante que se cruza al fondo
  { const v = tramo(t, P5, P5 + 4), x = Math.round(lerp(40, 150, v)); R.actor(EL.criada, x, 146, t, { dir: 1, anda: v < 1 }); }
  // Marci cruza el puente con el libro; se para con las campanas y en «friend» lo mira y sonríe
  const v = tramo(t, P5 + 0.1, b(0.9300)), x = Math.round(lerp(330, 186, v)), mira = t > b(0.9581);
  const ma = R.actor(EL.marci, x, 164, t, { dir: -1, anda: v > 0 && v < 1, sostiene: mira ? [x - 6, 140] : true, triste: t > b(0.8882) && t < b(0.9450), sonrisa: mira });
  libro(ma.mano[0] - 1, ma.mano[1] + 8);
  if (mira) { const g = tramo(t, b(0.9581), b(0.9700)); if (Math.sin(t * 7) > 0) for (const [dx, dy] of [[-9, -8], [6, -12], [-4, -16]]) R.pset(ma.mano[0] + dx, ma.mano[1] + dy, hex('#fff0a0')); R.anillo(ma.mano[0] - 1, ma.mano[1], 9 + (1 - g) * 4, hex('#ffe08a')); }
};
const efectos = [[b(0.040), 'whoosh'], [b(0.104), 'puerta'], [b(0.1680), 'burbujas'], [b(0.2700), 'papel'], [b(0.3068), 'pop'], [b(0.4214), 'lapiz'], [b(0.4869), 'whoosh'], [b(0.5612), 'pop'], [b(0.6758), 'burbujas'], [b(0.7422), 'brillo'], [b(0.7789) + 0.15, 'pop'], [b(0.8882), 'campana'], [b(0.9581), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => t < 0.4 ? 1665 : t < 2.4 ? Math.round(lerp(1665, 1639, tramo(t, 0.4, 2.4))) : 1639 });
''')
